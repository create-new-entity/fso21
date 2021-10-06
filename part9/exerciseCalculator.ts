interface ExerciseData {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}


const calculateExercises = (exerciseHours: Array<number>, target: number): ExerciseData => {
  const trainingDays = exerciseHours.filter(hour => hour !== 0).length;
  const totalHours = exerciseHours.reduce((prev, curr) => prev + curr);
  const average = (totalHours && exerciseHours.length) ? (totalHours / exerciseHours.length) : 0;
  const successOrFail = average > target ? true : false;
  const getRating = () => {
    if(trainingDays === 7) return 3;
    if(trainingDays > 3) return 2;
    return 1;
  };
  const getRatingDescription = () => {
    if(trainingDays === 7) {
      if(successOrFail) return 'Great!! You are working out consistently and hitting target.';
      return 'Almost there try a bit harder.';
    }
    if(trainingDays > 3) {
      if(successOrFail) return 'Good job!! You are working out consistently and hitting target.';
      return 'Try to be a bit more consistent';
    }
    if(successOrFail) return 'You\'ve hit target, that\'s all that matters.';
    return 'Not good.';
  }
  

  return {
    periodLength: exerciseHours.length,
    trainingDays,
    success: successOrFail,
    rating: getRating(),
    ratingDescription: getRatingDescription(),
    target,
    average
  }
};


console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));