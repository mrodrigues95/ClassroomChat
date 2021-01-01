export type User = {
  id?: string;
  role?: 'student' | 'faculty';
} & UserBase;

export type UserBase = {
  name: string;
  email: string;
  password: string;
};

export type Discussion = {
  id: number;
  classroomId: number;
  name: string;
};

export type Classroom = {
  id: number;
  name: string;
  discussions?: Discussion[];
  discussionsCount: number;
};
