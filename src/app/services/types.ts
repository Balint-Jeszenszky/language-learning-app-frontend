
export enum Role {
  ROLE_TEACHER = 'ROLE_TEACHER',
  ROLE_STUDENT = 'ROLE_STUDENT',
}

export type UserDetails = {
  id: number;
  name: string;
  email: string;
  roles: Role[];
}

export type Tokens = {
  accessToken: string;
  refreshToken: string;
}

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: UserDetails;
}

export enum TokenType {
  access = 'access',
  refresh = 'refresh',
}

export type TokenPayload = {
  sub: string,
  iat: number;
  type: TokenType,
  name: string;
  id: number;
  roles: Role[];
  exp: number;
}

export type Course = {
  id: number;
  name: string;
  description: string;
  deadline?: Date;
  teacher: {
    id: number;
    name: string;
  };
}

export type WordPair = {
  id?: number;
  word: string;
  translation: string;
  metadata: string[];
}

export type CreateCourseRequest = {
  name: string;
  description: string;
  deadline?: Date;
}

export type CreateCourseResponse = {
  id: number;
  name: string;
  description: string;
  deadline?: Date;
  teacher: {
    id: number;
    name: string;
  }
}

export type EditCourseRequest = {
  id: number;
  name: string;
  description: string;
  deadline?: Date;
  studentEmails: string[];
}

export type Studnet = {
  id: number;
  name: string;
  email: string;
  score?: number;
}

export type CourseDetails = {
  id: number;
  name: string;
  description: string;
  deadline?: Date;
  students: Studnet[];
}
