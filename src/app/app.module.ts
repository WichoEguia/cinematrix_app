import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { PayPal } from '@ionic-native/paypal';
import { QRCodeModule } from 'angularx-qrcode';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetallePeliculaPage } from '../pages/detalle-pelicula/detalle-pelicula';
import { FuncionesPage } from '../pages/funciones/funciones';
import { PedidoPage } from '../pages/pedido/pedido';
import { QrPage } from '../pages/qr/qr';
import { EscanerQrPage } from '../pages/escaner-qr/escaner-qr';
import { AtenderPedidoPage } from "../pages/atender-pedido/atender-pedido";
import { HistorialPedidosPage } from "../pages/historial-pedidos/historial-pedidos";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { HttpClientModule } from '@angular/common/http';
import { PeliculaProvider } from '../providers/pelicula/pelicula';
import { FuncionesProvider } from '../providers/funciones/funciones';
import { PedidosProvider } from '../providers/pedidos/pedidos';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetallePeliculaPage,
    FuncionesPage,
    PedidoPage,
    QrPage,
    EscanerQrPage,
    AtenderPedidoPage,
    HistorialPedidosPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    QRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetallePeliculaPage,
    FuncionesPage,
    PedidoPage,
    QrPage,
    EscanerQrPage,
    AtenderPedidoPage,
    HistorialPedidosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider,
    PeliculaProvider,
    FuncionesProvider,
    PedidosProvider,
    PayPal,
    BarcodeScanner
  ]
})
export class AppModule {}
