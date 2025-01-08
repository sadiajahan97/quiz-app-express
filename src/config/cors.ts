import { CorsOptions } from "cors";

const allowedOrigins = ["http://localhost:3500"];

export const corsOptions: CorsOptions = {
  credentials: true,
  optionsSuccessStatus: 200,
  origin: (origin, callback) => {
    if (
      (typeof origin === "string" && allowedOrigins.indexOf(origin) !== -1) ||
      origin === undefined
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
