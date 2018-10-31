import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { PedidosProvider } from '../../providers/pedidos/pedidos';
import { AtenderPedidoPage } from '../atender-pedido/atender-pedido';
// import { AtenderPedidoPage } from "../atender-pedido/atender-pedido";

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
    public pedidoP: PedidosProvider,
    public toastCtrl: ToastController
  ) {
    this.pedido = null;
  }

  scan() {
    console.log("Realizando scan...");
    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      console.log("result:", barcodeData.text);
      console.log("format:", barcodeData.format);
      console.log("cancelled:", barcodeData.cancelled);

      this.pedidoP.getPedido(barcodeData.text).subscribe(
        (res: any) => {
          let stringPedido: string = JSON.stringify(res.pedidos);
          this.navCtrl.push(AtenderPedidoPage, { pedido: stringPedido });
        },
        (err: any) => {
          this.alertCtrl.create({
            title: 'Error al obtener pedido',
            subTitle: 'err.error.err.message',
            buttons: ['ok']
          }).present();
        }
      );
      
    }, (err) => {
      // An error occurred
      console.error("Error: ", err);
      this.mostrar_toast("Error: " + err);
    });
  }

  mostrar_toast(mensaje: string) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2500
    });
    toast.present();
  }
}
