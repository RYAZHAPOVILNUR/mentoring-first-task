import { TUserDTO, TUserEntity, TUserVM } from "./users-data.models";

export type TUsersDataAdapter = {
  DTOtoEntity(dto: TUserDTO): TUserEntity;
  entityToVM(entity: TUserEntity): TUserVM;
  VMtoEntity(vm: TUserVM): TUserEntity;
}

export const usersDataAdapter: TUsersDataAdapter = {
  DTOtoEntity(dto) {
    const { id, name, email, phone } = dto;
    return { id, name, email, phone };
  },

  entityToVM(entity) {
    const { name, email, phone } = entity;
    return { name, email, phone };
  },

  VMtoEntity(vm) {
    const id = new Date().getTime();
    return { id, ...vm }
  },
}
