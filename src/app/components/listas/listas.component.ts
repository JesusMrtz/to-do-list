import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { IonList } from '@ionic/angular';
import { Lista } from '../../models/lista.model';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  @ViewChild(IonList, {static: false}) lista: IonList;
  @Input() listasCompletadas = true;

  constructor(public deseosService: DeseosService, private _route: Router) { }

  ngOnInit() {}

  listaSeleccionada(listaID: number) {
    console.log(this._route.url);
    this._route.navigateByUrl(`${this._route.url}/agregar/${listaID}`);
  }

  borrarLista(id: number) {
    this.deseosService.borrarLista(id);
  }

  editarLista(lista: Lista) {
    const alert = document.createElement('ion-alert');
    alert.header = 'Editar lista';
    alert.inputs = [
      {
        name: 'titulo',
        type: 'text',
        value: lista.titulo,
        placeholder: 'Nombre de la lista'
      }
    ];
    alert.buttons = [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          this.lista.closeSlidingItems();
        }
      },
      {
        text: 'Editar',
        handler: (data) => {
          if (data.titulo.length === 0) {
            return;
          }

          // Tengo que editar la lista
          lista.titulo = data.titulo;
          this.deseosService.guardarStorage();
          this.lista.closeSlidingItems();
        }
      }
    ];
    document.body.appendChild(alert);
    alert.present();
  }

}
