import { Checkboxland } from "checkboxland";
import { bricks } from "./data";
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
  bricks,
};

const grid = new Checkboxland({
  dimensions: `${config.width}x${config.height}`,
  selector: app,
});

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
};

const init = () => {
  setInitialState();

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
  const ballBottom = paddleBottom - 2;
  const ballLeft = Math.floor(config.width / 2) - 1;

  for (let y = ballBottom; y >= ballBottom - 1; y--) {
    for (let x = ballLeft; x <= ballLeft + 1; x++) {
      state.ball.push({ x, y });
    }
  }

  config.bricks.forEach((brickConfig) => {
    const { top, left, width, height } = brickConfig;

    for (let y = top; y < top + height; y++) {
      const brick: Vector2[] = [];
      for (let x = left; x < left + width; x++) {
        brick.push({ x, y });
      }
      state.bricks.push(brick);
    }
  });
};

/**
 * Game
 */
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

const gameOver = () => {
  alert("Game Over!");
  body.removeEventListener("keydown", captureInput);
  clearInterval(state.intervalId);

  state.gameMap = grid.getEmptyMatrix();
  drawGame();
  init();
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

  // Top
  if (
    ballPosition.maxY === paddlePosition.minY - 1 &&
    ballPosition.minX >= paddlePosition.minX - 1 &&
    ballPosition.maxX <= paddlePosition.maxX + 1
  ) {
    state.ballVelocity.dy *= -1;
  }

  // Left
  if (
    state.ballVelocity.dx === 1 &&
    ballPosition.maxX === paddlePosition.minX - 1 &&
    ballPosition.minY >= paddlePosition.minY - 1 &&
    ballPosition.maxY <= paddlePosition.maxY + 1
  ) {
    state.ballVelocity.dx *= -1;
  }

  // Right
  if (
    state.ballVelocity.dx === -1 &&
    ballPosition.minX === paddlePosition.maxX + 1 &&
    ballPosition.minY >= paddlePosition.minY - 1 &&
    ballPosition.maxY <= paddlePosition.maxY + 1
  ) {
    state.ballVelocity.dx *= -1;
  }

  // Check if the ball is touching a brick
  state.bricks.forEach((brick, id) => {
    const brickPosition = getPosition(brick);

    // Top
    if (
      ballPosition.maxY === brickPosition.minY - 1 &&
      ballPosition.minX >= brickPosition.minX - 1 &&
      ballPosition.maxX <= brickPosition.maxX + 1
    ) {
      removeBrick(id);
      state.ballVelocity.dy *= -1;
    }
    // Bottom
    if (
      ballPosition.minY === brickPosition.maxY + 1 &&
      ballPosition.minX >= brickPosition.minX - 1 &&
      ballPosition.maxX <= brickPosition.maxX + 1
    ) {
      removeBrick(id);
      state.ballVelocity.dy *= -1;
    }

    // Left
    if (
      ballPosition.maxX === brickPosition.minX - 1 &&
      ballPosition.minY >= brickPosition.minY - 1 &&
      ballPosition.maxY <= brickPosition.maxY + 1
    ) {
      removeBrick(id);
      state.ballVelocity.dx *= -1;
    }

    // Right
    if (
      ballPosition.minX === brickPosition.maxX + 1 &&
      ballPosition.minY >= brickPosition.minY - 1 &&
      ballPosition.maxY <= brickPosition.maxY + 1
    ) {
      removeBrick(id);
      state.ballVelocity.dx *= -1;
    }
  });

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
    brick.forEach((segment) => {
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
  state.bricks = [
    ...state.bricks.slice(0, id - 1),
    ...state.bricks.slice(id + 1),
  ];
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
