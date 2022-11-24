interface exerciseCalulation {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
export const exerciseArgs = (args: Array<number>): exerciseCalulation => {
  if (args.length <= 3) throw new Error('Not enough arguments');
  args = args.slice(2);
  let targetReached,
    ratingDescription,
    rating,
    trainingDays = 0;
  const target = args.shift()!;
  const NumsOfDays = args.length;
  for (let i = 0; i < NumsOfDays; i++) {
    if (args[i] != 0) {
      trainingDays++;
    }
  }
  const averageTimeDaily =
    args.reduce((acc, curr) => {
      const i = acc;
      const j = curr;
      return i + j;
    }, 0) / args.length;

  if (averageTimeDaily >= target) {
    ratingDescription = 'sheesh';
    targetReached = true;
    rating = 3;
  } else {
    if (target / averageTimeDaily > 0.05) {
      ratingDescription = "I mean that's alright";
      rating = 2;
    } else {
      ratingDescription = 'DS';
      rating = 1;
    }
    targetReached = false;
  }
  return {
    periodLength: NumsOfDays,
    trainingDays: trainingDays,
    success: targetReached,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: averageTimeDaily,
  };
};

/*
try {
  const newArgs = process.argv.map((arg) => Number(arg));
  console.log(exerciseArgs(newArgs));
} catch (error) {
  console.log(error);
}
*/
