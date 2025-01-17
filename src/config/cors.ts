import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  origin: (req, cb) => {
    const origin = req.header('Origin');
    if (origin === 'https://quiz-app-next-kappa.vercel.app') {
      cb(null, true);
    } else {
      cb(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
