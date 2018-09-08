import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Usuario } from '../../models/usuario';
import { UsuarioProvider } from '../../providers/usuario/usuario';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public log_page: string = 'login';
  public user: Usuario;
  public user_register: Usuario;
  public identity;
  public token;

  constructor(public navCtrl: NavController, public navParams: NavParams, public up: UsuarioProvider) {
    this.user = new Usuario('', '', '', '', '', 'ROLE_USER', true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  submitLogin() {
    this.up.loginProcess(this.user, 'login').subscribe(
      (res) => {
        console.log(res);
      }, (err) => {
        console.log(err);
      }
    );
  }
}
