const express = require("express");
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');

const { renderClientes, renderAddCliente,AddCliente, renderEdit } = require('../controllers/clientes.controller')

// isLoggedIn
router.use(isLoggedIn);

//Rutas
router.get("/", isLoggedIn, renderClientes);

router.get("/add",  isLoggedIn, renderAddCliente);

router.post("/add", isLoggedIn, AddCliente);

router.get("/edit/:idCliente", isLoggedIn, renderEdit);

module.exports = router;
