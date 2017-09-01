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
var _0x57ff=['qd-amazing-menu','>li','qd-am-dropdown','qd-am-level-','add','-li','callback','call','exec','.qd_amazing_menu_auto','function','QD_amazingMenu','object','undefined','error','info','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','apply','join','qdAmAddNdx','each','qd-am-li-','first','addClass','qd-am-first','qd-am-last','vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','find','.qd_am_code','filter','.qd-am-banner','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','url','html','img[alt=\x27','attr','data-qdam-value','getParent','.box-banner','insertBefore','text','[class*=\x27colunas\x27]','clone','hide','qd-am-content-loaded','\x27\x20falho.','ajaxCallback','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','li\x20>ul','qd-am-has-ul','children',':not(ul)','qd-am-elem-','replaceSpecialChars'];(function(_0x2c620b,_0x5b5f52){var _0x4d719d=function(_0x2be4b3){while(--_0x2be4b3){_0x2c620b['push'](_0x2c620b['shift']());}};_0x4d719d(++_0x5b5f52);}(_0x57ff,0xdf));var _0xf57f=function(_0x3a23a2,_0x4af548){_0x3a23a2=_0x3a23a2-0x0;var _0xb2b2b4=_0x57ff[_0x3a23a2];return _0xb2b2b4;};(function(_0x57536a){_0x57536a['fn']['getParent']=_0x57536a['fn']['closest'];}(jQuery));(function(_0x4925a8){var _0x1ccec3;var _0x3b1888=jQuery;if(_0xf57f('0x0')!==typeof _0x3b1888['fn'][_0xf57f('0x1')]){var _0x509193={'url':'/qd-amazing-menu','callback':function(){},'ajaxCallback':function(){}};var _0x10c771=function(_0x57ce0d,_0x41c8bb){if(_0xf57f('0x2')===typeof console&&_0xf57f('0x3')!==typeof console[_0xf57f('0x4')]&&_0xf57f('0x3')!==typeof console[_0xf57f('0x5')]&&'undefined'!==typeof console[_0xf57f('0x6')]){var _0x4f4518;_0xf57f('0x2')===typeof _0x57ce0d?(_0x57ce0d[_0xf57f('0x7')](_0xf57f('0x8')),_0x4f4518=_0x57ce0d):_0x4f4518=[_0xf57f('0x8')+_0x57ce0d];if(_0xf57f('0x3')===typeof _0x41c8bb||_0xf57f('0x9')!==_0x41c8bb[_0xf57f('0xa')]()&&'aviso'!==_0x41c8bb[_0xf57f('0xa')]())if(_0xf57f('0x3')!==typeof _0x41c8bb&&'info'===_0x41c8bb['toLowerCase']())try{console[_0xf57f('0x5')][_0xf57f('0xb')](console,_0x4f4518);}catch(_0x1d008c){try{console[_0xf57f('0x5')](_0x4f4518[_0xf57f('0xc')]('\x0a'));}catch(_0x32824c){}}else try{console[_0xf57f('0x4')][_0xf57f('0xb')](console,_0x4f4518);}catch(_0x2efb9f){try{console[_0xf57f('0x4')](_0x4f4518['join']('\x0a'));}catch(_0x5841ca){}}else try{console[_0xf57f('0x6')][_0xf57f('0xb')](console,_0x4f4518);}catch(_0x14a0b2){try{console['warn'](_0x4f4518[_0xf57f('0xc')]('\x0a'));}catch(_0x3cbb38){}}}};_0x3b1888['fn'][_0xf57f('0xd')]=function(){var _0x3dbf08=_0x3b1888(this);_0x3dbf08[_0xf57f('0xe')](function(_0x2a6af8){_0x3b1888(this)['addClass'](_0xf57f('0xf')+_0x2a6af8);});_0x3dbf08[_0xf57f('0x10')]()[_0xf57f('0x11')](_0xf57f('0x12'));_0x3dbf08['last']()['addClass'](_0xf57f('0x13'));return _0x3dbf08;};_0x3b1888['fn'][_0xf57f('0x1')]=function(){};_0x4925a8=function(_0x890730){var _0x3dfa3a={'i':_0xf57f('0x14')};return function(_0x3a2589){var _0x2e2fbf=function(_0x2bf6b8){return _0x2bf6b8;};var _0x1d8eb2=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3a2589=_0x3a2589['d'+_0x1d8eb2[0x10]+'c'+_0x1d8eb2[0x11]+'m'+_0x2e2fbf(_0x1d8eb2[0x1])+'n'+_0x1d8eb2[0xd]]['l'+_0x1d8eb2[0x12]+'c'+_0x1d8eb2[0x0]+'ti'+_0x2e2fbf('o')+'n'];var _0x3dda98=function(_0x47b69d){return escape(encodeURIComponent(_0x47b69d[_0xf57f('0x15')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x1d9e3c){return String[_0xf57f('0x16')](('Z'>=_0x1d9e3c?0x5a:0x7a)>=(_0x1d9e3c=_0x1d9e3c[_0xf57f('0x17')](0x0)+0xd)?_0x1d9e3c:_0x1d9e3c-0x1a);})));};var _0x17dfa3=_0x3dda98(_0x3a2589[[_0x1d8eb2[0x9],_0x2e2fbf('o'),_0x1d8eb2[0xc],_0x1d8eb2[_0x2e2fbf(0xd)]][_0xf57f('0xc')]('')]);_0x3dda98=_0x3dda98((window[['js',_0x2e2fbf('no'),'m',_0x1d8eb2[0x1],_0x1d8eb2[0x4]['toUpperCase'](),_0xf57f('0x18')][_0xf57f('0xc')]('')]||_0xf57f('0x19'))+['.v',_0x1d8eb2[0xd],'e',_0x2e2fbf('x'),'co',_0x2e2fbf('mm'),_0xf57f('0x1a'),_0x1d8eb2[0x1],'.c',_0x2e2fbf('o'),'m.',_0x1d8eb2[0x13],'r'][_0xf57f('0xc')](''));for(var _0x5730db in _0x3dfa3a){if(_0x3dda98===_0x5730db+_0x3dfa3a[_0x5730db]||_0x17dfa3===_0x5730db+_0x3dfa3a[_0x5730db]){var _0x1672af='tr'+_0x1d8eb2[0x11]+'e';break;}_0x1672af='f'+_0x1d8eb2[0x0]+'ls'+_0x2e2fbf(_0x1d8eb2[0x1])+'';}_0x2e2fbf=!0x1;-0x1<_0x3a2589[[_0x1d8eb2[0xc],'e',_0x1d8eb2[0x0],'rc',_0x1d8eb2[0x9]][_0xf57f('0xc')]('')]['indexOf'](_0xf57f('0x1b'))&&(_0x2e2fbf=!0x0);return[_0x1672af,_0x2e2fbf];}(_0x890730);}(window);if(!eval(_0x4925a8[0x0]))return _0x4925a8[0x1]?_0x10c771('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x4f83f1=function(_0x454a6b){var _0x392d54=_0x454a6b[_0xf57f('0x1c')](_0xf57f('0x1d'));var _0x23ef54=_0x392d54[_0xf57f('0x1e')](_0xf57f('0x1f'));var _0x4e9aed=_0x392d54['filter']('.qd-am-collection');if(_0x23ef54[_0xf57f('0x20')]||_0x4e9aed[_0xf57f('0x20')])_0x23ef54[_0xf57f('0x21')]()[_0xf57f('0x11')](_0xf57f('0x22')),_0x4e9aed['parent']()[_0xf57f('0x11')](_0xf57f('0x23')),_0x3b1888[_0xf57f('0x24')]({'url':_0x1ccec3[_0xf57f('0x25')],'dataType':_0xf57f('0x26'),'success':function(_0x42a86b){var _0x192c6f=_0x3b1888(_0x42a86b);_0x23ef54[_0xf57f('0xe')](function(){var _0x42a86b=_0x3b1888(this);var _0xed0b70=_0x192c6f[_0xf57f('0x1c')](_0xf57f('0x27')+_0x42a86b[_0xf57f('0x28')](_0xf57f('0x29'))+'\x27]');_0xed0b70[_0xf57f('0x20')]&&(_0xed0b70[_0xf57f('0xe')](function(){_0x3b1888(this)[_0xf57f('0x2a')](_0xf57f('0x2b'))['clone']()[_0xf57f('0x2c')](_0x42a86b);}),_0x42a86b['hide']());})[_0xf57f('0x11')]('qd-am-content-loaded');_0x4e9aed[_0xf57f('0xe')](function(){var _0x42a86b={};var _0x32e4d5=_0x3b1888(this);_0x192c6f[_0xf57f('0x1c')]('h2')['each'](function(){if(_0x3b1888(this)[_0xf57f('0x2d')]()['trim']()[_0xf57f('0xa')]()==_0x32e4d5[_0xf57f('0x28')](_0xf57f('0x29'))['trim']()['toLowerCase']())return _0x42a86b=_0x3b1888(this),!0x1;});_0x42a86b['length']&&(_0x42a86b[_0xf57f('0xe')](function(){_0x3b1888(this)[_0xf57f('0x2a')](_0xf57f('0x2e'))[_0xf57f('0x2f')]()[_0xf57f('0x2c')](_0x32e4d5);}),_0x32e4d5[_0xf57f('0x30')]());})['addClass'](_0xf57f('0x31'));},'error':function(){_0x10c771('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27'+_0x1ccec3[_0xf57f('0x25')]+_0xf57f('0x32'));},'complete':function(){_0x1ccec3[_0xf57f('0x33')]['call'](this);_0x3b1888(window)[_0xf57f('0x34')](_0xf57f('0x35'),_0x454a6b);},'clearQueueDelay':0xbb8});};_0x3b1888['QD_amazingMenu']=function(_0x328c11){var _0x486c67=_0x328c11[_0xf57f('0x1c')](_0xf57f('0x36'))[_0xf57f('0xe')](function(){var _0x4b9c99=_0x3b1888(this);if(!_0x4b9c99[_0xf57f('0x20')])return _0x10c771(['UL\x20do\x20menu\x20não\x20encontrada',_0x328c11],_0xf57f('0x9'));_0x4b9c99[_0xf57f('0x1c')](_0xf57f('0x37'))[_0xf57f('0x21')]()[_0xf57f('0x11')](_0xf57f('0x38'));_0x4b9c99[_0xf57f('0x1c')]('li')[_0xf57f('0xe')](function(){var _0x213092=_0x3b1888(this);var _0x57eaed=_0x213092[_0xf57f('0x39')](_0xf57f('0x3a'));_0x57eaed[_0xf57f('0x20')]&&_0x213092[_0xf57f('0x11')](_0xf57f('0x3b')+_0x57eaed['first']()[_0xf57f('0x2d')]()['trim']()[_0xf57f('0x3c')]()[_0xf57f('0x15')](/\./g,'')[_0xf57f('0x15')](/\s/g,'-')[_0xf57f('0xa')]());});var _0x7f699f=_0x4b9c99['find']('>li')[_0xf57f('0xd')]();_0x4b9c99[_0xf57f('0x11')](_0xf57f('0x3d'));_0x7f699f=_0x7f699f[_0xf57f('0x1c')]('>ul');_0x7f699f[_0xf57f('0xe')](function(){var _0xf5b239=_0x3b1888(this);_0xf5b239['find'](_0xf57f('0x3e'))['qdAmAddNdx']()[_0xf57f('0x11')]('qd-am-column');_0xf5b239[_0xf57f('0x11')]('qd-am-dropdown-menu');_0xf5b239['parent']()['addClass'](_0xf57f('0x3f'));});_0x7f699f[_0xf57f('0x11')](_0xf57f('0x3f'));var _0x5034c7=0x0,_0x4925a8=function(_0x5206ce){_0x5034c7+=0x1;_0x5206ce=_0x5206ce[_0xf57f('0x39')]('li')[_0xf57f('0x39')]('*');_0x5206ce['length']&&(_0x5206ce[_0xf57f('0x11')](_0xf57f('0x40')+_0x5034c7),_0x4925a8(_0x5206ce));};_0x4925a8(_0x4b9c99);_0x4b9c99[_0xf57f('0x41')](_0x4b9c99[_0xf57f('0x1c')]('ul'))[_0xf57f('0xe')](function(){var _0x3a33f5=_0x3b1888(this);_0x3a33f5['addClass']('qd-am-'+_0x3a33f5[_0xf57f('0x39')]('li')[_0xf57f('0x20')]+_0xf57f('0x42'));});});_0x4f83f1(_0x486c67);_0x1ccec3[_0xf57f('0x43')][_0xf57f('0x44')](this);_0x3b1888(window)[_0xf57f('0x34')]('QuatroDigital.am.callback',_0x328c11);};_0x3b1888['fn'][_0xf57f('0x1')]=function(_0x2f67d7){var _0x56a5cd=_0x3b1888(this);if(!_0x56a5cd[_0xf57f('0x20')])return _0x56a5cd;_0x1ccec3=_0x3b1888['extend']({},_0x509193,_0x2f67d7);_0x56a5cd[_0xf57f('0x45')]=new _0x3b1888['QD_amazingMenu'](_0x3b1888(this));return _0x56a5cd;};_0x3b1888(function(){_0x3b1888(_0xf57f('0x46'))[_0xf57f('0x1')]();});}}(this));

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
var _0x7a5c=['qd-ddc-cart-rendered','callbackProductsList','load','qd-loaded','src','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku-index','changeQantity','data-sku','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','keyup.qd_ddc_change','click.qd_ddc_remove','removeProduct','stop','slideUp','remove','$1-$2$3','qdDdcLastPostalCode','BRA','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','_QuatroDigital_AmountProduct','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','updateItems','atenção\x20esta\x20método\x20esta\x20descontinuado','index','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','height','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','buyButtonClicked','quickViewUpdate','allowRecalculate','productId','prod_','prodId','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','.qd-bap-qtt','.qdDdcContainer','QD_smartCart','dropDown','smartCart','getParent','abs','undefined','pow','round','toFixed','length','prototype','trim','replace','function','capitalize','charAt','slice','toLowerCase','jquery','000','error','qdAjax','extend','GET','object','data','toString','url','type','jqXHR','ajax','done','success','fail','always','complete','clearQueueDelay','message','version','4.0','closest','checkout','getOrderForm','call','QuatroDigital_simpleCart','ajaxStopOn','simpleCart','alerta','warn','info','[Simple\x20Cart]\x0a','add','elements','.qd_cart_qtt','.qd_cart_total','meta[name=currency]','attr','content','each','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','Shipping','value','currencySymbol','shipping','allTotal','qtt','items','quantity','callback','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','hide','filter','.singular','show','addClass','qd-emptyCart','removeClass','$this','O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','html','total','cartQttE','itemsTextE','find','cartQtt','cartTotalE','itemsText','emptyElem','emptyCart','_QuatroDigital_DropDown','vtexjs','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','QD_checkoutQueue','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','trigger','QD_simpleCart','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','.qd_cart_auto','bind','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','join','Callbacks','fire','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','.productInformationWrapper\x20\x20a.buy-button','input.buy-in-page-quantity','body','.productQuickView','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','location','href','#produto,\x20.produto','QD_buyButton','qd-bb-click-active','click.qd_bb_buy_sc','allowBuyClick','clickBuySmartCheckout','preventDefault','Método\x20descontinuado!','buyButton','.qd-sbb-on','qd-sbb-on','.btn-add-buy-button-asynchronous','.remove-href','.qd-bb-productAdded','append','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','.buy-in-page-button','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','prodAdd','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','[href=\x27','---','qd-bb-itemAddBuyButtonWrapper','isSmartCheckout','função\x20descontinuada','getCartInfoByUrl','allowUpdate','autoWatchBuyButton','unbind','click','mouseenter.qd_bb_buy_sc','indexOf','?redirect=false&','redirect=false','redirect=true','test','match','push','productPageCallback','buyButtonClickCallback','split','ku=','pop','asyncCallback','productAddedToCart','cartProductAdded.vtex','fakeRequest','parent','Callback\x20não\x20é\x20uma\x20função','children','.qd-bb-itemAddWrapper','prepend','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','QuatroDigital.qd_bb_prod_add','ajaxSend','productAddedToCart.qdSbbVtex','ajaxStop','Oooops!\x20','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','QD_dropDownCart','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','name','smartCheckout','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','cartContainer','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','keyCode','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','val','keyup.qd_ddc_cep','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','cartIsEmpty','mouseleave.qd_ddc_hover','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','.qd-ddc-infoAllTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','exec','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','empty','productCategoryIds','qd-ddc-','availability','.qd-ddc-prodPrice','sellingPrice','.qd-ddc-quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','appendTo','.qd-ddc-shipping\x20input','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','[data-sku=\x27','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-empty'];(function(_0x4ed5f9,_0x12cce3){var _0x1d9dc8=function(_0x479984){while(--_0x479984){_0x4ed5f9['push'](_0x4ed5f9['shift']());}};_0x1d9dc8(++_0x12cce3);}(_0x7a5c,0x175));var _0xc7a5=function(_0xb5a0ad,_0x378f61){_0xb5a0ad=_0xb5a0ad-0x0;var _0x946a89=_0x7a5c[_0xb5a0ad];return _0x946a89;};(function(_0x11fc7c){_0x11fc7c['fn'][_0xc7a5('0x0')]=_0x11fc7c['fn']['closest'];}(jQuery));function qd_number_format(_0x65532a,_0x145acc,_0x231422,_0x265ee8){_0x65532a=(_0x65532a+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x65532a=isFinite(+_0x65532a)?+_0x65532a:0x0;_0x145acc=isFinite(+_0x145acc)?Math[_0xc7a5('0x1')](_0x145acc):0x0;_0x265ee8=_0xc7a5('0x2')===typeof _0x265ee8?',':_0x265ee8;_0x231422=_0xc7a5('0x2')===typeof _0x231422?'.':_0x231422;var _0x18d7ca='',_0x18d7ca=function(_0x1206ce,_0x3b4400){var _0x145acc=Math[_0xc7a5('0x3')](0xa,_0x3b4400);return''+(Math[_0xc7a5('0x4')](_0x1206ce*_0x145acc)/_0x145acc)[_0xc7a5('0x5')](_0x3b4400);},_0x18d7ca=(_0x145acc?_0x18d7ca(_0x65532a,_0x145acc):''+Math['round'](_0x65532a))['split']('.');0x3<_0x18d7ca[0x0][_0xc7a5('0x6')]&&(_0x18d7ca[0x0]=_0x18d7ca[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x265ee8));(_0x18d7ca[0x1]||'')['length']<_0x145acc&&(_0x18d7ca[0x1]=_0x18d7ca[0x1]||'',_0x18d7ca[0x1]+=Array(_0x145acc-_0x18d7ca[0x1][_0xc7a5('0x6')]+0x1)['join']('0'));return _0x18d7ca['join'](_0x231422);};'function'!==typeof String[_0xc7a5('0x7')][_0xc7a5('0x8')]&&(String[_0xc7a5('0x7')][_0xc7a5('0x8')]=function(){return this[_0xc7a5('0x9')](/^\s+|\s+$/g,'');});_0xc7a5('0xa')!=typeof String[_0xc7a5('0x7')]['capitalize']&&(String[_0xc7a5('0x7')][_0xc7a5('0xb')]=function(){return this[_0xc7a5('0xc')](0x0)['toUpperCase']()+this[_0xc7a5('0xd')](0x1)[_0xc7a5('0xe')]();});(function(_0x5d9ff7){if('function'!==typeof _0x5d9ff7['qdAjax']){var _0x56b80b={};_0x5d9ff7['qdAjaxQueue']=_0x56b80b;0x96>parseInt((_0x5d9ff7['fn'][_0xc7a5('0xf')][_0xc7a5('0x9')](/[^0-9]+/g,'')+_0xc7a5('0x10'))[_0xc7a5('0xd')](0x0,0x3),0xa)&&console&&_0xc7a5('0xa')==typeof console[_0xc7a5('0x11')]&&console[_0xc7a5('0x11')]();_0x5d9ff7[_0xc7a5('0x12')]=function(_0x1ff795){try{var _0x53c1b3=_0x5d9ff7[_0xc7a5('0x13')]({},{'url':'','type':_0xc7a5('0x14'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x1ff795);var _0x2bdc82=_0xc7a5('0x15')===typeof _0x53c1b3['data']?JSON['stringify'](_0x53c1b3[_0xc7a5('0x16')]):_0x53c1b3[_0xc7a5('0x16')][_0xc7a5('0x17')]();var _0x2892f5=encodeURIComponent(_0x53c1b3[_0xc7a5('0x18')]+'|'+_0x53c1b3[_0xc7a5('0x19')]+'|'+_0x2bdc82);_0x56b80b[_0x2892f5]=_0x56b80b[_0x2892f5]||{};_0xc7a5('0x2')==typeof _0x56b80b[_0x2892f5][_0xc7a5('0x1a')]?_0x56b80b[_0x2892f5]['jqXHR']=_0x5d9ff7[_0xc7a5('0x1b')](_0x53c1b3):(_0x56b80b[_0x2892f5][_0xc7a5('0x1a')][_0xc7a5('0x1c')](_0x53c1b3[_0xc7a5('0x1d')]),_0x56b80b[_0x2892f5][_0xc7a5('0x1a')][_0xc7a5('0x1e')](_0x53c1b3[_0xc7a5('0x11')]),_0x56b80b[_0x2892f5]['jqXHR'][_0xc7a5('0x1f')](_0x53c1b3[_0xc7a5('0x20')]));_0x56b80b[_0x2892f5][_0xc7a5('0x1a')]['always'](function(){isNaN(parseInt(_0x53c1b3['clearQueueDelay']))||setTimeout(function(){_0x56b80b[_0x2892f5]['jqXHR']=void 0x0;},_0x53c1b3[_0xc7a5('0x21')]);});return _0x56b80b[_0x2892f5]['jqXHR'];}catch(_0x2c17e6){'undefined'!==typeof console&&_0xc7a5('0xa')===typeof console[_0xc7a5('0x11')]&&console[_0xc7a5('0x11')]('Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20'+_0x2c17e6[_0xc7a5('0x22')]);}};_0x5d9ff7[_0xc7a5('0x12')][_0xc7a5('0x23')]=_0xc7a5('0x24');}}(jQuery));(function(_0x49b362){_0x49b362['fn'][_0xc7a5('0x0')]=_0x49b362['fn'][_0xc7a5('0x25')];}(jQuery));(function(){var _0x7a6edb=jQuery;if(_0xc7a5('0xa')!==typeof _0x7a6edb['fn']['simpleCart']){_0x7a6edb(function(){var _0x3c2fa8=vtexjs[_0xc7a5('0x26')][_0xc7a5('0x27')];vtexjs[_0xc7a5('0x26')][_0xc7a5('0x27')]=function(){return _0x3c2fa8[_0xc7a5('0x28')]();};});try{window[_0xc7a5('0x29')]=window[_0xc7a5('0x29')]||{};window['QuatroDigital_simpleCart'][_0xc7a5('0x2a')]=!0x1;_0x7a6edb['fn'][_0xc7a5('0x2b')]=function(_0x479134,_0x310059,_0x9355e9){var _0x1a699d=function(_0x269bf6,_0x257021){if(_0xc7a5('0x15')===typeof console){var _0x50101c=_0xc7a5('0x15')===typeof _0x269bf6;_0xc7a5('0x2')!==typeof _0x257021&&_0xc7a5('0x2c')===_0x257021[_0xc7a5('0xe')]()?_0x50101c?console[_0xc7a5('0x2d')]('[Simple\x20Cart]\x0a',_0x269bf6[0x0],_0x269bf6[0x1],_0x269bf6[0x2],_0x269bf6[0x3],_0x269bf6[0x4],_0x269bf6[0x5],_0x269bf6[0x6],_0x269bf6[0x7]):console[_0xc7a5('0x2d')]('[Simple\x20Cart]\x0a'+_0x269bf6):'undefined'!==typeof _0x257021&&_0xc7a5('0x2e')===_0x257021[_0xc7a5('0xe')]()?_0x50101c?console[_0xc7a5('0x2e')]('[Simple\x20Cart]\x0a',_0x269bf6[0x0],_0x269bf6[0x1],_0x269bf6[0x2],_0x269bf6[0x3],_0x269bf6[0x4],_0x269bf6[0x5],_0x269bf6[0x6],_0x269bf6[0x7]):console['info'](_0xc7a5('0x2f')+_0x269bf6):_0x50101c?console[_0xc7a5('0x11')](_0xc7a5('0x2f'),_0x269bf6[0x0],_0x269bf6[0x1],_0x269bf6[0x2],_0x269bf6[0x3],_0x269bf6[0x4],_0x269bf6[0x5],_0x269bf6[0x6],_0x269bf6[0x7]):console[_0xc7a5('0x11')](_0xc7a5('0x2f')+_0x269bf6);}};var _0x2fb48f=_0x7a6edb(this);_0xc7a5('0x15')===typeof _0x479134?_0x310059=_0x479134:(_0x479134=_0x479134||!0x1,_0x2fb48f=_0x2fb48f[_0xc7a5('0x30')](_0x7a6edb['QD_simpleCart'][_0xc7a5('0x31')]));if(!_0x2fb48f['length'])return _0x2fb48f;_0x7a6edb['QD_simpleCart'][_0xc7a5('0x31')]=_0x7a6edb['QD_simpleCart']['elements'][_0xc7a5('0x30')](_0x2fb48f);_0x9355e9=_0xc7a5('0x2')===typeof _0x9355e9?!0x1:_0x9355e9;var _0x1a3c92={'cartQtt':_0xc7a5('0x32'),'cartTotal':_0xc7a5('0x33'),'itemsText':'.qd_items_text','currencySymbol':(_0x7a6edb(_0xc7a5('0x34'))[_0xc7a5('0x35')](_0xc7a5('0x36'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x220035=_0x7a6edb[_0xc7a5('0x13')]({},_0x1a3c92,_0x310059);var _0x422c30=_0x7a6edb('');_0x2fb48f[_0xc7a5('0x37')](function(){var _0x302a58=_0x7a6edb(this);_0x302a58[_0xc7a5('0x16')](_0xc7a5('0x38'))||_0x302a58['data']('qd_simpleCartOpts',_0x220035);});var _0x342498=function(_0x35c6de){window['_QuatroDigital_CartData']=window[_0xc7a5('0x39')]||{};for(var _0x479134=0x0,_0x276f01=0x0,_0xa30f52=0x0;_0xa30f52<_0x35c6de[_0xc7a5('0x3a')][_0xc7a5('0x6')];_0xa30f52++)_0xc7a5('0x3b')==_0x35c6de[_0xc7a5('0x3a')][_0xa30f52]['id']&&(_0x276f01+=_0x35c6de[_0xc7a5('0x3a')][_0xa30f52][_0xc7a5('0x3c')]),_0x479134+=_0x35c6de['totalizers'][_0xa30f52][_0xc7a5('0x3c')];window[_0xc7a5('0x39')]['total']=_0x220035[_0xc7a5('0x3d')]+qd_number_format(_0x479134/0x64,0x2,',','.');window[_0xc7a5('0x39')][_0xc7a5('0x3e')]=_0x220035[_0xc7a5('0x3d')]+qd_number_format(_0x276f01/0x64,0x2,',','.');window['_QuatroDigital_CartData'][_0xc7a5('0x3f')]=_0x220035[_0xc7a5('0x3d')]+qd_number_format((_0x479134+_0x276f01)/0x64,0x2,',','.');window['_QuatroDigital_CartData'][_0xc7a5('0x40')]=0x0;if(_0x220035['showQuantityByItems'])for(_0xa30f52=0x0;_0xa30f52<_0x35c6de[_0xc7a5('0x41')][_0xc7a5('0x6')];_0xa30f52++)window[_0xc7a5('0x39')]['qtt']+=_0x35c6de['items'][_0xa30f52][_0xc7a5('0x42')];else window[_0xc7a5('0x39')][_0xc7a5('0x40')]=_0x35c6de[_0xc7a5('0x41')][_0xc7a5('0x6')]||0x0;try{window[_0xc7a5('0x39')][_0xc7a5('0x43')]&&window[_0xc7a5('0x39')]['callback']['fire']&&window[_0xc7a5('0x39')][_0xc7a5('0x43')]['fire']();}catch(_0x66e617){_0x1a699d(_0xc7a5('0x44'));}_0x4c146d(_0x422c30);};var _0x26e8ba=function(_0x12e6a6,_0x4cbd0c){0x1===_0x12e6a6?_0x4cbd0c[_0xc7a5('0x45')]()[_0xc7a5('0x46')](_0xc7a5('0x47'))[_0xc7a5('0x48')]():_0x4cbd0c[_0xc7a5('0x45')]()[_0xc7a5('0x46')]('.plural')[_0xc7a5('0x48')]();};var _0x44a9a1=function(_0x57bde7){0x1>_0x57bde7?_0x2fb48f[_0xc7a5('0x49')](_0xc7a5('0x4a')):_0x2fb48f[_0xc7a5('0x4b')](_0xc7a5('0x4a'));};var _0x3955bd=function(_0x5c0883,_0x3fa64f){var _0x23691a=parseInt(window['_QuatroDigital_CartData'][_0xc7a5('0x40')],0xa);_0x3fa64f[_0xc7a5('0x4c')][_0xc7a5('0x48')]();isNaN(_0x23691a)&&(_0x1a699d(_0xc7a5('0x4d'),_0xc7a5('0x2c')),_0x23691a=0x0);_0x3fa64f['cartTotalE'][_0xc7a5('0x4e')](window['_QuatroDigital_CartData'][_0xc7a5('0x4f')]);_0x3fa64f[_0xc7a5('0x50')][_0xc7a5('0x4e')](_0x23691a);_0x26e8ba(_0x23691a,_0x3fa64f[_0xc7a5('0x51')]);_0x44a9a1(_0x23691a);};var _0x4c146d=function(_0x37cf26){_0x2fb48f[_0xc7a5('0x37')](function(){var _0x2479ce={};var _0x1da26d=_0x7a6edb(this);_0x479134&&_0x1da26d[_0xc7a5('0x16')](_0xc7a5('0x38'))&&_0x7a6edb['extend'](_0x220035,_0x1da26d[_0xc7a5('0x16')](_0xc7a5('0x38')));_0x2479ce['$this']=_0x1da26d;_0x2479ce['cartQttE']=_0x1da26d[_0xc7a5('0x52')](_0x220035[_0xc7a5('0x53')])||_0x422c30;_0x2479ce[_0xc7a5('0x54')]=_0x1da26d[_0xc7a5('0x52')](_0x220035['cartTotal'])||_0x422c30;_0x2479ce[_0xc7a5('0x51')]=_0x1da26d['find'](_0x220035[_0xc7a5('0x55')])||_0x422c30;_0x2479ce[_0xc7a5('0x56')]=_0x1da26d[_0xc7a5('0x52')](_0x220035[_0xc7a5('0x57')])||_0x422c30;_0x3955bd(_0x37cf26,_0x2479ce);_0x1da26d[_0xc7a5('0x49')]('qd-sc-populated');});};(function(){if(_0x220035['smartCheckout']){window[_0xc7a5('0x58')]=window[_0xc7a5('0x58')]||{};if(_0xc7a5('0x2')!==typeof window['_QuatroDigital_DropDown'][_0xc7a5('0x27')]&&(_0x9355e9||!_0x479134))return _0x342498(window[_0xc7a5('0x58')][_0xc7a5('0x27')]);if('object'!==typeof window['vtexjs']||_0xc7a5('0x2')===typeof window[_0xc7a5('0x59')][_0xc7a5('0x26')])if('object'===typeof vtex&&_0xc7a5('0x15')===typeof vtex[_0xc7a5('0x26')]&&_0xc7a5('0x2')!==typeof vtex[_0xc7a5('0x26')][_0xc7a5('0x5a')])new vtex['checkout'][(_0xc7a5('0x5a'))]();else return _0x1a699d(_0xc7a5('0x5b'));_0x7a6edb[_0xc7a5('0x5c')]([_0xc7a5('0x41'),_0xc7a5('0x3a'),_0xc7a5('0x5d')],{'done':function(_0x50f710){_0x342498(_0x50f710);window[_0xc7a5('0x58')][_0xc7a5('0x27')]=_0x50f710;},'fail':function(_0x29f58e){_0x1a699d([_0xc7a5('0x5e'),_0x29f58e]);}});}else alert(_0xc7a5('0x5f'));}());_0x220035[_0xc7a5('0x43')]();_0x7a6edb(window)[_0xc7a5('0x60')]('simpleCartCallback.quatro_digital');return _0x2fb48f;};_0x7a6edb[_0xc7a5('0x61')]={'elements':_0x7a6edb('')};_0x7a6edb(function(){var _0x14c01d;_0xc7a5('0xa')===typeof window[_0xc7a5('0x62')]&&(_0x14c01d=window[_0xc7a5('0x62')],window['ajaxRequestbuyButtonAsynchronous']=function(_0x37b93e,_0x3cfaa0,_0x113e7b,_0x133c40,_0x25f8e1){_0x14c01d[_0xc7a5('0x28')](this,_0x37b93e,_0x3cfaa0,_0x113e7b,_0x133c40,function(){_0xc7a5('0xa')===typeof _0x25f8e1&&_0x25f8e1();_0x7a6edb[_0xc7a5('0x61')][_0xc7a5('0x31')][_0xc7a5('0x37')](function(){var _0x2ab63d=_0x7a6edb(this);_0x2ab63d[_0xc7a5('0x2b')](_0x2ab63d['data']('qd_simpleCartOpts'));});});});});var _0x81ee=window['ReloadItemsCart']||void 0x0;window[_0xc7a5('0x63')]=function(_0x4ff43f){_0x7a6edb['fn'][_0xc7a5('0x2b')](!0x0);_0xc7a5('0xa')===typeof _0x81ee?_0x81ee[_0xc7a5('0x28')](this,_0x4ff43f):alert(_0x4ff43f);};_0x7a6edb(function(){var _0x18cbb8=_0x7a6edb(_0xc7a5('0x64'));_0x18cbb8[_0xc7a5('0x6')]&&_0x18cbb8[_0xc7a5('0x2b')]();});_0x7a6edb(function(){_0x7a6edb(window)[_0xc7a5('0x65')](_0xc7a5('0x66'),function(){_0x7a6edb['fn'][_0xc7a5('0x2b')](!0x0);});});}catch(_0x26b6a2){_0xc7a5('0x2')!==typeof console&&'function'===typeof console[_0xc7a5('0x11')]&&console[_0xc7a5('0x11')]('Oooops!\x20',_0x26b6a2);}}}());(function(){var _0x2a2a3d=function(_0x2d4505,_0x20e303){if(_0xc7a5('0x15')===typeof console){var _0x38c9ae=_0xc7a5('0x15')===typeof _0x2d4505;_0xc7a5('0x2')!==typeof _0x20e303&&_0xc7a5('0x2c')===_0x20e303[_0xc7a5('0xe')]()?_0x38c9ae?console[_0xc7a5('0x2d')](_0xc7a5('0x67'),_0x2d4505[0x0],_0x2d4505[0x1],_0x2d4505[0x2],_0x2d4505[0x3],_0x2d4505[0x4],_0x2d4505[0x5],_0x2d4505[0x6],_0x2d4505[0x7]):console[_0xc7a5('0x2d')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a'+_0x2d4505):'undefined'!==typeof _0x20e303&&_0xc7a5('0x2e')===_0x20e303['toLowerCase']()?_0x38c9ae?console[_0xc7a5('0x2e')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x2d4505[0x0],_0x2d4505[0x1],_0x2d4505[0x2],_0x2d4505[0x3],_0x2d4505[0x4],_0x2d4505[0x5],_0x2d4505[0x6],_0x2d4505[0x7]):console[_0xc7a5('0x2e')](_0xc7a5('0x67')+_0x2d4505):_0x38c9ae?console['error']('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x2d4505[0x0],_0x2d4505[0x1],_0x2d4505[0x2],_0x2d4505[0x3],_0x2d4505[0x4],_0x2d4505[0x5],_0x2d4505[0x6],_0x2d4505[0x7]):console[_0xc7a5('0x11')](_0xc7a5('0x67')+_0x2d4505);}},_0xe9cd03=null,_0x4b5535={},_0x510ef8={},_0x55d904={};$[_0xc7a5('0x5c')]=function(_0x146001,_0x107857){if(null===_0xe9cd03)if(_0xc7a5('0x15')===typeof window['vtexjs']&&_0xc7a5('0x2')!==typeof window[_0xc7a5('0x59')][_0xc7a5('0x26')])_0xe9cd03=window[_0xc7a5('0x59')][_0xc7a5('0x26')];else return _0x2a2a3d(_0xc7a5('0x68'));var _0xfdb63d=$['extend']({'done':function(){},'fail':function(){}},_0x107857),_0x150218=_0x146001[_0xc7a5('0x69')](';'),_0x3292e0=function(){_0x4b5535[_0x150218][_0xc7a5('0x30')](_0xfdb63d[_0xc7a5('0x1c')]);_0x510ef8[_0x150218][_0xc7a5('0x30')](_0xfdb63d[_0xc7a5('0x1e')]);};_0x55d904[_0x150218]?_0x3292e0():(_0x4b5535[_0x150218]=$[_0xc7a5('0x6a')](),_0x510ef8[_0x150218]=$[_0xc7a5('0x6a')](),_0x3292e0(),_0x55d904[_0x150218]=!0x0,_0xe9cd03['getOrderForm'](_0x146001)[_0xc7a5('0x1c')](function(_0x37693c){_0x55d904[_0x150218]=!0x1;_0x4b5535[_0x150218][_0xc7a5('0x6b')](_0x37693c);})['fail'](function(_0x45f3c1){_0x55d904[_0x150218]=!0x1;_0x510ef8[_0x150218][_0xc7a5('0x6b')](_0x45f3c1);}));};}());(function(_0x184ebf){try{var _0x32bb5c=jQuery,_0x421e0a,_0x143fde=_0x32bb5c({}),_0x54eb6f=function(_0x5ba88e,_0x22ae4a){if(_0xc7a5('0x15')===typeof console&&_0xc7a5('0x2')!==typeof console[_0xc7a5('0x11')]&&_0xc7a5('0x2')!==typeof console[_0xc7a5('0x2e')]&&'undefined'!==typeof console[_0xc7a5('0x2d')]){var _0x17c722;_0xc7a5('0x15')===typeof _0x5ba88e?(_0x5ba88e[_0xc7a5('0x6c')](_0xc7a5('0x6d')),_0x17c722=_0x5ba88e):_0x17c722=['[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a'+_0x5ba88e];if(_0xc7a5('0x2')===typeof _0x22ae4a||'alerta'!==_0x22ae4a[_0xc7a5('0xe')]()&&_0xc7a5('0x6e')!==_0x22ae4a[_0xc7a5('0xe')]())if(_0xc7a5('0x2')!==typeof _0x22ae4a&&_0xc7a5('0x2e')===_0x22ae4a['toLowerCase']())try{console[_0xc7a5('0x2e')]['apply'](console,_0x17c722);}catch(_0x2a79d0){try{console[_0xc7a5('0x2e')](_0x17c722[_0xc7a5('0x69')]('\x0a'));}catch(_0x4cb1cf){}}else try{console['error'][_0xc7a5('0x6f')](console,_0x17c722);}catch(_0xeb57ae){try{console[_0xc7a5('0x11')](_0x17c722[_0xc7a5('0x69')]('\x0a'));}catch(_0x32311f){}}else try{console[_0xc7a5('0x2d')][_0xc7a5('0x6f')](console,_0x17c722);}catch(_0x4e2e5e){try{console[_0xc7a5('0x2d')](_0x17c722[_0xc7a5('0x69')]('\x0a'));}catch(_0x3b8b69){}}}},_0x424670={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0xc7a5('0x70'),'buyQtt':_0xc7a5('0x71'),'selectSkuMsg':'javascript:','autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x158ff7,_0x388b78,_0x4b3ac0){_0x32bb5c(_0xc7a5('0x72'))['is'](_0xc7a5('0x73'))&&('success'===_0x388b78?alert('Produto\x20adicionado\x20ao\x20carrinho!'):(alert(_0xc7a5('0x74')),('object'===typeof parent?parent:document)[_0xc7a5('0x75')][_0xc7a5('0x76')]=_0x4b3ac0));},'isProductPage':function(){return _0x32bb5c(_0xc7a5('0x72'))['is'](_0xc7a5('0x77'));},'execDefaultAction':function(_0x57ff39){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x32bb5c[_0xc7a5('0x78')]=function(_0x66eeed,_0x1613a0){function _0x1196eb(_0x276957){_0x421e0a['isSmartCheckout']?_0x276957[_0xc7a5('0x16')]('qd-bb-click-active')||(_0x276957['data'](_0xc7a5('0x79'),0x1),_0x276957['on'](_0xc7a5('0x7a'),function(_0x130c87){if(!_0x421e0a[_0xc7a5('0x7b')]())return!0x0;if(!0x0!==_0x5c0ea1[_0xc7a5('0x7c')]['call'](this))return _0x130c87[_0xc7a5('0x7d')](),!0x1;})):alert(_0xc7a5('0x7e'));}function _0x2086a8(_0x385c92){_0x385c92=_0x385c92||_0x32bb5c(_0x421e0a[_0xc7a5('0x7f')]);_0x385c92[_0xc7a5('0x37')](function(){var _0x385c92=_0x32bb5c(this);_0x385c92['is'](_0xc7a5('0x80'))||(_0x385c92[_0xc7a5('0x49')](_0xc7a5('0x81')),_0x385c92['is'](_0xc7a5('0x82'))&&!_0x385c92['is'](_0xc7a5('0x83'))||_0x385c92[_0xc7a5('0x16')]('qd-bb-active')||(_0x385c92['data']('qd-bb-active',0x1),_0x385c92['children'](_0xc7a5('0x84'))[_0xc7a5('0x6')]||_0x385c92[_0xc7a5('0x85')](_0xc7a5('0x86')),_0x385c92['is'](_0xc7a5('0x87'))&&_0x421e0a[_0xc7a5('0x88')]()&&_0x3c610f['call'](_0x385c92),_0x1196eb(_0x385c92)));});_0x421e0a[_0xc7a5('0x88')]()&&!_0x385c92[_0xc7a5('0x6')]&&_0x54eb6f(_0xc7a5('0x89')+_0x385c92[_0xc7a5('0x8a')]+'\x27.',_0xc7a5('0x2e'));}var _0x3454a9=_0x32bb5c(_0x66eeed);var _0x5c0ea1=this;window['_Quatro_Digital_dropDown']=window[_0xc7a5('0x8b')]||{};window[_0xc7a5('0x39')]=window[_0xc7a5('0x39')]||{};_0x5c0ea1[_0xc7a5('0x8c')]=function(_0x17eb41,_0x2ce69e){_0x3454a9[_0xc7a5('0x49')](_0xc7a5('0x8d'));_0x32bb5c(_0xc7a5('0x72'))[_0xc7a5('0x49')]('qd-bb-lightBoxBodyProdAdd');var _0x5ba1a5=_0x32bb5c(_0x421e0a[_0xc7a5('0x7f')])[_0xc7a5('0x46')](_0xc7a5('0x8e')+(_0x17eb41[_0xc7a5('0x35')](_0xc7a5('0x76'))||_0xc7a5('0x8f'))+'\x27]')[_0xc7a5('0x30')](_0x17eb41);_0x5ba1a5['addClass'](_0xc7a5('0x90'));setTimeout(function(){_0x3454a9['removeClass']('qd-bb-itemAddCartWrapper');_0x5ba1a5[_0xc7a5('0x4b')](_0xc7a5('0x90'));},_0x421e0a['timeRemoveNewItemClass']);window[_0xc7a5('0x8b')]['getOrderForm']=void 0x0;if(_0xc7a5('0x2')!==typeof _0x1613a0&&_0xc7a5('0xa')===typeof _0x1613a0['getCartInfoByUrl'])return _0x421e0a[_0xc7a5('0x91')]||(_0x54eb6f(_0xc7a5('0x92')),_0x1613a0[_0xc7a5('0x93')]()),window[_0xc7a5('0x58')][_0xc7a5('0x27')]=void 0x0,_0x1613a0[_0xc7a5('0x93')](function(_0x1a446b){window['_Quatro_Digital_dropDown']['getOrderForm']=_0x1a446b;_0x32bb5c['fn'][_0xc7a5('0x2b')](!0x0,void 0x0,!0x0);},{'lastSku':_0x2ce69e});window[_0xc7a5('0x8b')][_0xc7a5('0x94')]=!0x0;_0x32bb5c['fn'][_0xc7a5('0x2b')](!0x0);};(function(){if(_0x421e0a[_0xc7a5('0x91')]&&_0x421e0a[_0xc7a5('0x95')]){var _0x5460b9=_0x32bb5c(_0xc7a5('0x82'));_0x5460b9['length']&&_0x2086a8(_0x5460b9);}}());var _0x3c610f=function(){var _0x3ab837=_0x32bb5c(this);_0xc7a5('0x2')!==typeof _0x3ab837['data'](_0xc7a5('0x7f'))?(_0x3ab837[_0xc7a5('0x96')](_0xc7a5('0x97')),_0x1196eb(_0x3ab837)):(_0x3ab837[_0xc7a5('0x65')](_0xc7a5('0x98'),function(_0x5ef57c){_0x3ab837['unbind'](_0xc7a5('0x97'));_0x1196eb(_0x3ab837);_0x32bb5c(this)[_0xc7a5('0x96')](_0x5ef57c);}),_0x32bb5c(window)['load'](function(){_0x3ab837[_0xc7a5('0x96')](_0xc7a5('0x97'));_0x1196eb(_0x3ab837);_0x3ab837['unbind'](_0xc7a5('0x98'));}));};_0x5c0ea1[_0xc7a5('0x7c')]=function(){var _0x21eb39=_0x32bb5c(this),_0x66eeed=_0x21eb39[_0xc7a5('0x35')](_0xc7a5('0x76'))||'';if(-0x1<_0x66eeed[_0xc7a5('0x99')](_0x421e0a['selectSkuMsg']))return!0x0;_0x66eeed=_0x66eeed[_0xc7a5('0x9')](/redirect\=(false|true)/gi,'')['replace']('?',_0xc7a5('0x9a'))[_0xc7a5('0x9')](/\&\&/gi,'&');if(_0x421e0a['execDefaultAction'](_0x21eb39))return _0x21eb39[_0xc7a5('0x35')](_0xc7a5('0x76'),_0x66eeed[_0xc7a5('0x9')](_0xc7a5('0x9b'),_0xc7a5('0x9c'))),!0x0;_0x66eeed=_0x66eeed[_0xc7a5('0x9')](/http.?:/i,'');_0x143fde['queue'](function(_0x113dd2){if(!_0x421e0a['buyIfQuantityZeroed']&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0xc7a5('0x9d')](_0x66eeed))return _0x113dd2();var _0x4ee1f0=function(_0x14d2fa,_0x5cf25b){var _0x2086a8=_0x66eeed[_0xc7a5('0x9e')](/sku\=([0-9]+)/gi),_0x211510=[];if(_0xc7a5('0x15')===typeof _0x2086a8&&null!==_0x2086a8)for(var _0x1c4732=_0x2086a8[_0xc7a5('0x6')]-0x1;0x0<=_0x1c4732;_0x1c4732--){var _0x529e98=parseInt(_0x2086a8[_0x1c4732][_0xc7a5('0x9')](/sku\=/gi,''));isNaN(_0x529e98)||_0x211510[_0xc7a5('0x9f')](_0x529e98);}_0x421e0a[_0xc7a5('0xa0')][_0xc7a5('0x28')](this,_0x14d2fa,_0x5cf25b,_0x66eeed);_0x5c0ea1[_0xc7a5('0xa1')][_0xc7a5('0x28')](this,_0x14d2fa,_0x5cf25b,_0x66eeed,_0x211510);_0x5c0ea1['prodAdd'](_0x21eb39,_0x66eeed[_0xc7a5('0xa2')](_0xc7a5('0xa3'))[_0xc7a5('0xa4')]()['split']('&')['shift']());_0xc7a5('0xa')===typeof _0x421e0a[_0xc7a5('0xa5')]&&_0x421e0a[_0xc7a5('0xa5')]['call'](this);_0x32bb5c(window)[_0xc7a5('0x60')](_0xc7a5('0xa6'));_0x32bb5c(window)[_0xc7a5('0x60')](_0xc7a5('0xa7'));};_0x421e0a[_0xc7a5('0xa8')]?(_0x4ee1f0(null,'success'),_0x113dd2()):_0x32bb5c[_0xc7a5('0x1b')]({'url':_0x66eeed,'complete':_0x4ee1f0})[_0xc7a5('0x1f')](function(){_0x113dd2();});});};_0x5c0ea1['buyButtonClickCallback']=function(_0xda7163,_0x4ca63a,_0x2668f5,_0x232411){try{_0xc7a5('0x1d')===_0x4ca63a&&_0xc7a5('0x15')===typeof window[_0xc7a5('0xa9')]&&'function'===typeof window[_0xc7a5('0xa9')]['_QuatroDigital_prodBuyCallback']&&window[_0xc7a5('0xa9')]['_QuatroDigital_prodBuyCallback'](_0xda7163,_0x4ca63a,_0x2668f5,_0x232411);}catch(_0x28c162){_0x54eb6f('Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.');}};_0x2086a8();_0xc7a5('0xa')===typeof _0x421e0a[_0xc7a5('0x43')]?_0x421e0a[_0xc7a5('0x43')][_0xc7a5('0x28')](this):_0x54eb6f(_0xc7a5('0xaa'));};var _0x4b4e8d=_0x32bb5c['Callbacks']();_0x32bb5c['fn'][_0xc7a5('0x78')]=function(_0x1e6106,_0x12ac5e){var _0x184ebf=_0x32bb5c(this);'undefined'!==typeof _0x12ac5e||_0xc7a5('0x15')!==typeof _0x1e6106||_0x1e6106 instanceof _0x32bb5c||(_0x12ac5e=_0x1e6106,_0x1e6106=void 0x0);_0x421e0a=_0x32bb5c[_0xc7a5('0x13')]({},_0x424670,_0x12ac5e);var _0x5122f8;_0x4b4e8d[_0xc7a5('0x30')](function(){_0x184ebf[_0xc7a5('0xab')](_0xc7a5('0xac'))[_0xc7a5('0x6')]||_0x184ebf[_0xc7a5('0xad')](_0xc7a5('0xae'));_0x5122f8=new _0x32bb5c['QD_buyButton'](_0x184ebf,_0x1e6106);});_0x4b4e8d[_0xc7a5('0x6b')]();_0x32bb5c(window)['on'](_0xc7a5('0xaf'),function(_0x23ee28,_0x5b2d98,_0x7843e4){_0x5122f8[_0xc7a5('0x8c')](_0x5b2d98,_0x7843e4);});return _0x32bb5c[_0xc7a5('0x13')](_0x184ebf,_0x5122f8);};var _0x22f709=0x0;_0x32bb5c(document)[_0xc7a5('0xb0')](function(_0x5db619,_0x386a13,_0x3e1f17){-0x1<_0x3e1f17[_0xc7a5('0x18')][_0xc7a5('0xe')]()[_0xc7a5('0x99')]('/checkout/cart/add')&&(_0x22f709=(_0x3e1f17[_0xc7a5('0x18')][_0xc7a5('0x9e')](/sku\=([0-9]+)/i)||[''])['pop']());});_0x32bb5c(window)[_0xc7a5('0x65')](_0xc7a5('0xb1'),function(){_0x32bb5c(window)[_0xc7a5('0x60')]('QuatroDigital.qd_bb_prod_add',[new _0x32bb5c(),_0x22f709]);});_0x32bb5c(document)[_0xc7a5('0xb2')](function(){_0x4b4e8d[_0xc7a5('0x6b')]();});}catch(_0x4a3972){_0xc7a5('0x2')!==typeof console&&_0xc7a5('0xa')===typeof console['error']&&console[_0xc7a5('0x11')](_0xc7a5('0xb3'),_0x4a3972);}}(this));function qd_number_format(_0x5bfd23,_0x2aac53,_0x1d761b,_0x4c71eb){_0x5bfd23=(_0x5bfd23+'')[_0xc7a5('0x9')](/[^0-9+\-Ee.]/g,'');_0x5bfd23=isFinite(+_0x5bfd23)?+_0x5bfd23:0x0;_0x2aac53=isFinite(+_0x2aac53)?Math['abs'](_0x2aac53):0x0;_0x4c71eb=_0xc7a5('0x2')===typeof _0x4c71eb?',':_0x4c71eb;_0x1d761b=_0xc7a5('0x2')===typeof _0x1d761b?'.':_0x1d761b;var _0x58fa4b='',_0x58fa4b=function(_0x26a5ff,_0x397448){var _0x5ec734=Math[_0xc7a5('0x3')](0xa,_0x397448);return''+(Math[_0xc7a5('0x4')](_0x26a5ff*_0x5ec734)/_0x5ec734)[_0xc7a5('0x5')](_0x397448);},_0x58fa4b=(_0x2aac53?_0x58fa4b(_0x5bfd23,_0x2aac53):''+Math[_0xc7a5('0x4')](_0x5bfd23))[_0xc7a5('0xa2')]('.');0x3<_0x58fa4b[0x0]['length']&&(_0x58fa4b[0x0]=_0x58fa4b[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x4c71eb));(_0x58fa4b[0x1]||'')[_0xc7a5('0x6')]<_0x2aac53&&(_0x58fa4b[0x1]=_0x58fa4b[0x1]||'',_0x58fa4b[0x1]+=Array(_0x2aac53-_0x58fa4b[0x1]['length']+0x1)['join']('0'));return _0x58fa4b[_0xc7a5('0x69')](_0x1d761b);}(function(){try{window['_QuatroDigital_CartData']=window[_0xc7a5('0x39')]||{},window['_QuatroDigital_CartData']['callback']=window[_0xc7a5('0x39')][_0xc7a5('0x43')]||$[_0xc7a5('0x6a')]();}catch(_0x45ec7f){_0xc7a5('0x2')!==typeof console&&'function'===typeof console[_0xc7a5('0x11')]&&console[_0xc7a5('0x11')](_0xc7a5('0xb3'),_0x45ec7f[_0xc7a5('0x22')]);}}());(function(_0x490151){try{var _0x35496f=jQuery,_0xaff68f=function(_0x1fd913,_0x54d72e){if(_0xc7a5('0x15')===typeof console&&_0xc7a5('0x2')!==typeof console['error']&&_0xc7a5('0x2')!==typeof console['info']&&_0xc7a5('0x2')!==typeof console[_0xc7a5('0x2d')]){var _0x51c337;'object'===typeof _0x1fd913?(_0x1fd913[_0xc7a5('0x6c')](_0xc7a5('0xb4')),_0x51c337=_0x1fd913):_0x51c337=['[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'+_0x1fd913];if(_0xc7a5('0x2')===typeof _0x54d72e||_0xc7a5('0x2c')!==_0x54d72e[_0xc7a5('0xe')]()&&_0xc7a5('0x6e')!==_0x54d72e[_0xc7a5('0xe')]())if(_0xc7a5('0x2')!==typeof _0x54d72e&&_0xc7a5('0x2e')===_0x54d72e[_0xc7a5('0xe')]())try{console[_0xc7a5('0x2e')][_0xc7a5('0x6f')](console,_0x51c337);}catch(_0x58fdaf){try{console[_0xc7a5('0x2e')](_0x51c337['join']('\x0a'));}catch(_0x3e9fc8){}}else try{console[_0xc7a5('0x11')]['apply'](console,_0x51c337);}catch(_0x30b4a2){try{console['error'](_0x51c337[_0xc7a5('0x69')]('\x0a'));}catch(_0x290d04){}}else try{console[_0xc7a5('0x2d')][_0xc7a5('0x6f')](console,_0x51c337);}catch(_0x5d025a){try{console[_0xc7a5('0x2d')](_0x51c337[_0xc7a5('0x69')]('\x0a'));}catch(_0x1b6a2a){}}}};window[_0xc7a5('0x58')]=window[_0xc7a5('0x58')]||{};window[_0xc7a5('0x58')]['allowUpdate']=!0x0;_0x35496f['QD_dropDownCart']=function(){};_0x35496f['fn']['QD_dropDownCart']=function(){return{'fn':new _0x35496f()};};var _0x490131=function(_0xc49ac2){var _0x261b89={'i':_0xc7a5('0xb5')};return function(_0x1ac928){var _0x4dec79=function(_0x318235){return _0x318235;};var _0xb6ed03=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x1ac928=_0x1ac928['d'+_0xb6ed03[0x10]+'c'+_0xb6ed03[0x11]+'m'+_0x4dec79(_0xb6ed03[0x1])+'n'+_0xb6ed03[0xd]]['l'+_0xb6ed03[0x12]+'c'+_0xb6ed03[0x0]+'ti'+_0x4dec79('o')+'n'];var _0x8cb62b=function(_0x465d6a){return escape(encodeURIComponent(_0x465d6a['replace'](/\./g,'¨')[_0xc7a5('0x9')](/[a-zA-Z]/g,function(_0x4228ab){return String[_0xc7a5('0xb6')](('Z'>=_0x4228ab?0x5a:0x7a)>=(_0x4228ab=_0x4228ab[_0xc7a5('0xb7')](0x0)+0xd)?_0x4228ab:_0x4228ab-0x1a);})));};var _0x490151=_0x8cb62b(_0x1ac928[[_0xb6ed03[0x9],_0x4dec79('o'),_0xb6ed03[0xc],_0xb6ed03[_0x4dec79(0xd)]][_0xc7a5('0x69')]('')]);_0x8cb62b=_0x8cb62b((window[['js',_0x4dec79('no'),'m',_0xb6ed03[0x1],_0xb6ed03[0x4][_0xc7a5('0xb8')](),_0xc7a5('0xb9')]['join']('')]||_0xc7a5('0x8f'))+['.v',_0xb6ed03[0xd],'e',_0x4dec79('x'),'co',_0x4dec79('mm'),_0xc7a5('0xba'),_0xb6ed03[0x1],'.c',_0x4dec79('o'),'m.',_0xb6ed03[0x13],'r']['join'](''));for(var _0xd1705 in _0x261b89){if(_0x8cb62b===_0xd1705+_0x261b89[_0xd1705]||_0x490151===_0xd1705+_0x261b89[_0xd1705]){var _0x1610fa='tr'+_0xb6ed03[0x11]+'e';break;}_0x1610fa='f'+_0xb6ed03[0x0]+'ls'+_0x4dec79(_0xb6ed03[0x1])+'';}_0x4dec79=!0x1;-0x1<_0x1ac928[[_0xb6ed03[0xc],'e',_0xb6ed03[0x0],'rc',_0xb6ed03[0x9]][_0xc7a5('0x69')]('')]['indexOf'](_0xc7a5('0xbb'))&&(_0x4dec79=!0x0);return[_0x1610fa,_0x4dec79];}(_0xc49ac2);}(window);if(!eval(_0x490131[0x0]))return _0x490131[0x1]?_0xaff68f(_0xc7a5('0xbc')):!0x1;_0x35496f[_0xc7a5('0xbd')]=function(_0xb7fd8f,_0x333101){var _0x3466c6=_0x35496f(_0xb7fd8f);if(!_0x3466c6[_0xc7a5('0x6')])return _0x3466c6;var _0x1b0afd=_0x35496f[_0xc7a5('0x13')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0xc7a5('0xbe'),'linkCheckout':_0xc7a5('0xbf'),'cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':'Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','continueShopping':'Continuar\x20Comprando','shippingForm':_0xc7a5('0xc0')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0xbbf31d){return _0xbbf31d[_0xc7a5('0xc1')]||_0xbbf31d[_0xc7a5('0xc2')];},'callback':function(){},'callbackProductsList':function(){}},_0x333101);_0x35496f('');var _0x229755=this;if(_0x1b0afd[_0xc7a5('0xc3')]){var _0x4e2fac=!0x1;_0xc7a5('0x2')===typeof window['vtexjs']&&(_0xaff68f(_0xc7a5('0xc4')),_0x35496f[_0xc7a5('0x1b')]({'url':_0xc7a5('0xc5'),'async':!0x1,'dataType':_0xc7a5('0xc6'),'error':function(){_0xaff68f(_0xc7a5('0xc7'));_0x4e2fac=!0x0;}}));if(_0x4e2fac)return _0xaff68f(_0xc7a5('0xc8'));}if(_0xc7a5('0x15')===typeof window[_0xc7a5('0x59')]&&_0xc7a5('0x2')!==typeof window['vtexjs']['checkout'])var _0x419291=window[_0xc7a5('0x59')][_0xc7a5('0x26')];else if(_0xc7a5('0x15')===typeof vtex&&_0xc7a5('0x15')===typeof vtex[_0xc7a5('0x26')]&&'undefined'!==typeof vtex['checkout'][_0xc7a5('0x5a')])_0x419291=new vtex['checkout'][(_0xc7a5('0x5a'))]();else return _0xaff68f('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x229755[_0xc7a5('0xc9')]='<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>';var _0x23e80d=function(_0x338e79){_0x35496f(this)['append'](_0x338e79);_0x338e79[_0xc7a5('0x52')](_0xc7a5('0xca'))[_0xc7a5('0x30')](_0x35496f(_0xc7a5('0xcb')))['on']('click.qd_ddc_closeFn',function(){_0x3466c6['removeClass'](_0xc7a5('0xcc'));_0x35496f(document[_0xc7a5('0x72')])[_0xc7a5('0x4b')](_0xc7a5('0xcd'));});_0x35496f(document)[_0xc7a5('0xce')]('keyup.qd_ddc_closeFn')['on'](_0xc7a5('0xcf'),function(_0x313668){0x1b==_0x313668[_0xc7a5('0xd0')]&&(_0x3466c6[_0xc7a5('0x4b')](_0xc7a5('0xcc')),_0x35496f(document[_0xc7a5('0x72')])[_0xc7a5('0x4b')](_0xc7a5('0xcd')));});var _0x43465a=_0x338e79[_0xc7a5('0x52')]('.qd-ddc-prodWrapper');_0x338e79['find']('.qd-ddc-scrollUp')['on']('click.qd_ddc_scrollUp',function(){_0x229755[_0xc7a5('0xd1')]('-',void 0x0,void 0x0,_0x43465a);return!0x1;});_0x338e79['find'](_0xc7a5('0xd2'))['on'](_0xc7a5('0xd3'),function(){_0x229755[_0xc7a5('0xd1')](void 0x0,void 0x0,void 0x0,_0x43465a);return!0x1;});_0x338e79[_0xc7a5('0x52')]('.qd-ddc-shipping\x20input')[_0xc7a5('0xd4')]('')['on'](_0xc7a5('0xd5'),function(){_0x229755[_0xc7a5('0xd6')](_0x35496f(this));});if(_0x1b0afd[_0xc7a5('0xd7')]){var _0x333101=0x0;_0x35496f(this)['on'](_0xc7a5('0xd8'),function(){var _0x338e79=function(){window['_QuatroDigital_DropDown'][_0xc7a5('0x94')]&&(_0x229755[_0xc7a5('0x93')](),window[_0xc7a5('0x58')][_0xc7a5('0x94')]=!0x1,_0x35496f['fn']['simpleCart'](!0x0),_0x229755[_0xc7a5('0xd9')]());};_0x333101=setInterval(function(){_0x338e79();},0x258);_0x338e79();});_0x35496f(this)['on'](_0xc7a5('0xda'),function(){clearInterval(_0x333101);});}};var _0x1c9010=function(_0x2e12d9){_0x2e12d9=_0x35496f(_0x2e12d9);_0x1b0afd[_0xc7a5('0xdb')][_0xc7a5('0xdc')]=_0x1b0afd[_0xc7a5('0xdb')][_0xc7a5('0xdc')][_0xc7a5('0x9')](_0xc7a5('0xdd'),_0xc7a5('0xde'));_0x1b0afd[_0xc7a5('0xdb')][_0xc7a5('0xdc')]=_0x1b0afd[_0xc7a5('0xdb')][_0xc7a5('0xdc')][_0xc7a5('0x9')](_0xc7a5('0xdf'),_0xc7a5('0xe0'));_0x1b0afd[_0xc7a5('0xdb')][_0xc7a5('0xdc')]=_0x1b0afd[_0xc7a5('0xdb')][_0xc7a5('0xdc')][_0xc7a5('0x9')](_0xc7a5('0xe1'),_0xc7a5('0xe2'));_0x1b0afd['texts'][_0xc7a5('0xdc')]=_0x1b0afd[_0xc7a5('0xdb')][_0xc7a5('0xdc')]['replace'](_0xc7a5('0xe3'),_0xc7a5('0xe4'));_0x2e12d9[_0xc7a5('0x52')]('.qd-ddc-viewCart')['html'](_0x1b0afd['texts']['linkCart']);_0x2e12d9[_0xc7a5('0x52')](_0xc7a5('0xe5'))[_0xc7a5('0x4e')](_0x1b0afd['texts'][_0xc7a5('0xe6')]);_0x2e12d9[_0xc7a5('0x52')](_0xc7a5('0xe7'))['html'](_0x1b0afd[_0xc7a5('0xdb')][_0xc7a5('0xe8')]);_0x2e12d9[_0xc7a5('0x52')]('.qd-ddc-infoTotal')[_0xc7a5('0x4e')](_0x1b0afd['texts'][_0xc7a5('0xdc')]);_0x2e12d9[_0xc7a5('0x52')](_0xc7a5('0xe9'))[_0xc7a5('0x4e')](_0x1b0afd[_0xc7a5('0xdb')][_0xc7a5('0xea')]);_0x2e12d9[_0xc7a5('0x52')](_0xc7a5('0xeb'))[_0xc7a5('0x4e')](_0x1b0afd[_0xc7a5('0xdb')][_0xc7a5('0x57')]);return _0x2e12d9;}(this[_0xc7a5('0xc9')]);var _0xe4498c=0x0;_0x3466c6[_0xc7a5('0x37')](function(){0x0<_0xe4498c?_0x23e80d[_0xc7a5('0x28')](this,_0x1c9010[_0xc7a5('0xec')]()):_0x23e80d[_0xc7a5('0x28')](this,_0x1c9010);_0xe4498c++;});window[_0xc7a5('0x39')][_0xc7a5('0x43')][_0xc7a5('0x30')](function(){_0x35496f(_0xc7a5('0xed'))[_0xc7a5('0x4e')](window[_0xc7a5('0x39')]['total']||'--');_0x35496f(_0xc7a5('0xee'))[_0xc7a5('0x4e')](window[_0xc7a5('0x39')]['qtt']||'0');_0x35496f(_0xc7a5('0xef'))[_0xc7a5('0x4e')](window[_0xc7a5('0x39')][_0xc7a5('0x3e')]||'--');_0x35496f(_0xc7a5('0xf0'))[_0xc7a5('0x4e')](window['_QuatroDigital_CartData'][_0xc7a5('0x3f')]||'--');});var _0x1400b2=function(_0x298a4f,_0x3162b2){if(_0xc7a5('0x2')===typeof _0x298a4f[_0xc7a5('0x41')])return _0xaff68f(_0xc7a5('0xf1'));_0x229755[_0xc7a5('0xf2')][_0xc7a5('0x28')](this,_0x3162b2);};_0x229755['getCartInfoByUrl']=function(_0x1eb36a,_0x33a6a4){_0xc7a5('0x2')!=typeof _0x33a6a4?window['_QuatroDigital_DropDown'][_0xc7a5('0xf3')]=_0x33a6a4:window[_0xc7a5('0x58')][_0xc7a5('0xf3')]&&(_0x33a6a4=window[_0xc7a5('0x58')][_0xc7a5('0xf3')]);setTimeout(function(){window[_0xc7a5('0x58')][_0xc7a5('0xf3')]=void 0x0;},_0x1b0afd[_0xc7a5('0xf4')]);_0x35496f(_0xc7a5('0xf5'))[_0xc7a5('0x4b')](_0xc7a5('0xf6'));if(_0x1b0afd['smartCheckout']){var _0x333101=function(_0x157b21){window[_0xc7a5('0x58')][_0xc7a5('0x27')]=_0x157b21;_0x1400b2(_0x157b21,_0x33a6a4);_0xc7a5('0x2')!==typeof window['_QuatroDigital_AmountProduct']&&_0xc7a5('0xa')===typeof window['_QuatroDigital_AmountProduct'][_0xc7a5('0xf7')]&&window['_QuatroDigital_AmountProduct']['exec']['call'](this);_0x35496f('.qd-ddc-wrapper')[_0xc7a5('0x49')](_0xc7a5('0xf6'));};'undefined'!==typeof window[_0xc7a5('0x58')][_0xc7a5('0x27')]?(_0x333101(window[_0xc7a5('0x58')][_0xc7a5('0x27')]),'function'===typeof _0x1eb36a&&_0x1eb36a(window[_0xc7a5('0x58')]['getOrderForm'])):_0x35496f['QD_checkoutQueue']([_0xc7a5('0x41'),_0xc7a5('0x3a'),_0xc7a5('0x5d')],{'done':function(_0x199020){_0x333101[_0xc7a5('0x28')](this,_0x199020);_0xc7a5('0xa')===typeof _0x1eb36a&&_0x1eb36a(_0x199020);},'fail':function(_0xbfa4b9){_0xaff68f([_0xc7a5('0xf8'),_0xbfa4b9]);}});}else alert(_0xc7a5('0xf9'));};_0x229755['cartIsEmpty']=function(){var _0x506c25=_0x35496f(_0xc7a5('0xf5'));_0x506c25[_0xc7a5('0x52')](_0xc7a5('0xfa'))[_0xc7a5('0x6')]?_0x506c25[_0xc7a5('0x4b')]('qd-ddc-noItems'):_0x506c25[_0xc7a5('0x49')](_0xc7a5('0xfb'));};_0x229755['renderProductsList']=function(_0x3908b7){var _0x333101=_0x35496f('.qd-ddc-prodWrapper2');_0x333101[_0xc7a5('0xfc')]();_0x333101['each'](function(){var _0x333101=_0x35496f(this),_0xb7fd8f,_0x118373,_0x3bf51c=_0x35496f(''),_0x5943b7;for(_0x5943b7 in window[_0xc7a5('0x58')][_0xc7a5('0x27')][_0xc7a5('0x41')])if(_0xc7a5('0x15')===typeof window[_0xc7a5('0x58')][_0xc7a5('0x27')]['items'][_0x5943b7]){var _0x37c842=window[_0xc7a5('0x58')][_0xc7a5('0x27')][_0xc7a5('0x41')][_0x5943b7];var _0x50f618=_0x37c842[_0xc7a5('0xfd')]['replace'](/^\/|\/$/g,'')[_0xc7a5('0xa2')]('/');var _0x34e76c=_0x35496f('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0x34e76c['attr']({'data-sku':_0x37c842['id'],'data-sku-index':_0x5943b7,'data-qd-departament':_0x50f618[0x0],'data-qd-category':_0x50f618[_0x50f618['length']-0x1]});_0x34e76c['addClass'](_0xc7a5('0xfe')+_0x37c842[_0xc7a5('0xff')]);_0x34e76c[_0xc7a5('0x52')]('.qd-ddc-prodName')['append'](_0x1b0afd[_0xc7a5('0xc1')](_0x37c842));_0x34e76c['find'](_0xc7a5('0x100'))['append'](isNaN(_0x37c842[_0xc7a5('0x101')])?_0x37c842[_0xc7a5('0x101')]:0x0==_0x37c842[_0xc7a5('0x101')]?'Grátis':(_0x35496f(_0xc7a5('0x34'))[_0xc7a5('0x35')]('content')||'R$')+'\x20'+qd_number_format(_0x37c842[_0xc7a5('0x101')]/0x64,0x2,',','.'));_0x34e76c['find'](_0xc7a5('0x102'))[_0xc7a5('0x35')]({'data-sku':_0x37c842['id'],'data-sku-index':_0x5943b7})[_0xc7a5('0xd4')](_0x37c842[_0xc7a5('0x42')]);_0x34e76c[_0xc7a5('0x52')](_0xc7a5('0x103'))['attr']({'data-sku':_0x37c842['id'],'data-sku-index':_0x5943b7});_0x229755[_0xc7a5('0x104')](_0x37c842['id'],_0x34e76c[_0xc7a5('0x52')](_0xc7a5('0x105')),_0x37c842['imageUrl']);_0x34e76c[_0xc7a5('0x52')]('.qd-ddc-quantityMore,.qd-ddc-quantityMinus')['attr']({'data-sku':_0x37c842['id'],'data-sku-index':_0x5943b7});_0x34e76c[_0xc7a5('0x106')](_0x333101);_0x3bf51c=_0x3bf51c[_0xc7a5('0x30')](_0x34e76c);}try{var _0x1dbe60=_0x333101[_0xc7a5('0x0')](_0xc7a5('0xf5'))['find'](_0xc7a5('0x107'));_0x1dbe60['length']&&''==_0x1dbe60['val']()&&window[_0xc7a5('0x58')][_0xc7a5('0x27')][_0xc7a5('0x5d')][_0xc7a5('0x108')]&&_0x1dbe60[_0xc7a5('0xd4')](window[_0xc7a5('0x58')][_0xc7a5('0x27')]['shippingData']['address'][_0xc7a5('0x109')]);}catch(_0x67c029){_0xaff68f(_0xc7a5('0x10a')+_0x67c029[_0xc7a5('0x22')],_0xc7a5('0x6e'));}_0x229755[_0xc7a5('0x10b')](_0x333101);_0x229755[_0xc7a5('0xd9')]();_0x3908b7&&_0x3908b7[_0xc7a5('0x10c')]&&function(){_0x118373=_0x3bf51c['filter'](_0xc7a5('0x10d')+_0x3908b7[_0xc7a5('0x10c')]+'\x27]');_0x118373[_0xc7a5('0x6')]&&(_0xb7fd8f=0x0,_0x3bf51c[_0xc7a5('0x37')](function(){var _0x3908b7=_0x35496f(this);if(_0x3908b7['is'](_0x118373))return!0x1;_0xb7fd8f+=_0x3908b7['outerHeight']();}),_0x229755[_0xc7a5('0xd1')](void 0x0,void 0x0,_0xb7fd8f,_0x333101[_0xc7a5('0x30')](_0x333101['parent']())),_0x3bf51c[_0xc7a5('0x4b')](_0xc7a5('0x10e')),function(_0x37622c){_0x37622c[_0xc7a5('0x49')](_0xc7a5('0x10f'));_0x37622c[_0xc7a5('0x49')](_0xc7a5('0x10e'));setTimeout(function(){_0x37622c[_0xc7a5('0x4b')]('qd-ddc-lastAdded');},_0x1b0afd[_0xc7a5('0xf4')]);}(_0x118373));}();});(function(){_QuatroDigital_DropDown[_0xc7a5('0x27')][_0xc7a5('0x41')][_0xc7a5('0x6')]?(_0x35496f('body')[_0xc7a5('0x4b')](_0xc7a5('0x110'))[_0xc7a5('0x49')]('qd-ddc-cart-rendered\x20qd-ddc-product-add-time'),setTimeout(function(){_0x35496f('body')['removeClass']('qd-ddc-product-add-time');},_0x1b0afd['timeRemoveNewItemClass'])):_0x35496f(_0xc7a5('0x72'))['removeClass'](_0xc7a5('0x111'))[_0xc7a5('0x49')](_0xc7a5('0x110'));}());'function'===typeof _0x1b0afd[_0xc7a5('0x112')]?_0x1b0afd[_0xc7a5('0x112')]['call'](this):_0xaff68f('callbackProductsList\x20não\x20é\x20uma\x20função');};_0x229755[_0xc7a5('0x104')]=function(_0x2ff54c,_0x24c05b,_0x46febb){function _0x25e809(){_0x24c05b[_0xc7a5('0x4b')]('qd-loaded')[_0xc7a5('0x113')](function(){_0x35496f(this)[_0xc7a5('0x49')](_0xc7a5('0x114'));})[_0xc7a5('0x35')](_0xc7a5('0x115'),_0x46febb);}_0x46febb?_0x25e809():isNaN(_0x2ff54c)?_0xaff68f('Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU',_0xc7a5('0x2c')):alert(_0xc7a5('0x116'));};_0x229755[_0xc7a5('0x10b')]=function(_0x12cdde){var _0x5ebd98=function(_0xaf1a9d,_0xe11034){var _0x333101=_0x35496f(_0xaf1a9d);var _0x8a97cd=_0x333101[_0xc7a5('0x35')]('data-sku');var _0xb7fd8f=_0x333101[_0xc7a5('0x35')](_0xc7a5('0x117'));if(_0x8a97cd){var _0x5ca808=parseInt(_0x333101[_0xc7a5('0xd4')]())||0x1;_0x229755[_0xc7a5('0x118')]([_0x8a97cd,_0xb7fd8f],_0x5ca808,_0x5ca808+0x1,function(_0x326248){_0x333101[_0xc7a5('0xd4')](_0x326248);_0xc7a5('0xa')===typeof _0xe11034&&_0xe11034();});}};var _0x333101=function(_0x5e6a60,_0x4c9e0a){var _0x333101=_0x35496f(_0x5e6a60);var _0x56956b=_0x333101['attr']('data-sku');var _0xb7fd8f=_0x333101[_0xc7a5('0x35')](_0xc7a5('0x117'));if(_0x56956b){var _0x66bf9a=parseInt(_0x333101[_0xc7a5('0xd4')]())||0x2;_0x229755[_0xc7a5('0x118')]([_0x56956b,_0xb7fd8f],_0x66bf9a,_0x66bf9a-0x1,function(_0x60f562){_0x333101[_0xc7a5('0xd4')](_0x60f562);_0xc7a5('0xa')===typeof _0x4c9e0a&&_0x4c9e0a();});}};var _0x1e2da6=function(_0x4a4e0c,_0xaa5d32){var _0x333101=_0x35496f(_0x4a4e0c);var _0x6b5ef8=_0x333101['attr'](_0xc7a5('0x119'));var _0xb7fd8f=_0x333101['attr'](_0xc7a5('0x117'));if(_0x6b5ef8){var _0x2506ee=parseInt(_0x333101[_0xc7a5('0xd4')]())||0x1;_0x229755[_0xc7a5('0x118')]([_0x6b5ef8,_0xb7fd8f],0x1,_0x2506ee,function(_0x5ec5bb){_0x333101[_0xc7a5('0xd4')](_0x5ec5bb);_0xc7a5('0xa')===typeof _0xaa5d32&&_0xaa5d32();});}};var _0xb7fd8f=_0x12cdde[_0xc7a5('0x52')]('.qd-ddc-prodQttWrapper:not(.qd_on)');_0xb7fd8f[_0xc7a5('0x49')]('qd_on')[_0xc7a5('0x37')](function(){var _0x12cdde=_0x35496f(this);_0x12cdde[_0xc7a5('0x52')]('.qd-ddc-quantityMore')['on'](_0xc7a5('0x11a'),function(_0xad5dbd){_0xad5dbd[_0xc7a5('0x7d')]();_0xb7fd8f[_0xc7a5('0x49')](_0xc7a5('0x11b'));_0x5ebd98(_0x12cdde[_0xc7a5('0x52')](_0xc7a5('0x102')),function(){_0xb7fd8f[_0xc7a5('0x4b')](_0xc7a5('0x11b'));});});_0x12cdde[_0xc7a5('0x52')](_0xc7a5('0x11c'))['on'](_0xc7a5('0x11d'),function(_0x4ed0a7){_0x4ed0a7[_0xc7a5('0x7d')]();_0xb7fd8f[_0xc7a5('0x49')](_0xc7a5('0x11b'));_0x333101(_0x12cdde['find'](_0xc7a5('0x102')),function(){_0xb7fd8f['removeClass'](_0xc7a5('0x11b'));});});_0x12cdde[_0xc7a5('0x52')]('.qd-ddc-quantity')['on']('focusout.qd_ddc_change',function(){_0xb7fd8f[_0xc7a5('0x49')]('qd-loading');_0x1e2da6(this,function(){_0xb7fd8f[_0xc7a5('0x4b')](_0xc7a5('0x11b'));});});_0x12cdde['find']('.qd-ddc-quantity')['on'](_0xc7a5('0x11e'),function(_0x4552a9){0xd==_0x4552a9[_0xc7a5('0xd0')]&&(_0xb7fd8f[_0xc7a5('0x49')](_0xc7a5('0x11b')),_0x1e2da6(this,function(){_0xb7fd8f[_0xc7a5('0x4b')]('qd-loading');}));});});_0x12cdde[_0xc7a5('0x52')]('.qd-ddc-prodRow')[_0xc7a5('0x37')](function(){var _0x12cdde=_0x35496f(this);_0x12cdde[_0xc7a5('0x52')](_0xc7a5('0x103'))['on'](_0xc7a5('0x11f'),function(){_0x12cdde['addClass'](_0xc7a5('0x11b'));_0x229755[_0xc7a5('0x120')](_0x35496f(this),function(_0x3b58b2){_0x3b58b2?_0x12cdde[_0xc7a5('0x121')](!0x0)[_0xc7a5('0x122')](function(){_0x12cdde[_0xc7a5('0x123')]();_0x229755[_0xc7a5('0xd9')]();}):_0x12cdde['removeClass'](_0xc7a5('0x11b'));});return!0x1;});});};_0x229755[_0xc7a5('0xd6')]=function(_0xdc1990){var _0x5eb3a8=_0xdc1990[_0xc7a5('0xd4')](),_0x5eb3a8=_0x5eb3a8['replace'](/[^0-9\-]/g,''),_0x5eb3a8=_0x5eb3a8[_0xc7a5('0x9')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0xc7a5('0x124')),_0x5eb3a8=_0x5eb3a8[_0xc7a5('0x9')](/(.{9}).*/g,'$1');_0xdc1990[_0xc7a5('0xd4')](_0x5eb3a8);0x9<=_0x5eb3a8[_0xc7a5('0x6')]&&(_0xdc1990[_0xc7a5('0x16')](_0xc7a5('0x125'))!=_0x5eb3a8&&_0x419291['calculateShipping']({'postalCode':_0x5eb3a8,'country':_0xc7a5('0x126')})[_0xc7a5('0x1c')](function(_0x4dbb25){window['_QuatroDigital_DropDown']['getOrderForm']=_0x4dbb25;_0x229755[_0xc7a5('0x93')]();})[_0xc7a5('0x1e')](function(_0x182b27){_0xaff68f([_0xc7a5('0x127'),_0x182b27]);updateCartData();}),_0xdc1990['data'](_0xc7a5('0x125'),_0x5eb3a8));};_0x229755[_0xc7a5('0x118')]=function(_0x371de7,_0x5c7b90,_0x1c3f50,_0x1745b6){function _0xce3035(_0x29aed7){_0x29aed7=_0xc7a5('0x128')!==typeof _0x29aed7?!0x1:_0x29aed7;_0x229755[_0xc7a5('0x93')]();window[_0xc7a5('0x58')]['allowUpdate']=!0x1;_0x229755['cartIsEmpty']();_0xc7a5('0x2')!==typeof window[_0xc7a5('0x129')]&&'function'===typeof window[_0xc7a5('0x129')][_0xc7a5('0xf7')]&&window[_0xc7a5('0x129')]['exec'][_0xc7a5('0x28')](this);_0xc7a5('0xa')===typeof adminCart&&adminCart();_0x35496f['fn'][_0xc7a5('0x2b')](!0x0,void 0x0,_0x29aed7);_0xc7a5('0xa')===typeof _0x1745b6&&_0x1745b6(_0x5c7b90);}_0x1c3f50=_0x1c3f50||0x1;if(0x1>_0x1c3f50)return _0x5c7b90;if(_0x1b0afd['smartCheckout']){if(_0xc7a5('0x2')===typeof window['_QuatroDigital_DropDown'][_0xc7a5('0x27')]['items'][_0x371de7[0x1]])return _0xaff68f(_0xc7a5('0x12a')+_0x371de7[0x1]+']'),_0x5c7b90;window[_0xc7a5('0x58')]['getOrderForm']['items'][_0x371de7[0x1]][_0xc7a5('0x42')]=_0x1c3f50;window['_QuatroDigital_DropDown'][_0xc7a5('0x27')][_0xc7a5('0x41')][_0x371de7[0x1]]['index']=_0x371de7[0x1];_0x419291[_0xc7a5('0x12b')]([window['_QuatroDigital_DropDown']['getOrderForm'][_0xc7a5('0x41')][_0x371de7[0x1]]],[_0xc7a5('0x41'),_0xc7a5('0x3a'),_0xc7a5('0x5d')])[_0xc7a5('0x1c')](function(_0x21de75){window['_QuatroDigital_DropDown'][_0xc7a5('0x27')]=_0x21de75;_0xce3035(!0x0);})[_0xc7a5('0x1e')](function(_0x9c7fa7){_0xaff68f(['Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho',_0x9c7fa7]);_0xce3035();});}else _0xaff68f(_0xc7a5('0x12c'));};_0x229755['removeProduct']=function(_0x1a00a2,_0x227ac8){function _0x58c2ef(_0x19a879){_0x19a879=_0xc7a5('0x128')!==typeof _0x19a879?!0x1:_0x19a879;_0xc7a5('0x2')!==typeof window[_0xc7a5('0x129')]&&'function'===typeof window[_0xc7a5('0x129')][_0xc7a5('0xf7')]&&window[_0xc7a5('0x129')][_0xc7a5('0xf7')][_0xc7a5('0x28')](this);_0xc7a5('0xa')===typeof adminCart&&adminCart();_0x35496f['fn'][_0xc7a5('0x2b')](!0x0,void 0x0,_0x19a879);_0xc7a5('0xa')===typeof _0x227ac8&&_0x227ac8(_0xb7fd8f);}var _0xb7fd8f=!0x1,_0x4df34b=_0x35496f(_0x1a00a2)[_0xc7a5('0x35')](_0xc7a5('0x117'));if(_0x1b0afd['smartCheckout']){if(_0xc7a5('0x2')===typeof window['_QuatroDigital_DropDown']['getOrderForm'][_0xc7a5('0x41')][_0x4df34b])return _0xaff68f(_0xc7a5('0x12a')+_0x4df34b+']'),_0xb7fd8f;window['_QuatroDigital_DropDown'][_0xc7a5('0x27')][_0xc7a5('0x41')][_0x4df34b][_0xc7a5('0x12d')]=_0x4df34b;_0x419291[_0xc7a5('0x12e')]([window[_0xc7a5('0x58')]['getOrderForm']['items'][_0x4df34b]],[_0xc7a5('0x41'),'totalizers',_0xc7a5('0x5d')])[_0xc7a5('0x1c')](function(_0x46b409){_0xb7fd8f=!0x0;window[_0xc7a5('0x58')][_0xc7a5('0x27')]=_0x46b409;_0x1400b2(_0x46b409);_0x58c2ef(!0x0);})['fail'](function(_0x371714){_0xaff68f([_0xc7a5('0x12f'),_0x371714]);_0x58c2ef();});}else alert(_0xc7a5('0x130'));};_0x229755[_0xc7a5('0xd1')]=function(_0x508f5a,_0x4d69ee,_0x44bf20,_0x411be6){_0x411be6=_0x411be6||_0x35496f('.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2');_0x508f5a=_0x508f5a||'+';_0x4d69ee=_0x4d69ee||0.9*_0x411be6[_0xc7a5('0x131')]();_0x411be6[_0xc7a5('0x121')](!0x0,!0x0)['animate']({'scrollTop':isNaN(_0x44bf20)?_0x508f5a+'='+_0x4d69ee+'px':_0x44bf20});};_0x1b0afd[_0xc7a5('0xd7')]||(_0x229755[_0xc7a5('0x93')](),_0x35496f['fn'][_0xc7a5('0x2b')](!0x0));_0x35496f(window)['on'](_0xc7a5('0x132'),function(){try{window['_QuatroDigital_DropDown'][_0xc7a5('0x27')]=void 0x0,_0x229755['getCartInfoByUrl']();}catch(_0x2682c3){_0xaff68f(_0xc7a5('0x133')+_0x2682c3[_0xc7a5('0x22')],_0xc7a5('0x134'));}});'function'===typeof _0x1b0afd[_0xc7a5('0x43')]?_0x1b0afd['callback']['call'](this):_0xaff68f(_0xc7a5('0xaa'));};_0x35496f['fn']['QD_dropDownCart']=function(_0xdbef58){var _0xa94a52=_0x35496f(this);_0xa94a52['fn']=new _0x35496f[(_0xc7a5('0xbd'))](this,_0xdbef58);return _0xa94a52;};}catch(_0x845af){_0xc7a5('0x2')!==typeof console&&'function'===typeof console[_0xc7a5('0x11')]&&console[_0xc7a5('0x11')](_0xc7a5('0xb3'),_0x845af);}}(this));(function(_0x33be29){try{var _0x55d138=jQuery;window['_QuatroDigital_AmountProduct']=window['_QuatroDigital_AmountProduct']||{};window[_0xc7a5('0x129')][_0xc7a5('0x41')]={};window[_0xc7a5('0x129')]['allowRecalculate']=!0x1;window[_0xc7a5('0x129')][_0xc7a5('0x135')]=!0x1;window[_0xc7a5('0x129')][_0xc7a5('0x136')]=!0x1;var _0x123db6=function(){if(window[_0xc7a5('0x129')][_0xc7a5('0x137')]){var _0x21475a=!0x1;var _0x33be29={};window[_0xc7a5('0x129')][_0xc7a5('0x41')]={};for(_0xb8b9f in window[_0xc7a5('0x58')][_0xc7a5('0x27')]['items'])if(_0xc7a5('0x15')===typeof window[_0xc7a5('0x58')]['getOrderForm'][_0xc7a5('0x41')][_0xb8b9f]){var _0x138158=window['_QuatroDigital_DropDown']['getOrderForm'][_0xc7a5('0x41')][_0xb8b9f];_0xc7a5('0x2')!==typeof _0x138158[_0xc7a5('0x138')]&&null!==_0x138158[_0xc7a5('0x138')]&&''!==_0x138158[_0xc7a5('0x138')]&&(window[_0xc7a5('0x129')]['items'][_0xc7a5('0x139')+_0x138158['productId']]=window[_0xc7a5('0x129')][_0xc7a5('0x41')][_0xc7a5('0x139')+_0x138158['productId']]||{},window[_0xc7a5('0x129')][_0xc7a5('0x41')]['prod_'+_0x138158[_0xc7a5('0x138')]][_0xc7a5('0x13a')]=_0x138158[_0xc7a5('0x138')],_0x33be29[_0xc7a5('0x139')+_0x138158[_0xc7a5('0x138')]]||(window[_0xc7a5('0x129')]['items'][_0xc7a5('0x139')+_0x138158['productId']][_0xc7a5('0x40')]=0x0),window[_0xc7a5('0x129')][_0xc7a5('0x41')][_0xc7a5('0x139')+_0x138158['productId']]['qtt']+=_0x138158[_0xc7a5('0x42')],_0x21475a=!0x0,_0x33be29['prod_'+_0x138158[_0xc7a5('0x138')]]=!0x0);}var _0xb8b9f=_0x21475a;}else _0xb8b9f=void 0x0;window[_0xc7a5('0x129')]['allowRecalculate']&&(_0x55d138(_0xc7a5('0x13b'))[_0xc7a5('0x123')](),_0x55d138(_0xc7a5('0x13c'))[_0xc7a5('0x4b')](_0xc7a5('0x13d')));for(var _0x54df64 in window[_0xc7a5('0x129')][_0xc7a5('0x41')]){_0x138158=window[_0xc7a5('0x129')][_0xc7a5('0x41')][_0x54df64];if('object'!==typeof _0x138158)return;_0x33be29=_0x55d138('input.qd-productId[value='+_0x138158[_0xc7a5('0x13a')]+']')[_0xc7a5('0x0')]('li');if(window['_QuatroDigital_AmountProduct'][_0xc7a5('0x137')]||!_0x33be29[_0xc7a5('0x52')](_0xc7a5('0x13b'))[_0xc7a5('0x6')])_0x21475a=_0x55d138('<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>'),_0x21475a[_0xc7a5('0x52')](_0xc7a5('0x13e'))['html'](_0x138158[_0xc7a5('0x40')]),_0x138158=_0x33be29['find']('.qd_bap_wrapper_content'),_0x138158['length']?_0x138158[_0xc7a5('0xad')](_0x21475a)[_0xc7a5('0x49')](_0xc7a5('0x13d')):_0x33be29[_0xc7a5('0xad')](_0x21475a);}_0xb8b9f&&(window['_QuatroDigital_AmountProduct']['allowRecalculate']=!0x1);};window[_0xc7a5('0x129')][_0xc7a5('0xf7')]=function(){window[_0xc7a5('0x129')][_0xc7a5('0x137')]=!0x0;_0x123db6[_0xc7a5('0x28')](this);};_0x55d138(document)[_0xc7a5('0xb2')](function(){_0x123db6['call'](this);});}catch(_0x53c11b){_0xc7a5('0x2')!==typeof console&&_0xc7a5('0xa')===typeof console[_0xc7a5('0x11')]&&console['error']('Oooops!\x20',_0x53c11b);}}(this));(function(){try{var _0x3739b4=jQuery,_0x56c00a,_0x59b875={'selector':_0xc7a5('0x13f'),'dropDown':{},'buyButton':{}};_0x3739b4[_0xc7a5('0x140')]=function(_0x1743f3){var _0x52af35={};_0x56c00a=_0x3739b4[_0xc7a5('0x13')](!0x0,{},_0x59b875,_0x1743f3);_0x1743f3=_0x3739b4(_0x56c00a['selector'])[_0xc7a5('0xbd')](_0x56c00a[_0xc7a5('0x141')]);_0x52af35['buyButton']=_0xc7a5('0x2')!==typeof _0x56c00a['dropDown'][_0xc7a5('0xd7')]&&!0x1===_0x56c00a[_0xc7a5('0x141')]['updateOnlyHover']?_0x3739b4(_0x56c00a[_0xc7a5('0x8a')])[_0xc7a5('0x78')](_0x1743f3['fn'],_0x56c00a[_0xc7a5('0x7f')]):_0x3739b4(_0x56c00a[_0xc7a5('0x8a')])[_0xc7a5('0x78')](_0x56c00a[_0xc7a5('0x7f')]);_0x52af35['dropDown']=_0x1743f3;return _0x52af35;};_0x3739b4['fn'][_0xc7a5('0x142')]=function(){_0xc7a5('0x15')===typeof console&&_0xc7a5('0xa')===typeof console[_0xc7a5('0x2e')]&&console[_0xc7a5('0x2e')]('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x3739b4[_0xc7a5('0x142')]=_0x3739b4['fn'][_0xc7a5('0x142')];}catch(_0xb6ea7b){_0xc7a5('0x2')!==typeof console&&_0xc7a5('0xa')===typeof console[_0xc7a5('0x11')]&&console[_0xc7a5('0x11')]('Oooops!\x20',_0xb6ea7b);}}());

/* Quatro Digital - Smart Stock Available */
var _0x4e64=['trigger','vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','join','toUpperCase','ite','---','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','/produto/sku/','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','qdPlugin','initialSkuSelected','QuatroDigital.ssa.skuSelected','prod','unavailable','vtex.sku.selectable','available','off','.qd_smart_stock_available_auto','qdAjax','qdAjaxQueue','url','opts','push','success','call','error','complete','parameters','callbackFns','successPopulated','boolean','errorPopulated','completePopulated','extend','object','jqXHR','clearQueueDelay','undefined','ajax','readyState','data','textStatus','errorThrown','QD_smartStockAvailable','function','Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available','unshift','toLowerCase','aviso','info','warn','apply','length','qd-ssa-on','qd-ssa-skus-','skus','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','message','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','vtex.sku.selected.QD','QuatroDigital.ssa.prodUnavailable','addClass','removeClass','qd-ssa-sku-no-selected','qd-ssa-sku-selected','SkuSellersInformation','AvailableQuantity','attr','data-qd-ssa-qtt','each','[data-qd-ssa-text]','hide','qd-ssa-show','filter','qd-ssa-hide','html','replace','#qtt','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20'];(function(_0x8d9f1d,_0x20f21d){var _0x39759a=function(_0x40a42e){while(--_0x40a42e){_0x8d9f1d['push'](_0x8d9f1d['shift']());}};_0x39759a(++_0x20f21d);}(_0x4e64,0x165));var _0x44e6=function(_0x5e8c32,_0x1b1f3f){_0x5e8c32=_0x5e8c32-0x0;var _0x595f7b=_0x4e64[_0x5e8c32];return _0x595f7b;};(function(_0x4d3229){if('function'!==typeof _0x4d3229[_0x44e6('0x0')]){var _0xbe303c={};_0x4d3229[_0x44e6('0x1')]=_0xbe303c;_0x4d3229[_0x44e6('0x0')]=function(_0x38aa7c){var _0x44e915,_0x4103e8;_0x44e915=_0x4d3229['extend']({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x38aa7c);_0x4103e8=escape(encodeURIComponent(_0x44e915[_0x44e6('0x2')]));_0xbe303c[_0x4103e8]=_0xbe303c[_0x4103e8]||{};_0xbe303c[_0x4103e8]['opts']=_0xbe303c[_0x4103e8]['opts']||[];_0xbe303c[_0x4103e8][_0x44e6('0x3')][_0x44e6('0x4')]({'success':function(_0x5c6460,_0x3e489f,_0x4ff58e){_0x44e915[_0x44e6('0x5')][_0x44e6('0x6')](this,_0x5c6460,_0x3e489f,_0x4ff58e);},'error':function(_0x190f20,_0x1a9d61,_0x305b3a){_0x44e915[_0x44e6('0x7')][_0x44e6('0x6')](this,_0x190f20,_0x1a9d61,_0x305b3a);},'complete':function(_0x923dea,_0x52b231){_0x44e915[_0x44e6('0x8')][_0x44e6('0x6')](this,_0x923dea,_0x52b231);}});_0xbe303c[_0x4103e8][_0x44e6('0x9')]=_0xbe303c[_0x4103e8][_0x44e6('0x9')]||{'success':{},'error':{},'complete':{}};_0xbe303c[_0x4103e8][_0x44e6('0xa')]=_0xbe303c[_0x4103e8]['callbackFns']||{};_0xbe303c[_0x4103e8][_0x44e6('0xa')][_0x44e6('0xb')]=_0x44e6('0xc')===typeof _0xbe303c[_0x4103e8][_0x44e6('0xa')]['successPopulated']?_0xbe303c[_0x4103e8]['callbackFns']['successPopulated']:!0x1;_0xbe303c[_0x4103e8][_0x44e6('0xa')][_0x44e6('0xd')]=_0x44e6('0xc')===typeof _0xbe303c[_0x4103e8][_0x44e6('0xa')]['errorPopulated']?_0xbe303c[_0x4103e8][_0x44e6('0xa')][_0x44e6('0xd')]:!0x1;_0xbe303c[_0x4103e8][_0x44e6('0xa')][_0x44e6('0xe')]=_0x44e6('0xc')===typeof _0xbe303c[_0x4103e8][_0x44e6('0xa')][_0x44e6('0xe')]?_0xbe303c[_0x4103e8][_0x44e6('0xa')][_0x44e6('0xe')]:!0x1;_0x38aa7c=_0x4d3229[_0x44e6('0xf')]({},_0x44e915,{'success':function(_0x5c0609,_0x337b6d,_0x40d6d8){_0xbe303c[_0x4103e8][_0x44e6('0x9')][_0x44e6('0x5')]={'data':_0x5c0609,'textStatus':_0x337b6d,'jqXHR':_0x40d6d8};_0xbe303c[_0x4103e8]['callbackFns']['successPopulated']=!0x0;for(var _0x4d3229 in _0xbe303c[_0x4103e8][_0x44e6('0x3')])'object'===typeof _0xbe303c[_0x4103e8][_0x44e6('0x3')][_0x4d3229]&&(_0xbe303c[_0x4103e8][_0x44e6('0x3')][_0x4d3229]['success'][_0x44e6('0x6')](this,_0x5c0609,_0x337b6d,_0x40d6d8),_0xbe303c[_0x4103e8][_0x44e6('0x3')][_0x4d3229][_0x44e6('0x5')]=function(){});},'error':function(_0x312f73,_0x4c6124,_0x166a5f){_0xbe303c[_0x4103e8][_0x44e6('0x9')][_0x44e6('0x7')]={'errorThrown':_0x166a5f,'textStatus':_0x4c6124,'jqXHR':_0x312f73};_0xbe303c[_0x4103e8][_0x44e6('0xa')][_0x44e6('0xd')]=!0x0;for(var _0x38aa7c in _0xbe303c[_0x4103e8][_0x44e6('0x3')])_0x44e6('0x10')===typeof _0xbe303c[_0x4103e8][_0x44e6('0x3')][_0x38aa7c]&&(_0xbe303c[_0x4103e8][_0x44e6('0x3')][_0x38aa7c]['error']['call'](this,_0x312f73,_0x4c6124,_0x166a5f),_0xbe303c[_0x4103e8][_0x44e6('0x3')][_0x38aa7c][_0x44e6('0x7')]=function(){});},'complete':function(_0x391c4b,_0x197df8){_0xbe303c[_0x4103e8]['parameters'][_0x44e6('0x8')]={'textStatus':_0x197df8,'jqXHR':_0x391c4b};_0xbe303c[_0x4103e8][_0x44e6('0xa')][_0x44e6('0xe')]=!0x0;for(var _0x3a9694 in _0xbe303c[_0x4103e8]['opts'])_0x44e6('0x10')===typeof _0xbe303c[_0x4103e8][_0x44e6('0x3')][_0x3a9694]&&(_0xbe303c[_0x4103e8]['opts'][_0x3a9694][_0x44e6('0x8')][_0x44e6('0x6')](this,_0x391c4b,_0x197df8),_0xbe303c[_0x4103e8]['opts'][_0x3a9694][_0x44e6('0x8')]=function(){});isNaN(parseInt(_0x44e915['clearQueueDelay']))||setTimeout(function(){_0xbe303c[_0x4103e8][_0x44e6('0x11')]=void 0x0;_0xbe303c[_0x4103e8][_0x44e6('0x3')]=void 0x0;_0xbe303c[_0x4103e8][_0x44e6('0x9')]=void 0x0;_0xbe303c[_0x4103e8][_0x44e6('0xa')]=void 0x0;},_0x44e915[_0x44e6('0x12')]);}});_0x44e6('0x13')===typeof _0xbe303c[_0x4103e8]['jqXHR']?_0xbe303c[_0x4103e8][_0x44e6('0x11')]=_0x4d3229[_0x44e6('0x14')](_0x38aa7c):_0xbe303c[_0x4103e8][_0x44e6('0x11')]&&_0xbe303c[_0x4103e8][_0x44e6('0x11')][_0x44e6('0x15')]&&0x4==_0xbe303c[_0x4103e8]['jqXHR'][_0x44e6('0x15')]&&(_0xbe303c[_0x4103e8][_0x44e6('0xa')][_0x44e6('0xb')]&&_0x38aa7c[_0x44e6('0x5')](_0xbe303c[_0x4103e8][_0x44e6('0x9')][_0x44e6('0x5')][_0x44e6('0x16')],_0xbe303c[_0x4103e8][_0x44e6('0x9')][_0x44e6('0x5')][_0x44e6('0x17')],_0xbe303c[_0x4103e8]['parameters'][_0x44e6('0x5')][_0x44e6('0x11')]),_0xbe303c[_0x4103e8][_0x44e6('0xa')]['errorPopulated']&&_0x38aa7c[_0x44e6('0x7')](_0xbe303c[_0x4103e8][_0x44e6('0x9')][_0x44e6('0x7')][_0x44e6('0x11')],_0xbe303c[_0x4103e8]['parameters'][_0x44e6('0x7')]['textStatus'],_0xbe303c[_0x4103e8][_0x44e6('0x9')][_0x44e6('0x7')][_0x44e6('0x18')]),_0xbe303c[_0x4103e8][_0x44e6('0xa')][_0x44e6('0xe')]&&_0x38aa7c['complete'](_0xbe303c[_0x4103e8]['parameters']['complete'][_0x44e6('0x11')],_0xbe303c[_0x4103e8][_0x44e6('0x9')][_0x44e6('0x8')]['textStatus']));};_0x4d3229['qdAjax']['version']='2.1';}}(jQuery));(function(_0x261f9b){'use strict';var _0x353519=jQuery;if(typeof _0x353519['fn'][_0x44e6('0x19')]===_0x44e6('0x1a'))return;var _0x1700a7=_0x44e6('0x1b');var _0xe03972=function(_0x3b24c8,_0x16d48c){if('object'===typeof console){var _0x4379aa;_0x44e6('0x10')===typeof _0x3b24c8?(_0x3b24c8[_0x44e6('0x1c')]('['+_0x1700a7+']\x0a'),_0x4379aa=_0x3b24c8):_0x4379aa=['['+_0x1700a7+']\x0a'+_0x3b24c8];'undefined'===typeof _0x16d48c||'alerta'!==_0x16d48c[_0x44e6('0x1d')]()&&_0x44e6('0x1e')!==_0x16d48c['toLowerCase']()?_0x44e6('0x13')!==typeof _0x16d48c&&_0x44e6('0x1f')===_0x16d48c[_0x44e6('0x1d')]()?console['info']['apply'](console,_0x4379aa):console[_0x44e6('0x7')]['apply'](console,_0x4379aa):console[_0x44e6('0x20')][_0x44e6('0x21')](console,_0x4379aa);}};var _0x3879f4={};var _0x5abb18=function(_0x2d4b38,_0x37e3eb){if(!_0x2d4b38[_0x44e6('0x22')])return;_0x2d4b38['addClass'](_0x44e6('0x23'));_0x2d4b38['addClass']('qd-ssa-sku-no-selected');try{_0x2d4b38['addClass'](_0x44e6('0x24')+vtxctx[_0x44e6('0x25')]['split'](';')['length']);}catch(_0x15488d){_0xe03972([_0x44e6('0x26'),_0x15488d[_0x44e6('0x27')]]);}_0x353519(window)['on'](_0x44e6('0x28'),function(_0x24a901,_0x4c72cf,_0xa8e221){try{_0xb73d14(_0xa8e221[_0x44e6('0x29')],function(_0x43459e){_0x45056d(_0x43459e);_0x5efa94(_0x43459e);});}catch(_0x584f1e){_0xe03972([_0x44e6('0x2a'),_0x584f1e[_0x44e6('0x27')]]);}});_0x353519(window)['off'](_0x44e6('0x2b'));_0x353519(window)['on'](_0x44e6('0x2c'),function(){_0x2d4b38[_0x44e6('0x2d')]('qd-ssa-sku-prod-unavailable')['hide']();});function _0x45056d(_0x57c78f){try{_0x2d4b38[_0x44e6('0x2e')](_0x44e6('0x2f'))['addClass'](_0x44e6('0x30'));var _0x19dc17=_0x57c78f[0x0][_0x44e6('0x31')][0x0][_0x44e6('0x32')];_0x2d4b38[_0x44e6('0x33')](_0x44e6('0x34'),_0x19dc17);_0x2d4b38[_0x44e6('0x35')](function(){var _0x50a21b=_0x353519(this)['find'](_0x44e6('0x36'));if(_0x19dc17<0x1)return _0x50a21b[_0x44e6('0x37')]()[_0x44e6('0x2d')]('qd-ssa-hide')[_0x44e6('0x2e')](_0x44e6('0x38'));var _0x179fc5=_0x50a21b[_0x44e6('0x39')]('[data-qd-ssa-text=\x22'+_0x19dc17+'\x22]');var _0x341f32=_0x179fc5['length']?_0x179fc5:_0x50a21b[_0x44e6('0x39')]('[data-qd-ssa-text=\x22default\x22]');_0x50a21b[_0x44e6('0x37')]()['addClass'](_0x44e6('0x3a'))[_0x44e6('0x2e')](_0x44e6('0x38'));_0x341f32['html'](_0x341f32[_0x44e6('0x3b')]()[_0x44e6('0x3c')](_0x44e6('0x3d'),_0x19dc17));_0x341f32['show']()['addClass'](_0x44e6('0x38'))[_0x44e6('0x2e')](_0x44e6('0x3a'));});}catch(_0x58b966){_0xe03972([_0x44e6('0x3e'),_0x58b966[_0x44e6('0x27')]]);}};function _0x5efa94(_0x4963d5){if(vtxctx['skus']['split'](';')[_0x44e6('0x22')]===0x1&&_0x4963d5[0x0][_0x44e6('0x31')][0x0][_0x44e6('0x32')]==0x0)_0x353519(window)[_0x44e6('0x3f')](_0x44e6('0x2c'));};};var _0x520d8c=function(_0xffe587){var _0x3b821d={'i':_0x44e6('0x40')};return function(_0x3b685a){var _0x3d0ed0,_0x403454,_0x16595a,_0x365c11;_0x403454=function(_0x1f9f99){return _0x1f9f99;};_0x16595a=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3b685a=_0x3b685a['d'+_0x16595a[0x10]+'c'+_0x16595a[0x11]+'m'+_0x403454(_0x16595a[0x1])+'n'+_0x16595a[0xd]]['l'+_0x16595a[0x12]+'c'+_0x16595a[0x0]+'ti'+_0x403454('o')+'n'];_0x3d0ed0=function(_0xe1af09){return escape(encodeURIComponent(_0xe1af09['replace'](/\./g,'¨')[_0x44e6('0x3c')](/[a-zA-Z]/g,function(_0x4e39cd){return String[_0x44e6('0x41')](('Z'>=_0x4e39cd?0x5a:0x7a)>=(_0x4e39cd=_0x4e39cd[_0x44e6('0x42')](0x0)+0xd)?_0x4e39cd:_0x4e39cd-0x1a);})));};var _0x2ef7eb=_0x3d0ed0(_0x3b685a[[_0x16595a[0x9],_0x403454('o'),_0x16595a[0xc],_0x16595a[_0x403454(0xd)]][_0x44e6('0x43')]('')]);_0x3d0ed0=_0x3d0ed0((window[['js',_0x403454('no'),'m',_0x16595a[0x1],_0x16595a[0x4][_0x44e6('0x44')](),_0x44e6('0x45')][_0x44e6('0x43')]('')]||_0x44e6('0x46'))+['.v',_0x16595a[0xd],'e',_0x403454('x'),'co',_0x403454('mm'),'erc',_0x16595a[0x1],'.c',_0x403454('o'),'m.',_0x16595a[0x13],'r']['join'](''));for(var _0xfb38e5 in _0x3b821d){if(_0x3d0ed0===_0xfb38e5+_0x3b821d[_0xfb38e5]||_0x2ef7eb===_0xfb38e5+_0x3b821d[_0xfb38e5]){_0x365c11='tr'+_0x16595a[0x11]+'e';break;}_0x365c11='f'+_0x16595a[0x0]+'ls'+_0x403454(_0x16595a[0x1])+'';}_0x403454=!0x1;-0x1<_0x3b685a[[_0x16595a[0xc],'e',_0x16595a[0x0],'rc',_0x16595a[0x9]]['join']('')][_0x44e6('0x47')](_0x44e6('0x48'))&&(_0x403454=!0x0);return[_0x365c11,_0x403454];}(_0xffe587);}(window);if(!eval(_0x520d8c[0x0]))return _0x520d8c[0x1]?_0xe03972('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;function _0xb73d14(_0x3aca99,_0x43e522){_0x353519[_0x44e6('0x0')]({'url':_0x44e6('0x49')+_0x3aca99,'clearQueueDelay':null,'success':_0x43e522,'error':function(){_0xe03972(_0x44e6('0x4a'));}});};_0x353519['fn'][_0x44e6('0x19')]=function(_0x341809){var _0xf8c690=_0x353519(this);var _0x332847=_0x353519[_0x44e6('0xf')](!![],{},_0x3879f4,_0x341809);_0xf8c690[_0x44e6('0x4b')]=new _0x5abb18(_0xf8c690,_0x332847);try{if(typeof _0x353519['fn']['QD_smartStockAvailable'][_0x44e6('0x4c')]===_0x44e6('0x10'))_0x353519(window)[_0x44e6('0x3f')](_0x44e6('0x4d'),[_0x353519['fn'][_0x44e6('0x19')][_0x44e6('0x4c')][_0x44e6('0x4e')],_0x353519['fn'][_0x44e6('0x19')][_0x44e6('0x4c')]['sku']]);}catch(_0x47fc50){_0xe03972(['Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20',_0x47fc50['message']]);}if(_0x353519['fn']['QD_smartStockAvailable'][_0x44e6('0x4f')])_0x353519(window)['trigger']('QuatroDigital.ssa.prodUnavailable');return _0xf8c690;};_0x353519(window)['on'](_0x44e6('0x2b'),function(_0x56f95b,_0x554be9,_0x8c30f6){try{_0x353519['fn'][_0x44e6('0x19')]['initialSkuSelected']={'prod':_0x554be9,'sku':_0x8c30f6};_0x353519(this)['off'](_0x56f95b);}catch(_0x478f7b){_0xe03972(['Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20',_0x478f7b[_0x44e6('0x27')]]);}});_0x353519(window)['on'](_0x44e6('0x50'),function(_0x191a8e,_0x5ab639,_0x234a32){try{var _0xe7fc1f=_0x234a32[_0x44e6('0x22')];var _0x2fd2b3=0x0;for(var _0x104a06=0x0;_0x104a06<_0xe7fc1f;_0x104a06++){if(!_0x234a32[_0x104a06][_0x44e6('0x51')])_0x2fd2b3=_0x2fd2b3+0x1;else break;}if(_0xe7fc1f<=_0x2fd2b3)_0x353519['fn']['QD_smartStockAvailable'][_0x44e6('0x4f')]=!![];_0x353519(this)[_0x44e6('0x52')](_0x191a8e);}catch(_0x20adec){_0xe03972(['Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20',_0x20adec[_0x44e6('0x27')]]);}});_0x353519(function(){_0x353519(_0x44e6('0x53'))[_0x44e6('0x19')]();});}(window));

// -include ../qd-quatro-lib-plugins/Infinity Scroll Memory/QD_infinityScrollMemory.min.js
