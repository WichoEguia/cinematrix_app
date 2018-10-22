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
  public productosSeleccionados: any;
  public boletosSeleccionados: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pedp: PedidosProvider
  ) {
    this.IdPedidoQR = this.navParams.get('pedidoId');
    this.boletosSeleccionados = this.navParams.get('boletosSeleccionados');
    this.productosSeleccionados = this.navParams.get('boletosSeleccionados');
  }
}
