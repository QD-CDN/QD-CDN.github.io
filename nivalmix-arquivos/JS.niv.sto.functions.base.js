/**
* Funções base
*/
"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});"function"!=typeof String.prototype.capitalize&&(String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1).toLowerCase()});
"function"!==typeof String.prototype.replaceSpecialChars&&(String.prototype.replaceSpecialChars=function(){var b={"\u00e7":"c","\u00e6":"ae","\u0153":"oe","\u00e1":"a","\u00e9":"e","\u00ed":"i","\u00f3":"o","\u00fa":"u","\u00e0":"a","\u00e8":"e","\u00ec":"i","\u00f2":"o","\u00f9":"u","\u00e4":"a","\u00eb":"e","\u00ef":"i","\u00f6":"o","\u00fc":"u","\u00ff":"y","\u00e2":"a","\u00ea":"e","\u00ee":"i","\u00f4":"o","\u00fb":"u","\u00e5":"a","\u00e3":"a","\u00f8":"o","\u00f5":"o",u:"u","\u00c1":"A","\u00c9":"E",
"\u00cd":"I","\u00d3":"O","\u00da":"U","\u00ca":"E","\u00d4":"O","\u00dc":"U","\u00c3":"A","\u00d5":"O","\u00c0":"A","\u00c7":"C"};return this.replace(/[\u00e0-\u00fa]/ig,function(a){return"undefined"!=typeof b[a]?b[a]:a})});
Array.prototype.indexOf||(Array.prototype.indexOf=function(d,e){var a;if(null==this)throw new TypeError('"this" is null or not defined');var c=Object(this),b=c.length>>>0;if(0===b)return-1;a=+e||0;Infinity===Math.abs(a)&&(a=0);if(a>=b)return-1;for(a=Math.max(0<=a?a:b-Math.abs(a),0);a<b;){if(a in c&&c[a]===d)return a;a++}return-1});

