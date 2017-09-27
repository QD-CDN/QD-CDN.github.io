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
			Common.applyAmazingMenuFooter();
			Common.showFooterLinks();
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
		applyAmazingMenuFooter: function() {
			$('.footer-qd-v1-links-wrapper').QD_amazingMenu();
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
		},
		showFooterLinks: function () {
			$('.footer-qd-v1-links-wrapper > ul > li').click(function (e) {
				var $t = $(this);
				$t.toggleClass('qd-is-active');
				$t.find('> ul').toggleClass('qd-is-active');
			});
		},
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
		init: function() {
			Search.hideExtendedMenu();
			Search.openFiltersMenu();
			Search.spanTitle();
		},
		ajaxStop: function() {},
		windowOnload: function() {

		},
		hideExtendedMenu: function () {
			$(".search-qd-v1-navigator ul").each(function () {
				var t, li, qtt, moreLink, moreLi, click, liHide;

				t = $(this);
				li = t.find(">li");
				qtt = 1;

				if (li.length <= qtt) return;

				liHide = li.filter(":gt(" + (qtt - 1) + ")").stop(true, true).hide();
				moreLink = $('<a class="qd-viewMoreMenu">Mostrar mais</a>');
				t.after(moreLink);
				moreLi = $('<li class="qd-viewMoreWrapper"><a class="qd-viewMoreMenu2">Mostrar mais filtros</a></li>');
				t.append(moreLi);

				click = function () {
					liHide.stop(true, true).slideToggle(0, function () {
						if (li.filter(":visible").length > qtt) {
							moreLink.addClass("minus").text("Mostrar menos filtros");
							moreLi.addClass("minus").find("a").text("Mostrar menos filtros");
						}
						else {
							moreLink.removeClass("minus").text("Mostrar mais filtros");
							moreLi.removeClass("minus").find("a").text("Mostrar mais filtros");
						}
					});
				};
				moreLi.bind("click.qd_viewMore", click);
				moreLink.bind("click.qd_viewMore", click);
			});

			var wrapper = $(".search-single-navigator, .search-multiple-navigator");
			if($(window).width() <= 991){
			wrapper.find('h3, h4, h5').toggleClass('qd-seach-active-menu');
			wrapper.find('h3, h4, h5').find("+ ul").stop(true, true).slideToggle();
			wrapper.find('h3, h4, h5').find("+ div").stop(true, true).slideToggle();
			};
			wrapper.find('h3, h4, h5').click(function (evt) {
				var $t = $(this);

				if ($(evt.target).is(wrapper.find('h3')) || $(evt.target).is(wrapper.find('h4')) || $(evt.target).is(wrapper.find('h5'))) {
					$t.find("+ ul").stop(true, true).slideToggle(0, function () {
						$t.toggleClass('qd-seach-active-menu');
					});
					$t.find("+ div").stop(true, true).slideToggle(0, function () {
						$t.toggleClass('qd-seach-active-menu');
					});
				}
			});
		},
		openFiltersMenu: function() {
			$('.search-qd-v1-navigator-trigger').click(function(e) {
				e.preventDefault();
				
				$(document.body).toggleClass('qd-sn-on');
			});
		},
		spanTitle: function(){
			$('.search-qd-v1-result-title').find('h1,h2,h3,h4').wrapInner("<span></span>");
		}
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
			Orders.bootstrapCssFix();
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
var _0x61fe=['Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','message','qd-ssa-on','skus','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','split','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','off','QuatroDigital.ssa.prodUnavailable','qd-ssa-sku-prod-unavailable','vinyzvk%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','join','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','qdPlugin','initialSkuSelected','trigger','QuatroDigital.ssa.skuSelected','prod','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','unavailable','vtex.sku.selected.QD','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','available','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','function','QD_smartStockAvailable','object','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','undefined','alerta','toLowerCase','aviso','info','error','warn','apply','removeClass','qd-ssa-sku-no-selected','addClass','SkuSellersInformation','AvailableQuantity','attr','data-qd-ssa-qtt','each','[data-qd-ssa-text]','qd-ssa-hide','qd-ssa-show','filter','length','hide','html','replace','show'];(function(_0x1d4eed,_0x4922b2){var _0x10911b=function(_0x5422ab){while(--_0x5422ab){_0x1d4eed['push'](_0x1d4eed['shift']());}};_0x10911b(++_0x4922b2);}(_0x61fe,0x1a8));var _0xe61f=function(_0x59921f,_0x3476ec){_0x59921f=_0x59921f-0x0;var _0x1c03c0=_0x61fe[_0x59921f];return _0x1c03c0;};(function(_0x2d2281){function _0x2835d6(_0x410418,_0x5b6f95){_0x1914d1['qdAjax']({'url':'/produto/sku/'+_0x410418,'clearQueueDelay':null,'success':_0x5b6f95,'error':function(){_0x9a60d5(_0xe61f('0x0'));}});}var _0x1914d1=jQuery;if(_0xe61f('0x1')!==typeof _0x1914d1['fn'][_0xe61f('0x2')]){var _0x9a60d5=function(_0x6c467b,_0x353e7c){if(_0xe61f('0x3')===typeof console){var _0x26bfc9;'object'===typeof _0x6c467b?(_0x6c467b[_0xe61f('0x4')](_0xe61f('0x5')),_0x26bfc9=_0x6c467b):_0x26bfc9=[_0xe61f('0x5')+_0x6c467b];_0xe61f('0x6')===typeof _0x353e7c||_0xe61f('0x7')!==_0x353e7c[_0xe61f('0x8')]()&&_0xe61f('0x9')!==_0x353e7c[_0xe61f('0x8')]()?_0xe61f('0x6')!==typeof _0x353e7c&&_0xe61f('0xa')===_0x353e7c[_0xe61f('0x8')]()?console[_0xe61f('0xa')]['apply'](console,_0x26bfc9):console[_0xe61f('0xb')]['apply'](console,_0x26bfc9):console[_0xe61f('0xc')][_0xe61f('0xd')](console,_0x26bfc9);}},_0x68b549={},_0x581108=function(_0x3780f7,_0xf2dd40){function _0x3fb41e(_0x447758){try{_0x3780f7[_0xe61f('0xe')](_0xe61f('0xf'))[_0xe61f('0x10')]('qd-ssa-sku-selected');var _0x5ca83f=_0x447758[0x0][_0xe61f('0x11')][0x0][_0xe61f('0x12')];_0x3780f7[_0xe61f('0x13')](_0xe61f('0x14'),_0x5ca83f);_0x3780f7[_0xe61f('0x15')](function(){var _0x3780f7=_0x1914d1(this)['find'](_0xe61f('0x16'));if(0x1>_0x5ca83f)return _0x3780f7['hide']()[_0xe61f('0x10')](_0xe61f('0x17'))[_0xe61f('0xe')](_0xe61f('0x18'));var _0x447758=_0x3780f7[_0xe61f('0x19')]('[data-qd-ssa-text=\x22'+_0x5ca83f+'\x22]'),_0x447758=_0x447758[_0xe61f('0x1a')]?_0x447758:_0x3780f7['filter']('[data-qd-ssa-text=\x22default\x22]');_0x3780f7[_0xe61f('0x1b')]()[_0xe61f('0x10')](_0xe61f('0x17'))[_0xe61f('0xe')]('qd-ssa-show');_0x447758[_0xe61f('0x1c')](_0x447758[_0xe61f('0x1c')]()[_0xe61f('0x1d')]('#qtt',_0x5ca83f));_0x447758[_0xe61f('0x1e')]()['addClass'](_0xe61f('0x18'))[_0xe61f('0xe')]('qd-ssa-hide');});}catch(_0x3fa112){_0x9a60d5([_0xe61f('0x1f'),_0x3fa112[_0xe61f('0x20')]]);}}if(_0x3780f7[_0xe61f('0x1a')]){_0x3780f7[_0xe61f('0x10')](_0xe61f('0x21'));_0x3780f7[_0xe61f('0x10')]('qd-ssa-sku-no-selected');try{_0x3780f7[_0xe61f('0x10')]('qd-ssa-skus-'+vtxctx[_0xe61f('0x22')]['split'](';')[_0xe61f('0x1a')]);}catch(_0x226d9b){_0x9a60d5(['Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20',_0x226d9b[_0xe61f('0x20')]]);}_0x1914d1(window)['on'](_0xe61f('0x23'),function(_0x157d67,_0x9eb9c1,_0x34e12d){try{_0x2835d6(_0x34e12d[_0xe61f('0x24')],function(_0x392d9d){_0x3fb41e(_0x392d9d);0x1===vtxctx[_0xe61f('0x22')][_0xe61f('0x25')](';')['length']&&0x0==_0x392d9d[0x0][_0xe61f('0x11')][0x0][_0xe61f('0x12')]&&_0x1914d1(window)['trigger']('QuatroDigital.ssa.prodUnavailable');});}catch(_0x25f4dd){_0x9a60d5([_0xe61f('0x26'),_0x25f4dd['message']]);}});_0x1914d1(window)[_0xe61f('0x27')]('vtex.sku.selected.QD');_0x1914d1(window)['on'](_0xe61f('0x28'),function(){_0x3780f7[_0xe61f('0x10')](_0xe61f('0x29'))[_0xe61f('0x1b')]();});}};_0x2d2281=function(_0x4514ba){var _0x5b2424={'a':_0xe61f('0x2a')};return function(_0x59011d){var _0x871c21=function(_0x372aa6){return _0x372aa6;};var _0x19b4b7=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x59011d=_0x59011d['d'+_0x19b4b7[0x10]+'c'+_0x19b4b7[0x11]+'m'+_0x871c21(_0x19b4b7[0x1])+'n'+_0x19b4b7[0xd]]['l'+_0x19b4b7[0x12]+'c'+_0x19b4b7[0x0]+'ti'+_0x871c21('o')+'n'];var _0xce752e=function(_0xab63fa){return escape(encodeURIComponent(_0xab63fa[_0xe61f('0x1d')](/\./g,'¨')[_0xe61f('0x1d')](/[a-zA-Z]/g,function(_0x19eeab){return String[_0xe61f('0x2b')](('Z'>=_0x19eeab?0x5a:0x7a)>=(_0x19eeab=_0x19eeab[_0xe61f('0x2c')](0x0)+0xd)?_0x19eeab:_0x19eeab-0x1a);})));};var _0x2b1ef5=_0xce752e(_0x59011d[[_0x19b4b7[0x9],_0x871c21('o'),_0x19b4b7[0xc],_0x19b4b7[_0x871c21(0xd)]][_0xe61f('0x2d')]('')]);_0xce752e=_0xce752e((window[['js',_0x871c21('no'),'m',_0x19b4b7[0x1],_0x19b4b7[0x4][_0xe61f('0x2e')](),_0xe61f('0x2f')][_0xe61f('0x2d')]('')]||_0xe61f('0x30'))+['.v',_0x19b4b7[0xd],'e',_0x871c21('x'),'co',_0x871c21('mm'),_0xe61f('0x31'),_0x19b4b7[0x1],'.c',_0x871c21('o'),'m.',_0x19b4b7[0x13],'r'][_0xe61f('0x2d')](''));for(var _0x5201b7 in _0x5b2424){if(_0xce752e===_0x5201b7+_0x5b2424[_0x5201b7]||_0x2b1ef5===_0x5201b7+_0x5b2424[_0x5201b7]){var _0x2d2281='tr'+_0x19b4b7[0x11]+'e';break;}_0x2d2281='f'+_0x19b4b7[0x0]+'ls'+_0x871c21(_0x19b4b7[0x1])+'';}_0x871c21=!0x1;-0x1<_0x59011d[[_0x19b4b7[0xc],'e',_0x19b4b7[0x0],'rc',_0x19b4b7[0x9]][_0xe61f('0x2d')]('')][_0xe61f('0x32')](_0xe61f('0x33'))&&(_0x871c21=!0x0);return[_0x2d2281,_0x871c21];}(_0x4514ba);}(window);if(!eval(_0x2d2281[0x0]))return _0x2d2281[0x1]?_0x9a60d5(_0xe61f('0x34')):!0x1;_0x1914d1['fn'][_0xe61f('0x2')]=function(_0x177048){var _0x2637ed=_0x1914d1(this);_0x177048=_0x1914d1[_0xe61f('0x35')](!0x0,{},_0x68b549,_0x177048);_0x2637ed[_0xe61f('0x36')]=new _0x581108(_0x2637ed,_0x177048);try{_0xe61f('0x3')===typeof _0x1914d1['fn'][_0xe61f('0x2')][_0xe61f('0x37')]&&_0x1914d1(window)[_0xe61f('0x38')](_0xe61f('0x39'),[_0x1914d1['fn'][_0xe61f('0x2')][_0xe61f('0x37')][_0xe61f('0x3a')],_0x1914d1['fn']['QD_smartStockAvailable'][_0xe61f('0x37')]['sku']]);}catch(_0x59f5d9){_0x9a60d5([_0xe61f('0x3b'),_0x59f5d9[_0xe61f('0x20')]]);}_0x1914d1['fn']['QD_smartStockAvailable'][_0xe61f('0x3c')]&&_0x1914d1(window)[_0xe61f('0x38')](_0xe61f('0x28'));return _0x2637ed;};_0x1914d1(window)['on'](_0xe61f('0x3d'),function(_0x1cb6ef,_0x591587,_0x3a3c7e){try{_0x1914d1['fn'][_0xe61f('0x2')][_0xe61f('0x37')]={'prod':_0x591587,'sku':_0x3a3c7e},_0x1914d1(this)[_0xe61f('0x27')](_0x1cb6ef);}catch(_0x19b87b){_0x9a60d5([_0xe61f('0x3e'),_0x19b87b[_0xe61f('0x20')]]);}});_0x1914d1(window)['on']('vtex.sku.selectable',function(_0x3d16eb,_0x499926,_0xeec3b4){try{for(var _0x5c13e4=_0xeec3b4[_0xe61f('0x1a')],_0x2ea2f5=_0x499926=0x0;_0x2ea2f5<_0x5c13e4&&!_0xeec3b4[_0x2ea2f5][_0xe61f('0x3f')];_0x2ea2f5++)_0x499926+=0x1;_0x5c13e4<=_0x499926&&(_0x1914d1['fn'][_0xe61f('0x2')]['unavailable']=!0x0);_0x1914d1(this)[_0xe61f('0x27')](_0x3d16eb);}catch(_0x9b5706){_0x9a60d5([_0xe61f('0x40'),_0x9b5706['message']]);}});_0x1914d1(function(){_0x1914d1('.qd_smart_stock_available_auto')['QD_smartStockAvailable']();});}}(window));
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
var _0xac4a=['qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','url','img[alt=\x27','attr','data-qdam-value','.box-banner','clone','insertBefore','hide','text','trim','[class*=\x27colunas\x27]','qd-am-content-loaded','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','call','trigger','QuatroDigital.am.ajaxCallback','UL\x20do\x20menu\x20não\x20encontrada','qd-am-has-ul','children','replaceSpecialChars','>li','qd-amazing-menu','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','add','-li','callback','QuatroDigital.am.callback','extend','exec','getParent','closest','/qd-amazing-menu','undefined','info','unshift','alerta','toLowerCase','aviso','apply','join','error','warn','qdAmAddNdx','each','addClass','first','qd-am-first','last','qd-am-last','QD_amazingMenu','replace','fromCharCode','charCodeAt','toUpperCase','ite','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','.qd-am-collection','length','parent'];(function(_0x206064,_0x576a18){var _0x5336a2=function(_0x5c5047){while(--_0x5c5047){_0x206064['push'](_0x206064['shift']());}};_0x5336a2(++_0x576a18);}(_0xac4a,0x13f));var _0xaac4=function(_0x28c8e4,_0x1f7472){_0x28c8e4=_0x28c8e4-0x0;var _0xf246ba=_0xac4a[_0x28c8e4];return _0xf246ba;};(function(_0x5d2081){_0x5d2081['fn'][_0xaac4('0x0')]=_0x5d2081['fn'][_0xaac4('0x1')];}(jQuery));(function(_0x132fc3){var _0x38f4f4;var _0x1dc251=jQuery;if('function'!==typeof _0x1dc251['fn']['QD_amazingMenu']){var _0x2af0f6={'url':_0xaac4('0x2'),'callback':function(){},'ajaxCallback':function(){}};var _0x32d34c=function(_0x58ae95,_0x1283a5){if('object'===typeof console&&_0xaac4('0x3')!==typeof console['error']&&_0xaac4('0x3')!==typeof console[_0xaac4('0x4')]&&'undefined'!==typeof console['warn']){var _0x349671;'object'===typeof _0x58ae95?(_0x58ae95[_0xaac4('0x5')]('[QD\x20Amazing\x20Menu]\x0a'),_0x349671=_0x58ae95):_0x349671=['[QD\x20Amazing\x20Menu]\x0a'+_0x58ae95];if(_0xaac4('0x3')===typeof _0x1283a5||_0xaac4('0x6')!==_0x1283a5[_0xaac4('0x7')]()&&_0xaac4('0x8')!==_0x1283a5[_0xaac4('0x7')]())if('undefined'!==typeof _0x1283a5&&'info'===_0x1283a5[_0xaac4('0x7')]())try{console[_0xaac4('0x4')][_0xaac4('0x9')](console,_0x349671);}catch(_0x5a4801){try{console[_0xaac4('0x4')](_0x349671[_0xaac4('0xa')]('\x0a'));}catch(_0x5bcacd){}}else try{console[_0xaac4('0xb')][_0xaac4('0x9')](console,_0x349671);}catch(_0x46698d){try{console[_0xaac4('0xb')](_0x349671[_0xaac4('0xa')]('\x0a'));}catch(_0x2fbeb7){}}else try{console[_0xaac4('0xc')][_0xaac4('0x9')](console,_0x349671);}catch(_0x233278){try{console[_0xaac4('0xc')](_0x349671[_0xaac4('0xa')]('\x0a'));}catch(_0x1766c2){}}}};_0x1dc251['fn'][_0xaac4('0xd')]=function(){var _0x52686a=_0x1dc251(this);_0x52686a[_0xaac4('0xe')](function(_0x52085a){_0x1dc251(this)[_0xaac4('0xf')]('qd-am-li-'+_0x52085a);});_0x52686a[_0xaac4('0x10')]()[_0xaac4('0xf')](_0xaac4('0x11'));_0x52686a[_0xaac4('0x12')]()[_0xaac4('0xf')](_0xaac4('0x13'));return _0x52686a;};_0x1dc251['fn'][_0xaac4('0x14')]=function(){};_0x132fc3=function(_0x25b946){var _0x4166ee={'a':'vinyzvk%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x1d9c42){var _0x4e1e89=function(_0x3303f1){return _0x3303f1;};var _0x2013b7=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x1d9c42=_0x1d9c42['d'+_0x2013b7[0x10]+'c'+_0x2013b7[0x11]+'m'+_0x4e1e89(_0x2013b7[0x1])+'n'+_0x2013b7[0xd]]['l'+_0x2013b7[0x12]+'c'+_0x2013b7[0x0]+'ti'+_0x4e1e89('o')+'n'];var _0x43625c=function(_0x477b77){return escape(encodeURIComponent(_0x477b77[_0xaac4('0x15')](/\./g,'¨')[_0xaac4('0x15')](/[a-zA-Z]/g,function(_0x590905){return String[_0xaac4('0x16')](('Z'>=_0x590905?0x5a:0x7a)>=(_0x590905=_0x590905[_0xaac4('0x17')](0x0)+0xd)?_0x590905:_0x590905-0x1a);})));};var _0x174860=_0x43625c(_0x1d9c42[[_0x2013b7[0x9],_0x4e1e89('o'),_0x2013b7[0xc],_0x2013b7[_0x4e1e89(0xd)]][_0xaac4('0xa')]('')]);_0x43625c=_0x43625c((window[['js',_0x4e1e89('no'),'m',_0x2013b7[0x1],_0x2013b7[0x4][_0xaac4('0x18')](),_0xaac4('0x19')][_0xaac4('0xa')]('')]||'---')+['.v',_0x2013b7[0xd],'e',_0x4e1e89('x'),'co',_0x4e1e89('mm'),_0xaac4('0x1a'),_0x2013b7[0x1],'.c',_0x4e1e89('o'),'m.',_0x2013b7[0x13],'r']['join'](''));for(var _0x54203b in _0x4166ee){if(_0x43625c===_0x54203b+_0x4166ee[_0x54203b]||_0x174860===_0x54203b+_0x4166ee[_0x54203b]){var _0x4fac85='tr'+_0x2013b7[0x11]+'e';break;}_0x4fac85='f'+_0x2013b7[0x0]+'ls'+_0x4e1e89(_0x2013b7[0x1])+'';}_0x4e1e89=!0x1;-0x1<_0x1d9c42[[_0x2013b7[0xc],'e',_0x2013b7[0x0],'rc',_0x2013b7[0x9]]['join']('')][_0xaac4('0x1b')](_0xaac4('0x1c'))&&(_0x4e1e89=!0x0);return[_0x4fac85,_0x4e1e89];}(_0x25b946);}(window);if(!eval(_0x132fc3[0x0]))return _0x132fc3[0x1]?_0x32d34c(_0xaac4('0x1d')):!0x1;var _0xe93120=function(_0x3c1445){var _0x249a5d=_0x3c1445[_0xaac4('0x1e')](_0xaac4('0x1f'));var _0x2f36ad=_0x249a5d[_0xaac4('0x20')]('.qd-am-banner');var _0x316445=_0x249a5d[_0xaac4('0x20')](_0xaac4('0x21'));if(_0x2f36ad[_0xaac4('0x22')]||_0x316445[_0xaac4('0x22')])_0x2f36ad[_0xaac4('0x23')]()['addClass'](_0xaac4('0x24')),_0x316445['parent']()[_0xaac4('0xf')](_0xaac4('0x25')),_0x1dc251[_0xaac4('0x26')]({'url':_0x38f4f4[_0xaac4('0x27')],'dataType':'html','success':function(_0x5000e1){var _0x58f748=_0x1dc251(_0x5000e1);_0x2f36ad[_0xaac4('0xe')](function(){var _0x5000e1=_0x1dc251(this);var _0x2df196=_0x58f748[_0xaac4('0x1e')](_0xaac4('0x28')+_0x5000e1[_0xaac4('0x29')](_0xaac4('0x2a'))+'\x27]');_0x2df196[_0xaac4('0x22')]&&(_0x2df196[_0xaac4('0xe')](function(){_0x1dc251(this)[_0xaac4('0x0')](_0xaac4('0x2b'))[_0xaac4('0x2c')]()[_0xaac4('0x2d')](_0x5000e1);}),_0x5000e1[_0xaac4('0x2e')]());})[_0xaac4('0xf')]('qd-am-content-loaded');_0x316445['each'](function(){var _0x5000e1={};var _0x40f64b=_0x1dc251(this);_0x58f748[_0xaac4('0x1e')]('h2')['each'](function(){if(_0x1dc251(this)[_0xaac4('0x2f')]()[_0xaac4('0x30')]()[_0xaac4('0x7')]()==_0x40f64b[_0xaac4('0x29')](_0xaac4('0x2a'))[_0xaac4('0x30')]()[_0xaac4('0x7')]())return _0x5000e1=_0x1dc251(this),!0x1;});_0x5000e1['length']&&(_0x5000e1[_0xaac4('0xe')](function(){_0x1dc251(this)[_0xaac4('0x0')](_0xaac4('0x31'))['clone']()[_0xaac4('0x2d')](_0x40f64b);}),_0x40f64b['hide']());})['addClass'](_0xaac4('0x32'));},'error':function(){_0x32d34c(_0xaac4('0x33')+_0x38f4f4[_0xaac4('0x27')]+'\x27\x20falho.');},'complete':function(){_0x38f4f4['ajaxCallback'][_0xaac4('0x34')](this);_0x1dc251(window)[_0xaac4('0x35')](_0xaac4('0x36'),_0x3c1445);},'clearQueueDelay':0xbb8});};_0x1dc251[_0xaac4('0x14')]=function(_0x2b65b1){var _0x36f4d4=_0x2b65b1['find']('ul[itemscope]')[_0xaac4('0xe')](function(){var _0x3b2b72=_0x1dc251(this);if(!_0x3b2b72['length'])return _0x32d34c([_0xaac4('0x37'),_0x2b65b1],_0xaac4('0x6'));_0x3b2b72[_0xaac4('0x1e')]('li\x20>ul')[_0xaac4('0x23')]()[_0xaac4('0xf')](_0xaac4('0x38'));_0x3b2b72['find']('li')[_0xaac4('0xe')](function(){var _0x2dad54=_0x1dc251(this);var _0x3dcade=_0x2dad54[_0xaac4('0x39')](':not(ul)');_0x3dcade[_0xaac4('0x22')]&&_0x2dad54['addClass']('qd-am-elem-'+_0x3dcade[_0xaac4('0x10')]()[_0xaac4('0x2f')]()[_0xaac4('0x30')]()[_0xaac4('0x3a')]()[_0xaac4('0x15')](/\./g,'')[_0xaac4('0x15')](/\s/g,'-')[_0xaac4('0x7')]());});var _0x236d8e=_0x3b2b72['find'](_0xaac4('0x3b'))[_0xaac4('0xd')]();_0x3b2b72[_0xaac4('0xf')](_0xaac4('0x3c'));_0x236d8e=_0x236d8e['find'](_0xaac4('0x3d'));_0x236d8e[_0xaac4('0xe')](function(){var _0x379e4e=_0x1dc251(this);_0x379e4e['find'](_0xaac4('0x3b'))[_0xaac4('0xd')]()[_0xaac4('0xf')](_0xaac4('0x3e'));_0x379e4e['addClass'](_0xaac4('0x3f'));_0x379e4e[_0xaac4('0x23')]()[_0xaac4('0xf')]('qd-am-dropdown');});_0x236d8e[_0xaac4('0xf')](_0xaac4('0x40'));var _0x42e0dc=0x0,_0x132fc3=function(_0x2e7ed3){_0x42e0dc+=0x1;_0x2e7ed3=_0x2e7ed3[_0xaac4('0x39')]('li')[_0xaac4('0x39')]('*');_0x2e7ed3[_0xaac4('0x22')]&&(_0x2e7ed3[_0xaac4('0xf')]('qd-am-level-'+_0x42e0dc),_0x132fc3(_0x2e7ed3));};_0x132fc3(_0x3b2b72);_0x3b2b72[_0xaac4('0x41')](_0x3b2b72[_0xaac4('0x1e')]('ul'))[_0xaac4('0xe')](function(){var _0x360420=_0x1dc251(this);_0x360420[_0xaac4('0xf')]('qd-am-'+_0x360420['children']('li')[_0xaac4('0x22')]+_0xaac4('0x42'));});});_0xe93120(_0x36f4d4);_0x38f4f4[_0xaac4('0x43')][_0xaac4('0x34')](this);_0x1dc251(window)['trigger'](_0xaac4('0x44'),_0x2b65b1);};_0x1dc251['fn']['QD_amazingMenu']=function(_0x216eb2){var _0x43ca24=_0x1dc251(this);if(!_0x43ca24['length'])return _0x43ca24;_0x38f4f4=_0x1dc251[_0xaac4('0x45')]({},_0x2af0f6,_0x216eb2);_0x43ca24[_0xaac4('0x46')]=new _0x1dc251[(_0xaac4('0x14'))](_0x1dc251(this));return _0x43ca24;};_0x1dc251(function(){_0x1dc251('.qd_amazing_menu_auto')['QD_amazingMenu']();});}}(this));
/* Quatro Digital Smart Cart */
var _0x1951=['match','productPageCallback','buyButtonClickCallback','ku=','pop','split','shift','asyncCallback','productAddedToCart','fakeRequest','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','Callback\x20não\x20é\x20uma\x20função','.qd-bb-itemAddWrapper','prepend','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','QuatroDigital.qd_bb_prod_add','indexOf','/checkout/cart/add','bind','productAddedToCart.qdSbbVtex','abs','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','QD_dropDownCart','vinyzvk%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','qd-bb-lightBoxProdAdd','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','val','keyup.qd_ddc_cep','updateOnlyHover','mouseenter.qd_ddc_hover','cartIsEmpty','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','texts','#items','#shipping','#total','.qd-ddc-viewCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','productCategoryIds','qd-ddc-','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','meta[name=currency]','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','.qd-ddc-shipping\x20input','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','message','actionButtons','[data-sku=\x27','lastSku','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','qd-ddc-cart-empty','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','src','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','.qd-ddc-quantity','focusout.qd_ddc_change','removeProduct','stop','slideUp','remove','shippingCalculate','$1-$2$3','qdDdcLastPostalCode','calculateShipping','BRA','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','quantity','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','.qd-bap-wrapper','qd-bap-item-added','prodId','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd_bap_wrapper_content','ajaxStop','.qdDdcContainer','dropDown','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','undefined','pow','toFixed','round','length','replace','join','function','trim','prototype','capitalize','charAt','toUpperCase','qdAjax','qdAjaxQueue','jquery','000','error','extend','GET','object','data','stringify','toString','url','type','jqXHR','ajax','done','fail','always','complete','clearQueueDelay','version','4.0','closest','simpleCart','checkout','getOrderForm','QuatroDigital_simpleCart','ajaxStopOn','toLowerCase','[Simple\x20Cart]\x0a','warn','info','QD_simpleCart','elements','add','.qd_items_text','content','each','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','Shipping','value','total','currencySymbol','shipping','allTotal','qtt','showQuantityByItems','items','callback','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','hide','filter','.singular','.plural','show','qd-emptyCart','removeClass','$this','O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','alerta','cartTotalE','html','cartQttE','find','cartTotal','itemsTextE','itemsText','emptyCart','smartCheckout','_QuatroDigital_DropDown','vtexjs','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','QD_checkoutQueue','shippingData','trigger','simpleCartCallback.quatro_digital','ajaxRequestbuyButtonAsynchronous','call','ReloadItemsCart','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','Oooops!\x20','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','Callbacks','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','javascript:','body','.productQuickView','success','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','location','#produto,\x20.produto','QD_buyButton','isSmartCheckout','qd-bb-click-active','click.qd_bb_buy_sc','allowBuyClick','clickBuySmartCheckout','preventDefault','Método\x20descontinuado!','buyButton','addClass','qd-sbb-on','.btn-add-buy-button-asynchronous','.remove-href','qd-bb-active','children','.qd-bb-productAdded','append','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','.buy-in-page-button','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','prodAdd','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','attr','href','---','qd-bb-itemAddBuyButtonWrapper','qd-bb-itemAddCartWrapper','getCartInfoByUrl','função\x20descontinuada','allowUpdate','autoWatchBuyButton','unbind','click','load','execDefaultAction','redirect=false','redirect=true','queue','buyIfQuantityZeroed','test'];(function(_0x491c4e,_0x4fe46d){var _0x3e92c9=function(_0x24ff17){while(--_0x24ff17){_0x491c4e['push'](_0x491c4e['shift']());}};_0x3e92c9(++_0x4fe46d);}(_0x1951,0x1f3));var _0x1195=function(_0x4235bf,_0x23fd34){_0x4235bf=_0x4235bf-0x0;var _0x360741=_0x1951[_0x4235bf];return _0x360741;};(function(_0x2dc082){_0x2dc082['fn'][_0x1195('0x0')]=_0x2dc082['fn']['closest'];}(jQuery));function qd_number_format(_0x2a8d13,_0x11324d,_0x5e337f,_0xa2fea6){_0x2a8d13=(_0x2a8d13+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x2a8d13=isFinite(+_0x2a8d13)?+_0x2a8d13:0x0;_0x11324d=isFinite(+_0x11324d)?Math['abs'](_0x11324d):0x0;_0xa2fea6='undefined'===typeof _0xa2fea6?',':_0xa2fea6;_0x5e337f=_0x1195('0x1')===typeof _0x5e337f?'.':_0x5e337f;var _0x56b03e='',_0x56b03e=function(_0x1d7a7f,_0x1e5311){var _0x11324d=Math[_0x1195('0x2')](0xa,_0x1e5311);return''+(Math['round'](_0x1d7a7f*_0x11324d)/_0x11324d)[_0x1195('0x3')](_0x1e5311);},_0x56b03e=(_0x11324d?_0x56b03e(_0x2a8d13,_0x11324d):''+Math[_0x1195('0x4')](_0x2a8d13))['split']('.');0x3<_0x56b03e[0x0][_0x1195('0x5')]&&(_0x56b03e[0x0]=_0x56b03e[0x0][_0x1195('0x6')](/\B(?=(?:\d{3})+(?!\d))/g,_0xa2fea6));(_0x56b03e[0x1]||'')[_0x1195('0x5')]<_0x11324d&&(_0x56b03e[0x1]=_0x56b03e[0x1]||'',_0x56b03e[0x1]+=Array(_0x11324d-_0x56b03e[0x1][_0x1195('0x5')]+0x1)[_0x1195('0x7')]('0'));return _0x56b03e[_0x1195('0x7')](_0x5e337f);};_0x1195('0x8')!==typeof String['prototype'][_0x1195('0x9')]&&(String[_0x1195('0xa')]['trim']=function(){return this[_0x1195('0x6')](/^\s+|\s+$/g,'');});'function'!=typeof String[_0x1195('0xa')]['capitalize']&&(String[_0x1195('0xa')][_0x1195('0xb')]=function(){return this[_0x1195('0xc')](0x0)[_0x1195('0xd')]()+this['slice'](0x1)['toLowerCase']();});(function(_0x59a93b){if('function'!==typeof _0x59a93b[_0x1195('0xe')]){var _0xe5eb5f={};_0x59a93b[_0x1195('0xf')]=_0xe5eb5f;0x96>parseInt((_0x59a93b['fn'][_0x1195('0x10')]['replace'](/[^0-9]+/g,'')+_0x1195('0x11'))['slice'](0x0,0x3),0xa)&&console&&_0x1195('0x8')==typeof console[_0x1195('0x12')]&&console['error']();_0x59a93b[_0x1195('0xe')]=function(_0x5d4ebf){try{var _0x4c5e46=_0x59a93b[_0x1195('0x13')]({},{'url':'','type':_0x1195('0x14'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x5d4ebf);var _0x452811=_0x1195('0x15')===typeof _0x4c5e46[_0x1195('0x16')]?JSON[_0x1195('0x17')](_0x4c5e46[_0x1195('0x16')]):_0x4c5e46[_0x1195('0x16')][_0x1195('0x18')]();var _0x49e3c6=encodeURIComponent(_0x4c5e46[_0x1195('0x19')]+'|'+_0x4c5e46[_0x1195('0x1a')]+'|'+_0x452811);_0xe5eb5f[_0x49e3c6]=_0xe5eb5f[_0x49e3c6]||{};_0x1195('0x1')==typeof _0xe5eb5f[_0x49e3c6][_0x1195('0x1b')]?_0xe5eb5f[_0x49e3c6][_0x1195('0x1b')]=_0x59a93b[_0x1195('0x1c')](_0x4c5e46):(_0xe5eb5f[_0x49e3c6][_0x1195('0x1b')][_0x1195('0x1d')](_0x4c5e46['success']),_0xe5eb5f[_0x49e3c6][_0x1195('0x1b')][_0x1195('0x1e')](_0x4c5e46['error']),_0xe5eb5f[_0x49e3c6][_0x1195('0x1b')][_0x1195('0x1f')](_0x4c5e46[_0x1195('0x20')]));_0xe5eb5f[_0x49e3c6]['jqXHR'][_0x1195('0x1f')](function(){isNaN(parseInt(_0x4c5e46[_0x1195('0x21')]))||setTimeout(function(){_0xe5eb5f[_0x49e3c6][_0x1195('0x1b')]=void 0x0;},_0x4c5e46['clearQueueDelay']);});return _0xe5eb5f[_0x49e3c6][_0x1195('0x1b')];}catch(_0xf603b2){_0x1195('0x1')!==typeof console&&_0x1195('0x8')===typeof console['error']&&console[_0x1195('0x12')]('Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20'+_0xf603b2['message']);}};_0x59a93b['qdAjax'][_0x1195('0x22')]=_0x1195('0x23');}}(jQuery));(function(_0x237c65){_0x237c65['fn'][_0x1195('0x0')]=_0x237c65['fn'][_0x1195('0x24')];}(jQuery));(function(){var _0x388ace=jQuery;if(_0x1195('0x8')!==typeof _0x388ace['fn'][_0x1195('0x25')]){_0x388ace(function(){var _0x520253=vtexjs[_0x1195('0x26')][_0x1195('0x27')];vtexjs[_0x1195('0x26')]['getOrderForm']=function(){return _0x520253['call']();};});try{window['QuatroDigital_simpleCart']=window[_0x1195('0x28')]||{};window['QuatroDigital_simpleCart'][_0x1195('0x29')]=!0x1;_0x388ace['fn']['simpleCart']=function(_0x55c216,_0x274777,_0x1129d2){var _0x50d948=function(_0x2f8e00,_0xd7be73){if(_0x1195('0x15')===typeof console){var _0x289a73=_0x1195('0x15')===typeof _0x2f8e00;_0x1195('0x1')!==typeof _0xd7be73&&'alerta'===_0xd7be73[_0x1195('0x2a')]()?_0x289a73?console['warn'](_0x1195('0x2b'),_0x2f8e00[0x0],_0x2f8e00[0x1],_0x2f8e00[0x2],_0x2f8e00[0x3],_0x2f8e00[0x4],_0x2f8e00[0x5],_0x2f8e00[0x6],_0x2f8e00[0x7]):console[_0x1195('0x2c')](_0x1195('0x2b')+_0x2f8e00):_0x1195('0x1')!==typeof _0xd7be73&&_0x1195('0x2d')===_0xd7be73[_0x1195('0x2a')]()?_0x289a73?console['info'](_0x1195('0x2b'),_0x2f8e00[0x0],_0x2f8e00[0x1],_0x2f8e00[0x2],_0x2f8e00[0x3],_0x2f8e00[0x4],_0x2f8e00[0x5],_0x2f8e00[0x6],_0x2f8e00[0x7]):console[_0x1195('0x2d')]('[Simple\x20Cart]\x0a'+_0x2f8e00):_0x289a73?console[_0x1195('0x12')](_0x1195('0x2b'),_0x2f8e00[0x0],_0x2f8e00[0x1],_0x2f8e00[0x2],_0x2f8e00[0x3],_0x2f8e00[0x4],_0x2f8e00[0x5],_0x2f8e00[0x6],_0x2f8e00[0x7]):console[_0x1195('0x12')](_0x1195('0x2b')+_0x2f8e00);}};var _0x30fbd6=_0x388ace(this);_0x1195('0x15')===typeof _0x55c216?_0x274777=_0x55c216:(_0x55c216=_0x55c216||!0x1,_0x30fbd6=_0x30fbd6['add'](_0x388ace[_0x1195('0x2e')]['elements']));if(!_0x30fbd6[_0x1195('0x5')])return _0x30fbd6;_0x388ace[_0x1195('0x2e')]['elements']=_0x388ace[_0x1195('0x2e')][_0x1195('0x2f')][_0x1195('0x30')](_0x30fbd6);_0x1129d2=_0x1195('0x1')===typeof _0x1129d2?!0x1:_0x1129d2;var _0x10d34f={'cartQtt':'.qd_cart_qtt','cartTotal':'.qd_cart_total','itemsText':_0x1195('0x31'),'currencySymbol':(_0x388ace('meta[name=currency]')['attr'](_0x1195('0x32'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x6395f9=_0x388ace[_0x1195('0x13')]({},_0x10d34f,_0x274777);var _0x573629=_0x388ace('');_0x30fbd6[_0x1195('0x33')](function(){var _0x461a37=_0x388ace(this);_0x461a37[_0x1195('0x16')](_0x1195('0x34'))||_0x461a37[_0x1195('0x16')]('qd_simpleCartOpts',_0x6395f9);});var _0xc185c4=function(_0x763e85){window[_0x1195('0x35')]=window[_0x1195('0x35')]||{};for(var _0x55c216=0x0,_0x5a8e55=0x0,_0x229e73=0x0;_0x229e73<_0x763e85[_0x1195('0x36')][_0x1195('0x5')];_0x229e73++)_0x1195('0x37')==_0x763e85['totalizers'][_0x229e73]['id']&&(_0x5a8e55+=_0x763e85[_0x1195('0x36')][_0x229e73][_0x1195('0x38')]),_0x55c216+=_0x763e85[_0x1195('0x36')][_0x229e73][_0x1195('0x38')];window['_QuatroDigital_CartData'][_0x1195('0x39')]=_0x6395f9[_0x1195('0x3a')]+qd_number_format(_0x55c216/0x64,0x2,',','.');window[_0x1195('0x35')][_0x1195('0x3b')]=_0x6395f9[_0x1195('0x3a')]+qd_number_format(_0x5a8e55/0x64,0x2,',','.');window[_0x1195('0x35')][_0x1195('0x3c')]=_0x6395f9[_0x1195('0x3a')]+qd_number_format((_0x55c216+_0x5a8e55)/0x64,0x2,',','.');window[_0x1195('0x35')][_0x1195('0x3d')]=0x0;if(_0x6395f9[_0x1195('0x3e')])for(_0x229e73=0x0;_0x229e73<_0x763e85[_0x1195('0x3f')][_0x1195('0x5')];_0x229e73++)window[_0x1195('0x35')]['qtt']+=_0x763e85[_0x1195('0x3f')][_0x229e73]['quantity'];else window[_0x1195('0x35')][_0x1195('0x3d')]=_0x763e85[_0x1195('0x3f')][_0x1195('0x5')]||0x0;try{window[_0x1195('0x35')]['callback']&&window[_0x1195('0x35')][_0x1195('0x40')][_0x1195('0x41')]&&window[_0x1195('0x35')][_0x1195('0x40')][_0x1195('0x41')]();}catch(_0x2f52a7){_0x50d948(_0x1195('0x42'));}_0x3e641c(_0x573629);};var _0x156e03=function(_0x4881a9,_0x26853d){0x1===_0x4881a9?_0x26853d[_0x1195('0x43')]()[_0x1195('0x44')](_0x1195('0x45'))['show']():_0x26853d[_0x1195('0x43')]()[_0x1195('0x44')](_0x1195('0x46'))[_0x1195('0x47')]();};var _0x3f4d51=function(_0x52e781){0x1>_0x52e781?_0x30fbd6['addClass'](_0x1195('0x48')):_0x30fbd6[_0x1195('0x49')](_0x1195('0x48'));};var _0x11aa8b=function(_0x4a6f79,_0x107b1c){var _0x2c4e4c=parseInt(window[_0x1195('0x35')][_0x1195('0x3d')],0xa);_0x107b1c[_0x1195('0x4a')]['show']();isNaN(_0x2c4e4c)&&(_0x50d948(_0x1195('0x4b'),_0x1195('0x4c')),_0x2c4e4c=0x0);_0x107b1c[_0x1195('0x4d')][_0x1195('0x4e')](window[_0x1195('0x35')]['total']);_0x107b1c[_0x1195('0x4f')]['html'](_0x2c4e4c);_0x156e03(_0x2c4e4c,_0x107b1c['itemsTextE']);_0x3f4d51(_0x2c4e4c);};var _0x3e641c=function(_0x4b7a04){_0x30fbd6[_0x1195('0x33')](function(){var _0x50ecba={};var _0x17fc99=_0x388ace(this);_0x55c216&&_0x17fc99[_0x1195('0x16')](_0x1195('0x34'))&&_0x388ace[_0x1195('0x13')](_0x6395f9,_0x17fc99[_0x1195('0x16')](_0x1195('0x34')));_0x50ecba[_0x1195('0x4a')]=_0x17fc99;_0x50ecba[_0x1195('0x4f')]=_0x17fc99[_0x1195('0x50')](_0x6395f9['cartQtt'])||_0x573629;_0x50ecba['cartTotalE']=_0x17fc99[_0x1195('0x50')](_0x6395f9[_0x1195('0x51')])||_0x573629;_0x50ecba[_0x1195('0x52')]=_0x17fc99[_0x1195('0x50')](_0x6395f9[_0x1195('0x53')])||_0x573629;_0x50ecba['emptyElem']=_0x17fc99[_0x1195('0x50')](_0x6395f9[_0x1195('0x54')])||_0x573629;_0x11aa8b(_0x4b7a04,_0x50ecba);_0x17fc99['addClass']('qd-sc-populated');});};(function(){if(_0x6395f9[_0x1195('0x55')]){window[_0x1195('0x56')]=window[_0x1195('0x56')]||{};if('undefined'!==typeof window[_0x1195('0x56')][_0x1195('0x27')]&&(_0x1129d2||!_0x55c216))return _0xc185c4(window[_0x1195('0x56')][_0x1195('0x27')]);if('object'!==typeof window[_0x1195('0x57')]||_0x1195('0x1')===typeof window['vtexjs'][_0x1195('0x26')])if('object'===typeof vtex&&_0x1195('0x15')===typeof vtex[_0x1195('0x26')]&&_0x1195('0x1')!==typeof vtex[_0x1195('0x26')][_0x1195('0x58')])new vtex['checkout'][(_0x1195('0x58'))]();else return _0x50d948(_0x1195('0x59'));_0x388ace[_0x1195('0x5a')]([_0x1195('0x3f'),_0x1195('0x36'),_0x1195('0x5b')],{'done':function(_0x2c6137){_0xc185c4(_0x2c6137);window['_QuatroDigital_DropDown'][_0x1195('0x27')]=_0x2c6137;},'fail':function(_0x43c2c4){_0x50d948(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.',_0x43c2c4]);}});}else alert('Esta\x20é\x20uma\x20função\x20descontinuada\x20=/');}());_0x6395f9[_0x1195('0x40')]();_0x388ace(window)[_0x1195('0x5c')](_0x1195('0x5d'));return _0x30fbd6;};_0x388ace[_0x1195('0x2e')]={'elements':_0x388ace('')};_0x388ace(function(){var _0x51510c;_0x1195('0x8')===typeof window[_0x1195('0x5e')]&&(_0x51510c=window[_0x1195('0x5e')],window[_0x1195('0x5e')]=function(_0x221699,_0x2423f8,_0x4de752,_0xa33ce0,_0x11708e){_0x51510c[_0x1195('0x5f')](this,_0x221699,_0x2423f8,_0x4de752,_0xa33ce0,function(){_0x1195('0x8')===typeof _0x11708e&&_0x11708e();_0x388ace[_0x1195('0x2e')][_0x1195('0x2f')][_0x1195('0x33')](function(){var _0x389c18=_0x388ace(this);_0x389c18[_0x1195('0x25')](_0x389c18[_0x1195('0x16')](_0x1195('0x34')));});});});});var _0x3638be=window[_0x1195('0x60')]||void 0x0;window[_0x1195('0x60')]=function(_0x5d74ee){_0x388ace['fn'][_0x1195('0x25')](!0x0);_0x1195('0x8')===typeof _0x3638be?_0x3638be[_0x1195('0x5f')](this,_0x5d74ee):alert(_0x5d74ee);};_0x388ace(function(){var _0x2c13cd=_0x388ace('.qd_cart_auto');_0x2c13cd['length']&&_0x2c13cd[_0x1195('0x25')]();});_0x388ace(function(){_0x388ace(window)['bind'](_0x1195('0x61'),function(){_0x388ace['fn'][_0x1195('0x25')](!0x0);});});}catch(_0x3e88a5){_0x1195('0x1')!==typeof console&&_0x1195('0x8')===typeof console['error']&&console[_0x1195('0x12')](_0x1195('0x62'),_0x3e88a5);}}}());(function(){var _0x5d9744=function(_0xe0d79a,_0x4b5ef4){if(_0x1195('0x15')===typeof console){var _0x3c7939='object'===typeof _0xe0d79a;_0x1195('0x1')!==typeof _0x4b5ef4&&_0x1195('0x4c')===_0x4b5ef4[_0x1195('0x2a')]()?_0x3c7939?console[_0x1195('0x2c')](_0x1195('0x63'),_0xe0d79a[0x0],_0xe0d79a[0x1],_0xe0d79a[0x2],_0xe0d79a[0x3],_0xe0d79a[0x4],_0xe0d79a[0x5],_0xe0d79a[0x6],_0xe0d79a[0x7]):console['warn'](_0x1195('0x63')+_0xe0d79a):_0x1195('0x1')!==typeof _0x4b5ef4&&_0x1195('0x2d')===_0x4b5ef4[_0x1195('0x2a')]()?_0x3c7939?console['info'](_0x1195('0x63'),_0xe0d79a[0x0],_0xe0d79a[0x1],_0xe0d79a[0x2],_0xe0d79a[0x3],_0xe0d79a[0x4],_0xe0d79a[0x5],_0xe0d79a[0x6],_0xe0d79a[0x7]):console[_0x1195('0x2d')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a'+_0xe0d79a):_0x3c7939?console[_0x1195('0x12')](_0x1195('0x63'),_0xe0d79a[0x0],_0xe0d79a[0x1],_0xe0d79a[0x2],_0xe0d79a[0x3],_0xe0d79a[0x4],_0xe0d79a[0x5],_0xe0d79a[0x6],_0xe0d79a[0x7]):console[_0x1195('0x12')](_0x1195('0x63')+_0xe0d79a);}},_0x3c2da1=null,_0x1d51c4={},_0x16a9dd={},_0x3940eb={};$[_0x1195('0x5a')]=function(_0x4804a1,_0x27cdeb){if(null===_0x3c2da1)if(_0x1195('0x15')===typeof window[_0x1195('0x57')]&&_0x1195('0x1')!==typeof window[_0x1195('0x57')][_0x1195('0x26')])_0x3c2da1=window[_0x1195('0x57')][_0x1195('0x26')];else return _0x5d9744(_0x1195('0x64'));var _0x161845=$[_0x1195('0x13')]({'done':function(){},'fail':function(){}},_0x27cdeb),_0x1960a6=_0x4804a1[_0x1195('0x7')](';'),_0x1fbe45=function(){_0x1d51c4[_0x1960a6][_0x1195('0x30')](_0x161845[_0x1195('0x1d')]);_0x16a9dd[_0x1960a6][_0x1195('0x30')](_0x161845[_0x1195('0x1e')]);};_0x3940eb[_0x1960a6]?_0x1fbe45():(_0x1d51c4[_0x1960a6]=$[_0x1195('0x65')](),_0x16a9dd[_0x1960a6]=$[_0x1195('0x65')](),_0x1fbe45(),_0x3940eb[_0x1960a6]=!0x0,_0x3c2da1[_0x1195('0x27')](_0x4804a1)['done'](function(_0x566abe){_0x3940eb[_0x1960a6]=!0x1;_0x1d51c4[_0x1960a6][_0x1195('0x41')](_0x566abe);})[_0x1195('0x1e')](function(_0x14b657){_0x3940eb[_0x1960a6]=!0x1;_0x16a9dd[_0x1960a6][_0x1195('0x41')](_0x14b657);}));};}());(function(_0x456932){try{var _0xe51f3a=jQuery,_0xb16ad3,_0x14d805=_0xe51f3a({}),_0x4ed6c5=function(_0x52bdbd,_0x4986a2){if(_0x1195('0x15')===typeof console&&'undefined'!==typeof console['error']&&_0x1195('0x1')!==typeof console[_0x1195('0x2d')]&&_0x1195('0x1')!==typeof console[_0x1195('0x2c')]){var _0x4b727c;'object'===typeof _0x52bdbd?(_0x52bdbd[_0x1195('0x66')](_0x1195('0x67')),_0x4b727c=_0x52bdbd):_0x4b727c=['[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a'+_0x52bdbd];if(_0x1195('0x1')===typeof _0x4986a2||_0x1195('0x4c')!==_0x4986a2[_0x1195('0x2a')]()&&_0x1195('0x68')!==_0x4986a2[_0x1195('0x2a')]())if(_0x1195('0x1')!==typeof _0x4986a2&&_0x1195('0x2d')===_0x4986a2['toLowerCase']())try{console[_0x1195('0x2d')][_0x1195('0x69')](console,_0x4b727c);}catch(_0x4ed423){try{console['info'](_0x4b727c[_0x1195('0x7')]('\x0a'));}catch(_0x5f387e){}}else try{console['error'][_0x1195('0x69')](console,_0x4b727c);}catch(_0x5347c5){try{console[_0x1195('0x12')](_0x4b727c[_0x1195('0x7')]('\x0a'));}catch(_0x6963d8){}}else try{console[_0x1195('0x2c')][_0x1195('0x69')](console,_0x4b727c);}catch(_0x161d97){try{console[_0x1195('0x2c')](_0x4b727c[_0x1195('0x7')]('\x0a'));}catch(_0xab57d9){}}}},_0x4e04d6={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':'.productInformationWrapper\x20\x20a.buy-button','buyQtt':'input.buy-in-page-quantity','selectSkuMsg':_0x1195('0x6a'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x2a3a1f,_0x3f8320,_0x288336){_0xe51f3a(_0x1195('0x6b'))['is'](_0x1195('0x6c'))&&(_0x1195('0x6d')===_0x3f8320?alert('Produto\x20adicionado\x20ao\x20carrinho!'):(alert(_0x1195('0x6e')),(_0x1195('0x15')===typeof parent?parent:document)[_0x1195('0x6f')]['href']=_0x288336));},'isProductPage':function(){return _0xe51f3a(_0x1195('0x6b'))['is'](_0x1195('0x70'));},'execDefaultAction':function(_0x22b5a6){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0xe51f3a[_0x1195('0x71')]=function(_0xb2c3a7,_0x4a6a04){function _0x2f0454(_0x3e10ce){_0xb16ad3[_0x1195('0x72')]?_0x3e10ce[_0x1195('0x16')](_0x1195('0x73'))||(_0x3e10ce[_0x1195('0x16')](_0x1195('0x73'),0x1),_0x3e10ce['on'](_0x1195('0x74'),function(_0x40cede){if(!_0xb16ad3[_0x1195('0x75')]())return!0x0;if(!0x0!==_0x4087ef[_0x1195('0x76')]['call'](this))return _0x40cede[_0x1195('0x77')](),!0x1;})):alert(_0x1195('0x78'));}function _0x434984(_0x3011eb){_0x3011eb=_0x3011eb||_0xe51f3a(_0xb16ad3[_0x1195('0x79')]);_0x3011eb[_0x1195('0x33')](function(){var _0x3011eb=_0xe51f3a(this);_0x3011eb['is']('.qd-sbb-on')||(_0x3011eb[_0x1195('0x7a')](_0x1195('0x7b')),_0x3011eb['is'](_0x1195('0x7c'))&&!_0x3011eb['is'](_0x1195('0x7d'))||_0x3011eb[_0x1195('0x16')]('qd-bb-active')||(_0x3011eb[_0x1195('0x16')](_0x1195('0x7e'),0x1),_0x3011eb[_0x1195('0x7f')](_0x1195('0x80'))[_0x1195('0x5')]||_0x3011eb[_0x1195('0x81')](_0x1195('0x82')),_0x3011eb['is'](_0x1195('0x83'))&&_0xb16ad3['isProductPage']()&&_0x1787f0[_0x1195('0x5f')](_0x3011eb),_0x2f0454(_0x3011eb)));});_0xb16ad3[_0x1195('0x84')]()&&!_0x3011eb[_0x1195('0x5')]&&_0x4ed6c5(_0x1195('0x85')+_0x3011eb[_0x1195('0x86')]+'\x27.',_0x1195('0x2d'));}var _0x28c870=_0xe51f3a(_0xb2c3a7);var _0x4087ef=this;window['_Quatro_Digital_dropDown']=window[_0x1195('0x87')]||{};window[_0x1195('0x35')]=window[_0x1195('0x35')]||{};_0x4087ef[_0x1195('0x88')]=function(_0x2b38a5,_0x4e58ba){_0x28c870[_0x1195('0x7a')](_0x1195('0x89'));_0xe51f3a('body')[_0x1195('0x7a')](_0x1195('0x8a'));var _0x8736d3=_0xe51f3a(_0xb16ad3['buyButton'])[_0x1195('0x44')]('[href=\x27'+(_0x2b38a5[_0x1195('0x8b')](_0x1195('0x8c'))||_0x1195('0x8d'))+'\x27]')[_0x1195('0x30')](_0x2b38a5);_0x8736d3[_0x1195('0x7a')](_0x1195('0x8e'));setTimeout(function(){_0x28c870[_0x1195('0x49')](_0x1195('0x8f'));_0x8736d3[_0x1195('0x49')]('qd-bb-itemAddBuyButtonWrapper');},_0xb16ad3['timeRemoveNewItemClass']);window[_0x1195('0x87')]['getOrderForm']=void 0x0;if(_0x1195('0x1')!==typeof _0x4a6a04&&_0x1195('0x8')===typeof _0x4a6a04[_0x1195('0x90')])return _0xb16ad3[_0x1195('0x72')]||(_0x4ed6c5(_0x1195('0x91')),_0x4a6a04[_0x1195('0x90')]()),window[_0x1195('0x56')][_0x1195('0x27')]=void 0x0,_0x4a6a04[_0x1195('0x90')](function(_0xcd42db){window[_0x1195('0x87')][_0x1195('0x27')]=_0xcd42db;_0xe51f3a['fn'][_0x1195('0x25')](!0x0,void 0x0,!0x0);},{'lastSku':_0x4e58ba});window['_Quatro_Digital_dropDown'][_0x1195('0x92')]=!0x0;_0xe51f3a['fn'][_0x1195('0x25')](!0x0);};(function(){if(_0xb16ad3[_0x1195('0x72')]&&_0xb16ad3[_0x1195('0x93')]){var _0x1e7be8=_0xe51f3a('.btn-add-buy-button-asynchronous');_0x1e7be8[_0x1195('0x5')]&&_0x434984(_0x1e7be8);}}());var _0x1787f0=function(){var _0x25c070=_0xe51f3a(this);_0x1195('0x1')!==typeof _0x25c070['data'](_0x1195('0x79'))?(_0x25c070['unbind']('click'),_0x2f0454(_0x25c070)):(_0x25c070['bind']('mouseenter.qd_bb_buy_sc',function(_0x5aad0c){_0x25c070[_0x1195('0x94')](_0x1195('0x95'));_0x2f0454(_0x25c070);_0xe51f3a(this)[_0x1195('0x94')](_0x5aad0c);}),_0xe51f3a(window)[_0x1195('0x96')](function(){_0x25c070['unbind']('click');_0x2f0454(_0x25c070);_0x25c070[_0x1195('0x94')]('mouseenter.qd_bb_buy_sc');}));};_0x4087ef[_0x1195('0x76')]=function(){var _0x3bd2d5=_0xe51f3a(this),_0xb2c3a7=_0x3bd2d5['attr'](_0x1195('0x8c'))||'';if(-0x1<_0xb2c3a7['indexOf'](_0xb16ad3['selectSkuMsg']))return!0x0;_0xb2c3a7=_0xb2c3a7[_0x1195('0x6')](/redirect\=(false|true)/gi,'')['replace']('?','?redirect=false&')[_0x1195('0x6')](/\&\&/gi,'&');if(_0xb16ad3[_0x1195('0x97')](_0x3bd2d5))return _0x3bd2d5[_0x1195('0x8b')](_0x1195('0x8c'),_0xb2c3a7[_0x1195('0x6')](_0x1195('0x98'),_0x1195('0x99'))),!0x0;_0xb2c3a7=_0xb2c3a7[_0x1195('0x6')](/http.?:/i,'');_0x14d805[_0x1195('0x9a')](function(_0x5db658){if(!_0xb16ad3[_0x1195('0x9b')]&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0x1195('0x9c')](_0xb2c3a7))return _0x5db658();var _0x3b5a53=function(_0x2e665c,_0x2923e0){var _0x434984=_0xb2c3a7[_0x1195('0x9d')](/sku\=([0-9]+)/gi),_0x404884=[];if(_0x1195('0x15')===typeof _0x434984&&null!==_0x434984)for(var _0x5c2eed=_0x434984[_0x1195('0x5')]-0x1;0x0<=_0x5c2eed;_0x5c2eed--){var _0x572e66=parseInt(_0x434984[_0x5c2eed][_0x1195('0x6')](/sku\=/gi,''));isNaN(_0x572e66)||_0x404884['push'](_0x572e66);}_0xb16ad3[_0x1195('0x9e')][_0x1195('0x5f')](this,_0x2e665c,_0x2923e0,_0xb2c3a7);_0x4087ef[_0x1195('0x9f')][_0x1195('0x5f')](this,_0x2e665c,_0x2923e0,_0xb2c3a7,_0x404884);_0x4087ef['prodAdd'](_0x3bd2d5,_0xb2c3a7['split'](_0x1195('0xa0'))[_0x1195('0xa1')]()[_0x1195('0xa2')]('&')[_0x1195('0xa3')]());_0x1195('0x8')===typeof _0xb16ad3['asyncCallback']&&_0xb16ad3[_0x1195('0xa4')][_0x1195('0x5f')](this);_0xe51f3a(window)[_0x1195('0x5c')](_0x1195('0xa5'));_0xe51f3a(window)[_0x1195('0x5c')]('cartProductAdded.vtex');};_0xb16ad3[_0x1195('0xa6')]?(_0x3b5a53(null,_0x1195('0x6d')),_0x5db658()):_0xe51f3a['ajax']({'url':_0xb2c3a7,'complete':_0x3b5a53})[_0x1195('0x1f')](function(){_0x5db658();});});};_0x4087ef[_0x1195('0x9f')]=function(_0x57ed00,_0x3a848c,_0x87e43,_0x4471cc){try{'success'===_0x3a848c&&'object'===typeof window[_0x1195('0xa7')]&&'function'===typeof window[_0x1195('0xa7')][_0x1195('0xa8')]&&window[_0x1195('0xa7')]['_QuatroDigital_prodBuyCallback'](_0x57ed00,_0x3a848c,_0x87e43,_0x4471cc);}catch(_0x38c14e){_0x4ed6c5(_0x1195('0xa9'));}};_0x434984();_0x1195('0x8')===typeof _0xb16ad3[_0x1195('0x40')]?_0xb16ad3['callback'][_0x1195('0x5f')](this):_0x4ed6c5(_0x1195('0xaa'));};var _0x2f5e9d=_0xe51f3a[_0x1195('0x65')]();_0xe51f3a['fn'][_0x1195('0x71')]=function(_0x4d08d4,_0xee6968){var _0x456932=_0xe51f3a(this);_0x1195('0x1')!==typeof _0xee6968||'object'!==typeof _0x4d08d4||_0x4d08d4 instanceof _0xe51f3a||(_0xee6968=_0x4d08d4,_0x4d08d4=void 0x0);_0xb16ad3=_0xe51f3a[_0x1195('0x13')]({},_0x4e04d6,_0xee6968);var _0x38de50;_0x2f5e9d[_0x1195('0x30')](function(){_0x456932[_0x1195('0x7f')](_0x1195('0xab'))[_0x1195('0x5')]||_0x456932[_0x1195('0xac')](_0x1195('0xad'));_0x38de50=new _0xe51f3a['QD_buyButton'](_0x456932,_0x4d08d4);});_0x2f5e9d[_0x1195('0x41')]();_0xe51f3a(window)['on'](_0x1195('0xae'),function(_0x161331,_0x1e8fa8,_0x502ae5){_0x38de50[_0x1195('0x88')](_0x1e8fa8,_0x502ae5);});return _0xe51f3a[_0x1195('0x13')](_0x456932,_0x38de50);};var _0x4cf1fc=0x0;_0xe51f3a(document)['ajaxSend'](function(_0x473c73,_0x4be971,_0x4d5004){-0x1<_0x4d5004[_0x1195('0x19')][_0x1195('0x2a')]()[_0x1195('0xaf')](_0x1195('0xb0'))&&(_0x4cf1fc=(_0x4d5004['url']['match'](/sku\=([0-9]+)/i)||[''])[_0x1195('0xa1')]());});_0xe51f3a(window)[_0x1195('0xb1')](_0x1195('0xb2'),function(){_0xe51f3a(window)['trigger'](_0x1195('0xae'),[new _0xe51f3a(),_0x4cf1fc]);});_0xe51f3a(document)['ajaxStop'](function(){_0x2f5e9d[_0x1195('0x41')]();});}catch(_0x37c88e){_0x1195('0x1')!==typeof console&&'function'===typeof console[_0x1195('0x12')]&&console[_0x1195('0x12')](_0x1195('0x62'),_0x37c88e);}}(this));function qd_number_format(_0x3b8fbb,_0x3091ed,_0x2dda4a,_0x10c2a7){_0x3b8fbb=(_0x3b8fbb+'')[_0x1195('0x6')](/[^0-9+\-Ee.]/g,'');_0x3b8fbb=isFinite(+_0x3b8fbb)?+_0x3b8fbb:0x0;_0x3091ed=isFinite(+_0x3091ed)?Math[_0x1195('0xb3')](_0x3091ed):0x0;_0x10c2a7=_0x1195('0x1')===typeof _0x10c2a7?',':_0x10c2a7;_0x2dda4a='undefined'===typeof _0x2dda4a?'.':_0x2dda4a;var _0x23257f='',_0x23257f=function(_0x1aeaa5,_0xd8c864){var _0x1d1fd8=Math['pow'](0xa,_0xd8c864);return''+(Math[_0x1195('0x4')](_0x1aeaa5*_0x1d1fd8)/_0x1d1fd8)['toFixed'](_0xd8c864);},_0x23257f=(_0x3091ed?_0x23257f(_0x3b8fbb,_0x3091ed):''+Math[_0x1195('0x4')](_0x3b8fbb))['split']('.');0x3<_0x23257f[0x0][_0x1195('0x5')]&&(_0x23257f[0x0]=_0x23257f[0x0][_0x1195('0x6')](/\B(?=(?:\d{3})+(?!\d))/g,_0x10c2a7));(_0x23257f[0x1]||'')[_0x1195('0x5')]<_0x3091ed&&(_0x23257f[0x1]=_0x23257f[0x1]||'',_0x23257f[0x1]+=Array(_0x3091ed-_0x23257f[0x1][_0x1195('0x5')]+0x1)[_0x1195('0x7')]('0'));return _0x23257f[_0x1195('0x7')](_0x2dda4a);}(function(){try{window[_0x1195('0x35')]=window[_0x1195('0x35')]||{},window['_QuatroDigital_CartData']['callback']=window[_0x1195('0x35')][_0x1195('0x40')]||$[_0x1195('0x65')]();}catch(_0x2a3010){'undefined'!==typeof console&&_0x1195('0x8')===typeof console[_0x1195('0x12')]&&console[_0x1195('0x12')](_0x1195('0x62'),_0x2a3010['message']);}}());(function(_0x188890){try{var _0x147250=jQuery,_0x72843=function(_0x860cb5,_0x397248){if('object'===typeof console&&_0x1195('0x1')!==typeof console[_0x1195('0x12')]&&_0x1195('0x1')!==typeof console[_0x1195('0x2d')]&&_0x1195('0x1')!==typeof console[_0x1195('0x2c')]){var _0x596033;_0x1195('0x15')===typeof _0x860cb5?(_0x860cb5[_0x1195('0x66')](_0x1195('0xb4')),_0x596033=_0x860cb5):_0x596033=['[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'+_0x860cb5];if('undefined'===typeof _0x397248||_0x1195('0x4c')!==_0x397248[_0x1195('0x2a')]()&&_0x1195('0x68')!==_0x397248['toLowerCase']())if(_0x1195('0x1')!==typeof _0x397248&&_0x1195('0x2d')===_0x397248[_0x1195('0x2a')]())try{console['info']['apply'](console,_0x596033);}catch(_0x64e621){try{console['info'](_0x596033[_0x1195('0x7')]('\x0a'));}catch(_0x5ad734){}}else try{console[_0x1195('0x12')][_0x1195('0x69')](console,_0x596033);}catch(_0x32f589){try{console[_0x1195('0x12')](_0x596033[_0x1195('0x7')]('\x0a'));}catch(_0x3d79e6){}}else try{console[_0x1195('0x2c')]['apply'](console,_0x596033);}catch(_0x311512){try{console[_0x1195('0x2c')](_0x596033[_0x1195('0x7')]('\x0a'));}catch(_0x28c2){}}}};window[_0x1195('0x56')]=window[_0x1195('0x56')]||{};window[_0x1195('0x56')][_0x1195('0x92')]=!0x0;_0x147250[_0x1195('0xb5')]=function(){};_0x147250['fn'][_0x1195('0xb5')]=function(){return{'fn':new _0x147250()};};var _0x250b11=function(_0x5ee4ba){var _0x16c7bf={'a':_0x1195('0xb6')};return function(_0x2ff308){var _0x9036c6=function(_0x380f30){return _0x380f30;};var _0x56eda0=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2ff308=_0x2ff308['d'+_0x56eda0[0x10]+'c'+_0x56eda0[0x11]+'m'+_0x9036c6(_0x56eda0[0x1])+'n'+_0x56eda0[0xd]]['l'+_0x56eda0[0x12]+'c'+_0x56eda0[0x0]+'ti'+_0x9036c6('o')+'n'];var _0x46336e=function(_0x38323b){return escape(encodeURIComponent(_0x38323b[_0x1195('0x6')](/\./g,'¨')[_0x1195('0x6')](/[a-zA-Z]/g,function(_0xdf798f){return String[_0x1195('0xb7')](('Z'>=_0xdf798f?0x5a:0x7a)>=(_0xdf798f=_0xdf798f[_0x1195('0xb8')](0x0)+0xd)?_0xdf798f:_0xdf798f-0x1a);})));};var _0x188890=_0x46336e(_0x2ff308[[_0x56eda0[0x9],_0x9036c6('o'),_0x56eda0[0xc],_0x56eda0[_0x9036c6(0xd)]][_0x1195('0x7')]('')]);_0x46336e=_0x46336e((window[['js',_0x9036c6('no'),'m',_0x56eda0[0x1],_0x56eda0[0x4][_0x1195('0xd')](),'ite'][_0x1195('0x7')]('')]||_0x1195('0x8d'))+['.v',_0x56eda0[0xd],'e',_0x9036c6('x'),'co',_0x9036c6('mm'),_0x1195('0xb9'),_0x56eda0[0x1],'.c',_0x9036c6('o'),'m.',_0x56eda0[0x13],'r'][_0x1195('0x7')](''));for(var _0x4ff4f7 in _0x16c7bf){if(_0x46336e===_0x4ff4f7+_0x16c7bf[_0x4ff4f7]||_0x188890===_0x4ff4f7+_0x16c7bf[_0x4ff4f7]){var _0x1d1a30='tr'+_0x56eda0[0x11]+'e';break;}_0x1d1a30='f'+_0x56eda0[0x0]+'ls'+_0x9036c6(_0x56eda0[0x1])+'';}_0x9036c6=!0x1;-0x1<_0x2ff308[[_0x56eda0[0xc],'e',_0x56eda0[0x0],'rc',_0x56eda0[0x9]]['join']('')][_0x1195('0xaf')](_0x1195('0xba'))&&(_0x9036c6=!0x0);return[_0x1d1a30,_0x9036c6];}(_0x5ee4ba);}(window);if(!eval(_0x250b11[0x0]))return _0x250b11[0x1]?_0x72843(_0x1195('0xbb')):!0x1;_0x147250[_0x1195('0xb5')]=function(_0x3c9b4e,_0x1a3406){var _0x13b52c=_0x147250(_0x3c9b4e);if(!_0x13b52c[_0x1195('0x5')])return _0x13b52c;var _0x884b97=_0x147250[_0x1195('0x13')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x1195('0xbc'),'linkCheckout':_0x1195('0xbd'),'cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':_0x1195('0xbe'),'continueShopping':_0x1195('0xbf'),'shippingForm':_0x1195('0xc0')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x1c9e09){return _0x1c9e09[_0x1195('0xc1')]||_0x1c9e09['name'];},'callback':function(){},'callbackProductsList':function(){}},_0x1a3406);_0x147250('');var _0xcdaa06=this;if(_0x884b97[_0x1195('0x55')]){var _0x23ff91=!0x1;_0x1195('0x1')===typeof window[_0x1195('0x57')]&&(_0x72843(_0x1195('0xc2')),_0x147250[_0x1195('0x1c')]({'url':_0x1195('0xc3'),'async':!0x1,'dataType':_0x1195('0xc4'),'error':function(){_0x72843(_0x1195('0xc5'));_0x23ff91=!0x0;}}));if(_0x23ff91)return _0x72843(_0x1195('0xc6'));}if(_0x1195('0x15')===typeof window['vtexjs']&&_0x1195('0x1')!==typeof window[_0x1195('0x57')][_0x1195('0x26')])var _0x468141=window[_0x1195('0x57')]['checkout'];else if(_0x1195('0x15')===typeof vtex&&'object'===typeof vtex[_0x1195('0x26')]&&_0x1195('0x1')!==typeof vtex[_0x1195('0x26')][_0x1195('0x58')])_0x468141=new vtex[(_0x1195('0x26'))][(_0x1195('0x58'))]();else return _0x72843(_0x1195('0x59'));_0xcdaa06[_0x1195('0xc7')]=_0x1195('0xc8');var _0x55f714=function(_0x43a86a){_0x147250(this)['append'](_0x43a86a);_0x43a86a['find'](_0x1195('0xc9'))[_0x1195('0x30')](_0x147250('.qd_ddc_lightBoxOverlay'))['on']('click.qd_ddc_closeFn',function(){_0x13b52c[_0x1195('0x49')](_0x1195('0xca'));_0x147250(document[_0x1195('0x6b')])[_0x1195('0x49')](_0x1195('0x8a'));});_0x147250(document)[_0x1195('0xcb')](_0x1195('0xcc'))['on'](_0x1195('0xcc'),function(_0x5a3489){0x1b==_0x5a3489[_0x1195('0xcd')]&&(_0x13b52c['removeClass']('qd-bb-lightBoxProdAdd'),_0x147250(document[_0x1195('0x6b')])[_0x1195('0x49')]('qd-bb-lightBoxBodyProdAdd'));});var _0x5714c2=_0x43a86a['find'](_0x1195('0xce'));_0x43a86a[_0x1195('0x50')]('.qd-ddc-scrollUp')['on'](_0x1195('0xcf'),function(){_0xcdaa06[_0x1195('0xd0')]('-',void 0x0,void 0x0,_0x5714c2);return!0x1;});_0x43a86a[_0x1195('0x50')](_0x1195('0xd1'))['on']('click.qd_ddc_scrollDown',function(){_0xcdaa06['scrollCart'](void 0x0,void 0x0,void 0x0,_0x5714c2);return!0x1;});_0x43a86a[_0x1195('0x50')]('.qd-ddc-shipping\x20input')[_0x1195('0xd2')]('')['on'](_0x1195('0xd3'),function(){_0xcdaa06['shippingCalculate'](_0x147250(this));});if(_0x884b97[_0x1195('0xd4')]){var _0x1a3406=0x0;_0x147250(this)['on'](_0x1195('0xd5'),function(){var _0x43a86a=function(){window[_0x1195('0x56')][_0x1195('0x92')]&&(_0xcdaa06[_0x1195('0x90')](),window['_QuatroDigital_DropDown'][_0x1195('0x92')]=!0x1,_0x147250['fn'][_0x1195('0x25')](!0x0),_0xcdaa06[_0x1195('0xd6')]());};_0x1a3406=setInterval(function(){_0x43a86a();},0x258);_0x43a86a();});_0x147250(this)['on']('mouseleave.qd_ddc_hover',function(){clearInterval(_0x1a3406);});}};var _0x349014=function(_0x2b1949){_0x2b1949=_0x147250(_0x2b1949);_0x884b97['texts'][_0x1195('0x51')]=_0x884b97['texts'][_0x1195('0x51')][_0x1195('0x6')](_0x1195('0xd7'),_0x1195('0xd8'));_0x884b97[_0x1195('0xd9')][_0x1195('0x51')]=_0x884b97['texts'][_0x1195('0x51')][_0x1195('0x6')](_0x1195('0xda'),'<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>');_0x884b97[_0x1195('0xd9')][_0x1195('0x51')]=_0x884b97[_0x1195('0xd9')][_0x1195('0x51')][_0x1195('0x6')](_0x1195('0xdb'),'<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>');_0x884b97[_0x1195('0xd9')]['cartTotal']=_0x884b97[_0x1195('0xd9')][_0x1195('0x51')]['replace'](_0x1195('0xdc'),'<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0x2b1949[_0x1195('0x50')](_0x1195('0xdd'))[_0x1195('0x4e')](_0x884b97['texts']['linkCart']);_0x2b1949[_0x1195('0x50')](_0x1195('0xde'))[_0x1195('0x4e')](_0x884b97['texts'][_0x1195('0xdf')]);_0x2b1949[_0x1195('0x50')](_0x1195('0xe0'))['html'](_0x884b97[_0x1195('0xd9')]['linkCheckout']);_0x2b1949[_0x1195('0x50')](_0x1195('0xe1'))[_0x1195('0x4e')](_0x884b97[_0x1195('0xd9')][_0x1195('0x51')]);_0x2b1949[_0x1195('0x50')](_0x1195('0xe2'))['html'](_0x884b97[_0x1195('0xd9')][_0x1195('0xe3')]);_0x2b1949[_0x1195('0x50')](_0x1195('0xe4'))['html'](_0x884b97[_0x1195('0xd9')][_0x1195('0x54')]);return _0x2b1949;}(this[_0x1195('0xc7')]);var _0x159007=0x0;_0x13b52c[_0x1195('0x33')](function(){0x0<_0x159007?_0x55f714[_0x1195('0x5f')](this,_0x349014['clone']()):_0x55f714[_0x1195('0x5f')](this,_0x349014);_0x159007++;});window['_QuatroDigital_CartData'][_0x1195('0x40')][_0x1195('0x30')](function(){_0x147250('.qd-ddc-infoTotalValue')[_0x1195('0x4e')](window[_0x1195('0x35')][_0x1195('0x39')]||'--');_0x147250(_0x1195('0xe5'))[_0x1195('0x4e')](window[_0x1195('0x35')]['qtt']||'0');_0x147250(_0x1195('0xe6'))[_0x1195('0x4e')](window[_0x1195('0x35')][_0x1195('0x3b')]||'--');_0x147250('.qd-ddc-infoAllTotal')['html'](window['_QuatroDigital_CartData'][_0x1195('0x3c')]||'--');});var _0x59ba8d=function(_0x203c69,_0x1e6047){if('undefined'===typeof _0x203c69[_0x1195('0x3f')])return _0x72843(_0x1195('0xe7'));_0xcdaa06[_0x1195('0xe8')][_0x1195('0x5f')](this,_0x1e6047);};_0xcdaa06['getCartInfoByUrl']=function(_0xb730e5,_0xa35c2e){_0x1195('0x1')!=typeof _0xa35c2e?window['_QuatroDigital_DropDown'][_0x1195('0xe9')]=_0xa35c2e:window['_QuatroDigital_DropDown'][_0x1195('0xe9')]&&(_0xa35c2e=window['_QuatroDigital_DropDown'][_0x1195('0xe9')]);setTimeout(function(){window[_0x1195('0x56')][_0x1195('0xe9')]=void 0x0;},_0x884b97[_0x1195('0xea')]);_0x147250(_0x1195('0xeb'))[_0x1195('0x49')](_0x1195('0xec'));if(_0x884b97[_0x1195('0x55')]){var _0x1a3406=function(_0x52a6b3){window[_0x1195('0x56')]['getOrderForm']=_0x52a6b3;_0x59ba8d(_0x52a6b3,_0xa35c2e);_0x1195('0x1')!==typeof window[_0x1195('0xed')]&&_0x1195('0x8')===typeof window[_0x1195('0xed')][_0x1195('0xee')]&&window[_0x1195('0xed')][_0x1195('0xee')][_0x1195('0x5f')](this);_0x147250(_0x1195('0xeb'))[_0x1195('0x7a')](_0x1195('0xec'));};'undefined'!==typeof window['_QuatroDigital_DropDown'][_0x1195('0x27')]?(_0x1a3406(window[_0x1195('0x56')][_0x1195('0x27')]),'function'===typeof _0xb730e5&&_0xb730e5(window[_0x1195('0x56')][_0x1195('0x27')])):_0x147250[_0x1195('0x5a')]([_0x1195('0x3f'),'totalizers',_0x1195('0x5b')],{'done':function(_0x4b6b5e){_0x1a3406[_0x1195('0x5f')](this,_0x4b6b5e);_0x1195('0x8')===typeof _0xb730e5&&_0xb730e5(_0x4b6b5e);},'fail':function(_0x1dd8b8){_0x72843([_0x1195('0xef'),_0x1dd8b8]);}});}else alert('Este\x20método\x20esta\x20descontinuado!');};_0xcdaa06[_0x1195('0xd6')]=function(){var _0x362462=_0x147250(_0x1195('0xeb'));_0x362462[_0x1195('0x50')](_0x1195('0xf0'))[_0x1195('0x5')]?_0x362462[_0x1195('0x49')](_0x1195('0xf1')):_0x362462['addClass'](_0x1195('0xf1'));};_0xcdaa06[_0x1195('0xe8')]=function(_0xcdfea4){var _0x1a3406=_0x147250(_0x1195('0xf2'));_0x1a3406[_0x1195('0xf3')]();_0x1a3406[_0x1195('0x33')](function(){var _0x1a3406=_0x147250(this),_0x3c9b4e,_0x353173,_0x3c27c7=_0x147250(''),_0x9dfd4e;for(_0x9dfd4e in window[_0x1195('0x56')][_0x1195('0x27')][_0x1195('0x3f')])if(_0x1195('0x15')===typeof window[_0x1195('0x56')]['getOrderForm']['items'][_0x9dfd4e]){var _0x3210ed=window[_0x1195('0x56')][_0x1195('0x27')]['items'][_0x9dfd4e];var _0x1e50d3=_0x3210ed[_0x1195('0xf4')]['replace'](/^\/|\/$/g,'')[_0x1195('0xa2')]('/');var _0x5a45cd=_0x147250('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0x5a45cd[_0x1195('0x8b')]({'data-sku':_0x3210ed['id'],'data-sku-index':_0x9dfd4e,'data-qd-departament':_0x1e50d3[0x0],'data-qd-category':_0x1e50d3[_0x1e50d3[_0x1195('0x5')]-0x1]});_0x5a45cd[_0x1195('0x7a')](_0x1195('0xf5')+_0x3210ed[_0x1195('0xf6')]);_0x5a45cd[_0x1195('0x50')](_0x1195('0xf7'))[_0x1195('0x81')](_0x884b97[_0x1195('0xc1')](_0x3210ed));_0x5a45cd[_0x1195('0x50')](_0x1195('0xf8'))[_0x1195('0x81')](isNaN(_0x3210ed[_0x1195('0xf9')])?_0x3210ed[_0x1195('0xf9')]:0x0==_0x3210ed[_0x1195('0xf9')]?'Grátis':(_0x147250(_0x1195('0xfa'))[_0x1195('0x8b')]('content')||'R$')+'\x20'+qd_number_format(_0x3210ed[_0x1195('0xf9')]/0x64,0x2,',','.'));_0x5a45cd[_0x1195('0x50')]('.qd-ddc-quantity')[_0x1195('0x8b')]({'data-sku':_0x3210ed['id'],'data-sku-index':_0x9dfd4e})[_0x1195('0xd2')](_0x3210ed['quantity']);_0x5a45cd[_0x1195('0x50')](_0x1195('0xfb'))[_0x1195('0x8b')]({'data-sku':_0x3210ed['id'],'data-sku-index':_0x9dfd4e});_0xcdaa06[_0x1195('0xfc')](_0x3210ed['id'],_0x5a45cd['find'](_0x1195('0xfd')),_0x3210ed[_0x1195('0xfe')]);_0x5a45cd[_0x1195('0x50')](_0x1195('0xff'))[_0x1195('0x8b')]({'data-sku':_0x3210ed['id'],'data-sku-index':_0x9dfd4e});_0x5a45cd[_0x1195('0x100')](_0x1a3406);_0x3c27c7=_0x3c27c7[_0x1195('0x30')](_0x5a45cd);}try{var _0x27752f=_0x1a3406[_0x1195('0x0')](_0x1195('0xeb'))['find'](_0x1195('0x101'));_0x27752f['length']&&''==_0x27752f[_0x1195('0xd2')]()&&window[_0x1195('0x56')][_0x1195('0x27')][_0x1195('0x5b')]['address']&&_0x27752f[_0x1195('0xd2')](window[_0x1195('0x56')][_0x1195('0x27')]['shippingData'][_0x1195('0x102')][_0x1195('0x103')]);}catch(_0xa7dc5){_0x72843(_0x1195('0x104')+_0xa7dc5[_0x1195('0x105')],_0x1195('0x68'));}_0xcdaa06[_0x1195('0x106')](_0x1a3406);_0xcdaa06['cartIsEmpty']();_0xcdfea4&&_0xcdfea4['lastSku']&&function(){_0x353173=_0x3c27c7[_0x1195('0x44')](_0x1195('0x107')+_0xcdfea4[_0x1195('0x108')]+'\x27]');_0x353173[_0x1195('0x5')]&&(_0x3c9b4e=0x0,_0x3c27c7[_0x1195('0x33')](function(){var _0xcdfea4=_0x147250(this);if(_0xcdfea4['is'](_0x353173))return!0x1;_0x3c9b4e+=_0xcdfea4[_0x1195('0x109')]();}),_0xcdaa06[_0x1195('0xd0')](void 0x0,void 0x0,_0x3c9b4e,_0x1a3406[_0x1195('0x30')](_0x1a3406[_0x1195('0xa7')]())),_0x3c27c7[_0x1195('0x49')](_0x1195('0x10a')),function(_0x70c127){_0x70c127[_0x1195('0x7a')](_0x1195('0x10b'));_0x70c127[_0x1195('0x7a')](_0x1195('0x10a'));setTimeout(function(){_0x70c127[_0x1195('0x49')](_0x1195('0x10b'));},_0x884b97[_0x1195('0xea')]);}(_0x353173));}();});(function(){_QuatroDigital_DropDown[_0x1195('0x27')]['items'][_0x1195('0x5')]?(_0x147250('body')['removeClass']('qd-ddc-cart-empty')[_0x1195('0x7a')](_0x1195('0x10c')),setTimeout(function(){_0x147250(_0x1195('0x6b'))['removeClass'](_0x1195('0x10d'));},_0x884b97[_0x1195('0xea')])):_0x147250('body')['removeClass'](_0x1195('0x10e'))[_0x1195('0x7a')](_0x1195('0x10f'));}());_0x1195('0x8')===typeof _0x884b97[_0x1195('0x110')]?_0x884b97[_0x1195('0x110')]['call'](this):_0x72843(_0x1195('0x111'));};_0xcdaa06[_0x1195('0xfc')]=function(_0x5933a8,_0xe75b7c,_0xbcd9b5){function _0x45ab58(){_0xe75b7c['removeClass'](_0x1195('0x112'))[_0x1195('0x96')](function(){_0x147250(this)[_0x1195('0x7a')](_0x1195('0x112'));})[_0x1195('0x8b')](_0x1195('0x113'),_0xbcd9b5);}_0xbcd9b5?_0x45ab58():isNaN(_0x5933a8)?_0x72843('Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','alerta'):alert(_0x1195('0x114'));};_0xcdaa06['actionButtons']=function(_0x463ff0){var _0x3cf74a=function(_0x2e6521,_0x30aac9){var _0x1a3406=_0x147250(_0x2e6521);var _0x1fdb4e=_0x1a3406[_0x1195('0x8b')](_0x1195('0x115'));var _0x3c9b4e=_0x1a3406[_0x1195('0x8b')](_0x1195('0x116'));if(_0x1fdb4e){var _0x3a0918=parseInt(_0x1a3406['val']())||0x1;_0xcdaa06[_0x1195('0x117')]([_0x1fdb4e,_0x3c9b4e],_0x3a0918,_0x3a0918+0x1,function(_0x445333){_0x1a3406[_0x1195('0xd2')](_0x445333);_0x1195('0x8')===typeof _0x30aac9&&_0x30aac9();});}};var _0x1a3406=function(_0x2b3e5c,_0x481c15){var _0x1a3406=_0x147250(_0x2b3e5c);var _0x5d9bf0=_0x1a3406[_0x1195('0x8b')](_0x1195('0x115'));var _0x3c9b4e=_0x1a3406[_0x1195('0x8b')](_0x1195('0x116'));if(_0x5d9bf0){var _0xd2dcfc=parseInt(_0x1a3406[_0x1195('0xd2')]())||0x2;_0xcdaa06['changeQantity']([_0x5d9bf0,_0x3c9b4e],_0xd2dcfc,_0xd2dcfc-0x1,function(_0x1ccb1a){_0x1a3406[_0x1195('0xd2')](_0x1ccb1a);_0x1195('0x8')===typeof _0x481c15&&_0x481c15();});}};var _0x23c2f8=function(_0xdc938f,_0x5d8fef){var _0x1a3406=_0x147250(_0xdc938f);var _0x46ee60=_0x1a3406[_0x1195('0x8b')](_0x1195('0x115'));var _0x3c9b4e=_0x1a3406[_0x1195('0x8b')](_0x1195('0x116'));if(_0x46ee60){var _0x137b1e=parseInt(_0x1a3406[_0x1195('0xd2')]())||0x1;_0xcdaa06[_0x1195('0x117')]([_0x46ee60,_0x3c9b4e],0x1,_0x137b1e,function(_0x373e94){_0x1a3406['val'](_0x373e94);_0x1195('0x8')===typeof _0x5d8fef&&_0x5d8fef();});}};var _0x3c9b4e=_0x463ff0[_0x1195('0x50')](_0x1195('0x118'));_0x3c9b4e[_0x1195('0x7a')](_0x1195('0x119'))[_0x1195('0x33')](function(){var _0x463ff0=_0x147250(this);_0x463ff0[_0x1195('0x50')](_0x1195('0x11a'))['on'](_0x1195('0x11b'),function(_0x25216d){_0x25216d['preventDefault']();_0x3c9b4e[_0x1195('0x7a')](_0x1195('0x11c'));_0x3cf74a(_0x463ff0[_0x1195('0x50')]('.qd-ddc-quantity'),function(){_0x3c9b4e[_0x1195('0x49')](_0x1195('0x11c'));});});_0x463ff0[_0x1195('0x50')](_0x1195('0x11d'))['on'](_0x1195('0x11e'),function(_0x54f3a0){_0x54f3a0[_0x1195('0x77')]();_0x3c9b4e['addClass'](_0x1195('0x11c'));_0x1a3406(_0x463ff0['find']('.qd-ddc-quantity'),function(){_0x3c9b4e[_0x1195('0x49')](_0x1195('0x11c'));});});_0x463ff0[_0x1195('0x50')](_0x1195('0x11f'))['on'](_0x1195('0x120'),function(){_0x3c9b4e[_0x1195('0x7a')](_0x1195('0x11c'));_0x23c2f8(this,function(){_0x3c9b4e[_0x1195('0x49')](_0x1195('0x11c'));});});_0x463ff0['find']('.qd-ddc-quantity')['on']('keyup.qd_ddc_change',function(_0x11a4d1){0xd==_0x11a4d1[_0x1195('0xcd')]&&(_0x3c9b4e['addClass'](_0x1195('0x11c')),_0x23c2f8(this,function(){_0x3c9b4e['removeClass'](_0x1195('0x11c'));}));});});_0x463ff0[_0x1195('0x50')](_0x1195('0xf0'))[_0x1195('0x33')](function(){var _0x463ff0=_0x147250(this);_0x463ff0[_0x1195('0x50')]('.qd-ddc-remove')['on']('click.qd_ddc_remove',function(){_0x463ff0[_0x1195('0x7a')](_0x1195('0x11c'));_0xcdaa06[_0x1195('0x121')](_0x147250(this),function(_0x2c94e6){_0x2c94e6?_0x463ff0[_0x1195('0x122')](!0x0)[_0x1195('0x123')](function(){_0x463ff0[_0x1195('0x124')]();_0xcdaa06[_0x1195('0xd6')]();}):_0x463ff0[_0x1195('0x49')](_0x1195('0x11c'));});return!0x1;});});};_0xcdaa06[_0x1195('0x125')]=function(_0xa0f9e7){var _0xacaded=_0xa0f9e7[_0x1195('0xd2')](),_0xacaded=_0xacaded[_0x1195('0x6')](/[^0-9\-]/g,''),_0xacaded=_0xacaded['replace'](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x1195('0x126')),_0xacaded=_0xacaded[_0x1195('0x6')](/(.{9}).*/g,'$1');_0xa0f9e7[_0x1195('0xd2')](_0xacaded);0x9<=_0xacaded[_0x1195('0x5')]&&(_0xa0f9e7[_0x1195('0x16')](_0x1195('0x127'))!=_0xacaded&&_0x468141[_0x1195('0x128')]({'postalCode':_0xacaded,'country':_0x1195('0x129')})['done'](function(_0x5ee2e7){window[_0x1195('0x56')]['getOrderForm']=_0x5ee2e7;_0xcdaa06[_0x1195('0x90')]();})[_0x1195('0x1e')](function(_0x4a7b30){_0x72843(['Não\x20foi\x20possível\x20calcular\x20o\x20frete',_0x4a7b30]);updateCartData();}),_0xa0f9e7[_0x1195('0x16')](_0x1195('0x127'),_0xacaded));};_0xcdaa06['changeQantity']=function(_0x4a6776,_0x409f29,_0x223672,_0x3edcca){function _0x4a0aa1(_0x10dd07){_0x10dd07=_0x1195('0x12a')!==typeof _0x10dd07?!0x1:_0x10dd07;_0xcdaa06['getCartInfoByUrl']();window[_0x1195('0x56')][_0x1195('0x92')]=!0x1;_0xcdaa06['cartIsEmpty']();_0x1195('0x1')!==typeof window[_0x1195('0xed')]&&_0x1195('0x8')===typeof window[_0x1195('0xed')][_0x1195('0xee')]&&window[_0x1195('0xed')][_0x1195('0xee')]['call'](this);_0x1195('0x8')===typeof adminCart&&adminCart();_0x147250['fn'][_0x1195('0x25')](!0x0,void 0x0,_0x10dd07);_0x1195('0x8')===typeof _0x3edcca&&_0x3edcca(_0x409f29);}_0x223672=_0x223672||0x1;if(0x1>_0x223672)return _0x409f29;if(_0x884b97[_0x1195('0x55')]){if(_0x1195('0x1')===typeof window['_QuatroDigital_DropDown'][_0x1195('0x27')][_0x1195('0x3f')][_0x4a6776[0x1]])return _0x72843(_0x1195('0x12b')+_0x4a6776[0x1]+']'),_0x409f29;window[_0x1195('0x56')]['getOrderForm'][_0x1195('0x3f')][_0x4a6776[0x1]][_0x1195('0x12c')]=_0x223672;window['_QuatroDigital_DropDown'][_0x1195('0x27')][_0x1195('0x3f')][_0x4a6776[0x1]][_0x1195('0x12d')]=_0x4a6776[0x1];_0x468141[_0x1195('0x12e')]([window[_0x1195('0x56')][_0x1195('0x27')]['items'][_0x4a6776[0x1]]],['items',_0x1195('0x36'),_0x1195('0x5b')])[_0x1195('0x1d')](function(_0x5b2555){window[_0x1195('0x56')][_0x1195('0x27')]=_0x5b2555;_0x4a0aa1(!0x0);})[_0x1195('0x1e')](function(_0x3ddd01){_0x72843([_0x1195('0x12f'),_0x3ddd01]);_0x4a0aa1();});}else _0x72843(_0x1195('0x130'));};_0xcdaa06[_0x1195('0x121')]=function(_0x12bd87,_0x116704){function _0x1b7f71(_0x126b62){_0x126b62=_0x1195('0x12a')!==typeof _0x126b62?!0x1:_0x126b62;_0x1195('0x1')!==typeof window[_0x1195('0xed')]&&_0x1195('0x8')===typeof window[_0x1195('0xed')][_0x1195('0xee')]&&window['_QuatroDigital_AmountProduct']['exec'][_0x1195('0x5f')](this);_0x1195('0x8')===typeof adminCart&&adminCart();_0x147250['fn'][_0x1195('0x25')](!0x0,void 0x0,_0x126b62);_0x1195('0x8')===typeof _0x116704&&_0x116704(_0x3c9b4e);}var _0x3c9b4e=!0x1,_0x3ee4bf=_0x147250(_0x12bd87)[_0x1195('0x8b')](_0x1195('0x116'));if(_0x884b97[_0x1195('0x55')]){if(_0x1195('0x1')===typeof window[_0x1195('0x56')][_0x1195('0x27')][_0x1195('0x3f')][_0x3ee4bf])return _0x72843('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x3ee4bf+']'),_0x3c9b4e;window[_0x1195('0x56')][_0x1195('0x27')][_0x1195('0x3f')][_0x3ee4bf][_0x1195('0x12d')]=_0x3ee4bf;_0x468141[_0x1195('0x131')]([window[_0x1195('0x56')][_0x1195('0x27')][_0x1195('0x3f')][_0x3ee4bf]],[_0x1195('0x3f'),'totalizers',_0x1195('0x5b')])[_0x1195('0x1d')](function(_0x11fe2e){_0x3c9b4e=!0x0;window[_0x1195('0x56')]['getOrderForm']=_0x11fe2e;_0x59ba8d(_0x11fe2e);_0x1b7f71(!0x0);})[_0x1195('0x1e')](function(_0x1e9e0c){_0x72843([_0x1195('0x132'),_0x1e9e0c]);_0x1b7f71();});}else alert(_0x1195('0x133'));};_0xcdaa06[_0x1195('0xd0')]=function(_0x4f2ace,_0x594cf1,_0x2db361,_0x55c186){_0x55c186=_0x55c186||_0x147250(_0x1195('0x134'));_0x4f2ace=_0x4f2ace||'+';_0x594cf1=_0x594cf1||0.9*_0x55c186['height']();_0x55c186[_0x1195('0x122')](!0x0,!0x0)[_0x1195('0x135')]({'scrollTop':isNaN(_0x2db361)?_0x4f2ace+'='+_0x594cf1+'px':_0x2db361});};_0x884b97[_0x1195('0xd4')]||(_0xcdaa06[_0x1195('0x90')](),_0x147250['fn'][_0x1195('0x25')](!0x0));_0x147250(window)['on'](_0x1195('0x136'),function(){try{window[_0x1195('0x56')][_0x1195('0x27')]=void 0x0,_0xcdaa06['getCartInfoByUrl']();}catch(_0xf04ea3){_0x72843(_0x1195('0x137')+_0xf04ea3['message'],_0x1195('0x138'));}});_0x1195('0x8')===typeof _0x884b97['callback']?_0x884b97[_0x1195('0x40')][_0x1195('0x5f')](this):_0x72843('Callback\x20não\x20é\x20uma\x20função');};_0x147250['fn'][_0x1195('0xb5')]=function(_0x301777){var _0x135229=_0x147250(this);_0x135229['fn']=new _0x147250[(_0x1195('0xb5'))](this,_0x301777);return _0x135229;};}catch(_0x1a3dd2){_0x1195('0x1')!==typeof console&&_0x1195('0x8')===typeof console['error']&&console['error'](_0x1195('0x62'),_0x1a3dd2);}}(this));(function(_0x5ddb68){try{var _0x1f39d5=jQuery;window[_0x1195('0xed')]=window['_QuatroDigital_AmountProduct']||{};window[_0x1195('0xed')][_0x1195('0x3f')]={};window[_0x1195('0xed')][_0x1195('0x139')]=!0x1;window[_0x1195('0xed')][_0x1195('0x13a')]=!0x1;window[_0x1195('0xed')][_0x1195('0x13b')]=!0x1;var _0x346626=function(){if(window[_0x1195('0xed')][_0x1195('0x139')]){var _0x5d3541=!0x1;var _0x5ddb68={};window[_0x1195('0xed')][_0x1195('0x3f')]={};for(_0x2bfe06 in window[_0x1195('0x56')][_0x1195('0x27')][_0x1195('0x3f')])if(_0x1195('0x15')===typeof window[_0x1195('0x56')]['getOrderForm'][_0x1195('0x3f')][_0x2bfe06]){var _0x5ba36e=window[_0x1195('0x56')][_0x1195('0x27')][_0x1195('0x3f')][_0x2bfe06];_0x1195('0x1')!==typeof _0x5ba36e[_0x1195('0x13c')]&&null!==_0x5ba36e[_0x1195('0x13c')]&&''!==_0x5ba36e[_0x1195('0x13c')]&&(window[_0x1195('0xed')][_0x1195('0x3f')][_0x1195('0x13d')+_0x5ba36e[_0x1195('0x13c')]]=window['_QuatroDigital_AmountProduct'][_0x1195('0x3f')]['prod_'+_0x5ba36e[_0x1195('0x13c')]]||{},window['_QuatroDigital_AmountProduct']['items'][_0x1195('0x13d')+_0x5ba36e[_0x1195('0x13c')]]['prodId']=_0x5ba36e[_0x1195('0x13c')],_0x5ddb68[_0x1195('0x13d')+_0x5ba36e[_0x1195('0x13c')]]||(window[_0x1195('0xed')][_0x1195('0x3f')][_0x1195('0x13d')+_0x5ba36e[_0x1195('0x13c')]][_0x1195('0x3d')]=0x0),window['_QuatroDigital_AmountProduct'][_0x1195('0x3f')]['prod_'+_0x5ba36e[_0x1195('0x13c')]][_0x1195('0x3d')]+=_0x5ba36e[_0x1195('0x12c')],_0x5d3541=!0x0,_0x5ddb68[_0x1195('0x13d')+_0x5ba36e[_0x1195('0x13c')]]=!0x0);}var _0x2bfe06=_0x5d3541;}else _0x2bfe06=void 0x0;window[_0x1195('0xed')][_0x1195('0x139')]&&(_0x1f39d5(_0x1195('0x13e'))[_0x1195('0x124')](),_0x1f39d5('.qd-bap-item-added')[_0x1195('0x49')](_0x1195('0x13f')));for(var _0x129ba5 in window['_QuatroDigital_AmountProduct']['items']){_0x5ba36e=window[_0x1195('0xed')][_0x1195('0x3f')][_0x129ba5];if(_0x1195('0x15')!==typeof _0x5ba36e)return;_0x5ddb68=_0x1f39d5('input.qd-productId[value='+_0x5ba36e[_0x1195('0x140')]+']')['getParent']('li');if(window['_QuatroDigital_AmountProduct'][_0x1195('0x139')]||!_0x5ddb68[_0x1195('0x50')](_0x1195('0x13e'))[_0x1195('0x5')])_0x5d3541=_0x1f39d5(_0x1195('0x141')),_0x5d3541['find']('.qd-bap-qtt')[_0x1195('0x4e')](_0x5ba36e[_0x1195('0x3d')]),_0x5ba36e=_0x5ddb68[_0x1195('0x50')](_0x1195('0x142')),_0x5ba36e[_0x1195('0x5')]?_0x5ba36e[_0x1195('0xac')](_0x5d3541)[_0x1195('0x7a')](_0x1195('0x13f')):_0x5ddb68['prepend'](_0x5d3541);}_0x2bfe06&&(window['_QuatroDigital_AmountProduct'][_0x1195('0x139')]=!0x1);};window[_0x1195('0xed')]['exec']=function(){window['_QuatroDigital_AmountProduct']['allowRecalculate']=!0x0;_0x346626[_0x1195('0x5f')](this);};_0x1f39d5(document)[_0x1195('0x143')](function(){_0x346626[_0x1195('0x5f')](this);});}catch(_0x24a735){_0x1195('0x1')!==typeof console&&'function'===typeof console[_0x1195('0x12')]&&console['error'](_0x1195('0x62'),_0x24a735);}}(this));(function(){try{var _0x4e0013=jQuery,_0x3acc01,_0x356e96={'selector':_0x1195('0x144'),'dropDown':{},'buyButton':{}};_0x4e0013['QD_smartCart']=function(_0x57df50){var _0xa0f83d={};_0x3acc01=_0x4e0013['extend'](!0x0,{},_0x356e96,_0x57df50);_0x57df50=_0x4e0013(_0x3acc01[_0x1195('0x86')])[_0x1195('0xb5')](_0x3acc01[_0x1195('0x145')]);_0xa0f83d[_0x1195('0x79')]='undefined'!==typeof _0x3acc01[_0x1195('0x145')]['updateOnlyHover']&&!0x1===_0x3acc01[_0x1195('0x145')][_0x1195('0xd4')]?_0x4e0013(_0x3acc01[_0x1195('0x86')])['QD_buyButton'](_0x57df50['fn'],_0x3acc01['buyButton']):_0x4e0013(_0x3acc01[_0x1195('0x86')])[_0x1195('0x71')](_0x3acc01[_0x1195('0x79')]);_0xa0f83d[_0x1195('0x145')]=_0x57df50;return _0xa0f83d;};_0x4e0013['fn'][_0x1195('0x146')]=function(){_0x1195('0x15')===typeof console&&_0x1195('0x8')===typeof console[_0x1195('0x2d')]&&console['info'](_0x1195('0x147'));};_0x4e0013[_0x1195('0x146')]=_0x4e0013['fn']['smartCart'];}catch(_0x58198a){_0x1195('0x1')!==typeof console&&_0x1195('0x8')===typeof console[_0x1195('0x12')]&&console[_0x1195('0x12')](_0x1195('0x62'),_0x58198a);}}());
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
