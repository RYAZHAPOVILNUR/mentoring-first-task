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

}
