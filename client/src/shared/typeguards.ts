import { Classroom, Discussion } from './types';

export const isClassroom = (obj: any): obj is Classroom =>
  (obj as Classroom)?.discussionsCount !== undefined;

export const isDiscussion = (obj: any): obj is Discussion =>
  (obj as Discussion)?.classroomId !== undefined;
