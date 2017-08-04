/**
* Funções base
*/
String.prototype.trim || (String.prototype.trim = function () { return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "") });
"function" != typeof String.prototype.capitalize && (String.prototype.capitalize = function () { return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase() });
"function" !== typeof String.prototype.replaceSpecialChars && (String.prototype.replaceSpecialChars = function () { var b = { "\u00e7": "c", "\u00e6": "ae", "\u0153": "oe", "\u00e1": "a", "\u00e9": "e", "\u00ed": "i", "\u00f3": "o", "\u00fa": "u", "\u00e0": "a", "\u00e8": "e", "\u00ec": "i", "\u00f2": "o", "\u00f9": "u", "\u00e4": "a", "\u00eb": "e", "\u00ef": "i", "\u00f6": "o", "\u00fc": "u", "\u00ff": "y", "\u00e2": "a", "\u00ea": "e", "\u00ee": "i", "\u00f4": "o", "\u00fb": "u", "\u00e5": "a", "\u00e3": "a", "\u00f8": "o", "\u00f5": "o", u: "u", "\u00c1": "A", "\u00c9": "E", "\u00cd": "I", "\u00d3": "O", "\u00da": "U", "\u00ca": "E", "\u00d4": "O", "\u00dc": "U", "\u00c3": "A", "\u00d5": "O", "\u00c0": "A", "\u00c7": "C" }; return this.replace(/[\u00e0-\u00fa]/ig, function (a) { return "undefined" != typeof b[a] ? b[a] : a }) });
Array.prototype.indexOf || (Array.prototype.indexOf = function (d, e) { var a; if (null == this) throw new TypeError('"this" is null or not defined'); var c = Object(this), b = c.length >>> 0; if (0 === b) return -1; a = +e || 0; Infinity === Math.abs(a) && (a = 0); if (a >= b) return -1; for (a = Math.max(0 <= a ? a : b - Math.abs(a), 0); a < b;) { if (a in c && c[a] === d) return a; a++ } return -1 });

