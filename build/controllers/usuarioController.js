"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioController = void 0;
const usuarioDAO_1 = require("../dao/usuarioDAO");
const utils_1 = require("../utils/utils");
class UsuarioController {
    // Nombre: lista
    // Descripción: Lista de los usuarios creados en la BD
    // Resultado: json con información de los usuarios
    lista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield usuarioDAO_1.dao.lista();
                res.json(result);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    // Nombre: insert
    // Descripción: Inserta datos de usuario
    // Resultado: json con msj
    insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre, apellidos, username, password } = req.body;
                // Validación de los campos.
                if (nombre == null || apellidos == null || username == null || password == null) {
                    return res.status(409).json({ message: 'Los campos son requeridos' });
                }
                // Verificar la longitud de los caracteres
                if (username.length > 20)
                    return res.status(500).json({ message: "El limite de caracteres para username son 20" });
                const verify = yield usuarioDAO_1.dao.verificarUsuario(username);
                // Verificar si el usuario existe 
                if (verify.length > 0)
                    return res.status(500).json({ message: "El usuario ya existe" });
                // Encriptación de contraseña
                const encryptedPassword = yield utils_1.utils.hashPassword(password);
                // 
                const user = {
                    nombre,
                    apellidos,
                    username,
                    password: encryptedPassword,
                };
                //Insercion de los datos de usuario.
                const result = yield usuarioDAO_1.dao.insert(user);
                if (result.affectedRows > 0)
                    return res.json({ message: 'Datos Guardados' });
                else
                    return res.status(400).json({ message: result.message });
                res.json(result);
            }
            catch (ex) {
                res.status(500).json({ message: ex.message });
            }
        });
    }
}
exports.usuarioController = new UsuarioController();
