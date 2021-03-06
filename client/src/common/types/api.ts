export type User = {
  id?: string;
  role?: 'student' | 'faculty';
} & UserBase;

export type UserBase = {
  name: string;
  username: string;
  email: string;
  password: string;
  imageUrl?: string;
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

export type Classrooms = {
  classrooms: Classroom[];
  classroomsCount: number;
};

export type Message = {
  id: number;
  body: string;
  createdAt: string;
  createdBy: string;
  createdByImageUrl: string;
};

export type Photo = {
  id: string;
  url: string;
  isMain: boolean;
};
