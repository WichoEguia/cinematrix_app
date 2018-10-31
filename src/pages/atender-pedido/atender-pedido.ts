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
  public asientos: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pedidosProvide: PedidosProvider,
    public alertCtrl: AlertController
  ) {
    this.pedido = JSON.parse(this.navParams.get('pedido'));
    this.asientos = JSON.parse(this.pedido.asientos);
  }
}
