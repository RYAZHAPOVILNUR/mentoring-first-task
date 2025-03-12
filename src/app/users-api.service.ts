import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class UsersApiService {
users: any;
  deleteUser(id: number) {
    throw new Error("Method not implemented.");
  }
    readonly apiService = inject(HttpClient);
    
getusers(){
    return this.apiService.get('https://jsonplaceholder.typicode.com/users');
  } 
} 















/* مثال عن الدرس

class test1 {
    filed: number;
    filed2: number;
    constructor() {
        this.filed = 10;
        this.filed2 = 20;
    }
}
const newClassTest1 = new test1();
newClassTest1.filed;

*/