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
			Common.openModalVideoInstitutional();
		},
		ajaxStop: function () {
			Common.appendSkuPopUpCloseBtn();
			Common.saveAmountFix();
		},
		windowOnload: function () {
			Common.facebookLikebox();
		},
		openModalVideoInstitutional: function() {
			var videoRegex = /(youtu\.be\/|\?v=)([^&]+)/i;

			$('.box-banner a').filter('[href*="youtube.com/"], [href*="youtu.be/"]').click(function(e) {
				e.preventDefault();
				var modal = $('.qd-v1-modal').clone().appendTo(document.body).addClass('component-qd-v1-video-modal');
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
			// wrapper.find('h3, h4, h5').find("+ ul").stop(true, true).slideToggle();

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

			$(".menu-departamento div").each(function () {
				var t, label, qtt, moreLinkFilter, moreLabel, click, labelHide;

				t = $(this);
				label = t.find(">label");
				qtt = 5;

				if (label.length <= qtt) return;

				labelHide = label.filter(":gt(" + (qtt - 1) + ")").stop(true, true).hide();
				moreLink = $('<a class="qd-viewMoreMenu">Mostrar mais</a>');
				t.after(moreLink);
				moreLi = $('<li class="qd-viewMoreWrapper"><a class="qd-viewMoreMenu2">Mostrar mais filtros</a></li>');
				t.append(moreLi);

				click = function () {
					labelHide.stop(true, true).slideToggle(0, function () {
						if (label.filter(":visible").length > qtt) {
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
var _0xe9b0=['undefined','info','toLowerCase','aviso','apply','join','error','warn','qdAmAddNdx','each','addClass','first','qd-am-first','last','vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','toUpperCase','ite','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','.qd-am-banner','filter','.qd-am-collection','length','parent','qd-am-banner-wrapper','qdAjax','url','.box-banner','clone','hide','qd-am-content-loaded','text','attr','data-qdam-value','trim','[class*=\x27colunas\x27]','insertBefore','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','trigger','UL\x20do\x20menu\x20não\x20encontrada','children','replaceSpecialChars','>li','>ul','qd-am-dropdown-menu','qd-am-dropdown','add','qd-am-','-li','callback','QuatroDigital.am.callback','extend','exec','.qd_amazing_menu_auto','getParent','closest','function','QD_amazingMenu','/qd-amazing-menu','object'];(function(_0x2ad8ca,_0x187cd2){var _0x2d3c50=function(_0x11794f){while(--_0x11794f){_0x2ad8ca['push'](_0x2ad8ca['shift']());}};_0x2d3c50(++_0x187cd2);}(_0xe9b0,0x198));var _0x0e9b=function(_0x4bd76e,_0x260c31){_0x4bd76e=_0x4bd76e-0x0;var _0x96a285=_0xe9b0[_0x4bd76e];return _0x96a285;};(function(_0x18294c){_0x18294c['fn'][_0x0e9b('0x0')]=_0x18294c['fn'][_0x0e9b('0x1')];}(jQuery));(function(_0x114e1d){var _0x6031ef;var _0x4dcf74=jQuery;if(_0x0e9b('0x2')!==typeof _0x4dcf74['fn'][_0x0e9b('0x3')]){var _0x20abe4={'url':_0x0e9b('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0xb1ef28=function(_0xbda94d,_0x432dde){if(_0x0e9b('0x5')===typeof console&&'undefined'!==typeof console['error']&&_0x0e9b('0x6')!==typeof console[_0x0e9b('0x7')]&&_0x0e9b('0x6')!==typeof console['warn']){var _0x4256bd;_0x0e9b('0x5')===typeof _0xbda94d?(_0xbda94d['unshift']('[QD\x20Amazing\x20Menu]\x0a'),_0x4256bd=_0xbda94d):_0x4256bd=['[QD\x20Amazing\x20Menu]\x0a'+_0xbda94d];if(_0x0e9b('0x6')===typeof _0x432dde||'alerta'!==_0x432dde[_0x0e9b('0x8')]()&&_0x0e9b('0x9')!==_0x432dde[_0x0e9b('0x8')]())if(_0x0e9b('0x6')!==typeof _0x432dde&&'info'===_0x432dde[_0x0e9b('0x8')]())try{console[_0x0e9b('0x7')][_0x0e9b('0xa')](console,_0x4256bd);}catch(_0x102f5c){try{console[_0x0e9b('0x7')](_0x4256bd[_0x0e9b('0xb')]('\x0a'));}catch(_0x35fe90){}}else try{console[_0x0e9b('0xc')]['apply'](console,_0x4256bd);}catch(_0x42a3b9){try{console[_0x0e9b('0xc')](_0x4256bd[_0x0e9b('0xb')]('\x0a'));}catch(_0x3271da){}}else try{console[_0x0e9b('0xd')][_0x0e9b('0xa')](console,_0x4256bd);}catch(_0xebcea){try{console[_0x0e9b('0xd')](_0x4256bd['join']('\x0a'));}catch(_0x7c3649){}}}};_0x4dcf74['fn'][_0x0e9b('0xe')]=function(){var _0x2f5d26=_0x4dcf74(this);_0x2f5d26[_0x0e9b('0xf')](function(_0x311fac){_0x4dcf74(this)[_0x0e9b('0x10')]('qd-am-li-'+_0x311fac);});_0x2f5d26[_0x0e9b('0x11')]()[_0x0e9b('0x10')](_0x0e9b('0x12'));_0x2f5d26[_0x0e9b('0x13')]()[_0x0e9b('0x10')]('qd-am-last');return _0x2f5d26;};_0x4dcf74['fn'][_0x0e9b('0x3')]=function(){};_0x114e1d=function(_0x4f7d1e){var _0xde7ea4={'i':_0x0e9b('0x14')};return function(_0x3e7722){var _0x4d6833=function(_0x416f22){return _0x416f22;};var _0x3b39b8=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3e7722=_0x3e7722['d'+_0x3b39b8[0x10]+'c'+_0x3b39b8[0x11]+'m'+_0x4d6833(_0x3b39b8[0x1])+'n'+_0x3b39b8[0xd]]['l'+_0x3b39b8[0x12]+'c'+_0x3b39b8[0x0]+'ti'+_0x4d6833('o')+'n'];var _0x21e595=function(_0x45ec4b){return escape(encodeURIComponent(_0x45ec4b[_0x0e9b('0x15')](/\./g,'¨')[_0x0e9b('0x15')](/[a-zA-Z]/g,function(_0x278ecc){return String[_0x0e9b('0x16')](('Z'>=_0x278ecc?0x5a:0x7a)>=(_0x278ecc=_0x278ecc['charCodeAt'](0x0)+0xd)?_0x278ecc:_0x278ecc-0x1a);})));};var _0x4fad2b=_0x21e595(_0x3e7722[[_0x3b39b8[0x9],_0x4d6833('o'),_0x3b39b8[0xc],_0x3b39b8[_0x4d6833(0xd)]]['join']('')]);_0x21e595=_0x21e595((window[['js',_0x4d6833('no'),'m',_0x3b39b8[0x1],_0x3b39b8[0x4][_0x0e9b('0x17')](),_0x0e9b('0x18')][_0x0e9b('0xb')]('')]||'---')+['.v',_0x3b39b8[0xd],'e',_0x4d6833('x'),'co',_0x4d6833('mm'),_0x0e9b('0x19'),_0x3b39b8[0x1],'.c',_0x4d6833('o'),'m.',_0x3b39b8[0x13],'r'][_0x0e9b('0xb')](''));for(var _0x65c5d in _0xde7ea4){if(_0x21e595===_0x65c5d+_0xde7ea4[_0x65c5d]||_0x4fad2b===_0x65c5d+_0xde7ea4[_0x65c5d]){var _0x5822e7='tr'+_0x3b39b8[0x11]+'e';break;}_0x5822e7='f'+_0x3b39b8[0x0]+'ls'+_0x4d6833(_0x3b39b8[0x1])+'';}_0x4d6833=!0x1;-0x1<_0x3e7722[[_0x3b39b8[0xc],'e',_0x3b39b8[0x0],'rc',_0x3b39b8[0x9]][_0x0e9b('0xb')]('')][_0x0e9b('0x1a')](_0x0e9b('0x1b'))&&(_0x4d6833=!0x0);return[_0x5822e7,_0x4d6833];}(_0x4f7d1e);}(window);if(!eval(_0x114e1d[0x0]))return _0x114e1d[0x1]?_0xb1ef28(_0x0e9b('0x1c')):!0x1;var _0xd12d04=function(_0x5aa42b){var _0x8acf3b=_0x5aa42b[_0x0e9b('0x1d')](_0x0e9b('0x1e'));var _0x1f13ea=_0x8acf3b['filter'](_0x0e9b('0x1f'));var _0x540bad=_0x8acf3b[_0x0e9b('0x20')](_0x0e9b('0x21'));if(_0x1f13ea[_0x0e9b('0x22')]||_0x540bad[_0x0e9b('0x22')])_0x1f13ea[_0x0e9b('0x23')]()[_0x0e9b('0x10')](_0x0e9b('0x24')),_0x540bad[_0x0e9b('0x23')]()[_0x0e9b('0x10')]('qd-am-collection-wrapper'),_0x4dcf74[_0x0e9b('0x25')]({'url':_0x6031ef[_0x0e9b('0x26')],'dataType':'html','success':function(_0x33fbdb){var _0x53315a=_0x4dcf74(_0x33fbdb);_0x1f13ea[_0x0e9b('0xf')](function(){var _0x33fbdb=_0x4dcf74(this);var _0x23c120=_0x53315a[_0x0e9b('0x1d')]('img[alt=\x27'+_0x33fbdb['attr']('data-qdam-value')+'\x27]');_0x23c120['length']&&(_0x23c120['each'](function(){_0x4dcf74(this)[_0x0e9b('0x0')](_0x0e9b('0x27'))[_0x0e9b('0x28')]()['insertBefore'](_0x33fbdb);}),_0x33fbdb[_0x0e9b('0x29')]());})[_0x0e9b('0x10')](_0x0e9b('0x2a'));_0x540bad[_0x0e9b('0xf')](function(){var _0x33fbdb={};var _0x35d3a3=_0x4dcf74(this);_0x53315a[_0x0e9b('0x1d')]('h2')[_0x0e9b('0xf')](function(){if(_0x4dcf74(this)[_0x0e9b('0x2b')]()['trim']()[_0x0e9b('0x8')]()==_0x35d3a3[_0x0e9b('0x2c')](_0x0e9b('0x2d'))[_0x0e9b('0x2e')]()[_0x0e9b('0x8')]())return _0x33fbdb=_0x4dcf74(this),!0x1;});_0x33fbdb[_0x0e9b('0x22')]&&(_0x33fbdb[_0x0e9b('0xf')](function(){_0x4dcf74(this)[_0x0e9b('0x0')](_0x0e9b('0x2f'))[_0x0e9b('0x28')]()[_0x0e9b('0x30')](_0x35d3a3);}),_0x35d3a3[_0x0e9b('0x29')]());})['addClass'](_0x0e9b('0x2a'));},'error':function(){_0xb1ef28(_0x0e9b('0x31')+_0x6031ef[_0x0e9b('0x26')]+_0x0e9b('0x32'));},'complete':function(){_0x6031ef[_0x0e9b('0x33')][_0x0e9b('0x34')](this);_0x4dcf74(window)[_0x0e9b('0x35')]('QuatroDigital.am.ajaxCallback',_0x5aa42b);},'clearQueueDelay':0xbb8});};_0x4dcf74[_0x0e9b('0x3')]=function(_0x2bec6e){var _0x86e8da=_0x2bec6e['find']('ul[itemscope]')[_0x0e9b('0xf')](function(){var _0x3cc4c1=_0x4dcf74(this);if(!_0x3cc4c1[_0x0e9b('0x22')])return _0xb1ef28([_0x0e9b('0x36'),_0x2bec6e],'alerta');_0x3cc4c1['find']('li\x20>ul')[_0x0e9b('0x23')]()['addClass']('qd-am-has-ul');_0x3cc4c1[_0x0e9b('0x1d')]('li')[_0x0e9b('0xf')](function(){var _0xbbb467=_0x4dcf74(this);var _0x471c8c=_0xbbb467[_0x0e9b('0x37')](':not(ul)');_0x471c8c['length']&&_0xbbb467['addClass']('qd-am-elem-'+_0x471c8c['first']()['text']()[_0x0e9b('0x2e')]()[_0x0e9b('0x38')]()[_0x0e9b('0x15')](/\./g,'')[_0x0e9b('0x15')](/\s/g,'-')[_0x0e9b('0x8')]());});var _0x15a8e2=_0x3cc4c1[_0x0e9b('0x1d')](_0x0e9b('0x39'))['qdAmAddNdx']();_0x3cc4c1[_0x0e9b('0x10')]('qd-amazing-menu');_0x15a8e2=_0x15a8e2[_0x0e9b('0x1d')](_0x0e9b('0x3a'));_0x15a8e2[_0x0e9b('0xf')](function(){var _0x2371cd=_0x4dcf74(this);_0x2371cd[_0x0e9b('0x1d')]('>li')[_0x0e9b('0xe')]()[_0x0e9b('0x10')]('qd-am-column');_0x2371cd['addClass'](_0x0e9b('0x3b'));_0x2371cd[_0x0e9b('0x23')]()['addClass']('qd-am-dropdown');});_0x15a8e2[_0x0e9b('0x10')](_0x0e9b('0x3c'));var _0x341c20=0x0,_0x114e1d=function(_0xb2ba6){_0x341c20+=0x1;_0xb2ba6=_0xb2ba6[_0x0e9b('0x37')]('li')[_0x0e9b('0x37')]('*');_0xb2ba6['length']&&(_0xb2ba6['addClass']('qd-am-level-'+_0x341c20),_0x114e1d(_0xb2ba6));};_0x114e1d(_0x3cc4c1);_0x3cc4c1[_0x0e9b('0x3d')](_0x3cc4c1[_0x0e9b('0x1d')]('ul'))[_0x0e9b('0xf')](function(){var _0x584d4a=_0x4dcf74(this);_0x584d4a[_0x0e9b('0x10')](_0x0e9b('0x3e')+_0x584d4a[_0x0e9b('0x37')]('li')['length']+_0x0e9b('0x3f'));});});_0xd12d04(_0x86e8da);_0x6031ef[_0x0e9b('0x40')]['call'](this);_0x4dcf74(window)[_0x0e9b('0x35')](_0x0e9b('0x41'),_0x2bec6e);};_0x4dcf74['fn'][_0x0e9b('0x3')]=function(_0x2a41b4){var _0x679e3f=_0x4dcf74(this);if(!_0x679e3f[_0x0e9b('0x22')])return _0x679e3f;_0x6031ef=_0x4dcf74[_0x0e9b('0x42')]({},_0x20abe4,_0x2a41b4);_0x679e3f[_0x0e9b('0x43')]=new _0x4dcf74[(_0x0e9b('0x3'))](_0x4dcf74(this));return _0x679e3f;};_0x4dcf74(function(){_0x4dcf74(_0x0e9b('0x44'))[_0x0e9b('0x3')]();});}}(this));

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
var _0xf1b6=['.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20input','updateOnlyHover','mouseenter.qd_ddc_hover','mouseleave.qd_ddc_hover','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','linkCart','.qd_ddc_continueShopping','.qd-ddc-checkout','.qd-ddc-infoTotal','.qd-ddc-shipping','.qd-ddc-emptyCart\x20p','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','QD_checkoutQueue','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','cartIsEmpty','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','productCategoryIds','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','.qd-ddc-quantity','val','quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','appendTo','address','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','[data-sku=\x27','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','click.qd_ddc_remove','removeProduct','stop','slideUp','remove','shippingCalculate','$1-$2$3','calculateShipping','BRA','Não\x20foi\x20possível\x20calcular\x20o\x20frete','qdDdcLastPostalCode','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','allowRecalculate','buyButtonClicked','productId','prod_','prodId','.qd-bap-wrapper','qd-bap-item-added','.qd_bap_wrapper_content','prepend','.qdDdcContainer','selector','dropDown','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','smartCart','replace','abs','undefined','pow','round','toFixed','length','join','function','prototype','trim','capitalize','charAt','slice','toLowerCase','qdAjax','qdAjaxQueue','jquery','000','error','extend','GET','object','data','stringify','toString','url','jqXHR','ajax','done','fail','always','complete','clearQueueDelay','message','getParent','closest','simpleCart','checkout','getOrderForm','call','QuatroDigital_simpleCart','ajaxStopOn','alerta','[Simple\x20Cart]\x0a','warn','info','QD_simpleCart','elements','add','.qd_cart_qtt','.qd_cart_total','.qd_items_text','attr','content','each','qd_simpleCartOpts','_QuatroDigital_CartData','Shipping','totalizers','value','total','currencySymbol','shipping','allTotal','qtt','showQuantityByItems','items','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','hide','filter','show','.plural','addClass','qd-emptyCart','removeClass','$this','O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','html','cartQttE','find','cartQtt','cartTotalE','itemsText','emptyElem','qd-sc-populated','smartCheckout','_QuatroDigital_DropDown','vtexjs','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','shippingData','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','callback','simpleCartCallback.quatro_digital','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','bind','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','Oooops!\x20','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','Callbacks','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','input.buy-in-page-quantity','javascript:','body','.productQuickView','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','location','href','QD_buyButton','isSmartCheckout','qd-bb-click-active','click.qd_bb_buy_sc','allowBuyClick','clickBuySmartCheckout','preventDefault','Método\x20descontinuado!','buyButton','.qd-sbb-on','qd-sbb-on','.btn-add-buy-button-asynchronous','.remove-href','qd-bb-active','.qd-bb-productAdded','append','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','.buy-in-page-button','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','_Quatro_Digital_dropDown','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','[href=\x27','---','qd-bb-itemAddBuyButtonWrapper','getCartInfoByUrl','allowUpdate','autoWatchBuyButton','unbind','click','mouseenter.qd_bb_buy_sc','load','selectSkuMsg','redirect=false','queue','buyIfQuantityZeroed','match','push','productPageCallback','prodAdd','split','ku=','pop','shift','asyncCallback','trigger','productAddedToCart','cartProductAdded.vtex','success','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','Callback\x20não\x20é\x20uma\x20função','children','.qd-bb-itemAddWrapper','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','QuatroDigital.qd_bb_prod_add','ajaxSend','/checkout/cart/add','productAddedToCart.qdSbbVtex','ajaxStop','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','QD_dropDownCart','vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','name','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose'];(function(_0x2e0e17,_0x494409){var _0x2d3678=function(_0x23fe92){while(--_0x23fe92){_0x2e0e17['push'](_0x2e0e17['shift']());}};_0x2d3678(++_0x494409);}(_0xf1b6,0x81));var _0x6f1b=function(_0x4ea5c,_0x64b437){_0x4ea5c=_0x4ea5c-0x0;var _0x15b115=_0xf1b6[_0x4ea5c];return _0x15b115;};(function(_0x3e2ae4){_0x3e2ae4['fn']['getParent']=_0x3e2ae4['fn']['closest'];}(jQuery));function qd_number_format(_0x12815e,_0x2d0d64,_0x191c95,_0x1c7b63){_0x12815e=(_0x12815e+'')[_0x6f1b('0x0')](/[^0-9+\-Ee.]/g,'');_0x12815e=isFinite(+_0x12815e)?+_0x12815e:0x0;_0x2d0d64=isFinite(+_0x2d0d64)?Math[_0x6f1b('0x1')](_0x2d0d64):0x0;_0x1c7b63='undefined'===typeof _0x1c7b63?',':_0x1c7b63;_0x191c95=_0x6f1b('0x2')===typeof _0x191c95?'.':_0x191c95;var _0x49aeba='',_0x49aeba=function(_0xb22a8a,_0x295ad8){var _0x2d0d64=Math[_0x6f1b('0x3')](0xa,_0x295ad8);return''+(Math[_0x6f1b('0x4')](_0xb22a8a*_0x2d0d64)/_0x2d0d64)[_0x6f1b('0x5')](_0x295ad8);},_0x49aeba=(_0x2d0d64?_0x49aeba(_0x12815e,_0x2d0d64):''+Math[_0x6f1b('0x4')](_0x12815e))['split']('.');0x3<_0x49aeba[0x0][_0x6f1b('0x6')]&&(_0x49aeba[0x0]=_0x49aeba[0x0][_0x6f1b('0x0')](/\B(?=(?:\d{3})+(?!\d))/g,_0x1c7b63));(_0x49aeba[0x1]||'')[_0x6f1b('0x6')]<_0x2d0d64&&(_0x49aeba[0x1]=_0x49aeba[0x1]||'',_0x49aeba[0x1]+=Array(_0x2d0d64-_0x49aeba[0x1][_0x6f1b('0x6')]+0x1)[_0x6f1b('0x7')]('0'));return _0x49aeba[_0x6f1b('0x7')](_0x191c95);};_0x6f1b('0x8')!==typeof String['prototype']['trim']&&(String[_0x6f1b('0x9')][_0x6f1b('0xa')]=function(){return this[_0x6f1b('0x0')](/^\s+|\s+$/g,'');});_0x6f1b('0x8')!=typeof String[_0x6f1b('0x9')]['capitalize']&&(String[_0x6f1b('0x9')][_0x6f1b('0xb')]=function(){return this[_0x6f1b('0xc')](0x0)['toUpperCase']()+this[_0x6f1b('0xd')](0x1)[_0x6f1b('0xe')]();});(function(_0x3eb2bd){if(_0x6f1b('0x8')!==typeof _0x3eb2bd[_0x6f1b('0xf')]){var _0x128dee={};_0x3eb2bd[_0x6f1b('0x10')]=_0x128dee;0x96>parseInt((_0x3eb2bd['fn'][_0x6f1b('0x11')][_0x6f1b('0x0')](/[^0-9]+/g,'')+_0x6f1b('0x12'))['slice'](0x0,0x3),0xa)&&console&&_0x6f1b('0x8')==typeof console[_0x6f1b('0x13')]&&console[_0x6f1b('0x13')]();_0x3eb2bd[_0x6f1b('0xf')]=function(_0x278a77){try{var _0xf5c4a5=_0x3eb2bd[_0x6f1b('0x14')]({},{'url':'','type':_0x6f1b('0x15'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x278a77);var _0x11772a=_0x6f1b('0x16')===typeof _0xf5c4a5[_0x6f1b('0x17')]?JSON[_0x6f1b('0x18')](_0xf5c4a5[_0x6f1b('0x17')]):_0xf5c4a5[_0x6f1b('0x17')][_0x6f1b('0x19')]();var _0x277281=encodeURIComponent(_0xf5c4a5[_0x6f1b('0x1a')]+'|'+_0xf5c4a5['type']+'|'+_0x11772a);_0x128dee[_0x277281]=_0x128dee[_0x277281]||{};_0x6f1b('0x2')==typeof _0x128dee[_0x277281][_0x6f1b('0x1b')]?_0x128dee[_0x277281]['jqXHR']=_0x3eb2bd[_0x6f1b('0x1c')](_0xf5c4a5):(_0x128dee[_0x277281][_0x6f1b('0x1b')][_0x6f1b('0x1d')](_0xf5c4a5['success']),_0x128dee[_0x277281]['jqXHR'][_0x6f1b('0x1e')](_0xf5c4a5[_0x6f1b('0x13')]),_0x128dee[_0x277281][_0x6f1b('0x1b')][_0x6f1b('0x1f')](_0xf5c4a5[_0x6f1b('0x20')]));_0x128dee[_0x277281][_0x6f1b('0x1b')]['always'](function(){isNaN(parseInt(_0xf5c4a5[_0x6f1b('0x21')]))||setTimeout(function(){_0x128dee[_0x277281][_0x6f1b('0x1b')]=void 0x0;},_0xf5c4a5['clearQueueDelay']);});return _0x128dee[_0x277281][_0x6f1b('0x1b')];}catch(_0xe18fd3){_0x6f1b('0x2')!==typeof console&&_0x6f1b('0x8')===typeof console['error']&&console['error']('Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20'+_0xe18fd3[_0x6f1b('0x22')]);}};_0x3eb2bd['qdAjax']['version']='4.0';}}(jQuery));(function(_0x32db18){_0x32db18['fn'][_0x6f1b('0x23')]=_0x32db18['fn'][_0x6f1b('0x24')];}(jQuery));(function(){var _0x214f8d=jQuery;if(_0x6f1b('0x8')!==typeof _0x214f8d['fn'][_0x6f1b('0x25')]){_0x214f8d(function(){var _0x557733=vtexjs[_0x6f1b('0x26')][_0x6f1b('0x27')];vtexjs[_0x6f1b('0x26')][_0x6f1b('0x27')]=function(){return _0x557733[_0x6f1b('0x28')]();};});try{window[_0x6f1b('0x29')]=window[_0x6f1b('0x29')]||{};window['QuatroDigital_simpleCart'][_0x6f1b('0x2a')]=!0x1;_0x214f8d['fn'][_0x6f1b('0x25')]=function(_0x29ab00,_0x444ee8,_0x3a7e72){var _0x3dd229=function(_0x15c8ba,_0x37b83a){if(_0x6f1b('0x16')===typeof console){var _0x20933d=_0x6f1b('0x16')===typeof _0x15c8ba;_0x6f1b('0x2')!==typeof _0x37b83a&&_0x6f1b('0x2b')===_0x37b83a['toLowerCase']()?_0x20933d?console['warn'](_0x6f1b('0x2c'),_0x15c8ba[0x0],_0x15c8ba[0x1],_0x15c8ba[0x2],_0x15c8ba[0x3],_0x15c8ba[0x4],_0x15c8ba[0x5],_0x15c8ba[0x6],_0x15c8ba[0x7]):console[_0x6f1b('0x2d')](_0x6f1b('0x2c')+_0x15c8ba):_0x6f1b('0x2')!==typeof _0x37b83a&&_0x6f1b('0x2e')===_0x37b83a['toLowerCase']()?_0x20933d?console['info'](_0x6f1b('0x2c'),_0x15c8ba[0x0],_0x15c8ba[0x1],_0x15c8ba[0x2],_0x15c8ba[0x3],_0x15c8ba[0x4],_0x15c8ba[0x5],_0x15c8ba[0x6],_0x15c8ba[0x7]):console['info'](_0x6f1b('0x2c')+_0x15c8ba):_0x20933d?console[_0x6f1b('0x13')](_0x6f1b('0x2c'),_0x15c8ba[0x0],_0x15c8ba[0x1],_0x15c8ba[0x2],_0x15c8ba[0x3],_0x15c8ba[0x4],_0x15c8ba[0x5],_0x15c8ba[0x6],_0x15c8ba[0x7]):console[_0x6f1b('0x13')](_0x6f1b('0x2c')+_0x15c8ba);}};var _0x3d4669=_0x214f8d(this);_0x6f1b('0x16')===typeof _0x29ab00?_0x444ee8=_0x29ab00:(_0x29ab00=_0x29ab00||!0x1,_0x3d4669=_0x3d4669['add'](_0x214f8d[_0x6f1b('0x2f')]['elements']));if(!_0x3d4669['length'])return _0x3d4669;_0x214f8d[_0x6f1b('0x2f')][_0x6f1b('0x30')]=_0x214f8d[_0x6f1b('0x2f')][_0x6f1b('0x30')][_0x6f1b('0x31')](_0x3d4669);_0x3a7e72=_0x6f1b('0x2')===typeof _0x3a7e72?!0x1:_0x3a7e72;var _0x5d2db2={'cartQtt':_0x6f1b('0x32'),'cartTotal':_0x6f1b('0x33'),'itemsText':_0x6f1b('0x34'),'currencySymbol':(_0x214f8d('meta[name=currency]')[_0x6f1b('0x35')](_0x6f1b('0x36'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x1dbc3b=_0x214f8d[_0x6f1b('0x14')]({},_0x5d2db2,_0x444ee8);var _0x30bb37=_0x214f8d('');_0x3d4669[_0x6f1b('0x37')](function(){var _0x45432f=_0x214f8d(this);_0x45432f['data'](_0x6f1b('0x38'))||_0x45432f[_0x6f1b('0x17')](_0x6f1b('0x38'),_0x1dbc3b);});var _0x50adf6=function(_0x333f69){window[_0x6f1b('0x39')]=window[_0x6f1b('0x39')]||{};for(var _0x29ab00=0x0,_0x30ac63=0x0,_0x4e5609=0x0;_0x4e5609<_0x333f69['totalizers']['length'];_0x4e5609++)_0x6f1b('0x3a')==_0x333f69[_0x6f1b('0x3b')][_0x4e5609]['id']&&(_0x30ac63+=_0x333f69[_0x6f1b('0x3b')][_0x4e5609][_0x6f1b('0x3c')]),_0x29ab00+=_0x333f69[_0x6f1b('0x3b')][_0x4e5609][_0x6f1b('0x3c')];window[_0x6f1b('0x39')][_0x6f1b('0x3d')]=_0x1dbc3b[_0x6f1b('0x3e')]+qd_number_format(_0x29ab00/0x64,0x2,',','.');window[_0x6f1b('0x39')][_0x6f1b('0x3f')]=_0x1dbc3b[_0x6f1b('0x3e')]+qd_number_format(_0x30ac63/0x64,0x2,',','.');window[_0x6f1b('0x39')][_0x6f1b('0x40')]=_0x1dbc3b['currencySymbol']+qd_number_format((_0x29ab00+_0x30ac63)/0x64,0x2,',','.');window[_0x6f1b('0x39')][_0x6f1b('0x41')]=0x0;if(_0x1dbc3b[_0x6f1b('0x42')])for(_0x4e5609=0x0;_0x4e5609<_0x333f69['items'][_0x6f1b('0x6')];_0x4e5609++)window[_0x6f1b('0x39')][_0x6f1b('0x41')]+=_0x333f69[_0x6f1b('0x43')][_0x4e5609]['quantity'];else window[_0x6f1b('0x39')][_0x6f1b('0x41')]=_0x333f69[_0x6f1b('0x43')][_0x6f1b('0x6')]||0x0;try{window[_0x6f1b('0x39')]['callback']&&window[_0x6f1b('0x39')]['callback'][_0x6f1b('0x44')]&&window[_0x6f1b('0x39')]['callback']['fire']();}catch(_0x440987){_0x3dd229(_0x6f1b('0x45'));}_0x4ca314(_0x30bb37);};var _0x5342bb=function(_0xc90f24,_0x102415){0x1===_0xc90f24?_0x102415[_0x6f1b('0x46')]()[_0x6f1b('0x47')]('.singular')[_0x6f1b('0x48')]():_0x102415[_0x6f1b('0x46')]()[_0x6f1b('0x47')](_0x6f1b('0x49'))[_0x6f1b('0x48')]();};var _0x3e6b35=function(_0x20a0c8){0x1>_0x20a0c8?_0x3d4669[_0x6f1b('0x4a')](_0x6f1b('0x4b')):_0x3d4669[_0x6f1b('0x4c')]('qd-emptyCart');};var _0x5acf68=function(_0x38aee5,_0x3f68d1){var _0x3a5c8e=parseInt(window[_0x6f1b('0x39')][_0x6f1b('0x41')],0xa);_0x3f68d1[_0x6f1b('0x4d')][_0x6f1b('0x48')]();isNaN(_0x3a5c8e)&&(_0x3dd229(_0x6f1b('0x4e'),_0x6f1b('0x2b')),_0x3a5c8e=0x0);_0x3f68d1['cartTotalE'][_0x6f1b('0x4f')](window[_0x6f1b('0x39')][_0x6f1b('0x3d')]);_0x3f68d1['cartQttE']['html'](_0x3a5c8e);_0x5342bb(_0x3a5c8e,_0x3f68d1['itemsTextE']);_0x3e6b35(_0x3a5c8e);};var _0x4ca314=function(_0x49ead2){_0x3d4669[_0x6f1b('0x37')](function(){var _0x5a1f01={};var _0x40781e=_0x214f8d(this);_0x29ab00&&_0x40781e['data']('qd_simpleCartOpts')&&_0x214f8d['extend'](_0x1dbc3b,_0x40781e[_0x6f1b('0x17')](_0x6f1b('0x38')));_0x5a1f01[_0x6f1b('0x4d')]=_0x40781e;_0x5a1f01[_0x6f1b('0x50')]=_0x40781e[_0x6f1b('0x51')](_0x1dbc3b[_0x6f1b('0x52')])||_0x30bb37;_0x5a1f01[_0x6f1b('0x53')]=_0x40781e[_0x6f1b('0x51')](_0x1dbc3b['cartTotal'])||_0x30bb37;_0x5a1f01['itemsTextE']=_0x40781e[_0x6f1b('0x51')](_0x1dbc3b[_0x6f1b('0x54')])||_0x30bb37;_0x5a1f01[_0x6f1b('0x55')]=_0x40781e['find'](_0x1dbc3b['emptyCart'])||_0x30bb37;_0x5acf68(_0x49ead2,_0x5a1f01);_0x40781e[_0x6f1b('0x4a')](_0x6f1b('0x56'));});};(function(){if(_0x1dbc3b[_0x6f1b('0x57')]){window[_0x6f1b('0x58')]=window[_0x6f1b('0x58')]||{};if(_0x6f1b('0x2')!==typeof window['_QuatroDigital_DropDown']['getOrderForm']&&(_0x3a7e72||!_0x29ab00))return _0x50adf6(window[_0x6f1b('0x58')][_0x6f1b('0x27')]);if(_0x6f1b('0x16')!==typeof window['vtexjs']||'undefined'===typeof window[_0x6f1b('0x59')][_0x6f1b('0x26')])if(_0x6f1b('0x16')===typeof vtex&&_0x6f1b('0x16')===typeof vtex[_0x6f1b('0x26')]&&_0x6f1b('0x2')!==typeof vtex[_0x6f1b('0x26')][_0x6f1b('0x5a')])new vtex['checkout']['SDK']();else return _0x3dd229(_0x6f1b('0x5b'));_0x214f8d['QD_checkoutQueue']([_0x6f1b('0x43'),_0x6f1b('0x3b'),_0x6f1b('0x5c')],{'done':function(_0x26b1a7){_0x50adf6(_0x26b1a7);window[_0x6f1b('0x58')][_0x6f1b('0x27')]=_0x26b1a7;},'fail':function(_0x33473d){_0x3dd229(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.',_0x33473d]);}});}else alert(_0x6f1b('0x5d'));}());_0x1dbc3b[_0x6f1b('0x5e')]();_0x214f8d(window)['trigger'](_0x6f1b('0x5f'));return _0x3d4669;};_0x214f8d[_0x6f1b('0x2f')]={'elements':_0x214f8d('')};_0x214f8d(function(){var _0x5e2ffc;_0x6f1b('0x8')===typeof window[_0x6f1b('0x60')]&&(_0x5e2ffc=window[_0x6f1b('0x60')],window[_0x6f1b('0x60')]=function(_0x31a65f,_0x1e6ff2,_0x462b47,_0x53ee6c,_0x274ae9){_0x5e2ffc[_0x6f1b('0x28')](this,_0x31a65f,_0x1e6ff2,_0x462b47,_0x53ee6c,function(){_0x6f1b('0x8')===typeof _0x274ae9&&_0x274ae9();_0x214f8d[_0x6f1b('0x2f')]['elements']['each'](function(){var _0x4416b9=_0x214f8d(this);_0x4416b9[_0x6f1b('0x25')](_0x4416b9[_0x6f1b('0x17')]('qd_simpleCartOpts'));});});});});var _0x183956=window[_0x6f1b('0x61')]||void 0x0;window[_0x6f1b('0x61')]=function(_0x3f3aec){_0x214f8d['fn'][_0x6f1b('0x25')](!0x0);_0x6f1b('0x8')===typeof _0x183956?_0x183956[_0x6f1b('0x28')](this,_0x3f3aec):alert(_0x3f3aec);};_0x214f8d(function(){var _0x5df46a=_0x214f8d('.qd_cart_auto');_0x5df46a[_0x6f1b('0x6')]&&_0x5df46a[_0x6f1b('0x25')]();});_0x214f8d(function(){_0x214f8d(window)[_0x6f1b('0x62')](_0x6f1b('0x63'),function(){_0x214f8d['fn'][_0x6f1b('0x25')](!0x0);});});}catch(_0x37448f){_0x6f1b('0x2')!==typeof console&&'function'===typeof console[_0x6f1b('0x13')]&&console[_0x6f1b('0x13')](_0x6f1b('0x64'),_0x37448f);}}}());(function(){var _0x4dc713=function(_0x5cbfa9,_0x4ca6c5){if('object'===typeof console){var _0xe44b35=_0x6f1b('0x16')===typeof _0x5cbfa9;'undefined'!==typeof _0x4ca6c5&&'alerta'===_0x4ca6c5['toLowerCase']()?_0xe44b35?console[_0x6f1b('0x2d')](_0x6f1b('0x65'),_0x5cbfa9[0x0],_0x5cbfa9[0x1],_0x5cbfa9[0x2],_0x5cbfa9[0x3],_0x5cbfa9[0x4],_0x5cbfa9[0x5],_0x5cbfa9[0x6],_0x5cbfa9[0x7]):console[_0x6f1b('0x2d')](_0x6f1b('0x65')+_0x5cbfa9):_0x6f1b('0x2')!==typeof _0x4ca6c5&&_0x6f1b('0x2e')===_0x4ca6c5[_0x6f1b('0xe')]()?_0xe44b35?console[_0x6f1b('0x2e')](_0x6f1b('0x65'),_0x5cbfa9[0x0],_0x5cbfa9[0x1],_0x5cbfa9[0x2],_0x5cbfa9[0x3],_0x5cbfa9[0x4],_0x5cbfa9[0x5],_0x5cbfa9[0x6],_0x5cbfa9[0x7]):console[_0x6f1b('0x2e')](_0x6f1b('0x65')+_0x5cbfa9):_0xe44b35?console['error'](_0x6f1b('0x65'),_0x5cbfa9[0x0],_0x5cbfa9[0x1],_0x5cbfa9[0x2],_0x5cbfa9[0x3],_0x5cbfa9[0x4],_0x5cbfa9[0x5],_0x5cbfa9[0x6],_0x5cbfa9[0x7]):console[_0x6f1b('0x13')](_0x6f1b('0x65')+_0x5cbfa9);}},_0x1b35d6=null,_0x3c74bc={},_0x5371da={},_0x3580ef={};$['QD_checkoutQueue']=function(_0x459f07,_0x62c2ff){if(null===_0x1b35d6)if('object'===typeof window[_0x6f1b('0x59')]&&_0x6f1b('0x2')!==typeof window[_0x6f1b('0x59')][_0x6f1b('0x26')])_0x1b35d6=window['vtexjs'][_0x6f1b('0x26')];else return _0x4dc713(_0x6f1b('0x66'));var _0x258a87=$['extend']({'done':function(){},'fail':function(){}},_0x62c2ff),_0x1361be=_0x459f07[_0x6f1b('0x7')](';'),_0x148145=function(){_0x3c74bc[_0x1361be][_0x6f1b('0x31')](_0x258a87[_0x6f1b('0x1d')]);_0x5371da[_0x1361be][_0x6f1b('0x31')](_0x258a87[_0x6f1b('0x1e')]);};_0x3580ef[_0x1361be]?_0x148145():(_0x3c74bc[_0x1361be]=$[_0x6f1b('0x67')](),_0x5371da[_0x1361be]=$[_0x6f1b('0x67')](),_0x148145(),_0x3580ef[_0x1361be]=!0x0,_0x1b35d6[_0x6f1b('0x27')](_0x459f07)[_0x6f1b('0x1d')](function(_0x2d2307){_0x3580ef[_0x1361be]=!0x1;_0x3c74bc[_0x1361be]['fire'](_0x2d2307);})['fail'](function(_0x29e543){_0x3580ef[_0x1361be]=!0x1;_0x5371da[_0x1361be][_0x6f1b('0x44')](_0x29e543);}));};}());(function(_0x174478){try{var _0x1fe586=jQuery,_0x2d4e0e,_0x12bbb3=_0x1fe586({}),_0x20ee74=function(_0x1f2f08,_0x270e06){if('object'===typeof console&&_0x6f1b('0x2')!==typeof console[_0x6f1b('0x13')]&&_0x6f1b('0x2')!==typeof console['info']&&_0x6f1b('0x2')!==typeof console[_0x6f1b('0x2d')]){var _0x4b3b93;_0x6f1b('0x16')===typeof _0x1f2f08?(_0x1f2f08[_0x6f1b('0x68')](_0x6f1b('0x69')),_0x4b3b93=_0x1f2f08):_0x4b3b93=[_0x6f1b('0x69')+_0x1f2f08];if('undefined'===typeof _0x270e06||_0x6f1b('0x2b')!==_0x270e06[_0x6f1b('0xe')]()&&_0x6f1b('0x6a')!==_0x270e06[_0x6f1b('0xe')]())if(_0x6f1b('0x2')!==typeof _0x270e06&&_0x6f1b('0x2e')===_0x270e06[_0x6f1b('0xe')]())try{console['info'][_0x6f1b('0x6b')](console,_0x4b3b93);}catch(_0x1b6094){try{console['info'](_0x4b3b93[_0x6f1b('0x7')]('\x0a'));}catch(_0x540aac){}}else try{console['error'][_0x6f1b('0x6b')](console,_0x4b3b93);}catch(_0x373e52){try{console[_0x6f1b('0x13')](_0x4b3b93[_0x6f1b('0x7')]('\x0a'));}catch(_0x36e490){}}else try{console[_0x6f1b('0x2d')][_0x6f1b('0x6b')](console,_0x4b3b93);}catch(_0x41c31f){try{console[_0x6f1b('0x2d')](_0x4b3b93[_0x6f1b('0x7')]('\x0a'));}catch(_0x4f5487){}}}},_0x4ff159={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':'.productInformationWrapper\x20\x20a.buy-button','buyQtt':_0x6f1b('0x6c'),'selectSkuMsg':_0x6f1b('0x6d'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x4e5a95,_0x14e33a,_0x1f8dce){_0x1fe586(_0x6f1b('0x6e'))['is'](_0x6f1b('0x6f'))&&('success'===_0x14e33a?alert('Produto\x20adicionado\x20ao\x20carrinho!'):(alert(_0x6f1b('0x70')),(_0x6f1b('0x16')===typeof parent?parent:document)[_0x6f1b('0x71')][_0x6f1b('0x72')]=_0x1f8dce));},'isProductPage':function(){return _0x1fe586(_0x6f1b('0x6e'))['is']('#produto,\x20.produto');},'execDefaultAction':function(_0x14016e){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x1fe586[_0x6f1b('0x73')]=function(_0x2aaab1,_0x40ec30){function _0x3ffe0d(_0x5ed6a4){_0x2d4e0e[_0x6f1b('0x74')]?_0x5ed6a4[_0x6f1b('0x17')](_0x6f1b('0x75'))||(_0x5ed6a4[_0x6f1b('0x17')](_0x6f1b('0x75'),0x1),_0x5ed6a4['on'](_0x6f1b('0x76'),function(_0x2ed3af){if(!_0x2d4e0e[_0x6f1b('0x77')]())return!0x0;if(!0x0!==_0x1228be[_0x6f1b('0x78')]['call'](this))return _0x2ed3af[_0x6f1b('0x79')](),!0x1;})):alert(_0x6f1b('0x7a'));}function _0x507c68(_0x3181fe){_0x3181fe=_0x3181fe||_0x1fe586(_0x2d4e0e[_0x6f1b('0x7b')]);_0x3181fe['each'](function(){var _0x3181fe=_0x1fe586(this);_0x3181fe['is'](_0x6f1b('0x7c'))||(_0x3181fe[_0x6f1b('0x4a')](_0x6f1b('0x7d')),_0x3181fe['is'](_0x6f1b('0x7e'))&&!_0x3181fe['is'](_0x6f1b('0x7f'))||_0x3181fe['data'](_0x6f1b('0x80'))||(_0x3181fe[_0x6f1b('0x17')]('qd-bb-active',0x1),_0x3181fe['children'](_0x6f1b('0x81'))[_0x6f1b('0x6')]||_0x3181fe[_0x6f1b('0x82')](_0x6f1b('0x83')),_0x3181fe['is'](_0x6f1b('0x84'))&&_0x2d4e0e['isProductPage']()&&_0x10d6f4['call'](_0x3181fe),_0x3ffe0d(_0x3181fe)));});_0x2d4e0e['isProductPage']()&&!_0x3181fe[_0x6f1b('0x6')]&&_0x20ee74(_0x6f1b('0x85')+_0x3181fe['selector']+'\x27.',_0x6f1b('0x2e'));}var _0x2352c4=_0x1fe586(_0x2aaab1);var _0x1228be=this;window[_0x6f1b('0x86')]=window['_Quatro_Digital_dropDown']||{};window['_QuatroDigital_CartData']=window['_QuatroDigital_CartData']||{};_0x1228be['prodAdd']=function(_0x3a80eb,_0x505ccd){_0x2352c4[_0x6f1b('0x4a')](_0x6f1b('0x87'));_0x1fe586(_0x6f1b('0x6e'))['addClass'](_0x6f1b('0x88'));var _0x21d327=_0x1fe586(_0x2d4e0e[_0x6f1b('0x7b')])[_0x6f1b('0x47')](_0x6f1b('0x89')+(_0x3a80eb[_0x6f1b('0x35')](_0x6f1b('0x72'))||_0x6f1b('0x8a'))+'\x27]')[_0x6f1b('0x31')](_0x3a80eb);_0x21d327[_0x6f1b('0x4a')](_0x6f1b('0x8b'));setTimeout(function(){_0x2352c4[_0x6f1b('0x4c')]('qd-bb-itemAddCartWrapper');_0x21d327['removeClass']('qd-bb-itemAddBuyButtonWrapper');},_0x2d4e0e['timeRemoveNewItemClass']);window[_0x6f1b('0x86')]['getOrderForm']=void 0x0;if(_0x6f1b('0x2')!==typeof _0x40ec30&&_0x6f1b('0x8')===typeof _0x40ec30[_0x6f1b('0x8c')])return _0x2d4e0e[_0x6f1b('0x74')]||(_0x20ee74('função\x20descontinuada'),_0x40ec30[_0x6f1b('0x8c')]()),window[_0x6f1b('0x58')][_0x6f1b('0x27')]=void 0x0,_0x40ec30[_0x6f1b('0x8c')](function(_0x300b70){window[_0x6f1b('0x86')][_0x6f1b('0x27')]=_0x300b70;_0x1fe586['fn'][_0x6f1b('0x25')](!0x0,void 0x0,!0x0);},{'lastSku':_0x505ccd});window[_0x6f1b('0x86')][_0x6f1b('0x8d')]=!0x0;_0x1fe586['fn'][_0x6f1b('0x25')](!0x0);};(function(){if(_0x2d4e0e[_0x6f1b('0x74')]&&_0x2d4e0e[_0x6f1b('0x8e')]){var _0x1f2870=_0x1fe586(_0x6f1b('0x7e'));_0x1f2870[_0x6f1b('0x6')]&&_0x507c68(_0x1f2870);}}());var _0x10d6f4=function(){var _0x169038=_0x1fe586(this);'undefined'!==typeof _0x169038[_0x6f1b('0x17')](_0x6f1b('0x7b'))?(_0x169038[_0x6f1b('0x8f')](_0x6f1b('0x90')),_0x3ffe0d(_0x169038)):(_0x169038[_0x6f1b('0x62')](_0x6f1b('0x91'),function(_0x20e9fc){_0x169038[_0x6f1b('0x8f')](_0x6f1b('0x90'));_0x3ffe0d(_0x169038);_0x1fe586(this)[_0x6f1b('0x8f')](_0x20e9fc);}),_0x1fe586(window)[_0x6f1b('0x92')](function(){_0x169038['unbind'](_0x6f1b('0x90'));_0x3ffe0d(_0x169038);_0x169038[_0x6f1b('0x8f')](_0x6f1b('0x91'));}));};_0x1228be[_0x6f1b('0x78')]=function(){var _0x5f05fa=_0x1fe586(this),_0x2aaab1=_0x5f05fa[_0x6f1b('0x35')]('href')||'';if(-0x1<_0x2aaab1['indexOf'](_0x2d4e0e[_0x6f1b('0x93')]))return!0x0;_0x2aaab1=_0x2aaab1[_0x6f1b('0x0')](/redirect\=(false|true)/gi,'')[_0x6f1b('0x0')]('?','?redirect=false&')['replace'](/\&\&/gi,'&');if(_0x2d4e0e['execDefaultAction'](_0x5f05fa))return _0x5f05fa[_0x6f1b('0x35')](_0x6f1b('0x72'),_0x2aaab1[_0x6f1b('0x0')](_0x6f1b('0x94'),'redirect=true')),!0x0;_0x2aaab1=_0x2aaab1[_0x6f1b('0x0')](/http.?:/i,'');_0x12bbb3[_0x6f1b('0x95')](function(_0x5aae5f){if(!_0x2d4e0e[_0x6f1b('0x96')]&&!/(&|\?)qty\=[1-9][0-9]*/gi['test'](_0x2aaab1))return _0x5aae5f();var _0x363fc3=function(_0x1d2f7d,_0x4635af){var _0x507c68=_0x2aaab1[_0x6f1b('0x97')](/sku\=([0-9]+)/gi),_0x2acb92=[];if(_0x6f1b('0x16')===typeof _0x507c68&&null!==_0x507c68)for(var _0x129c8c=_0x507c68[_0x6f1b('0x6')]-0x1;0x0<=_0x129c8c;_0x129c8c--){var _0x505b92=parseInt(_0x507c68[_0x129c8c][_0x6f1b('0x0')](/sku\=/gi,''));isNaN(_0x505b92)||_0x2acb92[_0x6f1b('0x98')](_0x505b92);}_0x2d4e0e[_0x6f1b('0x99')][_0x6f1b('0x28')](this,_0x1d2f7d,_0x4635af,_0x2aaab1);_0x1228be['buyButtonClickCallback']['call'](this,_0x1d2f7d,_0x4635af,_0x2aaab1,_0x2acb92);_0x1228be[_0x6f1b('0x9a')](_0x5f05fa,_0x2aaab1[_0x6f1b('0x9b')](_0x6f1b('0x9c'))[_0x6f1b('0x9d')]()[_0x6f1b('0x9b')]('&')[_0x6f1b('0x9e')]());'function'===typeof _0x2d4e0e[_0x6f1b('0x9f')]&&_0x2d4e0e[_0x6f1b('0x9f')][_0x6f1b('0x28')](this);_0x1fe586(window)[_0x6f1b('0xa0')](_0x6f1b('0xa1'));_0x1fe586(window)[_0x6f1b('0xa0')](_0x6f1b('0xa2'));};_0x2d4e0e['fakeRequest']?(_0x363fc3(null,_0x6f1b('0xa3')),_0x5aae5f()):_0x1fe586['ajax']({'url':_0x2aaab1,'complete':_0x363fc3})['always'](function(){_0x5aae5f();});});};_0x1228be['buyButtonClickCallback']=function(_0x47fdc5,_0x48df4c,_0x44fe09,_0x32a086){try{_0x6f1b('0xa3')===_0x48df4c&&_0x6f1b('0x16')===typeof window[_0x6f1b('0xa4')]&&'function'===typeof window[_0x6f1b('0xa4')][_0x6f1b('0xa5')]&&window[_0x6f1b('0xa4')][_0x6f1b('0xa5')](_0x47fdc5,_0x48df4c,_0x44fe09,_0x32a086);}catch(_0x148582){_0x20ee74(_0x6f1b('0xa6'));}};_0x507c68();'function'===typeof _0x2d4e0e[_0x6f1b('0x5e')]?_0x2d4e0e['callback']['call'](this):_0x20ee74(_0x6f1b('0xa7'));};var _0x5cd689=_0x1fe586[_0x6f1b('0x67')]();_0x1fe586['fn']['QD_buyButton']=function(_0x38e333,_0x4eb0c7){var _0x174478=_0x1fe586(this);_0x6f1b('0x2')!==typeof _0x4eb0c7||_0x6f1b('0x16')!==typeof _0x38e333||_0x38e333 instanceof _0x1fe586||(_0x4eb0c7=_0x38e333,_0x38e333=void 0x0);_0x2d4e0e=_0x1fe586[_0x6f1b('0x14')]({},_0x4ff159,_0x4eb0c7);var _0x17a82b;_0x5cd689[_0x6f1b('0x31')](function(){_0x174478[_0x6f1b('0xa8')](_0x6f1b('0xa9'))[_0x6f1b('0x6')]||_0x174478['prepend'](_0x6f1b('0xaa'));_0x17a82b=new _0x1fe586[(_0x6f1b('0x73'))](_0x174478,_0x38e333);});_0x5cd689[_0x6f1b('0x44')]();_0x1fe586(window)['on'](_0x6f1b('0xab'),function(_0x73ecd8,_0x2465a5,_0x99a170){_0x17a82b['prodAdd'](_0x2465a5,_0x99a170);});return _0x1fe586[_0x6f1b('0x14')](_0x174478,_0x17a82b);};var _0x29c750=0x0;_0x1fe586(document)[_0x6f1b('0xac')](function(_0x3f6a53,_0x50708f,_0x4f7066){-0x1<_0x4f7066[_0x6f1b('0x1a')][_0x6f1b('0xe')]()['indexOf'](_0x6f1b('0xad'))&&(_0x29c750=(_0x4f7066[_0x6f1b('0x1a')][_0x6f1b('0x97')](/sku\=([0-9]+)/i)||[''])[_0x6f1b('0x9d')]());});_0x1fe586(window)[_0x6f1b('0x62')](_0x6f1b('0xae'),function(){_0x1fe586(window)[_0x6f1b('0xa0')]('QuatroDigital.qd_bb_prod_add',[new _0x1fe586(),_0x29c750]);});_0x1fe586(document)[_0x6f1b('0xaf')](function(){_0x5cd689[_0x6f1b('0x44')]();});}catch(_0x2a4a06){_0x6f1b('0x2')!==typeof console&&'function'===typeof console['error']&&console[_0x6f1b('0x13')](_0x6f1b('0x64'),_0x2a4a06);}}(this));function qd_number_format(_0x30720c,_0x74097,_0x50e4c2,_0x5a9070){_0x30720c=(_0x30720c+'')[_0x6f1b('0x0')](/[^0-9+\-Ee.]/g,'');_0x30720c=isFinite(+_0x30720c)?+_0x30720c:0x0;_0x74097=isFinite(+_0x74097)?Math[_0x6f1b('0x1')](_0x74097):0x0;_0x5a9070=_0x6f1b('0x2')===typeof _0x5a9070?',':_0x5a9070;_0x50e4c2='undefined'===typeof _0x50e4c2?'.':_0x50e4c2;var _0x231d54='',_0x231d54=function(_0x2589fe,_0xe704bc){var _0x3f7434=Math[_0x6f1b('0x3')](0xa,_0xe704bc);return''+(Math[_0x6f1b('0x4')](_0x2589fe*_0x3f7434)/_0x3f7434)[_0x6f1b('0x5')](_0xe704bc);},_0x231d54=(_0x74097?_0x231d54(_0x30720c,_0x74097):''+Math[_0x6f1b('0x4')](_0x30720c))[_0x6f1b('0x9b')]('.');0x3<_0x231d54[0x0][_0x6f1b('0x6')]&&(_0x231d54[0x0]=_0x231d54[0x0][_0x6f1b('0x0')](/\B(?=(?:\d{3})+(?!\d))/g,_0x5a9070));(_0x231d54[0x1]||'')[_0x6f1b('0x6')]<_0x74097&&(_0x231d54[0x1]=_0x231d54[0x1]||'',_0x231d54[0x1]+=Array(_0x74097-_0x231d54[0x1][_0x6f1b('0x6')]+0x1)['join']('0'));return _0x231d54[_0x6f1b('0x7')](_0x50e4c2);}(function(){try{window[_0x6f1b('0x39')]=window[_0x6f1b('0x39')]||{},window['_QuatroDigital_CartData'][_0x6f1b('0x5e')]=window[_0x6f1b('0x39')][_0x6f1b('0x5e')]||$['Callbacks']();}catch(_0x5b87f7){_0x6f1b('0x2')!==typeof console&&_0x6f1b('0x8')===typeof console['error']&&console['error'](_0x6f1b('0x64'),_0x5b87f7[_0x6f1b('0x22')]);}}());(function(_0x227957){try{var _0x59aa43=jQuery,_0x11f3a3=function(_0x26bbfe,_0x5a91c7){if(_0x6f1b('0x16')===typeof console&&_0x6f1b('0x2')!==typeof console[_0x6f1b('0x13')]&&_0x6f1b('0x2')!==typeof console[_0x6f1b('0x2e')]&&_0x6f1b('0x2')!==typeof console[_0x6f1b('0x2d')]){var _0x48c4bd;_0x6f1b('0x16')===typeof _0x26bbfe?(_0x26bbfe[_0x6f1b('0x68')](_0x6f1b('0xb0')),_0x48c4bd=_0x26bbfe):_0x48c4bd=['[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'+_0x26bbfe];if(_0x6f1b('0x2')===typeof _0x5a91c7||_0x6f1b('0x2b')!==_0x5a91c7[_0x6f1b('0xe')]()&&_0x6f1b('0x6a')!==_0x5a91c7[_0x6f1b('0xe')]())if(_0x6f1b('0x2')!==typeof _0x5a91c7&&'info'===_0x5a91c7[_0x6f1b('0xe')]())try{console['info'][_0x6f1b('0x6b')](console,_0x48c4bd);}catch(_0x439293){try{console[_0x6f1b('0x2e')](_0x48c4bd[_0x6f1b('0x7')]('\x0a'));}catch(_0x148fc4){}}else try{console[_0x6f1b('0x13')][_0x6f1b('0x6b')](console,_0x48c4bd);}catch(_0x2f3680){try{console[_0x6f1b('0x13')](_0x48c4bd[_0x6f1b('0x7')]('\x0a'));}catch(_0xbdfa15){}}else try{console[_0x6f1b('0x2d')][_0x6f1b('0x6b')](console,_0x48c4bd);}catch(_0x504cc4){try{console['warn'](_0x48c4bd[_0x6f1b('0x7')]('\x0a'));}catch(_0x1b62e3){}}}};window[_0x6f1b('0x58')]=window[_0x6f1b('0x58')]||{};window[_0x6f1b('0x58')][_0x6f1b('0x8d')]=!0x0;_0x59aa43[_0x6f1b('0xb1')]=function(){};_0x59aa43['fn'][_0x6f1b('0xb1')]=function(){return{'fn':new _0x59aa43()};};var _0x435489=function(_0x36b798){var _0x4cf3ca={'i':_0x6f1b('0xb2')};return function(_0x28055a){var _0x2e11a7=function(_0x5b7e56){return _0x5b7e56;};var _0x5c2a09=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x28055a=_0x28055a['d'+_0x5c2a09[0x10]+'c'+_0x5c2a09[0x11]+'m'+_0x2e11a7(_0x5c2a09[0x1])+'n'+_0x5c2a09[0xd]]['l'+_0x5c2a09[0x12]+'c'+_0x5c2a09[0x0]+'ti'+_0x2e11a7('o')+'n'];var _0x25d365=function(_0x2d0764){return escape(encodeURIComponent(_0x2d0764[_0x6f1b('0x0')](/\./g,'¨')[_0x6f1b('0x0')](/[a-zA-Z]/g,function(_0x461fd7){return String[_0x6f1b('0xb3')](('Z'>=_0x461fd7?0x5a:0x7a)>=(_0x461fd7=_0x461fd7[_0x6f1b('0xb4')](0x0)+0xd)?_0x461fd7:_0x461fd7-0x1a);})));};var _0x227957=_0x25d365(_0x28055a[[_0x5c2a09[0x9],_0x2e11a7('o'),_0x5c2a09[0xc],_0x5c2a09[_0x2e11a7(0xd)]][_0x6f1b('0x7')]('')]);_0x25d365=_0x25d365((window[['js',_0x2e11a7('no'),'m',_0x5c2a09[0x1],_0x5c2a09[0x4][_0x6f1b('0xb5')](),_0x6f1b('0xb6')]['join']('')]||_0x6f1b('0x8a'))+['.v',_0x5c2a09[0xd],'e',_0x2e11a7('x'),'co',_0x2e11a7('mm'),_0x6f1b('0xb7'),_0x5c2a09[0x1],'.c',_0x2e11a7('o'),'m.',_0x5c2a09[0x13],'r'][_0x6f1b('0x7')](''));for(var _0x2b13b9 in _0x4cf3ca){if(_0x25d365===_0x2b13b9+_0x4cf3ca[_0x2b13b9]||_0x227957===_0x2b13b9+_0x4cf3ca[_0x2b13b9]){var _0xbbe5e8='tr'+_0x5c2a09[0x11]+'e';break;}_0xbbe5e8='f'+_0x5c2a09[0x0]+'ls'+_0x2e11a7(_0x5c2a09[0x1])+'';}_0x2e11a7=!0x1;-0x1<_0x28055a[[_0x5c2a09[0xc],'e',_0x5c2a09[0x0],'rc',_0x5c2a09[0x9]][_0x6f1b('0x7')]('')][_0x6f1b('0xb8')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x2e11a7=!0x0);return[_0xbbe5e8,_0x2e11a7];}(_0x36b798);}(window);if(!eval(_0x435489[0x0]))return _0x435489[0x1]?_0x11f3a3(_0x6f1b('0xb9')):!0x1;_0x59aa43[_0x6f1b('0xb1')]=function(_0x3dfd66,_0x43187b){var _0x346cbb=_0x59aa43(_0x3dfd66);if(!_0x346cbb[_0x6f1b('0x6')])return _0x346cbb;var _0x30f026=_0x59aa43[_0x6f1b('0x14')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':_0x6f1b('0xba'),'cartTotal':_0x6f1b('0xbb'),'emptyCart':_0x6f1b('0xbc'),'continueShopping':_0x6f1b('0xbd'),'shippingForm':_0x6f1b('0xbe')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x3e5077){return _0x3e5077[_0x6f1b('0xbf')]||_0x3e5077[_0x6f1b('0xc0')];},'callback':function(){},'callbackProductsList':function(){}},_0x43187b);_0x59aa43('');var _0x4a4570=this;if(_0x30f026[_0x6f1b('0x57')]){var _0x2e61dc=!0x1;_0x6f1b('0x2')===typeof window[_0x6f1b('0x59')]&&(_0x11f3a3('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN'),_0x59aa43[_0x6f1b('0x1c')]({'url':_0x6f1b('0xc1'),'async':!0x1,'dataType':_0x6f1b('0xc2'),'error':function(){_0x11f3a3(_0x6f1b('0xc3'));_0x2e61dc=!0x0;}}));if(_0x2e61dc)return _0x11f3a3(_0x6f1b('0xc4'));}if(_0x6f1b('0x16')===typeof window['vtexjs']&&'undefined'!==typeof window['vtexjs']['checkout'])var _0x39d06a=window[_0x6f1b('0x59')][_0x6f1b('0x26')];else if(_0x6f1b('0x16')===typeof vtex&&_0x6f1b('0x16')===typeof vtex[_0x6f1b('0x26')]&&_0x6f1b('0x2')!==typeof vtex[_0x6f1b('0x26')]['SDK'])_0x39d06a=new vtex['checkout']['SDK']();else return _0x11f3a3(_0x6f1b('0x5b'));_0x4a4570[_0x6f1b('0xc5')]=_0x6f1b('0xc6');var _0x61dab0=function(_0x899586){_0x59aa43(this)[_0x6f1b('0x82')](_0x899586);_0x899586[_0x6f1b('0x51')](_0x6f1b('0xc7'))[_0x6f1b('0x31')](_0x59aa43(_0x6f1b('0xc8')))['on'](_0x6f1b('0xc9'),function(){_0x346cbb[_0x6f1b('0x4c')](_0x6f1b('0xca'));_0x59aa43(document[_0x6f1b('0x6e')])['removeClass'](_0x6f1b('0x88'));});_0x59aa43(document)[_0x6f1b('0xcb')]('keyup.qd_ddc_closeFn')['on'](_0x6f1b('0xcc'),function(_0x3b5c98){0x1b==_0x3b5c98[_0x6f1b('0xcd')]&&(_0x346cbb[_0x6f1b('0x4c')](_0x6f1b('0xca')),_0x59aa43(document[_0x6f1b('0x6e')])[_0x6f1b('0x4c')]('qd-bb-lightBoxBodyProdAdd'));});var _0x4855af=_0x899586[_0x6f1b('0x51')](_0x6f1b('0xce'));_0x899586[_0x6f1b('0x51')](_0x6f1b('0xcf'))['on'](_0x6f1b('0xd0'),function(){_0x4a4570[_0x6f1b('0xd1')]('-',void 0x0,void 0x0,_0x4855af);return!0x1;});_0x899586['find'](_0x6f1b('0xd2'))['on'](_0x6f1b('0xd3'),function(){_0x4a4570[_0x6f1b('0xd1')](void 0x0,void 0x0,void 0x0,_0x4855af);return!0x1;});_0x899586[_0x6f1b('0x51')](_0x6f1b('0xd4'))['val']('')['on']('keyup.qd_ddc_cep',function(){_0x4a4570['shippingCalculate'](_0x59aa43(this));});if(_0x30f026[_0x6f1b('0xd5')]){var _0x43187b=0x0;_0x59aa43(this)['on'](_0x6f1b('0xd6'),function(){var _0x899586=function(){window[_0x6f1b('0x58')]['allowUpdate']&&(_0x4a4570['getCartInfoByUrl'](),window[_0x6f1b('0x58')][_0x6f1b('0x8d')]=!0x1,_0x59aa43['fn'][_0x6f1b('0x25')](!0x0),_0x4a4570['cartIsEmpty']());};_0x43187b=setInterval(function(){_0x899586();},0x258);_0x899586();});_0x59aa43(this)['on'](_0x6f1b('0xd7'),function(){clearInterval(_0x43187b);});}};var _0x44f9e1=function(_0x54faac){_0x54faac=_0x59aa43(_0x54faac);_0x30f026[_0x6f1b('0xd8')][_0x6f1b('0xd9')]=_0x30f026[_0x6f1b('0xd8')][_0x6f1b('0xd9')][_0x6f1b('0x0')](_0x6f1b('0xda'),_0x6f1b('0xdb'));_0x30f026[_0x6f1b('0xd8')][_0x6f1b('0xd9')]=_0x30f026['texts'][_0x6f1b('0xd9')]['replace']('#items',_0x6f1b('0xdc'));_0x30f026['texts'][_0x6f1b('0xd9')]=_0x30f026['texts'][_0x6f1b('0xd9')][_0x6f1b('0x0')](_0x6f1b('0xdd'),_0x6f1b('0xde'));_0x30f026[_0x6f1b('0xd8')][_0x6f1b('0xd9')]=_0x30f026[_0x6f1b('0xd8')]['cartTotal'][_0x6f1b('0x0')](_0x6f1b('0xdf'),_0x6f1b('0xe0'));_0x54faac[_0x6f1b('0x51')](_0x6f1b('0xe1'))[_0x6f1b('0x4f')](_0x30f026[_0x6f1b('0xd8')][_0x6f1b('0xe2')]);_0x54faac[_0x6f1b('0x51')](_0x6f1b('0xe3'))[_0x6f1b('0x4f')](_0x30f026['texts']['continueShopping']);_0x54faac[_0x6f1b('0x51')](_0x6f1b('0xe4'))['html'](_0x30f026['texts']['linkCheckout']);_0x54faac[_0x6f1b('0x51')](_0x6f1b('0xe5'))[_0x6f1b('0x4f')](_0x30f026[_0x6f1b('0xd8')][_0x6f1b('0xd9')]);_0x54faac[_0x6f1b('0x51')](_0x6f1b('0xe6'))['html'](_0x30f026[_0x6f1b('0xd8')]['shippingForm']);_0x54faac['find'](_0x6f1b('0xe7'))[_0x6f1b('0x4f')](_0x30f026[_0x6f1b('0xd8')]['emptyCart']);return _0x54faac;}(this[_0x6f1b('0xc5')]);var _0x527fbd=0x0;_0x346cbb['each'](function(){0x0<_0x527fbd?_0x61dab0[_0x6f1b('0x28')](this,_0x44f9e1[_0x6f1b('0xe8')]()):_0x61dab0[_0x6f1b('0x28')](this,_0x44f9e1);_0x527fbd++;});window[_0x6f1b('0x39')][_0x6f1b('0x5e')][_0x6f1b('0x31')](function(){_0x59aa43(_0x6f1b('0xe9'))[_0x6f1b('0x4f')](window[_0x6f1b('0x39')]['total']||'--');_0x59aa43(_0x6f1b('0xea'))[_0x6f1b('0x4f')](window[_0x6f1b('0x39')][_0x6f1b('0x41')]||'0');_0x59aa43(_0x6f1b('0xeb'))[_0x6f1b('0x4f')](window[_0x6f1b('0x39')][_0x6f1b('0x3f')]||'--');_0x59aa43('.qd-ddc-infoAllTotal')[_0x6f1b('0x4f')](window['_QuatroDigital_CartData']['allTotal']||'--');});var _0x3c6c39=function(_0x1095db,_0x317248){if('undefined'===typeof _0x1095db[_0x6f1b('0x43')])return _0x11f3a3(_0x6f1b('0xec'));_0x4a4570[_0x6f1b('0xed')][_0x6f1b('0x28')](this,_0x317248);};_0x4a4570['getCartInfoByUrl']=function(_0x56affe,_0x262822){_0x6f1b('0x2')!=typeof _0x262822?window[_0x6f1b('0x58')][_0x6f1b('0xee')]=_0x262822:window['_QuatroDigital_DropDown'][_0x6f1b('0xee')]&&(_0x262822=window[_0x6f1b('0x58')][_0x6f1b('0xee')]);setTimeout(function(){window[_0x6f1b('0x58')][_0x6f1b('0xee')]=void 0x0;},_0x30f026[_0x6f1b('0xef')]);_0x59aa43(_0x6f1b('0xf0'))[_0x6f1b('0x4c')](_0x6f1b('0xf1'));if(_0x30f026[_0x6f1b('0x57')]){var _0x43187b=function(_0x5b7aa2){window[_0x6f1b('0x58')][_0x6f1b('0x27')]=_0x5b7aa2;_0x3c6c39(_0x5b7aa2,_0x262822);_0x6f1b('0x2')!==typeof window[_0x6f1b('0xf2')]&&_0x6f1b('0x8')===typeof window[_0x6f1b('0xf2')][_0x6f1b('0xf3')]&&window[_0x6f1b('0xf2')][_0x6f1b('0xf3')][_0x6f1b('0x28')](this);_0x59aa43(_0x6f1b('0xf0'))[_0x6f1b('0x4a')](_0x6f1b('0xf1'));};'undefined'!==typeof window[_0x6f1b('0x58')][_0x6f1b('0x27')]?(_0x43187b(window[_0x6f1b('0x58')]['getOrderForm']),'function'===typeof _0x56affe&&_0x56affe(window[_0x6f1b('0x58')][_0x6f1b('0x27')])):_0x59aa43[_0x6f1b('0xf4')]([_0x6f1b('0x43'),_0x6f1b('0x3b'),_0x6f1b('0x5c')],{'done':function(_0x301980){_0x43187b[_0x6f1b('0x28')](this,_0x301980);_0x6f1b('0x8')===typeof _0x56affe&&_0x56affe(_0x301980);},'fail':function(_0x276d02){_0x11f3a3([_0x6f1b('0xf5'),_0x276d02]);}});}else alert(_0x6f1b('0xf6'));};_0x4a4570[_0x6f1b('0xf7')]=function(){var _0x2f2f3b=_0x59aa43(_0x6f1b('0xf0'));_0x2f2f3b['find']('.qd-ddc-prodRow')[_0x6f1b('0x6')]?_0x2f2f3b[_0x6f1b('0x4c')](_0x6f1b('0xf8')):_0x2f2f3b[_0x6f1b('0x4a')]('qd-ddc-noItems');};_0x4a4570[_0x6f1b('0xed')]=function(_0x3a328e){var _0x43187b=_0x59aa43(_0x6f1b('0xf9'));_0x43187b[_0x6f1b('0xfa')]();_0x43187b[_0x6f1b('0x37')](function(){var _0x43187b=_0x59aa43(this),_0x3dfd66,_0x3e806b,_0x51c22a=_0x59aa43(''),_0x5ee662;for(_0x5ee662 in window[_0x6f1b('0x58')][_0x6f1b('0x27')][_0x6f1b('0x43')])if(_0x6f1b('0x16')===typeof window['_QuatroDigital_DropDown']['getOrderForm'][_0x6f1b('0x43')][_0x5ee662]){var _0x5c4e9c=window['_QuatroDigital_DropDown'][_0x6f1b('0x27')][_0x6f1b('0x43')][_0x5ee662];var _0x46a957=_0x5c4e9c[_0x6f1b('0xfb')]['replace'](/^\/|\/$/g,'')[_0x6f1b('0x9b')]('/');var _0x2839d6=_0x59aa43('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0x2839d6[_0x6f1b('0x35')]({'data-sku':_0x5c4e9c['id'],'data-sku-index':_0x5ee662,'data-qd-departament':_0x46a957[0x0],'data-qd-category':_0x46a957[_0x46a957[_0x6f1b('0x6')]-0x1]});_0x2839d6[_0x6f1b('0x4a')]('qd-ddc-'+_0x5c4e9c[_0x6f1b('0xfc')]);_0x2839d6['find'](_0x6f1b('0xfd'))[_0x6f1b('0x82')](_0x30f026['skuName'](_0x5c4e9c));_0x2839d6[_0x6f1b('0x51')](_0x6f1b('0xfe'))[_0x6f1b('0x82')](isNaN(_0x5c4e9c[_0x6f1b('0xff')])?_0x5c4e9c[_0x6f1b('0xff')]:0x0==_0x5c4e9c['sellingPrice']?_0x6f1b('0x100'):(_0x59aa43('meta[name=currency]')[_0x6f1b('0x35')](_0x6f1b('0x36'))||'R$')+'\x20'+qd_number_format(_0x5c4e9c[_0x6f1b('0xff')]/0x64,0x2,',','.'));_0x2839d6[_0x6f1b('0x51')](_0x6f1b('0x101'))['attr']({'data-sku':_0x5c4e9c['id'],'data-sku-index':_0x5ee662})[_0x6f1b('0x102')](_0x5c4e9c[_0x6f1b('0x103')]);_0x2839d6[_0x6f1b('0x51')](_0x6f1b('0x104'))['attr']({'data-sku':_0x5c4e9c['id'],'data-sku-index':_0x5ee662});_0x4a4570[_0x6f1b('0x105')](_0x5c4e9c['id'],_0x2839d6[_0x6f1b('0x51')](_0x6f1b('0x106')),_0x5c4e9c[_0x6f1b('0x107')]);_0x2839d6[_0x6f1b('0x51')]('.qd-ddc-quantityMore,.qd-ddc-quantityMinus')[_0x6f1b('0x35')]({'data-sku':_0x5c4e9c['id'],'data-sku-index':_0x5ee662});_0x2839d6[_0x6f1b('0x108')](_0x43187b);_0x51c22a=_0x51c22a[_0x6f1b('0x31')](_0x2839d6);}try{var _0x56fdb3=_0x43187b[_0x6f1b('0x23')](_0x6f1b('0xf0'))['find'](_0x6f1b('0xd4'));_0x56fdb3[_0x6f1b('0x6')]&&''==_0x56fdb3['val']()&&window[_0x6f1b('0x58')][_0x6f1b('0x27')]['shippingData'][_0x6f1b('0x109')]&&_0x56fdb3[_0x6f1b('0x102')](window[_0x6f1b('0x58')]['getOrderForm'][_0x6f1b('0x5c')][_0x6f1b('0x109')]['postalCode']);}catch(_0x332e1a){_0x11f3a3(_0x6f1b('0x10a')+_0x332e1a[_0x6f1b('0x22')],_0x6f1b('0x6a'));}_0x4a4570[_0x6f1b('0x10b')](_0x43187b);_0x4a4570[_0x6f1b('0xf7')]();_0x3a328e&&_0x3a328e[_0x6f1b('0x10c')]&&function(){_0x3e806b=_0x51c22a['filter'](_0x6f1b('0x10d')+_0x3a328e[_0x6f1b('0x10c')]+'\x27]');_0x3e806b[_0x6f1b('0x6')]&&(_0x3dfd66=0x0,_0x51c22a[_0x6f1b('0x37')](function(){var _0x3a328e=_0x59aa43(this);if(_0x3a328e['is'](_0x3e806b))return!0x1;_0x3dfd66+=_0x3a328e[_0x6f1b('0x10e')]();}),_0x4a4570[_0x6f1b('0xd1')](void 0x0,void 0x0,_0x3dfd66,_0x43187b[_0x6f1b('0x31')](_0x43187b[_0x6f1b('0xa4')]())),_0x51c22a[_0x6f1b('0x4c')](_0x6f1b('0x10f')),function(_0x1b7828){_0x1b7828[_0x6f1b('0x4a')](_0x6f1b('0x110'));_0x1b7828['addClass'](_0x6f1b('0x10f'));setTimeout(function(){_0x1b7828[_0x6f1b('0x4c')]('qd-ddc-lastAdded');},_0x30f026[_0x6f1b('0xef')]);}(_0x3e806b));}();});(function(){_QuatroDigital_DropDown['getOrderForm'][_0x6f1b('0x43')][_0x6f1b('0x6')]?(_0x59aa43(_0x6f1b('0x6e'))[_0x6f1b('0x4c')](_0x6f1b('0x111'))[_0x6f1b('0x4a')](_0x6f1b('0x112')),setTimeout(function(){_0x59aa43(_0x6f1b('0x6e'))[_0x6f1b('0x4c')]('qd-ddc-product-add-time');},_0x30f026[_0x6f1b('0xef')])):_0x59aa43(_0x6f1b('0x6e'))[_0x6f1b('0x4c')](_0x6f1b('0x113'))[_0x6f1b('0x4a')](_0x6f1b('0x111'));}());_0x6f1b('0x8')===typeof _0x30f026['callbackProductsList']?_0x30f026[_0x6f1b('0x114')][_0x6f1b('0x28')](this):_0x11f3a3(_0x6f1b('0x115'));};_0x4a4570[_0x6f1b('0x105')]=function(_0x46730c,_0x5cc383,_0x5236d8){function _0x20426b(){_0x5cc383[_0x6f1b('0x4c')](_0x6f1b('0x116'))['load'](function(){_0x59aa43(this)[_0x6f1b('0x4a')]('qd-loaded');})[_0x6f1b('0x35')]('src',_0x5236d8);}_0x5236d8?_0x20426b():isNaN(_0x46730c)?_0x11f3a3(_0x6f1b('0x117'),_0x6f1b('0x2b')):alert(_0x6f1b('0x118'));};_0x4a4570[_0x6f1b('0x10b')]=function(_0x3dcd9b){var _0x2c2f7d=function(_0x5ade8b,_0x7be0d6){var _0x43187b=_0x59aa43(_0x5ade8b);var _0x29e85d=_0x43187b[_0x6f1b('0x35')](_0x6f1b('0x119'));var _0x3dfd66=_0x43187b[_0x6f1b('0x35')](_0x6f1b('0x11a'));if(_0x29e85d){var _0x2bb8e1=parseInt(_0x43187b[_0x6f1b('0x102')]())||0x1;_0x4a4570[_0x6f1b('0x11b')]([_0x29e85d,_0x3dfd66],_0x2bb8e1,_0x2bb8e1+0x1,function(_0x470ece){_0x43187b[_0x6f1b('0x102')](_0x470ece);_0x6f1b('0x8')===typeof _0x7be0d6&&_0x7be0d6();});}};var _0x43187b=function(_0x1439c6,_0x43ce42){var _0x43187b=_0x59aa43(_0x1439c6);var _0x82208f=_0x43187b['attr'](_0x6f1b('0x119'));var _0x3dfd66=_0x43187b['attr'](_0x6f1b('0x11a'));if(_0x82208f){var _0x5cd21e=parseInt(_0x43187b['val']())||0x2;_0x4a4570[_0x6f1b('0x11b')]([_0x82208f,_0x3dfd66],_0x5cd21e,_0x5cd21e-0x1,function(_0x4ee59a){_0x43187b[_0x6f1b('0x102')](_0x4ee59a);_0x6f1b('0x8')===typeof _0x43ce42&&_0x43ce42();});}};var _0xfa9864=function(_0x44e3a4,_0x2458d0){var _0x43187b=_0x59aa43(_0x44e3a4);var _0x38f9f9=_0x43187b['attr'](_0x6f1b('0x119'));var _0x3dfd66=_0x43187b[_0x6f1b('0x35')](_0x6f1b('0x11a'));if(_0x38f9f9){var _0x4ff2c1=parseInt(_0x43187b['val']())||0x1;_0x4a4570[_0x6f1b('0x11b')]([_0x38f9f9,_0x3dfd66],0x1,_0x4ff2c1,function(_0x23ba5b){_0x43187b[_0x6f1b('0x102')](_0x23ba5b);_0x6f1b('0x8')===typeof _0x2458d0&&_0x2458d0();});}};var _0x3dfd66=_0x3dcd9b[_0x6f1b('0x51')](_0x6f1b('0x11c'));_0x3dfd66[_0x6f1b('0x4a')]('qd_on')[_0x6f1b('0x37')](function(){var _0x3dcd9b=_0x59aa43(this);_0x3dcd9b['find'](_0x6f1b('0x11d'))['on'](_0x6f1b('0x11e'),function(_0xcfb105){_0xcfb105[_0x6f1b('0x79')]();_0x3dfd66[_0x6f1b('0x4a')](_0x6f1b('0x11f'));_0x2c2f7d(_0x3dcd9b['find']('.qd-ddc-quantity'),function(){_0x3dfd66['removeClass'](_0x6f1b('0x11f'));});});_0x3dcd9b[_0x6f1b('0x51')](_0x6f1b('0x120'))['on'](_0x6f1b('0x121'),function(_0x1aa0d){_0x1aa0d[_0x6f1b('0x79')]();_0x3dfd66['addClass'](_0x6f1b('0x11f'));_0x43187b(_0x3dcd9b[_0x6f1b('0x51')](_0x6f1b('0x101')),function(){_0x3dfd66['removeClass'](_0x6f1b('0x11f'));});});_0x3dcd9b['find'](_0x6f1b('0x101'))['on'](_0x6f1b('0x122'),function(){_0x3dfd66['addClass'](_0x6f1b('0x11f'));_0xfa9864(this,function(){_0x3dfd66['removeClass'](_0x6f1b('0x11f'));});});_0x3dcd9b[_0x6f1b('0x51')](_0x6f1b('0x101'))['on'](_0x6f1b('0x123'),function(_0xbe39de){0xd==_0xbe39de[_0x6f1b('0xcd')]&&(_0x3dfd66['addClass'](_0x6f1b('0x11f')),_0xfa9864(this,function(){_0x3dfd66[_0x6f1b('0x4c')](_0x6f1b('0x11f'));}));});});_0x3dcd9b[_0x6f1b('0x51')]('.qd-ddc-prodRow')[_0x6f1b('0x37')](function(){var _0x3dcd9b=_0x59aa43(this);_0x3dcd9b[_0x6f1b('0x51')](_0x6f1b('0x104'))['on'](_0x6f1b('0x124'),function(){_0x3dcd9b[_0x6f1b('0x4a')]('qd-loading');_0x4a4570[_0x6f1b('0x125')](_0x59aa43(this),function(_0xd5049){_0xd5049?_0x3dcd9b[_0x6f1b('0x126')](!0x0)[_0x6f1b('0x127')](function(){_0x3dcd9b[_0x6f1b('0x128')]();_0x4a4570[_0x6f1b('0xf7')]();}):_0x3dcd9b[_0x6f1b('0x4c')](_0x6f1b('0x11f'));});return!0x1;});});};_0x4a4570[_0x6f1b('0x129')]=function(_0x3215d5){var _0x2bd1a4=_0x3215d5[_0x6f1b('0x102')](),_0x2bd1a4=_0x2bd1a4[_0x6f1b('0x0')](/[^0-9\-]/g,''),_0x2bd1a4=_0x2bd1a4[_0x6f1b('0x0')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x6f1b('0x12a')),_0x2bd1a4=_0x2bd1a4['replace'](/(.{9}).*/g,'$1');_0x3215d5['val'](_0x2bd1a4);0x9<=_0x2bd1a4[_0x6f1b('0x6')]&&(_0x3215d5[_0x6f1b('0x17')]('qdDdcLastPostalCode')!=_0x2bd1a4&&_0x39d06a[_0x6f1b('0x12b')]({'postalCode':_0x2bd1a4,'country':_0x6f1b('0x12c')})[_0x6f1b('0x1d')](function(_0x1db93c){window[_0x6f1b('0x58')][_0x6f1b('0x27')]=_0x1db93c;_0x4a4570[_0x6f1b('0x8c')]();})[_0x6f1b('0x1e')](function(_0x4179d5){_0x11f3a3([_0x6f1b('0x12d'),_0x4179d5]);updateCartData();}),_0x3215d5[_0x6f1b('0x17')](_0x6f1b('0x12e'),_0x2bd1a4));};_0x4a4570[_0x6f1b('0x11b')]=function(_0x2c26f3,_0x58ca17,_0x5c633d,_0x86742b){function _0x35194b(_0x35b2f1){_0x35b2f1=_0x6f1b('0x12f')!==typeof _0x35b2f1?!0x1:_0x35b2f1;_0x4a4570['getCartInfoByUrl']();window[_0x6f1b('0x58')][_0x6f1b('0x8d')]=!0x1;_0x4a4570['cartIsEmpty']();_0x6f1b('0x2')!==typeof window[_0x6f1b('0xf2')]&&_0x6f1b('0x8')===typeof window['_QuatroDigital_AmountProduct'][_0x6f1b('0xf3')]&&window[_0x6f1b('0xf2')][_0x6f1b('0xf3')][_0x6f1b('0x28')](this);_0x6f1b('0x8')===typeof adminCart&&adminCart();_0x59aa43['fn'][_0x6f1b('0x25')](!0x0,void 0x0,_0x35b2f1);_0x6f1b('0x8')===typeof _0x86742b&&_0x86742b(_0x58ca17);}_0x5c633d=_0x5c633d||0x1;if(0x1>_0x5c633d)return _0x58ca17;if(_0x30f026[_0x6f1b('0x57')]){if('undefined'===typeof window['_QuatroDigital_DropDown'][_0x6f1b('0x27')][_0x6f1b('0x43')][_0x2c26f3[0x1]])return _0x11f3a3(_0x6f1b('0x130')+_0x2c26f3[0x1]+']'),_0x58ca17;window[_0x6f1b('0x58')]['getOrderForm'][_0x6f1b('0x43')][_0x2c26f3[0x1]]['quantity']=_0x5c633d;window['_QuatroDigital_DropDown']['getOrderForm'][_0x6f1b('0x43')][_0x2c26f3[0x1]][_0x6f1b('0x131')]=_0x2c26f3[0x1];_0x39d06a[_0x6f1b('0x132')]([window[_0x6f1b('0x58')][_0x6f1b('0x27')]['items'][_0x2c26f3[0x1]]],['items',_0x6f1b('0x3b'),_0x6f1b('0x5c')])[_0x6f1b('0x1d')](function(_0x486cd8){window[_0x6f1b('0x58')][_0x6f1b('0x27')]=_0x486cd8;_0x35194b(!0x0);})[_0x6f1b('0x1e')](function(_0x4a9240){_0x11f3a3([_0x6f1b('0x133'),_0x4a9240]);_0x35194b();});}else _0x11f3a3(_0x6f1b('0x134'));};_0x4a4570[_0x6f1b('0x125')]=function(_0x54b965,_0x810349){function _0x17184f(_0x5acdc1){_0x5acdc1=_0x6f1b('0x12f')!==typeof _0x5acdc1?!0x1:_0x5acdc1;_0x6f1b('0x2')!==typeof window['_QuatroDigital_AmountProduct']&&_0x6f1b('0x8')===typeof window['_QuatroDigital_AmountProduct'][_0x6f1b('0xf3')]&&window[_0x6f1b('0xf2')][_0x6f1b('0xf3')]['call'](this);'function'===typeof adminCart&&adminCart();_0x59aa43['fn'][_0x6f1b('0x25')](!0x0,void 0x0,_0x5acdc1);_0x6f1b('0x8')===typeof _0x810349&&_0x810349(_0x3dfd66);}var _0x3dfd66=!0x1,_0x2ffd03=_0x59aa43(_0x54b965)['attr'](_0x6f1b('0x11a'));if(_0x30f026[_0x6f1b('0x57')]){if(_0x6f1b('0x2')===typeof window[_0x6f1b('0x58')][_0x6f1b('0x27')][_0x6f1b('0x43')][_0x2ffd03])return _0x11f3a3(_0x6f1b('0x130')+_0x2ffd03+']'),_0x3dfd66;window[_0x6f1b('0x58')][_0x6f1b('0x27')][_0x6f1b('0x43')][_0x2ffd03]['index']=_0x2ffd03;_0x39d06a['removeItems']([window[_0x6f1b('0x58')][_0x6f1b('0x27')][_0x6f1b('0x43')][_0x2ffd03]],['items',_0x6f1b('0x3b'),'shippingData'])[_0x6f1b('0x1d')](function(_0x1d136e){_0x3dfd66=!0x0;window['_QuatroDigital_DropDown']['getOrderForm']=_0x1d136e;_0x3c6c39(_0x1d136e);_0x17184f(!0x0);})['fail'](function(_0x16636b){_0x11f3a3([_0x6f1b('0x135'),_0x16636b]);_0x17184f();});}else alert(_0x6f1b('0x136'));};_0x4a4570[_0x6f1b('0xd1')]=function(_0x73e57b,_0x88a6f3,_0x4eaf59,_0x1d60f2){_0x1d60f2=_0x1d60f2||_0x59aa43(_0x6f1b('0x137'));_0x73e57b=_0x73e57b||'+';_0x88a6f3=_0x88a6f3||0.9*_0x1d60f2[_0x6f1b('0x138')]();_0x1d60f2[_0x6f1b('0x126')](!0x0,!0x0)['animate']({'scrollTop':isNaN(_0x4eaf59)?_0x73e57b+'='+_0x88a6f3+'px':_0x4eaf59});};_0x30f026[_0x6f1b('0xd5')]||(_0x4a4570[_0x6f1b('0x8c')](),_0x59aa43['fn'][_0x6f1b('0x25')](!0x0));_0x59aa43(window)['on'](_0x6f1b('0x139'),function(){try{window[_0x6f1b('0x58')][_0x6f1b('0x27')]=void 0x0,_0x4a4570['getCartInfoByUrl']();}catch(_0x1fc157){_0x11f3a3(_0x6f1b('0x13a')+_0x1fc157[_0x6f1b('0x22')],'avisso');}});_0x6f1b('0x8')===typeof _0x30f026[_0x6f1b('0x5e')]?_0x30f026['callback']['call'](this):_0x11f3a3(_0x6f1b('0xa7'));};_0x59aa43['fn'][_0x6f1b('0xb1')]=function(_0x4f2836){var _0x271165=_0x59aa43(this);_0x271165['fn']=new _0x59aa43[(_0x6f1b('0xb1'))](this,_0x4f2836);return _0x271165;};}catch(_0x42aa8b){_0x6f1b('0x2')!==typeof console&&_0x6f1b('0x8')===typeof console[_0x6f1b('0x13')]&&console[_0x6f1b('0x13')](_0x6f1b('0x64'),_0x42aa8b);}}(this));(function(_0x2b6b6a){try{var _0x19eb57=jQuery;window[_0x6f1b('0xf2')]=window['_QuatroDigital_AmountProduct']||{};window[_0x6f1b('0xf2')][_0x6f1b('0x43')]={};window[_0x6f1b('0xf2')][_0x6f1b('0x13b')]=!0x1;window[_0x6f1b('0xf2')][_0x6f1b('0x13c')]=!0x1;window['_QuatroDigital_AmountProduct']['quickViewUpdate']=!0x1;var _0x37ee7d=function(){if(window[_0x6f1b('0xf2')]['allowRecalculate']){var _0x3abe49=!0x1;var _0x2b6b6a={};window['_QuatroDigital_AmountProduct'][_0x6f1b('0x43')]={};for(_0x5b18cc in window['_QuatroDigital_DropDown'][_0x6f1b('0x27')][_0x6f1b('0x43')])if('object'===typeof window['_QuatroDigital_DropDown']['getOrderForm'][_0x6f1b('0x43')][_0x5b18cc]){var _0x8cf0fa=window[_0x6f1b('0x58')][_0x6f1b('0x27')]['items'][_0x5b18cc];'undefined'!==typeof _0x8cf0fa[_0x6f1b('0x13d')]&&null!==_0x8cf0fa[_0x6f1b('0x13d')]&&''!==_0x8cf0fa[_0x6f1b('0x13d')]&&(window[_0x6f1b('0xf2')]['items'][_0x6f1b('0x13e')+_0x8cf0fa['productId']]=window[_0x6f1b('0xf2')][_0x6f1b('0x43')][_0x6f1b('0x13e')+_0x8cf0fa[_0x6f1b('0x13d')]]||{},window[_0x6f1b('0xf2')]['items']['prod_'+_0x8cf0fa['productId']][_0x6f1b('0x13f')]=_0x8cf0fa[_0x6f1b('0x13d')],_0x2b6b6a[_0x6f1b('0x13e')+_0x8cf0fa[_0x6f1b('0x13d')]]||(window[_0x6f1b('0xf2')][_0x6f1b('0x43')]['prod_'+_0x8cf0fa[_0x6f1b('0x13d')]][_0x6f1b('0x41')]=0x0),window[_0x6f1b('0xf2')][_0x6f1b('0x43')]['prod_'+_0x8cf0fa['productId']]['qtt']+=_0x8cf0fa[_0x6f1b('0x103')],_0x3abe49=!0x0,_0x2b6b6a[_0x6f1b('0x13e')+_0x8cf0fa[_0x6f1b('0x13d')]]=!0x0);}var _0x5b18cc=_0x3abe49;}else _0x5b18cc=void 0x0;window['_QuatroDigital_AmountProduct'][_0x6f1b('0x13b')]&&(_0x19eb57(_0x6f1b('0x140'))['remove'](),_0x19eb57('.qd-bap-item-added')[_0x6f1b('0x4c')](_0x6f1b('0x141')));for(var _0x1cba52 in window[_0x6f1b('0xf2')][_0x6f1b('0x43')]){_0x8cf0fa=window['_QuatroDigital_AmountProduct'][_0x6f1b('0x43')][_0x1cba52];if('object'!==typeof _0x8cf0fa)return;_0x2b6b6a=_0x19eb57('input.qd-productId[value='+_0x8cf0fa[_0x6f1b('0x13f')]+']')['getParent']('li');if(window[_0x6f1b('0xf2')][_0x6f1b('0x13b')]||!_0x2b6b6a[_0x6f1b('0x51')]('.qd-bap-wrapper')[_0x6f1b('0x6')])_0x3abe49=_0x19eb57('<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>'),_0x3abe49['find']('.qd-bap-qtt')[_0x6f1b('0x4f')](_0x8cf0fa[_0x6f1b('0x41')]),_0x8cf0fa=_0x2b6b6a[_0x6f1b('0x51')](_0x6f1b('0x142')),_0x8cf0fa[_0x6f1b('0x6')]?_0x8cf0fa[_0x6f1b('0x143')](_0x3abe49)[_0x6f1b('0x4a')](_0x6f1b('0x141')):_0x2b6b6a['prepend'](_0x3abe49);}_0x5b18cc&&(window[_0x6f1b('0xf2')]['allowRecalculate']=!0x1);};window[_0x6f1b('0xf2')][_0x6f1b('0xf3')]=function(){window[_0x6f1b('0xf2')][_0x6f1b('0x13b')]=!0x0;_0x37ee7d[_0x6f1b('0x28')](this);};_0x19eb57(document)[_0x6f1b('0xaf')](function(){_0x37ee7d[_0x6f1b('0x28')](this);});}catch(_0x428a1e){_0x6f1b('0x2')!==typeof console&&_0x6f1b('0x8')===typeof console[_0x6f1b('0x13')]&&console['error'](_0x6f1b('0x64'),_0x428a1e);}}(this));(function(){try{var _0x177c08=jQuery,_0x46afa5,_0xab7924={'selector':_0x6f1b('0x144'),'dropDown':{},'buyButton':{}};_0x177c08['QD_smartCart']=function(_0x3250b8){var _0x4ebaba={};_0x46afa5=_0x177c08['extend'](!0x0,{},_0xab7924,_0x3250b8);_0x3250b8=_0x177c08(_0x46afa5[_0x6f1b('0x145')])[_0x6f1b('0xb1')](_0x46afa5[_0x6f1b('0x146')]);_0x4ebaba[_0x6f1b('0x7b')]=_0x6f1b('0x2')!==typeof _0x46afa5[_0x6f1b('0x146')][_0x6f1b('0xd5')]&&!0x1===_0x46afa5['dropDown']['updateOnlyHover']?_0x177c08(_0x46afa5['selector'])['QD_buyButton'](_0x3250b8['fn'],_0x46afa5[_0x6f1b('0x7b')]):_0x177c08(_0x46afa5['selector'])['QD_buyButton'](_0x46afa5[_0x6f1b('0x7b')]);_0x4ebaba[_0x6f1b('0x146')]=_0x3250b8;return _0x4ebaba;};_0x177c08['fn']['smartCart']=function(){_0x6f1b('0x16')===typeof console&&_0x6f1b('0x8')===typeof console[_0x6f1b('0x2e')]&&console[_0x6f1b('0x2e')](_0x6f1b('0x147'));};_0x177c08['smartCart']=_0x177c08['fn'][_0x6f1b('0x148')];}catch(_0x4677cb){_0x6f1b('0x2')!==typeof console&&_0x6f1b('0x8')===typeof console['error']&&console[_0x6f1b('0x13')](_0x6f1b('0x64'),_0x4677cb);}}());

/* Quatro Digital - Smart Stock Available */
var _0xe3c8=['call','error','complete','parameters','callbackFns','boolean','successPopulated','errorPopulated','completePopulated','object','clearQueueDelay','jqXHR','undefined','ajax','readyState','textStatus','errorThrown','version','QD_smartStockAvailable','Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available','unshift','alerta','aviso','info','apply','warn','length','addClass','qd-ssa-sku-no-selected','qd-ssa-skus-','skus','split','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','message','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','off','vtex.sku.selected.QD','qd-ssa-sku-prod-unavailable','hide','removeClass','qd-ssa-sku-selected','SkuSellersInformation','AvailableQuantity','attr','data-qd-ssa-qtt','each','[data-qd-ssa-text]','qd-ssa-hide','qd-ssa-show','[data-qd-ssa-text=\x22','[data-qd-ssa-text=\x22default\x22]','html','trigger','QuatroDigital.ssa.prodUnavailable','vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','join','ite','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','/produto/sku/','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','initialSkuSelected','QuatroDigital.ssa.skuSelected','prod','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','unavailable','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','available','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','function','qdAjax','qdAjaxQueue','extend','url','opts','success'];(function(_0x591e16,_0x5aefc1){var _0x543b35=function(_0x81e3be){while(--_0x81e3be){_0x591e16['push'](_0x591e16['shift']());}};_0x543b35(++_0x5aefc1);}(_0xe3c8,0x145));var _0x8e3c=function(_0x5d8453,_0x20b356){_0x5d8453=_0x5d8453-0x0;var _0x1132e7=_0xe3c8[_0x5d8453];return _0x1132e7;};(function(_0x5e9d2d){if(_0x8e3c('0x0')!==typeof _0x5e9d2d[_0x8e3c('0x1')]){var _0x362c4d={};_0x5e9d2d[_0x8e3c('0x2')]=_0x362c4d;_0x5e9d2d['qdAjax']=function(_0x4d7f53){var _0x4a1c67,_0x5b3836;_0x4a1c67=_0x5e9d2d[_0x8e3c('0x3')]({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x4d7f53);_0x5b3836=escape(encodeURIComponent(_0x4a1c67[_0x8e3c('0x4')]));_0x362c4d[_0x5b3836]=_0x362c4d[_0x5b3836]||{};_0x362c4d[_0x5b3836][_0x8e3c('0x5')]=_0x362c4d[_0x5b3836][_0x8e3c('0x5')]||[];_0x362c4d[_0x5b3836][_0x8e3c('0x5')]['push']({'success':function(_0x3c6d0b,_0x29cdba,_0x3d3a97){_0x4a1c67[_0x8e3c('0x6')][_0x8e3c('0x7')](this,_0x3c6d0b,_0x29cdba,_0x3d3a97);},'error':function(_0x54f721,_0x5ee141,_0x2f1410){_0x4a1c67[_0x8e3c('0x8')][_0x8e3c('0x7')](this,_0x54f721,_0x5ee141,_0x2f1410);},'complete':function(_0x12f94a,_0x219ad9){_0x4a1c67[_0x8e3c('0x9')][_0x8e3c('0x7')](this,_0x12f94a,_0x219ad9);}});_0x362c4d[_0x5b3836]['parameters']=_0x362c4d[_0x5b3836][_0x8e3c('0xa')]||{'success':{},'error':{},'complete':{}};_0x362c4d[_0x5b3836]['callbackFns']=_0x362c4d[_0x5b3836][_0x8e3c('0xb')]||{};_0x362c4d[_0x5b3836][_0x8e3c('0xb')]['successPopulated']=_0x8e3c('0xc')===typeof _0x362c4d[_0x5b3836]['callbackFns']['successPopulated']?_0x362c4d[_0x5b3836][_0x8e3c('0xb')][_0x8e3c('0xd')]:!0x1;_0x362c4d[_0x5b3836][_0x8e3c('0xb')]['errorPopulated']=_0x8e3c('0xc')===typeof _0x362c4d[_0x5b3836][_0x8e3c('0xb')][_0x8e3c('0xe')]?_0x362c4d[_0x5b3836][_0x8e3c('0xb')]['errorPopulated']:!0x1;_0x362c4d[_0x5b3836]['callbackFns'][_0x8e3c('0xf')]='boolean'===typeof _0x362c4d[_0x5b3836][_0x8e3c('0xb')][_0x8e3c('0xf')]?_0x362c4d[_0x5b3836][_0x8e3c('0xb')][_0x8e3c('0xf')]:!0x1;_0x4d7f53=_0x5e9d2d['extend']({},_0x4a1c67,{'success':function(_0x474bae,_0x8ff2bc,_0x141832){_0x362c4d[_0x5b3836][_0x8e3c('0xa')]['success']={'data':_0x474bae,'textStatus':_0x8ff2bc,'jqXHR':_0x141832};_0x362c4d[_0x5b3836][_0x8e3c('0xb')][_0x8e3c('0xd')]=!0x0;for(var _0x5e9d2d in _0x362c4d[_0x5b3836][_0x8e3c('0x5')])_0x8e3c('0x10')===typeof _0x362c4d[_0x5b3836][_0x8e3c('0x5')][_0x5e9d2d]&&(_0x362c4d[_0x5b3836]['opts'][_0x5e9d2d]['success'][_0x8e3c('0x7')](this,_0x474bae,_0x8ff2bc,_0x141832),_0x362c4d[_0x5b3836][_0x8e3c('0x5')][_0x5e9d2d]['success']=function(){});},'error':function(_0x2dbc18,_0x17b50c,_0x14f309){_0x362c4d[_0x5b3836]['parameters']['error']={'errorThrown':_0x14f309,'textStatus':_0x17b50c,'jqXHR':_0x2dbc18};_0x362c4d[_0x5b3836][_0x8e3c('0xb')][_0x8e3c('0xe')]=!0x0;for(var _0x4d7f53 in _0x362c4d[_0x5b3836]['opts'])'object'===typeof _0x362c4d[_0x5b3836][_0x8e3c('0x5')][_0x4d7f53]&&(_0x362c4d[_0x5b3836]['opts'][_0x4d7f53][_0x8e3c('0x8')][_0x8e3c('0x7')](this,_0x2dbc18,_0x17b50c,_0x14f309),_0x362c4d[_0x5b3836][_0x8e3c('0x5')][_0x4d7f53][_0x8e3c('0x8')]=function(){});},'complete':function(_0x230389,_0x1f7c6a){_0x362c4d[_0x5b3836]['parameters'][_0x8e3c('0x9')]={'textStatus':_0x1f7c6a,'jqXHR':_0x230389};_0x362c4d[_0x5b3836]['callbackFns']['completePopulated']=!0x0;for(var _0x23a4f0 in _0x362c4d[_0x5b3836][_0x8e3c('0x5')])_0x8e3c('0x10')===typeof _0x362c4d[_0x5b3836]['opts'][_0x23a4f0]&&(_0x362c4d[_0x5b3836][_0x8e3c('0x5')][_0x23a4f0][_0x8e3c('0x9')][_0x8e3c('0x7')](this,_0x230389,_0x1f7c6a),_0x362c4d[_0x5b3836][_0x8e3c('0x5')][_0x23a4f0]['complete']=function(){});isNaN(parseInt(_0x4a1c67[_0x8e3c('0x11')]))||setTimeout(function(){_0x362c4d[_0x5b3836][_0x8e3c('0x12')]=void 0x0;_0x362c4d[_0x5b3836]['opts']=void 0x0;_0x362c4d[_0x5b3836][_0x8e3c('0xa')]=void 0x0;_0x362c4d[_0x5b3836][_0x8e3c('0xb')]=void 0x0;},_0x4a1c67[_0x8e3c('0x11')]);}});_0x8e3c('0x13')===typeof _0x362c4d[_0x5b3836][_0x8e3c('0x12')]?_0x362c4d[_0x5b3836][_0x8e3c('0x12')]=_0x5e9d2d[_0x8e3c('0x14')](_0x4d7f53):_0x362c4d[_0x5b3836][_0x8e3c('0x12')]&&_0x362c4d[_0x5b3836][_0x8e3c('0x12')][_0x8e3c('0x15')]&&0x4==_0x362c4d[_0x5b3836][_0x8e3c('0x12')][_0x8e3c('0x15')]&&(_0x362c4d[_0x5b3836][_0x8e3c('0xb')][_0x8e3c('0xd')]&&_0x4d7f53[_0x8e3c('0x6')](_0x362c4d[_0x5b3836][_0x8e3c('0xa')][_0x8e3c('0x6')]['data'],_0x362c4d[_0x5b3836][_0x8e3c('0xa')][_0x8e3c('0x6')][_0x8e3c('0x16')],_0x362c4d[_0x5b3836]['parameters'][_0x8e3c('0x6')]['jqXHR']),_0x362c4d[_0x5b3836][_0x8e3c('0xb')][_0x8e3c('0xe')]&&_0x4d7f53['error'](_0x362c4d[_0x5b3836][_0x8e3c('0xa')][_0x8e3c('0x8')][_0x8e3c('0x12')],_0x362c4d[_0x5b3836][_0x8e3c('0xa')][_0x8e3c('0x8')][_0x8e3c('0x16')],_0x362c4d[_0x5b3836][_0x8e3c('0xa')]['error'][_0x8e3c('0x17')]),_0x362c4d[_0x5b3836][_0x8e3c('0xb')]['completePopulated']&&_0x4d7f53[_0x8e3c('0x9')](_0x362c4d[_0x5b3836][_0x8e3c('0xa')][_0x8e3c('0x9')][_0x8e3c('0x12')],_0x362c4d[_0x5b3836]['parameters']['complete']['textStatus']));};_0x5e9d2d['qdAjax'][_0x8e3c('0x18')]='2.1';}}(jQuery));(function(_0x41c174){'use strict';var _0x2ab74a=jQuery;if(typeof _0x2ab74a['fn'][_0x8e3c('0x19')]===_0x8e3c('0x0'))return;var _0x2c5dbd=_0x8e3c('0x1a');var _0x47e04d=function(_0x19edc9,_0x3f005f){if(_0x8e3c('0x10')===typeof console){var _0x415526;_0x8e3c('0x10')===typeof _0x19edc9?(_0x19edc9[_0x8e3c('0x1b')]('['+_0x2c5dbd+']\x0a'),_0x415526=_0x19edc9):_0x415526=['['+_0x2c5dbd+']\x0a'+_0x19edc9];'undefined'===typeof _0x3f005f||_0x8e3c('0x1c')!==_0x3f005f['toLowerCase']()&&_0x8e3c('0x1d')!==_0x3f005f['toLowerCase']()?_0x8e3c('0x13')!==typeof _0x3f005f&&_0x8e3c('0x1e')===_0x3f005f['toLowerCase']()?console[_0x8e3c('0x1e')][_0x8e3c('0x1f')](console,_0x415526):console['error'][_0x8e3c('0x1f')](console,_0x415526):console[_0x8e3c('0x20')][_0x8e3c('0x1f')](console,_0x415526);}};var _0xe49145={};var _0x28422c=function(_0x3c9840,_0x2b3647){if(!_0x3c9840[_0x8e3c('0x21')])return;_0x3c9840[_0x8e3c('0x22')]('qd-ssa-on');_0x3c9840[_0x8e3c('0x22')](_0x8e3c('0x23'));try{_0x3c9840['addClass'](_0x8e3c('0x24')+vtxctx[_0x8e3c('0x25')][_0x8e3c('0x26')](';')['length']);}catch(_0x3e4b47){_0x47e04d([_0x8e3c('0x27'),_0x3e4b47[_0x8e3c('0x28')]]);}_0x2ab74a(window)['on'](_0x8e3c('0x29'),function(_0x315672,_0x588811,_0x4596a6){try{_0x459eb3(_0x4596a6['sku'],function(_0xdba448){_0x4f05c9(_0xdba448);_0x3ea35b(_0xdba448);});}catch(_0x531096){_0x47e04d([_0x8e3c('0x2a'),_0x531096[_0x8e3c('0x28')]]);}});_0x2ab74a(window)[_0x8e3c('0x2b')](_0x8e3c('0x2c'));_0x2ab74a(window)['on']('QuatroDigital.ssa.prodUnavailable',function(){_0x3c9840[_0x8e3c('0x22')](_0x8e3c('0x2d'))[_0x8e3c('0x2e')]();});function _0x4f05c9(_0x11e6dc){try{_0x3c9840[_0x8e3c('0x2f')](_0x8e3c('0x23'))[_0x8e3c('0x22')](_0x8e3c('0x30'));var _0x521784=_0x11e6dc[0x0][_0x8e3c('0x31')][0x0][_0x8e3c('0x32')];_0x3c9840[_0x8e3c('0x33')](_0x8e3c('0x34'),_0x521784);_0x3c9840[_0x8e3c('0x35')](function(){var _0x1a9f3d=_0x2ab74a(this)['find'](_0x8e3c('0x36'));if(_0x521784<0x1)return _0x1a9f3d[_0x8e3c('0x2e')]()['addClass'](_0x8e3c('0x37'))[_0x8e3c('0x2f')](_0x8e3c('0x38'));var _0x37f197=_0x1a9f3d['filter'](_0x8e3c('0x39')+_0x521784+'\x22]');var _0x4fd369=_0x37f197[_0x8e3c('0x21')]?_0x37f197:_0x1a9f3d['filter'](_0x8e3c('0x3a'));_0x1a9f3d['hide']()[_0x8e3c('0x22')]('qd-ssa-hide')[_0x8e3c('0x2f')](_0x8e3c('0x38'));_0x4fd369['html'](_0x4fd369[_0x8e3c('0x3b')]()['replace']('#qtt',_0x521784));_0x4fd369['show']()['addClass'](_0x8e3c('0x38'))[_0x8e3c('0x2f')](_0x8e3c('0x37'));});}catch(_0xc8652c){_0x47e04d(['Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20',_0xc8652c[_0x8e3c('0x28')]]);}};function _0x3ea35b(_0x2a9a3c){if(vtxctx[_0x8e3c('0x25')][_0x8e3c('0x26')](';')['length']===0x1&&_0x2a9a3c[0x0]['SkuSellersInformation'][0x0]['AvailableQuantity']==0x0)_0x2ab74a(window)[_0x8e3c('0x3c')](_0x8e3c('0x3d'));};};var _0x11819d=function(_0x4c162f){var _0x21143e={'i':_0x8e3c('0x3e')};return function(_0x2ef82e){var _0xb93a75,_0x4dd1d4,_0x25cd92,_0x9b21bb;_0x4dd1d4=function(_0x320dca){return _0x320dca;};_0x25cd92=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2ef82e=_0x2ef82e['d'+_0x25cd92[0x10]+'c'+_0x25cd92[0x11]+'m'+_0x4dd1d4(_0x25cd92[0x1])+'n'+_0x25cd92[0xd]]['l'+_0x25cd92[0x12]+'c'+_0x25cd92[0x0]+'ti'+_0x4dd1d4('o')+'n'];_0xb93a75=function(_0x4b17a0){return escape(encodeURIComponent(_0x4b17a0[_0x8e3c('0x3f')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x4f4406){return String[_0x8e3c('0x40')](('Z'>=_0x4f4406?0x5a:0x7a)>=(_0x4f4406=_0x4f4406[_0x8e3c('0x41')](0x0)+0xd)?_0x4f4406:_0x4f4406-0x1a);})));};var _0x225a4d=_0xb93a75(_0x2ef82e[[_0x25cd92[0x9],_0x4dd1d4('o'),_0x25cd92[0xc],_0x25cd92[_0x4dd1d4(0xd)]][_0x8e3c('0x42')]('')]);_0xb93a75=_0xb93a75((window[['js',_0x4dd1d4('no'),'m',_0x25cd92[0x1],_0x25cd92[0x4]['toUpperCase'](),_0x8e3c('0x43')][_0x8e3c('0x42')]('')]||'---')+['.v',_0x25cd92[0xd],'e',_0x4dd1d4('x'),'co',_0x4dd1d4('mm'),_0x8e3c('0x44'),_0x25cd92[0x1],'.c',_0x4dd1d4('o'),'m.',_0x25cd92[0x13],'r'][_0x8e3c('0x42')](''));for(var _0x5c95b4 in _0x21143e){if(_0xb93a75===_0x5c95b4+_0x21143e[_0x5c95b4]||_0x225a4d===_0x5c95b4+_0x21143e[_0x5c95b4]){_0x9b21bb='tr'+_0x25cd92[0x11]+'e';break;}_0x9b21bb='f'+_0x25cd92[0x0]+'ls'+_0x4dd1d4(_0x25cd92[0x1])+'';}_0x4dd1d4=!0x1;-0x1<_0x2ef82e[[_0x25cd92[0xc],'e',_0x25cd92[0x0],'rc',_0x25cd92[0x9]][_0x8e3c('0x42')]('')][_0x8e3c('0x45')](_0x8e3c('0x46'))&&(_0x4dd1d4=!0x0);return[_0x9b21bb,_0x4dd1d4];}(_0x4c162f);}(window);if(!eval(_0x11819d[0x0]))return _0x11819d[0x1]?_0x47e04d(_0x8e3c('0x47')):!0x1;function _0x459eb3(_0x4b736a,_0x4ee910){_0x2ab74a[_0x8e3c('0x1')]({'url':_0x8e3c('0x48')+_0x4b736a,'clearQueueDelay':null,'success':_0x4ee910,'error':function(){_0x47e04d(_0x8e3c('0x49'));}});};_0x2ab74a['fn']['QD_smartStockAvailable']=function(_0x682167){var _0x29e6e9=_0x2ab74a(this);var _0xb457bb=_0x2ab74a['extend'](!![],{},_0xe49145,_0x682167);_0x29e6e9['qdPlugin']=new _0x28422c(_0x29e6e9,_0xb457bb);try{if(typeof _0x2ab74a['fn'][_0x8e3c('0x19')][_0x8e3c('0x4a')]===_0x8e3c('0x10'))_0x2ab74a(window)[_0x8e3c('0x3c')](_0x8e3c('0x4b'),[_0x2ab74a['fn'][_0x8e3c('0x19')][_0x8e3c('0x4a')][_0x8e3c('0x4c')],_0x2ab74a['fn'][_0x8e3c('0x19')][_0x8e3c('0x4a')]['sku']]);}catch(_0x51ae8d){_0x47e04d([_0x8e3c('0x4d'),_0x51ae8d[_0x8e3c('0x28')]]);}if(_0x2ab74a['fn']['QD_smartStockAvailable'][_0x8e3c('0x4e')])_0x2ab74a(window)[_0x8e3c('0x3c')]('QuatroDigital.ssa.prodUnavailable');return _0x29e6e9;};_0x2ab74a(window)['on'](_0x8e3c('0x2c'),function(_0x154035,_0x55c714,_0xfb4447){try{_0x2ab74a['fn'][_0x8e3c('0x19')][_0x8e3c('0x4a')]={'prod':_0x55c714,'sku':_0xfb4447};_0x2ab74a(this)[_0x8e3c('0x2b')](_0x154035);}catch(_0x2c5e7c){_0x47e04d([_0x8e3c('0x4f'),_0x2c5e7c[_0x8e3c('0x28')]]);}});_0x2ab74a(window)['on']('vtex.sku.selectable',function(_0x2d0ced,_0x214937,_0x132b2d){try{var _0x21a138=_0x132b2d[_0x8e3c('0x21')];var _0xa03c58=0x0;for(var _0x378c82=0x0;_0x378c82<_0x21a138;_0x378c82++){if(!_0x132b2d[_0x378c82][_0x8e3c('0x50')])_0xa03c58=_0xa03c58+0x1;else break;}if(_0x21a138<=_0xa03c58)_0x2ab74a['fn'][_0x8e3c('0x19')]['unavailable']=!![];_0x2ab74a(this)['off'](_0x2d0ced);}catch(_0xd42d99){_0x47e04d([_0x8e3c('0x51'),_0xd42d99[_0x8e3c('0x28')]]);}});_0x2ab74a(function(){_0x2ab74a(_0x8e3c('0x52'))[_0x8e3c('0x19')]();});}(window));

// -include ../qd-quatro-lib-plugins/Infinity Scroll Memory/QD_infinityScrollMemory.min.js
