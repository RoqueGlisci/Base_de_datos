import knex from "knex";

class ContenedorSQL {
  constructor(config, tabla) {
    this.knex = knex(config);
    this.tabla = tabla;
  }

  async listar(id) {
    try {
      const producto = await this.listarAll();
      const productoById = producto.find((p) => p.id == id);
      return productoById;
    } catch (error) {
      console.log("error", error);
    }
  }

  async listarAll() {
    try {
      const productos = await this.knex(this.tabla).select("*");
      return productos;
    } catch (error) {
      console.log("error", error);
    }
  }

  async guardar(elem) {
    try {
      await this.knex(this.tabla).insert(elem);
    } catch (error) {
      console.log("error", error);
    }
  }

  async actualizar(elem, id) {
    try {
      await this.knex.from(this.tabla).where("id", id).update(elem);
    } catch (error) {
      console.log("error", error);
    }
  }

  async borrar(id) {
    try {
      await this.knex.from(this.tabla).where("id", id).del();
    } catch (error) {
      console.log("error", error);
    }
  }

  async borrarAll() {
    try {
      await this.knex.from(this.tabla).del();
    } catch (error) {
      console.log("error", error);
    }
  }

  async desconectar() {
    try {
      await this.knex.destroy();
    } catch (error) {
      console.log("error", error);
    }
  }
}

export default ContenedorSQL;
