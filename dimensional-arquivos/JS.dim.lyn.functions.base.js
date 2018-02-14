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
			Common.setDataScrollToggle();
			Common.applyCarouselShelf();
			Common.applySmartCart();
			Common.applyAmazingMenu();
			Common.applyAmazingMenuMobile();
			Common.overlay();
			Common.openSearchModal();
			Common.applyImageLoad();
			Common.saveAmountFix();
			Common.applyTipBarCarousel();
			Common.applyDiferentialsCarousel();
			Common.showFooterContent();
			Common.applyMosaicCategorieBanners();
			Common.applyMosaicCarousel();
		},
		ajaxStop: function() {
			Common.saveAmountFix();
		},
		windowOnload: function() {},
		vtexBindQuickViewDestroy: function() {
			window.bindQuickView = function() {};
		},
		applyMosaicCategorieBanners: function () {
			$('.banner-qd-v1-responsive > .box-banner').QD_mosaicBanners();
		},
		applyMosaicCarousel: function () {
			var wrapper = $('.mosaic-categories-qd-v2-wrapper').not('.slick-initialized');
			var mbRow = $('.banner-qd-v1-responsive > .qd-mb-row');

			if (!wrapper.length)
				return false;

			mbRow.each(function() {
				$(this).find('.box-banner').insertBefore(this);
			}).remove();

			wrapper.slick({
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
		setDataScrollToggle: function () {
			$(document.body).attr('data-qd-scroll-limit', '100');
		},
		applyCarouselShelf: function () {
			var wrapper = $('.carousel-qd-v1-shelf .prateleira').not('.slick-initialized');

			if (!wrapper.length)
				return false;

			wrapper.has('h2').each(function () {
				var $t = $(this);
				$t.find('h2').insertBefore($t);
			});
			

			wrapper.slick({
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
						$(".qd-ddc-wrapper3").prepend('<div class="qd-cartTitle"><h3>Meu Carrinho</h3></div>');
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

			$('.header-qd-v1-cart-link-trigger').click(function (evt) {
				evt.preventDefault();
				$(document.body).toggleClass('qd-cart-show');

				wrapper.height($(window).height());
				wrapper.find(".qd-ddc-prodWrapper").css('max-height', $(window).height() - 193);

				if (window.Tawk_API)
					window.Tawk_API.toggleVisibility();
			});

			$('.qd_ddc_lightBoxClose').click(function (evt) {
				$(document.body).removeClass(Common.qdOverlayClass);

				if (window.Tawk_API)
					window.Tawk_API.toggleVisibility();
			});
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

					wrapper.find('nav > ul > li > .qd-am-dropdown-trigger').click(function () {
						$('.header-qd-v1-amazing-menu-mobile').addClass('qd-am-is-active');
						$('.header-qd-v1-amazing-menu-mobile').animate({
							scrollTop: 0
						}, 200);
					});

					wrapper.find('nav > ul > li > ul > li:first-child').click(function (e) {
						e.preventDefault();
						$(this).parents(".qd-am-is-active").removeClass('qd-am-is-active');
					});
				}
			});

			$('.header-qd-v1-amazing-menu-trigger').click(function (evt) {
				evt.preventDefault();
				$(document.body).toggleClass('qd-am-on');
			});

			$('.header-qd-v1-amazing-menu-mobile .header-qd-v1-user-message').on('click', 'a#login', function () {
				$(document.body).removeClass('qd-am-on');
			});

			$('.header-qd-v1-amazing-menu-mobile .header-qd-v1-user-message').append('<div class="header-qd-v1-close-amazing-menu-mobile"></div>');

			$('.header-qd-v1-close-amazing-menu-mobile').click(function (evt) {
				$(document.body).removeClass(Common.qdOverlayClass);
			});

		},
		qdOverlayClass: 'qd-am-on qd-cart-show qd-sn-on',
		overlay: function () {
			$('.components-qd-v1-overlay').click(function () {
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		},
		openSearchModal: function () {
			$('.header-qd-v1-search-trriger').click(function () {
				$('.modal-qd-v1-search').modal();
				return false;
			});
		},
		applyImageLoad: function () {
			$('.search-qd-v1-result, .carousel-qd-v1-shelf').QD_smartImageLoad({
				sizes: {
					width: '300',
					height: '300'
				}
			});

			// Aplica Image Load no menu
			$('.header-qd-v1-amazing-menu .qd-am-dropdown').on('mouseover', function () {
				$(this).QD_smartImageLoad();
			});
		},
		saveAmountFix: function () {
			$('.shelf-qd-v1-highlight-discount-percentage:not(.qd-on)').addClass('qd-on').each(function () {
				var $t = $(this);
				$t.text(($t.text().trim().match(/[0-9]+/) || [""]).pop() + '%');
			});
		},
		applyTipBarCarousel: function () {
			var wrapper = $('.tip-bar-qd-v1-carousel >ul');

			if (!wrapper.length)
				return;

			var options = {
				arrows: false,
				autoplay: true,
				slidesToShow: 4,
				slidesToScroll: 4,
				infinite: false,
				draggable: true,
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

			wrapper.slick($.extend(true, options, (function () {
				// Se estiver dentro do product-qd-v1-sku-selection-box, ele mostrará só 2 slides por vez, mantendo as outras propriedades da variável options
				if (wrapper.closest('.product-qd-v1-sku-selection-box').length)
					return { slidesToShow: 3 };
				return {};
			})()));
		},
		applyDiferentialsCarousel: function () {
			var wrapper = $('.diferentials-qd-v1-carousel >ul');

			if (!wrapper.length)
				return;

			var options = {
				arrows: true,
				autoplay: true,
				slidesToShow: 4,
				slidesToScroll: 4,
				infinite: false,
				draggable: true,
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

			wrapper.slick($.extend(true, options, (function () {
				// Se estiver dentro do product-qd-v1-sku-selection-box, ele mostrará só 2 slides por vez, mantendo as outras propriedades da variável options
				if (wrapper.closest('.product-qd-v1-sku-selection-box').length)
					return { slidesToShow: 3 };
				return {};
			})()));
		},
		showFooterContent: function () {
			$('.footer-qd-v1-mobile-collapse-trigger').click(function (e) {
				e.preventDefault();
				$(this).addClass('qd-is-hide');
				$('.footer-qd-v1-mobile-collapse').addClass('qd-is-active');
			});
		}
	};

	var Home = {
		init: function() {
			Home.applySlickSlider();
			Home.applyCategoryCarousel();
			Home.applyBannersCarousel();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		applySlickSlider: function () {
			var wrapper = $('.slider-qd-v1-full');

			wrapper.slick({
				fade: true,
				cssEase: 'linear',
				infinite: true,
				speed: 500,
				dots: true,
				autoplay: true,
				autoplaySpeed: 7000,
				draggable: true
			});

			wrapper.each(function () {
				$(this).find('.slick-arrow').wrapAll('<div class="slick-nav" />');
			});
		},
		applyCategoryCarousel: function () {
			var wrapper = $('.category-carousel-qd-v1-carousel, .brand-carousel-qd-v1-carousel');

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
					}
				]
			});
		},
		applyBannersCarousel: function () {
			var wrapper = $('.banner-carousel-qd-v1-carousel');

			wrapper.slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: 3,
				slidesToScroll: 3,
				infinite: true,
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
						breakpoint: 991,
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
			Home.applySlickSlider();
			Search.hideExtendedMenu();
			Search.openFiltersMenu();
			Search.shelfLineFix();
			Search.infinityScroll();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		hideExtendedMenu: function () {
			$(".search-qd-v1-navigator ul").each(function () {
				var t, li, qtt, moreLink, moreLi, click, liHide;

				t = $(this);
				li = t.find(">li");
				qtt = 8;

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
		openFiltersMenu: function () {
			$('.search-qd-v1-navigator-trigger').click(function (e) {
				e.preventDefault();
				$(document.body).toggleClass('qd-sn-on');
				$('.search-qd-v1-navigator-close').appendTo('.search-single-navigator').removeClass('hide');
			});

			$('.search-single-navigator').prepend('<span class="search-qd-v1-navigator-close hide"></span>');

			$('.search-qd-v1-navigator-close').click(function () {
				$(document.body).removeClass('qd-sn-on');
				$('.search-qd-v1-navigator-close').addClass('hide');
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
				if (!window.qd_shelf_line_fix_is) {
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
		infinityScroll: function () {
			$(".prateleira[id*=ResultItems]").QD_infinityScroll();
		}
	};

	var Product = {
		run: function() {},
		init: function() {
			// Product.forceImageZoom();
			Product.setAvailableBodyClass();
			// Product.productThumbCarousel();
			Product.scrollToDescription();
			Product.applyBannerCarousel();
			Product.accessoriesApplyCarousel();
			Product.openShipping();
			Product.smartCarousel();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
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

		openShipping: function() {
			if( typeof window.ShippingValue === "function" )
				window.ShippingValue();
		},

		smartCarousel: function() {
			$('.qd_auto_smart_photo_carousel').QD_smartPhotoCarousel({
				sizes: {
					thumb: '100-100',
					image: '630-630',
					imagezoom: '1500-1500'
				},
				slickOptions: {
					thumbs: {
						slidesToShow: 4,
						slidesToScroll: 1,
						arrows: true,
					}
				}
			});
		},

		accessoriesApplyCarousel: function () {
			var item = $('.qd-collections-wrap div ul');

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

		applyBannerCarousel: function () {
			var wrapper = $('.product-qd-v1-banner-carousel');

			wrapper.slick({
				slidesToShow: 4,
				slidesToScroll: 4,
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
							slidesToShow: 1,
							slidesToScroll: 1,
							centerMode: true,
							infinite: true,
							centerPadding: '40px'
						}
					},

					{
						breakpoint: 380,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							centerMode: true,
							infinite: true,
							centerPadding: '40px'

						}
					}
				]
			});
		},

		scrollToDescription: function () {
			$('.product-qd-v1-description-link').click(function (e) {
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $('.product-qd-v1-description').offset().top - 75
				}, 900, 'swing');
			});
		},

		productThumbCarousel:function() {
			$('.product-qd-v1-image-sku').QD_smartPhotoCarousel({
				imageWrapper: '.product-qd-v1-image',
				thumbsWrapper: '.product-qd-v1-image-thumbs',
				sizes: {
					thumb: '100-100',
					image: '751-751',
					imagezoom: '1000-1000'
				},
				slickOptions: {
					images: {
						lazyLoad: 'ondemand',
						infinite: false,
						arrows: false
					},
					thumbs: {
						vertical: true,
						slidesToShow: 6,
						slidesToScroll: 1,
						arrows: false,
						focusOnSelect: true,
						responsive: [
							{
								breakpoint: 991,
								settings: {
									vertical: false,
									slidesToShow: 3
								}
							}
						]
					}
				},
			});
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
			Institutional.sideMenuToggle();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		sideMenuToggle: function () {
			$('.institucional-qd-v1-menu-toggle-wrap').click(function (evt) {
				evt.preventDefault();
				$(document.body).addClass('qd-sn-on');
			});

			$('.institucional-qd-v1-side-menu-wrap-close').click(function () {
				$(document.body).removeClass('qd-sn-on');
			});
		}
	};

	var Orders = {
		init: function() {
			Orders.bootstrapCssFix();
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
		}
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

"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});
(function(){var d=jQuery;if("function"!==typeof d.fn.QD_news){var w={defaultName:"Digite seu nome...",defaultEmail:"Digite seu e-mail...",nameField:".qd_news_name",checkNameFieldIsVisible:!0,emailField:".qd_news_email",btn:".qd_news_button",originField:".qd_news_origin",elementError:".nv2_messageError",elementSuccess:".nv2_messageSuccess",validationMethod:"popup",getAttr:"alt",setDefaultName:!0,checkNameExist:!0,validateName:!0,showInPopup:!0,animation:"blink",animateSpeed:100,animateDistance:15,
animateRepeat:3,animateFieldSuccess:".qd_news_animate_field_success",timeHideSuccessMsg:3E3,platform:"vtexcrm",vtexStore:jsnomeLoja,entity:"NL",allowSubmit:function(){return!0},successCallback:function(){},submitCallback:function(d,g){}};d.fn.QD_news=function(t){var g=function(a,d){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var e;"object"===typeof a?(a.unshift("[QD News]\n"),e=a):e=["[QD News]\n"+a];if("undefined"===
typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===d.toLowerCase())try{console.info.apply(console,e)}catch(c){console.info(e.join("\n"))}else try{console.error.apply(console,e)}catch(c){console.error(e.join("\n"))}else try{console.warn.apply(console,e)}catch(c){console.warn(e.join("\n"))}}},k=d(this);if(!k.length)return k;var a=d.extend({},w,t);a.showInPopup||(a.validationMethod="div");null!==a.animation?a.validationMethod="animateField":"animateField"==
a.validationMethod&&(a.animation="leftRight");if("popup"==a.validationMethod&&"function"!==typeof d.fn.vtexPopUp2)return g("O popUp2 n\u00e3o foi encontrado. Adicione o Plugin de PopUp2."),k;var v=function(d){var g=0;var e=function(){d.animate({left:"-="+a.animateDistance},a.animateSpeed,function(){d.animate({left:"+="+a.animateDistance},a.animateSpeed,function(){g<a.animateRepeat&&e();g++})})};var c=function(){d.fadeTo(a.animateSpeed,.2,function(){d.fadeTo(a.animateSpeed,1,function(){g<a.animateRepeat&&
c();g++})})};d.stop(!0,!0);"leftRight"==a.animation?e():"blink"==a.animation&&c()};k.each(function(){function k(b,q){l.attr("disabled","disabled");var f={postData:{newsletterClientEmail:b,newsletterClientName:a.defaultName==q?"-":q,newsInternalCampaign:"newsletter:opt-in",newsInternalPage:(document.location.pathname||"/").replace(/\//g,"_"),newsInternalPart:"newsletter"},button:l,wrapper:c};"linx"==a.platform&&(f.postData.nome=f.postData.newsletterClientName,f.postData.email=f.postData.newsletterClientEmail);
"vtexcrm"==a.platform?t(function(x){e(f,d.ajax({url:"//api.vtexcrm.com.br/"+a.vtexStore+"/dataentities/"+a.entity+"/documents",type:"PATCH",dataType:"json",headers:{Accept:"application/vnd.vtex.ds.v10+json","Content-Type":"application/json; charset=utf-8"},data:JSON.stringify({id:b.toLowerCase().replace(/[^a-z0-9]/ig,function(a){return"-"+a.charCodeAt(0)+"-"}),ip:x,origin:c.find(a.originField).val()||"---",qd_email:b,qd_name:q,URI:location.href})}))}):e(f,d.ajax({url:"linx"==a.platform?"/newsletter.aspx":
"/no-cache/Newsletter.aspx",type:"linx"==a.platform?"GET":"POST",data:f.postData}));a.submitCallback(b,q)}function t(a){d.ajax({url:"//api.ipify.org?format=jsonp",dataType:"jsonp",success:function(b){a(b.ip)},error:function(){d.ajax({url:"//freegeoip.net/json/",dataType:"json",success:function(b){a(b.ip)},error:function(b){a(null)}})}})}function e(b,e){e.fail(function(){alert("Desculpe. N\u00e3o foi poss\u00edvel cadastrar seu e-mail, por favor tente novamente.")});e.done(function(e){l.removeAttr("disabled");
if("linx"==a.platform&&!(-1<e.indexOf(" com sucesso.")||-1<e.indexOf(" cadastrado.")))return alert(e);"popup"==a.validationMethod?r.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterSuccess"}):"animateField"!=a.validationMethod&&r.slideDown().bind("click",function(){d(this).slideUp()});var f=c.find(a.emailField);a.setDefaultName&&c.find(a.nameField).is("input:text, textarea")&&c.find(a.nameField).val(a.defaultName);if("animateField"==a.validationMethod){f.val(c.find(a.animateFieldSuccess).val()||
"Obrigado!!!");f.addClass("vtexNewsSuccess");var g=setTimeout(function(){f.removeClass("vtexNewsSuccess");f.val(a.defaultEmail);f.unbind("focus.vtexNews")},a.timeHideSuccessMsg);f.bind("focus.vtexNews",function(){f.removeClass("vtexNewsSuccess");clearTimeout(g);d(this).val("");d(this).unbind("focus.vtexNews")})}else f.val(a.defaultEmail);a.successCallback(b);d(c).trigger("qdNewsSuccessCallback",b)})}var c=d(this),m=c.find(a.nameField),h=c.find(a.emailField),l=c.find(a.btn);if("animateField"!=a.validationMethod){var n=
c.find(a.elementError);var r=c.find(a.elementSuccess)}1>m.length&&a.checkNameExist&&g("Campo de nome, n\u00e3o encontrado ("+m.selector+"). Ser\u00e1 atribuido um valor padr\u00e3o.","info");if(1>h.length)return g("Campo de e-mail, n\u00e3o encontrado ("+h.selector+")"),c;if(1>l.length)return g("Bot\u00e3o de envio, n\u00e3o encontrado ("+l.selector+")"),c;if("animateField"!=a.validationMethod&&(1>r.length||1>n.length))return g("A(s) mensagem(ns) de erro e/ou sucesso esta(m) faltando \n ("+r.selector+
", "+n.selector+")"),c;a.setDefaultName&&m.is("input[type=text], textarea")&&m.val(a.defaultName);h.val(a.defaultEmail);(function(){if(a.checkNameExist){if(a.checkNameFieldIsVisible){var b=m.filter(":visible");if(!b.length)return}else b=m;var c=b.val();b.is("input:text, textarea")&&b.bind({focus:function(){b.val()!=c||0!==b.val().search(a.defaultName.substr(0,6))&&!a.setDefaultName||b.val("")},blur:function(){""===b.val()&&b.val(c)}})}})();(function(){var b=h.val();h.bind({focus:function(){h.val()==
b&&0===h.val().search(a.defaultEmail.substr(0,6))&&h.val("")},blur:function(){""===h.val()&&h.val(b)}})})();var u=function(){var b;var e=(b=c.find(a.nameField).filter("input[type=text],select,textarea").val())?b:c.find(a.nameField).filter("input[type=radio], input[type=checkbox]").length?c.find(a.nameField).filter("input[type=radio]:checked, input[type=checkbox]:checked").val()||"":(b=c.find(a.nameField).attr(a.getAttr))?b:(b=c.find(a.nameField).text())?b:(b=c.find(a.nameField).find(".box-banner img:first").attr("alt"))?
b:"Nome_Padrao";b=(c.find(a.emailField).val()||"").trim();var f=c.find(a.nameField).is(":visible");f=a.validateName?(1>e.length||0===e.search(a.defaultName.substr(0,6)))&&(a.checkNameExist||f?f:!0):!1;var h=0>b.search(/^[a-z0-9_\-\.\+]+@[a-z0-9_\-]+(\.[a-z0-9_\-]{2,})+$/i);f||h?"animateField"==a.validationMethod?(f&&v(c.find(a.nameField)),h&&v(c.find(a.emailField))):"popup"==a.validationMethod?n.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterError"}):(n.slideDown().bind("click",function(){d(this).slideUp()}),
setTimeout(function(){n.slideUp()},1800)):a.allowSubmit()?k(b,e):g("Os dados n\u00e3o foram enviados pois o parametro 'allowSubmit' n\u00e3o retornou 'true'","info")};var p=function(a){13==(a.keyCode?a.keyCode:a.which)&&(a.preventDefault(),u())};m.filter("input:text, textarea").bind("keydown",p);h.bind("keydown",p);p=l.getParent("form");p.length?p.submit(function(a){a.preventDefault();u()}):l.bind("click.qd_news",function(){u()})});return k};d(function(){d(".qd_news_auto").QD_news()})}})();
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
var _0x2e15=['show','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','qd-ssa-on','qd-ssa-skus-','skus','split','length','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','message','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','trigger','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','off','qd-ssa-sku-prod-unavailable','vzrafvbany%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','join','toUpperCase','ite','---','erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','QD_smartStockAvailable','initialSkuSelected','QuatroDigital.ssa.skuSelected','prod','unavailable','vtex.sku.selected.QD','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','available','function','qdAjaxQueue','qdAjax','extend','url','opts','push','call','parameters','callbackFns','successPopulated','errorPopulated','boolean','completePopulated','success','error','complete','clearQueueDelay','jqXHR','undefined','readyState','textStatus','errorThrown','2.1','/produto/sku/','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','object','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','alerta','aviso','toLowerCase','info','apply','warn','removeClass','qd-ssa-sku-no-selected','addClass','qd-ssa-sku-selected','SkuSellersInformation','AvailableQuantity','attr','data-qd-ssa-qtt','each','[data-qd-ssa-text]','filter','[data-qd-ssa-text=\x22','[data-qd-ssa-text=\x22default\x22]','hide','qd-ssa-show','html','#qtt'];(function(_0x4a174f,_0x2b3ed7){var _0x51adc6=function(_0x4c4f72){while(--_0x4c4f72){_0x4a174f['push'](_0x4a174f['shift']());}};_0x51adc6(++_0x2b3ed7);}(_0x2e15,0x17a));var _0x5393=function(_0x34bb76,_0x35ea68){_0x34bb76=_0x34bb76-0x0;var _0x4008d6=_0x2e15[_0x34bb76];return _0x4008d6;};(function(_0x387857){if(_0x5393('0x0')!==typeof _0x387857['qdAjax']){var _0x488500={};_0x387857[_0x5393('0x1')]=_0x488500;_0x387857[_0x5393('0x2')]=function(_0x483506){var _0x596684=_0x387857[_0x5393('0x3')]({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x483506);var _0x587735=escape(encodeURIComponent(_0x596684[_0x5393('0x4')]));_0x488500[_0x587735]=_0x488500[_0x587735]||{};_0x488500[_0x587735]['opts']=_0x488500[_0x587735][_0x5393('0x5')]||[];_0x488500[_0x587735]['opts'][_0x5393('0x6')]({'success':function(_0x4b0da4,_0x2bda50,_0xec35b1){_0x596684['success']['call'](this,_0x4b0da4,_0x2bda50,_0xec35b1);},'error':function(_0x4e8fbd,_0x240896,_0x29c332){_0x596684['error'][_0x5393('0x7')](this,_0x4e8fbd,_0x240896,_0x29c332);},'complete':function(_0x471b7e,_0x34e74a){_0x596684['complete'][_0x5393('0x7')](this,_0x471b7e,_0x34e74a);}});_0x488500[_0x587735]['parameters']=_0x488500[_0x587735][_0x5393('0x8')]||{'success':{},'error':{},'complete':{}};_0x488500[_0x587735]['callbackFns']=_0x488500[_0x587735]['callbackFns']||{};_0x488500[_0x587735][_0x5393('0x9')][_0x5393('0xa')]='boolean'===typeof _0x488500[_0x587735][_0x5393('0x9')][_0x5393('0xa')]?_0x488500[_0x587735][_0x5393('0x9')]['successPopulated']:!0x1;_0x488500[_0x587735][_0x5393('0x9')][_0x5393('0xb')]=_0x5393('0xc')===typeof _0x488500[_0x587735][_0x5393('0x9')][_0x5393('0xb')]?_0x488500[_0x587735][_0x5393('0x9')]['errorPopulated']:!0x1;_0x488500[_0x587735][_0x5393('0x9')][_0x5393('0xd')]=_0x5393('0xc')===typeof _0x488500[_0x587735][_0x5393('0x9')][_0x5393('0xd')]?_0x488500[_0x587735][_0x5393('0x9')][_0x5393('0xd')]:!0x1;_0x483506=_0x387857[_0x5393('0x3')]({},_0x596684,{'success':function(_0x28bce5,_0xcd4419,_0x22691d){_0x488500[_0x587735]['parameters'][_0x5393('0xe')]={'data':_0x28bce5,'textStatus':_0xcd4419,'jqXHR':_0x22691d};_0x488500[_0x587735][_0x5393('0x9')][_0x5393('0xa')]=!0x0;for(var _0x4c8c55 in _0x488500[_0x587735][_0x5393('0x5')])'object'===typeof _0x488500[_0x587735][_0x5393('0x5')][_0x4c8c55]&&(_0x488500[_0x587735][_0x5393('0x5')][_0x4c8c55][_0x5393('0xe')][_0x5393('0x7')](this,_0x28bce5,_0xcd4419,_0x22691d),_0x488500[_0x587735][_0x5393('0x5')][_0x4c8c55][_0x5393('0xe')]=function(){});},'error':function(_0xa910b9,_0x162735,_0x1d23f5){_0x488500[_0x587735][_0x5393('0x8')][_0x5393('0xf')]={'errorThrown':_0x1d23f5,'textStatus':_0x162735,'jqXHR':_0xa910b9};_0x488500[_0x587735]['callbackFns'][_0x5393('0xb')]=!0x0;for(var _0x5b4f8c in _0x488500[_0x587735][_0x5393('0x5')])'object'===typeof _0x488500[_0x587735][_0x5393('0x5')][_0x5b4f8c]&&(_0x488500[_0x587735]['opts'][_0x5b4f8c][_0x5393('0xf')][_0x5393('0x7')](this,_0xa910b9,_0x162735,_0x1d23f5),_0x488500[_0x587735]['opts'][_0x5b4f8c][_0x5393('0xf')]=function(){});},'complete':function(_0x91900,_0x4acb3d){_0x488500[_0x587735][_0x5393('0x8')][_0x5393('0x10')]={'textStatus':_0x4acb3d,'jqXHR':_0x91900};_0x488500[_0x587735][_0x5393('0x9')]['completePopulated']=!0x0;for(var _0x1ce444 in _0x488500[_0x587735][_0x5393('0x5')])'object'===typeof _0x488500[_0x587735][_0x5393('0x5')][_0x1ce444]&&(_0x488500[_0x587735][_0x5393('0x5')][_0x1ce444][_0x5393('0x10')][_0x5393('0x7')](this,_0x91900,_0x4acb3d),_0x488500[_0x587735]['opts'][_0x1ce444]['complete']=function(){});isNaN(parseInt(_0x596684[_0x5393('0x11')]))||setTimeout(function(){_0x488500[_0x587735][_0x5393('0x12')]=void 0x0;_0x488500[_0x587735][_0x5393('0x5')]=void 0x0;_0x488500[_0x587735]['parameters']=void 0x0;_0x488500[_0x587735]['callbackFns']=void 0x0;},_0x596684[_0x5393('0x11')]);}});_0x5393('0x13')===typeof _0x488500[_0x587735][_0x5393('0x12')]?_0x488500[_0x587735][_0x5393('0x12')]=_0x387857['ajax'](_0x483506):_0x488500[_0x587735][_0x5393('0x12')]&&_0x488500[_0x587735]['jqXHR']['readyState']&&0x4==_0x488500[_0x587735][_0x5393('0x12')][_0x5393('0x14')]&&(_0x488500[_0x587735][_0x5393('0x9')][_0x5393('0xa')]&&_0x483506[_0x5393('0xe')](_0x488500[_0x587735][_0x5393('0x8')]['success']['data'],_0x488500[_0x587735]['parameters'][_0x5393('0xe')][_0x5393('0x15')],_0x488500[_0x587735][_0x5393('0x8')][_0x5393('0xe')][_0x5393('0x12')]),_0x488500[_0x587735][_0x5393('0x9')][_0x5393('0xb')]&&_0x483506[_0x5393('0xf')](_0x488500[_0x587735][_0x5393('0x8')]['error']['jqXHR'],_0x488500[_0x587735][_0x5393('0x8')][_0x5393('0xf')]['textStatus'],_0x488500[_0x587735][_0x5393('0x8')][_0x5393('0xf')][_0x5393('0x16')]),_0x488500[_0x587735][_0x5393('0x9')][_0x5393('0xd')]&&_0x483506[_0x5393('0x10')](_0x488500[_0x587735][_0x5393('0x8')][_0x5393('0x10')][_0x5393('0x12')],_0x488500[_0x587735][_0x5393('0x8')][_0x5393('0x10')][_0x5393('0x15')]));};_0x387857[_0x5393('0x2')]['version']=_0x5393('0x17');}}(jQuery));(function(_0x73bcd3){function _0x41f2fa(_0x10fe2f,_0x35f0f9){_0x1e0de4[_0x5393('0x2')]({'url':_0x5393('0x18')+_0x10fe2f,'clearQueueDelay':null,'success':_0x35f0f9,'error':function(){_0xdc4742(_0x5393('0x19'));}});}var _0x1e0de4=jQuery;if('function'!==typeof _0x1e0de4['fn']['QD_smartStockAvailable']){var _0xdc4742=function(_0x2c08d7,_0x578841){if(_0x5393('0x1a')===typeof console){var _0x43dfe5;_0x5393('0x1a')===typeof _0x2c08d7?(_0x2c08d7[_0x5393('0x1b')](_0x5393('0x1c')),_0x43dfe5=_0x2c08d7):_0x43dfe5=['[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a'+_0x2c08d7];_0x5393('0x13')===typeof _0x578841||_0x5393('0x1d')!==_0x578841['toLowerCase']()&&_0x5393('0x1e')!==_0x578841[_0x5393('0x1f')]()?_0x5393('0x13')!==typeof _0x578841&&_0x5393('0x20')===_0x578841[_0x5393('0x1f')]()?console[_0x5393('0x20')][_0x5393('0x21')](console,_0x43dfe5):console['error'][_0x5393('0x21')](console,_0x43dfe5):console[_0x5393('0x22')][_0x5393('0x21')](console,_0x43dfe5);}},_0x1cda74={},_0x169f67=function(_0x3e32fe,_0x2582a3){function _0x38d8c0(_0x402e4b){try{_0x3e32fe[_0x5393('0x23')](_0x5393('0x24'))[_0x5393('0x25')](_0x5393('0x26'));var _0x383ef8=_0x402e4b[0x0][_0x5393('0x27')][0x0][_0x5393('0x28')];_0x3e32fe[_0x5393('0x29')](_0x5393('0x2a'),_0x383ef8);_0x3e32fe[_0x5393('0x2b')](function(){var _0x3e32fe=_0x1e0de4(this)['find'](_0x5393('0x2c'));if(0x1>_0x383ef8)return _0x3e32fe['hide']()[_0x5393('0x25')]('qd-ssa-hide')[_0x5393('0x23')]('qd-ssa-show');var _0x402e4b=_0x3e32fe[_0x5393('0x2d')](_0x5393('0x2e')+_0x383ef8+'\x22]');_0x402e4b=_0x402e4b['length']?_0x402e4b:_0x3e32fe[_0x5393('0x2d')](_0x5393('0x2f'));_0x3e32fe[_0x5393('0x30')]()['addClass']('qd-ssa-hide')[_0x5393('0x23')](_0x5393('0x31'));_0x402e4b[_0x5393('0x32')]((_0x402e4b[_0x5393('0x32')]()||'')['replace'](_0x5393('0x33'),_0x383ef8));_0x402e4b[_0x5393('0x34')]()['addClass'](_0x5393('0x31'))['removeClass']('qd-ssa-hide');});}catch(_0x55584b){_0xdc4742([_0x5393('0x35'),_0x55584b['message']]);}}if(_0x3e32fe['length']){_0x3e32fe['addClass'](_0x5393('0x36'));_0x3e32fe['addClass']('qd-ssa-sku-no-selected');try{_0x3e32fe[_0x5393('0x25')](_0x5393('0x37')+vtxctx[_0x5393('0x38')][_0x5393('0x39')](';')[_0x5393('0x3a')]);}catch(_0x5ba118){_0xdc4742([_0x5393('0x3b'),_0x5ba118[_0x5393('0x3c')]]);}_0x1e0de4(window)['on'](_0x5393('0x3d'),function(_0x49d074,_0x3f05bf,_0x322811){try{_0x41f2fa(_0x322811[_0x5393('0x3e')],function(_0x39c9d2){_0x38d8c0(_0x39c9d2);0x1===vtxctx['skus'][_0x5393('0x39')](';')[_0x5393('0x3a')]&&0x0==_0x39c9d2[0x0][_0x5393('0x27')][0x0][_0x5393('0x28')]&&_0x1e0de4(window)[_0x5393('0x3f')]('QuatroDigital.ssa.prodUnavailable');});}catch(_0x48acde){_0xdc4742([_0x5393('0x40'),_0x48acde[_0x5393('0x3c')]]);}});_0x1e0de4(window)[_0x5393('0x41')]('vtex.sku.selected.QD');_0x1e0de4(window)['on']('QuatroDigital.ssa.prodUnavailable',function(){_0x3e32fe[_0x5393('0x25')](_0x5393('0x42'))[_0x5393('0x30')]();});}};_0x73bcd3=function(_0x349ace){var _0x590776={'q':_0x5393('0x43')};return function(_0x2c5baa){var _0x6fae5e=function(_0x564c11){return _0x564c11;};var _0x4daab3=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2c5baa=_0x2c5baa['d'+_0x4daab3[0x10]+'c'+_0x4daab3[0x11]+'m'+_0x6fae5e(_0x4daab3[0x1])+'n'+_0x4daab3[0xd]]['l'+_0x4daab3[0x12]+'c'+_0x4daab3[0x0]+'ti'+_0x6fae5e('o')+'n'];var _0x425b49=function(_0x350d05){return escape(encodeURIComponent(_0x350d05[_0x5393('0x44')](/\./g,'¨')[_0x5393('0x44')](/[a-zA-Z]/g,function(_0x4698d9){return String[_0x5393('0x45')](('Z'>=_0x4698d9?0x5a:0x7a)>=(_0x4698d9=_0x4698d9['charCodeAt'](0x0)+0xd)?_0x4698d9:_0x4698d9-0x1a);})));};var _0x2e91ef=_0x425b49(_0x2c5baa[[_0x4daab3[0x9],_0x6fae5e('o'),_0x4daab3[0xc],_0x4daab3[_0x6fae5e(0xd)]][_0x5393('0x46')]('')]);_0x425b49=_0x425b49((window[['js',_0x6fae5e('no'),'m',_0x4daab3[0x1],_0x4daab3[0x4][_0x5393('0x47')](),_0x5393('0x48')][_0x5393('0x46')]('')]||_0x5393('0x49'))+['.v',_0x4daab3[0xd],'e',_0x6fae5e('x'),'co',_0x6fae5e('mm'),_0x5393('0x4a'),_0x4daab3[0x1],'.c',_0x6fae5e('o'),'m.',_0x4daab3[0x13],'r'][_0x5393('0x46')](''));for(var _0x57d76c in _0x590776){if(_0x425b49===_0x57d76c+_0x590776[_0x57d76c]||_0x2e91ef===_0x57d76c+_0x590776[_0x57d76c]){var _0x3a4169='tr'+_0x4daab3[0x11]+'e';break;}_0x3a4169='f'+_0x4daab3[0x0]+'ls'+_0x6fae5e(_0x4daab3[0x1])+'';}_0x6fae5e=!0x1;-0x1<_0x2c5baa[[_0x4daab3[0xc],'e',_0x4daab3[0x0],'rc',_0x4daab3[0x9]][_0x5393('0x46')]('')][_0x5393('0x4b')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x6fae5e=!0x0);return[_0x3a4169,_0x6fae5e];}(_0x349ace);}(window);if(!eval(_0x73bcd3[0x0]))return _0x73bcd3[0x1]?_0xdc4742(_0x5393('0x4c')):!0x1;_0x1e0de4['fn']['QD_smartStockAvailable']=function(_0x154ea6){var _0x1dd544=_0x1e0de4(this);_0x154ea6=_0x1e0de4[_0x5393('0x3')](!0x0,{},_0x1cda74,_0x154ea6);_0x1dd544['qdPlugin']=new _0x169f67(_0x1dd544,_0x154ea6);try{_0x5393('0x1a')===typeof _0x1e0de4['fn'][_0x5393('0x4d')][_0x5393('0x4e')]&&_0x1e0de4(window)['trigger'](_0x5393('0x4f'),[_0x1e0de4['fn'][_0x5393('0x4d')][_0x5393('0x4e')][_0x5393('0x50')],_0x1e0de4['fn'][_0x5393('0x4d')][_0x5393('0x4e')][_0x5393('0x3e')]]);}catch(_0x194819){_0xdc4742(['Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20',_0x194819[_0x5393('0x3c')]]);}_0x1e0de4['fn'][_0x5393('0x4d')][_0x5393('0x51')]&&_0x1e0de4(window)[_0x5393('0x3f')]('QuatroDigital.ssa.prodUnavailable');return _0x1dd544;};_0x1e0de4(window)['on'](_0x5393('0x52'),function(_0x23e882,_0x1ede34,_0x2a35fd){try{_0x1e0de4['fn'][_0x5393('0x4d')]['initialSkuSelected']={'prod':_0x1ede34,'sku':_0x2a35fd},_0x1e0de4(this)['off'](_0x23e882);}catch(_0x5775be){_0xdc4742([_0x5393('0x53'),_0x5775be['message']]);}});_0x1e0de4(window)['on'](_0x5393('0x54'),function(_0x4365a4,_0x463eea,_0x1bf6e6){try{for(var _0x468834=_0x1bf6e6[_0x5393('0x3a')],_0x418129=_0x463eea=0x0;_0x418129<_0x468834&&!_0x1bf6e6[_0x418129][_0x5393('0x55')];_0x418129++)_0x463eea+=0x1;_0x468834<=_0x463eea&&(_0x1e0de4['fn'][_0x5393('0x4d')][_0x5393('0x51')]=!0x0);_0x1e0de4(this)[_0x5393('0x41')](_0x4365a4);}catch(_0x47d44f){_0xdc4742(['Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20',_0x47d44f[_0x5393('0x3c')]]);}});_0x1e0de4(function(){_0x1e0de4('.qd_smart_stock_available_auto')[_0x5393('0x4d')]();});}}(window));
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
var _0x14b8=['exec','.qd_amazing_menu_auto','getParent','function','QD_amazingMenu','/qd-amazing-menu','object','undefined','error','info','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','apply','warn','join','qdAmAddNdx','each','qd-am-li-','first','last','addClass','replace','charCodeAt','toUpperCase','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-collection-wrapper','html','img[alt=\x27','attr','data-qdam-value','.box-banner','insertBefore','hide','qd-am-content-loaded','text','[class*=\x27colunas\x27]','clone','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','url','call','trigger','UL\x20do\x20menu\x20não\x20encontrada','children',':not(ul)','qd-am-elem-','trim','>li','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','add','qd-am-','-li','callback','QuatroDigital.am.callback','extend'];(function(_0x63d16e,_0x3e7323){var _0x5dee92=function(_0x1bb9f1){while(--_0x1bb9f1){_0x63d16e['push'](_0x63d16e['shift']());}};_0x5dee92(++_0x3e7323);}(_0x14b8,0x165));var _0x16ef=function(_0x1ec368,_0x42efb8){_0x1ec368=_0x1ec368-0x0;var _0x535b75=_0x14b8[_0x1ec368];return _0x535b75;};(function(_0x87457a){_0x87457a['fn'][_0x16ef('0x0')]=_0x87457a['fn']['closest'];}(jQuery));(function(_0xe8ed9){var _0x5b86cb;var _0x3d8684=jQuery;if(_0x16ef('0x1')!==typeof _0x3d8684['fn'][_0x16ef('0x2')]){var _0x354e5f={'url':_0x16ef('0x3'),'callback':function(){},'ajaxCallback':function(){}};var _0x5ae472=function(_0x2b33fc,_0x1b6f5d){if(_0x16ef('0x4')===typeof console&&_0x16ef('0x5')!==typeof console[_0x16ef('0x6')]&&'undefined'!==typeof console[_0x16ef('0x7')]&&'undefined'!==typeof console['warn']){var _0x2bd24d;_0x16ef('0x4')===typeof _0x2b33fc?(_0x2b33fc[_0x16ef('0x8')](_0x16ef('0x9')),_0x2bd24d=_0x2b33fc):_0x2bd24d=[_0x16ef('0x9')+_0x2b33fc];if(_0x16ef('0x5')===typeof _0x1b6f5d||_0x16ef('0xa')!==_0x1b6f5d[_0x16ef('0xb')]()&&_0x16ef('0xc')!==_0x1b6f5d[_0x16ef('0xb')]())if('undefined'!==typeof _0x1b6f5d&&'info'===_0x1b6f5d[_0x16ef('0xb')]())try{console[_0x16ef('0x7')]['apply'](console,_0x2bd24d);}catch(_0xe8e8c0){try{console[_0x16ef('0x7')](_0x2bd24d['join']('\x0a'));}catch(_0x1fc89a){}}else try{console[_0x16ef('0x6')][_0x16ef('0xd')](console,_0x2bd24d);}catch(_0x1accdd){try{console[_0x16ef('0x6')](_0x2bd24d['join']('\x0a'));}catch(_0x5b5c06){}}else try{console[_0x16ef('0xe')][_0x16ef('0xd')](console,_0x2bd24d);}catch(_0xf2ca58){try{console[_0x16ef('0xe')](_0x2bd24d[_0x16ef('0xf')]('\x0a'));}catch(_0x3b07a1){}}}};_0x3d8684['fn'][_0x16ef('0x10')]=function(){var _0x2c199f=_0x3d8684(this);_0x2c199f[_0x16ef('0x11')](function(_0x14d55b){_0x3d8684(this)['addClass'](_0x16ef('0x12')+_0x14d55b);});_0x2c199f[_0x16ef('0x13')]()['addClass']('qd-am-first');_0x2c199f[_0x16ef('0x14')]()[_0x16ef('0x15')]('qd-am-last');return _0x2c199f;};_0x3d8684['fn'][_0x16ef('0x2')]=function(){};_0xe8ed9=function(_0x4f7325){var _0x4c649f={'q':'vzrafvbany%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x2626e3){var _0x2eea14=function(_0x4afcfa){return _0x4afcfa;};var _0x2ab7e4=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2626e3=_0x2626e3['d'+_0x2ab7e4[0x10]+'c'+_0x2ab7e4[0x11]+'m'+_0x2eea14(_0x2ab7e4[0x1])+'n'+_0x2ab7e4[0xd]]['l'+_0x2ab7e4[0x12]+'c'+_0x2ab7e4[0x0]+'ti'+_0x2eea14('o')+'n'];var _0x31a3e6=function(_0x1a1bd7){return escape(encodeURIComponent(_0x1a1bd7['replace'](/\./g,'¨')[_0x16ef('0x16')](/[a-zA-Z]/g,function(_0x7be0ac){return String['fromCharCode'](('Z'>=_0x7be0ac?0x5a:0x7a)>=(_0x7be0ac=_0x7be0ac[_0x16ef('0x17')](0x0)+0xd)?_0x7be0ac:_0x7be0ac-0x1a);})));};var _0x3586f6=_0x31a3e6(_0x2626e3[[_0x2ab7e4[0x9],_0x2eea14('o'),_0x2ab7e4[0xc],_0x2ab7e4[_0x2eea14(0xd)]]['join']('')]);_0x31a3e6=_0x31a3e6((window[['js',_0x2eea14('no'),'m',_0x2ab7e4[0x1],_0x2ab7e4[0x4][_0x16ef('0x18')](),'ite'][_0x16ef('0xf')]('')]||_0x16ef('0x19'))+['.v',_0x2ab7e4[0xd],'e',_0x2eea14('x'),'co',_0x2eea14('mm'),_0x16ef('0x1a'),_0x2ab7e4[0x1],'.c',_0x2eea14('o'),'m.',_0x2ab7e4[0x13],'r']['join'](''));for(var _0x22fd47 in _0x4c649f){if(_0x31a3e6===_0x22fd47+_0x4c649f[_0x22fd47]||_0x3586f6===_0x22fd47+_0x4c649f[_0x22fd47]){var _0x10cba2='tr'+_0x2ab7e4[0x11]+'e';break;}_0x10cba2='f'+_0x2ab7e4[0x0]+'ls'+_0x2eea14(_0x2ab7e4[0x1])+'';}_0x2eea14=!0x1;-0x1<_0x2626e3[[_0x2ab7e4[0xc],'e',_0x2ab7e4[0x0],'rc',_0x2ab7e4[0x9]][_0x16ef('0xf')]('')][_0x16ef('0x1b')](_0x16ef('0x1c'))&&(_0x2eea14=!0x0);return[_0x10cba2,_0x2eea14];}(_0x4f7325);}(window);if(!eval(_0xe8ed9[0x0]))return _0xe8ed9[0x1]?_0x5ae472(_0x16ef('0x1d')):!0x1;var _0x99d3c1=function(_0x39ff27){var _0x2f52d8=_0x39ff27[_0x16ef('0x1e')](_0x16ef('0x1f'));var _0x49cfe0=_0x2f52d8[_0x16ef('0x20')](_0x16ef('0x21'));var _0x1bbe37=_0x2f52d8['filter'](_0x16ef('0x22'));if(_0x49cfe0[_0x16ef('0x23')]||_0x1bbe37[_0x16ef('0x23')])_0x49cfe0[_0x16ef('0x24')]()[_0x16ef('0x15')]('qd-am-banner-wrapper'),_0x1bbe37[_0x16ef('0x24')]()[_0x16ef('0x15')](_0x16ef('0x25')),_0x3d8684['qdAjax']({'url':_0x5b86cb['url'],'dataType':_0x16ef('0x26'),'success':function(_0x1697c3){var _0x227595=_0x3d8684(_0x1697c3);_0x49cfe0['each'](function(){var _0x1697c3=_0x3d8684(this);var _0xc497=_0x227595['find'](_0x16ef('0x27')+_0x1697c3[_0x16ef('0x28')](_0x16ef('0x29'))+'\x27]');_0xc497[_0x16ef('0x23')]&&(_0xc497['each'](function(){_0x3d8684(this)[_0x16ef('0x0')](_0x16ef('0x2a'))['clone']()[_0x16ef('0x2b')](_0x1697c3);}),_0x1697c3[_0x16ef('0x2c')]());})[_0x16ef('0x15')](_0x16ef('0x2d'));_0x1bbe37['each'](function(){var _0x1697c3={};var _0x358139=_0x3d8684(this);_0x227595[_0x16ef('0x1e')]('h2')[_0x16ef('0x11')](function(){if(_0x3d8684(this)[_0x16ef('0x2e')]()['trim']()[_0x16ef('0xb')]()==_0x358139['attr']('data-qdam-value')['trim']()[_0x16ef('0xb')]())return _0x1697c3=_0x3d8684(this),!0x1;});_0x1697c3[_0x16ef('0x23')]&&(_0x1697c3[_0x16ef('0x11')](function(){_0x3d8684(this)[_0x16ef('0x0')](_0x16ef('0x2f'))[_0x16ef('0x30')]()[_0x16ef('0x2b')](_0x358139);}),_0x358139['hide']());})[_0x16ef('0x15')](_0x16ef('0x2d'));},'error':function(){_0x5ae472(_0x16ef('0x31')+_0x5b86cb[_0x16ef('0x32')]+'\x27\x20falho.');},'complete':function(){_0x5b86cb['ajaxCallback'][_0x16ef('0x33')](this);_0x3d8684(window)[_0x16ef('0x34')]('QuatroDigital.am.ajaxCallback',_0x39ff27);},'clearQueueDelay':0xbb8});};_0x3d8684[_0x16ef('0x2')]=function(_0x1ebb28){var _0x5e7751=_0x1ebb28[_0x16ef('0x1e')]('ul[itemscope]')[_0x16ef('0x11')](function(){var _0x4943d3=_0x3d8684(this);if(!_0x4943d3[_0x16ef('0x23')])return _0x5ae472([_0x16ef('0x35'),_0x1ebb28],_0x16ef('0xa'));_0x4943d3[_0x16ef('0x1e')]('li\x20>ul')[_0x16ef('0x24')]()[_0x16ef('0x15')]('qd-am-has-ul');_0x4943d3[_0x16ef('0x1e')]('li')[_0x16ef('0x11')](function(){var _0x377f52=_0x3d8684(this);var _0x27ce74=_0x377f52[_0x16ef('0x36')](_0x16ef('0x37'));_0x27ce74[_0x16ef('0x23')]&&_0x377f52[_0x16ef('0x15')](_0x16ef('0x38')+_0x27ce74[_0x16ef('0x13')]()['text']()[_0x16ef('0x39')]()['replaceSpecialChars']()['replace'](/\./g,'')[_0x16ef('0x16')](/\s/g,'-')['toLowerCase']());});var _0x1e4c25=_0x4943d3[_0x16ef('0x1e')](_0x16ef('0x3a'))[_0x16ef('0x10')]();_0x4943d3[_0x16ef('0x15')]('qd-amazing-menu');_0x1e4c25=_0x1e4c25[_0x16ef('0x1e')]('>ul');_0x1e4c25['each'](function(){var _0x40a113=_0x3d8684(this);_0x40a113[_0x16ef('0x1e')]('>li')['qdAmAddNdx']()['addClass'](_0x16ef('0x3b'));_0x40a113[_0x16ef('0x15')](_0x16ef('0x3c'));_0x40a113['parent']()[_0x16ef('0x15')](_0x16ef('0x3d'));});_0x1e4c25[_0x16ef('0x15')](_0x16ef('0x3d'));var _0x5b6d5e=0x0,_0xe8ed9=function(_0x28ea80){_0x5b6d5e+=0x1;_0x28ea80=_0x28ea80['children']('li')[_0x16ef('0x36')]('*');_0x28ea80[_0x16ef('0x23')]&&(_0x28ea80[_0x16ef('0x15')](_0x16ef('0x3e')+_0x5b6d5e),_0xe8ed9(_0x28ea80));};_0xe8ed9(_0x4943d3);_0x4943d3[_0x16ef('0x3f')](_0x4943d3[_0x16ef('0x1e')]('ul'))[_0x16ef('0x11')](function(){var _0x332a4c=_0x3d8684(this);_0x332a4c[_0x16ef('0x15')](_0x16ef('0x40')+_0x332a4c[_0x16ef('0x36')]('li')[_0x16ef('0x23')]+_0x16ef('0x41'));});});_0x99d3c1(_0x5e7751);_0x5b86cb[_0x16ef('0x42')][_0x16ef('0x33')](this);_0x3d8684(window)['trigger'](_0x16ef('0x43'),_0x1ebb28);};_0x3d8684['fn'][_0x16ef('0x2')]=function(_0x1345b4){var _0x610ab9=_0x3d8684(this);if(!_0x610ab9[_0x16ef('0x23')])return _0x610ab9;_0x5b86cb=_0x3d8684[_0x16ef('0x44')]({},_0x354e5f,_0x1345b4);_0x610ab9[_0x16ef('0x45')]=new _0x3d8684[(_0x16ef('0x2'))](_0x3d8684(this));return _0x610ab9;};_0x3d8684(function(){_0x3d8684(_0x16ef('0x46'))[_0x16ef('0x2')]();});}}(this));
/* Quatro Digital Smart Cart */
var _0x43d8=['availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','meta[name=currency]','content','.qd-ddc-quantity','quantity','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','message','actionButtons','filter','[data-sku=\x27','lastSku','outerHeight','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','https','load','qd-loaded','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','.qd-ddc-quantityMinus','click.qd_ddc_minus','qd-loading','focusout.qd_ddc_change','keyup.qd_ddc_change','.qd-ddc-prodRow','.qd-ddc-remove','click.qd_ddc_remove','removeProduct','stop','slideUp','remove','$1-$2$3','shippingCalculate','data','qdDdcLastPostalCode','BRA','done','.qd-ddc-cep-tooltip-text','logisticsInfo','slas','<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>','shippingEstimate','\x20dias\x20útéis','<tr></tr>','price','</td><td>','</td>','appendTo','tbody','insertBefore','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','updateItems','totalizers','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','index','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','avisso','allowRecalculate','buyButtonClicked','productId','prod_','prodId','qtt','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','prepend','ajaxStop','.qdDdcContainer','QD_smartCart','selector','dropDown','QD_buyButton','buyButton','smartCart','Oooops!\x20','getParent','closest','replace','abs','undefined','round','toFixed','split','length','join','_QuatroDigital_CartData','callback','Callbacks','error','object','info','warn','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','toLowerCase','aviso','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','vzrafvbany%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>','skuName','name','smartCheckout','vtexjs','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','removeClass','qd-bb-lightBoxProdAdd','body','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','keyCode','find','.qd-ddc-scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20.qd-ddc-cep','val','keyup.qd_ddc_cep','formatCepField','.qd-ddc-shipping\x20.qd-ddc-cep-ok','.qd-ddc-cep-btn','click','preventDefault','toggle','.qd-ddc-cep-close','hide','click._QD_DDC_closeShipping','target','.qd-ddc-cep-tooltip','.qd-ddc-cep-ok','updateOnlyHover','getCartInfoByUrl','simpleCart','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','linkCart','html','continueShopping','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','emptyCart','each','call','clone','.qd-ddc-infoTotalValue','total','.qd-ddc-infoTotalItems','.qd-ddc-infoAllTotal','allTotal','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','getOrderForm','function','_QuatroDigital_AmountProduct','exec','addClass','qd-ddc-prodLoaded','QD_checkoutQueue','shippingData','cartIsEmpty','qd-ddc-noItems','productCategoryIds','attr'];(function(_0x41c43f,_0x5be7a6){var _0x48be45=function(_0x4eaa2a){while(--_0x4eaa2a){_0x41c43f['push'](_0x41c43f['shift']());}};_0x48be45(++_0x5be7a6);}(_0x43d8,0x161));var _0x47d8=function(_0xca891,_0x10fb9c){_0xca891=_0xca891-0x0;var _0x4e7f50=_0x43d8[_0xca891];return _0x4e7f50;};(function(_0x3f4087){_0x3f4087['fn'][_0x47d8('0x0')]=_0x3f4087['fn'][_0x47d8('0x1')];}(jQuery));function qd_number_format(_0x106546,_0x3ab8fb,_0x18e867,_0x5dad06){_0x106546=(_0x106546+'')[_0x47d8('0x2')](/[^0-9+\-Ee.]/g,'');_0x106546=isFinite(+_0x106546)?+_0x106546:0x0;_0x3ab8fb=isFinite(+_0x3ab8fb)?Math[_0x47d8('0x3')](_0x3ab8fb):0x0;_0x5dad06=_0x47d8('0x4')===typeof _0x5dad06?',':_0x5dad06;_0x18e867=_0x47d8('0x4')===typeof _0x18e867?'.':_0x18e867;var _0x686b30='',_0x686b30=function(_0x4af212,_0x3fc501){var _0x3ab8fb=Math['pow'](0xa,_0x3fc501);return''+(Math[_0x47d8('0x5')](_0x4af212*_0x3ab8fb)/_0x3ab8fb)[_0x47d8('0x6')](_0x3fc501);},_0x686b30=(_0x3ab8fb?_0x686b30(_0x106546,_0x3ab8fb):''+Math[_0x47d8('0x5')](_0x106546))[_0x47d8('0x7')]('.');0x3<_0x686b30[0x0][_0x47d8('0x8')]&&(_0x686b30[0x0]=_0x686b30[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x5dad06));(_0x686b30[0x1]||'')[_0x47d8('0x8')]<_0x3ab8fb&&(_0x686b30[0x1]=_0x686b30[0x1]||'',_0x686b30[0x1]+=Array(_0x3ab8fb-_0x686b30[0x1][_0x47d8('0x8')]+0x1)['join']('0'));return _0x686b30[_0x47d8('0x9')](_0x18e867);};(function(){try{window['_QuatroDigital_CartData']=window[_0x47d8('0xa')]||{},window['_QuatroDigital_CartData']['callback']=window['_QuatroDigital_CartData'][_0x47d8('0xb')]||$[_0x47d8('0xc')]();}catch(_0x56bcfa){'undefined'!==typeof console&&'function'===typeof console[_0x47d8('0xd')]&&console[_0x47d8('0xd')]('Oooops!\x20',_0x56bcfa['message']);}}());(function(_0x4a00c2){try{var _0x54f712=jQuery,_0x2b782d=function(_0x40b831,_0x143330){if(_0x47d8('0xe')===typeof console&&_0x47d8('0x4')!==typeof console[_0x47d8('0xd')]&&_0x47d8('0x4')!==typeof console[_0x47d8('0xf')]&&_0x47d8('0x4')!==typeof console[_0x47d8('0x10')]){var _0x3f8449;_0x47d8('0xe')===typeof _0x40b831?(_0x40b831[_0x47d8('0x11')](_0x47d8('0x12')),_0x3f8449=_0x40b831):_0x3f8449=[_0x47d8('0x12')+_0x40b831];if(_0x47d8('0x4')===typeof _0x143330||_0x47d8('0x13')!==_0x143330[_0x47d8('0x14')]()&&_0x47d8('0x15')!==_0x143330[_0x47d8('0x14')]())if(_0x47d8('0x4')!==typeof _0x143330&&_0x47d8('0xf')===_0x143330[_0x47d8('0x14')]())try{console[_0x47d8('0xf')][_0x47d8('0x16')](console,_0x3f8449);}catch(_0x2c4d76){try{console[_0x47d8('0xf')](_0x3f8449[_0x47d8('0x9')]('\x0a'));}catch(_0x5cb750){}}else try{console['error'][_0x47d8('0x16')](console,_0x3f8449);}catch(_0x3051b3){try{console['error'](_0x3f8449['join']('\x0a'));}catch(_0x4a0085){}}else try{console[_0x47d8('0x10')][_0x47d8('0x16')](console,_0x3f8449);}catch(_0x3a2815){try{console[_0x47d8('0x10')](_0x3f8449['join']('\x0a'));}catch(_0x31b44b){}}}};window[_0x47d8('0x17')]=window['_QuatroDigital_DropDown']||{};window[_0x47d8('0x17')][_0x47d8('0x18')]=!0x0;_0x54f712[_0x47d8('0x19')]=function(){};_0x54f712['fn'][_0x47d8('0x19')]=function(){return{'fn':new _0x54f712()};};var _0x507736=function(_0x4cef50){var _0x426a7a={'q':_0x47d8('0x1a')};return function(_0x2cfe2f){var _0x3ec4be=function(_0x1c792c){return _0x1c792c;};var _0x1f4d26=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2cfe2f=_0x2cfe2f['d'+_0x1f4d26[0x10]+'c'+_0x1f4d26[0x11]+'m'+_0x3ec4be(_0x1f4d26[0x1])+'n'+_0x1f4d26[0xd]]['l'+_0x1f4d26[0x12]+'c'+_0x1f4d26[0x0]+'ti'+_0x3ec4be('o')+'n'];var _0x41f9b2=function(_0x45253f){return escape(encodeURIComponent(_0x45253f['replace'](/\./g,'¨')[_0x47d8('0x2')](/[a-zA-Z]/g,function(_0x48fb83){return String[_0x47d8('0x1b')](('Z'>=_0x48fb83?0x5a:0x7a)>=(_0x48fb83=_0x48fb83[_0x47d8('0x1c')](0x0)+0xd)?_0x48fb83:_0x48fb83-0x1a);})));};var _0x3c27ef=_0x41f9b2(_0x2cfe2f[[_0x1f4d26[0x9],_0x3ec4be('o'),_0x1f4d26[0xc],_0x1f4d26[_0x3ec4be(0xd)]][_0x47d8('0x9')]('')]);_0x41f9b2=_0x41f9b2((window[['js',_0x3ec4be('no'),'m',_0x1f4d26[0x1],_0x1f4d26[0x4]['toUpperCase'](),_0x47d8('0x1d')][_0x47d8('0x9')]('')]||_0x47d8('0x1e'))+['.v',_0x1f4d26[0xd],'e',_0x3ec4be('x'),'co',_0x3ec4be('mm'),_0x47d8('0x1f'),_0x1f4d26[0x1],'.c',_0x3ec4be('o'),'m.',_0x1f4d26[0x13],'r'][_0x47d8('0x9')](''));for(var _0x142d18 in _0x426a7a){if(_0x41f9b2===_0x142d18+_0x426a7a[_0x142d18]||_0x3c27ef===_0x142d18+_0x426a7a[_0x142d18]){var _0x481ed2='tr'+_0x1f4d26[0x11]+'e';break;}_0x481ed2='f'+_0x1f4d26[0x0]+'ls'+_0x3ec4be(_0x1f4d26[0x1])+'';}_0x3ec4be=!0x1;-0x1<_0x2cfe2f[[_0x1f4d26[0xc],'e',_0x1f4d26[0x0],'rc',_0x1f4d26[0x9]][_0x47d8('0x9')]('')][_0x47d8('0x20')](_0x47d8('0x21'))&&(_0x3ec4be=!0x0);return[_0x481ed2,_0x3ec4be];}(_0x4cef50);}(window);if(!eval(_0x507736[0x0]))return _0x507736[0x1]?_0x2b782d(_0x47d8('0x22')):!0x1;_0x54f712[_0x47d8('0x19')]=function(_0x3f18c0,_0x514dde){var _0x2843fe=_0x54f712(_0x3f18c0);if(!_0x2843fe[_0x47d8('0x8')])return _0x2843fe;var _0xdfc662=_0x54f712[_0x47d8('0x23')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':_0x47d8('0x24'),'cartTotal':_0x47d8('0x25'),'emptyCart':_0x47d8('0x26'),'continueShopping':_0x47d8('0x27'),'shippingForm':_0x47d8('0x28')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'forceImageHTTPS':!0x1,'skuName':function(_0x3b7d7f){return _0x3b7d7f[_0x47d8('0x29')]||_0x3b7d7f[_0x47d8('0x2a')];},'callback':function(){},'callbackProductsList':function(){}},_0x514dde);_0x54f712('');var _0x547793=this;if(_0xdfc662[_0x47d8('0x2b')]){var _0x49e512=!0x1;_0x47d8('0x4')===typeof window[_0x47d8('0x2c')]&&(_0x2b782d('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN'),_0x54f712['ajax']({'url':_0x47d8('0x2d'),'async':!0x1,'dataType':_0x47d8('0x2e'),'error':function(){_0x2b782d(_0x47d8('0x2f'));_0x49e512=!0x0;}}));if(_0x49e512)return _0x2b782d(_0x47d8('0x30'));}if('object'===typeof window[_0x47d8('0x2c')]&&_0x47d8('0x4')!==typeof window[_0x47d8('0x2c')][_0x47d8('0x31')])var _0x4a00c2=window[_0x47d8('0x2c')][_0x47d8('0x31')];else if(_0x47d8('0xe')===typeof vtex&&_0x47d8('0xe')===typeof vtex['checkout']&&_0x47d8('0x4')!==typeof vtex[_0x47d8('0x31')]['SDK'])_0x4a00c2=new vtex[(_0x47d8('0x31'))][(_0x47d8('0x32'))]();else return _0x2b782d('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x547793[_0x47d8('0x33')]=_0x47d8('0x34');var _0x3fbbf0=function(_0x34bcd8){_0x54f712(this)[_0x47d8('0x35')](_0x34bcd8);_0x34bcd8['find'](_0x47d8('0x36'))[_0x47d8('0x37')](_0x54f712(_0x47d8('0x38')))['on'](_0x47d8('0x39'),function(){_0x2843fe[_0x47d8('0x3a')](_0x47d8('0x3b'));_0x54f712(document[_0x47d8('0x3c')])[_0x47d8('0x3a')](_0x47d8('0x3d'));});_0x54f712(document)[_0x47d8('0x3e')](_0x47d8('0x3f'))['on']('keyup.qd_ddc_closeFn',function(_0x57ce1c){0x1b==_0x57ce1c[_0x47d8('0x40')]&&(_0x2843fe[_0x47d8('0x3a')](_0x47d8('0x3b')),_0x54f712(document[_0x47d8('0x3c')])[_0x47d8('0x3a')]('qd-bb-lightBoxBodyProdAdd'));});var _0x42f19a=_0x34bcd8[_0x47d8('0x41')]('.qd-ddc-prodWrapper');_0x34bcd8[_0x47d8('0x41')](_0x47d8('0x42'))['on']('click.qd_ddc_scrollUp',function(){_0x547793[_0x47d8('0x43')]('-',void 0x0,void 0x0,_0x42f19a);return!0x1;});_0x34bcd8[_0x47d8('0x41')](_0x47d8('0x44'))['on'](_0x47d8('0x45'),function(){_0x547793[_0x47d8('0x43')](void 0x0,void 0x0,void 0x0,_0x42f19a);return!0x1;});var _0x4e30c4=_0x34bcd8[_0x47d8('0x41')]('.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text');_0x34bcd8['find'](_0x47d8('0x46'))[_0x47d8('0x47')]('')['on'](_0x47d8('0x48'),function(_0x4bf597){_0x547793[_0x47d8('0x49')](_0x54f712(this));0xd==_0x4bf597['keyCode']&&_0x34bcd8[_0x47d8('0x41')](_0x47d8('0x4a'))['click']();});_0x34bcd8[_0x47d8('0x41')](_0x47d8('0x4b'))[_0x47d8('0x4c')](function(_0x15b3b3){_0x15b3b3[_0x47d8('0x4d')]();_0x4e30c4[_0x47d8('0x4e')]();});_0x34bcd8[_0x47d8('0x41')](_0x47d8('0x4f'))[_0x47d8('0x4c')](function(_0x3104ce){_0x3104ce[_0x47d8('0x4d')]();_0x4e30c4[_0x47d8('0x50')]();});_0x54f712(document)[_0x47d8('0x3e')](_0x47d8('0x51'))['on'](_0x47d8('0x51'),function(_0xa63f9e){_0x54f712(_0xa63f9e[_0x47d8('0x52')])[_0x47d8('0x1')](_0x34bcd8['find'](_0x47d8('0x53')))[_0x47d8('0x8')]||_0x4e30c4[_0x47d8('0x50')]();});_0x34bcd8[_0x47d8('0x41')](_0x47d8('0x54'))['click'](function(_0x63c762){_0x63c762['preventDefault']();_0x547793['shippingCalculate'](_0x34bcd8[_0x47d8('0x41')]('.qd-ddc-cep'));});if(_0xdfc662[_0x47d8('0x55')]){var _0x514dde=0x0;_0x54f712(this)['on']('mouseenter.qd_ddc_hover',function(){var _0x34bcd8=function(){window[_0x47d8('0x17')][_0x47d8('0x18')]&&(_0x547793[_0x47d8('0x56')](),window[_0x47d8('0x17')][_0x47d8('0x18')]=!0x1,_0x54f712['fn'][_0x47d8('0x57')](!0x0),_0x547793['cartIsEmpty']());};_0x514dde=setInterval(function(){_0x34bcd8();},0x258);_0x34bcd8();});_0x54f712(this)['on']('mouseleave.qd_ddc_hover',function(){clearInterval(_0x514dde);});}};var _0x198c55=function(_0x6f0dcd){_0x6f0dcd=_0x54f712(_0x6f0dcd);_0xdfc662['texts']['cartTotal']=_0xdfc662[_0x47d8('0x58')][_0x47d8('0x59')][_0x47d8('0x2')](_0x47d8('0x5a'),_0x47d8('0x5b'));_0xdfc662[_0x47d8('0x58')][_0x47d8('0x59')]=_0xdfc662[_0x47d8('0x58')][_0x47d8('0x59')][_0x47d8('0x2')](_0x47d8('0x5c'),_0x47d8('0x5d'));_0xdfc662['texts'][_0x47d8('0x59')]=_0xdfc662[_0x47d8('0x58')][_0x47d8('0x59')][_0x47d8('0x2')](_0x47d8('0x5e'),_0x47d8('0x5f'));_0xdfc662['texts'][_0x47d8('0x59')]=_0xdfc662[_0x47d8('0x58')][_0x47d8('0x59')][_0x47d8('0x2')]('#total',_0x47d8('0x60'));_0x6f0dcd[_0x47d8('0x41')]('.qd-ddc-viewCart')['html'](_0xdfc662['texts'][_0x47d8('0x61')]);_0x6f0dcd[_0x47d8('0x41')]('.qd_ddc_continueShopping')[_0x47d8('0x62')](_0xdfc662[_0x47d8('0x58')][_0x47d8('0x63')]);_0x6f0dcd[_0x47d8('0x41')]('.qd-ddc-checkout')['html'](_0xdfc662[_0x47d8('0x58')][_0x47d8('0x64')]);_0x6f0dcd[_0x47d8('0x41')](_0x47d8('0x65'))[_0x47d8('0x62')](_0xdfc662[_0x47d8('0x58')][_0x47d8('0x59')]);_0x6f0dcd[_0x47d8('0x41')](_0x47d8('0x66'))[_0x47d8('0x62')](_0xdfc662['texts'][_0x47d8('0x67')]);_0x6f0dcd['find']('.qd-ddc-emptyCart\x20p')['html'](_0xdfc662['texts'][_0x47d8('0x68')]);return _0x6f0dcd;}(this[_0x47d8('0x33')]);var _0x3555b6=0x0;_0x2843fe[_0x47d8('0x69')](function(){0x0<_0x3555b6?_0x3fbbf0[_0x47d8('0x6a')](this,_0x198c55[_0x47d8('0x6b')]()):_0x3fbbf0[_0x47d8('0x6a')](this,_0x198c55);_0x3555b6++;});window['_QuatroDigital_CartData'][_0x47d8('0xb')]['add'](function(){_0x54f712(_0x47d8('0x6c'))[_0x47d8('0x62')](window[_0x47d8('0xa')][_0x47d8('0x6d')]||'--');_0x54f712(_0x47d8('0x6e'))['html'](window[_0x47d8('0xa')]['qtt']||'0');_0x54f712('.qd-ddc-infoTotalShipping')[_0x47d8('0x62')](window[_0x47d8('0xa')]['shipping']||'--');_0x54f712(_0x47d8('0x6f'))['html'](window[_0x47d8('0xa')][_0x47d8('0x70')]||'--');});var _0x3878ae=function(_0x359c8f,_0x516b7e){if(_0x47d8('0x4')===typeof _0x359c8f[_0x47d8('0x71')])return _0x2b782d(_0x47d8('0x72'));_0x547793[_0x47d8('0x73')]['call'](this,_0x516b7e);};_0x547793[_0x47d8('0x56')]=function(_0x1baaf5,_0x5388ac){_0x47d8('0x4')!=typeof _0x5388ac?window[_0x47d8('0x17')][_0x47d8('0x74')]=_0x5388ac:window[_0x47d8('0x17')][_0x47d8('0x74')]&&(_0x5388ac=window[_0x47d8('0x17')][_0x47d8('0x74')]);setTimeout(function(){window[_0x47d8('0x17')][_0x47d8('0x74')]=void 0x0;},_0xdfc662[_0x47d8('0x75')]);_0x54f712(_0x47d8('0x76'))[_0x47d8('0x3a')]('qd-ddc-prodLoaded');if(_0xdfc662['smartCheckout']){var _0x3d4bea=function(_0x314de6){window[_0x47d8('0x17')][_0x47d8('0x77')]=_0x314de6;_0x3878ae(_0x314de6,_0x5388ac);_0x47d8('0x4')!==typeof window['_QuatroDigital_AmountProduct']&&_0x47d8('0x78')===typeof window[_0x47d8('0x79')][_0x47d8('0x7a')]&&window[_0x47d8('0x79')]['exec'][_0x47d8('0x6a')](this);_0x54f712('.qd-ddc-wrapper')[_0x47d8('0x7b')](_0x47d8('0x7c'));};_0x47d8('0x4')!==typeof window[_0x47d8('0x17')][_0x47d8('0x77')]?(_0x3d4bea(window[_0x47d8('0x17')]['getOrderForm']),'function'===typeof _0x1baaf5&&_0x1baaf5(window[_0x47d8('0x17')][_0x47d8('0x77')])):_0x54f712[_0x47d8('0x7d')]([_0x47d8('0x71'),'totalizers',_0x47d8('0x7e')],{'done':function(_0x453734){_0x3d4bea['call'](this,_0x453734);_0x47d8('0x78')===typeof _0x1baaf5&&_0x1baaf5(_0x453734);},'fail':function(_0x801b3a){_0x2b782d(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0x801b3a]);}});}else alert('Este\x20método\x20esta\x20descontinuado!');};_0x547793[_0x47d8('0x7f')]=function(){var _0x5260d7=_0x54f712(_0x47d8('0x76'));_0x5260d7[_0x47d8('0x41')]('.qd-ddc-prodRow')[_0x47d8('0x8')]?_0x5260d7[_0x47d8('0x3a')](_0x47d8('0x80')):_0x5260d7['addClass'](_0x47d8('0x80'));};_0x547793[_0x47d8('0x73')]=function(_0xf202ad){var _0x514dde=_0x54f712('.qd-ddc-prodWrapper2');_0x514dde['empty']();_0x514dde[_0x47d8('0x69')](function(){var _0x514dde=_0x54f712(this),_0x58dd45,_0x55667e,_0x6833bb=_0x54f712(''),_0x5d5097;for(_0x5d5097 in window[_0x47d8('0x17')][_0x47d8('0x77')]['items'])if(_0x47d8('0xe')===typeof window[_0x47d8('0x17')][_0x47d8('0x77')]['items'][_0x5d5097]){var _0x417bd4=window[_0x47d8('0x17')][_0x47d8('0x77')]['items'][_0x5d5097];var _0x3f18c0=_0x417bd4[_0x47d8('0x81')][_0x47d8('0x2')](/^\/|\/$/g,'')['split']('/');var _0x583de0=_0x54f712('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0x583de0[_0x47d8('0x82')]({'data-sku':_0x417bd4['id'],'data-sku-index':_0x5d5097,'data-qd-departament':_0x3f18c0[0x0],'data-qd-category':_0x3f18c0[_0x3f18c0[_0x47d8('0x8')]-0x1]});_0x583de0[_0x47d8('0x7b')]('qd-ddc-'+_0x417bd4[_0x47d8('0x83')]);_0x583de0['find'](_0x47d8('0x84'))['append'](_0xdfc662[_0x47d8('0x29')](_0x417bd4));_0x583de0[_0x47d8('0x41')](_0x47d8('0x85'))[_0x47d8('0x35')](isNaN(_0x417bd4['sellingPrice'])?_0x417bd4[_0x47d8('0x86')]:0x0==_0x417bd4['sellingPrice']?'Grátis':(_0x54f712(_0x47d8('0x87'))[_0x47d8('0x82')](_0x47d8('0x88'))||'R$')+'\x20'+qd_number_format(_0x417bd4['sellingPrice']/0x64,0x2,',','.'));_0x583de0[_0x47d8('0x41')](_0x47d8('0x89'))[_0x47d8('0x82')]({'data-sku':_0x417bd4['id'],'data-sku-index':_0x5d5097})['val'](_0x417bd4[_0x47d8('0x8a')]);_0x583de0[_0x47d8('0x41')]('.qd-ddc-remove')[_0x47d8('0x82')]({'data-sku':_0x417bd4['id'],'data-sku-index':_0x5d5097});_0x547793[_0x47d8('0x8b')](_0x417bd4['id'],_0x583de0[_0x47d8('0x41')](_0x47d8('0x8c')),_0x417bd4[_0x47d8('0x8d')]);_0x583de0[_0x47d8('0x41')](_0x47d8('0x8e'))[_0x47d8('0x82')]({'data-sku':_0x417bd4['id'],'data-sku-index':_0x5d5097});_0x583de0['appendTo'](_0x514dde);_0x6833bb=_0x6833bb['add'](_0x583de0);}try{var _0x3c7c7f=_0x514dde[_0x47d8('0x0')](_0x47d8('0x76'))[_0x47d8('0x41')]('.qd-ddc-shipping\x20input');_0x3c7c7f[_0x47d8('0x8')]&&''==_0x3c7c7f['val']()&&window[_0x47d8('0x17')][_0x47d8('0x77')]['shippingData'][_0x47d8('0x8f')]&&_0x3c7c7f[_0x47d8('0x47')](window['_QuatroDigital_DropDown'][_0x47d8('0x77')][_0x47d8('0x7e')][_0x47d8('0x8f')][_0x47d8('0x90')]);}catch(_0x2edada){_0x2b782d(_0x47d8('0x91')+_0x2edada[_0x47d8('0x92')],_0x47d8('0x15'));}_0x547793[_0x47d8('0x93')](_0x514dde);_0x547793[_0x47d8('0x7f')]();_0xf202ad&&_0xf202ad['lastSku']&&function(){_0x55667e=_0x6833bb[_0x47d8('0x94')](_0x47d8('0x95')+_0xf202ad[_0x47d8('0x96')]+'\x27]');_0x55667e['length']&&(_0x58dd45=0x0,_0x6833bb[_0x47d8('0x69')](function(){var _0xf202ad=_0x54f712(this);if(_0xf202ad['is'](_0x55667e))return!0x1;_0x58dd45+=_0xf202ad[_0x47d8('0x97')]();}),_0x547793[_0x47d8('0x43')](void 0x0,void 0x0,_0x58dd45,_0x514dde[_0x47d8('0x37')](_0x514dde[_0x47d8('0x98')]())),_0x6833bb[_0x47d8('0x3a')](_0x47d8('0x99')),function(_0x48aece){_0x48aece[_0x47d8('0x7b')](_0x47d8('0x9a'));_0x48aece[_0x47d8('0x7b')](_0x47d8('0x99'));setTimeout(function(){_0x48aece[_0x47d8('0x3a')]('qd-ddc-lastAdded');},_0xdfc662['timeRemoveNewItemClass']);}(_0x55667e),_0x54f712(document[_0x47d8('0x3c')])[_0x47d8('0x7b')](_0x47d8('0x9b')),setTimeout(function(){_0x54f712(document[_0x47d8('0x3c')])[_0x47d8('0x3a')]('qd-ddc-product-add-time-v2');},_0xdfc662[_0x47d8('0x75')]));}();});(function(){_QuatroDigital_DropDown['getOrderForm'][_0x47d8('0x71')]['length']?(_0x54f712(_0x47d8('0x3c'))['removeClass'](_0x47d8('0x9c'))[_0x47d8('0x7b')](_0x47d8('0x9d')),setTimeout(function(){_0x54f712(_0x47d8('0x3c'))['removeClass'](_0x47d8('0x9e'));},_0xdfc662['timeRemoveNewItemClass'])):_0x54f712('body')[_0x47d8('0x3a')](_0x47d8('0x9f'))[_0x47d8('0x7b')](_0x47d8('0x9c'));}());_0x47d8('0x78')===typeof _0xdfc662[_0x47d8('0xa0')]?_0xdfc662[_0x47d8('0xa0')]['call'](this):_0x2b782d(_0x47d8('0xa1'));};_0x547793[_0x47d8('0x8b')]=function(_0x41c944,_0x48d634,_0x3091a0){function _0x57498e(){_0xdfc662['forceImageHTTPS']&&'string'==typeof _0x3091a0&&(_0x3091a0=_0x3091a0[_0x47d8('0x2')]('http',_0x47d8('0xa2')));_0x48d634[_0x47d8('0x3a')]('qd-loaded')[_0x47d8('0xa3')](function(){_0x54f712(this)[_0x47d8('0x7b')](_0x47d8('0xa4'));})['attr'](_0x47d8('0xa5'),_0x3091a0);}_0x3091a0?_0x57498e():isNaN(_0x41c944)?_0x2b782d(_0x47d8('0xa6'),'alerta'):alert(_0x47d8('0xa7'));};_0x547793['actionButtons']=function(_0x40c3b3){var _0x514dde=function(_0x42604f,_0x8c0e2c){var _0x4d6830=_0x54f712(_0x42604f);var _0x43e3bd=_0x4d6830[_0x47d8('0x82')](_0x47d8('0xa8'));var _0x3f18c0=_0x4d6830[_0x47d8('0x82')](_0x47d8('0xa9'));if(_0x43e3bd){var _0x4d48b7=parseInt(_0x4d6830[_0x47d8('0x47')]())||0x1;_0x547793[_0x47d8('0xaa')]([_0x43e3bd,_0x3f18c0],_0x4d48b7,_0x4d48b7+0x1,function(_0x46cfc5){_0x4d6830[_0x47d8('0x47')](_0x46cfc5);'function'===typeof _0x8c0e2c&&_0x8c0e2c();});}};var _0x20e8f3=function(_0x1632ea,_0xe6c125){var _0x514dde=_0x54f712(_0x1632ea);var _0x536370=_0x514dde[_0x47d8('0x82')]('data-sku');var _0x4582d4=_0x514dde['attr'](_0x47d8('0xa9'));if(_0x536370){var _0x3f18c0=parseInt(_0x514dde['val']())||0x2;_0x547793['changeQantity']([_0x536370,_0x4582d4],_0x3f18c0,_0x3f18c0-0x1,function(_0x135532){_0x514dde[_0x47d8('0x47')](_0x135532);'function'===typeof _0xe6c125&&_0xe6c125();});}};var _0x3f3a91=function(_0x117c21,_0x172f57){var _0x342048=_0x54f712(_0x117c21);var _0x4b4b2e=_0x342048['attr'](_0x47d8('0xa8'));var _0x3f18c0=_0x342048[_0x47d8('0x82')](_0x47d8('0xa9'));if(_0x4b4b2e){var _0x5bdeb3=parseInt(_0x342048[_0x47d8('0x47')]())||0x1;_0x547793[_0x47d8('0xaa')]([_0x4b4b2e,_0x3f18c0],0x1,_0x5bdeb3,function(_0x5bc102){_0x342048[_0x47d8('0x47')](_0x5bc102);_0x47d8('0x78')===typeof _0x172f57&&_0x172f57();});}};var _0x3f18c0=_0x40c3b3[_0x47d8('0x41')](_0x47d8('0xab'));_0x3f18c0[_0x47d8('0x7b')](_0x47d8('0xac'))[_0x47d8('0x69')](function(){var _0x40c3b3=_0x54f712(this);_0x40c3b3[_0x47d8('0x41')](_0x47d8('0xad'))['on'](_0x47d8('0xae'),function(_0x122e1e){_0x122e1e[_0x47d8('0x4d')]();_0x3f18c0['addClass']('qd-loading');_0x514dde(_0x40c3b3[_0x47d8('0x41')](_0x47d8('0x89')),function(){_0x3f18c0[_0x47d8('0x3a')]('qd-loading');});});_0x40c3b3[_0x47d8('0x41')](_0x47d8('0xaf'))['on'](_0x47d8('0xb0'),function(_0x5320fe){_0x5320fe[_0x47d8('0x4d')]();_0x3f18c0[_0x47d8('0x7b')](_0x47d8('0xb1'));_0x20e8f3(_0x40c3b3[_0x47d8('0x41')]('.qd-ddc-quantity'),function(){_0x3f18c0[_0x47d8('0x3a')](_0x47d8('0xb1'));});});_0x40c3b3[_0x47d8('0x41')](_0x47d8('0x89'))['on'](_0x47d8('0xb2'),function(){_0x3f18c0[_0x47d8('0x7b')]('qd-loading');_0x3f3a91(this,function(){_0x3f18c0[_0x47d8('0x3a')](_0x47d8('0xb1'));});});_0x40c3b3[_0x47d8('0x41')]('.qd-ddc-quantity')['on'](_0x47d8('0xb3'),function(_0x4118fb){0xd==_0x4118fb[_0x47d8('0x40')]&&(_0x3f18c0['addClass'](_0x47d8('0xb1')),_0x3f3a91(this,function(){_0x3f18c0[_0x47d8('0x3a')](_0x47d8('0xb1'));}));});});_0x40c3b3[_0x47d8('0x41')](_0x47d8('0xb4'))['each'](function(){var _0x40c3b3=_0x54f712(this);_0x40c3b3['find'](_0x47d8('0xb5'))['on'](_0x47d8('0xb6'),function(){_0x40c3b3[_0x47d8('0x7b')](_0x47d8('0xb1'));_0x547793[_0x47d8('0xb7')](_0x54f712(this),function(_0x248eff){_0x248eff?_0x40c3b3[_0x47d8('0xb8')](!0x0)[_0x47d8('0xb9')](function(){_0x40c3b3[_0x47d8('0xba')]();_0x547793[_0x47d8('0x7f')]();}):_0x40c3b3[_0x47d8('0x3a')]('qd-loading');});return!0x1;});});};_0x547793[_0x47d8('0x49')]=function(_0x352085){var _0x302cd8=_0x352085[_0x47d8('0x47')]();_0x302cd8=_0x302cd8[_0x47d8('0x2')](/[^0-9\-]/g,'');_0x302cd8=_0x302cd8[_0x47d8('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x47d8('0xbb'));_0x302cd8=_0x302cd8[_0x47d8('0x2')](/(.{9}).*/g,'$1');_0x352085[_0x47d8('0x47')](_0x302cd8);};_0x547793[_0x47d8('0xbc')]=function(_0x26e89b){var _0x4032b7=_0x26e89b[_0x47d8('0x47')]();0x9<=_0x4032b7[_0x47d8('0x8')]&&(_0x26e89b[_0x47d8('0xbd')](_0x47d8('0xbe'))!=_0x4032b7&&_0x4a00c2['calculateShipping']({'postalCode':_0x4032b7,'country':_0x47d8('0xbf')})[_0x47d8('0xc0')](function(_0x1dc71a){_0x26e89b[_0x47d8('0x1')](_0x47d8('0xc1'))[_0x47d8('0x41')]('.qd-dd-cep-slas')[_0x47d8('0xba')]();window[_0x47d8('0x17')][_0x47d8('0x77')]=_0x1dc71a;_0x547793['getCartInfoByUrl']();_0x1dc71a=_0x1dc71a['shippingData'][_0x47d8('0xc2')][0x0][_0x47d8('0xc3')];for(var _0x3f18c0=_0x54f712(_0x47d8('0xc4')),_0x14b50d=0x0;_0x14b50d<_0x1dc71a['length'];_0x14b50d++){var _0x678ff6=_0x1dc71a[_0x14b50d],_0x182647=0x1<_0x678ff6['shippingEstimate']?_0x678ff6[_0x47d8('0xc5')]['replace']('bd','\x20dia\x20útil'):_0x678ff6[_0x47d8('0xc5')][_0x47d8('0x2')]('bd',_0x47d8('0xc6')),_0x5b0687=_0x54f712(_0x47d8('0xc7'));_0x5b0687['append']('<td>\x20R$\x20'+qd_number_format(_0x678ff6[_0x47d8('0xc8')]/0x64,0x2,',','.')+_0x47d8('0xc9')+_0x678ff6[_0x47d8('0x2a')]+',\x20entrega\x20em\x20'+_0x182647+'\x20para\x20o\x20CEP\x20'+_0x4032b7+_0x47d8('0xca'));_0x5b0687[_0x47d8('0xcb')](_0x3f18c0[_0x47d8('0x41')](_0x47d8('0xcc')));}_0x3f18c0[_0x47d8('0xcd')](_0x26e89b[_0x47d8('0x1')](_0x47d8('0xc1'))[_0x47d8('0x41')]('.qd-ddc-cep-close'));})[_0x47d8('0xce')](function(_0x5db33c){_0x2b782d([_0x47d8('0xcf'),_0x5db33c]);updateCartData();}),_0x26e89b[_0x47d8('0xbd')]('qdDdcLastPostalCode',_0x4032b7));};_0x547793['changeQantity']=function(_0x423eb3,_0x2fe2d7,_0xc65169,_0x5d3db7){function _0x37c313(_0x2bb4f7){_0x2bb4f7=_0x47d8('0xd0')!==typeof _0x2bb4f7?!0x1:_0x2bb4f7;_0x547793[_0x47d8('0x56')]();window[_0x47d8('0x17')][_0x47d8('0x18')]=!0x1;_0x547793[_0x47d8('0x7f')]();_0x47d8('0x4')!==typeof window[_0x47d8('0x79')]&&_0x47d8('0x78')===typeof window[_0x47d8('0x79')][_0x47d8('0x7a')]&&window['_QuatroDigital_AmountProduct'][_0x47d8('0x7a')][_0x47d8('0x6a')](this);_0x47d8('0x78')===typeof adminCart&&adminCart();_0x54f712['fn'][_0x47d8('0x57')](!0x0,void 0x0,_0x2bb4f7);_0x47d8('0x78')===typeof _0x5d3db7&&_0x5d3db7(_0x2fe2d7);}_0xc65169=_0xc65169||0x1;if(0x1>_0xc65169)return _0x2fe2d7;if(_0xdfc662[_0x47d8('0x2b')]){if('undefined'===typeof window[_0x47d8('0x17')][_0x47d8('0x77')]['items'][_0x423eb3[0x1]])return _0x2b782d(_0x47d8('0xd1')+_0x423eb3[0x1]+']'),_0x2fe2d7;window[_0x47d8('0x17')]['getOrderForm'][_0x47d8('0x71')][_0x423eb3[0x1]][_0x47d8('0x8a')]=_0xc65169;window[_0x47d8('0x17')][_0x47d8('0x77')][_0x47d8('0x71')][_0x423eb3[0x1]]['index']=_0x423eb3[0x1];_0x4a00c2[_0x47d8('0xd2')]([window[_0x47d8('0x17')][_0x47d8('0x77')][_0x47d8('0x71')][_0x423eb3[0x1]]],[_0x47d8('0x71'),_0x47d8('0xd3'),_0x47d8('0x7e')])[_0x47d8('0xc0')](function(_0x523c90){window[_0x47d8('0x17')][_0x47d8('0x77')]=_0x523c90;_0x37c313(!0x0);})[_0x47d8('0xce')](function(_0x4edf52){_0x2b782d([_0x47d8('0xd4'),_0x4edf52]);_0x37c313();});}else _0x2b782d(_0x47d8('0xd5'));};_0x547793[_0x47d8('0xb7')]=function(_0x2846b9,_0x3e1a26){function _0x590524(_0xe2f1c0){_0xe2f1c0=_0x47d8('0xd0')!==typeof _0xe2f1c0?!0x1:_0xe2f1c0;'undefined'!==typeof window['_QuatroDigital_AmountProduct']&&_0x47d8('0x78')===typeof window[_0x47d8('0x79')][_0x47d8('0x7a')]&&window[_0x47d8('0x79')][_0x47d8('0x7a')][_0x47d8('0x6a')](this);_0x47d8('0x78')===typeof adminCart&&adminCart();_0x54f712['fn']['simpleCart'](!0x0,void 0x0,_0xe2f1c0);_0x47d8('0x78')===typeof _0x3e1a26&&_0x3e1a26(_0x5cb559);}var _0x5cb559=!0x1,_0x3f18c0=_0x54f712(_0x2846b9)[_0x47d8('0x82')](_0x47d8('0xa9'));if(_0xdfc662[_0x47d8('0x2b')]){if(_0x47d8('0x4')===typeof window['_QuatroDigital_DropDown'][_0x47d8('0x77')][_0x47d8('0x71')][_0x3f18c0])return _0x2b782d(_0x47d8('0xd1')+_0x3f18c0+']'),_0x5cb559;window[_0x47d8('0x17')]['getOrderForm']['items'][_0x3f18c0][_0x47d8('0xd6')]=_0x3f18c0;_0x4a00c2['removeItems']([window[_0x47d8('0x17')][_0x47d8('0x77')][_0x47d8('0x71')][_0x3f18c0]],['items',_0x47d8('0xd3'),'shippingData'])[_0x47d8('0xc0')](function(_0x51fd3f){_0x5cb559=!0x0;window['_QuatroDigital_DropDown']['getOrderForm']=_0x51fd3f;_0x3878ae(_0x51fd3f);_0x590524(!0x0);})[_0x47d8('0xce')](function(_0x451ad5){_0x2b782d([_0x47d8('0xd7'),_0x451ad5]);_0x590524();});}else alert(_0x47d8('0xd8'));};_0x547793[_0x47d8('0x43')]=function(_0x3d5ae8,_0x20ff7a,_0x2a93f3,_0x1b04db){_0x1b04db=_0x1b04db||_0x54f712(_0x47d8('0xd9'));_0x3d5ae8=_0x3d5ae8||'+';_0x20ff7a=_0x20ff7a||0.9*_0x1b04db['height']();_0x1b04db[_0x47d8('0xb8')](!0x0,!0x0)['animate']({'scrollTop':isNaN(_0x2a93f3)?_0x3d5ae8+'='+_0x20ff7a+'px':_0x2a93f3});};_0xdfc662[_0x47d8('0x55')]||(_0x547793['getCartInfoByUrl'](),_0x54f712['fn'][_0x47d8('0x57')](!0x0));_0x54f712(window)['on'](_0x47d8('0xda'),function(){try{window['_QuatroDigital_DropDown']['getOrderForm']=void 0x0,_0x547793[_0x47d8('0x56')]();}catch(_0x2df822){_0x2b782d('Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20'+_0x2df822['message'],_0x47d8('0xdb'));}});_0x47d8('0x78')===typeof _0xdfc662[_0x47d8('0xb')]?_0xdfc662[_0x47d8('0xb')][_0x47d8('0x6a')](this):_0x2b782d('Callback\x20não\x20é\x20uma\x20função');};_0x54f712['fn'][_0x47d8('0x19')]=function(_0x27beaa){var _0x1dd37e=_0x54f712(this);_0x1dd37e['fn']=new _0x54f712[(_0x47d8('0x19'))](this,_0x27beaa);return _0x1dd37e;};}catch(_0x48bb6f){_0x47d8('0x4')!==typeof console&&_0x47d8('0x78')===typeof console['error']&&console[_0x47d8('0xd')]('Oooops!\x20',_0x48bb6f);}}(this));(function(_0x22115c){try{var _0x54797f=jQuery;window['_QuatroDigital_AmountProduct']=window[_0x47d8('0x79')]||{};window[_0x47d8('0x79')][_0x47d8('0x71')]={};window['_QuatroDigital_AmountProduct'][_0x47d8('0xdc')]=!0x1;window['_QuatroDigital_AmountProduct'][_0x47d8('0xdd')]=!0x1;window[_0x47d8('0x79')]['quickViewUpdate']=!0x1;var _0x5a2859=function(){if(window[_0x47d8('0x79')][_0x47d8('0xdc')]){var _0x499b61=!0x1;var _0x2d7b01={};window['_QuatroDigital_AmountProduct'][_0x47d8('0x71')]={};for(_0x2ca38e in window[_0x47d8('0x17')][_0x47d8('0x77')]['items'])if(_0x47d8('0xe')===typeof window[_0x47d8('0x17')]['getOrderForm'][_0x47d8('0x71')][_0x2ca38e]){var _0x3945fd=window[_0x47d8('0x17')]['getOrderForm'][_0x47d8('0x71')][_0x2ca38e];_0x47d8('0x4')!==typeof _0x3945fd[_0x47d8('0xde')]&&null!==_0x3945fd[_0x47d8('0xde')]&&''!==_0x3945fd[_0x47d8('0xde')]&&(window[_0x47d8('0x79')]['items'][_0x47d8('0xdf')+_0x3945fd['productId']]=window[_0x47d8('0x79')][_0x47d8('0x71')][_0x47d8('0xdf')+_0x3945fd[_0x47d8('0xde')]]||{},window[_0x47d8('0x79')]['items'][_0x47d8('0xdf')+_0x3945fd['productId']][_0x47d8('0xe0')]=_0x3945fd[_0x47d8('0xde')],_0x2d7b01[_0x47d8('0xdf')+_0x3945fd['productId']]||(window[_0x47d8('0x79')][_0x47d8('0x71')][_0x47d8('0xdf')+_0x3945fd[_0x47d8('0xde')]][_0x47d8('0xe1')]=0x0),window['_QuatroDigital_AmountProduct']['items']['prod_'+_0x3945fd['productId']][_0x47d8('0xe1')]+=_0x3945fd[_0x47d8('0x8a')],_0x499b61=!0x0,_0x2d7b01[_0x47d8('0xdf')+_0x3945fd[_0x47d8('0xde')]]=!0x0);}var _0x2ca38e=_0x499b61;}else _0x2ca38e=void 0x0;window[_0x47d8('0x79')][_0x47d8('0xdc')]&&(_0x54797f(_0x47d8('0xe2'))['remove'](),_0x54797f(_0x47d8('0xe3'))[_0x47d8('0x3a')](_0x47d8('0xe4')));for(var _0x3a563c in window[_0x47d8('0x79')][_0x47d8('0x71')]){_0x3945fd=window[_0x47d8('0x79')]['items'][_0x3a563c];if(_0x47d8('0xe')!==typeof _0x3945fd)return;_0x2d7b01=_0x54797f(_0x47d8('0xe5')+_0x3945fd[_0x47d8('0xe0')]+']')['getParent']('li');if(window['_QuatroDigital_AmountProduct'][_0x47d8('0xdc')]||!_0x2d7b01[_0x47d8('0x41')](_0x47d8('0xe2'))[_0x47d8('0x8')])_0x499b61=_0x54797f(_0x47d8('0xe6')),_0x499b61[_0x47d8('0x41')](_0x47d8('0xe7'))[_0x47d8('0x62')](_0x3945fd['qtt']),_0x3945fd=_0x2d7b01[_0x47d8('0x41')]('.qd_bap_wrapper_content'),_0x3945fd[_0x47d8('0x8')]?_0x3945fd[_0x47d8('0xe8')](_0x499b61)[_0x47d8('0x7b')]('qd-bap-item-added'):_0x2d7b01[_0x47d8('0xe8')](_0x499b61);}_0x2ca38e&&(window['_QuatroDigital_AmountProduct']['allowRecalculate']=!0x1);};window[_0x47d8('0x79')][_0x47d8('0x7a')]=function(){window['_QuatroDigital_AmountProduct'][_0x47d8('0xdc')]=!0x0;_0x5a2859['call'](this);};_0x54797f(document)[_0x47d8('0xe9')](function(){_0x5a2859[_0x47d8('0x6a')](this);});}catch(_0x4ae86c){_0x47d8('0x4')!==typeof console&&_0x47d8('0x78')===typeof console[_0x47d8('0xd')]&&console['error']('Oooops!\x20',_0x4ae86c);}}(this));(function(){try{var _0x32dfb8=jQuery,_0x1ea241,_0x5c7d4f={'selector':_0x47d8('0xea'),'dropDown':{},'buyButton':{}};_0x32dfb8[_0x47d8('0xeb')]=function(_0x441f62){var _0x1b7675={};_0x1ea241=_0x32dfb8['extend'](!0x0,{},_0x5c7d4f,_0x441f62);_0x441f62=_0x32dfb8(_0x1ea241[_0x47d8('0xec')])[_0x47d8('0x19')](_0x1ea241[_0x47d8('0xed')]);_0x1b7675['buyButton']=_0x47d8('0x4')!==typeof _0x1ea241[_0x47d8('0xed')][_0x47d8('0x55')]&&!0x1===_0x1ea241[_0x47d8('0xed')][_0x47d8('0x55')]?_0x32dfb8(_0x1ea241['selector'])[_0x47d8('0xee')](_0x441f62['fn'],_0x1ea241[_0x47d8('0xef')]):_0x32dfb8(_0x1ea241[_0x47d8('0xec')])[_0x47d8('0xee')](_0x1ea241[_0x47d8('0xef')]);_0x1b7675['dropDown']=_0x441f62;return _0x1b7675;};_0x32dfb8['fn'][_0x47d8('0xf0')]=function(){_0x47d8('0xe')===typeof console&&_0x47d8('0x78')===typeof console[_0x47d8('0xf')]&&console[_0x47d8('0xf')]('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x32dfb8['smartCart']=_0x32dfb8['fn'][_0x47d8('0xf0')];}catch(_0x4357b2){_0x47d8('0x4')!==typeof console&&_0x47d8('0x78')===typeof console[_0x47d8('0xd')]&&console[_0x47d8('0xd')](_0x47d8('0xf1'),_0x4357b2);}}());

/* Quatro Digital - Smart Image Load // Carlos Vinicius // Todos os direitos reservados */
var _0x45d6=['object','undefined','error','info','warn','unshift','alerta','toLowerCase','aviso','apply','300','find','imageWrapper','not','.qd-sil-on','img:visible','scrollTop','bottom','top','height','load','addClass','qd-sil-image-loaded','attr','replace','sizes','width','qd-sil-image','insertAfter','offset','push','each','extend','scroll','documentElement','QD_smartImageLoad','function','vzrafvbany%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','join','toUpperCase','ite','---','indexOf','Quatro\x20Digital\x20-\x20Smart\x20Image\x20Load'];(function(_0x22599f,_0x27ce85){var _0x18aad3=function(_0x19fc07){while(--_0x19fc07){_0x22599f['push'](_0x22599f['shift']());}};_0x18aad3(++_0x27ce85);}(_0x45d6,0xaa));var _0x3b23=function(_0x242647,_0x57ebdb){_0x242647=_0x242647-0x0;var _0x5e1823=_0x45d6[_0x242647];return _0x5e1823;};(function(_0x44a91b){'use strict';var _0x34b146=jQuery;if(typeof _0x34b146['fn'][_0x3b23('0x0')]===_0x3b23('0x1'))return;_0x34b146['fn'][_0x3b23('0x0')]=function(){};var _0x2b1072=function(_0x14d29d){var _0x5e92a5={'q':_0x3b23('0x2')};return function(_0x43093b){var _0x2d1c27,_0x1bb00a,_0x5ad4f5,_0x160301;_0x1bb00a=function(_0x5c19c5){return _0x5c19c5;};_0x5ad4f5=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x43093b=_0x43093b['d'+_0x5ad4f5[0x10]+'c'+_0x5ad4f5[0x11]+'m'+_0x1bb00a(_0x5ad4f5[0x1])+'n'+_0x5ad4f5[0xd]]['l'+_0x5ad4f5[0x12]+'c'+_0x5ad4f5[0x0]+'ti'+_0x1bb00a('o')+'n'];_0x2d1c27=function(_0x58947b){return escape(encodeURIComponent(_0x58947b['replace'](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x1d9407){return String[_0x3b23('0x3')](('Z'>=_0x1d9407?0x5a:0x7a)>=(_0x1d9407=_0x1d9407['charCodeAt'](0x0)+0xd)?_0x1d9407:_0x1d9407-0x1a);})));};var _0x1d0a2a=_0x2d1c27(_0x43093b[[_0x5ad4f5[0x9],_0x1bb00a('o'),_0x5ad4f5[0xc],_0x5ad4f5[_0x1bb00a(0xd)]][_0x3b23('0x4')]('')]);_0x2d1c27=_0x2d1c27((window[['js',_0x1bb00a('no'),'m',_0x5ad4f5[0x1],_0x5ad4f5[0x4][_0x3b23('0x5')](),_0x3b23('0x6')][_0x3b23('0x4')]('')]||_0x3b23('0x7'))+['.v',_0x5ad4f5[0xd],'e',_0x1bb00a('x'),'co',_0x1bb00a('mm'),'erc',_0x5ad4f5[0x1],'.c',_0x1bb00a('o'),'m.',_0x5ad4f5[0x13],'r'][_0x3b23('0x4')](''));for(var _0x3b0e39 in _0x5e92a5){if(_0x2d1c27===_0x3b0e39+_0x5e92a5[_0x3b0e39]||_0x1d0a2a===_0x3b0e39+_0x5e92a5[_0x3b0e39]){_0x160301='tr'+_0x5ad4f5[0x11]+'e';break;}_0x160301='f'+_0x5ad4f5[0x0]+'ls'+_0x1bb00a(_0x5ad4f5[0x1])+'';}_0x1bb00a=!0x1;-0x1<_0x43093b[[_0x5ad4f5[0xc],'e',_0x5ad4f5[0x0],'rc',_0x5ad4f5[0x9]][_0x3b23('0x4')]('')][_0x3b23('0x8')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x1bb00a=!0x0);return[_0x160301,_0x1bb00a];}(_0x14d29d);}(window);if(!eval(_0x2b1072[0x0]))return _0x2b1072[0x1]?_0x47afce('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x41189c=_0x3b23('0x9');var _0x47afce=function(_0x22e189,_0xb55890){if(_0x3b23('0xa')===typeof console&&_0x3b23('0xb')!==typeof console[_0x3b23('0xc')]&&_0x3b23('0xb')!==typeof console[_0x3b23('0xd')]&&_0x3b23('0xb')!==typeof console[_0x3b23('0xe')]){if(_0x3b23('0xa')==typeof _0x22e189&&_0x3b23('0x1')==typeof _0x22e189[_0x3b23('0xf')]){_0x22e189[_0x3b23('0xf')]('['+_0x41189c+']\x0a');var _0xa56530=_0x22e189;}else _0xa56530=['['+_0x41189c+']\x0a',_0x22e189];if(_0x3b23('0xb')==typeof _0xb55890||_0x3b23('0x10')!==_0xb55890[_0x3b23('0x11')]()&&_0x3b23('0x12')!==_0xb55890['toLowerCase']())if(_0x3b23('0xb')!=typeof _0xb55890&&_0x3b23('0xd')==_0xb55890[_0x3b23('0x11')]())try{console[_0x3b23('0xd')][_0x3b23('0x13')](console,_0xa56530);}catch(_0xa94d6b){try{console['info'](_0xa56530[_0x3b23('0x4')]('\x0a'));}catch(_0x42cdd8){}}else try{console[_0x3b23('0xc')][_0x3b23('0x13')](console,_0xa56530);}catch(_0x516373){try{console[_0x3b23('0xc')](_0xa56530['join']('\x0a'));}catch(_0x35df01){}}else try{console[_0x3b23('0xe')][_0x3b23('0x13')](console,_0xa56530);}catch(_0x5f2251){try{console[_0x3b23('0xe')](_0xa56530[_0x3b23('0x4')]('\x0a'));}catch(_0x3d7b6e){}}}};var _0x275a98=/(ids\/[0-9]+-)[0-9-]+/i;var _0x54870={'imageWrapper':'.qd_sil_img_wrapper','sizes':{'width':_0x3b23('0x14'),'height':'300'}};var _0x201467=function(_0x3b9572,_0x3be317){'use strict';_0x357f71();_0x34b146(window)['on']('QD_SIL_scroll\x20QuatroDigital.is_Callback',_0x357f71);function _0x357f71(){try{var _0x3a13b6=_0x3b9572[_0x3b23('0x15')](_0x3be317[_0x3b23('0x16')])[_0x3b23('0x17')](_0x3b23('0x18'))[_0x3b23('0x15')](_0x3b23('0x19'));if(!_0x3a13b6['length'])return;var _0x79d355=_0x34b146(window);var _0x1fb63d={'top':_0x79d355[_0x3b23('0x1a')]()};_0x1fb63d[_0x3b23('0x1b')]=_0x1fb63d[_0x3b23('0x1c')]+_0x79d355[_0x3b23('0x1d')]();var _0x33a0a2=_0x3a13b6['first']()[_0x3b23('0x1d')]();var _0x5c1cf6=_0x143f1d(_0x3a13b6,_0x1fb63d,_0x33a0a2);for(var _0x3db36d=0x0;_0x3db36d<_0x5c1cf6['length'];_0x3db36d++)_0x57d750(_0x34b146(_0x5c1cf6[_0x3db36d]));}catch(_0x32bb4c){typeof console!==_0x3b23('0xb')&&typeof console[_0x3b23('0xc')]===_0x3b23('0x1')&&console[_0x3b23('0xc')]('Problemas\x20:(\x20.\x20Detalhes:\x20',_0x32bb4c);}}function _0x57d750(_0x563a56){var _0x295b7c=_0x563a56['clone']();_0x295b7c['on'](_0x3b23('0x1e'),function(){_0x34b146(this)[_0x3b23('0x1f')](_0x3b23('0x20'));});_0x295b7c[_0x3b23('0x21')]({'src':_0x295b7c[0x0]['src'][_0x3b23('0x22')](_0x275a98,'$1'+_0x3be317[_0x3b23('0x23')][_0x3b23('0x24')]+'-'+_0x3be317['sizes'][_0x3b23('0x1d')]),'width':_0x3be317['sizes'][_0x3b23('0x24')],'height':_0x3be317[_0x3b23('0x23')][_0x3b23('0x1d')]});_0x295b7c[_0x3b23('0x1f')](_0x3b23('0x25'))[_0x3b23('0x26')](_0x563a56);_0x295b7c['closest'](_0x3be317[_0x3b23('0x16')])[_0x3b23('0x1f')]('qd-sil-on');}function _0x143f1d(_0x24efee,_0x3f7fd6,_0x3cf480){var _0x101daa;var _0x41253e=[];for(var _0x4da981=0x0;_0x4da981<_0x24efee['length'];_0x4da981++){_0x101daa=_0x34b146(_0x24efee[_0x4da981])[_0x3b23('0x27')]();_0x101daa[_0x3b23('0x1b')]=_0x101daa[_0x3b23('0x1c')]+_0x3cf480;if(!(_0x3f7fd6[_0x3b23('0x1b')]<_0x101daa[_0x3b23('0x1c')]||_0x3f7fd6[_0x3b23('0x1c')]>_0x101daa[_0x3b23('0x1b')])){_0x41253e[_0x3b23('0x28')](_0x24efee[_0x4da981]);}}return _0x41253e;};};_0x34b146['fn'][_0x3b23('0x0')]=function(_0x14b150){var _0x2a1694=_0x34b146(this);if(!_0x2a1694['length'])return _0x2a1694;_0x2a1694[_0x3b23('0x29')](function(){var _0x21133d=_0x34b146(this);_0x21133d[_0x3b23('0x0')]=new _0x201467(_0x21133d,_0x34b146[_0x3b23('0x2a')]({},_0x54870,_0x14b150));});return _0x2a1694;};window['QD_SIL_scrollRange']=0x28;var _0x5b3a2e=QD_SIL_scrollRange;var _0x7810c4=0x0;_0x34b146(window)['on'](_0x3b23('0x2b'),function(){var _0x1dc880=document[_0x3b23('0x2c')][_0x3b23('0x1a')]||document['body']['scrollTop'];if(_0x1dc880>_0x7810c4+_0x5b3a2e||_0x1dc880<_0x7810c4-_0x5b3a2e){_0x34b146(window)['trigger']('QD_SIL_scroll');_0x7810c4=_0x1dc880;}});}(this));

/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

/* Quatro Digital - Smart Photo Carousel // 1.0 // Carlos Vinicius // Todos os direitos reservados */

/*FUNÇÕES AUXILIARES*/

(function(t){function h(d,c,b){b=b[0];try{var e=d.find(c.imageWrapper);e.length||(e=a("<div></div>").appendTo(d));e.empty().attr("class",c.imageWrapper.slice(1));var f=d.find(c.thumbsWrapper);f.length||(f=a("<div></div>").appendTo(d));f.empty().attr("class",c.thumbsWrapper.slice(1));d=[];var k;for(k=0;k<b.Images.length;k++)d.push(b.Images[k][0]);var g;for(g=0;g<d.length;g++){var l=d[g].Path;var h=a("<img>",{"data-lazy":l.replace(m,"$1"+c.sizes.image)}).appendTo(e);h.wrap("<div></div>").wrap(a("<a></a>",
{href:l.replace(m,"$1"+c.sizes.imagezoom),"class":"jqzoom"}));a("<img>",{src:l.replace(m,"$1"+c.sizes.thumb)}).appendTo(f).wrap("<div></div>");d[g].IsMain&&(c.slickOptions.images.initialSlide=g)}}catch(n){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Problemas :( . Detalhes: ",n)}try{c.slickOptions.images.asNavFor=f,a(e).slick(c.slickOptions.images),c.slickOptions.thumbs.asNavFor=e,a(f).slick(c.slickOptions.thumbs),a(".jqzoom").jqzoom(c.zoomOptions),a(f).on("afterChange",
function(){a(e).slick("slickGoTo",a(this).slick("slickCurrentSlide"))})}catch(n){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Problemas :( . Detalhes: ",n)}}function p(d){return a.qdAjax({url:"/produto/sku/"+d,dataType:"json",error:function(){alert("erro ao buscar objeto SKU")}})}var a=jQuery;if("function"!==typeof a.fn.QD_smartPhotoCarousel){var m=/(ids\/[0-9]+-)[0-9-]+/i,q={imageWrapper:".qd-spc-image",thumbsWrapper:".qd-spc-thumbs",sizes:{thumb:"150-150",image:"500-500",
imagezoom:"1000-1000"},slickOptions:{images:{lazyLoad:"ondemand",infinite:!1,arrows:!1},thumbs:{slidesToShow:3,slidesToScroll:1,arrows:!1,focusOnSelect:!0}},zoomOptions:{}},r=function(d,c,b){if(!b&&(b=skuJson.skus[0].sku,skuJson.avaliable))for(var e=0;e<skuJson.skus.length;e++)if(skuJson.skus[e].avaliable){b=skuJson.skus[e].sku;break}p(b).done(function(a){h(d,c,a)});a(window).on("skuChanged.vtex",function(a,e,b){p(b.sku).done(function(a){h(d,c,a)})})};a.fn.QD_smartPhotoCarousel=function(d,c){var b=
a(this);if(!b.length)return b;b.each(function(){var b=a(this);b.QD_smartPhotoCarousel=new r(b,a.extend(!0,{},q,d),c)});return b};a(function(){a(".qd_auto_smart_photo_carousel").QD_smartPhotoCarousel()})}})(this);

/* Automatizador de comments box do Facebook // 1.6 // Carlos Vinicius [Quatro Digital] */
$(window).on("load QD_autoFaceComments",function(){if(window.QD_lazyFaceComments)
return;var fbComments=$(".fb-comments");if(fbComments.find('iframe').length)
return;if(fbComments.length)
fbComments.attr("data-href",document.location.href.split("#").shift().split("?").shift());if(!$("#fb-root").length)
$("body").append('<div id="fb-root"></div>');if(!$("script#facebook-jssdk").length){var fbAppId=$("meta[property='fb:app_id']").attr("content")||!1;(function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(d.getElementById(id))return;js=d.createElement(s);js.id=id;js.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+(fbAppId?"&appId="+fbAppId:"");fjs.parentNode.insertBefore(js,fjs)}(document,'script','facebook-jssdk'))}
if(typeof FB!=="undefined"&&typeof FB.XFBML!=="undefined")
FB.XFBML.parse()});