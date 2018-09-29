import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { PedidosProvider } from '../../providers/pedidos/pedidos';
import { ProductosPage } from '../productos/productos';
import { GLOBAL } from '../../providers/global';
import * as $ from 'jquery';

@IonicPage()
@Component({
  selector: 'page-pedido',
  templateUrl: 'pedido.html',
})
export class PedidoPage {
  public funcion: any;
  public boletos: any;
  public url: string;
  public token: string;
  public identity: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public pedp: PedidosProvider,
              public modalCtrl: ModalController) {
    this.funcion = this.navParams.get('dataFuncion');
    this.url = GLOBAL.url;
    
    this.token = this.pedp.getToken();
    this.identity = JSON.parse(this.pedp.getIdentity());

    this.pedp.getBoletos().subscribe(
      (res: any) => {
        this.boletos = res.boletos;
        // console.log(this.boletos);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  agregaBoleto(id) {
    let cantidadBoletos = parseInt($("#" + id).text());
    $("#" + id).text(cantidadBoletos + 1);
  }

  remueveBoleto(id) {
    let cantidadBoletos = parseInt($("#" + id).text());
    if (cantidadBoletos != 0) {
      $("#" + id).text(cantidadBoletos - 1);
    }
  }

  mostrarModalProductos() {
    let productosModal = this.modalCtrl.create(ProductosPage);

    productosModal.present();
  }

  crearPedido() {
    // this.boletos.forEach(boleto => {
    //   console.log(boleto._id + "," + $("#" + boleto._id).text());
    // });
  }
}
