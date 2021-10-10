import React from 'react';

import { Course, Courses } from '../types';

const Total = ({ courses }: Courses) => {
  const total = courses.reduce((prev: number, curr: Course): number => {
    return prev + curr.exerciseCount;
  }, 0);

  return (
    <div>
      Number of exercises { total }
    </div>
  );
};


export default Total;