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
			Product.applySmartQuantity();
			Product.accessoriesApplyCarousel();
			Product.openShipping();
			Product.saveAmountFlag();
			Product.scrollToDescription();
			Product.setAvailableBodyClass();
			Product.wrapProductSpecification();
			Product.splitDescription();
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
			var sliderWrapper = $('.product-qd-v1-image-carrousel'); // Wrapper que será inserido o carousel
			var thumbsWrapper = $('.thumbs').first(); // Wrapper onde foi inserido as thumbs
			var thumbsSliderWrapper = $('.product-qd-v1-image-thumbs'); // Wrapper onde foi inserido as thumbs

			sliderWrapper.filter('.slick-initialized').slick('unslick');
			thumbsSliderWrapper.filter('.slick-initialized').slick('unslick');

			var thumbsLi;
			(function cloneThumb () {
				thumbsLi = thumbsWrapper.find('li');
				if(thumbsLi.length < 4){
					thumbsLi.clone().appendTo(thumbsWrapper);
					cloneThumb();
				}
			})();

			thumbsSliderWrapper.html(thumbsWrapper.html());

			thumbsSliderWrapper.find('img').each(function(){
				$t = $(this);
				$t.attr('src', $t.attr('src').replace('-55-55', '-150-150'));
			});

			sliderWrapper.empty();
			thumbsWrapper.find('a').each(function(index){
				$t = $(this);
				$('<div class="qd-slide qd-product-image-' + index + '"><a href="' + $t.attr('rel').replace('-292-292', '-640-640') + '"><img src="' + $t.attr('rel').replace('-292-292', '-640-640') + '"/></a></div>').appendTo(sliderWrapper);
			});

			var options = {
				centerMode: true,
				slidesToShow: 3,
				slidesToScroll: 1,
				focusOnSelect: true,
				centerPadding: 0
			};
			sliderWrapper.slick($.extend({}, options, {
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
  				asNavFor: '.product-qd-v1-image-thumbs',
  				responsive: [
					{
						breakpoint: 991,
						settings: {
							slidesToShow: 1,
							centerPadding: '100px'
						}
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 1,
							centerPadding: 0
						}
					},
				]
			}));

			thumbsSliderWrapper.addClass('slick-slide').slick($.extend({}, options, {
				arrows: false,
  				asNavFor: '.product-qd-v1-image-carrousel'
			}));
			thumbsSliderWrapper.on('afterChange', function(event, slick, slide){
				thumbsSliderWrapper.find('.ON').removeClass('ON');
				thumbsSliderWrapper.find('.slick-active.slick-center a').addClass('ON');
			}).slick('getSlick').slickGoTo(0);

			sliderWrapper.find('a').click(function(e){e.preventDefault()});
		},
		applySmartQuantity: function() {
			$('.product-qd-v1-sku-selection-box').QD_smartQuantity();

			$(window).on("skuSelected.vtex", function(e, id, data) {
				$('.qd-sq-more, .qd-sq-minus').click();
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
			Institutional.sendAccessForm();
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
		sendAccessForm: function() {
			Institutional.formCadastreMask();

			var $form = $(".form-qd-v1");
			var loading = $('form-qd-v1-loading').hide();
			// $form.find(".form-qd-v1-submit").after(loading);

			var cnpj = $form.find("[name='qd_form_cpnj']");
			cnpj.keyup(function(e) {
				if((cnpj.val() || "").length > 17)
					Institutional.checkCnpjExist(cnpj.val() || "");
			});

			var email = $form.find("[name='qd_form_email']");
			email.focusout(function(e) {
				if((email.val() || "").length > 0)
					Institutional.checkEmailExist(email.val() || "");
			});

			// Preenchendo o endereço a partir do CEP
			var cepInputs = $form.find("input[name=qd_form_street], input[name=qd_form_complement], input[name=qd_form_neighboor], input[name=qd_form_city], input[name=qd_form_state]").attr("disabled", "disabled");
			var cep = $form.find("input[name=qd_form_zipcode]");
			cep.keyup(function(e) {
				if((cep.val() || "").length < 9)
					return;

				// $form.find(".btn-continue").slideUp();
				loading.slideDown();

				$.ajax({
					url: "/api/checkout/pub/postal-code/BRA/" + cep.val(),
					dataType: "json",
					success: function(data) {
						// $form.find(".btn-continue").slideUp();
						loading.slideDown();
						$form.find("input[name=qd_form_street]").val(data.street || "");
						$form.find("input[name=qd_form_neighboor]").val(data.neighborhood || "");
						$form.find("input[name=qd_form_city]").val(data.city || "");
						$form.find("input[name=qd_form_state]").val(data.state || "");
					},
					complete: function() {
						cepInputs.removeAttr('disabled');
						loading.slideUp();
						// $form.find(".form-qd-v1-submit").slideDown();
					}
				});
			});

			if (typeof $.fn.validate !== "function")
				return;

			$form.validate({
				rules: {
					email: {
						email: true
					}
				},
				submitHandler: function(form) {
					var $form = $(form);
					var idRegister = '';

					if (!$form.valid())
						return;

					loading.slideDown();
					var inputs = $form.find("input, textarea");

					Institutional.checkEmailExist(inputs.filter("[name='qd_form_email']").val() || "").always(function() {
						loading.slideUp();
					}).done(function(data) {
						if(data.length)
							return;

						loading.slideDown();
						Institutional.checkCnpjExist(inputs.filter("[name='qd_form_cpnj']").val() || "").always(function() {
							loading.slideUp();
						}).done(function(data) {
							if(data.length)
								return;

							loading.slideDown();

							var stateRegistration = (inputs.filter("[name='qd_form_ie']").val() || "Isento").trim();
							stateRegistration = stateRegistration.length? stateRegistration: "Isento";
							stateRegistration = stateRegistration.replace(/i.+ento/g, "Isento");

							$.ajax({
								url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/CL/documents",
								type: "PATCH",
								dataType: "json",
								headers: {"Accept": "application/vnd.vtex.ds.v10+json", "Content-Type": "application/json; charset=utf-8"},
								data: JSON.stringify({
									firstName:				inputs.filter("[name='qd_form_name']").val() || "",
									lastName:				inputs.filter("[name='qd_form_lastname']").val() || "",
									email:					inputs.filter("[name='qd_form_email']").val() || "",
									birthDate:				(inputs.filter("[name='qd_form_birthdate']").val() || '').split('/').reverse().join('-'),
									gender:					inputs.filter("[name='qd_form_sex']:checked").val() || "",
									documentType:			"cpf",
									"document":				(inputs.filter("[name='qd_form_cpf']").val() || "").replace(/[^0-9]/ig, ""),
									homePhone:				"+55" + (inputs.filter("[name='qd_form_phone']").val() || "").replace(/[^0-9]/ig, ""),
									cellPhone:				"+55" + (inputs.filter("[name='qd_form_celphone']").val() || "").replace(/[^0-9]/ig, ""),
									isSMSNewsletterOptIn:   false,
									tradeName:				inputs.filter("[name='qd_form_trading_name']").val() || "",
									corporateName:			inputs.filter("[name='qd_form_company_name']").val() || "",
									corporateDocument:		(inputs.filter("[name='qd_form_cpnj']").val() || "").replace(/[^0-9]/ig, ""),
									stateRegistration:		stateRegistration,
									site: 					inputs.filter("[name='qd_form_site']").val() || "",
									facebook: 				inputs.filter("[name='qd_form_facebook']").val() || "",
									instagram: 				inputs.filter("[name='qd_form_instagram']").val() || "",
									workingBrands: 			inputs.filter("[name='qd_form_working_brands']").val() || "",
									interestingBrands: 		inputs.filter("[name='qd_form_interesting_brands']").val() || "",
									isCorporate:			true,
									localeDefault:			"pt-BR"
								}),
								success: function(data) {
									$.ajax({
										url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/AD/documents",
										type: "PATCH",
										dataType: "json",
										headers: {"Accept": "application/vnd.vtex.ds.v10+json", "Content-Type": "application/json; charset=utf-8"},
										data: JSON.stringify({
											addressName:	"Principal",
											userId:			(data.Id || "").replace(/^[a-z]{2}\-/i, ""),
											street:			inputs.filter("[name='qd_form_street']").val() || "",
											number:			inputs.filter("[name='qd_form_number']").val() || "",
											complement:		inputs.filter("[name='qd_form_complement']").val() || "",
											neighborhood:	inputs.filter("[name='qd_form_neighboor']").val() || "",
											city:			inputs.filter("[name='qd_form_city']").val() || "",
											state:			inputs.filter("[name='qd_form_state']").val() || "",
											postalCode:		inputs.filter("[name='qd_form_zipcode']").val() || "",
											addressType:	"residential",
											receiverName:	inputs.filter("[name='qd_form_name']").val() || "",
											geoCoordinate:	[]
										}),
										success: function() {
											$('.form-qd-v1-sucess').removeClass('hide');
											$('.register-content-qd-v1').addClass('hide');
											$(document).scrollTop(0);
										},
										error: function(data) {
											alert("Não foi possível enviar seu formulário, por favor tente novamente ou entre em contato por telefone.");
										},
										complete: function() {
											loading.slideUp(function() {$(this).remove(); });
										}
									});
								},
								error: function() {
									alert("Não foi possível enviar seu formulário, por favor tente novamente ou entre em contato por telefone.");
									loading.slideUp(function() {$(this).remove(); });
								}
							});
						});
					});
				},
				errorPlacement: function(error, element) {}
			});
		}
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
/* Quatro Digital - Smart Quantity // 1.11 // Carlos Vinicius // Todos os direitos reservados */
(function(v){var d=jQuery;if("function"!==typeof d.fn.QD_smartQuantity){var g=function(d,a){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var f;"object"===typeof d?(d.unshift("[Quatro Digital - Smart Quantity]\n"),f=d):f=["[Quatro Digital - Smart Quantity]\n"+d];if("undefined"===typeof a||"alerta"!==a.toLowerCase()&&"aviso"!==a.toLowerCase())if("undefined"!==typeof a&&"info"===a.toLowerCase())try{console.info.apply(console,
f)}catch(k){console.info(f.join("\n"))}else try{console.error.apply(console,f)}catch(k){console.error(f.join("\n"))}else try{console.warn.apply(console,f)}catch(k){console.warn(f.join("\n"))}}},m={buyButton:".buy-button",qttInput:".qd-sq-quantity",btnMore:".qd-sq-more",btnMinus:".qd-sq-minus",initialValue:1,minimumValue:1,setQuantityByUrl:!0},n=function(h,a){function f(c,e,b){a.setQuantityByUrl?c.val(((location.search||"").match(q)||[a.initialValue]).pop()):c.val(a.initialValue);c.change(function(c,
b){try{if("qd_ssl_trigger"!=b){var e=d(this),f=parseInt(e.val().replace(n,""));!isNaN(f)&&f>a.minimumValue?e.val(f):e.val(a.minimumValue);e.trigger("QuatroDigital.sq_change",this)}}catch(t){g(t.message)}});c.focusin(function(){d(this).trigger("QuatroDigital.sq_focusin",this)});e.click(function(b){b.preventDefault();c.val((parseInt(c.val())||a.minimumValue)+1).change()});b.click(function(b){b.preventDefault();c.val((parseInt(c.val())||a.minimumValue+1)-1).change()});c.change()}function k(c,e,b){c.on("QuatroDigital.sq_change",
function(){(d(this).val()||0)<=a.minimumValue?(b.addClass("qd-sq-inactive"),e.removeClass("qd-sq-inactive")):(e.addClass("qd-sq-inactive"),b.removeClass("qd-sq-inactive"))})}function m(c,e){c.on("QuatroDigital.sq_change",function(){try{if(!(e[0].hostname||"").length)return g("A quantidade n\u00e3o foi inserida no bt comprar pois o mesmo n\u00e3o possui uma URL","info");var b=e[0].search||"";-1<b.toLowerCase().indexOf("qty=")?e[0].search=b.replace(p,"qty="+(parseInt(c.val())||("number"==typeof a.minimumValue?
a.minimumValue:1))+"&"):e[0].search="qty="+(parseInt(c.val())||("number"==typeof a.minimumValue?a.minimumValue:1))+"&"+(e[0].search||"").replace(p,"");var d=((e.attr("href")||"").match(u)||[""]).pop()+"";c.attr("data-sku-id",d);if(d.length&&"object"===typeof skuJson&&!c.attr("data-sku-price"))for(b=0;b<skuJson.skus.length;b++)skuJson.skus[b].sku==d&&c.attr("data-sku-price",skuJson.skus[b].bestPrice)}catch(l){g(l.message)}})}var n=/[^0-9-]/gi,q=/qty\=([0-9]+)/i,u=/sku\=([0-9]+)/i,p=/qty\=[0-9]+\&?/ig;
h.each(function(){try{var c=d(this),e=c.find(a.buyButton),b=c.find(a.qttInput),h=c.find(a.btnMore),l=c.find(a.btnMinus);if(!e.length&&null!==a.buyButton||!b.length)return g("O plugin parou por aqui! N\u00e3o foram encontrados o bot\u00e3o comprar e o campo de quantidade","alerta");if(b.is(".qd-sq-on"))return g(["Execu\u00e7\u00e3o ignorada pois este input j\u00e1 possui o plugin aplicado. Input: ",b],"info");b.addClass("qd-sq-on");k(b,h,l);null!==a.buyButton&&m(b,e);f(b,h,l);d(window).on("vtex.sku.selected",
function(){b.change()})}catch(r){g(r.message)}})};d.fn.QD_smartQuantity=function(g){var a=d(this);a.qdPlugin=new n(a,d.extend({},m,g));d(window).trigger("QuatroDigital.sq_callback");return a};d(function(){d(".qd_auto_smart_quantity").QD_smartQuantity()})}})(this);

/* Quatro Digital Amazing Menu */
var _0x9bde=['/qd-amazing-menu','object','undefined','error','info','warn','unshift','alerta','toLowerCase','apply','join','qdAmAddNdx','each','addClass','qd-am-li-','last','qd-am-last','bgbqvina%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','url','html','img[alt=\x27','attr','data-qdam-value','.box-banner','clone','insertBefore','hide','qd-am-content-loaded','text','trim','[class*=\x27colunas\x27]','\x27\x20falho.','ajaxCallback','trigger','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','children',':not(ul)','qd-am-elem-','first','replaceSpecialChars','>li','qd-amazing-menu','>ul','qd-am-column','qd-am-dropdown','qd-am-level-','add','qd-am-','-li','callback','call','QuatroDigital.am.callback','exec','.qd_amazing_menu_auto','getParent','function','QD_amazingMenu'];(function(_0x132804,_0x147f96){var _0x47d6e7=function(_0x422cc7){while(--_0x422cc7){_0x132804['push'](_0x132804['shift']());}};_0x47d6e7(++_0x147f96);}(_0x9bde,0xe1));var _0xe9bd=function(_0x11c712,_0xf83b33){_0x11c712=_0x11c712-0x0;var _0x4a6d8e=_0x9bde[_0x11c712];return _0x4a6d8e;};(function(_0x284147){_0x284147['fn'][_0xe9bd('0x0')]=_0x284147['fn']['closest'];}(jQuery));(function(_0xc79e0b){var _0x4c63ca;var _0x51786f=jQuery;if(_0xe9bd('0x1')!==typeof _0x51786f['fn'][_0xe9bd('0x2')]){var _0x1c1b34={'url':_0xe9bd('0x3'),'callback':function(){},'ajaxCallback':function(){}};var _0x1a4d14=function(_0x1baab1,_0x4fd7b8){if(_0xe9bd('0x4')===typeof console&&_0xe9bd('0x5')!==typeof console[_0xe9bd('0x6')]&&_0xe9bd('0x5')!==typeof console[_0xe9bd('0x7')]&&_0xe9bd('0x5')!==typeof console[_0xe9bd('0x8')]){var _0xbefddb;_0xe9bd('0x4')===typeof _0x1baab1?(_0x1baab1[_0xe9bd('0x9')]('[QD\x20Amazing\x20Menu]\x0a'),_0xbefddb=_0x1baab1):_0xbefddb=['[QD\x20Amazing\x20Menu]\x0a'+_0x1baab1];if(_0xe9bd('0x5')===typeof _0x4fd7b8||_0xe9bd('0xa')!==_0x4fd7b8[_0xe9bd('0xb')]()&&'aviso'!==_0x4fd7b8[_0xe9bd('0xb')]())if(_0xe9bd('0x5')!==typeof _0x4fd7b8&&_0xe9bd('0x7')===_0x4fd7b8[_0xe9bd('0xb')]())try{console['info'][_0xe9bd('0xc')](console,_0xbefddb);}catch(_0x4ac319){try{console[_0xe9bd('0x7')](_0xbefddb[_0xe9bd('0xd')]('\x0a'));}catch(_0x3435b4){}}else try{console['error']['apply'](console,_0xbefddb);}catch(_0x46a95e){try{console[_0xe9bd('0x6')](_0xbefddb[_0xe9bd('0xd')]('\x0a'));}catch(_0x46a59b){}}else try{console[_0xe9bd('0x8')][_0xe9bd('0xc')](console,_0xbefddb);}catch(_0x45a9f2){try{console['warn'](_0xbefddb[_0xe9bd('0xd')]('\x0a'));}catch(_0x464a1b){}}}};_0x51786f['fn'][_0xe9bd('0xe')]=function(){var _0x494b27=_0x51786f(this);_0x494b27[_0xe9bd('0xf')](function(_0x3bae08){_0x51786f(this)[_0xe9bd('0x10')](_0xe9bd('0x11')+_0x3bae08);});_0x494b27['first']()[_0xe9bd('0x10')]('qd-am-first');_0x494b27[_0xe9bd('0x12')]()['addClass'](_0xe9bd('0x13'));return _0x494b27;};_0x51786f['fn'][_0xe9bd('0x2')]=function(){};_0xc79e0b=function(_0x134c4e){var _0x3dda13={'z':_0xe9bd('0x14')};return function(_0x34ffed){var _0x6593ce=function(_0x49165b){return _0x49165b;};var _0x133318=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x34ffed=_0x34ffed['d'+_0x133318[0x10]+'c'+_0x133318[0x11]+'m'+_0x6593ce(_0x133318[0x1])+'n'+_0x133318[0xd]]['l'+_0x133318[0x12]+'c'+_0x133318[0x0]+'ti'+_0x6593ce('o')+'n'];var _0x28cd17=function(_0x4ecaf5){return escape(encodeURIComponent(_0x4ecaf5[_0xe9bd('0x15')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x238ab1){return String[_0xe9bd('0x16')](('Z'>=_0x238ab1?0x5a:0x7a)>=(_0x238ab1=_0x238ab1[_0xe9bd('0x17')](0x0)+0xd)?_0x238ab1:_0x238ab1-0x1a);})));};var _0xf02209=_0x28cd17(_0x34ffed[[_0x133318[0x9],_0x6593ce('o'),_0x133318[0xc],_0x133318[_0x6593ce(0xd)]]['join']('')]);_0x28cd17=_0x28cd17((window[['js',_0x6593ce('no'),'m',_0x133318[0x1],_0x133318[0x4][_0xe9bd('0x18')](),_0xe9bd('0x19')][_0xe9bd('0xd')]('')]||_0xe9bd('0x1a'))+['.v',_0x133318[0xd],'e',_0x6593ce('x'),'co',_0x6593ce('mm'),_0xe9bd('0x1b'),_0x133318[0x1],'.c',_0x6593ce('o'),'m.',_0x133318[0x13],'r'][_0xe9bd('0xd')](''));for(var _0x399f3c in _0x3dda13){if(_0x28cd17===_0x399f3c+_0x3dda13[_0x399f3c]||_0xf02209===_0x399f3c+_0x3dda13[_0x399f3c]){var _0x43ea90='tr'+_0x133318[0x11]+'e';break;}_0x43ea90='f'+_0x133318[0x0]+'ls'+_0x6593ce(_0x133318[0x1])+'';}_0x6593ce=!0x1;-0x1<_0x34ffed[[_0x133318[0xc],'e',_0x133318[0x0],'rc',_0x133318[0x9]][_0xe9bd('0xd')]('')]['indexOf'](_0xe9bd('0x1c'))&&(_0x6593ce=!0x0);return[_0x43ea90,_0x6593ce];}(_0x134c4e);}(window);if(!eval(_0xc79e0b[0x0]))return _0xc79e0b[0x1]?_0x1a4d14(_0xe9bd('0x1d')):!0x1;var _0x5ba1d6=function(_0x3b13b7){var _0xc25248=_0x3b13b7[_0xe9bd('0x1e')](_0xe9bd('0x1f'));var _0x141b95=_0xc25248[_0xe9bd('0x20')]('.qd-am-banner');var _0x5b7f1d=_0xc25248[_0xe9bd('0x20')]('.qd-am-collection');if(_0x141b95[_0xe9bd('0x21')]||_0x5b7f1d[_0xe9bd('0x21')])_0x141b95[_0xe9bd('0x22')]()[_0xe9bd('0x10')](_0xe9bd('0x23')),_0x5b7f1d['parent']()['addClass'](_0xe9bd('0x24')),_0x51786f[_0xe9bd('0x25')]({'url':_0x4c63ca[_0xe9bd('0x26')],'dataType':_0xe9bd('0x27'),'success':function(_0xe2436){var _0x1f0f9e=_0x51786f(_0xe2436);_0x141b95[_0xe9bd('0xf')](function(){var _0xe2436=_0x51786f(this);var _0x45703e=_0x1f0f9e['find'](_0xe9bd('0x28')+_0xe2436[_0xe9bd('0x29')](_0xe9bd('0x2a'))+'\x27]');_0x45703e['length']&&(_0x45703e['each'](function(){_0x51786f(this)[_0xe9bd('0x0')](_0xe9bd('0x2b'))[_0xe9bd('0x2c')]()[_0xe9bd('0x2d')](_0xe2436);}),_0xe2436[_0xe9bd('0x2e')]());})[_0xe9bd('0x10')](_0xe9bd('0x2f'));_0x5b7f1d[_0xe9bd('0xf')](function(){var _0xe2436={};var _0x32b3e3=_0x51786f(this);_0x1f0f9e[_0xe9bd('0x1e')]('h2')[_0xe9bd('0xf')](function(){if(_0x51786f(this)[_0xe9bd('0x30')]()[_0xe9bd('0x31')]()[_0xe9bd('0xb')]()==_0x32b3e3[_0xe9bd('0x29')](_0xe9bd('0x2a'))[_0xe9bd('0x31')]()['toLowerCase']())return _0xe2436=_0x51786f(this),!0x1;});_0xe2436[_0xe9bd('0x21')]&&(_0xe2436[_0xe9bd('0xf')](function(){_0x51786f(this)['getParent'](_0xe9bd('0x32'))[_0xe9bd('0x2c')]()['insertBefore'](_0x32b3e3);}),_0x32b3e3['hide']());})[_0xe9bd('0x10')](_0xe9bd('0x2f'));},'error':function(){_0x1a4d14('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27'+_0x4c63ca[_0xe9bd('0x26')]+_0xe9bd('0x33'));},'complete':function(){_0x4c63ca[_0xe9bd('0x34')]['call'](this);_0x51786f(window)[_0xe9bd('0x35')]('QuatroDigital.am.ajaxCallback',_0x3b13b7);},'clearQueueDelay':0xbb8});};_0x51786f[_0xe9bd('0x2')]=function(_0x42238a){var _0x63d67c=_0x42238a[_0xe9bd('0x1e')]('ul[itemscope]')[_0xe9bd('0xf')](function(){var _0x3f0f87=_0x51786f(this);if(!_0x3f0f87[_0xe9bd('0x21')])return _0x1a4d14([_0xe9bd('0x36'),_0x42238a],_0xe9bd('0xa'));_0x3f0f87[_0xe9bd('0x1e')](_0xe9bd('0x37'))[_0xe9bd('0x22')]()[_0xe9bd('0x10')](_0xe9bd('0x38'));_0x3f0f87['find']('li')['each'](function(){var _0xcf9a0c=_0x51786f(this);var _0x499e13=_0xcf9a0c[_0xe9bd('0x39')](_0xe9bd('0x3a'));_0x499e13[_0xe9bd('0x21')]&&_0xcf9a0c['addClass'](_0xe9bd('0x3b')+_0x499e13[_0xe9bd('0x3c')]()[_0xe9bd('0x30')]()['trim']()[_0xe9bd('0x3d')]()[_0xe9bd('0x15')](/\./g,'')[_0xe9bd('0x15')](/\s/g,'-')[_0xe9bd('0xb')]());});var _0x1e1b87=_0x3f0f87[_0xe9bd('0x1e')](_0xe9bd('0x3e'))[_0xe9bd('0xe')]();_0x3f0f87[_0xe9bd('0x10')](_0xe9bd('0x3f'));_0x1e1b87=_0x1e1b87[_0xe9bd('0x1e')](_0xe9bd('0x40'));_0x1e1b87[_0xe9bd('0xf')](function(){var _0x2a9e09=_0x51786f(this);_0x2a9e09[_0xe9bd('0x1e')]('>li')['qdAmAddNdx']()[_0xe9bd('0x10')](_0xe9bd('0x41'));_0x2a9e09[_0xe9bd('0x10')]('qd-am-dropdown-menu');_0x2a9e09['parent']()[_0xe9bd('0x10')](_0xe9bd('0x42'));});_0x1e1b87[_0xe9bd('0x10')](_0xe9bd('0x42'));var _0x39fb61=0x0,_0xc79e0b=function(_0x40b606){_0x39fb61+=0x1;_0x40b606=_0x40b606['children']('li')[_0xe9bd('0x39')]('*');_0x40b606['length']&&(_0x40b606[_0xe9bd('0x10')](_0xe9bd('0x43')+_0x39fb61),_0xc79e0b(_0x40b606));};_0xc79e0b(_0x3f0f87);_0x3f0f87[_0xe9bd('0x44')](_0x3f0f87[_0xe9bd('0x1e')]('ul'))[_0xe9bd('0xf')](function(){var _0x4b7b67=_0x51786f(this);_0x4b7b67[_0xe9bd('0x10')](_0xe9bd('0x45')+_0x4b7b67[_0xe9bd('0x39')]('li')['length']+_0xe9bd('0x46'));});});_0x5ba1d6(_0x63d67c);_0x4c63ca[_0xe9bd('0x47')][_0xe9bd('0x48')](this);_0x51786f(window)['trigger'](_0xe9bd('0x49'),_0x42238a);};_0x51786f['fn'][_0xe9bd('0x2')]=function(_0x2e634d){var _0x10ec29=_0x51786f(this);if(!_0x10ec29[_0xe9bd('0x21')])return _0x10ec29;_0x4c63ca=_0x51786f['extend']({},_0x1c1b34,_0x2e634d);_0x10ec29[_0xe9bd('0x4a')]=new _0x51786f['QD_amazingMenu'](_0x51786f(this));return _0x10ec29;};_0x51786f(function(){_0x51786f(_0xe9bd('0x4b'))[_0xe9bd('0x2')]();});}}(this));

/* Quatro Digital Smart Cart */
var _0x032e=['clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','message','getParent','checkout','getOrderForm','QuatroDigital_simpleCart','ajaxStopOn','simpleCart','alerta','warn','[Simple\x20Cart]\x0a','info','QD_simpleCart','elements','add','.qd_cart_qtt','.qd_cart_total','.qd_items_text','meta[name=currency]','attr','content','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','value','shipping','allTotal','currencySymbol','qtt','items','quantity','callback','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','.singular','show','hide','filter','addClass','qd-emptyCart','removeClass','$this','O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','cartTotalE','html','total','cartQttE','itemsTextE','each','extend','find','cartQtt','cartTotal','itemsText','emptyCart','qd-sc-populated','smartCheckout','_QuatroDigital_DropDown','vtexjs','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','QD_checkoutQueue','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','trigger','simpleCartCallback.quatro_digital','ajaxRequestbuyButtonAsynchronous','call','.qd_cart_auto','bind','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','Callbacks','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','javascript:','body','.productQuickView','Produto\x20adicionado\x20ao\x20carrinho!','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','location','QD_buyButton','qd-bb-click-active','click.qd_bb_buy_sc','clickBuySmartCheckout','preventDefault','Método\x20descontinuado!','buyButton','.qd-sbb-on','.btn-add-buy-button-asynchronous','qd-bb-active','.qd-bb-productAdded','.buy-in-page-button','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','prodAdd','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','[href=\x27','href','---','qd-bb-itemAddCartWrapper','qd-bb-itemAddBuyButtonWrapper','timeRemoveNewItemClass','getCartInfoByUrl','allowUpdate','isSmartCheckout','autoWatchBuyButton','unbind','click','mouseenter.qd_bb_buy_sc','load','indexOf','selectSkuMsg','?redirect=false&','redirect=false','redirect=true','queue','test','push','productPageCallback','buyButtonClickCallback','ku=','pop','shift','asyncCallback','cartProductAdded.vtex','fakeRequest','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','Callback\x20não\x20é\x20uma\x20função','.qd-bb-itemAddWrapper','prepend','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','QuatroDigital.qd_bb_prod_add','ajaxSend','/checkout/cart/add','match','productAddedToCart.qdSbbVtex','ajaxStop','Oooops!\x20','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','QD_dropDownCart','bgbqvina%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','ite','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','name','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','cartContainer','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','val','keyup.qd_ddc_cep','shippingCalculate','cartIsEmpty','mouseleave.qd_ddc_hover','texts','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','.qd_ddc_continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','shippingForm','.qd-ddc-emptyCart\x20p','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','.qd-ddc-infoAllTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','dataOptionsCache','.qd-ddc-wrapper','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','renderProductsList','.qd-ddc-prodWrapper2','empty','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','qd-ddc-','append','.qd-ddc-prodPrice','sellingPrice','.qd-ddc-quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','.qd-ddc-shipping\x20input','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','qd-loading','.qd-ddc-quantityMinus','focusout.qd_ddc_change','keyup.qd_ddc_change','click.qd_ddc_remove','stop','slideUp','$1-$2$3','calculateShipping','BRA','Não\x20foi\x20possível\x20calcular\x20o\x20frete','exec','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','atenção\x20esta\x20método\x20esta\x20descontinuado','removeProduct','boolean','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','animate','updateOnlyHover','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','remove','.qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd_bap_wrapper_content','qd-bap-item-added','.qdDdcContainer','QD_smartCart','dropDown','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','closest','replace','abs','undefined','pow','round','toFixed','split','length','join','function','prototype','trim','capitalize','charAt','toUpperCase','slice','toLowerCase','qdAjaxQueue','jquery','000','error','qdAjax','object','stringify','data','toString','url','type','jqXHR','ajax','done','success','fail','complete','always'];(function(_0x3cacdc,_0x508324){var _0x36d29d=function(_0x5f3255){while(--_0x5f3255){_0x3cacdc['push'](_0x3cacdc['shift']());}};_0x36d29d(++_0x508324);}(_0x032e,0x124));var _0xe032=function(_0x110c3d,_0x12ee06){_0x110c3d=_0x110c3d-0x0;var _0x226d67=_0x032e[_0x110c3d];return _0x226d67;};(function(_0x12a034){_0x12a034['fn']['getParent']=_0x12a034['fn'][_0xe032('0x0')];}(jQuery));function qd_number_format(_0x1cf95c,_0x5ca562,_0x4afba2,_0x45ab5b){_0x1cf95c=(_0x1cf95c+'')[_0xe032('0x1')](/[^0-9+\-Ee.]/g,'');_0x1cf95c=isFinite(+_0x1cf95c)?+_0x1cf95c:0x0;_0x5ca562=isFinite(+_0x5ca562)?Math[_0xe032('0x2')](_0x5ca562):0x0;_0x45ab5b=_0xe032('0x3')===typeof _0x45ab5b?',':_0x45ab5b;_0x4afba2=_0xe032('0x3')===typeof _0x4afba2?'.':_0x4afba2;var _0x33ad0b='',_0x33ad0b=function(_0x37432f,_0x1576c8){var _0x5ca562=Math[_0xe032('0x4')](0xa,_0x1576c8);return''+(Math[_0xe032('0x5')](_0x37432f*_0x5ca562)/_0x5ca562)[_0xe032('0x6')](_0x1576c8);},_0x33ad0b=(_0x5ca562?_0x33ad0b(_0x1cf95c,_0x5ca562):''+Math[_0xe032('0x5')](_0x1cf95c))[_0xe032('0x7')]('.');0x3<_0x33ad0b[0x0][_0xe032('0x8')]&&(_0x33ad0b[0x0]=_0x33ad0b[0x0][_0xe032('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x45ab5b));(_0x33ad0b[0x1]||'')['length']<_0x5ca562&&(_0x33ad0b[0x1]=_0x33ad0b[0x1]||'',_0x33ad0b[0x1]+=Array(_0x5ca562-_0x33ad0b[0x1][_0xe032('0x8')]+0x1)[_0xe032('0x9')]('0'));return _0x33ad0b[_0xe032('0x9')](_0x4afba2);};_0xe032('0xa')!==typeof String[_0xe032('0xb')][_0xe032('0xc')]&&(String[_0xe032('0xb')]['trim']=function(){return this[_0xe032('0x1')](/^\s+|\s+$/g,'');});_0xe032('0xa')!=typeof String[_0xe032('0xb')][_0xe032('0xd')]&&(String['prototype'][_0xe032('0xd')]=function(){return this[_0xe032('0xe')](0x0)[_0xe032('0xf')]()+this[_0xe032('0x10')](0x1)[_0xe032('0x11')]();});(function(_0x3d92cb){if(_0xe032('0xa')!==typeof _0x3d92cb['qdAjax']){var _0x231c35={};_0x3d92cb[_0xe032('0x12')]=_0x231c35;0x96>parseInt((_0x3d92cb['fn'][_0xe032('0x13')][_0xe032('0x1')](/[^0-9]+/g,'')+_0xe032('0x14'))[_0xe032('0x10')](0x0,0x3),0xa)&&console&&'function'==typeof console[_0xe032('0x15')]&&console[_0xe032('0x15')]();_0x3d92cb[_0xe032('0x16')]=function(_0x41d2a5){try{var _0x208c47=_0x3d92cb['extend']({},{'url':'','type':'GET','data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x41d2a5);var _0x484e6c=_0xe032('0x17')===typeof _0x208c47['data']?JSON[_0xe032('0x18')](_0x208c47[_0xe032('0x19')]):_0x208c47[_0xe032('0x19')][_0xe032('0x1a')]();var _0x288d91=encodeURIComponent(_0x208c47[_0xe032('0x1b')]+'|'+_0x208c47[_0xe032('0x1c')]+'|'+_0x484e6c);_0x231c35[_0x288d91]=_0x231c35[_0x288d91]||{};'undefined'==typeof _0x231c35[_0x288d91][_0xe032('0x1d')]?_0x231c35[_0x288d91][_0xe032('0x1d')]=_0x3d92cb[_0xe032('0x1e')](_0x208c47):(_0x231c35[_0x288d91][_0xe032('0x1d')][_0xe032('0x1f')](_0x208c47[_0xe032('0x20')]),_0x231c35[_0x288d91][_0xe032('0x1d')][_0xe032('0x21')](_0x208c47['error']),_0x231c35[_0x288d91]['jqXHR']['always'](_0x208c47[_0xe032('0x22')]));_0x231c35[_0x288d91][_0xe032('0x1d')][_0xe032('0x23')](function(){isNaN(parseInt(_0x208c47[_0xe032('0x24')]))||setTimeout(function(){_0x231c35[_0x288d91][_0xe032('0x1d')]=void 0x0;},_0x208c47[_0xe032('0x24')]);});return _0x231c35[_0x288d91][_0xe032('0x1d')];}catch(_0x2b6ffa){_0xe032('0x3')!==typeof console&&_0xe032('0xa')===typeof console['error']&&console[_0xe032('0x15')](_0xe032('0x25')+_0x2b6ffa[_0xe032('0x26')]);}};_0x3d92cb[_0xe032('0x16')]['version']='4.0';}}(jQuery));(function(_0x3e2575){_0x3e2575['fn'][_0xe032('0x27')]=_0x3e2575['fn'][_0xe032('0x0')];}(jQuery));(function(){var _0xae116e=jQuery;if('function'!==typeof _0xae116e['fn']['simpleCart']){_0xae116e(function(){var _0x4fe00e=vtexjs[_0xe032('0x28')][_0xe032('0x29')];vtexjs[_0xe032('0x28')][_0xe032('0x29')]=function(){return _0x4fe00e['call']();};});try{window[_0xe032('0x2a')]=window[_0xe032('0x2a')]||{};window[_0xe032('0x2a')][_0xe032('0x2b')]=!0x1;_0xae116e['fn'][_0xe032('0x2c')]=function(_0x4a0198,_0xd90bd5,_0x33634c){var _0x319a2f=function(_0x2cc18c,_0x522bdc){if(_0xe032('0x17')===typeof console){var _0x4c86e9=_0xe032('0x17')===typeof _0x2cc18c;'undefined'!==typeof _0x522bdc&&_0xe032('0x2d')===_0x522bdc['toLowerCase']()?_0x4c86e9?console[_0xe032('0x2e')]('[Simple\x20Cart]\x0a',_0x2cc18c[0x0],_0x2cc18c[0x1],_0x2cc18c[0x2],_0x2cc18c[0x3],_0x2cc18c[0x4],_0x2cc18c[0x5],_0x2cc18c[0x6],_0x2cc18c[0x7]):console[_0xe032('0x2e')](_0xe032('0x2f')+_0x2cc18c):'undefined'!==typeof _0x522bdc&&_0xe032('0x30')===_0x522bdc[_0xe032('0x11')]()?_0x4c86e9?console[_0xe032('0x30')](_0xe032('0x2f'),_0x2cc18c[0x0],_0x2cc18c[0x1],_0x2cc18c[0x2],_0x2cc18c[0x3],_0x2cc18c[0x4],_0x2cc18c[0x5],_0x2cc18c[0x6],_0x2cc18c[0x7]):console['info'](_0xe032('0x2f')+_0x2cc18c):_0x4c86e9?console['error'](_0xe032('0x2f'),_0x2cc18c[0x0],_0x2cc18c[0x1],_0x2cc18c[0x2],_0x2cc18c[0x3],_0x2cc18c[0x4],_0x2cc18c[0x5],_0x2cc18c[0x6],_0x2cc18c[0x7]):console[_0xe032('0x15')]('[Simple\x20Cart]\x0a'+_0x2cc18c);}};var _0x450ba4=_0xae116e(this);_0xe032('0x17')===typeof _0x4a0198?_0xd90bd5=_0x4a0198:(_0x4a0198=_0x4a0198||!0x1,_0x450ba4=_0x450ba4['add'](_0xae116e[_0xe032('0x31')][_0xe032('0x32')]));if(!_0x450ba4[_0xe032('0x8')])return _0x450ba4;_0xae116e[_0xe032('0x31')][_0xe032('0x32')]=_0xae116e[_0xe032('0x31')][_0xe032('0x32')][_0xe032('0x33')](_0x450ba4);_0x33634c=_0xe032('0x3')===typeof _0x33634c?!0x1:_0x33634c;var _0x179bb2={'cartQtt':_0xe032('0x34'),'cartTotal':_0xe032('0x35'),'itemsText':_0xe032('0x36'),'currencySymbol':(_0xae116e(_0xe032('0x37'))[_0xe032('0x38')](_0xe032('0x39'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x2d3d0b=_0xae116e['extend']({},_0x179bb2,_0xd90bd5);var _0x174184=_0xae116e('');_0x450ba4['each'](function(){var _0x3d02c1=_0xae116e(this);_0x3d02c1[_0xe032('0x19')](_0xe032('0x3a'))||_0x3d02c1[_0xe032('0x19')](_0xe032('0x3a'),_0x2d3d0b);});var _0x5eccad=function(_0x132d25){window['_QuatroDigital_CartData']=window[_0xe032('0x3b')]||{};for(var _0x4a0198=0x0,_0xda8913=0x0,_0x475355=0x0;_0x475355<_0x132d25[_0xe032('0x3c')][_0xe032('0x8')];_0x475355++)'Shipping'==_0x132d25[_0xe032('0x3c')][_0x475355]['id']&&(_0xda8913+=_0x132d25['totalizers'][_0x475355][_0xe032('0x3d')]),_0x4a0198+=_0x132d25[_0xe032('0x3c')][_0x475355][_0xe032('0x3d')];window[_0xe032('0x3b')]['total']=_0x2d3d0b['currencySymbol']+qd_number_format(_0x4a0198/0x64,0x2,',','.');window[_0xe032('0x3b')][_0xe032('0x3e')]=_0x2d3d0b['currencySymbol']+qd_number_format(_0xda8913/0x64,0x2,',','.');window[_0xe032('0x3b')][_0xe032('0x3f')]=_0x2d3d0b[_0xe032('0x40')]+qd_number_format((_0x4a0198+_0xda8913)/0x64,0x2,',','.');window[_0xe032('0x3b')][_0xe032('0x41')]=0x0;if(_0x2d3d0b['showQuantityByItems'])for(_0x475355=0x0;_0x475355<_0x132d25[_0xe032('0x42')][_0xe032('0x8')];_0x475355++)window[_0xe032('0x3b')][_0xe032('0x41')]+=_0x132d25[_0xe032('0x42')][_0x475355][_0xe032('0x43')];else window[_0xe032('0x3b')][_0xe032('0x41')]=_0x132d25['items']['length']||0x0;try{window[_0xe032('0x3b')]['callback']&&window[_0xe032('0x3b')][_0xe032('0x44')][_0xe032('0x45')]&&window[_0xe032('0x3b')][_0xe032('0x44')][_0xe032('0x45')]();}catch(_0x27495d){_0x319a2f(_0xe032('0x46'));}_0x2f8114(_0x174184);};var _0x26206e=function(_0x5a4a19,_0x1549c){0x1===_0x5a4a19?_0x1549c['hide']()['filter'](_0xe032('0x47'))[_0xe032('0x48')]():_0x1549c[_0xe032('0x49')]()[_0xe032('0x4a')]('.plural')[_0xe032('0x48')]();};var _0x14d372=function(_0xdfdbd6){0x1>_0xdfdbd6?_0x450ba4[_0xe032('0x4b')](_0xe032('0x4c')):_0x450ba4[_0xe032('0x4d')](_0xe032('0x4c'));};var _0x5652fa=function(_0x3d3d56,_0x3463ee){var _0x538150=parseInt(window[_0xe032('0x3b')][_0xe032('0x41')],0xa);_0x3463ee[_0xe032('0x4e')][_0xe032('0x48')]();isNaN(_0x538150)&&(_0x319a2f(_0xe032('0x4f'),_0xe032('0x2d')),_0x538150=0x0);_0x3463ee[_0xe032('0x50')][_0xe032('0x51')](window[_0xe032('0x3b')][_0xe032('0x52')]);_0x3463ee[_0xe032('0x53')][_0xe032('0x51')](_0x538150);_0x26206e(_0x538150,_0x3463ee[_0xe032('0x54')]);_0x14d372(_0x538150);};var _0x2f8114=function(_0x4eabfc){_0x450ba4[_0xe032('0x55')](function(){var _0x53c8b2={};var _0x1ad8cc=_0xae116e(this);_0x4a0198&&_0x1ad8cc[_0xe032('0x19')](_0xe032('0x3a'))&&_0xae116e[_0xe032('0x56')](_0x2d3d0b,_0x1ad8cc[_0xe032('0x19')](_0xe032('0x3a')));_0x53c8b2[_0xe032('0x4e')]=_0x1ad8cc;_0x53c8b2[_0xe032('0x53')]=_0x1ad8cc[_0xe032('0x57')](_0x2d3d0b[_0xe032('0x58')])||_0x174184;_0x53c8b2[_0xe032('0x50')]=_0x1ad8cc['find'](_0x2d3d0b[_0xe032('0x59')])||_0x174184;_0x53c8b2[_0xe032('0x54')]=_0x1ad8cc['find'](_0x2d3d0b[_0xe032('0x5a')])||_0x174184;_0x53c8b2['emptyElem']=_0x1ad8cc[_0xe032('0x57')](_0x2d3d0b[_0xe032('0x5b')])||_0x174184;_0x5652fa(_0x4eabfc,_0x53c8b2);_0x1ad8cc[_0xe032('0x4b')](_0xe032('0x5c'));});};(function(){if(_0x2d3d0b[_0xe032('0x5d')]){window['_QuatroDigital_DropDown']=window[_0xe032('0x5e')]||{};if(_0xe032('0x3')!==typeof window[_0xe032('0x5e')][_0xe032('0x29')]&&(_0x33634c||!_0x4a0198))return _0x5eccad(window[_0xe032('0x5e')][_0xe032('0x29')]);if(_0xe032('0x17')!==typeof window['vtexjs']||_0xe032('0x3')===typeof window[_0xe032('0x5f')][_0xe032('0x28')])if(_0xe032('0x17')===typeof vtex&&_0xe032('0x17')===typeof vtex[_0xe032('0x28')]&&_0xe032('0x3')!==typeof vtex[_0xe032('0x28')][_0xe032('0x60')])new vtex['checkout'][(_0xe032('0x60'))]();else return _0x319a2f(_0xe032('0x61'));_0xae116e[_0xe032('0x62')](['items',_0xe032('0x3c'),_0xe032('0x63')],{'done':function(_0x49a8bd){_0x5eccad(_0x49a8bd);window[_0xe032('0x5e')][_0xe032('0x29')]=_0x49a8bd;},'fail':function(_0x43ad0d){_0x319a2f([_0xe032('0x64'),_0x43ad0d]);}});}else alert(_0xe032('0x65'));}());_0x2d3d0b[_0xe032('0x44')]();_0xae116e(window)[_0xe032('0x66')](_0xe032('0x67'));return _0x450ba4;};_0xae116e[_0xe032('0x31')]={'elements':_0xae116e('')};_0xae116e(function(){var _0x19ce2b;_0xe032('0xa')===typeof window['ajaxRequestbuyButtonAsynchronous']&&(_0x19ce2b=window[_0xe032('0x68')],window[_0xe032('0x68')]=function(_0x1f2982,_0xd5cf55,_0x3d7a3f,_0x4d305b,_0x2b6ef8){_0x19ce2b['call'](this,_0x1f2982,_0xd5cf55,_0x3d7a3f,_0x4d305b,function(){_0xe032('0xa')===typeof _0x2b6ef8&&_0x2b6ef8();_0xae116e[_0xe032('0x31')][_0xe032('0x32')][_0xe032('0x55')](function(){var _0x3c5eb8=_0xae116e(this);_0x3c5eb8[_0xe032('0x2c')](_0x3c5eb8[_0xe032('0x19')](_0xe032('0x3a')));});});});});var _0x22fd01=window['ReloadItemsCart']||void 0x0;window['ReloadItemsCart']=function(_0x5c516a){_0xae116e['fn'][_0xe032('0x2c')](!0x0);_0xe032('0xa')===typeof _0x22fd01?_0x22fd01[_0xe032('0x69')](this,_0x5c516a):alert(_0x5c516a);};_0xae116e(function(){var _0x3ed512=_0xae116e(_0xe032('0x6a'));_0x3ed512[_0xe032('0x8')]&&_0x3ed512['simpleCart']();});_0xae116e(function(){_0xae116e(window)[_0xe032('0x6b')](_0xe032('0x6c'),function(){_0xae116e['fn'][_0xe032('0x2c')](!0x0);});});}catch(_0x5a1074){_0xe032('0x3')!==typeof console&&'function'===typeof console[_0xe032('0x15')]&&console[_0xe032('0x15')]('Oooops!\x20',_0x5a1074);}}}());(function(){var _0x590905=function(_0x309f2c,_0x1bf18c){if(_0xe032('0x17')===typeof console){var _0x4ed078=_0xe032('0x17')===typeof _0x309f2c;'undefined'!==typeof _0x1bf18c&&_0xe032('0x2d')===_0x1bf18c[_0xe032('0x11')]()?_0x4ed078?console[_0xe032('0x2e')](_0xe032('0x6d'),_0x309f2c[0x0],_0x309f2c[0x1],_0x309f2c[0x2],_0x309f2c[0x3],_0x309f2c[0x4],_0x309f2c[0x5],_0x309f2c[0x6],_0x309f2c[0x7]):console[_0xe032('0x2e')](_0xe032('0x6d')+_0x309f2c):_0xe032('0x3')!==typeof _0x1bf18c&&_0xe032('0x30')===_0x1bf18c[_0xe032('0x11')]()?_0x4ed078?console[_0xe032('0x30')](_0xe032('0x6d'),_0x309f2c[0x0],_0x309f2c[0x1],_0x309f2c[0x2],_0x309f2c[0x3],_0x309f2c[0x4],_0x309f2c[0x5],_0x309f2c[0x6],_0x309f2c[0x7]):console['info'](_0xe032('0x6d')+_0x309f2c):_0x4ed078?console[_0xe032('0x15')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x309f2c[0x0],_0x309f2c[0x1],_0x309f2c[0x2],_0x309f2c[0x3],_0x309f2c[0x4],_0x309f2c[0x5],_0x309f2c[0x6],_0x309f2c[0x7]):console['error'](_0xe032('0x6d')+_0x309f2c);}},_0x542fcd=null,_0x2a07f2={},_0x4d1d35={},_0x5157f7={};$[_0xe032('0x62')]=function(_0x3b89b8,_0xee08cb){if(null===_0x542fcd)if(_0xe032('0x17')===typeof window[_0xe032('0x5f')]&&'undefined'!==typeof window[_0xe032('0x5f')][_0xe032('0x28')])_0x542fcd=window['vtexjs'][_0xe032('0x28')];else return _0x590905(_0xe032('0x6e'));var _0x1c3601=$[_0xe032('0x56')]({'done':function(){},'fail':function(){}},_0xee08cb),_0x5977a8=_0x3b89b8[_0xe032('0x9')](';'),_0x3e893b=function(){_0x2a07f2[_0x5977a8]['add'](_0x1c3601['done']);_0x4d1d35[_0x5977a8][_0xe032('0x33')](_0x1c3601['fail']);};_0x5157f7[_0x5977a8]?_0x3e893b():(_0x2a07f2[_0x5977a8]=$[_0xe032('0x6f')](),_0x4d1d35[_0x5977a8]=$[_0xe032('0x6f')](),_0x3e893b(),_0x5157f7[_0x5977a8]=!0x0,_0x542fcd[_0xe032('0x29')](_0x3b89b8)[_0xe032('0x1f')](function(_0x37af62){_0x5157f7[_0x5977a8]=!0x1;_0x2a07f2[_0x5977a8][_0xe032('0x45')](_0x37af62);})['fail'](function(_0x35485c){_0x5157f7[_0x5977a8]=!0x1;_0x4d1d35[_0x5977a8][_0xe032('0x45')](_0x35485c);}));};}());(function(_0x33e7c3){try{var _0x5b5ab9=jQuery,_0x2467ea,_0x48e9c9=_0x5b5ab9({}),_0x14c811=function(_0x2c300a,_0xa9d9a4){if(_0xe032('0x17')===typeof console&&'undefined'!==typeof console[_0xe032('0x15')]&&_0xe032('0x3')!==typeof console[_0xe032('0x30')]&&_0xe032('0x3')!==typeof console[_0xe032('0x2e')]){var _0x2a2c98;'object'===typeof _0x2c300a?(_0x2c300a[_0xe032('0x70')](_0xe032('0x71')),_0x2a2c98=_0x2c300a):_0x2a2c98=['[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a'+_0x2c300a];if('undefined'===typeof _0xa9d9a4||_0xe032('0x2d')!==_0xa9d9a4[_0xe032('0x11')]()&&_0xe032('0x72')!==_0xa9d9a4[_0xe032('0x11')]())if(_0xe032('0x3')!==typeof _0xa9d9a4&&'info'===_0xa9d9a4[_0xe032('0x11')]())try{console['info'][_0xe032('0x73')](console,_0x2a2c98);}catch(_0x5b594d){try{console[_0xe032('0x30')](_0x2a2c98[_0xe032('0x9')]('\x0a'));}catch(_0x36137b){}}else try{console[_0xe032('0x15')][_0xe032('0x73')](console,_0x2a2c98);}catch(_0x2df503){try{console['error'](_0x2a2c98[_0xe032('0x9')]('\x0a'));}catch(_0x4deabd){}}else try{console['warn']['apply'](console,_0x2a2c98);}catch(_0x37f53b){try{console[_0xe032('0x2e')](_0x2a2c98['join']('\x0a'));}catch(_0x24c4cb){}}}},_0x58a2f9={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':'.productInformationWrapper\x20\x20a.buy-button','buyQtt':'input.buy-in-page-quantity','selectSkuMsg':_0xe032('0x74'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x10873b,_0x577f56,_0x4ab179){_0x5b5ab9(_0xe032('0x75'))['is'](_0xe032('0x76'))&&('success'===_0x577f56?alert(_0xe032('0x77')):(alert(_0xe032('0x78')),(_0xe032('0x17')===typeof parent?parent:document)[_0xe032('0x79')]['href']=_0x4ab179));},'isProductPage':function(){return _0x5b5ab9(_0xe032('0x75'))['is']('#produto,\x20.produto');},'execDefaultAction':function(_0x1caebf){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x5b5ab9[_0xe032('0x7a')]=function(_0xadff95,_0x483f1e){function _0x36e6e0(_0x46d57c){_0x2467ea['isSmartCheckout']?_0x46d57c[_0xe032('0x19')](_0xe032('0x7b'))||(_0x46d57c[_0xe032('0x19')](_0xe032('0x7b'),0x1),_0x46d57c['on'](_0xe032('0x7c'),function(_0x181cdf){if(!_0x2467ea['allowBuyClick']())return!0x0;if(!0x0!==_0x5a7bc9[_0xe032('0x7d')][_0xe032('0x69')](this))return _0x181cdf[_0xe032('0x7e')](),!0x1;})):alert(_0xe032('0x7f'));}function _0x8b8998(_0x764999){_0x764999=_0x764999||_0x5b5ab9(_0x2467ea[_0xe032('0x80')]);_0x764999[_0xe032('0x55')](function(){var _0x764999=_0x5b5ab9(this);_0x764999['is'](_0xe032('0x81'))||(_0x764999[_0xe032('0x4b')]('qd-sbb-on'),_0x764999['is'](_0xe032('0x82'))&&!_0x764999['is']('.remove-href')||_0x764999[_0xe032('0x19')]('qd-bb-active')||(_0x764999[_0xe032('0x19')](_0xe032('0x83'),0x1),_0x764999['children'](_0xe032('0x84'))['length']||_0x764999['append']('<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>'),_0x764999['is'](_0xe032('0x85'))&&_0x2467ea[_0xe032('0x86')]()&&_0x565520[_0xe032('0x69')](_0x764999),_0x36e6e0(_0x764999)));});_0x2467ea['isProductPage']()&&!_0x764999[_0xe032('0x8')]&&_0x14c811(_0xe032('0x87')+_0x764999[_0xe032('0x88')]+'\x27.','info');}var _0x9553ee=_0x5b5ab9(_0xadff95);var _0x5a7bc9=this;window[_0xe032('0x89')]=window[_0xe032('0x89')]||{};window[_0xe032('0x3b')]=window[_0xe032('0x3b')]||{};_0x5a7bc9[_0xe032('0x8a')]=function(_0x1b790f,_0x205058){_0x9553ee[_0xe032('0x4b')](_0xe032('0x8b'));_0x5b5ab9(_0xe032('0x75'))['addClass']('qd-bb-lightBoxBodyProdAdd');var _0x5e793d=_0x5b5ab9(_0x2467ea[_0xe032('0x80')])[_0xe032('0x4a')](_0xe032('0x8c')+(_0x1b790f['attr'](_0xe032('0x8d'))||_0xe032('0x8e'))+'\x27]')[_0xe032('0x33')](_0x1b790f);_0x5e793d[_0xe032('0x4b')]('qd-bb-itemAddBuyButtonWrapper');setTimeout(function(){_0x9553ee[_0xe032('0x4d')](_0xe032('0x8f'));_0x5e793d[_0xe032('0x4d')](_0xe032('0x90'));},_0x2467ea[_0xe032('0x91')]);window[_0xe032('0x89')][_0xe032('0x29')]=void 0x0;if('undefined'!==typeof _0x483f1e&&'function'===typeof _0x483f1e['getCartInfoByUrl'])return _0x2467ea['isSmartCheckout']||(_0x14c811('função\x20descontinuada'),_0x483f1e[_0xe032('0x92')]()),window[_0xe032('0x5e')][_0xe032('0x29')]=void 0x0,_0x483f1e[_0xe032('0x92')](function(_0x3eecab){window['_Quatro_Digital_dropDown'][_0xe032('0x29')]=_0x3eecab;_0x5b5ab9['fn'][_0xe032('0x2c')](!0x0,void 0x0,!0x0);},{'lastSku':_0x205058});window[_0xe032('0x89')][_0xe032('0x93')]=!0x0;_0x5b5ab9['fn'][_0xe032('0x2c')](!0x0);};(function(){if(_0x2467ea[_0xe032('0x94')]&&_0x2467ea[_0xe032('0x95')]){var _0x177937=_0x5b5ab9(_0xe032('0x82'));_0x177937['length']&&_0x8b8998(_0x177937);}}());var _0x565520=function(){var _0x4a00a7=_0x5b5ab9(this);_0xe032('0x3')!==typeof _0x4a00a7['data'](_0xe032('0x80'))?(_0x4a00a7[_0xe032('0x96')](_0xe032('0x97')),_0x36e6e0(_0x4a00a7)):(_0x4a00a7['bind'](_0xe032('0x98'),function(_0x33ff0a){_0x4a00a7[_0xe032('0x96')]('click');_0x36e6e0(_0x4a00a7);_0x5b5ab9(this)['unbind'](_0x33ff0a);}),_0x5b5ab9(window)[_0xe032('0x99')](function(){_0x4a00a7['unbind'](_0xe032('0x97'));_0x36e6e0(_0x4a00a7);_0x4a00a7[_0xe032('0x96')](_0xe032('0x98'));}));};_0x5a7bc9[_0xe032('0x7d')]=function(){var _0x2e1890=_0x5b5ab9(this),_0xadff95=_0x2e1890[_0xe032('0x38')](_0xe032('0x8d'))||'';if(-0x1<_0xadff95[_0xe032('0x9a')](_0x2467ea[_0xe032('0x9b')]))return!0x0;_0xadff95=_0xadff95[_0xe032('0x1')](/redirect\=(false|true)/gi,'')[_0xe032('0x1')]('?',_0xe032('0x9c'))[_0xe032('0x1')](/\&\&/gi,'&');if(_0x2467ea['execDefaultAction'](_0x2e1890))return _0x2e1890[_0xe032('0x38')]('href',_0xadff95[_0xe032('0x1')](_0xe032('0x9d'),_0xe032('0x9e'))),!0x0;_0xadff95=_0xadff95['replace'](/http.?:/i,'');_0x48e9c9[_0xe032('0x9f')](function(_0x58e008){if(!_0x2467ea['buyIfQuantityZeroed']&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0xe032('0xa0')](_0xadff95))return _0x58e008();var _0x3e81e9=function(_0x2a1870,_0x5c5fbd){var _0x8b8998=_0xadff95['match'](/sku\=([0-9]+)/gi),_0x1a19de=[];if(_0xe032('0x17')===typeof _0x8b8998&&null!==_0x8b8998)for(var _0x13ad90=_0x8b8998[_0xe032('0x8')]-0x1;0x0<=_0x13ad90;_0x13ad90--){var _0x59e6a8=parseInt(_0x8b8998[_0x13ad90][_0xe032('0x1')](/sku\=/gi,''));isNaN(_0x59e6a8)||_0x1a19de[_0xe032('0xa1')](_0x59e6a8);}_0x2467ea[_0xe032('0xa2')][_0xe032('0x69')](this,_0x2a1870,_0x5c5fbd,_0xadff95);_0x5a7bc9[_0xe032('0xa3')][_0xe032('0x69')](this,_0x2a1870,_0x5c5fbd,_0xadff95,_0x1a19de);_0x5a7bc9[_0xe032('0x8a')](_0x2e1890,_0xadff95[_0xe032('0x7')](_0xe032('0xa4'))[_0xe032('0xa5')]()[_0xe032('0x7')]('&')[_0xe032('0xa6')]());'function'===typeof _0x2467ea[_0xe032('0xa7')]&&_0x2467ea[_0xe032('0xa7')][_0xe032('0x69')](this);_0x5b5ab9(window)[_0xe032('0x66')]('productAddedToCart');_0x5b5ab9(window)[_0xe032('0x66')](_0xe032('0xa8'));};_0x2467ea[_0xe032('0xa9')]?(_0x3e81e9(null,'success'),_0x58e008()):_0x5b5ab9[_0xe032('0x1e')]({'url':_0xadff95,'complete':_0x3e81e9})[_0xe032('0x23')](function(){_0x58e008();});});};_0x5a7bc9[_0xe032('0xa3')]=function(_0x16a745,_0x272fa9,_0x7aec7e,_0x4f60ac){try{'success'===_0x272fa9&&_0xe032('0x17')===typeof window[_0xe032('0xaa')]&&_0xe032('0xa')===typeof window[_0xe032('0xaa')][_0xe032('0xab')]&&window['parent']['_QuatroDigital_prodBuyCallback'](_0x16a745,_0x272fa9,_0x7aec7e,_0x4f60ac);}catch(_0x2c2e69){_0x14c811(_0xe032('0xac'));}};_0x8b8998();_0xe032('0xa')===typeof _0x2467ea[_0xe032('0x44')]?_0x2467ea[_0xe032('0x44')][_0xe032('0x69')](this):_0x14c811(_0xe032('0xad'));};var _0x58a874=_0x5b5ab9[_0xe032('0x6f')]();_0x5b5ab9['fn'][_0xe032('0x7a')]=function(_0x3776c7,_0xe2c168){var _0x33e7c3=_0x5b5ab9(this);_0xe032('0x3')!==typeof _0xe2c168||_0xe032('0x17')!==typeof _0x3776c7||_0x3776c7 instanceof _0x5b5ab9||(_0xe2c168=_0x3776c7,_0x3776c7=void 0x0);_0x2467ea=_0x5b5ab9['extend']({},_0x58a2f9,_0xe2c168);var _0x15389e;_0x58a874[_0xe032('0x33')](function(){_0x33e7c3['children'](_0xe032('0xae'))[_0xe032('0x8')]||_0x33e7c3[_0xe032('0xaf')](_0xe032('0xb0'));_0x15389e=new _0x5b5ab9['QD_buyButton'](_0x33e7c3,_0x3776c7);});_0x58a874[_0xe032('0x45')]();_0x5b5ab9(window)['on'](_0xe032('0xb1'),function(_0x342f68,_0x529b47,_0x3efb0a){_0x15389e[_0xe032('0x8a')](_0x529b47,_0x3efb0a);});return _0x5b5ab9[_0xe032('0x56')](_0x33e7c3,_0x15389e);};var _0x44da43=0x0;_0x5b5ab9(document)[_0xe032('0xb2')](function(_0x4e619c,_0x3b1a56,_0x30102f){-0x1<_0x30102f[_0xe032('0x1b')]['toLowerCase']()[_0xe032('0x9a')](_0xe032('0xb3'))&&(_0x44da43=(_0x30102f['url'][_0xe032('0xb4')](/sku\=([0-9]+)/i)||[''])[_0xe032('0xa5')]());});_0x5b5ab9(window)[_0xe032('0x6b')](_0xe032('0xb5'),function(){_0x5b5ab9(window)[_0xe032('0x66')]('QuatroDigital.qd_bb_prod_add',[new _0x5b5ab9(),_0x44da43]);});_0x5b5ab9(document)[_0xe032('0xb6')](function(){_0x58a874['fire']();});}catch(_0x85d772){_0xe032('0x3')!==typeof console&&_0xe032('0xa')===typeof console['error']&&console[_0xe032('0x15')](_0xe032('0xb7'),_0x85d772);}}(this));function qd_number_format(_0xda8529,_0x25fbdf,_0x4012e7,_0x12d709){_0xda8529=(_0xda8529+'')[_0xe032('0x1')](/[^0-9+\-Ee.]/g,'');_0xda8529=isFinite(+_0xda8529)?+_0xda8529:0x0;_0x25fbdf=isFinite(+_0x25fbdf)?Math[_0xe032('0x2')](_0x25fbdf):0x0;_0x12d709=_0xe032('0x3')===typeof _0x12d709?',':_0x12d709;_0x4012e7='undefined'===typeof _0x4012e7?'.':_0x4012e7;var _0x34b884='',_0x34b884=function(_0xc7f313,_0x3b7a3b){var _0x10a14b=Math[_0xe032('0x4')](0xa,_0x3b7a3b);return''+(Math[_0xe032('0x5')](_0xc7f313*_0x10a14b)/_0x10a14b)[_0xe032('0x6')](_0x3b7a3b);},_0x34b884=(_0x25fbdf?_0x34b884(_0xda8529,_0x25fbdf):''+Math[_0xe032('0x5')](_0xda8529))[_0xe032('0x7')]('.');0x3<_0x34b884[0x0][_0xe032('0x8')]&&(_0x34b884[0x0]=_0x34b884[0x0][_0xe032('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x12d709));(_0x34b884[0x1]||'')['length']<_0x25fbdf&&(_0x34b884[0x1]=_0x34b884[0x1]||'',_0x34b884[0x1]+=Array(_0x25fbdf-_0x34b884[0x1]['length']+0x1)['join']('0'));return _0x34b884[_0xe032('0x9')](_0x4012e7);}(function(){try{window[_0xe032('0x3b')]=window[_0xe032('0x3b')]||{},window[_0xe032('0x3b')][_0xe032('0x44')]=window[_0xe032('0x3b')]['callback']||$[_0xe032('0x6f')]();}catch(_0x534c2f){'undefined'!==typeof console&&_0xe032('0xa')===typeof console[_0xe032('0x15')]&&console[_0xe032('0x15')](_0xe032('0xb7'),_0x534c2f[_0xe032('0x26')]);}}());(function(_0x10c56e){try{var _0x466332=jQuery,_0x9e8b65=function(_0x5462eb,_0x54c254){if(_0xe032('0x17')===typeof console&&_0xe032('0x3')!==typeof console[_0xe032('0x15')]&&'undefined'!==typeof console[_0xe032('0x30')]&&_0xe032('0x3')!==typeof console[_0xe032('0x2e')]){var _0xcbd493;_0xe032('0x17')===typeof _0x5462eb?(_0x5462eb[_0xe032('0x70')](_0xe032('0xb8')),_0xcbd493=_0x5462eb):_0xcbd493=[_0xe032('0xb8')+_0x5462eb];if(_0xe032('0x3')===typeof _0x54c254||_0xe032('0x2d')!==_0x54c254['toLowerCase']()&&_0xe032('0x72')!==_0x54c254[_0xe032('0x11')]())if('undefined'!==typeof _0x54c254&&_0xe032('0x30')===_0x54c254['toLowerCase']())try{console['info'][_0xe032('0x73')](console,_0xcbd493);}catch(_0x350d3f){try{console[_0xe032('0x30')](_0xcbd493[_0xe032('0x9')]('\x0a'));}catch(_0x1ccb8d){}}else try{console[_0xe032('0x15')]['apply'](console,_0xcbd493);}catch(_0x50b3e5){try{console[_0xe032('0x15')](_0xcbd493[_0xe032('0x9')]('\x0a'));}catch(_0x27199d){}}else try{console[_0xe032('0x2e')]['apply'](console,_0xcbd493);}catch(_0x659376){try{console[_0xe032('0x2e')](_0xcbd493[_0xe032('0x9')]('\x0a'));}catch(_0x198eac){}}}};window[_0xe032('0x5e')]=window['_QuatroDigital_DropDown']||{};window[_0xe032('0x5e')]['allowUpdate']=!0x0;_0x466332[_0xe032('0xb9')]=function(){};_0x466332['fn'][_0xe032('0xb9')]=function(){return{'fn':new _0x466332()};};var _0x11ce9c=function(_0x3a63fb){var _0x3875f8={'z':_0xe032('0xba')};return function(_0x53aab4){var _0x51b179=function(_0x38741e){return _0x38741e;};var _0x22c14f=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x53aab4=_0x53aab4['d'+_0x22c14f[0x10]+'c'+_0x22c14f[0x11]+'m'+_0x51b179(_0x22c14f[0x1])+'n'+_0x22c14f[0xd]]['l'+_0x22c14f[0x12]+'c'+_0x22c14f[0x0]+'ti'+_0x51b179('o')+'n'];var _0x2257e6=function(_0x16c841){return escape(encodeURIComponent(_0x16c841[_0xe032('0x1')](/\./g,'¨')[_0xe032('0x1')](/[a-zA-Z]/g,function(_0x1379fb){return String['fromCharCode'](('Z'>=_0x1379fb?0x5a:0x7a)>=(_0x1379fb=_0x1379fb['charCodeAt'](0x0)+0xd)?_0x1379fb:_0x1379fb-0x1a);})));};var _0x10c56e=_0x2257e6(_0x53aab4[[_0x22c14f[0x9],_0x51b179('o'),_0x22c14f[0xc],_0x22c14f[_0x51b179(0xd)]][_0xe032('0x9')]('')]);_0x2257e6=_0x2257e6((window[['js',_0x51b179('no'),'m',_0x22c14f[0x1],_0x22c14f[0x4][_0xe032('0xf')](),_0xe032('0xbb')][_0xe032('0x9')]('')]||_0xe032('0x8e'))+['.v',_0x22c14f[0xd],'e',_0x51b179('x'),'co',_0x51b179('mm'),_0xe032('0xbc'),_0x22c14f[0x1],'.c',_0x51b179('o'),'m.',_0x22c14f[0x13],'r'][_0xe032('0x9')](''));for(var _0x3b872a in _0x3875f8){if(_0x2257e6===_0x3b872a+_0x3875f8[_0x3b872a]||_0x10c56e===_0x3b872a+_0x3875f8[_0x3b872a]){var _0x27c70c='tr'+_0x22c14f[0x11]+'e';break;}_0x27c70c='f'+_0x22c14f[0x0]+'ls'+_0x51b179(_0x22c14f[0x1])+'';}_0x51b179=!0x1;-0x1<_0x53aab4[[_0x22c14f[0xc],'e',_0x22c14f[0x0],'rc',_0x22c14f[0x9]]['join']('')]['indexOf'](_0xe032('0xbd'))&&(_0x51b179=!0x0);return[_0x27c70c,_0x51b179];}(_0x3a63fb);}(window);if(!eval(_0x11ce9c[0x0]))return _0x11ce9c[0x1]?_0x9e8b65(_0xe032('0xbe')):!0x1;_0x466332[_0xe032('0xb9')]=function(_0x153907,_0x5d3b09){var _0x7a4203=_0x466332(_0x153907);if(!_0x7a4203[_0xe032('0x8')])return _0x7a4203;var _0x3a6884=_0x466332['extend'](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0xe032('0xbf'),'linkCheckout':'Finalizar\x20Compra','cartTotal':_0xe032('0xc0'),'emptyCart':_0xe032('0xc1'),'continueShopping':_0xe032('0xc2'),'shippingForm':_0xe032('0xc3')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x3fa032){return _0x3fa032[_0xe032('0xc4')]||_0x3fa032[_0xe032('0xc5')];},'callback':function(){},'callbackProductsList':function(){}},_0x5d3b09);_0x466332('');var _0x43d283=this;if(_0x3a6884[_0xe032('0x5d')]){var _0x37d3af=!0x1;_0xe032('0x3')===typeof window[_0xe032('0x5f')]&&(_0x9e8b65(_0xe032('0xc6')),_0x466332[_0xe032('0x1e')]({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':!0x1,'dataType':'script','error':function(){_0x9e8b65(_0xe032('0xc7'));_0x37d3af=!0x0;}}));if(_0x37d3af)return _0x9e8b65(_0xe032('0xc8'));}if('object'===typeof window['vtexjs']&&_0xe032('0x3')!==typeof window[_0xe032('0x5f')]['checkout'])var _0x2cfdb8=window[_0xe032('0x5f')][_0xe032('0x28')];else if(_0xe032('0x17')===typeof vtex&&_0xe032('0x17')===typeof vtex[_0xe032('0x28')]&&_0xe032('0x3')!==typeof vtex[_0xe032('0x28')][_0xe032('0x60')])_0x2cfdb8=new vtex[(_0xe032('0x28'))][(_0xe032('0x60'))]();else return _0x9e8b65(_0xe032('0x61'));_0x43d283[_0xe032('0xc9')]='<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>';var _0xbd80b5=function(_0x50df10){_0x466332(this)['append'](_0x50df10);_0x50df10['find'](_0xe032('0xca'))[_0xe032('0x33')](_0x466332(_0xe032('0xcb')))['on'](_0xe032('0xcc'),function(){_0x7a4203[_0xe032('0x4d')](_0xe032('0xcd'));_0x466332(document[_0xe032('0x75')])[_0xe032('0x4d')](_0xe032('0xce'));});_0x466332(document)[_0xe032('0xcf')](_0xe032('0xd0'))['on'](_0xe032('0xd0'),function(_0x2116ca){0x1b==_0x2116ca[_0xe032('0xd1')]&&(_0x7a4203[_0xe032('0x4d')]('qd-bb-lightBoxProdAdd'),_0x466332(document[_0xe032('0x75')])['removeClass'](_0xe032('0xce')));});var _0x6a2c38=_0x50df10[_0xe032('0x57')](_0xe032('0xd2'));_0x50df10[_0xe032('0x57')]('.qd-ddc-scrollUp')['on']('click.qd_ddc_scrollUp',function(){_0x43d283[_0xe032('0xd3')]('-',void 0x0,void 0x0,_0x6a2c38);return!0x1;});_0x50df10['find'](_0xe032('0xd4'))['on'](_0xe032('0xd5'),function(){_0x43d283[_0xe032('0xd3')](void 0x0,void 0x0,void 0x0,_0x6a2c38);return!0x1;});_0x50df10[_0xe032('0x57')]('.qd-ddc-shipping\x20input')[_0xe032('0xd6')]('')['on'](_0xe032('0xd7'),function(){_0x43d283[_0xe032('0xd8')](_0x466332(this));});if(_0x3a6884['updateOnlyHover']){var _0x5d3b09=0x0;_0x466332(this)['on']('mouseenter.qd_ddc_hover',function(){var _0x50df10=function(){window[_0xe032('0x5e')][_0xe032('0x93')]&&(_0x43d283[_0xe032('0x92')](),window[_0xe032('0x5e')][_0xe032('0x93')]=!0x1,_0x466332['fn'][_0xe032('0x2c')](!0x0),_0x43d283[_0xe032('0xd9')]());};_0x5d3b09=setInterval(function(){_0x50df10();},0x258);_0x50df10();});_0x466332(this)['on'](_0xe032('0xda'),function(){clearInterval(_0x5d3b09);});}};var _0x337519=function(_0x4ea64b){_0x4ea64b=_0x466332(_0x4ea64b);_0x3a6884[_0xe032('0xdb')][_0xe032('0x59')]=_0x3a6884['texts'][_0xe032('0x59')]['replace'](_0xe032('0xdc'),_0xe032('0xdd'));_0x3a6884['texts'][_0xe032('0x59')]=_0x3a6884[_0xe032('0xdb')]['cartTotal'][_0xe032('0x1')](_0xe032('0xde'),_0xe032('0xdf'));_0x3a6884[_0xe032('0xdb')][_0xe032('0x59')]=_0x3a6884['texts'][_0xe032('0x59')][_0xe032('0x1')](_0xe032('0xe0'),_0xe032('0xe1'));_0x3a6884[_0xe032('0xdb')][_0xe032('0x59')]=_0x3a6884[_0xe032('0xdb')]['cartTotal'][_0xe032('0x1')](_0xe032('0xe2'),_0xe032('0xe3'));_0x4ea64b['find'](_0xe032('0xe4'))[_0xe032('0x51')](_0x3a6884[_0xe032('0xdb')]['linkCart']);_0x4ea64b[_0xe032('0x57')](_0xe032('0xe5'))[_0xe032('0x51')](_0x3a6884[_0xe032('0xdb')]['continueShopping']);_0x4ea64b[_0xe032('0x57')](_0xe032('0xe6'))[_0xe032('0x51')](_0x3a6884[_0xe032('0xdb')][_0xe032('0xe7')]);_0x4ea64b['find'](_0xe032('0xe8'))['html'](_0x3a6884[_0xe032('0xdb')][_0xe032('0x59')]);_0x4ea64b[_0xe032('0x57')]('.qd-ddc-shipping')[_0xe032('0x51')](_0x3a6884[_0xe032('0xdb')][_0xe032('0xe9')]);_0x4ea64b[_0xe032('0x57')](_0xe032('0xea'))[_0xe032('0x51')](_0x3a6884['texts'][_0xe032('0x5b')]);return _0x4ea64b;}(this[_0xe032('0xc9')]);var _0x1c4455=0x0;_0x7a4203[_0xe032('0x55')](function(){0x0<_0x1c4455?_0xbd80b5[_0xe032('0x69')](this,_0x337519[_0xe032('0xeb')]()):_0xbd80b5[_0xe032('0x69')](this,_0x337519);_0x1c4455++;});window[_0xe032('0x3b')][_0xe032('0x44')][_0xe032('0x33')](function(){_0x466332(_0xe032('0xec'))[_0xe032('0x51')](window[_0xe032('0x3b')][_0xe032('0x52')]||'--');_0x466332(_0xe032('0xed'))[_0xe032('0x51')](window[_0xe032('0x3b')][_0xe032('0x41')]||'0');_0x466332('.qd-ddc-infoTotalShipping')[_0xe032('0x51')](window['_QuatroDigital_CartData'][_0xe032('0x3e')]||'--');_0x466332(_0xe032('0xee'))[_0xe032('0x51')](window[_0xe032('0x3b')]['allTotal']||'--');});var _0x1a3fda=function(_0x37c8cf,_0xe18925){if('undefined'===typeof _0x37c8cf[_0xe032('0x42')])return _0x9e8b65(_0xe032('0xef'));_0x43d283['renderProductsList'][_0xe032('0x69')](this,_0xe18925);};_0x43d283[_0xe032('0x92')]=function(_0x345c63,_0x3e52fd){_0xe032('0x3')!=typeof _0x3e52fd?window[_0xe032('0x5e')]['dataOptionsCache']=_0x3e52fd:window['_QuatroDigital_DropDown'][_0xe032('0xf0')]&&(_0x3e52fd=window[_0xe032('0x5e')][_0xe032('0xf0')]);setTimeout(function(){window[_0xe032('0x5e')][_0xe032('0xf0')]=void 0x0;},_0x3a6884[_0xe032('0x91')]);_0x466332(_0xe032('0xf1'))[_0xe032('0x4d')](_0xe032('0xf2'));if(_0x3a6884[_0xe032('0x5d')]){var _0x5d3b09=function(_0x1828ee){window[_0xe032('0x5e')][_0xe032('0x29')]=_0x1828ee;_0x1a3fda(_0x1828ee,_0x3e52fd);_0xe032('0x3')!==typeof window[_0xe032('0xf3')]&&_0xe032('0xa')===typeof window[_0xe032('0xf3')]['exec']&&window['_QuatroDigital_AmountProduct']['exec'][_0xe032('0x69')](this);_0x466332(_0xe032('0xf1'))[_0xe032('0x4b')](_0xe032('0xf2'));};_0xe032('0x3')!==typeof window[_0xe032('0x5e')][_0xe032('0x29')]?(_0x5d3b09(window[_0xe032('0x5e')]['getOrderForm']),'function'===typeof _0x345c63&&_0x345c63(window[_0xe032('0x5e')][_0xe032('0x29')])):_0x466332[_0xe032('0x62')](['items',_0xe032('0x3c'),_0xe032('0x63')],{'done':function(_0x3b86ec){_0x5d3b09[_0xe032('0x69')](this,_0x3b86ec);_0xe032('0xa')===typeof _0x345c63&&_0x345c63(_0x3b86ec);},'fail':function(_0x4bb8cc){_0x9e8b65(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0x4bb8cc]);}});}else alert(_0xe032('0xf4'));};_0x43d283['cartIsEmpty']=function(){var _0x3fa0d3=_0x466332(_0xe032('0xf1'));_0x3fa0d3[_0xe032('0x57')](_0xe032('0xf5'))[_0xe032('0x8')]?_0x3fa0d3[_0xe032('0x4d')](_0xe032('0xf6')):_0x3fa0d3[_0xe032('0x4b')](_0xe032('0xf6'));};_0x43d283[_0xe032('0xf7')]=function(_0x5b7f88){var _0x5d3b09=_0x466332(_0xe032('0xf8'));_0x5d3b09[_0xe032('0xf9')]();_0x5d3b09['each'](function(){var _0x5d3b09=_0x466332(this),_0x153907,_0x2bbbf0,_0x2816b6=_0x466332(''),_0x557932;for(_0x557932 in window['_QuatroDigital_DropDown']['getOrderForm']['items'])if(_0xe032('0x17')===typeof window[_0xe032('0x5e')][_0xe032('0x29')][_0xe032('0x42')][_0x557932]){var _0x4c3c03=window[_0xe032('0x5e')][_0xe032('0x29')]['items'][_0x557932];var _0xec48f1=_0x4c3c03[_0xe032('0xfa')][_0xe032('0x1')](/^\/|\/$/g,'')[_0xe032('0x7')]('/');var _0x2939a2=_0x466332(_0xe032('0xfb'));_0x2939a2[_0xe032('0x38')]({'data-sku':_0x4c3c03['id'],'data-sku-index':_0x557932,'data-qd-departament':_0xec48f1[0x0],'data-qd-category':_0xec48f1[_0xec48f1['length']-0x1]});_0x2939a2['addClass'](_0xe032('0xfc')+_0x4c3c03['availability']);_0x2939a2['find']('.qd-ddc-prodName')[_0xe032('0xfd')](_0x3a6884[_0xe032('0xc4')](_0x4c3c03));_0x2939a2[_0xe032('0x57')](_0xe032('0xfe'))[_0xe032('0xfd')](isNaN(_0x4c3c03[_0xe032('0xff')])?_0x4c3c03['sellingPrice']:0x0==_0x4c3c03[_0xe032('0xff')]?'Grátis':(_0x466332(_0xe032('0x37'))[_0xe032('0x38')](_0xe032('0x39'))||'R$')+'\x20'+qd_number_format(_0x4c3c03[_0xe032('0xff')]/0x64,0x2,',','.'));_0x2939a2['find'](_0xe032('0x100'))['attr']({'data-sku':_0x4c3c03['id'],'data-sku-index':_0x557932})[_0xe032('0xd6')](_0x4c3c03['quantity']);_0x2939a2['find'](_0xe032('0x101'))[_0xe032('0x38')]({'data-sku':_0x4c3c03['id'],'data-sku-index':_0x557932});_0x43d283[_0xe032('0x102')](_0x4c3c03['id'],_0x2939a2[_0xe032('0x57')](_0xe032('0x103')),_0x4c3c03[_0xe032('0x104')]);_0x2939a2[_0xe032('0x57')](_0xe032('0x105'))[_0xe032('0x38')]({'data-sku':_0x4c3c03['id'],'data-sku-index':_0x557932});_0x2939a2[_0xe032('0x106')](_0x5d3b09);_0x2816b6=_0x2816b6[_0xe032('0x33')](_0x2939a2);}try{var _0x443d93=_0x5d3b09['getParent']('.qd-ddc-wrapper')[_0xe032('0x57')](_0xe032('0x107'));_0x443d93[_0xe032('0x8')]&&''==_0x443d93[_0xe032('0xd6')]()&&window['_QuatroDigital_DropDown'][_0xe032('0x29')][_0xe032('0x63')][_0xe032('0x108')]&&_0x443d93['val'](window['_QuatroDigital_DropDown'][_0xe032('0x29')][_0xe032('0x63')]['address'][_0xe032('0x109')]);}catch(_0x1e4cc9){_0x9e8b65(_0xe032('0x10a')+_0x1e4cc9[_0xe032('0x26')],_0xe032('0x72'));}_0x43d283[_0xe032('0x10b')](_0x5d3b09);_0x43d283[_0xe032('0xd9')]();_0x5b7f88&&_0x5b7f88[_0xe032('0x10c')]&&function(){_0x2bbbf0=_0x2816b6[_0xe032('0x4a')]('[data-sku=\x27'+_0x5b7f88[_0xe032('0x10c')]+'\x27]');_0x2bbbf0[_0xe032('0x8')]&&(_0x153907=0x0,_0x2816b6['each'](function(){var _0x5b7f88=_0x466332(this);if(_0x5b7f88['is'](_0x2bbbf0))return!0x1;_0x153907+=_0x5b7f88[_0xe032('0x10d')]();}),_0x43d283['scrollCart'](void 0x0,void 0x0,_0x153907,_0x5d3b09[_0xe032('0x33')](_0x5d3b09['parent']())),_0x2816b6[_0xe032('0x4d')](_0xe032('0x10e')),function(_0x5ddeaf){_0x5ddeaf[_0xe032('0x4b')](_0xe032('0x10f'));_0x5ddeaf[_0xe032('0x4b')]('qd-ddc-lastAddedFixed');setTimeout(function(){_0x5ddeaf[_0xe032('0x4d')](_0xe032('0x10f'));},_0x3a6884[_0xe032('0x91')]);}(_0x2bbbf0));}();});(function(){_QuatroDigital_DropDown[_0xe032('0x29')][_0xe032('0x42')][_0xe032('0x8')]?(_0x466332(_0xe032('0x75'))[_0xe032('0x4d')](_0xe032('0x110'))[_0xe032('0x4b')](_0xe032('0x111')),setTimeout(function(){_0x466332('body')[_0xe032('0x4d')]('qd-ddc-product-add-time');},_0x3a6884[_0xe032('0x91')])):_0x466332('body')[_0xe032('0x4d')](_0xe032('0x112'))[_0xe032('0x4b')]('qd-ddc-cart-empty');}());_0xe032('0xa')===typeof _0x3a6884['callbackProductsList']?_0x3a6884['callbackProductsList'][_0xe032('0x69')](this):_0x9e8b65(_0xe032('0x113'));};_0x43d283[_0xe032('0x102')]=function(_0x2c8d1f,_0x463e72,_0xde79c2){function _0x558ab0(){_0x463e72[_0xe032('0x4d')](_0xe032('0x114'))[_0xe032('0x99')](function(){_0x466332(this)[_0xe032('0x4b')](_0xe032('0x114'));})[_0xe032('0x38')]('src',_0xde79c2);}_0xde79c2?_0x558ab0():isNaN(_0x2c8d1f)?_0x9e8b65(_0xe032('0x115'),'alerta'):alert(_0xe032('0x116'));};_0x43d283[_0xe032('0x10b')]=function(_0x4903c4){var _0x1c52da=function(_0x5b3d50,_0x2cc204){var _0x5d3b09=_0x466332(_0x5b3d50);var _0x2517bb=_0x5d3b09[_0xe032('0x38')](_0xe032('0x117'));var _0x153907=_0x5d3b09['attr'](_0xe032('0x118'));if(_0x2517bb){var _0x453974=parseInt(_0x5d3b09['val']())||0x1;_0x43d283['changeQantity']([_0x2517bb,_0x153907],_0x453974,_0x453974+0x1,function(_0x430ebb){_0x5d3b09[_0xe032('0xd6')](_0x430ebb);'function'===typeof _0x2cc204&&_0x2cc204();});}};var _0x5d3b09=function(_0x50f3c8,_0x543b07){var _0x5d3b09=_0x466332(_0x50f3c8);var _0x3037e4=_0x5d3b09[_0xe032('0x38')]('data-sku');var _0x153907=_0x5d3b09[_0xe032('0x38')]('data-sku-index');if(_0x3037e4){var _0x203ce2=parseInt(_0x5d3b09[_0xe032('0xd6')]())||0x2;_0x43d283[_0xe032('0x119')]([_0x3037e4,_0x153907],_0x203ce2,_0x203ce2-0x1,function(_0x1ac7f8){_0x5d3b09['val'](_0x1ac7f8);'function'===typeof _0x543b07&&_0x543b07();});}};var _0x10e8ac=function(_0x27f62a,_0x221ce9){var _0x5d3b09=_0x466332(_0x27f62a);var _0x586cd0=_0x5d3b09[_0xe032('0x38')]('data-sku');var _0x153907=_0x5d3b09[_0xe032('0x38')](_0xe032('0x118'));if(_0x586cd0){var _0x49c07d=parseInt(_0x5d3b09['val']())||0x1;_0x43d283[_0xe032('0x119')]([_0x586cd0,_0x153907],0x1,_0x49c07d,function(_0x1b13e6){_0x5d3b09[_0xe032('0xd6')](_0x1b13e6);_0xe032('0xa')===typeof _0x221ce9&&_0x221ce9();});}};var _0x153907=_0x4903c4['find'](_0xe032('0x11a'));_0x153907['addClass'](_0xe032('0x11b'))[_0xe032('0x55')](function(){var _0x4903c4=_0x466332(this);_0x4903c4['find'](_0xe032('0x11c'))['on']('click.qd_ddc_more',function(_0x4b8c5a){_0x4b8c5a['preventDefault']();_0x153907[_0xe032('0x4b')](_0xe032('0x11d'));_0x1c52da(_0x4903c4[_0xe032('0x57')](_0xe032('0x100')),function(){_0x153907[_0xe032('0x4d')](_0xe032('0x11d'));});});_0x4903c4[_0xe032('0x57')](_0xe032('0x11e'))['on']('click.qd_ddc_minus',function(_0x1ce28b){_0x1ce28b[_0xe032('0x7e')]();_0x153907[_0xe032('0x4b')]('qd-loading');_0x5d3b09(_0x4903c4['find'](_0xe032('0x100')),function(){_0x153907[_0xe032('0x4d')](_0xe032('0x11d'));});});_0x4903c4[_0xe032('0x57')](_0xe032('0x100'))['on'](_0xe032('0x11f'),function(){_0x153907['addClass'](_0xe032('0x11d'));_0x10e8ac(this,function(){_0x153907[_0xe032('0x4d')]('qd-loading');});});_0x4903c4['find'](_0xe032('0x100'))['on'](_0xe032('0x120'),function(_0x531036){0xd==_0x531036[_0xe032('0xd1')]&&(_0x153907[_0xe032('0x4b')](_0xe032('0x11d')),_0x10e8ac(this,function(){_0x153907[_0xe032('0x4d')](_0xe032('0x11d'));}));});});_0x4903c4[_0xe032('0x57')](_0xe032('0xf5'))[_0xe032('0x55')](function(){var _0x4903c4=_0x466332(this);_0x4903c4[_0xe032('0x57')](_0xe032('0x101'))['on'](_0xe032('0x121'),function(){_0x4903c4['addClass'](_0xe032('0x11d'));_0x43d283['removeProduct'](_0x466332(this),function(_0x530ec1){_0x530ec1?_0x4903c4[_0xe032('0x122')](!0x0)[_0xe032('0x123')](function(){_0x4903c4['remove']();_0x43d283[_0xe032('0xd9')]();}):_0x4903c4[_0xe032('0x4d')]('qd-loading');});return!0x1;});});};_0x43d283[_0xe032('0xd8')]=function(_0x82f448){var _0x35a5a7=_0x82f448['val'](),_0x35a5a7=_0x35a5a7[_0xe032('0x1')](/[^0-9\-]/g,''),_0x35a5a7=_0x35a5a7['replace'](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0xe032('0x124')),_0x35a5a7=_0x35a5a7[_0xe032('0x1')](/(.{9}).*/g,'$1');_0x82f448[_0xe032('0xd6')](_0x35a5a7);0x9<=_0x35a5a7['length']&&(_0x82f448[_0xe032('0x19')]('qdDdcLastPostalCode')!=_0x35a5a7&&_0x2cfdb8[_0xe032('0x125')]({'postalCode':_0x35a5a7,'country':_0xe032('0x126')})[_0xe032('0x1f')](function(_0x4c4286){window[_0xe032('0x5e')][_0xe032('0x29')]=_0x4c4286;_0x43d283[_0xe032('0x92')]();})[_0xe032('0x21')](function(_0x4daf33){_0x9e8b65([_0xe032('0x127'),_0x4daf33]);updateCartData();}),_0x82f448['data']('qdDdcLastPostalCode',_0x35a5a7));};_0x43d283[_0xe032('0x119')]=function(_0x2dcfed,_0x19cf0f,_0x544307,_0x272d07){function _0x2bca9d(_0x222a22){_0x222a22='boolean'!==typeof _0x222a22?!0x1:_0x222a22;_0x43d283[_0xe032('0x92')]();window[_0xe032('0x5e')]['allowUpdate']=!0x1;_0x43d283[_0xe032('0xd9')]();_0xe032('0x3')!==typeof window[_0xe032('0xf3')]&&'function'===typeof window[_0xe032('0xf3')][_0xe032('0x128')]&&window['_QuatroDigital_AmountProduct'][_0xe032('0x128')][_0xe032('0x69')](this);_0xe032('0xa')===typeof adminCart&&adminCart();_0x466332['fn'][_0xe032('0x2c')](!0x0,void 0x0,_0x222a22);_0xe032('0xa')===typeof _0x272d07&&_0x272d07(_0x19cf0f);}_0x544307=_0x544307||0x1;if(0x1>_0x544307)return _0x19cf0f;if(_0x3a6884[_0xe032('0x5d')]){if(_0xe032('0x3')===typeof window[_0xe032('0x5e')][_0xe032('0x29')][_0xe032('0x42')][_0x2dcfed[0x1]])return _0x9e8b65(_0xe032('0x129')+_0x2dcfed[0x1]+']'),_0x19cf0f;window[_0xe032('0x5e')][_0xe032('0x29')]['items'][_0x2dcfed[0x1]][_0xe032('0x43')]=_0x544307;window['_QuatroDigital_DropDown'][_0xe032('0x29')][_0xe032('0x42')][_0x2dcfed[0x1]][_0xe032('0x12a')]=_0x2dcfed[0x1];_0x2cfdb8['updateItems']([window[_0xe032('0x5e')][_0xe032('0x29')][_0xe032('0x42')][_0x2dcfed[0x1]]],[_0xe032('0x42'),'totalizers',_0xe032('0x63')])[_0xe032('0x1f')](function(_0x124659){window[_0xe032('0x5e')][_0xe032('0x29')]=_0x124659;_0x2bca9d(!0x0);})[_0xe032('0x21')](function(_0x4e2c4e){_0x9e8b65(['Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho',_0x4e2c4e]);_0x2bca9d();});}else _0x9e8b65(_0xe032('0x12b'));};_0x43d283[_0xe032('0x12c')]=function(_0x26f57f,_0x4b7774){function _0x416e54(_0xce0a24){_0xce0a24=_0xe032('0x12d')!==typeof _0xce0a24?!0x1:_0xce0a24;_0xe032('0x3')!==typeof window[_0xe032('0xf3')]&&_0xe032('0xa')===typeof window['_QuatroDigital_AmountProduct'][_0xe032('0x128')]&&window[_0xe032('0xf3')][_0xe032('0x128')][_0xe032('0x69')](this);_0xe032('0xa')===typeof adminCart&&adminCart();_0x466332['fn'][_0xe032('0x2c')](!0x0,void 0x0,_0xce0a24);'function'===typeof _0x4b7774&&_0x4b7774(_0x153907);}var _0x153907=!0x1,_0x4762c3=_0x466332(_0x26f57f)['attr'](_0xe032('0x118'));if(_0x3a6884['smartCheckout']){if('undefined'===typeof window[_0xe032('0x5e')][_0xe032('0x29')][_0xe032('0x42')][_0x4762c3])return _0x9e8b65('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x4762c3+']'),_0x153907;window[_0xe032('0x5e')][_0xe032('0x29')][_0xe032('0x42')][_0x4762c3]['index']=_0x4762c3;_0x2cfdb8[_0xe032('0x12e')]([window['_QuatroDigital_DropDown'][_0xe032('0x29')][_0xe032('0x42')][_0x4762c3]],['items',_0xe032('0x3c'),_0xe032('0x63')])[_0xe032('0x1f')](function(_0x37a4ea){_0x153907=!0x0;window[_0xe032('0x5e')][_0xe032('0x29')]=_0x37a4ea;_0x1a3fda(_0x37a4ea);_0x416e54(!0x0);})['fail'](function(_0x387300){_0x9e8b65([_0xe032('0x12f'),_0x387300]);_0x416e54();});}else alert('Atenção,\x20este\x20método\x20esta\x20descontinuado.');};_0x43d283[_0xe032('0xd3')]=function(_0x65d9a7,_0xedb0d5,_0x5238da,_0x1362c1){_0x1362c1=_0x1362c1||_0x466332(_0xe032('0x130'));_0x65d9a7=_0x65d9a7||'+';_0xedb0d5=_0xedb0d5||0.9*_0x1362c1['height']();_0x1362c1[_0xe032('0x122')](!0x0,!0x0)[_0xe032('0x131')]({'scrollTop':isNaN(_0x5238da)?_0x65d9a7+'='+_0xedb0d5+'px':_0x5238da});};_0x3a6884[_0xe032('0x132')]||(_0x43d283['getCartInfoByUrl'](),_0x466332['fn'][_0xe032('0x2c')](!0x0));_0x466332(window)['on'](_0xe032('0x133'),function(){try{window[_0xe032('0x5e')][_0xe032('0x29')]=void 0x0,_0x43d283['getCartInfoByUrl']();}catch(_0x451689){_0x9e8b65(_0xe032('0x134')+_0x451689[_0xe032('0x26')],_0xe032('0x135'));}});'function'===typeof _0x3a6884['callback']?_0x3a6884[_0xe032('0x44')][_0xe032('0x69')](this):_0x9e8b65(_0xe032('0xad'));};_0x466332['fn']['QD_dropDownCart']=function(_0x5a2e02){var _0xcf5537=_0x466332(this);_0xcf5537['fn']=new _0x466332[(_0xe032('0xb9'))](this,_0x5a2e02);return _0xcf5537;};}catch(_0x1c3e9e){_0xe032('0x3')!==typeof console&&_0xe032('0xa')===typeof console[_0xe032('0x15')]&&console[_0xe032('0x15')]('Oooops!\x20',_0x1c3e9e);}}(this));(function(_0x548dfa){try{var _0x3d20b8=jQuery;window[_0xe032('0xf3')]=window[_0xe032('0xf3')]||{};window['_QuatroDigital_AmountProduct'][_0xe032('0x42')]={};window[_0xe032('0xf3')][_0xe032('0x136')]=!0x1;window['_QuatroDigital_AmountProduct'][_0xe032('0x137')]=!0x1;window[_0xe032('0xf3')][_0xe032('0x138')]=!0x1;var _0x4be538=function(){if(window[_0xe032('0xf3')][_0xe032('0x136')]){var _0x1a7d13=!0x1;var _0x548dfa={};window[_0xe032('0xf3')][_0xe032('0x42')]={};for(_0xb1960 in window['_QuatroDigital_DropDown'][_0xe032('0x29')][_0xe032('0x42')])if(_0xe032('0x17')===typeof window[_0xe032('0x5e')]['getOrderForm'][_0xe032('0x42')][_0xb1960]){var _0x5fa30c=window[_0xe032('0x5e')][_0xe032('0x29')][_0xe032('0x42')][_0xb1960];'undefined'!==typeof _0x5fa30c['productId']&&null!==_0x5fa30c['productId']&&''!==_0x5fa30c[_0xe032('0x139')]&&(window[_0xe032('0xf3')][_0xe032('0x42')][_0xe032('0x13a')+_0x5fa30c['productId']]=window[_0xe032('0xf3')][_0xe032('0x42')]['prod_'+_0x5fa30c[_0xe032('0x139')]]||{},window['_QuatroDigital_AmountProduct'][_0xe032('0x42')][_0xe032('0x13a')+_0x5fa30c[_0xe032('0x139')]][_0xe032('0x13b')]=_0x5fa30c[_0xe032('0x139')],_0x548dfa[_0xe032('0x13a')+_0x5fa30c[_0xe032('0x139')]]||(window['_QuatroDigital_AmountProduct']['items'][_0xe032('0x13a')+_0x5fa30c[_0xe032('0x139')]]['qtt']=0x0),window[_0xe032('0xf3')][_0xe032('0x42')]['prod_'+_0x5fa30c[_0xe032('0x139')]][_0xe032('0x41')]+=_0x5fa30c[_0xe032('0x43')],_0x1a7d13=!0x0,_0x548dfa[_0xe032('0x13a')+_0x5fa30c[_0xe032('0x139')]]=!0x0);}var _0xb1960=_0x1a7d13;}else _0xb1960=void 0x0;window[_0xe032('0xf3')][_0xe032('0x136')]&&(_0x3d20b8(_0xe032('0x13c'))[_0xe032('0x13d')](),_0x3d20b8(_0xe032('0x13e'))[_0xe032('0x4d')]('qd-bap-item-added'));for(var _0x315d72 in window[_0xe032('0xf3')]['items']){_0x5fa30c=window[_0xe032('0xf3')][_0xe032('0x42')][_0x315d72];if('object'!==typeof _0x5fa30c)return;_0x548dfa=_0x3d20b8(_0xe032('0x13f')+_0x5fa30c['prodId']+']')[_0xe032('0x27')]('li');if(window[_0xe032('0xf3')][_0xe032('0x136')]||!_0x548dfa[_0xe032('0x57')](_0xe032('0x13c'))[_0xe032('0x8')])_0x1a7d13=_0x3d20b8(_0xe032('0x140')),_0x1a7d13[_0xe032('0x57')]('.qd-bap-qtt')[_0xe032('0x51')](_0x5fa30c['qtt']),_0x5fa30c=_0x548dfa[_0xe032('0x57')](_0xe032('0x141')),_0x5fa30c[_0xe032('0x8')]?_0x5fa30c[_0xe032('0xaf')](_0x1a7d13)['addClass'](_0xe032('0x142')):_0x548dfa['prepend'](_0x1a7d13);}_0xb1960&&(window[_0xe032('0xf3')][_0xe032('0x136')]=!0x1);};window[_0xe032('0xf3')][_0xe032('0x128')]=function(){window['_QuatroDigital_AmountProduct'][_0xe032('0x136')]=!0x0;_0x4be538[_0xe032('0x69')](this);};_0x3d20b8(document)[_0xe032('0xb6')](function(){_0x4be538[_0xe032('0x69')](this);});}catch(_0x4d4d94){_0xe032('0x3')!==typeof console&&_0xe032('0xa')===typeof console[_0xe032('0x15')]&&console[_0xe032('0x15')]('Oooops!\x20',_0x4d4d94);}}(this));(function(){try{var _0x38766d=jQuery,_0x38e245,_0x41cca0={'selector':_0xe032('0x143'),'dropDown':{},'buyButton':{}};_0x38766d[_0xe032('0x144')]=function(_0x24ad04){var _0x520dcf={};_0x38e245=_0x38766d[_0xe032('0x56')](!0x0,{},_0x41cca0,_0x24ad04);_0x24ad04=_0x38766d(_0x38e245[_0xe032('0x88')])[_0xe032('0xb9')](_0x38e245[_0xe032('0x145')]);_0x520dcf['buyButton']='undefined'!==typeof _0x38e245[_0xe032('0x145')][_0xe032('0x132')]&&!0x1===_0x38e245[_0xe032('0x145')][_0xe032('0x132')]?_0x38766d(_0x38e245[_0xe032('0x88')])['QD_buyButton'](_0x24ad04['fn'],_0x38e245[_0xe032('0x80')]):_0x38766d(_0x38e245[_0xe032('0x88')])[_0xe032('0x7a')](_0x38e245[_0xe032('0x80')]);_0x520dcf['dropDown']=_0x24ad04;return _0x520dcf;};_0x38766d['fn'][_0xe032('0x146')]=function(){_0xe032('0x17')===typeof console&&'function'===typeof console[_0xe032('0x30')]&&console['info'](_0xe032('0x147'));};_0x38766d[_0xe032('0x146')]=_0x38766d['fn'][_0xe032('0x146')];}catch(_0xa9040a){_0xe032('0x3')!==typeof console&&'function'===typeof console['error']&&console['error'](_0xe032('0xb7'),_0xa9040a);}}());