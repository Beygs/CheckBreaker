declare module "checkboxland/dist-src/plugins/marquee";
declare module "checkboxland/dist-src/plugins/print/print";
declare module "checkboxland/dist-src/plugins/dataUtils";

type Vector2 = {
  x: number;
  y: number;
};

type BrickConfig = {
  left: number;
  top: number;
  width: number;
  height: number;
};

interface Config {
  width: number;
  height: number;
  interval: number;
  bricks: readonly BrickConfig[];
  directionsMap: {
    [key: string]: string;
  };
}

interface State {
  direction: string;
  paddle: Vector2[];
  ball: Vector2[];
  bricks: {
    id: number;
    brick: Vector2[];
  }[];
  ballVelocity: {
    dx: number;
    dy: number;
  };
  gameMap: any[][];
  intervalId?: number;
  timeoutId?: number;
}
