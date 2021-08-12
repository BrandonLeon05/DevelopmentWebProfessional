"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const departamentoController_1 = require("../controllers/departamentoController");
class DepartamentoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', departamentoController_1.departamentoController.lista);
        this.router.put('/', departamentoController_1.departamentoController.insert);
        this.router.post('/', departamentoController_1.departamentoController.update);
        this.router.delete('/:cveDepa', departamentoController_1.departamentoController.delete);
    }
}
const departamentoRoutes = new DepartamentoRoutes();
exports.default = departamentoRoutes.router;
