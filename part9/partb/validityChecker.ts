import { EXERCISE_INPUT_DATA } from "./exerciseCalculator";

export const exerciseCalculator_DataIsValid = (inputData: EXERCISE_INPUT_DATA): void => {
  const notANumber = (exerciseHour: number) => isNaN(exerciseHour);
  const someInputsAreNotNumbers = (
      inputData.exerciseHours.map((exerciseHour: number) => Number(exerciseHour)).some(notANumber)
    || isNaN(Number(inputData.target))
  );

  if(someInputsAreNotNumbers) throw new Error('malformatted parameters');
};
