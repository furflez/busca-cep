
# busca-cep
Api REST com nodejs utilizando typescript com funções de busca de endereço através do cep

---

 1. Tecnologias
 2. Arquitetura e Boas práticas
 3. Estratégia Utilizada
 4. Utilização
 5. Testes
 6. Considerações finais

# 1 - Tecnologias
Para o desenvolvimento utilizei algumas tecnologias que eu ja tenho o hábito de trabalhar e algumas novas que nunca havia trabalhado para conhecer e aprender mais a desenvolver projetos melhores.

Ferramentas previamente conhecidas:

 - **nodejs** 
 - **express** - módulo para criação das rotas e gerenciamento da API com REST
 - **express-validator** - módulo para cuidar das validações dos parametros enviados para a API
 - **typescript** - escrita de código mais consistente
 - **jest** - ferramenta para testes
 - **jest-junit** - módulo para criação de reports do jest
 - **jsonwebtoken** - módulo para criação e validação de tokens
 - **dotenv** - módulo para leitura das variáveis do arquivo .env 
 - **eslint** - verificador da qualidade de escrita do código
 - **husky** - ferramenta para realizar ações nos git hooks
 - **git** - versionamento de código
 - **github** - plataforma para envio dos códigos
 
Ferramentas novas utilizadas:
 
- **commitlint** - Ferramenta para avaliação da qualidade de escrita de commits
- **commitizen** - Ferramenta de linha de comando para auxiliar na padronização de commits
 - **supertest** - módulo para testes das rotas da API

