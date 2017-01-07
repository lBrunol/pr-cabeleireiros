$(function(){
    //Extensão do dropdown do menu para suportar um terceiro nível
    $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
        // Tira a âncora do link 
        event.preventDefault(); 
        // Evita que o evento se propague para os pais do elemento atual
        event.stopPropagation(); 
        // Adiciona as classes open no segundo nível
        $(this).parent().siblings().removeClass('open');
        $(this).parent().toggleClass('open');
    });
    
    /* Seleção única nas tabelas dentro dos modais */
    $('body').delegate('.unique-selection tbody tr', 'click', function () {
        $(this).siblings().removeClass('active-tr');
        $(this).addClass('active-tr');
    });
    
    /* Seleção múltipla nas tabelas dentro dos modais */
    $('body').delegate('.multi-selection tbody tr' , 'click' , function(){
        $(this).toggleClass('active-tr');
    });
    
});

/******************************FUNÇÕES*****************************/

/* Função para mostrar loader ajax em modais
 * 
 * @param {string} modal passar o nome do modal onde o loader está
 */
function showLoader(modal){
    document.getElementById(modal).querySelector('.loader-ajax').style.display = 'block';
    document.getElementById(modal).getElementsByTagName('table')[0].style.display = 'none';
}
/*Função para esconder o loader ajax em modais
 * 
 * @param {string} modal passar o nome do modal onde o loader está
 */
function hideLoader(modal){
    document.getElementById(modal).querySelector('.loader-ajax').style.display = 'none';
    document.getElementById(modal).getElementsByTagName('table')[0].style.display = 'table';
}

/* Função para calcular o valor total com base na quantidade e valor passados por parâmetro
* @param quant {int} passar a quantidade do item para ser calculado
* @param valor {float, int, double} passar o valor para o calculo do valor total
*/
function calculaValorTotal(quant, valor) {

    var valorTotal;

    valorTotal = valor * quant;
    console.log(valorTotal);
    if (!isNaN(valorTotal)) {
        console.log('teste');
        return valorTotal; 
    } else {
        return 0;
    }
}

function somaValoresTotais (el){
    var valorTotal = 0;
    $(el).find('.valor-total').each(function(){
        valorTotal = valorTotal + deRealParaFloat($(this).text());
    });
    
    return numeroParaMoeda(valorTotal);
}

/* Função que restringe a digitação para apenas números. Chamar a função em algum evento do teclado como keypress, keydown.
* @param e {event} 
*/
function apenasNumeros(e) {
    var tecla = e.keyCode ? e.keyCode : e.charCode
    if ((tecla > 47 && tecla < 58)) { // numeros de 0 a 9
        return true;
    } else {
        if (tecla != 8 && tecla != 9 && tecla != 44) { // backspace , // tab e // vírgula
            return false;
        } else {
            return true;
        }
    }
}

/* Valida se há texto inválido nos campos preenchidos através dos modais */
function validaTextoInvalido (el){
    if(typeof $(el).attr('data-id') == 'undefined'){
        $(el).val('');
        return;
    }
}  

/* Função que desativa a digitação no campo
* @param e {event} 
*/
function travaDigitacao(e) {    
    return false;       
}

/* Função que converte um número para o formato de moeda.
* @param num {float} 
*/
function numeroParaMoeda(num) {
    x = 0;

    num = num + "";
    num = num.replace(",", ".");

    if (num < 0) { num = Math.abs(num); x = 1; }

    if (isNaN(num)) num = "0";
    cents = Math.floor((num * 100 + 0.5) % 100);
    num = Math.floor((num * 100 + 0.5) / 100).toString();

    if (cents < 10) cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
        num = num.substring(0, num.length - (4 * i + 3)) + '.' + num.substring(num.length - (4 * i + 3));

    ret = num + ',' + cents;
    if (x == 1)
        ret = '-' + ret;

    ret = adicionaReal(ret);

    return ret;
}

/* Função que adiciona o R$ em um número passado por parâmetro
* @param num {float} 
*/
function adicionaReal(num) {
    num = "R$ " + num;
    return num;
}

/* Função que retira o R$ em um número passado por parâmetro
* @param num {String} 
*/
function retiraReal(num) {
    num = num.replace("R$ ", "");
    return num;
}

/* Função que substitui a virgula por ponto
* @param num {String} 
*/
function deVirgulaParaPonto(num) {
    num = num.replace(",", ".");
    return num;
}

/* Função converte de moeda para número
* @param num {float} 
*/
function moedaParaNumero(num) {
    num = num.replace(".", "");
    num = num.replace(",", ".");
    num = Number.parseFloat(num);
    return num;
}

function deRealParaFloat(num) {
    return moedaParaNumero(retiraReal(num));    
}
/* Função que atribui texto a um elemento passado por parâmetro
* @param el {object} elemento a ser alterado
* @param val {string} valor que será atribuido ao elemento
*/
function atribuiTexto (el, val){
    $(el).val(val);
}
/*
 * Função que seleciona um valor em um select de acordo com seu atributo "value"
 * @param valor {object} valor que será comparado aos values dos selects
 * @param element {object} elemento select que terá o valor selecionado
 * @param isString {boolean} verifica se o valor é uma string para que o value da função possa ser convertido para string evitando erros na comparação dos valores
 */
function selectValorDropdownList(valor, element, isString){
    var dd = document.getElementById(element);
    var opts = dd.options.length;
    var value = valor;
    if(typeof isString != 'undefined' && isString != false && isString != '' )
        value = value + '';
    for (var i=0; i<opts; i++){
        if (dd.options[i].value == value){
            dd.options[i].selected = true;
            break;
        }
    }
}
Array.prototype.removeValue = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === val) {
            this.splice(i, 1);
            i--;
        }
    }
    return this;
}