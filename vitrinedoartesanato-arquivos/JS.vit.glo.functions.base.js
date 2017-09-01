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
			// Home.openModalVideoInstitutional();
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
		run: function () {
			$(window).on('skuSelectable.vtex', function() {
				$(function(){
					Product.applyCarouselThumb();
					Product.forceImageZoom();
				});
			});

			$(window).on('skuSelected.vtex', function() {
				$(function(){
					Product.applyCarouselThumb();
					Product.forceImageZoom();
				});
			});
			$(window).on('QuatroDigital.ssa.skuSelected', function() {
				$(function(){
					Product.applyCarouselThumb();
					Product.forceImageZoom();
				});
			});
		},
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
			Product.applyCarouselThumb(); 
			Product.forceImageZoom();
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
				var sliderWrapper = $('.product-qd-v1-image-carrousel');
				var image = sliderWrapper.find('.slick-current img');
				
				if (!image.parent().is('.product-qd-v1-zoom-wrapper'))
					image.wrap('<span class="product-qd-v1-zoom-wrapper" style="display:inline-block"></span>')
						.css('display', 'block')
						.parent()
						.zoom({ url: image.attr("src").replace(/(ids\/[0-9]+)[0-9-]+/i, "$1-1200-1804"), touch: false });
				else 
					image.zoom({ url: image.attr("src").replace(/(ids\/[0-9]+)[0-9-]+/i, "$1-1200-1804"), touch: false });
				
				sliderWrapper.on('afterChange', function (event, slick, slide) {
					image = sliderWrapper.find('.slick-current img');
					
					if (!image.parent().is('.product-qd-v1-zoom-wrapper'))
						image.wrap('<span class="product-qd-v1-zoom-wrapper" style="display:inline-block"></span>')
					.css('display', 'block')
							.parent()
							.zoom({ url: image.attr("src").replace(/(ids\/[0-9]+)[0-9-]+/i, "$1-1200-1804"), touch: false });
					else
						image.zoom({ url: image.attr("src").replace(/(ids\/[0-9]+)[0-9-]+/i, "$1-1200-1804"), touch: false });
				});

			}
			catch (e) { (typeof console !== "undefined" && typeof console.error === "function" && console.error("Ops, algo saiu errado com o zoom :( . Detalhes: " + e.message)); }
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
			if (!thumbsWrapper.find('.ON').length) thumbsWrapper.find('li >a:eq(0)').addClass('ON');

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

// jQuery Zoom 3.0.8
// github.com/jackmoore/zoom
(function(o){var t={url:!1,callback:!1,target:!1,duration:120,on:"mouseover",touch:!0,onZoomIn:!1,onZoomOut:!1,magnify:1};o.zoom=function(t,n,e,i){var u,c,r,a,m,l,s,f=o(t),h=f.css("position"),d=o(n);return t.style.position=/(absolute|fixed)/.test(h)?h:"relative",t.style.overflow="hidden",e.style.width=e.style.height="",o(e).addClass("zoomImg").css({position:"absolute",top:0,left:0,opacity:0,width:e.width*i,height:e.height*i,border:"none",maxWidth:"none",maxHeight:"none"}).appendTo(t),{init:function(){c=f.outerWidth(),u=f.outerHeight(),n===t?(a=c,r=u):(a=d.outerWidth(),r=d.outerHeight()),m=(e.width-c)/a,l=(e.height-u)/r,s=d.offset()},move:function(o){var t=o.pageX-s.left,n=o.pageY-s.top;n=Math.max(Math.min(n,r),0),t=Math.max(Math.min(t,a),0),e.style.left=t*-m+"px",e.style.top=n*-l+"px"}}},o.fn.zoom=function(n){return this.each(function(){var e=o.extend({},t,n||{}),i=e.target&&o(e.target)[0]||this,u=this,c=o(u),r=document.createElement("img"),a=o(r),m="mousemove.zoom",l=!1,s=!1;if(!e.url){var f=u.querySelector("img");if(f&&(e.url=f.getAttribute("data-src")||f.currentSrc||f.src),!e.url)return}c.one("zoom.destroy",function(o,t){c.off(".zoom"),i.style.position=o,i.style.overflow=t,r.onload=null,a.remove()}.bind(this,i.style.position,i.style.overflow)),r.onload=function(){function t(t){f.init(),f.move(t),a.stop().fadeTo(o.support.opacity?e.duration:0,1,o.isFunction(e.onZoomIn)?e.onZoomIn.call(r):!1)}function n(){a.stop().fadeTo(e.duration,0,o.isFunction(e.onZoomOut)?e.onZoomOut.call(r):!1)}var f=o.zoom(i,u,r,e.magnify);"grab"===e.on?c.on("mousedown.zoom",function(e){1===e.which&&(o(document).one("mouseup.zoom",function(){n(),o(document).off(m,f.move)}),t(e),o(document).on(m,f.move),e.preventDefault())}):"click"===e.on?c.on("click.zoom",function(e){return l?void 0:(l=!0,t(e),o(document).on(m,f.move),o(document).one("click.zoom",function(){n(),l=!1,o(document).off(m,f.move)}),!1)}):"toggle"===e.on?c.on("click.zoom",function(o){l?n():t(o),l=!l}):"mouseover"===e.on&&(f.init(),c.on("mouseenter.zoom",t).on("mouseleave.zoom",n).on(m,f.move)),e.touch&&c.on("touchstart.zoom",function(o){o.preventDefault(),s?(s=!1,n()):(s=!0,t(o.originalEvent.touches[0]||o.originalEvent.changedTouches[0]))}).on("touchmove.zoom",function(o){o.preventDefault(),f.move(o.originalEvent.touches[0]||o.originalEvent.changedTouches[0])}).on("touchend.zoom",function(o){o.preventDefault(),s&&(s=!1,n())}),o.isFunction(e.callback)&&e.callback.call(r)},r.setAttribute("role","presentation"),r.src=e.url})},o.fn.zoom.defaults=t})(window.jQuery);

