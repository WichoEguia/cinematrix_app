import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FuncionesPage } from './funciones';

@NgModule({
  declarations: [
    FuncionesPage,
  ],
  imports: [
    IonicPageModule.forChild(FuncionesPage),
  ],
})
export class FuncionesPageModule {}
