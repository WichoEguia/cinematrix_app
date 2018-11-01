import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistorialPedidosPage } from './historial-pedidos';

@NgModule({
  declarations: [
    HistorialPedidosPage,
  ],
  imports: [
    IonicPageModule.forChild(HistorialPedidosPage),
  ],
})
export class HistorialPedidosPageModule {}
