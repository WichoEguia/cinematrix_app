import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { GLOBAL } from '../../providers/global';
import { ProductosProvider } from '../../providers/productos/productos';

@IonicPage()
@Component({
  selector: 'page-productos',
  templateUrl: 'productos.html',
})
export class ProductosPage {
  public url: string = '';
  public productos: any = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public prodp: ProductosProvider,
              public viewCtrl: ViewController) {
    this.url = GLOBAL.url;

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

}
