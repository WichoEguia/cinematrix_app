export class Pedido {
    constructor(
        public _id: string,
        public fecha_creacion: string,
        public vigente: boolean,
        public fecha_llegada: string,
        public estado: string,
        public asientos: string,
        public usuario: string,
        public funcion: string,
        public boletos: any,
        public productos: any
    ) { }
}