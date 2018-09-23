import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from '../global';

@Injectable()
export class PedidosProvider {
  public url: string = '';

  constructor(public http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getIdentity() {
    const identity = localStorage.getItem('identity') ? localStorage.getItem('identity') : null;
    return identity;
  }

  getToken() {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
    return token;
  }

  getBoletos() {
    const headers = new HttpHeaders({ 'token': this.getToken() });
    return this.http.get(this.url + 'boletos/ver', { headers });
  }
}
