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
var _0x1648=['data-qdam-value','.box-banner','insertBefore','hide','text','trim','[class*=\x27colunas\x27]','clone','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','call','trigger','QuatroDigital.am.ajaxCallback','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','children',':not(ul)','qd-am-elem-','replaceSpecialChars','>li','>ul','qd-am-dropdown-menu','qd-am-level-','add','qd-am-','-li','callback','QuatroDigital.am.callback','extend','exec','.qd_amazing_menu_auto','getParent','closest','function','/qd-amazing-menu','object','undefined','error','info','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','apply','join','warn','qdAmAddNdx','each','addClass','qd-am-li-','last','qd-am-last','QD_amazingMenu','bwntr%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','.qd_am_code','.qd-am-collection','length','parent','qd-am-banner-wrapper','qdAjax','url','html','find','attr'];(function(_0x3169cd,_0x1f076a){var _0x4b6131=function(_0x5e24e3){while(--_0x5e24e3){_0x3169cd['push'](_0x3169cd['shift']());}};_0x4b6131(++_0x1f076a);}(_0x1648,0x6b));var _0x8164=function(_0x2f5733,_0x570485){_0x2f5733=_0x2f5733-0x0;var _0x312abf=_0x1648[_0x2f5733];return _0x312abf;};(function(_0x51fbdc){_0x51fbdc['fn'][_0x8164('0x0')]=_0x51fbdc['fn'][_0x8164('0x1')];}(jQuery));(function(_0x10b0c5){var _0x20525d;var _0x3ef435=jQuery;if(_0x8164('0x2')!==typeof _0x3ef435['fn']['QD_amazingMenu']){var _0xe71edb={'url':_0x8164('0x3'),'callback':function(){},'ajaxCallback':function(){}};var _0x4eb4a6=function(_0x23d8e3,_0x2cd5f6){if(_0x8164('0x4')===typeof console&&_0x8164('0x5')!==typeof console[_0x8164('0x6')]&&_0x8164('0x5')!==typeof console[_0x8164('0x7')]&&_0x8164('0x5')!==typeof console['warn']){var _0x23a65e;_0x8164('0x4')===typeof _0x23d8e3?(_0x23d8e3[_0x8164('0x8')]('[QD\x20Amazing\x20Menu]\x0a'),_0x23a65e=_0x23d8e3):_0x23a65e=[_0x8164('0x9')+_0x23d8e3];if(_0x8164('0x5')===typeof _0x2cd5f6||_0x8164('0xa')!==_0x2cd5f6[_0x8164('0xb')]()&&_0x8164('0xc')!==_0x2cd5f6[_0x8164('0xb')]())if(_0x8164('0x5')!==typeof _0x2cd5f6&&_0x8164('0x7')===_0x2cd5f6[_0x8164('0xb')]())try{console[_0x8164('0x7')][_0x8164('0xd')](console,_0x23a65e);}catch(_0x52d8a1){try{console[_0x8164('0x7')](_0x23a65e[_0x8164('0xe')]('\x0a'));}catch(_0x5e7459){}}else try{console[_0x8164('0x6')]['apply'](console,_0x23a65e);}catch(_0x5132b6){try{console[_0x8164('0x6')](_0x23a65e[_0x8164('0xe')]('\x0a'));}catch(_0x2df25d){}}else try{console[_0x8164('0xf')][_0x8164('0xd')](console,_0x23a65e);}catch(_0x2d4e2a){try{console[_0x8164('0xf')](_0x23a65e[_0x8164('0xe')]('\x0a'));}catch(_0x522b34){}}}};_0x3ef435['fn'][_0x8164('0x10')]=function(){var _0x48bbac=_0x3ef435(this);_0x48bbac[_0x8164('0x11')](function(_0x354c14){_0x3ef435(this)[_0x8164('0x12')](_0x8164('0x13')+_0x354c14);});_0x48bbac['first']()[_0x8164('0x12')]('qd-am-first');_0x48bbac[_0x8164('0x14')]()[_0x8164('0x12')](_0x8164('0x15'));return _0x48bbac;};_0x3ef435['fn'][_0x8164('0x16')]=function(){};_0x10b0c5=function(_0x20fb46){var _0x519486={'y':_0x8164('0x17')};return function(_0x28210d){var _0x37fb11=function(_0x4cd691){return _0x4cd691;};var _0x53a6aa=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x28210d=_0x28210d['d'+_0x53a6aa[0x10]+'c'+_0x53a6aa[0x11]+'m'+_0x37fb11(_0x53a6aa[0x1])+'n'+_0x53a6aa[0xd]]['l'+_0x53a6aa[0x12]+'c'+_0x53a6aa[0x0]+'ti'+_0x37fb11('o')+'n'];var _0x4aa3fa=function(_0x3e2d4d){return escape(encodeURIComponent(_0x3e2d4d[_0x8164('0x18')](/\./g,'¨')[_0x8164('0x18')](/[a-zA-Z]/g,function(_0x446790){return String[_0x8164('0x19')](('Z'>=_0x446790?0x5a:0x7a)>=(_0x446790=_0x446790[_0x8164('0x1a')](0x0)+0xd)?_0x446790:_0x446790-0x1a);})));};var _0x57b398=_0x4aa3fa(_0x28210d[[_0x53a6aa[0x9],_0x37fb11('o'),_0x53a6aa[0xc],_0x53a6aa[_0x37fb11(0xd)]][_0x8164('0xe')]('')]);_0x4aa3fa=_0x4aa3fa((window[['js',_0x37fb11('no'),'m',_0x53a6aa[0x1],_0x53a6aa[0x4]['toUpperCase'](),_0x8164('0x1b')]['join']('')]||_0x8164('0x1c'))+['.v',_0x53a6aa[0xd],'e',_0x37fb11('x'),'co',_0x37fb11('mm'),_0x8164('0x1d'),_0x53a6aa[0x1],'.c',_0x37fb11('o'),'m.',_0x53a6aa[0x13],'r'][_0x8164('0xe')](''));for(var _0x3dd114 in _0x519486){if(_0x4aa3fa===_0x3dd114+_0x519486[_0x3dd114]||_0x57b398===_0x3dd114+_0x519486[_0x3dd114]){var _0x522aff='tr'+_0x53a6aa[0x11]+'e';break;}_0x522aff='f'+_0x53a6aa[0x0]+'ls'+_0x37fb11(_0x53a6aa[0x1])+'';}_0x37fb11=!0x1;-0x1<_0x28210d[[_0x53a6aa[0xc],'e',_0x53a6aa[0x0],'rc',_0x53a6aa[0x9]][_0x8164('0xe')]('')][_0x8164('0x1e')](_0x8164('0x1f'))&&(_0x37fb11=!0x0);return[_0x522aff,_0x37fb11];}(_0x20fb46);}(window);if(!eval(_0x10b0c5[0x0]))return _0x10b0c5[0x1]?_0x4eb4a6(_0x8164('0x20')):!0x1;var _0x4d35e4=function(_0x5f4dc1){var _0x44692d=_0x5f4dc1['find'](_0x8164('0x21'));var _0xa630f3=_0x44692d['filter']('.qd-am-banner');var _0xad611=_0x44692d['filter'](_0x8164('0x22'));if(_0xa630f3[_0x8164('0x23')]||_0xad611[_0x8164('0x23')])_0xa630f3[_0x8164('0x24')]()['addClass'](_0x8164('0x25')),_0xad611[_0x8164('0x24')]()[_0x8164('0x12')]('qd-am-collection-wrapper'),_0x3ef435[_0x8164('0x26')]({'url':_0x20525d[_0x8164('0x27')],'dataType':_0x8164('0x28'),'success':function(_0x16523e){var _0x33e6bf=_0x3ef435(_0x16523e);_0xa630f3[_0x8164('0x11')](function(){var _0x16523e=_0x3ef435(this);var _0x5700e5=_0x33e6bf[_0x8164('0x29')]('img[alt=\x27'+_0x16523e[_0x8164('0x2a')](_0x8164('0x2b'))+'\x27]');_0x5700e5['length']&&(_0x5700e5[_0x8164('0x11')](function(){_0x3ef435(this)[_0x8164('0x0')](_0x8164('0x2c'))['clone']()[_0x8164('0x2d')](_0x16523e);}),_0x16523e[_0x8164('0x2e')]());})[_0x8164('0x12')]('qd-am-content-loaded');_0xad611[_0x8164('0x11')](function(){var _0x16523e={};var _0x5a2968=_0x3ef435(this);_0x33e6bf[_0x8164('0x29')]('h2')[_0x8164('0x11')](function(){if(_0x3ef435(this)[_0x8164('0x2f')]()[_0x8164('0x30')]()[_0x8164('0xb')]()==_0x5a2968['attr']('data-qdam-value')[_0x8164('0x30')]()['toLowerCase']())return _0x16523e=_0x3ef435(this),!0x1;});_0x16523e[_0x8164('0x23')]&&(_0x16523e[_0x8164('0x11')](function(){_0x3ef435(this)[_0x8164('0x0')](_0x8164('0x31'))[_0x8164('0x32')]()[_0x8164('0x2d')](_0x5a2968);}),_0x5a2968[_0x8164('0x2e')]());})[_0x8164('0x12')]('qd-am-content-loaded');},'error':function(){_0x4eb4a6(_0x8164('0x33')+_0x20525d[_0x8164('0x27')]+_0x8164('0x34'));},'complete':function(){_0x20525d['ajaxCallback'][_0x8164('0x35')](this);_0x3ef435(window)[_0x8164('0x36')](_0x8164('0x37'),_0x5f4dc1);},'clearQueueDelay':0xbb8});};_0x3ef435[_0x8164('0x16')]=function(_0x4aa209){var _0x602646=_0x4aa209[_0x8164('0x29')]('ul[itemscope]')[_0x8164('0x11')](function(){var _0xd9fdfc=_0x3ef435(this);if(!_0xd9fdfc[_0x8164('0x23')])return _0x4eb4a6([_0x8164('0x38'),_0x4aa209],_0x8164('0xa'));_0xd9fdfc['find'](_0x8164('0x39'))[_0x8164('0x24')]()[_0x8164('0x12')](_0x8164('0x3a'));_0xd9fdfc[_0x8164('0x29')]('li')['each'](function(){var _0x692f4a=_0x3ef435(this);var _0x3cadbf=_0x692f4a[_0x8164('0x3b')](_0x8164('0x3c'));_0x3cadbf['length']&&_0x692f4a['addClass'](_0x8164('0x3d')+_0x3cadbf['first']()[_0x8164('0x2f')]()['trim']()[_0x8164('0x3e')]()[_0x8164('0x18')](/\./g,'')[_0x8164('0x18')](/\s/g,'-')['toLowerCase']());});var _0x16373d=_0xd9fdfc[_0x8164('0x29')](_0x8164('0x3f'))[_0x8164('0x10')]();_0xd9fdfc['addClass']('qd-amazing-menu');_0x16373d=_0x16373d[_0x8164('0x29')](_0x8164('0x40'));_0x16373d[_0x8164('0x11')](function(){var _0x573b11=_0x3ef435(this);_0x573b11['find'](_0x8164('0x3f'))[_0x8164('0x10')]()[_0x8164('0x12')]('qd-am-column');_0x573b11[_0x8164('0x12')](_0x8164('0x41'));_0x573b11[_0x8164('0x24')]()[_0x8164('0x12')]('qd-am-dropdown');});_0x16373d[_0x8164('0x12')]('qd-am-dropdown');var _0x5c2310=0x0,_0x10b0c5=function(_0x90cef1){_0x5c2310+=0x1;_0x90cef1=_0x90cef1[_0x8164('0x3b')]('li')[_0x8164('0x3b')]('*');_0x90cef1[_0x8164('0x23')]&&(_0x90cef1[_0x8164('0x12')](_0x8164('0x42')+_0x5c2310),_0x10b0c5(_0x90cef1));};_0x10b0c5(_0xd9fdfc);_0xd9fdfc[_0x8164('0x43')](_0xd9fdfc[_0x8164('0x29')]('ul'))[_0x8164('0x11')](function(){var _0x1fa953=_0x3ef435(this);_0x1fa953[_0x8164('0x12')](_0x8164('0x44')+_0x1fa953[_0x8164('0x3b')]('li')['length']+_0x8164('0x45'));});});_0x4d35e4(_0x602646);_0x20525d[_0x8164('0x46')]['call'](this);_0x3ef435(window)[_0x8164('0x36')](_0x8164('0x47'),_0x4aa209);};_0x3ef435['fn']['QD_amazingMenu']=function(_0x2c4b09){var _0x1d8e6a=_0x3ef435(this);if(!_0x1d8e6a[_0x8164('0x23')])return _0x1d8e6a;_0x20525d=_0x3ef435[_0x8164('0x48')]({},_0xe71edb,_0x2c4b09);_0x1d8e6a[_0x8164('0x49')]=new _0x3ef435['QD_amazingMenu'](_0x3ef435(this));return _0x1d8e6a;};_0x3ef435(function(){_0x3ef435(_0x8164('0x4a'))[_0x8164('0x16')]();});}}(this));

