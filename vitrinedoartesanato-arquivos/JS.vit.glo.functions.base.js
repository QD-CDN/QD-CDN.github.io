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
			Search.smartResearchInit();
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
		},
		smartResearchInit: function () {
			// $('.search-qd-v1-navigator').css('display', 'none')
			$(".search-qd-v1-navigator input[type='checkbox']").QD_SmartResearch({
				filterScrollTop: function (shelfOffset) {
					return (shelfOffset.top - 80);
				}
			});
			$('.search-qd-v1-navigator').css('display', 'block');
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
			Product.saveAmountFlag();
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
					$(".descontoswestpress").hide();
			}

			/* Esconde Div de especificação caso ela esteja vazia */ 
			if ($("div#caracteristicas").is(":empty")) { $('.product-qd-v1-specification').addClass("hidden"); }


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
		saveAmountFlag: function () {
			var flag = $('.product-qd-v1-stamps-highlight-discount');

			$(window).on('skuSelected.vtex', function (e, sku, data) {
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
var _0x8625=['.qd-am-collection','length','parent','qdAjax','url','html','img[alt=\x27','attr','data-qdam-value','clone','hide','text','trim','[class*=\x27colunas\x27]','insertBefore','qd-am-content-loaded','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','alerta','li\x20>ul','qd-am-has-ul',':not(ul)','qd-am-elem-','replaceSpecialChars','>li','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','children','qd-am-level-','add','qd-am-','-li','callback','trigger','QuatroDigital.am.callback','.qd_amazing_menu_auto','getParent','closest','function','QD_amazingMenu','/qd-amazing-menu','undefined','info','warn','object','unshift','[QD\x20Amazing\x20Menu]\x0a','toLowerCase','apply','join','error','qdAmAddNdx','each','qd-am-li-','first','addClass','qd-am-first','last','vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','.qd-am-banner','filter'];(function(_0x194228,_0x2fc270){var _0x2629f4=function(_0x34e8e6){while(--_0x34e8e6){_0x194228['push'](_0x194228['shift']());}};_0x2629f4(++_0x2fc270);}(_0x8625,0x16b));var _0x5862=function(_0xa148b7,_0x2f3eb2){_0xa148b7=_0xa148b7-0x0;var _0x51efd3=_0x8625[_0xa148b7];return _0x51efd3;};(function(_0x3dc66a){_0x3dc66a['fn'][_0x5862('0x0')]=_0x3dc66a['fn'][_0x5862('0x1')];}(jQuery));(function(_0x460d74){var _0x443803;var _0x55cffb=jQuery;if(_0x5862('0x2')!==typeof _0x55cffb['fn'][_0x5862('0x3')]){var _0x5d757e={'url':_0x5862('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0x54df52=function(_0x5f32c8,_0x6ced1c){if('object'===typeof console&&_0x5862('0x5')!==typeof console['error']&&_0x5862('0x5')!==typeof console[_0x5862('0x6')]&&_0x5862('0x5')!==typeof console[_0x5862('0x7')]){var _0x3cb5ea;_0x5862('0x8')===typeof _0x5f32c8?(_0x5f32c8[_0x5862('0x9')]('[QD\x20Amazing\x20Menu]\x0a'),_0x3cb5ea=_0x5f32c8):_0x3cb5ea=[_0x5862('0xa')+_0x5f32c8];if(_0x5862('0x5')===typeof _0x6ced1c||'alerta'!==_0x6ced1c['toLowerCase']()&&'aviso'!==_0x6ced1c[_0x5862('0xb')]())if(_0x5862('0x5')!==typeof _0x6ced1c&&_0x5862('0x6')===_0x6ced1c[_0x5862('0xb')]())try{console[_0x5862('0x6')][_0x5862('0xc')](console,_0x3cb5ea);}catch(_0x385b21){try{console[_0x5862('0x6')](_0x3cb5ea[_0x5862('0xd')]('\x0a'));}catch(_0x2c081d){}}else try{console[_0x5862('0xe')]['apply'](console,_0x3cb5ea);}catch(_0x34510a){try{console['error'](_0x3cb5ea['join']('\x0a'));}catch(_0x2d6f9f){}}else try{console[_0x5862('0x7')][_0x5862('0xc')](console,_0x3cb5ea);}catch(_0x32e2f8){try{console['warn'](_0x3cb5ea[_0x5862('0xd')]('\x0a'));}catch(_0x2b81b9){}}}};_0x55cffb['fn'][_0x5862('0xf')]=function(){var _0x1ed5a7=_0x55cffb(this);_0x1ed5a7[_0x5862('0x10')](function(_0xe648ab){_0x55cffb(this)['addClass'](_0x5862('0x11')+_0xe648ab);});_0x1ed5a7[_0x5862('0x12')]()[_0x5862('0x13')](_0x5862('0x14'));_0x1ed5a7[_0x5862('0x15')]()[_0x5862('0x13')]('qd-am-last');return _0x1ed5a7;};_0x55cffb['fn'][_0x5862('0x3')]=function(){};_0x460d74=function(_0xfd8cfe){var _0x1aae0f={'i':_0x5862('0x16')};return function(_0x309dca){var _0x5bb41b=function(_0x2fb3e3){return _0x2fb3e3;};var _0x45cb73=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x309dca=_0x309dca['d'+_0x45cb73[0x10]+'c'+_0x45cb73[0x11]+'m'+_0x5bb41b(_0x45cb73[0x1])+'n'+_0x45cb73[0xd]]['l'+_0x45cb73[0x12]+'c'+_0x45cb73[0x0]+'ti'+_0x5bb41b('o')+'n'];var _0x56f305=function(_0x4223e0){return escape(encodeURIComponent(_0x4223e0[_0x5862('0x17')](/\./g,'¨')[_0x5862('0x17')](/[a-zA-Z]/g,function(_0x21fe46){return String[_0x5862('0x18')](('Z'>=_0x21fe46?0x5a:0x7a)>=(_0x21fe46=_0x21fe46[_0x5862('0x19')](0x0)+0xd)?_0x21fe46:_0x21fe46-0x1a);})));};var _0x26f310=_0x56f305(_0x309dca[[_0x45cb73[0x9],_0x5bb41b('o'),_0x45cb73[0xc],_0x45cb73[_0x5bb41b(0xd)]]['join']('')]);_0x56f305=_0x56f305((window[['js',_0x5bb41b('no'),'m',_0x45cb73[0x1],_0x45cb73[0x4][_0x5862('0x1a')](),_0x5862('0x1b')]['join']('')]||_0x5862('0x1c'))+['.v',_0x45cb73[0xd],'e',_0x5bb41b('x'),'co',_0x5bb41b('mm'),_0x5862('0x1d'),_0x45cb73[0x1],'.c',_0x5bb41b('o'),'m.',_0x45cb73[0x13],'r']['join'](''));for(var _0x3be72d in _0x1aae0f){if(_0x56f305===_0x3be72d+_0x1aae0f[_0x3be72d]||_0x26f310===_0x3be72d+_0x1aae0f[_0x3be72d]){var _0xfd6510='tr'+_0x45cb73[0x11]+'e';break;}_0xfd6510='f'+_0x45cb73[0x0]+'ls'+_0x5bb41b(_0x45cb73[0x1])+'';}_0x5bb41b=!0x1;-0x1<_0x309dca[[_0x45cb73[0xc],'e',_0x45cb73[0x0],'rc',_0x45cb73[0x9]]['join']('')][_0x5862('0x1e')](_0x5862('0x1f'))&&(_0x5bb41b=!0x0);return[_0xfd6510,_0x5bb41b];}(_0xfd8cfe);}(window);if(!eval(_0x460d74[0x0]))return _0x460d74[0x1]?_0x54df52(_0x5862('0x20')):!0x1;var _0x4e21d9=function(_0x29eddc){var _0x5612af=_0x29eddc[_0x5862('0x21')](_0x5862('0x22'));var _0x1b52aa=_0x5612af['filter'](_0x5862('0x23'));var _0x295197=_0x5612af[_0x5862('0x24')](_0x5862('0x25'));if(_0x1b52aa['length']||_0x295197[_0x5862('0x26')])_0x1b52aa[_0x5862('0x27')]()['addClass']('qd-am-banner-wrapper'),_0x295197[_0x5862('0x27')]()['addClass']('qd-am-collection-wrapper'),_0x55cffb[_0x5862('0x28')]({'url':_0x443803[_0x5862('0x29')],'dataType':_0x5862('0x2a'),'success':function(_0x3932ce){var _0x170acd=_0x55cffb(_0x3932ce);_0x1b52aa[_0x5862('0x10')](function(){var _0x3932ce=_0x55cffb(this);var _0x11e944=_0x170acd[_0x5862('0x21')](_0x5862('0x2b')+_0x3932ce[_0x5862('0x2c')](_0x5862('0x2d'))+'\x27]');_0x11e944[_0x5862('0x26')]&&(_0x11e944[_0x5862('0x10')](function(){_0x55cffb(this)[_0x5862('0x0')]('.box-banner')[_0x5862('0x2e')]()['insertBefore'](_0x3932ce);}),_0x3932ce[_0x5862('0x2f')]());})['addClass']('qd-am-content-loaded');_0x295197[_0x5862('0x10')](function(){var _0x3932ce={};var _0x1c1f6e=_0x55cffb(this);_0x170acd[_0x5862('0x21')]('h2')[_0x5862('0x10')](function(){if(_0x55cffb(this)[_0x5862('0x30')]()[_0x5862('0x31')]()[_0x5862('0xb')]()==_0x1c1f6e[_0x5862('0x2c')](_0x5862('0x2d'))['trim']()[_0x5862('0xb')]())return _0x3932ce=_0x55cffb(this),!0x1;});_0x3932ce[_0x5862('0x26')]&&(_0x3932ce[_0x5862('0x10')](function(){_0x55cffb(this)[_0x5862('0x0')](_0x5862('0x32'))[_0x5862('0x2e')]()[_0x5862('0x33')](_0x1c1f6e);}),_0x1c1f6e[_0x5862('0x2f')]());})[_0x5862('0x13')](_0x5862('0x34'));},'error':function(){_0x54df52(_0x5862('0x35')+_0x443803[_0x5862('0x29')]+_0x5862('0x36'));},'complete':function(){_0x443803[_0x5862('0x37')][_0x5862('0x38')](this);_0x55cffb(window)['trigger'](_0x5862('0x39'),_0x29eddc);},'clearQueueDelay':0xbb8});};_0x55cffb[_0x5862('0x3')]=function(_0x3735ea){var _0x4e320a=_0x3735ea[_0x5862('0x21')](_0x5862('0x3a'))[_0x5862('0x10')](function(){var _0x934e7b=_0x55cffb(this);if(!_0x934e7b[_0x5862('0x26')])return _0x54df52([_0x5862('0x3b'),_0x3735ea],_0x5862('0x3c'));_0x934e7b[_0x5862('0x21')](_0x5862('0x3d'))[_0x5862('0x27')]()[_0x5862('0x13')](_0x5862('0x3e'));_0x934e7b[_0x5862('0x21')]('li')['each'](function(){var _0x27c258=_0x55cffb(this);var _0x2f130f=_0x27c258['children'](_0x5862('0x3f'));_0x2f130f[_0x5862('0x26')]&&_0x27c258[_0x5862('0x13')](_0x5862('0x40')+_0x2f130f[_0x5862('0x12')]()['text']()[_0x5862('0x31')]()[_0x5862('0x41')]()[_0x5862('0x17')](/\./g,'')[_0x5862('0x17')](/\s/g,'-')['toLowerCase']());});var _0x328d62=_0x934e7b[_0x5862('0x21')](_0x5862('0x42'))['qdAmAddNdx']();_0x934e7b['addClass']('qd-amazing-menu');_0x328d62=_0x328d62[_0x5862('0x21')](_0x5862('0x43'));_0x328d62[_0x5862('0x10')](function(){var _0x4e2c4a=_0x55cffb(this);_0x4e2c4a[_0x5862('0x21')](_0x5862('0x42'))[_0x5862('0xf')]()['addClass'](_0x5862('0x44'));_0x4e2c4a[_0x5862('0x13')](_0x5862('0x45'));_0x4e2c4a['parent']()['addClass'](_0x5862('0x46'));});_0x328d62[_0x5862('0x13')]('qd-am-dropdown');var _0x31a99a=0x0,_0x460d74=function(_0x553903){_0x31a99a+=0x1;_0x553903=_0x553903['children']('li')[_0x5862('0x47')]('*');_0x553903[_0x5862('0x26')]&&(_0x553903[_0x5862('0x13')](_0x5862('0x48')+_0x31a99a),_0x460d74(_0x553903));};_0x460d74(_0x934e7b);_0x934e7b[_0x5862('0x49')](_0x934e7b[_0x5862('0x21')]('ul'))[_0x5862('0x10')](function(){var _0x4049e9=_0x55cffb(this);_0x4049e9[_0x5862('0x13')](_0x5862('0x4a')+_0x4049e9[_0x5862('0x47')]('li')[_0x5862('0x26')]+_0x5862('0x4b'));});});_0x4e21d9(_0x4e320a);_0x443803[_0x5862('0x4c')][_0x5862('0x38')](this);_0x55cffb(window)[_0x5862('0x4d')](_0x5862('0x4e'),_0x3735ea);};_0x55cffb['fn'][_0x5862('0x3')]=function(_0x4991e2){var _0x38e05d=_0x55cffb(this);if(!_0x38e05d['length'])return _0x38e05d;_0x443803=_0x55cffb['extend']({},_0x5d757e,_0x4991e2);_0x38e05d['exec']=new _0x55cffb[(_0x5862('0x3'))](_0x55cffb(this));return _0x38e05d;};_0x55cffb(function(){_0x55cffb(_0x5862('0x4f'))['QD_amazingMenu']();});}}(this));
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
var _0xc21d=['.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','cartContainer','clone','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','.qd-ddc-infoAllTotal','dataOptionsCache','.qd-ddc-wrapper','_QuatroDigital_AmountProduct','qd-ddc-prodLoaded','Este\x20método\x20esta\x20descontinuado!','qd-ddc-noItems','renderProductsList','empty','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','.qd-ddc-prodName','skuName','.qd-ddc-prodPrice','sellingPrice','meta[name=currency]','.qd-ddc-quantity','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','address','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','[data-sku=\x27','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','load','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku-index','changeQantity','data-sku','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','keyup.qd_ddc_change','click.qd_ddc_remove','removeProduct','slideUp','$1-$2$3','BRA','Não\x20foi\x20possível\x20calcular\x20o\x20frete','qdDdcLastPostalCode','exec','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','boolean','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','quickViewUpdate','allowRecalculate','productId','prod_','prodId','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','.qd-bap-qtt','.qd_bap_wrapper_content','.qdDdcContainer','dropDown','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','closest','replace','abs','undefined','pow','toFixed','round','split','length','join','prototype','capitalize','toUpperCase','slice','toLowerCase','function','qdAjax','qdAjaxQueue','jquery','000','error','extend','GET','object','data','toString','url','type','jqXHR','done','success','fail','always','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','version','4.0','simpleCart','checkout','call','QuatroDigital_simpleCart','ajaxStopOn','alerta','warn','[Simple\x20Cart]\x0a','info','add','QD_simpleCart','elements','.qd_items_text','content','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','Shipping','value','total','currencySymbol','shipping','allTotal','qtt','showQuantityByItems','items','quantity','callback','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','hide','filter','show','.plural','qd-emptyCart','cartTotalE','html','cartQttE','itemsTextE','each','$this','find','cartTotal','emptyCart','smartCheckout','_QuatroDigital_DropDown','getOrderForm','vtexjs','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','QD_checkoutQueue','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','trigger','simpleCartCallback.quatro_digital','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','Oooops!\x20','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','input.buy-in-page-quantity','javascript:','body','.productQuickView','Produto\x20adicionado\x20ao\x20carrinho!','location','#produto,\x20.produto','isSmartCheckout','qd-bb-click-active','click.qd_bb_buy_sc','allowBuyClick','preventDefault','Método\x20descontinuado!','qd-sbb-on','.remove-href','qd-bb-active','.qd-bb-productAdded','append','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','isProductPage','selector','_Quatro_Digital_dropDown','addClass','buyButton','[href=\x27','attr','href','---','qd-bb-itemAddBuyButtonWrapper','removeClass','qd-bb-itemAddCartWrapper','timeRemoveNewItemClass','getCartInfoByUrl','função\x20descontinuada','allowUpdate','autoWatchBuyButton','.btn-add-buy-button-asynchronous','unbind','click','mouseenter.qd_bb_buy_sc','clickBuySmartCheckout','indexOf','?redirect=false&','execDefaultAction','redirect=false','redirect=true','queue','buyIfQuantityZeroed','test','match','push','ku=','asyncCallback','productAddedToCart','buyButtonClickCallback','parent','_QuatroDigital_prodBuyCallback','Callback\x20não\x20é\x20uma\x20função','Callbacks','QD_buyButton','children','.qd-bb-itemAddWrapper','prepend','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','QuatroDigital.qd_bb_prod_add','prodAdd','ajaxSend','/checkout/cart/add','pop','bind','productAddedToCart.qdSbbVtex','ajaxStop','message','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','QD_dropDownCart','vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','ite','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','name','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','off','keyup.qd_ddc_closeFn','keyCode','qd-bb-lightBoxBodyProdAdd','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20input','val','keyup.qd_ddc_cep','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','cartIsEmpty','mouseleave.qd_ddc_hover','texts','#value','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout'];(function(_0x458e7d,_0x4ca4ff){var _0x5b01f7=function(_0x48cf27){while(--_0x48cf27){_0x458e7d['push'](_0x458e7d['shift']());}};_0x5b01f7(++_0x4ca4ff);}(_0xc21d,0x1a2));var _0xdc21=function(_0x496997,_0x5a576c){_0x496997=_0x496997-0x0;var _0x3d16b2=_0xc21d[_0x496997];return _0x3d16b2;};(function(_0x2a9b4a){_0x2a9b4a['fn'][_0xdc21('0x0')]=_0x2a9b4a['fn'][_0xdc21('0x1')];}(jQuery));function qd_number_format(_0x544da4,_0xc123c9,_0x1fa32b,_0x14e8c1){_0x544da4=(_0x544da4+'')[_0xdc21('0x2')](/[^0-9+\-Ee.]/g,'');_0x544da4=isFinite(+_0x544da4)?+_0x544da4:0x0;_0xc123c9=isFinite(+_0xc123c9)?Math[_0xdc21('0x3')](_0xc123c9):0x0;_0x14e8c1='undefined'===typeof _0x14e8c1?',':_0x14e8c1;_0x1fa32b=_0xdc21('0x4')===typeof _0x1fa32b?'.':_0x1fa32b;var _0x14b6ad='',_0x14b6ad=function(_0x57041b,_0x688538){var _0xc123c9=Math[_0xdc21('0x5')](0xa,_0x688538);return''+(Math['round'](_0x57041b*_0xc123c9)/_0xc123c9)[_0xdc21('0x6')](_0x688538);},_0x14b6ad=(_0xc123c9?_0x14b6ad(_0x544da4,_0xc123c9):''+Math[_0xdc21('0x7')](_0x544da4))[_0xdc21('0x8')]('.');0x3<_0x14b6ad[0x0][_0xdc21('0x9')]&&(_0x14b6ad[0x0]=_0x14b6ad[0x0][_0xdc21('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x14e8c1));(_0x14b6ad[0x1]||'')[_0xdc21('0x9')]<_0xc123c9&&(_0x14b6ad[0x1]=_0x14b6ad[0x1]||'',_0x14b6ad[0x1]+=Array(_0xc123c9-_0x14b6ad[0x1][_0xdc21('0x9')]+0x1)[_0xdc21('0xa')]('0'));return _0x14b6ad[_0xdc21('0xa')](_0x1fa32b);};'function'!==typeof String['prototype']['trim']&&(String[_0xdc21('0xb')]['trim']=function(){return this[_0xdc21('0x2')](/^\s+|\s+$/g,'');});'function'!=typeof String[_0xdc21('0xb')][_0xdc21('0xc')]&&(String[_0xdc21('0xb')][_0xdc21('0xc')]=function(){return this['charAt'](0x0)[_0xdc21('0xd')]()+this[_0xdc21('0xe')](0x1)[_0xdc21('0xf')]();});(function(_0x4e66aa){if(_0xdc21('0x10')!==typeof _0x4e66aa[_0xdc21('0x11')]){var _0x26321e={};_0x4e66aa[_0xdc21('0x12')]=_0x26321e;0x96>parseInt((_0x4e66aa['fn'][_0xdc21('0x13')][_0xdc21('0x2')](/[^0-9]+/g,'')+_0xdc21('0x14'))['slice'](0x0,0x3),0xa)&&console&&'function'==typeof console[_0xdc21('0x15')]&&console['error']();_0x4e66aa['qdAjax']=function(_0x253b3b){try{var _0x5ea5cf=_0x4e66aa[_0xdc21('0x16')]({},{'url':'','type':_0xdc21('0x17'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x253b3b);var _0x5d510a=_0xdc21('0x18')===typeof _0x5ea5cf[_0xdc21('0x19')]?JSON['stringify'](_0x5ea5cf['data']):_0x5ea5cf['data'][_0xdc21('0x1a')]();var _0x263480=encodeURIComponent(_0x5ea5cf[_0xdc21('0x1b')]+'|'+_0x5ea5cf[_0xdc21('0x1c')]+'|'+_0x5d510a);_0x26321e[_0x263480]=_0x26321e[_0x263480]||{};_0xdc21('0x4')==typeof _0x26321e[_0x263480][_0xdc21('0x1d')]?_0x26321e[_0x263480][_0xdc21('0x1d')]=_0x4e66aa['ajax'](_0x5ea5cf):(_0x26321e[_0x263480]['jqXHR'][_0xdc21('0x1e')](_0x5ea5cf[_0xdc21('0x1f')]),_0x26321e[_0x263480]['jqXHR'][_0xdc21('0x20')](_0x5ea5cf['error']),_0x26321e[_0x263480][_0xdc21('0x1d')]['always'](_0x5ea5cf['complete']));_0x26321e[_0x263480]['jqXHR'][_0xdc21('0x21')](function(){isNaN(parseInt(_0x5ea5cf[_0xdc21('0x22')]))||setTimeout(function(){_0x26321e[_0x263480][_0xdc21('0x1d')]=void 0x0;},_0x5ea5cf['clearQueueDelay']);});return _0x26321e[_0x263480]['jqXHR'];}catch(_0x4c523a){'undefined'!==typeof console&&_0xdc21('0x10')===typeof console['error']&&console[_0xdc21('0x15')](_0xdc21('0x23')+_0x4c523a['message']);}};_0x4e66aa['qdAjax'][_0xdc21('0x24')]=_0xdc21('0x25');}}(jQuery));(function(_0x180a63){_0x180a63['fn'][_0xdc21('0x0')]=_0x180a63['fn'][_0xdc21('0x1')];}(jQuery));(function(){var _0x35e2f5=jQuery;if(_0xdc21('0x10')!==typeof _0x35e2f5['fn'][_0xdc21('0x26')]){_0x35e2f5(function(){var _0x4367e1=vtexjs[_0xdc21('0x27')]['getOrderForm'];vtexjs[_0xdc21('0x27')]['getOrderForm']=function(){return _0x4367e1[_0xdc21('0x28')]();};});try{window[_0xdc21('0x29')]=window[_0xdc21('0x29')]||{};window[_0xdc21('0x29')][_0xdc21('0x2a')]=!0x1;_0x35e2f5['fn'][_0xdc21('0x26')]=function(_0x6abee1,_0x29d969,_0x3ec37a){var _0x365aec=function(_0x3ce873,_0x8534d6){if('object'===typeof console){var _0x3d6862=_0xdc21('0x18')===typeof _0x3ce873;_0xdc21('0x4')!==typeof _0x8534d6&&_0xdc21('0x2b')===_0x8534d6[_0xdc21('0xf')]()?_0x3d6862?console[_0xdc21('0x2c')](_0xdc21('0x2d'),_0x3ce873[0x0],_0x3ce873[0x1],_0x3ce873[0x2],_0x3ce873[0x3],_0x3ce873[0x4],_0x3ce873[0x5],_0x3ce873[0x6],_0x3ce873[0x7]):console[_0xdc21('0x2c')]('[Simple\x20Cart]\x0a'+_0x3ce873):'undefined'!==typeof _0x8534d6&&_0xdc21('0x2e')===_0x8534d6[_0xdc21('0xf')]()?_0x3d6862?console[_0xdc21('0x2e')](_0xdc21('0x2d'),_0x3ce873[0x0],_0x3ce873[0x1],_0x3ce873[0x2],_0x3ce873[0x3],_0x3ce873[0x4],_0x3ce873[0x5],_0x3ce873[0x6],_0x3ce873[0x7]):console['info']('[Simple\x20Cart]\x0a'+_0x3ce873):_0x3d6862?console['error'](_0xdc21('0x2d'),_0x3ce873[0x0],_0x3ce873[0x1],_0x3ce873[0x2],_0x3ce873[0x3],_0x3ce873[0x4],_0x3ce873[0x5],_0x3ce873[0x6],_0x3ce873[0x7]):console['error'](_0xdc21('0x2d')+_0x3ce873);}};var _0x289216=_0x35e2f5(this);_0xdc21('0x18')===typeof _0x6abee1?_0x29d969=_0x6abee1:(_0x6abee1=_0x6abee1||!0x1,_0x289216=_0x289216[_0xdc21('0x2f')](_0x35e2f5[_0xdc21('0x30')][_0xdc21('0x31')]));if(!_0x289216['length'])return _0x289216;_0x35e2f5[_0xdc21('0x30')]['elements']=_0x35e2f5[_0xdc21('0x30')][_0xdc21('0x31')][_0xdc21('0x2f')](_0x289216);_0x3ec37a='undefined'===typeof _0x3ec37a?!0x1:_0x3ec37a;var _0x31912b={'cartQtt':'.qd_cart_qtt','cartTotal':'.qd_cart_total','itemsText':_0xdc21('0x32'),'currencySymbol':(_0x35e2f5('meta[name=currency]')['attr'](_0xdc21('0x33'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x14e444=_0x35e2f5[_0xdc21('0x16')]({},_0x31912b,_0x29d969);var _0x105a4e=_0x35e2f5('');_0x289216['each'](function(){var _0x2ef1e6=_0x35e2f5(this);_0x2ef1e6[_0xdc21('0x19')]('qd_simpleCartOpts')||_0x2ef1e6[_0xdc21('0x19')](_0xdc21('0x34'),_0x14e444);});var _0x5f22e0=function(_0x3baa56){window[_0xdc21('0x35')]=window[_0xdc21('0x35')]||{};for(var _0x6abee1=0x0,_0x454e8f=0x0,_0x282043=0x0;_0x282043<_0x3baa56[_0xdc21('0x36')][_0xdc21('0x9')];_0x282043++)_0xdc21('0x37')==_0x3baa56[_0xdc21('0x36')][_0x282043]['id']&&(_0x454e8f+=_0x3baa56[_0xdc21('0x36')][_0x282043][_0xdc21('0x38')]),_0x6abee1+=_0x3baa56[_0xdc21('0x36')][_0x282043][_0xdc21('0x38')];window[_0xdc21('0x35')][_0xdc21('0x39')]=_0x14e444[_0xdc21('0x3a')]+qd_number_format(_0x6abee1/0x64,0x2,',','.');window[_0xdc21('0x35')][_0xdc21('0x3b')]=_0x14e444['currencySymbol']+qd_number_format(_0x454e8f/0x64,0x2,',','.');window[_0xdc21('0x35')][_0xdc21('0x3c')]=_0x14e444[_0xdc21('0x3a')]+qd_number_format((_0x6abee1+_0x454e8f)/0x64,0x2,',','.');window[_0xdc21('0x35')][_0xdc21('0x3d')]=0x0;if(_0x14e444[_0xdc21('0x3e')])for(_0x282043=0x0;_0x282043<_0x3baa56[_0xdc21('0x3f')][_0xdc21('0x9')];_0x282043++)window[_0xdc21('0x35')][_0xdc21('0x3d')]+=_0x3baa56[_0xdc21('0x3f')][_0x282043][_0xdc21('0x40')];else window[_0xdc21('0x35')][_0xdc21('0x3d')]=_0x3baa56[_0xdc21('0x3f')][_0xdc21('0x9')]||0x0;try{window[_0xdc21('0x35')][_0xdc21('0x41')]&&window[_0xdc21('0x35')][_0xdc21('0x41')][_0xdc21('0x42')]&&window[_0xdc21('0x35')][_0xdc21('0x41')][_0xdc21('0x42')]();}catch(_0x1a2690){_0x365aec(_0xdc21('0x43'));}_0x123c81(_0x105a4e);};var _0x3ba0bb=function(_0x3c3da4,_0x1cf329){0x1===_0x3c3da4?_0x1cf329[_0xdc21('0x44')]()[_0xdc21('0x45')]('.singular')[_0xdc21('0x46')]():_0x1cf329[_0xdc21('0x44')]()['filter'](_0xdc21('0x47'))[_0xdc21('0x46')]();};var _0x299b16=function(_0x1976ab){0x1>_0x1976ab?_0x289216['addClass'](_0xdc21('0x48')):_0x289216['removeClass'](_0xdc21('0x48'));};var _0x9091b4=function(_0x49555e,_0xa999ce){var _0x5ecad8=parseInt(window['_QuatroDigital_CartData']['qtt'],0xa);_0xa999ce['$this'][_0xdc21('0x46')]();isNaN(_0x5ecad8)&&(_0x365aec('O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.',_0xdc21('0x2b')),_0x5ecad8=0x0);_0xa999ce[_0xdc21('0x49')][_0xdc21('0x4a')](window[_0xdc21('0x35')][_0xdc21('0x39')]);_0xa999ce[_0xdc21('0x4b')]['html'](_0x5ecad8);_0x3ba0bb(_0x5ecad8,_0xa999ce[_0xdc21('0x4c')]);_0x299b16(_0x5ecad8);};var _0x123c81=function(_0x4febfb){_0x289216[_0xdc21('0x4d')](function(){var _0x2fdc19={};var _0x21cb61=_0x35e2f5(this);_0x6abee1&&_0x21cb61[_0xdc21('0x19')](_0xdc21('0x34'))&&_0x35e2f5[_0xdc21('0x16')](_0x14e444,_0x21cb61['data'](_0xdc21('0x34')));_0x2fdc19[_0xdc21('0x4e')]=_0x21cb61;_0x2fdc19[_0xdc21('0x4b')]=_0x21cb61[_0xdc21('0x4f')](_0x14e444['cartQtt'])||_0x105a4e;_0x2fdc19[_0xdc21('0x49')]=_0x21cb61[_0xdc21('0x4f')](_0x14e444[_0xdc21('0x50')])||_0x105a4e;_0x2fdc19['itemsTextE']=_0x21cb61[_0xdc21('0x4f')](_0x14e444['itemsText'])||_0x105a4e;_0x2fdc19['emptyElem']=_0x21cb61['find'](_0x14e444[_0xdc21('0x51')])||_0x105a4e;_0x9091b4(_0x4febfb,_0x2fdc19);_0x21cb61['addClass']('qd-sc-populated');});};(function(){if(_0x14e444[_0xdc21('0x52')]){window[_0xdc21('0x53')]=window[_0xdc21('0x53')]||{};if(_0xdc21('0x4')!==typeof window[_0xdc21('0x53')][_0xdc21('0x54')]&&(_0x3ec37a||!_0x6abee1))return _0x5f22e0(window['_QuatroDigital_DropDown'][_0xdc21('0x54')]);if('object'!==typeof window['vtexjs']||_0xdc21('0x4')===typeof window[_0xdc21('0x55')][_0xdc21('0x27')])if(_0xdc21('0x18')===typeof vtex&&_0xdc21('0x18')===typeof vtex[_0xdc21('0x27')]&&_0xdc21('0x4')!==typeof vtex[_0xdc21('0x27')]['SDK'])new vtex[(_0xdc21('0x27'))][(_0xdc21('0x56'))]();else return _0x365aec(_0xdc21('0x57'));_0x35e2f5[_0xdc21('0x58')]([_0xdc21('0x3f'),'totalizers',_0xdc21('0x59')],{'done':function(_0xd4f176){_0x5f22e0(_0xd4f176);window[_0xdc21('0x53')][_0xdc21('0x54')]=_0xd4f176;},'fail':function(_0x5384ea){_0x365aec([_0xdc21('0x5a'),_0x5384ea]);}});}else alert(_0xdc21('0x5b'));}());_0x14e444[_0xdc21('0x41')]();_0x35e2f5(window)[_0xdc21('0x5c')](_0xdc21('0x5d'));return _0x289216;};_0x35e2f5['QD_simpleCart']={'elements':_0x35e2f5('')};_0x35e2f5(function(){var _0x30e445;'function'===typeof window[_0xdc21('0x5e')]&&(_0x30e445=window['ajaxRequestbuyButtonAsynchronous'],window['ajaxRequestbuyButtonAsynchronous']=function(_0x293ad8,_0x34255f,_0x5e98e3,_0x5b7220,_0x200e9c){_0x30e445['call'](this,_0x293ad8,_0x34255f,_0x5e98e3,_0x5b7220,function(){_0xdc21('0x10')===typeof _0x200e9c&&_0x200e9c();_0x35e2f5[_0xdc21('0x30')][_0xdc21('0x31')][_0xdc21('0x4d')](function(){var _0x3abfea=_0x35e2f5(this);_0x3abfea['simpleCart'](_0x3abfea[_0xdc21('0x19')](_0xdc21('0x34')));});});});});var _0x4df5f7=window[_0xdc21('0x5f')]||void 0x0;window[_0xdc21('0x5f')]=function(_0x4e32e8){_0x35e2f5['fn'][_0xdc21('0x26')](!0x0);'function'===typeof _0x4df5f7?_0x4df5f7[_0xdc21('0x28')](this,_0x4e32e8):alert(_0x4e32e8);};_0x35e2f5(function(){var _0x1f7896=_0x35e2f5('.qd_cart_auto');_0x1f7896[_0xdc21('0x9')]&&_0x1f7896[_0xdc21('0x26')]();});_0x35e2f5(function(){_0x35e2f5(window)['bind'](_0xdc21('0x60'),function(){_0x35e2f5['fn'][_0xdc21('0x26')](!0x0);});});}catch(_0x4b017c){'undefined'!==typeof console&&_0xdc21('0x10')===typeof console[_0xdc21('0x15')]&&console[_0xdc21('0x15')](_0xdc21('0x61'),_0x4b017c);}}}());(function(){var _0x26109c=function(_0x128659,_0x31cbb5){if('object'===typeof console){var _0x1aca4d=_0xdc21('0x18')===typeof _0x128659;_0xdc21('0x4')!==typeof _0x31cbb5&&_0xdc21('0x2b')===_0x31cbb5['toLowerCase']()?_0x1aca4d?console[_0xdc21('0x2c')](_0xdc21('0x62'),_0x128659[0x0],_0x128659[0x1],_0x128659[0x2],_0x128659[0x3],_0x128659[0x4],_0x128659[0x5],_0x128659[0x6],_0x128659[0x7]):console[_0xdc21('0x2c')](_0xdc21('0x62')+_0x128659):_0xdc21('0x4')!==typeof _0x31cbb5&&'info'===_0x31cbb5[_0xdc21('0xf')]()?_0x1aca4d?console['info'](_0xdc21('0x62'),_0x128659[0x0],_0x128659[0x1],_0x128659[0x2],_0x128659[0x3],_0x128659[0x4],_0x128659[0x5],_0x128659[0x6],_0x128659[0x7]):console[_0xdc21('0x2e')](_0xdc21('0x62')+_0x128659):_0x1aca4d?console[_0xdc21('0x15')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x128659[0x0],_0x128659[0x1],_0x128659[0x2],_0x128659[0x3],_0x128659[0x4],_0x128659[0x5],_0x128659[0x6],_0x128659[0x7]):console['error'](_0xdc21('0x62')+_0x128659);}},_0x17f345=null,_0x4b1706={},_0x233ac4={},_0x16f27c={};$[_0xdc21('0x58')]=function(_0x303257,_0x409486){if(null===_0x17f345)if(_0xdc21('0x18')===typeof window[_0xdc21('0x55')]&&_0xdc21('0x4')!==typeof window[_0xdc21('0x55')][_0xdc21('0x27')])_0x17f345=window[_0xdc21('0x55')]['checkout'];else return _0x26109c(_0xdc21('0x63'));var _0x527522=$['extend']({'done':function(){},'fail':function(){}},_0x409486),_0xd9b2ef=_0x303257[_0xdc21('0xa')](';'),_0x1f4cd5=function(){_0x4b1706[_0xd9b2ef][_0xdc21('0x2f')](_0x527522[_0xdc21('0x1e')]);_0x233ac4[_0xd9b2ef][_0xdc21('0x2f')](_0x527522['fail']);};_0x16f27c[_0xd9b2ef]?_0x1f4cd5():(_0x4b1706[_0xd9b2ef]=$['Callbacks'](),_0x233ac4[_0xd9b2ef]=$['Callbacks'](),_0x1f4cd5(),_0x16f27c[_0xd9b2ef]=!0x0,_0x17f345[_0xdc21('0x54')](_0x303257)[_0xdc21('0x1e')](function(_0x4f4768){_0x16f27c[_0xd9b2ef]=!0x1;_0x4b1706[_0xd9b2ef][_0xdc21('0x42')](_0x4f4768);})[_0xdc21('0x20')](function(_0x5beb7e){_0x16f27c[_0xd9b2ef]=!0x1;_0x233ac4[_0xd9b2ef][_0xdc21('0x42')](_0x5beb7e);}));};}());(function(_0x2ebac3){try{var _0xa3db7c=jQuery,_0x4e76b0,_0x4dea49=_0xa3db7c({}),_0xf2cfab=function(_0x3a6211,_0x28ef22){if(_0xdc21('0x18')===typeof console&&'undefined'!==typeof console[_0xdc21('0x15')]&&'undefined'!==typeof console['info']&&_0xdc21('0x4')!==typeof console['warn']){var _0x57892b;_0xdc21('0x18')===typeof _0x3a6211?(_0x3a6211['unshift'](_0xdc21('0x64')),_0x57892b=_0x3a6211):_0x57892b=[_0xdc21('0x64')+_0x3a6211];if('undefined'===typeof _0x28ef22||_0xdc21('0x2b')!==_0x28ef22[_0xdc21('0xf')]()&&_0xdc21('0x65')!==_0x28ef22[_0xdc21('0xf')]())if(_0xdc21('0x4')!==typeof _0x28ef22&&_0xdc21('0x2e')===_0x28ef22[_0xdc21('0xf')]())try{console[_0xdc21('0x2e')]['apply'](console,_0x57892b);}catch(_0x4f5e74){try{console[_0xdc21('0x2e')](_0x57892b[_0xdc21('0xa')]('\x0a'));}catch(_0x129dee){}}else try{console['error'][_0xdc21('0x66')](console,_0x57892b);}catch(_0x5ed9d3){try{console[_0xdc21('0x15')](_0x57892b[_0xdc21('0xa')]('\x0a'));}catch(_0xcf330){}}else try{console[_0xdc21('0x2c')][_0xdc21('0x66')](console,_0x57892b);}catch(_0x56939f){try{console['warn'](_0x57892b['join']('\x0a'));}catch(_0xd13170){}}}},_0x4b8dab={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':'.productInformationWrapper\x20\x20a.buy-button','buyQtt':_0xdc21('0x67'),'selectSkuMsg':_0xdc21('0x68'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x3ccd77,_0x12932d,_0x4f3db8){_0xa3db7c(_0xdc21('0x69'))['is'](_0xdc21('0x6a'))&&(_0xdc21('0x1f')===_0x12932d?alert(_0xdc21('0x6b')):(alert('Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.'),('object'===typeof parent?parent:document)[_0xdc21('0x6c')]['href']=_0x4f3db8));},'isProductPage':function(){return _0xa3db7c(_0xdc21('0x69'))['is'](_0xdc21('0x6d'));},'execDefaultAction':function(_0x556510){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0xa3db7c['QD_buyButton']=function(_0x18809f,_0x5cf672){function _0x53c400(_0x195ac9){_0x4e76b0[_0xdc21('0x6e')]?_0x195ac9[_0xdc21('0x19')](_0xdc21('0x6f'))||(_0x195ac9[_0xdc21('0x19')](_0xdc21('0x6f'),0x1),_0x195ac9['on'](_0xdc21('0x70'),function(_0x4707fd){if(!_0x4e76b0[_0xdc21('0x71')]())return!0x0;if(!0x0!==_0xb079e7['clickBuySmartCheckout'][_0xdc21('0x28')](this))return _0x4707fd[_0xdc21('0x72')](),!0x1;})):alert(_0xdc21('0x73'));}function _0x3808ae(_0x3aa14b){_0x3aa14b=_0x3aa14b||_0xa3db7c(_0x4e76b0['buyButton']);_0x3aa14b[_0xdc21('0x4d')](function(){var _0x3aa14b=_0xa3db7c(this);_0x3aa14b['is']('.qd-sbb-on')||(_0x3aa14b['addClass'](_0xdc21('0x74')),_0x3aa14b['is']('.btn-add-buy-button-asynchronous')&&!_0x3aa14b['is'](_0xdc21('0x75'))||_0x3aa14b['data'](_0xdc21('0x76'))||(_0x3aa14b[_0xdc21('0x19')](_0xdc21('0x76'),0x1),_0x3aa14b['children'](_0xdc21('0x77'))[_0xdc21('0x9')]||_0x3aa14b[_0xdc21('0x78')](_0xdc21('0x79')),_0x3aa14b['is']('.buy-in-page-button')&&_0x4e76b0['isProductPage']()&&_0x2cc4f5['call'](_0x3aa14b),_0x53c400(_0x3aa14b)));});_0x4e76b0[_0xdc21('0x7a')]()&&!_0x3aa14b['length']&&_0xf2cfab('Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27'+_0x3aa14b[_0xdc21('0x7b')]+'\x27.',_0xdc21('0x2e'));}var _0x5513e6=_0xa3db7c(_0x18809f);var _0xb079e7=this;window[_0xdc21('0x7c')]=window[_0xdc21('0x7c')]||{};window[_0xdc21('0x35')]=window[_0xdc21('0x35')]||{};_0xb079e7['prodAdd']=function(_0x50f86f,_0x386d16){_0x5513e6[_0xdc21('0x7d')]('qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd');_0xa3db7c('body')[_0xdc21('0x7d')]('qd-bb-lightBoxBodyProdAdd');var _0x112207=_0xa3db7c(_0x4e76b0[_0xdc21('0x7e')])['filter'](_0xdc21('0x7f')+(_0x50f86f[_0xdc21('0x80')](_0xdc21('0x81'))||_0xdc21('0x82'))+'\x27]')[_0xdc21('0x2f')](_0x50f86f);_0x112207[_0xdc21('0x7d')](_0xdc21('0x83'));setTimeout(function(){_0x5513e6[_0xdc21('0x84')](_0xdc21('0x85'));_0x112207[_0xdc21('0x84')](_0xdc21('0x83'));},_0x4e76b0[_0xdc21('0x86')]);window[_0xdc21('0x7c')][_0xdc21('0x54')]=void 0x0;if(_0xdc21('0x4')!==typeof _0x5cf672&&'function'===typeof _0x5cf672[_0xdc21('0x87')])return _0x4e76b0[_0xdc21('0x6e')]||(_0xf2cfab(_0xdc21('0x88')),_0x5cf672[_0xdc21('0x87')]()),window[_0xdc21('0x53')]['getOrderForm']=void 0x0,_0x5cf672[_0xdc21('0x87')](function(_0x2b22e2){window[_0xdc21('0x7c')][_0xdc21('0x54')]=_0x2b22e2;_0xa3db7c['fn'][_0xdc21('0x26')](!0x0,void 0x0,!0x0);},{'lastSku':_0x386d16});window[_0xdc21('0x7c')][_0xdc21('0x89')]=!0x0;_0xa3db7c['fn']['simpleCart'](!0x0);};(function(){if(_0x4e76b0[_0xdc21('0x6e')]&&_0x4e76b0[_0xdc21('0x8a')]){var _0x1b451d=_0xa3db7c(_0xdc21('0x8b'));_0x1b451d['length']&&_0x3808ae(_0x1b451d);}}());var _0x2cc4f5=function(){var _0x1f2403=_0xa3db7c(this);_0xdc21('0x4')!==typeof _0x1f2403[_0xdc21('0x19')](_0xdc21('0x7e'))?(_0x1f2403[_0xdc21('0x8c')](_0xdc21('0x8d')),_0x53c400(_0x1f2403)):(_0x1f2403['bind'](_0xdc21('0x8e'),function(_0x598bc2){_0x1f2403['unbind'](_0xdc21('0x8d'));_0x53c400(_0x1f2403);_0xa3db7c(this)['unbind'](_0x598bc2);}),_0xa3db7c(window)['load'](function(){_0x1f2403[_0xdc21('0x8c')]('click');_0x53c400(_0x1f2403);_0x1f2403['unbind'](_0xdc21('0x8e'));}));};_0xb079e7[_0xdc21('0x8f')]=function(){var _0x4cfc61=_0xa3db7c(this),_0x18809f=_0x4cfc61[_0xdc21('0x80')]('href')||'';if(-0x1<_0x18809f[_0xdc21('0x90')](_0x4e76b0['selectSkuMsg']))return!0x0;_0x18809f=_0x18809f[_0xdc21('0x2')](/redirect\=(false|true)/gi,'')[_0xdc21('0x2')]('?',_0xdc21('0x91'))[_0xdc21('0x2')](/\&\&/gi,'&');if(_0x4e76b0[_0xdc21('0x92')](_0x4cfc61))return _0x4cfc61['attr']('href',_0x18809f[_0xdc21('0x2')](_0xdc21('0x93'),_0xdc21('0x94'))),!0x0;_0x18809f=_0x18809f[_0xdc21('0x2')](/http.?:/i,'');_0x4dea49[_0xdc21('0x95')](function(_0x4e2e1c){if(!_0x4e76b0[_0xdc21('0x96')]&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0xdc21('0x97')](_0x18809f))return _0x4e2e1c();var _0x218233=function(_0x134bdf,_0x28a82f){var _0x3808ae=_0x18809f[_0xdc21('0x98')](/sku\=([0-9]+)/gi),_0x2a80ef=[];if(_0xdc21('0x18')===typeof _0x3808ae&&null!==_0x3808ae)for(var _0x43c915=_0x3808ae[_0xdc21('0x9')]-0x1;0x0<=_0x43c915;_0x43c915--){var _0x5d4224=parseInt(_0x3808ae[_0x43c915][_0xdc21('0x2')](/sku\=/gi,''));isNaN(_0x5d4224)||_0x2a80ef[_0xdc21('0x99')](_0x5d4224);}_0x4e76b0['productPageCallback'][_0xdc21('0x28')](this,_0x134bdf,_0x28a82f,_0x18809f);_0xb079e7['buyButtonClickCallback'][_0xdc21('0x28')](this,_0x134bdf,_0x28a82f,_0x18809f,_0x2a80ef);_0xb079e7['prodAdd'](_0x4cfc61,_0x18809f[_0xdc21('0x8')](_0xdc21('0x9a'))['pop']()[_0xdc21('0x8')]('&')['shift']());_0xdc21('0x10')===typeof _0x4e76b0['asyncCallback']&&_0x4e76b0[_0xdc21('0x9b')]['call'](this);_0xa3db7c(window)[_0xdc21('0x5c')](_0xdc21('0x9c'));_0xa3db7c(window)[_0xdc21('0x5c')]('cartProductAdded.vtex');};_0x4e76b0['fakeRequest']?(_0x218233(null,'success'),_0x4e2e1c()):_0xa3db7c['ajax']({'url':_0x18809f,'complete':_0x218233})[_0xdc21('0x21')](function(){_0x4e2e1c();});});};_0xb079e7[_0xdc21('0x9d')]=function(_0x2c8087,_0x123467,_0x656130,_0x140e1b){try{_0xdc21('0x1f')===_0x123467&&'object'===typeof window[_0xdc21('0x9e')]&&_0xdc21('0x10')===typeof window[_0xdc21('0x9e')][_0xdc21('0x9f')]&&window[_0xdc21('0x9e')][_0xdc21('0x9f')](_0x2c8087,_0x123467,_0x656130,_0x140e1b);}catch(_0x4ac4c0){_0xf2cfab('Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.');}};_0x3808ae();_0xdc21('0x10')===typeof _0x4e76b0[_0xdc21('0x41')]?_0x4e76b0[_0xdc21('0x41')][_0xdc21('0x28')](this):_0xf2cfab(_0xdc21('0xa0'));};var _0x155887=_0xa3db7c[_0xdc21('0xa1')]();_0xa3db7c['fn'][_0xdc21('0xa2')]=function(_0x2d80ea,_0x1ba817){var _0x2ebac3=_0xa3db7c(this);'undefined'!==typeof _0x1ba817||_0xdc21('0x18')!==typeof _0x2d80ea||_0x2d80ea instanceof _0xa3db7c||(_0x1ba817=_0x2d80ea,_0x2d80ea=void 0x0);_0x4e76b0=_0xa3db7c['extend']({},_0x4b8dab,_0x1ba817);var _0x1a0207;_0x155887['add'](function(){_0x2ebac3[_0xdc21('0xa3')](_0xdc21('0xa4'))['length']||_0x2ebac3[_0xdc21('0xa5')](_0xdc21('0xa6'));_0x1a0207=new _0xa3db7c[(_0xdc21('0xa2'))](_0x2ebac3,_0x2d80ea);});_0x155887[_0xdc21('0x42')]();_0xa3db7c(window)['on'](_0xdc21('0xa7'),function(_0x3040e0,_0x5b2149,_0x3eb5e1){_0x1a0207[_0xdc21('0xa8')](_0x5b2149,_0x3eb5e1);});return _0xa3db7c['extend'](_0x2ebac3,_0x1a0207);};var _0x5c0f31=0x0;_0xa3db7c(document)[_0xdc21('0xa9')](function(_0x2e51ba,_0x57ea8f,_0x4b52ad){-0x1<_0x4b52ad[_0xdc21('0x1b')][_0xdc21('0xf')]()[_0xdc21('0x90')](_0xdc21('0xaa'))&&(_0x5c0f31=(_0x4b52ad[_0xdc21('0x1b')][_0xdc21('0x98')](/sku\=([0-9]+)/i)||[''])[_0xdc21('0xab')]());});_0xa3db7c(window)[_0xdc21('0xac')](_0xdc21('0xad'),function(){_0xa3db7c(window)[_0xdc21('0x5c')](_0xdc21('0xa7'),[new _0xa3db7c(),_0x5c0f31]);});_0xa3db7c(document)[_0xdc21('0xae')](function(){_0x155887[_0xdc21('0x42')]();});}catch(_0x1109ba){_0xdc21('0x4')!==typeof console&&_0xdc21('0x10')===typeof console['error']&&console[_0xdc21('0x15')]('Oooops!\x20',_0x1109ba);}}(this));function qd_number_format(_0x2d7142,_0x4fe981,_0x177236,_0x2dc9b4){_0x2d7142=(_0x2d7142+'')[_0xdc21('0x2')](/[^0-9+\-Ee.]/g,'');_0x2d7142=isFinite(+_0x2d7142)?+_0x2d7142:0x0;_0x4fe981=isFinite(+_0x4fe981)?Math[_0xdc21('0x3')](_0x4fe981):0x0;_0x2dc9b4=_0xdc21('0x4')===typeof _0x2dc9b4?',':_0x2dc9b4;_0x177236=_0xdc21('0x4')===typeof _0x177236?'.':_0x177236;var _0x22662b='',_0x22662b=function(_0x4b5c3d,_0x391d48){var _0x30ddeb=Math['pow'](0xa,_0x391d48);return''+(Math[_0xdc21('0x7')](_0x4b5c3d*_0x30ddeb)/_0x30ddeb)[_0xdc21('0x6')](_0x391d48);},_0x22662b=(_0x4fe981?_0x22662b(_0x2d7142,_0x4fe981):''+Math[_0xdc21('0x7')](_0x2d7142))[_0xdc21('0x8')]('.');0x3<_0x22662b[0x0][_0xdc21('0x9')]&&(_0x22662b[0x0]=_0x22662b[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x2dc9b4));(_0x22662b[0x1]||'')[_0xdc21('0x9')]<_0x4fe981&&(_0x22662b[0x1]=_0x22662b[0x1]||'',_0x22662b[0x1]+=Array(_0x4fe981-_0x22662b[0x1][_0xdc21('0x9')]+0x1)[_0xdc21('0xa')]('0'));return _0x22662b[_0xdc21('0xa')](_0x177236);}(function(){try{window[_0xdc21('0x35')]=window[_0xdc21('0x35')]||{},window['_QuatroDigital_CartData'][_0xdc21('0x41')]=window[_0xdc21('0x35')][_0xdc21('0x41')]||$[_0xdc21('0xa1')]();}catch(_0x16cf34){_0xdc21('0x4')!==typeof console&&_0xdc21('0x10')===typeof console['error']&&console[_0xdc21('0x15')](_0xdc21('0x61'),_0x16cf34[_0xdc21('0xaf')]);}}());(function(_0x31dced){try{var _0x590939=jQuery,_0x31eca8=function(_0x4ed4ee,_0x3dc1e6){if(_0xdc21('0x18')===typeof console&&_0xdc21('0x4')!==typeof console[_0xdc21('0x15')]&&'undefined'!==typeof console[_0xdc21('0x2e')]&&'undefined'!==typeof console[_0xdc21('0x2c')]){var _0x981265;_0xdc21('0x18')===typeof _0x4ed4ee?(_0x4ed4ee[_0xdc21('0xb0')](_0xdc21('0xb1')),_0x981265=_0x4ed4ee):_0x981265=['[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'+_0x4ed4ee];if(_0xdc21('0x4')===typeof _0x3dc1e6||_0xdc21('0x2b')!==_0x3dc1e6[_0xdc21('0xf')]()&&'aviso'!==_0x3dc1e6[_0xdc21('0xf')]())if(_0xdc21('0x4')!==typeof _0x3dc1e6&&_0xdc21('0x2e')===_0x3dc1e6[_0xdc21('0xf')]())try{console[_0xdc21('0x2e')][_0xdc21('0x66')](console,_0x981265);}catch(_0x3134ca){try{console[_0xdc21('0x2e')](_0x981265[_0xdc21('0xa')]('\x0a'));}catch(_0x58b291){}}else try{console[_0xdc21('0x15')][_0xdc21('0x66')](console,_0x981265);}catch(_0x4cd861){try{console[_0xdc21('0x15')](_0x981265[_0xdc21('0xa')]('\x0a'));}catch(_0x5e5728){}}else try{console[_0xdc21('0x2c')][_0xdc21('0x66')](console,_0x981265);}catch(_0x2b706b){try{console['warn'](_0x981265['join']('\x0a'));}catch(_0x5e7b51){}}}};window[_0xdc21('0x53')]=window[_0xdc21('0x53')]||{};window['_QuatroDigital_DropDown'][_0xdc21('0x89')]=!0x0;_0x590939[_0xdc21('0xb2')]=function(){};_0x590939['fn'][_0xdc21('0xb2')]=function(){return{'fn':new _0x590939()};};var _0x3338e0=function(_0x2bb797){var _0x2ca8a9={'i':_0xdc21('0xb3')};return function(_0x5e2b8d){var _0x5be636=function(_0x519d4d){return _0x519d4d;};var _0x50fd6d=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5e2b8d=_0x5e2b8d['d'+_0x50fd6d[0x10]+'c'+_0x50fd6d[0x11]+'m'+_0x5be636(_0x50fd6d[0x1])+'n'+_0x50fd6d[0xd]]['l'+_0x50fd6d[0x12]+'c'+_0x50fd6d[0x0]+'ti'+_0x5be636('o')+'n'];var _0x5e309e=function(_0x8e2672){return escape(encodeURIComponent(_0x8e2672[_0xdc21('0x2')](/\./g,'¨')[_0xdc21('0x2')](/[a-zA-Z]/g,function(_0x428e6d){return String[_0xdc21('0xb4')](('Z'>=_0x428e6d?0x5a:0x7a)>=(_0x428e6d=_0x428e6d[_0xdc21('0xb5')](0x0)+0xd)?_0x428e6d:_0x428e6d-0x1a);})));};var _0x31dced=_0x5e309e(_0x5e2b8d[[_0x50fd6d[0x9],_0x5be636('o'),_0x50fd6d[0xc],_0x50fd6d[_0x5be636(0xd)]]['join']('')]);_0x5e309e=_0x5e309e((window[['js',_0x5be636('no'),'m',_0x50fd6d[0x1],_0x50fd6d[0x4][_0xdc21('0xd')](),_0xdc21('0xb6')][_0xdc21('0xa')]('')]||_0xdc21('0x82'))+['.v',_0x50fd6d[0xd],'e',_0x5be636('x'),'co',_0x5be636('mm'),_0xdc21('0xb7'),_0x50fd6d[0x1],'.c',_0x5be636('o'),'m.',_0x50fd6d[0x13],'r'][_0xdc21('0xa')](''));for(var _0x12cfc1 in _0x2ca8a9){if(_0x5e309e===_0x12cfc1+_0x2ca8a9[_0x12cfc1]||_0x31dced===_0x12cfc1+_0x2ca8a9[_0x12cfc1]){var _0x3d39dd='tr'+_0x50fd6d[0x11]+'e';break;}_0x3d39dd='f'+_0x50fd6d[0x0]+'ls'+_0x5be636(_0x50fd6d[0x1])+'';}_0x5be636=!0x1;-0x1<_0x5e2b8d[[_0x50fd6d[0xc],'e',_0x50fd6d[0x0],'rc',_0x50fd6d[0x9]][_0xdc21('0xa')]('')]['indexOf'](_0xdc21('0xb8'))&&(_0x5be636=!0x0);return[_0x3d39dd,_0x5be636];}(_0x2bb797);}(window);if(!eval(_0x3338e0[0x0]))return _0x3338e0[0x1]?_0x31eca8(_0xdc21('0xb9')):!0x1;_0x590939['QD_dropDownCart']=function(_0x3993a9,_0x127247){var _0x16f255=_0x590939(_0x3993a9);if(!_0x16f255[_0xdc21('0x9')])return _0x16f255;var _0x43d942=_0x590939[_0xdc21('0x16')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0xdc21('0xba'),'linkCheckout':_0xdc21('0xbb'),'cartTotal':_0xdc21('0xbc'),'emptyCart':_0xdc21('0xbd'),'continueShopping':_0xdc21('0xbe'),'shippingForm':_0xdc21('0xbf')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x192429){return _0x192429['skuName']||_0x192429[_0xdc21('0xc0')];},'callback':function(){},'callbackProductsList':function(){}},_0x127247);_0x590939('');var _0x4db4d3=this;if(_0x43d942[_0xdc21('0x52')]){var _0xa7ab33=!0x1;_0xdc21('0x4')===typeof window[_0xdc21('0x55')]&&(_0x31eca8(_0xdc21('0xc1')),_0x590939[_0xdc21('0xc2')]({'url':_0xdc21('0xc3'),'async':!0x1,'dataType':'script','error':function(){_0x31eca8(_0xdc21('0xc4'));_0xa7ab33=!0x0;}}));if(_0xa7ab33)return _0x31eca8('A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!');}if(_0xdc21('0x18')===typeof window[_0xdc21('0x55')]&&_0xdc21('0x4')!==typeof window[_0xdc21('0x55')][_0xdc21('0x27')])var _0x15ff03=window[_0xdc21('0x55')][_0xdc21('0x27')];else if('object'===typeof vtex&&_0xdc21('0x18')===typeof vtex['checkout']&&_0xdc21('0x4')!==typeof vtex[_0xdc21('0x27')][_0xdc21('0x56')])_0x15ff03=new vtex[(_0xdc21('0x27'))][(_0xdc21('0x56'))]();else return _0x31eca8(_0xdc21('0x57'));_0x4db4d3['cartContainer']=_0xdc21('0xc5');var _0x5e9fa2=function(_0x7d73e2){_0x590939(this)[_0xdc21('0x78')](_0x7d73e2);_0x7d73e2[_0xdc21('0x4f')]('.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose')[_0xdc21('0x2f')](_0x590939(_0xdc21('0xc6')))['on'](_0xdc21('0xc7'),function(){_0x16f255['removeClass'](_0xdc21('0xc8'));_0x590939(document[_0xdc21('0x69')])[_0xdc21('0x84')]('qd-bb-lightBoxBodyProdAdd');});_0x590939(document)[_0xdc21('0xc9')](_0xdc21('0xca'))['on'](_0xdc21('0xca'),function(_0x293f5d){0x1b==_0x293f5d[_0xdc21('0xcb')]&&(_0x16f255[_0xdc21('0x84')](_0xdc21('0xc8')),_0x590939(document[_0xdc21('0x69')])[_0xdc21('0x84')](_0xdc21('0xcc')));});var _0x4882a4=_0x7d73e2[_0xdc21('0x4f')]('.qd-ddc-prodWrapper');_0x7d73e2['find'](_0xdc21('0xcd'))['on'](_0xdc21('0xce'),function(){_0x4db4d3[_0xdc21('0xcf')]('-',void 0x0,void 0x0,_0x4882a4);return!0x1;});_0x7d73e2[_0xdc21('0x4f')]('.qd-ddc-scrollDown')['on'](_0xdc21('0xd0'),function(){_0x4db4d3[_0xdc21('0xcf')](void 0x0,void 0x0,void 0x0,_0x4882a4);return!0x1;});_0x7d73e2['find'](_0xdc21('0xd1'))[_0xdc21('0xd2')]('')['on'](_0xdc21('0xd3'),function(){_0x4db4d3[_0xdc21('0xd4')](_0x590939(this));});if(_0x43d942[_0xdc21('0xd5')]){var _0x127247=0x0;_0x590939(this)['on'](_0xdc21('0xd6'),function(){var _0x7d73e2=function(){window[_0xdc21('0x53')][_0xdc21('0x89')]&&(_0x4db4d3[_0xdc21('0x87')](),window[_0xdc21('0x53')]['allowUpdate']=!0x1,_0x590939['fn'][_0xdc21('0x26')](!0x0),_0x4db4d3[_0xdc21('0xd7')]());};_0x127247=setInterval(function(){_0x7d73e2();},0x258);_0x7d73e2();});_0x590939(this)['on'](_0xdc21('0xd8'),function(){clearInterval(_0x127247);});}};var _0x1972df=function(_0x3be2ad){_0x3be2ad=_0x590939(_0x3be2ad);_0x43d942[_0xdc21('0xd9')][_0xdc21('0x50')]=_0x43d942['texts'][_0xdc21('0x50')]['replace'](_0xdc21('0xda'),'<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>');_0x43d942[_0xdc21('0xd9')][_0xdc21('0x50')]=_0x43d942[_0xdc21('0xd9')][_0xdc21('0x50')][_0xdc21('0x2')](_0xdc21('0xdb'),_0xdc21('0xdc'));_0x43d942[_0xdc21('0xd9')][_0xdc21('0x50')]=_0x43d942['texts'][_0xdc21('0x50')][_0xdc21('0x2')]('#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>');_0x43d942[_0xdc21('0xd9')][_0xdc21('0x50')]=_0x43d942[_0xdc21('0xd9')][_0xdc21('0x50')][_0xdc21('0x2')]('#total',_0xdc21('0xdd'));_0x3be2ad[_0xdc21('0x4f')](_0xdc21('0xde'))['html'](_0x43d942['texts'][_0xdc21('0xdf')]);_0x3be2ad['find'](_0xdc21('0xe0'))[_0xdc21('0x4a')](_0x43d942[_0xdc21('0xd9')][_0xdc21('0xe1')]);_0x3be2ad[_0xdc21('0x4f')](_0xdc21('0xe2'))[_0xdc21('0x4a')](_0x43d942[_0xdc21('0xd9')][_0xdc21('0xe3')]);_0x3be2ad[_0xdc21('0x4f')]('.qd-ddc-infoTotal')[_0xdc21('0x4a')](_0x43d942[_0xdc21('0xd9')][_0xdc21('0x50')]);_0x3be2ad[_0xdc21('0x4f')](_0xdc21('0xe4'))[_0xdc21('0x4a')](_0x43d942[_0xdc21('0xd9')][_0xdc21('0xe5')]);_0x3be2ad[_0xdc21('0x4f')](_0xdc21('0xe6'))[_0xdc21('0x4a')](_0x43d942['texts']['emptyCart']);return _0x3be2ad;}(this[_0xdc21('0xe7')]);var _0x36c437=0x0;_0x16f255[_0xdc21('0x4d')](function(){0x0<_0x36c437?_0x5e9fa2['call'](this,_0x1972df[_0xdc21('0xe8')]()):_0x5e9fa2[_0xdc21('0x28')](this,_0x1972df);_0x36c437++;});window[_0xdc21('0x35')][_0xdc21('0x41')][_0xdc21('0x2f')](function(){_0x590939('.qd-ddc-infoTotalValue')[_0xdc21('0x4a')](window[_0xdc21('0x35')]['total']||'--');_0x590939(_0xdc21('0xe9'))['html'](window['_QuatroDigital_CartData'][_0xdc21('0x3d')]||'0');_0x590939(_0xdc21('0xea'))['html'](window[_0xdc21('0x35')]['shipping']||'--');_0x590939(_0xdc21('0xeb'))['html'](window[_0xdc21('0x35')][_0xdc21('0x3c')]||'--');});var _0x13de47=function(_0x2ee1a5,_0x2cc240){if(_0xdc21('0x4')===typeof _0x2ee1a5[_0xdc21('0x3f')])return _0x31eca8('Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição');_0x4db4d3['renderProductsList']['call'](this,_0x2cc240);};_0x4db4d3[_0xdc21('0x87')]=function(_0x148be6,_0x476351){_0xdc21('0x4')!=typeof _0x476351?window[_0xdc21('0x53')][_0xdc21('0xec')]=_0x476351:window[_0xdc21('0x53')][_0xdc21('0xec')]&&(_0x476351=window['_QuatroDigital_DropDown'][_0xdc21('0xec')]);setTimeout(function(){window[_0xdc21('0x53')][_0xdc21('0xec')]=void 0x0;},_0x43d942['timeRemoveNewItemClass']);_0x590939(_0xdc21('0xed'))[_0xdc21('0x84')]('qd-ddc-prodLoaded');if(_0x43d942[_0xdc21('0x52')]){var _0x127247=function(_0x4a4136){window[_0xdc21('0x53')][_0xdc21('0x54')]=_0x4a4136;_0x13de47(_0x4a4136,_0x476351);_0xdc21('0x4')!==typeof window['_QuatroDigital_AmountProduct']&&'function'===typeof window[_0xdc21('0xee')]['exec']&&window['_QuatroDigital_AmountProduct']['exec'][_0xdc21('0x28')](this);_0x590939(_0xdc21('0xed'))['addClass'](_0xdc21('0xef'));};_0xdc21('0x4')!==typeof window[_0xdc21('0x53')]['getOrderForm']?(_0x127247(window[_0xdc21('0x53')][_0xdc21('0x54')]),_0xdc21('0x10')===typeof _0x148be6&&_0x148be6(window[_0xdc21('0x53')]['getOrderForm'])):_0x590939[_0xdc21('0x58')](['items',_0xdc21('0x36'),_0xdc21('0x59')],{'done':function(_0x1ab2b3){_0x127247[_0xdc21('0x28')](this,_0x1ab2b3);'function'===typeof _0x148be6&&_0x148be6(_0x1ab2b3);},'fail':function(_0xb4282f){_0x31eca8(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0xb4282f]);}});}else alert(_0xdc21('0xf0'));};_0x4db4d3[_0xdc21('0xd7')]=function(){var _0x1462e3=_0x590939(_0xdc21('0xed'));_0x1462e3[_0xdc21('0x4f')]('.qd-ddc-prodRow')[_0xdc21('0x9')]?_0x1462e3['removeClass'](_0xdc21('0xf1')):_0x1462e3[_0xdc21('0x7d')](_0xdc21('0xf1'));};_0x4db4d3[_0xdc21('0xf2')]=function(_0x3f1c14){var _0x127247=_0x590939('.qd-ddc-prodWrapper2');_0x127247[_0xdc21('0xf3')]();_0x127247[_0xdc21('0x4d')](function(){var _0x127247=_0x590939(this),_0x3993a9,_0x4d8577,_0x3bfa6b=_0x590939(''),_0xa59352;for(_0xa59352 in window[_0xdc21('0x53')]['getOrderForm'][_0xdc21('0x3f')])if(_0xdc21('0x18')===typeof window[_0xdc21('0x53')][_0xdc21('0x54')][_0xdc21('0x3f')][_0xa59352]){var _0x29168d=window[_0xdc21('0x53')][_0xdc21('0x54')][_0xdc21('0x3f')][_0xa59352];var _0x49f6d2=_0x29168d[_0xdc21('0xf4')][_0xdc21('0x2')](/^\/|\/$/g,'')[_0xdc21('0x8')]('/');var _0x2834fd=_0x590939(_0xdc21('0xf5'));_0x2834fd[_0xdc21('0x80')]({'data-sku':_0x29168d['id'],'data-sku-index':_0xa59352,'data-qd-departament':_0x49f6d2[0x0],'data-qd-category':_0x49f6d2[_0x49f6d2[_0xdc21('0x9')]-0x1]});_0x2834fd[_0xdc21('0x7d')]('qd-ddc-'+_0x29168d['availability']);_0x2834fd['find'](_0xdc21('0xf6'))[_0xdc21('0x78')](_0x43d942[_0xdc21('0xf7')](_0x29168d));_0x2834fd[_0xdc21('0x4f')](_0xdc21('0xf8'))[_0xdc21('0x78')](isNaN(_0x29168d[_0xdc21('0xf9')])?_0x29168d[_0xdc21('0xf9')]:0x0==_0x29168d['sellingPrice']?'Grátis':(_0x590939(_0xdc21('0xfa'))['attr'](_0xdc21('0x33'))||'R$')+'\x20'+qd_number_format(_0x29168d[_0xdc21('0xf9')]/0x64,0x2,',','.'));_0x2834fd[_0xdc21('0x4f')](_0xdc21('0xfb'))[_0xdc21('0x80')]({'data-sku':_0x29168d['id'],'data-sku-index':_0xa59352})[_0xdc21('0xd2')](_0x29168d[_0xdc21('0x40')]);_0x2834fd[_0xdc21('0x4f')]('.qd-ddc-remove')[_0xdc21('0x80')]({'data-sku':_0x29168d['id'],'data-sku-index':_0xa59352});_0x4db4d3[_0xdc21('0xfc')](_0x29168d['id'],_0x2834fd[_0xdc21('0x4f')](_0xdc21('0xfd')),_0x29168d[_0xdc21('0xfe')]);_0x2834fd['find'](_0xdc21('0xff'))[_0xdc21('0x80')]({'data-sku':_0x29168d['id'],'data-sku-index':_0xa59352});_0x2834fd[_0xdc21('0x100')](_0x127247);_0x3bfa6b=_0x3bfa6b['add'](_0x2834fd);}try{var _0x47321e=_0x127247[_0xdc21('0x0')](_0xdc21('0xed'))['find'](_0xdc21('0xd1'));_0x47321e[_0xdc21('0x9')]&&''==_0x47321e['val']()&&window[_0xdc21('0x53')][_0xdc21('0x54')][_0xdc21('0x59')][_0xdc21('0x101')]&&_0x47321e[_0xdc21('0xd2')](window[_0xdc21('0x53')]['getOrderForm'][_0xdc21('0x59')][_0xdc21('0x101')]['postalCode']);}catch(_0x4fe6c3){_0x31eca8(_0xdc21('0x102')+_0x4fe6c3[_0xdc21('0xaf')],'aviso');}_0x4db4d3[_0xdc21('0x103')](_0x127247);_0x4db4d3['cartIsEmpty']();_0x3f1c14&&_0x3f1c14[_0xdc21('0x104')]&&function(){_0x4d8577=_0x3bfa6b[_0xdc21('0x45')](_0xdc21('0x105')+_0x3f1c14[_0xdc21('0x104')]+'\x27]');_0x4d8577['length']&&(_0x3993a9=0x0,_0x3bfa6b[_0xdc21('0x4d')](function(){var _0x3f1c14=_0x590939(this);if(_0x3f1c14['is'](_0x4d8577))return!0x1;_0x3993a9+=_0x3f1c14[_0xdc21('0x106')]();}),_0x4db4d3['scrollCart'](void 0x0,void 0x0,_0x3993a9,_0x127247[_0xdc21('0x2f')](_0x127247[_0xdc21('0x9e')]())),_0x3bfa6b['removeClass'](_0xdc21('0x107')),function(_0x4ae9ad){_0x4ae9ad[_0xdc21('0x7d')](_0xdc21('0x108'));_0x4ae9ad[_0xdc21('0x7d')](_0xdc21('0x107'));setTimeout(function(){_0x4ae9ad[_0xdc21('0x84')](_0xdc21('0x108'));},_0x43d942[_0xdc21('0x86')]);}(_0x4d8577));}();});(function(){_QuatroDigital_DropDown[_0xdc21('0x54')][_0xdc21('0x3f')][_0xdc21('0x9')]?(_0x590939(_0xdc21('0x69'))[_0xdc21('0x84')](_0xdc21('0x109'))[_0xdc21('0x7d')](_0xdc21('0x10a')),setTimeout(function(){_0x590939(_0xdc21('0x69'))[_0xdc21('0x84')](_0xdc21('0x10b'));},_0x43d942[_0xdc21('0x86')])):_0x590939(_0xdc21('0x69'))[_0xdc21('0x84')](_0xdc21('0x10c'))[_0xdc21('0x7d')](_0xdc21('0x109'));}());'function'===typeof _0x43d942[_0xdc21('0x10d')]?_0x43d942[_0xdc21('0x10d')][_0xdc21('0x28')](this):_0x31eca8(_0xdc21('0x10e'));};_0x4db4d3[_0xdc21('0xfc')]=function(_0x3cecc8,_0x5c56c0,_0x1ccd90){function _0x20b3a3(){_0x5c56c0[_0xdc21('0x84')](_0xdc21('0x10f'))[_0xdc21('0x110')](function(){_0x590939(this)[_0xdc21('0x7d')](_0xdc21('0x10f'));})[_0xdc21('0x80')](_0xdc21('0x111'),_0x1ccd90);}_0x1ccd90?_0x20b3a3():isNaN(_0x3cecc8)?_0x31eca8(_0xdc21('0x112'),_0xdc21('0x2b')):alert(_0xdc21('0x113'));};_0x4db4d3[_0xdc21('0x103')]=function(_0x32fa66){var _0x54f60c=function(_0x1ad405,_0x5c7752){var _0x127247=_0x590939(_0x1ad405);var _0x59b6d7=_0x127247['attr']('data-sku');var _0x3993a9=_0x127247[_0xdc21('0x80')](_0xdc21('0x114'));if(_0x59b6d7){var _0x35c495=parseInt(_0x127247[_0xdc21('0xd2')]())||0x1;_0x4db4d3[_0xdc21('0x115')]([_0x59b6d7,_0x3993a9],_0x35c495,_0x35c495+0x1,function(_0x230ccf){_0x127247['val'](_0x230ccf);_0xdc21('0x10')===typeof _0x5c7752&&_0x5c7752();});}};var _0x127247=function(_0x28abc5,_0x511cd2){var _0x127247=_0x590939(_0x28abc5);var _0x246a75=_0x127247['attr'](_0xdc21('0x116'));var _0x3993a9=_0x127247[_0xdc21('0x80')](_0xdc21('0x114'));if(_0x246a75){var _0x3b566c=parseInt(_0x127247[_0xdc21('0xd2')]())||0x2;_0x4db4d3[_0xdc21('0x115')]([_0x246a75,_0x3993a9],_0x3b566c,_0x3b566c-0x1,function(_0x4c5a59){_0x127247[_0xdc21('0xd2')](_0x4c5a59);_0xdc21('0x10')===typeof _0x511cd2&&_0x511cd2();});}};var _0x18225f=function(_0x3a7d9a,_0x3b4842){var _0x127247=_0x590939(_0x3a7d9a);var _0x374203=_0x127247[_0xdc21('0x80')]('data-sku');var _0x3993a9=_0x127247[_0xdc21('0x80')](_0xdc21('0x114'));if(_0x374203){var _0x86b543=parseInt(_0x127247[_0xdc21('0xd2')]())||0x1;_0x4db4d3[_0xdc21('0x115')]([_0x374203,_0x3993a9],0x1,_0x86b543,function(_0x1e9f0a){_0x127247['val'](_0x1e9f0a);'function'===typeof _0x3b4842&&_0x3b4842();});}};var _0x3993a9=_0x32fa66[_0xdc21('0x4f')](_0xdc21('0x117'));_0x3993a9[_0xdc21('0x7d')](_0xdc21('0x118'))['each'](function(){var _0x32fa66=_0x590939(this);_0x32fa66[_0xdc21('0x4f')](_0xdc21('0x119'))['on'](_0xdc21('0x11a'),function(_0x7b230c){_0x7b230c[_0xdc21('0x72')]();_0x3993a9[_0xdc21('0x7d')](_0xdc21('0x11b'));_0x54f60c(_0x32fa66[_0xdc21('0x4f')]('.qd-ddc-quantity'),function(){_0x3993a9[_0xdc21('0x84')](_0xdc21('0x11b'));});});_0x32fa66[_0xdc21('0x4f')](_0xdc21('0x11c'))['on']('click.qd_ddc_minus',function(_0x1ffb09){_0x1ffb09[_0xdc21('0x72')]();_0x3993a9['addClass'](_0xdc21('0x11b'));_0x127247(_0x32fa66[_0xdc21('0x4f')]('.qd-ddc-quantity'),function(){_0x3993a9[_0xdc21('0x84')](_0xdc21('0x11b'));});});_0x32fa66[_0xdc21('0x4f')](_0xdc21('0xfb'))['on']('focusout.qd_ddc_change',function(){_0x3993a9['addClass'](_0xdc21('0x11b'));_0x18225f(this,function(){_0x3993a9[_0xdc21('0x84')](_0xdc21('0x11b'));});});_0x32fa66[_0xdc21('0x4f')](_0xdc21('0xfb'))['on'](_0xdc21('0x11d'),function(_0x1e00b9){0xd==_0x1e00b9[_0xdc21('0xcb')]&&(_0x3993a9[_0xdc21('0x7d')](_0xdc21('0x11b')),_0x18225f(this,function(){_0x3993a9[_0xdc21('0x84')]('qd-loading');}));});});_0x32fa66[_0xdc21('0x4f')]('.qd-ddc-prodRow')['each'](function(){var _0x32fa66=_0x590939(this);_0x32fa66['find']('.qd-ddc-remove')['on'](_0xdc21('0x11e'),function(){_0x32fa66['addClass']('qd-loading');_0x4db4d3[_0xdc21('0x11f')](_0x590939(this),function(_0x48c86d){_0x48c86d?_0x32fa66['stop'](!0x0)[_0xdc21('0x120')](function(){_0x32fa66['remove']();_0x4db4d3[_0xdc21('0xd7')]();}):_0x32fa66[_0xdc21('0x84')](_0xdc21('0x11b'));});return!0x1;});});};_0x4db4d3[_0xdc21('0xd4')]=function(_0x4174a6){var _0x32ccf1=_0x4174a6[_0xdc21('0xd2')](),_0x32ccf1=_0x32ccf1[_0xdc21('0x2')](/[^0-9\-]/g,''),_0x32ccf1=_0x32ccf1['replace'](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0xdc21('0x121')),_0x32ccf1=_0x32ccf1[_0xdc21('0x2')](/(.{9}).*/g,'$1');_0x4174a6[_0xdc21('0xd2')](_0x32ccf1);0x9<=_0x32ccf1[_0xdc21('0x9')]&&(_0x4174a6[_0xdc21('0x19')]('qdDdcLastPostalCode')!=_0x32ccf1&&_0x15ff03['calculateShipping']({'postalCode':_0x32ccf1,'country':_0xdc21('0x122')})[_0xdc21('0x1e')](function(_0x579d7c){window[_0xdc21('0x53')][_0xdc21('0x54')]=_0x579d7c;_0x4db4d3[_0xdc21('0x87')]();})[_0xdc21('0x20')](function(_0x29a869){_0x31eca8([_0xdc21('0x123'),_0x29a869]);updateCartData();}),_0x4174a6[_0xdc21('0x19')](_0xdc21('0x124'),_0x32ccf1));};_0x4db4d3[_0xdc21('0x115')]=function(_0x1c41d7,_0x1e4301,_0x31210e,_0x41a6a3){function _0xce65cf(_0x4c99d0){_0x4c99d0='boolean'!==typeof _0x4c99d0?!0x1:_0x4c99d0;_0x4db4d3['getCartInfoByUrl']();window[_0xdc21('0x53')]['allowUpdate']=!0x1;_0x4db4d3[_0xdc21('0xd7')]();_0xdc21('0x4')!==typeof window[_0xdc21('0xee')]&&_0xdc21('0x10')===typeof window[_0xdc21('0xee')][_0xdc21('0x125')]&&window['_QuatroDigital_AmountProduct'][_0xdc21('0x125')]['call'](this);'function'===typeof adminCart&&adminCart();_0x590939['fn'][_0xdc21('0x26')](!0x0,void 0x0,_0x4c99d0);'function'===typeof _0x41a6a3&&_0x41a6a3(_0x1e4301);}_0x31210e=_0x31210e||0x1;if(0x1>_0x31210e)return _0x1e4301;if(_0x43d942[_0xdc21('0x52')]){if(_0xdc21('0x4')===typeof window[_0xdc21('0x53')][_0xdc21('0x54')][_0xdc21('0x3f')][_0x1c41d7[0x1]])return _0x31eca8(_0xdc21('0x126')+_0x1c41d7[0x1]+']'),_0x1e4301;window[_0xdc21('0x53')][_0xdc21('0x54')][_0xdc21('0x3f')][_0x1c41d7[0x1]][_0xdc21('0x40')]=_0x31210e;window['_QuatroDigital_DropDown']['getOrderForm'][_0xdc21('0x3f')][_0x1c41d7[0x1]][_0xdc21('0x127')]=_0x1c41d7[0x1];_0x15ff03[_0xdc21('0x128')]([window[_0xdc21('0x53')][_0xdc21('0x54')][_0xdc21('0x3f')][_0x1c41d7[0x1]]],['items',_0xdc21('0x36'),'shippingData'])['done'](function(_0x4c71b9){window['_QuatroDigital_DropDown'][_0xdc21('0x54')]=_0x4c71b9;_0xce65cf(!0x0);})[_0xdc21('0x20')](function(_0x5a4a2a){_0x31eca8([_0xdc21('0x129'),_0x5a4a2a]);_0xce65cf();});}else _0x31eca8(_0xdc21('0x12a'));};_0x4db4d3[_0xdc21('0x11f')]=function(_0x3157c0,_0x493e63){function _0x48b3a4(_0x129994){_0x129994=_0xdc21('0x12b')!==typeof _0x129994?!0x1:_0x129994;_0xdc21('0x4')!==typeof window[_0xdc21('0xee')]&&_0xdc21('0x10')===typeof window['_QuatroDigital_AmountProduct']['exec']&&window['_QuatroDigital_AmountProduct'][_0xdc21('0x125')]['call'](this);_0xdc21('0x10')===typeof adminCart&&adminCart();_0x590939['fn'][_0xdc21('0x26')](!0x0,void 0x0,_0x129994);_0xdc21('0x10')===typeof _0x493e63&&_0x493e63(_0x3993a9);}var _0x3993a9=!0x1,_0x17209b=_0x590939(_0x3157c0)[_0xdc21('0x80')]('data-sku-index');if(_0x43d942[_0xdc21('0x52')]){if('undefined'===typeof window[_0xdc21('0x53')][_0xdc21('0x54')][_0xdc21('0x3f')][_0x17209b])return _0x31eca8(_0xdc21('0x126')+_0x17209b+']'),_0x3993a9;window[_0xdc21('0x53')][_0xdc21('0x54')][_0xdc21('0x3f')][_0x17209b][_0xdc21('0x127')]=_0x17209b;_0x15ff03[_0xdc21('0x12c')]([window[_0xdc21('0x53')][_0xdc21('0x54')][_0xdc21('0x3f')][_0x17209b]],[_0xdc21('0x3f'),_0xdc21('0x36'),'shippingData'])[_0xdc21('0x1e')](function(_0x548272){_0x3993a9=!0x0;window[_0xdc21('0x53')][_0xdc21('0x54')]=_0x548272;_0x13de47(_0x548272);_0x48b3a4(!0x0);})[_0xdc21('0x20')](function(_0x57b606){_0x31eca8([_0xdc21('0x12d'),_0x57b606]);_0x48b3a4();});}else alert('Atenção,\x20este\x20método\x20esta\x20descontinuado.');};_0x4db4d3['scrollCart']=function(_0x97e5f7,_0x1eb35d,_0x4d675f,_0x27cfba){_0x27cfba=_0x27cfba||_0x590939(_0xdc21('0x12e'));_0x97e5f7=_0x97e5f7||'+';_0x1eb35d=_0x1eb35d||0.9*_0x27cfba[_0xdc21('0x12f')]();_0x27cfba['stop'](!0x0,!0x0)[_0xdc21('0x130')]({'scrollTop':isNaN(_0x4d675f)?_0x97e5f7+'='+_0x1eb35d+'px':_0x4d675f});};_0x43d942[_0xdc21('0xd5')]||(_0x4db4d3[_0xdc21('0x87')](),_0x590939['fn'][_0xdc21('0x26')](!0x0));_0x590939(window)['on'](_0xdc21('0x131'),function(){try{window['_QuatroDigital_DropDown']['getOrderForm']=void 0x0,_0x4db4d3[_0xdc21('0x87')]();}catch(_0x6219fd){_0x31eca8(_0xdc21('0x132')+_0x6219fd[_0xdc21('0xaf')],_0xdc21('0x133'));}});_0xdc21('0x10')===typeof _0x43d942[_0xdc21('0x41')]?_0x43d942[_0xdc21('0x41')][_0xdc21('0x28')](this):_0x31eca8(_0xdc21('0xa0'));};_0x590939['fn'][_0xdc21('0xb2')]=function(_0x5c34ce){var _0x43091d=_0x590939(this);_0x43091d['fn']=new _0x590939[(_0xdc21('0xb2'))](this,_0x5c34ce);return _0x43091d;};}catch(_0x16f310){_0xdc21('0x4')!==typeof console&&_0xdc21('0x10')===typeof console['error']&&console[_0xdc21('0x15')](_0xdc21('0x61'),_0x16f310);}}(this));(function(_0x13f8f2){try{var _0x4a5e8c=jQuery;window[_0xdc21('0xee')]=window[_0xdc21('0xee')]||{};window[_0xdc21('0xee')][_0xdc21('0x3f')]={};window['_QuatroDigital_AmountProduct']['allowRecalculate']=!0x1;window[_0xdc21('0xee')]['buyButtonClicked']=!0x1;window[_0xdc21('0xee')][_0xdc21('0x134')]=!0x1;var _0x35ff31=function(){if(window[_0xdc21('0xee')][_0xdc21('0x135')]){var _0x384270=!0x1;var _0x13f8f2={};window[_0xdc21('0xee')][_0xdc21('0x3f')]={};for(_0xd48987 in window['_QuatroDigital_DropDown'][_0xdc21('0x54')][_0xdc21('0x3f')])if(_0xdc21('0x18')===typeof window[_0xdc21('0x53')]['getOrderForm']['items'][_0xd48987]){var _0x476ac8=window[_0xdc21('0x53')][_0xdc21('0x54')][_0xdc21('0x3f')][_0xd48987];_0xdc21('0x4')!==typeof _0x476ac8[_0xdc21('0x136')]&&null!==_0x476ac8['productId']&&''!==_0x476ac8[_0xdc21('0x136')]&&(window['_QuatroDigital_AmountProduct'][_0xdc21('0x3f')]['prod_'+_0x476ac8[_0xdc21('0x136')]]=window[_0xdc21('0xee')][_0xdc21('0x3f')][_0xdc21('0x137')+_0x476ac8[_0xdc21('0x136')]]||{},window['_QuatroDigital_AmountProduct']['items'][_0xdc21('0x137')+_0x476ac8['productId']][_0xdc21('0x138')]=_0x476ac8[_0xdc21('0x136')],_0x13f8f2[_0xdc21('0x137')+_0x476ac8['productId']]||(window[_0xdc21('0xee')][_0xdc21('0x3f')][_0xdc21('0x137')+_0x476ac8[_0xdc21('0x136')]][_0xdc21('0x3d')]=0x0),window[_0xdc21('0xee')]['items'][_0xdc21('0x137')+_0x476ac8['productId']][_0xdc21('0x3d')]+=_0x476ac8[_0xdc21('0x40')],_0x384270=!0x0,_0x13f8f2[_0xdc21('0x137')+_0x476ac8['productId']]=!0x0);}var _0xd48987=_0x384270;}else _0xd48987=void 0x0;window[_0xdc21('0xee')][_0xdc21('0x135')]&&(_0x4a5e8c(_0xdc21('0x139'))['remove'](),_0x4a5e8c(_0xdc21('0x13a'))[_0xdc21('0x84')](_0xdc21('0x13b')));for(var _0x2d3055 in window[_0xdc21('0xee')][_0xdc21('0x3f')]){_0x476ac8=window['_QuatroDigital_AmountProduct'][_0xdc21('0x3f')][_0x2d3055];if('object'!==typeof _0x476ac8)return;_0x13f8f2=_0x4a5e8c(_0xdc21('0x13c')+_0x476ac8[_0xdc21('0x138')]+']')[_0xdc21('0x0')]('li');if(window[_0xdc21('0xee')][_0xdc21('0x135')]||!_0x13f8f2[_0xdc21('0x4f')]('.qd-bap-wrapper')[_0xdc21('0x9')])_0x384270=_0x4a5e8c('<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>'),_0x384270[_0xdc21('0x4f')](_0xdc21('0x13d'))[_0xdc21('0x4a')](_0x476ac8['qtt']),_0x476ac8=_0x13f8f2[_0xdc21('0x4f')](_0xdc21('0x13e')),_0x476ac8[_0xdc21('0x9')]?_0x476ac8[_0xdc21('0xa5')](_0x384270)['addClass'](_0xdc21('0x13b')):_0x13f8f2[_0xdc21('0xa5')](_0x384270);}_0xd48987&&(window['_QuatroDigital_AmountProduct']['allowRecalculate']=!0x1);};window[_0xdc21('0xee')][_0xdc21('0x125')]=function(){window['_QuatroDigital_AmountProduct']['allowRecalculate']=!0x0;_0x35ff31[_0xdc21('0x28')](this);};_0x4a5e8c(document)[_0xdc21('0xae')](function(){_0x35ff31[_0xdc21('0x28')](this);});}catch(_0x4e2c8c){_0xdc21('0x4')!==typeof console&&'function'===typeof console[_0xdc21('0x15')]&&console[_0xdc21('0x15')]('Oooops!\x20',_0x4e2c8c);}}(this));(function(){try{var _0x3200eb=jQuery,_0x412655,_0x5a0ea3={'selector':_0xdc21('0x13f'),'dropDown':{},'buyButton':{}};_0x3200eb['QD_smartCart']=function(_0x138e36){var _0x230d9d={};_0x412655=_0x3200eb[_0xdc21('0x16')](!0x0,{},_0x5a0ea3,_0x138e36);_0x138e36=_0x3200eb(_0x412655[_0xdc21('0x7b')])[_0xdc21('0xb2')](_0x412655[_0xdc21('0x140')]);_0x230d9d[_0xdc21('0x7e')]=_0xdc21('0x4')!==typeof _0x412655[_0xdc21('0x140')][_0xdc21('0xd5')]&&!0x1===_0x412655[_0xdc21('0x140')][_0xdc21('0xd5')]?_0x3200eb(_0x412655['selector'])[_0xdc21('0xa2')](_0x138e36['fn'],_0x412655[_0xdc21('0x7e')]):_0x3200eb(_0x412655[_0xdc21('0x7b')])[_0xdc21('0xa2')](_0x412655[_0xdc21('0x7e')]);_0x230d9d[_0xdc21('0x140')]=_0x138e36;return _0x230d9d;};_0x3200eb['fn'][_0xdc21('0x141')]=function(){_0xdc21('0x18')===typeof console&&_0xdc21('0x10')===typeof console[_0xdc21('0x2e')]&&console[_0xdc21('0x2e')](_0xdc21('0x142'));};_0x3200eb[_0xdc21('0x141')]=_0x3200eb['fn'][_0xdc21('0x141')];}catch(_0x4828da){_0xdc21('0x4')!==typeof console&&_0xdc21('0x10')===typeof console[_0xdc21('0x15')]&&console[_0xdc21('0x15')](_0xdc21('0x61'),_0x4828da);}}());
/* Quatro Digital - Smart Stock Available */
var _0xc8ae=['qd-ssa-sku-prod-unavailable','vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','ite','join','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','initialSkuSelected','QuatroDigital.ssa.skuSelected','prod','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','unavailable','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','available','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','qdAjax','/produto/sku/','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','function','QD_smartStockAvailable','object','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','undefined','alerta','toLowerCase','info','apply','error','warn','removeClass','addClass','SkuSellersInformation','AvailableQuantity','data-qd-ssa-qtt','each','find','[data-qd-ssa-text]','hide','[data-qd-ssa-text=\x22','[data-qd-ssa-text=\x22default\x22]','qd-ssa-hide','html','#qtt','show','qd-ssa-show','length','qd-ssa-on','qd-ssa-sku-no-selected','qd-ssa-skus-','split','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','message','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','skus','trigger','QuatroDigital.ssa.prodUnavailable','off','vtex.sku.selected.QD'];(function(_0x41188f,_0x43488c){var _0x356950=function(_0x5c9350){while(--_0x5c9350){_0x41188f['push'](_0x41188f['shift']());}};_0x356950(++_0x43488c);}(_0xc8ae,0x122));var _0xec8a=function(_0x3d1da3,_0x2d6b14){_0x3d1da3=_0x3d1da3-0x0;var _0x36dea5=_0xc8ae[_0x3d1da3];return _0x36dea5;};(function(_0x217bd5){function _0x5841b1(_0x600e34,_0xdc127d){_0x1099a8[_0xec8a('0x0')]({'url':_0xec8a('0x1')+_0x600e34,'clearQueueDelay':null,'success':_0xdc127d,'error':function(){_0x38cc1b(_0xec8a('0x2'));}});}var _0x1099a8=jQuery;if(_0xec8a('0x3')!==typeof _0x1099a8['fn'][_0xec8a('0x4')]){var _0x38cc1b=function(_0x16bea2,_0x1bea7f){if(_0xec8a('0x5')===typeof console){var _0x5a1ab1;_0xec8a('0x5')===typeof _0x16bea2?(_0x16bea2[_0xec8a('0x6')](_0xec8a('0x7')),_0x5a1ab1=_0x16bea2):_0x5a1ab1=['[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a'+_0x16bea2];_0xec8a('0x8')===typeof _0x1bea7f||_0xec8a('0x9')!==_0x1bea7f['toLowerCase']()&&'aviso'!==_0x1bea7f[_0xec8a('0xa')]()?_0xec8a('0x8')!==typeof _0x1bea7f&&_0xec8a('0xb')===_0x1bea7f['toLowerCase']()?console[_0xec8a('0xb')][_0xec8a('0xc')](console,_0x5a1ab1):console[_0xec8a('0xd')][_0xec8a('0xc')](console,_0x5a1ab1):console[_0xec8a('0xe')][_0xec8a('0xc')](console,_0x5a1ab1);}},_0x12c23b={},_0x2ca997=function(_0x841e81,_0x2d98a7){function _0x20311d(_0x15d549){try{_0x841e81[_0xec8a('0xf')]('qd-ssa-sku-no-selected')[_0xec8a('0x10')]('qd-ssa-sku-selected');var _0x1de1d7=_0x15d549[0x0][_0xec8a('0x11')][0x0][_0xec8a('0x12')];_0x841e81['attr'](_0xec8a('0x13'),_0x1de1d7);_0x841e81[_0xec8a('0x14')](function(){var _0x841e81=_0x1099a8(this)[_0xec8a('0x15')](_0xec8a('0x16'));if(0x1>_0x1de1d7)return _0x841e81[_0xec8a('0x17')]()[_0xec8a('0x10')]('qd-ssa-hide')[_0xec8a('0xf')]('qd-ssa-show');var _0x15d549=_0x841e81['filter'](_0xec8a('0x18')+_0x1de1d7+'\x22]'),_0x15d549=_0x15d549['length']?_0x15d549:_0x841e81['filter'](_0xec8a('0x19'));_0x841e81['hide']()[_0xec8a('0x10')](_0xec8a('0x1a'))[_0xec8a('0xf')]('qd-ssa-show');_0x15d549[_0xec8a('0x1b')](_0x15d549[_0xec8a('0x1b')]()['replace'](_0xec8a('0x1c'),_0x1de1d7));_0x15d549[_0xec8a('0x1d')]()[_0xec8a('0x10')](_0xec8a('0x1e'))[_0xec8a('0xf')](_0xec8a('0x1a'));});}catch(_0x54bc78){_0x38cc1b(['Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20',_0x54bc78['message']]);}}if(_0x841e81[_0xec8a('0x1f')]){_0x841e81[_0xec8a('0x10')](_0xec8a('0x20'));_0x841e81[_0xec8a('0x10')](_0xec8a('0x21'));try{_0x841e81[_0xec8a('0x10')](_0xec8a('0x22')+vtxctx['skus'][_0xec8a('0x23')](';')['length']);}catch(_0x56e5e7){_0x38cc1b([_0xec8a('0x24'),_0x56e5e7[_0xec8a('0x25')]]);}_0x1099a8(window)['on'](_0xec8a('0x26'),function(_0x2526f2,_0x16d97f,_0x3d9023){try{_0x5841b1(_0x3d9023[_0xec8a('0x27')],function(_0x23ba2a){_0x20311d(_0x23ba2a);0x1===vtxctx[_0xec8a('0x28')][_0xec8a('0x23')](';')['length']&&0x0==_0x23ba2a[0x0][_0xec8a('0x11')][0x0][_0xec8a('0x12')]&&_0x1099a8(window)[_0xec8a('0x29')](_0xec8a('0x2a'));});}catch(_0x484374){_0x38cc1b(['Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20',_0x484374[_0xec8a('0x25')]]);}});_0x1099a8(window)[_0xec8a('0x2b')](_0xec8a('0x2c'));_0x1099a8(window)['on'](_0xec8a('0x2a'),function(){_0x841e81[_0xec8a('0x10')](_0xec8a('0x2d'))[_0xec8a('0x17')]();});}};_0x217bd5=function(_0x1bf138){var _0x4298df={'i':_0xec8a('0x2e')};return function(_0x310e6f){var _0x1e023a=function(_0x2b93cd){return _0x2b93cd;};var _0x32ca4c=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x310e6f=_0x310e6f['d'+_0x32ca4c[0x10]+'c'+_0x32ca4c[0x11]+'m'+_0x1e023a(_0x32ca4c[0x1])+'n'+_0x32ca4c[0xd]]['l'+_0x32ca4c[0x12]+'c'+_0x32ca4c[0x0]+'ti'+_0x1e023a('o')+'n'];var _0x1e38f7=function(_0x1cbccd){return escape(encodeURIComponent(_0x1cbccd[_0xec8a('0x2f')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x41b305){return String[_0xec8a('0x30')](('Z'>=_0x41b305?0x5a:0x7a)>=(_0x41b305=_0x41b305[_0xec8a('0x31')](0x0)+0xd)?_0x41b305:_0x41b305-0x1a);})));};var _0x51eb90=_0x1e38f7(_0x310e6f[[_0x32ca4c[0x9],_0x1e023a('o'),_0x32ca4c[0xc],_0x32ca4c[_0x1e023a(0xd)]]['join']('')]);_0x1e38f7=_0x1e38f7((window[['js',_0x1e023a('no'),'m',_0x32ca4c[0x1],_0x32ca4c[0x4][_0xec8a('0x32')](),_0xec8a('0x33')][_0xec8a('0x34')]('')]||'---')+['.v',_0x32ca4c[0xd],'e',_0x1e023a('x'),'co',_0x1e023a('mm'),_0xec8a('0x35'),_0x32ca4c[0x1],'.c',_0x1e023a('o'),'m.',_0x32ca4c[0x13],'r']['join'](''));for(var _0x4e938e in _0x4298df){if(_0x1e38f7===_0x4e938e+_0x4298df[_0x4e938e]||_0x51eb90===_0x4e938e+_0x4298df[_0x4e938e]){var _0x217bd5='tr'+_0x32ca4c[0x11]+'e';break;}_0x217bd5='f'+_0x32ca4c[0x0]+'ls'+_0x1e023a(_0x32ca4c[0x1])+'';}_0x1e023a=!0x1;-0x1<_0x310e6f[[_0x32ca4c[0xc],'e',_0x32ca4c[0x0],'rc',_0x32ca4c[0x9]]['join']('')][_0xec8a('0x36')](_0xec8a('0x37'))&&(_0x1e023a=!0x0);return[_0x217bd5,_0x1e023a];}(_0x1bf138);}(window);if(!eval(_0x217bd5[0x0]))return _0x217bd5[0x1]?_0x38cc1b(_0xec8a('0x38')):!0x1;_0x1099a8['fn'][_0xec8a('0x4')]=function(_0xea490c){var _0x5338b3=_0x1099a8(this);_0xea490c=_0x1099a8['extend'](!0x0,{},_0x12c23b,_0xea490c);_0x5338b3['qdPlugin']=new _0x2ca997(_0x5338b3,_0xea490c);try{_0xec8a('0x5')===typeof _0x1099a8['fn'][_0xec8a('0x4')][_0xec8a('0x39')]&&_0x1099a8(window)['trigger'](_0xec8a('0x3a'),[_0x1099a8['fn'][_0xec8a('0x4')][_0xec8a('0x39')][_0xec8a('0x3b')],_0x1099a8['fn'][_0xec8a('0x4')][_0xec8a('0x39')][_0xec8a('0x27')]]);}catch(_0x4cfab7){_0x38cc1b([_0xec8a('0x3c'),_0x4cfab7[_0xec8a('0x25')]]);}_0x1099a8['fn'][_0xec8a('0x4')][_0xec8a('0x3d')]&&_0x1099a8(window)[_0xec8a('0x29')](_0xec8a('0x2a'));return _0x5338b3;};_0x1099a8(window)['on']('vtex.sku.selected.QD',function(_0x1c815b,_0x297622,_0x445563){try{_0x1099a8['fn'][_0xec8a('0x4')][_0xec8a('0x39')]={'prod':_0x297622,'sku':_0x445563},_0x1099a8(this)['off'](_0x1c815b);}catch(_0x5a4ba){_0x38cc1b([_0xec8a('0x3e'),_0x5a4ba[_0xec8a('0x25')]]);}});_0x1099a8(window)['on'](_0xec8a('0x3f'),function(_0x2ebf62,_0x307548,_0x20212f){try{for(var _0x346fa8=_0x20212f[_0xec8a('0x1f')],_0x5ef9f8=_0x307548=0x0;_0x5ef9f8<_0x346fa8&&!_0x20212f[_0x5ef9f8][_0xec8a('0x40')];_0x5ef9f8++)_0x307548+=0x1;_0x346fa8<=_0x307548&&(_0x1099a8['fn'][_0xec8a('0x4')][_0xec8a('0x3d')]=!0x0);_0x1099a8(this)[_0xec8a('0x2b')](_0x2ebf62);}catch(_0x3950bf){_0x38cc1b([_0xec8a('0x41'),_0x3950bf['message']]);}});_0x1099a8(function(){_0x1099a8(_0xec8a('0x42'))['QD_smartStockAvailable']();});}}(window));



// -include ../qd-quatro-lib-plugins/Infinity Scroll Memory/QD_infinityScrollMemory.min.js
