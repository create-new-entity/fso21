import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Course, Courses } from './../types';


const Content = ({ courses }: Courses) => {
  return (
    <div>
      {
        courses.map((course: Course) => {
          return <div key={uuidv4()}>{course.name} -- {course.exerciseCount}</div>
        })
      }
    </div>
  );
};

export default Content;