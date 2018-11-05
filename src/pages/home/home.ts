import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
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
  public identity;
  public token;
  public peliculas: any[];
  public url: string;
  public detallePelicula;
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
    
    this.identity = JSON.parse(this.up.getIdentity());
    this.token = this.up.getToken();
    this.obtenerPeliculas();
  }

  logOut() {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    this.identity = null;
    this.token = null;
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
