const clientesCtrl = {};

const pool = require('../database');
const moment = require("moment");

clientesCtrl.renderClientes = async (req, res) => {
    const clientes = await pool.query(
      "SELECT idCliente, Nombre, Edad, DATE_FORMAT(FechaVisita, '%d/%m/%Y')FechaVisita, IF(Montura = 1, 'SI', 'NO')Montura, IF(Lentes = 1, 'SI', 'NO')Lentes, created_at FROM taClientes  ORDER BY created_at DESC"
    );
    //console.log(clientes);
    res.render("clientes/list", { clientes });
  };

clientesCtrl.renderAddCliente = async (req, res) => {
    const defectosVisuales = await pool.query("SELECT * FROM gnDefectosVisuales");
    res.render("clientes/add", { defectosVisuales });
};

clientesCtrl.AddCliente = async (req, res) => {
    //console.log(req.body);
    const {
      Nombre,
      Edad,
      FechaVisita,
      Lentes,
      Montura,
      d_od_esferico,
      d_od_cilindrico,
      d_od_eje,
      d_oi_esferico,
      d_oi_cilindrico,
      d_oi_eje,
      d_dpi,
      c_od_esferico,
      c_od_cilindrico,
      c_od_eje,
      c_oi_esferico,
      c_oi_cilindrico,
      c_oi_eje,
      c_dpi,
      Precio,
      DefectosVisuales,
      Observacion,
    } = req.body;
    const newCliente = {
      Nombre,
      Edad,
      FechaVisita: moment(FechaVisita, "DD/MM/YYYY", true).format("YYYY-MM-DD"),
      Lentes: typeof Lentes === "undefined" ? 0 : Lentes,
      Montura: typeof Montura === "undefined" ? 0 : Montura,
      d_od_esferico,
      d_od_cilindrico,
      d_od_eje,
      d_oi_esferico,
      d_oi_cilindrico,
      d_oi_eje,
      d_dpi,
      c_od_esferico,
      c_od_cilindrico,
      c_od_eje,
      c_oi_esferico,
      c_oi_cilindrico,
      c_oi_eje,
      c_dpi,
      Precio,
      Observacion,
    };
    const newDefectosVisuales =
      typeof DefectosVisuales === "undefined" ? [] : DefectosVisuales;
    const cliente = await pool.query("INSERT INTO taClientes set ?", [
      newCliente,
    ]);
    const idCliente = cliente.insertId;
    console.log(newDefectosVisuales);
    if (Array.isArray(newDefectosVisuales)) {
      for (let index = 0; index <= newDefectosVisuales.length - 1; index++) {
        const defecto = newDefectosVisuales[index];
        await pool.query(
          "INSERT INTO taDefectosCliente (idCliente,idDefectoVisual) VALUES (" +
            idCliente +
            "," +
            defecto +
            ")"
        );
      }
    } else
      await pool.query(
        "INSERT INTO taDefectosCliente (idCliente,idDefectoVisual) VALUES (" +
          idCliente +
          "," +
          newDefectosVisuales +
          ")"
      );
  
    req.flash("success", "Cliente Guardado Correctamente!");
    res.redirect("/clientes");
}

clientesCtrl.renderEdit = async (req, res) => {
  
    const { idCliente } = req.params;
    console.log(idCliente);
    const cliente = await pool.query(
      "SELECT idCliente, Nombre, Edad, DATE_FORMAT(FechaVisita, '%d/%m/%Y')FechaVisita, Montura , Lentes, d_od_esferico, d_od_cilindrico, d_od_eje, d_oi_esferico, d_oi_cilindrico, d_oi_eje, d_dpi, c_od_esferico, c_od_cilindrico, c_od_eje, c_oi_esferico, c_oi_cilindrico, c_oi_eje, c_dpi, Observacion, created_at FROM taClientes WHERE idCliente = ?",
      [idCliente]
    );
    const defectosVisuales = await pool.query(
      "SELECT a.idDefectoVisual, a.Descripcion, !isnull(idCliente)checked FROM gnDefectosVisuales a LEFT JOIN taDefectosCliente b ON a.idDefectoVisual = b.idDefectoVisual AND b.idCliente = ?",
      [idCliente]
    );
     console.log(cliente[0]);
    // console.log('defectosCliente = ',defectosCliente[0]);
    res.render("clientes/edit", { cliente: cliente[0], defectosVisuales });
};

module.exports = clientesCtrl;