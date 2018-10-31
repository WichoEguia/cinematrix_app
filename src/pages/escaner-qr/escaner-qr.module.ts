import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EscanerQrPage } from './escaner-qr';

@NgModule({
  declarations: [
    EscanerQrPage,
  ],
  imports: [
    IonicPageModule.forChild(EscanerQrPage),
  ],
})
export class EscanerQrPageModule {}
