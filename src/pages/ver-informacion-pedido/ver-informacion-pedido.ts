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
  public boletos: any;
  public productos: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pedidosProvider: PedidosProvider
  ) {
    this.url = GLOBAL.url;
    this.pedido = this.navParams.get('pedido');
    this.asientos = JSON.parse(this.pedido.asientos);
    this.token = this.pedidosProvider.getToken();

    console.log(this.pedido);

    this.contabilizaBoletos();
    this.contabilizaProductos();
  }

  contabilizaBoletos() {
    this.boletos = [
      {
        tipo: 'niño',
        cantidad: 0
      }, {
        tipo: 'adulto',
        cantidad: 0
      }, {
        tipo: 'anciano',
        cantidad: 0
      }
    ];

    this.pedido.boletos.forEach(boleto => {
      switch (boleto.tipo) {
        case 'niño':
          this.boletos[0].cantidad ++;
          break;
        case 'adulto':
          this.boletos[1].cantidad++;
          break;
        case 'anciano':
          this.boletos[2].cantidad++;
          break;
      }
    });
  }

  contabilizaProductos() {
    this.productos = [
      {
        tipo: 'Palomitas',
        cantidad: 0
      }, {
        tipo: 'Galletas',
        cantidad: 0
      }, {
        tipo: 'Chicles',
        cantidad: 0
      }
    ];

    this.pedido.productos.forEach(producto => {
      switch (producto.nombre) {
        case 'Palomitas':
          this.productos[0].cantidad++;
          break;
        case 'Galletas':
          this.productos[1].cantidad++;
          break;
        case 'Chicles':
          this.productos[2].cantidad++;
          break;
      }
    });
  }
}
