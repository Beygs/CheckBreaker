import { Checkboxland } from "checkboxland";
import marquee from "checkboxland/dist-src/plugins/marquee";
import print from "checkboxland/dist-src/plugins/print/print";
import dataUtils from "checkboxland/dist-src/plugins/dataUtils";
import PrintType from "checkboxland/dist-types/plugins/print/print";
import DataUtilsType from "checkboxland/dist-types/plugins/dataUtils";
import { bricks } from "./data";
import CasseBriquesSong from "./assets/sounds/cassebriques.wav";
import GameOverSound from "./assets/sounds/tnul.wav";
import BoingSound from "./assets/sounds/boing.wav";
import CrashSound from "./assets/sounds/crash.wav";
import OuiSound from "./assets/sounds/oui.mp3";
import "./style.css";
import { registerSW } from "virtual:pwa-register";

Checkboxland.extend(marquee);
Checkboxland.extend(print);
Checkboxland.extend(dataUtils);

/**
 * Service Workers
 */
registerSW({ immediate: true });

/**
 * Setup
 */
const body = document.body!;
const app = document.querySelector<HTMLDivElement>("#app")!;

const muteControl = document.getElementById(
  "sound-control"
)! as HTMLInputElement;
const volumeControl = document.getElementById("volume")! as HTMLInputElement;
const speedControl = document.getElementById("speed")! as HTMLInputElement;
const resetSpeed = document.getElementById("reset")! as HTMLButtonElement;

// Sound
muteControl.addEventListener("change", (e) => {
  const target = e.target as HTMLInputElement;
  state.sound = target.checked;

  target.checked
    ? (volumeControl.disabled = false)
    : (volumeControl.disabled = true);

  config.song.volume = target.checked ? 1 : 0;
  config.gameOverSound.volume = target.checked ? 1 : 0;
  config.boingSound.volume = target.checked ? 1 : 0;
  config.crashSound.volume = target.checked ? 1 : 0;
  config.ouiSound.volume = target.checked ? 1 : 0;
});

volumeControl.addEventListener("change", (e) => {
  const target = e.target as HTMLInputElement;
  const value = parseFloat(target.value);

  config.song.volume = value;
  config.gameOverSound.volume = value;
  config.boingSound.volume = value;
  config.crashSound.volume = value;
  config.ouiSound.volume = value;

  if (value === 0) muteControl.checked = false;
});

// Speed
speedControl.addEventListener("change", (e) => {
  const target = e.target as HTMLInputElement;
  const value = parseInt(target.value) * -1;

  setSpeed(value);
});

resetSpeed.addEventListener("click", () => {
  speedControl.value = "-70";
  setSpeed(70);
});

const setSpeed = (speed: number) => {
  config.interval = speed;

  const percentage = 2.2 - (speed - 20) / 50;

  clearInterval(state.intervalId);
  state.intervalId = window.setInterval(game, config.interval);

  config.song.playbackRate = percentage;
  config.gameOverSound.playbackRate = percentage;
  config.boingSound.playbackRate = percentage;
  config.crashSound.playbackRate = percentage;
  config.ouiSound.playbackRate = percentage;
};

const config: Config = {
  width: 64,
  height: 48,
  interval: 70,
  directionsMap: {
    ArrowLeft: "left",
    ArrowRight: "right",
  },
  bricks,
  song: new Audio(CasseBriquesSong),
  gameOverSound: new Audio(GameOverSound),
  boingSound: new Audio(BoingSound),
  crashSound: new Audio(CrashSound),
  ouiSound: new Audio(OuiSound),
};

interface CheckboxlandWithPlugins extends Checkboxland {
  marquee: any;
  print: typeof PrintType.exec;
  dataUtils: typeof DataUtilsType.exec;
}

const grid = new Checkboxland({
  dimensions: `${config.width}x${config.height}`,
  selector: app,
}) as CheckboxlandWithPlugins;

const state: State = {
  direction: "",
  paddle: [],
  ball: [],
  bricks: [],
  ballVelocity: {
    dx: 1,
    dy: 1,
  },
  gameMap: grid.getEmptyMatrix(),
  intervalId: undefined,
  timeoutId: undefined,
  sound: muteControl.checked,
};

const init = () => {
  grid.marquee.cleanUp();
  startScreen();
  body.addEventListener("keydown", launchGame);
};

