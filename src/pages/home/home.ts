import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public up: UsuarioProvider,
              public alertCtrl: AlertController,
              public pp: PeliculaProvider) {
    this.url = GLOBAL.url;

    this.user = new Usuario('', '', '', '', 'USER_ROLE', true);
    this.user_register = new Usuario('', '', '', '', 'USER_ROLE', true);

    this.identity = this.up.getIdentity();
    this.token = this.up.getToken();

    if (this.up.getIdentity()) {
      this.obtenerPeliculas();
    }
  }

  submitLogin() {
    this.up.loginProcess(this.user, 'login').subscribe(
      (res: any) => {
        this.identity = res.usuario;
        this.token = res.token;
        this.errorMsg = null;

        localStorage.setItem('token', res.token);
        localStorage.setItem('identity', JSON.stringify(this.identity));

        this.obtenerPeliculas();
        console.log('Usuario logeado');
      }, (err: any) => {
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
    console.log(this.user_register);
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
      }, (err: any) => {
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

  logOut() {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    this.identity = null;
    this.token = null;
    this.user = new Usuario('', '', '', '', 'ROLE_USER', true);
    this.user_register = new Usuario('', '', '', '', 'ROLE_USER', true);
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
