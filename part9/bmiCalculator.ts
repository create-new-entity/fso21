
const calculateBmi = (height: number, weight: number): string => {

  if(height === 0) throw new Error('Can\'t divide by 0!');

  const bmi = weight / ((height * 0.01) * (height * 0.01));
  
  if(bmi < 18.5) return 'Underweight';
  if(bmi >= 18.5 && bmi < 25) return 'Normal (healthy weight)';
  if(bmi >= 25 && bmi < 30) return 'Overweight';
  return 'Obese';
};


try {
  console.log(calculateBmi(180, 74));
}
catch(err) {
  console.log(err);
}