import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidosProvider } from '../../providers/pedidos/pedidos';
import { GLOBAL } from '../../providers/global';

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
              public pedp: PedidosProvider) {
    this.funcion = this.navParams.get('dataFuncion');
    this.url = GLOBAL.url;
    
    this.token = this.pedp.getToken();
    this.identity = JSON.parse(this.pedp.getIdentity());

    this.pedp.getBoletos().subscribe(
      (res: any) => {
        this.boletos = res.boletos;
        console.log(this.boletos);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
