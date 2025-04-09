create database Lynx;

USE Lynx;


create table usuario (
    idUsuario INT auto_increment PRIMARY KEY, 
    tipoUsuario VARCHAR(40) NOT NULL,
    nombreUsu varchar (50)   
);


create table administrador(
	idAdministrador INT auto_increment primary key,
    idUsuarioFK int,
    claveAdmin varchar(50) NOT NULL,
    correoAdmin varchar(100) NOT NULL,
	FOREIGN KEY (idUsuarioFK) REFERENCES usuario(idUsuario) ON DELETE SET NULL ON UPDATE CASCADE
);


create table deportista(
    idDeportista INT AUTO_INCREMENT PRIMARY KEY,
    idUsuarioFK int,
	posicionDeportista varchar(50) not null,
    categoriaDeportista varchar(50) not null,
    dorsalDeportista int not null,
    direccionDeportista varchar(50) not null,
    edadDeportista int not null,
    estadoDeportista boolean not null,
    nombreAcudiente varchar(100),
    telefonoAcudiente varchar (60),
    correoAcudiente varchar(100),
    FOREIGN KEY (idUsuarioFK) REFERENCES usuario(idUsuario) ON DELETE CASCADE ON UPDATE CASCADE
);

create table entrenador(
	idEntrenador int auto_increment primary key,
    idUsuarioFK int,
	categoriaEntrenador varchar (40),
    epsEntrenador varchar(50),
    salarioEntrenador float,
    FOREIGN KEY (idUsuarioFK) REFERENCES usuario(idUsuario) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE horario (
    idHorario int auto_increment primary key,
    fecha date NOT NULL,
    hora time NOT NULL,
    lugar varchar(100) NOT NULL
);

CREATE TABLE evento (
    idEvento int auto_increment primary key,
    idUsuarioFK int,
    tipoEvento varchar(50) NOT NULL,
    descripcionEvento TEXT NOT NULL,
    idHorarioFK int,
    FOREIGN KEY (idHorarioFK) REFERENCES horario(idHorario) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (idUsuarioFK) REFERENCES usuario(idUsuario) ON DELETE SET NULL ON UPDATE CASCADE
);





#---------------------------------INSERCION DE VALORES---------------------------------

#---------------------------------USUARIO---------------------------------
-- Inserciones de deportistas en la tabla usuario
INSERT INTO usuario (idUsuario, tipoUsuario, nombreUsu)
VALUES
  ("",'Administrador', 'Kevin Velásquez'),
  ("",'Entrenador', 'Carlos Andrés Mendoza'),
  ("",'Entrenador',' Juliana Ramírez Soto'),
  ("",'Entrenador', 'Oscar Giovanni López'),
  ("",'Entrenador','Patricia Fernández Castro'),
  ("",'Deportista', 'Karolina Dolores Mederos Silveira'),
  ("",'Deportista', 'Elizabeth Garcia Arias'),
  ("",'Deportista', 'Luciana Dussan Molina'),
  ("",'Deportista', 'Laura Camila Galvis Nieto'),
  ("",'Deportista', 'Sofía Alejandra Mendoza'),
  ("",'Deportista', 'Valentina Ríos Castro'),
  ("",'Deportista', 'Nikoll Gabriela Pajarito Gomez'),
  ("",'Deportista', 'María Alejandra Ortega Cruz'),
  ("",'Deportista', 'Danna Isabella Garcia Arias'),
  ("",'Deportista', 'Eilyn Estefanía Vielma Bonilla'),
  ("",'Deportista', 'Lina Estefanía Fonseca Sierra'),
  ("",'Deportista', 'Nikoll Gabriela Pajarito Gómez'),
  ("",'Deportista', 'Alejandro Ramírez Molina'),
  ("",'Deportista', 'Santiago Gómez López'),
  ("",'Deportista', 'Daniela Torres Sánchez'),
  ("",'Deportista', 'Mariana Vargas Díaz'),
  ("",'Deportista', 'Casas Porras Paula Daniela'),
  ("",'Deportista', 'Natalia Cabana Enciso'),
  ("",'Deportista', 'María Fernanda Rodríguez'),
  ("",'Deportista', 'Valerie Cruz Garcia'),
  ("",'Deportista', 'Ana Sofía Forero Berdugo'),
  ("",'Deportista', 'Juanita Rojas Salguero'),
  ("",'Deportista', 'Diana Valentina González Urrea'),
  ("",'Deportista', 'Isabella Rojas Valbuena'),
  ("",'Deportista', 'Isabella López Barragán'),
  ("",'Deportista', 'Laura Mariana Hortua Hernández'),
  ("",'Deportista', 'Camila Restrepo Gutiérrez'),
  ("",'Deportista', 'Valeria Duarte Silva'),
  ("",'Deportista', 'María José Pérez'),
  ("",'Deportista', 'Sara Jiménez Ruiz'),
  ("",'Deportista', 'Gabriela Castro Méndez'),
  ("",'Deportista', 'Yenny Sofía Moreno Albarracín'),
  ("",'Deportista', 'Manuel Ricardo Mora Pulido'),
  ("",'Deportista', 'Carlos Andrés Sánchez'),
  ("",'Deportista', 'Laura Pinzón González'),
  ("",'Deportista', 'David Martínez Rojas'),
  ("",'Deportista', 'Sofía Ramírez Díaz'),
  ("",'Deportista', 'Juan Camilo López'),
  ("",'Deportista', 'María Alejandra Torres'),
  ("",'Deportista', 'Andrés Felipe Gómez'),
  ("",'Deportista', 'Daniela Sánchez Pérez'),
  ("",'Deportista', 'Juliana Castro Morales'),
  ("",'Deportista', 'Santiago García López'),
  ("",'Deportista', 'Valentina Martínez Díaz'),
  ("",'Deportista', 'Samuel Rodríguez Pérez'),
  ("",'Deportista', 'Isabela González Sánchez'),
  ("",'Deportista', 'Miguel Ángel Díaz'),
  ("",'Deportista', 'Camila Hernández Castro'),
  ("",'Deportista', 'Sebastián López Martínez'),
  ("",'Deportista', 'Mariana Torres García');

SELECT * FROM usuario;



#---------------------------------DEPORTISTAS---------------------------------
-- insert into deportista values -- Inserciones completas organizadas por categoría con día de la semana y hora
-- Inserciones de la información específica en la tabla deportista
INSERT INTO deportista (idDeportista, idUsuarioFK, posicionDeportista, categoriaDeportista, dorsalDeportista, direccionDeportista, edadDeportista, estadoDeportista, nombreAcudiente, telefonoAcudiente, correoAcudiente)
VALUES 
  ("",5, 'central', 'Infantil', 9, 'Calle 63D# 71-08', 10, 1, 'Odelaysi Silveira Vaillant', '3143531532', ''),
  ("",6, 'armadora', 'Infantil', 12, 'CRA 69J 64H45', 9, 1, 'Julie Paoliene Arias J', '3118485203', ''),
  ("",7, 'auxiliar', 'Infantil', 15, 'calle 64 c # 69 h-20', 10, 1, 'Jackelin Molina Echeverry', '3133508960', ''),
  ("",8, 'central', 'Infantil', 17, 'Cra 77 # 52a 67 anillo 3 apto 416', 10, 1, 'Sandra Milena Nieto', '3508052206', ''),
  ("",9, 'opuesto', 'Infantil', 24, 'Calle 65 #72-15', 9, 1, 'María Mendoza', '3101234567', ''),
  ("",10, 'armadora', 'Infantil', 25, 'Carrera 70 #63-20', 10, 1, 'Carlos Ríos', '3202345678', ''),
  ("",11, 'armadora', 'Pre-Juvenil', 8, 'Calle 73a #69p-14', 14, 1, 'Angelica Gomez', '3022007439', ''),
  ("",12, 'opuesto', 'Pre-Juvenil', 10, 'Carrera 64 A 22 - 41 Torre 4 Apto 801', 13, 1, 'Adriana Milena Cruz Reina', '3167440362', ''),
  ("",13, 'auxiliar', 'Pre-Juvenil', 11, 'CRA 69J 64H45', 11, 1, 'Julie Paoliene Arias J', '3118485203', ''),
  ("",14, 'opuesto', 'Pre-Juvenil', 14, 'calle 63a 70c 58', 12, 1, 'Betzaida Ines Vielma Bonilla', '3227891327', ''),
  ("",15, 'opuesto', 'Pre-Juvenil', 18, 'Cra 69L #64-56', 14, 1, 'Luz Edid Sierra Medina', '3115466331', ''),
  ("",16, 'central', 'Pre-Juvenil', 21, 'Calle 73 A 69 P 14', 14, 1, 'Angélica Gómez Vallejo', '3022007439', ''),
  ("",17, 'opuesto', 'Pre-Juvenil', 22, 'CRA 71 64 D 05', 14, 1, 'Nancy Molina Lizcano', '3143051010', ''),
  ("",18, 'central', 'Pre-Juvenil', 26, 'Calle 68 #75-30', 13, 1, 'Laura López', '3153456789', ''),
  ("",19, 'armadora', 'Pre-Juvenil', 27, 'Carrera 72 #64-12', 12, 1, 'Juan Torres', '3164567890', ''),
  ("",20, 'auxiliar', 'Pre-Juvenil', 28, 'Calle 70 #68-45', 13, 1, 'Luisa Díaz', '3175678901', ''),
  ("",21, 'central', 'Juvenil', 1, 'Calle 66 # 70 F - 13', 15, 1, '', '', ''),
  ("",22, 'opuesto', 'Juvenil', 2, 'Calle 71B #77A-25', 15, 1, '', '', ''),
  ("",23, 'auxiliar', 'Juvenil', 3, 'Carrera 68G #64A-39', 14, 1, '', '', ''),
  ("",24, 'armadora', 'Juvenil', 4, 'Avenida calle 100 #64-51', 16, 1, '', '', ''),
  ("",25, 'central', 'Juvenil', 5, 'Carrera 69h número 63a 37', 17, 1, '', '', ''),
  ("",26, 'opuesto', 'Juvenil', 6, 'Cll 24d#43 a54', 16, 1, 'Blanca Liliana Salguero Urquijo', '3057456158', ''),
  ("",27, 'auxiliar', 'Juvenil', 7, 'Calle 63 B # 69-62', 15, 1, 'Angélica Urrea', '3057089456', ''),
  ("",28, 'armadora', 'Juvenil', 16, 'Calle 66 No. 59 31', 15, 1, 'Zayde Valbuena', '3107893862', ''),
  ("",29, 'auxiliar', 'Juvenil', 19, 'Cra70c#64d-19', 17, 1, 'Maria Benilda Barragán Benavides', '3209032219', ''),
  ("",30, 'armadora', 'Juvenil', 20, 'Cra 69 #66-69', 15, 1, 'Ruth Marinela Hernández Garcia', '3123211696', ''),
  ("",31, 'central', 'Juvenil', 29, 'Carrera 75 #62-18', 16, 1, 'Andrés Restrepo', '3186789012', ''),
  ("",32, 'opuesto', 'Juvenil', 30, 'Calle 67 #74-22', 15, 1, 'Marcela Silva', '3197890123', ''),
  ("",33, 'auxiliar', 'Juvenil', 31, 'Carrera 73 #65-10', 16, 1, 'Carlos Pérez', '3208901234', ''),
  ("",34, 'armadora', 'Juvenil', 32, 'Calle 69 #70-15', 15, 1, 'Ana Ruiz', '3219012345', ''),
  ("",35, 'central', 'Juvenil', 33, 'Carrera 68 #71-30', 16, 1, 'Luisa Méndez', '3220123456', ''),
  ("",36, 'central', 'Mayores', 13, 'Calle 64b#71a-61 apto502B', 20, 1, 'Bibiana Albarracín Velandia', '3222553678', ''),
  ("",37, 'auxiliar', 'Mayores', 23, 'Cra. 72b #23c-65, Bogotá', 19, 1, 'Milgen Savaz Pulido Daza', '3175169807', ''),
  ("",38, 'opuesto', 'Mayores', 34, 'Calle 72 #68-40', 21, 1, 'Patricia Sánchez', '3231234567', ''),
  ("",39, 'armadora', 'Mayores', 35, 'Carrera 70 #65-25', 20, 1, 'Jorge Pinzón', '3242345678', ''),
  ("",40, 'central', 'Mayores', 36, 'Calle 71 #66-12', 22, 1, 'Sandra Rojas', '3253456789', ''),
  ("",41, 'opuesto', 'Mayores', 37, 'Carrera 69 #67-18', 21, 1, 'Alberto Ramírez', '3264567890', ''),
  ("",42, 'auxiliar', 'Mayores', 38, 'Calle 70 #68-33', 20, 1, 'Claudia López', '3275678901', ''),
  ("",43, 'armadora', 'Mayores', 39, 'Carrera 71 #69-14', 21, 1, 'Ricardo Torres', '3286789012', ''),
  ("",44, 'central', 'Mayores', 40, 'Calle 69 #70-22', 22, 1, 'Carolina Gómez', '3297890123', ''),
  ("",45, 'opuesto', 'Mayores', 41, 'Carrera 72 #71-30', 21, 1, 'Fernando Sánchez', '3308901234', ''),
  ("",46, 'auxiliar', 'Juvenil', 42, 'Calle 73 #72-15', 16, 1, 'Luis Castro', '3319012345', ''),
  ("",47, 'armadora', 'Pre-Juvenil', 43, 'Carrera 74 #73-20', 13, 1, 'María García', '3320123456', ''),
  ("",48, 'central', 'Infantil', 44, 'Calle 75 #74-25', 10, 1, 'Carlos Martínez', '3331234567', ''),
  ("",49, 'opuesto', 'Pre-Juvenil', 45, 'Carrera 76 #75-30', 12, 1, 'Ana Rodríguez', '3342345678', ''),
  ("",50, 'auxiliar', 'Juvenil', 46, 'Calle 77 #76-35', 15, 1, 'Jorge González', '3353456789', ''),
  ("",51, 'armadora', 'Mayores', 47, 'Carrera 78 #77-40', 21, 1, 'Lucía Díaz', '3364567890', ''),
  ("",52, 'central', 'Juvenil', 48, 'Calle 79 #78-45', 16, 1, 'Pedro Hernández', '3375678901', ''),
  ("",53, 'opuesto', 'Pre-Juvenil', 49, 'Carrera 80 #79-50', 13, 1, 'Laura López', '3386789012', ''),
  ("",54, 'auxiliar', 'Infantil', 50, 'Calle 81 #80-55', 9, 1, 'Andrés Torres', '3397890123', '');

#---------------------------------HORARIO---------------------------------
INSERT INTO horario (idHorario, fecha, hora, lugar) VALUES 
("", '2023-11-15', '08:00:00', 'Cancha Lynx'),
("", '2023-11-16', '10:00:00', 'Cancha Lynx'),
("", '2023-11-17', '14:00:00', 'Cancha Lynx'),
("", '2023-11-18', '16:00:00', 'Cancha Lynx'),
("", '2023-11-19', '09:00:00', 'Polideportivo Municipal'),
("", '2023-11-20', '11:00:00', 'Coliseo Deportivo Local'),
("", '2023-11-21', '15:00:00', 'Gimnasio Los Pinos'),
("", '2023-11-22', '17:00:00', 'Parque Deportivo La Sabana'),
("", '2023-11-23', '08:30:00', 'Complejo Acuático y Deportivo'),
("", '2023-11-24', '10:30:00', 'Estadio Municipal de Voleibol'),
("", '2023-11-25', '13:00:00', 'Canchas Sintéticas Universitarias'),
("", '2023-11-26', '15:30:00', 'Polideportivo Barrial'),
("", '2023-11-27', '18:00:00', 'Gimnasio Olímpico Regional'),
("", '2023-11-28', '07:30:00', 'Centro Deportivo Las Acacias'),
("", '2023-11-29', '12:00:00', 'Canchas del Parque Central'),
("", '2023-11-30', '14:30:00', 'Gimnasio del Instituto Deportivo'),
("", '2023-12-01', '16:30:00', 'Coliseo Cubierto Municipal'),
("", '2023-12-02', '19:00:00', 'Complejo Deportivo El Bosque'),
("", '2023-12-03', '20:00:00', 'Polideportivo de la Universidad');
#---------------------------------EVENTO---------------------------------
INSERT INTO evento (idEvento, idUsuarioFK, tipoEvento, descripcionEvento, idHorarioFK) VALUES
("", 6, 'Entrenamiento', 'Sesión técnica para categoría Infantil: fundamentos básicos', 1),
("",7, 'Entrenamiento', 'Preparación física para Pre-Juvenil: resistencia y velocidad', 2),
("",8, 'Entrenamiento', 'Estrategias de juego para categoría Juvenil: sistemas 4-2 y 6-2', 3),
("",9, 'Entrenamiento', 'Preparación avanzada para Mayores: táctica y análisis de rivales', 4),
("",10, 'Partido amistoso', 'Encuentro preparatorio infantil vs. equipo Águilas', 5),
("",11, 'Clínica deportiva', 'Taller de saque flotante para Pre-Juvenil', 6),
("",12, 'Torneo local', 'Segunda fecha campeonato juvenil interclubes', 7),
("",13, 'Entrenamiento físico', 'Circuito de acondicionamiento general', 8),
("",14, 'Partido oficial', 'Liga regional categoría Mayores - Fase grupos', 9),
("",15, 'Evaluación técnica', 'Pruebas de habilidades individuales juveniles', 10),
("",16, 'Entrenamiento combinado', 'Sesión integrada categorías Juvenil y Mayores', 11),
("",17, 'Clase teórica', 'Análisis táctico de sistemas de juego para Pre-Juvenil', 12),
("",18, 'Evento especial', 'Exhibición de voleibol playa con invitados', 13),
("",19, 'Entrenamiento especial', 'Trabajo específico de bloqueo para infantiles', 14),
("",20, 'Partido de exhibición', 'Amistoso Mayores vs. equipo visitante', 15),
("",21, 'Clínica para principiantes', 'Introducción al voleibol para nuevos infantiles', 16),
("",22, 'Torneo relámpago', 'Competencia de un día categoría Pre-Juvenil', 17),
("",23, 'Sesión de video análisis', 'Revisión de partidos anteriores de Juvenil', 18),
("",24, 'Evento comunitario', 'Jornada deportiva familiar integrada', 19);
#---------------------------------ENTRENADOR---------------------------------
INSERT INTO entrenador (idEntrenador, idUsuarioFK, categoriaEntrenador, epsEntrenador, salarioEntrenador) VALUES
("",2, 'Infantil', 'Sura', 1800000.00),
("",3, 'Pre-Juvenil', 'Nueva EPS', 2200000.00),
("",4, 'Juvenil', 'Coomeva', 2800000.00),
("",5, 'Mayores', 'Sanitas', 3500000.00);
#---------------------------------ADMINISTRADOR---------------------------------
INSERT INTO administrador (idAdministrador,idUsuarioFK, claveAdmin, correoAdmin) VALUES
("",1, 'AdminLynx2023*', 'admin@lynxclub.com.co');





#--------------------------------- ADD COLUM -----------------------------
-- Añadir columna mensualidad y resgitro 
ALTER TABLE deportista ADD COLUMN idAcudiente INT;
-- Añadir columna mensualidad y resgitro 
ALTER TABLE deportista ADD COLUMN mensualidad FLOAT;
-- Añadir columna eps a deportista y registro
ALTER TABLE deportista ADD COLUMN epsDeportista VARCHAR (50);



#------------------------ Busquedas ------------------
-- Buscar deportista por nombre
SELECT * FROM usuario WHERE nombreUsu LIKE "%Daniela%";
-- Buscar deportista por id
SELECT * FROM deportista WHERE idDeportista = 48;
-- Buscar entrenador por nombre
SELECT * FROM usuario WHERE nombreUsu LIKE "%Oscar%";
-- Buscar entrenador por id
SELECT * FROM entrenador WHERE idEntrenador = 2;
-- Buscar deportista por categroia
SELECT * FROM deportista WHERE categoriaDeportista = "juvenil";
-- Buscar entrenador por categoria
SELECT * FROM entrenador WHERE categoriaEntrenador = "infantil";
-- Buscar deportista por posicion 
SELECT * FROM deportista WHERE posicionDeportista = "auxiliar";

SELECT * FROM deportista WHERE epsDeportista = "sanitas";
-- Buscar deportista por el dorsal 
SELECT * FROM deportista WHERE dorsalDeportista = "9";

-- Buscar deportistas por su edad
SELECT * FROM deportista WHERE edadDeportista = 14;


#------------------------- Modificaciones -------------------------

-- Modificar nombre por nombre
-- Modificar nombre del deportista
UPDATE usuario SET nombreUsu = "catalina carreño" WHERE idUsuario = 5;
-- Modificar posición del deportista
UPDATE deportista SET posicionDeportista = 'auxiliar' WHERE idDeportista = 10;
-- Modificar EPS del deportista
UPDATE deportista SET epsDeportista = 'salud total' WHERE idDeportista = 11;
-- Modificar mensualidad
UPDATE deportista SET mensualidad = 90000 WHERE idDeportista = 9;
-- Modificar dorsal
UPDATE deportista SET dorsalDeportista = 79 WHERE idDeportista = 40;
-- Modificar dirección
UPDATE deportista SET direccionDeportista = 'calle 23  #45 -78' WHERE idDeportista = 2;
-- Modificar edad
UPDATE deportista SET edadDeportista = 28 WHERE idDeportista = 4;
-- Modificar nombre del entrenador
UPDATE usuario SET nombreUsu = 'juan lopez' WHERE idUsuario = ( SELECT idUsuarioFK FROM entrenador WHERE idEntrenador = 4);
-- Modificar EPS del entrenador
UPDATE entrenador SET epsEntrenador = 'salud total' WHERE idEntrenador = 1;
-- Modificar salario
UPDATE entrenador SET salarioEntrenador = 10000 WHERE idEntrenador = 3;
-- Modificar nombre del administrador
UPDATE usuario SET nombreUsu = 'kevin Daniel Velasquez' WHERE idUsuario = (SELECT idUsuarioFK FROM administrador WHERE idAdministrador = 1);
-- Modificar ID del administrador (no recomendado)
UPDATE Administrador SET idAdministrador = 1 WHERE idAdministrador = 2;
-- Modificar nombre del acudiente
UPDATE deportista SET nombreAcudiente = 'daniela mosquera' WHERE idDeportista = 40;
-- Modificar teléfono del acudiente
UPDATE deportista SET telefonoAcudiente = '3047898554' WHERE idDeportista = 30;
-- Modificar correo del acudiente
UPDATE deportista SET correoAcudiente = 'nuevo@correo.com' WHERE idDeportista = 19;




-- Modificar posición del deportista
UPDATE deportista SET posicionDeportista = 'auxiliar' WHERE idDeportista = 10;

-- Modificar EPS del entrenador
UPDATE entrenador SET epsEntrenador = 'salud total' WHERE idEntrenador = 1;

-- Modificar salario
UPDATE entrenador SET salarioEntrenador = 10000 WHERE idEntrenador = 3;

-- Modificar nombre del acudiente
UPDATE deportista SET nombreAcudiente = 'daniela mosquera' WHERE idDeportista = 40;

-- Modificar teléfono del acudiente
UPDATE deportista SET telefonoAcudiente = '3047898554' WHERE idDeportista = 30;

-- Modificar correo del acudiente
UPDATE deportista SET correoAcudiente = 'nuevo@correo.com' WHERE idDeportista = 19;

-- Modificar dirección del deportista
UPDATE deportista SET direccionDeportista = 'calle 23  #45 -78' WHERE idDeportista = 2;

-- Modificar edad
UPDATE deportista SET edadDeportista = 28 WHERE idDeportista = 4;



#cantidad de deportistas activos por categoria*/
SELECT 
    d.categoriaDeportista,
    COUNT(*) AS total_activos
FROM 
    deportista d
WHERE 
    d.estadoDeportista = 1
GROUP BY 
    d.categoriaDeportista;



use lynx;

# --------------------------Consultas multitabla -----------------------------------------
#Consultar jugadores que estan inscritos a un evento
SELECT 
    u.nombreUsu AS "Nombre Deportista",
    e.tipoEvento AS "Tipo de Evento",
    e.descripcionEvento AS "Descripción",
    h.fecha AS "Fecha",
    h.hora AS "Hora",
    h.lugar AS "Lugar"
FROM deportista d
JOIN usuario u ON d.idUsuarioFK = u.idUsuario
JOIN evento e ON e.idUsuarioFK = u.idUsuario
JOIN horario h ON e.idHorarioFK = h.idHorario;


#Consultar entrenadores que estan inscritos a un evento
SELECT 
    u.nombreUsu AS "Nombre Entrenador",
    en.categoriaEntrenador,
    e.tipoEvento,
    h.fecha,
    h.hora,
    h.lugar
FROM entrenador en
JOIN usuario u ON en.idUsuarioFK = u.idUsuario
JOIN evento e ON e.idUsuarioFK = u.idUsuario
JOIN horario h ON e.idHorarioFK = h.idHorario;



#Mostrar los administradores y el tipo de usuario que tiene
SELECT 
    u.nombreUsu AS "Nombre Administrador",
    a.correoAdmin,
    u.tipoUsuario
FROM administrador a
JOIN usuario u ON a.idUsuarioFK = u.idUsuario;



#Mostrar los deportistas y el tipo de usuario que tiene
SELECT 
    u.nombreUsu AS "Nombre Deportista",
    u.tipoUsuario AS "Tipo de Usuario"
FROM deportista d
JOIN usuario u ON d.idUsuarioFK = u.idUsuario;


#Mostrar los entrenadores y el tipo de usuario que tiene
SELECT 
    u.nombreUsu AS "Nombre Entrenador",
    u.tipoUsuario AS "Tipo de Usuario"
FROM entrenador en
JOIN usuario u ON en.idUsuarioFK = u.idUsuario;


#Obtener los deportistas con su acudiente y el evento al que asisten
SELECT 
    u.nombreUsu AS "Nombre Deportista",
    d.nombreAcudiente,
    d.telefonoAcudiente,
    e.tipoEvento,
    h.fecha,
    h.hora,
    h.lugar
FROM deportista d
JOIN usuario u ON d.idUsuarioFK = u.idUsuario
JOIN evento e ON e.idUsuarioFK = u.idUsuario
JOIN horario h ON e.idHorarioFK = h.idHorario;


#Deportistas activos que asistirán a eventos deportivos
SELECT 
    u.nombreUsu AS "Nombre Deportista",
    d.estadoDeportista AS "Activo",
    e.tipoEvento AS "Tipo de Evento",
    h.fecha AS "Fecha",
    h.hora AS "Hora"
FROM deportista d
JOIN usuario u ON d.idUsuarioFK = u.idUsuario
JOIN evento e ON e.idUsuarioFK = u.idUsuario
JOIN horario h ON e.idHorarioFK = h.idHorario
WHERE d.estadoDeportista = TRUE;


#Mostrar todos los Usuarios con su rol especifico*/
SELECT 
    u.idUsuario,
    u.tipoUsuario,
    CASE 
        WHEN a.idAdministrador IS NOT NULL THEN 'Administrador'
        WHEN d.idDeportista IS NOT NULL THEN 'Deportista'
        WHEN e.idEntrenador IS NOT NULL THEN 'Entrenador'
        ELSE 'Desconocido'
    END AS rol,
    u.nombreUsu AS "Nombre"
FROM 
    usuario u
LEFT JOIN administrador a ON u.idUsuario = a.idUsuarioFK
LEFT JOIN deportista d ON u.idUsuario = d.idUsuarioFK
LEFT JOIN entrenador e ON u.idUsuario = e.idUsuarioFK;


#Listar usuarios que están registrados como deportistas o entrenadores, junto con su nombre
SELECT 
    u.idUsuario,
    u.tipoUsuario,
    COALESCE(d.nombreDeportista, e.nombreEntrenador) AS nombre
FROM 
    usuario u
LEFT JOIN deportista d ON u.idUsuario = d.idUsuarioFK
LEFT JOIN entrenador e ON u.idUsuario = e.idUsuarioFK
WHERE 
    d.idDeportista IS NOT NULL OR e.idEntrenador IS NOT NULL;
    
#consultar la informacion de los usuarios, el id del deportista y la informacion del evento que tiene registrado
SELECT 
    u.idUsuario,
    d.idDeportista,
    u.tipoUsuario,
    ev.tipoEvento,
    ev.descripcionEvento,
    h.fecha,
    h.hora,
    h.lugar
FROM 
    usuario u
JOIN evento ev ON u.idUsuario = ev.idUsuarioFK
JOIN horario h ON ev.idHorarioFK = h.idHorario
LEFT JOIN deportista d ON u.idUsuario = d.idUsuarioFK;


#consultar la informacion de contacto de los deportistas
SELECT 
    d.idDeportista,
    u.nombreUsu AS "Nombre Deportista",
    d.nombreAcudiente,
    d.telefonoAcudiente,
    d.correoAcudiente
FROM 
    deportista d
JOIN 
    usuario u ON d.idUsuarioFK = u.idUsuario
WHERE 
    d.estadoDeportista = 1;

    
#Evento y horario asignado a un deportista
SELECT 
    d.idDeportista,
    u.nombreUsu AS "Nombre Deportista",
    e.tipoEvento,
    e.descripcionEvento,
    h.fecha,
    h.hora,
    h.lugar
FROM 
    deportista d
JOIN 
    usuario u ON d.idUsuarioFK = u.idUsuario
JOIN 
    evento e ON u.idUsuario = e.idUsuarioFK
JOIN 
    horario h ON e.idHorarioFK = h.idHorario;




#Eventos en los que ha participado un entrenador
SELECT 
    u.nombreUsu AS "Nombre Entrenador",
    ev.tipoEvento,
    ev.descripcionEvento,
    h.fecha,
    h.hora,
    h.lugar
FROM 
    entrenador en
JOIN 
    usuario u ON en.idUsuarioFK = u.idUsuario
JOIN 
    evento ev ON u.idUsuario = ev.idUsuarioFK
JOIN 
    horario h ON ev.idHorarioFK = h.idHorario;




#Mostrar eventos que ha registrado el administrador
SELECT 
    a.idAdministrador,
    a.correoAdmin,
    e.tipoEvento,
    e.descripcionEvento
FROM 
    administrador a
JOIN 
    evento e ON a.idAdministrador = e.idUsuarioFK;



# Consultas subconsultas

#Entrenadores uyo salario está por encima del promedio general
SELECT 
    u.nombreUsu AS "Nombre Entrenador", 
    e.salarioEntrenador AS "Salario"
FROM entrenador e
JOIN usuario u ON e.idUsuarioFK = u.idUsuario
WHERE e.salarioEntrenador > (
    SELECT AVG(salarioEntrenador) FROM entrenador
);

#Deportistas cuyo acudiente tiene correo registrado en Gmail
SELECT 
    u.nombreUsu AS "Nombre Deportista", 
    d.correoAcudiente AS "Correo Acudiente"
FROM deportista d
JOIN usuario u ON d.idUsuarioFK = u.idUsuario
WHERE d.correoAcudiente LIKE '%@gmail.com';

# Consultas procedimientos almacenados

/*Procedimiento para registrar un Usuario*/
DELIMITER //
create procedure RegistrarUsuario(in idUsuario int, in tipoUsuario varchar (40), nombreUsu varchar (50))
BEGIN
	insert into Usuario (idUsuario, tipoUsuario, nombreUsu)
    values(idUsuario, tipoUsuario, nombreUsu);
END //
DELIMITER ;

call RegistrarUsuario("","Deportista", "Alberto Gamero");
/*Procedimiento para registrar un Deportista*/
DELIMITER //
create procedure RegistrarDeportista(in idDeportista int, in idUsuario int, in posicionDeportista varchar (50), in categoriaDeportista varchar (50),
in dorsalDeportista int, in direccionDeportista varchar (50), in edadDeportista int, in estadoDeportista boolean, in nombreAcudiente varchar (100), in telefonoAcudiente int,
in correoAcudiente varchar (100))
 BEGIN
	insert into Deportista(idDeportista, idUsuarioFK, posicionDeportista , categoriaDeportista, dorsalDeportista , direccionDeportista , edadDeportista,
    estadoDeportista , nombreAcudiente, telefonoAcudiente, correoAcudiente)
	values(idDeportista , idUsuario , posicionDeportista, categoriaDeportista, dorsalDeportista , direccionDeportista,  edadDeportista, estadoDeportista , 
    nombreAcudiente, telefonoAcudiente, correoAcudiente);
END //
DELIMITER ;    

/*Procedimiento para registrar un Administrador*/
DELIMITER //
create procedure RegistrarAdministrador(in idAdministrador int, in idUsuario int, in claveAdmin varchar (50), in correoAdmin varchar(100))
BEGIN
	insert into Administrador(idAdministrador, idUsuarioFK, claveAdmin, correoAdmin)
    values(idAdministrador, idUsuario, claveAdmin, correoAdmin);
END //
DELIMITER ;    
call RegistrarAdministrador("", 1, "ahsdfasdfa", "sizquierdo0602@gmail.com");
select * from Administrador;

/*Procedimiento para registrar un Evento*/
DELIMITER //
create procedure RegistrarEvento(in idEvento int, in idUsuario int, in tipoEvento varchar(50), in descripcionEvento text, in idHorario int)
BEGIN
	insert into Evento(idEvento, idUsuarioFK, tipoEvento, descripcionEvento, idHorarioFK)
    values(idEvento, idUsuario, tipoEvento, descripcionEvento, idHorario);
END //
DELIMITER ;

/*Procedimiento para registrar un Horario*/
DELIMITER //
create procedure RegistrarHorario(in idHorario int, in fecha date, in hora time, in lugar varchar (100))
BEGIN
	insert into Horario(idHorario, fecha, hora, lugar)
    values(idHorario, fecha, hora, lugar);
END //
DELIMITER ;

/*Procedimiento para registrar un Entrenador*/
DELIMITER //
create procedure RegistrarEntrenador(in idEntrenador int, in idUsuario int, in categoriaEntrenador varchar (40), in epsEntrenador varchar (50), in salarioEntrenador float)
BEGIN
	insert into Entrenador(idEntrenador,  idUsuarioFK,  categoriaEntrenador,  epsEntrenador,  salarioEntrenador)
    values(idEntrenador,  idUsuario,  categoriaEntrenador,  epsEntrenador,  salarioEntrenador);
END //
DELIMITER ;




# Consultas vistas
-- Vista 1: Usuarios registrados
CREATE VIEW vista_usuarios_generales AS
SELECT idUsuario, tipoUsuario, nombreUsu
FROM usuario;


select * from vista_usuarios_generales;

-- Vista 2: Usuarios con su rol específico (si existe en alguna tabla relacionada)
CREATE VIEW vista_usuarios_roles AS
SELECT u.idUsuario, u.nombreUsu, u.tipoUsuario,
       CASE
           WHEN a.idAdministrador IS NOT NULL THEN 'Administrador'
           WHEN d.idDeportista IS NOT NULL THEN 'Deportista'
           WHEN e.idEntrenador IS NOT NULL THEN 'Entrenador'
           ELSE 'Sin rol'
       END AS rolAsignado
FROM usuario u
LEFT JOIN administrador a ON u.idUsuario = a.idUsuarioFK
LEFT JOIN deportista d ON u.idUsuario = d.idUsuarioFK
LEFT JOIN entrenador e ON u.idUsuario = e.idUsuarioFK;





-- Vista 1: Administradores con sus datos personales
CREATE VIEW vista_administradores_basico AS
SELECT idAdministrador, idUsuarioFK, correoAdmin
FROM administrador;

-- Vista 2: Administradores con nombre de usuario
CREATE VIEW vista_administradores_completa AS
SELECT a.idAdministrador, u.nombreUsu, a.correoAdmin, a.claveAdmin
FROM administrador a
JOIN usuario u ON a.idUsuarioFK = u.idUsuario;


-- Vista 1: Datos personales de deportistas
CREATE VIEW vista_deportistas_basico AS
SELECT idDeportista, dorsalDeportista, edadDeportista, estadoDeportista
FROM deportista;

-- Vista 2: Deportistas con su nombre de usuario
CREATE VIEW vista_deportistas_completa AS
SELECT d.idDeportista, u.nombreUsu, d.posicionDeportista, d.categoriaDeportista,
       d.dorsalDeportista, d.edadDeportista, d.estadoDeportista,
       d.nombreAcudiente, d.telefonoAcudiente
FROM deportista d
JOIN usuario u ON d.idUsuarioFK = u.idUsuario;



-- Vista 1: Entrenadores con su categoría y EPS
CREATE VIEW vista_entrenadores_basico AS
SELECT idEntrenador, categoriaEntrenador, epsEntrenador
FROM entrenador;

-- Vista 2: Entrenadores con nombre y salario
CREATE VIEW vista_entrenadores_completa AS
SELECT e.idEntrenador, u.nombreUsu, e.categoriaEntrenador, e.salarioEntrenador
FROM entrenador e
JOIN usuario u ON e.idUsuarioFK = u.idUsuario;


-- Vista 1: Todos los horarios registrados
CREATE VIEW vista_horarios AS
SELECT idHorario, fecha, hora, lugar
FROM horario;

-- Vista 2: Horarios ordenados por fecha y hora
CREATE VIEW vista_horarios_ordenados AS
SELECT idHorario, fecha, hora, lugar
FROM horario
ORDER BY fecha ASC, hora ASC;


-- Vista 1: Eventos con su tipo y descripción
CREATE VIEW vista_eventos_basico AS
SELECT idEvento, tipoEvento, descripcionEvento
FROM evento;

-- Vista 2: Eventos con nombre de usuario y horario
CREATE VIEW vista_eventos_completa AS
SELECT e.idEvento, u.nombreUsu AS creador, e.tipoEvento, e.descripcionEvento,
       h.fecha, h.hora, h.lugar
FROM evento e
LEFT JOIN usuario u ON e.idUsuarioFK = u.idUsuario
LEFT JOIN horario h ON e.idHorarioFK = h.idHorario;





# Disparadores

##Se crea una tabla para almacenar informacin de los disparadores cuando estos se activen.
CREATE TABLE auditoria (
    idAuditoria INT AUTO_INCREMENT PRIMARY KEY,
    tablaAfectada VARCHAR(50),
    operacion VARCHAR(20),
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    descripcion TEXT
);

# ------------------------USUARIO ------------------------
#1
DELIMITER //
CREATE TRIGGER before_insert_usuario_tipo
BEFORE INSERT ON usuario
FOR EACH ROW
BEGIN
    IF NEW.tipoUsuario NOT IN ('administrador', 'entrenador', 'deportista') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Tipo de usuario no válido';
    END IF;
END;
//
DELIMITER ;

#2
DELIMITER //
CREATE TRIGGER after_update_usuario_nombre
AFTER UPDATE ON usuario
FOR EACH ROW
BEGIN
    IF OLD.nombreUsu <> NEW.nombreUsu THEN
        INSERT INTO auditoria(tablaAfectada, operacion, descripcion)
        VALUES ('usuario', 'UPDATE', CONCAT('Cambio de nombre de "', OLD.nombreUsu, '" a "', NEW.nombreUsu, '"'));
    END IF;
END;
//
DELIMITER ;


# ------------------------Administrador ------------------------
#1 Validar tipo de usuario que sea permitido.

DELIMITER //
CREATE TRIGGER after_update_admin_clave
AFTER UPDATE ON administrador
FOR EACH ROW
BEGIN
    IF OLD.claveAdmin <> NEW.claveAdmin THEN
        INSERT INTO auditoria(tablaAfectada, operacion, descripcion)
        VALUES ('administrador', 'UPDATE', 'Cambio de contraseña de un administrador');
    END IF;
END;
//
DELIMITER ;

#2 Eliminar usuario al borrar administrador

DELIMITER //
CREATE TRIGGER after_delete_admin_borra_usuario
AFTER DELETE ON administrador
FOR EACH ROW
BEGIN
    DELETE FROM usuario WHERE idUsuario = OLD.idUsuarioFK;
END;
//
DELIMITER ;

#-----------------------Deportista----------------------

#1  Autocompletar el estado del deportista en true.
DELIMITER //
CREATE TRIGGER before_insert_deportista_estado
BEFORE INSERT ON deportista
FOR EACH ROW
BEGIN
    IF NEW.estadoDeportista IS NULL THEN
        SET NEW.estadoDeportista = TRUE;
    END IF;
END;
//
DELIMITER ;


#2  cambio de acudiente

DELIMITER //
CREATE TRIGGER after_update_deportista_acudiente
AFTER UPDATE ON deportista
FOR EACH ROW
BEGIN
    IF OLD.nombreAcudiente <> NEW.nombreAcudiente OR OLD.telefonoAcudiente <> NEW.telefonoAcudiente THEN
        INSERT INTO auditoria(tablaAfectada, operacion, descripcion)
        VALUES ('deportista', 'UPDATE', CONCAT('Cambio de acudiente a "', NEW.nombreAcudiente, '" con teléfono "', NEW.telefonoAcudiente, '"'));
    END IF;
END;
//
DELIMITER ;



#----------------Entrenador-----------------------
#1. Subir salario si cambia categoría
DELIMITER //
CREATE TRIGGER after_update_entrenador_categoria
AFTER UPDATE ON entrenador
FOR EACH ROW
BEGIN
    IF OLD.categoriaEntrenador <> NEW.categoriaEntrenador THEN
        UPDATE entrenador
        SET salarioEntrenador = salarioEntrenador + 50000
        WHERE idEntrenador = NEW.idEntrenador;
        
        INSERT INTO auditoria(tablaAfectada, operacion, descripcion)
        VALUES ('entrenador', 'UPDATE', CONCAT('Cambio de categoría a "', NEW.categoriaEntrenador, '". Se aumentó el salario.'));
    END IF;
END;
//
DELIMITER ;

#2 CAMBIO DE EPS
DELIMITER //
CREATE TRIGGER after_update_entrenador_eps
AFTER UPDATE ON entrenador
FOR EACH ROW
BEGIN
    IF OLD.epsEntrenador <> NEW.epsEntrenador THEN
        INSERT INTO auditoria(tablaAfectada, operacion, descripcion)
        VALUES ('entrenador', 'UPDATE', CONCAT('Cambio de EPS de "', OLD.epsEntrenador, '" a "', NEW.epsEntrenador, '"'));
    END IF;
END;
//
DELIMITER ;


#------------------------HORARIO-----------------------

#1 Prevenir doble reserva del lugar en la misma hora de un evento.

DELIMITER //
CREATE TRIGGER before_insert_horario_validacion
BEFORE INSERT ON horario
FOR EACH ROW
BEGIN
    IF EXISTS (
        SELECT 1 FROM horario
        WHERE lugar = NEW.lugar AND fecha = NEW.fecha AND hora = NEW.hora
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Ese lugar ya está reservado a esa hora.';
    END IF;
END;
//
DELIMITER ;

#2. Registrar una nueva creacion de horario
DELIMITER //
CREATE TRIGGER after_insert_horario_creado
AFTER INSERT ON horario
FOR EACH ROW
BEGIN
    INSERT INTO auditoria(tablaAfectada, operacion, descripcion)
    VALUES ('horario', 'INSERT', CONCAT('Nuevo horario creado en "', NEW.lugar, '" el ', NEW.fecha, ' a las ', NEW.hora));
END;
//
DELIMITER ;


#-------------------------------EVENTO-----------------------------------

#1. Poner tipo de evento por defecto. 
DELIMITER //
CREATE TRIGGER before_insert_evento_tipo
BEFORE INSERT ON evento
FOR EACH ROW
BEGIN
    IF NEW.tipoEvento IS NULL THEN
        SET NEW.tipoEvento = 'general';
    END IF;
END;
//
DELIMITER ;


#2. Cambios en tipo de evento y desccripcion del evento. 

DELIMITER //
CREATE TRIGGER after_update_evento_auditoria
AFTER UPDATE ON evento
FOR EACH ROW
BEGIN
    IF OLD.tipoEvento <> NEW.tipoEvento OR OLD.descripcionEvento <> NEW.descripcionEvento THEN
        INSERT INTO auditoria(tablaAfectada, operacion, descripcion)
        VALUES ('evento', 'UPDATE', CONCAT('Evento modificado. Tipo: "', NEW.tipoEvento, '", Descripción actualizada.'));
    END IF;
END;
//
DELIMITER ;
