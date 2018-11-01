import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidosProvider } from "../../providers/pedidos/pedidos";
import { GLOBAL } from "../../providers/global";

@IonicPage()
@Component({
  selector: 'page-ver-informacion-pedido',
  templateUrl: 'ver-informacion-pedido.html',
})
export class VerInformacionPedidoPage {
  public url: string;
  public pedido: any;
  public asientos: any;
  public token: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pedidosProvider: PedidosProvider
  ) {
    this.url = GLOBAL.url;
    this.pedido = this.navParams.get('pedido');
    this.asientos = JSON.parse(this.pedido.asientos);
    this.token = this.pedidosProvider.getToken();
  }
}
