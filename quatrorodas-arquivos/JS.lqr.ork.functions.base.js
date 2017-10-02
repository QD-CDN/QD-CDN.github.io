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
var _0x28f6=['first','addClass','qd-am-first','last','bwndhngebebqnf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-banner-wrapper','qdAjax','find','img[alt=\x27','attr','data-qdam-value','.box-banner','clone','insertBefore','hide','text','trim','[class*=\x27colunas\x27]','qd-am-content-loaded','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','url','\x27\x20falho.','call','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','alerta','li\x20>ul','qd-am-has-ul','children',':not(ul)','qd-am-elem-','replaceSpecialChars','>li','qd-amazing-menu','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','qd-am-','-li','callback','QuatroDigital.am.callback','exec','.qd_amazing_menu_auto','getParent','closest','function','QD_amazingMenu','/qd-amazing-menu','error','undefined','info','unshift','[QD\x20Amazing\x20Menu]\x0a','toLowerCase','apply','join','warn','qdAmAddNdx','each','qd-am-li-'];(function(_0x3dd15e,_0x1f0015){var _0x231fd0=function(_0x4f680a){while(--_0x4f680a){_0x3dd15e['push'](_0x3dd15e['shift']());}};_0x231fd0(++_0x1f0015);}(_0x28f6,0x16b));var _0x628f=function(_0x327790,_0x120b1c){_0x327790=_0x327790-0x0;var _0x554a90=_0x28f6[_0x327790];return _0x554a90;};(function(_0x327959){_0x327959['fn'][_0x628f('0x0')]=_0x327959['fn'][_0x628f('0x1')];}(jQuery));(function(_0x4300fe){var _0x319d9a;var _0x49dadd=jQuery;if(_0x628f('0x2')!==typeof _0x49dadd['fn'][_0x628f('0x3')]){var _0x539fa6={'url':_0x628f('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0x30cef2=function(_0x33c1fa,_0x72fb53){if('object'===typeof console&&'undefined'!==typeof console[_0x628f('0x5')]&&_0x628f('0x6')!==typeof console[_0x628f('0x7')]&&_0x628f('0x6')!==typeof console['warn']){var _0xa88c4f;'object'===typeof _0x33c1fa?(_0x33c1fa[_0x628f('0x8')](_0x628f('0x9')),_0xa88c4f=_0x33c1fa):_0xa88c4f=[_0x628f('0x9')+_0x33c1fa];if(_0x628f('0x6')===typeof _0x72fb53||'alerta'!==_0x72fb53[_0x628f('0xa')]()&&'aviso'!==_0x72fb53['toLowerCase']())if(_0x628f('0x6')!==typeof _0x72fb53&&_0x628f('0x7')===_0x72fb53['toLowerCase']())try{console[_0x628f('0x7')][_0x628f('0xb')](console,_0xa88c4f);}catch(_0xe337b){try{console[_0x628f('0x7')](_0xa88c4f[_0x628f('0xc')]('\x0a'));}catch(_0x1095e0){}}else try{console['error'][_0x628f('0xb')](console,_0xa88c4f);}catch(_0x298c56){try{console['error'](_0xa88c4f[_0x628f('0xc')]('\x0a'));}catch(_0x1ce640){}}else try{console[_0x628f('0xd')]['apply'](console,_0xa88c4f);}catch(_0x4fd4f3){try{console[_0x628f('0xd')](_0xa88c4f['join']('\x0a'));}catch(_0x5b9474){}}}};_0x49dadd['fn'][_0x628f('0xe')]=function(){var _0x5490fd=_0x49dadd(this);_0x5490fd[_0x628f('0xf')](function(_0x4ebd4b){_0x49dadd(this)['addClass'](_0x628f('0x10')+_0x4ebd4b);});_0x5490fd[_0x628f('0x11')]()[_0x628f('0x12')](_0x628f('0x13'));_0x5490fd[_0x628f('0x14')]()[_0x628f('0x12')]('qd-am-last');return _0x5490fd;};_0x49dadd['fn'][_0x628f('0x3')]=function(){};_0x4300fe=function(_0x627320){var _0x3f07a3={'y':_0x628f('0x15')};return function(_0x55f85d){var _0x175c26=function(_0x416927){return _0x416927;};var _0x313d14=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x55f85d=_0x55f85d['d'+_0x313d14[0x10]+'c'+_0x313d14[0x11]+'m'+_0x175c26(_0x313d14[0x1])+'n'+_0x313d14[0xd]]['l'+_0x313d14[0x12]+'c'+_0x313d14[0x0]+'ti'+_0x175c26('o')+'n'];var _0x421313=function(_0x3932e5){return escape(encodeURIComponent(_0x3932e5['replace'](/\./g,'¨')[_0x628f('0x16')](/[a-zA-Z]/g,function(_0x5e10b9){return String[_0x628f('0x17')](('Z'>=_0x5e10b9?0x5a:0x7a)>=(_0x5e10b9=_0x5e10b9[_0x628f('0x18')](0x0)+0xd)?_0x5e10b9:_0x5e10b9-0x1a);})));};var _0x5e8ac7=_0x421313(_0x55f85d[[_0x313d14[0x9],_0x175c26('o'),_0x313d14[0xc],_0x313d14[_0x175c26(0xd)]][_0x628f('0xc')]('')]);_0x421313=_0x421313((window[['js',_0x175c26('no'),'m',_0x313d14[0x1],_0x313d14[0x4][_0x628f('0x19')](),'ite'][_0x628f('0xc')]('')]||'---')+['.v',_0x313d14[0xd],'e',_0x175c26('x'),'co',_0x175c26('mm'),_0x628f('0x1a'),_0x313d14[0x1],'.c',_0x175c26('o'),'m.',_0x313d14[0x13],'r']['join'](''));for(var _0x551348 in _0x3f07a3){if(_0x421313===_0x551348+_0x3f07a3[_0x551348]||_0x5e8ac7===_0x551348+_0x3f07a3[_0x551348]){var _0x494aab='tr'+_0x313d14[0x11]+'e';break;}_0x494aab='f'+_0x313d14[0x0]+'ls'+_0x175c26(_0x313d14[0x1])+'';}_0x175c26=!0x1;-0x1<_0x55f85d[[_0x313d14[0xc],'e',_0x313d14[0x0],'rc',_0x313d14[0x9]][_0x628f('0xc')]('')][_0x628f('0x1b')](_0x628f('0x1c'))&&(_0x175c26=!0x0);return[_0x494aab,_0x175c26];}(_0x627320);}(window);if(!eval(_0x4300fe[0x0]))return _0x4300fe[0x1]?_0x30cef2(_0x628f('0x1d')):!0x1;var _0x4af4b8=function(_0xbb3dff){var _0x168a68=_0xbb3dff['find'](_0x628f('0x1e'));var _0x56c958=_0x168a68[_0x628f('0x1f')](_0x628f('0x20'));var _0xa64fa2=_0x168a68[_0x628f('0x1f')](_0x628f('0x21'));if(_0x56c958[_0x628f('0x22')]||_0xa64fa2['length'])_0x56c958[_0x628f('0x23')]()[_0x628f('0x12')](_0x628f('0x24')),_0xa64fa2[_0x628f('0x23')]()[_0x628f('0x12')]('qd-am-collection-wrapper'),_0x49dadd[_0x628f('0x25')]({'url':_0x319d9a['url'],'dataType':'html','success':function(_0x38a4a6){var _0xf0ba12=_0x49dadd(_0x38a4a6);_0x56c958['each'](function(){var _0x38a4a6=_0x49dadd(this);var _0x2443e4=_0xf0ba12[_0x628f('0x26')](_0x628f('0x27')+_0x38a4a6[_0x628f('0x28')](_0x628f('0x29'))+'\x27]');_0x2443e4[_0x628f('0x22')]&&(_0x2443e4[_0x628f('0xf')](function(){_0x49dadd(this)[_0x628f('0x0')](_0x628f('0x2a'))[_0x628f('0x2b')]()[_0x628f('0x2c')](_0x38a4a6);}),_0x38a4a6[_0x628f('0x2d')]());})[_0x628f('0x12')]('qd-am-content-loaded');_0xa64fa2[_0x628f('0xf')](function(){var _0x38a4a6={};var _0x478a7f=_0x49dadd(this);_0xf0ba12[_0x628f('0x26')]('h2')[_0x628f('0xf')](function(){if(_0x49dadd(this)[_0x628f('0x2e')]()[_0x628f('0x2f')]()[_0x628f('0xa')]()==_0x478a7f[_0x628f('0x28')](_0x628f('0x29'))[_0x628f('0x2f')]()[_0x628f('0xa')]())return _0x38a4a6=_0x49dadd(this),!0x1;});_0x38a4a6['length']&&(_0x38a4a6['each'](function(){_0x49dadd(this)['getParent'](_0x628f('0x30'))['clone']()[_0x628f('0x2c')](_0x478a7f);}),_0x478a7f['hide']());})[_0x628f('0x12')](_0x628f('0x31'));},'error':function(){_0x30cef2(_0x628f('0x32')+_0x319d9a[_0x628f('0x33')]+_0x628f('0x34'));},'complete':function(){_0x319d9a['ajaxCallback'][_0x628f('0x35')](this);_0x49dadd(window)[_0x628f('0x36')](_0x628f('0x37'),_0xbb3dff);},'clearQueueDelay':0xbb8});};_0x49dadd[_0x628f('0x3')]=function(_0x3613bc){var _0x5995a8=_0x3613bc[_0x628f('0x26')](_0x628f('0x38'))['each'](function(){var _0x577f1f=_0x49dadd(this);if(!_0x577f1f[_0x628f('0x22')])return _0x30cef2(['UL\x20do\x20menu\x20não\x20encontrada',_0x3613bc],_0x628f('0x39'));_0x577f1f['find'](_0x628f('0x3a'))['parent']()['addClass'](_0x628f('0x3b'));_0x577f1f[_0x628f('0x26')]('li')[_0x628f('0xf')](function(){var _0x425a73=_0x49dadd(this);var _0x5196f9=_0x425a73[_0x628f('0x3c')](_0x628f('0x3d'));_0x5196f9['length']&&_0x425a73[_0x628f('0x12')](_0x628f('0x3e')+_0x5196f9[_0x628f('0x11')]()[_0x628f('0x2e')]()[_0x628f('0x2f')]()[_0x628f('0x3f')]()[_0x628f('0x16')](/\./g,'')[_0x628f('0x16')](/\s/g,'-')[_0x628f('0xa')]());});var _0x103f56=_0x577f1f[_0x628f('0x26')](_0x628f('0x40'))['qdAmAddNdx']();_0x577f1f[_0x628f('0x12')](_0x628f('0x41'));_0x103f56=_0x103f56[_0x628f('0x26')](_0x628f('0x42'));_0x103f56[_0x628f('0xf')](function(){var _0x2fd45b=_0x49dadd(this);_0x2fd45b[_0x628f('0x26')](_0x628f('0x40'))['qdAmAddNdx']()[_0x628f('0x12')](_0x628f('0x43'));_0x2fd45b['addClass'](_0x628f('0x44'));_0x2fd45b[_0x628f('0x23')]()[_0x628f('0x12')](_0x628f('0x45'));});_0x103f56[_0x628f('0x12')](_0x628f('0x45'));var _0x3cabfb=0x0,_0x4300fe=function(_0x1665e4){_0x3cabfb+=0x1;_0x1665e4=_0x1665e4[_0x628f('0x3c')]('li')[_0x628f('0x3c')]('*');_0x1665e4['length']&&(_0x1665e4[_0x628f('0x12')]('qd-am-level-'+_0x3cabfb),_0x4300fe(_0x1665e4));};_0x4300fe(_0x577f1f);_0x577f1f['add'](_0x577f1f[_0x628f('0x26')]('ul'))[_0x628f('0xf')](function(){var _0x432cf3=_0x49dadd(this);_0x432cf3['addClass'](_0x628f('0x46')+_0x432cf3[_0x628f('0x3c')]('li')[_0x628f('0x22')]+_0x628f('0x47'));});});_0x4af4b8(_0x5995a8);_0x319d9a[_0x628f('0x48')][_0x628f('0x35')](this);_0x49dadd(window)['trigger'](_0x628f('0x49'),_0x3613bc);};_0x49dadd['fn'][_0x628f('0x3')]=function(_0x4e09d9){var _0xfa2147=_0x49dadd(this);if(!_0xfa2147[_0x628f('0x22')])return _0xfa2147;_0x319d9a=_0x49dadd['extend']({},_0x539fa6,_0x4e09d9);_0xfa2147[_0x628f('0x4a')]=new _0x49dadd['QD_amazingMenu'](_0x49dadd(this));return _0xfa2147;};_0x49dadd(function(){_0x49dadd(_0x628f('0x4b'))['QD_amazingMenu']();});}}(this));

/*  Automatizador de comments box do Facebook Carlos Vinicius [Quatro Digital] */
/* Automatizador de comments box do Facebook // 1.6 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a=$(".fb-comments");a.length&&a.attr("data-href",document.location.href.split("#").shift().split("?").shift());$("#fb-root").length||$("body").append('<div id="fb-root"></div>');if(!$("script#facebook-jssdk").length){a=$("meta[property='fb:app_id']").attr("content")||!1;var b,c=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||(b=document.createElement("script"),b.id="facebook-jssdk",b.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+
(a?"&appId="+a:""),c.parentNode.insertBefore(b,c))}"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse()});

/* Quatro Digital Smart Cart */
var _0x0506=['ku=','shift','asyncCallback','cartProductAdded.vtex','fakeRequest','parent','Callback\x20não\x20é\x20uma\x20função','.qd-bb-itemAddWrapper','prepend','ajaxSend','/checkout/cart/add','pop','productAddedToCart.qdSbbVtex','QuatroDigital.qd_bb_prod_add','ajaxStop','Oooops!\x20','message','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','aviso','QD_dropDownCart','bwndhngebebqnf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','name','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20input','val','updateOnlyHover','mouseenter.qd_ddc_hover','mouseleave.qd_ddc_hover','texts','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','linkCart','.qd-ddc-checkout','.qd-ddc-shipping','.qd-ddc-emptyCart\x20p','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','shipping','dataOptionsCache','.qd-ddc-wrapper','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','cartIsEmpty','.qd-ddc-prodRow','qd-ddc-noItems','renderProductsList','empty','productCategoryIds','qd-ddc-','availability','.qd-ddc-prodPrice','sellingPrice','meta[name=currency]','.qd-ddc-quantity','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-empty','qd-ddc-product-add-time','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','src','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','preventDefault','focusout.qd_ddc_change','.qd-ddc-remove','click.qd_ddc_remove','removeProduct','stop','slideUp','remove','shippingCalculate','$1-$2$3','qdDdcLastPostalCode','calculateShipping','BRA','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','index','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','buyButtonClicked','quickViewUpdate','allowRecalculate','productId','prod_','prodId','.qd-bap-item-added','qd-bap-item-added','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','.qdDdcContainer','QD_smartCart','dropDown','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','closest','replace','undefined','pow','round','toFixed','split','length','join','function','prototype','trim','capitalize','charAt','slice','qdAjax','qdAjaxQueue','jquery','000','error','extend','stringify','data','toString','url','type','jqXHR','ajax','done','success','fail','complete','always','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','version','4.0','simpleCart','checkout','getOrderForm','call','QuatroDigital_simpleCart','ajaxStopOn','object','warn','[Simple\x20Cart]\x0a','info','toLowerCase','QD_simpleCart','elements','add','.qd_cart_qtt','.qd_cart_total','.qd_items_text','attr','content','each','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','Shipping','value','total','currencySymbol','allTotal','qtt','showQuantityByItems','items','quantity','callback','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','.singular','show','hide','filter','.plural','addClass','removeClass','qd-emptyCart','alerta','cartTotalE','html','itemsTextE','cartQttE','find','cartTotal','emptyElem','emptyCart','qd-sc-populated','smartCheckout','_QuatroDigital_DropDown','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','QD_checkoutQueue','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','trigger','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','.qd_cart_auto','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','vtexjs','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','Callbacks','fire','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','apply','input.buy-in-page-quantity','body','Produto\x20adicionado\x20ao\x20carrinho!','location','href','#produto,\x20.produto','QD_buyButton','qd-bb-click-active','allowBuyClick','clickBuySmartCheckout','Método\x20descontinuado!','buyButton','qd-sbb-on','.remove-href','qd-bb-active','children','append','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','.buy-in-page-button','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','prodAdd','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','[href=\x27','---','qd-bb-itemAddBuyButtonWrapper','qd-bb-itemAddCartWrapper','timeRemoveNewItemClass','getCartInfoByUrl','isSmartCheckout','função\x20descontinuada','allowUpdate','autoWatchBuyButton','.btn-add-buy-button-asynchronous','click','bind','unbind','load','mouseenter.qd_bb_buy_sc','indexOf','selectSkuMsg','execDefaultAction','redirect=false','queue','buyIfQuantityZeroed','test','match','push','productPageCallback','buyButtonClickCallback'];(function(_0x424ebf,_0x4c64d3){var _0x4c6aef=function(_0x3e17eb){while(--_0x3e17eb){_0x424ebf['push'](_0x424ebf['shift']());}};_0x4c6aef(++_0x4c64d3);}(_0x0506,0x1d1));var _0x6050=function(_0x3991c7,_0x1a43f1){_0x3991c7=_0x3991c7-0x0;var _0xcbd871=_0x0506[_0x3991c7];return _0xcbd871;};(function(_0x382adc){_0x382adc['fn'][_0x6050('0x0')]=_0x382adc['fn'][_0x6050('0x1')];}(jQuery));function qd_number_format(_0x5592e4,_0x52f82b,_0x5139c7,_0x49a1ca){_0x5592e4=(_0x5592e4+'')[_0x6050('0x2')](/[^0-9+\-Ee.]/g,'');_0x5592e4=isFinite(+_0x5592e4)?+_0x5592e4:0x0;_0x52f82b=isFinite(+_0x52f82b)?Math['abs'](_0x52f82b):0x0;_0x49a1ca=_0x6050('0x3')===typeof _0x49a1ca?',':_0x49a1ca;_0x5139c7='undefined'===typeof _0x5139c7?'.':_0x5139c7;var _0x269be3='',_0x269be3=function(_0x2a3644,_0x1a89fb){var _0x52f82b=Math[_0x6050('0x4')](0xa,_0x1a89fb);return''+(Math[_0x6050('0x5')](_0x2a3644*_0x52f82b)/_0x52f82b)[_0x6050('0x6')](_0x1a89fb);},_0x269be3=(_0x52f82b?_0x269be3(_0x5592e4,_0x52f82b):''+Math['round'](_0x5592e4))[_0x6050('0x7')]('.');0x3<_0x269be3[0x0]['length']&&(_0x269be3[0x0]=_0x269be3[0x0][_0x6050('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x49a1ca));(_0x269be3[0x1]||'')[_0x6050('0x8')]<_0x52f82b&&(_0x269be3[0x1]=_0x269be3[0x1]||'',_0x269be3[0x1]+=Array(_0x52f82b-_0x269be3[0x1][_0x6050('0x8')]+0x1)[_0x6050('0x9')]('0'));return _0x269be3[_0x6050('0x9')](_0x5139c7);};_0x6050('0xa')!==typeof String[_0x6050('0xb')][_0x6050('0xc')]&&(String[_0x6050('0xb')][_0x6050('0xc')]=function(){return this['replace'](/^\s+|\s+$/g,'');});_0x6050('0xa')!=typeof String['prototype'][_0x6050('0xd')]&&(String[_0x6050('0xb')][_0x6050('0xd')]=function(){return this[_0x6050('0xe')](0x0)['toUpperCase']()+this[_0x6050('0xf')](0x1)['toLowerCase']();});(function(_0x377b42){if(_0x6050('0xa')!==typeof _0x377b42[_0x6050('0x10')]){var _0x3876e6={};_0x377b42[_0x6050('0x11')]=_0x3876e6;0x96>parseInt((_0x377b42['fn'][_0x6050('0x12')][_0x6050('0x2')](/[^0-9]+/g,'')+_0x6050('0x13'))[_0x6050('0xf')](0x0,0x3),0xa)&&console&&_0x6050('0xa')==typeof console[_0x6050('0x14')]&&console[_0x6050('0x14')]();_0x377b42['qdAjax']=function(_0x1dd507){try{var _0x3e1ef6=_0x377b42[_0x6050('0x15')]({},{'url':'','type':'GET','data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x1dd507);var _0x4ed245='object'===typeof _0x3e1ef6['data']?JSON[_0x6050('0x16')](_0x3e1ef6[_0x6050('0x17')]):_0x3e1ef6['data'][_0x6050('0x18')]();var _0x1bded6=encodeURIComponent(_0x3e1ef6[_0x6050('0x19')]+'|'+_0x3e1ef6[_0x6050('0x1a')]+'|'+_0x4ed245);_0x3876e6[_0x1bded6]=_0x3876e6[_0x1bded6]||{};_0x6050('0x3')==typeof _0x3876e6[_0x1bded6][_0x6050('0x1b')]?_0x3876e6[_0x1bded6]['jqXHR']=_0x377b42[_0x6050('0x1c')](_0x3e1ef6):(_0x3876e6[_0x1bded6][_0x6050('0x1b')][_0x6050('0x1d')](_0x3e1ef6[_0x6050('0x1e')]),_0x3876e6[_0x1bded6][_0x6050('0x1b')][_0x6050('0x1f')](_0x3e1ef6[_0x6050('0x14')]),_0x3876e6[_0x1bded6][_0x6050('0x1b')]['always'](_0x3e1ef6[_0x6050('0x20')]));_0x3876e6[_0x1bded6]['jqXHR'][_0x6050('0x21')](function(){isNaN(parseInt(_0x3e1ef6[_0x6050('0x22')]))||setTimeout(function(){_0x3876e6[_0x1bded6][_0x6050('0x1b')]=void 0x0;},_0x3e1ef6[_0x6050('0x22')]);});return _0x3876e6[_0x1bded6][_0x6050('0x1b')];}catch(_0x45ba65){'undefined'!==typeof console&&_0x6050('0xa')===typeof console[_0x6050('0x14')]&&console[_0x6050('0x14')](_0x6050('0x23')+_0x45ba65['message']);}};_0x377b42[_0x6050('0x10')][_0x6050('0x24')]=_0x6050('0x25');}}(jQuery));(function(_0x35a2ef){_0x35a2ef['fn'][_0x6050('0x0')]=_0x35a2ef['fn'][_0x6050('0x1')];}(jQuery));(function(){var _0x1c1bd0=jQuery;if('function'!==typeof _0x1c1bd0['fn'][_0x6050('0x26')]){_0x1c1bd0(function(){var _0x2c9c0e=vtexjs[_0x6050('0x27')][_0x6050('0x28')];vtexjs[_0x6050('0x27')][_0x6050('0x28')]=function(){return _0x2c9c0e[_0x6050('0x29')]();};});try{window[_0x6050('0x2a')]=window[_0x6050('0x2a')]||{};window['QuatroDigital_simpleCart'][_0x6050('0x2b')]=!0x1;_0x1c1bd0['fn']['simpleCart']=function(_0x5542fa,_0x31fd3b,_0x2a38a9){var _0x1442f2=function(_0x536f51,_0x36eb96){if('object'===typeof console){var _0x486527=_0x6050('0x2c')===typeof _0x536f51;_0x6050('0x3')!==typeof _0x36eb96&&'alerta'===_0x36eb96['toLowerCase']()?_0x486527?console[_0x6050('0x2d')](_0x6050('0x2e'),_0x536f51[0x0],_0x536f51[0x1],_0x536f51[0x2],_0x536f51[0x3],_0x536f51[0x4],_0x536f51[0x5],_0x536f51[0x6],_0x536f51[0x7]):console['warn'](_0x6050('0x2e')+_0x536f51):_0x6050('0x3')!==typeof _0x36eb96&&_0x6050('0x2f')===_0x36eb96[_0x6050('0x30')]()?_0x486527?console['info'](_0x6050('0x2e'),_0x536f51[0x0],_0x536f51[0x1],_0x536f51[0x2],_0x536f51[0x3],_0x536f51[0x4],_0x536f51[0x5],_0x536f51[0x6],_0x536f51[0x7]):console['info'](_0x6050('0x2e')+_0x536f51):_0x486527?console['error'](_0x6050('0x2e'),_0x536f51[0x0],_0x536f51[0x1],_0x536f51[0x2],_0x536f51[0x3],_0x536f51[0x4],_0x536f51[0x5],_0x536f51[0x6],_0x536f51[0x7]):console[_0x6050('0x14')](_0x6050('0x2e')+_0x536f51);}};var _0x50f014=_0x1c1bd0(this);_0x6050('0x2c')===typeof _0x5542fa?_0x31fd3b=_0x5542fa:(_0x5542fa=_0x5542fa||!0x1,_0x50f014=_0x50f014['add'](_0x1c1bd0[_0x6050('0x31')]['elements']));if(!_0x50f014[_0x6050('0x8')])return _0x50f014;_0x1c1bd0[_0x6050('0x31')][_0x6050('0x32')]=_0x1c1bd0[_0x6050('0x31')]['elements'][_0x6050('0x33')](_0x50f014);_0x2a38a9=_0x6050('0x3')===typeof _0x2a38a9?!0x1:_0x2a38a9;var _0x547190={'cartQtt':_0x6050('0x34'),'cartTotal':_0x6050('0x35'),'itemsText':_0x6050('0x36'),'currencySymbol':(_0x1c1bd0('meta[name=currency]')[_0x6050('0x37')](_0x6050('0x38'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x3e2a7f=_0x1c1bd0['extend']({},_0x547190,_0x31fd3b);var _0x208cc6=_0x1c1bd0('');_0x50f014[_0x6050('0x39')](function(){var _0x4d1f95=_0x1c1bd0(this);_0x4d1f95[_0x6050('0x17')](_0x6050('0x3a'))||_0x4d1f95[_0x6050('0x17')](_0x6050('0x3a'),_0x3e2a7f);});var _0x39b10d=function(_0x15bf45){window[_0x6050('0x3b')]=window[_0x6050('0x3b')]||{};for(var _0x5542fa=0x0,_0x564458=0x0,_0x13eda9=0x0;_0x13eda9<_0x15bf45[_0x6050('0x3c')]['length'];_0x13eda9++)_0x6050('0x3d')==_0x15bf45['totalizers'][_0x13eda9]['id']&&(_0x564458+=_0x15bf45[_0x6050('0x3c')][_0x13eda9][_0x6050('0x3e')]),_0x5542fa+=_0x15bf45[_0x6050('0x3c')][_0x13eda9][_0x6050('0x3e')];window[_0x6050('0x3b')][_0x6050('0x3f')]=_0x3e2a7f[_0x6050('0x40')]+qd_number_format(_0x5542fa/0x64,0x2,',','.');window[_0x6050('0x3b')]['shipping']=_0x3e2a7f['currencySymbol']+qd_number_format(_0x564458/0x64,0x2,',','.');window['_QuatroDigital_CartData'][_0x6050('0x41')]=_0x3e2a7f[_0x6050('0x40')]+qd_number_format((_0x5542fa+_0x564458)/0x64,0x2,',','.');window[_0x6050('0x3b')][_0x6050('0x42')]=0x0;if(_0x3e2a7f[_0x6050('0x43')])for(_0x13eda9=0x0;_0x13eda9<_0x15bf45[_0x6050('0x44')][_0x6050('0x8')];_0x13eda9++)window[_0x6050('0x3b')][_0x6050('0x42')]+=_0x15bf45[_0x6050('0x44')][_0x13eda9][_0x6050('0x45')];else window[_0x6050('0x3b')]['qtt']=_0x15bf45['items'][_0x6050('0x8')]||0x0;try{window[_0x6050('0x3b')][_0x6050('0x46')]&&window[_0x6050('0x3b')][_0x6050('0x46')]['fire']&&window[_0x6050('0x3b')][_0x6050('0x46')]['fire']();}catch(_0x3dac47){_0x1442f2(_0x6050('0x47'));}_0x7d9ab0(_0x208cc6);};var _0x292831=function(_0x4ac49b,_0x4e2add){0x1===_0x4ac49b?_0x4e2add['hide']()['filter'](_0x6050('0x48'))[_0x6050('0x49')]():_0x4e2add[_0x6050('0x4a')]()[_0x6050('0x4b')](_0x6050('0x4c'))[_0x6050('0x49')]();};var _0x28f971=function(_0x2fec17){0x1>_0x2fec17?_0x50f014[_0x6050('0x4d')]('qd-emptyCart'):_0x50f014[_0x6050('0x4e')](_0x6050('0x4f'));};var _0x416813=function(_0x1ef55a,_0x2f8402){var _0x2bf6ff=parseInt(window[_0x6050('0x3b')][_0x6050('0x42')],0xa);_0x2f8402['$this']['show']();isNaN(_0x2bf6ff)&&(_0x1442f2('O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.',_0x6050('0x50')),_0x2bf6ff=0x0);_0x2f8402[_0x6050('0x51')][_0x6050('0x52')](window[_0x6050('0x3b')][_0x6050('0x3f')]);_0x2f8402['cartQttE'][_0x6050('0x52')](_0x2bf6ff);_0x292831(_0x2bf6ff,_0x2f8402[_0x6050('0x53')]);_0x28f971(_0x2bf6ff);};var _0x7d9ab0=function(_0x530395){_0x50f014[_0x6050('0x39')](function(){var _0x149f38={};var _0x2a489b=_0x1c1bd0(this);_0x5542fa&&_0x2a489b[_0x6050('0x17')](_0x6050('0x3a'))&&_0x1c1bd0['extend'](_0x3e2a7f,_0x2a489b[_0x6050('0x17')](_0x6050('0x3a')));_0x149f38['$this']=_0x2a489b;_0x149f38[_0x6050('0x54')]=_0x2a489b[_0x6050('0x55')](_0x3e2a7f['cartQtt'])||_0x208cc6;_0x149f38[_0x6050('0x51')]=_0x2a489b[_0x6050('0x55')](_0x3e2a7f[_0x6050('0x56')])||_0x208cc6;_0x149f38[_0x6050('0x53')]=_0x2a489b['find'](_0x3e2a7f['itemsText'])||_0x208cc6;_0x149f38[_0x6050('0x57')]=_0x2a489b[_0x6050('0x55')](_0x3e2a7f[_0x6050('0x58')])||_0x208cc6;_0x416813(_0x530395,_0x149f38);_0x2a489b[_0x6050('0x4d')](_0x6050('0x59'));});};(function(){if(_0x3e2a7f[_0x6050('0x5a')]){window[_0x6050('0x5b')]=window[_0x6050('0x5b')]||{};if(_0x6050('0x3')!==typeof window[_0x6050('0x5b')][_0x6050('0x28')]&&(_0x2a38a9||!_0x5542fa))return _0x39b10d(window[_0x6050('0x5b')][_0x6050('0x28')]);if('object'!==typeof window['vtexjs']||_0x6050('0x3')===typeof window['vtexjs'][_0x6050('0x27')])if('object'===typeof vtex&&_0x6050('0x2c')===typeof vtex[_0x6050('0x27')]&&'undefined'!==typeof vtex[_0x6050('0x27')][_0x6050('0x5c')])new vtex[(_0x6050('0x27'))][(_0x6050('0x5c'))]();else return _0x1442f2(_0x6050('0x5d'));_0x1c1bd0[_0x6050('0x5e')]([_0x6050('0x44'),'totalizers',_0x6050('0x5f')],{'done':function(_0x4f3794){_0x39b10d(_0x4f3794);window['_QuatroDigital_DropDown'][_0x6050('0x28')]=_0x4f3794;},'fail':function(_0x551a79){_0x1442f2([_0x6050('0x60'),_0x551a79]);}});}else alert(_0x6050('0x61'));}());_0x3e2a7f[_0x6050('0x46')]();_0x1c1bd0(window)[_0x6050('0x62')]('simpleCartCallback.quatro_digital');return _0x50f014;};_0x1c1bd0[_0x6050('0x31')]={'elements':_0x1c1bd0('')};_0x1c1bd0(function(){var _0x4cb6b6;_0x6050('0xa')===typeof window[_0x6050('0x63')]&&(_0x4cb6b6=window['ajaxRequestbuyButtonAsynchronous'],window[_0x6050('0x63')]=function(_0x37008d,_0x412112,_0x15f415,_0x19b81b,_0xe62909){_0x4cb6b6['call'](this,_0x37008d,_0x412112,_0x15f415,_0x19b81b,function(){_0x6050('0xa')===typeof _0xe62909&&_0xe62909();_0x1c1bd0[_0x6050('0x31')][_0x6050('0x32')][_0x6050('0x39')](function(){var _0x45128b=_0x1c1bd0(this);_0x45128b[_0x6050('0x26')](_0x45128b[_0x6050('0x17')](_0x6050('0x3a')));});});});});var _0x583e67=window[_0x6050('0x64')]||void 0x0;window[_0x6050('0x64')]=function(_0x997e97){_0x1c1bd0['fn'][_0x6050('0x26')](!0x0);_0x6050('0xa')===typeof _0x583e67?_0x583e67[_0x6050('0x29')](this,_0x997e97):alert(_0x997e97);};_0x1c1bd0(function(){var _0xeadcc1=_0x1c1bd0(_0x6050('0x65'));_0xeadcc1['length']&&_0xeadcc1['simpleCart']();});_0x1c1bd0(function(){_0x1c1bd0(window)['bind']('productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex',function(){_0x1c1bd0['fn'][_0x6050('0x26')](!0x0);});});}catch(_0x1ff5d0){_0x6050('0x3')!==typeof console&&'function'===typeof console[_0x6050('0x14')]&&console[_0x6050('0x14')]('Oooops!\x20',_0x1ff5d0);}}}());(function(){var _0x3d6b35=function(_0x3a0945,_0x12c144){if(_0x6050('0x2c')===typeof console){var _0x1502cd=_0x6050('0x2c')===typeof _0x3a0945;'undefined'!==typeof _0x12c144&&_0x6050('0x50')===_0x12c144['toLowerCase']()?_0x1502cd?console[_0x6050('0x2d')](_0x6050('0x66'),_0x3a0945[0x0],_0x3a0945[0x1],_0x3a0945[0x2],_0x3a0945[0x3],_0x3a0945[0x4],_0x3a0945[0x5],_0x3a0945[0x6],_0x3a0945[0x7]):console[_0x6050('0x2d')](_0x6050('0x66')+_0x3a0945):'undefined'!==typeof _0x12c144&&_0x6050('0x2f')===_0x12c144[_0x6050('0x30')]()?_0x1502cd?console['info']('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x3a0945[0x0],_0x3a0945[0x1],_0x3a0945[0x2],_0x3a0945[0x3],_0x3a0945[0x4],_0x3a0945[0x5],_0x3a0945[0x6],_0x3a0945[0x7]):console[_0x6050('0x2f')](_0x6050('0x66')+_0x3a0945):_0x1502cd?console[_0x6050('0x14')](_0x6050('0x66'),_0x3a0945[0x0],_0x3a0945[0x1],_0x3a0945[0x2],_0x3a0945[0x3],_0x3a0945[0x4],_0x3a0945[0x5],_0x3a0945[0x6],_0x3a0945[0x7]):console[_0x6050('0x14')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a'+_0x3a0945);}},_0x56ce47=null,_0x20534f={},_0x10161f={},_0x4e3846={};$[_0x6050('0x5e')]=function(_0x5ad031,_0x228115){if(null===_0x56ce47)if(_0x6050('0x2c')===typeof window[_0x6050('0x67')]&&'undefined'!==typeof window[_0x6050('0x67')][_0x6050('0x27')])_0x56ce47=window[_0x6050('0x67')][_0x6050('0x27')];else return _0x3d6b35(_0x6050('0x68'));var _0xfe55cd=$[_0x6050('0x15')]({'done':function(){},'fail':function(){}},_0x228115),_0x52b538=_0x5ad031[_0x6050('0x9')](';'),_0x13d860=function(){_0x20534f[_0x52b538]['add'](_0xfe55cd['done']);_0x10161f[_0x52b538][_0x6050('0x33')](_0xfe55cd[_0x6050('0x1f')]);};_0x4e3846[_0x52b538]?_0x13d860():(_0x20534f[_0x52b538]=$[_0x6050('0x69')](),_0x10161f[_0x52b538]=$[_0x6050('0x69')](),_0x13d860(),_0x4e3846[_0x52b538]=!0x0,_0x56ce47[_0x6050('0x28')](_0x5ad031)[_0x6050('0x1d')](function(_0x1d1a22){_0x4e3846[_0x52b538]=!0x1;_0x20534f[_0x52b538][_0x6050('0x6a')](_0x1d1a22);})[_0x6050('0x1f')](function(_0x26c9c0){_0x4e3846[_0x52b538]=!0x1;_0x10161f[_0x52b538][_0x6050('0x6a')](_0x26c9c0);}));};}());(function(_0x4c1c28){try{var _0x4ed1d4=jQuery,_0x908fde,_0x14c8e3=_0x4ed1d4({}),_0xd42a36=function(_0x4dfe55,_0x5938ea){if('object'===typeof console&&'undefined'!==typeof console[_0x6050('0x14')]&&'undefined'!==typeof console[_0x6050('0x2f')]&&_0x6050('0x3')!==typeof console['warn']){var _0x56836c;_0x6050('0x2c')===typeof _0x4dfe55?(_0x4dfe55[_0x6050('0x6b')](_0x6050('0x6c')),_0x56836c=_0x4dfe55):_0x56836c=[_0x6050('0x6c')+_0x4dfe55];if('undefined'===typeof _0x5938ea||_0x6050('0x50')!==_0x5938ea[_0x6050('0x30')]()&&'aviso'!==_0x5938ea[_0x6050('0x30')]())if('undefined'!==typeof _0x5938ea&&_0x6050('0x2f')===_0x5938ea[_0x6050('0x30')]())try{console['info']['apply'](console,_0x56836c);}catch(_0x2ba952){try{console[_0x6050('0x2f')](_0x56836c[_0x6050('0x9')]('\x0a'));}catch(_0x56d712){}}else try{console[_0x6050('0x14')]['apply'](console,_0x56836c);}catch(_0x40602){try{console[_0x6050('0x14')](_0x56836c[_0x6050('0x9')]('\x0a'));}catch(_0x557601){}}else try{console[_0x6050('0x2d')][_0x6050('0x6d')](console,_0x56836c);}catch(_0x413dde){try{console['warn'](_0x56836c[_0x6050('0x9')]('\x0a'));}catch(_0x303d0f){}}}},_0x5a2b0d={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':'.productInformationWrapper\x20\x20a.buy-button','buyQtt':_0x6050('0x6e'),'selectSkuMsg':'javascript:','autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x1ebf6e,_0x41329b,_0x417849){_0x4ed1d4(_0x6050('0x6f'))['is']('.productQuickView')&&('success'===_0x41329b?alert(_0x6050('0x70')):(alert('Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.'),(_0x6050('0x2c')===typeof parent?parent:document)[_0x6050('0x71')][_0x6050('0x72')]=_0x417849));},'isProductPage':function(){return _0x4ed1d4(_0x6050('0x6f'))['is'](_0x6050('0x73'));},'execDefaultAction':function(_0x4d9011){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x4ed1d4[_0x6050('0x74')]=function(_0x2e8e40,_0x2e92a0){function _0x5d071a(_0x3617ee){_0x908fde['isSmartCheckout']?_0x3617ee['data'](_0x6050('0x75'))||(_0x3617ee['data'](_0x6050('0x75'),0x1),_0x3617ee['on']('click.qd_bb_buy_sc',function(_0x2f14f3){if(!_0x908fde[_0x6050('0x76')]())return!0x0;if(!0x0!==_0x5a60b5[_0x6050('0x77')][_0x6050('0x29')](this))return _0x2f14f3['preventDefault'](),!0x1;})):alert(_0x6050('0x78'));}function _0x41b0f7(_0x10a637){_0x10a637=_0x10a637||_0x4ed1d4(_0x908fde[_0x6050('0x79')]);_0x10a637[_0x6050('0x39')](function(){var _0x10a637=_0x4ed1d4(this);_0x10a637['is']('.qd-sbb-on')||(_0x10a637[_0x6050('0x4d')](_0x6050('0x7a')),_0x10a637['is']('.btn-add-buy-button-asynchronous')&&!_0x10a637['is'](_0x6050('0x7b'))||_0x10a637[_0x6050('0x17')](_0x6050('0x7c'))||(_0x10a637[_0x6050('0x17')](_0x6050('0x7c'),0x1),_0x10a637[_0x6050('0x7d')]('.qd-bb-productAdded')[_0x6050('0x8')]||_0x10a637[_0x6050('0x7e')](_0x6050('0x7f')),_0x10a637['is'](_0x6050('0x80'))&&_0x908fde['isProductPage']()&&_0x3b868f[_0x6050('0x29')](_0x10a637),_0x5d071a(_0x10a637)));});_0x908fde[_0x6050('0x81')]()&&!_0x10a637[_0x6050('0x8')]&&_0xd42a36(_0x6050('0x82')+_0x10a637[_0x6050('0x83')]+'\x27.','info');}var _0x22797f=_0x4ed1d4(_0x2e8e40);var _0x5a60b5=this;window[_0x6050('0x84')]=window[_0x6050('0x84')]||{};window[_0x6050('0x3b')]=window[_0x6050('0x3b')]||{};_0x5a60b5[_0x6050('0x85')]=function(_0x5efa33,_0x14777a){_0x22797f[_0x6050('0x4d')](_0x6050('0x86'));_0x4ed1d4(_0x6050('0x6f'))[_0x6050('0x4d')](_0x6050('0x87'));var _0x1be710=_0x4ed1d4(_0x908fde[_0x6050('0x79')])[_0x6050('0x4b')](_0x6050('0x88')+(_0x5efa33[_0x6050('0x37')](_0x6050('0x72'))||_0x6050('0x89'))+'\x27]')['add'](_0x5efa33);_0x1be710[_0x6050('0x4d')](_0x6050('0x8a'));setTimeout(function(){_0x22797f[_0x6050('0x4e')](_0x6050('0x8b'));_0x1be710['removeClass'](_0x6050('0x8a'));},_0x908fde[_0x6050('0x8c')]);window[_0x6050('0x84')][_0x6050('0x28')]=void 0x0;if('undefined'!==typeof _0x2e92a0&&_0x6050('0xa')===typeof _0x2e92a0[_0x6050('0x8d')])return _0x908fde[_0x6050('0x8e')]||(_0xd42a36(_0x6050('0x8f')),_0x2e92a0[_0x6050('0x8d')]()),window[_0x6050('0x5b')][_0x6050('0x28')]=void 0x0,_0x2e92a0[_0x6050('0x8d')](function(_0x55589f){window[_0x6050('0x84')][_0x6050('0x28')]=_0x55589f;_0x4ed1d4['fn'][_0x6050('0x26')](!0x0,void 0x0,!0x0);},{'lastSku':_0x14777a});window[_0x6050('0x84')][_0x6050('0x90')]=!0x0;_0x4ed1d4['fn']['simpleCart'](!0x0);};(function(){if(_0x908fde['isSmartCheckout']&&_0x908fde[_0x6050('0x91')]){var _0x8989d5=_0x4ed1d4(_0x6050('0x92'));_0x8989d5[_0x6050('0x8')]&&_0x41b0f7(_0x8989d5);}}());var _0x3b868f=function(){var _0x4fd31f=_0x4ed1d4(this);'undefined'!==typeof _0x4fd31f[_0x6050('0x17')](_0x6050('0x79'))?(_0x4fd31f['unbind'](_0x6050('0x93')),_0x5d071a(_0x4fd31f)):(_0x4fd31f[_0x6050('0x94')]('mouseenter.qd_bb_buy_sc',function(_0x3f42e8){_0x4fd31f[_0x6050('0x95')](_0x6050('0x93'));_0x5d071a(_0x4fd31f);_0x4ed1d4(this)['unbind'](_0x3f42e8);}),_0x4ed1d4(window)[_0x6050('0x96')](function(){_0x4fd31f[_0x6050('0x95')]('click');_0x5d071a(_0x4fd31f);_0x4fd31f[_0x6050('0x95')](_0x6050('0x97'));}));};_0x5a60b5[_0x6050('0x77')]=function(){var _0x421b4e=_0x4ed1d4(this),_0x2e8e40=_0x421b4e[_0x6050('0x37')](_0x6050('0x72'))||'';if(-0x1<_0x2e8e40[_0x6050('0x98')](_0x908fde[_0x6050('0x99')]))return!0x0;_0x2e8e40=_0x2e8e40[_0x6050('0x2')](/redirect\=(false|true)/gi,'')[_0x6050('0x2')]('?','?redirect=false&')[_0x6050('0x2')](/\&\&/gi,'&');if(_0x908fde[_0x6050('0x9a')](_0x421b4e))return _0x421b4e['attr'](_0x6050('0x72'),_0x2e8e40['replace'](_0x6050('0x9b'),'redirect=true')),!0x0;_0x2e8e40=_0x2e8e40[_0x6050('0x2')](/http.?:/i,'');_0x14c8e3[_0x6050('0x9c')](function(_0x56f1b6){if(!_0x908fde[_0x6050('0x9d')]&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0x6050('0x9e')](_0x2e8e40))return _0x56f1b6();var _0x590430=function(_0xcb500e,_0x1c27f0){var _0x41b0f7=_0x2e8e40[_0x6050('0x9f')](/sku\=([0-9]+)/gi),_0x55c0be=[];if(_0x6050('0x2c')===typeof _0x41b0f7&&null!==_0x41b0f7)for(var _0x164ecf=_0x41b0f7['length']-0x1;0x0<=_0x164ecf;_0x164ecf--){var _0x4521ef=parseInt(_0x41b0f7[_0x164ecf][_0x6050('0x2')](/sku\=/gi,''));isNaN(_0x4521ef)||_0x55c0be[_0x6050('0xa0')](_0x4521ef);}_0x908fde[_0x6050('0xa1')][_0x6050('0x29')](this,_0xcb500e,_0x1c27f0,_0x2e8e40);_0x5a60b5[_0x6050('0xa2')]['call'](this,_0xcb500e,_0x1c27f0,_0x2e8e40,_0x55c0be);_0x5a60b5[_0x6050('0x85')](_0x421b4e,_0x2e8e40[_0x6050('0x7')](_0x6050('0xa3'))['pop']()[_0x6050('0x7')]('&')[_0x6050('0xa4')]());_0x6050('0xa')===typeof _0x908fde[_0x6050('0xa5')]&&_0x908fde[_0x6050('0xa5')][_0x6050('0x29')](this);_0x4ed1d4(window)[_0x6050('0x62')]('productAddedToCart');_0x4ed1d4(window)[_0x6050('0x62')](_0x6050('0xa6'));};_0x908fde[_0x6050('0xa7')]?(_0x590430(null,_0x6050('0x1e')),_0x56f1b6()):_0x4ed1d4[_0x6050('0x1c')]({'url':_0x2e8e40,'complete':_0x590430})[_0x6050('0x21')](function(){_0x56f1b6();});});};_0x5a60b5[_0x6050('0xa2')]=function(_0x78263f,_0x31fa04,_0x523459,_0x4c8b54){try{_0x6050('0x1e')===_0x31fa04&&_0x6050('0x2c')===typeof window['parent']&&_0x6050('0xa')===typeof window[_0x6050('0xa8')]['_QuatroDigital_prodBuyCallback']&&window[_0x6050('0xa8')]['_QuatroDigital_prodBuyCallback'](_0x78263f,_0x31fa04,_0x523459,_0x4c8b54);}catch(_0x4dba1c){_0xd42a36('Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.');}};_0x41b0f7();_0x6050('0xa')===typeof _0x908fde['callback']?_0x908fde[_0x6050('0x46')][_0x6050('0x29')](this):_0xd42a36(_0x6050('0xa9'));};var _0x29ccea=_0x4ed1d4['Callbacks']();_0x4ed1d4['fn'][_0x6050('0x74')]=function(_0x3f91d5,_0x3fe7eb){var _0x4c1c28=_0x4ed1d4(this);'undefined'!==typeof _0x3fe7eb||_0x6050('0x2c')!==typeof _0x3f91d5||_0x3f91d5 instanceof _0x4ed1d4||(_0x3fe7eb=_0x3f91d5,_0x3f91d5=void 0x0);_0x908fde=_0x4ed1d4[_0x6050('0x15')]({},_0x5a2b0d,_0x3fe7eb);var _0x356b66;_0x29ccea[_0x6050('0x33')](function(){_0x4c1c28[_0x6050('0x7d')](_0x6050('0xaa'))[_0x6050('0x8')]||_0x4c1c28[_0x6050('0xab')]('<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>');_0x356b66=new _0x4ed1d4[(_0x6050('0x74'))](_0x4c1c28,_0x3f91d5);});_0x29ccea[_0x6050('0x6a')]();_0x4ed1d4(window)['on']('QuatroDigital.qd_bb_prod_add',function(_0x3bb484,_0x38a6d0,_0x5bfe0a){_0x356b66['prodAdd'](_0x38a6d0,_0x5bfe0a);});return _0x4ed1d4['extend'](_0x4c1c28,_0x356b66);};var _0x5d4294=0x0;_0x4ed1d4(document)[_0x6050('0xac')](function(_0x591fae,_0x357895,_0x57db64){-0x1<_0x57db64['url'][_0x6050('0x30')]()[_0x6050('0x98')](_0x6050('0xad'))&&(_0x5d4294=(_0x57db64[_0x6050('0x19')][_0x6050('0x9f')](/sku\=([0-9]+)/i)||[''])[_0x6050('0xae')]());});_0x4ed1d4(window)['bind'](_0x6050('0xaf'),function(){_0x4ed1d4(window)[_0x6050('0x62')](_0x6050('0xb0'),[new _0x4ed1d4(),_0x5d4294]);});_0x4ed1d4(document)[_0x6050('0xb1')](function(){_0x29ccea['fire']();});}catch(_0x3b91a8){'undefined'!==typeof console&&_0x6050('0xa')===typeof console[_0x6050('0x14')]&&console[_0x6050('0x14')](_0x6050('0xb2'),_0x3b91a8);}}(this));function qd_number_format(_0x5792a0,_0x2761ef,_0x2611f0,_0x3af0d2){_0x5792a0=(_0x5792a0+'')[_0x6050('0x2')](/[^0-9+\-Ee.]/g,'');_0x5792a0=isFinite(+_0x5792a0)?+_0x5792a0:0x0;_0x2761ef=isFinite(+_0x2761ef)?Math['abs'](_0x2761ef):0x0;_0x3af0d2=_0x6050('0x3')===typeof _0x3af0d2?',':_0x3af0d2;_0x2611f0=_0x6050('0x3')===typeof _0x2611f0?'.':_0x2611f0;var _0x3089fe='',_0x3089fe=function(_0x51452e,_0x4bc7fe){var _0x281e40=Math['pow'](0xa,_0x4bc7fe);return''+(Math[_0x6050('0x5')](_0x51452e*_0x281e40)/_0x281e40)['toFixed'](_0x4bc7fe);},_0x3089fe=(_0x2761ef?_0x3089fe(_0x5792a0,_0x2761ef):''+Math[_0x6050('0x5')](_0x5792a0))[_0x6050('0x7')]('.');0x3<_0x3089fe[0x0][_0x6050('0x8')]&&(_0x3089fe[0x0]=_0x3089fe[0x0][_0x6050('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x3af0d2));(_0x3089fe[0x1]||'')[_0x6050('0x8')]<_0x2761ef&&(_0x3089fe[0x1]=_0x3089fe[0x1]||'',_0x3089fe[0x1]+=Array(_0x2761ef-_0x3089fe[0x1][_0x6050('0x8')]+0x1)[_0x6050('0x9')]('0'));return _0x3089fe['join'](_0x2611f0);}(function(){try{window['_QuatroDigital_CartData']=window[_0x6050('0x3b')]||{},window[_0x6050('0x3b')]['callback']=window['_QuatroDigital_CartData'][_0x6050('0x46')]||$[_0x6050('0x69')]();}catch(_0x544f5b){'undefined'!==typeof console&&_0x6050('0xa')===typeof console[_0x6050('0x14')]&&console['error'](_0x6050('0xb2'),_0x544f5b[_0x6050('0xb3')]);}}());(function(_0x2dd9b5){try{var _0x240a75=jQuery,_0x11fddc=function(_0x51c98a,_0x167544){if(_0x6050('0x2c')===typeof console&&_0x6050('0x3')!==typeof console[_0x6050('0x14')]&&_0x6050('0x3')!==typeof console[_0x6050('0x2f')]&&_0x6050('0x3')!==typeof console[_0x6050('0x2d')]){var _0x26c0b2;_0x6050('0x2c')===typeof _0x51c98a?(_0x51c98a[_0x6050('0x6b')](_0x6050('0xb4')),_0x26c0b2=_0x51c98a):_0x26c0b2=[_0x6050('0xb4')+_0x51c98a];if(_0x6050('0x3')===typeof _0x167544||'alerta'!==_0x167544['toLowerCase']()&&_0x6050('0xb5')!==_0x167544['toLowerCase']())if(_0x6050('0x3')!==typeof _0x167544&&_0x6050('0x2f')===_0x167544[_0x6050('0x30')]())try{console[_0x6050('0x2f')]['apply'](console,_0x26c0b2);}catch(_0x30800c){try{console[_0x6050('0x2f')](_0x26c0b2[_0x6050('0x9')]('\x0a'));}catch(_0x13a1c7){}}else try{console[_0x6050('0x14')][_0x6050('0x6d')](console,_0x26c0b2);}catch(_0x4eb95e){try{console['error'](_0x26c0b2[_0x6050('0x9')]('\x0a'));}catch(_0x1f387b){}}else try{console[_0x6050('0x2d')][_0x6050('0x6d')](console,_0x26c0b2);}catch(_0x1a2c05){try{console[_0x6050('0x2d')](_0x26c0b2[_0x6050('0x9')]('\x0a'));}catch(_0x80f579){}}}};window[_0x6050('0x5b')]=window[_0x6050('0x5b')]||{};window[_0x6050('0x5b')]['allowUpdate']=!0x0;_0x240a75['QD_dropDownCart']=function(){};_0x240a75['fn'][_0x6050('0xb6')]=function(){return{'fn':new _0x240a75()};};var _0x29f72d=function(_0x397e8c){var _0x4677d6={'y':_0x6050('0xb7')};return function(_0x3fb7cf){var _0xb0a71b=function(_0x26d74e){return _0x26d74e;};var _0xa134c0=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3fb7cf=_0x3fb7cf['d'+_0xa134c0[0x10]+'c'+_0xa134c0[0x11]+'m'+_0xb0a71b(_0xa134c0[0x1])+'n'+_0xa134c0[0xd]]['l'+_0xa134c0[0x12]+'c'+_0xa134c0[0x0]+'ti'+_0xb0a71b('o')+'n'];var _0x26b66d=function(_0x3c1ff7){return escape(encodeURIComponent(_0x3c1ff7['replace'](/\./g,'¨')[_0x6050('0x2')](/[a-zA-Z]/g,function(_0x3a60c0){return String[_0x6050('0xb8')](('Z'>=_0x3a60c0?0x5a:0x7a)>=(_0x3a60c0=_0x3a60c0[_0x6050('0xb9')](0x0)+0xd)?_0x3a60c0:_0x3a60c0-0x1a);})));};var _0x2dd9b5=_0x26b66d(_0x3fb7cf[[_0xa134c0[0x9],_0xb0a71b('o'),_0xa134c0[0xc],_0xa134c0[_0xb0a71b(0xd)]][_0x6050('0x9')]('')]);_0x26b66d=_0x26b66d((window[['js',_0xb0a71b('no'),'m',_0xa134c0[0x1],_0xa134c0[0x4][_0x6050('0xba')](),'ite'][_0x6050('0x9')]('')]||_0x6050('0x89'))+['.v',_0xa134c0[0xd],'e',_0xb0a71b('x'),'co',_0xb0a71b('mm'),_0x6050('0xbb'),_0xa134c0[0x1],'.c',_0xb0a71b('o'),'m.',_0xa134c0[0x13],'r'][_0x6050('0x9')](''));for(var _0x3f198d in _0x4677d6){if(_0x26b66d===_0x3f198d+_0x4677d6[_0x3f198d]||_0x2dd9b5===_0x3f198d+_0x4677d6[_0x3f198d]){var _0x492164='tr'+_0xa134c0[0x11]+'e';break;}_0x492164='f'+_0xa134c0[0x0]+'ls'+_0xb0a71b(_0xa134c0[0x1])+'';}_0xb0a71b=!0x1;-0x1<_0x3fb7cf[[_0xa134c0[0xc],'e',_0xa134c0[0x0],'rc',_0xa134c0[0x9]]['join']('')][_0x6050('0x98')](_0x6050('0xbc'))&&(_0xb0a71b=!0x0);return[_0x492164,_0xb0a71b];}(_0x397e8c);}(window);if(!eval(_0x29f72d[0x0]))return _0x29f72d[0x1]?_0x11fddc(_0x6050('0xbd')):!0x1;_0x240a75[_0x6050('0xb6')]=function(_0x5a9d76,_0x360473){var _0x254247=_0x240a75(_0x5a9d76);if(!_0x254247[_0x6050('0x8')])return _0x254247;var _0x3fdad7=_0x240a75[_0x6050('0x15')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':_0x6050('0xbe'),'cartTotal':_0x6050('0xbf'),'emptyCart':_0x6050('0xc0'),'continueShopping':_0x6050('0xc1'),'shippingForm':_0x6050('0xc2')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x4ad128){return _0x4ad128['skuName']||_0x4ad128[_0x6050('0xc3')];},'callback':function(){},'callbackProductsList':function(){}},_0x360473);_0x240a75('');var _0x30ce82=this;if(_0x3fdad7[_0x6050('0x5a')]){var _0x4434cd=!0x1;_0x6050('0x3')===typeof window[_0x6050('0x67')]&&(_0x11fddc('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN'),_0x240a75['ajax']({'url':_0x6050('0xc4'),'async':!0x1,'dataType':_0x6050('0xc5'),'error':function(){_0x11fddc('Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.');_0x4434cd=!0x0;}}));if(_0x4434cd)return _0x11fddc(_0x6050('0xc6'));}if(_0x6050('0x2c')===typeof window[_0x6050('0x67')]&&_0x6050('0x3')!==typeof window[_0x6050('0x67')][_0x6050('0x27')])var _0x5b38f4=window[_0x6050('0x67')][_0x6050('0x27')];else if('object'===typeof vtex&&_0x6050('0x2c')===typeof vtex[_0x6050('0x27')]&&_0x6050('0x3')!==typeof vtex[_0x6050('0x27')][_0x6050('0x5c')])_0x5b38f4=new vtex[(_0x6050('0x27'))][(_0x6050('0x5c'))]();else return _0x11fddc(_0x6050('0x5d'));_0x30ce82[_0x6050('0xc7')]=_0x6050('0xc8');var _0x14fc1c=function(_0x2a8de6){_0x240a75(this)[_0x6050('0x7e')](_0x2a8de6);_0x2a8de6[_0x6050('0x55')](_0x6050('0xc9'))[_0x6050('0x33')](_0x240a75('.qd_ddc_lightBoxOverlay'))['on'](_0x6050('0xca'),function(){_0x254247[_0x6050('0x4e')](_0x6050('0xcb'));_0x240a75(document[_0x6050('0x6f')])[_0x6050('0x4e')](_0x6050('0x87'));});_0x240a75(document)['off']('keyup.qd_ddc_closeFn')['on'](_0x6050('0xcc'),function(_0x54ff8b){0x1b==_0x54ff8b[_0x6050('0xcd')]&&(_0x254247[_0x6050('0x4e')]('qd-bb-lightBoxProdAdd'),_0x240a75(document[_0x6050('0x6f')])['removeClass'](_0x6050('0x87')));});var _0x3acadc=_0x2a8de6['find']('.qd-ddc-prodWrapper');_0x2a8de6[_0x6050('0x55')](_0x6050('0xce'))['on'](_0x6050('0xcf'),function(){_0x30ce82[_0x6050('0xd0')]('-',void 0x0,void 0x0,_0x3acadc);return!0x1;});_0x2a8de6[_0x6050('0x55')]('.qd-ddc-scrollDown')['on'](_0x6050('0xd1'),function(){_0x30ce82['scrollCart'](void 0x0,void 0x0,void 0x0,_0x3acadc);return!0x1;});_0x2a8de6['find'](_0x6050('0xd2'))[_0x6050('0xd3')]('')['on']('keyup.qd_ddc_cep',function(){_0x30ce82['shippingCalculate'](_0x240a75(this));});if(_0x3fdad7[_0x6050('0xd4')]){var _0x360473=0x0;_0x240a75(this)['on'](_0x6050('0xd5'),function(){var _0x2a8de6=function(){window[_0x6050('0x5b')][_0x6050('0x90')]&&(_0x30ce82['getCartInfoByUrl'](),window[_0x6050('0x5b')][_0x6050('0x90')]=!0x1,_0x240a75['fn']['simpleCart'](!0x0),_0x30ce82['cartIsEmpty']());};_0x360473=setInterval(function(){_0x2a8de6();},0x258);_0x2a8de6();});_0x240a75(this)['on'](_0x6050('0xd6'),function(){clearInterval(_0x360473);});}};var _0x4f3867=function(_0x187246){_0x187246=_0x240a75(_0x187246);_0x3fdad7['texts'][_0x6050('0x56')]=_0x3fdad7[_0x6050('0xd7')]['cartTotal'][_0x6050('0x2')](_0x6050('0xd8'),_0x6050('0xd9'));_0x3fdad7[_0x6050('0xd7')][_0x6050('0x56')]=_0x3fdad7['texts'][_0x6050('0x56')][_0x6050('0x2')](_0x6050('0xda'),_0x6050('0xdb'));_0x3fdad7[_0x6050('0xd7')][_0x6050('0x56')]=_0x3fdad7[_0x6050('0xd7')][_0x6050('0x56')][_0x6050('0x2')]('#shipping',_0x6050('0xdc'));_0x3fdad7[_0x6050('0xd7')][_0x6050('0x56')]=_0x3fdad7[_0x6050('0xd7')][_0x6050('0x56')][_0x6050('0x2')](_0x6050('0xdd'),'<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0x187246['find']('.qd-ddc-viewCart')['html'](_0x3fdad7[_0x6050('0xd7')][_0x6050('0xde')]);_0x187246[_0x6050('0x55')]('.qd_ddc_continueShopping')['html'](_0x3fdad7[_0x6050('0xd7')]['continueShopping']);_0x187246[_0x6050('0x55')](_0x6050('0xdf'))[_0x6050('0x52')](_0x3fdad7[_0x6050('0xd7')]['linkCheckout']);_0x187246[_0x6050('0x55')]('.qd-ddc-infoTotal')['html'](_0x3fdad7['texts'][_0x6050('0x56')]);_0x187246[_0x6050('0x55')](_0x6050('0xe0'))[_0x6050('0x52')](_0x3fdad7['texts']['shippingForm']);_0x187246['find'](_0x6050('0xe1'))[_0x6050('0x52')](_0x3fdad7[_0x6050('0xd7')]['emptyCart']);return _0x187246;}(this[_0x6050('0xc7')]);var _0x286a39=0x0;_0x254247[_0x6050('0x39')](function(){0x0<_0x286a39?_0x14fc1c['call'](this,_0x4f3867[_0x6050('0xe2')]()):_0x14fc1c['call'](this,_0x4f3867);_0x286a39++;});window[_0x6050('0x3b')][_0x6050('0x46')][_0x6050('0x33')](function(){_0x240a75(_0x6050('0xe3'))[_0x6050('0x52')](window['_QuatroDigital_CartData'][_0x6050('0x3f')]||'--');_0x240a75(_0x6050('0xe4'))[_0x6050('0x52')](window[_0x6050('0x3b')]['qtt']||'0');_0x240a75('.qd-ddc-infoTotalShipping')[_0x6050('0x52')](window[_0x6050('0x3b')][_0x6050('0xe5')]||'--');_0x240a75('.qd-ddc-infoAllTotal')[_0x6050('0x52')](window[_0x6050('0x3b')][_0x6050('0x41')]||'--');});var _0x274ae3=function(_0x309f63,_0x400cfc){if(_0x6050('0x3')===typeof _0x309f63[_0x6050('0x44')])return _0x11fddc('Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição');_0x30ce82['renderProductsList'][_0x6050('0x29')](this,_0x400cfc);};_0x30ce82[_0x6050('0x8d')]=function(_0x59f3e1,_0x462855){_0x6050('0x3')!=typeof _0x462855?window[_0x6050('0x5b')][_0x6050('0xe6')]=_0x462855:window[_0x6050('0x5b')]['dataOptionsCache']&&(_0x462855=window['_QuatroDigital_DropDown']['dataOptionsCache']);setTimeout(function(){window[_0x6050('0x5b')][_0x6050('0xe6')]=void 0x0;},_0x3fdad7['timeRemoveNewItemClass']);_0x240a75(_0x6050('0xe7'))['removeClass'](_0x6050('0xe8'));if(_0x3fdad7['smartCheckout']){var _0x360473=function(_0x2e0cea){window[_0x6050('0x5b')]['getOrderForm']=_0x2e0cea;_0x274ae3(_0x2e0cea,_0x462855);_0x6050('0x3')!==typeof window[_0x6050('0xe9')]&&_0x6050('0xa')===typeof window[_0x6050('0xe9')][_0x6050('0xea')]&&window['_QuatroDigital_AmountProduct'][_0x6050('0xea')][_0x6050('0x29')](this);_0x240a75('.qd-ddc-wrapper')[_0x6050('0x4d')]('qd-ddc-prodLoaded');};_0x6050('0x3')!==typeof window[_0x6050('0x5b')][_0x6050('0x28')]?(_0x360473(window[_0x6050('0x5b')]['getOrderForm']),'function'===typeof _0x59f3e1&&_0x59f3e1(window[_0x6050('0x5b')][_0x6050('0x28')])):_0x240a75[_0x6050('0x5e')]([_0x6050('0x44'),_0x6050('0x3c'),_0x6050('0x5f')],{'done':function(_0x107876){_0x360473[_0x6050('0x29')](this,_0x107876);_0x6050('0xa')===typeof _0x59f3e1&&_0x59f3e1(_0x107876);},'fail':function(_0x47bf82){_0x11fddc([_0x6050('0xeb'),_0x47bf82]);}});}else alert(_0x6050('0xec'));};_0x30ce82[_0x6050('0xed')]=function(){var _0x1f2030=_0x240a75('.qd-ddc-wrapper');_0x1f2030[_0x6050('0x55')](_0x6050('0xee'))[_0x6050('0x8')]?_0x1f2030[_0x6050('0x4e')](_0x6050('0xef')):_0x1f2030['addClass'](_0x6050('0xef'));};_0x30ce82[_0x6050('0xf0')]=function(_0x27a82b){var _0x360473=_0x240a75('.qd-ddc-prodWrapper2');_0x360473[_0x6050('0xf1')]();_0x360473[_0x6050('0x39')](function(){var _0x360473=_0x240a75(this),_0x5a9d76,_0x1a81aa,_0x12172f=_0x240a75(''),_0x23c93d;for(_0x23c93d in window[_0x6050('0x5b')][_0x6050('0x28')][_0x6050('0x44')])if('object'===typeof window[_0x6050('0x5b')][_0x6050('0x28')][_0x6050('0x44')][_0x23c93d]){var _0x5280d7=window[_0x6050('0x5b')]['getOrderForm']['items'][_0x23c93d];var _0x3edef3=_0x5280d7[_0x6050('0xf2')]['replace'](/^\/|\/$/g,'')[_0x6050('0x7')]('/');var _0xe6817f=_0x240a75('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0xe6817f['attr']({'data-sku':_0x5280d7['id'],'data-sku-index':_0x23c93d,'data-qd-departament':_0x3edef3[0x0],'data-qd-category':_0x3edef3[_0x3edef3['length']-0x1]});_0xe6817f[_0x6050('0x4d')](_0x6050('0xf3')+_0x5280d7[_0x6050('0xf4')]);_0xe6817f[_0x6050('0x55')]('.qd-ddc-prodName')[_0x6050('0x7e')](_0x3fdad7['skuName'](_0x5280d7));_0xe6817f['find'](_0x6050('0xf5'))[_0x6050('0x7e')](isNaN(_0x5280d7[_0x6050('0xf6')])?_0x5280d7['sellingPrice']:0x0==_0x5280d7[_0x6050('0xf6')]?'Grátis':(_0x240a75(_0x6050('0xf7'))['attr']('content')||'R$')+'\x20'+qd_number_format(_0x5280d7[_0x6050('0xf6')]/0x64,0x2,',','.'));_0xe6817f['find'](_0x6050('0xf8'))['attr']({'data-sku':_0x5280d7['id'],'data-sku-index':_0x23c93d})['val'](_0x5280d7[_0x6050('0x45')]);_0xe6817f[_0x6050('0x55')]('.qd-ddc-remove')[_0x6050('0x37')]({'data-sku':_0x5280d7['id'],'data-sku-index':_0x23c93d});_0x30ce82[_0x6050('0xf9')](_0x5280d7['id'],_0xe6817f[_0x6050('0x55')](_0x6050('0xfa')),_0x5280d7[_0x6050('0xfb')]);_0xe6817f[_0x6050('0x55')](_0x6050('0xfc'))[_0x6050('0x37')]({'data-sku':_0x5280d7['id'],'data-sku-index':_0x23c93d});_0xe6817f[_0x6050('0xfd')](_0x360473);_0x12172f=_0x12172f[_0x6050('0x33')](_0xe6817f);}try{var _0x3f532c=_0x360473[_0x6050('0x0')](_0x6050('0xe7'))['find'](_0x6050('0xd2'));_0x3f532c[_0x6050('0x8')]&&''==_0x3f532c[_0x6050('0xd3')]()&&window['_QuatroDigital_DropDown'][_0x6050('0x28')][_0x6050('0x5f')]['address']&&_0x3f532c[_0x6050('0xd3')](window[_0x6050('0x5b')]['getOrderForm']['shippingData']['address'][_0x6050('0xfe')]);}catch(_0x10ae8f){_0x11fddc(_0x6050('0xff')+_0x10ae8f[_0x6050('0xb3')],_0x6050('0xb5'));}_0x30ce82[_0x6050('0x100')](_0x360473);_0x30ce82[_0x6050('0xed')]();_0x27a82b&&_0x27a82b['lastSku']&&function(){_0x1a81aa=_0x12172f[_0x6050('0x4b')]('[data-sku=\x27'+_0x27a82b[_0x6050('0x101')]+'\x27]');_0x1a81aa[_0x6050('0x8')]&&(_0x5a9d76=0x0,_0x12172f[_0x6050('0x39')](function(){var _0x27a82b=_0x240a75(this);if(_0x27a82b['is'](_0x1a81aa))return!0x1;_0x5a9d76+=_0x27a82b[_0x6050('0x102')]();}),_0x30ce82[_0x6050('0xd0')](void 0x0,void 0x0,_0x5a9d76,_0x360473[_0x6050('0x33')](_0x360473['parent']())),_0x12172f[_0x6050('0x4e')](_0x6050('0x103')),function(_0x5452e1){_0x5452e1[_0x6050('0x4d')](_0x6050('0x104'));_0x5452e1['addClass'](_0x6050('0x103'));setTimeout(function(){_0x5452e1[_0x6050('0x4e')](_0x6050('0x104'));},_0x3fdad7[_0x6050('0x8c')]);}(_0x1a81aa));}();});(function(){_QuatroDigital_DropDown[_0x6050('0x28')][_0x6050('0x44')][_0x6050('0x8')]?(_0x240a75('body')[_0x6050('0x4e')](_0x6050('0x105'))['addClass']('qd-ddc-cart-rendered\x20qd-ddc-product-add-time'),setTimeout(function(){_0x240a75('body')['removeClass'](_0x6050('0x106'));},_0x3fdad7[_0x6050('0x8c')])):_0x240a75(_0x6050('0x6f'))[_0x6050('0x4e')]('qd-ddc-cart-rendered')[_0x6050('0x4d')](_0x6050('0x105'));}());_0x6050('0xa')===typeof _0x3fdad7['callbackProductsList']?_0x3fdad7[_0x6050('0x107')][_0x6050('0x29')](this):_0x11fddc(_0x6050('0x108'));};_0x30ce82[_0x6050('0xf9')]=function(_0xcdf6e9,_0x1640e5,_0xe4872d){function _0x11df43(){_0x1640e5[_0x6050('0x4e')](_0x6050('0x109'))['load'](function(){_0x240a75(this)[_0x6050('0x4d')](_0x6050('0x109'));})['attr'](_0x6050('0x10a'),_0xe4872d);}_0xe4872d?_0x11df43():isNaN(_0xcdf6e9)?_0x11fddc('Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU',_0x6050('0x50')):alert('Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.');};_0x30ce82[_0x6050('0x100')]=function(_0xa0363e){var _0x12bad6=function(_0x10022a,_0x4e52c){var _0x360473=_0x240a75(_0x10022a);var _0x309a8f=_0x360473[_0x6050('0x37')](_0x6050('0x10b'));var _0x5a9d76=_0x360473[_0x6050('0x37')](_0x6050('0x10c'));if(_0x309a8f){var _0x1d0980=parseInt(_0x360473[_0x6050('0xd3')]())||0x1;_0x30ce82[_0x6050('0x10d')]([_0x309a8f,_0x5a9d76],_0x1d0980,_0x1d0980+0x1,function(_0x92b211){_0x360473[_0x6050('0xd3')](_0x92b211);_0x6050('0xa')===typeof _0x4e52c&&_0x4e52c();});}};var _0x360473=function(_0x567914,_0x2ac714){var _0x360473=_0x240a75(_0x567914);var _0x34949f=_0x360473[_0x6050('0x37')](_0x6050('0x10b'));var _0x5a9d76=_0x360473[_0x6050('0x37')]('data-sku-index');if(_0x34949f){var _0x4832cd=parseInt(_0x360473[_0x6050('0xd3')]())||0x2;_0x30ce82[_0x6050('0x10d')]([_0x34949f,_0x5a9d76],_0x4832cd,_0x4832cd-0x1,function(_0x309349){_0x360473[_0x6050('0xd3')](_0x309349);'function'===typeof _0x2ac714&&_0x2ac714();});}};var _0x24b326=function(_0x2eafd9,_0x30acad){var _0x360473=_0x240a75(_0x2eafd9);var _0x4fd6ca=_0x360473[_0x6050('0x37')](_0x6050('0x10b'));var _0x5a9d76=_0x360473[_0x6050('0x37')](_0x6050('0x10c'));if(_0x4fd6ca){var _0x16a4f8=parseInt(_0x360473['val']())||0x1;_0x30ce82['changeQantity']([_0x4fd6ca,_0x5a9d76],0x1,_0x16a4f8,function(_0xb0b8b1){_0x360473[_0x6050('0xd3')](_0xb0b8b1);'function'===typeof _0x30acad&&_0x30acad();});}};var _0x5a9d76=_0xa0363e['find'](_0x6050('0x10e'));_0x5a9d76[_0x6050('0x4d')]('qd_on')['each'](function(){var _0xa0363e=_0x240a75(this);_0xa0363e[_0x6050('0x55')]('.qd-ddc-quantityMore')['on']('click.qd_ddc_more',function(_0x58873a){_0x58873a['preventDefault']();_0x5a9d76['addClass']('qd-loading');_0x12bad6(_0xa0363e[_0x6050('0x55')]('.qd-ddc-quantity'),function(){_0x5a9d76[_0x6050('0x4e')](_0x6050('0x10f'));});});_0xa0363e[_0x6050('0x55')](_0x6050('0x110'))['on'](_0x6050('0x111'),function(_0x137879){_0x137879[_0x6050('0x112')]();_0x5a9d76[_0x6050('0x4d')](_0x6050('0x10f'));_0x360473(_0xa0363e['find']('.qd-ddc-quantity'),function(){_0x5a9d76[_0x6050('0x4e')](_0x6050('0x10f'));});});_0xa0363e[_0x6050('0x55')](_0x6050('0xf8'))['on'](_0x6050('0x113'),function(){_0x5a9d76['addClass'](_0x6050('0x10f'));_0x24b326(this,function(){_0x5a9d76[_0x6050('0x4e')](_0x6050('0x10f'));});});_0xa0363e['find'](_0x6050('0xf8'))['on']('keyup.qd_ddc_change',function(_0x40faf5){0xd==_0x40faf5[_0x6050('0xcd')]&&(_0x5a9d76[_0x6050('0x4d')]('qd-loading'),_0x24b326(this,function(){_0x5a9d76[_0x6050('0x4e')]('qd-loading');}));});});_0xa0363e[_0x6050('0x55')](_0x6050('0xee'))['each'](function(){var _0xa0363e=_0x240a75(this);_0xa0363e['find'](_0x6050('0x114'))['on'](_0x6050('0x115'),function(){_0xa0363e[_0x6050('0x4d')](_0x6050('0x10f'));_0x30ce82[_0x6050('0x116')](_0x240a75(this),function(_0x58612e){_0x58612e?_0xa0363e[_0x6050('0x117')](!0x0)[_0x6050('0x118')](function(){_0xa0363e[_0x6050('0x119')]();_0x30ce82[_0x6050('0xed')]();}):_0xa0363e[_0x6050('0x4e')](_0x6050('0x10f'));});return!0x1;});});};_0x30ce82[_0x6050('0x11a')]=function(_0x89d8f3){var _0x10d797=_0x89d8f3[_0x6050('0xd3')](),_0x10d797=_0x10d797['replace'](/[^0-9\-]/g,''),_0x10d797=_0x10d797[_0x6050('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x6050('0x11b')),_0x10d797=_0x10d797[_0x6050('0x2')](/(.{9}).*/g,'$1');_0x89d8f3['val'](_0x10d797);0x9<=_0x10d797['length']&&(_0x89d8f3['data'](_0x6050('0x11c'))!=_0x10d797&&_0x5b38f4[_0x6050('0x11d')]({'postalCode':_0x10d797,'country':_0x6050('0x11e')})[_0x6050('0x1d')](function(_0x271e14){window[_0x6050('0x5b')][_0x6050('0x28')]=_0x271e14;_0x30ce82[_0x6050('0x8d')]();})[_0x6050('0x1f')](function(_0x2a5872){_0x11fddc([_0x6050('0x11f'),_0x2a5872]);updateCartData();}),_0x89d8f3[_0x6050('0x17')](_0x6050('0x11c'),_0x10d797));};_0x30ce82['changeQantity']=function(_0x376886,_0x38e4de,_0x3724e0,_0x2c3f9f){function _0x4786e2(_0x5e3ba3){_0x5e3ba3=_0x6050('0x120')!==typeof _0x5e3ba3?!0x1:_0x5e3ba3;_0x30ce82[_0x6050('0x8d')]();window['_QuatroDigital_DropDown'][_0x6050('0x90')]=!0x1;_0x30ce82[_0x6050('0xed')]();_0x6050('0x3')!==typeof window[_0x6050('0xe9')]&&_0x6050('0xa')===typeof window[_0x6050('0xe9')][_0x6050('0xea')]&&window[_0x6050('0xe9')][_0x6050('0xea')][_0x6050('0x29')](this);_0x6050('0xa')===typeof adminCart&&adminCart();_0x240a75['fn'][_0x6050('0x26')](!0x0,void 0x0,_0x5e3ba3);'function'===typeof _0x2c3f9f&&_0x2c3f9f(_0x38e4de);}_0x3724e0=_0x3724e0||0x1;if(0x1>_0x3724e0)return _0x38e4de;if(_0x3fdad7[_0x6050('0x5a')]){if('undefined'===typeof window[_0x6050('0x5b')][_0x6050('0x28')]['items'][_0x376886[0x1]])return _0x11fddc(_0x6050('0x121')+_0x376886[0x1]+']'),_0x38e4de;window['_QuatroDigital_DropDown'][_0x6050('0x28')]['items'][_0x376886[0x1]][_0x6050('0x45')]=_0x3724e0;window[_0x6050('0x5b')]['getOrderForm'][_0x6050('0x44')][_0x376886[0x1]]['index']=_0x376886[0x1];_0x5b38f4['updateItems']([window[_0x6050('0x5b')][_0x6050('0x28')]['items'][_0x376886[0x1]]],['items',_0x6050('0x3c'),_0x6050('0x5f')])[_0x6050('0x1d')](function(_0x6890f4){window[_0x6050('0x5b')][_0x6050('0x28')]=_0x6890f4;_0x4786e2(!0x0);})['fail'](function(_0x92ff35){_0x11fddc([_0x6050('0x122'),_0x92ff35]);_0x4786e2();});}else _0x11fddc('atenção\x20esta\x20método\x20esta\x20descontinuado');};_0x30ce82['removeProduct']=function(_0x5c65da,_0x46e3db){function _0x2fa298(_0x3f1f7e){_0x3f1f7e='boolean'!==typeof _0x3f1f7e?!0x1:_0x3f1f7e;'undefined'!==typeof window[_0x6050('0xe9')]&&_0x6050('0xa')===typeof window[_0x6050('0xe9')][_0x6050('0xea')]&&window['_QuatroDigital_AmountProduct'][_0x6050('0xea')][_0x6050('0x29')](this);_0x6050('0xa')===typeof adminCart&&adminCart();_0x240a75['fn'][_0x6050('0x26')](!0x0,void 0x0,_0x3f1f7e);_0x6050('0xa')===typeof _0x46e3db&&_0x46e3db(_0x5a9d76);}var _0x5a9d76=!0x1,_0x3182f0=_0x240a75(_0x5c65da)[_0x6050('0x37')](_0x6050('0x10c'));if(_0x3fdad7[_0x6050('0x5a')]){if('undefined'===typeof window[_0x6050('0x5b')][_0x6050('0x28')][_0x6050('0x44')][_0x3182f0])return _0x11fddc('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x3182f0+']'),_0x5a9d76;window[_0x6050('0x5b')]['getOrderForm'][_0x6050('0x44')][_0x3182f0][_0x6050('0x123')]=_0x3182f0;_0x5b38f4['removeItems']([window[_0x6050('0x5b')][_0x6050('0x28')][_0x6050('0x44')][_0x3182f0]],[_0x6050('0x44'),'totalizers',_0x6050('0x5f')])[_0x6050('0x1d')](function(_0x43acdc){_0x5a9d76=!0x0;window[_0x6050('0x5b')]['getOrderForm']=_0x43acdc;_0x274ae3(_0x43acdc);_0x2fa298(!0x0);})[_0x6050('0x1f')](function(_0x1c47f2){_0x11fddc(['Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho',_0x1c47f2]);_0x2fa298();});}else alert(_0x6050('0x124'));};_0x30ce82[_0x6050('0xd0')]=function(_0xb96ca,_0x29398b,_0x4e3ba8,_0x4b7e17){_0x4b7e17=_0x4b7e17||_0x240a75(_0x6050('0x125'));_0xb96ca=_0xb96ca||'+';_0x29398b=_0x29398b||0.9*_0x4b7e17[_0x6050('0x126')]();_0x4b7e17[_0x6050('0x117')](!0x0,!0x0)[_0x6050('0x127')]({'scrollTop':isNaN(_0x4e3ba8)?_0xb96ca+'='+_0x29398b+'px':_0x4e3ba8});};_0x3fdad7['updateOnlyHover']||(_0x30ce82['getCartInfoByUrl'](),_0x240a75['fn'][_0x6050('0x26')](!0x0));_0x240a75(window)['on'](_0x6050('0x128'),function(){try{window['_QuatroDigital_DropDown']['getOrderForm']=void 0x0,_0x30ce82[_0x6050('0x8d')]();}catch(_0xa04b91){_0x11fddc(_0x6050('0x129')+_0xa04b91[_0x6050('0xb3')],'avisso');}});_0x6050('0xa')===typeof _0x3fdad7['callback']?_0x3fdad7['callback'][_0x6050('0x29')](this):_0x11fddc('Callback\x20não\x20é\x20uma\x20função');};_0x240a75['fn']['QD_dropDownCart']=function(_0x4f8c0e){var _0xa4b0cc=_0x240a75(this);_0xa4b0cc['fn']=new _0x240a75['QD_dropDownCart'](this,_0x4f8c0e);return _0xa4b0cc;};}catch(_0x46a389){_0x6050('0x3')!==typeof console&&_0x6050('0xa')===typeof console[_0x6050('0x14')]&&console[_0x6050('0x14')](_0x6050('0xb2'),_0x46a389);}}(this));(function(_0x53d1e5){try{var _0x222d33=jQuery;window[_0x6050('0xe9')]=window[_0x6050('0xe9')]||{};window[_0x6050('0xe9')][_0x6050('0x44')]={};window[_0x6050('0xe9')]['allowRecalculate']=!0x1;window[_0x6050('0xe9')][_0x6050('0x12a')]=!0x1;window[_0x6050('0xe9')][_0x6050('0x12b')]=!0x1;var _0x1c0c11=function(){if(window[_0x6050('0xe9')][_0x6050('0x12c')]){var _0x30e09f=!0x1;var _0x53d1e5={};window[_0x6050('0xe9')][_0x6050('0x44')]={};for(_0x5e6f1c in window[_0x6050('0x5b')][_0x6050('0x28')][_0x6050('0x44')])if(_0x6050('0x2c')===typeof window[_0x6050('0x5b')][_0x6050('0x28')][_0x6050('0x44')][_0x5e6f1c]){var _0x176be6=window['_QuatroDigital_DropDown'][_0x6050('0x28')][_0x6050('0x44')][_0x5e6f1c];_0x6050('0x3')!==typeof _0x176be6[_0x6050('0x12d')]&&null!==_0x176be6[_0x6050('0x12d')]&&''!==_0x176be6['productId']&&(window[_0x6050('0xe9')][_0x6050('0x44')]['prod_'+_0x176be6[_0x6050('0x12d')]]=window['_QuatroDigital_AmountProduct']['items'][_0x6050('0x12e')+_0x176be6[_0x6050('0x12d')]]||{},window['_QuatroDigital_AmountProduct'][_0x6050('0x44')][_0x6050('0x12e')+_0x176be6[_0x6050('0x12d')]][_0x6050('0x12f')]=_0x176be6['productId'],_0x53d1e5['prod_'+_0x176be6[_0x6050('0x12d')]]||(window[_0x6050('0xe9')][_0x6050('0x44')][_0x6050('0x12e')+_0x176be6[_0x6050('0x12d')]]['qtt']=0x0),window[_0x6050('0xe9')]['items'][_0x6050('0x12e')+_0x176be6[_0x6050('0x12d')]][_0x6050('0x42')]+=_0x176be6['quantity'],_0x30e09f=!0x0,_0x53d1e5['prod_'+_0x176be6['productId']]=!0x0);}var _0x5e6f1c=_0x30e09f;}else _0x5e6f1c=void 0x0;window[_0x6050('0xe9')][_0x6050('0x12c')]&&(_0x222d33('.qd-bap-wrapper')[_0x6050('0x119')](),_0x222d33(_0x6050('0x130'))[_0x6050('0x4e')](_0x6050('0x131')));for(var _0x5acfef in window['_QuatroDigital_AmountProduct'][_0x6050('0x44')]){_0x176be6=window[_0x6050('0xe9')][_0x6050('0x44')][_0x5acfef];if(_0x6050('0x2c')!==typeof _0x176be6)return;_0x53d1e5=_0x222d33('input.qd-productId[value='+_0x176be6[_0x6050('0x12f')]+']')[_0x6050('0x0')]('li');if(window[_0x6050('0xe9')][_0x6050('0x12c')]||!_0x53d1e5[_0x6050('0x55')]('.qd-bap-wrapper')['length'])_0x30e09f=_0x222d33(_0x6050('0x132')),_0x30e09f[_0x6050('0x55')](_0x6050('0x133'))[_0x6050('0x52')](_0x176be6[_0x6050('0x42')]),_0x176be6=_0x53d1e5[_0x6050('0x55')](_0x6050('0x134')),_0x176be6[_0x6050('0x8')]?_0x176be6[_0x6050('0xab')](_0x30e09f)[_0x6050('0x4d')](_0x6050('0x131')):_0x53d1e5['prepend'](_0x30e09f);}_0x5e6f1c&&(window[_0x6050('0xe9')][_0x6050('0x12c')]=!0x1);};window[_0x6050('0xe9')][_0x6050('0xea')]=function(){window[_0x6050('0xe9')][_0x6050('0x12c')]=!0x0;_0x1c0c11[_0x6050('0x29')](this);};_0x222d33(document)[_0x6050('0xb1')](function(){_0x1c0c11[_0x6050('0x29')](this);});}catch(_0x552579){_0x6050('0x3')!==typeof console&&_0x6050('0xa')===typeof console[_0x6050('0x14')]&&console['error']('Oooops!\x20',_0x552579);}}(this));(function(){try{var _0x50b109=jQuery,_0x2b1abc,_0x3ff270={'selector':_0x6050('0x135'),'dropDown':{},'buyButton':{}};_0x50b109[_0x6050('0x136')]=function(_0x1ae12d){var _0x3f1fd9={};_0x2b1abc=_0x50b109['extend'](!0x0,{},_0x3ff270,_0x1ae12d);_0x1ae12d=_0x50b109(_0x2b1abc[_0x6050('0x83')])[_0x6050('0xb6')](_0x2b1abc[_0x6050('0x137')]);_0x3f1fd9[_0x6050('0x79')]=_0x6050('0x3')!==typeof _0x2b1abc[_0x6050('0x137')][_0x6050('0xd4')]&&!0x1===_0x2b1abc[_0x6050('0x137')][_0x6050('0xd4')]?_0x50b109(_0x2b1abc[_0x6050('0x83')])[_0x6050('0x74')](_0x1ae12d['fn'],_0x2b1abc[_0x6050('0x79')]):_0x50b109(_0x2b1abc[_0x6050('0x83')])['QD_buyButton'](_0x2b1abc[_0x6050('0x79')]);_0x3f1fd9[_0x6050('0x137')]=_0x1ae12d;return _0x3f1fd9;};_0x50b109['fn'][_0x6050('0x138')]=function(){'object'===typeof console&&_0x6050('0xa')===typeof console['info']&&console[_0x6050('0x2f')](_0x6050('0x139'));};_0x50b109[_0x6050('0x138')]=_0x50b109['fn'][_0x6050('0x138')];}catch(_0x3a1a93){_0x6050('0x3')!==typeof console&&'function'===typeof console[_0x6050('0x14')]&&console[_0x6050('0x14')](_0x6050('0xb2'),_0x3a1a93);}}());