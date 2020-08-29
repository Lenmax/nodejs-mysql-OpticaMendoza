CREATE DATABASE dbClientes;

USE dbClientes;

CREATE TABLE gnDefectosVisuales(
	idDefectoVisual INT PRIMARY KEY AUTO_INCREMENT,
    Descripcion VARCHAR(60)
);

INSERT INTO gnDefectosVisuales (Descripcion) VALUES("Miopia");
INSERT INTO gnDefectosVisuales (Descripcion) VALUES('Hipermetropia');
INSERT INTO gnDefectosVisuales (Descripcion) VALUES('Astigmatismo');
INSERT INTO gnDefectosVisuales (Descripcion) VALUES('Presbicia');
INSERT INTO gnDefectosVisuales (Descripcion) VALUES('Ambliopia');
INSERT INTO gnDefectosVisuales (Descripcion) VALUES('Anisometropia');

CREATE TABLE taUsuarios(
    idUsuario INT(11) PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(16) NOT NULL,
    contasena VARCHAR(100) NOT NULL
);

CREATE TABLE taClientes(
	idCliente INT(11) PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(120) NOT NULL,
    Edad INT,
    FechaVisita date,
	Lentes INT,
	Montura INT,
    d_od_esferico VARCHAR(10),
	d_od_cilindrico VARCHAR(10),
	d_od_eje VARCHAR(10),
	d_oi_esferico VARCHAR(10),
	d_oi_cilindrico VARCHAR(10),
	d_oi_eje VARCHAR(10),
	d_dpi VARCHAR(10),
	c_od_esferico VARCHAR(10),
	c_od_cilindrico VARCHAR(10),
	c_od_eje VARCHAR(10),
	c_oi_esferico VARCHAR(10),
	c_oi_cilindrico VARCHAR(10),
	c_oi_eje VARCHAR(10),
	c_dpi VARCHAR(10),
    Precio VARCHAR(10),
	Observacion VARCHAR(255),
	created_at timestamp NOT NULL DEFAULT current_timestamp
);

CREATE TABLE taDefectosCliente(
	idDefectosCliente INT PRIMARY KEY AUTO_INCREMENT,
    idCliente INT,
	idDefectoVisual INT,
    CONSTRAINT fk_taClientes FOREIGN KEY (idCliente) REFERENCES taClientes(idCliente),
    CONSTRAINT fk_gnDefectosVisuales FOREIGN KEY (idDefectoVisual) REFERENCES gnDefectosVisuales(idDefectoVisual)
);