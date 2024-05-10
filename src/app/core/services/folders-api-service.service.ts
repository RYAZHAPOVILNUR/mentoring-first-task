import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FolderType } from '../../shared/types/folders-types.type';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  apiUrl = environment.apiMaterialUrl;

  constructor(private http: HttpClient) { }

  getAllFolders() {
    return this.http.get<FolderType[]>(this.apiUrl + 'folder')
  }
  getFolder(folderId: number) {
    return this.http.get<FolderType>(this.apiUrl + 'folder/' + folderId)
  }

  addFolder(folderName: string) {
    return this.http.post<{ title: string }>(this.apiUrl + 'folder', { "title": folderName })
  }
  deleteFolder(folderId: number) {
    return this.http.delete<{}>(this.apiUrl + 'folder/' + folderId)
  }

}
