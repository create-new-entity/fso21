import React from 'react';

import {
  CoursePart,
  CourseNormalPart,
  CourseProjectPart,
  CourseSubmissionPart,
  CourseWithRequirementsPart
} from '../types';


const Part = ({ course }: { course: CoursePart } ) => {
  let partContent = null;
  const italicFontStyle = {
    fontStyle: 'italic'
  };
  

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  }

  const getNormalTypeContent = (course: CourseNormalPart) => {
    return (
      <div>
        <strong><p>{ course.name } { course.exerciseCount }</p></strong>
        <p style={italicFontStyle}>{ course.description }</p>
      </div>
    );
  };

  const getGroupProjectTypeContent = (course: CourseProjectPart) => {
    return (
      <div>
        <strong><p>{ course.name } { course.exerciseCount }</p></strong>
        <p>project exercises { course.groupProjectCount }</p>
      </div>
    );
  };

  const getSubmissionTypeContent = (course: CourseSubmissionPart) => {
    return (
      <div>
        <strong><p>{ course.name } { course.exerciseCount }</p></strong>
        <p style={italicFontStyle}>{ course.description }</p>
        submit to { course.exerciseSubmissionLink }
      </div>
    );
  };

  const getRequirementTypeContent = (course: CourseWithRequirementsPart) => {
    return (
      <div>
        <strong><p>{ course.name } { course.exerciseCount }</p></strong>
        <p style={italicFontStyle} >{ course.description }</p>
        required skills: { course.requirements.join(', ') };
      </div>
    );
  };

  switch(course.type) {

    case 'normal':
      partContent = getNormalTypeContent(course);
      break;

    case 'groupProject':
      partContent = getGroupProjectTypeContent(course);
      break;

    case 'submission':
      partContent = getSubmissionTypeContent(course);
      break;

    case 'special':
      partContent = getRequirementTypeContent(course);
      break;

    default:
      assertNever(course);
  }

  return partContent;
};

export default Part;