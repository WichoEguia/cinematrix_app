import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Usuario } from '../../models/usuario';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { AlertController } from 'ionic-angular';

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
  public errorMsg: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public up: UsuarioProvider,
              public alertCtrl: AlertController) {
    this.user = new Usuario('', '', '', '', '', 'ROLE_USER', true);
    this.user_register = new Usuario('', '', '', '', '', 'ROLE_USER', true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  submitLogin() {
    this.up.loginProcess(this.user, 'login').subscribe(
      (res) => {
        this.identity = res.usuario;
        this.token = res.token;
        this.errorMsg = null;

        localStorage.setItem('token', res.token);
        localStorage.setItem('identity', JSON.stringify(this.identity));

        console.log('Usuario logeado');
      }, (err) => {
        this.errorMsg = <any>err;

        if (this.errorMsg) {
          this.errorMsg = err.error.err.message;
          this.alertCtrl.create({
            title: 'Fallo al logear',
            subTitle: this.errorMsg,
            buttons: ['OK']
          }).present();
        }
      }
    );
  }

  submitRegister() {
    this.up.loginProcess(this.user, 'registro').subscribe(
      (res) => {
        console.log(res);
        this.identity = res.usuario;
        this.token = res.token;
        this.errorMsg = null;

        localStorage.setItem('token', res.token);
        localStorage.setItem('identity', JSON.stringify(this.identity));

        console.log('Usuario registrado');
      }, (err) => {
        this.errorMsg = <any>err;

        if (this.errorMsg) {
          this.errorMsg = err.error.err.message;
          this.alertCtrl.create({
            title: 'Fallo al logear',
            subTitle: this.errorMsg,
            buttons: ['OK']
          }).present();
        }
      }
    );
  }
}
