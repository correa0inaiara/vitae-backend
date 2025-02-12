insert into usuarios (roleUsuario, email, senha) values 
('Administrador', 'admin@email.com', crypt('123456', gen_salt('bf')));