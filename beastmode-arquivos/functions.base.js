/**
 * Funções base
 * @author Carlos Vinicius
 * @version 2.2
 * @date 2011-03-26
 */
// if(typeof(jQ)==="undefined") var jQ=$(document);
// if("function"!==typeof(String.prototype.trim)) String.prototype.trim=function(){ return this.replace(/^\s+|\s+$/g,""); };
// if("function"!==typeof(String.prototype.replaceSpecialChars)) String.prototype.replaceSpecialChars=function(){var _replace={"ç":"c","æ":"ae","œ":"oe","á":"a","é":"e","í":"i","ó":"o","ú":"u","à":"a","è":"e","ì":"i","ò":"o","ù":"u","ä":"a","ë":"e","ï":"i","ö":"o","ü":"u","ÿ":"y","â":"a","ê":"e","î":"i","ô":"o","û":"u","å":"a","ã":"a","ø":"o","õ":"o","u":"u","Á":"A","É":"E","Í":"I","Ó":"O","Ú":"U","Ê":"E","Ô":"O","Ü":"U","Ã":"A","Õ":"O","À":"A","Ç":"C"};return this.replace(/[à-ú]/g,function(a){if(typeof(_replace[a])!="undefined") return _replace[a]; return a;});};
// if("object"===typeof(console)) console.log("base v 01");
var Common = {
  init: function (b) {
    Common.selectMenu(b);
    Common.jsLoaded(b);
    Common.menu(b);
  },
  ajaxStop: function (b) {
    // Ajax Stop
  },
  windowOnload: function (b) {
    // Window Onload
  },
  jsLoaded: function (b) {
    b.addClass('jsFullLoaded');
  },
  selectMenu: function (b) {
    b.find(".headerWrapper  .searchWrapper select").selectmenu();
  },
  menu: function (b) {
    var menu = b.find('.navTopDepartament .menu-departamento'),
      menu_ul = jQuery('<ul class="menu_ul clearfix"/>'),
      menu_h3 = menu.find('h3');
    menu_h3.each(function () {
      var h3 = jQuery(this);
      var uls = h3.next('ul');
      var menu_li = $('<li/>');
      menu_li.append(h3, uls);
      menu_ul.append(menu_li);
      if (h3.next().length > 0) h3.addClass("hasSubMenu");
    });
    menu.append(menu_ul);
    menu_ul.find('ul').css({
      'display': 'none',
      'left': '-9999em'
    });
    menu_ul.find('li').hover(function () {
      var $this = jQuery(this),
        ul = $this.find('ul');
      if (ul.children().length > 0)
        $this.find('h3').addClass('active');
      ul.css('left', '0').stop(true, true).fadeIn(300);
    }, function () {
      var $this = jQuery(this)
      $this.find('h3').removeClass('active');
      $this.find('ul').stop(true, true).fadeOut(300);
    });
    menu_ul.find(">li:last").addClass("last");
  }
};
var Home = {
  init: function (b) {
    Home.carousel(b);
    Home.disclaimer(b);
    Home.marcas(b);
    Home.qdNewsLetter(b);
  },
  ajaxStop: function (b) {
    // Ajax Stop
  },
  windowOnload: function (b) {
    // Window Onload
  },
  marcas: function (b) {
    b.find("#vitrine_marca ul.marcas").jcarousel({
      wrap: 'circular',
      auto: 5
    });
  },
  carousel: function (b) {
    b.find("#maisvistos  ul").jcarousel({
      wrap: 'circular'
    });
  },
  disclaimer: function (b) {
    b.find('.BannerTitulo').after('<a id="prev" href="#">Prev</a><a id="next" href="#">Next</a>');

    b.find('.centralBanners').before('<div id="nav">').cycle({
      fx: 'fade',
      speed: 1700,
      timeout: 100,
      pause: true,
      next: '#next',
      prev: '#prev',
      pager: '#nav'
    });
  },
  qdNewsLetter: function(b) {
      var modal = $(".qd-v1-modal");
      var html = $('<div class="content-news"> <form novalidate="1"> <div class="qd_news"> <div class="row form-row"> <input type="text" name="name" class="qd_news_name input-type-text-ghost form-control" /> <input type="text" name="email" class="qd_news_email input-type-text-ghost form-control" /> </div> <div class="row form-row"> <button class="qd_news_button">Enviar</button> <a href="/politica-de-privacidade" style="display: none;" class="link-politica-privacidade-modal">Politica de privacidade</a> </div> </div> <span class="content-close"> <i class="btn-close ico-close" data-dismiss="modal"></i> </span> </form> </div>');
      var inputSuccess = $('<div class="row form-row"><input type="text" name="name" class="qd_success input-type-text-ghost form-control" /></div>');

      modal.on("hidden.bs.modal", function(){
        modal.removeClass("qd-v1-newsletter-modal");
        html.trigger("QuatroDigital.cf_close");
        $(document.body).removeClass('modal-open');
      });

      html.QD_cookieFn({
        cookieName: "newsletter",
        close: "",
        expireDays: 7,
        show: function($elem){
          modal.find(".modal-body").empty().append(html);
          modal.addClass("qd-v1-newsletter-modal");
          modal.modal();
          $(document.body).addClass('modal-open');

          html.QD_news({
            defaultEmail: "Digite seu e-mail",
            checkNameFieldIsVisible: false,
            successCallback: function (e) {
              $(".qd-v1-newsletter-modal").addClass("qd-v1-newsletter-modal-finish");

              try {
                lc.sendData({
                  evento: "Cadastro Cliente Newslleter",
                  nm_email: e.postData.newsletterClientEmail,
                  vars: {},
                  lista: {
                    nm_lista: "Newsletter_do_site",
                  }
                });
              }
              catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas no GTM :( . Detalhes: " + e.message)); }
            }
          });

        },
        hide: function($elem){}
      });
  }
};
var Departament = {
  init: function (b) {
    // Init
  },
  ajaxStop: function (b) {
    // Ajax Stop
  },
  windowOnload: function (b) {
    // Window Onload
  }
};
var Search = {
  init: function (b) {
    // Init
  },
  ajaxStop: function (b) {
    // Ajax Stop
  },
  windowOnload: function (b) {
    // Window Onload
  }
};
var Product = {
  init: function (b) {
    Product.carousel(b);
    Product.carousel2(b);
    Product.carousel3(b);
    Product.compreJunto();
    Product.load.giftlist();
  },
  ajaxStop: function (b) {
    // Ajax Stop
  },
  windowOnload: function (b) {
    // Window Onload
  },
  carousel2: function (b) {
    var b = $('body');
    if (b.find("#similares .prateleira  ul li").length > 4) {
      b.find("#similares .prateleira ul").jcarousel(
      );
    }
  },
  carousel: function (b) {
    var b = $('body');
    if (b.find("#ProdutosRelacionados .prateleira  ul li").length > 4) {
      b.find("#ProdutosRelacionados  .prateleira ul").jcarousel();
    } else if (b.find("#ProdutosRelacionados  .prateleira").length < 1) {
      b.find("#ProdutosRelacionados").css('display', 'none');
    }
  },
  load: {
    giftlist: function () {
      var set_gift_button = function () {
        jQuery('a.add2list').show().vtex_giftlist({
          form: false,
          login: "Para adicionar um produto a lista de casamento é necessário estar logado.<br/>Clique aqui para fazer o login.",
          title: "Lista de casamento"
        });
      };
      if (typeof jQuery.fn.vtex_giftlist == "undefined")
        jQuery.getScript("/arquivos/vtex_giftlist.js", function () {
          set_gift_button();
        });
      else
        set_gift_button();
    }
  },
  compreJunto: function () {
    if ($('#CompreJunto .buy-together-content table').length < 1) {
      $('#CompreJunto').hide();
    }
  },
  carousel3: function (b) {
    var b = $('body');
    if (b.find("#ComprouTambem  .prateleira  ul li").length > 4) {
      b.find("#ComprouTambem   .prateleira ul").jcarousel(
      );
    } else if (b.find("#ComprouTambem  .prateleira").length < 1) {
      b.find("#ComprouTambem").css('display', 'none');
    }
  }
};
var List = {
  init: function (b) {
    // Init
    List.giftlisttype();
    List.resultList();
    List.newGiftList();
  },
  ajaxStop: function (b) {
    List.newGiftListAjax();
    List.validador();
  },
  windowOnload: function (b) {
    // Window Onload
  },
  giftlisttype: function () {
    $('ul.giftlistul li.giftlisttype').find('#giftlisttype option:eq(2)').remove();
  },
  resultList: function () {
    if ($('.giftlistsearch-result').length > 0)
      $('.giftlistsearch-result').insertAfter('.columnRight');
  },
  newGiftList: function () {
    if ($("body").hasClass("GiftList")) {
      if ($(".giftlistmessage").length)
        $(".giftlistmessage").insertAfter(".giftlisteventcity ");
      if ($('.giftlistinfo-message').length)
        $('.giftlistinfo-message').appendTo('.giftlistinfo-image');
      if ($('.giftlistinfo-message').length)
        $('.giftlistinfo-message').appendTo('.giftlistinfo-image');
    }
  },
  newGiftListAjax: function () {
    if ($("body").hasClass("GiftList")) {
      if ($(".giftlistproductsv2").length) {
        var tb = $('.giftlistproductsv2');
        var th = tb.find('th');
        var td;
        th.eq(6).insertBefore(th.eq(0));
        tb.find('tr').each(function () {
          td = $(this).find('td');
          td.eq(6).insertBefore(td.eq(0));
        });
      }
    }
    if ($(".titLista").length == 0) {
      $('.members-box').prepend('<h4 class="titLista"><span>Noivos</span></h4>');
      $('.address').prepend('<h4 class="titLista"><span>Endereço de Entrega</span></h4>');
      $('.therms-area').prepend('<h4 class="titLista"><span>Termos de uso das listas</span></h4>');
    }
  },
  validador: function () {
    $('input#giftlistsearchfind').click(function () {
      var name, lastname, location, date, carregando;
      cod = $('#giftlistsearchid').val().length;
      name = $('#giftlistsearchname').val().length;
      lastname = $('#giftlistsearchsurname').val().length;
      location = $('#giftlistsearcheventlocation').val().length;
      date = $('#giftlistsearcheventdate').val().length;
      city = $('#giftlistsearcheventcity').val().length;
      carregando = "<h1>Carregando lista de noivos... Aguarde...</h1>";
      if (cod == 0 && name == 0 && lastname == 0 && location == 0 && date == 0) {
        alert("Favor preencher ao menos um dos campos do filtro.");
        $("#giftlistsearchname").focus();
        return false;
      } else {
        $('body,html').animate({
          scrollTop: 290
        }, 800);
        $(".glsearch-result").html(carregando);
      }
    });
  }
};
var Institutional = {
  init: function (b) {},
  ajaxStop: function (b) {},
  windowOnload: function (b) {}
};
var _body_ = null;
$(function () {
  _body_ = $("body");
  Common.init(_body_);
  if (_body_.filter(".home").length > 0) Home.init(_body_);
  else if (_body_.filter(".departamento, .categoria").length > 0) Departament.init(_body_);
  else if (_body_.filter(".resultado-busca").length > 0) Search.init(_body_);
  else if (_body_.filter(".produto").length > 0) Product.init(_body_);
  else if (_body_.filter(".listas").length > 0) List.init(_body_);
  else if (_body_.filter(".institucional").length > 0) Institutional.init(_body_);
  Common.jsLoaded(_body_);
});
$(document).ajaxStop(function () {
  Common.ajaxStop(_body_);
  if (_body_.filter(".home").length > 0) Home.ajaxStop(_body_);
  else if (_body_.filter(".departamento, .categoria").length > 0) Departament.ajaxStop(_body_);
  else if (_body_.filter(".resultado-busca").length > 0) Search.ajaxStop(_body_);
  else if (_body_.filter(".produto").length > 0) Product.ajaxStop(_body_);
  else if (_body_.filter(".listas").length > 0) List.ajaxStop(_body_);
  else if (_body_.filter(".institucional").length > 0) Institutional.ajaxStop(_body_);
});
$(window).load(function () {
  Common.windowOnload(_body_);
  if (_body_.filter(".home").length > 0) Home.windowOnload(_body_);
  else if (_body_.filter(".departamento, .categoria").length > 0) Departament.windowOnload(_body_);
  else if (_body_.filter(".resultado-busca").length > 0) Search.windowOnload(_body_);
  else if (_body_.filter(".produto").length > 0) Product.windowOnload(_body_);
  else if (_body_.filter(".listas").length > 0) List.windowOnload(_body_);
  else if (_body_.filter(".institucional").length > 0) Institutional.windowOnload(_body_);
});

/* $("a").getParent("ul"); // 2.0 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT */
(function(b){b.fn.getParent=function(c){var a;a=b(this);if(1>a.length)return a;a=a.parent();return a.is("html")?b(""):a.is(c)?a.filter(c):a.length?a.getParent(c):a}})(jQuery);
/*! * Javascript Cookie v1.5.1 * https://github.com/js-cookie/js-cookie * * Copyright 2006, 2014 Klaus Hartl * Released under the MIT license */
(function(e){var l;if("function"===typeof define&&define.amd)define(["jquery"],e);else if("object"===typeof exports){try{l=require("jquery")}catch(n){}module.exports=e(l)}else{var m=window.Cookies,h=window.Cookies=e(window.jQuery);h.noConflict=function(){window.Cookies=m;return h}}})(function(e){function l(a){a=c.json?JSON.stringify(a):String(a);return c.raw?a:encodeURIComponent(a)}function n(a,r){var b;if(c.raw)b=a;else a:{var d=a;0===d.indexOf('"')&&(d=d.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g, "\\"));try{d=decodeURIComponent(d.replace(p," "));b=c.json?JSON.parse(d):d;break a}catch(e){}b=void 0}return h(r)?r(b):b}function m(){for(var a,c,b=0,d={};b<arguments.length;b++)for(a in c=arguments[b],c)d[a]=c[a];return d}function h(a){return"[object Function]"===Object.prototype.toString.call(a)}var p=/\+/g,c=function(a,e,b){if(1<arguments.length&&!h(e)){b=m(c.defaults,b);if("number"===typeof b.expires){var d=b.expires,k=b.expires=new Date;k.setMilliseconds(k.getMilliseconds()+864E5*d)}return document.cookie= [c.raw?a:encodeURIComponent(a),"=",l(e),b.expires?"; expires="+b.expires.toUTCString():"",b.path?"; path="+b.path:"",b.domain?"; domain="+b.domain:"",b.secure?"; secure":""].join("")}for(var d=a?void 0:{},k=document.cookie?document.cookie.split("; "):[],q=0,p=k.length;q<p;q++){var f=k[q].split("="),g;g=f.shift();g=c.raw?g:decodeURIComponent(g);f=f.join("=");if(a===g){d=n(f,e);break}a||void 0===(f=n(f))||(d[g]=f)}return d};c.get=c.set=c;c.defaults={};c.remove=function(a,e){c(a,"",m(e,{expires:-1})); return!c(a)};e&&(e.cookie=c,e.removeCookie=c.remove);return c});
var $Cookies = Cookies.noConflict();
/* Quatro Digital Cookie Functions // 1.4 // Carlos Vinicius // Todos os direitos reservados */
(function(){var a,h,g;a=jQuery;g={cookieName:"Nome_Padrao",closeLimit:2,expireDays:365,completeExpireDays:365,path:"/",close:"[class*=close]",show:function(a){a.slideDown()},hide:function(a){a.slideUp()},callback:function(){},exceededLimitCallback:function(){},closeCallback:function(){}};var k=function(a,c){if("object"===typeof console){var e;"object"===typeof a?(a.unshift("[Cookie Functions]\n"),e=a):e=["[Cookie Functions]\n"+a];"undefined"===typeof c||"alerta"!==c.toLowerCase()&&"aviso"!==c.toLowerCase()?
"undefined"!==typeof c&&"info"===c.toLowerCase()?console.info.apply(console,e):console.error.apply(console,e):console.warn.apply(console,e)}};a.QD_cookieFn=function(f){if("function"!==typeof a.cookie)return k("Aeeeee irm\u00e3\u00e3\u00e3ooooo!\nEsta faltando o plugin $.cookie mew. Chama ele na p\u00e1gina, vlw!");var c=function(d,b){var c=a.cookie("qdCookieFn_"+b.cookieName);if("undefined"!==typeof c&&c>=b.closeLimit||a.cookie("qdCookieFn_"+b.cookieName+"_complete"))return b.exceededLimitCallback();
b.show(d);d.trigger("QuatroDigital.cf_show");a(window).on("qdNewsSuccessCallback",function(a,c){d.trigger("QuatroDigital.qdcf_applyComplete");b.show(d);d.trigger("QuatroDigital.cf_hide")});b.callback();d.trigger("QuatroDigital.cf_callback")},e=function(a,b){a.find(b.close).not(".qd-cookie-on").addClass("qd-cookie-on").bind("click",function(){a.trigger("QuatroDigital.cf_close");a.slideUp(function(){b.closeCallback()})})},g=function(c,b){c.bind("QuatroDigital.cf_close",function(){"undefined"===typeof a.cookie("qdCookieFn_"+
b.cookieName)?a.cookie("qdCookieFn_"+b.cookieName,1,{expires:b.expireDays,path:b.path}):a.cookie("qdCookieFn_"+b.cookieName,(parseInt(a.cookie("qdCookieFn_"+b.cookieName),10)||0)+1,{expires:b.expireDays,path:b.path})});c.bind("QuatroDigital.qdcf_applyComplete",function(){a.cookie("qdCookieFn_"+b.cookieName+"_complete",1,{expires:b.completeExpireDays,path:b.path})});c.bind("QuatroDigital.qdcf_applyLimit",function(){a.cookie("qdCookieFn_"+b.cookieName,b.closeLimit,{expires:b.expireDays,path:b.path})})};
f.each(function(){var d=a(this),b;try{if(b=d.attr("data-qd-cookie"))var f=a.parseJSON("{"+b+"}")}catch(l){k(['Aeee irm\u00e3ooo!\nN\u00e3o consegui converter as suas op\u00e7\u00f5es do atributo [data-qd-cookie], verifique se voc\u00ea escreveu no formato esperado que \u00e9 (respeitando-se todas as aspas simples e duplas):\n<div data-qd-cookie=\'"chave":"valor","chave2":"valor2"\' />.',"\n\nDetalhes do erro: "+l.message],"alerta"),f={}}b=a.extend({},h,f);g(d,b);c(d,b);e(d,b)})};a.fn.QD_cookieFn=
function(f){var c=a(this);h=a.extend(!0,{},g,f);c.QD_cookieFn=new a.QD_cookieFn(c);return c};a(function(){a("[data-qd-cookie]").QD_cookieFn()})})();
/* Newslleter customizada para a plataforma VTEX // 5 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os Direitos Reservados */
(function(){var f=jQuery;if("function"!==typeof f.fn.QD_news){var t={defaultName:"Digite seu nome...",defaultEmail:"Digite seu e-mail...",nameField:".qd_news_name",checkNameFieldIsVisible:!0,emailField:".qd_news_email",btn:".qd_news_button",elementError:".nv2_messageError",elementSuccess:".nv2_messageSuccess",validationMethod:"popup",getAttr:"alt",setDefaultName:!0,checkNameExist:!0,validateName:!0,showInPopup:!0,animation:"blink",animateSpeed:100,animateDistance:15,animateRepeat:3,animateFieldSuccess:".qd_news_animate_field_success",
timeHideSuccessMsg:3E3,platform:"VTEX",allowSubmit:function(){return!0},successCallback:function(){},submitCallback:function(f,l){}};f.fn.QD_news=function(r){var l=function(a,d){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var g;"object"===typeof a?(a.unshift("[QD News]\n"),g=a):g=["[QD News]\n"+a];if("undefined"===typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===
d.toLowerCase())try{console.info.apply(console,g)}catch(b){console.info(g.join("\n"))}else try{console.error.apply(console,g)}catch(f){console.error(g.join("\n"))}else try{console.warn.apply(console,g)}catch(e){console.warn(g.join("\n"))}}},h=f(this);if(!h.length)return h;var a=f.extend({},t,r);a.showInPopup||(a.validationMethod="div");null!==a.animation?a.validationMethod="animateField":"animateField"==a.validationMethod&&(a.animation="leftRight");if("popup"==a.validationMethod&&"function"!==typeof f.fn.vtexPopUp2)return l("O popUp2 n\u00e3o foi encontrado. Adicione o Plugin de PopUp2."),
h;var q=function(f){var d,g,b;g=0;d=function(){f.animate({left:"-="+a.animateDistance},a.animateSpeed,function(){f.animate({left:"+="+a.animateDistance},a.animateSpeed,function(){g<a.animateRepeat&&d();g++})})};b=function(){f.fadeTo(a.animateSpeed,.2,function(){f.fadeTo(a.animateSpeed,1,function(){g<a.animateRepeat&&b();g++})})};f.stop(!0,!0);"leftRight"==a.animation?d():"blink"==a.animation&&b()};h.each(function(){var h,d,g,b=f(this),k=b.find(a.nameField),e=b.find(a.emailField),m=b.find(a.btn);"animateField"!=
a.validationMethod&&(d=b.find(a.elementError),g=b.find(a.elementSuccess));1>k.length&&a.checkNameExist&&l("Campo de nome, n\u00e3o encontrado ("+k.selector+"). Ser\u00e1 atribuido um valor padr\u00e3o.","info");if(1>e.length)return l("Campo de e-mail, n\u00e3o encontrado ("+e.selector+")"),b;if(1>m.length)return l("Bot\u00e3o de envio, n\u00e3o encontrado ("+m.selector+")"),b;if("animateField"!=a.validationMethod&&(1>g.length||1>d.length))return l("A(s) mensagem(ns) de erro e/ou sucesso esta(m) faltando \n ("+
g.selector+", "+d.selector+")"),b;a.setDefaultName&&k.is("input[type=text], textarea")&&k.val(a.defaultName);e.val(a.defaultEmail);(function(){if(a.checkNameExist){if(a.checkNameFieldIsVisible){var c=k.filter(":visible");if(!c.length)return}else c=k;var b=c.val();c.is("input:text, textarea")&&c.bind({focus:function(){c.val()!=b||0!==c.val().search(a.defaultName.substr(0,6))&&!a.setDefaultName||c.val("")},blur:function(){""===c.val()&&c.val(b)}})}})();(function(){var c;c=e.val();e.bind({focus:function(){e.val()==
c&&0===e.val().search(a.defaultEmail.substr(0,6))&&e.val("")},blur:function(){""===e.val()&&e.val(c)}})})();h=function(){var c,e,h,k;e=(c=b.find(a.nameField).filter("input[type=text],select,textarea").val())?c:b.find(a.nameField).filter("input[type=radio], input[type=checkbox]").length?b.find(a.nameField).filter("input[type=radio]:checked, input[type=checkbox]:checked").val()||"":(c=b.find(a.nameField).attr(a.getAttr))?c:(c=b.find(a.nameField).text())?c:(c=b.find(a.nameField).find(".box-banner img:first").attr("alt"))?
c:"Nome_Padrao";c=(b.find(a.emailField).val()||"").trim();h=b.find(a.nameField).is(":visible");h=a.validateName?(1>e.length||0===e.search(a.defaultName.substr(0,6)))&&(a.checkNameExist||h?h:!0):!1;k=0>c.search(/^[a-z0-9\_\-\.\+]+@[a-z0-9\_\-]+(\.[a-z0-9\_\-]{2,})+$/i);if(h||k)"animateField"==a.validationMethod?(h&&q(b.find(a.nameField)),k&&q(b.find(a.emailField))):"popup"==a.validationMethod?d.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterError"}):(d.slideDown().bind("click",function(){f(this).slideUp()}),
setTimeout(function(){d.slideUp()},1800));else if(a.allowSubmit()){m.attr("disabled","disabled");var n={postData:{newsletterClientEmail:c,newsletterClientName:a.defaultName==e?"-":e,newsInternalCampaign:"newsletter:opt-in",newsInternalPage:(document.location.pathname||"/").replace(/\//g,"_"),newsInternalPart:"newsletter"},button:m,wrapper:b};"linx"===a.platform&&(n.postData.nome=n.postData.newsletterClientName,n.postData.email=n.postData.newsletterClientEmail);f.ajax({url:"linx"===a.platform?"/newsletter.aspx":
"/no-cache/Newsletter.aspx",type:"linx"===a.platform?"GET":"POST",data:n.postData,success:function(c){var e,h,d;m.removeAttr("disabled");if("linx"===a.platform&&!(-1<c.indexOf(" com sucesso.")||-1<c.indexOf(" cadastrado.")))return alert(c);"popup"==a.validationMethod?g.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterSuccess"}):"animateField"!=a.validationMethod&&g.slideDown().bind("click",function(){f(this).slideUp()});d=b.find(a.emailField);a.setDefaultName&&b.find(a.nameField).is("input:text, textarea")&&
b.find(a.nameField).val(a.defaultName);e=function(){d.val(a.defaultEmail)};"animateField"==a.validationMethod?(d.val(b.find(a.animateFieldSuccess).val()||"Obrigado!!!"),d.addClass("vtexNewsSuccess"),h=setTimeout(function(){d.removeClass("vtexNewsSuccess");e();d.unbind("focus.vtexNews")},a.timeHideSuccessMsg),d.bind("focus.vtexNews",function(){d.removeClass("vtexNewsSuccess");clearTimeout(h);f(this).val("");f(this).unbind("focus.vtexNews")})):e();a.successCallback(n);f(window).trigger("qdNewsSuccessCallback",
n)}});a.submitCallback(c,e)}else l("Os dados n\u00e3o foram enviados pois o parametro 'allowSubmit' n\u00e3o retornou 'true'","info")};var p=function(a){13==(a.keyCode?a.keyCode:a.which)&&(a.preventDefault(),h())};k.filter("input:text, textarea").bind("keydown",p);e.bind("keydown",p);p=m.getParent("form");p.length?p.submit(function(a){a.preventDefault();h()}):m.bind("click.qd_news",function(){h()})});return h};f(function(){f(".qd_news_auto").QD_news()})}})();
