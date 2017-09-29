/**
* Funções base
*/
String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")});
"function"!==typeof String.prototype.replaceSpecialChars&&(String.prototype.replaceSpecialChars=function(){var b={"\u00e7":"c","\u00e6":"ae","\u0153":"oe","\u00e1":"a","\u00e9":"e","\u00ed":"i","\u00f3":"o","\u00fa":"u","\u00e0":"a","\u00e8":"e","\u00ec":"i","\u00f2":"o","\u00f9":"u","\u00e4":"a","\u00eb":"e","\u00ef":"i","\u00f6":"o","\u00fc":"u","\u00ff":"y","\u00e2":"a","\u00ea":"e","\u00ee":"i","\u00f4":"o","\u00fb":"u","\u00e5":"a","\u00e3":"a","\u00f8":"o","\u00f5":"o",u:"u","\u00c1":"A","\u00c9":"E", "\u00cd":"I","\u00d3":"O","\u00da":"U","\u00ca":"E","\u00d4":"O","\u00dc":"U","\u00c3":"A","\u00d5":"O","\u00c0":"A","\u00c7":"C"};return this.replace(/[\u00e0-\u00fa]/ig,function(a){return"undefined"!=typeof b[a]?b[a]:a})});
Array.prototype.indexOf||(Array.prototype.indexOf=function(d,e){var a;if(null==this)throw new TypeError('"this" is null or not defined');var c=Object(this),b=c.length>>>0;if(0===b)return-1;a=+e||0;Infinity===Math.abs(a)&&(a=0);if(a>=b)return-1;for(a=Math.max(0<=a?a:b-Math.abs(a),0);a<b;){if(a in c&&c[a]===d)return a;a++}return-1});
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs();a.trigger("QuatroDigital.pt_callback",[a])}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return a.length?$.extend({},a,new b(a)):a},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();