const setInitialState = () => {
  state.paddle = [];
  state.ball = [];

  // Set initial paddle position
  const paddleBottom = config.height - 3;
  const paddleLeft = Math.floor(config.width / 2) - 6;

  for (let y = paddleBottom; y >= paddleBottom - 1; y--) {
    for (let x = paddleLeft; x < config.width - paddleLeft; x++) {
      state.paddle.push({ x, y });
    }
  }

  // Set initial ball position
  const ballBottom = Math.floor(config.height / 2);
  const ballLeft = Math.floor(Math.random() * config.width);

  for (let y = ballBottom; y >= ballBottom - 1; y--) {
    for (let x = ballLeft; x <= ballLeft + 1; x++) {
      state.ball.push({ x, y });
    }
  }

  config.bricks.forEach((brickConfig, id) => {
    const { top, left, width, height } = brickConfig;

    const brick = [];

    for (let y = top; y < top + height; y++) {
      for (let x = left; x < left + width; x++) {
        brick.push({ x, y });
      }
    }

    state.bricks.push({ id, brick });
  });
};

const startScreen = () => {
  grid.print("Bienvenue", { y: 2, x: 2, fillValue: 2 });
  grid.print("dans", { y: 12, x: 2 });
  grid.print("CheckBreak", { y: 22, x: 2 });

  state.timeoutId = window.setTimeout(() => {
    const textData = grid.print("Appuyez sur une touche pour commencer", {
      dataOnly: true,
    });
    const paddedTextData = grid.dataUtils("pad", textData, { top: 20 });
    grid.marquee(paddedTextData, { interval: 30, repeat: true });
  }, 3000);
};

const win = () => {
  config.song.pause();
  config.song.currentTime = 0;

  config.ouiSound.play();

  config.ouiSound.addEventListener("ended", () => {
    config.ouiSound.pause();
    config.ouiSound.currentTime = 0;

    config.song.play();
  });

  state.gameMap = grid.getEmptyMatrix();
  drawGame();

  body.removeEventListener("keydown", captureInput);
  clearInterval(state.intervalId);

  init();
};

const gameOver = () => {
  config.song.pause();
  config.song.currentTime = 0;

  config.gameOverSound.play();

  config.gameOverSound.addEventListener("ended", () => {
    config.gameOverSound.pause();
    config.gameOverSound.currentTime = 0;

    config.song.play();
  });

  body.removeEventListener("keydown", captureInput);
  clearInterval(state.intervalId);

  state.gameMap = grid.getEmptyMatrix();
  drawGame();
  init();
};

/**
 * Game
 */
const launchGame = () => {
  setInitialState();

  grid.marquee.cleanUp();
  clearTimeout(state.timeoutId);

  config.song.loop = true;
  config.song.play();

  body.removeEventListener("keydown", launchGame);
  body.addEventListener("keydown", captureInput);
  state.intervalId = window.setInterval(game, config.interval);
};

const game = () => {
  if (state.bricks.length === 0) {
    win();
  }

  movePaddle();
  moveBall();
  state.direction = "";
  drawGame();
};

const movePaddle = () => {
  const paddlePosition = getPosition(state.paddle);

  if (state.direction === "left") {
    if (paddlePosition.minX === 0) return;

    state.paddle.map((segment) => (segment.x -= 2));
  }

  if (state.direction === "right") {
    if (paddlePosition.maxX === config.width - 1) return;

    state.paddle.map((segment) => (segment.x += 2));
  }
};

