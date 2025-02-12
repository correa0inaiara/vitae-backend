alter table processosSeletivos alter column etapasID set not null;
alter type tipoUsuarioENUM rename to roleENUM;
alter type roleENUM add value 'Administrador';
alter table usuarios alter column tipoUsuario type roleENUM;
alter table usuarios rename column tipoUsuario to roleUsuario;
drop table administrador;