// import express from 'express';
// const app = express();
// import {salesRoutes} from './routes/sales.js';

// app.use(express.json());
// app.use('/', salesRoutes);

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { salesRoutes } from './routes/sales.js';
import itemsRoutes from './routes/items.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Fix __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/', salesRoutes);
app.use('/', itemsRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
