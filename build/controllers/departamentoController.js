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
exports.departamentoController = void 0;
const departamentoDAO_1 = require("../dao/departamentoDAO");
class DepartamentoController {
    lista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield departamentoDAO_1.dao.lista();
            res.json(result);
        });
    }
    insert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { descripcion, planta, fechaConstruccion, cveEncargado } = req.body;
            if (descripcion == null || planta == null || fechaConstruccion == null) {
                return res.status(400).json({ message: 'Debe rellenar todos los campos' });
            }
            const departamento = {
                descripcion,
                planta,
                fechaConstruccion,
                cveEncargado
            };
            const result = yield departamentoDAO_1.dao.insert(departamento);
            if (result.affectedRows > 0) {
                return res.json({ message: 'Datos guardados' });
            }
            else {
                return res.status(400).json({ message: result.message });
            }
        });
    }
    //Update departamento
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const departamento = req.body;
                if (departamento.cveDepa == null) {
                    return res.status(400).json({ message: "No se puede actualizar" });
                }
                const result = yield departamentoDAO_1.dao.update(departamento);
                if (result.affectedRows > 0) {
                    res.json({ message: "El departamento se ha actualizado de manera correcta." });
                }
                else {
                    res.status(400).json({ message: result.message });
                }
            }
            catch (ex) {
                res.status(500).json({ message: ex.message });
            }
        });
    }
    //Deleta Departamento
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cveDepa } = req.params;
                if (cveDepa == null) {
                    return res.status(400).json({ message: "No se pude eliminar" });
                }
                const result = yield departamentoDAO_1.dao.delete(cveDepa);
                if (result.affectedRows > 0) {
                    return res.json({ message: "Departamento eliminado" });
                }
                else {
                    return res.status(400).json({ message: result.message });
                }
            }
            catch (ex) {
                res.status(500).json({ message: ex.message });
            }
        });
    }
}
exports.departamentoController = new DepartamentoController();
