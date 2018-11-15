
export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: User.Gender;
  ipAddress: string;
}

export module User {
  export enum Gender {
    Male = 'Male',
    Female = 'Female'
  }
}

export type UserFilters = Partial<User>;

export default User;
