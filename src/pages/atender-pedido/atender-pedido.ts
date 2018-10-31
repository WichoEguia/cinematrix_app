import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PedidosProvider } from "../../providers/pedidos/pedidos";

@IonicPage()
@Component({
  selector: 'page-atender-pedido',
  templateUrl: 'atender-pedido.html',
})
export class AtenderPedidoPage {
  public pedido: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pedidosProvide: PedidosProvider,
    public alertCtrl: AlertController
  ) {
    this.pedido = this.navParams.get('pedido');
  }
}
