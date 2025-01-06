export interface NewUser {
  name: string;
  email: string;
  website: string;
  company: {
    name: string;
  };
  isEdit: boolean;
}
