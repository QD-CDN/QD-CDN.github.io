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

			$('.header-qd-v1-close-amazing-menu-mobile').click(function (evt) {
				$(document.body).removeClass(Common.qdOverlayClass);
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

			if (wrapper.find('.box-banner').length < 1) 
				return;

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
			Search.hideExtendedMenu();
			Search.openFiltersMenu();
			Search.shelfLineFix();
			// Search.showSearchNavigatorFilters();
			Search.smartResearchInit();
			Search.hideEmptyH();
			Home.sliderFull();

		},
		ajaxStop: function () {
			Search.shelfLineFix();
		},
		windowOnload: function () {
			Search.shelfLineFix();
		},
		openFiltersMenu: function () {
			$('.search-qd-v1-navigator-trigger').click(function(e) {
				e.preventDefault();
				$(document.body).toggleClass('qd-sn-on');
				$('.search-qd-v1-navigator-close').appendTo('.navigation-tabs');
			});

			$('.search-qd-v1-navigator-close').click(function() {
				$(document.body).removeClass('qd-sn-on');
			});
		},
		showSearchNavigatorFilters: function () {
			$('.search-qd-v1-navigator h3, .search-qd-v1-navigator h4, .search-qd-v1-navigator h5').each(function () {
				var $t = $(this);

				if (!$t.next('div, ul').children().length)
					return;

				$('<span class="arrow"><i class="fa fa-caret-up"></i></span>').click(function (e) {
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
			$('.search-qd-v1-navigator').css('display', 'none');
			$(".search-qd-v1-navigator input[type='checkbox']").QD_SmartResearch({
				insertMenuAfter: ".search-multiple-navigator",
				filterScrollTop: function (shelfOffset) {
					return (shelfOffset.top - 80);
				}
			});
			$('.search-qd-v1-navigator').css('display', 'block');
		},
		hideExtendedMenu: function () {
			$(".search-qd-v1-navigator ul").each(function () {
				var t, li, qtt, moreLink, moreLi, click, liHide;

				t = $(this);
				li = t.find(">li");
				qtt = 5;

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
			var wrapperSingle = $(".search-single-navigator");
			// wrapperSingle.find('h3, h4, h5').toggleClass('qd-seach-active-menu');
			wrapperSingle.find('h3, h4, h5').find("+ div").stop(true, true).slideToggle();
			
			var wrapper = $(".search-single-navigator, .search-multiple-navigator");

			wrapper.find('h3, h4, h5').toggleClass('qd-seach-active-menu');
			wrapper.find('h3, h4, h5').find("+ ul").stop(true, true).slideToggle();

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
		hideEmptyH: function(){
			var h = $(".qd-seach-active-menu");

			h.each(function () {
				var emptyH = $(this).find("+ ul");
				console.log(emptyH.length);
				if (emptyH.length > 0 && emptyH.text().trim() == "") {
					$(this).hide();
				}
			});
		}
	};

	var Product = {
		run: function () { },
		init: function () {
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
			Product.smartStockInit();
			Product.applyCarouselThumb(); $(window).on('skuSelected.vtex', Product.applyCarouselThumb);$(window).on('skuSelectable.vtex', Product.applyCarouselThumb);
			Product.forceImageZoom(); $(window).on('skuSelected.vtex', Product.forceImageZoom); $(window).on('skuSelectable.vtex', Product.forceImageZoom);
		},
		ajaxStop: function () { },
		windowOnload: function () {
			Product.tooltipActivate();

		},
		smartStockInit: function(){
			$('.qd_smart_stock_available').QD_smartStockAvailable();
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
				$('.zoomContainer').remove();
				var sliderWrapper = $('.product-qd-v1-image-carrousel');
				var image = sliderWrapper.find('.slick-current img');
		
				image.attr('data-zoom-image', image.attr("src").replace(/(ids\/[0-9]+)[0-9-]+/i, "$1-1200-1804"));
				image.elevateZoom({ zoomType: "inner", cursor: 'pointer' });
		
				sliderWrapper.on('afterChange', function (event, slick, slide) {
					$('.zoomContainer').remove();
					var newImage = sliderWrapper.find('.slick-current img');
		
					newImage.attr('data-zoom-image', newImage.attr("src").replace(/(ids\/[0-9]+)[0-9-]+/i, "$1-1200-1804"));
					newImage.elevateZoom({ zoomType: "inner", cursor: 'pointer' });
		
					image = newImage;
				});
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
			var vtexThumbs = $('.thumbs').last(); // Wrapper onde foi inserido as thumbs
			var thumbsWrapper = $('.product-qd-v1-image-thumbs'); // Wrapper onde foi inserido as thumbs
		
			sliderWrapper.filter('.slick-initialized').slick('unslick');
			thumbsWrapper.filter('.slick-initialized').slick('unslick');
		
			thumbsWrapper.html(vtexThumbs.html());
		
			thumbsWrapper.find('img').each(function () {
				$t = $(this);
				$t.attr('src', $t.attr('src').replace('-55-55', '-150-150'));
				$t.attr('src', $t.attr('src').replace('-60-60', '-155-155'));
			});
		
			sliderWrapper.empty();
			vtexThumbs.find('a').each(function (index) {
				$t = $(this);
				$('<div class="qd-slide qd-product-image-' + index + '"><a href="' + $t.attr('rel').replace('-292-292', '-640-640') + '"><img src="' + $t.attr('rel').replace('-292-292', '-640-640') + '"/></a></div>').appendTo(sliderWrapper);
			});
		
			var options = {
				slidesToShow: 1,
				slidesToScroll: 1
			};
			sliderWrapper.slick(options, {
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
			});
		
			var thumb = thumbsWrapper.find('li >a');		
		
			sliderWrapper.slick('getSlick').slickGoTo(0);

			thumb.each(function (index) {
				$(this).click(function () {
					sliderWrapper.slick('getSlick').slickGoTo(index);
				});
			});
			
			sliderWrapper.on('afterChange', function (event, slick, slide) {
				sliderWrapper.find('qd-slide').attr('data-slick-index');		
				var selectedSlide = sliderWrapper.find('.slick-active').attr('data-slick-index');
				thumb.removeClass('ON');
				thumbsWrapper.find('li >a:eq(' + selectedSlide + ')').addClass('ON');		
			});
		
			sliderWrapper.find('a').click(function (e) { e.preventDefault() });
		},
		openShipping: function () {
			if (typeof window.ShippingValue === "function")
				window.ShippingValue();
		},
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
/* Slick.js - Version: 1.6.0 - Author: Ken Wheeler - Website: http://kenwheeler.github.io - Docs: http://kenwheeler.github.io/slick - Repo: http://github.com/kenwheeler/slick - Issues: http://github.com/kenwheeler/slick/issues */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,e=this;e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(b,c){return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.focussed=!1,e.interrupted=!1,e.hidden="hidden",e.paused=!0,e.positionProp=null,e.respondTo=null,e.rowCount=1,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.visibilityChange="visibilitychange",e.windowWidth=0,e.windowTimer=null,f=a(c).data("slick")||{},e.options=a.extend({},e.defaults,d,f),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,"undefined"!=typeof document.mozHidden?(e.hidden="mozHidden",e.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(e.hidden="webkitHidden",e.visibilityChange="webkitvisibilitychange"),e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.changeSlide=a.proxy(e.changeSlide,e),e.clickHandler=a.proxy(e.clickHandler,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.registerBreakpoints(),e.init(!0)}var b=0;return c}(),b.prototype.activateADA=function(){var a=this;a.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},b.prototype.addSlide=b.prototype.slickAdd=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("data-slick-index",b)}),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.animate({height:b},a.options.speed)}},b.prototype.animateSlide=function(b,c){var d={},e=this;e.animateHeight(),e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?(e.options.rtl===!0&&(e.currentLeft=-e.currentLeft),a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){a=Math.ceil(a),e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}})):(e.applyTransition(),b=Math.ceil(b),e.options.vertical===!1?d[e.animType]="translate3d("+b+"px, 0px, 0px)":d[e.animType]="translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.getNavTarget=function(){var b=this,c=b.options.asNavFor;return c&&null!==c&&(c=a(c).not(b.$slider)),c},b.prototype.asNavFor=function(b){var c=this,d=c.getNavTarget();null!==d&&"object"==typeof d&&d.each(function(){var c=a(this).slick("getSlick");c.unslicked||c.slideHandler(b,!0)})},b.prototype.applyTransition=function(a){var b=this,c={};b.options.fade===!1?c[b.transitionType]=b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:c[b.transitionType]="opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayClear(),a.slideCount>a.options.slidesToShow&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this,b=a.currentSlide+a.options.slidesToScroll;a.paused||a.interrupted||a.focussed||(a.options.infinite===!1&&(1===a.direction&&a.currentSlide+1===a.slideCount-1?a.direction=0:0===a.direction&&(b=a.currentSlide-a.options.slidesToScroll,a.currentSlide-1===0&&(a.direction=1))),a.slideHandler(b))},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&(b.$prevArrow=a(b.options.prevArrow).addClass("slick-arrow"),b.$nextArrow=a(b.options.nextArrow).addClass("slick-arrow"),b.slideCount>b.options.slidesToShow?(b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.prependTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(b.$slider.addClass("slick-dotted"),d=a("<ul />").addClass(b.options.dotsClass),c=0;c<=b.getDotCount();c+=1)d.append(a("<li />").append(b.options.customPaging.call(this,b,c)));b.$dots=d.appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden","false")}},b.prototype.buildOut=function(){var b=this;b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide"),b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("data-slick-index",b).data("originalStyling",a(c).attr("style")||"")}),b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),(b.options.centerMode===!0||b.options.swipeToSlide===!0)&&(b.options.slidesToScroll=1),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.buildRows=function(){var b,c,d,e,f,g,h,a=this;if(e=document.createDocumentFragment(),g=a.$slider.children(),a.options.rows>1){for(h=a.options.slidesPerRow*a.options.rows,f=Math.ceil(g.length/h),b=0;f>b;b++){var i=document.createElement("div");for(c=0;c<a.options.rows;c++){var j=document.createElement("div");for(d=0;d<a.options.slidesPerRow;d++){var k=b*h+(c*a.options.slidesPerRow+d);g.get(k)&&j.appendChild(g.get(k))}i.appendChild(j)}e.appendChild(i)}a.$slider.empty().append(e),a.$slider.children().children().children().css({width:100/a.options.slidesPerRow+"%",display:"inline-block"})}},b.prototype.checkResponsive=function(b,c){var e,f,g,d=this,h=!1,i=d.$slider.width(),j=window.innerWidth||a(window).width();if("window"===d.respondTo?g=j:"slider"===d.respondTo?g=i:"min"===d.respondTo&&(g=Math.min(j,i)),d.options.responsive&&d.options.responsive.length&&null!==d.options.responsive){f=null;for(e in d.breakpoints)d.breakpoints.hasOwnProperty(e)&&(d.originalSettings.mobileFirst===!1?g<d.breakpoints[e]&&(f=d.breakpoints[e]):g>d.breakpoints[e]&&(f=d.breakpoints[e]));null!==f?null!==d.activeBreakpoint?(f!==d.activeBreakpoint||c)&&(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):null!==d.activeBreakpoint&&(d.activeBreakpoint=null,d.options=d.originalSettings,b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b),h=f),b||h===!1||d.$slider.trigger("breakpoint",[d,h])}},b.prototype.changeSlide=function(b,c){var f,g,h,d=this,e=a(b.currentTarget);switch(e.is("a")&&b.preventDefault(),e.is("li")||(e=e.closest("li")),h=d.slideCount%d.options.slidesToScroll!==0,f=h?0:(d.slideCount-d.currentSlide)%d.options.slidesToScroll,b.data.message){case"previous":g=0===f?d.options.slidesToScroll:d.options.slidesToShow-f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide-g,!1,c);break;case"next":g=0===f?d.options.slidesToScroll:f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide+g,!1,c);break;case"index":var i=0===b.data.index?0:b.data.index||e.index()*d.options.slidesToScroll;d.slideHandler(d.checkNavigable(i),!1,c),e.children().trigger("focus");break;default:return}},b.prototype.checkNavigable=function(a){var c,d,b=this;if(c=b.getNavigableIndexes(),d=0,a>c[c.length-1])a=c[c.length-1];else for(var e in c){if(a<c[e]){a=d;break}d=c[e]}return a},b.prototype.cleanUpEvents=function(){var b=this;b.options.dots&&null!==b.$dots&&a("li",b.$dots).off("click.slick",b.changeSlide).off("mouseenter.slick",a.proxy(b.interrupt,b,!0)).off("mouseleave.slick",a.proxy(b.interrupt,b,!1)),b.$slider.off("focus.slick blur.slick"),b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow&&b.$prevArrow.off("click.slick",b.changeSlide),b.$nextArrow&&b.$nextArrow.off("click.slick",b.changeSlide)),b.$list.off("touchstart.slick mousedown.slick",b.swipeHandler),b.$list.off("touchmove.slick mousemove.slick",b.swipeHandler),b.$list.off("touchend.slick mouseup.slick",b.swipeHandler),b.$list.off("touchcancel.slick mouseleave.slick",b.swipeHandler),b.$list.off("click.slick",b.clickHandler),a(document).off(b.visibilityChange,b.visibility),b.cleanUpSlideEvents(),b.options.accessibility===!0&&b.$list.off("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().off("click.slick",b.selectHandler),a(window).off("orientationchange.slick.slick-"+b.instanceUid,b.orientationChange),a(window).off("resize.slick.slick-"+b.instanceUid,b.resize),a("[draggable!=true]",b.$slideTrack).off("dragstart",b.preventDefault),a(window).off("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).off("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.cleanUpSlideEvents=function(){var b=this;b.$list.off("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.off("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.cleanUpRows=function(){var b,a=this;a.options.rows>1&&(b=a.$slides.children().children(),b.removeAttr("style"),a.$slider.empty().append(b))},b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())},b.prototype.destroy=function(b){var c=this;c.autoPlayClear(),c.touchObject={},c.cleanUpEvents(),a(".slick-cloned",c.$slider).detach(),c.$dots&&c.$dots.remove(),c.$prevArrow&&c.$prevArrow.length&&(c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.prevArrow)&&c.$prevArrow.remove()),c.$nextArrow&&c.$nextArrow.length&&(c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.nextArrow)&&c.$nextArrow.remove()),c.$slides&&(c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){a(this).attr("style",a(this).data("originalStyling"))}),c.$slideTrack.children(this.options.slide).detach(),c.$slideTrack.detach(),c.$list.detach(),c.$slider.append(c.$slides)),c.cleanUpRows(),c.$slider.removeClass("slick-slider"),c.$slider.removeClass("slick-initialized"),c.$slider.removeClass("slick-dotted"),c.unslicked=!0,b||c.$slider.trigger("destroy",[c])},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b){var c=this;c.cssTransitions===!1?(c.$slides.eq(a).css({zIndex:c.options.zIndex}),c.$slides.eq(a).animate({opacity:1},c.options.speed,c.options.easing,b)):(c.applyTransition(a),c.$slides.eq(a).css({opacity:1,zIndex:c.options.zIndex}),b&&setTimeout(function(){c.disableTransition(a),b.call()},c.options.speed))},b.prototype.fadeSlideOut=function(a){var b=this;b.cssTransitions===!1?b.$slides.eq(a).animate({opacity:0,zIndex:b.options.zIndex-2},b.options.speed,b.options.easing):(b.applyTransition(a),b.$slides.eq(a).css({opacity:0,zIndex:b.options.zIndex-2}))},b.prototype.filterSlides=b.prototype.slickFilter=function(a){var b=this;null!==a&&(b.$slidesCache=b.$slides,b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.focusHandler=function(){var b=this;b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*:not(.slick-arrow)",function(c){c.stopImmediatePropagation();var d=a(this);setTimeout(function(){b.options.pauseOnFocus&&(b.focussed=d.is(":focus"),b.autoPlay())},0)})},b.prototype.getCurrent=b.prototype.slickCurrentSlide=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var a=this,b=0,c=0,d=0;if(a.options.infinite===!0)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else if(a.options.centerMode===!0)d=a.slideCount;else if(a.options.asNavFor)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else d=1+Math.ceil((a.slideCount-a.options.slidesToShow)/a.options.slidesToScroll);return d-1},b.prototype.getLeft=function(a){var c,d,f,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(!0),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=b.slideWidth*b.options.slidesToShow*-1,e=d*b.options.slidesToShow*-1),b.slideCount%b.options.slidesToScroll!==0&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(a>b.slideCount?(b.slideOffset=(b.options.slidesToShow-(a-b.slideCount))*b.slideWidth*-1,e=(b.options.slidesToShow-(a-b.slideCount))*d*-1):(b.slideOffset=b.slideCount%b.options.slidesToScroll*b.slideWidth*-1,e=b.slideCount%b.options.slidesToScroll*d*-1))):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?a*b.slideWidth*-1+b.slideOffset:a*d*-1+e,b.options.variableWidth===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,b.options.centerMode===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,c+=(b.$list.width()-f.outerWidth())/2)),c},b.prototype.getOption=b.prototype.slickGetOption=function(a){var b=this;return b.options[a]},b.prototype.getNavigableIndexes=function(){var e,a=this,b=0,c=0,d=[];for(a.options.infinite===!1?e=a.slideCount:(b=-1*a.options.slidesToScroll,c=-1*a.options.slidesToScroll,e=2*a.slideCount);e>b;)d.push(b),b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d},b.prototype.getSlick=function(){return this},b.prototype.getSlideCount=function(){var c,d,e,b=this;return e=b.options.centerMode===!0?b.slideWidth*Math.floor(b.options.slidesToShow/2):0,b.options.swipeToSlide===!0?(b.$slideTrack.find(".slick-slide").each(function(c,f){return f.offsetLeft-e+a(f).outerWidth()/2>-1*b.swipeLeft?(d=f,!1):void 0}),c=Math.abs(a(d).attr("data-slick-index")-b.currentSlide)||1):b.options.slidesToScroll},b.prototype.goTo=b.prototype.slickGoTo=function(a,b){var c=this;c.changeSlide({data:{message:"index",index:parseInt(a)}},b)},b.prototype.init=function(b){var c=this;a(c.$slider).hasClass("slick-initialized")||(a(c.$slider).addClass("slick-initialized"),c.buildRows(),c.buildOut(),c.setProps(),c.startLoad(),c.loadSlider(),c.initializeEvents(),c.updateArrows(),c.updateDots(),c.checkResponsive(!0),c.focusHandler()),b&&c.$slider.trigger("init",[c]),c.options.accessibility===!0&&c.initADA(),c.options.autoplay&&(c.paused=!1,c.autoPlay())},b.prototype.initADA=function(){var b=this;b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),b.$slideTrack.attr("role","listbox"),b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c){a(this).attr({role:"option","aria-describedby":"slick-slide"+b.instanceUid+c})}),null!==b.$dots&&b.$dots.attr("role","tablist").find("li").each(function(c){a(this).attr({role:"presentation","aria-selected":"false","aria-controls":"navigation"+b.instanceUid+c,id:"slick-slide"+b.instanceUid+c})}).first().attr("aria-selected","true").end().find("button").attr("role","button").end().closest("div").attr("role","toolbar"),b.activateADA()},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.off("click.slick").on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&a("li",b.$dots).on("mouseenter.slick",a.proxy(b.interrupt,b,!0)).on("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.initSlideEvents=function(){var b=this;b.options.pauseOnHover&&(b.$list.on("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.on("mouseleave.slick",a.proxy(b.interrupt,b,!1)))},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.initSlideEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.$list.on("click.slick",b.clickHandler),a(document).on(b.visibilityChange,a.proxy(b.visibility,b)),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,a.proxy(b.orientationChange,b)),a(window).on("resize.slick.slick-"+b.instanceUid,a.proxy(b.resize,b)),a("[draggable!=true]",b.$slideTrack).on("dragstart",b.preventDefault),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show()},b.prototype.keyHandler=function(a){var b=this;a.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===a.keyCode&&b.options.accessibility===!0?b.changeSlide({data:{message:b.options.rtl===!0?"next":"previous"}}):39===a.keyCode&&b.options.accessibility===!0&&b.changeSlide({data:{message:b.options.rtl===!0?"previous":"next"}}))},b.prototype.lazyLoad=function(){function g(c){a("img[data-lazy]",c).each(function(){var c=a(this),d=a(this).attr("data-lazy"),e=document.createElement("img");e.onload=function(){c.animate({opacity:0},100,function(){c.attr("src",d).animate({opacity:1},200,function(){c.removeAttr("data-lazy").removeClass("slick-loading")}),b.$slider.trigger("lazyLoaded",[b,c,d])})},e.onerror=function(){c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),b.$slider.trigger("lazyLoadError",[b,c,d])},e.src=d})}var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=Math.ceil(e+b.options.slidesToShow),b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.next=b.prototype.slickNext=function(){var a=this;a.changeSlide({data:{message:"next"}})},b.prototype.orientationChange=function(){var a=this;a.checkResponsive(),a.setPosition()},b.prototype.pause=b.prototype.slickPause=function(){var a=this;a.autoPlayClear(),a.paused=!0},b.prototype.play=b.prototype.slickPlay=function(){var a=this;a.autoPlay(),a.options.autoplay=!0,a.paused=!1,a.focussed=!1,a.interrupted=!1},b.prototype.postSlide=function(a){var b=this;b.unslicked||(b.$slider.trigger("afterChange",[b,a]),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay&&b.autoPlay(),b.options.accessibility===!0&&b.initADA())},b.prototype.prev=b.prototype.slickPrev=function(){var a=this;a.changeSlide({data:{message:"previous"}})},b.prototype.preventDefault=function(a){a.preventDefault()},b.prototype.progressiveLazyLoad=function(b){b=b||1;var e,f,g,c=this,d=a("img[data-lazy]",c.$slider);d.length?(e=d.first(),f=e.attr("data-lazy"),g=document.createElement("img"),g.onload=function(){e.attr("src",f).removeAttr("data-lazy").removeClass("slick-loading"),c.options.adaptiveHeight===!0&&c.setPosition(),c.$slider.trigger("lazyLoaded",[c,e,f]),c.progressiveLazyLoad()},g.onerror=function(){3>b?setTimeout(function(){c.progressiveLazyLoad(b+1)},500):(e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),c.$slider.trigger("lazyLoadError",[c,e,f]),c.progressiveLazyLoad())},g.src=f):c.$slider.trigger("allImagesLoaded",[c])},b.prototype.refresh=function(b){var d,e,c=this;e=c.slideCount-c.options.slidesToShow,!c.options.infinite&&c.currentSlide>e&&(c.currentSlide=e),c.slideCount<=c.options.slidesToShow&&(c.currentSlide=0),d=c.currentSlide,c.destroy(!0),a.extend(c,c.initials,{currentSlide:d}),c.init(),b||c.changeSlide({data:{message:"index",index:d}},!1)},b.prototype.registerBreakpoints=function(){var c,d,e,b=this,f=b.options.responsive||null;if("array"===a.type(f)&&f.length){b.respondTo=b.options.respondTo||"window";for(c in f)if(e=b.breakpoints.length-1,d=f[c].breakpoint,f.hasOwnProperty(c)){for(;e>=0;)b.breakpoints[e]&&b.breakpoints[e]===d&&b.breakpoints.splice(e,1),e--;b.breakpoints.push(d),b.breakpointSettings[d]=f[c].settings}b.breakpoints.sort(function(a,c){return b.options.mobileFirst?a-c:c-a})}},b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.registerBreakpoints(),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.cleanUpSlideEvents(),b.initSlideEvents(),b.checkResponsive(!1,!0),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.setPosition(),b.focusHandler(),b.paused=!b.options.autoplay,b.autoPlay(),b.$slider.trigger("reInit",[b])},b.prototype.resize=function(){var b=this;a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.unslicked||b.setPosition()},50))},b.prototype.removeSlide=b.prototype.slickRemove=function(a,b,c){var d=this;return"boolean"==typeof a?(b=a,a=b===!0?0:d.slideCount-1):a=b===!0?--a:a,d.slideCount<1||0>a||a>d.slideCount-1?!1:(d.unload(),c===!0?d.$slideTrack.children().remove():d.$slideTrack.children(this.options.slide).eq(a).remove(),d.$slides=d.$slideTrack.children(this.options.slide),d.$slideTrack.children(this.options.slide).detach(),d.$slideTrack.append(d.$slides),d.$slidesCache=d.$slides,void d.reinit())},b.prototype.setCSS=function(a){var d,e,b=this,c={};b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?Math.ceil(a)+"px":"0px",e="top"==b.positionProp?Math.ceil(a)+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var a=this;a.options.vertical===!1?a.options.centerMode===!0&&a.$list.css({padding:"0px "+a.options.centerPadding}):(a.$list.height(a.$slides.first().outerHeight(!0)*a.options.slidesToShow),a.options.centerMode===!0&&a.$list.css({padding:a.options.centerPadding+" 0px"})),a.listWidth=a.$list.width(),a.listHeight=a.$list.height(),a.options.vertical===!1&&a.options.variableWidth===!1?(a.slideWidth=Math.ceil(a.listWidth/a.options.slidesToShow),a.$slideTrack.width(Math.ceil(a.slideWidth*a.$slideTrack.children(".slick-slide").length))):a.options.variableWidth===!0?a.$slideTrack.width(5e3*a.slideCount):(a.slideWidth=Math.ceil(a.listWidth),a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0)*a.$slideTrack.children(".slick-slide").length)));var b=a.$slides.first().outerWidth(!0)-a.$slides.first().width();a.options.variableWidth===!1&&a.$slideTrack.children(".slick-slide").width(a.slideWidth-b)},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=b.slideWidth*d*-1,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:b.options.zIndex-2,opacity:0}):a(e).css({position:"relative",left:c,top:0,zIndex:b.options.zIndex-2,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:b.options.zIndex-1,opacity:1})},b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}},b.prototype.setOption=b.prototype.slickSetOption=function(){var c,d,e,f,h,b=this,g=!1;if("object"===a.type(arguments[0])?(e=arguments[0],g=arguments[1],h="multiple"):"string"===a.type(arguments[0])&&(e=arguments[0],f=arguments[1],g=arguments[2],"responsive"===arguments[0]&&"array"===a.type(arguments[1])?h="responsive":"undefined"!=typeof arguments[1]&&(h="single")),"single"===h)b.options[e]=f;else if("multiple"===h)a.each(e,function(a,c){b.options[a]=c});else if("responsive"===h)for(d in f)if("array"!==a.type(b.options.responsive))b.options.responsive=[f[d]];else{for(c=b.options.responsive.length-1;c>=0;)b.options.responsive[c].breakpoint===f[d].breakpoint&&b.options.responsive.splice(c,1),c--;b.options.responsive.push(f[d])}g&&(b.unload(),b.reinit())},b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade(),a.$slider.trigger("setPosition",[a])},b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),a.options.fade&&("number"==typeof a.options.zIndex?a.options.zIndex<3&&(a.options.zIndex=3):a.options.zIndex=a.defaults.zIndex),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=a.options.useTransform&&null!==a.animType&&a.animType!==!1},b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;d=b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),b.$slides.eq(a).addClass("slick-current"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active").attr("aria-hidden","false"):(e=b.options.slidesToShow+a,
d.slice(e-c+1,e+c+2).addClass("slick-active").attr("aria-hidden","false")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):d.length<=b.options.slidesToShow?d.addClass("slick-active").attr("aria-hidden","false"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active").attr("aria-hidden","false"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.interrupt=function(a){var b=this;a||b.autoPlay(),b.interrupted=a},b.prototype.selectHandler=function(b){var c=this,d=a(b.target).is(".slick-slide")?a(b.target):a(b.target).parents(".slick-slide"),e=parseInt(d.attr("data-slick-index"));return e||(e=0),c.slideCount<=c.options.slidesToShow?(c.setSlideClasses(e),void c.asNavFor(e)):void c.slideHandler(e)},b.prototype.slideHandler=function(a,b,c){var d,e,f,g,j,h=null,i=this;return b=b||!1,i.animating===!0&&i.options.waitForAnimate===!0||i.options.fade===!0&&i.currentSlide===a||i.slideCount<=i.options.slidesToShow?void 0:(b===!1&&i.asNavFor(a),d=a,h=i.getLeft(d),g=i.getLeft(i.currentSlide),i.currentLeft=null===i.swipeLeft?g:i.swipeLeft,i.options.infinite===!1&&i.options.centerMode===!1&&(0>a||a>i.getDotCount()*i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):i.options.infinite===!1&&i.options.centerMode===!0&&(0>a||a>i.slideCount-i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):(i.options.autoplay&&clearInterval(i.autoPlayTimer),e=0>d?i.slideCount%i.options.slidesToScroll!==0?i.slideCount-i.slideCount%i.options.slidesToScroll:i.slideCount+d:d>=i.slideCount?i.slideCount%i.options.slidesToScroll!==0?0:d-i.slideCount:d,i.animating=!0,i.$slider.trigger("beforeChange",[i,i.currentSlide,e]),f=i.currentSlide,i.currentSlide=e,i.setSlideClasses(i.currentSlide),i.options.asNavFor&&(j=i.getNavTarget(),j=j.slick("getSlick"),j.slideCount<=j.options.slidesToShow&&j.setSlideClasses(i.currentSlide)),i.updateDots(),i.updateArrows(),i.options.fade===!0?(c!==!0?(i.fadeSlideOut(f),i.fadeSlide(e,function(){i.postSlide(e)})):i.postSlide(e),void i.animateHeight()):void(c!==!0?i.animateSlide(h,function(){i.postSlide(e)}):i.postSlide(e))))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?e.options.rtl===!1?"left":"right":360>=d&&d>=315?e.options.rtl===!1?"left":"right":d>=135&&225>=d?e.options.rtl===!1?"right":"left":e.options.verticalSwiping===!0?d>=35&&135>=d?"down":"up":"vertical"},b.prototype.swipeEnd=function(a){var c,d,b=this;if(b.dragging=!1,b.interrupted=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.edgeHit===!0&&b.$slider.trigger("edge",[b,b.swipeDirection()]),b.touchObject.swipeLength>=b.touchObject.minSwipe){switch(d=b.swipeDirection()){case"left":case"down":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide+b.getSlideCount()):b.currentSlide+b.getSlideCount(),b.currentDirection=0;break;case"right":case"up":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide-b.getSlideCount()):b.currentSlide-b.getSlideCount(),b.currentDirection=1}"vertical"!=d&&(b.slideHandler(c),b.touchObject={},b.$slider.trigger("swipe",[b,d]))}else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,b.options.verticalSwiping===!0&&(b.touchObject.minSwipe=b.listHeight/b.options.touchThreshold),a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var d,e,f,g,h,b=this;return h=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||h&&1!==h.length?!1:(d=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==h?h[0].pageX:a.clientX,b.touchObject.curY=void 0!==h?h[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),b.options.verticalSwiping===!0&&(b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curY-b.touchObject.startY,2)))),e=b.swipeDirection(),"vertical"!==e?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),g=(b.options.rtl===!1?1:-1)*(b.touchObject.curX>b.touchObject.startX?1:-1),b.options.verticalSwiping===!0&&(g=b.touchObject.curY>b.touchObject.startY?1:-1),f=b.touchObject.swipeLength,b.touchObject.edgeHit=!1,b.options.infinite===!1&&(0===b.currentSlide&&"right"===e||b.currentSlide>=b.getDotCount()&&"left"===e)&&(f=b.touchObject.swipeLength*b.options.edgeFriction,b.touchObject.edgeHit=!0),b.options.vertical===!1?b.swipeLeft=d+f*g:b.swipeLeft=d+f*(b.$list.height()/b.listWidth)*g,b.options.verticalSwiping===!0&&(b.swipeLeft=d+f*g),b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):void b.setCSS(b.swipeLeft)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return b.interrupted=!0,1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,void(b.dragging=!0))},b.prototype.unfilterSlides=b.prototype.slickUnfilter=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.remove(),b.$nextArrow&&b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},b.prototype.unslick=function(a){var b=this;b.$slider.trigger("unslick",[b,a]),b.destroy()},b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&!a.options.infinite&&(a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-1&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active").attr("aria-hidden","true"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden","false"))},b.prototype.visibility=function(){var a=this;a.options.autoplay&&(document[a.hidden]?a.interrupted=!0:a.interrupted=!1)},a.fn.slick=function(){var f,g,a=this,c=arguments[0],d=Array.prototype.slice.call(arguments,1),e=a.length;for(f=0;e>f;f++)if("object"==typeof c||"undefined"==typeof c?a[f].slick=new b(a[f],c):g=a[f].slick[c].apply(a[f].slick,d),"undefined"!=typeof g)return g;return a}});
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

// jQuery elevateZoom 3.0.8
// github.com/elevateweb/elevatezoom
"function"!==typeof Object.create&&(Object.create=function(d){function h(){}h.prototype=d;return new h}); (function(d,h,l,m){var k={init:function(b,a){var c=this;c.elem=a;c.$elem=d(a);c.imageSrc=c.$elem.data("zoom-image")?c.$elem.data("zoom-image"):c.$elem.attr("src");c.options=d.extend({},d.fn.elevateZoom.options,b);c.options.tint&&(c.options.lensColour="none",c.options.lensOpacity="1");"inner"==c.options.zoomType&&(c.options.showLens=!1);c.$elem.parent().removeAttr("title").removeAttr("alt");c.zoomImage=c.imageSrc;c.refresh(1);d("#"+c.options.gallery+" a").click(function(a){c.options.galleryActiveClass&& (d("#"+c.options.gallery+" a").removeClass(c.options.galleryActiveClass),d(this).addClass(c.options.galleryActiveClass));a.preventDefault();d(this).data("zoom-image")?c.zoomImagePre=d(this).data("zoom-image"):c.zoomImagePre=d(this).data("image");c.swaptheimage(d(this).data("image"),c.zoomImagePre);return!1})},refresh:function(b){var a=this;setTimeout(function(){a.fetch(a.imageSrc)},b||a.options.refresh)},fetch:function(b){var a=this,c=new Image;c.onload=function(){a.largeWidth=c.width;a.largeHeight= c.height;a.startZoom();a.currentImage=a.imageSrc;a.options.onZoomedImageLoaded(a.$elem)};c.src=b},startZoom:function(){var b=this;b.nzWidth=b.$elem.width();b.nzHeight=b.$elem.height();b.isWindowActive=!1;b.isLensActive=!1;b.isTintActive=!1;b.overWindow=!1;b.options.imageCrossfade&&(b.zoomWrap=b.$elem.wrap('<div style="height:'+b.nzHeight+"px;width:"+b.nzWidth+'px;" class="zoomWrapper" />'),b.$elem.css("position","absolute"));b.zoomLock=1;b.scrollingLock=!1;b.changeBgSize=!1;b.currentZoomLevel=b.options.zoomLevel; b.nzOffset=b.$elem.offset();b.widthRatio=b.largeWidth/b.currentZoomLevel/b.nzWidth;b.heightRatio=b.largeHeight/b.currentZoomLevel/b.nzHeight;"window"==b.options.zoomType&&(b.zoomWindowStyle="overflow: hidden;background-position: 0px 0px;text-align:center;background-color: "+String(b.options.zoomWindowBgColour)+";width: "+String(b.options.zoomWindowWidth)+"px;height: "+String(b.options.zoomWindowHeight)+"px;float: left;background-size: "+b.largeWidth/b.currentZoomLevel+"px "+b.largeHeight/b.currentZoomLevel+ "px;display: none;z-index:100;border: "+String(b.options.borderSize)+"px solid "+b.options.borderColour+";background-repeat: no-repeat;position: absolute;");if("inner"==b.options.zoomType){var a=b.$elem.css("border-left-width");b.zoomWindowStyle="overflow: hidden;margin-left: "+String(a)+";margin-top: "+String(a)+";background-position: 0px 0px;width: "+String(b.nzWidth)+"px;height: "+String(b.nzHeight)+"px;float: left;display: none;cursor:"+b.options.cursor+";px solid "+b.options.borderColour+";background-repeat: no-repeat;position: absolute;"}"window"== b.options.zoomType&&(lensHeight=b.nzHeight<b.options.zoomWindowWidth/b.widthRatio?b.nzHeight:String(b.options.zoomWindowHeight/b.heightRatio),lensWidth=b.largeWidth<b.options.zoomWindowWidth?b.nzWidth:b.options.zoomWindowWidth/b.widthRatio,b.lensStyle="background-position: 0px 0px;width: "+String(b.options.zoomWindowWidth/b.widthRatio)+"px;height: "+String(b.options.zoomWindowHeight/b.heightRatio)+"px;float: right;display: none;overflow: hidden;z-index: 999;-webkit-transform: translateZ(0);opacity:"+ b.options.lensOpacity+";filter: alpha(opacity = "+100*b.options.lensOpacity+"); zoom:1;width:"+lensWidth+"px;height:"+lensHeight+"px;background-color:"+b.options.lensColour+";cursor:"+b.options.cursor+";border: "+b.options.lensBorderSize+"px solid "+b.options.lensBorderColour+";background-repeat: no-repeat;position: absolute;");b.tintStyle="display: block;position: absolute;background-color: "+b.options.tintColour+";filter:alpha(opacity=0);opacity: 0;width: "+b.nzWidth+"px;height: "+b.nzHeight+"px;"; b.lensRound="";"lens"==b.options.zoomType&&(b.lensStyle="background-position: 0px 0px;float: left;display: none;border: "+String(b.options.borderSize)+"px solid "+b.options.borderColour+";width:"+String(b.options.lensSize)+"px;height:"+String(b.options.lensSize)+"px;background-repeat: no-repeat;position: absolute;");"round"==b.options.lensShape&&(b.lensRound="border-top-left-radius: "+String(b.options.lensSize/2+b.options.borderSize)+"px;border-top-right-radius: "+String(b.options.lensSize/2+b.options.borderSize)+ "px;border-bottom-left-radius: "+String(b.options.lensSize/2+b.options.borderSize)+"px;border-bottom-right-radius: "+String(b.options.lensSize/2+b.options.borderSize)+"px;");b.zoomContainer=d('<div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:'+b.nzOffset.left+"px;top:"+b.nzOffset.top+"px;height:"+b.nzHeight+"px;width:"+b.nzWidth+'px;"></div>');d("body").append(b.zoomContainer);b.options.containLensZoom&&"lens"==b.options.zoomType&&b.zoomContainer.css("overflow", "hidden");"inner"!=b.options.zoomType&&(b.zoomLens=d("<div class='zoomLens' style='"+b.lensStyle+b.lensRound+"'>&nbsp;</div>").appendTo(b.zoomContainer).click(function(){b.$elem.trigger("click")}),b.options.tint&&(b.tintContainer=d("<div/>").addClass("tintContainer"),b.zoomTint=d("<div class='zoomTint' style='"+b.tintStyle+"'></div>"),b.zoomLens.wrap(b.tintContainer),b.zoomTintcss=b.zoomLens.after(b.zoomTint),b.zoomTintImage=d('<img style="position: absolute; left: 0px; top: 0px; max-width: none; width: '+ b.nzWidth+"px; height: "+b.nzHeight+'px;" src="'+b.imageSrc+'">').appendTo(b.zoomLens).click(function(){b.$elem.trigger("click")})));isNaN(b.options.zoomWindowPosition)?b.zoomWindow=d("<div style='z-index:999;left:"+b.windowOffsetLeft+"px;top:"+b.windowOffsetTop+"px;"+b.zoomWindowStyle+"' class='zoomWindow'>&nbsp;</div>").appendTo("body").click(function(){b.$elem.trigger("click")}):b.zoomWindow=d("<div style='z-index:999;left:"+b.windowOffsetLeft+"px;top:"+b.windowOffsetTop+"px;"+b.zoomWindowStyle+ "' class='zoomWindow'>&nbsp;</div>").appendTo(b.zoomContainer).click(function(){b.$elem.trigger("click")});b.zoomWindowContainer=d("<div/>").addClass("zoomWindowContainer").css("width",b.options.zoomWindowWidth);b.zoomWindow.wrap(b.zoomWindowContainer);"lens"==b.options.zoomType&&b.zoomLens.css({backgroundImage:"url('"+b.imageSrc+"')"});"window"==b.options.zoomType&&b.zoomWindow.css({backgroundImage:"url('"+b.imageSrc+"')"});"inner"==b.options.zoomType&&b.zoomWindow.css({backgroundImage:"url('"+b.imageSrc+ "')"});b.$elem.bind("touchmove",function(a){a.preventDefault();b.setPosition(a.originalEvent.touches[0]||a.originalEvent.changedTouches[0])});b.zoomContainer.bind("touchmove",function(a){"inner"==b.options.zoomType&&b.showHideWindow("show");a.preventDefault();b.setPosition(a.originalEvent.touches[0]||a.originalEvent.changedTouches[0])});b.zoomContainer.bind("touchend",function(a){b.showHideWindow("hide");b.options.showLens&&b.showHideLens("hide");b.options.tint&&"inner"!=b.options.zoomType&&b.showHideTint("hide")}); b.$elem.bind("touchend",function(a){b.showHideWindow("hide");b.options.showLens&&b.showHideLens("hide");b.options.tint&&"inner"!=b.options.zoomType&&b.showHideTint("hide")});b.options.showLens&&(b.zoomLens.bind("touchmove",function(a){a.preventDefault();b.setPosition(a.originalEvent.touches[0]||a.originalEvent.changedTouches[0])}),b.zoomLens.bind("touchend",function(a){b.showHideWindow("hide");b.options.showLens&&b.showHideLens("hide");b.options.tint&&"inner"!=b.options.zoomType&&b.showHideTint("hide")})); b.$elem.bind("mousemove",function(a){!1==b.overWindow&&b.setElements("show");if(b.lastX!==a.clientX||b.lastY!==a.clientY)b.setPosition(a),b.currentLoc=a;b.lastX=a.clientX;b.lastY=a.clientY});b.zoomContainer.bind("mousemove",function(a){!1==b.overWindow&&b.setElements("show");if(b.lastX!==a.clientX||b.lastY!==a.clientY)b.setPosition(a),b.currentLoc=a;b.lastX=a.clientX;b.lastY=a.clientY});"inner"!=b.options.zoomType&&b.zoomLens.bind("mousemove",function(a){if(b.lastX!==a.clientX||b.lastY!==a.clientY)b.setPosition(a), b.currentLoc=a;b.lastX=a.clientX;b.lastY=a.clientY});b.options.tint&&"inner"!=b.options.zoomType&&b.zoomTint.bind("mousemove",function(a){if(b.lastX!==a.clientX||b.lastY!==a.clientY)b.setPosition(a),b.currentLoc=a;b.lastX=a.clientX;b.lastY=a.clientY});"inner"==b.options.zoomType&&b.zoomWindow.bind("mousemove",function(a){if(b.lastX!==a.clientX||b.lastY!==a.clientY)b.setPosition(a),b.currentLoc=a;b.lastX=a.clientX;b.lastY=a.clientY});b.zoomContainer.add(b.$elem).mouseenter(function(){!1==b.overWindow&& b.setElements("show")}).mouseleave(function(){b.scrollLock||b.setElements("hide")});"inner"!=b.options.zoomType&&b.zoomWindow.mouseenter(function(){b.overWindow=!0;b.setElements("hide")}).mouseleave(function(){b.overWindow=!1});b.minZoomLevel=b.options.minZoomLevel?b.options.minZoomLevel:2*b.options.scrollZoomIncrement;b.options.scrollZoom&&b.zoomContainer.add(b.$elem).bind("mousewheel DOMMouseScroll MozMousePixelScroll",function(a){b.scrollLock=!0;clearTimeout(d.data(this,"timer"));d.data(this,"timer", setTimeout(function(){b.scrollLock=!1},250));var e=a.originalEvent.wheelDelta||-1*a.originalEvent.detail;a.stopImmediatePropagation();a.stopPropagation();a.preventDefault();0<e/120?b.currentZoomLevel>=b.minZoomLevel&&b.changeZoomLevel(b.currentZoomLevel-b.options.scrollZoomIncrement):b.options.maxZoomLevel?b.currentZoomLevel<=b.options.maxZoomLevel&&b.changeZoomLevel(parseFloat(b.currentZoomLevel)+b.options.scrollZoomIncrement):b.changeZoomLevel(parseFloat(b.currentZoomLevel)+b.options.scrollZoomIncrement); return!1})},setElements:function(b){if(!this.options.zoomEnabled)return!1;"show"==b&&this.isWindowSet&&("inner"==this.options.zoomType&&this.showHideWindow("show"),"window"==this.options.zoomType&&this.showHideWindow("show"),this.options.showLens&&this.showHideLens("show"),this.options.tint&&"inner"!=this.options.zoomType&&this.showHideTint("show"));"hide"==b&&("window"==this.options.zoomType&&this.showHideWindow("hide"),this.options.tint||this.showHideWindow("hide"),this.options.showLens&&this.showHideLens("hide"), this.options.tint&&this.showHideTint("hide"))},setPosition:function(b){if(!this.options.zoomEnabled)return!1;this.nzHeight=this.$elem.height();this.nzWidth=this.$elem.width();this.nzOffset=this.$elem.offset();this.options.tint&&"inner"!=this.options.zoomType&&(this.zoomTint.css({top:0}),this.zoomTint.css({left:0}));this.options.responsive&&!this.options.scrollZoom&&this.options.showLens&&(lensHeight=this.nzHeight<this.options.zoomWindowWidth/this.widthRatio?this.nzHeight:String(this.options.zoomWindowHeight/ this.heightRatio),lensWidth=this.largeWidth<this.options.zoomWindowWidth?this.nzWidth:this.options.zoomWindowWidth/this.widthRatio,this.widthRatio=this.largeWidth/this.nzWidth,this.heightRatio=this.largeHeight/this.nzHeight,"lens"!=this.options.zoomType&&(lensHeight=this.nzHeight<this.options.zoomWindowWidth/this.widthRatio?this.nzHeight:String(this.options.zoomWindowHeight/this.heightRatio),lensWidth=this.options.zoomWindowWidth<this.options.zoomWindowWidth?this.nzWidth:this.options.zoomWindowWidth/ this.widthRatio,this.zoomLens.css("width",lensWidth),this.zoomLens.css("height",lensHeight),this.options.tint&&(this.zoomTintImage.css("width",this.nzWidth),this.zoomTintImage.css("height",this.nzHeight))),"lens"==this.options.zoomType&&this.zoomLens.css({width:String(this.options.lensSize)+"px",height:String(this.options.lensSize)+"px"}));this.zoomContainer.css({top:this.nzOffset.top});this.zoomContainer.css({left:this.nzOffset.left});this.mouseLeft=parseInt(b.pageX-this.nzOffset.left);this.mouseTop= parseInt(b.pageY-this.nzOffset.top);"window"==this.options.zoomType&&(this.Etoppos=this.mouseTop<this.zoomLens.height()/2,this.Eboppos=this.mouseTop>this.nzHeight-this.zoomLens.height()/2-2*this.options.lensBorderSize,this.Eloppos=this.mouseLeft<0+this.zoomLens.width()/2,this.Eroppos=this.mouseLeft>this.nzWidth-this.zoomLens.width()/2-2*this.options.lensBorderSize);"inner"==this.options.zoomType&&(this.Etoppos=this.mouseTop<this.nzHeight/2/this.heightRatio,this.Eboppos=this.mouseTop>this.nzHeight- this.nzHeight/2/this.heightRatio,this.Eloppos=this.mouseLeft<0+this.nzWidth/2/this.widthRatio,this.Eroppos=this.mouseLeft>this.nzWidth-this.nzWidth/2/this.widthRatio-2*this.options.lensBorderSize);0>=this.mouseLeft||0>this.mouseTop||this.mouseLeft>this.nzWidth||this.mouseTop>this.nzHeight?this.setElements("hide"):(this.options.showLens&&(this.lensLeftPos=String(this.mouseLeft-this.zoomLens.width()/2),this.lensTopPos=String(this.mouseTop-this.zoomLens.height()/2)),this.Etoppos&&(this.lensTopPos=0), this.Eloppos&&(this.tintpos=this.lensLeftPos=this.windowLeftPos=0),"window"==this.options.zoomType&&(this.Eboppos&&(this.lensTopPos=Math.max(this.nzHeight-this.zoomLens.height()-2*this.options.lensBorderSize,0)),this.Eroppos&&(this.lensLeftPos=this.nzWidth-this.zoomLens.width()-2*this.options.lensBorderSize)),"inner"==this.options.zoomType&&(this.Eboppos&&(this.lensTopPos=Math.max(this.nzHeight-2*this.options.lensBorderSize,0)),this.Eroppos&&(this.lensLeftPos=this.nzWidth-this.nzWidth-2*this.options.lensBorderSize)), "lens"==this.options.zoomType&&(this.windowLeftPos=String(-1*((b.pageX-this.nzOffset.left)*this.widthRatio-this.zoomLens.width()/2)),this.windowTopPos=String(-1*((b.pageY-this.nzOffset.top)*this.heightRatio-this.zoomLens.height()/2)),this.zoomLens.css({backgroundPosition:this.windowLeftPos+"px "+this.windowTopPos+"px"}),this.changeBgSize&&(this.nzHeight>this.nzWidth?("lens"==this.options.zoomType&&this.zoomLens.css({"background-size":this.largeWidth/this.newvalueheight+"px "+this.largeHeight/this.newvalueheight+ "px"}),this.zoomWindow.css({"background-size":this.largeWidth/this.newvalueheight+"px "+this.largeHeight/this.newvalueheight+"px"})):("lens"==this.options.zoomType&&this.zoomLens.css({"background-size":this.largeWidth/this.newvaluewidth+"px "+this.largeHeight/this.newvaluewidth+"px"}),this.zoomWindow.css({"background-size":this.largeWidth/this.newvaluewidth+"px "+this.largeHeight/this.newvaluewidth+"px"})),this.changeBgSize=!1),this.setWindowPostition(b)),this.options.tint&&"inner"!=this.options.zoomType&& this.setTintPosition(b),"window"==this.options.zoomType&&this.setWindowPostition(b),"inner"==this.options.zoomType&&this.setWindowPostition(b),this.options.showLens&&(this.fullwidth&&"lens"!=this.options.zoomType&&(this.lensLeftPos=0),this.zoomLens.css({left:this.lensLeftPos+"px",top:this.lensTopPos+"px"})))},showHideWindow:function(b){"show"!=b||this.isWindowActive||(this.options.zoomWindowFadeIn?this.zoomWindow.stop(!0,!0,!1).fadeIn(this.options.zoomWindowFadeIn):this.zoomWindow.show(),this.isWindowActive= !0);"hide"==b&&this.isWindowActive&&(this.options.zoomWindowFadeOut?this.zoomWindow.stop(!0,!0).fadeOut(this.options.zoomWindowFadeOut):this.zoomWindow.hide(),this.isWindowActive=!1)},showHideLens:function(b){"show"!=b||this.isLensActive||(this.options.lensFadeIn?this.zoomLens.stop(!0,!0,!1).fadeIn(this.options.lensFadeIn):this.zoomLens.show(),this.isLensActive=!0);"hide"==b&&this.isLensActive&&(this.options.lensFadeOut?this.zoomLens.stop(!0,!0).fadeOut(this.options.lensFadeOut):this.zoomLens.hide(), this.isLensActive=!1)},showHideTint:function(b){"show"!=b||this.isTintActive||(this.options.zoomTintFadeIn?this.zoomTint.css({opacity:this.options.tintOpacity}).animate().stop(!0,!0).fadeIn("slow"):(this.zoomTint.css({opacity:this.options.tintOpacity}).animate(),this.zoomTint.show()),this.isTintActive=!0);"hide"==b&&this.isTintActive&&(this.options.zoomTintFadeOut?this.zoomTint.stop(!0,!0).fadeOut(this.options.zoomTintFadeOut):this.zoomTint.hide(),this.isTintActive=!1)},setLensPostition:function(b){}, setWindowPostition:function(b){var a=this;if(isNaN(a.options.zoomWindowPosition))a.externalContainer=d("#"+a.options.zoomWindowPosition),a.externalContainerWidth=a.externalContainer.width(),a.externalContainerHeight=a.externalContainer.height(),a.externalContainerOffset=a.externalContainer.offset(),a.windowOffsetTop=a.externalContainerOffset.top,a.windowOffsetLeft=a.externalContainerOffset.left;else switch(a.options.zoomWindowPosition){case 1:a.windowOffsetTop=a.options.zoomWindowOffety;a.windowOffsetLeft= +a.nzWidth;break;case 2:a.options.zoomWindowHeight>a.nzHeight&&(a.windowOffsetTop=-1*(a.options.zoomWindowHeight/2-a.nzHeight/2),a.windowOffsetLeft=a.nzWidth);break;case 3:a.windowOffsetTop=a.nzHeight-a.zoomWindow.height()-2*a.options.borderSize;a.windowOffsetLeft=a.nzWidth;break;case 4:a.windowOffsetTop=a.nzHeight;a.windowOffsetLeft=a.nzWidth;break;case 5:a.windowOffsetTop=a.nzHeight;a.windowOffsetLeft=a.nzWidth-a.zoomWindow.width()-2*a.options.borderSize;break;case 6:a.options.zoomWindowHeight> a.nzHeight&&(a.windowOffsetTop=a.nzHeight,a.windowOffsetLeft=-1*(a.options.zoomWindowWidth/2-a.nzWidth/2+2*a.options.borderSize));break;case 7:a.windowOffsetTop=a.nzHeight;a.windowOffsetLeft=0;break;case 8:a.windowOffsetTop=a.nzHeight;a.windowOffsetLeft=-1*(a.zoomWindow.width()+2*a.options.borderSize);break;case 9:a.windowOffsetTop=a.nzHeight-a.zoomWindow.height()-2*a.options.borderSize;a.windowOffsetLeft=-1*(a.zoomWindow.width()+2*a.options.borderSize);break;case 10:a.options.zoomWindowHeight>a.nzHeight&& (a.windowOffsetTop=-1*(a.options.zoomWindowHeight/2-a.nzHeight/2),a.windowOffsetLeft=-1*(a.zoomWindow.width()+2*a.options.borderSize));break;case 11:a.windowOffsetTop=a.options.zoomWindowOffety;a.windowOffsetLeft=-1*(a.zoomWindow.width()+2*a.options.borderSize);break;case 12:a.windowOffsetTop=-1*(a.zoomWindow.height()+2*a.options.borderSize);a.windowOffsetLeft=-1*(a.zoomWindow.width()+2*a.options.borderSize);break;case 13:a.windowOffsetTop=-1*(a.zoomWindow.height()+2*a.options.borderSize);a.windowOffsetLeft= 0;break;case 14:a.options.zoomWindowHeight>a.nzHeight&&(a.windowOffsetTop=-1*(a.zoomWindow.height()+2*a.options.borderSize),a.windowOffsetLeft=-1*(a.options.zoomWindowWidth/2-a.nzWidth/2+2*a.options.borderSize));break;case 15:a.windowOffsetTop=-1*(a.zoomWindow.height()+2*a.options.borderSize);a.windowOffsetLeft=a.nzWidth-a.zoomWindow.width()-2*a.options.borderSize;break;case 16:a.windowOffsetTop=-1*(a.zoomWindow.height()+2*a.options.borderSize);a.windowOffsetLeft=a.nzWidth;break;default:a.windowOffsetTop= a.options.zoomWindowOffety,a.windowOffsetLeft=a.nzWidth}a.isWindowSet=!0;a.windowOffsetTop+=a.options.zoomWindowOffety;a.windowOffsetLeft+=a.options.zoomWindowOffetx;a.zoomWindow.css({top:a.windowOffsetTop});a.zoomWindow.css({left:a.windowOffsetLeft});"inner"==a.options.zoomType&&(a.zoomWindow.css({top:0}),a.zoomWindow.css({left:0}));a.windowLeftPos=String(-1*((b.pageX-a.nzOffset.left)*a.widthRatio-a.zoomWindow.width()/2));a.windowTopPos=String(-1*((b.pageY-a.nzOffset.top)*a.heightRatio-a.zoomWindow.height()/ 2));a.Etoppos&&(a.windowTopPos=0);a.Eloppos&&(a.windowLeftPos=0);a.Eboppos&&(a.windowTopPos=-1*(a.largeHeight/a.currentZoomLevel-a.zoomWindow.height()));a.Eroppos&&(a.windowLeftPos=-1*(a.largeWidth/a.currentZoomLevel-a.zoomWindow.width()));a.fullheight&&(a.windowTopPos=0);a.fullwidth&&(a.windowLeftPos=0);if("window"==a.options.zoomType||"inner"==a.options.zoomType)1==a.zoomLock&&(1>=a.widthRatio&&(a.windowLeftPos=0),1>=a.heightRatio&&(a.windowTopPos=0)),a.largeHeight<a.options.zoomWindowHeight&&(a.windowTopPos= 0),a.largeWidth<a.options.zoomWindowWidth&&(a.windowLeftPos=0),a.options.easing?(a.xp||(a.xp=0),a.yp||(a.yp=0),a.loop||(a.loop=setInterval(function(){a.xp+=(a.windowLeftPos-a.xp)/a.options.easingAmount;a.yp+=(a.windowTopPos-a.yp)/a.options.easingAmount;a.scrollingLock?(clearInterval(a.loop),a.xp=a.windowLeftPos,a.yp=a.windowTopPos,a.xp=-1*((b.pageX-a.nzOffset.left)*a.widthRatio-a.zoomWindow.width()/2),a.yp=-1*((b.pageY-a.nzOffset.top)*a.heightRatio-a.zoomWindow.height()/2),a.changeBgSize&&(a.nzHeight> a.nzWidth?("lens"==a.options.zoomType&&a.zoomLens.css({"background-size":a.largeWidth/a.newvalueheight+"px "+a.largeHeight/a.newvalueheight+"px"}),a.zoomWindow.css({"background-size":a.largeWidth/a.newvalueheight+"px "+a.largeHeight/a.newvalueheight+"px"})):("lens"!=a.options.zoomType&&a.zoomLens.css({"background-size":a.largeWidth/a.newvaluewidth+"px "+a.largeHeight/a.newvalueheight+"px"}),a.zoomWindow.css({"background-size":a.largeWidth/a.newvaluewidth+"px "+a.largeHeight/a.newvaluewidth+"px"})), a.changeBgSize=!1),a.zoomWindow.css({backgroundPosition:a.windowLeftPos+"px "+a.windowTopPos+"px"}),a.scrollingLock=!1,a.loop=!1):(a.changeBgSize&&(a.nzHeight>a.nzWidth?("lens"==a.options.zoomType&&a.zoomLens.css({"background-size":a.largeWidth/a.newvalueheight+"px "+a.largeHeight/a.newvalueheight+"px"}),a.zoomWindow.css({"background-size":a.largeWidth/a.newvalueheight+"px "+a.largeHeight/a.newvalueheight+"px"})):("lens"!=a.options.zoomType&&a.zoomLens.css({"background-size":a.largeWidth/a.newvaluewidth+ "px "+a.largeHeight/a.newvaluewidth+"px"}),a.zoomWindow.css({"background-size":a.largeWidth/a.newvaluewidth+"px "+a.largeHeight/a.newvaluewidth+"px"})),a.changeBgSize=!1),a.zoomWindow.css({backgroundPosition:a.xp+"px "+a.yp+"px"}))},16))):(a.changeBgSize&&(a.nzHeight>a.nzWidth?("lens"==a.options.zoomType&&a.zoomLens.css({"background-size":a.largeWidth/a.newvalueheight+"px "+a.largeHeight/a.newvalueheight+"px"}),a.zoomWindow.css({"background-size":a.largeWidth/a.newvalueheight+"px "+a.largeHeight/ a.newvalueheight+"px"})):("lens"==a.options.zoomType&&a.zoomLens.css({"background-size":a.largeWidth/a.newvaluewidth+"px "+a.largeHeight/a.newvaluewidth+"px"}),a.largeHeight/a.newvaluewidth<a.options.zoomWindowHeight?a.zoomWindow.css({"background-size":a.largeWidth/a.newvaluewidth+"px "+a.largeHeight/a.newvaluewidth+"px"}):a.zoomWindow.css({"background-size":a.largeWidth/a.newvalueheight+"px "+a.largeHeight/a.newvalueheight+"px"})),a.changeBgSize=!1),a.zoomWindow.css({backgroundPosition:a.windowLeftPos+ "px "+a.windowTopPos+"px"}))},setTintPosition:function(b){this.nzOffset=this.$elem.offset();this.tintpos=String(-1*(b.pageX-this.nzOffset.left-this.zoomLens.width()/2));this.tintposy=String(-1*(b.pageY-this.nzOffset.top-this.zoomLens.height()/2));this.Etoppos&&(this.tintposy=0);this.Eloppos&&(this.tintpos=0);this.Eboppos&&(this.tintposy=-1*(this.nzHeight-this.zoomLens.height()-2*this.options.lensBorderSize));this.Eroppos&&(this.tintpos=-1*(this.nzWidth-this.zoomLens.width()-2*this.options.lensBorderSize)); this.options.tint&&(this.fullheight&&(this.tintposy=0),this.fullwidth&&(this.tintpos=0),this.zoomTintImage.css({left:this.tintpos+"px"}),this.zoomTintImage.css({top:this.tintposy+"px"}))},swaptheimage:function(b,a){var c=this,e=new Image;c.options.loadingIcon&&(c.spinner=d("<div style=\"background: url('"+c.options.loadingIcon+"') no-repeat center;height:"+c.nzHeight+"px;width:"+c.nzWidth+'px;z-index: 2000;position: absolute; background-position: center center;"></div>'),c.$elem.after(c.spinner)); c.options.onImageSwap(c.$elem);e.onload=function(){c.largeWidth=e.width;c.largeHeight=e.height;c.zoomImage=a;c.zoomWindow.css({"background-size":c.largeWidth+"px "+c.largeHeight+"px"});c.zoomWindow.css({"background-size":c.largeWidth+"px "+c.largeHeight+"px"});c.swapAction(b,a)};e.src=a},swapAction:function(b,a){var c=this,e=new Image;e.onload=function(){c.nzHeight=e.height;c.nzWidth=e.width;c.options.onImageSwapComplete(c.$elem);c.doneCallback()};e.src=b;c.currentZoomLevel=c.options.zoomLevel;c.options.maxZoomLevel= !1;"lens"==c.options.zoomType&&c.zoomLens.css({backgroundImage:"url('"+a+"')"});"window"==c.options.zoomType&&c.zoomWindow.css({backgroundImage:"url('"+a+"')"});"inner"==c.options.zoomType&&c.zoomWindow.css({backgroundImage:"url('"+a+"')"});c.currentImage=a;if(c.options.imageCrossfade){var f=c.$elem,g=f.clone();c.$elem.attr("src",b);c.$elem.after(g);g.stop(!0).fadeOut(c.options.imageCrossfade,function(){d(this).remove()});c.$elem.width("auto").removeAttr("width");c.$elem.height("auto").removeAttr("height"); f.fadeIn(c.options.imageCrossfade);c.options.tint&&"inner"!=c.options.zoomType&&(f=c.zoomTintImage,g=f.clone(),c.zoomTintImage.attr("src",a),c.zoomTintImage.after(g),g.stop(!0).fadeOut(c.options.imageCrossfade,function(){d(this).remove()}),f.fadeIn(c.options.imageCrossfade),c.zoomTint.css({height:c.$elem.height()}),c.zoomTint.css({width:c.$elem.width()}));c.zoomContainer.css("height",c.$elem.height());c.zoomContainer.css("width",c.$elem.width());"inner"!=c.options.zoomType||c.options.constrainType|| (c.zoomWrap.parent().css("height",c.$elem.height()),c.zoomWrap.parent().css("width",c.$elem.width()),c.zoomWindow.css("height",c.$elem.height()),c.zoomWindow.css("width",c.$elem.width()))}else c.$elem.attr("src",b),c.options.tint&&(c.zoomTintImage.attr("src",a),c.zoomTintImage.attr("height",c.$elem.height()),c.zoomTintImage.css({height:c.$elem.height()}),c.zoomTint.css({height:c.$elem.height()})),c.zoomContainer.css("height",c.$elem.height()),c.zoomContainer.css("width",c.$elem.width());c.options.imageCrossfade&& (c.zoomWrap.css("height",c.$elem.height()),c.zoomWrap.css("width",c.$elem.width()));c.options.constrainType&&("height"==c.options.constrainType&&(c.zoomContainer.css("height",c.options.constrainSize),c.zoomContainer.css("width","auto"),c.options.imageCrossfade?(c.zoomWrap.css("height",c.options.constrainSize),c.zoomWrap.css("width","auto"),c.constwidth=c.zoomWrap.width()):(c.$elem.css("height",c.options.constrainSize),c.$elem.css("width","auto"),c.constwidth=c.$elem.width()),"inner"==c.options.zoomType&& (c.zoomWrap.parent().css("height",c.options.constrainSize),c.zoomWrap.parent().css("width",c.constwidth),c.zoomWindow.css("height",c.options.constrainSize),c.zoomWindow.css("width",c.constwidth)),c.options.tint&&(c.tintContainer.css("height",c.options.constrainSize),c.tintContainer.css("width",c.constwidth),c.zoomTint.css("height",c.options.constrainSize),c.zoomTint.css("width",c.constwidth),c.zoomTintImage.css("height",c.options.constrainSize),c.zoomTintImage.css("width",c.constwidth))),"width"== c.options.constrainType&&(c.zoomContainer.css("height","auto"),c.zoomContainer.css("width",c.options.constrainSize),c.options.imageCrossfade?(c.zoomWrap.css("height","auto"),c.zoomWrap.css("width",c.options.constrainSize),c.constheight=c.zoomWrap.height()):(c.$elem.css("height","auto"),c.$elem.css("width",c.options.constrainSize),c.constheight=c.$elem.height()),"inner"==c.options.zoomType&&(c.zoomWrap.parent().css("height",c.constheight),c.zoomWrap.parent().css("width",c.options.constrainSize),c.zoomWindow.css("height", c.constheight),c.zoomWindow.css("width",c.options.constrainSize)),c.options.tint&&(c.tintContainer.css("height",c.constheight),c.tintContainer.css("width",c.options.constrainSize),c.zoomTint.css("height",c.constheight),c.zoomTint.css("width",c.options.constrainSize),c.zoomTintImage.css("height",c.constheight),c.zoomTintImage.css("width",c.options.constrainSize))))},doneCallback:function(){this.options.loadingIcon&&this.spinner.hide();this.nzOffset=this.$elem.offset();this.nzWidth=this.$elem.width(); this.nzHeight=this.$elem.height();this.currentZoomLevel=this.options.zoomLevel;this.widthRatio=this.largeWidth/this.nzWidth;this.heightRatio=this.largeHeight/this.nzHeight;"window"==this.options.zoomType&&(lensHeight=this.nzHeight<this.options.zoomWindowWidth/this.widthRatio?this.nzHeight:String(this.options.zoomWindowHeight/this.heightRatio),lensWidth=this.options.zoomWindowWidth<this.options.zoomWindowWidth?this.nzWidth:this.options.zoomWindowWidth/this.widthRatio,this.zoomLens&&(this.zoomLens.css("width", lensWidth),this.zoomLens.css("height",lensHeight)))},getCurrentImage:function(){return this.zoomImage},getGalleryList:function(){var b=this;b.gallerylist=[];b.options.gallery?d("#"+b.options.gallery+" a").each(function(){var a="";d(this).data("zoom-image")?a=d(this).data("zoom-image"):d(this).data("image")&&(a=d(this).data("image"));a==b.zoomImage?b.gallerylist.unshift({href:""+a+"",title:d(this).find("img").attr("title")}):b.gallerylist.push({href:""+a+"",title:d(this).find("img").attr("title")})}): b.gallerylist.push({href:""+b.zoomImage+"",title:d(this).find("img").attr("title")});return b.gallerylist},changeZoomLevel:function(b){this.scrollingLock=!0;this.newvalue=parseFloat(b).toFixed(2);newvalue=parseFloat(b).toFixed(2);maxheightnewvalue=this.largeHeight/(this.options.zoomWindowHeight/this.nzHeight*this.nzHeight);maxwidthtnewvalue=this.largeWidth/(this.options.zoomWindowWidth/this.nzWidth*this.nzWidth);"inner"!=this.options.zoomType&&(maxheightnewvalue<=newvalue?(this.heightRatio=this.largeHeight/ maxheightnewvalue/this.nzHeight,this.newvalueheight=maxheightnewvalue,this.fullheight=!0):(this.heightRatio=this.largeHeight/newvalue/this.nzHeight,this.newvalueheight=newvalue,this.fullheight=!1),maxwidthtnewvalue<=newvalue?(this.widthRatio=this.largeWidth/maxwidthtnewvalue/this.nzWidth,this.newvaluewidth=maxwidthtnewvalue,this.fullwidth=!0):(this.widthRatio=this.largeWidth/newvalue/this.nzWidth,this.newvaluewidth=newvalue,this.fullwidth=!1),"lens"==this.options.zoomType&&(maxheightnewvalue<=newvalue? (this.fullwidth=!0,this.newvaluewidth=maxheightnewvalue):(this.widthRatio=this.largeWidth/newvalue/this.nzWidth,this.newvaluewidth=newvalue,this.fullwidth=!1)));"inner"==this.options.zoomType&&(maxheightnewvalue=parseFloat(this.largeHeight/this.nzHeight).toFixed(2),maxwidthtnewvalue=parseFloat(this.largeWidth/this.nzWidth).toFixed(2),newvalue>maxheightnewvalue&&(newvalue=maxheightnewvalue),newvalue>maxwidthtnewvalue&&(newvalue=maxwidthtnewvalue),maxheightnewvalue<=newvalue?(this.heightRatio=this.largeHeight/ newvalue/this.nzHeight,this.newvalueheight=newvalue>maxheightnewvalue?maxheightnewvalue:newvalue,this.fullheight=!0):(this.heightRatio=this.largeHeight/newvalue/this.nzHeight,this.newvalueheight=newvalue>maxheightnewvalue?maxheightnewvalue:newvalue,this.fullheight=!1),maxwidthtnewvalue<=newvalue?(this.widthRatio=this.largeWidth/newvalue/this.nzWidth,this.newvaluewidth=newvalue>maxwidthtnewvalue?maxwidthtnewvalue:newvalue,this.fullwidth=!0):(this.widthRatio=this.largeWidth/newvalue/this.nzWidth,this.newvaluewidth= newvalue,this.fullwidth=!1));scrcontinue=!1;"inner"==this.options.zoomType&&(this.nzWidth>this.nzHeight&&(this.newvaluewidth<=maxwidthtnewvalue?scrcontinue=!0:(scrcontinue=!1,this.fullwidth=this.fullheight=!0)),this.nzHeight>this.nzWidth&&(this.newvaluewidth<=maxwidthtnewvalue?scrcontinue=!0:(scrcontinue=!1,this.fullwidth=this.fullheight=!0)));"inner"!=this.options.zoomType&&(scrcontinue=!0);scrcontinue&&(this.zoomLock=0,this.changeZoom=!0,this.options.zoomWindowHeight/this.heightRatio<=this.nzHeight&& (this.currentZoomLevel=this.newvalueheight,"lens"!=this.options.zoomType&&"inner"!=this.options.zoomType&&(this.changeBgSize=!0,this.zoomLens.css({height:String(this.options.zoomWindowHeight/this.heightRatio)+"px"})),"lens"==this.options.zoomType||"inner"==this.options.zoomType)&&(this.changeBgSize=!0),this.options.zoomWindowWidth/this.widthRatio<=this.nzWidth&&("inner"!=this.options.zoomType&&this.newvaluewidth>this.newvalueheight&&(this.currentZoomLevel=this.newvaluewidth),"lens"!=this.options.zoomType&& "inner"!=this.options.zoomType&&(this.changeBgSize=!0,this.zoomLens.css({width:String(this.options.zoomWindowWidth/this.widthRatio)+"px"})),"lens"==this.options.zoomType||"inner"==this.options.zoomType)&&(this.changeBgSize=!0),"inner"==this.options.zoomType&&(this.changeBgSize=!0,this.nzWidth>this.nzHeight&&(this.currentZoomLevel=this.newvaluewidth),this.nzHeight>this.nzWidth&&(this.currentZoomLevel=this.newvaluewidth)));this.setPosition(this.currentLoc)},closeAll:function(){self.zoomWindow&&self.zoomWindow.hide(); self.zoomLens&&self.zoomLens.hide();self.zoomTint&&self.zoomTint.hide()},changeState:function(b){"enable"==b&&(this.options.zoomEnabled=!0);"disable"==b&&(this.options.zoomEnabled=!1)}};d.fn.elevateZoom=function(b){return this.each(function(){var a=Object.create(k);a.init(b,this);d.data(this,"elevateZoom",a)})};d.fn.elevateZoom.options={zoomActivation:"hover",zoomEnabled:!0,preloading:1,zoomLevel:1,scrollZoom:!1,scrollZoomIncrement:0.1,minZoomLevel:!1,maxZoomLevel:!1,easing:!1,easingAmount:12,lensSize:200, zoomWindowWidth:400,zoomWindowHeight:400,zoomWindowOffetx:0,zoomWindowOffety:0,zoomWindowPosition:1,zoomWindowBgColour:"#fff",lensFadeIn:!1,lensFadeOut:!1,debug:!1,zoomWindowFadeIn:!1,zoomWindowFadeOut:!1,zoomWindowAlwaysShow:!1,zoomTintFadeIn:!1,zoomTintFadeOut:!1,borderSize:4,showLens:!0,borderColour:"#888",lensBorderSize:1,lensBorderColour:"#000",lensShape:"square",zoomType:"window",containLensZoom:!1,lensColour:"white",lensOpacity:0.4,lenszoom:!1,tint:!1,tintColour:"#333",tintOpacity:0.4,gallery:!1, galleryActiveClass:"zoomGalleryActive",imageCrossfade:!1,constrainType:!1,constrainSize:!1,loadingIcon:!1,cursor:"default",responsive:!0,onComplete:d.noop,onZoomedImageLoaded:function(){},onImageSwap:d.noop,onImageSwapComplete:d.noop}})(jQuery,window,document);

/* Quatro Digital Amazing Menu */
var _0xfc7b=['call','trigger','UL\x20do\x20menu\x20não\x20encontrada','alerta','li\x20>ul','qd-am-has-ul','children','replaceSpecialChars','>li','qd-amazing-menu','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','-li','callback','QuatroDigital.am.callback','extend','.qd_amazing_menu_auto','getParent','closest','function','QD_amazingMenu','/qd-amazing-menu','error','undefined','info','object','unshift','[QD\x20Amazing\x20Menu]\x0a','toLowerCase','apply','join','warn','qdAmAddNdx','each','addClass','first','qd-am-first','qd-am-last','replace','fromCharCode','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','.qd-am-banner','length','qd-am-banner-wrapper','parent','qd-am-collection-wrapper','qdAjax','html','attr','data-qdam-value','.box-banner','clone','insertBefore','hide','qd-am-content-loaded','trim','[class*=\x27colunas\x27]','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','url','\x27\x20falho.','ajaxCallback'];(function(_0x56e806,_0x4f68c2){var _0x516503=function(_0x5ac711){while(--_0x5ac711){_0x56e806['push'](_0x56e806['shift']());}};_0x516503(++_0x4f68c2);}(_0xfc7b,0x138));var _0xbfc7=function(_0x459de1,_0x187d8c){_0x459de1=_0x459de1-0x0;var _0x2a1006=_0xfc7b[_0x459de1];return _0x2a1006;};(function(_0x3c7fbf){_0x3c7fbf['fn'][_0xbfc7('0x0')]=_0x3c7fbf['fn'][_0xbfc7('0x1')];}(jQuery));(function(_0x1e39c5){var _0x5b456c;var _0x4216f1=jQuery;if(_0xbfc7('0x2')!==typeof _0x4216f1['fn'][_0xbfc7('0x3')]){var _0x3c6d4f={'url':_0xbfc7('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0x3c6be3=function(_0x2cc169,_0x550796){if('object'===typeof console&&'undefined'!==typeof console[_0xbfc7('0x5')]&&_0xbfc7('0x6')!==typeof console[_0xbfc7('0x7')]&&_0xbfc7('0x6')!==typeof console['warn']){var _0x587a63;_0xbfc7('0x8')===typeof _0x2cc169?(_0x2cc169[_0xbfc7('0x9')](_0xbfc7('0xa')),_0x587a63=_0x2cc169):_0x587a63=[_0xbfc7('0xa')+_0x2cc169];if(_0xbfc7('0x6')===typeof _0x550796||'alerta'!==_0x550796[_0xbfc7('0xb')]()&&'aviso'!==_0x550796['toLowerCase']())if(_0xbfc7('0x6')!==typeof _0x550796&&'info'===_0x550796[_0xbfc7('0xb')]())try{console[_0xbfc7('0x7')][_0xbfc7('0xc')](console,_0x587a63);}catch(_0xeaa28b){try{console[_0xbfc7('0x7')](_0x587a63[_0xbfc7('0xd')]('\x0a'));}catch(_0x48b3db){}}else try{console['error'][_0xbfc7('0xc')](console,_0x587a63);}catch(_0x2ba821){try{console[_0xbfc7('0x5')](_0x587a63[_0xbfc7('0xd')]('\x0a'));}catch(_0xb2ccff){}}else try{console[_0xbfc7('0xe')][_0xbfc7('0xc')](console,_0x587a63);}catch(_0x2b7ca5){try{console[_0xbfc7('0xe')](_0x587a63[_0xbfc7('0xd')]('\x0a'));}catch(_0x4032b5){}}}};_0x4216f1['fn'][_0xbfc7('0xf')]=function(){var _0x5359d6=_0x4216f1(this);_0x5359d6[_0xbfc7('0x10')](function(_0x5b0dbd){_0x4216f1(this)[_0xbfc7('0x11')]('qd-am-li-'+_0x5b0dbd);});_0x5359d6[_0xbfc7('0x12')]()['addClass'](_0xbfc7('0x13'));_0x5359d6['last']()[_0xbfc7('0x11')](_0xbfc7('0x14'));return _0x5359d6;};_0x4216f1['fn'][_0xbfc7('0x3')]=function(){};_0x1e39c5=function(_0x92889e){var _0x5aff47={'i':'vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x20ffd7){var _0x5296a8=function(_0x55dc3b){return _0x55dc3b;};var _0x4dc020=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x20ffd7=_0x20ffd7['d'+_0x4dc020[0x10]+'c'+_0x4dc020[0x11]+'m'+_0x5296a8(_0x4dc020[0x1])+'n'+_0x4dc020[0xd]]['l'+_0x4dc020[0x12]+'c'+_0x4dc020[0x0]+'ti'+_0x5296a8('o')+'n'];var _0x301e5e=function(_0xb211e9){return escape(encodeURIComponent(_0xb211e9['replace'](/\./g,'¨')[_0xbfc7('0x15')](/[a-zA-Z]/g,function(_0x50e08a){return String[_0xbfc7('0x16')](('Z'>=_0x50e08a?0x5a:0x7a)>=(_0x50e08a=_0x50e08a['charCodeAt'](0x0)+0xd)?_0x50e08a:_0x50e08a-0x1a);})));};var _0x2059a7=_0x301e5e(_0x20ffd7[[_0x4dc020[0x9],_0x5296a8('o'),_0x4dc020[0xc],_0x4dc020[_0x5296a8(0xd)]][_0xbfc7('0xd')]('')]);_0x301e5e=_0x301e5e((window[['js',_0x5296a8('no'),'m',_0x4dc020[0x1],_0x4dc020[0x4][_0xbfc7('0x17')](),_0xbfc7('0x18')][_0xbfc7('0xd')]('')]||_0xbfc7('0x19'))+['.v',_0x4dc020[0xd],'e',_0x5296a8('x'),'co',_0x5296a8('mm'),_0xbfc7('0x1a'),_0x4dc020[0x1],'.c',_0x5296a8('o'),'m.',_0x4dc020[0x13],'r'][_0xbfc7('0xd')](''));for(var _0x590ecc in _0x5aff47){if(_0x301e5e===_0x590ecc+_0x5aff47[_0x590ecc]||_0x2059a7===_0x590ecc+_0x5aff47[_0x590ecc]){var _0x74e549='tr'+_0x4dc020[0x11]+'e';break;}_0x74e549='f'+_0x4dc020[0x0]+'ls'+_0x5296a8(_0x4dc020[0x1])+'';}_0x5296a8=!0x1;-0x1<_0x20ffd7[[_0x4dc020[0xc],'e',_0x4dc020[0x0],'rc',_0x4dc020[0x9]][_0xbfc7('0xd')]('')][_0xbfc7('0x1b')](_0xbfc7('0x1c'))&&(_0x5296a8=!0x0);return[_0x74e549,_0x5296a8];}(_0x92889e);}(window);if(!eval(_0x1e39c5[0x0]))return _0x1e39c5[0x1]?_0x3c6be3(_0xbfc7('0x1d')):!0x1;var _0x2d9c17=function(_0x1b96ad){var _0x28f4d5=_0x1b96ad[_0xbfc7('0x1e')](_0xbfc7('0x1f'));var _0x275545=_0x28f4d5[_0xbfc7('0x20')](_0xbfc7('0x21'));var _0x34c3b3=_0x28f4d5[_0xbfc7('0x20')]('.qd-am-collection');if(_0x275545[_0xbfc7('0x22')]||_0x34c3b3[_0xbfc7('0x22')])_0x275545['parent']()[_0xbfc7('0x11')](_0xbfc7('0x23')),_0x34c3b3[_0xbfc7('0x24')]()[_0xbfc7('0x11')](_0xbfc7('0x25')),_0x4216f1[_0xbfc7('0x26')]({'url':_0x5b456c['url'],'dataType':_0xbfc7('0x27'),'success':function(_0x124b0a){var _0xc3b078=_0x4216f1(_0x124b0a);_0x275545[_0xbfc7('0x10')](function(){var _0x124b0a=_0x4216f1(this);var _0x596b6e=_0xc3b078[_0xbfc7('0x1e')]('img[alt=\x27'+_0x124b0a[_0xbfc7('0x28')](_0xbfc7('0x29'))+'\x27]');_0x596b6e[_0xbfc7('0x22')]&&(_0x596b6e[_0xbfc7('0x10')](function(){_0x4216f1(this)[_0xbfc7('0x0')](_0xbfc7('0x2a'))[_0xbfc7('0x2b')]()[_0xbfc7('0x2c')](_0x124b0a);}),_0x124b0a[_0xbfc7('0x2d')]());})['addClass'](_0xbfc7('0x2e'));_0x34c3b3[_0xbfc7('0x10')](function(){var _0x124b0a={};var _0x34b127=_0x4216f1(this);_0xc3b078[_0xbfc7('0x1e')]('h2')[_0xbfc7('0x10')](function(){if(_0x4216f1(this)['text']()[_0xbfc7('0x2f')]()[_0xbfc7('0xb')]()==_0x34b127[_0xbfc7('0x28')](_0xbfc7('0x29'))[_0xbfc7('0x2f')]()['toLowerCase']())return _0x124b0a=_0x4216f1(this),!0x1;});_0x124b0a['length']&&(_0x124b0a[_0xbfc7('0x10')](function(){_0x4216f1(this)[_0xbfc7('0x0')](_0xbfc7('0x30'))['clone']()['insertBefore'](_0x34b127);}),_0x34b127['hide']());})[_0xbfc7('0x11')](_0xbfc7('0x2e'));},'error':function(){_0x3c6be3(_0xbfc7('0x31')+_0x5b456c[_0xbfc7('0x32')]+_0xbfc7('0x33'));},'complete':function(){_0x5b456c[_0xbfc7('0x34')][_0xbfc7('0x35')](this);_0x4216f1(window)[_0xbfc7('0x36')]('QuatroDigital.am.ajaxCallback',_0x1b96ad);},'clearQueueDelay':0xbb8});};_0x4216f1[_0xbfc7('0x3')]=function(_0x349a8b){var _0x3dd500=_0x349a8b['find']('ul[itemscope]')[_0xbfc7('0x10')](function(){var _0x1637a9=_0x4216f1(this);if(!_0x1637a9[_0xbfc7('0x22')])return _0x3c6be3([_0xbfc7('0x37'),_0x349a8b],_0xbfc7('0x38'));_0x1637a9[_0xbfc7('0x1e')](_0xbfc7('0x39'))[_0xbfc7('0x24')]()['addClass'](_0xbfc7('0x3a'));_0x1637a9[_0xbfc7('0x1e')]('li')['each'](function(){var _0x361002=_0x4216f1(this);var _0x37959a=_0x361002[_0xbfc7('0x3b')](':not(ul)');_0x37959a['length']&&_0x361002[_0xbfc7('0x11')]('qd-am-elem-'+_0x37959a['first']()['text']()[_0xbfc7('0x2f')]()[_0xbfc7('0x3c')]()[_0xbfc7('0x15')](/\./g,'')[_0xbfc7('0x15')](/\s/g,'-')[_0xbfc7('0xb')]());});var _0x5e66fe=_0x1637a9['find'](_0xbfc7('0x3d'))[_0xbfc7('0xf')]();_0x1637a9['addClass'](_0xbfc7('0x3e'));_0x5e66fe=_0x5e66fe[_0xbfc7('0x1e')](_0xbfc7('0x3f'));_0x5e66fe[_0xbfc7('0x10')](function(){var _0x327f26=_0x4216f1(this);_0x327f26[_0xbfc7('0x1e')]('>li')['qdAmAddNdx']()['addClass'](_0xbfc7('0x40'));_0x327f26[_0xbfc7('0x11')](_0xbfc7('0x41'));_0x327f26[_0xbfc7('0x24')]()[_0xbfc7('0x11')](_0xbfc7('0x42'));});_0x5e66fe[_0xbfc7('0x11')]('qd-am-dropdown');var _0x29acd6=0x0,_0x1e39c5=function(_0x52ab52){_0x29acd6+=0x1;_0x52ab52=_0x52ab52[_0xbfc7('0x3b')]('li')['children']('*');_0x52ab52['length']&&(_0x52ab52[_0xbfc7('0x11')](_0xbfc7('0x43')+_0x29acd6),_0x1e39c5(_0x52ab52));};_0x1e39c5(_0x1637a9);_0x1637a9['add'](_0x1637a9[_0xbfc7('0x1e')]('ul'))['each'](function(){var _0x4dfc29=_0x4216f1(this);_0x4dfc29[_0xbfc7('0x11')]('qd-am-'+_0x4dfc29[_0xbfc7('0x3b')]('li')[_0xbfc7('0x22')]+_0xbfc7('0x44'));});});_0x2d9c17(_0x3dd500);_0x5b456c[_0xbfc7('0x45')][_0xbfc7('0x35')](this);_0x4216f1(window)[_0xbfc7('0x36')](_0xbfc7('0x46'),_0x349a8b);};_0x4216f1['fn'][_0xbfc7('0x3')]=function(_0x4e4bf9){var _0x4c63b0=_0x4216f1(this);if(!_0x4c63b0[_0xbfc7('0x22')])return _0x4c63b0;_0x5b456c=_0x4216f1[_0xbfc7('0x47')]({},_0x3c6d4f,_0x4e4bf9);_0x4c63b0['exec']=new _0x4216f1[(_0xbfc7('0x3'))](_0x4216f1(this));return _0x4c63b0;};_0x4216f1(function(){_0x4216f1(_0xbfc7('0x48'))[_0xbfc7('0x3')]();});}}(this));

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
var _0x42ee=['.qd-bap-qtt','.qd_bap_wrapper_content','.qdDdcContainer','QD_smartCart','dropDown','smartCart','getParent','closest','replace','abs','undefined','pow','toFixed','round','split','length','join','function','prototype','trim','capitalize','charAt','toUpperCase','slice','toLowerCase','qdAjax','qdAjaxQueue','jquery','000','error','extend','GET','object','data','stringify','toString','url','type','jqXHR','ajax','done','success','fail','complete','always','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','message','4.0','simpleCart','checkout','getOrderForm','call','QuatroDigital_simpleCart','ajaxStopOn','alerta','warn','[Simple\x20Cart]\x0a','info','elements','QD_simpleCart','add','.qd_cart_qtt','.qd_cart_total','attr','each','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','Shipping','value','total','currencySymbol','allTotal','qtt','showQuantityByItems','items','quantity','callback','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','hide','filter','show','addClass','removeClass','$this','O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','cartTotalE','html','cartQttE','itemsTextE','find','cartTotal','itemsText','emptyElem','emptyCart','qd-sc-populated','smartCheckout','_QuatroDigital_DropDown','vtexjs','SDK','QD_checkoutQueue','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','trigger','simpleCartCallback.quatro_digital','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','.qd_cart_auto','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','Oooops!\x20','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','Callbacks','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','.productInformationWrapper\x20\x20a.buy-button','input.buy-in-page-quantity','javascript:','body','.productQuickView','Produto\x20adicionado\x20ao\x20carrinho!','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','location','#produto,\x20.produto','QD_buyButton','isSmartCheckout','qd-bb-click-active','click.qd_bb_buy_sc','allowBuyClick','Método\x20descontinuado!','buyButton','.qd-sbb-on','.btn-add-buy-button-asynchronous','.remove-href','qd-bb-active','children','.qd-bb-productAdded','append','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','.buy-in-page-button','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','[href=\x27','---','qd-bb-itemAddBuyButtonWrapper','qd-bb-itemAddCartWrapper','getCartInfoByUrl','autoWatchBuyButton','mouseenter.qd_bb_buy_sc','unbind','click','clickBuySmartCheckout','href','indexOf','selectSkuMsg','?redirect=false&','execDefaultAction','queue','test','match','push','productPageCallback','buyButtonClickCallback','prodAdd','ku=','pop','shift','asyncCallback','productAddedToCart','fakeRequest','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','Callback\x20não\x20é\x20uma\x20função','.qd-bb-itemAddWrapper','prepend','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','QuatroDigital.qd_bb_prod_add','ajaxSend','productAddedToCart.qdSbbVtex','ajaxStop','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','allowUpdate','QD_dropDownCart','fromCharCode','charCodeAt','ite','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','skuName','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20input','val','updateOnlyHover','mouseenter.qd_ddc_hover','texts','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','.qd-ddc-viewCart','linkCart','continueShopping','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','shipping','.qd-ddc-infoAllTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','.qd-ddc-wrapper','Este\x20método\x20esta\x20descontinuado!','cartIsEmpty','qd-ddc-noItems','empty','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','qd-ddc-','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','content','.qd-ddc-quantity','insertProdImg','.qd-ddc-image','imageUrl','appendTo','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','outerHeight','qd-ddc-lastAdded','qd-ddc-lastAddedFixed','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','load','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','preventDefault','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','.qd-ddc-prodRow','click.qd_ddc_remove','removeProduct','stop','slideUp','shippingCalculate','$1-$2$3','qdDdcLastPostalCode','calculateShipping','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','index','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','avisso','allowRecalculate','buyButtonClicked','quickViewUpdate','prod_','productId','prodId','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value='];(function(_0x18f645,_0x2513d4){var _0x494d39=function(_0x49b37f){while(--_0x49b37f){_0x18f645['push'](_0x18f645['shift']());}};_0x494d39(++_0x2513d4);}(_0x42ee,0x14c));var _0xe42e=function(_0x2d2c16,_0x4e88b6){_0x2d2c16=_0x2d2c16-0x0;var _0x53f2fb=_0x42ee[_0x2d2c16];return _0x53f2fb;};(function(_0x50d336){_0x50d336['fn'][_0xe42e('0x0')]=_0x50d336['fn'][_0xe42e('0x1')];}(jQuery));function qd_number_format(_0x3ab147,_0x91ed0f,_0x458d94,_0x9314e2){_0x3ab147=(_0x3ab147+'')[_0xe42e('0x2')](/[^0-9+\-Ee.]/g,'');_0x3ab147=isFinite(+_0x3ab147)?+_0x3ab147:0x0;_0x91ed0f=isFinite(+_0x91ed0f)?Math[_0xe42e('0x3')](_0x91ed0f):0x0;_0x9314e2='undefined'===typeof _0x9314e2?',':_0x9314e2;_0x458d94=_0xe42e('0x4')===typeof _0x458d94?'.':_0x458d94;var _0x590b41='',_0x590b41=function(_0x326f76,_0x3b4a38){var _0x91ed0f=Math[_0xe42e('0x5')](0xa,_0x3b4a38);return''+(Math['round'](_0x326f76*_0x91ed0f)/_0x91ed0f)[_0xe42e('0x6')](_0x3b4a38);},_0x590b41=(_0x91ed0f?_0x590b41(_0x3ab147,_0x91ed0f):''+Math[_0xe42e('0x7')](_0x3ab147))[_0xe42e('0x8')]('.');0x3<_0x590b41[0x0]['length']&&(_0x590b41[0x0]=_0x590b41[0x0][_0xe42e('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x9314e2));(_0x590b41[0x1]||'')[_0xe42e('0x9')]<_0x91ed0f&&(_0x590b41[0x1]=_0x590b41[0x1]||'',_0x590b41[0x1]+=Array(_0x91ed0f-_0x590b41[0x1][_0xe42e('0x9')]+0x1)[_0xe42e('0xa')]('0'));return _0x590b41['join'](_0x458d94);};_0xe42e('0xb')!==typeof String[_0xe42e('0xc')]['trim']&&(String[_0xe42e('0xc')][_0xe42e('0xd')]=function(){return this[_0xe42e('0x2')](/^\s+|\s+$/g,'');});_0xe42e('0xb')!=typeof String[_0xe42e('0xc')][_0xe42e('0xe')]&&(String[_0xe42e('0xc')][_0xe42e('0xe')]=function(){return this[_0xe42e('0xf')](0x0)[_0xe42e('0x10')]()+this[_0xe42e('0x11')](0x1)[_0xe42e('0x12')]();});(function(_0x20f46d){if('function'!==typeof _0x20f46d[_0xe42e('0x13')]){var _0x1a19a3={};_0x20f46d[_0xe42e('0x14')]=_0x1a19a3;0x96>parseInt((_0x20f46d['fn'][_0xe42e('0x15')]['replace'](/[^0-9]+/g,'')+_0xe42e('0x16'))['slice'](0x0,0x3),0xa)&&console&&'function'==typeof console['error']&&console[_0xe42e('0x17')]();_0x20f46d['qdAjax']=function(_0x114c9a){try{var _0x30ab02=_0x20f46d[_0xe42e('0x18')]({},{'url':'','type':_0xe42e('0x19'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x114c9a);var _0x236ebd=_0xe42e('0x1a')===typeof _0x30ab02[_0xe42e('0x1b')]?JSON[_0xe42e('0x1c')](_0x30ab02[_0xe42e('0x1b')]):_0x30ab02[_0xe42e('0x1b')][_0xe42e('0x1d')]();var _0x12dfa5=encodeURIComponent(_0x30ab02[_0xe42e('0x1e')]+'|'+_0x30ab02[_0xe42e('0x1f')]+'|'+_0x236ebd);_0x1a19a3[_0x12dfa5]=_0x1a19a3[_0x12dfa5]||{};_0xe42e('0x4')==typeof _0x1a19a3[_0x12dfa5][_0xe42e('0x20')]?_0x1a19a3[_0x12dfa5][_0xe42e('0x20')]=_0x20f46d[_0xe42e('0x21')](_0x30ab02):(_0x1a19a3[_0x12dfa5][_0xe42e('0x20')][_0xe42e('0x22')](_0x30ab02[_0xe42e('0x23')]),_0x1a19a3[_0x12dfa5][_0xe42e('0x20')][_0xe42e('0x24')](_0x30ab02['error']),_0x1a19a3[_0x12dfa5]['jqXHR']['always'](_0x30ab02[_0xe42e('0x25')]));_0x1a19a3[_0x12dfa5][_0xe42e('0x20')][_0xe42e('0x26')](function(){isNaN(parseInt(_0x30ab02[_0xe42e('0x27')]))||setTimeout(function(){_0x1a19a3[_0x12dfa5][_0xe42e('0x20')]=void 0x0;},_0x30ab02['clearQueueDelay']);});return _0x1a19a3[_0x12dfa5]['jqXHR'];}catch(_0x5004d7){_0xe42e('0x4')!==typeof console&&_0xe42e('0xb')===typeof console[_0xe42e('0x17')]&&console['error'](_0xe42e('0x28')+_0x5004d7[_0xe42e('0x29')]);}};_0x20f46d[_0xe42e('0x13')]['version']=_0xe42e('0x2a');}}(jQuery));(function(_0x185a7e){_0x185a7e['fn'][_0xe42e('0x0')]=_0x185a7e['fn'][_0xe42e('0x1')];}(jQuery));(function(){var _0x201c35=jQuery;if(_0xe42e('0xb')!==typeof _0x201c35['fn'][_0xe42e('0x2b')]){_0x201c35(function(){var _0x220538=vtexjs[_0xe42e('0x2c')]['getOrderForm'];vtexjs[_0xe42e('0x2c')][_0xe42e('0x2d')]=function(){return _0x220538[_0xe42e('0x2e')]();};});try{window[_0xe42e('0x2f')]=window[_0xe42e('0x2f')]||{};window[_0xe42e('0x2f')][_0xe42e('0x30')]=!0x1;_0x201c35['fn'][_0xe42e('0x2b')]=function(_0x518f1b,_0x1bfa9f,_0x48629d){var _0x3c6811=function(_0xf924ce,_0x18c666){if(_0xe42e('0x1a')===typeof console){var _0x37b1f9=_0xe42e('0x1a')===typeof _0xf924ce;_0xe42e('0x4')!==typeof _0x18c666&&_0xe42e('0x31')===_0x18c666[_0xe42e('0x12')]()?_0x37b1f9?console[_0xe42e('0x32')](_0xe42e('0x33'),_0xf924ce[0x0],_0xf924ce[0x1],_0xf924ce[0x2],_0xf924ce[0x3],_0xf924ce[0x4],_0xf924ce[0x5],_0xf924ce[0x6],_0xf924ce[0x7]):console[_0xe42e('0x32')](_0xe42e('0x33')+_0xf924ce):_0xe42e('0x4')!==typeof _0x18c666&&_0xe42e('0x34')===_0x18c666[_0xe42e('0x12')]()?_0x37b1f9?console[_0xe42e('0x34')](_0xe42e('0x33'),_0xf924ce[0x0],_0xf924ce[0x1],_0xf924ce[0x2],_0xf924ce[0x3],_0xf924ce[0x4],_0xf924ce[0x5],_0xf924ce[0x6],_0xf924ce[0x7]):console[_0xe42e('0x34')](_0xe42e('0x33')+_0xf924ce):_0x37b1f9?console[_0xe42e('0x17')]('[Simple\x20Cart]\x0a',_0xf924ce[0x0],_0xf924ce[0x1],_0xf924ce[0x2],_0xf924ce[0x3],_0xf924ce[0x4],_0xf924ce[0x5],_0xf924ce[0x6],_0xf924ce[0x7]):console['error'](_0xe42e('0x33')+_0xf924ce);}};var _0x15f8e6=_0x201c35(this);_0xe42e('0x1a')===typeof _0x518f1b?_0x1bfa9f=_0x518f1b:(_0x518f1b=_0x518f1b||!0x1,_0x15f8e6=_0x15f8e6['add'](_0x201c35['QD_simpleCart'][_0xe42e('0x35')]));if(!_0x15f8e6['length'])return _0x15f8e6;_0x201c35[_0xe42e('0x36')][_0xe42e('0x35')]=_0x201c35[_0xe42e('0x36')][_0xe42e('0x35')][_0xe42e('0x37')](_0x15f8e6);_0x48629d=_0xe42e('0x4')===typeof _0x48629d?!0x1:_0x48629d;var _0x3ab83f={'cartQtt':_0xe42e('0x38'),'cartTotal':_0xe42e('0x39'),'itemsText':'.qd_items_text','currencySymbol':(_0x201c35('meta[name=currency]')[_0xe42e('0x3a')]('content')||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x593c42=_0x201c35['extend']({},_0x3ab83f,_0x1bfa9f);var _0x55533e=_0x201c35('');_0x15f8e6[_0xe42e('0x3b')](function(){var _0x56067d=_0x201c35(this);_0x56067d['data'](_0xe42e('0x3c'))||_0x56067d[_0xe42e('0x1b')]('qd_simpleCartOpts',_0x593c42);});var _0x1ee537=function(_0x3dece4){window[_0xe42e('0x3d')]=window[_0xe42e('0x3d')]||{};for(var _0x518f1b=0x0,_0x567795=0x0,_0x431d15=0x0;_0x431d15<_0x3dece4[_0xe42e('0x3e')][_0xe42e('0x9')];_0x431d15++)_0xe42e('0x3f')==_0x3dece4[_0xe42e('0x3e')][_0x431d15]['id']&&(_0x567795+=_0x3dece4[_0xe42e('0x3e')][_0x431d15][_0xe42e('0x40')]),_0x518f1b+=_0x3dece4[_0xe42e('0x3e')][_0x431d15][_0xe42e('0x40')];window['_QuatroDigital_CartData'][_0xe42e('0x41')]=_0x593c42[_0xe42e('0x42')]+qd_number_format(_0x518f1b/0x64,0x2,',','.');window[_0xe42e('0x3d')]['shipping']=_0x593c42[_0xe42e('0x42')]+qd_number_format(_0x567795/0x64,0x2,',','.');window[_0xe42e('0x3d')][_0xe42e('0x43')]=_0x593c42[_0xe42e('0x42')]+qd_number_format((_0x518f1b+_0x567795)/0x64,0x2,',','.');window[_0xe42e('0x3d')][_0xe42e('0x44')]=0x0;if(_0x593c42[_0xe42e('0x45')])for(_0x431d15=0x0;_0x431d15<_0x3dece4[_0xe42e('0x46')][_0xe42e('0x9')];_0x431d15++)window[_0xe42e('0x3d')][_0xe42e('0x44')]+=_0x3dece4[_0xe42e('0x46')][_0x431d15][_0xe42e('0x47')];else window[_0xe42e('0x3d')][_0xe42e('0x44')]=_0x3dece4[_0xe42e('0x46')][_0xe42e('0x9')]||0x0;try{window[_0xe42e('0x3d')][_0xe42e('0x48')]&&window[_0xe42e('0x3d')]['callback']['fire']&&window['_QuatroDigital_CartData'][_0xe42e('0x48')][_0xe42e('0x49')]();}catch(_0x1d52d2){_0x3c6811(_0xe42e('0x4a'));}_0x50665a(_0x55533e);};var _0x3e9600=function(_0x3343f8,_0x1ccacb){0x1===_0x3343f8?_0x1ccacb[_0xe42e('0x4b')]()[_0xe42e('0x4c')]('.singular')[_0xe42e('0x4d')]():_0x1ccacb['hide']()[_0xe42e('0x4c')]('.plural')[_0xe42e('0x4d')]();};var _0x19d1d5=function(_0x2ae045){0x1>_0x2ae045?_0x15f8e6[_0xe42e('0x4e')]('qd-emptyCart'):_0x15f8e6[_0xe42e('0x4f')]('qd-emptyCart');};var _0x3a8275=function(_0x4f1dad,_0x97fc7f){var _0x4e1b2e=parseInt(window[_0xe42e('0x3d')][_0xe42e('0x44')],0xa);_0x97fc7f[_0xe42e('0x50')][_0xe42e('0x4d')]();isNaN(_0x4e1b2e)&&(_0x3c6811(_0xe42e('0x51'),_0xe42e('0x31')),_0x4e1b2e=0x0);_0x97fc7f[_0xe42e('0x52')][_0xe42e('0x53')](window['_QuatroDigital_CartData'][_0xe42e('0x41')]);_0x97fc7f[_0xe42e('0x54')][_0xe42e('0x53')](_0x4e1b2e);_0x3e9600(_0x4e1b2e,_0x97fc7f[_0xe42e('0x55')]);_0x19d1d5(_0x4e1b2e);};var _0x50665a=function(_0x4d11fa){_0x15f8e6[_0xe42e('0x3b')](function(){var _0x5df68a={};var _0x2dfa49=_0x201c35(this);_0x518f1b&&_0x2dfa49[_0xe42e('0x1b')](_0xe42e('0x3c'))&&_0x201c35['extend'](_0x593c42,_0x2dfa49[_0xe42e('0x1b')](_0xe42e('0x3c')));_0x5df68a[_0xe42e('0x50')]=_0x2dfa49;_0x5df68a['cartQttE']=_0x2dfa49[_0xe42e('0x56')](_0x593c42['cartQtt'])||_0x55533e;_0x5df68a[_0xe42e('0x52')]=_0x2dfa49[_0xe42e('0x56')](_0x593c42[_0xe42e('0x57')])||_0x55533e;_0x5df68a[_0xe42e('0x55')]=_0x2dfa49[_0xe42e('0x56')](_0x593c42[_0xe42e('0x58')])||_0x55533e;_0x5df68a[_0xe42e('0x59')]=_0x2dfa49[_0xe42e('0x56')](_0x593c42[_0xe42e('0x5a')])||_0x55533e;_0x3a8275(_0x4d11fa,_0x5df68a);_0x2dfa49[_0xe42e('0x4e')](_0xe42e('0x5b'));});};(function(){if(_0x593c42[_0xe42e('0x5c')]){window[_0xe42e('0x5d')]=window[_0xe42e('0x5d')]||{};if(_0xe42e('0x4')!==typeof window[_0xe42e('0x5d')][_0xe42e('0x2d')]&&(_0x48629d||!_0x518f1b))return _0x1ee537(window['_QuatroDigital_DropDown'][_0xe42e('0x2d')]);if('object'!==typeof window[_0xe42e('0x5e')]||_0xe42e('0x4')===typeof window['vtexjs'][_0xe42e('0x2c')])if(_0xe42e('0x1a')===typeof vtex&&'object'===typeof vtex['checkout']&&'undefined'!==typeof vtex[_0xe42e('0x2c')][_0xe42e('0x5f')])new vtex[(_0xe42e('0x2c'))]['SDK']();else return _0x3c6811('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x201c35[_0xe42e('0x60')]([_0xe42e('0x46'),_0xe42e('0x3e'),_0xe42e('0x61')],{'done':function(_0x55f702){_0x1ee537(_0x55f702);window[_0xe42e('0x5d')]['getOrderForm']=_0x55f702;},'fail':function(_0x310fcc){_0x3c6811([_0xe42e('0x62'),_0x310fcc]);}});}else alert(_0xe42e('0x63'));}());_0x593c42[_0xe42e('0x48')]();_0x201c35(window)[_0xe42e('0x64')](_0xe42e('0x65'));return _0x15f8e6;};_0x201c35['QD_simpleCart']={'elements':_0x201c35('')};_0x201c35(function(){var _0x30f989;_0xe42e('0xb')===typeof window[_0xe42e('0x66')]&&(_0x30f989=window[_0xe42e('0x66')],window[_0xe42e('0x66')]=function(_0x23d72a,_0x1b4779,_0x54a3f3,_0x117528,_0x33aed5){_0x30f989[_0xe42e('0x2e')](this,_0x23d72a,_0x1b4779,_0x54a3f3,_0x117528,function(){_0xe42e('0xb')===typeof _0x33aed5&&_0x33aed5();_0x201c35[_0xe42e('0x36')]['elements'][_0xe42e('0x3b')](function(){var _0x3f6983=_0x201c35(this);_0x3f6983['simpleCart'](_0x3f6983[_0xe42e('0x1b')]('qd_simpleCartOpts'));});});});});var _0xb5590=window[_0xe42e('0x67')]||void 0x0;window['ReloadItemsCart']=function(_0x453a97){_0x201c35['fn'][_0xe42e('0x2b')](!0x0);_0xe42e('0xb')===typeof _0xb5590?_0xb5590[_0xe42e('0x2e')](this,_0x453a97):alert(_0x453a97);};_0x201c35(function(){var _0xec570f=_0x201c35(_0xe42e('0x68'));_0xec570f['length']&&_0xec570f[_0xe42e('0x2b')]();});_0x201c35(function(){_0x201c35(window)['bind'](_0xe42e('0x69'),function(){_0x201c35['fn']['simpleCart'](!0x0);});});}catch(_0x5a0732){_0xe42e('0x4')!==typeof console&&'function'===typeof console[_0xe42e('0x17')]&&console[_0xe42e('0x17')](_0xe42e('0x6a'),_0x5a0732);}}}());(function(){var _0x2c781d=function(_0x3a5ecc,_0x225510){if('object'===typeof console){var _0x4148da=_0xe42e('0x1a')===typeof _0x3a5ecc;_0xe42e('0x4')!==typeof _0x225510&&'alerta'===_0x225510[_0xe42e('0x12')]()?_0x4148da?console[_0xe42e('0x32')](_0xe42e('0x6b'),_0x3a5ecc[0x0],_0x3a5ecc[0x1],_0x3a5ecc[0x2],_0x3a5ecc[0x3],_0x3a5ecc[0x4],_0x3a5ecc[0x5],_0x3a5ecc[0x6],_0x3a5ecc[0x7]):console[_0xe42e('0x32')](_0xe42e('0x6b')+_0x3a5ecc):'undefined'!==typeof _0x225510&&'info'===_0x225510[_0xe42e('0x12')]()?_0x4148da?console[_0xe42e('0x34')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x3a5ecc[0x0],_0x3a5ecc[0x1],_0x3a5ecc[0x2],_0x3a5ecc[0x3],_0x3a5ecc[0x4],_0x3a5ecc[0x5],_0x3a5ecc[0x6],_0x3a5ecc[0x7]):console[_0xe42e('0x34')](_0xe42e('0x6b')+_0x3a5ecc):_0x4148da?console[_0xe42e('0x17')](_0xe42e('0x6b'),_0x3a5ecc[0x0],_0x3a5ecc[0x1],_0x3a5ecc[0x2],_0x3a5ecc[0x3],_0x3a5ecc[0x4],_0x3a5ecc[0x5],_0x3a5ecc[0x6],_0x3a5ecc[0x7]):console['error'](_0xe42e('0x6b')+_0x3a5ecc);}},_0x3268b2=null,_0x34a9da={},_0x4cb323={},_0x2e07c8={};$[_0xe42e('0x60')]=function(_0x58dfc9,_0x4e48d0){if(null===_0x3268b2)if(_0xe42e('0x1a')===typeof window[_0xe42e('0x5e')]&&_0xe42e('0x4')!==typeof window[_0xe42e('0x5e')][_0xe42e('0x2c')])_0x3268b2=window[_0xe42e('0x5e')][_0xe42e('0x2c')];else return _0x2c781d(_0xe42e('0x6c'));var _0x340990=$[_0xe42e('0x18')]({'done':function(){},'fail':function(){}},_0x4e48d0),_0x226cf3=_0x58dfc9['join'](';'),_0x13499c=function(){_0x34a9da[_0x226cf3][_0xe42e('0x37')](_0x340990[_0xe42e('0x22')]);_0x4cb323[_0x226cf3][_0xe42e('0x37')](_0x340990['fail']);};_0x2e07c8[_0x226cf3]?_0x13499c():(_0x34a9da[_0x226cf3]=$[_0xe42e('0x6d')](),_0x4cb323[_0x226cf3]=$[_0xe42e('0x6d')](),_0x13499c(),_0x2e07c8[_0x226cf3]=!0x0,_0x3268b2[_0xe42e('0x2d')](_0x58dfc9)[_0xe42e('0x22')](function(_0x57df28){_0x2e07c8[_0x226cf3]=!0x1;_0x34a9da[_0x226cf3]['fire'](_0x57df28);})[_0xe42e('0x24')](function(_0x1319cc){_0x2e07c8[_0x226cf3]=!0x1;_0x4cb323[_0x226cf3][_0xe42e('0x49')](_0x1319cc);}));};}());(function(_0x6bfd09){try{var _0x2a389a=jQuery,_0xd5dfcd,_0x1e267c=_0x2a389a({}),_0x1788c7=function(_0x249270,_0x2a0429){if('object'===typeof console&&_0xe42e('0x4')!==typeof console[_0xe42e('0x17')]&&'undefined'!==typeof console[_0xe42e('0x34')]&&_0xe42e('0x4')!==typeof console[_0xe42e('0x32')]){var _0x55e616;_0xe42e('0x1a')===typeof _0x249270?(_0x249270[_0xe42e('0x6e')](_0xe42e('0x6f')),_0x55e616=_0x249270):_0x55e616=[_0xe42e('0x6f')+_0x249270];if(_0xe42e('0x4')===typeof _0x2a0429||_0xe42e('0x31')!==_0x2a0429[_0xe42e('0x12')]()&&_0xe42e('0x70')!==_0x2a0429[_0xe42e('0x12')]())if('undefined'!==typeof _0x2a0429&&_0xe42e('0x34')===_0x2a0429[_0xe42e('0x12')]())try{console[_0xe42e('0x34')]['apply'](console,_0x55e616);}catch(_0x93fe6c){try{console['info'](_0x55e616['join']('\x0a'));}catch(_0x256375){}}else try{console['error'][_0xe42e('0x71')](console,_0x55e616);}catch(_0x1f7a37){try{console[_0xe42e('0x17')](_0x55e616['join']('\x0a'));}catch(_0x42b609){}}else try{console[_0xe42e('0x32')]['apply'](console,_0x55e616);}catch(_0x1427e9){try{console[_0xe42e('0x32')](_0x55e616[_0xe42e('0xa')]('\x0a'));}catch(_0x3c51cc){}}}},_0x31b62a={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0xe42e('0x72'),'buyQtt':_0xe42e('0x73'),'selectSkuMsg':_0xe42e('0x74'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x489e36,_0x360eec,_0x2b3b56){_0x2a389a(_0xe42e('0x75'))['is'](_0xe42e('0x76'))&&(_0xe42e('0x23')===_0x360eec?alert(_0xe42e('0x77')):(alert(_0xe42e('0x78')),(_0xe42e('0x1a')===typeof parent?parent:document)[_0xe42e('0x79')]['href']=_0x2b3b56));},'isProductPage':function(){return _0x2a389a(_0xe42e('0x75'))['is'](_0xe42e('0x7a'));},'execDefaultAction':function(_0x1fb10a){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x2a389a[_0xe42e('0x7b')]=function(_0x3bf946,_0x4d3689){function _0x2fc253(_0x13dec6){_0xd5dfcd[_0xe42e('0x7c')]?_0x13dec6[_0xe42e('0x1b')](_0xe42e('0x7d'))||(_0x13dec6[_0xe42e('0x1b')]('qd-bb-click-active',0x1),_0x13dec6['on'](_0xe42e('0x7e'),function(_0x2b837c){if(!_0xd5dfcd[_0xe42e('0x7f')]())return!0x0;if(!0x0!==_0x44c055['clickBuySmartCheckout']['call'](this))return _0x2b837c['preventDefault'](),!0x1;})):alert(_0xe42e('0x80'));}function _0x30eecb(_0x272cf4){_0x272cf4=_0x272cf4||_0x2a389a(_0xd5dfcd[_0xe42e('0x81')]);_0x272cf4[_0xe42e('0x3b')](function(){var _0x272cf4=_0x2a389a(this);_0x272cf4['is'](_0xe42e('0x82'))||(_0x272cf4['addClass']('qd-sbb-on'),_0x272cf4['is'](_0xe42e('0x83'))&&!_0x272cf4['is'](_0xe42e('0x84'))||_0x272cf4[_0xe42e('0x1b')](_0xe42e('0x85'))||(_0x272cf4['data']('qd-bb-active',0x1),_0x272cf4[_0xe42e('0x86')](_0xe42e('0x87'))[_0xe42e('0x9')]||_0x272cf4[_0xe42e('0x88')](_0xe42e('0x89')),_0x272cf4['is'](_0xe42e('0x8a'))&&_0xd5dfcd[_0xe42e('0x8b')]()&&_0x16fce7[_0xe42e('0x2e')](_0x272cf4),_0x2fc253(_0x272cf4)));});_0xd5dfcd[_0xe42e('0x8b')]()&&!_0x272cf4[_0xe42e('0x9')]&&_0x1788c7(_0xe42e('0x8c')+_0x272cf4[_0xe42e('0x8d')]+'\x27.',_0xe42e('0x34'));}var _0x533eae=_0x2a389a(_0x3bf946);var _0x44c055=this;window['_Quatro_Digital_dropDown']=window[_0xe42e('0x8e')]||{};window['_QuatroDigital_CartData']=window['_QuatroDigital_CartData']||{};_0x44c055['prodAdd']=function(_0x410e8c,_0x44eade){_0x533eae[_0xe42e('0x4e')](_0xe42e('0x8f'));_0x2a389a('body')[_0xe42e('0x4e')](_0xe42e('0x90'));var _0x4331c2=_0x2a389a(_0xd5dfcd[_0xe42e('0x81')])[_0xe42e('0x4c')](_0xe42e('0x91')+(_0x410e8c['attr']('href')||_0xe42e('0x92'))+'\x27]')['add'](_0x410e8c);_0x4331c2[_0xe42e('0x4e')](_0xe42e('0x93'));setTimeout(function(){_0x533eae[_0xe42e('0x4f')](_0xe42e('0x94'));_0x4331c2[_0xe42e('0x4f')](_0xe42e('0x93'));},_0xd5dfcd['timeRemoveNewItemClass']);window['_Quatro_Digital_dropDown'][_0xe42e('0x2d')]=void 0x0;if(_0xe42e('0x4')!==typeof _0x4d3689&&_0xe42e('0xb')===typeof _0x4d3689[_0xe42e('0x95')])return _0xd5dfcd[_0xe42e('0x7c')]||(_0x1788c7('função\x20descontinuada'),_0x4d3689[_0xe42e('0x95')]()),window[_0xe42e('0x5d')]['getOrderForm']=void 0x0,_0x4d3689['getCartInfoByUrl'](function(_0x8064bb){window[_0xe42e('0x8e')][_0xe42e('0x2d')]=_0x8064bb;_0x2a389a['fn'][_0xe42e('0x2b')](!0x0,void 0x0,!0x0);},{'lastSku':_0x44eade});window[_0xe42e('0x8e')]['allowUpdate']=!0x0;_0x2a389a['fn'][_0xe42e('0x2b')](!0x0);};(function(){if(_0xd5dfcd[_0xe42e('0x7c')]&&_0xd5dfcd[_0xe42e('0x96')]){var _0xc89dac=_0x2a389a('.btn-add-buy-button-asynchronous');_0xc89dac[_0xe42e('0x9')]&&_0x30eecb(_0xc89dac);}}());var _0x16fce7=function(){var _0x3e9b35=_0x2a389a(this);'undefined'!==typeof _0x3e9b35[_0xe42e('0x1b')]('buyButton')?(_0x3e9b35['unbind']('click'),_0x2fc253(_0x3e9b35)):(_0x3e9b35['bind'](_0xe42e('0x97'),function(_0x5459bd){_0x3e9b35[_0xe42e('0x98')](_0xe42e('0x99'));_0x2fc253(_0x3e9b35);_0x2a389a(this)[_0xe42e('0x98')](_0x5459bd);}),_0x2a389a(window)['load'](function(){_0x3e9b35['unbind'](_0xe42e('0x99'));_0x2fc253(_0x3e9b35);_0x3e9b35[_0xe42e('0x98')]('mouseenter.qd_bb_buy_sc');}));};_0x44c055[_0xe42e('0x9a')]=function(){var _0x1bcdb3=_0x2a389a(this),_0x3bf946=_0x1bcdb3[_0xe42e('0x3a')](_0xe42e('0x9b'))||'';if(-0x1<_0x3bf946[_0xe42e('0x9c')](_0xd5dfcd[_0xe42e('0x9d')]))return!0x0;_0x3bf946=_0x3bf946[_0xe42e('0x2')](/redirect\=(false|true)/gi,'')[_0xe42e('0x2')]('?',_0xe42e('0x9e'))[_0xe42e('0x2')](/\&\&/gi,'&');if(_0xd5dfcd[_0xe42e('0x9f')](_0x1bcdb3))return _0x1bcdb3['attr'](_0xe42e('0x9b'),_0x3bf946['replace']('redirect=false','redirect=true')),!0x0;_0x3bf946=_0x3bf946[_0xe42e('0x2')](/http.?:/i,'');_0x1e267c[_0xe42e('0xa0')](function(_0x10aaa2){if(!_0xd5dfcd['buyIfQuantityZeroed']&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0xe42e('0xa1')](_0x3bf946))return _0x10aaa2();var _0x23202b=function(_0x5372df,_0xc8a44a){var _0x30eecb=_0x3bf946[_0xe42e('0xa2')](/sku\=([0-9]+)/gi),_0x4d931a=[];if(_0xe42e('0x1a')===typeof _0x30eecb&&null!==_0x30eecb)for(var _0x80321e=_0x30eecb[_0xe42e('0x9')]-0x1;0x0<=_0x80321e;_0x80321e--){var _0xfb78ae=parseInt(_0x30eecb[_0x80321e][_0xe42e('0x2')](/sku\=/gi,''));isNaN(_0xfb78ae)||_0x4d931a[_0xe42e('0xa3')](_0xfb78ae);}_0xd5dfcd[_0xe42e('0xa4')][_0xe42e('0x2e')](this,_0x5372df,_0xc8a44a,_0x3bf946);_0x44c055[_0xe42e('0xa5')]['call'](this,_0x5372df,_0xc8a44a,_0x3bf946,_0x4d931a);_0x44c055[_0xe42e('0xa6')](_0x1bcdb3,_0x3bf946[_0xe42e('0x8')](_0xe42e('0xa7'))[_0xe42e('0xa8')]()[_0xe42e('0x8')]('&')[_0xe42e('0xa9')]());'function'===typeof _0xd5dfcd[_0xe42e('0xaa')]&&_0xd5dfcd[_0xe42e('0xaa')][_0xe42e('0x2e')](this);_0x2a389a(window)[_0xe42e('0x64')](_0xe42e('0xab'));_0x2a389a(window)['trigger']('cartProductAdded.vtex');};_0xd5dfcd[_0xe42e('0xac')]?(_0x23202b(null,_0xe42e('0x23')),_0x10aaa2()):_0x2a389a[_0xe42e('0x21')]({'url':_0x3bf946,'complete':_0x23202b})[_0xe42e('0x26')](function(){_0x10aaa2();});});};_0x44c055['buyButtonClickCallback']=function(_0x35d622,_0x2c2d3a,_0x4e3617,_0x4b6ab4){try{_0xe42e('0x23')===_0x2c2d3a&&_0xe42e('0x1a')===typeof window[_0xe42e('0xad')]&&_0xe42e('0xb')===typeof window[_0xe42e('0xad')][_0xe42e('0xae')]&&window[_0xe42e('0xad')]['_QuatroDigital_prodBuyCallback'](_0x35d622,_0x2c2d3a,_0x4e3617,_0x4b6ab4);}catch(_0x251c50){_0x1788c7(_0xe42e('0xaf'));}};_0x30eecb();_0xe42e('0xb')===typeof _0xd5dfcd[_0xe42e('0x48')]?_0xd5dfcd[_0xe42e('0x48')][_0xe42e('0x2e')](this):_0x1788c7(_0xe42e('0xb0'));};var _0x30ee0b=_0x2a389a[_0xe42e('0x6d')]();_0x2a389a['fn'][_0xe42e('0x7b')]=function(_0x1f726d,_0x3f9d22){var _0x6bfd09=_0x2a389a(this);_0xe42e('0x4')!==typeof _0x3f9d22||_0xe42e('0x1a')!==typeof _0x1f726d||_0x1f726d instanceof _0x2a389a||(_0x3f9d22=_0x1f726d,_0x1f726d=void 0x0);_0xd5dfcd=_0x2a389a[_0xe42e('0x18')]({},_0x31b62a,_0x3f9d22);var _0x52aff5;_0x30ee0b[_0xe42e('0x37')](function(){_0x6bfd09['children'](_0xe42e('0xb1'))[_0xe42e('0x9')]||_0x6bfd09[_0xe42e('0xb2')](_0xe42e('0xb3'));_0x52aff5=new _0x2a389a[(_0xe42e('0x7b'))](_0x6bfd09,_0x1f726d);});_0x30ee0b[_0xe42e('0x49')]();_0x2a389a(window)['on'](_0xe42e('0xb4'),function(_0x577679,_0x30dce7,_0x162bff){_0x52aff5[_0xe42e('0xa6')](_0x30dce7,_0x162bff);});return _0x2a389a['extend'](_0x6bfd09,_0x52aff5);};var _0x293894=0x0;_0x2a389a(document)[_0xe42e('0xb5')](function(_0x2119b9,_0x4b97c6,_0x5b7aee){-0x1<_0x5b7aee[_0xe42e('0x1e')][_0xe42e('0x12')]()[_0xe42e('0x9c')]('/checkout/cart/add')&&(_0x293894=(_0x5b7aee['url'][_0xe42e('0xa2')](/sku\=([0-9]+)/i)||[''])['pop']());});_0x2a389a(window)['bind'](_0xe42e('0xb6'),function(){_0x2a389a(window)[_0xe42e('0x64')](_0xe42e('0xb4'),[new _0x2a389a(),_0x293894]);});_0x2a389a(document)[_0xe42e('0xb7')](function(){_0x30ee0b[_0xe42e('0x49')]();});}catch(_0x2cd637){_0xe42e('0x4')!==typeof console&&_0xe42e('0xb')===typeof console[_0xe42e('0x17')]&&console['error'](_0xe42e('0x6a'),_0x2cd637);}}(this));function qd_number_format(_0x11322b,_0x294caf,_0x55a317,_0x367a96){_0x11322b=(_0x11322b+'')[_0xe42e('0x2')](/[^0-9+\-Ee.]/g,'');_0x11322b=isFinite(+_0x11322b)?+_0x11322b:0x0;_0x294caf=isFinite(+_0x294caf)?Math[_0xe42e('0x3')](_0x294caf):0x0;_0x367a96='undefined'===typeof _0x367a96?',':_0x367a96;_0x55a317='undefined'===typeof _0x55a317?'.':_0x55a317;var _0x51aa5b='',_0x51aa5b=function(_0x18c844,_0x218338){var _0x24cfaf=Math[_0xe42e('0x5')](0xa,_0x218338);return''+(Math['round'](_0x18c844*_0x24cfaf)/_0x24cfaf)[_0xe42e('0x6')](_0x218338);},_0x51aa5b=(_0x294caf?_0x51aa5b(_0x11322b,_0x294caf):''+Math['round'](_0x11322b))[_0xe42e('0x8')]('.');0x3<_0x51aa5b[0x0][_0xe42e('0x9')]&&(_0x51aa5b[0x0]=_0x51aa5b[0x0][_0xe42e('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x367a96));(_0x51aa5b[0x1]||'')[_0xe42e('0x9')]<_0x294caf&&(_0x51aa5b[0x1]=_0x51aa5b[0x1]||'',_0x51aa5b[0x1]+=Array(_0x294caf-_0x51aa5b[0x1][_0xe42e('0x9')]+0x1)['join']('0'));return _0x51aa5b[_0xe42e('0xa')](_0x55a317);}(function(){try{window[_0xe42e('0x3d')]=window[_0xe42e('0x3d')]||{},window[_0xe42e('0x3d')][_0xe42e('0x48')]=window[_0xe42e('0x3d')][_0xe42e('0x48')]||$[_0xe42e('0x6d')]();}catch(_0x45e5e7){_0xe42e('0x4')!==typeof console&&_0xe42e('0xb')===typeof console[_0xe42e('0x17')]&&console[_0xe42e('0x17')]('Oooops!\x20',_0x45e5e7[_0xe42e('0x29')]);}}());(function(_0x3bff3b){try{var _0x407c3d=jQuery,_0x25b3e6=function(_0x466305,_0x496551){if(_0xe42e('0x1a')===typeof console&&'undefined'!==typeof console['error']&&_0xe42e('0x4')!==typeof console[_0xe42e('0x34')]&&_0xe42e('0x4')!==typeof console[_0xe42e('0x32')]){var _0x31d5cc;'object'===typeof _0x466305?(_0x466305[_0xe42e('0x6e')](_0xe42e('0xb8')),_0x31d5cc=_0x466305):_0x31d5cc=[_0xe42e('0xb8')+_0x466305];if(_0xe42e('0x4')===typeof _0x496551||_0xe42e('0x31')!==_0x496551['toLowerCase']()&&_0xe42e('0x70')!==_0x496551['toLowerCase']())if('undefined'!==typeof _0x496551&&_0xe42e('0x34')===_0x496551[_0xe42e('0x12')]())try{console['info'][_0xe42e('0x71')](console,_0x31d5cc);}catch(_0x3e0bcb){try{console[_0xe42e('0x34')](_0x31d5cc[_0xe42e('0xa')]('\x0a'));}catch(_0x132100){}}else try{console[_0xe42e('0x17')][_0xe42e('0x71')](console,_0x31d5cc);}catch(_0x591ae5){try{console['error'](_0x31d5cc[_0xe42e('0xa')]('\x0a'));}catch(_0x5f00bf){}}else try{console[_0xe42e('0x32')]['apply'](console,_0x31d5cc);}catch(_0x42f0b9){try{console[_0xe42e('0x32')](_0x31d5cc['join']('\x0a'));}catch(_0x2e68a9){}}}};window[_0xe42e('0x5d')]=window[_0xe42e('0x5d')]||{};window['_QuatroDigital_DropDown'][_0xe42e('0xb9')]=!0x0;_0x407c3d['QD_dropDownCart']=function(){};_0x407c3d['fn'][_0xe42e('0xba')]=function(){return{'fn':new _0x407c3d()};};var _0x13c382=function(_0x23bbb6){var _0x56866b={'i':'vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x249c9c){var _0x13cb10=function(_0x474f23){return _0x474f23;};var _0x2d2d54=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x249c9c=_0x249c9c['d'+_0x2d2d54[0x10]+'c'+_0x2d2d54[0x11]+'m'+_0x13cb10(_0x2d2d54[0x1])+'n'+_0x2d2d54[0xd]]['l'+_0x2d2d54[0x12]+'c'+_0x2d2d54[0x0]+'ti'+_0x13cb10('o')+'n'];var _0x4347ed=function(_0x37e3f1){return escape(encodeURIComponent(_0x37e3f1[_0xe42e('0x2')](/\./g,'¨')[_0xe42e('0x2')](/[a-zA-Z]/g,function(_0x37ff27){return String[_0xe42e('0xbb')](('Z'>=_0x37ff27?0x5a:0x7a)>=(_0x37ff27=_0x37ff27[_0xe42e('0xbc')](0x0)+0xd)?_0x37ff27:_0x37ff27-0x1a);})));};var _0x3bff3b=_0x4347ed(_0x249c9c[[_0x2d2d54[0x9],_0x13cb10('o'),_0x2d2d54[0xc],_0x2d2d54[_0x13cb10(0xd)]][_0xe42e('0xa')]('')]);_0x4347ed=_0x4347ed((window[['js',_0x13cb10('no'),'m',_0x2d2d54[0x1],_0x2d2d54[0x4][_0xe42e('0x10')](),_0xe42e('0xbd')][_0xe42e('0xa')]('')]||_0xe42e('0x92'))+['.v',_0x2d2d54[0xd],'e',_0x13cb10('x'),'co',_0x13cb10('mm'),_0xe42e('0xbe'),_0x2d2d54[0x1],'.c',_0x13cb10('o'),'m.',_0x2d2d54[0x13],'r']['join'](''));for(var _0x41f482 in _0x56866b){if(_0x4347ed===_0x41f482+_0x56866b[_0x41f482]||_0x3bff3b===_0x41f482+_0x56866b[_0x41f482]){var _0x510731='tr'+_0x2d2d54[0x11]+'e';break;}_0x510731='f'+_0x2d2d54[0x0]+'ls'+_0x13cb10(_0x2d2d54[0x1])+'';}_0x13cb10=!0x1;-0x1<_0x249c9c[[_0x2d2d54[0xc],'e',_0x2d2d54[0x0],'rc',_0x2d2d54[0x9]]['join']('')][_0xe42e('0x9c')](_0xe42e('0xbf'))&&(_0x13cb10=!0x0);return[_0x510731,_0x13cb10];}(_0x23bbb6);}(window);if(!eval(_0x13c382[0x0]))return _0x13c382[0x1]?_0x25b3e6('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x407c3d[_0xe42e('0xba')]=function(_0x228ee7,_0xcb8236){var _0x23872d=_0x407c3d(_0x228ee7);if(!_0x23872d[_0xe42e('0x9')])return _0x23872d;var _0x3e0a18=_0x407c3d[_0xe42e('0x18')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':_0xe42e('0xc0'),'cartTotal':_0xe42e('0xc1'),'emptyCart':_0xe42e('0xc2'),'continueShopping':'Continuar\x20Comprando','shippingForm':'<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x1b52f2){return _0x1b52f2[_0xe42e('0xc3')]||_0x1b52f2['name'];},'callback':function(){},'callbackProductsList':function(){}},_0xcb8236);_0x407c3d('');var _0x27789a=this;if(_0x3e0a18[_0xe42e('0x5c')]){var _0x4adba1=!0x1;_0xe42e('0x4')===typeof window[_0xe42e('0x5e')]&&(_0x25b3e6(_0xe42e('0xc4')),_0x407c3d[_0xe42e('0x21')]({'url':_0xe42e('0xc5'),'async':!0x1,'dataType':_0xe42e('0xc6'),'error':function(){_0x25b3e6(_0xe42e('0xc7'));_0x4adba1=!0x0;}}));if(_0x4adba1)return _0x25b3e6(_0xe42e('0xc8'));}if(_0xe42e('0x1a')===typeof window['vtexjs']&&_0xe42e('0x4')!==typeof window[_0xe42e('0x5e')][_0xe42e('0x2c')])var _0x2bddbe=window['vtexjs'][_0xe42e('0x2c')];else if('object'===typeof vtex&&_0xe42e('0x1a')===typeof vtex[_0xe42e('0x2c')]&&_0xe42e('0x4')!==typeof vtex['checkout'][_0xe42e('0x5f')])_0x2bddbe=new vtex['checkout'][(_0xe42e('0x5f'))]();else return _0x25b3e6(_0xe42e('0xc9'));_0x27789a[_0xe42e('0xca')]='<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>';var _0x5d6d82=function(_0x8f1c6f){_0x407c3d(this)[_0xe42e('0x88')](_0x8f1c6f);_0x8f1c6f[_0xe42e('0x56')]('.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose')[_0xe42e('0x37')](_0x407c3d(_0xe42e('0xcb')))['on'](_0xe42e('0xcc'),function(){_0x23872d[_0xe42e('0x4f')](_0xe42e('0xcd'));_0x407c3d(document['body'])[_0xe42e('0x4f')](_0xe42e('0x90'));});_0x407c3d(document)['off']('keyup.qd_ddc_closeFn')['on'](_0xe42e('0xce'),function(_0x2fdc76){0x1b==_0x2fdc76[_0xe42e('0xcf')]&&(_0x23872d[_0xe42e('0x4f')]('qd-bb-lightBoxProdAdd'),_0x407c3d(document[_0xe42e('0x75')])[_0xe42e('0x4f')](_0xe42e('0x90')));});var _0x3a11ea=_0x8f1c6f[_0xe42e('0x56')](_0xe42e('0xd0'));_0x8f1c6f[_0xe42e('0x56')](_0xe42e('0xd1'))['on'](_0xe42e('0xd2'),function(){_0x27789a[_0xe42e('0xd3')]('-',void 0x0,void 0x0,_0x3a11ea);return!0x1;});_0x8f1c6f[_0xe42e('0x56')](_0xe42e('0xd4'))['on'](_0xe42e('0xd5'),function(){_0x27789a['scrollCart'](void 0x0,void 0x0,void 0x0,_0x3a11ea);return!0x1;});_0x8f1c6f[_0xe42e('0x56')](_0xe42e('0xd6'))[_0xe42e('0xd7')]('')['on']('keyup.qd_ddc_cep',function(){_0x27789a['shippingCalculate'](_0x407c3d(this));});if(_0x3e0a18[_0xe42e('0xd8')]){var _0xcb8236=0x0;_0x407c3d(this)['on'](_0xe42e('0xd9'),function(){var _0x8f1c6f=function(){window[_0xe42e('0x5d')]['allowUpdate']&&(_0x27789a[_0xe42e('0x95')](),window[_0xe42e('0x5d')][_0xe42e('0xb9')]=!0x1,_0x407c3d['fn'][_0xe42e('0x2b')](!0x0),_0x27789a['cartIsEmpty']());};_0xcb8236=setInterval(function(){_0x8f1c6f();},0x258);_0x8f1c6f();});_0x407c3d(this)['on']('mouseleave.qd_ddc_hover',function(){clearInterval(_0xcb8236);});}};var _0x30580d=function(_0x4b2a31){_0x4b2a31=_0x407c3d(_0x4b2a31);_0x3e0a18[_0xe42e('0xda')][_0xe42e('0x57')]=_0x3e0a18['texts'][_0xe42e('0x57')]['replace']('#value',_0xe42e('0xdb'));_0x3e0a18[_0xe42e('0xda')][_0xe42e('0x57')]=_0x3e0a18[_0xe42e('0xda')][_0xe42e('0x57')]['replace']('#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>');_0x3e0a18[_0xe42e('0xda')][_0xe42e('0x57')]=_0x3e0a18[_0xe42e('0xda')][_0xe42e('0x57')][_0xe42e('0x2')]('#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>');_0x3e0a18['texts'][_0xe42e('0x57')]=_0x3e0a18[_0xe42e('0xda')]['cartTotal']['replace']('#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0x4b2a31[_0xe42e('0x56')](_0xe42e('0xdc'))[_0xe42e('0x53')](_0x3e0a18['texts'][_0xe42e('0xdd')]);_0x4b2a31['find']('.qd_ddc_continueShopping')[_0xe42e('0x53')](_0x3e0a18[_0xe42e('0xda')][_0xe42e('0xde')]);_0x4b2a31['find']('.qd-ddc-checkout')[_0xe42e('0x53')](_0x3e0a18[_0xe42e('0xda')][_0xe42e('0xdf')]);_0x4b2a31['find'](_0xe42e('0xe0'))[_0xe42e('0x53')](_0x3e0a18[_0xe42e('0xda')][_0xe42e('0x57')]);_0x4b2a31['find'](_0xe42e('0xe1'))[_0xe42e('0x53')](_0x3e0a18[_0xe42e('0xda')][_0xe42e('0xe2')]);_0x4b2a31['find']('.qd-ddc-emptyCart\x20p')[_0xe42e('0x53')](_0x3e0a18[_0xe42e('0xda')]['emptyCart']);return _0x4b2a31;}(this[_0xe42e('0xca')]);var _0x5c9eaf=0x0;_0x23872d['each'](function(){0x0<_0x5c9eaf?_0x5d6d82[_0xe42e('0x2e')](this,_0x30580d[_0xe42e('0xe3')]()):_0x5d6d82[_0xe42e('0x2e')](this,_0x30580d);_0x5c9eaf++;});window[_0xe42e('0x3d')][_0xe42e('0x48')][_0xe42e('0x37')](function(){_0x407c3d(_0xe42e('0xe4'))['html'](window[_0xe42e('0x3d')][_0xe42e('0x41')]||'--');_0x407c3d(_0xe42e('0xe5'))[_0xe42e('0x53')](window[_0xe42e('0x3d')]['qtt']||'0');_0x407c3d('.qd-ddc-infoTotalShipping')[_0xe42e('0x53')](window['_QuatroDigital_CartData'][_0xe42e('0xe6')]||'--');_0x407c3d(_0xe42e('0xe7'))[_0xe42e('0x53')](window[_0xe42e('0x3d')][_0xe42e('0x43')]||'--');});var _0x4d2131=function(_0xd93372,_0x820cf5){if(_0xe42e('0x4')===typeof _0xd93372[_0xe42e('0x46')])return _0x25b3e6(_0xe42e('0xe8'));_0x27789a[_0xe42e('0xe9')][_0xe42e('0x2e')](this,_0x820cf5);};_0x27789a[_0xe42e('0x95')]=function(_0x3f6c60,_0x3ff38d){'undefined'!=typeof _0x3ff38d?window[_0xe42e('0x5d')][_0xe42e('0xea')]=_0x3ff38d:window[_0xe42e('0x5d')][_0xe42e('0xea')]&&(_0x3ff38d=window[_0xe42e('0x5d')][_0xe42e('0xea')]);setTimeout(function(){window['_QuatroDigital_DropDown'][_0xe42e('0xea')]=void 0x0;},_0x3e0a18[_0xe42e('0xeb')]);_0x407c3d('.qd-ddc-wrapper')[_0xe42e('0x4f')](_0xe42e('0xec'));if(_0x3e0a18['smartCheckout']){var _0xcb8236=function(_0xbec568){window[_0xe42e('0x5d')]['getOrderForm']=_0xbec568;_0x4d2131(_0xbec568,_0x3ff38d);'undefined'!==typeof window[_0xe42e('0xed')]&&_0xe42e('0xb')===typeof window[_0xe42e('0xed')][_0xe42e('0xee')]&&window[_0xe42e('0xed')][_0xe42e('0xee')]['call'](this);_0x407c3d(_0xe42e('0xef'))['addClass'](_0xe42e('0xec'));};'undefined'!==typeof window[_0xe42e('0x5d')][_0xe42e('0x2d')]?(_0xcb8236(window['_QuatroDigital_DropDown']['getOrderForm']),_0xe42e('0xb')===typeof _0x3f6c60&&_0x3f6c60(window['_QuatroDigital_DropDown']['getOrderForm'])):_0x407c3d[_0xe42e('0x60')]([_0xe42e('0x46'),_0xe42e('0x3e'),_0xe42e('0x61')],{'done':function(_0x4ef2eb){_0xcb8236[_0xe42e('0x2e')](this,_0x4ef2eb);_0xe42e('0xb')===typeof _0x3f6c60&&_0x3f6c60(_0x4ef2eb);},'fail':function(_0x37894a){_0x25b3e6(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0x37894a]);}});}else alert(_0xe42e('0xf0'));};_0x27789a[_0xe42e('0xf1')]=function(){var _0x17905d=_0x407c3d('.qd-ddc-wrapper');_0x17905d['find']('.qd-ddc-prodRow')[_0xe42e('0x9')]?_0x17905d[_0xe42e('0x4f')](_0xe42e('0xf2')):_0x17905d[_0xe42e('0x4e')](_0xe42e('0xf2'));};_0x27789a[_0xe42e('0xe9')]=function(_0x2ad069){var _0xcb8236=_0x407c3d('.qd-ddc-prodWrapper2');_0xcb8236[_0xe42e('0xf3')]();_0xcb8236[_0xe42e('0x3b')](function(){var _0xcb8236=_0x407c3d(this),_0x228ee7,_0x4af7ef,_0x31d099=_0x407c3d(''),_0xbc8c9c;for(_0xbc8c9c in window['_QuatroDigital_DropDown'][_0xe42e('0x2d')][_0xe42e('0x46')])if(_0xe42e('0x1a')===typeof window[_0xe42e('0x5d')][_0xe42e('0x2d')][_0xe42e('0x46')][_0xbc8c9c]){var _0x3202d0=window['_QuatroDigital_DropDown'][_0xe42e('0x2d')][_0xe42e('0x46')][_0xbc8c9c];var _0x1f1427=_0x3202d0[_0xe42e('0xf4')][_0xe42e('0x2')](/^\/|\/$/g,'')['split']('/');var _0x99e02c=_0x407c3d(_0xe42e('0xf5'));_0x99e02c[_0xe42e('0x3a')]({'data-sku':_0x3202d0['id'],'data-sku-index':_0xbc8c9c,'data-qd-departament':_0x1f1427[0x0],'data-qd-category':_0x1f1427[_0x1f1427['length']-0x1]});_0x99e02c[_0xe42e('0x4e')](_0xe42e('0xf6')+_0x3202d0[_0xe42e('0xf7')]);_0x99e02c[_0xe42e('0x56')](_0xe42e('0xf8'))[_0xe42e('0x88')](_0x3e0a18[_0xe42e('0xc3')](_0x3202d0));_0x99e02c[_0xe42e('0x56')](_0xe42e('0xf9'))['append'](isNaN(_0x3202d0['sellingPrice'])?_0x3202d0[_0xe42e('0xfa')]:0x0==_0x3202d0[_0xe42e('0xfa')]?_0xe42e('0xfb'):(_0x407c3d('meta[name=currency]')[_0xe42e('0x3a')](_0xe42e('0xfc'))||'R$')+'\x20'+qd_number_format(_0x3202d0[_0xe42e('0xfa')]/0x64,0x2,',','.'));_0x99e02c[_0xe42e('0x56')](_0xe42e('0xfd'))['attr']({'data-sku':_0x3202d0['id'],'data-sku-index':_0xbc8c9c})[_0xe42e('0xd7')](_0x3202d0['quantity']);_0x99e02c[_0xe42e('0x56')]('.qd-ddc-remove')[_0xe42e('0x3a')]({'data-sku':_0x3202d0['id'],'data-sku-index':_0xbc8c9c});_0x27789a[_0xe42e('0xfe')](_0x3202d0['id'],_0x99e02c[_0xe42e('0x56')](_0xe42e('0xff')),_0x3202d0[_0xe42e('0x100')]);_0x99e02c[_0xe42e('0x56')]('.qd-ddc-quantityMore,.qd-ddc-quantityMinus')[_0xe42e('0x3a')]({'data-sku':_0x3202d0['id'],'data-sku-index':_0xbc8c9c});_0x99e02c[_0xe42e('0x101')](_0xcb8236);_0x31d099=_0x31d099[_0xe42e('0x37')](_0x99e02c);}try{var _0x536960=_0xcb8236[_0xe42e('0x0')](_0xe42e('0xef'))['find'](_0xe42e('0xd6'));_0x536960[_0xe42e('0x9')]&&''==_0x536960[_0xe42e('0xd7')]()&&window[_0xe42e('0x5d')]['getOrderForm']['shippingData']['address']&&_0x536960[_0xe42e('0xd7')](window[_0xe42e('0x5d')]['getOrderForm'][_0xe42e('0x61')][_0xe42e('0x102')][_0xe42e('0x103')]);}catch(_0x5ad0d7){_0x25b3e6(_0xe42e('0x104')+_0x5ad0d7[_0xe42e('0x29')],_0xe42e('0x70'));}_0x27789a[_0xe42e('0x105')](_0xcb8236);_0x27789a['cartIsEmpty']();_0x2ad069&&_0x2ad069['lastSku']&&function(){_0x4af7ef=_0x31d099[_0xe42e('0x4c')]('[data-sku=\x27'+_0x2ad069[_0xe42e('0x106')]+'\x27]');_0x4af7ef['length']&&(_0x228ee7=0x0,_0x31d099[_0xe42e('0x3b')](function(){var _0x2ad069=_0x407c3d(this);if(_0x2ad069['is'](_0x4af7ef))return!0x1;_0x228ee7+=_0x2ad069[_0xe42e('0x107')]();}),_0x27789a[_0xe42e('0xd3')](void 0x0,void 0x0,_0x228ee7,_0xcb8236['add'](_0xcb8236['parent']())),_0x31d099['removeClass']('qd-ddc-lastAddedFixed'),function(_0x95543d){_0x95543d[_0xe42e('0x4e')](_0xe42e('0x108'));_0x95543d[_0xe42e('0x4e')](_0xe42e('0x109'));setTimeout(function(){_0x95543d['removeClass'](_0xe42e('0x108'));},_0x3e0a18['timeRemoveNewItemClass']);}(_0x4af7ef));}();});(function(){_QuatroDigital_DropDown[_0xe42e('0x2d')][_0xe42e('0x46')]['length']?(_0x407c3d(_0xe42e('0x75'))['removeClass'](_0xe42e('0x10a'))[_0xe42e('0x4e')](_0xe42e('0x10b')),setTimeout(function(){_0x407c3d('body')[_0xe42e('0x4f')](_0xe42e('0x10c'));},_0x3e0a18[_0xe42e('0xeb')])):_0x407c3d(_0xe42e('0x75'))[_0xe42e('0x4f')](_0xe42e('0x10d'))[_0xe42e('0x4e')](_0xe42e('0x10a'));}());'function'===typeof _0x3e0a18['callbackProductsList']?_0x3e0a18[_0xe42e('0x10e')][_0xe42e('0x2e')](this):_0x25b3e6(_0xe42e('0x10f'));};_0x27789a[_0xe42e('0xfe')]=function(_0x339fa7,_0x2c7627,_0x5062fe){function _0x3ea1f8(){_0x2c7627['removeClass'](_0xe42e('0x110'))[_0xe42e('0x111')](function(){_0x407c3d(this)[_0xe42e('0x4e')]('qd-loaded');})[_0xe42e('0x3a')](_0xe42e('0x112'),_0x5062fe);}_0x5062fe?_0x3ea1f8():isNaN(_0x339fa7)?_0x25b3e6(_0xe42e('0x113'),_0xe42e('0x31')):alert(_0xe42e('0x114'));};_0x27789a[_0xe42e('0x105')]=function(_0x25eb53){var _0x18323b=function(_0x5baaa2,_0x4c8cac){var _0xcb8236=_0x407c3d(_0x5baaa2);var _0x46c150=_0xcb8236[_0xe42e('0x3a')](_0xe42e('0x115'));var _0x228ee7=_0xcb8236[_0xe42e('0x3a')](_0xe42e('0x116'));if(_0x46c150){var _0x4f9bb0=parseInt(_0xcb8236[_0xe42e('0xd7')]())||0x1;_0x27789a[_0xe42e('0x117')]([_0x46c150,_0x228ee7],_0x4f9bb0,_0x4f9bb0+0x1,function(_0xfed306){_0xcb8236[_0xe42e('0xd7')](_0xfed306);'function'===typeof _0x4c8cac&&_0x4c8cac();});}};var _0xcb8236=function(_0x392bce,_0x595854){var _0xcb8236=_0x407c3d(_0x392bce);var _0x41c2f0=_0xcb8236[_0xe42e('0x3a')](_0xe42e('0x115'));var _0x228ee7=_0xcb8236[_0xe42e('0x3a')]('data-sku-index');if(_0x41c2f0){var _0x44484e=parseInt(_0xcb8236[_0xe42e('0xd7')]())||0x2;_0x27789a[_0xe42e('0x117')]([_0x41c2f0,_0x228ee7],_0x44484e,_0x44484e-0x1,function(_0x5032b3){_0xcb8236['val'](_0x5032b3);_0xe42e('0xb')===typeof _0x595854&&_0x595854();});}};var _0x3de45d=function(_0x593f84,_0x3c9b8d){var _0xcb8236=_0x407c3d(_0x593f84);var _0x211017=_0xcb8236[_0xe42e('0x3a')](_0xe42e('0x115'));var _0x228ee7=_0xcb8236[_0xe42e('0x3a')](_0xe42e('0x116'));if(_0x211017){var _0x4f012b=parseInt(_0xcb8236[_0xe42e('0xd7')]())||0x1;_0x27789a[_0xe42e('0x117')]([_0x211017,_0x228ee7],0x1,_0x4f012b,function(_0x4bc30a){_0xcb8236[_0xe42e('0xd7')](_0x4bc30a);_0xe42e('0xb')===typeof _0x3c9b8d&&_0x3c9b8d();});}};var _0x228ee7=_0x25eb53[_0xe42e('0x56')](_0xe42e('0x118'));_0x228ee7[_0xe42e('0x4e')](_0xe42e('0x119'))['each'](function(){var _0x25eb53=_0x407c3d(this);_0x25eb53[_0xe42e('0x56')](_0xe42e('0x11a'))['on'](_0xe42e('0x11b'),function(_0x368a0c){_0x368a0c[_0xe42e('0x11c')]();_0x228ee7[_0xe42e('0x4e')](_0xe42e('0x11d'));_0x18323b(_0x25eb53[_0xe42e('0x56')](_0xe42e('0xfd')),function(){_0x228ee7[_0xe42e('0x4f')](_0xe42e('0x11d'));});});_0x25eb53['find'](_0xe42e('0x11e'))['on'](_0xe42e('0x11f'),function(_0x57ff69){_0x57ff69[_0xe42e('0x11c')]();_0x228ee7[_0xe42e('0x4e')](_0xe42e('0x11d'));_0xcb8236(_0x25eb53[_0xe42e('0x56')](_0xe42e('0xfd')),function(){_0x228ee7[_0xe42e('0x4f')](_0xe42e('0x11d'));});});_0x25eb53[_0xe42e('0x56')](_0xe42e('0xfd'))['on']('focusout.qd_ddc_change',function(){_0x228ee7[_0xe42e('0x4e')]('qd-loading');_0x3de45d(this,function(){_0x228ee7[_0xe42e('0x4f')](_0xe42e('0x11d'));});});_0x25eb53[_0xe42e('0x56')](_0xe42e('0xfd'))['on']('keyup.qd_ddc_change',function(_0x126c18){0xd==_0x126c18[_0xe42e('0xcf')]&&(_0x228ee7[_0xe42e('0x4e')](_0xe42e('0x11d')),_0x3de45d(this,function(){_0x228ee7[_0xe42e('0x4f')](_0xe42e('0x11d'));}));});});_0x25eb53[_0xe42e('0x56')](_0xe42e('0x120'))[_0xe42e('0x3b')](function(){var _0x25eb53=_0x407c3d(this);_0x25eb53[_0xe42e('0x56')]('.qd-ddc-remove')['on'](_0xe42e('0x121'),function(){_0x25eb53[_0xe42e('0x4e')](_0xe42e('0x11d'));_0x27789a[_0xe42e('0x122')](_0x407c3d(this),function(_0xbcd3ed){_0xbcd3ed?_0x25eb53[_0xe42e('0x123')](!0x0)[_0xe42e('0x124')](function(){_0x25eb53['remove']();_0x27789a[_0xe42e('0xf1')]();}):_0x25eb53[_0xe42e('0x4f')](_0xe42e('0x11d'));});return!0x1;});});};_0x27789a[_0xe42e('0x125')]=function(_0x554e92){var _0x26b844=_0x554e92[_0xe42e('0xd7')](),_0x26b844=_0x26b844[_0xe42e('0x2')](/[^0-9\-]/g,''),_0x26b844=_0x26b844[_0xe42e('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0xe42e('0x126')),_0x26b844=_0x26b844[_0xe42e('0x2')](/(.{9}).*/g,'$1');_0x554e92[_0xe42e('0xd7')](_0x26b844);0x9<=_0x26b844[_0xe42e('0x9')]&&(_0x554e92['data'](_0xe42e('0x127'))!=_0x26b844&&_0x2bddbe[_0xe42e('0x128')]({'postalCode':_0x26b844,'country':'BRA'})[_0xe42e('0x22')](function(_0x25f33c){window[_0xe42e('0x5d')][_0xe42e('0x2d')]=_0x25f33c;_0x27789a['getCartInfoByUrl']();})[_0xe42e('0x24')](function(_0x4c4159){_0x25b3e6(['Não\x20foi\x20possível\x20calcular\x20o\x20frete',_0x4c4159]);updateCartData();}),_0x554e92[_0xe42e('0x1b')](_0xe42e('0x127'),_0x26b844));};_0x27789a[_0xe42e('0x117')]=function(_0x3b7303,_0x445989,_0x45c5f0,_0x47a460){function _0x36394f(_0x350f4f){_0x350f4f=_0xe42e('0x129')!==typeof _0x350f4f?!0x1:_0x350f4f;_0x27789a[_0xe42e('0x95')]();window[_0xe42e('0x5d')][_0xe42e('0xb9')]=!0x1;_0x27789a['cartIsEmpty']();_0xe42e('0x4')!==typeof window[_0xe42e('0xed')]&&_0xe42e('0xb')===typeof window['_QuatroDigital_AmountProduct']['exec']&&window[_0xe42e('0xed')][_0xe42e('0xee')]['call'](this);_0xe42e('0xb')===typeof adminCart&&adminCart();_0x407c3d['fn'][_0xe42e('0x2b')](!0x0,void 0x0,_0x350f4f);_0xe42e('0xb')===typeof _0x47a460&&_0x47a460(_0x445989);}_0x45c5f0=_0x45c5f0||0x1;if(0x1>_0x45c5f0)return _0x445989;if(_0x3e0a18[_0xe42e('0x5c')]){if(_0xe42e('0x4')===typeof window[_0xe42e('0x5d')][_0xe42e('0x2d')][_0xe42e('0x46')][_0x3b7303[0x1]])return _0x25b3e6(_0xe42e('0x12a')+_0x3b7303[0x1]+']'),_0x445989;window['_QuatroDigital_DropDown'][_0xe42e('0x2d')][_0xe42e('0x46')][_0x3b7303[0x1]]['quantity']=_0x45c5f0;window[_0xe42e('0x5d')][_0xe42e('0x2d')][_0xe42e('0x46')][_0x3b7303[0x1]]['index']=_0x3b7303[0x1];_0x2bddbe[_0xe42e('0x12b')]([window['_QuatroDigital_DropDown']['getOrderForm']['items'][_0x3b7303[0x1]]],[_0xe42e('0x46'),'totalizers','shippingData'])[_0xe42e('0x22')](function(_0xfd0e2d){window[_0xe42e('0x5d')][_0xe42e('0x2d')]=_0xfd0e2d;_0x36394f(!0x0);})[_0xe42e('0x24')](function(_0x12fb76){_0x25b3e6([_0xe42e('0x12c'),_0x12fb76]);_0x36394f();});}else _0x25b3e6(_0xe42e('0x12d'));};_0x27789a[_0xe42e('0x122')]=function(_0xb06029,_0x1cf3b9){function _0x57d1dc(_0x36b649){_0x36b649='boolean'!==typeof _0x36b649?!0x1:_0x36b649;_0xe42e('0x4')!==typeof window['_QuatroDigital_AmountProduct']&&_0xe42e('0xb')===typeof window[_0xe42e('0xed')]['exec']&&window[_0xe42e('0xed')][_0xe42e('0xee')]['call'](this);'function'===typeof adminCart&&adminCart();_0x407c3d['fn'][_0xe42e('0x2b')](!0x0,void 0x0,_0x36b649);_0xe42e('0xb')===typeof _0x1cf3b9&&_0x1cf3b9(_0x228ee7);}var _0x228ee7=!0x1,_0x298037=_0x407c3d(_0xb06029)['attr'](_0xe42e('0x116'));if(_0x3e0a18['smartCheckout']){if(_0xe42e('0x4')===typeof window[_0xe42e('0x5d')]['getOrderForm']['items'][_0x298037])return _0x25b3e6(_0xe42e('0x12a')+_0x298037+']'),_0x228ee7;window['_QuatroDigital_DropDown'][_0xe42e('0x2d')][_0xe42e('0x46')][_0x298037][_0xe42e('0x12e')]=_0x298037;_0x2bddbe[_0xe42e('0x12f')]([window['_QuatroDigital_DropDown'][_0xe42e('0x2d')][_0xe42e('0x46')][_0x298037]],[_0xe42e('0x46'),_0xe42e('0x3e'),_0xe42e('0x61')])['done'](function(_0x4dc9bc){_0x228ee7=!0x0;window[_0xe42e('0x5d')][_0xe42e('0x2d')]=_0x4dc9bc;_0x4d2131(_0x4dc9bc);_0x57d1dc(!0x0);})[_0xe42e('0x24')](function(_0x47e2cd){_0x25b3e6([_0xe42e('0x130'),_0x47e2cd]);_0x57d1dc();});}else alert(_0xe42e('0x131'));};_0x27789a[_0xe42e('0xd3')]=function(_0xfc09a1,_0x5af730,_0xc94d66,_0x3b0d7b){_0x3b0d7b=_0x3b0d7b||_0x407c3d(_0xe42e('0x132'));_0xfc09a1=_0xfc09a1||'+';_0x5af730=_0x5af730||0.9*_0x3b0d7b[_0xe42e('0x133')]();_0x3b0d7b[_0xe42e('0x123')](!0x0,!0x0)[_0xe42e('0x134')]({'scrollTop':isNaN(_0xc94d66)?_0xfc09a1+'='+_0x5af730+'px':_0xc94d66});};_0x3e0a18[_0xe42e('0xd8')]||(_0x27789a[_0xe42e('0x95')](),_0x407c3d['fn'][_0xe42e('0x2b')](!0x0));_0x407c3d(window)['on']('productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex',function(){try{window[_0xe42e('0x5d')][_0xe42e('0x2d')]=void 0x0,_0x27789a[_0xe42e('0x95')]();}catch(_0x3e753e){_0x25b3e6('Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20'+_0x3e753e[_0xe42e('0x29')],_0xe42e('0x135'));}});_0xe42e('0xb')===typeof _0x3e0a18['callback']?_0x3e0a18[_0xe42e('0x48')][_0xe42e('0x2e')](this):_0x25b3e6('Callback\x20não\x20é\x20uma\x20função');};_0x407c3d['fn'][_0xe42e('0xba')]=function(_0x23fe57){var _0x3acbd6=_0x407c3d(this);_0x3acbd6['fn']=new _0x407c3d[(_0xe42e('0xba'))](this,_0x23fe57);return _0x3acbd6;};}catch(_0x3f3ec4){'undefined'!==typeof console&&_0xe42e('0xb')===typeof console['error']&&console[_0xe42e('0x17')]('Oooops!\x20',_0x3f3ec4);}}(this));(function(_0x153d74){try{var _0x2adcf4=jQuery;window['_QuatroDigital_AmountProduct']=window[_0xe42e('0xed')]||{};window[_0xe42e('0xed')][_0xe42e('0x46')]={};window[_0xe42e('0xed')][_0xe42e('0x136')]=!0x1;window['_QuatroDigital_AmountProduct'][_0xe42e('0x137')]=!0x1;window[_0xe42e('0xed')][_0xe42e('0x138')]=!0x1;var _0x34d17b=function(){if(window[_0xe42e('0xed')][_0xe42e('0x136')]){var _0x2557f4=!0x1;var _0x153d74={};window[_0xe42e('0xed')][_0xe42e('0x46')]={};for(_0x5561de in window['_QuatroDigital_DropDown']['getOrderForm']['items'])if(_0xe42e('0x1a')===typeof window[_0xe42e('0x5d')][_0xe42e('0x2d')]['items'][_0x5561de]){var _0x2a8975=window[_0xe42e('0x5d')]['getOrderForm'][_0xe42e('0x46')][_0x5561de];'undefined'!==typeof _0x2a8975['productId']&&null!==_0x2a8975['productId']&&''!==_0x2a8975['productId']&&(window['_QuatroDigital_AmountProduct'][_0xe42e('0x46')][_0xe42e('0x139')+_0x2a8975[_0xe42e('0x13a')]]=window[_0xe42e('0xed')]['items']['prod_'+_0x2a8975[_0xe42e('0x13a')]]||{},window[_0xe42e('0xed')]['items'][_0xe42e('0x139')+_0x2a8975[_0xe42e('0x13a')]][_0xe42e('0x13b')]=_0x2a8975[_0xe42e('0x13a')],_0x153d74[_0xe42e('0x139')+_0x2a8975[_0xe42e('0x13a')]]||(window['_QuatroDigital_AmountProduct'][_0xe42e('0x46')]['prod_'+_0x2a8975[_0xe42e('0x13a')]]['qtt']=0x0),window[_0xe42e('0xed')]['items'][_0xe42e('0x139')+_0x2a8975['productId']][_0xe42e('0x44')]+=_0x2a8975[_0xe42e('0x47')],_0x2557f4=!0x0,_0x153d74[_0xe42e('0x139')+_0x2a8975[_0xe42e('0x13a')]]=!0x0);}var _0x5561de=_0x2557f4;}else _0x5561de=void 0x0;window[_0xe42e('0xed')][_0xe42e('0x136')]&&(_0x2adcf4(_0xe42e('0x13c'))['remove'](),_0x2adcf4(_0xe42e('0x13d'))[_0xe42e('0x4f')](_0xe42e('0x13e')));for(var _0x214c29 in window['_QuatroDigital_AmountProduct'][_0xe42e('0x46')]){_0x2a8975=window[_0xe42e('0xed')][_0xe42e('0x46')][_0x214c29];if('object'!==typeof _0x2a8975)return;_0x153d74=_0x2adcf4(_0xe42e('0x13f')+_0x2a8975[_0xe42e('0x13b')]+']')[_0xe42e('0x0')]('li');if(window[_0xe42e('0xed')][_0xe42e('0x136')]||!_0x153d74[_0xe42e('0x56')]('.qd-bap-wrapper')[_0xe42e('0x9')])_0x2557f4=_0x2adcf4('<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>'),_0x2557f4[_0xe42e('0x56')](_0xe42e('0x140'))[_0xe42e('0x53')](_0x2a8975[_0xe42e('0x44')]),_0x2a8975=_0x153d74[_0xe42e('0x56')](_0xe42e('0x141')),_0x2a8975[_0xe42e('0x9')]?_0x2a8975[_0xe42e('0xb2')](_0x2557f4)[_0xe42e('0x4e')](_0xe42e('0x13e')):_0x153d74['prepend'](_0x2557f4);}_0x5561de&&(window[_0xe42e('0xed')][_0xe42e('0x136')]=!0x1);};window[_0xe42e('0xed')][_0xe42e('0xee')]=function(){window[_0xe42e('0xed')][_0xe42e('0x136')]=!0x0;_0x34d17b[_0xe42e('0x2e')](this);};_0x2adcf4(document)[_0xe42e('0xb7')](function(){_0x34d17b[_0xe42e('0x2e')](this);});}catch(_0x4e72d4){_0xe42e('0x4')!==typeof console&&_0xe42e('0xb')===typeof console[_0xe42e('0x17')]&&console['error'](_0xe42e('0x6a'),_0x4e72d4);}}(this));(function(){try{var _0x4cb1f8=jQuery,_0x1e52a3,_0x18a242={'selector':_0xe42e('0x142'),'dropDown':{},'buyButton':{}};_0x4cb1f8[_0xe42e('0x143')]=function(_0x115fb9){var _0x1ac704={};_0x1e52a3=_0x4cb1f8[_0xe42e('0x18')](!0x0,{},_0x18a242,_0x115fb9);_0x115fb9=_0x4cb1f8(_0x1e52a3[_0xe42e('0x8d')])[_0xe42e('0xba')](_0x1e52a3[_0xe42e('0x144')]);_0x1ac704['buyButton']='undefined'!==typeof _0x1e52a3[_0xe42e('0x144')]['updateOnlyHover']&&!0x1===_0x1e52a3[_0xe42e('0x144')][_0xe42e('0xd8')]?_0x4cb1f8(_0x1e52a3['selector'])[_0xe42e('0x7b')](_0x115fb9['fn'],_0x1e52a3[_0xe42e('0x81')]):_0x4cb1f8(_0x1e52a3[_0xe42e('0x8d')])[_0xe42e('0x7b')](_0x1e52a3['buyButton']);_0x1ac704[_0xe42e('0x144')]=_0x115fb9;return _0x1ac704;};_0x4cb1f8['fn']['smartCart']=function(){'object'===typeof console&&_0xe42e('0xb')===typeof console['info']&&console[_0xe42e('0x34')]('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x4cb1f8[_0xe42e('0x145')]=_0x4cb1f8['fn']['smartCart'];}catch(_0x172194){_0xe42e('0x4')!==typeof console&&_0xe42e('0xb')===typeof console[_0xe42e('0x17')]&&console[_0xe42e('0x17')](_0xe42e('0x6a'),_0x172194);}}());

/* Quatro Digital - Smart Stock Available */
var _0xb3b8=['each','find','[data-qd-ssa-text]','qd-ssa-show','[data-qd-ssa-text=\x22','filter','[data-qd-ssa-text=\x22default\x22]','qd-ssa-hide','html','replace','#qtt','fromCharCode','charCodeAt','join','toUpperCase','ite','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','/produto/sku/','qdPlugin','initialSkuSelected','trigger','prod','sku','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','unavailable','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','length','available','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','function','qdAjax','extend','url','opts','success','error','call','parameters','callbackFns','boolean','successPopulated','errorPopulated','completePopulated','object','complete','clearQueueDelay','jqXHR','readyState','textStatus','errorThrown','2.1','QD_smartStockAvailable','unshift','undefined','toLowerCase','aviso','info','apply','warn','addClass','qd-ssa-sku-no-selected','skus','split','message','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','off','vtex.sku.selected.QD','hide','removeClass','qd-ssa-sku-selected','SkuSellersInformation','AvailableQuantity','attr'];(function(_0x2a67fe,_0x295c09){var _0x57e726=function(_0x280573){while(--_0x280573){_0x2a67fe['push'](_0x2a67fe['shift']());}};_0x57e726(++_0x295c09);}(_0xb3b8,0x108));var _0x8b3b=function(_0x39e84d,_0x11931d){_0x39e84d=_0x39e84d-0x0;var _0x1991bc=_0xb3b8[_0x39e84d];return _0x1991bc;};(function(_0x27d1ef){if(_0x8b3b('0x0')!==typeof _0x27d1ef[_0x8b3b('0x1')]){var _0x5effe9={};_0x27d1ef['qdAjaxQueue']=_0x5effe9;_0x27d1ef['qdAjax']=function(_0x46b6ee){var _0x42b47b,_0x5dc242;_0x42b47b=_0x27d1ef[_0x8b3b('0x2')]({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x46b6ee);_0x5dc242=escape(encodeURIComponent(_0x42b47b[_0x8b3b('0x3')]));_0x5effe9[_0x5dc242]=_0x5effe9[_0x5dc242]||{};_0x5effe9[_0x5dc242][_0x8b3b('0x4')]=_0x5effe9[_0x5dc242][_0x8b3b('0x4')]||[];_0x5effe9[_0x5dc242][_0x8b3b('0x4')]['push']({'success':function(_0x309c41,_0x10f5b9,_0x2d949d){_0x42b47b[_0x8b3b('0x5')]['call'](this,_0x309c41,_0x10f5b9,_0x2d949d);},'error':function(_0x35fc40,_0x569ab7,_0x31200f){_0x42b47b[_0x8b3b('0x6')][_0x8b3b('0x7')](this,_0x35fc40,_0x569ab7,_0x31200f);},'complete':function(_0x9ba7dc,_0x17d4ad){_0x42b47b['complete'][_0x8b3b('0x7')](this,_0x9ba7dc,_0x17d4ad);}});_0x5effe9[_0x5dc242][_0x8b3b('0x8')]=_0x5effe9[_0x5dc242]['parameters']||{'success':{},'error':{},'complete':{}};_0x5effe9[_0x5dc242][_0x8b3b('0x9')]=_0x5effe9[_0x5dc242][_0x8b3b('0x9')]||{};_0x5effe9[_0x5dc242]['callbackFns']['successPopulated']=_0x8b3b('0xa')===typeof _0x5effe9[_0x5dc242][_0x8b3b('0x9')]['successPopulated']?_0x5effe9[_0x5dc242]['callbackFns'][_0x8b3b('0xb')]:!0x1;_0x5effe9[_0x5dc242][_0x8b3b('0x9')][_0x8b3b('0xc')]='boolean'===typeof _0x5effe9[_0x5dc242][_0x8b3b('0x9')][_0x8b3b('0xc')]?_0x5effe9[_0x5dc242][_0x8b3b('0x9')][_0x8b3b('0xc')]:!0x1;_0x5effe9[_0x5dc242][_0x8b3b('0x9')][_0x8b3b('0xd')]=_0x8b3b('0xa')===typeof _0x5effe9[_0x5dc242][_0x8b3b('0x9')][_0x8b3b('0xd')]?_0x5effe9[_0x5dc242][_0x8b3b('0x9')][_0x8b3b('0xd')]:!0x1;_0x46b6ee=_0x27d1ef[_0x8b3b('0x2')]({},_0x42b47b,{'success':function(_0x281b12,_0x55b550,_0xa8df73){_0x5effe9[_0x5dc242][_0x8b3b('0x8')][_0x8b3b('0x5')]={'data':_0x281b12,'textStatus':_0x55b550,'jqXHR':_0xa8df73};_0x5effe9[_0x5dc242][_0x8b3b('0x9')][_0x8b3b('0xb')]=!0x0;for(var _0x27d1ef in _0x5effe9[_0x5dc242]['opts'])_0x8b3b('0xe')===typeof _0x5effe9[_0x5dc242][_0x8b3b('0x4')][_0x27d1ef]&&(_0x5effe9[_0x5dc242]['opts'][_0x27d1ef][_0x8b3b('0x5')][_0x8b3b('0x7')](this,_0x281b12,_0x55b550,_0xa8df73),_0x5effe9[_0x5dc242]['opts'][_0x27d1ef][_0x8b3b('0x5')]=function(){});},'error':function(_0x1a5d96,_0x41b9e1,_0x178579){_0x5effe9[_0x5dc242]['parameters'][_0x8b3b('0x6')]={'errorThrown':_0x178579,'textStatus':_0x41b9e1,'jqXHR':_0x1a5d96};_0x5effe9[_0x5dc242][_0x8b3b('0x9')]['errorPopulated']=!0x0;for(var _0x46b6ee in _0x5effe9[_0x5dc242]['opts'])'object'===typeof _0x5effe9[_0x5dc242][_0x8b3b('0x4')][_0x46b6ee]&&(_0x5effe9[_0x5dc242][_0x8b3b('0x4')][_0x46b6ee][_0x8b3b('0x6')][_0x8b3b('0x7')](this,_0x1a5d96,_0x41b9e1,_0x178579),_0x5effe9[_0x5dc242]['opts'][_0x46b6ee]['error']=function(){});},'complete':function(_0x3ad71e,_0x51f099){_0x5effe9[_0x5dc242][_0x8b3b('0x8')][_0x8b3b('0xf')]={'textStatus':_0x51f099,'jqXHR':_0x3ad71e};_0x5effe9[_0x5dc242][_0x8b3b('0x9')]['completePopulated']=!0x0;for(var _0x3537f7 in _0x5effe9[_0x5dc242][_0x8b3b('0x4')])_0x8b3b('0xe')===typeof _0x5effe9[_0x5dc242]['opts'][_0x3537f7]&&(_0x5effe9[_0x5dc242][_0x8b3b('0x4')][_0x3537f7][_0x8b3b('0xf')][_0x8b3b('0x7')](this,_0x3ad71e,_0x51f099),_0x5effe9[_0x5dc242][_0x8b3b('0x4')][_0x3537f7][_0x8b3b('0xf')]=function(){});isNaN(parseInt(_0x42b47b[_0x8b3b('0x10')]))||setTimeout(function(){_0x5effe9[_0x5dc242][_0x8b3b('0x11')]=void 0x0;_0x5effe9[_0x5dc242][_0x8b3b('0x4')]=void 0x0;_0x5effe9[_0x5dc242][_0x8b3b('0x8')]=void 0x0;_0x5effe9[_0x5dc242][_0x8b3b('0x9')]=void 0x0;},_0x42b47b[_0x8b3b('0x10')]);}});'undefined'===typeof _0x5effe9[_0x5dc242]['jqXHR']?_0x5effe9[_0x5dc242][_0x8b3b('0x11')]=_0x27d1ef['ajax'](_0x46b6ee):_0x5effe9[_0x5dc242][_0x8b3b('0x11')]&&_0x5effe9[_0x5dc242]['jqXHR']['readyState']&&0x4==_0x5effe9[_0x5dc242][_0x8b3b('0x11')][_0x8b3b('0x12')]&&(_0x5effe9[_0x5dc242][_0x8b3b('0x9')]['successPopulated']&&_0x46b6ee['success'](_0x5effe9[_0x5dc242][_0x8b3b('0x8')][_0x8b3b('0x5')]['data'],_0x5effe9[_0x5dc242][_0x8b3b('0x8')][_0x8b3b('0x5')][_0x8b3b('0x13')],_0x5effe9[_0x5dc242]['parameters']['success'][_0x8b3b('0x11')]),_0x5effe9[_0x5dc242][_0x8b3b('0x9')][_0x8b3b('0xc')]&&_0x46b6ee[_0x8b3b('0x6')](_0x5effe9[_0x5dc242][_0x8b3b('0x8')][_0x8b3b('0x6')][_0x8b3b('0x11')],_0x5effe9[_0x5dc242][_0x8b3b('0x8')][_0x8b3b('0x6')]['textStatus'],_0x5effe9[_0x5dc242][_0x8b3b('0x8')][_0x8b3b('0x6')][_0x8b3b('0x14')]),_0x5effe9[_0x5dc242]['callbackFns'][_0x8b3b('0xd')]&&_0x46b6ee[_0x8b3b('0xf')](_0x5effe9[_0x5dc242][_0x8b3b('0x8')][_0x8b3b('0xf')][_0x8b3b('0x11')],_0x5effe9[_0x5dc242][_0x8b3b('0x8')]['complete'][_0x8b3b('0x13')]));};_0x27d1ef[_0x8b3b('0x1')]['version']=_0x8b3b('0x15');}}(jQuery));(function(_0x162fc4){'use strict';var _0x1f1ada=jQuery;if(typeof _0x1f1ada['fn'][_0x8b3b('0x16')]===_0x8b3b('0x0'))return;var _0x47fbf8='Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available';var _0x1bf77c=function(_0x17e230,_0x101439){if(_0x8b3b('0xe')===typeof console){var _0x27b5ef;_0x8b3b('0xe')===typeof _0x17e230?(_0x17e230[_0x8b3b('0x17')]('['+_0x47fbf8+']\x0a'),_0x27b5ef=_0x17e230):_0x27b5ef=['['+_0x47fbf8+']\x0a'+_0x17e230];_0x8b3b('0x18')===typeof _0x101439||'alerta'!==_0x101439[_0x8b3b('0x19')]()&&_0x8b3b('0x1a')!==_0x101439[_0x8b3b('0x19')]()?_0x8b3b('0x18')!==typeof _0x101439&&_0x8b3b('0x1b')===_0x101439[_0x8b3b('0x19')]()?console['info']['apply'](console,_0x27b5ef):console[_0x8b3b('0x6')][_0x8b3b('0x1c')](console,_0x27b5ef):console[_0x8b3b('0x1d')][_0x8b3b('0x1c')](console,_0x27b5ef);}};var _0x2b0cf4={};var _0x2dece2=function(_0x27813f,_0x42e019){if(!_0x27813f['length'])return;_0x27813f[_0x8b3b('0x1e')]('qd-ssa-on');_0x27813f[_0x8b3b('0x1e')](_0x8b3b('0x1f'));try{_0x27813f[_0x8b3b('0x1e')]('qd-ssa-skus-'+vtxctx[_0x8b3b('0x20')][_0x8b3b('0x21')](';')['length']);}catch(_0x4c6ccb){_0x1bf77c(['Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20',_0x4c6ccb[_0x8b3b('0x22')]]);}_0x1f1ada(window)['on']('vtex.sku.selected\x20QuatroDigital.ssa.skuSelected',function(_0x1093b2,_0x5a39c9,_0x2fcf34){try{_0x49b4b7(_0x2fcf34['sku'],function(_0x1cc463){_0x3d238b(_0x1cc463);_0x5cd9c7(_0x1cc463);});}catch(_0x53e09c){_0x1bf77c([_0x8b3b('0x23'),_0x53e09c[_0x8b3b('0x22')]]);}});_0x1f1ada(window)[_0x8b3b('0x24')](_0x8b3b('0x25'));_0x1f1ada(window)['on']('QuatroDigital.ssa.prodUnavailable',function(){_0x27813f['addClass']('qd-ssa-sku-prod-unavailable')[_0x8b3b('0x26')]();});function _0x3d238b(_0x4ee0a8){try{_0x27813f[_0x8b3b('0x27')]('qd-ssa-sku-no-selected')[_0x8b3b('0x1e')](_0x8b3b('0x28'));var _0x40d2c7=_0x4ee0a8[0x0][_0x8b3b('0x29')][0x0][_0x8b3b('0x2a')];_0x27813f[_0x8b3b('0x2b')]('data-qd-ssa-qtt',_0x40d2c7);_0x27813f[_0x8b3b('0x2c')](function(){var _0x36f964=_0x1f1ada(this)[_0x8b3b('0x2d')](_0x8b3b('0x2e'));if(_0x40d2c7<0x1)return _0x36f964[_0x8b3b('0x26')]()['addClass']('qd-ssa-hide')['removeClass'](_0x8b3b('0x2f'));var _0x143c60=_0x36f964['filter'](_0x8b3b('0x30')+_0x40d2c7+'\x22]');var _0x5841b4=_0x143c60['length']?_0x143c60:_0x36f964[_0x8b3b('0x31')](_0x8b3b('0x32'));_0x36f964[_0x8b3b('0x26')]()['addClass'](_0x8b3b('0x33'))[_0x8b3b('0x27')](_0x8b3b('0x2f'));_0x5841b4[_0x8b3b('0x34')](_0x5841b4['html']()[_0x8b3b('0x35')](_0x8b3b('0x36'),_0x40d2c7));_0x5841b4['show']()[_0x8b3b('0x1e')](_0x8b3b('0x2f'))[_0x8b3b('0x27')]('qd-ssa-hide');});}catch(_0x5e80d2){_0x1bf77c(['Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20',_0x5e80d2[_0x8b3b('0x22')]]);}};function _0x5cd9c7(_0x511184){if(vtxctx[_0x8b3b('0x20')]['split'](';')['length']===0x1&&_0x511184[0x0][_0x8b3b('0x29')][0x0][_0x8b3b('0x2a')]==0x0)_0x1f1ada(window)['trigger']('QuatroDigital.ssa.prodUnavailable');};};var _0x33f373=function(_0x341c05){var _0x20ba47={'i':'vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x49608a){var _0x109fdc,_0x4181d8,_0x1c34cc,_0x20a0f0;_0x4181d8=function(_0x4c6e18){return _0x4c6e18;};_0x1c34cc=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x49608a=_0x49608a['d'+_0x1c34cc[0x10]+'c'+_0x1c34cc[0x11]+'m'+_0x4181d8(_0x1c34cc[0x1])+'n'+_0x1c34cc[0xd]]['l'+_0x1c34cc[0x12]+'c'+_0x1c34cc[0x0]+'ti'+_0x4181d8('o')+'n'];_0x109fdc=function(_0x1d9192){return escape(encodeURIComponent(_0x1d9192[_0x8b3b('0x35')](/\./g,'¨')[_0x8b3b('0x35')](/[a-zA-Z]/g,function(_0xf0bd32){return String[_0x8b3b('0x37')](('Z'>=_0xf0bd32?0x5a:0x7a)>=(_0xf0bd32=_0xf0bd32[_0x8b3b('0x38')](0x0)+0xd)?_0xf0bd32:_0xf0bd32-0x1a);})));};var _0x28568d=_0x109fdc(_0x49608a[[_0x1c34cc[0x9],_0x4181d8('o'),_0x1c34cc[0xc],_0x1c34cc[_0x4181d8(0xd)]][_0x8b3b('0x39')]('')]);_0x109fdc=_0x109fdc((window[['js',_0x4181d8('no'),'m',_0x1c34cc[0x1],_0x1c34cc[0x4][_0x8b3b('0x3a')](),_0x8b3b('0x3b')][_0x8b3b('0x39')]('')]||'---')+['.v',_0x1c34cc[0xd],'e',_0x4181d8('x'),'co',_0x4181d8('mm'),_0x8b3b('0x3c'),_0x1c34cc[0x1],'.c',_0x4181d8('o'),'m.',_0x1c34cc[0x13],'r']['join'](''));for(var _0x1e096f in _0x20ba47){if(_0x109fdc===_0x1e096f+_0x20ba47[_0x1e096f]||_0x28568d===_0x1e096f+_0x20ba47[_0x1e096f]){_0x20a0f0='tr'+_0x1c34cc[0x11]+'e';break;}_0x20a0f0='f'+_0x1c34cc[0x0]+'ls'+_0x4181d8(_0x1c34cc[0x1])+'';}_0x4181d8=!0x1;-0x1<_0x49608a[[_0x1c34cc[0xc],'e',_0x1c34cc[0x0],'rc',_0x1c34cc[0x9]]['join']('')][_0x8b3b('0x3d')](_0x8b3b('0x3e'))&&(_0x4181d8=!0x0);return[_0x20a0f0,_0x4181d8];}(_0x341c05);}(window);if(!eval(_0x33f373[0x0]))return _0x33f373[0x1]?_0x1bf77c('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;function _0x49b4b7(_0x47fc65,_0x289f7a){_0x1f1ada[_0x8b3b('0x1')]({'url':_0x8b3b('0x3f')+_0x47fc65,'clearQueueDelay':null,'success':_0x289f7a,'error':function(){_0x1bf77c('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!');}});};_0x1f1ada['fn'][_0x8b3b('0x16')]=function(_0x32190d){var _0x6dcbff=_0x1f1ada(this);var _0x57592b=_0x1f1ada['extend'](!![],{},_0x2b0cf4,_0x32190d);_0x6dcbff[_0x8b3b('0x40')]=new _0x2dece2(_0x6dcbff,_0x57592b);try{if(typeof _0x1f1ada['fn']['QD_smartStockAvailable'][_0x8b3b('0x41')]===_0x8b3b('0xe'))_0x1f1ada(window)[_0x8b3b('0x42')]('QuatroDigital.ssa.skuSelected',[_0x1f1ada['fn'][_0x8b3b('0x16')][_0x8b3b('0x41')][_0x8b3b('0x43')],_0x1f1ada['fn'][_0x8b3b('0x16')][_0x8b3b('0x41')][_0x8b3b('0x44')]]);}catch(_0x34d564){_0x1bf77c([_0x8b3b('0x45'),_0x34d564[_0x8b3b('0x22')]]);}if(_0x1f1ada['fn'][_0x8b3b('0x16')][_0x8b3b('0x46')])_0x1f1ada(window)['trigger']('QuatroDigital.ssa.prodUnavailable');return _0x6dcbff;};_0x1f1ada(window)['on'](_0x8b3b('0x25'),function(_0x4b0316,_0x240fe8,_0x1bd9b3){try{_0x1f1ada['fn'][_0x8b3b('0x16')]['initialSkuSelected']={'prod':_0x240fe8,'sku':_0x1bd9b3};_0x1f1ada(this)[_0x8b3b('0x24')](_0x4b0316);}catch(_0xea0ad1){_0x1bf77c([_0x8b3b('0x47'),_0xea0ad1[_0x8b3b('0x22')]]);}});_0x1f1ada(window)['on'](_0x8b3b('0x48'),function(_0x549546,_0x1eecbf,_0x243d97){try{var _0x467c4b=_0x243d97[_0x8b3b('0x49')];var _0x25e0fc=0x0;for(var _0x89f9e5=0x0;_0x89f9e5<_0x467c4b;_0x89f9e5++){if(!_0x243d97[_0x89f9e5][_0x8b3b('0x4a')])_0x25e0fc=_0x25e0fc+0x1;else break;}if(_0x467c4b<=_0x25e0fc)_0x1f1ada['fn'][_0x8b3b('0x16')][_0x8b3b('0x46')]=!![];_0x1f1ada(this)[_0x8b3b('0x24')](_0x549546);}catch(_0x46def1){_0x1bf77c([_0x8b3b('0x4b'),_0x46def1[_0x8b3b('0x22')]]);}});_0x1f1ada(function(){_0x1f1ada(_0x8b3b('0x4c'))['QD_smartStockAvailable']();});}(window));

// -include ../qd-quatro-lib-plugins/Infinity Scroll Memory/QD_infinityScrollMemory.min.js
