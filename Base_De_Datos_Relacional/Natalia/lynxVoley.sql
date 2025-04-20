/*Base de datos para Lynx Voley*/

create database lynxvoley;
use lynxvoley;

-- Tabla tipo de usuario
CREATE TABLE tipoU (
    idTipoU INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombreTipoU VARCHAR(20) NOT NULL
);

-- Tabla usuario
CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombreUsuario VARCHAR(20) NOT NULL,
    correoUsuario VARCHAR(30) NOT NULL,
    telefonoUsuario INT NOT NULL,
    contraseñaUsuario VARCHAR(10) NOT NULL,
    direccionUsuario VARCHAR(30) NOT NULL,
    edadUsuario INT NOT NULL,
    idTipoUFK INT NOT NULL,
    FOREIGN KEY (idTipoUFK) REFERENCES tipoU(idTipoU)
);

-- Tabla categoría
CREATE TABLE Categoria (
    idCategoria INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombreCategoria VARCHAR(15) NOT NULL
);

-- Tabla entrenador
CREATE TABLE Entrenador (
    idEntrenador INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    idUsuarioEFK INT UNIQUE NOT NULL,
    idCategoriaEFK INT NOT NULL,
    FOREIGN KEY (idUsuarioEFK) REFERENCES Usuario(idUsuario) ON DELETE CASCADE,
    FOREIGN KEY (idCategoriaEFK) REFERENCES Categoria(idCategoria)
);

-- Tabla Acudiente
CREATE TABLE Acudiente (
    idAcudiente INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombreAcudiente VARCHAR(30) NOT NULL,
    telefonoAcudiente INT NOT NULL
);

-- Tabla Deportista
CREATE TABLE Deportista (
    idDeportista INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    idUsuarioFK INT UNIQUE NOT NULL,
    idAcudienteFK INT NOT NULL,
    posicionDeportista VARCHAR(15) NOT NULL,
    idCategoriaDFK INT NOT NULL,
    mensualidadDeportista INT NOT NULL,
    epsDeportista VARCHAR(30) NOT NULL,
    dorsalDeportista INT UNIQUE NOT NULL,
    FOREIGN KEY (idUsuarioFK) REFERENCES Usuario(idUsuario),
    FOREIGN KEY (idAcudienteFK) REFERENCES Acudiente(idAcudiente),
    FOREIGN KEY (idCategoriaDFK) REFERENCES Categoria(idCategoria)
);

-- Tabla Administrador
CREATE TABLE Admi (
    idAdmi INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    idUsuarioAFK INT UNIQUE NOT NULL,
    FOREIGN KEY (idUsuarioAFK) REFERENCES Usuario(idUsuario)
);

-- Tabla Eventos
CREATE TABLE Eventos (
    idEvento INT PRIMARY KEY AUTO_INCREMENT,
    nombreEvento VARCHAR(50) NOT NULL,
    fechaEvento DATE NOT NULL,
    lugarEvento VARCHAR(50) NOT NULL,
    tipoEvento VARCHAR(30) NOT NULL
);

-- Tabla Torneos
CREATE TABLE Torneos (
    idTorneos INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    idEventoFK INT NOT NULL,
    idCategoriaFK INT NOT NULL, 
    equipoTorneos VARCHAR(100) NOT NULL,
    FOREIGN KEY (idEventoFK) REFERENCES Eventos(idEvento),
    FOREIGN KEY (idCategoriaFK) REFERENCES Categoria(idCategoria)
);

-- Tabla Entrenamiento
CREATE TABLE Entrenamiento (
    idEntrenamiento INT PRIMARY KEY AUTO_INCREMENT,
    idEventoFK INT NOT NULL,
    idEntrenadorFK INT NOT NULL,
    idDeportistaFK INT NOT NULL,
    horaEntrenamiento TIME NOT NULL,
    FOREIGN KEY (idEventoFK) REFERENCES Eventos(idEvento) ON DELETE CASCADE,
    FOREIGN KEY (idEntrenadorFK) REFERENCES Entrenador(idEntrenador) ON DELETE CASCADE,
    FOREIGN KEY (idDeportistaFK) REFERENCES Deportista(idDeportista) ON DELETE CASCADE
);

-- Insertar un tipo de usuario
-- Insertar tipo de usuario
INSERT INTO tipoU (nombreTipoU) VALUES ('Deportista');

