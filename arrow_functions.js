
//função nomeada
function digaOla(param){
    console.log('Olá');
}

//função anônima
var digaOla = function(){
    console.log('Olá');
}



//arrow function
var digaOla = () => console.log('Olá');


//arrow function com retorno imediato
var digaOla = () => 'Olá';

console.log(digaOla());

//arrow function com um parâmetro
var digaOla = nome => 'Olá ' + nome;

//arrow function com mais de um parâmetro
var digaOla = (nome, sobrenome) => 'Olá ' + nome + ' ' + sobrenome;

//arrow function com mais de um parâmetro e mais de uma linha de código
var digaOla = (nome, sobrenome) => {
    console.log('Olá ' + nome + ' ' + sobrenome);
    console.log('Tudo bem?');
}

//arrow function com mais de um parâmetro e mais de uma linha de código e retorno
var digaOla = (nome, sobrenome) => {
    console.log('Olá ' + nome + ' ' + sobrenome);
    console.log('Tudo bem?');
    return 'Olá ' + nome + ' ' + sobrenome;
}

// uso do this em arrow functions
class Pessoa{
    nome = 'Fulano';

    digaOla(){
        var that = this;
        setTimeout(function(){
            console.log('Olá de uma funcão normal ' + this.nome);
            console.log('Olá that ' + that.name )
        }, 100);
    }

    digaOlaArrow = () => {
        setTimeout(() => {
            console.log('Olá de arrow ' + this.nome);
        }, 100);
    }
}

let pessoa = new Pessoa();
pessoa.digaOla();
pessoa.digaOlaArrow();



