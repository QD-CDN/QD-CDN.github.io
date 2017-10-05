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
var _0x5a69=['parent','qd-am-collection-wrapper','qdAjax','url','html','find','attr','each','clone','insertBefore','qd-am-content-loaded','text','trim','data-qdam-value','[class*=\x27colunas\x27]','hide','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','children',':not(ul)','qd-am-elem-','replaceSpecialChars','>li','>ul','qd-am-column','qd-am-dropdown','qd-am-level-','add','qd-am-','callback','QuatroDigital.am.callback','exec','getParent','function','QD_amazingMenu','object','undefined','error','info','warn','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','apply','join','qdAmAddNdx','addClass','qd-am-li-','first','qd-am-first','last','nfgrepurs%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','.qd_am_code','filter','.qd-am-collection','length'];(function(_0x142020,_0x1f7233){var _0x40da8f=function(_0x17f0a3){while(--_0x17f0a3){_0x142020['push'](_0x142020['shift']());}};_0x40da8f(++_0x1f7233);}(_0x5a69,0x14c));var _0x95a6=function(_0x3f9c88,_0xb1deb4){_0x3f9c88=_0x3f9c88-0x0;var _0x1607d5=_0x5a69[_0x3f9c88];return _0x1607d5;};(function(_0x46bbde){_0x46bbde['fn'][_0x95a6('0x0')]=_0x46bbde['fn']['closest'];}(jQuery));(function(_0x268842){var _0x5b9bf0;var _0xe4aa3c=jQuery;if(_0x95a6('0x1')!==typeof _0xe4aa3c['fn'][_0x95a6('0x2')]){var _0x471948={'url':'/qd-amazing-menu','callback':function(){},'ajaxCallback':function(){}};var _0x13b0d6=function(_0x2458cf,_0x2fdf41){if(_0x95a6('0x3')===typeof console&&_0x95a6('0x4')!==typeof console[_0x95a6('0x5')]&&_0x95a6('0x4')!==typeof console[_0x95a6('0x6')]&&_0x95a6('0x4')!==typeof console[_0x95a6('0x7')]){var _0x987943;_0x95a6('0x3')===typeof _0x2458cf?(_0x2458cf['unshift'](_0x95a6('0x8')),_0x987943=_0x2458cf):_0x987943=[_0x95a6('0x8')+_0x2458cf];if('undefined'===typeof _0x2fdf41||_0x95a6('0x9')!==_0x2fdf41[_0x95a6('0xa')]()&&_0x95a6('0xb')!==_0x2fdf41[_0x95a6('0xa')]())if(_0x95a6('0x4')!==typeof _0x2fdf41&&_0x95a6('0x6')===_0x2fdf41[_0x95a6('0xa')]())try{console[_0x95a6('0x6')][_0x95a6('0xc')](console,_0x987943);}catch(_0x16cad9){try{console[_0x95a6('0x6')](_0x987943[_0x95a6('0xd')]('\x0a'));}catch(_0x40c8c2){}}else try{console[_0x95a6('0x5')][_0x95a6('0xc')](console,_0x987943);}catch(_0x2b6504){try{console[_0x95a6('0x5')](_0x987943[_0x95a6('0xd')]('\x0a'));}catch(_0x2f5447){}}else try{console[_0x95a6('0x7')][_0x95a6('0xc')](console,_0x987943);}catch(_0x1c6eb5){try{console[_0x95a6('0x7')](_0x987943[_0x95a6('0xd')]('\x0a'));}catch(_0xe05aa9){}}}};_0xe4aa3c['fn'][_0x95a6('0xe')]=function(){var _0x463bf0=_0xe4aa3c(this);_0x463bf0['each'](function(_0x365447){_0xe4aa3c(this)[_0x95a6('0xf')](_0x95a6('0x10')+_0x365447);});_0x463bf0[_0x95a6('0x11')]()[_0x95a6('0xf')](_0x95a6('0x12'));_0x463bf0[_0x95a6('0x13')]()[_0x95a6('0xf')]('qd-am-last');return _0x463bf0;};_0xe4aa3c['fn'][_0x95a6('0x2')]=function(){};_0x268842=function(_0x87ba4d){var _0x2a143b={'z':_0x95a6('0x14')};return function(_0x18e2ed){var _0xb55768=function(_0x2f09da){return _0x2f09da;};var _0x36ab5a=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x18e2ed=_0x18e2ed['d'+_0x36ab5a[0x10]+'c'+_0x36ab5a[0x11]+'m'+_0xb55768(_0x36ab5a[0x1])+'n'+_0x36ab5a[0xd]]['l'+_0x36ab5a[0x12]+'c'+_0x36ab5a[0x0]+'ti'+_0xb55768('o')+'n'];var _0x23370f=function(_0x3f9421){return escape(encodeURIComponent(_0x3f9421[_0x95a6('0x15')](/\./g,'¨')[_0x95a6('0x15')](/[a-zA-Z]/g,function(_0x55c2fd){return String[_0x95a6('0x16')](('Z'>=_0x55c2fd?0x5a:0x7a)>=(_0x55c2fd=_0x55c2fd[_0x95a6('0x17')](0x0)+0xd)?_0x55c2fd:_0x55c2fd-0x1a);})));};var _0x1db142=_0x23370f(_0x18e2ed[[_0x36ab5a[0x9],_0xb55768('o'),_0x36ab5a[0xc],_0x36ab5a[_0xb55768(0xd)]]['join']('')]);_0x23370f=_0x23370f((window[['js',_0xb55768('no'),'m',_0x36ab5a[0x1],_0x36ab5a[0x4][_0x95a6('0x18')](),'ite'][_0x95a6('0xd')]('')]||_0x95a6('0x19'))+['.v',_0x36ab5a[0xd],'e',_0xb55768('x'),'co',_0xb55768('mm'),_0x95a6('0x1a'),_0x36ab5a[0x1],'.c',_0xb55768('o'),'m.',_0x36ab5a[0x13],'r'][_0x95a6('0xd')](''));for(var _0x1f8a4f in _0x2a143b){if(_0x23370f===_0x1f8a4f+_0x2a143b[_0x1f8a4f]||_0x1db142===_0x1f8a4f+_0x2a143b[_0x1f8a4f]){var _0x3022cb='tr'+_0x36ab5a[0x11]+'e';break;}_0x3022cb='f'+_0x36ab5a[0x0]+'ls'+_0xb55768(_0x36ab5a[0x1])+'';}_0xb55768=!0x1;-0x1<_0x18e2ed[[_0x36ab5a[0xc],'e',_0x36ab5a[0x0],'rc',_0x36ab5a[0x9]][_0x95a6('0xd')]('')][_0x95a6('0x1b')](_0x95a6('0x1c'))&&(_0xb55768=!0x0);return[_0x3022cb,_0xb55768];}(_0x87ba4d);}(window);if(!eval(_0x268842[0x0]))return _0x268842[0x1]?_0x13b0d6('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x35ccee=function(_0x59bbb2){var _0x5d7891=_0x59bbb2['find'](_0x95a6('0x1d'));var _0x34369a=_0x5d7891[_0x95a6('0x1e')]('.qd-am-banner');var _0xb766b6=_0x5d7891[_0x95a6('0x1e')](_0x95a6('0x1f'));if(_0x34369a[_0x95a6('0x20')]||_0xb766b6[_0x95a6('0x20')])_0x34369a[_0x95a6('0x21')]()[_0x95a6('0xf')]('qd-am-banner-wrapper'),_0xb766b6[_0x95a6('0x21')]()[_0x95a6('0xf')](_0x95a6('0x22')),_0xe4aa3c[_0x95a6('0x23')]({'url':_0x5b9bf0[_0x95a6('0x24')],'dataType':_0x95a6('0x25'),'success':function(_0x4ac0b5){var _0x36e0fb=_0xe4aa3c(_0x4ac0b5);_0x34369a['each'](function(){var _0x4ac0b5=_0xe4aa3c(this);var _0x27956f=_0x36e0fb[_0x95a6('0x26')]('img[alt=\x27'+_0x4ac0b5[_0x95a6('0x27')]('data-qdam-value')+'\x27]');_0x27956f[_0x95a6('0x20')]&&(_0x27956f[_0x95a6('0x28')](function(){_0xe4aa3c(this)[_0x95a6('0x0')]('.box-banner')[_0x95a6('0x29')]()[_0x95a6('0x2a')](_0x4ac0b5);}),_0x4ac0b5['hide']());})[_0x95a6('0xf')](_0x95a6('0x2b'));_0xb766b6[_0x95a6('0x28')](function(){var _0x4ac0b5={};var _0x2ceb0e=_0xe4aa3c(this);_0x36e0fb[_0x95a6('0x26')]('h2')[_0x95a6('0x28')](function(){if(_0xe4aa3c(this)[_0x95a6('0x2c')]()[_0x95a6('0x2d')]()['toLowerCase']()==_0x2ceb0e[_0x95a6('0x27')](_0x95a6('0x2e'))[_0x95a6('0x2d')]()[_0x95a6('0xa')]())return _0x4ac0b5=_0xe4aa3c(this),!0x1;});_0x4ac0b5[_0x95a6('0x20')]&&(_0x4ac0b5['each'](function(){_0xe4aa3c(this)['getParent'](_0x95a6('0x2f'))[_0x95a6('0x29')]()[_0x95a6('0x2a')](_0x2ceb0e);}),_0x2ceb0e[_0x95a6('0x30')]());})[_0x95a6('0xf')]('qd-am-content-loaded');},'error':function(){_0x13b0d6(_0x95a6('0x31')+_0x5b9bf0['url']+_0x95a6('0x32'));},'complete':function(){_0x5b9bf0[_0x95a6('0x33')][_0x95a6('0x34')](this);_0xe4aa3c(window)[_0x95a6('0x35')](_0x95a6('0x36'),_0x59bbb2);},'clearQueueDelay':0xbb8});};_0xe4aa3c[_0x95a6('0x2')]=function(_0x2eeef8){var _0x431020=_0x2eeef8[_0x95a6('0x26')](_0x95a6('0x37'))[_0x95a6('0x28')](function(){var _0x29c24d=_0xe4aa3c(this);if(!_0x29c24d[_0x95a6('0x20')])return _0x13b0d6([_0x95a6('0x38'),_0x2eeef8],'alerta');_0x29c24d[_0x95a6('0x26')](_0x95a6('0x39'))['parent']()['addClass'](_0x95a6('0x3a'));_0x29c24d[_0x95a6('0x26')]('li')[_0x95a6('0x28')](function(){var _0xa66208=_0xe4aa3c(this);var _0x49b0c5=_0xa66208[_0x95a6('0x3b')](_0x95a6('0x3c'));_0x49b0c5[_0x95a6('0x20')]&&_0xa66208[_0x95a6('0xf')](_0x95a6('0x3d')+_0x49b0c5[_0x95a6('0x11')]()[_0x95a6('0x2c')]()['trim']()[_0x95a6('0x3e')]()[_0x95a6('0x15')](/\./g,'')[_0x95a6('0x15')](/\s/g,'-')[_0x95a6('0xa')]());});var _0x2412a6=_0x29c24d[_0x95a6('0x26')](_0x95a6('0x3f'))['qdAmAddNdx']();_0x29c24d[_0x95a6('0xf')]('qd-amazing-menu');_0x2412a6=_0x2412a6[_0x95a6('0x26')](_0x95a6('0x40'));_0x2412a6[_0x95a6('0x28')](function(){var _0x382384=_0xe4aa3c(this);_0x382384[_0x95a6('0x26')](_0x95a6('0x3f'))['qdAmAddNdx']()[_0x95a6('0xf')](_0x95a6('0x41'));_0x382384['addClass']('qd-am-dropdown-menu');_0x382384[_0x95a6('0x21')]()[_0x95a6('0xf')](_0x95a6('0x42'));});_0x2412a6[_0x95a6('0xf')](_0x95a6('0x42'));var _0x1b783b=0x0,_0x268842=function(_0x7d2afa){_0x1b783b+=0x1;_0x7d2afa=_0x7d2afa['children']('li')[_0x95a6('0x3b')]('*');_0x7d2afa[_0x95a6('0x20')]&&(_0x7d2afa['addClass'](_0x95a6('0x43')+_0x1b783b),_0x268842(_0x7d2afa));};_0x268842(_0x29c24d);_0x29c24d[_0x95a6('0x44')](_0x29c24d[_0x95a6('0x26')]('ul'))['each'](function(){var _0xe951d7=_0xe4aa3c(this);_0xe951d7[_0x95a6('0xf')](_0x95a6('0x45')+_0xe951d7[_0x95a6('0x3b')]('li')['length']+'-li');});});_0x35ccee(_0x431020);_0x5b9bf0[_0x95a6('0x46')]['call'](this);_0xe4aa3c(window)['trigger'](_0x95a6('0x47'),_0x2eeef8);};_0xe4aa3c['fn'][_0x95a6('0x2')]=function(_0x1c1f09){var _0x452426=_0xe4aa3c(this);if(!_0x452426[_0x95a6('0x20')])return _0x452426;_0x5b9bf0=_0xe4aa3c['extend']({},_0x471948,_0x1c1f09);_0x452426[_0x95a6('0x48')]=new _0xe4aa3c[(_0x95a6('0x2'))](_0xe4aa3c(this));return _0x452426;};_0xe4aa3c(function(){_0xe4aa3c('.qd_amazing_menu_auto')[_0x95a6('0x2')]();});}}(this));

/*  Automatizador de comments box do Facebook Carlos Vinicius [Quatro Digital] */
/* Automatizador de comments box do Facebook // 1.6 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a=$(".fb-comments");a.length&&a.attr("data-href",document.location.href.split("#").shift().split("?").shift());$("#fb-root").length||$("body").append('<div id="fb-root"></div>');if(!$("script#facebook-jssdk").length){a=$("meta[property='fb:app_id']").attr("content")||!1;var b,c=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||(b=document.createElement("script"),b.id="facebook-jssdk",b.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+
(a?"&appId="+a:""),c.parentNode.insertBefore(b,c))}"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse()});

/* Quatro Digital Smart Cart */
var _0x9b87=['<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','name','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','SDK','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_lightBoxOverlay','off','keyup.qd_ddc_closeFn','keyCode','qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','.qd-ddc-shipping\x20input','val','keyup.qd_ddc_cep','shippingCalculate','updateOnlyHover','mouseleave.qd_ddc_hover','texts','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','clone','.qd-ddc-infoTotalShipping','.qd-ddc-infoAllTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','cartIsEmpty','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','availability','.qd-ddc-prodName','skuName','.qd-ddc-prodPrice','sellingPrice','Grátis','content','quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','lastSku','[data-sku=\x27','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','actionButtons','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','preventDefault','qd-loading','.qd-ddc-quantity','click.qd_ddc_minus','focusout.qd_ddc_change','click.qd_ddc_remove','removeProduct','stop','remove','$1-$2$3','qdDdcLastPostalCode','calculateShipping','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','allowRecalculate','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','.qdDdcContainer','QD_smartCart','selector','dropDown','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','smartCart','getParent','closest','replace','abs','undefined','round','split','length','join','prototype','trim','function','capitalize','charAt','slice','qdAjax','jquery','error','extend','object','data','stringify','toString','url','type','jqXHR','done','always','complete','clearQueueDelay','message','version','4.0','simpleCart','checkout','getOrderForm','call','QuatroDigital_simpleCart','alerta','toLowerCase','[Simple\x20Cart]\x0a','warn','info','add','QD_simpleCart','elements','.qd_cart_qtt','.qd_cart_total','meta[name=currency]','each','qd_simpleCartOpts','_QuatroDigital_CartData','Shipping','totalizers','value','total','currencySymbol','shipping','allTotal','qtt','items','callback','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','hide','filter','.singular','show','.plural','addClass','qd-emptyCart','removeClass','$this','cartTotalE','html','itemsTextE','cartQttE','cartQtt','find','cartTotal','itemsText','emptyElem','emptyCart','qd-sc-populated','smartCheckout','_QuatroDigital_DropDown','vtexjs','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','shippingData','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','trigger','simpleCartCallback.quatro_digital','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','Oooops!\x20','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','fail','Callbacks','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','.productInformationWrapper\x20\x20a.buy-button','input.buy-in-page-quantity','javascript:','Produto\x20adicionado\x20ao\x20carrinho!','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','location','href','body','#produto,\x20.produto','QD_buyButton','isSmartCheckout','qd-bb-click-active','click.qd_bb_buy_sc','allowBuyClick','clickBuySmartCheckout','Método\x20descontinuado!','buyButton','.qd-sbb-on','.btn-add-buy-button-asynchronous','.remove-href','qd-bb-active','children','.qd-bb-productAdded','append','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','.buy-in-page-button','isProductPage','_Quatro_Digital_dropDown','prodAdd','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','[href=\x27','qd-bb-itemAddBuyButtonWrapper','qd-bb-itemAddCartWrapper','getCartInfoByUrl','função\x20descontinuada','allowUpdate','autoWatchBuyButton','unbind','click','bind','load','mouseenter.qd_bb_buy_sc','attr','indexOf','execDefaultAction','redirect=false','queue','test','push','productPageCallback','ku=','pop','shift','asyncCallback','productAddedToCart','cartProductAdded.vtex','success','ajax','buyButtonClickCallback','parent','_QuatroDigital_prodBuyCallback','Callback\x20não\x20é\x20uma\x20função','.qd-bb-itemAddWrapper','prepend','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','/checkout/cart/add','productAddedToCart.qdSbbVtex','QuatroDigital.qd_bb_prod_add','ajaxStop','toFixed','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','QD_dropDownCart','nfgrepurs%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','toUpperCase','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','Finalizar\x20Compra'];(function(_0xb9170d,_0x479702){var _0x4331fc=function(_0x26d074){while(--_0x26d074){_0xb9170d['push'](_0xb9170d['shift']());}};_0x4331fc(++_0x479702);}(_0x9b87,0x8e));var _0x79b8=function(_0x59a1a5,_0x756d3){_0x59a1a5=_0x59a1a5-0x0;var _0x13ccc0=_0x9b87[_0x59a1a5];return _0x13ccc0;};(function(_0x36ba53){_0x36ba53['fn'][_0x79b8('0x0')]=_0x36ba53['fn'][_0x79b8('0x1')];}(jQuery));function qd_number_format(_0x7078,_0x77ad5c,_0x4386a6,_0x23b645){_0x7078=(_0x7078+'')[_0x79b8('0x2')](/[^0-9+\-Ee.]/g,'');_0x7078=isFinite(+_0x7078)?+_0x7078:0x0;_0x77ad5c=isFinite(+_0x77ad5c)?Math[_0x79b8('0x3')](_0x77ad5c):0x0;_0x23b645=_0x79b8('0x4')===typeof _0x23b645?',':_0x23b645;_0x4386a6=_0x79b8('0x4')===typeof _0x4386a6?'.':_0x4386a6;var _0x2e21b9='',_0x2e21b9=function(_0x1d2c9f,_0xf5e0f2){var _0x77ad5c=Math['pow'](0xa,_0xf5e0f2);return''+(Math['round'](_0x1d2c9f*_0x77ad5c)/_0x77ad5c)['toFixed'](_0xf5e0f2);},_0x2e21b9=(_0x77ad5c?_0x2e21b9(_0x7078,_0x77ad5c):''+Math[_0x79b8('0x5')](_0x7078))[_0x79b8('0x6')]('.');0x3<_0x2e21b9[0x0][_0x79b8('0x7')]&&(_0x2e21b9[0x0]=_0x2e21b9[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x23b645));(_0x2e21b9[0x1]||'')[_0x79b8('0x7')]<_0x77ad5c&&(_0x2e21b9[0x1]=_0x2e21b9[0x1]||'',_0x2e21b9[0x1]+=Array(_0x77ad5c-_0x2e21b9[0x1][_0x79b8('0x7')]+0x1)[_0x79b8('0x8')]('0'));return _0x2e21b9['join'](_0x4386a6);};'function'!==typeof String[_0x79b8('0x9')][_0x79b8('0xa')]&&(String[_0x79b8('0x9')][_0x79b8('0xa')]=function(){return this[_0x79b8('0x2')](/^\s+|\s+$/g,'');});_0x79b8('0xb')!=typeof String[_0x79b8('0x9')][_0x79b8('0xc')]&&(String[_0x79b8('0x9')][_0x79b8('0xc')]=function(){return this[_0x79b8('0xd')](0x0)['toUpperCase']()+this[_0x79b8('0xe')](0x1)['toLowerCase']();});(function(_0x565b54){if(_0x79b8('0xb')!==typeof _0x565b54[_0x79b8('0xf')]){var _0x57a248={};_0x565b54['qdAjaxQueue']=_0x57a248;0x96>parseInt((_0x565b54['fn'][_0x79b8('0x10')]['replace'](/[^0-9]+/g,'')+'000')[_0x79b8('0xe')](0x0,0x3),0xa)&&console&&_0x79b8('0xb')==typeof console[_0x79b8('0x11')]&&console[_0x79b8('0x11')]();_0x565b54[_0x79b8('0xf')]=function(_0x23d771){try{var _0x597f3b=_0x565b54[_0x79b8('0x12')]({},{'url':'','type':'GET','data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x23d771);var _0x53d386=_0x79b8('0x13')===typeof _0x597f3b[_0x79b8('0x14')]?JSON[_0x79b8('0x15')](_0x597f3b[_0x79b8('0x14')]):_0x597f3b[_0x79b8('0x14')][_0x79b8('0x16')]();var _0x3611c3=encodeURIComponent(_0x597f3b[_0x79b8('0x17')]+'|'+_0x597f3b[_0x79b8('0x18')]+'|'+_0x53d386);_0x57a248[_0x3611c3]=_0x57a248[_0x3611c3]||{};'undefined'==typeof _0x57a248[_0x3611c3][_0x79b8('0x19')]?_0x57a248[_0x3611c3][_0x79b8('0x19')]=_0x565b54['ajax'](_0x597f3b):(_0x57a248[_0x3611c3][_0x79b8('0x19')][_0x79b8('0x1a')](_0x597f3b['success']),_0x57a248[_0x3611c3][_0x79b8('0x19')]['fail'](_0x597f3b['error']),_0x57a248[_0x3611c3][_0x79b8('0x19')][_0x79b8('0x1b')](_0x597f3b[_0x79b8('0x1c')]));_0x57a248[_0x3611c3][_0x79b8('0x19')][_0x79b8('0x1b')](function(){isNaN(parseInt(_0x597f3b['clearQueueDelay']))||setTimeout(function(){_0x57a248[_0x3611c3][_0x79b8('0x19')]=void 0x0;},_0x597f3b[_0x79b8('0x1d')]);});return _0x57a248[_0x3611c3][_0x79b8('0x19')];}catch(_0x3ba5ac){'undefined'!==typeof console&&_0x79b8('0xb')===typeof console[_0x79b8('0x11')]&&console[_0x79b8('0x11')]('Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20'+_0x3ba5ac[_0x79b8('0x1e')]);}};_0x565b54[_0x79b8('0xf')][_0x79b8('0x1f')]=_0x79b8('0x20');}}(jQuery));(function(_0x3662aa){_0x3662aa['fn'][_0x79b8('0x0')]=_0x3662aa['fn']['closest'];}(jQuery));(function(){var _0x434ecd=jQuery;if('function'!==typeof _0x434ecd['fn'][_0x79b8('0x21')]){_0x434ecd(function(){var _0x4a4d64=vtexjs[_0x79b8('0x22')][_0x79b8('0x23')];vtexjs[_0x79b8('0x22')]['getOrderForm']=function(){return _0x4a4d64[_0x79b8('0x24')]();};});try{window[_0x79b8('0x25')]=window[_0x79b8('0x25')]||{};window[_0x79b8('0x25')]['ajaxStopOn']=!0x1;_0x434ecd['fn'][_0x79b8('0x21')]=function(_0x540e49,_0x4ed9b5,_0x38bb08){var _0x38b521=function(_0x4a038b,_0x3ff557){if('object'===typeof console){var _0x4c5696=_0x79b8('0x13')===typeof _0x4a038b;'undefined'!==typeof _0x3ff557&&_0x79b8('0x26')===_0x3ff557[_0x79b8('0x27')]()?_0x4c5696?console['warn'](_0x79b8('0x28'),_0x4a038b[0x0],_0x4a038b[0x1],_0x4a038b[0x2],_0x4a038b[0x3],_0x4a038b[0x4],_0x4a038b[0x5],_0x4a038b[0x6],_0x4a038b[0x7]):console[_0x79b8('0x29')](_0x79b8('0x28')+_0x4a038b):_0x79b8('0x4')!==typeof _0x3ff557&&_0x79b8('0x2a')===_0x3ff557[_0x79b8('0x27')]()?_0x4c5696?console['info'](_0x79b8('0x28'),_0x4a038b[0x0],_0x4a038b[0x1],_0x4a038b[0x2],_0x4a038b[0x3],_0x4a038b[0x4],_0x4a038b[0x5],_0x4a038b[0x6],_0x4a038b[0x7]):console[_0x79b8('0x2a')](_0x79b8('0x28')+_0x4a038b):_0x4c5696?console[_0x79b8('0x11')](_0x79b8('0x28'),_0x4a038b[0x0],_0x4a038b[0x1],_0x4a038b[0x2],_0x4a038b[0x3],_0x4a038b[0x4],_0x4a038b[0x5],_0x4a038b[0x6],_0x4a038b[0x7]):console[_0x79b8('0x11')](_0x79b8('0x28')+_0x4a038b);}};var _0x116e9e=_0x434ecd(this);_0x79b8('0x13')===typeof _0x540e49?_0x4ed9b5=_0x540e49:(_0x540e49=_0x540e49||!0x1,_0x116e9e=_0x116e9e[_0x79b8('0x2b')](_0x434ecd[_0x79b8('0x2c')]['elements']));if(!_0x116e9e[_0x79b8('0x7')])return _0x116e9e;_0x434ecd[_0x79b8('0x2c')][_0x79b8('0x2d')]=_0x434ecd['QD_simpleCart'][_0x79b8('0x2d')][_0x79b8('0x2b')](_0x116e9e);_0x38bb08=_0x79b8('0x4')===typeof _0x38bb08?!0x1:_0x38bb08;var _0x1f0dea={'cartQtt':_0x79b8('0x2e'),'cartTotal':_0x79b8('0x2f'),'itemsText':'.qd_items_text','currencySymbol':(_0x434ecd(_0x79b8('0x30'))['attr']('content')||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x1eeb29=_0x434ecd['extend']({},_0x1f0dea,_0x4ed9b5);var _0x4da2f8=_0x434ecd('');_0x116e9e[_0x79b8('0x31')](function(){var _0x1f211a=_0x434ecd(this);_0x1f211a[_0x79b8('0x14')](_0x79b8('0x32'))||_0x1f211a[_0x79b8('0x14')](_0x79b8('0x32'),_0x1eeb29);});var _0x464a5e=function(_0x2aac60){window[_0x79b8('0x33')]=window[_0x79b8('0x33')]||{};for(var _0x540e49=0x0,_0x157f92=0x0,_0x2ec1af=0x0;_0x2ec1af<_0x2aac60['totalizers'][_0x79b8('0x7')];_0x2ec1af++)_0x79b8('0x34')==_0x2aac60['totalizers'][_0x2ec1af]['id']&&(_0x157f92+=_0x2aac60[_0x79b8('0x35')][_0x2ec1af][_0x79b8('0x36')]),_0x540e49+=_0x2aac60['totalizers'][_0x2ec1af][_0x79b8('0x36')];window[_0x79b8('0x33')][_0x79b8('0x37')]=_0x1eeb29[_0x79b8('0x38')]+qd_number_format(_0x540e49/0x64,0x2,',','.');window[_0x79b8('0x33')][_0x79b8('0x39')]=_0x1eeb29[_0x79b8('0x38')]+qd_number_format(_0x157f92/0x64,0x2,',','.');window[_0x79b8('0x33')][_0x79b8('0x3a')]=_0x1eeb29[_0x79b8('0x38')]+qd_number_format((_0x540e49+_0x157f92)/0x64,0x2,',','.');window[_0x79b8('0x33')][_0x79b8('0x3b')]=0x0;if(_0x1eeb29['showQuantityByItems'])for(_0x2ec1af=0x0;_0x2ec1af<_0x2aac60['items'][_0x79b8('0x7')];_0x2ec1af++)window[_0x79b8('0x33')][_0x79b8('0x3b')]+=_0x2aac60[_0x79b8('0x3c')][_0x2ec1af]['quantity'];else window[_0x79b8('0x33')][_0x79b8('0x3b')]=_0x2aac60[_0x79b8('0x3c')][_0x79b8('0x7')]||0x0;try{window['_QuatroDigital_CartData'][_0x79b8('0x3d')]&&window[_0x79b8('0x33')][_0x79b8('0x3d')][_0x79b8('0x3e')]&&window['_QuatroDigital_CartData'][_0x79b8('0x3d')][_0x79b8('0x3e')]();}catch(_0x2cf85d){_0x38b521(_0x79b8('0x3f'));}_0x14f722(_0x4da2f8);};var _0x354ddc=function(_0x3eb72b,_0x478ebb){0x1===_0x3eb72b?_0x478ebb[_0x79b8('0x40')]()[_0x79b8('0x41')](_0x79b8('0x42'))[_0x79b8('0x43')]():_0x478ebb['hide']()['filter'](_0x79b8('0x44'))[_0x79b8('0x43')]();};var _0x324161=function(_0x12e1ae){0x1>_0x12e1ae?_0x116e9e[_0x79b8('0x45')](_0x79b8('0x46')):_0x116e9e[_0x79b8('0x47')](_0x79b8('0x46'));};var _0x4b0525=function(_0x51cd68,_0x19ad75){var _0x374fe9=parseInt(window[_0x79b8('0x33')]['qtt'],0xa);_0x19ad75[_0x79b8('0x48')]['show']();isNaN(_0x374fe9)&&(_0x38b521('O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.',_0x79b8('0x26')),_0x374fe9=0x0);_0x19ad75[_0x79b8('0x49')][_0x79b8('0x4a')](window[_0x79b8('0x33')]['total']);_0x19ad75['cartQttE'][_0x79b8('0x4a')](_0x374fe9);_0x354ddc(_0x374fe9,_0x19ad75[_0x79b8('0x4b')]);_0x324161(_0x374fe9);};var _0x14f722=function(_0x43f401){_0x116e9e[_0x79b8('0x31')](function(){var _0xcfb9c2={};var _0x3f3ffc=_0x434ecd(this);_0x540e49&&_0x3f3ffc[_0x79b8('0x14')](_0x79b8('0x32'))&&_0x434ecd[_0x79b8('0x12')](_0x1eeb29,_0x3f3ffc[_0x79b8('0x14')](_0x79b8('0x32')));_0xcfb9c2[_0x79b8('0x48')]=_0x3f3ffc;_0xcfb9c2[_0x79b8('0x4c')]=_0x3f3ffc['find'](_0x1eeb29[_0x79b8('0x4d')])||_0x4da2f8;_0xcfb9c2[_0x79b8('0x49')]=_0x3f3ffc[_0x79b8('0x4e')](_0x1eeb29[_0x79b8('0x4f')])||_0x4da2f8;_0xcfb9c2['itemsTextE']=_0x3f3ffc['find'](_0x1eeb29[_0x79b8('0x50')])||_0x4da2f8;_0xcfb9c2[_0x79b8('0x51')]=_0x3f3ffc[_0x79b8('0x4e')](_0x1eeb29[_0x79b8('0x52')])||_0x4da2f8;_0x4b0525(_0x43f401,_0xcfb9c2);_0x3f3ffc['addClass'](_0x79b8('0x53'));});};(function(){if(_0x1eeb29[_0x79b8('0x54')]){window['_QuatroDigital_DropDown']=window[_0x79b8('0x55')]||{};if(_0x79b8('0x4')!==typeof window[_0x79b8('0x55')]['getOrderForm']&&(_0x38bb08||!_0x540e49))return _0x464a5e(window[_0x79b8('0x55')]['getOrderForm']);if(_0x79b8('0x13')!==typeof window[_0x79b8('0x56')]||_0x79b8('0x4')===typeof window[_0x79b8('0x56')][_0x79b8('0x22')])if(_0x79b8('0x13')===typeof vtex&&_0x79b8('0x13')===typeof vtex[_0x79b8('0x22')]&&_0x79b8('0x4')!==typeof vtex[_0x79b8('0x22')]['SDK'])new vtex[(_0x79b8('0x22'))]['SDK']();else return _0x38b521(_0x79b8('0x57'));_0x434ecd['QD_checkoutQueue']([_0x79b8('0x3c'),_0x79b8('0x35'),_0x79b8('0x58')],{'done':function(_0x20b2f3){_0x464a5e(_0x20b2f3);window[_0x79b8('0x55')][_0x79b8('0x23')]=_0x20b2f3;},'fail':function(_0x1d5b81){_0x38b521(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.',_0x1d5b81]);}});}else alert(_0x79b8('0x59'));}());_0x1eeb29[_0x79b8('0x3d')]();_0x434ecd(window)[_0x79b8('0x5a')](_0x79b8('0x5b'));return _0x116e9e;};_0x434ecd[_0x79b8('0x2c')]={'elements':_0x434ecd('')};_0x434ecd(function(){var _0x3b18f9;'function'===typeof window[_0x79b8('0x5c')]&&(_0x3b18f9=window[_0x79b8('0x5c')],window['ajaxRequestbuyButtonAsynchronous']=function(_0x319043,_0x586204,_0xadb335,_0x1eb0dc,_0x5bcdde){_0x3b18f9[_0x79b8('0x24')](this,_0x319043,_0x586204,_0xadb335,_0x1eb0dc,function(){_0x79b8('0xb')===typeof _0x5bcdde&&_0x5bcdde();_0x434ecd['QD_simpleCart'][_0x79b8('0x2d')]['each'](function(){var _0x2e11a6=_0x434ecd(this);_0x2e11a6['simpleCart'](_0x2e11a6[_0x79b8('0x14')](_0x79b8('0x32')));});});});});var _0x41f243=window[_0x79b8('0x5d')]||void 0x0;window[_0x79b8('0x5d')]=function(_0x234855){_0x434ecd['fn']['simpleCart'](!0x0);_0x79b8('0xb')===typeof _0x41f243?_0x41f243[_0x79b8('0x24')](this,_0x234855):alert(_0x234855);};_0x434ecd(function(){var _0x5c02a7=_0x434ecd('.qd_cart_auto');_0x5c02a7[_0x79b8('0x7')]&&_0x5c02a7[_0x79b8('0x21')]();});_0x434ecd(function(){_0x434ecd(window)['bind'](_0x79b8('0x5e'),function(){_0x434ecd['fn'][_0x79b8('0x21')](!0x0);});});}catch(_0x2daf0a){'undefined'!==typeof console&&_0x79b8('0xb')===typeof console[_0x79b8('0x11')]&&console[_0x79b8('0x11')](_0x79b8('0x5f'),_0x2daf0a);}}}());(function(){var _0x41b63e=function(_0x2ac984,_0x54b5af){if(_0x79b8('0x13')===typeof console){var _0x16af68=_0x79b8('0x13')===typeof _0x2ac984;'undefined'!==typeof _0x54b5af&&_0x79b8('0x26')===_0x54b5af[_0x79b8('0x27')]()?_0x16af68?console['warn']('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x2ac984[0x0],_0x2ac984[0x1],_0x2ac984[0x2],_0x2ac984[0x3],_0x2ac984[0x4],_0x2ac984[0x5],_0x2ac984[0x6],_0x2ac984[0x7]):console[_0x79b8('0x29')](_0x79b8('0x60')+_0x2ac984):_0x79b8('0x4')!==typeof _0x54b5af&&_0x79b8('0x2a')===_0x54b5af[_0x79b8('0x27')]()?_0x16af68?console[_0x79b8('0x2a')](_0x79b8('0x60'),_0x2ac984[0x0],_0x2ac984[0x1],_0x2ac984[0x2],_0x2ac984[0x3],_0x2ac984[0x4],_0x2ac984[0x5],_0x2ac984[0x6],_0x2ac984[0x7]):console[_0x79b8('0x2a')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a'+_0x2ac984):_0x16af68?console[_0x79b8('0x11')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x2ac984[0x0],_0x2ac984[0x1],_0x2ac984[0x2],_0x2ac984[0x3],_0x2ac984[0x4],_0x2ac984[0x5],_0x2ac984[0x6],_0x2ac984[0x7]):console['error'](_0x79b8('0x60')+_0x2ac984);}},_0x441aad=null,_0x4bdd55={},_0x33d1f6={},_0x1e2516={};$['QD_checkoutQueue']=function(_0x3cd784,_0x43b067){if(null===_0x441aad)if(_0x79b8('0x13')===typeof window['vtexjs']&&_0x79b8('0x4')!==typeof window[_0x79b8('0x56')][_0x79b8('0x22')])_0x441aad=window[_0x79b8('0x56')][_0x79b8('0x22')];else return _0x41b63e(_0x79b8('0x61'));var _0x1707ad=$[_0x79b8('0x12')]({'done':function(){},'fail':function(){}},_0x43b067),_0x2c84d0=_0x3cd784[_0x79b8('0x8')](';'),_0x429c41=function(){_0x4bdd55[_0x2c84d0][_0x79b8('0x2b')](_0x1707ad['done']);_0x33d1f6[_0x2c84d0][_0x79b8('0x2b')](_0x1707ad[_0x79b8('0x62')]);};_0x1e2516[_0x2c84d0]?_0x429c41():(_0x4bdd55[_0x2c84d0]=$[_0x79b8('0x63')](),_0x33d1f6[_0x2c84d0]=$[_0x79b8('0x63')](),_0x429c41(),_0x1e2516[_0x2c84d0]=!0x0,_0x441aad[_0x79b8('0x23')](_0x3cd784)[_0x79b8('0x1a')](function(_0x15cc71){_0x1e2516[_0x2c84d0]=!0x1;_0x4bdd55[_0x2c84d0][_0x79b8('0x3e')](_0x15cc71);})[_0x79b8('0x62')](function(_0x536868){_0x1e2516[_0x2c84d0]=!0x1;_0x33d1f6[_0x2c84d0][_0x79b8('0x3e')](_0x536868);}));};}());(function(_0x4d116d){try{var _0x43420b=jQuery,_0x4a8cd0,_0x5b785b=_0x43420b({}),_0x211575=function(_0xec6d81,_0x1552c1){if(_0x79b8('0x13')===typeof console&&_0x79b8('0x4')!==typeof console[_0x79b8('0x11')]&&_0x79b8('0x4')!==typeof console['info']&&'undefined'!==typeof console['warn']){var _0x435942;_0x79b8('0x13')===typeof _0xec6d81?(_0xec6d81[_0x79b8('0x64')](_0x79b8('0x65')),_0x435942=_0xec6d81):_0x435942=[_0x79b8('0x65')+_0xec6d81];if(_0x79b8('0x4')===typeof _0x1552c1||_0x79b8('0x26')!==_0x1552c1[_0x79b8('0x27')]()&&_0x79b8('0x66')!==_0x1552c1[_0x79b8('0x27')]())if(_0x79b8('0x4')!==typeof _0x1552c1&&_0x79b8('0x2a')===_0x1552c1['toLowerCase']())try{console[_0x79b8('0x2a')][_0x79b8('0x67')](console,_0x435942);}catch(_0x4d75e8){try{console[_0x79b8('0x2a')](_0x435942[_0x79b8('0x8')]('\x0a'));}catch(_0x4208cc){}}else try{console[_0x79b8('0x11')][_0x79b8('0x67')](console,_0x435942);}catch(_0x2d5a3c){try{console[_0x79b8('0x11')](_0x435942[_0x79b8('0x8')]('\x0a'));}catch(_0x5f4420){}}else try{console['warn'][_0x79b8('0x67')](console,_0x435942);}catch(_0x22a7d1){try{console[_0x79b8('0x29')](_0x435942[_0x79b8('0x8')]('\x0a'));}catch(_0x48a2f4){}}}},_0x275c67={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0x79b8('0x68'),'buyQtt':_0x79b8('0x69'),'selectSkuMsg':_0x79b8('0x6a'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x339f84,_0x70dd24,_0x4912ce){_0x43420b('body')['is']('.productQuickView')&&('success'===_0x70dd24?alert(_0x79b8('0x6b')):(alert(_0x79b8('0x6c')),('object'===typeof parent?parent:document)[_0x79b8('0x6d')][_0x79b8('0x6e')]=_0x4912ce));},'isProductPage':function(){return _0x43420b(_0x79b8('0x6f'))['is'](_0x79b8('0x70'));},'execDefaultAction':function(_0x2ba77a){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x43420b[_0x79b8('0x71')]=function(_0x236dfd,_0x1d2a00){function _0x2e67b5(_0x1014cf){_0x4a8cd0[_0x79b8('0x72')]?_0x1014cf['data']('qd-bb-click-active')||(_0x1014cf[_0x79b8('0x14')](_0x79b8('0x73'),0x1),_0x1014cf['on'](_0x79b8('0x74'),function(_0x42915c){if(!_0x4a8cd0[_0x79b8('0x75')]())return!0x0;if(!0x0!==_0x58253c[_0x79b8('0x76')][_0x79b8('0x24')](this))return _0x42915c['preventDefault'](),!0x1;})):alert(_0x79b8('0x77'));}function _0x1f255d(_0x387e7b){_0x387e7b=_0x387e7b||_0x43420b(_0x4a8cd0[_0x79b8('0x78')]);_0x387e7b['each'](function(){var _0x387e7b=_0x43420b(this);_0x387e7b['is'](_0x79b8('0x79'))||(_0x387e7b[_0x79b8('0x45')]('qd-sbb-on'),_0x387e7b['is'](_0x79b8('0x7a'))&&!_0x387e7b['is'](_0x79b8('0x7b'))||_0x387e7b[_0x79b8('0x14')](_0x79b8('0x7c'))||(_0x387e7b['data']('qd-bb-active',0x1),_0x387e7b[_0x79b8('0x7d')](_0x79b8('0x7e'))[_0x79b8('0x7')]||_0x387e7b[_0x79b8('0x7f')](_0x79b8('0x80')),_0x387e7b['is'](_0x79b8('0x81'))&&_0x4a8cd0[_0x79b8('0x82')]()&&_0x4e5bda[_0x79b8('0x24')](_0x387e7b),_0x2e67b5(_0x387e7b)));});_0x4a8cd0['isProductPage']()&&!_0x387e7b[_0x79b8('0x7')]&&_0x211575('Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27'+_0x387e7b['selector']+'\x27.',_0x79b8('0x2a'));}var _0x3c4170=_0x43420b(_0x236dfd);var _0x58253c=this;window['_Quatro_Digital_dropDown']=window[_0x79b8('0x83')]||{};window[_0x79b8('0x33')]=window[_0x79b8('0x33')]||{};_0x58253c[_0x79b8('0x84')]=function(_0x5686c2,_0x3a6233){_0x3c4170[_0x79b8('0x45')](_0x79b8('0x85'));_0x43420b('body')[_0x79b8('0x45')]('qd-bb-lightBoxBodyProdAdd');var _0x4ade9f=_0x43420b(_0x4a8cd0[_0x79b8('0x78')])[_0x79b8('0x41')](_0x79b8('0x86')+(_0x5686c2['attr']('href')||'---')+'\x27]')[_0x79b8('0x2b')](_0x5686c2);_0x4ade9f[_0x79b8('0x45')](_0x79b8('0x87'));setTimeout(function(){_0x3c4170['removeClass'](_0x79b8('0x88'));_0x4ade9f[_0x79b8('0x47')](_0x79b8('0x87'));},_0x4a8cd0['timeRemoveNewItemClass']);window[_0x79b8('0x83')][_0x79b8('0x23')]=void 0x0;if(_0x79b8('0x4')!==typeof _0x1d2a00&&_0x79b8('0xb')===typeof _0x1d2a00[_0x79b8('0x89')])return _0x4a8cd0[_0x79b8('0x72')]||(_0x211575(_0x79b8('0x8a')),_0x1d2a00['getCartInfoByUrl']()),window[_0x79b8('0x55')][_0x79b8('0x23')]=void 0x0,_0x1d2a00[_0x79b8('0x89')](function(_0x23984e){window[_0x79b8('0x83')][_0x79b8('0x23')]=_0x23984e;_0x43420b['fn']['simpleCart'](!0x0,void 0x0,!0x0);},{'lastSku':_0x3a6233});window[_0x79b8('0x83')][_0x79b8('0x8b')]=!0x0;_0x43420b['fn'][_0x79b8('0x21')](!0x0);};(function(){if(_0x4a8cd0[_0x79b8('0x72')]&&_0x4a8cd0[_0x79b8('0x8c')]){var _0x42002d=_0x43420b(_0x79b8('0x7a'));_0x42002d[_0x79b8('0x7')]&&_0x1f255d(_0x42002d);}}());var _0x4e5bda=function(){var _0x109297=_0x43420b(this);'undefined'!==typeof _0x109297[_0x79b8('0x14')](_0x79b8('0x78'))?(_0x109297[_0x79b8('0x8d')](_0x79b8('0x8e')),_0x2e67b5(_0x109297)):(_0x109297[_0x79b8('0x8f')]('mouseenter.qd_bb_buy_sc',function(_0xb3e4d1){_0x109297[_0x79b8('0x8d')](_0x79b8('0x8e'));_0x2e67b5(_0x109297);_0x43420b(this)[_0x79b8('0x8d')](_0xb3e4d1);}),_0x43420b(window)[_0x79b8('0x90')](function(){_0x109297['unbind'](_0x79b8('0x8e'));_0x2e67b5(_0x109297);_0x109297['unbind'](_0x79b8('0x91'));}));};_0x58253c['clickBuySmartCheckout']=function(){var _0x4a49a7=_0x43420b(this),_0x236dfd=_0x4a49a7[_0x79b8('0x92')](_0x79b8('0x6e'))||'';if(-0x1<_0x236dfd[_0x79b8('0x93')](_0x4a8cd0['selectSkuMsg']))return!0x0;_0x236dfd=_0x236dfd['replace'](/redirect\=(false|true)/gi,'')['replace']('?','?redirect=false&')[_0x79b8('0x2')](/\&\&/gi,'&');if(_0x4a8cd0[_0x79b8('0x94')](_0x4a49a7))return _0x4a49a7[_0x79b8('0x92')](_0x79b8('0x6e'),_0x236dfd[_0x79b8('0x2')](_0x79b8('0x95'),'redirect=true')),!0x0;_0x236dfd=_0x236dfd['replace'](/http.?:/i,'');_0x5b785b[_0x79b8('0x96')](function(_0x11d2d){if(!_0x4a8cd0['buyIfQuantityZeroed']&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0x79b8('0x97')](_0x236dfd))return _0x11d2d();var _0x474c86=function(_0x51412d,_0x5bfce8){var _0x1f255d=_0x236dfd['match'](/sku\=([0-9]+)/gi),_0x428384=[];if(_0x79b8('0x13')===typeof _0x1f255d&&null!==_0x1f255d)for(var _0x42f704=_0x1f255d[_0x79b8('0x7')]-0x1;0x0<=_0x42f704;_0x42f704--){var _0x544bab=parseInt(_0x1f255d[_0x42f704]['replace'](/sku\=/gi,''));isNaN(_0x544bab)||_0x428384[_0x79b8('0x98')](_0x544bab);}_0x4a8cd0[_0x79b8('0x99')][_0x79b8('0x24')](this,_0x51412d,_0x5bfce8,_0x236dfd);_0x58253c['buyButtonClickCallback'][_0x79b8('0x24')](this,_0x51412d,_0x5bfce8,_0x236dfd,_0x428384);_0x58253c[_0x79b8('0x84')](_0x4a49a7,_0x236dfd[_0x79b8('0x6')](_0x79b8('0x9a'))[_0x79b8('0x9b')]()[_0x79b8('0x6')]('&')[_0x79b8('0x9c')]());_0x79b8('0xb')===typeof _0x4a8cd0[_0x79b8('0x9d')]&&_0x4a8cd0[_0x79b8('0x9d')]['call'](this);_0x43420b(window)['trigger'](_0x79b8('0x9e'));_0x43420b(window)[_0x79b8('0x5a')](_0x79b8('0x9f'));};_0x4a8cd0['fakeRequest']?(_0x474c86(null,_0x79b8('0xa0')),_0x11d2d()):_0x43420b[_0x79b8('0xa1')]({'url':_0x236dfd,'complete':_0x474c86})['always'](function(){_0x11d2d();});});};_0x58253c[_0x79b8('0xa2')]=function(_0x1fd914,_0x17ac97,_0x21dae9,_0x510f1b){try{_0x79b8('0xa0')===_0x17ac97&&'object'===typeof window['parent']&&_0x79b8('0xb')===typeof window[_0x79b8('0xa3')]['_QuatroDigital_prodBuyCallback']&&window[_0x79b8('0xa3')][_0x79b8('0xa4')](_0x1fd914,_0x17ac97,_0x21dae9,_0x510f1b);}catch(_0x34ea7a){_0x211575('Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.');}};_0x1f255d();_0x79b8('0xb')===typeof _0x4a8cd0[_0x79b8('0x3d')]?_0x4a8cd0[_0x79b8('0x3d')][_0x79b8('0x24')](this):_0x211575(_0x79b8('0xa5'));};var _0x148345=_0x43420b[_0x79b8('0x63')]();_0x43420b['fn'][_0x79b8('0x71')]=function(_0x20d84c,_0x491f7f){var _0x4d116d=_0x43420b(this);'undefined'!==typeof _0x491f7f||_0x79b8('0x13')!==typeof _0x20d84c||_0x20d84c instanceof _0x43420b||(_0x491f7f=_0x20d84c,_0x20d84c=void 0x0);_0x4a8cd0=_0x43420b[_0x79b8('0x12')]({},_0x275c67,_0x491f7f);var _0xb25a5c;_0x148345['add'](function(){_0x4d116d['children'](_0x79b8('0xa6'))[_0x79b8('0x7')]||_0x4d116d[_0x79b8('0xa7')](_0x79b8('0xa8'));_0xb25a5c=new _0x43420b[(_0x79b8('0x71'))](_0x4d116d,_0x20d84c);});_0x148345[_0x79b8('0x3e')]();_0x43420b(window)['on']('QuatroDigital.qd_bb_prod_add',function(_0x459362,_0x13402c,_0x51d969){_0xb25a5c[_0x79b8('0x84')](_0x13402c,_0x51d969);});return _0x43420b[_0x79b8('0x12')](_0x4d116d,_0xb25a5c);};var _0x41c1b0=0x0;_0x43420b(document)['ajaxSend'](function(_0x13f55a,_0xf43a9e,_0x344300){-0x1<_0x344300[_0x79b8('0x17')][_0x79b8('0x27')]()[_0x79b8('0x93')](_0x79b8('0xa9'))&&(_0x41c1b0=(_0x344300['url']['match'](/sku\=([0-9]+)/i)||[''])['pop']());});_0x43420b(window)[_0x79b8('0x8f')](_0x79b8('0xaa'),function(){_0x43420b(window)['trigger'](_0x79b8('0xab'),[new _0x43420b(),_0x41c1b0]);});_0x43420b(document)[_0x79b8('0xac')](function(){_0x148345[_0x79b8('0x3e')]();});}catch(_0x147acb){_0x79b8('0x4')!==typeof console&&_0x79b8('0xb')===typeof console['error']&&console[_0x79b8('0x11')](_0x79b8('0x5f'),_0x147acb);}}(this));function qd_number_format(_0x3709bc,_0x16bb19,_0x49ea78,_0x267aec){_0x3709bc=(_0x3709bc+'')[_0x79b8('0x2')](/[^0-9+\-Ee.]/g,'');_0x3709bc=isFinite(+_0x3709bc)?+_0x3709bc:0x0;_0x16bb19=isFinite(+_0x16bb19)?Math['abs'](_0x16bb19):0x0;_0x267aec='undefined'===typeof _0x267aec?',':_0x267aec;_0x49ea78=_0x79b8('0x4')===typeof _0x49ea78?'.':_0x49ea78;var _0x5cb3cd='',_0x5cb3cd=function(_0x487b8b,_0x1add5e){var _0x2952dd=Math['pow'](0xa,_0x1add5e);return''+(Math['round'](_0x487b8b*_0x2952dd)/_0x2952dd)[_0x79b8('0xad')](_0x1add5e);},_0x5cb3cd=(_0x16bb19?_0x5cb3cd(_0x3709bc,_0x16bb19):''+Math[_0x79b8('0x5')](_0x3709bc))[_0x79b8('0x6')]('.');0x3<_0x5cb3cd[0x0][_0x79b8('0x7')]&&(_0x5cb3cd[0x0]=_0x5cb3cd[0x0][_0x79b8('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x267aec));(_0x5cb3cd[0x1]||'')[_0x79b8('0x7')]<_0x16bb19&&(_0x5cb3cd[0x1]=_0x5cb3cd[0x1]||'',_0x5cb3cd[0x1]+=Array(_0x16bb19-_0x5cb3cd[0x1][_0x79b8('0x7')]+0x1)[_0x79b8('0x8')]('0'));return _0x5cb3cd[_0x79b8('0x8')](_0x49ea78);}(function(){try{window[_0x79b8('0x33')]=window[_0x79b8('0x33')]||{},window[_0x79b8('0x33')]['callback']=window[_0x79b8('0x33')][_0x79b8('0x3d')]||$[_0x79b8('0x63')]();}catch(_0x3d1f73){'undefined'!==typeof console&&'function'===typeof console['error']&&console[_0x79b8('0x11')](_0x79b8('0x5f'),_0x3d1f73[_0x79b8('0x1e')]);}}());(function(_0x2f6432){try{var _0x42c853=jQuery,_0x386624=function(_0x52c017,_0x29ebdc){if('object'===typeof console&&_0x79b8('0x4')!==typeof console['error']&&_0x79b8('0x4')!==typeof console[_0x79b8('0x2a')]&&_0x79b8('0x4')!==typeof console[_0x79b8('0x29')]){var _0xd1b906;_0x79b8('0x13')===typeof _0x52c017?(_0x52c017[_0x79b8('0x64')](_0x79b8('0xae')),_0xd1b906=_0x52c017):_0xd1b906=['[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'+_0x52c017];if(_0x79b8('0x4')===typeof _0x29ebdc||_0x79b8('0x26')!==_0x29ebdc[_0x79b8('0x27')]()&&_0x79b8('0x66')!==_0x29ebdc[_0x79b8('0x27')]())if(_0x79b8('0x4')!==typeof _0x29ebdc&&_0x79b8('0x2a')===_0x29ebdc[_0x79b8('0x27')]())try{console[_0x79b8('0x2a')][_0x79b8('0x67')](console,_0xd1b906);}catch(_0x279666){try{console['info'](_0xd1b906[_0x79b8('0x8')]('\x0a'));}catch(_0x32bde9){}}else try{console[_0x79b8('0x11')][_0x79b8('0x67')](console,_0xd1b906);}catch(_0x574909){try{console['error'](_0xd1b906[_0x79b8('0x8')]('\x0a'));}catch(_0x10d374){}}else try{console[_0x79b8('0x29')][_0x79b8('0x67')](console,_0xd1b906);}catch(_0x190358){try{console[_0x79b8('0x29')](_0xd1b906['join']('\x0a'));}catch(_0x54616f){}}}};window[_0x79b8('0x55')]=window['_QuatroDigital_DropDown']||{};window['_QuatroDigital_DropDown'][_0x79b8('0x8b')]=!0x0;_0x42c853['QD_dropDownCart']=function(){};_0x42c853['fn'][_0x79b8('0xaf')]=function(){return{'fn':new _0x42c853()};};var _0x10246e=function(_0xbe2b84){var _0x2181ba={'z':_0x79b8('0xb0')};return function(_0x151128){var _0x2dfcd3=function(_0x199b0c){return _0x199b0c;};var _0x41e85e=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x151128=_0x151128['d'+_0x41e85e[0x10]+'c'+_0x41e85e[0x11]+'m'+_0x2dfcd3(_0x41e85e[0x1])+'n'+_0x41e85e[0xd]]['l'+_0x41e85e[0x12]+'c'+_0x41e85e[0x0]+'ti'+_0x2dfcd3('o')+'n'];var _0x315310=function(_0x4b9ee5){return escape(encodeURIComponent(_0x4b9ee5[_0x79b8('0x2')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x454dee){return String['fromCharCode'](('Z'>=_0x454dee?0x5a:0x7a)>=(_0x454dee=_0x454dee[_0x79b8('0xb1')](0x0)+0xd)?_0x454dee:_0x454dee-0x1a);})));};var _0x2f6432=_0x315310(_0x151128[[_0x41e85e[0x9],_0x2dfcd3('o'),_0x41e85e[0xc],_0x41e85e[_0x2dfcd3(0xd)]][_0x79b8('0x8')]('')]);_0x315310=_0x315310((window[['js',_0x2dfcd3('no'),'m',_0x41e85e[0x1],_0x41e85e[0x4][_0x79b8('0xb2')](),_0x79b8('0xb3')]['join']('')]||_0x79b8('0xb4'))+['.v',_0x41e85e[0xd],'e',_0x2dfcd3('x'),'co',_0x2dfcd3('mm'),_0x79b8('0xb5'),_0x41e85e[0x1],'.c',_0x2dfcd3('o'),'m.',_0x41e85e[0x13],'r'][_0x79b8('0x8')](''));for(var _0x5de0da in _0x2181ba){if(_0x315310===_0x5de0da+_0x2181ba[_0x5de0da]||_0x2f6432===_0x5de0da+_0x2181ba[_0x5de0da]){var _0xc0eb25='tr'+_0x41e85e[0x11]+'e';break;}_0xc0eb25='f'+_0x41e85e[0x0]+'ls'+_0x2dfcd3(_0x41e85e[0x1])+'';}_0x2dfcd3=!0x1;-0x1<_0x151128[[_0x41e85e[0xc],'e',_0x41e85e[0x0],'rc',_0x41e85e[0x9]][_0x79b8('0x8')]('')][_0x79b8('0x93')](_0x79b8('0xb6'))&&(_0x2dfcd3=!0x0);return[_0xc0eb25,_0x2dfcd3];}(_0xbe2b84);}(window);if(!eval(_0x10246e[0x0]))return _0x10246e[0x1]?_0x386624(_0x79b8('0xb7')):!0x1;_0x42c853[_0x79b8('0xaf')]=function(_0x58646b,_0x2e1236){var _0x11c9cf=_0x42c853(_0x58646b);if(!_0x11c9cf[_0x79b8('0x7')])return _0x11c9cf;var _0x564735=_0x42c853[_0x79b8('0x12')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x79b8('0xb8'),'linkCheckout':_0x79b8('0xb9'),'cartTotal':_0x79b8('0xba'),'emptyCart':'Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','continueShopping':_0x79b8('0xbb'),'shippingForm':_0x79b8('0xbc')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x198d9f){return _0x198d9f['skuName']||_0x198d9f[_0x79b8('0xbd')];},'callback':function(){},'callbackProductsList':function(){}},_0x2e1236);_0x42c853('');var _0x47085d=this;if(_0x564735[_0x79b8('0x54')]){var _0x5d5448=!0x1;_0x79b8('0x4')===typeof window[_0x79b8('0x56')]&&(_0x386624(_0x79b8('0xbe')),_0x42c853['ajax']({'url':_0x79b8('0xbf'),'async':!0x1,'dataType':_0x79b8('0xc0'),'error':function(){_0x386624(_0x79b8('0xc1'));_0x5d5448=!0x0;}}));if(_0x5d5448)return _0x386624(_0x79b8('0xc2'));}if(_0x79b8('0x13')===typeof window[_0x79b8('0x56')]&&_0x79b8('0x4')!==typeof window[_0x79b8('0x56')][_0x79b8('0x22')])var _0x2c3445=window[_0x79b8('0x56')][_0x79b8('0x22')];else if('object'===typeof vtex&&_0x79b8('0x13')===typeof vtex[_0x79b8('0x22')]&&_0x79b8('0x4')!==typeof vtex['checkout']['SDK'])_0x2c3445=new vtex['checkout'][(_0x79b8('0xc3'))]();else return _0x386624(_0x79b8('0x57'));_0x47085d[_0x79b8('0xc4')]=_0x79b8('0xc5');var _0x3057b5=function(_0x3a566f){_0x42c853(this)[_0x79b8('0x7f')](_0x3a566f);_0x3a566f[_0x79b8('0x4e')]('.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose')['add'](_0x42c853(_0x79b8('0xc6')))['on']('click.qd_ddc_closeFn',function(){_0x11c9cf['removeClass']('qd-bb-lightBoxProdAdd');_0x42c853(document[_0x79b8('0x6f')])[_0x79b8('0x47')]('qd-bb-lightBoxBodyProdAdd');});_0x42c853(document)[_0x79b8('0xc7')](_0x79b8('0xc8'))['on'](_0x79b8('0xc8'),function(_0x3da834){0x1b==_0x3da834[_0x79b8('0xc9')]&&(_0x11c9cf['removeClass'](_0x79b8('0xca')),_0x42c853(document[_0x79b8('0x6f')])[_0x79b8('0x47')](_0x79b8('0xcb')));});var _0x3e3592=_0x3a566f[_0x79b8('0x4e')](_0x79b8('0xcc'));_0x3a566f[_0x79b8('0x4e')](_0x79b8('0xcd'))['on'](_0x79b8('0xce'),function(){_0x47085d[_0x79b8('0xcf')]('-',void 0x0,void 0x0,_0x3e3592);return!0x1;});_0x3a566f['find'](_0x79b8('0xd0'))['on']('click.qd_ddc_scrollDown',function(){_0x47085d['scrollCart'](void 0x0,void 0x0,void 0x0,_0x3e3592);return!0x1;});_0x3a566f[_0x79b8('0x4e')](_0x79b8('0xd1'))[_0x79b8('0xd2')]('')['on'](_0x79b8('0xd3'),function(){_0x47085d[_0x79b8('0xd4')](_0x42c853(this));});if(_0x564735[_0x79b8('0xd5')]){var _0x2e1236=0x0;_0x42c853(this)['on']('mouseenter.qd_ddc_hover',function(){var _0x3a566f=function(){window[_0x79b8('0x55')]['allowUpdate']&&(_0x47085d[_0x79b8('0x89')](),window[_0x79b8('0x55')][_0x79b8('0x8b')]=!0x1,_0x42c853['fn']['simpleCart'](!0x0),_0x47085d['cartIsEmpty']());};_0x2e1236=setInterval(function(){_0x3a566f();},0x258);_0x3a566f();});_0x42c853(this)['on'](_0x79b8('0xd6'),function(){clearInterval(_0x2e1236);});}};var _0x30e1f6=function(_0x37619d){_0x37619d=_0x42c853(_0x37619d);_0x564735['texts']['cartTotal']=_0x564735[_0x79b8('0xd7')][_0x79b8('0x4f')][_0x79b8('0x2')](_0x79b8('0xd8'),_0x79b8('0xd9'));_0x564735[_0x79b8('0xd7')]['cartTotal']=_0x564735[_0x79b8('0xd7')][_0x79b8('0x4f')][_0x79b8('0x2')](_0x79b8('0xda'),_0x79b8('0xdb'));_0x564735[_0x79b8('0xd7')][_0x79b8('0x4f')]=_0x564735['texts'][_0x79b8('0x4f')][_0x79b8('0x2')](_0x79b8('0xdc'),_0x79b8('0xdd'));_0x564735[_0x79b8('0xd7')][_0x79b8('0x4f')]=_0x564735['texts']['cartTotal']['replace'](_0x79b8('0xde'),_0x79b8('0xdf'));_0x37619d[_0x79b8('0x4e')](_0x79b8('0xe0'))[_0x79b8('0x4a')](_0x564735[_0x79b8('0xd7')][_0x79b8('0xe1')]);_0x37619d[_0x79b8('0x4e')](_0x79b8('0xe2'))[_0x79b8('0x4a')](_0x564735['texts'][_0x79b8('0xe3')]);_0x37619d['find'](_0x79b8('0xe4'))['html'](_0x564735[_0x79b8('0xd7')][_0x79b8('0xe5')]);_0x37619d[_0x79b8('0x4e')](_0x79b8('0xe6'))[_0x79b8('0x4a')](_0x564735['texts'][_0x79b8('0x4f')]);_0x37619d['find'](_0x79b8('0xe7'))[_0x79b8('0x4a')](_0x564735[_0x79b8('0xd7')][_0x79b8('0xe8')]);_0x37619d[_0x79b8('0x4e')]('.qd-ddc-emptyCart\x20p')[_0x79b8('0x4a')](_0x564735['texts'][_0x79b8('0x52')]);return _0x37619d;}(this[_0x79b8('0xc4')]);var _0x10d2c6=0x0;_0x11c9cf[_0x79b8('0x31')](function(){0x0<_0x10d2c6?_0x3057b5[_0x79b8('0x24')](this,_0x30e1f6[_0x79b8('0xe9')]()):_0x3057b5['call'](this,_0x30e1f6);_0x10d2c6++;});window[_0x79b8('0x33')]['callback'][_0x79b8('0x2b')](function(){_0x42c853('.qd-ddc-infoTotalValue')[_0x79b8('0x4a')](window['_QuatroDigital_CartData'][_0x79b8('0x37')]||'--');_0x42c853('.qd-ddc-infoTotalItems')[_0x79b8('0x4a')](window[_0x79b8('0x33')][_0x79b8('0x3b')]||'0');_0x42c853(_0x79b8('0xea'))[_0x79b8('0x4a')](window[_0x79b8('0x33')][_0x79b8('0x39')]||'--');_0x42c853(_0x79b8('0xeb'))[_0x79b8('0x4a')](window[_0x79b8('0x33')][_0x79b8('0x3a')]||'--');});var _0x4b9247=function(_0x3ec7f0,_0x3d057f){if(_0x79b8('0x4')===typeof _0x3ec7f0[_0x79b8('0x3c')])return _0x386624(_0x79b8('0xec'));_0x47085d[_0x79b8('0xed')][_0x79b8('0x24')](this,_0x3d057f);};_0x47085d[_0x79b8('0x89')]=function(_0x12a2f4,_0xabb472){_0x79b8('0x4')!=typeof _0xabb472?window[_0x79b8('0x55')][_0x79b8('0xee')]=_0xabb472:window[_0x79b8('0x55')][_0x79b8('0xee')]&&(_0xabb472=window[_0x79b8('0x55')][_0x79b8('0xee')]);setTimeout(function(){window['_QuatroDigital_DropDown']['dataOptionsCache']=void 0x0;},_0x564735[_0x79b8('0xef')]);_0x42c853(_0x79b8('0xf0'))[_0x79b8('0x47')](_0x79b8('0xf1'));if(_0x564735[_0x79b8('0x54')]){var _0x2e1236=function(_0x197d8b){window['_QuatroDigital_DropDown'][_0x79b8('0x23')]=_0x197d8b;_0x4b9247(_0x197d8b,_0xabb472);_0x79b8('0x4')!==typeof window[_0x79b8('0xf2')]&&_0x79b8('0xb')===typeof window[_0x79b8('0xf2')][_0x79b8('0xf3')]&&window['_QuatroDigital_AmountProduct'][_0x79b8('0xf3')][_0x79b8('0x24')](this);_0x42c853(_0x79b8('0xf0'))['addClass'](_0x79b8('0xf1'));};_0x79b8('0x4')!==typeof window[_0x79b8('0x55')][_0x79b8('0x23')]?(_0x2e1236(window[_0x79b8('0x55')]['getOrderForm']),_0x79b8('0xb')===typeof _0x12a2f4&&_0x12a2f4(window['_QuatroDigital_DropDown'][_0x79b8('0x23')])):_0x42c853['QD_checkoutQueue']([_0x79b8('0x3c'),_0x79b8('0x35'),_0x79b8('0x58')],{'done':function(_0x5513df){_0x2e1236[_0x79b8('0x24')](this,_0x5513df);'function'===typeof _0x12a2f4&&_0x12a2f4(_0x5513df);},'fail':function(_0x4c8765){_0x386624([_0x79b8('0xf4'),_0x4c8765]);}});}else alert(_0x79b8('0xf5'));};_0x47085d[_0x79b8('0xf6')]=function(){var _0x168fe7=_0x42c853(_0x79b8('0xf0'));_0x168fe7[_0x79b8('0x4e')](_0x79b8('0xf7'))[_0x79b8('0x7')]?_0x168fe7[_0x79b8('0x47')](_0x79b8('0xf8')):_0x168fe7['addClass'](_0x79b8('0xf8'));};_0x47085d[_0x79b8('0xed')]=function(_0x197b15){var _0x2e1236=_0x42c853(_0x79b8('0xf9'));_0x2e1236['empty']();_0x2e1236[_0x79b8('0x31')](function(){var _0x2e1236=_0x42c853(this),_0x58646b,_0x32f897,_0x2c6b2a=_0x42c853(''),_0x3b520c;for(_0x3b520c in window['_QuatroDigital_DropDown'][_0x79b8('0x23')][_0x79b8('0x3c')])if(_0x79b8('0x13')===typeof window['_QuatroDigital_DropDown'][_0x79b8('0x23')]['items'][_0x3b520c]){var _0x17eb60=window[_0x79b8('0x55')][_0x79b8('0x23')][_0x79b8('0x3c')][_0x3b520c];var _0x4755c9=_0x17eb60[_0x79b8('0xfa')]['replace'](/^\/|\/$/g,'')[_0x79b8('0x6')]('/');var _0x53e2ce=_0x42c853(_0x79b8('0xfb'));_0x53e2ce[_0x79b8('0x92')]({'data-sku':_0x17eb60['id'],'data-sku-index':_0x3b520c,'data-qd-departament':_0x4755c9[0x0],'data-qd-category':_0x4755c9[_0x4755c9[_0x79b8('0x7')]-0x1]});_0x53e2ce[_0x79b8('0x45')]('qd-ddc-'+_0x17eb60[_0x79b8('0xfc')]);_0x53e2ce[_0x79b8('0x4e')](_0x79b8('0xfd'))[_0x79b8('0x7f')](_0x564735[_0x79b8('0xfe')](_0x17eb60));_0x53e2ce[_0x79b8('0x4e')](_0x79b8('0xff'))[_0x79b8('0x7f')](isNaN(_0x17eb60[_0x79b8('0x100')])?_0x17eb60['sellingPrice']:0x0==_0x17eb60[_0x79b8('0x100')]?_0x79b8('0x101'):(_0x42c853(_0x79b8('0x30'))[_0x79b8('0x92')](_0x79b8('0x102'))||'R$')+'\x20'+qd_number_format(_0x17eb60[_0x79b8('0x100')]/0x64,0x2,',','.'));_0x53e2ce[_0x79b8('0x4e')]('.qd-ddc-quantity')['attr']({'data-sku':_0x17eb60['id'],'data-sku-index':_0x3b520c})[_0x79b8('0xd2')](_0x17eb60[_0x79b8('0x103')]);_0x53e2ce[_0x79b8('0x4e')](_0x79b8('0x104'))['attr']({'data-sku':_0x17eb60['id'],'data-sku-index':_0x3b520c});_0x47085d[_0x79b8('0x105')](_0x17eb60['id'],_0x53e2ce[_0x79b8('0x4e')](_0x79b8('0x106')),_0x17eb60[_0x79b8('0x107')]);_0x53e2ce[_0x79b8('0x4e')]('.qd-ddc-quantityMore,.qd-ddc-quantityMinus')['attr']({'data-sku':_0x17eb60['id'],'data-sku-index':_0x3b520c});_0x53e2ce['appendTo'](_0x2e1236);_0x2c6b2a=_0x2c6b2a[_0x79b8('0x2b')](_0x53e2ce);}try{var _0x72f344=_0x2e1236[_0x79b8('0x0')](_0x79b8('0xf0'))[_0x79b8('0x4e')]('.qd-ddc-shipping\x20input');_0x72f344[_0x79b8('0x7')]&&''==_0x72f344[_0x79b8('0xd2')]()&&window[_0x79b8('0x55')][_0x79b8('0x23')][_0x79b8('0x58')][_0x79b8('0x108')]&&_0x72f344[_0x79b8('0xd2')](window['_QuatroDigital_DropDown'][_0x79b8('0x23')]['shippingData'][_0x79b8('0x108')][_0x79b8('0x109')]);}catch(_0x123c75){_0x386624(_0x79b8('0x10a')+_0x123c75[_0x79b8('0x1e')],_0x79b8('0x66'));}_0x47085d['actionButtons'](_0x2e1236);_0x47085d[_0x79b8('0xf6')]();_0x197b15&&_0x197b15[_0x79b8('0x10b')]&&function(){_0x32f897=_0x2c6b2a[_0x79b8('0x41')](_0x79b8('0x10c')+_0x197b15[_0x79b8('0x10b')]+'\x27]');_0x32f897['length']&&(_0x58646b=0x0,_0x2c6b2a[_0x79b8('0x31')](function(){var _0x197b15=_0x42c853(this);if(_0x197b15['is'](_0x32f897))return!0x1;_0x58646b+=_0x197b15[_0x79b8('0x10d')]();}),_0x47085d[_0x79b8('0xcf')](void 0x0,void 0x0,_0x58646b,_0x2e1236[_0x79b8('0x2b')](_0x2e1236[_0x79b8('0xa3')]())),_0x2c6b2a[_0x79b8('0x47')](_0x79b8('0x10e')),function(_0x292ab2){_0x292ab2[_0x79b8('0x45')](_0x79b8('0x10f'));_0x292ab2[_0x79b8('0x45')]('qd-ddc-lastAddedFixed');setTimeout(function(){_0x292ab2[_0x79b8('0x47')](_0x79b8('0x10f'));},_0x564735[_0x79b8('0xef')]);}(_0x32f897));}();});(function(){_QuatroDigital_DropDown[_0x79b8('0x23')]['items'][_0x79b8('0x7')]?(_0x42c853('body')[_0x79b8('0x47')](_0x79b8('0x110'))[_0x79b8('0x45')](_0x79b8('0x111')),setTimeout(function(){_0x42c853('body')[_0x79b8('0x47')]('qd-ddc-product-add-time');},_0x564735[_0x79b8('0xef')])):_0x42c853('body')[_0x79b8('0x47')](_0x79b8('0x112'))[_0x79b8('0x45')](_0x79b8('0x110'));}());_0x79b8('0xb')===typeof _0x564735['callbackProductsList']?_0x564735[_0x79b8('0x113')]['call'](this):_0x386624(_0x79b8('0x114'));};_0x47085d[_0x79b8('0x105')]=function(_0x1d7aca,_0x4978d2,_0x5447e0){function _0x1da61e(){_0x4978d2[_0x79b8('0x47')](_0x79b8('0x115'))[_0x79b8('0x90')](function(){_0x42c853(this)[_0x79b8('0x45')](_0x79b8('0x115'));})[_0x79b8('0x92')]('src',_0x5447e0);}_0x5447e0?_0x1da61e():isNaN(_0x1d7aca)?_0x386624('Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU',_0x79b8('0x26')):alert(_0x79b8('0x116'));};_0x47085d[_0x79b8('0x117')]=function(_0x545765){var _0x1ae3c1=function(_0x33f082,_0x56d4cc){var _0x2e1236=_0x42c853(_0x33f082);var _0x5da1fd=_0x2e1236[_0x79b8('0x92')](_0x79b8('0x118'));var _0x58646b=_0x2e1236[_0x79b8('0x92')](_0x79b8('0x119'));if(_0x5da1fd){var _0x58958e=parseInt(_0x2e1236[_0x79b8('0xd2')]())||0x1;_0x47085d[_0x79b8('0x11a')]([_0x5da1fd,_0x58646b],_0x58958e,_0x58958e+0x1,function(_0x17dd96){_0x2e1236['val'](_0x17dd96);_0x79b8('0xb')===typeof _0x56d4cc&&_0x56d4cc();});}};var _0x2e1236=function(_0x29dc36,_0x1c5caf){var _0x2e1236=_0x42c853(_0x29dc36);var _0x3e970b=_0x2e1236[_0x79b8('0x92')](_0x79b8('0x118'));var _0x58646b=_0x2e1236[_0x79b8('0x92')](_0x79b8('0x119'));if(_0x3e970b){var _0x1e6886=parseInt(_0x2e1236[_0x79b8('0xd2')]())||0x2;_0x47085d[_0x79b8('0x11a')]([_0x3e970b,_0x58646b],_0x1e6886,_0x1e6886-0x1,function(_0x44435f){_0x2e1236[_0x79b8('0xd2')](_0x44435f);_0x79b8('0xb')===typeof _0x1c5caf&&_0x1c5caf();});}};var _0x5b7156=function(_0x9d771,_0x252868){var _0x2e1236=_0x42c853(_0x9d771);var _0x136b6c=_0x2e1236['attr'](_0x79b8('0x118'));var _0x58646b=_0x2e1236[_0x79b8('0x92')]('data-sku-index');if(_0x136b6c){var _0xfb3a09=parseInt(_0x2e1236[_0x79b8('0xd2')]())||0x1;_0x47085d[_0x79b8('0x11a')]([_0x136b6c,_0x58646b],0x1,_0xfb3a09,function(_0x45637f){_0x2e1236[_0x79b8('0xd2')](_0x45637f);_0x79b8('0xb')===typeof _0x252868&&_0x252868();});}};var _0x58646b=_0x545765[_0x79b8('0x4e')](_0x79b8('0x11b'));_0x58646b[_0x79b8('0x45')](_0x79b8('0x11c'))[_0x79b8('0x31')](function(){var _0x545765=_0x42c853(this);_0x545765[_0x79b8('0x4e')](_0x79b8('0x11d'))['on'](_0x79b8('0x11e'),function(_0x3df479){_0x3df479[_0x79b8('0x11f')]();_0x58646b[_0x79b8('0x45')](_0x79b8('0x120'));_0x1ae3c1(_0x545765['find'](_0x79b8('0x121')),function(){_0x58646b[_0x79b8('0x47')](_0x79b8('0x120'));});});_0x545765['find']('.qd-ddc-quantityMinus')['on'](_0x79b8('0x122'),function(_0x42fba5){_0x42fba5[_0x79b8('0x11f')]();_0x58646b[_0x79b8('0x45')]('qd-loading');_0x2e1236(_0x545765[_0x79b8('0x4e')](_0x79b8('0x121')),function(){_0x58646b[_0x79b8('0x47')](_0x79b8('0x120'));});});_0x545765[_0x79b8('0x4e')]('.qd-ddc-quantity')['on'](_0x79b8('0x123'),function(){_0x58646b[_0x79b8('0x45')](_0x79b8('0x120'));_0x5b7156(this,function(){_0x58646b[_0x79b8('0x47')](_0x79b8('0x120'));});});_0x545765[_0x79b8('0x4e')](_0x79b8('0x121'))['on']('keyup.qd_ddc_change',function(_0x24fbdb){0xd==_0x24fbdb[_0x79b8('0xc9')]&&(_0x58646b[_0x79b8('0x45')](_0x79b8('0x120')),_0x5b7156(this,function(){_0x58646b[_0x79b8('0x47')](_0x79b8('0x120'));}));});});_0x545765['find']('.qd-ddc-prodRow')[_0x79b8('0x31')](function(){var _0x545765=_0x42c853(this);_0x545765['find'](_0x79b8('0x104'))['on'](_0x79b8('0x124'),function(){_0x545765[_0x79b8('0x45')](_0x79b8('0x120'));_0x47085d[_0x79b8('0x125')](_0x42c853(this),function(_0x4c0ffe){_0x4c0ffe?_0x545765[_0x79b8('0x126')](!0x0)['slideUp'](function(){_0x545765[_0x79b8('0x127')]();_0x47085d[_0x79b8('0xf6')]();}):_0x545765[_0x79b8('0x47')]('qd-loading');});return!0x1;});});};_0x47085d[_0x79b8('0xd4')]=function(_0x5ac2ea){var _0x209629=_0x5ac2ea[_0x79b8('0xd2')](),_0x209629=_0x209629[_0x79b8('0x2')](/[^0-9\-]/g,''),_0x209629=_0x209629[_0x79b8('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x79b8('0x128')),_0x209629=_0x209629['replace'](/(.{9}).*/g,'$1');_0x5ac2ea[_0x79b8('0xd2')](_0x209629);0x9<=_0x209629[_0x79b8('0x7')]&&(_0x5ac2ea[_0x79b8('0x14')](_0x79b8('0x129'))!=_0x209629&&_0x2c3445[_0x79b8('0x12a')]({'postalCode':_0x209629,'country':'BRA'})[_0x79b8('0x1a')](function(_0x16e62a){window[_0x79b8('0x55')]['getOrderForm']=_0x16e62a;_0x47085d[_0x79b8('0x89')]();})[_0x79b8('0x62')](function(_0xae3549){_0x386624(['Não\x20foi\x20possível\x20calcular\x20o\x20frete',_0xae3549]);updateCartData();}),_0x5ac2ea['data']('qdDdcLastPostalCode',_0x209629));};_0x47085d[_0x79b8('0x11a')]=function(_0x1eea1f,_0x2bbc70,_0x424f78,_0x1c21ed){function _0x4eea9f(_0x112428){_0x112428=_0x79b8('0x12b')!==typeof _0x112428?!0x1:_0x112428;_0x47085d[_0x79b8('0x89')]();window['_QuatroDigital_DropDown'][_0x79b8('0x8b')]=!0x1;_0x47085d[_0x79b8('0xf6')]();_0x79b8('0x4')!==typeof window[_0x79b8('0xf2')]&&'function'===typeof window[_0x79b8('0xf2')][_0x79b8('0xf3')]&&window[_0x79b8('0xf2')][_0x79b8('0xf3')]['call'](this);_0x79b8('0xb')===typeof adminCart&&adminCart();_0x42c853['fn'][_0x79b8('0x21')](!0x0,void 0x0,_0x112428);'function'===typeof _0x1c21ed&&_0x1c21ed(_0x2bbc70);}_0x424f78=_0x424f78||0x1;if(0x1>_0x424f78)return _0x2bbc70;if(_0x564735[_0x79b8('0x54')]){if(_0x79b8('0x4')===typeof window[_0x79b8('0x55')]['getOrderForm'][_0x79b8('0x3c')][_0x1eea1f[0x1]])return _0x386624(_0x79b8('0x12c')+_0x1eea1f[0x1]+']'),_0x2bbc70;window[_0x79b8('0x55')][_0x79b8('0x23')][_0x79b8('0x3c')][_0x1eea1f[0x1]][_0x79b8('0x103')]=_0x424f78;window[_0x79b8('0x55')]['getOrderForm'][_0x79b8('0x3c')][_0x1eea1f[0x1]][_0x79b8('0x12d')]=_0x1eea1f[0x1];_0x2c3445['updateItems']([window[_0x79b8('0x55')][_0x79b8('0x23')]['items'][_0x1eea1f[0x1]]],['items',_0x79b8('0x35'),'shippingData'])[_0x79b8('0x1a')](function(_0x2fa4b8){window[_0x79b8('0x55')][_0x79b8('0x23')]=_0x2fa4b8;_0x4eea9f(!0x0);})[_0x79b8('0x62')](function(_0x17f6a8){_0x386624(['Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho',_0x17f6a8]);_0x4eea9f();});}else _0x386624('atenção\x20esta\x20método\x20esta\x20descontinuado');};_0x47085d[_0x79b8('0x125')]=function(_0xba8173,_0x44a661){function _0x4adf37(_0xc5f106){_0xc5f106=_0x79b8('0x12b')!==typeof _0xc5f106?!0x1:_0xc5f106;'undefined'!==typeof window['_QuatroDigital_AmountProduct']&&'function'===typeof window['_QuatroDigital_AmountProduct'][_0x79b8('0xf3')]&&window['_QuatroDigital_AmountProduct'][_0x79b8('0xf3')]['call'](this);_0x79b8('0xb')===typeof adminCart&&adminCart();_0x42c853['fn'][_0x79b8('0x21')](!0x0,void 0x0,_0xc5f106);_0x79b8('0xb')===typeof _0x44a661&&_0x44a661(_0x58646b);}var _0x58646b=!0x1,_0x38de9d=_0x42c853(_0xba8173)['attr'](_0x79b8('0x119'));if(_0x564735[_0x79b8('0x54')]){if(_0x79b8('0x4')===typeof window[_0x79b8('0x55')]['getOrderForm'][_0x79b8('0x3c')][_0x38de9d])return _0x386624(_0x79b8('0x12c')+_0x38de9d+']'),_0x58646b;window[_0x79b8('0x55')][_0x79b8('0x23')][_0x79b8('0x3c')][_0x38de9d][_0x79b8('0x12d')]=_0x38de9d;_0x2c3445[_0x79b8('0x12e')]([window['_QuatroDigital_DropDown'][_0x79b8('0x23')][_0x79b8('0x3c')][_0x38de9d]],[_0x79b8('0x3c'),_0x79b8('0x35'),'shippingData'])[_0x79b8('0x1a')](function(_0x3609c4){_0x58646b=!0x0;window[_0x79b8('0x55')][_0x79b8('0x23')]=_0x3609c4;_0x4b9247(_0x3609c4);_0x4adf37(!0x0);})[_0x79b8('0x62')](function(_0x9eec86){_0x386624([_0x79b8('0x12f'),_0x9eec86]);_0x4adf37();});}else alert('Atenção,\x20este\x20método\x20esta\x20descontinuado.');};_0x47085d[_0x79b8('0xcf')]=function(_0x7af8eb,_0x331d5c,_0x534bcd,_0x139b9e){_0x139b9e=_0x139b9e||_0x42c853(_0x79b8('0x130'));_0x7af8eb=_0x7af8eb||'+';_0x331d5c=_0x331d5c||0.9*_0x139b9e[_0x79b8('0x131')]();_0x139b9e[_0x79b8('0x126')](!0x0,!0x0)[_0x79b8('0x132')]({'scrollTop':isNaN(_0x534bcd)?_0x7af8eb+'='+_0x331d5c+'px':_0x534bcd});};_0x564735[_0x79b8('0xd5')]||(_0x47085d[_0x79b8('0x89')](),_0x42c853['fn'][_0x79b8('0x21')](!0x0));_0x42c853(window)['on'](_0x79b8('0x133'),function(){try{window['_QuatroDigital_DropDown']['getOrderForm']=void 0x0,_0x47085d[_0x79b8('0x89')]();}catch(_0xa51eae){_0x386624(_0x79b8('0x134')+_0xa51eae[_0x79b8('0x1e')],_0x79b8('0x135'));}});_0x79b8('0xb')===typeof _0x564735[_0x79b8('0x3d')]?_0x564735['callback'][_0x79b8('0x24')](this):_0x386624(_0x79b8('0xa5'));};_0x42c853['fn'][_0x79b8('0xaf')]=function(_0x42f062){var _0x1fd5d6=_0x42c853(this);_0x1fd5d6['fn']=new _0x42c853[(_0x79b8('0xaf'))](this,_0x42f062);return _0x1fd5d6;};}catch(_0x405b92){_0x79b8('0x4')!==typeof console&&'function'===typeof console[_0x79b8('0x11')]&&console[_0x79b8('0x11')](_0x79b8('0x5f'),_0x405b92);}}(this));(function(_0x5c713a){try{var _0x424ed5=jQuery;window[_0x79b8('0xf2')]=window[_0x79b8('0xf2')]||{};window[_0x79b8('0xf2')]['items']={};window['_QuatroDigital_AmountProduct'][_0x79b8('0x136')]=!0x1;window[_0x79b8('0xf2')]['buyButtonClicked']=!0x1;window[_0x79b8('0xf2')][_0x79b8('0x137')]=!0x1;var _0x22a7c7=function(){if(window[_0x79b8('0xf2')][_0x79b8('0x136')]){var _0x4d3b64=!0x1;var _0x5c713a={};window[_0x79b8('0xf2')][_0x79b8('0x3c')]={};for(_0x2749ae in window[_0x79b8('0x55')][_0x79b8('0x23')][_0x79b8('0x3c')])if(_0x79b8('0x13')===typeof window[_0x79b8('0x55')][_0x79b8('0x23')][_0x79b8('0x3c')][_0x2749ae]){var _0x5c5a38=window['_QuatroDigital_DropDown'][_0x79b8('0x23')][_0x79b8('0x3c')][_0x2749ae];_0x79b8('0x4')!==typeof _0x5c5a38['productId']&&null!==_0x5c5a38['productId']&&''!==_0x5c5a38[_0x79b8('0x138')]&&(window[_0x79b8('0xf2')][_0x79b8('0x3c')]['prod_'+_0x5c5a38[_0x79b8('0x138')]]=window[_0x79b8('0xf2')][_0x79b8('0x3c')][_0x79b8('0x139')+_0x5c5a38[_0x79b8('0x138')]]||{},window[_0x79b8('0xf2')]['items'][_0x79b8('0x139')+_0x5c5a38[_0x79b8('0x138')]][_0x79b8('0x13a')]=_0x5c5a38[_0x79b8('0x138')],_0x5c713a[_0x79b8('0x139')+_0x5c5a38[_0x79b8('0x138')]]||(window['_QuatroDigital_AmountProduct'][_0x79b8('0x3c')][_0x79b8('0x139')+_0x5c5a38[_0x79b8('0x138')]][_0x79b8('0x3b')]=0x0),window[_0x79b8('0xf2')][_0x79b8('0x3c')]['prod_'+_0x5c5a38[_0x79b8('0x138')]][_0x79b8('0x3b')]+=_0x5c5a38[_0x79b8('0x103')],_0x4d3b64=!0x0,_0x5c713a[_0x79b8('0x139')+_0x5c5a38[_0x79b8('0x138')]]=!0x0);}var _0x2749ae=_0x4d3b64;}else _0x2749ae=void 0x0;window[_0x79b8('0xf2')][_0x79b8('0x136')]&&(_0x424ed5(_0x79b8('0x13b'))[_0x79b8('0x127')](),_0x424ed5(_0x79b8('0x13c'))[_0x79b8('0x47')](_0x79b8('0x13d')));for(var _0x3dfb56 in window[_0x79b8('0xf2')][_0x79b8('0x3c')]){_0x5c5a38=window[_0x79b8('0xf2')][_0x79b8('0x3c')][_0x3dfb56];if(_0x79b8('0x13')!==typeof _0x5c5a38)return;_0x5c713a=_0x424ed5(_0x79b8('0x13e')+_0x5c5a38[_0x79b8('0x13a')]+']')['getParent']('li');if(window[_0x79b8('0xf2')]['allowRecalculate']||!_0x5c713a[_0x79b8('0x4e')](_0x79b8('0x13b'))[_0x79b8('0x7')])_0x4d3b64=_0x424ed5(_0x79b8('0x13f')),_0x4d3b64[_0x79b8('0x4e')](_0x79b8('0x140'))[_0x79b8('0x4a')](_0x5c5a38[_0x79b8('0x3b')]),_0x5c5a38=_0x5c713a[_0x79b8('0x4e')](_0x79b8('0x141')),_0x5c5a38[_0x79b8('0x7')]?_0x5c5a38[_0x79b8('0xa7')](_0x4d3b64)[_0x79b8('0x45')](_0x79b8('0x13d')):_0x5c713a[_0x79b8('0xa7')](_0x4d3b64);}_0x2749ae&&(window['_QuatroDigital_AmountProduct'][_0x79b8('0x136')]=!0x1);};window[_0x79b8('0xf2')][_0x79b8('0xf3')]=function(){window[_0x79b8('0xf2')][_0x79b8('0x136')]=!0x0;_0x22a7c7[_0x79b8('0x24')](this);};_0x424ed5(document)[_0x79b8('0xac')](function(){_0x22a7c7['call'](this);});}catch(_0x2d544a){_0x79b8('0x4')!==typeof console&&_0x79b8('0xb')===typeof console[_0x79b8('0x11')]&&console[_0x79b8('0x11')](_0x79b8('0x5f'),_0x2d544a);}}(this));(function(){try{var _0x29f637=jQuery,_0x3227c3,_0x5669df={'selector':_0x79b8('0x142'),'dropDown':{},'buyButton':{}};_0x29f637[_0x79b8('0x143')]=function(_0x40210d){var _0x287019={};_0x3227c3=_0x29f637['extend'](!0x0,{},_0x5669df,_0x40210d);_0x40210d=_0x29f637(_0x3227c3[_0x79b8('0x144')])[_0x79b8('0xaf')](_0x3227c3[_0x79b8('0x145')]);_0x287019[_0x79b8('0x78')]=_0x79b8('0x4')!==typeof _0x3227c3[_0x79b8('0x145')][_0x79b8('0xd5')]&&!0x1===_0x3227c3['dropDown']['updateOnlyHover']?_0x29f637(_0x3227c3[_0x79b8('0x144')])[_0x79b8('0x71')](_0x40210d['fn'],_0x3227c3['buyButton']):_0x29f637(_0x3227c3['selector'])[_0x79b8('0x71')](_0x3227c3['buyButton']);_0x287019['dropDown']=_0x40210d;return _0x287019;};_0x29f637['fn']['smartCart']=function(){_0x79b8('0x13')===typeof console&&_0x79b8('0xb')===typeof console[_0x79b8('0x2a')]&&console[_0x79b8('0x2a')](_0x79b8('0x146'));};_0x29f637[_0x79b8('0x147')]=_0x29f637['fn'][_0x79b8('0x147')];}catch(_0x52865d){'undefined'!==typeof console&&_0x79b8('0xb')===typeof console[_0x79b8('0x11')]&&console[_0x79b8('0x11')](_0x79b8('0x5f'),_0x52865d);}}());