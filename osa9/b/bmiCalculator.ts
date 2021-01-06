const calculateBmi = (height: number, weight: number): string => {
  if (height === 0 || weight === 0) {
    throw new Error('Height or weight information is missing!');
  }

  const heightInMeters = height / 100;
  const bmi = +(weight / heightInMeters ** 2).toFixed(1);

  if (bmi <= 15) {
    return 'Very severely underweight';
  } else if (bmi <= 16) {
    return 'Severely underweight';
  } else if (bmi <= 18.5) {
    return 'Underweight';
  } else if (bmi <= 25) {
    return 'Normal (healthy weight)';
  } else if (bmi <= 30) {
    return 'Overweight';
  } else if (bmi <= 35) {
    return 'Obese Class I (Moderately obese)';
  } else if (bmi <= 40) {
    return 'Obese Class II (Severely obese)';
  } else {
    return 'Obese Class III (Very severely obese)';
  }
};

try {
  console.log(calculateBmi(180, 74)); // 22.8 Normal (healthy weight)
  console.log(calculateBmi(180, 100)); // 30.9 Obese Class I (Moderately obese)
  console.log(calculateBmi(180, 60)); // 18.5 Underweight
  console.log(calculateBmi(160, 38)); // 14.8 Very severely underweight
  console.log(calculateBmi(0, 74)); // Error: Height or weight information is missing!
} catch (e) {
  console.log(`Error: ${e.message}`);
}