try {
	var Common = {
		run: function() {},
		init: function() {
			Common.vtexBindQuickViewDestroy();
			Common.qdOverlay();
			Common.saveAmountFix();
			Common.applyTipBarCarousel();
			Common.applyCarouselShelf();
			Common.setDataScrollToggle();
			Common.applySmartCart();
			Common.applyAmazingMenu();
			Common.applyAmazingMenuMobile();
			Common.giftlistAddShoppingList();
			Common.openSearchModal();
			Common.applyMosaicCategorieBanners();
		},
		ajaxStop: function() {},
		windowOnload: function() {
			Common.saveAmountFix();
		},
		vtexBindQuickViewDestroy: function() {
			window.bindQuickView = function() {};
		},
		qdOverlayClass: 'qd-am-on qd-cart-show qd-sn-on',
		qdOverlay: function() {
			$('.components-qd-v1-overlay').click(function() {
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		},
		saveAmountFix: function() {
			$('.shelf-qd-v1-highlight-discount-percentage:not(.qd-on)').addClass('qd-on').each(function() {
				var $t = $(this);
				$t.text(($t.text().trim().match(/[0-9]+/) || [""]).pop() + '%');
			});
		},
		applyMosaicCategorieBanners: function () {
			$('.mosaic-categories-qd-v1-wrapper > .box-banner').QD_mosaicBanners({
				bannerColSecurityMargin: 0,
				containerWidth: 1336,
				classFourColumn: "col-xs-12 col-sm-6 col-md-3"
			});
		},
		applyTipBarCarousel: function() {
			var wrapper = $('.tip-bar-qd-v1-carousel');

			if (!wrapper.length)
				return;

			var options = {
				arrows: false,
				autoplay: true,
				slidesToShow: 4,
				slidesToScroll: 4,
				infinite: false,
				draggable: false,
				speed: 1000,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},

					{
						breakpoint: 767,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			};

			wrapper.slick($.extend(true, options, (function() {
				// Se estiver dentro do product-qd-v1-sku-selection-box, ele mostrará só 2 slides por vez, mantendo as outras propriedades da variável options
				if(wrapper.closest('.product-qd-v1-sku-selection-box').length)
					return { slidesToShow: 2 };
				return {};
			})()));
		},
		applyCarouselShelf: function() {
			if ($(document.body).is('.produto'))
				return

			var wrapper = $('.carousel-qd-v1-shelf:not(.special-carousel-qd-v1-shelf) .prateleira'); // todos, menos o carrossel especial, que é específico

			if (!wrapper.length)
				return false;

			wrapper.each(function() {
				var $t = $(this);
				$t.find('h2').insertBefore(wrapper).addClass('heading-3 shelf-qd-v1-title').wrapInner("<span></span>");
				
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
						breakpoint: 550,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
		},
		setDataScrollToggle: function() {
			$(document.body).attr('data-qd-scroll-limit', '100');
		},
		applySmartCart: function() {
			$('.header-qd-v1-actions-wrapper').append('<div class="smart-cart-qd-v1-wrapper"><div class="qd-sc-wrapper"></div></div>');

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
		applyAmazingMenuMobile: function() {
			var wrapper = $('.header-qd-v1-amazing-menu-mobile');

			wrapper.find('> ul > li > ul').prepend(function(){return $(this).prev().clone().wrap('<li></li>').parent()});

			wrapper.QD_amazingMenu({
				url: window.location.origin+"/qd-amazing-menu",
				callback: function() {
					$('<span class="qd-am-dropdown-trigger"><i class="fa fa-angle-down"></i></span>').appendTo(wrapper.find('.qd-am-has-ul')).click(function() {
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
		applyAmazingMenu: function() {
			$('.header-qd-v1-amazing-menu').QD_amazingMenu({
				callback: function() {
					$('ul.qd-am-dropdown-menu').each(function() {
						$(this).wrapInner('<li class="container"><ul></ul></li>');
					});
				}
			});

			$('.header-qd-v1-floating-amazing-menu').click(function(e) {
				$('.header-qd-v1-amazing-menu-wrapper').toggleClass('qd-is-active');
				e.preventDefault();
			});
		},
		giftlistAddShoppingList: function() {
			$(".shelf-qd-v1-giftlist-add:not(.qd-on)").addClass("qd-on").click(function(){
				var $t = $(this);

				if ($(".glis-popup-link").length > 0) {
					$(".product-insertsku .insert-sku-checkbox").filter(":checked, [checked]").removeAttr("checked").click();
					$t.parent().find(".product-insertsku .insert-sku-checkbox").attr("checked", true).click();
					$(".glis-popup-link").click();
				} else {
					$(window.document.location).attr('href', $(".glis-link.must-login").attr("href"));
				}
			});
		},
		openSearchModal: function() {
			$('.header-qd-v1-action-search').click(function(e) {
				e.preventDefault();
				
				var modal = $('.modal-qd-v1-search');
				modal.modal();
				
				$(document.body).addClass('qd-sm-on');
				modal.on('hidden.bs.modal', function (e) {
					$(document.body).removeClass('qd-sm-on');
					modal.off(e);
				})
			});
		}
	};

	var Home = {
		init: function() {
			Home.applySliderFull();
			Home.applyBrandCarousel();
			Home.applySpecialShelfCarousel();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		applySliderFull: function() {
			var wrapper = $('.slider-qd-v1-full');

			wrapper.slick({
				autoplay: true,
				dots: true,
				fade: true,
				cssEase: 'linear',
				infinite: true,
				speed: 500,
				draggable: false
			});

			wrapper.each(function() {
				$(this).find('.slick-arrow').wrapAll('<div class="slick-nav" />');
			});
		},
		applyBrandCarousel: function() {
			var wrapper = $('.brand-carousel-qd-v1-carousel');

			wrapper.slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: 6,
				slidesToScroll: 6,
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
		applyMosaicCategorieBanners: function() {
			$('.mosaic-categories-qd-v1-wrapper > .box-banner').QD_mosaicBanners({
				bannerColSecurityMargin: -30,
				containerWidth: 1326,
				classFourColumn: "col-xs-12 col-sm-6 col-md-3"
			});
		},
		applySpecialShelfCarousel: function() {
			var wrapper = $('.home-qd-v1-special-carousel-banner');

			if (!wrapper.length)
				return false;

			var hasBanner = wrapper.find('.box-banner').length;
			if (!hasBanner)
				wrapper.find('[class*="col-md-"]').removeClass().addClass('col-xs-12');

			wrapper.each(function() {
				var $t = $(this);
				var $carousel = $t.find('.special-carousel-qd-v1-shelf');
				$t.find('h2').addClass('heading-3 shelf-qd-v1-title').wrapInner("<span></span>").prependTo($carousel);
				$carousel.addClass('special-carousel-qd-v1-shelf-split');
			});

			var slideQtd = hasBanner ? 3 : 4;

			wrapper.find('.prateleira').slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: slideQtd,
				slidesToScroll: slideQtd,
				infinite: true,
				draggable: false,
				speed: 700,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},

					{
						breakpoint: 550,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
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
			Product.accessoriesFix();
			Product.accessoriesApplyCarousel();
			Product.forceImageZoom();
			Product.setAvailableBodyClass();
			// Roda slick das thumbs quando volta para estado inicial
			$(window).on('skuSelectable.vtex', Product.applyCarouselThumb);
			Product.qdHideUniqueSkuOption();
			Product.saveAmountFlag();
			Product.openShipping();
			Product.scrollToDescription();
			Product.selectSku();
			Product.seeInstalments();
			Product.checkBuyTogether();
			Product.applyCarouselShelfProduct(); // executar após checkBuyTogether
			Product.showFloatingBuyBar();
		},
		ajaxStop: function() {
			Product.applyCarouselThumb();
		},
		windowOnload: function() {
			Product.setCEPPlaceholder();
		},
		accessoriesFix: function () {
			$('fieldset >.buy-product-checkbox').parent().each(function () {
				var $t = $(this);
				$t.add($t.prev('ul')).wrapAll('<div class="accessories-qd-v1-item col-xs-12 col-sm-6 col-md-3"/>');
			});
		},
		accessoriesApplyCarousel: function () {
			var item = $('.accessories-qd-v1-item');

			if (!item.length)
				return;

			item.wrapAll('<div class="accessories-qd-v1-carousel"></div>');

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
		},
		applyCarouselShelfProduct: function() {

			var wrapper = $('.carousel-qd-v1-shelf .prateleira');

			if (!wrapper.length)
				return false;

			wrapper.each(function() {
				var $t = $(this);			
				$t.find('h2').insertBefore(wrapper).addClass('heading-3 shelf-qd-v1-title').wrapInner("<span></span>");
			});

			var slidesToShow = 4;

			if (wrapper.hasClass('carousel-shelf-qd-v1-split'))
				slidesToShow = 2;

			wrapper.slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: slidesToShow,
				slidesToScroll: slidesToShow,
				infinite: true,
				draggable: false,
				speed: 700,
				responsive: [
					{
						breakpoint: 991,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},

					{
						breakpoint: 550,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
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
		},
		applyCarouselThumb: function() {
			// Wrapper onde foi inserido as thumbs
			var thumbsSliderWrapper = $('.product-qd-v1-thumbs-mobile');
			thumbsSliderWrapper.removeClass('slick-initialized slick-slider');
			
			// Inicializa com o primeiro selecionado
			thumbsSliderWrapper.on('init', function(event, slick){
				$(this).find('.slick-current a').addClass('ON');
				$(this).find('a').on('click', function() {
					thumbsSliderWrapper.slick('slickGoTo', $(this).closest('li').attr('data-slick-index'));
				});
			});

			thumbsSliderWrapper.slick({
				slidesToShow: 5,
				slidesToScroll: 5,				  
  				arrows: false,
				infinite: false,
				draggable: true,
				swipeToSlide: true,
				edgeFriction: .1,
				variableWidth: true,
				responsive: [
					{
					breakpoint: 600,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3,
							variableWidth: false
						}
					}
				]
			});
		},
		qdHideUniqueSkuOption: function() {
			$(".product-qd-v1-sku-selection [class*='group_']").each(function(){
				var $t = $(this);
				var input =  $t.find("input");

				if(input.length !== 1)
					return;

				input.attr("checked", true).change();
				$t.getParent("ul").hide();
			});
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
		openShipping: function() {
			if( typeof window.ShippingValue === "function" )
				window.ShippingValue();
		},
		scrollToDescription: function() {
			$('.product-qd-v1-link-description').click(function(e) {
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $('.product-qd-v1-description').offset().top -100
				}, 900, 'swing');
			});
		},
		selectSku: function(){
			var wrapper = $('.skuList');

			wrapper.on('selectSku.qd_click', function() {
				try{
					var $t = $(this);

					var buyButton = $t.find('.buy-button');
					if(buyButton.length)
						var skuId = buyButton.attr('href').match(/sku\=([0-9]+)/i)[1];
					else
						var skuId = $t.find('.sku-notifyme-skuid').val();

					var selectedSku;
					for(var i = 0; i < skuJson.skus.length; i++){
						if(skuJson.skus[i].sku == skuId){
							selectedSku = skuJson.skus[i];
							break;
						}
					}

					if(selectedSku)
						$(document).trigger('skuSelected.vtex', [skuId, selectedSku]);

					wrapper.removeClass('qd-sku-list-selected qd-sku-list-selected-by-click');
					$t.addClass('qd-sku-list-selected');
				}
				catch(e){if (typeof console !== 'undefined' && typeof console.info === 'function') console.info('Problemas ao selecionar o SKU', e.message); };
			});

			wrapper.click(function() {
				var $t = $(this);

				$t.trigger('selectSku.qd_click');
				$t.addClass('qd-sku-list-selected-by-click');
			});
		},
		seeInstalments: function () {
			$('.product-qd-v1-see-installments').click(function (e) {
				e.preventDefault();
				$(this).toggleClass('qd-is-active');
				$('.product-qd-v1-installments-method').toggleClass('qd-is-visible');
			});
		},
		checkBuyTogether: function(){
			var buyTogether = $(".product-qd-v1-buy-together-wrapper");
			var placeholder = $('.product-qd-v1-crosseling-wrapper');
			var placeholderCarousel = placeholder.find('.carousel-qd-v1-shelf');

			if(placeholderCarousel.length > 0 && buyTogether.find('.buy-together-content > *').length > 0) {
				$('.product-qd-v1-buy-together-crosseling').addClass('col-lg-6');
				placeholderCarousel.removeClass('qd-shelf-sm-3').addClass('qd-shelf-sm-6');
				buyTogether.find('#divTitulo').addClass('heading-3 shelf-qd-v1-title').wrapInner("<span></span>");
				placeholder.find('.prateleira').addClass('carousel-shelf-qd-v1-split');
			}
		},
		setCEPPlaceholder: function(){
			$('.freight-zip-box').attr('placeholder', 'Digite seu Cep');
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
			Institutional.spanTitle();
			Institutional.openFilterMenu();			
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		spanTitle: function(){
			$('h1,h2,h3,h4').each(function(){
				$(this).wrapInner("<span></span>");
			});	
		},
		openFilterMenu: function(){
			$('.institucional-qd-v1-menu-toggle').click(function(e) {
				e.preventDefault();
				
				$(document.body).toggleClass('qd-sn-on');
			});
		}
	};

	var Orders = {
		init: function() {
			// Orders.bootstrapCssFix();
			Orders.spanTitle();
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
		},
		spanTitle: function(){
			$('h1,h2,h3,h4').each(function(){
				$(this).wrapInner("<span></span>");
			});	
		},
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

/* jQuery Cookie Plugin v1.4.1 // https://github.com/carhartl/jquery-cookie // Copyright 2013 Klaus Hartl // Released under the MIT license */
(function(){"function"!==typeof $.cookie&&function(c){"function"===typeof define&&define.amd?define(["jquery"],c):"object"===typeof exports?c(require("jquery")):c(jQuery)}(function(c){function p(a){a=e.json?JSON.stringify(a):String(a);return e.raw?a:encodeURIComponent(a)}function n(a,g){var b;if(e.raw)b=a;else a:{var d=a;0===d.indexOf('"')&&(d=d.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{d=decodeURIComponent(d.replace(l," "));b=e.json?JSON.parse(d):d;break a}catch(h){}b=void 0}return c.isFunction(g)?
g(b):b}var l=/\+/g,e=c.cookie=function(a,g,b){if(1<arguments.length&&!c.isFunction(g)){b=c.extend({},e.defaults,b);if("number"===typeof b.expires){var d=b.expires,h=b.expires=new Date;h.setTime(+h+864E5*d)}return document.cookie=[e.raw?a:encodeURIComponent(a),"=",p(g),b.expires?"; expires="+b.expires.toUTCString():"",b.path?"; path="+b.path:"",b.domain?"; domain="+b.domain:"",b.secure?"; secure":""].join("")}for(var d=a?void 0:{},h=document.cookie?document.cookie.split("; "):[],m=0,l=h.length;m<l;m++){var f=
h[m].split("="),k;k=f.shift();k=e.raw?k:decodeURIComponent(k);f=f.join("=");if(a&&a===k){d=n(f,g);break}a||void 0===(f=n(f))||(d[k]=f)}return d};e.defaults={};c.removeCookie=function(a,e){if(void 0===c.cookie(a))return!1;c.cookie(a,"",c.extend({},e,{expires:-1}));return!c.cookie(a)}})})();

/* Slick.js - Version: 1.6.0 - Author: Ken Wheeler - Website: http://kenwheeler.github.io - Docs: http://kenwheeler.github.io/slick - Repo: http://github.com/kenwheeler/slick - Issues: http://github.com/kenwheeler/slick/issues */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,e=this;e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(b,c){return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.focussed=!1,e.interrupted=!1,e.hidden="hidden",e.paused=!0,e.positionProp=null,e.respondTo=null,e.rowCount=1,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.visibilityChange="visibilitychange",e.windowWidth=0,e.windowTimer=null,f=a(c).data("slick")||{},e.options=a.extend({},e.defaults,d,f),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,"undefined"!=typeof document.mozHidden?(e.hidden="mozHidden",e.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(e.hidden="webkitHidden",e.visibilityChange="webkitvisibilitychange"),e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.changeSlide=a.proxy(e.changeSlide,e),e.clickHandler=a.proxy(e.clickHandler,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.registerBreakpoints(),e.init(!0)}var b=0;return c}(),b.prototype.activateADA=function(){var a=this;a.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},b.prototype.addSlide=b.prototype.slickAdd=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("data-slick-index",b)}),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.animate({height:b},a.options.speed)}},b.prototype.animateSlide=function(b,c){var d={},e=this;e.animateHeight(),e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?(e.options.rtl===!0&&(e.currentLeft=-e.currentLeft),a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){a=Math.ceil(a),e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}})):(e.applyTransition(),b=Math.ceil(b),e.options.vertical===!1?d[e.animType]="translate3d("+b+"px, 0px, 0px)":d[e.animType]="translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.getNavTarget=function(){var b=this,c=b.options.asNavFor;return c&&null!==c&&(c=a(c).not(b.$slider)),c},b.prototype.asNavFor=function(b){var c=this,d=c.getNavTarget();null!==d&&"object"==typeof d&&d.each(function(){var c=a(this).slick("getSlick");c.unslicked||c.slideHandler(b,!0)})},b.prototype.applyTransition=function(a){var b=this,c={};b.options.fade===!1?c[b.transitionType]=b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:c[b.transitionType]="opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayClear(),a.slideCount>a.options.slidesToShow&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this,b=a.currentSlide+a.options.slidesToScroll;a.paused||a.interrupted||a.focussed||(a.options.infinite===!1&&(1===a.direction&&a.currentSlide+1===a.slideCount-1?a.direction=0:0===a.direction&&(b=a.currentSlide-a.options.slidesToScroll,a.currentSlide-1===0&&(a.direction=1))),a.slideHandler(b))},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&(b.$prevArrow=a(b.options.prevArrow).addClass("slick-arrow"),b.$nextArrow=a(b.options.nextArrow).addClass("slick-arrow"),b.slideCount>b.options.slidesToShow?(b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.prependTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(b.$slider.addClass("slick-dotted"),d=a("<ul />").addClass(b.options.dotsClass),c=0;c<=b.getDotCount();c+=1)d.append(a("<li />").append(b.options.customPaging.call(this,b,c)));b.$dots=d.appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden","false")}},b.prototype.buildOut=function(){var b=this;b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide"),b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("data-slick-index",b).data("originalStyling",a(c).attr("style")||"")}),b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),(b.options.centerMode===!0||b.options.swipeToSlide===!0)&&(b.options.slidesToScroll=1),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.buildRows=function(){var b,c,d,e,f,g,h,a=this;if(e=document.createDocumentFragment(),g=a.$slider.children(),a.options.rows>1){for(h=a.options.slidesPerRow*a.options.rows,f=Math.ceil(g.length/h),b=0;f>b;b++){var i=document.createElement("div");for(c=0;c<a.options.rows;c++){var j=document.createElement("div");for(d=0;d<a.options.slidesPerRow;d++){var k=b*h+(c*a.options.slidesPerRow+d);g.get(k)&&j.appendChild(g.get(k))}i.appendChild(j)}e.appendChild(i)}a.$slider.empty().append(e),a.$slider.children().children().children().css({width:100/a.options.slidesPerRow+"%",display:"inline-block"})}},b.prototype.checkResponsive=function(b,c){var e,f,g,d=this,h=!1,i=d.$slider.width(),j=window.innerWidth||a(window).width();if("window"===d.respondTo?g=j:"slider"===d.respondTo?g=i:"min"===d.respondTo&&(g=Math.min(j,i)),d.options.responsive&&d.options.responsive.length&&null!==d.options.responsive){f=null;for(e in d.breakpoints)d.breakpoints.hasOwnProperty(e)&&(d.originalSettings.mobileFirst===!1?g<d.breakpoints[e]&&(f=d.breakpoints[e]):g>d.breakpoints[e]&&(f=d.breakpoints[e]));null!==f?null!==d.activeBreakpoint?(f!==d.activeBreakpoint||c)&&(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):null!==d.activeBreakpoint&&(d.activeBreakpoint=null,d.options=d.originalSettings,b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b),h=f),b||h===!1||d.$slider.trigger("breakpoint",[d,h])}},b.prototype.changeSlide=function(b,c){var f,g,h,d=this,e=a(b.currentTarget);switch(e.is("a")&&b.preventDefault(),e.is("li")||(e=e.closest("li")),h=d.slideCount%d.options.slidesToScroll!==0,f=h?0:(d.slideCount-d.currentSlide)%d.options.slidesToScroll,b.data.message){case"previous":g=0===f?d.options.slidesToScroll:d.options.slidesToShow-f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide-g,!1,c);break;case"next":g=0===f?d.options.slidesToScroll:f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide+g,!1,c);break;case"index":var i=0===b.data.index?0:b.data.index||e.index()*d.options.slidesToScroll;d.slideHandler(d.checkNavigable(i),!1,c),e.children().trigger("focus");break;default:return}},b.prototype.checkNavigable=function(a){var c,d,b=this;if(c=b.getNavigableIndexes(),d=0,a>c[c.length-1])a=c[c.length-1];else for(var e in c){if(a<c[e]){a=d;break}d=c[e]}return a},b.prototype.cleanUpEvents=function(){var b=this;b.options.dots&&null!==b.$dots&&a("li",b.$dots).off("click.slick",b.changeSlide).off("mouseenter.slick",a.proxy(b.interrupt,b,!0)).off("mouseleave.slick",a.proxy(b.interrupt,b,!1)),b.$slider.off("focus.slick blur.slick"),b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow&&b.$prevArrow.off("click.slick",b.changeSlide),b.$nextArrow&&b.$nextArrow.off("click.slick",b.changeSlide)),b.$list.off("touchstart.slick mousedown.slick",b.swipeHandler),b.$list.off("touchmove.slick mousemove.slick",b.swipeHandler),b.$list.off("touchend.slick mouseup.slick",b.swipeHandler),b.$list.off("touchcancel.slick mouseleave.slick",b.swipeHandler),b.$list.off("click.slick",b.clickHandler),a(document).off(b.visibilityChange,b.visibility),b.cleanUpSlideEvents(),b.options.accessibility===!0&&b.$list.off("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().off("click.slick",b.selectHandler),a(window).off("orientationchange.slick.slick-"+b.instanceUid,b.orientationChange),a(window).off("resize.slick.slick-"+b.instanceUid,b.resize),a("[draggable!=true]",b.$slideTrack).off("dragstart",b.preventDefault),a(window).off("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).off("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.cleanUpSlideEvents=function(){var b=this;b.$list.off("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.off("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.cleanUpRows=function(){var b,a=this;a.options.rows>1&&(b=a.$slides.children().children(),b.removeAttr("style"),a.$slider.empty().append(b))},b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())},b.prototype.destroy=function(b){var c=this;c.autoPlayClear(),c.touchObject={},c.cleanUpEvents(),a(".slick-cloned",c.$slider).detach(),c.$dots&&c.$dots.remove(),c.$prevArrow&&c.$prevArrow.length&&(c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.prevArrow)&&c.$prevArrow.remove()),c.$nextArrow&&c.$nextArrow.length&&(c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.nextArrow)&&c.$nextArrow.remove()),c.$slides&&(c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){a(this).attr("style",a(this).data("originalStyling"))}),c.$slideTrack.children(this.options.slide).detach(),c.$slideTrack.detach(),c.$list.detach(),c.$slider.append(c.$slides)),c.cleanUpRows(),c.$slider.removeClass("slick-slider"),c.$slider.removeClass("slick-initialized"),c.$slider.removeClass("slick-dotted"),c.unslicked=!0,b||c.$slider.trigger("destroy",[c])},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b){var c=this;c.cssTransitions===!1?(c.$slides.eq(a).css({zIndex:c.options.zIndex}),c.$slides.eq(a).animate({opacity:1},c.options.speed,c.options.easing,b)):(c.applyTransition(a),c.$slides.eq(a).css({opacity:1,zIndex:c.options.zIndex}),b&&setTimeout(function(){c.disableTransition(a),b.call()},c.options.speed))},b.prototype.fadeSlideOut=function(a){var b=this;b.cssTransitions===!1?b.$slides.eq(a).animate({opacity:0,zIndex:b.options.zIndex-2},b.options.speed,b.options.easing):(b.applyTransition(a),b.$slides.eq(a).css({opacity:0,zIndex:b.options.zIndex-2}))},b.prototype.filterSlides=b.prototype.slickFilter=function(a){var b=this;null!==a&&(b.$slidesCache=b.$slides,b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.focusHandler=function(){var b=this;b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*:not(.slick-arrow)",function(c){c.stopImmediatePropagation();var d=a(this);setTimeout(function(){b.options.pauseOnFocus&&(b.focussed=d.is(":focus"),b.autoPlay())},0)})},b.prototype.getCurrent=b.prototype.slickCurrentSlide=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var a=this,b=0,c=0,d=0;if(a.options.infinite===!0)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else if(a.options.centerMode===!0)d=a.slideCount;else if(a.options.asNavFor)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else d=1+Math.ceil((a.slideCount-a.options.slidesToShow)/a.options.slidesToScroll);return d-1},b.prototype.getLeft=function(a){var c,d,f,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(!0),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=b.slideWidth*b.options.slidesToShow*-1,e=d*b.options.slidesToShow*-1),b.slideCount%b.options.slidesToScroll!==0&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(a>b.slideCount?(b.slideOffset=(b.options.slidesToShow-(a-b.slideCount))*b.slideWidth*-1,e=(b.options.slidesToShow-(a-b.slideCount))*d*-1):(b.slideOffset=b.slideCount%b.options.slidesToScroll*b.slideWidth*-1,e=b.slideCount%b.options.slidesToScroll*d*-1))):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?a*b.slideWidth*-1+b.slideOffset:a*d*-1+e,b.options.variableWidth===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,b.options.centerMode===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,c+=(b.$list.width()-f.outerWidth())/2)),c},b.prototype.getOption=b.prototype.slickGetOption=function(a){var b=this;return b.options[a]},b.prototype.getNavigableIndexes=function(){var e,a=this,b=0,c=0,d=[];for(a.options.infinite===!1?e=a.slideCount:(b=-1*a.options.slidesToScroll,c=-1*a.options.slidesToScroll,e=2*a.slideCount);e>b;)d.push(b),b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d},b.prototype.getSlick=function(){return this},b.prototype.getSlideCount=function(){var c,d,e,b=this;return e=b.options.centerMode===!0?b.slideWidth*Math.floor(b.options.slidesToShow/2):0,b.options.swipeToSlide===!0?(b.$slideTrack.find(".slick-slide").each(function(c,f){return f.offsetLeft-e+a(f).outerWidth()/2>-1*b.swipeLeft?(d=f,!1):void 0}),c=Math.abs(a(d).attr("data-slick-index")-b.currentSlide)||1):b.options.slidesToScroll},b.prototype.goTo=b.prototype.slickGoTo=function(a,b){var c=this;c.changeSlide({data:{message:"index",index:parseInt(a)}},b)},b.prototype.init=function(b){var c=this;a(c.$slider).hasClass("slick-initialized")||(a(c.$slider).addClass("slick-initialized"),c.buildRows(),c.buildOut(),c.setProps(),c.startLoad(),c.loadSlider(),c.initializeEvents(),c.updateArrows(),c.updateDots(),c.checkResponsive(!0),c.focusHandler()),b&&c.$slider.trigger("init",[c]),c.options.accessibility===!0&&c.initADA(),c.options.autoplay&&(c.paused=!1,c.autoPlay())},b.prototype.initADA=function(){var b=this;b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),b.$slideTrack.attr("role","listbox"),b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c){a(this).attr({role:"option","aria-describedby":"slick-slide"+b.instanceUid+c})}),null!==b.$dots&&b.$dots.attr("role","tablist").find("li").each(function(c){a(this).attr({role:"presentation","aria-selected":"false","aria-controls":"navigation"+b.instanceUid+c,id:"slick-slide"+b.instanceUid+c})}).first().attr("aria-selected","true").end().find("button").attr("role","button").end().closest("div").attr("role","toolbar"),b.activateADA()},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.off("click.slick").on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&a("li",b.$dots).on("mouseenter.slick",a.proxy(b.interrupt,b,!0)).on("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.initSlideEvents=function(){var b=this;b.options.pauseOnHover&&(b.$list.on("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.on("mouseleave.slick",a.proxy(b.interrupt,b,!1)))},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.initSlideEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.$list.on("click.slick",b.clickHandler),a(document).on(b.visibilityChange,a.proxy(b.visibility,b)),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,a.proxy(b.orientationChange,b)),a(window).on("resize.slick.slick-"+b.instanceUid,a.proxy(b.resize,b)),a("[draggable!=true]",b.$slideTrack).on("dragstart",b.preventDefault),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show()},b.prototype.keyHandler=function(a){var b=this;a.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===a.keyCode&&b.options.accessibility===!0?b.changeSlide({data:{message:b.options.rtl===!0?"next":"previous"}}):39===a.keyCode&&b.options.accessibility===!0&&b.changeSlide({data:{message:b.options.rtl===!0?"previous":"next"}}))},b.prototype.lazyLoad=function(){function g(c){a("img[data-lazy]",c).each(function(){var c=a(this),d=a(this).attr("data-lazy"),e=document.createElement("img");e.onload=function(){c.animate({opacity:0},100,function(){c.attr("src",d).animate({opacity:1},200,function(){c.removeAttr("data-lazy").removeClass("slick-loading")}),b.$slider.trigger("lazyLoaded",[b,c,d])})},e.onerror=function(){c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),b.$slider.trigger("lazyLoadError",[b,c,d])},e.src=d})}var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=Math.ceil(e+b.options.slidesToShow),b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.next=b.prototype.slickNext=function(){var a=this;a.changeSlide({data:{message:"next"}})},b.prototype.orientationChange=function(){var a=this;a.checkResponsive(),a.setPosition()},b.prototype.pause=b.prototype.slickPause=function(){var a=this;a.autoPlayClear(),a.paused=!0},b.prototype.play=b.prototype.slickPlay=function(){var a=this;a.autoPlay(),a.options.autoplay=!0,a.paused=!1,a.focussed=!1,a.interrupted=!1},b.prototype.postSlide=function(a){var b=this;b.unslicked||(b.$slider.trigger("afterChange",[b,a]),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay&&b.autoPlay(),b.options.accessibility===!0&&b.initADA())},b.prototype.prev=b.prototype.slickPrev=function(){var a=this;a.changeSlide({data:{message:"previous"}})},b.prototype.preventDefault=function(a){a.preventDefault()},b.prototype.progressiveLazyLoad=function(b){b=b||1;var e,f,g,c=this,d=a("img[data-lazy]",c.$slider);d.length?(e=d.first(),f=e.attr("data-lazy"),g=document.createElement("img"),g.onload=function(){e.attr("src",f).removeAttr("data-lazy").removeClass("slick-loading"),c.options.adaptiveHeight===!0&&c.setPosition(),c.$slider.trigger("lazyLoaded",[c,e,f]),c.progressiveLazyLoad()},g.onerror=function(){3>b?setTimeout(function(){c.progressiveLazyLoad(b+1)},500):(e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),c.$slider.trigger("lazyLoadError",[c,e,f]),c.progressiveLazyLoad())},g.src=f):c.$slider.trigger("allImagesLoaded",[c])},b.prototype.refresh=function(b){var d,e,c=this;e=c.slideCount-c.options.slidesToShow,!c.options.infinite&&c.currentSlide>e&&(c.currentSlide=e),c.slideCount<=c.options.slidesToShow&&(c.currentSlide=0),d=c.currentSlide,c.destroy(!0),a.extend(c,c.initials,{currentSlide:d}),c.init(),b||c.changeSlide({data:{message:"index",index:d}},!1)},b.prototype.registerBreakpoints=function(){var c,d,e,b=this,f=b.options.responsive||null;if("array"===a.type(f)&&f.length){b.respondTo=b.options.respondTo||"window";for(c in f)if(e=b.breakpoints.length-1,d=f[c].breakpoint,f.hasOwnProperty(c)){for(;e>=0;)b.breakpoints[e]&&b.breakpoints[e]===d&&b.breakpoints.splice(e,1),e--;b.breakpoints.push(d),b.breakpointSettings[d]=f[c].settings}b.breakpoints.sort(function(a,c){return b.options.mobileFirst?a-c:c-a})}},b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.registerBreakpoints(),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.cleanUpSlideEvents(),b.initSlideEvents(),b.checkResponsive(!1,!0),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.setPosition(),b.focusHandler(),b.paused=!b.options.autoplay,b.autoPlay(),b.$slider.trigger("reInit",[b])},b.prototype.resize=function(){var b=this;a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.unslicked||b.setPosition()},50))},b.prototype.removeSlide=b.prototype.slickRemove=function(a,b,c){var d=this;return"boolean"==typeof a?(b=a,a=b===!0?0:d.slideCount-1):a=b===!0?--a:a,d.slideCount<1||0>a||a>d.slideCount-1?!1:(d.unload(),c===!0?d.$slideTrack.children().remove():d.$slideTrack.children(this.options.slide).eq(a).remove(),d.$slides=d.$slideTrack.children(this.options.slide),d.$slideTrack.children(this.options.slide).detach(),d.$slideTrack.append(d.$slides),d.$slidesCache=d.$slides,void d.reinit())},b.prototype.setCSS=function(a){var d,e,b=this,c={};b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?Math.ceil(a)+"px":"0px",e="top"==b.positionProp?Math.ceil(a)+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var a=this;a.options.vertical===!1?a.options.centerMode===!0&&a.$list.css({padding:"0px "+a.options.centerPadding}):(a.$list.height(a.$slides.first().outerHeight(!0)*a.options.slidesToShow),a.options.centerMode===!0&&a.$list.css({padding:a.options.centerPadding+" 0px"})),a.listWidth=a.$list.width(),a.listHeight=a.$list.height(),a.options.vertical===!1&&a.options.variableWidth===!1?(a.slideWidth=Math.ceil(a.listWidth/a.options.slidesToShow),a.$slideTrack.width(Math.ceil(a.slideWidth*a.$slideTrack.children(".slick-slide").length))):a.options.variableWidth===!0?a.$slideTrack.width(5e3*a.slideCount):(a.slideWidth=Math.ceil(a.listWidth),a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0)*a.$slideTrack.children(".slick-slide").length)));var b=a.$slides.first().outerWidth(!0)-a.$slides.first().width();a.options.variableWidth===!1&&a.$slideTrack.children(".slick-slide").width(a.slideWidth-b)},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=b.slideWidth*d*-1,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:b.options.zIndex-2,opacity:0}):a(e).css({position:"relative",left:c,top:0,zIndex:b.options.zIndex-2,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:b.options.zIndex-1,opacity:1})},b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}},b.prototype.setOption=b.prototype.slickSetOption=function(){var c,d,e,f,h,b=this,g=!1;if("object"===a.type(arguments[0])?(e=arguments[0],g=arguments[1],h="multiple"):"string"===a.type(arguments[0])&&(e=arguments[0],f=arguments[1],g=arguments[2],"responsive"===arguments[0]&&"array"===a.type(arguments[1])?h="responsive":"undefined"!=typeof arguments[1]&&(h="single")),"single"===h)b.options[e]=f;else if("multiple"===h)a.each(e,function(a,c){b.options[a]=c});else if("responsive"===h)for(d in f)if("array"!==a.type(b.options.responsive))b.options.responsive=[f[d]];else{for(c=b.options.responsive.length-1;c>=0;)b.options.responsive[c].breakpoint===f[d].breakpoint&&b.options.responsive.splice(c,1),c--;b.options.responsive.push(f[d])}g&&(b.unload(),b.reinit())},b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade(),a.$slider.trigger("setPosition",[a])},b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),a.options.fade&&("number"==typeof a.options.zIndex?a.options.zIndex<3&&(a.options.zIndex=3):a.options.zIndex=a.defaults.zIndex),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=a.options.useTransform&&null!==a.animType&&a.animType!==!1},b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;d=b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),b.$slides.eq(a).addClass("slick-current"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active").attr("aria-hidden","false"):(e=b.options.slidesToShow+a,
d.slice(e-c+1,e+c+2).addClass("slick-active").attr("aria-hidden","false")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):d.length<=b.options.slidesToShow?d.addClass("slick-active").attr("aria-hidden","false"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active").attr("aria-hidden","false"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.interrupt=function(a){var b=this;a||b.autoPlay(),b.interrupted=a},b.prototype.selectHandler=function(b){var c=this,d=a(b.target).is(".slick-slide")?a(b.target):a(b.target).parents(".slick-slide"),e=parseInt(d.attr("data-slick-index"));return e||(e=0),c.slideCount<=c.options.slidesToShow?(c.setSlideClasses(e),void c.asNavFor(e)):void c.slideHandler(e)},b.prototype.slideHandler=function(a,b,c){var d,e,f,g,j,h=null,i=this;return b=b||!1,i.animating===!0&&i.options.waitForAnimate===!0||i.options.fade===!0&&i.currentSlide===a||i.slideCount<=i.options.slidesToShow?void 0:(b===!1&&i.asNavFor(a),d=a,h=i.getLeft(d),g=i.getLeft(i.currentSlide),i.currentLeft=null===i.swipeLeft?g:i.swipeLeft,i.options.infinite===!1&&i.options.centerMode===!1&&(0>a||a>i.getDotCount()*i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):i.options.infinite===!1&&i.options.centerMode===!0&&(0>a||a>i.slideCount-i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):(i.options.autoplay&&clearInterval(i.autoPlayTimer),e=0>d?i.slideCount%i.options.slidesToScroll!==0?i.slideCount-i.slideCount%i.options.slidesToScroll:i.slideCount+d:d>=i.slideCount?i.slideCount%i.options.slidesToScroll!==0?0:d-i.slideCount:d,i.animating=!0,i.$slider.trigger("beforeChange",[i,i.currentSlide,e]),f=i.currentSlide,i.currentSlide=e,i.setSlideClasses(i.currentSlide),i.options.asNavFor&&(j=i.getNavTarget(),j=j.slick("getSlick"),j.slideCount<=j.options.slidesToShow&&j.setSlideClasses(i.currentSlide)),i.updateDots(),i.updateArrows(),i.options.fade===!0?(c!==!0?(i.fadeSlideOut(f),i.fadeSlide(e,function(){i.postSlide(e)})):i.postSlide(e),void i.animateHeight()):void(c!==!0?i.animateSlide(h,function(){i.postSlide(e)}):i.postSlide(e))))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?e.options.rtl===!1?"left":"right":360>=d&&d>=315?e.options.rtl===!1?"left":"right":d>=135&&225>=d?e.options.rtl===!1?"right":"left":e.options.verticalSwiping===!0?d>=35&&135>=d?"down":"up":"vertical"},b.prototype.swipeEnd=function(a){var c,d,b=this;if(b.dragging=!1,b.interrupted=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.edgeHit===!0&&b.$slider.trigger("edge",[b,b.swipeDirection()]),b.touchObject.swipeLength>=b.touchObject.minSwipe){switch(d=b.swipeDirection()){case"left":case"down":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide+b.getSlideCount()):b.currentSlide+b.getSlideCount(),b.currentDirection=0;break;case"right":case"up":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide-b.getSlideCount()):b.currentSlide-b.getSlideCount(),b.currentDirection=1}"vertical"!=d&&(b.slideHandler(c),b.touchObject={},b.$slider.trigger("swipe",[b,d]))}else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,b.options.verticalSwiping===!0&&(b.touchObject.minSwipe=b.listHeight/b.options.touchThreshold),a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var d,e,f,g,h,b=this;return h=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||h&&1!==h.length?!1:(d=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==h?h[0].pageX:a.clientX,b.touchObject.curY=void 0!==h?h[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),b.options.verticalSwiping===!0&&(b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curY-b.touchObject.startY,2)))),e=b.swipeDirection(),"vertical"!==e?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),g=(b.options.rtl===!1?1:-1)*(b.touchObject.curX>b.touchObject.startX?1:-1),b.options.verticalSwiping===!0&&(g=b.touchObject.curY>b.touchObject.startY?1:-1),f=b.touchObject.swipeLength,b.touchObject.edgeHit=!1,b.options.infinite===!1&&(0===b.currentSlide&&"right"===e||b.currentSlide>=b.getDotCount()&&"left"===e)&&(f=b.touchObject.swipeLength*b.options.edgeFriction,b.touchObject.edgeHit=!0),b.options.vertical===!1?b.swipeLeft=d+f*g:b.swipeLeft=d+f*(b.$list.height()/b.listWidth)*g,b.options.verticalSwiping===!0&&(b.swipeLeft=d+f*g),b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):void b.setCSS(b.swipeLeft)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return b.interrupted=!0,1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,void(b.dragging=!0))},b.prototype.unfilterSlides=b.prototype.slickUnfilter=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.remove(),b.$nextArrow&&b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},b.prototype.unslick=function(a){var b=this;b.$slider.trigger("unslick",[b,a]),b.destroy()},b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&!a.options.infinite&&(a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-1&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active").attr("aria-hidden","true"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden","false"))},b.prototype.visibility=function(){var a=this;a.options.autoplay&&(document[a.hidden]?a.interrupted=!0:a.interrupted=!1)},a.fn.slick=function(){var f,g,a=this,c=arguments[0],d=Array.prototype.slice.call(arguments,1),e=a.length;for(f=0;e>f;f++)if("object"==typeof c||"undefined"==typeof c?a[f].slick=new b(a[f],c):g=a[f].slick[c].apply(a[f].slick,d),"undefined"!=typeof g)return g;return a}});

/* PHP JS - Number Format - http://phpjs.org/functions/number_format/*/
function qd_number_format(b,c,d,e){b=(b+"").replace(/[^0-9+\-Ee.]/g,"");b=isFinite(+b)?+b:0;c=isFinite(+c)?Math.abs(c):0;e="undefined"===typeof e?",":e;d="undefined"===typeof d?".":d;var a="",a=function(a,b){var c=Math.pow(10,b);return""+(Math.round(a*c)/c).toFixed(b)},a=(c?a(b,c):""+Math.round(b)).split(".");3<a[0].length&&(a[0]=a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,e));(a[1]||"").length<c&&(a[1]=a[1]||"",a[1]+=Array(c-a[1].length+1).join("0"));return a.join(d)};