try {
	var Common = {
		run: function () { },
		init: function () {
			Common.qdOverlay();
			Common.applyAmazingMenu();
			Common.applyAmazingMenuMobile();
			Common.dropDownOverlay();
			Common.applySmartCart();
			Common.applyCarouselShelf();
			Common.openSearchModal();
			Common.setDataScrollToggle();
			Common.saveAmountFix();
			Common.vtexBindQuickViewDestroy();
			Common.showFooterLinks();
			Common.applyTipBarCarousel();
			Common.callcenterBodyClass();
		},
		ajaxStop: function () {
			Common.appendSkuPopUpCloseBtn();
			Common.saveAmountFix();
		},
		windowOnload: function () {
			Common.facebookLikebox();
		},
		callcenterBodyClass: function() {
			vtexjs.checkout.getOrderForm().done(function() {
				if(vtexjs.checkout.orderForm && vtexjs.checkout.orderForm.userType && vtexjs.checkout.orderForm.userType == 'callCenterOperator')
					$(document.body).addClass('qd-callcenter-operator');
			});
		},
		vtexBindQuickViewDestroy: function () {
			window.bindQuickView = function () { };
		},
		qdOverlayClass: 'qd-am-on qd-cart-show qd-sn-on',
		qdOverlay: function () {
			$('.components-qd-v1-overlay').click(function () {
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		},
		appendSkuPopUpCloseBtn: function () {
			var wrapper = $('.boxPopUp2 .selectSkuTitle:not(.qd-on)');
			wrapper.addClass('qd-on').append($('<span class="modal-qd-v1-box-popup-close">Fechar</span>').click(function () {
				$(window).trigger('vtex.modal.hide');
				wrapper.removeClass('.qd-on');
				return false;
			}));
		},
		facebookLikebox: function () {
			$(".footer-qd-v1-facebook-likebox").html('<div class="fb-page" data-href="https://www.facebook.com/vitrinedoartesanato/" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/vitrinedoartesanato/">Vitrine do Artesanato</a></blockquote></div></div>');
		},
		applyAmazingMenu: function () {
			$('.header-qd-v1-amazing-menu, .footer-qd-v1-menu-list').QD_amazingMenu();

			$('.header-qd-v1-floating-amazing-menu').click(function (e) {
				$('.header-qd-v1-amazing-menu-wrapper').toggleClass('qd-is-active');
				e.preventDefault();
			});
		},
		applyAmazingMenuMobile: function () {
			var wrapper = $('.header-qd-v1-amazing-menu-mobile');

			wrapper.find('> ul > li > ul').prepend(function () { return $(this).prev().clone().wrap('<li></li>').parent() });

			wrapper.QD_amazingMenu({
				callback: function () {
					$('<span class="qd-am-dropdown-trigger"><i class="fa fa-angle-right"></i></span>').appendTo(wrapper.find('.qd-am-has-ul')).click(function () {
						var $t = $(this);
						$.merge($t.parent(), $t.closest('ul')).toggleClass('qd-am-is-active');

						$t.filter(function () { return !$(this).closest('ul').is('.qd-amazing-menu'); }).siblings('ul').stop(true, true).slideToggle();
					});

					wrapper.find('> ul > li > .qd-am-dropdown-trigger').click(function () {
						$('.header-qd-v1-amazing-menu-mobile-wrapper').addClass('qd-am-is-active');
						$('.header-qd-v1-amazing-menu-mobile-wrapper').animate({
							scrollTop: 0
						}, 200);
					});

					wrapper.find('> ul > li > ul > li:first-child').click(function (e) {
						e.preventDefault();
						$(this).parents(".qd-am-is-active").removeClass('qd-am-is-active');
					});
				}
			});

			$('.header-qd-v1-amazing-menu-trigger').click(function (evt) {
				evt.preventDefault();
				$(document.body).toggleClass('qd-am-on');
			});

			$('.header-qd-v1-amazing-menu-mobile-wrapper .header-qd-v1-user-message').on('click', 'a#login', function () {
				$(document.body).removeClass('qd-am-on');
			});
		},
		applySmartCart: function () {
			$('.header-qd-v1-cart').append('<div class="smart-cart-qd-v1-wrapper"><div class="qd-sc-wrapper"></div></div>');

			$(document.body).append('<div class="smart-cart-qd-v2-wrapper"><div class="qd-sc-wrapper"></div></div>');

			var wrapper = $(".qd-sc-wrapper");

			$.QD_smartCart({
				selector: wrapper,
				dropDown: {
					texts: {
						linkCart: "Finalizar Compra",
						cartTotal: '<span class="qd-infoTotalItems">Itens: #items</span><span class="qd-infoTotalValue">Total: #value</span>'
					},
					updateOnlyHover: false,
					smartCheckout: true,
					callback: function () {
						$(".qd-ddc-wrapper3").prepend('<div class="qd-cartTitle"><h3>Meu carrinho</h3></div>');
						wrapper.find('.qd_ddc_continueShopping').after(wrapper.find('.qd-ddc-viewCart'));
					},
					skuName: function (data) {
						return data.name + ' - ' + data.skuName.replace(data.name, '');
					},
					callbackProductsList: function () {
						wrapper.find(".qd-ddc-prodQtt").each(function () {
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
			window._QuatroDigital_prodBuyCallback = function (jqXHR, textStatus, prodLink, skus) {
				$.fn.simpleCart(true);
				$(".shelf-qd-v1-buy-button-modal").modal("hide");
				$(window).trigger("QuatroDigital.qd_bb_prod_add", [new $, skus[0] || 0]);
			};

			$('.header-qd-v1-cart-link').click(function (evt) {
				evt.preventDefault();
				$(document.body).toggleClass('qd-cart-show');

				wrapper.height($(window).height());
				wrapper.find(".qd-ddc-prodWrapper").css('max-height', $(window).height() - 193);
			});

			$('.qd_ddc_lightBoxClose').click(function (evt) {
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		},
		openSearchModal: function () {
			$('.header-qd-v1-action-search').click(function () {
				$('.modal-qd-v1-search').modal();
				return false;
			});
		},
		saveAmountFix: function () {
			$('.shelf-qd-v1-highlight-discount-percentage:not(.qd-on)').addClass('qd-on').each(function () {
				var $t = $(this);
				$t.text(($t.text().trim().match(/[0-9]+/) || [""]).pop() + '%');
			});
		},
		setDataScrollToggle: function () {
			$(document.body).attr('data-qd-scroll-limit', '100');
		},
		showFooterLinks: function () {
			$('.footer-qd-v1-links-wrapper > ul > li').click(function (e) {
				var $t = $(this);
				$t.toggleClass('qd-is-active');
				$t.find('> ul').toggleClass('qd-is-active');
			});
		},
		applyCarouselShelf: function () {
			var wrapper = $('.carousel-qd-v1-shelf .prateleira').not('.slick-initialized');

			if (!wrapper.length)
				return false;

			wrapper.has('h2').each(function () {
				var $t = $(this);
				$t.find('h2').insertBefore($t);
			});

			wrapper.addClass('qd-slick-loading').slick({
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
			}).removeClass('qd-slick-loading');
		},
		applyTipBarCarousel: function () {
			var wrapper = $('.tip-bar-qd-v1-carousel');

			if (!wrapper.length)
				return;

			var options = {
				arrows: false,
				autoplay: true,
				slidesToShow: 4,
				slidesToScroll: 4,
				infinite: true,
				draggable: false,
				responsive: [
					{
						breakpoint: 1366,
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

			wrapper.slick($.extend(true, options, (function () {
				// Se estiver dentro do product-qd-v1-sku-selection-box, ele mostrará só 2 slides por vez, mantendo as outras propriedades da variável options
				if (wrapper.closest('.product-qd-v1-sku-selection-box').length)
					return { slidesToShow: 2 };
				return {};
			})()));
		},
		dropDownOverlay: function () {
			$('.qd-am-dropdown').hover(
				function () {
					$('.dropdown-overlay').first().addClass("ol-on");
				},
				function () {
					$('.dropdown-overlay').first().removeClass("ol-on");
				}
			);
		}
	};

	var Home = {
		init: function () {
			Home.openModalVideoInstitutional();
			Home.sliderFull();
			Home.applyBrandCarousel();
			Home.applyMosaicCategorieBanners();
			Home.applySpecialShelfCarousel();
			Home.tabShelfCarousel();
			Home.applyMosaicHighlightBanners();
		},
		ajaxStop: function () { },
		windowOnload: function () { },
		openModalVideoInstitutional: function () {
			var modal = $('.modal-qd-v1-home-video');
			var video = $('.modal-qd-v1-home-video-wrapper').html();

			$('.banner-qd-v1-video, .institucional-qd-v1-modal-video-link').click(function (e) {
				modal.modal('show');
				return false;
			});

			$('body').on('hidden.bs.modal', '.modal', function () {
				modal.remove();
				$('.modal-qd-v1-home-video-wrapper').append(video);
			});
		},
		sliderFull: function () {
			var wrapper = $('.slider-qd-v1-full');

			wrapper.slick({
				autoplay: true,
				dots: true,
				fade: true,
				arrows: false,
				cssEase: 'linear',
				infinite: true,
				speed: 500,
				draggable: false
			});

			wrapper.each(function () {
				$(this).find('.slick-arrow').wrapAll('<div class="slick-nav" />');
			});
		},
		applyBrandCarousel: function () {
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
		applyMosaicCategorieBanners: function () {
			$('.mosaic-categories-qd-v1-wrapper > .box-banner').QD_mosaicBanners({
				bannerColSecurityMargin: -30,
				containerWidth: 1336,
				classFourColumn: "col-xs-12 col-sm-6 col-md-3"
			});
		},
		applySpecialShelfCarousel: function () {
			var wrapper = $('.home-qd-v1-special-carousel-banner');

			if (!wrapper.length)
				return false;


			var hasBanner = wrapper.find('.box-banner').length;
			if (!hasBanner)
				wrapper.find('[class*="col-md-"]').removeClass().addClass('col-xs-12');

			wrapper.find('.slick-initialized').slick('unslick');
			var shelves = wrapper.find('.prateleira');
			shelves.each(function () {
				var $t = $(this);
				$t.find('h2').prependTo(wrapper);
			});

			var slideQtd = hasBanner ? 2 : 4;

			shelves.slick({
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
		tabShelfCarousel: function () {
			var wrapper = $('.tabs-qd-v1-carousel-wrapper');
			var shelves = wrapper.find('.prateleira');

			wrapper.find('h2').each(function () {
				var $t = $(this);
				var text = $t.text().toLowerCase().replace(/ /g, '-');
				$t.wrap('<a class="qd-tab-item" href="#' + text + '" />');
				$t.parent().nextAll('.prateleira').first().attr('id', text).addClass('tab-pane');
			}).parent().appendTo(wrapper.find('.tabs-qd-v1-links')).click(function (e) {
				e.preventDefault();
				var $t = $(this).addClass('active');
				$t.siblings('a').removeClass('active');
				shelves.filter('.slick-initialized').slick('unslick');
				$t.tab('show');
				Common.applyCarouselShelf();
			}).first().click();

			wrapper.find('.carousel-qd-v1-shelf').addClass('tab-content');
		},
		applyMosaicHighlightBanners: function () {
			$('.home-highlight-banner-qd-v1-wrapper .mosaic-qd-v1-banners .box-banner').QD_mosaicBanners({
				containerWidth: 690
			});
		}
	};

	var Search = {
		init: function () {
			Search.openFiltersMenu();
			Search.shelfLineFix();
			Search.showSearchNavigatorFilters();
		},
		ajaxStop: function () {
			Search.shelfLineFix();
		},
		windowOnload: function () {
			Search.shelfLineFix();
		},
		openFiltersMenu: function () {
			$('.search-qd-v1-navigator-trigger').click(function (e) {
				e.preventDefault();
				$(document.body).toggleClass('qd-sn-on');
			});
		},
		showSearchNavigatorFilters: function () {
			$('.search-qd-v1-navigator h3, .search-qd-v1-navigator h4, .search-qd-v1-navigator h5').each(function () {
				var $t = $(this);

				if (!$t.next('div, ul').children().length)
					return;

				$('<span class="arrow"><i class="fa fa-caret-down"></i></span>').click(function (e) {
					e.preventDefault();
					$t.toggleClass('qd-is-visible').next('div, ul').stop(true, true).slideToggle();
				}).appendTo($t);
			});
		},
		shelfLineFix: function () {
			try {
				var exec = function () {
					var curTop;
					var wrapper = $("div[id*='ResultItems_'] >.prateleira:not('.qd-fi-on')").addClass('qd-fi-on');

					var shelf = wrapper.children("ul").removeClass('qd-first-line');
					shelf.first().addClass("qd-first-line");

					var setFirst = function () {
						shelf.each(function () {
							var $t = $(this);

							if ($t.is(".qd-first-line")) {
								curTop = $t.offset().top;
								shelf = shelf.not($t);
								return;
							}

							var offsetTop = $t.offset().top;
							if (offsetTop >= curTop - 10 && offsetTop <= curTop + 10)
								shelf = shelf.not($t);
							else {
								$t.addClass("qd-first-line");
								return false;
							}
						});

						if (shelf.length)
							setFirst();
					};
					setFirst();
				};
				exec();

				// Olhando para o Smart Research
				if (!window.qd_shelf_line_fix_) {
					$(window).on("QuatroDigital.sr_shelfCallback", exec);
					window.qd_shelf_line_fix_ = true;
				}
				// Olhando tbm para o Infinity Scroll
				if(!window.qd_shelf_line_fix_is){
					$(window).on("QuatroDigital.is_Callback", exec);
					window.qd_shelf_line_fix_is = true;
				}

				// Olhando para o evento window resize
				var resize = $._data(window).events.resize;
				var allowResize = true;
				if (resize)
					for (var i = 0; i < resize.length; i++) {
						if (resize[i].namespace == "qd") {
							allowResize = false;
							break;
						}
					}
				if (allowResize) {
					var timeOut = 0;
					$(window).on("resize.qd", function () {
						clearTimeout(timeOut);
						timeOut = setTimeout(function () {
							$(".qd-first-line").removeClass(".qd-first-line");
							exec();
						}, 20);
					});
				}
			}
			catch (e) { (typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: " + e.message)); }
		}
	};

	var Product = {
		run: function () { },
		init: function () {
			// Product.forceImageZoom();
			// Product.qdForceRadioSkuSelector();
			Product.setAvailableBodyClass();
			Product.accessoriesFix();
			Product.accessoriesApplyCarousel();
			Product.openShipping();
			Product.doublePrice();
			Product.showFloatingBuyBar();
			Product.scrollToDescription();
			Product.seeInstalments();
			Product.applyCarouselCategories();
			Product.applyCarouselShelfV2();
			Product.applyCarouselThumb(); $(window).on('skuSelected.vtex', Product.applyCarouselThumb);
		},
		ajaxStop: function () { },
		windowOnload: function () {
			Product.tooltipActivate();
		},
		setAvailableBodyClass: function () {
			function checkVisibleNotify(available) {
				if (available)
					$(document.body).addClass('qd-product-available').removeClass('qd-product-unavailable');
				else
					$(document.body).addClass('qd-product-unavailable').removeClass('qd-product-available');
			}

			$(document).on("skuSelected.vtex", function (e, id, sku) {
				checkVisibleNotify(sku.available);
			});

			checkVisibleNotify(skuJson.available);
		},
		tooltipActivate: function () {
			$('[data-toggle="tooltip"]').tooltip();
		},
		qdForceRadioSkuSelector: function () {
			try {
				if (skuJson.dimensions.length)
					return;

				window.skuJson_0.displayMode = 'especificacao';

				var variations = [];
				for (var l = 0; l < skuJson_0.skus.length; l++) {
					window.skuJson_0.skus[l].dimensions = { 'Variação': window.skuJson_0.skus[l].skuname };
					variations.push(window.skuJson_0.skus[l].skuname);
				}
				window.skuJson_0.dimensions = ['Variação'];
				window.skuJson_0.dimensionsMap = { 'Variação': variations };

				var skuWrapper = $('.product-qd-v1-sku-selection').prepend('<div class="sku-selector-container-0"></div>');
				$('.sku-selector-container-0').skuSelector(skuJson_0, { forceInputType: 'radio', selectSingleDimensionsOnOpening: 'true' });

				var buyButtonWrapper = $('.product-qd-v1-buy-button');
				$('<a href="" class="buy-button buy-button-ref">Comprar</a>').prependTo(buyButtonWrapper).buyButton(skuJson.productId, { salesChannel: jssalesChannel }, {});
				$('<div class="product-qd-v1-notify-me"></div>').appendTo(buyButtonWrapper).notifyMe(skuJson.productId, ((window.notifyMeOptions || {}).sku = null));

				skuWrapper.find('.sku-selector +label').each(function (index, el) {
					$(this).wrapInner('<span class="product-qd-v1-sku-text"></span>').prepend('<span class="product-qd-v1-sku-img"><img src="' + skuJson.skus[index].image.replace(/(ids\/[0-9]+)\-[0-9]+\-[0-9]+/, '$1-50-50') + '" /></span>');
				});

				$('<div class="plugin-preco"></div>').appendTo('.product-qd-v1-price').price(skuJson.productId);

				skuWrapper.find('.sku-selector:not(.item_unavailable):first()').click();

				window.skuJson = window.skuJson_0;
			}
			catch (e) { (typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: ", e)); }
		},
		scrollToDescription: function () {
			$('.product-qd-v1-link-description').click(function (e) {
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $('.product-qd-v1-description').offset().top - 100
				}, 900, 'swing');
			});
		},
		doublePrice: function () {
			var row = $('.product-qd-v1-box-quantity').clone().addClass('product-qd-v1-double-size qd-show');
			row.find('script').remove();
			row.insertBefore($('.product-floating-bar-smart-qtt'));

			Product.applySmartQuantity();
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
		applyCarouselCategories: function () {
			var wrapper = $('.carousel-qd-v1-categories').not('.slick-initialized');

			if (!wrapper.length)
				return false;

			wrapper.has('h2').each(function () {
				var $t = $(this);
				$t.find('h2').insertBefore($t);
			});

			wrapper.addClass('qd-slick-loading').slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: 6,
				slidesToScroll: 6,
				infinite: true,
				draggable: false,
				speed: 700,
				responsive: [
					{
						breakpoint: 1520,
						settings: {
							slidesToShow: 4,
							slidesToScroll: 4
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
							centerMode: true,
							centerPadding: '50px'
						}
					}
				]
			}).removeClass('qd-slick-loading');
		},
		applyCarouselShelfV2: function () {
			var wrapper = $('.carousel-qd-v2-shelf .prateleira').not('.slick-initialized');

			if (!wrapper.length)
				return false;

			wrapper.has('h2').each(function () {
				var $t = $(this);
				$t.find('h2').insertBefore($t);
			});

			wrapper.addClass('qd-slick-loading').slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: 6,
				slidesToScroll: 6,
				infinite: true,
				draggable: false,
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
							slidesToShow: 1,
							centerMode: true,
							centerPadding: '50px'
						}
					}
				]
			}).removeClass('qd-slick-loading');
		},
		applySmartQuantity: function () {
			$('.product-qd-v1-sku-selection-box, .product-floating-bar-buy').QD_smartQuantity();

			$(window).on("skuSelected.vtex", function (e, id, data) {
				$('.qd-sq-more, .qd-sq-minus').click();
			});
		},
		forceImageZoom: function () {
			try {
				var orig = window.ImageControl;
				window.ImageControl = function () {
					$("ul.thumbs a").each(function () {
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
			catch (e) { (typeof console !== "undefined" && typeof console.error === "function" && console.error("Ops, algo saiu errado como zoom :( . Detalhes: " + e.message)); }
		},
		seeInstalments: function () {
			$('.product-qd-v1-see-installments').click(function (e) {
				e.preventDefault();
				$(this).toggleClass('qd-is-active');
				$('.product-qd-v1-installments-method').toggleClass('qd-is-visible');
			});
		},
		applyCarouselThumb: function () {
			var sliderWrapper = $('.product-qd-v1-image-carrousel'); // Wrapper que será inserido o carousel
			var thumbsWrapper = $('.thumbs').first(); // Wrapper onde foi inserido as thumbs
			var thumbsSliderWrapper = $('.product-qd-v1-image-thumbs'); // Wrapper onde foi inserido as thumbs

			sliderWrapper.filter('.slick-initialized').slick('unslick');
			thumbsSliderWrapper.filter('.slick-initialized').slick('unslick');

			var thumbsLi;
			(function cloneThumb() {
				thumbsLi = thumbsWrapper.find('li');
				if (thumbsLi.length < 4) {
					thumbsLi.clone().appendTo(thumbsWrapper);
					cloneThumb();
				}
			})();

			thumbsSliderWrapper.html(thumbsWrapper.html());

			thumbsSliderWrapper.find('img').each(function () {
				$t = $(this);
				$t.attr('src', $t.attr('src').replace('-55-55', '-150-150'));
			});

			sliderWrapper.empty();
			thumbsWrapper.find('a').each(function (index) {
				$t = $(this);
				$('<div class="qd-slide qd-product-image-' + index + '"><a href="' + $t.attr('rel').replace('-292-292', '-640-640') + '"><img src="' + $t.attr('rel').replace('-292-292', '-640-640') + '"/></a></div>').appendTo(sliderWrapper);
			});

			var options = {
				slidesToShow: 1,
				slidesToScroll: 1,
				focusOnSelect: true
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

			var slidesNumber;

			if (thumbsLi.length > 5) {
				slidesNumber = 5;
			}
			else {
				slidesNumber = thumbsLi.length - 1;
			}

			thumbsSliderWrapper.addClass('slick-slide').slick($.extend({}, options, {
				arrows: false,
				asNavFor: '.product-qd-v1-image-carrousel',
				slidesToShow: slidesNumber,
				centerMode: true,
				centerPadding: 0,
				responsive: [
					{
						breakpoint: 991,
						settings: {
							slidesToShow: 3,
							centerPadding: '40px'
						}
					}
				]
			}));
			thumbsSliderWrapper.on('afterChange', function (event, slick, slide) {
				thumbsSliderWrapper.find('.ON').removeClass('ON');
				thumbsSliderWrapper.find('.slick-active.slick-center a').addClass('ON');
			}).slick('getSlick').slickGoTo(0);

			sliderWrapper.find('a').click(function (e) { e.preventDefault() });
		},
		openShipping: function () {
			if (typeof window.ShippingValue === "function")
				window.ShippingValue();
		}
	};

	var List = {
		run: function () { },
		init: function () { },
		ajaxStop: function () { },
		windowOnload: function () { }
	};

	var Institutional = {
		init: function () {
			Institutional.sidemenuToggle();
		},
		ajaxStop: function () { },
		windowOnload: function () { },
		sidemenuToggle: function () {
			// Amazing Menu Responsivo
			$('.institucional-qd-v1-menu-toggle').click(function (evt) {
				evt.preventDefault();
				$(document.body).addClass('qd-sn-on');
			});
			$('.institucional-qd-v1-side-menu-wrap-close').click(function () {
				$(document.body).removeClass('qd-sn-on');
			});
		}
	};

	var Orders = {
		init: function () {
			Orders.bootstrapCssFix();
		},
		ajaxStop: function () { },
		windowOnload: function () { },
		bootstrapCssFix: function () {
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
catch (e) { (typeof console !== "undefined" && typeof console.error === "function" && console.error("Houve um erro nos objetos. Detalhes: " + e.message)); }

try {
	(function () {
		var body, ajaxStop, windowLoad;

		windowLoad = function () {
			Common.windowOnload();
			if (body.is(".home")) Home.windowOnload();
			else if (body.is(".resultado-busca, .departamento, .categoria")) Search.windowOnload();
			else if (body.is(".produto")) Product.windowOnload();
			else if (body.is(".listas")) List.windowOnload();
			else if (body.is(".institucional")) Institutional.windowOnload();
			else if (body.is(".orders")) Orders.windowOnload();
		};

		ajaxStop = function () {
			Common.ajaxStop();
			if (body.is(".home")) Home.ajaxStop();
			else if (body.is(".resultado-busca, .departamento, .categoria")) Search.ajaxStop();
			else if (body.is(".produto")) Product.ajaxStop();
			else if (body.is(".listas")) List.ajaxStop();
			else if (body.is(".institucional")) Institutional.ajaxStop();
			else if (body.is(".orders")) Orders.ajaxStop();
		};

		$(function () {
			body = $(document.body);

			Common.init();
			if (body.is(".home")) Home.init();
			else if (body.is(".resultado-busca, .departamento, .categoria")) {
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
catch (e) { (typeof console !== "undefined" && typeof console.error === "function" && $("body").addClass('jsFullLoaded jsFullLoadedError') && console.error("Houve um erro ao iniciar os objetos. Detalhes: " + e.message)); }


/* Quatro Digital Newsletter // 5.1 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os Direitos Reservados */
(function(){var d=jQuery;if("function"!==typeof d.fn.QD_news){var t={defaultName:"Digite seu nome...",defaultEmail:"Digite seu e-mail...",nameField:".qd_news_name",checkNameFieldIsVisible:!0,emailField:".qd_news_email",btn:".qd_news_button",elementError:".nv2_messageError",elementSuccess:".nv2_messageSuccess",validationMethod:"popup",getAttr:"alt",setDefaultName:!0,checkNameExist:!0,validateName:!0,showInPopup:!0,animation:"blink",animateSpeed:100,animateDistance:15,animateRepeat:3,animateFieldSuccess:".qd_news_animate_field_success",
timeHideSuccessMsg:3E3,platform:"VTEX",allowSubmit:function(){return!0},successCallback:function(){},submitCallback:function(d,k){}};d.fn.QD_news=function(r){var k=function(a,f){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var b;"object"===typeof a?(a.unshift("[QD News]\n"),b=a):b=["[QD News]\n"+a];if("undefined"===typeof f||"alerta"!==f.toLowerCase()&&"aviso"!==f.toLowerCase())if("undefined"!==typeof f&&"info"===
f.toLowerCase())try{console.info.apply(console,b)}catch(e){console.info(b.join("\n"))}else try{console.error.apply(console,b)}catch(e){console.error(b.join("\n"))}else try{console.warn.apply(console,b)}catch(e){console.warn(b.join("\n"))}}},g=d(this);if(!g.length)return g;var a=d.extend({},t,r);a.showInPopup||(a.validationMethod="div");null!==a.animation?a.validationMethod="animateField":"animateField"==a.validationMethod&&(a.animation="leftRight");if("popup"==a.validationMethod&&"function"!==typeof d.fn.vtexPopUp2)return k("O popUp2 n\u00e3o foi encontrado. Adicione o Plugin de PopUp2."),
g;var q=function(d){var f=0;var b=function(){d.animate({left:"-="+a.animateDistance},a.animateSpeed,function(){d.animate({left:"+="+a.animateDistance},a.animateSpeed,function(){f<a.animateRepeat&&b();f++})})};var e=function(){d.fadeTo(a.animateSpeed,.2,function(){d.fadeTo(a.animateSpeed,1,function(){f<a.animateRepeat&&e();f++})})};d.stop(!0,!0);"leftRight"==a.animation?b():"blink"==a.animation&&e()};g.each(function(){var n,f,b=d(this),e=b.find(a.nameField),c=b.find(a.emailField),l=b.find(a.btn);"animateField"!=
a.validationMethod&&(n=b.find(a.elementError),f=b.find(a.elementSuccess));1>e.length&&a.checkNameExist&&k("Campo de nome, n\u00e3o encontrado ("+e.selector+"). Ser\u00e1 atribuido um valor padr\u00e3o.","info");if(1>c.length)return k("Campo de e-mail, n\u00e3o encontrado ("+c.selector+")"),b;if(1>l.length)return k("Bot\u00e3o de envio, n\u00e3o encontrado ("+l.selector+")"),b;if("animateField"!=a.validationMethod&&(1>f.length||1>n.length))return k("A(s) mensagem(ns) de erro e/ou sucesso esta(m) faltando \n ("+
f.selector+", "+n.selector+")"),b;a.setDefaultName&&e.is("input[type=text], textarea")&&e.val(a.defaultName);c.val(a.defaultEmail);(function(){if(a.checkNameExist){if(a.checkNameFieldIsVisible){var b=e.filter(":visible");if(!b.length)return}else b=e;var d=b.val();b.is("input:text, textarea")&&b.bind({focus:function(){b.val()!=d||0!==b.val().search(a.defaultName.substr(0,6))&&!a.setDefaultName||b.val("")},blur:function(){""===b.val()&&b.val(d)}})}})();(function(){var b=c.val();c.bind({focus:function(){c.val()==
b&&0===c.val().search(a.defaultEmail.substr(0,6))&&c.val("")},blur:function(){""===c.val()&&c.val(b)}})})();var g=function(){var h;var e=(h=b.find(a.nameField).filter("input[type=text],select,textarea").val())?h:b.find(a.nameField).filter("input[type=radio], input[type=checkbox]").length?b.find(a.nameField).filter("input[type=radio]:checked, input[type=checkbox]:checked").val()||"":(h=b.find(a.nameField).attr(a.getAttr))?h:(h=b.find(a.nameField).text())?h:(h=b.find(a.nameField).find(".box-banner img:first").attr("alt"))?
h:"Nome_Padrao";h=(b.find(a.emailField).val()||"").trim();var c=b.find(a.nameField).is(":visible");c=a.validateName?(1>e.length||0===e.search(a.defaultName.substr(0,6)))&&(a.checkNameExist||c?c:!0):!1;var g=0>h.search(/^[a-z0-9\_\-\.\+]+@[a-z0-9\_\-]+(\.[a-z0-9\_\-]{2,})+$/i);if(c||g)"animateField"==a.validationMethod?(c&&q(b.find(a.nameField)),g&&q(b.find(a.emailField))):"popup"==a.validationMethod?n.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterError"}):(n.slideDown().bind("click",
function(){d(this).slideUp()}),setTimeout(function(){n.slideUp()},1800));else if(a.allowSubmit()){l.attr("disabled","disabled");var m={postData:{newsletterClientEmail:h,newsletterClientName:a.defaultName==e?"-":e,newsInternalCampaign:"newsletter:opt-in",newsInternalPage:(document.location.pathname||"/").replace(/\//g,"_"),newsInternalPart:"newsletter"},button:l,wrapper:b};"linx"===a.platform&&(m.postData.nome=m.postData.newsletterClientName,m.postData.email=m.postData.newsletterClientEmail);d.ajax({url:"linx"===
a.platform?"/newsletter.aspx":"/no-cache/Newsletter.aspx",type:"linx"===a.platform?"GET":"POST",data:m.postData,success:function(e){var h;l.removeAttr("disabled");if("linx"===a.platform&&!(-1<e.indexOf(" com sucesso.")||-1<e.indexOf(" cadastrado.")))return alert(e);"popup"==a.validationMethod?f.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterSuccess"}):"animateField"!=a.validationMethod&&f.slideDown().bind("click",function(){d(this).slideUp()});var c=b.find(a.emailField);a.setDefaultName&&
b.find(a.nameField).is("input:text, textarea")&&b.find(a.nameField).val(a.defaultName);var g=function(){c.val(a.defaultEmail)};"animateField"==a.validationMethod?(c.val(b.find(a.animateFieldSuccess).val()||"Obrigado!!!"),c.addClass("vtexNewsSuccess"),h=setTimeout(function(){c.removeClass("vtexNewsSuccess");g();c.unbind("focus.vtexNews")},a.timeHideSuccessMsg),c.bind("focus.vtexNews",function(){c.removeClass("vtexNewsSuccess");clearTimeout(h);d(this).val("");d(this).unbind("focus.vtexNews")})):g();
a.successCallback(m);d(b).trigger("qdNewsSuccessCallback",m)}});a.submitCallback(h,e)}else k("Os dados n\u00e3o foram enviados pois o parametro 'allowSubmit' n\u00e3o retornou 'true'","info")};var p=function(a){13==(a.keyCode?a.keyCode:a.which)&&(a.preventDefault(),g())};e.filter("input:text, textarea").bind("keydown",p);c.bind("keydown",p);p=l.getParent("form");p.length?p.submit(function(a){a.preventDefault();g()}):l.bind("click.qd_news",function(){g()})});return g};d(function(){d(".qd_news_auto").QD_news()})}})();
/* Quatro Digital - jQuery Ajax Queue // 4.0 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT <http://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT> */
(function(d){if("function"!==typeof d.qdAjax){var a={};d.qdAjaxQueue=a;150>parseInt((d.fn.jquery.replace(/[^0-9]+/g,"")+"000").slice(0,3),10)&&console&&"function"==typeof console.error&&console.error();d.qdAjax=function(e){try{var b=d.extend({},{url:"",type:"GET",data:"",success:function(){},error:function(){},complete:function(){},clearQueueDelay:5},e);var f="object"===typeof b.data?JSON.stringify(b.data):b.data.toString();var c=encodeURIComponent(b.url+"|"+b.type+"|"+f);a[c]=a[c]||{};"undefined"==
typeof a[c].jqXHR?a[c].jqXHR=d.ajax(b):(a[c].jqXHR.done(b.success),a[c].jqXHR.fail(b.error),a[c].jqXHR.always(b.complete));a[c].jqXHR.always(function(){isNaN(parseInt(b.clearQueueDelay))||setTimeout(function(){a[c].jqXHR=void 0},b.clearQueueDelay)});return a[c].jqXHR}catch(g){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Problemas no $.qdAjax :( . Detalhes: "+g.message)}};d.qdAjax.version="4.0"}})(jQuery);
/* Quatro Digital - VTEX Checkout Queue // 1.1 //  Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
(function(){var l=function(a,c){if("object"===typeof console){var d="object"===typeof a;"undefined"!==typeof c&&"alerta"===c.toLowerCase()?d?console.warn("[QD VTEX Checkout Queue]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.warn("[QD VTEX Checkout Queue]\n"+a):"undefined"!==typeof c&&"info"===c.toLowerCase()?d?console.info("[QD VTEX Checkout Queue]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.info("[QD VTEX Checkout Queue]\n"+a):d?console.error("[QD VTEX Checkout Queue]\n",a[0],a[1],
a[2],a[3],a[4],a[5],a[6],a[7]):console.error("[QD VTEX Checkout Queue]\n"+a)}},f=null,g={},h={},e={};$.QD_checkoutQueue=function(a,c){if(null===f)if("object"===typeof window.vtexjs&&"undefined"!==typeof window.vtexjs.checkout)f=window.vtexjs.checkout;else return l("N\u00e3o foi encontrada a biblioteca VTEX.js. Este componente para por aqui, a for\u00e7a n\u00e3o esta mais contigo neste jornada! Para resolver isto inclua a biblioteca VTEX.js");var d=$.extend({done:function(){},fail:function(){}},c),
b=a.join(";"),k=function(){g[b].add(d.done);h[b].add(d.fail)};e[b]?k():(g[b]=$.Callbacks(),h[b]=$.Callbacks(),k(),e[b]=!0,f.getOrderForm(a).done(function(a){e[b]=!1;g[b].fire(a)}).fail(function(a){e[b]=!1;h[b].fire(a)}))}})();
/* Quatro Digital - Scroll Toggle // 1.4 // Carlos Vinicius // Todos os direitos reservados */
(function(){var d=jQuery,e=function(a,c){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var b;"object"===typeof a?(a.unshift("[QD Scroll Toggle]\n"),b=a):b=["[QD Scroll Toggle]\n"+a];if("undefined"===typeof c||"alerta"!==c.toLowerCase()&&"aviso"!==c.toLowerCase())if("undefined"!==typeof c&&"info"===c.toLowerCase())try{console.info.apply(console,b)}catch(f){try{console.info(b.join("\n"))}catch(g){}}else try{console.error.apply(console,
b)}catch(f){try{console.error(b.join("\n"))}catch(g){}}else try{console.warn.apply(console,b)}catch(f){try{console.warn(b.join("\n"))}catch(g){}}}};"function"!==typeof d.QD_scrollToggle&&(d.QD_scrollToggle=function(a){var c=[];if("string"!==typeof a&&"number"!==typeof a||"auto"===a)if("auto"===a)c.push(d(window).height());else return e("N\u00e3o foi informado o limite de scroll necess\u00e1rio para adicionar o atributo.");else{var b=a.split(","),f;for(f in b)"function"!==typeof b[f]&&(a=parseInt(b[f].trim()),
isNaN(a)||c.push(a))}if(!c.length)return e("Aaeeeeeeee irm\u00e3o! N\u00e3o consegui encontrar nenhum valor para calcular o scroll");if(!document||!document.body||"undefined"===typeof document.body.setAttribute)return e('"document.body.setAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!document||!document.body||"undefined"===typeof document.body.removeAttribute)return e('"document.body.removeAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!document||!document.body||"undefined"===
typeof document.body.getAttribute)return e('"document.body.getAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!d(window).scrollTop||isNaN(parseInt(d(window).scrollTop())))return e('"$(window).scrollTop" n\u00e3o esta retornando um n\u00famero inteiro :(');try{document.body.setAttribute("data-qd-scroll",1),document.body.getAttribute("data-qd-scroll"),document.body.removeAttribute("data-qd-scroll"),document.body.getAttribute("data-qd-scroll")}catch(g){e("N\u00e3o foi poss\u00edvel fazer o passo a passo de consultar, adicionar e remover um atributo",
g.message)}d(window).scroll(function(){for(var a=0;a<c.length;a++)d(window).scrollTop()>c[a]?document.body.getAttribute("data-qd-scroll-"+a)||document.body.setAttribute("data-qd-scroll-"+a,1):document.body.getAttribute("data-qd-scroll-"+a)&&document.body.removeAttribute("data-qd-scroll-"+a)})},d(function(){var a=d("body[data-qd-scroll-limit]");a.length&&d.QD_scrollToggle(a.attr("data-qd-scroll-limit"))}))})();
/* jQuery Cookie Plugin v1.4.1 // https://github.com/carhartl/jquery-cookie // Copyright 2013 Klaus Hartl // Released under the MIT license */
(function(){"function"!==typeof $.cookie&&function(c){"function"===typeof define&&define.amd?define(["jquery"],c):"object"===typeof exports?c(require("jquery")):c(jQuery)}(function(c){function p(a){a=e.json?JSON.stringify(a):String(a);return e.raw?a:encodeURIComponent(a)}function n(a,g){if(e.raw)var b=a;else a:{var d=a;0===d.indexOf('"')&&(d=d.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{d=decodeURIComponent(d.replace(l," "));b=e.json?JSON.parse(d):d;break a}catch(h){}b=void 0}return c.isFunction(g)?
g(b):b}var l=/\+/g,e=c.cookie=function(a,g,b){if(1<arguments.length&&!c.isFunction(g)){b=c.extend({},e.defaults,b);if("number"===typeof b.expires){var d=b.expires;var h=b.expires=new Date;h.setTime(+h+864E5*d)}return document.cookie=[e.raw?a:encodeURIComponent(a),"=",p(g),b.expires?"; expires="+b.expires.toUTCString():"",b.path?"; path="+b.path:"",b.domain?"; domain="+b.domain:"",b.secure?"; secure":""].join("")}d=a?void 0:{};h=document.cookie?document.cookie.split("; "):[];for(var m=0,l=h.length;m<
l;m++){var f=h[m].split("=");var k=f.shift();k=e.raw?k:decodeURIComponent(k);f=f.join("=");if(a&&a===k){d=n(f,g);break}a||void 0===(f=n(f))||(d[k]=f)}return d};e.defaults={};c.removeCookie=function(a,e){if(void 0===c.cookie(a))return!1;c.cookie(a,"",c.extend({},e,{expires:-1}));return!c.cookie(a)}})})();
/*PHP JS - Number Format - http://phpjs.org/functions/number_format/*/
function qd_number_format(b, c, d, e) { b = (b + "").replace(/[^0-9+\-Ee.]/g, ""); b = isFinite(+b) ? +b : 0; c = isFinite(+c) ? Math.abs(c) : 0; e = "undefined" === typeof e ? "," : e; d = "undefined" === typeof d ? "." : d; var a = "", a = function (a, b) { var c = Math.pow(10, b); return "" + (Math.round(a * c) / c).toFixed(b) }, a = (c ? a(b, c) : "" + Math.round(b)).split("."); 3 < a[0].length && (a[0] = a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, e)); (a[1] || "").length < c && (a[1] = a[1] || "", a[1] += Array(c - a[1].length + 1).join("0")); return a.join(d) };
/* Quatro Digital Simple Cart // 4.15 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
(function(){var b=jQuery;if("function"!==typeof b.fn.simpleCart){b(function(){var b=vtexjs.checkout.getOrderForm;vtexjs.checkout.getOrderForm=function(){return b.call()}});try{window.QuatroDigital_simpleCart=window.QuatroDigital_simpleCart||{};window.QuatroDigital_simpleCart.ajaxStopOn=!1;b.fn.simpleCart=function(c,n,h){var k=function(a,b){if("object"===typeof console){var e="object"===typeof a;"undefined"!==typeof b&&"alerta"===b.toLowerCase()?e?console.warn("[Simple Cart]\n",a[0],a[1],a[2],a[3],
a[4],a[5],a[6],a[7]):console.warn("[Simple Cart]\n"+a):"undefined"!==typeof b&&"info"===b.toLowerCase()?e?console.info("[Simple Cart]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.info("[Simple Cart]\n"+a):e?console.error("[Simple Cart]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.error("[Simple Cart]\n"+a)}};var d=b(this);"object"===typeof c?n=c:(c=c||!1,d=d.add(b.QD_simpleCart.elements));if(!d.length)return d;b.QD_simpleCart.elements=b.QD_simpleCart.elements.add(d);h="undefined"===
typeof h?!1:h;var m={cartQtt:".qd_cart_qtt",cartTotal:".qd_cart_total",itemsText:".qd_items_text",currencySymbol:(b("meta[name=currency]").attr("content")||"R$")+" ",showQuantityByItems:!0,smartCheckout:!0,callback:function(){}};var f=b.extend({},m,n);var l=b("");d.each(function(){var a=b(this);a.data("qd_simpleCartOpts")||a.data("qd_simpleCartOpts",f)});var g=function(a){window._QuatroDigital_CartData=window._QuatroDigital_CartData||{};for(var b=0,e=0,c=0;c<a.totalizers.length;c++)"Shipping"==a.totalizers[c].id&&
(e+=a.totalizers[c].value),b+=a.totalizers[c].value;window._QuatroDigital_CartData.total=f.currencySymbol+qd_number_format(b/100,2,",",".");window._QuatroDigital_CartData.shipping=f.currencySymbol+qd_number_format(e/100,2,",",".");window._QuatroDigital_CartData.allTotal=f.currencySymbol+qd_number_format((b+e)/100,2,",",".");window._QuatroDigital_CartData.qtt=0;if(f.showQuantityByItems)for(c=0;c<a.items.length;c++)window._QuatroDigital_CartData.qtt+=a.items[c].quantity;else window._QuatroDigital_CartData.qtt=
a.items.length||0;try{window._QuatroDigital_CartData.callback&&window._QuatroDigital_CartData.callback.fire&&window._QuatroDigital_CartData.callback.fire()}catch(u){k("Problemas com o callback do Smart Cart")}p(l)};var q=function(a,b){1===a?b.hide().filter(".singular").show():b.hide().filter(".plural").show()};var r=function(a){1>a?d.addClass("qd-emptyCart"):d.removeClass("qd-emptyCart")};var t=function(a,b){var c=parseInt(window._QuatroDigital_CartData.qtt,10);b.$this.show();isNaN(c)&&(k("O valor obtido para calcular o plural/singular n\u00e3o \u00e9 um n\u00famero! O valor ser\u00e1 definido para 0.",
"alerta"),c=0);b.cartTotalE.html(window._QuatroDigital_CartData.total);b.cartQttE.html(c);q(c,b.itemsTextE);r(c)};var p=function(a){d.each(function(){var d={};var e=b(this);c&&e.data("qd_simpleCartOpts")&&b.extend(f,e.data("qd_simpleCartOpts"));d.$this=e;d.cartQttE=e.find(f.cartQtt)||l;d.cartTotalE=e.find(f.cartTotal)||l;d.itemsTextE=e.find(f.itemsText)||l;d.emptyElem=e.find(f.emptyCart)||l;t(a,d);e.addClass("qd-sc-populated")})};(function(){if(f.smartCheckout){window._QuatroDigital_DropDown=window._QuatroDigital_DropDown||
{};if("undefined"!==typeof window._QuatroDigital_DropDown.getOrderForm&&(h||!c))return g(window._QuatroDigital_DropDown.getOrderForm);if("object"!==typeof window.vtexjs||"undefined"===typeof window.vtexjs.checkout)if("object"===typeof vtex&&"object"===typeof vtex.checkout&&"undefined"!==typeof vtex.checkout.SDK)new vtex.checkout.SDK;else return k("N\u00e3o foi encontrada a biblioteca VTEX.js");b.QD_checkoutQueue(["items","totalizers","shippingData"],{done:function(a){g(a);window._QuatroDigital_DropDown.getOrderForm=
a},fail:function(a){k(["N\u00e3o foi poss\u00edvel obter os dados para o carrinho.",a])}})}else alert("Esta \u00e9 uma fun\u00e7\u00e3o descontinuada =/")})();f.callback();b(window).trigger("simpleCartCallback.quatro_digital");return d};b.QD_simpleCart={elements:b("")};b(function(){var c;"function"===typeof window.ajaxRequestbuyButtonAsynchronous&&(c=window.ajaxRequestbuyButtonAsynchronous,window.ajaxRequestbuyButtonAsynchronous=function(g,h,k,d,m){c.call(this,g,h,k,d,function(){"function"===typeof m&&
m();b.QD_simpleCart.elements.each(function(){var c=b(this);c.simpleCart(c.data("qd_simpleCartOpts"))})})})});var g=window.ReloadItemsCart||void 0;window.ReloadItemsCart=function(c){b.fn.simpleCart(!0);"function"===typeof g?g.call(this,c):alert(c)};b(function(){var c=b(".qd_cart_auto");c.length&&c.simpleCart()});b(function(){b(window).bind("productAddedToCart minicartUpdated.vtex cartProductAdded.vtex",function(){b.fn.simpleCart(!0)})})}catch(c){"undefined"!==typeof console&&"function"===typeof console.error&&
console.error("Oooops! ",c)}}})();
/* $("a").getParent("ul"); // 3 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT */
(function (a) { a.fn.getParent = a.fn.closest })(jQuery);
/* Automatizador de comments box do Facebook // 1.6 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a=$(".fb-comments");a.length&&a.attr("data-href",document.location.href.split("#").shift().split("?").shift());$("#fb-root").length||$("body").append('<div id="fb-root"></div>');if(!$("script#facebook-jssdk").length){var a=$("meta[property='fb:app_id']").attr("content")||!1,b,c=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||(b=document.createElement("script"),b.id="facebook-jssdk",b.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+
(a?"&appId="+a:""),c.parentNode.insertBefore(b,c))}"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse()});
/* SLICK.JS - Version: 1.7.1 Author: Ken Wheeler Website: http://kenwheeler.github.io Docs: http://kenwheeler.github.io/slick Repo: http://github.com/kenwheeler/slick Issues: http://github.com/kenwheeler/slick/issues */
!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)}(function(i){"use strict";var e=window.Slick||{};(e=function(){var e=0;return function(t,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(t),appendDots:i(t),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(t),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(t).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,void 0!==document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=e++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}}()).prototype.activateADA=function(){this.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):!0===o?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),!0===s.options.rtl&&!1===s.options.vertical&&(e=-e),!1===s.transformsEnabled?!1===s.options.vertical?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):!1===s.cssTransitions?(!0===s.options.rtl&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),!1===s.options.vertical?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),!1===s.options.vertical?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=i(t).not(e.$slider)),t},e.prototype.asNavFor=function(e){var t=this.getNavTarget();null!==t&&"object"==typeof t&&t.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};!1===e.options.fade?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(!1===i.options.infinite&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1==0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;!0===e.options.arrows&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),!0!==e.options.infinite&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(!0===o.options.dots){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),!0!==e.options.centerMode&&!0!==e.options.swipeToSlide||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),!0===e.options.draggable&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>1){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){s=null;for(o in r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(!1===r.originalSettings.mobileFirst?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||!1===l||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n,r=this,l=i(e.currentTarget);switch(l.is("a")&&e.preventDefault(),l.is("li")||(l=l.closest("li")),n=r.slideCount%r.options.slidesToScroll!=0,o=n?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll,e.data.message){case"previous":s=0===o?r.options.slidesToScroll:r.options.slidesToShow-o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-s,!1,t);break;case"next":s=0===o?r.options.slidesToScroll:o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+s,!1,t);break;case"index":var d=0===e.data.index?0:e.data.index||l.index()*r.options.slidesToScroll;r.slideHandler(r.checkNavigable(d),!1,t),l.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t;if(e=this.getNavigableIndexes(),t=0,i>e[e.length-1])i=e[e.length-1];else for(var o in e){if(i<e[o]){i=t;break}t=e[o]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),!0===e.options.accessibility&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),!0===e.options.accessibility&&(e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),!0===e.options.accessibility&&e.$list.off("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>1&&((i=e.$slides.children().children()).removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){!1===this.shouldClick&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;!1===t.cssTransitions?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;!1===e.cssTransitions?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",function(t){t.stopImmediatePropagation();var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&(e.focussed=o.is(":focus"),e.autoPlay())},0)})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){return this.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(!0===i.options.infinite)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(!0===i.options.centerMode)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s=this,n=0;return s.slideOffset=0,t=s.$slides.first().outerHeight(!0),!0===s.options.infinite?(s.slideCount>s.options.slidesToShow&&(s.slideOffset=s.slideWidth*s.options.slidesToShow*-1,n=t*s.options.slidesToShow*-1),s.slideCount%s.options.slidesToScroll!=0&&i+s.options.slidesToScroll>s.slideCount&&s.slideCount>s.options.slidesToShow&&(i>s.slideCount?(s.slideOffset=(s.options.slidesToShow-(i-s.slideCount))*s.slideWidth*-1,n=(s.options.slidesToShow-(i-s.slideCount))*t*-1):(s.slideOffset=s.slideCount%s.options.slidesToScroll*s.slideWidth*-1,n=s.slideCount%s.options.slidesToScroll*t*-1))):i+s.options.slidesToShow>s.slideCount&&(s.slideOffset=(i+s.options.slidesToShow-s.slideCount)*s.slideWidth,n=(i+s.options.slidesToShow-s.slideCount)*t),s.slideCount<=s.options.slidesToShow&&(s.slideOffset=0,n=0),!0===s.options.centerMode&&s.slideCount<=s.options.slidesToShow?s.slideOffset=s.slideWidth*Math.floor(s.options.slidesToShow)/2-s.slideWidth*s.slideCount/2:!0===s.options.centerMode&&!0===s.options.infinite?s.slideOffset+=s.slideWidth*Math.floor(s.options.slidesToShow/2)-s.slideWidth:!0===s.options.centerMode&&(s.slideOffset=0,s.slideOffset+=s.slideWidth*Math.floor(s.options.slidesToShow/2)),e=!1===s.options.vertical?i*s.slideWidth*-1+s.slideOffset:i*t*-1+n,!0===s.options.variableWidth&&(o=s.slideCount<=s.options.slidesToShow||!1===s.options.infinite?s.$slideTrack.children(".slick-slide").eq(i):s.$slideTrack.children(".slick-slide").eq(i+s.options.slidesToShow),e=!0===s.options.rtl?o[0]?-1*(s.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,!0===s.options.centerMode&&(o=s.slideCount<=s.options.slidesToShow||!1===s.options.infinite?s.$slideTrack.children(".slick-slide").eq(i):s.$slideTrack.children(".slick-slide").eq(i+s.options.slidesToShow+1),e=!0===s.options.rtl?o[0]?-1*(s.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,e+=(s.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){return this.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(!1===e.options.infinite?i=e.slideCount:(t=-1*e.options.slidesToScroll,o=-1*e.options.slidesToScroll,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o=this;return t=!0===o.options.centerMode?o.slideWidth*Math.floor(o.options.slidesToShow/2):0,!0===o.options.swipeToSlide?(o.$slideTrack.find(".slick-slide").each(function(s,n){if(n.offsetLeft-t+i(n).outerWidth()/2>-1*o.swipeLeft)return e=n,!1}),Math.abs(i(e).attr("data-slick-index")-o.currentSlide)||1):o.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){this.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),!0===t.options.accessibility&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),-1!==s&&i(this).attr({"aria-describedby":"slick-slide-control"+e.instanceUid+s})}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.$slides.eq(s).attr("tabindex",0);e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),!0===i.options.accessibility&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;!0===e.options.dots&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),!0===e.options.accessibility&&e.$dots.on("keydown.slick",e.keyHandler)),!0===e.options.dots&&!0===e.options.pauseOnDotsHover&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),!0===e.options.accessibility&&e.$list.on("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&!0===e.options.accessibility?e.changeSlide({data:{message:!0===e.options.rtl?"next":"previous"}}):39===i.keyCode&&!0===e.options.accessibility&&e.changeSlide({data:{message:!0===e.options.rtl?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||n.$slider.attr("data-sizes"),r=document.createElement("img");r.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),n.$slider.trigger("lazyLoaded",[n,e,t])})},r.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),n.$slider.trigger("lazyLoadError",[n,e,t])},r.src=t})}var t,o,s,n=this;if(!0===n.options.centerMode?!0===n.options.infinite?s=(o=n.currentSlide+(n.options.slidesToShow/2+1))+n.options.slidesToShow+2:(o=Math.max(0,n.currentSlide-(n.options.slidesToShow/2+1)),s=n.options.slidesToShow/2+1+2+n.currentSlide):(o=n.options.infinite?n.options.slidesToShow+n.currentSlide:n.currentSlide,s=Math.ceil(o+n.options.slidesToShow),!0===n.options.fade&&(o>0&&o--,s<=n.slideCount&&s++)),t=n.$slider.find(".slick-slide").slice(o,s),"anticipated"===n.options.lazyLoad)for(var r=o-1,l=s,d=n.$slider.find(".slick-slide"),a=0;a<n.options.slidesToScroll;a++)r<0&&(r=n.slideCount-1),t=(t=t.add(d.eq(r))).add(d.eq(l)),r--,l++;e(t),n.slideCount<=n.options.slidesToShow?e(n.$slider.find(".slick-slide")):n.currentSlide>=n.slideCount-n.options.slidesToShow?e(n.$slider.find(".slick-cloned").slice(0,n.options.slidesToShow)):0===n.currentSlide&&e(n.$slider.find(".slick-cloned").slice(-1*n.options.slidesToShow))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){this.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;t.unslicked||(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),!0===t.options.accessibility&&(t.initADA(),t.options.autoplay||i(t.$slides.get(t.currentSlide)).attr("tabindex",0).focus()))},e.prototype.prev=e.prototype.slickPrev=function(){this.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),(r=document.createElement("img")).onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),!0===l.options.adaptiveHeight&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){s.respondTo=s.options.respondTo||"window";for(e in n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;if(i="boolean"==typeof i?!0===(e=i)?0:o.slideCount-1:!0===e?--i:i,o.slideCount<1||i<0||i>o.slideCount-1)return!1;o.unload(),!0===t?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,o.reinit()},e.prototype.setCSS=function(i){var e,t,o=this,s={};!0===o.options.rtl&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,!1===o.transformsEnabled?o.$slideTrack.css(s):(s={},!1===o.cssTransitions?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;!1===i.options.vertical?!0===i.options.centerMode&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),!0===i.options.centerMode&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),!1===i.options.vertical&&!1===i.options.variableWidth?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):!0===i.options.variableWidth?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();!1===i.options.variableWidth&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,!0===t.options.rtl?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":void 0!==arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),!1===i.options.fade?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=!0===i.options.vertical?"top":"left","top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||!0===i.options.useCSS&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&!1!==i.animType&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&!1!==i.animType},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),!0===n.options.centerMode?(e=Math.floor(n.options.slidesToShow/2),!0===n.options.infinite&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")):i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=!0===n.options.infinite?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(!0===s.options.fade&&(s.options.centerMode=!1),!0===s.options.infinite&&!1===s.options.fade&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=!0===s.options.centerMode?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){var e=this;i||e.autoPlay(),e.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));s||(s=0),t.slideCount<=t.options.slidesToShow?t.slideHandler(s,!1,!0):t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(!0===a.animating&&!0===a.options.waitForAnimate||!0===a.options.fade&&a.currentSlide===i))if(!1===e&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,!1===a.options.infinite&&!1===a.options.centerMode&&(i<0||i>a.getDotCount()*a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else if(!1===a.options.infinite&&!0===a.options.centerMode&&(i<0||i>a.slideCount-a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else{if(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!=0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!=0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=(l=a.getNavTarget()).slick("getSlick")).slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide),a.updateDots(),a.updateArrows(),!0===a.options.fade)return!0!==t?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight();!0!==t?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)}},e.prototype.startLoad=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),(o=Math.round(180*t/Math.PI))<0&&(o=360-Math.abs(o)),o<=45&&o>=0?!1===s.options.rtl?"left":"right":o<=360&&o>=315?!1===s.options.rtl?"left":"right":o>=135&&o<=225?!1===s.options.rtl?"right":"left":!0===s.options.verticalSwiping?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(!0===o.touchObject.edgeHit&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(!1===e.options.swipe||"ontouchend"in document&&!1===e.options.swipe||!1===e.options.draggable&&-1!==i.type.indexOf("mouse")))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,!0===e.options.verticalSwiping&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(!0===l.options.verticalSwiping&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(!1===l.options.rtl?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),!0===l.options.verticalSwiping&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,!1===l.options.infinite&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),!1===l.options.vertical?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,!0===l.options.verticalSwiping&&(l.swipeLeft=e+o*s),!0!==l.options.fade&&!1!==l.options.touchMove&&(!0===l.animating?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;if(t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow)return t.touchObject={},!1;void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,t.dragging=!0},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i=this;Math.floor(i.options.slidesToShow/2),!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&!i.options.infinite&&(i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===i.currentSlide?(i.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-i.options.slidesToShow&&!1===i.options.centerMode?(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-1&&!0===i.options.centerMode&&(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||void 0===s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),void 0!==t)return t;return o}});
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt;
d=d.wrap("<span></span>");var h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);
/* Quatro Digital - Smart Quantity // 1.12 // Carlos Vinicius // Todos os direitos reservados */
(function(v){var d=jQuery;if("function"!==typeof d.fn.QD_smartQuantity){var g=function(d,a){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var f;"object"===typeof d?(d.unshift("[Quatro Digital - Smart Quantity]\n"),f=d):f=["[Quatro Digital - Smart Quantity]\n"+d];if("undefined"===typeof a||"alerta"!==a.toLowerCase()&&"aviso"!==a.toLowerCase())if("undefined"!==typeof a&&"info"===a.toLowerCase())try{console.info.apply(console,
f)}catch(k){console.info(f.join("\n"))}else try{console.error.apply(console,f)}catch(k){console.error(f.join("\n"))}else try{console.warn.apply(console,f)}catch(k){console.warn(f.join("\n"))}}},m={buyButton:".buy-button",qttInput:".qd-sq-quantity",btnMore:".qd-sq-more",btnMinus:".qd-sq-minus",initialValue:1,minimumValue:1,setQuantityByUrl:!0},n=function(h,a){function f(c,e,b){a.setQuantityByUrl?c.val(((location.search||"").match(q)||[a.initialValue]).pop()):c.val(a.initialValue);c.change(function(c,
b){try{if("qd_ssl_trigger"!=b){var e=d(this),f=parseInt(e.val().replace(n,""));!isNaN(f)&&f>a.minimumValue?e.val(f):e.val(a.minimumValue);e.trigger("QuatroDigital.sq_change",this)}}catch(t){g(t.message)}});c.focusin(function(){d(this).trigger("QuatroDigital.sq_focusin",this)});e.click(function(b){b.preventDefault();c.val((parseInt(c.val())||a.minimumValue)+1).change()});b.click(function(b){b.preventDefault();c.val((parseInt(c.val())||a.minimumValue+1)-1).change()});c.change()}function k(c,e,b){c.on("QuatroDigital.sq_change",
function(){(d(this).val()||0)<=a.minimumValue?(b.addClass("qd-sq-inactive"),e.removeClass("qd-sq-inactive")):(e.addClass("qd-sq-inactive"),b.removeClass("qd-sq-inactive"))})}function m(c,e){c.on("QuatroDigital.sq_change",function(){try{if(!(e[0].hostname||"").length)return g("A quantidade n\u00e3o foi inserida no bt comprar pois o mesmo n\u00e3o possui uma URL","info");var b=e[0].search||"";-1<b.toLowerCase().indexOf("qty=")?e[0].search=b.replace(p,"qty="+(parseInt(c.val())||("number"==typeof a.minimumValue?
a.minimumValue:1))+"&"):e[0].search="qty="+(parseInt(c.val())||("number"==typeof a.minimumValue?a.minimumValue:1))+"&"+(e[0].search||"").replace(p,"");e.not(":first").each(function(){this.href=e[0].href});var d=((e.first().attr("href")||"").match(u)||[""]).pop()+"";c.attr("data-sku-id",d);if(d.length&&"object"===typeof skuJson&&!c.attr("data-sku-price"))for(b=0;b<skuJson.skus.length;b++)skuJson.skus[b].sku==d&&c.attr("data-sku-price",skuJson.skus[b].bestPrice)}catch(l){g(l.message)}})}var n=/[^0-9-]/gi,
q=/qty\=([0-9]+)/i,u=/sku\=([0-9]+)/i,p=/qty\=[0-9]+\&?/ig;h.each(function(){try{var c=d(this),e=c.find(a.buyButton),b=c.find(a.qttInput),h=c.find(a.btnMore),l=c.find(a.btnMinus);if(!e.length&&null!==a.buyButton||!b.length)return g("O plugin parou por aqui! N\u00e3o foram encontrados o bot\u00e3o comprar e o campo de quantidade","alerta");if(b.is(".qd-sq-on"))return g(["Execu\u00e7\u00e3o ignorada pois este input j\u00e1 possui o plugin aplicado. Input: ",b],"info");b.addClass("qd-sq-on");k(b,h,l);
null!==a.buyButton&&m(b,e);f(b,h,l);d(window).on("vtex.sku.selected",function(){b.change()})}catch(r){g(r.message)}})};d.fn.QD_smartQuantity=function(g){var a=d(this);a.qdPlugin=new n(a,d.extend({},m,g));d(window).trigger("QuatroDigital.sq_callback");return a};d(function(){d(".qd_auto_smart_quantity").QD_smartQuantity()})}})(this);

/* Bootstrap: tab.js v3.3.7 */
(function(c){function g(a){return this.each(function(){var f=c(this),b=f.data("bs.tab");b||f.data("bs.tab",b=new d(this));if("string"==typeof a)b[a]()})}var d=function(a){this.element=c(a)};d.VERSION="3.3.7";d.TRANSITION_DURATION=150;d.prototype.show=function(){var a=this.element,f=a.closest("ul:not(.dropdown-menu)"),b=a.data("target");b||(b=(b=a.attr("href"))&&b.replace(/.*(?=#[^\s]*$)/,""));if(!a.parent("li").hasClass("active")){var d=f.find(".active:last a"),e=c.Event("hide.bs.tab",{relatedTarget:a[0]}),
h=c.Event("show.bs.tab",{relatedTarget:d[0]});d.trigger(e);a.trigger(h);h.isDefaultPrevented()||e.isDefaultPrevented()||(b=c(b),this.activate(a.closest("li"),f),this.activate(b,b.parent(),function(){d.trigger({type:"hidden.bs.tab",relatedTarget:a[0]});a.trigger({type:"shown.bs.tab",relatedTarget:d[0]})}))}};d.prototype.activate=function(a,f,b){function g(){e.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1);a.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",
!0);h?(a[0].offsetWidth,a.addClass("in")):a.removeClass("fade");a.parent(".dropdown-menu").length&&a.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0);b&&b()}var e=f.find("> .active"),h=b&&c.support.transition&&(e.length&&e.hasClass("fade")||!!f.find("> .fade").length);e.length&&h?e.one("bsTransitionEnd",g).emulateTransitionEnd(d.TRANSITION_DURATION):g();e.removeClass("in")};var l=c.fn.tab;c.fn.tab=g;c.fn.tab.Constructor=d;c.fn.tab.noConflict=function(){c.fn.tab=
l;return this};var k=function(a){a.preventDefault();g.call(c(this),"show")};c(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',k).on("click.bs.tab.data-api",'[data-toggle="pill"]',k)})(jQuery);
/* Bootstrap: tooltip.js v3.3.7 */
(function(e){var d=function(b,a){this.inState=this.$element=this.hoverState=this.timeout=this.enabled=this.options=this.type=null;this.init("tooltip",b,a)};d.VERSION="3.3.7";d.TRANSITION_DURATION=150;d.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}};d.prototype.init=function(b,a,
c){this.enabled=!0;this.type=b;this.$element=e(a);this.options=this.getOptions(c);this.$viewport=this.options.viewport&&e(e.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport);this.inState={click:!1,hover:!1,focus:!1};if(this.$element[0]instanceof document.constructor&&!this.options.selector)throw Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");b=this.options.trigger.split(" ");
for(a=b.length;a--;)if(c=b[a],"click"==c)this.$element.on("click."+this.type,this.options.selector,e.proxy(this.toggle,this));else if("manual"!=c){var f="hover"==c?"mouseleave":"focusout";this.$element.on(("hover"==c?"mouseenter":"focusin")+"."+this.type,this.options.selector,e.proxy(this.enter,this));this.$element.on(f+"."+this.type,this.options.selector,e.proxy(this.leave,this))}this.options.selector?this._options=e.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()};d.prototype.getDefaults=
function(){return d.DEFAULTS};d.prototype.getOptions=function(b){b=e.extend({},this.getDefaults(),this.$element.data(),b);b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay});return b};d.prototype.getDelegateOptions=function(){var b={},a=this.getDefaults();this._options&&e.each(this._options,function(c,f){a[c]!=f&&(b[c]=f)});return b};d.prototype.enter=function(b){var a=b instanceof this.constructor?b:e(b.currentTarget).data("bs."+this.type);a||(a=new this.constructor(b.currentTarget,
this.getDelegateOptions()),e(b.currentTarget).data("bs."+this.type,a));b instanceof e.Event&&(a.inState["focusin"==b.type?"focus":"hover"]=!0);if(a.tip().hasClass("in")||"in"==a.hoverState)a.hoverState="in";else{clearTimeout(a.timeout);a.hoverState="in";if(!a.options.delay||!a.options.delay.show)return a.show();a.timeout=setTimeout(function(){"in"==a.hoverState&&a.show()},a.options.delay.show)}};d.prototype.isInStateTrue=function(){for(var b in this.inState)if(this.inState[b])return!0;return!1};d.prototype.leave=
function(b){var a=b instanceof this.constructor?b:e(b.currentTarget).data("bs."+this.type);a||(a=new this.constructor(b.currentTarget,this.getDelegateOptions()),e(b.currentTarget).data("bs."+this.type,a));b instanceof e.Event&&(a.inState["focusout"==b.type?"focus":"hover"]=!1);if(!a.isInStateTrue()){clearTimeout(a.timeout);a.hoverState="out";if(!a.options.delay||!a.options.delay.hide)return a.hide();a.timeout=setTimeout(function(){"out"==a.hoverState&&a.hide()},a.options.delay.hide)}};d.prototype.show=
function(){var b;var a=e.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(a);var c=e.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(!a.isDefaultPrevented()&&c){var f=this;a=this.tip();c=this.getUID(this.type);this.setContent();a.attr("id",c);this.$element.attr("aria-describedby",c);this.options.animation&&a.addClass("fade");c="function"==typeof this.options.placement?this.options.placement.call(this,a[0],this.$element[0]):this.options.placement;
var h=/\s?auto?\s?/i;(b=h.test(c))&&(c=c.replace(h,"")||"top");a.detach().css({top:0,left:0,display:"block"}).addClass(c).data("bs."+this.type,this);this.options.container?a.appendTo(this.options.container):a.insertAfter(this.$element);this.$element.trigger("inserted.bs."+this.type);var h=this.getPosition(),k=a[0].offsetWidth,g=a[0].offsetHeight;if(b){b=c;var l=this.getPosition(this.$viewport);c="bottom"==c&&h.bottom+g>l.bottom?"top":"top"==c&&h.top-g<l.top?"bottom":"right"==c&&h.right+k>l.width?
"left":"left"==c&&h.left-k<l.left?"right":c;a.removeClass(b).addClass(c)}h=this.getCalculatedOffset(c,h,k,g);this.applyPlacement(h,c);c=function(){var a=f.hoverState;f.$element.trigger("shown.bs."+f.type);f.hoverState=null;"out"==a&&f.leave(f)};e.support.transition&&this.$tip.hasClass("fade")?a.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c()}}};d.prototype.applyPlacement=function(b,a){var c=this.tip(),f=c[0].offsetWidth,d=c[0].offsetHeight,k=parseInt(c.css("margin-top"),10),
g=parseInt(c.css("margin-left"),10);isNaN(k)&&(k=0);isNaN(g)&&(g=0);b.top+=k;b.left+=g;e.offset.setOffset(c[0],e.extend({using:function(a){c.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0);c.addClass("in");var g=c[0].offsetWidth,l=c[0].offsetHeight;"top"==a&&l!=d&&(b.top=b.top+d-l);var m=this.getViewportAdjustedDelta(a,b,g,l);m.left?b.left+=m.left:b.top+=m.top;f=(k=/top|bottom/.test(a))?2*m.left-f+g:2*m.top-d+l;d=k?"offsetWidth":"offsetHeight";c.offset(b);this.replaceArrow(f,c[0][d],
k)};d.prototype.replaceArrow=function(b,a,c){this.arrow().css(c?"left":"top",50*(1-b/a)+"%").css(c?"top":"left","")};d.prototype.setContent=function(){var b=this.tip(),a=this.getTitle();b.find(".tooltip-inner")[this.options.html?"html":"text"](a);b.removeClass("fade in top bottom left right")};d.prototype.hide=function(b){function a(){"in"!=c.hoverState&&f.detach();c.$element&&c.$element.removeAttr("aria-describedby").trigger("hidden.bs."+c.type);b&&b()}var c=this,f=e(this.$tip),h=e.Event("hide.bs."+
this.type);this.$element.trigger(h);if(!h.isDefaultPrevented())return f.removeClass("in"),e.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",a).emulateTransitionEnd(d.TRANSITION_DURATION):a(),this.hoverState=null,this};d.prototype.fixTitle=function(){var b=this.$element;(b.attr("title")||"string"!=typeof b.attr("data-original-title"))&&b.attr("data-original-title",b.attr("title")||"").attr("title","")};d.prototype.hasContent=function(){return this.getTitle()};d.prototype.getPosition=
function(b){b=b||this.$element;var a=b[0],c="BODY"==a.tagName,d=a.getBoundingClientRect();null==d.width&&(d=e.extend({},d,{width:d.right-d.left,height:d.bottom-d.top}));a=window.SVGElement&&a instanceof window.SVGElement;a=c?{top:0,left:0}:a?null:b.offset();b={scroll:c?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()};c=c?{width:e(window).width(),height:e(window).height()}:null;return e.extend({},d,b,c,a)};d.prototype.getCalculatedOffset=function(b,a,c,d){return"bottom"==
b?{top:a.top+a.height,left:a.left+a.width/2-c/2}:"top"==b?{top:a.top-d,left:a.left+a.width/2-c/2}:"left"==b?{top:a.top+a.height/2-d/2,left:a.left-c}:{top:a.top+a.height/2-d/2,left:a.left+a.width}};d.prototype.getViewportAdjustedDelta=function(b,a,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);/right|left/.test(b)?(c=a.top-f-g.scroll,a=a.top+f-g.scroll+d,c<g.top?e.top=g.top-c:a>g.top+g.height&&(e.top=
g.top+g.height-a)):(d=a.left-f,a=a.left+f+c,d<g.left?e.left=g.left-d:a>g.right&&(e.left=g.left+g.width-a));return e};d.prototype.getTitle=function(){var b=this.$element,a=this.options;return b.attr("data-original-title")||("function"==typeof a.title?a.title.call(b[0]):a.title)};d.prototype.getUID=function(b){do b+=~~(1E6*Math.random());while(document.getElementById(b));return b};d.prototype.tip=function(){if(!this.$tip&&(this.$tip=e(this.options.template),1!=this.$tip.length))throw Error(this.type+
" `template` option must consist of exactly 1 top-level element!");return this.$tip};d.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")};d.prototype.enable=function(){this.enabled=!0};d.prototype.disable=function(){this.enabled=!1};d.prototype.toggleEnabled=function(){this.enabled=!this.enabled};d.prototype.toggle=function(b){var a=this;b&&(a=e(b.currentTarget).data("bs."+this.type),a||(a=new this.constructor(b.currentTarget,this.getDelegateOptions()),e(b.currentTarget).data("bs."+
this.type,a)));b?(a.inState.click=!a.inState.click,a.isInStateTrue()?a.enter(a):a.leave(a)):a.tip().hasClass("in")?a.leave(a):a.enter(a)};d.prototype.destroy=function(){var b=this;clearTimeout(this.timeout);this.hide(function(){b.$element.off("."+b.type).removeData("bs."+b.type);b.$tip&&b.$tip.detach();b.$tip=null;b.$arrow=null;b.$viewport=null;b.$element=null})};var n=e.fn.tooltip;e.fn.tooltip=function(b){return this.each(function(){var a=e(this),c=a.data("bs.tooltip"),f="object"==typeof b&&b;if(c||
!/destroy|hide/.test(b))if(c||a.data("bs.tooltip",c=new d(this,f)),"string"==typeof b)c[b]()})};e.fn.tooltip.Constructor=d;e.fn.tooltip.noConflict=function(){e.fn.tooltip=n;return this}})(jQuery);

/* Quatro Digital Amazing Menu */
var _0xa747=['join','error','warn','qdAmAddNdx','each','qd-am-li-','addClass','qd-am-first','last','vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','charCodeAt','toUpperCase','ite','---','erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','html','img[alt=\x27','attr','length','.box-banner','clone','insertBefore','qd-am-content-loaded','text','trim','data-qdam-value','[class*=\x27colunas\x27]','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','li\x20>ul','qd-am-has-ul','children','first','replaceSpecialChars','>li','qd-amazing-menu','>ul','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','qd-am-','-li','callback','QuatroDigital.am.callback','extend','exec','.qd_amazing_menu_auto','getParent','closest','QD_amazingMenu','object','undefined','info','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','apply'];(function(_0x22a95b,_0x5d5fd0){var _0x15e582=function(_0x25efa5){while(--_0x25efa5){_0x22a95b['push'](_0x22a95b['shift']());}};_0x15e582(++_0x5d5fd0);}(_0xa747,0x170));var _0x7a74=function(_0x39d697,_0x144575){_0x39d697=_0x39d697-0x0;var _0x98ded6=_0xa747[_0x39d697];return _0x98ded6;};(function(_0x2085ca){_0x2085ca['fn'][_0x7a74('0x0')]=_0x2085ca['fn'][_0x7a74('0x1')];}(jQuery));(function(_0x122000){var _0x2185e4;var _0x5fa216=jQuery;if('function'!==typeof _0x5fa216['fn'][_0x7a74('0x2')]){var _0x165315={'url':'/qd-amazing-menu','callback':function(){},'ajaxCallback':function(){}};var _0x4c95c1=function(_0x112e9c,_0x483a80){if(_0x7a74('0x3')===typeof console&&_0x7a74('0x4')!==typeof console['error']&&'undefined'!==typeof console[_0x7a74('0x5')]&&_0x7a74('0x4')!==typeof console['warn']){var _0x42f103;'object'===typeof _0x112e9c?(_0x112e9c[_0x7a74('0x6')](_0x7a74('0x7')),_0x42f103=_0x112e9c):_0x42f103=[_0x7a74('0x7')+_0x112e9c];if(_0x7a74('0x4')===typeof _0x483a80||_0x7a74('0x8')!==_0x483a80[_0x7a74('0x9')]()&&_0x7a74('0xa')!==_0x483a80['toLowerCase']())if('undefined'!==typeof _0x483a80&&_0x7a74('0x5')===_0x483a80['toLowerCase']())try{console[_0x7a74('0x5')][_0x7a74('0xb')](console,_0x42f103);}catch(_0x2a5ccb){try{console[_0x7a74('0x5')](_0x42f103[_0x7a74('0xc')]('\x0a'));}catch(_0x23af7e){}}else try{console[_0x7a74('0xd')][_0x7a74('0xb')](console,_0x42f103);}catch(_0x72e513){try{console[_0x7a74('0xd')](_0x42f103[_0x7a74('0xc')]('\x0a'));}catch(_0x3bbb43){}}else try{console[_0x7a74('0xe')]['apply'](console,_0x42f103);}catch(_0x5a6def){try{console[_0x7a74('0xe')](_0x42f103[_0x7a74('0xc')]('\x0a'));}catch(_0x35cec2){}}}};_0x5fa216['fn'][_0x7a74('0xf')]=function(){var _0x788043=_0x5fa216(this);_0x788043[_0x7a74('0x10')](function(_0x3fc020){_0x5fa216(this)['addClass'](_0x7a74('0x11')+_0x3fc020);});_0x788043['first']()[_0x7a74('0x12')](_0x7a74('0x13'));_0x788043[_0x7a74('0x14')]()[_0x7a74('0x12')]('qd-am-last');return _0x788043;};_0x5fa216['fn'][_0x7a74('0x2')]=function(){};_0x122000=function(_0x284c29){var _0x3dad22={'i':_0x7a74('0x15')};return function(_0x362877){var _0x33b4fb=function(_0x5659e2){return _0x5659e2;};var _0x5f2003=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x362877=_0x362877['d'+_0x5f2003[0x10]+'c'+_0x5f2003[0x11]+'m'+_0x33b4fb(_0x5f2003[0x1])+'n'+_0x5f2003[0xd]]['l'+_0x5f2003[0x12]+'c'+_0x5f2003[0x0]+'ti'+_0x33b4fb('o')+'n'];var _0x5333b6=function(_0x1ebb69){return escape(encodeURIComponent(_0x1ebb69[_0x7a74('0x16')](/\./g,'¨')[_0x7a74('0x16')](/[a-zA-Z]/g,function(_0xffef5a){return String['fromCharCode'](('Z'>=_0xffef5a?0x5a:0x7a)>=(_0xffef5a=_0xffef5a[_0x7a74('0x17')](0x0)+0xd)?_0xffef5a:_0xffef5a-0x1a);})));};var _0x3cb10d=_0x5333b6(_0x362877[[_0x5f2003[0x9],_0x33b4fb('o'),_0x5f2003[0xc],_0x5f2003[_0x33b4fb(0xd)]][_0x7a74('0xc')]('')]);_0x5333b6=_0x5333b6((window[['js',_0x33b4fb('no'),'m',_0x5f2003[0x1],_0x5f2003[0x4][_0x7a74('0x18')](),_0x7a74('0x19')][_0x7a74('0xc')]('')]||_0x7a74('0x1a'))+['.v',_0x5f2003[0xd],'e',_0x33b4fb('x'),'co',_0x33b4fb('mm'),_0x7a74('0x1b'),_0x5f2003[0x1],'.c',_0x33b4fb('o'),'m.',_0x5f2003[0x13],'r']['join'](''));for(var _0x7b1d4d in _0x3dad22){if(_0x5333b6===_0x7b1d4d+_0x3dad22[_0x7b1d4d]||_0x3cb10d===_0x7b1d4d+_0x3dad22[_0x7b1d4d]){var _0x57bcb8='tr'+_0x5f2003[0x11]+'e';break;}_0x57bcb8='f'+_0x5f2003[0x0]+'ls'+_0x33b4fb(_0x5f2003[0x1])+'';}_0x33b4fb=!0x1;-0x1<_0x362877[[_0x5f2003[0xc],'e',_0x5f2003[0x0],'rc',_0x5f2003[0x9]][_0x7a74('0xc')]('')][_0x7a74('0x1c')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x33b4fb=!0x0);return[_0x57bcb8,_0x33b4fb];}(_0x284c29);}(window);if(!eval(_0x122000[0x0]))return _0x122000[0x1]?_0x4c95c1(_0x7a74('0x1d')):!0x1;var _0x4745ab=function(_0x4e6e5a){var _0x49c126=_0x4e6e5a[_0x7a74('0x1e')](_0x7a74('0x1f'));var _0x984500=_0x49c126[_0x7a74('0x20')](_0x7a74('0x21'));var _0x294708=_0x49c126['filter'](_0x7a74('0x22'));if(_0x984500['length']||_0x294708['length'])_0x984500[_0x7a74('0x23')]()[_0x7a74('0x12')](_0x7a74('0x24')),_0x294708[_0x7a74('0x23')]()[_0x7a74('0x12')](_0x7a74('0x25')),_0x5fa216[_0x7a74('0x26')]({'url':_0x2185e4['url'],'dataType':_0x7a74('0x27'),'success':function(_0x3c7477){var _0x4bca28=_0x5fa216(_0x3c7477);_0x984500[_0x7a74('0x10')](function(){var _0x3c7477=_0x5fa216(this);var _0x43e720=_0x4bca28[_0x7a74('0x1e')](_0x7a74('0x28')+_0x3c7477[_0x7a74('0x29')]('data-qdam-value')+'\x27]');_0x43e720[_0x7a74('0x2a')]&&(_0x43e720[_0x7a74('0x10')](function(){_0x5fa216(this)[_0x7a74('0x0')](_0x7a74('0x2b'))[_0x7a74('0x2c')]()[_0x7a74('0x2d')](_0x3c7477);}),_0x3c7477['hide']());})[_0x7a74('0x12')](_0x7a74('0x2e'));_0x294708['each'](function(){var _0x3c7477={};var _0x5a3d2d=_0x5fa216(this);_0x4bca28[_0x7a74('0x1e')]('h2')[_0x7a74('0x10')](function(){if(_0x5fa216(this)[_0x7a74('0x2f')]()[_0x7a74('0x30')]()[_0x7a74('0x9')]()==_0x5a3d2d[_0x7a74('0x29')](_0x7a74('0x31'))[_0x7a74('0x30')]()[_0x7a74('0x9')]())return _0x3c7477=_0x5fa216(this),!0x1;});_0x3c7477['length']&&(_0x3c7477[_0x7a74('0x10')](function(){_0x5fa216(this)['getParent'](_0x7a74('0x32'))[_0x7a74('0x2c')]()[_0x7a74('0x2d')](_0x5a3d2d);}),_0x5a3d2d['hide']());})[_0x7a74('0x12')](_0x7a74('0x2e'));},'error':function(){_0x4c95c1(_0x7a74('0x33')+_0x2185e4['url']+_0x7a74('0x34'));},'complete':function(){_0x2185e4[_0x7a74('0x35')][_0x7a74('0x36')](this);_0x5fa216(window)[_0x7a74('0x37')](_0x7a74('0x38'),_0x4e6e5a);},'clearQueueDelay':0xbb8});};_0x5fa216[_0x7a74('0x2')]=function(_0x430c2d){var _0x5e41f0=_0x430c2d[_0x7a74('0x1e')](_0x7a74('0x39'))[_0x7a74('0x10')](function(){var _0x2a9aec=_0x5fa216(this);if(!_0x2a9aec[_0x7a74('0x2a')])return _0x4c95c1(['UL\x20do\x20menu\x20não\x20encontrada',_0x430c2d],_0x7a74('0x8'));_0x2a9aec[_0x7a74('0x1e')](_0x7a74('0x3a'))['parent']()[_0x7a74('0x12')](_0x7a74('0x3b'));_0x2a9aec[_0x7a74('0x1e')]('li')[_0x7a74('0x10')](function(){var _0x478bd=_0x5fa216(this);var _0x2ebef2=_0x478bd[_0x7a74('0x3c')](':not(ul)');_0x2ebef2[_0x7a74('0x2a')]&&_0x478bd['addClass']('qd-am-elem-'+_0x2ebef2[_0x7a74('0x3d')]()[_0x7a74('0x2f')]()['trim']()[_0x7a74('0x3e')]()['replace'](/\./g,'')[_0x7a74('0x16')](/\s/g,'-')[_0x7a74('0x9')]());});var _0xc60038=_0x2a9aec[_0x7a74('0x1e')](_0x7a74('0x3f'))['qdAmAddNdx']();_0x2a9aec[_0x7a74('0x12')](_0x7a74('0x40'));_0xc60038=_0xc60038[_0x7a74('0x1e')](_0x7a74('0x41'));_0xc60038[_0x7a74('0x10')](function(){var _0x2968fd=_0x5fa216(this);_0x2968fd[_0x7a74('0x1e')](_0x7a74('0x3f'))['qdAmAddNdx']()[_0x7a74('0x12')]('qd-am-column');_0x2968fd['addClass'](_0x7a74('0x42'));_0x2968fd[_0x7a74('0x23')]()['addClass'](_0x7a74('0x43'));});_0xc60038[_0x7a74('0x12')]('qd-am-dropdown');var _0x46b8cb=0x0,_0x122000=function(_0x5d46d2){_0x46b8cb+=0x1;_0x5d46d2=_0x5d46d2[_0x7a74('0x3c')]('li')['children']('*');_0x5d46d2[_0x7a74('0x2a')]&&(_0x5d46d2[_0x7a74('0x12')](_0x7a74('0x44')+_0x46b8cb),_0x122000(_0x5d46d2));};_0x122000(_0x2a9aec);_0x2a9aec['add'](_0x2a9aec[_0x7a74('0x1e')]('ul'))[_0x7a74('0x10')](function(){var _0xe6fb1e=_0x5fa216(this);_0xe6fb1e[_0x7a74('0x12')](_0x7a74('0x45')+_0xe6fb1e['children']('li')[_0x7a74('0x2a')]+_0x7a74('0x46'));});});_0x4745ab(_0x5e41f0);_0x2185e4[_0x7a74('0x47')]['call'](this);_0x5fa216(window)[_0x7a74('0x37')](_0x7a74('0x48'),_0x430c2d);};_0x5fa216['fn'][_0x7a74('0x2')]=function(_0x2ea590){var _0x3d8885=_0x5fa216(this);if(!_0x3d8885['length'])return _0x3d8885;_0x2185e4=_0x5fa216[_0x7a74('0x49')]({},_0x165315,_0x2ea590);_0x3d8885[_0x7a74('0x4a')]=new _0x5fa216[(_0x7a74('0x2'))](_0x5fa216(this));return _0x3d8885;};_0x5fa216(function(){_0x5fa216(_0x7a74('0x4b'))[_0x7a74('0x2')]();});}}(this));
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
/* Quatro Digital Smart Cart */
var _0xdeba=['.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20input','val','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','cartIsEmpty','mouseleave.qd_ddc_hover','texts','#value','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','.qd-ddc-viewCart','linkCart','.qd_ddc_continueShopping','.qd-ddc-checkout','.qd-ddc-infoTotal','shippingForm','.qd-ddc-emptyCart\x20p','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','.qd-ddc-infoAllTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','.qd-ddc-wrapper','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','.qd-ddc-prodRow','qd-ddc-noItems','empty','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','availability','.qd-ddc-prodName','sellingPrice','Grátis','meta[name=currency]','insertProdImg','.qd-ddc-image','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','message','actionButtons','lastSku','[data-sku=\x27','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','qd-loaded','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','click.qd_ddc_more','qd-loading','.qd-ddc-quantity','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','.qd-ddc-remove','click.qd_ddc_remove','removeProduct','stop','remove','$1-$2$3','qdDdcLastPostalCode','calculateShipping','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','index','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','allowRecalculate','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd_bap_wrapper_content','QD_smartCart','dropDown','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','replace','undefined','pow','round','toFixed','length','join','function','prototype','trim','capitalize','charAt','slice','toLowerCase','qdAjaxQueue','jquery','error','qdAjax','extend','GET','data','url','jqXHR','ajax','success','fail','always','complete','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','version','4.0','closest','simpleCart','checkout','getOrderForm','call','QuatroDigital_simpleCart','object','alerta','[Simple\x20Cart]\x0a','info','elements','QD_simpleCart','.qd_cart_qtt','.qd_cart_total','.qd_items_text','attr','content','each','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','Shipping','value','total','shipping','currencySymbol','allTotal','qtt','items','quantity','callback','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','hide','filter','.singular','show','.plural','addClass','qd-emptyCart','removeClass','O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','cartTotalE','html','cartQttE','itemsTextE','find','cartTotal','itemsText','emptyElem','emptyCart','qd-sc-populated','_QuatroDigital_DropDown','vtexjs','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','QD_checkoutQueue','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','trigger','simpleCartCallback.quatro_digital','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','bind','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','Oooops!\x20','warn','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','add','done','Callbacks','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','apply','.productInformationWrapper\x20\x20a.buy-button','input.buy-in-page-quantity','javascript:','.productQuickView','location','body','#produto,\x20.produto','QD_buyButton','isSmartCheckout','qd-bb-click-active','click.qd_bb_buy_sc','allowBuyClick','clickBuySmartCheckout','preventDefault','Método\x20descontinuado!','buyButton','.qd-sbb-on','qd-sbb-on','.btn-add-buy-button-asynchronous','.remove-href','qd-bb-active','children','.qd-bb-productAdded','append','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','isProductPage','selector','_Quatro_Digital_dropDown','prodAdd','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','[href=\x27','href','qd-bb-itemAddBuyButtonWrapper','qd-bb-itemAddCartWrapper','timeRemoveNewItemClass','getCartInfoByUrl','allowUpdate','autoWatchBuyButton','mouseenter.qd_bb_buy_sc','unbind','click','load','indexOf','?redirect=false&','execDefaultAction','redirect=false','redirect=true','queue','test','push','productPageCallback','buyButtonClickCallback','split','ku=','pop','shift','asyncCallback','productAddedToCart','fakeRequest','parent','_QuatroDigital_prodBuyCallback','Callback\x20não\x20é\x20uma\x20função','.qd-bb-itemAddWrapper','prepend','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','QuatroDigital.qd_bb_prod_add','ajaxSend','/checkout/cart/add','match','ajaxStop','abs','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','aviso','QD_dropDownCart','fromCharCode','charCodeAt','toUpperCase','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','skuName','name','smartCheckout','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','off','keyup.qd_ddc_closeFn'];(function(_0x32a527,_0x384542){var _0x28ab49=function(_0x5b4234){while(--_0x5b4234){_0x32a527['push'](_0x32a527['shift']());}};_0x28ab49(++_0x384542);}(_0xdeba,0x1bc));var _0xadeb=function(_0x402ae8,_0x575126){_0x402ae8=_0x402ae8-0x0;var _0x4aa93c=_0xdeba[_0x402ae8];return _0x4aa93c;};(function(_0x2a1e66){_0x2a1e66['fn'][_0xadeb('0x0')]=_0x2a1e66['fn']['closest'];}(jQuery));function qd_number_format(_0x5a808a,_0x191e1d,_0xba467d,_0x225daf){_0x5a808a=(_0x5a808a+'')[_0xadeb('0x1')](/[^0-9+\-Ee.]/g,'');_0x5a808a=isFinite(+_0x5a808a)?+_0x5a808a:0x0;_0x191e1d=isFinite(+_0x191e1d)?Math['abs'](_0x191e1d):0x0;_0x225daf=_0xadeb('0x2')===typeof _0x225daf?',':_0x225daf;_0xba467d='undefined'===typeof _0xba467d?'.':_0xba467d;var _0x3f4d35='',_0x3f4d35=function(_0x217132,_0x4d0f3c){var _0x191e1d=Math[_0xadeb('0x3')](0xa,_0x4d0f3c);return''+(Math[_0xadeb('0x4')](_0x217132*_0x191e1d)/_0x191e1d)[_0xadeb('0x5')](_0x4d0f3c);},_0x3f4d35=(_0x191e1d?_0x3f4d35(_0x5a808a,_0x191e1d):''+Math['round'](_0x5a808a))['split']('.');0x3<_0x3f4d35[0x0][_0xadeb('0x6')]&&(_0x3f4d35[0x0]=_0x3f4d35[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x225daf));(_0x3f4d35[0x1]||'')[_0xadeb('0x6')]<_0x191e1d&&(_0x3f4d35[0x1]=_0x3f4d35[0x1]||'',_0x3f4d35[0x1]+=Array(_0x191e1d-_0x3f4d35[0x1][_0xadeb('0x6')]+0x1)[_0xadeb('0x7')]('0'));return _0x3f4d35['join'](_0xba467d);};_0xadeb('0x8')!==typeof String[_0xadeb('0x9')][_0xadeb('0xa')]&&(String[_0xadeb('0x9')][_0xadeb('0xa')]=function(){return this['replace'](/^\s+|\s+$/g,'');});_0xadeb('0x8')!=typeof String[_0xadeb('0x9')][_0xadeb('0xb')]&&(String[_0xadeb('0x9')][_0xadeb('0xb')]=function(){return this[_0xadeb('0xc')](0x0)['toUpperCase']()+this[_0xadeb('0xd')](0x1)[_0xadeb('0xe')]();});(function(_0x499ed4){if('function'!==typeof _0x499ed4['qdAjax']){var _0x2e08b7={};_0x499ed4[_0xadeb('0xf')]=_0x2e08b7;0x96>parseInt((_0x499ed4['fn'][_0xadeb('0x10')][_0xadeb('0x1')](/[^0-9]+/g,'')+'000')['slice'](0x0,0x3),0xa)&&console&&_0xadeb('0x8')==typeof console['error']&&console[_0xadeb('0x11')]();_0x499ed4[_0xadeb('0x12')]=function(_0x13234f){try{var _0x10fb55=_0x499ed4[_0xadeb('0x13')]({},{'url':'','type':_0xadeb('0x14'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x13234f);var _0x164ec9='object'===typeof _0x10fb55[_0xadeb('0x15')]?JSON['stringify'](_0x10fb55[_0xadeb('0x15')]):_0x10fb55[_0xadeb('0x15')]['toString']();var _0x568ac3=encodeURIComponent(_0x10fb55[_0xadeb('0x16')]+'|'+_0x10fb55['type']+'|'+_0x164ec9);_0x2e08b7[_0x568ac3]=_0x2e08b7[_0x568ac3]||{};_0xadeb('0x2')==typeof _0x2e08b7[_0x568ac3][_0xadeb('0x17')]?_0x2e08b7[_0x568ac3][_0xadeb('0x17')]=_0x499ed4[_0xadeb('0x18')](_0x10fb55):(_0x2e08b7[_0x568ac3][_0xadeb('0x17')]['done'](_0x10fb55[_0xadeb('0x19')]),_0x2e08b7[_0x568ac3][_0xadeb('0x17')][_0xadeb('0x1a')](_0x10fb55['error']),_0x2e08b7[_0x568ac3][_0xadeb('0x17')][_0xadeb('0x1b')](_0x10fb55[_0xadeb('0x1c')]));_0x2e08b7[_0x568ac3][_0xadeb('0x17')][_0xadeb('0x1b')](function(){isNaN(parseInt(_0x10fb55[_0xadeb('0x1d')]))||setTimeout(function(){_0x2e08b7[_0x568ac3][_0xadeb('0x17')]=void 0x0;},_0x10fb55[_0xadeb('0x1d')]);});return _0x2e08b7[_0x568ac3][_0xadeb('0x17')];}catch(_0x28ef32){'undefined'!==typeof console&&'function'===typeof console['error']&&console[_0xadeb('0x11')](_0xadeb('0x1e')+_0x28ef32['message']);}};_0x499ed4[_0xadeb('0x12')][_0xadeb('0x1f')]=_0xadeb('0x20');}}(jQuery));(function(_0x16e9e4){_0x16e9e4['fn']['getParent']=_0x16e9e4['fn'][_0xadeb('0x21')];}(jQuery));(function(){var _0x317f95=jQuery;if(_0xadeb('0x8')!==typeof _0x317f95['fn'][_0xadeb('0x22')]){_0x317f95(function(){var _0x2fcb26=vtexjs[_0xadeb('0x23')]['getOrderForm'];vtexjs[_0xadeb('0x23')][_0xadeb('0x24')]=function(){return _0x2fcb26[_0xadeb('0x25')]();};});try{window[_0xadeb('0x26')]=window[_0xadeb('0x26')]||{};window[_0xadeb('0x26')]['ajaxStopOn']=!0x1;_0x317f95['fn'][_0xadeb('0x22')]=function(_0x5f282d,_0x5e0fbc,_0x518b36){var _0x4fe190=function(_0x2d245e,_0x175dbb){if(_0xadeb('0x27')===typeof console){var _0x291a07=_0xadeb('0x27')===typeof _0x2d245e;'undefined'!==typeof _0x175dbb&&_0xadeb('0x28')===_0x175dbb['toLowerCase']()?_0x291a07?console['warn'](_0xadeb('0x29'),_0x2d245e[0x0],_0x2d245e[0x1],_0x2d245e[0x2],_0x2d245e[0x3],_0x2d245e[0x4],_0x2d245e[0x5],_0x2d245e[0x6],_0x2d245e[0x7]):console['warn']('[Simple\x20Cart]\x0a'+_0x2d245e):_0xadeb('0x2')!==typeof _0x175dbb&&_0xadeb('0x2a')===_0x175dbb[_0xadeb('0xe')]()?_0x291a07?console['info'](_0xadeb('0x29'),_0x2d245e[0x0],_0x2d245e[0x1],_0x2d245e[0x2],_0x2d245e[0x3],_0x2d245e[0x4],_0x2d245e[0x5],_0x2d245e[0x6],_0x2d245e[0x7]):console[_0xadeb('0x2a')](_0xadeb('0x29')+_0x2d245e):_0x291a07?console[_0xadeb('0x11')](_0xadeb('0x29'),_0x2d245e[0x0],_0x2d245e[0x1],_0x2d245e[0x2],_0x2d245e[0x3],_0x2d245e[0x4],_0x2d245e[0x5],_0x2d245e[0x6],_0x2d245e[0x7]):console['error']('[Simple\x20Cart]\x0a'+_0x2d245e);}};var _0x48a6d3=_0x317f95(this);'object'===typeof _0x5f282d?_0x5e0fbc=_0x5f282d:(_0x5f282d=_0x5f282d||!0x1,_0x48a6d3=_0x48a6d3['add'](_0x317f95['QD_simpleCart'][_0xadeb('0x2b')]));if(!_0x48a6d3[_0xadeb('0x6')])return _0x48a6d3;_0x317f95[_0xadeb('0x2c')][_0xadeb('0x2b')]=_0x317f95['QD_simpleCart'][_0xadeb('0x2b')]['add'](_0x48a6d3);_0x518b36=_0xadeb('0x2')===typeof _0x518b36?!0x1:_0x518b36;var _0x35e155={'cartQtt':_0xadeb('0x2d'),'cartTotal':_0xadeb('0x2e'),'itemsText':_0xadeb('0x2f'),'currencySymbol':(_0x317f95('meta[name=currency]')[_0xadeb('0x30')](_0xadeb('0x31'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x55486b=_0x317f95[_0xadeb('0x13')]({},_0x35e155,_0x5e0fbc);var _0x32c986=_0x317f95('');_0x48a6d3[_0xadeb('0x32')](function(){var _0x252297=_0x317f95(this);_0x252297[_0xadeb('0x15')](_0xadeb('0x33'))||_0x252297[_0xadeb('0x15')]('qd_simpleCartOpts',_0x55486b);});var _0x7db174=function(_0x26e0d){window['_QuatroDigital_CartData']=window[_0xadeb('0x34')]||{};for(var _0x5f282d=0x0,_0x391d4f=0x0,_0x15e8d2=0x0;_0x15e8d2<_0x26e0d[_0xadeb('0x35')][_0xadeb('0x6')];_0x15e8d2++)_0xadeb('0x36')==_0x26e0d['totalizers'][_0x15e8d2]['id']&&(_0x391d4f+=_0x26e0d['totalizers'][_0x15e8d2][_0xadeb('0x37')]),_0x5f282d+=_0x26e0d[_0xadeb('0x35')][_0x15e8d2][_0xadeb('0x37')];window[_0xadeb('0x34')][_0xadeb('0x38')]=_0x55486b['currencySymbol']+qd_number_format(_0x5f282d/0x64,0x2,',','.');window[_0xadeb('0x34')][_0xadeb('0x39')]=_0x55486b[_0xadeb('0x3a')]+qd_number_format(_0x391d4f/0x64,0x2,',','.');window[_0xadeb('0x34')][_0xadeb('0x3b')]=_0x55486b[_0xadeb('0x3a')]+qd_number_format((_0x5f282d+_0x391d4f)/0x64,0x2,',','.');window[_0xadeb('0x34')][_0xadeb('0x3c')]=0x0;if(_0x55486b['showQuantityByItems'])for(_0x15e8d2=0x0;_0x15e8d2<_0x26e0d[_0xadeb('0x3d')][_0xadeb('0x6')];_0x15e8d2++)window[_0xadeb('0x34')][_0xadeb('0x3c')]+=_0x26e0d[_0xadeb('0x3d')][_0x15e8d2][_0xadeb('0x3e')];else window[_0xadeb('0x34')][_0xadeb('0x3c')]=_0x26e0d[_0xadeb('0x3d')][_0xadeb('0x6')]||0x0;try{window[_0xadeb('0x34')][_0xadeb('0x3f')]&&window[_0xadeb('0x34')]['callback'][_0xadeb('0x40')]&&window[_0xadeb('0x34')][_0xadeb('0x3f')][_0xadeb('0x40')]();}catch(_0x12cd46){_0x4fe190(_0xadeb('0x41'));}_0x355744(_0x32c986);};var _0x29793d=function(_0x3f4987,_0x665f56){0x1===_0x3f4987?_0x665f56[_0xadeb('0x42')]()[_0xadeb('0x43')](_0xadeb('0x44'))[_0xadeb('0x45')]():_0x665f56[_0xadeb('0x42')]()[_0xadeb('0x43')](_0xadeb('0x46'))['show']();};var _0x6482c8=function(_0x33014d){0x1>_0x33014d?_0x48a6d3[_0xadeb('0x47')](_0xadeb('0x48')):_0x48a6d3[_0xadeb('0x49')](_0xadeb('0x48'));};var _0x5ab2be=function(_0x10a267,_0x2407f5){var _0x409fc8=parseInt(window[_0xadeb('0x34')][_0xadeb('0x3c')],0xa);_0x2407f5['$this']['show']();isNaN(_0x409fc8)&&(_0x4fe190(_0xadeb('0x4a'),_0xadeb('0x28')),_0x409fc8=0x0);_0x2407f5[_0xadeb('0x4b')][_0xadeb('0x4c')](window[_0xadeb('0x34')][_0xadeb('0x38')]);_0x2407f5[_0xadeb('0x4d')]['html'](_0x409fc8);_0x29793d(_0x409fc8,_0x2407f5[_0xadeb('0x4e')]);_0x6482c8(_0x409fc8);};var _0x355744=function(_0x1135b7){_0x48a6d3[_0xadeb('0x32')](function(){var _0x4dd7c5={};var _0x17b365=_0x317f95(this);_0x5f282d&&_0x17b365[_0xadeb('0x15')](_0xadeb('0x33'))&&_0x317f95[_0xadeb('0x13')](_0x55486b,_0x17b365['data'](_0xadeb('0x33')));_0x4dd7c5['$this']=_0x17b365;_0x4dd7c5[_0xadeb('0x4d')]=_0x17b365[_0xadeb('0x4f')](_0x55486b['cartQtt'])||_0x32c986;_0x4dd7c5[_0xadeb('0x4b')]=_0x17b365['find'](_0x55486b[_0xadeb('0x50')])||_0x32c986;_0x4dd7c5['itemsTextE']=_0x17b365['find'](_0x55486b[_0xadeb('0x51')])||_0x32c986;_0x4dd7c5[_0xadeb('0x52')]=_0x17b365[_0xadeb('0x4f')](_0x55486b[_0xadeb('0x53')])||_0x32c986;_0x5ab2be(_0x1135b7,_0x4dd7c5);_0x17b365[_0xadeb('0x47')](_0xadeb('0x54'));});};(function(){if(_0x55486b['smartCheckout']){window[_0xadeb('0x55')]=window['_QuatroDigital_DropDown']||{};if(_0xadeb('0x2')!==typeof window[_0xadeb('0x55')][_0xadeb('0x24')]&&(_0x518b36||!_0x5f282d))return _0x7db174(window[_0xadeb('0x55')][_0xadeb('0x24')]);if('object'!==typeof window['vtexjs']||_0xadeb('0x2')===typeof window[_0xadeb('0x56')][_0xadeb('0x23')])if(_0xadeb('0x27')===typeof vtex&&_0xadeb('0x27')===typeof vtex['checkout']&&_0xadeb('0x2')!==typeof vtex[_0xadeb('0x23')][_0xadeb('0x57')])new vtex[(_0xadeb('0x23'))][(_0xadeb('0x57'))]();else return _0x4fe190(_0xadeb('0x58'));_0x317f95[_0xadeb('0x59')](['items',_0xadeb('0x35'),_0xadeb('0x5a')],{'done':function(_0xdafddd){_0x7db174(_0xdafddd);window[_0xadeb('0x55')][_0xadeb('0x24')]=_0xdafddd;},'fail':function(_0x1123c6){_0x4fe190([_0xadeb('0x5b'),_0x1123c6]);}});}else alert(_0xadeb('0x5c'));}());_0x55486b[_0xadeb('0x3f')]();_0x317f95(window)[_0xadeb('0x5d')](_0xadeb('0x5e'));return _0x48a6d3;};_0x317f95[_0xadeb('0x2c')]={'elements':_0x317f95('')};_0x317f95(function(){var _0x54ddb1;'function'===typeof window[_0xadeb('0x5f')]&&(_0x54ddb1=window[_0xadeb('0x5f')],window[_0xadeb('0x5f')]=function(_0x33709e,_0x1ea8db,_0x2ce7de,_0x272c47,_0x24f16f){_0x54ddb1[_0xadeb('0x25')](this,_0x33709e,_0x1ea8db,_0x2ce7de,_0x272c47,function(){_0xadeb('0x8')===typeof _0x24f16f&&_0x24f16f();_0x317f95[_0xadeb('0x2c')]['elements'][_0xadeb('0x32')](function(){var _0x2c5c7a=_0x317f95(this);_0x2c5c7a[_0xadeb('0x22')](_0x2c5c7a['data'](_0xadeb('0x33')));});});});});var _0x110bda=window[_0xadeb('0x60')]||void 0x0;window[_0xadeb('0x60')]=function(_0x3adbee){_0x317f95['fn'][_0xadeb('0x22')](!0x0);_0xadeb('0x8')===typeof _0x110bda?_0x110bda['call'](this,_0x3adbee):alert(_0x3adbee);};_0x317f95(function(){var _0x509c09=_0x317f95('.qd_cart_auto');_0x509c09[_0xadeb('0x6')]&&_0x509c09[_0xadeb('0x22')]();});_0x317f95(function(){_0x317f95(window)[_0xadeb('0x61')](_0xadeb('0x62'),function(){_0x317f95['fn'][_0xadeb('0x22')](!0x0);});});}catch(_0x164ac7){_0xadeb('0x2')!==typeof console&&_0xadeb('0x8')===typeof console[_0xadeb('0x11')]&&console[_0xadeb('0x11')](_0xadeb('0x63'),_0x164ac7);}}}());(function(){var _0x1c7be6=function(_0x2bba04,_0x13063a){if(_0xadeb('0x27')===typeof console){var _0x145b1c='object'===typeof _0x2bba04;'undefined'!==typeof _0x13063a&&_0xadeb('0x28')===_0x13063a['toLowerCase']()?_0x145b1c?console[_0xadeb('0x64')](_0xadeb('0x65'),_0x2bba04[0x0],_0x2bba04[0x1],_0x2bba04[0x2],_0x2bba04[0x3],_0x2bba04[0x4],_0x2bba04[0x5],_0x2bba04[0x6],_0x2bba04[0x7]):console[_0xadeb('0x64')](_0xadeb('0x65')+_0x2bba04):_0xadeb('0x2')!==typeof _0x13063a&&_0xadeb('0x2a')===_0x13063a['toLowerCase']()?_0x145b1c?console[_0xadeb('0x2a')](_0xadeb('0x65'),_0x2bba04[0x0],_0x2bba04[0x1],_0x2bba04[0x2],_0x2bba04[0x3],_0x2bba04[0x4],_0x2bba04[0x5],_0x2bba04[0x6],_0x2bba04[0x7]):console[_0xadeb('0x2a')](_0xadeb('0x65')+_0x2bba04):_0x145b1c?console['error']('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x2bba04[0x0],_0x2bba04[0x1],_0x2bba04[0x2],_0x2bba04[0x3],_0x2bba04[0x4],_0x2bba04[0x5],_0x2bba04[0x6],_0x2bba04[0x7]):console[_0xadeb('0x11')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a'+_0x2bba04);}},_0x5e38c7=null,_0x6ced53={},_0x3f8e3e={},_0x379540={};$[_0xadeb('0x59')]=function(_0x117bd0,_0x3d6424){if(null===_0x5e38c7)if(_0xadeb('0x27')===typeof window[_0xadeb('0x56')]&&_0xadeb('0x2')!==typeof window[_0xadeb('0x56')][_0xadeb('0x23')])_0x5e38c7=window[_0xadeb('0x56')][_0xadeb('0x23')];else return _0x1c7be6(_0xadeb('0x66'));var _0x1591ef=$[_0xadeb('0x13')]({'done':function(){},'fail':function(){}},_0x3d6424),_0x57a40e=_0x117bd0[_0xadeb('0x7')](';'),_0x374bfd=function(){_0x6ced53[_0x57a40e][_0xadeb('0x67')](_0x1591ef[_0xadeb('0x68')]);_0x3f8e3e[_0x57a40e][_0xadeb('0x67')](_0x1591ef['fail']);};_0x379540[_0x57a40e]?_0x374bfd():(_0x6ced53[_0x57a40e]=$[_0xadeb('0x69')](),_0x3f8e3e[_0x57a40e]=$['Callbacks'](),_0x374bfd(),_0x379540[_0x57a40e]=!0x0,_0x5e38c7['getOrderForm'](_0x117bd0)[_0xadeb('0x68')](function(_0x1b67b1){_0x379540[_0x57a40e]=!0x1;_0x6ced53[_0x57a40e]['fire'](_0x1b67b1);})[_0xadeb('0x1a')](function(_0xf99f32){_0x379540[_0x57a40e]=!0x1;_0x3f8e3e[_0x57a40e][_0xadeb('0x40')](_0xf99f32);}));};}());(function(_0x5a9856){try{var _0x528a2f=jQuery,_0x3cdce5,_0x5af625=_0x528a2f({}),_0x35cdf9=function(_0x40cec5,_0x5af601){if(_0xadeb('0x27')===typeof console&&'undefined'!==typeof console[_0xadeb('0x11')]&&_0xadeb('0x2')!==typeof console[_0xadeb('0x2a')]&&_0xadeb('0x2')!==typeof console[_0xadeb('0x64')]){var _0x520f29;_0xadeb('0x27')===typeof _0x40cec5?(_0x40cec5[_0xadeb('0x6a')]('[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a'),_0x520f29=_0x40cec5):_0x520f29=[_0xadeb('0x6b')+_0x40cec5];if('undefined'===typeof _0x5af601||_0xadeb('0x28')!==_0x5af601[_0xadeb('0xe')]()&&'aviso'!==_0x5af601[_0xadeb('0xe')]())if('undefined'!==typeof _0x5af601&&_0xadeb('0x2a')===_0x5af601[_0xadeb('0xe')]())try{console[_0xadeb('0x2a')][_0xadeb('0x6c')](console,_0x520f29);}catch(_0x3e9d59){try{console['info'](_0x520f29[_0xadeb('0x7')]('\x0a'));}catch(_0x52809d){}}else try{console[_0xadeb('0x11')][_0xadeb('0x6c')](console,_0x520f29);}catch(_0x36ccca){try{console['error'](_0x520f29[_0xadeb('0x7')]('\x0a'));}catch(_0x30bd03){}}else try{console[_0xadeb('0x64')][_0xadeb('0x6c')](console,_0x520f29);}catch(_0x2e4319){try{console[_0xadeb('0x64')](_0x520f29[_0xadeb('0x7')]('\x0a'));}catch(_0x3527cb){}}}},_0x458a6a={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0xadeb('0x6d'),'buyQtt':_0xadeb('0x6e'),'selectSkuMsg':_0xadeb('0x6f'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x4b57dc,_0x9f4615,_0xd25b9c){_0x528a2f('body')['is'](_0xadeb('0x70'))&&(_0xadeb('0x19')===_0x9f4615?alert('Produto\x20adicionado\x20ao\x20carrinho!'):(alert('Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.'),('object'===typeof parent?parent:document)[_0xadeb('0x71')]['href']=_0xd25b9c));},'isProductPage':function(){return _0x528a2f(_0xadeb('0x72'))['is'](_0xadeb('0x73'));},'execDefaultAction':function(_0xe1c717){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x528a2f[_0xadeb('0x74')]=function(_0x31df2f,_0x382b34){function _0x13b8a3(_0x867b72){_0x3cdce5[_0xadeb('0x75')]?_0x867b72[_0xadeb('0x15')]('qd-bb-click-active')||(_0x867b72[_0xadeb('0x15')](_0xadeb('0x76'),0x1),_0x867b72['on'](_0xadeb('0x77'),function(_0x2e7591){if(!_0x3cdce5[_0xadeb('0x78')]())return!0x0;if(!0x0!==_0x4f7cd6[_0xadeb('0x79')][_0xadeb('0x25')](this))return _0x2e7591[_0xadeb('0x7a')](),!0x1;})):alert(_0xadeb('0x7b'));}function _0x5d96f1(_0x1c38f2){_0x1c38f2=_0x1c38f2||_0x528a2f(_0x3cdce5[_0xadeb('0x7c')]);_0x1c38f2[_0xadeb('0x32')](function(){var _0x1c38f2=_0x528a2f(this);_0x1c38f2['is'](_0xadeb('0x7d'))||(_0x1c38f2[_0xadeb('0x47')](_0xadeb('0x7e')),_0x1c38f2['is'](_0xadeb('0x7f'))&&!_0x1c38f2['is'](_0xadeb('0x80'))||_0x1c38f2[_0xadeb('0x15')]('qd-bb-active')||(_0x1c38f2[_0xadeb('0x15')](_0xadeb('0x81'),0x1),_0x1c38f2[_0xadeb('0x82')](_0xadeb('0x83'))[_0xadeb('0x6')]||_0x1c38f2[_0xadeb('0x84')](_0xadeb('0x85')),_0x1c38f2['is']('.buy-in-page-button')&&_0x3cdce5[_0xadeb('0x86')]()&&_0x49fd05['call'](_0x1c38f2),_0x13b8a3(_0x1c38f2)));});_0x3cdce5[_0xadeb('0x86')]()&&!_0x1c38f2[_0xadeb('0x6')]&&_0x35cdf9('Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27'+_0x1c38f2[_0xadeb('0x87')]+'\x27.',_0xadeb('0x2a'));}var _0x2ad931=_0x528a2f(_0x31df2f);var _0x4f7cd6=this;window[_0xadeb('0x88')]=window[_0xadeb('0x88')]||{};window[_0xadeb('0x34')]=window[_0xadeb('0x34')]||{};_0x4f7cd6[_0xadeb('0x89')]=function(_0x4716d8,_0x46223b){_0x2ad931[_0xadeb('0x47')](_0xadeb('0x8a'));_0x528a2f(_0xadeb('0x72'))[_0xadeb('0x47')](_0xadeb('0x8b'));var _0x531b6f=_0x528a2f(_0x3cdce5[_0xadeb('0x7c')])[_0xadeb('0x43')](_0xadeb('0x8c')+(_0x4716d8['attr'](_0xadeb('0x8d'))||'---')+'\x27]')[_0xadeb('0x67')](_0x4716d8);_0x531b6f['addClass'](_0xadeb('0x8e'));setTimeout(function(){_0x2ad931[_0xadeb('0x49')](_0xadeb('0x8f'));_0x531b6f['removeClass'](_0xadeb('0x8e'));},_0x3cdce5[_0xadeb('0x90')]);window[_0xadeb('0x88')][_0xadeb('0x24')]=void 0x0;if(_0xadeb('0x2')!==typeof _0x382b34&&_0xadeb('0x8')===typeof _0x382b34[_0xadeb('0x91')])return _0x3cdce5['isSmartCheckout']||(_0x35cdf9('função\x20descontinuada'),_0x382b34[_0xadeb('0x91')]()),window[_0xadeb('0x55')]['getOrderForm']=void 0x0,_0x382b34[_0xadeb('0x91')](function(_0x13cb5b){window[_0xadeb('0x88')][_0xadeb('0x24')]=_0x13cb5b;_0x528a2f['fn']['simpleCart'](!0x0,void 0x0,!0x0);},{'lastSku':_0x46223b});window['_Quatro_Digital_dropDown'][_0xadeb('0x92')]=!0x0;_0x528a2f['fn']['simpleCart'](!0x0);};(function(){if(_0x3cdce5['isSmartCheckout']&&_0x3cdce5[_0xadeb('0x93')]){var _0x382ed8=_0x528a2f('.btn-add-buy-button-asynchronous');_0x382ed8[_0xadeb('0x6')]&&_0x5d96f1(_0x382ed8);}}());var _0x49fd05=function(){var _0x3b70c5=_0x528a2f(this);_0xadeb('0x2')!==typeof _0x3b70c5[_0xadeb('0x15')](_0xadeb('0x7c'))?(_0x3b70c5['unbind']('click'),_0x13b8a3(_0x3b70c5)):(_0x3b70c5['bind'](_0xadeb('0x94'),function(_0x5507ec){_0x3b70c5[_0xadeb('0x95')](_0xadeb('0x96'));_0x13b8a3(_0x3b70c5);_0x528a2f(this)[_0xadeb('0x95')](_0x5507ec);}),_0x528a2f(window)[_0xadeb('0x97')](function(){_0x3b70c5[_0xadeb('0x95')](_0xadeb('0x96'));_0x13b8a3(_0x3b70c5);_0x3b70c5[_0xadeb('0x95')](_0xadeb('0x94'));}));};_0x4f7cd6['clickBuySmartCheckout']=function(){var _0x5e75a6=_0x528a2f(this),_0x31df2f=_0x5e75a6[_0xadeb('0x30')](_0xadeb('0x8d'))||'';if(-0x1<_0x31df2f[_0xadeb('0x98')](_0x3cdce5['selectSkuMsg']))return!0x0;_0x31df2f=_0x31df2f[_0xadeb('0x1')](/redirect\=(false|true)/gi,'')[_0xadeb('0x1')]('?',_0xadeb('0x99'))[_0xadeb('0x1')](/\&\&/gi,'&');if(_0x3cdce5[_0xadeb('0x9a')](_0x5e75a6))return _0x5e75a6[_0xadeb('0x30')](_0xadeb('0x8d'),_0x31df2f['replace'](_0xadeb('0x9b'),_0xadeb('0x9c'))),!0x0;_0x31df2f=_0x31df2f[_0xadeb('0x1')](/http.?:/i,'');_0x5af625[_0xadeb('0x9d')](function(_0xcbef01){if(!_0x3cdce5['buyIfQuantityZeroed']&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0xadeb('0x9e')](_0x31df2f))return _0xcbef01();var _0x141c4f=function(_0x29ae38,_0x2080a8){var _0x5d96f1=_0x31df2f['match'](/sku\=([0-9]+)/gi),_0x19c876=[];if(_0xadeb('0x27')===typeof _0x5d96f1&&null!==_0x5d96f1)for(var _0x9be037=_0x5d96f1[_0xadeb('0x6')]-0x1;0x0<=_0x9be037;_0x9be037--){var _0x128946=parseInt(_0x5d96f1[_0x9be037][_0xadeb('0x1')](/sku\=/gi,''));isNaN(_0x128946)||_0x19c876[_0xadeb('0x9f')](_0x128946);}_0x3cdce5[_0xadeb('0xa0')][_0xadeb('0x25')](this,_0x29ae38,_0x2080a8,_0x31df2f);_0x4f7cd6[_0xadeb('0xa1')]['call'](this,_0x29ae38,_0x2080a8,_0x31df2f,_0x19c876);_0x4f7cd6[_0xadeb('0x89')](_0x5e75a6,_0x31df2f[_0xadeb('0xa2')](_0xadeb('0xa3'))[_0xadeb('0xa4')]()[_0xadeb('0xa2')]('&')[_0xadeb('0xa5')]());_0xadeb('0x8')===typeof _0x3cdce5[_0xadeb('0xa6')]&&_0x3cdce5[_0xadeb('0xa6')][_0xadeb('0x25')](this);_0x528a2f(window)[_0xadeb('0x5d')](_0xadeb('0xa7'));_0x528a2f(window)['trigger']('cartProductAdded.vtex');};_0x3cdce5[_0xadeb('0xa8')]?(_0x141c4f(null,'success'),_0xcbef01()):_0x528a2f[_0xadeb('0x18')]({'url':_0x31df2f,'complete':_0x141c4f})['always'](function(){_0xcbef01();});});};_0x4f7cd6['buyButtonClickCallback']=function(_0x2385d4,_0x3ead1b,_0x200a62,_0x1fee61){try{_0xadeb('0x19')===_0x3ead1b&&_0xadeb('0x27')===typeof window[_0xadeb('0xa9')]&&_0xadeb('0x8')===typeof window[_0xadeb('0xa9')][_0xadeb('0xaa')]&&window[_0xadeb('0xa9')][_0xadeb('0xaa')](_0x2385d4,_0x3ead1b,_0x200a62,_0x1fee61);}catch(_0x38eb93){_0x35cdf9('Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.');}};_0x5d96f1();_0xadeb('0x8')===typeof _0x3cdce5[_0xadeb('0x3f')]?_0x3cdce5[_0xadeb('0x3f')]['call'](this):_0x35cdf9(_0xadeb('0xab'));};var _0x21d59e=_0x528a2f['Callbacks']();_0x528a2f['fn']['QD_buyButton']=function(_0x45f539,_0x51a7c3){var _0x5a9856=_0x528a2f(this);_0xadeb('0x2')!==typeof _0x51a7c3||_0xadeb('0x27')!==typeof _0x45f539||_0x45f539 instanceof _0x528a2f||(_0x51a7c3=_0x45f539,_0x45f539=void 0x0);_0x3cdce5=_0x528a2f[_0xadeb('0x13')]({},_0x458a6a,_0x51a7c3);var _0x41cd9d;_0x21d59e[_0xadeb('0x67')](function(){_0x5a9856[_0xadeb('0x82')](_0xadeb('0xac'))['length']||_0x5a9856[_0xadeb('0xad')](_0xadeb('0xae'));_0x41cd9d=new _0x528a2f['QD_buyButton'](_0x5a9856,_0x45f539);});_0x21d59e[_0xadeb('0x40')]();_0x528a2f(window)['on'](_0xadeb('0xaf'),function(_0x409610,_0x4aa91b,_0x33be64){_0x41cd9d['prodAdd'](_0x4aa91b,_0x33be64);});return _0x528a2f[_0xadeb('0x13')](_0x5a9856,_0x41cd9d);};var _0x2ab661=0x0;_0x528a2f(document)[_0xadeb('0xb0')](function(_0x186848,_0xe6e823,_0x286d7b){-0x1<_0x286d7b['url']['toLowerCase']()['indexOf'](_0xadeb('0xb1'))&&(_0x2ab661=(_0x286d7b[_0xadeb('0x16')][_0xadeb('0xb2')](/sku\=([0-9]+)/i)||[''])[_0xadeb('0xa4')]());});_0x528a2f(window)[_0xadeb('0x61')]('productAddedToCart.qdSbbVtex',function(){_0x528a2f(window)['trigger'](_0xadeb('0xaf'),[new _0x528a2f(),_0x2ab661]);});_0x528a2f(document)[_0xadeb('0xb3')](function(){_0x21d59e[_0xadeb('0x40')]();});}catch(_0xd5adb0){_0xadeb('0x2')!==typeof console&&_0xadeb('0x8')===typeof console['error']&&console[_0xadeb('0x11')]('Oooops!\x20',_0xd5adb0);}}(this));function qd_number_format(_0x22e89e,_0x37e0ea,_0x1e178c,_0x1e283c){_0x22e89e=(_0x22e89e+'')[_0xadeb('0x1')](/[^0-9+\-Ee.]/g,'');_0x22e89e=isFinite(+_0x22e89e)?+_0x22e89e:0x0;_0x37e0ea=isFinite(+_0x37e0ea)?Math[_0xadeb('0xb4')](_0x37e0ea):0x0;_0x1e283c='undefined'===typeof _0x1e283c?',':_0x1e283c;_0x1e178c='undefined'===typeof _0x1e178c?'.':_0x1e178c;var _0x407399='',_0x407399=function(_0x2a6605,_0x16c791){var _0x1c1f7d=Math[_0xadeb('0x3')](0xa,_0x16c791);return''+(Math[_0xadeb('0x4')](_0x2a6605*_0x1c1f7d)/_0x1c1f7d)['toFixed'](_0x16c791);},_0x407399=(_0x37e0ea?_0x407399(_0x22e89e,_0x37e0ea):''+Math['round'](_0x22e89e))[_0xadeb('0xa2')]('.');0x3<_0x407399[0x0][_0xadeb('0x6')]&&(_0x407399[0x0]=_0x407399[0x0][_0xadeb('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x1e283c));(_0x407399[0x1]||'')[_0xadeb('0x6')]<_0x37e0ea&&(_0x407399[0x1]=_0x407399[0x1]||'',_0x407399[0x1]+=Array(_0x37e0ea-_0x407399[0x1]['length']+0x1)['join']('0'));return _0x407399['join'](_0x1e178c);}(function(){try{window['_QuatroDigital_CartData']=window[_0xadeb('0x34')]||{},window[_0xadeb('0x34')]['callback']=window[_0xadeb('0x34')][_0xadeb('0x3f')]||$[_0xadeb('0x69')]();}catch(_0x5a5044){_0xadeb('0x2')!==typeof console&&_0xadeb('0x8')===typeof console['error']&&console[_0xadeb('0x11')](_0xadeb('0x63'),_0x5a5044['message']);}}());(function(_0x2de047){try{var _0x581180=jQuery,_0x567159=function(_0x10df11,_0x539772){if(_0xadeb('0x27')===typeof console&&_0xadeb('0x2')!==typeof console[_0xadeb('0x11')]&&_0xadeb('0x2')!==typeof console[_0xadeb('0x2a')]&&_0xadeb('0x2')!==typeof console['warn']){var _0x1e539e;'object'===typeof _0x10df11?(_0x10df11[_0xadeb('0x6a')]('[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'),_0x1e539e=_0x10df11):_0x1e539e=[_0xadeb('0xb5')+_0x10df11];if(_0xadeb('0x2')===typeof _0x539772||_0xadeb('0x28')!==_0x539772[_0xadeb('0xe')]()&&_0xadeb('0xb6')!==_0x539772[_0xadeb('0xe')]())if('undefined'!==typeof _0x539772&&_0xadeb('0x2a')===_0x539772[_0xadeb('0xe')]())try{console[_0xadeb('0x2a')][_0xadeb('0x6c')](console,_0x1e539e);}catch(_0x29ef1f){try{console[_0xadeb('0x2a')](_0x1e539e[_0xadeb('0x7')]('\x0a'));}catch(_0x343f5c){}}else try{console['error'][_0xadeb('0x6c')](console,_0x1e539e);}catch(_0x3b50cb){try{console[_0xadeb('0x11')](_0x1e539e[_0xadeb('0x7')]('\x0a'));}catch(_0x540b70){}}else try{console[_0xadeb('0x64')][_0xadeb('0x6c')](console,_0x1e539e);}catch(_0xa9799f){try{console['warn'](_0x1e539e[_0xadeb('0x7')]('\x0a'));}catch(_0xa9de76){}}}};window['_QuatroDigital_DropDown']=window[_0xadeb('0x55')]||{};window[_0xadeb('0x55')]['allowUpdate']=!0x0;_0x581180[_0xadeb('0xb7')]=function(){};_0x581180['fn']['QD_dropDownCart']=function(){return{'fn':new _0x581180()};};var _0x411f14=function(_0x515c3d){var _0x11fa3f={'i':'vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x3f87aa){var _0x4ad432=function(_0x41fca2){return _0x41fca2;};var _0x13c725=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3f87aa=_0x3f87aa['d'+_0x13c725[0x10]+'c'+_0x13c725[0x11]+'m'+_0x4ad432(_0x13c725[0x1])+'n'+_0x13c725[0xd]]['l'+_0x13c725[0x12]+'c'+_0x13c725[0x0]+'ti'+_0x4ad432('o')+'n'];var _0x1b75c2=function(_0x284be7){return escape(encodeURIComponent(_0x284be7['replace'](/\./g,'¨')[_0xadeb('0x1')](/[a-zA-Z]/g,function(_0xff4051){return String[_0xadeb('0xb8')](('Z'>=_0xff4051?0x5a:0x7a)>=(_0xff4051=_0xff4051[_0xadeb('0xb9')](0x0)+0xd)?_0xff4051:_0xff4051-0x1a);})));};var _0x2de047=_0x1b75c2(_0x3f87aa[[_0x13c725[0x9],_0x4ad432('o'),_0x13c725[0xc],_0x13c725[_0x4ad432(0xd)]][_0xadeb('0x7')]('')]);_0x1b75c2=_0x1b75c2((window[['js',_0x4ad432('no'),'m',_0x13c725[0x1],_0x13c725[0x4][_0xadeb('0xba')](),'ite']['join']('')]||_0xadeb('0xbb'))+['.v',_0x13c725[0xd],'e',_0x4ad432('x'),'co',_0x4ad432('mm'),_0xadeb('0xbc'),_0x13c725[0x1],'.c',_0x4ad432('o'),'m.',_0x13c725[0x13],'r']['join'](''));for(var _0x5c4d0d in _0x11fa3f){if(_0x1b75c2===_0x5c4d0d+_0x11fa3f[_0x5c4d0d]||_0x2de047===_0x5c4d0d+_0x11fa3f[_0x5c4d0d]){var _0x322827='tr'+_0x13c725[0x11]+'e';break;}_0x322827='f'+_0x13c725[0x0]+'ls'+_0x4ad432(_0x13c725[0x1])+'';}_0x4ad432=!0x1;-0x1<_0x3f87aa[[_0x13c725[0xc],'e',_0x13c725[0x0],'rc',_0x13c725[0x9]]['join']('')][_0xadeb('0x98')](_0xadeb('0xbd'))&&(_0x4ad432=!0x0);return[_0x322827,_0x4ad432];}(_0x515c3d);}(window);if(!eval(_0x411f14[0x0]))return _0x411f14[0x1]?_0x567159(_0xadeb('0xbe')):!0x1;_0x581180[_0xadeb('0xb7')]=function(_0x28df12,_0x285679){var _0x32b316=_0x581180(_0x28df12);if(!_0x32b316[_0xadeb('0x6')])return _0x32b316;var _0x10bd64=_0x581180['extend'](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':_0xadeb('0xbf'),'cartTotal':_0xadeb('0xc0'),'emptyCart':_0xadeb('0xc1'),'continueShopping':'Continuar\x20Comprando','shippingForm':'<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x2ff73a){return _0x2ff73a[_0xadeb('0xc2')]||_0x2ff73a[_0xadeb('0xc3')];},'callback':function(){},'callbackProductsList':function(){}},_0x285679);_0x581180('');var _0x52be8e=this;if(_0x10bd64[_0xadeb('0xc4')]){var _0x266a38=!0x1;_0xadeb('0x2')===typeof window[_0xadeb('0x56')]&&(_0x567159('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN'),_0x581180[_0xadeb('0x18')]({'url':_0xadeb('0xc5'),'async':!0x1,'dataType':_0xadeb('0xc6'),'error':function(){_0x567159(_0xadeb('0xc7'));_0x266a38=!0x0;}}));if(_0x266a38)return _0x567159(_0xadeb('0xc8'));}if(_0xadeb('0x27')===typeof window[_0xadeb('0x56')]&&_0xadeb('0x2')!==typeof window[_0xadeb('0x56')][_0xadeb('0x23')])var _0x41142a=window[_0xadeb('0x56')][_0xadeb('0x23')];else if('object'===typeof vtex&&_0xadeb('0x27')===typeof vtex['checkout']&&_0xadeb('0x2')!==typeof vtex['checkout'][_0xadeb('0x57')])_0x41142a=new vtex[(_0xadeb('0x23'))][(_0xadeb('0x57'))]();else return _0x567159(_0xadeb('0x58'));_0x52be8e[_0xadeb('0xc9')]=_0xadeb('0xca');var _0x539e8c=function(_0x4bfa30){_0x581180(this)[_0xadeb('0x84')](_0x4bfa30);_0x4bfa30[_0xadeb('0x4f')]('.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose')['add'](_0x581180(_0xadeb('0xcb')))['on'](_0xadeb('0xcc'),function(){_0x32b316['removeClass'](_0xadeb('0xcd'));_0x581180(document['body'])[_0xadeb('0x49')](_0xadeb('0x8b'));});_0x581180(document)[_0xadeb('0xce')](_0xadeb('0xcf'))['on'](_0xadeb('0xcf'),function(_0x582e97){0x1b==_0x582e97['keyCode']&&(_0x32b316[_0xadeb('0x49')](_0xadeb('0xcd')),_0x581180(document[_0xadeb('0x72')])['removeClass']('qd-bb-lightBoxBodyProdAdd'));});var _0x351873=_0x4bfa30['find']('.qd-ddc-prodWrapper');_0x4bfa30[_0xadeb('0x4f')](_0xadeb('0xd0'))['on'](_0xadeb('0xd1'),function(){_0x52be8e[_0xadeb('0xd2')]('-',void 0x0,void 0x0,_0x351873);return!0x1;});_0x4bfa30[_0xadeb('0x4f')](_0xadeb('0xd3'))['on'](_0xadeb('0xd4'),function(){_0x52be8e[_0xadeb('0xd2')](void 0x0,void 0x0,void 0x0,_0x351873);return!0x1;});_0x4bfa30[_0xadeb('0x4f')](_0xadeb('0xd5'))[_0xadeb('0xd6')]('')['on']('keyup.qd_ddc_cep',function(){_0x52be8e[_0xadeb('0xd7')](_0x581180(this));});if(_0x10bd64[_0xadeb('0xd8')]){var _0x285679=0x0;_0x581180(this)['on'](_0xadeb('0xd9'),function(){var _0x4bfa30=function(){window['_QuatroDigital_DropDown'][_0xadeb('0x92')]&&(_0x52be8e[_0xadeb('0x91')](),window[_0xadeb('0x55')]['allowUpdate']=!0x1,_0x581180['fn']['simpleCart'](!0x0),_0x52be8e[_0xadeb('0xda')]());};_0x285679=setInterval(function(){_0x4bfa30();},0x258);_0x4bfa30();});_0x581180(this)['on'](_0xadeb('0xdb'),function(){clearInterval(_0x285679);});}};var _0x1eff64=function(_0x31a61e){_0x31a61e=_0x581180(_0x31a61e);_0x10bd64[_0xadeb('0xdc')]['cartTotal']=_0x10bd64['texts'][_0xadeb('0x50')][_0xadeb('0x1')](_0xadeb('0xdd'),'<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>');_0x10bd64[_0xadeb('0xdc')][_0xadeb('0x50')]=_0x10bd64[_0xadeb('0xdc')][_0xadeb('0x50')][_0xadeb('0x1')](_0xadeb('0xde'),_0xadeb('0xdf'));_0x10bd64['texts']['cartTotal']=_0x10bd64[_0xadeb('0xdc')][_0xadeb('0x50')][_0xadeb('0x1')](_0xadeb('0xe0'),_0xadeb('0xe1'));_0x10bd64['texts'][_0xadeb('0x50')]=_0x10bd64[_0xadeb('0xdc')][_0xadeb('0x50')][_0xadeb('0x1')](_0xadeb('0xe2'),'<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0x31a61e[_0xadeb('0x4f')](_0xadeb('0xe3'))['html'](_0x10bd64[_0xadeb('0xdc')][_0xadeb('0xe4')]);_0x31a61e['find'](_0xadeb('0xe5'))[_0xadeb('0x4c')](_0x10bd64[_0xadeb('0xdc')]['continueShopping']);_0x31a61e[_0xadeb('0x4f')](_0xadeb('0xe6'))[_0xadeb('0x4c')](_0x10bd64['texts']['linkCheckout']);_0x31a61e[_0xadeb('0x4f')](_0xadeb('0xe7'))[_0xadeb('0x4c')](_0x10bd64[_0xadeb('0xdc')]['cartTotal']);_0x31a61e[_0xadeb('0x4f')]('.qd-ddc-shipping')[_0xadeb('0x4c')](_0x10bd64['texts'][_0xadeb('0xe8')]);_0x31a61e[_0xadeb('0x4f')](_0xadeb('0xe9'))[_0xadeb('0x4c')](_0x10bd64['texts']['emptyCart']);return _0x31a61e;}(this[_0xadeb('0xc9')]);var _0x3e675e=0x0;_0x32b316[_0xadeb('0x32')](function(){0x0<_0x3e675e?_0x539e8c[_0xadeb('0x25')](this,_0x1eff64[_0xadeb('0xea')]()):_0x539e8c['call'](this,_0x1eff64);_0x3e675e++;});window[_0xadeb('0x34')][_0xadeb('0x3f')][_0xadeb('0x67')](function(){_0x581180(_0xadeb('0xeb'))[_0xadeb('0x4c')](window[_0xadeb('0x34')][_0xadeb('0x38')]||'--');_0x581180(_0xadeb('0xec'))[_0xadeb('0x4c')](window['_QuatroDigital_CartData'][_0xadeb('0x3c')]||'0');_0x581180(_0xadeb('0xed'))['html'](window['_QuatroDigital_CartData'][_0xadeb('0x39')]||'--');_0x581180(_0xadeb('0xee'))[_0xadeb('0x4c')](window[_0xadeb('0x34')][_0xadeb('0x3b')]||'--');});var _0x308c6a=function(_0x5d7a3c,_0x401671){if(_0xadeb('0x2')===typeof _0x5d7a3c['items'])return _0x567159(_0xadeb('0xef'));_0x52be8e[_0xadeb('0xf0')][_0xadeb('0x25')](this,_0x401671);};_0x52be8e['getCartInfoByUrl']=function(_0x3a025f,_0x2e9d9b){'undefined'!=typeof _0x2e9d9b?window[_0xadeb('0x55')][_0xadeb('0xf1')]=_0x2e9d9b:window[_0xadeb('0x55')][_0xadeb('0xf1')]&&(_0x2e9d9b=window[_0xadeb('0x55')][_0xadeb('0xf1')]);setTimeout(function(){window[_0xadeb('0x55')]['dataOptionsCache']=void 0x0;},_0x10bd64[_0xadeb('0x90')]);_0x581180(_0xadeb('0xf2'))[_0xadeb('0x49')](_0xadeb('0xf3'));if(_0x10bd64[_0xadeb('0xc4')]){var _0x285679=function(_0x568e63){window[_0xadeb('0x55')][_0xadeb('0x24')]=_0x568e63;_0x308c6a(_0x568e63,_0x2e9d9b);_0xadeb('0x2')!==typeof window[_0xadeb('0xf4')]&&_0xadeb('0x8')===typeof window[_0xadeb('0xf4')]['exec']&&window['_QuatroDigital_AmountProduct'][_0xadeb('0xf5')][_0xadeb('0x25')](this);_0x581180(_0xadeb('0xf2'))[_0xadeb('0x47')](_0xadeb('0xf3'));};_0xadeb('0x2')!==typeof window[_0xadeb('0x55')][_0xadeb('0x24')]?(_0x285679(window['_QuatroDigital_DropDown'][_0xadeb('0x24')]),'function'===typeof _0x3a025f&&_0x3a025f(window['_QuatroDigital_DropDown'][_0xadeb('0x24')])):_0x581180['QD_checkoutQueue']([_0xadeb('0x3d'),_0xadeb('0x35'),'shippingData'],{'done':function(_0x3975c3){_0x285679[_0xadeb('0x25')](this,_0x3975c3);'function'===typeof _0x3a025f&&_0x3a025f(_0x3975c3);},'fail':function(_0x5e9964){_0x567159([_0xadeb('0xf6'),_0x5e9964]);}});}else alert('Este\x20método\x20esta\x20descontinuado!');};_0x52be8e['cartIsEmpty']=function(){var _0xa5c8cd=_0x581180(_0xadeb('0xf2'));_0xa5c8cd['find'](_0xadeb('0xf7'))['length']?_0xa5c8cd[_0xadeb('0x49')](_0xadeb('0xf8')):_0xa5c8cd[_0xadeb('0x47')](_0xadeb('0xf8'));};_0x52be8e['renderProductsList']=function(_0x2dcfd2){var _0x285679=_0x581180('.qd-ddc-prodWrapper2');_0x285679[_0xadeb('0xf9')]();_0x285679[_0xadeb('0x32')](function(){var _0x285679=_0x581180(this),_0x28df12,_0x1bad04,_0x5afb86=_0x581180(''),_0x2ada8f;for(_0x2ada8f in window[_0xadeb('0x55')]['getOrderForm'][_0xadeb('0x3d')])if('object'===typeof window['_QuatroDigital_DropDown']['getOrderForm'][_0xadeb('0x3d')][_0x2ada8f]){var _0x4af25a=window[_0xadeb('0x55')][_0xadeb('0x24')][_0xadeb('0x3d')][_0x2ada8f];var _0x41fdae=_0x4af25a[_0xadeb('0xfa')][_0xadeb('0x1')](/^\/|\/$/g,'')[_0xadeb('0xa2')]('/');var _0xb71697=_0x581180(_0xadeb('0xfb'));_0xb71697['attr']({'data-sku':_0x4af25a['id'],'data-sku-index':_0x2ada8f,'data-qd-departament':_0x41fdae[0x0],'data-qd-category':_0x41fdae[_0x41fdae['length']-0x1]});_0xb71697[_0xadeb('0x47')]('qd-ddc-'+_0x4af25a[_0xadeb('0xfc')]);_0xb71697['find'](_0xadeb('0xfd'))[_0xadeb('0x84')](_0x10bd64['skuName'](_0x4af25a));_0xb71697[_0xadeb('0x4f')]('.qd-ddc-prodPrice')['append'](isNaN(_0x4af25a['sellingPrice'])?_0x4af25a[_0xadeb('0xfe')]:0x0==_0x4af25a['sellingPrice']?_0xadeb('0xff'):(_0x581180(_0xadeb('0x100'))[_0xadeb('0x30')](_0xadeb('0x31'))||'R$')+'\x20'+qd_number_format(_0x4af25a['sellingPrice']/0x64,0x2,',','.'));_0xb71697[_0xadeb('0x4f')]('.qd-ddc-quantity')[_0xadeb('0x30')]({'data-sku':_0x4af25a['id'],'data-sku-index':_0x2ada8f})[_0xadeb('0xd6')](_0x4af25a[_0xadeb('0x3e')]);_0xb71697[_0xadeb('0x4f')]('.qd-ddc-remove')[_0xadeb('0x30')]({'data-sku':_0x4af25a['id'],'data-sku-index':_0x2ada8f});_0x52be8e[_0xadeb('0x101')](_0x4af25a['id'],_0xb71697[_0xadeb('0x4f')](_0xadeb('0x102')),_0x4af25a['imageUrl']);_0xb71697[_0xadeb('0x4f')](_0xadeb('0x103'))['attr']({'data-sku':_0x4af25a['id'],'data-sku-index':_0x2ada8f});_0xb71697['appendTo'](_0x285679);_0x5afb86=_0x5afb86[_0xadeb('0x67')](_0xb71697);}try{var _0x198e4c=_0x285679[_0xadeb('0x0')](_0xadeb('0xf2'))['find'](_0xadeb('0xd5'));_0x198e4c['length']&&''==_0x198e4c['val']()&&window[_0xadeb('0x55')][_0xadeb('0x24')][_0xadeb('0x5a')][_0xadeb('0x104')]&&_0x198e4c[_0xadeb('0xd6')](window[_0xadeb('0x55')]['getOrderForm'][_0xadeb('0x5a')]['address'][_0xadeb('0x105')]);}catch(_0x37359c){_0x567159(_0xadeb('0x106')+_0x37359c[_0xadeb('0x107')],_0xadeb('0xb6'));}_0x52be8e[_0xadeb('0x108')](_0x285679);_0x52be8e[_0xadeb('0xda')]();_0x2dcfd2&&_0x2dcfd2[_0xadeb('0x109')]&&function(){_0x1bad04=_0x5afb86[_0xadeb('0x43')](_0xadeb('0x10a')+_0x2dcfd2[_0xadeb('0x109')]+'\x27]');_0x1bad04[_0xadeb('0x6')]&&(_0x28df12=0x0,_0x5afb86[_0xadeb('0x32')](function(){var _0x2dcfd2=_0x581180(this);if(_0x2dcfd2['is'](_0x1bad04))return!0x1;_0x28df12+=_0x2dcfd2[_0xadeb('0x10b')]();}),_0x52be8e[_0xadeb('0xd2')](void 0x0,void 0x0,_0x28df12,_0x285679[_0xadeb('0x67')](_0x285679[_0xadeb('0xa9')]())),_0x5afb86[_0xadeb('0x49')]('qd-ddc-lastAddedFixed'),function(_0x1c5ff6){_0x1c5ff6[_0xadeb('0x47')]('qd-ddc-lastAdded');_0x1c5ff6[_0xadeb('0x47')](_0xadeb('0x10c'));setTimeout(function(){_0x1c5ff6[_0xadeb('0x49')](_0xadeb('0x10d'));},_0x10bd64[_0xadeb('0x90')]);}(_0x1bad04));}();});(function(){_QuatroDigital_DropDown['getOrderForm'][_0xadeb('0x3d')]['length']?(_0x581180(_0xadeb('0x72'))['removeClass'](_0xadeb('0x10e'))['addClass'](_0xadeb('0x10f')),setTimeout(function(){_0x581180(_0xadeb('0x72'))[_0xadeb('0x49')](_0xadeb('0x110'));},_0x10bd64['timeRemoveNewItemClass'])):_0x581180(_0xadeb('0x72'))['removeClass'](_0xadeb('0x111'))[_0xadeb('0x47')](_0xadeb('0x10e'));}());_0xadeb('0x8')===typeof _0x10bd64[_0xadeb('0x112')]?_0x10bd64[_0xadeb('0x112')][_0xadeb('0x25')](this):_0x567159('callbackProductsList\x20não\x20é\x20uma\x20função');};_0x52be8e[_0xadeb('0x101')]=function(_0x3940be,_0x101c8a,_0x22ca0b){function _0x4804a5(){_0x101c8a[_0xadeb('0x49')](_0xadeb('0x113'))[_0xadeb('0x97')](function(){_0x581180(this)[_0xadeb('0x47')](_0xadeb('0x113'));})[_0xadeb('0x30')]('src',_0x22ca0b);}_0x22ca0b?_0x4804a5():isNaN(_0x3940be)?_0x567159(_0xadeb('0x114'),'alerta'):alert(_0xadeb('0x115'));};_0x52be8e[_0xadeb('0x108')]=function(_0x2f35ed){var _0x20bfea=function(_0x4afddc,_0x92a643){var _0x285679=_0x581180(_0x4afddc);var _0x4de723=_0x285679[_0xadeb('0x30')](_0xadeb('0x116'));var _0x28df12=_0x285679[_0xadeb('0x30')](_0xadeb('0x117'));if(_0x4de723){var _0x5b4bdb=parseInt(_0x285679[_0xadeb('0xd6')]())||0x1;_0x52be8e[_0xadeb('0x118')]([_0x4de723,_0x28df12],_0x5b4bdb,_0x5b4bdb+0x1,function(_0x155484){_0x285679[_0xadeb('0xd6')](_0x155484);'function'===typeof _0x92a643&&_0x92a643();});}};var _0x285679=function(_0x2cc025,_0xff93bc){var _0x285679=_0x581180(_0x2cc025);var _0x2b9184=_0x285679[_0xadeb('0x30')]('data-sku');var _0x28df12=_0x285679['attr'](_0xadeb('0x117'));if(_0x2b9184){var _0x5b2cb0=parseInt(_0x285679[_0xadeb('0xd6')]())||0x2;_0x52be8e['changeQantity']([_0x2b9184,_0x28df12],_0x5b2cb0,_0x5b2cb0-0x1,function(_0x4a628f){_0x285679['val'](_0x4a628f);_0xadeb('0x8')===typeof _0xff93bc&&_0xff93bc();});}};var _0x3a6ad6=function(_0x4d8654,_0x27314c){var _0x285679=_0x581180(_0x4d8654);var _0x1771b2=_0x285679[_0xadeb('0x30')](_0xadeb('0x116'));var _0x28df12=_0x285679[_0xadeb('0x30')](_0xadeb('0x117'));if(_0x1771b2){var _0x4bbb6d=parseInt(_0x285679[_0xadeb('0xd6')]())||0x1;_0x52be8e[_0xadeb('0x118')]([_0x1771b2,_0x28df12],0x1,_0x4bbb6d,function(_0x27f303){_0x285679[_0xadeb('0xd6')](_0x27f303);_0xadeb('0x8')===typeof _0x27314c&&_0x27314c();});}};var _0x28df12=_0x2f35ed[_0xadeb('0x4f')](_0xadeb('0x119'));_0x28df12[_0xadeb('0x47')](_0xadeb('0x11a'))[_0xadeb('0x32')](function(){var _0x2f35ed=_0x581180(this);_0x2f35ed[_0xadeb('0x4f')]('.qd-ddc-quantityMore')['on'](_0xadeb('0x11b'),function(_0x26889f){_0x26889f[_0xadeb('0x7a')]();_0x28df12[_0xadeb('0x47')](_0xadeb('0x11c'));_0x20bfea(_0x2f35ed['find'](_0xadeb('0x11d')),function(){_0x28df12[_0xadeb('0x49')]('qd-loading');});});_0x2f35ed[_0xadeb('0x4f')](_0xadeb('0x11e'))['on'](_0xadeb('0x11f'),function(_0x44a0c6){_0x44a0c6[_0xadeb('0x7a')]();_0x28df12['addClass'](_0xadeb('0x11c'));_0x285679(_0x2f35ed[_0xadeb('0x4f')]('.qd-ddc-quantity'),function(){_0x28df12['removeClass'](_0xadeb('0x11c'));});});_0x2f35ed[_0xadeb('0x4f')](_0xadeb('0x11d'))['on'](_0xadeb('0x120'),function(){_0x28df12[_0xadeb('0x47')](_0xadeb('0x11c'));_0x3a6ad6(this,function(){_0x28df12[_0xadeb('0x49')](_0xadeb('0x11c'));});});_0x2f35ed['find'](_0xadeb('0x11d'))['on'](_0xadeb('0x121'),function(_0x53d627){0xd==_0x53d627['keyCode']&&(_0x28df12[_0xadeb('0x47')](_0xadeb('0x11c')),_0x3a6ad6(this,function(){_0x28df12[_0xadeb('0x49')](_0xadeb('0x11c'));}));});});_0x2f35ed['find'](_0xadeb('0xf7'))[_0xadeb('0x32')](function(){var _0x2f35ed=_0x581180(this);_0x2f35ed[_0xadeb('0x4f')](_0xadeb('0x122'))['on'](_0xadeb('0x123'),function(){_0x2f35ed['addClass']('qd-loading');_0x52be8e[_0xadeb('0x124')](_0x581180(this),function(_0x3be2ab){_0x3be2ab?_0x2f35ed[_0xadeb('0x125')](!0x0)['slideUp'](function(){_0x2f35ed[_0xadeb('0x126')]();_0x52be8e[_0xadeb('0xda')]();}):_0x2f35ed['removeClass'](_0xadeb('0x11c'));});return!0x1;});});};_0x52be8e[_0xadeb('0xd7')]=function(_0x42a467){var _0x254872=_0x42a467[_0xadeb('0xd6')](),_0x254872=_0x254872['replace'](/[^0-9\-]/g,''),_0x254872=_0x254872[_0xadeb('0x1')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0xadeb('0x127')),_0x254872=_0x254872[_0xadeb('0x1')](/(.{9}).*/g,'$1');_0x42a467[_0xadeb('0xd6')](_0x254872);0x9<=_0x254872[_0xadeb('0x6')]&&(_0x42a467[_0xadeb('0x15')](_0xadeb('0x128'))!=_0x254872&&_0x41142a[_0xadeb('0x129')]({'postalCode':_0x254872,'country':'BRA'})['done'](function(_0x29dee3){window[_0xadeb('0x55')][_0xadeb('0x24')]=_0x29dee3;_0x52be8e['getCartInfoByUrl']();})['fail'](function(_0x5ed1b3){_0x567159(['Não\x20foi\x20possível\x20calcular\x20o\x20frete',_0x5ed1b3]);updateCartData();}),_0x42a467[_0xadeb('0x15')](_0xadeb('0x128'),_0x254872));};_0x52be8e[_0xadeb('0x118')]=function(_0x33d10e,_0x20b202,_0x56c62e,_0x572fa8){function _0x5235e3(_0x31d4de){_0x31d4de=_0xadeb('0x12a')!==typeof _0x31d4de?!0x1:_0x31d4de;_0x52be8e[_0xadeb('0x91')]();window['_QuatroDigital_DropDown'][_0xadeb('0x92')]=!0x1;_0x52be8e[_0xadeb('0xda')]();'undefined'!==typeof window[_0xadeb('0xf4')]&&'function'===typeof window[_0xadeb('0xf4')][_0xadeb('0xf5')]&&window[_0xadeb('0xf4')][_0xadeb('0xf5')][_0xadeb('0x25')](this);_0xadeb('0x8')===typeof adminCart&&adminCart();_0x581180['fn'][_0xadeb('0x22')](!0x0,void 0x0,_0x31d4de);_0xadeb('0x8')===typeof _0x572fa8&&_0x572fa8(_0x20b202);}_0x56c62e=_0x56c62e||0x1;if(0x1>_0x56c62e)return _0x20b202;if(_0x10bd64['smartCheckout']){if(_0xadeb('0x2')===typeof window[_0xadeb('0x55')]['getOrderForm'][_0xadeb('0x3d')][_0x33d10e[0x1]])return _0x567159(_0xadeb('0x12b')+_0x33d10e[0x1]+']'),_0x20b202;window['_QuatroDigital_DropDown']['getOrderForm'][_0xadeb('0x3d')][_0x33d10e[0x1]]['quantity']=_0x56c62e;window[_0xadeb('0x55')][_0xadeb('0x24')]['items'][_0x33d10e[0x1]]['index']=_0x33d10e[0x1];_0x41142a[_0xadeb('0x12c')]([window[_0xadeb('0x55')][_0xadeb('0x24')][_0xadeb('0x3d')][_0x33d10e[0x1]]],[_0xadeb('0x3d'),'totalizers','shippingData'])[_0xadeb('0x68')](function(_0x1b44c5){window[_0xadeb('0x55')][_0xadeb('0x24')]=_0x1b44c5;_0x5235e3(!0x0);})[_0xadeb('0x1a')](function(_0x38b51f){_0x567159([_0xadeb('0x12d'),_0x38b51f]);_0x5235e3();});}else _0x567159('atenção\x20esta\x20método\x20esta\x20descontinuado');};_0x52be8e['removeProduct']=function(_0x309f0a,_0x535431){function _0x2e3af1(_0x5bc92a){_0x5bc92a=_0xadeb('0x12a')!==typeof _0x5bc92a?!0x1:_0x5bc92a;_0xadeb('0x2')!==typeof window[_0xadeb('0xf4')]&&_0xadeb('0x8')===typeof window['_QuatroDigital_AmountProduct']['exec']&&window['_QuatroDigital_AmountProduct'][_0xadeb('0xf5')][_0xadeb('0x25')](this);_0xadeb('0x8')===typeof adminCart&&adminCart();_0x581180['fn'][_0xadeb('0x22')](!0x0,void 0x0,_0x5bc92a);_0xadeb('0x8')===typeof _0x535431&&_0x535431(_0x28df12);}var _0x28df12=!0x1,_0x1dd543=_0x581180(_0x309f0a)[_0xadeb('0x30')](_0xadeb('0x117'));if(_0x10bd64[_0xadeb('0xc4')]){if(_0xadeb('0x2')===typeof window[_0xadeb('0x55')][_0xadeb('0x24')][_0xadeb('0x3d')][_0x1dd543])return _0x567159(_0xadeb('0x12b')+_0x1dd543+']'),_0x28df12;window['_QuatroDigital_DropDown'][_0xadeb('0x24')]['items'][_0x1dd543][_0xadeb('0x12e')]=_0x1dd543;_0x41142a[_0xadeb('0x12f')]([window[_0xadeb('0x55')][_0xadeb('0x24')][_0xadeb('0x3d')][_0x1dd543]],[_0xadeb('0x3d'),_0xadeb('0x35'),_0xadeb('0x5a')])[_0xadeb('0x68')](function(_0x1462d7){_0x28df12=!0x0;window[_0xadeb('0x55')][_0xadeb('0x24')]=_0x1462d7;_0x308c6a(_0x1462d7);_0x2e3af1(!0x0);})['fail'](function(_0x12cf01){_0x567159([_0xadeb('0x130'),_0x12cf01]);_0x2e3af1();});}else alert('Atenção,\x20este\x20método\x20esta\x20descontinuado.');};_0x52be8e['scrollCart']=function(_0x381e13,_0x334ace,_0x4fd796,_0x5a4d07){_0x5a4d07=_0x5a4d07||_0x581180(_0xadeb('0x131'));_0x381e13=_0x381e13||'+';_0x334ace=_0x334ace||0.9*_0x5a4d07[_0xadeb('0x132')]();_0x5a4d07['stop'](!0x0,!0x0)[_0xadeb('0x133')]({'scrollTop':isNaN(_0x4fd796)?_0x381e13+'='+_0x334ace+'px':_0x4fd796});};_0x10bd64[_0xadeb('0xd8')]||(_0x52be8e[_0xadeb('0x91')](),_0x581180['fn'][_0xadeb('0x22')](!0x0));_0x581180(window)['on'](_0xadeb('0x134'),function(){try{window[_0xadeb('0x55')][_0xadeb('0x24')]=void 0x0,_0x52be8e[_0xadeb('0x91')]();}catch(_0xb942f0){_0x567159(_0xadeb('0x135')+_0xb942f0[_0xadeb('0x107')],_0xadeb('0x136'));}});_0xadeb('0x8')===typeof _0x10bd64[_0xadeb('0x3f')]?_0x10bd64[_0xadeb('0x3f')]['call'](this):_0x567159(_0xadeb('0xab'));};_0x581180['fn'][_0xadeb('0xb7')]=function(_0x51c7f1){var _0x36d453=_0x581180(this);_0x36d453['fn']=new _0x581180[(_0xadeb('0xb7'))](this,_0x51c7f1);return _0x36d453;};}catch(_0x5ad723){_0xadeb('0x2')!==typeof console&&_0xadeb('0x8')===typeof console[_0xadeb('0x11')]&&console[_0xadeb('0x11')]('Oooops!\x20',_0x5ad723);}}(this));(function(_0x4afd24){try{var _0x1c4afc=jQuery;window['_QuatroDigital_AmountProduct']=window[_0xadeb('0xf4')]||{};window[_0xadeb('0xf4')][_0xadeb('0x3d')]={};window[_0xadeb('0xf4')][_0xadeb('0x137')]=!0x1;window[_0xadeb('0xf4')]['buyButtonClicked']=!0x1;window[_0xadeb('0xf4')][_0xadeb('0x138')]=!0x1;var _0x42dc4f=function(){if(window[_0xadeb('0xf4')]['allowRecalculate']){var _0x561011=!0x1;var _0x4afd24={};window[_0xadeb('0xf4')][_0xadeb('0x3d')]={};for(_0x2bd54f in window['_QuatroDigital_DropDown'][_0xadeb('0x24')][_0xadeb('0x3d')])if(_0xadeb('0x27')===typeof window['_QuatroDigital_DropDown'][_0xadeb('0x24')]['items'][_0x2bd54f]){var _0x3911b2=window['_QuatroDigital_DropDown']['getOrderForm'][_0xadeb('0x3d')][_0x2bd54f];_0xadeb('0x2')!==typeof _0x3911b2[_0xadeb('0x139')]&&null!==_0x3911b2[_0xadeb('0x139')]&&''!==_0x3911b2['productId']&&(window[_0xadeb('0xf4')]['items']['prod_'+_0x3911b2[_0xadeb('0x139')]]=window[_0xadeb('0xf4')]['items'][_0xadeb('0x13a')+_0x3911b2[_0xadeb('0x139')]]||{},window[_0xadeb('0xf4')][_0xadeb('0x3d')][_0xadeb('0x13a')+_0x3911b2[_0xadeb('0x139')]][_0xadeb('0x13b')]=_0x3911b2[_0xadeb('0x139')],_0x4afd24[_0xadeb('0x13a')+_0x3911b2[_0xadeb('0x139')]]||(window[_0xadeb('0xf4')][_0xadeb('0x3d')][_0xadeb('0x13a')+_0x3911b2[_0xadeb('0x139')]][_0xadeb('0x3c')]=0x0),window[_0xadeb('0xf4')]['items'][_0xadeb('0x13a')+_0x3911b2[_0xadeb('0x139')]][_0xadeb('0x3c')]+=_0x3911b2[_0xadeb('0x3e')],_0x561011=!0x0,_0x4afd24[_0xadeb('0x13a')+_0x3911b2['productId']]=!0x0);}var _0x2bd54f=_0x561011;}else _0x2bd54f=void 0x0;window[_0xadeb('0xf4')][_0xadeb('0x137')]&&(_0x1c4afc(_0xadeb('0x13c'))[_0xadeb('0x126')](),_0x1c4afc(_0xadeb('0x13d'))[_0xadeb('0x49')](_0xadeb('0x13e')));for(var _0x1c35f7 in window[_0xadeb('0xf4')][_0xadeb('0x3d')]){_0x3911b2=window[_0xadeb('0xf4')]['items'][_0x1c35f7];if('object'!==typeof _0x3911b2)return;_0x4afd24=_0x1c4afc(_0xadeb('0x13f')+_0x3911b2[_0xadeb('0x13b')]+']')['getParent']('li');if(window[_0xadeb('0xf4')][_0xadeb('0x137')]||!_0x4afd24[_0xadeb('0x4f')](_0xadeb('0x13c'))[_0xadeb('0x6')])_0x561011=_0x1c4afc(_0xadeb('0x140')),_0x561011[_0xadeb('0x4f')]('.qd-bap-qtt')['html'](_0x3911b2[_0xadeb('0x3c')]),_0x3911b2=_0x4afd24[_0xadeb('0x4f')](_0xadeb('0x141')),_0x3911b2[_0xadeb('0x6')]?_0x3911b2['prepend'](_0x561011)[_0xadeb('0x47')]('qd-bap-item-added'):_0x4afd24[_0xadeb('0xad')](_0x561011);}_0x2bd54f&&(window[_0xadeb('0xf4')][_0xadeb('0x137')]=!0x1);};window[_0xadeb('0xf4')][_0xadeb('0xf5')]=function(){window[_0xadeb('0xf4')][_0xadeb('0x137')]=!0x0;_0x42dc4f[_0xadeb('0x25')](this);};_0x1c4afc(document)['ajaxStop'](function(){_0x42dc4f[_0xadeb('0x25')](this);});}catch(_0x1840e5){_0xadeb('0x2')!==typeof console&&_0xadeb('0x8')===typeof console[_0xadeb('0x11')]&&console[_0xadeb('0x11')](_0xadeb('0x63'),_0x1840e5);}}(this));(function(){try{var _0x4a5f84=jQuery,_0x61cbd5,_0x4bb13e={'selector':'.qdDdcContainer','dropDown':{},'buyButton':{}};_0x4a5f84[_0xadeb('0x142')]=function(_0x251ccf){var _0x1678d6={};_0x61cbd5=_0x4a5f84[_0xadeb('0x13')](!0x0,{},_0x4bb13e,_0x251ccf);_0x251ccf=_0x4a5f84(_0x61cbd5[_0xadeb('0x87')])[_0xadeb('0xb7')](_0x61cbd5[_0xadeb('0x143')]);_0x1678d6[_0xadeb('0x7c')]='undefined'!==typeof _0x61cbd5[_0xadeb('0x143')][_0xadeb('0xd8')]&&!0x1===_0x61cbd5[_0xadeb('0x143')][_0xadeb('0xd8')]?_0x4a5f84(_0x61cbd5[_0xadeb('0x87')])[_0xadeb('0x74')](_0x251ccf['fn'],_0x61cbd5[_0xadeb('0x7c')]):_0x4a5f84(_0x61cbd5[_0xadeb('0x87')])[_0xadeb('0x74')](_0x61cbd5[_0xadeb('0x7c')]);_0x1678d6[_0xadeb('0x143')]=_0x251ccf;return _0x1678d6;};_0x4a5f84['fn'][_0xadeb('0x144')]=function(){_0xadeb('0x27')===typeof console&&_0xadeb('0x8')===typeof console[_0xadeb('0x2a')]&&console[_0xadeb('0x2a')](_0xadeb('0x145'));};_0x4a5f84[_0xadeb('0x144')]=_0x4a5f84['fn'][_0xadeb('0x144')];}catch(_0x4e09e2){_0xadeb('0x2')!==typeof console&&_0xadeb('0x8')===typeof console[_0xadeb('0x11')]&&console[_0xadeb('0x11')](_0xadeb('0x63'),_0x4e09e2);}}());
/* Quatro Digital - Smart Stock Available */
var _0xf9f4=['sku','QuatroDigital.ssa.prodUnavailable','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','off','qd-ssa-sku-prod-unavailable','vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','join','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','qdPlugin','initialSkuSelected','trigger','prod','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','unavailable','available','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','qdAjax','/produto/sku/','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','function','QD_smartStockAvailable','object','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','alerta','toLowerCase','aviso','undefined','apply','error','removeClass','addClass','SkuSellersInformation','attr','data-qd-ssa-qtt','each','find','[data-qd-ssa-text]','hide','qd-ssa-show','filter','[data-qd-ssa-text=\x22','length','[data-qd-ssa-text=\x22default\x22]','qd-ssa-hide','html','replace','#qtt','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','message','qd-ssa-on','qd-ssa-sku-no-selected','qd-ssa-skus-','skus','split','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected'];(function(_0x3fdf3b,_0x2598f2){var _0x1ab1b5=function(_0x218f1b){while(--_0x218f1b){_0x3fdf3b['push'](_0x3fdf3b['shift']());}};_0x1ab1b5(++_0x2598f2);}(_0xf9f4,0x1d7));var _0x4f9f=function(_0x2e1a97,_0x24dd78){_0x2e1a97=_0x2e1a97-0x0;var _0x4e9291=_0xf9f4[_0x2e1a97];return _0x4e9291;};(function(_0x28f84b){function _0x58d590(_0x16c5d6,_0x510f35){_0x4a161d[_0x4f9f('0x0')]({'url':_0x4f9f('0x1')+_0x16c5d6,'clearQueueDelay':null,'success':_0x510f35,'error':function(){_0x5941d8(_0x4f9f('0x2'));}});}var _0x4a161d=jQuery;if(_0x4f9f('0x3')!==typeof _0x4a161d['fn'][_0x4f9f('0x4')]){var _0x5941d8=function(_0x408f8d,_0x247f8e){if(_0x4f9f('0x5')===typeof console){var _0xf38ec5;_0x4f9f('0x5')===typeof _0x408f8d?(_0x408f8d[_0x4f9f('0x6')](_0x4f9f('0x7')),_0xf38ec5=_0x408f8d):_0xf38ec5=[_0x4f9f('0x7')+_0x408f8d];'undefined'===typeof _0x247f8e||_0x4f9f('0x8')!==_0x247f8e[_0x4f9f('0x9')]()&&_0x4f9f('0xa')!==_0x247f8e['toLowerCase']()?_0x4f9f('0xb')!==typeof _0x247f8e&&'info'===_0x247f8e[_0x4f9f('0x9')]()?console['info'][_0x4f9f('0xc')](console,_0xf38ec5):console[_0x4f9f('0xd')][_0x4f9f('0xc')](console,_0xf38ec5):console['warn']['apply'](console,_0xf38ec5);}},_0x5cfd2b={},_0x52735b=function(_0x3077ca,_0x297de7){function _0x198e58(_0x57fd6c){try{_0x3077ca[_0x4f9f('0xe')]('qd-ssa-sku-no-selected')[_0x4f9f('0xf')]('qd-ssa-sku-selected');var _0x38d66b=_0x57fd6c[0x0][_0x4f9f('0x10')][0x0]['AvailableQuantity'];_0x3077ca[_0x4f9f('0x11')](_0x4f9f('0x12'),_0x38d66b);_0x3077ca[_0x4f9f('0x13')](function(){var _0x3077ca=_0x4a161d(this)[_0x4f9f('0x14')](_0x4f9f('0x15'));if(0x1>_0x38d66b)return _0x3077ca[_0x4f9f('0x16')]()[_0x4f9f('0xf')]('qd-ssa-hide')['removeClass'](_0x4f9f('0x17'));var _0x57fd6c=_0x3077ca[_0x4f9f('0x18')](_0x4f9f('0x19')+_0x38d66b+'\x22]'),_0x57fd6c=_0x57fd6c[_0x4f9f('0x1a')]?_0x57fd6c:_0x3077ca['filter'](_0x4f9f('0x1b'));_0x3077ca[_0x4f9f('0x16')]()[_0x4f9f('0xf')](_0x4f9f('0x1c'))[_0x4f9f('0xe')](_0x4f9f('0x17'));_0x57fd6c[_0x4f9f('0x1d')](_0x57fd6c[_0x4f9f('0x1d')]()[_0x4f9f('0x1e')](_0x4f9f('0x1f'),_0x38d66b));_0x57fd6c['show']()[_0x4f9f('0xf')]('qd-ssa-show')[_0x4f9f('0xe')](_0x4f9f('0x1c'));});}catch(_0x1011ea){_0x5941d8([_0x4f9f('0x20'),_0x1011ea[_0x4f9f('0x21')]]);}}if(_0x3077ca[_0x4f9f('0x1a')]){_0x3077ca[_0x4f9f('0xf')](_0x4f9f('0x22'));_0x3077ca['addClass'](_0x4f9f('0x23'));try{_0x3077ca[_0x4f9f('0xf')](_0x4f9f('0x24')+vtxctx[_0x4f9f('0x25')][_0x4f9f('0x26')](';')[_0x4f9f('0x1a')]);}catch(_0x3ea3e1){_0x5941d8([_0x4f9f('0x27'),_0x3ea3e1[_0x4f9f('0x21')]]);}_0x4a161d(window)['on'](_0x4f9f('0x28'),function(_0x2223a2,_0x535a15,_0x241f61){try{_0x58d590(_0x241f61[_0x4f9f('0x29')],function(_0x47a68f){_0x198e58(_0x47a68f);0x1===vtxctx[_0x4f9f('0x25')][_0x4f9f('0x26')](';')[_0x4f9f('0x1a')]&&0x0==_0x47a68f[0x0][_0x4f9f('0x10')][0x0]['AvailableQuantity']&&_0x4a161d(window)['trigger'](_0x4f9f('0x2a'));});}catch(_0x5b59da){_0x5941d8([_0x4f9f('0x2b'),_0x5b59da[_0x4f9f('0x21')]]);}});_0x4a161d(window)[_0x4f9f('0x2c')]('vtex.sku.selected.QD');_0x4a161d(window)['on'](_0x4f9f('0x2a'),function(){_0x3077ca[_0x4f9f('0xf')](_0x4f9f('0x2d'))[_0x4f9f('0x16')]();});}};_0x28f84b=function(_0x25b8d2){var _0x3d26c4={'i':_0x4f9f('0x2e')};return function(_0x596740){var _0x42fef3=function(_0x342026){return _0x342026;};var _0x306dbf=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x596740=_0x596740['d'+_0x306dbf[0x10]+'c'+_0x306dbf[0x11]+'m'+_0x42fef3(_0x306dbf[0x1])+'n'+_0x306dbf[0xd]]['l'+_0x306dbf[0x12]+'c'+_0x306dbf[0x0]+'ti'+_0x42fef3('o')+'n'];var _0x55c3db=function(_0x19c9d5){return escape(encodeURIComponent(_0x19c9d5[_0x4f9f('0x1e')](/\./g,'¨')[_0x4f9f('0x1e')](/[a-zA-Z]/g,function(_0x4a7745){return String[_0x4f9f('0x2f')](('Z'>=_0x4a7745?0x5a:0x7a)>=(_0x4a7745=_0x4a7745[_0x4f9f('0x30')](0x0)+0xd)?_0x4a7745:_0x4a7745-0x1a);})));};var _0x9e54bc=_0x55c3db(_0x596740[[_0x306dbf[0x9],_0x42fef3('o'),_0x306dbf[0xc],_0x306dbf[_0x42fef3(0xd)]]['join']('')]);_0x55c3db=_0x55c3db((window[['js',_0x42fef3('no'),'m',_0x306dbf[0x1],_0x306dbf[0x4][_0x4f9f('0x31')](),_0x4f9f('0x32')][_0x4f9f('0x33')]('')]||'---')+['.v',_0x306dbf[0xd],'e',_0x42fef3('x'),'co',_0x42fef3('mm'),'erc',_0x306dbf[0x1],'.c',_0x42fef3('o'),'m.',_0x306dbf[0x13],'r']['join'](''));for(var _0x356176 in _0x3d26c4){if(_0x55c3db===_0x356176+_0x3d26c4[_0x356176]||_0x9e54bc===_0x356176+_0x3d26c4[_0x356176]){var _0x28f84b='tr'+_0x306dbf[0x11]+'e';break;}_0x28f84b='f'+_0x306dbf[0x0]+'ls'+_0x42fef3(_0x306dbf[0x1])+'';}_0x42fef3=!0x1;-0x1<_0x596740[[_0x306dbf[0xc],'e',_0x306dbf[0x0],'rc',_0x306dbf[0x9]][_0x4f9f('0x33')]('')][_0x4f9f('0x34')](_0x4f9f('0x35'))&&(_0x42fef3=!0x0);return[_0x28f84b,_0x42fef3];}(_0x25b8d2);}(window);if(!eval(_0x28f84b[0x0]))return _0x28f84b[0x1]?_0x5941d8(_0x4f9f('0x36')):!0x1;_0x4a161d['fn']['QD_smartStockAvailable']=function(_0x59b97a){var _0x2183ed=_0x4a161d(this);_0x59b97a=_0x4a161d['extend'](!0x0,{},_0x5cfd2b,_0x59b97a);_0x2183ed[_0x4f9f('0x37')]=new _0x52735b(_0x2183ed,_0x59b97a);try{'object'===typeof _0x4a161d['fn'][_0x4f9f('0x4')][_0x4f9f('0x38')]&&_0x4a161d(window)[_0x4f9f('0x39')]('QuatroDigital.ssa.skuSelected',[_0x4a161d['fn'][_0x4f9f('0x4')][_0x4f9f('0x38')][_0x4f9f('0x3a')],_0x4a161d['fn'][_0x4f9f('0x4')][_0x4f9f('0x38')]['sku']]);}catch(_0x4f7958){_0x5941d8([_0x4f9f('0x3b'),_0x4f7958[_0x4f9f('0x21')]]);}_0x4a161d['fn']['QD_smartStockAvailable'][_0x4f9f('0x3c')]&&_0x4a161d(window)[_0x4f9f('0x39')](_0x4f9f('0x2a'));return _0x2183ed;};_0x4a161d(window)['on']('vtex.sku.selected.QD',function(_0x415e38,_0x3cca06,_0xa278e2){try{_0x4a161d['fn'][_0x4f9f('0x4')][_0x4f9f('0x38')]={'prod':_0x3cca06,'sku':_0xa278e2},_0x4a161d(this)['off'](_0x415e38);}catch(_0x2d9593){_0x5941d8(['Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20',_0x2d9593['message']]);}});_0x4a161d(window)['on']('vtex.sku.selectable',function(_0x312f0c,_0x3101d5,_0x56ce02){try{for(var _0x45ab0d=_0x56ce02[_0x4f9f('0x1a')],_0x7dbd70=_0x3101d5=0x0;_0x7dbd70<_0x45ab0d&&!_0x56ce02[_0x7dbd70][_0x4f9f('0x3d')];_0x7dbd70++)_0x3101d5+=0x1;_0x45ab0d<=_0x3101d5&&(_0x4a161d['fn'][_0x4f9f('0x4')]['unavailable']=!0x0);_0x4a161d(this)[_0x4f9f('0x2c')](_0x312f0c);}catch(_0x4603bd){_0x5941d8([_0x4f9f('0x3e'),_0x4603bd[_0x4f9f('0x21')]]);}});_0x4a161d(function(){_0x4a161d(_0x4f9f('0x3f'))[_0x4f9f('0x4')]();});}}(window));



// -include ../qd-quatro-lib-plugins/Infinity Scroll Memory/QD_infinityScrollMemory.min.js
