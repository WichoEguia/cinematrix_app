import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { PedidosProvider } from '../../providers/pedidos/pedidos';
import { GLOBAL } from '../../providers/global';
import { Asientos } from '../../models/asientos';
import { Pedido } from '../../models/pedido';

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
  public productosSeleccionados: any = [];
  public boletosSeleccionados: any = [];
  public boletosDisponibles: number = 0;
  public sala: any = new Asientos().getSala();
  public pedido: Pedido;
  public pagoBooletos: number = 0;
  public pagoProductos: number = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public pedp: PedidosProvider,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController) {
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

    this.pedido = new Pedido('', this.obtenerFecha(), true, this.funcion.fecha, 'vigente', '', this.identity._id, this.funcion._id, [], []);
  }

  cantidadBoleto(id, agregar) {
    let boleto = this.boletos.find(boleto => boleto.id === id);

    if (agregar) {
      boleto.cantidad++;
      this.boletosDisponibles++;
    } else {
      if (boleto.cantidad != 0) {
        boleto.cantidad--;
        this.boletosDisponibles = boleto.cantidad;
        this.reseteaLugares()
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
  
  reseteaLugares() {
    this.sala.forEach(fila => {
      fila.forEach(lugar => {
        lugar.check = false;
      });
    });
  }

  obtenerFecha() {
    let today: any = new Date();
    let dd: any = today.getDate();
    let mm: any = today.getMonth() + 1;

    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    return dd + '-' + mm + '-' + yyyy;
  }

  actualizaPedido() {
    this.pedido.fecha_creacion = this.obtenerFecha();
    this.pedido.asientos = this.obtenerAsientosSeleccionados();
    this.obtenerBoletosSeleccionados();
    this.obtenerProductosSeleccionados();

    this.boletosSeleccionados.forEach(boletos => {
      this.pedido.boletos.push(boletos.id + ',' + boletos.cantidad);
    });

    this.productosSeleccionados.forEach(producto => {
      this.pedido.productos.push(producto.id + ',' + producto.cantidad)
    })

    console.log(this.pedido);
  }

  obtenerAsientosSeleccionados() {
    let asientosSeleccionados = [];
    
    this.sala.forEach(fila => {
      fila.forEach(asiento => {
        if (asiento.check) {
          asientosSeleccionados.push(asiento);
        }
      });
    });

    return JSON.stringify(asientosSeleccionados)
  }

  obtenerBoletosSeleccionados() {
    this.boletosSeleccionados = [];
    
    this.boletos.forEach(boleto => {
      if (boleto.cantidad > 0) {
        this.boletosSeleccionados.push(boleto);
      }
    });
  }

  obtenerProductosSeleccionados() {
    this.productosSeleccionados = [];

    this.productos.forEach(producto => {
      if (producto.cantidad > 0) {
        this.productosSeleccionados.push(producto);
      }
    });
  }

  confirmarPedido() {
    console.log(this.boletos);

    if (this.pedido.boletos.length > 0){
      if (this.boletosDisponibles == 0) {
        console.log('Sigue al pago');
      } else {
        this.alertCtrl.create({
          title: 'UPS...',
          subTitle: 'Selecciona todos tus lugares',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.paso = 'asientos';
              }
            }
          ]
        }).present();
      }
    } else {
      this.alertCtrl.create({
        title: 'UPS...',
        subTitle: 'Selecciona tus boletos y tus asientos',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.paso = 'boletos';
            }
          }
        ]
      }).present();
    }
  }
}