/* $("a").getParent("ul"); // 3 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT */
(function(a){a.fn.getParent=a.fn.closest})(jQuery);

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
/* Quatro Digital - jQuery Ajax Queue // 4.0 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT <http://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT> */
(function(d){if("function"!==typeof d.qdAjax){var a={};d.qdAjaxQueue=a;150>parseInt((d.fn.jquery.replace(/[^0-9]+/g,"")+"000").slice(0,3),10)&&console&&"function"==typeof console.error&&console.error();d.qdAjax=function(f){try{var b=d.extend({},{url:"",type:"GET",data:"",success:function(){},error:function(){},complete:function(){},clearQueueDelay:5},f),e;e="object"===typeof b.data?JSON.stringify(b.data):b.data.toString();var c=encodeURIComponent(b.url+"|"+b.type+"|"+e);a[c]=a[c]||{};"undefined"==
typeof a[c].jqXHR?a[c].jqXHR=d.ajax(b):(a[c].jqXHR.done(b.success),a[c].jqXHR.fail(b.error),a[c].jqXHR.always(b.complete));a[c].jqXHR.always(function(){isNaN(parseInt(b.clearQueueDelay))||setTimeout(function(){a[c].jqXHR=void 0},b.clearQueueDelay)});return a[c].jqXHR}catch(g){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Problemas no $.qdAjax :( . Detalhes: "+g.message)}};d.qdAjax.version="4.0"}})(jQuery);
/* Quatro Digital Simple Cart // 4.15 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */

	
/*PHP JS - Number Format - http://phpjs.org/functions/number_format/*/
function qd_number_format(b,c,d,e){b=(b+"").replace(/[^0-9+\-Ee.]/g,"");b=isFinite(+b)?+b:0;c=isFinite(+c)?Math.abs(c):0;e="undefined"===typeof e?",":e;d="undefined"===typeof d?".":d;var a="",a=function(a,b){var c=Math.pow(10,b);return""+(Math.round(a*c)/c).toFixed(b)},a=(c?a(b,c):""+Math.round(b)).split(".");3<a[0].length&&(a[0]=a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,e));(a[1]||"").length<c&&(a[1]=a[1]||"",a[1]+=Array(c-a[1].length+1).join("0"));return a.join(d)};

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
var _0xde97=['completePopulated','object','error','clearQueueDelay','jqXHR','ajax','readyState','textStatus','version','2.1','/produto/sku/','QD_smartStockAvailable','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','undefined','alerta','toLowerCase','info','apply','warn','qd-ssa-sku-no-selected','addClass','qd-ssa-sku-selected','SkuSellersInformation','attr','data-qd-ssa-qtt','each','hide','qd-ssa-show','filter','[data-qd-ssa-text=\x22','length','[data-qd-ssa-text=\x22default\x22]','qd-ssa-hide','removeClass','html','replace','#qtt','show','qd-ssa-on','qd-ssa-skus-','skus','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','message','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','split','AvailableQuantity','trigger','QuatroDigital.ssa.prodUnavailable','off','vtex.sku.selected.QD','vinyzvk%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','join','toUpperCase','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','qdPlugin','initialSkuSelected','prod','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','unavailable','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','available','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','function','qdAjax','extend','url','opts','push','success','call','complete','parameters','callbackFns','successPopulated','boolean','errorPopulated'];(function(_0x51af96,_0x2494ea){var _0x7c9730=function(_0x3f93ae){while(--_0x3f93ae){_0x51af96['push'](_0x51af96['shift']());}};_0x7c9730(++_0x2494ea);}(_0xde97,0x142));var _0x7de9=function(_0x1b2ff7,_0x12a034){_0x1b2ff7=_0x1b2ff7-0x0;var _0x31656a=_0xde97[_0x1b2ff7];return _0x31656a;};(function(_0x4df139){if(_0x7de9('0x0')!==typeof _0x4df139[_0x7de9('0x1')]){var _0x5b9756={};_0x4df139['qdAjaxQueue']=_0x5b9756;_0x4df139[_0x7de9('0x1')]=function(_0x3efb03){var _0xa991cd=_0x4df139[_0x7de9('0x2')]({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x3efb03);var _0xe6573a=escape(encodeURIComponent(_0xa991cd[_0x7de9('0x3')]));_0x5b9756[_0xe6573a]=_0x5b9756[_0xe6573a]||{};_0x5b9756[_0xe6573a][_0x7de9('0x4')]=_0x5b9756[_0xe6573a][_0x7de9('0x4')]||[];_0x5b9756[_0xe6573a][_0x7de9('0x4')][_0x7de9('0x5')]({'success':function(_0xc06dcb,_0x5dc2e5,_0x59c771){_0xa991cd[_0x7de9('0x6')][_0x7de9('0x7')](this,_0xc06dcb,_0x5dc2e5,_0x59c771);},'error':function(_0x4fc4ea,_0xb12a39,_0x20e0ee){_0xa991cd['error']['call'](this,_0x4fc4ea,_0xb12a39,_0x20e0ee);},'complete':function(_0x5e9c1c,_0x365ceb){_0xa991cd[_0x7de9('0x8')][_0x7de9('0x7')](this,_0x5e9c1c,_0x365ceb);}});_0x5b9756[_0xe6573a][_0x7de9('0x9')]=_0x5b9756[_0xe6573a][_0x7de9('0x9')]||{'success':{},'error':{},'complete':{}};_0x5b9756[_0xe6573a][_0x7de9('0xa')]=_0x5b9756[_0xe6573a][_0x7de9('0xa')]||{};_0x5b9756[_0xe6573a][_0x7de9('0xa')][_0x7de9('0xb')]=_0x7de9('0xc')===typeof _0x5b9756[_0xe6573a][_0x7de9('0xa')][_0x7de9('0xb')]?_0x5b9756[_0xe6573a]['callbackFns']['successPopulated']:!0x1;_0x5b9756[_0xe6573a][_0x7de9('0xa')][_0x7de9('0xd')]=_0x7de9('0xc')===typeof _0x5b9756[_0xe6573a][_0x7de9('0xa')][_0x7de9('0xd')]?_0x5b9756[_0xe6573a][_0x7de9('0xa')][_0x7de9('0xd')]:!0x1;_0x5b9756[_0xe6573a][_0x7de9('0xa')][_0x7de9('0xe')]=_0x7de9('0xc')===typeof _0x5b9756[_0xe6573a]['callbackFns']['completePopulated']?_0x5b9756[_0xe6573a][_0x7de9('0xa')]['completePopulated']:!0x1;_0x3efb03=_0x4df139[_0x7de9('0x2')]({},_0xa991cd,{'success':function(_0x4fa023,_0x5d6928,_0x15a405){_0x5b9756[_0xe6573a][_0x7de9('0x9')][_0x7de9('0x6')]={'data':_0x4fa023,'textStatus':_0x5d6928,'jqXHR':_0x15a405};_0x5b9756[_0xe6573a][_0x7de9('0xa')][_0x7de9('0xb')]=!0x0;for(var _0x53ef1f in _0x5b9756[_0xe6573a][_0x7de9('0x4')])_0x7de9('0xf')===typeof _0x5b9756[_0xe6573a]['opts'][_0x53ef1f]&&(_0x5b9756[_0xe6573a]['opts'][_0x53ef1f]['success'][_0x7de9('0x7')](this,_0x4fa023,_0x5d6928,_0x15a405),_0x5b9756[_0xe6573a][_0x7de9('0x4')][_0x53ef1f][_0x7de9('0x6')]=function(){});},'error':function(_0x1411d1,_0x274463,_0x39c7a7){_0x5b9756[_0xe6573a]['parameters'][_0x7de9('0x10')]={'errorThrown':_0x39c7a7,'textStatus':_0x274463,'jqXHR':_0x1411d1};_0x5b9756[_0xe6573a][_0x7de9('0xa')][_0x7de9('0xd')]=!0x0;for(var _0x17acda in _0x5b9756[_0xe6573a]['opts'])_0x7de9('0xf')===typeof _0x5b9756[_0xe6573a]['opts'][_0x17acda]&&(_0x5b9756[_0xe6573a][_0x7de9('0x4')][_0x17acda][_0x7de9('0x10')][_0x7de9('0x7')](this,_0x1411d1,_0x274463,_0x39c7a7),_0x5b9756[_0xe6573a]['opts'][_0x17acda][_0x7de9('0x10')]=function(){});},'complete':function(_0x1b44d7,_0x4d6477){_0x5b9756[_0xe6573a]['parameters'][_0x7de9('0x8')]={'textStatus':_0x4d6477,'jqXHR':_0x1b44d7};_0x5b9756[_0xe6573a][_0x7de9('0xa')][_0x7de9('0xe')]=!0x0;for(var _0x398ad7 in _0x5b9756[_0xe6573a][_0x7de9('0x4')])_0x7de9('0xf')===typeof _0x5b9756[_0xe6573a]['opts'][_0x398ad7]&&(_0x5b9756[_0xe6573a][_0x7de9('0x4')][_0x398ad7][_0x7de9('0x8')][_0x7de9('0x7')](this,_0x1b44d7,_0x4d6477),_0x5b9756[_0xe6573a][_0x7de9('0x4')][_0x398ad7][_0x7de9('0x8')]=function(){});isNaN(parseInt(_0xa991cd[_0x7de9('0x11')]))||setTimeout(function(){_0x5b9756[_0xe6573a][_0x7de9('0x12')]=void 0x0;_0x5b9756[_0xe6573a]['opts']=void 0x0;_0x5b9756[_0xe6573a][_0x7de9('0x9')]=void 0x0;_0x5b9756[_0xe6573a][_0x7de9('0xa')]=void 0x0;},_0xa991cd['clearQueueDelay']);}});'undefined'===typeof _0x5b9756[_0xe6573a]['jqXHR']?_0x5b9756[_0xe6573a][_0x7de9('0x12')]=_0x4df139[_0x7de9('0x13')](_0x3efb03):_0x5b9756[_0xe6573a][_0x7de9('0x12')]&&_0x5b9756[_0xe6573a][_0x7de9('0x12')]['readyState']&&0x4==_0x5b9756[_0xe6573a][_0x7de9('0x12')][_0x7de9('0x14')]&&(_0x5b9756[_0xe6573a][_0x7de9('0xa')][_0x7de9('0xb')]&&_0x3efb03[_0x7de9('0x6')](_0x5b9756[_0xe6573a]['parameters'][_0x7de9('0x6')]['data'],_0x5b9756[_0xe6573a]['parameters']['success'][_0x7de9('0x15')],_0x5b9756[_0xe6573a]['parameters'][_0x7de9('0x6')][_0x7de9('0x12')]),_0x5b9756[_0xe6573a]['callbackFns'][_0x7de9('0xd')]&&_0x3efb03[_0x7de9('0x10')](_0x5b9756[_0xe6573a][_0x7de9('0x9')][_0x7de9('0x10')][_0x7de9('0x12')],_0x5b9756[_0xe6573a]['parameters'][_0x7de9('0x10')][_0x7de9('0x15')],_0x5b9756[_0xe6573a][_0x7de9('0x9')][_0x7de9('0x10')]['errorThrown']),_0x5b9756[_0xe6573a]['callbackFns']['completePopulated']&&_0x3efb03[_0x7de9('0x8')](_0x5b9756[_0xe6573a]['parameters'][_0x7de9('0x8')][_0x7de9('0x12')],_0x5b9756[_0xe6573a][_0x7de9('0x9')][_0x7de9('0x8')]['textStatus']));};_0x4df139[_0x7de9('0x1')][_0x7de9('0x16')]=_0x7de9('0x17');}}(jQuery));(function(_0x1175de){function _0x460fd0(_0x472eee,_0x293394){_0x11ed76[_0x7de9('0x1')]({'url':_0x7de9('0x18')+_0x472eee,'clearQueueDelay':null,'success':_0x293394,'error':function(){_0x5a429e('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!');}});}var _0x11ed76=jQuery;if('function'!==typeof _0x11ed76['fn'][_0x7de9('0x19')]){var _0x5a429e=function(_0x44da29,_0x1a244a){if('object'===typeof console){var _0x14a118;_0x7de9('0xf')===typeof _0x44da29?(_0x44da29[_0x7de9('0x1a')](_0x7de9('0x1b')),_0x14a118=_0x44da29):_0x14a118=[_0x7de9('0x1b')+_0x44da29];_0x7de9('0x1c')===typeof _0x1a244a||_0x7de9('0x1d')!==_0x1a244a['toLowerCase']()&&'aviso'!==_0x1a244a[_0x7de9('0x1e')]()?'undefined'!==typeof _0x1a244a&&_0x7de9('0x1f')===_0x1a244a[_0x7de9('0x1e')]()?console[_0x7de9('0x1f')][_0x7de9('0x20')](console,_0x14a118):console[_0x7de9('0x10')][_0x7de9('0x20')](console,_0x14a118):console[_0x7de9('0x21')][_0x7de9('0x20')](console,_0x14a118);}},_0x4ce33f={},_0x28197b=function(_0x2f6bff,_0x3ad08a){function _0x53cce4(_0x48cbfd){try{_0x2f6bff['removeClass'](_0x7de9('0x22'))[_0x7de9('0x23')](_0x7de9('0x24'));var _0x201221=_0x48cbfd[0x0][_0x7de9('0x25')][0x0]['AvailableQuantity'];_0x2f6bff[_0x7de9('0x26')](_0x7de9('0x27'),_0x201221);_0x2f6bff[_0x7de9('0x28')](function(){var _0x2f6bff=_0x11ed76(this)['find']('[data-qd-ssa-text]');if(0x1>_0x201221)return _0x2f6bff[_0x7de9('0x29')]()['addClass']('qd-ssa-hide')['removeClass'](_0x7de9('0x2a'));var _0x48cbfd=_0x2f6bff[_0x7de9('0x2b')](_0x7de9('0x2c')+_0x201221+'\x22]');_0x48cbfd=_0x48cbfd[_0x7de9('0x2d')]?_0x48cbfd:_0x2f6bff[_0x7de9('0x2b')](_0x7de9('0x2e'));_0x2f6bff[_0x7de9('0x29')]()['addClass'](_0x7de9('0x2f'))[_0x7de9('0x30')](_0x7de9('0x2a'));_0x48cbfd['html']((_0x48cbfd[_0x7de9('0x31')]()||'')[_0x7de9('0x32')](_0x7de9('0x33'),_0x201221));_0x48cbfd[_0x7de9('0x34')]()[_0x7de9('0x23')](_0x7de9('0x2a'))['removeClass'](_0x7de9('0x2f'));});}catch(_0x5ebc79){_0x5a429e(['Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20',_0x5ebc79['message']]);}}if(_0x2f6bff[_0x7de9('0x2d')]){_0x2f6bff[_0x7de9('0x23')](_0x7de9('0x35'));_0x2f6bff[_0x7de9('0x23')](_0x7de9('0x22'));try{_0x2f6bff[_0x7de9('0x23')](_0x7de9('0x36')+vtxctx[_0x7de9('0x37')]['split'](';')[_0x7de9('0x2d')]);}catch(_0x1191c8){_0x5a429e([_0x7de9('0x38'),_0x1191c8[_0x7de9('0x39')]]);}_0x11ed76(window)['on'](_0x7de9('0x3a'),function(_0x4ca920,_0x43938b,_0x317ff4){try{_0x460fd0(_0x317ff4[_0x7de9('0x3b')],function(_0x1f7941){_0x53cce4(_0x1f7941);0x1===vtxctx[_0x7de9('0x37')][_0x7de9('0x3c')](';')[_0x7de9('0x2d')]&&0x0==_0x1f7941[0x0][_0x7de9('0x25')][0x0][_0x7de9('0x3d')]&&_0x11ed76(window)[_0x7de9('0x3e')](_0x7de9('0x3f'));});}catch(_0xaaeb22){_0x5a429e(['Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20',_0xaaeb22[_0x7de9('0x39')]]);}});_0x11ed76(window)[_0x7de9('0x40')](_0x7de9('0x41'));_0x11ed76(window)['on'](_0x7de9('0x3f'),function(){_0x2f6bff[_0x7de9('0x23')]('qd-ssa-sku-prod-unavailable')[_0x7de9('0x29')]();});}};_0x1175de=function(_0x441cbf){var _0x26bd82={'a':_0x7de9('0x42')};return function(_0x4d586e){var _0x44c4c4=function(_0x57b4d2){return _0x57b4d2;};var _0x260a72=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4d586e=_0x4d586e['d'+_0x260a72[0x10]+'c'+_0x260a72[0x11]+'m'+_0x44c4c4(_0x260a72[0x1])+'n'+_0x260a72[0xd]]['l'+_0x260a72[0x12]+'c'+_0x260a72[0x0]+'ti'+_0x44c4c4('o')+'n'];var _0x5a297b=function(_0x53a4f7){return escape(encodeURIComponent(_0x53a4f7[_0x7de9('0x32')](/\./g,'¨')[_0x7de9('0x32')](/[a-zA-Z]/g,function(_0xfe06b0){return String[_0x7de9('0x43')](('Z'>=_0xfe06b0?0x5a:0x7a)>=(_0xfe06b0=_0xfe06b0[_0x7de9('0x44')](0x0)+0xd)?_0xfe06b0:_0xfe06b0-0x1a);})));};var _0x2ac7bc=_0x5a297b(_0x4d586e[[_0x260a72[0x9],_0x44c4c4('o'),_0x260a72[0xc],_0x260a72[_0x44c4c4(0xd)]][_0x7de9('0x45')]('')]);_0x5a297b=_0x5a297b((window[['js',_0x44c4c4('no'),'m',_0x260a72[0x1],_0x260a72[0x4][_0x7de9('0x46')](),'ite']['join']('')]||'---')+['.v',_0x260a72[0xd],'e',_0x44c4c4('x'),'co',_0x44c4c4('mm'),_0x7de9('0x47'),_0x260a72[0x1],'.c',_0x44c4c4('o'),'m.',_0x260a72[0x13],'r'][_0x7de9('0x45')](''));for(var _0x28088f in _0x26bd82){if(_0x5a297b===_0x28088f+_0x26bd82[_0x28088f]||_0x2ac7bc===_0x28088f+_0x26bd82[_0x28088f]){var _0x15d663='tr'+_0x260a72[0x11]+'e';break;}_0x15d663='f'+_0x260a72[0x0]+'ls'+_0x44c4c4(_0x260a72[0x1])+'';}_0x44c4c4=!0x1;-0x1<_0x4d586e[[_0x260a72[0xc],'e',_0x260a72[0x0],'rc',_0x260a72[0x9]][_0x7de9('0x45')]('')][_0x7de9('0x48')](_0x7de9('0x49'))&&(_0x44c4c4=!0x0);return[_0x15d663,_0x44c4c4];}(_0x441cbf);}(window);if(!eval(_0x1175de[0x0]))return _0x1175de[0x1]?_0x5a429e('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x11ed76['fn'][_0x7de9('0x19')]=function(_0x1288df){var _0x13c83d=_0x11ed76(this);_0x1288df=_0x11ed76[_0x7de9('0x2')](!0x0,{},_0x4ce33f,_0x1288df);_0x13c83d[_0x7de9('0x4a')]=new _0x28197b(_0x13c83d,_0x1288df);try{_0x7de9('0xf')===typeof _0x11ed76['fn'][_0x7de9('0x19')][_0x7de9('0x4b')]&&_0x11ed76(window)[_0x7de9('0x3e')]('QuatroDigital.ssa.skuSelected',[_0x11ed76['fn']['QD_smartStockAvailable'][_0x7de9('0x4b')][_0x7de9('0x4c')],_0x11ed76['fn']['QD_smartStockAvailable'][_0x7de9('0x4b')][_0x7de9('0x3b')]]);}catch(_0x18a044){_0x5a429e([_0x7de9('0x4d'),_0x18a044[_0x7de9('0x39')]]);}_0x11ed76['fn'][_0x7de9('0x19')][_0x7de9('0x4e')]&&_0x11ed76(window)['trigger']('QuatroDigital.ssa.prodUnavailable');return _0x13c83d;};_0x11ed76(window)['on']('vtex.sku.selected.QD',function(_0x500eb5,_0x34036e,_0x13e7c0){try{_0x11ed76['fn']['QD_smartStockAvailable'][_0x7de9('0x4b')]={'prod':_0x34036e,'sku':_0x13e7c0},_0x11ed76(this)[_0x7de9('0x40')](_0x500eb5);}catch(_0x2eefd0){_0x5a429e([_0x7de9('0x4f'),_0x2eefd0[_0x7de9('0x39')]]);}});_0x11ed76(window)['on'](_0x7de9('0x50'),function(_0x112110,_0x1c7b7a,_0x150ad2){try{for(var _0x37d252=_0x150ad2['length'],_0x4070ad=_0x1c7b7a=0x0;_0x4070ad<_0x37d252&&!_0x150ad2[_0x4070ad][_0x7de9('0x51')];_0x4070ad++)_0x1c7b7a+=0x1;_0x37d252<=_0x1c7b7a&&(_0x11ed76['fn'][_0x7de9('0x19')][_0x7de9('0x4e')]=!0x0);_0x11ed76(this)[_0x7de9('0x40')](_0x112110);}catch(_0x5aac87){_0x5a429e([_0x7de9('0x52'),_0x5aac87[_0x7de9('0x39')]]);}});_0x11ed76(function(){_0x11ed76(_0x7de9('0x53'))[_0x7de9('0x19')]();});}}(window));
/* Quatro Digital - Smart Buy Button // 2.0 // Carlos Vinicius // Todos os direitos reservados */
(function(u){try{var a=jQuery,r=a({}),n=function(a,d){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var b;"object"===typeof a?(a.unshift("[Quatro Digital - Buy Button]\n"),b=a):b=["[Quatro Digital - Buy Button]\n"+a];if("undefined"===typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===d.toLowerCase())try{console.info.apply(console,b)}catch(h){try{console.info(b.join("\n"))}catch(l){}}else try{console.error.apply(console,
b)}catch(h){try{console.error(b.join("\n"))}catch(l){}}else try{console.warn.apply(console,b)}catch(h){try{console.warn(b.join("\n"))}catch(l){}}}},t={timeRemoveNewItemClass:5E3,isSmartCheckout:!0,buyButton:".productInformationWrapper  a.buy-button",buyQtt:"input.buy-in-page-quantity",selectSkuMsg:"javascript:",autoWatchBuyButton:!0,buyIfQuantityZeroed:!1,fakeRequest:!1,productPageCallback:function(g,d,b){a("body").is(".productQuickView")&&("success"===d?alert("Produto adicionado ao carrinho!"):(alert("Ooops! Algo saiu errado ao tentar adicionar seu produto ao carrinho. \n Vou te redirecionar para o carrinho."),
("object"===typeof parent?parent:document).location.href=b))},isProductPage:function(){return a("body").is("#produto, .produto")},execDefaultAction:function(a){return!1},allowBuyClick:function(){return!0},callback:function(){},asyncCallback:function(){}};a.QD_buyButton=function(g,d,b){function h(a){f.isSmartCheckout?a.data("qd-bb-click-active")||(a.data("qd-bb-click-active",1),a.on("click.qd_bb_buy_sc",function(a){if(!f.allowBuyClick())return!0;if(!0!==m.clickBuySmartCheckout.call(this))return a.preventDefault(),
!1})):alert("M\u00e9todo descontinuado!")}function l(e){e=e||a(f.buyButton);e.each(function(){var c=a(this);c.is(".qd-sbb-on")||(c.addClass("qd-sbb-on"),c.is(".btn-add-buy-button-asynchronous")&&!c.is(".remove-href")||c.data("qd-bb-active")||(c.data("qd-bb-active",1),c.children(".qd-bb-productAdded").length||c.append('<span class="qd-bb-productAdded"><i class="icon-thumbs-up"></i> <span>Produto adicionado</span></span>'),c.is(".buy-in-page-button")&&f.isProductPage()&&p.call(c),h(c)))});f.isProductPage()&&
!e.length&&n("Oooops!\nAparentemente esta \u00e9 uma p\u00e1gina de produto por\u00e9m n\u00e3o encontrei nenhum bot\u00e3o comprar!\nVerifique se \u00e9 este mesmo o seletor: '"+e.selector+"'.","info")}var p,f=b||f,k=a(g),m=this;window._Quatro_Digital_dropDown=window._Quatro_Digital_dropDown||{};window._QuatroDigital_CartData=window._QuatroDigital_CartData||{};m.prodAdd=function(e,c){k.addClass("qd-bb-itemAddCartWrapper qd-bb-lightBoxProdAdd");a("body").addClass("qd-bb-lightBoxBodyProdAdd");var b=
a(f.buyButton).filter("[href='"+(e.attr("href")||"---")+"']").add(e);b.addClass("qd-bb-itemAddBuyButtonWrapper");setTimeout(function(){k.removeClass("qd-bb-itemAddCartWrapper");b.removeClass("qd-bb-itemAddBuyButtonWrapper")},f.timeRemoveNewItemClass);window._Quatro_Digital_dropDown.getOrderForm=void 0;if("undefined"!==typeof d&&"function"===typeof d.getCartInfoByUrl)return f.isSmartCheckout||(n("fun\u00e7\u00e3o descontinuada"),d.getCartInfoByUrl()),window._QuatroDigital_DropDown.getOrderForm=void 0,
d.getCartInfoByUrl(function(c){window._Quatro_Digital_dropDown.getOrderForm=c;a.fn.simpleCart(!0,void 0,!0)},{lastSku:c});window._Quatro_Digital_dropDown.allowUpdate=!0;a.fn.simpleCart(!0);a(window).trigger("QuatroDigital.qd_sc_prodAdd",[e,c,b])};(function(){if(f.isSmartCheckout&&f.autoWatchBuyButton){var e=a(".btn-add-buy-button-asynchronous");e.length&&l(e)}})();p=function(){var e=a(this);"undefined"!==typeof e.data("buyButton")?(e.unbind("click"),h(e)):(e.bind("mouseenter.qd_bb_buy_sc",function(c){e.unbind("click");
h(e);a(this).unbind(c)}),a(window).load(function(){e.unbind("click");h(e);e.unbind("mouseenter.qd_bb_buy_sc")}))};m.clickBuySmartCheckout=function(){var e=a(this),c=e.attr("href")||"";if(-1<c.indexOf(f.selectSkuMsg))return!0;c=c.replace(/redirect\=(false|true)/ig,"").replace("?","?redirect=false&").replace(/\&\&/ig,"&");if(f.execDefaultAction(e))return e.attr("href",c.replace("redirect=false","redirect=true")),!0;c=c.replace(/http.?:/i,"");r.queue(function(b){if(!f.buyIfQuantityZeroed&&!/(&|\?)qty\=[1-9][0-9]*/ig.test(c))return b();
var d=function(b,d){var g=c.match(/sku\=([0-9]+)/ig),h=[],l;if("object"===typeof g&&null!==g)for(var k=g.length-1;0<=k;k--)l=parseInt(g[k].replace(/sku\=/ig,"")),isNaN(l)||h.push(l);f.productPageCallback.call(this,b,d,c);m.buyButtonClickCallback.call(this,b,d,c,h);m.prodAdd(e,c.split("ku=").pop().split("&").shift());"function"===typeof f.asyncCallback&&f.asyncCallback.call(this);a(window).trigger("productAddedToCart");a(window).trigger("cartProductAdded.vtex")};f.fakeRequest?(d(null,"success"),b()):
a.ajax({url:c,complete:d}).always(function(){b()})})};m.buyButtonClickCallback=function(a,c,b,d){try{"success"===c&&"object"===typeof window.parent&&"function"===typeof window.parent._QuatroDigital_prodBuyCallback&&window.parent._QuatroDigital_prodBuyCallback(a,c,b,d)}catch(v){n("Problemas ao tentar comunicar a p\u00e1gina que o produto foi aicionado ao carrinho.")}};l();"function"===typeof f.callback?f.callback.call(this):n("Callback n\u00e3o \u00e9 uma fun\u00e7\u00e3o")};var k=a.Callbacks();a.fn.QD_buyButton=
function(g,d){var b=a(this);"undefined"!==typeof d||"object"!==typeof g||g instanceof a||(d=g,g=void 0);var h;k.add(function(){b.children(".qd-bb-itemAddWrapper").length||b.prepend('<span class="qd-bb-itemAddWrapper"><span class="qd-bb-itemAddIco"></span></span>');h=new a.QD_buyButton(b,g,a.extend({},t,d))});k.fire();a(window).on("QuatroDigital.qd_bb_prod_add",function(a,b,d){h.prodAdd(b,d)});return a.extend(b,h)};var q=0;a(document).ajaxSend(function(a,d,b){-1<b.url.toLowerCase().indexOf("/checkout/cart/add")&&
(q=(b.url.match(/sku\=([0-9]+)/i)||[""]).pop())});a(window).bind("productAddedToCart.qdSbbVtex",function(){a(window).trigger("QuatroDigital.qd_bb_prod_add",[new a,q])});a(document).ajaxStop(function(){k.fire()})}catch(g){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Oooops! ",g)}})(this);
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs();a.trigger("QuatroDigital.pt_callback",[a])}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return a.length?$.extend({},a,new b(a)):a},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();
/* Quatro Digital Amazing Menu */
var _0xe706=['ul[itemscope]','li\x20>ul','qd-am-has-ul','children',':not(ul)','qd-am-elem-','replaceSpecialChars','>li','qdAmAddNdx','qd-amazing-menu','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','add','-li','QuatroDigital.am.callback','exec','.qd_amazing_menu_auto','getParent','closest','function','QD_amazingMenu','/qd-amazing-menu','object','undefined','error','info','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','apply','join','each','addClass','qd-am-li-','qd-am-first','last','qd-am-last','vinyzvk%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','---','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','find','.qd_am_code','.qd-am-banner','filter','.qd-am-collection','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','url','attr','data-qdam-value','.box-banner','clone','insertBefore','hide','qd-am-content-loaded','text','trim','[class*=\x27colunas\x27]','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','trigger'];(function(_0x56740a,_0x568894){var _0x257144=function(_0x2b8cc5){while(--_0x2b8cc5){_0x56740a['push'](_0x56740a['shift']());}};_0x257144(++_0x568894);}(_0xe706,0xa3));var _0x6e70=function(_0x3c1a4e,_0x36dabf){_0x3c1a4e=_0x3c1a4e-0x0;var _0x155a91=_0xe706[_0x3c1a4e];return _0x155a91;};(function(_0x454c8f){_0x454c8f['fn'][_0x6e70('0x0')]=_0x454c8f['fn'][_0x6e70('0x1')];}(jQuery));(function(_0x5e8446){var _0x2cae77;var _0x315629=jQuery;if(_0x6e70('0x2')!==typeof _0x315629['fn'][_0x6e70('0x3')]){var _0x142c27={'url':_0x6e70('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0x376a8d=function(_0x506db9,_0x1b0389){if(_0x6e70('0x5')===typeof console&&_0x6e70('0x6')!==typeof console[_0x6e70('0x7')]&&_0x6e70('0x6')!==typeof console[_0x6e70('0x8')]&&_0x6e70('0x6')!==typeof console[_0x6e70('0x9')]){var _0x954545;_0x6e70('0x5')===typeof _0x506db9?(_0x506db9[_0x6e70('0xa')](_0x6e70('0xb')),_0x954545=_0x506db9):_0x954545=[_0x6e70('0xb')+_0x506db9];if(_0x6e70('0x6')===typeof _0x1b0389||_0x6e70('0xc')!==_0x1b0389[_0x6e70('0xd')]()&&'aviso'!==_0x1b0389['toLowerCase']())if(_0x6e70('0x6')!==typeof _0x1b0389&&_0x6e70('0x8')===_0x1b0389[_0x6e70('0xd')]())try{console[_0x6e70('0x8')][_0x6e70('0xe')](console,_0x954545);}catch(_0x310eb7){try{console[_0x6e70('0x8')](_0x954545[_0x6e70('0xf')]('\x0a'));}catch(_0x5dfbaa){}}else try{console['error']['apply'](console,_0x954545);}catch(_0x257e81){try{console['error'](_0x954545['join']('\x0a'));}catch(_0x304716){}}else try{console[_0x6e70('0x9')]['apply'](console,_0x954545);}catch(_0x24f3ac){try{console['warn'](_0x954545[_0x6e70('0xf')]('\x0a'));}catch(_0x161f23){}}}};_0x315629['fn']['qdAmAddNdx']=function(){var _0x49029f=_0x315629(this);_0x49029f[_0x6e70('0x10')](function(_0x5ea7a5){_0x315629(this)[_0x6e70('0x11')](_0x6e70('0x12')+_0x5ea7a5);});_0x49029f['first']()['addClass'](_0x6e70('0x13'));_0x49029f[_0x6e70('0x14')]()[_0x6e70('0x11')](_0x6e70('0x15'));return _0x49029f;};_0x315629['fn'][_0x6e70('0x3')]=function(){};_0x5e8446=function(_0xcdf9f2){var _0x1b2453={'a':_0x6e70('0x16')};return function(_0x29326f){var _0xb29a2a=function(_0x4a0cfe){return _0x4a0cfe;};var _0x228350=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x29326f=_0x29326f['d'+_0x228350[0x10]+'c'+_0x228350[0x11]+'m'+_0xb29a2a(_0x228350[0x1])+'n'+_0x228350[0xd]]['l'+_0x228350[0x12]+'c'+_0x228350[0x0]+'ti'+_0xb29a2a('o')+'n'];var _0x344b65=function(_0x27b294){return escape(encodeURIComponent(_0x27b294['replace'](/\./g,'¨')[_0x6e70('0x17')](/[a-zA-Z]/g,function(_0xa5d49){return String[_0x6e70('0x18')](('Z'>=_0xa5d49?0x5a:0x7a)>=(_0xa5d49=_0xa5d49['charCodeAt'](0x0)+0xd)?_0xa5d49:_0xa5d49-0x1a);})));};var _0x10fc91=_0x344b65(_0x29326f[[_0x228350[0x9],_0xb29a2a('o'),_0x228350[0xc],_0x228350[_0xb29a2a(0xd)]]['join']('')]);_0x344b65=_0x344b65((window[['js',_0xb29a2a('no'),'m',_0x228350[0x1],_0x228350[0x4]['toUpperCase'](),'ite'][_0x6e70('0xf')]('')]||_0x6e70('0x19'))+['.v',_0x228350[0xd],'e',_0xb29a2a('x'),'co',_0xb29a2a('mm'),'erc',_0x228350[0x1],'.c',_0xb29a2a('o'),'m.',_0x228350[0x13],'r'][_0x6e70('0xf')](''));for(var _0x1196ed in _0x1b2453){if(_0x344b65===_0x1196ed+_0x1b2453[_0x1196ed]||_0x10fc91===_0x1196ed+_0x1b2453[_0x1196ed]){var _0x5f268f='tr'+_0x228350[0x11]+'e';break;}_0x5f268f='f'+_0x228350[0x0]+'ls'+_0xb29a2a(_0x228350[0x1])+'';}_0xb29a2a=!0x1;-0x1<_0x29326f[[_0x228350[0xc],'e',_0x228350[0x0],'rc',_0x228350[0x9]][_0x6e70('0xf')]('')][_0x6e70('0x1a')](_0x6e70('0x1b'))&&(_0xb29a2a=!0x0);return[_0x5f268f,_0xb29a2a];}(_0xcdf9f2);}(window);if(!eval(_0x5e8446[0x0]))return _0x5e8446[0x1]?_0x376a8d('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x54a5fe=function(_0x2c4d37){var _0x3af17f=_0x2c4d37[_0x6e70('0x1c')](_0x6e70('0x1d'));var _0x43fee0=_0x3af17f['filter'](_0x6e70('0x1e'));var _0x406f29=_0x3af17f[_0x6e70('0x1f')](_0x6e70('0x20'));if(_0x43fee0[_0x6e70('0x21')]||_0x406f29[_0x6e70('0x21')])_0x43fee0[_0x6e70('0x22')]()[_0x6e70('0x11')](_0x6e70('0x23')),_0x406f29[_0x6e70('0x22')]()['addClass'](_0x6e70('0x24')),_0x315629['qdAjax']({'url':_0x2cae77[_0x6e70('0x25')],'dataType':'html','success':function(_0xdd7cc1){var _0x2722e8=_0x315629(_0xdd7cc1);_0x43fee0[_0x6e70('0x10')](function(){var _0xdd7cc1=_0x315629(this);var _0x38c40d=_0x2722e8[_0x6e70('0x1c')]('img[alt=\x27'+_0xdd7cc1[_0x6e70('0x26')](_0x6e70('0x27'))+'\x27]');_0x38c40d['length']&&(_0x38c40d[_0x6e70('0x10')](function(){_0x315629(this)[_0x6e70('0x0')](_0x6e70('0x28'))[_0x6e70('0x29')]()[_0x6e70('0x2a')](_0xdd7cc1);}),_0xdd7cc1[_0x6e70('0x2b')]());})[_0x6e70('0x11')](_0x6e70('0x2c'));_0x406f29[_0x6e70('0x10')](function(){var _0xdd7cc1={};var _0x4d32d8=_0x315629(this);_0x2722e8[_0x6e70('0x1c')]('h2')['each'](function(){if(_0x315629(this)[_0x6e70('0x2d')]()[_0x6e70('0x2e')]()[_0x6e70('0xd')]()==_0x4d32d8[_0x6e70('0x26')](_0x6e70('0x27'))[_0x6e70('0x2e')]()[_0x6e70('0xd')]())return _0xdd7cc1=_0x315629(this),!0x1;});_0xdd7cc1[_0x6e70('0x21')]&&(_0xdd7cc1[_0x6e70('0x10')](function(){_0x315629(this)[_0x6e70('0x0')](_0x6e70('0x2f'))[_0x6e70('0x29')]()[_0x6e70('0x2a')](_0x4d32d8);}),_0x4d32d8['hide']());})['addClass']('qd-am-content-loaded');},'error':function(){_0x376a8d(_0x6e70('0x30')+_0x2cae77[_0x6e70('0x25')]+_0x6e70('0x31'));},'complete':function(){_0x2cae77[_0x6e70('0x32')][_0x6e70('0x33')](this);_0x315629(window)[_0x6e70('0x34')]('QuatroDigital.am.ajaxCallback',_0x2c4d37);},'clearQueueDelay':0xbb8});};_0x315629[_0x6e70('0x3')]=function(_0x9e7ad2){var _0x1c5cde=_0x9e7ad2[_0x6e70('0x1c')](_0x6e70('0x35'))[_0x6e70('0x10')](function(){var _0x246e61=_0x315629(this);if(!_0x246e61[_0x6e70('0x21')])return _0x376a8d(['UL\x20do\x20menu\x20não\x20encontrada',_0x9e7ad2],_0x6e70('0xc'));_0x246e61[_0x6e70('0x1c')](_0x6e70('0x36'))[_0x6e70('0x22')]()[_0x6e70('0x11')](_0x6e70('0x37'));_0x246e61[_0x6e70('0x1c')]('li')['each'](function(){var _0x56ea6e=_0x315629(this);var _0x5ae898=_0x56ea6e[_0x6e70('0x38')](_0x6e70('0x39'));_0x5ae898[_0x6e70('0x21')]&&_0x56ea6e[_0x6e70('0x11')](_0x6e70('0x3a')+_0x5ae898['first']()[_0x6e70('0x2d')]()[_0x6e70('0x2e')]()[_0x6e70('0x3b')]()['replace'](/\./g,'')['replace'](/\s/g,'-')['toLowerCase']());});var _0x1ddf52=_0x246e61['find'](_0x6e70('0x3c'))[_0x6e70('0x3d')]();_0x246e61[_0x6e70('0x11')](_0x6e70('0x3e'));_0x1ddf52=_0x1ddf52['find'](_0x6e70('0x3f'));_0x1ddf52['each'](function(){var _0x9f5b94=_0x315629(this);_0x9f5b94[_0x6e70('0x1c')](_0x6e70('0x3c'))[_0x6e70('0x3d')]()['addClass'](_0x6e70('0x40'));_0x9f5b94[_0x6e70('0x11')](_0x6e70('0x41'));_0x9f5b94[_0x6e70('0x22')]()[_0x6e70('0x11')](_0x6e70('0x42'));});_0x1ddf52[_0x6e70('0x11')]('qd-am-dropdown');var _0x5f1c92=0x0,_0x5e8446=function(_0x10de2a){_0x5f1c92+=0x1;_0x10de2a=_0x10de2a[_0x6e70('0x38')]('li')[_0x6e70('0x38')]('*');_0x10de2a[_0x6e70('0x21')]&&(_0x10de2a[_0x6e70('0x11')]('qd-am-level-'+_0x5f1c92),_0x5e8446(_0x10de2a));};_0x5e8446(_0x246e61);_0x246e61[_0x6e70('0x43')](_0x246e61['find']('ul'))[_0x6e70('0x10')](function(){var _0x3836e4=_0x315629(this);_0x3836e4['addClass']('qd-am-'+_0x3836e4[_0x6e70('0x38')]('li')[_0x6e70('0x21')]+_0x6e70('0x44'));});});_0x54a5fe(_0x1c5cde);_0x2cae77['callback']['call'](this);_0x315629(window)[_0x6e70('0x34')](_0x6e70('0x45'),_0x9e7ad2);};_0x315629['fn'][_0x6e70('0x3')]=function(_0x79653){var _0x2e25d5=_0x315629(this);if(!_0x2e25d5[_0x6e70('0x21')])return _0x2e25d5;_0x2cae77=_0x315629['extend']({},_0x142c27,_0x79653);_0x2e25d5[_0x6e70('0x46')]=new _0x315629[(_0x6e70('0x3'))](_0x315629(this));return _0x2e25d5;};_0x315629(function(){_0x315629(_0x6e70('0x47'))[_0x6e70('0x3')]();});}}(this));
/* Quatro Digital Smart Cart */
var _0xb794=['buyButton','qd-bb-active','children','append','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','.buy-in-page-button','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','prodAdd','[href=\x27','---','qd-bb-itemAddBuyButtonWrapper','timeRemoveNewItemClass','getCartInfoByUrl','função\x20descontinuada','_Quatro_Digital_dropDown','autoWatchBuyButton','.btn-add-buy-button-asynchronous','click','mouseenter.qd_bb_buy_sc','unbind','load','indexOf','selectSkuMsg','?redirect=false&','execDefaultAction','redirect=false','redirect=true','queue','buyIfQuantityZeroed','test','match','push','productPageCallback','buyButtonClickCallback','split','pop','shift','asyncCallback','productAddedToCart','cartProductAdded.vtex','fakeRequest','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','prepend','QuatroDigital.qd_bb_prod_add','ajaxSend','/checkout/cart/add','pow','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','allowUpdate','QD_dropDownCart','ite','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','name','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','keyup.qd_ddc_closeFn','keyCode','qd-bb-lightBoxBodyProdAdd','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','click.qd_ddc_scrollDown','val','keyup.qd_ddc_cep','shippingCalculate','mouseenter.qd_ddc_hover','texts','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','linkCart','continueShopping','.qd-ddc-checkout','.qd-ddc-infoTotal','shippingForm','.qd-ddc-emptyCart\x20p','cartContainer','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','.qd-ddc-infoAllTotal','allTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','.qd-ddc-wrapper','qd-ddc-prodLoaded','smartCheckout','_QuatroDigital_AmountProduct','exec','Este\x20método\x20esta\x20descontinuado!','cartIsEmpty','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','meta[name=currency]','.qd-ddc-quantity','.qd-ddc-remove','.qd-ddc-image','imageUrl','appendTo','.qd-ddc-shipping\x20input','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','lastSku','outerHeight','qd-ddc-lastAdded','qd-ddc-lastAddedFixed','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','qd-ddc-cart-empty','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','insertProdImg','qd-loaded','src','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','actionButtons','data-sku','changeQantity','data-sku-index','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','click.qd_ddc_remove','removeProduct','stop','remove','$1-$2$3','qdDdcLastPostalCode','BRA','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','removeItems','animate','updateOnlyHover','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','Callback\x20não\x20é\x20uma\x20função','buyButtonClicked','quickViewUpdate','allowRecalculate','productId','prod_','prodId','.qd-bap-wrapper','qd-bap-item-added','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','ajaxStop','.qdDdcContainer','QD_smartCart','selector','dropDown','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','closest','abs','undefined','round','toFixed','length','replace','function','prototype','capitalize','charAt','toUpperCase','slice','toLowerCase','qdAjax','qdAjaxQueue','jquery','error','extend','object','data','stringify','toString','url','jqXHR','ajax','success','fail','complete','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','message','4.0','simpleCart','checkout','getOrderForm','ajaxStopOn','alerta','warn','[Simple\x20Cart]\x0a','info','add','QD_simpleCart','elements','.qd_cart_qtt','.qd_cart_total','.qd_items_text','attr','content','each','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','Shipping','value','currencySymbol','shipping','qtt','showQuantityByItems','items','quantity','callback','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','filter','.singular','show','hide','.plural','qd-emptyCart','removeClass','$this','O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','cartTotalE','html','total','itemsTextE','cartQttE','find','cartQtt','cartTotal','emptyCart','addClass','qd-sc-populated','_QuatroDigital_DropDown','vtexjs','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','QD_checkoutQueue','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','trigger','simpleCartCallback.quatro_digital','ajaxRequestbuyButtonAsynchronous','call','ReloadItemsCart','bind','Oooops!\x20','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','join','done','Callbacks','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','.productInformationWrapper\x20\x20a.buy-button','input.buy-in-page-quantity','javascript:','body','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','href','#produto,\x20.produto','QD_buyButton','isSmartCheckout','qd-bb-click-active','click.qd_bb_buy_sc','allowBuyClick','clickBuySmartCheckout','preventDefault','Método\x20descontinuado!'];(function(_0x120376,_0x571898){var _0x28c529=function(_0x4f130c){while(--_0x4f130c){_0x120376['push'](_0x120376['shift']());}};_0x28c529(++_0x571898);}(_0xb794,0xbc));var _0x4b79=function(_0x3dd15e,_0x1f0015){_0x3dd15e=_0x3dd15e-0x0;var _0x231fd0=_0xb794[_0x3dd15e];return _0x231fd0;};(function(_0x11658f){_0x11658f['fn'][_0x4b79('0x0')]=_0x11658f['fn'][_0x4b79('0x1')];}(jQuery));function qd_number_format(_0x123d8b,_0x5fb7d2,_0x4f782a,_0x5df8bd){_0x123d8b=(_0x123d8b+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x123d8b=isFinite(+_0x123d8b)?+_0x123d8b:0x0;_0x5fb7d2=isFinite(+_0x5fb7d2)?Math[_0x4b79('0x2')](_0x5fb7d2):0x0;_0x5df8bd=_0x4b79('0x3')===typeof _0x5df8bd?',':_0x5df8bd;_0x4f782a=_0x4b79('0x3')===typeof _0x4f782a?'.':_0x4f782a;var _0x29ad95='',_0x29ad95=function(_0x125953,_0x24fc39){var _0x5fb7d2=Math['pow'](0xa,_0x24fc39);return''+(Math[_0x4b79('0x4')](_0x125953*_0x5fb7d2)/_0x5fb7d2)[_0x4b79('0x5')](_0x24fc39);},_0x29ad95=(_0x5fb7d2?_0x29ad95(_0x123d8b,_0x5fb7d2):''+Math[_0x4b79('0x4')](_0x123d8b))['split']('.');0x3<_0x29ad95[0x0][_0x4b79('0x6')]&&(_0x29ad95[0x0]=_0x29ad95[0x0][_0x4b79('0x7')](/\B(?=(?:\d{3})+(?!\d))/g,_0x5df8bd));(_0x29ad95[0x1]||'')[_0x4b79('0x6')]<_0x5fb7d2&&(_0x29ad95[0x1]=_0x29ad95[0x1]||'',_0x29ad95[0x1]+=Array(_0x5fb7d2-_0x29ad95[0x1][_0x4b79('0x6')]+0x1)['join']('0'));return _0x29ad95['join'](_0x4f782a);};_0x4b79('0x8')!==typeof String[_0x4b79('0x9')]['trim']&&(String[_0x4b79('0x9')]['trim']=function(){return this[_0x4b79('0x7')](/^\s+|\s+$/g,'');});_0x4b79('0x8')!=typeof String['prototype'][_0x4b79('0xa')]&&(String[_0x4b79('0x9')]['capitalize']=function(){return this[_0x4b79('0xb')](0x0)[_0x4b79('0xc')]()+this[_0x4b79('0xd')](0x1)[_0x4b79('0xe')]();});(function(_0x278d13){if(_0x4b79('0x8')!==typeof _0x278d13[_0x4b79('0xf')]){var _0x2dad60={};_0x278d13[_0x4b79('0x10')]=_0x2dad60;0x96>parseInt((_0x278d13['fn'][_0x4b79('0x11')][_0x4b79('0x7')](/[^0-9]+/g,'')+'000')['slice'](0x0,0x3),0xa)&&console&&'function'==typeof console[_0x4b79('0x12')]&&console['error']();_0x278d13['qdAjax']=function(_0x1a95a5){try{var _0x5158e3=_0x278d13[_0x4b79('0x13')]({},{'url':'','type':'GET','data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x1a95a5);var _0x5d1604=_0x4b79('0x14')===typeof _0x5158e3[_0x4b79('0x15')]?JSON[_0x4b79('0x16')](_0x5158e3[_0x4b79('0x15')]):_0x5158e3['data'][_0x4b79('0x17')]();var _0x417619=encodeURIComponent(_0x5158e3[_0x4b79('0x18')]+'|'+_0x5158e3['type']+'|'+_0x5d1604);_0x2dad60[_0x417619]=_0x2dad60[_0x417619]||{};'undefined'==typeof _0x2dad60[_0x417619][_0x4b79('0x19')]?_0x2dad60[_0x417619][_0x4b79('0x19')]=_0x278d13[_0x4b79('0x1a')](_0x5158e3):(_0x2dad60[_0x417619]['jqXHR']['done'](_0x5158e3[_0x4b79('0x1b')]),_0x2dad60[_0x417619]['jqXHR'][_0x4b79('0x1c')](_0x5158e3[_0x4b79('0x12')]),_0x2dad60[_0x417619][_0x4b79('0x19')]['always'](_0x5158e3[_0x4b79('0x1d')]));_0x2dad60[_0x417619]['jqXHR']['always'](function(){isNaN(parseInt(_0x5158e3[_0x4b79('0x1e')]))||setTimeout(function(){_0x2dad60[_0x417619][_0x4b79('0x19')]=void 0x0;},_0x5158e3['clearQueueDelay']);});return _0x2dad60[_0x417619][_0x4b79('0x19')];}catch(_0x253aba){_0x4b79('0x3')!==typeof console&&'function'===typeof console[_0x4b79('0x12')]&&console['error'](_0x4b79('0x1f')+_0x253aba[_0x4b79('0x20')]);}};_0x278d13[_0x4b79('0xf')]['version']=_0x4b79('0x21');}}(jQuery));(function(_0x288dbd){_0x288dbd['fn'][_0x4b79('0x0')]=_0x288dbd['fn']['closest'];}(jQuery));(function(){var _0x2e0a00=jQuery;if(_0x4b79('0x8')!==typeof _0x2e0a00['fn'][_0x4b79('0x22')]){_0x2e0a00(function(){var _0x51b5ea=vtexjs[_0x4b79('0x23')][_0x4b79('0x24')];vtexjs[_0x4b79('0x23')][_0x4b79('0x24')]=function(){return _0x51b5ea['call']();};});try{window['QuatroDigital_simpleCart']=window['QuatroDigital_simpleCart']||{};window['QuatroDigital_simpleCart'][_0x4b79('0x25')]=!0x1;_0x2e0a00['fn'][_0x4b79('0x22')]=function(_0x118daa,_0x14fc52,_0x4fc782){var _0x41881f=function(_0x545b06,_0x117809){if(_0x4b79('0x14')===typeof console){var _0x25a547='object'===typeof _0x545b06;_0x4b79('0x3')!==typeof _0x117809&&_0x4b79('0x26')===_0x117809[_0x4b79('0xe')]()?_0x25a547?console[_0x4b79('0x27')](_0x4b79('0x28'),_0x545b06[0x0],_0x545b06[0x1],_0x545b06[0x2],_0x545b06[0x3],_0x545b06[0x4],_0x545b06[0x5],_0x545b06[0x6],_0x545b06[0x7]):console[_0x4b79('0x27')](_0x4b79('0x28')+_0x545b06):'undefined'!==typeof _0x117809&&_0x4b79('0x29')===_0x117809[_0x4b79('0xe')]()?_0x25a547?console[_0x4b79('0x29')](_0x4b79('0x28'),_0x545b06[0x0],_0x545b06[0x1],_0x545b06[0x2],_0x545b06[0x3],_0x545b06[0x4],_0x545b06[0x5],_0x545b06[0x6],_0x545b06[0x7]):console[_0x4b79('0x29')](_0x4b79('0x28')+_0x545b06):_0x25a547?console[_0x4b79('0x12')](_0x4b79('0x28'),_0x545b06[0x0],_0x545b06[0x1],_0x545b06[0x2],_0x545b06[0x3],_0x545b06[0x4],_0x545b06[0x5],_0x545b06[0x6],_0x545b06[0x7]):console[_0x4b79('0x12')](_0x4b79('0x28')+_0x545b06);}};var _0x20e7a9=_0x2e0a00(this);_0x4b79('0x14')===typeof _0x118daa?_0x14fc52=_0x118daa:(_0x118daa=_0x118daa||!0x1,_0x20e7a9=_0x20e7a9[_0x4b79('0x2a')](_0x2e0a00['QD_simpleCart']['elements']));if(!_0x20e7a9[_0x4b79('0x6')])return _0x20e7a9;_0x2e0a00[_0x4b79('0x2b')][_0x4b79('0x2c')]=_0x2e0a00[_0x4b79('0x2b')][_0x4b79('0x2c')][_0x4b79('0x2a')](_0x20e7a9);_0x4fc782=_0x4b79('0x3')===typeof _0x4fc782?!0x1:_0x4fc782;var _0x153130={'cartQtt':_0x4b79('0x2d'),'cartTotal':_0x4b79('0x2e'),'itemsText':_0x4b79('0x2f'),'currencySymbol':(_0x2e0a00('meta[name=currency]')[_0x4b79('0x30')](_0x4b79('0x31'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x3626cf=_0x2e0a00[_0x4b79('0x13')]({},_0x153130,_0x14fc52);var _0x13fa6a=_0x2e0a00('');_0x20e7a9[_0x4b79('0x32')](function(){var _0x5d77e0=_0x2e0a00(this);_0x5d77e0[_0x4b79('0x15')](_0x4b79('0x33'))||_0x5d77e0[_0x4b79('0x15')](_0x4b79('0x33'),_0x3626cf);});var _0x2c0197=function(_0x569a4d){window[_0x4b79('0x34')]=window['_QuatroDigital_CartData']||{};for(var _0x118daa=0x0,_0x2d31dd=0x0,_0x5bea91=0x0;_0x5bea91<_0x569a4d[_0x4b79('0x35')][_0x4b79('0x6')];_0x5bea91++)_0x4b79('0x36')==_0x569a4d[_0x4b79('0x35')][_0x5bea91]['id']&&(_0x2d31dd+=_0x569a4d[_0x4b79('0x35')][_0x5bea91][_0x4b79('0x37')]),_0x118daa+=_0x569a4d[_0x4b79('0x35')][_0x5bea91][_0x4b79('0x37')];window[_0x4b79('0x34')]['total']=_0x3626cf[_0x4b79('0x38')]+qd_number_format(_0x118daa/0x64,0x2,',','.');window['_QuatroDigital_CartData'][_0x4b79('0x39')]=_0x3626cf[_0x4b79('0x38')]+qd_number_format(_0x2d31dd/0x64,0x2,',','.');window[_0x4b79('0x34')]['allTotal']=_0x3626cf[_0x4b79('0x38')]+qd_number_format((_0x118daa+_0x2d31dd)/0x64,0x2,',','.');window[_0x4b79('0x34')][_0x4b79('0x3a')]=0x0;if(_0x3626cf[_0x4b79('0x3b')])for(_0x5bea91=0x0;_0x5bea91<_0x569a4d[_0x4b79('0x3c')][_0x4b79('0x6')];_0x5bea91++)window[_0x4b79('0x34')][_0x4b79('0x3a')]+=_0x569a4d[_0x4b79('0x3c')][_0x5bea91][_0x4b79('0x3d')];else window[_0x4b79('0x34')][_0x4b79('0x3a')]=_0x569a4d['items'][_0x4b79('0x6')]||0x0;try{window[_0x4b79('0x34')][_0x4b79('0x3e')]&&window[_0x4b79('0x34')]['callback'][_0x4b79('0x3f')]&&window[_0x4b79('0x34')][_0x4b79('0x3e')][_0x4b79('0x3f')]();}catch(_0x362b67){_0x41881f(_0x4b79('0x40'));}_0x542684(_0x13fa6a);};var _0x41a6bf=function(_0x1bf0cf,_0x4a09c7){0x1===_0x1bf0cf?_0x4a09c7['hide']()[_0x4b79('0x41')](_0x4b79('0x42'))[_0x4b79('0x43')]():_0x4a09c7[_0x4b79('0x44')]()[_0x4b79('0x41')](_0x4b79('0x45'))[_0x4b79('0x43')]();};var _0x1f42f6=function(_0x171acb){0x1>_0x171acb?_0x20e7a9['addClass'](_0x4b79('0x46')):_0x20e7a9[_0x4b79('0x47')](_0x4b79('0x46'));};var _0x535d0e=function(_0x3143fa,_0x21bd3b){var _0xf13896=parseInt(window[_0x4b79('0x34')]['qtt'],0xa);_0x21bd3b[_0x4b79('0x48')][_0x4b79('0x43')]();isNaN(_0xf13896)&&(_0x41881f(_0x4b79('0x49'),'alerta'),_0xf13896=0x0);_0x21bd3b[_0x4b79('0x4a')][_0x4b79('0x4b')](window[_0x4b79('0x34')][_0x4b79('0x4c')]);_0x21bd3b['cartQttE'][_0x4b79('0x4b')](_0xf13896);_0x41a6bf(_0xf13896,_0x21bd3b[_0x4b79('0x4d')]);_0x1f42f6(_0xf13896);};var _0x542684=function(_0x1e38fe){_0x20e7a9[_0x4b79('0x32')](function(){var _0x33f27a={};var _0x360217=_0x2e0a00(this);_0x118daa&&_0x360217[_0x4b79('0x15')]('qd_simpleCartOpts')&&_0x2e0a00[_0x4b79('0x13')](_0x3626cf,_0x360217[_0x4b79('0x15')](_0x4b79('0x33')));_0x33f27a[_0x4b79('0x48')]=_0x360217;_0x33f27a[_0x4b79('0x4e')]=_0x360217[_0x4b79('0x4f')](_0x3626cf[_0x4b79('0x50')])||_0x13fa6a;_0x33f27a[_0x4b79('0x4a')]=_0x360217[_0x4b79('0x4f')](_0x3626cf[_0x4b79('0x51')])||_0x13fa6a;_0x33f27a[_0x4b79('0x4d')]=_0x360217[_0x4b79('0x4f')](_0x3626cf['itemsText'])||_0x13fa6a;_0x33f27a['emptyElem']=_0x360217['find'](_0x3626cf[_0x4b79('0x52')])||_0x13fa6a;_0x535d0e(_0x1e38fe,_0x33f27a);_0x360217[_0x4b79('0x53')](_0x4b79('0x54'));});};(function(){if(_0x3626cf['smartCheckout']){window[_0x4b79('0x55')]=window['_QuatroDigital_DropDown']||{};if(_0x4b79('0x3')!==typeof window[_0x4b79('0x55')][_0x4b79('0x24')]&&(_0x4fc782||!_0x118daa))return _0x2c0197(window['_QuatroDigital_DropDown']['getOrderForm']);if('object'!==typeof window[_0x4b79('0x56')]||_0x4b79('0x3')===typeof window[_0x4b79('0x56')][_0x4b79('0x23')])if(_0x4b79('0x14')===typeof vtex&&_0x4b79('0x14')===typeof vtex[_0x4b79('0x23')]&&'undefined'!==typeof vtex[_0x4b79('0x23')][_0x4b79('0x57')])new vtex['checkout'][(_0x4b79('0x57'))]();else return _0x41881f(_0x4b79('0x58'));_0x2e0a00[_0x4b79('0x59')]([_0x4b79('0x3c'),_0x4b79('0x35'),_0x4b79('0x5a')],{'done':function(_0x514547){_0x2c0197(_0x514547);window[_0x4b79('0x55')][_0x4b79('0x24')]=_0x514547;},'fail':function(_0x46b371){_0x41881f([_0x4b79('0x5b'),_0x46b371]);}});}else alert(_0x4b79('0x5c'));}());_0x3626cf[_0x4b79('0x3e')]();_0x2e0a00(window)[_0x4b79('0x5d')](_0x4b79('0x5e'));return _0x20e7a9;};_0x2e0a00[_0x4b79('0x2b')]={'elements':_0x2e0a00('')};_0x2e0a00(function(){var _0x350532;_0x4b79('0x8')===typeof window['ajaxRequestbuyButtonAsynchronous']&&(_0x350532=window[_0x4b79('0x5f')],window['ajaxRequestbuyButtonAsynchronous']=function(_0x15fb3b,_0x341db4,_0x4e2c14,_0x5f3790,_0x2add4e){_0x350532[_0x4b79('0x60')](this,_0x15fb3b,_0x341db4,_0x4e2c14,_0x5f3790,function(){_0x4b79('0x8')===typeof _0x2add4e&&_0x2add4e();_0x2e0a00[_0x4b79('0x2b')][_0x4b79('0x2c')][_0x4b79('0x32')](function(){var _0x163664=_0x2e0a00(this);_0x163664[_0x4b79('0x22')](_0x163664[_0x4b79('0x15')](_0x4b79('0x33')));});});});});var _0xb7a7e8=window[_0x4b79('0x61')]||void 0x0;window[_0x4b79('0x61')]=function(_0x2ac7e4){_0x2e0a00['fn'][_0x4b79('0x22')](!0x0);_0x4b79('0x8')===typeof _0xb7a7e8?_0xb7a7e8[_0x4b79('0x60')](this,_0x2ac7e4):alert(_0x2ac7e4);};_0x2e0a00(function(){var _0x5e2768=_0x2e0a00('.qd_cart_auto');_0x5e2768[_0x4b79('0x6')]&&_0x5e2768['simpleCart']();});_0x2e0a00(function(){_0x2e0a00(window)[_0x4b79('0x62')]('productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex',function(){_0x2e0a00['fn'][_0x4b79('0x22')](!0x0);});});}catch(_0x47f847){_0x4b79('0x3')!==typeof console&&_0x4b79('0x8')===typeof console[_0x4b79('0x12')]&&console[_0x4b79('0x12')](_0x4b79('0x63'),_0x47f847);}}}());(function(){var _0x2823f3=function(_0x29428e,_0x4f34cc){if('object'===typeof console){var _0x4e21fc=_0x4b79('0x14')===typeof _0x29428e;_0x4b79('0x3')!==typeof _0x4f34cc&&'alerta'===_0x4f34cc['toLowerCase']()?_0x4e21fc?console['warn'](_0x4b79('0x64'),_0x29428e[0x0],_0x29428e[0x1],_0x29428e[0x2],_0x29428e[0x3],_0x29428e[0x4],_0x29428e[0x5],_0x29428e[0x6],_0x29428e[0x7]):console[_0x4b79('0x27')](_0x4b79('0x64')+_0x29428e):'undefined'!==typeof _0x4f34cc&&_0x4b79('0x29')===_0x4f34cc[_0x4b79('0xe')]()?_0x4e21fc?console[_0x4b79('0x29')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x29428e[0x0],_0x29428e[0x1],_0x29428e[0x2],_0x29428e[0x3],_0x29428e[0x4],_0x29428e[0x5],_0x29428e[0x6],_0x29428e[0x7]):console[_0x4b79('0x29')](_0x4b79('0x64')+_0x29428e):_0x4e21fc?console[_0x4b79('0x12')](_0x4b79('0x64'),_0x29428e[0x0],_0x29428e[0x1],_0x29428e[0x2],_0x29428e[0x3],_0x29428e[0x4],_0x29428e[0x5],_0x29428e[0x6],_0x29428e[0x7]):console[_0x4b79('0x12')](_0x4b79('0x64')+_0x29428e);}},_0x4c531a=null,_0x1aa6db={},_0x58b03d={},_0x2ce3ee={};$['QD_checkoutQueue']=function(_0x3ffe64,_0xe7b85c){if(null===_0x4c531a)if('object'===typeof window[_0x4b79('0x56')]&&_0x4b79('0x3')!==typeof window[_0x4b79('0x56')][_0x4b79('0x23')])_0x4c531a=window[_0x4b79('0x56')]['checkout'];else return _0x2823f3(_0x4b79('0x65'));var _0xc7324f=$[_0x4b79('0x13')]({'done':function(){},'fail':function(){}},_0xe7b85c),_0x569f6f=_0x3ffe64[_0x4b79('0x66')](';'),_0x3797b1=function(){_0x1aa6db[_0x569f6f][_0x4b79('0x2a')](_0xc7324f[_0x4b79('0x67')]);_0x58b03d[_0x569f6f]['add'](_0xc7324f[_0x4b79('0x1c')]);};_0x2ce3ee[_0x569f6f]?_0x3797b1():(_0x1aa6db[_0x569f6f]=$[_0x4b79('0x68')](),_0x58b03d[_0x569f6f]=$[_0x4b79('0x68')](),_0x3797b1(),_0x2ce3ee[_0x569f6f]=!0x0,_0x4c531a['getOrderForm'](_0x3ffe64)['done'](function(_0x56ac3b){_0x2ce3ee[_0x569f6f]=!0x1;_0x1aa6db[_0x569f6f][_0x4b79('0x3f')](_0x56ac3b);})[_0x4b79('0x1c')](function(_0x358525){_0x2ce3ee[_0x569f6f]=!0x1;_0x58b03d[_0x569f6f][_0x4b79('0x3f')](_0x358525);}));};}());(function(_0xaedd72){try{var _0x2a9dd9=jQuery,_0x5602ab,_0x3ed811=_0x2a9dd9({}),_0x36fe17=function(_0x115628,_0x371291){if('object'===typeof console&&_0x4b79('0x3')!==typeof console[_0x4b79('0x12')]&&_0x4b79('0x3')!==typeof console[_0x4b79('0x29')]&&'undefined'!==typeof console[_0x4b79('0x27')]){var _0x15386a;'object'===typeof _0x115628?(_0x115628[_0x4b79('0x69')](_0x4b79('0x6a')),_0x15386a=_0x115628):_0x15386a=[_0x4b79('0x6a')+_0x115628];if(_0x4b79('0x3')===typeof _0x371291||_0x4b79('0x26')!==_0x371291[_0x4b79('0xe')]()&&_0x4b79('0x6b')!==_0x371291['toLowerCase']())if('undefined'!==typeof _0x371291&&_0x4b79('0x29')===_0x371291[_0x4b79('0xe')]())try{console[_0x4b79('0x29')][_0x4b79('0x6c')](console,_0x15386a);}catch(_0x3973e5){try{console[_0x4b79('0x29')](_0x15386a[_0x4b79('0x66')]('\x0a'));}catch(_0x34c860){}}else try{console[_0x4b79('0x12')][_0x4b79('0x6c')](console,_0x15386a);}catch(_0x3e39a){try{console[_0x4b79('0x12')](_0x15386a[_0x4b79('0x66')]('\x0a'));}catch(_0x5f3eac){}}else try{console[_0x4b79('0x27')][_0x4b79('0x6c')](console,_0x15386a);}catch(_0x24f442){try{console[_0x4b79('0x27')](_0x15386a[_0x4b79('0x66')]('\x0a'));}catch(_0xcf8961){}}}},_0x482d02={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0x4b79('0x6d'),'buyQtt':_0x4b79('0x6e'),'selectSkuMsg':_0x4b79('0x6f'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0xcd99e4,_0x2f87e9,_0x4b7c65){_0x2a9dd9(_0x4b79('0x70'))['is']('.productQuickView')&&('success'===_0x2f87e9?alert('Produto\x20adicionado\x20ao\x20carrinho!'):(alert(_0x4b79('0x71')),(_0x4b79('0x14')===typeof parent?parent:document)['location'][_0x4b79('0x72')]=_0x4b7c65));},'isProductPage':function(){return _0x2a9dd9(_0x4b79('0x70'))['is'](_0x4b79('0x73'));},'execDefaultAction':function(_0x5ac889){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x2a9dd9[_0x4b79('0x74')]=function(_0x20bb46,_0x4d5597){function _0x28fad3(_0x4d8abe){_0x5602ab[_0x4b79('0x75')]?_0x4d8abe['data'](_0x4b79('0x76'))||(_0x4d8abe[_0x4b79('0x15')](_0x4b79('0x76'),0x1),_0x4d8abe['on'](_0x4b79('0x77'),function(_0x3a1808){if(!_0x5602ab[_0x4b79('0x78')]())return!0x0;if(!0x0!==_0x243f06[_0x4b79('0x79')]['call'](this))return _0x3a1808[_0x4b79('0x7a')](),!0x1;})):alert(_0x4b79('0x7b'));}function _0x560335(_0x4e22f1){_0x4e22f1=_0x4e22f1||_0x2a9dd9(_0x5602ab[_0x4b79('0x7c')]);_0x4e22f1['each'](function(){var _0x4e22f1=_0x2a9dd9(this);_0x4e22f1['is']('.qd-sbb-on')||(_0x4e22f1[_0x4b79('0x53')]('qd-sbb-on'),_0x4e22f1['is']('.btn-add-buy-button-asynchronous')&&!_0x4e22f1['is']('.remove-href')||_0x4e22f1[_0x4b79('0x15')](_0x4b79('0x7d'))||(_0x4e22f1[_0x4b79('0x15')](_0x4b79('0x7d'),0x1),_0x4e22f1[_0x4b79('0x7e')]('.qd-bb-productAdded')[_0x4b79('0x6')]||_0x4e22f1[_0x4b79('0x7f')](_0x4b79('0x80')),_0x4e22f1['is'](_0x4b79('0x81'))&&_0x5602ab['isProductPage']()&&_0x1cd9e2[_0x4b79('0x60')](_0x4e22f1),_0x28fad3(_0x4e22f1)));});_0x5602ab[_0x4b79('0x82')]()&&!_0x4e22f1[_0x4b79('0x6')]&&_0x36fe17(_0x4b79('0x83')+_0x4e22f1['selector']+'\x27.',_0x4b79('0x29'));}var _0x390edf=_0x2a9dd9(_0x20bb46);var _0x243f06=this;window['_Quatro_Digital_dropDown']=window['_Quatro_Digital_dropDown']||{};window[_0x4b79('0x34')]=window[_0x4b79('0x34')]||{};_0x243f06[_0x4b79('0x84')]=function(_0x7e1f5d,_0xf383f3){_0x390edf[_0x4b79('0x53')]('qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd');_0x2a9dd9(_0x4b79('0x70'))[_0x4b79('0x53')]('qd-bb-lightBoxBodyProdAdd');var _0x3b4e18=_0x2a9dd9(_0x5602ab['buyButton'])[_0x4b79('0x41')](_0x4b79('0x85')+(_0x7e1f5d['attr'](_0x4b79('0x72'))||_0x4b79('0x86'))+'\x27]')['add'](_0x7e1f5d);_0x3b4e18[_0x4b79('0x53')]('qd-bb-itemAddBuyButtonWrapper');setTimeout(function(){_0x390edf['removeClass']('qd-bb-itemAddCartWrapper');_0x3b4e18[_0x4b79('0x47')](_0x4b79('0x87'));},_0x5602ab[_0x4b79('0x88')]);window['_Quatro_Digital_dropDown'][_0x4b79('0x24')]=void 0x0;if(_0x4b79('0x3')!==typeof _0x4d5597&&_0x4b79('0x8')===typeof _0x4d5597[_0x4b79('0x89')])return _0x5602ab['isSmartCheckout']||(_0x36fe17(_0x4b79('0x8a')),_0x4d5597[_0x4b79('0x89')]()),window['_QuatroDigital_DropDown']['getOrderForm']=void 0x0,_0x4d5597[_0x4b79('0x89')](function(_0x336be9){window['_Quatro_Digital_dropDown']['getOrderForm']=_0x336be9;_0x2a9dd9['fn'][_0x4b79('0x22')](!0x0,void 0x0,!0x0);},{'lastSku':_0xf383f3});window[_0x4b79('0x8b')]['allowUpdate']=!0x0;_0x2a9dd9['fn']['simpleCart'](!0x0);};(function(){if(_0x5602ab['isSmartCheckout']&&_0x5602ab[_0x4b79('0x8c')]){var _0x2f5208=_0x2a9dd9(_0x4b79('0x8d'));_0x2f5208[_0x4b79('0x6')]&&_0x560335(_0x2f5208);}}());var _0x1cd9e2=function(){var _0x189a7e=_0x2a9dd9(this);_0x4b79('0x3')!==typeof _0x189a7e[_0x4b79('0x15')](_0x4b79('0x7c'))?(_0x189a7e['unbind'](_0x4b79('0x8e')),_0x28fad3(_0x189a7e)):(_0x189a7e[_0x4b79('0x62')](_0x4b79('0x8f'),function(_0x43e89c){_0x189a7e[_0x4b79('0x90')]('click');_0x28fad3(_0x189a7e);_0x2a9dd9(this)[_0x4b79('0x90')](_0x43e89c);}),_0x2a9dd9(window)[_0x4b79('0x91')](function(){_0x189a7e[_0x4b79('0x90')]('click');_0x28fad3(_0x189a7e);_0x189a7e[_0x4b79('0x90')](_0x4b79('0x8f'));}));};_0x243f06[_0x4b79('0x79')]=function(){var _0x4b8169=_0x2a9dd9(this),_0x20bb46=_0x4b8169['attr']('href')||'';if(-0x1<_0x20bb46[_0x4b79('0x92')](_0x5602ab[_0x4b79('0x93')]))return!0x0;_0x20bb46=_0x20bb46[_0x4b79('0x7')](/redirect\=(false|true)/gi,'')['replace']('?',_0x4b79('0x94'))['replace'](/\&\&/gi,'&');if(_0x5602ab[_0x4b79('0x95')](_0x4b8169))return _0x4b8169[_0x4b79('0x30')]('href',_0x20bb46[_0x4b79('0x7')](_0x4b79('0x96'),_0x4b79('0x97'))),!0x0;_0x20bb46=_0x20bb46[_0x4b79('0x7')](/http.?:/i,'');_0x3ed811[_0x4b79('0x98')](function(_0xf816c4){if(!_0x5602ab[_0x4b79('0x99')]&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0x4b79('0x9a')](_0x20bb46))return _0xf816c4();var _0x3a8496=function(_0x5bb514,_0x298e95){var _0x560335=_0x20bb46[_0x4b79('0x9b')](/sku\=([0-9]+)/gi),_0x31ad52=[];if('object'===typeof _0x560335&&null!==_0x560335)for(var _0x1ddfaf=_0x560335[_0x4b79('0x6')]-0x1;0x0<=_0x1ddfaf;_0x1ddfaf--){var _0x50adb1=parseInt(_0x560335[_0x1ddfaf][_0x4b79('0x7')](/sku\=/gi,''));isNaN(_0x50adb1)||_0x31ad52[_0x4b79('0x9c')](_0x50adb1);}_0x5602ab[_0x4b79('0x9d')]['call'](this,_0x5bb514,_0x298e95,_0x20bb46);_0x243f06[_0x4b79('0x9e')][_0x4b79('0x60')](this,_0x5bb514,_0x298e95,_0x20bb46,_0x31ad52);_0x243f06['prodAdd'](_0x4b8169,_0x20bb46[_0x4b79('0x9f')]('ku=')[_0x4b79('0xa0')]()[_0x4b79('0x9f')]('&')[_0x4b79('0xa1')]());_0x4b79('0x8')===typeof _0x5602ab[_0x4b79('0xa2')]&&_0x5602ab[_0x4b79('0xa2')]['call'](this);_0x2a9dd9(window)[_0x4b79('0x5d')](_0x4b79('0xa3'));_0x2a9dd9(window)[_0x4b79('0x5d')](_0x4b79('0xa4'));};_0x5602ab[_0x4b79('0xa5')]?(_0x3a8496(null,_0x4b79('0x1b')),_0xf816c4()):_0x2a9dd9['ajax']({'url':_0x20bb46,'complete':_0x3a8496})['always'](function(){_0xf816c4();});});};_0x243f06[_0x4b79('0x9e')]=function(_0x3d3f63,_0x3e5db5,_0x108d3b,_0x406fff){try{_0x4b79('0x1b')===_0x3e5db5&&_0x4b79('0x14')===typeof window[_0x4b79('0xa6')]&&_0x4b79('0x8')===typeof window[_0x4b79('0xa6')][_0x4b79('0xa7')]&&window['parent'][_0x4b79('0xa7')](_0x3d3f63,_0x3e5db5,_0x108d3b,_0x406fff);}catch(_0x368833){_0x36fe17(_0x4b79('0xa8'));}};_0x560335();_0x4b79('0x8')===typeof _0x5602ab[_0x4b79('0x3e')]?_0x5602ab[_0x4b79('0x3e')]['call'](this):_0x36fe17('Callback\x20não\x20é\x20uma\x20função');};var _0x26c637=_0x2a9dd9[_0x4b79('0x68')]();_0x2a9dd9['fn']['QD_buyButton']=function(_0x47e525,_0x27c88d){var _0xaedd72=_0x2a9dd9(this);'undefined'!==typeof _0x27c88d||_0x4b79('0x14')!==typeof _0x47e525||_0x47e525 instanceof _0x2a9dd9||(_0x27c88d=_0x47e525,_0x47e525=void 0x0);_0x5602ab=_0x2a9dd9[_0x4b79('0x13')]({},_0x482d02,_0x27c88d);var _0x11d411;_0x26c637['add'](function(){_0xaedd72[_0x4b79('0x7e')]('.qd-bb-itemAddWrapper')[_0x4b79('0x6')]||_0xaedd72[_0x4b79('0xa9')]('<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>');_0x11d411=new _0x2a9dd9[(_0x4b79('0x74'))](_0xaedd72,_0x47e525);});_0x26c637[_0x4b79('0x3f')]();_0x2a9dd9(window)['on'](_0x4b79('0xaa'),function(_0x46b0d2,_0x15b3a6,_0x151687){_0x11d411[_0x4b79('0x84')](_0x15b3a6,_0x151687);});return _0x2a9dd9[_0x4b79('0x13')](_0xaedd72,_0x11d411);};var _0x5dc46a=0x0;_0x2a9dd9(document)[_0x4b79('0xab')](function(_0x5bceea,_0x1b6a4a,_0x233521){-0x1<_0x233521[_0x4b79('0x18')][_0x4b79('0xe')]()[_0x4b79('0x92')](_0x4b79('0xac'))&&(_0x5dc46a=(_0x233521['url'][_0x4b79('0x9b')](/sku\=([0-9]+)/i)||[''])[_0x4b79('0xa0')]());});_0x2a9dd9(window)[_0x4b79('0x62')]('productAddedToCart.qdSbbVtex',function(){_0x2a9dd9(window)[_0x4b79('0x5d')](_0x4b79('0xaa'),[new _0x2a9dd9(),_0x5dc46a]);});_0x2a9dd9(document)['ajaxStop'](function(){_0x26c637[_0x4b79('0x3f')]();});}catch(_0x478afb){_0x4b79('0x3')!==typeof console&&_0x4b79('0x8')===typeof console[_0x4b79('0x12')]&&console['error'](_0x4b79('0x63'),_0x478afb);}}(this));function qd_number_format(_0x43dee8,_0x415e3a,_0xd8b471,_0x75f37f){_0x43dee8=(_0x43dee8+'')[_0x4b79('0x7')](/[^0-9+\-Ee.]/g,'');_0x43dee8=isFinite(+_0x43dee8)?+_0x43dee8:0x0;_0x415e3a=isFinite(+_0x415e3a)?Math[_0x4b79('0x2')](_0x415e3a):0x0;_0x75f37f=_0x4b79('0x3')===typeof _0x75f37f?',':_0x75f37f;_0xd8b471=_0x4b79('0x3')===typeof _0xd8b471?'.':_0xd8b471;var _0x519a90='',_0x519a90=function(_0x3a485d,_0x386767){var _0xd4566c=Math[_0x4b79('0xad')](0xa,_0x386767);return''+(Math[_0x4b79('0x4')](_0x3a485d*_0xd4566c)/_0xd4566c)['toFixed'](_0x386767);},_0x519a90=(_0x415e3a?_0x519a90(_0x43dee8,_0x415e3a):''+Math['round'](_0x43dee8))[_0x4b79('0x9f')]('.');0x3<_0x519a90[0x0][_0x4b79('0x6')]&&(_0x519a90[0x0]=_0x519a90[0x0][_0x4b79('0x7')](/\B(?=(?:\d{3})+(?!\d))/g,_0x75f37f));(_0x519a90[0x1]||'')['length']<_0x415e3a&&(_0x519a90[0x1]=_0x519a90[0x1]||'',_0x519a90[0x1]+=Array(_0x415e3a-_0x519a90[0x1][_0x4b79('0x6')]+0x1)[_0x4b79('0x66')]('0'));return _0x519a90['join'](_0xd8b471);}(function(){try{window[_0x4b79('0x34')]=window[_0x4b79('0x34')]||{},window['_QuatroDigital_CartData'][_0x4b79('0x3e')]=window[_0x4b79('0x34')][_0x4b79('0x3e')]||$[_0x4b79('0x68')]();}catch(_0x38c0f9){_0x4b79('0x3')!==typeof console&&_0x4b79('0x8')===typeof console[_0x4b79('0x12')]&&console[_0x4b79('0x12')]('Oooops!\x20',_0x38c0f9['message']);}}());(function(_0x28cd52){try{var _0xca55b7=jQuery,_0x2429de=function(_0x4078ce,_0x37469d){if(_0x4b79('0x14')===typeof console&&_0x4b79('0x3')!==typeof console[_0x4b79('0x12')]&&'undefined'!==typeof console[_0x4b79('0x29')]&&'undefined'!==typeof console[_0x4b79('0x27')]){var _0x5ac33c;'object'===typeof _0x4078ce?(_0x4078ce[_0x4b79('0x69')]('[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'),_0x5ac33c=_0x4078ce):_0x5ac33c=[_0x4b79('0xae')+_0x4078ce];if(_0x4b79('0x3')===typeof _0x37469d||_0x4b79('0x26')!==_0x37469d[_0x4b79('0xe')]()&&_0x4b79('0x6b')!==_0x37469d[_0x4b79('0xe')]())if(_0x4b79('0x3')!==typeof _0x37469d&&_0x4b79('0x29')===_0x37469d[_0x4b79('0xe')]())try{console['info'][_0x4b79('0x6c')](console,_0x5ac33c);}catch(_0x32873b){try{console[_0x4b79('0x29')](_0x5ac33c[_0x4b79('0x66')]('\x0a'));}catch(_0x4be87e){}}else try{console[_0x4b79('0x12')][_0x4b79('0x6c')](console,_0x5ac33c);}catch(_0x41801c){try{console['error'](_0x5ac33c['join']('\x0a'));}catch(_0x4395ba){}}else try{console[_0x4b79('0x27')][_0x4b79('0x6c')](console,_0x5ac33c);}catch(_0x13511f){try{console[_0x4b79('0x27')](_0x5ac33c[_0x4b79('0x66')]('\x0a'));}catch(_0x7c9ab1){}}}};window['_QuatroDigital_DropDown']=window[_0x4b79('0x55')]||{};window[_0x4b79('0x55')][_0x4b79('0xaf')]=!0x0;_0xca55b7[_0x4b79('0xb0')]=function(){};_0xca55b7['fn'][_0x4b79('0xb0')]=function(){return{'fn':new _0xca55b7()};};var _0x2479be=function(_0x21595d){var _0x543578={'a':'vinyzvk%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x5451a6){var _0x27ca02=function(_0x452293){return _0x452293;};var _0x556f00=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5451a6=_0x5451a6['d'+_0x556f00[0x10]+'c'+_0x556f00[0x11]+'m'+_0x27ca02(_0x556f00[0x1])+'n'+_0x556f00[0xd]]['l'+_0x556f00[0x12]+'c'+_0x556f00[0x0]+'ti'+_0x27ca02('o')+'n'];var _0x289e05=function(_0x33020b){return escape(encodeURIComponent(_0x33020b[_0x4b79('0x7')](/\./g,'¨')[_0x4b79('0x7')](/[a-zA-Z]/g,function(_0x4ed2e9){return String['fromCharCode'](('Z'>=_0x4ed2e9?0x5a:0x7a)>=(_0x4ed2e9=_0x4ed2e9['charCodeAt'](0x0)+0xd)?_0x4ed2e9:_0x4ed2e9-0x1a);})));};var _0x28cd52=_0x289e05(_0x5451a6[[_0x556f00[0x9],_0x27ca02('o'),_0x556f00[0xc],_0x556f00[_0x27ca02(0xd)]][_0x4b79('0x66')]('')]);_0x289e05=_0x289e05((window[['js',_0x27ca02('no'),'m',_0x556f00[0x1],_0x556f00[0x4][_0x4b79('0xc')](),_0x4b79('0xb1')][_0x4b79('0x66')]('')]||_0x4b79('0x86'))+['.v',_0x556f00[0xd],'e',_0x27ca02('x'),'co',_0x27ca02('mm'),_0x4b79('0xb2'),_0x556f00[0x1],'.c',_0x27ca02('o'),'m.',_0x556f00[0x13],'r'][_0x4b79('0x66')](''));for(var _0x34d0dc in _0x543578){if(_0x289e05===_0x34d0dc+_0x543578[_0x34d0dc]||_0x28cd52===_0x34d0dc+_0x543578[_0x34d0dc]){var _0x1fe501='tr'+_0x556f00[0x11]+'e';break;}_0x1fe501='f'+_0x556f00[0x0]+'ls'+_0x27ca02(_0x556f00[0x1])+'';}_0x27ca02=!0x1;-0x1<_0x5451a6[[_0x556f00[0xc],'e',_0x556f00[0x0],'rc',_0x556f00[0x9]][_0x4b79('0x66')]('')][_0x4b79('0x92')](_0x4b79('0xb3'))&&(_0x27ca02=!0x0);return[_0x1fe501,_0x27ca02];}(_0x21595d);}(window);if(!eval(_0x2479be[0x0]))return _0x2479be[0x1]?_0x2429de(_0x4b79('0xb4')):!0x1;_0xca55b7[_0x4b79('0xb0')]=function(_0x21dee5,_0x42bec2){var _0x53d6a1=_0xca55b7(_0x21dee5);if(!_0x53d6a1['length'])return _0x53d6a1;var _0x55e7d7=_0xca55b7['extend'](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':_0x4b79('0xb5'),'cartTotal':_0x4b79('0xb6'),'emptyCart':_0x4b79('0xb7'),'continueShopping':'Continuar\x20Comprando','shippingForm':_0x4b79('0xb8')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x11f6fe){return _0x11f6fe[_0x4b79('0xb9')]||_0x11f6fe[_0x4b79('0xba')];},'callback':function(){},'callbackProductsList':function(){}},_0x42bec2);_0xca55b7('');var _0x21895b=this;if(_0x55e7d7['smartCheckout']){var _0x310ae6=!0x1;'undefined'===typeof window[_0x4b79('0x56')]&&(_0x2429de(_0x4b79('0xbb')),_0xca55b7['ajax']({'url':_0x4b79('0xbc'),'async':!0x1,'dataType':'script','error':function(){_0x2429de('Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.');_0x310ae6=!0x0;}}));if(_0x310ae6)return _0x2429de(_0x4b79('0xbd'));}if(_0x4b79('0x14')===typeof window[_0x4b79('0x56')]&&_0x4b79('0x3')!==typeof window[_0x4b79('0x56')]['checkout'])var _0x49f592=window[_0x4b79('0x56')][_0x4b79('0x23')];else if('object'===typeof vtex&&'object'===typeof vtex[_0x4b79('0x23')]&&_0x4b79('0x3')!==typeof vtex[_0x4b79('0x23')][_0x4b79('0x57')])_0x49f592=new vtex['checkout'][(_0x4b79('0x57'))]();else return _0x2429de(_0x4b79('0x58'));_0x21895b['cartContainer']=_0x4b79('0xbe');var _0x29cdb7=function(_0x138986){_0xca55b7(this)[_0x4b79('0x7f')](_0x138986);_0x138986['find'](_0x4b79('0xbf'))['add'](_0xca55b7('.qd_ddc_lightBoxOverlay'))['on']('click.qd_ddc_closeFn',function(){_0x53d6a1['removeClass']('qd-bb-lightBoxProdAdd');_0xca55b7(document[_0x4b79('0x70')])['removeClass']('qd-bb-lightBoxBodyProdAdd');});_0xca55b7(document)['off'](_0x4b79('0xc0'))['on']('keyup.qd_ddc_closeFn',function(_0x1db823){0x1b==_0x1db823[_0x4b79('0xc1')]&&(_0x53d6a1['removeClass']('qd-bb-lightBoxProdAdd'),_0xca55b7(document[_0x4b79('0x70')])[_0x4b79('0x47')](_0x4b79('0xc2')));});var _0x3ee4ce=_0x138986['find']('.qd-ddc-prodWrapper');_0x138986[_0x4b79('0x4f')](_0x4b79('0xc3'))['on'](_0x4b79('0xc4'),function(){_0x21895b[_0x4b79('0xc5')]('-',void 0x0,void 0x0,_0x3ee4ce);return!0x1;});_0x138986[_0x4b79('0x4f')]('.qd-ddc-scrollDown')['on'](_0x4b79('0xc6'),function(){_0x21895b[_0x4b79('0xc5')](void 0x0,void 0x0,void 0x0,_0x3ee4ce);return!0x1;});_0x138986[_0x4b79('0x4f')]('.qd-ddc-shipping\x20input')[_0x4b79('0xc7')]('')['on'](_0x4b79('0xc8'),function(){_0x21895b[_0x4b79('0xc9')](_0xca55b7(this));});if(_0x55e7d7['updateOnlyHover']){var _0x42bec2=0x0;_0xca55b7(this)['on'](_0x4b79('0xca'),function(){var _0x138986=function(){window[_0x4b79('0x55')][_0x4b79('0xaf')]&&(_0x21895b['getCartInfoByUrl'](),window['_QuatroDigital_DropDown']['allowUpdate']=!0x1,_0xca55b7['fn'][_0x4b79('0x22')](!0x0),_0x21895b['cartIsEmpty']());};_0x42bec2=setInterval(function(){_0x138986();},0x258);_0x138986();});_0xca55b7(this)['on']('mouseleave.qd_ddc_hover',function(){clearInterval(_0x42bec2);});}};var _0x36fb7f=function(_0x16c19f){_0x16c19f=_0xca55b7(_0x16c19f);_0x55e7d7['texts'][_0x4b79('0x51')]=_0x55e7d7[_0x4b79('0xcb')][_0x4b79('0x51')][_0x4b79('0x7')]('#value',_0x4b79('0xcc'));_0x55e7d7[_0x4b79('0xcb')][_0x4b79('0x51')]=_0x55e7d7['texts']['cartTotal'][_0x4b79('0x7')](_0x4b79('0xcd'),'<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>');_0x55e7d7[_0x4b79('0xcb')][_0x4b79('0x51')]=_0x55e7d7['texts']['cartTotal'][_0x4b79('0x7')](_0x4b79('0xce'),_0x4b79('0xcf'));_0x55e7d7[_0x4b79('0xcb')][_0x4b79('0x51')]=_0x55e7d7[_0x4b79('0xcb')]['cartTotal'][_0x4b79('0x7')](_0x4b79('0xd0'),_0x4b79('0xd1'));_0x16c19f[_0x4b79('0x4f')]('.qd-ddc-viewCart')[_0x4b79('0x4b')](_0x55e7d7[_0x4b79('0xcb')][_0x4b79('0xd2')]);_0x16c19f[_0x4b79('0x4f')]('.qd_ddc_continueShopping')[_0x4b79('0x4b')](_0x55e7d7[_0x4b79('0xcb')][_0x4b79('0xd3')]);_0x16c19f[_0x4b79('0x4f')](_0x4b79('0xd4'))['html'](_0x55e7d7[_0x4b79('0xcb')]['linkCheckout']);_0x16c19f[_0x4b79('0x4f')](_0x4b79('0xd5'))[_0x4b79('0x4b')](_0x55e7d7[_0x4b79('0xcb')]['cartTotal']);_0x16c19f[_0x4b79('0x4f')]('.qd-ddc-shipping')[_0x4b79('0x4b')](_0x55e7d7[_0x4b79('0xcb')][_0x4b79('0xd6')]);_0x16c19f[_0x4b79('0x4f')](_0x4b79('0xd7'))[_0x4b79('0x4b')](_0x55e7d7[_0x4b79('0xcb')][_0x4b79('0x52')]);return _0x16c19f;}(this[_0x4b79('0xd8')]);var _0x45da48=0x0;_0x53d6a1[_0x4b79('0x32')](function(){0x0<_0x45da48?_0x29cdb7[_0x4b79('0x60')](this,_0x36fb7f['clone']()):_0x29cdb7[_0x4b79('0x60')](this,_0x36fb7f);_0x45da48++;});window[_0x4b79('0x34')][_0x4b79('0x3e')][_0x4b79('0x2a')](function(){_0xca55b7(_0x4b79('0xd9'))[_0x4b79('0x4b')](window['_QuatroDigital_CartData'][_0x4b79('0x4c')]||'--');_0xca55b7(_0x4b79('0xda'))[_0x4b79('0x4b')](window[_0x4b79('0x34')][_0x4b79('0x3a')]||'0');_0xca55b7('.qd-ddc-infoTotalShipping')[_0x4b79('0x4b')](window[_0x4b79('0x34')][_0x4b79('0x39')]||'--');_0xca55b7(_0x4b79('0xdb'))['html'](window[_0x4b79('0x34')][_0x4b79('0xdc')]||'--');});var _0x52682f=function(_0x357311,_0x566fe4){if(_0x4b79('0x3')===typeof _0x357311['items'])return _0x2429de(_0x4b79('0xdd'));_0x21895b[_0x4b79('0xde')][_0x4b79('0x60')](this,_0x566fe4);};_0x21895b['getCartInfoByUrl']=function(_0x4c4807,_0x320dda){'undefined'!=typeof _0x320dda?window[_0x4b79('0x55')][_0x4b79('0xdf')]=_0x320dda:window[_0x4b79('0x55')][_0x4b79('0xdf')]&&(_0x320dda=window['_QuatroDigital_DropDown'][_0x4b79('0xdf')]);setTimeout(function(){window[_0x4b79('0x55')]['dataOptionsCache']=void 0x0;},_0x55e7d7[_0x4b79('0x88')]);_0xca55b7(_0x4b79('0xe0'))[_0x4b79('0x47')](_0x4b79('0xe1'));if(_0x55e7d7[_0x4b79('0xe2')]){var _0x42bec2=function(_0x5a8379){window['_QuatroDigital_DropDown']['getOrderForm']=_0x5a8379;_0x52682f(_0x5a8379,_0x320dda);_0x4b79('0x3')!==typeof window[_0x4b79('0xe3')]&&'function'===typeof window[_0x4b79('0xe3')][_0x4b79('0xe4')]&&window[_0x4b79('0xe3')][_0x4b79('0xe4')][_0x4b79('0x60')](this);_0xca55b7('.qd-ddc-wrapper')[_0x4b79('0x53')]('qd-ddc-prodLoaded');};'undefined'!==typeof window[_0x4b79('0x55')][_0x4b79('0x24')]?(_0x42bec2(window['_QuatroDigital_DropDown']['getOrderForm']),_0x4b79('0x8')===typeof _0x4c4807&&_0x4c4807(window['_QuatroDigital_DropDown'][_0x4b79('0x24')])):_0xca55b7[_0x4b79('0x59')]([_0x4b79('0x3c'),'totalizers','shippingData'],{'done':function(_0x3eee78){_0x42bec2[_0x4b79('0x60')](this,_0x3eee78);_0x4b79('0x8')===typeof _0x4c4807&&_0x4c4807(_0x3eee78);},'fail':function(_0x49ad59){_0x2429de(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0x49ad59]);}});}else alert(_0x4b79('0xe5'));};_0x21895b[_0x4b79('0xe6')]=function(){var _0x28f05c=_0xca55b7('.qd-ddc-wrapper');_0x28f05c[_0x4b79('0x4f')](_0x4b79('0xe7'))['length']?_0x28f05c[_0x4b79('0x47')](_0x4b79('0xe8')):_0x28f05c[_0x4b79('0x53')]('qd-ddc-noItems');};_0x21895b[_0x4b79('0xde')]=function(_0x12d30d){var _0x42bec2=_0xca55b7(_0x4b79('0xe9'));_0x42bec2['empty']();_0x42bec2['each'](function(){var _0x42bec2=_0xca55b7(this),_0x21dee5,_0x443bf7,_0x1e4ca8=_0xca55b7(''),_0x248e6f;for(_0x248e6f in window[_0x4b79('0x55')][_0x4b79('0x24')][_0x4b79('0x3c')])if(_0x4b79('0x14')===typeof window[_0x4b79('0x55')][_0x4b79('0x24')]['items'][_0x248e6f]){var _0x3d5236=window[_0x4b79('0x55')][_0x4b79('0x24')]['items'][_0x248e6f];var _0x2afc93=_0x3d5236[_0x4b79('0xea')][_0x4b79('0x7')](/^\/|\/$/g,'')[_0x4b79('0x9f')]('/');var _0x40cb13=_0xca55b7(_0x4b79('0xeb'));_0x40cb13['attr']({'data-sku':_0x3d5236['id'],'data-sku-index':_0x248e6f,'data-qd-departament':_0x2afc93[0x0],'data-qd-category':_0x2afc93[_0x2afc93[_0x4b79('0x6')]-0x1]});_0x40cb13['addClass']('qd-ddc-'+_0x3d5236[_0x4b79('0xec')]);_0x40cb13[_0x4b79('0x4f')](_0x4b79('0xed'))['append'](_0x55e7d7[_0x4b79('0xb9')](_0x3d5236));_0x40cb13[_0x4b79('0x4f')](_0x4b79('0xee'))[_0x4b79('0x7f')](isNaN(_0x3d5236[_0x4b79('0xef')])?_0x3d5236[_0x4b79('0xef')]:0x0==_0x3d5236[_0x4b79('0xef')]?'Grátis':(_0xca55b7(_0x4b79('0xf0'))[_0x4b79('0x30')](_0x4b79('0x31'))||'R$')+'\x20'+qd_number_format(_0x3d5236['sellingPrice']/0x64,0x2,',','.'));_0x40cb13[_0x4b79('0x4f')](_0x4b79('0xf1'))['attr']({'data-sku':_0x3d5236['id'],'data-sku-index':_0x248e6f})[_0x4b79('0xc7')](_0x3d5236[_0x4b79('0x3d')]);_0x40cb13[_0x4b79('0x4f')](_0x4b79('0xf2'))['attr']({'data-sku':_0x3d5236['id'],'data-sku-index':_0x248e6f});_0x21895b['insertProdImg'](_0x3d5236['id'],_0x40cb13[_0x4b79('0x4f')](_0x4b79('0xf3')),_0x3d5236[_0x4b79('0xf4')]);_0x40cb13['find']('.qd-ddc-quantityMore,.qd-ddc-quantityMinus')[_0x4b79('0x30')]({'data-sku':_0x3d5236['id'],'data-sku-index':_0x248e6f});_0x40cb13[_0x4b79('0xf5')](_0x42bec2);_0x1e4ca8=_0x1e4ca8[_0x4b79('0x2a')](_0x40cb13);}try{var _0x32166e=_0x42bec2[_0x4b79('0x0')](_0x4b79('0xe0'))[_0x4b79('0x4f')](_0x4b79('0xf6'));_0x32166e[_0x4b79('0x6')]&&''==_0x32166e['val']()&&window['_QuatroDigital_DropDown'][_0x4b79('0x24')]['shippingData'][_0x4b79('0xf7')]&&_0x32166e[_0x4b79('0xc7')](window['_QuatroDigital_DropDown'][_0x4b79('0x24')][_0x4b79('0x5a')][_0x4b79('0xf7')][_0x4b79('0xf8')]);}catch(_0xc8aafc){_0x2429de(_0x4b79('0xf9')+_0xc8aafc['message'],_0x4b79('0x6b'));}_0x21895b['actionButtons'](_0x42bec2);_0x21895b[_0x4b79('0xe6')]();_0x12d30d&&_0x12d30d['lastSku']&&function(){_0x443bf7=_0x1e4ca8[_0x4b79('0x41')]('[data-sku=\x27'+_0x12d30d[_0x4b79('0xfa')]+'\x27]');_0x443bf7['length']&&(_0x21dee5=0x0,_0x1e4ca8[_0x4b79('0x32')](function(){var _0x12d30d=_0xca55b7(this);if(_0x12d30d['is'](_0x443bf7))return!0x1;_0x21dee5+=_0x12d30d[_0x4b79('0xfb')]();}),_0x21895b[_0x4b79('0xc5')](void 0x0,void 0x0,_0x21dee5,_0x42bec2[_0x4b79('0x2a')](_0x42bec2[_0x4b79('0xa6')]())),_0x1e4ca8[_0x4b79('0x47')]('qd-ddc-lastAddedFixed'),function(_0x193ca4){_0x193ca4[_0x4b79('0x53')](_0x4b79('0xfc'));_0x193ca4['addClass'](_0x4b79('0xfd'));setTimeout(function(){_0x193ca4[_0x4b79('0x47')]('qd-ddc-lastAdded');},_0x55e7d7[_0x4b79('0x88')]);}(_0x443bf7));}();});(function(){_QuatroDigital_DropDown['getOrderForm'][_0x4b79('0x3c')][_0x4b79('0x6')]?(_0xca55b7(_0x4b79('0x70'))['removeClass']('qd-ddc-cart-empty')['addClass'](_0x4b79('0xfe')),setTimeout(function(){_0xca55b7(_0x4b79('0x70'))[_0x4b79('0x47')](_0x4b79('0xff'));},_0x55e7d7['timeRemoveNewItemClass'])):_0xca55b7('body')[_0x4b79('0x47')](_0x4b79('0x100'))[_0x4b79('0x53')](_0x4b79('0x101'));}());'function'===typeof _0x55e7d7[_0x4b79('0x102')]?_0x55e7d7[_0x4b79('0x102')][_0x4b79('0x60')](this):_0x2429de(_0x4b79('0x103'));};_0x21895b[_0x4b79('0x104')]=function(_0x19889b,_0x5c80b1,_0x205aab){function _0x228b14(){_0x5c80b1[_0x4b79('0x47')](_0x4b79('0x105'))['load'](function(){_0xca55b7(this)['addClass'](_0x4b79('0x105'));})[_0x4b79('0x30')](_0x4b79('0x106'),_0x205aab);}_0x205aab?_0x228b14():isNaN(_0x19889b)?_0x2429de('Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU',_0x4b79('0x26')):alert(_0x4b79('0x107'));};_0x21895b[_0x4b79('0x108')]=function(_0x16ce9a){var _0x4e13ea=function(_0x8bf05c,_0x230229){var _0x42bec2=_0xca55b7(_0x8bf05c);var _0x295bec=_0x42bec2['attr'](_0x4b79('0x109'));var _0x21dee5=_0x42bec2[_0x4b79('0x30')]('data-sku-index');if(_0x295bec){var _0x20f1c8=parseInt(_0x42bec2[_0x4b79('0xc7')]())||0x1;_0x21895b[_0x4b79('0x10a')]([_0x295bec,_0x21dee5],_0x20f1c8,_0x20f1c8+0x1,function(_0x4dbd94){_0x42bec2[_0x4b79('0xc7')](_0x4dbd94);_0x4b79('0x8')===typeof _0x230229&&_0x230229();});}};var _0x42bec2=function(_0x296972,_0xa03268){var _0x42bec2=_0xca55b7(_0x296972);var _0x5d2c46=_0x42bec2[_0x4b79('0x30')](_0x4b79('0x109'));var _0x21dee5=_0x42bec2['attr'](_0x4b79('0x10b'));if(_0x5d2c46){var _0xf7b74e=parseInt(_0x42bec2[_0x4b79('0xc7')]())||0x2;_0x21895b['changeQantity']([_0x5d2c46,_0x21dee5],_0xf7b74e,_0xf7b74e-0x1,function(_0x1b250d){_0x42bec2[_0x4b79('0xc7')](_0x1b250d);'function'===typeof _0xa03268&&_0xa03268();});}};var _0x2affe8=function(_0x1569a7,_0x354497){var _0x42bec2=_0xca55b7(_0x1569a7);var _0x1fae7d=_0x42bec2[_0x4b79('0x30')](_0x4b79('0x109'));var _0x21dee5=_0x42bec2[_0x4b79('0x30')](_0x4b79('0x10b'));if(_0x1fae7d){var _0x79f944=parseInt(_0x42bec2[_0x4b79('0xc7')]())||0x1;_0x21895b[_0x4b79('0x10a')]([_0x1fae7d,_0x21dee5],0x1,_0x79f944,function(_0x4da3b4){_0x42bec2[_0x4b79('0xc7')](_0x4da3b4);_0x4b79('0x8')===typeof _0x354497&&_0x354497();});}};var _0x21dee5=_0x16ce9a['find'](_0x4b79('0x10c'));_0x21dee5[_0x4b79('0x53')](_0x4b79('0x10d'))[_0x4b79('0x32')](function(){var _0x16ce9a=_0xca55b7(this);_0x16ce9a[_0x4b79('0x4f')](_0x4b79('0x10e'))['on'](_0x4b79('0x10f'),function(_0x7f429a){_0x7f429a['preventDefault']();_0x21dee5[_0x4b79('0x53')](_0x4b79('0x110'));_0x4e13ea(_0x16ce9a[_0x4b79('0x4f')](_0x4b79('0xf1')),function(){_0x21dee5[_0x4b79('0x47')](_0x4b79('0x110'));});});_0x16ce9a[_0x4b79('0x4f')](_0x4b79('0x111'))['on'](_0x4b79('0x112'),function(_0x2cffa0){_0x2cffa0['preventDefault']();_0x21dee5[_0x4b79('0x53')]('qd-loading');_0x42bec2(_0x16ce9a[_0x4b79('0x4f')](_0x4b79('0xf1')),function(){_0x21dee5[_0x4b79('0x47')](_0x4b79('0x110'));});});_0x16ce9a[_0x4b79('0x4f')](_0x4b79('0xf1'))['on'](_0x4b79('0x113'),function(){_0x21dee5[_0x4b79('0x53')]('qd-loading');_0x2affe8(this,function(){_0x21dee5[_0x4b79('0x47')]('qd-loading');});});_0x16ce9a[_0x4b79('0x4f')](_0x4b79('0xf1'))['on']('keyup.qd_ddc_change',function(_0x32c6b1){0xd==_0x32c6b1[_0x4b79('0xc1')]&&(_0x21dee5[_0x4b79('0x53')]('qd-loading'),_0x2affe8(this,function(){_0x21dee5[_0x4b79('0x47')](_0x4b79('0x110'));}));});});_0x16ce9a[_0x4b79('0x4f')](_0x4b79('0xe7'))[_0x4b79('0x32')](function(){var _0x16ce9a=_0xca55b7(this);_0x16ce9a[_0x4b79('0x4f')](_0x4b79('0xf2'))['on'](_0x4b79('0x114'),function(){_0x16ce9a['addClass'](_0x4b79('0x110'));_0x21895b[_0x4b79('0x115')](_0xca55b7(this),function(_0x3dfc73){_0x3dfc73?_0x16ce9a[_0x4b79('0x116')](!0x0)['slideUp'](function(){_0x16ce9a[_0x4b79('0x117')]();_0x21895b['cartIsEmpty']();}):_0x16ce9a['removeClass'](_0x4b79('0x110'));});return!0x1;});});};_0x21895b[_0x4b79('0xc9')]=function(_0x3f0ec9){var _0x3a30d4=_0x3f0ec9['val'](),_0x3a30d4=_0x3a30d4[_0x4b79('0x7')](/[^0-9\-]/g,''),_0x3a30d4=_0x3a30d4[_0x4b79('0x7')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x4b79('0x118')),_0x3a30d4=_0x3a30d4[_0x4b79('0x7')](/(.{9}).*/g,'$1');_0x3f0ec9[_0x4b79('0xc7')](_0x3a30d4);0x9<=_0x3a30d4['length']&&(_0x3f0ec9[_0x4b79('0x15')](_0x4b79('0x119'))!=_0x3a30d4&&_0x49f592['calculateShipping']({'postalCode':_0x3a30d4,'country':_0x4b79('0x11a')})['done'](function(_0x31e584){window['_QuatroDigital_DropDown']['getOrderForm']=_0x31e584;_0x21895b[_0x4b79('0x89')]();})[_0x4b79('0x1c')](function(_0x53c69a){_0x2429de([_0x4b79('0x11b'),_0x53c69a]);updateCartData();}),_0x3f0ec9[_0x4b79('0x15')]('qdDdcLastPostalCode',_0x3a30d4));};_0x21895b['changeQantity']=function(_0xaa8704,_0x43f57c,_0x4b2ef7,_0x6c525d){function _0x59525e(_0x3cf1b8){_0x3cf1b8=_0x4b79('0x11c')!==typeof _0x3cf1b8?!0x1:_0x3cf1b8;_0x21895b[_0x4b79('0x89')]();window[_0x4b79('0x55')]['allowUpdate']=!0x1;_0x21895b[_0x4b79('0xe6')]();_0x4b79('0x3')!==typeof window[_0x4b79('0xe3')]&&'function'===typeof window['_QuatroDigital_AmountProduct'][_0x4b79('0xe4')]&&window[_0x4b79('0xe3')][_0x4b79('0xe4')][_0x4b79('0x60')](this);_0x4b79('0x8')===typeof adminCart&&adminCart();_0xca55b7['fn'][_0x4b79('0x22')](!0x0,void 0x0,_0x3cf1b8);_0x4b79('0x8')===typeof _0x6c525d&&_0x6c525d(_0x43f57c);}_0x4b2ef7=_0x4b2ef7||0x1;if(0x1>_0x4b2ef7)return _0x43f57c;if(_0x55e7d7[_0x4b79('0xe2')]){if('undefined'===typeof window[_0x4b79('0x55')][_0x4b79('0x24')][_0x4b79('0x3c')][_0xaa8704[0x1]])return _0x2429de(_0x4b79('0x11d')+_0xaa8704[0x1]+']'),_0x43f57c;window[_0x4b79('0x55')][_0x4b79('0x24')][_0x4b79('0x3c')][_0xaa8704[0x1]]['quantity']=_0x4b2ef7;window[_0x4b79('0x55')]['getOrderForm'][_0x4b79('0x3c')][_0xaa8704[0x1]][_0x4b79('0x11e')]=_0xaa8704[0x1];_0x49f592[_0x4b79('0x11f')]([window['_QuatroDigital_DropDown'][_0x4b79('0x24')][_0x4b79('0x3c')][_0xaa8704[0x1]]],[_0x4b79('0x3c'),_0x4b79('0x35'),_0x4b79('0x5a')])[_0x4b79('0x67')](function(_0x24ba32){window[_0x4b79('0x55')]['getOrderForm']=_0x24ba32;_0x59525e(!0x0);})[_0x4b79('0x1c')](function(_0x3916d8){_0x2429de([_0x4b79('0x120'),_0x3916d8]);_0x59525e();});}else _0x2429de('atenção\x20esta\x20método\x20esta\x20descontinuado');};_0x21895b[_0x4b79('0x115')]=function(_0x53694a,_0x3487dd){function _0x578190(_0x1664b0){_0x1664b0='boolean'!==typeof _0x1664b0?!0x1:_0x1664b0;_0x4b79('0x3')!==typeof window[_0x4b79('0xe3')]&&_0x4b79('0x8')===typeof window[_0x4b79('0xe3')][_0x4b79('0xe4')]&&window[_0x4b79('0xe3')][_0x4b79('0xe4')]['call'](this);_0x4b79('0x8')===typeof adminCart&&adminCart();_0xca55b7['fn'][_0x4b79('0x22')](!0x0,void 0x0,_0x1664b0);_0x4b79('0x8')===typeof _0x3487dd&&_0x3487dd(_0x21dee5);}var _0x21dee5=!0x1,_0x3c20f4=_0xca55b7(_0x53694a)[_0x4b79('0x30')](_0x4b79('0x10b'));if(_0x55e7d7[_0x4b79('0xe2')]){if('undefined'===typeof window['_QuatroDigital_DropDown']['getOrderForm']['items'][_0x3c20f4])return _0x2429de(_0x4b79('0x11d')+_0x3c20f4+']'),_0x21dee5;window['_QuatroDigital_DropDown'][_0x4b79('0x24')][_0x4b79('0x3c')][_0x3c20f4][_0x4b79('0x11e')]=_0x3c20f4;_0x49f592[_0x4b79('0x121')]([window[_0x4b79('0x55')][_0x4b79('0x24')]['items'][_0x3c20f4]],[_0x4b79('0x3c'),_0x4b79('0x35'),_0x4b79('0x5a')])[_0x4b79('0x67')](function(_0x41bf33){_0x21dee5=!0x0;window[_0x4b79('0x55')][_0x4b79('0x24')]=_0x41bf33;_0x52682f(_0x41bf33);_0x578190(!0x0);})[_0x4b79('0x1c')](function(_0xc08050){_0x2429de(['Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho',_0xc08050]);_0x578190();});}else alert('Atenção,\x20este\x20método\x20esta\x20descontinuado.');};_0x21895b['scrollCart']=function(_0x147d3e,_0x50380f,_0x2262cd,_0x4172e7){_0x4172e7=_0x4172e7||_0xca55b7('.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2');_0x147d3e=_0x147d3e||'+';_0x50380f=_0x50380f||0.9*_0x4172e7['height']();_0x4172e7[_0x4b79('0x116')](!0x0,!0x0)[_0x4b79('0x122')]({'scrollTop':isNaN(_0x2262cd)?_0x147d3e+'='+_0x50380f+'px':_0x2262cd});};_0x55e7d7[_0x4b79('0x123')]||(_0x21895b[_0x4b79('0x89')](),_0xca55b7['fn'][_0x4b79('0x22')](!0x0));_0xca55b7(window)['on'](_0x4b79('0x124'),function(){try{window['_QuatroDigital_DropDown']['getOrderForm']=void 0x0,_0x21895b['getCartInfoByUrl']();}catch(_0x2642a3){_0x2429de(_0x4b79('0x125')+_0x2642a3[_0x4b79('0x20')],'avisso');}});_0x4b79('0x8')===typeof _0x55e7d7[_0x4b79('0x3e')]?_0x55e7d7['callback']['call'](this):_0x2429de(_0x4b79('0x126'));};_0xca55b7['fn']['QD_dropDownCart']=function(_0xb0728e){var _0x48cd39=_0xca55b7(this);_0x48cd39['fn']=new _0xca55b7[(_0x4b79('0xb0'))](this,_0xb0728e);return _0x48cd39;};}catch(_0x5306d7){'undefined'!==typeof console&&'function'===typeof console[_0x4b79('0x12')]&&console['error'](_0x4b79('0x63'),_0x5306d7);}}(this));(function(_0xbed2fa){try{var _0x404185=jQuery;window['_QuatroDigital_AmountProduct']=window[_0x4b79('0xe3')]||{};window[_0x4b79('0xe3')][_0x4b79('0x3c')]={};window['_QuatroDigital_AmountProduct']['allowRecalculate']=!0x1;window[_0x4b79('0xe3')][_0x4b79('0x127')]=!0x1;window[_0x4b79('0xe3')][_0x4b79('0x128')]=!0x1;var _0x1f8093=function(){if(window[_0x4b79('0xe3')][_0x4b79('0x129')]){var _0x20155e=!0x1;var _0xbed2fa={};window['_QuatroDigital_AmountProduct'][_0x4b79('0x3c')]={};for(_0x4db3c3 in window['_QuatroDigital_DropDown'][_0x4b79('0x24')][_0x4b79('0x3c')])if(_0x4b79('0x14')===typeof window['_QuatroDigital_DropDown'][_0x4b79('0x24')]['items'][_0x4db3c3]){var _0x1adfff=window[_0x4b79('0x55')][_0x4b79('0x24')][_0x4b79('0x3c')][_0x4db3c3];_0x4b79('0x3')!==typeof _0x1adfff['productId']&&null!==_0x1adfff[_0x4b79('0x12a')]&&''!==_0x1adfff[_0x4b79('0x12a')]&&(window[_0x4b79('0xe3')]['items'][_0x4b79('0x12b')+_0x1adfff['productId']]=window[_0x4b79('0xe3')]['items'][_0x4b79('0x12b')+_0x1adfff[_0x4b79('0x12a')]]||{},window[_0x4b79('0xe3')][_0x4b79('0x3c')]['prod_'+_0x1adfff['productId']][_0x4b79('0x12c')]=_0x1adfff[_0x4b79('0x12a')],_0xbed2fa[_0x4b79('0x12b')+_0x1adfff[_0x4b79('0x12a')]]||(window[_0x4b79('0xe3')][_0x4b79('0x3c')][_0x4b79('0x12b')+_0x1adfff[_0x4b79('0x12a')]][_0x4b79('0x3a')]=0x0),window['_QuatroDigital_AmountProduct'][_0x4b79('0x3c')]['prod_'+_0x1adfff[_0x4b79('0x12a')]][_0x4b79('0x3a')]+=_0x1adfff[_0x4b79('0x3d')],_0x20155e=!0x0,_0xbed2fa['prod_'+_0x1adfff['productId']]=!0x0);}var _0x4db3c3=_0x20155e;}else _0x4db3c3=void 0x0;window[_0x4b79('0xe3')]['allowRecalculate']&&(_0x404185(_0x4b79('0x12d'))[_0x4b79('0x117')](),_0x404185('.qd-bap-item-added')[_0x4b79('0x47')](_0x4b79('0x12e')));for(var _0x7f9c6a in window[_0x4b79('0xe3')][_0x4b79('0x3c')]){_0x1adfff=window[_0x4b79('0xe3')][_0x4b79('0x3c')][_0x7f9c6a];if('object'!==typeof _0x1adfff)return;_0xbed2fa=_0x404185('input.qd-productId[value='+_0x1adfff[_0x4b79('0x12c')]+']')[_0x4b79('0x0')]('li');if(window[_0x4b79('0xe3')][_0x4b79('0x129')]||!_0xbed2fa[_0x4b79('0x4f')]('.qd-bap-wrapper')[_0x4b79('0x6')])_0x20155e=_0x404185(_0x4b79('0x12f')),_0x20155e[_0x4b79('0x4f')](_0x4b79('0x130'))[_0x4b79('0x4b')](_0x1adfff[_0x4b79('0x3a')]),_0x1adfff=_0xbed2fa[_0x4b79('0x4f')]('.qd_bap_wrapper_content'),_0x1adfff[_0x4b79('0x6')]?_0x1adfff[_0x4b79('0xa9')](_0x20155e)[_0x4b79('0x53')](_0x4b79('0x12e')):_0xbed2fa[_0x4b79('0xa9')](_0x20155e);}_0x4db3c3&&(window['_QuatroDigital_AmountProduct'][_0x4b79('0x129')]=!0x1);};window[_0x4b79('0xe3')][_0x4b79('0xe4')]=function(){window[_0x4b79('0xe3')]['allowRecalculate']=!0x0;_0x1f8093[_0x4b79('0x60')](this);};_0x404185(document)[_0x4b79('0x131')](function(){_0x1f8093[_0x4b79('0x60')](this);});}catch(_0x2397be){_0x4b79('0x3')!==typeof console&&'function'===typeof console[_0x4b79('0x12')]&&console[_0x4b79('0x12')](_0x4b79('0x63'),_0x2397be);}}(this));(function(){try{var _0x784ffb=jQuery,_0x48bbd9,_0x568b05={'selector':_0x4b79('0x132'),'dropDown':{},'buyButton':{}};_0x784ffb[_0x4b79('0x133')]=function(_0x2d7f1b){var _0xba6ee9={};_0x48bbd9=_0x784ffb['extend'](!0x0,{},_0x568b05,_0x2d7f1b);_0x2d7f1b=_0x784ffb(_0x48bbd9[_0x4b79('0x134')])[_0x4b79('0xb0')](_0x48bbd9[_0x4b79('0x135')]);_0xba6ee9[_0x4b79('0x7c')]='undefined'!==typeof _0x48bbd9[_0x4b79('0x135')]['updateOnlyHover']&&!0x1===_0x48bbd9[_0x4b79('0x135')]['updateOnlyHover']?_0x784ffb(_0x48bbd9[_0x4b79('0x134')])[_0x4b79('0x74')](_0x2d7f1b['fn'],_0x48bbd9[_0x4b79('0x7c')]):_0x784ffb(_0x48bbd9[_0x4b79('0x134')])[_0x4b79('0x74')](_0x48bbd9[_0x4b79('0x7c')]);_0xba6ee9['dropDown']=_0x2d7f1b;return _0xba6ee9;};_0x784ffb['fn'][_0x4b79('0x136')]=function(){_0x4b79('0x14')===typeof console&&'function'===typeof console['info']&&console[_0x4b79('0x29')](_0x4b79('0x137'));};_0x784ffb[_0x4b79('0x136')]=_0x784ffb['fn'][_0x4b79('0x136')];}catch(_0x48657f){_0x4b79('0x3')!==typeof console&&_0x4b79('0x8')===typeof console[_0x4b79('0x12')]&&console[_0x4b79('0x12')](_0x4b79('0x63'),_0x48657f);}}());
/* Automatizador de comments box do Facebook // Carlos Vinicius [Quatro Digital] */
/* Automatizador de comments box do Facebook // 1.6 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a=$(".fb-comments");a.length&&a.attr("data-href",document.location.href.split("#").shift().split("?").shift());$("#fb-root").length||$("body").append('<div id="fb-root"></div>');if(!$("script#facebook-jssdk").length){a=$("meta[property='fb:app_id']").attr("content")||!1;var b,c=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||(b=document.createElement("script"),b.id="facebook-jssdk",b.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+
(a?"&appId="+a:""),c.parentNode.insertBefore(b,c))}"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse()});
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);
