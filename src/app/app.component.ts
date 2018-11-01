import { Component, ViewChild } from '@angular/core';
import { MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { GLOBAL } from '../providers/global';
import { EscanerQrPage } from '../pages/escaner-qr/escaner-qr';
import { HistorialPedidosPage } from "../pages/historial-pedidos/historial-pedidos";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  public showMenu: boolean;
  public app_name: string;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, icon: any}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public up: UsuarioProvider,
              public menuCtrl: MenuController) {
    this.initializeApp();
    this.app_name = GLOBAL.app_name;

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Cartelera', component: HomePage, icon: 'film' },
      { title:'Historial de pedidos', component: HistorialPedidosPage, icon: 'clock' }
      // { title: 'Escaner QR', component: EscanerQrPage, icon: 'qr-scanner' }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  QREscanner() {
    this.menuCtrl.close();
    this.nav.setRoot(EscanerQrPage);
  }

  logOut() {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
  }
}
