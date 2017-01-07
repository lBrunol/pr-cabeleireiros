$(function () {
    $('.table-site.-selectable tbody tr').on('click', function () {

        var $tableMaster = $(this).closest('.table-site.-selectable');
        var isMultiSelectable = $tableMaster.hasClass('-multiselectable');
        var $checkbox = $(this).find('.custom-checkbox input[type="checkbox"]');
        var isChecked = $checkbox.prop('checked');

        if (!isMultiSelectable) {
            $tableMaster.find('tbody .custom-checkbox input[type="checkbox"]').prop('checked', false);
        }

        if (isChecked) {
            $checkbox.prop('checked', false);
        } else {
            $checkbox.prop('checked', true);
        }
    });

    /* Delega o evento click ao adicionar itens do pedido */
    $('body').on('click', '.delete-row', function () {

        //Remove o código atual do array de controle dos produtos
        //lstCodigosProdutos.splice(lstCodigosProdutos.indexOf(parseInt($(this).parent().siblings().eq(0).text()), 0));

        //Remove a linha atual
        $(this).parent().parent().remove();

        //Caso a linha com valores de produtos seja a última, ele mostra a linha de adiciona itens
        if ($('.table-services tbody tr').length <= 1) {
            $('.table-services .no-items').show();
        }

        $('.total-bruto .value').text(somaValoresTotais($('.table-services')));
    });

    $('body').delegate('.modal-services .btn-add', 'click', function () {
        var $modal = $(this).closest('.modal-services');
        var $activeCheckbox = $modal.find('input[type="checkbox"]:checked');


        if ($activeCheckbox.length > 0) {

            $activeCheckbox.each(function (index) {
                var $row = $(this).closest('tr');

                $('.table-services tbody').append('<tr></tr>');
                $('.table-services tbody tr:last-child').append('<td>' + $row.find('td').eq(0).text() + '</td><td>' + $row.find('td').eq(1).text() + '</td><td>' + $row.find('td').eq(2).text() + '</td><td><input type="text" class="form-control" onkeypress="return(apenasNumeros(event))" onblur="atribuiTexto($(this),numeroParaMoeda($(this).val()))" /></td>' + '</td><td><input type="text" class="form-control" onkeypress="return(apenasNumeros(event))" /></td><td>Carlos da Silva</td><td><button class="btn btn-danger btn-sm delete-row"><span class="icon-trash-empty"></span> Excluir</button></td>');
                $('.total-bruto > .value').text(numeroParaMoeda(deRealParaFloat($('.total-bruto > .value').text()) + deRealParaFloat($row.find('td').eq(2).text())));
            });

            $('.table-services').find('.no-items').hide();

        }
    });

    $('body').on('click', '.modal-clients .btn-add', function () {

        var table;
        var $modal = $(this).closest('.modal-clients');
        var $activeCheckbox = $modal.find('input[type="checkbox"]:checked');
        var dataTarget = $(this).data('target');
        var value;

        if ($activeCheckbox.length > 0) {

            $activeCheckbox.each(function (index) {
                var $row = $(this).closest('tr');
                value = $row.find('.name-client').text();

            });
            $(dataTarget).val(value);
        }
    });

    /* Desmarca a classe active-tr ao sair do modal */
    $('.modal').on('hidden.bs.modal', function (e) {
        $(this).find('input[type="checkbox"]').prop('checked', false);
        $('.total-pedido > .value').text(numeroParaMoeda(deRealParaFloat($('.total-bruto > .value').text()) - deRealParaFloat($('.desconto-pedido > .value').text()) + deRealParaFloat($('.caixinha-pedido > .value').text())));
    });
});

/* Função para calcular o valor total com base na quantidade e valor passados por parâmetro
* @param quant {int} passar a quantidade do item para ser calculado
* @param valor {float, int, double} passar o valor para o calculo do valor total
*/
function calculaValorTotal(quant, valor) {

    var valorTotal;

    valorTotal = valor * quant;

    if (!isNaN(valorTotal)) {
        return valorTotal;
    } else {
        return 0;
    }
}

function somaValoresTotais(el) {

    var valorTotal = 0;

    $(el).find('.value').each(function () {
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
function validaTextoInvalido(el) {
    if (typeof $(el).attr('data-id') == 'undefined') {
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
    var x = 0;

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
function atribuiTexto(el, val) {
    $(el).val(val);
}