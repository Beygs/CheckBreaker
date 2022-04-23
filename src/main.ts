import { Checkboxland } from "checkboxland";
import "./style.css";

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
};

const grid = new Checkboxland({
  dimensions: `${config.width}x${config.height}`,
  selector: app,
});

const state: State = {
  direction: "",
  paddle: [{ x: 0, y: 0 }],
  ball: [
    { x: 31, y: 59 },
    { x: 32, y: 59 },
    { x: 31, y: 58 },
    { x: 32, y: 58 },
  ],
  ballVelocity: {
    dx: 1,
    dy: 1,
  },
  gameMap: grid.getEmptyMatrix(),
  intervalId: undefined,
};

const init = () => {
  setInitialState();

  body.addEventListener("keydown", launchGame);
};

const gameOver = () => {
  alert("Game Over!");
  body.removeEventListener("keydown", captureInput);
  clearInterval(state.intervalId);
}

const setInitialState = () => {
  state.paddle.pop();

  const bottom = config.height - 3;
  const left = Math.floor(config.width / 2) - 6;

  for (let y = bottom; y > bottom - 2; y--) {
    for (let x = left; x < config.width - left; x++) {
      state.paddle.push({ x, y });
    }
  }
};

const launchGame = () => {
  body.removeEventListener("keydown", launchGame);
  body.addEventListener("keydown", captureInput);
  state.intervalId = setInterval(game, config.interval);
};

const game = () => {
  movePaddle();
  moveBall();
  state.direction = "";
  drawGame();
};

const movePaddle = () => {
  const paddlePosition = getPosition(state.paddle);

  if (state.direction === "left") {
    if (paddlePosition.minX === 0) return;

    state.paddle.map((segment) => segment.x--);
  }

  if (state.direction === "right") {
    if (paddlePosition.maxX === config.width - 1) return;

    state.paddle.map((segment) => segment.x++);
  }
};

const moveBall = () => {
  const ballPosition = getPosition(state.ball);
  const paddlePosition = getPosition(state.paddle);

  // Check if the ball is touching the borders
  if (ballPosition.minX === 0) state.ballVelocity.dx *= -1;
  if (ballPosition.maxX === config.width - 1) state.ballVelocity.dx *= -1;
  if (ballPosition.minY === 0) state.ballVelocity.dy *= -1;

  // Check if the ball is touching the paddle
  if (
    ballPosition.maxY === paddlePosition.minY - 1 &&
    ballPosition.minX >= paddlePosition.minX &&
    ballPosition.maxX <= paddlePosition.maxX
  ) {
    state.ballVelocity.dy *= -1;
  } else if (
    state.ballVelocity.dx === 1 &&
    ballPosition.maxX === paddlePosition.minX - 1 &&
    ballPosition.minY >= paddlePosition.minY - 1 &&
    ballPosition.maxY <= paddlePosition.maxY + 1
  ) {
    state.ballVelocity.dx *= -1;
  } else if (
    state.ballVelocity.dx === -1 &&
    ballPosition.minX === paddlePosition.maxX + 1 &&
    ballPosition.minY >= paddlePosition.minY - 1 &&
    ballPosition.maxY <= paddlePosition.maxY + 1
  ) {
    state.ballVelocity.dx *= -1;
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

  grid.setData(state.gameMap);
};

const getPosition = (object: Vector2[]) => ({
  minX: Math.min(...object.map((segment) => segment.x)),
  maxX: Math.max(...object.map((segment) => segment.x)),
  minY: Math.min(...object.map((segment) => segment.y)),
  maxY: Math.max(...object.map((segment) => segment.y)),
});

const captureInput = (e: KeyboardEvent) => {
  const keyCode: string = e.code;
  const validDirection: string | undefined = config.directionsMap[keyCode];

  if (validDirection) {
    e.preventDefault();
    state.direction = validDirection;
  }
};

init();
