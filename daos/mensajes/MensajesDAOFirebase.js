import {
    dbFirebase
} from '../../config/configDB.js';

const queryMensajes = dbFirebase.collection('mensajes');
import { Contenedor } from '../../dataBase/crudFirebase/crudMensajes.js';

export class MensajesDAOFirebase extends Contenedor {
    constructor() {
        super(queryMensajes);
    }
}

