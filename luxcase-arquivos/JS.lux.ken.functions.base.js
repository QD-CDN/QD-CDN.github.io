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
			$(document.body).attr('data-qd-scroll-limit', '100, 800');
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
			Search.shelfLineFix();
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
			Product.rotateBuyTogether();
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
		rotateBuyTogether: function () {
			if (typeof $.fn.slick != "function")
				return;

			var slider = $('<div class="rotative-buy-together-qd-v1-slide" />').insertAfter('#divTitulo');
			var wrapper = $('.product-qd-v1-buy-together');
			wrapper.find('tr').each(function () {
				$(this).appendTo(slider).wrap("<div><table /></div>");
			});
			wrapper.find('.buy-together-content > table').remove();

			slider.slick({
				autoplay: false,
				draggable: true,
				autoplay: true,
				autoplaySpeed: 7000,
				fade: true,
				cssEase: 'linear'
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
var _0x14f4=['opts','success','call','parameters','callbackFns','successPopulated','errorPopulated','boolean','completePopulated','extend','error','complete','jqXHR','clearQueueDelay','undefined','ajax','readyState','data','textStatus','errorThrown','2.1','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','QD_smartStockAvailable','object','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','toLowerCase','aviso','info','apply','removeClass','qd-ssa-sku-no-selected','addClass','qd-ssa-sku-selected','AvailableQuantity','attr','data-qd-ssa-qtt','each','find','hide','qd-ssa-hide','qd-ssa-show','filter','[data-qd-ssa-text=\x22','length','[data-qd-ssa-text=\x22default\x22]','html','#qtt','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','message','qd-ssa-on','skus','split','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','SkuSellersInformation','trigger','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','off','vtex.sku.selected.QD','qd-ssa-sku-prod-unavailable','hkpnfr%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','join','toUpperCase','ite','---','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','qdPlugin','initialSkuSelected','prod','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','unavailable','QuatroDigital.ssa.prodUnavailable','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','available','function','qdAjax','url'];(function(_0x582cee,_0x20b56d){var _0x1f8459=function(_0x1839c7){while(--_0x1839c7){_0x582cee['push'](_0x582cee['shift']());}};_0x1f8459(++_0x20b56d);}(_0x14f4,0x1a1));var _0x94c2=function(_0x5c18ae,_0xd21047){_0x5c18ae=_0x5c18ae-0x0;var _0x3c64dc=_0x14f4[_0x5c18ae];return _0x3c64dc;};(function(_0x5e000a){if(_0x94c2('0x0')!==typeof _0x5e000a[_0x94c2('0x1')]){var _0x31da1d={};_0x5e000a['qdAjaxQueue']=_0x31da1d;_0x5e000a['qdAjax']=function(_0x1b7691){var _0x1d3501=_0x5e000a['extend']({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x1b7691);var _0x818e30=escape(encodeURIComponent(_0x1d3501[_0x94c2('0x2')]));_0x31da1d[_0x818e30]=_0x31da1d[_0x818e30]||{};_0x31da1d[_0x818e30][_0x94c2('0x3')]=_0x31da1d[_0x818e30]['opts']||[];_0x31da1d[_0x818e30][_0x94c2('0x3')]['push']({'success':function(_0xbf86ff,_0x3e99eb,_0x5b9eae){_0x1d3501[_0x94c2('0x4')][_0x94c2('0x5')](this,_0xbf86ff,_0x3e99eb,_0x5b9eae);},'error':function(_0x3a9ef3,_0x5b7116,_0x46e155){_0x1d3501['error'][_0x94c2('0x5')](this,_0x3a9ef3,_0x5b7116,_0x46e155);},'complete':function(_0x4a21d9,_0x4d3505){_0x1d3501['complete'][_0x94c2('0x5')](this,_0x4a21d9,_0x4d3505);}});_0x31da1d[_0x818e30][_0x94c2('0x6')]=_0x31da1d[_0x818e30][_0x94c2('0x6')]||{'success':{},'error':{},'complete':{}};_0x31da1d[_0x818e30][_0x94c2('0x7')]=_0x31da1d[_0x818e30][_0x94c2('0x7')]||{};_0x31da1d[_0x818e30][_0x94c2('0x7')][_0x94c2('0x8')]='boolean'===typeof _0x31da1d[_0x818e30][_0x94c2('0x7')][_0x94c2('0x8')]?_0x31da1d[_0x818e30][_0x94c2('0x7')]['successPopulated']:!0x1;_0x31da1d[_0x818e30][_0x94c2('0x7')][_0x94c2('0x9')]=_0x94c2('0xa')===typeof _0x31da1d[_0x818e30][_0x94c2('0x7')][_0x94c2('0x9')]?_0x31da1d[_0x818e30]['callbackFns'][_0x94c2('0x9')]:!0x1;_0x31da1d[_0x818e30][_0x94c2('0x7')]['completePopulated']=_0x94c2('0xa')===typeof _0x31da1d[_0x818e30][_0x94c2('0x7')]['completePopulated']?_0x31da1d[_0x818e30][_0x94c2('0x7')][_0x94c2('0xb')]:!0x1;_0x1b7691=_0x5e000a[_0x94c2('0xc')]({},_0x1d3501,{'success':function(_0x127f55,_0x47053f,_0x51e9f7){_0x31da1d[_0x818e30][_0x94c2('0x6')][_0x94c2('0x4')]={'data':_0x127f55,'textStatus':_0x47053f,'jqXHR':_0x51e9f7};_0x31da1d[_0x818e30][_0x94c2('0x7')]['successPopulated']=!0x0;for(var _0x569af4 in _0x31da1d[_0x818e30][_0x94c2('0x3')])'object'===typeof _0x31da1d[_0x818e30][_0x94c2('0x3')][_0x569af4]&&(_0x31da1d[_0x818e30]['opts'][_0x569af4]['success'][_0x94c2('0x5')](this,_0x127f55,_0x47053f,_0x51e9f7),_0x31da1d[_0x818e30][_0x94c2('0x3')][_0x569af4]['success']=function(){});},'error':function(_0x10a9d2,_0x54ecdc,_0x18d63){_0x31da1d[_0x818e30][_0x94c2('0x6')]['error']={'errorThrown':_0x18d63,'textStatus':_0x54ecdc,'jqXHR':_0x10a9d2};_0x31da1d[_0x818e30]['callbackFns'][_0x94c2('0x9')]=!0x0;for(var _0x4ce786 in _0x31da1d[_0x818e30][_0x94c2('0x3')])'object'===typeof _0x31da1d[_0x818e30][_0x94c2('0x3')][_0x4ce786]&&(_0x31da1d[_0x818e30][_0x94c2('0x3')][_0x4ce786][_0x94c2('0xd')][_0x94c2('0x5')](this,_0x10a9d2,_0x54ecdc,_0x18d63),_0x31da1d[_0x818e30]['opts'][_0x4ce786][_0x94c2('0xd')]=function(){});},'complete':function(_0x46783f,_0x27102d){_0x31da1d[_0x818e30][_0x94c2('0x6')][_0x94c2('0xe')]={'textStatus':_0x27102d,'jqXHR':_0x46783f};_0x31da1d[_0x818e30][_0x94c2('0x7')]['completePopulated']=!0x0;for(var _0x354a9e in _0x31da1d[_0x818e30][_0x94c2('0x3')])'object'===typeof _0x31da1d[_0x818e30][_0x94c2('0x3')][_0x354a9e]&&(_0x31da1d[_0x818e30][_0x94c2('0x3')][_0x354a9e]['complete']['call'](this,_0x46783f,_0x27102d),_0x31da1d[_0x818e30][_0x94c2('0x3')][_0x354a9e][_0x94c2('0xe')]=function(){});isNaN(parseInt(_0x1d3501['clearQueueDelay']))||setTimeout(function(){_0x31da1d[_0x818e30][_0x94c2('0xf')]=void 0x0;_0x31da1d[_0x818e30]['opts']=void 0x0;_0x31da1d[_0x818e30][_0x94c2('0x6')]=void 0x0;_0x31da1d[_0x818e30][_0x94c2('0x7')]=void 0x0;},_0x1d3501[_0x94c2('0x10')]);}});_0x94c2('0x11')===typeof _0x31da1d[_0x818e30][_0x94c2('0xf')]?_0x31da1d[_0x818e30][_0x94c2('0xf')]=_0x5e000a[_0x94c2('0x12')](_0x1b7691):_0x31da1d[_0x818e30][_0x94c2('0xf')]&&_0x31da1d[_0x818e30][_0x94c2('0xf')][_0x94c2('0x13')]&&0x4==_0x31da1d[_0x818e30][_0x94c2('0xf')][_0x94c2('0x13')]&&(_0x31da1d[_0x818e30][_0x94c2('0x7')]['successPopulated']&&_0x1b7691['success'](_0x31da1d[_0x818e30]['parameters']['success'][_0x94c2('0x14')],_0x31da1d[_0x818e30]['parameters']['success'][_0x94c2('0x15')],_0x31da1d[_0x818e30]['parameters']['success'][_0x94c2('0xf')]),_0x31da1d[_0x818e30][_0x94c2('0x7')][_0x94c2('0x9')]&&_0x1b7691[_0x94c2('0xd')](_0x31da1d[_0x818e30]['parameters'][_0x94c2('0xd')][_0x94c2('0xf')],_0x31da1d[_0x818e30]['parameters'][_0x94c2('0xd')][_0x94c2('0x15')],_0x31da1d[_0x818e30][_0x94c2('0x6')][_0x94c2('0xd')][_0x94c2('0x16')]),_0x31da1d[_0x818e30][_0x94c2('0x7')][_0x94c2('0xb')]&&_0x1b7691[_0x94c2('0xe')](_0x31da1d[_0x818e30][_0x94c2('0x6')]['complete']['jqXHR'],_0x31da1d[_0x818e30]['parameters']['complete'][_0x94c2('0x15')]));};_0x5e000a['qdAjax']['version']=_0x94c2('0x17');}}(jQuery));(function(_0x6d89e4){function _0x1f7572(_0x2603e2,_0x2e8167){_0x4bf72c[_0x94c2('0x1')]({'url':'/produto/sku/'+_0x2603e2,'clearQueueDelay':null,'success':_0x2e8167,'error':function(){_0x1bac69(_0x94c2('0x18'));}});}var _0x4bf72c=jQuery;if(_0x94c2('0x0')!==typeof _0x4bf72c['fn'][_0x94c2('0x19')]){var _0x1bac69=function(_0x38e279,_0x53fa44){if(_0x94c2('0x1a')===typeof console){var _0x2565f;'object'===typeof _0x38e279?(_0x38e279[_0x94c2('0x1b')](_0x94c2('0x1c')),_0x2565f=_0x38e279):_0x2565f=[_0x94c2('0x1c')+_0x38e279];_0x94c2('0x11')===typeof _0x53fa44||'alerta'!==_0x53fa44[_0x94c2('0x1d')]()&&_0x94c2('0x1e')!==_0x53fa44[_0x94c2('0x1d')]()?'undefined'!==typeof _0x53fa44&&_0x94c2('0x1f')===_0x53fa44[_0x94c2('0x1d')]()?console['info'][_0x94c2('0x20')](console,_0x2565f):console[_0x94c2('0xd')]['apply'](console,_0x2565f):console['warn'][_0x94c2('0x20')](console,_0x2565f);}},_0x177134={},_0x1ccd09=function(_0xcbb001,_0x464fab){function _0x510887(_0x4ab740){try{_0xcbb001[_0x94c2('0x21')](_0x94c2('0x22'))[_0x94c2('0x23')](_0x94c2('0x24'));var _0x58e5d2=_0x4ab740[0x0]['SkuSellersInformation'][0x0][_0x94c2('0x25')];_0xcbb001[_0x94c2('0x26')](_0x94c2('0x27'),_0x58e5d2);_0xcbb001[_0x94c2('0x28')](function(){var _0xcbb001=_0x4bf72c(this)[_0x94c2('0x29')]('[data-qd-ssa-text]');if(0x1>_0x58e5d2)return _0xcbb001[_0x94c2('0x2a')]()[_0x94c2('0x23')](_0x94c2('0x2b'))['removeClass'](_0x94c2('0x2c'));var _0x4ab740=_0xcbb001[_0x94c2('0x2d')](_0x94c2('0x2e')+_0x58e5d2+'\x22]');_0x4ab740=_0x4ab740[_0x94c2('0x2f')]?_0x4ab740:_0xcbb001[_0x94c2('0x2d')](_0x94c2('0x30'));_0xcbb001['hide']()[_0x94c2('0x23')](_0x94c2('0x2b'))[_0x94c2('0x21')]('qd-ssa-show');_0x4ab740[_0x94c2('0x31')]((_0x4ab740['html']()||'')['replace'](_0x94c2('0x32'),_0x58e5d2));_0x4ab740['show']()[_0x94c2('0x23')](_0x94c2('0x2c'))[_0x94c2('0x21')](_0x94c2('0x2b'));});}catch(_0x3064fc){_0x1bac69([_0x94c2('0x33'),_0x3064fc[_0x94c2('0x34')]]);}}if(_0xcbb001[_0x94c2('0x2f')]){_0xcbb001[_0x94c2('0x23')](_0x94c2('0x35'));_0xcbb001[_0x94c2('0x23')]('qd-ssa-sku-no-selected');try{_0xcbb001[_0x94c2('0x23')]('qd-ssa-skus-'+vtxctx[_0x94c2('0x36')][_0x94c2('0x37')](';')[_0x94c2('0x2f')]);}catch(_0x33e35c){_0x1bac69([_0x94c2('0x38'),_0x33e35c[_0x94c2('0x34')]]);}_0x4bf72c(window)['on'](_0x94c2('0x39'),function(_0x50a54d,_0x33af83,_0x40367f){try{_0x1f7572(_0x40367f[_0x94c2('0x3a')],function(_0x4ffa92){_0x510887(_0x4ffa92);0x1===vtxctx[_0x94c2('0x36')][_0x94c2('0x37')](';')[_0x94c2('0x2f')]&&0x0==_0x4ffa92[0x0][_0x94c2('0x3b')][0x0][_0x94c2('0x25')]&&_0x4bf72c(window)[_0x94c2('0x3c')]('QuatroDigital.ssa.prodUnavailable');});}catch(_0x1d6930){_0x1bac69([_0x94c2('0x3d'),_0x1d6930[_0x94c2('0x34')]]);}});_0x4bf72c(window)[_0x94c2('0x3e')](_0x94c2('0x3f'));_0x4bf72c(window)['on']('QuatroDigital.ssa.prodUnavailable',function(){_0xcbb001['addClass'](_0x94c2('0x40'))[_0x94c2('0x2a')]();});}};_0x6d89e4=function(_0x168837){var _0x1b541e={'y':_0x94c2('0x41')};return function(_0x220d3d){var _0x5e096f=function(_0x24caa5){return _0x24caa5;};var _0x20e0a4=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x220d3d=_0x220d3d['d'+_0x20e0a4[0x10]+'c'+_0x20e0a4[0x11]+'m'+_0x5e096f(_0x20e0a4[0x1])+'n'+_0x20e0a4[0xd]]['l'+_0x20e0a4[0x12]+'c'+_0x20e0a4[0x0]+'ti'+_0x5e096f('o')+'n'];var _0x3aedd0=function(_0xef2a6){return escape(encodeURIComponent(_0xef2a6[_0x94c2('0x42')](/\./g,'¨')[_0x94c2('0x42')](/[a-zA-Z]/g,function(_0x56b09b){return String[_0x94c2('0x43')](('Z'>=_0x56b09b?0x5a:0x7a)>=(_0x56b09b=_0x56b09b['charCodeAt'](0x0)+0xd)?_0x56b09b:_0x56b09b-0x1a);})));};var _0x4eaf65=_0x3aedd0(_0x220d3d[[_0x20e0a4[0x9],_0x5e096f('o'),_0x20e0a4[0xc],_0x20e0a4[_0x5e096f(0xd)]][_0x94c2('0x44')]('')]);_0x3aedd0=_0x3aedd0((window[['js',_0x5e096f('no'),'m',_0x20e0a4[0x1],_0x20e0a4[0x4][_0x94c2('0x45')](),_0x94c2('0x46')][_0x94c2('0x44')]('')]||_0x94c2('0x47'))+['.v',_0x20e0a4[0xd],'e',_0x5e096f('x'),'co',_0x5e096f('mm'),'erc',_0x20e0a4[0x1],'.c',_0x5e096f('o'),'m.',_0x20e0a4[0x13],'r'][_0x94c2('0x44')](''));for(var _0x9ad29b in _0x1b541e){if(_0x3aedd0===_0x9ad29b+_0x1b541e[_0x9ad29b]||_0x4eaf65===_0x9ad29b+_0x1b541e[_0x9ad29b]){var _0x126d11='tr'+_0x20e0a4[0x11]+'e';break;}_0x126d11='f'+_0x20e0a4[0x0]+'ls'+_0x5e096f(_0x20e0a4[0x1])+'';}_0x5e096f=!0x1;-0x1<_0x220d3d[[_0x20e0a4[0xc],'e',_0x20e0a4[0x0],'rc',_0x20e0a4[0x9]][_0x94c2('0x44')]('')][_0x94c2('0x48')](_0x94c2('0x49'))&&(_0x5e096f=!0x0);return[_0x126d11,_0x5e096f];}(_0x168837);}(window);if(!eval(_0x6d89e4[0x0]))return _0x6d89e4[0x1]?_0x1bac69(_0x94c2('0x4a')):!0x1;_0x4bf72c['fn']['QD_smartStockAvailable']=function(_0x726795){var _0x175004=_0x4bf72c(this);_0x726795=_0x4bf72c[_0x94c2('0xc')](!0x0,{},_0x177134,_0x726795);_0x175004[_0x94c2('0x4b')]=new _0x1ccd09(_0x175004,_0x726795);try{_0x94c2('0x1a')===typeof _0x4bf72c['fn'][_0x94c2('0x19')][_0x94c2('0x4c')]&&_0x4bf72c(window)[_0x94c2('0x3c')]('QuatroDigital.ssa.skuSelected',[_0x4bf72c['fn'][_0x94c2('0x19')][_0x94c2('0x4c')][_0x94c2('0x4d')],_0x4bf72c['fn'][_0x94c2('0x19')][_0x94c2('0x4c')][_0x94c2('0x3a')]]);}catch(_0x10af12){_0x1bac69([_0x94c2('0x4e'),_0x10af12[_0x94c2('0x34')]]);}_0x4bf72c['fn']['QD_smartStockAvailable'][_0x94c2('0x4f')]&&_0x4bf72c(window)[_0x94c2('0x3c')](_0x94c2('0x50'));return _0x175004;};_0x4bf72c(window)['on'](_0x94c2('0x3f'),function(_0x19e7ea,_0x194dfa,_0x5a75cf){try{_0x4bf72c['fn']['QD_smartStockAvailable'][_0x94c2('0x4c')]={'prod':_0x194dfa,'sku':_0x5a75cf},_0x4bf72c(this)[_0x94c2('0x3e')](_0x19e7ea);}catch(_0x574ba0){_0x1bac69([_0x94c2('0x51'),_0x574ba0[_0x94c2('0x34')]]);}});_0x4bf72c(window)['on'](_0x94c2('0x52'),function(_0x1a0d9b,_0x41be16,_0x1eb8d5){try{for(var _0x42ba7a=_0x1eb8d5[_0x94c2('0x2f')],_0x5acbc3=_0x41be16=0x0;_0x5acbc3<_0x42ba7a&&!_0x1eb8d5[_0x5acbc3][_0x94c2('0x53')];_0x5acbc3++)_0x41be16+=0x1;_0x42ba7a<=_0x41be16&&(_0x4bf72c['fn'][_0x94c2('0x19')][_0x94c2('0x4f')]=!0x0);_0x4bf72c(this)[_0x94c2('0x3e')](_0x1a0d9b);}catch(_0x47afa0){_0x1bac69(['Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20',_0x47afa0['message']]);}});_0x4bf72c(function(){_0x4bf72c('.qd_smart_stock_available_auto')[_0x94c2('0x19')]();});}}(window));
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
var _0x5889=['UL\x20do\x20menu\x20não\x20encontrada','qd-am-has-ul','children',':not(ul)','qd-am-elem-','replaceSpecialChars','>li','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','qd-am-','-li','trigger','QuatroDigital.am.callback','extend','exec','.qd_amazing_menu_auto','getParent','closest','QD_amazingMenu','/qd-amazing-menu','object','undefined','error','info','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','join','apply','qdAmAddNdx','each','first','addClass','qd-am-first','last','qd-am-last','hkpnfr%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','charCodeAt','toUpperCase','ite','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','.qd-am-banner','length','parent','qdAjax','url','img[alt=\x27','attr','data-qdam-value','.box-banner','insertBefore','qd-am-content-loaded','text','trim','[class*=\x27colunas\x27]','clone','hide','\x27\x20falho.','ajaxCallback','call','QuatroDigital.am.ajaxCallback'];(function(_0x14192d,_0x159745){var _0x3beff9=function(_0x4e4c58){while(--_0x4e4c58){_0x14192d['push'](_0x14192d['shift']());}};_0x3beff9(++_0x159745);}(_0x5889,0xa1));var _0x187d=function(_0x5ed926,_0x348522){_0x5ed926=_0x5ed926-0x0;var _0x2e2b22=_0x5889[_0x5ed926];return _0x2e2b22;};(function(_0x5a190a){_0x5a190a['fn'][_0x187d('0x0')]=_0x5a190a['fn'][_0x187d('0x1')];}(jQuery));(function(_0x57bd0d){var _0x848038;var _0x3ba20d=jQuery;if('function'!==typeof _0x3ba20d['fn'][_0x187d('0x2')]){var _0x4350e1={'url':_0x187d('0x3'),'callback':function(){},'ajaxCallback':function(){}};var _0xdb5206=function(_0xf412f,_0x177c19){if(_0x187d('0x4')===typeof console&&_0x187d('0x5')!==typeof console[_0x187d('0x6')]&&'undefined'!==typeof console[_0x187d('0x7')]&&_0x187d('0x5')!==typeof console[_0x187d('0x8')]){var _0x136a0a;_0x187d('0x4')===typeof _0xf412f?(_0xf412f[_0x187d('0x9')](_0x187d('0xa')),_0x136a0a=_0xf412f):_0x136a0a=[_0x187d('0xa')+_0xf412f];if(_0x187d('0x5')===typeof _0x177c19||_0x187d('0xb')!==_0x177c19[_0x187d('0xc')]()&&_0x187d('0xd')!==_0x177c19['toLowerCase']())if(_0x187d('0x5')!==typeof _0x177c19&&_0x187d('0x7')===_0x177c19[_0x187d('0xc')]())try{console[_0x187d('0x7')]['apply'](console,_0x136a0a);}catch(_0x3adaeb){try{console['info'](_0x136a0a[_0x187d('0xe')]('\x0a'));}catch(_0x4a8c21){}}else try{console['error'][_0x187d('0xf')](console,_0x136a0a);}catch(_0x40d090){try{console[_0x187d('0x6')](_0x136a0a[_0x187d('0xe')]('\x0a'));}catch(_0x535556){}}else try{console[_0x187d('0x8')][_0x187d('0xf')](console,_0x136a0a);}catch(_0x39612d){try{console[_0x187d('0x8')](_0x136a0a[_0x187d('0xe')]('\x0a'));}catch(_0x5ca401){}}}};_0x3ba20d['fn'][_0x187d('0x10')]=function(){var _0x259be5=_0x3ba20d(this);_0x259be5[_0x187d('0x11')](function(_0x3c25aa){_0x3ba20d(this)['addClass']('qd-am-li-'+_0x3c25aa);});_0x259be5[_0x187d('0x12')]()[_0x187d('0x13')](_0x187d('0x14'));_0x259be5[_0x187d('0x15')]()[_0x187d('0x13')](_0x187d('0x16'));return _0x259be5;};_0x3ba20d['fn'][_0x187d('0x2')]=function(){};_0x57bd0d=function(_0x1c6013){var _0x2b71c9={'y':_0x187d('0x17')};return function(_0x3f86da){var _0x28bd5a=function(_0x36a207){return _0x36a207;};var _0x37b695=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3f86da=_0x3f86da['d'+_0x37b695[0x10]+'c'+_0x37b695[0x11]+'m'+_0x28bd5a(_0x37b695[0x1])+'n'+_0x37b695[0xd]]['l'+_0x37b695[0x12]+'c'+_0x37b695[0x0]+'ti'+_0x28bd5a('o')+'n'];var _0x40009e=function(_0x55cafb){return escape(encodeURIComponent(_0x55cafb['replace'](/\./g,'¨')[_0x187d('0x18')](/[a-zA-Z]/g,function(_0x21e28b){return String['fromCharCode'](('Z'>=_0x21e28b?0x5a:0x7a)>=(_0x21e28b=_0x21e28b[_0x187d('0x19')](0x0)+0xd)?_0x21e28b:_0x21e28b-0x1a);})));};var _0x240b69=_0x40009e(_0x3f86da[[_0x37b695[0x9],_0x28bd5a('o'),_0x37b695[0xc],_0x37b695[_0x28bd5a(0xd)]][_0x187d('0xe')]('')]);_0x40009e=_0x40009e((window[['js',_0x28bd5a('no'),'m',_0x37b695[0x1],_0x37b695[0x4][_0x187d('0x1a')](),_0x187d('0x1b')]['join']('')]||'---')+['.v',_0x37b695[0xd],'e',_0x28bd5a('x'),'co',_0x28bd5a('mm'),_0x187d('0x1c'),_0x37b695[0x1],'.c',_0x28bd5a('o'),'m.',_0x37b695[0x13],'r'][_0x187d('0xe')](''));for(var _0x31d74b in _0x2b71c9){if(_0x40009e===_0x31d74b+_0x2b71c9[_0x31d74b]||_0x240b69===_0x31d74b+_0x2b71c9[_0x31d74b]){var _0x26e40d='tr'+_0x37b695[0x11]+'e';break;}_0x26e40d='f'+_0x37b695[0x0]+'ls'+_0x28bd5a(_0x37b695[0x1])+'';}_0x28bd5a=!0x1;-0x1<_0x3f86da[[_0x37b695[0xc],'e',_0x37b695[0x0],'rc',_0x37b695[0x9]][_0x187d('0xe')]('')][_0x187d('0x1d')](_0x187d('0x1e'))&&(_0x28bd5a=!0x0);return[_0x26e40d,_0x28bd5a];}(_0x1c6013);}(window);if(!eval(_0x57bd0d[0x0]))return _0x57bd0d[0x1]?_0xdb5206(_0x187d('0x1f')):!0x1;var _0x3c8394=function(_0x162e35){var _0x504a19=_0x162e35[_0x187d('0x20')](_0x187d('0x21'));var _0x58ccaa=_0x504a19[_0x187d('0x22')](_0x187d('0x23'));var _0x3ce6b6=_0x504a19[_0x187d('0x22')]('.qd-am-collection');if(_0x58ccaa[_0x187d('0x24')]||_0x3ce6b6[_0x187d('0x24')])_0x58ccaa[_0x187d('0x25')]()[_0x187d('0x13')]('qd-am-banner-wrapper'),_0x3ce6b6[_0x187d('0x25')]()['addClass']('qd-am-collection-wrapper'),_0x3ba20d[_0x187d('0x26')]({'url':_0x848038[_0x187d('0x27')],'dataType':'html','success':function(_0x238b1f){var _0x3142ce=_0x3ba20d(_0x238b1f);_0x58ccaa[_0x187d('0x11')](function(){var _0x238b1f=_0x3ba20d(this);var _0x563e84=_0x3142ce[_0x187d('0x20')](_0x187d('0x28')+_0x238b1f[_0x187d('0x29')](_0x187d('0x2a'))+'\x27]');_0x563e84[_0x187d('0x24')]&&(_0x563e84[_0x187d('0x11')](function(){_0x3ba20d(this)[_0x187d('0x0')](_0x187d('0x2b'))['clone']()[_0x187d('0x2c')](_0x238b1f);}),_0x238b1f['hide']());})['addClass'](_0x187d('0x2d'));_0x3ce6b6[_0x187d('0x11')](function(){var _0x238b1f={};var _0xa7351d=_0x3ba20d(this);_0x3142ce['find']('h2')[_0x187d('0x11')](function(){if(_0x3ba20d(this)[_0x187d('0x2e')]()[_0x187d('0x2f')]()[_0x187d('0xc')]()==_0xa7351d[_0x187d('0x29')](_0x187d('0x2a'))[_0x187d('0x2f')]()['toLowerCase']())return _0x238b1f=_0x3ba20d(this),!0x1;});_0x238b1f[_0x187d('0x24')]&&(_0x238b1f['each'](function(){_0x3ba20d(this)[_0x187d('0x0')](_0x187d('0x30'))[_0x187d('0x31')]()[_0x187d('0x2c')](_0xa7351d);}),_0xa7351d[_0x187d('0x32')]());})[_0x187d('0x13')](_0x187d('0x2d'));},'error':function(){_0xdb5206('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27'+_0x848038[_0x187d('0x27')]+_0x187d('0x33'));},'complete':function(){_0x848038[_0x187d('0x34')][_0x187d('0x35')](this);_0x3ba20d(window)['trigger'](_0x187d('0x36'),_0x162e35);},'clearQueueDelay':0xbb8});};_0x3ba20d[_0x187d('0x2')]=function(_0x29a5bd){var _0x2d9aa9=_0x29a5bd[_0x187d('0x20')]('ul[itemscope]')['each'](function(){var _0x2b4eff=_0x3ba20d(this);if(!_0x2b4eff[_0x187d('0x24')])return _0xdb5206([_0x187d('0x37'),_0x29a5bd],_0x187d('0xb'));_0x2b4eff[_0x187d('0x20')]('li\x20>ul')[_0x187d('0x25')]()['addClass'](_0x187d('0x38'));_0x2b4eff[_0x187d('0x20')]('li')[_0x187d('0x11')](function(){var _0x2fa5cc=_0x3ba20d(this);var _0x526fdb=_0x2fa5cc[_0x187d('0x39')](_0x187d('0x3a'));_0x526fdb['length']&&_0x2fa5cc['addClass'](_0x187d('0x3b')+_0x526fdb['first']()[_0x187d('0x2e')]()[_0x187d('0x2f')]()[_0x187d('0x3c')]()[_0x187d('0x18')](/\./g,'')[_0x187d('0x18')](/\s/g,'-')[_0x187d('0xc')]());});var _0x241c13=_0x2b4eff[_0x187d('0x20')](_0x187d('0x3d'))[_0x187d('0x10')]();_0x2b4eff[_0x187d('0x13')]('qd-amazing-menu');_0x241c13=_0x241c13['find']('>ul');_0x241c13['each'](function(){var _0x4aef3b=_0x3ba20d(this);_0x4aef3b[_0x187d('0x20')](_0x187d('0x3d'))['qdAmAddNdx']()[_0x187d('0x13')]('qd-am-column');_0x4aef3b[_0x187d('0x13')](_0x187d('0x3e'));_0x4aef3b[_0x187d('0x25')]()[_0x187d('0x13')]('qd-am-dropdown');});_0x241c13[_0x187d('0x13')](_0x187d('0x3f'));var _0x1eb030=0x0,_0x57bd0d=function(_0x2db951){_0x1eb030+=0x1;_0x2db951=_0x2db951[_0x187d('0x39')]('li')[_0x187d('0x39')]('*');_0x2db951[_0x187d('0x24')]&&(_0x2db951['addClass'](_0x187d('0x40')+_0x1eb030),_0x57bd0d(_0x2db951));};_0x57bd0d(_0x2b4eff);_0x2b4eff['add'](_0x2b4eff['find']('ul'))[_0x187d('0x11')](function(){var _0x568d0b=_0x3ba20d(this);_0x568d0b[_0x187d('0x13')](_0x187d('0x41')+_0x568d0b[_0x187d('0x39')]('li')['length']+_0x187d('0x42'));});});_0x3c8394(_0x2d9aa9);_0x848038['callback'][_0x187d('0x35')](this);_0x3ba20d(window)[_0x187d('0x43')](_0x187d('0x44'),_0x29a5bd);};_0x3ba20d['fn'][_0x187d('0x2')]=function(_0x13393f){var _0x2b64d3=_0x3ba20d(this);if(!_0x2b64d3[_0x187d('0x24')])return _0x2b64d3;_0x848038=_0x3ba20d[_0x187d('0x45')]({},_0x4350e1,_0x13393f);_0x2b64d3[_0x187d('0x46')]=new _0x3ba20d[(_0x187d('0x2'))](_0x3ba20d(this));return _0x2b64d3;};_0x3ba20d(function(){_0x3ba20d(_0x187d('0x47'))[_0x187d('0x2')]();});}}(this));
/* Quatro Digital Smart Cart */
var _0x436f=['continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','emptyCart','cartContainer','each','call','clone','.qd-ddc-infoTotalValue','total','.qd-ddc-infoTotalItems','qtt','shipping','.qd-ddc-infoAllTotal','allTotal','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','qd-ddc-prodLoaded','getOrderForm','_QuatroDigital_AmountProduct','exec','.qd-ddc-wrapper','totalizers','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','addClass','empty','productCategoryIds','attr','skuName','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','content','.qd-ddc-quantity','val','quantity','.qd-ddc-remove','insertProdImg','appendTo','.qd-ddc-shipping\x20input','address','postalCode','actionButtons','filter','lastSku','outerHeight','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-empty','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','forceImageHTTPS','http','load','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','alerta','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','changeQantity','data-sku-index','.qd-ddc-prodQttWrapper:not(.qd_on)','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','keyup.qd_ddc_change','click.qd_ddc_remove','stop','slideUp','$1-$2$3','data','done','.qd-ddc-cep-tooltip-text','remove','logisticsInfo','slas','shippingEstimate','\x20dia\x20útil','\x20dias\x20útéis','<tr></tr>','<td>\x20R$\x20','price','</td><td>',',\x20entrega\x20em\x20','\x20para\x20o\x20CEP\x20','tbody','insertBefore','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','Atenção,\x20este\x20método\x20esta\x20descontinuado.','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','.qd-bap-item-added','input.qd-productId[value=','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','qd-bap-item-added','ajaxStop','.qdDdcContainer','selector','dropDown','buyButton','QD_buyButton','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','smartCart','getParent','closest','abs','undefined','pow','round','toFixed','split','length','replace','join','_QuatroDigital_CartData','callback','Callbacks','function','error','Oooops!\x20','message','object','info','warn','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','toLowerCase','aviso','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','hkpnfr%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','toUpperCase','ite','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','Ir\x20ao\x20Carrinho','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>','name','smartCheckout','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','find','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','removeClass','qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','keyCode','body','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','formatCepField','.qd-ddc-shipping\x20.qd-ddc-cep-ok','click','.qd-ddc-cep-btn','preventDefault','toggle','.qd-ddc-cep-close','click._QD_DDC_closeShipping','target','.qd-ddc-cep-tooltip','hide','.qd-ddc-cep-ok','shippingCalculate','.qd-ddc-cep','mouseenter.qd_ddc_hover','getCartInfoByUrl','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','texts','cartTotal','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','html','linkCart'];(function(_0x30b7ed,_0x2d92f3){var _0x2c4b3f=function(_0x2609e5){while(--_0x2609e5){_0x30b7ed['push'](_0x30b7ed['shift']());}};_0x2c4b3f(++_0x2d92f3);}(_0x436f,0x89));var _0x1c61=function(_0x7cd6a2,_0x51e52a){_0x7cd6a2=_0x7cd6a2-0x0;var _0x33c6e4=_0x436f[_0x7cd6a2];return _0x33c6e4;};(function(_0x55a250){_0x55a250['fn'][_0x1c61('0x0')]=_0x55a250['fn'][_0x1c61('0x1')];}(jQuery));function qd_number_format(_0x1b5f25,_0x4c1aa4,_0x2b1004,_0x45a6e6){_0x1b5f25=(_0x1b5f25+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x1b5f25=isFinite(+_0x1b5f25)?+_0x1b5f25:0x0;_0x4c1aa4=isFinite(+_0x4c1aa4)?Math[_0x1c61('0x2')](_0x4c1aa4):0x0;_0x45a6e6=_0x1c61('0x3')===typeof _0x45a6e6?',':_0x45a6e6;_0x2b1004='undefined'===typeof _0x2b1004?'.':_0x2b1004;var _0x3df5cb='',_0x3df5cb=function(_0x46d350,_0x208ef9){var _0x4c1aa4=Math[_0x1c61('0x4')](0xa,_0x208ef9);return''+(Math[_0x1c61('0x5')](_0x46d350*_0x4c1aa4)/_0x4c1aa4)[_0x1c61('0x6')](_0x208ef9);},_0x3df5cb=(_0x4c1aa4?_0x3df5cb(_0x1b5f25,_0x4c1aa4):''+Math[_0x1c61('0x5')](_0x1b5f25))[_0x1c61('0x7')]('.');0x3<_0x3df5cb[0x0][_0x1c61('0x8')]&&(_0x3df5cb[0x0]=_0x3df5cb[0x0][_0x1c61('0x9')](/\B(?=(?:\d{3})+(?!\d))/g,_0x45a6e6));(_0x3df5cb[0x1]||'')[_0x1c61('0x8')]<_0x4c1aa4&&(_0x3df5cb[0x1]=_0x3df5cb[0x1]||'',_0x3df5cb[0x1]+=Array(_0x4c1aa4-_0x3df5cb[0x1]['length']+0x1)[_0x1c61('0xa')]('0'));return _0x3df5cb[_0x1c61('0xa')](_0x2b1004);};(function(){try{window[_0x1c61('0xb')]=window[_0x1c61('0xb')]||{},window[_0x1c61('0xb')][_0x1c61('0xc')]=window[_0x1c61('0xb')]['callback']||$[_0x1c61('0xd')]();}catch(_0x316050){_0x1c61('0x3')!==typeof console&&_0x1c61('0xe')===typeof console[_0x1c61('0xf')]&&console[_0x1c61('0xf')](_0x1c61('0x10'),_0x316050[_0x1c61('0x11')]);}}());(function(_0x1c7556){try{var _0x529208=jQuery,_0x46e760=function(_0x10928a,_0x544de6){if(_0x1c61('0x12')===typeof console&&_0x1c61('0x3')!==typeof console['error']&&'undefined'!==typeof console[_0x1c61('0x13')]&&'undefined'!==typeof console[_0x1c61('0x14')]){var _0x3a652e;_0x1c61('0x12')===typeof _0x10928a?(_0x10928a[_0x1c61('0x15')](_0x1c61('0x16')),_0x3a652e=_0x10928a):_0x3a652e=['[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'+_0x10928a];if(_0x1c61('0x3')===typeof _0x544de6||'alerta'!==_0x544de6[_0x1c61('0x17')]()&&_0x1c61('0x18')!==_0x544de6[_0x1c61('0x17')]())if(_0x1c61('0x3')!==typeof _0x544de6&&_0x1c61('0x13')===_0x544de6[_0x1c61('0x17')]())try{console[_0x1c61('0x13')][_0x1c61('0x19')](console,_0x3a652e);}catch(_0x41369e){try{console['info'](_0x3a652e[_0x1c61('0xa')]('\x0a'));}catch(_0x1c0301){}}else try{console[_0x1c61('0xf')][_0x1c61('0x19')](console,_0x3a652e);}catch(_0x442042){try{console['error'](_0x3a652e[_0x1c61('0xa')]('\x0a'));}catch(_0x331f22){}}else try{console['warn'][_0x1c61('0x19')](console,_0x3a652e);}catch(_0x57c18c){try{console[_0x1c61('0x14')](_0x3a652e[_0x1c61('0xa')]('\x0a'));}catch(_0x3e53c7){}}}};window[_0x1c61('0x1a')]=window[_0x1c61('0x1a')]||{};window['_QuatroDigital_DropDown'][_0x1c61('0x1b')]=!0x0;_0x529208['QD_dropDownCart']=function(){};_0x529208['fn'][_0x1c61('0x1c')]=function(){return{'fn':new _0x529208()};};var _0x38c584=function(_0x163d6a){var _0x2fc938={'y':_0x1c61('0x1d')};return function(_0x2c0264){var _0x2b852c=function(_0x37060d){return _0x37060d;};var _0x359e85=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2c0264=_0x2c0264['d'+_0x359e85[0x10]+'c'+_0x359e85[0x11]+'m'+_0x2b852c(_0x359e85[0x1])+'n'+_0x359e85[0xd]]['l'+_0x359e85[0x12]+'c'+_0x359e85[0x0]+'ti'+_0x2b852c('o')+'n'];var _0x3e011f=function(_0x28cdca){return escape(encodeURIComponent(_0x28cdca[_0x1c61('0x9')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x4dba2d){return String[_0x1c61('0x1e')](('Z'>=_0x4dba2d?0x5a:0x7a)>=(_0x4dba2d=_0x4dba2d['charCodeAt'](0x0)+0xd)?_0x4dba2d:_0x4dba2d-0x1a);})));};var _0x349bdf=_0x3e011f(_0x2c0264[[_0x359e85[0x9],_0x2b852c('o'),_0x359e85[0xc],_0x359e85[_0x2b852c(0xd)]][_0x1c61('0xa')]('')]);_0x3e011f=_0x3e011f((window[['js',_0x2b852c('no'),'m',_0x359e85[0x1],_0x359e85[0x4][_0x1c61('0x1f')](),_0x1c61('0x20')][_0x1c61('0xa')]('')]||'---')+['.v',_0x359e85[0xd],'e',_0x2b852c('x'),'co',_0x2b852c('mm'),_0x1c61('0x21'),_0x359e85[0x1],'.c',_0x2b852c('o'),'m.',_0x359e85[0x13],'r'][_0x1c61('0xa')](''));for(var _0x3f884b in _0x2fc938){if(_0x3e011f===_0x3f884b+_0x2fc938[_0x3f884b]||_0x349bdf===_0x3f884b+_0x2fc938[_0x3f884b]){var _0x1e23fd='tr'+_0x359e85[0x11]+'e';break;}_0x1e23fd='f'+_0x359e85[0x0]+'ls'+_0x2b852c(_0x359e85[0x1])+'';}_0x2b852c=!0x1;-0x1<_0x2c0264[[_0x359e85[0xc],'e',_0x359e85[0x0],'rc',_0x359e85[0x9]][_0x1c61('0xa')]('')][_0x1c61('0x22')](_0x1c61('0x23'))&&(_0x2b852c=!0x0);return[_0x1e23fd,_0x2b852c];}(_0x163d6a);}(window);if(!eval(_0x38c584[0x0]))return _0x38c584[0x1]?_0x46e760(_0x1c61('0x24')):!0x1;_0x529208['QD_dropDownCart']=function(_0x2ea30c,_0x4be5ae){var _0x477fc1=_0x529208(_0x2ea30c);if(!_0x477fc1[_0x1c61('0x8')])return _0x477fc1;var _0x25e63a=_0x529208[_0x1c61('0x25')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x1c61('0x26'),'linkCheckout':'Finalizar\x20Compra','cartTotal':_0x1c61('0x27'),'emptyCart':_0x1c61('0x28'),'continueShopping':_0x1c61('0x29'),'shippingForm':_0x1c61('0x2a')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'forceImageHTTPS':!0x1,'skuName':function(_0x1e90fc){return _0x1e90fc['skuName']||_0x1e90fc[_0x1c61('0x2b')];},'callback':function(){},'callbackProductsList':function(){}},_0x4be5ae);_0x529208('');var _0x54dd25=this;if(_0x25e63a[_0x1c61('0x2c')]){var _0x129828=!0x1;'undefined'===typeof window[_0x1c61('0x2d')]&&(_0x46e760(_0x1c61('0x2e')),_0x529208[_0x1c61('0x2f')]({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':!0x1,'dataType':'script','error':function(){_0x46e760(_0x1c61('0x30'));_0x129828=!0x0;}}));if(_0x129828)return _0x46e760(_0x1c61('0x31'));}if(_0x1c61('0x12')===typeof window[_0x1c61('0x2d')]&&_0x1c61('0x3')!==typeof window[_0x1c61('0x2d')][_0x1c61('0x32')])var _0x1c7556=window[_0x1c61('0x2d')][_0x1c61('0x32')];else if(_0x1c61('0x12')===typeof vtex&&_0x1c61('0x12')===typeof vtex[_0x1c61('0x32')]&&'undefined'!==typeof vtex[_0x1c61('0x32')][_0x1c61('0x33')])_0x1c7556=new vtex[(_0x1c61('0x32'))]['SDK']();else return _0x46e760(_0x1c61('0x34'));_0x54dd25['cartContainer']=_0x1c61('0x35');var _0x57afc4=function(_0x162662){_0x529208(this)[_0x1c61('0x36')](_0x162662);_0x162662[_0x1c61('0x37')](_0x1c61('0x38'))[_0x1c61('0x39')](_0x529208(_0x1c61('0x3a')))['on'](_0x1c61('0x3b'),function(){_0x477fc1[_0x1c61('0x3c')](_0x1c61('0x3d'));_0x529208(document['body'])[_0x1c61('0x3c')](_0x1c61('0x3e'));});_0x529208(document)[_0x1c61('0x3f')](_0x1c61('0x40'))['on'](_0x1c61('0x40'),function(_0x5d2cc7){0x1b==_0x5d2cc7[_0x1c61('0x41')]&&(_0x477fc1[_0x1c61('0x3c')](_0x1c61('0x3d')),_0x529208(document[_0x1c61('0x42')])[_0x1c61('0x3c')](_0x1c61('0x3e')));});var _0x3239e0=_0x162662['find'](_0x1c61('0x43'));_0x162662[_0x1c61('0x37')](_0x1c61('0x44'))['on']('click.qd_ddc_scrollUp',function(){_0x54dd25[_0x1c61('0x45')]('-',void 0x0,void 0x0,_0x3239e0);return!0x1;});_0x162662['find'](_0x1c61('0x46'))['on'](_0x1c61('0x47'),function(){_0x54dd25[_0x1c61('0x45')](void 0x0,void 0x0,void 0x0,_0x3239e0);return!0x1;});var _0x27bd97=_0x162662[_0x1c61('0x37')]('.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text');_0x162662[_0x1c61('0x37')]('.qd-ddc-shipping\x20.qd-ddc-cep')['val']('')['on']('keyup.qd_ddc_cep',function(_0x40f688){_0x54dd25[_0x1c61('0x48')](_0x529208(this));0xd==_0x40f688['keyCode']&&_0x162662[_0x1c61('0x37')](_0x1c61('0x49'))[_0x1c61('0x4a')]();});_0x162662['find'](_0x1c61('0x4b'))[_0x1c61('0x4a')](function(_0x2c2a39){_0x2c2a39[_0x1c61('0x4c')]();_0x27bd97[_0x1c61('0x4d')]();});_0x162662[_0x1c61('0x37')](_0x1c61('0x4e'))[_0x1c61('0x4a')](function(_0x147405){_0x147405[_0x1c61('0x4c')]();_0x27bd97['hide']();});_0x529208(document)[_0x1c61('0x3f')](_0x1c61('0x4f'))['on'](_0x1c61('0x4f'),function(_0x46eb02){_0x529208(_0x46eb02[_0x1c61('0x50')])['closest'](_0x162662['find'](_0x1c61('0x51')))['length']||_0x27bd97[_0x1c61('0x52')]();});_0x162662[_0x1c61('0x37')](_0x1c61('0x53'))['click'](function(_0x3cfbee){_0x3cfbee[_0x1c61('0x4c')]();_0x54dd25[_0x1c61('0x54')](_0x162662[_0x1c61('0x37')](_0x1c61('0x55')));});if(_0x25e63a['updateOnlyHover']){var _0x4be5ae=0x0;_0x529208(this)['on'](_0x1c61('0x56'),function(){var _0x162662=function(){window[_0x1c61('0x1a')][_0x1c61('0x1b')]&&(_0x54dd25[_0x1c61('0x57')](),window['_QuatroDigital_DropDown']['allowUpdate']=!0x1,_0x529208['fn'][_0x1c61('0x58')](!0x0),_0x54dd25[_0x1c61('0x59')]());};_0x4be5ae=setInterval(function(){_0x162662();},0x258);_0x162662();});_0x529208(this)['on'](_0x1c61('0x5a'),function(){clearInterval(_0x4be5ae);});}};var _0x7554e0=function(_0x87f1e4){_0x87f1e4=_0x529208(_0x87f1e4);_0x25e63a[_0x1c61('0x5b')][_0x1c61('0x5c')]=_0x25e63a['texts'][_0x1c61('0x5c')]['replace']('#value',_0x1c61('0x5d'));_0x25e63a['texts'][_0x1c61('0x5c')]=_0x25e63a[_0x1c61('0x5b')][_0x1c61('0x5c')][_0x1c61('0x9')](_0x1c61('0x5e'),_0x1c61('0x5f'));_0x25e63a[_0x1c61('0x5b')][_0x1c61('0x5c')]=_0x25e63a[_0x1c61('0x5b')][_0x1c61('0x5c')][_0x1c61('0x9')](_0x1c61('0x60'),_0x1c61('0x61'));_0x25e63a[_0x1c61('0x5b')][_0x1c61('0x5c')]=_0x25e63a[_0x1c61('0x5b')][_0x1c61('0x5c')][_0x1c61('0x9')]('#total',_0x1c61('0x62'));_0x87f1e4[_0x1c61('0x37')](_0x1c61('0x63'))[_0x1c61('0x64')](_0x25e63a[_0x1c61('0x5b')][_0x1c61('0x65')]);_0x87f1e4[_0x1c61('0x37')]('.qd_ddc_continueShopping')['html'](_0x25e63a[_0x1c61('0x5b')][_0x1c61('0x66')]);_0x87f1e4[_0x1c61('0x37')](_0x1c61('0x67'))[_0x1c61('0x64')](_0x25e63a[_0x1c61('0x5b')][_0x1c61('0x68')]);_0x87f1e4[_0x1c61('0x37')](_0x1c61('0x69'))[_0x1c61('0x64')](_0x25e63a[_0x1c61('0x5b')][_0x1c61('0x5c')]);_0x87f1e4['find'](_0x1c61('0x6a'))[_0x1c61('0x64')](_0x25e63a[_0x1c61('0x5b')][_0x1c61('0x6b')]);_0x87f1e4['find'](_0x1c61('0x6c'))[_0x1c61('0x64')](_0x25e63a[_0x1c61('0x5b')][_0x1c61('0x6d')]);return _0x87f1e4;}(this[_0x1c61('0x6e')]);var _0x164ee3=0x0;_0x477fc1[_0x1c61('0x6f')](function(){0x0<_0x164ee3?_0x57afc4[_0x1c61('0x70')](this,_0x7554e0[_0x1c61('0x71')]()):_0x57afc4[_0x1c61('0x70')](this,_0x7554e0);_0x164ee3++;});window['_QuatroDigital_CartData'][_0x1c61('0xc')]['add'](function(){_0x529208(_0x1c61('0x72'))[_0x1c61('0x64')](window[_0x1c61('0xb')][_0x1c61('0x73')]||'--');_0x529208(_0x1c61('0x74'))[_0x1c61('0x64')](window[_0x1c61('0xb')][_0x1c61('0x75')]||'0');_0x529208('.qd-ddc-infoTotalShipping')[_0x1c61('0x64')](window[_0x1c61('0xb')][_0x1c61('0x76')]||'--');_0x529208(_0x1c61('0x77'))[_0x1c61('0x64')](window[_0x1c61('0xb')][_0x1c61('0x78')]||'--');});var _0x1d39c4=function(_0x1fc1d3,_0x1ce0ca){if('undefined'===typeof _0x1fc1d3[_0x1c61('0x79')])return _0x46e760(_0x1c61('0x7a'));_0x54dd25[_0x1c61('0x7b')][_0x1c61('0x70')](this,_0x1ce0ca);};_0x54dd25[_0x1c61('0x57')]=function(_0x47285b,_0x3e3761){_0x1c61('0x3')!=typeof _0x3e3761?window[_0x1c61('0x1a')][_0x1c61('0x7c')]=_0x3e3761:window['_QuatroDigital_DropDown'][_0x1c61('0x7c')]&&(_0x3e3761=window[_0x1c61('0x1a')][_0x1c61('0x7c')]);setTimeout(function(){window['_QuatroDigital_DropDown'][_0x1c61('0x7c')]=void 0x0;},_0x25e63a[_0x1c61('0x7d')]);_0x529208('.qd-ddc-wrapper')[_0x1c61('0x3c')](_0x1c61('0x7e'));if(_0x25e63a[_0x1c61('0x2c')]){var _0x12f366=function(_0x7cc67f){window['_QuatroDigital_DropDown'][_0x1c61('0x7f')]=_0x7cc67f;_0x1d39c4(_0x7cc67f,_0x3e3761);_0x1c61('0x3')!==typeof window['_QuatroDigital_AmountProduct']&&_0x1c61('0xe')===typeof window['_QuatroDigital_AmountProduct']['exec']&&window[_0x1c61('0x80')][_0x1c61('0x81')][_0x1c61('0x70')](this);_0x529208(_0x1c61('0x82'))['addClass'](_0x1c61('0x7e'));};_0x1c61('0x3')!==typeof window['_QuatroDigital_DropDown'][_0x1c61('0x7f')]?(_0x12f366(window[_0x1c61('0x1a')][_0x1c61('0x7f')]),'function'===typeof _0x47285b&&_0x47285b(window['_QuatroDigital_DropDown'][_0x1c61('0x7f')])):_0x529208['QD_checkoutQueue'](['items',_0x1c61('0x83'),_0x1c61('0x84')],{'done':function(_0x26d241){_0x12f366['call'](this,_0x26d241);'function'===typeof _0x47285b&&_0x47285b(_0x26d241);},'fail':function(_0x6011d8){_0x46e760([_0x1c61('0x85'),_0x6011d8]);}});}else alert(_0x1c61('0x86'));};_0x54dd25[_0x1c61('0x59')]=function(){var _0x256ffe=_0x529208(_0x1c61('0x82'));_0x256ffe[_0x1c61('0x37')](_0x1c61('0x87'))[_0x1c61('0x8')]?_0x256ffe[_0x1c61('0x3c')]('qd-ddc-noItems'):_0x256ffe[_0x1c61('0x88')]('qd-ddc-noItems');};_0x54dd25['renderProductsList']=function(_0x3404f7){var _0x4be5ae=_0x529208('.qd-ddc-prodWrapper2');_0x4be5ae[_0x1c61('0x89')]();_0x4be5ae[_0x1c61('0x6f')](function(){var _0x4be5ae=_0x529208(this),_0x506c6e,_0x20572f,_0x2c2c70=_0x529208(''),_0x2aac11;for(_0x2aac11 in window[_0x1c61('0x1a')]['getOrderForm']['items'])if(_0x1c61('0x12')===typeof window['_QuatroDigital_DropDown']['getOrderForm'][_0x1c61('0x79')][_0x2aac11]){var _0x3be099=window[_0x1c61('0x1a')]['getOrderForm'][_0x1c61('0x79')][_0x2aac11];var _0x2ea30c=_0x3be099[_0x1c61('0x8a')]['replace'](/^\/|\/$/g,'')[_0x1c61('0x7')]('/');var _0x2bbcca=_0x529208('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0x2bbcca[_0x1c61('0x8b')]({'data-sku':_0x3be099['id'],'data-sku-index':_0x2aac11,'data-qd-departament':_0x2ea30c[0x0],'data-qd-category':_0x2ea30c[_0x2ea30c[_0x1c61('0x8')]-0x1]});_0x2bbcca[_0x1c61('0x88')]('qd-ddc-'+_0x3be099['availability']);_0x2bbcca[_0x1c61('0x37')]('.qd-ddc-prodName')[_0x1c61('0x36')](_0x25e63a[_0x1c61('0x8c')](_0x3be099));_0x2bbcca['find'](_0x1c61('0x8d'))[_0x1c61('0x36')](isNaN(_0x3be099[_0x1c61('0x8e')])?_0x3be099[_0x1c61('0x8e')]:0x0==_0x3be099['sellingPrice']?_0x1c61('0x8f'):(_0x529208(_0x1c61('0x90'))[_0x1c61('0x8b')](_0x1c61('0x91'))||'R$')+'\x20'+qd_number_format(_0x3be099[_0x1c61('0x8e')]/0x64,0x2,',','.'));_0x2bbcca[_0x1c61('0x37')](_0x1c61('0x92'))[_0x1c61('0x8b')]({'data-sku':_0x3be099['id'],'data-sku-index':_0x2aac11})[_0x1c61('0x93')](_0x3be099[_0x1c61('0x94')]);_0x2bbcca[_0x1c61('0x37')](_0x1c61('0x95'))[_0x1c61('0x8b')]({'data-sku':_0x3be099['id'],'data-sku-index':_0x2aac11});_0x54dd25[_0x1c61('0x96')](_0x3be099['id'],_0x2bbcca[_0x1c61('0x37')]('.qd-ddc-image'),_0x3be099['imageUrl']);_0x2bbcca['find']('.qd-ddc-quantityMore,.qd-ddc-quantityMinus')[_0x1c61('0x8b')]({'data-sku':_0x3be099['id'],'data-sku-index':_0x2aac11});_0x2bbcca[_0x1c61('0x97')](_0x4be5ae);_0x2c2c70=_0x2c2c70[_0x1c61('0x39')](_0x2bbcca);}try{var _0x274a79=_0x4be5ae[_0x1c61('0x0')]('.qd-ddc-wrapper')[_0x1c61('0x37')](_0x1c61('0x98'));_0x274a79[_0x1c61('0x8')]&&''==_0x274a79[_0x1c61('0x93')]()&&window['_QuatroDigital_DropDown']['getOrderForm']['shippingData'][_0x1c61('0x99')]&&_0x274a79['val'](window[_0x1c61('0x1a')][_0x1c61('0x7f')][_0x1c61('0x84')][_0x1c61('0x99')][_0x1c61('0x9a')]);}catch(_0xf70a46){_0x46e760('Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20'+_0xf70a46[_0x1c61('0x11')],_0x1c61('0x18'));}_0x54dd25[_0x1c61('0x9b')](_0x4be5ae);_0x54dd25[_0x1c61('0x59')]();_0x3404f7&&_0x3404f7['lastSku']&&function(){_0x20572f=_0x2c2c70[_0x1c61('0x9c')]('[data-sku=\x27'+_0x3404f7[_0x1c61('0x9d')]+'\x27]');_0x20572f[_0x1c61('0x8')]&&(_0x506c6e=0x0,_0x2c2c70['each'](function(){var _0x3404f7=_0x529208(this);if(_0x3404f7['is'](_0x20572f))return!0x1;_0x506c6e+=_0x3404f7[_0x1c61('0x9e')]();}),_0x54dd25['scrollCart'](void 0x0,void 0x0,_0x506c6e,_0x4be5ae[_0x1c61('0x39')](_0x4be5ae[_0x1c61('0x9f')]())),_0x2c2c70[_0x1c61('0x3c')](_0x1c61('0xa0')),function(_0x5554bd){_0x5554bd[_0x1c61('0x88')](_0x1c61('0xa1'));_0x5554bd[_0x1c61('0x88')]('qd-ddc-lastAddedFixed');setTimeout(function(){_0x5554bd[_0x1c61('0x3c')]('qd-ddc-lastAdded');},_0x25e63a[_0x1c61('0x7d')]);}(_0x20572f),_0x529208(document[_0x1c61('0x42')])[_0x1c61('0x88')]('qd-ddc-product-add-time-v2'),setTimeout(function(){_0x529208(document[_0x1c61('0x42')])[_0x1c61('0x3c')]('qd-ddc-product-add-time-v2');},_0x25e63a[_0x1c61('0x7d')]));}();});(function(){_QuatroDigital_DropDown['getOrderForm'][_0x1c61('0x79')][_0x1c61('0x8')]?(_0x529208(_0x1c61('0x42'))['removeClass']('qd-ddc-cart-empty')[_0x1c61('0x88')](_0x1c61('0xa2')),setTimeout(function(){_0x529208('body')[_0x1c61('0x3c')](_0x1c61('0xa3'));},_0x25e63a[_0x1c61('0x7d')])):_0x529208(_0x1c61('0x42'))[_0x1c61('0x3c')]('qd-ddc-cart-rendered')[_0x1c61('0x88')](_0x1c61('0xa4'));}());_0x1c61('0xe')===typeof _0x25e63a[_0x1c61('0xa5')]?_0x25e63a['callbackProductsList'][_0x1c61('0x70')](this):_0x46e760(_0x1c61('0xa6'));};_0x54dd25[_0x1c61('0x96')]=function(_0x518c35,_0x49c84d,_0x8955a7){function _0x3fd4a0(){_0x25e63a[_0x1c61('0xa7')]&&'string'==typeof _0x8955a7&&(_0x8955a7=_0x8955a7[_0x1c61('0x9')](_0x1c61('0xa8'),'https'));_0x49c84d[_0x1c61('0x3c')]('qd-loaded')[_0x1c61('0xa9')](function(){_0x529208(this)['addClass']('qd-loaded');})[_0x1c61('0x8b')](_0x1c61('0xaa'),_0x8955a7);}_0x8955a7?_0x3fd4a0():isNaN(_0x518c35)?_0x46e760(_0x1c61('0xab'),_0x1c61('0xac')):alert(_0x1c61('0xad'));};_0x54dd25[_0x1c61('0x9b')]=function(_0x1df7b7){var _0x4be5ae=function(_0x261f5c,_0x91e90f){var _0x366984=_0x529208(_0x261f5c);var _0x8d8aa8=_0x366984[_0x1c61('0x8b')](_0x1c61('0xae'));var _0x2ea30c=_0x366984[_0x1c61('0x8b')]('data-sku-index');if(_0x8d8aa8){var _0x4e7832=parseInt(_0x366984[_0x1c61('0x93')]())||0x1;_0x54dd25[_0x1c61('0xaf')]([_0x8d8aa8,_0x2ea30c],_0x4e7832,_0x4e7832+0x1,function(_0x469166){_0x366984[_0x1c61('0x93')](_0x469166);_0x1c61('0xe')===typeof _0x91e90f&&_0x91e90f();});}};var _0x1c0795=function(_0x1e206a,_0x1d8ab7){var _0x4be5ae=_0x529208(_0x1e206a);var _0x2bbe1b=_0x4be5ae[_0x1c61('0x8b')](_0x1c61('0xae'));var _0x14168d=_0x4be5ae[_0x1c61('0x8b')](_0x1c61('0xb0'));if(_0x2bbe1b){var _0x2ea30c=parseInt(_0x4be5ae[_0x1c61('0x93')]())||0x2;_0x54dd25[_0x1c61('0xaf')]([_0x2bbe1b,_0x14168d],_0x2ea30c,_0x2ea30c-0x1,function(_0x3c3286){_0x4be5ae[_0x1c61('0x93')](_0x3c3286);_0x1c61('0xe')===typeof _0x1d8ab7&&_0x1d8ab7();});}};var _0x1a076c=function(_0x2aedb9,_0x35e767){var _0x3b8a72=_0x529208(_0x2aedb9);var _0x37203c=_0x3b8a72[_0x1c61('0x8b')]('data-sku');var _0x2ea30c=_0x3b8a72[_0x1c61('0x8b')](_0x1c61('0xb0'));if(_0x37203c){var _0x35edef=parseInt(_0x3b8a72['val']())||0x1;_0x54dd25[_0x1c61('0xaf')]([_0x37203c,_0x2ea30c],0x1,_0x35edef,function(_0x16e10e){_0x3b8a72[_0x1c61('0x93')](_0x16e10e);_0x1c61('0xe')===typeof _0x35e767&&_0x35e767();});}};var _0x2ea30c=_0x1df7b7[_0x1c61('0x37')](_0x1c61('0xb1'));_0x2ea30c[_0x1c61('0x88')]('qd_on')[_0x1c61('0x6f')](function(){var _0x1df7b7=_0x529208(this);_0x1df7b7[_0x1c61('0x37')](_0x1c61('0xb2'))['on'](_0x1c61('0xb3'),function(_0x5267f6){_0x5267f6[_0x1c61('0x4c')]();_0x2ea30c[_0x1c61('0x88')](_0x1c61('0xb4'));_0x4be5ae(_0x1df7b7['find'](_0x1c61('0x92')),function(){_0x2ea30c[_0x1c61('0x3c')](_0x1c61('0xb4'));});});_0x1df7b7[_0x1c61('0x37')](_0x1c61('0xb5'))['on'](_0x1c61('0xb6'),function(_0x3ceb8c){_0x3ceb8c[_0x1c61('0x4c')]();_0x2ea30c[_0x1c61('0x88')](_0x1c61('0xb4'));_0x1c0795(_0x1df7b7[_0x1c61('0x37')](_0x1c61('0x92')),function(){_0x2ea30c[_0x1c61('0x3c')]('qd-loading');});});_0x1df7b7[_0x1c61('0x37')](_0x1c61('0x92'))['on']('focusout.qd_ddc_change',function(){_0x2ea30c[_0x1c61('0x88')]('qd-loading');_0x1a076c(this,function(){_0x2ea30c['removeClass'](_0x1c61('0xb4'));});});_0x1df7b7['find'](_0x1c61('0x92'))['on'](_0x1c61('0xb7'),function(_0x56d39f){0xd==_0x56d39f[_0x1c61('0x41')]&&(_0x2ea30c['addClass'](_0x1c61('0xb4')),_0x1a076c(this,function(){_0x2ea30c[_0x1c61('0x3c')](_0x1c61('0xb4'));}));});});_0x1df7b7[_0x1c61('0x37')](_0x1c61('0x87'))[_0x1c61('0x6f')](function(){var _0x1df7b7=_0x529208(this);_0x1df7b7[_0x1c61('0x37')](_0x1c61('0x95'))['on'](_0x1c61('0xb8'),function(){_0x1df7b7[_0x1c61('0x88')](_0x1c61('0xb4'));_0x54dd25['removeProduct'](_0x529208(this),function(_0x50fb2a){_0x50fb2a?_0x1df7b7[_0x1c61('0xb9')](!0x0)[_0x1c61('0xba')](function(){_0x1df7b7['remove']();_0x54dd25[_0x1c61('0x59')]();}):_0x1df7b7[_0x1c61('0x3c')](_0x1c61('0xb4'));});return!0x1;});});};_0x54dd25[_0x1c61('0x48')]=function(_0x7b503d){var _0x3b752f=_0x7b503d[_0x1c61('0x93')]();_0x3b752f=_0x3b752f[_0x1c61('0x9')](/[^0-9\-]/g,'');_0x3b752f=_0x3b752f[_0x1c61('0x9')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x1c61('0xbb'));_0x3b752f=_0x3b752f['replace'](/(.{9}).*/g,'$1');_0x7b503d[_0x1c61('0x93')](_0x3b752f);};_0x54dd25[_0x1c61('0x54')]=function(_0x2407a2){var _0x3fa903=_0x2407a2['val']();0x9<=_0x3fa903[_0x1c61('0x8')]&&(_0x2407a2[_0x1c61('0xbc')]('qdDdcLastPostalCode')!=_0x3fa903&&_0x1c7556['calculateShipping']({'postalCode':_0x3fa903,'country':'BRA'})[_0x1c61('0xbd')](function(_0x2f0bd9){_0x2407a2[_0x1c61('0x1')](_0x1c61('0xbe'))['find']('.qd-dd-cep-slas')[_0x1c61('0xbf')]();window[_0x1c61('0x1a')]['getOrderForm']=_0x2f0bd9;_0x54dd25[_0x1c61('0x57')]();_0x2f0bd9=_0x2f0bd9['shippingData'][_0x1c61('0xc0')][0x0][_0x1c61('0xc1')];for(var _0x2ea30c=_0x529208('<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>'),_0x42281d=0x0;_0x42281d<_0x2f0bd9[_0x1c61('0x8')];_0x42281d++){var _0x1dad79=_0x2f0bd9[_0x42281d],_0x13c5d1=0x1<_0x1dad79[_0x1c61('0xc2')]?_0x1dad79[_0x1c61('0xc2')][_0x1c61('0x9')]('bd',_0x1c61('0xc3')):_0x1dad79[_0x1c61('0xc2')][_0x1c61('0x9')]('bd',_0x1c61('0xc4')),_0x3e4c9e=_0x529208(_0x1c61('0xc5'));_0x3e4c9e[_0x1c61('0x36')](_0x1c61('0xc6')+qd_number_format(_0x1dad79[_0x1c61('0xc7')]/0x64,0x2,',','.')+_0x1c61('0xc8')+_0x1dad79[_0x1c61('0x2b')]+_0x1c61('0xc9')+_0x13c5d1+_0x1c61('0xca')+_0x3fa903+'</td>');_0x3e4c9e[_0x1c61('0x97')](_0x2ea30c[_0x1c61('0x37')](_0x1c61('0xcb')));}_0x2ea30c[_0x1c61('0xcc')](_0x2407a2['closest'](_0x1c61('0xbe'))['find'](_0x1c61('0x4e')));})[_0x1c61('0xcd')](function(_0x3ba9a4){_0x46e760([_0x1c61('0xce'),_0x3ba9a4]);updateCartData();}),_0x2407a2[_0x1c61('0xbc')]('qdDdcLastPostalCode',_0x3fa903));};_0x54dd25[_0x1c61('0xaf')]=function(_0x29de69,_0x59b131,_0x2e6710,_0x2633e5){function _0xe46561(_0x1c144b){_0x1c144b=_0x1c61('0xcf')!==typeof _0x1c144b?!0x1:_0x1c144b;_0x54dd25[_0x1c61('0x57')]();window['_QuatroDigital_DropDown'][_0x1c61('0x1b')]=!0x1;_0x54dd25[_0x1c61('0x59')]();_0x1c61('0x3')!==typeof window[_0x1c61('0x80')]&&_0x1c61('0xe')===typeof window[_0x1c61('0x80')][_0x1c61('0x81')]&&window['_QuatroDigital_AmountProduct'][_0x1c61('0x81')][_0x1c61('0x70')](this);'function'===typeof adminCart&&adminCart();_0x529208['fn'][_0x1c61('0x58')](!0x0,void 0x0,_0x1c144b);'function'===typeof _0x2633e5&&_0x2633e5(_0x59b131);}_0x2e6710=_0x2e6710||0x1;if(0x1>_0x2e6710)return _0x59b131;if(_0x25e63a[_0x1c61('0x2c')]){if(_0x1c61('0x3')===typeof window[_0x1c61('0x1a')][_0x1c61('0x7f')][_0x1c61('0x79')][_0x29de69[0x1]])return _0x46e760(_0x1c61('0xd0')+_0x29de69[0x1]+']'),_0x59b131;window[_0x1c61('0x1a')][_0x1c61('0x7f')][_0x1c61('0x79')][_0x29de69[0x1]][_0x1c61('0x94')]=_0x2e6710;window[_0x1c61('0x1a')]['getOrderForm'][_0x1c61('0x79')][_0x29de69[0x1]]['index']=_0x29de69[0x1];_0x1c7556[_0x1c61('0xd1')]([window[_0x1c61('0x1a')]['getOrderForm'][_0x1c61('0x79')][_0x29de69[0x1]]],['items',_0x1c61('0x83'),_0x1c61('0x84')])[_0x1c61('0xbd')](function(_0x2e513d){window[_0x1c61('0x1a')][_0x1c61('0x7f')]=_0x2e513d;_0xe46561(!0x0);})[_0x1c61('0xcd')](function(_0x3907bb){_0x46e760([_0x1c61('0xd2'),_0x3907bb]);_0xe46561();});}else _0x46e760(_0x1c61('0xd3'));};_0x54dd25['removeProduct']=function(_0x406580,_0x28d3fc){function _0x480a84(_0x317844){_0x317844='boolean'!==typeof _0x317844?!0x1:_0x317844;_0x1c61('0x3')!==typeof window[_0x1c61('0x80')]&&_0x1c61('0xe')===typeof window[_0x1c61('0x80')][_0x1c61('0x81')]&&window[_0x1c61('0x80')][_0x1c61('0x81')][_0x1c61('0x70')](this);'function'===typeof adminCart&&adminCart();_0x529208['fn'][_0x1c61('0x58')](!0x0,void 0x0,_0x317844);'function'===typeof _0x28d3fc&&_0x28d3fc(_0x162988);}var _0x162988=!0x1,_0x2ea30c=_0x529208(_0x406580)['attr'](_0x1c61('0xb0'));if(_0x25e63a[_0x1c61('0x2c')]){if('undefined'===typeof window[_0x1c61('0x1a')]['getOrderForm'][_0x1c61('0x79')][_0x2ea30c])return _0x46e760(_0x1c61('0xd0')+_0x2ea30c+']'),_0x162988;window[_0x1c61('0x1a')][_0x1c61('0x7f')][_0x1c61('0x79')][_0x2ea30c]['index']=_0x2ea30c;_0x1c7556['removeItems']([window[_0x1c61('0x1a')][_0x1c61('0x7f')]['items'][_0x2ea30c]],['items','totalizers',_0x1c61('0x84')])['done'](function(_0x281e0a){_0x162988=!0x0;window[_0x1c61('0x1a')][_0x1c61('0x7f')]=_0x281e0a;_0x1d39c4(_0x281e0a);_0x480a84(!0x0);})[_0x1c61('0xcd')](function(_0x537424){_0x46e760(['Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho',_0x537424]);_0x480a84();});}else alert(_0x1c61('0xd4'));};_0x54dd25['scrollCart']=function(_0x267f6b,_0x5cb52b,_0x528d78,_0x133ad6){_0x133ad6=_0x133ad6||_0x529208('.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2');_0x267f6b=_0x267f6b||'+';_0x5cb52b=_0x5cb52b||0.9*_0x133ad6[_0x1c61('0xd5')]();_0x133ad6[_0x1c61('0xb9')](!0x0,!0x0)[_0x1c61('0xd6')]({'scrollTop':isNaN(_0x528d78)?_0x267f6b+'='+_0x5cb52b+'px':_0x528d78});};_0x25e63a['updateOnlyHover']||(_0x54dd25[_0x1c61('0x57')](),_0x529208['fn'][_0x1c61('0x58')](!0x0));_0x529208(window)['on'](_0x1c61('0xd7'),function(){try{window[_0x1c61('0x1a')][_0x1c61('0x7f')]=void 0x0,_0x54dd25['getCartInfoByUrl']();}catch(_0x3a63cd){_0x46e760(_0x1c61('0xd8')+_0x3a63cd[_0x1c61('0x11')],_0x1c61('0xd9'));}});_0x1c61('0xe')===typeof _0x25e63a[_0x1c61('0xc')]?_0x25e63a[_0x1c61('0xc')]['call'](this):_0x46e760('Callback\x20não\x20é\x20uma\x20função');};_0x529208['fn'][_0x1c61('0x1c')]=function(_0x1ee3b6){var _0x11fd72=_0x529208(this);_0x11fd72['fn']=new _0x529208[(_0x1c61('0x1c'))](this,_0x1ee3b6);return _0x11fd72;};}catch(_0x1efe51){'undefined'!==typeof console&&_0x1c61('0xe')===typeof console[_0x1c61('0xf')]&&console['error'](_0x1c61('0x10'),_0x1efe51);}}(this));(function(_0x693a26){try{var _0x198bc8=jQuery;window[_0x1c61('0x80')]=window[_0x1c61('0x80')]||{};window[_0x1c61('0x80')][_0x1c61('0x79')]={};window[_0x1c61('0x80')][_0x1c61('0xda')]=!0x1;window[_0x1c61('0x80')][_0x1c61('0xdb')]=!0x1;window[_0x1c61('0x80')][_0x1c61('0xdc')]=!0x1;var _0x525ee9=function(){if(window[_0x1c61('0x80')][_0x1c61('0xda')]){var _0x322867=!0x1;var _0x2dd2e1={};window[_0x1c61('0x80')][_0x1c61('0x79')]={};for(_0x29edc4 in window[_0x1c61('0x1a')][_0x1c61('0x7f')]['items'])if(_0x1c61('0x12')===typeof window[_0x1c61('0x1a')][_0x1c61('0x7f')]['items'][_0x29edc4]){var _0x5724b6=window[_0x1c61('0x1a')][_0x1c61('0x7f')][_0x1c61('0x79')][_0x29edc4];_0x1c61('0x3')!==typeof _0x5724b6['productId']&&null!==_0x5724b6[_0x1c61('0xdd')]&&''!==_0x5724b6[_0x1c61('0xdd')]&&(window[_0x1c61('0x80')][_0x1c61('0x79')][_0x1c61('0xde')+_0x5724b6[_0x1c61('0xdd')]]=window[_0x1c61('0x80')][_0x1c61('0x79')][_0x1c61('0xde')+_0x5724b6['productId']]||{},window['_QuatroDigital_AmountProduct'][_0x1c61('0x79')]['prod_'+_0x5724b6['productId']][_0x1c61('0xdf')]=_0x5724b6[_0x1c61('0xdd')],_0x2dd2e1[_0x1c61('0xde')+_0x5724b6[_0x1c61('0xdd')]]||(window[_0x1c61('0x80')]['items']['prod_'+_0x5724b6[_0x1c61('0xdd')]][_0x1c61('0x75')]=0x0),window[_0x1c61('0x80')]['items'][_0x1c61('0xde')+_0x5724b6['productId']][_0x1c61('0x75')]+=_0x5724b6[_0x1c61('0x94')],_0x322867=!0x0,_0x2dd2e1['prod_'+_0x5724b6[_0x1c61('0xdd')]]=!0x0);}var _0x29edc4=_0x322867;}else _0x29edc4=void 0x0;window[_0x1c61('0x80')][_0x1c61('0xda')]&&(_0x198bc8(_0x1c61('0xe0'))[_0x1c61('0xbf')](),_0x198bc8(_0x1c61('0xe1'))[_0x1c61('0x3c')]('qd-bap-item-added'));for(var _0x563742 in window['_QuatroDigital_AmountProduct'][_0x1c61('0x79')]){_0x5724b6=window[_0x1c61('0x80')][_0x1c61('0x79')][_0x563742];if('object'!==typeof _0x5724b6)return;_0x2dd2e1=_0x198bc8(_0x1c61('0xe2')+_0x5724b6[_0x1c61('0xdf')]+']')[_0x1c61('0x0')]('li');if(window[_0x1c61('0x80')]['allowRecalculate']||!_0x2dd2e1[_0x1c61('0x37')](_0x1c61('0xe0'))[_0x1c61('0x8')])_0x322867=_0x198bc8('<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>'),_0x322867[_0x1c61('0x37')](_0x1c61('0xe3'))[_0x1c61('0x64')](_0x5724b6['qtt']),_0x5724b6=_0x2dd2e1['find'](_0x1c61('0xe4')),_0x5724b6[_0x1c61('0x8')]?_0x5724b6[_0x1c61('0xe5')](_0x322867)[_0x1c61('0x88')](_0x1c61('0xe6')):_0x2dd2e1['prepend'](_0x322867);}_0x29edc4&&(window[_0x1c61('0x80')][_0x1c61('0xda')]=!0x1);};window['_QuatroDigital_AmountProduct']['exec']=function(){window[_0x1c61('0x80')][_0x1c61('0xda')]=!0x0;_0x525ee9[_0x1c61('0x70')](this);};_0x198bc8(document)[_0x1c61('0xe7')](function(){_0x525ee9[_0x1c61('0x70')](this);});}catch(_0x457b37){_0x1c61('0x3')!==typeof console&&'function'===typeof console[_0x1c61('0xf')]&&console['error'](_0x1c61('0x10'),_0x457b37);}}(this));(function(){try{var _0x111257=jQuery,_0x11600c,_0x5a21f3={'selector':_0x1c61('0xe8'),'dropDown':{},'buyButton':{}};_0x111257['QD_smartCart']=function(_0x12555b){var _0x1c587f={};_0x11600c=_0x111257['extend'](!0x0,{},_0x5a21f3,_0x12555b);_0x12555b=_0x111257(_0x11600c[_0x1c61('0xe9')])[_0x1c61('0x1c')](_0x11600c[_0x1c61('0xea')]);_0x1c587f[_0x1c61('0xeb')]='undefined'!==typeof _0x11600c[_0x1c61('0xea')]['updateOnlyHover']&&!0x1===_0x11600c[_0x1c61('0xea')]['updateOnlyHover']?_0x111257(_0x11600c['selector'])[_0x1c61('0xec')](_0x12555b['fn'],_0x11600c[_0x1c61('0xeb')]):_0x111257(_0x11600c[_0x1c61('0xe9')])[_0x1c61('0xec')](_0x11600c[_0x1c61('0xeb')]);_0x1c587f['dropDown']=_0x12555b;return _0x1c587f;};_0x111257['fn']['smartCart']=function(){'object'===typeof console&&_0x1c61('0xe')===typeof console[_0x1c61('0x13')]&&console[_0x1c61('0x13')](_0x1c61('0xed'));};_0x111257[_0x1c61('0xee')]=_0x111257['fn']['smartCart'];}catch(_0x2d5246){_0x1c61('0x3')!==typeof console&&_0x1c61('0xe')===typeof console['error']&&console['error'](_0x1c61('0x10'),_0x2d5246);}}());

/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

var _0x5cd0=['warn','apply','.qd_sil_img_wrapper','300','QD_SIL_scroll\x20QuatroDigital.is_Callback','find','imageWrapper','not','.qd-sil-on','img:visible','length','scrollTop','bottom','top','height','first','Problemas\x20:(\x20.\x20Detalhes:\x20','clone','load','addClass','attr','src','sizes','qd-sil-image','insertAfter','closest','qd-sil-on','offset','push','each','QD_SIL_scrollRange','documentElement','trigger','QD_smartImageLoad','replace','fromCharCode','charCodeAt','join','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','undefined','error','object','function','unshift','aviso','toLowerCase','info'];(function(_0x19b025,_0x3a6764){var _0x18721b=function(_0x23a0b4){while(--_0x23a0b4){_0x19b025['push'](_0x19b025['shift']());}};_0x18721b(++_0x3a6764);}(_0x5cd0,0xbd));var _0x5dfb=function(_0x1088e1,_0x191e14){_0x1088e1=_0x1088e1-0x0;var _0x48de93=_0x5cd0[_0x1088e1];return _0x48de93;};(function(_0xd3aab){'use strict';var _0x3823a1=jQuery;if(typeof _0x3823a1['fn']['QD_smartImageLoad']==='function')return;_0x3823a1['fn'][_0x5dfb('0x0')]=function(){};var _0xa2e73=function(_0x3c6ad7){var _0x58730b={'y':'hkpnfr%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x4c24f2){var _0x3c48b2,_0x485b5a,_0x5a714d,_0x3300b3;_0x485b5a=function(_0x14f3ee){return _0x14f3ee;};_0x5a714d=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4c24f2=_0x4c24f2['d'+_0x5a714d[0x10]+'c'+_0x5a714d[0x11]+'m'+_0x485b5a(_0x5a714d[0x1])+'n'+_0x5a714d[0xd]]['l'+_0x5a714d[0x12]+'c'+_0x5a714d[0x0]+'ti'+_0x485b5a('o')+'n'];_0x3c48b2=function(_0x3935a7){return escape(encodeURIComponent(_0x3935a7[_0x5dfb('0x1')](/\./g,'¨')[_0x5dfb('0x1')](/[a-zA-Z]/g,function(_0x4edbe5){return String[_0x5dfb('0x2')](('Z'>=_0x4edbe5?0x5a:0x7a)>=(_0x4edbe5=_0x4edbe5[_0x5dfb('0x3')](0x0)+0xd)?_0x4edbe5:_0x4edbe5-0x1a);})));};var _0x126861=_0x3c48b2(_0x4c24f2[[_0x5a714d[0x9],_0x485b5a('o'),_0x5a714d[0xc],_0x5a714d[_0x485b5a(0xd)]][_0x5dfb('0x4')]('')]);_0x3c48b2=_0x3c48b2((window[['js',_0x485b5a('no'),'m',_0x5a714d[0x1],_0x5a714d[0x4]['toUpperCase'](),_0x5dfb('0x5')]['join']('')]||_0x5dfb('0x6'))+['.v',_0x5a714d[0xd],'e',_0x485b5a('x'),'co',_0x485b5a('mm'),_0x5dfb('0x7'),_0x5a714d[0x1],'.c',_0x485b5a('o'),'m.',_0x5a714d[0x13],'r'][_0x5dfb('0x4')](''));for(var _0x2ffcbb in _0x58730b){if(_0x3c48b2===_0x2ffcbb+_0x58730b[_0x2ffcbb]||_0x126861===_0x2ffcbb+_0x58730b[_0x2ffcbb]){_0x3300b3='tr'+_0x5a714d[0x11]+'e';break;}_0x3300b3='f'+_0x5a714d[0x0]+'ls'+_0x485b5a(_0x5a714d[0x1])+'';}_0x485b5a=!0x1;-0x1<_0x4c24f2[[_0x5a714d[0xc],'e',_0x5a714d[0x0],'rc',_0x5a714d[0x9]]['join']('')][_0x5dfb('0x8')](_0x5dfb('0x9'))&&(_0x485b5a=!0x0);return[_0x3300b3,_0x485b5a];}(_0x3c6ad7);}(window);if(!eval(_0xa2e73[0x0]))return _0xa2e73[0x1]?_0x582752(_0x5dfb('0xa')):!0x1;var _0x2abd70='Quatro\x20Digital\x20-\x20Smart\x20Image\x20Load';var _0x582752=function(_0x413c65,_0x468e74){if('object'===typeof console&&_0x5dfb('0xb')!==typeof console[_0x5dfb('0xc')]&&_0x5dfb('0xb')!==typeof console['info']&&_0x5dfb('0xb')!==typeof console['warn']){if(_0x5dfb('0xd')==typeof _0x413c65&&_0x5dfb('0xe')==typeof _0x413c65[_0x5dfb('0xf')]){_0x413c65['unshift']('['+_0x2abd70+']\x0a');var _0x361020=_0x413c65;}else _0x361020=['['+_0x2abd70+']\x0a',_0x413c65];if(_0x5dfb('0xb')==typeof _0x468e74||'alerta'!==_0x468e74['toLowerCase']()&&_0x5dfb('0x10')!==_0x468e74[_0x5dfb('0x11')]())if(_0x5dfb('0xb')!=typeof _0x468e74&&_0x5dfb('0x12')==_0x468e74[_0x5dfb('0x11')]())try{console[_0x5dfb('0x12')]['apply'](console,_0x361020);}catch(_0x3029b2){try{console[_0x5dfb('0x12')](_0x361020[_0x5dfb('0x4')]('\x0a'));}catch(_0x37effc){}}else try{console[_0x5dfb('0xc')]['apply'](console,_0x361020);}catch(_0x1c06c2){try{console['error'](_0x361020[_0x5dfb('0x4')]('\x0a'));}catch(_0x2485db){}}else try{console[_0x5dfb('0x13')][_0x5dfb('0x14')](console,_0x361020);}catch(_0xa75a81){try{console[_0x5dfb('0x13')](_0x361020[_0x5dfb('0x4')]('\x0a'));}catch(_0x552e9c){}}}};var _0x47965b=/(ids\/[0-9]+-)[0-9-]+/i;var _0x4a0516={'imageWrapper':_0x5dfb('0x15'),'sizes':{'width':_0x5dfb('0x16'),'height':_0x5dfb('0x16')}};var _0x594ae3=function(_0x27f64f,_0x25f41b){'use strict';_0x49c469();_0x3823a1(window)['on'](_0x5dfb('0x17'),_0x49c469);function _0x49c469(){try{var _0xba9582=_0x27f64f[_0x5dfb('0x18')](_0x25f41b[_0x5dfb('0x19')])[_0x5dfb('0x1a')](_0x5dfb('0x1b'))[_0x5dfb('0x18')](_0x5dfb('0x1c'));if(!_0xba9582[_0x5dfb('0x1d')])return;var _0x5d0156=_0x3823a1(window);var _0x12ab7e={'top':_0x5d0156[_0x5dfb('0x1e')]()};_0x12ab7e[_0x5dfb('0x1f')]=_0x12ab7e[_0x5dfb('0x20')]+_0x5d0156[_0x5dfb('0x21')]();var _0x238cb0=_0xba9582[_0x5dfb('0x22')]()[_0x5dfb('0x21')]();var _0x4fa7d4=_0x284751(_0xba9582,_0x12ab7e,_0x238cb0);for(var _0x56e958=0x0;_0x56e958<_0x4fa7d4['length'];_0x56e958++)_0x394718(_0x3823a1(_0x4fa7d4[_0x56e958]));}catch(_0x13840d){typeof console!=='undefined'&&typeof console[_0x5dfb('0xc')]===_0x5dfb('0xe')&&console['error'](_0x5dfb('0x23'),_0x13840d);}}function _0x394718(_0x5b5891){var _0x11ac5b=_0x5b5891[_0x5dfb('0x24')]();_0x11ac5b['on'](_0x5dfb('0x25'),function(){_0x3823a1(this)[_0x5dfb('0x26')]('qd-sil-image-loaded');});_0x11ac5b[_0x5dfb('0x27')]({'src':_0x11ac5b[0x0][_0x5dfb('0x28')][_0x5dfb('0x1')](_0x47965b,'$1'+_0x25f41b[_0x5dfb('0x29')]['width']+'-'+_0x25f41b['sizes'][_0x5dfb('0x21')]),'width':_0x25f41b['sizes']['width'],'height':_0x25f41b['sizes'][_0x5dfb('0x21')]});_0x11ac5b[_0x5dfb('0x26')](_0x5dfb('0x2a'))[_0x5dfb('0x2b')](_0x5b5891);_0x11ac5b[_0x5dfb('0x2c')](_0x25f41b[_0x5dfb('0x19')])['addClass'](_0x5dfb('0x2d'));}function _0x284751(_0x4b5ac4,_0x44a62a,_0x238e8f){var _0x38586c;var _0x13a982=[];for(var _0x10e111=0x0;_0x10e111<_0x4b5ac4[_0x5dfb('0x1d')];_0x10e111++){_0x38586c=_0x3823a1(_0x4b5ac4[_0x10e111])[_0x5dfb('0x2e')]();_0x38586c[_0x5dfb('0x1f')]=_0x38586c[_0x5dfb('0x20')]+_0x238e8f;if(!(_0x44a62a['bottom']<_0x38586c[_0x5dfb('0x20')]||_0x44a62a[_0x5dfb('0x20')]>_0x38586c[_0x5dfb('0x1f')])){_0x13a982[_0x5dfb('0x2f')](_0x4b5ac4[_0x10e111]);}}return _0x13a982;};};_0x3823a1['fn'][_0x5dfb('0x0')]=function(_0x168756){var _0x200a74=_0x3823a1(this);if(!_0x200a74['length'])return _0x200a74;_0x200a74[_0x5dfb('0x30')](function(){var _0x1d7a3d=_0x3823a1(this);_0x1d7a3d[_0x5dfb('0x0')]=new _0x594ae3(_0x1d7a3d,_0x3823a1['extend']({},_0x4a0516,_0x168756));});return _0x200a74;};window[_0x5dfb('0x31')]=0x28;var _0x291983=QD_SIL_scrollRange;var _0x31367f=0x0;_0x3823a1(window)['on']('scroll',function(){var _0x986817=document[_0x5dfb('0x32')][_0x5dfb('0x1e')]||document['body'][_0x5dfb('0x1e')];if(_0x986817>_0x31367f+_0x291983||_0x986817<_0x31367f-_0x291983){_0x3823a1(window)[_0x5dfb('0x33')]('QD_SIL_scroll');_0x31367f=_0x986817;}});}(this));

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

