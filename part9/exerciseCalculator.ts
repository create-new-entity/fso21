import parseArgs from './inputParsers';

interface ExerciseData {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export interface EXERCISE_INPUT_DATA {
  target: number,
  exerciseHours: Array<number>
}


const calculateExercises = (inputData: EXERCISE_INPUT_DATA): ExerciseData => {
  const getRating = () => {
    if(success) return 3;
    if(inputData.target - average <= 0.5) return 2;
    return 1;
  };
  const getRatingDescription = () => {
    if(rating === 3) return 'Perfect!!';
    if(rating === 2) return 'OK. Can be better.';
    return 'Not Good.';
  }

  const trainingDays = inputData.exerciseHours.filter(hour => hour !== 0).length;
  const totalHours = inputData.exerciseHours.reduce((prev, curr) => prev + curr);
  
  const average = (totalHours && inputData.exerciseHours.length) ? (totalHours / inputData.exerciseHours.length) : 0;
  const success = average > inputData.target ? true : false;
  const rating = getRating();
  const ratingDescription = getRatingDescription();
  
  

  return {
    periodLength: inputData.exerciseHours.length,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: inputData.target,
    average
  }
};

try {
  const args = parseArgs(process.argv);
  console.log(calculateExercises(args as EXERCISE_INPUT_DATA));
}
catch(err) {
  console.log(`Found ERROR!!: ${err.message}`);
}