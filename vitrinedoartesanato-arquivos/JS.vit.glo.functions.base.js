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

			$('.navigation').prepend('<span class="search-qd-v1-navigator-close visible-xs visible-sm">'+
				'<i class="fa fa-times-circle" aria-hidden="true"></i>'+
				'</span>');

			$('.navigation-tabs').prepend('<span class="search-qd-v1-navigator-close visible-xs visible-sm">'+
				'<i class="fa fa-times-circle" aria-hidden="true"></i>'+
				'</span>');

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

			$(".menu-departamento div").each(function () {
				var t, li, qtt, moreLink, moreLi, click, liHide;

				t = $(this);
				label = t.find(">label");
				qtt = 7;

				if (label.length <= qtt) return;

				liHide = label.filter(":gt(" + (qtt - 1) + ")").stop(true, true).hide();
				moreLink = $('<a class="qd-viewMoreMenu">Mostrar mais</a>');
				t.after(moreLink);
				moreLi = $('<div class="qd-viewMoreWrapper"><a class="qd-viewMoreMenu2">Mostrar mais</a></div>');
				t.append(moreLi);

				click = function () {
					liHide.stop(true, true).slideToggle(function () {
						if (label.filter(":visible").length > qtt) {
							moreLink.addClass("minus").text("Mostrar menos");
							moreLi.addClass("minus").find("a").text("Mostrar menos");
						}
						else {
							moreLink.removeClass("minus").text("Mostrar mais");
							moreLi.removeClass("minus").find("a").text("Mostrar mais");
						}
					});
				};
				moreLi.bind("click.qd_viewMore", click);
				moreLink.bind("click.qd_viewMore", click);
			});

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
var _0x3f4f=['undefined','info','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','apply','join','error','warn','qdAmAddNdx','each','addClass','qd-am-li-','first','last','qd-am-last','vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','charCodeAt','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','find','.qd_am_code','filter','.qd-am-collection','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','url','html','img[alt=\x27','attr','length','.box-banner','clone','insertBefore','hide','text','data-qdam-value','trim','[class*=\x27colunas\x27]','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','call','QuatroDigital.am.ajaxCallback','qd-am-has-ul','children',':not(ul)','qd-am-elem-','replaceSpecialChars','>li','qd-amazing-menu','qd-am-column','qd-am-dropdown','qd-am-level-','add','qd-am-','-li','callback','QuatroDigital.am.callback','exec','.qd_amazing_menu_auto','getParent','closest','function','QD_amazingMenu','/qd-amazing-menu','object'];(function(_0x4df928,_0x5b1da7){var _0x417442=function(_0x2b047d){while(--_0x2b047d){_0x4df928['push'](_0x4df928['shift']());}};_0x417442(++_0x5b1da7);}(_0x3f4f,0xd5));var _0xf3f4=function(_0x528949,_0x3e51d2){_0x528949=_0x528949-0x0;var _0x51f22d=_0x3f4f[_0x528949];return _0x51f22d;};(function(_0x446ec3){_0x446ec3['fn'][_0xf3f4('0x0')]=_0x446ec3['fn'][_0xf3f4('0x1')];}(jQuery));(function(_0x58513f){var _0x188096;var _0x44f660=jQuery;if(_0xf3f4('0x2')!==typeof _0x44f660['fn'][_0xf3f4('0x3')]){var _0x58e1f0={'url':_0xf3f4('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0x3b74cc=function(_0x47357f,_0x49359d){if(_0xf3f4('0x5')===typeof console&&'undefined'!==typeof console['error']&&_0xf3f4('0x6')!==typeof console[_0xf3f4('0x7')]&&_0xf3f4('0x6')!==typeof console['warn']){var _0x1fa2ff;_0xf3f4('0x5')===typeof _0x47357f?(_0x47357f[_0xf3f4('0x8')](_0xf3f4('0x9')),_0x1fa2ff=_0x47357f):_0x1fa2ff=[_0xf3f4('0x9')+_0x47357f];if(_0xf3f4('0x6')===typeof _0x49359d||_0xf3f4('0xa')!==_0x49359d[_0xf3f4('0xb')]()&&_0xf3f4('0xc')!==_0x49359d[_0xf3f4('0xb')]())if(_0xf3f4('0x6')!==typeof _0x49359d&&_0xf3f4('0x7')===_0x49359d[_0xf3f4('0xb')]())try{console[_0xf3f4('0x7')][_0xf3f4('0xd')](console,_0x1fa2ff);}catch(_0x43816a){try{console[_0xf3f4('0x7')](_0x1fa2ff[_0xf3f4('0xe')]('\x0a'));}catch(_0x4d3bb6){}}else try{console[_0xf3f4('0xf')][_0xf3f4('0xd')](console,_0x1fa2ff);}catch(_0x2aeefa){try{console['error'](_0x1fa2ff[_0xf3f4('0xe')]('\x0a'));}catch(_0x23ead3){}}else try{console[_0xf3f4('0x10')]['apply'](console,_0x1fa2ff);}catch(_0x57b448){try{console[_0xf3f4('0x10')](_0x1fa2ff[_0xf3f4('0xe')]('\x0a'));}catch(_0x1e361a){}}}};_0x44f660['fn'][_0xf3f4('0x11')]=function(){var _0x7bfc3c=_0x44f660(this);_0x7bfc3c[_0xf3f4('0x12')](function(_0x35d312){_0x44f660(this)[_0xf3f4('0x13')](_0xf3f4('0x14')+_0x35d312);});_0x7bfc3c[_0xf3f4('0x15')]()[_0xf3f4('0x13')]('qd-am-first');_0x7bfc3c[_0xf3f4('0x16')]()[_0xf3f4('0x13')](_0xf3f4('0x17'));return _0x7bfc3c;};_0x44f660['fn'][_0xf3f4('0x3')]=function(){};_0x58513f=function(_0x239fa2){var _0x5f0737={'i':_0xf3f4('0x18')};return function(_0x36388d){var _0x152053=function(_0x2f0719){return _0x2f0719;};var _0x42f77e=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x36388d=_0x36388d['d'+_0x42f77e[0x10]+'c'+_0x42f77e[0x11]+'m'+_0x152053(_0x42f77e[0x1])+'n'+_0x42f77e[0xd]]['l'+_0x42f77e[0x12]+'c'+_0x42f77e[0x0]+'ti'+_0x152053('o')+'n'];var _0x34c8d4=function(_0xeb41){return escape(encodeURIComponent(_0xeb41[_0xf3f4('0x19')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x5e389e){return String['fromCharCode'](('Z'>=_0x5e389e?0x5a:0x7a)>=(_0x5e389e=_0x5e389e[_0xf3f4('0x1a')](0x0)+0xd)?_0x5e389e:_0x5e389e-0x1a);})));};var _0x44fcfd=_0x34c8d4(_0x36388d[[_0x42f77e[0x9],_0x152053('o'),_0x42f77e[0xc],_0x42f77e[_0x152053(0xd)]][_0xf3f4('0xe')]('')]);_0x34c8d4=_0x34c8d4((window[['js',_0x152053('no'),'m',_0x42f77e[0x1],_0x42f77e[0x4]['toUpperCase'](),'ite']['join']('')]||_0xf3f4('0x1b'))+['.v',_0x42f77e[0xd],'e',_0x152053('x'),'co',_0x152053('mm'),_0xf3f4('0x1c'),_0x42f77e[0x1],'.c',_0x152053('o'),'m.',_0x42f77e[0x13],'r']['join'](''));for(var _0x1c343c in _0x5f0737){if(_0x34c8d4===_0x1c343c+_0x5f0737[_0x1c343c]||_0x44fcfd===_0x1c343c+_0x5f0737[_0x1c343c]){var _0x39df08='tr'+_0x42f77e[0x11]+'e';break;}_0x39df08='f'+_0x42f77e[0x0]+'ls'+_0x152053(_0x42f77e[0x1])+'';}_0x152053=!0x1;-0x1<_0x36388d[[_0x42f77e[0xc],'e',_0x42f77e[0x0],'rc',_0x42f77e[0x9]]['join']('')][_0xf3f4('0x1d')](_0xf3f4('0x1e'))&&(_0x152053=!0x0);return[_0x39df08,_0x152053];}(_0x239fa2);}(window);if(!eval(_0x58513f[0x0]))return _0x58513f[0x1]?_0x3b74cc('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x3f248e=function(_0x19d63a){var _0x1d3ac2=_0x19d63a[_0xf3f4('0x1f')](_0xf3f4('0x20'));var _0x1e7663=_0x1d3ac2[_0xf3f4('0x21')]('.qd-am-banner');var _0x3ec247=_0x1d3ac2[_0xf3f4('0x21')](_0xf3f4('0x22'));if(_0x1e7663['length']||_0x3ec247['length'])_0x1e7663[_0xf3f4('0x23')]()[_0xf3f4('0x13')](_0xf3f4('0x24')),_0x3ec247['parent']()['addClass'](_0xf3f4('0x25')),_0x44f660[_0xf3f4('0x26')]({'url':_0x188096[_0xf3f4('0x27')],'dataType':_0xf3f4('0x28'),'success':function(_0xbb7b15){var _0x373896=_0x44f660(_0xbb7b15);_0x1e7663['each'](function(){var _0xbb7b15=_0x44f660(this);var _0x3ab974=_0x373896['find'](_0xf3f4('0x29')+_0xbb7b15[_0xf3f4('0x2a')]('data-qdam-value')+'\x27]');_0x3ab974[_0xf3f4('0x2b')]&&(_0x3ab974['each'](function(){_0x44f660(this)[_0xf3f4('0x0')](_0xf3f4('0x2c'))[_0xf3f4('0x2d')]()[_0xf3f4('0x2e')](_0xbb7b15);}),_0xbb7b15[_0xf3f4('0x2f')]());})[_0xf3f4('0x13')]('qd-am-content-loaded');_0x3ec247['each'](function(){var _0xbb7b15={};var _0x20a878=_0x44f660(this);_0x373896[_0xf3f4('0x1f')]('h2')[_0xf3f4('0x12')](function(){if(_0x44f660(this)[_0xf3f4('0x30')]()['trim']()[_0xf3f4('0xb')]()==_0x20a878['attr'](_0xf3f4('0x31'))[_0xf3f4('0x32')]()['toLowerCase']())return _0xbb7b15=_0x44f660(this),!0x1;});_0xbb7b15[_0xf3f4('0x2b')]&&(_0xbb7b15[_0xf3f4('0x12')](function(){_0x44f660(this)[_0xf3f4('0x0')](_0xf3f4('0x33'))[_0xf3f4('0x2d')]()['insertBefore'](_0x20a878);}),_0x20a878[_0xf3f4('0x2f')]());})[_0xf3f4('0x13')]('qd-am-content-loaded');},'error':function(){_0x3b74cc(_0xf3f4('0x34')+_0x188096['url']+_0xf3f4('0x35'));},'complete':function(){_0x188096['ajaxCallback'][_0xf3f4('0x36')](this);_0x44f660(window)['trigger'](_0xf3f4('0x37'),_0x19d63a);},'clearQueueDelay':0xbb8});};_0x44f660['QD_amazingMenu']=function(_0x457564){var _0x238204=_0x457564['find']('ul[itemscope]')[_0xf3f4('0x12')](function(){var _0x5ac236=_0x44f660(this);if(!_0x5ac236[_0xf3f4('0x2b')])return _0x3b74cc(['UL\x20do\x20menu\x20não\x20encontrada',_0x457564],_0xf3f4('0xa'));_0x5ac236[_0xf3f4('0x1f')]('li\x20>ul')['parent']()[_0xf3f4('0x13')](_0xf3f4('0x38'));_0x5ac236[_0xf3f4('0x1f')]('li')[_0xf3f4('0x12')](function(){var _0x5249ef=_0x44f660(this);var _0x2b28e2=_0x5249ef[_0xf3f4('0x39')](_0xf3f4('0x3a'));_0x2b28e2['length']&&_0x5249ef[_0xf3f4('0x13')](_0xf3f4('0x3b')+_0x2b28e2[_0xf3f4('0x15')]()[_0xf3f4('0x30')]()['trim']()[_0xf3f4('0x3c')]()['replace'](/\./g,'')[_0xf3f4('0x19')](/\s/g,'-')['toLowerCase']());});var _0x468f0a=_0x5ac236[_0xf3f4('0x1f')](_0xf3f4('0x3d'))[_0xf3f4('0x11')]();_0x5ac236[_0xf3f4('0x13')](_0xf3f4('0x3e'));_0x468f0a=_0x468f0a[_0xf3f4('0x1f')]('>ul');_0x468f0a['each'](function(){var _0x302ef7=_0x44f660(this);_0x302ef7[_0xf3f4('0x1f')](_0xf3f4('0x3d'))[_0xf3f4('0x11')]()[_0xf3f4('0x13')](_0xf3f4('0x3f'));_0x302ef7[_0xf3f4('0x13')]('qd-am-dropdown-menu');_0x302ef7[_0xf3f4('0x23')]()['addClass'](_0xf3f4('0x40'));});_0x468f0a[_0xf3f4('0x13')](_0xf3f4('0x40'));var _0x437163=0x0,_0x58513f=function(_0x49d35c){_0x437163+=0x1;_0x49d35c=_0x49d35c[_0xf3f4('0x39')]('li')[_0xf3f4('0x39')]('*');_0x49d35c['length']&&(_0x49d35c[_0xf3f4('0x13')](_0xf3f4('0x41')+_0x437163),_0x58513f(_0x49d35c));};_0x58513f(_0x5ac236);_0x5ac236[_0xf3f4('0x42')](_0x5ac236['find']('ul'))[_0xf3f4('0x12')](function(){var _0xd71beb=_0x44f660(this);_0xd71beb[_0xf3f4('0x13')](_0xf3f4('0x43')+_0xd71beb[_0xf3f4('0x39')]('li')[_0xf3f4('0x2b')]+_0xf3f4('0x44'));});});_0x3f248e(_0x238204);_0x188096[_0xf3f4('0x45')]['call'](this);_0x44f660(window)['trigger'](_0xf3f4('0x46'),_0x457564);};_0x44f660['fn']['QD_amazingMenu']=function(_0x1ad6f1){var _0x1c5696=_0x44f660(this);if(!_0x1c5696[_0xf3f4('0x2b')])return _0x1c5696;_0x188096=_0x44f660['extend']({},_0x58e1f0,_0x1ad6f1);_0x1c5696[_0xf3f4('0x47')]=new _0x44f660[(_0xf3f4('0x3'))](_0x44f660(this));return _0x1c5696;};_0x44f660(function(){_0x44f660(_0xf3f4('0x48'))[_0xf3f4('0x3')]();});}}(this));

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
var _0x4471=['.qd_cart_total','.qd_items_text','meta[name=currency]','attr','content','extend','each','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','Shipping','value','currencySymbol','shipping','allTotal','showQuantityByItems','items','qtt','quantity','callback','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','filter','.singular','show','addClass','qd-emptyCart','$this','O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','cartTotalE','html','total','cartQttE','itemsTextE','find','cartQtt','cartTotal','emptyElem','emptyCart','qd-sc-populated','smartCheckout','_QuatroDigital_DropDown','vtexjs','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','QD_checkoutQueue','shippingData','trigger','simpleCartCallback.quatro_digital','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','.qd_cart_auto','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','Oooops!\x20','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Callbacks','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','.productInformationWrapper\x20\x20a.buy-button','input.buy-in-page-quantity','body','success','Produto\x20adicionado\x20ao\x20carrinho!','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','location','#produto,\x20.produto','QD_buyButton','isSmartCheckout','qd-bb-click-active','allowBuyClick','clickBuySmartCheckout','preventDefault','Método\x20descontinuado!','buyButton','.btn-add-buy-button-asynchronous','.remove-href','qd-bb-active','children','.qd-bb-productAdded','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','.buy-in-page-button','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','prodAdd','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','---','qd-bb-itemAddBuyButtonWrapper','removeClass','timeRemoveNewItemClass','getCartInfoByUrl','função\x20descontinuada','allowUpdate','unbind','click','bind','mouseenter.qd_bb_buy_sc','load','href','indexOf','selectSkuMsg','?redirect=false&','redirect=false','redirect=true','buyIfQuantityZeroed','test','match','push','productPageCallback','buyButtonClickCallback','split','ku=','pop','shift','asyncCallback','productAddedToCart','fakeRequest','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','Callback\x20não\x20é\x20uma\x20função','prepend','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','QuatroDigital.qd_bb_prod_add','productAddedToCart.qdSbbVtex','ajaxStop','abs','message','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','QD_dropDownCart','vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','erc','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','append','.qd_ddc_lightBoxOverlay','qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','keyup.qd_ddc_closeFn','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-shipping\x20input','val','keyup.qd_ddc_cep','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','cartIsEmpty','texts','#value','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','cartContainer','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalShipping','.qd-ddc-infoAllTotal','renderProductsList','dataOptionsCache','.qd-ddc-wrapper','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','qd-ddc-','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','address','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','[data-sku=\x27','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','.qd-ddc-quantity','focusout.qd_ddc_change','removeProduct','stop','slideUp','$1-$2$3','qdDdcLastPostalCode','calculateShipping','BRA','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','animate','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','remove','qd-bap-item-added','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','QD_smartCart','dropDown','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','smartCart','getParent','closest','undefined','pow','round','toFixed','length','replace','join','function','prototype','trim','capitalize','toUpperCase','slice','toLowerCase','qdAjax','qdAjaxQueue','jquery','000','error','GET','object','data','stringify','toString','url','type','jqXHR','ajax','done','fail','always','complete','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','version','4.0','getOrderForm','checkout','call','QuatroDigital_simpleCart','ajaxStopOn','simpleCart','alerta','warn','[Simple\x20Cart]\x0a','info','QD_simpleCart','elements','add'];(function(_0x3dd15e,_0x1f0015){var _0x231fd0=function(_0x4f680a){while(--_0x4f680a){_0x3dd15e['push'](_0x3dd15e['shift']());}};_0x231fd0(++_0x1f0015);}(_0x4471,0x10f));var _0x1447=function(_0x17d9e3,_0x1f969c){_0x17d9e3=_0x17d9e3-0x0;var _0x14192d=_0x4471[_0x17d9e3];return _0x14192d;};(function(_0x14e290){_0x14e290['fn'][_0x1447('0x0')]=_0x14e290['fn'][_0x1447('0x1')];}(jQuery));function qd_number_format(_0x20a5e9,_0x4e869d,_0x29ebf,_0x408bf5){_0x20a5e9=(_0x20a5e9+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x20a5e9=isFinite(+_0x20a5e9)?+_0x20a5e9:0x0;_0x4e869d=isFinite(+_0x4e869d)?Math['abs'](_0x4e869d):0x0;_0x408bf5=_0x1447('0x2')===typeof _0x408bf5?',':_0x408bf5;_0x29ebf=_0x1447('0x2')===typeof _0x29ebf?'.':_0x29ebf;var _0x16d8f2='',_0x16d8f2=function(_0x2c0f9b,_0x268937){var _0x4e869d=Math[_0x1447('0x3')](0xa,_0x268937);return''+(Math[_0x1447('0x4')](_0x2c0f9b*_0x4e869d)/_0x4e869d)[_0x1447('0x5')](_0x268937);},_0x16d8f2=(_0x4e869d?_0x16d8f2(_0x20a5e9,_0x4e869d):''+Math['round'](_0x20a5e9))['split']('.');0x3<_0x16d8f2[0x0][_0x1447('0x6')]&&(_0x16d8f2[0x0]=_0x16d8f2[0x0][_0x1447('0x7')](/\B(?=(?:\d{3})+(?!\d))/g,_0x408bf5));(_0x16d8f2[0x1]||'')[_0x1447('0x6')]<_0x4e869d&&(_0x16d8f2[0x1]=_0x16d8f2[0x1]||'',_0x16d8f2[0x1]+=Array(_0x4e869d-_0x16d8f2[0x1]['length']+0x1)[_0x1447('0x8')]('0'));return _0x16d8f2[_0x1447('0x8')](_0x29ebf);};_0x1447('0x9')!==typeof String[_0x1447('0xa')][_0x1447('0xb')]&&(String['prototype'][_0x1447('0xb')]=function(){return this[_0x1447('0x7')](/^\s+|\s+$/g,'');});_0x1447('0x9')!=typeof String[_0x1447('0xa')][_0x1447('0xc')]&&(String[_0x1447('0xa')]['capitalize']=function(){return this['charAt'](0x0)[_0x1447('0xd')]()+this[_0x1447('0xe')](0x1)[_0x1447('0xf')]();});(function(_0x1c5bb6){if('function'!==typeof _0x1c5bb6[_0x1447('0x10')]){var _0x211301={};_0x1c5bb6[_0x1447('0x11')]=_0x211301;0x96>parseInt((_0x1c5bb6['fn'][_0x1447('0x12')][_0x1447('0x7')](/[^0-9]+/g,'')+_0x1447('0x13'))['slice'](0x0,0x3),0xa)&&console&&'function'==typeof console[_0x1447('0x14')]&&console[_0x1447('0x14')]();_0x1c5bb6['qdAjax']=function(_0x12212f){try{var _0x4616e7=_0x1c5bb6['extend']({},{'url':'','type':_0x1447('0x15'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x12212f);var _0x75550f=_0x1447('0x16')===typeof _0x4616e7[_0x1447('0x17')]?JSON[_0x1447('0x18')](_0x4616e7['data']):_0x4616e7[_0x1447('0x17')][_0x1447('0x19')]();var _0x4c50bd=encodeURIComponent(_0x4616e7[_0x1447('0x1a')]+'|'+_0x4616e7[_0x1447('0x1b')]+'|'+_0x75550f);_0x211301[_0x4c50bd]=_0x211301[_0x4c50bd]||{};_0x1447('0x2')==typeof _0x211301[_0x4c50bd][_0x1447('0x1c')]?_0x211301[_0x4c50bd][_0x1447('0x1c')]=_0x1c5bb6[_0x1447('0x1d')](_0x4616e7):(_0x211301[_0x4c50bd][_0x1447('0x1c')][_0x1447('0x1e')](_0x4616e7['success']),_0x211301[_0x4c50bd][_0x1447('0x1c')][_0x1447('0x1f')](_0x4616e7[_0x1447('0x14')]),_0x211301[_0x4c50bd]['jqXHR'][_0x1447('0x20')](_0x4616e7[_0x1447('0x21')]));_0x211301[_0x4c50bd][_0x1447('0x1c')][_0x1447('0x20')](function(){isNaN(parseInt(_0x4616e7['clearQueueDelay']))||setTimeout(function(){_0x211301[_0x4c50bd][_0x1447('0x1c')]=void 0x0;},_0x4616e7[_0x1447('0x22')]);});return _0x211301[_0x4c50bd][_0x1447('0x1c')];}catch(_0x66bd66){_0x1447('0x2')!==typeof console&&'function'===typeof console[_0x1447('0x14')]&&console[_0x1447('0x14')](_0x1447('0x23')+_0x66bd66['message']);}};_0x1c5bb6[_0x1447('0x10')][_0x1447('0x24')]=_0x1447('0x25');}}(jQuery));(function(_0x3b1680){_0x3b1680['fn']['getParent']=_0x3b1680['fn']['closest'];}(jQuery));(function(){var _0x34f602=jQuery;if('function'!==typeof _0x34f602['fn']['simpleCart']){_0x34f602(function(){var _0x48d204=vtexjs['checkout'][_0x1447('0x26')];vtexjs[_0x1447('0x27')][_0x1447('0x26')]=function(){return _0x48d204[_0x1447('0x28')]();};});try{window[_0x1447('0x29')]=window['QuatroDigital_simpleCart']||{};window['QuatroDigital_simpleCart'][_0x1447('0x2a')]=!0x1;_0x34f602['fn'][_0x1447('0x2b')]=function(_0x1bab56,_0x314f5b,_0x3f1566){var _0x4a221d=function(_0x5351ca,_0x115205){if(_0x1447('0x16')===typeof console){var _0x5af7f5=_0x1447('0x16')===typeof _0x5351ca;_0x1447('0x2')!==typeof _0x115205&&_0x1447('0x2c')===_0x115205[_0x1447('0xf')]()?_0x5af7f5?console[_0x1447('0x2d')](_0x1447('0x2e'),_0x5351ca[0x0],_0x5351ca[0x1],_0x5351ca[0x2],_0x5351ca[0x3],_0x5351ca[0x4],_0x5351ca[0x5],_0x5351ca[0x6],_0x5351ca[0x7]):console[_0x1447('0x2d')]('[Simple\x20Cart]\x0a'+_0x5351ca):'undefined'!==typeof _0x115205&&_0x1447('0x2f')===_0x115205[_0x1447('0xf')]()?_0x5af7f5?console[_0x1447('0x2f')](_0x1447('0x2e'),_0x5351ca[0x0],_0x5351ca[0x1],_0x5351ca[0x2],_0x5351ca[0x3],_0x5351ca[0x4],_0x5351ca[0x5],_0x5351ca[0x6],_0x5351ca[0x7]):console[_0x1447('0x2f')](_0x1447('0x2e')+_0x5351ca):_0x5af7f5?console['error'](_0x1447('0x2e'),_0x5351ca[0x0],_0x5351ca[0x1],_0x5351ca[0x2],_0x5351ca[0x3],_0x5351ca[0x4],_0x5351ca[0x5],_0x5351ca[0x6],_0x5351ca[0x7]):console[_0x1447('0x14')](_0x1447('0x2e')+_0x5351ca);}};var _0x5a6387=_0x34f602(this);'object'===typeof _0x1bab56?_0x314f5b=_0x1bab56:(_0x1bab56=_0x1bab56||!0x1,_0x5a6387=_0x5a6387['add'](_0x34f602[_0x1447('0x30')][_0x1447('0x31')]));if(!_0x5a6387[_0x1447('0x6')])return _0x5a6387;_0x34f602[_0x1447('0x30')][_0x1447('0x31')]=_0x34f602[_0x1447('0x30')]['elements'][_0x1447('0x32')](_0x5a6387);_0x3f1566=_0x1447('0x2')===typeof _0x3f1566?!0x1:_0x3f1566;var _0x4ccba1={'cartQtt':'.qd_cart_qtt','cartTotal':_0x1447('0x33'),'itemsText':_0x1447('0x34'),'currencySymbol':(_0x34f602(_0x1447('0x35'))[_0x1447('0x36')](_0x1447('0x37'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x12e297=_0x34f602[_0x1447('0x38')]({},_0x4ccba1,_0x314f5b);var _0x34c4d9=_0x34f602('');_0x5a6387[_0x1447('0x39')](function(){var _0x4a6596=_0x34f602(this);_0x4a6596[_0x1447('0x17')](_0x1447('0x3a'))||_0x4a6596[_0x1447('0x17')]('qd_simpleCartOpts',_0x12e297);});var _0x74cd5a=function(_0xf1c4cf){window[_0x1447('0x3b')]=window[_0x1447('0x3b')]||{};for(var _0x1bab56=0x0,_0x473275=0x0,_0xec02f6=0x0;_0xec02f6<_0xf1c4cf[_0x1447('0x3c')]['length'];_0xec02f6++)_0x1447('0x3d')==_0xf1c4cf[_0x1447('0x3c')][_0xec02f6]['id']&&(_0x473275+=_0xf1c4cf['totalizers'][_0xec02f6]['value']),_0x1bab56+=_0xf1c4cf[_0x1447('0x3c')][_0xec02f6][_0x1447('0x3e')];window[_0x1447('0x3b')]['total']=_0x12e297[_0x1447('0x3f')]+qd_number_format(_0x1bab56/0x64,0x2,',','.');window[_0x1447('0x3b')][_0x1447('0x40')]=_0x12e297[_0x1447('0x3f')]+qd_number_format(_0x473275/0x64,0x2,',','.');window['_QuatroDigital_CartData'][_0x1447('0x41')]=_0x12e297['currencySymbol']+qd_number_format((_0x1bab56+_0x473275)/0x64,0x2,',','.');window['_QuatroDigital_CartData']['qtt']=0x0;if(_0x12e297[_0x1447('0x42')])for(_0xec02f6=0x0;_0xec02f6<_0xf1c4cf[_0x1447('0x43')][_0x1447('0x6')];_0xec02f6++)window['_QuatroDigital_CartData'][_0x1447('0x44')]+=_0xf1c4cf[_0x1447('0x43')][_0xec02f6][_0x1447('0x45')];else window[_0x1447('0x3b')]['qtt']=_0xf1c4cf['items'][_0x1447('0x6')]||0x0;try{window[_0x1447('0x3b')]['callback']&&window[_0x1447('0x3b')][_0x1447('0x46')][_0x1447('0x47')]&&window[_0x1447('0x3b')][_0x1447('0x46')][_0x1447('0x47')]();}catch(_0x1c16e2){_0x4a221d(_0x1447('0x48'));}_0x3468c5(_0x34c4d9);};var _0xb69f03=function(_0x13ccde,_0x1dccc5){0x1===_0x13ccde?_0x1dccc5['hide']()[_0x1447('0x49')](_0x1447('0x4a'))[_0x1447('0x4b')]():_0x1dccc5['hide']()[_0x1447('0x49')]('.plural')[_0x1447('0x4b')]();};var _0x24cdd5=function(_0x40536d){0x1>_0x40536d?_0x5a6387[_0x1447('0x4c')](_0x1447('0x4d')):_0x5a6387['removeClass'](_0x1447('0x4d'));};var _0x2ed373=function(_0xc7a666,_0x277cbc){var _0x49e300=parseInt(window[_0x1447('0x3b')][_0x1447('0x44')],0xa);_0x277cbc[_0x1447('0x4e')][_0x1447('0x4b')]();isNaN(_0x49e300)&&(_0x4a221d(_0x1447('0x4f'),'alerta'),_0x49e300=0x0);_0x277cbc[_0x1447('0x50')][_0x1447('0x51')](window['_QuatroDigital_CartData'][_0x1447('0x52')]);_0x277cbc[_0x1447('0x53')][_0x1447('0x51')](_0x49e300);_0xb69f03(_0x49e300,_0x277cbc[_0x1447('0x54')]);_0x24cdd5(_0x49e300);};var _0x3468c5=function(_0x4677ff){_0x5a6387[_0x1447('0x39')](function(){var _0x10b534={};var _0x2dd1ff=_0x34f602(this);_0x1bab56&&_0x2dd1ff[_0x1447('0x17')]('qd_simpleCartOpts')&&_0x34f602['extend'](_0x12e297,_0x2dd1ff[_0x1447('0x17')](_0x1447('0x3a')));_0x10b534[_0x1447('0x4e')]=_0x2dd1ff;_0x10b534['cartQttE']=_0x2dd1ff[_0x1447('0x55')](_0x12e297[_0x1447('0x56')])||_0x34c4d9;_0x10b534['cartTotalE']=_0x2dd1ff[_0x1447('0x55')](_0x12e297[_0x1447('0x57')])||_0x34c4d9;_0x10b534[_0x1447('0x54')]=_0x2dd1ff[_0x1447('0x55')](_0x12e297['itemsText'])||_0x34c4d9;_0x10b534[_0x1447('0x58')]=_0x2dd1ff[_0x1447('0x55')](_0x12e297[_0x1447('0x59')])||_0x34c4d9;_0x2ed373(_0x4677ff,_0x10b534);_0x2dd1ff[_0x1447('0x4c')](_0x1447('0x5a'));});};(function(){if(_0x12e297[_0x1447('0x5b')]){window[_0x1447('0x5c')]=window['_QuatroDigital_DropDown']||{};if(_0x1447('0x2')!==typeof window['_QuatroDigital_DropDown'][_0x1447('0x26')]&&(_0x3f1566||!_0x1bab56))return _0x74cd5a(window[_0x1447('0x5c')]['getOrderForm']);if(_0x1447('0x16')!==typeof window[_0x1447('0x5d')]||'undefined'===typeof window[_0x1447('0x5d')][_0x1447('0x27')])if('object'===typeof vtex&&_0x1447('0x16')===typeof vtex['checkout']&&_0x1447('0x2')!==typeof vtex[_0x1447('0x27')]['SDK'])new vtex['checkout'][(_0x1447('0x5e'))]();else return _0x4a221d(_0x1447('0x5f'));_0x34f602[_0x1447('0x60')]([_0x1447('0x43'),'totalizers',_0x1447('0x61')],{'done':function(_0x948ea0){_0x74cd5a(_0x948ea0);window[_0x1447('0x5c')][_0x1447('0x26')]=_0x948ea0;},'fail':function(_0x4dc5ec){_0x4a221d(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.',_0x4dc5ec]);}});}else alert('Esta\x20é\x20uma\x20função\x20descontinuada\x20=/');}());_0x12e297[_0x1447('0x46')]();_0x34f602(window)[_0x1447('0x62')](_0x1447('0x63'));return _0x5a6387;};_0x34f602[_0x1447('0x30')]={'elements':_0x34f602('')};_0x34f602(function(){var _0xc9535f;'function'===typeof window[_0x1447('0x64')]&&(_0xc9535f=window[_0x1447('0x64')],window[_0x1447('0x64')]=function(_0x400039,_0x5e7172,_0x4a9f7a,_0x592ac5,_0x5dc170){_0xc9535f[_0x1447('0x28')](this,_0x400039,_0x5e7172,_0x4a9f7a,_0x592ac5,function(){_0x1447('0x9')===typeof _0x5dc170&&_0x5dc170();_0x34f602['QD_simpleCart']['elements'][_0x1447('0x39')](function(){var _0x4f0ef3=_0x34f602(this);_0x4f0ef3['simpleCart'](_0x4f0ef3[_0x1447('0x17')]('qd_simpleCartOpts'));});});});});var _0x18711b=window[_0x1447('0x65')]||void 0x0;window['ReloadItemsCart']=function(_0x45a219){_0x34f602['fn'][_0x1447('0x2b')](!0x0);_0x1447('0x9')===typeof _0x18711b?_0x18711b['call'](this,_0x45a219):alert(_0x45a219);};_0x34f602(function(){var _0x5760e8=_0x34f602(_0x1447('0x66'));_0x5760e8[_0x1447('0x6')]&&_0x5760e8['simpleCart']();});_0x34f602(function(){_0x34f602(window)['bind'](_0x1447('0x67'),function(){_0x34f602['fn'][_0x1447('0x2b')](!0x0);});});}catch(_0x4697ba){'undefined'!==typeof console&&_0x1447('0x9')===typeof console[_0x1447('0x14')]&&console[_0x1447('0x14')](_0x1447('0x68'),_0x4697ba);}}}());(function(){var _0x4c7b6c=function(_0x46d4c1,_0x4a5eba){if('object'===typeof console){var _0x16259a=_0x1447('0x16')===typeof _0x46d4c1;_0x1447('0x2')!==typeof _0x4a5eba&&_0x1447('0x2c')===_0x4a5eba[_0x1447('0xf')]()?_0x16259a?console[_0x1447('0x2d')](_0x1447('0x69'),_0x46d4c1[0x0],_0x46d4c1[0x1],_0x46d4c1[0x2],_0x46d4c1[0x3],_0x46d4c1[0x4],_0x46d4c1[0x5],_0x46d4c1[0x6],_0x46d4c1[0x7]):console[_0x1447('0x2d')](_0x1447('0x69')+_0x46d4c1):_0x1447('0x2')!==typeof _0x4a5eba&&_0x1447('0x2f')===_0x4a5eba[_0x1447('0xf')]()?_0x16259a?console[_0x1447('0x2f')](_0x1447('0x69'),_0x46d4c1[0x0],_0x46d4c1[0x1],_0x46d4c1[0x2],_0x46d4c1[0x3],_0x46d4c1[0x4],_0x46d4c1[0x5],_0x46d4c1[0x6],_0x46d4c1[0x7]):console[_0x1447('0x2f')](_0x1447('0x69')+_0x46d4c1):_0x16259a?console[_0x1447('0x14')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x46d4c1[0x0],_0x46d4c1[0x1],_0x46d4c1[0x2],_0x46d4c1[0x3],_0x46d4c1[0x4],_0x46d4c1[0x5],_0x46d4c1[0x6],_0x46d4c1[0x7]):console['error']('[QD\x20VTEX\x20Checkout\x20Queue]\x0a'+_0x46d4c1);}},_0x1b8e4e=null,_0x762e2f={},_0x1b98cd={},_0x5cfa9a={};$['QD_checkoutQueue']=function(_0x208d63,_0x22208d){if(null===_0x1b8e4e)if(_0x1447('0x16')===typeof window['vtexjs']&&_0x1447('0x2')!==typeof window[_0x1447('0x5d')][_0x1447('0x27')])_0x1b8e4e=window['vtexjs'][_0x1447('0x27')];else return _0x4c7b6c('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js');var _0x19f2ba=$[_0x1447('0x38')]({'done':function(){},'fail':function(){}},_0x22208d),_0x27c94e=_0x208d63[_0x1447('0x8')](';'),_0x8b6e77=function(){_0x762e2f[_0x27c94e]['add'](_0x19f2ba[_0x1447('0x1e')]);_0x1b98cd[_0x27c94e][_0x1447('0x32')](_0x19f2ba[_0x1447('0x1f')]);};_0x5cfa9a[_0x27c94e]?_0x8b6e77():(_0x762e2f[_0x27c94e]=$[_0x1447('0x6a')](),_0x1b98cd[_0x27c94e]=$['Callbacks'](),_0x8b6e77(),_0x5cfa9a[_0x27c94e]=!0x0,_0x1b8e4e[_0x1447('0x26')](_0x208d63)[_0x1447('0x1e')](function(_0x53f20c){_0x5cfa9a[_0x27c94e]=!0x1;_0x762e2f[_0x27c94e][_0x1447('0x47')](_0x53f20c);})['fail'](function(_0x3cc106){_0x5cfa9a[_0x27c94e]=!0x1;_0x1b98cd[_0x27c94e][_0x1447('0x47')](_0x3cc106);}));};}());(function(_0x15d13b){try{var _0x4648f6=jQuery,_0x2ba3a8,_0x254b9d=_0x4648f6({}),_0x21fcc7=function(_0x4c2607,_0x1ae7d5){if(_0x1447('0x16')===typeof console&&_0x1447('0x2')!==typeof console[_0x1447('0x14')]&&_0x1447('0x2')!==typeof console[_0x1447('0x2f')]&&'undefined'!==typeof console[_0x1447('0x2d')]){var _0xbc07e6;_0x1447('0x16')===typeof _0x4c2607?(_0x4c2607['unshift'](_0x1447('0x6b')),_0xbc07e6=_0x4c2607):_0xbc07e6=[_0x1447('0x6b')+_0x4c2607];if(_0x1447('0x2')===typeof _0x1ae7d5||_0x1447('0x2c')!==_0x1ae7d5[_0x1447('0xf')]()&&_0x1447('0x6c')!==_0x1ae7d5['toLowerCase']())if(_0x1447('0x2')!==typeof _0x1ae7d5&&_0x1447('0x2f')===_0x1ae7d5[_0x1447('0xf')]())try{console[_0x1447('0x2f')][_0x1447('0x6d')](console,_0xbc07e6);}catch(_0x320fad){try{console['info'](_0xbc07e6[_0x1447('0x8')]('\x0a'));}catch(_0x2f073f){}}else try{console[_0x1447('0x14')]['apply'](console,_0xbc07e6);}catch(_0x5cde87){try{console[_0x1447('0x14')](_0xbc07e6['join']('\x0a'));}catch(_0x4ec46c){}}else try{console[_0x1447('0x2d')][_0x1447('0x6d')](console,_0xbc07e6);}catch(_0x2636a6){try{console[_0x1447('0x2d')](_0xbc07e6[_0x1447('0x8')]('\x0a'));}catch(_0x180543){}}}},_0x515d21={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0x1447('0x6e'),'buyQtt':_0x1447('0x6f'),'selectSkuMsg':'javascript:','autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x457e62,_0x4d97d8,_0x1fff93){_0x4648f6(_0x1447('0x70'))['is']('.productQuickView')&&(_0x1447('0x71')===_0x4d97d8?alert(_0x1447('0x72')):(alert(_0x1447('0x73')),(_0x1447('0x16')===typeof parent?parent:document)[_0x1447('0x74')]['href']=_0x1fff93));},'isProductPage':function(){return _0x4648f6('body')['is'](_0x1447('0x75'));},'execDefaultAction':function(_0x400a4a){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x4648f6[_0x1447('0x76')]=function(_0x3c4a21,_0x1ba368){function _0x80215b(_0x1a3ed4){_0x2ba3a8[_0x1447('0x77')]?_0x1a3ed4[_0x1447('0x17')](_0x1447('0x78'))||(_0x1a3ed4[_0x1447('0x17')](_0x1447('0x78'),0x1),_0x1a3ed4['on']('click.qd_bb_buy_sc',function(_0x11a2cd){if(!_0x2ba3a8[_0x1447('0x79')]())return!0x0;if(!0x0!==_0x3f2904[_0x1447('0x7a')][_0x1447('0x28')](this))return _0x11a2cd[_0x1447('0x7b')](),!0x1;})):alert(_0x1447('0x7c'));}function _0x120642(_0x3acf91){_0x3acf91=_0x3acf91||_0x4648f6(_0x2ba3a8[_0x1447('0x7d')]);_0x3acf91[_0x1447('0x39')](function(){var _0x3acf91=_0x4648f6(this);_0x3acf91['is']('.qd-sbb-on')||(_0x3acf91[_0x1447('0x4c')]('qd-sbb-on'),_0x3acf91['is'](_0x1447('0x7e'))&&!_0x3acf91['is'](_0x1447('0x7f'))||_0x3acf91[_0x1447('0x17')]('qd-bb-active')||(_0x3acf91[_0x1447('0x17')](_0x1447('0x80'),0x1),_0x3acf91[_0x1447('0x81')](_0x1447('0x82'))[_0x1447('0x6')]||_0x3acf91['append'](_0x1447('0x83')),_0x3acf91['is'](_0x1447('0x84'))&&_0x2ba3a8[_0x1447('0x85')]()&&_0x3ed345[_0x1447('0x28')](_0x3acf91),_0x80215b(_0x3acf91)));});_0x2ba3a8[_0x1447('0x85')]()&&!_0x3acf91[_0x1447('0x6')]&&_0x21fcc7(_0x1447('0x86')+_0x3acf91[_0x1447('0x87')]+'\x27.','info');}var _0x9ed868=_0x4648f6(_0x3c4a21);var _0x3f2904=this;window[_0x1447('0x88')]=window[_0x1447('0x88')]||{};window[_0x1447('0x3b')]=window['_QuatroDigital_CartData']||{};_0x3f2904[_0x1447('0x89')]=function(_0x566779,_0x6b4bdf){_0x9ed868[_0x1447('0x4c')](_0x1447('0x8a'));_0x4648f6(_0x1447('0x70'))[_0x1447('0x4c')]('qd-bb-lightBoxBodyProdAdd');var _0x3f14bf=_0x4648f6(_0x2ba3a8[_0x1447('0x7d')])['filter']('[href=\x27'+(_0x566779[_0x1447('0x36')]('href')||_0x1447('0x8b'))+'\x27]')[_0x1447('0x32')](_0x566779);_0x3f14bf['addClass'](_0x1447('0x8c'));setTimeout(function(){_0x9ed868[_0x1447('0x8d')]('qd-bb-itemAddCartWrapper');_0x3f14bf['removeClass'](_0x1447('0x8c'));},_0x2ba3a8[_0x1447('0x8e')]);window[_0x1447('0x88')][_0x1447('0x26')]=void 0x0;if(_0x1447('0x2')!==typeof _0x1ba368&&'function'===typeof _0x1ba368[_0x1447('0x8f')])return _0x2ba3a8[_0x1447('0x77')]||(_0x21fcc7(_0x1447('0x90')),_0x1ba368['getCartInfoByUrl']()),window[_0x1447('0x5c')][_0x1447('0x26')]=void 0x0,_0x1ba368['getCartInfoByUrl'](function(_0x364e9c){window['_Quatro_Digital_dropDown'][_0x1447('0x26')]=_0x364e9c;_0x4648f6['fn'][_0x1447('0x2b')](!0x0,void 0x0,!0x0);},{'lastSku':_0x6b4bdf});window[_0x1447('0x88')][_0x1447('0x91')]=!0x0;_0x4648f6['fn'][_0x1447('0x2b')](!0x0);};(function(){if(_0x2ba3a8['isSmartCheckout']&&_0x2ba3a8['autoWatchBuyButton']){var _0x2935f1=_0x4648f6(_0x1447('0x7e'));_0x2935f1['length']&&_0x120642(_0x2935f1);}}());var _0x3ed345=function(){var _0x29e705=_0x4648f6(this);_0x1447('0x2')!==typeof _0x29e705[_0x1447('0x17')](_0x1447('0x7d'))?(_0x29e705[_0x1447('0x92')](_0x1447('0x93')),_0x80215b(_0x29e705)):(_0x29e705[_0x1447('0x94')](_0x1447('0x95'),function(_0x5a2d0d){_0x29e705['unbind']('click');_0x80215b(_0x29e705);_0x4648f6(this)[_0x1447('0x92')](_0x5a2d0d);}),_0x4648f6(window)[_0x1447('0x96')](function(){_0x29e705[_0x1447('0x92')](_0x1447('0x93'));_0x80215b(_0x29e705);_0x29e705[_0x1447('0x92')](_0x1447('0x95'));}));};_0x3f2904[_0x1447('0x7a')]=function(){var _0x466994=_0x4648f6(this),_0x3c4a21=_0x466994['attr'](_0x1447('0x97'))||'';if(-0x1<_0x3c4a21[_0x1447('0x98')](_0x2ba3a8[_0x1447('0x99')]))return!0x0;_0x3c4a21=_0x3c4a21['replace'](/redirect\=(false|true)/gi,'')[_0x1447('0x7')]('?',_0x1447('0x9a'))[_0x1447('0x7')](/\&\&/gi,'&');if(_0x2ba3a8['execDefaultAction'](_0x466994))return _0x466994[_0x1447('0x36')](_0x1447('0x97'),_0x3c4a21[_0x1447('0x7')](_0x1447('0x9b'),_0x1447('0x9c'))),!0x0;_0x3c4a21=_0x3c4a21['replace'](/http.?:/i,'');_0x254b9d['queue'](function(_0x1abd1f){if(!_0x2ba3a8[_0x1447('0x9d')]&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0x1447('0x9e')](_0x3c4a21))return _0x1abd1f();var _0x2e81b0=function(_0x1d8423,_0x180d34){var _0x120642=_0x3c4a21[_0x1447('0x9f')](/sku\=([0-9]+)/gi),_0x2021fd=[];if(_0x1447('0x16')===typeof _0x120642&&null!==_0x120642)for(var _0x23a122=_0x120642[_0x1447('0x6')]-0x1;0x0<=_0x23a122;_0x23a122--){var _0x2ef535=parseInt(_0x120642[_0x23a122][_0x1447('0x7')](/sku\=/gi,''));isNaN(_0x2ef535)||_0x2021fd[_0x1447('0xa0')](_0x2ef535);}_0x2ba3a8[_0x1447('0xa1')]['call'](this,_0x1d8423,_0x180d34,_0x3c4a21);_0x3f2904[_0x1447('0xa2')][_0x1447('0x28')](this,_0x1d8423,_0x180d34,_0x3c4a21,_0x2021fd);_0x3f2904[_0x1447('0x89')](_0x466994,_0x3c4a21[_0x1447('0xa3')](_0x1447('0xa4'))[_0x1447('0xa5')]()[_0x1447('0xa3')]('&')[_0x1447('0xa6')]());_0x1447('0x9')===typeof _0x2ba3a8[_0x1447('0xa7')]&&_0x2ba3a8['asyncCallback'][_0x1447('0x28')](this);_0x4648f6(window)[_0x1447('0x62')](_0x1447('0xa8'));_0x4648f6(window)['trigger']('cartProductAdded.vtex');};_0x2ba3a8[_0x1447('0xa9')]?(_0x2e81b0(null,_0x1447('0x71')),_0x1abd1f()):_0x4648f6[_0x1447('0x1d')]({'url':_0x3c4a21,'complete':_0x2e81b0})[_0x1447('0x20')](function(){_0x1abd1f();});});};_0x3f2904['buyButtonClickCallback']=function(_0x15e50e,_0x257887,_0x114d86,_0x2c8abf){try{_0x1447('0x71')===_0x257887&&'object'===typeof window[_0x1447('0xaa')]&&_0x1447('0x9')===typeof window[_0x1447('0xaa')]['_QuatroDigital_prodBuyCallback']&&window[_0x1447('0xaa')][_0x1447('0xab')](_0x15e50e,_0x257887,_0x114d86,_0x2c8abf);}catch(_0x329f2b){_0x21fcc7(_0x1447('0xac'));}};_0x120642();'function'===typeof _0x2ba3a8[_0x1447('0x46')]?_0x2ba3a8[_0x1447('0x46')][_0x1447('0x28')](this):_0x21fcc7(_0x1447('0xad'));};var _0x921b70=_0x4648f6['Callbacks']();_0x4648f6['fn'][_0x1447('0x76')]=function(_0xe87a21,_0x228680){var _0x15d13b=_0x4648f6(this);_0x1447('0x2')!==typeof _0x228680||_0x1447('0x16')!==typeof _0xe87a21||_0xe87a21 instanceof _0x4648f6||(_0x228680=_0xe87a21,_0xe87a21=void 0x0);_0x2ba3a8=_0x4648f6[_0x1447('0x38')]({},_0x515d21,_0x228680);var _0x47d458;_0x921b70[_0x1447('0x32')](function(){_0x15d13b[_0x1447('0x81')]('.qd-bb-itemAddWrapper')[_0x1447('0x6')]||_0x15d13b[_0x1447('0xae')](_0x1447('0xaf'));_0x47d458=new _0x4648f6[(_0x1447('0x76'))](_0x15d13b,_0xe87a21);});_0x921b70[_0x1447('0x47')]();_0x4648f6(window)['on'](_0x1447('0xb0'),function(_0x5d4ead,_0x298ba3,_0x2d3633){_0x47d458[_0x1447('0x89')](_0x298ba3,_0x2d3633);});return _0x4648f6['extend'](_0x15d13b,_0x47d458);};var _0xb0b52e=0x0;_0x4648f6(document)['ajaxSend'](function(_0x487638,_0x17782a,_0x55a439){-0x1<_0x55a439[_0x1447('0x1a')][_0x1447('0xf')]()['indexOf']('/checkout/cart/add')&&(_0xb0b52e=(_0x55a439[_0x1447('0x1a')][_0x1447('0x9f')](/sku\=([0-9]+)/i)||[''])[_0x1447('0xa5')]());});_0x4648f6(window)[_0x1447('0x94')](_0x1447('0xb1'),function(){_0x4648f6(window)[_0x1447('0x62')]('QuatroDigital.qd_bb_prod_add',[new _0x4648f6(),_0xb0b52e]);});_0x4648f6(document)[_0x1447('0xb2')](function(){_0x921b70[_0x1447('0x47')]();});}catch(_0x33e3c3){'undefined'!==typeof console&&_0x1447('0x9')===typeof console['error']&&console[_0x1447('0x14')](_0x1447('0x68'),_0x33e3c3);}}(this));function qd_number_format(_0x44b482,_0x1c8492,_0x265c6a,_0x5ceb1a){_0x44b482=(_0x44b482+'')[_0x1447('0x7')](/[^0-9+\-Ee.]/g,'');_0x44b482=isFinite(+_0x44b482)?+_0x44b482:0x0;_0x1c8492=isFinite(+_0x1c8492)?Math[_0x1447('0xb3')](_0x1c8492):0x0;_0x5ceb1a='undefined'===typeof _0x5ceb1a?',':_0x5ceb1a;_0x265c6a=_0x1447('0x2')===typeof _0x265c6a?'.':_0x265c6a;var _0x53e0c4='',_0x53e0c4=function(_0x16c253,_0xb106a2){var _0x11e7dc=Math[_0x1447('0x3')](0xa,_0xb106a2);return''+(Math['round'](_0x16c253*_0x11e7dc)/_0x11e7dc)[_0x1447('0x5')](_0xb106a2);},_0x53e0c4=(_0x1c8492?_0x53e0c4(_0x44b482,_0x1c8492):''+Math[_0x1447('0x4')](_0x44b482))[_0x1447('0xa3')]('.');0x3<_0x53e0c4[0x0][_0x1447('0x6')]&&(_0x53e0c4[0x0]=_0x53e0c4[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x5ceb1a));(_0x53e0c4[0x1]||'')[_0x1447('0x6')]<_0x1c8492&&(_0x53e0c4[0x1]=_0x53e0c4[0x1]||'',_0x53e0c4[0x1]+=Array(_0x1c8492-_0x53e0c4[0x1][_0x1447('0x6')]+0x1)[_0x1447('0x8')]('0'));return _0x53e0c4[_0x1447('0x8')](_0x265c6a);}(function(){try{window[_0x1447('0x3b')]=window['_QuatroDigital_CartData']||{},window[_0x1447('0x3b')][_0x1447('0x46')]=window[_0x1447('0x3b')][_0x1447('0x46')]||$['Callbacks']();}catch(_0x274702){_0x1447('0x2')!==typeof console&&_0x1447('0x9')===typeof console[_0x1447('0x14')]&&console[_0x1447('0x14')](_0x1447('0x68'),_0x274702[_0x1447('0xb4')]);}}());(function(_0x545323){try{var _0x38a318=jQuery,_0x254c3d=function(_0x7be258,_0x51372b){if('object'===typeof console&&_0x1447('0x2')!==typeof console[_0x1447('0x14')]&&'undefined'!==typeof console[_0x1447('0x2f')]&&_0x1447('0x2')!==typeof console['warn']){var _0x530a98;_0x1447('0x16')===typeof _0x7be258?(_0x7be258[_0x1447('0xb5')](_0x1447('0xb6')),_0x530a98=_0x7be258):_0x530a98=[_0x1447('0xb6')+_0x7be258];if(_0x1447('0x2')===typeof _0x51372b||'alerta'!==_0x51372b['toLowerCase']()&&_0x1447('0x6c')!==_0x51372b[_0x1447('0xf')]())if(_0x1447('0x2')!==typeof _0x51372b&&_0x1447('0x2f')===_0x51372b[_0x1447('0xf')]())try{console[_0x1447('0x2f')][_0x1447('0x6d')](console,_0x530a98);}catch(_0x1419c4){try{console['info'](_0x530a98[_0x1447('0x8')]('\x0a'));}catch(_0x1ad21a){}}else try{console[_0x1447('0x14')]['apply'](console,_0x530a98);}catch(_0x5742d0){try{console[_0x1447('0x14')](_0x530a98[_0x1447('0x8')]('\x0a'));}catch(_0x4f7866){}}else try{console['warn'][_0x1447('0x6d')](console,_0x530a98);}catch(_0x203ede){try{console[_0x1447('0x2d')](_0x530a98[_0x1447('0x8')]('\x0a'));}catch(_0x4c8813){}}}};window[_0x1447('0x5c')]=window['_QuatroDigital_DropDown']||{};window[_0x1447('0x5c')][_0x1447('0x91')]=!0x0;_0x38a318['QD_dropDownCart']=function(){};_0x38a318['fn'][_0x1447('0xb7')]=function(){return{'fn':new _0x38a318()};};var _0x413222=function(_0x2a9fba){var _0x360ef1={'i':_0x1447('0xb8')};return function(_0x5a09f4){var _0x1fb76d=function(_0x281696){return _0x281696;};var _0x4bcdbe=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5a09f4=_0x5a09f4['d'+_0x4bcdbe[0x10]+'c'+_0x4bcdbe[0x11]+'m'+_0x1fb76d(_0x4bcdbe[0x1])+'n'+_0x4bcdbe[0xd]]['l'+_0x4bcdbe[0x12]+'c'+_0x4bcdbe[0x0]+'ti'+_0x1fb76d('o')+'n'];var _0x565c4f=function(_0x3459fc){return escape(encodeURIComponent(_0x3459fc[_0x1447('0x7')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x1e5ec2){return String[_0x1447('0xb9')](('Z'>=_0x1e5ec2?0x5a:0x7a)>=(_0x1e5ec2=_0x1e5ec2[_0x1447('0xba')](0x0)+0xd)?_0x1e5ec2:_0x1e5ec2-0x1a);})));};var _0x545323=_0x565c4f(_0x5a09f4[[_0x4bcdbe[0x9],_0x1fb76d('o'),_0x4bcdbe[0xc],_0x4bcdbe[_0x1fb76d(0xd)]][_0x1447('0x8')]('')]);_0x565c4f=_0x565c4f((window[['js',_0x1fb76d('no'),'m',_0x4bcdbe[0x1],_0x4bcdbe[0x4]['toUpperCase'](),'ite'][_0x1447('0x8')]('')]||_0x1447('0x8b'))+['.v',_0x4bcdbe[0xd],'e',_0x1fb76d('x'),'co',_0x1fb76d('mm'),_0x1447('0xbb'),_0x4bcdbe[0x1],'.c',_0x1fb76d('o'),'m.',_0x4bcdbe[0x13],'r'][_0x1447('0x8')](''));for(var _0x261bc3 in _0x360ef1){if(_0x565c4f===_0x261bc3+_0x360ef1[_0x261bc3]||_0x545323===_0x261bc3+_0x360ef1[_0x261bc3]){var _0x9eaa3f='tr'+_0x4bcdbe[0x11]+'e';break;}_0x9eaa3f='f'+_0x4bcdbe[0x0]+'ls'+_0x1fb76d(_0x4bcdbe[0x1])+'';}_0x1fb76d=!0x1;-0x1<_0x5a09f4[[_0x4bcdbe[0xc],'e',_0x4bcdbe[0x0],'rc',_0x4bcdbe[0x9]][_0x1447('0x8')]('')][_0x1447('0x98')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x1fb76d=!0x0);return[_0x9eaa3f,_0x1fb76d];}(_0x2a9fba);}(window);if(!eval(_0x413222[0x0]))return _0x413222[0x1]?_0x254c3d(_0x1447('0xbc')):!0x1;_0x38a318[_0x1447('0xb7')]=function(_0x3abd59,_0x5c8eea){var _0x5d5b1e=_0x38a318(_0x3abd59);if(!_0x5d5b1e['length'])return _0x5d5b1e;var _0x49d3e4=_0x38a318[_0x1447('0x38')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x1447('0xbd'),'linkCheckout':_0x1447('0xbe'),'cartTotal':_0x1447('0xbf'),'emptyCart':'Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','continueShopping':'Continuar\x20Comprando','shippingForm':_0x1447('0xc0')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x11b06d){return _0x11b06d['skuName']||_0x11b06d['name'];},'callback':function(){},'callbackProductsList':function(){}},_0x5c8eea);_0x38a318('');var _0x9b6790=this;if(_0x49d3e4[_0x1447('0x5b')]){var _0x38a4c6=!0x1;'undefined'===typeof window[_0x1447('0x5d')]&&(_0x254c3d(_0x1447('0xc1')),_0x38a318[_0x1447('0x1d')]({'url':_0x1447('0xc2'),'async':!0x1,'dataType':_0x1447('0xc3'),'error':function(){_0x254c3d(_0x1447('0xc4'));_0x38a4c6=!0x0;}}));if(_0x38a4c6)return _0x254c3d(_0x1447('0xc5'));}if(_0x1447('0x16')===typeof window['vtexjs']&&_0x1447('0x2')!==typeof window[_0x1447('0x5d')]['checkout'])var _0x36cd1d=window['vtexjs'][_0x1447('0x27')];else if('object'===typeof vtex&&'object'===typeof vtex[_0x1447('0x27')]&&_0x1447('0x2')!==typeof vtex[_0x1447('0x27')][_0x1447('0x5e')])_0x36cd1d=new vtex[(_0x1447('0x27'))][(_0x1447('0x5e'))]();else return _0x254c3d(_0x1447('0x5f'));_0x9b6790['cartContainer']='<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>';var _0x4bb2d2=function(_0x8168dc){_0x38a318(this)[_0x1447('0xc6')](_0x8168dc);_0x8168dc['find']('.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose')['add'](_0x38a318(_0x1447('0xc7')))['on']('click.qd_ddc_closeFn',function(){_0x5d5b1e[_0x1447('0x8d')](_0x1447('0xc8'));_0x38a318(document[_0x1447('0x70')])[_0x1447('0x8d')](_0x1447('0xc9'));});_0x38a318(document)['off'](_0x1447('0xca'))['on'](_0x1447('0xca'),function(_0x461062){0x1b==_0x461062['keyCode']&&(_0x5d5b1e[_0x1447('0x8d')](_0x1447('0xc8')),_0x38a318(document[_0x1447('0x70')])[_0x1447('0x8d')](_0x1447('0xc9')));});var _0x1678d3=_0x8168dc['find'](_0x1447('0xcb'));_0x8168dc[_0x1447('0x55')](_0x1447('0xcc'))['on'](_0x1447('0xcd'),function(){_0x9b6790[_0x1447('0xce')]('-',void 0x0,void 0x0,_0x1678d3);return!0x1;});_0x8168dc['find']('.qd-ddc-scrollDown')['on']('click.qd_ddc_scrollDown',function(){_0x9b6790['scrollCart'](void 0x0,void 0x0,void 0x0,_0x1678d3);return!0x1;});_0x8168dc[_0x1447('0x55')](_0x1447('0xcf'))[_0x1447('0xd0')]('')['on'](_0x1447('0xd1'),function(){_0x9b6790[_0x1447('0xd2')](_0x38a318(this));});if(_0x49d3e4[_0x1447('0xd3')]){var _0x5c8eea=0x0;_0x38a318(this)['on'](_0x1447('0xd4'),function(){var _0x8168dc=function(){window[_0x1447('0x5c')][_0x1447('0x91')]&&(_0x9b6790['getCartInfoByUrl'](),window[_0x1447('0x5c')][_0x1447('0x91')]=!0x1,_0x38a318['fn'][_0x1447('0x2b')](!0x0),_0x9b6790[_0x1447('0xd5')]());};_0x5c8eea=setInterval(function(){_0x8168dc();},0x258);_0x8168dc();});_0x38a318(this)['on']('mouseleave.qd_ddc_hover',function(){clearInterval(_0x5c8eea);});}};var _0x268662=function(_0x325dd7){_0x325dd7=_0x38a318(_0x325dd7);_0x49d3e4[_0x1447('0xd6')][_0x1447('0x57')]=_0x49d3e4['texts']['cartTotal'][_0x1447('0x7')](_0x1447('0xd7'),'<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>');_0x49d3e4[_0x1447('0xd6')][_0x1447('0x57')]=_0x49d3e4['texts'][_0x1447('0x57')]['replace']('#items',_0x1447('0xd8'));_0x49d3e4[_0x1447('0xd6')][_0x1447('0x57')]=_0x49d3e4['texts'][_0x1447('0x57')][_0x1447('0x7')](_0x1447('0xd9'),_0x1447('0xda'));_0x49d3e4[_0x1447('0xd6')][_0x1447('0x57')]=_0x49d3e4[_0x1447('0xd6')]['cartTotal']['replace'](_0x1447('0xdb'),_0x1447('0xdc'));_0x325dd7[_0x1447('0x55')](_0x1447('0xdd'))['html'](_0x49d3e4[_0x1447('0xd6')]['linkCart']);_0x325dd7[_0x1447('0x55')](_0x1447('0xde'))[_0x1447('0x51')](_0x49d3e4[_0x1447('0xd6')][_0x1447('0xdf')]);_0x325dd7[_0x1447('0x55')](_0x1447('0xe0'))[_0x1447('0x51')](_0x49d3e4[_0x1447('0xd6')][_0x1447('0xe1')]);_0x325dd7[_0x1447('0x55')](_0x1447('0xe2'))[_0x1447('0x51')](_0x49d3e4[_0x1447('0xd6')]['cartTotal']);_0x325dd7[_0x1447('0x55')](_0x1447('0xe3'))[_0x1447('0x51')](_0x49d3e4['texts']['shippingForm']);_0x325dd7[_0x1447('0x55')]('.qd-ddc-emptyCart\x20p')[_0x1447('0x51')](_0x49d3e4['texts'][_0x1447('0x59')]);return _0x325dd7;}(this[_0x1447('0xe4')]);var _0x54c04a=0x0;_0x5d5b1e[_0x1447('0x39')](function(){0x0<_0x54c04a?_0x4bb2d2[_0x1447('0x28')](this,_0x268662[_0x1447('0xe5')]()):_0x4bb2d2[_0x1447('0x28')](this,_0x268662);_0x54c04a++;});window[_0x1447('0x3b')][_0x1447('0x46')][_0x1447('0x32')](function(){_0x38a318(_0x1447('0xe6'))['html'](window[_0x1447('0x3b')][_0x1447('0x52')]||'--');_0x38a318('.qd-ddc-infoTotalItems')[_0x1447('0x51')](window[_0x1447('0x3b')][_0x1447('0x44')]||'0');_0x38a318(_0x1447('0xe7'))[_0x1447('0x51')](window['_QuatroDigital_CartData']['shipping']||'--');_0x38a318(_0x1447('0xe8'))['html'](window[_0x1447('0x3b')][_0x1447('0x41')]||'--');});var _0x3d2527=function(_0x194c78,_0x11a4de){if(_0x1447('0x2')===typeof _0x194c78[_0x1447('0x43')])return _0x254c3d('Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição');_0x9b6790[_0x1447('0xe9')][_0x1447('0x28')](this,_0x11a4de);};_0x9b6790['getCartInfoByUrl']=function(_0x31afd0,_0x3f981f){'undefined'!=typeof _0x3f981f?window['_QuatroDigital_DropDown'][_0x1447('0xea')]=_0x3f981f:window[_0x1447('0x5c')]['dataOptionsCache']&&(_0x3f981f=window[_0x1447('0x5c')][_0x1447('0xea')]);setTimeout(function(){window[_0x1447('0x5c')][_0x1447('0xea')]=void 0x0;},_0x49d3e4[_0x1447('0x8e')]);_0x38a318(_0x1447('0xeb'))[_0x1447('0x8d')](_0x1447('0xec'));if(_0x49d3e4[_0x1447('0x5b')]){var _0x5c8eea=function(_0x421e87){window[_0x1447('0x5c')][_0x1447('0x26')]=_0x421e87;_0x3d2527(_0x421e87,_0x3f981f);_0x1447('0x2')!==typeof window['_QuatroDigital_AmountProduct']&&_0x1447('0x9')===typeof window[_0x1447('0xed')][_0x1447('0xee')]&&window[_0x1447('0xed')][_0x1447('0xee')][_0x1447('0x28')](this);_0x38a318(_0x1447('0xeb'))[_0x1447('0x4c')](_0x1447('0xec'));};_0x1447('0x2')!==typeof window[_0x1447('0x5c')]['getOrderForm']?(_0x5c8eea(window[_0x1447('0x5c')][_0x1447('0x26')]),'function'===typeof _0x31afd0&&_0x31afd0(window[_0x1447('0x5c')]['getOrderForm'])):_0x38a318['QD_checkoutQueue'](['items',_0x1447('0x3c'),_0x1447('0x61')],{'done':function(_0x38e898){_0x5c8eea['call'](this,_0x38e898);_0x1447('0x9')===typeof _0x31afd0&&_0x31afd0(_0x38e898);},'fail':function(_0x4d5b35){_0x254c3d([_0x1447('0xef'),_0x4d5b35]);}});}else alert(_0x1447('0xf0'));};_0x9b6790['cartIsEmpty']=function(){var _0x9401cf=_0x38a318('.qd-ddc-wrapper');_0x9401cf[_0x1447('0x55')](_0x1447('0xf1'))[_0x1447('0x6')]?_0x9401cf[_0x1447('0x8d')]('qd-ddc-noItems'):_0x9401cf[_0x1447('0x4c')](_0x1447('0xf2'));};_0x9b6790[_0x1447('0xe9')]=function(_0x2ba7a3){var _0x5c8eea=_0x38a318(_0x1447('0xf3'));_0x5c8eea[_0x1447('0xf4')]();_0x5c8eea[_0x1447('0x39')](function(){var _0x5c8eea=_0x38a318(this),_0x3abd59,_0x4e6846,_0x487247=_0x38a318(''),_0x464fe9;for(_0x464fe9 in window['_QuatroDigital_DropDown'][_0x1447('0x26')][_0x1447('0x43')])if(_0x1447('0x16')===typeof window[_0x1447('0x5c')][_0x1447('0x26')][_0x1447('0x43')][_0x464fe9]){var _0x5a528e=window[_0x1447('0x5c')][_0x1447('0x26')]['items'][_0x464fe9];var _0x4855d9=_0x5a528e['productCategoryIds'][_0x1447('0x7')](/^\/|\/$/g,'')[_0x1447('0xa3')]('/');var _0x326f15=_0x38a318(_0x1447('0xf5'));_0x326f15[_0x1447('0x36')]({'data-sku':_0x5a528e['id'],'data-sku-index':_0x464fe9,'data-qd-departament':_0x4855d9[0x0],'data-qd-category':_0x4855d9[_0x4855d9['length']-0x1]});_0x326f15[_0x1447('0x4c')](_0x1447('0xf6')+_0x5a528e[_0x1447('0xf7')]);_0x326f15[_0x1447('0x55')](_0x1447('0xf8'))[_0x1447('0xc6')](_0x49d3e4['skuName'](_0x5a528e));_0x326f15[_0x1447('0x55')](_0x1447('0xf9'))[_0x1447('0xc6')](isNaN(_0x5a528e[_0x1447('0xfa')])?_0x5a528e[_0x1447('0xfa')]:0x0==_0x5a528e['sellingPrice']?_0x1447('0xfb'):(_0x38a318(_0x1447('0x35'))[_0x1447('0x36')](_0x1447('0x37'))||'R$')+'\x20'+qd_number_format(_0x5a528e[_0x1447('0xfa')]/0x64,0x2,',','.'));_0x326f15[_0x1447('0x55')]('.qd-ddc-quantity')[_0x1447('0x36')]({'data-sku':_0x5a528e['id'],'data-sku-index':_0x464fe9})['val'](_0x5a528e[_0x1447('0x45')]);_0x326f15[_0x1447('0x55')](_0x1447('0xfc'))['attr']({'data-sku':_0x5a528e['id'],'data-sku-index':_0x464fe9});_0x9b6790[_0x1447('0xfd')](_0x5a528e['id'],_0x326f15[_0x1447('0x55')](_0x1447('0xfe')),_0x5a528e[_0x1447('0xff')]);_0x326f15['find'](_0x1447('0x100'))[_0x1447('0x36')]({'data-sku':_0x5a528e['id'],'data-sku-index':_0x464fe9});_0x326f15[_0x1447('0x101')](_0x5c8eea);_0x487247=_0x487247[_0x1447('0x32')](_0x326f15);}try{var _0x4f3087=_0x5c8eea[_0x1447('0x0')]('.qd-ddc-wrapper')[_0x1447('0x55')](_0x1447('0xcf'));_0x4f3087[_0x1447('0x6')]&&''==_0x4f3087[_0x1447('0xd0')]()&&window['_QuatroDigital_DropDown'][_0x1447('0x26')][_0x1447('0x61')]['address']&&_0x4f3087[_0x1447('0xd0')](window[_0x1447('0x5c')][_0x1447('0x26')]['shippingData'][_0x1447('0x102')]['postalCode']);}catch(_0x21ee73){_0x254c3d(_0x1447('0x103')+_0x21ee73['message'],_0x1447('0x6c'));}_0x9b6790[_0x1447('0x104')](_0x5c8eea);_0x9b6790[_0x1447('0xd5')]();_0x2ba7a3&&_0x2ba7a3[_0x1447('0x105')]&&function(){_0x4e6846=_0x487247[_0x1447('0x49')](_0x1447('0x106')+_0x2ba7a3['lastSku']+'\x27]');_0x4e6846[_0x1447('0x6')]&&(_0x3abd59=0x0,_0x487247['each'](function(){var _0x2ba7a3=_0x38a318(this);if(_0x2ba7a3['is'](_0x4e6846))return!0x1;_0x3abd59+=_0x2ba7a3[_0x1447('0x107')]();}),_0x9b6790[_0x1447('0xce')](void 0x0,void 0x0,_0x3abd59,_0x5c8eea['add'](_0x5c8eea[_0x1447('0xaa')]())),_0x487247['removeClass'](_0x1447('0x108')),function(_0x368c72){_0x368c72[_0x1447('0x4c')](_0x1447('0x109'));_0x368c72[_0x1447('0x4c')]('qd-ddc-lastAddedFixed');setTimeout(function(){_0x368c72[_0x1447('0x8d')](_0x1447('0x109'));},_0x49d3e4[_0x1447('0x8e')]);}(_0x4e6846));}();});(function(){_QuatroDigital_DropDown['getOrderForm'][_0x1447('0x43')][_0x1447('0x6')]?(_0x38a318(_0x1447('0x70'))[_0x1447('0x8d')](_0x1447('0x10a'))[_0x1447('0x4c')](_0x1447('0x10b')),setTimeout(function(){_0x38a318('body')['removeClass'](_0x1447('0x10c'));},_0x49d3e4[_0x1447('0x8e')])):_0x38a318(_0x1447('0x70'))[_0x1447('0x8d')](_0x1447('0x10d'))['addClass'](_0x1447('0x10a'));}());_0x1447('0x9')===typeof _0x49d3e4[_0x1447('0x10e')]?_0x49d3e4[_0x1447('0x10e')][_0x1447('0x28')](this):_0x254c3d(_0x1447('0x10f'));};_0x9b6790[_0x1447('0xfd')]=function(_0x1e41b9,_0x39201d,_0x4be4e8){function _0x487c7a(){_0x39201d['removeClass']('qd-loaded')[_0x1447('0x96')](function(){_0x38a318(this)[_0x1447('0x4c')](_0x1447('0x110'));})['attr'](_0x1447('0x111'),_0x4be4e8);}_0x4be4e8?_0x487c7a():isNaN(_0x1e41b9)?_0x254c3d(_0x1447('0x112'),'alerta'):alert(_0x1447('0x113'));};_0x9b6790[_0x1447('0x104')]=function(_0x4ad34e){var _0x3e0959=function(_0x3af623,_0x51cb27){var _0x5c8eea=_0x38a318(_0x3af623);var _0x22c340=_0x5c8eea[_0x1447('0x36')](_0x1447('0x114'));var _0x3abd59=_0x5c8eea[_0x1447('0x36')](_0x1447('0x115'));if(_0x22c340){var _0xd924e=parseInt(_0x5c8eea['val']())||0x1;_0x9b6790[_0x1447('0x116')]([_0x22c340,_0x3abd59],_0xd924e,_0xd924e+0x1,function(_0x2f06e0){_0x5c8eea[_0x1447('0xd0')](_0x2f06e0);_0x1447('0x9')===typeof _0x51cb27&&_0x51cb27();});}};var _0x5c8eea=function(_0x2bf53f,_0x1ad618){var _0x5c8eea=_0x38a318(_0x2bf53f);var _0xe4437e=_0x5c8eea[_0x1447('0x36')](_0x1447('0x114'));var _0x3abd59=_0x5c8eea['attr'](_0x1447('0x115'));if(_0xe4437e){var _0x137100=parseInt(_0x5c8eea[_0x1447('0xd0')]())||0x2;_0x9b6790[_0x1447('0x116')]([_0xe4437e,_0x3abd59],_0x137100,_0x137100-0x1,function(_0x53661d){_0x5c8eea[_0x1447('0xd0')](_0x53661d);_0x1447('0x9')===typeof _0x1ad618&&_0x1ad618();});}};var _0x59b592=function(_0x5c7bf3,_0x3e7bd2){var _0x5c8eea=_0x38a318(_0x5c7bf3);var _0x21b628=_0x5c8eea[_0x1447('0x36')]('data-sku');var _0x3abd59=_0x5c8eea[_0x1447('0x36')]('data-sku-index');if(_0x21b628){var _0x2f049b=parseInt(_0x5c8eea[_0x1447('0xd0')]())||0x1;_0x9b6790['changeQantity']([_0x21b628,_0x3abd59],0x1,_0x2f049b,function(_0x5811e9){_0x5c8eea['val'](_0x5811e9);_0x1447('0x9')===typeof _0x3e7bd2&&_0x3e7bd2();});}};var _0x3abd59=_0x4ad34e['find'](_0x1447('0x117'));_0x3abd59[_0x1447('0x4c')](_0x1447('0x118'))[_0x1447('0x39')](function(){var _0x4ad34e=_0x38a318(this);_0x4ad34e[_0x1447('0x55')](_0x1447('0x119'))['on']('click.qd_ddc_more',function(_0x101dd7){_0x101dd7['preventDefault']();_0x3abd59['addClass']('qd-loading');_0x3e0959(_0x4ad34e[_0x1447('0x55')]('.qd-ddc-quantity'),function(){_0x3abd59['removeClass'](_0x1447('0x11a'));});});_0x4ad34e[_0x1447('0x55')](_0x1447('0x11b'))['on'](_0x1447('0x11c'),function(_0x2d268c){_0x2d268c['preventDefault']();_0x3abd59['addClass'](_0x1447('0x11a'));_0x5c8eea(_0x4ad34e[_0x1447('0x55')](_0x1447('0x11d')),function(){_0x3abd59[_0x1447('0x8d')](_0x1447('0x11a'));});});_0x4ad34e[_0x1447('0x55')](_0x1447('0x11d'))['on'](_0x1447('0x11e'),function(){_0x3abd59['addClass'](_0x1447('0x11a'));_0x59b592(this,function(){_0x3abd59[_0x1447('0x8d')](_0x1447('0x11a'));});});_0x4ad34e[_0x1447('0x55')](_0x1447('0x11d'))['on']('keyup.qd_ddc_change',function(_0x20c037){0xd==_0x20c037['keyCode']&&(_0x3abd59[_0x1447('0x4c')](_0x1447('0x11a')),_0x59b592(this,function(){_0x3abd59[_0x1447('0x8d')](_0x1447('0x11a'));}));});});_0x4ad34e[_0x1447('0x55')](_0x1447('0xf1'))['each'](function(){var _0x4ad34e=_0x38a318(this);_0x4ad34e[_0x1447('0x55')]('.qd-ddc-remove')['on']('click.qd_ddc_remove',function(){_0x4ad34e[_0x1447('0x4c')]('qd-loading');_0x9b6790[_0x1447('0x11f')](_0x38a318(this),function(_0x5cb8d6){_0x5cb8d6?_0x4ad34e[_0x1447('0x120')](!0x0)[_0x1447('0x121')](function(){_0x4ad34e['remove']();_0x9b6790['cartIsEmpty']();}):_0x4ad34e[_0x1447('0x8d')]('qd-loading');});return!0x1;});});};_0x9b6790['shippingCalculate']=function(_0x4a8b6e){var _0x16c2e8=_0x4a8b6e[_0x1447('0xd0')](),_0x16c2e8=_0x16c2e8[_0x1447('0x7')](/[^0-9\-]/g,''),_0x16c2e8=_0x16c2e8['replace'](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x1447('0x122')),_0x16c2e8=_0x16c2e8[_0x1447('0x7')](/(.{9}).*/g,'$1');_0x4a8b6e['val'](_0x16c2e8);0x9<=_0x16c2e8[_0x1447('0x6')]&&(_0x4a8b6e[_0x1447('0x17')](_0x1447('0x123'))!=_0x16c2e8&&_0x36cd1d[_0x1447('0x124')]({'postalCode':_0x16c2e8,'country':_0x1447('0x125')})[_0x1447('0x1e')](function(_0x449c1f){window[_0x1447('0x5c')][_0x1447('0x26')]=_0x449c1f;_0x9b6790['getCartInfoByUrl']();})['fail'](function(_0x1ada05){_0x254c3d([_0x1447('0x126'),_0x1ada05]);updateCartData();}),_0x4a8b6e[_0x1447('0x17')]('qdDdcLastPostalCode',_0x16c2e8));};_0x9b6790[_0x1447('0x116')]=function(_0x169374,_0x5d0e2a,_0x206229,_0x21df2d){function _0xa8f88b(_0x26de2c){_0x26de2c=_0x1447('0x127')!==typeof _0x26de2c?!0x1:_0x26de2c;_0x9b6790['getCartInfoByUrl']();window['_QuatroDigital_DropDown']['allowUpdate']=!0x1;_0x9b6790[_0x1447('0xd5')]();_0x1447('0x2')!==typeof window[_0x1447('0xed')]&&_0x1447('0x9')===typeof window[_0x1447('0xed')][_0x1447('0xee')]&&window[_0x1447('0xed')]['exec']['call'](this);_0x1447('0x9')===typeof adminCart&&adminCart();_0x38a318['fn'][_0x1447('0x2b')](!0x0,void 0x0,_0x26de2c);_0x1447('0x9')===typeof _0x21df2d&&_0x21df2d(_0x5d0e2a);}_0x206229=_0x206229||0x1;if(0x1>_0x206229)return _0x5d0e2a;if(_0x49d3e4['smartCheckout']){if(_0x1447('0x2')===typeof window['_QuatroDigital_DropDown'][_0x1447('0x26')][_0x1447('0x43')][_0x169374[0x1]])return _0x254c3d(_0x1447('0x128')+_0x169374[0x1]+']'),_0x5d0e2a;window[_0x1447('0x5c')]['getOrderForm'][_0x1447('0x43')][_0x169374[0x1]][_0x1447('0x45')]=_0x206229;window['_QuatroDigital_DropDown'][_0x1447('0x26')][_0x1447('0x43')][_0x169374[0x1]][_0x1447('0x129')]=_0x169374[0x1];_0x36cd1d['updateItems']([window[_0x1447('0x5c')][_0x1447('0x26')][_0x1447('0x43')][_0x169374[0x1]]],[_0x1447('0x43'),'totalizers',_0x1447('0x61')])[_0x1447('0x1e')](function(_0x5699e7){window[_0x1447('0x5c')]['getOrderForm']=_0x5699e7;_0xa8f88b(!0x0);})[_0x1447('0x1f')](function(_0x4f732d){_0x254c3d([_0x1447('0x12a'),_0x4f732d]);_0xa8f88b();});}else _0x254c3d(_0x1447('0x12b'));};_0x9b6790[_0x1447('0x11f')]=function(_0x8edf45,_0x4a068d){function _0x17c952(_0x2dcac6){_0x2dcac6='boolean'!==typeof _0x2dcac6?!0x1:_0x2dcac6;'undefined'!==typeof window[_0x1447('0xed')]&&_0x1447('0x9')===typeof window[_0x1447('0xed')][_0x1447('0xee')]&&window[_0x1447('0xed')]['exec'][_0x1447('0x28')](this);_0x1447('0x9')===typeof adminCart&&adminCart();_0x38a318['fn'][_0x1447('0x2b')](!0x0,void 0x0,_0x2dcac6);_0x1447('0x9')===typeof _0x4a068d&&_0x4a068d(_0x3abd59);}var _0x3abd59=!0x1,_0x344788=_0x38a318(_0x8edf45)[_0x1447('0x36')](_0x1447('0x115'));if(_0x49d3e4[_0x1447('0x5b')]){if('undefined'===typeof window[_0x1447('0x5c')][_0x1447('0x26')]['items'][_0x344788])return _0x254c3d(_0x1447('0x128')+_0x344788+']'),_0x3abd59;window[_0x1447('0x5c')]['getOrderForm'][_0x1447('0x43')][_0x344788][_0x1447('0x129')]=_0x344788;_0x36cd1d['removeItems']([window[_0x1447('0x5c')][_0x1447('0x26')][_0x1447('0x43')][_0x344788]],[_0x1447('0x43'),'totalizers',_0x1447('0x61')])[_0x1447('0x1e')](function(_0x51b886){_0x3abd59=!0x0;window['_QuatroDigital_DropDown'][_0x1447('0x26')]=_0x51b886;_0x3d2527(_0x51b886);_0x17c952(!0x0);})['fail'](function(_0x400da9){_0x254c3d([_0x1447('0x12c'),_0x400da9]);_0x17c952();});}else alert(_0x1447('0x12d'));};_0x9b6790['scrollCart']=function(_0x6b5458,_0x4b0265,_0x378244,_0x3100d4){_0x3100d4=_0x3100d4||_0x38a318(_0x1447('0x12e'));_0x6b5458=_0x6b5458||'+';_0x4b0265=_0x4b0265||0.9*_0x3100d4['height']();_0x3100d4[_0x1447('0x120')](!0x0,!0x0)[_0x1447('0x12f')]({'scrollTop':isNaN(_0x378244)?_0x6b5458+'='+_0x4b0265+'px':_0x378244});};_0x49d3e4['updateOnlyHover']||(_0x9b6790[_0x1447('0x8f')](),_0x38a318['fn'][_0x1447('0x2b')](!0x0));_0x38a318(window)['on']('productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex',function(){try{window['_QuatroDigital_DropDown']['getOrderForm']=void 0x0,_0x9b6790[_0x1447('0x8f')]();}catch(_0x17cd90){_0x254c3d(_0x1447('0x130')+_0x17cd90[_0x1447('0xb4')],_0x1447('0x131'));}});_0x1447('0x9')===typeof _0x49d3e4[_0x1447('0x46')]?_0x49d3e4[_0x1447('0x46')][_0x1447('0x28')](this):_0x254c3d('Callback\x20não\x20é\x20uma\x20função');};_0x38a318['fn']['QD_dropDownCart']=function(_0x217ebd){var _0x3b5fb3=_0x38a318(this);_0x3b5fb3['fn']=new _0x38a318[(_0x1447('0xb7'))](this,_0x217ebd);return _0x3b5fb3;};}catch(_0x260c50){_0x1447('0x2')!==typeof console&&_0x1447('0x9')===typeof console[_0x1447('0x14')]&&console[_0x1447('0x14')]('Oooops!\x20',_0x260c50);}}(this));(function(_0x556d03){try{var _0x31c726=jQuery;window[_0x1447('0xed')]=window[_0x1447('0xed')]||{};window['_QuatroDigital_AmountProduct'][_0x1447('0x43')]={};window[_0x1447('0xed')][_0x1447('0x132')]=!0x1;window[_0x1447('0xed')][_0x1447('0x133')]=!0x1;window[_0x1447('0xed')][_0x1447('0x134')]=!0x1;var _0x3c0bdf=function(){if(window[_0x1447('0xed')][_0x1447('0x132')]){var _0x2bf3a0=!0x1;var _0x556d03={};window[_0x1447('0xed')][_0x1447('0x43')]={};for(_0x106962 in window[_0x1447('0x5c')][_0x1447('0x26')]['items'])if('object'===typeof window[_0x1447('0x5c')]['getOrderForm'][_0x1447('0x43')][_0x106962]){var _0x491c1e=window['_QuatroDigital_DropDown']['getOrderForm'][_0x1447('0x43')][_0x106962];_0x1447('0x2')!==typeof _0x491c1e['productId']&&null!==_0x491c1e[_0x1447('0x135')]&&''!==_0x491c1e[_0x1447('0x135')]&&(window[_0x1447('0xed')][_0x1447('0x43')][_0x1447('0x136')+_0x491c1e[_0x1447('0x135')]]=window[_0x1447('0xed')]['items'][_0x1447('0x136')+_0x491c1e['productId']]||{},window[_0x1447('0xed')][_0x1447('0x43')][_0x1447('0x136')+_0x491c1e[_0x1447('0x135')]][_0x1447('0x137')]=_0x491c1e[_0x1447('0x135')],_0x556d03[_0x1447('0x136')+_0x491c1e[_0x1447('0x135')]]||(window[_0x1447('0xed')][_0x1447('0x43')][_0x1447('0x136')+_0x491c1e[_0x1447('0x135')]][_0x1447('0x44')]=0x0),window[_0x1447('0xed')]['items']['prod_'+_0x491c1e[_0x1447('0x135')]][_0x1447('0x44')]+=_0x491c1e['quantity'],_0x2bf3a0=!0x0,_0x556d03[_0x1447('0x136')+_0x491c1e[_0x1447('0x135')]]=!0x0);}var _0x106962=_0x2bf3a0;}else _0x106962=void 0x0;window['_QuatroDigital_AmountProduct'][_0x1447('0x132')]&&(_0x31c726(_0x1447('0x138'))[_0x1447('0x139')](),_0x31c726('.qd-bap-item-added')[_0x1447('0x8d')](_0x1447('0x13a')));for(var _0x9776fc in window[_0x1447('0xed')][_0x1447('0x43')]){_0x491c1e=window[_0x1447('0xed')][_0x1447('0x43')][_0x9776fc];if(_0x1447('0x16')!==typeof _0x491c1e)return;_0x556d03=_0x31c726('input.qd-productId[value='+_0x491c1e[_0x1447('0x137')]+']')['getParent']('li');if(window[_0x1447('0xed')][_0x1447('0x132')]||!_0x556d03['find'](_0x1447('0x138'))[_0x1447('0x6')])_0x2bf3a0=_0x31c726(_0x1447('0x13b')),_0x2bf3a0[_0x1447('0x55')](_0x1447('0x13c'))[_0x1447('0x51')](_0x491c1e[_0x1447('0x44')]),_0x491c1e=_0x556d03[_0x1447('0x55')](_0x1447('0x13d')),_0x491c1e['length']?_0x491c1e['prepend'](_0x2bf3a0)[_0x1447('0x4c')](_0x1447('0x13a')):_0x556d03[_0x1447('0xae')](_0x2bf3a0);}_0x106962&&(window[_0x1447('0xed')][_0x1447('0x132')]=!0x1);};window['_QuatroDigital_AmountProduct'][_0x1447('0xee')]=function(){window[_0x1447('0xed')][_0x1447('0x132')]=!0x0;_0x3c0bdf[_0x1447('0x28')](this);};_0x31c726(document)[_0x1447('0xb2')](function(){_0x3c0bdf['call'](this);});}catch(_0x3ea534){'undefined'!==typeof console&&_0x1447('0x9')===typeof console[_0x1447('0x14')]&&console[_0x1447('0x14')](_0x1447('0x68'),_0x3ea534);}}(this));(function(){try{var _0x46eecf=jQuery,_0x16a67f,_0x37e723={'selector':'.qdDdcContainer','dropDown':{},'buyButton':{}};_0x46eecf[_0x1447('0x13e')]=function(_0x3a3c59){var _0x19f22e={};_0x16a67f=_0x46eecf[_0x1447('0x38')](!0x0,{},_0x37e723,_0x3a3c59);_0x3a3c59=_0x46eecf(_0x16a67f[_0x1447('0x87')])['QD_dropDownCart'](_0x16a67f['dropDown']);_0x19f22e[_0x1447('0x7d')]='undefined'!==typeof _0x16a67f[_0x1447('0x13f')][_0x1447('0xd3')]&&!0x1===_0x16a67f[_0x1447('0x13f')]['updateOnlyHover']?_0x46eecf(_0x16a67f[_0x1447('0x87')])[_0x1447('0x76')](_0x3a3c59['fn'],_0x16a67f[_0x1447('0x7d')]):_0x46eecf(_0x16a67f[_0x1447('0x87')])[_0x1447('0x76')](_0x16a67f[_0x1447('0x7d')]);_0x19f22e[_0x1447('0x13f')]=_0x3a3c59;return _0x19f22e;};_0x46eecf['fn']['smartCart']=function(){_0x1447('0x16')===typeof console&&_0x1447('0x9')===typeof console['info']&&console[_0x1447('0x2f')](_0x1447('0x140'));};_0x46eecf[_0x1447('0x141')]=_0x46eecf['fn'][_0x1447('0x141')];}catch(_0x323dcc){_0x1447('0x2')!==typeof console&&_0x1447('0x9')===typeof console['error']&&console[_0x1447('0x14')]('Oooops!\x20',_0x323dcc);}}());

/* Quatro Digital - Smart Stock Available */
var _0x621a=['error','jqXHR','clearQueueDelay','undefined','ajax','readyState','data','textStatus','errorThrown','2.1','QD_smartStockAvailable','unshift','alerta','toLowerCase','aviso','info','apply','warn','length','addClass','qd-ssa-sku-no-selected','skus','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','message','sku','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','off','vtex.sku.selected.QD','qd-ssa-sku-prod-unavailable','hide','removeClass','qd-ssa-sku-selected','SkuSellersInformation','attr','data-qd-ssa-qtt','find','[data-qd-ssa-text]','qd-ssa-hide','[data-qd-ssa-text=\x22','filter','[data-qd-ssa-text=\x22default\x22]','html','replace','#qtt','show','qd-ssa-show','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','split','AvailableQuantity','trigger','vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','join','toUpperCase','ite','---','erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','/produto/sku/','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','qdPlugin','QuatroDigital.ssa.skuSelected','initialSkuSelected','unavailable','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','available','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','function','qdAjax','qdAjaxQueue','extend','opts','success','call','complete','parameters','callbackFns','boolean','errorPopulated','completePopulated','successPopulated','object'];(function(_0x55f8b4,_0x43f30d){var _0x2475f9=function(_0xdd6f4a){while(--_0xdd6f4a){_0x55f8b4['push'](_0x55f8b4['shift']());}};_0x2475f9(++_0x43f30d);}(_0x621a,0x195));var _0xa621=function(_0x2912b9,_0x55e6e1){_0x2912b9=_0x2912b9-0x0;var _0x154da8=_0x621a[_0x2912b9];return _0x154da8;};(function(_0x36ca59){if(_0xa621('0x0')!==typeof _0x36ca59[_0xa621('0x1')]){var _0x3b4eeb={};_0x36ca59[_0xa621('0x2')]=_0x3b4eeb;_0x36ca59['qdAjax']=function(_0xfdf399){var _0x31702d,_0x1bddf5;_0x31702d=_0x36ca59[_0xa621('0x3')]({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0xfdf399);_0x1bddf5=escape(encodeURIComponent(_0x31702d['url']));_0x3b4eeb[_0x1bddf5]=_0x3b4eeb[_0x1bddf5]||{};_0x3b4eeb[_0x1bddf5][_0xa621('0x4')]=_0x3b4eeb[_0x1bddf5][_0xa621('0x4')]||[];_0x3b4eeb[_0x1bddf5]['opts']['push']({'success':function(_0x344889,_0x27a1d9,_0x531dae){_0x31702d[_0xa621('0x5')][_0xa621('0x6')](this,_0x344889,_0x27a1d9,_0x531dae);},'error':function(_0x9046cb,_0x6d2cad,_0x4142c2){_0x31702d['error'][_0xa621('0x6')](this,_0x9046cb,_0x6d2cad,_0x4142c2);},'complete':function(_0x1f379c,_0x386b34){_0x31702d[_0xa621('0x7')]['call'](this,_0x1f379c,_0x386b34);}});_0x3b4eeb[_0x1bddf5][_0xa621('0x8')]=_0x3b4eeb[_0x1bddf5]['parameters']||{'success':{},'error':{},'complete':{}};_0x3b4eeb[_0x1bddf5][_0xa621('0x9')]=_0x3b4eeb[_0x1bddf5]['callbackFns']||{};_0x3b4eeb[_0x1bddf5][_0xa621('0x9')]['successPopulated']=_0xa621('0xa')===typeof _0x3b4eeb[_0x1bddf5][_0xa621('0x9')]['successPopulated']?_0x3b4eeb[_0x1bddf5][_0xa621('0x9')]['successPopulated']:!0x1;_0x3b4eeb[_0x1bddf5][_0xa621('0x9')][_0xa621('0xb')]=_0xa621('0xa')===typeof _0x3b4eeb[_0x1bddf5][_0xa621('0x9')]['errorPopulated']?_0x3b4eeb[_0x1bddf5]['callbackFns'][_0xa621('0xb')]:!0x1;_0x3b4eeb[_0x1bddf5][_0xa621('0x9')][_0xa621('0xc')]=_0xa621('0xa')===typeof _0x3b4eeb[_0x1bddf5]['callbackFns'][_0xa621('0xc')]?_0x3b4eeb[_0x1bddf5][_0xa621('0x9')]['completePopulated']:!0x1;_0xfdf399=_0x36ca59['extend']({},_0x31702d,{'success':function(_0x1c2e69,_0x294fcb,_0x26d953){_0x3b4eeb[_0x1bddf5]['parameters'][_0xa621('0x5')]={'data':_0x1c2e69,'textStatus':_0x294fcb,'jqXHR':_0x26d953};_0x3b4eeb[_0x1bddf5][_0xa621('0x9')][_0xa621('0xd')]=!0x0;for(var _0x36ca59 in _0x3b4eeb[_0x1bddf5][_0xa621('0x4')])_0xa621('0xe')===typeof _0x3b4eeb[_0x1bddf5][_0xa621('0x4')][_0x36ca59]&&(_0x3b4eeb[_0x1bddf5]['opts'][_0x36ca59][_0xa621('0x5')][_0xa621('0x6')](this,_0x1c2e69,_0x294fcb,_0x26d953),_0x3b4eeb[_0x1bddf5][_0xa621('0x4')][_0x36ca59][_0xa621('0x5')]=function(){});},'error':function(_0x188c6e,_0x551026,_0x35b386){_0x3b4eeb[_0x1bddf5][_0xa621('0x8')][_0xa621('0xf')]={'errorThrown':_0x35b386,'textStatus':_0x551026,'jqXHR':_0x188c6e};_0x3b4eeb[_0x1bddf5][_0xa621('0x9')]['errorPopulated']=!0x0;for(var _0xfdf399 in _0x3b4eeb[_0x1bddf5]['opts'])_0xa621('0xe')===typeof _0x3b4eeb[_0x1bddf5][_0xa621('0x4')][_0xfdf399]&&(_0x3b4eeb[_0x1bddf5][_0xa621('0x4')][_0xfdf399][_0xa621('0xf')][_0xa621('0x6')](this,_0x188c6e,_0x551026,_0x35b386),_0x3b4eeb[_0x1bddf5]['opts'][_0xfdf399][_0xa621('0xf')]=function(){});},'complete':function(_0x87a9e7,_0x3601ac){_0x3b4eeb[_0x1bddf5][_0xa621('0x8')][_0xa621('0x7')]={'textStatus':_0x3601ac,'jqXHR':_0x87a9e7};_0x3b4eeb[_0x1bddf5][_0xa621('0x9')][_0xa621('0xc')]=!0x0;for(var _0x256fd1 in _0x3b4eeb[_0x1bddf5][_0xa621('0x4')])_0xa621('0xe')===typeof _0x3b4eeb[_0x1bddf5][_0xa621('0x4')][_0x256fd1]&&(_0x3b4eeb[_0x1bddf5][_0xa621('0x4')][_0x256fd1][_0xa621('0x7')][_0xa621('0x6')](this,_0x87a9e7,_0x3601ac),_0x3b4eeb[_0x1bddf5][_0xa621('0x4')][_0x256fd1]['complete']=function(){});isNaN(parseInt(_0x31702d['clearQueueDelay']))||setTimeout(function(){_0x3b4eeb[_0x1bddf5][_0xa621('0x10')]=void 0x0;_0x3b4eeb[_0x1bddf5][_0xa621('0x4')]=void 0x0;_0x3b4eeb[_0x1bddf5][_0xa621('0x8')]=void 0x0;_0x3b4eeb[_0x1bddf5]['callbackFns']=void 0x0;},_0x31702d[_0xa621('0x11')]);}});_0xa621('0x12')===typeof _0x3b4eeb[_0x1bddf5]['jqXHR']?_0x3b4eeb[_0x1bddf5][_0xa621('0x10')]=_0x36ca59[_0xa621('0x13')](_0xfdf399):_0x3b4eeb[_0x1bddf5][_0xa621('0x10')]&&_0x3b4eeb[_0x1bddf5][_0xa621('0x10')][_0xa621('0x14')]&&0x4==_0x3b4eeb[_0x1bddf5][_0xa621('0x10')][_0xa621('0x14')]&&(_0x3b4eeb[_0x1bddf5]['callbackFns']['successPopulated']&&_0xfdf399[_0xa621('0x5')](_0x3b4eeb[_0x1bddf5][_0xa621('0x8')][_0xa621('0x5')][_0xa621('0x15')],_0x3b4eeb[_0x1bddf5][_0xa621('0x8')]['success'][_0xa621('0x16')],_0x3b4eeb[_0x1bddf5][_0xa621('0x8')][_0xa621('0x5')]['jqXHR']),_0x3b4eeb[_0x1bddf5][_0xa621('0x9')][_0xa621('0xb')]&&_0xfdf399[_0xa621('0xf')](_0x3b4eeb[_0x1bddf5][_0xa621('0x8')][_0xa621('0xf')][_0xa621('0x10')],_0x3b4eeb[_0x1bddf5][_0xa621('0x8')][_0xa621('0xf')][_0xa621('0x16')],_0x3b4eeb[_0x1bddf5][_0xa621('0x8')]['error'][_0xa621('0x17')]),_0x3b4eeb[_0x1bddf5][_0xa621('0x9')][_0xa621('0xc')]&&_0xfdf399['complete'](_0x3b4eeb[_0x1bddf5][_0xa621('0x8')][_0xa621('0x7')][_0xa621('0x10')],_0x3b4eeb[_0x1bddf5][_0xa621('0x8')][_0xa621('0x7')]['textStatus']));};_0x36ca59[_0xa621('0x1')]['version']=_0xa621('0x18');}}(jQuery));(function(_0x8925e6){'use strict';var _0x36f0ce=jQuery;if(typeof _0x36f0ce['fn'][_0xa621('0x19')]==='function')return;var _0x431d81='Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available';var _0x106fbb=function(_0x2dba6e,_0x19d45f){if(_0xa621('0xe')===typeof console){var _0x23b5d1;'object'===typeof _0x2dba6e?(_0x2dba6e[_0xa621('0x1a')]('['+_0x431d81+']\x0a'),_0x23b5d1=_0x2dba6e):_0x23b5d1=['['+_0x431d81+']\x0a'+_0x2dba6e];_0xa621('0x12')===typeof _0x19d45f||_0xa621('0x1b')!==_0x19d45f[_0xa621('0x1c')]()&&_0xa621('0x1d')!==_0x19d45f[_0xa621('0x1c')]()?_0xa621('0x12')!==typeof _0x19d45f&&_0xa621('0x1e')===_0x19d45f[_0xa621('0x1c')]()?console[_0xa621('0x1e')][_0xa621('0x1f')](console,_0x23b5d1):console[_0xa621('0xf')]['apply'](console,_0x23b5d1):console[_0xa621('0x20')][_0xa621('0x1f')](console,_0x23b5d1);}};var _0x5ba307={};var _0x4704cb=function(_0xa6e6e9,_0x27d8e4){if(!_0xa6e6e9[_0xa621('0x21')])return;_0xa6e6e9['addClass']('qd-ssa-on');_0xa6e6e9[_0xa621('0x22')](_0xa621('0x23'));try{_0xa6e6e9['addClass']('qd-ssa-skus-'+vtxctx[_0xa621('0x24')]['split'](';')[_0xa621('0x21')]);}catch(_0x1bdb76){_0x106fbb([_0xa621('0x25'),_0x1bdb76[_0xa621('0x26')]]);}_0x36f0ce(window)['on']('vtex.sku.selected\x20QuatroDigital.ssa.skuSelected',function(_0x2dbca1,_0x225899,_0x11c55a){try{_0x32ec8a(_0x11c55a[_0xa621('0x27')],function(_0x11ee87){_0x453820(_0x11ee87);_0x52b065(_0x11ee87);});}catch(_0x140977){_0x106fbb([_0xa621('0x28'),_0x140977[_0xa621('0x26')]]);}});_0x36f0ce(window)[_0xa621('0x29')](_0xa621('0x2a'));_0x36f0ce(window)['on']('QuatroDigital.ssa.prodUnavailable',function(){_0xa6e6e9[_0xa621('0x22')](_0xa621('0x2b'))[_0xa621('0x2c')]();});function _0x453820(_0x317c16){try{_0xa6e6e9[_0xa621('0x2d')](_0xa621('0x23'))[_0xa621('0x22')](_0xa621('0x2e'));var _0xeed93a=_0x317c16[0x0][_0xa621('0x2f')][0x0]['AvailableQuantity'];_0xa6e6e9[_0xa621('0x30')](_0xa621('0x31'),_0xeed93a);_0xa6e6e9['each'](function(){var _0x9d50e0=_0x36f0ce(this)[_0xa621('0x32')](_0xa621('0x33'));if(_0xeed93a<0x1)return _0x9d50e0[_0xa621('0x2c')]()[_0xa621('0x22')](_0xa621('0x34'))[_0xa621('0x2d')]('qd-ssa-show');var _0x2071a0=_0x9d50e0['filter'](_0xa621('0x35')+_0xeed93a+'\x22]');var _0x550f2d=_0x2071a0[_0xa621('0x21')]?_0x2071a0:_0x9d50e0[_0xa621('0x36')](_0xa621('0x37'));_0x9d50e0[_0xa621('0x2c')]()['addClass'](_0xa621('0x34'))[_0xa621('0x2d')]('qd-ssa-show');_0x550f2d['html'](_0x550f2d[_0xa621('0x38')]()[_0xa621('0x39')](_0xa621('0x3a'),_0xeed93a));_0x550f2d[_0xa621('0x3b')]()['addClass'](_0xa621('0x3c'))['removeClass']('qd-ssa-hide');});}catch(_0x208325){_0x106fbb([_0xa621('0x3d'),_0x208325[_0xa621('0x26')]]);}};function _0x52b065(_0x34f45b){if(vtxctx[_0xa621('0x24')][_0xa621('0x3e')](';')['length']===0x1&&_0x34f45b[0x0][_0xa621('0x2f')][0x0][_0xa621('0x3f')]==0x0)_0x36f0ce(window)[_0xa621('0x40')]('QuatroDigital.ssa.prodUnavailable');};};var _0x103e30=function(_0x199ec7){var _0x5b21cf={'i':_0xa621('0x41')};return function(_0x3efe1c){var _0x50f213,_0x176d79,_0x5bf852,_0x5f34d7;_0x176d79=function(_0x352fd6){return _0x352fd6;};_0x5bf852=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3efe1c=_0x3efe1c['d'+_0x5bf852[0x10]+'c'+_0x5bf852[0x11]+'m'+_0x176d79(_0x5bf852[0x1])+'n'+_0x5bf852[0xd]]['l'+_0x5bf852[0x12]+'c'+_0x5bf852[0x0]+'ti'+_0x176d79('o')+'n'];_0x50f213=function(_0x9af2e1){return escape(encodeURIComponent(_0x9af2e1[_0xa621('0x39')](/\./g,'¨')[_0xa621('0x39')](/[a-zA-Z]/g,function(_0x5c0525){return String['fromCharCode'](('Z'>=_0x5c0525?0x5a:0x7a)>=(_0x5c0525=_0x5c0525[_0xa621('0x42')](0x0)+0xd)?_0x5c0525:_0x5c0525-0x1a);})));};var _0x3b9a06=_0x50f213(_0x3efe1c[[_0x5bf852[0x9],_0x176d79('o'),_0x5bf852[0xc],_0x5bf852[_0x176d79(0xd)]][_0xa621('0x43')]('')]);_0x50f213=_0x50f213((window[['js',_0x176d79('no'),'m',_0x5bf852[0x1],_0x5bf852[0x4][_0xa621('0x44')](),_0xa621('0x45')]['join']('')]||_0xa621('0x46'))+['.v',_0x5bf852[0xd],'e',_0x176d79('x'),'co',_0x176d79('mm'),_0xa621('0x47'),_0x5bf852[0x1],'.c',_0x176d79('o'),'m.',_0x5bf852[0x13],'r']['join'](''));for(var _0x488af7 in _0x5b21cf){if(_0x50f213===_0x488af7+_0x5b21cf[_0x488af7]||_0x3b9a06===_0x488af7+_0x5b21cf[_0x488af7]){_0x5f34d7='tr'+_0x5bf852[0x11]+'e';break;}_0x5f34d7='f'+_0x5bf852[0x0]+'ls'+_0x176d79(_0x5bf852[0x1])+'';}_0x176d79=!0x1;-0x1<_0x3efe1c[[_0x5bf852[0xc],'e',_0x5bf852[0x0],'rc',_0x5bf852[0x9]][_0xa621('0x43')]('')][_0xa621('0x48')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x176d79=!0x0);return[_0x5f34d7,_0x176d79];}(_0x199ec7);}(window);if(!eval(_0x103e30[0x0]))return _0x103e30[0x1]?_0x106fbb(_0xa621('0x49')):!0x1;function _0x32ec8a(_0x59a70a,_0x1b3e72){_0x36f0ce[_0xa621('0x1')]({'url':_0xa621('0x4a')+_0x59a70a,'clearQueueDelay':null,'success':_0x1b3e72,'error':function(){_0x106fbb(_0xa621('0x4b'));}});};_0x36f0ce['fn'][_0xa621('0x19')]=function(_0x21a64d){var _0x18cb5a=_0x36f0ce(this);var _0x4f1350=_0x36f0ce[_0xa621('0x3')](!![],{},_0x5ba307,_0x21a64d);_0x18cb5a[_0xa621('0x4c')]=new _0x4704cb(_0x18cb5a,_0x4f1350);try{if(typeof _0x36f0ce['fn']['QD_smartStockAvailable']['initialSkuSelected']===_0xa621('0xe'))_0x36f0ce(window)[_0xa621('0x40')](_0xa621('0x4d'),[_0x36f0ce['fn'][_0xa621('0x19')][_0xa621('0x4e')]['prod'],_0x36f0ce['fn']['QD_smartStockAvailable'][_0xa621('0x4e')]['sku']]);}catch(_0x46d6e5){_0x106fbb(['Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20',_0x46d6e5['message']]);}if(_0x36f0ce['fn'][_0xa621('0x19')][_0xa621('0x4f')])_0x36f0ce(window)[_0xa621('0x40')]('QuatroDigital.ssa.prodUnavailable');return _0x18cb5a;};_0x36f0ce(window)['on'](_0xa621('0x2a'),function(_0x1de104,_0xc771b5,_0x346eb2){try{_0x36f0ce['fn']['QD_smartStockAvailable'][_0xa621('0x4e')]={'prod':_0xc771b5,'sku':_0x346eb2};_0x36f0ce(this)[_0xa621('0x29')](_0x1de104);}catch(_0x161608){_0x106fbb([_0xa621('0x50'),_0x161608[_0xa621('0x26')]]);}});_0x36f0ce(window)['on'](_0xa621('0x51'),function(_0x31050c,_0x1dcf9e,_0x44c720){try{var _0x2230f2=_0x44c720[_0xa621('0x21')];var _0x210ca1=0x0;for(var _0x541277=0x0;_0x541277<_0x2230f2;_0x541277++){if(!_0x44c720[_0x541277][_0xa621('0x52')])_0x210ca1=_0x210ca1+0x1;else break;}if(_0x2230f2<=_0x210ca1)_0x36f0ce['fn'][_0xa621('0x19')][_0xa621('0x4f')]=!![];_0x36f0ce(this)[_0xa621('0x29')](_0x31050c);}catch(_0x25d1c6){_0x106fbb([_0xa621('0x53'),_0x25d1c6[_0xa621('0x26')]]);}});_0x36f0ce(function(){_0x36f0ce('.qd_smart_stock_available_auto')['QD_smartStockAvailable']();});}(window));

// -include ../qd-quatro-lib-plugins/Infinity Scroll Memory/QD_infinityScrollMemory.min.js
