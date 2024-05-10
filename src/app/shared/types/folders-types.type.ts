export type FolderType = {
  "id": number,
  "created_at": number,
  "title": string
}

export type MaterialType = {
  "id": number,
  "created_at": number,
  "title": string,
  "material_link": string,
  "folder_id": number
}

export type MaterialsDataType = {
  folder: FolderType[]
  materials: MaterialType[]
}