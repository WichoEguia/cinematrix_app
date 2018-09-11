import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FuncionesProvider } from '../../providers/funciones/funciones';

@IonicPage()
@Component({
  selector: 'page-funciones',
  templateUrl: 'funciones.html',
})
export class FuncionesPage {
  public idPelicula: any;
  public funciones: any[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public fp: FuncionesProvider) {
    this.idPelicula = this.navParams.get('idPelicula');

    this.fp.getFunciones(this.idPelicula).subscribe((res: any) => {
      this.funciones = res.funciones;
    }, (err: any) => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FuncionesPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
