create database Lynx;

USE Lynx;


create table usuario (
    idUsuario INT PRIMARY KEY, 
    tipoUsuario VARCHAR(40) NOT NULL UNIQUE
);


create table administrador(
	idAdministrador INT auto_increment primary key,
    claveAdmin varchar(50) NOT NULL,
    correoAdmin varchar(100) NOT NULL
);


create table deportista(
    idDeportista INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario int UNIQUE not null,
    nombreDeportista varchar(50) not null,
    posicionDeportista varchar(50),
    categoriaDeportista varchar(50),
    dorsalDeportista int,
    direccionDeportista varchar(50),
    edadDeportista int,
    hrDeportista varchar(50),
    estadoDeportista boolean,
    nombreAcudiente varchar(100),
    telefonoAcudiente int,
    correoAcudiente varchar(100),
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario) ON DELETE CASCADE ON UPDATE CASCADE
);

create table entrenador(
	idEntrenador int auto_increment primary key,
    idUsuario int UNIQUE not null,
	categoriaEntrenador varchar (40),
    epsEntrenador varchar(50),
    salarioEntrenador float,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE evento (
    idEvento int auto_increment primary key,
    tipoEvento varchar(50) NOT NULL,
    descripcionEvento TEXT NOT NULL,
    idHorario int,
    FOREIGN KEY (idHorario) REFERENCES Horario(idHorario) ON DELETE SET NULL ON UPDATE CASCADE
);


CREATE TABLE horario (
    idHorario int auto_increment primary key,
    fecha date NOT NULL,
    lugar varchar(100) NOT NULL
);

describe deportista;


insert into usuario values ("1", "Administrador"), ("2","Deportista"),
						   ("3", "Entrenador"), ("4", "Evento");




SELECT * FROM usuario;



insert into deportista values ("" , 2 , "Casas Porras Paula Daniela", "", "Juvenil", 1, "Calle 66 # 70 F - 13", 15, "", 0, "", "",""),
("" , 2 , "Natalia Cabana Enciso", "", "Juvenil", 2, "Calle 71B #77A-25", 15, "", 0, "", "",""),
("" , 2 , "María Fernanda Rodríguez", "", "Juvenil", 3, "Carrera 68G #64A-39", 14, "", 0, "", "",""),
("" , 2 , "Valerie Cruz Garcia", "", "Juvenil", 4, "Avenida calle 100 #64-51", 16, "", 0, "", "",""),
("" , 2 , "Ana Sofía Forero Berdugo", "", "Juvenil", 5, "Carrera 69h número 63a 37", 17, "", 0, "", "",""),
("" , 2 , "Juanita Rojas Salguero", "", "Juvenil", 6, "Cll 24d#43 a54", 16, "", 1 , "Blanca Liliana Salguero Urquijo", "3057456158",""),
("" , 2 , "Diana Valentina González Urrea", "", "Juvenil", 7, "Calle 63 B # 69-62", 15, "", 1, "Angélica Urrea", "3057089456",""),
("" , 2 , "Nikoll Gabriela Pajarito Gomez", "", "Juvenil", 8, "Calle 73a #69p-14", 14, "", 1, "Angelica Gomez", "3022007439",""),
("" , 2 , "Karolina Dolores Mederos Silveira", "", "Infantil", 9, "Calle 63D# 71-08", 10, "", 1, "Odelaysi Silveira Vaillant", "3143531532","");




select * from deportista