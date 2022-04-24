import { Checkboxland } from "checkboxland";
import marquee from "checkboxland/dist-src/plugins/marquee";
import print from "checkboxland/dist-src/plugins/print/print";
import dataUtils from "checkboxland/dist-src/plugins/dataUtils";
import PrintType from "checkboxland/dist-types/plugins/print/print";
import DataUtilsType from "checkboxland/dist-types/plugins/dataUtils";
import { bricks } from "./data";
import CasseBriquesSong from "./assets/sounds/cassebriques.wav";
import GameOverSound from "./assets/sounds/tnul.wav";
import "./style.css";

Checkboxland.extend(marquee);
Checkboxland.extend(print);
Checkboxland.extend(dataUtils);

/**
 * Setup
 */
const body = document.body!;
const app = document.querySelector<HTMLDivElement>("#app")!;

const config: Config = {
  width: 64,
  height: 64,
  interval: 70,
  directionsMap: {
    ArrowLeft: "left",
    ArrowRight: "right",
  },
  bricks,
  song: new Audio(CasseBriquesSong),
  gameOverSound: new Audio(GameOverSound),
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
};

const init = () => {
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
  const ballBottom =
    config.height - Math.floor(Math.random() * ((config.height / 3) * 2));
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

  state.timeoutId = setTimeout(() => {
    const textData = grid.print("Appuyez sur une touche pour commencer", {
      dataOnly: true,
    });
    const paddedTextData = grid.dataUtils("pad", textData, { top: 20 });
    grid.marquee(paddedTextData, { interval: 30, repeat: true });
  }, 3000);
};

const win = () => {
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
  state.intervalId = setInterval(game, config.interval);
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
  if (ballPosition.minX <= 0) state.ballVelocity.dx *= -1;
  if (ballPosition.maxX >= config.width - 1) state.ballVelocity.dx *= -1;
  if (ballPosition.minY <= 0) state.ballVelocity.dy *= -1;

  // Check if the ball is touching the paddle

  // Top
  if (
    ballPosition.maxY === paddlePosition.minY - 1 &&
    ballPosition.maxX >= paddlePosition.minX - 1 &&
    ballPosition.minX <= paddlePosition.maxX + 1
  ) {
    state.ballVelocity.dy *= -1;

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
    state.ballVelocity.dx *= -1;
  }

  // Right
  if (
    state.ballVelocity.dx <= 0 &&
    ballPosition.minX === paddlePosition.maxX + 1 &&
    ballPosition.minY >= paddlePosition.minY - 1 &&
    ballPosition.maxY <= paddlePosition.maxY + 1
  ) {
    state.ballVelocity.dx *= -1;
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
      removeBrick(brick.id);
      state.ballVelocity.dy *= -1;
      break;
    }

    // Bottom
    if (
      state.ballVelocity.dy <= 0 &&
      ballPosition.minY === brickPosition.maxY + 1 &&
      ballPosition.maxX >= brickPosition.minX - 1 &&
      ballPosition.minX <= brickPosition.maxX + 1
    ) {
      removeBrick(brick.id);
      state.ballVelocity.dy *= -1;
      break;
    }

    // Left
    if (
      state.ballVelocity.dx >= 0 &&
      ballPosition.maxX === brickPosition.minX - 1 &&
      ballPosition.maxY >= brickPosition.minY - 1 &&
      ballPosition.minY <= brickPosition.maxY + 1
    ) {
      removeBrick(brick.id);
      state.ballVelocity.dx *= -1;
      break;
    }

    // Right
    if (
      state.ballVelocity.dx <= 0 &&
      ballPosition.minX === brickPosition.maxX + 1 &&
      ballPosition.maxY >= brickPosition.minY - 1 &&
      ballPosition.minY <= brickPosition.maxY + 1
    ) {
      removeBrick(brick.id);
      state.ballVelocity.dx *= -1;
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
