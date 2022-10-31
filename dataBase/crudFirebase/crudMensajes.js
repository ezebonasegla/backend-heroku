export class Contenedor {
    constructor(queryMensajes) {
        this.queryMensajes = queryMensajes;
    }

    async save(mensaje) {
        try {
            await this.queryMensajes.add(mensaje);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getAll() {
        try {
            const querySnapshot = await this.queryMensajes.get();
            const mensajes = querySnapshot.docs.map((doc) => doc.data());
            return mensajes;
        } catch (error) {
            throw new Error(error);
        }
    }
}
