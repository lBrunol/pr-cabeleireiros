
$(function(){

    responsiveImage();
    menuFixed();

    // Formulário de contato
    $('.wpcf7-form').on('DOMNodeInserted', function (e) {
        if ($(e.target).hasClass('wpcf7-not-valid-tip')) {
            $(e.target).addClass('help-block');
            $(e.target).parent().parent().addClass('has-error');
        }

        if ($(e.target).hasClass('wpcf7-mail-sent-ok'))
            $('.wpcf7-form .message').html('<div role="alert" class="alert alert-success text-center">' + $(e.target).text() + '</div>');

        if ($(e.target).hasClass('wpcf7-validation-errors'))
            $('.wpcf7-form .message').html('<div role="alert" class="alert alert-danger text-center">' + $(e.target).text() + '</div>');
    });

    $('.wpcf7-submit').on('click', function () {
        $('.wpcf7-form .alert').remove();
        $('.ajax-loader').attr('src', '/wp-content/themes/hcor/images/preloader-submit.gif');
        $('.wpcf7-form .form-group').removeClass('has-error');
    });
    
    // Mascaras
    $('.mask-telefone').mask('(99) 9999-9999?9', { placeholder: ' ' });
    $('.mask-cep').mask('99999-999', { placeholder: ' ' });

    $('.touch .top-item > .link').on('click', function(e){
        e.preventDefault();

        $(this).parent().siblings().find('.quick-submenu, .link').removeClass('js-actived');
        $(this).toggleClass('js-actived');
        $(this).parent().find('.quick-submenu').toggleClass('js-actived');
    });    

    //Toggle do rodapé
    $('.js-sitemap-toggle > .js-item > .link').on('click', function(e){
        if (!validaTela(768))
            e.preventDefault();

        $(this).toggleClass('js-actived').parent().find('.list-secondary').toggleClass('js-actived');
    });
    
    //Toggle do menu
    $('.nav-item > .link.-has-submenu').on('click', function(e){
        if((!validaTela(1304)) || (validaTela(1305) && $('html').hasClass('touch'))) {
            e.preventDefault();
            $(this).parent().siblings().find('.submenu-container, > .link.-has-submenu').removeClass('js-actived');
            $(this).stop().toggleClass('js-actived').parent().find('.submenu-container').stop().toggleClass('js-actived');
        }
    });

    //Toggle do menu de segundo nível
    $('.nav-submenu > .-first > .nav-link').on('click', function(e){
        if(!validaTela(1305)) {
            e.preventDefault();
            $(this).stop().toggleClass('js-actived').parent().children('ul').stop().toggleClass('js-actived');
        }
    });
    

    $('.nav-item > .link.-close').on('click', function(e){
        e.preventDefault();
        $('.main-navigation').removeClass('js-actived');
        $('body').removeClass('_overflow-hidden js-menu-active');
    });

    $('.navbar-control .navbar-toggle').on('click', function(){
        $('.main-navigation').addClass('js-actived');
        $('body').addClass('_overflow-hidden js-menu-active');
    });

    $('.search-box .input-button .button').on('click', function(e){
        e.preventDefault();
        var $input = $(this).closest('.search-box').children('.input');
        if(!validaTela(1335)) {
            if($input.hasClass('js-visible')) {
                if($input.val().trim().length > 0) {
                    alert('pesquisou por: ' + $input.val());
                } else {
                    $input.removeClass('js-visible');
                }
            } else {
                $input.addClass('js-visible');
            }
        } else {
            if($input.val().trim().length > 0)
                alert('pesquisou por: ' + $input.val());
        }
    });

    $('.main-banner').owlCarousel({
        items: 1,
        singleItem: true,
        navigation: true,
        navigationText: ['<span class="icon icon-left"></span>','<span class="icon icon-right"></span>'],
        pagination: true,
        autoHeight: true,
        beforeInit: function(){
            responsiveImage();
        }
    });

    $('.js-carousel-youtube').owlCarousel({

        itemsCustom: [
            [0, 1],
            [624, 2]
        ],
        pagination: true
    });

    $('.js-carousel-facebook').owlCarousel({        
        itemsCustom: [
            [0, 1],
            [624, 3]
        ],
        pagination: true
    });

    $('.js-carousel-unidades').owlCarousel({
        autoHeight: true,
        itemsCustom: [
            [0, 1],
            [1138, 2],
            [1319, 3]
        ],
        pagination: true
    });

    // Evento click
    $('.js-social').on('click', function (e) {
        e.preventDefault();
        social.share($(this).attr('data-social'));
    });

     //Aumentar/Diminuir o tamanho da fonte
    $('.js-font-increase').on('click', function(){
        var currentSize = parseInt($('html').css('font-size'));

        if(currentSize != 24){
            currentSize += 2;
            $('html').css('font-size', currentSize);
        }
    });

    $('.js-font-decrease').on('click', function(){
        var currentSize = parseInt($('html').css('font-size'));

        if(currentSize != 10){
            currentSize -= 2;
            $('html').css('font-size', currentSize);
        }
    });

    //Escala cinza na página
    $('.js-high-contrast').on('click', function(){
        $('body').toggleClass('-grayscale');
    });

    $('body').on('click', '.js-toggle-box .js-toggle-control', function(e){
        e.preventDefault();
    
        $(this).closest('.js-item-toggle').siblings('.js-item-toggle').find('.js-toggle-control, .js-toggle-content').removeClass('js-actived');
    
        if(!$(this).hasClass('js-actived'))
            $(this).addClass('js-actived').closest('.js-item-toggle').find('.js-toggle-content').addClass('js-visible');
        else
            $(this).removeClass('js-actived').closest('.js-item-toggle').find('.js-toggle-content').removeClass('js-visible');
    
    });

    $('.nav-internal .item:first-child > .link').on('click', function(){
        $(this).parent().siblings().toggleClass('js-active');
    });

    $('.news-site.-youtube > .link').on('click', function(e, current){
        e.preventDefault();
        var $self = current === undefined ? $(this) : current;
        var $iframe = $self.closest('.news-site.-youtube').find('.video.-youtube');

        $self.find('.icon').addClass('js-active');

        //Chama a função que instância a classe de vídeos do youtube e da play
        onYouTubeIframeAPIReady($iframe.attr('id'));

        setTimeout( function(){
            $self.addClass('js-hidden');
            $self.closest('.news-site.-youtube').find('.embed').addClass('js-visible');
        }, 500);
    });

    $('.news-site.-youtube .news-label .js-link').on('click', function(e){
        e.preventDefault();
        var $self = $(this).closest('.news-site.-youtube').find('> .link');

        if(!$self.hasClass('js-hidden'))
            $('.news-site.-youtube > .link').trigger('click', [$self]);
        
    });

    function onYouTubeIframeAPIReady(video) {
        new YT.Player(video, {
            events: {
                'onReady': playVideoYT,
            }
        });        
    }

    function playVideoYT(event) {
        event.target.playVideo();
    }
    
});

