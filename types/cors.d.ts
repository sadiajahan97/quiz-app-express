import { CorsOptions as Options } from 'cors';
import { Request } from 'express';

declare module 'cors' {
  type CustomOrigin = (
    request: Request,
    callback: (error: Error | null, allow?: boolean) => void
  ) => void;

  interface CorsOptions extends Omit<Options, 'origin'> {
    origin?: StaticOrigin | CustomOrigin;
  }
}
