import express from 'express';

interface ExerciseProfile {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export interface ExerciseParameters {
  target: number;
  daily_exercises: number[];
}

export const parseArguments = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { target, daily_exercises } = req.body as ExerciseParameters;

  if (!target || !daily_exercises || daily_exercises.length === 0)
    return res.status(400).send({ error: 'Parameters missing' });

  if (daily_exercises.length > 100 || isNaN(Number(target)))
    return res.status(400).send({ error: 'Malformatted parameters' });

  daily_exercises.map((ex) => {
    if (isNaN(Number(ex))) {
      return res.status(400).send({ error: 'Malformatted parameters' });
    }
    return Number(ex);
  });

  return next();
};

const ratings: { [key: number]: string } = {
  0: 'Can not calculate rating',
  1: 'You can do better',
  2: 'Not too bad, but could be better',
  3: 'Very good!',
};

/**
 * Returns one of three numeric values: [1, 2, 3] representing
 * how well users' exercise hours meet the target.
 * @param average - A number input
 * @param target - A number input
 */
const setRating = (average: number, target: number): number => {
  if (average >= target) return 3;
  if (target - average < 0.5) return 2;
  return 1;
};

/**
 * Returns an object representing a training profile
 * @param ExerciseParameters Input object consisting of 2 keys:
 * 1) target - a number input. Represents the desirable
 * amount of daily exercise.
 * 2) dailyExercises - A number array input.
 * Each cell represents an amount of exercise hours per day.
 */
export const calculateExercises = (
  params: ExerciseParameters
): ExerciseProfile => {
  const { target, daily_exercises } = params;
  const trainingHours: number = daily_exercises.reduce((a, b) => {
    return a + b;
  }, 0);

  const periodLength = daily_exercises.length;
  let average = 0;
  let rating = 0;
  let success = false;
  if (periodLength !== 0) {
    average = trainingHours / periodLength;
    success = average > target;
    rating = setRating(average, target);
  }

  return {
    periodLength,
    trainingDays: daily_exercises.filter((hours) => hours !== 0).length,
    success,
    rating,
    ratingDescription: ratings[rating],
    target,
    average,
  };
};
