import React from 'react';

import { CoursePart } from '../types';

import './Total.css';


const Total = ({ courses }: { courses: CoursePart[] }) => {
  const total = courses.reduce((prev: number, curr: CoursePart): number => {
    return prev + curr.exerciseCount;
  }, 0);

  return (
    <div className='total'>
      Number of exercises { total }
    </div>
  );
};


export default Total;