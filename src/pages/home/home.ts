import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { Usuario } from '../../models/usuario';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { AlertController } from 'ionic-angular';
import { PeliculaProvider } from '../../providers/pelicula/pelicula';
import { GLOBAL } from '../../providers/global';
import { DetallePeliculaPage } from '../detalle-pelicula/detalle-pelicula';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public log_page: string = 'login';
  public user: Usuario;
  public user_register: Usuario;
  public identity;
  public token;
  public errorMsg: string;
  public peliculas: any[];
  public url: string;
  public detallePelicula;
  public repassword: string;
  public app_name: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public up: UsuarioProvider,
              public alertCtrl: AlertController,
              public pp: PeliculaProvider,
              public menuCtrl: MenuController,
              public loadingCtrl: LoadingController) {
    this.url = GLOBAL.url;
    this.app_name = GLOBAL.app_name;
    
    this.user = new Usuario('', '', '', '', 'USER_ROLE', true);
    this.user_register = new Usuario('', '', '', '', 'USER_ROLE', true);
    
    this.identity = JSON.parse(this.up.getIdentity());
    this.token = this.up.getToken();

    if (this.up.getIdentity()) {
      this.obtenerPeliculas();
    }
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

        this.obtenerPeliculas();
        console.log('Usuario logeado');
        this.user = new Usuario('', '', '', '', 'USER_ROLE', true);
        this.user_register = new Usuario('', '', '', '', 'USER_ROLE', true);
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

          this.obtenerPeliculas();
          console.log('Usuario registrado');
          this.user = new Usuario('', '', '', '', 'USER_ROLE', true);
          this.user_register = new Usuario('', '', '', '', 'USER_ROLE', true);
          this.repassword = '';
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

  logOut() {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    this.identity = null;
    this.token = null;
    this.user = new Usuario('', '', '', '', 'USER_ROLE', true);
    this.user_register = new Usuario('', '', '', '', 'USER_ROLE', true);
  }

  obtenerPeliculas() {
    this.pp.getPeliculas().subscribe(
      (res: any) => {
        this.peliculas = res.peliculas;
      }, (err: any) => {
        console.log(err);
      }
    );
  }

  verDetallePelicula(pelicula) {
    this.navCtrl.push(DetallePeliculaPage, {
      data: pelicula
    });
  }
}
