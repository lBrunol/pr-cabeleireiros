$(function(){

    //Esta função faz com que o tamanho do background se adapte de acordo com o tamanho da tela;
    function tamanhoAutomatico () {
        var tamanhoTela = $(window).height();
        $("#principalManager").css("height",tamanhoTela+'px');
    }
    tamanhoAutomatico();

});