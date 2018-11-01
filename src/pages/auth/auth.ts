import { Component } from '@angular/core';
import { Nav, NavController, NavParams, MenuController, AlertController, LoadingController } from 'ionic-angular';
import { Usuario } from '../../models/usuario';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { GLOBAL } from '../../providers/global';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {
  public log_page: string = 'login';
  public user: Usuario;
  public user_register: Usuario;
  public identity;
  public token;
  public errorMsg: string;
  public url: string;
  public repassword: string;
  public app_name: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public up: UsuarioProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController
  ) {
    this.url = GLOBAL.url;
    this.app_name = GLOBAL.app_name;

    this.user = new Usuario('', '', '', '', 'USER_ROLE', true);
    this.user_register = new Usuario('', '', '', '', 'USER_ROLE', true);

    this.identity = JSON.parse(this.up.getIdentity());
    this.token = this.up.getToken();

    this.menuCtrl.enable(false, 'myMenu');
  }

  submitLogin() {
    let loading = this.loadingCtrl.create({
      content: 'Iniciando...'
    });

    loading.present();

    this.up.loginProcess(this.user, 'login').subscribe(
      (res: any) => {
        loading.dismiss();
        this.identity = res.usuario;
        this.token = res.token;
        this.errorMsg = null;

        localStorage.setItem('token', res.token);
        localStorage.setItem('identity', JSON.stringify(this.identity));

        console.log('Usuario logeado');
        this.user = new Usuario('', '', '', '', 'USER_ROLE', true);
        this.user_register = new Usuario('', '', '', '', 'USER_ROLE', true);

        this.menuCtrl.enable(true, 'myMenu');
        this.navCtrl.setRoot(HomePage);
      }, (err: any) => {
        loading.dismiss();
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
    if (this.user_register.password === this.repassword) {
      this.up.loginProcess(this.user_register, 'registro').subscribe(
        (res: any) => {
          console.log(res);
          this.identity = res.usuario;
          this.token = res.token;
          this.errorMsg = null;

          localStorage.setItem('token', res.token);
          localStorage.setItem('identity', JSON.stringify(this.identity));

          console.log('Usuario registrado');
          this.user = new Usuario('', '', '', '', 'USER_ROLE', true);
          this.user_register = new Usuario('', '', '', '', 'USER_ROLE', true);
          this.repassword = '';

          this.menuCtrl.enable(true, 'myMenu');
          this.navCtrl.setRoot(HomePage);
        }, (err: any) => {
          this.errorMsg = <any>err;

          if (this.errorMsg) {
            this.errorMsg = err.error.err.message;
            this.alertCtrl.create({
              title: 'Fallo al registrar',
              subTitle: this.errorMsg,
              buttons: ['OK']
            }).present();
          }
        }
      );
    } else {
      this.alertCtrl.create({
        title: 'Fallo al registrar',
        subTitle: 'Contraseñas no coinciden :(',
        buttons: ['OK']
      }).present();
    }
  }
}
