import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FolderType } from '../../../shared/types/materials-types.type';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  apiUrl = environment.apiMaterialUrl;

  constructor(private http: HttpClient) { }

  getAllFolders() {
    return this.http.get<FolderType[]>(this.apiUrl + 'folder')
  }
  addFolder(folder: string) {
    return this.http.post<FolderType>(this.apiUrl + 'folder', { title: folder });
  }
  deleteFolder(folderId: number): Observable<number> {
    return this.http.delete<number>(this.apiUrl + 'folder/' + folderId);
  }
}
