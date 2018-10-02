import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { GLOBAL } from '../../providers/global';
import { ProductosProvider } from '../../providers/productos/productos';
import * as $ from 'jquery';

@IonicPage()
@Component({
  selector: 'page-productos',
  templateUrl: 'productos.html',
})
export class ProductosPage {
  public url: string = '';
  public productos: any = '';
  public token: string = '';
  public productosSeleccionados: any = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public prodp: ProductosProvider,
              public viewCtrl: ViewController) {
    this.url = GLOBAL.url;
    this.token = this.prodp.getToken();

    this.prodp.getProductos().subscribe(
      (res: any) => {
        this.productos = res.productos;
        console.log(this.productos);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  close(data: any = null) {
    this.viewCtrl.dismiss(data);
  }

  agregaProducto(id) {
    let cantidadProductos = parseInt($("#" + id).text());
    $("#" + id).text(cantidadProductos + 1);
  }

  remueveProducto(id) {
    let cantidadProductos = parseInt($("#" + id).text());
    if (cantidadProductos != 0) {
      $("#" + id).text(cantidadProductos - 1);
    }
  }

  seleccionaProductos() {
    this.productos.forEach(producto => {
      let cadenaProducto = producto._id + ',' + $("#" + producto._id).text();
      this.productosSeleccionados.push(cadenaProducto);
    });

    this.close(this.productosSeleccionados);
  }
}
