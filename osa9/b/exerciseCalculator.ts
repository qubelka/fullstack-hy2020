interface ExerciseProfile {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseParameters {
  target: number;
  dailyExercises: number[];
}

type ExerciseInput = {
  inputTarget: string;
  inputDailyExercises: string[];
};

const parseArguments = (args: ExerciseInput): ExerciseParameters => {
  const { inputTarget, inputDailyExercises } = args;
  if (!inputTarget || !inputDailyExercises[0])
    throw new Error('Not enought arguments');

  // max periodLength 100 days ¯\_(ツ)_/¯
  if (inputDailyExercises.length > 100) throw new Error('Too many arguments');

  let target: number;
  if (!isNaN(Number(inputTarget))) {
    target = Number(inputTarget);
  } else {
    throw new Error('Target should be a number!');
  }

  const dailyExercises: number[] = inputDailyExercises.map((ex) => {
    if (isNaN(Number(ex))) {
      throw new Error('Exercise hours should be expressed as numbers!');
    }
    return Number(ex);
  });

  return { target, dailyExercises };
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
const calculateExercises = (params: ExerciseParameters): ExerciseProfile => {
  const { target, dailyExercises } = params;
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

try {
  const [, , inputTarget, ...inputDailyExercises] = process.argv;
  const exerciseData = parseArguments({ inputTarget, inputDailyExercises });
  console.log(calculateExercises(exerciseData));
} catch (e) {
  console.log(`Error: ${e.message}`);
}

/* 
    Test cases:
    console.log(calculateExercises(2, [3, 0, 2, 4.5, 0, 3, 1])); 
    npm run calculateExercises 2 3 0 2 4.5 0 3 1
    // 'Not too bad, but could be better'
    * * *
    console.log(calculateExercises(2.4, [3, 0, 2, 4.5, 0, 3, 1])); 
    npm run calculateExercises 2.4 3 0 2 4.5 0 3 1
    // 'Not too bad, but could be better'
    * * *
    console.log(calculateExercises(2, [])); // 'Can not calculate rating'
    npm run calculateExercises 2 // 'Not enough arguments'
    * * *
    console.log(calculateExercises(1.9, [3, 0, 2, 4.5, 0, 3, 1, 3])); 
    npm run calculateExercises 1.9 3 0 2 4.5 0 3 1
    // 'Very good!' 
    * * *
    npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4 // 'Not too bad, but could be better'
    * * *
    npm run calculateExercises hello 5 // Error: Target should be a number!
    * * *
    npm run calculateExercises 2 there // Error: Exercise hours should be expressed as numbers!
*/
