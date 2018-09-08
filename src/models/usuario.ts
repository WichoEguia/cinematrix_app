export class Usuario {
    constructor(
        public _id: string,
        public nombre: string,
        public email: string,
        public password: string,
        public fecha_nacimiento: string,
        public role: string,
        public estado: boolean
    ) { }
}