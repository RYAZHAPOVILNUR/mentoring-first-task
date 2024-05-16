import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { MaterialType } from '../../../shared/types/materials-types.type';
import { UsersBackType } from '../../../shared/types/users-backend.type';
import { AuthLocalStorageService } from './backend-local-storage.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersBackendService {
  apiUrl = environment.apiMaterialUrl;

  constructor(private http: HttpClient, private authLocalStorageService: AuthLocalStorageService, private router: Router) { }

  getAllBackUsers() {
    const token = this.authLocalStorageService.getTokenFromLocalStorage();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<UsersBackType[]>(this.apiUrl + 'users', { headers });
  }

  getBackUser(userId: number) {
    const token = this.authLocalStorageService.getTokenFromLocalStorage();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.apiUrl + 'users/' + userId, { headers }).pipe(
      catchError(() => {
        return this.router.navigate(['/login']);
      })
    );
  }

  addBackUser(materialName: MaterialType) {
    const token = this.authLocalStorageService.getTokenFromLocalStorage();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<MaterialType>(this.apiUrl + 'material', materialName, { headers });
  }

  deleteBackUser(materialId: number) {
    const token = this.authLocalStorageService.getTokenFromLocalStorage();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<{}>(this.apiUrl + 'material/' + materialId, { headers });
  }

  updateBackUser(userId: number, data: any) {
    const token = this.authLocalStorageService.getTokenFromLocalStorage();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<{}>(this.apiUrl + 'users/' + userId, data, { headers });
  }
}
