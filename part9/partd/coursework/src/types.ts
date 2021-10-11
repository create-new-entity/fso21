interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface Description extends CoursePartBase {
  description: string;
}

export interface CourseNormalPart extends Description {
  type: "normal";
}

export interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

export interface CourseSubmissionPart extends Description {
  type: "submission";
  exerciseSubmissionLink: string;
}

export interface CourseWithRequirementsPart {
  type: "special";
  name: string;
  exerciseCount: number;
  description: string;
  requirements: string[];
}



export type CoursePart =
  CourseNormalPart |
  CourseProjectPart |
  CourseSubmissionPart |
  CourseWithRequirementsPart;