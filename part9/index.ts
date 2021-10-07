import express from 'express';

import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
import { exerciseCalculator_DataIsValid } from './validityChecker';

const app = express();

const PORT = 3002;

app.use(express.json());

console.clear();


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if(!req.query.height || !req.query.weight ||  isNaN(height) || isNaN(weight)) {
    res.status(400).json({
      error: "malformatted parameters"
    });
    return;
  }
  
  const bmi = calculateBmi({
    height,
    weight
  });

  res.json({
    height,
    weight,
    bmi
  });
});


app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const target = req.body.target;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const exerciseHours = req.body.daily_exercises;

  if(!target || !exerciseHours) {
    res.status(400).json({
      error: "parameters missing"
    });
    return;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    exerciseCalculator_DataIsValid({ target, exerciseHours });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = calculateExercises({ target, exerciseHours });
    res.json(result);
  }
  catch(err) {
    res.status(400).json({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      'error': err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});