$(window).on('resize', function(){
    if(validaTela(1305)) $('body').removeClass('_overflow-hidden');
     responsiveImage();
});

$(window).on('scroll', function(){
    menuFixed();
});

/***************************************************************************************************************************************
****************************************                 FUNÇÕES                                  **************************************
****************************************************************************************************************************************/

/*
* verifica a posição do scroll para adicionar uma classe que fará a retração do menu quando o scroll for > 0.
 */
function menuFixed() {
    if ( $(window).scrollTop() > 0 )
        $('body').addClass('js-menu-fixed');
    else
        $('body').removeClass('js-menu-fixed');
}

/*
* Adiciona uma classe ao elemento html, indicando se o dispositvo é touch-screen.
 */
(function checkTouch() {
    if ("ontouchstart" in document.documentElement || (window.DocumentTouch && document instanceof DocumentTouch)) {
        document.documentElement.className += ' touch';
        isTouch = true;
    } else {
        document.documentElement.className += ' no-touch';
        isTouch = false;
    }
})();

/*
* Verifica a largura da tela.
* @param int valor que será comparado a largura do objeto window na função.
* @return boolean retorna true caso o parâmetro seja menor que a largura da tela e false caso contrário.
*/
function validaTela(largura) {return jQuery(window).width() >= largura;}

/*
* Troca a imagem dos elementos com a classe designada na chamada da função. A função identifica atributos.
* data (data-img-mobile, data-img-tablet, data-img-default) no elemento para trocar os "src" das imagens. 
* IMPORTANTE: passe o caminho completo da imagem no atributo data.
* @param String elemento(s) que terão as imagens trocadas. Caso a classe não seja definida, a função assume o padrão 'js-img-reponsive'.
*/
function responsiveImage(classe) {
    classe === undefined ? classe = '.js-img-responsive' : classe = classe;
    clearTimeout(time);

    var time = setTimeout(function () {
        $(classe).each(function () {
            mobile = validaTela('481');
            tabletL = validaTela('769');

            if($(this).data('img-mobile') != null && !mobile) {
                $(this).attr('src', $(this).data('img-mobile'));
            } else if ($(this).data('img-tablet') != null && !tabletL) {
                $(this).attr('src', $(this).data('img-tablet'));
            } else {
                $(this).attr('src', $(this).data('img-default'));
            }
        });
    }, 150);
}

/***************************************************************************************************************************************
***************************************                 PROTÓTIPOS                                  ************************************
****************************************************************************************************************************************/

/**
 * Corta uma string de acordo com o comprimento passado via parâmetro
 * @param int maxLength { default = 100} Comprimento máximo da string
 */
String.prototype.cropText = function(maxLength = 100) {

    var outStr = this;
    var lenghtSaida;

    if (outStr.length > maxLength && maxLength > 0) {
        outStr = outStr.substring(0, maxLength);
        lenghtSaida = outStr.length;
    } else {
        lenghtSaida = outStr.length - 1;
    }

    if (this.substring(lenghtSaida, 1) != " ") {
        var lastSpace = outStr.lastIndexOf(" ");
        
        if (lastSpace != -1) {
            outStr = outStr.substring(0, lastSpace);
        }
    }

    outStr += "...";

    return outStr;
}