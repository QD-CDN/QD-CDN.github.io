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
			Common.applyImageLoad();
			Common.vtexBindQuickViewDestroy();
			Common.setDataScrollToggle();
			Common.applyCarouselShelf();
			Common.applyAmazingMenu();
			Common.applyAmazingMenuMobile();
			Common.applySmartCart();
			Common.openSearchModal();
			Common.overlay();
			Common.saveAmountFix();
			Common.applyTipBarCarouselFooter();
			Common.showFooterLinks();
			Common.applyMosaicCategorieBanners();
		},
		ajaxStop: function() {
			Common.saveAmountFix();
		},
		windowOnload: function() {},
		vtexBindQuickViewDestroy: function() {
			window.bindQuickView = function() {};
		},
		applyImageLoad: function () {
			$('.search-qd-v1-result, .carousel-qd-v1-shelf, .accessories-qd-v1-wrapper').QD_smartImageLoad({
				sizes: {
					width: '300',
					height: '300'
				}
			});
		},
		showFooterLinks: function () {
			$('.info-title').click(function (e) {
				var $t = $(this);
				$t.toggleClass('qd-is-active');
				$('.info-nav').toggleClass('qd-is-active');
			});
			
			$('.help-title').click(function (e) {
				var $t = $(this);
				$t.toggleClass('qd-is-active');
				$('.help-nav').toggleClass('qd-is-active');
			});
			// $('.social-title').click(function (e) {
			// 	var $t = $(this);
			// 	$t.toggleClass('qd-is-active');
			// 	$('.footer-qd-v1-social-link').toggleClass('qd-is-active');
			// });
		},
		applyMosaicCategorieBanners: function () {
			$('.banner-qd-v1-responsive > .box-banner').QD_mosaicBanners();
		},
		saveAmountFix: function () {
			$('.shelf-qd-v1-highlight-discount-percentage:not(.qd-on)').addClass('qd-on').each(function () {
				var $t = $(this);
				$t.text(($t.text().trim().match(/[0-9]+/) || [""]).pop() + '% off');
			});
		},
		applyTipBarCarouselFooter: function () {
			var wrapper = $('.tip-bar-qd-v1-carousel-footer >ul');

			if (!wrapper.length)
				return;

			var options = {
				arrows: false,
				autoplay: true,
				slidesToShow: 3,
				slidesToScroll: 3,
				infinite: false,
				draggable: false,
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
				// Se estiver dentro do product-qd-v1-tip-bar, ele mostrará só 2 slides por vez, mantendo as outras propriedades da variável options
				if (wrapper.closest('.product-qd-v1-tip-bar').length)
					return { slidesToShow: 1 };
				return {};
			})()));
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
				$t.find('h2').addClass("component-qd-v1-section-title").insertBefore($t);
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
		applyAmazingMenu: function () {
			$('.header-qd-v1-amazing-menu, .footer-qd-v1-menu-list').QD_amazingMenu();
		},
		applyAmazingMenuMobile: function () {
			var wrapper = $('.header-qd-v1-amazing-menu-mobile');

			wrapper.find('> ul > li > ul').prepend(function () { return $(this).prev().clone().wrap('<li></li>').parent() });

			wrapper.QD_amazingMenu({
				callback: function () {
					$('<span class="qd-am-dropdown-trigger"><i class="fa fa-chevron-right"></i></span>').appendTo(wrapper.find('.qd-am-has-ul')).click(function () {
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
				wrapper.find(".qd-ddc-prodWrapper").css('max-height', $(window).height() - 242);

				if (window.Tawk_API)
					window.Tawk_API.toggleVisibility();
			});

			$('.qd_ddc_lightBoxClose').click(function (evt) {
				$(document.body).removeClass(Common.qdOverlayClass);

				if (window.Tawk_API)
					window.Tawk_API.toggleVisibility();
			});
		},
		openSearchModal: function () {
			$('.header-qd-v1-search-trriger').click(function () {
				$('.modal-qd-v1-search').modal();
				return false;
			});
		},
		qdOverlayClass: 'qd-am-on qd-cart-show qd-sn-on',
		overlay: function () {
			$('.components-qd-v1-overlay').click(function () {
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		}
	};

	var Home = {
		init: function() {
			Home.applySlickSlider();
			Home.applyMosaicCarousel();
			Home.applyBrandCarousel();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		applySlickSlider: function () {
			var wrapper = $('.slider-qd-v1-full');

			// wrapper.find(".box-banner").each(function() {

			wrapper.slick({
				dots: true,
				customPaging: function (slider, i) {
					var alt = slider.$slides[i].querySelector('img').alt;
					return '<button data-role="none" tabindex="' + i + '">' + alt + '</button>';
				},
				fade: true,
				cssEase: 'linear',
				infinite: true,
				speed: 500,
				autoplay: true,
				autoplaySpeed: 7000,
				draggable: false
			});

			// var mobileDotsWrapper = $('.slider-qd-v1-full-mobile .slick-dots');
			// mobileDotsWrapper.on('init', function (event, slick) {
			// 	$(this).find('.slick-current').addClass('slick-active');
			// });

			// mobileDotsWrapper.slick({
			// 	asNavFor: '.slider-qd-v1-full-mobile',
			// 	arrows: false,
			// 	centerMode: true,
			// 	infinite: false,
			// 	focusOnSelect: true,
			// 	variableWidth: true,
			// 	centerPadding: '24%'
			// });

			// // On after slide change
			// var mobileWrapper = $('.slider-qd-v1-full.slider-qd-v1-full-mobile');
			// mobileWrapper.on('afterChange', function (event, slick, currentSlide, nextSlide) {
			// 	mobileDotsWrapper.slick('slickGoTo', currentSlide);
			// 	mobileDotsWrapper.find('.slick-current').addClass('slick-active');
			// });

			wrapper.each(function () {
				$(this).find('.slick-arrow').wrapAll('<div class="slick-nav" />');
			});
		},
		applyMosaicCarousel: function () {
			var wrapper = $('.categories-carousel-qd-v1-banners .mosaic-categories-qd-v1-wrapper').not('.slick-initialized');
			var mbRow = $('.categories-carousel-qd-v1-banners .banner-qd-v1-responsive > .qd-mb-row');

			if (!wrapper.length)
				return false;

			mbRow.each(function () {
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
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
		},
		applyBrandCarousel: function () {
			var wrapper = $('.brand-carousel-qd-v1-carousel');

			wrapper.slick({
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
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
		}
	};

	var Search = {
		init: function () { 
			Search.openFiltersMenu();
			Search.hideExtendedMenu();
			Search.infinityScroll();
			Home.applySlickSlider(); 
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		openFiltersMenu: function () {
			$('.search-qd-v1-navigator-trigger').click(function (e) {
				e.preventDefault();
				$(document.body).toggleClass('qd-sn-on');
				$('.search-qd-v1-navigator-close').appendTo('.search-single-navigator').removeClass('hide');
			});

			$('.menu-departamento').prepend('<span class="search-qd-v1-navigator-close hide"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');

			$('.search-qd-v1-navigator-close').click(function () {
				$(document.body).removeClass('qd-sn-on');
				$('.search-qd-v1-navigator-close').addClass('hide');
			});
		},
		hideExtendedMenu: function () {
			$(".search-qd-v1-navigator ul").each(function () {
				var t, li, qtt, moreLink, moreLi, click, liHide;

				t = $(this);
				li = t.find(">li");
				qtt = 10;

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
		infinityScroll: function () {
			$(".prateleira[id*=ResultItems]").QD_infinityScroll();
		}
	};

	var Product = {
		run: function() {},
		init: function() {
			// Product.forceImageZoom();
			Product.accessoriesFix();
			Product.accessoriesApplyCarousel();
			Product.setAvailableBodyClass();
			Product.productThumbCarousel();
			Product.qdHideUniqueSkuOption();
			Product.fixSKUselect();
			Product.openShipping();
			Product.scrollToBuyButton();
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
				responsive: [{ breakpoint: 1200, settings: { slidesToShow: 3, slidesToScroll: 3 } }, { breakpoint: 991, settings: { slidesToShow: 2, slidesToScroll: 2 } }, { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } }]
			});
		},
		productThumbCarousel: function () {
			$('.product-qd-v1-image-info-wrapper').QD_smartPhotoCarousel({
				imageWrapper: '.product-qd-v1-image',
				thumbsWrapper: '.product-qd-v1-image-thumbs',
				sizes: {
					thumb: '150-150',
					image: '751-751',
					imagezoom: '1000-1000'
				},
				slickOptions: {
					images: {
						lazyLoad: 'ondemand',
						infinite: false,
						arrows: false,
					},
					thumbs: {
						vertical: false,
						slidesToShow: 4,
						slidesToScroll: 1,
						arrows: false,
						focusOnSelect: true,
						centerMode: true,
						centerPadding: '25px',						
						responsive: [
							{
								breakpoint: 991,
								settings: {
									centerPadding: '10px'
								}
							}
						]
					}
				},
			});
		},
		qdHideUniqueSkuOption: function () {
			$(".product-qd-v1-sku-selection [class*='group_']").each(function () {
				var $t = $(this);
				var input = $t.find("input");

				if (input.length !== 1)
					return;

				input.attr("checked", true).change();
				$t.getParent("ul").hide();
			});
		},
		fixSKUselect: function () {
			var wrapper = $('.product-qd-v1-sku-selection');
			var value = wrapper.find('li.specification').first().text();
			wrapper.find('select').find('option[value=""]').append(value).attr('value', 'selecione');
		},
		openShipping: function () {
			if (typeof window.ShippingValue === "function")
				window.ShippingValue();
		},
		scrollToBuyButton: function () {
			$('.product-qd-v1-fixed-bar .buy-button').click(function (e) {
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $('.product-qd-v1-sku-selection-wrapper').offset().top - 75
				}, 900, 'swing');
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
var _0x4f3d=['error','clearQueueDelay','jqXHR','undefined','ajax','readyState','data','textStatus','errorThrown','version','/produto/sku/','function','QD_smartStockAvailable','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','aviso','toLowerCase','info','apply','warn','removeClass','qd-ssa-sku-no-selected','qd-ssa-sku-selected','SkuSellersInformation','AvailableQuantity','attr','data-qd-ssa-qtt','each','[data-qd-ssa-text]','hide','addClass','qd-ssa-hide','filter','length','qd-ssa-show','html','#qtt','show','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','skus','split','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','message','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','trigger','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','vtex.sku.selected.QD','QuatroDigital.ssa.prodUnavailable','qd-ssa-sku-prod-unavailable','hkpnfr%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','charCodeAt','toUpperCase','join','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','qdPlugin','initialSkuSelected','prod','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','unavailable','off','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','available','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','qdAjax','qdAjaxQueue','extend','opts','push','success','call','complete','parameters','callbackFns','successPopulated','errorPopulated','boolean','completePopulated','object'];(function(_0x2d7815,_0xc8ee70){var _0x32ef0c=function(_0x280271){while(--_0x280271){_0x2d7815['push'](_0x2d7815['shift']());}};_0x32ef0c(++_0xc8ee70);}(_0x4f3d,0x99));var _0x98ac=function(_0x5a3eee,_0x1c2309){_0x5a3eee=_0x5a3eee-0x0;var _0x21a0a6=_0x4f3d[_0x5a3eee];return _0x21a0a6;};(function(_0x3bce12){if('function'!==typeof _0x3bce12[_0x98ac('0x0')]){var _0x1ad45f={};_0x3bce12[_0x98ac('0x1')]=_0x1ad45f;_0x3bce12[_0x98ac('0x0')]=function(_0x1243c3){var _0x49f31c=_0x3bce12[_0x98ac('0x2')]({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x1243c3);var _0x2427ea=escape(encodeURIComponent(_0x49f31c['url']));_0x1ad45f[_0x2427ea]=_0x1ad45f[_0x2427ea]||{};_0x1ad45f[_0x2427ea][_0x98ac('0x3')]=_0x1ad45f[_0x2427ea][_0x98ac('0x3')]||[];_0x1ad45f[_0x2427ea][_0x98ac('0x3')][_0x98ac('0x4')]({'success':function(_0x5882e0,_0x2a4fbe,_0x1c26c2){_0x49f31c[_0x98ac('0x5')][_0x98ac('0x6')](this,_0x5882e0,_0x2a4fbe,_0x1c26c2);},'error':function(_0x2bb083,_0x4679f1,_0x3839f1){_0x49f31c['error'][_0x98ac('0x6')](this,_0x2bb083,_0x4679f1,_0x3839f1);},'complete':function(_0x26534f,_0x1fd904){_0x49f31c[_0x98ac('0x7')][_0x98ac('0x6')](this,_0x26534f,_0x1fd904);}});_0x1ad45f[_0x2427ea][_0x98ac('0x8')]=_0x1ad45f[_0x2427ea][_0x98ac('0x8')]||{'success':{},'error':{},'complete':{}};_0x1ad45f[_0x2427ea][_0x98ac('0x9')]=_0x1ad45f[_0x2427ea][_0x98ac('0x9')]||{};_0x1ad45f[_0x2427ea][_0x98ac('0x9')][_0x98ac('0xa')]='boolean'===typeof _0x1ad45f[_0x2427ea][_0x98ac('0x9')][_0x98ac('0xa')]?_0x1ad45f[_0x2427ea][_0x98ac('0x9')][_0x98ac('0xa')]:!0x1;_0x1ad45f[_0x2427ea][_0x98ac('0x9')][_0x98ac('0xb')]=_0x98ac('0xc')===typeof _0x1ad45f[_0x2427ea]['callbackFns'][_0x98ac('0xb')]?_0x1ad45f[_0x2427ea][_0x98ac('0x9')][_0x98ac('0xb')]:!0x1;_0x1ad45f[_0x2427ea][_0x98ac('0x9')][_0x98ac('0xd')]='boolean'===typeof _0x1ad45f[_0x2427ea][_0x98ac('0x9')][_0x98ac('0xd')]?_0x1ad45f[_0x2427ea][_0x98ac('0x9')][_0x98ac('0xd')]:!0x1;_0x1243c3=_0x3bce12[_0x98ac('0x2')]({},_0x49f31c,{'success':function(_0x312061,_0x3847cc,_0x1d6e15){_0x1ad45f[_0x2427ea][_0x98ac('0x8')][_0x98ac('0x5')]={'data':_0x312061,'textStatus':_0x3847cc,'jqXHR':_0x1d6e15};_0x1ad45f[_0x2427ea]['callbackFns']['successPopulated']=!0x0;for(var _0x599eb9 in _0x1ad45f[_0x2427ea]['opts'])_0x98ac('0xe')===typeof _0x1ad45f[_0x2427ea]['opts'][_0x599eb9]&&(_0x1ad45f[_0x2427ea][_0x98ac('0x3')][_0x599eb9][_0x98ac('0x5')]['call'](this,_0x312061,_0x3847cc,_0x1d6e15),_0x1ad45f[_0x2427ea]['opts'][_0x599eb9]['success']=function(){});},'error':function(_0x36ab03,_0x16d2a6,_0x131087){_0x1ad45f[_0x2427ea][_0x98ac('0x8')][_0x98ac('0xf')]={'errorThrown':_0x131087,'textStatus':_0x16d2a6,'jqXHR':_0x36ab03};_0x1ad45f[_0x2427ea][_0x98ac('0x9')][_0x98ac('0xb')]=!0x0;for(var _0x323556 in _0x1ad45f[_0x2427ea][_0x98ac('0x3')])_0x98ac('0xe')===typeof _0x1ad45f[_0x2427ea]['opts'][_0x323556]&&(_0x1ad45f[_0x2427ea][_0x98ac('0x3')][_0x323556]['error'][_0x98ac('0x6')](this,_0x36ab03,_0x16d2a6,_0x131087),_0x1ad45f[_0x2427ea][_0x98ac('0x3')][_0x323556][_0x98ac('0xf')]=function(){});},'complete':function(_0x8f3915,_0x592abc){_0x1ad45f[_0x2427ea][_0x98ac('0x8')][_0x98ac('0x7')]={'textStatus':_0x592abc,'jqXHR':_0x8f3915};_0x1ad45f[_0x2427ea][_0x98ac('0x9')]['completePopulated']=!0x0;for(var _0x19f949 in _0x1ad45f[_0x2427ea][_0x98ac('0x3')])'object'===typeof _0x1ad45f[_0x2427ea]['opts'][_0x19f949]&&(_0x1ad45f[_0x2427ea]['opts'][_0x19f949]['complete']['call'](this,_0x8f3915,_0x592abc),_0x1ad45f[_0x2427ea][_0x98ac('0x3')][_0x19f949][_0x98ac('0x7')]=function(){});isNaN(parseInt(_0x49f31c[_0x98ac('0x10')]))||setTimeout(function(){_0x1ad45f[_0x2427ea][_0x98ac('0x11')]=void 0x0;_0x1ad45f[_0x2427ea][_0x98ac('0x3')]=void 0x0;_0x1ad45f[_0x2427ea][_0x98ac('0x8')]=void 0x0;_0x1ad45f[_0x2427ea]['callbackFns']=void 0x0;},_0x49f31c[_0x98ac('0x10')]);}});_0x98ac('0x12')===typeof _0x1ad45f[_0x2427ea][_0x98ac('0x11')]?_0x1ad45f[_0x2427ea][_0x98ac('0x11')]=_0x3bce12[_0x98ac('0x13')](_0x1243c3):_0x1ad45f[_0x2427ea][_0x98ac('0x11')]&&_0x1ad45f[_0x2427ea][_0x98ac('0x11')][_0x98ac('0x14')]&&0x4==_0x1ad45f[_0x2427ea][_0x98ac('0x11')]['readyState']&&(_0x1ad45f[_0x2427ea][_0x98ac('0x9')]['successPopulated']&&_0x1243c3[_0x98ac('0x5')](_0x1ad45f[_0x2427ea]['parameters'][_0x98ac('0x5')][_0x98ac('0x15')],_0x1ad45f[_0x2427ea][_0x98ac('0x8')][_0x98ac('0x5')][_0x98ac('0x16')],_0x1ad45f[_0x2427ea][_0x98ac('0x8')][_0x98ac('0x5')]['jqXHR']),_0x1ad45f[_0x2427ea][_0x98ac('0x9')][_0x98ac('0xb')]&&_0x1243c3['error'](_0x1ad45f[_0x2427ea][_0x98ac('0x8')][_0x98ac('0xf')][_0x98ac('0x11')],_0x1ad45f[_0x2427ea]['parameters'][_0x98ac('0xf')][_0x98ac('0x16')],_0x1ad45f[_0x2427ea][_0x98ac('0x8')][_0x98ac('0xf')][_0x98ac('0x17')]),_0x1ad45f[_0x2427ea]['callbackFns']['completePopulated']&&_0x1243c3[_0x98ac('0x7')](_0x1ad45f[_0x2427ea][_0x98ac('0x8')][_0x98ac('0x7')][_0x98ac('0x11')],_0x1ad45f[_0x2427ea][_0x98ac('0x8')][_0x98ac('0x7')][_0x98ac('0x16')]));};_0x3bce12[_0x98ac('0x0')][_0x98ac('0x18')]='2.1';}}(jQuery));(function(_0x471b8e){function _0x5e37f8(_0x4b07ff,_0x4f066b){_0x162f05[_0x98ac('0x0')]({'url':_0x98ac('0x19')+_0x4b07ff,'clearQueueDelay':null,'success':_0x4f066b,'error':function(){_0x4773ad('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!');}});}var _0x162f05=jQuery;if(_0x98ac('0x1a')!==typeof _0x162f05['fn'][_0x98ac('0x1b')]){var _0x4773ad=function(_0x212423,_0x1516e2){if(_0x98ac('0xe')===typeof console){var _0x307604;_0x98ac('0xe')===typeof _0x212423?(_0x212423[_0x98ac('0x1c')]('[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a'),_0x307604=_0x212423):_0x307604=[_0x98ac('0x1d')+_0x212423];_0x98ac('0x12')===typeof _0x1516e2||'alerta'!==_0x1516e2['toLowerCase']()&&_0x98ac('0x1e')!==_0x1516e2[_0x98ac('0x1f')]()?_0x98ac('0x12')!==typeof _0x1516e2&&_0x98ac('0x20')===_0x1516e2[_0x98ac('0x1f')]()?console[_0x98ac('0x20')][_0x98ac('0x21')](console,_0x307604):console[_0x98ac('0xf')]['apply'](console,_0x307604):console[_0x98ac('0x22')][_0x98ac('0x21')](console,_0x307604);}},_0x1fa561={},_0x5b4180=function(_0x2091ee,_0x2554eb){function _0x4500a4(_0x15d976){try{_0x2091ee[_0x98ac('0x23')](_0x98ac('0x24'))['addClass'](_0x98ac('0x25'));var _0x2e9709=_0x15d976[0x0][_0x98ac('0x26')][0x0][_0x98ac('0x27')];_0x2091ee[_0x98ac('0x28')](_0x98ac('0x29'),_0x2e9709);_0x2091ee[_0x98ac('0x2a')](function(){var _0x2091ee=_0x162f05(this)['find'](_0x98ac('0x2b'));if(0x1>_0x2e9709)return _0x2091ee[_0x98ac('0x2c')]()[_0x98ac('0x2d')](_0x98ac('0x2e'))[_0x98ac('0x23')]('qd-ssa-show');var _0x15d976=_0x2091ee[_0x98ac('0x2f')]('[data-qd-ssa-text=\x22'+_0x2e9709+'\x22]');_0x15d976=_0x15d976[_0x98ac('0x30')]?_0x15d976:_0x2091ee[_0x98ac('0x2f')]('[data-qd-ssa-text=\x22default\x22]');_0x2091ee[_0x98ac('0x2c')]()[_0x98ac('0x2d')](_0x98ac('0x2e'))[_0x98ac('0x23')](_0x98ac('0x31'));_0x15d976[_0x98ac('0x32')]((_0x15d976[_0x98ac('0x32')]()||'')['replace'](_0x98ac('0x33'),_0x2e9709));_0x15d976[_0x98ac('0x34')]()['addClass'](_0x98ac('0x31'))[_0x98ac('0x23')](_0x98ac('0x2e'));});}catch(_0x43b06a){_0x4773ad([_0x98ac('0x35'),_0x43b06a['message']]);}}if(_0x2091ee[_0x98ac('0x30')]){_0x2091ee[_0x98ac('0x2d')]('qd-ssa-on');_0x2091ee[_0x98ac('0x2d')](_0x98ac('0x24'));try{_0x2091ee['addClass']('qd-ssa-skus-'+vtxctx[_0x98ac('0x36')][_0x98ac('0x37')](';')['length']);}catch(_0x53ed1f){_0x4773ad([_0x98ac('0x38'),_0x53ed1f[_0x98ac('0x39')]]);}_0x162f05(window)['on'](_0x98ac('0x3a'),function(_0xb987e8,_0x35b8f5,_0x4ec285){try{_0x5e37f8(_0x4ec285[_0x98ac('0x3b')],function(_0x360c50){_0x4500a4(_0x360c50);0x1===vtxctx[_0x98ac('0x36')]['split'](';')[_0x98ac('0x30')]&&0x0==_0x360c50[0x0][_0x98ac('0x26')][0x0][_0x98ac('0x27')]&&_0x162f05(window)[_0x98ac('0x3c')]('QuatroDigital.ssa.prodUnavailable');});}catch(_0x416627){_0x4773ad([_0x98ac('0x3d'),_0x416627[_0x98ac('0x39')]]);}});_0x162f05(window)['off'](_0x98ac('0x3e'));_0x162f05(window)['on'](_0x98ac('0x3f'),function(){_0x2091ee[_0x98ac('0x2d')](_0x98ac('0x40'))[_0x98ac('0x2c')]();});}};_0x471b8e=function(_0x1f133c){var _0x4b7843={'y':_0x98ac('0x41')};return function(_0x3cdb2a){var _0x271a56=function(_0x30a67d){return _0x30a67d;};var _0x32b70e=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3cdb2a=_0x3cdb2a['d'+_0x32b70e[0x10]+'c'+_0x32b70e[0x11]+'m'+_0x271a56(_0x32b70e[0x1])+'n'+_0x32b70e[0xd]]['l'+_0x32b70e[0x12]+'c'+_0x32b70e[0x0]+'ti'+_0x271a56('o')+'n'];var _0x1fdf04=function(_0x3b6b44){return escape(encodeURIComponent(_0x3b6b44[_0x98ac('0x42')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x4f83c4){return String['fromCharCode'](('Z'>=_0x4f83c4?0x5a:0x7a)>=(_0x4f83c4=_0x4f83c4[_0x98ac('0x43')](0x0)+0xd)?_0x4f83c4:_0x4f83c4-0x1a);})));};var _0x4380c6=_0x1fdf04(_0x3cdb2a[[_0x32b70e[0x9],_0x271a56('o'),_0x32b70e[0xc],_0x32b70e[_0x271a56(0xd)]]['join']('')]);_0x1fdf04=_0x1fdf04((window[['js',_0x271a56('no'),'m',_0x32b70e[0x1],_0x32b70e[0x4][_0x98ac('0x44')](),'ite'][_0x98ac('0x45')]('')]||'---')+['.v',_0x32b70e[0xd],'e',_0x271a56('x'),'co',_0x271a56('mm'),_0x98ac('0x46'),_0x32b70e[0x1],'.c',_0x271a56('o'),'m.',_0x32b70e[0x13],'r'][_0x98ac('0x45')](''));for(var _0x5a1f46 in _0x4b7843){if(_0x1fdf04===_0x5a1f46+_0x4b7843[_0x5a1f46]||_0x4380c6===_0x5a1f46+_0x4b7843[_0x5a1f46]){var _0x47fe33='tr'+_0x32b70e[0x11]+'e';break;}_0x47fe33='f'+_0x32b70e[0x0]+'ls'+_0x271a56(_0x32b70e[0x1])+'';}_0x271a56=!0x1;-0x1<_0x3cdb2a[[_0x32b70e[0xc],'e',_0x32b70e[0x0],'rc',_0x32b70e[0x9]][_0x98ac('0x45')]('')][_0x98ac('0x47')](_0x98ac('0x48'))&&(_0x271a56=!0x0);return[_0x47fe33,_0x271a56];}(_0x1f133c);}(window);if(!eval(_0x471b8e[0x0]))return _0x471b8e[0x1]?_0x4773ad('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x162f05['fn'][_0x98ac('0x1b')]=function(_0x388203){var _0xeca6e1=_0x162f05(this);_0x388203=_0x162f05[_0x98ac('0x2')](!0x0,{},_0x1fa561,_0x388203);_0xeca6e1[_0x98ac('0x49')]=new _0x5b4180(_0xeca6e1,_0x388203);try{'object'===typeof _0x162f05['fn'][_0x98ac('0x1b')][_0x98ac('0x4a')]&&_0x162f05(window)[_0x98ac('0x3c')]('QuatroDigital.ssa.skuSelected',[_0x162f05['fn'][_0x98ac('0x1b')][_0x98ac('0x4a')][_0x98ac('0x4b')],_0x162f05['fn'][_0x98ac('0x1b')]['initialSkuSelected'][_0x98ac('0x3b')]]);}catch(_0x58731c){_0x4773ad([_0x98ac('0x4c'),_0x58731c['message']]);}_0x162f05['fn'][_0x98ac('0x1b')][_0x98ac('0x4d')]&&_0x162f05(window)[_0x98ac('0x3c')](_0x98ac('0x3f'));return _0xeca6e1;};_0x162f05(window)['on'](_0x98ac('0x3e'),function(_0x4c8a76,_0xa4647f,_0x21d917){try{_0x162f05['fn'][_0x98ac('0x1b')][_0x98ac('0x4a')]={'prod':_0xa4647f,'sku':_0x21d917},_0x162f05(this)[_0x98ac('0x4e')](_0x4c8a76);}catch(_0x80d6c){_0x4773ad([_0x98ac('0x4f'),_0x80d6c['message']]);}});_0x162f05(window)['on'](_0x98ac('0x50'),function(_0x10b05c,_0x301d7c,_0x49ff6c){try{for(var _0x51d3a9=_0x49ff6c[_0x98ac('0x30')],_0x2fa6e2=_0x301d7c=0x0;_0x2fa6e2<_0x51d3a9&&!_0x49ff6c[_0x2fa6e2][_0x98ac('0x51')];_0x2fa6e2++)_0x301d7c+=0x1;_0x51d3a9<=_0x301d7c&&(_0x162f05['fn']['QD_smartStockAvailable'][_0x98ac('0x4d')]=!0x0);_0x162f05(this)[_0x98ac('0x4e')](_0x10b05c);}catch(_0x1ebe1e){_0x4773ad([_0x98ac('0x52'),_0x1ebe1e[_0x98ac('0x39')]]);}});_0x162f05(function(){_0x162f05(_0x98ac('0x53'))[_0x98ac('0x1b')]();});}}(window));
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
var _0x3c4d=['extend','exec','.qd_amazing_menu_auto','getParent','closest','function','QD_amazingMenu','/qd-amazing-menu','undefined','info','warn','object','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','aviso','toLowerCase','apply','join','error','qdAmAddNdx','each','addClass','qd-am-li-','qd-am-first','last','qd-am-last','replace','fromCharCode','charCodeAt','toUpperCase','---','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','find','.qd_am_code','filter','.qd-am-collection','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','url','html','attr','data-qdam-value','length','clone','text','trim','[class*=\x27colunas\x27]','hide','qd-am-content-loaded','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','QuatroDigital.am.ajaxCallback','ul[itemscope]','parent','qd-am-has-ul','children',':not(ul)','replaceSpecialChars','>li','qd-amazing-menu','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','add','qd-am-','-li','callback','trigger','QuatroDigital.am.callback'];(function(_0x30ab82,_0x15a7c3){var _0x4cd1f1=function(_0x546020){while(--_0x546020){_0x30ab82['push'](_0x30ab82['shift']());}};_0x4cd1f1(++_0x15a7c3);}(_0x3c4d,0x1c5));var _0x5a1c=function(_0x390950,_0x3deb8a){_0x390950=_0x390950-0x0;var _0x38fa76=_0x3c4d[_0x390950];return _0x38fa76;};(function(_0x54df23){_0x54df23['fn'][_0x5a1c('0x0')]=_0x54df23['fn'][_0x5a1c('0x1')];}(jQuery));(function(_0x3c67ee){var _0x667fb1;var _0x44ab26=jQuery;if(_0x5a1c('0x2')!==typeof _0x44ab26['fn'][_0x5a1c('0x3')]){var _0x1fe75d={'url':_0x5a1c('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0x257d56=function(_0x4ff264,_0xab7412){if('object'===typeof console&&'undefined'!==typeof console['error']&&_0x5a1c('0x5')!==typeof console[_0x5a1c('0x6')]&&'undefined'!==typeof console[_0x5a1c('0x7')]){var _0x27231f;_0x5a1c('0x8')===typeof _0x4ff264?(_0x4ff264[_0x5a1c('0x9')](_0x5a1c('0xa')),_0x27231f=_0x4ff264):_0x27231f=[_0x5a1c('0xa')+_0x4ff264];if(_0x5a1c('0x5')===typeof _0xab7412||_0x5a1c('0xb')!==_0xab7412['toLowerCase']()&&_0x5a1c('0xc')!==_0xab7412[_0x5a1c('0xd')]())if(_0x5a1c('0x5')!==typeof _0xab7412&&_0x5a1c('0x6')===_0xab7412[_0x5a1c('0xd')]())try{console['info'][_0x5a1c('0xe')](console,_0x27231f);}catch(_0x10643f){try{console['info'](_0x27231f[_0x5a1c('0xf')]('\x0a'));}catch(_0x2976af){}}else try{console[_0x5a1c('0x10')][_0x5a1c('0xe')](console,_0x27231f);}catch(_0xde38e9){try{console['error'](_0x27231f['join']('\x0a'));}catch(_0x48bf12){}}else try{console[_0x5a1c('0x7')][_0x5a1c('0xe')](console,_0x27231f);}catch(_0x27f80e){try{console[_0x5a1c('0x7')](_0x27231f['join']('\x0a'));}catch(_0x5a3944){}}}};_0x44ab26['fn'][_0x5a1c('0x11')]=function(){var _0x841701=_0x44ab26(this);_0x841701[_0x5a1c('0x12')](function(_0x2f37b1){_0x44ab26(this)[_0x5a1c('0x13')](_0x5a1c('0x14')+_0x2f37b1);});_0x841701['first']()[_0x5a1c('0x13')](_0x5a1c('0x15'));_0x841701[_0x5a1c('0x16')]()['addClass'](_0x5a1c('0x17'));return _0x841701;};_0x44ab26['fn']['QD_amazingMenu']=function(){};_0x3c67ee=function(_0x531a64){var _0x40712e={'y':'hkpnfr%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x47244c){var _0x4a2c38=function(_0x2bee20){return _0x2bee20;};var _0x14312c=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x47244c=_0x47244c['d'+_0x14312c[0x10]+'c'+_0x14312c[0x11]+'m'+_0x4a2c38(_0x14312c[0x1])+'n'+_0x14312c[0xd]]['l'+_0x14312c[0x12]+'c'+_0x14312c[0x0]+'ti'+_0x4a2c38('o')+'n'];var _0x62bb57=function(_0x2b7e00){return escape(encodeURIComponent(_0x2b7e00[_0x5a1c('0x18')](/\./g,'¨')[_0x5a1c('0x18')](/[a-zA-Z]/g,function(_0x570a92){return String[_0x5a1c('0x19')](('Z'>=_0x570a92?0x5a:0x7a)>=(_0x570a92=_0x570a92[_0x5a1c('0x1a')](0x0)+0xd)?_0x570a92:_0x570a92-0x1a);})));};var _0x4d34e0=_0x62bb57(_0x47244c[[_0x14312c[0x9],_0x4a2c38('o'),_0x14312c[0xc],_0x14312c[_0x4a2c38(0xd)]]['join']('')]);_0x62bb57=_0x62bb57((window[['js',_0x4a2c38('no'),'m',_0x14312c[0x1],_0x14312c[0x4][_0x5a1c('0x1b')](),'ite'][_0x5a1c('0xf')]('')]||_0x5a1c('0x1c'))+['.v',_0x14312c[0xd],'e',_0x4a2c38('x'),'co',_0x4a2c38('mm'),'erc',_0x14312c[0x1],'.c',_0x4a2c38('o'),'m.',_0x14312c[0x13],'r'][_0x5a1c('0xf')](''));for(var _0x58965f in _0x40712e){if(_0x62bb57===_0x58965f+_0x40712e[_0x58965f]||_0x4d34e0===_0x58965f+_0x40712e[_0x58965f]){var _0x54faad='tr'+_0x14312c[0x11]+'e';break;}_0x54faad='f'+_0x14312c[0x0]+'ls'+_0x4a2c38(_0x14312c[0x1])+'';}_0x4a2c38=!0x1;-0x1<_0x47244c[[_0x14312c[0xc],'e',_0x14312c[0x0],'rc',_0x14312c[0x9]][_0x5a1c('0xf')]('')][_0x5a1c('0x1d')](_0x5a1c('0x1e'))&&(_0x4a2c38=!0x0);return[_0x54faad,_0x4a2c38];}(_0x531a64);}(window);if(!eval(_0x3c67ee[0x0]))return _0x3c67ee[0x1]?_0x257d56('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x2c877b=function(_0x7397db){var _0x36029b=_0x7397db[_0x5a1c('0x1f')](_0x5a1c('0x20'));var _0x1a0368=_0x36029b[_0x5a1c('0x21')]('.qd-am-banner');var _0x152f5c=_0x36029b[_0x5a1c('0x21')](_0x5a1c('0x22'));if(_0x1a0368['length']||_0x152f5c['length'])_0x1a0368['parent']()[_0x5a1c('0x13')](_0x5a1c('0x23')),_0x152f5c['parent']()[_0x5a1c('0x13')](_0x5a1c('0x24')),_0x44ab26[_0x5a1c('0x25')]({'url':_0x667fb1[_0x5a1c('0x26')],'dataType':_0x5a1c('0x27'),'success':function(_0x1f3a6a){var _0x1b4bb1=_0x44ab26(_0x1f3a6a);_0x1a0368[_0x5a1c('0x12')](function(){var _0x1f3a6a=_0x44ab26(this);var _0x4077d7=_0x1b4bb1['find']('img[alt=\x27'+_0x1f3a6a[_0x5a1c('0x28')](_0x5a1c('0x29'))+'\x27]');_0x4077d7[_0x5a1c('0x2a')]&&(_0x4077d7[_0x5a1c('0x12')](function(){_0x44ab26(this)[_0x5a1c('0x0')]('.box-banner')[_0x5a1c('0x2b')]()['insertBefore'](_0x1f3a6a);}),_0x1f3a6a['hide']());})[_0x5a1c('0x13')]('qd-am-content-loaded');_0x152f5c[_0x5a1c('0x12')](function(){var _0x1f3a6a={};var _0x307635=_0x44ab26(this);_0x1b4bb1[_0x5a1c('0x1f')]('h2')[_0x5a1c('0x12')](function(){if(_0x44ab26(this)[_0x5a1c('0x2c')]()['trim']()[_0x5a1c('0xd')]()==_0x307635[_0x5a1c('0x28')](_0x5a1c('0x29'))[_0x5a1c('0x2d')]()[_0x5a1c('0xd')]())return _0x1f3a6a=_0x44ab26(this),!0x1;});_0x1f3a6a[_0x5a1c('0x2a')]&&(_0x1f3a6a[_0x5a1c('0x12')](function(){_0x44ab26(this)[_0x5a1c('0x0')](_0x5a1c('0x2e'))[_0x5a1c('0x2b')]()['insertBefore'](_0x307635);}),_0x307635[_0x5a1c('0x2f')]());})[_0x5a1c('0x13')](_0x5a1c('0x30'));},'error':function(){_0x257d56(_0x5a1c('0x31')+_0x667fb1['url']+_0x5a1c('0x32'));},'complete':function(){_0x667fb1[_0x5a1c('0x33')][_0x5a1c('0x34')](this);_0x44ab26(window)['trigger'](_0x5a1c('0x35'),_0x7397db);},'clearQueueDelay':0xbb8});};_0x44ab26[_0x5a1c('0x3')]=function(_0x5d2391){var _0x1da80f=_0x5d2391[_0x5a1c('0x1f')](_0x5a1c('0x36'))['each'](function(){var _0x2756c2=_0x44ab26(this);if(!_0x2756c2['length'])return _0x257d56(['UL\x20do\x20menu\x20não\x20encontrada',_0x5d2391],_0x5a1c('0xb'));_0x2756c2[_0x5a1c('0x1f')]('li\x20>ul')[_0x5a1c('0x37')]()['addClass'](_0x5a1c('0x38'));_0x2756c2[_0x5a1c('0x1f')]('li')[_0x5a1c('0x12')](function(){var _0x2efce9=_0x44ab26(this);var _0x4d666a=_0x2efce9[_0x5a1c('0x39')](_0x5a1c('0x3a'));_0x4d666a[_0x5a1c('0x2a')]&&_0x2efce9['addClass']('qd-am-elem-'+_0x4d666a['first']()[_0x5a1c('0x2c')]()['trim']()[_0x5a1c('0x3b')]()[_0x5a1c('0x18')](/\./g,'')[_0x5a1c('0x18')](/\s/g,'-')[_0x5a1c('0xd')]());});var _0x2337c1=_0x2756c2[_0x5a1c('0x1f')](_0x5a1c('0x3c'))[_0x5a1c('0x11')]();_0x2756c2[_0x5a1c('0x13')](_0x5a1c('0x3d'));_0x2337c1=_0x2337c1[_0x5a1c('0x1f')]('>ul');_0x2337c1[_0x5a1c('0x12')](function(){var _0x365a63=_0x44ab26(this);_0x365a63[_0x5a1c('0x1f')](_0x5a1c('0x3c'))[_0x5a1c('0x11')]()[_0x5a1c('0x13')](_0x5a1c('0x3e'));_0x365a63[_0x5a1c('0x13')](_0x5a1c('0x3f'));_0x365a63[_0x5a1c('0x37')]()[_0x5a1c('0x13')](_0x5a1c('0x40'));});_0x2337c1[_0x5a1c('0x13')](_0x5a1c('0x40'));var _0x4a7de0=0x0,_0x3c67ee=function(_0x2ddf0e){_0x4a7de0+=0x1;_0x2ddf0e=_0x2ddf0e[_0x5a1c('0x39')]('li')[_0x5a1c('0x39')]('*');_0x2ddf0e[_0x5a1c('0x2a')]&&(_0x2ddf0e[_0x5a1c('0x13')](_0x5a1c('0x41')+_0x4a7de0),_0x3c67ee(_0x2ddf0e));};_0x3c67ee(_0x2756c2);_0x2756c2[_0x5a1c('0x42')](_0x2756c2[_0x5a1c('0x1f')]('ul'))[_0x5a1c('0x12')](function(){var _0x562670=_0x44ab26(this);_0x562670['addClass'](_0x5a1c('0x43')+_0x562670['children']('li')[_0x5a1c('0x2a')]+_0x5a1c('0x44'));});});_0x2c877b(_0x1da80f);_0x667fb1[_0x5a1c('0x45')]['call'](this);_0x44ab26(window)[_0x5a1c('0x46')](_0x5a1c('0x47'),_0x5d2391);};_0x44ab26['fn'][_0x5a1c('0x3')]=function(_0x2cb551){var _0xdc7c04=_0x44ab26(this);if(!_0xdc7c04[_0x5a1c('0x2a')])return _0xdc7c04;_0x667fb1=_0x44ab26[_0x5a1c('0x48')]({},_0x1fe75d,_0x2cb551);_0xdc7c04[_0x5a1c('0x49')]=new _0x44ab26[(_0x5a1c('0x3'))](_0x44ab26(this));return _0xdc7c04;};_0x44ab26(function(){_0x44ab26(_0x5a1c('0x4a'))[_0x5a1c('0x3')]();});}}(this));
/* Quatro Digital Smart Cart */
var _0x411a=['keyup.qd_ddc_cep','.qd-ddc-shipping\x20.qd-ddc-cep-ok','click','.qd-ddc-cep-btn','preventDefault','toggle','.qd-ddc-cep-close','hide','click._QD_DDC_closeShipping','target','.qd-ddc-cep-tooltip','updateOnlyHover','mouseenter.qd_ddc_hover','getCartInfoByUrl','cartIsEmpty','mouseleave.qd_ddc_hover','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','html','linkCart','continueShopping','.qd-ddc-checkout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','emptyCart','cartContainer','each','call','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','allTotal','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','smartCheckout','getOrderForm','_QuatroDigital_AmountProduct','exec','QD_checkoutQueue','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-wrapper','.qd-ddc-prodRow','qd-ddc-noItems','empty','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','attr','content','.qd-ddc-quantity','quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','.qd-ddc-shipping\x20input','shippingData','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','addClass','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','forceImageHTTPS','string','qd-loaded','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','removeProduct','stop','slideUp','remove','formatCepField','$1-$2$3','shippingCalculate','qdDdcLastPostalCode','calculateShipping','BRA','done','logisticsInfo','slas','<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>','shippingEstimate','\x20dia\x20útil','<td>\x20R$\x20','</td><td>',',\x20entrega\x20em\x20','\x20para\x20o\x20CEP\x20','</td>','tbody','insertBefore','.qd-ddc-cep-tooltip-text','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','totalizers','fail','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','simpleCart','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','prodId','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','ajaxStop','Oooops!\x20','.qdDdcContainer','QD_smartCart','selector','dropDown','buyButton','QD_buyButton','smartCart','getParent','closest','replace','abs','undefined','pow','round','split','length','join','_QuatroDigital_CartData','callback','Callbacks','function','error','message','object','info','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','toLowerCase','aviso','warn','apply','_QuatroDigital_DropDown','allowUpdate','hkpnfr%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','QD_dropDownCart','extend','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>','skuName','name','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','find','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','removeClass','qd-bb-lightBoxProdAdd','body','off','keyup.qd_ddc_closeFn','keyCode','qd-bb-lightBoxBodyProdAdd','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text','.qd-ddc-shipping\x20.qd-ddc-cep','val'];(function(_0x2e12fe,_0x2b5f5b){var _0x23da2d=function(_0x58f34b){while(--_0x58f34b){_0x2e12fe['push'](_0x2e12fe['shift']());}};_0x23da2d(++_0x2b5f5b);}(_0x411a,0x1a8));var _0x15e2=function(_0x359a3c,_0x2398c4){_0x359a3c=_0x359a3c-0x0;var _0xa03e93=_0x411a[_0x359a3c];return _0xa03e93;};(function(_0x4268e8){_0x4268e8['fn'][_0x15e2('0x0')]=_0x4268e8['fn'][_0x15e2('0x1')];}(jQuery));function qd_number_format(_0x46cf10,_0x971f8d,_0xedec60,_0x15d39a){_0x46cf10=(_0x46cf10+'')[_0x15e2('0x2')](/[^0-9+\-Ee.]/g,'');_0x46cf10=isFinite(+_0x46cf10)?+_0x46cf10:0x0;_0x971f8d=isFinite(+_0x971f8d)?Math[_0x15e2('0x3')](_0x971f8d):0x0;_0x15d39a='undefined'===typeof _0x15d39a?',':_0x15d39a;_0xedec60=_0x15e2('0x4')===typeof _0xedec60?'.':_0xedec60;var _0x17d156='',_0x17d156=function(_0x2d82b5,_0x43a4b5){var _0x971f8d=Math[_0x15e2('0x5')](0xa,_0x43a4b5);return''+(Math['round'](_0x2d82b5*_0x971f8d)/_0x971f8d)['toFixed'](_0x43a4b5);},_0x17d156=(_0x971f8d?_0x17d156(_0x46cf10,_0x971f8d):''+Math[_0x15e2('0x6')](_0x46cf10))[_0x15e2('0x7')]('.');0x3<_0x17d156[0x0][_0x15e2('0x8')]&&(_0x17d156[0x0]=_0x17d156[0x0][_0x15e2('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x15d39a));(_0x17d156[0x1]||'')[_0x15e2('0x8')]<_0x971f8d&&(_0x17d156[0x1]=_0x17d156[0x1]||'',_0x17d156[0x1]+=Array(_0x971f8d-_0x17d156[0x1][_0x15e2('0x8')]+0x1)['join']('0'));return _0x17d156[_0x15e2('0x9')](_0xedec60);};(function(){try{window[_0x15e2('0xa')]=window['_QuatroDigital_CartData']||{},window[_0x15e2('0xa')]['callback']=window['_QuatroDigital_CartData'][_0x15e2('0xb')]||$[_0x15e2('0xc')]();}catch(_0x19ba1e){'undefined'!==typeof console&&_0x15e2('0xd')===typeof console[_0x15e2('0xe')]&&console[_0x15e2('0xe')]('Oooops!\x20',_0x19ba1e[_0x15e2('0xf')]);}}());(function(_0x565b96){try{var _0x1ab78c=jQuery,_0x58910b=function(_0x2bf33c,_0x2c4dd2){if(_0x15e2('0x10')===typeof console&&_0x15e2('0x4')!==typeof console[_0x15e2('0xe')]&&_0x15e2('0x4')!==typeof console[_0x15e2('0x11')]&&_0x15e2('0x4')!==typeof console['warn']){var _0x4f7bdd;_0x15e2('0x10')===typeof _0x2bf33c?(_0x2bf33c['unshift'](_0x15e2('0x12')),_0x4f7bdd=_0x2bf33c):_0x4f7bdd=[_0x15e2('0x12')+_0x2bf33c];if(_0x15e2('0x4')===typeof _0x2c4dd2||_0x15e2('0x13')!==_0x2c4dd2[_0x15e2('0x14')]()&&_0x15e2('0x15')!==_0x2c4dd2[_0x15e2('0x14')]())if('undefined'!==typeof _0x2c4dd2&&_0x15e2('0x11')===_0x2c4dd2['toLowerCase']())try{console[_0x15e2('0x11')]['apply'](console,_0x4f7bdd);}catch(_0x5c5a18){try{console['info'](_0x4f7bdd['join']('\x0a'));}catch(_0x1b0c75){}}else try{console['error']['apply'](console,_0x4f7bdd);}catch(_0x450dc9){try{console[_0x15e2('0xe')](_0x4f7bdd[_0x15e2('0x9')]('\x0a'));}catch(_0x351140){}}else try{console[_0x15e2('0x16')][_0x15e2('0x17')](console,_0x4f7bdd);}catch(_0x395526){try{console['warn'](_0x4f7bdd[_0x15e2('0x9')]('\x0a'));}catch(_0x169fdb){}}}};window[_0x15e2('0x18')]=window[_0x15e2('0x18')]||{};window['_QuatroDigital_DropDown'][_0x15e2('0x19')]=!0x0;_0x1ab78c['QD_dropDownCart']=function(){};_0x1ab78c['fn']['QD_dropDownCart']=function(){return{'fn':new _0x1ab78c()};};var _0x1bd2c3=function(_0x24cbe4){var _0x23edd5={'y':_0x15e2('0x1a')};return function(_0x1c6d61){var _0x4c7a00=function(_0xd53f13){return _0xd53f13;};var _0x51bb45=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x1c6d61=_0x1c6d61['d'+_0x51bb45[0x10]+'c'+_0x51bb45[0x11]+'m'+_0x4c7a00(_0x51bb45[0x1])+'n'+_0x51bb45[0xd]]['l'+_0x51bb45[0x12]+'c'+_0x51bb45[0x0]+'ti'+_0x4c7a00('o')+'n'];var _0x1ad034=function(_0x2233af){return escape(encodeURIComponent(_0x2233af[_0x15e2('0x2')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x585fc6){return String[_0x15e2('0x1b')](('Z'>=_0x585fc6?0x5a:0x7a)>=(_0x585fc6=_0x585fc6[_0x15e2('0x1c')](0x0)+0xd)?_0x585fc6:_0x585fc6-0x1a);})));};var _0x5020b1=_0x1ad034(_0x1c6d61[[_0x51bb45[0x9],_0x4c7a00('o'),_0x51bb45[0xc],_0x51bb45[_0x4c7a00(0xd)]][_0x15e2('0x9')]('')]);_0x1ad034=_0x1ad034((window[['js',_0x4c7a00('no'),'m',_0x51bb45[0x1],_0x51bb45[0x4][_0x15e2('0x1d')](),'ite'][_0x15e2('0x9')]('')]||_0x15e2('0x1e'))+['.v',_0x51bb45[0xd],'e',_0x4c7a00('x'),'co',_0x4c7a00('mm'),_0x15e2('0x1f'),_0x51bb45[0x1],'.c',_0x4c7a00('o'),'m.',_0x51bb45[0x13],'r']['join'](''));for(var _0x598077 in _0x23edd5){if(_0x1ad034===_0x598077+_0x23edd5[_0x598077]||_0x5020b1===_0x598077+_0x23edd5[_0x598077]){var _0x5269be='tr'+_0x51bb45[0x11]+'e';break;}_0x5269be='f'+_0x51bb45[0x0]+'ls'+_0x4c7a00(_0x51bb45[0x1])+'';}_0x4c7a00=!0x1;-0x1<_0x1c6d61[[_0x51bb45[0xc],'e',_0x51bb45[0x0],'rc',_0x51bb45[0x9]]['join']('')]['indexOf'](_0x15e2('0x20'))&&(_0x4c7a00=!0x0);return[_0x5269be,_0x4c7a00];}(_0x24cbe4);}(window);if(!eval(_0x1bd2c3[0x0]))return _0x1bd2c3[0x1]?_0x58910b(_0x15e2('0x21')):!0x1;_0x1ab78c[_0x15e2('0x22')]=function(_0x4e0996,_0x3d1b83){var _0x7ef382=_0x1ab78c(_0x4e0996);if(!_0x7ef382[_0x15e2('0x8')])return _0x7ef382;var _0x47fd25=_0x1ab78c[_0x15e2('0x23')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x15e2('0x24'),'linkCheckout':_0x15e2('0x25'),'cartTotal':_0x15e2('0x26'),'emptyCart':_0x15e2('0x27'),'continueShopping':_0x15e2('0x28'),'shippingForm':_0x15e2('0x29')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'forceImageHTTPS':!0x1,'skuName':function(_0x478d64){return _0x478d64[_0x15e2('0x2a')]||_0x478d64[_0x15e2('0x2b')];},'callback':function(){},'callbackProductsList':function(){}},_0x3d1b83);_0x1ab78c('');var _0x436e5b=this;if(_0x47fd25['smartCheckout']){var _0x1e6674=!0x1;_0x15e2('0x4')===typeof window[_0x15e2('0x2c')]&&(_0x58910b(_0x15e2('0x2d')),_0x1ab78c[_0x15e2('0x2e')]({'url':_0x15e2('0x2f'),'async':!0x1,'dataType':_0x15e2('0x30'),'error':function(){_0x58910b(_0x15e2('0x31'));_0x1e6674=!0x0;}}));if(_0x1e6674)return _0x58910b(_0x15e2('0x32'));}if(_0x15e2('0x10')===typeof window[_0x15e2('0x2c')]&&_0x15e2('0x4')!==typeof window[_0x15e2('0x2c')][_0x15e2('0x33')])var _0x565b96=window[_0x15e2('0x2c')][_0x15e2('0x33')];else if('object'===typeof vtex&&_0x15e2('0x10')===typeof vtex[_0x15e2('0x33')]&&_0x15e2('0x4')!==typeof vtex[_0x15e2('0x33')][_0x15e2('0x34')])_0x565b96=new vtex[(_0x15e2('0x33'))][(_0x15e2('0x34'))]();else return _0x58910b('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x436e5b['cartContainer']=_0x15e2('0x35');var _0x56e9b8=function(_0x506086){_0x1ab78c(this)[_0x15e2('0x36')](_0x506086);_0x506086[_0x15e2('0x37')]('.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose')[_0x15e2('0x38')](_0x1ab78c(_0x15e2('0x39')))['on'](_0x15e2('0x3a'),function(){_0x7ef382[_0x15e2('0x3b')](_0x15e2('0x3c'));_0x1ab78c(document[_0x15e2('0x3d')])[_0x15e2('0x3b')]('qd-bb-lightBoxBodyProdAdd');});_0x1ab78c(document)[_0x15e2('0x3e')](_0x15e2('0x3f'))['on'](_0x15e2('0x3f'),function(_0x3285ad){0x1b==_0x3285ad[_0x15e2('0x40')]&&(_0x7ef382[_0x15e2('0x3b')]('qd-bb-lightBoxProdAdd'),_0x1ab78c(document['body'])[_0x15e2('0x3b')](_0x15e2('0x41')));});var _0x196ac6=_0x506086[_0x15e2('0x37')](_0x15e2('0x42'));_0x506086[_0x15e2('0x37')](_0x15e2('0x43'))['on']('click.qd_ddc_scrollUp',function(){_0x436e5b[_0x15e2('0x44')]('-',void 0x0,void 0x0,_0x196ac6);return!0x1;});_0x506086['find'](_0x15e2('0x45'))['on'](_0x15e2('0x46'),function(){_0x436e5b[_0x15e2('0x44')](void 0x0,void 0x0,void 0x0,_0x196ac6);return!0x1;});var _0x575f53=_0x506086[_0x15e2('0x37')](_0x15e2('0x47'));_0x506086[_0x15e2('0x37')](_0x15e2('0x48'))[_0x15e2('0x49')]('')['on'](_0x15e2('0x4a'),function(_0x253212){_0x436e5b['formatCepField'](_0x1ab78c(this));0xd==_0x253212[_0x15e2('0x40')]&&_0x506086['find'](_0x15e2('0x4b'))[_0x15e2('0x4c')]();});_0x506086[_0x15e2('0x37')](_0x15e2('0x4d'))['click'](function(_0x31ec79){_0x31ec79[_0x15e2('0x4e')]();_0x575f53[_0x15e2('0x4f')]();});_0x506086['find'](_0x15e2('0x50'))['click'](function(_0x25e40d){_0x25e40d[_0x15e2('0x4e')]();_0x575f53[_0x15e2('0x51')]();});_0x1ab78c(document)[_0x15e2('0x3e')](_0x15e2('0x52'))['on'](_0x15e2('0x52'),function(_0x4c3e7c){_0x1ab78c(_0x4c3e7c[_0x15e2('0x53')])[_0x15e2('0x1')](_0x506086[_0x15e2('0x37')](_0x15e2('0x54')))[_0x15e2('0x8')]||_0x575f53[_0x15e2('0x51')]();});_0x506086[_0x15e2('0x37')]('.qd-ddc-cep-ok')[_0x15e2('0x4c')](function(_0x232c2a){_0x232c2a[_0x15e2('0x4e')]();_0x436e5b['shippingCalculate'](_0x506086[_0x15e2('0x37')]('.qd-ddc-cep'));});if(_0x47fd25[_0x15e2('0x55')]){var _0x3d1b83=0x0;_0x1ab78c(this)['on'](_0x15e2('0x56'),function(){var _0x506086=function(){window['_QuatroDigital_DropDown'][_0x15e2('0x19')]&&(_0x436e5b[_0x15e2('0x57')](),window['_QuatroDigital_DropDown'][_0x15e2('0x19')]=!0x1,_0x1ab78c['fn']['simpleCart'](!0x0),_0x436e5b[_0x15e2('0x58')]());};_0x3d1b83=setInterval(function(){_0x506086();},0x258);_0x506086();});_0x1ab78c(this)['on'](_0x15e2('0x59'),function(){clearInterval(_0x3d1b83);});}};var _0x5cb61f=function(_0xc516ab){_0xc516ab=_0x1ab78c(_0xc516ab);_0x47fd25[_0x15e2('0x5a')][_0x15e2('0x5b')]=_0x47fd25[_0x15e2('0x5a')][_0x15e2('0x5b')]['replace'](_0x15e2('0x5c'),_0x15e2('0x5d'));_0x47fd25[_0x15e2('0x5a')][_0x15e2('0x5b')]=_0x47fd25[_0x15e2('0x5a')][_0x15e2('0x5b')][_0x15e2('0x2')](_0x15e2('0x5e'),_0x15e2('0x5f'));_0x47fd25[_0x15e2('0x5a')]['cartTotal']=_0x47fd25['texts'][_0x15e2('0x5b')][_0x15e2('0x2')]('#shipping',_0x15e2('0x60'));_0x47fd25[_0x15e2('0x5a')]['cartTotal']=_0x47fd25[_0x15e2('0x5a')][_0x15e2('0x5b')]['replace'](_0x15e2('0x61'),'<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0xc516ab[_0x15e2('0x37')]('.qd-ddc-viewCart')[_0x15e2('0x62')](_0x47fd25[_0x15e2('0x5a')][_0x15e2('0x63')]);_0xc516ab['find']('.qd_ddc_continueShopping')[_0x15e2('0x62')](_0x47fd25['texts'][_0x15e2('0x64')]);_0xc516ab[_0x15e2('0x37')](_0x15e2('0x65'))[_0x15e2('0x62')](_0x47fd25[_0x15e2('0x5a')]['linkCheckout']);_0xc516ab[_0x15e2('0x37')](_0x15e2('0x66'))[_0x15e2('0x62')](_0x47fd25[_0x15e2('0x5a')][_0x15e2('0x5b')]);_0xc516ab['find'](_0x15e2('0x67'))[_0x15e2('0x62')](_0x47fd25[_0x15e2('0x5a')][_0x15e2('0x68')]);_0xc516ab[_0x15e2('0x37')](_0x15e2('0x69'))[_0x15e2('0x62')](_0x47fd25[_0x15e2('0x5a')][_0x15e2('0x6a')]);return _0xc516ab;}(this[_0x15e2('0x6b')]);var _0x2ab135=0x0;_0x7ef382[_0x15e2('0x6c')](function(){0x0<_0x2ab135?_0x56e9b8[_0x15e2('0x6d')](this,_0x5cb61f[_0x15e2('0x6e')]()):_0x56e9b8[_0x15e2('0x6d')](this,_0x5cb61f);_0x2ab135++;});window[_0x15e2('0xa')][_0x15e2('0xb')][_0x15e2('0x38')](function(){_0x1ab78c(_0x15e2('0x6f'))[_0x15e2('0x62')](window['_QuatroDigital_CartData']['total']||'--');_0x1ab78c(_0x15e2('0x70'))[_0x15e2('0x62')](window[_0x15e2('0xa')][_0x15e2('0x71')]||'0');_0x1ab78c(_0x15e2('0x72'))['html'](window[_0x15e2('0xa')][_0x15e2('0x73')]||'--');_0x1ab78c(_0x15e2('0x74'))[_0x15e2('0x62')](window[_0x15e2('0xa')][_0x15e2('0x75')]||'--');});var _0x7c504e=function(_0x2c0b35,_0x35323a){if(_0x15e2('0x4')===typeof _0x2c0b35[_0x15e2('0x76')])return _0x58910b(_0x15e2('0x77'));_0x436e5b[_0x15e2('0x78')][_0x15e2('0x6d')](this,_0x35323a);};_0x436e5b[_0x15e2('0x57')]=function(_0x2a3648,_0x33b125){_0x15e2('0x4')!=typeof _0x33b125?window['_QuatroDigital_DropDown']['dataOptionsCache']=_0x33b125:window[_0x15e2('0x18')][_0x15e2('0x79')]&&(_0x33b125=window[_0x15e2('0x18')][_0x15e2('0x79')]);setTimeout(function(){window['_QuatroDigital_DropDown'][_0x15e2('0x79')]=void 0x0;},_0x47fd25[_0x15e2('0x7a')]);_0x1ab78c('.qd-ddc-wrapper')[_0x15e2('0x3b')]('qd-ddc-prodLoaded');if(_0x47fd25[_0x15e2('0x7b')]){var _0x2897e3=function(_0x4c31df){window[_0x15e2('0x18')][_0x15e2('0x7c')]=_0x4c31df;_0x7c504e(_0x4c31df,_0x33b125);'undefined'!==typeof window['_QuatroDigital_AmountProduct']&&_0x15e2('0xd')===typeof window[_0x15e2('0x7d')][_0x15e2('0x7e')]&&window[_0x15e2('0x7d')][_0x15e2('0x7e')]['call'](this);_0x1ab78c('.qd-ddc-wrapper')['addClass']('qd-ddc-prodLoaded');};'undefined'!==typeof window[_0x15e2('0x18')][_0x15e2('0x7c')]?(_0x2897e3(window[_0x15e2('0x18')][_0x15e2('0x7c')]),_0x15e2('0xd')===typeof _0x2a3648&&_0x2a3648(window[_0x15e2('0x18')][_0x15e2('0x7c')])):_0x1ab78c[_0x15e2('0x7f')](['items','totalizers','shippingData'],{'done':function(_0x8188ef){_0x2897e3['call'](this,_0x8188ef);_0x15e2('0xd')===typeof _0x2a3648&&_0x2a3648(_0x8188ef);},'fail':function(_0x5de0c2){_0x58910b([_0x15e2('0x80'),_0x5de0c2]);}});}else alert(_0x15e2('0x81'));};_0x436e5b[_0x15e2('0x58')]=function(){var _0xef5f5d=_0x1ab78c(_0x15e2('0x82'));_0xef5f5d[_0x15e2('0x37')](_0x15e2('0x83'))[_0x15e2('0x8')]?_0xef5f5d[_0x15e2('0x3b')](_0x15e2('0x84')):_0xef5f5d['addClass'](_0x15e2('0x84'));};_0x436e5b[_0x15e2('0x78')]=function(_0x52725f){var _0x3d1b83=_0x1ab78c('.qd-ddc-prodWrapper2');_0x3d1b83[_0x15e2('0x85')]();_0x3d1b83[_0x15e2('0x6c')](function(){var _0x3d1b83=_0x1ab78c(this),_0x8f24fc,_0x3c5711,_0x1b3c63=_0x1ab78c(''),_0x53cb50;for(_0x53cb50 in window[_0x15e2('0x18')][_0x15e2('0x7c')][_0x15e2('0x76')])if(_0x15e2('0x10')===typeof window[_0x15e2('0x18')][_0x15e2('0x7c')][_0x15e2('0x76')][_0x53cb50]){var _0x4fcc24=window['_QuatroDigital_DropDown'][_0x15e2('0x7c')][_0x15e2('0x76')][_0x53cb50];var _0x4e0996=_0x4fcc24[_0x15e2('0x86')]['replace'](/^\/|\/$/g,'')[_0x15e2('0x7')]('/');var _0x15e306=_0x1ab78c(_0x15e2('0x87'));_0x15e306['attr']({'data-sku':_0x4fcc24['id'],'data-sku-index':_0x53cb50,'data-qd-departament':_0x4e0996[0x0],'data-qd-category':_0x4e0996[_0x4e0996['length']-0x1]});_0x15e306['addClass']('qd-ddc-'+_0x4fcc24[_0x15e2('0x88')]);_0x15e306[_0x15e2('0x37')](_0x15e2('0x89'))['append'](_0x47fd25['skuName'](_0x4fcc24));_0x15e306['find'](_0x15e2('0x8a'))[_0x15e2('0x36')](isNaN(_0x4fcc24[_0x15e2('0x8b')])?_0x4fcc24[_0x15e2('0x8b')]:0x0==_0x4fcc24[_0x15e2('0x8b')]?_0x15e2('0x8c'):(_0x1ab78c('meta[name=currency]')[_0x15e2('0x8d')](_0x15e2('0x8e'))||'R$')+'\x20'+qd_number_format(_0x4fcc24[_0x15e2('0x8b')]/0x64,0x2,',','.'));_0x15e306[_0x15e2('0x37')](_0x15e2('0x8f'))[_0x15e2('0x8d')]({'data-sku':_0x4fcc24['id'],'data-sku-index':_0x53cb50})[_0x15e2('0x49')](_0x4fcc24[_0x15e2('0x90')]);_0x15e306[_0x15e2('0x37')](_0x15e2('0x91'))[_0x15e2('0x8d')]({'data-sku':_0x4fcc24['id'],'data-sku-index':_0x53cb50});_0x436e5b[_0x15e2('0x92')](_0x4fcc24['id'],_0x15e306[_0x15e2('0x37')](_0x15e2('0x93')),_0x4fcc24[_0x15e2('0x94')]);_0x15e306[_0x15e2('0x37')](_0x15e2('0x95'))[_0x15e2('0x8d')]({'data-sku':_0x4fcc24['id'],'data-sku-index':_0x53cb50});_0x15e306[_0x15e2('0x96')](_0x3d1b83);_0x1b3c63=_0x1b3c63[_0x15e2('0x38')](_0x15e306);}try{var _0xd09394=_0x3d1b83[_0x15e2('0x0')](_0x15e2('0x82'))[_0x15e2('0x37')](_0x15e2('0x97'));_0xd09394[_0x15e2('0x8')]&&''==_0xd09394[_0x15e2('0x49')]()&&window[_0x15e2('0x18')][_0x15e2('0x7c')][_0x15e2('0x98')]['address']&&_0xd09394['val'](window[_0x15e2('0x18')][_0x15e2('0x7c')]['shippingData'][_0x15e2('0x99')][_0x15e2('0x9a')]);}catch(_0x41c09a){_0x58910b(_0x15e2('0x9b')+_0x41c09a[_0x15e2('0xf')],'aviso');}_0x436e5b[_0x15e2('0x9c')](_0x3d1b83);_0x436e5b[_0x15e2('0x58')]();_0x52725f&&_0x52725f[_0x15e2('0x9d')]&&function(){_0x3c5711=_0x1b3c63['filter']('[data-sku=\x27'+_0x52725f[_0x15e2('0x9d')]+'\x27]');_0x3c5711['length']&&(_0x8f24fc=0x0,_0x1b3c63['each'](function(){var _0x52725f=_0x1ab78c(this);if(_0x52725f['is'](_0x3c5711))return!0x1;_0x8f24fc+=_0x52725f[_0x15e2('0x9e')]();}),_0x436e5b['scrollCart'](void 0x0,void 0x0,_0x8f24fc,_0x3d1b83[_0x15e2('0x38')](_0x3d1b83['parent']())),_0x1b3c63[_0x15e2('0x3b')](_0x15e2('0x9f')),function(_0xb7292c){_0xb7292c['addClass'](_0x15e2('0xa0'));_0xb7292c[_0x15e2('0xa1')]('qd-ddc-lastAddedFixed');setTimeout(function(){_0xb7292c[_0x15e2('0x3b')](_0x15e2('0xa0'));},_0x47fd25[_0x15e2('0x7a')]);}(_0x3c5711),_0x1ab78c(document[_0x15e2('0x3d')])[_0x15e2('0xa1')](_0x15e2('0xa2')),setTimeout(function(){_0x1ab78c(document[_0x15e2('0x3d')])['removeClass'](_0x15e2('0xa2'));},_0x47fd25[_0x15e2('0x7a')]));}();});(function(){_QuatroDigital_DropDown['getOrderForm'][_0x15e2('0x76')]['length']?(_0x1ab78c(_0x15e2('0x3d'))[_0x15e2('0x3b')](_0x15e2('0xa3'))[_0x15e2('0xa1')](_0x15e2('0xa4')),setTimeout(function(){_0x1ab78c(_0x15e2('0x3d'))[_0x15e2('0x3b')](_0x15e2('0xa5'));},_0x47fd25['timeRemoveNewItemClass'])):_0x1ab78c(_0x15e2('0x3d'))['removeClass'](_0x15e2('0xa6'))[_0x15e2('0xa1')]('qd-ddc-cart-empty');}());_0x15e2('0xd')===typeof _0x47fd25[_0x15e2('0xa7')]?_0x47fd25[_0x15e2('0xa7')][_0x15e2('0x6d')](this):_0x58910b(_0x15e2('0xa8'));};_0x436e5b['insertProdImg']=function(_0x4ee500,_0x2a38b3,_0x324cd6){function _0x5cacd5(){_0x47fd25[_0x15e2('0xa9')]&&_0x15e2('0xaa')==typeof _0x324cd6&&(_0x324cd6=_0x324cd6[_0x15e2('0x2')]('http','https'));_0x2a38b3['removeClass'](_0x15e2('0xab'))['load'](function(){_0x1ab78c(this)['addClass']('qd-loaded');})[_0x15e2('0x8d')](_0x15e2('0xac'),_0x324cd6);}_0x324cd6?_0x5cacd5():isNaN(_0x4ee500)?_0x58910b(_0x15e2('0xad'),_0x15e2('0x13')):alert(_0x15e2('0xae'));};_0x436e5b[_0x15e2('0x9c')]=function(_0x2e185c){var _0x3d1b83=function(_0x597d22,_0x5e281a){var _0x41cd20=_0x1ab78c(_0x597d22);var _0xdbc25d=_0x41cd20[_0x15e2('0x8d')](_0x15e2('0xaf'));var _0x4e0996=_0x41cd20['attr']('data-sku-index');if(_0xdbc25d){var _0x1bcc6f=parseInt(_0x41cd20['val']())||0x1;_0x436e5b['changeQantity']([_0xdbc25d,_0x4e0996],_0x1bcc6f,_0x1bcc6f+0x1,function(_0x1a7b58){_0x41cd20[_0x15e2('0x49')](_0x1a7b58);_0x15e2('0xd')===typeof _0x5e281a&&_0x5e281a();});}};var _0x570da3=function(_0x171f4a,_0x3e0e16){var _0x3d1b83=_0x1ab78c(_0x171f4a);var _0x37e5ae=_0x3d1b83[_0x15e2('0x8d')](_0x15e2('0xaf'));var _0x375840=_0x3d1b83['attr'](_0x15e2('0xb0'));if(_0x37e5ae){var _0x4e0996=parseInt(_0x3d1b83['val']())||0x2;_0x436e5b[_0x15e2('0xb1')]([_0x37e5ae,_0x375840],_0x4e0996,_0x4e0996-0x1,function(_0x1820d5){_0x3d1b83['val'](_0x1820d5);'function'===typeof _0x3e0e16&&_0x3e0e16();});}};var _0x34561b=function(_0x10a132,_0x4bc31c){var _0x5d379e=_0x1ab78c(_0x10a132);var _0xb8bf0a=_0x5d379e[_0x15e2('0x8d')](_0x15e2('0xaf'));var _0x4e0996=_0x5d379e[_0x15e2('0x8d')](_0x15e2('0xb0'));if(_0xb8bf0a){var _0x2fda71=parseInt(_0x5d379e['val']())||0x1;_0x436e5b['changeQantity']([_0xb8bf0a,_0x4e0996],0x1,_0x2fda71,function(_0x586525){_0x5d379e[_0x15e2('0x49')](_0x586525);_0x15e2('0xd')===typeof _0x4bc31c&&_0x4bc31c();});}};var _0x4e0996=_0x2e185c['find']('.qd-ddc-prodQttWrapper:not(.qd_on)');_0x4e0996[_0x15e2('0xa1')](_0x15e2('0xb2'))[_0x15e2('0x6c')](function(){var _0x2e185c=_0x1ab78c(this);_0x2e185c[_0x15e2('0x37')](_0x15e2('0xb3'))['on'](_0x15e2('0xb4'),function(_0x2f0234){_0x2f0234[_0x15e2('0x4e')]();_0x4e0996[_0x15e2('0xa1')]('qd-loading');_0x3d1b83(_0x2e185c[_0x15e2('0x37')](_0x15e2('0x8f')),function(){_0x4e0996[_0x15e2('0x3b')](_0x15e2('0xb5'));});});_0x2e185c[_0x15e2('0x37')](_0x15e2('0xb6'))['on'](_0x15e2('0xb7'),function(_0x4c50f0){_0x4c50f0[_0x15e2('0x4e')]();_0x4e0996[_0x15e2('0xa1')](_0x15e2('0xb5'));_0x570da3(_0x2e185c[_0x15e2('0x37')]('.qd-ddc-quantity'),function(){_0x4e0996[_0x15e2('0x3b')](_0x15e2('0xb5'));});});_0x2e185c['find'](_0x15e2('0x8f'))['on'](_0x15e2('0xb8'),function(){_0x4e0996[_0x15e2('0xa1')](_0x15e2('0xb5'));_0x34561b(this,function(){_0x4e0996[_0x15e2('0x3b')](_0x15e2('0xb5'));});});_0x2e185c[_0x15e2('0x37')](_0x15e2('0x8f'))['on']('keyup.qd_ddc_change',function(_0xc68e34){0xd==_0xc68e34[_0x15e2('0x40')]&&(_0x4e0996['addClass']('qd-loading'),_0x34561b(this,function(){_0x4e0996['removeClass'](_0x15e2('0xb5'));}));});});_0x2e185c[_0x15e2('0x37')](_0x15e2('0x83'))[_0x15e2('0x6c')](function(){var _0x2e185c=_0x1ab78c(this);_0x2e185c[_0x15e2('0x37')](_0x15e2('0x91'))['on']('click.qd_ddc_remove',function(){_0x2e185c['addClass'](_0x15e2('0xb5'));_0x436e5b[_0x15e2('0xb9')](_0x1ab78c(this),function(_0x1c2a71){_0x1c2a71?_0x2e185c[_0x15e2('0xba')](!0x0)[_0x15e2('0xbb')](function(){_0x2e185c[_0x15e2('0xbc')]();_0x436e5b[_0x15e2('0x58')]();}):_0x2e185c[_0x15e2('0x3b')](_0x15e2('0xb5'));});return!0x1;});});};_0x436e5b[_0x15e2('0xbd')]=function(_0x2c990a){var _0x14e0fb=_0x2c990a[_0x15e2('0x49')]();_0x14e0fb=_0x14e0fb['replace'](/[^0-9\-]/g,'');_0x14e0fb=_0x14e0fb[_0x15e2('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x15e2('0xbe'));_0x14e0fb=_0x14e0fb['replace'](/(.{9}).*/g,'$1');_0x2c990a[_0x15e2('0x49')](_0x14e0fb);};_0x436e5b[_0x15e2('0xbf')]=function(_0x2e8c12){var _0x47f565=_0x2e8c12['val']();0x9<=_0x47f565[_0x15e2('0x8')]&&(_0x2e8c12['data'](_0x15e2('0xc0'))!=_0x47f565&&_0x565b96[_0x15e2('0xc1')]({'postalCode':_0x47f565,'country':_0x15e2('0xc2')})[_0x15e2('0xc3')](function(_0x5718c9){_0x2e8c12['closest']('.qd-ddc-cep-tooltip-text')[_0x15e2('0x37')]('.qd-dd-cep-slas')[_0x15e2('0xbc')]();window[_0x15e2('0x18')][_0x15e2('0x7c')]=_0x5718c9;_0x436e5b[_0x15e2('0x57')]();_0x5718c9=_0x5718c9[_0x15e2('0x98')][_0x15e2('0xc4')][0x0][_0x15e2('0xc5')];for(var _0x4e0996=_0x1ab78c(_0x15e2('0xc6')),_0x10601c=0x0;_0x10601c<_0x5718c9[_0x15e2('0x8')];_0x10601c++){var _0x54e2ea=_0x5718c9[_0x10601c],_0x52212b=0x1<_0x54e2ea[_0x15e2('0xc7')]?_0x54e2ea[_0x15e2('0xc7')]['replace']('bd',_0x15e2('0xc8')):_0x54e2ea[_0x15e2('0xc7')][_0x15e2('0x2')]('bd','\x20dias\x20útéis'),_0x17493e=_0x1ab78c('<tr></tr>');_0x17493e[_0x15e2('0x36')](_0x15e2('0xc9')+qd_number_format(_0x54e2ea['price']/0x64,0x2,',','.')+_0x15e2('0xca')+_0x54e2ea[_0x15e2('0x2b')]+_0x15e2('0xcb')+_0x52212b+_0x15e2('0xcc')+_0x47f565+_0x15e2('0xcd'));_0x17493e[_0x15e2('0x96')](_0x4e0996['find'](_0x15e2('0xce')));}_0x4e0996[_0x15e2('0xcf')](_0x2e8c12[_0x15e2('0x1')](_0x15e2('0xd0'))[_0x15e2('0x37')]('.qd-ddc-cep-close'));})['fail'](function(_0x2bed8e){_0x58910b([_0x15e2('0xd1'),_0x2bed8e]);updateCartData();}),_0x2e8c12['data'](_0x15e2('0xc0'),_0x47f565));};_0x436e5b[_0x15e2('0xb1')]=function(_0x4e418d,_0x10d985,_0x1f942a,_0x46127a){function _0x402d35(_0xca1391){_0xca1391=_0x15e2('0xd2')!==typeof _0xca1391?!0x1:_0xca1391;_0x436e5b[_0x15e2('0x57')]();window[_0x15e2('0x18')]['allowUpdate']=!0x1;_0x436e5b[_0x15e2('0x58')]();_0x15e2('0x4')!==typeof window[_0x15e2('0x7d')]&&_0x15e2('0xd')===typeof window[_0x15e2('0x7d')][_0x15e2('0x7e')]&&window[_0x15e2('0x7d')]['exec']['call'](this);_0x15e2('0xd')===typeof adminCart&&adminCart();_0x1ab78c['fn']['simpleCart'](!0x0,void 0x0,_0xca1391);'function'===typeof _0x46127a&&_0x46127a(_0x10d985);}_0x1f942a=_0x1f942a||0x1;if(0x1>_0x1f942a)return _0x10d985;if(_0x47fd25['smartCheckout']){if(_0x15e2('0x4')===typeof window[_0x15e2('0x18')][_0x15e2('0x7c')][_0x15e2('0x76')][_0x4e418d[0x1]])return _0x58910b(_0x15e2('0xd3')+_0x4e418d[0x1]+']'),_0x10d985;window['_QuatroDigital_DropDown'][_0x15e2('0x7c')][_0x15e2('0x76')][_0x4e418d[0x1]][_0x15e2('0x90')]=_0x1f942a;window[_0x15e2('0x18')][_0x15e2('0x7c')][_0x15e2('0x76')][_0x4e418d[0x1]][_0x15e2('0xd4')]=_0x4e418d[0x1];_0x565b96[_0x15e2('0xd5')]([window['_QuatroDigital_DropDown']['getOrderForm'][_0x15e2('0x76')][_0x4e418d[0x1]]],[_0x15e2('0x76'),_0x15e2('0xd6'),_0x15e2('0x98')])[_0x15e2('0xc3')](function(_0x248bbe){window[_0x15e2('0x18')][_0x15e2('0x7c')]=_0x248bbe;_0x402d35(!0x0);})[_0x15e2('0xd7')](function(_0x1017fe){_0x58910b([_0x15e2('0xd8'),_0x1017fe]);_0x402d35();});}else _0x58910b(_0x15e2('0xd9'));};_0x436e5b['removeProduct']=function(_0x30f692,_0x5616ea){function _0x58eef0(_0x57b973){_0x57b973=_0x15e2('0xd2')!==typeof _0x57b973?!0x1:_0x57b973;_0x15e2('0x4')!==typeof window[_0x15e2('0x7d')]&&_0x15e2('0xd')===typeof window['_QuatroDigital_AmountProduct'][_0x15e2('0x7e')]&&window['_QuatroDigital_AmountProduct'][_0x15e2('0x7e')][_0x15e2('0x6d')](this);_0x15e2('0xd')===typeof adminCart&&adminCart();_0x1ab78c['fn'][_0x15e2('0xda')](!0x0,void 0x0,_0x57b973);_0x15e2('0xd')===typeof _0x5616ea&&_0x5616ea(_0x49df76);}var _0x49df76=!0x1,_0x4e0996=_0x1ab78c(_0x30f692)[_0x15e2('0x8d')](_0x15e2('0xb0'));if(_0x47fd25[_0x15e2('0x7b')]){if(_0x15e2('0x4')===typeof window[_0x15e2('0x18')][_0x15e2('0x7c')][_0x15e2('0x76')][_0x4e0996])return _0x58910b(_0x15e2('0xd3')+_0x4e0996+']'),_0x49df76;window[_0x15e2('0x18')]['getOrderForm']['items'][_0x4e0996][_0x15e2('0xd4')]=_0x4e0996;_0x565b96[_0x15e2('0xdb')]([window[_0x15e2('0x18')][_0x15e2('0x7c')]['items'][_0x4e0996]],[_0x15e2('0x76'),_0x15e2('0xd6'),_0x15e2('0x98')])[_0x15e2('0xc3')](function(_0x2f5276){_0x49df76=!0x0;window[_0x15e2('0x18')][_0x15e2('0x7c')]=_0x2f5276;_0x7c504e(_0x2f5276);_0x58eef0(!0x0);})[_0x15e2('0xd7')](function(_0x419264){_0x58910b([_0x15e2('0xdc'),_0x419264]);_0x58eef0();});}else alert(_0x15e2('0xdd'));};_0x436e5b[_0x15e2('0x44')]=function(_0xddb9e1,_0x8a5422,_0x5e243e,_0x291e77){_0x291e77=_0x291e77||_0x1ab78c(_0x15e2('0xde'));_0xddb9e1=_0xddb9e1||'+';_0x8a5422=_0x8a5422||0.9*_0x291e77['height']();_0x291e77[_0x15e2('0xba')](!0x0,!0x0)['animate']({'scrollTop':isNaN(_0x5e243e)?_0xddb9e1+'='+_0x8a5422+'px':_0x5e243e});};_0x47fd25['updateOnlyHover']||(_0x436e5b[_0x15e2('0x57')](),_0x1ab78c['fn'][_0x15e2('0xda')](!0x0));_0x1ab78c(window)['on'](_0x15e2('0xdf'),function(){try{window['_QuatroDigital_DropDown'][_0x15e2('0x7c')]=void 0x0,_0x436e5b['getCartInfoByUrl']();}catch(_0x1bdc02){_0x58910b(_0x15e2('0xe0')+_0x1bdc02[_0x15e2('0xf')],_0x15e2('0xe1'));}});_0x15e2('0xd')===typeof _0x47fd25['callback']?_0x47fd25[_0x15e2('0xb')][_0x15e2('0x6d')](this):_0x58910b('Callback\x20não\x20é\x20uma\x20função');};_0x1ab78c['fn'][_0x15e2('0x22')]=function(_0x9e46ed){var _0x25e5e8=_0x1ab78c(this);_0x25e5e8['fn']=new _0x1ab78c[(_0x15e2('0x22'))](this,_0x9e46ed);return _0x25e5e8;};}catch(_0x213aca){_0x15e2('0x4')!==typeof console&&_0x15e2('0xd')===typeof console[_0x15e2('0xe')]&&console[_0x15e2('0xe')]('Oooops!\x20',_0x213aca);}}(this));(function(_0xa9c9f4){try{var _0x5a5209=jQuery;window[_0x15e2('0x7d')]=window[_0x15e2('0x7d')]||{};window['_QuatroDigital_AmountProduct'][_0x15e2('0x76')]={};window[_0x15e2('0x7d')][_0x15e2('0xe2')]=!0x1;window[_0x15e2('0x7d')][_0x15e2('0xe3')]=!0x1;window[_0x15e2('0x7d')][_0x15e2('0xe4')]=!0x1;var _0x55c0cc=function(){if(window[_0x15e2('0x7d')][_0x15e2('0xe2')]){var _0x3e674d=!0x1;var _0x2817c3={};window[_0x15e2('0x7d')][_0x15e2('0x76')]={};for(_0x3b67c8 in window['_QuatroDigital_DropDown'][_0x15e2('0x7c')][_0x15e2('0x76')])if('object'===typeof window[_0x15e2('0x18')][_0x15e2('0x7c')]['items'][_0x3b67c8]){var _0x2215aa=window[_0x15e2('0x18')][_0x15e2('0x7c')]['items'][_0x3b67c8];_0x15e2('0x4')!==typeof _0x2215aa[_0x15e2('0xe5')]&&null!==_0x2215aa[_0x15e2('0xe5')]&&''!==_0x2215aa['productId']&&(window[_0x15e2('0x7d')]['items'][_0x15e2('0xe6')+_0x2215aa[_0x15e2('0xe5')]]=window[_0x15e2('0x7d')]['items'][_0x15e2('0xe6')+_0x2215aa[_0x15e2('0xe5')]]||{},window[_0x15e2('0x7d')]['items'][_0x15e2('0xe6')+_0x2215aa[_0x15e2('0xe5')]]['prodId']=_0x2215aa['productId'],_0x2817c3['prod_'+_0x2215aa[_0x15e2('0xe5')]]||(window['_QuatroDigital_AmountProduct'][_0x15e2('0x76')][_0x15e2('0xe6')+_0x2215aa['productId']][_0x15e2('0x71')]=0x0),window['_QuatroDigital_AmountProduct'][_0x15e2('0x76')][_0x15e2('0xe6')+_0x2215aa[_0x15e2('0xe5')]][_0x15e2('0x71')]+=_0x2215aa['quantity'],_0x3e674d=!0x0,_0x2817c3['prod_'+_0x2215aa[_0x15e2('0xe5')]]=!0x0);}var _0x3b67c8=_0x3e674d;}else _0x3b67c8=void 0x0;window[_0x15e2('0x7d')][_0x15e2('0xe2')]&&(_0x5a5209(_0x15e2('0xe7'))[_0x15e2('0xbc')](),_0x5a5209(_0x15e2('0xe8'))[_0x15e2('0x3b')](_0x15e2('0xe9')));for(var _0x2f75f7 in window['_QuatroDigital_AmountProduct']['items']){_0x2215aa=window[_0x15e2('0x7d')]['items'][_0x2f75f7];if(_0x15e2('0x10')!==typeof _0x2215aa)return;_0x2817c3=_0x5a5209(_0x15e2('0xea')+_0x2215aa[_0x15e2('0xeb')]+']')[_0x15e2('0x0')]('li');if(window[_0x15e2('0x7d')][_0x15e2('0xe2')]||!_0x2817c3[_0x15e2('0x37')]('.qd-bap-wrapper')[_0x15e2('0x8')])_0x3e674d=_0x5a5209(_0x15e2('0xec')),_0x3e674d['find'](_0x15e2('0xed'))[_0x15e2('0x62')](_0x2215aa[_0x15e2('0x71')]),_0x2215aa=_0x2817c3[_0x15e2('0x37')](_0x15e2('0xee')),_0x2215aa[_0x15e2('0x8')]?_0x2215aa[_0x15e2('0xef')](_0x3e674d)[_0x15e2('0xa1')]('qd-bap-item-added'):_0x2817c3[_0x15e2('0xef')](_0x3e674d);}_0x3b67c8&&(window[_0x15e2('0x7d')][_0x15e2('0xe2')]=!0x1);};window[_0x15e2('0x7d')]['exec']=function(){window['_QuatroDigital_AmountProduct'][_0x15e2('0xe2')]=!0x0;_0x55c0cc[_0x15e2('0x6d')](this);};_0x5a5209(document)[_0x15e2('0xf0')](function(){_0x55c0cc[_0x15e2('0x6d')](this);});}catch(_0x4e5322){_0x15e2('0x4')!==typeof console&&_0x15e2('0xd')===typeof console['error']&&console[_0x15e2('0xe')](_0x15e2('0xf1'),_0x4e5322);}}(this));(function(){try{var _0x4935bb=jQuery,_0x23f0eb,_0x15eb0c={'selector':_0x15e2('0xf2'),'dropDown':{},'buyButton':{}};_0x4935bb[_0x15e2('0xf3')]=function(_0x524e3c){var _0x4f6a23={};_0x23f0eb=_0x4935bb[_0x15e2('0x23')](!0x0,{},_0x15eb0c,_0x524e3c);_0x524e3c=_0x4935bb(_0x23f0eb[_0x15e2('0xf4')])[_0x15e2('0x22')](_0x23f0eb[_0x15e2('0xf5')]);_0x4f6a23[_0x15e2('0xf6')]=_0x15e2('0x4')!==typeof _0x23f0eb['dropDown']['updateOnlyHover']&&!0x1===_0x23f0eb[_0x15e2('0xf5')][_0x15e2('0x55')]?_0x4935bb(_0x23f0eb[_0x15e2('0xf4')])['QD_buyButton'](_0x524e3c['fn'],_0x23f0eb['buyButton']):_0x4935bb(_0x23f0eb[_0x15e2('0xf4')])[_0x15e2('0xf7')](_0x23f0eb[_0x15e2('0xf6')]);_0x4f6a23[_0x15e2('0xf5')]=_0x524e3c;return _0x4f6a23;};_0x4935bb['fn'][_0x15e2('0xf8')]=function(){_0x15e2('0x10')===typeof console&&'function'===typeof console[_0x15e2('0x11')]&&console['info']('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x4935bb['smartCart']=_0x4935bb['fn'][_0x15e2('0xf8')];}catch(_0x41520c){_0x15e2('0x4')!==typeof console&&_0x15e2('0xd')===typeof console[_0x15e2('0xe')]&&console[_0x15e2('0xe')]('Oooops!\x20',_0x41520c);}}());

/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

var _0x5a20=['bottom','top','height','first','clone','addClass','attr','src','sizes','width','qd-sil-image','closest','qd-sil-on','offset','push','each','QD_SIL_scrollRange','scroll','documentElement','body','trigger','QD_SIL_scroll','QD_smartImageLoad','hkpnfr%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','join','toUpperCase','ite','---','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Quatro\x20Digital\x20-\x20Smart\x20Image\x20Load','object','undefined','error','info','warn','function','unshift','aviso','toLowerCase','apply','.qd_sil_img_wrapper','300','QD_SIL_scroll\x20QuatroDigital.is_Callback','imageWrapper','not','length','scrollTop'];(function(_0x2b1e65,_0x5f2f97){var _0x5d4323=function(_0x12864a){while(--_0x12864a){_0x2b1e65['push'](_0x2b1e65['shift']());}};_0x5d4323(++_0x5f2f97);}(_0x5a20,0x1b6));var _0x309f=function(_0x31ad9b,_0x2d3c7c){_0x31ad9b=_0x31ad9b-0x0;var _0x57c555=_0x5a20[_0x31ad9b];return _0x57c555;};(function(_0x3ebeb1){'use strict';var _0x27d121=jQuery;if(typeof _0x27d121['fn'][_0x309f('0x0')]==='function')return;_0x27d121['fn'][_0x309f('0x0')]=function(){};var _0x8f6af3=function(_0x2f7057){var _0x383aab={'y':_0x309f('0x1')};return function(_0x3823af){var _0x4dc0bf,_0x4b5b25,_0x198de3,_0xafb4c5;_0x4b5b25=function(_0x7a3bdb){return _0x7a3bdb;};_0x198de3=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3823af=_0x3823af['d'+_0x198de3[0x10]+'c'+_0x198de3[0x11]+'m'+_0x4b5b25(_0x198de3[0x1])+'n'+_0x198de3[0xd]]['l'+_0x198de3[0x12]+'c'+_0x198de3[0x0]+'ti'+_0x4b5b25('o')+'n'];_0x4dc0bf=function(_0xb16bdd){return escape(encodeURIComponent(_0xb16bdd[_0x309f('0x2')](/\./g,'¨')[_0x309f('0x2')](/[a-zA-Z]/g,function(_0x4d135e){return String[_0x309f('0x3')](('Z'>=_0x4d135e?0x5a:0x7a)>=(_0x4d135e=_0x4d135e[_0x309f('0x4')](0x0)+0xd)?_0x4d135e:_0x4d135e-0x1a);})));};var _0x3127ca=_0x4dc0bf(_0x3823af[[_0x198de3[0x9],_0x4b5b25('o'),_0x198de3[0xc],_0x198de3[_0x4b5b25(0xd)]][_0x309f('0x5')]('')]);_0x4dc0bf=_0x4dc0bf((window[['js',_0x4b5b25('no'),'m',_0x198de3[0x1],_0x198de3[0x4][_0x309f('0x6')](),_0x309f('0x7')]['join']('')]||_0x309f('0x8'))+['.v',_0x198de3[0xd],'e',_0x4b5b25('x'),'co',_0x4b5b25('mm'),'erc',_0x198de3[0x1],'.c',_0x4b5b25('o'),'m.',_0x198de3[0x13],'r'][_0x309f('0x5')](''));for(var _0x2a9d05 in _0x383aab){if(_0x4dc0bf===_0x2a9d05+_0x383aab[_0x2a9d05]||_0x3127ca===_0x2a9d05+_0x383aab[_0x2a9d05]){_0xafb4c5='tr'+_0x198de3[0x11]+'e';break;}_0xafb4c5='f'+_0x198de3[0x0]+'ls'+_0x4b5b25(_0x198de3[0x1])+'';}_0x4b5b25=!0x1;-0x1<_0x3823af[[_0x198de3[0xc],'e',_0x198de3[0x0],'rc',_0x198de3[0x9]][_0x309f('0x5')]('')][_0x309f('0x9')](_0x309f('0xa'))&&(_0x4b5b25=!0x0);return[_0xafb4c5,_0x4b5b25];}(_0x2f7057);}(window);if(!eval(_0x8f6af3[0x0]))return _0x8f6af3[0x1]?_0x4930da(_0x309f('0xb')):!0x1;var _0x328c6c=_0x309f('0xc');var _0x4930da=function(_0x2a4c68,_0x586a4e){if(_0x309f('0xd')===typeof console&&_0x309f('0xe')!==typeof console[_0x309f('0xf')]&&_0x309f('0xe')!==typeof console[_0x309f('0x10')]&&_0x309f('0xe')!==typeof console[_0x309f('0x11')]){if(_0x309f('0xd')==typeof _0x2a4c68&&_0x309f('0x12')==typeof _0x2a4c68[_0x309f('0x13')]){_0x2a4c68[_0x309f('0x13')]('['+_0x328c6c+']\x0a');var _0x4fad70=_0x2a4c68;}else _0x4fad70=['['+_0x328c6c+']\x0a',_0x2a4c68];if(_0x309f('0xe')==typeof _0x586a4e||'alerta'!==_0x586a4e['toLowerCase']()&&_0x309f('0x14')!==_0x586a4e['toLowerCase']())if(_0x309f('0xe')!=typeof _0x586a4e&&_0x309f('0x10')==_0x586a4e[_0x309f('0x15')]())try{console[_0x309f('0x10')][_0x309f('0x16')](console,_0x4fad70);}catch(_0x553516){try{console['info'](_0x4fad70[_0x309f('0x5')]('\x0a'));}catch(_0x56fc5f){}}else try{console[_0x309f('0xf')][_0x309f('0x16')](console,_0x4fad70);}catch(_0x1961f2){try{console['error'](_0x4fad70[_0x309f('0x5')]('\x0a'));}catch(_0x32b87a){}}else try{console[_0x309f('0x11')][_0x309f('0x16')](console,_0x4fad70);}catch(_0x59f6ed){try{console[_0x309f('0x11')](_0x4fad70[_0x309f('0x5')]('\x0a'));}catch(_0x26737e){}}}};var _0x4405b3=/(ids\/[0-9]+-)[0-9-]+/i;var _0x335025={'imageWrapper':_0x309f('0x17'),'sizes':{'width':_0x309f('0x18'),'height':_0x309f('0x18')}};var _0x1dd643=function(_0x336e5c,_0x207037){'use strict';_0x38ee3a();_0x27d121(window)['on'](_0x309f('0x19'),_0x38ee3a);function _0x38ee3a(){try{var _0xbf0a39=_0x336e5c['find'](_0x207037[_0x309f('0x1a')])[_0x309f('0x1b')]('.qd-sil-on')['find']('img:visible');if(!_0xbf0a39[_0x309f('0x1c')])return;var _0x5b1197=_0x27d121(window);var _0x244a4a={'top':_0x5b1197[_0x309f('0x1d')]()};_0x244a4a[_0x309f('0x1e')]=_0x244a4a[_0x309f('0x1f')]+_0x5b1197[_0x309f('0x20')]();var _0x1743ee=_0xbf0a39[_0x309f('0x21')]()[_0x309f('0x20')]();var _0x4f82c6=_0x35fd61(_0xbf0a39,_0x244a4a,_0x1743ee);for(var _0x44ad4d=0x0;_0x44ad4d<_0x4f82c6[_0x309f('0x1c')];_0x44ad4d++)_0x3ec29a(_0x27d121(_0x4f82c6[_0x44ad4d]));}catch(_0x2f3234){typeof console!=='undefined'&&typeof console['error']==='function'&&console[_0x309f('0xf')]('Problemas\x20:(\x20.\x20Detalhes:\x20',_0x2f3234);}}function _0x3ec29a(_0x24b78d){var _0x100afb=_0x24b78d[_0x309f('0x22')]();_0x100afb['on']('load',function(){_0x27d121(this)[_0x309f('0x23')]('qd-sil-image-loaded');});_0x100afb[_0x309f('0x24')]({'src':_0x100afb[0x0][_0x309f('0x25')][_0x309f('0x2')](_0x4405b3,'$1'+_0x207037[_0x309f('0x26')][_0x309f('0x27')]+'-'+_0x207037[_0x309f('0x26')]['height']),'width':_0x207037[_0x309f('0x26')][_0x309f('0x27')],'height':_0x207037['sizes'][_0x309f('0x20')]});_0x100afb['addClass'](_0x309f('0x28'))['insertAfter'](_0x24b78d);_0x100afb[_0x309f('0x29')](_0x207037['imageWrapper'])[_0x309f('0x23')](_0x309f('0x2a'));}function _0x35fd61(_0x5dada4,_0x1cc5aa,_0x2506f9){var _0x58dab0;var _0x23eeff=[];for(var _0x167191=0x0;_0x167191<_0x5dada4[_0x309f('0x1c')];_0x167191++){_0x58dab0=_0x27d121(_0x5dada4[_0x167191])[_0x309f('0x2b')]();_0x58dab0[_0x309f('0x1e')]=_0x58dab0[_0x309f('0x1f')]+_0x2506f9;if(!(_0x1cc5aa['bottom']<_0x58dab0[_0x309f('0x1f')]||_0x1cc5aa['top']>_0x58dab0[_0x309f('0x1e')])){_0x23eeff[_0x309f('0x2c')](_0x5dada4[_0x167191]);}}return _0x23eeff;};};_0x27d121['fn'][_0x309f('0x0')]=function(_0x3d1d31){var _0x1c8a7a=_0x27d121(this);if(!_0x1c8a7a['length'])return _0x1c8a7a;_0x1c8a7a[_0x309f('0x2d')](function(){var _0xa08fe8=_0x27d121(this);_0xa08fe8['QD_smartImageLoad']=new _0x1dd643(_0xa08fe8,_0x27d121['extend']({},_0x335025,_0x3d1d31));});return _0x1c8a7a;};window[_0x309f('0x2e')]=0x28;var _0x2dc4bc=QD_SIL_scrollRange;var _0x586098=0x0;_0x27d121(window)['on'](_0x309f('0x2f'),function(){var _0x10592b=document[_0x309f('0x30')][_0x309f('0x1d')]||document[_0x309f('0x31')][_0x309f('0x1d')];if(_0x10592b>_0x586098+_0x2dc4bc||_0x10592b<_0x586098-_0x2dc4bc){_0x27d121(window)[_0x309f('0x32')](_0x309f('0x33'));_0x586098=_0x10592b;}});}(this));

/* Automatizador de comments box do Facebook // 1.6 // Carlos Vinicius [Quatro Digital] */
$(window).on("load QD_autoFaceComments",function(){if(window.QD_lazyFaceComments)
return;var fbComments=$(".fb-comments");if(fbComments.find('iframe').length)
return;if(fbComments.length)
fbComments.attr("data-href",document.location.href.split("#").shift().split("?").shift());if(!$("#fb-root").length)
$("body").append('<div id="fb-root"></div>');if(!$("script#facebook-jssdk").length){var fbAppId=$("meta[property='fb:app_id']").attr("content")||!1;(function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(d.getElementById(id))return;js=d.createElement(s);js.id=id;js.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+(fbAppId?"&appId="+fbAppId:"");fjs.parentNode.insertBefore(js,fjs)}(document,'script','facebook-jssdk'))}
if(typeof FB!=="undefined"&&typeof FB.XFBML!=="undefined")
FB.XFBML.parse()});

/* Quatro Digital - Smart Photo Carousel // 1.0 // Carlos Vinicius // Todos os direitos reservados */

/*FUNÇÕES AUXILIARES*/

(function(t){function h(d,c,b){b=b[0];try{var e=d.find(c.imageWrapper);e.length||(e=a("<div></div>").appendTo(d));e.empty().attr("class",c.imageWrapper.slice(1));var f=d.find(c.thumbsWrapper);f.length||(f=a("<div></div>").appendTo(d));f.empty().attr("class",c.thumbsWrapper.slice(1));d=[];var k;for(k=0;k<b.Images.length;k++)d.push(b.Images[k][0]);var g;for(g=0;g<d.length;g++){var l=d[g].Path;var h=a("<img>",{"data-lazy":l.replace(m,"$1"+c.sizes.image)}).appendTo(e);h.wrap("<div></div>").wrap(a("<a></a>",
{href:l.replace(m,"$1"+c.sizes.imagezoom),"class":"jqzoom"}));a("<img>",{src:l.replace(m,"$1"+c.sizes.thumb)}).appendTo(f).wrap("<div></div>");d[g].IsMain&&(c.slickOptions.images.initialSlide=g)}}catch(n){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Problemas :( . Detalhes: ",n)}try{c.slickOptions.images.asNavFor=f,a(e).slick(c.slickOptions.images),c.slickOptions.thumbs.asNavFor=e,a(f).slick(c.slickOptions.thumbs),a(".jqzoom").jqzoom(c.zoomOptions),a(f).on("afterChange",
function(){a(e).slick("slickGoTo",a(this).slick("slickCurrentSlide"))})}catch(n){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Problemas :( . Detalhes: ",n)}}function p(d){return a.qdAjax({url:"/produto/sku/"+d,dataType:"json",error:function(){alert("erro ao buscar objeto SKU")}})}var a=jQuery;if("function"!==typeof a.fn.QD_smartPhotoCarousel){var m=/(ids\/[0-9]+-)[0-9-]+/i,q={imageWrapper:".qd-spc-image",thumbsWrapper:".qd-spc-thumbs",sizes:{thumb:"150-150",image:"500-500",
imagezoom:"1000-1000"},slickOptions:{images:{lazyLoad:"ondemand",infinite:!1,arrows:!1},thumbs:{slidesToShow:3,slidesToScroll:1,arrows:!1,focusOnSelect:!0}},zoomOptions:{}},r=function(d,c,b){if(!b&&(b=skuJson.skus[0].sku,skuJson.avaliable))for(var e=0;e<skuJson.skus.length;e++)if(skuJson.skus[e].avaliable){b=skuJson.skus[e].sku;break}p(b).done(function(a){h(d,c,a)});a(window).on("skuChanged.vtex",function(a,e,b){p(b.sku).done(function(a){h(d,c,a)})})};a.fn.QD_smartPhotoCarousel=function(d,c){var b=
a(this);if(!b.length)return b;b.each(function(){var b=a(this);b.QD_smartPhotoCarousel=new r(b,a.extend(!0,{},q,d),c)});return b};a(function(){a(".qd_auto_smart_photo_carousel").QD_smartPhotoCarousel()})}})(this);

