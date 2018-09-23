import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FuncionesProvider } from '../../providers/funciones/funciones';
import { PedidoPage } from '../pedido/pedido';
import { GLOBAL } from '../../providers/global';

@IonicPage()
@Component({
  selector: 'page-funciones',
  templateUrl: 'funciones.html',
})
export class FuncionesPage {
  public idPelicula: any;
  public funciones: any[];
  public url: string = '';
  public token: string = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public fp: FuncionesProvider) {
    this.idPelicula = this.navParams.get('idPelicula');
    this.url = GLOBAL.url;
    this.token = this.fp.getToken();

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

  seleccionaFuncion(dataFuncion: any) {
    this.navCtrl.push(PedidoPage, {
      dataFuncion
    });
  }
}
