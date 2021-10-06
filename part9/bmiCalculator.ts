import parseArgs from './inputParsers';

export interface BMI_INPUT_DATA {
  height: number,
  weight: number
}


const calculateBmi = (bmiData: BMI_INPUT_DATA): string => {

  if(bmiData.height === 0) throw new Error('Can\'t divide by 0!');

  const bmi = bmiData.weight / ((bmiData.height * 0.01) * (bmiData.height * 0.01));
  
  if(bmi < 18.5) return 'Underweight';
  if(bmi >= 18.5 && bmi < 25) return 'Normal (healthy weight)';
  if(bmi >= 25 && bmi < 30) return 'Overweight';
  return 'Obese';
};


try {
  const args = parseArgs(process.argv);
  console.log(calculateBmi(args as BMI_INPUT_DATA));
}
catch(err) {
  console.log(`Found ERROR!!: ${err.message}`);
}

export default calculateBmi;