
export module User {
  export enum Gender {
    Male = "Male",
    Female = "Female"
  }
}

export interface User {
  _id?: number;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: User.Gender;
  ipAddress: string;
}

export type UserFilters = Partial<User>;

export default User;
