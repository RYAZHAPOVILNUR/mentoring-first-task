import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MaterialType } from '../../shared/types/materials-types.type';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  apiUrl = environment.apiMaterialUrl;

  constructor(private http: HttpClient) { }

  getAllMaterials() {
    return this.http.get<MaterialType[]>(this.apiUrl + 'material')
  }
  getMaterial(materialId: number) {
    return this.http.get<MaterialType>(this.apiUrl + 'material/' + materialId)
  }

  addMaterial(materialName: MaterialType) {
    return this.http.post<MaterialType>(this.apiUrl + 'material', materialName)
  }
  deleteMaterial(materialId: number) {
    return this.http.delete<{}>(this.apiUrl + 'material/' + materialId)
  }

}
