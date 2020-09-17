import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EstablishmentsDTO } from './establishments.types';

@Injectable({
  providedIn: 'root',
})
export class EstablishmentsService {
  constructor(private _httpClient: HttpClient) {}

  getAll(): Promise<Array<EstablishmentsDTO>> {
    return this._httpClient
      .get<Array<EstablishmentsDTO>>(
        'https://my-json-server.typicode.com/james-delivery/frontend-challenge/establishments'
      )
      .toPromise<Array<EstablishmentsDTO>>();
  }

  get(id: string): Promise<EstablishmentsDTO> {
    return this._httpClient
      .get<EstablishmentsDTO>(
        `https://my-json-server.typicode.com/james-delivery/frontend-challenge/establishments/${id}`
      )
      .toPromise<EstablishmentsDTO>();
  }
}
