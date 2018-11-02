import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from '../global';

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

  getIdentity() {
    const identity = localStorage.getItem('identity') ? localStorage.getItem('identity') : null;
    return identity;
  }

  getToken() {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
    return token;
  }

  isAdmin() {
    let userData = JSON.parse(this.getIdentity());
    return userData.role == 'ADMIN_ROLE';
  }

  userUpdate(user) {
    const params = JSON.stringify(user);
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'token': this.getToken()
    });
    return this.http.put(this.url + 'usuario/' + user._id, params, { headers });
  }
}
