export class Usuario {
  static fromFirebase( {correo, uid, nombre} ){
    return new Usuario( uid, nombre, correo )
  }
  constructor(
    public uid: string,
    public nombre: string,
    public correo: string
  ){}
}
