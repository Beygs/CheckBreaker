declare module "checkboxland/dist-src/plugins/marquee";
declare module "checkboxland/dist-src/plugins/print/print";
declare module "checkboxland/dist-src/plugins/dataUtils";

interface Window {
  webkitAudioContext?: AudioContext;
}

declare const window: Window;

declare module 'virtual:pwa-register' {
  export interface RegisterSWOptions {
    immediate?: boolean
    onNeedRefresh?: () => void
    onOfflineReady?: () => void
    onRegistered?: (registration: ServiceWorkerRegistration | undefined) => void
    onRegisterError?: (error: any) => void
  }

  export function registerSW(options?: RegisterSWOptions): (reloadPage?: boolean) => Promise<void>
}

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
  song: HTMLAudioElement;
  gameOverSound: HTMLAudioElement;
  boingSound: HTMLAudioElement;
  crashSound: HTMLAudioElement;
  ouiSound: HTMLAudioElement;
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
  sound: boolean;
}
