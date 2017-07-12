/**
* Funções base
*/
String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")});
"function"!==typeof String.prototype.replaceSpecialChars&&(String.prototype.replaceSpecialChars=function(){var b={"\u00e7":"c","\u00e6":"ae","\u0153":"oe","\u00e1":"a","\u00e9":"e","\u00ed":"i","\u00f3":"o","\u00fa":"u","\u00e0":"a","\u00e8":"e","\u00ec":"i","\u00f2":"o","\u00f9":"u","\u00e4":"a","\u00eb":"e","\u00ef":"i","\u00f6":"o","\u00fc":"u","\u00ff":"y","\u00e2":"a","\u00ea":"e","\u00ee":"i","\u00f4":"o","\u00fb":"u","\u00e5":"a","\u00e3":"a","\u00f8":"o","\u00f5":"o",u:"u","\u00c1":"A","\u00c9":"E", "\u00cd":"I","\u00d3":"O","\u00da":"U","\u00ca":"E","\u00d4":"O","\u00dc":"U","\u00c3":"A","\u00d5":"O","\u00c0":"A","\u00c7":"C"};return this.replace(/[\u00e0-\u00fa]/ig,function(a){return"undefined"!=typeof b[a]?b[a]:a})});
Array.prototype.indexOf||(Array.prototype.indexOf=function(d,e){var a;if(null==this)throw new TypeError('"this" is null or not defined');var c=Object(this),b=c.length>>>0;if(0===b)return-1;a=+e||0;Infinity===Math.abs(a)&&(a=0);if(a>=b)return-1;for(a=Math.max(0<=a?a:b-Math.abs(a),0);a<b;){if(a in c&&c[a]===d)return a;a++}return-1});

