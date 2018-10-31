import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AtenderPedidoPage } from './atender-pedido';

@NgModule({
  declarations: [
    AtenderPedidoPage,
  ],
  imports: [
    IonicPageModule.forChild(AtenderPedidoPage),
  ],
})
export class AtenderPedidoPageModule {}
