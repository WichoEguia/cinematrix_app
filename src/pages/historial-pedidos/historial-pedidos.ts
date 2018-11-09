import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PedidosProvider } from "../../providers/pedidos/pedidos";
import { GLOBAL } from "../../providers/global";
import { VerInformacionPedidoPage } from '../ver-informacion-pedido/ver-informacion-pedido';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-historial-pedidos',
  templateUrl: 'historial-pedidos.html',
})
export class HistorialPedidosPage {
  public pedidos: any;
  public url: string;
  public token: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pedidosProvider: PedidosProvider,
    public loadingCtrl: LoadingController
  ) {
    let loading = this.loadingCtrl.create({
      content: 'Espere...'
    });

    loading.present();

    this.url = GLOBAL.url;
    this.token = this.pedidosProvider.getToken();
    this.pedidos = [];
    
    this.pedidosProvider.getPedidosUsuario().subscribe(
      (res: any) => {
        loading.dismiss();

        res.pedidos.forEach(pedido => {
          let str =  pedido.fecha_creacion;
          // console.log(moment(str).utc().format('YYYY-MM-DD HH:mm'));
          pedido.fecha_creacion = moment(str).utc().format('YYYY-MM-DD HH:mm');
        });

        this.pedidos = res.pedidos
      },
      (err: any) => {
        loading.dismiss();
        console.log(err);
      }
    );
  }

  verInformacionPedido(pedido) {
    this.navCtrl.push(VerInformacionPedidoPage, { pedido });
  }
}
