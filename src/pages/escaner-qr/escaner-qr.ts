import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { PedidosProvider } from '../../providers/pedidos/pedidos';

@IonicPage()
@Component({
  selector: 'page-escaner-qr',
  templateUrl: 'escaner-qr.html',
})
export class EscanerQrPage {
  public pedido: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public barcodeScanner: BarcodeScanner,
    public pedidoP: PedidosProvider
  ) {
    this.pedido = null;
  }

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      let pedidoId = barcodeData.text;
      this.pedidoP.getPedido(pedidoId).subscribe(
        (res: any) => this.pedido = res.pedido,
        (err: any) => console.log(err)
      );
    }).catch(err => {
      console.log('Error', err);
    });
  }
}
