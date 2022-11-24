/*
type Arguments = {
  value1: number;
  value2: number;
};

const parseArguments = (args: Array<string>): Arguments => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};
*/

export const bmiCalculator = (height: number, weight: number): string => {
  if (isNaN(height) || isNaN(weight)) {
    throw new Error('arguments is NaN');
  }
  const heightInMeters = (height /= 100);
  const bmi = weight / (heightInMeters * heightInMeters);
  if (bmi < 16) {
    return 'Underweight (Severe thinness)';
  } else if (bmi >= 16 && bmi <= 16.9) {
    return 'Underweight (Moderate thinness)';
  } else if (bmi >= 17 && bmi <= 18.4) {
    return 'Underweight (Mild thinness)';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return 'Normal range';
  } else if (bmi >= 25 && bmi <= 29.9) {
    return 'Overweight (Pre-obese)';
  } else if (bmi >= 30 && bmi <= 34.9) {
    return 'Obese (Class 1)';
  } else if (bmi >= 35 && bmi <= 39.9) {
    return 'Obese (Class 2)';
  }
  return 'Obese (Class 3)';
};
/*
try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(bmiCalculator(value1, value2));
} catch (error) {
  console.log(error);
}
*/