/*  Automatizador de comments box do Facebook Carlos Vinicius [Quatro Digital] */
/* Automatizador de comments box do Facebook // 1.6 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a=$(".fb-comments");a.length&&a.attr("data-href",document.location.href.split("#").shift().split("?").shift());$("#fb-root").length||$("body").append('<div id="fb-root"></div>');if(!$("script#facebook-jssdk").length){a=$("meta[property='fb:app_id']").attr("content")||!1;var b,c=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||(b=document.createElement("script"),b.id="facebook-jssdk",b.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+
(a?"&appId="+a:""),c.parentNode.insertBefore(b,c))}"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse()});

/* Quatro Digital Smart Cart */
var _0xb5d3=['ajaxStopOn','simpleCart','warn','[Simple\x20Cart]\x0a','info','QD_simpleCart','elements','add','.qd_cart_qtt','.qd_cart_total','.qd_items_text','meta[name=currency]','attr','each','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','Shipping','value','total','currencySymbol','allTotal','qtt','showQuantityByItems','items','quantity','fire','callback','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','hide','filter','.singular','show','.plural','addClass','qd-emptyCart','removeClass','O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','alerta','cartQttE','html','itemsTextE','$this','find','cartQtt','cartTotalE','cartTotal','itemsText','emptyElem','emptyCart','qd-sc-populated','smartCheckout','_QuatroDigital_DropDown','vtexjs','SDK','QD_checkoutQueue','shippingData','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','ajaxRequestbuyButtonAsynchronous','call','ReloadItemsCart','.qd_cart_auto','bind','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','Oooops!\x20','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','join','fail','Callbacks','done','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','apply','input.buy-in-page-quantity','javascript:','.productQuickView','success','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','location','#produto,\x20.produto','QD_buyButton','qd-bb-click-active','click.qd_bb_buy_sc','preventDefault','Método\x20descontinuado!','qd-sbb-on','.btn-add-buy-button-asynchronous','.remove-href','qd-bb-active','children','.qd-bb-productAdded','append','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','prodAdd','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','body','qd-bb-lightBoxBodyProdAdd','href','---','qd-bb-itemAddBuyButtonWrapper','qd-bb-itemAddCartWrapper','timeRemoveNewItemClass','getCartInfoByUrl','isSmartCheckout','função\x20descontinuada','buyButton','unbind','click','mouseenter.qd_bb_buy_sc','clickBuySmartCheckout','selectSkuMsg','?redirect=false&','redirect=false','redirect=true','queue','buyIfQuantityZeroed','match','push','productPageCallback','buyButtonClickCallback','pop','asyncCallback','productAddedToCart','trigger','cartProductAdded.vtex','fakeRequest','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','Callback\x20não\x20é\x20uma\x20função','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','QuatroDigital.qd_bb_prod_add','ajaxSend','indexOf','productAddedToCart.qdSbbVtex','ajaxStop','toFixed','message','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','aviso','QD_dropDownCart','bwntr%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','skuName','name','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','cartContainer','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','click.qd_ddc_closeFn','off','keyup.qd_ddc_closeFn','keyCode','qd-bb-lightBoxProdAdd','.qd-ddc-prodWrapper','click.qd_ddc_scrollUp','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','scrollCart','.qd-ddc-shipping\x20input','val','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','cartIsEmpty','texts','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','dataOptionsCache','.qd-ddc-wrapper','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','qd-ddc-noItems','renderProductsList','.qd-ddc-prodWrapper2','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','.qd-ddc-prodName','sellingPrice','content','.qd-ddc-quantity','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-empty','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','load','qd-loaded','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','.qd-ddc-prodRow','.qd-ddc-remove','click.qd_ddc_remove','removeProduct','slideUp','remove','$1-$2$3','qdDdcLastPostalCode','calculateShipping','Não\x20foi\x20possível\x20calcular\x20o\x20frete','allowUpdate','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','boolean','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','stop','animate','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','allowRecalculate','buyButtonClicked','productId','prod_','prodId','.qd-bap-wrapper','.qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','prepend','qd-bap-item-added','.qdDdcContainer','dropDown','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','closest','undefined','pow','round','split','length','replace','function','prototype','trim','capitalize','charAt','toUpperCase','toLowerCase','qdAjax','qdAjaxQueue','000','error','extend','GET','object','data','toString','url','type','jqXHR','ajax','always','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','version','4.0','getParent','checkout','getOrderForm','QuatroDigital_simpleCart'];(function(_0x25dfe3,_0x8699a8){var _0xa2ea8b=function(_0x7cbe06){while(--_0x7cbe06){_0x25dfe3['push'](_0x25dfe3['shift']());}};_0xa2ea8b(++_0x8699a8);}(_0xb5d3,0x124));var _0x3b5d=function(_0x46e523,_0xe6fccb){_0x46e523=_0x46e523-0x0;var _0x5da0ee=_0xb5d3[_0x46e523];return _0x5da0ee;};(function(_0x4e3b01){_0x4e3b01['fn']['getParent']=_0x4e3b01['fn'][_0x3b5d('0x0')];}(jQuery));function qd_number_format(_0x2b187d,_0x3d3aa7,_0x5993f5,_0x356e6c){_0x2b187d=(_0x2b187d+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x2b187d=isFinite(+_0x2b187d)?+_0x2b187d:0x0;_0x3d3aa7=isFinite(+_0x3d3aa7)?Math['abs'](_0x3d3aa7):0x0;_0x356e6c=_0x3b5d('0x1')===typeof _0x356e6c?',':_0x356e6c;_0x5993f5='undefined'===typeof _0x5993f5?'.':_0x5993f5;var _0x99eb8a='',_0x99eb8a=function(_0x25cce7,_0x3592cb){var _0x3d3aa7=Math[_0x3b5d('0x2')](0xa,_0x3592cb);return''+(Math[_0x3b5d('0x3')](_0x25cce7*_0x3d3aa7)/_0x3d3aa7)['toFixed'](_0x3592cb);},_0x99eb8a=(_0x3d3aa7?_0x99eb8a(_0x2b187d,_0x3d3aa7):''+Math['round'](_0x2b187d))[_0x3b5d('0x4')]('.');0x3<_0x99eb8a[0x0][_0x3b5d('0x5')]&&(_0x99eb8a[0x0]=_0x99eb8a[0x0][_0x3b5d('0x6')](/\B(?=(?:\d{3})+(?!\d))/g,_0x356e6c));(_0x99eb8a[0x1]||'')[_0x3b5d('0x5')]<_0x3d3aa7&&(_0x99eb8a[0x1]=_0x99eb8a[0x1]||'',_0x99eb8a[0x1]+=Array(_0x3d3aa7-_0x99eb8a[0x1]['length']+0x1)['join']('0'));return _0x99eb8a['join'](_0x5993f5);};_0x3b5d('0x7')!==typeof String[_0x3b5d('0x8')][_0x3b5d('0x9')]&&(String[_0x3b5d('0x8')][_0x3b5d('0x9')]=function(){return this[_0x3b5d('0x6')](/^\s+|\s+$/g,'');});_0x3b5d('0x7')!=typeof String['prototype'][_0x3b5d('0xa')]&&(String['prototype'][_0x3b5d('0xa')]=function(){return this[_0x3b5d('0xb')](0x0)[_0x3b5d('0xc')]()+this['slice'](0x1)[_0x3b5d('0xd')]();});(function(_0x298843){if(_0x3b5d('0x7')!==typeof _0x298843[_0x3b5d('0xe')]){var _0x2ce608={};_0x298843[_0x3b5d('0xf')]=_0x2ce608;0x96>parseInt((_0x298843['fn']['jquery'][_0x3b5d('0x6')](/[^0-9]+/g,'')+_0x3b5d('0x10'))['slice'](0x0,0x3),0xa)&&console&&_0x3b5d('0x7')==typeof console[_0x3b5d('0x11')]&&console['error']();_0x298843['qdAjax']=function(_0x2f31fb){try{var _0x296279=_0x298843[_0x3b5d('0x12')]({},{'url':'','type':_0x3b5d('0x13'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x2f31fb);var _0x4755f8=_0x3b5d('0x14')===typeof _0x296279['data']?JSON['stringify'](_0x296279['data']):_0x296279[_0x3b5d('0x15')][_0x3b5d('0x16')]();var _0x3bd61d=encodeURIComponent(_0x296279[_0x3b5d('0x17')]+'|'+_0x296279[_0x3b5d('0x18')]+'|'+_0x4755f8);_0x2ce608[_0x3bd61d]=_0x2ce608[_0x3bd61d]||{};_0x3b5d('0x1')==typeof _0x2ce608[_0x3bd61d][_0x3b5d('0x19')]?_0x2ce608[_0x3bd61d][_0x3b5d('0x19')]=_0x298843[_0x3b5d('0x1a')](_0x296279):(_0x2ce608[_0x3bd61d][_0x3b5d('0x19')]['done'](_0x296279['success']),_0x2ce608[_0x3bd61d][_0x3b5d('0x19')]['fail'](_0x296279[_0x3b5d('0x11')]),_0x2ce608[_0x3bd61d][_0x3b5d('0x19')][_0x3b5d('0x1b')](_0x296279['complete']));_0x2ce608[_0x3bd61d][_0x3b5d('0x19')][_0x3b5d('0x1b')](function(){isNaN(parseInt(_0x296279[_0x3b5d('0x1c')]))||setTimeout(function(){_0x2ce608[_0x3bd61d]['jqXHR']=void 0x0;},_0x296279[_0x3b5d('0x1c')]);});return _0x2ce608[_0x3bd61d][_0x3b5d('0x19')];}catch(_0x26de05){'undefined'!==typeof console&&_0x3b5d('0x7')===typeof console['error']&&console['error'](_0x3b5d('0x1d')+_0x26de05['message']);}};_0x298843[_0x3b5d('0xe')][_0x3b5d('0x1e')]=_0x3b5d('0x1f');}}(jQuery));(function(_0x55dc1c){_0x55dc1c['fn'][_0x3b5d('0x20')]=_0x55dc1c['fn']['closest'];}(jQuery));(function(){var _0x5172e5=jQuery;if(_0x3b5d('0x7')!==typeof _0x5172e5['fn']['simpleCart']){_0x5172e5(function(){var _0x4725f5=vtexjs[_0x3b5d('0x21')]['getOrderForm'];vtexjs[_0x3b5d('0x21')][_0x3b5d('0x22')]=function(){return _0x4725f5['call']();};});try{window[_0x3b5d('0x23')]=window['QuatroDigital_simpleCart']||{};window[_0x3b5d('0x23')][_0x3b5d('0x24')]=!0x1;_0x5172e5['fn'][_0x3b5d('0x25')]=function(_0x583466,_0x25b0ee,_0x58f577){var _0x1445b4=function(_0x5935fa,_0x1b9e1a){if(_0x3b5d('0x14')===typeof console){var _0x563233=_0x3b5d('0x14')===typeof _0x5935fa;_0x3b5d('0x1')!==typeof _0x1b9e1a&&'alerta'===_0x1b9e1a[_0x3b5d('0xd')]()?_0x563233?console[_0x3b5d('0x26')](_0x3b5d('0x27'),_0x5935fa[0x0],_0x5935fa[0x1],_0x5935fa[0x2],_0x5935fa[0x3],_0x5935fa[0x4],_0x5935fa[0x5],_0x5935fa[0x6],_0x5935fa[0x7]):console[_0x3b5d('0x26')](_0x3b5d('0x27')+_0x5935fa):_0x3b5d('0x1')!==typeof _0x1b9e1a&&_0x3b5d('0x28')===_0x1b9e1a[_0x3b5d('0xd')]()?_0x563233?console['info']('[Simple\x20Cart]\x0a',_0x5935fa[0x0],_0x5935fa[0x1],_0x5935fa[0x2],_0x5935fa[0x3],_0x5935fa[0x4],_0x5935fa[0x5],_0x5935fa[0x6],_0x5935fa[0x7]):console['info'](_0x3b5d('0x27')+_0x5935fa):_0x563233?console[_0x3b5d('0x11')](_0x3b5d('0x27'),_0x5935fa[0x0],_0x5935fa[0x1],_0x5935fa[0x2],_0x5935fa[0x3],_0x5935fa[0x4],_0x5935fa[0x5],_0x5935fa[0x6],_0x5935fa[0x7]):console['error'](_0x3b5d('0x27')+_0x5935fa);}};var _0x5a99c9=_0x5172e5(this);_0x3b5d('0x14')===typeof _0x583466?_0x25b0ee=_0x583466:(_0x583466=_0x583466||!0x1,_0x5a99c9=_0x5a99c9['add'](_0x5172e5[_0x3b5d('0x29')][_0x3b5d('0x2a')]));if(!_0x5a99c9[_0x3b5d('0x5')])return _0x5a99c9;_0x5172e5[_0x3b5d('0x29')][_0x3b5d('0x2a')]=_0x5172e5[_0x3b5d('0x29')]['elements'][_0x3b5d('0x2b')](_0x5a99c9);_0x58f577=_0x3b5d('0x1')===typeof _0x58f577?!0x1:_0x58f577;var _0x12dbcc={'cartQtt':_0x3b5d('0x2c'),'cartTotal':_0x3b5d('0x2d'),'itemsText':_0x3b5d('0x2e'),'currencySymbol':(_0x5172e5(_0x3b5d('0x2f'))[_0x3b5d('0x30')]('content')||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x207343=_0x5172e5[_0x3b5d('0x12')]({},_0x12dbcc,_0x25b0ee);var _0x5dac0e=_0x5172e5('');_0x5a99c9[_0x3b5d('0x31')](function(){var _0xc71f21=_0x5172e5(this);_0xc71f21['data'](_0x3b5d('0x32'))||_0xc71f21['data'](_0x3b5d('0x32'),_0x207343);});var _0x200b92=function(_0x4e45cf){window['_QuatroDigital_CartData']=window[_0x3b5d('0x33')]||{};for(var _0x583466=0x0,_0x2ae1dd=0x0,_0x474fa2=0x0;_0x474fa2<_0x4e45cf[_0x3b5d('0x34')]['length'];_0x474fa2++)_0x3b5d('0x35')==_0x4e45cf[_0x3b5d('0x34')][_0x474fa2]['id']&&(_0x2ae1dd+=_0x4e45cf[_0x3b5d('0x34')][_0x474fa2][_0x3b5d('0x36')]),_0x583466+=_0x4e45cf[_0x3b5d('0x34')][_0x474fa2][_0x3b5d('0x36')];window[_0x3b5d('0x33')][_0x3b5d('0x37')]=_0x207343[_0x3b5d('0x38')]+qd_number_format(_0x583466/0x64,0x2,',','.');window['_QuatroDigital_CartData']['shipping']=_0x207343['currencySymbol']+qd_number_format(_0x2ae1dd/0x64,0x2,',','.');window[_0x3b5d('0x33')][_0x3b5d('0x39')]=_0x207343['currencySymbol']+qd_number_format((_0x583466+_0x2ae1dd)/0x64,0x2,',','.');window['_QuatroDigital_CartData'][_0x3b5d('0x3a')]=0x0;if(_0x207343[_0x3b5d('0x3b')])for(_0x474fa2=0x0;_0x474fa2<_0x4e45cf['items']['length'];_0x474fa2++)window[_0x3b5d('0x33')]['qtt']+=_0x4e45cf[_0x3b5d('0x3c')][_0x474fa2][_0x3b5d('0x3d')];else window[_0x3b5d('0x33')][_0x3b5d('0x3a')]=_0x4e45cf[_0x3b5d('0x3c')][_0x3b5d('0x5')]||0x0;try{window[_0x3b5d('0x33')]['callback']&&window['_QuatroDigital_CartData']['callback'][_0x3b5d('0x3e')]&&window['_QuatroDigital_CartData'][_0x3b5d('0x3f')][_0x3b5d('0x3e')]();}catch(_0x13f393){_0x1445b4(_0x3b5d('0x40'));}_0x1c82ea(_0x5dac0e);};var _0x404751=function(_0x2a3ebd,_0x1abaf7){0x1===_0x2a3ebd?_0x1abaf7[_0x3b5d('0x41')]()[_0x3b5d('0x42')](_0x3b5d('0x43'))[_0x3b5d('0x44')]():_0x1abaf7[_0x3b5d('0x41')]()[_0x3b5d('0x42')](_0x3b5d('0x45'))['show']();};var _0x26942d=function(_0x1725b6){0x1>_0x1725b6?_0x5a99c9[_0x3b5d('0x46')](_0x3b5d('0x47')):_0x5a99c9[_0x3b5d('0x48')](_0x3b5d('0x47'));};var _0x20301a=function(_0x906fa1,_0x458d56){var _0x2116c2=parseInt(window['_QuatroDigital_CartData'][_0x3b5d('0x3a')],0xa);_0x458d56['$this']['show']();isNaN(_0x2116c2)&&(_0x1445b4(_0x3b5d('0x49'),_0x3b5d('0x4a')),_0x2116c2=0x0);_0x458d56['cartTotalE']['html'](window[_0x3b5d('0x33')][_0x3b5d('0x37')]);_0x458d56[_0x3b5d('0x4b')][_0x3b5d('0x4c')](_0x2116c2);_0x404751(_0x2116c2,_0x458d56[_0x3b5d('0x4d')]);_0x26942d(_0x2116c2);};var _0x1c82ea=function(_0x5a77a0){_0x5a99c9[_0x3b5d('0x31')](function(){var _0x510191={};var _0x1497ad=_0x5172e5(this);_0x583466&&_0x1497ad[_0x3b5d('0x15')](_0x3b5d('0x32'))&&_0x5172e5[_0x3b5d('0x12')](_0x207343,_0x1497ad[_0x3b5d('0x15')](_0x3b5d('0x32')));_0x510191[_0x3b5d('0x4e')]=_0x1497ad;_0x510191['cartQttE']=_0x1497ad[_0x3b5d('0x4f')](_0x207343[_0x3b5d('0x50')])||_0x5dac0e;_0x510191[_0x3b5d('0x51')]=_0x1497ad[_0x3b5d('0x4f')](_0x207343[_0x3b5d('0x52')])||_0x5dac0e;_0x510191[_0x3b5d('0x4d')]=_0x1497ad[_0x3b5d('0x4f')](_0x207343[_0x3b5d('0x53')])||_0x5dac0e;_0x510191[_0x3b5d('0x54')]=_0x1497ad[_0x3b5d('0x4f')](_0x207343[_0x3b5d('0x55')])||_0x5dac0e;_0x20301a(_0x5a77a0,_0x510191);_0x1497ad['addClass'](_0x3b5d('0x56'));});};(function(){if(_0x207343[_0x3b5d('0x57')]){window['_QuatroDigital_DropDown']=window[_0x3b5d('0x58')]||{};if('undefined'!==typeof window['_QuatroDigital_DropDown'][_0x3b5d('0x22')]&&(_0x58f577||!_0x583466))return _0x200b92(window[_0x3b5d('0x58')][_0x3b5d('0x22')]);if('object'!==typeof window[_0x3b5d('0x59')]||_0x3b5d('0x1')===typeof window['vtexjs'][_0x3b5d('0x21')])if(_0x3b5d('0x14')===typeof vtex&&_0x3b5d('0x14')===typeof vtex[_0x3b5d('0x21')]&&_0x3b5d('0x1')!==typeof vtex['checkout']['SDK'])new vtex[(_0x3b5d('0x21'))][(_0x3b5d('0x5a'))]();else return _0x1445b4('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x5172e5[_0x3b5d('0x5b')](['items',_0x3b5d('0x34'),_0x3b5d('0x5c')],{'done':function(_0x3e74fd){_0x200b92(_0x3e74fd);window['_QuatroDigital_DropDown'][_0x3b5d('0x22')]=_0x3e74fd;},'fail':function(_0x243006){_0x1445b4(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.',_0x243006]);}});}else alert(_0x3b5d('0x5d'));}());_0x207343[_0x3b5d('0x3f')]();_0x5172e5(window)['trigger']('simpleCartCallback.quatro_digital');return _0x5a99c9;};_0x5172e5[_0x3b5d('0x29')]={'elements':_0x5172e5('')};_0x5172e5(function(){var _0x3601a4;_0x3b5d('0x7')===typeof window[_0x3b5d('0x5e')]&&(_0x3601a4=window[_0x3b5d('0x5e')],window[_0x3b5d('0x5e')]=function(_0x3c3dde,_0x21ac7e,_0x36a8fe,_0x332ab7,_0x25dbf5){_0x3601a4[_0x3b5d('0x5f')](this,_0x3c3dde,_0x21ac7e,_0x36a8fe,_0x332ab7,function(){_0x3b5d('0x7')===typeof _0x25dbf5&&_0x25dbf5();_0x5172e5['QD_simpleCart'][_0x3b5d('0x2a')][_0x3b5d('0x31')](function(){var _0x5270c3=_0x5172e5(this);_0x5270c3[_0x3b5d('0x25')](_0x5270c3[_0x3b5d('0x15')](_0x3b5d('0x32')));});});});});var _0x494873=window[_0x3b5d('0x60')]||void 0x0;window['ReloadItemsCart']=function(_0xf199cb){_0x5172e5['fn']['simpleCart'](!0x0);_0x3b5d('0x7')===typeof _0x494873?_0x494873[_0x3b5d('0x5f')](this,_0xf199cb):alert(_0xf199cb);};_0x5172e5(function(){var _0x43f5fb=_0x5172e5(_0x3b5d('0x61'));_0x43f5fb[_0x3b5d('0x5')]&&_0x43f5fb[_0x3b5d('0x25')]();});_0x5172e5(function(){_0x5172e5(window)[_0x3b5d('0x62')](_0x3b5d('0x63'),function(){_0x5172e5['fn'][_0x3b5d('0x25')](!0x0);});});}catch(_0x4a220b){_0x3b5d('0x1')!==typeof console&&_0x3b5d('0x7')===typeof console[_0x3b5d('0x11')]&&console[_0x3b5d('0x11')](_0x3b5d('0x64'),_0x4a220b);}}}());(function(){var _0x193136=function(_0x119f03,_0x23b480){if('object'===typeof console){var _0x566c62=_0x3b5d('0x14')===typeof _0x119f03;'undefined'!==typeof _0x23b480&&_0x3b5d('0x4a')===_0x23b480['toLowerCase']()?_0x566c62?console[_0x3b5d('0x26')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x119f03[0x0],_0x119f03[0x1],_0x119f03[0x2],_0x119f03[0x3],_0x119f03[0x4],_0x119f03[0x5],_0x119f03[0x6],_0x119f03[0x7]):console[_0x3b5d('0x26')](_0x3b5d('0x65')+_0x119f03):_0x3b5d('0x1')!==typeof _0x23b480&&_0x3b5d('0x28')===_0x23b480[_0x3b5d('0xd')]()?_0x566c62?console['info'](_0x3b5d('0x65'),_0x119f03[0x0],_0x119f03[0x1],_0x119f03[0x2],_0x119f03[0x3],_0x119f03[0x4],_0x119f03[0x5],_0x119f03[0x6],_0x119f03[0x7]):console[_0x3b5d('0x28')](_0x3b5d('0x65')+_0x119f03):_0x566c62?console[_0x3b5d('0x11')](_0x3b5d('0x65'),_0x119f03[0x0],_0x119f03[0x1],_0x119f03[0x2],_0x119f03[0x3],_0x119f03[0x4],_0x119f03[0x5],_0x119f03[0x6],_0x119f03[0x7]):console['error']('[QD\x20VTEX\x20Checkout\x20Queue]\x0a'+_0x119f03);}},_0x72ad09=null,_0x50a7d1={},_0x104a6f={},_0x15e353={};$[_0x3b5d('0x5b')]=function(_0x26a832,_0x3bba25){if(null===_0x72ad09)if(_0x3b5d('0x14')===typeof window[_0x3b5d('0x59')]&&_0x3b5d('0x1')!==typeof window[_0x3b5d('0x59')][_0x3b5d('0x21')])_0x72ad09=window[_0x3b5d('0x59')]['checkout'];else return _0x193136(_0x3b5d('0x66'));var _0xdf975f=$[_0x3b5d('0x12')]({'done':function(){},'fail':function(){}},_0x3bba25),_0x2f0bef=_0x26a832[_0x3b5d('0x67')](';'),_0x3cfa2b=function(){_0x50a7d1[_0x2f0bef][_0x3b5d('0x2b')](_0xdf975f['done']);_0x104a6f[_0x2f0bef][_0x3b5d('0x2b')](_0xdf975f[_0x3b5d('0x68')]);};_0x15e353[_0x2f0bef]?_0x3cfa2b():(_0x50a7d1[_0x2f0bef]=$['Callbacks'](),_0x104a6f[_0x2f0bef]=$[_0x3b5d('0x69')](),_0x3cfa2b(),_0x15e353[_0x2f0bef]=!0x0,_0x72ad09[_0x3b5d('0x22')](_0x26a832)[_0x3b5d('0x6a')](function(_0x380fbf){_0x15e353[_0x2f0bef]=!0x1;_0x50a7d1[_0x2f0bef][_0x3b5d('0x3e')](_0x380fbf);})['fail'](function(_0xa386b0){_0x15e353[_0x2f0bef]=!0x1;_0x104a6f[_0x2f0bef]['fire'](_0xa386b0);}));};}());(function(_0x3ab87e){try{var _0x3402d8=jQuery,_0xde3b04,_0x1e5910=_0x3402d8({}),_0x5629bb=function(_0x7c5d34,_0x45fdd9){if(_0x3b5d('0x14')===typeof console&&_0x3b5d('0x1')!==typeof console[_0x3b5d('0x11')]&&_0x3b5d('0x1')!==typeof console[_0x3b5d('0x28')]&&'undefined'!==typeof console[_0x3b5d('0x26')]){var _0x1452d2;_0x3b5d('0x14')===typeof _0x7c5d34?(_0x7c5d34[_0x3b5d('0x6b')](_0x3b5d('0x6c')),_0x1452d2=_0x7c5d34):_0x1452d2=[_0x3b5d('0x6c')+_0x7c5d34];if(_0x3b5d('0x1')===typeof _0x45fdd9||'alerta'!==_0x45fdd9[_0x3b5d('0xd')]()&&'aviso'!==_0x45fdd9[_0x3b5d('0xd')]())if(_0x3b5d('0x1')!==typeof _0x45fdd9&&'info'===_0x45fdd9['toLowerCase']())try{console['info'][_0x3b5d('0x6d')](console,_0x1452d2);}catch(_0x15626e){try{console['info'](_0x1452d2['join']('\x0a'));}catch(_0x284d14){}}else try{console[_0x3b5d('0x11')][_0x3b5d('0x6d')](console,_0x1452d2);}catch(_0x3682a5){try{console[_0x3b5d('0x11')](_0x1452d2[_0x3b5d('0x67')]('\x0a'));}catch(_0x4f2707){}}else try{console[_0x3b5d('0x26')]['apply'](console,_0x1452d2);}catch(_0x4dc5d7){try{console[_0x3b5d('0x26')](_0x1452d2[_0x3b5d('0x67')]('\x0a'));}catch(_0x42786f){}}}},_0x42e177={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':'.productInformationWrapper\x20\x20a.buy-button','buyQtt':_0x3b5d('0x6e'),'selectSkuMsg':_0x3b5d('0x6f'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x5e232a,_0x3205ef,_0x25baf9){_0x3402d8('body')['is'](_0x3b5d('0x70'))&&(_0x3b5d('0x71')===_0x3205ef?alert('Produto\x20adicionado\x20ao\x20carrinho!'):(alert(_0x3b5d('0x72')),(_0x3b5d('0x14')===typeof parent?parent:document)[_0x3b5d('0x73')]['href']=_0x25baf9));},'isProductPage':function(){return _0x3402d8('body')['is'](_0x3b5d('0x74'));},'execDefaultAction':function(_0x57a183){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x3402d8[_0x3b5d('0x75')]=function(_0x1c8e41,_0x2d9abb){function _0xf617ce(_0x49de1c){_0xde3b04['isSmartCheckout']?_0x49de1c[_0x3b5d('0x15')](_0x3b5d('0x76'))||(_0x49de1c[_0x3b5d('0x15')]('qd-bb-click-active',0x1),_0x49de1c['on'](_0x3b5d('0x77'),function(_0x2090d7){if(!_0xde3b04['allowBuyClick']())return!0x0;if(!0x0!==_0x52b9e0['clickBuySmartCheckout'][_0x3b5d('0x5f')](this))return _0x2090d7[_0x3b5d('0x78')](),!0x1;})):alert(_0x3b5d('0x79'));}function _0x238928(_0x2bf87f){_0x2bf87f=_0x2bf87f||_0x3402d8(_0xde3b04['buyButton']);_0x2bf87f[_0x3b5d('0x31')](function(){var _0x2bf87f=_0x3402d8(this);_0x2bf87f['is']('.qd-sbb-on')||(_0x2bf87f[_0x3b5d('0x46')](_0x3b5d('0x7a')),_0x2bf87f['is'](_0x3b5d('0x7b'))&&!_0x2bf87f['is'](_0x3b5d('0x7c'))||_0x2bf87f[_0x3b5d('0x15')](_0x3b5d('0x7d'))||(_0x2bf87f[_0x3b5d('0x15')](_0x3b5d('0x7d'),0x1),_0x2bf87f[_0x3b5d('0x7e')](_0x3b5d('0x7f'))[_0x3b5d('0x5')]||_0x2bf87f[_0x3b5d('0x80')](_0x3b5d('0x81')),_0x2bf87f['is']('.buy-in-page-button')&&_0xde3b04[_0x3b5d('0x82')]()&&_0x5d3622[_0x3b5d('0x5f')](_0x2bf87f),_0xf617ce(_0x2bf87f)));});_0xde3b04['isProductPage']()&&!_0x2bf87f['length']&&_0x5629bb(_0x3b5d('0x83')+_0x2bf87f[_0x3b5d('0x84')]+'\x27.','info');}var _0x443588=_0x3402d8(_0x1c8e41);var _0x52b9e0=this;window[_0x3b5d('0x85')]=window[_0x3b5d('0x85')]||{};window['_QuatroDigital_CartData']=window[_0x3b5d('0x33')]||{};_0x52b9e0[_0x3b5d('0x86')]=function(_0xf01b3c,_0x4c57e1){_0x443588[_0x3b5d('0x46')](_0x3b5d('0x87'));_0x3402d8(_0x3b5d('0x88'))[_0x3b5d('0x46')](_0x3b5d('0x89'));var _0x10d21a=_0x3402d8(_0xde3b04['buyButton'])['filter']('[href=\x27'+(_0xf01b3c['attr'](_0x3b5d('0x8a'))||_0x3b5d('0x8b'))+'\x27]')[_0x3b5d('0x2b')](_0xf01b3c);_0x10d21a['addClass'](_0x3b5d('0x8c'));setTimeout(function(){_0x443588[_0x3b5d('0x48')](_0x3b5d('0x8d'));_0x10d21a['removeClass'](_0x3b5d('0x8c'));},_0xde3b04[_0x3b5d('0x8e')]);window[_0x3b5d('0x85')]['getOrderForm']=void 0x0;if(_0x3b5d('0x1')!==typeof _0x2d9abb&&_0x3b5d('0x7')===typeof _0x2d9abb[_0x3b5d('0x8f')])return _0xde3b04[_0x3b5d('0x90')]||(_0x5629bb(_0x3b5d('0x91')),_0x2d9abb[_0x3b5d('0x8f')]()),window[_0x3b5d('0x58')][_0x3b5d('0x22')]=void 0x0,_0x2d9abb[_0x3b5d('0x8f')](function(_0x4576b4){window[_0x3b5d('0x85')]['getOrderForm']=_0x4576b4;_0x3402d8['fn'][_0x3b5d('0x25')](!0x0,void 0x0,!0x0);},{'lastSku':_0x4c57e1});window['_Quatro_Digital_dropDown']['allowUpdate']=!0x0;_0x3402d8['fn']['simpleCart'](!0x0);};(function(){if(_0xde3b04[_0x3b5d('0x90')]&&_0xde3b04['autoWatchBuyButton']){var _0x569fee=_0x3402d8(_0x3b5d('0x7b'));_0x569fee[_0x3b5d('0x5')]&&_0x238928(_0x569fee);}}());var _0x5d3622=function(){var _0x141bd1=_0x3402d8(this);_0x3b5d('0x1')!==typeof _0x141bd1[_0x3b5d('0x15')](_0x3b5d('0x92'))?(_0x141bd1[_0x3b5d('0x93')](_0x3b5d('0x94')),_0xf617ce(_0x141bd1)):(_0x141bd1['bind']('mouseenter.qd_bb_buy_sc',function(_0x365063){_0x141bd1[_0x3b5d('0x93')](_0x3b5d('0x94'));_0xf617ce(_0x141bd1);_0x3402d8(this)[_0x3b5d('0x93')](_0x365063);}),_0x3402d8(window)['load'](function(){_0x141bd1['unbind'](_0x3b5d('0x94'));_0xf617ce(_0x141bd1);_0x141bd1[_0x3b5d('0x93')](_0x3b5d('0x95'));}));};_0x52b9e0[_0x3b5d('0x96')]=function(){var _0x5180be=_0x3402d8(this),_0x1c8e41=_0x5180be[_0x3b5d('0x30')](_0x3b5d('0x8a'))||'';if(-0x1<_0x1c8e41['indexOf'](_0xde3b04[_0x3b5d('0x97')]))return!0x0;_0x1c8e41=_0x1c8e41[_0x3b5d('0x6')](/redirect\=(false|true)/gi,'')[_0x3b5d('0x6')]('?',_0x3b5d('0x98'))[_0x3b5d('0x6')](/\&\&/gi,'&');if(_0xde3b04['execDefaultAction'](_0x5180be))return _0x5180be[_0x3b5d('0x30')](_0x3b5d('0x8a'),_0x1c8e41[_0x3b5d('0x6')](_0x3b5d('0x99'),_0x3b5d('0x9a'))),!0x0;_0x1c8e41=_0x1c8e41[_0x3b5d('0x6')](/http.?:/i,'');_0x1e5910[_0x3b5d('0x9b')](function(_0x430adc){if(!_0xde3b04[_0x3b5d('0x9c')]&&!/(&|\?)qty\=[1-9][0-9]*/gi['test'](_0x1c8e41))return _0x430adc();var _0x342d93=function(_0x4c0def,_0x1b5244){var _0x238928=_0x1c8e41[_0x3b5d('0x9d')](/sku\=([0-9]+)/gi),_0x439450=[];if(_0x3b5d('0x14')===typeof _0x238928&&null!==_0x238928)for(var _0xd31a5d=_0x238928[_0x3b5d('0x5')]-0x1;0x0<=_0xd31a5d;_0xd31a5d--){var _0xe92ffe=parseInt(_0x238928[_0xd31a5d][_0x3b5d('0x6')](/sku\=/gi,''));isNaN(_0xe92ffe)||_0x439450[_0x3b5d('0x9e')](_0xe92ffe);}_0xde3b04[_0x3b5d('0x9f')][_0x3b5d('0x5f')](this,_0x4c0def,_0x1b5244,_0x1c8e41);_0x52b9e0[_0x3b5d('0xa0')][_0x3b5d('0x5f')](this,_0x4c0def,_0x1b5244,_0x1c8e41,_0x439450);_0x52b9e0[_0x3b5d('0x86')](_0x5180be,_0x1c8e41[_0x3b5d('0x4')]('ku=')[_0x3b5d('0xa1')]()['split']('&')['shift']());_0x3b5d('0x7')===typeof _0xde3b04['asyncCallback']&&_0xde3b04[_0x3b5d('0xa2')]['call'](this);_0x3402d8(window)['trigger'](_0x3b5d('0xa3'));_0x3402d8(window)[_0x3b5d('0xa4')](_0x3b5d('0xa5'));};_0xde3b04[_0x3b5d('0xa6')]?(_0x342d93(null,'success'),_0x430adc()):_0x3402d8[_0x3b5d('0x1a')]({'url':_0x1c8e41,'complete':_0x342d93})[_0x3b5d('0x1b')](function(){_0x430adc();});});};_0x52b9e0[_0x3b5d('0xa0')]=function(_0x4b9a4a,_0x4f8c5b,_0x5a533d,_0x49689f){try{_0x3b5d('0x71')===_0x4f8c5b&&'object'===typeof window[_0x3b5d('0xa7')]&&_0x3b5d('0x7')===typeof window[_0x3b5d('0xa7')]['_QuatroDigital_prodBuyCallback']&&window[_0x3b5d('0xa7')][_0x3b5d('0xa8')](_0x4b9a4a,_0x4f8c5b,_0x5a533d,_0x49689f);}catch(_0x4cde31){_0x5629bb(_0x3b5d('0xa9'));}};_0x238928();_0x3b5d('0x7')===typeof _0xde3b04[_0x3b5d('0x3f')]?_0xde3b04[_0x3b5d('0x3f')]['call'](this):_0x5629bb(_0x3b5d('0xaa'));};var _0x1f15fe=_0x3402d8[_0x3b5d('0x69')]();_0x3402d8['fn'][_0x3b5d('0x75')]=function(_0x129cfb,_0x1550f6){var _0x3ab87e=_0x3402d8(this);_0x3b5d('0x1')!==typeof _0x1550f6||_0x3b5d('0x14')!==typeof _0x129cfb||_0x129cfb instanceof _0x3402d8||(_0x1550f6=_0x129cfb,_0x129cfb=void 0x0);_0xde3b04=_0x3402d8[_0x3b5d('0x12')]({},_0x42e177,_0x1550f6);var _0x20d56b;_0x1f15fe[_0x3b5d('0x2b')](function(){_0x3ab87e[_0x3b5d('0x7e')]('.qd-bb-itemAddWrapper')[_0x3b5d('0x5')]||_0x3ab87e['prepend'](_0x3b5d('0xab'));_0x20d56b=new _0x3402d8[(_0x3b5d('0x75'))](_0x3ab87e,_0x129cfb);});_0x1f15fe['fire']();_0x3402d8(window)['on'](_0x3b5d('0xac'),function(_0x173647,_0x25d3c2,_0x2086b2){_0x20d56b[_0x3b5d('0x86')](_0x25d3c2,_0x2086b2);});return _0x3402d8[_0x3b5d('0x12')](_0x3ab87e,_0x20d56b);};var _0x3217cb=0x0;_0x3402d8(document)[_0x3b5d('0xad')](function(_0x5f468c,_0x411d19,_0x1e1ce5){-0x1<_0x1e1ce5['url'][_0x3b5d('0xd')]()[_0x3b5d('0xae')]('/checkout/cart/add')&&(_0x3217cb=(_0x1e1ce5[_0x3b5d('0x17')][_0x3b5d('0x9d')](/sku\=([0-9]+)/i)||[''])[_0x3b5d('0xa1')]());});_0x3402d8(window)[_0x3b5d('0x62')](_0x3b5d('0xaf'),function(){_0x3402d8(window)[_0x3b5d('0xa4')](_0x3b5d('0xac'),[new _0x3402d8(),_0x3217cb]);});_0x3402d8(document)[_0x3b5d('0xb0')](function(){_0x1f15fe['fire']();});}catch(_0xaa4421){_0x3b5d('0x1')!==typeof console&&_0x3b5d('0x7')===typeof console['error']&&console[_0x3b5d('0x11')](_0x3b5d('0x64'),_0xaa4421);}}(this));function qd_number_format(_0x2445ba,_0x20308c,_0x4ed258,_0x2b1a73){_0x2445ba=(_0x2445ba+'')[_0x3b5d('0x6')](/[^0-9+\-Ee.]/g,'');_0x2445ba=isFinite(+_0x2445ba)?+_0x2445ba:0x0;_0x20308c=isFinite(+_0x20308c)?Math['abs'](_0x20308c):0x0;_0x2b1a73=_0x3b5d('0x1')===typeof _0x2b1a73?',':_0x2b1a73;_0x4ed258=_0x3b5d('0x1')===typeof _0x4ed258?'.':_0x4ed258;var _0xcf7ad8='',_0xcf7ad8=function(_0x459104,_0x519055){var _0x209da7=Math['pow'](0xa,_0x519055);return''+(Math['round'](_0x459104*_0x209da7)/_0x209da7)[_0x3b5d('0xb1')](_0x519055);},_0xcf7ad8=(_0x20308c?_0xcf7ad8(_0x2445ba,_0x20308c):''+Math[_0x3b5d('0x3')](_0x2445ba))[_0x3b5d('0x4')]('.');0x3<_0xcf7ad8[0x0]['length']&&(_0xcf7ad8[0x0]=_0xcf7ad8[0x0][_0x3b5d('0x6')](/\B(?=(?:\d{3})+(?!\d))/g,_0x2b1a73));(_0xcf7ad8[0x1]||'')[_0x3b5d('0x5')]<_0x20308c&&(_0xcf7ad8[0x1]=_0xcf7ad8[0x1]||'',_0xcf7ad8[0x1]+=Array(_0x20308c-_0xcf7ad8[0x1]['length']+0x1)['join']('0'));return _0xcf7ad8[_0x3b5d('0x67')](_0x4ed258);}(function(){try{window[_0x3b5d('0x33')]=window[_0x3b5d('0x33')]||{},window[_0x3b5d('0x33')][_0x3b5d('0x3f')]=window[_0x3b5d('0x33')][_0x3b5d('0x3f')]||$[_0x3b5d('0x69')]();}catch(_0x1312b9){_0x3b5d('0x1')!==typeof console&&_0x3b5d('0x7')===typeof console['error']&&console[_0x3b5d('0x11')](_0x3b5d('0x64'),_0x1312b9[_0x3b5d('0xb2')]);}}());(function(_0x411fe8){try{var _0x22a368=jQuery,_0x3d8d6f=function(_0x4775d7,_0x50662c){if('object'===typeof console&&'undefined'!==typeof console[_0x3b5d('0x11')]&&_0x3b5d('0x1')!==typeof console[_0x3b5d('0x28')]&&_0x3b5d('0x1')!==typeof console[_0x3b5d('0x26')]){var _0x201f23;_0x3b5d('0x14')===typeof _0x4775d7?(_0x4775d7[_0x3b5d('0x6b')](_0x3b5d('0xb3')),_0x201f23=_0x4775d7):_0x201f23=['[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'+_0x4775d7];if(_0x3b5d('0x1')===typeof _0x50662c||_0x3b5d('0x4a')!==_0x50662c['toLowerCase']()&&_0x3b5d('0xb4')!==_0x50662c[_0x3b5d('0xd')]())if(_0x3b5d('0x1')!==typeof _0x50662c&&'info'===_0x50662c[_0x3b5d('0xd')]())try{console[_0x3b5d('0x28')][_0x3b5d('0x6d')](console,_0x201f23);}catch(_0x2682bb){try{console['info'](_0x201f23[_0x3b5d('0x67')]('\x0a'));}catch(_0xb429f0){}}else try{console[_0x3b5d('0x11')][_0x3b5d('0x6d')](console,_0x201f23);}catch(_0x354a5d){try{console[_0x3b5d('0x11')](_0x201f23['join']('\x0a'));}catch(_0x1955dd){}}else try{console['warn'][_0x3b5d('0x6d')](console,_0x201f23);}catch(_0x5cbac6){try{console[_0x3b5d('0x26')](_0x201f23['join']('\x0a'));}catch(_0x21ee43){}}}};window[_0x3b5d('0x58')]=window[_0x3b5d('0x58')]||{};window[_0x3b5d('0x58')]['allowUpdate']=!0x0;_0x22a368[_0x3b5d('0xb5')]=function(){};_0x22a368['fn'][_0x3b5d('0xb5')]=function(){return{'fn':new _0x22a368()};};var _0x4f7fab=function(_0x30e429){var _0x49a070={'y':_0x3b5d('0xb6')};return function(_0x2b7533){var _0x32442c=function(_0x371dcb){return _0x371dcb;};var _0x568ea8=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2b7533=_0x2b7533['d'+_0x568ea8[0x10]+'c'+_0x568ea8[0x11]+'m'+_0x32442c(_0x568ea8[0x1])+'n'+_0x568ea8[0xd]]['l'+_0x568ea8[0x12]+'c'+_0x568ea8[0x0]+'ti'+_0x32442c('o')+'n'];var _0xe5b299=function(_0xa4d361){return escape(encodeURIComponent(_0xa4d361[_0x3b5d('0x6')](/\./g,'¨')[_0x3b5d('0x6')](/[a-zA-Z]/g,function(_0xfc5e51){return String[_0x3b5d('0xb7')](('Z'>=_0xfc5e51?0x5a:0x7a)>=(_0xfc5e51=_0xfc5e51[_0x3b5d('0xb8')](0x0)+0xd)?_0xfc5e51:_0xfc5e51-0x1a);})));};var _0x411fe8=_0xe5b299(_0x2b7533[[_0x568ea8[0x9],_0x32442c('o'),_0x568ea8[0xc],_0x568ea8[_0x32442c(0xd)]][_0x3b5d('0x67')]('')]);_0xe5b299=_0xe5b299((window[['js',_0x32442c('no'),'m',_0x568ea8[0x1],_0x568ea8[0x4][_0x3b5d('0xc')](),'ite'][_0x3b5d('0x67')]('')]||_0x3b5d('0x8b'))+['.v',_0x568ea8[0xd],'e',_0x32442c('x'),'co',_0x32442c('mm'),_0x3b5d('0xb9'),_0x568ea8[0x1],'.c',_0x32442c('o'),'m.',_0x568ea8[0x13],'r'][_0x3b5d('0x67')](''));for(var _0x3dcae6 in _0x49a070){if(_0xe5b299===_0x3dcae6+_0x49a070[_0x3dcae6]||_0x411fe8===_0x3dcae6+_0x49a070[_0x3dcae6]){var _0x541406='tr'+_0x568ea8[0x11]+'e';break;}_0x541406='f'+_0x568ea8[0x0]+'ls'+_0x32442c(_0x568ea8[0x1])+'';}_0x32442c=!0x1;-0x1<_0x2b7533[[_0x568ea8[0xc],'e',_0x568ea8[0x0],'rc',_0x568ea8[0x9]]['join']('')]['indexOf'](_0x3b5d('0xba'))&&(_0x32442c=!0x0);return[_0x541406,_0x32442c];}(_0x30e429);}(window);if(!eval(_0x4f7fab[0x0]))return _0x4f7fab[0x1]?_0x3d8d6f(_0x3b5d('0xbb')):!0x1;_0x22a368[_0x3b5d('0xb5')]=function(_0x5d1999,_0x163dc7){var _0x5ef8ce=_0x22a368(_0x5d1999);if(!_0x5ef8ce[_0x3b5d('0x5')])return _0x5ef8ce;var _0x1f28da=_0x22a368[_0x3b5d('0x12')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':_0x3b5d('0xbc'),'cartTotal':_0x3b5d('0xbd'),'emptyCart':_0x3b5d('0xbe'),'continueShopping':_0x3b5d('0xbf'),'shippingForm':'<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x5ce71e){return _0x5ce71e[_0x3b5d('0xc0')]||_0x5ce71e[_0x3b5d('0xc1')];},'callback':function(){},'callbackProductsList':function(){}},_0x163dc7);_0x22a368('');var _0x508854=this;if(_0x1f28da[_0x3b5d('0x57')]){var _0x23915b=!0x1;_0x3b5d('0x1')===typeof window['vtexjs']&&(_0x3d8d6f(_0x3b5d('0xc2')),_0x22a368['ajax']({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':!0x1,'dataType':_0x3b5d('0xc3'),'error':function(){_0x3d8d6f(_0x3b5d('0xc4'));_0x23915b=!0x0;}}));if(_0x23915b)return _0x3d8d6f(_0x3b5d('0xc5'));}if(_0x3b5d('0x14')===typeof window[_0x3b5d('0x59')]&&_0x3b5d('0x1')!==typeof window['vtexjs'][_0x3b5d('0x21')])var _0x361bf5=window[_0x3b5d('0x59')][_0x3b5d('0x21')];else if(_0x3b5d('0x14')===typeof vtex&&_0x3b5d('0x14')===typeof vtex[_0x3b5d('0x21')]&&_0x3b5d('0x1')!==typeof vtex['checkout'][_0x3b5d('0x5a')])_0x361bf5=new vtex['checkout'][(_0x3b5d('0x5a'))]();else return _0x3d8d6f('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x508854[_0x3b5d('0xc6')]='<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>';var _0x253410=function(_0xa8f2d3){_0x22a368(this)[_0x3b5d('0x80')](_0xa8f2d3);_0xa8f2d3['find'](_0x3b5d('0xc7'))['add'](_0x22a368('.qd_ddc_lightBoxOverlay'))['on'](_0x3b5d('0xc8'),function(){_0x5ef8ce[_0x3b5d('0x48')]('qd-bb-lightBoxProdAdd');_0x22a368(document[_0x3b5d('0x88')])[_0x3b5d('0x48')]('qd-bb-lightBoxBodyProdAdd');});_0x22a368(document)[_0x3b5d('0xc9')](_0x3b5d('0xca'))['on'](_0x3b5d('0xca'),function(_0x175fec){0x1b==_0x175fec[_0x3b5d('0xcb')]&&(_0x5ef8ce[_0x3b5d('0x48')](_0x3b5d('0xcc')),_0x22a368(document[_0x3b5d('0x88')])[_0x3b5d('0x48')]('qd-bb-lightBoxBodyProdAdd'));});var _0x21ba69=_0xa8f2d3[_0x3b5d('0x4f')](_0x3b5d('0xcd'));_0xa8f2d3[_0x3b5d('0x4f')]('.qd-ddc-scrollUp')['on'](_0x3b5d('0xce'),function(){_0x508854['scrollCart']('-',void 0x0,void 0x0,_0x21ba69);return!0x1;});_0xa8f2d3[_0x3b5d('0x4f')](_0x3b5d('0xcf'))['on'](_0x3b5d('0xd0'),function(){_0x508854[_0x3b5d('0xd1')](void 0x0,void 0x0,void 0x0,_0x21ba69);return!0x1;});_0xa8f2d3[_0x3b5d('0x4f')](_0x3b5d('0xd2'))[_0x3b5d('0xd3')]('')['on']('keyup.qd_ddc_cep',function(){_0x508854[_0x3b5d('0xd4')](_0x22a368(this));});if(_0x1f28da[_0x3b5d('0xd5')]){var _0x163dc7=0x0;_0x22a368(this)['on'](_0x3b5d('0xd6'),function(){var _0xa8f2d3=function(){window[_0x3b5d('0x58')]['allowUpdate']&&(_0x508854[_0x3b5d('0x8f')](),window[_0x3b5d('0x58')]['allowUpdate']=!0x1,_0x22a368['fn']['simpleCart'](!0x0),_0x508854[_0x3b5d('0xd7')]());};_0x163dc7=setInterval(function(){_0xa8f2d3();},0x258);_0xa8f2d3();});_0x22a368(this)['on']('mouseleave.qd_ddc_hover',function(){clearInterval(_0x163dc7);});}};var _0xd2c47b=function(_0x335db4){_0x335db4=_0x22a368(_0x335db4);_0x1f28da['texts']['cartTotal']=_0x1f28da[_0x3b5d('0xd8')][_0x3b5d('0x52')][_0x3b5d('0x6')](_0x3b5d('0xd9'),_0x3b5d('0xda'));_0x1f28da[_0x3b5d('0xd8')]['cartTotal']=_0x1f28da[_0x3b5d('0xd8')][_0x3b5d('0x52')][_0x3b5d('0x6')](_0x3b5d('0xdb'),_0x3b5d('0xdc'));_0x1f28da['texts'][_0x3b5d('0x52')]=_0x1f28da[_0x3b5d('0xd8')][_0x3b5d('0x52')][_0x3b5d('0x6')]('#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>');_0x1f28da[_0x3b5d('0xd8')][_0x3b5d('0x52')]=_0x1f28da[_0x3b5d('0xd8')]['cartTotal'][_0x3b5d('0x6')](_0x3b5d('0xdd'),_0x3b5d('0xde'));_0x335db4['find'](_0x3b5d('0xdf'))['html'](_0x1f28da['texts'][_0x3b5d('0xe0')]);_0x335db4[_0x3b5d('0x4f')](_0x3b5d('0xe1'))[_0x3b5d('0x4c')](_0x1f28da[_0x3b5d('0xd8')][_0x3b5d('0xe2')]);_0x335db4[_0x3b5d('0x4f')](_0x3b5d('0xe3'))[_0x3b5d('0x4c')](_0x1f28da['texts'][_0x3b5d('0xe4')]);_0x335db4[_0x3b5d('0x4f')](_0x3b5d('0xe5'))[_0x3b5d('0x4c')](_0x1f28da['texts'][_0x3b5d('0x52')]);_0x335db4[_0x3b5d('0x4f')](_0x3b5d('0xe6'))[_0x3b5d('0x4c')](_0x1f28da['texts'][_0x3b5d('0xe7')]);_0x335db4[_0x3b5d('0x4f')]('.qd-ddc-emptyCart\x20p')['html'](_0x1f28da['texts'][_0x3b5d('0x55')]);return _0x335db4;}(this[_0x3b5d('0xc6')]);var _0x4890b4=0x0;_0x5ef8ce[_0x3b5d('0x31')](function(){0x0<_0x4890b4?_0x253410[_0x3b5d('0x5f')](this,_0xd2c47b[_0x3b5d('0xe8')]()):_0x253410[_0x3b5d('0x5f')](this,_0xd2c47b);_0x4890b4++;});window[_0x3b5d('0x33')][_0x3b5d('0x3f')]['add'](function(){_0x22a368(_0x3b5d('0xe9'))[_0x3b5d('0x4c')](window[_0x3b5d('0x33')][_0x3b5d('0x37')]||'--');_0x22a368(_0x3b5d('0xea'))[_0x3b5d('0x4c')](window['_QuatroDigital_CartData'][_0x3b5d('0x3a')]||'0');_0x22a368(_0x3b5d('0xeb'))[_0x3b5d('0x4c')](window[_0x3b5d('0x33')][_0x3b5d('0xec')]||'--');_0x22a368(_0x3b5d('0xed'))[_0x3b5d('0x4c')](window[_0x3b5d('0x33')][_0x3b5d('0x39')]||'--');});var _0x1401f9=function(_0x43fb60,_0x3f3173){if(_0x3b5d('0x1')===typeof _0x43fb60[_0x3b5d('0x3c')])return _0x3d8d6f('Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição');_0x508854['renderProductsList'][_0x3b5d('0x5f')](this,_0x3f3173);};_0x508854[_0x3b5d('0x8f')]=function(_0xb18292,_0x48e849){'undefined'!=typeof _0x48e849?window[_0x3b5d('0x58')][_0x3b5d('0xee')]=_0x48e849:window[_0x3b5d('0x58')][_0x3b5d('0xee')]&&(_0x48e849=window[_0x3b5d('0x58')]['dataOptionsCache']);setTimeout(function(){window[_0x3b5d('0x58')]['dataOptionsCache']=void 0x0;},_0x1f28da[_0x3b5d('0x8e')]);_0x22a368(_0x3b5d('0xef'))[_0x3b5d('0x48')](_0x3b5d('0xf0'));if(_0x1f28da['smartCheckout']){var _0x163dc7=function(_0x2ebdce){window[_0x3b5d('0x58')][_0x3b5d('0x22')]=_0x2ebdce;_0x1401f9(_0x2ebdce,_0x48e849);_0x3b5d('0x1')!==typeof window[_0x3b5d('0xf1')]&&_0x3b5d('0x7')===typeof window[_0x3b5d('0xf1')][_0x3b5d('0xf2')]&&window[_0x3b5d('0xf1')]['exec'][_0x3b5d('0x5f')](this);_0x22a368('.qd-ddc-wrapper')[_0x3b5d('0x46')](_0x3b5d('0xf0'));};'undefined'!==typeof window[_0x3b5d('0x58')][_0x3b5d('0x22')]?(_0x163dc7(window[_0x3b5d('0x58')]['getOrderForm']),_0x3b5d('0x7')===typeof _0xb18292&&_0xb18292(window[_0x3b5d('0x58')][_0x3b5d('0x22')])):_0x22a368['QD_checkoutQueue']([_0x3b5d('0x3c'),_0x3b5d('0x34'),_0x3b5d('0x5c')],{'done':function(_0x2ee894){_0x163dc7[_0x3b5d('0x5f')](this,_0x2ee894);_0x3b5d('0x7')===typeof _0xb18292&&_0xb18292(_0x2ee894);},'fail':function(_0x5d4883){_0x3d8d6f([_0x3b5d('0xf3'),_0x5d4883]);}});}else alert(_0x3b5d('0xf4'));};_0x508854[_0x3b5d('0xd7')]=function(){var _0x23d3b6=_0x22a368('.qd-ddc-wrapper');_0x23d3b6[_0x3b5d('0x4f')]('.qd-ddc-prodRow')[_0x3b5d('0x5')]?_0x23d3b6[_0x3b5d('0x48')](_0x3b5d('0xf5')):_0x23d3b6[_0x3b5d('0x46')](_0x3b5d('0xf5'));};_0x508854[_0x3b5d('0xf6')]=function(_0xb98cce){var _0x163dc7=_0x22a368(_0x3b5d('0xf7'));_0x163dc7['empty']();_0x163dc7['each'](function(){var _0x163dc7=_0x22a368(this),_0x5d1999,_0x5e0ab7,_0x364ade=_0x22a368(''),_0x125a99;for(_0x125a99 in window[_0x3b5d('0x58')][_0x3b5d('0x22')][_0x3b5d('0x3c')])if(_0x3b5d('0x14')===typeof window['_QuatroDigital_DropDown'][_0x3b5d('0x22')]['items'][_0x125a99]){var _0x545961=window[_0x3b5d('0x58')][_0x3b5d('0x22')]['items'][_0x125a99];var _0x30670f=_0x545961[_0x3b5d('0xf8')]['replace'](/^\/|\/$/g,'')[_0x3b5d('0x4')]('/');var _0x4aaa39=_0x22a368(_0x3b5d('0xf9'));_0x4aaa39[_0x3b5d('0x30')]({'data-sku':_0x545961['id'],'data-sku-index':_0x125a99,'data-qd-departament':_0x30670f[0x0],'data-qd-category':_0x30670f[_0x30670f[_0x3b5d('0x5')]-0x1]});_0x4aaa39['addClass']('qd-ddc-'+_0x545961['availability']);_0x4aaa39[_0x3b5d('0x4f')](_0x3b5d('0xfa'))[_0x3b5d('0x80')](_0x1f28da[_0x3b5d('0xc0')](_0x545961));_0x4aaa39[_0x3b5d('0x4f')]('.qd-ddc-prodPrice')[_0x3b5d('0x80')](isNaN(_0x545961['sellingPrice'])?_0x545961[_0x3b5d('0xfb')]:0x0==_0x545961[_0x3b5d('0xfb')]?'Grátis':(_0x22a368('meta[name=currency]')[_0x3b5d('0x30')](_0x3b5d('0xfc'))||'R$')+'\x20'+qd_number_format(_0x545961[_0x3b5d('0xfb')]/0x64,0x2,',','.'));_0x4aaa39[_0x3b5d('0x4f')](_0x3b5d('0xfd'))[_0x3b5d('0x30')]({'data-sku':_0x545961['id'],'data-sku-index':_0x125a99})['val'](_0x545961['quantity']);_0x4aaa39[_0x3b5d('0x4f')]('.qd-ddc-remove')[_0x3b5d('0x30')]({'data-sku':_0x545961['id'],'data-sku-index':_0x125a99});_0x508854['insertProdImg'](_0x545961['id'],_0x4aaa39[_0x3b5d('0x4f')]('.qd-ddc-image'),_0x545961[_0x3b5d('0xfe')]);_0x4aaa39[_0x3b5d('0x4f')](_0x3b5d('0xff'))[_0x3b5d('0x30')]({'data-sku':_0x545961['id'],'data-sku-index':_0x125a99});_0x4aaa39[_0x3b5d('0x100')](_0x163dc7);_0x364ade=_0x364ade[_0x3b5d('0x2b')](_0x4aaa39);}try{var _0x4bbb0f=_0x163dc7['getParent']('.qd-ddc-wrapper')[_0x3b5d('0x4f')](_0x3b5d('0xd2'));_0x4bbb0f[_0x3b5d('0x5')]&&''==_0x4bbb0f[_0x3b5d('0xd3')]()&&window[_0x3b5d('0x58')][_0x3b5d('0x22')][_0x3b5d('0x5c')][_0x3b5d('0x101')]&&_0x4bbb0f[_0x3b5d('0xd3')](window[_0x3b5d('0x58')][_0x3b5d('0x22')][_0x3b5d('0x5c')][_0x3b5d('0x101')][_0x3b5d('0x102')]);}catch(_0x1debfb){_0x3d8d6f(_0x3b5d('0x103')+_0x1debfb['message'],_0x3b5d('0xb4'));}_0x508854[_0x3b5d('0x104')](_0x163dc7);_0x508854[_0x3b5d('0xd7')]();_0xb98cce&&_0xb98cce[_0x3b5d('0x105')]&&function(){_0x5e0ab7=_0x364ade[_0x3b5d('0x42')]('[data-sku=\x27'+_0xb98cce[_0x3b5d('0x105')]+'\x27]');_0x5e0ab7['length']&&(_0x5d1999=0x0,_0x364ade[_0x3b5d('0x31')](function(){var _0xb98cce=_0x22a368(this);if(_0xb98cce['is'](_0x5e0ab7))return!0x1;_0x5d1999+=_0xb98cce[_0x3b5d('0x106')]();}),_0x508854[_0x3b5d('0xd1')](void 0x0,void 0x0,_0x5d1999,_0x163dc7[_0x3b5d('0x2b')](_0x163dc7['parent']())),_0x364ade[_0x3b5d('0x48')](_0x3b5d('0x107')),function(_0x358baf){_0x358baf[_0x3b5d('0x46')]('qd-ddc-lastAdded');_0x358baf[_0x3b5d('0x46')](_0x3b5d('0x107'));setTimeout(function(){_0x358baf['removeClass'](_0x3b5d('0x108'));},_0x1f28da[_0x3b5d('0x8e')]);}(_0x5e0ab7));}();});(function(){_QuatroDigital_DropDown['getOrderForm'][_0x3b5d('0x3c')][_0x3b5d('0x5')]?(_0x22a368(_0x3b5d('0x88'))['removeClass'](_0x3b5d('0x109'))[_0x3b5d('0x46')]('qd-ddc-cart-rendered\x20qd-ddc-product-add-time'),setTimeout(function(){_0x22a368('body')['removeClass'](_0x3b5d('0x10a'));},_0x1f28da[_0x3b5d('0x8e')])):_0x22a368('body')['removeClass'](_0x3b5d('0x10b'))['addClass'](_0x3b5d('0x109'));}());'function'===typeof _0x1f28da[_0x3b5d('0x10c')]?_0x1f28da[_0x3b5d('0x10c')][_0x3b5d('0x5f')](this):_0x3d8d6f(_0x3b5d('0x10d'));};_0x508854['insertProdImg']=function(_0x734a83,_0x136dff,_0x325ad7){function _0x53930a(){_0x136dff[_0x3b5d('0x48')]('qd-loaded')[_0x3b5d('0x10e')](function(){_0x22a368(this)[_0x3b5d('0x46')](_0x3b5d('0x10f'));})[_0x3b5d('0x30')]('src',_0x325ad7);}_0x325ad7?_0x53930a():isNaN(_0x734a83)?_0x3d8d6f(_0x3b5d('0x110'),'alerta'):alert(_0x3b5d('0x111'));};_0x508854['actionButtons']=function(_0x21d19c){var _0x641b63=function(_0x52239d,_0x2743d9){var _0x163dc7=_0x22a368(_0x52239d);var _0x1b40bf=_0x163dc7[_0x3b5d('0x30')](_0x3b5d('0x112'));var _0x5d1999=_0x163dc7[_0x3b5d('0x30')](_0x3b5d('0x113'));if(_0x1b40bf){var _0x2a038=parseInt(_0x163dc7[_0x3b5d('0xd3')]())||0x1;_0x508854[_0x3b5d('0x114')]([_0x1b40bf,_0x5d1999],_0x2a038,_0x2a038+0x1,function(_0x48dec8){_0x163dc7[_0x3b5d('0xd3')](_0x48dec8);_0x3b5d('0x7')===typeof _0x2743d9&&_0x2743d9();});}};var _0x163dc7=function(_0x1015bc,_0x13aa0d){var _0x163dc7=_0x22a368(_0x1015bc);var _0x4de830=_0x163dc7[_0x3b5d('0x30')](_0x3b5d('0x112'));var _0x5d1999=_0x163dc7[_0x3b5d('0x30')](_0x3b5d('0x113'));if(_0x4de830){var _0x428ced=parseInt(_0x163dc7[_0x3b5d('0xd3')]())||0x2;_0x508854[_0x3b5d('0x114')]([_0x4de830,_0x5d1999],_0x428ced,_0x428ced-0x1,function(_0x40b5ce){_0x163dc7['val'](_0x40b5ce);_0x3b5d('0x7')===typeof _0x13aa0d&&_0x13aa0d();});}};var _0x3732d1=function(_0x9b1729,_0x3fb36d){var _0x163dc7=_0x22a368(_0x9b1729);var _0x53a011=_0x163dc7['attr'](_0x3b5d('0x112'));var _0x5d1999=_0x163dc7[_0x3b5d('0x30')](_0x3b5d('0x113'));if(_0x53a011){var _0x2df34a=parseInt(_0x163dc7[_0x3b5d('0xd3')]())||0x1;_0x508854['changeQantity']([_0x53a011,_0x5d1999],0x1,_0x2df34a,function(_0x286d92){_0x163dc7[_0x3b5d('0xd3')](_0x286d92);'function'===typeof _0x3fb36d&&_0x3fb36d();});}};var _0x5d1999=_0x21d19c[_0x3b5d('0x4f')](_0x3b5d('0x115'));_0x5d1999[_0x3b5d('0x46')](_0x3b5d('0x116'))[_0x3b5d('0x31')](function(){var _0x21d19c=_0x22a368(this);_0x21d19c[_0x3b5d('0x4f')](_0x3b5d('0x117'))['on'](_0x3b5d('0x118'),function(_0x2e0189){_0x2e0189[_0x3b5d('0x78')]();_0x5d1999['addClass'](_0x3b5d('0x119'));_0x641b63(_0x21d19c[_0x3b5d('0x4f')](_0x3b5d('0xfd')),function(){_0x5d1999['removeClass']('qd-loading');});});_0x21d19c[_0x3b5d('0x4f')](_0x3b5d('0x11a'))['on'](_0x3b5d('0x11b'),function(_0x441204){_0x441204[_0x3b5d('0x78')]();_0x5d1999[_0x3b5d('0x46')](_0x3b5d('0x119'));_0x163dc7(_0x21d19c[_0x3b5d('0x4f')](_0x3b5d('0xfd')),function(){_0x5d1999[_0x3b5d('0x48')]('qd-loading');});});_0x21d19c[_0x3b5d('0x4f')](_0x3b5d('0xfd'))['on'](_0x3b5d('0x11c'),function(){_0x5d1999[_0x3b5d('0x46')]('qd-loading');_0x3732d1(this,function(){_0x5d1999[_0x3b5d('0x48')](_0x3b5d('0x119'));});});_0x21d19c[_0x3b5d('0x4f')](_0x3b5d('0xfd'))['on'](_0x3b5d('0x11d'),function(_0x3e25c9){0xd==_0x3e25c9[_0x3b5d('0xcb')]&&(_0x5d1999[_0x3b5d('0x46')](_0x3b5d('0x119')),_0x3732d1(this,function(){_0x5d1999[_0x3b5d('0x48')](_0x3b5d('0x119'));}));});});_0x21d19c[_0x3b5d('0x4f')](_0x3b5d('0x11e'))[_0x3b5d('0x31')](function(){var _0x21d19c=_0x22a368(this);_0x21d19c[_0x3b5d('0x4f')](_0x3b5d('0x11f'))['on'](_0x3b5d('0x120'),function(){_0x21d19c[_0x3b5d('0x46')]('qd-loading');_0x508854[_0x3b5d('0x121')](_0x22a368(this),function(_0x3c3bae){_0x3c3bae?_0x21d19c['stop'](!0x0)[_0x3b5d('0x122')](function(){_0x21d19c[_0x3b5d('0x123')]();_0x508854[_0x3b5d('0xd7')]();}):_0x21d19c[_0x3b5d('0x48')](_0x3b5d('0x119'));});return!0x1;});});};_0x508854[_0x3b5d('0xd4')]=function(_0x2ec6f5){var _0x5f3d0b=_0x2ec6f5[_0x3b5d('0xd3')](),_0x5f3d0b=_0x5f3d0b[_0x3b5d('0x6')](/[^0-9\-]/g,''),_0x5f3d0b=_0x5f3d0b[_0x3b5d('0x6')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x3b5d('0x124')),_0x5f3d0b=_0x5f3d0b[_0x3b5d('0x6')](/(.{9}).*/g,'$1');_0x2ec6f5[_0x3b5d('0xd3')](_0x5f3d0b);0x9<=_0x5f3d0b[_0x3b5d('0x5')]&&(_0x2ec6f5[_0x3b5d('0x15')](_0x3b5d('0x125'))!=_0x5f3d0b&&_0x361bf5[_0x3b5d('0x126')]({'postalCode':_0x5f3d0b,'country':'BRA'})[_0x3b5d('0x6a')](function(_0x57e57e){window[_0x3b5d('0x58')][_0x3b5d('0x22')]=_0x57e57e;_0x508854['getCartInfoByUrl']();})[_0x3b5d('0x68')](function(_0xe23a57){_0x3d8d6f([_0x3b5d('0x127'),_0xe23a57]);updateCartData();}),_0x2ec6f5[_0x3b5d('0x15')](_0x3b5d('0x125'),_0x5f3d0b));};_0x508854[_0x3b5d('0x114')]=function(_0x11cd1e,_0x682140,_0x4374c1,_0x4c7e56){function _0xc6f8cf(_0xabc01d){_0xabc01d='boolean'!==typeof _0xabc01d?!0x1:_0xabc01d;_0x508854[_0x3b5d('0x8f')]();window['_QuatroDigital_DropDown'][_0x3b5d('0x128')]=!0x1;_0x508854[_0x3b5d('0xd7')]();_0x3b5d('0x1')!==typeof window[_0x3b5d('0xf1')]&&'function'===typeof window[_0x3b5d('0xf1')][_0x3b5d('0xf2')]&&window[_0x3b5d('0xf1')]['exec'][_0x3b5d('0x5f')](this);_0x3b5d('0x7')===typeof adminCart&&adminCart();_0x22a368['fn'][_0x3b5d('0x25')](!0x0,void 0x0,_0xabc01d);_0x3b5d('0x7')===typeof _0x4c7e56&&_0x4c7e56(_0x682140);}_0x4374c1=_0x4374c1||0x1;if(0x1>_0x4374c1)return _0x682140;if(_0x1f28da[_0x3b5d('0x57')]){if(_0x3b5d('0x1')===typeof window['_QuatroDigital_DropDown'][_0x3b5d('0x22')][_0x3b5d('0x3c')][_0x11cd1e[0x1]])return _0x3d8d6f(_0x3b5d('0x129')+_0x11cd1e[0x1]+']'),_0x682140;window[_0x3b5d('0x58')][_0x3b5d('0x22')]['items'][_0x11cd1e[0x1]][_0x3b5d('0x3d')]=_0x4374c1;window[_0x3b5d('0x58')][_0x3b5d('0x22')]['items'][_0x11cd1e[0x1]][_0x3b5d('0x12a')]=_0x11cd1e[0x1];_0x361bf5[_0x3b5d('0x12b')]([window['_QuatroDigital_DropDown'][_0x3b5d('0x22')][_0x3b5d('0x3c')][_0x11cd1e[0x1]]],[_0x3b5d('0x3c'),_0x3b5d('0x34'),'shippingData'])[_0x3b5d('0x6a')](function(_0x4ebe4c){window[_0x3b5d('0x58')][_0x3b5d('0x22')]=_0x4ebe4c;_0xc6f8cf(!0x0);})[_0x3b5d('0x68')](function(_0x5b2361){_0x3d8d6f([_0x3b5d('0x12c'),_0x5b2361]);_0xc6f8cf();});}else _0x3d8d6f(_0x3b5d('0x12d'));};_0x508854[_0x3b5d('0x121')]=function(_0x39d33e,_0x425c0a){function _0x9b7ddd(_0x35f0f9){_0x35f0f9=_0x3b5d('0x12e')!==typeof _0x35f0f9?!0x1:_0x35f0f9;'undefined'!==typeof window[_0x3b5d('0xf1')]&&_0x3b5d('0x7')===typeof window[_0x3b5d('0xf1')][_0x3b5d('0xf2')]&&window[_0x3b5d('0xf1')][_0x3b5d('0xf2')][_0x3b5d('0x5f')](this);'function'===typeof adminCart&&adminCart();_0x22a368['fn']['simpleCart'](!0x0,void 0x0,_0x35f0f9);_0x3b5d('0x7')===typeof _0x425c0a&&_0x425c0a(_0x5d1999);}var _0x5d1999=!0x1,_0x5051b1=_0x22a368(_0x39d33e)['attr'](_0x3b5d('0x113'));if(_0x1f28da[_0x3b5d('0x57')]){if(_0x3b5d('0x1')===typeof window[_0x3b5d('0x58')]['getOrderForm'][_0x3b5d('0x3c')][_0x5051b1])return _0x3d8d6f('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x5051b1+']'),_0x5d1999;window['_QuatroDigital_DropDown'][_0x3b5d('0x22')][_0x3b5d('0x3c')][_0x5051b1][_0x3b5d('0x12a')]=_0x5051b1;_0x361bf5[_0x3b5d('0x12f')]([window['_QuatroDigital_DropDown'][_0x3b5d('0x22')][_0x3b5d('0x3c')][_0x5051b1]],[_0x3b5d('0x3c'),'totalizers',_0x3b5d('0x5c')])[_0x3b5d('0x6a')](function(_0xca680e){_0x5d1999=!0x0;window['_QuatroDigital_DropDown'][_0x3b5d('0x22')]=_0xca680e;_0x1401f9(_0xca680e);_0x9b7ddd(!0x0);})[_0x3b5d('0x68')](function(_0x3afc25){_0x3d8d6f([_0x3b5d('0x130'),_0x3afc25]);_0x9b7ddd();});}else alert(_0x3b5d('0x131'));};_0x508854[_0x3b5d('0xd1')]=function(_0x1027c8,_0x57ed0b,_0x59303d,_0x58cf68){_0x58cf68=_0x58cf68||_0x22a368(_0x3b5d('0x132'));_0x1027c8=_0x1027c8||'+';_0x57ed0b=_0x57ed0b||0.9*_0x58cf68[_0x3b5d('0x133')]();_0x58cf68[_0x3b5d('0x134')](!0x0,!0x0)[_0x3b5d('0x135')]({'scrollTop':isNaN(_0x59303d)?_0x1027c8+'='+_0x57ed0b+'px':_0x59303d});};_0x1f28da[_0x3b5d('0xd5')]||(_0x508854[_0x3b5d('0x8f')](),_0x22a368['fn'][_0x3b5d('0x25')](!0x0));_0x22a368(window)['on']('productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex',function(){try{window[_0x3b5d('0x58')][_0x3b5d('0x22')]=void 0x0,_0x508854[_0x3b5d('0x8f')]();}catch(_0x5eb9d0){_0x3d8d6f(_0x3b5d('0x136')+_0x5eb9d0['message'],_0x3b5d('0x137'));}});_0x3b5d('0x7')===typeof _0x1f28da[_0x3b5d('0x3f')]?_0x1f28da[_0x3b5d('0x3f')]['call'](this):_0x3d8d6f(_0x3b5d('0xaa'));};_0x22a368['fn'][_0x3b5d('0xb5')]=function(_0x2f87c9){var _0x3937d5=_0x22a368(this);_0x3937d5['fn']=new _0x22a368['QD_dropDownCart'](this,_0x2f87c9);return _0x3937d5;};}catch(_0x3a5b70){'undefined'!==typeof console&&_0x3b5d('0x7')===typeof console[_0x3b5d('0x11')]&&console[_0x3b5d('0x11')](_0x3b5d('0x64'),_0x3a5b70);}}(this));(function(_0x274d56){try{var _0x39c31e=jQuery;window[_0x3b5d('0xf1')]=window[_0x3b5d('0xf1')]||{};window['_QuatroDigital_AmountProduct'][_0x3b5d('0x3c')]={};window['_QuatroDigital_AmountProduct'][_0x3b5d('0x138')]=!0x1;window['_QuatroDigital_AmountProduct'][_0x3b5d('0x139')]=!0x1;window[_0x3b5d('0xf1')]['quickViewUpdate']=!0x1;var _0x52a5ca=function(){if(window[_0x3b5d('0xf1')][_0x3b5d('0x138')]){var _0x53da29=!0x1;var _0x274d56={};window[_0x3b5d('0xf1')]['items']={};for(_0x2872f1 in window[_0x3b5d('0x58')]['getOrderForm'][_0x3b5d('0x3c')])if(_0x3b5d('0x14')===typeof window[_0x3b5d('0x58')][_0x3b5d('0x22')][_0x3b5d('0x3c')][_0x2872f1]){var _0xd2fd26=window['_QuatroDigital_DropDown']['getOrderForm'][_0x3b5d('0x3c')][_0x2872f1];_0x3b5d('0x1')!==typeof _0xd2fd26[_0x3b5d('0x13a')]&&null!==_0xd2fd26[_0x3b5d('0x13a')]&&''!==_0xd2fd26['productId']&&(window[_0x3b5d('0xf1')][_0x3b5d('0x3c')]['prod_'+_0xd2fd26[_0x3b5d('0x13a')]]=window[_0x3b5d('0xf1')]['items'][_0x3b5d('0x13b')+_0xd2fd26[_0x3b5d('0x13a')]]||{},window[_0x3b5d('0xf1')][_0x3b5d('0x3c')][_0x3b5d('0x13b')+_0xd2fd26[_0x3b5d('0x13a')]][_0x3b5d('0x13c')]=_0xd2fd26['productId'],_0x274d56[_0x3b5d('0x13b')+_0xd2fd26[_0x3b5d('0x13a')]]||(window[_0x3b5d('0xf1')][_0x3b5d('0x3c')][_0x3b5d('0x13b')+_0xd2fd26[_0x3b5d('0x13a')]]['qtt']=0x0),window[_0x3b5d('0xf1')][_0x3b5d('0x3c')][_0x3b5d('0x13b')+_0xd2fd26['productId']][_0x3b5d('0x3a')]+=_0xd2fd26[_0x3b5d('0x3d')],_0x53da29=!0x0,_0x274d56[_0x3b5d('0x13b')+_0xd2fd26[_0x3b5d('0x13a')]]=!0x0);}var _0x2872f1=_0x53da29;}else _0x2872f1=void 0x0;window[_0x3b5d('0xf1')]['allowRecalculate']&&(_0x39c31e(_0x3b5d('0x13d'))['remove'](),_0x39c31e(_0x3b5d('0x13e'))[_0x3b5d('0x48')]('qd-bap-item-added'));for(var _0x34fcc0 in window[_0x3b5d('0xf1')]['items']){_0xd2fd26=window['_QuatroDigital_AmountProduct'][_0x3b5d('0x3c')][_0x34fcc0];if('object'!==typeof _0xd2fd26)return;_0x274d56=_0x39c31e(_0x3b5d('0x13f')+_0xd2fd26[_0x3b5d('0x13c')]+']')[_0x3b5d('0x20')]('li');if(window[_0x3b5d('0xf1')]['allowRecalculate']||!_0x274d56[_0x3b5d('0x4f')](_0x3b5d('0x13d'))[_0x3b5d('0x5')])_0x53da29=_0x39c31e(_0x3b5d('0x140')),_0x53da29[_0x3b5d('0x4f')](_0x3b5d('0x141'))[_0x3b5d('0x4c')](_0xd2fd26[_0x3b5d('0x3a')]),_0xd2fd26=_0x274d56['find']('.qd_bap_wrapper_content'),_0xd2fd26[_0x3b5d('0x5')]?_0xd2fd26[_0x3b5d('0x142')](_0x53da29)[_0x3b5d('0x46')](_0x3b5d('0x143')):_0x274d56[_0x3b5d('0x142')](_0x53da29);}_0x2872f1&&(window['_QuatroDigital_AmountProduct'][_0x3b5d('0x138')]=!0x1);};window['_QuatroDigital_AmountProduct']['exec']=function(){window['_QuatroDigital_AmountProduct'][_0x3b5d('0x138')]=!0x0;_0x52a5ca['call'](this);};_0x39c31e(document)[_0x3b5d('0xb0')](function(){_0x52a5ca[_0x3b5d('0x5f')](this);});}catch(_0x315346){'undefined'!==typeof console&&_0x3b5d('0x7')===typeof console[_0x3b5d('0x11')]&&console['error']('Oooops!\x20',_0x315346);}}(this));(function(){try{var _0x2463ec=jQuery,_0x1bab27,_0x57e7e7={'selector':_0x3b5d('0x144'),'dropDown':{},'buyButton':{}};_0x2463ec['QD_smartCart']=function(_0x7d3b16){var _0x44a38d={};_0x1bab27=_0x2463ec[_0x3b5d('0x12')](!0x0,{},_0x57e7e7,_0x7d3b16);_0x7d3b16=_0x2463ec(_0x1bab27[_0x3b5d('0x84')])[_0x3b5d('0xb5')](_0x1bab27[_0x3b5d('0x145')]);_0x44a38d[_0x3b5d('0x92')]=_0x3b5d('0x1')!==typeof _0x1bab27[_0x3b5d('0x145')]['updateOnlyHover']&&!0x1===_0x1bab27[_0x3b5d('0x145')]['updateOnlyHover']?_0x2463ec(_0x1bab27[_0x3b5d('0x84')])[_0x3b5d('0x75')](_0x7d3b16['fn'],_0x1bab27['buyButton']):_0x2463ec(_0x1bab27[_0x3b5d('0x84')])[_0x3b5d('0x75')](_0x1bab27[_0x3b5d('0x92')]);_0x44a38d[_0x3b5d('0x145')]=_0x7d3b16;return _0x44a38d;};_0x2463ec['fn'][_0x3b5d('0x146')]=function(){_0x3b5d('0x14')===typeof console&&_0x3b5d('0x7')===typeof console[_0x3b5d('0x28')]&&console['info'](_0x3b5d('0x147'));};_0x2463ec[_0x3b5d('0x146')]=_0x2463ec['fn'][_0x3b5d('0x146')];}catch(_0x30e2a9){_0x3b5d('0x1')!==typeof console&&_0x3b5d('0x7')===typeof console[_0x3b5d('0x11')]&&console[_0x3b5d('0x11')]('Oooops!\x20',_0x30e2a9);}}());