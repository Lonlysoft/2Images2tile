# O que é esse projeto?

esse foi um sub-projeto que eu por algum motivo fiz para fazer tilesets mais rápido.

palavras chave: criador de mapas, ferramentas para desenvolvimento de jogos 2D, tileset, matrizes bidimensionais.

# Imagens do Projeto

_[A serem adicionadas]_

O problema que já tinha sido resolvido para todo mundo, mas não para mim
-

um dos problemas que eu percebi enquanto eu fazia o Funky Pack era que muitas das minhas tilesets que eu queria fazer iriam demorar para ficarem prontas se eu quisesse fazer digitando numero por número. Então veio a ideia de fazer um programa que criasse esses tilesets de forma mais automática a partir de algo que eu tenho mais controle. Como Imagens.

Por que eu fiz isso ao invés de usar o tiled ou qualquer outro app/software que monta os tilesets de uma forma normal?
-

A Resposta é bem mais simples: Eu não tenho como fazer isso no celular. O tiled não existe para celulares então exportar uma matiz se torna praticamente impossivel, sendo as únicas opições escrever manualmente ou programar o seu proprio projetinho pra automatizar as paradas.

# Histórico

Versão Grotesca pré-Magical Sewer.
-

Já na época do magical sewer eu percebi que não era muito legal escrever e digitar matrizes grandes número por número pra fazer um mapa de jogo. Logo eu criei um software com esse mesmo intuito. entretanto ele não tinha tanta lógica.

- cores não tinham que ser colocadas manualmente em um if else bastante longo e isso não eras nem um pouco automatizando.
- A matriz resultante era uma matriz de strings que tinham informações de tudo do jogo. isso dava limitações de quão alto as colisões poderiam ser.
- A forma de executar o programa também não era pra das melhores. você teria que ter acesso ao console e tinha que rodar o seguinte snippet de código lá:
```
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
```
 - essa gambiarra era chamada de ```hot_wiring.js``` e era de uma época que eu era burro e não sabia como resolver problemas de event listening no JS. A função era chamada na tag de script, mas nunca executada efetivamente. Obviamente isso foi feito devido a urgência de fazer uma gambiarra para continuar focado com o código do magical sewer, basicamente dizendo: isso não é um projeto principal.
 

versão 1.0 de hoje em dia
-

após eu focar no funky pack eu tava mais vacinado contra event listeners e decidi voltar para fazer o mapa de forma mais automatizada.
- agora o mapa era dividido em múltiplos tilesets com matrizes para colisão, gráficos, objetos de cenário, npcs, gatilhos e espaço de teleporte para outros mapas.
- por conta disso era necessário um sistema robusto que não dependesse de cores constantes, já que elas mudam de acordo com o contexto.
- essa preocupação me fez lembrar que as vezes no jogo eu utilizava numeros para tirar uma string de um array na posição do número e utilizar ela em um objeto.
- o metodo atual se baseia em pegar duas imagens e comparar os pixels da segunda com a primeira para gerar uma matriz. É quase como se fosse uma tabela hash só que sem a tabela e o hash.

Conclusão
-

É bem interessante perceber que o fato de ter só um celular e um tablet de 2016 me fez fazer um projeto que é simples e talvez até batido, mas bem útil para eu automatizar assets. mesmo que seja feito só pra mim.
