import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiService = inject(HttpClient)
  constructor() { }

  getData(url: string){
    return this.apiService.get(url)
  }
}
