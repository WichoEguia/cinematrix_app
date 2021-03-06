import { Component } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { PeliculaProvider } from '../../providers/pelicula/pelicula';
import { GLOBAL } from '../../providers/global';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { FuncionesPage } from '../funciones/funciones';
import { PedidoPage } from '../pedido/pedido';

@IonicPage()
@Component({
  selector: 'page-detalle-pelicula',
  templateUrl: 'detalle-pelicula.html',
})
export class DetallePeliculaPage {
  public pelicula;
  public url: string;
  public token;
  public identity;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public pp: PeliculaProvider,
              public up: UsuarioProvider,
              public modalCtrl: ModalController) {
    this.url = GLOBAL.url;

    this.token = this.up.getToken();
    this.identity = this.up.getIdentity();

    this.pelicula = navParams.get('data');
  }

  ionViewDidLoad() {
    this.verDetallePelicula(this.pelicula);
  }

  verDetallePelicula(pelicula) {
    this.pp.getDetallePelicula(pelicula).subscribe(
      (res: any) => {
        this.pelicula = res.pelicula;
      }, (err: any) => {
        console.log(err);
      }
    );
  }

  verFuncionesPelicula(pelicula) {
    let funcionModal = this.modalCtrl.create(FuncionesPage, {
      idPelicula: pelicula._id 
    });

    funcionModal.onDidDismiss(data => {
      if (data) {
        this.seleccionaFuncion(data);
      }
    });

    funcionModal.present();
  }

  seleccionaFuncion(dataFuncion: any) {
    this.navCtrl.push(PedidoPage, {
      dataFuncion
    });
  }
}
