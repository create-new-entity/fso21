import express from "express";
import cors from "cors";

const PORT = 3001;
const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());


app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
