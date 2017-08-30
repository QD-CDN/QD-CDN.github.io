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
			Search.openFiltersMenu();
			Search.shelfLineFix();
			// Search.showSearchNavigatorFilters();
			Search.smartResearchInit();
			Search.hideExtendedMenu();
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
				$t.attr('src', $t.attr('src').replace('-60-60', '-150-150'));
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

// jQuery elevateZoom 3.0.8
// github.com/elevateweb/elevatezoom
"function"!==typeof Object.create&&(Object.create=function(d){function h(){}h.prototype=d;return new h}); (function(d,h,l,m){var k={init:function(b,a){var c=this;c.elem=a;c.$elem=d(a);c.imageSrc=c.$elem.data("zoom-image")?c.$elem.data("zoom-image"):c.$elem.attr("src");c.options=d.extend({},d.fn.elevateZoom.options,b);c.options.tint&&(c.options.lensColour="none",c.options.lensOpacity="1");"inner"==c.options.zoomType&&(c.options.showLens=!1);c.$elem.parent().removeAttr("title").removeAttr("alt");c.zoomImage=c.imageSrc;c.refresh(1);d("#"+c.options.gallery+" a").click(function(a){c.options.galleryActiveClass&& (d("#"+c.options.gallery+" a").removeClass(c.options.galleryActiveClass),d(this).addClass(c.options.galleryActiveClass));a.preventDefault();d(this).data("zoom-image")?c.zoomImagePre=d(this).data("zoom-image"):c.zoomImagePre=d(this).data("image");c.swaptheimage(d(this).data("image"),c.zoomImagePre);return!1})},refresh:function(b){var a=this;setTimeout(function(){a.fetch(a.imageSrc)},b||a.options.refresh)},fetch:function(b){var a=this,c=new Image;c.onload=function(){a.largeWidth=c.width;a.largeHeight= c.height;a.startZoom();a.currentImage=a.imageSrc;a.options.onZoomedImageLoaded(a.$elem)};c.src=b},startZoom:function(){var b=this;b.nzWidth=b.$elem.width();b.nzHeight=b.$elem.height();b.isWindowActive=!1;b.isLensActive=!1;b.isTintActive=!1;b.overWindow=!1;b.options.imageCrossfade&&(b.zoomWrap=b.$elem.wrap('<div style="height:'+b.nzHeight+"px;width:"+b.nzWidth+'px;" class="zoomWrapper" />'),b.$elem.css("position","absolute"));b.zoomLock=1;b.scrollingLock=!1;b.changeBgSize=!1;b.currentZoomLevel=b.options.zoomLevel; b.nzOffset=b.$elem.offset();b.widthRatio=b.largeWidth/b.currentZoomLevel/b.nzWidth;b.heightRatio=b.largeHeight/b.currentZoomLevel/b.nzHeight;"window"==b.options.zoomType&&(b.zoomWindowStyle="overflow: hidden;background-position: 0px 0px;text-align:center;background-color: "+String(b.options.zoomWindowBgColour)+";width: "+String(b.options.zoomWindowWidth)+"px;height: "+String(b.options.zoomWindowHeight)+"px;float: left;background-size: "+b.largeWidth/b.currentZoomLevel+"px "+b.largeHeight/b.currentZoomLevel+ "px;display: none;z-index:100;border: "+String(b.options.borderSize)+"px solid "+b.options.borderColour+";background-repeat: no-repeat;position: absolute;");if("inner"==b.options.zoomType){var a=b.$elem.css("border-left-width");b.zoomWindowStyle="overflow: hidden;margin-left: "+String(a)+";margin-top: "+String(a)+";background-position: 0px 0px;width: "+String(b.nzWidth)+"px;height: "+String(b.nzHeight)+"px;float: left;display: none;cursor:"+b.options.cursor+";px solid "+b.options.borderColour+";background-repeat: no-repeat;position: absolute;"}"window"== b.options.zoomType&&(lensHeight=b.nzHeight<b.options.zoomWindowWidth/b.widthRatio?b.nzHeight:String(b.options.zoomWindowHeight/b.heightRatio),lensWidth=b.largeWidth<b.options.zoomWindowWidth?b.nzWidth:b.options.zoomWindowWidth/b.widthRatio,b.lensStyle="background-position: 0px 0px;width: "+String(b.options.zoomWindowWidth/b.widthRatio)+"px;height: "+String(b.options.zoomWindowHeight/b.heightRatio)+"px;float: right;display: none;overflow: hidden;z-index: 999;-webkit-transform: translateZ(0);opacity:"+ b.options.lensOpacity+";filter: alpha(opacity = "+100*b.options.lensOpacity+"); zoom:1;width:"+lensWidth+"px;height:"+lensHeight+"px;background-color:"+b.options.lensColour+";cursor:"+b.options.cursor+";border: "+b.options.lensBorderSize+"px solid "+b.options.lensBorderColour+";background-repeat: no-repeat;position: absolute;");b.tintStyle="display: block;position: absolute;background-color: "+b.options.tintColour+";filter:alpha(opacity=0);opacity: 0;width: "+b.nzWidth+"px;height: "+b.nzHeight+"px;"; b.lensRound="";"lens"==b.options.zoomType&&(b.lensStyle="background-position: 0px 0px;float: left;display: none;border: "+String(b.options.borderSize)+"px solid "+b.options.borderColour+";width:"+String(b.options.lensSize)+"px;height:"+String(b.options.lensSize)+"px;background-repeat: no-repeat;position: absolute;");"round"==b.options.lensShape&&(b.lensRound="border-top-left-radius: "+String(b.options.lensSize/2+b.options.borderSize)+"px;border-top-right-radius: "+String(b.options.lensSize/2+b.options.borderSize)+ "px;border-bottom-left-radius: "+String(b.options.lensSize/2+b.options.borderSize)+"px;border-bottom-right-radius: "+String(b.options.lensSize/2+b.options.borderSize)+"px;");b.zoomContainer=d('<div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:'+b.nzOffset.left+"px;top:"+b.nzOffset.top+"px;height:"+b.nzHeight+"px;width:"+b.nzWidth+'px;"></div>');d("body").append(b.zoomContainer);b.options.containLensZoom&&"lens"==b.options.zoomType&&b.zoomContainer.css("overflow", "hidden");"inner"!=b.options.zoomType&&(b.zoomLens=d("<div class='zoomLens' style='"+b.lensStyle+b.lensRound+"'>&nbsp;</div>").appendTo(b.zoomContainer).click(function(){b.$elem.trigger("click")}),b.options.tint&&(b.tintContainer=d("<div/>").addClass("tintContainer"),b.zoomTint=d("<div class='zoomTint' style='"+b.tintStyle+"'></div>"),b.zoomLens.wrap(b.tintContainer),b.zoomTintcss=b.zoomLens.after(b.zoomTint),b.zoomTintImage=d('<img style="position: absolute; left: 0px; top: 0px; max-width: none; width: '+ b.nzWidth+"px; height: "+b.nzHeight+'px;" src="'+b.imageSrc+'">').appendTo(b.zoomLens).click(function(){b.$elem.trigger("click")})));isNaN(b.options.zoomWindowPosition)?b.zoomWindow=d("<div style='z-index:999;left:"+b.windowOffsetLeft+"px;top:"+b.windowOffsetTop+"px;"+b.zoomWindowStyle+"' class='zoomWindow'>&nbsp;</div>").appendTo("body").click(function(){b.$elem.trigger("click")}):b.zoomWindow=d("<div style='z-index:999;left:"+b.windowOffsetLeft+"px;top:"+b.windowOffsetTop+"px;"+b.zoomWindowStyle+ "' class='zoomWindow'>&nbsp;</div>").appendTo(b.zoomContainer).click(function(){b.$elem.trigger("click")});b.zoomWindowContainer=d("<div/>").addClass("zoomWindowContainer").css("width",b.options.zoomWindowWidth);b.zoomWindow.wrap(b.zoomWindowContainer);"lens"==b.options.zoomType&&b.zoomLens.css({backgroundImage:"url('"+b.imageSrc+"')"});"window"==b.options.zoomType&&b.zoomWindow.css({backgroundImage:"url('"+b.imageSrc+"')"});"inner"==b.options.zoomType&&b.zoomWindow.css({backgroundImage:"url('"+b.imageSrc+ "')"});b.$elem.bind("touchmove",function(a){a.preventDefault();b.setPosition(a.originalEvent.touches[0]||a.originalEvent.changedTouches[0])});b.zoomContainer.bind("touchmove",function(a){"inner"==b.options.zoomType&&b.showHideWindow("show");a.preventDefault();b.setPosition(a.originalEvent.touches[0]||a.originalEvent.changedTouches[0])});b.zoomContainer.bind("touchend",function(a){b.showHideWindow("hide");b.options.showLens&&b.showHideLens("hide");b.options.tint&&"inner"!=b.options.zoomType&&b.showHideTint("hide")}); b.$elem.bind("touchend",function(a){b.showHideWindow("hide");b.options.showLens&&b.showHideLens("hide");b.options.tint&&"inner"!=b.options.zoomType&&b.showHideTint("hide")});b.options.showLens&&(b.zoomLens.bind("touchmove",function(a){a.preventDefault();b.setPosition(a.originalEvent.touches[0]||a.originalEvent.changedTouches[0])}),b.zoomLens.bind("touchend",function(a){b.showHideWindow("hide");b.options.showLens&&b.showHideLens("hide");b.options.tint&&"inner"!=b.options.zoomType&&b.showHideTint("hide")})); b.$elem.bind("mousemove",function(a){!1==b.overWindow&&b.setElements("show");if(b.lastX!==a.clientX||b.lastY!==a.clientY)b.setPosition(a),b.currentLoc=a;b.lastX=a.clientX;b.lastY=a.clientY});b.zoomContainer.bind("mousemove",function(a){!1==b.overWindow&&b.setElements("show");if(b.lastX!==a.clientX||b.lastY!==a.clientY)b.setPosition(a),b.currentLoc=a;b.lastX=a.clientX;b.lastY=a.clientY});"inner"!=b.options.zoomType&&b.zoomLens.bind("mousemove",function(a){if(b.lastX!==a.clientX||b.lastY!==a.clientY)b.setPosition(a), b.currentLoc=a;b.lastX=a.clientX;b.lastY=a.clientY});b.options.tint&&"inner"!=b.options.zoomType&&b.zoomTint.bind("mousemove",function(a){if(b.lastX!==a.clientX||b.lastY!==a.clientY)b.setPosition(a),b.currentLoc=a;b.lastX=a.clientX;b.lastY=a.clientY});"inner"==b.options.zoomType&&b.zoomWindow.bind("mousemove",function(a){if(b.lastX!==a.clientX||b.lastY!==a.clientY)b.setPosition(a),b.currentLoc=a;b.lastX=a.clientX;b.lastY=a.clientY});b.zoomContainer.add(b.$elem).mouseenter(function(){!1==b.overWindow&& b.setElements("show")}).mouseleave(function(){b.scrollLock||b.setElements("hide")});"inner"!=b.options.zoomType&&b.zoomWindow.mouseenter(function(){b.overWindow=!0;b.setElements("hide")}).mouseleave(function(){b.overWindow=!1});b.minZoomLevel=b.options.minZoomLevel?b.options.minZoomLevel:2*b.options.scrollZoomIncrement;b.options.scrollZoom&&b.zoomContainer.add(b.$elem).bind("mousewheel DOMMouseScroll MozMousePixelScroll",function(a){b.scrollLock=!0;clearTimeout(d.data(this,"timer"));d.data(this,"timer", setTimeout(function(){b.scrollLock=!1},250));var e=a.originalEvent.wheelDelta||-1*a.originalEvent.detail;a.stopImmediatePropagation();a.stopPropagation();a.preventDefault();0<e/120?b.currentZoomLevel>=b.minZoomLevel&&b.changeZoomLevel(b.currentZoomLevel-b.options.scrollZoomIncrement):b.options.maxZoomLevel?b.currentZoomLevel<=b.options.maxZoomLevel&&b.changeZoomLevel(parseFloat(b.currentZoomLevel)+b.options.scrollZoomIncrement):b.changeZoomLevel(parseFloat(b.currentZoomLevel)+b.options.scrollZoomIncrement); return!1})},setElements:function(b){if(!this.options.zoomEnabled)return!1;"show"==b&&this.isWindowSet&&("inner"==this.options.zoomType&&this.showHideWindow("show"),"window"==this.options.zoomType&&this.showHideWindow("show"),this.options.showLens&&this.showHideLens("show"),this.options.tint&&"inner"!=this.options.zoomType&&this.showHideTint("show"));"hide"==b&&("window"==this.options.zoomType&&this.showHideWindow("hide"),this.options.tint||this.showHideWindow("hide"),this.options.showLens&&this.showHideLens("hide"), this.options.tint&&this.showHideTint("hide"))},setPosition:function(b){if(!this.options.zoomEnabled)return!1;this.nzHeight=this.$elem.height();this.nzWidth=this.$elem.width();this.nzOffset=this.$elem.offset();this.options.tint&&"inner"!=this.options.zoomType&&(this.zoomTint.css({top:0}),this.zoomTint.css({left:0}));this.options.responsive&&!this.options.scrollZoom&&this.options.showLens&&(lensHeight=this.nzHeight<this.options.zoomWindowWidth/this.widthRatio?this.nzHeight:String(this.options.zoomWindowHeight/ this.heightRatio),lensWidth=this.largeWidth<this.options.zoomWindowWidth?this.nzWidth:this.options.zoomWindowWidth/this.widthRatio,this.widthRatio=this.largeWidth/this.nzWidth,this.heightRatio=this.largeHeight/this.nzHeight,"lens"!=this.options.zoomType&&(lensHeight=this.nzHeight<this.options.zoomWindowWidth/this.widthRatio?this.nzHeight:String(this.options.zoomWindowHeight/this.heightRatio),lensWidth=this.options.zoomWindowWidth<this.options.zoomWindowWidth?this.nzWidth:this.options.zoomWindowWidth/ this.widthRatio,this.zoomLens.css("width",lensWidth),this.zoomLens.css("height",lensHeight),this.options.tint&&(this.zoomTintImage.css("width",this.nzWidth),this.zoomTintImage.css("height",this.nzHeight))),"lens"==this.options.zoomType&&this.zoomLens.css({width:String(this.options.lensSize)+"px",height:String(this.options.lensSize)+"px"}));this.zoomContainer.css({top:this.nzOffset.top});this.zoomContainer.css({left:this.nzOffset.left});this.mouseLeft=parseInt(b.pageX-this.nzOffset.left);this.mouseTop= parseInt(b.pageY-this.nzOffset.top);"window"==this.options.zoomType&&(this.Etoppos=this.mouseTop<this.zoomLens.height()/2,this.Eboppos=this.mouseTop>this.nzHeight-this.zoomLens.height()/2-2*this.options.lensBorderSize,this.Eloppos=this.mouseLeft<0+this.zoomLens.width()/2,this.Eroppos=this.mouseLeft>this.nzWidth-this.zoomLens.width()/2-2*this.options.lensBorderSize);"inner"==this.options.zoomType&&(this.Etoppos=this.mouseTop<this.nzHeight/2/this.heightRatio,this.Eboppos=this.mouseTop>this.nzHeight- this.nzHeight/2/this.heightRatio,this.Eloppos=this.mouseLeft<0+this.nzWidth/2/this.widthRatio,this.Eroppos=this.mouseLeft>this.nzWidth-this.nzWidth/2/this.widthRatio-2*this.options.lensBorderSize);0>=this.mouseLeft||0>this.mouseTop||this.mouseLeft>this.nzWidth||this.mouseTop>this.nzHeight?this.setElements("hide"):(this.options.showLens&&(this.lensLeftPos=String(this.mouseLeft-this.zoomLens.width()/2),this.lensTopPos=String(this.mouseTop-this.zoomLens.height()/2)),this.Etoppos&&(this.lensTopPos=0), this.Eloppos&&(this.tintpos=this.lensLeftPos=this.windowLeftPos=0),"window"==this.options.zoomType&&(this.Eboppos&&(this.lensTopPos=Math.max(this.nzHeight-this.zoomLens.height()-2*this.options.lensBorderSize,0)),this.Eroppos&&(this.lensLeftPos=this.nzWidth-this.zoomLens.width()-2*this.options.lensBorderSize)),"inner"==this.options.zoomType&&(this.Eboppos&&(this.lensTopPos=Math.max(this.nzHeight-2*this.options.lensBorderSize,0)),this.Eroppos&&(this.lensLeftPos=this.nzWidth-this.nzWidth-2*this.options.lensBorderSize)), "lens"==this.options.zoomType&&(this.windowLeftPos=String(-1*((b.pageX-this.nzOffset.left)*this.widthRatio-this.zoomLens.width()/2)),this.windowTopPos=String(-1*((b.pageY-this.nzOffset.top)*this.heightRatio-this.zoomLens.height()/2)),this.zoomLens.css({backgroundPosition:this.windowLeftPos+"px "+this.windowTopPos+"px"}),this.changeBgSize&&(this.nzHeight>this.nzWidth?("lens"==this.options.zoomType&&this.zoomLens.css({"background-size":this.largeWidth/this.newvalueheight+"px "+this.largeHeight/this.newvalueheight+ "px"}),this.zoomWindow.css({"background-size":this.largeWidth/this.newvalueheight+"px "+this.largeHeight/this.newvalueheight+"px"})):("lens"==this.options.zoomType&&this.zoomLens.css({"background-size":this.largeWidth/this.newvaluewidth+"px "+this.largeHeight/this.newvaluewidth+"px"}),this.zoomWindow.css({"background-size":this.largeWidth/this.newvaluewidth+"px "+this.largeHeight/this.newvaluewidth+"px"})),this.changeBgSize=!1),this.setWindowPostition(b)),this.options.tint&&"inner"!=this.options.zoomType&& this.setTintPosition(b),"window"==this.options.zoomType&&this.setWindowPostition(b),"inner"==this.options.zoomType&&this.setWindowPostition(b),this.options.showLens&&(this.fullwidth&&"lens"!=this.options.zoomType&&(this.lensLeftPos=0),this.zoomLens.css({left:this.lensLeftPos+"px",top:this.lensTopPos+"px"})))},showHideWindow:function(b){"show"!=b||this.isWindowActive||(this.options.zoomWindowFadeIn?this.zoomWindow.stop(!0,!0,!1).fadeIn(this.options.zoomWindowFadeIn):this.zoomWindow.show(),this.isWindowActive= !0);"hide"==b&&this.isWindowActive&&(this.options.zoomWindowFadeOut?this.zoomWindow.stop(!0,!0).fadeOut(this.options.zoomWindowFadeOut):this.zoomWindow.hide(),this.isWindowActive=!1)},showHideLens:function(b){"show"!=b||this.isLensActive||(this.options.lensFadeIn?this.zoomLens.stop(!0,!0,!1).fadeIn(this.options.lensFadeIn):this.zoomLens.show(),this.isLensActive=!0);"hide"==b&&this.isLensActive&&(this.options.lensFadeOut?this.zoomLens.stop(!0,!0).fadeOut(this.options.lensFadeOut):this.zoomLens.hide(), this.isLensActive=!1)},showHideTint:function(b){"show"!=b||this.isTintActive||(this.options.zoomTintFadeIn?this.zoomTint.css({opacity:this.options.tintOpacity}).animate().stop(!0,!0).fadeIn("slow"):(this.zoomTint.css({opacity:this.options.tintOpacity}).animate(),this.zoomTint.show()),this.isTintActive=!0);"hide"==b&&this.isTintActive&&(this.options.zoomTintFadeOut?this.zoomTint.stop(!0,!0).fadeOut(this.options.zoomTintFadeOut):this.zoomTint.hide(),this.isTintActive=!1)},setLensPostition:function(b){}, setWindowPostition:function(b){var a=this;if(isNaN(a.options.zoomWindowPosition))a.externalContainer=d("#"+a.options.zoomWindowPosition),a.externalContainerWidth=a.externalContainer.width(),a.externalContainerHeight=a.externalContainer.height(),a.externalContainerOffset=a.externalContainer.offset(),a.windowOffsetTop=a.externalContainerOffset.top,a.windowOffsetLeft=a.externalContainerOffset.left;else switch(a.options.zoomWindowPosition){case 1:a.windowOffsetTop=a.options.zoomWindowOffety;a.windowOffsetLeft= +a.nzWidth;break;case 2:a.options.zoomWindowHeight>a.nzHeight&&(a.windowOffsetTop=-1*(a.options.zoomWindowHeight/2-a.nzHeight/2),a.windowOffsetLeft=a.nzWidth);break;case 3:a.windowOffsetTop=a.nzHeight-a.zoomWindow.height()-2*a.options.borderSize;a.windowOffsetLeft=a.nzWidth;break;case 4:a.windowOffsetTop=a.nzHeight;a.windowOffsetLeft=a.nzWidth;break;case 5:a.windowOffsetTop=a.nzHeight;a.windowOffsetLeft=a.nzWidth-a.zoomWindow.width()-2*a.options.borderSize;break;case 6:a.options.zoomWindowHeight> a.nzHeight&&(a.windowOffsetTop=a.nzHeight,a.windowOffsetLeft=-1*(a.options.zoomWindowWidth/2-a.nzWidth/2+2*a.options.borderSize));break;case 7:a.windowOffsetTop=a.nzHeight;a.windowOffsetLeft=0;break;case 8:a.windowOffsetTop=a.nzHeight;a.windowOffsetLeft=-1*(a.zoomWindow.width()+2*a.options.borderSize);break;case 9:a.windowOffsetTop=a.nzHeight-a.zoomWindow.height()-2*a.options.borderSize;a.windowOffsetLeft=-1*(a.zoomWindow.width()+2*a.options.borderSize);break;case 10:a.options.zoomWindowHeight>a.nzHeight&& (a.windowOffsetTop=-1*(a.options.zoomWindowHeight/2-a.nzHeight/2),a.windowOffsetLeft=-1*(a.zoomWindow.width()+2*a.options.borderSize));break;case 11:a.windowOffsetTop=a.options.zoomWindowOffety;a.windowOffsetLeft=-1*(a.zoomWindow.width()+2*a.options.borderSize);break;case 12:a.windowOffsetTop=-1*(a.zoomWindow.height()+2*a.options.borderSize);a.windowOffsetLeft=-1*(a.zoomWindow.width()+2*a.options.borderSize);break;case 13:a.windowOffsetTop=-1*(a.zoomWindow.height()+2*a.options.borderSize);a.windowOffsetLeft= 0;break;case 14:a.options.zoomWindowHeight>a.nzHeight&&(a.windowOffsetTop=-1*(a.zoomWindow.height()+2*a.options.borderSize),a.windowOffsetLeft=-1*(a.options.zoomWindowWidth/2-a.nzWidth/2+2*a.options.borderSize));break;case 15:a.windowOffsetTop=-1*(a.zoomWindow.height()+2*a.options.borderSize);a.windowOffsetLeft=a.nzWidth-a.zoomWindow.width()-2*a.options.borderSize;break;case 16:a.windowOffsetTop=-1*(a.zoomWindow.height()+2*a.options.borderSize);a.windowOffsetLeft=a.nzWidth;break;default:a.windowOffsetTop= a.options.zoomWindowOffety,a.windowOffsetLeft=a.nzWidth}a.isWindowSet=!0;a.windowOffsetTop+=a.options.zoomWindowOffety;a.windowOffsetLeft+=a.options.zoomWindowOffetx;a.zoomWindow.css({top:a.windowOffsetTop});a.zoomWindow.css({left:a.windowOffsetLeft});"inner"==a.options.zoomType&&(a.zoomWindow.css({top:0}),a.zoomWindow.css({left:0}));a.windowLeftPos=String(-1*((b.pageX-a.nzOffset.left)*a.widthRatio-a.zoomWindow.width()/2));a.windowTopPos=String(-1*((b.pageY-a.nzOffset.top)*a.heightRatio-a.zoomWindow.height()/ 2));a.Etoppos&&(a.windowTopPos=0);a.Eloppos&&(a.windowLeftPos=0);a.Eboppos&&(a.windowTopPos=-1*(a.largeHeight/a.currentZoomLevel-a.zoomWindow.height()));a.Eroppos&&(a.windowLeftPos=-1*(a.largeWidth/a.currentZoomLevel-a.zoomWindow.width()));a.fullheight&&(a.windowTopPos=0);a.fullwidth&&(a.windowLeftPos=0);if("window"==a.options.zoomType||"inner"==a.options.zoomType)1==a.zoomLock&&(1>=a.widthRatio&&(a.windowLeftPos=0),1>=a.heightRatio&&(a.windowTopPos=0)),a.largeHeight<a.options.zoomWindowHeight&&(a.windowTopPos= 0),a.largeWidth<a.options.zoomWindowWidth&&(a.windowLeftPos=0),a.options.easing?(a.xp||(a.xp=0),a.yp||(a.yp=0),a.loop||(a.loop=setInterval(function(){a.xp+=(a.windowLeftPos-a.xp)/a.options.easingAmount;a.yp+=(a.windowTopPos-a.yp)/a.options.easingAmount;a.scrollingLock?(clearInterval(a.loop),a.xp=a.windowLeftPos,a.yp=a.windowTopPos,a.xp=-1*((b.pageX-a.nzOffset.left)*a.widthRatio-a.zoomWindow.width()/2),a.yp=-1*((b.pageY-a.nzOffset.top)*a.heightRatio-a.zoomWindow.height()/2),a.changeBgSize&&(a.nzHeight> a.nzWidth?("lens"==a.options.zoomType&&a.zoomLens.css({"background-size":a.largeWidth/a.newvalueheight+"px "+a.largeHeight/a.newvalueheight+"px"}),a.zoomWindow.css({"background-size":a.largeWidth/a.newvalueheight+"px "+a.largeHeight/a.newvalueheight+"px"})):("lens"!=a.options.zoomType&&a.zoomLens.css({"background-size":a.largeWidth/a.newvaluewidth+"px "+a.largeHeight/a.newvalueheight+"px"}),a.zoomWindow.css({"background-size":a.largeWidth/a.newvaluewidth+"px "+a.largeHeight/a.newvaluewidth+"px"})), a.changeBgSize=!1),a.zoomWindow.css({backgroundPosition:a.windowLeftPos+"px "+a.windowTopPos+"px"}),a.scrollingLock=!1,a.loop=!1):(a.changeBgSize&&(a.nzHeight>a.nzWidth?("lens"==a.options.zoomType&&a.zoomLens.css({"background-size":a.largeWidth/a.newvalueheight+"px "+a.largeHeight/a.newvalueheight+"px"}),a.zoomWindow.css({"background-size":a.largeWidth/a.newvalueheight+"px "+a.largeHeight/a.newvalueheight+"px"})):("lens"!=a.options.zoomType&&a.zoomLens.css({"background-size":a.largeWidth/a.newvaluewidth+ "px "+a.largeHeight/a.newvaluewidth+"px"}),a.zoomWindow.css({"background-size":a.largeWidth/a.newvaluewidth+"px "+a.largeHeight/a.newvaluewidth+"px"})),a.changeBgSize=!1),a.zoomWindow.css({backgroundPosition:a.xp+"px "+a.yp+"px"}))},16))):(a.changeBgSize&&(a.nzHeight>a.nzWidth?("lens"==a.options.zoomType&&a.zoomLens.css({"background-size":a.largeWidth/a.newvalueheight+"px "+a.largeHeight/a.newvalueheight+"px"}),a.zoomWindow.css({"background-size":a.largeWidth/a.newvalueheight+"px "+a.largeHeight/ a.newvalueheight+"px"})):("lens"==a.options.zoomType&&a.zoomLens.css({"background-size":a.largeWidth/a.newvaluewidth+"px "+a.largeHeight/a.newvaluewidth+"px"}),a.largeHeight/a.newvaluewidth<a.options.zoomWindowHeight?a.zoomWindow.css({"background-size":a.largeWidth/a.newvaluewidth+"px "+a.largeHeight/a.newvaluewidth+"px"}):a.zoomWindow.css({"background-size":a.largeWidth/a.newvalueheight+"px "+a.largeHeight/a.newvalueheight+"px"})),a.changeBgSize=!1),a.zoomWindow.css({backgroundPosition:a.windowLeftPos+ "px "+a.windowTopPos+"px"}))},setTintPosition:function(b){this.nzOffset=this.$elem.offset();this.tintpos=String(-1*(b.pageX-this.nzOffset.left-this.zoomLens.width()/2));this.tintposy=String(-1*(b.pageY-this.nzOffset.top-this.zoomLens.height()/2));this.Etoppos&&(this.tintposy=0);this.Eloppos&&(this.tintpos=0);this.Eboppos&&(this.tintposy=-1*(this.nzHeight-this.zoomLens.height()-2*this.options.lensBorderSize));this.Eroppos&&(this.tintpos=-1*(this.nzWidth-this.zoomLens.width()-2*this.options.lensBorderSize)); this.options.tint&&(this.fullheight&&(this.tintposy=0),this.fullwidth&&(this.tintpos=0),this.zoomTintImage.css({left:this.tintpos+"px"}),this.zoomTintImage.css({top:this.tintposy+"px"}))},swaptheimage:function(b,a){var c=this,e=new Image;c.options.loadingIcon&&(c.spinner=d("<div style=\"background: url('"+c.options.loadingIcon+"') no-repeat center;height:"+c.nzHeight+"px;width:"+c.nzWidth+'px;z-index: 2000;position: absolute; background-position: center center;"></div>'),c.$elem.after(c.spinner)); c.options.onImageSwap(c.$elem);e.onload=function(){c.largeWidth=e.width;c.largeHeight=e.height;c.zoomImage=a;c.zoomWindow.css({"background-size":c.largeWidth+"px "+c.largeHeight+"px"});c.zoomWindow.css({"background-size":c.largeWidth+"px "+c.largeHeight+"px"});c.swapAction(b,a)};e.src=a},swapAction:function(b,a){var c=this,e=new Image;e.onload=function(){c.nzHeight=e.height;c.nzWidth=e.width;c.options.onImageSwapComplete(c.$elem);c.doneCallback()};e.src=b;c.currentZoomLevel=c.options.zoomLevel;c.options.maxZoomLevel= !1;"lens"==c.options.zoomType&&c.zoomLens.css({backgroundImage:"url('"+a+"')"});"window"==c.options.zoomType&&c.zoomWindow.css({backgroundImage:"url('"+a+"')"});"inner"==c.options.zoomType&&c.zoomWindow.css({backgroundImage:"url('"+a+"')"});c.currentImage=a;if(c.options.imageCrossfade){var f=c.$elem,g=f.clone();c.$elem.attr("src",b);c.$elem.after(g);g.stop(!0).fadeOut(c.options.imageCrossfade,function(){d(this).remove()});c.$elem.width("auto").removeAttr("width");c.$elem.height("auto").removeAttr("height"); f.fadeIn(c.options.imageCrossfade);c.options.tint&&"inner"!=c.options.zoomType&&(f=c.zoomTintImage,g=f.clone(),c.zoomTintImage.attr("src",a),c.zoomTintImage.after(g),g.stop(!0).fadeOut(c.options.imageCrossfade,function(){d(this).remove()}),f.fadeIn(c.options.imageCrossfade),c.zoomTint.css({height:c.$elem.height()}),c.zoomTint.css({width:c.$elem.width()}));c.zoomContainer.css("height",c.$elem.height());c.zoomContainer.css("width",c.$elem.width());"inner"!=c.options.zoomType||c.options.constrainType|| (c.zoomWrap.parent().css("height",c.$elem.height()),c.zoomWrap.parent().css("width",c.$elem.width()),c.zoomWindow.css("height",c.$elem.height()),c.zoomWindow.css("width",c.$elem.width()))}else c.$elem.attr("src",b),c.options.tint&&(c.zoomTintImage.attr("src",a),c.zoomTintImage.attr("height",c.$elem.height()),c.zoomTintImage.css({height:c.$elem.height()}),c.zoomTint.css({height:c.$elem.height()})),c.zoomContainer.css("height",c.$elem.height()),c.zoomContainer.css("width",c.$elem.width());c.options.imageCrossfade&& (c.zoomWrap.css("height",c.$elem.height()),c.zoomWrap.css("width",c.$elem.width()));c.options.constrainType&&("height"==c.options.constrainType&&(c.zoomContainer.css("height",c.options.constrainSize),c.zoomContainer.css("width","auto"),c.options.imageCrossfade?(c.zoomWrap.css("height",c.options.constrainSize),c.zoomWrap.css("width","auto"),c.constwidth=c.zoomWrap.width()):(c.$elem.css("height",c.options.constrainSize),c.$elem.css("width","auto"),c.constwidth=c.$elem.width()),"inner"==c.options.zoomType&& (c.zoomWrap.parent().css("height",c.options.constrainSize),c.zoomWrap.parent().css("width",c.constwidth),c.zoomWindow.css("height",c.options.constrainSize),c.zoomWindow.css("width",c.constwidth)),c.options.tint&&(c.tintContainer.css("height",c.options.constrainSize),c.tintContainer.css("width",c.constwidth),c.zoomTint.css("height",c.options.constrainSize),c.zoomTint.css("width",c.constwidth),c.zoomTintImage.css("height",c.options.constrainSize),c.zoomTintImage.css("width",c.constwidth))),"width"== c.options.constrainType&&(c.zoomContainer.css("height","auto"),c.zoomContainer.css("width",c.options.constrainSize),c.options.imageCrossfade?(c.zoomWrap.css("height","auto"),c.zoomWrap.css("width",c.options.constrainSize),c.constheight=c.zoomWrap.height()):(c.$elem.css("height","auto"),c.$elem.css("width",c.options.constrainSize),c.constheight=c.$elem.height()),"inner"==c.options.zoomType&&(c.zoomWrap.parent().css("height",c.constheight),c.zoomWrap.parent().css("width",c.options.constrainSize),c.zoomWindow.css("height", c.constheight),c.zoomWindow.css("width",c.options.constrainSize)),c.options.tint&&(c.tintContainer.css("height",c.constheight),c.tintContainer.css("width",c.options.constrainSize),c.zoomTint.css("height",c.constheight),c.zoomTint.css("width",c.options.constrainSize),c.zoomTintImage.css("height",c.constheight),c.zoomTintImage.css("width",c.options.constrainSize))))},doneCallback:function(){this.options.loadingIcon&&this.spinner.hide();this.nzOffset=this.$elem.offset();this.nzWidth=this.$elem.width(); this.nzHeight=this.$elem.height();this.currentZoomLevel=this.options.zoomLevel;this.widthRatio=this.largeWidth/this.nzWidth;this.heightRatio=this.largeHeight/this.nzHeight;"window"==this.options.zoomType&&(lensHeight=this.nzHeight<this.options.zoomWindowWidth/this.widthRatio?this.nzHeight:String(this.options.zoomWindowHeight/this.heightRatio),lensWidth=this.options.zoomWindowWidth<this.options.zoomWindowWidth?this.nzWidth:this.options.zoomWindowWidth/this.widthRatio,this.zoomLens&&(this.zoomLens.css("width", lensWidth),this.zoomLens.css("height",lensHeight)))},getCurrentImage:function(){return this.zoomImage},getGalleryList:function(){var b=this;b.gallerylist=[];b.options.gallery?d("#"+b.options.gallery+" a").each(function(){var a="";d(this).data("zoom-image")?a=d(this).data("zoom-image"):d(this).data("image")&&(a=d(this).data("image"));a==b.zoomImage?b.gallerylist.unshift({href:""+a+"",title:d(this).find("img").attr("title")}):b.gallerylist.push({href:""+a+"",title:d(this).find("img").attr("title")})}): b.gallerylist.push({href:""+b.zoomImage+"",title:d(this).find("img").attr("title")});return b.gallerylist},changeZoomLevel:function(b){this.scrollingLock=!0;this.newvalue=parseFloat(b).toFixed(2);newvalue=parseFloat(b).toFixed(2);maxheightnewvalue=this.largeHeight/(this.options.zoomWindowHeight/this.nzHeight*this.nzHeight);maxwidthtnewvalue=this.largeWidth/(this.options.zoomWindowWidth/this.nzWidth*this.nzWidth);"inner"!=this.options.zoomType&&(maxheightnewvalue<=newvalue?(this.heightRatio=this.largeHeight/ maxheightnewvalue/this.nzHeight,this.newvalueheight=maxheightnewvalue,this.fullheight=!0):(this.heightRatio=this.largeHeight/newvalue/this.nzHeight,this.newvalueheight=newvalue,this.fullheight=!1),maxwidthtnewvalue<=newvalue?(this.widthRatio=this.largeWidth/maxwidthtnewvalue/this.nzWidth,this.newvaluewidth=maxwidthtnewvalue,this.fullwidth=!0):(this.widthRatio=this.largeWidth/newvalue/this.nzWidth,this.newvaluewidth=newvalue,this.fullwidth=!1),"lens"==this.options.zoomType&&(maxheightnewvalue<=newvalue? (this.fullwidth=!0,this.newvaluewidth=maxheightnewvalue):(this.widthRatio=this.largeWidth/newvalue/this.nzWidth,this.newvaluewidth=newvalue,this.fullwidth=!1)));"inner"==this.options.zoomType&&(maxheightnewvalue=parseFloat(this.largeHeight/this.nzHeight).toFixed(2),maxwidthtnewvalue=parseFloat(this.largeWidth/this.nzWidth).toFixed(2),newvalue>maxheightnewvalue&&(newvalue=maxheightnewvalue),newvalue>maxwidthtnewvalue&&(newvalue=maxwidthtnewvalue),maxheightnewvalue<=newvalue?(this.heightRatio=this.largeHeight/ newvalue/this.nzHeight,this.newvalueheight=newvalue>maxheightnewvalue?maxheightnewvalue:newvalue,this.fullheight=!0):(this.heightRatio=this.largeHeight/newvalue/this.nzHeight,this.newvalueheight=newvalue>maxheightnewvalue?maxheightnewvalue:newvalue,this.fullheight=!1),maxwidthtnewvalue<=newvalue?(this.widthRatio=this.largeWidth/newvalue/this.nzWidth,this.newvaluewidth=newvalue>maxwidthtnewvalue?maxwidthtnewvalue:newvalue,this.fullwidth=!0):(this.widthRatio=this.largeWidth/newvalue/this.nzWidth,this.newvaluewidth= newvalue,this.fullwidth=!1));scrcontinue=!1;"inner"==this.options.zoomType&&(this.nzWidth>this.nzHeight&&(this.newvaluewidth<=maxwidthtnewvalue?scrcontinue=!0:(scrcontinue=!1,this.fullwidth=this.fullheight=!0)),this.nzHeight>this.nzWidth&&(this.newvaluewidth<=maxwidthtnewvalue?scrcontinue=!0:(scrcontinue=!1,this.fullwidth=this.fullheight=!0)));"inner"!=this.options.zoomType&&(scrcontinue=!0);scrcontinue&&(this.zoomLock=0,this.changeZoom=!0,this.options.zoomWindowHeight/this.heightRatio<=this.nzHeight&& (this.currentZoomLevel=this.newvalueheight,"lens"!=this.options.zoomType&&"inner"!=this.options.zoomType&&(this.changeBgSize=!0,this.zoomLens.css({height:String(this.options.zoomWindowHeight/this.heightRatio)+"px"})),"lens"==this.options.zoomType||"inner"==this.options.zoomType)&&(this.changeBgSize=!0),this.options.zoomWindowWidth/this.widthRatio<=this.nzWidth&&("inner"!=this.options.zoomType&&this.newvaluewidth>this.newvalueheight&&(this.currentZoomLevel=this.newvaluewidth),"lens"!=this.options.zoomType&& "inner"!=this.options.zoomType&&(this.changeBgSize=!0,this.zoomLens.css({width:String(this.options.zoomWindowWidth/this.widthRatio)+"px"})),"lens"==this.options.zoomType||"inner"==this.options.zoomType)&&(this.changeBgSize=!0),"inner"==this.options.zoomType&&(this.changeBgSize=!0,this.nzWidth>this.nzHeight&&(this.currentZoomLevel=this.newvaluewidth),this.nzHeight>this.nzWidth&&(this.currentZoomLevel=this.newvaluewidth)));this.setPosition(this.currentLoc)},closeAll:function(){self.zoomWindow&&self.zoomWindow.hide(); self.zoomLens&&self.zoomLens.hide();self.zoomTint&&self.zoomTint.hide()},changeState:function(b){"enable"==b&&(this.options.zoomEnabled=!0);"disable"==b&&(this.options.zoomEnabled=!1)}};d.fn.elevateZoom=function(b){return this.each(function(){var a=Object.create(k);a.init(b,this);d.data(this,"elevateZoom",a)})};d.fn.elevateZoom.options={zoomActivation:"hover",zoomEnabled:!0,preloading:1,zoomLevel:1,scrollZoom:!1,scrollZoomIncrement:0.1,minZoomLevel:!1,maxZoomLevel:!1,easing:!1,easingAmount:12,lensSize:200, zoomWindowWidth:400,zoomWindowHeight:400,zoomWindowOffetx:0,zoomWindowOffety:0,zoomWindowPosition:1,zoomWindowBgColour:"#fff",lensFadeIn:!1,lensFadeOut:!1,debug:!1,zoomWindowFadeIn:!1,zoomWindowFadeOut:!1,zoomWindowAlwaysShow:!1,zoomTintFadeIn:!1,zoomTintFadeOut:!1,borderSize:4,showLens:!0,borderColour:"#888",lensBorderSize:1,lensBorderColour:"#000",lensShape:"square",zoomType:"window",containLensZoom:!1,lensColour:"white",lensOpacity:0.4,lenszoom:!1,tint:!1,tintColour:"#333",tintOpacity:0.4,gallery:!1, galleryActiveClass:"zoomGalleryActive",imageCrossfade:!1,constrainType:!1,constrainSize:!1,loadingIcon:!1,cursor:"default",responsive:!0,onComplete:d.noop,onZoomedImageLoaded:function(){},onImageSwap:d.noop,onImageSwapComplete:d.noop}})(jQuery,window,document);

