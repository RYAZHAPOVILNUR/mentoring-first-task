import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FolderType, MaterialType } from '../../shared/types/folders-types.type';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  apiUrl = environment.apiMaterialUrl;

  constructor(private http: HttpClient) { }

  getAllMaterials() {
    return this.http.get<MaterialType[]>(this.apiUrl + 'material')
  }
  getMaterial(folderId: number) {
    return this.http.get<MaterialType[]>(this.apiUrl + 'material/' + folderId)
  }

}
