import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];


  constructor() {
    this.cargarStorage();
  }

  crearLista(titulo: string) {
    const nuevaLista = new Lista(titulo);
    this.listas.push(nuevaLista);
    this.guardarStorage();
    return nuevaLista.id;
  }

  obtenerLista(id: number | string) {
    id = Number(id);
    return this.listas.find(listaData => {
      return listaData.id === id;
    });
  }

  guardarStorage() {
    localStorage.setItem('data', JSON.stringify(this.listas));
  }

  cargarStorage() {
    if (localStorage.getItem('data')) {
      this.listas = JSON.parse(localStorage.getItem('data'));
    }
  }

  borrarLista(id: number) {
    this.listas = this.listas.filter(lista => lista.id !== id);
    this.guardarStorage();
  }
}
