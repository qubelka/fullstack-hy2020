interface exerciseProfile {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

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
 * Returns an object representing an training profile
 * @param dailyExercises - A number array input.
 * Each cell represents an amount of exercise hours per day.
 * @param target - A number input. Represents the desirable
 * amount of daily exercise.
 */
const calculateExercises = (
  dailyExercises: number[],
  target: number
): exerciseProfile => {
  const trainingHours: number = dailyExercises.reduce((a, b) => {
    return a + b;
  }, 0);

  const periodLength = dailyExercises.length;
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
    trainingDays: dailyExercises.filter((hours) => hours !== 0).length,
    success,
    rating,
    ratingDescription: ratings[rating],
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2)); // 'Not too bad, but could be better'
console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2.4)); // 'Not too bad, but could be better'
console.log(calculateExercises([], 2)); // 'Can not calculate rating'
console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1, 3], 1.9)); // 'Very good!'
