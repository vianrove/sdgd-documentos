create database if not exists GestionDocumental; 

use GestionDocumental;

create table Users(
	  id int(10) not null auto_increment,
      name varchar(20),
      lastName varchar(20) default null,
      email varchar(30)  not null,
      Password int(20)  not null,
      direccion varchar(40) default null,
      phoneNumber int(10) default null,
      suscrito bool default false,
      primary key (id)
);
create table documents(
	  ISBN int(10) not null auto_increment,
      Title varchar(20),
      muestra int(5) default null,
      venta int(5)  default null,
      precio int(6)  not null,      
      primary key (ISBN)
);
create table Ventas(
      No_Orden int(10) not null auto_increment,
      fk_id int,
      fk_ISBN int,
      primary key (No_Orden),
      foreign key (fk_id) references Users(id),
      foreign key (fk_ISBN) references documents(ISBN)
);
create table Alquiler(
      No_Orden int(10) not null auto_increment,  
      fecha datetime default null,
      fk_id int,
      fk_ISBN int,
      primary key (No_Orden),
      foreign key (fk_id) references Users(id),
      foreign key (fk_ISBN) references documents(ISBN)
);
create table tipo(
      identificador int(10) not null auto_increment,
      fk_ISBN int,
      typeDocument varchar(40),
      primary key (identificador),
      foreign key (fk_ISBN) references documents(ISBN)
);

describe Users;
describe documents;
describe Ventas;
describe Alquiler;
describe tipo;

insert into Users values (1,'user','Uno','example@mail.com',12345,'',302,true);
insert into Users values (0,'User','Dos','example@mail.com',12345,'',300,false);

insert into documents values (0,'Calculo vectorial', 200, 200, 50);
insert into documents values (0,'Ensayo academico', 5, 0, 5);

insert into tipo values (0,1,'libro de texto');
insert into tipo values (0,2,'Ensayo');
insert into tipo values (0,2,'trabajos academicos');


insert into Alquiler values (0,'2022-10-17',2,1);

select * from Users;