const moveBall = () => {
  const ballPosition = getPosition(state.ball);
  const paddlePosition = getPosition(state.paddle);

  // Check if the ball is touching the borders
  if (ballPosition.minX <= 0) bounce("dx");
  if (ballPosition.maxX >= config.width - 1) bounce("dx");
  if (ballPosition.minY <= 0) bounce("dy");

  // Check if the ball is touching the paddle

  // Top
  if (
    ballPosition.maxY === paddlePosition.minY - 1 &&
    ballPosition.maxX >= paddlePosition.minX - 1 &&
    ballPosition.minX <= paddlePosition.maxX + 1
  ) {
    bounce("dy");

    if (ballPosition.maxX <= paddlePosition.minX + 4) {
      state.ballVelocity.dx = -1;
    }

    if (ballPosition.maxX <= paddlePosition.minX + 2) {
      state.ballVelocity.dx = -2;
    }

    if (ballPosition.minX >= paddlePosition.maxX - 4) {
      state.ballVelocity.dx = 1;
    }

    if (ballPosition.minX >= paddlePosition.maxX - 2) {
      state.ballVelocity.dx = 2;
    }
  }

  // Left
  if (
    state.ballVelocity.dx >= 0 &&
    ballPosition.maxX === paddlePosition.minX - 1 &&
    ballPosition.minY >= paddlePosition.minY - 1 &&
    ballPosition.maxY <= paddlePosition.maxY + 1
  ) {
    bounce("dx");
  }

  // Right
  if (
    state.ballVelocity.dx <= 0 &&
    ballPosition.minX === paddlePosition.maxX + 1 &&
    ballPosition.minY >= paddlePosition.minY - 1 &&
    ballPosition.maxY <= paddlePosition.maxY + 1
  ) {
    bounce("dx");
  }

  // Check if the ball is touching a brick
  const bricks = [...state.bricks];

  for (let brick of bricks) {
    const brickPosition = getPosition(brick.brick);

    // Top
    if (
      ballPosition.maxY === brickPosition.minY - 1 &&
      ballPosition.maxX >= brickPosition.minX - 1 &&
      ballPosition.minX <= brickPosition.maxX + 1
    ) {
      crash("dy", brick.id);
      break;
    }

    // Bottom
    if (
      state.ballVelocity.dy <= 0 &&
      ballPosition.minY === brickPosition.maxY + 1 &&
      ballPosition.maxX >= brickPosition.minX - 1 &&
      ballPosition.minX <= brickPosition.maxX + 1
    ) {
      crash("dy", brick.id);
      break;
    }

    // Left
    if (
      state.ballVelocity.dx >= 0 &&
      (ballPosition.maxX === brickPosition.minX ||
        ballPosition.maxX === brickPosition.minX - 1) &&
      ballPosition.maxY >= brickPosition.minY - 1 &&
      ballPosition.minY <= brickPosition.maxY + 1
    ) {
      crash("dx", brick.id);
      break;
    }

    // Right
    if (
      state.ballVelocity.dx <= 0 &&
      (ballPosition.minX === brickPosition.maxX ||
        ballPosition.minX === brickPosition.maxX + 1) &&
      ballPosition.maxY >= brickPosition.minY - 1 &&
      ballPosition.minY <= brickPosition.maxY + 1
    ) {
      crash("dx", brick.id);
      break;
    }
  }

  // Check for game over
  if (ballPosition.maxY === config.height - 1) return gameOver();

  state.ball.map((segment) => {
    segment.x += state.ballVelocity.dx;
    segment.y += state.ballVelocity.dy;
  });
};

const drawGame = () => {
  state.gameMap = grid.getEmptyMatrix();

  state.paddle.forEach((segment) => {
    state.gameMap[segment.y][segment.x] = 1;
  });

  state.ball.forEach((segment) => {
    state.gameMap[segment.y][segment.x] = 1;
  });

  state.bricks.forEach((brick) =>
    brick.brick.forEach((segment) => {
      state.gameMap[segment.y][segment.x] = 1;
    })
  );

  grid.setData(state.gameMap);
};

const getPosition = (object: Vector2[]) => ({
  minX: Math.min(...object.map((segment) => segment.x)),
  maxX: Math.max(...object.map((segment) => segment.x)),
  minY: Math.min(...object.map((segment) => segment.y)),
  maxY: Math.max(...object.map((segment) => segment.y)),
});

const bounce = (velocityAxis: "dx" | "dy") => {
  config.boingSound.currentTime = 0;
  config.boingSound.play();
  state.ballVelocity[velocityAxis] *= -1;
};

const crash = (velocityAxis: "dx" | "dy", id: number) => {
  config.crashSound.currentTime = 0;
  config.crashSound.play();
  state.ballVelocity[velocityAxis] *= -1;

  removeBrick(id);
};

const removeBrick = (id: number) => {
  state.bricks = state.bricks.filter((brick) => brick.id !== id);
};

const captureInput = (e: KeyboardEvent) => {
  const keyCode: string = e.code;
  const validDirection: string | undefined = config.directionsMap[keyCode];

  if (validDirection) {
    e.preventDefault();
    state.direction = validDirection;
  }
};

init();
