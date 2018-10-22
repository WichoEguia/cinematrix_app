import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidosProvider } from '../../providers/pedidos/pedidos';
import { GLOBAL } from '../../providers/global';

@IonicPage()
@Component({
  selector: 'page-qr',
  templateUrl: 'qr.html',
})
export class QrPage {
  public pedido: any;
  public IdPedidoQR: string;
  public funcion: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pedp: PedidosProvider
  ) {
    this.pedido = this.navParams.get('pedido');
    this.IdPedidoQR = this.pedido._id;
    this.funcion = this.navParams.get('funcion');
  }
}
