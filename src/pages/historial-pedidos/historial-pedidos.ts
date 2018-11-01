import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidosProvider } from "../../providers/pedidos/pedidos";
import { GLOBAL } from "../../providers/global";

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
    public pedidosProvider: PedidosProvider
  ) {
    this.url = GLOBAL.url;
    this.token = this.pedidosProvider.getToken();
    this.pedidos = [];
    
    this.pedidosProvider.getPedidosUsuario().subscribe(
      (res: any) => this.pedidos = res.pedidos,
      (err: any) => console.log(err)
    );
  }
}
