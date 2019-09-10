import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public deseosService: DeseosService,
              private _route: Router, 
              private _alertCtr: AlertController ) {}

    agregarLista() {
      const alert = document.createElement('ion-alert');
      alert.header = 'Nueva lista';
      alert.inputs = [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ];
      alert.buttons = [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Crear',
          handler: (data) => {
            if (data.titulo.length === 0) {
              return;
            }

            // Tengo que crear la lista
            const listaID = this.deseosService.crearLista(data.titulo);
            this._route.navigateByUrl(`/tabs/tab1/agregar/${listaID}`);
          }
        }
      ];
      document.body.appendChild(alert);
      alert.present();
    }
}
