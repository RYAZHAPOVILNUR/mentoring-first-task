export interface CreateUser {
  id:number;
  name: string;
  username: string;
  email: string;
  company: {
    name: string;
  };
}