# 2 - Arquitetura e boas práticas
Para a arquitetura busquei novas formas de estruturar uma API que ao mesmo tempo que fosse diferente do padrão que estou [acostumado a desenvolver](https://gitlab.com/furflez/print-movies-server) e que fosse um aprendizado para levar como estudo.
Com isso cheguei a conclusão de utilizar a arquitetura MVC, e para as boas práticas utilizei os princípios **SOLID**, do qual nunca havia aplicado e foi uma experiência desafiadora e divertida.
 
 # 3 - Estratégia utilizada

Iniciei o projeto preparando todas as ferramentas que eu desejava utilizar, começando por configurar o projeto para utilização do typescript, seguido das configurações das ferramentas de commit (husky, commitlint, commitizen), configuração do eslint e por fim o jest para os testes unitários.

Com o projeto configurado, após me certificar do funcionamento de uma simples api de retorno do cep que fosse exatamente igual ao passado, decidi partir para uma autenticação, pensando em um caso onde apenas usuários autorizados pudessem realizar tal consulta.

Com a lógica e rotas de autenticação de usuário retornando um token e validação do mesmo ai sim decidi partir para a criação da lógica que atingisse o objetivo principal:
> Eu, como usuário, quero informar meu CEP e obter o nome da minha RUA, BAIRRO, CIDADE e ESTADO para preencher meus dados de cadastro de forma automática.

Objetivos especificos:
 - Dado um CEP válido, deve retornar o endereço correspondente
 - Dado um CEP válido, que não exista o endereço, deve substituir um dígito da direita para a esquerda por zero até que o endereço seja localizado (Exemplo: Dado 22333999 tentar com 22333990, 22333900 …)
 - Dado um CEP inválido, deve retornar uma mensagem reportando o erro: "CEP inválido"

Para esta parte decidi fazer toda a verificação dentro de uma única função recursiva que em testes comparativos locais, se saiu melhor em desempenho do que uma função com estrutura de repetição.



````typescript
async  execute(addressDTO:  IFindAddressByZipcodeDTO):  Promise<Address> {
	const  zipcode  =  addressDTO.zipcode.padEnd(8, '0'); //adiciona zeros a direita a cada passagem até que zipcode tenha 8 digitos
	if (zipcode  !==  '00000000'  &&  addressDTO.zipcode.length  <=  8) { //verifica se for tudo zero, deve parar 
		const  address  =  await  this.addressRepository.findAddressByZipcode(zipcode); //faz a busca no repositório (mockAddressRepository) pelo cep.
		if (address) return  address; //se o endereço for encontrado, retorna para o usuário
		return  this.execute({ zipcode:  addressDTO.zipcode.substring(0, addressDTO.zipcode.length  -  1) }); //se não for encontrado, é removido o ultimo digito do cep e o .execute() é chamado novamente
	}
  
	throw  new  ResponseError('Invalid zipcode.'); //caso o cep seja completo de zeros ou não exista na base de dados, retorna um erro tratado pelo controller.
}
````
    FindAddressByZipcodeUseCase.ts:12~23

Com isso atingi o resultado esperado a partir do commit  [1ae24e5](https://github.com/furflez/busca-cep/commit/1ae24e5b0ac4153bf907e5431143659b6e19f3a1).

Após isso foram desenvolvidos os testes unitários de todas as principais funções da API para garantir a qualidade, são eles:

 - Rotas não tokenizadas
 - Rotas tokenizadas
 - Geração do token
 - Validação do token
 - Busca do cep

Dos extras:

- [x] preferencialmente use um versionador e faça commits granulares;
- [x] api com autorização;
- [x] boas práticas de design de api;
- [ ] swagger com a documentação;
- [x] tecnologias preferenciais: java ou node.js - justifique, no readme a escolha da tecnologia.

extas ++
- [ ] logs estruturados;
- [x] endpoint para saúde da aplicação;
- [ ] endpoint para métricas da aplicação;
- [x] considere a performance do algoritmo e o tempo de resposta da aplicação, sabendo que a API pode receber flutuações de tráfego agressivas. *

\* Tentei ao máximo garantir uma resposta rápida como comentado na parte da utilização da função recursiva.

# 4 - Utilização
A utilização do projeto é simples, precisando apenas do node e npm instalados na máquina.

Etapas:

 1. Clonar o repositório 
 2. Executar `npm install` dentro do diretório do projeto.
 3. Autenticar fazendo um `POST /authentication` passando no body:
```json
{
	"email":  "teste@teste.com.br",
	"password": "batatinhafrita123"
}
 ```
Ou qualquer coisa, desde que seja um e-mail valido e uma senha com pelo menos 5 digitos 

 4. solicitar um endereço fazendo um GET /address/:zipcode. I.E. `/address/88501440`

Para facilitar, adicionei um json ao projeto para importar no insomnia com todas as rotas testáveis. 
[insomnia-test.json](https://github.com/furflez/busca-cep/blob/main/insomnia-test.json)

# 5 - Testes
Os testes da mesma forma da utilização dependem apenas do node e npm instalados.

Etapas:
1. Clonar o repositório.
2. Executar `npm install` no diretório do projeto.
3. Executar `npm test` no diretório do projeto.

Um report do teste será gerado na raiz do projeto com junit para conferência e upload para possíveis integrações contínuas de ferramentas como o actions do github ou ci-cd do gitlab.

# 6 - Considerações Finais
Foi um projeto bem intenso não pela complexidade, mas pela minha disponibilidade de tempo livre para execução e equipamento, onde comecei desenvolvendo no netbook de 2013 da minha esposa, trechos escritos pelo próprio github no celular e por fim em um computador emprestado de um colega. Achei interessante mencionar essa trajetória porque foi realmente divertido! 🤣

Normalmente eu teria adicionado o código ao gitlab, onde tenho muito mais conhecimento das ferramentas de ci-cd, mas quis dar uma chance para o github o qual eu não tenho tanta afinidade.

Não achei tão interessante dedicar algum tempo no build do projeto, porém o babel está parcialmente configurado para utilização em algum deploy em container, testes em ci-cd, precisando apenas verificar os paths.

PS. Por uma preferencia pessoal escrevi todo o código e testes em inglês mas os commits em português para maior clareza.