import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetallePeliculaPage } from '../pages/detalle-pelicula/detalle-pelicula';
import { FuncionesPage } from '../pages/funciones/funciones';
import { PedidoPage } from '../pages/pedido/pedido';
import { ProductosPage } from '../pages/productos/productos';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { HttpClientModule } from '@angular/common/http';
import { PeliculaProvider } from '../providers/pelicula/pelicula';
import { FuncionesProvider } from '../providers/funciones/funciones';
import { PedidosProvider } from '../providers/pedidos/pedidos';
import { ProductosProvider } from '../providers/productos/productos';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetallePeliculaPage,
    FuncionesPage,
    PedidoPage,
    ProductosPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetallePeliculaPage,
    FuncionesPage,
    PedidoPage,
    ProductosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider,
    PeliculaProvider,
    FuncionesProvider,
    PedidosProvider,
    ProductosProvider
  ]
})
export class AppModule {}