-- Insertar un usuario
INSERT INTO Usuario (idUsuario, nombreUsuario, correoUsuario, telefonoUsuario, contraseñaUsuario, direccionUsuario, edadUsuario, idTipoUFK) 
VALUES (1, 'Juan Perez', 'juan@example.com', 1234567890, 'clave123', 'Calle 123', 18, 1);

-- Insertar una categoría
INSERT INTO Categoria (idCategoria, nombreCategoria) VALUES (1, 'Juvenil');

-- Insertar un entrenador
INSERT INTO Entrenador (idEntrenador, idUsuarioEFK, idCategoriaEFK) VALUES (1, 1, 1);

-- Insertar un evento
INSERT INTO Eventos (nombreEvento, fechaEvento, lugarEvento, tipoEvento) 
VALUES ('Torneo Nacional', '2025-06-15', 'Coliseo Central', 'Torneo');


-- Actualizar la dirección de un usuario
UPDATE Usuario 
SET direccionUsuario = 'Avenida 456' 
WHERE idUsuario = 1;

-- Actualizar la categoría de un deportista
UPDATE Deportista 
SET idCategoriaDFK = 2 
WHERE idDeportista = 1;

-- Actualizar la fecha de un evento
UPDATE Eventos 
SET fechaEvento = '2025-07-20' 
WHERE idEvento = 1;

-- Actualizar el equipo de un torneo
UPDATE Torneos 
SET equipoTorneos = 'Equipo A' 
WHERE idTorneos = 1;

-- Actualizar la hora de un entrenamiento
UPDATE Entrenamiento 
SET horaEntrenamiento = '17:30:00' 
WHERE idEntrenamiento = 1;

-- Eliminar un usuario
DELETE FROM Usuario WHERE idUsuario = 1;

-- Eliminar un entrenador
DELETE FROM Entrenador WHERE idEntrenador = 1;

-- Eliminar un deportista
DELETE FROM Deportista WHERE idDeportista = 1;

-- Eliminar un evento
DELETE FROM Eventos WHERE idEvento = 1;

-- Eliminar un torneo
DELETE FROM Torneos WHERE idTorneos = 1;

ALTER TABLE Deportista ADD edadUsuario INT;

-- Crear trigger para mantener sincronizada la edad
DELIMITER //

CREATE TRIGGER actualizarEdadDeportista
AFTER UPDATE ON Usuario
FOR EACH ROW
BEGIN
    IF OLD.edadUsuario <> NEW.edadUsuario THEN
        UPDATE Deportista 
        SET edadUsuario = NEW.edadUsuario 
        WHERE idUsuarioFK = NEW.idUsuario;
    END IF;
END//

DELIMITER ;

ALTER TABLE Deportista ADD fechaInscripcion DATE;

CREATE TABLE  historialEventos (
    idHistorial INT AUTO_INCREMENT PRIMARY KEY,
    idEvento INT,
    nombreEventoAntiguo VARCHAR(50),
    nombreEventoNuevo VARCHAR(50),
    fechaCambio DATETIME
);

DELIMITER //

-- Trigger: prevenir eliminación de usuario con deportista asociado
CREATE TRIGGER prevenirEliminacionUsuario
BEFORE DELETE ON Usuario
FOR EACH ROW
BEGIN
    IF (SELECT COUNT(*) FROM Deportista WHERE idUsuarioFK = OLD.idUsuario) > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'No se puede eliminar un usuario con deportista asociado';
    END IF;
END//
-- Trigger: registrar fecha de inscripción de deportista
CREATE TRIGGER registrarFechaInscripcion
BEFORE INSERT ON Deportista
FOR EACH ROW
BEGIN
    SET NEW.fechaInscripcion = CURDATE();
END//

-- Trigger: limitar a 3 categorías por entrenador
CREATE TRIGGER limitarCategoriasEntrenador
BEFORE INSERT ON Entrenador
FOR EACH ROW
BEGIN
    IF (SELECT COUNT(*) FROM Entrenador WHERE idUsuarioEFK = NEW.idUsuarioEFK) >= 3 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Un entrenador no puede estar en más de 3 categorías';
    END IF;
END//

-- Trigger: registrar cambios en los eventos
CREATE TRIGGER registrarCambiosEventos
AFTER UPDATE ON Eventos
FOR EACH ROW
BEGIN
    INSERT INTO historialEventos (idEvento, nombreEventoAntiguo, nombreEventoNuevo, fechaCambio)
    VALUES (OLD.idEvento, OLD.nombreEvento, NEW.nombreEvento, NOW());
END//

DELIMITER ;
