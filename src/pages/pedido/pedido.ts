import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { PedidosProvider } from '../../providers/pedidos/pedidos';
import { GLOBAL } from '../../providers/global';
import { Asientos } from '../../models/asientos';

@IonicPage()
@Component({
  selector: 'page-pedido',
  templateUrl: 'pedido.html',
})
export class PedidoPage {
  public paso: string = 'boletos';
  public funcion: any;
  public boletos: any = [];
  public productos: any = [];
  public url: string;
  public token: string;
  public identity: any;
  public productosSeleccionados: any;
  public boletosDisponibles: number = 0;
  public sala: any = new Asientos().getSala();

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
        res.boletos.forEach(boleto => {
          this.boletos.push({
            id: boleto._id,
            nombre: boleto.tipo.charAt(0).toUpperCase() + boleto.tipo.slice(1),
            cantidad: 0,
            precio: boleto.precio
          });
        });
      },
      (err: any) => {
        console.log(err);
      }
    );

    this.pedp.getProductos().subscribe(
      (res: any) => {
        res.productos.forEach(producto => {
          this.productos.push({
            id: producto._id,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 0
          });
        });
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  cantidadBoleto(id, agregar) {
    let boleto = this.boletos.find(boleto => boleto.id === id);

    if (agregar) {
      boleto.cantidad++;
      this.boletosDisponibles++;
    } else {
      if (boleto.cantidad != 0) {
        boleto.cantidad--;
        this.boletosDisponibles--;
      }
    }
  }

  cantidadProducto(id, agregar) {
    let producto = this.productos.find(producto => producto.id === id);

    if (agregar) {
      producto.cantidad++;
    } else {
      if (producto.cantidad != 0) {
        producto.cantidad--;
      }
    }
  }

  seleccionaAsiento(asiento) {
    if (!asiento.seat) {
      if (asiento.check) {
        asiento.check = false;
        this.boletosDisponibles++;
      } else {
        asiento.check = true;
        this.boletosDisponibles--;
      }
    }
  }
}