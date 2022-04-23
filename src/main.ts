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
  interval: 100,
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
    { x: 32, y: 59 },
    { x: 31, y: 58 },
    { x: 32, y: 58 },
    { x: 33, y: 58 },
    { x: 32, y: 57 },
  ],
  gameMap: grid.getEmptyMatrix(),
  intervalId: undefined,
};

const init = () => {
  setInitialState();
  body.addEventListener("keydown", captureInput);
  state.intervalId = setInterval(game, config.interval);
};

const setInitialState = () => {
  state.paddle.pop();

  for (let y = 60; y < 62; y++) {
    for (let x = 26; x < 64 - 26; x++) {
      state.paddle.push({ x, y });
    }
  }
};

const game = () => {
  movePaddle();
  state.direction = "";
  drawGame();
};

const movePaddle = () => {
  if (state.direction === "left") {
    if (Math.min(...state.paddle.map((segment) => segment.x)) === 0) return;

    state.paddle.map((segment) => segment.x--);
  }
  if (state.direction === "right") {
    if (Math.max(...state.paddle.map((segment) => segment.x)) === config.width - 1) return;

    state.paddle.map((segment) => segment.x++);
  }
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

const captureInput = (e: KeyboardEvent) => {
  const keyCode: string = e.code;
  const validDirection: string | undefined = config.directionsMap[keyCode];

  if (validDirection) {
    e.preventDefault();
    state.direction = validDirection;
  }
};

init();
