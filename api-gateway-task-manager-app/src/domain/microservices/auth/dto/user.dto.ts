export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface ILoginDTO {
  email: string;
  password: string;
}

export interface IGetUserDTO {
  id: string;
}
