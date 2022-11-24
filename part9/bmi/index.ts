import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import { exerciseArgs } from './exerciseCalculator';
const app = express();
app.use(express.json());
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});
app.post('/calculate', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2 } = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = bmiCalculator(Number(value1), Number(value2));
  res.send(result);
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (!daily_exercises || !target || isNaN(target)) {
    res.status(400).send({ error: 'malformatted parameters' });
  } else if (daily_exercises) {
    /* eslint-disable */
    daily_exercises.forEach((val: any) => {
      if (isNaN(val)) {
        res.status(400).send({ error: 'malformatted parameters' });
      }
    });
    /* eslint-enable*/
  }
  /* eslint-disable */
  daily_exercises.unshift(target);
  const stats = exerciseArgs(daily_exercises);
  /* eslint-enable*/
  res.send(stats);
});

app.get('/bmi', (req, res) => {
  if (
    !req.query.height ||
    !req.query.weight ||
    isNaN(Number(req.query.height)) ||
    isNaN(Number(req.query.weight))
  ) {
    res.status(400).json({ error: 'malformatted parameters' });
  }
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const bmi = bmiCalculator(height, weight);
  res.send({ height, weight, bmi });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
