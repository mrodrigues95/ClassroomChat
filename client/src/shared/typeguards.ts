import { MenuAction } from '../components/Sidebar/components/classrooms_menu/ClassroomMenu';
import { Classroom, Discussion } from './types/api';

export const isClassroom = (obj: any): obj is Classroom =>
  (obj as Classroom)?.discussionsCount !== undefined;

export const isDiscussion = (obj: any): obj is Discussion =>
  (obj as Discussion)?.classroomId !== undefined;

export const isMenuAction = (obj: any): obj is MenuAction =>
  (obj as MenuAction)?.type !== undefined;
