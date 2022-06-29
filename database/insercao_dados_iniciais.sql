insert into enderecos (
	cep, logradouro, complemento, numero, bairro, cidade, estado, pais
) values (
	'03253060', 'Rua Bet�nia', 'teste', 414, 'Vila Industrial', 'S�o Paulo', 'SP', 'Brasil'
);

insert into contatos (
	telefone, celular, email
) values (
	'1137132660', '11988055464', 'tesouraria@fernandoeisadoraalimentosltda.com.br'
);

insert into redesSociais (
	nomeDaRedeSocial, linkPerfilUsuario
) values (
	'', ''
);

insert into logins (
	email, senha
) values (
	'tesouraria@fernandoeisadoraalimentosltda.com.br', crypt('fernandoeisadoraalimentos', gen_salt('bf'))
);

insert into empresas (
	nomeDaEmpresa, cnpj, ramoDaEmpresa, numeroDeFuncionarios, 
	endereco, 
	contatos, 
	redesSociais, 
	login, 
	website
) values (
	'Fernando e Isadora Alimentos Ltda', '19473081000175', 'Ind�stria Aliment�cia', '2000',
	(select enderecoID from enderecos where enderecoID = 2),
	(select contatoID from contatos where contatoID = 1),
	(select redeSocialID from redesSociais where redeSocialID = 1),
	(select loginID from logins where loginID = 1),
	'www.fernandoeisadoraalimentosltda.com.br'
);