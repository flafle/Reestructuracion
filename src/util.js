
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __filename= fileURLToPath(import.meta.url);
const __dirname= dirname(__filename);

export default __dirname;

import bcrypt from "bcrypt";

export const createHash = async(password) => {
    //generar los Salts:
    const salts = await bcrypt.genSalt(10)
    return bcrypt.hash(password,salts)
} //así se crea un encriptado de contraseña con crypt.


