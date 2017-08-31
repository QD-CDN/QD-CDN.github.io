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

/* Quatro Digital Amazing Menu */
var _0xf021=['/qd-amazing-menu','undefined','error','info','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','apply','join','warn','addClass','qd-am-li-','qd-am-first','last','replace','fromCharCode','charCodeAt','ite','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','filter','.qd-am-banner','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','url','each','find','img[alt=\x27','attr','clone','hide','qd-am-content-loaded','text','data-qdam-value','[class*=\x27colunas\x27]','ajaxCallback','QuatroDigital.am.ajaxCallback','ul[itemscope]','li\x20>ul','qd-am-has-ul','children','qd-am-elem-','first','>li','qdAmAddNdx','qd-amazing-menu','>ul','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','add','qd-am-','callback','trigger','QD_amazingMenu','extend','exec','.qd_amazing_menu_auto','getParent','closest','function'];(function(_0x859750,_0x397a13){var _0x3c88b4=function(_0x1f0d95){while(--_0x1f0d95){_0x859750['push'](_0x859750['shift']());}};_0x3c88b4(++_0x397a13);}(_0xf021,0x18f));var _0x1f02=function(_0x5cd395,_0x507285){_0x5cd395=_0x5cd395-0x0;var _0x141227=_0xf021[_0x5cd395];return _0x141227;};(function(_0x8af718){_0x8af718['fn'][_0x1f02('0x0')]=_0x8af718['fn'][_0x1f02('0x1')];}(jQuery));(function(_0x46d604){var _0x30184d;var _0x53cc42=jQuery;if(_0x1f02('0x2')!==typeof _0x53cc42['fn']['QD_amazingMenu']){var _0x2e8594={'url':_0x1f02('0x3'),'callback':function(){},'ajaxCallback':function(){}};var _0x51eff6=function(_0x532e6d,_0x84a8f0){if('object'===typeof console&&_0x1f02('0x4')!==typeof console[_0x1f02('0x5')]&&_0x1f02('0x4')!==typeof console[_0x1f02('0x6')]&&_0x1f02('0x4')!==typeof console['warn']){var _0x154f8a;'object'===typeof _0x532e6d?(_0x532e6d['unshift']('[QD\x20Amazing\x20Menu]\x0a'),_0x154f8a=_0x532e6d):_0x154f8a=[_0x1f02('0x7')+_0x532e6d];if(_0x1f02('0x4')===typeof _0x84a8f0||_0x1f02('0x8')!==_0x84a8f0[_0x1f02('0x9')]()&&_0x1f02('0xa')!==_0x84a8f0['toLowerCase']())if(_0x1f02('0x4')!==typeof _0x84a8f0&&_0x1f02('0x6')===_0x84a8f0[_0x1f02('0x9')]())try{console['info'][_0x1f02('0xb')](console,_0x154f8a);}catch(_0x1ac6eb){try{console[_0x1f02('0x6')](_0x154f8a['join']('\x0a'));}catch(_0x5b12e8){}}else try{console['error'][_0x1f02('0xb')](console,_0x154f8a);}catch(_0x2c08ad){try{console[_0x1f02('0x5')](_0x154f8a[_0x1f02('0xc')]('\x0a'));}catch(_0x1c16ce){}}else try{console[_0x1f02('0xd')][_0x1f02('0xb')](console,_0x154f8a);}catch(_0x3b0a3d){try{console['warn'](_0x154f8a[_0x1f02('0xc')]('\x0a'));}catch(_0x5cca16){}}}};_0x53cc42['fn']['qdAmAddNdx']=function(){var _0x4a66a5=_0x53cc42(this);_0x4a66a5['each'](function(_0x4d1e4f){_0x53cc42(this)[_0x1f02('0xe')](_0x1f02('0xf')+_0x4d1e4f);});_0x4a66a5['first']()[_0x1f02('0xe')](_0x1f02('0x10'));_0x4a66a5[_0x1f02('0x11')]()[_0x1f02('0xe')]('qd-am-last');return _0x4a66a5;};_0x53cc42['fn']['QD_amazingMenu']=function(){};_0x46d604=function(_0x221e0f){var _0x37393a={'z':'bgbqvina%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x5b399a){var _0x339c29=function(_0xbdf82a){return _0xbdf82a;};var _0x2f637d=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5b399a=_0x5b399a['d'+_0x2f637d[0x10]+'c'+_0x2f637d[0x11]+'m'+_0x339c29(_0x2f637d[0x1])+'n'+_0x2f637d[0xd]]['l'+_0x2f637d[0x12]+'c'+_0x2f637d[0x0]+'ti'+_0x339c29('o')+'n'];var _0xbabbd7=function(_0x480297){return escape(encodeURIComponent(_0x480297[_0x1f02('0x12')](/\./g,'¨')[_0x1f02('0x12')](/[a-zA-Z]/g,function(_0x1ae73b){return String[_0x1f02('0x13')](('Z'>=_0x1ae73b?0x5a:0x7a)>=(_0x1ae73b=_0x1ae73b[_0x1f02('0x14')](0x0)+0xd)?_0x1ae73b:_0x1ae73b-0x1a);})));};var _0x134398=_0xbabbd7(_0x5b399a[[_0x2f637d[0x9],_0x339c29('o'),_0x2f637d[0xc],_0x2f637d[_0x339c29(0xd)]][_0x1f02('0xc')]('')]);_0xbabbd7=_0xbabbd7((window[['js',_0x339c29('no'),'m',_0x2f637d[0x1],_0x2f637d[0x4]['toUpperCase'](),_0x1f02('0x15')][_0x1f02('0xc')]('')]||'---')+['.v',_0x2f637d[0xd],'e',_0x339c29('x'),'co',_0x339c29('mm'),_0x1f02('0x16'),_0x2f637d[0x1],'.c',_0x339c29('o'),'m.',_0x2f637d[0x13],'r'][_0x1f02('0xc')](''));for(var _0x575a86 in _0x37393a){if(_0xbabbd7===_0x575a86+_0x37393a[_0x575a86]||_0x134398===_0x575a86+_0x37393a[_0x575a86]){var _0x57bb58='tr'+_0x2f637d[0x11]+'e';break;}_0x57bb58='f'+_0x2f637d[0x0]+'ls'+_0x339c29(_0x2f637d[0x1])+'';}_0x339c29=!0x1;-0x1<_0x5b399a[[_0x2f637d[0xc],'e',_0x2f637d[0x0],'rc',_0x2f637d[0x9]][_0x1f02('0xc')]('')][_0x1f02('0x17')](_0x1f02('0x18'))&&(_0x339c29=!0x0);return[_0x57bb58,_0x339c29];}(_0x221e0f);}(window);if(!eval(_0x46d604[0x0]))return _0x46d604[0x1]?_0x51eff6(_0x1f02('0x19')):!0x1;var _0x3f5c5e=function(_0x3f5577){var _0x297cf4=_0x3f5577['find']('.qd_am_code');var _0x4e04f2=_0x297cf4[_0x1f02('0x1a')](_0x1f02('0x1b'));var _0x23059a=_0x297cf4['filter']('.qd-am-collection');if(_0x4e04f2[_0x1f02('0x1c')]||_0x23059a[_0x1f02('0x1c')])_0x4e04f2[_0x1f02('0x1d')]()[_0x1f02('0xe')](_0x1f02('0x1e')),_0x23059a[_0x1f02('0x1d')]()[_0x1f02('0xe')](_0x1f02('0x1f')),_0x53cc42[_0x1f02('0x20')]({'url':_0x30184d[_0x1f02('0x21')],'dataType':'html','success':function(_0x137e06){var _0x5ab7a2=_0x53cc42(_0x137e06);_0x4e04f2[_0x1f02('0x22')](function(){var _0x137e06=_0x53cc42(this);var _0x8a3f1e=_0x5ab7a2[_0x1f02('0x23')](_0x1f02('0x24')+_0x137e06[_0x1f02('0x25')]('data-qdam-value')+'\x27]');_0x8a3f1e['length']&&(_0x8a3f1e[_0x1f02('0x22')](function(){_0x53cc42(this)[_0x1f02('0x0')]('.box-banner')[_0x1f02('0x26')]()['insertBefore'](_0x137e06);}),_0x137e06[_0x1f02('0x27')]());})['addClass'](_0x1f02('0x28'));_0x23059a['each'](function(){var _0x137e06={};var _0x26f33e=_0x53cc42(this);_0x5ab7a2[_0x1f02('0x23')]('h2')[_0x1f02('0x22')](function(){if(_0x53cc42(this)[_0x1f02('0x29')]()['trim']()[_0x1f02('0x9')]()==_0x26f33e[_0x1f02('0x25')](_0x1f02('0x2a'))['trim']()[_0x1f02('0x9')]())return _0x137e06=_0x53cc42(this),!0x1;});_0x137e06[_0x1f02('0x1c')]&&(_0x137e06[_0x1f02('0x22')](function(){_0x53cc42(this)[_0x1f02('0x0')](_0x1f02('0x2b'))[_0x1f02('0x26')]()['insertBefore'](_0x26f33e);}),_0x26f33e[_0x1f02('0x27')]());})[_0x1f02('0xe')](_0x1f02('0x28'));},'error':function(){_0x51eff6('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27'+_0x30184d[_0x1f02('0x21')]+'\x27\x20falho.');},'complete':function(){_0x30184d[_0x1f02('0x2c')]['call'](this);_0x53cc42(window)['trigger'](_0x1f02('0x2d'),_0x3f5577);},'clearQueueDelay':0xbb8});};_0x53cc42['QD_amazingMenu']=function(_0x591a1c){var _0x3ec5bd=_0x591a1c[_0x1f02('0x23')](_0x1f02('0x2e'))[_0x1f02('0x22')](function(){var _0x47ee27=_0x53cc42(this);if(!_0x47ee27[_0x1f02('0x1c')])return _0x51eff6(['UL\x20do\x20menu\x20não\x20encontrada',_0x591a1c],_0x1f02('0x8'));_0x47ee27[_0x1f02('0x23')](_0x1f02('0x2f'))[_0x1f02('0x1d')]()[_0x1f02('0xe')](_0x1f02('0x30'));_0x47ee27[_0x1f02('0x23')]('li')[_0x1f02('0x22')](function(){var _0x26bb8d=_0x53cc42(this);var _0x5e9371=_0x26bb8d[_0x1f02('0x31')](':not(ul)');_0x5e9371[_0x1f02('0x1c')]&&_0x26bb8d['addClass'](_0x1f02('0x32')+_0x5e9371[_0x1f02('0x33')]()[_0x1f02('0x29')]()['trim']()['replaceSpecialChars']()[_0x1f02('0x12')](/\./g,'')[_0x1f02('0x12')](/\s/g,'-')[_0x1f02('0x9')]());});var _0x469440=_0x47ee27[_0x1f02('0x23')](_0x1f02('0x34'))[_0x1f02('0x35')]();_0x47ee27[_0x1f02('0xe')](_0x1f02('0x36'));_0x469440=_0x469440['find'](_0x1f02('0x37'));_0x469440['each'](function(){var _0x51c8be=_0x53cc42(this);_0x51c8be[_0x1f02('0x23')]('>li')['qdAmAddNdx']()[_0x1f02('0xe')]('qd-am-column');_0x51c8be['addClass'](_0x1f02('0x38'));_0x51c8be[_0x1f02('0x1d')]()['addClass'](_0x1f02('0x39'));});_0x469440[_0x1f02('0xe')](_0x1f02('0x39'));var _0x3b1f5b=0x0,_0x46d604=function(_0x623e8a){_0x3b1f5b+=0x1;_0x623e8a=_0x623e8a[_0x1f02('0x31')]('li')[_0x1f02('0x31')]('*');_0x623e8a[_0x1f02('0x1c')]&&(_0x623e8a[_0x1f02('0xe')](_0x1f02('0x3a')+_0x3b1f5b),_0x46d604(_0x623e8a));};_0x46d604(_0x47ee27);_0x47ee27[_0x1f02('0x3b')](_0x47ee27[_0x1f02('0x23')]('ul'))[_0x1f02('0x22')](function(){var _0x282e5b=_0x53cc42(this);_0x282e5b[_0x1f02('0xe')](_0x1f02('0x3c')+_0x282e5b[_0x1f02('0x31')]('li')[_0x1f02('0x1c')]+'-li');});});_0x3f5c5e(_0x3ec5bd);_0x30184d[_0x1f02('0x3d')]['call'](this);_0x53cc42(window)[_0x1f02('0x3e')]('QuatroDigital.am.callback',_0x591a1c);};_0x53cc42['fn'][_0x1f02('0x3f')]=function(_0xc14fcb){var _0x2915ea=_0x53cc42(this);if(!_0x2915ea[_0x1f02('0x1c')])return _0x2915ea;_0x30184d=_0x53cc42[_0x1f02('0x40')]({},_0x2e8594,_0xc14fcb);_0x2915ea[_0x1f02('0x41')]=new _0x53cc42[(_0x1f02('0x3f'))](_0x53cc42(this));return _0x2915ea;};_0x53cc42(function(){_0x53cc42(_0x1f02('0x42'))[_0x1f02('0x3f')]();});}}(this));

/*  Automatizador de comments box do Facebook Carlos Vinicius [Quatro Digital] */
/* Automatizador de comments box do Facebook // 1.6 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a=$(".fb-comments");a.length&&a.attr("data-href",document.location.href.split("#").shift().split("?").shift());$("#fb-root").length||$("body").append('<div id="fb-root"></div>');if(!$("script#facebook-jssdk").length){a=$("meta[property='fb:app_id']").attr("content")||!1;var b,c=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||(b=document.createElement("script"),b.id="facebook-jssdk",b.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+
(a?"&appId="+a:""),c.parentNode.insertBefore(b,c))}"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse()});

/* Quatro Digital Smart Cart */
var _0xcca7=['Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','[data-sku=\x27','outerHeight','qd-ddc-lastAdded','qd-ddc-lastAddedFixed','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','qd-ddc-cart-empty','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku-index','changeQantity','data-sku','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','click.qd_ddc_minus','focusout.qd_ddc_change','.qd-ddc-quantity','keyup.qd_ddc_change','click.qd_ddc_remove','removeProduct','stop','remove','shippingCalculate','qdDdcLastPostalCode','calculateShipping','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','index','removeItems','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','.qd-bap-qtt','.qd_bap_wrapper_content','ajaxStop','.qdDdcContainer','QD_smartCart','dropDown','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','smartCart','getParent','closest','abs','undefined','pow','round','toFixed','split','length','replace','join','function','prototype','trim','capitalize','charAt','toUpperCase','slice','toLowerCase','000','error','object','data','stringify','toString','type','jqXHR','done','success','fail','always','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','message','version','4.0','checkout','getOrderForm','call','QuatroDigital_simpleCart','ajaxStopOn','simpleCart','alerta','[Simple\x20Cart]\x0a','info','add','elements','QD_simpleCart','.qd_cart_qtt','.qd_cart_total','.qd_items_text','meta[name=currency]','attr','content','each','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','Shipping','value','total','currencySymbol','allTotal','qtt','items','callback','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','.singular','show','hide','filter','.plural','addClass','qd-emptyCart','removeClass','$this','O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','cartTotalE','html','cartQttE','itemsTextE','extend','find','cartTotal','itemsText','emptyElem','emptyCart','qd-sc-populated','smartCheckout','_QuatroDigital_DropDown','vtexjs','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','QD_checkoutQueue','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','trigger','simpleCartCallback.quatro_digital','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','.qd_cart_auto','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','Oooops!\x20','warn','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','Callbacks','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','.productInformationWrapper\x20\x20a.buy-button','javascript:','body','.productQuickView','Produto\x20adicionado\x20ao\x20carrinho!','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','location','href','#produto,\x20.produto','QD_buyButton','isSmartCheckout','qd-bb-click-active','click.qd_bb_buy_sc','clickBuySmartCheckout','preventDefault','Método\x20descontinuado!','buyButton','.qd-sbb-on','.btn-add-buy-button-asynchronous','.remove-href','qd-bb-active','children','.qd-bb-productAdded','append','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','.buy-in-page-button','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','prodAdd','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','---','qd-bb-itemAddBuyButtonWrapper','qd-bb-itemAddCartWrapper','getCartInfoByUrl','função\x20descontinuada','allowUpdate','bind','mouseenter.qd_bb_buy_sc','unbind','click','load','indexOf','execDefaultAction','redirect=false','redirect=true','queue','test','match','push','productPageCallback','buyButtonClickCallback','ku=','shift','asyncCallback','fakeRequest','ajax','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','prepend','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','QuatroDigital.qd_bb_prod_add','ajaxSend','url','/checkout/cart/add','pop','productAddedToCart.qdSbbVtex','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','QD_dropDownCart','bgbqvina%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','ite','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','Ir\x20ao\x20Carrinho','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','name','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','val','keyup.qd_ddc_cep','updateOnlyHover','cartIsEmpty','texts','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','.qd-ddc-viewCart','linkCart','.qd_ddc_continueShopping','.qd-ddc-checkout','linkCheckout','shippingForm','.qd-ddc-emptyCart\x20p','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','.qd-ddc-infoAllTotal'];(function(_0xc24be0,_0x36a97f){var _0x59349b=function(_0x4f64a8){while(--_0x4f64a8){_0xc24be0['push'](_0xc24be0['shift']());}};_0x59349b(++_0x36a97f);}(_0xcca7,0x1aa));var _0x7cca=function(_0x347058,_0x32b0d0){_0x347058=_0x347058-0x0;var _0x2bd501=_0xcca7[_0x347058];return _0x2bd501;};(function(_0x58285f){_0x58285f['fn'][_0x7cca('0x0')]=_0x58285f['fn'][_0x7cca('0x1')];}(jQuery));function qd_number_format(_0x33db4f,_0x5cfce5,_0x4c311e,_0x30823f){_0x33db4f=(_0x33db4f+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x33db4f=isFinite(+_0x33db4f)?+_0x33db4f:0x0;_0x5cfce5=isFinite(+_0x5cfce5)?Math[_0x7cca('0x2')](_0x5cfce5):0x0;_0x30823f=_0x7cca('0x3')===typeof _0x30823f?',':_0x30823f;_0x4c311e=_0x7cca('0x3')===typeof _0x4c311e?'.':_0x4c311e;var _0xe70805='',_0xe70805=function(_0x5aec51,_0x508f29){var _0x5cfce5=Math[_0x7cca('0x4')](0xa,_0x508f29);return''+(Math[_0x7cca('0x5')](_0x5aec51*_0x5cfce5)/_0x5cfce5)[_0x7cca('0x6')](_0x508f29);},_0xe70805=(_0x5cfce5?_0xe70805(_0x33db4f,_0x5cfce5):''+Math[_0x7cca('0x5')](_0x33db4f))[_0x7cca('0x7')]('.');0x3<_0xe70805[0x0][_0x7cca('0x8')]&&(_0xe70805[0x0]=_0xe70805[0x0][_0x7cca('0x9')](/\B(?=(?:\d{3})+(?!\d))/g,_0x30823f));(_0xe70805[0x1]||'')[_0x7cca('0x8')]<_0x5cfce5&&(_0xe70805[0x1]=_0xe70805[0x1]||'',_0xe70805[0x1]+=Array(_0x5cfce5-_0xe70805[0x1][_0x7cca('0x8')]+0x1)['join']('0'));return _0xe70805[_0x7cca('0xa')](_0x4c311e);};_0x7cca('0xb')!==typeof String[_0x7cca('0xc')][_0x7cca('0xd')]&&(String[_0x7cca('0xc')]['trim']=function(){return this[_0x7cca('0x9')](/^\s+|\s+$/g,'');});_0x7cca('0xb')!=typeof String[_0x7cca('0xc')]['capitalize']&&(String['prototype'][_0x7cca('0xe')]=function(){return this[_0x7cca('0xf')](0x0)[_0x7cca('0x10')]()+this[_0x7cca('0x11')](0x1)[_0x7cca('0x12')]();});(function(_0x3d3141){if(_0x7cca('0xb')!==typeof _0x3d3141['qdAjax']){var _0x216d4b={};_0x3d3141['qdAjaxQueue']=_0x216d4b;0x96>parseInt((_0x3d3141['fn']['jquery']['replace'](/[^0-9]+/g,'')+_0x7cca('0x13'))[_0x7cca('0x11')](0x0,0x3),0xa)&&console&&_0x7cca('0xb')==typeof console[_0x7cca('0x14')]&&console[_0x7cca('0x14')]();_0x3d3141['qdAjax']=function(_0xb35e1d){try{var _0x4fba9e=_0x3d3141['extend']({},{'url':'','type':'GET','data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0xb35e1d);var _0x370469=_0x7cca('0x15')===typeof _0x4fba9e[_0x7cca('0x16')]?JSON[_0x7cca('0x17')](_0x4fba9e[_0x7cca('0x16')]):_0x4fba9e[_0x7cca('0x16')][_0x7cca('0x18')]();var _0x1e183f=encodeURIComponent(_0x4fba9e['url']+'|'+_0x4fba9e[_0x7cca('0x19')]+'|'+_0x370469);_0x216d4b[_0x1e183f]=_0x216d4b[_0x1e183f]||{};_0x7cca('0x3')==typeof _0x216d4b[_0x1e183f][_0x7cca('0x1a')]?_0x216d4b[_0x1e183f][_0x7cca('0x1a')]=_0x3d3141['ajax'](_0x4fba9e):(_0x216d4b[_0x1e183f][_0x7cca('0x1a')][_0x7cca('0x1b')](_0x4fba9e[_0x7cca('0x1c')]),_0x216d4b[_0x1e183f][_0x7cca('0x1a')][_0x7cca('0x1d')](_0x4fba9e[_0x7cca('0x14')]),_0x216d4b[_0x1e183f][_0x7cca('0x1a')][_0x7cca('0x1e')](_0x4fba9e['complete']));_0x216d4b[_0x1e183f][_0x7cca('0x1a')][_0x7cca('0x1e')](function(){isNaN(parseInt(_0x4fba9e[_0x7cca('0x1f')]))||setTimeout(function(){_0x216d4b[_0x1e183f][_0x7cca('0x1a')]=void 0x0;},_0x4fba9e[_0x7cca('0x1f')]);});return _0x216d4b[_0x1e183f][_0x7cca('0x1a')];}catch(_0x35ebe8){_0x7cca('0x3')!==typeof console&&'function'===typeof console[_0x7cca('0x14')]&&console['error'](_0x7cca('0x20')+_0x35ebe8[_0x7cca('0x21')]);}};_0x3d3141['qdAjax'][_0x7cca('0x22')]=_0x7cca('0x23');}}(jQuery));(function(_0x5533fb){_0x5533fb['fn'][_0x7cca('0x0')]=_0x5533fb['fn'][_0x7cca('0x1')];}(jQuery));(function(){var _0x100061=jQuery;if('function'!==typeof _0x100061['fn']['simpleCart']){_0x100061(function(){var _0x41f5bc=vtexjs[_0x7cca('0x24')][_0x7cca('0x25')];vtexjs[_0x7cca('0x24')][_0x7cca('0x25')]=function(){return _0x41f5bc[_0x7cca('0x26')]();};});try{window[_0x7cca('0x27')]=window['QuatroDigital_simpleCart']||{};window['QuatroDigital_simpleCart'][_0x7cca('0x28')]=!0x1;_0x100061['fn'][_0x7cca('0x29')]=function(_0x28878d,_0x4f5fd2,_0x2c4f63){var _0x4f8e75=function(_0x2061fe,_0x10558a){if(_0x7cca('0x15')===typeof console){var _0x2b7e40='object'===typeof _0x2061fe;_0x7cca('0x3')!==typeof _0x10558a&&_0x7cca('0x2a')===_0x10558a[_0x7cca('0x12')]()?_0x2b7e40?console['warn']('[Simple\x20Cart]\x0a',_0x2061fe[0x0],_0x2061fe[0x1],_0x2061fe[0x2],_0x2061fe[0x3],_0x2061fe[0x4],_0x2061fe[0x5],_0x2061fe[0x6],_0x2061fe[0x7]):console['warn'](_0x7cca('0x2b')+_0x2061fe):_0x7cca('0x3')!==typeof _0x10558a&&'info'===_0x10558a[_0x7cca('0x12')]()?_0x2b7e40?console[_0x7cca('0x2c')](_0x7cca('0x2b'),_0x2061fe[0x0],_0x2061fe[0x1],_0x2061fe[0x2],_0x2061fe[0x3],_0x2061fe[0x4],_0x2061fe[0x5],_0x2061fe[0x6],_0x2061fe[0x7]):console[_0x7cca('0x2c')](_0x7cca('0x2b')+_0x2061fe):_0x2b7e40?console[_0x7cca('0x14')](_0x7cca('0x2b'),_0x2061fe[0x0],_0x2061fe[0x1],_0x2061fe[0x2],_0x2061fe[0x3],_0x2061fe[0x4],_0x2061fe[0x5],_0x2061fe[0x6],_0x2061fe[0x7]):console['error'](_0x7cca('0x2b')+_0x2061fe);}};var _0x1f9bce=_0x100061(this);_0x7cca('0x15')===typeof _0x28878d?_0x4f5fd2=_0x28878d:(_0x28878d=_0x28878d||!0x1,_0x1f9bce=_0x1f9bce[_0x7cca('0x2d')](_0x100061['QD_simpleCart'][_0x7cca('0x2e')]));if(!_0x1f9bce[_0x7cca('0x8')])return _0x1f9bce;_0x100061[_0x7cca('0x2f')]['elements']=_0x100061[_0x7cca('0x2f')]['elements'][_0x7cca('0x2d')](_0x1f9bce);_0x2c4f63=_0x7cca('0x3')===typeof _0x2c4f63?!0x1:_0x2c4f63;var _0x442725={'cartQtt':_0x7cca('0x30'),'cartTotal':_0x7cca('0x31'),'itemsText':_0x7cca('0x32'),'currencySymbol':(_0x100061(_0x7cca('0x33'))[_0x7cca('0x34')](_0x7cca('0x35'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x4f1f11=_0x100061['extend']({},_0x442725,_0x4f5fd2);var _0xc2b153=_0x100061('');_0x1f9bce[_0x7cca('0x36')](function(){var _0x5cb715=_0x100061(this);_0x5cb715['data'](_0x7cca('0x37'))||_0x5cb715[_0x7cca('0x16')](_0x7cca('0x37'),_0x4f1f11);});var _0x37153f=function(_0x371c67){window['_QuatroDigital_CartData']=window[_0x7cca('0x38')]||{};for(var _0x28878d=0x0,_0x4e3648=0x0,_0x3e914f=0x0;_0x3e914f<_0x371c67[_0x7cca('0x39')]['length'];_0x3e914f++)_0x7cca('0x3a')==_0x371c67['totalizers'][_0x3e914f]['id']&&(_0x4e3648+=_0x371c67[_0x7cca('0x39')][_0x3e914f][_0x7cca('0x3b')]),_0x28878d+=_0x371c67[_0x7cca('0x39')][_0x3e914f]['value'];window[_0x7cca('0x38')][_0x7cca('0x3c')]=_0x4f1f11[_0x7cca('0x3d')]+qd_number_format(_0x28878d/0x64,0x2,',','.');window[_0x7cca('0x38')]['shipping']=_0x4f1f11[_0x7cca('0x3d')]+qd_number_format(_0x4e3648/0x64,0x2,',','.');window[_0x7cca('0x38')][_0x7cca('0x3e')]=_0x4f1f11[_0x7cca('0x3d')]+qd_number_format((_0x28878d+_0x4e3648)/0x64,0x2,',','.');window[_0x7cca('0x38')][_0x7cca('0x3f')]=0x0;if(_0x4f1f11['showQuantityByItems'])for(_0x3e914f=0x0;_0x3e914f<_0x371c67['items']['length'];_0x3e914f++)window['_QuatroDigital_CartData'][_0x7cca('0x3f')]+=_0x371c67['items'][_0x3e914f]['quantity'];else window[_0x7cca('0x38')][_0x7cca('0x3f')]=_0x371c67[_0x7cca('0x40')][_0x7cca('0x8')]||0x0;try{window[_0x7cca('0x38')]['callback']&&window[_0x7cca('0x38')][_0x7cca('0x41')][_0x7cca('0x42')]&&window[_0x7cca('0x38')][_0x7cca('0x41')][_0x7cca('0x42')]();}catch(_0x40f4f9){_0x4f8e75(_0x7cca('0x43'));}_0x45d6ff(_0xc2b153);};var _0x20458d=function(_0x1e9a9a,_0x1bc30a){0x1===_0x1e9a9a?_0x1bc30a['hide']()['filter'](_0x7cca('0x44'))[_0x7cca('0x45')]():_0x1bc30a[_0x7cca('0x46')]()[_0x7cca('0x47')](_0x7cca('0x48'))[_0x7cca('0x45')]();};var _0x3fdea7=function(_0x4f59b3){0x1>_0x4f59b3?_0x1f9bce[_0x7cca('0x49')](_0x7cca('0x4a')):_0x1f9bce[_0x7cca('0x4b')](_0x7cca('0x4a'));};var _0x5298be=function(_0x3989de,_0x96341e){var _0x12565f=parseInt(window[_0x7cca('0x38')][_0x7cca('0x3f')],0xa);_0x96341e[_0x7cca('0x4c')][_0x7cca('0x45')]();isNaN(_0x12565f)&&(_0x4f8e75(_0x7cca('0x4d'),_0x7cca('0x2a')),_0x12565f=0x0);_0x96341e[_0x7cca('0x4e')][_0x7cca('0x4f')](window[_0x7cca('0x38')][_0x7cca('0x3c')]);_0x96341e[_0x7cca('0x50')][_0x7cca('0x4f')](_0x12565f);_0x20458d(_0x12565f,_0x96341e[_0x7cca('0x51')]);_0x3fdea7(_0x12565f);};var _0x45d6ff=function(_0x27c527){_0x1f9bce[_0x7cca('0x36')](function(){var _0x30141a={};var _0x446fcc=_0x100061(this);_0x28878d&&_0x446fcc[_0x7cca('0x16')](_0x7cca('0x37'))&&_0x100061[_0x7cca('0x52')](_0x4f1f11,_0x446fcc[_0x7cca('0x16')](_0x7cca('0x37')));_0x30141a['$this']=_0x446fcc;_0x30141a[_0x7cca('0x50')]=_0x446fcc[_0x7cca('0x53')](_0x4f1f11['cartQtt'])||_0xc2b153;_0x30141a['cartTotalE']=_0x446fcc['find'](_0x4f1f11[_0x7cca('0x54')])||_0xc2b153;_0x30141a[_0x7cca('0x51')]=_0x446fcc['find'](_0x4f1f11[_0x7cca('0x55')])||_0xc2b153;_0x30141a[_0x7cca('0x56')]=_0x446fcc['find'](_0x4f1f11[_0x7cca('0x57')])||_0xc2b153;_0x5298be(_0x27c527,_0x30141a);_0x446fcc['addClass'](_0x7cca('0x58'));});};(function(){if(_0x4f1f11[_0x7cca('0x59')]){window[_0x7cca('0x5a')]=window[_0x7cca('0x5a')]||{};if(_0x7cca('0x3')!==typeof window[_0x7cca('0x5a')][_0x7cca('0x25')]&&(_0x2c4f63||!_0x28878d))return _0x37153f(window[_0x7cca('0x5a')][_0x7cca('0x25')]);if(_0x7cca('0x15')!==typeof window[_0x7cca('0x5b')]||_0x7cca('0x3')===typeof window[_0x7cca('0x5b')]['checkout'])if(_0x7cca('0x15')===typeof vtex&&'object'===typeof vtex[_0x7cca('0x24')]&&'undefined'!==typeof vtex[_0x7cca('0x24')][_0x7cca('0x5c')])new vtex[(_0x7cca('0x24'))]['SDK']();else return _0x4f8e75(_0x7cca('0x5d'));_0x100061[_0x7cca('0x5e')]([_0x7cca('0x40'),_0x7cca('0x39'),_0x7cca('0x5f')],{'done':function(_0x538b56){_0x37153f(_0x538b56);window['_QuatroDigital_DropDown'][_0x7cca('0x25')]=_0x538b56;},'fail':function(_0x3a52dc){_0x4f8e75([_0x7cca('0x60'),_0x3a52dc]);}});}else alert(_0x7cca('0x61'));}());_0x4f1f11[_0x7cca('0x41')]();_0x100061(window)[_0x7cca('0x62')](_0x7cca('0x63'));return _0x1f9bce;};_0x100061[_0x7cca('0x2f')]={'elements':_0x100061('')};_0x100061(function(){var _0x3327b1;_0x7cca('0xb')===typeof window[_0x7cca('0x64')]&&(_0x3327b1=window[_0x7cca('0x64')],window[_0x7cca('0x64')]=function(_0x5cc070,_0x23cfb5,_0x4e3582,_0x5bd0b4,_0x239bc3){_0x3327b1[_0x7cca('0x26')](this,_0x5cc070,_0x23cfb5,_0x4e3582,_0x5bd0b4,function(){_0x7cca('0xb')===typeof _0x239bc3&&_0x239bc3();_0x100061['QD_simpleCart'][_0x7cca('0x2e')][_0x7cca('0x36')](function(){var _0x14efae=_0x100061(this);_0x14efae[_0x7cca('0x29')](_0x14efae[_0x7cca('0x16')]('qd_simpleCartOpts'));});});});});var _0x24901f=window[_0x7cca('0x65')]||void 0x0;window[_0x7cca('0x65')]=function(_0x3da37b){_0x100061['fn']['simpleCart'](!0x0);_0x7cca('0xb')===typeof _0x24901f?_0x24901f[_0x7cca('0x26')](this,_0x3da37b):alert(_0x3da37b);};_0x100061(function(){var _0x573e1d=_0x100061(_0x7cca('0x66'));_0x573e1d['length']&&_0x573e1d[_0x7cca('0x29')]();});_0x100061(function(){_0x100061(window)['bind'](_0x7cca('0x67'),function(){_0x100061['fn'][_0x7cca('0x29')](!0x0);});});}catch(_0x3bd2d2){_0x7cca('0x3')!==typeof console&&_0x7cca('0xb')===typeof console[_0x7cca('0x14')]&&console[_0x7cca('0x14')](_0x7cca('0x68'),_0x3bd2d2);}}}());(function(){var _0x44ed8e=function(_0x1c347b,_0x4dafb0){if(_0x7cca('0x15')===typeof console){var _0x451f2d=_0x7cca('0x15')===typeof _0x1c347b;'undefined'!==typeof _0x4dafb0&&_0x7cca('0x2a')===_0x4dafb0['toLowerCase']()?_0x451f2d?console[_0x7cca('0x69')](_0x7cca('0x6a'),_0x1c347b[0x0],_0x1c347b[0x1],_0x1c347b[0x2],_0x1c347b[0x3],_0x1c347b[0x4],_0x1c347b[0x5],_0x1c347b[0x6],_0x1c347b[0x7]):console[_0x7cca('0x69')](_0x7cca('0x6a')+_0x1c347b):_0x7cca('0x3')!==typeof _0x4dafb0&&_0x7cca('0x2c')===_0x4dafb0[_0x7cca('0x12')]()?_0x451f2d?console[_0x7cca('0x2c')](_0x7cca('0x6a'),_0x1c347b[0x0],_0x1c347b[0x1],_0x1c347b[0x2],_0x1c347b[0x3],_0x1c347b[0x4],_0x1c347b[0x5],_0x1c347b[0x6],_0x1c347b[0x7]):console[_0x7cca('0x2c')](_0x7cca('0x6a')+_0x1c347b):_0x451f2d?console[_0x7cca('0x14')](_0x7cca('0x6a'),_0x1c347b[0x0],_0x1c347b[0x1],_0x1c347b[0x2],_0x1c347b[0x3],_0x1c347b[0x4],_0x1c347b[0x5],_0x1c347b[0x6],_0x1c347b[0x7]):console['error'](_0x7cca('0x6a')+_0x1c347b);}},_0x468ffa=null,_0x35c3ec={},_0xa605c9={},_0x2c20b8={};$['QD_checkoutQueue']=function(_0xca272e,_0x30383f){if(null===_0x468ffa)if(_0x7cca('0x15')===typeof window[_0x7cca('0x5b')]&&'undefined'!==typeof window[_0x7cca('0x5b')][_0x7cca('0x24')])_0x468ffa=window[_0x7cca('0x5b')][_0x7cca('0x24')];else return _0x44ed8e(_0x7cca('0x6b'));var _0x46c976=$[_0x7cca('0x52')]({'done':function(){},'fail':function(){}},_0x30383f),_0x4b932f=_0xca272e[_0x7cca('0xa')](';'),_0x41fde5=function(){_0x35c3ec[_0x4b932f][_0x7cca('0x2d')](_0x46c976[_0x7cca('0x1b')]);_0xa605c9[_0x4b932f][_0x7cca('0x2d')](_0x46c976[_0x7cca('0x1d')]);};_0x2c20b8[_0x4b932f]?_0x41fde5():(_0x35c3ec[_0x4b932f]=$[_0x7cca('0x6c')](),_0xa605c9[_0x4b932f]=$[_0x7cca('0x6c')](),_0x41fde5(),_0x2c20b8[_0x4b932f]=!0x0,_0x468ffa['getOrderForm'](_0xca272e)[_0x7cca('0x1b')](function(_0x3b87e6){_0x2c20b8[_0x4b932f]=!0x1;_0x35c3ec[_0x4b932f]['fire'](_0x3b87e6);})[_0x7cca('0x1d')](function(_0x5b4ca5){_0x2c20b8[_0x4b932f]=!0x1;_0xa605c9[_0x4b932f][_0x7cca('0x42')](_0x5b4ca5);}));};}());(function(_0x24e643){try{var _0x313cd1=jQuery,_0x27e79c,_0x1a490b=_0x313cd1({}),_0x2af32b=function(_0x3a0732,_0x6a8a74){if(_0x7cca('0x15')===typeof console&&'undefined'!==typeof console[_0x7cca('0x14')]&&_0x7cca('0x3')!==typeof console[_0x7cca('0x2c')]&&_0x7cca('0x3')!==typeof console[_0x7cca('0x69')]){var _0x2395c8;_0x7cca('0x15')===typeof _0x3a0732?(_0x3a0732[_0x7cca('0x6d')]('[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a'),_0x2395c8=_0x3a0732):_0x2395c8=[_0x7cca('0x6e')+_0x3a0732];if(_0x7cca('0x3')===typeof _0x6a8a74||_0x7cca('0x2a')!==_0x6a8a74['toLowerCase']()&&_0x7cca('0x6f')!==_0x6a8a74[_0x7cca('0x12')]())if(_0x7cca('0x3')!==typeof _0x6a8a74&&_0x7cca('0x2c')===_0x6a8a74['toLowerCase']())try{console[_0x7cca('0x2c')][_0x7cca('0x70')](console,_0x2395c8);}catch(_0x2e93d6){try{console[_0x7cca('0x2c')](_0x2395c8[_0x7cca('0xa')]('\x0a'));}catch(_0x418ba4){}}else try{console[_0x7cca('0x14')]['apply'](console,_0x2395c8);}catch(_0x284dcb){try{console[_0x7cca('0x14')](_0x2395c8[_0x7cca('0xa')]('\x0a'));}catch(_0xfd3d30){}}else try{console[_0x7cca('0x69')]['apply'](console,_0x2395c8);}catch(_0x30204b){try{console[_0x7cca('0x69')](_0x2395c8['join']('\x0a'));}catch(_0x32cd4b){}}}},_0x157b0e={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0x7cca('0x71'),'buyQtt':'input.buy-in-page-quantity','selectSkuMsg':_0x7cca('0x72'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x19d48e,_0x23ce9b,_0x10a877){_0x313cd1(_0x7cca('0x73'))['is'](_0x7cca('0x74'))&&(_0x7cca('0x1c')===_0x23ce9b?alert(_0x7cca('0x75')):(alert(_0x7cca('0x76')),(_0x7cca('0x15')===typeof parent?parent:document)[_0x7cca('0x77')][_0x7cca('0x78')]=_0x10a877));},'isProductPage':function(){return _0x313cd1('body')['is'](_0x7cca('0x79'));},'execDefaultAction':function(_0x2cbf09){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x313cd1[_0x7cca('0x7a')]=function(_0x47ce12,_0x217fa9){function _0x472d36(_0x488236){_0x27e79c[_0x7cca('0x7b')]?_0x488236[_0x7cca('0x16')](_0x7cca('0x7c'))||(_0x488236['data'](_0x7cca('0x7c'),0x1),_0x488236['on'](_0x7cca('0x7d'),function(_0x1a7f1c){if(!_0x27e79c['allowBuyClick']())return!0x0;if(!0x0!==_0x4e4272[_0x7cca('0x7e')]['call'](this))return _0x1a7f1c[_0x7cca('0x7f')](),!0x1;})):alert(_0x7cca('0x80'));}function _0x158d6c(_0x532492){_0x532492=_0x532492||_0x313cd1(_0x27e79c[_0x7cca('0x81')]);_0x532492['each'](function(){var _0x532492=_0x313cd1(this);_0x532492['is'](_0x7cca('0x82'))||(_0x532492[_0x7cca('0x49')]('qd-sbb-on'),_0x532492['is'](_0x7cca('0x83'))&&!_0x532492['is'](_0x7cca('0x84'))||_0x532492[_0x7cca('0x16')]('qd-bb-active')||(_0x532492[_0x7cca('0x16')](_0x7cca('0x85'),0x1),_0x532492[_0x7cca('0x86')](_0x7cca('0x87'))[_0x7cca('0x8')]||_0x532492[_0x7cca('0x88')](_0x7cca('0x89')),_0x532492['is'](_0x7cca('0x8a'))&&_0x27e79c[_0x7cca('0x8b')]()&&_0x39237f[_0x7cca('0x26')](_0x532492),_0x472d36(_0x532492)));});_0x27e79c[_0x7cca('0x8b')]()&&!_0x532492[_0x7cca('0x8')]&&_0x2af32b(_0x7cca('0x8c')+_0x532492[_0x7cca('0x8d')]+'\x27.',_0x7cca('0x2c'));}var _0x1c1203=_0x313cd1(_0x47ce12);var _0x4e4272=this;window[_0x7cca('0x8e')]=window[_0x7cca('0x8e')]||{};window[_0x7cca('0x38')]=window['_QuatroDigital_CartData']||{};_0x4e4272[_0x7cca('0x8f')]=function(_0x36e6b5,_0x32e6ee){_0x1c1203[_0x7cca('0x49')](_0x7cca('0x90'));_0x313cd1(_0x7cca('0x73'))[_0x7cca('0x49')]('qd-bb-lightBoxBodyProdAdd');var _0x31ba52=_0x313cd1(_0x27e79c[_0x7cca('0x81')])[_0x7cca('0x47')]('[href=\x27'+(_0x36e6b5['attr']('href')||_0x7cca('0x91'))+'\x27]')[_0x7cca('0x2d')](_0x36e6b5);_0x31ba52[_0x7cca('0x49')](_0x7cca('0x92'));setTimeout(function(){_0x1c1203['removeClass'](_0x7cca('0x93'));_0x31ba52[_0x7cca('0x4b')](_0x7cca('0x92'));},_0x27e79c['timeRemoveNewItemClass']);window[_0x7cca('0x8e')][_0x7cca('0x25')]=void 0x0;if('undefined'!==typeof _0x217fa9&&_0x7cca('0xb')===typeof _0x217fa9[_0x7cca('0x94')])return _0x27e79c[_0x7cca('0x7b')]||(_0x2af32b(_0x7cca('0x95')),_0x217fa9[_0x7cca('0x94')]()),window[_0x7cca('0x5a')][_0x7cca('0x25')]=void 0x0,_0x217fa9[_0x7cca('0x94')](function(_0x243f2d){window[_0x7cca('0x8e')][_0x7cca('0x25')]=_0x243f2d;_0x313cd1['fn'][_0x7cca('0x29')](!0x0,void 0x0,!0x0);},{'lastSku':_0x32e6ee});window[_0x7cca('0x8e')][_0x7cca('0x96')]=!0x0;_0x313cd1['fn'][_0x7cca('0x29')](!0x0);};(function(){if(_0x27e79c[_0x7cca('0x7b')]&&_0x27e79c['autoWatchBuyButton']){var _0x35facd=_0x313cd1('.btn-add-buy-button-asynchronous');_0x35facd[_0x7cca('0x8')]&&_0x158d6c(_0x35facd);}}());var _0x39237f=function(){var _0x301371=_0x313cd1(this);_0x7cca('0x3')!==typeof _0x301371[_0x7cca('0x16')](_0x7cca('0x81'))?(_0x301371['unbind']('click'),_0x472d36(_0x301371)):(_0x301371[_0x7cca('0x97')](_0x7cca('0x98'),function(_0x312fc1){_0x301371[_0x7cca('0x99')](_0x7cca('0x9a'));_0x472d36(_0x301371);_0x313cd1(this)[_0x7cca('0x99')](_0x312fc1);}),_0x313cd1(window)[_0x7cca('0x9b')](function(){_0x301371['unbind']('click');_0x472d36(_0x301371);_0x301371[_0x7cca('0x99')](_0x7cca('0x98'));}));};_0x4e4272['clickBuySmartCheckout']=function(){var _0x153473=_0x313cd1(this),_0x47ce12=_0x153473['attr'](_0x7cca('0x78'))||'';if(-0x1<_0x47ce12[_0x7cca('0x9c')](_0x27e79c['selectSkuMsg']))return!0x0;_0x47ce12=_0x47ce12[_0x7cca('0x9')](/redirect\=(false|true)/gi,'')[_0x7cca('0x9')]('?','?redirect=false&')['replace'](/\&\&/gi,'&');if(_0x27e79c[_0x7cca('0x9d')](_0x153473))return _0x153473['attr'](_0x7cca('0x78'),_0x47ce12[_0x7cca('0x9')](_0x7cca('0x9e'),_0x7cca('0x9f'))),!0x0;_0x47ce12=_0x47ce12[_0x7cca('0x9')](/http.?:/i,'');_0x1a490b[_0x7cca('0xa0')](function(_0x78fbe2){if(!_0x27e79c['buyIfQuantityZeroed']&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0x7cca('0xa1')](_0x47ce12))return _0x78fbe2();var _0x367017=function(_0x5e2f70,_0x44395c){var _0x158d6c=_0x47ce12[_0x7cca('0xa2')](/sku\=([0-9]+)/gi),_0x1ffa2b=[];if(_0x7cca('0x15')===typeof _0x158d6c&&null!==_0x158d6c)for(var _0x143f47=_0x158d6c[_0x7cca('0x8')]-0x1;0x0<=_0x143f47;_0x143f47--){var _0x1bb4e8=parseInt(_0x158d6c[_0x143f47][_0x7cca('0x9')](/sku\=/gi,''));isNaN(_0x1bb4e8)||_0x1ffa2b[_0x7cca('0xa3')](_0x1bb4e8);}_0x27e79c[_0x7cca('0xa4')][_0x7cca('0x26')](this,_0x5e2f70,_0x44395c,_0x47ce12);_0x4e4272[_0x7cca('0xa5')][_0x7cca('0x26')](this,_0x5e2f70,_0x44395c,_0x47ce12,_0x1ffa2b);_0x4e4272[_0x7cca('0x8f')](_0x153473,_0x47ce12[_0x7cca('0x7')](_0x7cca('0xa6'))['pop']()[_0x7cca('0x7')]('&')[_0x7cca('0xa7')]());_0x7cca('0xb')===typeof _0x27e79c[_0x7cca('0xa8')]&&_0x27e79c[_0x7cca('0xa8')][_0x7cca('0x26')](this);_0x313cd1(window)[_0x7cca('0x62')]('productAddedToCart');_0x313cd1(window)[_0x7cca('0x62')]('cartProductAdded.vtex');};_0x27e79c[_0x7cca('0xa9')]?(_0x367017(null,_0x7cca('0x1c')),_0x78fbe2()):_0x313cd1[_0x7cca('0xaa')]({'url':_0x47ce12,'complete':_0x367017})[_0x7cca('0x1e')](function(){_0x78fbe2();});});};_0x4e4272['buyButtonClickCallback']=function(_0x289877,_0x410b9e,_0x3932c4,_0x355b99){try{_0x7cca('0x1c')===_0x410b9e&&_0x7cca('0x15')===typeof window['parent']&&_0x7cca('0xb')===typeof window[_0x7cca('0xab')][_0x7cca('0xac')]&&window[_0x7cca('0xab')][_0x7cca('0xac')](_0x289877,_0x410b9e,_0x3932c4,_0x355b99);}catch(_0x5f2121){_0x2af32b(_0x7cca('0xad'));}};_0x158d6c();_0x7cca('0xb')===typeof _0x27e79c['callback']?_0x27e79c[_0x7cca('0x41')][_0x7cca('0x26')](this):_0x2af32b('Callback\x20não\x20é\x20uma\x20função');};var _0x497327=_0x313cd1[_0x7cca('0x6c')]();_0x313cd1['fn'][_0x7cca('0x7a')]=function(_0x2e7c2f,_0x149679){var _0x24e643=_0x313cd1(this);_0x7cca('0x3')!==typeof _0x149679||'object'!==typeof _0x2e7c2f||_0x2e7c2f instanceof _0x313cd1||(_0x149679=_0x2e7c2f,_0x2e7c2f=void 0x0);_0x27e79c=_0x313cd1['extend']({},_0x157b0e,_0x149679);var _0x178d8c;_0x497327['add'](function(){_0x24e643[_0x7cca('0x86')]('.qd-bb-itemAddWrapper')[_0x7cca('0x8')]||_0x24e643[_0x7cca('0xae')](_0x7cca('0xaf'));_0x178d8c=new _0x313cd1[(_0x7cca('0x7a'))](_0x24e643,_0x2e7c2f);});_0x497327[_0x7cca('0x42')]();_0x313cd1(window)['on'](_0x7cca('0xb0'),function(_0x278834,_0x9637a9,_0x596e9a){_0x178d8c[_0x7cca('0x8f')](_0x9637a9,_0x596e9a);});return _0x313cd1['extend'](_0x24e643,_0x178d8c);};var _0x4ffac5=0x0;_0x313cd1(document)[_0x7cca('0xb1')](function(_0x2570c3,_0x44c68b,_0x3a6e03){-0x1<_0x3a6e03[_0x7cca('0xb2')][_0x7cca('0x12')]()['indexOf'](_0x7cca('0xb3'))&&(_0x4ffac5=(_0x3a6e03[_0x7cca('0xb2')][_0x7cca('0xa2')](/sku\=([0-9]+)/i)||[''])[_0x7cca('0xb4')]());});_0x313cd1(window)[_0x7cca('0x97')](_0x7cca('0xb5'),function(){_0x313cd1(window)[_0x7cca('0x62')](_0x7cca('0xb0'),[new _0x313cd1(),_0x4ffac5]);});_0x313cd1(document)['ajaxStop'](function(){_0x497327[_0x7cca('0x42')]();});}catch(_0x2157ea){_0x7cca('0x3')!==typeof console&&'function'===typeof console[_0x7cca('0x14')]&&console['error'](_0x7cca('0x68'),_0x2157ea);}}(this));function qd_number_format(_0x1de6e1,_0x5a32be,_0xc9b585,_0x1de405){_0x1de6e1=(_0x1de6e1+'')[_0x7cca('0x9')](/[^0-9+\-Ee.]/g,'');_0x1de6e1=isFinite(+_0x1de6e1)?+_0x1de6e1:0x0;_0x5a32be=isFinite(+_0x5a32be)?Math[_0x7cca('0x2')](_0x5a32be):0x0;_0x1de405='undefined'===typeof _0x1de405?',':_0x1de405;_0xc9b585=_0x7cca('0x3')===typeof _0xc9b585?'.':_0xc9b585;var _0x80daa='',_0x80daa=function(_0x5eada7,_0x33c2e2){var _0x335668=Math[_0x7cca('0x4')](0xa,_0x33c2e2);return''+(Math['round'](_0x5eada7*_0x335668)/_0x335668)['toFixed'](_0x33c2e2);},_0x80daa=(_0x5a32be?_0x80daa(_0x1de6e1,_0x5a32be):''+Math[_0x7cca('0x5')](_0x1de6e1))[_0x7cca('0x7')]('.');0x3<_0x80daa[0x0][_0x7cca('0x8')]&&(_0x80daa[0x0]=_0x80daa[0x0][_0x7cca('0x9')](/\B(?=(?:\d{3})+(?!\d))/g,_0x1de405));(_0x80daa[0x1]||'')['length']<_0x5a32be&&(_0x80daa[0x1]=_0x80daa[0x1]||'',_0x80daa[0x1]+=Array(_0x5a32be-_0x80daa[0x1]['length']+0x1)[_0x7cca('0xa')]('0'));return _0x80daa['join'](_0xc9b585);}(function(){try{window[_0x7cca('0x38')]=window[_0x7cca('0x38')]||{},window[_0x7cca('0x38')][_0x7cca('0x41')]=window['_QuatroDigital_CartData'][_0x7cca('0x41')]||$[_0x7cca('0x6c')]();}catch(_0x3d0667){_0x7cca('0x3')!==typeof console&&_0x7cca('0xb')===typeof console[_0x7cca('0x14')]&&console[_0x7cca('0x14')](_0x7cca('0x68'),_0x3d0667['message']);}}());(function(_0x1acdb4){try{var _0x5731b9=jQuery,_0x193f7f=function(_0x3641a7,_0x371c52){if(_0x7cca('0x15')===typeof console&&_0x7cca('0x3')!==typeof console['error']&&_0x7cca('0x3')!==typeof console[_0x7cca('0x2c')]&&_0x7cca('0x3')!==typeof console['warn']){var _0x1c7e7a;_0x7cca('0x15')===typeof _0x3641a7?(_0x3641a7[_0x7cca('0x6d')](_0x7cca('0xb6')),_0x1c7e7a=_0x3641a7):_0x1c7e7a=[_0x7cca('0xb6')+_0x3641a7];if(_0x7cca('0x3')===typeof _0x371c52||_0x7cca('0x2a')!==_0x371c52['toLowerCase']()&&_0x7cca('0x6f')!==_0x371c52[_0x7cca('0x12')]())if(_0x7cca('0x3')!==typeof _0x371c52&&'info'===_0x371c52[_0x7cca('0x12')]())try{console[_0x7cca('0x2c')][_0x7cca('0x70')](console,_0x1c7e7a);}catch(_0x5bfb1f){try{console[_0x7cca('0x2c')](_0x1c7e7a[_0x7cca('0xa')]('\x0a'));}catch(_0x33531e){}}else try{console[_0x7cca('0x14')][_0x7cca('0x70')](console,_0x1c7e7a);}catch(_0x5de754){try{console[_0x7cca('0x14')](_0x1c7e7a[_0x7cca('0xa')]('\x0a'));}catch(_0x15191c){}}else try{console['warn']['apply'](console,_0x1c7e7a);}catch(_0x5418ad){try{console['warn'](_0x1c7e7a['join']('\x0a'));}catch(_0xd2abb9){}}}};window[_0x7cca('0x5a')]=window['_QuatroDigital_DropDown']||{};window[_0x7cca('0x5a')][_0x7cca('0x96')]=!0x0;_0x5731b9[_0x7cca('0xb7')]=function(){};_0x5731b9['fn'][_0x7cca('0xb7')]=function(){return{'fn':new _0x5731b9()};};var _0x5b8d7a=function(_0x36fc4b){var _0x428c5a={'z':_0x7cca('0xb8')};return function(_0x306804){var _0x501f7b=function(_0x3df2d3){return _0x3df2d3;};var _0x388a1a=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x306804=_0x306804['d'+_0x388a1a[0x10]+'c'+_0x388a1a[0x11]+'m'+_0x501f7b(_0x388a1a[0x1])+'n'+_0x388a1a[0xd]]['l'+_0x388a1a[0x12]+'c'+_0x388a1a[0x0]+'ti'+_0x501f7b('o')+'n'];var _0x28a32a=function(_0xee0b6){return escape(encodeURIComponent(_0xee0b6[_0x7cca('0x9')](/\./g,'¨')[_0x7cca('0x9')](/[a-zA-Z]/g,function(_0x24ae00){return String[_0x7cca('0xb9')](('Z'>=_0x24ae00?0x5a:0x7a)>=(_0x24ae00=_0x24ae00[_0x7cca('0xba')](0x0)+0xd)?_0x24ae00:_0x24ae00-0x1a);})));};var _0x1acdb4=_0x28a32a(_0x306804[[_0x388a1a[0x9],_0x501f7b('o'),_0x388a1a[0xc],_0x388a1a[_0x501f7b(0xd)]]['join']('')]);_0x28a32a=_0x28a32a((window[['js',_0x501f7b('no'),'m',_0x388a1a[0x1],_0x388a1a[0x4][_0x7cca('0x10')](),_0x7cca('0xbb')][_0x7cca('0xa')]('')]||_0x7cca('0x91'))+['.v',_0x388a1a[0xd],'e',_0x501f7b('x'),'co',_0x501f7b('mm'),'erc',_0x388a1a[0x1],'.c',_0x501f7b('o'),'m.',_0x388a1a[0x13],'r'][_0x7cca('0xa')](''));for(var _0x1be758 in _0x428c5a){if(_0x28a32a===_0x1be758+_0x428c5a[_0x1be758]||_0x1acdb4===_0x1be758+_0x428c5a[_0x1be758]){var _0x7a32e5='tr'+_0x388a1a[0x11]+'e';break;}_0x7a32e5='f'+_0x388a1a[0x0]+'ls'+_0x501f7b(_0x388a1a[0x1])+'';}_0x501f7b=!0x1;-0x1<_0x306804[[_0x388a1a[0xc],'e',_0x388a1a[0x0],'rc',_0x388a1a[0x9]][_0x7cca('0xa')]('')][_0x7cca('0x9c')](_0x7cca('0xbc'))&&(_0x501f7b=!0x0);return[_0x7a32e5,_0x501f7b];}(_0x36fc4b);}(window);if(!eval(_0x5b8d7a[0x0]))return _0x5b8d7a[0x1]?_0x193f7f('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x5731b9[_0x7cca('0xb7')]=function(_0x3005e8,_0xa93621){var _0xafeaf0=_0x5731b9(_0x3005e8);if(!_0xafeaf0[_0x7cca('0x8')])return _0xafeaf0;var _0x17ffb4=_0x5731b9[_0x7cca('0x52')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x7cca('0xbd'),'linkCheckout':'Finalizar\x20Compra','cartTotal':_0x7cca('0xbe'),'emptyCart':_0x7cca('0xbf'),'continueShopping':_0x7cca('0xc0'),'shippingForm':_0x7cca('0xc1')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x1e88fb){return _0x1e88fb[_0x7cca('0xc2')]||_0x1e88fb[_0x7cca('0xc3')];},'callback':function(){},'callbackProductsList':function(){}},_0xa93621);_0x5731b9('');var _0x477b94=this;if(_0x17ffb4[_0x7cca('0x59')]){var _0x4c187d=!0x1;_0x7cca('0x3')===typeof window[_0x7cca('0x5b')]&&(_0x193f7f('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN'),_0x5731b9['ajax']({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':!0x1,'dataType':_0x7cca('0xc4'),'error':function(){_0x193f7f(_0x7cca('0xc5'));_0x4c187d=!0x0;}}));if(_0x4c187d)return _0x193f7f(_0x7cca('0xc6'));}if(_0x7cca('0x15')===typeof window[_0x7cca('0x5b')]&&_0x7cca('0x3')!==typeof window[_0x7cca('0x5b')]['checkout'])var _0x76bc17=window['vtexjs']['checkout'];else if('object'===typeof vtex&&_0x7cca('0x15')===typeof vtex['checkout']&&'undefined'!==typeof vtex['checkout'][_0x7cca('0x5c')])_0x76bc17=new vtex[(_0x7cca('0x24'))][(_0x7cca('0x5c'))]();else return _0x193f7f(_0x7cca('0x5d'));_0x477b94[_0x7cca('0xc7')]=_0x7cca('0xc8');var _0x2a255d=function(_0x12cc9c){_0x5731b9(this)[_0x7cca('0x88')](_0x12cc9c);_0x12cc9c[_0x7cca('0x53')](_0x7cca('0xc9'))['add'](_0x5731b9(_0x7cca('0xca')))['on']('click.qd_ddc_closeFn',function(){_0xafeaf0[_0x7cca('0x4b')](_0x7cca('0xcb'));_0x5731b9(document[_0x7cca('0x73')])[_0x7cca('0x4b')](_0x7cca('0xcc'));});_0x5731b9(document)[_0x7cca('0xcd')]('keyup.qd_ddc_closeFn')['on'](_0x7cca('0xce'),function(_0x3701fe){0x1b==_0x3701fe[_0x7cca('0xcf')]&&(_0xafeaf0['removeClass'](_0x7cca('0xcb')),_0x5731b9(document[_0x7cca('0x73')])[_0x7cca('0x4b')](_0x7cca('0xcc')));});var _0x1195cd=_0x12cc9c['find'](_0x7cca('0xd0'));_0x12cc9c[_0x7cca('0x53')](_0x7cca('0xd1'))['on']('click.qd_ddc_scrollUp',function(){_0x477b94[_0x7cca('0xd2')]('-',void 0x0,void 0x0,_0x1195cd);return!0x1;});_0x12cc9c['find'](_0x7cca('0xd3'))['on'](_0x7cca('0xd4'),function(){_0x477b94[_0x7cca('0xd2')](void 0x0,void 0x0,void 0x0,_0x1195cd);return!0x1;});_0x12cc9c[_0x7cca('0x53')]('.qd-ddc-shipping\x20input')[_0x7cca('0xd5')]('')['on'](_0x7cca('0xd6'),function(){_0x477b94['shippingCalculate'](_0x5731b9(this));});if(_0x17ffb4[_0x7cca('0xd7')]){var _0xa93621=0x0;_0x5731b9(this)['on']('mouseenter.qd_ddc_hover',function(){var _0x12cc9c=function(){window[_0x7cca('0x5a')][_0x7cca('0x96')]&&(_0x477b94[_0x7cca('0x94')](),window[_0x7cca('0x5a')][_0x7cca('0x96')]=!0x1,_0x5731b9['fn'][_0x7cca('0x29')](!0x0),_0x477b94[_0x7cca('0xd8')]());};_0xa93621=setInterval(function(){_0x12cc9c();},0x258);_0x12cc9c();});_0x5731b9(this)['on']('mouseleave.qd_ddc_hover',function(){clearInterval(_0xa93621);});}};var _0x5436a0=function(_0x5f2419){_0x5f2419=_0x5731b9(_0x5f2419);_0x17ffb4[_0x7cca('0xd9')][_0x7cca('0x54')]=_0x17ffb4[_0x7cca('0xd9')]['cartTotal'][_0x7cca('0x9')](_0x7cca('0xda'),_0x7cca('0xdb'));_0x17ffb4['texts'][_0x7cca('0x54')]=_0x17ffb4[_0x7cca('0xd9')][_0x7cca('0x54')][_0x7cca('0x9')]('#items',_0x7cca('0xdc'));_0x17ffb4[_0x7cca('0xd9')][_0x7cca('0x54')]=_0x17ffb4[_0x7cca('0xd9')][_0x7cca('0x54')][_0x7cca('0x9')](_0x7cca('0xdd'),_0x7cca('0xde'));_0x17ffb4[_0x7cca('0xd9')][_0x7cca('0x54')]=_0x17ffb4[_0x7cca('0xd9')][_0x7cca('0x54')][_0x7cca('0x9')](_0x7cca('0xdf'),'<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0x5f2419[_0x7cca('0x53')](_0x7cca('0xe0'))[_0x7cca('0x4f')](_0x17ffb4[_0x7cca('0xd9')][_0x7cca('0xe1')]);_0x5f2419[_0x7cca('0x53')](_0x7cca('0xe2'))[_0x7cca('0x4f')](_0x17ffb4[_0x7cca('0xd9')]['continueShopping']);_0x5f2419[_0x7cca('0x53')](_0x7cca('0xe3'))[_0x7cca('0x4f')](_0x17ffb4[_0x7cca('0xd9')][_0x7cca('0xe4')]);_0x5f2419[_0x7cca('0x53')]('.qd-ddc-infoTotal')[_0x7cca('0x4f')](_0x17ffb4['texts']['cartTotal']);_0x5f2419[_0x7cca('0x53')]('.qd-ddc-shipping')['html'](_0x17ffb4[_0x7cca('0xd9')][_0x7cca('0xe5')]);_0x5f2419[_0x7cca('0x53')](_0x7cca('0xe6'))[_0x7cca('0x4f')](_0x17ffb4[_0x7cca('0xd9')][_0x7cca('0x57')]);return _0x5f2419;}(this[_0x7cca('0xc7')]);var _0x384512=0x0;_0xafeaf0['each'](function(){0x0<_0x384512?_0x2a255d[_0x7cca('0x26')](this,_0x5436a0[_0x7cca('0xe7')]()):_0x2a255d[_0x7cca('0x26')](this,_0x5436a0);_0x384512++;});window[_0x7cca('0x38')][_0x7cca('0x41')][_0x7cca('0x2d')](function(){_0x5731b9(_0x7cca('0xe8'))[_0x7cca('0x4f')](window[_0x7cca('0x38')][_0x7cca('0x3c')]||'--');_0x5731b9(_0x7cca('0xe9'))['html'](window[_0x7cca('0x38')]['qtt']||'0');_0x5731b9(_0x7cca('0xea'))[_0x7cca('0x4f')](window['_QuatroDigital_CartData']['shipping']||'--');_0x5731b9(_0x7cca('0xeb'))[_0x7cca('0x4f')](window[_0x7cca('0x38')][_0x7cca('0x3e')]||'--');});var _0x2f5b94=function(_0x192b5b,_0x1c824f){if(_0x7cca('0x3')===typeof _0x192b5b[_0x7cca('0x40')])return _0x193f7f(_0x7cca('0xec'));_0x477b94[_0x7cca('0xed')]['call'](this,_0x1c824f);};_0x477b94[_0x7cca('0x94')]=function(_0xe07b36,_0x28d1e9){'undefined'!=typeof _0x28d1e9?window['_QuatroDigital_DropDown'][_0x7cca('0xee')]=_0x28d1e9:window[_0x7cca('0x5a')]['dataOptionsCache']&&(_0x28d1e9=window['_QuatroDigital_DropDown']['dataOptionsCache']);setTimeout(function(){window[_0x7cca('0x5a')]['dataOptionsCache']=void 0x0;},_0x17ffb4[_0x7cca('0xef')]);_0x5731b9(_0x7cca('0xf0'))[_0x7cca('0x4b')](_0x7cca('0xf1'));if(_0x17ffb4['smartCheckout']){var _0xa93621=function(_0x247af5){window[_0x7cca('0x5a')][_0x7cca('0x25')]=_0x247af5;_0x2f5b94(_0x247af5,_0x28d1e9);_0x7cca('0x3')!==typeof window['_QuatroDigital_AmountProduct']&&_0x7cca('0xb')===typeof window['_QuatroDigital_AmountProduct']['exec']&&window[_0x7cca('0xf2')][_0x7cca('0xf3')][_0x7cca('0x26')](this);_0x5731b9(_0x7cca('0xf0'))['addClass'](_0x7cca('0xf1'));};_0x7cca('0x3')!==typeof window[_0x7cca('0x5a')][_0x7cca('0x25')]?(_0xa93621(window['_QuatroDigital_DropDown'][_0x7cca('0x25')]),_0x7cca('0xb')===typeof _0xe07b36&&_0xe07b36(window[_0x7cca('0x5a')][_0x7cca('0x25')])):_0x5731b9[_0x7cca('0x5e')]([_0x7cca('0x40'),_0x7cca('0x39'),_0x7cca('0x5f')],{'done':function(_0x50a369){_0xa93621[_0x7cca('0x26')](this,_0x50a369);_0x7cca('0xb')===typeof _0xe07b36&&_0xe07b36(_0x50a369);},'fail':function(_0x4590f4){_0x193f7f(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0x4590f4]);}});}else alert('Este\x20método\x20esta\x20descontinuado!');};_0x477b94[_0x7cca('0xd8')]=function(){var _0x22bc21=_0x5731b9(_0x7cca('0xf0'));_0x22bc21[_0x7cca('0x53')](_0x7cca('0xf4'))[_0x7cca('0x8')]?_0x22bc21['removeClass'](_0x7cca('0xf5')):_0x22bc21[_0x7cca('0x49')](_0x7cca('0xf5'));};_0x477b94[_0x7cca('0xed')]=function(_0x3906b2){var _0xa93621=_0x5731b9(_0x7cca('0xf6'));_0xa93621['empty']();_0xa93621[_0x7cca('0x36')](function(){var _0xa93621=_0x5731b9(this),_0x3005e8,_0x1d83d4,_0x44c065=_0x5731b9(''),_0x2453fe;for(_0x2453fe in window['_QuatroDigital_DropDown'][_0x7cca('0x25')][_0x7cca('0x40')])if(_0x7cca('0x15')===typeof window[_0x7cca('0x5a')]['getOrderForm'][_0x7cca('0x40')][_0x2453fe]){var _0x4ecb47=window['_QuatroDigital_DropDown'][_0x7cca('0x25')][_0x7cca('0x40')][_0x2453fe];var _0x565e6b=_0x4ecb47[_0x7cca('0xf7')][_0x7cca('0x9')](/^\/|\/$/g,'')[_0x7cca('0x7')]('/');var _0x1b99fd=_0x5731b9(_0x7cca('0xf8'));_0x1b99fd[_0x7cca('0x34')]({'data-sku':_0x4ecb47['id'],'data-sku-index':_0x2453fe,'data-qd-departament':_0x565e6b[0x0],'data-qd-category':_0x565e6b[_0x565e6b[_0x7cca('0x8')]-0x1]});_0x1b99fd[_0x7cca('0x49')]('qd-ddc-'+_0x4ecb47['availability']);_0x1b99fd[_0x7cca('0x53')](_0x7cca('0xf9'))[_0x7cca('0x88')](_0x17ffb4[_0x7cca('0xc2')](_0x4ecb47));_0x1b99fd[_0x7cca('0x53')](_0x7cca('0xfa'))[_0x7cca('0x88')](isNaN(_0x4ecb47[_0x7cca('0xfb')])?_0x4ecb47[_0x7cca('0xfb')]:0x0==_0x4ecb47[_0x7cca('0xfb')]?_0x7cca('0xfc'):(_0x5731b9(_0x7cca('0x33'))[_0x7cca('0x34')](_0x7cca('0x35'))||'R$')+'\x20'+qd_number_format(_0x4ecb47[_0x7cca('0xfb')]/0x64,0x2,',','.'));_0x1b99fd[_0x7cca('0x53')]('.qd-ddc-quantity')['attr']({'data-sku':_0x4ecb47['id'],'data-sku-index':_0x2453fe})[_0x7cca('0xd5')](_0x4ecb47[_0x7cca('0xfd')]);_0x1b99fd[_0x7cca('0x53')](_0x7cca('0xfe'))['attr']({'data-sku':_0x4ecb47['id'],'data-sku-index':_0x2453fe});_0x477b94[_0x7cca('0xff')](_0x4ecb47['id'],_0x1b99fd[_0x7cca('0x53')](_0x7cca('0x100')),_0x4ecb47[_0x7cca('0x101')]);_0x1b99fd[_0x7cca('0x53')](_0x7cca('0x102'))['attr']({'data-sku':_0x4ecb47['id'],'data-sku-index':_0x2453fe});_0x1b99fd[_0x7cca('0x103')](_0xa93621);_0x44c065=_0x44c065[_0x7cca('0x2d')](_0x1b99fd);}try{var _0x1ff8dc=_0xa93621[_0x7cca('0x0')]('.qd-ddc-wrapper')[_0x7cca('0x53')]('.qd-ddc-shipping\x20input');_0x1ff8dc[_0x7cca('0x8')]&&''==_0x1ff8dc[_0x7cca('0xd5')]()&&window['_QuatroDigital_DropDown'][_0x7cca('0x25')][_0x7cca('0x5f')][_0x7cca('0x104')]&&_0x1ff8dc[_0x7cca('0xd5')](window[_0x7cca('0x5a')]['getOrderForm']['shippingData']['address'][_0x7cca('0x105')]);}catch(_0x245a34){_0x193f7f(_0x7cca('0x106')+_0x245a34[_0x7cca('0x21')],_0x7cca('0x6f'));}_0x477b94[_0x7cca('0x107')](_0xa93621);_0x477b94[_0x7cca('0xd8')]();_0x3906b2&&_0x3906b2[_0x7cca('0x108')]&&function(){_0x1d83d4=_0x44c065[_0x7cca('0x47')](_0x7cca('0x109')+_0x3906b2['lastSku']+'\x27]');_0x1d83d4[_0x7cca('0x8')]&&(_0x3005e8=0x0,_0x44c065['each'](function(){var _0x3906b2=_0x5731b9(this);if(_0x3906b2['is'](_0x1d83d4))return!0x1;_0x3005e8+=_0x3906b2[_0x7cca('0x10a')]();}),_0x477b94[_0x7cca('0xd2')](void 0x0,void 0x0,_0x3005e8,_0xa93621[_0x7cca('0x2d')](_0xa93621['parent']())),_0x44c065[_0x7cca('0x4b')]('qd-ddc-lastAddedFixed'),function(_0x4ff307){_0x4ff307[_0x7cca('0x49')](_0x7cca('0x10b'));_0x4ff307[_0x7cca('0x49')](_0x7cca('0x10c'));setTimeout(function(){_0x4ff307[_0x7cca('0x4b')](_0x7cca('0x10b'));},_0x17ffb4[_0x7cca('0xef')]);}(_0x1d83d4));}();});(function(){_QuatroDigital_DropDown[_0x7cca('0x25')]['items'][_0x7cca('0x8')]?(_0x5731b9(_0x7cca('0x73'))[_0x7cca('0x4b')]('qd-ddc-cart-empty')[_0x7cca('0x49')](_0x7cca('0x10d')),setTimeout(function(){_0x5731b9('body')[_0x7cca('0x4b')](_0x7cca('0x10e'));},_0x17ffb4[_0x7cca('0xef')])):_0x5731b9(_0x7cca('0x73'))['removeClass'](_0x7cca('0x10f'))[_0x7cca('0x49')](_0x7cca('0x110'));}());_0x7cca('0xb')===typeof _0x17ffb4[_0x7cca('0x111')]?_0x17ffb4[_0x7cca('0x111')][_0x7cca('0x26')](this):_0x193f7f(_0x7cca('0x112'));};_0x477b94[_0x7cca('0xff')]=function(_0xc1f13e,_0x508b1c,_0x397eb7){function _0x213fa4(){_0x508b1c[_0x7cca('0x4b')](_0x7cca('0x113'))[_0x7cca('0x9b')](function(){_0x5731b9(this)[_0x7cca('0x49')]('qd-loaded');})[_0x7cca('0x34')](_0x7cca('0x114'),_0x397eb7);}_0x397eb7?_0x213fa4():isNaN(_0xc1f13e)?_0x193f7f(_0x7cca('0x115'),_0x7cca('0x2a')):alert(_0x7cca('0x116'));};_0x477b94[_0x7cca('0x107')]=function(_0x131bb5){var _0x21a9ba=function(_0x57bdb8,_0x48bffa){var _0xa93621=_0x5731b9(_0x57bdb8);var _0x3bf15b=_0xa93621[_0x7cca('0x34')]('data-sku');var _0x3005e8=_0xa93621[_0x7cca('0x34')](_0x7cca('0x117'));if(_0x3bf15b){var _0x144fdd=parseInt(_0xa93621[_0x7cca('0xd5')]())||0x1;_0x477b94[_0x7cca('0x118')]([_0x3bf15b,_0x3005e8],_0x144fdd,_0x144fdd+0x1,function(_0x4731de){_0xa93621['val'](_0x4731de);_0x7cca('0xb')===typeof _0x48bffa&&_0x48bffa();});}};var _0xa93621=function(_0x5d09d6,_0x5a0770){var _0xa93621=_0x5731b9(_0x5d09d6);var _0x595203=_0xa93621[_0x7cca('0x34')](_0x7cca('0x119'));var _0x3005e8=_0xa93621[_0x7cca('0x34')]('data-sku-index');if(_0x595203){var _0x30e225=parseInt(_0xa93621['val']())||0x2;_0x477b94['changeQantity']([_0x595203,_0x3005e8],_0x30e225,_0x30e225-0x1,function(_0x350999){_0xa93621[_0x7cca('0xd5')](_0x350999);_0x7cca('0xb')===typeof _0x5a0770&&_0x5a0770();});}};var _0x2308de=function(_0xc43c8,_0x2d536d){var _0xa93621=_0x5731b9(_0xc43c8);var _0x51982b=_0xa93621['attr']('data-sku');var _0x3005e8=_0xa93621[_0x7cca('0x34')]('data-sku-index');if(_0x51982b){var _0x44ef83=parseInt(_0xa93621[_0x7cca('0xd5')]())||0x1;_0x477b94[_0x7cca('0x118')]([_0x51982b,_0x3005e8],0x1,_0x44ef83,function(_0x56f388){_0xa93621[_0x7cca('0xd5')](_0x56f388);_0x7cca('0xb')===typeof _0x2d536d&&_0x2d536d();});}};var _0x3005e8=_0x131bb5[_0x7cca('0x53')](_0x7cca('0x11a'));_0x3005e8[_0x7cca('0x49')](_0x7cca('0x11b'))[_0x7cca('0x36')](function(){var _0x131bb5=_0x5731b9(this);_0x131bb5['find'](_0x7cca('0x11c'))['on'](_0x7cca('0x11d'),function(_0x7e78ac){_0x7e78ac[_0x7cca('0x7f')]();_0x3005e8['addClass'](_0x7cca('0x11e'));_0x21a9ba(_0x131bb5['find']('.qd-ddc-quantity'),function(){_0x3005e8[_0x7cca('0x4b')](_0x7cca('0x11e'));});});_0x131bb5[_0x7cca('0x53')]('.qd-ddc-quantityMinus')['on'](_0x7cca('0x11f'),function(_0x5e1742){_0x5e1742[_0x7cca('0x7f')]();_0x3005e8[_0x7cca('0x49')]('qd-loading');_0xa93621(_0x131bb5[_0x7cca('0x53')]('.qd-ddc-quantity'),function(){_0x3005e8[_0x7cca('0x4b')](_0x7cca('0x11e'));});});_0x131bb5[_0x7cca('0x53')]('.qd-ddc-quantity')['on'](_0x7cca('0x120'),function(){_0x3005e8[_0x7cca('0x49')]('qd-loading');_0x2308de(this,function(){_0x3005e8[_0x7cca('0x4b')](_0x7cca('0x11e'));});});_0x131bb5['find'](_0x7cca('0x121'))['on'](_0x7cca('0x122'),function(_0x50f73b){0xd==_0x50f73b[_0x7cca('0xcf')]&&(_0x3005e8[_0x7cca('0x49')](_0x7cca('0x11e')),_0x2308de(this,function(){_0x3005e8['removeClass'](_0x7cca('0x11e'));}));});});_0x131bb5[_0x7cca('0x53')](_0x7cca('0xf4'))[_0x7cca('0x36')](function(){var _0x131bb5=_0x5731b9(this);_0x131bb5[_0x7cca('0x53')](_0x7cca('0xfe'))['on'](_0x7cca('0x123'),function(){_0x131bb5['addClass'](_0x7cca('0x11e'));_0x477b94[_0x7cca('0x124')](_0x5731b9(this),function(_0x3f32e9){_0x3f32e9?_0x131bb5[_0x7cca('0x125')](!0x0)['slideUp'](function(){_0x131bb5[_0x7cca('0x126')]();_0x477b94[_0x7cca('0xd8')]();}):_0x131bb5[_0x7cca('0x4b')](_0x7cca('0x11e'));});return!0x1;});});};_0x477b94[_0x7cca('0x127')]=function(_0x3f6dd4){var _0x1e0d3b=_0x3f6dd4['val'](),_0x1e0d3b=_0x1e0d3b[_0x7cca('0x9')](/[^0-9\-]/g,''),_0x1e0d3b=_0x1e0d3b['replace'](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3'),_0x1e0d3b=_0x1e0d3b[_0x7cca('0x9')](/(.{9}).*/g,'$1');_0x3f6dd4[_0x7cca('0xd5')](_0x1e0d3b);0x9<=_0x1e0d3b[_0x7cca('0x8')]&&(_0x3f6dd4[_0x7cca('0x16')](_0x7cca('0x128'))!=_0x1e0d3b&&_0x76bc17[_0x7cca('0x129')]({'postalCode':_0x1e0d3b,'country':'BRA'})[_0x7cca('0x1b')](function(_0x5b5888){window[_0x7cca('0x5a')][_0x7cca('0x25')]=_0x5b5888;_0x477b94[_0x7cca('0x94')]();})[_0x7cca('0x1d')](function(_0x336fd3){_0x193f7f([_0x7cca('0x12a'),_0x336fd3]);updateCartData();}),_0x3f6dd4['data'](_0x7cca('0x128'),_0x1e0d3b));};_0x477b94[_0x7cca('0x118')]=function(_0x18860d,_0xcac915,_0xeefa7,_0x52d54f){function _0xfab9f1(_0x4c2b46){_0x4c2b46=_0x7cca('0x12b')!==typeof _0x4c2b46?!0x1:_0x4c2b46;_0x477b94[_0x7cca('0x94')]();window['_QuatroDigital_DropDown'][_0x7cca('0x96')]=!0x1;_0x477b94[_0x7cca('0xd8')]();_0x7cca('0x3')!==typeof window['_QuatroDigital_AmountProduct']&&_0x7cca('0xb')===typeof window[_0x7cca('0xf2')][_0x7cca('0xf3')]&&window[_0x7cca('0xf2')][_0x7cca('0xf3')][_0x7cca('0x26')](this);'function'===typeof adminCart&&adminCart();_0x5731b9['fn'][_0x7cca('0x29')](!0x0,void 0x0,_0x4c2b46);_0x7cca('0xb')===typeof _0x52d54f&&_0x52d54f(_0xcac915);}_0xeefa7=_0xeefa7||0x1;if(0x1>_0xeefa7)return _0xcac915;if(_0x17ffb4[_0x7cca('0x59')]){if(_0x7cca('0x3')===typeof window[_0x7cca('0x5a')]['getOrderForm'][_0x7cca('0x40')][_0x18860d[0x1]])return _0x193f7f(_0x7cca('0x12c')+_0x18860d[0x1]+']'),_0xcac915;window[_0x7cca('0x5a')]['getOrderForm'][_0x7cca('0x40')][_0x18860d[0x1]][_0x7cca('0xfd')]=_0xeefa7;window[_0x7cca('0x5a')][_0x7cca('0x25')][_0x7cca('0x40')][_0x18860d[0x1]]['index']=_0x18860d[0x1];_0x76bc17[_0x7cca('0x12d')]([window[_0x7cca('0x5a')][_0x7cca('0x25')][_0x7cca('0x40')][_0x18860d[0x1]]],[_0x7cca('0x40'),_0x7cca('0x39'),'shippingData'])['done'](function(_0x5c4e63){window[_0x7cca('0x5a')]['getOrderForm']=_0x5c4e63;_0xfab9f1(!0x0);})[_0x7cca('0x1d')](function(_0x418c8c){_0x193f7f([_0x7cca('0x12e'),_0x418c8c]);_0xfab9f1();});}else _0x193f7f(_0x7cca('0x12f'));};_0x477b94[_0x7cca('0x124')]=function(_0x3237f7,_0x2f13bb){function _0x1c84c0(_0x27cf11){_0x27cf11='boolean'!==typeof _0x27cf11?!0x1:_0x27cf11;_0x7cca('0x3')!==typeof window[_0x7cca('0xf2')]&&_0x7cca('0xb')===typeof window[_0x7cca('0xf2')][_0x7cca('0xf3')]&&window[_0x7cca('0xf2')][_0x7cca('0xf3')][_0x7cca('0x26')](this);_0x7cca('0xb')===typeof adminCart&&adminCart();_0x5731b9['fn']['simpleCart'](!0x0,void 0x0,_0x27cf11);_0x7cca('0xb')===typeof _0x2f13bb&&_0x2f13bb(_0x3005e8);}var _0x3005e8=!0x1,_0x31a27b=_0x5731b9(_0x3237f7)[_0x7cca('0x34')](_0x7cca('0x117'));if(_0x17ffb4['smartCheckout']){if(_0x7cca('0x3')===typeof window[_0x7cca('0x5a')][_0x7cca('0x25')][_0x7cca('0x40')][_0x31a27b])return _0x193f7f('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x31a27b+']'),_0x3005e8;window['_QuatroDigital_DropDown'][_0x7cca('0x25')]['items'][_0x31a27b][_0x7cca('0x130')]=_0x31a27b;_0x76bc17[_0x7cca('0x131')]([window[_0x7cca('0x5a')]['getOrderForm'][_0x7cca('0x40')][_0x31a27b]],[_0x7cca('0x40'),_0x7cca('0x39'),'shippingData'])[_0x7cca('0x1b')](function(_0x24286f){_0x3005e8=!0x0;window['_QuatroDigital_DropDown'][_0x7cca('0x25')]=_0x24286f;_0x2f5b94(_0x24286f);_0x1c84c0(!0x0);})[_0x7cca('0x1d')](function(_0x4cede4){_0x193f7f(['Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho',_0x4cede4]);_0x1c84c0();});}else alert(_0x7cca('0x132'));};_0x477b94['scrollCart']=function(_0xf0a607,_0x293a83,_0x436540,_0x412dbe){_0x412dbe=_0x412dbe||_0x5731b9(_0x7cca('0x133'));_0xf0a607=_0xf0a607||'+';_0x293a83=_0x293a83||0.9*_0x412dbe[_0x7cca('0x134')]();_0x412dbe['stop'](!0x0,!0x0)['animate']({'scrollTop':isNaN(_0x436540)?_0xf0a607+'='+_0x293a83+'px':_0x436540});};_0x17ffb4['updateOnlyHover']||(_0x477b94['getCartInfoByUrl'](),_0x5731b9['fn'][_0x7cca('0x29')](!0x0));_0x5731b9(window)['on'](_0x7cca('0x135'),function(){try{window[_0x7cca('0x5a')][_0x7cca('0x25')]=void 0x0,_0x477b94['getCartInfoByUrl']();}catch(_0x24f5d9){_0x193f7f(_0x7cca('0x136')+_0x24f5d9[_0x7cca('0x21')],_0x7cca('0x137'));}});'function'===typeof _0x17ffb4[_0x7cca('0x41')]?_0x17ffb4[_0x7cca('0x41')][_0x7cca('0x26')](this):_0x193f7f(_0x7cca('0x138'));};_0x5731b9['fn'][_0x7cca('0xb7')]=function(_0x2262c1){var _0x1da05e=_0x5731b9(this);_0x1da05e['fn']=new _0x5731b9[(_0x7cca('0xb7'))](this,_0x2262c1);return _0x1da05e;};}catch(_0xc57b34){_0x7cca('0x3')!==typeof console&&'function'===typeof console[_0x7cca('0x14')]&&console[_0x7cca('0x14')](_0x7cca('0x68'),_0xc57b34);}}(this));(function(_0xb3b15){try{var _0x54ed52=jQuery;window[_0x7cca('0xf2')]=window[_0x7cca('0xf2')]||{};window['_QuatroDigital_AmountProduct'][_0x7cca('0x40')]={};window[_0x7cca('0xf2')][_0x7cca('0x139')]=!0x1;window[_0x7cca('0xf2')][_0x7cca('0x13a')]=!0x1;window[_0x7cca('0xf2')][_0x7cca('0x13b')]=!0x1;var _0x30b853=function(){if(window['_QuatroDigital_AmountProduct'][_0x7cca('0x139')]){var _0x6d37bd=!0x1;var _0xb3b15={};window[_0x7cca('0xf2')][_0x7cca('0x40')]={};for(_0x3a84ec in window[_0x7cca('0x5a')][_0x7cca('0x25')][_0x7cca('0x40')])if(_0x7cca('0x15')===typeof window[_0x7cca('0x5a')][_0x7cca('0x25')][_0x7cca('0x40')][_0x3a84ec]){var _0x4998f9=window['_QuatroDigital_DropDown']['getOrderForm'][_0x7cca('0x40')][_0x3a84ec];_0x7cca('0x3')!==typeof _0x4998f9[_0x7cca('0x13c')]&&null!==_0x4998f9['productId']&&''!==_0x4998f9[_0x7cca('0x13c')]&&(window[_0x7cca('0xf2')][_0x7cca('0x40')][_0x7cca('0x13d')+_0x4998f9[_0x7cca('0x13c')]]=window[_0x7cca('0xf2')][_0x7cca('0x40')]['prod_'+_0x4998f9['productId']]||{},window[_0x7cca('0xf2')][_0x7cca('0x40')][_0x7cca('0x13d')+_0x4998f9[_0x7cca('0x13c')]][_0x7cca('0x13e')]=_0x4998f9[_0x7cca('0x13c')],_0xb3b15[_0x7cca('0x13d')+_0x4998f9['productId']]||(window[_0x7cca('0xf2')][_0x7cca('0x40')][_0x7cca('0x13d')+_0x4998f9[_0x7cca('0x13c')]][_0x7cca('0x3f')]=0x0),window[_0x7cca('0xf2')][_0x7cca('0x40')][_0x7cca('0x13d')+_0x4998f9[_0x7cca('0x13c')]]['qtt']+=_0x4998f9['quantity'],_0x6d37bd=!0x0,_0xb3b15[_0x7cca('0x13d')+_0x4998f9['productId']]=!0x0);}var _0x3a84ec=_0x6d37bd;}else _0x3a84ec=void 0x0;window[_0x7cca('0xf2')][_0x7cca('0x139')]&&(_0x54ed52(_0x7cca('0x13f'))[_0x7cca('0x126')](),_0x54ed52(_0x7cca('0x140'))[_0x7cca('0x4b')](_0x7cca('0x141')));for(var _0x3495bc in window[_0x7cca('0xf2')][_0x7cca('0x40')]){_0x4998f9=window[_0x7cca('0xf2')][_0x7cca('0x40')][_0x3495bc];if(_0x7cca('0x15')!==typeof _0x4998f9)return;_0xb3b15=_0x54ed52(_0x7cca('0x142')+_0x4998f9[_0x7cca('0x13e')]+']')['getParent']('li');if(window[_0x7cca('0xf2')]['allowRecalculate']||!_0xb3b15[_0x7cca('0x53')](_0x7cca('0x13f'))['length'])_0x6d37bd=_0x54ed52('<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>'),_0x6d37bd['find'](_0x7cca('0x143'))[_0x7cca('0x4f')](_0x4998f9['qtt']),_0x4998f9=_0xb3b15[_0x7cca('0x53')](_0x7cca('0x144')),_0x4998f9[_0x7cca('0x8')]?_0x4998f9['prepend'](_0x6d37bd)[_0x7cca('0x49')]('qd-bap-item-added'):_0xb3b15[_0x7cca('0xae')](_0x6d37bd);}_0x3a84ec&&(window['_QuatroDigital_AmountProduct'][_0x7cca('0x139')]=!0x1);};window[_0x7cca('0xf2')][_0x7cca('0xf3')]=function(){window[_0x7cca('0xf2')][_0x7cca('0x139')]=!0x0;_0x30b853['call'](this);};_0x54ed52(document)[_0x7cca('0x145')](function(){_0x30b853[_0x7cca('0x26')](this);});}catch(_0x7491d3){'undefined'!==typeof console&&_0x7cca('0xb')===typeof console[_0x7cca('0x14')]&&console[_0x7cca('0x14')](_0x7cca('0x68'),_0x7491d3);}}(this));(function(){try{var _0xd28371=jQuery,_0x4df489,_0x27ac28={'selector':_0x7cca('0x146'),'dropDown':{},'buyButton':{}};_0xd28371[_0x7cca('0x147')]=function(_0x562636){var _0x47693f={};_0x4df489=_0xd28371[_0x7cca('0x52')](!0x0,{},_0x27ac28,_0x562636);_0x562636=_0xd28371(_0x4df489[_0x7cca('0x8d')])[_0x7cca('0xb7')](_0x4df489[_0x7cca('0x148')]);_0x47693f[_0x7cca('0x81')]=_0x7cca('0x3')!==typeof _0x4df489[_0x7cca('0x148')][_0x7cca('0xd7')]&&!0x1===_0x4df489[_0x7cca('0x148')][_0x7cca('0xd7')]?_0xd28371(_0x4df489['selector'])[_0x7cca('0x7a')](_0x562636['fn'],_0x4df489[_0x7cca('0x81')]):_0xd28371(_0x4df489[_0x7cca('0x8d')])['QD_buyButton'](_0x4df489[_0x7cca('0x81')]);_0x47693f['dropDown']=_0x562636;return _0x47693f;};_0xd28371['fn']['smartCart']=function(){'object'===typeof console&&_0x7cca('0xb')===typeof console[_0x7cca('0x2c')]&&console['info'](_0x7cca('0x149'));};_0xd28371[_0x7cca('0x14a')]=_0xd28371['fn'][_0x7cca('0x14a')];}catch(_0x29ad61){_0x7cca('0x3')!==typeof console&&_0x7cca('0xb')===typeof console[_0x7cca('0x14')]&&console['error']('Oooops!\x20',_0x29ad61);}}());