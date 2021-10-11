import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { CoursePart } from '../types';
import Part from './Part';


const Content = ({ courses }: { courses: CoursePart[] }) => {
  return (
    <div>
      {
        courses.map((course: CoursePart) => {
          return <Part key={uuidv4()} course={course} />
        })
      }
    </div>
  );
};

export default Content;