export interface IGetEstablishmentsDTO {
  latitude: string;
  longitude: string;
  radius: string;
}

export interface ICreateEstablishmentDTO {
  name: string;
  cnpj: string;
  place: ICreatePlaceDTO;
}

export interface ICreateTermDTO {
  name: string;
  description: string;
}

export interface IUpdateEstablishmentDTO {
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  isActive: boolean;
  status: string;
}

export interface IGetTermDTO {
  id: string;
}

export interface IGetPlacesByEstablishmentDTO {
  id: string;
}
export interface IGetEstablishmentDTO {
  id: string;
}

export interface IUpdateTermDTO {
  name: string;
  description: string;
  type: string;
}

export enum ModelTypeEnum {
  ESTABLISHMENTS = 'establishments',
  USERS = 'users',
}
export interface ICreatePlaceDTO {
  name?: string;
  country?: string;
  zipCode?: string;
  state?: string;
  city?: string;
  neighborhood?: string;
  street?: string;
  number?: string;
  complement?: string;
  latitude: number;
  longitude: number;
  modelId?: string;
  modelType?: ModelTypeEnum;
}
