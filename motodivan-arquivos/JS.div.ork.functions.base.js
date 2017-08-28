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
var _0x37f8=['toLowerCase','join','apply','qdAmAddNdx','each','qd-am-li-','first','addClass','qd-am-first','last','qd-am-last','QD_amazingMenu','bgbqvina%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-banner-wrapper','url','html','find','data-qdam-value','.box-banner','hide','qd-am-content-loaded','text','trim','attr','[class*=\x27colunas\x27]','\x27\x20falho.','ajaxCallback','trigger','QuatroDigital.am.ajaxCallback','li\x20>ul','qd-am-has-ul','children',':not(ul)','qd-am-elem-','replaceSpecialChars','>li','qd-amazing-menu','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','qd-am-','-li','QuatroDigital.am.callback','extend','exec','.qd_amazing_menu_auto','getParent','closest','function','object','undefined','error','info','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','aviso'];(function(_0x321bb2,_0x202794){var _0x9c12ed=function(_0x263dd3){while(--_0x263dd3){_0x321bb2['push'](_0x321bb2['shift']());}};_0x9c12ed(++_0x202794);}(_0x37f8,0xd2));var _0x837f=function(_0x3db0dc,_0x2fb362){_0x3db0dc=_0x3db0dc-0x0;var _0xcdbf0c=_0x37f8[_0x3db0dc];return _0xcdbf0c;};(function(_0x44c97d){_0x44c97d['fn'][_0x837f('0x0')]=_0x44c97d['fn'][_0x837f('0x1')];}(jQuery));(function(_0x2c1482){var _0x2b4e2c;var _0x4b8b19=jQuery;if(_0x837f('0x2')!==typeof _0x4b8b19['fn']['QD_amazingMenu']){var _0x5f2d01={'url':'/qd-amazing-menu','callback':function(){},'ajaxCallback':function(){}};var _0x4dd037=function(_0x4e3d08,_0x19c939){if(_0x837f('0x3')===typeof console&&_0x837f('0x4')!==typeof console[_0x837f('0x5')]&&_0x837f('0x4')!==typeof console[_0x837f('0x6')]&&_0x837f('0x4')!==typeof console[_0x837f('0x7')]){var _0x42fb6e;_0x837f('0x3')===typeof _0x4e3d08?(_0x4e3d08[_0x837f('0x8')](_0x837f('0x9')),_0x42fb6e=_0x4e3d08):_0x42fb6e=[_0x837f('0x9')+_0x4e3d08];if(_0x837f('0x4')===typeof _0x19c939||_0x837f('0xa')!==_0x19c939['toLowerCase']()&&_0x837f('0xb')!==_0x19c939[_0x837f('0xc')]())if(_0x837f('0x4')!==typeof _0x19c939&&_0x837f('0x6')===_0x19c939[_0x837f('0xc')]())try{console['info']['apply'](console,_0x42fb6e);}catch(_0x14ff6d){try{console[_0x837f('0x6')](_0x42fb6e[_0x837f('0xd')]('\x0a'));}catch(_0x3e38ea){}}else try{console[_0x837f('0x5')]['apply'](console,_0x42fb6e);}catch(_0x18d8aa){try{console[_0x837f('0x5')](_0x42fb6e[_0x837f('0xd')]('\x0a'));}catch(_0x1664e7){}}else try{console[_0x837f('0x7')][_0x837f('0xe')](console,_0x42fb6e);}catch(_0x546352){try{console[_0x837f('0x7')](_0x42fb6e[_0x837f('0xd')]('\x0a'));}catch(_0x47bbe7){}}}};_0x4b8b19['fn'][_0x837f('0xf')]=function(){var _0x2745f6=_0x4b8b19(this);_0x2745f6[_0x837f('0x10')](function(_0x1d17b3){_0x4b8b19(this)['addClass'](_0x837f('0x11')+_0x1d17b3);});_0x2745f6[_0x837f('0x12')]()[_0x837f('0x13')](_0x837f('0x14'));_0x2745f6[_0x837f('0x15')]()['addClass'](_0x837f('0x16'));return _0x2745f6;};_0x4b8b19['fn'][_0x837f('0x17')]=function(){};_0x2c1482=function(_0x216897){var _0x33c7cb={'z':_0x837f('0x18')};return function(_0x55dc1e){var _0x2e9603=function(_0x37d7e0){return _0x37d7e0;};var _0x287c6e=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x55dc1e=_0x55dc1e['d'+_0x287c6e[0x10]+'c'+_0x287c6e[0x11]+'m'+_0x2e9603(_0x287c6e[0x1])+'n'+_0x287c6e[0xd]]['l'+_0x287c6e[0x12]+'c'+_0x287c6e[0x0]+'ti'+_0x2e9603('o')+'n'];var _0xe68eb1=function(_0xa0af78){return escape(encodeURIComponent(_0xa0af78[_0x837f('0x19')](/\./g,'¨')[_0x837f('0x19')](/[a-zA-Z]/g,function(_0x3531ed){return String[_0x837f('0x1a')](('Z'>=_0x3531ed?0x5a:0x7a)>=(_0x3531ed=_0x3531ed[_0x837f('0x1b')](0x0)+0xd)?_0x3531ed:_0x3531ed-0x1a);})));};var _0x3fa18e=_0xe68eb1(_0x55dc1e[[_0x287c6e[0x9],_0x2e9603('o'),_0x287c6e[0xc],_0x287c6e[_0x2e9603(0xd)]][_0x837f('0xd')]('')]);_0xe68eb1=_0xe68eb1((window[['js',_0x2e9603('no'),'m',_0x287c6e[0x1],_0x287c6e[0x4][_0x837f('0x1c')](),_0x837f('0x1d')][_0x837f('0xd')]('')]||_0x837f('0x1e'))+['.v',_0x287c6e[0xd],'e',_0x2e9603('x'),'co',_0x2e9603('mm'),_0x837f('0x1f'),_0x287c6e[0x1],'.c',_0x2e9603('o'),'m.',_0x287c6e[0x13],'r'][_0x837f('0xd')](''));for(var _0x1a6f26 in _0x33c7cb){if(_0xe68eb1===_0x1a6f26+_0x33c7cb[_0x1a6f26]||_0x3fa18e===_0x1a6f26+_0x33c7cb[_0x1a6f26]){var _0x3af34f='tr'+_0x287c6e[0x11]+'e';break;}_0x3af34f='f'+_0x287c6e[0x0]+'ls'+_0x2e9603(_0x287c6e[0x1])+'';}_0x2e9603=!0x1;-0x1<_0x55dc1e[[_0x287c6e[0xc],'e',_0x287c6e[0x0],'rc',_0x287c6e[0x9]][_0x837f('0xd')]('')][_0x837f('0x20')](_0x837f('0x21'))&&(_0x2e9603=!0x0);return[_0x3af34f,_0x2e9603];}(_0x216897);}(window);if(!eval(_0x2c1482[0x0]))return _0x2c1482[0x1]?_0x4dd037('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x3f467d=function(_0x2df32d){var _0x4290e6=_0x2df32d['find']('.qd_am_code');var _0x2aa4c0=_0x4290e6[_0x837f('0x22')](_0x837f('0x23'));var _0x4072a4=_0x4290e6[_0x837f('0x22')](_0x837f('0x24'));if(_0x2aa4c0[_0x837f('0x25')]||_0x4072a4['length'])_0x2aa4c0[_0x837f('0x26')]()[_0x837f('0x13')](_0x837f('0x27')),_0x4072a4[_0x837f('0x26')]()['addClass']('qd-am-collection-wrapper'),_0x4b8b19['qdAjax']({'url':_0x2b4e2c[_0x837f('0x28')],'dataType':_0x837f('0x29'),'success':function(_0x2f6ab5){var _0x422498=_0x4b8b19(_0x2f6ab5);_0x2aa4c0['each'](function(){var _0x2f6ab5=_0x4b8b19(this);var _0x4ac99c=_0x422498[_0x837f('0x2a')]('img[alt=\x27'+_0x2f6ab5['attr'](_0x837f('0x2b'))+'\x27]');_0x4ac99c[_0x837f('0x25')]&&(_0x4ac99c[_0x837f('0x10')](function(){_0x4b8b19(this)[_0x837f('0x0')](_0x837f('0x2c'))['clone']()['insertBefore'](_0x2f6ab5);}),_0x2f6ab5[_0x837f('0x2d')]());})['addClass'](_0x837f('0x2e'));_0x4072a4[_0x837f('0x10')](function(){var _0x2f6ab5={};var _0x245342=_0x4b8b19(this);_0x422498[_0x837f('0x2a')]('h2')[_0x837f('0x10')](function(){if(_0x4b8b19(this)[_0x837f('0x2f')]()[_0x837f('0x30')]()['toLowerCase']()==_0x245342[_0x837f('0x31')](_0x837f('0x2b'))[_0x837f('0x30')]()[_0x837f('0xc')]())return _0x2f6ab5=_0x4b8b19(this),!0x1;});_0x2f6ab5[_0x837f('0x25')]&&(_0x2f6ab5['each'](function(){_0x4b8b19(this)['getParent'](_0x837f('0x32'))['clone']()['insertBefore'](_0x245342);}),_0x245342[_0x837f('0x2d')]());})[_0x837f('0x13')]('qd-am-content-loaded');},'error':function(){_0x4dd037('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27'+_0x2b4e2c[_0x837f('0x28')]+_0x837f('0x33'));},'complete':function(){_0x2b4e2c[_0x837f('0x34')]['call'](this);_0x4b8b19(window)[_0x837f('0x35')](_0x837f('0x36'),_0x2df32d);},'clearQueueDelay':0xbb8});};_0x4b8b19[_0x837f('0x17')]=function(_0x214e50){var _0x2ed1de=_0x214e50['find']('ul[itemscope]')[_0x837f('0x10')](function(){var _0x211af0=_0x4b8b19(this);if(!_0x211af0[_0x837f('0x25')])return _0x4dd037(['UL\x20do\x20menu\x20não\x20encontrada',_0x214e50],'alerta');_0x211af0[_0x837f('0x2a')](_0x837f('0x37'))[_0x837f('0x26')]()['addClass'](_0x837f('0x38'));_0x211af0[_0x837f('0x2a')]('li')['each'](function(){var _0x536baa=_0x4b8b19(this);var _0x5a94f9=_0x536baa[_0x837f('0x39')](_0x837f('0x3a'));_0x5a94f9[_0x837f('0x25')]&&_0x536baa[_0x837f('0x13')](_0x837f('0x3b')+_0x5a94f9[_0x837f('0x12')]()[_0x837f('0x2f')]()[_0x837f('0x30')]()[_0x837f('0x3c')]()[_0x837f('0x19')](/\./g,'')['replace'](/\s/g,'-')[_0x837f('0xc')]());});var _0x2272e3=_0x211af0['find'](_0x837f('0x3d'))[_0x837f('0xf')]();_0x211af0[_0x837f('0x13')](_0x837f('0x3e'));_0x2272e3=_0x2272e3[_0x837f('0x2a')](_0x837f('0x3f'));_0x2272e3['each'](function(){var _0x24c03c=_0x4b8b19(this);_0x24c03c[_0x837f('0x2a')](_0x837f('0x3d'))[_0x837f('0xf')]()[_0x837f('0x13')](_0x837f('0x40'));_0x24c03c[_0x837f('0x13')](_0x837f('0x41'));_0x24c03c['parent']()[_0x837f('0x13')](_0x837f('0x42'));});_0x2272e3['addClass'](_0x837f('0x42'));var _0x400ccd=0x0,_0x2c1482=function(_0xd0ffb7){_0x400ccd+=0x1;_0xd0ffb7=_0xd0ffb7[_0x837f('0x39')]('li')[_0x837f('0x39')]('*');_0xd0ffb7[_0x837f('0x25')]&&(_0xd0ffb7[_0x837f('0x13')](_0x837f('0x43')+_0x400ccd),_0x2c1482(_0xd0ffb7));};_0x2c1482(_0x211af0);_0x211af0['add'](_0x211af0[_0x837f('0x2a')]('ul'))['each'](function(){var _0x1146ef=_0x4b8b19(this);_0x1146ef[_0x837f('0x13')](_0x837f('0x44')+_0x1146ef[_0x837f('0x39')]('li')[_0x837f('0x25')]+_0x837f('0x45'));});});_0x3f467d(_0x2ed1de);_0x2b4e2c['callback']['call'](this);_0x4b8b19(window)['trigger'](_0x837f('0x46'),_0x214e50);};_0x4b8b19['fn'][_0x837f('0x17')]=function(_0x579b7b){var _0xca4d37=_0x4b8b19(this);if(!_0xca4d37['length'])return _0xca4d37;_0x2b4e2c=_0x4b8b19[_0x837f('0x47')]({},_0x5f2d01,_0x579b7b);_0xca4d37[_0x837f('0x48')]=new _0x4b8b19[(_0x837f('0x17'))](_0x4b8b19(this));return _0xca4d37;};_0x4b8b19(function(){_0x4b8b19(_0x837f('0x49'))[_0x837f('0x17')]();});}}(this));

/* Quatro Digital Smart Cart */
var _0x56a4=['warn','info','[Simple\x20Cart]\x0a','add','QD_simpleCart','elements','.qd_cart_qtt','.qd_cart_total','.qd_items_text','attr','content','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','Shipping','value','total','currencySymbol','shipping','allTotal','qtt','items','quantity','callback','fire','hide','filter','addClass','qd-emptyCart','removeClass','$this','show','O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','cartTotalE','html','itemsTextE','each','cartQtt','find','cartTotal','itemsText','emptyElem','emptyCart','qd-sc-populated','smartCheckout','_QuatroDigital_DropDown','vtexjs','SDK','QD_checkoutQueue','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','trigger','simpleCartCallback.quatro_digital','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','.qd_cart_auto','bind','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','Oooops!\x20','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','done','Callbacks','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','apply','input.buy-in-page-quantity','javascript:','success','Produto\x20adicionado\x20ao\x20carrinho!','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','href','body','#produto,\x20.produto','QD_buyButton','qd-bb-click-active','click.qd_bb_buy_sc','allowBuyClick','clickBuySmartCheckout','preventDefault','Método\x20descontinuado!','buyButton','.qd-sbb-on','qd-sbb-on','qd-bb-active','children','.qd-bb-productAdded','append','.buy-in-page-button','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','[href=\x27','qd-bb-itemAddBuyButtonWrapper','timeRemoveNewItemClass','getCartInfoByUrl','isSmartCheckout','função\x20descontinuada','unbind','mouseenter.qd_bb_buy_sc','click','load','selectSkuMsg','?redirect=false&','execDefaultAction','redirect=true','queue','buyIfQuantityZeroed','test','match','push','productPageCallback','prodAdd','split','ku=','pop','asyncCallback','cartProductAdded.vtex','fakeRequest','always','buyButtonClickCallback','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','Callback\x20não\x20é\x20uma\x20função','.qd-bb-itemAddWrapper','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','ajaxSend','url','indexOf','/checkout/cart/add','productAddedToCart.qdSbbVtex','QuatroDigital.qd_bb_prod_add','ajaxStop','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','allowUpdate','QD_dropDownCart','bgbqvina%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','skuName','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','keyup.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','val','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','mouseleave.qd_ddc_hover','texts','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','linkCart','.qd_ddc_continueShopping','continueShopping','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','clone','.qd-ddc-infoTotalShipping','.qd-ddc-infoAllTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','.qd-ddc-wrapper','_QuatroDigital_AmountProduct','exec','qd-ddc-prodLoaded','shippingData','Este\x20método\x20esta\x20descontinuado!','cartIsEmpty','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','productCategoryIds','qd-ddc-','availability','.qd-ddc-prodName','sellingPrice','meta[name=currency]','.qd-ddc-quantity','.qd-ddc-remove','insertProdImg','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','.qd-ddc-shipping\x20input','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','aviso','actionButtons','lastSku','outerHeight','scrollCart','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','callbackProductsList','qd-loaded','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-quantityMore','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','keyCode','click.qd_ddc_remove','stop','remove','$1-$2$3','calculateShipping','BRA','Não\x20foi\x20possível\x20calcular\x20o\x20frete','qdDdcLastPostalCode','boolean','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','buyButtonClicked','allowRecalculate','productId','prod_','.qd-bap-wrapper','qd-bap-item-added','input.qd-productId[value=','prodId','.qd-bap-qtt','prepend','.qdDdcContainer','QD_smartCart','dropDown','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','replace','abs','undefined','pow','round','length','join','function','prototype','trim','capitalize','charAt','toUpperCase','toLowerCase','qdAjax','qdAjaxQueue','000','slice','error','extend','object','stringify','data','toString','jqXHR','fail','complete','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','message','version','4.0','simpleCart','checkout','getOrderForm','call','QuatroDigital_simpleCart','ajaxStopOn','alerta'];(function(_0x15f3c0,_0x165a64){var _0x1adfe0=function(_0x212cfc){while(--_0x212cfc){_0x15f3c0['push'](_0x15f3c0['shift']());}};_0x1adfe0(++_0x165a64);}(_0x56a4,0x11b));var _0x456a=function(_0x3c66e5,_0xab5ea3){_0x3c66e5=_0x3c66e5-0x0;var _0x678a=_0x56a4[_0x3c66e5];return _0x678a;};(function(_0x9e7c6e){_0x9e7c6e['fn'][_0x456a('0x0')]=_0x9e7c6e['fn']['closest'];}(jQuery));function qd_number_format(_0x1a164f,_0x93d98f,_0x5f3fe1,_0x478cac){_0x1a164f=(_0x1a164f+'')[_0x456a('0x1')](/[^0-9+\-Ee.]/g,'');_0x1a164f=isFinite(+_0x1a164f)?+_0x1a164f:0x0;_0x93d98f=isFinite(+_0x93d98f)?Math[_0x456a('0x2')](_0x93d98f):0x0;_0x478cac=_0x456a('0x3')===typeof _0x478cac?',':_0x478cac;_0x5f3fe1=_0x456a('0x3')===typeof _0x5f3fe1?'.':_0x5f3fe1;var _0x3b0145='',_0x3b0145=function(_0x52b38d,_0x497df4){var _0x93d98f=Math[_0x456a('0x4')](0xa,_0x497df4);return''+(Math[_0x456a('0x5')](_0x52b38d*_0x93d98f)/_0x93d98f)['toFixed'](_0x497df4);},_0x3b0145=(_0x93d98f?_0x3b0145(_0x1a164f,_0x93d98f):''+Math[_0x456a('0x5')](_0x1a164f))['split']('.');0x3<_0x3b0145[0x0][_0x456a('0x6')]&&(_0x3b0145[0x0]=_0x3b0145[0x0][_0x456a('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x478cac));(_0x3b0145[0x1]||'')[_0x456a('0x6')]<_0x93d98f&&(_0x3b0145[0x1]=_0x3b0145[0x1]||'',_0x3b0145[0x1]+=Array(_0x93d98f-_0x3b0145[0x1][_0x456a('0x6')]+0x1)[_0x456a('0x7')]('0'));return _0x3b0145[_0x456a('0x7')](_0x5f3fe1);};_0x456a('0x8')!==typeof String[_0x456a('0x9')][_0x456a('0xa')]&&(String[_0x456a('0x9')][_0x456a('0xa')]=function(){return this['replace'](/^\s+|\s+$/g,'');});_0x456a('0x8')!=typeof String['prototype']['capitalize']&&(String[_0x456a('0x9')][_0x456a('0xb')]=function(){return this[_0x456a('0xc')](0x0)[_0x456a('0xd')]()+this['slice'](0x1)[_0x456a('0xe')]();});(function(_0x2318f3){if(_0x456a('0x8')!==typeof _0x2318f3[_0x456a('0xf')]){var _0x1e91f3={};_0x2318f3[_0x456a('0x10')]=_0x1e91f3;0x96>parseInt((_0x2318f3['fn']['jquery'][_0x456a('0x1')](/[^0-9]+/g,'')+_0x456a('0x11'))[_0x456a('0x12')](0x0,0x3),0xa)&&console&&_0x456a('0x8')==typeof console['error']&&console[_0x456a('0x13')]();_0x2318f3[_0x456a('0xf')]=function(_0x7b2cac){try{var _0x599c2e=_0x2318f3[_0x456a('0x14')]({},{'url':'','type':'GET','data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x7b2cac);var _0x550c4e=_0x456a('0x15')===typeof _0x599c2e['data']?JSON[_0x456a('0x16')](_0x599c2e['data']):_0x599c2e[_0x456a('0x17')][_0x456a('0x18')]();var _0x55054e=encodeURIComponent(_0x599c2e['url']+'|'+_0x599c2e['type']+'|'+_0x550c4e);_0x1e91f3[_0x55054e]=_0x1e91f3[_0x55054e]||{};_0x456a('0x3')==typeof _0x1e91f3[_0x55054e][_0x456a('0x19')]?_0x1e91f3[_0x55054e][_0x456a('0x19')]=_0x2318f3['ajax'](_0x599c2e):(_0x1e91f3[_0x55054e][_0x456a('0x19')]['done'](_0x599c2e['success']),_0x1e91f3[_0x55054e]['jqXHR'][_0x456a('0x1a')](_0x599c2e[_0x456a('0x13')]),_0x1e91f3[_0x55054e][_0x456a('0x19')]['always'](_0x599c2e[_0x456a('0x1b')]));_0x1e91f3[_0x55054e][_0x456a('0x19')]['always'](function(){isNaN(parseInt(_0x599c2e[_0x456a('0x1c')]))||setTimeout(function(){_0x1e91f3[_0x55054e]['jqXHR']=void 0x0;},_0x599c2e['clearQueueDelay']);});return _0x1e91f3[_0x55054e][_0x456a('0x19')];}catch(_0x5441d1){_0x456a('0x3')!==typeof console&&'function'===typeof console[_0x456a('0x13')]&&console[_0x456a('0x13')](_0x456a('0x1d')+_0x5441d1[_0x456a('0x1e')]);}};_0x2318f3[_0x456a('0xf')][_0x456a('0x1f')]=_0x456a('0x20');}}(jQuery));(function(_0x25da31){_0x25da31['fn']['getParent']=_0x25da31['fn']['closest'];}(jQuery));(function(){var _0x48205d=jQuery;if(_0x456a('0x8')!==typeof _0x48205d['fn'][_0x456a('0x21')]){_0x48205d(function(){var _0x564301=vtexjs[_0x456a('0x22')][_0x456a('0x23')];vtexjs[_0x456a('0x22')][_0x456a('0x23')]=function(){return _0x564301[_0x456a('0x24')]();};});try{window['QuatroDigital_simpleCart']=window[_0x456a('0x25')]||{};window[_0x456a('0x25')][_0x456a('0x26')]=!0x1;_0x48205d['fn']['simpleCart']=function(_0x2f5088,_0x342c76,_0x4f4693){var _0x18d035=function(_0x24efbc,_0xd5c0f0){if(_0x456a('0x15')===typeof console){var _0x3e5e59='object'===typeof _0x24efbc;_0x456a('0x3')!==typeof _0xd5c0f0&&_0x456a('0x27')===_0xd5c0f0[_0x456a('0xe')]()?_0x3e5e59?console['warn']('[Simple\x20Cart]\x0a',_0x24efbc[0x0],_0x24efbc[0x1],_0x24efbc[0x2],_0x24efbc[0x3],_0x24efbc[0x4],_0x24efbc[0x5],_0x24efbc[0x6],_0x24efbc[0x7]):console[_0x456a('0x28')]('[Simple\x20Cart]\x0a'+_0x24efbc):'undefined'!==typeof _0xd5c0f0&&'info'===_0xd5c0f0[_0x456a('0xe')]()?_0x3e5e59?console[_0x456a('0x29')](_0x456a('0x2a'),_0x24efbc[0x0],_0x24efbc[0x1],_0x24efbc[0x2],_0x24efbc[0x3],_0x24efbc[0x4],_0x24efbc[0x5],_0x24efbc[0x6],_0x24efbc[0x7]):console[_0x456a('0x29')]('[Simple\x20Cart]\x0a'+_0x24efbc):_0x3e5e59?console[_0x456a('0x13')](_0x456a('0x2a'),_0x24efbc[0x0],_0x24efbc[0x1],_0x24efbc[0x2],_0x24efbc[0x3],_0x24efbc[0x4],_0x24efbc[0x5],_0x24efbc[0x6],_0x24efbc[0x7]):console['error'](_0x456a('0x2a')+_0x24efbc);}};var _0x1dddef=_0x48205d(this);_0x456a('0x15')===typeof _0x2f5088?_0x342c76=_0x2f5088:(_0x2f5088=_0x2f5088||!0x1,_0x1dddef=_0x1dddef[_0x456a('0x2b')](_0x48205d[_0x456a('0x2c')]['elements']));if(!_0x1dddef[_0x456a('0x6')])return _0x1dddef;_0x48205d[_0x456a('0x2c')]['elements']=_0x48205d[_0x456a('0x2c')][_0x456a('0x2d')][_0x456a('0x2b')](_0x1dddef);_0x4f4693=_0x456a('0x3')===typeof _0x4f4693?!0x1:_0x4f4693;var _0x1fac40={'cartQtt':_0x456a('0x2e'),'cartTotal':_0x456a('0x2f'),'itemsText':_0x456a('0x30'),'currencySymbol':(_0x48205d('meta[name=currency]')[_0x456a('0x31')](_0x456a('0x32'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x172bbe=_0x48205d[_0x456a('0x14')]({},_0x1fac40,_0x342c76);var _0x338f93=_0x48205d('');_0x1dddef['each'](function(){var _0xeacac0=_0x48205d(this);_0xeacac0['data'](_0x456a('0x33'))||_0xeacac0[_0x456a('0x17')]('qd_simpleCartOpts',_0x172bbe);});var _0x6507eb=function(_0x3515f5){window[_0x456a('0x34')]=window['_QuatroDigital_CartData']||{};for(var _0x2f5088=0x0,_0x5adc15=0x0,_0x546654=0x0;_0x546654<_0x3515f5[_0x456a('0x35')]['length'];_0x546654++)_0x456a('0x36')==_0x3515f5[_0x456a('0x35')][_0x546654]['id']&&(_0x5adc15+=_0x3515f5['totalizers'][_0x546654][_0x456a('0x37')]),_0x2f5088+=_0x3515f5[_0x456a('0x35')][_0x546654][_0x456a('0x37')];window[_0x456a('0x34')][_0x456a('0x38')]=_0x172bbe[_0x456a('0x39')]+qd_number_format(_0x2f5088/0x64,0x2,',','.');window['_QuatroDigital_CartData'][_0x456a('0x3a')]=_0x172bbe['currencySymbol']+qd_number_format(_0x5adc15/0x64,0x2,',','.');window[_0x456a('0x34')][_0x456a('0x3b')]=_0x172bbe[_0x456a('0x39')]+qd_number_format((_0x2f5088+_0x5adc15)/0x64,0x2,',','.');window[_0x456a('0x34')][_0x456a('0x3c')]=0x0;if(_0x172bbe['showQuantityByItems'])for(_0x546654=0x0;_0x546654<_0x3515f5[_0x456a('0x3d')][_0x456a('0x6')];_0x546654++)window[_0x456a('0x34')][_0x456a('0x3c')]+=_0x3515f5[_0x456a('0x3d')][_0x546654][_0x456a('0x3e')];else window[_0x456a('0x34')]['qtt']=_0x3515f5[_0x456a('0x3d')][_0x456a('0x6')]||0x0;try{window[_0x456a('0x34')][_0x456a('0x3f')]&&window[_0x456a('0x34')]['callback'][_0x456a('0x40')]&&window[_0x456a('0x34')]['callback']['fire']();}catch(_0x3164a7){_0x18d035('Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart');}_0x54a714(_0x338f93);};var _0x233849=function(_0x49fb5b,_0xf18167){0x1===_0x49fb5b?_0xf18167[_0x456a('0x41')]()['filter']('.singular')['show']():_0xf18167[_0x456a('0x41')]()[_0x456a('0x42')]('.plural')['show']();};var _0x2647e0=function(_0x509e13){0x1>_0x509e13?_0x1dddef[_0x456a('0x43')](_0x456a('0x44')):_0x1dddef[_0x456a('0x45')]('qd-emptyCart');};var _0x4e2b92=function(_0x5c5aee,_0x1f351b){var _0x211e91=parseInt(window[_0x456a('0x34')]['qtt'],0xa);_0x1f351b[_0x456a('0x46')][_0x456a('0x47')]();isNaN(_0x211e91)&&(_0x18d035(_0x456a('0x48'),_0x456a('0x27')),_0x211e91=0x0);_0x1f351b[_0x456a('0x49')][_0x456a('0x4a')](window[_0x456a('0x34')][_0x456a('0x38')]);_0x1f351b['cartQttE'][_0x456a('0x4a')](_0x211e91);_0x233849(_0x211e91,_0x1f351b[_0x456a('0x4b')]);_0x2647e0(_0x211e91);};var _0x54a714=function(_0x239862){_0x1dddef[_0x456a('0x4c')](function(){var _0x51d3c8={};var _0x3fd45d=_0x48205d(this);_0x2f5088&&_0x3fd45d[_0x456a('0x17')]('qd_simpleCartOpts')&&_0x48205d[_0x456a('0x14')](_0x172bbe,_0x3fd45d[_0x456a('0x17')](_0x456a('0x33')));_0x51d3c8[_0x456a('0x46')]=_0x3fd45d;_0x51d3c8['cartQttE']=_0x3fd45d['find'](_0x172bbe[_0x456a('0x4d')])||_0x338f93;_0x51d3c8['cartTotalE']=_0x3fd45d[_0x456a('0x4e')](_0x172bbe[_0x456a('0x4f')])||_0x338f93;_0x51d3c8['itemsTextE']=_0x3fd45d['find'](_0x172bbe[_0x456a('0x50')])||_0x338f93;_0x51d3c8[_0x456a('0x51')]=_0x3fd45d['find'](_0x172bbe[_0x456a('0x52')])||_0x338f93;_0x4e2b92(_0x239862,_0x51d3c8);_0x3fd45d[_0x456a('0x43')](_0x456a('0x53'));});};(function(){if(_0x172bbe[_0x456a('0x54')]){window[_0x456a('0x55')]=window[_0x456a('0x55')]||{};if(_0x456a('0x3')!==typeof window['_QuatroDigital_DropDown'][_0x456a('0x23')]&&(_0x4f4693||!_0x2f5088))return _0x6507eb(window[_0x456a('0x55')]['getOrderForm']);if('object'!==typeof window['vtexjs']||_0x456a('0x3')===typeof window[_0x456a('0x56')][_0x456a('0x22')])if('object'===typeof vtex&&'object'===typeof vtex[_0x456a('0x22')]&&_0x456a('0x3')!==typeof vtex['checkout']['SDK'])new vtex[(_0x456a('0x22'))][(_0x456a('0x57'))]();else return _0x18d035('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x48205d[_0x456a('0x58')]([_0x456a('0x3d'),_0x456a('0x35'),'shippingData'],{'done':function(_0x291619){_0x6507eb(_0x291619);window[_0x456a('0x55')][_0x456a('0x23')]=_0x291619;},'fail':function(_0x23a244){_0x18d035([_0x456a('0x59'),_0x23a244]);}});}else alert(_0x456a('0x5a'));}());_0x172bbe[_0x456a('0x3f')]();_0x48205d(window)[_0x456a('0x5b')](_0x456a('0x5c'));return _0x1dddef;};_0x48205d[_0x456a('0x2c')]={'elements':_0x48205d('')};_0x48205d(function(){var _0x56b933;_0x456a('0x8')===typeof window[_0x456a('0x5d')]&&(_0x56b933=window['ajaxRequestbuyButtonAsynchronous'],window[_0x456a('0x5d')]=function(_0x3c619b,_0x459c7b,_0x404187,_0x4cbc03,_0x256c93){_0x56b933[_0x456a('0x24')](this,_0x3c619b,_0x459c7b,_0x404187,_0x4cbc03,function(){_0x456a('0x8')===typeof _0x256c93&&_0x256c93();_0x48205d['QD_simpleCart'][_0x456a('0x2d')][_0x456a('0x4c')](function(){var _0x17c360=_0x48205d(this);_0x17c360['simpleCart'](_0x17c360[_0x456a('0x17')](_0x456a('0x33')));});});});});var _0x5781c9=window[_0x456a('0x5e')]||void 0x0;window[_0x456a('0x5e')]=function(_0x4ac8ce){_0x48205d['fn'][_0x456a('0x21')](!0x0);_0x456a('0x8')===typeof _0x5781c9?_0x5781c9[_0x456a('0x24')](this,_0x4ac8ce):alert(_0x4ac8ce);};_0x48205d(function(){var _0x4ca8cf=_0x48205d(_0x456a('0x5f'));_0x4ca8cf[_0x456a('0x6')]&&_0x4ca8cf[_0x456a('0x21')]();});_0x48205d(function(){_0x48205d(window)[_0x456a('0x60')](_0x456a('0x61'),function(){_0x48205d['fn'][_0x456a('0x21')](!0x0);});});}catch(_0x543dc5){_0x456a('0x3')!==typeof console&&_0x456a('0x8')===typeof console[_0x456a('0x13')]&&console[_0x456a('0x13')](_0x456a('0x62'),_0x543dc5);}}}());(function(){var _0x442958=function(_0x5b4ac2,_0x14e6ff){if(_0x456a('0x15')===typeof console){var _0x5293d3=_0x456a('0x15')===typeof _0x5b4ac2;_0x456a('0x3')!==typeof _0x14e6ff&&_0x456a('0x27')===_0x14e6ff['toLowerCase']()?_0x5293d3?console[_0x456a('0x28')](_0x456a('0x63'),_0x5b4ac2[0x0],_0x5b4ac2[0x1],_0x5b4ac2[0x2],_0x5b4ac2[0x3],_0x5b4ac2[0x4],_0x5b4ac2[0x5],_0x5b4ac2[0x6],_0x5b4ac2[0x7]):console[_0x456a('0x28')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a'+_0x5b4ac2):_0x456a('0x3')!==typeof _0x14e6ff&&_0x456a('0x29')===_0x14e6ff[_0x456a('0xe')]()?_0x5293d3?console[_0x456a('0x29')](_0x456a('0x63'),_0x5b4ac2[0x0],_0x5b4ac2[0x1],_0x5b4ac2[0x2],_0x5b4ac2[0x3],_0x5b4ac2[0x4],_0x5b4ac2[0x5],_0x5b4ac2[0x6],_0x5b4ac2[0x7]):console[_0x456a('0x29')](_0x456a('0x63')+_0x5b4ac2):_0x5293d3?console[_0x456a('0x13')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x5b4ac2[0x0],_0x5b4ac2[0x1],_0x5b4ac2[0x2],_0x5b4ac2[0x3],_0x5b4ac2[0x4],_0x5b4ac2[0x5],_0x5b4ac2[0x6],_0x5b4ac2[0x7]):console[_0x456a('0x13')](_0x456a('0x63')+_0x5b4ac2);}},_0x97247e=null,_0x1cd1f9={},_0x4efb63={},_0x240c3a={};$[_0x456a('0x58')]=function(_0x4e2e6d,_0x127764){if(null===_0x97247e)if('object'===typeof window[_0x456a('0x56')]&&'undefined'!==typeof window[_0x456a('0x56')][_0x456a('0x22')])_0x97247e=window[_0x456a('0x56')][_0x456a('0x22')];else return _0x442958(_0x456a('0x64'));var _0x29fdc6=$['extend']({'done':function(){},'fail':function(){}},_0x127764),_0x45cdb5=_0x4e2e6d[_0x456a('0x7')](';'),_0x3f9545=function(){_0x1cd1f9[_0x45cdb5][_0x456a('0x2b')](_0x29fdc6[_0x456a('0x65')]);_0x4efb63[_0x45cdb5][_0x456a('0x2b')](_0x29fdc6[_0x456a('0x1a')]);};_0x240c3a[_0x45cdb5]?_0x3f9545():(_0x1cd1f9[_0x45cdb5]=$[_0x456a('0x66')](),_0x4efb63[_0x45cdb5]=$[_0x456a('0x66')](),_0x3f9545(),_0x240c3a[_0x45cdb5]=!0x0,_0x97247e[_0x456a('0x23')](_0x4e2e6d)[_0x456a('0x65')](function(_0x3be421){_0x240c3a[_0x45cdb5]=!0x1;_0x1cd1f9[_0x45cdb5][_0x456a('0x40')](_0x3be421);})[_0x456a('0x1a')](function(_0x4e8f46){_0x240c3a[_0x45cdb5]=!0x1;_0x4efb63[_0x45cdb5][_0x456a('0x40')](_0x4e8f46);}));};}());(function(_0x39d26a){try{var _0x392a9a=jQuery,_0x145f8f,_0x3dd6f8=_0x392a9a({}),_0x18a293=function(_0x40bc62,_0x54a2d6){if(_0x456a('0x15')===typeof console&&_0x456a('0x3')!==typeof console[_0x456a('0x13')]&&_0x456a('0x3')!==typeof console[_0x456a('0x29')]&&_0x456a('0x3')!==typeof console[_0x456a('0x28')]){var _0x433496;_0x456a('0x15')===typeof _0x40bc62?(_0x40bc62['unshift'](_0x456a('0x67')),_0x433496=_0x40bc62):_0x433496=['[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a'+_0x40bc62];if('undefined'===typeof _0x54a2d6||'alerta'!==_0x54a2d6[_0x456a('0xe')]()&&'aviso'!==_0x54a2d6[_0x456a('0xe')]())if(_0x456a('0x3')!==typeof _0x54a2d6&&'info'===_0x54a2d6[_0x456a('0xe')]())try{console['info'][_0x456a('0x68')](console,_0x433496);}catch(_0x36a954){try{console[_0x456a('0x29')](_0x433496['join']('\x0a'));}catch(_0xe02a4f){}}else try{console[_0x456a('0x13')][_0x456a('0x68')](console,_0x433496);}catch(_0x454329){try{console[_0x456a('0x13')](_0x433496[_0x456a('0x7')]('\x0a'));}catch(_0x2a3538){}}else try{console[_0x456a('0x28')][_0x456a('0x68')](console,_0x433496);}catch(_0x1cfb27){try{console[_0x456a('0x28')](_0x433496[_0x456a('0x7')]('\x0a'));}catch(_0x59e594){}}}},_0x2cc351={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':'.productInformationWrapper\x20\x20a.buy-button','buyQtt':_0x456a('0x69'),'selectSkuMsg':_0x456a('0x6a'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x11fb40,_0x5dd658,_0x11f1d0){_0x392a9a('body')['is']('.productQuickView')&&(_0x456a('0x6b')===_0x5dd658?alert(_0x456a('0x6c')):(alert(_0x456a('0x6d')),('object'===typeof parent?parent:document)['location'][_0x456a('0x6e')]=_0x11f1d0));},'isProductPage':function(){return _0x392a9a(_0x456a('0x6f'))['is'](_0x456a('0x70'));},'execDefaultAction':function(_0x33c090){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x392a9a[_0x456a('0x71')]=function(_0x5c874e,_0x53622d){function _0x1da30d(_0x448dd5){_0x145f8f['isSmartCheckout']?_0x448dd5[_0x456a('0x17')](_0x456a('0x72'))||(_0x448dd5[_0x456a('0x17')]('qd-bb-click-active',0x1),_0x448dd5['on'](_0x456a('0x73'),function(_0x5ec703){if(!_0x145f8f[_0x456a('0x74')]())return!0x0;if(!0x0!==_0x3be79b[_0x456a('0x75')][_0x456a('0x24')](this))return _0x5ec703[_0x456a('0x76')](),!0x1;})):alert(_0x456a('0x77'));}function _0x412fab(_0x4d44e4){_0x4d44e4=_0x4d44e4||_0x392a9a(_0x145f8f[_0x456a('0x78')]);_0x4d44e4['each'](function(){var _0x4d44e4=_0x392a9a(this);_0x4d44e4['is'](_0x456a('0x79'))||(_0x4d44e4[_0x456a('0x43')](_0x456a('0x7a')),_0x4d44e4['is']('.btn-add-buy-button-asynchronous')&&!_0x4d44e4['is']('.remove-href')||_0x4d44e4[_0x456a('0x17')](_0x456a('0x7b'))||(_0x4d44e4[_0x456a('0x17')](_0x456a('0x7b'),0x1),_0x4d44e4[_0x456a('0x7c')](_0x456a('0x7d'))[_0x456a('0x6')]||_0x4d44e4[_0x456a('0x7e')]('<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>'),_0x4d44e4['is'](_0x456a('0x7f'))&&_0x145f8f[_0x456a('0x80')]()&&_0x4e28ea[_0x456a('0x24')](_0x4d44e4),_0x1da30d(_0x4d44e4)));});_0x145f8f[_0x456a('0x80')]()&&!_0x4d44e4[_0x456a('0x6')]&&_0x18a293(_0x456a('0x81')+_0x4d44e4[_0x456a('0x82')]+'\x27.','info');}var _0x3566ee=_0x392a9a(_0x5c874e);var _0x3be79b=this;window[_0x456a('0x83')]=window[_0x456a('0x83')]||{};window[_0x456a('0x34')]=window['_QuatroDigital_CartData']||{};_0x3be79b['prodAdd']=function(_0x3d4123,_0xb156ab){_0x3566ee[_0x456a('0x43')](_0x456a('0x84'));_0x392a9a('body')[_0x456a('0x43')](_0x456a('0x85'));var _0x5ef334=_0x392a9a(_0x145f8f['buyButton'])[_0x456a('0x42')](_0x456a('0x86')+(_0x3d4123[_0x456a('0x31')](_0x456a('0x6e'))||'---')+'\x27]')[_0x456a('0x2b')](_0x3d4123);_0x5ef334[_0x456a('0x43')](_0x456a('0x87'));setTimeout(function(){_0x3566ee[_0x456a('0x45')]('qd-bb-itemAddCartWrapper');_0x5ef334[_0x456a('0x45')](_0x456a('0x87'));},_0x145f8f[_0x456a('0x88')]);window[_0x456a('0x83')]['getOrderForm']=void 0x0;if(_0x456a('0x3')!==typeof _0x53622d&&_0x456a('0x8')===typeof _0x53622d[_0x456a('0x89')])return _0x145f8f[_0x456a('0x8a')]||(_0x18a293(_0x456a('0x8b')),_0x53622d['getCartInfoByUrl']()),window[_0x456a('0x55')]['getOrderForm']=void 0x0,_0x53622d[_0x456a('0x89')](function(_0xf10c7b){window[_0x456a('0x83')]['getOrderForm']=_0xf10c7b;_0x392a9a['fn'][_0x456a('0x21')](!0x0,void 0x0,!0x0);},{'lastSku':_0xb156ab});window[_0x456a('0x83')]['allowUpdate']=!0x0;_0x392a9a['fn'][_0x456a('0x21')](!0x0);};(function(){if(_0x145f8f[_0x456a('0x8a')]&&_0x145f8f['autoWatchBuyButton']){var _0x3968b8=_0x392a9a('.btn-add-buy-button-asynchronous');_0x3968b8['length']&&_0x412fab(_0x3968b8);}}());var _0x4e28ea=function(){var _0x2c73d1=_0x392a9a(this);_0x456a('0x3')!==typeof _0x2c73d1[_0x456a('0x17')]('buyButton')?(_0x2c73d1[_0x456a('0x8c')]('click'),_0x1da30d(_0x2c73d1)):(_0x2c73d1[_0x456a('0x60')](_0x456a('0x8d'),function(_0x3a76f9){_0x2c73d1['unbind'](_0x456a('0x8e'));_0x1da30d(_0x2c73d1);_0x392a9a(this)[_0x456a('0x8c')](_0x3a76f9);}),_0x392a9a(window)[_0x456a('0x8f')](function(){_0x2c73d1['unbind'](_0x456a('0x8e'));_0x1da30d(_0x2c73d1);_0x2c73d1[_0x456a('0x8c')](_0x456a('0x8d'));}));};_0x3be79b[_0x456a('0x75')]=function(){var _0x40ae93=_0x392a9a(this),_0x5c874e=_0x40ae93[_0x456a('0x31')](_0x456a('0x6e'))||'';if(-0x1<_0x5c874e['indexOf'](_0x145f8f[_0x456a('0x90')]))return!0x0;_0x5c874e=_0x5c874e[_0x456a('0x1')](/redirect\=(false|true)/gi,'')[_0x456a('0x1')]('?',_0x456a('0x91'))[_0x456a('0x1')](/\&\&/gi,'&');if(_0x145f8f[_0x456a('0x92')](_0x40ae93))return _0x40ae93[_0x456a('0x31')](_0x456a('0x6e'),_0x5c874e[_0x456a('0x1')]('redirect=false',_0x456a('0x93'))),!0x0;_0x5c874e=_0x5c874e[_0x456a('0x1')](/http.?:/i,'');_0x3dd6f8[_0x456a('0x94')](function(_0x41d4d8){if(!_0x145f8f[_0x456a('0x95')]&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0x456a('0x96')](_0x5c874e))return _0x41d4d8();var _0x2f258f=function(_0x1c759b,_0x1d2b05){var _0x412fab=_0x5c874e[_0x456a('0x97')](/sku\=([0-9]+)/gi),_0x222b2f=[];if(_0x456a('0x15')===typeof _0x412fab&&null!==_0x412fab)for(var _0x31aae4=_0x412fab[_0x456a('0x6')]-0x1;0x0<=_0x31aae4;_0x31aae4--){var _0x20c4aa=parseInt(_0x412fab[_0x31aae4]['replace'](/sku\=/gi,''));isNaN(_0x20c4aa)||_0x222b2f[_0x456a('0x98')](_0x20c4aa);}_0x145f8f[_0x456a('0x99')][_0x456a('0x24')](this,_0x1c759b,_0x1d2b05,_0x5c874e);_0x3be79b['buyButtonClickCallback'][_0x456a('0x24')](this,_0x1c759b,_0x1d2b05,_0x5c874e,_0x222b2f);_0x3be79b[_0x456a('0x9a')](_0x40ae93,_0x5c874e[_0x456a('0x9b')](_0x456a('0x9c'))[_0x456a('0x9d')]()[_0x456a('0x9b')]('&')['shift']());_0x456a('0x8')===typeof _0x145f8f[_0x456a('0x9e')]&&_0x145f8f[_0x456a('0x9e')][_0x456a('0x24')](this);_0x392a9a(window)[_0x456a('0x5b')]('productAddedToCart');_0x392a9a(window)[_0x456a('0x5b')](_0x456a('0x9f'));};_0x145f8f[_0x456a('0xa0')]?(_0x2f258f(null,'success'),_0x41d4d8()):_0x392a9a['ajax']({'url':_0x5c874e,'complete':_0x2f258f})[_0x456a('0xa1')](function(){_0x41d4d8();});});};_0x3be79b[_0x456a('0xa2')]=function(_0x2581db,_0x36dbc4,_0x18f835,_0x412a22){try{'success'===_0x36dbc4&&'object'===typeof window[_0x456a('0xa3')]&&'function'===typeof window[_0x456a('0xa3')][_0x456a('0xa4')]&&window[_0x456a('0xa3')]['_QuatroDigital_prodBuyCallback'](_0x2581db,_0x36dbc4,_0x18f835,_0x412a22);}catch(_0x113dc6){_0x18a293(_0x456a('0xa5'));}};_0x412fab();_0x456a('0x8')===typeof _0x145f8f['callback']?_0x145f8f[_0x456a('0x3f')]['call'](this):_0x18a293(_0x456a('0xa6'));};var _0x4dd865=_0x392a9a[_0x456a('0x66')]();_0x392a9a['fn'][_0x456a('0x71')]=function(_0x37561c,_0x5c1d90){var _0x39d26a=_0x392a9a(this);'undefined'!==typeof _0x5c1d90||'object'!==typeof _0x37561c||_0x37561c instanceof _0x392a9a||(_0x5c1d90=_0x37561c,_0x37561c=void 0x0);_0x145f8f=_0x392a9a[_0x456a('0x14')]({},_0x2cc351,_0x5c1d90);var _0x66495c;_0x4dd865['add'](function(){_0x39d26a[_0x456a('0x7c')](_0x456a('0xa7'))[_0x456a('0x6')]||_0x39d26a['prepend'](_0x456a('0xa8'));_0x66495c=new _0x392a9a[(_0x456a('0x71'))](_0x39d26a,_0x37561c);});_0x4dd865['fire']();_0x392a9a(window)['on']('QuatroDigital.qd_bb_prod_add',function(_0x2130c3,_0x122a46,_0x368c08){_0x66495c[_0x456a('0x9a')](_0x122a46,_0x368c08);});return _0x392a9a[_0x456a('0x14')](_0x39d26a,_0x66495c);};var _0xe78f46=0x0;_0x392a9a(document)[_0x456a('0xa9')](function(_0x26f344,_0x6072a,_0x144e76){-0x1<_0x144e76[_0x456a('0xaa')][_0x456a('0xe')]()[_0x456a('0xab')](_0x456a('0xac'))&&(_0xe78f46=(_0x144e76[_0x456a('0xaa')][_0x456a('0x97')](/sku\=([0-9]+)/i)||[''])[_0x456a('0x9d')]());});_0x392a9a(window)[_0x456a('0x60')](_0x456a('0xad'),function(){_0x392a9a(window)['trigger'](_0x456a('0xae'),[new _0x392a9a(),_0xe78f46]);});_0x392a9a(document)[_0x456a('0xaf')](function(){_0x4dd865[_0x456a('0x40')]();});}catch(_0x4aa521){_0x456a('0x3')!==typeof console&&_0x456a('0x8')===typeof console[_0x456a('0x13')]&&console[_0x456a('0x13')](_0x456a('0x62'),_0x4aa521);}}(this));function qd_number_format(_0x57c478,_0x238005,_0x24c7da,_0x34f198){_0x57c478=(_0x57c478+'')[_0x456a('0x1')](/[^0-9+\-Ee.]/g,'');_0x57c478=isFinite(+_0x57c478)?+_0x57c478:0x0;_0x238005=isFinite(+_0x238005)?Math[_0x456a('0x2')](_0x238005):0x0;_0x34f198=_0x456a('0x3')===typeof _0x34f198?',':_0x34f198;_0x24c7da=_0x456a('0x3')===typeof _0x24c7da?'.':_0x24c7da;var _0x55fb0b='',_0x55fb0b=function(_0x3c7900,_0x5a802f){var _0x501830=Math[_0x456a('0x4')](0xa,_0x5a802f);return''+(Math['round'](_0x3c7900*_0x501830)/_0x501830)['toFixed'](_0x5a802f);},_0x55fb0b=(_0x238005?_0x55fb0b(_0x57c478,_0x238005):''+Math[_0x456a('0x5')](_0x57c478))['split']('.');0x3<_0x55fb0b[0x0]['length']&&(_0x55fb0b[0x0]=_0x55fb0b[0x0][_0x456a('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x34f198));(_0x55fb0b[0x1]||'')[_0x456a('0x6')]<_0x238005&&(_0x55fb0b[0x1]=_0x55fb0b[0x1]||'',_0x55fb0b[0x1]+=Array(_0x238005-_0x55fb0b[0x1][_0x456a('0x6')]+0x1)[_0x456a('0x7')]('0'));return _0x55fb0b[_0x456a('0x7')](_0x24c7da);}(function(){try{window[_0x456a('0x34')]=window[_0x456a('0x34')]||{},window[_0x456a('0x34')][_0x456a('0x3f')]=window[_0x456a('0x34')][_0x456a('0x3f')]||$[_0x456a('0x66')]();}catch(_0x242810){_0x456a('0x3')!==typeof console&&_0x456a('0x8')===typeof console[_0x456a('0x13')]&&console[_0x456a('0x13')]('Oooops!\x20',_0x242810[_0x456a('0x1e')]);}}());(function(_0x968d1a){try{var _0x44e159=jQuery,_0x421b81=function(_0x3810f2,_0x58b64c){if(_0x456a('0x15')===typeof console&&'undefined'!==typeof console[_0x456a('0x13')]&&_0x456a('0x3')!==typeof console[_0x456a('0x29')]&&_0x456a('0x3')!==typeof console[_0x456a('0x28')]){var _0x4d7077;'object'===typeof _0x3810f2?(_0x3810f2[_0x456a('0xb0')](_0x456a('0xb1')),_0x4d7077=_0x3810f2):_0x4d7077=[_0x456a('0xb1')+_0x3810f2];if(_0x456a('0x3')===typeof _0x58b64c||_0x456a('0x27')!==_0x58b64c[_0x456a('0xe')]()&&'aviso'!==_0x58b64c[_0x456a('0xe')]())if(_0x456a('0x3')!==typeof _0x58b64c&&'info'===_0x58b64c[_0x456a('0xe')]())try{console[_0x456a('0x29')][_0x456a('0x68')](console,_0x4d7077);}catch(_0x1b6313){try{console['info'](_0x4d7077[_0x456a('0x7')]('\x0a'));}catch(_0x90ba42){}}else try{console[_0x456a('0x13')][_0x456a('0x68')](console,_0x4d7077);}catch(_0x476e82){try{console[_0x456a('0x13')](_0x4d7077[_0x456a('0x7')]('\x0a'));}catch(_0x557469){}}else try{console['warn'][_0x456a('0x68')](console,_0x4d7077);}catch(_0x21b932){try{console[_0x456a('0x28')](_0x4d7077['join']('\x0a'));}catch(_0x54f0c9){}}}};window['_QuatroDigital_DropDown']=window[_0x456a('0x55')]||{};window[_0x456a('0x55')][_0x456a('0xb2')]=!0x0;_0x44e159[_0x456a('0xb3')]=function(){};_0x44e159['fn'][_0x456a('0xb3')]=function(){return{'fn':new _0x44e159()};};var _0x14ccbe=function(_0x5ac264){var _0x2248f2={'z':_0x456a('0xb4')};return function(_0x33ffe8){var _0x641ec7=function(_0x47664d){return _0x47664d;};var _0x53013f=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x33ffe8=_0x33ffe8['d'+_0x53013f[0x10]+'c'+_0x53013f[0x11]+'m'+_0x641ec7(_0x53013f[0x1])+'n'+_0x53013f[0xd]]['l'+_0x53013f[0x12]+'c'+_0x53013f[0x0]+'ti'+_0x641ec7('o')+'n'];var _0x1b4739=function(_0x395733){return escape(encodeURIComponent(_0x395733['replace'](/\./g,'¨')[_0x456a('0x1')](/[a-zA-Z]/g,function(_0x4d2065){return String[_0x456a('0xb5')](('Z'>=_0x4d2065?0x5a:0x7a)>=(_0x4d2065=_0x4d2065[_0x456a('0xb6')](0x0)+0xd)?_0x4d2065:_0x4d2065-0x1a);})));};var _0x968d1a=_0x1b4739(_0x33ffe8[[_0x53013f[0x9],_0x641ec7('o'),_0x53013f[0xc],_0x53013f[_0x641ec7(0xd)]][_0x456a('0x7')]('')]);_0x1b4739=_0x1b4739((window[['js',_0x641ec7('no'),'m',_0x53013f[0x1],_0x53013f[0x4][_0x456a('0xd')](),_0x456a('0xb7')][_0x456a('0x7')]('')]||_0x456a('0xb8'))+['.v',_0x53013f[0xd],'e',_0x641ec7('x'),'co',_0x641ec7('mm'),_0x456a('0xb9'),_0x53013f[0x1],'.c',_0x641ec7('o'),'m.',_0x53013f[0x13],'r']['join'](''));for(var _0x471246 in _0x2248f2){if(_0x1b4739===_0x471246+_0x2248f2[_0x471246]||_0x968d1a===_0x471246+_0x2248f2[_0x471246]){var _0x176907='tr'+_0x53013f[0x11]+'e';break;}_0x176907='f'+_0x53013f[0x0]+'ls'+_0x641ec7(_0x53013f[0x1])+'';}_0x641ec7=!0x1;-0x1<_0x33ffe8[[_0x53013f[0xc],'e',_0x53013f[0x0],'rc',_0x53013f[0x9]][_0x456a('0x7')]('')]['indexOf'](_0x456a('0xba'))&&(_0x641ec7=!0x0);return[_0x176907,_0x641ec7];}(_0x5ac264);}(window);if(!eval(_0x14ccbe[0x0]))return _0x14ccbe[0x1]?_0x421b81(_0x456a('0xbb')):!0x1;_0x44e159['QD_dropDownCart']=function(_0xc757b7,_0x5730bc){var _0x41f824=_0x44e159(_0xc757b7);if(!_0x41f824[_0x456a('0x6')])return _0x41f824;var _0xdaa442=_0x44e159['extend'](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x456a('0xbc'),'linkCheckout':_0x456a('0xbd'),'cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':_0x456a('0xbe'),'continueShopping':'Continuar\x20Comprando','shippingForm':'<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x3a463b){return _0x3a463b[_0x456a('0xbf')]||_0x3a463b['name'];},'callback':function(){},'callbackProductsList':function(){}},_0x5730bc);_0x44e159('');var _0x1164af=this;if(_0xdaa442[_0x456a('0x54')]){var _0x2aedb1=!0x1;_0x456a('0x3')===typeof window['vtexjs']&&(_0x421b81(_0x456a('0xc0')),_0x44e159[_0x456a('0xc1')]({'url':_0x456a('0xc2'),'async':!0x1,'dataType':_0x456a('0xc3'),'error':function(){_0x421b81(_0x456a('0xc4'));_0x2aedb1=!0x0;}}));if(_0x2aedb1)return _0x421b81(_0x456a('0xc5'));}if('object'===typeof window[_0x456a('0x56')]&&_0x456a('0x3')!==typeof window[_0x456a('0x56')][_0x456a('0x22')])var _0x399161=window[_0x456a('0x56')][_0x456a('0x22')];else if(_0x456a('0x15')===typeof vtex&&_0x456a('0x15')===typeof vtex[_0x456a('0x22')]&&'undefined'!==typeof vtex[_0x456a('0x22')][_0x456a('0x57')])_0x399161=new vtex[(_0x456a('0x22'))]['SDK']();else return _0x421b81(_0x456a('0xc6'));_0x1164af['cartContainer']=_0x456a('0xc7');var _0x18ee2c=function(_0x25dc2c){_0x44e159(this)['append'](_0x25dc2c);_0x25dc2c['find'](_0x456a('0xc8'))[_0x456a('0x2b')](_0x44e159(_0x456a('0xc9')))['on']('click.qd_ddc_closeFn',function(){_0x41f824[_0x456a('0x45')]('qd-bb-lightBoxProdAdd');_0x44e159(document['body'])[_0x456a('0x45')]('qd-bb-lightBoxBodyProdAdd');});_0x44e159(document)['off'](_0x456a('0xca'))['on']('keyup.qd_ddc_closeFn',function(_0x401408){0x1b==_0x401408['keyCode']&&(_0x41f824[_0x456a('0x45')](_0x456a('0xcb')),_0x44e159(document[_0x456a('0x6f')])[_0x456a('0x45')]('qd-bb-lightBoxBodyProdAdd'));});var _0x728832=_0x25dc2c[_0x456a('0x4e')](_0x456a('0xcc'));_0x25dc2c[_0x456a('0x4e')](_0x456a('0xcd'))['on'](_0x456a('0xce'),function(){_0x1164af['scrollCart']('-',void 0x0,void 0x0,_0x728832);return!0x1;});_0x25dc2c[_0x456a('0x4e')](_0x456a('0xcf'))['on'](_0x456a('0xd0'),function(){_0x1164af['scrollCart'](void 0x0,void 0x0,void 0x0,_0x728832);return!0x1;});_0x25dc2c['find']('.qd-ddc-shipping\x20input')[_0x456a('0xd1')]('')['on']('keyup.qd_ddc_cep',function(){_0x1164af[_0x456a('0xd2')](_0x44e159(this));});if(_0xdaa442[_0x456a('0xd3')]){var _0x5730bc=0x0;_0x44e159(this)['on'](_0x456a('0xd4'),function(){var _0x25dc2c=function(){window[_0x456a('0x55')][_0x456a('0xb2')]&&(_0x1164af['getCartInfoByUrl'](),window[_0x456a('0x55')][_0x456a('0xb2')]=!0x1,_0x44e159['fn']['simpleCart'](!0x0),_0x1164af['cartIsEmpty']());};_0x5730bc=setInterval(function(){_0x25dc2c();},0x258);_0x25dc2c();});_0x44e159(this)['on'](_0x456a('0xd5'),function(){clearInterval(_0x5730bc);});}};var _0x2531bc=function(_0x3ea1dc){_0x3ea1dc=_0x44e159(_0x3ea1dc);_0xdaa442[_0x456a('0xd6')][_0x456a('0x4f')]=_0xdaa442[_0x456a('0xd6')][_0x456a('0x4f')]['replace']('#value',_0x456a('0xd7'));_0xdaa442[_0x456a('0xd6')][_0x456a('0x4f')]=_0xdaa442[_0x456a('0xd6')][_0x456a('0x4f')][_0x456a('0x1')](_0x456a('0xd8'),_0x456a('0xd9'));_0xdaa442['texts'][_0x456a('0x4f')]=_0xdaa442['texts']['cartTotal'][_0x456a('0x1')](_0x456a('0xda'),_0x456a('0xdb'));_0xdaa442[_0x456a('0xd6')][_0x456a('0x4f')]=_0xdaa442[_0x456a('0xd6')][_0x456a('0x4f')][_0x456a('0x1')](_0x456a('0xdc'),_0x456a('0xdd'));_0x3ea1dc['find']('.qd-ddc-viewCart')[_0x456a('0x4a')](_0xdaa442['texts'][_0x456a('0xde')]);_0x3ea1dc[_0x456a('0x4e')](_0x456a('0xdf'))[_0x456a('0x4a')](_0xdaa442['texts'][_0x456a('0xe0')]);_0x3ea1dc[_0x456a('0x4e')]('.qd-ddc-checkout')['html'](_0xdaa442[_0x456a('0xd6')][_0x456a('0xe1')]);_0x3ea1dc[_0x456a('0x4e')](_0x456a('0xe2'))[_0x456a('0x4a')](_0xdaa442[_0x456a('0xd6')]['cartTotal']);_0x3ea1dc[_0x456a('0x4e')](_0x456a('0xe3'))[_0x456a('0x4a')](_0xdaa442[_0x456a('0xd6')][_0x456a('0xe4')]);_0x3ea1dc[_0x456a('0x4e')]('.qd-ddc-emptyCart\x20p')['html'](_0xdaa442[_0x456a('0xd6')][_0x456a('0x52')]);return _0x3ea1dc;}(this['cartContainer']);var _0x595579=0x0;_0x41f824['each'](function(){0x0<_0x595579?_0x18ee2c[_0x456a('0x24')](this,_0x2531bc[_0x456a('0xe5')]()):_0x18ee2c[_0x456a('0x24')](this,_0x2531bc);_0x595579++;});window[_0x456a('0x34')][_0x456a('0x3f')][_0x456a('0x2b')](function(){_0x44e159('.qd-ddc-infoTotalValue')[_0x456a('0x4a')](window[_0x456a('0x34')][_0x456a('0x38')]||'--');_0x44e159('.qd-ddc-infoTotalItems')['html'](window[_0x456a('0x34')][_0x456a('0x3c')]||'0');_0x44e159(_0x456a('0xe6'))[_0x456a('0x4a')](window[_0x456a('0x34')][_0x456a('0x3a')]||'--');_0x44e159(_0x456a('0xe7'))[_0x456a('0x4a')](window[_0x456a('0x34')][_0x456a('0x3b')]||'--');});var _0x39cc06=function(_0x280d07,_0x467858){if(_0x456a('0x3')===typeof _0x280d07[_0x456a('0x3d')])return _0x421b81(_0x456a('0xe8'));_0x1164af[_0x456a('0xe9')]['call'](this,_0x467858);};_0x1164af['getCartInfoByUrl']=function(_0x14d1a3,_0x185cc9){'undefined'!=typeof _0x185cc9?window[_0x456a('0x55')]['dataOptionsCache']=_0x185cc9:window[_0x456a('0x55')]['dataOptionsCache']&&(_0x185cc9=window[_0x456a('0x55')][_0x456a('0xea')]);setTimeout(function(){window['_QuatroDigital_DropDown']['dataOptionsCache']=void 0x0;},_0xdaa442[_0x456a('0x88')]);_0x44e159(_0x456a('0xeb'))[_0x456a('0x45')]('qd-ddc-prodLoaded');if(_0xdaa442[_0x456a('0x54')]){var _0x5730bc=function(_0x13f7cb){window[_0x456a('0x55')]['getOrderForm']=_0x13f7cb;_0x39cc06(_0x13f7cb,_0x185cc9);_0x456a('0x3')!==typeof window[_0x456a('0xec')]&&_0x456a('0x8')===typeof window[_0x456a('0xec')][_0x456a('0xed')]&&window[_0x456a('0xec')]['exec'][_0x456a('0x24')](this);_0x44e159('.qd-ddc-wrapper')['addClass'](_0x456a('0xee'));};_0x456a('0x3')!==typeof window[_0x456a('0x55')][_0x456a('0x23')]?(_0x5730bc(window[_0x456a('0x55')][_0x456a('0x23')]),'function'===typeof _0x14d1a3&&_0x14d1a3(window['_QuatroDigital_DropDown']['getOrderForm'])):_0x44e159[_0x456a('0x58')]([_0x456a('0x3d'),_0x456a('0x35'),_0x456a('0xef')],{'done':function(_0x2a11bc){_0x5730bc[_0x456a('0x24')](this,_0x2a11bc);'function'===typeof _0x14d1a3&&_0x14d1a3(_0x2a11bc);},'fail':function(_0x338b53){_0x421b81(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0x338b53]);}});}else alert(_0x456a('0xf0'));};_0x1164af[_0x456a('0xf1')]=function(){var _0x198b34=_0x44e159(_0x456a('0xeb'));_0x198b34[_0x456a('0x4e')](_0x456a('0xf2'))[_0x456a('0x6')]?_0x198b34['removeClass'](_0x456a('0xf3')):_0x198b34[_0x456a('0x43')](_0x456a('0xf3'));};_0x1164af[_0x456a('0xe9')]=function(_0x206b3b){var _0x5730bc=_0x44e159(_0x456a('0xf4'));_0x5730bc['empty']();_0x5730bc['each'](function(){var _0x5730bc=_0x44e159(this),_0xc757b7,_0x2e1aea,_0x10e418=_0x44e159(''),_0x42ea84;for(_0x42ea84 in window[_0x456a('0x55')][_0x456a('0x23')][_0x456a('0x3d')])if('object'===typeof window[_0x456a('0x55')][_0x456a('0x23')][_0x456a('0x3d')][_0x42ea84]){var _0x14d894=window['_QuatroDigital_DropDown'][_0x456a('0x23')][_0x456a('0x3d')][_0x42ea84];var _0x11aa1c=_0x14d894[_0x456a('0xf5')]['replace'](/^\/|\/$/g,'')[_0x456a('0x9b')]('/');var _0x4f89b6=_0x44e159('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0x4f89b6[_0x456a('0x31')]({'data-sku':_0x14d894['id'],'data-sku-index':_0x42ea84,'data-qd-departament':_0x11aa1c[0x0],'data-qd-category':_0x11aa1c[_0x11aa1c[_0x456a('0x6')]-0x1]});_0x4f89b6[_0x456a('0x43')](_0x456a('0xf6')+_0x14d894[_0x456a('0xf7')]);_0x4f89b6[_0x456a('0x4e')](_0x456a('0xf8'))[_0x456a('0x7e')](_0xdaa442[_0x456a('0xbf')](_0x14d894));_0x4f89b6[_0x456a('0x4e')]('.qd-ddc-prodPrice')[_0x456a('0x7e')](isNaN(_0x14d894[_0x456a('0xf9')])?_0x14d894[_0x456a('0xf9')]:0x0==_0x14d894[_0x456a('0xf9')]?'Grátis':(_0x44e159(_0x456a('0xfa'))[_0x456a('0x31')](_0x456a('0x32'))||'R$')+'\x20'+qd_number_format(_0x14d894['sellingPrice']/0x64,0x2,',','.'));_0x4f89b6[_0x456a('0x4e')](_0x456a('0xfb'))[_0x456a('0x31')]({'data-sku':_0x14d894['id'],'data-sku-index':_0x42ea84})[_0x456a('0xd1')](_0x14d894[_0x456a('0x3e')]);_0x4f89b6[_0x456a('0x4e')](_0x456a('0xfc'))['attr']({'data-sku':_0x14d894['id'],'data-sku-index':_0x42ea84});_0x1164af[_0x456a('0xfd')](_0x14d894['id'],_0x4f89b6[_0x456a('0x4e')]('.qd-ddc-image'),_0x14d894[_0x456a('0xfe')]);_0x4f89b6[_0x456a('0x4e')](_0x456a('0xff'))['attr']({'data-sku':_0x14d894['id'],'data-sku-index':_0x42ea84});_0x4f89b6[_0x456a('0x100')](_0x5730bc);_0x10e418=_0x10e418[_0x456a('0x2b')](_0x4f89b6);}try{var _0xafad3f=_0x5730bc[_0x456a('0x0')](_0x456a('0xeb'))[_0x456a('0x4e')](_0x456a('0x101'));_0xafad3f['length']&&''==_0xafad3f['val']()&&window[_0x456a('0x55')]['getOrderForm'][_0x456a('0xef')][_0x456a('0x102')]&&_0xafad3f['val'](window[_0x456a('0x55')]['getOrderForm']['shippingData']['address'][_0x456a('0x103')]);}catch(_0x406e3e){_0x421b81(_0x456a('0x104')+_0x406e3e[_0x456a('0x1e')],_0x456a('0x105'));}_0x1164af[_0x456a('0x106')](_0x5730bc);_0x1164af['cartIsEmpty']();_0x206b3b&&_0x206b3b[_0x456a('0x107')]&&function(){_0x2e1aea=_0x10e418['filter']('[data-sku=\x27'+_0x206b3b[_0x456a('0x107')]+'\x27]');_0x2e1aea[_0x456a('0x6')]&&(_0xc757b7=0x0,_0x10e418['each'](function(){var _0x206b3b=_0x44e159(this);if(_0x206b3b['is'](_0x2e1aea))return!0x1;_0xc757b7+=_0x206b3b[_0x456a('0x108')]();}),_0x1164af[_0x456a('0x109')](void 0x0,void 0x0,_0xc757b7,_0x5730bc[_0x456a('0x2b')](_0x5730bc[_0x456a('0xa3')]())),_0x10e418['removeClass'](_0x456a('0x10a')),function(_0x41f05a){_0x41f05a['addClass'](_0x456a('0x10b'));_0x41f05a[_0x456a('0x43')]('qd-ddc-lastAddedFixed');setTimeout(function(){_0x41f05a['removeClass'](_0x456a('0x10b'));},_0xdaa442[_0x456a('0x88')]);}(_0x2e1aea));}();});(function(){_QuatroDigital_DropDown[_0x456a('0x23')][_0x456a('0x3d')][_0x456a('0x6')]?(_0x44e159('body')['removeClass'](_0x456a('0x10c'))[_0x456a('0x43')](_0x456a('0x10d')),setTimeout(function(){_0x44e159(_0x456a('0x6f'))['removeClass'](_0x456a('0x10e'));},_0xdaa442[_0x456a('0x88')])):_0x44e159(_0x456a('0x6f'))['removeClass']('qd-ddc-cart-rendered')[_0x456a('0x43')](_0x456a('0x10c'));}());'function'===typeof _0xdaa442[_0x456a('0x10f')]?_0xdaa442[_0x456a('0x10f')][_0x456a('0x24')](this):_0x421b81('callbackProductsList\x20não\x20é\x20uma\x20função');};_0x1164af['insertProdImg']=function(_0x55eedf,_0x49dba5,_0x1f12c0){function _0x476dcc(){_0x49dba5[_0x456a('0x45')](_0x456a('0x110'))['load'](function(){_0x44e159(this)[_0x456a('0x43')](_0x456a('0x110'));})[_0x456a('0x31')](_0x456a('0x111'),_0x1f12c0);}_0x1f12c0?_0x476dcc():isNaN(_0x55eedf)?_0x421b81(_0x456a('0x112'),_0x456a('0x27')):alert(_0x456a('0x113'));};_0x1164af[_0x456a('0x106')]=function(_0x36d6da){var _0x4ad06b=function(_0x4566bd,_0x34a36d){var _0x5730bc=_0x44e159(_0x4566bd);var _0x5a8f62=_0x5730bc[_0x456a('0x31')](_0x456a('0x114'));var _0xc757b7=_0x5730bc[_0x456a('0x31')](_0x456a('0x115'));if(_0x5a8f62){var _0x21846a=parseInt(_0x5730bc[_0x456a('0xd1')]())||0x1;_0x1164af[_0x456a('0x116')]([_0x5a8f62,_0xc757b7],_0x21846a,_0x21846a+0x1,function(_0x568e6c){_0x5730bc['val'](_0x568e6c);_0x456a('0x8')===typeof _0x34a36d&&_0x34a36d();});}};var _0x5730bc=function(_0x28b6a7,_0x3272b5){var _0x5730bc=_0x44e159(_0x28b6a7);var _0x5c5ede=_0x5730bc[_0x456a('0x31')](_0x456a('0x114'));var _0xc757b7=_0x5730bc[_0x456a('0x31')](_0x456a('0x115'));if(_0x5c5ede){var _0x21d62f=parseInt(_0x5730bc[_0x456a('0xd1')]())||0x2;_0x1164af[_0x456a('0x116')]([_0x5c5ede,_0xc757b7],_0x21d62f,_0x21d62f-0x1,function(_0x5b94e9){_0x5730bc[_0x456a('0xd1')](_0x5b94e9);'function'===typeof _0x3272b5&&_0x3272b5();});}};var _0x8d6bc2=function(_0x4b51bd,_0x113f74){var _0x5730bc=_0x44e159(_0x4b51bd);var _0x4b502b=_0x5730bc[_0x456a('0x31')]('data-sku');var _0xc757b7=_0x5730bc[_0x456a('0x31')](_0x456a('0x115'));if(_0x4b502b){var _0x444671=parseInt(_0x5730bc[_0x456a('0xd1')]())||0x1;_0x1164af[_0x456a('0x116')]([_0x4b502b,_0xc757b7],0x1,_0x444671,function(_0x18899b){_0x5730bc['val'](_0x18899b);_0x456a('0x8')===typeof _0x113f74&&_0x113f74();});}};var _0xc757b7=_0x36d6da[_0x456a('0x4e')]('.qd-ddc-prodQttWrapper:not(.qd_on)');_0xc757b7[_0x456a('0x43')]('qd_on')[_0x456a('0x4c')](function(){var _0x36d6da=_0x44e159(this);_0x36d6da[_0x456a('0x4e')](_0x456a('0x117'))['on']('click.qd_ddc_more',function(_0x2aa841){_0x2aa841[_0x456a('0x76')]();_0xc757b7[_0x456a('0x43')](_0x456a('0x118'));_0x4ad06b(_0x36d6da[_0x456a('0x4e')](_0x456a('0xfb')),function(){_0xc757b7[_0x456a('0x45')](_0x456a('0x118'));});});_0x36d6da[_0x456a('0x4e')](_0x456a('0x119'))['on'](_0x456a('0x11a'),function(_0x26cc13){_0x26cc13[_0x456a('0x76')]();_0xc757b7[_0x456a('0x43')]('qd-loading');_0x5730bc(_0x36d6da[_0x456a('0x4e')]('.qd-ddc-quantity'),function(){_0xc757b7[_0x456a('0x45')]('qd-loading');});});_0x36d6da['find'](_0x456a('0xfb'))['on'](_0x456a('0x11b'),function(){_0xc757b7[_0x456a('0x43')](_0x456a('0x118'));_0x8d6bc2(this,function(){_0xc757b7[_0x456a('0x45')]('qd-loading');});});_0x36d6da[_0x456a('0x4e')](_0x456a('0xfb'))['on'](_0x456a('0x11c'),function(_0x534d34){0xd==_0x534d34[_0x456a('0x11d')]&&(_0xc757b7['addClass'](_0x456a('0x118')),_0x8d6bc2(this,function(){_0xc757b7[_0x456a('0x45')](_0x456a('0x118'));}));});});_0x36d6da[_0x456a('0x4e')](_0x456a('0xf2'))[_0x456a('0x4c')](function(){var _0x36d6da=_0x44e159(this);_0x36d6da[_0x456a('0x4e')](_0x456a('0xfc'))['on'](_0x456a('0x11e'),function(){_0x36d6da['addClass']('qd-loading');_0x1164af['removeProduct'](_0x44e159(this),function(_0x12e43b){_0x12e43b?_0x36d6da[_0x456a('0x11f')](!0x0)['slideUp'](function(){_0x36d6da[_0x456a('0x120')]();_0x1164af[_0x456a('0xf1')]();}):_0x36d6da[_0x456a('0x45')](_0x456a('0x118'));});return!0x1;});});};_0x1164af[_0x456a('0xd2')]=function(_0x1654c8){var _0x5e9ebf=_0x1654c8['val'](),_0x5e9ebf=_0x5e9ebf[_0x456a('0x1')](/[^0-9\-]/g,''),_0x5e9ebf=_0x5e9ebf[_0x456a('0x1')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x456a('0x121')),_0x5e9ebf=_0x5e9ebf[_0x456a('0x1')](/(.{9}).*/g,'$1');_0x1654c8['val'](_0x5e9ebf);0x9<=_0x5e9ebf[_0x456a('0x6')]&&(_0x1654c8[_0x456a('0x17')]('qdDdcLastPostalCode')!=_0x5e9ebf&&_0x399161[_0x456a('0x122')]({'postalCode':_0x5e9ebf,'country':_0x456a('0x123')})[_0x456a('0x65')](function(_0x33eb25){window[_0x456a('0x55')][_0x456a('0x23')]=_0x33eb25;_0x1164af[_0x456a('0x89')]();})[_0x456a('0x1a')](function(_0x380a1){_0x421b81([_0x456a('0x124'),_0x380a1]);updateCartData();}),_0x1654c8['data'](_0x456a('0x125'),_0x5e9ebf));};_0x1164af[_0x456a('0x116')]=function(_0x42ccc6,_0x455f46,_0x50cc51,_0x381aa8){function _0x11e6e5(_0x1af1f1){_0x1af1f1=_0x456a('0x126')!==typeof _0x1af1f1?!0x1:_0x1af1f1;_0x1164af['getCartInfoByUrl']();window['_QuatroDigital_DropDown'][_0x456a('0xb2')]=!0x1;_0x1164af[_0x456a('0xf1')]();_0x456a('0x3')!==typeof window['_QuatroDigital_AmountProduct']&&_0x456a('0x8')===typeof window['_QuatroDigital_AmountProduct'][_0x456a('0xed')]&&window['_QuatroDigital_AmountProduct'][_0x456a('0xed')][_0x456a('0x24')](this);_0x456a('0x8')===typeof adminCart&&adminCart();_0x44e159['fn']['simpleCart'](!0x0,void 0x0,_0x1af1f1);_0x456a('0x8')===typeof _0x381aa8&&_0x381aa8(_0x455f46);}_0x50cc51=_0x50cc51||0x1;if(0x1>_0x50cc51)return _0x455f46;if(_0xdaa442[_0x456a('0x54')]){if(_0x456a('0x3')===typeof window[_0x456a('0x55')][_0x456a('0x23')][_0x456a('0x3d')][_0x42ccc6[0x1]])return _0x421b81('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x42ccc6[0x1]+']'),_0x455f46;window[_0x456a('0x55')][_0x456a('0x23')][_0x456a('0x3d')][_0x42ccc6[0x1]]['quantity']=_0x50cc51;window[_0x456a('0x55')]['getOrderForm']['items'][_0x42ccc6[0x1]][_0x456a('0x127')]=_0x42ccc6[0x1];_0x399161[_0x456a('0x128')]([window[_0x456a('0x55')]['getOrderForm'][_0x456a('0x3d')][_0x42ccc6[0x1]]],[_0x456a('0x3d'),_0x456a('0x35'),_0x456a('0xef')])[_0x456a('0x65')](function(_0x40e9b4){window[_0x456a('0x55')][_0x456a('0x23')]=_0x40e9b4;_0x11e6e5(!0x0);})[_0x456a('0x1a')](function(_0x4b2e00){_0x421b81([_0x456a('0x129'),_0x4b2e00]);_0x11e6e5();});}else _0x421b81(_0x456a('0x12a'));};_0x1164af['removeProduct']=function(_0x561fc8,_0x46dfa7){function _0x49c88e(_0x3834c3){_0x3834c3='boolean'!==typeof _0x3834c3?!0x1:_0x3834c3;_0x456a('0x3')!==typeof window['_QuatroDigital_AmountProduct']&&'function'===typeof window[_0x456a('0xec')]['exec']&&window['_QuatroDigital_AmountProduct'][_0x456a('0xed')]['call'](this);_0x456a('0x8')===typeof adminCart&&adminCart();_0x44e159['fn'][_0x456a('0x21')](!0x0,void 0x0,_0x3834c3);_0x456a('0x8')===typeof _0x46dfa7&&_0x46dfa7(_0xc757b7);}var _0xc757b7=!0x1,_0x3eeb4b=_0x44e159(_0x561fc8)['attr'](_0x456a('0x115'));if(_0xdaa442[_0x456a('0x54')]){if(_0x456a('0x3')===typeof window[_0x456a('0x55')]['getOrderForm'][_0x456a('0x3d')][_0x3eeb4b])return _0x421b81(_0x456a('0x12b')+_0x3eeb4b+']'),_0xc757b7;window['_QuatroDigital_DropDown']['getOrderForm'][_0x456a('0x3d')][_0x3eeb4b][_0x456a('0x127')]=_0x3eeb4b;_0x399161[_0x456a('0x12c')]([window[_0x456a('0x55')][_0x456a('0x23')][_0x456a('0x3d')][_0x3eeb4b]],[_0x456a('0x3d'),'totalizers',_0x456a('0xef')])['done'](function(_0x292561){_0xc757b7=!0x0;window[_0x456a('0x55')][_0x456a('0x23')]=_0x292561;_0x39cc06(_0x292561);_0x49c88e(!0x0);})['fail'](function(_0x3fb285){_0x421b81([_0x456a('0x12d'),_0x3fb285]);_0x49c88e();});}else alert(_0x456a('0x12e'));};_0x1164af[_0x456a('0x109')]=function(_0x34de96,_0x314a20,_0x4b532b,_0x2cef3d){_0x2cef3d=_0x2cef3d||_0x44e159(_0x456a('0x12f'));_0x34de96=_0x34de96||'+';_0x314a20=_0x314a20||0.9*_0x2cef3d[_0x456a('0x130')]();_0x2cef3d[_0x456a('0x11f')](!0x0,!0x0)[_0x456a('0x131')]({'scrollTop':isNaN(_0x4b532b)?_0x34de96+'='+_0x314a20+'px':_0x4b532b});};_0xdaa442['updateOnlyHover']||(_0x1164af[_0x456a('0x89')](),_0x44e159['fn'][_0x456a('0x21')](!0x0));_0x44e159(window)['on'](_0x456a('0x132'),function(){try{window['_QuatroDigital_DropDown'][_0x456a('0x23')]=void 0x0,_0x1164af[_0x456a('0x89')]();}catch(_0x1f3224){_0x421b81(_0x456a('0x133')+_0x1f3224['message'],'avisso');}});_0x456a('0x8')===typeof _0xdaa442['callback']?_0xdaa442[_0x456a('0x3f')][_0x456a('0x24')](this):_0x421b81(_0x456a('0xa6'));};_0x44e159['fn'][_0x456a('0xb3')]=function(_0x1e30cb){var _0x45cb85=_0x44e159(this);_0x45cb85['fn']=new _0x44e159['QD_dropDownCart'](this,_0x1e30cb);return _0x45cb85;};}catch(_0xeb639c){_0x456a('0x3')!==typeof console&&'function'===typeof console[_0x456a('0x13')]&&console[_0x456a('0x13')]('Oooops!\x20',_0xeb639c);}}(this));(function(_0xf4f8f6){try{var _0x1dba34=jQuery;window[_0x456a('0xec')]=window['_QuatroDigital_AmountProduct']||{};window[_0x456a('0xec')]['items']={};window[_0x456a('0xec')]['allowRecalculate']=!0x1;window[_0x456a('0xec')][_0x456a('0x134')]=!0x1;window[_0x456a('0xec')]['quickViewUpdate']=!0x1;var _0x5aa31f=function(){if(window[_0x456a('0xec')][_0x456a('0x135')]){var _0x3c463f=!0x1;var _0xf4f8f6={};window['_QuatroDigital_AmountProduct'][_0x456a('0x3d')]={};for(_0x4f5a90 in window[_0x456a('0x55')]['getOrderForm']['items'])if(_0x456a('0x15')===typeof window[_0x456a('0x55')][_0x456a('0x23')]['items'][_0x4f5a90]){var _0x4d231d=window['_QuatroDigital_DropDown'][_0x456a('0x23')][_0x456a('0x3d')][_0x4f5a90];'undefined'!==typeof _0x4d231d[_0x456a('0x136')]&&null!==_0x4d231d[_0x456a('0x136')]&&''!==_0x4d231d[_0x456a('0x136')]&&(window[_0x456a('0xec')][_0x456a('0x3d')][_0x456a('0x137')+_0x4d231d[_0x456a('0x136')]]=window[_0x456a('0xec')][_0x456a('0x3d')][_0x456a('0x137')+_0x4d231d[_0x456a('0x136')]]||{},window[_0x456a('0xec')][_0x456a('0x3d')]['prod_'+_0x4d231d[_0x456a('0x136')]]['prodId']=_0x4d231d[_0x456a('0x136')],_0xf4f8f6[_0x456a('0x137')+_0x4d231d[_0x456a('0x136')]]||(window['_QuatroDigital_AmountProduct'][_0x456a('0x3d')][_0x456a('0x137')+_0x4d231d[_0x456a('0x136')]][_0x456a('0x3c')]=0x0),window['_QuatroDigital_AmountProduct']['items'][_0x456a('0x137')+_0x4d231d[_0x456a('0x136')]][_0x456a('0x3c')]+=_0x4d231d['quantity'],_0x3c463f=!0x0,_0xf4f8f6['prod_'+_0x4d231d[_0x456a('0x136')]]=!0x0);}var _0x4f5a90=_0x3c463f;}else _0x4f5a90=void 0x0;window[_0x456a('0xec')][_0x456a('0x135')]&&(_0x1dba34(_0x456a('0x138'))[_0x456a('0x120')](),_0x1dba34('.qd-bap-item-added')[_0x456a('0x45')](_0x456a('0x139')));for(var _0x52d291 in window[_0x456a('0xec')][_0x456a('0x3d')]){_0x4d231d=window[_0x456a('0xec')]['items'][_0x52d291];if(_0x456a('0x15')!==typeof _0x4d231d)return;_0xf4f8f6=_0x1dba34(_0x456a('0x13a')+_0x4d231d[_0x456a('0x13b')]+']')[_0x456a('0x0')]('li');if(window['_QuatroDigital_AmountProduct'][_0x456a('0x135')]||!_0xf4f8f6[_0x456a('0x4e')](_0x456a('0x138'))['length'])_0x3c463f=_0x1dba34('<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>'),_0x3c463f[_0x456a('0x4e')](_0x456a('0x13c'))['html'](_0x4d231d[_0x456a('0x3c')]),_0x4d231d=_0xf4f8f6[_0x456a('0x4e')]('.qd_bap_wrapper_content'),_0x4d231d[_0x456a('0x6')]?_0x4d231d[_0x456a('0x13d')](_0x3c463f)[_0x456a('0x43')](_0x456a('0x139')):_0xf4f8f6[_0x456a('0x13d')](_0x3c463f);}_0x4f5a90&&(window['_QuatroDigital_AmountProduct']['allowRecalculate']=!0x1);};window[_0x456a('0xec')]['exec']=function(){window[_0x456a('0xec')]['allowRecalculate']=!0x0;_0x5aa31f['call'](this);};_0x1dba34(document)[_0x456a('0xaf')](function(){_0x5aa31f[_0x456a('0x24')](this);});}catch(_0x22e3cc){'undefined'!==typeof console&&_0x456a('0x8')===typeof console[_0x456a('0x13')]&&console['error'](_0x456a('0x62'),_0x22e3cc);}}(this));(function(){try{var _0x55daa0=jQuery,_0x40b535,_0x26b70d={'selector':_0x456a('0x13e'),'dropDown':{},'buyButton':{}};_0x55daa0[_0x456a('0x13f')]=function(_0x297318){var _0x209ddb={};_0x40b535=_0x55daa0[_0x456a('0x14')](!0x0,{},_0x26b70d,_0x297318);_0x297318=_0x55daa0(_0x40b535[_0x456a('0x82')])[_0x456a('0xb3')](_0x40b535[_0x456a('0x140')]);_0x209ddb[_0x456a('0x78')]=_0x456a('0x3')!==typeof _0x40b535[_0x456a('0x140')][_0x456a('0xd3')]&&!0x1===_0x40b535[_0x456a('0x140')][_0x456a('0xd3')]?_0x55daa0(_0x40b535['selector'])['QD_buyButton'](_0x297318['fn'],_0x40b535[_0x456a('0x78')]):_0x55daa0(_0x40b535[_0x456a('0x82')])['QD_buyButton'](_0x40b535['buyButton']);_0x209ddb[_0x456a('0x140')]=_0x297318;return _0x209ddb;};_0x55daa0['fn'][_0x456a('0x141')]=function(){'object'===typeof console&&_0x456a('0x8')===typeof console['info']&&console[_0x456a('0x29')](_0x456a('0x142'));};_0x55daa0[_0x456a('0x141')]=_0x55daa0['fn'][_0x456a('0x141')];}catch(_0x36b152){_0x456a('0x3')!==typeof console&&'function'===typeof console['error']&&console[_0x456a('0x13')](_0x456a('0x62'),_0x36b152);}}());