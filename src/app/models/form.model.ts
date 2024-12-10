import { FormControl } from '@angular/forms';

export interface UserFormControls {
  name: FormControl<string | null>;
  username: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
}

export interface UserForm {
  name: string;
  username: string;
  email: string;
  phone: string;
}