try {
	var Common = {
		run: function() {},
		init: function() {
			Common.vtexBindQuickViewDestroy();
			Common.qdOverlay();
			Common.applyAmazingMenu();
			Common.applyAmazingMenuMobile();
			Common.toggleSearch();
			Common.applySmartCart();
			Common.setDataScrollToggle();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		qdOverlayClass: 'qd-am-on qd-cart-show qd-sn-on',
		qdOverlay: function() {
			$('.components-qd-v1-overlay').click(function() {
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		},
		vtexBindQuickViewDestroy: function() {
			window.bindQuickView = function() {};
		},
		applySmartCart: function() {
			$('.header-qd-v1-cart').append('<div class="smart-cart-qd-v1-wrapper"><div class="qd-sc-wrapper"></div></div>');

			$(document.body).append('<div class="smart-cart-qd-v2-wrapper"><div class="qd-sc-wrapper"></div></div>');

			var wrapper = $(".qd-sc-wrapper");

			$.QD_smartCart({
				selector: wrapper,
				dropDown:{
					texts: {
						linkCart: "Finalizar Compra",
						cartTotal: '<span class="qd-infoTotalItems">Itens: #items</span><span class="qd-infoTotalValue">Total: #value</span>'
					},
					updateOnlyHover: false,
					smartCheckout: true,
					callback: function() {
						$(".qd-ddc-wrapper3").prepend('<div class="qd-cartTitle"><h3>Meu carrinho</h3></div>');
						wrapper.find('.qd_ddc_continueShopping').after(wrapper.find('.qd-ddc-viewCart'));
					},
					skuName: function(data) {
						return data.name + ' - ' + data.skuName.replace(data.name, '');
					},
					callbackProductsList: function() {
						wrapper.find(".qd-ddc-prodQtt").each(function() {
							var $t = $(this);
							$t.add($t.next('.qd-ddc-prodRemove')).wrapAll('<div class="qd-ddc-prodAction"></div>');
						});
					}
				},
				buyButton: {
					buyButton: "body .prateleira:not(.qd-am) .buy-button"
				}
			});

			// Callback do Quick View
			window._QuatroDigital_prodBuyCallback = function(jqXHR, textStatus, prodLink, skus){
				$.fn.simpleCart(true);
				$(".shelf-qd-v1-buy-button-modal").modal("hide");
				$(window).trigger("QuatroDigital.qd_bb_prod_add", [new $, skus[0] || 0]);
			};

			$('.header-qd-v1-cart-link').click(function(evt) {
				evt.preventDefault();
				$(document.body).toggleClass('qd-cart-show');

				wrapper.height($(window).height());
				wrapper.find(".qd-ddc-prodWrapper").css('max-height', $(window).height() - 193);
			});

			$('.qd_ddc_lightBoxClose').click(function(evt){
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		},
		applyAmazingMenu: function() {
			$('.header-qd-v1-amazing-menu, .footer-qd-v1-menu-list').QD_amazingMenu();

			$('.header-qd-v1-floating-amazing-menu').click(function(e) {
				$('.header-qd-v1-amazing-menu-wrapper').toggleClass('qd-is-active');
				e.preventDefault();
			});
		},
		applyAmazingMenuMobile: function() {
			var wrapper = $('.header-qd-v1-amazing-menu-mobile');

			wrapper.find('> ul > li > ul').prepend(function(){return $(this).prev().clone().wrap('<li></li>').parent()});

			wrapper.QD_amazingMenu({
				callback: function() {
					$('<span class="qd-am-dropdown-trigger"><i class="fa fa-angle-right"></i></span>').appendTo(wrapper.find('.qd-am-has-ul')).click(function() {
						var $t = $(this);
						$.merge($t.parent(), $t.closest('ul')).toggleClass('qd-am-is-active');

						$t.filter(function(){return !$(this).closest('ul').is('.qd-amazing-menu');}).siblings('ul').stop(true, true).slideToggle();
					});

					wrapper.find('> ul > li > .qd-am-dropdown-trigger').click(function() {
						$('.header-qd-v1-amazing-menu-mobile-wrapper').addClass('qd-am-is-active');
						$('.header-qd-v1-amazing-menu-mobile-wrapper').animate({
				          scrollTop: 0
				        }, 200);
					});

					wrapper.find('> ul > li > ul > li:first-child').click(function(e){
						e.preventDefault();
						$(this).parents(".qd-am-is-active").removeClass('qd-am-is-active');
					});
				}
			});

			$('.header-qd-v1-amazing-menu-trigger').click(function(evt) {
				evt.preventDefault();
				$(document.body).toggleClass('qd-am-on');
			});

			$('.header-qd-v1-amazing-menu-mobile-wrapper .header-qd-v1-user-message').on('click', 'a#login', function() {
				$(document.body).removeClass('qd-am-on');
			});
		},
		setDataScrollToggle: function() {
			$(document.body).attr('data-qd-scroll-limit', '100');
		},
		toggleSearch: function() {
			$('.header-qd-v1-search-trigger').click(function(e) {

				if ($(this).parent().is('.header-qd-v1-floating-bar')) {
					$('.header-qd-v1-search-box').toggleClass('qd-active-floating-bar');
				}
				else {
					$('.header-qd-v1-search-box').toggleClass('qd-active');
				}

				e.preventDefault();
			});

			$('.header-qd-v1-search-box-close').click(function(){
				$('.header-qd-v1-search-box').removeClass('qd-active qd-active-floating-bar');
			});
		}
	};

	var Home = {
		init: function() {},
		ajaxStop: function() {},
		windowOnload: function() {}
	};

	var Search = {
		init: function() {},
		ajaxStop: function() {},
		windowOnload: function() {}
	};

	var Product = {
		run: function() {},
		init: function() {
			// Product.forceImageZoom();
			Product.setAvailableBodyClass();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		setAvailableBodyClass: function() {
			function checkVisibleNotify(available) {
				if (available)
					$(document.body).addClass('qd-product-available').removeClass('qd-product-unavailable');
				else
					$(document.body).addClass('qd-product-unavailable').removeClass('qd-product-available');
			}

			$(document).on("skuSelected.vtex", function(e, id, sku) {
				checkVisibleNotify(sku.available);
			});

			checkVisibleNotify(skuJson.available);
		},
		forceImageZoom: function() {
			try {
				var orig = window.ImageControl;
				window.ImageControl = function() {
					$("ul.thumbs a").each(function() {
						var $t = $(this);
						if ($t.attr("zoom"))
							return;
						var rel = $t.attr("rel");
						if (rel)
							$t.attr("zoom", rel.replace(/(ids\/[0-9]+)[0-9-]+/i, "$1-1000-1000"));
					});
					orig.apply(this, arguments);
				}
			}
			catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Ops, algo saiu errado como zoom :( . Detalhes: " + e.message)); }
		}
	};

	var List = {
		run: function() {},
		init: function() {},
		ajaxStop: function() {},
		windowOnload: function() {}
	};

	var Institutional = {
		init: function() {},
		ajaxStop: function() {},
		windowOnload: function() {}
	};

	var Orders = {
		init: function() {
			Orders.bootstrapCssFix();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		bootstrapCssFix: function() {
			var styleSheets = document.styleSheets;
			for (var i = 0; i < styleSheets.length; i++) {
				if ((styleSheets[i].href || "").indexOf('io.vtex.com.br/front-libs/bootstrap/2.3.2/css/bootstrap.min.css') > -1) {
					styleSheets[i].disabled = true;
					break;
				}
			}
		}
	};
}
catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Houve um erro nos objetos. Detalhes: " + e.message)); }

try {
	(function() {
		var body, ajaxStop, windowLoad;

		windowLoad = function() {
			Common.windowOnload();
			if (body.is(".home")) Home.windowOnload();
			else if (body.is(".resultado-busca, .departamento, .categoria")) Search.windowOnload();
			else if (body.is(".produto")) Product.windowOnload();
			else if (body.is(".listas")) List.windowOnload();
			else if (body.is(".institucional")) Institutional.windowOnload();
			else if (body.is(".orders")) Orders.windowOnload();
		};

		ajaxStop = function() {
			Common.ajaxStop();
			if (body.is(".home")) Home.ajaxStop();
			else if (body.is(".resultado-busca, .departamento, .categoria")) Search.ajaxStop();
			else if (body.is(".produto")) Product.ajaxStop();
			else if (body.is(".listas")) List.ajaxStop();
			else if (body.is(".institucional")) Institutional.ajaxStop();
			else if (body.is(".orders")) Orders.ajaxStop();
		};

		$(function() {
			body = $(document.body);
			Common.init();
			if (body.is(".home")) Home.init();
			else if (body.is(".resultado-busca, .departamento, .categoria")){
				Search.isSearch = $(document.body).is('.resultado-busca');
				Search.isDepartament = $(document.body).is('.departamento');
				Search.isCategory = $(document.body).is('.categoria');
				Search.init();
			}
			else if (body.is(".produto")) Product.init();
			else if (body.is(".listas")) List.init();
			else if (body.is(".institucional")) Institutional.init();
			else if (body.is(".orders")) Orders.init();
			$(document).ajaxStop(ajaxStop);
			$(window).load(windowLoad);
			body.addClass('jsFullLoaded');
		});

		Common.run();
		if (location.pathname.substr(location.pathname.length - 2, 2).toLowerCase() == "/p")
			Product.run();
		else if (location.pathname.search(/^(\/giftlist|\/list\/)/) == 0)
			List.run();
	})();
}
catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && $("body").addClass('jsFullLoaded jsFullLoadedError') && console.error("Houve um erro ao iniciar os objetos. Detalhes: " + e.message)); }

/* Quatro Digital Newsletter // 5.1 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os Direitos Reservados */
(function(){var f=jQuery;if("function"!==typeof f.fn.QD_news){var t={defaultName:"Digite seu nome...",defaultEmail:"Digite seu e-mail...",nameField:".qd_news_name",checkNameFieldIsVisible:!0,emailField:".qd_news_email",btn:".qd_news_button",elementError:".nv2_messageError",elementSuccess:".nv2_messageSuccess",validationMethod:"popup",getAttr:"alt",setDefaultName:!0,checkNameExist:!0,validateName:!0,showInPopup:!0,animation:"blink",animateSpeed:100,animateDistance:15,animateRepeat:3,animateFieldSuccess:".qd_news_animate_field_success",
timeHideSuccessMsg:3E3,platform:"VTEX",allowSubmit:function(){return!0},successCallback:function(){},submitCallback:function(f,l){}};f.fn.QD_news=function(r){var l=function(a,d){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var g;"object"===typeof a?(a.unshift("[QD News]\n"),g=a):g=["[QD News]\n"+a];if("undefined"===typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===
d.toLowerCase())try{console.info.apply(console,g)}catch(b){console.info(g.join("\n"))}else try{console.error.apply(console,g)}catch(b){console.error(g.join("\n"))}else try{console.warn.apply(console,g)}catch(b){console.warn(g.join("\n"))}}},h=f(this);if(!h.length)return h;var a=f.extend({},t,r);a.showInPopup||(a.validationMethod="div");null!==a.animation?a.validationMethod="animateField":"animateField"==a.validationMethod&&(a.animation="leftRight");if("popup"==a.validationMethod&&"function"!==typeof f.fn.vtexPopUp2)return l("O popUp2 n\u00e3o foi encontrado. Adicione o Plugin de PopUp2."),
h;var q=function(f){var d,g,b;g=0;d=function(){f.animate({left:"-="+a.animateDistance},a.animateSpeed,function(){f.animate({left:"+="+a.animateDistance},a.animateSpeed,function(){g<a.animateRepeat&&d();g++})})};b=function(){f.fadeTo(a.animateSpeed,.2,function(){f.fadeTo(a.animateSpeed,1,function(){g<a.animateRepeat&&b();g++})})};f.stop(!0,!0);"leftRight"==a.animation?d():"blink"==a.animation&&b()};h.each(function(){var h,d,g,b=f(this),k=b.find(a.nameField),e=b.find(a.emailField),m=b.find(a.btn);"animateField"!=
a.validationMethod&&(d=b.find(a.elementError),g=b.find(a.elementSuccess));1>k.length&&a.checkNameExist&&l("Campo de nome, n\u00e3o encontrado ("+k.selector+"). Ser\u00e1 atribuido um valor padr\u00e3o.","info");if(1>e.length)return l("Campo de e-mail, n\u00e3o encontrado ("+e.selector+")"),b;if(1>m.length)return l("Bot\u00e3o de envio, n\u00e3o encontrado ("+m.selector+")"),b;if("animateField"!=a.validationMethod&&(1>g.length||1>d.length))return l("A(s) mensagem(ns) de erro e/ou sucesso esta(m) faltando \n ("+
g.selector+", "+d.selector+")"),b;a.setDefaultName&&k.is("input[type=text], textarea")&&k.val(a.defaultName);e.val(a.defaultEmail);(function(){if(a.checkNameExist){if(a.checkNameFieldIsVisible){var c=k.filter(":visible");if(!c.length)return}else c=k;var b=c.val();c.is("input:text, textarea")&&c.bind({focus:function(){c.val()!=b||0!==c.val().search(a.defaultName.substr(0,6))&&!a.setDefaultName||c.val("")},blur:function(){""===c.val()&&c.val(b)}})}})();(function(){var b;b=e.val();e.bind({focus:function(){e.val()==
b&&0===e.val().search(a.defaultEmail.substr(0,6))&&e.val("")},blur:function(){""===e.val()&&e.val(b)}})})();h=function(){var c,e,h,k;e=(c=b.find(a.nameField).filter("input[type=text],select,textarea").val())?c:b.find(a.nameField).filter("input[type=radio], input[type=checkbox]").length?b.find(a.nameField).filter("input[type=radio]:checked, input[type=checkbox]:checked").val()||"":(c=b.find(a.nameField).attr(a.getAttr))?c:(c=b.find(a.nameField).text())?c:(c=b.find(a.nameField).find(".box-banner img:first").attr("alt"))?
c:"Nome_Padrao";c=(b.find(a.emailField).val()||"").trim();h=b.find(a.nameField).is(":visible");h=a.validateName?(1>e.length||0===e.search(a.defaultName.substr(0,6)))&&(a.checkNameExist||h?h:!0):!1;k=0>c.search(/^[a-z0-9\_\-\.\+]+@[a-z0-9\_\-]+(\.[a-z0-9\_\-]{2,})+$/i);if(h||k)"animateField"==a.validationMethod?(h&&q(b.find(a.nameField)),k&&q(b.find(a.emailField))):"popup"==a.validationMethod?d.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterError"}):(d.slideDown().bind("click",function(){f(this).slideUp()}),
setTimeout(function(){d.slideUp()},1800));else if(a.allowSubmit()){m.attr("disabled","disabled");var n={postData:{newsletterClientEmail:c,newsletterClientName:a.defaultName==e?"-":e,newsInternalCampaign:"newsletter:opt-in",newsInternalPage:(document.location.pathname||"/").replace(/\//g,"_"),newsInternalPart:"newsletter"},button:m,wrapper:b};"linx"===a.platform&&(n.postData.nome=n.postData.newsletterClientName,n.postData.email=n.postData.newsletterClientEmail);f.ajax({url:"linx"===a.platform?"/newsletter.aspx":
"/no-cache/Newsletter.aspx",type:"linx"===a.platform?"GET":"POST",data:n.postData,success:function(c){var e,h,d;m.removeAttr("disabled");if("linx"===a.platform&&!(-1<c.indexOf(" com sucesso.")||-1<c.indexOf(" cadastrado.")))return alert(c);"popup"==a.validationMethod?g.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterSuccess"}):"animateField"!=a.validationMethod&&g.slideDown().bind("click",function(){f(this).slideUp()});d=b.find(a.emailField);a.setDefaultName&&b.find(a.nameField).is("input:text, textarea")&&
b.find(a.nameField).val(a.defaultName);e=function(){d.val(a.defaultEmail)};"animateField"==a.validationMethod?(d.val(b.find(a.animateFieldSuccess).val()||"Obrigado!!!"),d.addClass("vtexNewsSuccess"),h=setTimeout(function(){d.removeClass("vtexNewsSuccess");e();d.unbind("focus.vtexNews")},a.timeHideSuccessMsg),d.bind("focus.vtexNews",function(){d.removeClass("vtexNewsSuccess");clearTimeout(h);f(this).val("");f(this).unbind("focus.vtexNews")})):e();a.successCallback(n);f(b).trigger("qdNewsSuccessCallback",
n)}});a.submitCallback(c,e)}else l("Os dados n\u00e3o foram enviados pois o parametro 'allowSubmit' n\u00e3o retornou 'true'","info")};var p=function(a){13==(a.keyCode?a.keyCode:a.which)&&(a.preventDefault(),h())};k.filter("input:text, textarea").bind("keydown",p);e.bind("keydown",p);p=m.getParent("form");p.length?p.submit(function(a){a.preventDefault();h()}):m.bind("click.qd_news",function(){h()})});return h};f(function(){f(".qd_news_auto").QD_news()})}})();
/* Quatro Digital - jQuery Ajax Queue // 4.0 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT <http://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT> */
(function(d){if("function"!==typeof d.qdAjax){var a={};d.qdAjaxQueue=a;150>parseInt((d.fn.jquery.replace(/[^0-9]+/g,"")+"000").slice(0,3),10)&&console&&"function"==typeof console.error&&console.error();d.qdAjax=function(f){try{var b=d.extend({},{url:"",type:"GET",data:"",success:function(){},error:function(){},complete:function(){},clearQueueDelay:5},f),e;e="object"===typeof b.data?JSON.stringify(b.data):b.data.toString();var c=encodeURIComponent(b.url+"|"+b.type+"|"+e);a[c]=a[c]||{};"undefined"==
typeof a[c].jqXHR?a[c].jqXHR=d.ajax(b):(a[c].jqXHR.done(b.success),a[c].jqXHR.fail(b.error),a[c].jqXHR.always(b.complete));a[c].jqXHR.always(function(){isNaN(parseInt(b.clearQueueDelay))||setTimeout(function(){a[c].jqXHR=void 0},b.clearQueueDelay)});return a[c].jqXHR}catch(g){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Problemas no $.qdAjax :( . Detalhes: "+g.message)}};d.qdAjax.version="4.0"}})(jQuery);
/* Quatro Digital - VTEX Checkout Queue // 1.1 //  Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
(function(){var l=function(a,c){if("object"===typeof console){var d="object"===typeof a;"undefined"!==typeof c&&"alerta"===c.toLowerCase()?d?console.warn("[QD VTEX Checkout Queue]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.warn("[QD VTEX Checkout Queue]\n"+a):"undefined"!==typeof c&&"info"===c.toLowerCase()?d?console.info("[QD VTEX Checkout Queue]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.info("[QD VTEX Checkout Queue]\n"+a):d?console.error("[QD VTEX Checkout Queue]\n",a[0],a[1],
a[2],a[3],a[4],a[5],a[6],a[7]):console.error("[QD VTEX Checkout Queue]\n"+a)}},f=null,g={},h={},e={};$.QD_checkoutQueue=function(a,c){if(null===f)if("object"===typeof window.vtexjs&&"undefined"!==typeof window.vtexjs.checkout)f=window.vtexjs.checkout;else return l("N\u00e3o foi encontrada a biblioteca VTEX.js. Este componente para por aqui, a for\u00e7a n\u00e3o esta mais contigo neste jornada! Para resolver isto inclua a biblioteca VTEX.js");var d=$.extend({done:function(){},fail:function(){}},c),
b=a.join(";"),k=function(){g[b].add(d.done);h[b].add(d.fail)};e[b]?k():(g[b]=$.Callbacks(),h[b]=$.Callbacks(),k(),e[b]=!0,f.getOrderForm(a).done(function(a){e[b]=!1;g[b].fire(a)}).fail(function(a){e[b]=!1;h[b].fire(a)}))}})();
/* Quatro Digital - Scroll Toggle // 1.4 // Carlos Vinicius // Todos os direitos reservados */
(function(){var c=jQuery,e=function(a,d){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var b;"object"===typeof a?(a.unshift("[QD Scroll Toggle]\n"),b=a):b=["[QD Scroll Toggle]\n"+a];if("undefined"===typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===d.toLowerCase())try{console.info.apply(console,b)}catch(c){try{console.info(b.join("\n"))}catch(e){}}else try{console.error.apply(console,
b)}catch(h){try{console.error(b.join("\n"))}catch(k){}}else try{console.warn.apply(console,b)}catch(l){try{console.warn(b.join("\n"))}catch(m){}}}};"function"!==typeof c.QD_scrollToggle&&(c.QD_scrollToggle=function(a){var d=[];if("string"!==typeof a&&"number"!==typeof a||"auto"===a)if("auto"===a)d.push(c(window).height());else return e("N\u00e3o foi informado o limite de scroll necess\u00e1rio para adicionar o atributo.");else{var b=a.split(","),f;for(f in b)"function"!==typeof b[f]&&(a=parseInt(b[f].trim()),
isNaN(a)||d.push(a))}if(!d.length)return e("Aaeeeeeeee irm\u00e3o! N\u00e3o consegui encontrar nenhum valor para calcular o scroll");if(!document||!document.body||"undefined"===typeof document.body.setAttribute)return e('"document.body.setAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!document||!document.body||"undefined"===typeof document.body.removeAttribute)return e('"document.body.removeAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!document||!document.body||"undefined"===
typeof document.body.getAttribute)return e('"document.body.getAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!c(window).scrollTop||isNaN(parseInt(c(window).scrollTop())))return e('"$(window).scrollTop" n\u00e3o esta retornando um n\u00famero inteiro :(');try{document.body.setAttribute("data-qd-scroll",1),document.body.getAttribute("data-qd-scroll"),document.body.removeAttribute("data-qd-scroll"),document.body.getAttribute("data-qd-scroll")}catch(g){e("N\u00e3o foi poss\u00edvel fazer o passo a passo de consultar, adicionar e remover um atributo",
g.message)}c(window).scroll(function(){for(var a=0;a<d.length;a++)c(window).scrollTop()>d[a]?document.body.getAttribute("data-qd-scroll-"+a)||document.body.setAttribute("data-qd-scroll-"+a,1):document.body.getAttribute("data-qd-scroll-"+a)&&document.body.removeAttribute("data-qd-scroll-"+a)})},c(function(){var a=c("body[data-qd-scroll-limit]");a.length&&c.QD_scrollToggle(a.attr("data-qd-scroll-limit"))}))})();
/* jQuery Cookie Plugin v1.4.1 // https://github.com/carhartl/jquery-cookie // Copyright 2013 Klaus Hartl // Released under the MIT license */
(function(){"function"!==typeof $.cookie&&function(c){"function"===typeof define&&define.amd?define(["jquery"],c):"object"===typeof exports?c(require("jquery")):c(jQuery)}(function(c){function p(a){a=e.json?JSON.stringify(a):String(a);return e.raw?a:encodeURIComponent(a)}function n(a,g){var b;if(e.raw)b=a;else a:{var d=a;0===d.indexOf('"')&&(d=d.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{d=decodeURIComponent(d.replace(l," "));b=e.json?JSON.parse(d):d;break a}catch(h){}b=void 0}return c.isFunction(g)?
g(b):b}var l=/\+/g,e=c.cookie=function(a,g,b){if(1<arguments.length&&!c.isFunction(g)){b=c.extend({},e.defaults,b);if("number"===typeof b.expires){var d=b.expires,h=b.expires=new Date;h.setTime(+h+864E5*d)}return document.cookie=[e.raw?a:encodeURIComponent(a),"=",p(g),b.expires?"; expires="+b.expires.toUTCString():"",b.path?"; path="+b.path:"",b.domain?"; domain="+b.domain:"",b.secure?"; secure":""].join("")}for(var d=a?void 0:{},h=document.cookie?document.cookie.split("; "):[],m=0,l=h.length;m<l;m++){var f=
h[m].split("="),k;k=f.shift();k=e.raw?k:decodeURIComponent(k);f=f.join("=");if(a&&a===k){d=n(f,g);break}a||void 0===(f=n(f))||(d[k]=f)}return d};e.defaults={};c.removeCookie=function(a,e){if(void 0===c.cookie(a))return!1;c.cookie(a,"",c.extend({},e,{expires:-1}));return!c.cookie(a)}})})();
/*PHP JS - Number Format - http://phpjs.org/functions/number_format/*/
function qd_number_format(b,c,d,e){b=(b+"").replace(/[^0-9+\-Ee.]/g,"");b=isFinite(+b)?+b:0;c=isFinite(+c)?Math.abs(c):0;e="undefined"===typeof e?",":e;d="undefined"===typeof d?".":d;var a="",a=function(a,b){var c=Math.pow(10,b);return""+(Math.round(a*c)/c).toFixed(b)},a=(c?a(b,c):""+Math.round(b)).split(".");3<a[0].length&&(a[0]=a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,e));(a[1]||"").length<c&&(a[1]=a[1]||"",a[1]+=Array(c-a[1].length+1).join("0"));return a.join(d)};
/* Quatro Digital Simple Cart // 4.15 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
(function(){var b=jQuery;if("function"!==typeof b.fn.simpleCart){b(function(){var b=vtexjs.checkout.getOrderForm;vtexjs.checkout.getOrderForm=function(){return b.call()}});try{window.QuatroDigital_simpleCart=window.QuatroDigital_simpleCart||{};window.QuatroDigital_simpleCart.ajaxStopOn=!1;b.fn.simpleCart=function(c,p,g){var d,h,m,l,f,k,q,r,t,n;h=function(a,b){if("object"===typeof console){var e="object"===typeof a;"undefined"!==typeof b&&"alerta"===b.toLowerCase()?e?console.warn("[Simple Cart]\n",
a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.warn("[Simple Cart]\n"+a):"undefined"!==typeof b&&"info"===b.toLowerCase()?e?console.info("[Simple Cart]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.info("[Simple Cart]\n"+a):e?console.error("[Simple Cart]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.error("[Simple Cart]\n"+a)}};d=b(this);"object"===typeof c?p=c:(c=c||!1,d=d.add(b.QD_simpleCart.elements));if(!d.length)return d;b.QD_simpleCart.elements=b.QD_simpleCart.elements.add(d);
g="undefined"===typeof g?!1:g;m={cartQtt:".qd_cart_qtt",cartTotal:".qd_cart_total",itemsText:".qd_items_text",currencySymbol:(b("meta[name=currency]").attr("content")||"R$")+" ",showQuantityByItems:!0,smartCheckout:!0,callback:function(){}};f=b.extend({},m,p);l=b("");d.each(function(){var a=b(this);a.data("qd_simpleCartOpts")||a.data("qd_simpleCartOpts",f)});n=function(a){window._QuatroDigital_CartData=window._QuatroDigital_CartData||{};for(var b=0,e=0,c=0;c<a.totalizers.length;c++)"Shipping"==a.totalizers[c].id&&
(e+=a.totalizers[c].value),b+=a.totalizers[c].value;window._QuatroDigital_CartData.total=f.currencySymbol+qd_number_format(b/100,2,",",".");window._QuatroDigital_CartData.shipping=f.currencySymbol+qd_number_format(e/100,2,",",".");window._QuatroDigital_CartData.allTotal=f.currencySymbol+qd_number_format((b+e)/100,2,",",".");window._QuatroDigital_CartData.qtt=0;if(f.showQuantityByItems)for(c=0;c<a.items.length;c++)window._QuatroDigital_CartData.qtt+=a.items[c].quantity;else window._QuatroDigital_CartData.qtt=
a.items.length||0;try{window._QuatroDigital_CartData.callback&&window._QuatroDigital_CartData.callback.fire&&window._QuatroDigital_CartData.callback.fire()}catch(u){h("Problemas com o callback do Smart Cart")}t(l)};k=function(a,b){1===a?b.hide().filter(".singular").show():b.hide().filter(".plural").show()};r=function(a){1>a?d.addClass("qd-emptyCart"):d.removeClass("qd-emptyCart")};q=function(a,b){var c;c=parseInt(window._QuatroDigital_CartData.qtt,10);b.$this.show();isNaN(c)&&(h("O valor obtido para calcular o plural/singular n\u00e3o \u00e9 um n\u00famero! O valor ser\u00e1 definido para 0.",
"alerta"),c=0);b.cartTotalE.html(window._QuatroDigital_CartData.total);b.cartQttE.html(c);k(c,b.itemsTextE);r(c)};t=function(a){d.each(function(){var d={},e;e=b(this);c&&e.data("qd_simpleCartOpts")&&b.extend(f,e.data("qd_simpleCartOpts"));d.$this=e;d.cartQttE=e.find(f.cartQtt)||l;d.cartTotalE=e.find(f.cartTotal)||l;d.itemsTextE=e.find(f.itemsText)||l;d.emptyElem=e.find(f.emptyCart)||l;q(a,d);e.addClass("qd-sc-populated")})};(function(){if(f.smartCheckout){window._QuatroDigital_DropDown=window._QuatroDigital_DropDown||
{};if("undefined"!==typeof window._QuatroDigital_DropDown.getOrderForm&&(g?g:!c))return n(window._QuatroDigital_DropDown.getOrderForm);if("object"!==typeof window.vtexjs||"undefined"===typeof window.vtexjs.checkout)if("object"===typeof vtex&&"object"===typeof vtex.checkout&&"undefined"!==typeof vtex.checkout.SDK)new vtex.checkout.SDK;else return h("N\u00e3o foi encontrada a biblioteca VTEX.js");b.QD_checkoutQueue(["items","totalizers","shippingData"],{done:function(a){n(a);window._QuatroDigital_DropDown.getOrderForm=
a},fail:function(a){h(["N\u00e3o foi poss\u00edvel obter os dados para o carrinho.",a])}})}else alert("Esta \u00e9 uma fun\u00e7\u00e3o descontinuada =/")})();f.callback();b(window).trigger("simpleCartCallback.quatro_digital");return d};b.QD_simpleCart={elements:b("")};b(function(){var c;"function"===typeof window.ajaxRequestbuyButtonAsynchronous&&(c=window.ajaxRequestbuyButtonAsynchronous,window.ajaxRequestbuyButtonAsynchronous=function(k,g,d,h,m){c.call(this,k,g,d,h,function(){"function"===typeof m&&
m();b.QD_simpleCart.elements.each(function(){var c;c=b(this);c.simpleCart(c.data("qd_simpleCartOpts"))})})})});var k=window.ReloadItemsCart||void 0;window.ReloadItemsCart=function(c){b.fn.simpleCart(!0);"function"===typeof k?k.call(this,c):alert(c)};b(function(){var c=b(".qd_cart_auto");c.length&&c.simpleCart()});b(function(){b(window).bind("productAddedToCart minicartUpdated.vtex cartProductAdded.vtex",function(){b.fn.simpleCart(!0)})})}catch(c){"undefined"!==typeof console&&"function"===typeof console.error&&
console.error("Oooops! ",c)}}})();
/* $("a").getParent("ul"); // 3 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT */
(function(a){a.fn.getParent=a.fn.closest})(jQuery);
/* Quatro Digital Amazing Menu // 2.13 // Carlos Vinicius // Todos os direitos reservados */
(function(k){var g;var a=jQuery;if("function"!==typeof a.fn.QD_amazingMenu){var m={url:"/qd-amazing-menu",callback:function(){},ajaxCallback:function(){}};var l=function(a,d){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var c;"object"===typeof a?(a.unshift("[QD Amazing Menu]\n"),c=a):c=["[QD Amazing Menu]\n"+a];if("undefined"===typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==
typeof d&&"info"===d.toLowerCase())try{console.info.apply(console,c)}catch(e){try{console.info(c.join("\n"))}catch(b){}}else try{console.error.apply(console,c)}catch(e){try{console.error(c.join("\n"))}catch(b){}}else try{console.warn.apply(console,c)}catch(e){try{console.warn(c.join("\n"))}catch(b){}}}};a.fn.qdAmAddNdx=function(){var f=a(this);f.each(function(d){a(this).addClass("qd-am-li-"+d)});f.first().addClass("qd-am-first");f.last().addClass("qd-am-last");return f};a.fn.QD_amazingMenu=function(){};
k=function(a){var d={"z":"haqvnypnypnqbf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe","dh":"ngebqvtvgny%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe","dhn":"gebqvtvgny%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe","dhng":"ebqvtvgny%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe","dhnge":"bqvtvgny%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe","dhngeb":"qvtvgny%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe"};return function(a){var e=function(a){return a};var b=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o","b"];a=a["d"+b[16]+"c"+b[17]+"m"+e(b[1])+"n"+b[13]]["l"+b[18]+"c"+b[0]+"ti"+e("o")+"n"];var c=function(a){return escape(encodeURIComponent(a.replace(/\./g,"\u00a8").replace(/[a-zA-Z]/g,function(a){return String.fromCharCode(("Z">=a?90:122)>=(a=a.charCodeAt(0)+13)?a:a-26)})))};var n=c(a[[b[9],e("o"),b[12],b[e(13)]].join("")]);
c=c((window[["js",e("no"),"m",b[1],b[4].toUpperCase(),"ite"].join("")]||"---")+[".v",b[13],"e",e("x"),"co",e("mm"),"erc",b[1],".c",e("o"),"m.",b[19],"r"].join(""));for(var h in d){if(c===h+d[h]||n===h+d[h]){var f="tr"+b[17]+"e";break}f="f"+b[0]+"ls"+e(b[1])+""}e=!1;-1<a[[b[12],"e",b[0],"rc",b[9]].join("")].indexOf("qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82")&&(e=!0);return[f,e]}(a)}(window);if(!eval(k[0]))return k[1]?l("\u0e17\u00c3\u0472 \u221a\u0391\u2113\u00a1\u2202\u0391\u2202\u0472 \u03a1\u0391\u0ae8\u0391 \u0aef\u0abd\u01ac\u0391 L\u0472J\u0391!"):
!1;var p=function(f){var d=f.find(".qd_am_code");var c=d.filter(".qd-am-banner");var e=d.filter(".qd-am-collection");if(c.length||e.length)c.parent().addClass("qd-am-banner-wrapper"),e.parent().addClass("qd-am-collection-wrapper"),a.qdAjax({url:g.url,dataType:"html",success:function(b){var d=a(b);c.each(function(){var b=a(this);var c=d.find("img[alt='"+b.attr("data-qdam-value")+"']");c.length&&(c.each(function(){a(this).getParent(".box-banner").clone().insertBefore(b)}),b.hide())}).addClass("qd-am-content-loaded");
e.each(function(){var b={};var c=a(this);d.find("h2").each(function(){if(a(this).text().trim().toLowerCase()==c.attr("data-qdam-value").trim().toLowerCase())return b=a(this),!1});b.length&&(b.each(function(){a(this).getParent("[class*='colunas']").clone().insertBefore(c)}),c.hide())}).addClass("qd-am-content-loaded")},error:function(){l("N\u00e3o foi poss\u00edvel obter os dados do menu. A url '"+g.url+"' falho.")},complete:function(){g.ajaxCallback.call(this);a(window).trigger("QuatroDigital.am.ajaxCallback",
f)},clearQueueDelay:3E3})};a.QD_amazingMenu=function(f){var d=f.find("ul[itemscope]").each(function(){var c=a(this);if(!c.length)return l(["UL do menu n\u00e3o encontrada",f],"alerta");c.find("li >ul").parent().addClass("qd-am-has-ul");c.find("li").each(function(){var b=a(this);var c=b.children(":not(ul)");c.length&&b.addClass("qd-am-elem-"+c.first().text().trim().replaceSpecialChars().replace(/\./g,"").replace(/\s/g,"-").toLowerCase())});var d=c.find(">li").qdAmAddNdx();c.addClass("qd-amazing-menu");
d=d.find(">ul");d.each(function(){var b=a(this);b.find(">li").qdAmAddNdx().addClass("qd-am-column");b.addClass("qd-am-dropdown-menu");b.parent().addClass("qd-am-dropdown")});d.addClass("qd-am-dropdown");var b=0,g=function(a){b+=1;a=a.children("li").children("*");a.length&&(a.addClass("qd-am-level-"+b),g(a))};g(c);c.add(c.find("ul")).each(function(){var b=a(this);b.addClass("qd-am-"+b.children("li").length+"-li")})});p(d);g.callback.call(this);a(window).trigger("QuatroDigital.am.callback",f)};a.fn.QD_amazingMenu=
function(f){var d=a(this);if(!d.length)return d;g=a.extend({},m,f);d.exec=new a.QD_amazingMenu(a(this));return d};a(function(){a(".qd_amazing_menu_auto").QD_amazingMenu()})}})(this);
/* Quatro Digital - Smart Buy Button // 1.18 // Carlos Vinicius // Todos os direitos reservados */
(function(u){try{var a=jQuery,c,r=a({}),l=function(a,c){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var b;"object"===typeof a?(a.unshift("[Quatro Digital - Buy Button]\n"),b=a):b=["[Quatro Digital - Buy Button]\n"+a];if("undefined"===typeof c||"alerta"!==c.toLowerCase()&&"aviso"!==c.toLowerCase())if("undefined"!==typeof c&&"info"===c.toLowerCase())try{console.info.apply(console,b)}catch(h){try{console.info(b.join("\n"))}catch(k){}}else try{console.error.apply(console,
b)}catch(h){try{console.error(b.join("\n"))}catch(k){}}else try{console.warn.apply(console,b)}catch(h){try{console.warn(b.join("\n"))}catch(k){}}}},t={timeRemoveNewItemClass:5E3,isSmartCheckout:!0,buyButton:".productInformationWrapper  a.buy-button",buyQtt:"input.buy-in-page-quantity",selectSkuMsg:"javascript:",autoWatchBuyButton:!0,buyIfQuantityZeroed:!1,fakeRequest:!1,productPageCallback:function(c,f,b){a("body").is(".productQuickView")&&("success"===f?alert("Produto adicionado ao carrinho!"):(alert("Ooops! Algo saiu errado ao tentar adicionar seu produto ao carrinho. \n Vou te redirecionar para o carrinho."),
("object"===typeof parent?parent:document).location.href=b))},isProductPage:function(){return a("body").is("#produto, .produto")},execDefaultAction:function(a){return!1},allowBuyClick:function(){return!0},callback:function(){},asyncCallback:function(){}};a.QD_buyButton=function(g,f){function b(a){c.isSmartCheckout?a.data("qd-bb-click-active")||(a.data("qd-bb-click-active",1),a.on("click.qd_bb_buy_sc",function(a){if(!c.allowBuyClick())return!0;if(!0!==m.clickBuySmartCheckout.call(this))return a.preventDefault(),
!1})):alert("M\u00e9todo descontinuado!")}function h(e){e=e||a(c.buyButton);e.each(function(){var d=a(this);d.is(".qd-sbb-on")||(d.addClass("qd-sbb-on"),d.is(".btn-add-buy-button-asynchronous")&&!d.is(".remove-href")||d.data("qd-bb-active")||(d.data("qd-bb-active",1),d.children(".qd-bb-productAdded").length||d.append('<span class="qd-bb-productAdded"><i class="icon-thumbs-up"></i> <span>Produto adicionado</span></span>'),d.is(".buy-in-page-button")&&c.isProductPage()&&p.call(d),b(d)))});c.isProductPage()&&
!e.length&&l("Oooops!\nAparentemente esta \u00e9 uma p\u00e1gina de produto por\u00e9m n\u00e3o encontrei nenhum bot\u00e3o comprar!\nVerifique se \u00e9 este mesmo o seletor: '"+e.selector+"'.","info")}var k,p,m;k=a(g);m=this;window._Quatro_Digital_dropDown=window._Quatro_Digital_dropDown||{};window._QuatroDigital_CartData=window._QuatroDigital_CartData||{};m.prodAdd=function(e,d){k.addClass("qd-bb-itemAddCartWrapper qd-bb-lightBoxProdAdd");a("body").addClass("qd-bb-lightBoxBodyProdAdd");var b=a(c.buyButton).filter("[href='"+
(e.attr("href")||"---")+"']").add(e);b.addClass("qd-bb-itemAddBuyButtonWrapper");setTimeout(function(){k.removeClass("qd-bb-itemAddCartWrapper");b.removeClass("qd-bb-itemAddBuyButtonWrapper")},c.timeRemoveNewItemClass);window._Quatro_Digital_dropDown.getOrderForm=void 0;if("undefined"!==typeof f&&"function"===typeof f.getCartInfoByUrl)return c.isSmartCheckout||(l("fun\u00e7\u00e3o descontinuada"),f.getCartInfoByUrl()),window._QuatroDigital_DropDown.getOrderForm=void 0,f.getCartInfoByUrl(function(d){window._Quatro_Digital_dropDown.getOrderForm=
d;a.fn.simpleCart(!0,void 0,!0)},{lastSku:d});window._Quatro_Digital_dropDown.allowUpdate=!0;a.fn.simpleCart(!0)};(function(){if(c.isSmartCheckout&&c.autoWatchBuyButton){var e=a(".btn-add-buy-button-asynchronous");e.length&&h(e)}})();p=function(){var e=a(this);"undefined"!==typeof e.data("buyButton")?(e.unbind("click"),b(e)):(e.bind("mouseenter.qd_bb_buy_sc",function(d){e.unbind("click");b(e);a(this).unbind(d)}),a(window).load(function(){e.unbind("click");b(e);e.unbind("mouseenter.qd_bb_buy_sc")}))};
m.clickBuySmartCheckout=function(){var e=a(this),d=e.attr("href")||"";if(-1<d.indexOf(c.selectSkuMsg))return!0;d=d.replace(/redirect\=(false|true)/ig,"").replace("?","?redirect=false&").replace(/\&\&/ig,"&");if(c.execDefaultAction(e))return e.attr("href",d.replace("redirect=false","redirect=true")),!0;d=d.replace(/http.?:/i,"");r.queue(function(b){if(!c.buyIfQuantityZeroed&&!/(&|\?)qty\=[1-9][0-9]*/ig.test(d))return b();var f=function(b,f){var g=d.match(/sku\=([0-9]+)/ig),h=[],k;if("object"===typeof g&&
null!==g)for(var l=g.length-1;0<=l;l--)k=parseInt(g[l].replace(/sku\=/ig,"")),isNaN(k)||h.push(k);c.productPageCallback.call(this,b,f,d);m.buyButtonClickCallback.call(this,b,f,d,h);m.prodAdd(e,d.split("ku=").pop().split("&").shift());"function"===typeof c.asyncCallback&&c.asyncCallback.call(this);a(window).trigger("productAddedToCart");a(window).trigger("cartProductAdded.vtex")};c.fakeRequest?(f(null,"success"),b()):a.ajax({url:d,complete:f}).always(function(){b()})})};m.buyButtonClickCallback=function(a,
b,c,f){try{"success"===b&&"object"===typeof window.parent&&"function"===typeof window.parent._QuatroDigital_prodBuyCallback&&window.parent._QuatroDigital_prodBuyCallback(a,b,c,f)}catch(g){l("Problemas ao tentar comunicar a p\u00e1gina que o produto foi aicionado ao carrinho.")}};h();"function"===typeof c.callback?c.callback.call(this):l("Callback n\u00e3o \u00e9 uma fun\u00e7\u00e3o")};var n=a.Callbacks();a.fn.QD_buyButton=function(g,f){var b=a(this);"undefined"!==typeof f||"object"!==typeof g||g instanceof
a||(f=g,g=void 0);c=a.extend({},t,f);var h;n.add(function(){b.children(".qd-bb-itemAddWrapper").length||b.prepend('<span class="qd-bb-itemAddWrapper"><span class="qd-bb-itemAddIco"></span></span>');h=new a.QD_buyButton(b,g)});n.fire();a(window).on("QuatroDigital.qd_bb_prod_add",function(a,b,c){h.prodAdd(b,c)});return a.extend(b,h)};var q=0;a(document).ajaxSend(function(a,c,b){-1<b.url.toLowerCase().indexOf("/checkout/cart/add")&&(q=(b.url.match(/sku\=([0-9]+)/i)||[""]).pop())});a(window).bind("productAddedToCart.qdSbbVtex",
function(){a(window).trigger("QuatroDigital.qd_bb_prod_add",[new a,q])});a(document).ajaxStop(function(){n.fire()})}catch(g){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Oooops! ",g)}})(this);
/* Quatro Digital Plus Smart Cart // 6.10 // Carlos Vinicius // Todos os direitos reservados */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(7(){1e{i.1v=i.1v||{},i.1v.1P=i.1v.1P||$.52()}1h(l){"X"!==C P&&"7"===C P.1g&&P.1g("2C! ",l.39)}})();(7(l){1e{B a=2H,k=7(a,c){Q("1w"===C P&&"X"!==C P.1g&&"X"!==C P.1K&&"X"!==C P.2Z){B h;"1w"===C a?(a.4Y("[37 30 - 2o 2Q]\\n"),h=a):h=["[37 30 - 2o 2Q]\\n"+a];Q("X"===C c||"3l"!==c.2T()&&"3W"!==c.2T())Q("X"!==C c&&"1K"===c.2T())1e{P.1K.35(P,h)}1h(e){1e{P.1K(h.1H("\\n"))}1h(d){}}1B 1e{P.1g.35(P,h)}1h(e){1e{P.1g(h.1H("\\n"))}1h(d){}}1B 1e{P.2Z.35(P,h)}1h(e){1e{P.2Z(h.1H("\\n"))}1h(d){}}}};i.G=i.G||{};i.G.2B=!0;a.1S=7(){};a.1i.1S=7(){W{1i:32 a}};B f=7(a){B c={j:"50%U%T%2R%U%T%1C%U%T%1z",4M:"4L%U%T%1C%U%T%1z",53:"5k%U%T%5o%U%T%1C%U%T%1z",5e:"57%U%T%4b%U%T%1C%U%T%1z",56:"54%U%T%4a%U%T%1C%U%T%1z",59:"5c%U%T%5b%U%T%5a%U%T%1C%U%T%1z","4C%5d":"F%T%2R%U%T%4b%U%T%1C%U%T%1z","4C%U":"%T%2R%U%T%4a%U%T%1C%U%T%1z"};W 7(a){B e=7(a){W a};B d=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o","b"];a=a["d"+d[16]+"c"+d[17]+"m"+e(d[1])+"n"+d[13]]["l"+d[18]+"c"+d[0]+"5f"+e("o")+"n"];B k=7(a){W 5m(5n(a.1q(/\\./g,"\\5h").1q(/[a-5i-Z]/g,7(a){W 4T.4U(("Z">=a?4X:4Z)>=(a=a.4S(0)+13)?a:a-26)})))};B h=k(a[[d[9],e("o"),d[12],d[e(13)]].1H("")]);k=k((i[["1J",e("2w"),"m",d[1],d[4].55(),"61"].1H("")]||"---")+[".v",d[13],"e",e("x"),"63",e("64"),"5Z",d[1],".c",e("o"),"m.",d[19],"r"].1H(""));21(B f 2r c){Q(k===f+c[f]||h===f+c[f]){B g="5q"+d[17]+"e";66}g="f"+d[0]+"6e"+e(d[1])+""}e=!1;-1<a[[d[12],"e",d[0],"6i",d[9]].1H("")].6d("68%4j%4B%4H%2O%82%2O%67%69%6b%4f%5S%4f%5C%2O%82%4j%4B%4H%5w%82")&&(e=!0);W[g,e]}(a)}(i);Q(!5s(f[0]))W f[1]?k("\\5t\\5N\\4D \\5P\\1V\\5Q\\5K\\4F\\1V\\4F\\4D \\5G\\1V\\5I\\1V \\5J\\5U\\5H\\1V L\\5F\\1V!"):!1;a.1S=7(f,c){B h=a(f);Q(!h.1t)W h;B e=a.4d(!0,{},{2b:!0,14:{3z:"5L 3a 5O",3x:"5M 5E",1p:"<D><J>4A: #H</J><J>5D: #36</J></D><D><J>5v: #1F</J><J>5u: #2M</J></D>",2x:"5r 1X 5B n\\V 4G 5A 4w.",3w:"5y 5z",3F:\'<3X 21="6-8-3U">5R 4J: </3X><22 42="6a" 1N="6-8-3U" 6c="3T" />\'},2j:6h,29:!0,3c:7(a){W a.3c||a.3Z},1P:7(){},2m:7(){}},c);a("");B d=K;Q(e.29){B g=!1;"X"===C i.2z&&(k("A 3B 38.1J n\\V 1l 3O. o 6g 3Q\\33 6f 2w 65"),a.5X({5W:"//45.1j.2F.46/1j.1J/1.0.0/1j.3u.1J",5V:!1,5T:"5Y",1g:7(){k("N\\V 1l 1E\\1A 2K \'//45.1j.2F.46/1j.1J/1.0.0/1j.3u.1J\' o 2o n\\V 62\\33 60.");g=!0}}));Q(g)W k("A 6j\\1G\\V 1D 2o 4O\\33 4W 51!")}Q("1w"===C i.2z&&"X"!==C i.2z.1o)B l=i.2z.1o;1B Q("1w"===C 1j&&"1w"===C 1j.1o&&"X"!==C 1j.1o.3P)l=32 1j.1o.3P;1B W k("N\\V 1l 3O a 3B 38.1J");d.3M=\'<D E="6-8-1y 6-8-2X"><D E="6-8-4x"><D E="3D"></D><D E="6-8-4N"><D E="6-8-2x"><p></p></D><D E="6-8-3C 6-8-4P"><a 1x="#" E="6-8-3N"></a><D E="6-8-2W"> <D E="6-8-2E"></D> </D><J E="6-8-4Q"></J><a 1x="#" E="6-8-40"></a></D><D E="6-8-3C 6-8-1K"><D E="6-8-1F"></D><D E="6-8-3E"></D><D E="6-8-5p"><a 1x="/1o/#/24" E="6-8-3A"></a><a 1x="#" E="3e"></a><a 1x="/1o/#/5j" E="6-8-1o"></a></D></D></D></D></D>\';B u=7(b){a(K).3b(b);b.I(".3e, .3D").1T(a(".5g")).1a("1R.2S",7(){h.10("6-2n-3L");a(2A.28).10("6-2n-3J")});a(2A).5l("2s.2S").1a("2s.2S",7(b){27==b.41&&(h.10("6-2n-3L"),a(2A.28).10("6-2n-3J"))});B q=b.I(".6-8-2W");b.I(".6-8-3N").1a("1R.58",7(){d.2g("-",1f 0,1f 0,q);W!1});b.I(".6-8-40").1a("1R.4V",7(){d.2g(1f 0,1f 0,1f 0,q);W!1});b.I(".6-8-1F 22").1d("").1a("2s.4R",7(){d.4I(a(K))});Q(e.2b){B c=0;a(K).1a("5x.3S",7(){B b=7(){i.G.2B&&(d.1U(),i.G.2B=!1,a.1i.2q(!0),d.2c())};c=6z(7(){b()},7C);b()});a(K).1a("7D.3S",7(){7B(c)})}};B v=7(b){b=a(b);e.14.1p=e.14.1p.1q("#36",\'<J E="6-8-3I"></J>\');e.14.1p=e.14.1p.1q("#H",\'<J E="6-8-3H"></J>\');e.14.1p=e.14.1p.1q("#1F",\'<J E="6-8-3G"></J>\');e.14.1p=e.14.1p.1q("#2M",\'<J E="6-8-3K"></J>\');b.I(".6-8-3A").1m(e.14.3z);b.I(".3e").1m(e.14.3w);b.I(".6-8-1o").1m(e.14.3x);b.I(".6-8-3E").1m(e.14.1p);b.I(".6-8-1F").1m(e.14.3F);b.I(".6-8-2x p").1m(e.14.2x);W b}(K.3M);B r=0;h.2a(7(){0<r?u.1k(K,v.7A()):u.1k(K,v);r++});i.1v.1P.1T(7(){a(".6-8-3I").1m(i.1v.2M||"--");a(".6-8-3H").1m(i.1v.1M||"0");a(".6-8-3G").1m(i.1v.1F||"--");a(".6-8-3K").1m(i.1v.7y||"--")});B t=7(a,e){Q("X"===C a.H)W k("N\\V 1l 1E\\1A 2K 1W H 4r 7z\\1G\\V");d.3v.1k(K,e)};d.1U=7(b,d){"X"!=C d?i.G.2v=d:i.G.2v&&(d=i.G.2v);2V(7(){i.G.2v=1f 0},e.2j);a(".6-8-1y").10("6-8-3y");Q(e.29){B c=7(b){i.G.S=b;t(b,d);"X"!==C i.M&&"7"===C i.M.1I&&i.M.1I.1k(K);a(".6-8-1y").15("6-8-3y")};"X"!==C i.G.S?(c(i.G.S),"7"===C b&&b(i.G.S)):a.7E(["H","2N","25"],{2p:7(a){c.1k(K,a);"7"===C b&&b(a)},2i:7(a){k(["N\\V 1l 1E\\1A 2K 1W 23 1D 1X",a])}})}1B 2U("7F m\\2h 2d 2f!")};d.2c=7(){B b=a(".6-8-1y");b.I(".6-8-2P").1t?b.10("6-8-2X"):b.15("6-8-2X")};d.3v=7(b){B c=a(".6-8-2E");c.31();c.2a(7(){B c=a(K),q,f,n=a(""),p;21(p 2r i.G.S.H)Q("1w"===C i.G.S.H[p]){B m=i.G.S.H[p];B h=m.7K.1q(/^\\/|\\/$/g,"").7L("/");B g=a(\'<D E="6-8-2P 7J"><D E="6-8-1Z 6-8-7I 6-8-7G"><D E="6-8-7H"><7x 3o="" E="6-8-3Y" /><J E="6-8-7w"></J></D></D><D E="6-8-1Z 6-8-7m 6-8-44"></D><D E="6-8-1Z 6-8-7n 6-8-47"></D><D E="6-8-1Z 6-8-7l 6-8-7k"><D E="6-8-3j 43"><a 1x="#" E="6-8-2L"></a><22 42="7h" E="6-8-1s" /><a 1x="#" E="6-8-2I"></a><J E="6-8-7i"></J></D></D><D E="6-8-1Z 6-8-7N 6-8-7o"><D E="6-8-7p 43"><a 1x="#" E="6-8-20"></a><J E="6-8-7u"></J></D></D></D>\');g.1b({"Y-11":m.1N,"Y-11-1r":p,"Y-6-7v":h[0],"Y-6-7t":h[h.1t-1]});g.15("6-8-"+m.7s);g.I(".6-8-44").3b(e.3c(m));g.I(".6-8-47").3b(2G(m.2k)?m.2k:0==m.2k?"7q\\7r":(a("7M[3Z=81]").1b("7X")||"R$")+" "+7R(m.2k/7Y,2,",","."));g.I(".6-8-1s").1b({"Y-11":m.1N,"Y-11-1r":p}).1d(m.1s);g.I(".6-8-20").1b({"Y-11":m.1N,"Y-11-1r":p});d.3i(m.1N,g.I(".6-8-3Y"),m.7Q);g.I(".6-8-2I,.6-8-2L").1b({"Y-11":m.1N,"Y-11-1r":p});g.7O(c);n=n.1T(g)}1e{B l=c.4v(".6-8-1y").I(".6-8-1F 22");l.1t&&""==l.1d()&&i.G.S.25.3R&&l.1d(i.G.S.25.3R.4E)}1h(w){k("4q 3a 3Q 7S o 3T 2F 7V 7U 23 1D 1o. 4s: "+w.39,"3W")}d.3k(c);d.2c();b&&b.3V&&7(){f=n.7W("[Y-11=\'"+b.3V+"\']");f.1t&&(q=0,n.2a(7(){B b=a(K);Q(b.7T(f))W!1;q+=b.7P()}),d.2g(1f 0,1f 0,q,c.1T(c.6k())),n.10("6-8-48"),7(a){a.15("6-8-3h");a.15("6-8-48");2V(7(){a.10("6-8-3h")},e.2j)}(f))}()});(7(){G.S.H.1t?(a("28").10("6-8-24-31").15("6-8-24-3r 6-8-3s-1T-3m"),2V(7(){a("28").10("6-8-3s-1T-3m")},e.2j)):a("28").10("6-8-24-3r").15("6-8-24-31")})();"7"===C e.2m?e.2m.1k(K):k("2m n\\V \\1Q 2Y 4t\\1G\\V")};d.3i=7(b,d,c){7 e(){d.10("6-3q").83(7(){a(K).15("6-3q")}).1b("3o",c)}c?e():2G(b)?k("N\\V 1l 7Z 2Y 80 4y a 7j e 7f 3g 34","3l"):2U("4e\\1G\\V 3f \\1Q 3g m\\2h 2f. 6E o 6D.")};d.3k=7(b){B c=7(b,c){B e=a(b);B n=e.1b("Y-11");B f=e.1b("Y-11-1r");Q(n){B g=3d(e.1d())||1;d.2y([n,f],g,g+1,7(a){e.1d(a);"7"===C c&&c()})}};B e=7(b,c){B e=a(b);B f=e.1b("Y-11");B n=e.1b("Y-11-1r");Q(f){B g=3d(e.1d())||2;d.2y([f,n],g,g-1,7(a){e.1d(a);"7"===C c&&c()})}};B g=7(b,e){B c=a(b);B f=c.1b("Y-11");B n=c.1b("Y-11-1r");Q(f){B g=3d(c.1d())||1;d.2y([f,n],1,g,7(a){c.1d(a);"7"===C e&&e()})}};B f=b.I(".6-8-3j:6C(.3n)");f.15("3n").2a(7(){B b=a(K);b.I(".6-8-2I").1a("1R.6A",7(a){a.3p();f.15("6-1n");c(b.I(".6-8-1s"),7(){f.10("6-1n")})});b.I(".6-8-2L").1a("1R.6B",7(a){a.3p();f.15("6-1n");e(b.I(".6-8-1s"),7(){f.10("6-1n")})});b.I(".6-8-1s").1a("6F.3t",7(){f.15("6-1n");g(K,7(){f.10("6-1n")})});b.I(".6-8-1s").1a("2s.3t",7(a){13==a.41&&(f.15("6-1n"),g(K,7(){f.10("6-1n")}))})});b.I(".6-8-2P").2a(7(){B b=a(K);b.I(".6-8-20").1a("1R.6G",7(){b.15("6-1n");d.4i(a(K),7(a){a?b.4o(!0).6L(7(){b.20();d.2c()}):b.10("6-1n")});W!1})})};d.4I=7(a){B b=a.1d();b=b.1q(/[^0-9\\-]/g,"");b=b.1q(/([0-9]{5})\\-?([0-9])([0-9]{2})?/g,"$1-$2$3");b=b.1q(/(.{9}).*/g,"$1");a.1d(b);9<=b.1t&&(a.Y("4K")!=b&&l.6K({4E:b,6J:"6H"}).2p(7(a){i.G.S=a;d.1U()}).2i(7(a){k(["N\\V 1l 1E\\1A 6I o 4J",a]);7g()}),a.Y("4K",b))};d.2y=7(b,c,f,g){7 h(b){b="4k"!==C b?!1:b;d.1U();i.G.2B=!1;d.2c();"X"!==C i.M&&"7"===C i.M.1I&&i.M.1I.1k(K);"7"===C 2l&&2l();a.1i.2q(!0,1f 0,b);"7"===C g&&g(c)}f=f||1;Q(1>f)W c;Q(e.29){Q("X"===C i.G.S.H[b[1]])W k("N\\V 1l 1E\\1A 4l 1W 23 1D 1O. A 4m 49 \\1Q 4h 4g 34: i.G.S.H["+b[1]+"]"),c;i.G.S.H[b[1]].1s=f;i.G.S.H[b[1]].1r=b[1];l.6y([i.G.S.H[b[1]]],["H","2N","25"]).2p(7(a){i.G.S=a;h(!0)}).2i(7(a){k(["N\\V 1l 1E\\1A 4p a 6p 6q 6o 2w 1X",a]);h()})}1B k("6n\\1G\\V 2d m\\2h 2d 2f")};d.4i=7(b,c){7 d(b){b="4k"!==C b?!1:b;"X"!==C i.M&&"7"===C i.M.1I&&i.M.1I.1k(K);"7"===C 2l&&2l();a.1i.2q(!0,1f 0,b);"7"===C c&&c(f)}B f=!1,g=a(b).1b("Y-11-1r");Q(e.29){Q("X"===C i.G.S.H[g])W k("N\\V 1l 1E\\1A 4l 1W 23 1D 1O. A 4m 49 \\1Q 4h 4g 34: i.G.S.H["+g+"]"),f;i.G.S.H[g].1r=g;l.6l([i.G.S.H[g]],["H","2N","25"]).2p(7(a){f=!0;i.G.S=a;t(a);d(!0)}).2i(7(a){k(["N\\V 1l 1E\\1A 6m o 1O 1D 1X",a]);d()})}1B 2U("4e\\1G\\V, 3f m\\2h 2d 2f.")};d.2g=7(b,c,e,d){d=d||a(".6-8-2W, .6-8-2E");b=b||"+";c=c||.9*d.6r();d.4o(!0,!0).6s({6x:2G(e)?b+"="+c+"6w":e})};e.2b||(d.1U(),a.1i.2q(!0));a(i).1a("6v.4z 6t.1j.4z",7(){1e{i.G.S=1f 0,d.1U()}1h(b){k("4q 3a 4p 1W 23 1D 1X a 6u 1D 6M 4r 38. 4s: "+b.39,"6N")}});"7"===C e.1P?e.1P.1k(K):k("77 n\\V \\1Q 2Y 4t\\1G\\V")};a.1i.1S=7(f){B c=a(K);c.1i=32 a.1S(K,f);W c}}1h(g){"X"!==C P&&"7"===C P.1g&&P.1g("2C! ",g)}})(K);(7(l){1e{B a=2H;i.M=i.M||{};i.M.H={};i.M.1Y=!1;i.M.76=!1;i.M.75=!1;B k=7(){Q(i.M.1Y){B f=!1;B g={};i.M.H={};21(h 2r i.G.S.H)Q("1w"===C i.G.S.H[h]){B c=i.G.S.H[h];"X"!==C c.1c&&73!==c.1c&&""!==c.1c&&(i.M.H["1L"+c.1c]=i.M.H["1L"+c.1c]||{},i.M.H["1L"+c.1c].4u=c.1c,g["1L"+c.1c]||(i.M.H["1L"+c.1c].1M=0),i.M.H["1L"+c.1c].1M+=c.1s,f=!0,g["1L"+c.1c]=!0)}B h=f}1B h=1f 0;i.M.1Y&&(a(".6-1u-1y").20(),a(".6-1u-1O-2D").10("6-1u-1O-2D"));21(B e 2r i.M.H){c=i.M.H[e];Q("1w"!==C c)W;g=a("22.6-1c[36="+c.4u+"]").4v("74");Q(i.M.1Y||!g.I(".6-1u-1y").1t)f=a(\'<J E="6-1u-1y" 78="4A 2w 1X 4y 3f 4w."><J E="6-1u-4x"><J E="6-1u-1M"></J></J></J>\'),f.I(".6-1u-1M").1m(c.1M),c=g.I(".79"),c.1t?c.4n(f).15("6-1u-1O-2D"):g.4n(f)}h&&(i.M.1Y=!1)};i.M.1I=7(){i.M.1Y=!0;k.1k(K)};a(2A).7e(7(){k.1k(K)})}1h(f){"X"!==C P&&"7"===C P.1g&&P.1g("2C! ",f)}})(K);(7(){1e{B l=2H,a,k={2u:".7d",2e:{},2t:{}};l.7c=7(f){B g={};a=l.4d(!0,{},k,f);f=l(a.2u).1S(a.2e);g.2t="X"!==C a.2e.2b&&!1===a.2e.2b?l(a.2u).4c(f.1i,a.2t):l(a.2u).4c(a.2t);g.2e=f;W g};l.1i.2J=7(){"1w"===C P&&"7"===C P.1K&&P.1K("O 7a 2Q n\\V \\1Q 7b 72 71 6S. A 6T\\V 6R 6Q\\6O 2d 6P 4G 6U\\6V 70 e 6Z 1W 6Y 6W \\6X 37 30.")};l.2J=l.1i.2J}1h(f){"X"!==C P&&"7"===C P.1g&&P.1g("2C! ",f)}})();',62,500,'||||||qd|function|ddc||||||||||window|||||||||||||||||||var|typeof|div|class||_QuatroDigital_DropDown|items|find|span|this||_QuatroDigital_AmountProduct|||console|if||getOrderForm|25BF|25EF|u00e3o|return|undefined|data||removeClass|sku|||texts|addClass|||||on|attr|productId|val|try|void|error|catch|fn|vtex|call|foi|html|loading|checkout|cartTotal|replace|index|quantity|length|bap|_QuatroDigital_CartData|object|href|wrapper|25BDoe|u00edvel|else|25BDpbz|do|poss|shipping|u00e7|join|exec|js|info|prod_|qtt|id|item|callback|u00e9|click|QD_dropDownCart|add|getCartInfoByUrl|u0391|os|carrinho|allowRecalculate|prodCell|remove|for|input|dados|cart|shippingData|||body|smartCheckout|each|updateOnlyHover|cartIsEmpty|esta|dropDown|descontinuado|scrollCart|u00e9todo|fail|timeRemoveNewItemClass|sellingPrice|adminCart|callbackProductsList|bb|DropDown|done|simpleCart|in|keyup|buyButton|selector|dataOptionsCache|no|emptyCart|changeQantity|vtexjs|document|allowUpdate|Oooops|added|prodWrapper2|com|isNaN|jQuery|quantityMore|smartCart|obter|quantityMinus|total|totalizers|D1|prodRow|Cart|25BDzhaqvnypnypnqbf|qd_ddc_closeFn|toLowerCase|alert|setTimeout|prodWrapper|noItems|uma|warn|Digital|empty|new|u00e1|SKU|apply|value|Quatro|VTEX|message|ao|append|skuName|parseInt|qd_ddc_continueShopping|este|um|lastAdded|insertProdImg|prodQttWrapper|actionButtons|alerta|time|qd_on|src|preventDefault|loaded|rendered|product|qd_ddc_change|min|renderProductsList|continueShopping|linkCheckout|prodLoaded|linkCart|viewCart|biblioteca|row|qd_ddc_lightBoxClose|infoTotal|shippingForm|infoTotalShipping|infoTotalItems|infoTotalValue|lightBoxBodyProdAdd|infoAllTotal|lightBoxProdAdd|cartContainer|scrollUp|encontrada|SDK|tentar|address|qd_ddc_hover|CEP|cep|lastSku|aviso|label|image|name|scrollDown|keyCode|type|clearfix|prodName|io|br|prodPrice|lastAddedFixed|buscada|25BDigrkpbzzreprfgnoyr|25BDigrkpbzzreprorgn|QD_buyButton|extend|Aten|C2|pelo|composta|removeProduct|E0|boolean|localizar|chave|prepend|stop|atualizar|Problemas|da|Detalhes|fun|prodId|getParent|produto|wrapper2|para|qdDdcVtex|Itens|B8|jjj|u0472|postalCode|u2202|tem|84|shippingCalculate|frete|qdDdcLastPostalCode|aqvnypnypnqbf|zh|wrapper3|par|products|prodLoading|qd_ddc_cep|charCodeAt|String|fromCharCode|qd_ddc_scrollDown|por|90|unshift|122|jj|aqui|Callbacks|zha|nypnypnqbf|toUpperCase|zhaqv|vnypnypnqbf|qd_ddc_scrollUp|zhaqvn|25BDdhngebqvtvgny|25BDigrk|ypnypnqbf|25E|zhaq|ti|qd_ddc_lightBoxOverlay|u00a8|zA|orderform|qvnypnypnqbf|off|escape|encodeURIComponent|25BDigrkpbzzrepr|infoBts|tr|Seu|eval|u0e17|Total|Frete|C5|mouseenter|Continuar|Comprando|nenhum|ainda|A1|Subtotal|Compra|u0472J|u03a1|u01ac|u0ae8|u0aef|u00a1|Ir|Finalizar|u00c3|Carrinho|u221a|u2113|Calcular|A1g|dataType|u0abd|async|url|ajax|script|erc|executado|ite|ser|co|mm|CDN|break|8F|qu|CF|tel|83d|placeholder|indexOf|ls|buscar|Script|5E3|rc|execu|parent|removeItems|remover|aten|itens|quantidade|de|height|animate|minicartUpdated|partir|productAddedToCart|px|scrollTop|updateItems|setInterval|qd_ddc_more|qd_ddc_minus|not|SAC|Contacte|focusout|qd_ddc_remove|BRA|calcular|country|calculateShipping|slideUp|eveento|avisso|u00ea|executando|voc|que|forma|vers|licen|u00e7a|reservados|u00e0|direitos|todos|restrita|desta|iniciado|null|li|quickViewUpdate|buyButtonClicked|Callback|title|qd_bap_wrapper_content|Smart|mais|QD_smartCart|qdDdcContainer|ajaxStop|nem|updateCartData|text|qttLoading|imagem|prodQtt|column4|column2|column3|prodRemove|removeWrapper|Gr|u00e1tis|availability|category|prodRowLoading|departament|imgLoading|img|allTotal|requisi|clone|clearInterval|600|mouseleave|QD_checkoutQueue|Este|prodImg|prodImgWrapper|column1|qd_ddc_prodRow|productCategoryIds|split|meta|column5|appendTo|outerHeight|imageUrl|qd_number_format|definir|is|nos|base|filter|content|100|informada|URL|currency||load'.split('|'),0,{}));