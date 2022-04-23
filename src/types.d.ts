type Vector2 = {
  x: number;
  y: number;
}

interface Config {
  width: number;
  height: number;
  interval: number;
  directionsMap: {
    [key: string]: string;
  };
}

interface State {
  direction: string;
  paddle: Vector2[];
  ball: Vector2[];
  gameMap: any[][];
  intervalId?: number;
}
