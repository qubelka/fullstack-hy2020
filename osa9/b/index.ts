import express from 'express';
import { BmiParameters, calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello, Full Stack!');
});

app.get('/bmi', (req, res) => {
  const bmiQuery = req.query;
  const height = Number(bmiQuery.height);
  const weight = Number(bmiQuery.weight);

  if (
    !height ||
    !weight ||
    isNaN(height) ||
    isNaN(weight) ||
    height === 0 ||
    weight === 0
  ) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }

  const bmiParams: BmiParameters = {
    weight,
    height,
  };

  const result: string = calculateBmi(bmiParams);

  return res.json({ ...bmiParams, bmi: result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
