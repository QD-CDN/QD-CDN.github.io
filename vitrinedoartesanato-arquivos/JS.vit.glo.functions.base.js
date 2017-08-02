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
		},
		ajaxStop: function () {
			Common.appendSkuPopUpCloseBtn();
			Common.saveAmountFix();
		},
		windowOnload: function () {
			Common.facebookLikebox();
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
var _0xfd73=['text','trim','[class*=\x27colunas\x27]','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','children',':not(ul)','qd-am-elem-','replaceSpecialChars','>li','qd-amazing-menu','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','add','qd-am-','-li','callback','extend','getParent','QD_amazingMenu','object','error','info','undefined','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','join','warn','apply','qdAmAddNdx','each','addClass','qd-am-li-','first','last','qd-am-last','replace','charCodeAt','ite','---','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','url','html','img[alt=\x27','attr','data-qdam-value','clone','insertBefore','hide','qd-am-content-loaded'];(function(_0x2af20f,_0x436704){var _0x22c9e7=function(_0x2d2566){while(--_0x2d2566){_0x2af20f['push'](_0x2af20f['shift']());}};_0x22c9e7(++_0x436704);}(_0xfd73,0x13a));var _0x3fd7=function(_0x2f0d01,_0x3e8f09){_0x2f0d01=_0x2f0d01-0x0;var _0x4aa147=_0xfd73[_0x2f0d01];return _0x4aa147;};(function(_0x4667c2){_0x4667c2['fn'][_0x3fd7('0x0')]=_0x4667c2['fn']['closest'];}(jQuery));(function(_0x4abb65){var _0x295daa;var _0x884d93=jQuery;if('function'!==typeof _0x884d93['fn'][_0x3fd7('0x1')]){var _0x3ee0b4={'url':'/qd-amazing-menu','callback':function(){},'ajaxCallback':function(){}};var _0x153eb9=function(_0x1aa54f,_0x128ae6){if(_0x3fd7('0x2')===typeof console&&'undefined'!==typeof console[_0x3fd7('0x3')]&&'undefined'!==typeof console[_0x3fd7('0x4')]&&_0x3fd7('0x5')!==typeof console['warn']){var _0x12952b;_0x3fd7('0x2')===typeof _0x1aa54f?(_0x1aa54f[_0x3fd7('0x6')](_0x3fd7('0x7')),_0x12952b=_0x1aa54f):_0x12952b=['[QD\x20Amazing\x20Menu]\x0a'+_0x1aa54f];if(_0x3fd7('0x5')===typeof _0x128ae6||_0x3fd7('0x8')!==_0x128ae6[_0x3fd7('0x9')]()&&_0x3fd7('0xa')!==_0x128ae6['toLowerCase']())if(_0x3fd7('0x5')!==typeof _0x128ae6&&_0x3fd7('0x4')===_0x128ae6[_0x3fd7('0x9')]())try{console[_0x3fd7('0x4')]['apply'](console,_0x12952b);}catch(_0x53514b){try{console[_0x3fd7('0x4')](_0x12952b['join']('\x0a'));}catch(_0x53d930){}}else try{console['error']['apply'](console,_0x12952b);}catch(_0x31cb3d){try{console[_0x3fd7('0x3')](_0x12952b[_0x3fd7('0xb')]('\x0a'));}catch(_0x848a98){}}else try{console[_0x3fd7('0xc')][_0x3fd7('0xd')](console,_0x12952b);}catch(_0x53dedf){try{console['warn'](_0x12952b[_0x3fd7('0xb')]('\x0a'));}catch(_0x5705c4){}}}};_0x884d93['fn'][_0x3fd7('0xe')]=function(){var _0xdc97c=_0x884d93(this);_0xdc97c[_0x3fd7('0xf')](function(_0xb82cd3){_0x884d93(this)[_0x3fd7('0x10')](_0x3fd7('0x11')+_0xb82cd3);});_0xdc97c[_0x3fd7('0x12')]()[_0x3fd7('0x10')]('qd-am-first');_0xdc97c[_0x3fd7('0x13')]()[_0x3fd7('0x10')](_0x3fd7('0x14'));return _0xdc97c;};_0x884d93['fn'][_0x3fd7('0x1')]=function(){};_0x4abb65=function(_0x205439){var _0x31903d={'i':'vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x15f9b5){var _0x1e1fd6=function(_0x5a8beb){return _0x5a8beb;};var _0x28f774=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x15f9b5=_0x15f9b5['d'+_0x28f774[0x10]+'c'+_0x28f774[0x11]+'m'+_0x1e1fd6(_0x28f774[0x1])+'n'+_0x28f774[0xd]]['l'+_0x28f774[0x12]+'c'+_0x28f774[0x0]+'ti'+_0x1e1fd6('o')+'n'];var _0x57e86a=function(_0xf34b36){return escape(encodeURIComponent(_0xf34b36['replace'](/\./g,'¨')[_0x3fd7('0x15')](/[a-zA-Z]/g,function(_0x47b15e){return String['fromCharCode'](('Z'>=_0x47b15e?0x5a:0x7a)>=(_0x47b15e=_0x47b15e[_0x3fd7('0x16')](0x0)+0xd)?_0x47b15e:_0x47b15e-0x1a);})));};var _0x117bc4=_0x57e86a(_0x15f9b5[[_0x28f774[0x9],_0x1e1fd6('o'),_0x28f774[0xc],_0x28f774[_0x1e1fd6(0xd)]][_0x3fd7('0xb')]('')]);_0x57e86a=_0x57e86a((window[['js',_0x1e1fd6('no'),'m',_0x28f774[0x1],_0x28f774[0x4]['toUpperCase'](),_0x3fd7('0x17')]['join']('')]||_0x3fd7('0x18'))+['.v',_0x28f774[0xd],'e',_0x1e1fd6('x'),'co',_0x1e1fd6('mm'),'erc',_0x28f774[0x1],'.c',_0x1e1fd6('o'),'m.',_0x28f774[0x13],'r'][_0x3fd7('0xb')](''));for(var _0x22c637 in _0x31903d){if(_0x57e86a===_0x22c637+_0x31903d[_0x22c637]||_0x117bc4===_0x22c637+_0x31903d[_0x22c637]){var _0x4d4765='tr'+_0x28f774[0x11]+'e';break;}_0x4d4765='f'+_0x28f774[0x0]+'ls'+_0x1e1fd6(_0x28f774[0x1])+'';}_0x1e1fd6=!0x1;-0x1<_0x15f9b5[[_0x28f774[0xc],'e',_0x28f774[0x0],'rc',_0x28f774[0x9]][_0x3fd7('0xb')]('')][_0x3fd7('0x19')](_0x3fd7('0x1a'))&&(_0x1e1fd6=!0x0);return[_0x4d4765,_0x1e1fd6];}(_0x205439);}(window);if(!eval(_0x4abb65[0x0]))return _0x4abb65[0x1]?_0x153eb9(_0x3fd7('0x1b')):!0x1;var _0x173fd5=function(_0x228c30){var _0x54f25f=_0x228c30[_0x3fd7('0x1c')]('.qd_am_code');var _0x1ed6f1=_0x54f25f[_0x3fd7('0x1d')](_0x3fd7('0x1e'));var _0x2b3345=_0x54f25f[_0x3fd7('0x1d')](_0x3fd7('0x1f'));if(_0x1ed6f1[_0x3fd7('0x20')]||_0x2b3345[_0x3fd7('0x20')])_0x1ed6f1[_0x3fd7('0x21')]()[_0x3fd7('0x10')](_0x3fd7('0x22')),_0x2b3345[_0x3fd7('0x21')]()[_0x3fd7('0x10')](_0x3fd7('0x23')),_0x884d93[_0x3fd7('0x24')]({'url':_0x295daa[_0x3fd7('0x25')],'dataType':_0x3fd7('0x26'),'success':function(_0x38d626){var _0x3c1a29=_0x884d93(_0x38d626);_0x1ed6f1[_0x3fd7('0xf')](function(){var _0x38d626=_0x884d93(this);var _0x4e75df=_0x3c1a29[_0x3fd7('0x1c')](_0x3fd7('0x27')+_0x38d626[_0x3fd7('0x28')](_0x3fd7('0x29'))+'\x27]');_0x4e75df[_0x3fd7('0x20')]&&(_0x4e75df[_0x3fd7('0xf')](function(){_0x884d93(this)['getParent']('.box-banner')[_0x3fd7('0x2a')]()[_0x3fd7('0x2b')](_0x38d626);}),_0x38d626[_0x3fd7('0x2c')]());})[_0x3fd7('0x10')](_0x3fd7('0x2d'));_0x2b3345[_0x3fd7('0xf')](function(){var _0x38d626={};var _0x21031b=_0x884d93(this);_0x3c1a29[_0x3fd7('0x1c')]('h2')[_0x3fd7('0xf')](function(){if(_0x884d93(this)[_0x3fd7('0x2e')]()[_0x3fd7('0x2f')]()['toLowerCase']()==_0x21031b[_0x3fd7('0x28')](_0x3fd7('0x29'))[_0x3fd7('0x2f')]()[_0x3fd7('0x9')]())return _0x38d626=_0x884d93(this),!0x1;});_0x38d626[_0x3fd7('0x20')]&&(_0x38d626[_0x3fd7('0xf')](function(){_0x884d93(this)[_0x3fd7('0x0')](_0x3fd7('0x30'))[_0x3fd7('0x2a')]()[_0x3fd7('0x2b')](_0x21031b);}),_0x21031b[_0x3fd7('0x2c')]());})[_0x3fd7('0x10')]('qd-am-content-loaded');},'error':function(){_0x153eb9(_0x3fd7('0x31')+_0x295daa[_0x3fd7('0x25')]+'\x27\x20falho.');},'complete':function(){_0x295daa[_0x3fd7('0x32')][_0x3fd7('0x33')](this);_0x884d93(window)[_0x3fd7('0x34')](_0x3fd7('0x35'),_0x228c30);},'clearQueueDelay':0xbb8});};_0x884d93[_0x3fd7('0x1')]=function(_0x1cce62){var _0x42c9d4=_0x1cce62[_0x3fd7('0x1c')](_0x3fd7('0x36'))[_0x3fd7('0xf')](function(){var _0x31f637=_0x884d93(this);if(!_0x31f637[_0x3fd7('0x20')])return _0x153eb9([_0x3fd7('0x37'),_0x1cce62],_0x3fd7('0x8'));_0x31f637['find'](_0x3fd7('0x38'))[_0x3fd7('0x21')]()['addClass']('qd-am-has-ul');_0x31f637[_0x3fd7('0x1c')]('li')['each'](function(){var _0x303990=_0x884d93(this);var _0x41f5fb=_0x303990[_0x3fd7('0x39')](_0x3fd7('0x3a'));_0x41f5fb[_0x3fd7('0x20')]&&_0x303990[_0x3fd7('0x10')](_0x3fd7('0x3b')+_0x41f5fb[_0x3fd7('0x12')]()[_0x3fd7('0x2e')]()['trim']()[_0x3fd7('0x3c')]()['replace'](/\./g,'')[_0x3fd7('0x15')](/\s/g,'-')['toLowerCase']());});var _0xdf9863=_0x31f637['find'](_0x3fd7('0x3d'))[_0x3fd7('0xe')]();_0x31f637[_0x3fd7('0x10')](_0x3fd7('0x3e'));_0xdf9863=_0xdf9863[_0x3fd7('0x1c')]('>ul');_0xdf9863[_0x3fd7('0xf')](function(){var _0x310061=_0x884d93(this);_0x310061[_0x3fd7('0x1c')](_0x3fd7('0x3d'))[_0x3fd7('0xe')]()[_0x3fd7('0x10')](_0x3fd7('0x3f'));_0x310061[_0x3fd7('0x10')](_0x3fd7('0x40'));_0x310061[_0x3fd7('0x21')]()['addClass'](_0x3fd7('0x41'));});_0xdf9863[_0x3fd7('0x10')](_0x3fd7('0x41'));var _0x6a4990=0x0,_0x4abb65=function(_0x1f6556){_0x6a4990+=0x1;_0x1f6556=_0x1f6556[_0x3fd7('0x39')]('li')[_0x3fd7('0x39')]('*');_0x1f6556[_0x3fd7('0x20')]&&(_0x1f6556[_0x3fd7('0x10')](_0x3fd7('0x42')+_0x6a4990),_0x4abb65(_0x1f6556));};_0x4abb65(_0x31f637);_0x31f637[_0x3fd7('0x43')](_0x31f637[_0x3fd7('0x1c')]('ul'))[_0x3fd7('0xf')](function(){var _0x592e7b=_0x884d93(this);_0x592e7b[_0x3fd7('0x10')](_0x3fd7('0x44')+_0x592e7b[_0x3fd7('0x39')]('li')['length']+_0x3fd7('0x45'));});});_0x173fd5(_0x42c9d4);_0x295daa[_0x3fd7('0x46')][_0x3fd7('0x33')](this);_0x884d93(window)[_0x3fd7('0x34')]('QuatroDigital.am.callback',_0x1cce62);};_0x884d93['fn'][_0x3fd7('0x1')]=function(_0x5cc9a0){var _0x2732f9=_0x884d93(this);if(!_0x2732f9[_0x3fd7('0x20')])return _0x2732f9;_0x295daa=_0x884d93[_0x3fd7('0x47')]({},_0x3ee0b4,_0x5cc9a0);_0x2732f9['exec']=new _0x884d93[(_0x3fd7('0x1'))](_0x884d93(this));return _0x2732f9;};_0x884d93(function(){_0x884d93('.qd_amazing_menu_auto')[_0x3fd7('0x1')]();});}}(this));
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
var _0x196d=['removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','qd-bap-item-added','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','prepend','.qdDdcContainer','QD_smartCart','updateOnlyHover','dropDown','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','closest','replace','abs','undefined','round','toFixed','split','length','join','function','prototype','trim','capitalize','charAt','toUpperCase','slice','toLowerCase','qdAjax','qdAjaxQueue','000','error','extend','GET','object','stringify','data','toString','type','jqXHR','ajax','done','success','fail','always','complete','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','version','4.0','simpleCart','checkout','getOrderForm','call','QuatroDigital_simpleCart','ajaxStopOn','alerta','warn','info','[Simple\x20Cart]\x0a','add','elements','QD_simpleCart','.qd_cart_qtt','.qd_cart_total','.qd_items_text','attr','each','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','value','total','shipping','allTotal','currencySymbol','showQuantityByItems','items','quantity','qtt','fire','callback','hide','filter','.singular','show','.plural','addClass','qd-emptyCart','removeClass','$this','O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','html','cartQttE','itemsTextE','find','cartQtt','cartTotalE','cartTotal','itemsText','emptyElem','emptyCart','qd-sc-populated','_QuatroDigital_DropDown','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','QD_checkoutQueue','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','.qd_cart_auto','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','Oooops!\x20','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','vtexjs','Callbacks','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','apply','.productInformationWrapper\x20\x20a.buy-button','javascript:','body','.productQuickView','Produto\x20adicionado\x20ao\x20carrinho!','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','href','#produto,\x20.produto','QD_buyButton','isSmartCheckout','qd-bb-click-active','clickBuySmartCheckout','preventDefault','buyButton','.qd-sbb-on','qd-sbb-on','.btn-add-buy-button-asynchronous','qd-bb-active','children','.qd-bb-productAdded','append','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','.buy-in-page-button','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','[href=\x27','---','qd-bb-itemAddBuyButtonWrapper','qd-bb-itemAddCartWrapper','timeRemoveNewItemClass','getCartInfoByUrl','função\x20descontinuada','allowUpdate','autoWatchBuyButton','unbind','click','bind','mouseenter.qd_bb_buy_sc','load','indexOf','selectSkuMsg','?redirect=false&','execDefaultAction','redirect=false','queue','buyIfQuantityZeroed','test','push','productPageCallback','buyButtonClickCallback','prodAdd','ku=','pop','asyncCallback','trigger','cartProductAdded.vtex','fakeRequest','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','Callback\x20não\x20é\x20uma\x20função','.qd-bb-itemAddWrapper','QuatroDigital.qd_bb_prod_add','ajaxSend','url','/checkout/cart/add','match','message','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','aviso','QD_dropDownCart','vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','ite','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','name','smartCheckout','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','qd-bb-lightBoxProdAdd','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','shippingCalculate','mouseenter.qd_ddc_hover','cartIsEmpty','texts','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','linkCart','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalShipping','.qd-ddc-infoAllTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','dataOptionsCache','.qd-ddc-wrapper','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','productCategoryIds','qd-ddc-','availability','.qd-ddc-prodName','sellingPrice','meta[name=currency]','content','val','.qd-ddc-image','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','.qd-ddc-shipping\x20input','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','[data-sku=\x27','outerHeight','qd-ddc-lastAdded','qd-ddc-lastAddedFixed','qd-ddc-cart-empty','qd-ddc-product-add-time','callbackProductsList','qd-loaded','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-quantityMore','qd-loading','.qd-ddc-quantity','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','.qd-ddc-remove','click.qd_ddc_remove','remove','$1-$2$3','qdDdcLastPostalCode','calculateShipping','BRA','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','removeProduct'];(function(_0x4f21cd,_0x30f06f){var _0x1af331=function(_0x51145e){while(--_0x51145e){_0x4f21cd['push'](_0x4f21cd['shift']());}};_0x1af331(++_0x30f06f);}(_0x196d,0x155));var _0xd196=function(_0x500419,_0x549162){_0x500419=_0x500419-0x0;var _0x241c1a=_0x196d[_0x500419];return _0x241c1a;};(function(_0x33bc89){_0x33bc89['fn'][_0xd196('0x0')]=_0x33bc89['fn'][_0xd196('0x1')];}(jQuery));function qd_number_format(_0x349f88,_0x45de8b,_0x482dee,_0x7961d5){_0x349f88=(_0x349f88+'')[_0xd196('0x2')](/[^0-9+\-Ee.]/g,'');_0x349f88=isFinite(+_0x349f88)?+_0x349f88:0x0;_0x45de8b=isFinite(+_0x45de8b)?Math[_0xd196('0x3')](_0x45de8b):0x0;_0x7961d5=_0xd196('0x4')===typeof _0x7961d5?',':_0x7961d5;_0x482dee=_0xd196('0x4')===typeof _0x482dee?'.':_0x482dee;var _0x340af4='',_0x340af4=function(_0x26f42d,_0x12f5c6){var _0x45de8b=Math['pow'](0xa,_0x12f5c6);return''+(Math[_0xd196('0x5')](_0x26f42d*_0x45de8b)/_0x45de8b)[_0xd196('0x6')](_0x12f5c6);},_0x340af4=(_0x45de8b?_0x340af4(_0x349f88,_0x45de8b):''+Math[_0xd196('0x5')](_0x349f88))[_0xd196('0x7')]('.');0x3<_0x340af4[0x0][_0xd196('0x8')]&&(_0x340af4[0x0]=_0x340af4[0x0][_0xd196('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x7961d5));(_0x340af4[0x1]||'')[_0xd196('0x8')]<_0x45de8b&&(_0x340af4[0x1]=_0x340af4[0x1]||'',_0x340af4[0x1]+=Array(_0x45de8b-_0x340af4[0x1][_0xd196('0x8')]+0x1)[_0xd196('0x9')]('0'));return _0x340af4[_0xd196('0x9')](_0x482dee);};_0xd196('0xa')!==typeof String[_0xd196('0xb')][_0xd196('0xc')]&&(String['prototype'][_0xd196('0xc')]=function(){return this[_0xd196('0x2')](/^\s+|\s+$/g,'');});'function'!=typeof String[_0xd196('0xb')][_0xd196('0xd')]&&(String['prototype'][_0xd196('0xd')]=function(){return this[_0xd196('0xe')](0x0)[_0xd196('0xf')]()+this[_0xd196('0x10')](0x1)[_0xd196('0x11')]();});(function(_0xf5fa98){if('function'!==typeof _0xf5fa98[_0xd196('0x12')]){var _0xe2fce8={};_0xf5fa98[_0xd196('0x13')]=_0xe2fce8;0x96>parseInt((_0xf5fa98['fn']['jquery'][_0xd196('0x2')](/[^0-9]+/g,'')+_0xd196('0x14'))[_0xd196('0x10')](0x0,0x3),0xa)&&console&&'function'==typeof console[_0xd196('0x15')]&&console['error']();_0xf5fa98['qdAjax']=function(_0x3a9ec4){try{var _0xb4333=_0xf5fa98[_0xd196('0x16')]({},{'url':'','type':_0xd196('0x17'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x3a9ec4);var _0x11b32e=_0xd196('0x18')===typeof _0xb4333['data']?JSON[_0xd196('0x19')](_0xb4333['data']):_0xb4333[_0xd196('0x1a')][_0xd196('0x1b')]();var _0x17eeeb=encodeURIComponent(_0xb4333['url']+'|'+_0xb4333[_0xd196('0x1c')]+'|'+_0x11b32e);_0xe2fce8[_0x17eeeb]=_0xe2fce8[_0x17eeeb]||{};_0xd196('0x4')==typeof _0xe2fce8[_0x17eeeb][_0xd196('0x1d')]?_0xe2fce8[_0x17eeeb]['jqXHR']=_0xf5fa98[_0xd196('0x1e')](_0xb4333):(_0xe2fce8[_0x17eeeb][_0xd196('0x1d')][_0xd196('0x1f')](_0xb4333[_0xd196('0x20')]),_0xe2fce8[_0x17eeeb][_0xd196('0x1d')][_0xd196('0x21')](_0xb4333[_0xd196('0x15')]),_0xe2fce8[_0x17eeeb][_0xd196('0x1d')][_0xd196('0x22')](_0xb4333[_0xd196('0x23')]));_0xe2fce8[_0x17eeeb][_0xd196('0x1d')][_0xd196('0x22')](function(){isNaN(parseInt(_0xb4333['clearQueueDelay']))||setTimeout(function(){_0xe2fce8[_0x17eeeb][_0xd196('0x1d')]=void 0x0;},_0xb4333[_0xd196('0x24')]);});return _0xe2fce8[_0x17eeeb][_0xd196('0x1d')];}catch(_0x2a9feb){_0xd196('0x4')!==typeof console&&_0xd196('0xa')===typeof console['error']&&console['error'](_0xd196('0x25')+_0x2a9feb['message']);}};_0xf5fa98['qdAjax'][_0xd196('0x26')]=_0xd196('0x27');}}(jQuery));(function(_0x181c05){_0x181c05['fn'][_0xd196('0x0')]=_0x181c05['fn'][_0xd196('0x1')];}(jQuery));(function(){var _0x1b721f=jQuery;if(_0xd196('0xa')!==typeof _0x1b721f['fn'][_0xd196('0x28')]){_0x1b721f(function(){var _0x3554a4=vtexjs[_0xd196('0x29')][_0xd196('0x2a')];vtexjs['checkout']['getOrderForm']=function(){return _0x3554a4[_0xd196('0x2b')]();};});try{window[_0xd196('0x2c')]=window[_0xd196('0x2c')]||{};window[_0xd196('0x2c')][_0xd196('0x2d')]=!0x1;_0x1b721f['fn'][_0xd196('0x28')]=function(_0x5a48e8,_0x5404a9,_0x660e30){var _0x534b39=function(_0x4bfdd7,_0x178721){if('object'===typeof console){var _0x15619c=_0xd196('0x18')===typeof _0x4bfdd7;_0xd196('0x4')!==typeof _0x178721&&_0xd196('0x2e')===_0x178721['toLowerCase']()?_0x15619c?console[_0xd196('0x2f')]('[Simple\x20Cart]\x0a',_0x4bfdd7[0x0],_0x4bfdd7[0x1],_0x4bfdd7[0x2],_0x4bfdd7[0x3],_0x4bfdd7[0x4],_0x4bfdd7[0x5],_0x4bfdd7[0x6],_0x4bfdd7[0x7]):console[_0xd196('0x2f')]('[Simple\x20Cart]\x0a'+_0x4bfdd7):_0xd196('0x4')!==typeof _0x178721&&_0xd196('0x30')===_0x178721[_0xd196('0x11')]()?_0x15619c?console[_0xd196('0x30')]('[Simple\x20Cart]\x0a',_0x4bfdd7[0x0],_0x4bfdd7[0x1],_0x4bfdd7[0x2],_0x4bfdd7[0x3],_0x4bfdd7[0x4],_0x4bfdd7[0x5],_0x4bfdd7[0x6],_0x4bfdd7[0x7]):console['info']('[Simple\x20Cart]\x0a'+_0x4bfdd7):_0x15619c?console['error'](_0xd196('0x31'),_0x4bfdd7[0x0],_0x4bfdd7[0x1],_0x4bfdd7[0x2],_0x4bfdd7[0x3],_0x4bfdd7[0x4],_0x4bfdd7[0x5],_0x4bfdd7[0x6],_0x4bfdd7[0x7]):console[_0xd196('0x15')](_0xd196('0x31')+_0x4bfdd7);}};var _0xb3ab09=_0x1b721f(this);_0xd196('0x18')===typeof _0x5a48e8?_0x5404a9=_0x5a48e8:(_0x5a48e8=_0x5a48e8||!0x1,_0xb3ab09=_0xb3ab09[_0xd196('0x32')](_0x1b721f['QD_simpleCart'][_0xd196('0x33')]));if(!_0xb3ab09[_0xd196('0x8')])return _0xb3ab09;_0x1b721f[_0xd196('0x34')][_0xd196('0x33')]=_0x1b721f['QD_simpleCart']['elements'][_0xd196('0x32')](_0xb3ab09);_0x660e30=_0xd196('0x4')===typeof _0x660e30?!0x1:_0x660e30;var _0x27e970={'cartQtt':_0xd196('0x35'),'cartTotal':_0xd196('0x36'),'itemsText':_0xd196('0x37'),'currencySymbol':(_0x1b721f('meta[name=currency]')[_0xd196('0x38')]('content')||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x1b1929=_0x1b721f['extend']({},_0x27e970,_0x5404a9);var _0x2077a2=_0x1b721f('');_0xb3ab09[_0xd196('0x39')](function(){var _0x4cb1c2=_0x1b721f(this);_0x4cb1c2[_0xd196('0x1a')](_0xd196('0x3a'))||_0x4cb1c2[_0xd196('0x1a')](_0xd196('0x3a'),_0x1b1929);});var _0x1bf237=function(_0x3af543){window[_0xd196('0x3b')]=window[_0xd196('0x3b')]||{};for(var _0x5a48e8=0x0,_0x3a36d6=0x0,_0x546f48=0x0;_0x546f48<_0x3af543[_0xd196('0x3c')]['length'];_0x546f48++)'Shipping'==_0x3af543[_0xd196('0x3c')][_0x546f48]['id']&&(_0x3a36d6+=_0x3af543[_0xd196('0x3c')][_0x546f48]['value']),_0x5a48e8+=_0x3af543[_0xd196('0x3c')][_0x546f48][_0xd196('0x3d')];window[_0xd196('0x3b')][_0xd196('0x3e')]=_0x1b1929['currencySymbol']+qd_number_format(_0x5a48e8/0x64,0x2,',','.');window[_0xd196('0x3b')][_0xd196('0x3f')]=_0x1b1929['currencySymbol']+qd_number_format(_0x3a36d6/0x64,0x2,',','.');window['_QuatroDigital_CartData'][_0xd196('0x40')]=_0x1b1929[_0xd196('0x41')]+qd_number_format((_0x5a48e8+_0x3a36d6)/0x64,0x2,',','.');window[_0xd196('0x3b')]['qtt']=0x0;if(_0x1b1929[_0xd196('0x42')])for(_0x546f48=0x0;_0x546f48<_0x3af543[_0xd196('0x43')]['length'];_0x546f48++)window[_0xd196('0x3b')]['qtt']+=_0x3af543[_0xd196('0x43')][_0x546f48][_0xd196('0x44')];else window[_0xd196('0x3b')][_0xd196('0x45')]=_0x3af543[_0xd196('0x43')][_0xd196('0x8')]||0x0;try{window[_0xd196('0x3b')]['callback']&&window[_0xd196('0x3b')]['callback'][_0xd196('0x46')]&&window[_0xd196('0x3b')][_0xd196('0x47')][_0xd196('0x46')]();}catch(_0x492dd8){_0x534b39('Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart');}_0x6c77e7(_0x2077a2);};var _0x4c3406=function(_0x124ec2,_0x93932b){0x1===_0x124ec2?_0x93932b[_0xd196('0x48')]()[_0xd196('0x49')](_0xd196('0x4a'))[_0xd196('0x4b')]():_0x93932b['hide']()[_0xd196('0x49')](_0xd196('0x4c'))[_0xd196('0x4b')]();};var _0x502b1c=function(_0x160cc8){0x1>_0x160cc8?_0xb3ab09[_0xd196('0x4d')](_0xd196('0x4e')):_0xb3ab09[_0xd196('0x4f')](_0xd196('0x4e'));};var _0x25a625=function(_0x4a2732,_0x4fe709){var _0x304b52=parseInt(window['_QuatroDigital_CartData'][_0xd196('0x45')],0xa);_0x4fe709[_0xd196('0x50')]['show']();isNaN(_0x304b52)&&(_0x534b39(_0xd196('0x51'),'alerta'),_0x304b52=0x0);_0x4fe709['cartTotalE'][_0xd196('0x52')](window['_QuatroDigital_CartData'][_0xd196('0x3e')]);_0x4fe709[_0xd196('0x53')][_0xd196('0x52')](_0x304b52);_0x4c3406(_0x304b52,_0x4fe709[_0xd196('0x54')]);_0x502b1c(_0x304b52);};var _0x6c77e7=function(_0x16a0bc){_0xb3ab09['each'](function(){var _0x23df05={};var _0x52885b=_0x1b721f(this);_0x5a48e8&&_0x52885b[_0xd196('0x1a')](_0xd196('0x3a'))&&_0x1b721f[_0xd196('0x16')](_0x1b1929,_0x52885b[_0xd196('0x1a')](_0xd196('0x3a')));_0x23df05[_0xd196('0x50')]=_0x52885b;_0x23df05[_0xd196('0x53')]=_0x52885b[_0xd196('0x55')](_0x1b1929[_0xd196('0x56')])||_0x2077a2;_0x23df05[_0xd196('0x57')]=_0x52885b['find'](_0x1b1929[_0xd196('0x58')])||_0x2077a2;_0x23df05[_0xd196('0x54')]=_0x52885b[_0xd196('0x55')](_0x1b1929[_0xd196('0x59')])||_0x2077a2;_0x23df05[_0xd196('0x5a')]=_0x52885b[_0xd196('0x55')](_0x1b1929[_0xd196('0x5b')])||_0x2077a2;_0x25a625(_0x16a0bc,_0x23df05);_0x52885b[_0xd196('0x4d')](_0xd196('0x5c'));});};(function(){if(_0x1b1929['smartCheckout']){window[_0xd196('0x5d')]=window[_0xd196('0x5d')]||{};if('undefined'!==typeof window[_0xd196('0x5d')][_0xd196('0x2a')]&&(_0x660e30||!_0x5a48e8))return _0x1bf237(window['_QuatroDigital_DropDown']['getOrderForm']);if(_0xd196('0x18')!==typeof window['vtexjs']||_0xd196('0x4')===typeof window['vtexjs'][_0xd196('0x29')])if(_0xd196('0x18')===typeof vtex&&'object'===typeof vtex[_0xd196('0x29')]&&_0xd196('0x4')!==typeof vtex['checkout'][_0xd196('0x5e')])new vtex['checkout'][(_0xd196('0x5e'))]();else return _0x534b39(_0xd196('0x5f'));_0x1b721f[_0xd196('0x60')]([_0xd196('0x43'),_0xd196('0x3c'),_0xd196('0x61')],{'done':function(_0x52a188){_0x1bf237(_0x52a188);window[_0xd196('0x5d')]['getOrderForm']=_0x52a188;},'fail':function(_0x3dbb01){_0x534b39([_0xd196('0x62'),_0x3dbb01]);}});}else alert(_0xd196('0x63'));}());_0x1b1929['callback']();_0x1b721f(window)['trigger']('simpleCartCallback.quatro_digital');return _0xb3ab09;};_0x1b721f[_0xd196('0x34')]={'elements':_0x1b721f('')};_0x1b721f(function(){var _0x64c0b3;_0xd196('0xa')===typeof window[_0xd196('0x64')]&&(_0x64c0b3=window['ajaxRequestbuyButtonAsynchronous'],window[_0xd196('0x64')]=function(_0x49b226,_0x440fe0,_0x15ac09,_0x4f0278,_0x2f0859){_0x64c0b3[_0xd196('0x2b')](this,_0x49b226,_0x440fe0,_0x15ac09,_0x4f0278,function(){_0xd196('0xa')===typeof _0x2f0859&&_0x2f0859();_0x1b721f[_0xd196('0x34')]['elements'][_0xd196('0x39')](function(){var _0x51c116=_0x1b721f(this);_0x51c116[_0xd196('0x28')](_0x51c116[_0xd196('0x1a')](_0xd196('0x3a')));});});});});var _0x12aa4a=window[_0xd196('0x65')]||void 0x0;window[_0xd196('0x65')]=function(_0x24f891){_0x1b721f['fn'][_0xd196('0x28')](!0x0);_0xd196('0xa')===typeof _0x12aa4a?_0x12aa4a['call'](this,_0x24f891):alert(_0x24f891);};_0x1b721f(function(){var _0x315086=_0x1b721f(_0xd196('0x66'));_0x315086[_0xd196('0x8')]&&_0x315086['simpleCart']();});_0x1b721f(function(){_0x1b721f(window)['bind'](_0xd196('0x67'),function(){_0x1b721f['fn'][_0xd196('0x28')](!0x0);});});}catch(_0xf94453){_0xd196('0x4')!==typeof console&&_0xd196('0xa')===typeof console['error']&&console[_0xd196('0x15')](_0xd196('0x68'),_0xf94453);}}}());(function(){var _0xa6d8fe=function(_0x445ebd,_0x1cad47){if(_0xd196('0x18')===typeof console){var _0x46ff48='object'===typeof _0x445ebd;'undefined'!==typeof _0x1cad47&&_0xd196('0x2e')===_0x1cad47['toLowerCase']()?_0x46ff48?console[_0xd196('0x2f')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x445ebd[0x0],_0x445ebd[0x1],_0x445ebd[0x2],_0x445ebd[0x3],_0x445ebd[0x4],_0x445ebd[0x5],_0x445ebd[0x6],_0x445ebd[0x7]):console[_0xd196('0x2f')](_0xd196('0x69')+_0x445ebd):'undefined'!==typeof _0x1cad47&&_0xd196('0x30')===_0x1cad47[_0xd196('0x11')]()?_0x46ff48?console[_0xd196('0x30')](_0xd196('0x69'),_0x445ebd[0x0],_0x445ebd[0x1],_0x445ebd[0x2],_0x445ebd[0x3],_0x445ebd[0x4],_0x445ebd[0x5],_0x445ebd[0x6],_0x445ebd[0x7]):console['info'](_0xd196('0x69')+_0x445ebd):_0x46ff48?console['error'](_0xd196('0x69'),_0x445ebd[0x0],_0x445ebd[0x1],_0x445ebd[0x2],_0x445ebd[0x3],_0x445ebd[0x4],_0x445ebd[0x5],_0x445ebd[0x6],_0x445ebd[0x7]):console[_0xd196('0x15')](_0xd196('0x69')+_0x445ebd);}},_0x3d6ef4=null,_0xd1bfa8={},_0x11b2fe={},_0x3fe8a9={};$[_0xd196('0x60')]=function(_0x2584cf,_0x98cec){if(null===_0x3d6ef4)if(_0xd196('0x18')===typeof window[_0xd196('0x6a')]&&_0xd196('0x4')!==typeof window['vtexjs'][_0xd196('0x29')])_0x3d6ef4=window[_0xd196('0x6a')][_0xd196('0x29')];else return _0xa6d8fe('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js');var _0x1df499=$[_0xd196('0x16')]({'done':function(){},'fail':function(){}},_0x98cec),_0x5d5aa3=_0x2584cf['join'](';'),_0x409d88=function(){_0xd1bfa8[_0x5d5aa3][_0xd196('0x32')](_0x1df499[_0xd196('0x1f')]);_0x11b2fe[_0x5d5aa3][_0xd196('0x32')](_0x1df499[_0xd196('0x21')]);};_0x3fe8a9[_0x5d5aa3]?_0x409d88():(_0xd1bfa8[_0x5d5aa3]=$[_0xd196('0x6b')](),_0x11b2fe[_0x5d5aa3]=$['Callbacks'](),_0x409d88(),_0x3fe8a9[_0x5d5aa3]=!0x0,_0x3d6ef4[_0xd196('0x2a')](_0x2584cf)['done'](function(_0x55f00b){_0x3fe8a9[_0x5d5aa3]=!0x1;_0xd1bfa8[_0x5d5aa3][_0xd196('0x46')](_0x55f00b);})[_0xd196('0x21')](function(_0x47f3c5){_0x3fe8a9[_0x5d5aa3]=!0x1;_0x11b2fe[_0x5d5aa3][_0xd196('0x46')](_0x47f3c5);}));};}());(function(_0x4ecd98){try{var _0x200ad0=jQuery,_0x4ed48a,_0x1453e4=_0x200ad0({}),_0x512189=function(_0x26b6ed,_0x1f25ed){if(_0xd196('0x18')===typeof console&&'undefined'!==typeof console[_0xd196('0x15')]&&_0xd196('0x4')!==typeof console[_0xd196('0x30')]&&'undefined'!==typeof console['warn']){var _0x594e18;_0xd196('0x18')===typeof _0x26b6ed?(_0x26b6ed[_0xd196('0x6c')](_0xd196('0x6d')),_0x594e18=_0x26b6ed):_0x594e18=[_0xd196('0x6d')+_0x26b6ed];if(_0xd196('0x4')===typeof _0x1f25ed||_0xd196('0x2e')!==_0x1f25ed[_0xd196('0x11')]()&&'aviso'!==_0x1f25ed[_0xd196('0x11')]())if(_0xd196('0x4')!==typeof _0x1f25ed&&_0xd196('0x30')===_0x1f25ed['toLowerCase']())try{console[_0xd196('0x30')]['apply'](console,_0x594e18);}catch(_0x1d1560){try{console[_0xd196('0x30')](_0x594e18[_0xd196('0x9')]('\x0a'));}catch(_0x59e40d){}}else try{console[_0xd196('0x15')]['apply'](console,_0x594e18);}catch(_0x27f4aa){try{console[_0xd196('0x15')](_0x594e18['join']('\x0a'));}catch(_0x448a0f){}}else try{console[_0xd196('0x2f')][_0xd196('0x6e')](console,_0x594e18);}catch(_0x40faec){try{console[_0xd196('0x2f')](_0x594e18['join']('\x0a'));}catch(_0x4b06d6){}}}},_0x496705={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0xd196('0x6f'),'buyQtt':'input.buy-in-page-quantity','selectSkuMsg':_0xd196('0x70'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x2bdab7,_0x198a51,_0x199ec7){_0x200ad0(_0xd196('0x71'))['is'](_0xd196('0x72'))&&(_0xd196('0x20')===_0x198a51?alert(_0xd196('0x73')):(alert(_0xd196('0x74')),(_0xd196('0x18')===typeof parent?parent:document)['location'][_0xd196('0x75')]=_0x199ec7));},'isProductPage':function(){return _0x200ad0(_0xd196('0x71'))['is'](_0xd196('0x76'));},'execDefaultAction':function(_0x5708e9){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x200ad0[_0xd196('0x77')]=function(_0x50a450,_0x4478e9){function _0x597ddf(_0x59884c){_0x4ed48a[_0xd196('0x78')]?_0x59884c[_0xd196('0x1a')](_0xd196('0x79'))||(_0x59884c[_0xd196('0x1a')](_0xd196('0x79'),0x1),_0x59884c['on']('click.qd_bb_buy_sc',function(_0x5d7161){if(!_0x4ed48a['allowBuyClick']())return!0x0;if(!0x0!==_0x55ca33[_0xd196('0x7a')][_0xd196('0x2b')](this))return _0x5d7161[_0xd196('0x7b')](),!0x1;})):alert('Método\x20descontinuado!');}function _0x404c12(_0x4440c6){_0x4440c6=_0x4440c6||_0x200ad0(_0x4ed48a[_0xd196('0x7c')]);_0x4440c6[_0xd196('0x39')](function(){var _0x4440c6=_0x200ad0(this);_0x4440c6['is'](_0xd196('0x7d'))||(_0x4440c6[_0xd196('0x4d')](_0xd196('0x7e')),_0x4440c6['is'](_0xd196('0x7f'))&&!_0x4440c6['is']('.remove-href')||_0x4440c6[_0xd196('0x1a')](_0xd196('0x80'))||(_0x4440c6['data']('qd-bb-active',0x1),_0x4440c6[_0xd196('0x81')](_0xd196('0x82'))[_0xd196('0x8')]||_0x4440c6[_0xd196('0x83')](_0xd196('0x84')),_0x4440c6['is'](_0xd196('0x85'))&&_0x4ed48a[_0xd196('0x86')]()&&_0x1eee32[_0xd196('0x2b')](_0x4440c6),_0x597ddf(_0x4440c6)));});_0x4ed48a[_0xd196('0x86')]()&&!_0x4440c6['length']&&_0x512189(_0xd196('0x87')+_0x4440c6[_0xd196('0x88')]+'\x27.',_0xd196('0x30'));}var _0x397f62=_0x200ad0(_0x50a450);var _0x55ca33=this;window[_0xd196('0x89')]=window[_0xd196('0x89')]||{};window[_0xd196('0x3b')]=window['_QuatroDigital_CartData']||{};_0x55ca33['prodAdd']=function(_0x4f31c5,_0x1587f2){_0x397f62['addClass'](_0xd196('0x8a'));_0x200ad0(_0xd196('0x71'))['addClass'](_0xd196('0x8b'));var _0x186d18=_0x200ad0(_0x4ed48a[_0xd196('0x7c')])[_0xd196('0x49')](_0xd196('0x8c')+(_0x4f31c5[_0xd196('0x38')](_0xd196('0x75'))||_0xd196('0x8d'))+'\x27]')[_0xd196('0x32')](_0x4f31c5);_0x186d18[_0xd196('0x4d')](_0xd196('0x8e'));setTimeout(function(){_0x397f62['removeClass'](_0xd196('0x8f'));_0x186d18[_0xd196('0x4f')](_0xd196('0x8e'));},_0x4ed48a[_0xd196('0x90')]);window[_0xd196('0x89')]['getOrderForm']=void 0x0;if(_0xd196('0x4')!==typeof _0x4478e9&&_0xd196('0xa')===typeof _0x4478e9[_0xd196('0x91')])return _0x4ed48a[_0xd196('0x78')]||(_0x512189(_0xd196('0x92')),_0x4478e9['getCartInfoByUrl']()),window['_QuatroDigital_DropDown'][_0xd196('0x2a')]=void 0x0,_0x4478e9[_0xd196('0x91')](function(_0x5813fa){window[_0xd196('0x89')][_0xd196('0x2a')]=_0x5813fa;_0x200ad0['fn'][_0xd196('0x28')](!0x0,void 0x0,!0x0);},{'lastSku':_0x1587f2});window['_Quatro_Digital_dropDown'][_0xd196('0x93')]=!0x0;_0x200ad0['fn'][_0xd196('0x28')](!0x0);};(function(){if(_0x4ed48a[_0xd196('0x78')]&&_0x4ed48a[_0xd196('0x94')]){var _0x33ee75=_0x200ad0('.btn-add-buy-button-asynchronous');_0x33ee75[_0xd196('0x8')]&&_0x404c12(_0x33ee75);}}());var _0x1eee32=function(){var _0xcc1dc6=_0x200ad0(this);_0xd196('0x4')!==typeof _0xcc1dc6[_0xd196('0x1a')]('buyButton')?(_0xcc1dc6[_0xd196('0x95')](_0xd196('0x96')),_0x597ddf(_0xcc1dc6)):(_0xcc1dc6[_0xd196('0x97')](_0xd196('0x98'),function(_0x3db436){_0xcc1dc6[_0xd196('0x95')](_0xd196('0x96'));_0x597ddf(_0xcc1dc6);_0x200ad0(this)[_0xd196('0x95')](_0x3db436);}),_0x200ad0(window)[_0xd196('0x99')](function(){_0xcc1dc6['unbind']('click');_0x597ddf(_0xcc1dc6);_0xcc1dc6[_0xd196('0x95')](_0xd196('0x98'));}));};_0x55ca33[_0xd196('0x7a')]=function(){var _0x271a77=_0x200ad0(this),_0x50a450=_0x271a77['attr'](_0xd196('0x75'))||'';if(-0x1<_0x50a450[_0xd196('0x9a')](_0x4ed48a[_0xd196('0x9b')]))return!0x0;_0x50a450=_0x50a450['replace'](/redirect\=(false|true)/gi,'')['replace']('?',_0xd196('0x9c'))[_0xd196('0x2')](/\&\&/gi,'&');if(_0x4ed48a[_0xd196('0x9d')](_0x271a77))return _0x271a77['attr']('href',_0x50a450[_0xd196('0x2')](_0xd196('0x9e'),'redirect=true')),!0x0;_0x50a450=_0x50a450['replace'](/http.?:/i,'');_0x1453e4[_0xd196('0x9f')](function(_0x28a4f1){if(!_0x4ed48a[_0xd196('0xa0')]&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0xd196('0xa1')](_0x50a450))return _0x28a4f1();var _0x3beed9=function(_0x7c0163,_0x2ac7ff){var _0x404c12=_0x50a450['match'](/sku\=([0-9]+)/gi),_0x26ec3b=[];if(_0xd196('0x18')===typeof _0x404c12&&null!==_0x404c12)for(var _0x2edc06=_0x404c12[_0xd196('0x8')]-0x1;0x0<=_0x2edc06;_0x2edc06--){var _0x3ee1f0=parseInt(_0x404c12[_0x2edc06]['replace'](/sku\=/gi,''));isNaN(_0x3ee1f0)||_0x26ec3b[_0xd196('0xa2')](_0x3ee1f0);}_0x4ed48a[_0xd196('0xa3')][_0xd196('0x2b')](this,_0x7c0163,_0x2ac7ff,_0x50a450);_0x55ca33[_0xd196('0xa4')][_0xd196('0x2b')](this,_0x7c0163,_0x2ac7ff,_0x50a450,_0x26ec3b);_0x55ca33[_0xd196('0xa5')](_0x271a77,_0x50a450['split'](_0xd196('0xa6'))[_0xd196('0xa7')]()[_0xd196('0x7')]('&')['shift']());_0xd196('0xa')===typeof _0x4ed48a[_0xd196('0xa8')]&&_0x4ed48a[_0xd196('0xa8')]['call'](this);_0x200ad0(window)[_0xd196('0xa9')]('productAddedToCart');_0x200ad0(window)[_0xd196('0xa9')](_0xd196('0xaa'));};_0x4ed48a[_0xd196('0xab')]?(_0x3beed9(null,_0xd196('0x20')),_0x28a4f1()):_0x200ad0[_0xd196('0x1e')]({'url':_0x50a450,'complete':_0x3beed9})[_0xd196('0x22')](function(){_0x28a4f1();});});};_0x55ca33[_0xd196('0xa4')]=function(_0x3b2edf,_0x106afe,_0x6952fb,_0x5a48f6){try{_0xd196('0x20')===_0x106afe&&_0xd196('0x18')===typeof window['parent']&&_0xd196('0xa')===typeof window[_0xd196('0xac')][_0xd196('0xad')]&&window['parent']['_QuatroDigital_prodBuyCallback'](_0x3b2edf,_0x106afe,_0x6952fb,_0x5a48f6);}catch(_0x5ec843){_0x512189(_0xd196('0xae'));}};_0x404c12();_0xd196('0xa')===typeof _0x4ed48a[_0xd196('0x47')]?_0x4ed48a[_0xd196('0x47')][_0xd196('0x2b')](this):_0x512189(_0xd196('0xaf'));};var _0x1bb74d=_0x200ad0[_0xd196('0x6b')]();_0x200ad0['fn'][_0xd196('0x77')]=function(_0x117ef0,_0x127e52){var _0x4ecd98=_0x200ad0(this);_0xd196('0x4')!==typeof _0x127e52||_0xd196('0x18')!==typeof _0x117ef0||_0x117ef0 instanceof _0x200ad0||(_0x127e52=_0x117ef0,_0x117ef0=void 0x0);_0x4ed48a=_0x200ad0[_0xd196('0x16')]({},_0x496705,_0x127e52);var _0x28492f;_0x1bb74d[_0xd196('0x32')](function(){_0x4ecd98['children'](_0xd196('0xb0'))[_0xd196('0x8')]||_0x4ecd98['prepend']('<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>');_0x28492f=new _0x200ad0[(_0xd196('0x77'))](_0x4ecd98,_0x117ef0);});_0x1bb74d[_0xd196('0x46')]();_0x200ad0(window)['on'](_0xd196('0xb1'),function(_0x100da5,_0x356cd8,_0x533a5a){_0x28492f[_0xd196('0xa5')](_0x356cd8,_0x533a5a);});return _0x200ad0[_0xd196('0x16')](_0x4ecd98,_0x28492f);};var _0x1cacb8=0x0;_0x200ad0(document)[_0xd196('0xb2')](function(_0x5c2d91,_0x2c3b12,_0x42cd4b){-0x1<_0x42cd4b[_0xd196('0xb3')][_0xd196('0x11')]()[_0xd196('0x9a')](_0xd196('0xb4'))&&(_0x1cacb8=(_0x42cd4b['url'][_0xd196('0xb5')](/sku\=([0-9]+)/i)||[''])[_0xd196('0xa7')]());});_0x200ad0(window)[_0xd196('0x97')]('productAddedToCart.qdSbbVtex',function(){_0x200ad0(window)['trigger'](_0xd196('0xb1'),[new _0x200ad0(),_0x1cacb8]);});_0x200ad0(document)['ajaxStop'](function(){_0x1bb74d[_0xd196('0x46')]();});}catch(_0x215027){_0xd196('0x4')!==typeof console&&'function'===typeof console[_0xd196('0x15')]&&console[_0xd196('0x15')](_0xd196('0x68'),_0x215027);}}(this));function qd_number_format(_0x399f22,_0x4c9bf7,_0x1686fb,_0x85f91d){_0x399f22=(_0x399f22+'')[_0xd196('0x2')](/[^0-9+\-Ee.]/g,'');_0x399f22=isFinite(+_0x399f22)?+_0x399f22:0x0;_0x4c9bf7=isFinite(+_0x4c9bf7)?Math[_0xd196('0x3')](_0x4c9bf7):0x0;_0x85f91d=_0xd196('0x4')===typeof _0x85f91d?',':_0x85f91d;_0x1686fb='undefined'===typeof _0x1686fb?'.':_0x1686fb;var _0x162ed3='',_0x162ed3=function(_0x254d23,_0x962902){var _0x21a8ed=Math['pow'](0xa,_0x962902);return''+(Math['round'](_0x254d23*_0x21a8ed)/_0x21a8ed)[_0xd196('0x6')](_0x962902);},_0x162ed3=(_0x4c9bf7?_0x162ed3(_0x399f22,_0x4c9bf7):''+Math[_0xd196('0x5')](_0x399f22))[_0xd196('0x7')]('.');0x3<_0x162ed3[0x0][_0xd196('0x8')]&&(_0x162ed3[0x0]=_0x162ed3[0x0][_0xd196('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x85f91d));(_0x162ed3[0x1]||'')[_0xd196('0x8')]<_0x4c9bf7&&(_0x162ed3[0x1]=_0x162ed3[0x1]||'',_0x162ed3[0x1]+=Array(_0x4c9bf7-_0x162ed3[0x1][_0xd196('0x8')]+0x1)['join']('0'));return _0x162ed3['join'](_0x1686fb);}(function(){try{window[_0xd196('0x3b')]=window['_QuatroDigital_CartData']||{},window['_QuatroDigital_CartData']['callback']=window[_0xd196('0x3b')][_0xd196('0x47')]||$[_0xd196('0x6b')]();}catch(_0x56efa6){_0xd196('0x4')!==typeof console&&_0xd196('0xa')===typeof console[_0xd196('0x15')]&&console['error'](_0xd196('0x68'),_0x56efa6[_0xd196('0xb6')]);}}());(function(_0x53a56c){try{var _0x24989f=jQuery,_0x14259c=function(_0xe3b7d,_0x5d56b5){if(_0xd196('0x18')===typeof console&&'undefined'!==typeof console['error']&&_0xd196('0x4')!==typeof console[_0xd196('0x30')]&&_0xd196('0x4')!==typeof console[_0xd196('0x2f')]){var _0x5fa647;_0xd196('0x18')===typeof _0xe3b7d?(_0xe3b7d[_0xd196('0x6c')](_0xd196('0xb7')),_0x5fa647=_0xe3b7d):_0x5fa647=[_0xd196('0xb7')+_0xe3b7d];if('undefined'===typeof _0x5d56b5||_0xd196('0x2e')!==_0x5d56b5[_0xd196('0x11')]()&&_0xd196('0xb8')!==_0x5d56b5[_0xd196('0x11')]())if(_0xd196('0x4')!==typeof _0x5d56b5&&'info'===_0x5d56b5[_0xd196('0x11')]())try{console[_0xd196('0x30')][_0xd196('0x6e')](console,_0x5fa647);}catch(_0x3d2639){try{console[_0xd196('0x30')](_0x5fa647[_0xd196('0x9')]('\x0a'));}catch(_0x1f67fc){}}else try{console[_0xd196('0x15')][_0xd196('0x6e')](console,_0x5fa647);}catch(_0x510341){try{console['error'](_0x5fa647[_0xd196('0x9')]('\x0a'));}catch(_0x908bbf){}}else try{console[_0xd196('0x2f')][_0xd196('0x6e')](console,_0x5fa647);}catch(_0x46263a){try{console[_0xd196('0x2f')](_0x5fa647[_0xd196('0x9')]('\x0a'));}catch(_0x1b6dc7){}}}};window[_0xd196('0x5d')]=window[_0xd196('0x5d')]||{};window[_0xd196('0x5d')][_0xd196('0x93')]=!0x0;_0x24989f['QD_dropDownCart']=function(){};_0x24989f['fn'][_0xd196('0xb9')]=function(){return{'fn':new _0x24989f()};};var _0x39d081=function(_0x53f55b){var _0x33df12={'i':_0xd196('0xba')};return function(_0x4e6be3){var _0x132360=function(_0x404e7c){return _0x404e7c;};var _0x325dcb=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4e6be3=_0x4e6be3['d'+_0x325dcb[0x10]+'c'+_0x325dcb[0x11]+'m'+_0x132360(_0x325dcb[0x1])+'n'+_0x325dcb[0xd]]['l'+_0x325dcb[0x12]+'c'+_0x325dcb[0x0]+'ti'+_0x132360('o')+'n'];var _0x2b71f0=function(_0x5ac7b1){return escape(encodeURIComponent(_0x5ac7b1[_0xd196('0x2')](/\./g,'¨')[_0xd196('0x2')](/[a-zA-Z]/g,function(_0x1d54e7){return String[_0xd196('0xbb')](('Z'>=_0x1d54e7?0x5a:0x7a)>=(_0x1d54e7=_0x1d54e7[_0xd196('0xbc')](0x0)+0xd)?_0x1d54e7:_0x1d54e7-0x1a);})));};var _0x53a56c=_0x2b71f0(_0x4e6be3[[_0x325dcb[0x9],_0x132360('o'),_0x325dcb[0xc],_0x325dcb[_0x132360(0xd)]][_0xd196('0x9')]('')]);_0x2b71f0=_0x2b71f0((window[['js',_0x132360('no'),'m',_0x325dcb[0x1],_0x325dcb[0x4]['toUpperCase'](),_0xd196('0xbd')][_0xd196('0x9')]('')]||_0xd196('0x8d'))+['.v',_0x325dcb[0xd],'e',_0x132360('x'),'co',_0x132360('mm'),_0xd196('0xbe'),_0x325dcb[0x1],'.c',_0x132360('o'),'m.',_0x325dcb[0x13],'r'][_0xd196('0x9')](''));for(var _0x202187 in _0x33df12){if(_0x2b71f0===_0x202187+_0x33df12[_0x202187]||_0x53a56c===_0x202187+_0x33df12[_0x202187]){var _0x5e452e='tr'+_0x325dcb[0x11]+'e';break;}_0x5e452e='f'+_0x325dcb[0x0]+'ls'+_0x132360(_0x325dcb[0x1])+'';}_0x132360=!0x1;-0x1<_0x4e6be3[[_0x325dcb[0xc],'e',_0x325dcb[0x0],'rc',_0x325dcb[0x9]]['join']('')][_0xd196('0x9a')](_0xd196('0xbf'))&&(_0x132360=!0x0);return[_0x5e452e,_0x132360];}(_0x53f55b);}(window);if(!eval(_0x39d081[0x0]))return _0x39d081[0x1]?_0x14259c('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x24989f[_0xd196('0xb9')]=function(_0x37b3e0,_0xe1a951){var _0xf90d8a=_0x24989f(_0x37b3e0);if(!_0xf90d8a[_0xd196('0x8')])return _0xf90d8a;var _0x272b1a=_0x24989f['extend'](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':_0xd196('0xc0'),'cartTotal':_0xd196('0xc1'),'emptyCart':_0xd196('0xc2'),'continueShopping':_0xd196('0xc3'),'shippingForm':_0xd196('0xc4')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x581262){return _0x581262[_0xd196('0xc5')]||_0x581262[_0xd196('0xc6')];},'callback':function(){},'callbackProductsList':function(){}},_0xe1a951);_0x24989f('');var _0x3db7fd=this;if(_0x272b1a[_0xd196('0xc7')]){var _0x2ce749=!0x1;_0xd196('0x4')===typeof window['vtexjs']&&(_0x14259c(_0xd196('0xc8')),_0x24989f['ajax']({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':!0x1,'dataType':_0xd196('0xc9'),'error':function(){_0x14259c(_0xd196('0xca'));_0x2ce749=!0x0;}}));if(_0x2ce749)return _0x14259c(_0xd196('0xcb'));}if(_0xd196('0x18')===typeof window[_0xd196('0x6a')]&&_0xd196('0x4')!==typeof window[_0xd196('0x6a')]['checkout'])var _0x274cdb=window['vtexjs']['checkout'];else if('object'===typeof vtex&&'object'===typeof vtex[_0xd196('0x29')]&&_0xd196('0x4')!==typeof vtex['checkout']['SDK'])_0x274cdb=new vtex[(_0xd196('0x29'))]['SDK']();else return _0x14259c('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x3db7fd[_0xd196('0xcc')]=_0xd196('0xcd');var _0x8a24fa=function(_0x214df9){_0x24989f(this)[_0xd196('0x83')](_0x214df9);_0x214df9[_0xd196('0x55')](_0xd196('0xce'))[_0xd196('0x32')](_0x24989f('.qd_ddc_lightBoxOverlay'))['on']('click.qd_ddc_closeFn',function(){_0xf90d8a[_0xd196('0x4f')](_0xd196('0xcf'));_0x24989f(document[_0xd196('0x71')])[_0xd196('0x4f')](_0xd196('0x8b'));});_0x24989f(document)[_0xd196('0xd0')](_0xd196('0xd1'))['on'](_0xd196('0xd1'),function(_0x457e22){0x1b==_0x457e22[_0xd196('0xd2')]&&(_0xf90d8a[_0xd196('0x4f')]('qd-bb-lightBoxProdAdd'),_0x24989f(document[_0xd196('0x71')])['removeClass'](_0xd196('0x8b')));});var _0x53df71=_0x214df9[_0xd196('0x55')](_0xd196('0xd3'));_0x214df9['find']('.qd-ddc-scrollUp')['on'](_0xd196('0xd4'),function(){_0x3db7fd[_0xd196('0xd5')]('-',void 0x0,void 0x0,_0x53df71);return!0x1;});_0x214df9[_0xd196('0x55')](_0xd196('0xd6'))['on'](_0xd196('0xd7'),function(){_0x3db7fd[_0xd196('0xd5')](void 0x0,void 0x0,void 0x0,_0x53df71);return!0x1;});_0x214df9[_0xd196('0x55')]('.qd-ddc-shipping\x20input')['val']('')['on']('keyup.qd_ddc_cep',function(){_0x3db7fd[_0xd196('0xd8')](_0x24989f(this));});if(_0x272b1a['updateOnlyHover']){var _0xe1a951=0x0;_0x24989f(this)['on'](_0xd196('0xd9'),function(){var _0x214df9=function(){window[_0xd196('0x5d')][_0xd196('0x93')]&&(_0x3db7fd[_0xd196('0x91')](),window[_0xd196('0x5d')][_0xd196('0x93')]=!0x1,_0x24989f['fn'][_0xd196('0x28')](!0x0),_0x3db7fd[_0xd196('0xda')]());};_0xe1a951=setInterval(function(){_0x214df9();},0x258);_0x214df9();});_0x24989f(this)['on']('mouseleave.qd_ddc_hover',function(){clearInterval(_0xe1a951);});}};var _0x3ee40d=function(_0x3004fa){_0x3004fa=_0x24989f(_0x3004fa);_0x272b1a[_0xd196('0xdb')][_0xd196('0x58')]=_0x272b1a[_0xd196('0xdb')][_0xd196('0x58')][_0xd196('0x2')](_0xd196('0xdc'),_0xd196('0xdd'));_0x272b1a[_0xd196('0xdb')][_0xd196('0x58')]=_0x272b1a[_0xd196('0xdb')][_0xd196('0x58')][_0xd196('0x2')](_0xd196('0xde'),_0xd196('0xdf'));_0x272b1a['texts'][_0xd196('0x58')]=_0x272b1a[_0xd196('0xdb')][_0xd196('0x58')][_0xd196('0x2')]('#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>');_0x272b1a[_0xd196('0xdb')][_0xd196('0x58')]=_0x272b1a[_0xd196('0xdb')][_0xd196('0x58')]['replace'](_0xd196('0xe0'),_0xd196('0xe1'));_0x3004fa[_0xd196('0x55')]('.qd-ddc-viewCart')[_0xd196('0x52')](_0x272b1a['texts'][_0xd196('0xe2')]);_0x3004fa[_0xd196('0x55')]('.qd_ddc_continueShopping')[_0xd196('0x52')](_0x272b1a['texts']['continueShopping']);_0x3004fa['find']('.qd-ddc-checkout')[_0xd196('0x52')](_0x272b1a[_0xd196('0xdb')]['linkCheckout']);_0x3004fa[_0xd196('0x55')]('.qd-ddc-infoTotal')[_0xd196('0x52')](_0x272b1a[_0xd196('0xdb')][_0xd196('0x58')]);_0x3004fa[_0xd196('0x55')]('.qd-ddc-shipping')['html'](_0x272b1a[_0xd196('0xdb')]['shippingForm']);_0x3004fa[_0xd196('0x55')]('.qd-ddc-emptyCart\x20p')[_0xd196('0x52')](_0x272b1a[_0xd196('0xdb')][_0xd196('0x5b')]);return _0x3004fa;}(this['cartContainer']);var _0x20652c=0x0;_0xf90d8a['each'](function(){0x0<_0x20652c?_0x8a24fa[_0xd196('0x2b')](this,_0x3ee40d[_0xd196('0xe3')]()):_0x8a24fa[_0xd196('0x2b')](this,_0x3ee40d);_0x20652c++;});window[_0xd196('0x3b')][_0xd196('0x47')][_0xd196('0x32')](function(){_0x24989f(_0xd196('0xe4'))[_0xd196('0x52')](window['_QuatroDigital_CartData']['total']||'--');_0x24989f('.qd-ddc-infoTotalItems')[_0xd196('0x52')](window[_0xd196('0x3b')][_0xd196('0x45')]||'0');_0x24989f(_0xd196('0xe5'))[_0xd196('0x52')](window[_0xd196('0x3b')]['shipping']||'--');_0x24989f(_0xd196('0xe6'))[_0xd196('0x52')](window[_0xd196('0x3b')][_0xd196('0x40')]||'--');});var _0x303355=function(_0x3c683e,_0x929a2e){if('undefined'===typeof _0x3c683e[_0xd196('0x43')])return _0x14259c(_0xd196('0xe7'));_0x3db7fd['renderProductsList'][_0xd196('0x2b')](this,_0x929a2e);};_0x3db7fd[_0xd196('0x91')]=function(_0x1fb31b,_0x145efc){'undefined'!=typeof _0x145efc?window[_0xd196('0x5d')][_0xd196('0xe8')]=_0x145efc:window['_QuatroDigital_DropDown'][_0xd196('0xe8')]&&(_0x145efc=window[_0xd196('0x5d')]['dataOptionsCache']);setTimeout(function(){window[_0xd196('0x5d')]['dataOptionsCache']=void 0x0;},_0x272b1a[_0xd196('0x90')]);_0x24989f(_0xd196('0xe9'))['removeClass'](_0xd196('0xea'));if(_0x272b1a['smartCheckout']){var _0xe1a951=function(_0x21fd13){window[_0xd196('0x5d')][_0xd196('0x2a')]=_0x21fd13;_0x303355(_0x21fd13,_0x145efc);'undefined'!==typeof window[_0xd196('0xeb')]&&'function'===typeof window[_0xd196('0xeb')][_0xd196('0xec')]&&window[_0xd196('0xeb')][_0xd196('0xec')]['call'](this);_0x24989f(_0xd196('0xe9'))['addClass'](_0xd196('0xea'));};_0xd196('0x4')!==typeof window[_0xd196('0x5d')][_0xd196('0x2a')]?(_0xe1a951(window[_0xd196('0x5d')][_0xd196('0x2a')]),_0xd196('0xa')===typeof _0x1fb31b&&_0x1fb31b(window[_0xd196('0x5d')][_0xd196('0x2a')])):_0x24989f[_0xd196('0x60')]([_0xd196('0x43'),_0xd196('0x3c'),_0xd196('0x61')],{'done':function(_0x20f4c2){_0xe1a951[_0xd196('0x2b')](this,_0x20f4c2);_0xd196('0xa')===typeof _0x1fb31b&&_0x1fb31b(_0x20f4c2);},'fail':function(_0x4a6dd2){_0x14259c(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0x4a6dd2]);}});}else alert(_0xd196('0xed'));};_0x3db7fd['cartIsEmpty']=function(){var _0x3e3d71=_0x24989f(_0xd196('0xe9'));_0x3e3d71[_0xd196('0x55')](_0xd196('0xee'))['length']?_0x3e3d71[_0xd196('0x4f')]('qd-ddc-noItems'):_0x3e3d71[_0xd196('0x4d')](_0xd196('0xef'));};_0x3db7fd['renderProductsList']=function(_0xada703){var _0xe1a951=_0x24989f(_0xd196('0xf0'));_0xe1a951['empty']();_0xe1a951[_0xd196('0x39')](function(){var _0xe1a951=_0x24989f(this),_0x37b3e0,_0x63fd0,_0x1a5285=_0x24989f(''),_0x417e82;for(_0x417e82 in window[_0xd196('0x5d')][_0xd196('0x2a')][_0xd196('0x43')])if(_0xd196('0x18')===typeof window[_0xd196('0x5d')][_0xd196('0x2a')][_0xd196('0x43')][_0x417e82]){var _0x78c758=window[_0xd196('0x5d')]['getOrderForm'][_0xd196('0x43')][_0x417e82];var _0x509fc4=_0x78c758[_0xd196('0xf1')][_0xd196('0x2')](/^\/|\/$/g,'')[_0xd196('0x7')]('/');var _0x541317=_0x24989f('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0x541317[_0xd196('0x38')]({'data-sku':_0x78c758['id'],'data-sku-index':_0x417e82,'data-qd-departament':_0x509fc4[0x0],'data-qd-category':_0x509fc4[_0x509fc4[_0xd196('0x8')]-0x1]});_0x541317['addClass'](_0xd196('0xf2')+_0x78c758[_0xd196('0xf3')]);_0x541317[_0xd196('0x55')](_0xd196('0xf4'))['append'](_0x272b1a[_0xd196('0xc5')](_0x78c758));_0x541317[_0xd196('0x55')]('.qd-ddc-prodPrice')[_0xd196('0x83')](isNaN(_0x78c758[_0xd196('0xf5')])?_0x78c758[_0xd196('0xf5')]:0x0==_0x78c758[_0xd196('0xf5')]?'Grátis':(_0x24989f(_0xd196('0xf6'))['attr'](_0xd196('0xf7'))||'R$')+'\x20'+qd_number_format(_0x78c758['sellingPrice']/0x64,0x2,',','.'));_0x541317[_0xd196('0x55')]('.qd-ddc-quantity')[_0xd196('0x38')]({'data-sku':_0x78c758['id'],'data-sku-index':_0x417e82})[_0xd196('0xf8')](_0x78c758[_0xd196('0x44')]);_0x541317[_0xd196('0x55')]('.qd-ddc-remove')[_0xd196('0x38')]({'data-sku':_0x78c758['id'],'data-sku-index':_0x417e82});_0x3db7fd['insertProdImg'](_0x78c758['id'],_0x541317[_0xd196('0x55')](_0xd196('0xf9')),_0x78c758['imageUrl']);_0x541317[_0xd196('0x55')](_0xd196('0xfa'))[_0xd196('0x38')]({'data-sku':_0x78c758['id'],'data-sku-index':_0x417e82});_0x541317[_0xd196('0xfb')](_0xe1a951);_0x1a5285=_0x1a5285[_0xd196('0x32')](_0x541317);}try{var _0x3340f4=_0xe1a951[_0xd196('0x0')](_0xd196('0xe9'))['find'](_0xd196('0xfc'));_0x3340f4[_0xd196('0x8')]&&''==_0x3340f4[_0xd196('0xf8')]()&&window[_0xd196('0x5d')][_0xd196('0x2a')][_0xd196('0x61')]['address']&&_0x3340f4[_0xd196('0xf8')](window[_0xd196('0x5d')]['getOrderForm'][_0xd196('0x61')][_0xd196('0xfd')][_0xd196('0xfe')]);}catch(_0x2c255f){_0x14259c(_0xd196('0xff')+_0x2c255f[_0xd196('0xb6')],_0xd196('0xb8'));}_0x3db7fd[_0xd196('0x100')](_0xe1a951);_0x3db7fd[_0xd196('0xda')]();_0xada703&&_0xada703['lastSku']&&function(){_0x63fd0=_0x1a5285[_0xd196('0x49')](_0xd196('0x101')+_0xada703['lastSku']+'\x27]');_0x63fd0[_0xd196('0x8')]&&(_0x37b3e0=0x0,_0x1a5285[_0xd196('0x39')](function(){var _0xada703=_0x24989f(this);if(_0xada703['is'](_0x63fd0))return!0x1;_0x37b3e0+=_0xada703[_0xd196('0x102')]();}),_0x3db7fd[_0xd196('0xd5')](void 0x0,void 0x0,_0x37b3e0,_0xe1a951[_0xd196('0x32')](_0xe1a951['parent']())),_0x1a5285[_0xd196('0x4f')]('qd-ddc-lastAddedFixed'),function(_0x1e93e7){_0x1e93e7[_0xd196('0x4d')](_0xd196('0x103'));_0x1e93e7[_0xd196('0x4d')](_0xd196('0x104'));setTimeout(function(){_0x1e93e7['removeClass'](_0xd196('0x103'));},_0x272b1a[_0xd196('0x90')]);}(_0x63fd0));}();});(function(){_QuatroDigital_DropDown[_0xd196('0x2a')][_0xd196('0x43')][_0xd196('0x8')]?(_0x24989f(_0xd196('0x71'))[_0xd196('0x4f')](_0xd196('0x105'))[_0xd196('0x4d')]('qd-ddc-cart-rendered\x20qd-ddc-product-add-time'),setTimeout(function(){_0x24989f(_0xd196('0x71'))[_0xd196('0x4f')](_0xd196('0x106'));},_0x272b1a['timeRemoveNewItemClass'])):_0x24989f(_0xd196('0x71'))[_0xd196('0x4f')]('qd-ddc-cart-rendered')[_0xd196('0x4d')]('qd-ddc-cart-empty');}());_0xd196('0xa')===typeof _0x272b1a[_0xd196('0x107')]?_0x272b1a[_0xd196('0x107')][_0xd196('0x2b')](this):_0x14259c('callbackProductsList\x20não\x20é\x20uma\x20função');};_0x3db7fd['insertProdImg']=function(_0xe39981,_0x1a3ade,_0x21ab75){function _0x4368b4(){_0x1a3ade[_0xd196('0x4f')](_0xd196('0x108'))[_0xd196('0x99')](function(){_0x24989f(this)['addClass']('qd-loaded');})['attr']('src',_0x21ab75);}_0x21ab75?_0x4368b4():isNaN(_0xe39981)?_0x14259c('Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU',_0xd196('0x2e')):alert(_0xd196('0x109'));};_0x3db7fd[_0xd196('0x100')]=function(_0x194de0){var _0x453302=function(_0x4b1a70,_0x6213a7){var _0xe1a951=_0x24989f(_0x4b1a70);var _0x3c2c83=_0xe1a951['attr'](_0xd196('0x10a'));var _0x37b3e0=_0xe1a951[_0xd196('0x38')](_0xd196('0x10b'));if(_0x3c2c83){var _0x37fcac=parseInt(_0xe1a951[_0xd196('0xf8')]())||0x1;_0x3db7fd['changeQantity']([_0x3c2c83,_0x37b3e0],_0x37fcac,_0x37fcac+0x1,function(_0x52a4de){_0xe1a951[_0xd196('0xf8')](_0x52a4de);_0xd196('0xa')===typeof _0x6213a7&&_0x6213a7();});}};var _0xe1a951=function(_0x631228,_0x1e893f){var _0xe1a951=_0x24989f(_0x631228);var _0x314a0e=_0xe1a951[_0xd196('0x38')]('data-sku');var _0x37b3e0=_0xe1a951['attr'](_0xd196('0x10b'));if(_0x314a0e){var _0x21dcc7=parseInt(_0xe1a951['val']())||0x2;_0x3db7fd[_0xd196('0x10c')]([_0x314a0e,_0x37b3e0],_0x21dcc7,_0x21dcc7-0x1,function(_0x4a040a){_0xe1a951[_0xd196('0xf8')](_0x4a040a);_0xd196('0xa')===typeof _0x1e893f&&_0x1e893f();});}};var _0x3bd400=function(_0x507dd3,_0x3fac90){var _0xe1a951=_0x24989f(_0x507dd3);var _0x4bf8af=_0xe1a951[_0xd196('0x38')](_0xd196('0x10a'));var _0x37b3e0=_0xe1a951[_0xd196('0x38')]('data-sku-index');if(_0x4bf8af){var _0x89f271=parseInt(_0xe1a951['val']())||0x1;_0x3db7fd[_0xd196('0x10c')]([_0x4bf8af,_0x37b3e0],0x1,_0x89f271,function(_0x1110f7){_0xe1a951[_0xd196('0xf8')](_0x1110f7);_0xd196('0xa')===typeof _0x3fac90&&_0x3fac90();});}};var _0x37b3e0=_0x194de0['find']('.qd-ddc-prodQttWrapper:not(.qd_on)');_0x37b3e0[_0xd196('0x4d')]('qd_on')[_0xd196('0x39')](function(){var _0x194de0=_0x24989f(this);_0x194de0['find'](_0xd196('0x10d'))['on']('click.qd_ddc_more',function(_0x3081bc){_0x3081bc[_0xd196('0x7b')]();_0x37b3e0[_0xd196('0x4d')](_0xd196('0x10e'));_0x453302(_0x194de0['find'](_0xd196('0x10f')),function(){_0x37b3e0[_0xd196('0x4f')]('qd-loading');});});_0x194de0[_0xd196('0x55')](_0xd196('0x110'))['on'](_0xd196('0x111'),function(_0x1cbcca){_0x1cbcca[_0xd196('0x7b')]();_0x37b3e0[_0xd196('0x4d')](_0xd196('0x10e'));_0xe1a951(_0x194de0[_0xd196('0x55')](_0xd196('0x10f')),function(){_0x37b3e0['removeClass'](_0xd196('0x10e'));});});_0x194de0[_0xd196('0x55')](_0xd196('0x10f'))['on'](_0xd196('0x112'),function(){_0x37b3e0[_0xd196('0x4d')](_0xd196('0x10e'));_0x3bd400(this,function(){_0x37b3e0[_0xd196('0x4f')](_0xd196('0x10e'));});});_0x194de0['find']('.qd-ddc-quantity')['on'](_0xd196('0x113'),function(_0x98ff4d){0xd==_0x98ff4d[_0xd196('0xd2')]&&(_0x37b3e0[_0xd196('0x4d')](_0xd196('0x10e')),_0x3bd400(this,function(){_0x37b3e0[_0xd196('0x4f')](_0xd196('0x10e'));}));});});_0x194de0[_0xd196('0x55')](_0xd196('0xee'))['each'](function(){var _0x194de0=_0x24989f(this);_0x194de0[_0xd196('0x55')](_0xd196('0x114'))['on'](_0xd196('0x115'),function(){_0x194de0['addClass'](_0xd196('0x10e'));_0x3db7fd['removeProduct'](_0x24989f(this),function(_0x53a34a){_0x53a34a?_0x194de0['stop'](!0x0)['slideUp'](function(){_0x194de0[_0xd196('0x116')]();_0x3db7fd['cartIsEmpty']();}):_0x194de0['removeClass'](_0xd196('0x10e'));});return!0x1;});});};_0x3db7fd[_0xd196('0xd8')]=function(_0x4e6b2f){var _0x28bc7b=_0x4e6b2f['val'](),_0x28bc7b=_0x28bc7b[_0xd196('0x2')](/[^0-9\-]/g,''),_0x28bc7b=_0x28bc7b[_0xd196('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0xd196('0x117')),_0x28bc7b=_0x28bc7b[_0xd196('0x2')](/(.{9}).*/g,'$1');_0x4e6b2f[_0xd196('0xf8')](_0x28bc7b);0x9<=_0x28bc7b[_0xd196('0x8')]&&(_0x4e6b2f[_0xd196('0x1a')](_0xd196('0x118'))!=_0x28bc7b&&_0x274cdb[_0xd196('0x119')]({'postalCode':_0x28bc7b,'country':_0xd196('0x11a')})[_0xd196('0x1f')](function(_0x522457){window[_0xd196('0x5d')][_0xd196('0x2a')]=_0x522457;_0x3db7fd[_0xd196('0x91')]();})[_0xd196('0x21')](function(_0x533cd3){_0x14259c(['Não\x20foi\x20possível\x20calcular\x20o\x20frete',_0x533cd3]);updateCartData();}),_0x4e6b2f['data'](_0xd196('0x118'),_0x28bc7b));};_0x3db7fd[_0xd196('0x10c')]=function(_0x3e69f6,_0x1d0392,_0xe6a900,_0x2080b4){function _0x4cacb5(_0x3d24f7){_0x3d24f7=_0xd196('0x11b')!==typeof _0x3d24f7?!0x1:_0x3d24f7;_0x3db7fd['getCartInfoByUrl']();window[_0xd196('0x5d')][_0xd196('0x93')]=!0x1;_0x3db7fd['cartIsEmpty']();_0xd196('0x4')!==typeof window[_0xd196('0xeb')]&&_0xd196('0xa')===typeof window['_QuatroDigital_AmountProduct'][_0xd196('0xec')]&&window[_0xd196('0xeb')][_0xd196('0xec')][_0xd196('0x2b')](this);'function'===typeof adminCart&&adminCart();_0x24989f['fn'][_0xd196('0x28')](!0x0,void 0x0,_0x3d24f7);'function'===typeof _0x2080b4&&_0x2080b4(_0x1d0392);}_0xe6a900=_0xe6a900||0x1;if(0x1>_0xe6a900)return _0x1d0392;if(_0x272b1a[_0xd196('0xc7')]){if('undefined'===typeof window[_0xd196('0x5d')]['getOrderForm']['items'][_0x3e69f6[0x1]])return _0x14259c(_0xd196('0x11c')+_0x3e69f6[0x1]+']'),_0x1d0392;window[_0xd196('0x5d')][_0xd196('0x2a')]['items'][_0x3e69f6[0x1]][_0xd196('0x44')]=_0xe6a900;window['_QuatroDigital_DropDown'][_0xd196('0x2a')][_0xd196('0x43')][_0x3e69f6[0x1]][_0xd196('0x11d')]=_0x3e69f6[0x1];_0x274cdb[_0xd196('0x11e')]([window['_QuatroDigital_DropDown'][_0xd196('0x2a')][_0xd196('0x43')][_0x3e69f6[0x1]]],['items',_0xd196('0x3c'),_0xd196('0x61')])[_0xd196('0x1f')](function(_0x31f1e8){window['_QuatroDigital_DropDown'][_0xd196('0x2a')]=_0x31f1e8;_0x4cacb5(!0x0);})[_0xd196('0x21')](function(_0x4ae684){_0x14259c([_0xd196('0x11f'),_0x4ae684]);_0x4cacb5();});}else _0x14259c('atenção\x20esta\x20método\x20esta\x20descontinuado');};_0x3db7fd[_0xd196('0x120')]=function(_0x56bcaa,_0xd5aa5f){function _0x820a90(_0x13bbd5){_0x13bbd5=_0xd196('0x11b')!==typeof _0x13bbd5?!0x1:_0x13bbd5;_0xd196('0x4')!==typeof window['_QuatroDigital_AmountProduct']&&_0xd196('0xa')===typeof window[_0xd196('0xeb')][_0xd196('0xec')]&&window[_0xd196('0xeb')][_0xd196('0xec')]['call'](this);_0xd196('0xa')===typeof adminCart&&adminCart();_0x24989f['fn']['simpleCart'](!0x0,void 0x0,_0x13bbd5);_0xd196('0xa')===typeof _0xd5aa5f&&_0xd5aa5f(_0x37b3e0);}var _0x37b3e0=!0x1,_0x3348a8=_0x24989f(_0x56bcaa)[_0xd196('0x38')]('data-sku-index');if(_0x272b1a[_0xd196('0xc7')]){if(_0xd196('0x4')===typeof window['_QuatroDigital_DropDown']['getOrderForm']['items'][_0x3348a8])return _0x14259c('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x3348a8+']'),_0x37b3e0;window['_QuatroDigital_DropDown']['getOrderForm'][_0xd196('0x43')][_0x3348a8][_0xd196('0x11d')]=_0x3348a8;_0x274cdb[_0xd196('0x121')]([window[_0xd196('0x5d')]['getOrderForm'][_0xd196('0x43')][_0x3348a8]],[_0xd196('0x43'),'totalizers','shippingData'])[_0xd196('0x1f')](function(_0x5f402c){_0x37b3e0=!0x0;window[_0xd196('0x5d')]['getOrderForm']=_0x5f402c;_0x303355(_0x5f402c);_0x820a90(!0x0);})[_0xd196('0x21')](function(_0xd11ffb){_0x14259c([_0xd196('0x122'),_0xd11ffb]);_0x820a90();});}else alert(_0xd196('0x123'));};_0x3db7fd[_0xd196('0xd5')]=function(_0x1bc592,_0x177840,_0x3fd367,_0x2bca69){_0x2bca69=_0x2bca69||_0x24989f(_0xd196('0x124'));_0x1bc592=_0x1bc592||'+';_0x177840=_0x177840||0.9*_0x2bca69[_0xd196('0x125')]();_0x2bca69['stop'](!0x0,!0x0)[_0xd196('0x126')]({'scrollTop':isNaN(_0x3fd367)?_0x1bc592+'='+_0x177840+'px':_0x3fd367});};_0x272b1a['updateOnlyHover']||(_0x3db7fd['getCartInfoByUrl'](),_0x24989f['fn']['simpleCart'](!0x0));_0x24989f(window)['on'](_0xd196('0x127'),function(){try{window[_0xd196('0x5d')][_0xd196('0x2a')]=void 0x0,_0x3db7fd[_0xd196('0x91')]();}catch(_0x249dae){_0x14259c(_0xd196('0x128')+_0x249dae['message'],_0xd196('0x129'));}});_0xd196('0xa')===typeof _0x272b1a['callback']?_0x272b1a[_0xd196('0x47')]['call'](this):_0x14259c(_0xd196('0xaf'));};_0x24989f['fn'][_0xd196('0xb9')]=function(_0x577c3b){var _0x4ddb41=_0x24989f(this);_0x4ddb41['fn']=new _0x24989f[(_0xd196('0xb9'))](this,_0x577c3b);return _0x4ddb41;};}catch(_0x2fb732){_0xd196('0x4')!==typeof console&&'function'===typeof console['error']&&console['error'](_0xd196('0x68'),_0x2fb732);}}(this));(function(_0x143e6d){try{var _0x18d10e=jQuery;window[_0xd196('0xeb')]=window[_0xd196('0xeb')]||{};window[_0xd196('0xeb')][_0xd196('0x43')]={};window[_0xd196('0xeb')][_0xd196('0x12a')]=!0x1;window[_0xd196('0xeb')][_0xd196('0x12b')]=!0x1;window['_QuatroDigital_AmountProduct'][_0xd196('0x12c')]=!0x1;var _0x1630ec=function(){if(window['_QuatroDigital_AmountProduct'][_0xd196('0x12a')]){var _0x335480=!0x1;var _0x143e6d={};window[_0xd196('0xeb')][_0xd196('0x43')]={};for(_0xc4c38d in window[_0xd196('0x5d')]['getOrderForm'][_0xd196('0x43')])if('object'===typeof window[_0xd196('0x5d')][_0xd196('0x2a')][_0xd196('0x43')][_0xc4c38d]){var _0x3189e5=window[_0xd196('0x5d')]['getOrderForm'][_0xd196('0x43')][_0xc4c38d];_0xd196('0x4')!==typeof _0x3189e5[_0xd196('0x12d')]&&null!==_0x3189e5['productId']&&''!==_0x3189e5[_0xd196('0x12d')]&&(window[_0xd196('0xeb')]['items'][_0xd196('0x12e')+_0x3189e5[_0xd196('0x12d')]]=window[_0xd196('0xeb')][_0xd196('0x43')][_0xd196('0x12e')+_0x3189e5[_0xd196('0x12d')]]||{},window['_QuatroDigital_AmountProduct'][_0xd196('0x43')][_0xd196('0x12e')+_0x3189e5[_0xd196('0x12d')]][_0xd196('0x12f')]=_0x3189e5[_0xd196('0x12d')],_0x143e6d[_0xd196('0x12e')+_0x3189e5[_0xd196('0x12d')]]||(window[_0xd196('0xeb')]['items'][_0xd196('0x12e')+_0x3189e5['productId']][_0xd196('0x45')]=0x0),window[_0xd196('0xeb')][_0xd196('0x43')]['prod_'+_0x3189e5[_0xd196('0x12d')]][_0xd196('0x45')]+=_0x3189e5['quantity'],_0x335480=!0x0,_0x143e6d[_0xd196('0x12e')+_0x3189e5[_0xd196('0x12d')]]=!0x0);}var _0xc4c38d=_0x335480;}else _0xc4c38d=void 0x0;window[_0xd196('0xeb')]['allowRecalculate']&&(_0x18d10e(_0xd196('0x130'))[_0xd196('0x116')](),_0x18d10e('.qd-bap-item-added')[_0xd196('0x4f')](_0xd196('0x131')));for(var _0x1e972d in window[_0xd196('0xeb')]['items']){_0x3189e5=window[_0xd196('0xeb')][_0xd196('0x43')][_0x1e972d];if(_0xd196('0x18')!==typeof _0x3189e5)return;_0x143e6d=_0x18d10e('input.qd-productId[value='+_0x3189e5[_0xd196('0x12f')]+']')[_0xd196('0x0')]('li');if(window[_0xd196('0xeb')][_0xd196('0x12a')]||!_0x143e6d[_0xd196('0x55')](_0xd196('0x130'))[_0xd196('0x8')])_0x335480=_0x18d10e(_0xd196('0x132')),_0x335480[_0xd196('0x55')](_0xd196('0x133'))[_0xd196('0x52')](_0x3189e5[_0xd196('0x45')]),_0x3189e5=_0x143e6d['find']('.qd_bap_wrapper_content'),_0x3189e5[_0xd196('0x8')]?_0x3189e5[_0xd196('0x134')](_0x335480)[_0xd196('0x4d')]('qd-bap-item-added'):_0x143e6d['prepend'](_0x335480);}_0xc4c38d&&(window[_0xd196('0xeb')]['allowRecalculate']=!0x1);};window[_0xd196('0xeb')][_0xd196('0xec')]=function(){window[_0xd196('0xeb')][_0xd196('0x12a')]=!0x0;_0x1630ec[_0xd196('0x2b')](this);};_0x18d10e(document)['ajaxStop'](function(){_0x1630ec[_0xd196('0x2b')](this);});}catch(_0x32b45f){'undefined'!==typeof console&&_0xd196('0xa')===typeof console['error']&&console['error'](_0xd196('0x68'),_0x32b45f);}}(this));(function(){try{var _0xd3cf4d=jQuery,_0x248490,_0x1989d7={'selector':_0xd196('0x135'),'dropDown':{},'buyButton':{}};_0xd3cf4d[_0xd196('0x136')]=function(_0x250d65){var _0x4bdc55={};_0x248490=_0xd3cf4d['extend'](!0x0,{},_0x1989d7,_0x250d65);_0x250d65=_0xd3cf4d(_0x248490[_0xd196('0x88')])[_0xd196('0xb9')](_0x248490['dropDown']);_0x4bdc55[_0xd196('0x7c')]=_0xd196('0x4')!==typeof _0x248490['dropDown'][_0xd196('0x137')]&&!0x1===_0x248490[_0xd196('0x138')][_0xd196('0x137')]?_0xd3cf4d(_0x248490[_0xd196('0x88')])[_0xd196('0x77')](_0x250d65['fn'],_0x248490[_0xd196('0x7c')]):_0xd3cf4d(_0x248490['selector'])['QD_buyButton'](_0x248490[_0xd196('0x7c')]);_0x4bdc55[_0xd196('0x138')]=_0x250d65;return _0x4bdc55;};_0xd3cf4d['fn'][_0xd196('0x139')]=function(){_0xd196('0x18')===typeof console&&'function'===typeof console[_0xd196('0x30')]&&console[_0xd196('0x30')](_0xd196('0x13a'));};_0xd3cf4d[_0xd196('0x139')]=_0xd3cf4d['fn'][_0xd196('0x139')];}catch(_0x73aa94){'undefined'!==typeof console&&_0xd196('0xa')===typeof console[_0xd196('0x15')]&&console[_0xd196('0x15')](_0xd196('0x68'),_0x73aa94);}}());
/* Quatro Digital - Smart Stock Available */
var _0xe4e7=['.qd_smart_stock_available_auto','qdAjax','/produto/sku/','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','function','QD_smartStockAvailable','object','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','undefined','toLowerCase','aviso','info','error','warn','apply','qd-ssa-sku-no-selected','addClass','qd-ssa-sku-selected','SkuSellersInformation','attr','data-qd-ssa-qtt','each','find','[data-qd-ssa-text]','hide','qd-ssa-show','filter','[data-qd-ssa-text=\x22','length','[data-qd-ssa-text=\x22default\x22]','qd-ssa-hide','html','replace','#qtt','show','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','message','qd-ssa-on','skus','split','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','AvailableQuantity','trigger','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','off','QuatroDigital.ssa.prodUnavailable','qd-ssa-sku-prod-unavailable','vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','join','toUpperCase','ite','---','erc','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','qdPlugin','initialSkuSelected','prod','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','unavailable','vtex.sku.selected.QD','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','available','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20'];(function(_0x46c8f7,_0x417fd0){var _0x45afec=function(_0x5bd5d4){while(--_0x5bd5d4){_0x46c8f7['push'](_0x46c8f7['shift']());}};_0x45afec(++_0x417fd0);}(_0xe4e7,0x119));var _0x7e4e=function(_0x1e6399,_0x50b8fb){_0x1e6399=_0x1e6399-0x0;var _0x211c25=_0xe4e7[_0x1e6399];return _0x211c25;};(function(_0x400944){function _0x126338(_0x3f64d7,_0x2a21a3){_0x12445c[_0x7e4e('0x0')]({'url':_0x7e4e('0x1')+_0x3f64d7,'clearQueueDelay':null,'success':_0x2a21a3,'error':function(){_0x32a8aa(_0x7e4e('0x2'));}});}var _0x12445c=jQuery;if(_0x7e4e('0x3')!==typeof _0x12445c['fn'][_0x7e4e('0x4')]){var _0x32a8aa=function(_0x250788,_0x25784d){if(_0x7e4e('0x5')===typeof console){var _0xdba0d;_0x7e4e('0x5')===typeof _0x250788?(_0x250788[_0x7e4e('0x6')](_0x7e4e('0x7')),_0xdba0d=_0x250788):_0xdba0d=[_0x7e4e('0x7')+_0x250788];_0x7e4e('0x8')===typeof _0x25784d||'alerta'!==_0x25784d[_0x7e4e('0x9')]()&&_0x7e4e('0xa')!==_0x25784d[_0x7e4e('0x9')]()?_0x7e4e('0x8')!==typeof _0x25784d&&'info'===_0x25784d[_0x7e4e('0x9')]()?console[_0x7e4e('0xb')]['apply'](console,_0xdba0d):console[_0x7e4e('0xc')]['apply'](console,_0xdba0d):console[_0x7e4e('0xd')][_0x7e4e('0xe')](console,_0xdba0d);}},_0x300d3c={},_0xb00c35=function(_0x2e0789,_0x2da2f7){function _0x46d0ab(_0x482549){try{_0x2e0789['removeClass'](_0x7e4e('0xf'))[_0x7e4e('0x10')](_0x7e4e('0x11'));var _0x22863b=_0x482549[0x0][_0x7e4e('0x12')][0x0]['AvailableQuantity'];_0x2e0789[_0x7e4e('0x13')](_0x7e4e('0x14'),_0x22863b);_0x2e0789[_0x7e4e('0x15')](function(){var _0x2e0789=_0x12445c(this)[_0x7e4e('0x16')](_0x7e4e('0x17'));if(0x1>_0x22863b)return _0x2e0789[_0x7e4e('0x18')]()[_0x7e4e('0x10')]('qd-ssa-hide')['removeClass'](_0x7e4e('0x19'));var _0x482549=_0x2e0789[_0x7e4e('0x1a')](_0x7e4e('0x1b')+_0x22863b+'\x22]'),_0x482549=_0x482549[_0x7e4e('0x1c')]?_0x482549:_0x2e0789['filter'](_0x7e4e('0x1d'));_0x2e0789[_0x7e4e('0x18')]()[_0x7e4e('0x10')](_0x7e4e('0x1e'))['removeClass'](_0x7e4e('0x19'));_0x482549['html'](_0x482549[_0x7e4e('0x1f')]()[_0x7e4e('0x20')](_0x7e4e('0x21'),_0x22863b));_0x482549[_0x7e4e('0x22')]()[_0x7e4e('0x10')](_0x7e4e('0x19'))['removeClass'](_0x7e4e('0x1e'));});}catch(_0x54de31){_0x32a8aa([_0x7e4e('0x23'),_0x54de31[_0x7e4e('0x24')]]);}}if(_0x2e0789[_0x7e4e('0x1c')]){_0x2e0789['addClass'](_0x7e4e('0x25'));_0x2e0789[_0x7e4e('0x10')](_0x7e4e('0xf'));try{_0x2e0789[_0x7e4e('0x10')]('qd-ssa-skus-'+vtxctx[_0x7e4e('0x26')][_0x7e4e('0x27')](';')[_0x7e4e('0x1c')]);}catch(_0x1abe29){_0x32a8aa([_0x7e4e('0x28'),_0x1abe29[_0x7e4e('0x24')]]);}_0x12445c(window)['on'](_0x7e4e('0x29'),function(_0x1c8ecc,_0x42c233,_0x2a01ff){try{_0x126338(_0x2a01ff[_0x7e4e('0x2a')],function(_0x1cc697){_0x46d0ab(_0x1cc697);0x1===vtxctx[_0x7e4e('0x26')][_0x7e4e('0x27')](';')['length']&&0x0==_0x1cc697[0x0][_0x7e4e('0x12')][0x0][_0x7e4e('0x2b')]&&_0x12445c(window)[_0x7e4e('0x2c')]('QuatroDigital.ssa.prodUnavailable');});}catch(_0x235848){_0x32a8aa([_0x7e4e('0x2d'),_0x235848['message']]);}});_0x12445c(window)[_0x7e4e('0x2e')]('vtex.sku.selected.QD');_0x12445c(window)['on'](_0x7e4e('0x2f'),function(){_0x2e0789['addClass'](_0x7e4e('0x30'))[_0x7e4e('0x18')]();});}};_0x400944=function(_0x2febae){var _0x1a0f23={'i':_0x7e4e('0x31')};return function(_0x214b36){var _0x375545=function(_0x5ddcd7){return _0x5ddcd7;};var _0x2ab9cf=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x214b36=_0x214b36['d'+_0x2ab9cf[0x10]+'c'+_0x2ab9cf[0x11]+'m'+_0x375545(_0x2ab9cf[0x1])+'n'+_0x2ab9cf[0xd]]['l'+_0x2ab9cf[0x12]+'c'+_0x2ab9cf[0x0]+'ti'+_0x375545('o')+'n'];var _0x198b4f=function(_0x4fe3a6){return escape(encodeURIComponent(_0x4fe3a6['replace'](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x6aab9b){return String[_0x7e4e('0x32')](('Z'>=_0x6aab9b?0x5a:0x7a)>=(_0x6aab9b=_0x6aab9b[_0x7e4e('0x33')](0x0)+0xd)?_0x6aab9b:_0x6aab9b-0x1a);})));};var _0x555720=_0x198b4f(_0x214b36[[_0x2ab9cf[0x9],_0x375545('o'),_0x2ab9cf[0xc],_0x2ab9cf[_0x375545(0xd)]][_0x7e4e('0x34')]('')]);_0x198b4f=_0x198b4f((window[['js',_0x375545('no'),'m',_0x2ab9cf[0x1],_0x2ab9cf[0x4][_0x7e4e('0x35')](),_0x7e4e('0x36')][_0x7e4e('0x34')]('')]||_0x7e4e('0x37'))+['.v',_0x2ab9cf[0xd],'e',_0x375545('x'),'co',_0x375545('mm'),_0x7e4e('0x38'),_0x2ab9cf[0x1],'.c',_0x375545('o'),'m.',_0x2ab9cf[0x13],'r']['join'](''));for(var _0x3bcfe7 in _0x1a0f23){if(_0x198b4f===_0x3bcfe7+_0x1a0f23[_0x3bcfe7]||_0x555720===_0x3bcfe7+_0x1a0f23[_0x3bcfe7]){var _0x400944='tr'+_0x2ab9cf[0x11]+'e';break;}_0x400944='f'+_0x2ab9cf[0x0]+'ls'+_0x375545(_0x2ab9cf[0x1])+'';}_0x375545=!0x1;-0x1<_0x214b36[[_0x2ab9cf[0xc],'e',_0x2ab9cf[0x0],'rc',_0x2ab9cf[0x9]]['join']('')]['indexOf']('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x375545=!0x0);return[_0x400944,_0x375545];}(_0x2febae);}(window);if(!eval(_0x400944[0x0]))return _0x400944[0x1]?_0x32a8aa(_0x7e4e('0x39')):!0x1;_0x12445c['fn']['QD_smartStockAvailable']=function(_0x20e055){var _0x3cafd7=_0x12445c(this);_0x20e055=_0x12445c[_0x7e4e('0x3a')](!0x0,{},_0x300d3c,_0x20e055);_0x3cafd7[_0x7e4e('0x3b')]=new _0xb00c35(_0x3cafd7,_0x20e055);try{_0x7e4e('0x5')===typeof _0x12445c['fn'][_0x7e4e('0x4')]['initialSkuSelected']&&_0x12445c(window)[_0x7e4e('0x2c')]('QuatroDigital.ssa.skuSelected',[_0x12445c['fn']['QD_smartStockAvailable'][_0x7e4e('0x3c')][_0x7e4e('0x3d')],_0x12445c['fn'][_0x7e4e('0x4')][_0x7e4e('0x3c')][_0x7e4e('0x2a')]]);}catch(_0x4bed40){_0x32a8aa([_0x7e4e('0x3e'),_0x4bed40[_0x7e4e('0x24')]]);}_0x12445c['fn'][_0x7e4e('0x4')][_0x7e4e('0x3f')]&&_0x12445c(window)[_0x7e4e('0x2c')]('QuatroDigital.ssa.prodUnavailable');return _0x3cafd7;};_0x12445c(window)['on'](_0x7e4e('0x40'),function(_0x333201,_0x1f16c6,_0x330bb1){try{_0x12445c['fn']['QD_smartStockAvailable'][_0x7e4e('0x3c')]={'prod':_0x1f16c6,'sku':_0x330bb1},_0x12445c(this)[_0x7e4e('0x2e')](_0x333201);}catch(_0x13178b){_0x32a8aa([_0x7e4e('0x41'),_0x13178b[_0x7e4e('0x24')]]);}});_0x12445c(window)['on'](_0x7e4e('0x42'),function(_0x5c5b19,_0x3b55cd,_0x95c7dd){try{for(var _0x1ca9de=_0x95c7dd[_0x7e4e('0x1c')],_0xe5a172=_0x3b55cd=0x0;_0xe5a172<_0x1ca9de&&!_0x95c7dd[_0xe5a172][_0x7e4e('0x43')];_0xe5a172++)_0x3b55cd+=0x1;_0x1ca9de<=_0x3b55cd&&(_0x12445c['fn'][_0x7e4e('0x4')][_0x7e4e('0x3f')]=!0x0);_0x12445c(this)['off'](_0x5c5b19);}catch(_0x274028){_0x32a8aa([_0x7e4e('0x44'),_0x274028[_0x7e4e('0x24')]]);}});_0x12445c(function(){_0x12445c(_0x7e4e('0x45'))[_0x7e4e('0x4')]();});}}(window));