try {
	var Common = {
		run: function() {},
		init: function() {
			Common.qdOverlay();
			Common.vtexBindQuickViewDestroy();
			Common.accessoriesFix();
			Common.applyAmazingMenu();
			Common.applyAmazingMenuMobile();
			Common.applyMosaicBanners();
			Common.applySmartCart();
			Common.applyCarouselShelf();
			Common.openSearchModal();
			Common.saveAmountFix();
			Common.setDataScrollToggle();
			Common.showFooterContent();
		},
		ajaxStop: function() {
			Common.appendSkuPopUpCloseBtn();
			Common.saveAmountFix();
		},
		windowOnload: function() {},
		vtexBindQuickViewDestroy: function() {
			window.bindQuickView = function() {};
		},
		qdOverlayClass: 'qd-am-on qd-cart-show qd-sn-on',
		qdOverlay: function() {
			$('.components-qd-v1-overlay').click(function() {
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		},
		accessoriesFix: function() {
			if (!$(document.body).is('.produto'))
				return;

			$('fieldset >.buy-product-checkbox').parent().each(function() {
				var $t  = $(this);
				$t.add($t.prev('ul')).wrapAll('<div class="accessories-qd-v1-item col-xs-12 col-sm-6 col-md-3"/>');
			});
		},
		appendSkuPopUpCloseBtn: function() {
			$('<span class="modal-qd-v1-box-popup-close">Fechar</span>').insertBefore('.boxPopUp2 .selectSkuTitle');

			$('.modal-qd-v1-box-popup-close').click(function() {
				$(window).trigger('vtex.modal.hide');
				return false;
			});
		},
		applyAmazingMenu: function() {
			$('.header-qd-v1-amazing-menu').QD_amazingMenu({
				callback: function() {
					$('ul.qd-am-dropdown-menu').each(function() {
						$(this).wrapInner('<li class="container"><ul></ul></li>');
					});
				}
			});
		},
		applyAmazingMenuMobile: function() {
			var wrapper = $('.header-qd-v1-amazing-menu-mobile');

			wrapper.QD_amazingMenu({
				callback: function() {
					$('<span class="qd-am-dropdown-trigger"><i class="fa fa-caret-down"></i></span>').appendTo(wrapper.find('.qd-am-has-ul')).click(function() {
						var $t = $(this);
						$t.parent().toggleClass('qd-am-is-active');

						$t.siblings('ul').stop(true, true).slideToggle();
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
		applyCarouselShelf: function() {
			var wrapper = $('.carousel-qd-v1-shelf .prateleira');

			if (!wrapper.length)
				return false;

			wrapper.each(function() {
				var $t = $(this);

				$t.find('h2').prependTo($t.parent());
			});

			wrapper.slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: 4,
				slidesToScroll: 4,
				infinite: true,
				draggable: false,
				speed: 700,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3
						}
					},

					{
						breakpoint: 991,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},

					{
						breakpoint: 600,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
		},
		applyMosaicBanners: function() {
			$('.mosaic-qd-v1-wrapper .box-banner').QD_mosaicBanners({
				containerWidth: 1326,
				classFourColumn: "col-xs-12 col-sm-6 col-md-3"
			});

			$('.mosaic-qd-v2-wrapper .box-banner').QD_mosaicBanners({
				bannerColSecurityMargin: -30,
				containerWidth: 1326,
				classFourColumn: "col-xs-12 col-sm-6 col-md-3"
			});
		},
		applySmartCart: function() {
			$('.header-qd-v1-actions-cart').append('<div class="smart-cart-qd-v1-wrapper"><div class="qd-sc-wrapper"></div></div>');

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
		openSearchModal: function() {
			$('.header-qd-v1-actions-search').click(function() {
				$('.modal-qd-v1-search').modal();
				return false;
			});
		},
		saveAmountFix: function() {
			$('.shelf-qd-v1-highlight-discount-percentage:not(.qd-on)').addClass('qd-on').each(function() {
				var $t = $(this);
				$t.text(($t.text().trim().match(/[0-9]+/) || [""]).pop() + '%');
			});
		},
		setDataScrollToggle: function() {
			$(document.body).attr('data-qd-scroll-limit', '0');
		},
		showFooterContent: function() {
			$('.footer-qd-v1-mobile-collapse-trigger').click(function(e) {
				e.preventDefault();
				$(this).addClass('qd-is-hide');
				$('.footer-qd-v1-mobile-collapse').addClass('qd-is-active');
			});
		}
	};

	var Home = {
		init: function() {
			// Home.openModalVideoInstitutional();
			Home.sliderFull();
			Home.applyBrandCarousel();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		applyBrandCarousel: function () {
			var wrapper = $('.carousel-qd-v1-brand');

			wrapper.slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: 5,
				slidesToScroll: 5,
				infinite: true,
				speed: 700,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 4,
							slidesToScroll: 4
						}
					},

					{
						breakpoint: 991,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3
						}
					},

					{
						breakpoint: 550,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},

					{
						breakpoint: 380,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
		},
		openModalVideoInstitutional: function() {
			$('.home-qd-v1-video-poster').click(function(e) {
				$('.modal-qd-v1-home-video').modal('show');
				return false;
			});
		},
		sliderFull: function() {
			$('.slider-qd-v1-full').slick({
				dots: true,
				fade: true,
				cssEase: 'linear',
				infinite: true,
				speed: 500,
				draggable: false
			});
		}
	};

	var Search = {
		init: function() {
			Search.openFiltersMenu();
			Search.shelfLineFix();
		},
		ajaxStop: function() {
			Search.shelfLineFix();
		},
		windowOnload: function() {
			Search.shelfLineFix();
		},
		openFiltersMenu: function() {
			$('.search-qd-v1-navigator-trigger').click(function(e) {
				e.preventDefault();
				$(document.body).toggleClass('qd-sn-on');
			});
		},
		shelfLineFix: function() {
			try {
				var exec = function() {
					var curTop;
					var wrapper = $("div[id*='ResultItems_'] >.prateleira:not('.qd-fi-on')").addClass('qd-fi-on');

					var shelf = wrapper.children("ul").removeClass('qd-first-line');
					shelf.first().addClass("qd-first-line");

					var setFirst = function() {
						shelf.each(function(){
							var $t = $(this);

							if($t.is(".qd-first-line")){
								curTop = $t.offset().top;
								shelf = shelf.not($t);
								return;
							}

							var offsetTop = $t.offset().top;
							if (offsetTop >= curTop - 10 && offsetTop <= curTop + 10)
								shelf = shelf.not($t);
							else{
								$t.addClass("qd-first-line");
								return false;
							}
						});

						if(shelf.length)
							setFirst();
					};
					setFirst();
				};
				exec();

				// Olhando para o Smart Research
				if(!window.qd_shelf_line_fix_){
					$(window).on("QuatroDigital.sr_shelfCallback", exec);
					window.qd_shelf_line_fix_ = true;
				}

				// Olhando para o evento window resize
				var resize = $._data(window).events.resize;
				var allowResize = true;
				if(resize)
					for(var i = 0; i < resize.length; i++){
						if(resize[i].namespace == "qd"){
							allowResize = false;
							break;
						}
					}
				if(allowResize){
					var timeOut = 0;
					$(window).on("resize.qd", function(){
						clearTimeout(timeOut);
						timeOut = setTimeout(function() {
							$(".qd-first-line").removeClass(".qd-first-line");
							exec();
						}, 20);
					});
				}
			}
			catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: " + e.message)); }
		}
	};

	var Product = {
		run: function() {},
		init: function() {
			// Product.forceImageZoom();
			Product.applyCarouselThumb(); $(window).on('skuSelected.vtex', Product.applyCarouselThumb);
			Product.accessoriesApplyCarousel();
			Product.openShipping();
			Product.saveAmountFlag();
			Product.scrollToDescription();
			Product.setAvailableBodyClass();
			Product.wrapProductSpecification();
			Product.splitDescription();
			Product.applyTipBarCarousel();
			Product.showFloatingBuyBar();
		},
		ajaxStop: function() {
			Product.addCloseBtnFreightTable();
		},
		windowOnload: function() {},
		accessoriesApplyCarousel: function() {
			$('.accessories-qd-v1-item').wrapAll('<div class="accessories-qd-v1-carousel"></div>');

			$('.accessories-qd-v1-carousel').slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: 4,
				slidesToScroll: 4,
				infinite: true,
				draggable: false,
				speed: 700,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3
						}
					},

					{
						breakpoint: 991,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},

					{
						breakpoint: 600,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
		},
		applyTipBarCarousel: function() {
			var wrapper = $('.tip-bar-qd-v1-carousel');

			if (!wrapper.length)
				return;

			wrapper.find('[class*="col-"]').each(function(){
				$(this).removeAttr('class');
				$(this).addClass('col-xs-12 col-md-6');
			});

			wrapper.slick({
				arrows: false,
				autoplay: true,
				slidesToShow: 2,
				slidesToScroll: 2,
				infinite: true,
				draggable: false,
				responsive:[
					{
						breakpoint: 991,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
		},
		splitDescription: function() {
			var wrapper = $('.product-qd-v1-description-wrapper .row').first();
			var measuresEl = wrapper.find('h4.Medidas, h4.Medida');

			if(measuresEl.length > 0) // Verifica se existe Medidas
				measuresEl = measuresEl.wrap('<div class="col-xs-12"><div class="product-qd-v1-specification"><div class="h1 h2 h3 h4 h5 h6 p ul dl"></div></div></div>').after(wrapper.find('table.Medidas, table.Medida')).closest('.col-xs-12').appendTo(wrapper);

			var columns = wrapper.find('[class*=col-xs-12]:not(:first-child)');
			columns.removeClass(function(){ // Remove classe col-md-*
				var match = $(this).attr('class').match(/col-md-\d{1,2}/g);
				if(match == null)
					return '';
				return match[0];
			}).addClass(function() { // Adiciona classe col-md-* nova baseada no nº de colunas (MAX: col-md-6, MIN: col-md-3)
				return 'col-md-' + (Math.min(6, Math.max(3, Math.round(12 / columns.length))));
			});
		},
		addCloseBtnFreightTable: function() {
			var elem = $('.freight-values');

			if (!$('#calculoFrete').length) $('.product-qd-v1-shipping').hide();
			else $('.product-qd-v1-shipping').show();

			if (elem.length > 0 && elem.is(':visible'))
				$('<span class="close"/>').bind('click', function() {
					elem.fadeToggle('fast', 'linear');
				}).appendTo(elem);
		},
		applyCarouselThumb: function() {
			var thumbsSliderWrapper = $('.product-qd-v1-image-thumbs-mobile'); // Wrapper onde foi inserido as thumbs

			thumbsSliderWrapper.slick({
  				slidesToShow: 5,
  				arrows: false,
  				infinite: false,
  				dots: false,
  				responsive: [
  					{
  						breakpoint: 600,
  						settings: {
  							slidesToShow: 3
  						}
  					}
  				]
			});
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
		},
		openShipping: function() {
			if( typeof window.ShippingValue === "function" )
				window.ShippingValue();
		},
		saveAmountFlag: function() {
			var flag = $('.product-qd-v1-stamps-highlight-discount');

			$(window).on('skuSelected.vtex', function(e, sku, data) {
				if (!flag.length)
					flag = $('<div class="product-qd-v1-stamps-highlight-discount"></div>').prependTo('.product-qd-v1-stamps');

				if (data.listPrice > data.bestPrice)
					flag.text(parseInt(100 - data.bestPrice / data.listPrice * 100) + "%").show();
				else
					flag.hide();
			});

			if (skuJson.skus.length >= 1) {
				if (!flag.length)
					flag = $('<div class="product-qd-v1-stamps-highlight-discount"></div>').prependTo('.product-qd-v1-stamps');

				if (skuJson.skus[0].listPrice > skuJson.skus[0].bestPrice)
					flag.text(parseInt(100 - skuJson.skus[0].bestPrice / skuJson.skus[0].listPrice * 100) + "%").show();
			}
		},
		scrollToDescription: function() {
			$('.product-qd-v1-link-description').click(function(e) {
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $('.product-qd-v1-description-wrapper').offset().top -100
				}, 900, 'swing');
			});
		},
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
		wrapProductSpecification: function() {
			$('#caracteristicas > h4').each(function() {
				$(this).next('table').addBack().wrapAll('<div class="product-qd-v1-specification-column" />')
			});
		},
		showFloatingBuyBar: function () {
			var targetOffset = $(".product-qd-v1-buy-button").offset().top - 30;
			var elem = $(".product-floating-bar-buy");

			var $w = $(window).scroll(function () {

				if ($w.scrollTop() > targetOffset) {
					elem.addClass("active");
				}
				else {
					elem.removeClass("active");
				}

			});
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
			Institutional.sidemenuToggle();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		sidemenuToggle:function() {
			// Amazing Menu Responsivo
			$('.institucional-qd-v1-menu-toggle-wrap').click(function(evt) {
				evt.preventDefault();
				$(document.body).addClass('qd-sn-on');
			});
		},
		formCadastreMask: function() {
			var form = $(".form-qd-v1");

			if (!form.length || typeof $.fn.mask !== "function")
				return;

			form.find('[name=qd_form_cpnj]').mask('00.000.000/0000-00');
			form.find('[name=qd_form_cpf]').mask('000.000.000-00');
			form.find('[name=qd_form_phone]').mask('(00) 0000-00009');
			form.find('[name=qd_form_celphone]').mask('(00) 0000-00009');
			form.find('[name=qd_form_zipcode]').mask('00000-000');
			form.find('[name=qd_form_ie]').mask('###.###.###.###.###');
			form.find('[name=qd_form_birthdate]').mask('00/00/0000');
		},
		checkEmailExist: function(email){
			window.QD_checkEmailExist_request = window.QD_checkEmailExist_request || $.ajax({
				url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/CL/search",
				data: {"_fields": "id", "email": email},
				type: "GET",
				dataType: "json",
				headers: {Accept: "application/vnd.vtex.ds.v10+json"},
				success: function(data) {
					if(data.length)
						alert("Este e-mail já existe em nosso cadastro. Para maiores informações por favor entre em contato com o Atendimento ao Cliente.");
				},
				complete: function(){
					window.QD_checkEmailExist_request = undefined;
				}
			});

			return window.QD_checkEmailExist_request;
		},
		checkCnpjExist: function(cnpj){
			window.QD_checkCnpjExist_request = window.QD_checkCnpjExist_request || $.ajax({
				url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/CL/search",
				data: {"_fields": "id", "corporateDocument": cnpj.replace(/[^0-9]/ig, "")},
				type: "GET",
				dataType: "json",
				headers: {Accept: "application/vnd.vtex.ds.v10+json"},
				success: function(data) {
					if(data.length)
						alert("Este CNPJ já existe em nosso cadastro. Para maiores informações por favor entre em contato com o Atendimento ao Cliente.");
				},
				complete: function(){
					window.QD_checkCnpjExist_request = undefined;
				}
			});

			return window.QD_checkCnpjExist_request;
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
/* $("a").getParent("ul"); // 3 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT */
(function(a){a.fn.getParent=a.fn.closest})(jQuery);
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
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

/* Quatro Digital Amazing Menu */
var _0x2ef3=['qdAjax','url','img[alt=\x27','attr','data-qdam-value','.box-banner','insertBefore','hide','qd-am-content-loaded','text','trim','[class*=\x27colunas\x27]','clone','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','call','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','children',':not(ul)','qd-am-elem-','>li','qdAmAddNdx','qd-amazing-menu','>ul','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','add','qd-am-','-li','callback','QuatroDigital.am.callback','extend','exec','.qd_amazing_menu_auto','getParent','closest','QD_amazingMenu','undefined','error','info','warn','object','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','join','each','addClass','first','last','qd-am-last','replace','charCodeAt','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','qd-am-banner-wrapper','parent','qd-am-collection-wrapper'];(function(_0x3dd15e,_0x1f0015){var _0x231fd0=function(_0x4f680a){while(--_0x4f680a){_0x3dd15e['push'](_0x3dd15e['shift']());}};_0x231fd0(++_0x1f0015);}(_0x2ef3,0xba));var _0x32ef=function(_0x5c2704,_0x4735a2){_0x5c2704=_0x5c2704-0x0;var _0x5522e0=_0x2ef3[_0x5c2704];return _0x5522e0;};(function(_0x4d5ac8){_0x4d5ac8['fn'][_0x32ef('0x0')]=_0x4d5ac8['fn'][_0x32ef('0x1')];}(jQuery));(function(_0x26e56e){var _0x3944df;var _0x38047b=jQuery;if('function'!==typeof _0x38047b['fn'][_0x32ef('0x2')]){var _0x38b7f3={'url':'/qd-amazing-menu','callback':function(){},'ajaxCallback':function(){}};var _0x402857=function(_0x37dd1d,_0x4c8104){if('object'===typeof console&&_0x32ef('0x3')!==typeof console[_0x32ef('0x4')]&&_0x32ef('0x3')!==typeof console[_0x32ef('0x5')]&&_0x32ef('0x3')!==typeof console[_0x32ef('0x6')]){var _0x2484a0;_0x32ef('0x7')===typeof _0x37dd1d?(_0x37dd1d[_0x32ef('0x8')](_0x32ef('0x9')),_0x2484a0=_0x37dd1d):_0x2484a0=['[QD\x20Amazing\x20Menu]\x0a'+_0x37dd1d];if('undefined'===typeof _0x4c8104||_0x32ef('0xa')!==_0x4c8104[_0x32ef('0xb')]()&&_0x32ef('0xc')!==_0x4c8104[_0x32ef('0xb')]())if('undefined'!==typeof _0x4c8104&&_0x32ef('0x5')===_0x4c8104['toLowerCase']())try{console[_0x32ef('0x5')]['apply'](console,_0x2484a0);}catch(_0x3e98df){try{console[_0x32ef('0x5')](_0x2484a0['join']('\x0a'));}catch(_0x539d18){}}else try{console[_0x32ef('0x4')]['apply'](console,_0x2484a0);}catch(_0x326fce){try{console[_0x32ef('0x4')](_0x2484a0[_0x32ef('0xd')]('\x0a'));}catch(_0x54c7f5){}}else try{console['warn']['apply'](console,_0x2484a0);}catch(_0x531e30){try{console[_0x32ef('0x6')](_0x2484a0[_0x32ef('0xd')]('\x0a'));}catch(_0xb5aed2){}}}};_0x38047b['fn']['qdAmAddNdx']=function(){var _0x5d559b=_0x38047b(this);_0x5d559b[_0x32ef('0xe')](function(_0x1a9476){_0x38047b(this)[_0x32ef('0xf')]('qd-am-li-'+_0x1a9476);});_0x5d559b[_0x32ef('0x10')]()[_0x32ef('0xf')]('qd-am-first');_0x5d559b[_0x32ef('0x11')]()[_0x32ef('0xf')](_0x32ef('0x12'));return _0x5d559b;};_0x38047b['fn'][_0x32ef('0x2')]=function(){};_0x26e56e=function(_0x445cda){var _0x3aec05={'n':'dhnevhf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x3c5b78){var _0x5cc3ef=function(_0x309866){return _0x309866;};var _0x3a20ca=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3c5b78=_0x3c5b78['d'+_0x3a20ca[0x10]+'c'+_0x3a20ca[0x11]+'m'+_0x5cc3ef(_0x3a20ca[0x1])+'n'+_0x3a20ca[0xd]]['l'+_0x3a20ca[0x12]+'c'+_0x3a20ca[0x0]+'ti'+_0x5cc3ef('o')+'n'];var _0x49f2d8=function(_0x1af371){return escape(encodeURIComponent(_0x1af371[_0x32ef('0x13')](/\./g,'¨')[_0x32ef('0x13')](/[a-zA-Z]/g,function(_0x55f7f2){return String['fromCharCode'](('Z'>=_0x55f7f2?0x5a:0x7a)>=(_0x55f7f2=_0x55f7f2[_0x32ef('0x14')](0x0)+0xd)?_0x55f7f2:_0x55f7f2-0x1a);})));};var _0xb30fab=_0x49f2d8(_0x3c5b78[[_0x3a20ca[0x9],_0x5cc3ef('o'),_0x3a20ca[0xc],_0x3a20ca[_0x5cc3ef(0xd)]][_0x32ef('0xd')]('')]);_0x49f2d8=_0x49f2d8((window[['js',_0x5cc3ef('no'),'m',_0x3a20ca[0x1],_0x3a20ca[0x4]['toUpperCase'](),'ite'][_0x32ef('0xd')]('')]||'---')+['.v',_0x3a20ca[0xd],'e',_0x5cc3ef('x'),'co',_0x5cc3ef('mm'),'erc',_0x3a20ca[0x1],'.c',_0x5cc3ef('o'),'m.',_0x3a20ca[0x13],'r'][_0x32ef('0xd')](''));for(var _0x14d4b3 in _0x3aec05){if(_0x49f2d8===_0x14d4b3+_0x3aec05[_0x14d4b3]||_0xb30fab===_0x14d4b3+_0x3aec05[_0x14d4b3]){var _0x371540='tr'+_0x3a20ca[0x11]+'e';break;}_0x371540='f'+_0x3a20ca[0x0]+'ls'+_0x5cc3ef(_0x3a20ca[0x1])+'';}_0x5cc3ef=!0x1;-0x1<_0x3c5b78[[_0x3a20ca[0xc],'e',_0x3a20ca[0x0],'rc',_0x3a20ca[0x9]][_0x32ef('0xd')]('')][_0x32ef('0x15')](_0x32ef('0x16'))&&(_0x5cc3ef=!0x0);return[_0x371540,_0x5cc3ef];}(_0x445cda);}(window);if(!eval(_0x26e56e[0x0]))return _0x26e56e[0x1]?_0x402857(_0x32ef('0x17')):!0x1;var _0x38aed5=function(_0x338f19){var _0x2f52d7=_0x338f19[_0x32ef('0x18')](_0x32ef('0x19'));var _0x5a88a5=_0x2f52d7[_0x32ef('0x1a')](_0x32ef('0x1b'));var _0x5a04cd=_0x2f52d7[_0x32ef('0x1a')](_0x32ef('0x1c'));if(_0x5a88a5[_0x32ef('0x1d')]||_0x5a04cd[_0x32ef('0x1d')])_0x5a88a5['parent']()[_0x32ef('0xf')](_0x32ef('0x1e')),_0x5a04cd[_0x32ef('0x1f')]()[_0x32ef('0xf')](_0x32ef('0x20')),_0x38047b[_0x32ef('0x21')]({'url':_0x3944df[_0x32ef('0x22')],'dataType':'html','success':function(_0x36ac37){var _0x537214=_0x38047b(_0x36ac37);_0x5a88a5[_0x32ef('0xe')](function(){var _0x36ac37=_0x38047b(this);var _0x5a9565=_0x537214[_0x32ef('0x18')](_0x32ef('0x23')+_0x36ac37[_0x32ef('0x24')](_0x32ef('0x25'))+'\x27]');_0x5a9565[_0x32ef('0x1d')]&&(_0x5a9565['each'](function(){_0x38047b(this)['getParent'](_0x32ef('0x26'))['clone']()[_0x32ef('0x27')](_0x36ac37);}),_0x36ac37[_0x32ef('0x28')]());})[_0x32ef('0xf')](_0x32ef('0x29'));_0x5a04cd[_0x32ef('0xe')](function(){var _0x36ac37={};var _0x566b56=_0x38047b(this);_0x537214['find']('h2')['each'](function(){if(_0x38047b(this)[_0x32ef('0x2a')]()[_0x32ef('0x2b')]()[_0x32ef('0xb')]()==_0x566b56['attr']('data-qdam-value')[_0x32ef('0x2b')]()[_0x32ef('0xb')]())return _0x36ac37=_0x38047b(this),!0x1;});_0x36ac37[_0x32ef('0x1d')]&&(_0x36ac37['each'](function(){_0x38047b(this)['getParent'](_0x32ef('0x2c'))[_0x32ef('0x2d')]()[_0x32ef('0x27')](_0x566b56);}),_0x566b56[_0x32ef('0x28')]());})[_0x32ef('0xf')](_0x32ef('0x29'));},'error':function(){_0x402857(_0x32ef('0x2e')+_0x3944df[_0x32ef('0x22')]+_0x32ef('0x2f'));},'complete':function(){_0x3944df['ajaxCallback'][_0x32ef('0x30')](this);_0x38047b(window)[_0x32ef('0x31')](_0x32ef('0x32'),_0x338f19);},'clearQueueDelay':0xbb8});};_0x38047b['QD_amazingMenu']=function(_0x365125){var _0x17e489=_0x365125[_0x32ef('0x18')](_0x32ef('0x33'))[_0x32ef('0xe')](function(){var _0x33a0fb=_0x38047b(this);if(!_0x33a0fb[_0x32ef('0x1d')])return _0x402857([_0x32ef('0x34'),_0x365125],_0x32ef('0xa'));_0x33a0fb[_0x32ef('0x18')](_0x32ef('0x35'))[_0x32ef('0x1f')]()['addClass'](_0x32ef('0x36'));_0x33a0fb[_0x32ef('0x18')]('li')[_0x32ef('0xe')](function(){var _0x1733e3=_0x38047b(this);var _0x2f92f5=_0x1733e3[_0x32ef('0x37')](_0x32ef('0x38'));_0x2f92f5['length']&&_0x1733e3['addClass'](_0x32ef('0x39')+_0x2f92f5[_0x32ef('0x10')]()[_0x32ef('0x2a')]()[_0x32ef('0x2b')]()['replaceSpecialChars']()[_0x32ef('0x13')](/\./g,'')[_0x32ef('0x13')](/\s/g,'-')['toLowerCase']());});var _0x4744ba=_0x33a0fb['find'](_0x32ef('0x3a'))[_0x32ef('0x3b')]();_0x33a0fb[_0x32ef('0xf')](_0x32ef('0x3c'));_0x4744ba=_0x4744ba[_0x32ef('0x18')](_0x32ef('0x3d'));_0x4744ba[_0x32ef('0xe')](function(){var _0x3d35a1=_0x38047b(this);_0x3d35a1[_0x32ef('0x18')](_0x32ef('0x3a'))['qdAmAddNdx']()[_0x32ef('0xf')]('qd-am-column');_0x3d35a1[_0x32ef('0xf')](_0x32ef('0x3e'));_0x3d35a1[_0x32ef('0x1f')]()['addClass'](_0x32ef('0x3f'));});_0x4744ba[_0x32ef('0xf')](_0x32ef('0x3f'));var _0x241f82=0x0,_0x26e56e=function(_0x40bf12){_0x241f82+=0x1;_0x40bf12=_0x40bf12[_0x32ef('0x37')]('li')['children']('*');_0x40bf12['length']&&(_0x40bf12[_0x32ef('0xf')](_0x32ef('0x40')+_0x241f82),_0x26e56e(_0x40bf12));};_0x26e56e(_0x33a0fb);_0x33a0fb[_0x32ef('0x41')](_0x33a0fb[_0x32ef('0x18')]('ul'))[_0x32ef('0xe')](function(){var _0xd67dc9=_0x38047b(this);_0xd67dc9[_0x32ef('0xf')](_0x32ef('0x42')+_0xd67dc9[_0x32ef('0x37')]('li')[_0x32ef('0x1d')]+_0x32ef('0x43'));});});_0x38aed5(_0x17e489);_0x3944df[_0x32ef('0x44')][_0x32ef('0x30')](this);_0x38047b(window)['trigger'](_0x32ef('0x45'),_0x365125);};_0x38047b['fn'][_0x32ef('0x2')]=function(_0x2837ee){var _0xd42609=_0x38047b(this);if(!_0xd42609[_0x32ef('0x1d')])return _0xd42609;_0x3944df=_0x38047b[_0x32ef('0x46')]({},_0x38b7f3,_0x2837ee);_0xd42609[_0x32ef('0x47')]=new _0x38047b[(_0x32ef('0x2'))](_0x38047b(this));return _0xd42609;};_0x38047b(function(){_0x38047b(_0x32ef('0x48'))[_0x32ef('0x2')]();});}}(this));

/*  Automatizador de comments box do Facebook Carlos Vinicius [Quatro Digital] */
/* Automatizador de comments box do Facebook // 1.6 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a=$(".fb-comments");a.length&&a.attr("data-href",document.location.href.split("#").shift().split("?").shift());$("#fb-root").length||$("body").append('<div id="fb-root"></div>');if(!$("script#facebook-jssdk").length){a=$("meta[property='fb:app_id']").attr("content")||!1;var b,c=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||(b=document.createElement("script"),b.id="facebook-jssdk",b.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+
(a?"&appId="+a:""),c.parentNode.insertBefore(b,c))}"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse()});

/* Quatro Digital Smart Cart */
var _0x0d99=['fromCharCode','ite','erc','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','click.qd_ddc_scrollDown','val','keyup.qd_ddc_cep','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','cartIsEmpty','mouseleave.qd_ddc_hover','texts','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-shipping','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','.qd-ddc-infoAllTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','.qd-ddc-wrapper','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','qd-ddc-','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','.qd-ddc-quantity','.qd-ddc-remove','insertProdImg','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','address','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','message','actionButtons','lastSku','[data-sku=\x27','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','load','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','click.qd_ddc_remove','removeProduct','slideUp','$1-$2$3','qdDdcLastPostalCode','calculateShipping','BRA','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','height','stop','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','remove','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','QD_smartCart','selector','dropDown','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','closest','replace','abs','pow','round','toFixed','length','join','function','trim','prototype','capitalize','charAt','slice','toLowerCase','qdAjax','qdAjaxQueue','000','error','extend','GET','object','data','url','undefined','jqXHR','success','fail','always','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','version','4.0','simpleCart','checkout','getOrderForm','call','QuatroDigital_simpleCart','ajaxStopOn','alerta','warn','[Simple\x20Cart]\x0a','info','add','QD_simpleCart','elements','.qd_cart_total','.qd_items_text','attr','content','each','qd_simpleCartOpts','_QuatroDigital_CartData','Shipping','totalizers','value','total','currencySymbol','shipping','allTotal','qtt','showQuantityByItems','items','quantity','callback','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','hide','filter','.singular','show','.plural','addClass','removeClass','qd-emptyCart','$this','O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','html','cartQttE','itemsTextE','cartTotalE','find','cartTotal','itemsText','emptyElem','emptyCart','smartCheckout','_QuatroDigital_DropDown','vtexjs','SDK','QD_checkoutQueue','shippingData','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','trigger','simpleCartCallback.quatro_digital','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','.qd_cart_auto','bind','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','done','Callbacks','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','input.buy-in-page-quantity','javascript:','body','.productQuickView','location','href','QD_buyButton','isSmartCheckout','qd-bb-click-active','allowBuyClick','clickBuySmartCheckout','preventDefault','Método\x20descontinuado!','buyButton','.btn-add-buy-button-asynchronous','.remove-href','qd-bb-active','children','.qd-bb-productAdded','append','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','_Quatro_Digital_dropDown','qd-bb-lightBoxBodyProdAdd','---','qd-bb-itemAddCartWrapper','qd-bb-itemAddBuyButtonWrapper','timeRemoveNewItemClass','getCartInfoByUrl','allowUpdate','autoWatchBuyButton','unbind','click','mouseenter.qd_bb_buy_sc','indexOf','?redirect=false&','execDefaultAction','redirect=false','redirect=true','queue','buyIfQuantityZeroed','match','push','productPageCallback','buyButtonClickCallback','split','ku=','pop','shift','asyncCallback','productAddedToCart','cartProductAdded.vtex','fakeRequest','ajax','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','.qd-bb-itemAddWrapper','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','QuatroDigital.qd_bb_prod_add','prodAdd','ajaxSend','/checkout/cart/add','productAddedToCart.qdSbbVtex','ajaxStop','Oooops!\x20','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','QD_dropDownCart','dhnevhf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'];(function(_0x590b63,_0x14debb){var _0x3c9380=function(_0x58fc67){while(--_0x58fc67){_0x590b63['push'](_0x590b63['shift']());}};_0x3c9380(++_0x14debb);}(_0x0d99,0x1d4));var _0x90d9=function(_0x9fdca,_0x364493){_0x9fdca=_0x9fdca-0x0;var _0x4037a3=_0x0d99[_0x9fdca];return _0x4037a3;};(function(_0x4f677b){_0x4f677b['fn'][_0x90d9('0x0')]=_0x4f677b['fn'][_0x90d9('0x1')];}(jQuery));function qd_number_format(_0x2609b5,_0x1ab49b,_0x1d5646,_0x4ff874){_0x2609b5=(_0x2609b5+'')[_0x90d9('0x2')](/[^0-9+\-Ee.]/g,'');_0x2609b5=isFinite(+_0x2609b5)?+_0x2609b5:0x0;_0x1ab49b=isFinite(+_0x1ab49b)?Math[_0x90d9('0x3')](_0x1ab49b):0x0;_0x4ff874='undefined'===typeof _0x4ff874?',':_0x4ff874;_0x1d5646='undefined'===typeof _0x1d5646?'.':_0x1d5646;var _0x2521f0='',_0x2521f0=function(_0x274a11,_0x3f1bf1){var _0x1ab49b=Math[_0x90d9('0x4')](0xa,_0x3f1bf1);return''+(Math[_0x90d9('0x5')](_0x274a11*_0x1ab49b)/_0x1ab49b)[_0x90d9('0x6')](_0x3f1bf1);},_0x2521f0=(_0x1ab49b?_0x2521f0(_0x2609b5,_0x1ab49b):''+Math[_0x90d9('0x5')](_0x2609b5))['split']('.');0x3<_0x2521f0[0x0][_0x90d9('0x7')]&&(_0x2521f0[0x0]=_0x2521f0[0x0][_0x90d9('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x4ff874));(_0x2521f0[0x1]||'')[_0x90d9('0x7')]<_0x1ab49b&&(_0x2521f0[0x1]=_0x2521f0[0x1]||'',_0x2521f0[0x1]+=Array(_0x1ab49b-_0x2521f0[0x1][_0x90d9('0x7')]+0x1)[_0x90d9('0x8')]('0'));return _0x2521f0[_0x90d9('0x8')](_0x1d5646);};_0x90d9('0x9')!==typeof String['prototype'][_0x90d9('0xa')]&&(String[_0x90d9('0xb')][_0x90d9('0xa')]=function(){return this[_0x90d9('0x2')](/^\s+|\s+$/g,'');});'function'!=typeof String[_0x90d9('0xb')][_0x90d9('0xc')]&&(String[_0x90d9('0xb')][_0x90d9('0xc')]=function(){return this[_0x90d9('0xd')](0x0)['toUpperCase']()+this[_0x90d9('0xe')](0x1)[_0x90d9('0xf')]();});(function(_0x57b70d){if(_0x90d9('0x9')!==typeof _0x57b70d[_0x90d9('0x10')]){var _0x36422b={};_0x57b70d[_0x90d9('0x11')]=_0x36422b;0x96>parseInt((_0x57b70d['fn']['jquery'][_0x90d9('0x2')](/[^0-9]+/g,'')+_0x90d9('0x12'))[_0x90d9('0xe')](0x0,0x3),0xa)&&console&&_0x90d9('0x9')==typeof console[_0x90d9('0x13')]&&console[_0x90d9('0x13')]();_0x57b70d[_0x90d9('0x10')]=function(_0x553c30){try{var _0x576528=_0x57b70d[_0x90d9('0x14')]({},{'url':'','type':_0x90d9('0x15'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x553c30);var _0x357702=_0x90d9('0x16')===typeof _0x576528['data']?JSON['stringify'](_0x576528['data']):_0x576528[_0x90d9('0x17')]['toString']();var _0x5991a6=encodeURIComponent(_0x576528[_0x90d9('0x18')]+'|'+_0x576528['type']+'|'+_0x357702);_0x36422b[_0x5991a6]=_0x36422b[_0x5991a6]||{};_0x90d9('0x19')==typeof _0x36422b[_0x5991a6][_0x90d9('0x1a')]?_0x36422b[_0x5991a6][_0x90d9('0x1a')]=_0x57b70d['ajax'](_0x576528):(_0x36422b[_0x5991a6][_0x90d9('0x1a')]['done'](_0x576528[_0x90d9('0x1b')]),_0x36422b[_0x5991a6][_0x90d9('0x1a')][_0x90d9('0x1c')](_0x576528[_0x90d9('0x13')]),_0x36422b[_0x5991a6][_0x90d9('0x1a')][_0x90d9('0x1d')](_0x576528['complete']));_0x36422b[_0x5991a6][_0x90d9('0x1a')][_0x90d9('0x1d')](function(){isNaN(parseInt(_0x576528[_0x90d9('0x1e')]))||setTimeout(function(){_0x36422b[_0x5991a6]['jqXHR']=void 0x0;},_0x576528['clearQueueDelay']);});return _0x36422b[_0x5991a6][_0x90d9('0x1a')];}catch(_0x4ebf04){_0x90d9('0x19')!==typeof console&&_0x90d9('0x9')===typeof console[_0x90d9('0x13')]&&console['error'](_0x90d9('0x1f')+_0x4ebf04['message']);}};_0x57b70d['qdAjax'][_0x90d9('0x20')]=_0x90d9('0x21');}}(jQuery));(function(_0x175083){_0x175083['fn'][_0x90d9('0x0')]=_0x175083['fn'][_0x90d9('0x1')];}(jQuery));(function(){var _0x41c680=jQuery;if(_0x90d9('0x9')!==typeof _0x41c680['fn'][_0x90d9('0x22')]){_0x41c680(function(){var _0xd20fc9=vtexjs[_0x90d9('0x23')]['getOrderForm'];vtexjs[_0x90d9('0x23')][_0x90d9('0x24')]=function(){return _0xd20fc9[_0x90d9('0x25')]();};});try{window[_0x90d9('0x26')]=window[_0x90d9('0x26')]||{};window[_0x90d9('0x26')][_0x90d9('0x27')]=!0x1;_0x41c680['fn'][_0x90d9('0x22')]=function(_0x4237eb,_0x559acf,_0x38b08e){var _0x3e59a4=function(_0x8bce9e,_0x7a77c){if(_0x90d9('0x16')===typeof console){var _0x835641=_0x90d9('0x16')===typeof _0x8bce9e;'undefined'!==typeof _0x7a77c&&_0x90d9('0x28')===_0x7a77c[_0x90d9('0xf')]()?_0x835641?console[_0x90d9('0x29')](_0x90d9('0x2a'),_0x8bce9e[0x0],_0x8bce9e[0x1],_0x8bce9e[0x2],_0x8bce9e[0x3],_0x8bce9e[0x4],_0x8bce9e[0x5],_0x8bce9e[0x6],_0x8bce9e[0x7]):console[_0x90d9('0x29')]('[Simple\x20Cart]\x0a'+_0x8bce9e):_0x90d9('0x19')!==typeof _0x7a77c&&_0x90d9('0x2b')===_0x7a77c['toLowerCase']()?_0x835641?console[_0x90d9('0x2b')](_0x90d9('0x2a'),_0x8bce9e[0x0],_0x8bce9e[0x1],_0x8bce9e[0x2],_0x8bce9e[0x3],_0x8bce9e[0x4],_0x8bce9e[0x5],_0x8bce9e[0x6],_0x8bce9e[0x7]):console[_0x90d9('0x2b')]('[Simple\x20Cart]\x0a'+_0x8bce9e):_0x835641?console[_0x90d9('0x13')]('[Simple\x20Cart]\x0a',_0x8bce9e[0x0],_0x8bce9e[0x1],_0x8bce9e[0x2],_0x8bce9e[0x3],_0x8bce9e[0x4],_0x8bce9e[0x5],_0x8bce9e[0x6],_0x8bce9e[0x7]):console[_0x90d9('0x13')]('[Simple\x20Cart]\x0a'+_0x8bce9e);}};var _0x5c3be3=_0x41c680(this);_0x90d9('0x16')===typeof _0x4237eb?_0x559acf=_0x4237eb:(_0x4237eb=_0x4237eb||!0x1,_0x5c3be3=_0x5c3be3[_0x90d9('0x2c')](_0x41c680[_0x90d9('0x2d')][_0x90d9('0x2e')]));if(!_0x5c3be3[_0x90d9('0x7')])return _0x5c3be3;_0x41c680['QD_simpleCart']['elements']=_0x41c680[_0x90d9('0x2d')][_0x90d9('0x2e')][_0x90d9('0x2c')](_0x5c3be3);_0x38b08e='undefined'===typeof _0x38b08e?!0x1:_0x38b08e;var _0x581d65={'cartQtt':'.qd_cart_qtt','cartTotal':_0x90d9('0x2f'),'itemsText':_0x90d9('0x30'),'currencySymbol':(_0x41c680('meta[name=currency]')[_0x90d9('0x31')](_0x90d9('0x32'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x49e449=_0x41c680[_0x90d9('0x14')]({},_0x581d65,_0x559acf);var _0x2eeb33=_0x41c680('');_0x5c3be3[_0x90d9('0x33')](function(){var _0x33b361=_0x41c680(this);_0x33b361['data'](_0x90d9('0x34'))||_0x33b361[_0x90d9('0x17')](_0x90d9('0x34'),_0x49e449);});var _0x188335=function(_0x510e1c){window[_0x90d9('0x35')]=window[_0x90d9('0x35')]||{};for(var _0x4237eb=0x0,_0x17b449=0x0,_0x9ebe48=0x0;_0x9ebe48<_0x510e1c['totalizers'][_0x90d9('0x7')];_0x9ebe48++)_0x90d9('0x36')==_0x510e1c[_0x90d9('0x37')][_0x9ebe48]['id']&&(_0x17b449+=_0x510e1c['totalizers'][_0x9ebe48]['value']),_0x4237eb+=_0x510e1c[_0x90d9('0x37')][_0x9ebe48][_0x90d9('0x38')];window[_0x90d9('0x35')][_0x90d9('0x39')]=_0x49e449[_0x90d9('0x3a')]+qd_number_format(_0x4237eb/0x64,0x2,',','.');window['_QuatroDigital_CartData'][_0x90d9('0x3b')]=_0x49e449[_0x90d9('0x3a')]+qd_number_format(_0x17b449/0x64,0x2,',','.');window[_0x90d9('0x35')][_0x90d9('0x3c')]=_0x49e449[_0x90d9('0x3a')]+qd_number_format((_0x4237eb+_0x17b449)/0x64,0x2,',','.');window[_0x90d9('0x35')][_0x90d9('0x3d')]=0x0;if(_0x49e449[_0x90d9('0x3e')])for(_0x9ebe48=0x0;_0x9ebe48<_0x510e1c[_0x90d9('0x3f')]['length'];_0x9ebe48++)window['_QuatroDigital_CartData']['qtt']+=_0x510e1c[_0x90d9('0x3f')][_0x9ebe48][_0x90d9('0x40')];else window['_QuatroDigital_CartData']['qtt']=_0x510e1c[_0x90d9('0x3f')]['length']||0x0;try{window[_0x90d9('0x35')]['callback']&&window[_0x90d9('0x35')][_0x90d9('0x41')][_0x90d9('0x42')]&&window[_0x90d9('0x35')]['callback'][_0x90d9('0x42')]();}catch(_0x3be84b){_0x3e59a4(_0x90d9('0x43'));}_0x4c1e87(_0x2eeb33);};var _0x14993c=function(_0x1467e1,_0xc95e2a){0x1===_0x1467e1?_0xc95e2a[_0x90d9('0x44')]()[_0x90d9('0x45')](_0x90d9('0x46'))[_0x90d9('0x47')]():_0xc95e2a[_0x90d9('0x44')]()[_0x90d9('0x45')](_0x90d9('0x48'))[_0x90d9('0x47')]();};var _0x4d701e=function(_0xff0da2){0x1>_0xff0da2?_0x5c3be3[_0x90d9('0x49')]('qd-emptyCart'):_0x5c3be3[_0x90d9('0x4a')](_0x90d9('0x4b'));};var _0xa3785c=function(_0x7c3a0b,_0x4bedd4){var _0x5ea23a=parseInt(window[_0x90d9('0x35')][_0x90d9('0x3d')],0xa);_0x4bedd4[_0x90d9('0x4c')][_0x90d9('0x47')]();isNaN(_0x5ea23a)&&(_0x3e59a4(_0x90d9('0x4d'),_0x90d9('0x28')),_0x5ea23a=0x0);_0x4bedd4['cartTotalE'][_0x90d9('0x4e')](window[_0x90d9('0x35')][_0x90d9('0x39')]);_0x4bedd4[_0x90d9('0x4f')]['html'](_0x5ea23a);_0x14993c(_0x5ea23a,_0x4bedd4[_0x90d9('0x50')]);_0x4d701e(_0x5ea23a);};var _0x4c1e87=function(_0x2ed619){_0x5c3be3[_0x90d9('0x33')](function(){var _0x322954={};var _0x537bc3=_0x41c680(this);_0x4237eb&&_0x537bc3[_0x90d9('0x17')](_0x90d9('0x34'))&&_0x41c680[_0x90d9('0x14')](_0x49e449,_0x537bc3[_0x90d9('0x17')](_0x90d9('0x34')));_0x322954[_0x90d9('0x4c')]=_0x537bc3;_0x322954[_0x90d9('0x4f')]=_0x537bc3['find'](_0x49e449['cartQtt'])||_0x2eeb33;_0x322954[_0x90d9('0x51')]=_0x537bc3[_0x90d9('0x52')](_0x49e449[_0x90d9('0x53')])||_0x2eeb33;_0x322954[_0x90d9('0x50')]=_0x537bc3['find'](_0x49e449[_0x90d9('0x54')])||_0x2eeb33;_0x322954[_0x90d9('0x55')]=_0x537bc3[_0x90d9('0x52')](_0x49e449[_0x90d9('0x56')])||_0x2eeb33;_0xa3785c(_0x2ed619,_0x322954);_0x537bc3[_0x90d9('0x49')]('qd-sc-populated');});};(function(){if(_0x49e449[_0x90d9('0x57')]){window['_QuatroDigital_DropDown']=window[_0x90d9('0x58')]||{};if('undefined'!==typeof window[_0x90d9('0x58')]['getOrderForm']&&(_0x38b08e||!_0x4237eb))return _0x188335(window[_0x90d9('0x58')]['getOrderForm']);if(_0x90d9('0x16')!==typeof window['vtexjs']||'undefined'===typeof window[_0x90d9('0x59')][_0x90d9('0x23')])if(_0x90d9('0x16')===typeof vtex&&'object'===typeof vtex[_0x90d9('0x23')]&&_0x90d9('0x19')!==typeof vtex[_0x90d9('0x23')]['SDK'])new vtex[(_0x90d9('0x23'))][(_0x90d9('0x5a'))]();else return _0x3e59a4('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x41c680[_0x90d9('0x5b')]([_0x90d9('0x3f'),'totalizers',_0x90d9('0x5c')],{'done':function(_0x1f273f){_0x188335(_0x1f273f);window[_0x90d9('0x58')]['getOrderForm']=_0x1f273f;},'fail':function(_0x2623e3){_0x3e59a4(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.',_0x2623e3]);}});}else alert(_0x90d9('0x5d'));}());_0x49e449[_0x90d9('0x41')]();_0x41c680(window)[_0x90d9('0x5e')](_0x90d9('0x5f'));return _0x5c3be3;};_0x41c680[_0x90d9('0x2d')]={'elements':_0x41c680('')};_0x41c680(function(){var _0x3b3936;_0x90d9('0x9')===typeof window[_0x90d9('0x60')]&&(_0x3b3936=window['ajaxRequestbuyButtonAsynchronous'],window[_0x90d9('0x60')]=function(_0x15873c,_0x2ddc83,_0x42381d,_0x46b459,_0x1518b5){_0x3b3936[_0x90d9('0x25')](this,_0x15873c,_0x2ddc83,_0x42381d,_0x46b459,function(){_0x90d9('0x9')===typeof _0x1518b5&&_0x1518b5();_0x41c680[_0x90d9('0x2d')][_0x90d9('0x2e')]['each'](function(){var _0x2d539a=_0x41c680(this);_0x2d539a['simpleCart'](_0x2d539a[_0x90d9('0x17')]('qd_simpleCartOpts'));});});});});var _0x2b18b0=window[_0x90d9('0x61')]||void 0x0;window['ReloadItemsCart']=function(_0x125f03){_0x41c680['fn'][_0x90d9('0x22')](!0x0);_0x90d9('0x9')===typeof _0x2b18b0?_0x2b18b0[_0x90d9('0x25')](this,_0x125f03):alert(_0x125f03);};_0x41c680(function(){var _0x5db5bd=_0x41c680(_0x90d9('0x62'));_0x5db5bd['length']&&_0x5db5bd[_0x90d9('0x22')]();});_0x41c680(function(){_0x41c680(window)[_0x90d9('0x63')]('productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex',function(){_0x41c680['fn']['simpleCart'](!0x0);});});}catch(_0x423f93){'undefined'!==typeof console&&'function'===typeof console[_0x90d9('0x13')]&&console['error']('Oooops!\x20',_0x423f93);}}}());(function(){var _0x25b9ce=function(_0x5f5233,_0x3656b0){if(_0x90d9('0x16')===typeof console){var _0x4188c6=_0x90d9('0x16')===typeof _0x5f5233;_0x90d9('0x19')!==typeof _0x3656b0&&'alerta'===_0x3656b0[_0x90d9('0xf')]()?_0x4188c6?console[_0x90d9('0x29')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x5f5233[0x0],_0x5f5233[0x1],_0x5f5233[0x2],_0x5f5233[0x3],_0x5f5233[0x4],_0x5f5233[0x5],_0x5f5233[0x6],_0x5f5233[0x7]):console[_0x90d9('0x29')](_0x90d9('0x64')+_0x5f5233):_0x90d9('0x19')!==typeof _0x3656b0&&_0x90d9('0x2b')===_0x3656b0['toLowerCase']()?_0x4188c6?console[_0x90d9('0x2b')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x5f5233[0x0],_0x5f5233[0x1],_0x5f5233[0x2],_0x5f5233[0x3],_0x5f5233[0x4],_0x5f5233[0x5],_0x5f5233[0x6],_0x5f5233[0x7]):console[_0x90d9('0x2b')](_0x90d9('0x64')+_0x5f5233):_0x4188c6?console[_0x90d9('0x13')](_0x90d9('0x64'),_0x5f5233[0x0],_0x5f5233[0x1],_0x5f5233[0x2],_0x5f5233[0x3],_0x5f5233[0x4],_0x5f5233[0x5],_0x5f5233[0x6],_0x5f5233[0x7]):console[_0x90d9('0x13')](_0x90d9('0x64')+_0x5f5233);}},_0xf24ad9=null,_0x36da07={},_0x1f9de4={},_0x3a66d7={};$[_0x90d9('0x5b')]=function(_0x41c04d,_0x45b9aa){if(null===_0xf24ad9)if(_0x90d9('0x16')===typeof window[_0x90d9('0x59')]&&'undefined'!==typeof window[_0x90d9('0x59')][_0x90d9('0x23')])_0xf24ad9=window[_0x90d9('0x59')][_0x90d9('0x23')];else return _0x25b9ce(_0x90d9('0x65'));var _0x2b4f26=$[_0x90d9('0x14')]({'done':function(){},'fail':function(){}},_0x45b9aa),_0x202c6a=_0x41c04d[_0x90d9('0x8')](';'),_0x23aec8=function(){_0x36da07[_0x202c6a][_0x90d9('0x2c')](_0x2b4f26[_0x90d9('0x66')]);_0x1f9de4[_0x202c6a][_0x90d9('0x2c')](_0x2b4f26[_0x90d9('0x1c')]);};_0x3a66d7[_0x202c6a]?_0x23aec8():(_0x36da07[_0x202c6a]=$[_0x90d9('0x67')](),_0x1f9de4[_0x202c6a]=$['Callbacks'](),_0x23aec8(),_0x3a66d7[_0x202c6a]=!0x0,_0xf24ad9['getOrderForm'](_0x41c04d)[_0x90d9('0x66')](function(_0x251161){_0x3a66d7[_0x202c6a]=!0x1;_0x36da07[_0x202c6a][_0x90d9('0x42')](_0x251161);})[_0x90d9('0x1c')](function(_0x4b7dfb){_0x3a66d7[_0x202c6a]=!0x1;_0x1f9de4[_0x202c6a][_0x90d9('0x42')](_0x4b7dfb);}));};}());(function(_0x31dd0b){try{var _0x54960d=jQuery,_0x4a1758,_0xef2c36=_0x54960d({}),_0x7fbab=function(_0x324ea5,_0x143168){if('object'===typeof console&&_0x90d9('0x19')!==typeof console[_0x90d9('0x13')]&&_0x90d9('0x19')!==typeof console['info']&&_0x90d9('0x19')!==typeof console[_0x90d9('0x29')]){var _0x383ae7;_0x90d9('0x16')===typeof _0x324ea5?(_0x324ea5[_0x90d9('0x68')](_0x90d9('0x69')),_0x383ae7=_0x324ea5):_0x383ae7=[_0x90d9('0x69')+_0x324ea5];if(_0x90d9('0x19')===typeof _0x143168||_0x90d9('0x28')!==_0x143168['toLowerCase']()&&_0x90d9('0x6a')!==_0x143168[_0x90d9('0xf')]())if('undefined'!==typeof _0x143168&&_0x90d9('0x2b')===_0x143168[_0x90d9('0xf')]())try{console[_0x90d9('0x2b')]['apply'](console,_0x383ae7);}catch(_0x5a45c3){try{console['info'](_0x383ae7[_0x90d9('0x8')]('\x0a'));}catch(_0x4bb1d6){}}else try{console[_0x90d9('0x13')]['apply'](console,_0x383ae7);}catch(_0x32fc59){try{console[_0x90d9('0x13')](_0x383ae7['join']('\x0a'));}catch(_0x11eecd){}}else try{console['warn'][_0x90d9('0x6b')](console,_0x383ae7);}catch(_0x20b1fc){try{console[_0x90d9('0x29')](_0x383ae7[_0x90d9('0x8')]('\x0a'));}catch(_0x58752b){}}}},_0xed6d38={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':'.productInformationWrapper\x20\x20a.buy-button','buyQtt':_0x90d9('0x6c'),'selectSkuMsg':_0x90d9('0x6d'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x3d0bbc,_0x16bc30,_0x1276e8){_0x54960d(_0x90d9('0x6e'))['is'](_0x90d9('0x6f'))&&(_0x90d9('0x1b')===_0x16bc30?alert('Produto\x20adicionado\x20ao\x20carrinho!'):(alert('Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.'),(_0x90d9('0x16')===typeof parent?parent:document)[_0x90d9('0x70')][_0x90d9('0x71')]=_0x1276e8));},'isProductPage':function(){return _0x54960d(_0x90d9('0x6e'))['is']('#produto,\x20.produto');},'execDefaultAction':function(_0x58e197){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x54960d[_0x90d9('0x72')]=function(_0xbdaef3,_0x590aaa){function _0x12169f(_0x45ce12){_0x4a1758[_0x90d9('0x73')]?_0x45ce12['data'](_0x90d9('0x74'))||(_0x45ce12[_0x90d9('0x17')](_0x90d9('0x74'),0x1),_0x45ce12['on']('click.qd_bb_buy_sc',function(_0x20ac6a){if(!_0x4a1758[_0x90d9('0x75')]())return!0x0;if(!0x0!==_0x31b16b[_0x90d9('0x76')][_0x90d9('0x25')](this))return _0x20ac6a[_0x90d9('0x77')](),!0x1;})):alert(_0x90d9('0x78'));}function _0x3ff8dc(_0x4a813d){_0x4a813d=_0x4a813d||_0x54960d(_0x4a1758[_0x90d9('0x79')]);_0x4a813d[_0x90d9('0x33')](function(){var _0x4a813d=_0x54960d(this);_0x4a813d['is']('.qd-sbb-on')||(_0x4a813d[_0x90d9('0x49')]('qd-sbb-on'),_0x4a813d['is'](_0x90d9('0x7a'))&&!_0x4a813d['is'](_0x90d9('0x7b'))||_0x4a813d[_0x90d9('0x17')](_0x90d9('0x7c'))||(_0x4a813d[_0x90d9('0x17')](_0x90d9('0x7c'),0x1),_0x4a813d[_0x90d9('0x7d')](_0x90d9('0x7e'))[_0x90d9('0x7')]||_0x4a813d[_0x90d9('0x7f')](_0x90d9('0x80')),_0x4a813d['is']('.buy-in-page-button')&&_0x4a1758[_0x90d9('0x81')]()&&_0x42d37a[_0x90d9('0x25')](_0x4a813d),_0x12169f(_0x4a813d)));});_0x4a1758[_0x90d9('0x81')]()&&!_0x4a813d['length']&&_0x7fbab(_0x90d9('0x82')+_0x4a813d['selector']+'\x27.',_0x90d9('0x2b'));}var _0x3977a5=_0x54960d(_0xbdaef3);var _0x31b16b=this;window[_0x90d9('0x83')]=window[_0x90d9('0x83')]||{};window[_0x90d9('0x35')]=window[_0x90d9('0x35')]||{};_0x31b16b['prodAdd']=function(_0x2f72d3,_0x364557){_0x3977a5[_0x90d9('0x49')]('qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd');_0x54960d(_0x90d9('0x6e'))[_0x90d9('0x49')](_0x90d9('0x84'));var _0x12e6a=_0x54960d(_0x4a1758[_0x90d9('0x79')])['filter']('[href=\x27'+(_0x2f72d3['attr'](_0x90d9('0x71'))||_0x90d9('0x85'))+'\x27]')['add'](_0x2f72d3);_0x12e6a[_0x90d9('0x49')]('qd-bb-itemAddBuyButtonWrapper');setTimeout(function(){_0x3977a5[_0x90d9('0x4a')](_0x90d9('0x86'));_0x12e6a['removeClass'](_0x90d9('0x87'));},_0x4a1758[_0x90d9('0x88')]);window[_0x90d9('0x83')][_0x90d9('0x24')]=void 0x0;if(_0x90d9('0x19')!==typeof _0x590aaa&&'function'===typeof _0x590aaa['getCartInfoByUrl'])return _0x4a1758['isSmartCheckout']||(_0x7fbab('função\x20descontinuada'),_0x590aaa[_0x90d9('0x89')]()),window[_0x90d9('0x58')]['getOrderForm']=void 0x0,_0x590aaa['getCartInfoByUrl'](function(_0x375b65){window[_0x90d9('0x83')][_0x90d9('0x24')]=_0x375b65;_0x54960d['fn'][_0x90d9('0x22')](!0x0,void 0x0,!0x0);},{'lastSku':_0x364557});window[_0x90d9('0x83')][_0x90d9('0x8a')]=!0x0;_0x54960d['fn'][_0x90d9('0x22')](!0x0);};(function(){if(_0x4a1758[_0x90d9('0x73')]&&_0x4a1758[_0x90d9('0x8b')]){var _0x23b183=_0x54960d(_0x90d9('0x7a'));_0x23b183[_0x90d9('0x7')]&&_0x3ff8dc(_0x23b183);}}());var _0x42d37a=function(){var _0x1fa291=_0x54960d(this);_0x90d9('0x19')!==typeof _0x1fa291['data'](_0x90d9('0x79'))?(_0x1fa291[_0x90d9('0x8c')](_0x90d9('0x8d')),_0x12169f(_0x1fa291)):(_0x1fa291['bind'](_0x90d9('0x8e'),function(_0x48fed0){_0x1fa291[_0x90d9('0x8c')](_0x90d9('0x8d'));_0x12169f(_0x1fa291);_0x54960d(this)[_0x90d9('0x8c')](_0x48fed0);}),_0x54960d(window)['load'](function(){_0x1fa291[_0x90d9('0x8c')](_0x90d9('0x8d'));_0x12169f(_0x1fa291);_0x1fa291[_0x90d9('0x8c')](_0x90d9('0x8e'));}));};_0x31b16b['clickBuySmartCheckout']=function(){var _0x119363=_0x54960d(this),_0xbdaef3=_0x119363[_0x90d9('0x31')](_0x90d9('0x71'))||'';if(-0x1<_0xbdaef3[_0x90d9('0x8f')](_0x4a1758['selectSkuMsg']))return!0x0;_0xbdaef3=_0xbdaef3[_0x90d9('0x2')](/redirect\=(false|true)/gi,'')[_0x90d9('0x2')]('?',_0x90d9('0x90'))['replace'](/\&\&/gi,'&');if(_0x4a1758[_0x90d9('0x91')](_0x119363))return _0x119363[_0x90d9('0x31')]('href',_0xbdaef3[_0x90d9('0x2')](_0x90d9('0x92'),_0x90d9('0x93'))),!0x0;_0xbdaef3=_0xbdaef3['replace'](/http.?:/i,'');_0xef2c36[_0x90d9('0x94')](function(_0x144eae){if(!_0x4a1758[_0x90d9('0x95')]&&!/(&|\?)qty\=[1-9][0-9]*/gi['test'](_0xbdaef3))return _0x144eae();var _0x315743=function(_0xe755cb,_0x7d20ca){var _0x3ff8dc=_0xbdaef3[_0x90d9('0x96')](/sku\=([0-9]+)/gi),_0x2948a3=[];if('object'===typeof _0x3ff8dc&&null!==_0x3ff8dc)for(var _0x5474af=_0x3ff8dc[_0x90d9('0x7')]-0x1;0x0<=_0x5474af;_0x5474af--){var _0x527bce=parseInt(_0x3ff8dc[_0x5474af][_0x90d9('0x2')](/sku\=/gi,''));isNaN(_0x527bce)||_0x2948a3[_0x90d9('0x97')](_0x527bce);}_0x4a1758[_0x90d9('0x98')]['call'](this,_0xe755cb,_0x7d20ca,_0xbdaef3);_0x31b16b[_0x90d9('0x99')][_0x90d9('0x25')](this,_0xe755cb,_0x7d20ca,_0xbdaef3,_0x2948a3);_0x31b16b['prodAdd'](_0x119363,_0xbdaef3[_0x90d9('0x9a')](_0x90d9('0x9b'))[_0x90d9('0x9c')]()[_0x90d9('0x9a')]('&')[_0x90d9('0x9d')]());'function'===typeof _0x4a1758[_0x90d9('0x9e')]&&_0x4a1758['asyncCallback']['call'](this);_0x54960d(window)[_0x90d9('0x5e')](_0x90d9('0x9f'));_0x54960d(window)[_0x90d9('0x5e')](_0x90d9('0xa0'));};_0x4a1758[_0x90d9('0xa1')]?(_0x315743(null,_0x90d9('0x1b')),_0x144eae()):_0x54960d[_0x90d9('0xa2')]({'url':_0xbdaef3,'complete':_0x315743})[_0x90d9('0x1d')](function(){_0x144eae();});});};_0x31b16b[_0x90d9('0x99')]=function(_0x60bc8f,_0x55c078,_0x52dfdd,_0x3f5e84){try{_0x90d9('0x1b')===_0x55c078&&'object'===typeof window['parent']&&_0x90d9('0x9')===typeof window[_0x90d9('0xa3')]['_QuatroDigital_prodBuyCallback']&&window['parent'][_0x90d9('0xa4')](_0x60bc8f,_0x55c078,_0x52dfdd,_0x3f5e84);}catch(_0x3b975e){_0x7fbab(_0x90d9('0xa5'));}};_0x3ff8dc();_0x90d9('0x9')===typeof _0x4a1758['callback']?_0x4a1758[_0x90d9('0x41')]['call'](this):_0x7fbab('Callback\x20não\x20é\x20uma\x20função');};var _0x2d1034=_0x54960d[_0x90d9('0x67')]();_0x54960d['fn'][_0x90d9('0x72')]=function(_0x34798a,_0x5ca1f0){var _0x31dd0b=_0x54960d(this);_0x90d9('0x19')!==typeof _0x5ca1f0||_0x90d9('0x16')!==typeof _0x34798a||_0x34798a instanceof _0x54960d||(_0x5ca1f0=_0x34798a,_0x34798a=void 0x0);_0x4a1758=_0x54960d[_0x90d9('0x14')]({},_0xed6d38,_0x5ca1f0);var _0x292d5e;_0x2d1034[_0x90d9('0x2c')](function(){_0x31dd0b[_0x90d9('0x7d')](_0x90d9('0xa6'))[_0x90d9('0x7')]||_0x31dd0b['prepend'](_0x90d9('0xa7'));_0x292d5e=new _0x54960d['QD_buyButton'](_0x31dd0b,_0x34798a);});_0x2d1034[_0x90d9('0x42')]();_0x54960d(window)['on'](_0x90d9('0xa8'),function(_0x32f7f8,_0x353c6f,_0x294336){_0x292d5e[_0x90d9('0xa9')](_0x353c6f,_0x294336);});return _0x54960d[_0x90d9('0x14')](_0x31dd0b,_0x292d5e);};var _0x5ec895=0x0;_0x54960d(document)[_0x90d9('0xaa')](function(_0x3734d8,_0x14be8e,_0xbcf8d6){-0x1<_0xbcf8d6[_0x90d9('0x18')][_0x90d9('0xf')]()[_0x90d9('0x8f')](_0x90d9('0xab'))&&(_0x5ec895=(_0xbcf8d6['url'][_0x90d9('0x96')](/sku\=([0-9]+)/i)||[''])[_0x90d9('0x9c')]());});_0x54960d(window)[_0x90d9('0x63')](_0x90d9('0xac'),function(){_0x54960d(window)[_0x90d9('0x5e')](_0x90d9('0xa8'),[new _0x54960d(),_0x5ec895]);});_0x54960d(document)[_0x90d9('0xad')](function(){_0x2d1034[_0x90d9('0x42')]();});}catch(_0x1189d5){'undefined'!==typeof console&&_0x90d9('0x9')===typeof console['error']&&console['error']('Oooops!\x20',_0x1189d5);}}(this));function qd_number_format(_0x46d825,_0x1961f4,_0x39929a,_0x4dab09){_0x46d825=(_0x46d825+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x46d825=isFinite(+_0x46d825)?+_0x46d825:0x0;_0x1961f4=isFinite(+_0x1961f4)?Math[_0x90d9('0x3')](_0x1961f4):0x0;_0x4dab09='undefined'===typeof _0x4dab09?',':_0x4dab09;_0x39929a=_0x90d9('0x19')===typeof _0x39929a?'.':_0x39929a;var _0x248ac4='',_0x248ac4=function(_0x34a8ef,_0x9109d6){var _0x33f17=Math['pow'](0xa,_0x9109d6);return''+(Math['round'](_0x34a8ef*_0x33f17)/_0x33f17)[_0x90d9('0x6')](_0x9109d6);},_0x248ac4=(_0x1961f4?_0x248ac4(_0x46d825,_0x1961f4):''+Math[_0x90d9('0x5')](_0x46d825))[_0x90d9('0x9a')]('.');0x3<_0x248ac4[0x0]['length']&&(_0x248ac4[0x0]=_0x248ac4[0x0][_0x90d9('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x4dab09));(_0x248ac4[0x1]||'')[_0x90d9('0x7')]<_0x1961f4&&(_0x248ac4[0x1]=_0x248ac4[0x1]||'',_0x248ac4[0x1]+=Array(_0x1961f4-_0x248ac4[0x1][_0x90d9('0x7')]+0x1)[_0x90d9('0x8')]('0'));return _0x248ac4[_0x90d9('0x8')](_0x39929a);}(function(){try{window[_0x90d9('0x35')]=window[_0x90d9('0x35')]||{},window[_0x90d9('0x35')][_0x90d9('0x41')]=window[_0x90d9('0x35')][_0x90d9('0x41')]||$['Callbacks']();}catch(_0x502920){'undefined'!==typeof console&&'function'===typeof console[_0x90d9('0x13')]&&console[_0x90d9('0x13')](_0x90d9('0xae'),_0x502920['message']);}}());(function(_0x242b76){try{var _0x175dd0=jQuery,_0x4f1424=function(_0x2fcf84,_0x2a5230){if(_0x90d9('0x16')===typeof console&&'undefined'!==typeof console[_0x90d9('0x13')]&&_0x90d9('0x19')!==typeof console['info']&&_0x90d9('0x19')!==typeof console[_0x90d9('0x29')]){var _0x2da3be;'object'===typeof _0x2fcf84?(_0x2fcf84[_0x90d9('0x68')](_0x90d9('0xaf')),_0x2da3be=_0x2fcf84):_0x2da3be=[_0x90d9('0xaf')+_0x2fcf84];if(_0x90d9('0x19')===typeof _0x2a5230||_0x90d9('0x28')!==_0x2a5230[_0x90d9('0xf')]()&&_0x90d9('0x6a')!==_0x2a5230[_0x90d9('0xf')]())if('undefined'!==typeof _0x2a5230&&_0x90d9('0x2b')===_0x2a5230[_0x90d9('0xf')]())try{console['info'][_0x90d9('0x6b')](console,_0x2da3be);}catch(_0x31b7db){try{console[_0x90d9('0x2b')](_0x2da3be['join']('\x0a'));}catch(_0x403ef9){}}else try{console['error']['apply'](console,_0x2da3be);}catch(_0xe79a22){try{console[_0x90d9('0x13')](_0x2da3be[_0x90d9('0x8')]('\x0a'));}catch(_0x34dd7e){}}else try{console[_0x90d9('0x29')]['apply'](console,_0x2da3be);}catch(_0x2d1059){try{console['warn'](_0x2da3be[_0x90d9('0x8')]('\x0a'));}catch(_0x5cb499){}}}};window[_0x90d9('0x58')]=window[_0x90d9('0x58')]||{};window[_0x90d9('0x58')][_0x90d9('0x8a')]=!0x0;_0x175dd0[_0x90d9('0xb0')]=function(){};_0x175dd0['fn']['QD_dropDownCart']=function(){return{'fn':new _0x175dd0()};};var _0x2458c0=function(_0x3a54c3){var _0x1702ec={'n':_0x90d9('0xb1')};return function(_0x7f586d){var _0x446186=function(_0x4f63b5){return _0x4f63b5;};var _0x4c4b6e=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x7f586d=_0x7f586d['d'+_0x4c4b6e[0x10]+'c'+_0x4c4b6e[0x11]+'m'+_0x446186(_0x4c4b6e[0x1])+'n'+_0x4c4b6e[0xd]]['l'+_0x4c4b6e[0x12]+'c'+_0x4c4b6e[0x0]+'ti'+_0x446186('o')+'n'];var _0x44caf0=function(_0x31009c){return escape(encodeURIComponent(_0x31009c[_0x90d9('0x2')](/\./g,'¨')[_0x90d9('0x2')](/[a-zA-Z]/g,function(_0x4b4be2){return String[_0x90d9('0xb2')](('Z'>=_0x4b4be2?0x5a:0x7a)>=(_0x4b4be2=_0x4b4be2['charCodeAt'](0x0)+0xd)?_0x4b4be2:_0x4b4be2-0x1a);})));};var _0x242b76=_0x44caf0(_0x7f586d[[_0x4c4b6e[0x9],_0x446186('o'),_0x4c4b6e[0xc],_0x4c4b6e[_0x446186(0xd)]][_0x90d9('0x8')]('')]);_0x44caf0=_0x44caf0((window[['js',_0x446186('no'),'m',_0x4c4b6e[0x1],_0x4c4b6e[0x4]['toUpperCase'](),_0x90d9('0xb3')][_0x90d9('0x8')]('')]||'---')+['.v',_0x4c4b6e[0xd],'e',_0x446186('x'),'co',_0x446186('mm'),_0x90d9('0xb4'),_0x4c4b6e[0x1],'.c',_0x446186('o'),'m.',_0x4c4b6e[0x13],'r']['join'](''));for(var _0x2a9c40 in _0x1702ec){if(_0x44caf0===_0x2a9c40+_0x1702ec[_0x2a9c40]||_0x242b76===_0x2a9c40+_0x1702ec[_0x2a9c40]){var _0x85b26a='tr'+_0x4c4b6e[0x11]+'e';break;}_0x85b26a='f'+_0x4c4b6e[0x0]+'ls'+_0x446186(_0x4c4b6e[0x1])+'';}_0x446186=!0x1;-0x1<_0x7f586d[[_0x4c4b6e[0xc],'e',_0x4c4b6e[0x0],'rc',_0x4c4b6e[0x9]][_0x90d9('0x8')]('')]['indexOf']('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x446186=!0x0);return[_0x85b26a,_0x446186];}(_0x3a54c3);}(window);if(!eval(_0x2458c0[0x0]))return _0x2458c0[0x1]?_0x4f1424('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x175dd0['QD_dropDownCart']=function(_0x4db0ea,_0x6c0630){var _0x112060=_0x175dd0(_0x4db0ea);if(!_0x112060[_0x90d9('0x7')])return _0x112060;var _0x334262=_0x175dd0['extend'](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x90d9('0xb5'),'linkCheckout':_0x90d9('0xb6'),'cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':_0x90d9('0xb7'),'continueShopping':_0x90d9('0xb8'),'shippingForm':_0x90d9('0xb9')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x3d685f){return _0x3d685f['skuName']||_0x3d685f['name'];},'callback':function(){},'callbackProductsList':function(){}},_0x6c0630);_0x175dd0('');var _0x4acac9=this;if(_0x334262[_0x90d9('0x57')]){var _0xb54d4a=!0x1;'undefined'===typeof window[_0x90d9('0x59')]&&(_0x4f1424(_0x90d9('0xba')),_0x175dd0['ajax']({'url':_0x90d9('0xbb'),'async':!0x1,'dataType':_0x90d9('0xbc'),'error':function(){_0x4f1424(_0x90d9('0xbd'));_0xb54d4a=!0x0;}}));if(_0xb54d4a)return _0x4f1424(_0x90d9('0xbe'));}if(_0x90d9('0x16')===typeof window[_0x90d9('0x59')]&&'undefined'!==typeof window[_0x90d9('0x59')][_0x90d9('0x23')])var _0x146110=window[_0x90d9('0x59')]['checkout'];else if('object'===typeof vtex&&_0x90d9('0x16')===typeof vtex['checkout']&&_0x90d9('0x19')!==typeof vtex[_0x90d9('0x23')][_0x90d9('0x5a')])_0x146110=new vtex[(_0x90d9('0x23'))][(_0x90d9('0x5a'))]();else return _0x4f1424(_0x90d9('0xbf'));_0x4acac9['cartContainer']=_0x90d9('0xc0');var _0xc56490=function(_0x293aa9){_0x175dd0(this)[_0x90d9('0x7f')](_0x293aa9);_0x293aa9[_0x90d9('0x52')](_0x90d9('0xc1'))[_0x90d9('0x2c')](_0x175dd0('.qd_ddc_lightBoxOverlay'))['on'](_0x90d9('0xc2'),function(){_0x112060[_0x90d9('0x4a')](_0x90d9('0xc3'));_0x175dd0(document['body'])[_0x90d9('0x4a')]('qd-bb-lightBoxBodyProdAdd');});_0x175dd0(document)['off'](_0x90d9('0xc4'))['on'](_0x90d9('0xc4'),function(_0x3e4d35){0x1b==_0x3e4d35[_0x90d9('0xc5')]&&(_0x112060[_0x90d9('0x4a')]('qd-bb-lightBoxProdAdd'),_0x175dd0(document[_0x90d9('0x6e')])[_0x90d9('0x4a')](_0x90d9('0x84')));});var _0x33c1fe=_0x293aa9[_0x90d9('0x52')](_0x90d9('0xc6'));_0x293aa9['find'](_0x90d9('0xc7'))['on'](_0x90d9('0xc8'),function(){_0x4acac9[_0x90d9('0xc9')]('-',void 0x0,void 0x0,_0x33c1fe);return!0x1;});_0x293aa9[_0x90d9('0x52')]('.qd-ddc-scrollDown')['on'](_0x90d9('0xca'),function(){_0x4acac9[_0x90d9('0xc9')](void 0x0,void 0x0,void 0x0,_0x33c1fe);return!0x1;});_0x293aa9[_0x90d9('0x52')]('.qd-ddc-shipping\x20input')[_0x90d9('0xcb')]('')['on'](_0x90d9('0xcc'),function(){_0x4acac9[_0x90d9('0xcd')](_0x175dd0(this));});if(_0x334262[_0x90d9('0xce')]){var _0x6c0630=0x0;_0x175dd0(this)['on'](_0x90d9('0xcf'),function(){var _0x293aa9=function(){window['_QuatroDigital_DropDown'][_0x90d9('0x8a')]&&(_0x4acac9['getCartInfoByUrl'](),window[_0x90d9('0x58')][_0x90d9('0x8a')]=!0x1,_0x175dd0['fn'][_0x90d9('0x22')](!0x0),_0x4acac9[_0x90d9('0xd0')]());};_0x6c0630=setInterval(function(){_0x293aa9();},0x258);_0x293aa9();});_0x175dd0(this)['on'](_0x90d9('0xd1'),function(){clearInterval(_0x6c0630);});}};var _0x5c81ed=function(_0x4b7920){_0x4b7920=_0x175dd0(_0x4b7920);_0x334262[_0x90d9('0xd2')]['cartTotal']=_0x334262['texts'][_0x90d9('0x53')]['replace'](_0x90d9('0xd3'),_0x90d9('0xd4'));_0x334262['texts'][_0x90d9('0x53')]=_0x334262['texts'][_0x90d9('0x53')][_0x90d9('0x2')](_0x90d9('0xd5'),_0x90d9('0xd6'));_0x334262[_0x90d9('0xd2')][_0x90d9('0x53')]=_0x334262[_0x90d9('0xd2')][_0x90d9('0x53')]['replace']('#shipping',_0x90d9('0xd7'));_0x334262[_0x90d9('0xd2')][_0x90d9('0x53')]=_0x334262['texts'][_0x90d9('0x53')][_0x90d9('0x2')](_0x90d9('0xd8'),_0x90d9('0xd9'));_0x4b7920['find'](_0x90d9('0xda'))[_0x90d9('0x4e')](_0x334262[_0x90d9('0xd2')][_0x90d9('0xdb')]);_0x4b7920[_0x90d9('0x52')](_0x90d9('0xdc'))[_0x90d9('0x4e')](_0x334262[_0x90d9('0xd2')][_0x90d9('0xdd')]);_0x4b7920[_0x90d9('0x52')](_0x90d9('0xde'))[_0x90d9('0x4e')](_0x334262['texts'][_0x90d9('0xdf')]);_0x4b7920[_0x90d9('0x52')]('.qd-ddc-infoTotal')['html'](_0x334262['texts'][_0x90d9('0x53')]);_0x4b7920[_0x90d9('0x52')](_0x90d9('0xe0'))[_0x90d9('0x4e')](_0x334262[_0x90d9('0xd2')]['shippingForm']);_0x4b7920[_0x90d9('0x52')]('.qd-ddc-emptyCart\x20p')[_0x90d9('0x4e')](_0x334262[_0x90d9('0xd2')][_0x90d9('0x56')]);return _0x4b7920;}(this['cartContainer']);var _0x3116de=0x0;_0x112060[_0x90d9('0x33')](function(){0x0<_0x3116de?_0xc56490['call'](this,_0x5c81ed[_0x90d9('0xe1')]()):_0xc56490['call'](this,_0x5c81ed);_0x3116de++;});window[_0x90d9('0x35')][_0x90d9('0x41')][_0x90d9('0x2c')](function(){_0x175dd0(_0x90d9('0xe2'))[_0x90d9('0x4e')](window['_QuatroDigital_CartData'][_0x90d9('0x39')]||'--');_0x175dd0(_0x90d9('0xe3'))[_0x90d9('0x4e')](window[_0x90d9('0x35')][_0x90d9('0x3d')]||'0');_0x175dd0(_0x90d9('0xe4'))['html'](window['_QuatroDigital_CartData']['shipping']||'--');_0x175dd0(_0x90d9('0xe5'))[_0x90d9('0x4e')](window[_0x90d9('0x35')]['allTotal']||'--');});var _0x4edda4=function(_0x3329f2,_0x205d0b){if(_0x90d9('0x19')===typeof _0x3329f2[_0x90d9('0x3f')])return _0x4f1424(_0x90d9('0xe6'));_0x4acac9[_0x90d9('0xe7')][_0x90d9('0x25')](this,_0x205d0b);};_0x4acac9[_0x90d9('0x89')]=function(_0x1c1c05,_0x56c807){'undefined'!=typeof _0x56c807?window[_0x90d9('0x58')][_0x90d9('0xe8')]=_0x56c807:window['_QuatroDigital_DropDown'][_0x90d9('0xe8')]&&(_0x56c807=window[_0x90d9('0x58')][_0x90d9('0xe8')]);setTimeout(function(){window[_0x90d9('0x58')]['dataOptionsCache']=void 0x0;},_0x334262[_0x90d9('0x88')]);_0x175dd0('.qd-ddc-wrapper')[_0x90d9('0x4a')](_0x90d9('0xe9'));if(_0x334262[_0x90d9('0x57')]){var _0x6c0630=function(_0x3b1cb3){window['_QuatroDigital_DropDown'][_0x90d9('0x24')]=_0x3b1cb3;_0x4edda4(_0x3b1cb3,_0x56c807);'undefined'!==typeof window[_0x90d9('0xea')]&&_0x90d9('0x9')===typeof window[_0x90d9('0xea')][_0x90d9('0xeb')]&&window['_QuatroDigital_AmountProduct']['exec'][_0x90d9('0x25')](this);_0x175dd0(_0x90d9('0xec'))[_0x90d9('0x49')](_0x90d9('0xe9'));};_0x90d9('0x19')!==typeof window[_0x90d9('0x58')]['getOrderForm']?(_0x6c0630(window[_0x90d9('0x58')][_0x90d9('0x24')]),_0x90d9('0x9')===typeof _0x1c1c05&&_0x1c1c05(window[_0x90d9('0x58')]['getOrderForm'])):_0x175dd0[_0x90d9('0x5b')]([_0x90d9('0x3f'),_0x90d9('0x37'),_0x90d9('0x5c')],{'done':function(_0x30ef06){_0x6c0630[_0x90d9('0x25')](this,_0x30ef06);_0x90d9('0x9')===typeof _0x1c1c05&&_0x1c1c05(_0x30ef06);},'fail':function(_0x5adbd8){_0x4f1424([_0x90d9('0xed'),_0x5adbd8]);}});}else alert(_0x90d9('0xee'));};_0x4acac9[_0x90d9('0xd0')]=function(){var _0x2a94dd=_0x175dd0(_0x90d9('0xec'));_0x2a94dd[_0x90d9('0x52')](_0x90d9('0xef'))[_0x90d9('0x7')]?_0x2a94dd[_0x90d9('0x4a')](_0x90d9('0xf0')):_0x2a94dd[_0x90d9('0x49')]('qd-ddc-noItems');};_0x4acac9[_0x90d9('0xe7')]=function(_0x10765f){var _0x6c0630=_0x175dd0(_0x90d9('0xf1'));_0x6c0630[_0x90d9('0xf2')]();_0x6c0630[_0x90d9('0x33')](function(){var _0x6c0630=_0x175dd0(this),_0x4db0ea,_0x23a1fe,_0x38957a=_0x175dd0(''),_0x143c50;for(_0x143c50 in window[_0x90d9('0x58')][_0x90d9('0x24')][_0x90d9('0x3f')])if(_0x90d9('0x16')===typeof window[_0x90d9('0x58')][_0x90d9('0x24')][_0x90d9('0x3f')][_0x143c50]){var _0x986232=window['_QuatroDigital_DropDown']['getOrderForm'][_0x90d9('0x3f')][_0x143c50];var _0x51e32f=_0x986232[_0x90d9('0xf3')][_0x90d9('0x2')](/^\/|\/$/g,'')['split']('/');var _0x7bf36b=_0x175dd0(_0x90d9('0xf4'));_0x7bf36b[_0x90d9('0x31')]({'data-sku':_0x986232['id'],'data-sku-index':_0x143c50,'data-qd-departament':_0x51e32f[0x0],'data-qd-category':_0x51e32f[_0x51e32f[_0x90d9('0x7')]-0x1]});_0x7bf36b[_0x90d9('0x49')](_0x90d9('0xf5')+_0x986232[_0x90d9('0xf6')]);_0x7bf36b[_0x90d9('0x52')](_0x90d9('0xf7'))[_0x90d9('0x7f')](_0x334262['skuName'](_0x986232));_0x7bf36b[_0x90d9('0x52')](_0x90d9('0xf8'))['append'](isNaN(_0x986232[_0x90d9('0xf9')])?_0x986232['sellingPrice']:0x0==_0x986232['sellingPrice']?_0x90d9('0xfa'):(_0x175dd0('meta[name=currency]')[_0x90d9('0x31')](_0x90d9('0x32'))||'R$')+'\x20'+qd_number_format(_0x986232[_0x90d9('0xf9')]/0x64,0x2,',','.'));_0x7bf36b['find'](_0x90d9('0xfb'))[_0x90d9('0x31')]({'data-sku':_0x986232['id'],'data-sku-index':_0x143c50})[_0x90d9('0xcb')](_0x986232[_0x90d9('0x40')]);_0x7bf36b[_0x90d9('0x52')](_0x90d9('0xfc'))[_0x90d9('0x31')]({'data-sku':_0x986232['id'],'data-sku-index':_0x143c50});_0x4acac9[_0x90d9('0xfd')](_0x986232['id'],_0x7bf36b[_0x90d9('0x52')]('.qd-ddc-image'),_0x986232[_0x90d9('0xfe')]);_0x7bf36b[_0x90d9('0x52')](_0x90d9('0xff'))[_0x90d9('0x31')]({'data-sku':_0x986232['id'],'data-sku-index':_0x143c50});_0x7bf36b[_0x90d9('0x100')](_0x6c0630);_0x38957a=_0x38957a['add'](_0x7bf36b);}try{var _0xd65a48=_0x6c0630[_0x90d9('0x0')](_0x90d9('0xec'))['find']('.qd-ddc-shipping\x20input');_0xd65a48[_0x90d9('0x7')]&&''==_0xd65a48[_0x90d9('0xcb')]()&&window[_0x90d9('0x58')][_0x90d9('0x24')][_0x90d9('0x5c')]['address']&&_0xd65a48[_0x90d9('0xcb')](window[_0x90d9('0x58')]['getOrderForm']['shippingData'][_0x90d9('0x101')]['postalCode']);}catch(_0xca7274){_0x4f1424(_0x90d9('0x102')+_0xca7274[_0x90d9('0x103')],_0x90d9('0x6a'));}_0x4acac9[_0x90d9('0x104')](_0x6c0630);_0x4acac9['cartIsEmpty']();_0x10765f&&_0x10765f[_0x90d9('0x105')]&&function(){_0x23a1fe=_0x38957a[_0x90d9('0x45')](_0x90d9('0x106')+_0x10765f[_0x90d9('0x105')]+'\x27]');_0x23a1fe[_0x90d9('0x7')]&&(_0x4db0ea=0x0,_0x38957a[_0x90d9('0x33')](function(){var _0x10765f=_0x175dd0(this);if(_0x10765f['is'](_0x23a1fe))return!0x1;_0x4db0ea+=_0x10765f[_0x90d9('0x107')]();}),_0x4acac9[_0x90d9('0xc9')](void 0x0,void 0x0,_0x4db0ea,_0x6c0630['add'](_0x6c0630[_0x90d9('0xa3')]())),_0x38957a[_0x90d9('0x4a')](_0x90d9('0x108')),function(_0x4cd66f){_0x4cd66f[_0x90d9('0x49')](_0x90d9('0x109'));_0x4cd66f[_0x90d9('0x49')](_0x90d9('0x108'));setTimeout(function(){_0x4cd66f[_0x90d9('0x4a')](_0x90d9('0x109'));},_0x334262[_0x90d9('0x88')]);}(_0x23a1fe));}();});(function(){_QuatroDigital_DropDown[_0x90d9('0x24')][_0x90d9('0x3f')][_0x90d9('0x7')]?(_0x175dd0(_0x90d9('0x6e'))[_0x90d9('0x4a')]('qd-ddc-cart-empty')[_0x90d9('0x49')](_0x90d9('0x10a')),setTimeout(function(){_0x175dd0(_0x90d9('0x6e'))[_0x90d9('0x4a')](_0x90d9('0x10b'));},_0x334262[_0x90d9('0x88')])):_0x175dd0(_0x90d9('0x6e'))['removeClass'](_0x90d9('0x10c'))[_0x90d9('0x49')]('qd-ddc-cart-empty');}());'function'===typeof _0x334262[_0x90d9('0x10d')]?_0x334262[_0x90d9('0x10d')][_0x90d9('0x25')](this):_0x4f1424(_0x90d9('0x10e'));};_0x4acac9['insertProdImg']=function(_0x55aca4,_0x512d7e,_0x12ca83){function _0x179dea(){_0x512d7e['removeClass'](_0x90d9('0x10f'))[_0x90d9('0x110')](function(){_0x175dd0(this)[_0x90d9('0x49')](_0x90d9('0x10f'));})[_0x90d9('0x31')](_0x90d9('0x111'),_0x12ca83);}_0x12ca83?_0x179dea():isNaN(_0x55aca4)?_0x4f1424(_0x90d9('0x112'),_0x90d9('0x28')):alert('Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.');};_0x4acac9[_0x90d9('0x104')]=function(_0x22a3b5){var _0x5d65bb=function(_0x10a650,_0x377b52){var _0x6c0630=_0x175dd0(_0x10a650);var _0x3141d9=_0x6c0630['attr'](_0x90d9('0x113'));var _0x4db0ea=_0x6c0630['attr']('data-sku-index');if(_0x3141d9){var _0x24399a=parseInt(_0x6c0630[_0x90d9('0xcb')]())||0x1;_0x4acac9['changeQantity']([_0x3141d9,_0x4db0ea],_0x24399a,_0x24399a+0x1,function(_0x52ad6a){_0x6c0630[_0x90d9('0xcb')](_0x52ad6a);_0x90d9('0x9')===typeof _0x377b52&&_0x377b52();});}};var _0x6c0630=function(_0x27bc87,_0x8cb5e){var _0x6c0630=_0x175dd0(_0x27bc87);var _0x4e7334=_0x6c0630[_0x90d9('0x31')]('data-sku');var _0x4db0ea=_0x6c0630[_0x90d9('0x31')]('data-sku-index');if(_0x4e7334){var _0x576bb8=parseInt(_0x6c0630[_0x90d9('0xcb')]())||0x2;_0x4acac9['changeQantity']([_0x4e7334,_0x4db0ea],_0x576bb8,_0x576bb8-0x1,function(_0x590a13){_0x6c0630[_0x90d9('0xcb')](_0x590a13);_0x90d9('0x9')===typeof _0x8cb5e&&_0x8cb5e();});}};var _0x4b984d=function(_0x291e9c,_0x4fbdf6){var _0x6c0630=_0x175dd0(_0x291e9c);var _0x16c558=_0x6c0630[_0x90d9('0x31')](_0x90d9('0x113'));var _0x4db0ea=_0x6c0630['attr'](_0x90d9('0x114'));if(_0x16c558){var _0x3464d0=parseInt(_0x6c0630['val']())||0x1;_0x4acac9[_0x90d9('0x115')]([_0x16c558,_0x4db0ea],0x1,_0x3464d0,function(_0x3aee96){_0x6c0630['val'](_0x3aee96);_0x90d9('0x9')===typeof _0x4fbdf6&&_0x4fbdf6();});}};var _0x4db0ea=_0x22a3b5[_0x90d9('0x52')](_0x90d9('0x116'));_0x4db0ea[_0x90d9('0x49')]('qd_on')[_0x90d9('0x33')](function(){var _0x22a3b5=_0x175dd0(this);_0x22a3b5[_0x90d9('0x52')]('.qd-ddc-quantityMore')['on'](_0x90d9('0x117'),function(_0x1a7b4d){_0x1a7b4d[_0x90d9('0x77')]();_0x4db0ea[_0x90d9('0x49')](_0x90d9('0x118'));_0x5d65bb(_0x22a3b5['find'](_0x90d9('0xfb')),function(){_0x4db0ea['removeClass'](_0x90d9('0x118'));});});_0x22a3b5['find'](_0x90d9('0x119'))['on'](_0x90d9('0x11a'),function(_0x3902eb){_0x3902eb[_0x90d9('0x77')]();_0x4db0ea[_0x90d9('0x49')]('qd-loading');_0x6c0630(_0x22a3b5[_0x90d9('0x52')](_0x90d9('0xfb')),function(){_0x4db0ea[_0x90d9('0x4a')](_0x90d9('0x118'));});});_0x22a3b5['find'](_0x90d9('0xfb'))['on'](_0x90d9('0x11b'),function(){_0x4db0ea[_0x90d9('0x49')](_0x90d9('0x118'));_0x4b984d(this,function(){_0x4db0ea['removeClass'](_0x90d9('0x118'));});});_0x22a3b5[_0x90d9('0x52')](_0x90d9('0xfb'))['on'](_0x90d9('0x11c'),function(_0x23784c){0xd==_0x23784c[_0x90d9('0xc5')]&&(_0x4db0ea['addClass'](_0x90d9('0x118')),_0x4b984d(this,function(){_0x4db0ea[_0x90d9('0x4a')](_0x90d9('0x118'));}));});});_0x22a3b5[_0x90d9('0x52')](_0x90d9('0xef'))[_0x90d9('0x33')](function(){var _0x22a3b5=_0x175dd0(this);_0x22a3b5[_0x90d9('0x52')](_0x90d9('0xfc'))['on'](_0x90d9('0x11d'),function(){_0x22a3b5[_0x90d9('0x49')](_0x90d9('0x118'));_0x4acac9[_0x90d9('0x11e')](_0x175dd0(this),function(_0x2f8494){_0x2f8494?_0x22a3b5['stop'](!0x0)[_0x90d9('0x11f')](function(){_0x22a3b5['remove']();_0x4acac9[_0x90d9('0xd0')]();}):_0x22a3b5[_0x90d9('0x4a')](_0x90d9('0x118'));});return!0x1;});});};_0x4acac9[_0x90d9('0xcd')]=function(_0x22c3f1){var _0xc43e74=_0x22c3f1[_0x90d9('0xcb')](),_0xc43e74=_0xc43e74[_0x90d9('0x2')](/[^0-9\-]/g,''),_0xc43e74=_0xc43e74[_0x90d9('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x90d9('0x120')),_0xc43e74=_0xc43e74['replace'](/(.{9}).*/g,'$1');_0x22c3f1[_0x90d9('0xcb')](_0xc43e74);0x9<=_0xc43e74[_0x90d9('0x7')]&&(_0x22c3f1[_0x90d9('0x17')](_0x90d9('0x121'))!=_0xc43e74&&_0x146110[_0x90d9('0x122')]({'postalCode':_0xc43e74,'country':_0x90d9('0x123')})[_0x90d9('0x66')](function(_0x31bc71){window[_0x90d9('0x58')][_0x90d9('0x24')]=_0x31bc71;_0x4acac9['getCartInfoByUrl']();})['fail'](function(_0x5c195d){_0x4f1424(['Não\x20foi\x20possível\x20calcular\x20o\x20frete',_0x5c195d]);updateCartData();}),_0x22c3f1[_0x90d9('0x17')](_0x90d9('0x121'),_0xc43e74));};_0x4acac9[_0x90d9('0x115')]=function(_0x389eec,_0x2a6424,_0x3cfb2e,_0x46d2fe){function _0x22d1b0(_0x4b430e){_0x4b430e=_0x90d9('0x124')!==typeof _0x4b430e?!0x1:_0x4b430e;_0x4acac9[_0x90d9('0x89')]();window['_QuatroDigital_DropDown']['allowUpdate']=!0x1;_0x4acac9[_0x90d9('0xd0')]();_0x90d9('0x19')!==typeof window['_QuatroDigital_AmountProduct']&&_0x90d9('0x9')===typeof window[_0x90d9('0xea')][_0x90d9('0xeb')]&&window[_0x90d9('0xea')][_0x90d9('0xeb')][_0x90d9('0x25')](this);_0x90d9('0x9')===typeof adminCart&&adminCart();_0x175dd0['fn'][_0x90d9('0x22')](!0x0,void 0x0,_0x4b430e);_0x90d9('0x9')===typeof _0x46d2fe&&_0x46d2fe(_0x2a6424);}_0x3cfb2e=_0x3cfb2e||0x1;if(0x1>_0x3cfb2e)return _0x2a6424;if(_0x334262['smartCheckout']){if(_0x90d9('0x19')===typeof window[_0x90d9('0x58')][_0x90d9('0x24')][_0x90d9('0x3f')][_0x389eec[0x1]])return _0x4f1424(_0x90d9('0x125')+_0x389eec[0x1]+']'),_0x2a6424;window['_QuatroDigital_DropDown'][_0x90d9('0x24')][_0x90d9('0x3f')][_0x389eec[0x1]][_0x90d9('0x40')]=_0x3cfb2e;window[_0x90d9('0x58')]['getOrderForm']['items'][_0x389eec[0x1]][_0x90d9('0x126')]=_0x389eec[0x1];_0x146110[_0x90d9('0x127')]([window[_0x90d9('0x58')][_0x90d9('0x24')][_0x90d9('0x3f')][_0x389eec[0x1]]],['items','totalizers',_0x90d9('0x5c')])['done'](function(_0xb364ea){window[_0x90d9('0x58')][_0x90d9('0x24')]=_0xb364ea;_0x22d1b0(!0x0);})['fail'](function(_0x5ea7a2){_0x4f1424([_0x90d9('0x128'),_0x5ea7a2]);_0x22d1b0();});}else _0x4f1424('atenção\x20esta\x20método\x20esta\x20descontinuado');};_0x4acac9[_0x90d9('0x11e')]=function(_0x305323,_0x16335c){function _0x48a700(_0x23e669){_0x23e669='boolean'!==typeof _0x23e669?!0x1:_0x23e669;_0x90d9('0x19')!==typeof window['_QuatroDigital_AmountProduct']&&_0x90d9('0x9')===typeof window['_QuatroDigital_AmountProduct']['exec']&&window[_0x90d9('0xea')]['exec']['call'](this);'function'===typeof adminCart&&adminCart();_0x175dd0['fn']['simpleCart'](!0x0,void 0x0,_0x23e669);_0x90d9('0x9')===typeof _0x16335c&&_0x16335c(_0x4db0ea);}var _0x4db0ea=!0x1,_0x36134d=_0x175dd0(_0x305323)[_0x90d9('0x31')]('data-sku-index');if(_0x334262[_0x90d9('0x57')]){if(_0x90d9('0x19')===typeof window[_0x90d9('0x58')][_0x90d9('0x24')][_0x90d9('0x3f')][_0x36134d])return _0x4f1424(_0x90d9('0x125')+_0x36134d+']'),_0x4db0ea;window[_0x90d9('0x58')]['getOrderForm'][_0x90d9('0x3f')][_0x36134d][_0x90d9('0x126')]=_0x36134d;_0x146110[_0x90d9('0x129')]([window[_0x90d9('0x58')][_0x90d9('0x24')][_0x90d9('0x3f')][_0x36134d]],['items','totalizers',_0x90d9('0x5c')])[_0x90d9('0x66')](function(_0x16a942){_0x4db0ea=!0x0;window[_0x90d9('0x58')][_0x90d9('0x24')]=_0x16a942;_0x4edda4(_0x16a942);_0x48a700(!0x0);})[_0x90d9('0x1c')](function(_0xb1217b){_0x4f1424([_0x90d9('0x12a'),_0xb1217b]);_0x48a700();});}else alert(_0x90d9('0x12b'));};_0x4acac9[_0x90d9('0xc9')]=function(_0x59f28d,_0x2de063,_0x5ccf83,_0x18cfc1){_0x18cfc1=_0x18cfc1||_0x175dd0('.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2');_0x59f28d=_0x59f28d||'+';_0x2de063=_0x2de063||0.9*_0x18cfc1[_0x90d9('0x12c')]();_0x18cfc1[_0x90d9('0x12d')](!0x0,!0x0)[_0x90d9('0x12e')]({'scrollTop':isNaN(_0x5ccf83)?_0x59f28d+'='+_0x2de063+'px':_0x5ccf83});};_0x334262['updateOnlyHover']||(_0x4acac9['getCartInfoByUrl'](),_0x175dd0['fn'][_0x90d9('0x22')](!0x0));_0x175dd0(window)['on'](_0x90d9('0x12f'),function(){try{window[_0x90d9('0x58')][_0x90d9('0x24')]=void 0x0,_0x4acac9[_0x90d9('0x89')]();}catch(_0x3c5c68){_0x4f1424(_0x90d9('0x130')+_0x3c5c68[_0x90d9('0x103')],'avisso');}});'function'===typeof _0x334262['callback']?_0x334262[_0x90d9('0x41')][_0x90d9('0x25')](this):_0x4f1424(_0x90d9('0x131'));};_0x175dd0['fn']['QD_dropDownCart']=function(_0x267e9e){var _0x178db7=_0x175dd0(this);_0x178db7['fn']=new _0x175dd0[(_0x90d9('0xb0'))](this,_0x267e9e);return _0x178db7;};}catch(_0x16a96d){_0x90d9('0x19')!==typeof console&&_0x90d9('0x9')===typeof console[_0x90d9('0x13')]&&console[_0x90d9('0x13')](_0x90d9('0xae'),_0x16a96d);}}(this));(function(_0x14a5d5){try{var _0x1ca5dd=jQuery;window[_0x90d9('0xea')]=window[_0x90d9('0xea')]||{};window[_0x90d9('0xea')][_0x90d9('0x3f')]={};window[_0x90d9('0xea')][_0x90d9('0x132')]=!0x1;window[_0x90d9('0xea')]['buyButtonClicked']=!0x1;window['_QuatroDigital_AmountProduct'][_0x90d9('0x133')]=!0x1;var _0x29fbd1=function(){if(window[_0x90d9('0xea')][_0x90d9('0x132')]){var _0x5bf1b8=!0x1;var _0x14a5d5={};window[_0x90d9('0xea')][_0x90d9('0x3f')]={};for(_0x3708a1 in window['_QuatroDigital_DropDown'][_0x90d9('0x24')][_0x90d9('0x3f')])if(_0x90d9('0x16')===typeof window[_0x90d9('0x58')][_0x90d9('0x24')][_0x90d9('0x3f')][_0x3708a1]){var _0x58de15=window[_0x90d9('0x58')][_0x90d9('0x24')][_0x90d9('0x3f')][_0x3708a1];'undefined'!==typeof _0x58de15[_0x90d9('0x134')]&&null!==_0x58de15[_0x90d9('0x134')]&&''!==_0x58de15['productId']&&(window[_0x90d9('0xea')][_0x90d9('0x3f')][_0x90d9('0x135')+_0x58de15[_0x90d9('0x134')]]=window[_0x90d9('0xea')][_0x90d9('0x3f')][_0x90d9('0x135')+_0x58de15[_0x90d9('0x134')]]||{},window[_0x90d9('0xea')][_0x90d9('0x3f')][_0x90d9('0x135')+_0x58de15['productId']][_0x90d9('0x136')]=_0x58de15[_0x90d9('0x134')],_0x14a5d5[_0x90d9('0x135')+_0x58de15[_0x90d9('0x134')]]||(window['_QuatroDigital_AmountProduct'][_0x90d9('0x3f')]['prod_'+_0x58de15[_0x90d9('0x134')]][_0x90d9('0x3d')]=0x0),window[_0x90d9('0xea')][_0x90d9('0x3f')][_0x90d9('0x135')+_0x58de15[_0x90d9('0x134')]]['qtt']+=_0x58de15[_0x90d9('0x40')],_0x5bf1b8=!0x0,_0x14a5d5[_0x90d9('0x135')+_0x58de15[_0x90d9('0x134')]]=!0x0);}var _0x3708a1=_0x5bf1b8;}else _0x3708a1=void 0x0;window['_QuatroDigital_AmountProduct'][_0x90d9('0x132')]&&(_0x1ca5dd(_0x90d9('0x137'))[_0x90d9('0x138')](),_0x1ca5dd('.qd-bap-item-added')[_0x90d9('0x4a')]('qd-bap-item-added'));for(var _0x45bba9 in window[_0x90d9('0xea')][_0x90d9('0x3f')]){_0x58de15=window[_0x90d9('0xea')][_0x90d9('0x3f')][_0x45bba9];if(_0x90d9('0x16')!==typeof _0x58de15)return;_0x14a5d5=_0x1ca5dd(_0x90d9('0x139')+_0x58de15['prodId']+']')[_0x90d9('0x0')]('li');if(window[_0x90d9('0xea')][_0x90d9('0x132')]||!_0x14a5d5[_0x90d9('0x52')](_0x90d9('0x137'))[_0x90d9('0x7')])_0x5bf1b8=_0x1ca5dd(_0x90d9('0x13a')),_0x5bf1b8[_0x90d9('0x52')](_0x90d9('0x13b'))['html'](_0x58de15[_0x90d9('0x3d')]),_0x58de15=_0x14a5d5[_0x90d9('0x52')](_0x90d9('0x13c')),_0x58de15[_0x90d9('0x7')]?_0x58de15[_0x90d9('0x13d')](_0x5bf1b8)['addClass']('qd-bap-item-added'):_0x14a5d5[_0x90d9('0x13d')](_0x5bf1b8);}_0x3708a1&&(window[_0x90d9('0xea')][_0x90d9('0x132')]=!0x1);};window[_0x90d9('0xea')][_0x90d9('0xeb')]=function(){window[_0x90d9('0xea')][_0x90d9('0x132')]=!0x0;_0x29fbd1[_0x90d9('0x25')](this);};_0x1ca5dd(document)[_0x90d9('0xad')](function(){_0x29fbd1[_0x90d9('0x25')](this);});}catch(_0x4cba79){_0x90d9('0x19')!==typeof console&&_0x90d9('0x9')===typeof console[_0x90d9('0x13')]&&console[_0x90d9('0x13')](_0x90d9('0xae'),_0x4cba79);}}(this));(function(){try{var _0x13074d=jQuery,_0x17b85e,_0x51c9b6={'selector':'.qdDdcContainer','dropDown':{},'buyButton':{}};_0x13074d[_0x90d9('0x13e')]=function(_0x21246d){var _0x13e88b={};_0x17b85e=_0x13074d[_0x90d9('0x14')](!0x0,{},_0x51c9b6,_0x21246d);_0x21246d=_0x13074d(_0x17b85e[_0x90d9('0x13f')])[_0x90d9('0xb0')](_0x17b85e[_0x90d9('0x140')]);_0x13e88b[_0x90d9('0x79')]=_0x90d9('0x19')!==typeof _0x17b85e[_0x90d9('0x140')][_0x90d9('0xce')]&&!0x1===_0x17b85e[_0x90d9('0x140')]['updateOnlyHover']?_0x13074d(_0x17b85e[_0x90d9('0x13f')])[_0x90d9('0x72')](_0x21246d['fn'],_0x17b85e[_0x90d9('0x79')]):_0x13074d(_0x17b85e[_0x90d9('0x13f')])['QD_buyButton'](_0x17b85e[_0x90d9('0x79')]);_0x13e88b['dropDown']=_0x21246d;return _0x13e88b;};_0x13074d['fn'][_0x90d9('0x141')]=function(){'object'===typeof console&&'function'===typeof console[_0x90d9('0x2b')]&&console[_0x90d9('0x2b')](_0x90d9('0x142'));};_0x13074d[_0x90d9('0x141')]=_0x13074d['fn'][_0x90d9('0x141')];}catch(_0x4933b3){_0x90d9('0x19')!==typeof console&&_0x90d9('0x9')===typeof console[_0x90d9('0x13')]&&console[_0x90d9('0x13')]('Oooops!\x20',_0x4933b3);}}());