import { Component, OnInit } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  lista: Lista;
  nombreItem = '';
  constructor(private _deseosService: DeseosService, private _route: ActivatedRoute) {
    const listaID = this._route.snapshot.paramMap.get('id');
    this.lista = _deseosService.obtenerLista(listaID);
  }

  ngOnInit() {
  }

  agregarItem() {
    console.log('Enter al click');
    if (this.nombreItem.length === 0) {
      return;
    }
    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);
    this.nombreItem = '';
    this._deseosService.guardarStorage();
  }

  cambiarEstado(item: ListaItem) {
    const pendientes = this.lista.items.filter(itemData => !itemData.completado).length;

    if (pendientes === 0) {
      this.lista.terminadaEn = new Date();
      this.lista.completada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.completada = false;
    }

    this._deseosService.guardarStorage();
  }

  borrarItemList(id: number) {
    this.lista.items.splice(id, 1);
    this._deseosService.guardarStorage();
  }

}
