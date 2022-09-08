import { promises as fs } from 'fs'

class ContenedorArchivo {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async listar(id) {
    const products = await this.listarAll(); 
    const productById = products.find((p) => p.id == id); 
    console.log(
      `Se retorna el producto buscado por id es ${JSON.stringify(productById)}`
    );
    return productById;
  }

  async listarAll() {
    try {
      let products = await fs.readFile(this.ruta, "utf-8"); 
      return JSON.parse(products); 
    } catch (error) {
      console.log(
        "Error Lectura ó Listado Vacio, al traer TODOS los productos"
      );
      return [];
    }
  }

  async guardar(obj) {
    const products = await this.listarAll();
    
    products.length === 0
      ? (obj.id = 1)
      : (obj.id = products[products.length - 1].id + 1);

    products.push(obj); 
    try {
      console.log(
        `El Siguiente elemento va a ser guardado: \n ${JSON.stringify(obj)}`
      );
      await fs.writeFile(this.ruta, JSON.stringify(products, null, 2)); 
      console.log("Guardado Exitoso");
    } catch (error) {
      console.log("Error de Escritura al Guardar");
      console.log(error);
    }
  }

  async actualizar(elem, id) {}

  async borrar(id) {
    const products = await this.listarAll(); 
    const product = products.find((p) => p.id == id); 
    const newProducts = products.filter((element) => element != product); 
    try {
      console.log(
        `El siguiente Elemento fue ELIMINADO: \n ${JSON.stringify(product)}`
      );
      await fs.writeFile(this.ruta, JSON.stringify(newProducts, null, 2)); 
      console.log("Elimando Correcto");
    } catch (error) {
      console.log(
        `Error de Escritura al Eliminar el producto ${JSON.stringify(product)}`
      );
    }
  }

  async borrarAll() {
    try {
      console.log("Se va a ELIMINAR TODOS LOS ELEMENTOS");
      await fs.writeFile(this.ruta, "[]"); 
    } catch (error) {
      console.log("Error de Escritura al ELIMINAR TODOS los productos");
    }
  }
}

export default ContenedorArchivo