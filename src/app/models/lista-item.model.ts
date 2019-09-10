export class ListaItem {
    descr: string;
    completado: boolean;

    constructor(descr: string) {
        this.descr = descr;
        this.completado = false;
    }
}