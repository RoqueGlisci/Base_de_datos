class ContenedorMemoria {
  constructor() {
    this.elementos = [];
  }

  listar(id) {
    
    let producF = this.productos.find((p) => p.id == id);
    return producF;
  }

  listarAll() {
    console.log("1");
    return this.productos;
  }

  guardar(elem) {
    if (this.productos.length > 0) {
      
      let newLastItem = this.productos[this.productos.length - 1].id + 1;
      elem.id = newLastItem;
      this.productos.push(elem);
    } else {
      elem.id = 1;
      this.productos.push(elem);
    }
  }

  actualizar(elem, id) {
    let pUpdate = this.productos.findIndex((p) => p.id === id);

    this.productos[pUpdate].title = elem.title;
    this.productos[pUpdate].price = elem.price;
    this.productos[pUpdate].thumbnail = elem.thumbnail;
  }

  borrar(id) {
    let pDelete = this.productos.findIndex((p) => p.id === id);
    
    this.productos.splice(pDelete, 1);
  }

  borrarAll() {
    this.productos = [];
  }
}

export default ContenedorMemoria
