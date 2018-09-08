import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from '../global';

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {
  public url: string;

  constructor(public http: HttpClient) {
    this.url = GLOBAL.url;
  }

  loginProcess(user, action){
    const params = JSON.stringify(user);
    const headers = new HttpHeaders({ 'Content-type': 'application/json' });
    return this.http.post(this.url + 'usuario/' + action, params, { headers });
  }

}
