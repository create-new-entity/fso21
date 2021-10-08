import express from "express";

const PORT = 3002;
const app = express();

app.use(express.json());


app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
