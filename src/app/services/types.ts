
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
