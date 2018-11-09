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
  public boletos: any;
  public productos: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pedidosProvide: PedidosProvider,
    public alertCtrl: AlertController
  ) {
    this.pedido = JSON.parse(this.navParams.get('pedido'));
    console.log(this.pedido);
    this.asientos = JSON.parse(this.pedido.asientos);

    this.pedidosProvide.actualizaEstadoPedido(this.pedido._id, 'proceso')
      .subscribe(
        (res: any) => {
          console.log('Exito pedido');
          console.log(res)
        },
        (err: any) => {
          console.log('Error pedido');
          console.log(err)
        }
      );

    this.contabilizaBoletos();
    this.contabilizaProductos();
  }

  pedidoAtendido(idPedido) {
    this.pedidosProvide.actualizaEstadoPedido(idPedido, 'listo')
      .subscribe(
        (res: any) => {
          console.log(res);
          this.alertCtrl.create({
            title: 'Listo',
            subTitle: 'El pedido ha sido atendido con exito',
            buttons: [{
              text: 'ok',
              handler: () => {
                this.navCtrl.pop();
              }
            }]
          }).present();
        },
        (err: any) => console.log(err)
      );
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
          this.boletos[0].cantidad++;
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
