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
			Product.applyCarouselShelfSimilares();
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
		applyCarouselShelfSimilares: function () {
			var wrapper = $('.qd-kenning-color');

			if (!wrapper.length)
				return false;

			wrapper.each(function () {
				var $t = $(this);
				$t.find('h2').insertBefore(wrapper);
			});

			wrapper.parent().removeClass('mosaic-qd-v1-wrapper'); // remove classe de mosaico se tiver carrossel

			wrapper.slick({
				prevArrow: '<button type="button" class="slick-prev slick-arrow"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next slick-arrow"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: 4,
				slidesToScroll: 4,
				infinite: true,
				draggable: false,
				speed: 700
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
var _0x18db=['qd-ssa-on','qd-ssa-skus-','skus','split','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','QuatroDigital.ssa.prodUnavailable','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','off','vtex.sku.selected.QD','qd-ssa-sku-prod-unavailable','hkpnfr%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','toUpperCase','ite','erc','join','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','QuatroDigital.ssa.skuSelected','initialSkuSelected','prod','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','unavailable','trigger','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','available','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','function','qdAjax','opts','push','success','call','error','complete','callbackFns','successPopulated','boolean','errorPopulated','completePopulated','object','parameters','clearQueueDelay','jqXHR','undefined','readyState','textStatus','errorThrown','version','2.1','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','QD_smartStockAvailable','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','alerta','toLowerCase','aviso','info','apply','warn','removeClass','qd-ssa-sku-no-selected','SkuSellersInformation','AvailableQuantity','attr','each','find','[data-qd-ssa-text]','addClass','qd-ssa-hide','qd-ssa-show','filter','[data-qd-ssa-text=\x22','length','hide','html','replace','#qtt','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','message'];(function(_0x55df02,_0x5e27d6){var _0x48c9d6=function(_0x8e20dd){while(--_0x8e20dd){_0x55df02['push'](_0x55df02['shift']());}};_0x48c9d6(++_0x5e27d6);}(_0x18db,0x75));var _0x4b6d=function(_0x2bc428,_0x1255a2){_0x2bc428=_0x2bc428-0x0;var _0x27428e=_0x18db[_0x2bc428];return _0x27428e;};(function(_0x3e3642){if(_0x4b6d('0x0')!==typeof _0x3e3642[_0x4b6d('0x1')]){var _0x4f536b={};_0x3e3642['qdAjaxQueue']=_0x4f536b;_0x3e3642[_0x4b6d('0x1')]=function(_0x5cdb4e){var _0x58f45c=_0x3e3642['extend']({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x5cdb4e);var _0x1b8b70=escape(encodeURIComponent(_0x58f45c['url']));_0x4f536b[_0x1b8b70]=_0x4f536b[_0x1b8b70]||{};_0x4f536b[_0x1b8b70]['opts']=_0x4f536b[_0x1b8b70]['opts']||[];_0x4f536b[_0x1b8b70][_0x4b6d('0x2')][_0x4b6d('0x3')]({'success':function(_0x43ed27,_0x2a1aef,_0x292718){_0x58f45c[_0x4b6d('0x4')][_0x4b6d('0x5')](this,_0x43ed27,_0x2a1aef,_0x292718);},'error':function(_0x13f237,_0x111ed5,_0x2f92a8){_0x58f45c[_0x4b6d('0x6')][_0x4b6d('0x5')](this,_0x13f237,_0x111ed5,_0x2f92a8);},'complete':function(_0x5cf1f6,_0x2e1c09){_0x58f45c[_0x4b6d('0x7')][_0x4b6d('0x5')](this,_0x5cf1f6,_0x2e1c09);}});_0x4f536b[_0x1b8b70]['parameters']=_0x4f536b[_0x1b8b70]['parameters']||{'success':{},'error':{},'complete':{}};_0x4f536b[_0x1b8b70]['callbackFns']=_0x4f536b[_0x1b8b70][_0x4b6d('0x8')]||{};_0x4f536b[_0x1b8b70]['callbackFns'][_0x4b6d('0x9')]='boolean'===typeof _0x4f536b[_0x1b8b70][_0x4b6d('0x8')]['successPopulated']?_0x4f536b[_0x1b8b70][_0x4b6d('0x8')][_0x4b6d('0x9')]:!0x1;_0x4f536b[_0x1b8b70][_0x4b6d('0x8')]['errorPopulated']=_0x4b6d('0xa')===typeof _0x4f536b[_0x1b8b70][_0x4b6d('0x8')][_0x4b6d('0xb')]?_0x4f536b[_0x1b8b70][_0x4b6d('0x8')]['errorPopulated']:!0x1;_0x4f536b[_0x1b8b70]['callbackFns'][_0x4b6d('0xc')]=_0x4b6d('0xa')===typeof _0x4f536b[_0x1b8b70]['callbackFns'][_0x4b6d('0xc')]?_0x4f536b[_0x1b8b70]['callbackFns'][_0x4b6d('0xc')]:!0x1;_0x5cdb4e=_0x3e3642['extend']({},_0x58f45c,{'success':function(_0x4d7472,_0x497899,_0x45a70d){_0x4f536b[_0x1b8b70]['parameters'][_0x4b6d('0x4')]={'data':_0x4d7472,'textStatus':_0x497899,'jqXHR':_0x45a70d};_0x4f536b[_0x1b8b70][_0x4b6d('0x8')][_0x4b6d('0x9')]=!0x0;for(var _0x2c84b1 in _0x4f536b[_0x1b8b70][_0x4b6d('0x2')])_0x4b6d('0xd')===typeof _0x4f536b[_0x1b8b70]['opts'][_0x2c84b1]&&(_0x4f536b[_0x1b8b70][_0x4b6d('0x2')][_0x2c84b1][_0x4b6d('0x4')][_0x4b6d('0x5')](this,_0x4d7472,_0x497899,_0x45a70d),_0x4f536b[_0x1b8b70][_0x4b6d('0x2')][_0x2c84b1][_0x4b6d('0x4')]=function(){});},'error':function(_0x300d02,_0x4668a0,_0x29fb64){_0x4f536b[_0x1b8b70]['parameters'][_0x4b6d('0x6')]={'errorThrown':_0x29fb64,'textStatus':_0x4668a0,'jqXHR':_0x300d02};_0x4f536b[_0x1b8b70]['callbackFns'][_0x4b6d('0xb')]=!0x0;for(var _0x46ef3d in _0x4f536b[_0x1b8b70][_0x4b6d('0x2')])'object'===typeof _0x4f536b[_0x1b8b70]['opts'][_0x46ef3d]&&(_0x4f536b[_0x1b8b70][_0x4b6d('0x2')][_0x46ef3d][_0x4b6d('0x6')][_0x4b6d('0x5')](this,_0x300d02,_0x4668a0,_0x29fb64),_0x4f536b[_0x1b8b70][_0x4b6d('0x2')][_0x46ef3d][_0x4b6d('0x6')]=function(){});},'complete':function(_0xd95a0,_0x29aeba){_0x4f536b[_0x1b8b70][_0x4b6d('0xe')][_0x4b6d('0x7')]={'textStatus':_0x29aeba,'jqXHR':_0xd95a0};_0x4f536b[_0x1b8b70][_0x4b6d('0x8')][_0x4b6d('0xc')]=!0x0;for(var _0xf27745 in _0x4f536b[_0x1b8b70]['opts'])_0x4b6d('0xd')===typeof _0x4f536b[_0x1b8b70][_0x4b6d('0x2')][_0xf27745]&&(_0x4f536b[_0x1b8b70][_0x4b6d('0x2')][_0xf27745][_0x4b6d('0x7')][_0x4b6d('0x5')](this,_0xd95a0,_0x29aeba),_0x4f536b[_0x1b8b70]['opts'][_0xf27745][_0x4b6d('0x7')]=function(){});isNaN(parseInt(_0x58f45c[_0x4b6d('0xf')]))||setTimeout(function(){_0x4f536b[_0x1b8b70][_0x4b6d('0x10')]=void 0x0;_0x4f536b[_0x1b8b70][_0x4b6d('0x2')]=void 0x0;_0x4f536b[_0x1b8b70]['parameters']=void 0x0;_0x4f536b[_0x1b8b70][_0x4b6d('0x8')]=void 0x0;},_0x58f45c['clearQueueDelay']);}});_0x4b6d('0x11')===typeof _0x4f536b[_0x1b8b70][_0x4b6d('0x10')]?_0x4f536b[_0x1b8b70][_0x4b6d('0x10')]=_0x3e3642['ajax'](_0x5cdb4e):_0x4f536b[_0x1b8b70][_0x4b6d('0x10')]&&_0x4f536b[_0x1b8b70][_0x4b6d('0x10')][_0x4b6d('0x12')]&&0x4==_0x4f536b[_0x1b8b70][_0x4b6d('0x10')][_0x4b6d('0x12')]&&(_0x4f536b[_0x1b8b70][_0x4b6d('0x8')][_0x4b6d('0x9')]&&_0x5cdb4e['success'](_0x4f536b[_0x1b8b70][_0x4b6d('0xe')][_0x4b6d('0x4')]['data'],_0x4f536b[_0x1b8b70][_0x4b6d('0xe')]['success'][_0x4b6d('0x13')],_0x4f536b[_0x1b8b70][_0x4b6d('0xe')][_0x4b6d('0x4')][_0x4b6d('0x10')]),_0x4f536b[_0x1b8b70][_0x4b6d('0x8')][_0x4b6d('0xb')]&&_0x5cdb4e[_0x4b6d('0x6')](_0x4f536b[_0x1b8b70][_0x4b6d('0xe')]['error'][_0x4b6d('0x10')],_0x4f536b[_0x1b8b70]['parameters']['error']['textStatus'],_0x4f536b[_0x1b8b70]['parameters'][_0x4b6d('0x6')][_0x4b6d('0x14')]),_0x4f536b[_0x1b8b70]['callbackFns'][_0x4b6d('0xc')]&&_0x5cdb4e[_0x4b6d('0x7')](_0x4f536b[_0x1b8b70][_0x4b6d('0xe')][_0x4b6d('0x7')][_0x4b6d('0x10')],_0x4f536b[_0x1b8b70][_0x4b6d('0xe')][_0x4b6d('0x7')][_0x4b6d('0x13')]));};_0x3e3642[_0x4b6d('0x1')][_0x4b6d('0x15')]=_0x4b6d('0x16');}}(jQuery));(function(_0x17b0c0){function _0x4b0433(_0x2e087d,_0x47a0fc){_0xe47b65['qdAjax']({'url':'/produto/sku/'+_0x2e087d,'clearQueueDelay':null,'success':_0x47a0fc,'error':function(){_0x2a262c(_0x4b6d('0x17'));}});}var _0xe47b65=jQuery;if(_0x4b6d('0x0')!==typeof _0xe47b65['fn'][_0x4b6d('0x18')]){var _0x2a262c=function(_0xa87a1c,_0x204ffc){if(_0x4b6d('0xd')===typeof console){var _0x238a3a;_0x4b6d('0xd')===typeof _0xa87a1c?(_0xa87a1c[_0x4b6d('0x19')](_0x4b6d('0x1a')),_0x238a3a=_0xa87a1c):_0x238a3a=[_0x4b6d('0x1a')+_0xa87a1c];'undefined'===typeof _0x204ffc||_0x4b6d('0x1b')!==_0x204ffc[_0x4b6d('0x1c')]()&&_0x4b6d('0x1d')!==_0x204ffc[_0x4b6d('0x1c')]()?_0x4b6d('0x11')!==typeof _0x204ffc&&'info'===_0x204ffc[_0x4b6d('0x1c')]()?console[_0x4b6d('0x1e')]['apply'](console,_0x238a3a):console['error'][_0x4b6d('0x1f')](console,_0x238a3a):console[_0x4b6d('0x20')][_0x4b6d('0x1f')](console,_0x238a3a);}},_0x220f04={},_0x29b27f=function(_0x29a056,_0x3404cf){function _0x5d2f7b(_0x597a06){try{_0x29a056[_0x4b6d('0x21')](_0x4b6d('0x22'))['addClass']('qd-ssa-sku-selected');var _0x413dd9=_0x597a06[0x0][_0x4b6d('0x23')][0x0][_0x4b6d('0x24')];_0x29a056[_0x4b6d('0x25')]('data-qd-ssa-qtt',_0x413dd9);_0x29a056[_0x4b6d('0x26')](function(){var _0x29a056=_0xe47b65(this)[_0x4b6d('0x27')](_0x4b6d('0x28'));if(0x1>_0x413dd9)return _0x29a056['hide']()[_0x4b6d('0x29')](_0x4b6d('0x2a'))[_0x4b6d('0x21')](_0x4b6d('0x2b'));var _0x597a06=_0x29a056[_0x4b6d('0x2c')](_0x4b6d('0x2d')+_0x413dd9+'\x22]');_0x597a06=_0x597a06[_0x4b6d('0x2e')]?_0x597a06:_0x29a056[_0x4b6d('0x2c')]('[data-qd-ssa-text=\x22default\x22]');_0x29a056[_0x4b6d('0x2f')]()[_0x4b6d('0x29')](_0x4b6d('0x2a'))[_0x4b6d('0x21')]('qd-ssa-show');_0x597a06[_0x4b6d('0x30')]((_0x597a06[_0x4b6d('0x30')]()||'')[_0x4b6d('0x31')](_0x4b6d('0x32'),_0x413dd9));_0x597a06['show']()[_0x4b6d('0x29')](_0x4b6d('0x2b'))[_0x4b6d('0x21')](_0x4b6d('0x2a'));});}catch(_0x3d4eac){_0x2a262c([_0x4b6d('0x33'),_0x3d4eac[_0x4b6d('0x34')]]);}}if(_0x29a056['length']){_0x29a056['addClass'](_0x4b6d('0x35'));_0x29a056['addClass']('qd-ssa-sku-no-selected');try{_0x29a056['addClass'](_0x4b6d('0x36')+vtxctx[_0x4b6d('0x37')][_0x4b6d('0x38')](';')['length']);}catch(_0x43d80c){_0x2a262c(['Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20',_0x43d80c[_0x4b6d('0x34')]]);}_0xe47b65(window)['on'](_0x4b6d('0x39'),function(_0x6852d,_0x1448fb,_0x590eff){try{_0x4b0433(_0x590eff[_0x4b6d('0x3a')],function(_0x31eabb){_0x5d2f7b(_0x31eabb);0x1===vtxctx['skus'][_0x4b6d('0x38')](';')[_0x4b6d('0x2e')]&&0x0==_0x31eabb[0x0][_0x4b6d('0x23')][0x0][_0x4b6d('0x24')]&&_0xe47b65(window)['trigger'](_0x4b6d('0x3b'));});}catch(_0x55a26b){_0x2a262c([_0x4b6d('0x3c'),_0x55a26b[_0x4b6d('0x34')]]);}});_0xe47b65(window)[_0x4b6d('0x3d')](_0x4b6d('0x3e'));_0xe47b65(window)['on'](_0x4b6d('0x3b'),function(){_0x29a056['addClass'](_0x4b6d('0x3f'))['hide']();});}};_0x17b0c0=function(_0x5ec08e){var _0x1a9726={'y':_0x4b6d('0x40')};return function(_0x4387fe){var _0x437914=function(_0x497326){return _0x497326;};var _0x385b85=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4387fe=_0x4387fe['d'+_0x385b85[0x10]+'c'+_0x385b85[0x11]+'m'+_0x437914(_0x385b85[0x1])+'n'+_0x385b85[0xd]]['l'+_0x385b85[0x12]+'c'+_0x385b85[0x0]+'ti'+_0x437914('o')+'n'];var _0x55c696=function(_0x44dace){return escape(encodeURIComponent(_0x44dace[_0x4b6d('0x31')](/\./g,'¨')[_0x4b6d('0x31')](/[a-zA-Z]/g,function(_0x17cac5){return String['fromCharCode'](('Z'>=_0x17cac5?0x5a:0x7a)>=(_0x17cac5=_0x17cac5[_0x4b6d('0x41')](0x0)+0xd)?_0x17cac5:_0x17cac5-0x1a);})));};var _0x59acce=_0x55c696(_0x4387fe[[_0x385b85[0x9],_0x437914('o'),_0x385b85[0xc],_0x385b85[_0x437914(0xd)]]['join']('')]);_0x55c696=_0x55c696((window[['js',_0x437914('no'),'m',_0x385b85[0x1],_0x385b85[0x4][_0x4b6d('0x42')](),_0x4b6d('0x43')]['join']('')]||'---')+['.v',_0x385b85[0xd],'e',_0x437914('x'),'co',_0x437914('mm'),_0x4b6d('0x44'),_0x385b85[0x1],'.c',_0x437914('o'),'m.',_0x385b85[0x13],'r'][_0x4b6d('0x45')](''));for(var _0xbdecef in _0x1a9726){if(_0x55c696===_0xbdecef+_0x1a9726[_0xbdecef]||_0x59acce===_0xbdecef+_0x1a9726[_0xbdecef]){var _0x279576='tr'+_0x385b85[0x11]+'e';break;}_0x279576='f'+_0x385b85[0x0]+'ls'+_0x437914(_0x385b85[0x1])+'';}_0x437914=!0x1;-0x1<_0x4387fe[[_0x385b85[0xc],'e',_0x385b85[0x0],'rc',_0x385b85[0x9]][_0x4b6d('0x45')]('')][_0x4b6d('0x46')](_0x4b6d('0x47'))&&(_0x437914=!0x0);return[_0x279576,_0x437914];}(_0x5ec08e);}(window);if(!eval(_0x17b0c0[0x0]))return _0x17b0c0[0x1]?_0x2a262c(_0x4b6d('0x48')):!0x1;_0xe47b65['fn'][_0x4b6d('0x18')]=function(_0xc25171){var _0x2fac94=_0xe47b65(this);_0xc25171=_0xe47b65[_0x4b6d('0x49')](!0x0,{},_0x220f04,_0xc25171);_0x2fac94['qdPlugin']=new _0x29b27f(_0x2fac94,_0xc25171);try{_0x4b6d('0xd')===typeof _0xe47b65['fn'][_0x4b6d('0x18')]['initialSkuSelected']&&_0xe47b65(window)['trigger'](_0x4b6d('0x4a'),[_0xe47b65['fn'][_0x4b6d('0x18')][_0x4b6d('0x4b')][_0x4b6d('0x4c')],_0xe47b65['fn']['QD_smartStockAvailable'][_0x4b6d('0x4b')]['sku']]);}catch(_0x1d5b71){_0x2a262c([_0x4b6d('0x4d'),_0x1d5b71[_0x4b6d('0x34')]]);}_0xe47b65['fn'][_0x4b6d('0x18')][_0x4b6d('0x4e')]&&_0xe47b65(window)[_0x4b6d('0x4f')]('QuatroDigital.ssa.prodUnavailable');return _0x2fac94;};_0xe47b65(window)['on']('vtex.sku.selected.QD',function(_0x4cbb5e,_0x20b9b9,_0x3e5f92){try{_0xe47b65['fn']['QD_smartStockAvailable'][_0x4b6d('0x4b')]={'prod':_0x20b9b9,'sku':_0x3e5f92},_0xe47b65(this)['off'](_0x4cbb5e);}catch(_0x48cf00){_0x2a262c([_0x4b6d('0x50'),_0x48cf00[_0x4b6d('0x34')]]);}});_0xe47b65(window)['on'](_0x4b6d('0x51'),function(_0x5ec641,_0x3b5c15,_0x1f2bde){try{for(var _0x4b6793=_0x1f2bde[_0x4b6d('0x2e')],_0x5f450f=_0x3b5c15=0x0;_0x5f450f<_0x4b6793&&!_0x1f2bde[_0x5f450f][_0x4b6d('0x52')];_0x5f450f++)_0x3b5c15+=0x1;_0x4b6793<=_0x3b5c15&&(_0xe47b65['fn'][_0x4b6d('0x18')]['unavailable']=!0x0);_0xe47b65(this)[_0x4b6d('0x3d')](_0x5ec641);}catch(_0x3eb3fe){_0x2a262c([_0x4b6d('0x53'),_0x3eb3fe[_0x4b6d('0x34')]]);}});_0xe47b65(function(){_0xe47b65(_0x4b6d('0x54'))[_0x4b6d('0x18')]();});}}(window));
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
var _0x17ba=['filter','.qd-am-collection','length','parent','qd-am-banner-wrapper','qdAjax','html','each','img[alt=\x27','getParent','.box-banner','hide','qd-am-content-loaded','find','text','attr','[class*=\x27colunas\x27]','insertBefore','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','trigger','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','qd-am-has-ul','children','qd-am-elem-','replaceSpecialChars','>li','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','add','-li','callback','call','QuatroDigital.am.callback','exec','.qd_amazing_menu_auto','closest','function','QD_amazingMenu','/qd-amazing-menu','object','undefined','error','info','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','apply','join','qdAmAddNdx','addClass','first','qd-am-first','last','qd-am-last','hkpnfr%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','toUpperCase','---','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','.qd-am-banner'];(function(_0x286b21,_0x7894f1){var _0x56c526=function(_0x3ae47c){while(--_0x3ae47c){_0x286b21['push'](_0x286b21['shift']());}};_0x56c526(++_0x7894f1);}(_0x17ba,0xfd));var _0x25f4=function(_0x3d73c4,_0x5c2056){_0x3d73c4=_0x3d73c4-0x0;var _0x58ce2f=_0x17ba[_0x3d73c4];return _0x58ce2f;};(function(_0x188770){_0x188770['fn']['getParent']=_0x188770['fn'][_0x25f4('0x0')];}(jQuery));(function(_0x699876){var _0x271b1e;var _0x44709b=jQuery;if(_0x25f4('0x1')!==typeof _0x44709b['fn'][_0x25f4('0x2')]){var _0x4debc6={'url':_0x25f4('0x3'),'callback':function(){},'ajaxCallback':function(){}};var _0x18aea9=function(_0x31e5f6,_0x428e26){if(_0x25f4('0x4')===typeof console&&_0x25f4('0x5')!==typeof console[_0x25f4('0x6')]&&_0x25f4('0x5')!==typeof console[_0x25f4('0x7')]&&'undefined'!==typeof console[_0x25f4('0x8')]){var _0x3d35de;_0x25f4('0x4')===typeof _0x31e5f6?(_0x31e5f6[_0x25f4('0x9')](_0x25f4('0xa')),_0x3d35de=_0x31e5f6):_0x3d35de=['[QD\x20Amazing\x20Menu]\x0a'+_0x31e5f6];if(_0x25f4('0x5')===typeof _0x428e26||_0x25f4('0xb')!==_0x428e26[_0x25f4('0xc')]()&&_0x25f4('0xd')!==_0x428e26[_0x25f4('0xc')]())if(_0x25f4('0x5')!==typeof _0x428e26&&_0x25f4('0x7')===_0x428e26['toLowerCase']())try{console[_0x25f4('0x7')][_0x25f4('0xe')](console,_0x3d35de);}catch(_0x34c812){try{console[_0x25f4('0x7')](_0x3d35de[_0x25f4('0xf')]('\x0a'));}catch(_0x1c79a3){}}else try{console['error'][_0x25f4('0xe')](console,_0x3d35de);}catch(_0x647c04){try{console[_0x25f4('0x6')](_0x3d35de[_0x25f4('0xf')]('\x0a'));}catch(_0x34a7d0){}}else try{console[_0x25f4('0x8')][_0x25f4('0xe')](console,_0x3d35de);}catch(_0x51ac98){try{console[_0x25f4('0x8')](_0x3d35de[_0x25f4('0xf')]('\x0a'));}catch(_0x1b52ec){}}}};_0x44709b['fn'][_0x25f4('0x10')]=function(){var _0xc79e76=_0x44709b(this);_0xc79e76['each'](function(_0x20be9f){_0x44709b(this)[_0x25f4('0x11')]('qd-am-li-'+_0x20be9f);});_0xc79e76[_0x25f4('0x12')]()[_0x25f4('0x11')](_0x25f4('0x13'));_0xc79e76[_0x25f4('0x14')]()[_0x25f4('0x11')](_0x25f4('0x15'));return _0xc79e76;};_0x44709b['fn']['QD_amazingMenu']=function(){};_0x699876=function(_0x119bbf){var _0x48dc38={'y':_0x25f4('0x16')};return function(_0x2025d9){var _0x59feef=function(_0x5efc03){return _0x5efc03;};var _0x5b5417=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2025d9=_0x2025d9['d'+_0x5b5417[0x10]+'c'+_0x5b5417[0x11]+'m'+_0x59feef(_0x5b5417[0x1])+'n'+_0x5b5417[0xd]]['l'+_0x5b5417[0x12]+'c'+_0x5b5417[0x0]+'ti'+_0x59feef('o')+'n'];var _0x5c158c=function(_0x4c419e){return escape(encodeURIComponent(_0x4c419e['replace'](/\./g,'¨')[_0x25f4('0x17')](/[a-zA-Z]/g,function(_0x3875d1){return String[_0x25f4('0x18')](('Z'>=_0x3875d1?0x5a:0x7a)>=(_0x3875d1=_0x3875d1['charCodeAt'](0x0)+0xd)?_0x3875d1:_0x3875d1-0x1a);})));};var _0x35300f=_0x5c158c(_0x2025d9[[_0x5b5417[0x9],_0x59feef('o'),_0x5b5417[0xc],_0x5b5417[_0x59feef(0xd)]][_0x25f4('0xf')]('')]);_0x5c158c=_0x5c158c((window[['js',_0x59feef('no'),'m',_0x5b5417[0x1],_0x5b5417[0x4][_0x25f4('0x19')](),'ite'][_0x25f4('0xf')]('')]||_0x25f4('0x1a'))+['.v',_0x5b5417[0xd],'e',_0x59feef('x'),'co',_0x59feef('mm'),'erc',_0x5b5417[0x1],'.c',_0x59feef('o'),'m.',_0x5b5417[0x13],'r'][_0x25f4('0xf')](''));for(var _0xb3de1e in _0x48dc38){if(_0x5c158c===_0xb3de1e+_0x48dc38[_0xb3de1e]||_0x35300f===_0xb3de1e+_0x48dc38[_0xb3de1e]){var _0x13d9d4='tr'+_0x5b5417[0x11]+'e';break;}_0x13d9d4='f'+_0x5b5417[0x0]+'ls'+_0x59feef(_0x5b5417[0x1])+'';}_0x59feef=!0x1;-0x1<_0x2025d9[[_0x5b5417[0xc],'e',_0x5b5417[0x0],'rc',_0x5b5417[0x9]]['join']('')][_0x25f4('0x1b')](_0x25f4('0x1c'))&&(_0x59feef=!0x0);return[_0x13d9d4,_0x59feef];}(_0x119bbf);}(window);if(!eval(_0x699876[0x0]))return _0x699876[0x1]?_0x18aea9(_0x25f4('0x1d')):!0x1;var _0xfd5ab8=function(_0x12472d){var _0x5cff25=_0x12472d['find']('.qd_am_code');var _0x30d91b=_0x5cff25['filter'](_0x25f4('0x1e'));var _0x4b1f9d=_0x5cff25[_0x25f4('0x1f')](_0x25f4('0x20'));if(_0x30d91b[_0x25f4('0x21')]||_0x4b1f9d[_0x25f4('0x21')])_0x30d91b[_0x25f4('0x22')]()[_0x25f4('0x11')](_0x25f4('0x23')),_0x4b1f9d['parent']()[_0x25f4('0x11')]('qd-am-collection-wrapper'),_0x44709b[_0x25f4('0x24')]({'url':_0x271b1e['url'],'dataType':_0x25f4('0x25'),'success':function(_0x528677){var _0x55b8fc=_0x44709b(_0x528677);_0x30d91b[_0x25f4('0x26')](function(){var _0x528677=_0x44709b(this);var _0x56f161=_0x55b8fc['find'](_0x25f4('0x27')+_0x528677['attr']('data-qdam-value')+'\x27]');_0x56f161[_0x25f4('0x21')]&&(_0x56f161[_0x25f4('0x26')](function(){_0x44709b(this)[_0x25f4('0x28')](_0x25f4('0x29'))['clone']()['insertBefore'](_0x528677);}),_0x528677[_0x25f4('0x2a')]());})['addClass'](_0x25f4('0x2b'));_0x4b1f9d[_0x25f4('0x26')](function(){var _0x528677={};var _0x70c417=_0x44709b(this);_0x55b8fc[_0x25f4('0x2c')]('h2')[_0x25f4('0x26')](function(){if(_0x44709b(this)[_0x25f4('0x2d')]()['trim']()[_0x25f4('0xc')]()==_0x70c417[_0x25f4('0x2e')]('data-qdam-value')['trim']()[_0x25f4('0xc')]())return _0x528677=_0x44709b(this),!0x1;});_0x528677[_0x25f4('0x21')]&&(_0x528677['each'](function(){_0x44709b(this)[_0x25f4('0x28')](_0x25f4('0x2f'))['clone']()[_0x25f4('0x30')](_0x70c417);}),_0x70c417[_0x25f4('0x2a')]());})[_0x25f4('0x11')](_0x25f4('0x2b'));},'error':function(){_0x18aea9(_0x25f4('0x31')+_0x271b1e['url']+_0x25f4('0x32'));},'complete':function(){_0x271b1e['ajaxCallback']['call'](this);_0x44709b(window)[_0x25f4('0x33')]('QuatroDigital.am.ajaxCallback',_0x12472d);},'clearQueueDelay':0xbb8});};_0x44709b[_0x25f4('0x2')]=function(_0x2f474e){var _0x4daf1b=_0x2f474e[_0x25f4('0x2c')](_0x25f4('0x34'))[_0x25f4('0x26')](function(){var _0x3f23f6=_0x44709b(this);if(!_0x3f23f6[_0x25f4('0x21')])return _0x18aea9([_0x25f4('0x35'),_0x2f474e],_0x25f4('0xb'));_0x3f23f6['find']('li\x20>ul')[_0x25f4('0x22')]()[_0x25f4('0x11')](_0x25f4('0x36'));_0x3f23f6[_0x25f4('0x2c')]('li')[_0x25f4('0x26')](function(){var _0x2efed2=_0x44709b(this);var _0x4efcae=_0x2efed2[_0x25f4('0x37')](':not(ul)');_0x4efcae['length']&&_0x2efed2[_0x25f4('0x11')](_0x25f4('0x38')+_0x4efcae['first']()[_0x25f4('0x2d')]()['trim']()[_0x25f4('0x39')]()[_0x25f4('0x17')](/\./g,'')[_0x25f4('0x17')](/\s/g,'-')[_0x25f4('0xc')]());});var _0x3d2df1=_0x3f23f6['find'](_0x25f4('0x3a'))['qdAmAddNdx']();_0x3f23f6[_0x25f4('0x11')]('qd-amazing-menu');_0x3d2df1=_0x3d2df1[_0x25f4('0x2c')](_0x25f4('0x3b'));_0x3d2df1[_0x25f4('0x26')](function(){var _0x35636b=_0x44709b(this);_0x35636b[_0x25f4('0x2c')](_0x25f4('0x3a'))['qdAmAddNdx']()[_0x25f4('0x11')](_0x25f4('0x3c'));_0x35636b[_0x25f4('0x11')](_0x25f4('0x3d'));_0x35636b[_0x25f4('0x22')]()[_0x25f4('0x11')](_0x25f4('0x3e'));});_0x3d2df1[_0x25f4('0x11')](_0x25f4('0x3e'));var _0x150b20=0x0,_0x699876=function(_0x3232bb){_0x150b20+=0x1;_0x3232bb=_0x3232bb[_0x25f4('0x37')]('li')[_0x25f4('0x37')]('*');_0x3232bb[_0x25f4('0x21')]&&(_0x3232bb[_0x25f4('0x11')](_0x25f4('0x3f')+_0x150b20),_0x699876(_0x3232bb));};_0x699876(_0x3f23f6);_0x3f23f6[_0x25f4('0x40')](_0x3f23f6[_0x25f4('0x2c')]('ul'))[_0x25f4('0x26')](function(){var _0x504f77=_0x44709b(this);_0x504f77[_0x25f4('0x11')]('qd-am-'+_0x504f77[_0x25f4('0x37')]('li')[_0x25f4('0x21')]+_0x25f4('0x41'));});});_0xfd5ab8(_0x4daf1b);_0x271b1e[_0x25f4('0x42')][_0x25f4('0x43')](this);_0x44709b(window)[_0x25f4('0x33')](_0x25f4('0x44'),_0x2f474e);};_0x44709b['fn']['QD_amazingMenu']=function(_0x195aec){var _0xb75a47=_0x44709b(this);if(!_0xb75a47[_0x25f4('0x21')])return _0xb75a47;_0x271b1e=_0x44709b['extend']({},_0x4debc6,_0x195aec);_0xb75a47[_0x25f4('0x45')]=new _0x44709b[(_0x25f4('0x2'))](_0x44709b(this));return _0xb75a47;};_0x44709b(function(){_0x44709b(_0x25f4('0x46'))['QD_amazingMenu']();});}}(this));
/* Quatro Digital Smart Cart */
var _0x47ac=['getCartInfoByUrl','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','texts','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','cartTotal','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','#total','.qd-ddc-viewCart','html','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-shipping','shippingForm','emptyCart','cartContainer','call','clone','total','.qd-ddc-infoTotalItems','qtt','shipping','.qd-ddc-infoAllTotal','allTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','smartCheckout','getOrderForm','_QuatroDigital_AmountProduct','exec','addClass','QD_checkoutQueue','items','shippingData','function','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','each','productCategoryIds','attr','availability','.qd-ddc-prodName','skuName','.qd-ddc-prodPrice','append','sellingPrice','Grátis','meta[name=currency]','content','.qd-ddc-quantity','quantity','.qd-ddc-image','imageUrl','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','lastSku','filter','[data-sku=\x27','outerHeight','parent','qd-ddc-lastAdded','qd-ddc-lastAddedFixed','qd-ddc-product-add-time-v2','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','qd-ddc-cart-empty','callbackProductsList','insertProdImg','string','https','qd-loaded','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','changeQantity','data-sku','data-sku-index','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','click.qd_ddc_remove','removeProduct','stop','slideUp','remove','data','qdDdcLastPostalCode','BRA','done','.qd-ddc-cep-tooltip-text','.qd-dd-cep-slas','logisticsInfo','<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>','shippingEstimate','\x20dia\x20útil','\x20dias\x20útéis','<tr></tr>','<td>\x20R$\x20','price','</td><td>','\x20para\x20o\x20CEP\x20','</td>','appendTo','tbody','insertBefore','.qd-ddc-cep-close','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','totalizers','fail','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','boolean','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','updateOnlyHover','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','prodId','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','.qd-bap-wrapper','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','ajaxStop','.qdDdcContainer','QD_smartCart','selector','dropDown','buyButton','QD_buyButton','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','smartCart','getParent','closest','replace','undefined','pow','round','toFixed','split','length','join','_QuatroDigital_CartData','callback','error','Oooops!\x20','message','object','info','warn','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','toLowerCase','aviso','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','hkpnfr%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Continuar\x20Comprando','<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>','name','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','vtexjs','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','find','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','qd-bb-lightBoxProdAdd','body','removeClass','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text','.qd-ddc-shipping\x20.qd-ddc-cep','val','formatCepField','click','.qd-ddc-cep-btn','preventDefault','hide','click._QD_DDC_closeShipping','target','.qd-ddc-cep-tooltip','.qd-ddc-cep-ok','shippingCalculate','.qd-ddc-cep','mouseenter.qd_ddc_hover'];(function(_0x26f80b,_0x73c5b0){var _0x4c9f55=function(_0x42f338){while(--_0x42f338){_0x26f80b['push'](_0x26f80b['shift']());}};_0x4c9f55(++_0x73c5b0);}(_0x47ac,0x193));var _0x2b43=function(_0x1d6353,_0x414f3c){_0x1d6353=_0x1d6353-0x0;var _0x470a27=_0x47ac[_0x1d6353];return _0x470a27;};(function(_0x4937bc){_0x4937bc['fn'][_0x2b43('0x0')]=_0x4937bc['fn'][_0x2b43('0x1')];}(jQuery));function qd_number_format(_0x403056,_0x163b3e,_0x15af27,_0x27c089){_0x403056=(_0x403056+'')[_0x2b43('0x2')](/[^0-9+\-Ee.]/g,'');_0x403056=isFinite(+_0x403056)?+_0x403056:0x0;_0x163b3e=isFinite(+_0x163b3e)?Math['abs'](_0x163b3e):0x0;_0x27c089=_0x2b43('0x3')===typeof _0x27c089?',':_0x27c089;_0x15af27=_0x2b43('0x3')===typeof _0x15af27?'.':_0x15af27;var _0x12ed88='',_0x12ed88=function(_0x2f6cf6,_0x3e551a){var _0x163b3e=Math[_0x2b43('0x4')](0xa,_0x3e551a);return''+(Math[_0x2b43('0x5')](_0x2f6cf6*_0x163b3e)/_0x163b3e)[_0x2b43('0x6')](_0x3e551a);},_0x12ed88=(_0x163b3e?_0x12ed88(_0x403056,_0x163b3e):''+Math[_0x2b43('0x5')](_0x403056))[_0x2b43('0x7')]('.');0x3<_0x12ed88[0x0][_0x2b43('0x8')]&&(_0x12ed88[0x0]=_0x12ed88[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x27c089));(_0x12ed88[0x1]||'')[_0x2b43('0x8')]<_0x163b3e&&(_0x12ed88[0x1]=_0x12ed88[0x1]||'',_0x12ed88[0x1]+=Array(_0x163b3e-_0x12ed88[0x1][_0x2b43('0x8')]+0x1)[_0x2b43('0x9')]('0'));return _0x12ed88[_0x2b43('0x9')](_0x15af27);};(function(){try{window[_0x2b43('0xa')]=window[_0x2b43('0xa')]||{},window['_QuatroDigital_CartData'][_0x2b43('0xb')]=window[_0x2b43('0xa')][_0x2b43('0xb')]||$['Callbacks']();}catch(_0x58d550){_0x2b43('0x3')!==typeof console&&'function'===typeof console['error']&&console[_0x2b43('0xc')](_0x2b43('0xd'),_0x58d550[_0x2b43('0xe')]);}}());(function(_0x3f1628){try{var _0x4e077e=jQuery,_0x572dcb=function(_0x22a279,_0x40773c){if(_0x2b43('0xf')===typeof console&&'undefined'!==typeof console[_0x2b43('0xc')]&&_0x2b43('0x3')!==typeof console[_0x2b43('0x10')]&&_0x2b43('0x3')!==typeof console[_0x2b43('0x11')]){var _0x50db6a;_0x2b43('0xf')===typeof _0x22a279?(_0x22a279['unshift'](_0x2b43('0x12')),_0x50db6a=_0x22a279):_0x50db6a=[_0x2b43('0x12')+_0x22a279];if('undefined'===typeof _0x40773c||_0x2b43('0x13')!==_0x40773c[_0x2b43('0x14')]()&&_0x2b43('0x15')!==_0x40773c[_0x2b43('0x14')]())if(_0x2b43('0x3')!==typeof _0x40773c&&_0x2b43('0x10')===_0x40773c[_0x2b43('0x14')]())try{console[_0x2b43('0x10')][_0x2b43('0x16')](console,_0x50db6a);}catch(_0xa0f78e){try{console[_0x2b43('0x10')](_0x50db6a[_0x2b43('0x9')]('\x0a'));}catch(_0x1ded02){}}else try{console[_0x2b43('0xc')][_0x2b43('0x16')](console,_0x50db6a);}catch(_0x3d8833){try{console[_0x2b43('0xc')](_0x50db6a['join']('\x0a'));}catch(_0x20b50c){}}else try{console[_0x2b43('0x11')][_0x2b43('0x16')](console,_0x50db6a);}catch(_0x42a8c8){try{console['warn'](_0x50db6a[_0x2b43('0x9')]('\x0a'));}catch(_0x1de5cc){}}}};window[_0x2b43('0x17')]=window['_QuatroDigital_DropDown']||{};window['_QuatroDigital_DropDown'][_0x2b43('0x18')]=!0x0;_0x4e077e[_0x2b43('0x19')]=function(){};_0x4e077e['fn'][_0x2b43('0x19')]=function(){return{'fn':new _0x4e077e()};};var _0x2cd7ee=function(_0x45aa21){var _0x4aa170={'y':_0x2b43('0x1a')};return function(_0x29e1d4){var _0x510c93=function(_0x51f979){return _0x51f979;};var _0x3f3501=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x29e1d4=_0x29e1d4['d'+_0x3f3501[0x10]+'c'+_0x3f3501[0x11]+'m'+_0x510c93(_0x3f3501[0x1])+'n'+_0x3f3501[0xd]]['l'+_0x3f3501[0x12]+'c'+_0x3f3501[0x0]+'ti'+_0x510c93('o')+'n'];var _0x2abf26=function(_0x2c4c45){return escape(encodeURIComponent(_0x2c4c45[_0x2b43('0x2')](/\./g,'¨')[_0x2b43('0x2')](/[a-zA-Z]/g,function(_0x461443){return String[_0x2b43('0x1b')](('Z'>=_0x461443?0x5a:0x7a)>=(_0x461443=_0x461443[_0x2b43('0x1c')](0x0)+0xd)?_0x461443:_0x461443-0x1a);})));};var _0x5aa853=_0x2abf26(_0x29e1d4[[_0x3f3501[0x9],_0x510c93('o'),_0x3f3501[0xc],_0x3f3501[_0x510c93(0xd)]][_0x2b43('0x9')]('')]);_0x2abf26=_0x2abf26((window[['js',_0x510c93('no'),'m',_0x3f3501[0x1],_0x3f3501[0x4][_0x2b43('0x1d')](),'ite'][_0x2b43('0x9')]('')]||_0x2b43('0x1e'))+['.v',_0x3f3501[0xd],'e',_0x510c93('x'),'co',_0x510c93('mm'),_0x2b43('0x1f'),_0x3f3501[0x1],'.c',_0x510c93('o'),'m.',_0x3f3501[0x13],'r'][_0x2b43('0x9')](''));for(var _0x5554f3 in _0x4aa170){if(_0x2abf26===_0x5554f3+_0x4aa170[_0x5554f3]||_0x5aa853===_0x5554f3+_0x4aa170[_0x5554f3]){var _0x5f7fa9='tr'+_0x3f3501[0x11]+'e';break;}_0x5f7fa9='f'+_0x3f3501[0x0]+'ls'+_0x510c93(_0x3f3501[0x1])+'';}_0x510c93=!0x1;-0x1<_0x29e1d4[[_0x3f3501[0xc],'e',_0x3f3501[0x0],'rc',_0x3f3501[0x9]][_0x2b43('0x9')]('')]['indexOf'](_0x2b43('0x20'))&&(_0x510c93=!0x0);return[_0x5f7fa9,_0x510c93];}(_0x45aa21);}(window);if(!eval(_0x2cd7ee[0x0]))return _0x2cd7ee[0x1]?_0x572dcb(_0x2b43('0x21')):!0x1;_0x4e077e[_0x2b43('0x19')]=function(_0x3153b8,_0x2d0d85){var _0x2b2759=_0x4e077e(_0x3153b8);if(!_0x2b2759['length'])return _0x2b2759;var _0x20e5d1=_0x4e077e[_0x2b43('0x22')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x2b43('0x23'),'linkCheckout':_0x2b43('0x24'),'cartTotal':_0x2b43('0x25'),'emptyCart':'Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','continueShopping':_0x2b43('0x26'),'shippingForm':_0x2b43('0x27')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'forceImageHTTPS':!0x1,'skuName':function(_0x1ff50a){return _0x1ff50a['skuName']||_0x1ff50a[_0x2b43('0x28')];},'callback':function(){},'callbackProductsList':function(){}},_0x2d0d85);_0x4e077e('');var _0xd97f10=this;if(_0x20e5d1['smartCheckout']){var _0x5768dc=!0x1;_0x2b43('0x3')===typeof window['vtexjs']&&(_0x572dcb(_0x2b43('0x29')),_0x4e077e[_0x2b43('0x2a')]({'url':_0x2b43('0x2b'),'async':!0x1,'dataType':_0x2b43('0x2c'),'error':function(){_0x572dcb(_0x2b43('0x2d'));_0x5768dc=!0x0;}}));if(_0x5768dc)return _0x572dcb(_0x2b43('0x2e'));}if('object'===typeof window[_0x2b43('0x2f')]&&_0x2b43('0x3')!==typeof window[_0x2b43('0x2f')][_0x2b43('0x30')])var _0x3f1628=window[_0x2b43('0x2f')][_0x2b43('0x30')];else if(_0x2b43('0xf')===typeof vtex&&_0x2b43('0xf')===typeof vtex[_0x2b43('0x30')]&&_0x2b43('0x3')!==typeof vtex[_0x2b43('0x30')][_0x2b43('0x31')])_0x3f1628=new vtex[(_0x2b43('0x30'))][(_0x2b43('0x31'))]();else return _0x572dcb(_0x2b43('0x32'));_0xd97f10['cartContainer']=_0x2b43('0x33');var _0x26a34a=function(_0x4eb731){_0x4e077e(this)['append'](_0x4eb731);_0x4eb731[_0x2b43('0x34')](_0x2b43('0x35'))[_0x2b43('0x36')](_0x4e077e(_0x2b43('0x37')))['on']('click.qd_ddc_closeFn',function(){_0x2b2759['removeClass'](_0x2b43('0x38'));_0x4e077e(document[_0x2b43('0x39')])[_0x2b43('0x3a')](_0x2b43('0x3b'));});_0x4e077e(document)[_0x2b43('0x3c')](_0x2b43('0x3d'))['on'](_0x2b43('0x3d'),function(_0x3db964){0x1b==_0x3db964[_0x2b43('0x3e')]&&(_0x2b2759[_0x2b43('0x3a')](_0x2b43('0x38')),_0x4e077e(document[_0x2b43('0x39')])[_0x2b43('0x3a')](_0x2b43('0x3b')));});var _0x989540=_0x4eb731[_0x2b43('0x34')](_0x2b43('0x3f'));_0x4eb731[_0x2b43('0x34')](_0x2b43('0x40'))['on'](_0x2b43('0x41'),function(){_0xd97f10[_0x2b43('0x42')]('-',void 0x0,void 0x0,_0x989540);return!0x1;});_0x4eb731[_0x2b43('0x34')](_0x2b43('0x43'))['on']('click.qd_ddc_scrollDown',function(){_0xd97f10[_0x2b43('0x42')](void 0x0,void 0x0,void 0x0,_0x989540);return!0x1;});var _0x8b3755=_0x4eb731['find'](_0x2b43('0x44'));_0x4eb731[_0x2b43('0x34')](_0x2b43('0x45'))[_0x2b43('0x46')]('')['on']('keyup.qd_ddc_cep',function(_0x59f36b){_0xd97f10[_0x2b43('0x47')](_0x4e077e(this));0xd==_0x59f36b[_0x2b43('0x3e')]&&_0x4eb731[_0x2b43('0x34')]('.qd-ddc-shipping\x20.qd-ddc-cep-ok')[_0x2b43('0x48')]();});_0x4eb731['find'](_0x2b43('0x49'))[_0x2b43('0x48')](function(_0x53c623){_0x53c623[_0x2b43('0x4a')]();_0x8b3755['toggle']();});_0x4eb731['find']('.qd-ddc-cep-close')[_0x2b43('0x48')](function(_0x11e93c){_0x11e93c[_0x2b43('0x4a')]();_0x8b3755[_0x2b43('0x4b')]();});_0x4e077e(document)['off'](_0x2b43('0x4c'))['on'](_0x2b43('0x4c'),function(_0x36ae6b){_0x4e077e(_0x36ae6b[_0x2b43('0x4d')])[_0x2b43('0x1')](_0x4eb731[_0x2b43('0x34')](_0x2b43('0x4e')))[_0x2b43('0x8')]||_0x8b3755[_0x2b43('0x4b')]();});_0x4eb731['find'](_0x2b43('0x4f'))[_0x2b43('0x48')](function(_0x9be814){_0x9be814['preventDefault']();_0xd97f10[_0x2b43('0x50')](_0x4eb731[_0x2b43('0x34')](_0x2b43('0x51')));});if(_0x20e5d1['updateOnlyHover']){var _0x2d0d85=0x0;_0x4e077e(this)['on'](_0x2b43('0x52'),function(){var _0x4eb731=function(){window[_0x2b43('0x17')][_0x2b43('0x18')]&&(_0xd97f10[_0x2b43('0x53')](),window[_0x2b43('0x17')]['allowUpdate']=!0x1,_0x4e077e['fn'][_0x2b43('0x54')](!0x0),_0xd97f10[_0x2b43('0x55')]());};_0x2d0d85=setInterval(function(){_0x4eb731();},0x258);_0x4eb731();});_0x4e077e(this)['on'](_0x2b43('0x56'),function(){clearInterval(_0x2d0d85);});}};var _0x3259dd=function(_0x537820){_0x537820=_0x4e077e(_0x537820);_0x20e5d1[_0x2b43('0x57')]['cartTotal']=_0x20e5d1[_0x2b43('0x57')]['cartTotal'][_0x2b43('0x2')]('#value',_0x2b43('0x58'));_0x20e5d1[_0x2b43('0x57')]['cartTotal']=_0x20e5d1['texts'][_0x2b43('0x59')]['replace']('#items',_0x2b43('0x5a'));_0x20e5d1[_0x2b43('0x57')][_0x2b43('0x59')]=_0x20e5d1[_0x2b43('0x57')][_0x2b43('0x59')][_0x2b43('0x2')](_0x2b43('0x5b'),'<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>');_0x20e5d1[_0x2b43('0x57')][_0x2b43('0x59')]=_0x20e5d1[_0x2b43('0x57')][_0x2b43('0x59')][_0x2b43('0x2')](_0x2b43('0x5c'),'<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0x537820[_0x2b43('0x34')](_0x2b43('0x5d'))[_0x2b43('0x5e')](_0x20e5d1['texts']['linkCart']);_0x537820['find'](_0x2b43('0x5f'))['html'](_0x20e5d1[_0x2b43('0x57')][_0x2b43('0x60')]);_0x537820[_0x2b43('0x34')](_0x2b43('0x61'))[_0x2b43('0x5e')](_0x20e5d1['texts'][_0x2b43('0x62')]);_0x537820[_0x2b43('0x34')]('.qd-ddc-infoTotal')[_0x2b43('0x5e')](_0x20e5d1[_0x2b43('0x57')]['cartTotal']);_0x537820[_0x2b43('0x34')](_0x2b43('0x63'))[_0x2b43('0x5e')](_0x20e5d1[_0x2b43('0x57')][_0x2b43('0x64')]);_0x537820[_0x2b43('0x34')]('.qd-ddc-emptyCart\x20p')['html'](_0x20e5d1[_0x2b43('0x57')][_0x2b43('0x65')]);return _0x537820;}(this[_0x2b43('0x66')]);var _0xbb439c=0x0;_0x2b2759['each'](function(){0x0<_0xbb439c?_0x26a34a[_0x2b43('0x67')](this,_0x3259dd[_0x2b43('0x68')]()):_0x26a34a['call'](this,_0x3259dd);_0xbb439c++;});window[_0x2b43('0xa')]['callback'][_0x2b43('0x36')](function(){_0x4e077e('.qd-ddc-infoTotalValue')[_0x2b43('0x5e')](window[_0x2b43('0xa')][_0x2b43('0x69')]||'--');_0x4e077e(_0x2b43('0x6a'))[_0x2b43('0x5e')](window[_0x2b43('0xa')][_0x2b43('0x6b')]||'0');_0x4e077e('.qd-ddc-infoTotalShipping')[_0x2b43('0x5e')](window[_0x2b43('0xa')][_0x2b43('0x6c')]||'--');_0x4e077e(_0x2b43('0x6d'))['html'](window['_QuatroDigital_CartData'][_0x2b43('0x6e')]||'--');});var _0x2a2417=function(_0x36f9fd,_0x123ee7){if('undefined'===typeof _0x36f9fd['items'])return _0x572dcb(_0x2b43('0x6f'));_0xd97f10[_0x2b43('0x70')]['call'](this,_0x123ee7);};_0xd97f10[_0x2b43('0x53')]=function(_0x105df4,_0x400ac8){_0x2b43('0x3')!=typeof _0x400ac8?window[_0x2b43('0x17')][_0x2b43('0x71')]=_0x400ac8:window['_QuatroDigital_DropDown'][_0x2b43('0x71')]&&(_0x400ac8=window['_QuatroDigital_DropDown'][_0x2b43('0x71')]);setTimeout(function(){window[_0x2b43('0x17')][_0x2b43('0x71')]=void 0x0;},_0x20e5d1[_0x2b43('0x72')]);_0x4e077e(_0x2b43('0x73'))[_0x2b43('0x3a')](_0x2b43('0x74'));if(_0x20e5d1[_0x2b43('0x75')]){var _0x6dc1c8=function(_0x221eb8){window[_0x2b43('0x17')][_0x2b43('0x76')]=_0x221eb8;_0x2a2417(_0x221eb8,_0x400ac8);'undefined'!==typeof window[_0x2b43('0x77')]&&'function'===typeof window['_QuatroDigital_AmountProduct']['exec']&&window[_0x2b43('0x77')][_0x2b43('0x78')]['call'](this);_0x4e077e('.qd-ddc-wrapper')[_0x2b43('0x79')](_0x2b43('0x74'));};_0x2b43('0x3')!==typeof window[_0x2b43('0x17')][_0x2b43('0x76')]?(_0x6dc1c8(window[_0x2b43('0x17')][_0x2b43('0x76')]),'function'===typeof _0x105df4&&_0x105df4(window[_0x2b43('0x17')][_0x2b43('0x76')])):_0x4e077e[_0x2b43('0x7a')]([_0x2b43('0x7b'),'totalizers',_0x2b43('0x7c')],{'done':function(_0x1189c0){_0x6dc1c8['call'](this,_0x1189c0);_0x2b43('0x7d')===typeof _0x105df4&&_0x105df4(_0x1189c0);},'fail':function(_0x5cda23){_0x572dcb([_0x2b43('0x7e'),_0x5cda23]);}});}else alert(_0x2b43('0x7f'));};_0xd97f10[_0x2b43('0x55')]=function(){var _0x2fe4bc=_0x4e077e('.qd-ddc-wrapper');_0x2fe4bc[_0x2b43('0x34')](_0x2b43('0x80'))[_0x2b43('0x8')]?_0x2fe4bc['removeClass'](_0x2b43('0x81')):_0x2fe4bc[_0x2b43('0x79')]('qd-ddc-noItems');};_0xd97f10[_0x2b43('0x70')]=function(_0x2c576e){var _0x2d0d85=_0x4e077e(_0x2b43('0x82'));_0x2d0d85['empty']();_0x2d0d85[_0x2b43('0x83')](function(){var _0x2d0d85=_0x4e077e(this),_0x4c6924,_0x12c566,_0x5537b8=_0x4e077e(''),_0x116c04;for(_0x116c04 in window[_0x2b43('0x17')]['getOrderForm']['items'])if('object'===typeof window[_0x2b43('0x17')][_0x2b43('0x76')][_0x2b43('0x7b')][_0x116c04]){var _0xd354=window[_0x2b43('0x17')]['getOrderForm']['items'][_0x116c04];var _0x3153b8=_0xd354[_0x2b43('0x84')][_0x2b43('0x2')](/^\/|\/$/g,'')[_0x2b43('0x7')]('/');var _0x5088ba=_0x4e077e('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0x5088ba[_0x2b43('0x85')]({'data-sku':_0xd354['id'],'data-sku-index':_0x116c04,'data-qd-departament':_0x3153b8[0x0],'data-qd-category':_0x3153b8[_0x3153b8[_0x2b43('0x8')]-0x1]});_0x5088ba[_0x2b43('0x79')]('qd-ddc-'+_0xd354[_0x2b43('0x86')]);_0x5088ba[_0x2b43('0x34')](_0x2b43('0x87'))['append'](_0x20e5d1[_0x2b43('0x88')](_0xd354));_0x5088ba[_0x2b43('0x34')](_0x2b43('0x89'))[_0x2b43('0x8a')](isNaN(_0xd354[_0x2b43('0x8b')])?_0xd354[_0x2b43('0x8b')]:0x0==_0xd354['sellingPrice']?_0x2b43('0x8c'):(_0x4e077e(_0x2b43('0x8d'))[_0x2b43('0x85')](_0x2b43('0x8e'))||'R$')+'\x20'+qd_number_format(_0xd354[_0x2b43('0x8b')]/0x64,0x2,',','.'));_0x5088ba['find'](_0x2b43('0x8f'))[_0x2b43('0x85')]({'data-sku':_0xd354['id'],'data-sku-index':_0x116c04})['val'](_0xd354[_0x2b43('0x90')]);_0x5088ba[_0x2b43('0x34')]('.qd-ddc-remove')[_0x2b43('0x85')]({'data-sku':_0xd354['id'],'data-sku-index':_0x116c04});_0xd97f10['insertProdImg'](_0xd354['id'],_0x5088ba[_0x2b43('0x34')](_0x2b43('0x91')),_0xd354[_0x2b43('0x92')]);_0x5088ba[_0x2b43('0x34')]('.qd-ddc-quantityMore,.qd-ddc-quantityMinus')[_0x2b43('0x85')]({'data-sku':_0xd354['id'],'data-sku-index':_0x116c04});_0x5088ba['appendTo'](_0x2d0d85);_0x5537b8=_0x5537b8['add'](_0x5088ba);}try{var _0x448e53=_0x2d0d85[_0x2b43('0x0')](_0x2b43('0x73'))[_0x2b43('0x34')]('.qd-ddc-shipping\x20input');_0x448e53[_0x2b43('0x8')]&&''==_0x448e53['val']()&&window[_0x2b43('0x17')][_0x2b43('0x76')]['shippingData']['address']&&_0x448e53[_0x2b43('0x46')](window[_0x2b43('0x17')][_0x2b43('0x76')][_0x2b43('0x7c')]['address'][_0x2b43('0x93')]);}catch(_0x2ed0fa){_0x572dcb(_0x2b43('0x94')+_0x2ed0fa[_0x2b43('0xe')],_0x2b43('0x15'));}_0xd97f10['actionButtons'](_0x2d0d85);_0xd97f10[_0x2b43('0x55')]();_0x2c576e&&_0x2c576e[_0x2b43('0x95')]&&function(){_0x12c566=_0x5537b8[_0x2b43('0x96')](_0x2b43('0x97')+_0x2c576e[_0x2b43('0x95')]+'\x27]');_0x12c566[_0x2b43('0x8')]&&(_0x4c6924=0x0,_0x5537b8['each'](function(){var _0x2c576e=_0x4e077e(this);if(_0x2c576e['is'](_0x12c566))return!0x1;_0x4c6924+=_0x2c576e[_0x2b43('0x98')]();}),_0xd97f10[_0x2b43('0x42')](void 0x0,void 0x0,_0x4c6924,_0x2d0d85['add'](_0x2d0d85[_0x2b43('0x99')]())),_0x5537b8[_0x2b43('0x3a')]('qd-ddc-lastAddedFixed'),function(_0x32d83c){_0x32d83c['addClass'](_0x2b43('0x9a'));_0x32d83c[_0x2b43('0x79')](_0x2b43('0x9b'));setTimeout(function(){_0x32d83c[_0x2b43('0x3a')](_0x2b43('0x9a'));},_0x20e5d1[_0x2b43('0x72')]);}(_0x12c566),_0x4e077e(document[_0x2b43('0x39')])[_0x2b43('0x79')](_0x2b43('0x9c')),setTimeout(function(){_0x4e077e(document[_0x2b43('0x39')])[_0x2b43('0x3a')](_0x2b43('0x9c'));},_0x20e5d1[_0x2b43('0x72')]));}();});(function(){_QuatroDigital_DropDown[_0x2b43('0x76')][_0x2b43('0x7b')][_0x2b43('0x8')]?(_0x4e077e('body')[_0x2b43('0x3a')]('qd-ddc-cart-empty')['addClass'](_0x2b43('0x9d')),setTimeout(function(){_0x4e077e(_0x2b43('0x39'))[_0x2b43('0x3a')](_0x2b43('0x9e'));},_0x20e5d1[_0x2b43('0x72')])):_0x4e077e('body')[_0x2b43('0x3a')](_0x2b43('0x9f'))[_0x2b43('0x79')](_0x2b43('0xa0'));}());'function'===typeof _0x20e5d1[_0x2b43('0xa1')]?_0x20e5d1[_0x2b43('0xa1')]['call'](this):_0x572dcb('callbackProductsList\x20não\x20é\x20uma\x20função');};_0xd97f10[_0x2b43('0xa2')]=function(_0x2758c1,_0x5d34b8,_0x2b5344){function _0x52b4da(){_0x20e5d1['forceImageHTTPS']&&_0x2b43('0xa3')==typeof _0x2b5344&&(_0x2b5344=_0x2b5344[_0x2b43('0x2')]('http',_0x2b43('0xa4')));_0x5d34b8[_0x2b43('0x3a')](_0x2b43('0xa5'))['load'](function(){_0x4e077e(this)[_0x2b43('0x79')]('qd-loaded');})[_0x2b43('0x85')]('src',_0x2b5344);}_0x2b5344?_0x52b4da():isNaN(_0x2758c1)?_0x572dcb('Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU',_0x2b43('0x13')):alert(_0x2b43('0xa6'));};_0xd97f10['actionButtons']=function(_0x5b4358){var _0x2d0d85=function(_0x4a4e59,_0x5216d5){var _0x11a53e=_0x4e077e(_0x4a4e59);var _0xf31977=_0x11a53e['attr']('data-sku');var _0x3153b8=_0x11a53e['attr']('data-sku-index');if(_0xf31977){var _0x2adbb8=parseInt(_0x11a53e['val']())||0x1;_0xd97f10[_0x2b43('0xa7')]([_0xf31977,_0x3153b8],_0x2adbb8,_0x2adbb8+0x1,function(_0x567a3c){_0x11a53e[_0x2b43('0x46')](_0x567a3c);_0x2b43('0x7d')===typeof _0x5216d5&&_0x5216d5();});}};var _0x2b6fc0=function(_0x52c221,_0x9d0dbf){var _0x2d0d85=_0x4e077e(_0x52c221);var _0x367680=_0x2d0d85['attr'](_0x2b43('0xa8'));var _0x33d681=_0x2d0d85[_0x2b43('0x85')](_0x2b43('0xa9'));if(_0x367680){var _0x3153b8=parseInt(_0x2d0d85[_0x2b43('0x46')]())||0x2;_0xd97f10['changeQantity']([_0x367680,_0x33d681],_0x3153b8,_0x3153b8-0x1,function(_0x279c9b){_0x2d0d85[_0x2b43('0x46')](_0x279c9b);_0x2b43('0x7d')===typeof _0x9d0dbf&&_0x9d0dbf();});}};var _0x1dfb27=function(_0x5e4485,_0x394784){var _0x191308=_0x4e077e(_0x5e4485);var _0x214c75=_0x191308[_0x2b43('0x85')](_0x2b43('0xa8'));var _0x3153b8=_0x191308[_0x2b43('0x85')]('data-sku-index');if(_0x214c75){var _0x268e4c=parseInt(_0x191308[_0x2b43('0x46')]())||0x1;_0xd97f10['changeQantity']([_0x214c75,_0x3153b8],0x1,_0x268e4c,function(_0x147093){_0x191308[_0x2b43('0x46')](_0x147093);_0x2b43('0x7d')===typeof _0x394784&&_0x394784();});}};var _0x3153b8=_0x5b4358[_0x2b43('0x34')](_0x2b43('0xaa'));_0x3153b8[_0x2b43('0x79')](_0x2b43('0xab'))[_0x2b43('0x83')](function(){var _0x5b4358=_0x4e077e(this);_0x5b4358[_0x2b43('0x34')](_0x2b43('0xac'))['on'](_0x2b43('0xad'),function(_0x24b76b){_0x24b76b[_0x2b43('0x4a')]();_0x3153b8['addClass']('qd-loading');_0x2d0d85(_0x5b4358['find'](_0x2b43('0x8f')),function(){_0x3153b8[_0x2b43('0x3a')](_0x2b43('0xae'));});});_0x5b4358['find'](_0x2b43('0xaf'))['on'](_0x2b43('0xb0'),function(_0x4b69a9){_0x4b69a9['preventDefault']();_0x3153b8['addClass'](_0x2b43('0xae'));_0x2b6fc0(_0x5b4358[_0x2b43('0x34')](_0x2b43('0x8f')),function(){_0x3153b8[_0x2b43('0x3a')]('qd-loading');});});_0x5b4358[_0x2b43('0x34')](_0x2b43('0x8f'))['on'](_0x2b43('0xb1'),function(){_0x3153b8['addClass'](_0x2b43('0xae'));_0x1dfb27(this,function(){_0x3153b8[_0x2b43('0x3a')](_0x2b43('0xae'));});});_0x5b4358['find'](_0x2b43('0x8f'))['on']('keyup.qd_ddc_change',function(_0x28c7b9){0xd==_0x28c7b9[_0x2b43('0x3e')]&&(_0x3153b8['addClass'](_0x2b43('0xae')),_0x1dfb27(this,function(){_0x3153b8[_0x2b43('0x3a')](_0x2b43('0xae'));}));});});_0x5b4358[_0x2b43('0x34')](_0x2b43('0x80'))[_0x2b43('0x83')](function(){var _0x5b4358=_0x4e077e(this);_0x5b4358[_0x2b43('0x34')]('.qd-ddc-remove')['on'](_0x2b43('0xb2'),function(){_0x5b4358[_0x2b43('0x79')](_0x2b43('0xae'));_0xd97f10[_0x2b43('0xb3')](_0x4e077e(this),function(_0xa62aa3){_0xa62aa3?_0x5b4358[_0x2b43('0xb4')](!0x0)[_0x2b43('0xb5')](function(){_0x5b4358[_0x2b43('0xb6')]();_0xd97f10['cartIsEmpty']();}):_0x5b4358[_0x2b43('0x3a')](_0x2b43('0xae'));});return!0x1;});});};_0xd97f10[_0x2b43('0x47')]=function(_0x2370f4){var _0x34fda1=_0x2370f4['val']();_0x34fda1=_0x34fda1[_0x2b43('0x2')](/[^0-9\-]/g,'');_0x34fda1=_0x34fda1[_0x2b43('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3');_0x34fda1=_0x34fda1[_0x2b43('0x2')](/(.{9}).*/g,'$1');_0x2370f4[_0x2b43('0x46')](_0x34fda1);};_0xd97f10[_0x2b43('0x50')]=function(_0x2d4d78){var _0x21202f=_0x2d4d78[_0x2b43('0x46')]();0x9<=_0x21202f[_0x2b43('0x8')]&&(_0x2d4d78[_0x2b43('0xb7')](_0x2b43('0xb8'))!=_0x21202f&&_0x3f1628['calculateShipping']({'postalCode':_0x21202f,'country':_0x2b43('0xb9')})[_0x2b43('0xba')](function(_0x4b2a2b){_0x2d4d78[_0x2b43('0x1')](_0x2b43('0xbb'))[_0x2b43('0x34')](_0x2b43('0xbc'))[_0x2b43('0xb6')]();window[_0x2b43('0x17')][_0x2b43('0x76')]=_0x4b2a2b;_0xd97f10[_0x2b43('0x53')]();_0x4b2a2b=_0x4b2a2b[_0x2b43('0x7c')][_0x2b43('0xbd')][0x0]['slas'];for(var _0x3153b8=_0x4e077e(_0x2b43('0xbe')),_0x2519b0=0x0;_0x2519b0<_0x4b2a2b['length'];_0x2519b0++){var _0x83bfc5=_0x4b2a2b[_0x2519b0],_0x65158f=0x1<_0x83bfc5['shippingEstimate']?_0x83bfc5[_0x2b43('0xbf')]['replace']('bd',_0x2b43('0xc0')):_0x83bfc5[_0x2b43('0xbf')][_0x2b43('0x2')]('bd',_0x2b43('0xc1')),_0x27b10c=_0x4e077e(_0x2b43('0xc2'));_0x27b10c[_0x2b43('0x8a')](_0x2b43('0xc3')+qd_number_format(_0x83bfc5[_0x2b43('0xc4')]/0x64,0x2,',','.')+_0x2b43('0xc5')+_0x83bfc5[_0x2b43('0x28')]+',\x20entrega\x20em\x20'+_0x65158f+_0x2b43('0xc6')+_0x21202f+_0x2b43('0xc7'));_0x27b10c[_0x2b43('0xc8')](_0x3153b8[_0x2b43('0x34')](_0x2b43('0xc9')));}_0x3153b8[_0x2b43('0xca')](_0x2d4d78[_0x2b43('0x1')]('.qd-ddc-cep-tooltip-text')[_0x2b43('0x34')](_0x2b43('0xcb')));})['fail'](function(_0x949c58){_0x572dcb(['Não\x20foi\x20possível\x20calcular\x20o\x20frete',_0x949c58]);updateCartData();}),_0x2d4d78[_0x2b43('0xb7')](_0x2b43('0xb8'),_0x21202f));};_0xd97f10[_0x2b43('0xa7')]=function(_0x22ac79,_0x49e18e,_0x9f43e0,_0x54b30c){function _0x54a923(_0x59d4c5){_0x59d4c5='boolean'!==typeof _0x59d4c5?!0x1:_0x59d4c5;_0xd97f10[_0x2b43('0x53')]();window['_QuatroDigital_DropDown'][_0x2b43('0x18')]=!0x1;_0xd97f10[_0x2b43('0x55')]();_0x2b43('0x3')!==typeof window[_0x2b43('0x77')]&&_0x2b43('0x7d')===typeof window[_0x2b43('0x77')][_0x2b43('0x78')]&&window[_0x2b43('0x77')][_0x2b43('0x78')][_0x2b43('0x67')](this);'function'===typeof adminCart&&adminCart();_0x4e077e['fn'][_0x2b43('0x54')](!0x0,void 0x0,_0x59d4c5);'function'===typeof _0x54b30c&&_0x54b30c(_0x49e18e);}_0x9f43e0=_0x9f43e0||0x1;if(0x1>_0x9f43e0)return _0x49e18e;if(_0x20e5d1[_0x2b43('0x75')]){if(_0x2b43('0x3')===typeof window['_QuatroDigital_DropDown'][_0x2b43('0x76')]['items'][_0x22ac79[0x1]])return _0x572dcb(_0x2b43('0xcc')+_0x22ac79[0x1]+']'),_0x49e18e;window['_QuatroDigital_DropDown'][_0x2b43('0x76')][_0x2b43('0x7b')][_0x22ac79[0x1]][_0x2b43('0x90')]=_0x9f43e0;window[_0x2b43('0x17')][_0x2b43('0x76')]['items'][_0x22ac79[0x1]][_0x2b43('0xcd')]=_0x22ac79[0x1];_0x3f1628[_0x2b43('0xce')]([window[_0x2b43('0x17')][_0x2b43('0x76')][_0x2b43('0x7b')][_0x22ac79[0x1]]],[_0x2b43('0x7b'),_0x2b43('0xcf'),_0x2b43('0x7c')])['done'](function(_0x5d3a8e){window[_0x2b43('0x17')][_0x2b43('0x76')]=_0x5d3a8e;_0x54a923(!0x0);})[_0x2b43('0xd0')](function(_0x5c3b96){_0x572dcb([_0x2b43('0xd1'),_0x5c3b96]);_0x54a923();});}else _0x572dcb('atenção\x20esta\x20método\x20esta\x20descontinuado');};_0xd97f10[_0x2b43('0xb3')]=function(_0x78b3f,_0x44d6f9){function _0x283195(_0x542eeb){_0x542eeb=_0x2b43('0xd2')!==typeof _0x542eeb?!0x1:_0x542eeb;_0x2b43('0x3')!==typeof window['_QuatroDigital_AmountProduct']&&_0x2b43('0x7d')===typeof window['_QuatroDigital_AmountProduct']['exec']&&window[_0x2b43('0x77')][_0x2b43('0x78')][_0x2b43('0x67')](this);'function'===typeof adminCart&&adminCart();_0x4e077e['fn'][_0x2b43('0x54')](!0x0,void 0x0,_0x542eeb);'function'===typeof _0x44d6f9&&_0x44d6f9(_0x3290b4);}var _0x3290b4=!0x1,_0x3153b8=_0x4e077e(_0x78b3f)[_0x2b43('0x85')](_0x2b43('0xa9'));if(_0x20e5d1[_0x2b43('0x75')]){if(_0x2b43('0x3')===typeof window[_0x2b43('0x17')][_0x2b43('0x76')][_0x2b43('0x7b')][_0x3153b8])return _0x572dcb(_0x2b43('0xcc')+_0x3153b8+']'),_0x3290b4;window[_0x2b43('0x17')][_0x2b43('0x76')]['items'][_0x3153b8][_0x2b43('0xcd')]=_0x3153b8;_0x3f1628[_0x2b43('0xd3')]([window[_0x2b43('0x17')][_0x2b43('0x76')][_0x2b43('0x7b')][_0x3153b8]],[_0x2b43('0x7b'),_0x2b43('0xcf'),_0x2b43('0x7c')])[_0x2b43('0xba')](function(_0x4ac682){_0x3290b4=!0x0;window[_0x2b43('0x17')][_0x2b43('0x76')]=_0x4ac682;_0x2a2417(_0x4ac682);_0x283195(!0x0);})[_0x2b43('0xd0')](function(_0x16b8d4){_0x572dcb([_0x2b43('0xd4'),_0x16b8d4]);_0x283195();});}else alert('Atenção,\x20este\x20método\x20esta\x20descontinuado.');};_0xd97f10['scrollCart']=function(_0x4e4019,_0x55d53b,_0x1795af,_0x5907ee){_0x5907ee=_0x5907ee||_0x4e077e(_0x2b43('0xd5'));_0x4e4019=_0x4e4019||'+';_0x55d53b=_0x55d53b||0.9*_0x5907ee[_0x2b43('0xd6')]();_0x5907ee[_0x2b43('0xb4')](!0x0,!0x0)[_0x2b43('0xd7')]({'scrollTop':isNaN(_0x1795af)?_0x4e4019+'='+_0x55d53b+'px':_0x1795af});};_0x20e5d1[_0x2b43('0xd8')]||(_0xd97f10[_0x2b43('0x53')](),_0x4e077e['fn'][_0x2b43('0x54')](!0x0));_0x4e077e(window)['on'](_0x2b43('0xd9'),function(){try{window[_0x2b43('0x17')][_0x2b43('0x76')]=void 0x0,_0xd97f10['getCartInfoByUrl']();}catch(_0x4bea65){_0x572dcb(_0x2b43('0xda')+_0x4bea65[_0x2b43('0xe')],'avisso');}});_0x2b43('0x7d')===typeof _0x20e5d1[_0x2b43('0xb')]?_0x20e5d1[_0x2b43('0xb')][_0x2b43('0x67')](this):_0x572dcb(_0x2b43('0xdb'));};_0x4e077e['fn']['QD_dropDownCart']=function(_0x5422f4){var _0x1e8e35=_0x4e077e(this);_0x1e8e35['fn']=new _0x4e077e['QD_dropDownCart'](this,_0x5422f4);return _0x1e8e35;};}catch(_0x11b015){_0x2b43('0x3')!==typeof console&&_0x2b43('0x7d')===typeof console[_0x2b43('0xc')]&&console[_0x2b43('0xc')](_0x2b43('0xd'),_0x11b015);}}(this));(function(_0x5064f4){try{var _0x38a887=jQuery;window[_0x2b43('0x77')]=window[_0x2b43('0x77')]||{};window[_0x2b43('0x77')]['items']={};window['_QuatroDigital_AmountProduct'][_0x2b43('0xdc')]=!0x1;window[_0x2b43('0x77')][_0x2b43('0xdd')]=!0x1;window[_0x2b43('0x77')][_0x2b43('0xde')]=!0x1;var _0x35937e=function(){if(window['_QuatroDigital_AmountProduct'][_0x2b43('0xdc')]){var _0x493388=!0x1;var _0x20a77d={};window[_0x2b43('0x77')][_0x2b43('0x7b')]={};for(_0x208c42 in window[_0x2b43('0x17')][_0x2b43('0x76')][_0x2b43('0x7b')])if(_0x2b43('0xf')===typeof window[_0x2b43('0x17')][_0x2b43('0x76')][_0x2b43('0x7b')][_0x208c42]){var _0x38acbf=window[_0x2b43('0x17')]['getOrderForm']['items'][_0x208c42];_0x2b43('0x3')!==typeof _0x38acbf[_0x2b43('0xdf')]&&null!==_0x38acbf[_0x2b43('0xdf')]&&''!==_0x38acbf['productId']&&(window['_QuatroDigital_AmountProduct'][_0x2b43('0x7b')]['prod_'+_0x38acbf[_0x2b43('0xdf')]]=window[_0x2b43('0x77')][_0x2b43('0x7b')][_0x2b43('0xe0')+_0x38acbf[_0x2b43('0xdf')]]||{},window[_0x2b43('0x77')][_0x2b43('0x7b')][_0x2b43('0xe0')+_0x38acbf[_0x2b43('0xdf')]][_0x2b43('0xe1')]=_0x38acbf[_0x2b43('0xdf')],_0x20a77d[_0x2b43('0xe0')+_0x38acbf['productId']]||(window[_0x2b43('0x77')][_0x2b43('0x7b')][_0x2b43('0xe0')+_0x38acbf[_0x2b43('0xdf')]][_0x2b43('0x6b')]=0x0),window[_0x2b43('0x77')]['items'][_0x2b43('0xe0')+_0x38acbf['productId']][_0x2b43('0x6b')]+=_0x38acbf['quantity'],_0x493388=!0x0,_0x20a77d[_0x2b43('0xe0')+_0x38acbf[_0x2b43('0xdf')]]=!0x0);}var _0x208c42=_0x493388;}else _0x208c42=void 0x0;window[_0x2b43('0x77')]['allowRecalculate']&&(_0x38a887('.qd-bap-wrapper')[_0x2b43('0xb6')](),_0x38a887(_0x2b43('0xe2'))['removeClass'](_0x2b43('0xe3')));for(var _0x2429d3 in window[_0x2b43('0x77')][_0x2b43('0x7b')]){_0x38acbf=window[_0x2b43('0x77')][_0x2b43('0x7b')][_0x2429d3];if(_0x2b43('0xf')!==typeof _0x38acbf)return;_0x20a77d=_0x38a887(_0x2b43('0xe4')+_0x38acbf[_0x2b43('0xe1')]+']')[_0x2b43('0x0')]('li');if(window[_0x2b43('0x77')][_0x2b43('0xdc')]||!_0x20a77d[_0x2b43('0x34')](_0x2b43('0xe5'))['length'])_0x493388=_0x38a887(_0x2b43('0xe6')),_0x493388[_0x2b43('0x34')](_0x2b43('0xe7'))[_0x2b43('0x5e')](_0x38acbf[_0x2b43('0x6b')]),_0x38acbf=_0x20a77d['find'](_0x2b43('0xe8')),_0x38acbf['length']?_0x38acbf[_0x2b43('0xe9')](_0x493388)[_0x2b43('0x79')]('qd-bap-item-added'):_0x20a77d[_0x2b43('0xe9')](_0x493388);}_0x208c42&&(window[_0x2b43('0x77')]['allowRecalculate']=!0x1);};window[_0x2b43('0x77')]['exec']=function(){window['_QuatroDigital_AmountProduct'][_0x2b43('0xdc')]=!0x0;_0x35937e['call'](this);};_0x38a887(document)[_0x2b43('0xea')](function(){_0x35937e[_0x2b43('0x67')](this);});}catch(_0x4606b4){_0x2b43('0x3')!==typeof console&&_0x2b43('0x7d')===typeof console['error']&&console[_0x2b43('0xc')](_0x2b43('0xd'),_0x4606b4);}}(this));(function(){try{var _0x53a8e9=jQuery,_0x51ceeb,_0x12bcc4={'selector':_0x2b43('0xeb'),'dropDown':{},'buyButton':{}};_0x53a8e9[_0x2b43('0xec')]=function(_0xceffb2){var _0x24c929={};_0x51ceeb=_0x53a8e9[_0x2b43('0x22')](!0x0,{},_0x12bcc4,_0xceffb2);_0xceffb2=_0x53a8e9(_0x51ceeb[_0x2b43('0xed')])[_0x2b43('0x19')](_0x51ceeb[_0x2b43('0xee')]);_0x24c929[_0x2b43('0xef')]='undefined'!==typeof _0x51ceeb[_0x2b43('0xee')][_0x2b43('0xd8')]&&!0x1===_0x51ceeb['dropDown'][_0x2b43('0xd8')]?_0x53a8e9(_0x51ceeb[_0x2b43('0xed')])[_0x2b43('0xf0')](_0xceffb2['fn'],_0x51ceeb[_0x2b43('0xef')]):_0x53a8e9(_0x51ceeb[_0x2b43('0xed')])[_0x2b43('0xf0')](_0x51ceeb[_0x2b43('0xef')]);_0x24c929['dropDown']=_0xceffb2;return _0x24c929;};_0x53a8e9['fn']['smartCart']=function(){_0x2b43('0xf')===typeof console&&_0x2b43('0x7d')===typeof console['info']&&console['info'](_0x2b43('0xf1'));};_0x53a8e9[_0x2b43('0xf2')]=_0x53a8e9['fn'][_0x2b43('0xf2')];}catch(_0x2e78fc){_0x2b43('0x3')!==typeof console&&_0x2b43('0x7d')===typeof console['error']&&console[_0x2b43('0xc')]('Oooops!\x20',_0x2e78fc);}}());

/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

var _0x1e8e=['object','undefined','error','info','warn','unshift','alerta','toLowerCase','aviso','apply','.qd_sil_img_wrapper','300','QD_SIL_scroll\x20QuatroDigital.is_Callback','find','imageWrapper','not','.qd-sil-on','img:visible','length','scrollTop','bottom','height','first','Problemas\x20:(\x20.\x20Detalhes:\x20','clone','load','qd-sil-image-loaded','src','sizes','width','addClass','qd-sil-image','insertAfter','closest','qd-sil-on','offset','top','push','each','scroll','documentElement','body','trigger','QD_SIL_scroll','QD_smartImageLoad','function','hkpnfr%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','join','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Quatro\x20Digital\x20-\x20Smart\x20Image\x20Load'];(function(_0x468315,_0x375faf){var _0x262d7e=function(_0x33409d){while(--_0x33409d){_0x468315['push'](_0x468315['shift']());}};_0x262d7e(++_0x375faf);}(_0x1e8e,0xd4));var _0x1cb7=function(_0x32cd03,_0x24521b){_0x32cd03=_0x32cd03-0x0;var _0x8617cc=_0x1e8e[_0x32cd03];return _0x8617cc;};(function(_0x230ddb){'use strict';var _0x41368b=jQuery;if(typeof _0x41368b['fn'][_0x1cb7('0x0')]===_0x1cb7('0x1'))return;_0x41368b['fn'][_0x1cb7('0x0')]=function(){};var _0x45c119=function(_0x48c939){var _0x5f5d5e={'y':_0x1cb7('0x2')};return function(_0x18a7dd){var _0x498e16,_0x4e473a,_0x954696,_0x3d8419;_0x4e473a=function(_0x20c425){return _0x20c425;};_0x954696=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x18a7dd=_0x18a7dd['d'+_0x954696[0x10]+'c'+_0x954696[0x11]+'m'+_0x4e473a(_0x954696[0x1])+'n'+_0x954696[0xd]]['l'+_0x954696[0x12]+'c'+_0x954696[0x0]+'ti'+_0x4e473a('o')+'n'];_0x498e16=function(_0x200300){return escape(encodeURIComponent(_0x200300[_0x1cb7('0x3')](/\./g,'¨')[_0x1cb7('0x3')](/[a-zA-Z]/g,function(_0x50ab46){return String['fromCharCode'](('Z'>=_0x50ab46?0x5a:0x7a)>=(_0x50ab46=_0x50ab46['charCodeAt'](0x0)+0xd)?_0x50ab46:_0x50ab46-0x1a);})));};var _0x767532=_0x498e16(_0x18a7dd[[_0x954696[0x9],_0x4e473a('o'),_0x954696[0xc],_0x954696[_0x4e473a(0xd)]][_0x1cb7('0x4')]('')]);_0x498e16=_0x498e16((window[['js',_0x4e473a('no'),'m',_0x954696[0x1],_0x954696[0x4]['toUpperCase'](),_0x1cb7('0x5')][_0x1cb7('0x4')]('')]||_0x1cb7('0x6'))+['.v',_0x954696[0xd],'e',_0x4e473a('x'),'co',_0x4e473a('mm'),_0x1cb7('0x7'),_0x954696[0x1],'.c',_0x4e473a('o'),'m.',_0x954696[0x13],'r'][_0x1cb7('0x4')](''));for(var _0x2aee2f in _0x5f5d5e){if(_0x498e16===_0x2aee2f+_0x5f5d5e[_0x2aee2f]||_0x767532===_0x2aee2f+_0x5f5d5e[_0x2aee2f]){_0x3d8419='tr'+_0x954696[0x11]+'e';break;}_0x3d8419='f'+_0x954696[0x0]+'ls'+_0x4e473a(_0x954696[0x1])+'';}_0x4e473a=!0x1;-0x1<_0x18a7dd[[_0x954696[0xc],'e',_0x954696[0x0],'rc',_0x954696[0x9]][_0x1cb7('0x4')]('')][_0x1cb7('0x8')](_0x1cb7('0x9'))&&(_0x4e473a=!0x0);return[_0x3d8419,_0x4e473a];}(_0x48c939);}(window);if(!eval(_0x45c119[0x0]))return _0x45c119[0x1]?_0x11d82c(_0x1cb7('0xa')):!0x1;var _0x1ba454=_0x1cb7('0xb');var _0x11d82c=function(_0x378582,_0x1d43fc){if(_0x1cb7('0xc')===typeof console&&_0x1cb7('0xd')!==typeof console[_0x1cb7('0xe')]&&_0x1cb7('0xd')!==typeof console[_0x1cb7('0xf')]&&'undefined'!==typeof console[_0x1cb7('0x10')]){if(_0x1cb7('0xc')==typeof _0x378582&&_0x1cb7('0x1')==typeof _0x378582[_0x1cb7('0x11')]){_0x378582[_0x1cb7('0x11')]('['+_0x1ba454+']\x0a');var _0x205608=_0x378582;}else _0x205608=['['+_0x1ba454+']\x0a',_0x378582];if(_0x1cb7('0xd')==typeof _0x1d43fc||_0x1cb7('0x12')!==_0x1d43fc[_0x1cb7('0x13')]()&&_0x1cb7('0x14')!==_0x1d43fc['toLowerCase']())if(_0x1cb7('0xd')!=typeof _0x1d43fc&&'info'==_0x1d43fc[_0x1cb7('0x13')]())try{console[_0x1cb7('0xf')][_0x1cb7('0x15')](console,_0x205608);}catch(_0x19557f){try{console['info'](_0x205608['join']('\x0a'));}catch(_0x567197){}}else try{console['error'][_0x1cb7('0x15')](console,_0x205608);}catch(_0x449b9b){try{console['error'](_0x205608[_0x1cb7('0x4')]('\x0a'));}catch(_0x28eb12){}}else try{console[_0x1cb7('0x10')][_0x1cb7('0x15')](console,_0x205608);}catch(_0x5e4513){try{console['warn'](_0x205608[_0x1cb7('0x4')]('\x0a'));}catch(_0x1a7e33){}}}};var _0x4ed94f=/(ids\/[0-9]+-)[0-9-]+/i;var _0xf10dca={'imageWrapper':_0x1cb7('0x16'),'sizes':{'width':'300','height':_0x1cb7('0x17')}};var _0x5a1ec0=function(_0x5ad54e,_0x3e48ff){'use strict';_0x3b858c();_0x41368b(window)['on'](_0x1cb7('0x18'),_0x3b858c);function _0x3b858c(){try{var _0x174a99=_0x5ad54e[_0x1cb7('0x19')](_0x3e48ff[_0x1cb7('0x1a')])[_0x1cb7('0x1b')](_0x1cb7('0x1c'))['find'](_0x1cb7('0x1d'));if(!_0x174a99[_0x1cb7('0x1e')])return;var _0x1e4df4=_0x41368b(window);var _0xb81717={'top':_0x1e4df4[_0x1cb7('0x1f')]()};_0xb81717[_0x1cb7('0x20')]=_0xb81717['top']+_0x1e4df4[_0x1cb7('0x21')]();var _0xbe9c8e=_0x174a99[_0x1cb7('0x22')]()[_0x1cb7('0x21')]();var _0x18e511=_0x344593(_0x174a99,_0xb81717,_0xbe9c8e);for(var _0x504307=0x0;_0x504307<_0x18e511['length'];_0x504307++)_0x101c45(_0x41368b(_0x18e511[_0x504307]));}catch(_0x1671c1){typeof console!==_0x1cb7('0xd')&&typeof console[_0x1cb7('0xe')]==='function'&&console['error'](_0x1cb7('0x23'),_0x1671c1);}}function _0x101c45(_0x385ee3){var _0x28cdf8=_0x385ee3[_0x1cb7('0x24')]();_0x28cdf8['on'](_0x1cb7('0x25'),function(){_0x41368b(this)['addClass'](_0x1cb7('0x26'));});_0x28cdf8['attr']({'src':_0x28cdf8[0x0][_0x1cb7('0x27')]['replace'](_0x4ed94f,'$1'+_0x3e48ff[_0x1cb7('0x28')][_0x1cb7('0x29')]+'-'+_0x3e48ff['sizes'][_0x1cb7('0x21')]),'width':_0x3e48ff[_0x1cb7('0x28')][_0x1cb7('0x29')],'height':_0x3e48ff[_0x1cb7('0x28')][_0x1cb7('0x21')]});_0x28cdf8[_0x1cb7('0x2a')](_0x1cb7('0x2b'))[_0x1cb7('0x2c')](_0x385ee3);_0x28cdf8[_0x1cb7('0x2d')](_0x3e48ff[_0x1cb7('0x1a')])[_0x1cb7('0x2a')](_0x1cb7('0x2e'));}function _0x344593(_0x2313b0,_0x1d36df,_0x3a26cc){var _0xa5331c;var _0x296a05=[];for(var _0x3141b3=0x0;_0x3141b3<_0x2313b0[_0x1cb7('0x1e')];_0x3141b3++){_0xa5331c=_0x41368b(_0x2313b0[_0x3141b3])[_0x1cb7('0x2f')]();_0xa5331c[_0x1cb7('0x20')]=_0xa5331c['top']+_0x3a26cc;if(!(_0x1d36df[_0x1cb7('0x20')]<_0xa5331c[_0x1cb7('0x30')]||_0x1d36df[_0x1cb7('0x30')]>_0xa5331c[_0x1cb7('0x20')])){_0x296a05[_0x1cb7('0x31')](_0x2313b0[_0x3141b3]);}}return _0x296a05;};};_0x41368b['fn'][_0x1cb7('0x0')]=function(_0x450064){var _0x871dac=_0x41368b(this);if(!_0x871dac[_0x1cb7('0x1e')])return _0x871dac;_0x871dac[_0x1cb7('0x32')](function(){var _0x255096=_0x41368b(this);_0x255096[_0x1cb7('0x0')]=new _0x5a1ec0(_0x255096,_0x41368b['extend']({},_0xf10dca,_0x450064));});return _0x871dac;};window['QD_SIL_scrollRange']=0x28;var _0x586cb5=QD_SIL_scrollRange;var _0x17d734=0x0;_0x41368b(window)['on'](_0x1cb7('0x33'),function(){var _0x6768ba=document[_0x1cb7('0x34')][_0x1cb7('0x1f')]||document[_0x1cb7('0x35')]['scrollTop'];if(_0x6768ba>_0x17d734+_0x586cb5||_0x6768ba<_0x17d734-_0x586cb5){_0x41368b(window)[_0x1cb7('0x36')](_0x1cb7('0x37'));_0x17d734=_0x6768ba;}});}(this));

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