/* Quatro Digital Amazing Menu */
var _0xff21=['last','vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','ite','---','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','.qd-am-collection','length','parent','qd-am-collection-wrapper','qdAjax','url','html','img[alt=\x27','attr','.box-banner','clone','hide','qd-am-content-loaded','text','trim','[class*=\x27colunas\x27]','insertBefore','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','children','qd-am-elem-','first','replaceSpecialChars','replace','>li','qd-amazing-menu','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','qd-am-','-li','extend','exec','.qd_amazing_menu_auto','getParent','closest','QD_amazingMenu','/qd-amazing-menu','object','undefined','error','info','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','join','apply','qdAmAddNdx','each','qd-am-li-','addClass','qd-am-first'];(function(_0x298ed3,_0x4ab5e1){var _0x5aad28=function(_0x168687){while(--_0x168687){_0x298ed3['push'](_0x298ed3['shift']());}};_0x5aad28(++_0x4ab5e1);}(_0xff21,0xc1));var _0x1ff2=function(_0x3158d2,_0x277d23){_0x3158d2=_0x3158d2-0x0;var _0x57c15a=_0xff21[_0x3158d2];return _0x57c15a;};(function(_0x23c804){_0x23c804['fn'][_0x1ff2('0x0')]=_0x23c804['fn'][_0x1ff2('0x1')];}(jQuery));(function(_0xf98bbb){var _0x42a94f;var _0x29fe65=jQuery;if('function'!==typeof _0x29fe65['fn'][_0x1ff2('0x2')]){var _0x1afdc4={'url':_0x1ff2('0x3'),'callback':function(){},'ajaxCallback':function(){}};var _0x491785=function(_0x424162,_0x388cfb){if(_0x1ff2('0x4')===typeof console&&_0x1ff2('0x5')!==typeof console[_0x1ff2('0x6')]&&'undefined'!==typeof console[_0x1ff2('0x7')]&&_0x1ff2('0x5')!==typeof console[_0x1ff2('0x8')]){var _0x3d83d3;_0x1ff2('0x4')===typeof _0x424162?(_0x424162[_0x1ff2('0x9')]('[QD\x20Amazing\x20Menu]\x0a'),_0x3d83d3=_0x424162):_0x3d83d3=[_0x1ff2('0xa')+_0x424162];if(_0x1ff2('0x5')===typeof _0x388cfb||_0x1ff2('0xb')!==_0x388cfb['toLowerCase']()&&'aviso'!==_0x388cfb[_0x1ff2('0xc')]())if('undefined'!==typeof _0x388cfb&&_0x1ff2('0x7')===_0x388cfb[_0x1ff2('0xc')]())try{console[_0x1ff2('0x7')]['apply'](console,_0x3d83d3);}catch(_0x27acf2){try{console[_0x1ff2('0x7')](_0x3d83d3[_0x1ff2('0xd')]('\x0a'));}catch(_0x5b9532){}}else try{console[_0x1ff2('0x6')][_0x1ff2('0xe')](console,_0x3d83d3);}catch(_0xeae215){try{console[_0x1ff2('0x6')](_0x3d83d3[_0x1ff2('0xd')]('\x0a'));}catch(_0x1b2394){}}else try{console['warn'][_0x1ff2('0xe')](console,_0x3d83d3);}catch(_0x625b98){try{console[_0x1ff2('0x8')](_0x3d83d3['join']('\x0a'));}catch(_0x45f4c1){}}}};_0x29fe65['fn'][_0x1ff2('0xf')]=function(){var _0x1abad7=_0x29fe65(this);_0x1abad7[_0x1ff2('0x10')](function(_0x3a81c2){_0x29fe65(this)['addClass'](_0x1ff2('0x11')+_0x3a81c2);});_0x1abad7['first']()[_0x1ff2('0x12')](_0x1ff2('0x13'));_0x1abad7[_0x1ff2('0x14')]()[_0x1ff2('0x12')]('qd-am-last');return _0x1abad7;};_0x29fe65['fn'][_0x1ff2('0x2')]=function(){};_0xf98bbb=function(_0x251c73){var _0x3ddc52={'i':_0x1ff2('0x15')};return function(_0x9be16a){var _0x545877=function(_0x131449){return _0x131449;};var _0x4bad0a=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x9be16a=_0x9be16a['d'+_0x4bad0a[0x10]+'c'+_0x4bad0a[0x11]+'m'+_0x545877(_0x4bad0a[0x1])+'n'+_0x4bad0a[0xd]]['l'+_0x4bad0a[0x12]+'c'+_0x4bad0a[0x0]+'ti'+_0x545877('o')+'n'];var _0x23e790=function(_0x592f66){return escape(encodeURIComponent(_0x592f66['replace'](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x2de6a8){return String[_0x1ff2('0x16')](('Z'>=_0x2de6a8?0x5a:0x7a)>=(_0x2de6a8=_0x2de6a8['charCodeAt'](0x0)+0xd)?_0x2de6a8:_0x2de6a8-0x1a);})));};var _0x409141=_0x23e790(_0x9be16a[[_0x4bad0a[0x9],_0x545877('o'),_0x4bad0a[0xc],_0x4bad0a[_0x545877(0xd)]]['join']('')]);_0x23e790=_0x23e790((window[['js',_0x545877('no'),'m',_0x4bad0a[0x1],_0x4bad0a[0x4]['toUpperCase'](),_0x1ff2('0x17')][_0x1ff2('0xd')]('')]||_0x1ff2('0x18'))+['.v',_0x4bad0a[0xd],'e',_0x545877('x'),'co',_0x545877('mm'),'erc',_0x4bad0a[0x1],'.c',_0x545877('o'),'m.',_0x4bad0a[0x13],'r'][_0x1ff2('0xd')](''));for(var _0x468d96 in _0x3ddc52){if(_0x23e790===_0x468d96+_0x3ddc52[_0x468d96]||_0x409141===_0x468d96+_0x3ddc52[_0x468d96]){var _0x50a0c7='tr'+_0x4bad0a[0x11]+'e';break;}_0x50a0c7='f'+_0x4bad0a[0x0]+'ls'+_0x545877(_0x4bad0a[0x1])+'';}_0x545877=!0x1;-0x1<_0x9be16a[[_0x4bad0a[0xc],'e',_0x4bad0a[0x0],'rc',_0x4bad0a[0x9]][_0x1ff2('0xd')]('')][_0x1ff2('0x19')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x545877=!0x0);return[_0x50a0c7,_0x545877];}(_0x251c73);}(window);if(!eval(_0xf98bbb[0x0]))return _0xf98bbb[0x1]?_0x491785(_0x1ff2('0x1a')):!0x1;var _0x1a175a=function(_0x45df4b){var _0x3d52c7=_0x45df4b[_0x1ff2('0x1b')](_0x1ff2('0x1c'));var _0x36e441=_0x3d52c7[_0x1ff2('0x1d')]('.qd-am-banner');var _0x2bb9d9=_0x3d52c7[_0x1ff2('0x1d')](_0x1ff2('0x1e'));if(_0x36e441['length']||_0x2bb9d9[_0x1ff2('0x1f')])_0x36e441[_0x1ff2('0x20')]()[_0x1ff2('0x12')]('qd-am-banner-wrapper'),_0x2bb9d9[_0x1ff2('0x20')]()[_0x1ff2('0x12')](_0x1ff2('0x21')),_0x29fe65[_0x1ff2('0x22')]({'url':_0x42a94f[_0x1ff2('0x23')],'dataType':_0x1ff2('0x24'),'success':function(_0x3039d1){var _0x4dc54d=_0x29fe65(_0x3039d1);_0x36e441[_0x1ff2('0x10')](function(){var _0x3039d1=_0x29fe65(this);var _0x33f621=_0x4dc54d['find'](_0x1ff2('0x25')+_0x3039d1[_0x1ff2('0x26')]('data-qdam-value')+'\x27]');_0x33f621[_0x1ff2('0x1f')]&&(_0x33f621[_0x1ff2('0x10')](function(){_0x29fe65(this)['getParent'](_0x1ff2('0x27'))[_0x1ff2('0x28')]()['insertBefore'](_0x3039d1);}),_0x3039d1[_0x1ff2('0x29')]());})['addClass'](_0x1ff2('0x2a'));_0x2bb9d9[_0x1ff2('0x10')](function(){var _0x3039d1={};var _0x31d781=_0x29fe65(this);_0x4dc54d[_0x1ff2('0x1b')]('h2')['each'](function(){if(_0x29fe65(this)[_0x1ff2('0x2b')]()[_0x1ff2('0x2c')]()[_0x1ff2('0xc')]()==_0x31d781['attr']('data-qdam-value')[_0x1ff2('0x2c')]()[_0x1ff2('0xc')]())return _0x3039d1=_0x29fe65(this),!0x1;});_0x3039d1[_0x1ff2('0x1f')]&&(_0x3039d1[_0x1ff2('0x10')](function(){_0x29fe65(this)[_0x1ff2('0x0')](_0x1ff2('0x2d'))[_0x1ff2('0x28')]()[_0x1ff2('0x2e')](_0x31d781);}),_0x31d781[_0x1ff2('0x29')]());})[_0x1ff2('0x12')](_0x1ff2('0x2a'));},'error':function(){_0x491785(_0x1ff2('0x2f')+_0x42a94f[_0x1ff2('0x23')]+_0x1ff2('0x30'));},'complete':function(){_0x42a94f[_0x1ff2('0x31')][_0x1ff2('0x32')](this);_0x29fe65(window)[_0x1ff2('0x33')](_0x1ff2('0x34'),_0x45df4b);},'clearQueueDelay':0xbb8});};_0x29fe65[_0x1ff2('0x2')]=function(_0x2b167c){var _0x2d0c47=_0x2b167c[_0x1ff2('0x1b')](_0x1ff2('0x35'))[_0x1ff2('0x10')](function(){var _0x184a1e=_0x29fe65(this);if(!_0x184a1e['length'])return _0x491785([_0x1ff2('0x36'),_0x2b167c],_0x1ff2('0xb'));_0x184a1e[_0x1ff2('0x1b')](_0x1ff2('0x37'))['parent']()[_0x1ff2('0x12')]('qd-am-has-ul');_0x184a1e['find']('li')[_0x1ff2('0x10')](function(){var _0x1bcab9=_0x29fe65(this);var _0x1dd5d5=_0x1bcab9[_0x1ff2('0x38')](':not(ul)');_0x1dd5d5[_0x1ff2('0x1f')]&&_0x1bcab9[_0x1ff2('0x12')](_0x1ff2('0x39')+_0x1dd5d5[_0x1ff2('0x3a')]()['text']()[_0x1ff2('0x2c')]()[_0x1ff2('0x3b')]()[_0x1ff2('0x3c')](/\./g,'')[_0x1ff2('0x3c')](/\s/g,'-')['toLowerCase']());});var _0x2731e7=_0x184a1e['find'](_0x1ff2('0x3d'))[_0x1ff2('0xf')]();_0x184a1e[_0x1ff2('0x12')](_0x1ff2('0x3e'));_0x2731e7=_0x2731e7[_0x1ff2('0x1b')]('>ul');_0x2731e7[_0x1ff2('0x10')](function(){var _0x1060bc=_0x29fe65(this);_0x1060bc['find']('>li')[_0x1ff2('0xf')]()[_0x1ff2('0x12')]('qd-am-column');_0x1060bc[_0x1ff2('0x12')](_0x1ff2('0x3f'));_0x1060bc[_0x1ff2('0x20')]()['addClass']('qd-am-dropdown');});_0x2731e7[_0x1ff2('0x12')](_0x1ff2('0x40'));var _0x3ce412=0x0,_0xf98bbb=function(_0x4c41a6){_0x3ce412+=0x1;_0x4c41a6=_0x4c41a6[_0x1ff2('0x38')]('li')['children']('*');_0x4c41a6['length']&&(_0x4c41a6['addClass'](_0x1ff2('0x41')+_0x3ce412),_0xf98bbb(_0x4c41a6));};_0xf98bbb(_0x184a1e);_0x184a1e['add'](_0x184a1e[_0x1ff2('0x1b')]('ul'))[_0x1ff2('0x10')](function(){var _0x1b7792=_0x29fe65(this);_0x1b7792['addClass'](_0x1ff2('0x42')+_0x1b7792[_0x1ff2('0x38')]('li')['length']+_0x1ff2('0x43'));});});_0x1a175a(_0x2d0c47);_0x42a94f['callback'][_0x1ff2('0x32')](this);_0x29fe65(window)[_0x1ff2('0x33')]('QuatroDigital.am.callback',_0x2b167c);};_0x29fe65['fn'][_0x1ff2('0x2')]=function(_0xb50094){var _0x8dfd90=_0x29fe65(this);if(!_0x8dfd90[_0x1ff2('0x1f')])return _0x8dfd90;_0x42a94f=_0x29fe65[_0x1ff2('0x44')]({},_0x1afdc4,_0xb50094);_0x8dfd90[_0x1ff2('0x45')]=new _0x29fe65[(_0x1ff2('0x2'))](_0x29fe65(this));return _0x8dfd90;};_0x29fe65(function(){_0x29fe65(_0x1ff2('0x46'))[_0x1ff2('0x2')]();});}}(this));

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
var _0x1990=['abs','undefined','pow','round','toFixed','split','length','join','function','prototype','trim','replace','capitalize','charAt','qdAjax','qdAjaxQueue','jquery','000','error','extend','GET','object','data','stringify','url','jqXHR','ajax','done','success','fail','always','complete','clearQueueDelay','message','4.0','simpleCart','getOrderForm','call','QuatroDigital_simpleCart','ajaxStopOn','alerta','toLowerCase','[Simple\x20Cart]\x0a','info','add','QD_simpleCart','elements','.qd_cart_total','.qd_items_text','meta[name=currency]','content','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','Shipping','value','currencySymbol','shipping','allTotal','qtt','showQuantityByItems','items','quantity','callback','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','hide','filter','.singular','show','addClass','qd-emptyCart','$this','cartTotalE','html','total','cartQttE','itemsTextE','each','find','cartQtt','cartTotal','emptyElem','emptyCart','qd-sc-populated','smartCheckout','_QuatroDigital_DropDown','vtexjs','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','QD_checkoutQueue','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','trigger','simpleCartCallback.quatro_digital','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','.qd_cart_auto','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','Oooops!\x20','warn','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Callbacks','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','.productInformationWrapper\x20\x20a.buy-button','javascript:','body','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','location','QD_buyButton','click.qd_bb_buy_sc','allowBuyClick','clickBuySmartCheckout','preventDefault','Método\x20descontinuado!','buyButton','.qd-sbb-on','.btn-add-buy-button-asynchronous','qd-bb-active','.qd-bb-productAdded','append','.buy-in-page-button','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','prodAdd','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','attr','href','---','qd-bb-itemAddBuyButtonWrapper','removeClass','qd-bb-itemAddCartWrapper','timeRemoveNewItemClass','getCartInfoByUrl','isSmartCheckout','allowUpdate','autoWatchBuyButton','unbind','click','bind','load','mouseenter.qd_bb_buy_sc','indexOf','selectSkuMsg','execDefaultAction','redirect=true','queue','test','match','buyButtonClickCallback','ku=','pop','shift','asyncCallback','productAddedToCart','cartProductAdded.vtex','fakeRequest','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','Callback\x20não\x20é\x20uma\x20função','prepend','QuatroDigital.qd_bb_prod_add','ajaxSend','/checkout/cart/add','ajaxStop','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','QD_dropDownCart','vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','toUpperCase','ite','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','skuName','name','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','qd-bb-lightBoxProdAdd','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','scrollCart','.qd-ddc-shipping\x20input','keyup.qd_ddc_cep','updateOnlyHover','mouseenter.qd_ddc_hover','cartIsEmpty','mouseleave.qd_ddc_hover','texts','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','shippingForm','.qd-ddc-emptyCart\x20p','cartContainer','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','.qd-ddc-infoAllTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','.qd-ddc-wrapper','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','productCategoryIds','qd-ddc-','availability','.qd-ddc-prodPrice','sellingPrice','Grátis','.qd-ddc-quantity','val','imageUrl','appendTo','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','[data-sku=\x27','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList\x20não\x20é\x20uma\x20função','insertProdImg','qd-loaded','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','click.qd_ddc_remove','removeProduct','stop','slideUp','remove','shippingCalculate','qdDdcLastPostalCode','BRA','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','index','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','avisso','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','prodId','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','.qdDdcContainer','QD_smartCart','dropDown','smartCart','getParent','closest'];(function(_0x2e41e2,_0x4e7250){var _0x2844d6=function(_0x28ce24){while(--_0x28ce24){_0x2e41e2['push'](_0x2e41e2['shift']());}};_0x2844d6(++_0x4e7250);}(_0x1990,0x13d));var _0x0199=function(_0x3ba597,_0x54a458){_0x3ba597=_0x3ba597-0x0;var _0x29cc70=_0x1990[_0x3ba597];return _0x29cc70;};(function(_0x1f17e8){_0x1f17e8['fn'][_0x0199('0x0')]=_0x1f17e8['fn'][_0x0199('0x1')];}(jQuery));function qd_number_format(_0x135fbe,_0x3090e8,_0x3919f3,_0x1cbd97){_0x135fbe=(_0x135fbe+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x135fbe=isFinite(+_0x135fbe)?+_0x135fbe:0x0;_0x3090e8=isFinite(+_0x3090e8)?Math[_0x0199('0x2')](_0x3090e8):0x0;_0x1cbd97='undefined'===typeof _0x1cbd97?',':_0x1cbd97;_0x3919f3=_0x0199('0x3')===typeof _0x3919f3?'.':_0x3919f3;var _0x3ed977='',_0x3ed977=function(_0x5c94da,_0x1215d9){var _0x3090e8=Math[_0x0199('0x4')](0xa,_0x1215d9);return''+(Math[_0x0199('0x5')](_0x5c94da*_0x3090e8)/_0x3090e8)[_0x0199('0x6')](_0x1215d9);},_0x3ed977=(_0x3090e8?_0x3ed977(_0x135fbe,_0x3090e8):''+Math[_0x0199('0x5')](_0x135fbe))[_0x0199('0x7')]('.');0x3<_0x3ed977[0x0][_0x0199('0x8')]&&(_0x3ed977[0x0]=_0x3ed977[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x1cbd97));(_0x3ed977[0x1]||'')[_0x0199('0x8')]<_0x3090e8&&(_0x3ed977[0x1]=_0x3ed977[0x1]||'',_0x3ed977[0x1]+=Array(_0x3090e8-_0x3ed977[0x1][_0x0199('0x8')]+0x1)[_0x0199('0x9')]('0'));return _0x3ed977[_0x0199('0x9')](_0x3919f3);};_0x0199('0xa')!==typeof String[_0x0199('0xb')][_0x0199('0xc')]&&(String[_0x0199('0xb')][_0x0199('0xc')]=function(){return this[_0x0199('0xd')](/^\s+|\s+$/g,'');});'function'!=typeof String[_0x0199('0xb')]['capitalize']&&(String[_0x0199('0xb')][_0x0199('0xe')]=function(){return this[_0x0199('0xf')](0x0)['toUpperCase']()+this['slice'](0x1)['toLowerCase']();});(function(_0x3608c6){if(_0x0199('0xa')!==typeof _0x3608c6[_0x0199('0x10')]){var _0x31ec90={};_0x3608c6[_0x0199('0x11')]=_0x31ec90;0x96>parseInt((_0x3608c6['fn'][_0x0199('0x12')][_0x0199('0xd')](/[^0-9]+/g,'')+_0x0199('0x13'))['slice'](0x0,0x3),0xa)&&console&&_0x0199('0xa')==typeof console[_0x0199('0x14')]&&console[_0x0199('0x14')]();_0x3608c6['qdAjax']=function(_0x455f53){try{var _0x5c0fc4=_0x3608c6[_0x0199('0x15')]({},{'url':'','type':_0x0199('0x16'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x455f53);var _0x437e0f=_0x0199('0x17')===typeof _0x5c0fc4[_0x0199('0x18')]?JSON[_0x0199('0x19')](_0x5c0fc4['data']):_0x5c0fc4[_0x0199('0x18')]['toString']();var _0x73557e=encodeURIComponent(_0x5c0fc4[_0x0199('0x1a')]+'|'+_0x5c0fc4['type']+'|'+_0x437e0f);_0x31ec90[_0x73557e]=_0x31ec90[_0x73557e]||{};_0x0199('0x3')==typeof _0x31ec90[_0x73557e][_0x0199('0x1b')]?_0x31ec90[_0x73557e][_0x0199('0x1b')]=_0x3608c6[_0x0199('0x1c')](_0x5c0fc4):(_0x31ec90[_0x73557e]['jqXHR'][_0x0199('0x1d')](_0x5c0fc4[_0x0199('0x1e')]),_0x31ec90[_0x73557e]['jqXHR'][_0x0199('0x1f')](_0x5c0fc4['error']),_0x31ec90[_0x73557e][_0x0199('0x1b')][_0x0199('0x20')](_0x5c0fc4[_0x0199('0x21')]));_0x31ec90[_0x73557e][_0x0199('0x1b')][_0x0199('0x20')](function(){isNaN(parseInt(_0x5c0fc4[_0x0199('0x22')]))||setTimeout(function(){_0x31ec90[_0x73557e]['jqXHR']=void 0x0;},_0x5c0fc4['clearQueueDelay']);});return _0x31ec90[_0x73557e][_0x0199('0x1b')];}catch(_0x12a647){_0x0199('0x3')!==typeof console&&_0x0199('0xa')===typeof console['error']&&console['error']('Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20'+_0x12a647[_0x0199('0x23')]);}};_0x3608c6['qdAjax']['version']=_0x0199('0x24');}}(jQuery));(function(_0x33f8d1){_0x33f8d1['fn'][_0x0199('0x0')]=_0x33f8d1['fn']['closest'];}(jQuery));(function(){var _0x222f65=jQuery;if(_0x0199('0xa')!==typeof _0x222f65['fn'][_0x0199('0x25')]){_0x222f65(function(){var _0x8cb955=vtexjs['checkout'][_0x0199('0x26')];vtexjs['checkout'][_0x0199('0x26')]=function(){return _0x8cb955[_0x0199('0x27')]();};});try{window[_0x0199('0x28')]=window[_0x0199('0x28')]||{};window[_0x0199('0x28')][_0x0199('0x29')]=!0x1;_0x222f65['fn'][_0x0199('0x25')]=function(_0x2b10e5,_0x3c6c60,_0x1d7f9b){var _0x3479cd=function(_0x28b472,_0x5b614f){if('object'===typeof console){var _0x2ec2fc=_0x0199('0x17')===typeof _0x28b472;_0x0199('0x3')!==typeof _0x5b614f&&_0x0199('0x2a')===_0x5b614f[_0x0199('0x2b')]()?_0x2ec2fc?console['warn'](_0x0199('0x2c'),_0x28b472[0x0],_0x28b472[0x1],_0x28b472[0x2],_0x28b472[0x3],_0x28b472[0x4],_0x28b472[0x5],_0x28b472[0x6],_0x28b472[0x7]):console['warn'](_0x0199('0x2c')+_0x28b472):_0x0199('0x3')!==typeof _0x5b614f&&_0x0199('0x2d')===_0x5b614f['toLowerCase']()?_0x2ec2fc?console['info']('[Simple\x20Cart]\x0a',_0x28b472[0x0],_0x28b472[0x1],_0x28b472[0x2],_0x28b472[0x3],_0x28b472[0x4],_0x28b472[0x5],_0x28b472[0x6],_0x28b472[0x7]):console['info'](_0x0199('0x2c')+_0x28b472):_0x2ec2fc?console[_0x0199('0x14')](_0x0199('0x2c'),_0x28b472[0x0],_0x28b472[0x1],_0x28b472[0x2],_0x28b472[0x3],_0x28b472[0x4],_0x28b472[0x5],_0x28b472[0x6],_0x28b472[0x7]):console[_0x0199('0x14')]('[Simple\x20Cart]\x0a'+_0x28b472);}};var _0x51e475=_0x222f65(this);_0x0199('0x17')===typeof _0x2b10e5?_0x3c6c60=_0x2b10e5:(_0x2b10e5=_0x2b10e5||!0x1,_0x51e475=_0x51e475[_0x0199('0x2e')](_0x222f65[_0x0199('0x2f')][_0x0199('0x30')]));if(!_0x51e475[_0x0199('0x8')])return _0x51e475;_0x222f65[_0x0199('0x2f')][_0x0199('0x30')]=_0x222f65[_0x0199('0x2f')]['elements']['add'](_0x51e475);_0x1d7f9b='undefined'===typeof _0x1d7f9b?!0x1:_0x1d7f9b;var _0x1b1343={'cartQtt':'.qd_cart_qtt','cartTotal':_0x0199('0x31'),'itemsText':_0x0199('0x32'),'currencySymbol':(_0x222f65(_0x0199('0x33'))['attr'](_0x0199('0x34'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x18ab7b=_0x222f65[_0x0199('0x15')]({},_0x1b1343,_0x3c6c60);var _0x324156=_0x222f65('');_0x51e475['each'](function(){var _0x44c699=_0x222f65(this);_0x44c699[_0x0199('0x18')](_0x0199('0x35'))||_0x44c699[_0x0199('0x18')](_0x0199('0x35'),_0x18ab7b);});var _0x252053=function(_0x4e42d1){window[_0x0199('0x36')]=window[_0x0199('0x36')]||{};for(var _0x2b10e5=0x0,_0x2b479c=0x0,_0x2ea025=0x0;_0x2ea025<_0x4e42d1[_0x0199('0x37')][_0x0199('0x8')];_0x2ea025++)_0x0199('0x38')==_0x4e42d1[_0x0199('0x37')][_0x2ea025]['id']&&(_0x2b479c+=_0x4e42d1['totalizers'][_0x2ea025][_0x0199('0x39')]),_0x2b10e5+=_0x4e42d1[_0x0199('0x37')][_0x2ea025]['value'];window[_0x0199('0x36')]['total']=_0x18ab7b[_0x0199('0x3a')]+qd_number_format(_0x2b10e5/0x64,0x2,',','.');window[_0x0199('0x36')][_0x0199('0x3b')]=_0x18ab7b[_0x0199('0x3a')]+qd_number_format(_0x2b479c/0x64,0x2,',','.');window[_0x0199('0x36')][_0x0199('0x3c')]=_0x18ab7b[_0x0199('0x3a')]+qd_number_format((_0x2b10e5+_0x2b479c)/0x64,0x2,',','.');window[_0x0199('0x36')][_0x0199('0x3d')]=0x0;if(_0x18ab7b[_0x0199('0x3e')])for(_0x2ea025=0x0;_0x2ea025<_0x4e42d1[_0x0199('0x3f')]['length'];_0x2ea025++)window[_0x0199('0x36')][_0x0199('0x3d')]+=_0x4e42d1[_0x0199('0x3f')][_0x2ea025][_0x0199('0x40')];else window[_0x0199('0x36')][_0x0199('0x3d')]=_0x4e42d1[_0x0199('0x3f')][_0x0199('0x8')]||0x0;try{window['_QuatroDigital_CartData'][_0x0199('0x41')]&&window['_QuatroDigital_CartData'][_0x0199('0x41')][_0x0199('0x42')]&&window[_0x0199('0x36')]['callback']['fire']();}catch(_0xe19591){_0x3479cd(_0x0199('0x43'));}_0x32cb0d(_0x324156);};var _0x5f3cf9=function(_0x45b530,_0x1b6b4b){0x1===_0x45b530?_0x1b6b4b[_0x0199('0x44')]()[_0x0199('0x45')](_0x0199('0x46'))[_0x0199('0x47')]():_0x1b6b4b['hide']()['filter']('.plural')[_0x0199('0x47')]();};var _0x7ab0e=function(_0xdb2790){0x1>_0xdb2790?_0x51e475[_0x0199('0x48')](_0x0199('0x49')):_0x51e475['removeClass'](_0x0199('0x49'));};var _0x4b8496=function(_0x1aa4c7,_0x5e04d3){var _0x22e3de=parseInt(window[_0x0199('0x36')][_0x0199('0x3d')],0xa);_0x5e04d3[_0x0199('0x4a')][_0x0199('0x47')]();isNaN(_0x22e3de)&&(_0x3479cd('O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','alerta'),_0x22e3de=0x0);_0x5e04d3[_0x0199('0x4b')][_0x0199('0x4c')](window['_QuatroDigital_CartData'][_0x0199('0x4d')]);_0x5e04d3[_0x0199('0x4e')][_0x0199('0x4c')](_0x22e3de);_0x5f3cf9(_0x22e3de,_0x5e04d3[_0x0199('0x4f')]);_0x7ab0e(_0x22e3de);};var _0x32cb0d=function(_0x1942e8){_0x51e475[_0x0199('0x50')](function(){var _0x15f6fa={};var _0x45de64=_0x222f65(this);_0x2b10e5&&_0x45de64['data'](_0x0199('0x35'))&&_0x222f65[_0x0199('0x15')](_0x18ab7b,_0x45de64[_0x0199('0x18')](_0x0199('0x35')));_0x15f6fa[_0x0199('0x4a')]=_0x45de64;_0x15f6fa[_0x0199('0x4e')]=_0x45de64[_0x0199('0x51')](_0x18ab7b[_0x0199('0x52')])||_0x324156;_0x15f6fa['cartTotalE']=_0x45de64[_0x0199('0x51')](_0x18ab7b[_0x0199('0x53')])||_0x324156;_0x15f6fa['itemsTextE']=_0x45de64[_0x0199('0x51')](_0x18ab7b['itemsText'])||_0x324156;_0x15f6fa[_0x0199('0x54')]=_0x45de64[_0x0199('0x51')](_0x18ab7b[_0x0199('0x55')])||_0x324156;_0x4b8496(_0x1942e8,_0x15f6fa);_0x45de64[_0x0199('0x48')](_0x0199('0x56'));});};(function(){if(_0x18ab7b[_0x0199('0x57')]){window[_0x0199('0x58')]=window[_0x0199('0x58')]||{};if(_0x0199('0x3')!==typeof window[_0x0199('0x58')][_0x0199('0x26')]&&(_0x1d7f9b||!_0x2b10e5))return _0x252053(window[_0x0199('0x58')]['getOrderForm']);if(_0x0199('0x17')!==typeof window[_0x0199('0x59')]||'undefined'===typeof window[_0x0199('0x59')][_0x0199('0x5a')])if(_0x0199('0x17')===typeof vtex&&'object'===typeof vtex[_0x0199('0x5a')]&&_0x0199('0x3')!==typeof vtex[_0x0199('0x5a')]['SDK'])new vtex['checkout'][(_0x0199('0x5b'))]();else return _0x3479cd(_0x0199('0x5c'));_0x222f65[_0x0199('0x5d')]([_0x0199('0x3f'),_0x0199('0x37'),_0x0199('0x5e')],{'done':function(_0x424fe7){_0x252053(_0x424fe7);window['_QuatroDigital_DropDown'][_0x0199('0x26')]=_0x424fe7;},'fail':function(_0x2a53f6){_0x3479cd([_0x0199('0x5f'),_0x2a53f6]);}});}else alert('Esta\x20é\x20uma\x20função\x20descontinuada\x20=/');}());_0x18ab7b[_0x0199('0x41')]();_0x222f65(window)[_0x0199('0x60')](_0x0199('0x61'));return _0x51e475;};_0x222f65[_0x0199('0x2f')]={'elements':_0x222f65('')};_0x222f65(function(){var _0x4bc7ac;_0x0199('0xa')===typeof window['ajaxRequestbuyButtonAsynchronous']&&(_0x4bc7ac=window[_0x0199('0x62')],window['ajaxRequestbuyButtonAsynchronous']=function(_0x665caa,_0x470b87,_0x1d54e1,_0xdb754b,_0x37096d){_0x4bc7ac[_0x0199('0x27')](this,_0x665caa,_0x470b87,_0x1d54e1,_0xdb754b,function(){_0x0199('0xa')===typeof _0x37096d&&_0x37096d();_0x222f65[_0x0199('0x2f')][_0x0199('0x30')][_0x0199('0x50')](function(){var _0x5b55fd=_0x222f65(this);_0x5b55fd[_0x0199('0x25')](_0x5b55fd[_0x0199('0x18')](_0x0199('0x35')));});});});});var _0x17120c=window[_0x0199('0x63')]||void 0x0;window[_0x0199('0x63')]=function(_0x509906){_0x222f65['fn'][_0x0199('0x25')](!0x0);_0x0199('0xa')===typeof _0x17120c?_0x17120c['call'](this,_0x509906):alert(_0x509906);};_0x222f65(function(){var _0x3596d2=_0x222f65(_0x0199('0x64'));_0x3596d2[_0x0199('0x8')]&&_0x3596d2[_0x0199('0x25')]();});_0x222f65(function(){_0x222f65(window)['bind'](_0x0199('0x65'),function(){_0x222f65['fn'][_0x0199('0x25')](!0x0);});});}catch(_0x1ceed8){_0x0199('0x3')!==typeof console&&_0x0199('0xa')===typeof console[_0x0199('0x14')]&&console['error'](_0x0199('0x66'),_0x1ceed8);}}}());(function(){var _0x361c45=function(_0x2f4e08,_0x227f7a){if(_0x0199('0x17')===typeof console){var _0x3fafb3='object'===typeof _0x2f4e08;_0x0199('0x3')!==typeof _0x227f7a&&'alerta'===_0x227f7a[_0x0199('0x2b')]()?_0x3fafb3?console[_0x0199('0x67')](_0x0199('0x68'),_0x2f4e08[0x0],_0x2f4e08[0x1],_0x2f4e08[0x2],_0x2f4e08[0x3],_0x2f4e08[0x4],_0x2f4e08[0x5],_0x2f4e08[0x6],_0x2f4e08[0x7]):console['warn'](_0x0199('0x68')+_0x2f4e08):_0x0199('0x3')!==typeof _0x227f7a&&_0x0199('0x2d')===_0x227f7a[_0x0199('0x2b')]()?_0x3fafb3?console['info'](_0x0199('0x68'),_0x2f4e08[0x0],_0x2f4e08[0x1],_0x2f4e08[0x2],_0x2f4e08[0x3],_0x2f4e08[0x4],_0x2f4e08[0x5],_0x2f4e08[0x6],_0x2f4e08[0x7]):console[_0x0199('0x2d')](_0x0199('0x68')+_0x2f4e08):_0x3fafb3?console[_0x0199('0x14')](_0x0199('0x68'),_0x2f4e08[0x0],_0x2f4e08[0x1],_0x2f4e08[0x2],_0x2f4e08[0x3],_0x2f4e08[0x4],_0x2f4e08[0x5],_0x2f4e08[0x6],_0x2f4e08[0x7]):console[_0x0199('0x14')](_0x0199('0x68')+_0x2f4e08);}},_0x580325=null,_0x5569d9={},_0x3b690b={},_0x122a8e={};$[_0x0199('0x5d')]=function(_0xefa6b5,_0x446b72){if(null===_0x580325)if(_0x0199('0x17')===typeof window['vtexjs']&&_0x0199('0x3')!==typeof window['vtexjs'][_0x0199('0x5a')])_0x580325=window['vtexjs'][_0x0199('0x5a')];else return _0x361c45('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js');var _0x4d5b58=$[_0x0199('0x15')]({'done':function(){},'fail':function(){}},_0x446b72),_0x2c8588=_0xefa6b5['join'](';'),_0xb34343=function(){_0x5569d9[_0x2c8588][_0x0199('0x2e')](_0x4d5b58[_0x0199('0x1d')]);_0x3b690b[_0x2c8588][_0x0199('0x2e')](_0x4d5b58[_0x0199('0x1f')]);};_0x122a8e[_0x2c8588]?_0xb34343():(_0x5569d9[_0x2c8588]=$[_0x0199('0x69')](),_0x3b690b[_0x2c8588]=$[_0x0199('0x69')](),_0xb34343(),_0x122a8e[_0x2c8588]=!0x0,_0x580325[_0x0199('0x26')](_0xefa6b5)[_0x0199('0x1d')](function(_0xc7a885){_0x122a8e[_0x2c8588]=!0x1;_0x5569d9[_0x2c8588][_0x0199('0x42')](_0xc7a885);})['fail'](function(_0x3daa55){_0x122a8e[_0x2c8588]=!0x1;_0x3b690b[_0x2c8588][_0x0199('0x42')](_0x3daa55);}));};}());(function(_0x282992){try{var _0x3b8307=jQuery,_0x1ad57c,_0x38cb09=_0x3b8307({}),_0x31e60b=function(_0x4a2888,_0x233083){if(_0x0199('0x17')===typeof console&&'undefined'!==typeof console[_0x0199('0x14')]&&_0x0199('0x3')!==typeof console['info']&&'undefined'!==typeof console[_0x0199('0x67')]){var _0x4dad78;_0x0199('0x17')===typeof _0x4a2888?(_0x4a2888[_0x0199('0x6a')]('[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a'),_0x4dad78=_0x4a2888):_0x4dad78=[_0x0199('0x6b')+_0x4a2888];if('undefined'===typeof _0x233083||_0x0199('0x2a')!==_0x233083['toLowerCase']()&&_0x0199('0x6c')!==_0x233083['toLowerCase']())if(_0x0199('0x3')!==typeof _0x233083&&_0x0199('0x2d')===_0x233083['toLowerCase']())try{console[_0x0199('0x2d')][_0x0199('0x6d')](console,_0x4dad78);}catch(_0x3e7800){try{console[_0x0199('0x2d')](_0x4dad78[_0x0199('0x9')]('\x0a'));}catch(_0x5f09b5){}}else try{console[_0x0199('0x14')][_0x0199('0x6d')](console,_0x4dad78);}catch(_0x3b0def){try{console[_0x0199('0x14')](_0x4dad78['join']('\x0a'));}catch(_0x170f79){}}else try{console[_0x0199('0x67')][_0x0199('0x6d')](console,_0x4dad78);}catch(_0x35b478){try{console[_0x0199('0x67')](_0x4dad78[_0x0199('0x9')]('\x0a'));}catch(_0x4f98f6){}}}},_0x1bd58b={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0x0199('0x6e'),'buyQtt':'input.buy-in-page-quantity','selectSkuMsg':_0x0199('0x6f'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0xf607e5,_0x31ac90,_0x13ccd5){_0x3b8307(_0x0199('0x70'))['is']('.productQuickView')&&(_0x0199('0x1e')===_0x31ac90?alert('Produto\x20adicionado\x20ao\x20carrinho!'):(alert(_0x0199('0x71')),(_0x0199('0x17')===typeof parent?parent:document)[_0x0199('0x72')]['href']=_0x13ccd5));},'isProductPage':function(){return _0x3b8307(_0x0199('0x70'))['is']('#produto,\x20.produto');},'execDefaultAction':function(_0x165ec4){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x3b8307[_0x0199('0x73')]=function(_0x4392d9,_0x31d493){function _0x5cdc98(_0xbe7a3f){_0x1ad57c['isSmartCheckout']?_0xbe7a3f['data']('qd-bb-click-active')||(_0xbe7a3f[_0x0199('0x18')]('qd-bb-click-active',0x1),_0xbe7a3f['on'](_0x0199('0x74'),function(_0x266591){if(!_0x1ad57c[_0x0199('0x75')]())return!0x0;if(!0x0!==_0x18758e[_0x0199('0x76')][_0x0199('0x27')](this))return _0x266591[_0x0199('0x77')](),!0x1;})):alert(_0x0199('0x78'));}function _0x402786(_0x5cf9d1){_0x5cf9d1=_0x5cf9d1||_0x3b8307(_0x1ad57c[_0x0199('0x79')]);_0x5cf9d1['each'](function(){var _0x5cf9d1=_0x3b8307(this);_0x5cf9d1['is'](_0x0199('0x7a'))||(_0x5cf9d1[_0x0199('0x48')]('qd-sbb-on'),_0x5cf9d1['is'](_0x0199('0x7b'))&&!_0x5cf9d1['is']('.remove-href')||_0x5cf9d1[_0x0199('0x18')](_0x0199('0x7c'))||(_0x5cf9d1['data'](_0x0199('0x7c'),0x1),_0x5cf9d1['children'](_0x0199('0x7d'))['length']||_0x5cf9d1[_0x0199('0x7e')]('<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>'),_0x5cf9d1['is'](_0x0199('0x7f'))&&_0x1ad57c['isProductPage']()&&_0x47252a[_0x0199('0x27')](_0x5cf9d1),_0x5cdc98(_0x5cf9d1)));});_0x1ad57c[_0x0199('0x80')]()&&!_0x5cf9d1['length']&&_0x31e60b(_0x0199('0x81')+_0x5cf9d1[_0x0199('0x82')]+'\x27.',_0x0199('0x2d'));}var _0x2245da=_0x3b8307(_0x4392d9);var _0x18758e=this;window[_0x0199('0x83')]=window[_0x0199('0x83')]||{};window['_QuatroDigital_CartData']=window[_0x0199('0x36')]||{};_0x18758e[_0x0199('0x84')]=function(_0x5c1871,_0xe9a4a9){_0x2245da['addClass'](_0x0199('0x85'));_0x3b8307(_0x0199('0x70'))['addClass'](_0x0199('0x86'));var _0x1dd40f=_0x3b8307(_0x1ad57c[_0x0199('0x79')])[_0x0199('0x45')]('[href=\x27'+(_0x5c1871[_0x0199('0x87')](_0x0199('0x88'))||_0x0199('0x89'))+'\x27]')[_0x0199('0x2e')](_0x5c1871);_0x1dd40f[_0x0199('0x48')](_0x0199('0x8a'));setTimeout(function(){_0x2245da[_0x0199('0x8b')](_0x0199('0x8c'));_0x1dd40f[_0x0199('0x8b')](_0x0199('0x8a'));},_0x1ad57c[_0x0199('0x8d')]);window[_0x0199('0x83')][_0x0199('0x26')]=void 0x0;if(_0x0199('0x3')!==typeof _0x31d493&&_0x0199('0xa')===typeof _0x31d493[_0x0199('0x8e')])return _0x1ad57c[_0x0199('0x8f')]||(_0x31e60b('função\x20descontinuada'),_0x31d493[_0x0199('0x8e')]()),window[_0x0199('0x58')]['getOrderForm']=void 0x0,_0x31d493[_0x0199('0x8e')](function(_0x361561){window[_0x0199('0x83')][_0x0199('0x26')]=_0x361561;_0x3b8307['fn'][_0x0199('0x25')](!0x0,void 0x0,!0x0);},{'lastSku':_0xe9a4a9});window[_0x0199('0x83')][_0x0199('0x90')]=!0x0;_0x3b8307['fn'][_0x0199('0x25')](!0x0);};(function(){if(_0x1ad57c[_0x0199('0x8f')]&&_0x1ad57c[_0x0199('0x91')]){var _0x4a0165=_0x3b8307(_0x0199('0x7b'));_0x4a0165['length']&&_0x402786(_0x4a0165);}}());var _0x47252a=function(){var _0x1b1138=_0x3b8307(this);_0x0199('0x3')!==typeof _0x1b1138['data'](_0x0199('0x79'))?(_0x1b1138[_0x0199('0x92')](_0x0199('0x93')),_0x5cdc98(_0x1b1138)):(_0x1b1138[_0x0199('0x94')]('mouseenter.qd_bb_buy_sc',function(_0x2f557d){_0x1b1138[_0x0199('0x92')](_0x0199('0x93'));_0x5cdc98(_0x1b1138);_0x3b8307(this)[_0x0199('0x92')](_0x2f557d);}),_0x3b8307(window)[_0x0199('0x95')](function(){_0x1b1138['unbind'](_0x0199('0x93'));_0x5cdc98(_0x1b1138);_0x1b1138[_0x0199('0x92')](_0x0199('0x96'));}));};_0x18758e[_0x0199('0x76')]=function(){var _0x3f63bc=_0x3b8307(this),_0x4392d9=_0x3f63bc['attr'](_0x0199('0x88'))||'';if(-0x1<_0x4392d9[_0x0199('0x97')](_0x1ad57c[_0x0199('0x98')]))return!0x0;_0x4392d9=_0x4392d9[_0x0199('0xd')](/redirect\=(false|true)/gi,'')[_0x0199('0xd')]('?','?redirect=false&')[_0x0199('0xd')](/\&\&/gi,'&');if(_0x1ad57c[_0x0199('0x99')](_0x3f63bc))return _0x3f63bc[_0x0199('0x87')](_0x0199('0x88'),_0x4392d9[_0x0199('0xd')]('redirect=false',_0x0199('0x9a'))),!0x0;_0x4392d9=_0x4392d9['replace'](/http.?:/i,'');_0x38cb09[_0x0199('0x9b')](function(_0x445bd6){if(!_0x1ad57c['buyIfQuantityZeroed']&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0x0199('0x9c')](_0x4392d9))return _0x445bd6();var _0x1ad8a9=function(_0x54fe28,_0x33d275){var _0x402786=_0x4392d9[_0x0199('0x9d')](/sku\=([0-9]+)/gi),_0x37ef7f=[];if(_0x0199('0x17')===typeof _0x402786&&null!==_0x402786)for(var _0x4278db=_0x402786['length']-0x1;0x0<=_0x4278db;_0x4278db--){var _0x2d4235=parseInt(_0x402786[_0x4278db][_0x0199('0xd')](/sku\=/gi,''));isNaN(_0x2d4235)||_0x37ef7f['push'](_0x2d4235);}_0x1ad57c['productPageCallback'][_0x0199('0x27')](this,_0x54fe28,_0x33d275,_0x4392d9);_0x18758e[_0x0199('0x9e')][_0x0199('0x27')](this,_0x54fe28,_0x33d275,_0x4392d9,_0x37ef7f);_0x18758e[_0x0199('0x84')](_0x3f63bc,_0x4392d9['split'](_0x0199('0x9f'))[_0x0199('0xa0')]()[_0x0199('0x7')]('&')[_0x0199('0xa1')]());_0x0199('0xa')===typeof _0x1ad57c[_0x0199('0xa2')]&&_0x1ad57c[_0x0199('0xa2')]['call'](this);_0x3b8307(window)[_0x0199('0x60')](_0x0199('0xa3'));_0x3b8307(window)['trigger'](_0x0199('0xa4'));};_0x1ad57c[_0x0199('0xa5')]?(_0x1ad8a9(null,_0x0199('0x1e')),_0x445bd6()):_0x3b8307[_0x0199('0x1c')]({'url':_0x4392d9,'complete':_0x1ad8a9})[_0x0199('0x20')](function(){_0x445bd6();});});};_0x18758e[_0x0199('0x9e')]=function(_0x3b7278,_0x529d52,_0x3ffe1c,_0x4fe7ae){try{_0x0199('0x1e')===_0x529d52&&_0x0199('0x17')===typeof window[_0x0199('0xa6')]&&_0x0199('0xa')===typeof window[_0x0199('0xa6')]['_QuatroDigital_prodBuyCallback']&&window[_0x0199('0xa6')][_0x0199('0xa7')](_0x3b7278,_0x529d52,_0x3ffe1c,_0x4fe7ae);}catch(_0x5b3e64){_0x31e60b(_0x0199('0xa8'));}};_0x402786();'function'===typeof _0x1ad57c[_0x0199('0x41')]?_0x1ad57c['callback'][_0x0199('0x27')](this):_0x31e60b(_0x0199('0xa9'));};var _0x21e5fa=_0x3b8307[_0x0199('0x69')]();_0x3b8307['fn']['QD_buyButton']=function(_0x2f04d9,_0x132064){var _0x282992=_0x3b8307(this);_0x0199('0x3')!==typeof _0x132064||_0x0199('0x17')!==typeof _0x2f04d9||_0x2f04d9 instanceof _0x3b8307||(_0x132064=_0x2f04d9,_0x2f04d9=void 0x0);_0x1ad57c=_0x3b8307['extend']({},_0x1bd58b,_0x132064);var _0x341d39;_0x21e5fa['add'](function(){_0x282992['children']('.qd-bb-itemAddWrapper')[_0x0199('0x8')]||_0x282992[_0x0199('0xaa')]('<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>');_0x341d39=new _0x3b8307[(_0x0199('0x73'))](_0x282992,_0x2f04d9);});_0x21e5fa[_0x0199('0x42')]();_0x3b8307(window)['on'](_0x0199('0xab'),function(_0x47ac2f,_0x1d95e2,_0x29ad06){_0x341d39[_0x0199('0x84')](_0x1d95e2,_0x29ad06);});return _0x3b8307[_0x0199('0x15')](_0x282992,_0x341d39);};var _0x45c4d7=0x0;_0x3b8307(document)[_0x0199('0xac')](function(_0x450fc4,_0x42f8dd,_0x30334e){-0x1<_0x30334e[_0x0199('0x1a')][_0x0199('0x2b')]()[_0x0199('0x97')](_0x0199('0xad'))&&(_0x45c4d7=(_0x30334e['url']['match'](/sku\=([0-9]+)/i)||[''])[_0x0199('0xa0')]());});_0x3b8307(window)[_0x0199('0x94')]('productAddedToCart.qdSbbVtex',function(){_0x3b8307(window)[_0x0199('0x60')]('QuatroDigital.qd_bb_prod_add',[new _0x3b8307(),_0x45c4d7]);});_0x3b8307(document)[_0x0199('0xae')](function(){_0x21e5fa[_0x0199('0x42')]();});}catch(_0x5ed594){'undefined'!==typeof console&&'function'===typeof console[_0x0199('0x14')]&&console[_0x0199('0x14')](_0x0199('0x66'),_0x5ed594);}}(this));function qd_number_format(_0x20bfd3,_0x4d930d,_0x306294,_0x2826f2){_0x20bfd3=(_0x20bfd3+'')[_0x0199('0xd')](/[^0-9+\-Ee.]/g,'');_0x20bfd3=isFinite(+_0x20bfd3)?+_0x20bfd3:0x0;_0x4d930d=isFinite(+_0x4d930d)?Math[_0x0199('0x2')](_0x4d930d):0x0;_0x2826f2=_0x0199('0x3')===typeof _0x2826f2?',':_0x2826f2;_0x306294=_0x0199('0x3')===typeof _0x306294?'.':_0x306294;var _0x46197b='',_0x46197b=function(_0x35dc34,_0x35829e){var _0x3a457c=Math[_0x0199('0x4')](0xa,_0x35829e);return''+(Math['round'](_0x35dc34*_0x3a457c)/_0x3a457c)[_0x0199('0x6')](_0x35829e);},_0x46197b=(_0x4d930d?_0x46197b(_0x20bfd3,_0x4d930d):''+Math[_0x0199('0x5')](_0x20bfd3))[_0x0199('0x7')]('.');0x3<_0x46197b[0x0][_0x0199('0x8')]&&(_0x46197b[0x0]=_0x46197b[0x0][_0x0199('0xd')](/\B(?=(?:\d{3})+(?!\d))/g,_0x2826f2));(_0x46197b[0x1]||'')[_0x0199('0x8')]<_0x4d930d&&(_0x46197b[0x1]=_0x46197b[0x1]||'',_0x46197b[0x1]+=Array(_0x4d930d-_0x46197b[0x1]['length']+0x1)[_0x0199('0x9')]('0'));return _0x46197b['join'](_0x306294);}(function(){try{window[_0x0199('0x36')]=window[_0x0199('0x36')]||{},window['_QuatroDigital_CartData'][_0x0199('0x41')]=window[_0x0199('0x36')][_0x0199('0x41')]||$[_0x0199('0x69')]();}catch(_0x2b8d34){_0x0199('0x3')!==typeof console&&_0x0199('0xa')===typeof console[_0x0199('0x14')]&&console[_0x0199('0x14')](_0x0199('0x66'),_0x2b8d34[_0x0199('0x23')]);}}());(function(_0x40511e){try{var _0x56755b=jQuery,_0x457936=function(_0x281598,_0x40fabe){if(_0x0199('0x17')===typeof console&&_0x0199('0x3')!==typeof console[_0x0199('0x14')]&&_0x0199('0x3')!==typeof console['info']&&_0x0199('0x3')!==typeof console['warn']){var _0x5b8e70;_0x0199('0x17')===typeof _0x281598?(_0x281598[_0x0199('0x6a')](_0x0199('0xaf')),_0x5b8e70=_0x281598):_0x5b8e70=['[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'+_0x281598];if('undefined'===typeof _0x40fabe||_0x0199('0x2a')!==_0x40fabe[_0x0199('0x2b')]()&&_0x0199('0x6c')!==_0x40fabe[_0x0199('0x2b')]())if(_0x0199('0x3')!==typeof _0x40fabe&&_0x0199('0x2d')===_0x40fabe[_0x0199('0x2b')]())try{console[_0x0199('0x2d')][_0x0199('0x6d')](console,_0x5b8e70);}catch(_0x100186){try{console[_0x0199('0x2d')](_0x5b8e70['join']('\x0a'));}catch(_0x41d388){}}else try{console[_0x0199('0x14')][_0x0199('0x6d')](console,_0x5b8e70);}catch(_0x44ce21){try{console[_0x0199('0x14')](_0x5b8e70[_0x0199('0x9')]('\x0a'));}catch(_0x277350){}}else try{console[_0x0199('0x67')][_0x0199('0x6d')](console,_0x5b8e70);}catch(_0x5744c1){try{console['warn'](_0x5b8e70[_0x0199('0x9')]('\x0a'));}catch(_0x53cd1f){}}}};window[_0x0199('0x58')]=window[_0x0199('0x58')]||{};window[_0x0199('0x58')][_0x0199('0x90')]=!0x0;_0x56755b['QD_dropDownCart']=function(){};_0x56755b['fn'][_0x0199('0xb0')]=function(){return{'fn':new _0x56755b()};};var _0x5b3fb4=function(_0x561ba9){var _0x14e7ad={'i':_0x0199('0xb1')};return function(_0x2e3300){var _0x9b88f6=function(_0x45d971){return _0x45d971;};var _0x25695c=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2e3300=_0x2e3300['d'+_0x25695c[0x10]+'c'+_0x25695c[0x11]+'m'+_0x9b88f6(_0x25695c[0x1])+'n'+_0x25695c[0xd]]['l'+_0x25695c[0x12]+'c'+_0x25695c[0x0]+'ti'+_0x9b88f6('o')+'n'];var _0x4d1633=function(_0x14f1b1){return escape(encodeURIComponent(_0x14f1b1[_0x0199('0xd')](/\./g,'¨')[_0x0199('0xd')](/[a-zA-Z]/g,function(_0x28d225){return String[_0x0199('0xb2')](('Z'>=_0x28d225?0x5a:0x7a)>=(_0x28d225=_0x28d225['charCodeAt'](0x0)+0xd)?_0x28d225:_0x28d225-0x1a);})));};var _0x40511e=_0x4d1633(_0x2e3300[[_0x25695c[0x9],_0x9b88f6('o'),_0x25695c[0xc],_0x25695c[_0x9b88f6(0xd)]][_0x0199('0x9')]('')]);_0x4d1633=_0x4d1633((window[['js',_0x9b88f6('no'),'m',_0x25695c[0x1],_0x25695c[0x4][_0x0199('0xb3')](),_0x0199('0xb4')][_0x0199('0x9')]('')]||_0x0199('0x89'))+['.v',_0x25695c[0xd],'e',_0x9b88f6('x'),'co',_0x9b88f6('mm'),_0x0199('0xb5'),_0x25695c[0x1],'.c',_0x9b88f6('o'),'m.',_0x25695c[0x13],'r'][_0x0199('0x9')](''));for(var _0x440c26 in _0x14e7ad){if(_0x4d1633===_0x440c26+_0x14e7ad[_0x440c26]||_0x40511e===_0x440c26+_0x14e7ad[_0x440c26]){var _0x809d0b='tr'+_0x25695c[0x11]+'e';break;}_0x809d0b='f'+_0x25695c[0x0]+'ls'+_0x9b88f6(_0x25695c[0x1])+'';}_0x9b88f6=!0x1;-0x1<_0x2e3300[[_0x25695c[0xc],'e',_0x25695c[0x0],'rc',_0x25695c[0x9]][_0x0199('0x9')]('')][_0x0199('0x97')](_0x0199('0xb6'))&&(_0x9b88f6=!0x0);return[_0x809d0b,_0x9b88f6];}(_0x561ba9);}(window);if(!eval(_0x5b3fb4[0x0]))return _0x5b3fb4[0x1]?_0x457936(_0x0199('0xb7')):!0x1;_0x56755b[_0x0199('0xb0')]=function(_0x454eb4,_0x5658e9){var _0x218881=_0x56755b(_0x454eb4);if(!_0x218881['length'])return _0x218881;var _0x5f5647=_0x56755b[_0x0199('0x15')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x0199('0xb8'),'linkCheckout':'Finalizar\x20Compra','cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':_0x0199('0xb9'),'continueShopping':_0x0199('0xba'),'shippingForm':'<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x2b6f90){return _0x2b6f90[_0x0199('0xbb')]||_0x2b6f90[_0x0199('0xbc')];},'callback':function(){},'callbackProductsList':function(){}},_0x5658e9);_0x56755b('');var _0x7e8930=this;if(_0x5f5647[_0x0199('0x57')]){var _0x479de1=!0x1;'undefined'===typeof window[_0x0199('0x59')]&&(_0x457936('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN'),_0x56755b[_0x0199('0x1c')]({'url':_0x0199('0xbd'),'async':!0x1,'dataType':'script','error':function(){_0x457936(_0x0199('0xbe'));_0x479de1=!0x0;}}));if(_0x479de1)return _0x457936(_0x0199('0xbf'));}if('object'===typeof window[_0x0199('0x59')]&&_0x0199('0x3')!==typeof window[_0x0199('0x59')][_0x0199('0x5a')])var _0x2dcaf8=window[_0x0199('0x59')][_0x0199('0x5a')];else if('object'===typeof vtex&&'object'===typeof vtex[_0x0199('0x5a')]&&_0x0199('0x3')!==typeof vtex[_0x0199('0x5a')][_0x0199('0x5b')])_0x2dcaf8=new vtex[(_0x0199('0x5a'))][(_0x0199('0x5b'))]();else return _0x457936(_0x0199('0x5c'));_0x7e8930['cartContainer']='<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>';var _0x38ba7a=function(_0x1878bd){_0x56755b(this)[_0x0199('0x7e')](_0x1878bd);_0x1878bd[_0x0199('0x51')](_0x0199('0xc0'))[_0x0199('0x2e')](_0x56755b(_0x0199('0xc1')))['on']('click.qd_ddc_closeFn',function(){_0x218881['removeClass'](_0x0199('0xc2'));_0x56755b(document['body'])[_0x0199('0x8b')](_0x0199('0x86'));});_0x56755b(document)[_0x0199('0xc3')](_0x0199('0xc4'))['on']('keyup.qd_ddc_closeFn',function(_0x10a1ff){0x1b==_0x10a1ff[_0x0199('0xc5')]&&(_0x218881['removeClass']('qd-bb-lightBoxProdAdd'),_0x56755b(document[_0x0199('0x70')])[_0x0199('0x8b')]('qd-bb-lightBoxBodyProdAdd'));});var _0x40a7f8=_0x1878bd['find'](_0x0199('0xc6'));_0x1878bd[_0x0199('0x51')]('.qd-ddc-scrollUp')['on']('click.qd_ddc_scrollUp',function(){_0x7e8930['scrollCart']('-',void 0x0,void 0x0,_0x40a7f8);return!0x1;});_0x1878bd[_0x0199('0x51')](_0x0199('0xc7'))['on'](_0x0199('0xc8'),function(){_0x7e8930[_0x0199('0xc9')](void 0x0,void 0x0,void 0x0,_0x40a7f8);return!0x1;});_0x1878bd[_0x0199('0x51')](_0x0199('0xca'))['val']('')['on'](_0x0199('0xcb'),function(){_0x7e8930['shippingCalculate'](_0x56755b(this));});if(_0x5f5647[_0x0199('0xcc')]){var _0x5658e9=0x0;_0x56755b(this)['on'](_0x0199('0xcd'),function(){var _0x1878bd=function(){window[_0x0199('0x58')][_0x0199('0x90')]&&(_0x7e8930[_0x0199('0x8e')](),window[_0x0199('0x58')][_0x0199('0x90')]=!0x1,_0x56755b['fn'][_0x0199('0x25')](!0x0),_0x7e8930[_0x0199('0xce')]());};_0x5658e9=setInterval(function(){_0x1878bd();},0x258);_0x1878bd();});_0x56755b(this)['on'](_0x0199('0xcf'),function(){clearInterval(_0x5658e9);});}};var _0x4cd60a=function(_0x5b9f86){_0x5b9f86=_0x56755b(_0x5b9f86);_0x5f5647['texts'][_0x0199('0x53')]=_0x5f5647[_0x0199('0xd0')][_0x0199('0x53')][_0x0199('0xd')](_0x0199('0xd1'),_0x0199('0xd2'));_0x5f5647[_0x0199('0xd0')][_0x0199('0x53')]=_0x5f5647[_0x0199('0xd0')]['cartTotal'][_0x0199('0xd')]('#items',_0x0199('0xd3'));_0x5f5647[_0x0199('0xd0')][_0x0199('0x53')]=_0x5f5647['texts'][_0x0199('0x53')][_0x0199('0xd')](_0x0199('0xd4'),_0x0199('0xd5'));_0x5f5647[_0x0199('0xd0')][_0x0199('0x53')]=_0x5f5647[_0x0199('0xd0')][_0x0199('0x53')][_0x0199('0xd')](_0x0199('0xd6'),_0x0199('0xd7'));_0x5b9f86[_0x0199('0x51')]('.qd-ddc-viewCart')[_0x0199('0x4c')](_0x5f5647['texts'][_0x0199('0xd8')]);_0x5b9f86[_0x0199('0x51')](_0x0199('0xd9'))[_0x0199('0x4c')](_0x5f5647['texts'][_0x0199('0xda')]);_0x5b9f86[_0x0199('0x51')](_0x0199('0xdb'))[_0x0199('0x4c')](_0x5f5647[_0x0199('0xd0')][_0x0199('0xdc')]);_0x5b9f86[_0x0199('0x51')](_0x0199('0xdd'))[_0x0199('0x4c')](_0x5f5647[_0x0199('0xd0')][_0x0199('0x53')]);_0x5b9f86['find']('.qd-ddc-shipping')[_0x0199('0x4c')](_0x5f5647[_0x0199('0xd0')][_0x0199('0xde')]);_0x5b9f86[_0x0199('0x51')](_0x0199('0xdf'))[_0x0199('0x4c')](_0x5f5647['texts'][_0x0199('0x55')]);return _0x5b9f86;}(this[_0x0199('0xe0')]);var _0x19093e=0x0;_0x218881[_0x0199('0x50')](function(){0x0<_0x19093e?_0x38ba7a['call'](this,_0x4cd60a[_0x0199('0xe1')]()):_0x38ba7a[_0x0199('0x27')](this,_0x4cd60a);_0x19093e++;});window[_0x0199('0x36')]['callback'][_0x0199('0x2e')](function(){_0x56755b(_0x0199('0xe2'))[_0x0199('0x4c')](window[_0x0199('0x36')][_0x0199('0x4d')]||'--');_0x56755b(_0x0199('0xe3'))[_0x0199('0x4c')](window[_0x0199('0x36')][_0x0199('0x3d')]||'0');_0x56755b('.qd-ddc-infoTotalShipping')[_0x0199('0x4c')](window['_QuatroDigital_CartData'][_0x0199('0x3b')]||'--');_0x56755b(_0x0199('0xe4'))[_0x0199('0x4c')](window[_0x0199('0x36')][_0x0199('0x3c')]||'--');});var _0x46eed4=function(_0x3637ef,_0x1f87cb){if(_0x0199('0x3')===typeof _0x3637ef[_0x0199('0x3f')])return _0x457936(_0x0199('0xe5'));_0x7e8930[_0x0199('0xe6')][_0x0199('0x27')](this,_0x1f87cb);};_0x7e8930[_0x0199('0x8e')]=function(_0x5a52e1,_0x3b63b1){_0x0199('0x3')!=typeof _0x3b63b1?window[_0x0199('0x58')][_0x0199('0xe7')]=_0x3b63b1:window[_0x0199('0x58')][_0x0199('0xe7')]&&(_0x3b63b1=window[_0x0199('0x58')][_0x0199('0xe7')]);setTimeout(function(){window['_QuatroDigital_DropDown'][_0x0199('0xe7')]=void 0x0;},_0x5f5647[_0x0199('0x8d')]);_0x56755b(_0x0199('0xe8'))[_0x0199('0x8b')](_0x0199('0xe9'));if(_0x5f5647['smartCheckout']){var _0x5658e9=function(_0x514e68){window['_QuatroDigital_DropDown']['getOrderForm']=_0x514e68;_0x46eed4(_0x514e68,_0x3b63b1);'undefined'!==typeof window[_0x0199('0xea')]&&'function'===typeof window[_0x0199('0xea')][_0x0199('0xeb')]&&window[_0x0199('0xea')][_0x0199('0xeb')]['call'](this);_0x56755b(_0x0199('0xe8'))[_0x0199('0x48')]('qd-ddc-prodLoaded');};'undefined'!==typeof window[_0x0199('0x58')][_0x0199('0x26')]?(_0x5658e9(window[_0x0199('0x58')][_0x0199('0x26')]),_0x0199('0xa')===typeof _0x5a52e1&&_0x5a52e1(window[_0x0199('0x58')]['getOrderForm'])):_0x56755b[_0x0199('0x5d')](['items',_0x0199('0x37'),_0x0199('0x5e')],{'done':function(_0x530f42){_0x5658e9[_0x0199('0x27')](this,_0x530f42);_0x0199('0xa')===typeof _0x5a52e1&&_0x5a52e1(_0x530f42);},'fail':function(_0x5aea54){_0x457936(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0x5aea54]);}});}else alert(_0x0199('0xec'));};_0x7e8930['cartIsEmpty']=function(){var _0x48042d=_0x56755b(_0x0199('0xe8'));_0x48042d[_0x0199('0x51')](_0x0199('0xed'))['length']?_0x48042d[_0x0199('0x8b')]('qd-ddc-noItems'):_0x48042d[_0x0199('0x48')](_0x0199('0xee'));};_0x7e8930['renderProductsList']=function(_0x492fcb){var _0x5658e9=_0x56755b(_0x0199('0xef'));_0x5658e9[_0x0199('0xf0')]();_0x5658e9[_0x0199('0x50')](function(){var _0x5658e9=_0x56755b(this),_0x454eb4,_0x273f5f,_0x1e3139=_0x56755b(''),_0x136212;for(_0x136212 in window[_0x0199('0x58')][_0x0199('0x26')][_0x0199('0x3f')])if(_0x0199('0x17')===typeof window[_0x0199('0x58')][_0x0199('0x26')]['items'][_0x136212]){var _0x245a55=window['_QuatroDigital_DropDown']['getOrderForm'][_0x0199('0x3f')][_0x136212];var _0x5b0df4=_0x245a55[_0x0199('0xf1')][_0x0199('0xd')](/^\/|\/$/g,'')[_0x0199('0x7')]('/');var _0x677c49=_0x56755b('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0x677c49[_0x0199('0x87')]({'data-sku':_0x245a55['id'],'data-sku-index':_0x136212,'data-qd-departament':_0x5b0df4[0x0],'data-qd-category':_0x5b0df4[_0x5b0df4['length']-0x1]});_0x677c49[_0x0199('0x48')](_0x0199('0xf2')+_0x245a55[_0x0199('0xf3')]);_0x677c49[_0x0199('0x51')]('.qd-ddc-prodName')[_0x0199('0x7e')](_0x5f5647[_0x0199('0xbb')](_0x245a55));_0x677c49['find'](_0x0199('0xf4'))['append'](isNaN(_0x245a55['sellingPrice'])?_0x245a55[_0x0199('0xf5')]:0x0==_0x245a55[_0x0199('0xf5')]?_0x0199('0xf6'):(_0x56755b(_0x0199('0x33'))[_0x0199('0x87')](_0x0199('0x34'))||'R$')+'\x20'+qd_number_format(_0x245a55[_0x0199('0xf5')]/0x64,0x2,',','.'));_0x677c49[_0x0199('0x51')](_0x0199('0xf7'))[_0x0199('0x87')]({'data-sku':_0x245a55['id'],'data-sku-index':_0x136212})[_0x0199('0xf8')](_0x245a55[_0x0199('0x40')]);_0x677c49[_0x0199('0x51')]('.qd-ddc-remove')[_0x0199('0x87')]({'data-sku':_0x245a55['id'],'data-sku-index':_0x136212});_0x7e8930['insertProdImg'](_0x245a55['id'],_0x677c49['find']('.qd-ddc-image'),_0x245a55[_0x0199('0xf9')]);_0x677c49[_0x0199('0x51')]('.qd-ddc-quantityMore,.qd-ddc-quantityMinus')[_0x0199('0x87')]({'data-sku':_0x245a55['id'],'data-sku-index':_0x136212});_0x677c49[_0x0199('0xfa')](_0x5658e9);_0x1e3139=_0x1e3139[_0x0199('0x2e')](_0x677c49);}try{var _0x2f8706=_0x5658e9['getParent'](_0x0199('0xe8'))[_0x0199('0x51')](_0x0199('0xca'));_0x2f8706[_0x0199('0x8')]&&''==_0x2f8706[_0x0199('0xf8')]()&&window[_0x0199('0x58')][_0x0199('0x26')]['shippingData'][_0x0199('0xfb')]&&_0x2f8706['val'](window['_QuatroDigital_DropDown'][_0x0199('0x26')]['shippingData'][_0x0199('0xfb')][_0x0199('0xfc')]);}catch(_0xcbf886){_0x457936(_0x0199('0xfd')+_0xcbf886[_0x0199('0x23')],_0x0199('0x6c'));}_0x7e8930[_0x0199('0xfe')](_0x5658e9);_0x7e8930[_0x0199('0xce')]();_0x492fcb&&_0x492fcb[_0x0199('0xff')]&&function(){_0x273f5f=_0x1e3139[_0x0199('0x45')](_0x0199('0x100')+_0x492fcb[_0x0199('0xff')]+'\x27]');_0x273f5f[_0x0199('0x8')]&&(_0x454eb4=0x0,_0x1e3139[_0x0199('0x50')](function(){var _0x492fcb=_0x56755b(this);if(_0x492fcb['is'](_0x273f5f))return!0x1;_0x454eb4+=_0x492fcb[_0x0199('0x101')]();}),_0x7e8930[_0x0199('0xc9')](void 0x0,void 0x0,_0x454eb4,_0x5658e9[_0x0199('0x2e')](_0x5658e9[_0x0199('0xa6')]())),_0x1e3139['removeClass'](_0x0199('0x102')),function(_0x29a6a5){_0x29a6a5[_0x0199('0x48')](_0x0199('0x103'));_0x29a6a5[_0x0199('0x48')]('qd-ddc-lastAddedFixed');setTimeout(function(){_0x29a6a5[_0x0199('0x8b')](_0x0199('0x103'));},_0x5f5647[_0x0199('0x8d')]);}(_0x273f5f));}();});(function(){_QuatroDigital_DropDown[_0x0199('0x26')][_0x0199('0x3f')][_0x0199('0x8')]?(_0x56755b(_0x0199('0x70'))[_0x0199('0x8b')](_0x0199('0x104'))[_0x0199('0x48')](_0x0199('0x105')),setTimeout(function(){_0x56755b(_0x0199('0x70'))['removeClass'](_0x0199('0x106'));},_0x5f5647[_0x0199('0x8d')])):_0x56755b('body')[_0x0199('0x8b')](_0x0199('0x107'))[_0x0199('0x48')](_0x0199('0x104'));}());_0x0199('0xa')===typeof _0x5f5647['callbackProductsList']?_0x5f5647['callbackProductsList'][_0x0199('0x27')](this):_0x457936(_0x0199('0x108'));};_0x7e8930[_0x0199('0x109')]=function(_0x2f3910,_0xf9247c,_0x5adbf2){function _0x3381e7(){_0xf9247c[_0x0199('0x8b')](_0x0199('0x10a'))['load'](function(){_0x56755b(this)[_0x0199('0x48')](_0x0199('0x10a'));})[_0x0199('0x87')]('src',_0x5adbf2);}_0x5adbf2?_0x3381e7():isNaN(_0x2f3910)?_0x457936(_0x0199('0x10b'),_0x0199('0x2a')):alert(_0x0199('0x10c'));};_0x7e8930['actionButtons']=function(_0x21f1c2){var _0x46dedb=function(_0x2d3b8c,_0x417ae7){var _0x5658e9=_0x56755b(_0x2d3b8c);var _0x155be7=_0x5658e9['attr'](_0x0199('0x10d'));var _0x454eb4=_0x5658e9[_0x0199('0x87')](_0x0199('0x10e'));if(_0x155be7){var _0x3593c7=parseInt(_0x5658e9[_0x0199('0xf8')]())||0x1;_0x7e8930['changeQantity']([_0x155be7,_0x454eb4],_0x3593c7,_0x3593c7+0x1,function(_0x36966e){_0x5658e9[_0x0199('0xf8')](_0x36966e);'function'===typeof _0x417ae7&&_0x417ae7();});}};var _0x5658e9=function(_0x57fa25,_0x540576){var _0x5658e9=_0x56755b(_0x57fa25);var _0x3697f5=_0x5658e9['attr'](_0x0199('0x10d'));var _0x454eb4=_0x5658e9[_0x0199('0x87')]('data-sku-index');if(_0x3697f5){var _0xe21188=parseInt(_0x5658e9[_0x0199('0xf8')]())||0x2;_0x7e8930[_0x0199('0x10f')]([_0x3697f5,_0x454eb4],_0xe21188,_0xe21188-0x1,function(_0x127b41){_0x5658e9[_0x0199('0xf8')](_0x127b41);_0x0199('0xa')===typeof _0x540576&&_0x540576();});}};var _0x5ea9c8=function(_0x1f8552,_0x2f003b){var _0x5658e9=_0x56755b(_0x1f8552);var _0x242f94=_0x5658e9[_0x0199('0x87')](_0x0199('0x10d'));var _0x454eb4=_0x5658e9[_0x0199('0x87')](_0x0199('0x10e'));if(_0x242f94){var _0x2a2d79=parseInt(_0x5658e9['val']())||0x1;_0x7e8930[_0x0199('0x10f')]([_0x242f94,_0x454eb4],0x1,_0x2a2d79,function(_0x2e86f4){_0x5658e9[_0x0199('0xf8')](_0x2e86f4);'function'===typeof _0x2f003b&&_0x2f003b();});}};var _0x454eb4=_0x21f1c2['find'](_0x0199('0x110'));_0x454eb4[_0x0199('0x48')](_0x0199('0x111'))[_0x0199('0x50')](function(){var _0x21f1c2=_0x56755b(this);_0x21f1c2[_0x0199('0x51')](_0x0199('0x112'))['on']('click.qd_ddc_more',function(_0x3cc354){_0x3cc354[_0x0199('0x77')]();_0x454eb4[_0x0199('0x48')](_0x0199('0x113'));_0x46dedb(_0x21f1c2[_0x0199('0x51')](_0x0199('0xf7')),function(){_0x454eb4[_0x0199('0x8b')]('qd-loading');});});_0x21f1c2[_0x0199('0x51')](_0x0199('0x114'))['on'](_0x0199('0x115'),function(_0x358b0b){_0x358b0b[_0x0199('0x77')]();_0x454eb4['addClass'](_0x0199('0x113'));_0x5658e9(_0x21f1c2[_0x0199('0x51')](_0x0199('0xf7')),function(){_0x454eb4[_0x0199('0x8b')](_0x0199('0x113'));});});_0x21f1c2['find'](_0x0199('0xf7'))['on'](_0x0199('0x116'),function(){_0x454eb4[_0x0199('0x48')](_0x0199('0x113'));_0x5ea9c8(this,function(){_0x454eb4['removeClass'](_0x0199('0x113'));});});_0x21f1c2[_0x0199('0x51')](_0x0199('0xf7'))['on'](_0x0199('0x117'),function(_0x34de42){0xd==_0x34de42[_0x0199('0xc5')]&&(_0x454eb4[_0x0199('0x48')]('qd-loading'),_0x5ea9c8(this,function(){_0x454eb4[_0x0199('0x8b')]('qd-loading');}));});});_0x21f1c2[_0x0199('0x51')](_0x0199('0xed'))[_0x0199('0x50')](function(){var _0x21f1c2=_0x56755b(this);_0x21f1c2[_0x0199('0x51')]('.qd-ddc-remove')['on'](_0x0199('0x118'),function(){_0x21f1c2[_0x0199('0x48')](_0x0199('0x113'));_0x7e8930[_0x0199('0x119')](_0x56755b(this),function(_0x63bc5d){_0x63bc5d?_0x21f1c2[_0x0199('0x11a')](!0x0)[_0x0199('0x11b')](function(){_0x21f1c2[_0x0199('0x11c')]();_0x7e8930['cartIsEmpty']();}):_0x21f1c2[_0x0199('0x8b')](_0x0199('0x113'));});return!0x1;});});};_0x7e8930[_0x0199('0x11d')]=function(_0x174a73){var _0x267a00=_0x174a73['val'](),_0x267a00=_0x267a00['replace'](/[^0-9\-]/g,''),_0x267a00=_0x267a00[_0x0199('0xd')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3'),_0x267a00=_0x267a00[_0x0199('0xd')](/(.{9}).*/g,'$1');_0x174a73[_0x0199('0xf8')](_0x267a00);0x9<=_0x267a00[_0x0199('0x8')]&&(_0x174a73[_0x0199('0x18')](_0x0199('0x11e'))!=_0x267a00&&_0x2dcaf8['calculateShipping']({'postalCode':_0x267a00,'country':_0x0199('0x11f')})[_0x0199('0x1d')](function(_0xbdce92){window['_QuatroDigital_DropDown'][_0x0199('0x26')]=_0xbdce92;_0x7e8930[_0x0199('0x8e')]();})['fail'](function(_0x2a084f){_0x457936([_0x0199('0x120'),_0x2a084f]);updateCartData();}),_0x174a73[_0x0199('0x18')](_0x0199('0x11e'),_0x267a00));};_0x7e8930['changeQantity']=function(_0x537718,_0x423b42,_0x5755c0,_0x2727e8){function _0x85126c(_0x429090){_0x429090=_0x0199('0x121')!==typeof _0x429090?!0x1:_0x429090;_0x7e8930[_0x0199('0x8e')]();window[_0x0199('0x58')]['allowUpdate']=!0x1;_0x7e8930[_0x0199('0xce')]();'undefined'!==typeof window[_0x0199('0xea')]&&'function'===typeof window[_0x0199('0xea')][_0x0199('0xeb')]&&window[_0x0199('0xea')][_0x0199('0xeb')][_0x0199('0x27')](this);'function'===typeof adminCart&&adminCart();_0x56755b['fn'][_0x0199('0x25')](!0x0,void 0x0,_0x429090);_0x0199('0xa')===typeof _0x2727e8&&_0x2727e8(_0x423b42);}_0x5755c0=_0x5755c0||0x1;if(0x1>_0x5755c0)return _0x423b42;if(_0x5f5647[_0x0199('0x57')]){if(_0x0199('0x3')===typeof window['_QuatroDigital_DropDown'][_0x0199('0x26')][_0x0199('0x3f')][_0x537718[0x1]])return _0x457936(_0x0199('0x122')+_0x537718[0x1]+']'),_0x423b42;window[_0x0199('0x58')][_0x0199('0x26')][_0x0199('0x3f')][_0x537718[0x1]][_0x0199('0x40')]=_0x5755c0;window[_0x0199('0x58')][_0x0199('0x26')][_0x0199('0x3f')][_0x537718[0x1]]['index']=_0x537718[0x1];_0x2dcaf8['updateItems']([window['_QuatroDigital_DropDown'][_0x0199('0x26')]['items'][_0x537718[0x1]]],['items','totalizers',_0x0199('0x5e')])[_0x0199('0x1d')](function(_0x52c4cb){window[_0x0199('0x58')][_0x0199('0x26')]=_0x52c4cb;_0x85126c(!0x0);})[_0x0199('0x1f')](function(_0xda340){_0x457936([_0x0199('0x123'),_0xda340]);_0x85126c();});}else _0x457936(_0x0199('0x124'));};_0x7e8930[_0x0199('0x119')]=function(_0x1d406e,_0x42c050){function _0x3e6f0d(_0x49438d){_0x49438d=_0x0199('0x121')!==typeof _0x49438d?!0x1:_0x49438d;'undefined'!==typeof window['_QuatroDigital_AmountProduct']&&'function'===typeof window['_QuatroDigital_AmountProduct']['exec']&&window['_QuatroDigital_AmountProduct'][_0x0199('0xeb')]['call'](this);_0x0199('0xa')===typeof adminCart&&adminCart();_0x56755b['fn']['simpleCart'](!0x0,void 0x0,_0x49438d);_0x0199('0xa')===typeof _0x42c050&&_0x42c050(_0x454eb4);}var _0x454eb4=!0x1,_0x53993f=_0x56755b(_0x1d406e)[_0x0199('0x87')](_0x0199('0x10e'));if(_0x5f5647['smartCheckout']){if(_0x0199('0x3')===typeof window[_0x0199('0x58')][_0x0199('0x26')][_0x0199('0x3f')][_0x53993f])return _0x457936(_0x0199('0x122')+_0x53993f+']'),_0x454eb4;window[_0x0199('0x58')][_0x0199('0x26')][_0x0199('0x3f')][_0x53993f][_0x0199('0x125')]=_0x53993f;_0x2dcaf8[_0x0199('0x126')]([window['_QuatroDigital_DropDown'][_0x0199('0x26')][_0x0199('0x3f')][_0x53993f]],['items',_0x0199('0x37'),_0x0199('0x5e')])[_0x0199('0x1d')](function(_0x3535a4){_0x454eb4=!0x0;window['_QuatroDigital_DropDown'][_0x0199('0x26')]=_0x3535a4;_0x46eed4(_0x3535a4);_0x3e6f0d(!0x0);})[_0x0199('0x1f')](function(_0x4a47f8){_0x457936([_0x0199('0x127'),_0x4a47f8]);_0x3e6f0d();});}else alert(_0x0199('0x128'));};_0x7e8930[_0x0199('0xc9')]=function(_0x58c2ac,_0x423265,_0x35836e,_0x27c749){_0x27c749=_0x27c749||_0x56755b(_0x0199('0x129'));_0x58c2ac=_0x58c2ac||'+';_0x423265=_0x423265||0.9*_0x27c749[_0x0199('0x12a')]();_0x27c749[_0x0199('0x11a')](!0x0,!0x0)[_0x0199('0x12b')]({'scrollTop':isNaN(_0x35836e)?_0x58c2ac+'='+_0x423265+'px':_0x35836e});};_0x5f5647[_0x0199('0xcc')]||(_0x7e8930[_0x0199('0x8e')](),_0x56755b['fn'][_0x0199('0x25')](!0x0));_0x56755b(window)['on'](_0x0199('0x12c'),function(){try{window[_0x0199('0x58')][_0x0199('0x26')]=void 0x0,_0x7e8930[_0x0199('0x8e')]();}catch(_0x161cf0){_0x457936('Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20'+_0x161cf0['message'],_0x0199('0x12d'));}});_0x0199('0xa')===typeof _0x5f5647['callback']?_0x5f5647[_0x0199('0x41')]['call'](this):_0x457936(_0x0199('0xa9'));};_0x56755b['fn']['QD_dropDownCart']=function(_0x4ad0aa){var _0x403914=_0x56755b(this);_0x403914['fn']=new _0x56755b['QD_dropDownCart'](this,_0x4ad0aa);return _0x403914;};}catch(_0x3c0a2e){_0x0199('0x3')!==typeof console&&_0x0199('0xa')===typeof console[_0x0199('0x14')]&&console[_0x0199('0x14')](_0x0199('0x66'),_0x3c0a2e);}}(this));(function(_0x2d410d){try{var _0x2d4b05=jQuery;window[_0x0199('0xea')]=window[_0x0199('0xea')]||{};window[_0x0199('0xea')][_0x0199('0x3f')]={};window[_0x0199('0xea')][_0x0199('0x12e')]=!0x1;window['_QuatroDigital_AmountProduct'][_0x0199('0x12f')]=!0x1;window[_0x0199('0xea')][_0x0199('0x130')]=!0x1;var _0x2a7386=function(){if(window[_0x0199('0xea')]['allowRecalculate']){var _0x34cef1=!0x1;var _0x2d410d={};window[_0x0199('0xea')][_0x0199('0x3f')]={};for(_0x528c20 in window[_0x0199('0x58')][_0x0199('0x26')][_0x0199('0x3f')])if(_0x0199('0x17')===typeof window[_0x0199('0x58')]['getOrderForm'][_0x0199('0x3f')][_0x528c20]){var _0x15c099=window[_0x0199('0x58')][_0x0199('0x26')][_0x0199('0x3f')][_0x528c20];_0x0199('0x3')!==typeof _0x15c099['productId']&&null!==_0x15c099[_0x0199('0x131')]&&''!==_0x15c099[_0x0199('0x131')]&&(window[_0x0199('0xea')]['items'][_0x0199('0x132')+_0x15c099[_0x0199('0x131')]]=window[_0x0199('0xea')]['items'][_0x0199('0x132')+_0x15c099[_0x0199('0x131')]]||{},window[_0x0199('0xea')][_0x0199('0x3f')]['prod_'+_0x15c099['productId']]['prodId']=_0x15c099[_0x0199('0x131')],_0x2d410d[_0x0199('0x132')+_0x15c099[_0x0199('0x131')]]||(window[_0x0199('0xea')][_0x0199('0x3f')][_0x0199('0x132')+_0x15c099[_0x0199('0x131')]][_0x0199('0x3d')]=0x0),window['_QuatroDigital_AmountProduct']['items'][_0x0199('0x132')+_0x15c099[_0x0199('0x131')]]['qtt']+=_0x15c099[_0x0199('0x40')],_0x34cef1=!0x0,_0x2d410d[_0x0199('0x132')+_0x15c099[_0x0199('0x131')]]=!0x0);}var _0x528c20=_0x34cef1;}else _0x528c20=void 0x0;window[_0x0199('0xea')]['allowRecalculate']&&(_0x2d4b05(_0x0199('0x133'))[_0x0199('0x11c')](),_0x2d4b05(_0x0199('0x134'))[_0x0199('0x8b')](_0x0199('0x135')));for(var _0x3e9cf in window['_QuatroDigital_AmountProduct'][_0x0199('0x3f')]){_0x15c099=window['_QuatroDigital_AmountProduct'][_0x0199('0x3f')][_0x3e9cf];if(_0x0199('0x17')!==typeof _0x15c099)return;_0x2d410d=_0x2d4b05(_0x0199('0x136')+_0x15c099[_0x0199('0x137')]+']')[_0x0199('0x0')]('li');if(window[_0x0199('0xea')][_0x0199('0x12e')]||!_0x2d410d[_0x0199('0x51')](_0x0199('0x133'))[_0x0199('0x8')])_0x34cef1=_0x2d4b05(_0x0199('0x138')),_0x34cef1['find'](_0x0199('0x139'))['html'](_0x15c099['qtt']),_0x15c099=_0x2d410d[_0x0199('0x51')](_0x0199('0x13a')),_0x15c099[_0x0199('0x8')]?_0x15c099[_0x0199('0xaa')](_0x34cef1)[_0x0199('0x48')](_0x0199('0x135')):_0x2d410d['prepend'](_0x34cef1);}_0x528c20&&(window[_0x0199('0xea')][_0x0199('0x12e')]=!0x1);};window[_0x0199('0xea')][_0x0199('0xeb')]=function(){window[_0x0199('0xea')][_0x0199('0x12e')]=!0x0;_0x2a7386[_0x0199('0x27')](this);};_0x2d4b05(document)['ajaxStop'](function(){_0x2a7386[_0x0199('0x27')](this);});}catch(_0x419d86){'undefined'!==typeof console&&_0x0199('0xa')===typeof console[_0x0199('0x14')]&&console[_0x0199('0x14')](_0x0199('0x66'),_0x419d86);}}(this));(function(){try{var _0x3ebfca=jQuery,_0x257a3f,_0x10837f={'selector':_0x0199('0x13b'),'dropDown':{},'buyButton':{}};_0x3ebfca[_0x0199('0x13c')]=function(_0x38ae2d){var _0x402fc8={};_0x257a3f=_0x3ebfca[_0x0199('0x15')](!0x0,{},_0x10837f,_0x38ae2d);_0x38ae2d=_0x3ebfca(_0x257a3f[_0x0199('0x82')])[_0x0199('0xb0')](_0x257a3f['dropDown']);_0x402fc8['buyButton']=_0x0199('0x3')!==typeof _0x257a3f[_0x0199('0x13d')][_0x0199('0xcc')]&&!0x1===_0x257a3f[_0x0199('0x13d')][_0x0199('0xcc')]?_0x3ebfca(_0x257a3f[_0x0199('0x82')])[_0x0199('0x73')](_0x38ae2d['fn'],_0x257a3f[_0x0199('0x79')]):_0x3ebfca(_0x257a3f[_0x0199('0x82')])[_0x0199('0x73')](_0x257a3f['buyButton']);_0x402fc8[_0x0199('0x13d')]=_0x38ae2d;return _0x402fc8;};_0x3ebfca['fn'][_0x0199('0x13e')]=function(){'object'===typeof console&&_0x0199('0xa')===typeof console[_0x0199('0x2d')]&&console[_0x0199('0x2d')]('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x3ebfca[_0x0199('0x13e')]=_0x3ebfca['fn'][_0x0199('0x13e')];}catch(_0x443d48){'undefined'!==typeof console&&'function'===typeof console[_0x0199('0x14')]&&console[_0x0199('0x14')](_0x0199('0x66'),_0x443d48);}}());

/* Quatro Digital - Smart Stock Available */
var _0x0565=['call','error','complete','callbackFns','boolean','successPopulated','errorPopulated','completePopulated','object','parameters','clearQueueDelay','jqXHR','ajax','readyState','data','textStatus','errorThrown','version','2.1','Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available','unshift','undefined','alerta','toLowerCase','aviso','info','apply','warn','length','addClass','qd-ssa-sku-no-selected','qd-ssa-skus-','split','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','message','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','QuatroDigital.ssa.prodUnavailable','qd-ssa-sku-prod-unavailable','hide','qd-ssa-sku-selected','SkuSellersInformation','AvailableQuantity','attr','find','qd-ssa-show','qd-ssa-hide','removeClass','html','replace','#qtt','show','skus','trigger','vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','join','toUpperCase','ite','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','/produto/sku/','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','qdPlugin','initialSkuSelected','QuatroDigital.ssa.skuSelected','QD_smartStockAvailable','prod','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','unavailable','vtex.sku.selected.QD','vtex.sku.selectable','off','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','function','qdAjax','qdAjaxQueue','extend','opts','push','success'];(function(_0xb01882,_0x2322a4){var _0xb84f85=function(_0x440cf0){while(--_0x440cf0){_0xb01882['push'](_0xb01882['shift']());}};_0xb84f85(++_0x2322a4);}(_0x0565,0xf2));var _0x5056=function(_0x4c12ec,_0x2e9103){_0x4c12ec=_0x4c12ec-0x0;var _0x3ae42c=_0x0565[_0x4c12ec];return _0x3ae42c;};(function(_0x55896b){if(_0x5056('0x0')!==typeof _0x55896b[_0x5056('0x1')]){var _0x2e0694={};_0x55896b[_0x5056('0x2')]=_0x2e0694;_0x55896b[_0x5056('0x1')]=function(_0xd4624d){var _0x300055,_0x3657a8;_0x300055=_0x55896b[_0x5056('0x3')]({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0xd4624d);_0x3657a8=escape(encodeURIComponent(_0x300055['url']));_0x2e0694[_0x3657a8]=_0x2e0694[_0x3657a8]||{};_0x2e0694[_0x3657a8][_0x5056('0x4')]=_0x2e0694[_0x3657a8][_0x5056('0x4')]||[];_0x2e0694[_0x3657a8][_0x5056('0x4')][_0x5056('0x5')]({'success':function(_0x4b8280,_0x52b01f,_0x38f74){_0x300055[_0x5056('0x6')][_0x5056('0x7')](this,_0x4b8280,_0x52b01f,_0x38f74);},'error':function(_0x2e6f18,_0x2144a9,_0x68efb2){_0x300055[_0x5056('0x8')][_0x5056('0x7')](this,_0x2e6f18,_0x2144a9,_0x68efb2);},'complete':function(_0x5d2e60,_0x78f7e4){_0x300055[_0x5056('0x9')][_0x5056('0x7')](this,_0x5d2e60,_0x78f7e4);}});_0x2e0694[_0x3657a8]['parameters']=_0x2e0694[_0x3657a8]['parameters']||{'success':{},'error':{},'complete':{}};_0x2e0694[_0x3657a8][_0x5056('0xa')]=_0x2e0694[_0x3657a8]['callbackFns']||{};_0x2e0694[_0x3657a8]['callbackFns']['successPopulated']=_0x5056('0xb')===typeof _0x2e0694[_0x3657a8]['callbackFns'][_0x5056('0xc')]?_0x2e0694[_0x3657a8][_0x5056('0xa')][_0x5056('0xc')]:!0x1;_0x2e0694[_0x3657a8]['callbackFns'][_0x5056('0xd')]=_0x5056('0xb')===typeof _0x2e0694[_0x3657a8][_0x5056('0xa')][_0x5056('0xd')]?_0x2e0694[_0x3657a8][_0x5056('0xa')][_0x5056('0xd')]:!0x1;_0x2e0694[_0x3657a8]['callbackFns'][_0x5056('0xe')]='boolean'===typeof _0x2e0694[_0x3657a8][_0x5056('0xa')][_0x5056('0xe')]?_0x2e0694[_0x3657a8][_0x5056('0xa')][_0x5056('0xe')]:!0x1;_0xd4624d=_0x55896b[_0x5056('0x3')]({},_0x300055,{'success':function(_0x51b21e,_0x9ea88,_0x56537e){_0x2e0694[_0x3657a8]['parameters']['success']={'data':_0x51b21e,'textStatus':_0x9ea88,'jqXHR':_0x56537e};_0x2e0694[_0x3657a8][_0x5056('0xa')][_0x5056('0xc')]=!0x0;for(var _0x55896b in _0x2e0694[_0x3657a8][_0x5056('0x4')])_0x5056('0xf')===typeof _0x2e0694[_0x3657a8][_0x5056('0x4')][_0x55896b]&&(_0x2e0694[_0x3657a8][_0x5056('0x4')][_0x55896b]['success'][_0x5056('0x7')](this,_0x51b21e,_0x9ea88,_0x56537e),_0x2e0694[_0x3657a8][_0x5056('0x4')][_0x55896b]['success']=function(){});},'error':function(_0x271efc,_0x1bccef,_0x2564d0){_0x2e0694[_0x3657a8]['parameters'][_0x5056('0x8')]={'errorThrown':_0x2564d0,'textStatus':_0x1bccef,'jqXHR':_0x271efc};_0x2e0694[_0x3657a8][_0x5056('0xa')]['errorPopulated']=!0x0;for(var _0xd4624d in _0x2e0694[_0x3657a8][_0x5056('0x4')])_0x5056('0xf')===typeof _0x2e0694[_0x3657a8][_0x5056('0x4')][_0xd4624d]&&(_0x2e0694[_0x3657a8][_0x5056('0x4')][_0xd4624d]['error'][_0x5056('0x7')](this,_0x271efc,_0x1bccef,_0x2564d0),_0x2e0694[_0x3657a8][_0x5056('0x4')][_0xd4624d]['error']=function(){});},'complete':function(_0x2c4290,_0x505ccf){_0x2e0694[_0x3657a8][_0x5056('0x10')][_0x5056('0x9')]={'textStatus':_0x505ccf,'jqXHR':_0x2c4290};_0x2e0694[_0x3657a8][_0x5056('0xa')][_0x5056('0xe')]=!0x0;for(var _0x45f600 in _0x2e0694[_0x3657a8]['opts'])_0x5056('0xf')===typeof _0x2e0694[_0x3657a8][_0x5056('0x4')][_0x45f600]&&(_0x2e0694[_0x3657a8][_0x5056('0x4')][_0x45f600][_0x5056('0x9')]['call'](this,_0x2c4290,_0x505ccf),_0x2e0694[_0x3657a8][_0x5056('0x4')][_0x45f600]['complete']=function(){});isNaN(parseInt(_0x300055[_0x5056('0x11')]))||setTimeout(function(){_0x2e0694[_0x3657a8]['jqXHR']=void 0x0;_0x2e0694[_0x3657a8]['opts']=void 0x0;_0x2e0694[_0x3657a8]['parameters']=void 0x0;_0x2e0694[_0x3657a8][_0x5056('0xa')]=void 0x0;},_0x300055[_0x5056('0x11')]);}});'undefined'===typeof _0x2e0694[_0x3657a8][_0x5056('0x12')]?_0x2e0694[_0x3657a8][_0x5056('0x12')]=_0x55896b[_0x5056('0x13')](_0xd4624d):_0x2e0694[_0x3657a8][_0x5056('0x12')]&&_0x2e0694[_0x3657a8][_0x5056('0x12')][_0x5056('0x14')]&&0x4==_0x2e0694[_0x3657a8][_0x5056('0x12')][_0x5056('0x14')]&&(_0x2e0694[_0x3657a8][_0x5056('0xa')][_0x5056('0xc')]&&_0xd4624d[_0x5056('0x6')](_0x2e0694[_0x3657a8]['parameters']['success'][_0x5056('0x15')],_0x2e0694[_0x3657a8][_0x5056('0x10')]['success'][_0x5056('0x16')],_0x2e0694[_0x3657a8][_0x5056('0x10')]['success'][_0x5056('0x12')]),_0x2e0694[_0x3657a8][_0x5056('0xa')][_0x5056('0xd')]&&_0xd4624d[_0x5056('0x8')](_0x2e0694[_0x3657a8][_0x5056('0x10')][_0x5056('0x8')][_0x5056('0x12')],_0x2e0694[_0x3657a8][_0x5056('0x10')][_0x5056('0x8')][_0x5056('0x16')],_0x2e0694[_0x3657a8][_0x5056('0x10')][_0x5056('0x8')][_0x5056('0x17')]),_0x2e0694[_0x3657a8][_0x5056('0xa')][_0x5056('0xe')]&&_0xd4624d['complete'](_0x2e0694[_0x3657a8][_0x5056('0x10')]['complete'][_0x5056('0x12')],_0x2e0694[_0x3657a8][_0x5056('0x10')][_0x5056('0x9')][_0x5056('0x16')]));};_0x55896b['qdAjax'][_0x5056('0x18')]=_0x5056('0x19');}}(jQuery));(function(_0x50d494){'use strict';var _0xb8c4e0=jQuery;if(typeof _0xb8c4e0['fn']['QD_smartStockAvailable']===_0x5056('0x0'))return;var _0x349318=_0x5056('0x1a');var _0x502732=function(_0x185489,_0x16a940){if(_0x5056('0xf')===typeof console){var _0x4424f2;_0x5056('0xf')===typeof _0x185489?(_0x185489[_0x5056('0x1b')]('['+_0x349318+']\x0a'),_0x4424f2=_0x185489):_0x4424f2=['['+_0x349318+']\x0a'+_0x185489];_0x5056('0x1c')===typeof _0x16a940||_0x5056('0x1d')!==_0x16a940[_0x5056('0x1e')]()&&_0x5056('0x1f')!==_0x16a940[_0x5056('0x1e')]()?_0x5056('0x1c')!==typeof _0x16a940&&_0x5056('0x20')===_0x16a940[_0x5056('0x1e')]()?console[_0x5056('0x20')][_0x5056('0x21')](console,_0x4424f2):console['error']['apply'](console,_0x4424f2):console[_0x5056('0x22')][_0x5056('0x21')](console,_0x4424f2);}};var _0x6946b4={};var _0x3a76d2=function(_0x2f900b,_0x1e2693){if(!_0x2f900b[_0x5056('0x23')])return;_0x2f900b[_0x5056('0x24')]('qd-ssa-on');_0x2f900b['addClass'](_0x5056('0x25'));try{_0x2f900b[_0x5056('0x24')](_0x5056('0x26')+vtxctx['skus'][_0x5056('0x27')](';')['length']);}catch(_0x285fee){_0x502732([_0x5056('0x28'),_0x285fee[_0x5056('0x29')]]);}_0xb8c4e0(window)['on'](_0x5056('0x2a'),function(_0x2fae79,_0x332f2a,_0x47ad61){try{_0x20ea8b(_0x47ad61[_0x5056('0x2b')],function(_0x2ab162){_0x222dd2(_0x2ab162);_0x5bf887(_0x2ab162);});}catch(_0x10b193){_0x502732(['Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20',_0x10b193['message']]);}});_0xb8c4e0(window)['off']('vtex.sku.selected.QD');_0xb8c4e0(window)['on'](_0x5056('0x2c'),function(){_0x2f900b[_0x5056('0x24')](_0x5056('0x2d'))[_0x5056('0x2e')]();});function _0x222dd2(_0x5985e2){try{_0x2f900b['removeClass'](_0x5056('0x25'))[_0x5056('0x24')](_0x5056('0x2f'));var _0x452dd7=_0x5985e2[0x0][_0x5056('0x30')][0x0][_0x5056('0x31')];_0x2f900b[_0x5056('0x32')]('data-qd-ssa-qtt',_0x452dd7);_0x2f900b['each'](function(){var _0x14e3f5=_0xb8c4e0(this)[_0x5056('0x33')]('[data-qd-ssa-text]');if(_0x452dd7<0x1)return _0x14e3f5[_0x5056('0x2e')]()[_0x5056('0x24')]('qd-ssa-hide')['removeClass'](_0x5056('0x34'));var _0x1ab1a9=_0x14e3f5['filter']('[data-qd-ssa-text=\x22'+_0x452dd7+'\x22]');var _0x460c5c=_0x1ab1a9[_0x5056('0x23')]?_0x1ab1a9:_0x14e3f5['filter']('[data-qd-ssa-text=\x22default\x22]');_0x14e3f5[_0x5056('0x2e')]()[_0x5056('0x24')](_0x5056('0x35'))[_0x5056('0x36')](_0x5056('0x34'));_0x460c5c[_0x5056('0x37')](_0x460c5c[_0x5056('0x37')]()[_0x5056('0x38')](_0x5056('0x39'),_0x452dd7));_0x460c5c[_0x5056('0x3a')]()[_0x5056('0x24')](_0x5056('0x34'))[_0x5056('0x36')](_0x5056('0x35'));});}catch(_0x34e86e){_0x502732(['Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20',_0x34e86e['message']]);}};function _0x5bf887(_0xb1fd25){if(vtxctx[_0x5056('0x3b')][_0x5056('0x27')](';')[_0x5056('0x23')]===0x1&&_0xb1fd25[0x0][_0x5056('0x30')][0x0]['AvailableQuantity']==0x0)_0xb8c4e0(window)[_0x5056('0x3c')](_0x5056('0x2c'));};};var _0x41dba4=function(_0x3d22cc){var _0x1ff74a={'i':_0x5056('0x3d')};return function(_0x26fe1c){var _0x1b60f7,_0x3a0959,_0x2932b1,_0x164c48;_0x3a0959=function(_0x43d582){return _0x43d582;};_0x2932b1=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x26fe1c=_0x26fe1c['d'+_0x2932b1[0x10]+'c'+_0x2932b1[0x11]+'m'+_0x3a0959(_0x2932b1[0x1])+'n'+_0x2932b1[0xd]]['l'+_0x2932b1[0x12]+'c'+_0x2932b1[0x0]+'ti'+_0x3a0959('o')+'n'];_0x1b60f7=function(_0x3b90b2){return escape(encodeURIComponent(_0x3b90b2['replace'](/\./g,'¨')[_0x5056('0x38')](/[a-zA-Z]/g,function(_0x229e38){return String[_0x5056('0x3e')](('Z'>=_0x229e38?0x5a:0x7a)>=(_0x229e38=_0x229e38['charCodeAt'](0x0)+0xd)?_0x229e38:_0x229e38-0x1a);})));};var _0x1d4fe2=_0x1b60f7(_0x26fe1c[[_0x2932b1[0x9],_0x3a0959('o'),_0x2932b1[0xc],_0x2932b1[_0x3a0959(0xd)]][_0x5056('0x3f')]('')]);_0x1b60f7=_0x1b60f7((window[['js',_0x3a0959('no'),'m',_0x2932b1[0x1],_0x2932b1[0x4][_0x5056('0x40')](),_0x5056('0x41')]['join']('')]||'---')+['.v',_0x2932b1[0xd],'e',_0x3a0959('x'),'co',_0x3a0959('mm'),'erc',_0x2932b1[0x1],'.c',_0x3a0959('o'),'m.',_0x2932b1[0x13],'r'][_0x5056('0x3f')](''));for(var _0x55ae24 in _0x1ff74a){if(_0x1b60f7===_0x55ae24+_0x1ff74a[_0x55ae24]||_0x1d4fe2===_0x55ae24+_0x1ff74a[_0x55ae24]){_0x164c48='tr'+_0x2932b1[0x11]+'e';break;}_0x164c48='f'+_0x2932b1[0x0]+'ls'+_0x3a0959(_0x2932b1[0x1])+'';}_0x3a0959=!0x1;-0x1<_0x26fe1c[[_0x2932b1[0xc],'e',_0x2932b1[0x0],'rc',_0x2932b1[0x9]][_0x5056('0x3f')]('')][_0x5056('0x42')](_0x5056('0x43'))&&(_0x3a0959=!0x0);return[_0x164c48,_0x3a0959];}(_0x3d22cc);}(window);if(!eval(_0x41dba4[0x0]))return _0x41dba4[0x1]?_0x502732(_0x5056('0x44')):!0x1;function _0x20ea8b(_0x19371d,_0x5330b4){_0xb8c4e0['qdAjax']({'url':_0x5056('0x45')+_0x19371d,'clearQueueDelay':null,'success':_0x5330b4,'error':function(){_0x502732(_0x5056('0x46'));}});};_0xb8c4e0['fn']['QD_smartStockAvailable']=function(_0x1602ad){var _0x1afebc=_0xb8c4e0(this);var _0x475fa9=_0xb8c4e0[_0x5056('0x3')](!![],{},_0x6946b4,_0x1602ad);_0x1afebc[_0x5056('0x47')]=new _0x3a76d2(_0x1afebc,_0x475fa9);try{if(typeof _0xb8c4e0['fn']['QD_smartStockAvailable'][_0x5056('0x48')]===_0x5056('0xf'))_0xb8c4e0(window)['trigger'](_0x5056('0x49'),[_0xb8c4e0['fn'][_0x5056('0x4a')][_0x5056('0x48')][_0x5056('0x4b')],_0xb8c4e0['fn'][_0x5056('0x4a')][_0x5056('0x48')][_0x5056('0x2b')]]);}catch(_0xc5038b){_0x502732([_0x5056('0x4c'),_0xc5038b[_0x5056('0x29')]]);}if(_0xb8c4e0['fn'][_0x5056('0x4a')][_0x5056('0x4d')])_0xb8c4e0(window)[_0x5056('0x3c')]('QuatroDigital.ssa.prodUnavailable');return _0x1afebc;};_0xb8c4e0(window)['on'](_0x5056('0x4e'),function(_0x1e5439,_0x2b14c0,_0x47203d){try{_0xb8c4e0['fn'][_0x5056('0x4a')][_0x5056('0x48')]={'prod':_0x2b14c0,'sku':_0x47203d};_0xb8c4e0(this)['off'](_0x1e5439);}catch(_0x1159fd){_0x502732(['Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20',_0x1159fd[_0x5056('0x29')]]);}});_0xb8c4e0(window)['on'](_0x5056('0x4f'),function(_0x5e8502,_0x4c9e3c,_0x3ca56f){try{var _0x2e101a=_0x3ca56f[_0x5056('0x23')];var _0x38fbcf=0x0;for(var _0x57857e=0x0;_0x57857e<_0x2e101a;_0x57857e++){if(!_0x3ca56f[_0x57857e]['available'])_0x38fbcf=_0x38fbcf+0x1;else break;}if(_0x2e101a<=_0x38fbcf)_0xb8c4e0['fn'][_0x5056('0x4a')][_0x5056('0x4d')]=!![];_0xb8c4e0(this)[_0x5056('0x50')](_0x5e8502);}catch(_0x5dcc83){_0x502732([_0x5056('0x51'),_0x5dcc83['message']]);}});_0xb8c4e0(function(){_0xb8c4e0(_0x5056('0x52'))[_0x5056('0x4a')]();});}(window));

// -include ../qd-quatro-lib-plugins/Infinity Scroll Memory/QD_infinityScrollMemory.min.js
