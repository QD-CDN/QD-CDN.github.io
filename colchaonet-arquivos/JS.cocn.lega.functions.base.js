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
			Common.amazingMenu();
			Common.apllySmartCart();
			Common.headerActiveSearch();
			Common.openSmartCart();
			Common.callPerfectScrollbar();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		vtexBindQuickViewDestroy: function() {
			window.bindQuickView = function() {};
		},
		amazingMenu: function() {
			var wrapper = $('.header-qd-v1-amazing-menu');

			wrapper.QD_amazingMenu({
				callback: function() {
					$('<span class="qd-am-dropdown-trigger"><i class="fa fa-chevron-down"></i></span>').appendTo(wrapper.find('.qd-am-has-ul')).click(function() {
						var $t = $(this);

						$t.siblings('ul').stop(true, true).slideToggle(function(){
							$(this).parent().toggleClass('qd-am-is-active');
						});
					});
				}
			});

			$('.header-qd-v1-menu-toggle').click(function(){
				$(document.body).toggleClass('qd-am-on');
				return false;
			});

			// Blackdrop
			$('body').append($('<div class="header-qd-v1-menu-blackdrop"></div>'));
			$('.header-qd-v1-menu-blackdrop').click(function(){
				$(document.body).toggleClass('qd-am-on');
				return false;
			});
		},
		apllySmartCart: function() {
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
						$(".qd-ddc-wrapper3").prepend('<div class="qd-cartTitle"><h3>Carrinho</h3></div>');
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
					buyButton: "body .buy-button"
				}
			});

			// Callback do Quick View
			window._QuatroDigital_prodBuyCallback = function(jqXHR, textStatus, prodLink, skus){
				$.fn.simpleCart(true);
				$(".shelf-qd-v1-buy-button-modal").modal("hide");
				$(window).trigger("QuatroDigital.qd_bb_prod_add", [new $, skus[0] || 0]);
			};

			$('.qd-ddc-prodRow').last().addClass('qd-ddc-prodRow-last');
		},
		headerActiveSearch: function() {
			var wrapper = $('.header-qd-v1');

			wrapper.find('.header-qd-v1-btn-search').click(function() {
				wrapper.find('.header-qd-v1-amazing-search').toggleClass('search-active');
				wrapper.find('.header-qd-v1-actions').toggleClass('search-active');
			});
		},
		openSmartCart: function() {
			var wrapper = $(".smart-cart-qd-v2-wrapper");

			$(".header-qd-v1-cart-link").click(function() {
				$(document.body).toggleClass('qd-cart-show');
				wrapper.find(".qd-ddc-prodWrapper").css('max-height', $(window).height() - 193);
				return false;
			});

			$(".components-qd-v1-overlay, .qd_ddc_lightBoxClose").click(function(evt){
				$(document.body).removeClass('qd-cart-show');
			});
		},
		callPerfectScrollbar: function() {
			var wrapper = $('.qd-v1-perfect-scrollbar');

			wrapper.each(function() {
				var $t = $(this);
				$t.css('max-height', '325px').perfectScrollbar({
					minScrollbarLength: 43,
					maxScrollbarLength: 43
				});
			});
		}
	};

	var Home = {
		init: function() {
			Home.slickFullBaner();
			Home.searchByFilter();
			Home.apllyBrandsCarousel();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		apllyBrandsCarousel: function() {
			$('.brands-qd-v1-carousel').slick({
				prevArrow: '<button type="button" class="slick-prev" title="Anterior"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next" title="Próximo"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>',
				mobileFirst: true,
				speed: 1000,
				slidesToShow: 8,
				slidesToScroll: 8,
				responsive: [
					{
						breakpoint: 0,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},

					{
						breakpoint: 400,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},

					{
						breakpoint: 600,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3
						}
					},

					{
						breakpoint: 767,
						settings: {
							slidesToShow: 4,
							slidesToScroll: 4
						}
					},

					{
						breakpoint: 991,
						settings: {
							slidesToShow: 5,
							slidesToScroll: 5
						}
					},

					{
						breakpoint: 1024,
						settings: {
							slidesToShow: 5,
							slidesToScroll: 5
						}
					},

					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 6,
							slidesToScroll: 6
						}
					}
				]
			});
		},
		slickFullBaner:function(){
			$('.slider-qd-v1-full').slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i> <span>anterior</span></button>',
				nextArrow: '<button type="button" class="slick-next"><span>proximo</span> <i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				fade: true,
				lazyLoad: 'progressive',
				dots: true,
				autoplay: true,
				autoplaySpeed: 2000
			});
		},
		searchByFilter:function(){
			// Abrir os subniveis de filtros
			$(".home-qd-v1-filter .home-qd-v1-filter-btns > ul > li > P").click(function() {
				$(this).parent().toggleClass('qd-on');
			});

			//
			$(".home-qd-v1-filter .home-qd-v1-filter-btn-mobile").click(function() {
				$(".home-qd-v1-filter-btns-wrap, .home-qd-v1-filter-search-wrap").toggleClass('qd-on');
			});
		}
	};

	var Search = {
		init: function() {},
		ajaxStop: function() {},
		windowOnload: function() {}
	};

	var Product = {
		run: function() {},
		init: function() {
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
		}
	};

	var List = {
		run: function() {},
		init: function() {},
		ajaxStop: function() {},
		windowOnload: function() {}
	};

	var Institutional = {
		init: function() {
			Institutional.mosaicBanners();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		mosaicBanners: function() {
			$(".brands-qd-v1 .box-banner").QD_mosaicBanners();
		},
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

		Search.isSearch = $(document.body).is('.resultado-busca');
		Search.isDepartament = $(document.body).is('.departamento');
		Search.isCategory = $(document.body).is('.categoria');

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
			else if (body.is(".resultado-busca, .departamento, .categoria")) Search.init();
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
/* Quatro Digital Simple Cart // 4.12 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
(function(){var b=jQuery;if("function"!==typeof b.fn.simpleCart)try{window.QuatroDigital_simpleCart=window.QuatroDigital_simpleCart||{};window.QuatroDigital_simpleCart.ajaxStopOn=!1;b.fn.simpleCart=function(c,n,h){var d,k,g,f,l,p,q,r,m;k=function(a,b){if("object"===typeof console){var e="object"===typeof a;"undefined"!==typeof b&&"alerta"===b.toLowerCase()?e?console.warn("[Simple Cart]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.warn("[Simple Cart]\n"+a):"undefined"!==typeof b&&"info"===b.toLowerCase()?
e?console.info("[Simple Cart]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.info("[Simple Cart]\n"+a):e?console.error("[Simple Cart]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.error("[Simple Cart]\n"+a)}};d=b(this);"object"===typeof c?n=c:(c=c||!1,d=d.add(b.fn.simpleCart.elements));if(!d.length)return d;b.fn.simpleCart.elements=b.fn.simpleCart.elements.add(d);h="undefined"===typeof h?!1:h;f=b.extend({},{cartQtt:".qd_cart_qtt",cartTotal:".qd_cart_total",itemsText:".qd_items_text",currencySymbol:"R$ ",
showQuantityByItems:!0,smartCheckout:!0,callback:function(){}},n);g=b("");d.each(function(){var a=b(this);a.data("qd_simpleCartOpts")||a.data("qd_simpleCartOpts",f)});m=function(a){window._QuatroDigital_CartData=window._QuatroDigital_CartData||{};for(var b=0,e=0,c=0;c<a.totalizers.length;c++)"Shipping"==a.totalizers[c].id&&(e+=a.totalizers[c].value),b+=a.totalizers[c].value;window._QuatroDigital_CartData.total=f.currencySymbol+qd_number_format(b/100,2,",",".");window._QuatroDigital_CartData.shipping=
f.currencySymbol+qd_number_format(e/100,2,",",".");window._QuatroDigital_CartData.allTotal=f.currencySymbol+qd_number_format((b+e)/100,2,",",".");window._QuatroDigital_CartData.qtt=0;if(f.showQuantityByItems)for(c=0;c<a.items.length;c++)window._QuatroDigital_CartData.qtt+=a.items[c].quantity;else window._QuatroDigital_CartData.qtt=a.items.length||0;try{window._QuatroDigital_CartData.callback&&window._QuatroDigital_CartData.callback.fire&&window._QuatroDigital_CartData.callback.fire()}catch(d){k("Problemas com o callback do Smart Cart")}r(g)};
l=function(a,b){1===a?b.hide().filter(".singular").show():b.hide().filter(".plural").show()};q=function(a){1>a?d.addClass("qd-emptyCart"):d.removeClass("qd-emptyCart")};p=function(a,b){var c;c=parseInt(window._QuatroDigital_CartData.qtt,10);b.$this.show();isNaN(c)&&(k("O valor obtido para calcular o plural/singular n\u00e3o \u00e9 um n\u00famero! O valor ser\u00e1 definido para 0.","alerta"),c=0);b.cartTotalE.html(window._QuatroDigital_CartData.total);b.cartQttE.html(c);l(c,b.itemsTextE);q(c)};r=
function(a){d.each(function(){var d={},e;e=b(this);c&&e.data("qd_simpleCartOpts")&&b.extend(f,e.data("qd_simpleCartOpts"));d.$this=e;d.cartQttE=e.find(f.cartQtt)||g;d.cartTotalE=e.find(f.cartTotal)||g;d.itemsTextE=e.find(f.itemsText)||g;d.emptyElem=e.find(f.emptyCart)||g;p(a,d);e.addClass("qd-sc-populated")})};(function(){if(f.smartCheckout){window._QuatroDigital_DropDown=window._QuatroDigital_DropDown||{};if("undefined"!==typeof window._QuatroDigital_DropDown.getOrderForm&&(h?h:!c))return m(window._QuatroDigital_DropDown.getOrderForm);
if("object"!==typeof window.vtexjs||"undefined"===typeof window.vtexjs.checkout)if("object"===typeof vtex&&"object"===typeof vtex.checkout&&"undefined"!==typeof vtex.checkout.SDK)new vtex.checkout.SDK;else return k("N\u00e3o foi encontrada a biblioteca VTEX.js");b.QD_checkoutQueue(["items","totalizers","shippingData"],{done:function(a){m(a);window._QuatroDigital_DropDown.getOrderForm=a},fail:function(a){k(["N\u00e3o foi poss\u00edvel obter os dados para o carrinho.",a])}})}else alert("Esta \u00e9 uma fun\u00e7\u00e3o descontinuada =/")})();
f.callback();b(window).trigger("simpleCartCallback.quatro_digital");return d};b.fn.simpleCart.elements=b("");b(function(){var c;"function"===typeof window.ajaxRequestbuyButtonAsynchronous&&(c=window.ajaxRequestbuyButtonAsynchronous,window.ajaxRequestbuyButtonAsynchronous=function(l,h,d,k,g){c.call(this,l,h,d,k,function(){"function"===typeof g&&g();b.fn.simpleCart.elements.each(function(){var c;c=b(this);c.simpleCart(c.data("qd_simpleCartOpts"))})})})});var l=window.ReloadItemsCart||void 0;window.ReloadItemsCart=
function(c){b.fn.simpleCart(!0);"function"===typeof l?l.call(this,c):alert(c)};b(function(){var c=b(".qd_cart_auto");c.length&&c.simpleCart()});b(function(){b(window).bind("productAddedToCart minicartUpdated.vtex",function(){b.fn.simpleCart(!0)})})}catch(t){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Oooops! ",t)}})();
/* $("a").getParent("ul"); // 3 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT */
(function(a){a.fn.getParent=a.fn.closest})(jQuery);
/* Quatro Digital Simple Cart // 4.14 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
(function(){var b=jQuery;if("function"!==typeof b.fn.simpleCart){b(function(){var b=vtexjs.checkout.getOrderForm;vtexjs.checkout.getOrderForm=function(){return b.call()}});try{window.QuatroDigital_simpleCart=window.QuatroDigital_simpleCart||{};window.QuatroDigital_simpleCart.ajaxStopOn=!1;b.fn.simpleCart=function(c,n,h){var d,k,g,f,l,p,q,r,m;k=function(a,b){if("object"===typeof console){var e="object"===typeof a;"undefined"!==typeof b&&"alerta"===b.toLowerCase()?e?console.warn("[Simple Cart]\n",a[0],
a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.warn("[Simple Cart]\n"+a):"undefined"!==typeof b&&"info"===b.toLowerCase()?e?console.info("[Simple Cart]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.info("[Simple Cart]\n"+a):e?console.error("[Simple Cart]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.error("[Simple Cart]\n"+a)}};d=b(this);"object"===typeof c?n=c:(c=c||!1,d=d.add(b.QD_simpleCart.elements));if(!d.length)return d;b.QD_simpleCart.elements=b.QD_simpleCart.elements.add(d);h="undefined"===
typeof h?!1:h;f=b.extend({},{cartQtt:".qd_cart_qtt",cartTotal:".qd_cart_total",itemsText:".qd_items_text",currencySymbol:"R$ ",showQuantityByItems:!0,smartCheckout:!0,callback:function(){}},n);g=b("");d.each(function(){var a=b(this);a.data("qd_simpleCartOpts")||a.data("qd_simpleCartOpts",f)});m=function(a){window._QuatroDigital_CartData=window._QuatroDigital_CartData||{};for(var b=0,e=0,c=0;c<a.totalizers.length;c++)"Shipping"==a.totalizers[c].id&&(e+=a.totalizers[c].value),b+=a.totalizers[c].value;
window._QuatroDigital_CartData.total=f.currencySymbol+qd_number_format(b/100,2,",",".");window._QuatroDigital_CartData.shipping=f.currencySymbol+qd_number_format(e/100,2,",",".");window._QuatroDigital_CartData.allTotal=f.currencySymbol+qd_number_format((b+e)/100,2,",",".");window._QuatroDigital_CartData.qtt=0;if(f.showQuantityByItems)for(c=0;c<a.items.length;c++)window._QuatroDigital_CartData.qtt+=a.items[c].quantity;else window._QuatroDigital_CartData.qtt=a.items.length||0;try{window._QuatroDigital_CartData.callback&&
window._QuatroDigital_CartData.callback.fire&&window._QuatroDigital_CartData.callback.fire()}catch(d){k("Problemas com o callback do Smart Cart")}r(g)};l=function(a,b){1===a?b.hide().filter(".singular").show():b.hide().filter(".plural").show()};q=function(a){1>a?d.addClass("qd-emptyCart"):d.removeClass("qd-emptyCart")};p=function(a,b){var c;c=parseInt(window._QuatroDigital_CartData.qtt,10);b.$this.show();isNaN(c)&&(k("O valor obtido para calcular o plural/singular n\u00e3o \u00e9 um n\u00famero! O valor ser\u00e1 definido para 0.",
"alerta"),c=0);b.cartTotalE.html(window._QuatroDigital_CartData.total);b.cartQttE.html(c);l(c,b.itemsTextE);q(c)};r=function(a){d.each(function(){var d={},e;e=b(this);c&&e.data("qd_simpleCartOpts")&&b.extend(f,e.data("qd_simpleCartOpts"));d.$this=e;d.cartQttE=e.find(f.cartQtt)||g;d.cartTotalE=e.find(f.cartTotal)||g;d.itemsTextE=e.find(f.itemsText)||g;d.emptyElem=e.find(f.emptyCart)||g;p(a,d);e.addClass("qd-sc-populated")})};(function(){if(f.smartCheckout){window._QuatroDigital_DropDown=window._QuatroDigital_DropDown||
{};if("undefined"!==typeof window._QuatroDigital_DropDown.getOrderForm&&(h?h:!c))return m(window._QuatroDigital_DropDown.getOrderForm);if("object"!==typeof window.vtexjs||"undefined"===typeof window.vtexjs.checkout)if("object"===typeof vtex&&"object"===typeof vtex.checkout&&"undefined"!==typeof vtex.checkout.SDK)new vtex.checkout.SDK;else return k("N\u00e3o foi encontrada a biblioteca VTEX.js");b.QD_checkoutQueue(["items","totalizers","shippingData"],{done:function(a){m(a);window._QuatroDigital_DropDown.getOrderForm=
a},fail:function(a){k(["N\u00e3o foi poss\u00edvel obter os dados para o carrinho.",a])}})}else alert("Esta \u00e9 uma fun\u00e7\u00e3o descontinuada =/")})();f.callback();b(window).trigger("simpleCartCallback.quatro_digital");return d};b.QD_simpleCart={elements:b("")};b(function(){var c;"function"===typeof window.ajaxRequestbuyButtonAsynchronous&&(c=window.ajaxRequestbuyButtonAsynchronous,window.ajaxRequestbuyButtonAsynchronous=function(l,h,d,k,g){c.call(this,l,h,d,k,function(){"function"===typeof g&&
g();b.QD_simpleCart.elements.each(function(){var c;c=b(this);c.simpleCart(c.data("qd_simpleCartOpts"))})})})});var l=window.ReloadItemsCart||void 0;window.ReloadItemsCart=function(c){b.fn.simpleCart(!0);"function"===typeof l?l.call(this,c):alert(c)};b(function(){var c=b(".qd_cart_auto");c.length&&c.simpleCart()});b(function(){b(window).bind("productAddedToCart minicartUpdated.vtex cartProductAdded.vtex",function(){b.fn.simpleCart(!0)})})}catch(c){"undefined"!==typeof console&&"function"===typeof console.error&&
console.error("Oooops! ",c)}}})();
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
/* Quatro Digital Plus Smart Cart // 6.7 // Carlos Vinicius // Todos os direitos reservados */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(8(){1e{i.1p=i.1p||{},i.1p.1V=i.1p.1V||$.5N()}1b(n){"V"!==B M&&"8"===B M.1d&&M.1d("2t! ",n.3c)}})();(8(n){1e{E a=31,d=8(a,b){U("1t"===B M&&"V"!==B M.1d&&"V"!==B M.1I&&"V"!==B M.2B){E c;"1t"===B a?(a.5O("[2G 2H - 2p 2U]\\n"),c=a):c=["[2G 2H - 2p 2U]\\n"+a];U("V"===B b||"3q"!==b.2Z()&&"3p"!==b.2Z())U("V"!==B b&&"1I"===b.2Z())1e{M.1I.2F(M,c)}1b(v){1e{M.1I(c.1H("\\n"))}1b(w){}}1F 1e{M.1d.2F(M,c)}1b(v){1e{M.1d(c.1H("\\n"))}1b(w){}}1F 1e{M.2B.2F(M,c)}1b(v){1e{M.2B(c.1H("\\n"))}1b(w){}}}};i.G=i.G||{};i.G.2d=!0;a.1U=8(){};a.1g.1U=8(){S{1g:32 a}};E b=8(a){E b={j:"5J%T%2K%T%1x",5K:"5P%T%1x",5Q:"5V%T%5U%T%1x%T%1W",5T:"5R%T%3X%T%1x%T%1W",5S:"5I%T%3U%T%1x%T%1W",5H:"5x%T%5y%T%5w%T%1x%T%1W","3V%5v":"2%2K%T%3X%T%1x%T%1W","3V%T":"%2K%T%3U%T%1x%T%1W"};S 8(a){E c,d,f,g;d=8(a){S a};f=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o","b"];a=a["d"+f[16]+"c"+f[17]+"m"+d(f[1])+"n"+f[13]]["l"+f[18]+"c"+f[0]+"5G"+d("o")+"n"];c=8(a){S 5E(5D(a.1q(/\\./g,"\\5B").1q(/[a-5C-Z]/g,8(a){S 5W.5X(("Z">=a?6i:6j)>=(a=a.6h(0)+13)?a:a-26)})))};E l=c(a[[f[9],d("o"),f[12],f[d(13)]].1H("")]);c=c((i[["1B",d("2j"),"m",f[1],f[4].6g(),"6e"].1H("")]||"---")+[".v",f[13],"e",d("x"),"6f",d("6k"),"6l",f[1],".c",d("o"),"m.",f[19],"r"].1H(""));2a(E m 2c b){U(c===m+b[m]||l===m+b[m]){g="6q"+f[17]+"e";6p}g="f"+f[0]+"6o"+d(f[1])+""}d=!1;-1<a[[f[12],"e",f[0],"6m",f[9]].1H("")].6d("6c%3Q%3P%3B%2P%2S%2P%62%63%61%43%60%43%5Z%2P%2S%3Q%3P%3B%6b%2S")&&(d=!0);S[g,d]}(a)}(i);U(!68(b[0]))S b[1]?d("\\66\\67\\3y \\6r\\1J\\5g\\4V\\3A\\1J\\3A\\3y \\4R\\1J\\4S\\1J \\4W\\4X\\52\\1J L\\51\\1J!"):!1;a.1U=8(b,m){E c,l,n,f,g,r,u;r=a(b);U(!r.1u)S r;c=a.4z(!0,{},{29:!0,10:{3C:"4Z 2W 53",42:"4O 4H",1m:"<C><H>4y: #F</H><H>4I: #2Q</H></C><C><H>4J: #1E</H><H>4P: #35</H></C>",2e:"4K 1K 4N n\\Q 4k 4L 4B.",44:"5r 5k",46:\'<3F 2a="6-7-3M">54 4i: </3F><24 3S="5p" 1R="6-7-3M" 5n="3n" />\'},3b:5f,1Y:!0,2J:8(a){S a.2J||a.58},1V:8(){},2y:8(){}},m);a("");g=J;U(c.1Y){E x=!1;"V"===B i.2q&&(d("A 3G 3a.1B n\\Q 1k 3H. o 57 4a\\36 55 2j 59"),a.5e({5d:"//3L.1f.2C.3K/1f.1B/1.0.0/1f.3I.1B",5c:!1,5b:"5j",1d:8(){d("N\\Q 1k 1y\\1v 2z \'//3L.1f.2C.3K/1f.1B/1.0.0/1f.3I.1B\' o 2p n\\Q 5a\\36 56.");x=!0}}));U(x)S d("A 5o\\1C\\Q 1w 2p 5q\\36 5m 5l!")}E t;U("1t"===B i.2q&&"V"!==B i.2q.1n)t=i.2q.1n;1F U("1t"===B 1f&&"1t"===B 1f.1n&&"V"!==B 1f.1n.3J)t=32 1f.1n.3J;1F S d("N\\Q 1k 3H a 3G 3a.1B");g.49=\'<C D="6-7-1A 6-7-2M"><C D="6-7-4x"><C D="3N"></C><C D="6-7-4Q"><C D="6-7-2e"><p></p></C><C D="6-7-3O 6-7-65"><a 1z="#" D="6-7-3w"></a><C D="6-7-2O"> <C D="6-7-2D"></C> </C><H D="6-7-6F"></H><a 1z="#" D="6-7-3v"></a></C><C D="6-7-3O 6-7-1I"><C D="6-7-1E"></C><C D="6-7-45"></C><C D="6-7-6s"><a 1z="/1n/#/1Z" D="6-7-3D"></a><a 1z="#" D="2R"></a><a 1z="/1n/#/7I" D="6-7-1n"></a></C></C></C></C></C>\';l=8(e){a(J).2I(e);e.I(".2R, .3N").1Q(a(".7M")).1c("1S.30",8(){r.W("6-2s-3E");a(2o.20).W("6-2s-3x")});a(2o).7p("2i.30").7r("2i.30",8(e){27==e.4E&&(r.W("6-2s-3E"),a(2o.20).W("6-2s-3x"))});E b=e.I(".6-7-2O");e.I(".6-7-3w").1c("1S.7v",8(){g.2u("-",1j 0,1j 0,b);S!1});e.I(".6-7-3v").1c("1S.7w",8(){g.2u(1j 0,1j 0,1j 0,b);S!1});e.I(".6-7-1E 24").1a("").1c("2i.7x",8(){g.4C(a(J))});U(c.29){E d=0;a(J).1c("7u.3z",8(){E e=8(){i.G.2d&&(g.1P(),i.G.2d=!1,a.1g.2f(!0),g.28())};d=7y(8(){e()},7z);e()});a(J).1c("7C.3z",8(){7A(d)})}};n=8(e){e=a(e);c.10.1m=c.10.1m.1q("#2Q",\'<H D="6-7-48"></H>\');c.10.1m=c.10.1m.1q("#F",\'<H D="6-7-47"></H>\');c.10.1m=c.10.1m.1q("#1E",\'<H D="6-7-3u"></H>\');c.10.1m=c.10.1m.1q("#35",\'<H D="6-7-41"></H>\');e.I(".6-7-3D").1i(c.10.3C);e.I(".2R").1i(c.10.44);e.I(".6-7-1n").1i(c.10.42);e.I(".6-7-45").1i(c.10.1m);e.I(".6-7-1E").1i(c.10.46);e.I(".6-7-2e p").1i(c.10.2e);S e}(J.49);f=0;r.23(8(){0<f?l.1h(J,n.7E()):l.1h(J,n);f++});i.1p.1V.1Q(8(){a(".6-7-48").1i(i.1p.35||"--");a(".6-7-47").1i(i.1p.1M||"0");a(".6-7-3u").1i(i.1p.1E||"--");a(".6-7-41").1i(i.1p.7Q||"--")});u=8(a,c){U("V"===B a.F)S d("N\\Q 1k 1y\\1v 2z 1N F 4m 7N\\1C\\Q");g.3T.1h(J,c)};g.1P=8(e,b){E p;a(".6-7-1A").W("6-7-40");c.1Y?(p=8(e){i.G.P=e;u(e,b);"V"!==B i.K&&"8"===B i.K.1D&&i.K.1D.1h(J);a(".6-7-1A").11("6-7-40")},"V"!==B i.G.P?(p(i.G.P),"8"===B e&&e(i.G.P)):a.7K(["F","2A","2n"],{2k:8(a){p.1h(J,a);"8"===B e&&e(a)},2m:8(a){d(["N\\Q 1k 1y\\1v 2z 1N 21 1w 1K",a])}})):2N("7F m\\2v 25 2x!")};g.28=8(){E e=a(".6-7-1A");e.I(".6-7-38").1u?e.W("6-7-2M"):e.11("6-7-2M")};g.3T=8(e){E b=a(".6-7-2D");b.2T();b.23(8(){E b=a(J),p,h,k,f,l=a(""),q;2a(q 2c i.G.P.F)"1t"===B i.G.P.F[q]&&(k=i.G.P.F[q],h=a(\'<C D="6-7-38 7O"><C D="6-7-1X 6-7-7T 6-7-7U"><C D="6-7-7P"><7S 3r="" D="6-7-3Y" /><H D="6-7-7l"></H></C></C><C D="6-7-1X 6-7-7h 6-7-3W"></C><C D="6-7-1X 6-7-6K 6-7-3Z"></C><C D="6-7-1X 6-7-6J 6-7-6I"><C D="6-7-3g 3R"><a 1z="#" D="6-7-34"></a><24 3S="6H" D="6-7-1s" /><a 1z="#" D="6-7-33"></a><H D="6-7-6L"></H></C></C><C D="6-7-1X 6-7-6M 6-7-6Q"><C D="6-7-6P 3R"><a 1z="#" D="6-7-22"></a><H D="6-7-6N"></H></C></C></C>\'),h.15({"X-Y":k.1R,"X-Y-1o":q}),h.11(".6-7-"+k.7i),h.I(".6-7-3W").2I(c.2J(k)),h.I(".6-7-3Z").2I(2L(k.2l)?k.2l:0==k.2l?"6x\\6w":"R$ "+6v(k.2l/6t,2,",",".")),h.I(".6-7-1s").15({"X-Y":k.1R,"X-Y-1o":q}).1a(k.1s),h.I(".6-7-22").15({"X-Y":k.1R,"X-Y-1o":q}),g.3s(k.1R,h.I(".6-7-3Y"),k.6u),h.I(".6-7-33,.6-7-34").15({"X-Y":k.1R,"X-Y-1o":q}),h.6z(b),l=l.1Q(h));1e{E m=b.4h(".6-7-1A").I(".6-7-1E 24");m.1u&&""==m.1a()&&m.1a(i.G.P.2n.6D.4v)}1b(y){d("4q 2W 4a 6C o 3n 2C 6B 6A 21 1w 1n. 4f: "+y.3c,"3p")}g.3d();g.28();e&&e.3j&&8(){f=l.6R("[X-Y=\'"+e.3j+"\']");f.1u&&(p=0,l.23(8(){E e=a(J);U(e.6S(f))S!1;p+=e.7a()}),g.2u(1j 0,1j 0,p,b.1Q(b.79())),l.W("6-7-3k"),8(a){a.11("6-7-3m");a.11("6-7-3k");3l(8(){a.W("6-7-3m")},c.3b)}(f))}()});(8(){G.P.F.1u?(a("20").W("6-7-1Z-2T").11("6-7-1Z-3o 6-7-3i-1Q-4b"),3l(8(){a("20").W("6-7-3i-1Q-4b")},c.3b)):a("20").W("6-7-1Z-3o").11("6-7-1Z-2T")})();"8"===B c.2y?c.2y.1h(J):d("2y n\\Q \\1L 39 4w\\1C\\Q")};g.3s=8(e,b,c){8 p(){b.W("6-3h").75(8(){a(J).11("6-3h")}).15("3r",c)}c?p():2L(e)?d("N\\Q 1k 6X 39 6W 4A a 6V e 6T 3t 2E","3q"):2N("4o\\1C\\Q 2X \\1L 3t m\\2v 2x. 6U o 6Y.")};g.3d=8(){E e,b,c,d;e=8(b,e){E c,k,d,h;d=a(b);c=d.15("X-Y");h=d.15("X-Y-1o");c&&(k=2V(d.1a())||1,g.2h([c,h],k,k+1,8(a){d.1a(a);"8"===B e&&e()}))};c=8(b,e){E c,d,k,h;k=a(b);c=k.15("X-Y");h=k.15("X-Y-1o");c&&(d=2V(k.1a())||2,g.2h([c,h],d,d-1,8(a){k.1a(a);"8"===B e&&e()}))};d=8(b,e){E c,d,k,h;k=a(b);c=k.15("X-Y");h=k.15("X-Y-1o");c&&(d=2V(k.1a())||1,g.2h([c,h],1,d,8(a){k.1a(a);"8"===B e&&e()}))};b=a(".6-7-3g:73(.3e)");b.11("3e").23(8(){E h=a(J);h.I(".6-7-33").1c("1S.71",8(a){a.3f();b.11("6-1l");e(h.I(".6-7-1s"),8(){b.W("6-1l")})});h.I(".6-7-34").1c("1S.70",8(a){a.3f();b.11("6-1l");c(h.I(".6-7-1s"),8(){b.W("6-1l")})});h.I(".6-7-1s").1c("7L.4G",8(){b.11("6-1l");d(J,8(){b.W("6-1l")})});h.I(".6-7-1s").1c("2i.4G",8(a){13==a.4E&&(b.11("6-1l"),d(J,8(){b.W("6-1l")}))})});a(".6-7-38").23(8(){E b=a(J);b.I(".6-7-22").1c("1S.72",8(){b.11("6-1l");g.4c(a(J),8(a){a?b.4p(!0).6Z(8(){b.22();g.28()}):b.W("6-1l")});S!1})})};g.4C=8(a){E b=a.1a(),b=b.1q(/[^0-9\\-]/g,""),b=b.1q(/([0-9]{5})\\-?([0-9])([0-9]{2})?/g,"$1-$2$3"),b=b.1q(/(.{9}).*/g,"$1");a.1a(b);9<=b.1u&&(a.X("4j")!=b&&t.74({4v:b,7d:"7e"}).2k(8(a){i.G.P=a;g.1P()}).2m(8(a){d(["N\\Q 1k 1y\\1v 7f o 4i",a]);7g()}),a.X("4j",b))};g.2h=8(b,f,l,m){8 e(b){b="4d"!==B b?!1:b;g.1P();i.G.2d=!1;g.28();"V"!==B i.K&&"8"===B i.K.1D&&i.K.1D.1h(J);"8"===B 2g&&2g();a.1g.2f(!0,1j 0,b);"8"===B m&&m(f)}l=l||1;U(1>l)S f;U(c.1Y){U("V"===B i.G.P.F[b[1]])S d("N\\Q 1k 1y\\1v 4e 1N 21 1w 1O. A 4l 4s \\1L 4t 4u 2E: i.G.P.F["+b[1]+"]"),f;i.G.P.F[b[1]].1s=l;i.G.P.F[b[1]].1o=b[1];t.7c([i.G.P.F[b[1]]],["F","2A","2n"]).2k(8(a){i.G.P=a;e(!0)}).2m(8(a){d(["N\\Q 1k 1y\\1v 4r a 7b 77 76 2j 1K",a]);e()})}1F d("78\\1C\\Q 25 m\\2v 25 2x")};g.4c=8(b,g){8 e(b){b="4d"!==B b?!1:b;"V"!==B i.K&&"8"===B i.K.1D&&i.K.1D.1h(J);"8"===B 2g&&2g();a.1g.2f(!0,1j 0,b);"8"===B g&&g(f)}E f=!1,h=a(b).15("X-Y-1o");U(c.1Y){U("V"===B i.G.P.F[h])S d("N\\Q 1k 1y\\1v 4e 1N 21 1w 1O. A 4l 4s \\1L 4t 4u 2E: i.G.P.F["+h+"]"),f;i.G.P.F[h].1o=h;t.6y([i.G.P.F[h]],["F","2A","2n"]).2k(8(a){f=!0;i.G.P=a;u(a);e(!0)}).2m(8(a){d(["N\\Q 1k 1y\\1v 6E o 1O 1w 1K",a]);e()})}1F 2N("4o\\1C\\Q, 2X m\\2v 25 2x.")};g.2u=8(b,c,d,f){f=f||a(".6-7-2O, .6-7-2D");b=b||"+";c=c||.9*f.6O();f.4p(!0,!0).6G({7H:2L(d)?b+"="+c+"7G":d})};c.29||(g.1P(),a.1g.2f(!0));a(i).1c("7R.4n 7J.1f.4n",8(){1e{i.G.P=1j 0,g.1P()}1b(e){d("4q 2W 4r 1N 21 1w 1K a 7D 1w 7q 4m 3a. 4f: "+e.3c,"7o")}});"8"===B c.1V?c.1V.1h(J):d("7n n\\Q \\1L 39 4w\\1C\\Q")};a.1g.1U=8(b){E d;d=a(J);d.1g=32 a.1U(J,b);S d}}1b(l){"V"!==B M&&"8"===B M.1d&&M.1d("2t! ",l)}})(J);(8(n){1e{E a=31;i.K=i.K||{};i.K.F={};i.K.1T=!1;i.K.7j=!1;i.K.7k=!1;E d=8(){E b,d,m,c;U(i.K.1T){d=!1;m={};i.K.F={};2a(c 2c i.G.P.F)"1t"===B i.G.P.F[c]&&(b=i.G.P.F[c],"V"!==B b.14&&7m!==b.14&&""!==b.14&&(i.K.F["1G"+b.14]=i.K.F["1G"+b.14]||{},i.K.F["1G"+b.14].4g=b.14,m["1G"+b.14]||(i.K.F["1G"+b.14].1M=0),i.K.F["1G"+b.14].1M+=b.1s,d=!0,m["1G"+b.14]=!0));c=d}1F c=1j 0;i.K.1T&&(a(".6-1r-1A").22(),a(".6-1r-1O-37").W("6-1r-1O-37"));2a(E n 2c i.K.F){b=i.K.F[n];U("1t"!==B b)S;m=a("24.6-14[2Q="+b.4g+"]").4h("7t");U(i.K.1T||!m.I(".6-1r-1A").1u)d=a(\'<H D="6-1r-1A" 7B="4y 2j 1K 4A 2X 4B."><H D="6-1r-4x"><H D="6-1r-1M"></H></H></H>\'),d.I(".6-1r-1M").1i(b.1M),b=m.I(".7s"),b.1u?b.4D(d).11("6-1r-1O-37"):m.4D(d)}c&&(i.K.1T=!1)};i.K.1D=8(){i.K.1T=!0;d.1h(J)};a(2o).4M(8(){d.1h(J)})}1b(b){"V"!==B M&&"8"===B M.1d&&M.1d("2t! ",b)}})(J);(8(){1e{E n=31,a,d={2w:".50",2b:{},2r:{}};n.5i=8(b){E l={};a=n.4z(!0,{},d,b);b=n(a.2w).1U(a.2b);l.2r="V"!==B a.2b.29&&!1===a.2b.29?n(a.2w).4F(b.1g,a.2r):n(a.2w).4F(a.2r);l.2b=b;S l};n.1g.2Y=8(){"1t"===B M&&"8"===B M.1I&&M.1I("O 5h 2U n\\Q \\1L 4Y 4T 4U 69. A 6a\\Q 5s 64\\5Y 25 6n 4k 5F\\5A 5z e 5u 1N 5t 5L \\5M 2G 2H.")};n.2Y=n.1g.2Y}1b(b){"V"!==B M&&"8"===B M.1d&&M.1d("2t! ",b)}})();',62,491,'||||||qd|ddc|function||||||||||window|||||||||||||||||||typeof|div|class|var|items|_QuatroDigital_DropDown|span|find|this|_QuatroDigital_AmountProduct||console|||getOrderForm|u00e3o||return|25C2|if|undefined|removeClass|data|sku||texts|addClass|||productId|attr|||||val|catch|bind|error|try|vtex|fn|call|html|void|foi|loading|cartTotal|checkout|index|_QuatroDigital_CartData|replace|bap|quantity|object|length|u00edvel|do|25A8pbz|poss|href|wrapper|js|u00e7|exec|shipping|else|prod_|join|info|u0391|carrinho|u00e9|qtt|os|item|getCartInfoByUrl|add|id|click|allowRecalculate|QD_dropDownCart|callback|25A8oe|prodCell|smartCheckout|cart|body|dados|remove|each|input|esta|||cartIsEmpty|updateOnlyHover|for|dropDown|in|allowUpdate|emptyCart|simpleCart|adminCart|changeQantity|keyup|no|done|sellingPrice|fail|shippingData|document|DropDown|vtexjs|buyButton|bb|Oooops|scrollCart|u00e9todo|selector|descontinuado|callbackProductsList|obter|totalizers|warn|com|prodWrapper2|SKU|apply|Quatro|Digital|append|skuName|25A8pbypunbarg|isNaN|noItems|alert|prodWrapper|D1|value|qd_ddc_continueShopping|82|empty|Cart|parseInt|ao|este|smartCart|toLowerCase|qd_ddc_closeFn|jQuery|new|quantityMore|quantityMinus|total|u00e1|added|prodRow|uma|VTEX|timeRemoveNewItemClass|message|actionButtons|qd_on|preventDefault|prodQttWrapper|loaded|product|lastSku|lastAddedFixed|setTimeout|lastAdded|CEP|rendered|aviso|alerta|src|insertProdImg|um|infoTotalShipping|scrollDown|scrollUp|lightBoxBodyProdAdd|u0472|qd_ddc_hover|u2202|84|linkCart|viewCart|lightBoxProdAdd|label|biblioteca|encontrada|min|SDK|br|io|cep|qd_ddc_lightBoxClose|row|B8|E0|clearfix|type|renderProductsList|25A8igrkpbzzreprfgnoyr|jjj|prodName|25A8igrkpbzzreprorgn|image|prodPrice|prodLoaded|infoAllTotal|linkCheckout|C2|continueShopping|infoTotal|shippingForm|infoTotalItems|infoTotalValue|cartContainer|tentar|time|removeProduct|boolean|localizar|Detalhes|prodId|getParent|frete|qdDdcLastPostalCode|tem|chave|da|qdDdcVtex|Aten|stop|Problemas|atualizar|buscada|composta|pelo|postalCode|fun|wrapper2|Itens|extend|para|produto|shippingCalculate|prepend|keyCode|QD_buyButton|qd_ddc_change|Compra|Subtotal|Frete|Seu|nenhum|ajaxStop|ainda|Finalizar|Total|wrapper3|u03a1|u0ae8|iniciado|desta|u00a1|u0aef|u0abd|mais|Ir|qdDdcContainer|u0472J|u01ac|Carrinho|Calcular|buscar|executado|Script|name|CDN|ser|dataType|async|url|ajax|5E3|u2113|Smart|QD_smartCart|script|Comprando|aqui|por|placeholder|execu|tel|par|Continuar|que|direitos|todos|25C|25A8dhngebqvtvgny|barg|25A8igrk|restrita|u00e7a|u00a8|zA|encodeURIComponent|escape|licen|ti|pbypun|nbarg|jj|pb|reservados|u00e0|Callbacks|unshift|ypunbarg|pby|unbarg|pbypu|pbyp|25A8igrkpbzzrepr|punbarg|String|fromCharCode|u00ea|A1|A1g|83d|8F|CF|voc|products|u0e17|u00c3|eval|forma|vers|C5|qu|indexOf|ite|co|toUpperCase|charCodeAt|90|122|mm|erc|rc|executando|ls|break|tr|u221a|infoBts|100|imageUrl|qd_number_format|u00e1tis|Gr|removeItems|appendTo|nos|base|definir|address|remover|prodLoading|animate|text|prodQtt|column4|column3|qttLoading|column5|prodRowLoading|height|removeWrapper|prodRemove|filter|is|nem|Contacte|imagem|URL|informada|SAC|slideUp|qd_ddc_minus|qd_ddc_more|qd_ddc_remove|not|calculateShipping|load|itens|de|aten|parent|outerHeight|quantidade|updateItems|country|BRA|calcular|updateCartData|column2|availability|buyButtonClicked|quickViewUpdate|imgLoading|null|Callback|avisso|off|eveento|on|qd_bap_wrapper_content|li|mouseenter|qd_ddc_scrollUp|qd_ddc_scrollDown|qd_ddc_cep|setInterval|600|clearInterval|title|mouseleave|partir|clone|Este|px|scrollTop|orderform|minicartUpdated|QD_checkoutQueue|focusout|qd_ddc_lightBoxOverlay|requisi|qd_ddc_prodRow|prodImgWrapper|allTotal|productAddedToCart|img|column1|prodImg'.split('|'),0,{}));
/* Quatro Digital Amazing Menu // 2.13 // Carlos Vinicius // Todos os direitos reservados */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(3(k){6 a,n,h,p;a=2o;E("3"!==I a.Y.T){n={U:"/8-1B-W",1h:3(){},1i:3(){}};6 l=3(a,b){E("1K"===I B&&"V"!==I B.1a&&"V"!==I B.X&&"V"!==I B.1l){6 c;"1K"===I a?(a.2n("[1M 1I 1H]\\n"),c=a):c=["[1M 1I 1H]\\n"+a];E("V"===I b||"1P"!==b.P()&&"2p"!==b.P())E("V"!==I b&&"X"===b.P())R{B.X.1j(B,c)}M(g){R{B.X(c.K("\\n"))}M(e){}}1F R{B.1a.1j(B,c)}M(g){R{B.1a(c.K("\\n"))}M(e){}}1F R{B.1l.1j(B,c)}M(g){R{B.1l(c.K("\\n"))}M(e){}}}};a.Y.1e=3(){6 f=a(i);f.F(3(b){a(i).w("8-7-J-"+b)});f.1k().w("8-7-1k");f.1G().w("8-7-1G");C f};a.Y.T=3(){};k=3(a){6 b={j:"2q%5%1d%5%H",2r:"2m%5%H",2l:"2g%5%2f%5%H%5%Q",2h:"2i%5%1q%5%H%5%Q",2k:"2j%5%1x%5%H%5%Q",2s:"2t%5%2e%5%2C%5%H%5%Q","1A%2E":"2%1d%5%1q%5%H%5%Q","1A%5":"%1d%5%1x%5%H%5%Q"};C 3(a){6 c,e,d,m;e=3(a){C a};d=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o","b"];a=a["d"+d[16]+"c"+d[17]+"m"+e(d[1])+"n"+d[13]]["l"+d[18]+"c"+d[0]+"2F"+e("o")+"n"];c=3(a){C 2G(2B(a.15(/\\./g,"\\2A").15(/[a-2v-Z]/g,3(a){C 2u.2w(("Z">=a?2x:2z)>=(a=a.2y(0)+13)?a:a-26)})))};6 q=c(a[[d[9],e("o"),d[12],d[e(13)]].K("")]);c=c((14[["2H",e("21"),"m",d[1],d[4].1Y(),"20"].K("")]||"---")+[".v",d[13],"e",e("x"),"1X",e("1Z"),"2d",d[1],".c",e("o"),"m.",d[19],"r"].K(""));2a(6 f 2b b){E(c===f+b[f]||q===f+b[f]){m="2c"+d[17]+"e";29}m="f"+d[0]+"28"+e(d[1])+""}e=!1;-1<a[[d[12],"e",d[0],"23",d[9]].K("")].24("25%1N%1U%1W%1f%1b%1f%22%27%2D%1J%2O%1J%3r%1f%1b%1N%1U%1W%3p%1b")&&(e=!0);C[m,e]}(a)}(14);E(!3t(k[0]))C k[1]?l("\\3g\\3d\\1p \\3i\\O\\3m\\3k\\1n\\O\\1n\\1p \\3l\\O\\2I\\O \\3n\\3u\\3v\\O L\\3q\\O!"):!1;p=3(f){6 b,c,g;g=f.D(".3h");b=g.1T(".8-7-1m");c=g.1T(".8-7-1L");E(b.G||c.G)b.11().w("8-7-1m-1V"),c.11().w("8-7-1L-1V"),a.3b({U:h.U,3c:"2T",2U:3(e){6 d=a(e);b.F(3(){6 c,b;b=a(i);c=d.D("2V[2Q=\'"+b.1w("1O-1o-1y")+"\']");c.G&&(c.F(3(){a(i).1z(".2P-1m").1r().1s(b)}),b.1t())}).w("8-7-1u-1v");c.F(3(){6 c={},b;b=a(i);d.D("2K").F(3(){E(a(i).1S().1c().P()==b.1w("1O-1o-1y").1c().P())C c=a(i),!1});c.G&&(c.F(3(){a(i).1z("[2J*=\'2L\']").1r().1s(b)}),b.1t())}).w("8-7-1u-1v")},1a:3(){l("N\\1Q 2W 2X\\37 36 38 39 1R W. A U \'"+h.U+"\' 34.")},2Z:3(){h.1i.1E(i);a(14).1C("1D.7.1i",f)},2Y:30})};a.T=3(f){6 b=f.D("S[31]").F(3(){6 c,b;c=a(i);E(!c.G)C l(["32 1R W n\\1Q 2R",f],"1P");c.D("J >S").11().w("8-7-33-S");c.D("J").F(3(){6 b=a(i),c;c=b.10(":35(S)");c.G&&b.w("8-7-3a-"+c.1k().1S().1c().2N().15(/\\./g,"").15(/\\s/g,"-").P())});b=c.D(">J").1e();c.w("8-1B-W");b=b.D(">S");b.F(3(){6 b=a(i);b.D(">J").1e().w("8-7-2M");b.w("8-7-1g-W");b.11().w("8-7-1g")});b.w("8-7-1g");6 e=0,d=3(a){e+=1;a=a.10("J").10("*");a.G&&(a.w("8-7-2S-"+e),d(a))};d(c);c.3s(c.D("S")).F(3(){6 b=a(i);b.w("8-7-"+b.10("J").G+"-J")})});p(b);h.1h.1E(i);a(14).1C("1D.7.1h",f)};a.Y.T=3(f){6 b=a(i);E(!b.G)C b;h=a.3e({},n,f);b.3j=3f a.T(a(i));C b};a(3(){a(".3o").T()})}})(i);',62,218,'|||function||25C2|var|am|qd||||||||||this||||||||||||||addClass|||||console|return|find|if|each|length|25A8pbz|typeof|li|join||catch||u0391|toLowerCase|25A8oe|try|ul|QD_amazingMenu|url|undefined|menu|info|fn||children|parent|||window|replace|||||error|82|trim|25A8pbypunbarg|qdAmAddNdx|D1|dropdown|callback|ajaxCallback|apply|first|warn|banner|u2202|qdam|u0472|25A8igrkpbzzreprorgn|clone|insertBefore|hide|content|loaded|attr|25A8igrkpbzzreprfgnoyr|value|getParent|jjj|amazing|trigger|QuatroDigital|call|else|last|Menu|Amazing|C2|object|collection|QD|E0|data|alerta|u00e3o|do|text|filter|B8|wrapper|84|co|toUpperCase|mm|ite|no|8F|rc|indexOf|qu||CF|ls|break|for|in|tr|erc|25A8igrk|25A8igrkpbzzrepr|punbarg|pbyp|unbarg|nbarg|pbypu|pby|ypunbarg|unshift|jQuery|aviso|jj|pb|pbypun|barg|String|zA|fromCharCode|90|charCodeAt|122|u00a8|encodeURIComponent|25A8dhngebqvtvgny|83d|25C|ti|escape|js|u0ae8|class|h2|colunas|column|replaceSpecialChars|A1g|box|alt|encontrada|level|html|success|img|foi|poss|clearQueueDelay|complete|3E3|itemscope|UL|has|falho|not|obter|u00edvel|os|dados|elem|qdAjax|dataType|u00c3|extend|new|u0e17|qd_am_code|u221a|exec|u00a1|u03a1|u2113|u0aef|qd_amazing_menu_auto|C5|u0472J|A1|add|eval|u0abd|u01ac'.split('|'),0,{}));
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);