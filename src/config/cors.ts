import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  credentials: true,
  optionsSuccessStatus: 200,
  origin: (origin, callback) => {
    if (
      origin === "https://quiz-app-next-kappa.vercel.app/" ||
      origin === "https://quiz-app-express.onrender.com/"
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
