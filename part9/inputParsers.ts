import { BMI_INPUT_DATA } from "./bmiCalculator";
import { EXERCISE_INPUT_DATA } from "./exerciseCalculator";

const someInputsAreNotNumbers = (input:any) => isNaN(input);

const parseInputFor_exerciseCalculator = (args: Array<string>): EXERCISE_INPUT_DATA => {
  if(isNaN(Number(args[2])) || args.slice(3).some(someInputsAreNotNumbers)) throw new Error('One or more provided values were not numbers!');
  
  return {
    target: Number(args[2]),
    exerciseHours: args.slice(3).map(strNumber => Number(strNumber))
  }
}

const parseInputFor_bmiCalculator = (args: Array<string>): BMI_INPUT_DATA => {
  if(args.slice(2).length !== 2) throw new Error('Invalid number of parameters given.');
  if(args.slice(2).some(someInputsAreNotNumbers)) throw new Error('One or more provided values were not numbers!');

  return {
    height: Number(args[2]),
    weight: Number(args[3])
  }
};

const parseArgs = (args: Array<string>): (EXERCISE_INPUT_DATA | BMI_INPUT_DATA) => {
  
  const runningScript = args[1].split('\\')[args[1].split('\\').length-1].split('.')[0];
  if(runningScript === 'bmiCalculator') {
    return parseInputFor_bmiCalculator(args);
  }
  return parseInputFor_exerciseCalculator(args);
};

export default parseArgs;
