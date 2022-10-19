create database if not exists GestionDocumental; 

use GestionDocumental;

create table documents(
	  ISBN int(10) not null auto_increment,
      Title varchar(20),
      muestra int(5) default null,
      venta int(5)  default null,
      precio int(6)  not null,      
      primary key (ISBN)
);
create table tipo(
      identificador int(10) not null auto_increment,
      fk_ISBN int,
      typeDocument varchar(40),
      primary key (identificador),
      foreign key (fk_ISBN) references documents(ISBN)
);

describe documents;
describe tipo;

insert into documents values (0,'Calculo vectorial', 200, 200, 50);
insert into documents values (0,'Ensayo academico', 5, 0, 5);

insert into tipo values (0,1,'libro de texto');
insert into tipo values (0,2,'Ensayo');
insert into tipo values (0,2,'trabajos academicos');

select * from documents;

select documents.ISBN, documents.Title, tipo.TypeDocument  from documents, tipo 
where documents.ISBN = tipo.fk_ISBN;

alter table documents 
modify column Title varchar(50);

select  documents.ISBN, documents.Title, tipo.TypeDocument from documents, tipo where tipo.TypeDocument = 'Ensayo' and tipo.fk_ISBN = documents.ISBN;