goEdit();
for(let i = 0; i < 80; i++){
	document.write("["+level[i]+"], ");
}


tweakColide();
openShadows();
for(let i = 0; i < 80; i++){
	document.write("["+colision[i]+"],");
}

goRelevo();
for(let i = 0; i < 80; i++){
	document.write(colision[i]+", \n");
}

/*
2023:
a colisao eh muito estranho, porque eu preciso botar as coisas no lugar certo
eu pensei em botar um sistema de cores mas deu errado, estou pensando em fazer alguma coisa com o valor da sombra, eu pensei em ao invés de botar uma sombra com um valor eu pegasse um valor auxiliar que fica transparente e que significa a width também. como se fosse uma colisão invisível.
*/

/* 
EDIT 2025: O sistema de cores era uma outra coisa bastante diferente do que é hoje, n se engane. Eu pensava em fazer tudo ser uma matriz de strings que guardaria tanto colisões, multiplos graficos, posições de NPCs, objetos e ítens. O que é quase impensável hoje em dia. demoraria mais tempo pra programar o leitor desse tipo de string absurda e seria bem limitado.
*/


