import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PeliculaProvider } from '../../providers/pelicula/pelicula';
import { GLOBAL } from '../../providers/global';

@IonicPage()
@Component({
  selector: 'page-detalle-pelicula',
  templateUrl: 'detalle-pelicula.html',
})
export class DetallePeliculaPage {
  public pelicula;
  public url: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public pp: PeliculaProvider) {
    this.url = GLOBAL.url;
    this.pelicula = navParams.get('data');
  }

  ionViewDidLoad() {
    this.verDetallePelicula(this.pelicula);
  }

  verDetallePelicula(pelicula) {
    console.log(pelicula);
    this.pp.getDetallePelicula(pelicula).subscribe(
      (res: any) => {
        this.pelicula = res.pelicula;
      }, (err: any) => {
        console.log(err);
      }
    );
  }

}
