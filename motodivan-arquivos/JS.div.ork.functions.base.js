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
			Common.openModalVideoInstitutional();
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
		openModalVideoInstitutional: function() {
			var videoRegex = /(youtu\.be\/|\?v=)([^&]+)/i;

			$('.box-banner a').filter('[href*="youtube.com/"], [href*="youtu.be/"]').click(function(e) {
				e.preventDefault();
				var modal = $('.qd-v1-modal').clone().appendTo(document.body).addClass('hotsite-information-qd-v1-modal');
				var $t = $(this);
				var videoId = ($t.attr('href').match(videoRegex) || ['']).pop();

				modal.find('.modal-header').append('<h2 class="modal-title">' + $t.find('img').attr('alt') + '</h2>');
				$('<iframe src="' + 'https://www.youtube.com/embed/' + videoId + '?wmode=transparent&rel=0" frameborder="0"></iframe>').appendTo(modal.find('.modal-body'));
				modal.modal();
				
				modal.on('hidden.bs.modal', function() {
					modal.remove();
				});
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

			var slides = 4;
			if (wrapper.parent().hasClass('side-carousel-qd-v1-shelf'))
				slides = 3				

			wrapper.slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: slides,
				slidesToScroll: slides,
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
			Home.selectSmartResearch2();
			Home.homeSpecialLinksToggle();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		homeSpecialLinksToggle:function() {	
			if(!$(document.body).is('.home'))
				return

			var wrapper = $('.home-qd-v1-special-links');
			wrapper.QD_amazingMenu();
			wrapper.find('.qd-am-column >ul').show().hide(); // o js precisa calcular a altura do elemento para exibir depois

			var linksWithDropdown = wrapper.find('.qd-am-column.qd-am-has-ul');		

			linksWithDropdown.find('>a, >p').click(function(e) {
				$(this).toggleClass('qd-am-open').find('+ul').slideToggle().toggleClass('qd-am-open');
				e.preventDefault();
			});
		},
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
			$('.slider-qd-v1-full, .hotsite-qd-v1-banner-slider').slick({
				dots: true,
				fade: true,
				cssEase: 'linear',
				infinite: true,
				speed: 500,
				draggable: false
			});
		},
		selectSmartResearch2: function() {
			var htmlClassRegex = /[^a-z0-9]/ig;
			var values = [];
	
			$(".departmentNavigator").find("h3 a").each(function() {
				var $t = $(this);
				values.push([$t.text().trim(), $t.attr("href") || ""])
			});
	
			$(".qd-search-filters").QD_SelectSmartResearch2({
				options: [values, "lid=5d3daea3-3b62-48fb-abf3-9db9e398e19c", "lid=5d3daea3-3b62-48fb-abf3-9db9e398e19c"],
				optionsPlaceHolder: ["Departamentos", "Categorias", "Tamanho"],
				getAjaxOptions: function(requestData, $select) {
					var values = [];
					if($select.is('#qd-ssr2-select-10'))
						var elems = $(requestData).find('h4 a');
					else
						var elems = $(requestData).find(".search-single-navigator ul." + $select.attr("data-qdssr-title")).find("a");
					
					elems.each(function() {
						var $t = $(this);
						values.push([$t.text().trim(), $t.attr("href") || ""]);
					});
					return values;
				},
				optionIsChecked: function(optionPlaceHolder) {
					if (typeof optionPlaceHolder === "undefined")
						return null;
	
					var value = optionPlaceHolder === "Departamentos" ? $(".search-single-navigator h3:first").text().trim(): $("h5." + optionPlaceHolder.replace(htmlClassRegex, "-") + " +ul .filtro-ativo:first").text().trim();
					return value.length ? value : null;
				}
			});
		},

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
					'scrollTop': $('.product-qd-v1-description').offset().top -100
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
var _0xd547=['last','qd-am-last','QD_amazingMenu','bgbqvina%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','.qd_am_code','.qd-am-banner','.qd-am-collection','length','parent','qd-am-banner-wrapper','qdAjax','find','img[alt=\x27','attr','data-qdam-value','getParent','.box-banner','insertBefore','hide','each','trim','[class*=\x27colunas\x27]','clone','qd-am-content-loaded','\x27\x20falho.','ajaxCallback','call','trigger','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','children',':not(ul)','qd-am-elem-','replaceSpecialChars','>li','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','qd-am-','callback','QuatroDigital.am.callback','exec','.qd_amazing_menu_auto','closest','object','undefined','warn','[QD\x20Amazing\x20Menu]\x0a','toLowerCase','aviso','info','apply','join','qdAmAddNdx','addClass','first'];(function(_0x108156,_0x52f922){var _0x48c6a1=function(_0x4ee37b){while(--_0x4ee37b){_0x108156['push'](_0x108156['shift']());}};_0x48c6a1(++_0x52f922);}(_0xd547,0x1c1));var _0x7d54=function(_0x137d80,_0x4ca815){_0x137d80=_0x137d80-0x0;var _0x406c15=_0xd547[_0x137d80];return _0x406c15;};(function(_0x4cec68){_0x4cec68['fn']['getParent']=_0x4cec68['fn'][_0x7d54('0x0')];}(jQuery));(function(_0xf874fe){var _0x15a0c7;var _0x1611f6=jQuery;if('function'!==typeof _0x1611f6['fn']['QD_amazingMenu']){var _0x21c23f={'url':'/qd-amazing-menu','callback':function(){},'ajaxCallback':function(){}};var _0x22ea09=function(_0x5b0a2c,_0x296dd6){if(_0x7d54('0x1')===typeof console&&_0x7d54('0x2')!==typeof console['error']&&'undefined'!==typeof console['info']&&_0x7d54('0x2')!==typeof console[_0x7d54('0x3')]){var _0x491ddf;_0x7d54('0x1')===typeof _0x5b0a2c?(_0x5b0a2c['unshift'](_0x7d54('0x4')),_0x491ddf=_0x5b0a2c):_0x491ddf=['[QD\x20Amazing\x20Menu]\x0a'+_0x5b0a2c];if(_0x7d54('0x2')===typeof _0x296dd6||'alerta'!==_0x296dd6[_0x7d54('0x5')]()&&_0x7d54('0x6')!==_0x296dd6['toLowerCase']())if('undefined'!==typeof _0x296dd6&&'info'===_0x296dd6[_0x7d54('0x5')]())try{console[_0x7d54('0x7')][_0x7d54('0x8')](console,_0x491ddf);}catch(_0x4be6c5){try{console[_0x7d54('0x7')](_0x491ddf['join']('\x0a'));}catch(_0x35d0ab){}}else try{console['error'][_0x7d54('0x8')](console,_0x491ddf);}catch(_0x43718a){try{console['error'](_0x491ddf[_0x7d54('0x9')]('\x0a'));}catch(_0x208b3c){}}else try{console[_0x7d54('0x3')]['apply'](console,_0x491ddf);}catch(_0x2b1b0f){try{console[_0x7d54('0x3')](_0x491ddf[_0x7d54('0x9')]('\x0a'));}catch(_0x12c48d){}}}};_0x1611f6['fn'][_0x7d54('0xa')]=function(){var _0x22f27c=_0x1611f6(this);_0x22f27c['each'](function(_0x81971b){_0x1611f6(this)[_0x7d54('0xb')]('qd-am-li-'+_0x81971b);});_0x22f27c[_0x7d54('0xc')]()['addClass']('qd-am-first');_0x22f27c[_0x7d54('0xd')]()[_0x7d54('0xb')](_0x7d54('0xe'));return _0x22f27c;};_0x1611f6['fn'][_0x7d54('0xf')]=function(){};_0xf874fe=function(_0x54e783){var _0x23ea55={'z':_0x7d54('0x10')};return function(_0x550424){var _0x22718f=function(_0x3763aa){return _0x3763aa;};var _0x35a17b=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x550424=_0x550424['d'+_0x35a17b[0x10]+'c'+_0x35a17b[0x11]+'m'+_0x22718f(_0x35a17b[0x1])+'n'+_0x35a17b[0xd]]['l'+_0x35a17b[0x12]+'c'+_0x35a17b[0x0]+'ti'+_0x22718f('o')+'n'];var _0x6cc88b=function(_0x715a4e){return escape(encodeURIComponent(_0x715a4e[_0x7d54('0x11')](/\./g,'¨')[_0x7d54('0x11')](/[a-zA-Z]/g,function(_0x4f3a94){return String['fromCharCode'](('Z'>=_0x4f3a94?0x5a:0x7a)>=(_0x4f3a94=_0x4f3a94['charCodeAt'](0x0)+0xd)?_0x4f3a94:_0x4f3a94-0x1a);})));};var _0x2967b0=_0x6cc88b(_0x550424[[_0x35a17b[0x9],_0x22718f('o'),_0x35a17b[0xc],_0x35a17b[_0x22718f(0xd)]][_0x7d54('0x9')]('')]);_0x6cc88b=_0x6cc88b((window[['js',_0x22718f('no'),'m',_0x35a17b[0x1],_0x35a17b[0x4]['toUpperCase'](),_0x7d54('0x12')][_0x7d54('0x9')]('')]||_0x7d54('0x13'))+['.v',_0x35a17b[0xd],'e',_0x22718f('x'),'co',_0x22718f('mm'),_0x7d54('0x14'),_0x35a17b[0x1],'.c',_0x22718f('o'),'m.',_0x35a17b[0x13],'r'][_0x7d54('0x9')](''));for(var _0x6d0375 in _0x23ea55){if(_0x6cc88b===_0x6d0375+_0x23ea55[_0x6d0375]||_0x2967b0===_0x6d0375+_0x23ea55[_0x6d0375]){var _0x3614aa='tr'+_0x35a17b[0x11]+'e';break;}_0x3614aa='f'+_0x35a17b[0x0]+'ls'+_0x22718f(_0x35a17b[0x1])+'';}_0x22718f=!0x1;-0x1<_0x550424[[_0x35a17b[0xc],'e',_0x35a17b[0x0],'rc',_0x35a17b[0x9]][_0x7d54('0x9')]('')]['indexOf'](_0x7d54('0x15'))&&(_0x22718f=!0x0);return[_0x3614aa,_0x22718f];}(_0x54e783);}(window);if(!eval(_0xf874fe[0x0]))return _0xf874fe[0x1]?_0x22ea09(_0x7d54('0x16')):!0x1;var _0x5117a4=function(_0x53a64c){var _0x5c96de=_0x53a64c['find'](_0x7d54('0x17'));var _0xa4c745=_0x5c96de['filter'](_0x7d54('0x18'));var _0x252017=_0x5c96de['filter'](_0x7d54('0x19'));if(_0xa4c745[_0x7d54('0x1a')]||_0x252017[_0x7d54('0x1a')])_0xa4c745[_0x7d54('0x1b')]()[_0x7d54('0xb')](_0x7d54('0x1c')),_0x252017[_0x7d54('0x1b')]()[_0x7d54('0xb')]('qd-am-collection-wrapper'),_0x1611f6[_0x7d54('0x1d')]({'url':_0x15a0c7['url'],'dataType':'html','success':function(_0x2602c2){var _0x2d31ff=_0x1611f6(_0x2602c2);_0xa4c745['each'](function(){var _0x2602c2=_0x1611f6(this);var _0x4489ee=_0x2d31ff[_0x7d54('0x1e')](_0x7d54('0x1f')+_0x2602c2[_0x7d54('0x20')](_0x7d54('0x21'))+'\x27]');_0x4489ee[_0x7d54('0x1a')]&&(_0x4489ee['each'](function(){_0x1611f6(this)[_0x7d54('0x22')](_0x7d54('0x23'))['clone']()[_0x7d54('0x24')](_0x2602c2);}),_0x2602c2[_0x7d54('0x25')]());})[_0x7d54('0xb')]('qd-am-content-loaded');_0x252017[_0x7d54('0x26')](function(){var _0x2602c2={};var _0x266d0d=_0x1611f6(this);_0x2d31ff[_0x7d54('0x1e')]('h2')[_0x7d54('0x26')](function(){if(_0x1611f6(this)['text']()[_0x7d54('0x27')]()[_0x7d54('0x5')]()==_0x266d0d['attr'](_0x7d54('0x21'))[_0x7d54('0x27')]()[_0x7d54('0x5')]())return _0x2602c2=_0x1611f6(this),!0x1;});_0x2602c2[_0x7d54('0x1a')]&&(_0x2602c2[_0x7d54('0x26')](function(){_0x1611f6(this)[_0x7d54('0x22')](_0x7d54('0x28'))[_0x7d54('0x29')]()[_0x7d54('0x24')](_0x266d0d);}),_0x266d0d[_0x7d54('0x25')]());})[_0x7d54('0xb')](_0x7d54('0x2a'));},'error':function(){_0x22ea09('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27'+_0x15a0c7['url']+_0x7d54('0x2b'));},'complete':function(){_0x15a0c7[_0x7d54('0x2c')][_0x7d54('0x2d')](this);_0x1611f6(window)[_0x7d54('0x2e')]('QuatroDigital.am.ajaxCallback',_0x53a64c);},'clearQueueDelay':0xbb8});};_0x1611f6['QD_amazingMenu']=function(_0x114531){var _0x4be0fe=_0x114531[_0x7d54('0x1e')](_0x7d54('0x2f'))['each'](function(){var _0x5c4b93=_0x1611f6(this);if(!_0x5c4b93[_0x7d54('0x1a')])return _0x22ea09([_0x7d54('0x30'),_0x114531],'alerta');_0x5c4b93[_0x7d54('0x1e')](_0x7d54('0x31'))['parent']()['addClass'](_0x7d54('0x32'));_0x5c4b93[_0x7d54('0x1e')]('li')[_0x7d54('0x26')](function(){var _0x113c48=_0x1611f6(this);var _0x36a4a1=_0x113c48[_0x7d54('0x33')](_0x7d54('0x34'));_0x36a4a1[_0x7d54('0x1a')]&&_0x113c48[_0x7d54('0xb')](_0x7d54('0x35')+_0x36a4a1[_0x7d54('0xc')]()['text']()['trim']()[_0x7d54('0x36')]()[_0x7d54('0x11')](/\./g,'')[_0x7d54('0x11')](/\s/g,'-')[_0x7d54('0x5')]());});var _0x1d1cf0=_0x5c4b93[_0x7d54('0x1e')](_0x7d54('0x37'))['qdAmAddNdx']();_0x5c4b93[_0x7d54('0xb')]('qd-amazing-menu');_0x1d1cf0=_0x1d1cf0['find'](_0x7d54('0x38'));_0x1d1cf0[_0x7d54('0x26')](function(){var _0x336156=_0x1611f6(this);_0x336156[_0x7d54('0x1e')](_0x7d54('0x37'))['qdAmAddNdx']()[_0x7d54('0xb')](_0x7d54('0x39'));_0x336156['addClass'](_0x7d54('0x3a'));_0x336156[_0x7d54('0x1b')]()[_0x7d54('0xb')](_0x7d54('0x3b'));});_0x1d1cf0[_0x7d54('0xb')](_0x7d54('0x3b'));var _0x5a2fcb=0x0,_0xf874fe=function(_0x403f9d){_0x5a2fcb+=0x1;_0x403f9d=_0x403f9d[_0x7d54('0x33')]('li')[_0x7d54('0x33')]('*');_0x403f9d[_0x7d54('0x1a')]&&(_0x403f9d[_0x7d54('0xb')](_0x7d54('0x3c')+_0x5a2fcb),_0xf874fe(_0x403f9d));};_0xf874fe(_0x5c4b93);_0x5c4b93['add'](_0x5c4b93[_0x7d54('0x1e')]('ul'))[_0x7d54('0x26')](function(){var _0x2cf5f0=_0x1611f6(this);_0x2cf5f0[_0x7d54('0xb')](_0x7d54('0x3d')+_0x2cf5f0['children']('li')[_0x7d54('0x1a')]+'-li');});});_0x5117a4(_0x4be0fe);_0x15a0c7[_0x7d54('0x3e')]['call'](this);_0x1611f6(window)['trigger'](_0x7d54('0x3f'),_0x114531);};_0x1611f6['fn']['QD_amazingMenu']=function(_0x5aee25){var _0x418ace=_0x1611f6(this);if(!_0x418ace[_0x7d54('0x1a')])return _0x418ace;_0x15a0c7=_0x1611f6['extend']({},_0x21c23f,_0x5aee25);_0x418ace[_0x7d54('0x40')]=new _0x1611f6[(_0x7d54('0xf'))](_0x1611f6(this));return _0x418ace;};_0x1611f6(function(){_0x1611f6(_0x7d54('0x41'))['QD_amazingMenu']();});}}(this));

/*  Automatizador de comments box do Facebook Carlos Vinicius [Quatro Digital] */
/* Automatizador de comments box do Facebook // 1.6 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a=$(".fb-comments");a.length&&a.attr("data-href",document.location.href.split("#").shift().split("?").shift());$("#fb-root").length||$("body").append('<div id="fb-root"></div>');if(!$("script#facebook-jssdk").length){a=$("meta[property='fb:app_id']").attr("content")||!1;var b,c=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||(b=document.createElement("script"),b.id="facebook-jssdk",b.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+
(a?"&appId="+a:""),c.parentNode.insertBefore(b,c))}"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse()});

/* Quatro Digital Smart Cart */
var _0x98d3=['//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','find','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','body','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','keyCode','removeClass','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','scrollCart','click.qd_ddc_scrollDown','val','keyup.qd_ddc_cep','shippingCalculate','updateOnlyHover','cartIsEmpty','mouseleave.qd_ddc_hover','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','.qd-ddc-viewCart','html','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','shippingForm','emptyCart','each','call','clone','.qd-ddc-infoTotalValue','total','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','shipping','allTotal','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','exec','_QuatroDigital_AmountProduct','getOrderForm','QD_checkoutQueue','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','qd-ddc-noItems','addClass','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','attr','qd-ddc-','.qd-ddc-prodName','append','.qd-ddc-prodPrice','sellingPrice','.qd-ddc-quantity','quantity','.qd-ddc-remove','insertProdImg','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','shippingData','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','message','actionButtons','lastSku','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','load','qd-loaded','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','changeQantity','data-sku-index','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','preventDefault','qd-loading','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','.qd-ddc-prodRow','click.qd_ddc_remove','removeProduct','slideUp','data','qdDdcLastPostalCode','calculateShipping','BRA','done','getCartInfoByUrl','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','simpleCart','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','totalizers','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','stop','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','quickViewUpdate','allowRecalculate','productId','prod_','prodId','.qd-bap-wrapper','remove','qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd_bap_wrapper_content','prepend','.qdDdcContainer','extend','selector','dropDown','QD_buyButton','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','smartCart','getParent','replace','abs','pow','round','toFixed','split','length','join','_QuatroDigital_CartData','callback','Callbacks','undefined','function','error','Oooops!\x20','object','unshift','alerta','toLowerCase','aviso','info','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','bgbqvina%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','name','smartCheckout','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax'];(function(_0xbb091,_0x3fe7ee){var _0x467a04=function(_0x3a978d){while(--_0x3a978d){_0xbb091['push'](_0xbb091['shift']());}};_0x467a04(++_0x3fe7ee);}(_0x98d3,0x173));var _0x398d=function(_0x5ae8c0,_0x50ccd0){_0x5ae8c0=_0x5ae8c0-0x0;var _0x48716e=_0x98d3[_0x5ae8c0];return _0x48716e;};(function(_0x1daaa3){_0x1daaa3['fn'][_0x398d('0x0')]=_0x1daaa3['fn']['closest'];}(jQuery));function qd_number_format(_0x35bbe1,_0x4f5ff0,_0x18da44,_0x48fcf0){_0x35bbe1=(_0x35bbe1+'')[_0x398d('0x1')](/[^0-9+\-Ee.]/g,'');_0x35bbe1=isFinite(+_0x35bbe1)?+_0x35bbe1:0x0;_0x4f5ff0=isFinite(+_0x4f5ff0)?Math[_0x398d('0x2')](_0x4f5ff0):0x0;_0x48fcf0='undefined'===typeof _0x48fcf0?',':_0x48fcf0;_0x18da44='undefined'===typeof _0x18da44?'.':_0x18da44;var _0x2c3c4c='',_0x2c3c4c=function(_0x502652,_0x4ba1a3){var _0x4f5ff0=Math[_0x398d('0x3')](0xa,_0x4ba1a3);return''+(Math[_0x398d('0x4')](_0x502652*_0x4f5ff0)/_0x4f5ff0)[_0x398d('0x5')](_0x4ba1a3);},_0x2c3c4c=(_0x4f5ff0?_0x2c3c4c(_0x35bbe1,_0x4f5ff0):''+Math['round'](_0x35bbe1))[_0x398d('0x6')]('.');0x3<_0x2c3c4c[0x0][_0x398d('0x7')]&&(_0x2c3c4c[0x0]=_0x2c3c4c[0x0][_0x398d('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x48fcf0));(_0x2c3c4c[0x1]||'')[_0x398d('0x7')]<_0x4f5ff0&&(_0x2c3c4c[0x1]=_0x2c3c4c[0x1]||'',_0x2c3c4c[0x1]+=Array(_0x4f5ff0-_0x2c3c4c[0x1][_0x398d('0x7')]+0x1)[_0x398d('0x8')]('0'));return _0x2c3c4c[_0x398d('0x8')](_0x18da44);};(function(){try{window[_0x398d('0x9')]=window['_QuatroDigital_CartData']||{},window[_0x398d('0x9')][_0x398d('0xa')]=window[_0x398d('0x9')][_0x398d('0xa')]||$[_0x398d('0xb')]();}catch(_0x91619e){_0x398d('0xc')!==typeof console&&_0x398d('0xd')===typeof console[_0x398d('0xe')]&&console[_0x398d('0xe')](_0x398d('0xf'),_0x91619e['message']);}}());(function(_0x50a3f9){try{var _0x3d424f=jQuery,_0x36cde2=function(_0x347508,_0x2197b4){if(_0x398d('0x10')===typeof console&&_0x398d('0xc')!==typeof console[_0x398d('0xe')]&&_0x398d('0xc')!==typeof console['info']&&_0x398d('0xc')!==typeof console['warn']){var _0x673840;_0x398d('0x10')===typeof _0x347508?(_0x347508[_0x398d('0x11')]('[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'),_0x673840=_0x347508):_0x673840=['[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'+_0x347508];if('undefined'===typeof _0x2197b4||_0x398d('0x12')!==_0x2197b4[_0x398d('0x13')]()&&_0x398d('0x14')!==_0x2197b4[_0x398d('0x13')]())if(_0x398d('0xc')!==typeof _0x2197b4&&_0x398d('0x15')===_0x2197b4[_0x398d('0x13')]())try{console['info']['apply'](console,_0x673840);}catch(_0x5e667d){try{console[_0x398d('0x15')](_0x673840[_0x398d('0x8')]('\x0a'));}catch(_0x1ea5f9){}}else try{console[_0x398d('0xe')][_0x398d('0x16')](console,_0x673840);}catch(_0x557df7){try{console['error'](_0x673840[_0x398d('0x8')]('\x0a'));}catch(_0x497ad1){}}else try{console['warn'][_0x398d('0x16')](console,_0x673840);}catch(_0x38d8da){try{console['warn'](_0x673840['join']('\x0a'));}catch(_0x4aad76){}}}};window[_0x398d('0x17')]=window[_0x398d('0x17')]||{};window[_0x398d('0x17')][_0x398d('0x18')]=!0x0;_0x3d424f[_0x398d('0x19')]=function(){};_0x3d424f['fn'][_0x398d('0x19')]=function(){return{'fn':new _0x3d424f()};};var _0xc9c9b7=function(_0x17318c){var _0x4f4466={'z':_0x398d('0x1a')};return function(_0x557dce){var _0x4aa568=function(_0x124bc9){return _0x124bc9;};var _0x27bc6e=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x557dce=_0x557dce['d'+_0x27bc6e[0x10]+'c'+_0x27bc6e[0x11]+'m'+_0x4aa568(_0x27bc6e[0x1])+'n'+_0x27bc6e[0xd]]['l'+_0x27bc6e[0x12]+'c'+_0x27bc6e[0x0]+'ti'+_0x4aa568('o')+'n'];var _0x585fe0=function(_0x373326){return escape(encodeURIComponent(_0x373326['replace'](/\./g,'¨')[_0x398d('0x1')](/[a-zA-Z]/g,function(_0x8abf30){return String['fromCharCode'](('Z'>=_0x8abf30?0x5a:0x7a)>=(_0x8abf30=_0x8abf30['charCodeAt'](0x0)+0xd)?_0x8abf30:_0x8abf30-0x1a);})));};var _0x410db2=_0x585fe0(_0x557dce[[_0x27bc6e[0x9],_0x4aa568('o'),_0x27bc6e[0xc],_0x27bc6e[_0x4aa568(0xd)]][_0x398d('0x8')]('')]);_0x585fe0=_0x585fe0((window[['js',_0x4aa568('no'),'m',_0x27bc6e[0x1],_0x27bc6e[0x4]['toUpperCase'](),_0x398d('0x1b')][_0x398d('0x8')]('')]||_0x398d('0x1c'))+['.v',_0x27bc6e[0xd],'e',_0x4aa568('x'),'co',_0x4aa568('mm'),_0x398d('0x1d'),_0x27bc6e[0x1],'.c',_0x4aa568('o'),'m.',_0x27bc6e[0x13],'r'][_0x398d('0x8')](''));for(var _0x3bcc5e in _0x4f4466){if(_0x585fe0===_0x3bcc5e+_0x4f4466[_0x3bcc5e]||_0x410db2===_0x3bcc5e+_0x4f4466[_0x3bcc5e]){var _0x490bee='tr'+_0x27bc6e[0x11]+'e';break;}_0x490bee='f'+_0x27bc6e[0x0]+'ls'+_0x4aa568(_0x27bc6e[0x1])+'';}_0x4aa568=!0x1;-0x1<_0x557dce[[_0x27bc6e[0xc],'e',_0x27bc6e[0x0],'rc',_0x27bc6e[0x9]]['join']('')][_0x398d('0x1e')](_0x398d('0x1f'))&&(_0x4aa568=!0x0);return[_0x490bee,_0x4aa568];}(_0x17318c);}(window);if(!eval(_0xc9c9b7[0x0]))return _0xc9c9b7[0x1]?_0x36cde2(_0x398d('0x20')):!0x1;_0x3d424f[_0x398d('0x19')]=function(_0xcc7d81,_0x27ed5b){var _0xd8dc6c=_0x3d424f(_0xcc7d81);if(!_0xd8dc6c[_0x398d('0x7')])return _0xd8dc6c;var _0x1827be=_0x3d424f['extend'](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x398d('0x21'),'linkCheckout':_0x398d('0x22'),'cartTotal':_0x398d('0x23'),'emptyCart':'Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','continueShopping':'Continuar\x20Comprando','shippingForm':_0x398d('0x24')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x3148c7){return _0x3148c7[_0x398d('0x25')]||_0x3148c7[_0x398d('0x26')];},'callback':function(){},'callbackProductsList':function(){}},_0x27ed5b);_0x3d424f('');var _0x20fe0d=this;if(_0x1827be[_0x398d('0x27')]){var _0x324d76=!0x1;_0x398d('0xc')===typeof window[_0x398d('0x28')]&&(_0x36cde2(_0x398d('0x29')),_0x3d424f[_0x398d('0x2a')]({'url':_0x398d('0x2b'),'async':!0x1,'dataType':_0x398d('0x2c'),'error':function(){_0x36cde2(_0x398d('0x2d'));_0x324d76=!0x0;}}));if(_0x324d76)return _0x36cde2(_0x398d('0x2e'));}if(_0x398d('0x10')===typeof window[_0x398d('0x28')]&&_0x398d('0xc')!==typeof window[_0x398d('0x28')]['checkout'])var _0x50a3f9=window[_0x398d('0x28')][_0x398d('0x2f')];else if(_0x398d('0x10')===typeof vtex&&_0x398d('0x10')===typeof vtex[_0x398d('0x2f')]&&_0x398d('0xc')!==typeof vtex['checkout'][_0x398d('0x30')])_0x50a3f9=new vtex[(_0x398d('0x2f'))][(_0x398d('0x30'))]();else return _0x36cde2(_0x398d('0x31'));_0x20fe0d[_0x398d('0x32')]=_0x398d('0x33');var _0x4d57cc=function(_0x3dddcf){_0x3d424f(this)['append'](_0x3dddcf);_0x3dddcf[_0x398d('0x34')](_0x398d('0x35'))[_0x398d('0x36')](_0x3d424f(_0x398d('0x37')))['on'](_0x398d('0x38'),function(){_0xd8dc6c['removeClass'](_0x398d('0x39'));_0x3d424f(document[_0x398d('0x3a')])['removeClass'](_0x398d('0x3b'));});_0x3d424f(document)[_0x398d('0x3c')](_0x398d('0x3d'))['on'](_0x398d('0x3d'),function(_0x217fc0){0x1b==_0x217fc0[_0x398d('0x3e')]&&(_0xd8dc6c[_0x398d('0x3f')](_0x398d('0x39')),_0x3d424f(document[_0x398d('0x3a')])['removeClass'](_0x398d('0x3b')));});var _0x28defa=_0x3dddcf[_0x398d('0x34')](_0x398d('0x40'));_0x3dddcf[_0x398d('0x34')](_0x398d('0x41'))['on']('click.qd_ddc_scrollUp',function(){_0x20fe0d[_0x398d('0x42')]('-',void 0x0,void 0x0,_0x28defa);return!0x1;});_0x3dddcf[_0x398d('0x34')]('.qd-ddc-scrollDown')['on'](_0x398d('0x43'),function(){_0x20fe0d[_0x398d('0x42')](void 0x0,void 0x0,void 0x0,_0x28defa);return!0x1;});_0x3dddcf[_0x398d('0x34')]('.qd-ddc-shipping\x20input')[_0x398d('0x44')]('')['on'](_0x398d('0x45'),function(){_0x20fe0d[_0x398d('0x46')](_0x3d424f(this));});if(_0x1827be[_0x398d('0x47')]){var _0x27ed5b=0x0;_0x3d424f(this)['on']('mouseenter.qd_ddc_hover',function(){var _0x3dddcf=function(){window[_0x398d('0x17')][_0x398d('0x18')]&&(_0x20fe0d['getCartInfoByUrl'](),window[_0x398d('0x17')][_0x398d('0x18')]=!0x1,_0x3d424f['fn']['simpleCart'](!0x0),_0x20fe0d[_0x398d('0x48')]());};_0x27ed5b=setInterval(function(){_0x3dddcf();},0x258);_0x3dddcf();});_0x3d424f(this)['on'](_0x398d('0x49'),function(){clearInterval(_0x27ed5b);});}};var _0x15eab8=function(_0x1f67a9){_0x1f67a9=_0x3d424f(_0x1f67a9);_0x1827be[_0x398d('0x4a')][_0x398d('0x4b')]=_0x1827be[_0x398d('0x4a')][_0x398d('0x4b')]['replace'](_0x398d('0x4c'),_0x398d('0x4d'));_0x1827be['texts']['cartTotal']=_0x1827be[_0x398d('0x4a')][_0x398d('0x4b')][_0x398d('0x1')](_0x398d('0x4e'),'<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>');_0x1827be[_0x398d('0x4a')]['cartTotal']=_0x1827be[_0x398d('0x4a')]['cartTotal'][_0x398d('0x1')]('#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>');_0x1827be['texts'][_0x398d('0x4b')]=_0x1827be[_0x398d('0x4a')][_0x398d('0x4b')][_0x398d('0x1')]('#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0x1f67a9[_0x398d('0x34')](_0x398d('0x4f'))[_0x398d('0x50')](_0x1827be['texts'][_0x398d('0x51')]);_0x1f67a9[_0x398d('0x34')](_0x398d('0x52'))[_0x398d('0x50')](_0x1827be[_0x398d('0x4a')][_0x398d('0x53')]);_0x1f67a9['find'](_0x398d('0x54'))[_0x398d('0x50')](_0x1827be[_0x398d('0x4a')][_0x398d('0x55')]);_0x1f67a9['find'](_0x398d('0x56'))[_0x398d('0x50')](_0x1827be[_0x398d('0x4a')][_0x398d('0x4b')]);_0x1f67a9['find']('.qd-ddc-shipping')[_0x398d('0x50')](_0x1827be['texts'][_0x398d('0x57')]);_0x1f67a9[_0x398d('0x34')]('.qd-ddc-emptyCart\x20p')[_0x398d('0x50')](_0x1827be['texts'][_0x398d('0x58')]);return _0x1f67a9;}(this[_0x398d('0x32')]);var _0x35a73c=0x0;_0xd8dc6c[_0x398d('0x59')](function(){0x0<_0x35a73c?_0x4d57cc[_0x398d('0x5a')](this,_0x15eab8[_0x398d('0x5b')]()):_0x4d57cc[_0x398d('0x5a')](this,_0x15eab8);_0x35a73c++;});window[_0x398d('0x9')][_0x398d('0xa')][_0x398d('0x36')](function(){_0x3d424f(_0x398d('0x5c'))[_0x398d('0x50')](window[_0x398d('0x9')][_0x398d('0x5d')]||'--');_0x3d424f(_0x398d('0x5e'))[_0x398d('0x50')](window[_0x398d('0x9')][_0x398d('0x5f')]||'0');_0x3d424f(_0x398d('0x60'))[_0x398d('0x50')](window[_0x398d('0x9')][_0x398d('0x61')]||'--');_0x3d424f('.qd-ddc-infoAllTotal')[_0x398d('0x50')](window[_0x398d('0x9')][_0x398d('0x62')]||'--');});var _0x10ca36=function(_0x1dda79,_0x37f8ee){if(_0x398d('0xc')===typeof _0x1dda79[_0x398d('0x63')])return _0x36cde2(_0x398d('0x64'));_0x20fe0d[_0x398d('0x65')][_0x398d('0x5a')](this,_0x37f8ee);};_0x20fe0d['getCartInfoByUrl']=function(_0x30c9d9,_0x207fd6){'undefined'!=typeof _0x207fd6?window[_0x398d('0x17')]['dataOptionsCache']=_0x207fd6:window['_QuatroDigital_DropDown']['dataOptionsCache']&&(_0x207fd6=window[_0x398d('0x17')][_0x398d('0x66')]);setTimeout(function(){window['_QuatroDigital_DropDown'][_0x398d('0x66')]=void 0x0;},_0x1827be[_0x398d('0x67')]);_0x3d424f(_0x398d('0x68'))['removeClass'](_0x398d('0x69'));if(_0x1827be[_0x398d('0x27')]){var _0x27ed5b=function(_0x5dcb9c){window[_0x398d('0x17')]['getOrderForm']=_0x5dcb9c;_0x10ca36(_0x5dcb9c,_0x207fd6);_0x398d('0xc')!==typeof window['_QuatroDigital_AmountProduct']&&_0x398d('0xd')===typeof window['_QuatroDigital_AmountProduct'][_0x398d('0x6a')]&&window[_0x398d('0x6b')][_0x398d('0x6a')][_0x398d('0x5a')](this);_0x3d424f(_0x398d('0x68'))['addClass'](_0x398d('0x69'));};_0x398d('0xc')!==typeof window[_0x398d('0x17')][_0x398d('0x6c')]?(_0x27ed5b(window[_0x398d('0x17')][_0x398d('0x6c')]),_0x398d('0xd')===typeof _0x30c9d9&&_0x30c9d9(window['_QuatroDigital_DropDown'][_0x398d('0x6c')])):_0x3d424f[_0x398d('0x6d')]([_0x398d('0x63'),'totalizers','shippingData'],{'done':function(_0x1e5e84){_0x27ed5b[_0x398d('0x5a')](this,_0x1e5e84);'function'===typeof _0x30c9d9&&_0x30c9d9(_0x1e5e84);},'fail':function(_0x5272b3){_0x36cde2([_0x398d('0x6e'),_0x5272b3]);}});}else alert('Este\x20método\x20esta\x20descontinuado!');};_0x20fe0d[_0x398d('0x48')]=function(){var _0x575f13=_0x3d424f(_0x398d('0x68'));_0x575f13['find']('.qd-ddc-prodRow')['length']?_0x575f13[_0x398d('0x3f')](_0x398d('0x6f')):_0x575f13[_0x398d('0x70')](_0x398d('0x6f'));};_0x20fe0d[_0x398d('0x65')]=function(_0x496796){var _0x27ed5b=_0x3d424f('.qd-ddc-prodWrapper2');_0x27ed5b['empty']();_0x27ed5b[_0x398d('0x59')](function(){var _0x27ed5b=_0x3d424f(this),_0x1c6e1e,_0xcc7d81,_0x6fc4e3=_0x3d424f(''),_0x324436;for(_0x324436 in window[_0x398d('0x17')][_0x398d('0x6c')]['items'])if('object'===typeof window[_0x398d('0x17')][_0x398d('0x6c')]['items'][_0x324436]){var _0x801207=window['_QuatroDigital_DropDown'][_0x398d('0x6c')][_0x398d('0x63')][_0x324436];var _0x17075f=_0x801207[_0x398d('0x71')]['replace'](/^\/|\/$/g,'')[_0x398d('0x6')]('/');var _0x9ccaec=_0x3d424f(_0x398d('0x72'));_0x9ccaec[_0x398d('0x73')]({'data-sku':_0x801207['id'],'data-sku-index':_0x324436,'data-qd-departament':_0x17075f[0x0],'data-qd-category':_0x17075f[_0x17075f[_0x398d('0x7')]-0x1]});_0x9ccaec['addClass'](_0x398d('0x74')+_0x801207['availability']);_0x9ccaec[_0x398d('0x34')](_0x398d('0x75'))[_0x398d('0x76')](_0x1827be['skuName'](_0x801207));_0x9ccaec[_0x398d('0x34')](_0x398d('0x77'))['append'](isNaN(_0x801207[_0x398d('0x78')])?_0x801207[_0x398d('0x78')]:0x0==_0x801207[_0x398d('0x78')]?'Grátis':(_0x3d424f('meta[name=currency]')['attr']('content')||'R$')+'\x20'+qd_number_format(_0x801207[_0x398d('0x78')]/0x64,0x2,',','.'));_0x9ccaec['find'](_0x398d('0x79'))[_0x398d('0x73')]({'data-sku':_0x801207['id'],'data-sku-index':_0x324436})[_0x398d('0x44')](_0x801207[_0x398d('0x7a')]);_0x9ccaec[_0x398d('0x34')](_0x398d('0x7b'))['attr']({'data-sku':_0x801207['id'],'data-sku-index':_0x324436});_0x20fe0d[_0x398d('0x7c')](_0x801207['id'],_0x9ccaec[_0x398d('0x34')]('.qd-ddc-image'),_0x801207[_0x398d('0x7d')]);_0x9ccaec[_0x398d('0x34')](_0x398d('0x7e'))[_0x398d('0x73')]({'data-sku':_0x801207['id'],'data-sku-index':_0x324436});_0x9ccaec[_0x398d('0x7f')](_0x27ed5b);_0x6fc4e3=_0x6fc4e3[_0x398d('0x36')](_0x9ccaec);}try{var _0x50a3f9=_0x27ed5b[_0x398d('0x0')](_0x398d('0x68'))[_0x398d('0x34')]('.qd-ddc-shipping\x20input');_0x50a3f9[_0x398d('0x7')]&&''==_0x50a3f9[_0x398d('0x44')]()&&window[_0x398d('0x17')]['getOrderForm'][_0x398d('0x80')][_0x398d('0x81')]&&_0x50a3f9[_0x398d('0x44')](window[_0x398d('0x17')][_0x398d('0x6c')][_0x398d('0x80')][_0x398d('0x81')][_0x398d('0x82')]);}catch(_0x5f0a88){_0x36cde2(_0x398d('0x83')+_0x5f0a88[_0x398d('0x84')],_0x398d('0x14'));}_0x20fe0d[_0x398d('0x85')](_0x27ed5b);_0x20fe0d[_0x398d('0x48')]();_0x496796&&_0x496796[_0x398d('0x86')]&&function(){_0xcc7d81=_0x6fc4e3['filter']('[data-sku=\x27'+_0x496796[_0x398d('0x86')]+'\x27]');_0xcc7d81[_0x398d('0x7')]&&(_0x1c6e1e=0x0,_0x6fc4e3[_0x398d('0x59')](function(){var _0x496796=_0x3d424f(this);if(_0x496796['is'](_0xcc7d81))return!0x1;_0x1c6e1e+=_0x496796['outerHeight']();}),_0x20fe0d['scrollCart'](void 0x0,void 0x0,_0x1c6e1e,_0x27ed5b[_0x398d('0x36')](_0x27ed5b[_0x398d('0x87')]())),_0x6fc4e3[_0x398d('0x3f')](_0x398d('0x88')),function(_0x36f3df){_0x36f3df['addClass']('qd-ddc-lastAdded');_0x36f3df['addClass'](_0x398d('0x88'));setTimeout(function(){_0x36f3df[_0x398d('0x3f')](_0x398d('0x89'));},_0x1827be[_0x398d('0x67')]);}(_0xcc7d81),_0x3d424f(document[_0x398d('0x3a')])[_0x398d('0x70')](_0x398d('0x8a')),setTimeout(function(){_0x3d424f(document[_0x398d('0x3a')])[_0x398d('0x3f')](_0x398d('0x8a'));},_0x1827be[_0x398d('0x67')]));}();});(function(){_QuatroDigital_DropDown[_0x398d('0x6c')][_0x398d('0x63')][_0x398d('0x7')]?(_0x3d424f(_0x398d('0x3a'))[_0x398d('0x3f')](_0x398d('0x8b'))[_0x398d('0x70')]('qd-ddc-cart-rendered\x20qd-ddc-product-add-time'),setTimeout(function(){_0x3d424f('body')[_0x398d('0x3f')](_0x398d('0x8c'));},_0x1827be[_0x398d('0x67')])):_0x3d424f('body')[_0x398d('0x3f')](_0x398d('0x8d'))[_0x398d('0x70')](_0x398d('0x8b'));}());_0x398d('0xd')===typeof _0x1827be[_0x398d('0x8e')]?_0x1827be[_0x398d('0x8e')][_0x398d('0x5a')](this):_0x36cde2('callbackProductsList\x20não\x20é\x20uma\x20função');};_0x20fe0d[_0x398d('0x7c')]=function(_0xad3fd1,_0x5caaf1,_0x236bb7){function _0xee0007(){_0x5caaf1['removeClass']('qd-loaded')[_0x398d('0x8f')](function(){_0x3d424f(this)[_0x398d('0x70')](_0x398d('0x90'));})[_0x398d('0x73')](_0x398d('0x91'),_0x236bb7);}_0x236bb7?_0xee0007():isNaN(_0xad3fd1)?_0x36cde2(_0x398d('0x92'),_0x398d('0x12')):alert(_0x398d('0x93'));};_0x20fe0d['actionButtons']=function(_0xf30237){var _0x27ed5b=function(_0x2ce9ef,_0x45de5d){var _0x3b2eb5=_0x3d424f(_0x2ce9ef);var _0x2002c3=_0x3b2eb5['attr'](_0x398d('0x94'));var _0xcc7d81=_0x3b2eb5[_0x398d('0x73')]('data-sku-index');if(_0x2002c3){var _0x3bac12=parseInt(_0x3b2eb5[_0x398d('0x44')]())||0x1;_0x20fe0d[_0x398d('0x95')]([_0x2002c3,_0xcc7d81],_0x3bac12,_0x3bac12+0x1,function(_0x2898ee){_0x3b2eb5[_0x398d('0x44')](_0x2898ee);'function'===typeof _0x45de5d&&_0x45de5d();});}};var _0x44a7fb=function(_0x52823c,_0x560fb0){var _0x8404ce=_0x3d424f(_0x52823c);var _0xcc7d81=_0x8404ce[_0x398d('0x73')](_0x398d('0x94'));var _0x204f40=_0x8404ce[_0x398d('0x73')](_0x398d('0x96'));if(_0xcc7d81){var _0x262b1d=parseInt(_0x8404ce[_0x398d('0x44')]())||0x2;_0x20fe0d[_0x398d('0x95')]([_0xcc7d81,_0x204f40],_0x262b1d,_0x262b1d-0x1,function(_0x3c7f00){_0x8404ce[_0x398d('0x44')](_0x3c7f00);_0x398d('0xd')===typeof _0x560fb0&&_0x560fb0();});}};var _0x22d25e=function(_0x1e4d75,_0x3d10bd){var _0x27ed5b=_0x3d424f(_0x1e4d75);var _0xcc7d81=_0x27ed5b[_0x398d('0x73')](_0x398d('0x94'));var _0x2063c3=_0x27ed5b[_0x398d('0x73')]('data-sku-index');if(_0xcc7d81){var _0x43162b=parseInt(_0x27ed5b['val']())||0x1;_0x20fe0d['changeQantity']([_0xcc7d81,_0x2063c3],0x1,_0x43162b,function(_0x4b305c){_0x27ed5b[_0x398d('0x44')](_0x4b305c);_0x398d('0xd')===typeof _0x3d10bd&&_0x3d10bd();});}};var _0xcc7d81=_0xf30237[_0x398d('0x34')](_0x398d('0x97'));_0xcc7d81[_0x398d('0x70')](_0x398d('0x98'))['each'](function(){var _0xf30237=_0x3d424f(this);_0xf30237[_0x398d('0x34')](_0x398d('0x99'))['on']('click.qd_ddc_more',function(_0xf1772d){_0xf1772d[_0x398d('0x9a')]();_0xcc7d81['addClass']('qd-loading');_0x27ed5b(_0xf30237['find'](_0x398d('0x79')),function(){_0xcc7d81['removeClass'](_0x398d('0x9b'));});});_0xf30237[_0x398d('0x34')]('.qd-ddc-quantityMinus')['on'](_0x398d('0x9c'),function(_0x16e130){_0x16e130[_0x398d('0x9a')]();_0xcc7d81['addClass'](_0x398d('0x9b'));_0x44a7fb(_0xf30237[_0x398d('0x34')]('.qd-ddc-quantity'),function(){_0xcc7d81[_0x398d('0x3f')](_0x398d('0x9b'));});});_0xf30237[_0x398d('0x34')]('.qd-ddc-quantity')['on'](_0x398d('0x9d'),function(){_0xcc7d81[_0x398d('0x70')]('qd-loading');_0x22d25e(this,function(){_0xcc7d81[_0x398d('0x3f')](_0x398d('0x9b'));});});_0xf30237[_0x398d('0x34')](_0x398d('0x79'))['on'](_0x398d('0x9e'),function(_0x212a0e){0xd==_0x212a0e[_0x398d('0x3e')]&&(_0xcc7d81[_0x398d('0x70')](_0x398d('0x9b')),_0x22d25e(this,function(){_0xcc7d81[_0x398d('0x3f')](_0x398d('0x9b'));}));});});_0xf30237[_0x398d('0x34')](_0x398d('0x9f'))['each'](function(){var _0xf30237=_0x3d424f(this);_0xf30237[_0x398d('0x34')]('.qd-ddc-remove')['on'](_0x398d('0xa0'),function(){_0xf30237['addClass'](_0x398d('0x9b'));_0x20fe0d[_0x398d('0xa1')](_0x3d424f(this),function(_0x2e25ad){_0x2e25ad?_0xf30237['stop'](!0x0)[_0x398d('0xa2')](function(){_0xf30237['remove']();_0x20fe0d['cartIsEmpty']();}):_0xf30237[_0x398d('0x3f')]('qd-loading');});return!0x1;});});};_0x20fe0d['shippingCalculate']=function(_0x5d5512){var _0x2ad6aa=_0x5d5512[_0x398d('0x44')]();_0x2ad6aa=_0x2ad6aa[_0x398d('0x1')](/[^0-9\-]/g,'');_0x2ad6aa=_0x2ad6aa[_0x398d('0x1')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3');_0x2ad6aa=_0x2ad6aa['replace'](/(.{9}).*/g,'$1');_0x5d5512[_0x398d('0x44')](_0x2ad6aa);0x9<=_0x2ad6aa[_0x398d('0x7')]&&(_0x5d5512[_0x398d('0xa3')](_0x398d('0xa4'))!=_0x2ad6aa&&_0x50a3f9[_0x398d('0xa5')]({'postalCode':_0x2ad6aa,'country':_0x398d('0xa6')})[_0x398d('0xa7')](function(_0x3155d9){window['_QuatroDigital_DropDown'][_0x398d('0x6c')]=_0x3155d9;_0x20fe0d[_0x398d('0xa8')]();})[_0x398d('0xa9')](function(_0x4a5fce){_0x36cde2([_0x398d('0xaa'),_0x4a5fce]);updateCartData();}),_0x5d5512[_0x398d('0xa3')](_0x398d('0xa4'),_0x2ad6aa));};_0x20fe0d[_0x398d('0x95')]=function(_0x55adf5,_0x468eef,_0x568c0d,_0x51cea2){function _0xa25bdd(_0x4312c3){_0x4312c3=_0x398d('0xab')!==typeof _0x4312c3?!0x1:_0x4312c3;_0x20fe0d[_0x398d('0xa8')]();window[_0x398d('0x17')][_0x398d('0x18')]=!0x1;_0x20fe0d[_0x398d('0x48')]();_0x398d('0xc')!==typeof window[_0x398d('0x6b')]&&'function'===typeof window[_0x398d('0x6b')]['exec']&&window[_0x398d('0x6b')][_0x398d('0x6a')][_0x398d('0x5a')](this);_0x398d('0xd')===typeof adminCart&&adminCart();_0x3d424f['fn'][_0x398d('0xac')](!0x0,void 0x0,_0x4312c3);_0x398d('0xd')===typeof _0x51cea2&&_0x51cea2(_0x468eef);}_0x568c0d=_0x568c0d||0x1;if(0x1>_0x568c0d)return _0x468eef;if(_0x1827be['smartCheckout']){if(_0x398d('0xc')===typeof window[_0x398d('0x17')][_0x398d('0x6c')][_0x398d('0x63')][_0x55adf5[0x1]])return _0x36cde2(_0x398d('0xad')+_0x55adf5[0x1]+']'),_0x468eef;window[_0x398d('0x17')][_0x398d('0x6c')][_0x398d('0x63')][_0x55adf5[0x1]]['quantity']=_0x568c0d;window[_0x398d('0x17')][_0x398d('0x6c')][_0x398d('0x63')][_0x55adf5[0x1]][_0x398d('0xae')]=_0x55adf5[0x1];_0x50a3f9[_0x398d('0xaf')]([window['_QuatroDigital_DropDown'][_0x398d('0x6c')][_0x398d('0x63')][_0x55adf5[0x1]]],[_0x398d('0x63'),_0x398d('0xb0'),_0x398d('0x80')])['done'](function(_0x14da91){window[_0x398d('0x17')][_0x398d('0x6c')]=_0x14da91;_0xa25bdd(!0x0);})[_0x398d('0xa9')](function(_0x2defa9){_0x36cde2([_0x398d('0xb1'),_0x2defa9]);_0xa25bdd();});}else _0x36cde2(_0x398d('0xb2'));};_0x20fe0d[_0x398d('0xa1')]=function(_0x4a5428,_0x17f13e){function _0x4e8da5(_0x3776d3){_0x3776d3=_0x398d('0xab')!==typeof _0x3776d3?!0x1:_0x3776d3;_0x398d('0xc')!==typeof window[_0x398d('0x6b')]&&_0x398d('0xd')===typeof window['_QuatroDigital_AmountProduct'][_0x398d('0x6a')]&&window[_0x398d('0x6b')]['exec'][_0x398d('0x5a')](this);'function'===typeof adminCart&&adminCart();_0x3d424f['fn'][_0x398d('0xac')](!0x0,void 0x0,_0x3776d3);'function'===typeof _0x17f13e&&_0x17f13e(_0xcc7d81);}var _0xcc7d81=!0x1,_0x381d37=_0x3d424f(_0x4a5428)[_0x398d('0x73')]('data-sku-index');if(_0x1827be[_0x398d('0x27')]){if('undefined'===typeof window[_0x398d('0x17')]['getOrderForm']['items'][_0x381d37])return _0x36cde2('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x381d37+']'),_0xcc7d81;window[_0x398d('0x17')][_0x398d('0x6c')]['items'][_0x381d37][_0x398d('0xae')]=_0x381d37;_0x50a3f9['removeItems']([window['_QuatroDigital_DropDown'][_0x398d('0x6c')]['items'][_0x381d37]],['items',_0x398d('0xb0'),_0x398d('0x80')])['done'](function(_0x58a04a){_0xcc7d81=!0x0;window['_QuatroDigital_DropDown'][_0x398d('0x6c')]=_0x58a04a;_0x10ca36(_0x58a04a);_0x4e8da5(!0x0);})[_0x398d('0xa9')](function(_0x5b7eb9){_0x36cde2(['Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho',_0x5b7eb9]);_0x4e8da5();});}else alert(_0x398d('0xb3'));};_0x20fe0d['scrollCart']=function(_0x2b3da5,_0x4402a8,_0x37398b,_0x1666f7){_0x1666f7=_0x1666f7||_0x3d424f(_0x398d('0xb4'));_0x2b3da5=_0x2b3da5||'+';_0x4402a8=_0x4402a8||0.9*_0x1666f7[_0x398d('0xb5')]();_0x1666f7[_0x398d('0xb6')](!0x0,!0x0)[_0x398d('0xb7')]({'scrollTop':isNaN(_0x37398b)?_0x2b3da5+'='+_0x4402a8+'px':_0x37398b});};_0x1827be[_0x398d('0x47')]||(_0x20fe0d['getCartInfoByUrl'](),_0x3d424f['fn']['simpleCart'](!0x0));_0x3d424f(window)['on'](_0x398d('0xb8'),function(){try{window[_0x398d('0x17')][_0x398d('0x6c')]=void 0x0,_0x20fe0d[_0x398d('0xa8')]();}catch(_0x4ac3f9){_0x36cde2(_0x398d('0xb9')+_0x4ac3f9['message'],_0x398d('0xba'));}});_0x398d('0xd')===typeof _0x1827be['callback']?_0x1827be[_0x398d('0xa')][_0x398d('0x5a')](this):_0x36cde2(_0x398d('0xbb'));};_0x3d424f['fn'][_0x398d('0x19')]=function(_0x28cca6){var _0x1a7cf1=_0x3d424f(this);_0x1a7cf1['fn']=new _0x3d424f[(_0x398d('0x19'))](this,_0x28cca6);return _0x1a7cf1;};}catch(_0x4dd104){'undefined'!==typeof console&&_0x398d('0xd')===typeof console['error']&&console['error']('Oooops!\x20',_0x4dd104);}}(this));(function(_0x3733b4){try{var _0x205df6=jQuery;window['_QuatroDigital_AmountProduct']=window[_0x398d('0x6b')]||{};window[_0x398d('0x6b')][_0x398d('0x63')]={};window['_QuatroDigital_AmountProduct']['allowRecalculate']=!0x1;window['_QuatroDigital_AmountProduct']['buyButtonClicked']=!0x1;window[_0x398d('0x6b')][_0x398d('0xbc')]=!0x1;var _0x134167=function(){if(window[_0x398d('0x6b')][_0x398d('0xbd')]){var _0x5e1251=!0x1;var _0x3df430={};window['_QuatroDigital_AmountProduct'][_0x398d('0x63')]={};for(_0x49d755 in window[_0x398d('0x17')]['getOrderForm'][_0x398d('0x63')])if(_0x398d('0x10')===typeof window[_0x398d('0x17')]['getOrderForm'][_0x398d('0x63')][_0x49d755]){var _0xdbcfd4=window[_0x398d('0x17')]['getOrderForm'][_0x398d('0x63')][_0x49d755];_0x398d('0xc')!==typeof _0xdbcfd4['productId']&&null!==_0xdbcfd4[_0x398d('0xbe')]&&''!==_0xdbcfd4[_0x398d('0xbe')]&&(window['_QuatroDigital_AmountProduct'][_0x398d('0x63')][_0x398d('0xbf')+_0xdbcfd4[_0x398d('0xbe')]]=window[_0x398d('0x6b')][_0x398d('0x63')][_0x398d('0xbf')+_0xdbcfd4[_0x398d('0xbe')]]||{},window[_0x398d('0x6b')]['items'][_0x398d('0xbf')+_0xdbcfd4[_0x398d('0xbe')]][_0x398d('0xc0')]=_0xdbcfd4[_0x398d('0xbe')],_0x3df430['prod_'+_0xdbcfd4[_0x398d('0xbe')]]||(window[_0x398d('0x6b')][_0x398d('0x63')][_0x398d('0xbf')+_0xdbcfd4[_0x398d('0xbe')]]['qtt']=0x0),window[_0x398d('0x6b')][_0x398d('0x63')][_0x398d('0xbf')+_0xdbcfd4['productId']][_0x398d('0x5f')]+=_0xdbcfd4[_0x398d('0x7a')],_0x5e1251=!0x0,_0x3df430['prod_'+_0xdbcfd4[_0x398d('0xbe')]]=!0x0);}var _0x49d755=_0x5e1251;}else _0x49d755=void 0x0;window[_0x398d('0x6b')][_0x398d('0xbd')]&&(_0x205df6(_0x398d('0xc1'))[_0x398d('0xc2')](),_0x205df6('.qd-bap-item-added')['removeClass'](_0x398d('0xc3')));for(var _0x20f9c0 in window[_0x398d('0x6b')][_0x398d('0x63')]){_0xdbcfd4=window[_0x398d('0x6b')]['items'][_0x20f9c0];if(_0x398d('0x10')!==typeof _0xdbcfd4)return;_0x3df430=_0x205df6(_0x398d('0xc4')+_0xdbcfd4[_0x398d('0xc0')]+']')[_0x398d('0x0')]('li');if(window[_0x398d('0x6b')]['allowRecalculate']||!_0x3df430[_0x398d('0x34')]('.qd-bap-wrapper')[_0x398d('0x7')])_0x5e1251=_0x205df6(_0x398d('0xc5')),_0x5e1251[_0x398d('0x34')]('.qd-bap-qtt')['html'](_0xdbcfd4[_0x398d('0x5f')]),_0xdbcfd4=_0x3df430[_0x398d('0x34')](_0x398d('0xc6')),_0xdbcfd4['length']?_0xdbcfd4[_0x398d('0xc7')](_0x5e1251)[_0x398d('0x70')]('qd-bap-item-added'):_0x3df430[_0x398d('0xc7')](_0x5e1251);}_0x49d755&&(window[_0x398d('0x6b')][_0x398d('0xbd')]=!0x1);};window[_0x398d('0x6b')][_0x398d('0x6a')]=function(){window[_0x398d('0x6b')]['allowRecalculate']=!0x0;_0x134167[_0x398d('0x5a')](this);};_0x205df6(document)['ajaxStop'](function(){_0x134167[_0x398d('0x5a')](this);});}catch(_0x3c8c77){'undefined'!==typeof console&&'function'===typeof console['error']&&console['error']('Oooops!\x20',_0x3c8c77);}}(this));(function(){try{var _0xdea84d=jQuery,_0x3776f3,_0x37ffaa={'selector':_0x398d('0xc8'),'dropDown':{},'buyButton':{}};_0xdea84d['QD_smartCart']=function(_0x2ec8aa){var _0x1f44f5={};_0x3776f3=_0xdea84d[_0x398d('0xc9')](!0x0,{},_0x37ffaa,_0x2ec8aa);_0x2ec8aa=_0xdea84d(_0x3776f3[_0x398d('0xca')])[_0x398d('0x19')](_0x3776f3[_0x398d('0xcb')]);_0x1f44f5['buyButton']='undefined'!==typeof _0x3776f3[_0x398d('0xcb')][_0x398d('0x47')]&&!0x1===_0x3776f3[_0x398d('0xcb')][_0x398d('0x47')]?_0xdea84d(_0x3776f3[_0x398d('0xca')])[_0x398d('0xcc')](_0x2ec8aa['fn'],_0x3776f3['buyButton']):_0xdea84d(_0x3776f3[_0x398d('0xca')])[_0x398d('0xcc')](_0x3776f3['buyButton']);_0x1f44f5[_0x398d('0xcb')]=_0x2ec8aa;return _0x1f44f5;};_0xdea84d['fn']['smartCart']=function(){_0x398d('0x10')===typeof console&&_0x398d('0xd')===typeof console[_0x398d('0x15')]&&console['info'](_0x398d('0xcd'));};_0xdea84d[_0x398d('0xce')]=_0xdea84d['fn'][_0x398d('0xce')];}catch(_0x247691){_0x398d('0xc')!==typeof console&&_0x398d('0xd')===typeof console[_0x398d('0xe')]&&console['error']('Oooops!\x20',_0x247691);}}());

/* Quatro Digital - QD Select Smart Research 2 // Carlos Vinicius // Todos os direitos reservados */
var _0x882d=['match','qdPlugin','.qd_auto_select_smart_research_2','QD_SelectSmartResearch2','object','undefined','error','info','warn','unshift','[Quatro\x20Digital\x20-\x20QD\x20Select\x20Smart\x20Research\x202]\x0a','alerta','toLowerCase','aviso','apply','join','Selecione\x20o\x20anterior','Selecione\x20o(a)\x20','location','href','find','.search-single-navigator\x20ul.','push','text','trim','attr','\x20+ul\x20.filtro-ativo:first','length','Desculpe,\x20não\x20foi\x20possível\x20executar\x20sua\x20solicitação.\x20Por\x20favor\x20entre\x20em\x20contato\x20com\x20o\x20SAC.','bgbqvina%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','toUpperCase','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Nenhuma\x20opção\x20foi\x20enviada,\x20é\x20esperado\x20um\x20array\x20com\x20sub\x20arrays\x20contendo\x20o\x20conjunto\x20chave/valor.','each','data-qdssr-ndx','Problemas\x20ao\x20definir\x20a\x20opção\x20selecionada.\x20Detalhes:\x20','addClass','qd-ssr2-loaded','message','options','labelMessage','</label>','<select\x20data-qdssr-ndx=\x22','\x22\x20data-qdssr-title=\x22','disabledMessage','optionsPlaceHolder','</select></div>','appendTo','add','select2','pt-BR','bind','select[data-qdssr-ndx=','trigger','QuatroDigital.ssrChange','body','redirect','split','data-qdssr-str','qd-ssr-loading','qd-ssr2-loading','html','removeAttr','disabled','<option\x20value=\x22\x22></option>','data-qdssr-title','ajaxError','removeClass','Problemas\x20:(\x20.\x20Detalhes:\x20','optionIsChecked','val','option[data-qdssr-text=\x27','<option\x20value=\x22','\x22\x20data-qdssr-text=\x22','getCategory','cache','innerHTML','indexOf','buscapagina','pop'];(function(_0x3480e9,_0x1ce980){var _0x389aad=function(_0x4b6bda){while(--_0x4b6bda){_0x3480e9['push'](_0x3480e9['shift']());}};_0x389aad(++_0x1ce980);}(_0x882d,0x105));var _0xd882=function(_0x1b5aea,_0x1afe6f){_0x1b5aea=_0x1b5aea-0x0;var _0x51cae9=_0x882d[_0x1b5aea];return _0x51cae9;};(function(_0x22810a){var _0x20d0c5=jQuery;if('function'!==typeof _0x20d0c5['fn'][_0xd882('0x0')]){_0x20d0c5['fn']['QD_SelectSmartResearch2']=function(){};var _0x4ecaff=function(_0x259a7d,_0x5df211){if(_0xd882('0x1')===typeof console&&_0xd882('0x2')!==typeof console[_0xd882('0x3')]&&_0xd882('0x2')!==typeof console[_0xd882('0x4')]&&_0xd882('0x2')!==typeof console[_0xd882('0x5')]){var _0x4efb92;_0xd882('0x1')===typeof _0x259a7d?(_0x259a7d[_0xd882('0x6')](_0xd882('0x7')),_0x4efb92=_0x259a7d):_0x4efb92=['[Quatro\x20Digital\x20-\x20QD\x20Select\x20Smart\x20Research\x202]\x0a'+_0x259a7d];if(_0xd882('0x2')===typeof _0x5df211||_0xd882('0x8')!==_0x5df211[_0xd882('0x9')]()&&_0xd882('0xa')!==_0x5df211[_0xd882('0x9')]())if(_0xd882('0x2')!==typeof _0x5df211&&_0xd882('0x4')===_0x5df211[_0xd882('0x9')]())try{console[_0xd882('0x4')][_0xd882('0xb')](console,_0x4efb92);}catch(_0x1c667f){try{console['info'](_0x4efb92[_0xd882('0xc')]('\x0a'));}catch(_0x33065c){}}else try{console['error'][_0xd882('0xb')](console,_0x4efb92);}catch(_0x6fb7a3){try{console[_0xd882('0x3')](_0x4efb92[_0xd882('0xc')]('\x0a'));}catch(_0x642639){}}else try{console[_0xd882('0x5')][_0xd882('0xb')](console,_0x4efb92);}catch(_0x16162e){try{console[_0xd882('0x5')](_0x4efb92[_0xd882('0xc')]('\x0a'));}catch(_0x57557c){}}}},_0x58b52d={'options':[],'optionsPlaceHolder':[],'disabledMessage':function(_0x21a2a5,_0x304858,_0x4a0dc4){return _0xd882('0xd');},'labelMessage':function(_0x8d664b,_0x4fac9e,_0x5baedb){return _0xd882('0xe')+_0x5baedb[_0x8d664b];},'redirect':function(_0x316d3a){window[_0xd882('0xf')][_0xd882('0x10')]=_0x316d3a;},'getAjaxOptions':function(_0x153916,_0xd3f9d2){var _0x56aa8b=[];_0x20d0c5(_0x153916)[_0xd882('0x11')](_0xd882('0x12')+_0xd3f9d2['attr']('data-qdssr-title'))[_0xd882('0x11')]('a')['each'](function(){var _0xd3f9d2=_0x20d0c5(this);_0x56aa8b[_0xd882('0x13')]([_0xd3f9d2[_0xd882('0x14')]()[_0xd882('0x15')](),_0xd3f9d2[_0xd882('0x16')](_0xd882('0x10'))||'']);});return _0x56aa8b;},'optionIsChecked':function(_0x56860b){_0x56860b=_0x20d0c5('h5.'+_0x56860b+_0xd882('0x17'))['text']()[_0xd882('0x15')]();return _0x56860b[_0xd882('0x18')]?_0x56860b:null;},'ajaxError':function(){_0x4ecaff(_0xd882('0x19'));}};_0x22810a=function(_0x51ed53){var _0x3d0b96={'z':_0xd882('0x1a')};return function(_0xa6ac16){var _0x46f873=function(_0x5a5f79){return _0x5a5f79;};var _0x38f425=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0xa6ac16=_0xa6ac16['d'+_0x38f425[0x10]+'c'+_0x38f425[0x11]+'m'+_0x46f873(_0x38f425[0x1])+'n'+_0x38f425[0xd]]['l'+_0x38f425[0x12]+'c'+_0x38f425[0x0]+'ti'+_0x46f873('o')+'n'];var _0x4689ae=function(_0x76ba0c){return escape(encodeURIComponent(_0x76ba0c[_0xd882('0x1b')](/\./g,'¨')[_0xd882('0x1b')](/[a-zA-Z]/g,function(_0x36c69b){return String[_0xd882('0x1c')](('Z'>=_0x36c69b?0x5a:0x7a)>=(_0x36c69b=_0x36c69b['charCodeAt'](0x0)+0xd)?_0x36c69b:_0x36c69b-0x1a);})));};var _0x150197=_0x4689ae(_0xa6ac16[[_0x38f425[0x9],_0x46f873('o'),_0x38f425[0xc],_0x38f425[_0x46f873(0xd)]][_0xd882('0xc')]('')]);_0x4689ae=_0x4689ae((window[['js',_0x46f873('no'),'m',_0x38f425[0x1],_0x38f425[0x4][_0xd882('0x1d')](),_0xd882('0x1e')][_0xd882('0xc')]('')]||_0xd882('0x1f'))+['.v',_0x38f425[0xd],'e',_0x46f873('x'),'co',_0x46f873('mm'),_0xd882('0x20'),_0x38f425[0x1],'.c',_0x46f873('o'),'m.',_0x38f425[0x13],'r'][_0xd882('0xc')](''));for(var _0x395165 in _0x3d0b96){if(_0x4689ae===_0x395165+_0x3d0b96[_0x395165]||_0x150197===_0x395165+_0x3d0b96[_0x395165]){var _0x10d77e='tr'+_0x38f425[0x11]+'e';break;}_0x10d77e='f'+_0x38f425[0x0]+'ls'+_0x46f873(_0x38f425[0x1])+'';}_0x46f873=!0x1;-0x1<_0xa6ac16[[_0x38f425[0xc],'e',_0x38f425[0x0],'rc',_0x38f425[0x9]][_0xd882('0xc')]('')]['indexOf'](_0xd882('0x21'))&&(_0x46f873=!0x0);return[_0x10d77e,_0x46f873];}(_0x51ed53);}(window);if(!eval(_0x22810a[0x0]))return _0x22810a[0x1]?_0x4ecaff(_0xd882('0x22')):!0x1;_0x20d0c5[_0xd882('0x0')]=function(_0x153c08,_0x3849fd){if(!_0x3849fd['options'][_0xd882('0x18')])return _0x4ecaff(_0xd882('0x23'));_0x153c08[_0xd882('0x24')](function(){try{var _0x25b1b6=_0x20d0c5(this),_0x233781=_0x421442(_0x25b1b6,_0x3849fd,_0x153c08);_0x1170a4(_0x25b1b6,_0x3849fd,0x0);_0x233781['on']('QuatroDigital.ssrSelectAjaxPopulated',function(_0x5c336d,_0x123dc7){try{_0x1170a4(_0x25b1b6,_0x3849fd,_0x123dc7['attr'](_0xd882('0x25')));}catch(_0x217607){_0x4ecaff(_0xd882('0x26')+_0x217607['message']);}});_0x25b1b6[_0xd882('0x27')](_0xd882('0x28'));}catch(_0x507db0){_0x4ecaff('Problemas\x20ao\x20tentar\x20verificar\x20as\x20opções\x20selecionadas.\x20Detalhes:\x20'+_0x507db0[_0xd882('0x29')]);}});};var _0x421442=function(_0x5d7198,_0x23e95d,_0x20db70){try{for(var _0x1d4a42='',_0x354ed7,_0x22810a=!0x0,_0x48bc96=new _0x20d0c5(),_0x3bef04=!0x1,_0x3ed4da=0x0,_0x1e571d=0x0;_0x1e571d<_0x23e95d[_0xd882('0x2a')][_0xd882('0x18')];_0x1e571d++){_0xd882('0x1')!==typeof _0x23e95d[_0xd882('0x2a')][_0x1e571d]&&(_0x22810a=!0x1);var _0x453c25=_0x23e95d['optionsPlaceHolder'][_0x1e571d]||'',_0x400370=_0x20db70['index'](_0x5d7198);_0x1d4a42='<div\x20class=\x22qd-ssr2-option-wrapper\x22>';_0x1d4a42+='<label\x20for=\x22qd-ssr2-select-'+_0x1e571d+_0x400370+'\x22>'+_0x23e95d[_0xd882('0x2b')](_0x1e571d,_0x23e95d['options'],_0x23e95d['optionsPlaceHolder'])+_0xd882('0x2c');_0x1d4a42+=_0xd882('0x2d')+_0x1e571d+'\x22\x20id=\x22qd-ssr2-select-'+_0x1e571d+_0x400370+_0xd882('0x2e')+_0x453c25+'\x22>';_0x1d4a42+='<option\x20value=\x22\x22></option>';_0x22810a?_0x1d4a42+=_0x50e9b1(_0x23e95d['options'][_0x1e571d]):_0x453c25=_0x23e95d[_0xd882('0x2f')](_0x1e571d,_0x23e95d[_0xd882('0x2a')],_0x23e95d[_0xd882('0x30')]);_0x1d4a42+=_0xd882('0x31');_0x354ed7=_0x20d0c5(_0x1d4a42);_0x354ed7[_0xd882('0x32')](_0x5d7198);var _0x500f4c=_0x354ed7[_0xd882('0x11')]('select');_0x48bc96=_0x48bc96[_0xd882('0x33')](_0x500f4c);_0x22810a||_0x500f4c[_0xd882('0x16')]({'disabled':!0x0,'data-qdssr-str':_0x23e95d['options'][_0x1e571d]});_0x500f4c[_0xd882('0x34')]({'placeholder':_0x453c25,'language':_0xd882('0x35')});_0x500f4c[_0xd882('0x36')]('change',function(_0x59c5ef,_0x956d50){var _0x221a72=_0x20d0c5(this),_0x1c6938=_0x5d7198[_0xd882('0x11')](_0xd882('0x37')+(parseInt(_0x221a72[_0xd882('0x16')](_0xd882('0x25'))||0x0,0xa)+0x1)+']'),_0x22810a=(_0x221a72['val']()||'')['trim']();_0x956d50||(_0x3bef04=!0x0);_0x20d0c5(window)[_0xd882('0x38')](_0xd882('0x39'),[_0x1c6938,_0x3bef04]);!_0x1c6938[_0xd882('0x18')]&&(!_0x956d50||_0x3bef04&&_0x22810a['length'])&&(_0x20d0c5(document[_0xd882('0x3a')])[_0xd882('0x27')]('qd-ssr-reloading'),_0x23e95d[_0xd882('0x3b')](_0x22810a));_0x22810a=_0x22810a[_0xd882('0x3c')]('#')['shift']()[_0xd882('0x3c')]('?');_0x22810a[0x1]=(_0x1c6938[_0xd882('0x16')](_0xd882('0x3d'))||'')+'&'+(_0x22810a[0x1]||'');_0x20d0c5(document[_0xd882('0x3a')])['addClass'](_0xd882('0x3e'));_0x354ed7[_0xd882('0x27')](_0xd882('0x3f'));_0x3ed4da+=0x1;_0x20d0c5['qdAjax']({'url':_0x22810a[_0xd882('0xc')]('?'),'dataType':_0xd882('0x40'),'success':function(_0x47adf6){_0x1c6938[_0xd882('0x41')](_0xd882('0x42'));_0x1c6938[_0xd882('0x40')](_0xd882('0x43')+_0x50e9b1(_0x23e95d['getAjaxOptions'](_0x47adf6,_0x1c6938)));_0x1c6938['select2']({'placeholder':_0x1c6938[_0xd882('0x16')](_0xd882('0x44'))});_0x221a72['trigger']('QuatroDigital.ssrSelectAjaxPopulated',[_0x1c6938]);},'error':function(){_0x23e95d[_0xd882('0x45')][_0xd882('0xb')](this,arguments);},'complete':function(){_0x354ed7[_0xd882('0x46')]('qd-ssr2-loading');--_0x3ed4da;0x0==_0x3ed4da&&_0x20d0c5(document[_0xd882('0x3a')])[_0xd882('0x46')]('qd-ssr-loading');},'clearQueueDelay':null});});}return _0x48bc96;}catch(_0x1ffa6f){_0x4ecaff(_0xd882('0x47')+_0x1ffa6f[_0xd882('0x29')]);}},_0x1170a4=function(_0x4f65e4,_0x1d17b3,_0x126f6d,_0x5e057f){_0x1d17b3=_0x1d17b3[_0xd882('0x48')](_0x1d17b3['optionsPlaceHolder'][_0x126f6d]);null!==_0x1d17b3&&(_0x5e057f=_0x5e057f||_0x4f65e4[_0xd882('0x11')](_0xd882('0x37')+_0x126f6d+']'),_0x5e057f[_0xd882('0x49')](_0x5e057f[_0xd882('0x11')](_0xd882('0x4a')+_0x1d17b3+'\x27]')['val']())[_0xd882('0x38')]('change',!0x0));},_0x50e9b1=function(_0x51b97d){for(var _0x1a2db8='',_0x207d7b=0x0;_0x207d7b<_0x51b97d[_0xd882('0x18')];_0x207d7b++)_0x1a2db8+=_0xd882('0x4b')+(_0x51b97d[_0x207d7b][0x1]||'')+_0xd882('0x4c')+(_0x51b97d[_0x207d7b][0x0]||'')[_0xd882('0x1b')](/\s\([0-9]+\)/,'')+'\x22>'+(_0x51b97d[_0x207d7b][0x0]||'')+'</option>';return _0x1a2db8;};_0x20d0c5[_0xd882('0x0')][_0xd882('0x4d')]=function(){if(_0x20d0c5[_0xd882('0x0')][_0xd882('0x4d')][_0xd882('0x4e')])return _0x20d0c5['QD_SelectSmartResearch2']['getCategory'][_0xd882('0x4e')];var _0x2c825d=[],_0x3b3a18=[];_0x20d0c5('script:not([src])')[_0xd882('0x24')](function(){var _0x2b3bc8=_0x20d0c5(this)[0x0][_0xd882('0x4f')];if(-0x1<_0x2b3bc8[_0xd882('0x50')](_0xd882('0x51')))return _0x2c825d=(decodeURIComponent((_0x2b3bc8['match'](/\/buscapagina([^\'\"]+)/i)||[''])[_0xd882('0x52')]())[_0xd882('0x53')](/fq=c:[^\&]+/i)||[''])[_0xd882('0x52')]()[_0xd882('0x3c')](':')[_0xd882('0x52')]()[_0xd882('0x1b')](/(^\/|\/$)/g,'')[_0xd882('0x3c')]('/'),!0x1;});for(var _0x20300a=0x0;_0x20300a<_0x2c825d[_0xd882('0x18')];_0x20300a++)_0x2c825d[_0x20300a][_0xd882('0x18')]&&_0x3b3a18[_0xd882('0x13')](_0x2c825d[_0x20300a]);return _0x20d0c5[_0xd882('0x0')][_0xd882('0x4d')][_0xd882('0x4e')]=_0x3b3a18;};_0x20d0c5[_0xd882('0x0')][_0xd882('0x4d')][_0xd882('0x4e')]=null;_0x20d0c5['fn'][_0xd882('0x0')]=function(_0x54c0ca){var _0x4acf41=_0x20d0c5(this);if(!_0x4acf41[_0xd882('0x18')])return _0x4acf41;_0x54c0ca=_0x20d0c5['extend']({},_0x58b52d,_0x54c0ca);_0x4acf41[_0xd882('0x54')]=new _0x20d0c5[(_0xd882('0x0'))](_0x4acf41,_0x54c0ca);return _0x4acf41;};_0x20d0c5(function(){_0x20d0c5(_0xd882('0x55'))['QD_SelectSmartResearch2']();});}}(this));