/* Quatro Digital Amazing Menu */
var _0x7063=['replace','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','url','html','attr','data-qdam-value','clone','hide','qd-am-content-loaded','text','trim','insertBefore','\x27\x20falho.','ajaxCallback','QuatroDigital.am.ajaxCallback','li\x20>ul','qd-am-has-ul','children','qd-am-elem-','>li','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','add','qd-am-','-li','callback','trigger','QuatroDigital.am.callback','extend','getParent','closest','function','QD_amazingMenu','undefined','error','info','warn','object','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','apply','join','qdAmAddNdx','each','addClass','qd-am-li-','first','last','qd-am-last','vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'];(function(_0x14add3,_0x13ce8d){var _0x4a174f=function(_0x2b3ed7){while(--_0x2b3ed7){_0x14add3['push'](_0x14add3['shift']());}};_0x4a174f(++_0x13ce8d);}(_0x7063,0x1e1));var _0x3706=function(_0x565f7e,_0x520443){_0x565f7e=_0x565f7e-0x0;var _0x51852f=_0x7063[_0x565f7e];return _0x51852f;};(function(_0x427a7c){_0x427a7c['fn'][_0x3706('0x0')]=_0x427a7c['fn'][_0x3706('0x1')];}(jQuery));(function(_0x5d73b9){var _0x91c2a2;var _0x2c8621=jQuery;if(_0x3706('0x2')!==typeof _0x2c8621['fn'][_0x3706('0x3')]){var _0x237bc9={'url':'/qd-amazing-menu','callback':function(){},'ajaxCallback':function(){}};var _0x4578b7=function(_0x20347f,_0x446107){if('object'===typeof console&&_0x3706('0x4')!==typeof console[_0x3706('0x5')]&&_0x3706('0x4')!==typeof console[_0x3706('0x6')]&&'undefined'!==typeof console[_0x3706('0x7')]){var _0x2583c8;_0x3706('0x8')===typeof _0x20347f?(_0x20347f[_0x3706('0x9')](_0x3706('0xa')),_0x2583c8=_0x20347f):_0x2583c8=[_0x3706('0xa')+_0x20347f];if('undefined'===typeof _0x446107||_0x3706('0xb')!==_0x446107[_0x3706('0xc')]()&&'aviso'!==_0x446107[_0x3706('0xc')]())if(_0x3706('0x4')!==typeof _0x446107&&_0x3706('0x6')===_0x446107[_0x3706('0xc')]())try{console[_0x3706('0x6')][_0x3706('0xd')](console,_0x2583c8);}catch(_0x79838c){try{console[_0x3706('0x6')](_0x2583c8[_0x3706('0xe')]('\x0a'));}catch(_0x231c0a){}}else try{console['error'][_0x3706('0xd')](console,_0x2583c8);}catch(_0x10f727){try{console['error'](_0x2583c8[_0x3706('0xe')]('\x0a'));}catch(_0x4dddee){}}else try{console[_0x3706('0x7')][_0x3706('0xd')](console,_0x2583c8);}catch(_0xacd8b0){try{console[_0x3706('0x7')](_0x2583c8['join']('\x0a'));}catch(_0x112dd3){}}}};_0x2c8621['fn'][_0x3706('0xf')]=function(){var _0x74ade5=_0x2c8621(this);_0x74ade5[_0x3706('0x10')](function(_0x1911af){_0x2c8621(this)[_0x3706('0x11')](_0x3706('0x12')+_0x1911af);});_0x74ade5[_0x3706('0x13')]()[_0x3706('0x11')]('qd-am-first');_0x74ade5[_0x3706('0x14')]()[_0x3706('0x11')](_0x3706('0x15'));return _0x74ade5;};_0x2c8621['fn']['QD_amazingMenu']=function(){};_0x5d73b9=function(_0x6b3066){var _0x3e906d={'i':_0x3706('0x16')};return function(_0x231b3c){var _0x4d70e2=function(_0x22fb43){return _0x22fb43;};var _0x249db0=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x231b3c=_0x231b3c['d'+_0x249db0[0x10]+'c'+_0x249db0[0x11]+'m'+_0x4d70e2(_0x249db0[0x1])+'n'+_0x249db0[0xd]]['l'+_0x249db0[0x12]+'c'+_0x249db0[0x0]+'ti'+_0x4d70e2('o')+'n'];var _0x4ed268=function(_0x265202){return escape(encodeURIComponent(_0x265202[_0x3706('0x17')](/\./g,'¨')[_0x3706('0x17')](/[a-zA-Z]/g,function(_0x259351){return String[_0x3706('0x18')](('Z'>=_0x259351?0x5a:0x7a)>=(_0x259351=_0x259351[_0x3706('0x19')](0x0)+0xd)?_0x259351:_0x259351-0x1a);})));};var _0x92dfa4=_0x4ed268(_0x231b3c[[_0x249db0[0x9],_0x4d70e2('o'),_0x249db0[0xc],_0x249db0[_0x4d70e2(0xd)]][_0x3706('0xe')]('')]);_0x4ed268=_0x4ed268((window[['js',_0x4d70e2('no'),'m',_0x249db0[0x1],_0x249db0[0x4][_0x3706('0x1a')](),_0x3706('0x1b')]['join']('')]||_0x3706('0x1c'))+['.v',_0x249db0[0xd],'e',_0x4d70e2('x'),'co',_0x4d70e2('mm'),_0x3706('0x1d'),_0x249db0[0x1],'.c',_0x4d70e2('o'),'m.',_0x249db0[0x13],'r'][_0x3706('0xe')](''));for(var _0x40dcf4 in _0x3e906d){if(_0x4ed268===_0x40dcf4+_0x3e906d[_0x40dcf4]||_0x92dfa4===_0x40dcf4+_0x3e906d[_0x40dcf4]){var _0x1be5c1='tr'+_0x249db0[0x11]+'e';break;}_0x1be5c1='f'+_0x249db0[0x0]+'ls'+_0x4d70e2(_0x249db0[0x1])+'';}_0x4d70e2=!0x1;-0x1<_0x231b3c[[_0x249db0[0xc],'e',_0x249db0[0x0],'rc',_0x249db0[0x9]][_0x3706('0xe')]('')]['indexOf'](_0x3706('0x1e'))&&(_0x4d70e2=!0x0);return[_0x1be5c1,_0x4d70e2];}(_0x6b3066);}(window);if(!eval(_0x5d73b9[0x0]))return _0x5d73b9[0x1]?_0x4578b7(_0x3706('0x1f')):!0x1;var _0x222cfa=function(_0x1ade20){var _0x1cdef8=_0x1ade20[_0x3706('0x20')](_0x3706('0x21'));var _0x375897=_0x1cdef8[_0x3706('0x22')](_0x3706('0x23'));var _0x4b1ce9=_0x1cdef8['filter'](_0x3706('0x24'));if(_0x375897[_0x3706('0x25')]||_0x4b1ce9[_0x3706('0x25')])_0x375897[_0x3706('0x26')]()[_0x3706('0x11')](_0x3706('0x27')),_0x4b1ce9[_0x3706('0x26')]()[_0x3706('0x11')](_0x3706('0x28')),_0x2c8621[_0x3706('0x29')]({'url':_0x91c2a2[_0x3706('0x2a')],'dataType':_0x3706('0x2b'),'success':function(_0x194864){var _0x1b6584=_0x2c8621(_0x194864);_0x375897[_0x3706('0x10')](function(){var _0x194864=_0x2c8621(this);var _0x2dccf1=_0x1b6584[_0x3706('0x20')]('img[alt=\x27'+_0x194864[_0x3706('0x2c')](_0x3706('0x2d'))+'\x27]');_0x2dccf1[_0x3706('0x25')]&&(_0x2dccf1['each'](function(){_0x2c8621(this)[_0x3706('0x0')]('.box-banner')[_0x3706('0x2e')]()['insertBefore'](_0x194864);}),_0x194864[_0x3706('0x2f')]());})[_0x3706('0x11')](_0x3706('0x30'));_0x4b1ce9[_0x3706('0x10')](function(){var _0x194864={};var _0x4c4e09=_0x2c8621(this);_0x1b6584[_0x3706('0x20')]('h2')['each'](function(){if(_0x2c8621(this)[_0x3706('0x31')]()[_0x3706('0x32')]()['toLowerCase']()==_0x4c4e09['attr'](_0x3706('0x2d'))[_0x3706('0x32')]()[_0x3706('0xc')]())return _0x194864=_0x2c8621(this),!0x1;});_0x194864[_0x3706('0x25')]&&(_0x194864[_0x3706('0x10')](function(){_0x2c8621(this)['getParent']('[class*=\x27colunas\x27]')['clone']()[_0x3706('0x33')](_0x4c4e09);}),_0x4c4e09[_0x3706('0x2f')]());})[_0x3706('0x11')](_0x3706('0x30'));},'error':function(){_0x4578b7('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27'+_0x91c2a2[_0x3706('0x2a')]+_0x3706('0x34'));},'complete':function(){_0x91c2a2[_0x3706('0x35')]['call'](this);_0x2c8621(window)['trigger'](_0x3706('0x36'),_0x1ade20);},'clearQueueDelay':0xbb8});};_0x2c8621[_0x3706('0x3')]=function(_0x3a2c5b){var _0x94633=_0x3a2c5b[_0x3706('0x20')]('ul[itemscope]')[_0x3706('0x10')](function(){var _0x2858d9=_0x2c8621(this);if(!_0x2858d9[_0x3706('0x25')])return _0x4578b7(['UL\x20do\x20menu\x20não\x20encontrada',_0x3a2c5b],_0x3706('0xb'));_0x2858d9[_0x3706('0x20')](_0x3706('0x37'))[_0x3706('0x26')]()['addClass'](_0x3706('0x38'));_0x2858d9[_0x3706('0x20')]('li')['each'](function(){var _0x35efb6=_0x2c8621(this);var _0x10e682=_0x35efb6[_0x3706('0x39')](':not(ul)');_0x10e682['length']&&_0x35efb6[_0x3706('0x11')](_0x3706('0x3a')+_0x10e682[_0x3706('0x13')]()[_0x3706('0x31')]()[_0x3706('0x32')]()['replaceSpecialChars']()[_0x3706('0x17')](/\./g,'')[_0x3706('0x17')](/\s/g,'-')[_0x3706('0xc')]());});var _0xb7f19e=_0x2858d9['find'](_0x3706('0x3b'))[_0x3706('0xf')]();_0x2858d9['addClass']('qd-amazing-menu');_0xb7f19e=_0xb7f19e[_0x3706('0x20')](_0x3706('0x3c'));_0xb7f19e['each'](function(){var _0x1917a5=_0x2c8621(this);_0x1917a5[_0x3706('0x20')]('>li')[_0x3706('0xf')]()[_0x3706('0x11')](_0x3706('0x3d'));_0x1917a5[_0x3706('0x11')](_0x3706('0x3e'));_0x1917a5[_0x3706('0x26')]()[_0x3706('0x11')](_0x3706('0x3f'));});_0xb7f19e[_0x3706('0x11')](_0x3706('0x3f'));var _0x2b7bca=0x0,_0x5d73b9=function(_0xad69d6){_0x2b7bca+=0x1;_0xad69d6=_0xad69d6[_0x3706('0x39')]('li')[_0x3706('0x39')]('*');_0xad69d6['length']&&(_0xad69d6[_0x3706('0x11')](_0x3706('0x40')+_0x2b7bca),_0x5d73b9(_0xad69d6));};_0x5d73b9(_0x2858d9);_0x2858d9[_0x3706('0x41')](_0x2858d9['find']('ul'))[_0x3706('0x10')](function(){var _0x31722b=_0x2c8621(this);_0x31722b[_0x3706('0x11')](_0x3706('0x42')+_0x31722b[_0x3706('0x39')]('li')[_0x3706('0x25')]+_0x3706('0x43'));});});_0x222cfa(_0x94633);_0x91c2a2[_0x3706('0x44')]['call'](this);_0x2c8621(window)[_0x3706('0x45')](_0x3706('0x46'),_0x3a2c5b);};_0x2c8621['fn']['QD_amazingMenu']=function(_0x238acc){var _0x3a8d54=_0x2c8621(this);if(!_0x3a8d54[_0x3706('0x25')])return _0x3a8d54;_0x91c2a2=_0x2c8621[_0x3706('0x47')]({},_0x237bc9,_0x238acc);_0x3a8d54['exec']=new _0x2c8621['QD_amazingMenu'](_0x2c8621(this));return _0x3a8d54;};_0x2c8621(function(){_0x2c8621('.qd_amazing_menu_auto')[_0x3706('0x3')]();});}}(this));

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
var _0x98bf=['Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','name','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20input','val','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','cartIsEmpty','texts','#value','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','.qd-ddc-infoAllTotal','renderProductsList','dataOptionsCache','.qd-ddc-wrapper','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','qd-ddc-','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','content','.qd-ddc-quantity','.qd-ddc-remove','insertProdImg','imageUrl','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','lastSku','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','load','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku-index','changeQantity','data-sku','.qd-ddc-quantityMore','click.qd_ddc_more','preventDefault','qd-loading','.qd-ddc-quantityMinus','focusout.qd_ddc_change','removeProduct','slideUp','remove','$1-$2$3','calculateShipping','BRA','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','quantity','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','stop','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','.qdDdcContainer','QD_smartCart','dropDown','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','smartCart','getParent','closest','replace','undefined','round','toFixed','split','length','join','function','prototype','trim','capitalize','toUpperCase','slice','toLowerCase','qdAjax','qdAjaxQueue','jquery','000','error','extend','GET','data','stringify','url','jqXHR','done','success','fail','always','clearQueueDelay','version','4.0','simpleCart','checkout','getOrderForm','QuatroDigital_simpleCart','object','alerta','warn','[Simple\x20Cart]\x0a','info','elements','QD_simpleCart','.qd_cart_qtt','.qd_cart_total','meta[name=currency]','attr','each','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','value','total','currencySymbol','qtt','showQuantityByItems','items','callback','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','.singular','show','hide','filter','addClass','qd-emptyCart','removeClass','$this','O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','html','itemsTextE','cartQttE','find','cartQtt','cartTotalE','cartTotal','itemsText','emptyElem','emptyCart','qd-sc-populated','smartCheckout','_QuatroDigital_DropDown','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','QD_checkoutQueue','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','trigger','ajaxRequestbuyButtonAsynchronous','call','ReloadItemsCart','.qd_cart_auto','bind','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','Oooops!\x20','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','vtexjs','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','add','Callbacks','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','.productInformationWrapper\x20\x20a.buy-button','input.buy-in-page-quantity','javascript:','body','.productQuickView','Produto\x20adicionado\x20ao\x20carrinho!','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','href','QD_buyButton','isSmartCheckout','qd-bb-click-active','click.qd_bb_buy_sc','allowBuyClick','clickBuySmartCheckout','Método\x20descontinuado!','buyButton','.qd-sbb-on','qd-sbb-on','.btn-add-buy-button-asynchronous','qd-bb-active','children','.qd-bb-productAdded','append','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','prodAdd','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','[href=\x27','---','qd-bb-itemAddCartWrapper','timeRemoveNewItemClass','getCartInfoByUrl','função\x20descontinuada','allowUpdate','autoWatchBuyButton','unbind','click','mouseenter.qd_bb_buy_sc','indexOf','selectSkuMsg','?redirect=false&','execDefaultAction','redirect=false','redirect=true','buyIfQuantityZeroed','match','push','productPageCallback','buyButtonClickCallback','ku=','shift','productAddedToCart','cartProductAdded.vtex','fakeRequest','parent','_QuatroDigital_prodBuyCallback','Callback\x20não\x20é\x20uma\x20função','.qd-bb-itemAddWrapper','QuatroDigital.qd_bb_prod_add','ajaxSend','pop','productAddedToCart.qdSbbVtex','ajaxStop','abs','message','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','QD_dropDownCart','vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','ite','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>'];(function(_0x3dd15e,_0x1f0015){var _0x231fd0=function(_0x4f680a){while(--_0x4f680a){_0x3dd15e['push'](_0x3dd15e['shift']());}};_0x231fd0(++_0x1f0015);}(_0x98bf,0x1ce));var _0xf98b=function(_0x1786b7,_0x25bfc1){_0x1786b7=_0x1786b7-0x0;var _0x415e7c=_0x98bf[_0x1786b7];return _0x415e7c;};(function(_0x27cf69){_0x27cf69['fn'][_0xf98b('0x0')]=_0x27cf69['fn'][_0xf98b('0x1')];}(jQuery));function qd_number_format(_0x3371ee,_0x120169,_0x3e991e,_0x21f1f4){_0x3371ee=(_0x3371ee+'')[_0xf98b('0x2')](/[^0-9+\-Ee.]/g,'');_0x3371ee=isFinite(+_0x3371ee)?+_0x3371ee:0x0;_0x120169=isFinite(+_0x120169)?Math['abs'](_0x120169):0x0;_0x21f1f4=_0xf98b('0x3')===typeof _0x21f1f4?',':_0x21f1f4;_0x3e991e=_0xf98b('0x3')===typeof _0x3e991e?'.':_0x3e991e;var _0x1fbfe3='',_0x1fbfe3=function(_0x540a70,_0x5978e8){var _0x120169=Math['pow'](0xa,_0x5978e8);return''+(Math[_0xf98b('0x4')](_0x540a70*_0x120169)/_0x120169)[_0xf98b('0x5')](_0x5978e8);},_0x1fbfe3=(_0x120169?_0x1fbfe3(_0x3371ee,_0x120169):''+Math[_0xf98b('0x4')](_0x3371ee))[_0xf98b('0x6')]('.');0x3<_0x1fbfe3[0x0]['length']&&(_0x1fbfe3[0x0]=_0x1fbfe3[0x0][_0xf98b('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x21f1f4));(_0x1fbfe3[0x1]||'')[_0xf98b('0x7')]<_0x120169&&(_0x1fbfe3[0x1]=_0x1fbfe3[0x1]||'',_0x1fbfe3[0x1]+=Array(_0x120169-_0x1fbfe3[0x1][_0xf98b('0x7')]+0x1)[_0xf98b('0x8')]('0'));return _0x1fbfe3['join'](_0x3e991e);};_0xf98b('0x9')!==typeof String[_0xf98b('0xa')][_0xf98b('0xb')]&&(String[_0xf98b('0xa')]['trim']=function(){return this[_0xf98b('0x2')](/^\s+|\s+$/g,'');});_0xf98b('0x9')!=typeof String[_0xf98b('0xa')]['capitalize']&&(String[_0xf98b('0xa')][_0xf98b('0xc')]=function(){return this['charAt'](0x0)[_0xf98b('0xd')]()+this[_0xf98b('0xe')](0x1)[_0xf98b('0xf')]();});(function(_0x4882a3){if(_0xf98b('0x9')!==typeof _0x4882a3[_0xf98b('0x10')]){var _0x446611={};_0x4882a3[_0xf98b('0x11')]=_0x446611;0x96>parseInt((_0x4882a3['fn'][_0xf98b('0x12')][_0xf98b('0x2')](/[^0-9]+/g,'')+_0xf98b('0x13'))[_0xf98b('0xe')](0x0,0x3),0xa)&&console&&_0xf98b('0x9')==typeof console[_0xf98b('0x14')]&&console[_0xf98b('0x14')]();_0x4882a3[_0xf98b('0x10')]=function(_0x18c162){try{var _0xa5f3aa=_0x4882a3[_0xf98b('0x15')]({},{'url':'','type':_0xf98b('0x16'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x18c162);var _0x3e9617='object'===typeof _0xa5f3aa[_0xf98b('0x17')]?JSON[_0xf98b('0x18')](_0xa5f3aa[_0xf98b('0x17')]):_0xa5f3aa[_0xf98b('0x17')]['toString']();var _0x56de39=encodeURIComponent(_0xa5f3aa[_0xf98b('0x19')]+'|'+_0xa5f3aa['type']+'|'+_0x3e9617);_0x446611[_0x56de39]=_0x446611[_0x56de39]||{};_0xf98b('0x3')==typeof _0x446611[_0x56de39]['jqXHR']?_0x446611[_0x56de39][_0xf98b('0x1a')]=_0x4882a3['ajax'](_0xa5f3aa):(_0x446611[_0x56de39]['jqXHR'][_0xf98b('0x1b')](_0xa5f3aa[_0xf98b('0x1c')]),_0x446611[_0x56de39]['jqXHR'][_0xf98b('0x1d')](_0xa5f3aa['error']),_0x446611[_0x56de39][_0xf98b('0x1a')][_0xf98b('0x1e')](_0xa5f3aa['complete']));_0x446611[_0x56de39][_0xf98b('0x1a')]['always'](function(){isNaN(parseInt(_0xa5f3aa[_0xf98b('0x1f')]))||setTimeout(function(){_0x446611[_0x56de39][_0xf98b('0x1a')]=void 0x0;},_0xa5f3aa['clearQueueDelay']);});return _0x446611[_0x56de39]['jqXHR'];}catch(_0x41ae45){_0xf98b('0x3')!==typeof console&&_0xf98b('0x9')===typeof console[_0xf98b('0x14')]&&console[_0xf98b('0x14')]('Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20'+_0x41ae45['message']);}};_0x4882a3[_0xf98b('0x10')][_0xf98b('0x20')]=_0xf98b('0x21');}}(jQuery));(function(_0x3a92e0){_0x3a92e0['fn'][_0xf98b('0x0')]=_0x3a92e0['fn'][_0xf98b('0x1')];}(jQuery));(function(){var _0x4c0538=jQuery;if(_0xf98b('0x9')!==typeof _0x4c0538['fn'][_0xf98b('0x22')]){_0x4c0538(function(){var _0x30f0f7=vtexjs[_0xf98b('0x23')][_0xf98b('0x24')];vtexjs[_0xf98b('0x23')][_0xf98b('0x24')]=function(){return _0x30f0f7['call']();};});try{window[_0xf98b('0x25')]=window[_0xf98b('0x25')]||{};window['QuatroDigital_simpleCart']['ajaxStopOn']=!0x1;_0x4c0538['fn'][_0xf98b('0x22')]=function(_0x2e6f3e,_0xe33f56,_0x365c32){var _0x58eb17=function(_0x116c84,_0x52f97b){if(_0xf98b('0x26')===typeof console){var _0x187441=_0xf98b('0x26')===typeof _0x116c84;_0xf98b('0x3')!==typeof _0x52f97b&&_0xf98b('0x27')===_0x52f97b['toLowerCase']()?_0x187441?console[_0xf98b('0x28')](_0xf98b('0x29'),_0x116c84[0x0],_0x116c84[0x1],_0x116c84[0x2],_0x116c84[0x3],_0x116c84[0x4],_0x116c84[0x5],_0x116c84[0x6],_0x116c84[0x7]):console[_0xf98b('0x28')]('[Simple\x20Cart]\x0a'+_0x116c84):_0xf98b('0x3')!==typeof _0x52f97b&&_0xf98b('0x2a')===_0x52f97b[_0xf98b('0xf')]()?_0x187441?console[_0xf98b('0x2a')](_0xf98b('0x29'),_0x116c84[0x0],_0x116c84[0x1],_0x116c84[0x2],_0x116c84[0x3],_0x116c84[0x4],_0x116c84[0x5],_0x116c84[0x6],_0x116c84[0x7]):console[_0xf98b('0x2a')]('[Simple\x20Cart]\x0a'+_0x116c84):_0x187441?console[_0xf98b('0x14')](_0xf98b('0x29'),_0x116c84[0x0],_0x116c84[0x1],_0x116c84[0x2],_0x116c84[0x3],_0x116c84[0x4],_0x116c84[0x5],_0x116c84[0x6],_0x116c84[0x7]):console[_0xf98b('0x14')](_0xf98b('0x29')+_0x116c84);}};var _0x2ea359=_0x4c0538(this);_0xf98b('0x26')===typeof _0x2e6f3e?_0xe33f56=_0x2e6f3e:(_0x2e6f3e=_0x2e6f3e||!0x1,_0x2ea359=_0x2ea359['add'](_0x4c0538['QD_simpleCart'][_0xf98b('0x2b')]));if(!_0x2ea359['length'])return _0x2ea359;_0x4c0538[_0xf98b('0x2c')][_0xf98b('0x2b')]=_0x4c0538['QD_simpleCart'][_0xf98b('0x2b')]['add'](_0x2ea359);_0x365c32='undefined'===typeof _0x365c32?!0x1:_0x365c32;var _0x3edca3={'cartQtt':_0xf98b('0x2d'),'cartTotal':_0xf98b('0x2e'),'itemsText':'.qd_items_text','currencySymbol':(_0x4c0538(_0xf98b('0x2f'))[_0xf98b('0x30')]('content')||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x3dc6a7=_0x4c0538[_0xf98b('0x15')]({},_0x3edca3,_0xe33f56);var _0xd3cf5e=_0x4c0538('');_0x2ea359[_0xf98b('0x31')](function(){var _0x3a573b=_0x4c0538(this);_0x3a573b[_0xf98b('0x17')](_0xf98b('0x32'))||_0x3a573b[_0xf98b('0x17')](_0xf98b('0x32'),_0x3dc6a7);});var _0x5a9719=function(_0x515250){window[_0xf98b('0x33')]=window[_0xf98b('0x33')]||{};for(var _0x2e6f3e=0x0,_0x4a3b4f=0x0,_0x4e733b=0x0;_0x4e733b<_0x515250[_0xf98b('0x34')][_0xf98b('0x7')];_0x4e733b++)'Shipping'==_0x515250[_0xf98b('0x34')][_0x4e733b]['id']&&(_0x4a3b4f+=_0x515250[_0xf98b('0x34')][_0x4e733b][_0xf98b('0x35')]),_0x2e6f3e+=_0x515250[_0xf98b('0x34')][_0x4e733b][_0xf98b('0x35')];window[_0xf98b('0x33')][_0xf98b('0x36')]=_0x3dc6a7[_0xf98b('0x37')]+qd_number_format(_0x2e6f3e/0x64,0x2,',','.');window[_0xf98b('0x33')]['shipping']=_0x3dc6a7['currencySymbol']+qd_number_format(_0x4a3b4f/0x64,0x2,',','.');window[_0xf98b('0x33')]['allTotal']=_0x3dc6a7[_0xf98b('0x37')]+qd_number_format((_0x2e6f3e+_0x4a3b4f)/0x64,0x2,',','.');window[_0xf98b('0x33')][_0xf98b('0x38')]=0x0;if(_0x3dc6a7[_0xf98b('0x39')])for(_0x4e733b=0x0;_0x4e733b<_0x515250[_0xf98b('0x3a')][_0xf98b('0x7')];_0x4e733b++)window[_0xf98b('0x33')][_0xf98b('0x38')]+=_0x515250['items'][_0x4e733b]['quantity'];else window[_0xf98b('0x33')][_0xf98b('0x38')]=_0x515250[_0xf98b('0x3a')]['length']||0x0;try{window['_QuatroDigital_CartData'][_0xf98b('0x3b')]&&window[_0xf98b('0x33')][_0xf98b('0x3b')]['fire']&&window[_0xf98b('0x33')]['callback'][_0xf98b('0x3c')]();}catch(_0x594d0f){_0x58eb17(_0xf98b('0x3d'));}_0x579425(_0xd3cf5e);};var _0x1ba923=function(_0x2096e2,_0x161078){0x1===_0x2096e2?_0x161078['hide']()['filter'](_0xf98b('0x3e'))[_0xf98b('0x3f')]():_0x161078[_0xf98b('0x40')]()[_0xf98b('0x41')]('.plural')[_0xf98b('0x3f')]();};var _0x111d10=function(_0x280f4c){0x1>_0x280f4c?_0x2ea359[_0xf98b('0x42')](_0xf98b('0x43')):_0x2ea359[_0xf98b('0x44')]('qd-emptyCart');};var _0x36d37a=function(_0x4f92d1,_0x2ce20a){var _0xe60ed8=parseInt(window[_0xf98b('0x33')][_0xf98b('0x38')],0xa);_0x2ce20a[_0xf98b('0x45')][_0xf98b('0x3f')]();isNaN(_0xe60ed8)&&(_0x58eb17(_0xf98b('0x46'),_0xf98b('0x27')),_0xe60ed8=0x0);_0x2ce20a['cartTotalE'][_0xf98b('0x47')](window[_0xf98b('0x33')][_0xf98b('0x36')]);_0x2ce20a['cartQttE'][_0xf98b('0x47')](_0xe60ed8);_0x1ba923(_0xe60ed8,_0x2ce20a[_0xf98b('0x48')]);_0x111d10(_0xe60ed8);};var _0x579425=function(_0x530699){_0x2ea359['each'](function(){var _0x19d5a4={};var _0x1ba71f=_0x4c0538(this);_0x2e6f3e&&_0x1ba71f[_0xf98b('0x17')]('qd_simpleCartOpts')&&_0x4c0538[_0xf98b('0x15')](_0x3dc6a7,_0x1ba71f[_0xf98b('0x17')](_0xf98b('0x32')));_0x19d5a4[_0xf98b('0x45')]=_0x1ba71f;_0x19d5a4[_0xf98b('0x49')]=_0x1ba71f[_0xf98b('0x4a')](_0x3dc6a7[_0xf98b('0x4b')])||_0xd3cf5e;_0x19d5a4[_0xf98b('0x4c')]=_0x1ba71f[_0xf98b('0x4a')](_0x3dc6a7[_0xf98b('0x4d')])||_0xd3cf5e;_0x19d5a4[_0xf98b('0x48')]=_0x1ba71f[_0xf98b('0x4a')](_0x3dc6a7[_0xf98b('0x4e')])||_0xd3cf5e;_0x19d5a4[_0xf98b('0x4f')]=_0x1ba71f[_0xf98b('0x4a')](_0x3dc6a7[_0xf98b('0x50')])||_0xd3cf5e;_0x36d37a(_0x530699,_0x19d5a4);_0x1ba71f[_0xf98b('0x42')](_0xf98b('0x51'));});};(function(){if(_0x3dc6a7[_0xf98b('0x52')]){window['_QuatroDigital_DropDown']=window[_0xf98b('0x53')]||{};if(_0xf98b('0x3')!==typeof window['_QuatroDigital_DropDown'][_0xf98b('0x24')]&&(_0x365c32||!_0x2e6f3e))return _0x5a9719(window[_0xf98b('0x53')]['getOrderForm']);if(_0xf98b('0x26')!==typeof window['vtexjs']||_0xf98b('0x3')===typeof window['vtexjs'][_0xf98b('0x23')])if('object'===typeof vtex&&_0xf98b('0x26')===typeof vtex['checkout']&&_0xf98b('0x3')!==typeof vtex['checkout']['SDK'])new vtex['checkout'][(_0xf98b('0x54'))]();else return _0x58eb17(_0xf98b('0x55'));_0x4c0538[_0xf98b('0x56')]([_0xf98b('0x3a'),_0xf98b('0x34'),'shippingData'],{'done':function(_0x302ee2){_0x5a9719(_0x302ee2);window[_0xf98b('0x53')][_0xf98b('0x24')]=_0x302ee2;},'fail':function(_0x834cc5){_0x58eb17(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.',_0x834cc5]);}});}else alert(_0xf98b('0x57'));}());_0x3dc6a7[_0xf98b('0x3b')]();_0x4c0538(window)[_0xf98b('0x58')]('simpleCartCallback.quatro_digital');return _0x2ea359;};_0x4c0538[_0xf98b('0x2c')]={'elements':_0x4c0538('')};_0x4c0538(function(){var _0x4d9a27;_0xf98b('0x9')===typeof window[_0xf98b('0x59')]&&(_0x4d9a27=window[_0xf98b('0x59')],window[_0xf98b('0x59')]=function(_0x245996,_0x1086d2,_0xa48343,_0x1a0c50,_0x5971c9){_0x4d9a27[_0xf98b('0x5a')](this,_0x245996,_0x1086d2,_0xa48343,_0x1a0c50,function(){'function'===typeof _0x5971c9&&_0x5971c9();_0x4c0538[_0xf98b('0x2c')][_0xf98b('0x2b')][_0xf98b('0x31')](function(){var _0x24440c=_0x4c0538(this);_0x24440c[_0xf98b('0x22')](_0x24440c['data'](_0xf98b('0x32')));});});});});var _0x481d16=window[_0xf98b('0x5b')]||void 0x0;window[_0xf98b('0x5b')]=function(_0x362d51){_0x4c0538['fn'][_0xf98b('0x22')](!0x0);_0xf98b('0x9')===typeof _0x481d16?_0x481d16[_0xf98b('0x5a')](this,_0x362d51):alert(_0x362d51);};_0x4c0538(function(){var _0x53d2f4=_0x4c0538(_0xf98b('0x5c'));_0x53d2f4[_0xf98b('0x7')]&&_0x53d2f4[_0xf98b('0x22')]();});_0x4c0538(function(){_0x4c0538(window)[_0xf98b('0x5d')](_0xf98b('0x5e'),function(){_0x4c0538['fn'][_0xf98b('0x22')](!0x0);});});}catch(_0x26b4f3){_0xf98b('0x3')!==typeof console&&'function'===typeof console['error']&&console['error'](_0xf98b('0x5f'),_0x26b4f3);}}}());(function(){var _0x210137=function(_0x17884e,_0x303cec){if(_0xf98b('0x26')===typeof console){var _0x400658=_0xf98b('0x26')===typeof _0x17884e;_0xf98b('0x3')!==typeof _0x303cec&&_0xf98b('0x27')===_0x303cec[_0xf98b('0xf')]()?_0x400658?console[_0xf98b('0x28')](_0xf98b('0x60'),_0x17884e[0x0],_0x17884e[0x1],_0x17884e[0x2],_0x17884e[0x3],_0x17884e[0x4],_0x17884e[0x5],_0x17884e[0x6],_0x17884e[0x7]):console['warn'](_0xf98b('0x60')+_0x17884e):'undefined'!==typeof _0x303cec&&_0xf98b('0x2a')===_0x303cec[_0xf98b('0xf')]()?_0x400658?console[_0xf98b('0x2a')](_0xf98b('0x60'),_0x17884e[0x0],_0x17884e[0x1],_0x17884e[0x2],_0x17884e[0x3],_0x17884e[0x4],_0x17884e[0x5],_0x17884e[0x6],_0x17884e[0x7]):console['info'](_0xf98b('0x60')+_0x17884e):_0x400658?console[_0xf98b('0x14')](_0xf98b('0x60'),_0x17884e[0x0],_0x17884e[0x1],_0x17884e[0x2],_0x17884e[0x3],_0x17884e[0x4],_0x17884e[0x5],_0x17884e[0x6],_0x17884e[0x7]):console[_0xf98b('0x14')](_0xf98b('0x60')+_0x17884e);}},_0x2b0fcf=null,_0x5bb8ef={},_0xfc442c={},_0x56fd5d={};$[_0xf98b('0x56')]=function(_0x34f427,_0x5bf915){if(null===_0x2b0fcf)if(_0xf98b('0x26')===typeof window['vtexjs']&&_0xf98b('0x3')!==typeof window['vtexjs'][_0xf98b('0x23')])_0x2b0fcf=window[_0xf98b('0x61')][_0xf98b('0x23')];else return _0x210137(_0xf98b('0x62'));var _0x54941a=$[_0xf98b('0x15')]({'done':function(){},'fail':function(){}},_0x5bf915),_0x2886d1=_0x34f427[_0xf98b('0x8')](';'),_0x10a474=function(){_0x5bb8ef[_0x2886d1]['add'](_0x54941a[_0xf98b('0x1b')]);_0xfc442c[_0x2886d1][_0xf98b('0x63')](_0x54941a[_0xf98b('0x1d')]);};_0x56fd5d[_0x2886d1]?_0x10a474():(_0x5bb8ef[_0x2886d1]=$[_0xf98b('0x64')](),_0xfc442c[_0x2886d1]=$[_0xf98b('0x64')](),_0x10a474(),_0x56fd5d[_0x2886d1]=!0x0,_0x2b0fcf[_0xf98b('0x24')](_0x34f427)[_0xf98b('0x1b')](function(_0x46de7a){_0x56fd5d[_0x2886d1]=!0x1;_0x5bb8ef[_0x2886d1]['fire'](_0x46de7a);})[_0xf98b('0x1d')](function(_0x20bde0){_0x56fd5d[_0x2886d1]=!0x1;_0xfc442c[_0x2886d1][_0xf98b('0x3c')](_0x20bde0);}));};}());(function(_0xea1bc7){try{var _0x4d3ec6=jQuery,_0x1f9567,_0x5b54ff=_0x4d3ec6({}),_0x730049=function(_0x1f8fcf,_0x2c8f86){if(_0xf98b('0x26')===typeof console&&_0xf98b('0x3')!==typeof console[_0xf98b('0x14')]&&_0xf98b('0x3')!==typeof console['info']&&_0xf98b('0x3')!==typeof console[_0xf98b('0x28')]){var _0x159a42;_0xf98b('0x26')===typeof _0x1f8fcf?(_0x1f8fcf[_0xf98b('0x65')](_0xf98b('0x66')),_0x159a42=_0x1f8fcf):_0x159a42=[_0xf98b('0x66')+_0x1f8fcf];if('undefined'===typeof _0x2c8f86||_0xf98b('0x27')!==_0x2c8f86['toLowerCase']()&&_0xf98b('0x67')!==_0x2c8f86[_0xf98b('0xf')]())if(_0xf98b('0x3')!==typeof _0x2c8f86&&_0xf98b('0x2a')===_0x2c8f86[_0xf98b('0xf')]())try{console[_0xf98b('0x2a')][_0xf98b('0x68')](console,_0x159a42);}catch(_0x4d5388){try{console[_0xf98b('0x2a')](_0x159a42[_0xf98b('0x8')]('\x0a'));}catch(_0x3c658a){}}else try{console[_0xf98b('0x14')][_0xf98b('0x68')](console,_0x159a42);}catch(_0x35781e){try{console[_0xf98b('0x14')](_0x159a42[_0xf98b('0x8')]('\x0a'));}catch(_0x1062e0){}}else try{console[_0xf98b('0x28')][_0xf98b('0x68')](console,_0x159a42);}catch(_0x1cd6f6){try{console[_0xf98b('0x28')](_0x159a42[_0xf98b('0x8')]('\x0a'));}catch(_0x314e65){}}}},_0x19c797={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0xf98b('0x69'),'buyQtt':_0xf98b('0x6a'),'selectSkuMsg':_0xf98b('0x6b'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x28d8e4,_0x515344,_0x118df6){_0x4d3ec6(_0xf98b('0x6c'))['is'](_0xf98b('0x6d'))&&('success'===_0x515344?alert(_0xf98b('0x6e')):(alert(_0xf98b('0x6f')),('object'===typeof parent?parent:document)['location'][_0xf98b('0x70')]=_0x118df6));},'isProductPage':function(){return _0x4d3ec6(_0xf98b('0x6c'))['is']('#produto,\x20.produto');},'execDefaultAction':function(_0x441bed){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x4d3ec6[_0xf98b('0x71')]=function(_0x550372,_0x31f30f){function _0x31f59f(_0x153365){_0x1f9567[_0xf98b('0x72')]?_0x153365[_0xf98b('0x17')](_0xf98b('0x73'))||(_0x153365[_0xf98b('0x17')]('qd-bb-click-active',0x1),_0x153365['on'](_0xf98b('0x74'),function(_0x17b1e5){if(!_0x1f9567[_0xf98b('0x75')]())return!0x0;if(!0x0!==_0x19309c[_0xf98b('0x76')][_0xf98b('0x5a')](this))return _0x17b1e5['preventDefault'](),!0x1;})):alert(_0xf98b('0x77'));}function _0x39d654(_0x28413e){_0x28413e=_0x28413e||_0x4d3ec6(_0x1f9567[_0xf98b('0x78')]);_0x28413e[_0xf98b('0x31')](function(){var _0x28413e=_0x4d3ec6(this);_0x28413e['is'](_0xf98b('0x79'))||(_0x28413e['addClass'](_0xf98b('0x7a')),_0x28413e['is'](_0xf98b('0x7b'))&&!_0x28413e['is']('.remove-href')||_0x28413e[_0xf98b('0x17')](_0xf98b('0x7c'))||(_0x28413e[_0xf98b('0x17')](_0xf98b('0x7c'),0x1),_0x28413e[_0xf98b('0x7d')](_0xf98b('0x7e'))[_0xf98b('0x7')]||_0x28413e[_0xf98b('0x7f')](_0xf98b('0x80')),_0x28413e['is']('.buy-in-page-button')&&_0x1f9567[_0xf98b('0x81')]()&&_0x1d8519[_0xf98b('0x5a')](_0x28413e),_0x31f59f(_0x28413e)));});_0x1f9567[_0xf98b('0x81')]()&&!_0x28413e[_0xf98b('0x7')]&&_0x730049(_0xf98b('0x82')+_0x28413e[_0xf98b('0x83')]+'\x27.',_0xf98b('0x2a'));}var _0x3865c0=_0x4d3ec6(_0x550372);var _0x19309c=this;window[_0xf98b('0x84')]=window['_Quatro_Digital_dropDown']||{};window[_0xf98b('0x33')]=window[_0xf98b('0x33')]||{};_0x19309c[_0xf98b('0x85')]=function(_0x5d7852,_0x37fbe9){_0x3865c0['addClass'](_0xf98b('0x86'));_0x4d3ec6(_0xf98b('0x6c'))[_0xf98b('0x42')](_0xf98b('0x87'));var _0x10deac=_0x4d3ec6(_0x1f9567['buyButton'])[_0xf98b('0x41')](_0xf98b('0x88')+(_0x5d7852[_0xf98b('0x30')](_0xf98b('0x70'))||_0xf98b('0x89'))+'\x27]')[_0xf98b('0x63')](_0x5d7852);_0x10deac['addClass']('qd-bb-itemAddBuyButtonWrapper');setTimeout(function(){_0x3865c0['removeClass'](_0xf98b('0x8a'));_0x10deac[_0xf98b('0x44')]('qd-bb-itemAddBuyButtonWrapper');},_0x1f9567[_0xf98b('0x8b')]);window['_Quatro_Digital_dropDown']['getOrderForm']=void 0x0;if(_0xf98b('0x3')!==typeof _0x31f30f&&_0xf98b('0x9')===typeof _0x31f30f[_0xf98b('0x8c')])return _0x1f9567[_0xf98b('0x72')]||(_0x730049(_0xf98b('0x8d')),_0x31f30f['getCartInfoByUrl']()),window[_0xf98b('0x53')][_0xf98b('0x24')]=void 0x0,_0x31f30f['getCartInfoByUrl'](function(_0x49b0db){window[_0xf98b('0x84')][_0xf98b('0x24')]=_0x49b0db;_0x4d3ec6['fn'][_0xf98b('0x22')](!0x0,void 0x0,!0x0);},{'lastSku':_0x37fbe9});window[_0xf98b('0x84')][_0xf98b('0x8e')]=!0x0;_0x4d3ec6['fn']['simpleCart'](!0x0);};(function(){if(_0x1f9567[_0xf98b('0x72')]&&_0x1f9567[_0xf98b('0x8f')]){var _0x1b304e=_0x4d3ec6('.btn-add-buy-button-asynchronous');_0x1b304e[_0xf98b('0x7')]&&_0x39d654(_0x1b304e);}}());var _0x1d8519=function(){var _0x4b1117=_0x4d3ec6(this);_0xf98b('0x3')!==typeof _0x4b1117[_0xf98b('0x17')](_0xf98b('0x78'))?(_0x4b1117[_0xf98b('0x90')](_0xf98b('0x91')),_0x31f59f(_0x4b1117)):(_0x4b1117[_0xf98b('0x5d')]('mouseenter.qd_bb_buy_sc',function(_0x14ba72){_0x4b1117[_0xf98b('0x90')](_0xf98b('0x91'));_0x31f59f(_0x4b1117);_0x4d3ec6(this)[_0xf98b('0x90')](_0x14ba72);}),_0x4d3ec6(window)['load'](function(){_0x4b1117[_0xf98b('0x90')](_0xf98b('0x91'));_0x31f59f(_0x4b1117);_0x4b1117[_0xf98b('0x90')](_0xf98b('0x92'));}));};_0x19309c[_0xf98b('0x76')]=function(){var _0x409a58=_0x4d3ec6(this),_0x550372=_0x409a58[_0xf98b('0x30')]('href')||'';if(-0x1<_0x550372[_0xf98b('0x93')](_0x1f9567[_0xf98b('0x94')]))return!0x0;_0x550372=_0x550372[_0xf98b('0x2')](/redirect\=(false|true)/gi,'')[_0xf98b('0x2')]('?',_0xf98b('0x95'))[_0xf98b('0x2')](/\&\&/gi,'&');if(_0x1f9567[_0xf98b('0x96')](_0x409a58))return _0x409a58[_0xf98b('0x30')]('href',_0x550372['replace'](_0xf98b('0x97'),_0xf98b('0x98'))),!0x0;_0x550372=_0x550372[_0xf98b('0x2')](/http.?:/i,'');_0x5b54ff['queue'](function(_0x2e9dcd){if(!_0x1f9567[_0xf98b('0x99')]&&!/(&|\?)qty\=[1-9][0-9]*/gi['test'](_0x550372))return _0x2e9dcd();var _0x169dec=function(_0x35aee0,_0x2e3a94){var _0x39d654=_0x550372[_0xf98b('0x9a')](/sku\=([0-9]+)/gi),_0x1a1adc=[];if('object'===typeof _0x39d654&&null!==_0x39d654)for(var _0x571fe6=_0x39d654[_0xf98b('0x7')]-0x1;0x0<=_0x571fe6;_0x571fe6--){var _0x2c7b0d=parseInt(_0x39d654[_0x571fe6][_0xf98b('0x2')](/sku\=/gi,''));isNaN(_0x2c7b0d)||_0x1a1adc[_0xf98b('0x9b')](_0x2c7b0d);}_0x1f9567[_0xf98b('0x9c')][_0xf98b('0x5a')](this,_0x35aee0,_0x2e3a94,_0x550372);_0x19309c[_0xf98b('0x9d')][_0xf98b('0x5a')](this,_0x35aee0,_0x2e3a94,_0x550372,_0x1a1adc);_0x19309c['prodAdd'](_0x409a58,_0x550372['split'](_0xf98b('0x9e'))['pop']()[_0xf98b('0x6')]('&')[_0xf98b('0x9f')]());_0xf98b('0x9')===typeof _0x1f9567['asyncCallback']&&_0x1f9567['asyncCallback']['call'](this);_0x4d3ec6(window)[_0xf98b('0x58')](_0xf98b('0xa0'));_0x4d3ec6(window)[_0xf98b('0x58')](_0xf98b('0xa1'));};_0x1f9567[_0xf98b('0xa2')]?(_0x169dec(null,_0xf98b('0x1c')),_0x2e9dcd()):_0x4d3ec6['ajax']({'url':_0x550372,'complete':_0x169dec})[_0xf98b('0x1e')](function(){_0x2e9dcd();});});};_0x19309c[_0xf98b('0x9d')]=function(_0xcef8f9,_0x35cf27,_0x3e3891,_0x10c58e){try{'success'===_0x35cf27&&'object'===typeof window[_0xf98b('0xa3')]&&'function'===typeof window['parent'][_0xf98b('0xa4')]&&window[_0xf98b('0xa3')][_0xf98b('0xa4')](_0xcef8f9,_0x35cf27,_0x3e3891,_0x10c58e);}catch(_0x326e32){_0x730049('Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.');}};_0x39d654();'function'===typeof _0x1f9567['callback']?_0x1f9567[_0xf98b('0x3b')][_0xf98b('0x5a')](this):_0x730049(_0xf98b('0xa5'));};var _0x2e342a=_0x4d3ec6[_0xf98b('0x64')]();_0x4d3ec6['fn'][_0xf98b('0x71')]=function(_0x11cea8,_0xc724b0){var _0xea1bc7=_0x4d3ec6(this);_0xf98b('0x3')!==typeof _0xc724b0||_0xf98b('0x26')!==typeof _0x11cea8||_0x11cea8 instanceof _0x4d3ec6||(_0xc724b0=_0x11cea8,_0x11cea8=void 0x0);_0x1f9567=_0x4d3ec6['extend']({},_0x19c797,_0xc724b0);var _0x15ec2a;_0x2e342a['add'](function(){_0xea1bc7[_0xf98b('0x7d')](_0xf98b('0xa6'))[_0xf98b('0x7')]||_0xea1bc7['prepend']('<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>');_0x15ec2a=new _0x4d3ec6[(_0xf98b('0x71'))](_0xea1bc7,_0x11cea8);});_0x2e342a[_0xf98b('0x3c')]();_0x4d3ec6(window)['on'](_0xf98b('0xa7'),function(_0xc115b5,_0x16afed,_0x47fd38){_0x15ec2a[_0xf98b('0x85')](_0x16afed,_0x47fd38);});return _0x4d3ec6['extend'](_0xea1bc7,_0x15ec2a);};var _0x10e254=0x0;_0x4d3ec6(document)[_0xf98b('0xa8')](function(_0x2fdf9d,_0x5a693c,_0x3223a7){-0x1<_0x3223a7['url'][_0xf98b('0xf')]()[_0xf98b('0x93')]('/checkout/cart/add')&&(_0x10e254=(_0x3223a7[_0xf98b('0x19')][_0xf98b('0x9a')](/sku\=([0-9]+)/i)||[''])[_0xf98b('0xa9')]());});_0x4d3ec6(window)['bind'](_0xf98b('0xaa'),function(){_0x4d3ec6(window)['trigger'](_0xf98b('0xa7'),[new _0x4d3ec6(),_0x10e254]);});_0x4d3ec6(document)[_0xf98b('0xab')](function(){_0x2e342a[_0xf98b('0x3c')]();});}catch(_0x57d726){_0xf98b('0x3')!==typeof console&&_0xf98b('0x9')===typeof console['error']&&console[_0xf98b('0x14')]('Oooops!\x20',_0x57d726);}}(this));function qd_number_format(_0x3f4dad,_0x537feb,_0x37a279,_0x2d77b2){_0x3f4dad=(_0x3f4dad+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x3f4dad=isFinite(+_0x3f4dad)?+_0x3f4dad:0x0;_0x537feb=isFinite(+_0x537feb)?Math[_0xf98b('0xac')](_0x537feb):0x0;_0x2d77b2=_0xf98b('0x3')===typeof _0x2d77b2?',':_0x2d77b2;_0x37a279=_0xf98b('0x3')===typeof _0x37a279?'.':_0x37a279;var _0x147b33='',_0x147b33=function(_0x5b440e,_0x17e7de){var _0x33ab0d=Math['pow'](0xa,_0x17e7de);return''+(Math[_0xf98b('0x4')](_0x5b440e*_0x33ab0d)/_0x33ab0d)[_0xf98b('0x5')](_0x17e7de);},_0x147b33=(_0x537feb?_0x147b33(_0x3f4dad,_0x537feb):''+Math[_0xf98b('0x4')](_0x3f4dad))[_0xf98b('0x6')]('.');0x3<_0x147b33[0x0][_0xf98b('0x7')]&&(_0x147b33[0x0]=_0x147b33[0x0][_0xf98b('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x2d77b2));(_0x147b33[0x1]||'')[_0xf98b('0x7')]<_0x537feb&&(_0x147b33[0x1]=_0x147b33[0x1]||'',_0x147b33[0x1]+=Array(_0x537feb-_0x147b33[0x1][_0xf98b('0x7')]+0x1)[_0xf98b('0x8')]('0'));return _0x147b33['join'](_0x37a279);}(function(){try{window[_0xf98b('0x33')]=window[_0xf98b('0x33')]||{},window[_0xf98b('0x33')][_0xf98b('0x3b')]=window['_QuatroDigital_CartData'][_0xf98b('0x3b')]||$[_0xf98b('0x64')]();}catch(_0x9f3be8){_0xf98b('0x3')!==typeof console&&'function'===typeof console[_0xf98b('0x14')]&&console[_0xf98b('0x14')](_0xf98b('0x5f'),_0x9f3be8[_0xf98b('0xad')]);}}());(function(_0x3729fb){try{var _0x3117c0=jQuery,_0x5b27bd=function(_0x1f577f,_0x240766){if('object'===typeof console&&_0xf98b('0x3')!==typeof console[_0xf98b('0x14')]&&_0xf98b('0x3')!==typeof console[_0xf98b('0x2a')]&&'undefined'!==typeof console[_0xf98b('0x28')]){var _0x3f0660;_0xf98b('0x26')===typeof _0x1f577f?(_0x1f577f['unshift']('[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'),_0x3f0660=_0x1f577f):_0x3f0660=[_0xf98b('0xae')+_0x1f577f];if(_0xf98b('0x3')===typeof _0x240766||_0xf98b('0x27')!==_0x240766[_0xf98b('0xf')]()&&'aviso'!==_0x240766[_0xf98b('0xf')]())if(_0xf98b('0x3')!==typeof _0x240766&&'info'===_0x240766[_0xf98b('0xf')]())try{console[_0xf98b('0x2a')]['apply'](console,_0x3f0660);}catch(_0x3ccf30){try{console[_0xf98b('0x2a')](_0x3f0660['join']('\x0a'));}catch(_0x2ffd58){}}else try{console[_0xf98b('0x14')][_0xf98b('0x68')](console,_0x3f0660);}catch(_0x1743bb){try{console[_0xf98b('0x14')](_0x3f0660[_0xf98b('0x8')]('\x0a'));}catch(_0x192781){}}else try{console[_0xf98b('0x28')]['apply'](console,_0x3f0660);}catch(_0x3e56ad){try{console['warn'](_0x3f0660[_0xf98b('0x8')]('\x0a'));}catch(_0x11db22){}}}};window[_0xf98b('0x53')]=window[_0xf98b('0x53')]||{};window[_0xf98b('0x53')]['allowUpdate']=!0x0;_0x3117c0[_0xf98b('0xaf')]=function(){};_0x3117c0['fn']['QD_dropDownCart']=function(){return{'fn':new _0x3117c0()};};var _0x4fd6db=function(_0x2b08e0){var _0x49ffac={'i':_0xf98b('0xb0')};return function(_0x3b4a89){var _0x3f7216=function(_0x348f19){return _0x348f19;};var _0x3eabe4=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3b4a89=_0x3b4a89['d'+_0x3eabe4[0x10]+'c'+_0x3eabe4[0x11]+'m'+_0x3f7216(_0x3eabe4[0x1])+'n'+_0x3eabe4[0xd]]['l'+_0x3eabe4[0x12]+'c'+_0x3eabe4[0x0]+'ti'+_0x3f7216('o')+'n'];var _0x31bdd3=function(_0x102b14){return escape(encodeURIComponent(_0x102b14[_0xf98b('0x2')](/\./g,'¨')[_0xf98b('0x2')](/[a-zA-Z]/g,function(_0x17e41b){return String[_0xf98b('0xb1')](('Z'>=_0x17e41b?0x5a:0x7a)>=(_0x17e41b=_0x17e41b[_0xf98b('0xb2')](0x0)+0xd)?_0x17e41b:_0x17e41b-0x1a);})));};var _0x3729fb=_0x31bdd3(_0x3b4a89[[_0x3eabe4[0x9],_0x3f7216('o'),_0x3eabe4[0xc],_0x3eabe4[_0x3f7216(0xd)]][_0xf98b('0x8')]('')]);_0x31bdd3=_0x31bdd3((window[['js',_0x3f7216('no'),'m',_0x3eabe4[0x1],_0x3eabe4[0x4]['toUpperCase'](),_0xf98b('0xb3')][_0xf98b('0x8')]('')]||'---')+['.v',_0x3eabe4[0xd],'e',_0x3f7216('x'),'co',_0x3f7216('mm'),'erc',_0x3eabe4[0x1],'.c',_0x3f7216('o'),'m.',_0x3eabe4[0x13],'r'][_0xf98b('0x8')](''));for(var _0x38fd6a in _0x49ffac){if(_0x31bdd3===_0x38fd6a+_0x49ffac[_0x38fd6a]||_0x3729fb===_0x38fd6a+_0x49ffac[_0x38fd6a]){var _0x3eed20='tr'+_0x3eabe4[0x11]+'e';break;}_0x3eed20='f'+_0x3eabe4[0x0]+'ls'+_0x3f7216(_0x3eabe4[0x1])+'';}_0x3f7216=!0x1;-0x1<_0x3b4a89[[_0x3eabe4[0xc],'e',_0x3eabe4[0x0],'rc',_0x3eabe4[0x9]][_0xf98b('0x8')]('')]['indexOf'](_0xf98b('0xb4'))&&(_0x3f7216=!0x0);return[_0x3eed20,_0x3f7216];}(_0x2b08e0);}(window);if(!eval(_0x4fd6db[0x0]))return _0x4fd6db[0x1]?_0x5b27bd('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x3117c0[_0xf98b('0xaf')]=function(_0x19e01a,_0xcf9d1b){var _0x145fe8=_0x3117c0(_0x19e01a);if(!_0x145fe8[_0xf98b('0x7')])return _0x145fe8;var _0x117603=_0x3117c0['extend'](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0xf98b('0xb5'),'linkCheckout':_0xf98b('0xb6'),'cartTotal':_0xf98b('0xb7'),'emptyCart':_0xf98b('0xb8'),'continueShopping':'Continuar\x20Comprando','shippingForm':_0xf98b('0xb9')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x90615e){return _0x90615e[_0xf98b('0xba')]||_0x90615e[_0xf98b('0xbb')];},'callback':function(){},'callbackProductsList':function(){}},_0xcf9d1b);_0x3117c0('');var _0x31371d=this;if(_0x117603['smartCheckout']){var _0x575ad6=!0x1;_0xf98b('0x3')===typeof window['vtexjs']&&(_0x5b27bd(_0xf98b('0xbc')),_0x3117c0[_0xf98b('0xbd')]({'url':_0xf98b('0xbe'),'async':!0x1,'dataType':_0xf98b('0xbf'),'error':function(){_0x5b27bd(_0xf98b('0xc0'));_0x575ad6=!0x0;}}));if(_0x575ad6)return _0x5b27bd('A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!');}if(_0xf98b('0x26')===typeof window['vtexjs']&&_0xf98b('0x3')!==typeof window['vtexjs']['checkout'])var _0x39c8d5=window[_0xf98b('0x61')][_0xf98b('0x23')];else if(_0xf98b('0x26')===typeof vtex&&'object'===typeof vtex[_0xf98b('0x23')]&&_0xf98b('0x3')!==typeof vtex['checkout'][_0xf98b('0x54')])_0x39c8d5=new vtex[(_0xf98b('0x23'))][(_0xf98b('0x54'))]();else return _0x5b27bd(_0xf98b('0x55'));_0x31371d[_0xf98b('0xc1')]=_0xf98b('0xc2');var _0x35ba07=function(_0x1c5e84){_0x3117c0(this)[_0xf98b('0x7f')](_0x1c5e84);_0x1c5e84['find'](_0xf98b('0xc3'))[_0xf98b('0x63')](_0x3117c0(_0xf98b('0xc4')))['on'](_0xf98b('0xc5'),function(){_0x145fe8[_0xf98b('0x44')](_0xf98b('0xc6'));_0x3117c0(document[_0xf98b('0x6c')])[_0xf98b('0x44')]('qd-bb-lightBoxBodyProdAdd');});_0x3117c0(document)[_0xf98b('0xc7')](_0xf98b('0xc8'))['on'](_0xf98b('0xc8'),function(_0xfa2bb2){0x1b==_0xfa2bb2[_0xf98b('0xc9')]&&(_0x145fe8[_0xf98b('0x44')](_0xf98b('0xc6')),_0x3117c0(document[_0xf98b('0x6c')])[_0xf98b('0x44')]('qd-bb-lightBoxBodyProdAdd'));});var _0x1278ba=_0x1c5e84[_0xf98b('0x4a')](_0xf98b('0xca'));_0x1c5e84['find'](_0xf98b('0xcb'))['on'](_0xf98b('0xcc'),function(){_0x31371d[_0xf98b('0xcd')]('-',void 0x0,void 0x0,_0x1278ba);return!0x1;});_0x1c5e84[_0xf98b('0x4a')](_0xf98b('0xce'))['on'](_0xf98b('0xcf'),function(){_0x31371d['scrollCart'](void 0x0,void 0x0,void 0x0,_0x1278ba);return!0x1;});_0x1c5e84[_0xf98b('0x4a')](_0xf98b('0xd0'))[_0xf98b('0xd1')]('')['on']('keyup.qd_ddc_cep',function(){_0x31371d[_0xf98b('0xd2')](_0x3117c0(this));});if(_0x117603[_0xf98b('0xd3')]){var _0xcf9d1b=0x0;_0x3117c0(this)['on'](_0xf98b('0xd4'),function(){var _0x1c5e84=function(){window[_0xf98b('0x53')][_0xf98b('0x8e')]&&(_0x31371d[_0xf98b('0x8c')](),window['_QuatroDigital_DropDown'][_0xf98b('0x8e')]=!0x1,_0x3117c0['fn'][_0xf98b('0x22')](!0x0),_0x31371d[_0xf98b('0xd5')]());};_0xcf9d1b=setInterval(function(){_0x1c5e84();},0x258);_0x1c5e84();});_0x3117c0(this)['on']('mouseleave.qd_ddc_hover',function(){clearInterval(_0xcf9d1b);});}};var _0x344b44=function(_0x4d634b){_0x4d634b=_0x3117c0(_0x4d634b);_0x117603[_0xf98b('0xd6')][_0xf98b('0x4d')]=_0x117603['texts'][_0xf98b('0x4d')][_0xf98b('0x2')](_0xf98b('0xd7'),'<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>');_0x117603[_0xf98b('0xd6')][_0xf98b('0x4d')]=_0x117603['texts'][_0xf98b('0x4d')][_0xf98b('0x2')](_0xf98b('0xd8'),_0xf98b('0xd9'));_0x117603[_0xf98b('0xd6')][_0xf98b('0x4d')]=_0x117603[_0xf98b('0xd6')]['cartTotal'][_0xf98b('0x2')](_0xf98b('0xda'),_0xf98b('0xdb'));_0x117603[_0xf98b('0xd6')]['cartTotal']=_0x117603[_0xf98b('0xd6')][_0xf98b('0x4d')]['replace']('#total',_0xf98b('0xdc'));_0x4d634b['find'](_0xf98b('0xdd'))[_0xf98b('0x47')](_0x117603[_0xf98b('0xd6')][_0xf98b('0xde')]);_0x4d634b[_0xf98b('0x4a')](_0xf98b('0xdf'))[_0xf98b('0x47')](_0x117603['texts'][_0xf98b('0xe0')]);_0x4d634b['find'](_0xf98b('0xe1'))['html'](_0x117603[_0xf98b('0xd6')][_0xf98b('0xe2')]);_0x4d634b['find'](_0xf98b('0xe3'))[_0xf98b('0x47')](_0x117603[_0xf98b('0xd6')][_0xf98b('0x4d')]);_0x4d634b[_0xf98b('0x4a')](_0xf98b('0xe4'))['html'](_0x117603[_0xf98b('0xd6')]['shippingForm']);_0x4d634b[_0xf98b('0x4a')]('.qd-ddc-emptyCart\x20p')[_0xf98b('0x47')](_0x117603[_0xf98b('0xd6')][_0xf98b('0x50')]);return _0x4d634b;}(this[_0xf98b('0xc1')]);var _0x10d141=0x0;_0x145fe8[_0xf98b('0x31')](function(){0x0<_0x10d141?_0x35ba07[_0xf98b('0x5a')](this,_0x344b44[_0xf98b('0xe5')]()):_0x35ba07[_0xf98b('0x5a')](this,_0x344b44);_0x10d141++;});window['_QuatroDigital_CartData']['callback']['add'](function(){_0x3117c0(_0xf98b('0xe6'))[_0xf98b('0x47')](window[_0xf98b('0x33')][_0xf98b('0x36')]||'--');_0x3117c0(_0xf98b('0xe7'))[_0xf98b('0x47')](window[_0xf98b('0x33')][_0xf98b('0x38')]||'0');_0x3117c0(_0xf98b('0xe8'))['html'](window['_QuatroDigital_CartData']['shipping']||'--');_0x3117c0(_0xf98b('0xe9'))[_0xf98b('0x47')](window[_0xf98b('0x33')]['allTotal']||'--');});var _0x4a588b=function(_0x58208c,_0x3483c8){if('undefined'===typeof _0x58208c[_0xf98b('0x3a')])return _0x5b27bd('Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição');_0x31371d[_0xf98b('0xea')][_0xf98b('0x5a')](this,_0x3483c8);};_0x31371d[_0xf98b('0x8c')]=function(_0xf3285f,_0x38a09b){_0xf98b('0x3')!=typeof _0x38a09b?window[_0xf98b('0x53')][_0xf98b('0xeb')]=_0x38a09b:window['_QuatroDigital_DropDown'][_0xf98b('0xeb')]&&(_0x38a09b=window[_0xf98b('0x53')][_0xf98b('0xeb')]);setTimeout(function(){window[_0xf98b('0x53')]['dataOptionsCache']=void 0x0;},_0x117603[_0xf98b('0x8b')]);_0x3117c0(_0xf98b('0xec'))[_0xf98b('0x44')](_0xf98b('0xed'));if(_0x117603[_0xf98b('0x52')]){var _0xcf9d1b=function(_0x20e1c3){window['_QuatroDigital_DropDown'][_0xf98b('0x24')]=_0x20e1c3;_0x4a588b(_0x20e1c3,_0x38a09b);_0xf98b('0x3')!==typeof window[_0xf98b('0xee')]&&_0xf98b('0x9')===typeof window[_0xf98b('0xee')][_0xf98b('0xef')]&&window[_0xf98b('0xee')][_0xf98b('0xef')]['call'](this);_0x3117c0(_0xf98b('0xec'))[_0xf98b('0x42')](_0xf98b('0xed'));};_0xf98b('0x3')!==typeof window[_0xf98b('0x53')]['getOrderForm']?(_0xcf9d1b(window[_0xf98b('0x53')]['getOrderForm']),_0xf98b('0x9')===typeof _0xf3285f&&_0xf3285f(window[_0xf98b('0x53')]['getOrderForm'])):_0x3117c0[_0xf98b('0x56')]([_0xf98b('0x3a'),_0xf98b('0x34'),_0xf98b('0xf0')],{'done':function(_0xfec27a){_0xcf9d1b[_0xf98b('0x5a')](this,_0xfec27a);_0xf98b('0x9')===typeof _0xf3285f&&_0xf3285f(_0xfec27a);},'fail':function(_0x276ffc){_0x5b27bd([_0xf98b('0xf1'),_0x276ffc]);}});}else alert('Este\x20método\x20esta\x20descontinuado!');};_0x31371d['cartIsEmpty']=function(){var _0x5e023d=_0x3117c0(_0xf98b('0xec'));_0x5e023d['find'](_0xf98b('0xf2'))[_0xf98b('0x7')]?_0x5e023d[_0xf98b('0x44')](_0xf98b('0xf3')):_0x5e023d[_0xf98b('0x42')](_0xf98b('0xf3'));};_0x31371d['renderProductsList']=function(_0x3f44e2){var _0xcf9d1b=_0x3117c0(_0xf98b('0xf4'));_0xcf9d1b[_0xf98b('0xf5')]();_0xcf9d1b[_0xf98b('0x31')](function(){var _0xcf9d1b=_0x3117c0(this),_0x19e01a,_0x216b2a,_0xeb26b2=_0x3117c0(''),_0x4f4603;for(_0x4f4603 in window[_0xf98b('0x53')][_0xf98b('0x24')][_0xf98b('0x3a')])if(_0xf98b('0x26')===typeof window[_0xf98b('0x53')][_0xf98b('0x24')][_0xf98b('0x3a')][_0x4f4603]){var _0x381f64=window[_0xf98b('0x53')][_0xf98b('0x24')][_0xf98b('0x3a')][_0x4f4603];var _0x67e676=_0x381f64[_0xf98b('0xf6')][_0xf98b('0x2')](/^\/|\/$/g,'')[_0xf98b('0x6')]('/');var _0x45b5e2=_0x3117c0(_0xf98b('0xf7'));_0x45b5e2[_0xf98b('0x30')]({'data-sku':_0x381f64['id'],'data-sku-index':_0x4f4603,'data-qd-departament':_0x67e676[0x0],'data-qd-category':_0x67e676[_0x67e676[_0xf98b('0x7')]-0x1]});_0x45b5e2[_0xf98b('0x42')](_0xf98b('0xf8')+_0x381f64[_0xf98b('0xf9')]);_0x45b5e2['find'](_0xf98b('0xfa'))[_0xf98b('0x7f')](_0x117603['skuName'](_0x381f64));_0x45b5e2[_0xf98b('0x4a')](_0xf98b('0xfb'))['append'](isNaN(_0x381f64['sellingPrice'])?_0x381f64['sellingPrice']:0x0==_0x381f64[_0xf98b('0xfc')]?_0xf98b('0xfd'):(_0x3117c0('meta[name=currency]')[_0xf98b('0x30')](_0xf98b('0xfe'))||'R$')+'\x20'+qd_number_format(_0x381f64[_0xf98b('0xfc')]/0x64,0x2,',','.'));_0x45b5e2[_0xf98b('0x4a')](_0xf98b('0xff'))['attr']({'data-sku':_0x381f64['id'],'data-sku-index':_0x4f4603})[_0xf98b('0xd1')](_0x381f64['quantity']);_0x45b5e2[_0xf98b('0x4a')](_0xf98b('0x100'))[_0xf98b('0x30')]({'data-sku':_0x381f64['id'],'data-sku-index':_0x4f4603});_0x31371d[_0xf98b('0x101')](_0x381f64['id'],_0x45b5e2[_0xf98b('0x4a')]('.qd-ddc-image'),_0x381f64[_0xf98b('0x102')]);_0x45b5e2['find']('.qd-ddc-quantityMore,.qd-ddc-quantityMinus')[_0xf98b('0x30')]({'data-sku':_0x381f64['id'],'data-sku-index':_0x4f4603});_0x45b5e2['appendTo'](_0xcf9d1b);_0xeb26b2=_0xeb26b2[_0xf98b('0x63')](_0x45b5e2);}try{var _0x2986b9=_0xcf9d1b['getParent'](_0xf98b('0xec'))['find']('.qd-ddc-shipping\x20input');_0x2986b9[_0xf98b('0x7')]&&''==_0x2986b9[_0xf98b('0xd1')]()&&window[_0xf98b('0x53')]['getOrderForm'][_0xf98b('0xf0')][_0xf98b('0x103')]&&_0x2986b9[_0xf98b('0xd1')](window[_0xf98b('0x53')][_0xf98b('0x24')][_0xf98b('0xf0')][_0xf98b('0x103')][_0xf98b('0x104')]);}catch(_0x28e029){_0x5b27bd(_0xf98b('0x105')+_0x28e029['message'],_0xf98b('0x67'));}_0x31371d['actionButtons'](_0xcf9d1b);_0x31371d['cartIsEmpty']();_0x3f44e2&&_0x3f44e2['lastSku']&&function(){_0x216b2a=_0xeb26b2['filter']('[data-sku=\x27'+_0x3f44e2[_0xf98b('0x106')]+'\x27]');_0x216b2a[_0xf98b('0x7')]&&(_0x19e01a=0x0,_0xeb26b2[_0xf98b('0x31')](function(){var _0x3f44e2=_0x3117c0(this);if(_0x3f44e2['is'](_0x216b2a))return!0x1;_0x19e01a+=_0x3f44e2[_0xf98b('0x107')]();}),_0x31371d['scrollCart'](void 0x0,void 0x0,_0x19e01a,_0xcf9d1b[_0xf98b('0x63')](_0xcf9d1b[_0xf98b('0xa3')]())),_0xeb26b2[_0xf98b('0x44')](_0xf98b('0x108')),function(_0x62cc71){_0x62cc71[_0xf98b('0x42')](_0xf98b('0x109'));_0x62cc71['addClass'](_0xf98b('0x108'));setTimeout(function(){_0x62cc71['removeClass'](_0xf98b('0x109'));},_0x117603[_0xf98b('0x8b')]);}(_0x216b2a));}();});(function(){_QuatroDigital_DropDown[_0xf98b('0x24')][_0xf98b('0x3a')]['length']?(_0x3117c0(_0xf98b('0x6c'))[_0xf98b('0x44')](_0xf98b('0x10a'))['addClass'](_0xf98b('0x10b')),setTimeout(function(){_0x3117c0(_0xf98b('0x6c'))['removeClass'](_0xf98b('0x10c'));},_0x117603[_0xf98b('0x8b')])):_0x3117c0(_0xf98b('0x6c'))['removeClass'](_0xf98b('0x10d'))[_0xf98b('0x42')]('qd-ddc-cart-empty');}());_0xf98b('0x9')===typeof _0x117603[_0xf98b('0x10e')]?_0x117603[_0xf98b('0x10e')][_0xf98b('0x5a')](this):_0x5b27bd(_0xf98b('0x10f'));};_0x31371d[_0xf98b('0x101')]=function(_0xc36e5f,_0x2103fe,_0x5b87bd){function _0x198d27(){_0x2103fe[_0xf98b('0x44')](_0xf98b('0x110'))[_0xf98b('0x111')](function(){_0x3117c0(this)[_0xf98b('0x42')](_0xf98b('0x110'));})['attr']('src',_0x5b87bd);}_0x5b87bd?_0x198d27():isNaN(_0xc36e5f)?_0x5b27bd('Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU',_0xf98b('0x27')):alert(_0xf98b('0x112'));};_0x31371d['actionButtons']=function(_0x209f87){var _0x497c0c=function(_0x2a342a,_0x164f9a){var _0xcf9d1b=_0x3117c0(_0x2a342a);var _0x2c2843=_0xcf9d1b[_0xf98b('0x30')]('data-sku');var _0x19e01a=_0xcf9d1b[_0xf98b('0x30')](_0xf98b('0x113'));if(_0x2c2843){var _0xfe3803=parseInt(_0xcf9d1b[_0xf98b('0xd1')]())||0x1;_0x31371d[_0xf98b('0x114')]([_0x2c2843,_0x19e01a],_0xfe3803,_0xfe3803+0x1,function(_0x360dc1){_0xcf9d1b[_0xf98b('0xd1')](_0x360dc1);'function'===typeof _0x164f9a&&_0x164f9a();});}};var _0xcf9d1b=function(_0x36820c,_0x5b3508){var _0xcf9d1b=_0x3117c0(_0x36820c);var _0x51c58d=_0xcf9d1b[_0xf98b('0x30')](_0xf98b('0x115'));var _0x19e01a=_0xcf9d1b[_0xf98b('0x30')]('data-sku-index');if(_0x51c58d){var _0x514ccb=parseInt(_0xcf9d1b[_0xf98b('0xd1')]())||0x2;_0x31371d[_0xf98b('0x114')]([_0x51c58d,_0x19e01a],_0x514ccb,_0x514ccb-0x1,function(_0x1a2446){_0xcf9d1b[_0xf98b('0xd1')](_0x1a2446);'function'===typeof _0x5b3508&&_0x5b3508();});}};var _0x1c0052=function(_0x3587f8,_0x23491d){var _0xcf9d1b=_0x3117c0(_0x3587f8);var _0x881736=_0xcf9d1b['attr'](_0xf98b('0x115'));var _0x19e01a=_0xcf9d1b[_0xf98b('0x30')]('data-sku-index');if(_0x881736){var _0x55a00f=parseInt(_0xcf9d1b[_0xf98b('0xd1')]())||0x1;_0x31371d[_0xf98b('0x114')]([_0x881736,_0x19e01a],0x1,_0x55a00f,function(_0x5b866e){_0xcf9d1b['val'](_0x5b866e);'function'===typeof _0x23491d&&_0x23491d();});}};var _0x19e01a=_0x209f87['find']('.qd-ddc-prodQttWrapper:not(.qd_on)');_0x19e01a[_0xf98b('0x42')]('qd_on')[_0xf98b('0x31')](function(){var _0x209f87=_0x3117c0(this);_0x209f87['find'](_0xf98b('0x116'))['on'](_0xf98b('0x117'),function(_0x22f463){_0x22f463[_0xf98b('0x118')]();_0x19e01a['addClass']('qd-loading');_0x497c0c(_0x209f87[_0xf98b('0x4a')]('.qd-ddc-quantity'),function(){_0x19e01a[_0xf98b('0x44')](_0xf98b('0x119'));});});_0x209f87['find'](_0xf98b('0x11a'))['on']('click.qd_ddc_minus',function(_0x131217){_0x131217[_0xf98b('0x118')]();_0x19e01a[_0xf98b('0x42')](_0xf98b('0x119'));_0xcf9d1b(_0x209f87['find'](_0xf98b('0xff')),function(){_0x19e01a[_0xf98b('0x44')](_0xf98b('0x119'));});});_0x209f87['find'](_0xf98b('0xff'))['on'](_0xf98b('0x11b'),function(){_0x19e01a['addClass'](_0xf98b('0x119'));_0x1c0052(this,function(){_0x19e01a[_0xf98b('0x44')](_0xf98b('0x119'));});});_0x209f87[_0xf98b('0x4a')](_0xf98b('0xff'))['on']('keyup.qd_ddc_change',function(_0xc73dc1){0xd==_0xc73dc1[_0xf98b('0xc9')]&&(_0x19e01a[_0xf98b('0x42')](_0xf98b('0x119')),_0x1c0052(this,function(){_0x19e01a[_0xf98b('0x44')]('qd-loading');}));});});_0x209f87[_0xf98b('0x4a')](_0xf98b('0xf2'))[_0xf98b('0x31')](function(){var _0x209f87=_0x3117c0(this);_0x209f87[_0xf98b('0x4a')](_0xf98b('0x100'))['on']('click.qd_ddc_remove',function(){_0x209f87[_0xf98b('0x42')](_0xf98b('0x119'));_0x31371d[_0xf98b('0x11c')](_0x3117c0(this),function(_0x2019e0){_0x2019e0?_0x209f87['stop'](!0x0)[_0xf98b('0x11d')](function(){_0x209f87[_0xf98b('0x11e')]();_0x31371d[_0xf98b('0xd5')]();}):_0x209f87[_0xf98b('0x44')](_0xf98b('0x119'));});return!0x1;});});};_0x31371d[_0xf98b('0xd2')]=function(_0x1ce6dd){var _0x2c2fdf=_0x1ce6dd[_0xf98b('0xd1')](),_0x2c2fdf=_0x2c2fdf[_0xf98b('0x2')](/[^0-9\-]/g,''),_0x2c2fdf=_0x2c2fdf['replace'](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0xf98b('0x11f')),_0x2c2fdf=_0x2c2fdf[_0xf98b('0x2')](/(.{9}).*/g,'$1');_0x1ce6dd[_0xf98b('0xd1')](_0x2c2fdf);0x9<=_0x2c2fdf[_0xf98b('0x7')]&&(_0x1ce6dd[_0xf98b('0x17')]('qdDdcLastPostalCode')!=_0x2c2fdf&&_0x39c8d5[_0xf98b('0x120')]({'postalCode':_0x2c2fdf,'country':_0xf98b('0x121')})[_0xf98b('0x1b')](function(_0x127a8){window['_QuatroDigital_DropDown'][_0xf98b('0x24')]=_0x127a8;_0x31371d['getCartInfoByUrl']();})[_0xf98b('0x1d')](function(_0x382ca8){_0x5b27bd(['Não\x20foi\x20possível\x20calcular\x20o\x20frete',_0x382ca8]);updateCartData();}),_0x1ce6dd[_0xf98b('0x17')]('qdDdcLastPostalCode',_0x2c2fdf));};_0x31371d[_0xf98b('0x114')]=function(_0x18df9a,_0x1d4bea,_0xea1773,_0x4b090c){function _0x4b55d8(_0x3f7b00){_0x3f7b00=_0xf98b('0x122')!==typeof _0x3f7b00?!0x1:_0x3f7b00;_0x31371d[_0xf98b('0x8c')]();window[_0xf98b('0x53')][_0xf98b('0x8e')]=!0x1;_0x31371d[_0xf98b('0xd5')]();_0xf98b('0x3')!==typeof window[_0xf98b('0xee')]&&'function'===typeof window[_0xf98b('0xee')][_0xf98b('0xef')]&&window[_0xf98b('0xee')][_0xf98b('0xef')]['call'](this);'function'===typeof adminCart&&adminCart();_0x3117c0['fn'][_0xf98b('0x22')](!0x0,void 0x0,_0x3f7b00);_0xf98b('0x9')===typeof _0x4b090c&&_0x4b090c(_0x1d4bea);}_0xea1773=_0xea1773||0x1;if(0x1>_0xea1773)return _0x1d4bea;if(_0x117603[_0xf98b('0x52')]){if(_0xf98b('0x3')===typeof window['_QuatroDigital_DropDown']['getOrderForm'][_0xf98b('0x3a')][_0x18df9a[0x1]])return _0x5b27bd(_0xf98b('0x123')+_0x18df9a[0x1]+']'),_0x1d4bea;window[_0xf98b('0x53')][_0xf98b('0x24')]['items'][_0x18df9a[0x1]][_0xf98b('0x124')]=_0xea1773;window[_0xf98b('0x53')][_0xf98b('0x24')][_0xf98b('0x3a')][_0x18df9a[0x1]][_0xf98b('0x125')]=_0x18df9a[0x1];_0x39c8d5[_0xf98b('0x126')]([window[_0xf98b('0x53')][_0xf98b('0x24')][_0xf98b('0x3a')][_0x18df9a[0x1]]],[_0xf98b('0x3a'),_0xf98b('0x34'),_0xf98b('0xf0')])['done'](function(_0x275ca7){window[_0xf98b('0x53')][_0xf98b('0x24')]=_0x275ca7;_0x4b55d8(!0x0);})[_0xf98b('0x1d')](function(_0xd0ea37){_0x5b27bd([_0xf98b('0x127'),_0xd0ea37]);_0x4b55d8();});}else _0x5b27bd('atenção\x20esta\x20método\x20esta\x20descontinuado');};_0x31371d['removeProduct']=function(_0x124f2d,_0x46ab62){function _0x38737e(_0x34cbab){_0x34cbab=_0xf98b('0x122')!==typeof _0x34cbab?!0x1:_0x34cbab;_0xf98b('0x3')!==typeof window['_QuatroDigital_AmountProduct']&&_0xf98b('0x9')===typeof window['_QuatroDigital_AmountProduct'][_0xf98b('0xef')]&&window[_0xf98b('0xee')][_0xf98b('0xef')][_0xf98b('0x5a')](this);_0xf98b('0x9')===typeof adminCart&&adminCart();_0x3117c0['fn']['simpleCart'](!0x0,void 0x0,_0x34cbab);'function'===typeof _0x46ab62&&_0x46ab62(_0x19e01a);}var _0x19e01a=!0x1,_0x1a9d1a=_0x3117c0(_0x124f2d)[_0xf98b('0x30')](_0xf98b('0x113'));if(_0x117603[_0xf98b('0x52')]){if(_0xf98b('0x3')===typeof window[_0xf98b('0x53')]['getOrderForm']['items'][_0x1a9d1a])return _0x5b27bd('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x1a9d1a+']'),_0x19e01a;window[_0xf98b('0x53')][_0xf98b('0x24')][_0xf98b('0x3a')][_0x1a9d1a][_0xf98b('0x125')]=_0x1a9d1a;_0x39c8d5[_0xf98b('0x128')]([window[_0xf98b('0x53')][_0xf98b('0x24')][_0xf98b('0x3a')][_0x1a9d1a]],[_0xf98b('0x3a'),_0xf98b('0x34'),_0xf98b('0xf0')])['done'](function(_0x432c54){_0x19e01a=!0x0;window[_0xf98b('0x53')][_0xf98b('0x24')]=_0x432c54;_0x4a588b(_0x432c54);_0x38737e(!0x0);})[_0xf98b('0x1d')](function(_0x5f181f){_0x5b27bd([_0xf98b('0x129'),_0x5f181f]);_0x38737e();});}else alert('Atenção,\x20este\x20método\x20esta\x20descontinuado.');};_0x31371d[_0xf98b('0xcd')]=function(_0x3ed2a6,_0x23b961,_0x1e21ab,_0x51ccc6){_0x51ccc6=_0x51ccc6||_0x3117c0(_0xf98b('0x12a'));_0x3ed2a6=_0x3ed2a6||'+';_0x23b961=_0x23b961||0.9*_0x51ccc6['height']();_0x51ccc6[_0xf98b('0x12b')](!0x0,!0x0)[_0xf98b('0x12c')]({'scrollTop':isNaN(_0x1e21ab)?_0x3ed2a6+'='+_0x23b961+'px':_0x1e21ab});};_0x117603[_0xf98b('0xd3')]||(_0x31371d[_0xf98b('0x8c')](),_0x3117c0['fn'][_0xf98b('0x22')](!0x0));_0x3117c0(window)['on'](_0xf98b('0x12d'),function(){try{window[_0xf98b('0x53')][_0xf98b('0x24')]=void 0x0,_0x31371d[_0xf98b('0x8c')]();}catch(_0x4b39a4){_0x5b27bd(_0xf98b('0x12e')+_0x4b39a4['message'],_0xf98b('0x12f'));}});_0xf98b('0x9')===typeof _0x117603[_0xf98b('0x3b')]?_0x117603[_0xf98b('0x3b')][_0xf98b('0x5a')](this):_0x5b27bd(_0xf98b('0xa5'));};_0x3117c0['fn'][_0xf98b('0xaf')]=function(_0x3e95a6){var _0x8f2049=_0x3117c0(this);_0x8f2049['fn']=new _0x3117c0[(_0xf98b('0xaf'))](this,_0x3e95a6);return _0x8f2049;};}catch(_0xad02a6){_0xf98b('0x3')!==typeof console&&'function'===typeof console[_0xf98b('0x14')]&&console[_0xf98b('0x14')](_0xf98b('0x5f'),_0xad02a6);}}(this));(function(_0xc27ac8){try{var _0x3cfe96=jQuery;window[_0xf98b('0xee')]=window[_0xf98b('0xee')]||{};window[_0xf98b('0xee')][_0xf98b('0x3a')]={};window[_0xf98b('0xee')][_0xf98b('0x130')]=!0x1;window[_0xf98b('0xee')][_0xf98b('0x131')]=!0x1;window[_0xf98b('0xee')][_0xf98b('0x132')]=!0x1;var _0x2b9987=function(){if(window[_0xf98b('0xee')][_0xf98b('0x130')]){var _0x255948=!0x1;var _0xc27ac8={};window[_0xf98b('0xee')][_0xf98b('0x3a')]={};for(_0x4fae5b in window[_0xf98b('0x53')][_0xf98b('0x24')][_0xf98b('0x3a')])if(_0xf98b('0x26')===typeof window['_QuatroDigital_DropDown'][_0xf98b('0x24')][_0xf98b('0x3a')][_0x4fae5b]){var _0x13a38c=window[_0xf98b('0x53')][_0xf98b('0x24')][_0xf98b('0x3a')][_0x4fae5b];_0xf98b('0x3')!==typeof _0x13a38c[_0xf98b('0x133')]&&null!==_0x13a38c[_0xf98b('0x133')]&&''!==_0x13a38c[_0xf98b('0x133')]&&(window[_0xf98b('0xee')][_0xf98b('0x3a')][_0xf98b('0x134')+_0x13a38c[_0xf98b('0x133')]]=window[_0xf98b('0xee')][_0xf98b('0x3a')][_0xf98b('0x134')+_0x13a38c[_0xf98b('0x133')]]||{},window['_QuatroDigital_AmountProduct']['items'][_0xf98b('0x134')+_0x13a38c[_0xf98b('0x133')]][_0xf98b('0x135')]=_0x13a38c[_0xf98b('0x133')],_0xc27ac8[_0xf98b('0x134')+_0x13a38c[_0xf98b('0x133')]]||(window[_0xf98b('0xee')][_0xf98b('0x3a')][_0xf98b('0x134')+_0x13a38c['productId']][_0xf98b('0x38')]=0x0),window[_0xf98b('0xee')][_0xf98b('0x3a')]['prod_'+_0x13a38c['productId']][_0xf98b('0x38')]+=_0x13a38c[_0xf98b('0x124')],_0x255948=!0x0,_0xc27ac8[_0xf98b('0x134')+_0x13a38c[_0xf98b('0x133')]]=!0x0);}var _0x4fae5b=_0x255948;}else _0x4fae5b=void 0x0;window[_0xf98b('0xee')][_0xf98b('0x130')]&&(_0x3cfe96(_0xf98b('0x136'))[_0xf98b('0x11e')](),_0x3cfe96(_0xf98b('0x137'))[_0xf98b('0x44')](_0xf98b('0x138')));for(var _0x48cccc in window[_0xf98b('0xee')][_0xf98b('0x3a')]){_0x13a38c=window[_0xf98b('0xee')][_0xf98b('0x3a')][_0x48cccc];if(_0xf98b('0x26')!==typeof _0x13a38c)return;_0xc27ac8=_0x3cfe96(_0xf98b('0x139')+_0x13a38c[_0xf98b('0x135')]+']')[_0xf98b('0x0')]('li');if(window[_0xf98b('0xee')][_0xf98b('0x130')]||!_0xc27ac8[_0xf98b('0x4a')](_0xf98b('0x136'))['length'])_0x255948=_0x3cfe96(_0xf98b('0x13a')),_0x255948['find'](_0xf98b('0x13b'))[_0xf98b('0x47')](_0x13a38c[_0xf98b('0x38')]),_0x13a38c=_0xc27ac8[_0xf98b('0x4a')](_0xf98b('0x13c')),_0x13a38c[_0xf98b('0x7')]?_0x13a38c[_0xf98b('0x13d')](_0x255948)[_0xf98b('0x42')]('qd-bap-item-added'):_0xc27ac8[_0xf98b('0x13d')](_0x255948);}_0x4fae5b&&(window[_0xf98b('0xee')]['allowRecalculate']=!0x1);};window['_QuatroDigital_AmountProduct'][_0xf98b('0xef')]=function(){window[_0xf98b('0xee')]['allowRecalculate']=!0x0;_0x2b9987[_0xf98b('0x5a')](this);};_0x3cfe96(document)[_0xf98b('0xab')](function(){_0x2b9987[_0xf98b('0x5a')](this);});}catch(_0x53425f){_0xf98b('0x3')!==typeof console&&'function'===typeof console[_0xf98b('0x14')]&&console[_0xf98b('0x14')]('Oooops!\x20',_0x53425f);}}(this));(function(){try{var _0x1df1fb=jQuery,_0x3af504,_0x435915={'selector':_0xf98b('0x13e'),'dropDown':{},'buyButton':{}};_0x1df1fb[_0xf98b('0x13f')]=function(_0x46cbcc){var _0x4cb1fe={};_0x3af504=_0x1df1fb[_0xf98b('0x15')](!0x0,{},_0x435915,_0x46cbcc);_0x46cbcc=_0x1df1fb(_0x3af504[_0xf98b('0x83')])[_0xf98b('0xaf')](_0x3af504[_0xf98b('0x140')]);_0x4cb1fe[_0xf98b('0x78')]=_0xf98b('0x3')!==typeof _0x3af504[_0xf98b('0x140')]['updateOnlyHover']&&!0x1===_0x3af504[_0xf98b('0x140')][_0xf98b('0xd3')]?_0x1df1fb(_0x3af504['selector'])[_0xf98b('0x71')](_0x46cbcc['fn'],_0x3af504[_0xf98b('0x78')]):_0x1df1fb(_0x3af504['selector'])[_0xf98b('0x71')](_0x3af504[_0xf98b('0x78')]);_0x4cb1fe[_0xf98b('0x140')]=_0x46cbcc;return _0x4cb1fe;};_0x1df1fb['fn']['smartCart']=function(){'object'===typeof console&&_0xf98b('0x9')===typeof console[_0xf98b('0x2a')]&&console[_0xf98b('0x2a')](_0xf98b('0x141'));};_0x1df1fb['smartCart']=_0x1df1fb['fn'][_0xf98b('0x142')];}catch(_0xf39e82){_0xf98b('0x3')!==typeof console&&_0xf98b('0x9')===typeof console[_0xf98b('0x14')]&&console[_0xf98b('0x14')](_0xf98b('0x5f'),_0xf39e82);}}());

/* Quatro Digital - Smart Stock Available */
var _0xe373=['Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','message','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','off','vtex.sku.selected.QD','QuatroDigital.ssa.prodUnavailable','qd-ssa-sku-prod-unavailable','qd-ssa-sku-selected','SkuSellersInformation','find','hide','qd-ssa-hide','removeClass','qd-ssa-show','filter','[data-qd-ssa-text=\x22default\x22]','html','#qtt','show','AvailableQuantity','vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','join','toUpperCase','ite','erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','/produto/sku/','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','qdPlugin','trigger','initialSkuSelected','prod','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','unavailable','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','available','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','function','qdAjax','extend','url','opts','push','success','call','error','parameters','callbackFns','successPopulated','errorPopulated','boolean','completePopulated','object','complete','clearQueueDelay','jqXHR','undefined','ajax','data','textStatus','errorThrown','version','2.1','QD_smartStockAvailable','Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available','unshift','aviso','info','apply','warn','length','qd-ssa-on','addClass','qd-ssa-sku-no-selected','qd-ssa-skus-','skus','split'];(function(_0x19bd20,_0x4dfa8a){var _0x33fb84=function(_0x2ef8cb){while(--_0x2ef8cb){_0x19bd20['push'](_0x19bd20['shift']());}};_0x33fb84(++_0x4dfa8a);}(_0xe373,0x11c));var _0x3e37=function(_0x226259,_0xac1fbf){_0x226259=_0x226259-0x0;var _0x27cb6c=_0xe373[_0x226259];return _0x27cb6c;};(function(_0x33a70b){if(_0x3e37('0x0')!==typeof _0x33a70b[_0x3e37('0x1')]){var _0x50ee30={};_0x33a70b['qdAjaxQueue']=_0x50ee30;_0x33a70b[_0x3e37('0x1')]=function(_0x5180d0){var _0x2bc4e1,_0x1c5aba;_0x2bc4e1=_0x33a70b[_0x3e37('0x2')]({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x5180d0);_0x1c5aba=escape(encodeURIComponent(_0x2bc4e1[_0x3e37('0x3')]));_0x50ee30[_0x1c5aba]=_0x50ee30[_0x1c5aba]||{};_0x50ee30[_0x1c5aba][_0x3e37('0x4')]=_0x50ee30[_0x1c5aba][_0x3e37('0x4')]||[];_0x50ee30[_0x1c5aba][_0x3e37('0x4')][_0x3e37('0x5')]({'success':function(_0x2e8fc8,_0x563c98,_0x5e2509){_0x2bc4e1[_0x3e37('0x6')][_0x3e37('0x7')](this,_0x2e8fc8,_0x563c98,_0x5e2509);},'error':function(_0x5896d6,_0x45c876,_0x2a64f6){_0x2bc4e1[_0x3e37('0x8')]['call'](this,_0x5896d6,_0x45c876,_0x2a64f6);},'complete':function(_0x3126a8,_0x23e270){_0x2bc4e1['complete'][_0x3e37('0x7')](this,_0x3126a8,_0x23e270);}});_0x50ee30[_0x1c5aba]['parameters']=_0x50ee30[_0x1c5aba][_0x3e37('0x9')]||{'success':{},'error':{},'complete':{}};_0x50ee30[_0x1c5aba][_0x3e37('0xa')]=_0x50ee30[_0x1c5aba][_0x3e37('0xa')]||{};_0x50ee30[_0x1c5aba]['callbackFns']['successPopulated']='boolean'===typeof _0x50ee30[_0x1c5aba][_0x3e37('0xa')][_0x3e37('0xb')]?_0x50ee30[_0x1c5aba][_0x3e37('0xa')]['successPopulated']:!0x1;_0x50ee30[_0x1c5aba]['callbackFns'][_0x3e37('0xc')]=_0x3e37('0xd')===typeof _0x50ee30[_0x1c5aba][_0x3e37('0xa')]['errorPopulated']?_0x50ee30[_0x1c5aba][_0x3e37('0xa')][_0x3e37('0xc')]:!0x1;_0x50ee30[_0x1c5aba][_0x3e37('0xa')][_0x3e37('0xe')]=_0x3e37('0xd')===typeof _0x50ee30[_0x1c5aba]['callbackFns']['completePopulated']?_0x50ee30[_0x1c5aba][_0x3e37('0xa')][_0x3e37('0xe')]:!0x1;_0x5180d0=_0x33a70b[_0x3e37('0x2')]({},_0x2bc4e1,{'success':function(_0x3cfc0d,_0x3b3a18,_0x69b381){_0x50ee30[_0x1c5aba][_0x3e37('0x9')][_0x3e37('0x6')]={'data':_0x3cfc0d,'textStatus':_0x3b3a18,'jqXHR':_0x69b381};_0x50ee30[_0x1c5aba][_0x3e37('0xa')]['successPopulated']=!0x0;for(var _0x33a70b in _0x50ee30[_0x1c5aba][_0x3e37('0x4')])'object'===typeof _0x50ee30[_0x1c5aba]['opts'][_0x33a70b]&&(_0x50ee30[_0x1c5aba][_0x3e37('0x4')][_0x33a70b][_0x3e37('0x6')][_0x3e37('0x7')](this,_0x3cfc0d,_0x3b3a18,_0x69b381),_0x50ee30[_0x1c5aba][_0x3e37('0x4')][_0x33a70b][_0x3e37('0x6')]=function(){});},'error':function(_0x5c192d,_0x17cf9e,_0x138c35){_0x50ee30[_0x1c5aba][_0x3e37('0x9')][_0x3e37('0x8')]={'errorThrown':_0x138c35,'textStatus':_0x17cf9e,'jqXHR':_0x5c192d};_0x50ee30[_0x1c5aba]['callbackFns'][_0x3e37('0xc')]=!0x0;for(var _0x5180d0 in _0x50ee30[_0x1c5aba][_0x3e37('0x4')])_0x3e37('0xf')===typeof _0x50ee30[_0x1c5aba][_0x3e37('0x4')][_0x5180d0]&&(_0x50ee30[_0x1c5aba]['opts'][_0x5180d0][_0x3e37('0x8')][_0x3e37('0x7')](this,_0x5c192d,_0x17cf9e,_0x138c35),_0x50ee30[_0x1c5aba][_0x3e37('0x4')][_0x5180d0][_0x3e37('0x8')]=function(){});},'complete':function(_0x5e3b53,_0x15aef6){_0x50ee30[_0x1c5aba][_0x3e37('0x9')]['complete']={'textStatus':_0x15aef6,'jqXHR':_0x5e3b53};_0x50ee30[_0x1c5aba][_0x3e37('0xa')][_0x3e37('0xe')]=!0x0;for(var _0x277b7a in _0x50ee30[_0x1c5aba][_0x3e37('0x4')])_0x3e37('0xf')===typeof _0x50ee30[_0x1c5aba][_0x3e37('0x4')][_0x277b7a]&&(_0x50ee30[_0x1c5aba][_0x3e37('0x4')][_0x277b7a]['complete']['call'](this,_0x5e3b53,_0x15aef6),_0x50ee30[_0x1c5aba][_0x3e37('0x4')][_0x277b7a][_0x3e37('0x10')]=function(){});isNaN(parseInt(_0x2bc4e1[_0x3e37('0x11')]))||setTimeout(function(){_0x50ee30[_0x1c5aba][_0x3e37('0x12')]=void 0x0;_0x50ee30[_0x1c5aba][_0x3e37('0x4')]=void 0x0;_0x50ee30[_0x1c5aba][_0x3e37('0x9')]=void 0x0;_0x50ee30[_0x1c5aba][_0x3e37('0xa')]=void 0x0;},_0x2bc4e1['clearQueueDelay']);}});_0x3e37('0x13')===typeof _0x50ee30[_0x1c5aba]['jqXHR']?_0x50ee30[_0x1c5aba][_0x3e37('0x12')]=_0x33a70b[_0x3e37('0x14')](_0x5180d0):_0x50ee30[_0x1c5aba][_0x3e37('0x12')]&&_0x50ee30[_0x1c5aba][_0x3e37('0x12')]['readyState']&&0x4==_0x50ee30[_0x1c5aba][_0x3e37('0x12')]['readyState']&&(_0x50ee30[_0x1c5aba][_0x3e37('0xa')]['successPopulated']&&_0x5180d0[_0x3e37('0x6')](_0x50ee30[_0x1c5aba][_0x3e37('0x9')][_0x3e37('0x6')][_0x3e37('0x15')],_0x50ee30[_0x1c5aba][_0x3e37('0x9')][_0x3e37('0x6')]['textStatus'],_0x50ee30[_0x1c5aba][_0x3e37('0x9')][_0x3e37('0x6')]['jqXHR']),_0x50ee30[_0x1c5aba][_0x3e37('0xa')][_0x3e37('0xc')]&&_0x5180d0[_0x3e37('0x8')](_0x50ee30[_0x1c5aba][_0x3e37('0x9')][_0x3e37('0x8')]['jqXHR'],_0x50ee30[_0x1c5aba][_0x3e37('0x9')][_0x3e37('0x8')][_0x3e37('0x16')],_0x50ee30[_0x1c5aba][_0x3e37('0x9')][_0x3e37('0x8')][_0x3e37('0x17')]),_0x50ee30[_0x1c5aba][_0x3e37('0xa')][_0x3e37('0xe')]&&_0x5180d0['complete'](_0x50ee30[_0x1c5aba][_0x3e37('0x9')][_0x3e37('0x10')][_0x3e37('0x12')],_0x50ee30[_0x1c5aba][_0x3e37('0x9')][_0x3e37('0x10')]['textStatus']));};_0x33a70b['qdAjax'][_0x3e37('0x18')]=_0x3e37('0x19');}}(jQuery));(function(_0x265ec2){'use strict';var _0x249c1c=jQuery;if(typeof _0x249c1c['fn'][_0x3e37('0x1a')]==='function')return;var _0x5dc2d7=_0x3e37('0x1b');var _0x56a0ff=function(_0x9682a2,_0x411167){if(_0x3e37('0xf')===typeof console){var _0x360ec6;_0x3e37('0xf')===typeof _0x9682a2?(_0x9682a2[_0x3e37('0x1c')]('['+_0x5dc2d7+']\x0a'),_0x360ec6=_0x9682a2):_0x360ec6=['['+_0x5dc2d7+']\x0a'+_0x9682a2];'undefined'===typeof _0x411167||'alerta'!==_0x411167['toLowerCase']()&&_0x3e37('0x1d')!==_0x411167['toLowerCase']()?_0x3e37('0x13')!==typeof _0x411167&&_0x3e37('0x1e')===_0x411167['toLowerCase']()?console[_0x3e37('0x1e')][_0x3e37('0x1f')](console,_0x360ec6):console[_0x3e37('0x8')][_0x3e37('0x1f')](console,_0x360ec6):console[_0x3e37('0x20')][_0x3e37('0x1f')](console,_0x360ec6);}};var _0x14f181={};var _0x482cbb=function(_0x22ee47,_0x21f3ef){if(!_0x22ee47[_0x3e37('0x21')])return;_0x22ee47['addClass'](_0x3e37('0x22'));_0x22ee47[_0x3e37('0x23')](_0x3e37('0x24'));try{_0x22ee47['addClass'](_0x3e37('0x25')+vtxctx[_0x3e37('0x26')][_0x3e37('0x27')](';')[_0x3e37('0x21')]);}catch(_0x1dfb7f){_0x56a0ff([_0x3e37('0x28'),_0x1dfb7f[_0x3e37('0x29')]]);}_0x249c1c(window)['on'](_0x3e37('0x2a'),function(_0xbbd927,_0x388b6f,_0x200f4e){try{_0x4406ea(_0x200f4e[_0x3e37('0x2b')],function(_0x59a82c){_0x82d7ec(_0x59a82c);_0x38aa02(_0x59a82c);});}catch(_0x231eac){_0x56a0ff([_0x3e37('0x2c'),_0x231eac[_0x3e37('0x29')]]);}});_0x249c1c(window)[_0x3e37('0x2d')](_0x3e37('0x2e'));_0x249c1c(window)['on'](_0x3e37('0x2f'),function(){_0x22ee47[_0x3e37('0x23')](_0x3e37('0x30'))['hide']();});function _0x82d7ec(_0x4bfa0b){try{_0x22ee47['removeClass'](_0x3e37('0x24'))[_0x3e37('0x23')](_0x3e37('0x31'));var _0x1bed2c=_0x4bfa0b[0x0][_0x3e37('0x32')][0x0]['AvailableQuantity'];_0x22ee47['attr']('data-qd-ssa-qtt',_0x1bed2c);_0x22ee47['each'](function(){var _0x4b8777=_0x249c1c(this)[_0x3e37('0x33')]('[data-qd-ssa-text]');if(_0x1bed2c<0x1)return _0x4b8777[_0x3e37('0x34')]()[_0x3e37('0x23')](_0x3e37('0x35'))[_0x3e37('0x36')](_0x3e37('0x37'));var _0x44dcf9=_0x4b8777[_0x3e37('0x38')]('[data-qd-ssa-text=\x22'+_0x1bed2c+'\x22]');var _0x4365a0=_0x44dcf9[_0x3e37('0x21')]?_0x44dcf9:_0x4b8777['filter'](_0x3e37('0x39'));_0x4b8777[_0x3e37('0x34')]()[_0x3e37('0x23')]('qd-ssa-hide')[_0x3e37('0x36')](_0x3e37('0x37'));_0x4365a0[_0x3e37('0x3a')](_0x4365a0[_0x3e37('0x3a')]()['replace'](_0x3e37('0x3b'),_0x1bed2c));_0x4365a0[_0x3e37('0x3c')]()[_0x3e37('0x23')](_0x3e37('0x37'))['removeClass'](_0x3e37('0x35'));});}catch(_0x14fe94){_0x56a0ff(['Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20',_0x14fe94['message']]);}};function _0x38aa02(_0xdbd460){if(vtxctx['skus'][_0x3e37('0x27')](';')[_0x3e37('0x21')]===0x1&&_0xdbd460[0x0][_0x3e37('0x32')][0x0][_0x3e37('0x3d')]==0x0)_0x249c1c(window)['trigger'](_0x3e37('0x2f'));};};var _0x41f0e4=function(_0x5ed06d){var _0x2be95f={'i':_0x3e37('0x3e')};return function(_0x5d35e8){var _0xbb0c58,_0xb06cfb,_0x2a9f9d,_0x18d7ec;_0xb06cfb=function(_0x3d8a77){return _0x3d8a77;};_0x2a9f9d=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5d35e8=_0x5d35e8['d'+_0x2a9f9d[0x10]+'c'+_0x2a9f9d[0x11]+'m'+_0xb06cfb(_0x2a9f9d[0x1])+'n'+_0x2a9f9d[0xd]]['l'+_0x2a9f9d[0x12]+'c'+_0x2a9f9d[0x0]+'ti'+_0xb06cfb('o')+'n'];_0xbb0c58=function(_0x258d4f){return escape(encodeURIComponent(_0x258d4f['replace'](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x334a48){return String[_0x3e37('0x3f')](('Z'>=_0x334a48?0x5a:0x7a)>=(_0x334a48=_0x334a48['charCodeAt'](0x0)+0xd)?_0x334a48:_0x334a48-0x1a);})));};var _0x55d008=_0xbb0c58(_0x5d35e8[[_0x2a9f9d[0x9],_0xb06cfb('o'),_0x2a9f9d[0xc],_0x2a9f9d[_0xb06cfb(0xd)]][_0x3e37('0x40')]('')]);_0xbb0c58=_0xbb0c58((window[['js',_0xb06cfb('no'),'m',_0x2a9f9d[0x1],_0x2a9f9d[0x4][_0x3e37('0x41')](),_0x3e37('0x42')][_0x3e37('0x40')]('')]||'---')+['.v',_0x2a9f9d[0xd],'e',_0xb06cfb('x'),'co',_0xb06cfb('mm'),_0x3e37('0x43'),_0x2a9f9d[0x1],'.c',_0xb06cfb('o'),'m.',_0x2a9f9d[0x13],'r']['join'](''));for(var _0xd9906e in _0x2be95f){if(_0xbb0c58===_0xd9906e+_0x2be95f[_0xd9906e]||_0x55d008===_0xd9906e+_0x2be95f[_0xd9906e]){_0x18d7ec='tr'+_0x2a9f9d[0x11]+'e';break;}_0x18d7ec='f'+_0x2a9f9d[0x0]+'ls'+_0xb06cfb(_0x2a9f9d[0x1])+'';}_0xb06cfb=!0x1;-0x1<_0x5d35e8[[_0x2a9f9d[0xc],'e',_0x2a9f9d[0x0],'rc',_0x2a9f9d[0x9]][_0x3e37('0x40')]('')][_0x3e37('0x44')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0xb06cfb=!0x0);return[_0x18d7ec,_0xb06cfb];}(_0x5ed06d);}(window);if(!eval(_0x41f0e4[0x0]))return _0x41f0e4[0x1]?_0x56a0ff(_0x3e37('0x45')):!0x1;function _0x4406ea(_0x2e4ca4,_0xd882fc){_0x249c1c[_0x3e37('0x1')]({'url':_0x3e37('0x46')+_0x2e4ca4,'clearQueueDelay':null,'success':_0xd882fc,'error':function(){_0x56a0ff(_0x3e37('0x47'));}});};_0x249c1c['fn'][_0x3e37('0x1a')]=function(_0x356a37){var _0x31983c=_0x249c1c(this);var _0x193c00=_0x249c1c[_0x3e37('0x2')](!![],{},_0x14f181,_0x356a37);_0x31983c[_0x3e37('0x48')]=new _0x482cbb(_0x31983c,_0x193c00);try{if(typeof _0x249c1c['fn'][_0x3e37('0x1a')]['initialSkuSelected']==='object')_0x249c1c(window)[_0x3e37('0x49')]('QuatroDigital.ssa.skuSelected',[_0x249c1c['fn'][_0x3e37('0x1a')][_0x3e37('0x4a')][_0x3e37('0x4b')],_0x249c1c['fn'][_0x3e37('0x1a')]['initialSkuSelected'][_0x3e37('0x2b')]]);}catch(_0x891840){_0x56a0ff([_0x3e37('0x4c'),_0x891840['message']]);}if(_0x249c1c['fn']['QD_smartStockAvailable'][_0x3e37('0x4d')])_0x249c1c(window)['trigger'](_0x3e37('0x2f'));return _0x31983c;};_0x249c1c(window)['on'](_0x3e37('0x2e'),function(_0x851847,_0x11e4a1,_0x1542b0){try{_0x249c1c['fn'][_0x3e37('0x1a')][_0x3e37('0x4a')]={'prod':_0x11e4a1,'sku':_0x1542b0};_0x249c1c(this)[_0x3e37('0x2d')](_0x851847);}catch(_0x5136a1){_0x56a0ff([_0x3e37('0x4e'),_0x5136a1[_0x3e37('0x29')]]);}});_0x249c1c(window)['on']('vtex.sku.selectable',function(_0x320bea,_0x30f0ee,_0xb574a5){try{var _0x3f5168=_0xb574a5[_0x3e37('0x21')];var _0x5b1f76=0x0;for(var _0x10d1cc=0x0;_0x10d1cc<_0x3f5168;_0x10d1cc++){if(!_0xb574a5[_0x10d1cc][_0x3e37('0x4f')])_0x5b1f76=_0x5b1f76+0x1;else break;}if(_0x3f5168<=_0x5b1f76)_0x249c1c['fn'][_0x3e37('0x1a')][_0x3e37('0x4d')]=!![];_0x249c1c(this)['off'](_0x320bea);}catch(_0x9824a2){_0x56a0ff([_0x3e37('0x50'),_0x9824a2['message']]);}});_0x249c1c(function(){_0x249c1c('.qd_smart_stock_available_auto')[_0x3e37('0x1a')]();});}(window));

// -include ../qd-quatro-lib-plugins/Infinity Scroll Memory/QD_infinityScrollMemory.min.js
