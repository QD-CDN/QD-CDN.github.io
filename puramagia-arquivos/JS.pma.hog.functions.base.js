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
			Common.applyMosaicCategorieBanners();
			Common.applyCarouselShelf();
			Common.applyTipBarCarousel();
			Common.applyAmazingMenu();
			Common.applySmartCart();
			Common.openSearchModal();
			Common.applyAmazingMenuMobile();
			Common.openVideoModal();
			Common.showFooterLinks();
			Common.applyImageLoad();
			Common.saveAmountFix();
			Common.overlay();
			Common.openAccountLinksMobile();
		},
		ajaxStop: function() {
			Common.saveAmountFix();
		},
		windowOnload: function() {},
		vtexBindQuickViewDestroy: function() {
			window.bindQuickView = function() {};
		},
		applyAmazingMenu: function () {
			$('.header-qd-v1-amazing-menu, .footer-qd-v1-menu-list').QD_amazingMenu();
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

			$('.header-qd-v1-cart-link-trigger').click(function (evt) {
				evt.preventDefault();
				$(document.body).toggleClass('qd-cart-show');

				wrapper.height($(window).height());
				wrapper.find(".qd-ddc-prodWrapper").css('max-height', $(window).height() - 193);
			});

			$('.qd_ddc_lightBoxClose').click(function (evt) {
				$(document.body).removeClass(Common.qdOverlayClass);
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
		openAccountLinksMobile: function () {
			$('.header-qd-v1-actions').click(function () {
				$(this).toggleClass('mobile-active').find('.header-qd-v1-actions-dropdown').toggleClass('mobile-active');
			});
		},
		openSearchModal: function () {
			$('.header-qd-v1-search-trriger').click(function () {
				$('.modal-qd-v1-search').modal();
				return false;
			});
		},
		showFooterLinks: function () {
			$('.footer-qd-v1-menu-list > ul > li').click(function (e) {
				var $t = $(this);
				$t.toggleClass('qd-is-active');
				$t.find('> ul').toggleClass('qd-is-active');
			});
		},
		applyTipBarCarousel: function () {
			var wrapper = $('.tip-bar-qd-v1-carousel >ul, .tip-bar-qd-v1-carousel-footer >ul');

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
		applyMosaicCategorieBanners: function () {
			$('.banner-qd-v1-responsive > .box-banner').QD_mosaicBanners({
				classFourColumn: "col-xs-12 col-sm-6 col-md-3"
			});
		},
		openVideoModal: function () {
			var videoRegex = /(youtu\.be\/|\?v=)([^&]+)/i;

			$('.box-banner a').filter('[href*="youtube.com/"], [href*="youtu.be/"]').click(function (e) {
				e.preventDefault();
				var modal = $('.qd-v1-modal').clone().appendTo(document.body).addClass("component-qd-v1-video-modal");
				var $t = $(this);
				var videoId = ($t.attr('href').match(videoRegex) || ['']).pop();

				modal.find('.modal-header').append('<h2 class="component-qd-v1-section-title">' + $t.find('img').attr('alt') + '</h2>').prepend('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
				modal.find(".modal-dialog").addClass("modal-lg");

				$('<iframe src="' + 'https://www.youtube.com/embed/' + videoId + '?wmode=transparent&rel=0" frameborder="0"></iframe>').appendTo(modal.find('.modal-body'));

				$(".component-qd-v1-video-modal").find('iframe').wrap('<div class="embed-responsive embed-responsive-16by9"></div>')

				modal.modal();

				modal.on('hidden.bs.modal', function () {
					modal.remove();
				});
			});
		},
		applyImageLoad: function () {
			$('.search-qd-v1-result, .prateleira').QD_smartImageLoad({
				sizes: {
					width: '300',
					height: '300'
				}
			});
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
		saveAmountFix: function () {
			$('.shelf-qd-v1-highlight-discount-percentage:not(.qd-on)').addClass('qd-on').each(function () {
				var $t = $(this);
				$t.text(($t.text().trim().match(/[0-9]+/) || [""]).pop() + '%');
			});
		}															
	};

	var Home = {
		init: function() {
			Home.applySlickSlider();
			Home.homeContentCarousel();
			Home.applyBrandCarousel();
			Home.applyCarouselShelfSpecial();
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
		},
		homeContentCarousel:function() {
			$(".home-qd-v1-content-carousel").QD_amazingMenu();

			var wrapper = $('.home-qd-v1-content-carousel >ul');

			if (!wrapper.length)
				return;

			var options = {
				autoplay: true,
				slidesToShow: 4,
				slidesToScroll: 4,
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
		applyCarouselShelfSpecial: function () {
			var wrapper = $('.categories-special-qd-v1-banners .prateleira').not('.slick-initialized');

			if (!wrapper.length)
				return false;

			wrapper.has('h2').each(function () {
				var $t = $(this);
				$t.find('h2').remove();
			});

			wrapper.slick({
				slidesToShow: 2,
				slidesToScroll: 2,
				infinite: true,
				draggable: true,
				speed: 700,
				responsive: [
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
		init: function() {
			Search.hideExtendedMenu();
			Search.openFiltersMenu();
			Search.shelfLineFix();
			Search.infinityScroll();
			Home.applySlickSlider();
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
			Product.productThumbCarousel();
			Product.applyProductTipBarCarousel();
			Product.applyBannerCarousel();
			Product.openShipping();
			Product.scrollToDescription();
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
		},
		applyProductTipBarCarousel: function () {
			var wrapper = $('.product-qd-v1-tip-bar >ul');

			if (!wrapper.length)
				return;

			var options = {
				arrows: false,
				autoplay: true,
				slidesToShow: 2,
				slidesToScroll: 2,
				infinite: false,
				draggable: true,
				speed: 1000,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					},

					{
						breakpoint: 992,
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
		openShipping: function () {
			if (typeof window.ShippingValue === "function")
				window.ShippingValue();
		},
		productThumbCarousel:function() {
			$('.product-qd-v1-image-sku').QD_smartPhotoCarousel({
				imageWrapper: '.product-qd-v1-image',
				thumbsWrapper: '.product-qd-v1-image-thumbs',
				sizes: {
					thumb: '150-150',
					image: '500-500',
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
		scrollToDescription: function () {
			$('.product-qd-v1-description-link').click(function (e) {
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $('.product-qd-v1-description').offset().top - 75
				}, 900, 'swing');
			});
		},
		scrollToBuyButton: function () {
			$('.product-qd-v1-fixed-bar .buy-button, .product-qd-v1-fixed-bar .product-qd-v1-price').click(function (e) {
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $('.product-qd-v1-sku-selection-wrapper').offset().top - 75
				}, 900, 'swing');
			});
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
var _0x568c=['parameters','object','jqXHR','clearQueueDelay','undefined','readyState','data','textStatus','errorThrown','version','2.1','/produto/sku/','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','QD_smartStockAvailable','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','alerta','toLowerCase','aviso','info','apply','removeClass','qd-ssa-sku-no-selected','attr','data-qd-ssa-qtt','find','[data-qd-ssa-text]','hide','addClass','qd-ssa-show','filter','length','[data-qd-ssa-text=\x22default\x22]','qd-ssa-hide','html','show','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','qd-ssa-on','qd-ssa-skus-','skus','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','split','SkuSellersInformation','AvailableQuantity','trigger','QuatroDigital.ssa.prodUnavailable','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','message','vtex.sku.selected.QD','qd-ssa-sku-prod-unavailable','henzntvn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','qdPlugin','QuatroDigital.ssa.skuSelected','initialSkuSelected','prod','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','off','vtex.sku.selectable','available','.qd_smart_stock_available_auto','function','qdAjax','qdAjaxQueue','extend','url','opts','success','call','error','complete','callbackFns','successPopulated','boolean','errorPopulated','completePopulated'];(function(_0x3102b7,_0xc7f825){var _0x4ea5dc=function(_0x4ad976){while(--_0x4ad976){_0x3102b7['push'](_0x3102b7['shift']());}};_0x4ea5dc(++_0xc7f825);}(_0x568c,0x141));var _0xc568=function(_0x3b0514,_0x11e139){_0x3b0514=_0x3b0514-0x0;var _0x154046=_0x568c[_0x3b0514];return _0x154046;};(function(_0xed0c34){if(_0xc568('0x0')!==typeof _0xed0c34[_0xc568('0x1')]){var _0x58a6b6={};_0xed0c34[_0xc568('0x2')]=_0x58a6b6;_0xed0c34[_0xc568('0x1')]=function(_0x2b921d){var _0x21a953=_0xed0c34[_0xc568('0x3')]({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x2b921d);var _0x274350=escape(encodeURIComponent(_0x21a953[_0xc568('0x4')]));_0x58a6b6[_0x274350]=_0x58a6b6[_0x274350]||{};_0x58a6b6[_0x274350][_0xc568('0x5')]=_0x58a6b6[_0x274350][_0xc568('0x5')]||[];_0x58a6b6[_0x274350][_0xc568('0x5')]['push']({'success':function(_0xe24fdf,_0x146991,_0x5dcc10){_0x21a953[_0xc568('0x6')][_0xc568('0x7')](this,_0xe24fdf,_0x146991,_0x5dcc10);},'error':function(_0x48d686,_0x3b08d4,_0x5832e4){_0x21a953[_0xc568('0x8')]['call'](this,_0x48d686,_0x3b08d4,_0x5832e4);},'complete':function(_0x6e9ad6,_0x27be6b){_0x21a953[_0xc568('0x9')][_0xc568('0x7')](this,_0x6e9ad6,_0x27be6b);}});_0x58a6b6[_0x274350]['parameters']=_0x58a6b6[_0x274350]['parameters']||{'success':{},'error':{},'complete':{}};_0x58a6b6[_0x274350]['callbackFns']=_0x58a6b6[_0x274350][_0xc568('0xa')]||{};_0x58a6b6[_0x274350][_0xc568('0xa')][_0xc568('0xb')]=_0xc568('0xc')===typeof _0x58a6b6[_0x274350]['callbackFns'][_0xc568('0xb')]?_0x58a6b6[_0x274350][_0xc568('0xa')][_0xc568('0xb')]:!0x1;_0x58a6b6[_0x274350][_0xc568('0xa')][_0xc568('0xd')]='boolean'===typeof _0x58a6b6[_0x274350]['callbackFns']['errorPopulated']?_0x58a6b6[_0x274350][_0xc568('0xa')]['errorPopulated']:!0x1;_0x58a6b6[_0x274350][_0xc568('0xa')]['completePopulated']='boolean'===typeof _0x58a6b6[_0x274350]['callbackFns'][_0xc568('0xe')]?_0x58a6b6[_0x274350][_0xc568('0xa')][_0xc568('0xe')]:!0x1;_0x2b921d=_0xed0c34[_0xc568('0x3')]({},_0x21a953,{'success':function(_0x227325,_0x3e8a34,_0x5dbe24){_0x58a6b6[_0x274350][_0xc568('0xf')][_0xc568('0x6')]={'data':_0x227325,'textStatus':_0x3e8a34,'jqXHR':_0x5dbe24};_0x58a6b6[_0x274350][_0xc568('0xa')][_0xc568('0xb')]=!0x0;for(var _0x1da88f in _0x58a6b6[_0x274350][_0xc568('0x5')])_0xc568('0x10')===typeof _0x58a6b6[_0x274350]['opts'][_0x1da88f]&&(_0x58a6b6[_0x274350][_0xc568('0x5')][_0x1da88f]['success']['call'](this,_0x227325,_0x3e8a34,_0x5dbe24),_0x58a6b6[_0x274350]['opts'][_0x1da88f][_0xc568('0x6')]=function(){});},'error':function(_0x199495,_0x31d29b,_0x39786b){_0x58a6b6[_0x274350][_0xc568('0xf')][_0xc568('0x8')]={'errorThrown':_0x39786b,'textStatus':_0x31d29b,'jqXHR':_0x199495};_0x58a6b6[_0x274350][_0xc568('0xa')][_0xc568('0xd')]=!0x0;for(var _0x1f2a32 in _0x58a6b6[_0x274350]['opts'])'object'===typeof _0x58a6b6[_0x274350][_0xc568('0x5')][_0x1f2a32]&&(_0x58a6b6[_0x274350][_0xc568('0x5')][_0x1f2a32][_0xc568('0x8')][_0xc568('0x7')](this,_0x199495,_0x31d29b,_0x39786b),_0x58a6b6[_0x274350][_0xc568('0x5')][_0x1f2a32][_0xc568('0x8')]=function(){});},'complete':function(_0xeb9d9e,_0x13fbb3){_0x58a6b6[_0x274350][_0xc568('0xf')][_0xc568('0x9')]={'textStatus':_0x13fbb3,'jqXHR':_0xeb9d9e};_0x58a6b6[_0x274350][_0xc568('0xa')][_0xc568('0xe')]=!0x0;for(var _0x4e1828 in _0x58a6b6[_0x274350][_0xc568('0x5')])_0xc568('0x10')===typeof _0x58a6b6[_0x274350][_0xc568('0x5')][_0x4e1828]&&(_0x58a6b6[_0x274350][_0xc568('0x5')][_0x4e1828][_0xc568('0x9')]['call'](this,_0xeb9d9e,_0x13fbb3),_0x58a6b6[_0x274350]['opts'][_0x4e1828][_0xc568('0x9')]=function(){});isNaN(parseInt(_0x21a953['clearQueueDelay']))||setTimeout(function(){_0x58a6b6[_0x274350][_0xc568('0x11')]=void 0x0;_0x58a6b6[_0x274350]['opts']=void 0x0;_0x58a6b6[_0x274350][_0xc568('0xf')]=void 0x0;_0x58a6b6[_0x274350][_0xc568('0xa')]=void 0x0;},_0x21a953[_0xc568('0x12')]);}});_0xc568('0x13')===typeof _0x58a6b6[_0x274350]['jqXHR']?_0x58a6b6[_0x274350][_0xc568('0x11')]=_0xed0c34['ajax'](_0x2b921d):_0x58a6b6[_0x274350]['jqXHR']&&_0x58a6b6[_0x274350][_0xc568('0x11')][_0xc568('0x14')]&&0x4==_0x58a6b6[_0x274350][_0xc568('0x11')][_0xc568('0x14')]&&(_0x58a6b6[_0x274350][_0xc568('0xa')]['successPopulated']&&_0x2b921d['success'](_0x58a6b6[_0x274350][_0xc568('0xf')][_0xc568('0x6')][_0xc568('0x15')],_0x58a6b6[_0x274350]['parameters'][_0xc568('0x6')][_0xc568('0x16')],_0x58a6b6[_0x274350][_0xc568('0xf')]['success'][_0xc568('0x11')]),_0x58a6b6[_0x274350][_0xc568('0xa')]['errorPopulated']&&_0x2b921d[_0xc568('0x8')](_0x58a6b6[_0x274350][_0xc568('0xf')]['error'][_0xc568('0x11')],_0x58a6b6[_0x274350]['parameters'][_0xc568('0x8')][_0xc568('0x16')],_0x58a6b6[_0x274350][_0xc568('0xf')][_0xc568('0x8')][_0xc568('0x17')]),_0x58a6b6[_0x274350][_0xc568('0xa')][_0xc568('0xe')]&&_0x2b921d[_0xc568('0x9')](_0x58a6b6[_0x274350][_0xc568('0xf')][_0xc568('0x9')][_0xc568('0x11')],_0x58a6b6[_0x274350][_0xc568('0xf')]['complete']['textStatus']));};_0xed0c34[_0xc568('0x1')][_0xc568('0x18')]=_0xc568('0x19');}}(jQuery));(function(_0x212ebc){function _0x151cc9(_0x7f9d80,_0x54ec94){_0x2989ca[_0xc568('0x1')]({'url':_0xc568('0x1a')+_0x7f9d80,'clearQueueDelay':null,'success':_0x54ec94,'error':function(){_0x1eb6fb(_0xc568('0x1b'));}});}var _0x2989ca=jQuery;if('function'!==typeof _0x2989ca['fn'][_0xc568('0x1c')]){var _0x1eb6fb=function(_0x206e9d,_0x1213d6){if(_0xc568('0x10')===typeof console){var _0x560c07;_0xc568('0x10')===typeof _0x206e9d?(_0x206e9d['unshift']('[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a'),_0x560c07=_0x206e9d):_0x560c07=[_0xc568('0x1d')+_0x206e9d];_0xc568('0x13')===typeof _0x1213d6||_0xc568('0x1e')!==_0x1213d6[_0xc568('0x1f')]()&&_0xc568('0x20')!==_0x1213d6['toLowerCase']()?_0xc568('0x13')!==typeof _0x1213d6&&_0xc568('0x21')===_0x1213d6['toLowerCase']()?console[_0xc568('0x21')]['apply'](console,_0x560c07):console[_0xc568('0x8')][_0xc568('0x22')](console,_0x560c07):console['warn'][_0xc568('0x22')](console,_0x560c07);}},_0x498156={},_0x1e4114=function(_0x29f02d,_0x49787d){function _0x427b86(_0x1759b7){try{_0x29f02d[_0xc568('0x23')](_0xc568('0x24'))['addClass']('qd-ssa-sku-selected');var _0x333f2c=_0x1759b7[0x0]['SkuSellersInformation'][0x0]['AvailableQuantity'];_0x29f02d[_0xc568('0x25')](_0xc568('0x26'),_0x333f2c);_0x29f02d['each'](function(){var _0x29f02d=_0x2989ca(this)[_0xc568('0x27')](_0xc568('0x28'));if(0x1>_0x333f2c)return _0x29f02d[_0xc568('0x29')]()[_0xc568('0x2a')]('qd-ssa-hide')[_0xc568('0x23')](_0xc568('0x2b'));var _0x1759b7=_0x29f02d[_0xc568('0x2c')]('[data-qd-ssa-text=\x22'+_0x333f2c+'\x22]');_0x1759b7=_0x1759b7[_0xc568('0x2d')]?_0x1759b7:_0x29f02d[_0xc568('0x2c')](_0xc568('0x2e'));_0x29f02d[_0xc568('0x29')]()[_0xc568('0x2a')](_0xc568('0x2f'))[_0xc568('0x23')](_0xc568('0x2b'));_0x1759b7[_0xc568('0x30')]((_0x1759b7[_0xc568('0x30')]()||'')['replace']('#qtt',_0x333f2c));_0x1759b7[_0xc568('0x31')]()[_0xc568('0x2a')](_0xc568('0x2b'))[_0xc568('0x23')](_0xc568('0x2f'));});}catch(_0x1ab5bd){_0x1eb6fb([_0xc568('0x32'),_0x1ab5bd['message']]);}}if(_0x29f02d[_0xc568('0x2d')]){_0x29f02d[_0xc568('0x2a')](_0xc568('0x33'));_0x29f02d[_0xc568('0x2a')]('qd-ssa-sku-no-selected');try{_0x29f02d[_0xc568('0x2a')](_0xc568('0x34')+vtxctx[_0xc568('0x35')]['split'](';')[_0xc568('0x2d')]);}catch(_0x56080e){_0x1eb6fb(['Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20',_0x56080e['message']]);}_0x2989ca(window)['on'](_0xc568('0x36'),function(_0xd6b09d,_0x3029e9,_0x545d82){try{_0x151cc9(_0x545d82[_0xc568('0x37')],function(_0x509fa0){_0x427b86(_0x509fa0);0x1===vtxctx[_0xc568('0x35')][_0xc568('0x38')](';')['length']&&0x0==_0x509fa0[0x0][_0xc568('0x39')][0x0][_0xc568('0x3a')]&&_0x2989ca(window)[_0xc568('0x3b')](_0xc568('0x3c'));});}catch(_0x4827d3){_0x1eb6fb([_0xc568('0x3d'),_0x4827d3[_0xc568('0x3e')]]);}});_0x2989ca(window)['off'](_0xc568('0x3f'));_0x2989ca(window)['on'](_0xc568('0x3c'),function(){_0x29f02d[_0xc568('0x2a')](_0xc568('0x40'))[_0xc568('0x29')]();});}};_0x212ebc=function(_0xa0cdab){var _0x3531fe={'c':_0xc568('0x41')};return function(_0x416132){var _0x2cb91a=function(_0x94096){return _0x94096;};var _0x77df19=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x416132=_0x416132['d'+_0x77df19[0x10]+'c'+_0x77df19[0x11]+'m'+_0x2cb91a(_0x77df19[0x1])+'n'+_0x77df19[0xd]]['l'+_0x77df19[0x12]+'c'+_0x77df19[0x0]+'ti'+_0x2cb91a('o')+'n'];var _0x487d83=function(_0x5e3d37){return escape(encodeURIComponent(_0x5e3d37['replace'](/\./g,'¨')[_0xc568('0x42')](/[a-zA-Z]/g,function(_0x26ceb3){return String[_0xc568('0x43')](('Z'>=_0x26ceb3?0x5a:0x7a)>=(_0x26ceb3=_0x26ceb3[_0xc568('0x44')](0x0)+0xd)?_0x26ceb3:_0x26ceb3-0x1a);})));};var _0x3b512f=_0x487d83(_0x416132[[_0x77df19[0x9],_0x2cb91a('o'),_0x77df19[0xc],_0x77df19[_0x2cb91a(0xd)]]['join']('')]);_0x487d83=_0x487d83((window[['js',_0x2cb91a('no'),'m',_0x77df19[0x1],_0x77df19[0x4][_0xc568('0x45')](),_0xc568('0x46')]['join']('')]||_0xc568('0x47'))+['.v',_0x77df19[0xd],'e',_0x2cb91a('x'),'co',_0x2cb91a('mm'),_0xc568('0x48'),_0x77df19[0x1],'.c',_0x2cb91a('o'),'m.',_0x77df19[0x13],'r']['join'](''));for(var _0x332613 in _0x3531fe){if(_0x487d83===_0x332613+_0x3531fe[_0x332613]||_0x3b512f===_0x332613+_0x3531fe[_0x332613]){var _0x2744f5='tr'+_0x77df19[0x11]+'e';break;}_0x2744f5='f'+_0x77df19[0x0]+'ls'+_0x2cb91a(_0x77df19[0x1])+'';}_0x2cb91a=!0x1;-0x1<_0x416132[[_0x77df19[0xc],'e',_0x77df19[0x0],'rc',_0x77df19[0x9]]['join']('')][_0xc568('0x49')](_0xc568('0x4a'))&&(_0x2cb91a=!0x0);return[_0x2744f5,_0x2cb91a];}(_0xa0cdab);}(window);if(!eval(_0x212ebc[0x0]))return _0x212ebc[0x1]?_0x1eb6fb('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x2989ca['fn'][_0xc568('0x1c')]=function(_0x3480f6){var _0x1d3a41=_0x2989ca(this);_0x3480f6=_0x2989ca[_0xc568('0x3')](!0x0,{},_0x498156,_0x3480f6);_0x1d3a41[_0xc568('0x4b')]=new _0x1e4114(_0x1d3a41,_0x3480f6);try{_0xc568('0x10')===typeof _0x2989ca['fn']['QD_smartStockAvailable']['initialSkuSelected']&&_0x2989ca(window)[_0xc568('0x3b')](_0xc568('0x4c'),[_0x2989ca['fn'][_0xc568('0x1c')][_0xc568('0x4d')][_0xc568('0x4e')],_0x2989ca['fn'][_0xc568('0x1c')][_0xc568('0x4d')]['sku']]);}catch(_0x24d0f3){_0x1eb6fb([_0xc568('0x4f'),_0x24d0f3['message']]);}_0x2989ca['fn'][_0xc568('0x1c')]['unavailable']&&_0x2989ca(window)[_0xc568('0x3b')](_0xc568('0x3c'));return _0x1d3a41;};_0x2989ca(window)['on'](_0xc568('0x3f'),function(_0x59e81a,_0x2eddde,_0x21576a){try{_0x2989ca['fn'][_0xc568('0x1c')]['initialSkuSelected']={'prod':_0x2eddde,'sku':_0x21576a},_0x2989ca(this)[_0xc568('0x50')](_0x59e81a);}catch(_0xd92c9d){_0x1eb6fb(['Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20',_0xd92c9d['message']]);}});_0x2989ca(window)['on'](_0xc568('0x51'),function(_0xa751d0,_0x1f3b49,_0x347abc){try{for(var _0x2faba4=_0x347abc[_0xc568('0x2d')],_0x33d94d=_0x1f3b49=0x0;_0x33d94d<_0x2faba4&&!_0x347abc[_0x33d94d][_0xc568('0x52')];_0x33d94d++)_0x1f3b49+=0x1;_0x2faba4<=_0x1f3b49&&(_0x2989ca['fn'][_0xc568('0x1c')]['unavailable']=!0x0);_0x2989ca(this)[_0xc568('0x50')](_0xa751d0);}catch(_0x4cc773){_0x1eb6fb(['Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20',_0x4cc773['message']]);}});_0x2989ca(function(){_0x2989ca(_0xc568('0x53'))[_0xc568('0x1c')]();});}}(window));
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
var _0x0e4c=['trim','[class*=\x27colunas\x27]','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','ajaxCallback','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','parent','qd-am-has-ul','children',':not(ul)','qd-am-elem-','text','qd-amazing-menu','>li','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','qd-am-','callback','QuatroDigital.am.callback','extend','exec','.qd_amazing_menu_auto','getParent','closest','function','QD_amazingMenu','object','error','undefined','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','aviso','toLowerCase','info','apply','join','qdAmAddNdx','each','addClass','qd-am-li-','first','qd-am-first','last','qd-am-last','henzntvn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','.qd-am-banner','length','qd-am-collection-wrapper','qdAjax','url','img[alt=\x27','attr','data-qdam-value','.box-banner','clone','insertBefore','hide','qd-am-content-loaded'];(function(_0xa719e7,_0x58a47a){var _0xf37829=function(_0xd5e17){while(--_0xd5e17){_0xa719e7['push'](_0xa719e7['shift']());}};_0xf37829(++_0x58a47a);}(_0x0e4c,0x67));var _0xc0e4=function(_0x2ecb53,_0x532331){_0x2ecb53=_0x2ecb53-0x0;var _0x2e932d=_0x0e4c[_0x2ecb53];return _0x2e932d;};(function(_0x5884b1){_0x5884b1['fn'][_0xc0e4('0x0')]=_0x5884b1['fn'][_0xc0e4('0x1')];}(jQuery));(function(_0x59f10b){var _0x2a35c9;var _0x3fc08f=jQuery;if(_0xc0e4('0x2')!==typeof _0x3fc08f['fn'][_0xc0e4('0x3')]){var _0x182445={'url':'/qd-amazing-menu','callback':function(){},'ajaxCallback':function(){}};var _0x4e19c4=function(_0x5ee3d4,_0x2d962e){if(_0xc0e4('0x4')===typeof console&&'undefined'!==typeof console[_0xc0e4('0x5')]&&_0xc0e4('0x6')!==typeof console['info']&&_0xc0e4('0x6')!==typeof console[_0xc0e4('0x7')]){var _0x41197a;'object'===typeof _0x5ee3d4?(_0x5ee3d4[_0xc0e4('0x8')]('[QD\x20Amazing\x20Menu]\x0a'),_0x41197a=_0x5ee3d4):_0x41197a=[_0xc0e4('0x9')+_0x5ee3d4];if('undefined'===typeof _0x2d962e||_0xc0e4('0xa')!==_0x2d962e['toLowerCase']()&&_0xc0e4('0xb')!==_0x2d962e[_0xc0e4('0xc')]())if(_0xc0e4('0x6')!==typeof _0x2d962e&&_0xc0e4('0xd')===_0x2d962e[_0xc0e4('0xc')]())try{console['info'][_0xc0e4('0xe')](console,_0x41197a);}catch(_0x436870){try{console[_0xc0e4('0xd')](_0x41197a['join']('\x0a'));}catch(_0x11f315){}}else try{console[_0xc0e4('0x5')][_0xc0e4('0xe')](console,_0x41197a);}catch(_0x472a46){try{console['error'](_0x41197a[_0xc0e4('0xf')]('\x0a'));}catch(_0x4f97b2){}}else try{console['warn'][_0xc0e4('0xe')](console,_0x41197a);}catch(_0x5b5792){try{console['warn'](_0x41197a['join']('\x0a'));}catch(_0x341172){}}}};_0x3fc08f['fn'][_0xc0e4('0x10')]=function(){var _0x34d7fe=_0x3fc08f(this);_0x34d7fe[_0xc0e4('0x11')](function(_0x200b30){_0x3fc08f(this)[_0xc0e4('0x12')](_0xc0e4('0x13')+_0x200b30);});_0x34d7fe[_0xc0e4('0x14')]()[_0xc0e4('0x12')](_0xc0e4('0x15'));_0x34d7fe[_0xc0e4('0x16')]()[_0xc0e4('0x12')](_0xc0e4('0x17'));return _0x34d7fe;};_0x3fc08f['fn'][_0xc0e4('0x3')]=function(){};_0x59f10b=function(_0x28e3f0){var _0x35ade3={'c':_0xc0e4('0x18')};return function(_0x3e707a){var _0x4172de=function(_0x136b09){return _0x136b09;};var _0xee067=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3e707a=_0x3e707a['d'+_0xee067[0x10]+'c'+_0xee067[0x11]+'m'+_0x4172de(_0xee067[0x1])+'n'+_0xee067[0xd]]['l'+_0xee067[0x12]+'c'+_0xee067[0x0]+'ti'+_0x4172de('o')+'n'];var _0x73acfd=function(_0x383746){return escape(encodeURIComponent(_0x383746['replace'](/\./g,'¨')[_0xc0e4('0x19')](/[a-zA-Z]/g,function(_0x43b0b4){return String[_0xc0e4('0x1a')](('Z'>=_0x43b0b4?0x5a:0x7a)>=(_0x43b0b4=_0x43b0b4[_0xc0e4('0x1b')](0x0)+0xd)?_0x43b0b4:_0x43b0b4-0x1a);})));};var _0x4f79b0=_0x73acfd(_0x3e707a[[_0xee067[0x9],_0x4172de('o'),_0xee067[0xc],_0xee067[_0x4172de(0xd)]][_0xc0e4('0xf')]('')]);_0x73acfd=_0x73acfd((window[['js',_0x4172de('no'),'m',_0xee067[0x1],_0xee067[0x4][_0xc0e4('0x1c')](),_0xc0e4('0x1d')][_0xc0e4('0xf')]('')]||_0xc0e4('0x1e'))+['.v',_0xee067[0xd],'e',_0x4172de('x'),'co',_0x4172de('mm'),_0xc0e4('0x1f'),_0xee067[0x1],'.c',_0x4172de('o'),'m.',_0xee067[0x13],'r'][_0xc0e4('0xf')](''));for(var _0x5e8356 in _0x35ade3){if(_0x73acfd===_0x5e8356+_0x35ade3[_0x5e8356]||_0x4f79b0===_0x5e8356+_0x35ade3[_0x5e8356]){var _0x5d7ce8='tr'+_0xee067[0x11]+'e';break;}_0x5d7ce8='f'+_0xee067[0x0]+'ls'+_0x4172de(_0xee067[0x1])+'';}_0x4172de=!0x1;-0x1<_0x3e707a[[_0xee067[0xc],'e',_0xee067[0x0],'rc',_0xee067[0x9]][_0xc0e4('0xf')]('')][_0xc0e4('0x20')](_0xc0e4('0x21'))&&(_0x4172de=!0x0);return[_0x5d7ce8,_0x4172de];}(_0x28e3f0);}(window);if(!eval(_0x59f10b[0x0]))return _0x59f10b[0x1]?_0x4e19c4(_0xc0e4('0x22')):!0x1;var _0xc2e6f3=function(_0x2f7fc9){var _0x538cdb=_0x2f7fc9[_0xc0e4('0x23')](_0xc0e4('0x24'));var _0x32496d=_0x538cdb[_0xc0e4('0x25')](_0xc0e4('0x26'));var _0x2a2db5=_0x538cdb[_0xc0e4('0x25')]('.qd-am-collection');if(_0x32496d[_0xc0e4('0x27')]||_0x2a2db5[_0xc0e4('0x27')])_0x32496d['parent']()[_0xc0e4('0x12')]('qd-am-banner-wrapper'),_0x2a2db5['parent']()[_0xc0e4('0x12')](_0xc0e4('0x28')),_0x3fc08f[_0xc0e4('0x29')]({'url':_0x2a35c9[_0xc0e4('0x2a')],'dataType':'html','success':function(_0x18616d){var _0x502ae1=_0x3fc08f(_0x18616d);_0x32496d['each'](function(){var _0x18616d=_0x3fc08f(this);var _0x420e35=_0x502ae1['find'](_0xc0e4('0x2b')+_0x18616d[_0xc0e4('0x2c')](_0xc0e4('0x2d'))+'\x27]');_0x420e35[_0xc0e4('0x27')]&&(_0x420e35[_0xc0e4('0x11')](function(){_0x3fc08f(this)['getParent'](_0xc0e4('0x2e'))[_0xc0e4('0x2f')]()[_0xc0e4('0x30')](_0x18616d);}),_0x18616d[_0xc0e4('0x31')]());})[_0xc0e4('0x12')](_0xc0e4('0x32'));_0x2a2db5['each'](function(){var _0x18616d={};var _0x13f531=_0x3fc08f(this);_0x502ae1['find']('h2')['each'](function(){if(_0x3fc08f(this)['text']()[_0xc0e4('0x33')]()['toLowerCase']()==_0x13f531[_0xc0e4('0x2c')]('data-qdam-value')[_0xc0e4('0x33')]()[_0xc0e4('0xc')]())return _0x18616d=_0x3fc08f(this),!0x1;});_0x18616d[_0xc0e4('0x27')]&&(_0x18616d['each'](function(){_0x3fc08f(this)[_0xc0e4('0x0')](_0xc0e4('0x34'))[_0xc0e4('0x2f')]()[_0xc0e4('0x30')](_0x13f531);}),_0x13f531[_0xc0e4('0x31')]());})[_0xc0e4('0x12')]('qd-am-content-loaded');},'error':function(){_0x4e19c4(_0xc0e4('0x35')+_0x2a35c9[_0xc0e4('0x2a')]+'\x27\x20falho.');},'complete':function(){_0x2a35c9[_0xc0e4('0x36')]['call'](this);_0x3fc08f(window)[_0xc0e4('0x37')](_0xc0e4('0x38'),_0x2f7fc9);},'clearQueueDelay':0xbb8});};_0x3fc08f[_0xc0e4('0x3')]=function(_0x10562e){var _0x4958c6=_0x10562e[_0xc0e4('0x23')](_0xc0e4('0x39'))[_0xc0e4('0x11')](function(){var _0x5efad6=_0x3fc08f(this);if(!_0x5efad6[_0xc0e4('0x27')])return _0x4e19c4([_0xc0e4('0x3a'),_0x10562e],_0xc0e4('0xa'));_0x5efad6[_0xc0e4('0x23')](_0xc0e4('0x3b'))[_0xc0e4('0x3c')]()[_0xc0e4('0x12')](_0xc0e4('0x3d'));_0x5efad6[_0xc0e4('0x23')]('li')['each'](function(){var _0x226755=_0x3fc08f(this);var _0x3dd5a9=_0x226755[_0xc0e4('0x3e')](_0xc0e4('0x3f'));_0x3dd5a9['length']&&_0x226755[_0xc0e4('0x12')](_0xc0e4('0x40')+_0x3dd5a9['first']()[_0xc0e4('0x41')]()[_0xc0e4('0x33')]()['replaceSpecialChars']()[_0xc0e4('0x19')](/\./g,'')['replace'](/\s/g,'-')['toLowerCase']());});var _0x261a5d=_0x5efad6[_0xc0e4('0x23')]('>li')[_0xc0e4('0x10')]();_0x5efad6['addClass'](_0xc0e4('0x42'));_0x261a5d=_0x261a5d[_0xc0e4('0x23')]('>ul');_0x261a5d[_0xc0e4('0x11')](function(){var _0x14a5a6=_0x3fc08f(this);_0x14a5a6['find'](_0xc0e4('0x43'))[_0xc0e4('0x10')]()[_0xc0e4('0x12')]('qd-am-column');_0x14a5a6['addClass'](_0xc0e4('0x44'));_0x14a5a6[_0xc0e4('0x3c')]()[_0xc0e4('0x12')](_0xc0e4('0x45'));});_0x261a5d['addClass']('qd-am-dropdown');var _0x241ed8=0x0,_0x59f10b=function(_0x5761c4){_0x241ed8+=0x1;_0x5761c4=_0x5761c4[_0xc0e4('0x3e')]('li')['children']('*');_0x5761c4[_0xc0e4('0x27')]&&(_0x5761c4[_0xc0e4('0x12')](_0xc0e4('0x46')+_0x241ed8),_0x59f10b(_0x5761c4));};_0x59f10b(_0x5efad6);_0x5efad6['add'](_0x5efad6[_0xc0e4('0x23')]('ul'))[_0xc0e4('0x11')](function(){var _0x18627b=_0x3fc08f(this);_0x18627b[_0xc0e4('0x12')](_0xc0e4('0x47')+_0x18627b['children']('li')[_0xc0e4('0x27')]+'-li');});});_0xc2e6f3(_0x4958c6);_0x2a35c9[_0xc0e4('0x48')]['call'](this);_0x3fc08f(window)['trigger'](_0xc0e4('0x49'),_0x10562e);};_0x3fc08f['fn'][_0xc0e4('0x3')]=function(_0x3953b4){var _0x467fef=_0x3fc08f(this);if(!_0x467fef[_0xc0e4('0x27')])return _0x467fef;_0x2a35c9=_0x3fc08f[_0xc0e4('0x4a')]({},_0x182445,_0x3953b4);_0x467fef[_0xc0e4('0x4b')]=new _0x3fc08f['QD_amazingMenu'](_0x3fc08f(this));return _0x467fef;};_0x3fc08f(function(){_0x3fc08f(_0xc0e4('0x4c'))['QD_amazingMenu']();});}}(this));
/* Quatro Digital Smart Cart */
var _0x228f=['lastSku','outerHeight','parent','qd-ddc-lastAddedFixed','addClass','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','callbackProductsList','forceImageHTTPS','string','http','load','qd-loaded','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku-index','changeQantity','data-sku','.qd-ddc-prodQttWrapper:not(.qd_on)','click.qd_ddc_more','qd-loading','click.qd_ddc_minus','.qd-ddc-prodRow','removeProduct','stop','slideUp','remove','$1-$2$3','qdDdcLastPostalCode','calculateShipping','BRA','done','.qd-ddc-cep-tooltip-text','.qd-dd-cep-slas','logisticsInfo','<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>','shippingEstimate','\x20dia\x20útil','<tr></tr>','<td>\x20R$\x20','price','</td><td>',',\x20entrega\x20em\x20','</td>','tbody','insertBefore','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','data','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','updateItems','atenção\x20esta\x20método\x20esta\x20descontinuado','index','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','.qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','.qdDdcContainer','QD_smartCart','selector','dropDown','buyButton','QD_buyButton','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','smartCart','getParent','closest','replace','undefined','pow','toFixed','round','split','length','_QuatroDigital_CartData','callback','Callbacks','function','error','Oooops!\x20','info','warn','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','toLowerCase','aviso','apply','join','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','fromCharCode','toUpperCase','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','extend','Ir\x20ao\x20Carrinho','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Continuar\x20Comprando','<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>','skuName','name','smartCheckout','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','object','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','removeClass','qd-bb-lightBoxProdAdd','body','off','keyup.qd_ddc_closeFn','keyCode','qd-bb-lightBoxBodyProdAdd','find','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text','.qd-ddc-shipping\x20.qd-ddc-cep','val','keyup.qd_ddc_cep','formatCepField','.qd-ddc-shipping\x20.qd-ddc-cep-ok','click','.qd-ddc-cep-btn','toggle','.qd-ddc-cep-close','preventDefault','hide','click._QD_DDC_closeShipping','target','.qd-ddc-cep-tooltip','.qd-ddc-cep-ok','shippingCalculate','.qd-ddc-cep','updateOnlyHover','getCartInfoByUrl','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','texts','cartTotal','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','html','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','emptyCart','call','clone','.qd-ddc-infoTotalValue','total','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','items','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','getOrderForm','_QuatroDigital_AmountProduct','exec','QD_checkoutQueue','totalizers','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','qd-ddc-noItems','empty','each','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','attr','qd-ddc-','availability','.qd-ddc-prodName','sellingPrice','Grátis','content','.qd-ddc-quantity','quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','.qd-ddc-shipping\x20input','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons'];(function(_0x264c76,_0x277260){var _0x1ba4da=function(_0x4fb484){while(--_0x4fb484){_0x264c76['push'](_0x264c76['shift']());}};_0x1ba4da(++_0x277260);}(_0x228f,0x14e));var _0xf228=function(_0x49d3fe,_0x61e8e){_0x49d3fe=_0x49d3fe-0x0;var _0x48eefd=_0x228f[_0x49d3fe];return _0x48eefd;};(function(_0x3ba8aa){_0x3ba8aa['fn'][_0xf228('0x0')]=_0x3ba8aa['fn'][_0xf228('0x1')];}(jQuery));function qd_number_format(_0x105873,_0x2267bf,_0x2add5c,_0x51723d){_0x105873=(_0x105873+'')[_0xf228('0x2')](/[^0-9+\-Ee.]/g,'');_0x105873=isFinite(+_0x105873)?+_0x105873:0x0;_0x2267bf=isFinite(+_0x2267bf)?Math['abs'](_0x2267bf):0x0;_0x51723d=_0xf228('0x3')===typeof _0x51723d?',':_0x51723d;_0x2add5c=_0xf228('0x3')===typeof _0x2add5c?'.':_0x2add5c;var _0x4b5b37='',_0x4b5b37=function(_0x37c02f,_0x136c7f){var _0x2267bf=Math[_0xf228('0x4')](0xa,_0x136c7f);return''+(Math['round'](_0x37c02f*_0x2267bf)/_0x2267bf)[_0xf228('0x5')](_0x136c7f);},_0x4b5b37=(_0x2267bf?_0x4b5b37(_0x105873,_0x2267bf):''+Math[_0xf228('0x6')](_0x105873))[_0xf228('0x7')]('.');0x3<_0x4b5b37[0x0][_0xf228('0x8')]&&(_0x4b5b37[0x0]=_0x4b5b37[0x0][_0xf228('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x51723d));(_0x4b5b37[0x1]||'')[_0xf228('0x8')]<_0x2267bf&&(_0x4b5b37[0x1]=_0x4b5b37[0x1]||'',_0x4b5b37[0x1]+=Array(_0x2267bf-_0x4b5b37[0x1][_0xf228('0x8')]+0x1)['join']('0'));return _0x4b5b37['join'](_0x2add5c);};(function(){try{window[_0xf228('0x9')]=window[_0xf228('0x9')]||{},window[_0xf228('0x9')][_0xf228('0xa')]=window[_0xf228('0x9')]['callback']||$[_0xf228('0xb')]();}catch(_0x349bf7){_0xf228('0x3')!==typeof console&&_0xf228('0xc')===typeof console['error']&&console[_0xf228('0xd')](_0xf228('0xe'),_0x349bf7['message']);}}());(function(_0x33e1c4){try{var _0x42315d=jQuery,_0x5575aa=function(_0x62160a,_0x23768a){if('object'===typeof console&&_0xf228('0x3')!==typeof console[_0xf228('0xd')]&&_0xf228('0x3')!==typeof console[_0xf228('0xf')]&&'undefined'!==typeof console[_0xf228('0x10')]){var _0x22ef2f;'object'===typeof _0x62160a?(_0x62160a[_0xf228('0x11')](_0xf228('0x12')),_0x22ef2f=_0x62160a):_0x22ef2f=[_0xf228('0x12')+_0x62160a];if(_0xf228('0x3')===typeof _0x23768a||_0xf228('0x13')!==_0x23768a[_0xf228('0x14')]()&&_0xf228('0x15')!==_0x23768a[_0xf228('0x14')]())if(_0xf228('0x3')!==typeof _0x23768a&&_0xf228('0xf')===_0x23768a['toLowerCase']())try{console[_0xf228('0xf')]['apply'](console,_0x22ef2f);}catch(_0x7604ba){try{console['info'](_0x22ef2f['join']('\x0a'));}catch(_0x9d2d40){}}else try{console[_0xf228('0xd')][_0xf228('0x16')](console,_0x22ef2f);}catch(_0x37aa33){try{console[_0xf228('0xd')](_0x22ef2f[_0xf228('0x17')]('\x0a'));}catch(_0x4b1c52){}}else try{console[_0xf228('0x10')][_0xf228('0x16')](console,_0x22ef2f);}catch(_0xa49787){try{console['warn'](_0x22ef2f[_0xf228('0x17')]('\x0a'));}catch(_0x32e73b){}}}};window[_0xf228('0x18')]=window[_0xf228('0x18')]||{};window[_0xf228('0x18')][_0xf228('0x19')]=!0x0;_0x42315d[_0xf228('0x1a')]=function(){};_0x42315d['fn'][_0xf228('0x1a')]=function(){return{'fn':new _0x42315d()};};var _0x38bd5b=function(_0x1a5f31){var _0x54f9a9={'c':'henzntvn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x5c9435){var _0x93dfa3=function(_0x4e6428){return _0x4e6428;};var _0x5d618b=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5c9435=_0x5c9435['d'+_0x5d618b[0x10]+'c'+_0x5d618b[0x11]+'m'+_0x93dfa3(_0x5d618b[0x1])+'n'+_0x5d618b[0xd]]['l'+_0x5d618b[0x12]+'c'+_0x5d618b[0x0]+'ti'+_0x93dfa3('o')+'n'];var _0x532437=function(_0x33a12a){return escape(encodeURIComponent(_0x33a12a['replace'](/\./g,'¨')[_0xf228('0x2')](/[a-zA-Z]/g,function(_0x407604){return String[_0xf228('0x1b')](('Z'>=_0x407604?0x5a:0x7a)>=(_0x407604=_0x407604['charCodeAt'](0x0)+0xd)?_0x407604:_0x407604-0x1a);})));};var _0x119886=_0x532437(_0x5c9435[[_0x5d618b[0x9],_0x93dfa3('o'),_0x5d618b[0xc],_0x5d618b[_0x93dfa3(0xd)]]['join']('')]);_0x532437=_0x532437((window[['js',_0x93dfa3('no'),'m',_0x5d618b[0x1],_0x5d618b[0x4][_0xf228('0x1c')](),'ite'][_0xf228('0x17')]('')]||_0xf228('0x1d'))+['.v',_0x5d618b[0xd],'e',_0x93dfa3('x'),'co',_0x93dfa3('mm'),_0xf228('0x1e'),_0x5d618b[0x1],'.c',_0x93dfa3('o'),'m.',_0x5d618b[0x13],'r'][_0xf228('0x17')](''));for(var _0x15f11d in _0x54f9a9){if(_0x532437===_0x15f11d+_0x54f9a9[_0x15f11d]||_0x119886===_0x15f11d+_0x54f9a9[_0x15f11d]){var _0x30661a='tr'+_0x5d618b[0x11]+'e';break;}_0x30661a='f'+_0x5d618b[0x0]+'ls'+_0x93dfa3(_0x5d618b[0x1])+'';}_0x93dfa3=!0x1;-0x1<_0x5c9435[[_0x5d618b[0xc],'e',_0x5d618b[0x0],'rc',_0x5d618b[0x9]]['join']('')][_0xf228('0x1f')](_0xf228('0x20'))&&(_0x93dfa3=!0x0);return[_0x30661a,_0x93dfa3];}(_0x1a5f31);}(window);if(!eval(_0x38bd5b[0x0]))return _0x38bd5b[0x1]?_0x5575aa('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x42315d['QD_dropDownCart']=function(_0xe0ece4,_0x290b39){var _0x182804=_0x42315d(_0xe0ece4);if(!_0x182804['length'])return _0x182804;var _0x430696=_0x42315d[_0xf228('0x21')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0xf228('0x22'),'linkCheckout':'Finalizar\x20Compra','cartTotal':_0xf228('0x23'),'emptyCart':'Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','continueShopping':_0xf228('0x24'),'shippingForm':_0xf228('0x25')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'forceImageHTTPS':!0x1,'skuName':function(_0x24ef9b){return _0x24ef9b[_0xf228('0x26')]||_0x24ef9b[_0xf228('0x27')];},'callback':function(){},'callbackProductsList':function(){}},_0x290b39);_0x42315d('');var _0x756a0b=this;if(_0x430696[_0xf228('0x28')]){var _0x4f605e=!0x1;'undefined'===typeof window[_0xf228('0x29')]&&(_0x5575aa(_0xf228('0x2a')),_0x42315d[_0xf228('0x2b')]({'url':_0xf228('0x2c'),'async':!0x1,'dataType':_0xf228('0x2d'),'error':function(){_0x5575aa(_0xf228('0x2e'));_0x4f605e=!0x0;}}));if(_0x4f605e)return _0x5575aa(_0xf228('0x2f'));}if(_0xf228('0x30')===typeof window['vtexjs']&&'undefined'!==typeof window[_0xf228('0x29')][_0xf228('0x31')])var _0x33e1c4=window['vtexjs'][_0xf228('0x31')];else if('object'===typeof vtex&&_0xf228('0x30')===typeof vtex[_0xf228('0x31')]&&_0xf228('0x3')!==typeof vtex[_0xf228('0x31')][_0xf228('0x32')])_0x33e1c4=new vtex[(_0xf228('0x31'))]['SDK']();else return _0x5575aa(_0xf228('0x33'));_0x756a0b['cartContainer']=_0xf228('0x34');var _0x2ff78e=function(_0x4d57f7){_0x42315d(this)[_0xf228('0x35')](_0x4d57f7);_0x4d57f7['find'](_0xf228('0x36'))[_0xf228('0x37')](_0x42315d(_0xf228('0x38')))['on'](_0xf228('0x39'),function(){_0x182804[_0xf228('0x3a')](_0xf228('0x3b'));_0x42315d(document[_0xf228('0x3c')])[_0xf228('0x3a')]('qd-bb-lightBoxBodyProdAdd');});_0x42315d(document)[_0xf228('0x3d')](_0xf228('0x3e'))['on']('keyup.qd_ddc_closeFn',function(_0x3905fe){0x1b==_0x3905fe[_0xf228('0x3f')]&&(_0x182804['removeClass'](_0xf228('0x3b')),_0x42315d(document[_0xf228('0x3c')])[_0xf228('0x3a')](_0xf228('0x40')));});var _0x1665ab=_0x4d57f7[_0xf228('0x41')](_0xf228('0x42'));_0x4d57f7[_0xf228('0x41')](_0xf228('0x43'))['on'](_0xf228('0x44'),function(){_0x756a0b[_0xf228('0x45')]('-',void 0x0,void 0x0,_0x1665ab);return!0x1;});_0x4d57f7[_0xf228('0x41')]('.qd-ddc-scrollDown')['on'](_0xf228('0x46'),function(){_0x756a0b[_0xf228('0x45')](void 0x0,void 0x0,void 0x0,_0x1665ab);return!0x1;});var _0x30031b=_0x4d57f7[_0xf228('0x41')](_0xf228('0x47'));_0x4d57f7[_0xf228('0x41')](_0xf228('0x48'))[_0xf228('0x49')]('')['on'](_0xf228('0x4a'),function(_0x1e0d17){_0x756a0b[_0xf228('0x4b')](_0x42315d(this));0xd==_0x1e0d17[_0xf228('0x3f')]&&_0x4d57f7[_0xf228('0x41')](_0xf228('0x4c'))[_0xf228('0x4d')]();});_0x4d57f7[_0xf228('0x41')](_0xf228('0x4e'))[_0xf228('0x4d')](function(_0x19f8d7){_0x19f8d7['preventDefault']();_0x30031b[_0xf228('0x4f')]();});_0x4d57f7['find'](_0xf228('0x50'))[_0xf228('0x4d')](function(_0x22582e){_0x22582e[_0xf228('0x51')]();_0x30031b[_0xf228('0x52')]();});_0x42315d(document)[_0xf228('0x3d')]('click._QD_DDC_closeShipping')['on'](_0xf228('0x53'),function(_0x4c81f3){_0x42315d(_0x4c81f3[_0xf228('0x54')])[_0xf228('0x1')](_0x4d57f7['find'](_0xf228('0x55')))['length']||_0x30031b[_0xf228('0x52')]();});_0x4d57f7[_0xf228('0x41')](_0xf228('0x56'))[_0xf228('0x4d')](function(_0x2c2d02){_0x2c2d02[_0xf228('0x51')]();_0x756a0b[_0xf228('0x57')](_0x4d57f7[_0xf228('0x41')](_0xf228('0x58')));});if(_0x430696[_0xf228('0x59')]){var _0x290b39=0x0;_0x42315d(this)['on']('mouseenter.qd_ddc_hover',function(){var _0x4d57f7=function(){window[_0xf228('0x18')][_0xf228('0x19')]&&(_0x756a0b[_0xf228('0x5a')](),window[_0xf228('0x18')][_0xf228('0x19')]=!0x1,_0x42315d['fn'][_0xf228('0x5b')](!0x0),_0x756a0b[_0xf228('0x5c')]());};_0x290b39=setInterval(function(){_0x4d57f7();},0x258);_0x4d57f7();});_0x42315d(this)['on'](_0xf228('0x5d'),function(){clearInterval(_0x290b39);});}};var _0x3a513c=function(_0x2e4b3f){_0x2e4b3f=_0x42315d(_0x2e4b3f);_0x430696[_0xf228('0x5e')][_0xf228('0x5f')]=_0x430696[_0xf228('0x5e')]['cartTotal']['replace']('#value',_0xf228('0x60'));_0x430696[_0xf228('0x5e')][_0xf228('0x5f')]=_0x430696[_0xf228('0x5e')][_0xf228('0x5f')][_0xf228('0x2')](_0xf228('0x61'),_0xf228('0x62'));_0x430696[_0xf228('0x5e')][_0xf228('0x5f')]=_0x430696[_0xf228('0x5e')]['cartTotal'][_0xf228('0x2')](_0xf228('0x63'),_0xf228('0x64'));_0x430696['texts'][_0xf228('0x5f')]=_0x430696[_0xf228('0x5e')][_0xf228('0x5f')]['replace']('#total',_0xf228('0x65'));_0x2e4b3f[_0xf228('0x41')](_0xf228('0x66'))[_0xf228('0x67')](_0x430696[_0xf228('0x5e')][_0xf228('0x68')]);_0x2e4b3f[_0xf228('0x41')](_0xf228('0x69'))[_0xf228('0x67')](_0x430696[_0xf228('0x5e')][_0xf228('0x6a')]);_0x2e4b3f[_0xf228('0x41')](_0xf228('0x6b'))[_0xf228('0x67')](_0x430696[_0xf228('0x5e')][_0xf228('0x6c')]);_0x2e4b3f[_0xf228('0x41')](_0xf228('0x6d'))['html'](_0x430696[_0xf228('0x5e')]['cartTotal']);_0x2e4b3f[_0xf228('0x41')](_0xf228('0x6e'))['html'](_0x430696[_0xf228('0x5e')][_0xf228('0x6f')]);_0x2e4b3f[_0xf228('0x41')](_0xf228('0x70'))[_0xf228('0x67')](_0x430696[_0xf228('0x5e')][_0xf228('0x71')]);return _0x2e4b3f;}(this['cartContainer']);var _0x37cc40=0x0;_0x182804['each'](function(){0x0<_0x37cc40?_0x2ff78e[_0xf228('0x72')](this,_0x3a513c[_0xf228('0x73')]()):_0x2ff78e[_0xf228('0x72')](this,_0x3a513c);_0x37cc40++;});window['_QuatroDigital_CartData']['callback'][_0xf228('0x37')](function(){_0x42315d(_0xf228('0x74'))['html'](window[_0xf228('0x9')][_0xf228('0x75')]||'--');_0x42315d(_0xf228('0x76'))[_0xf228('0x67')](window[_0xf228('0x9')]['qtt']||'0');_0x42315d(_0xf228('0x77'))[_0xf228('0x67')](window[_0xf228('0x9')][_0xf228('0x78')]||'--');_0x42315d(_0xf228('0x79'))[_0xf228('0x67')](window[_0xf228('0x9')]['allTotal']||'--');});var _0x6c405b=function(_0x4e7390,_0x47224e){if(_0xf228('0x3')===typeof _0x4e7390[_0xf228('0x7a')])return _0x5575aa('Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição');_0x756a0b[_0xf228('0x7b')][_0xf228('0x72')](this,_0x47224e);};_0x756a0b[_0xf228('0x5a')]=function(_0x4803b5,_0x24eefb){_0xf228('0x3')!=typeof _0x24eefb?window[_0xf228('0x18')][_0xf228('0x7c')]=_0x24eefb:window[_0xf228('0x18')][_0xf228('0x7c')]&&(_0x24eefb=window[_0xf228('0x18')][_0xf228('0x7c')]);setTimeout(function(){window[_0xf228('0x18')]['dataOptionsCache']=void 0x0;},_0x430696[_0xf228('0x7d')]);_0x42315d(_0xf228('0x7e'))[_0xf228('0x3a')](_0xf228('0x7f'));if(_0x430696[_0xf228('0x28')]){var _0x346c6e=function(_0x2cb20f){window[_0xf228('0x18')][_0xf228('0x80')]=_0x2cb20f;_0x6c405b(_0x2cb20f,_0x24eefb);_0xf228('0x3')!==typeof window[_0xf228('0x81')]&&_0xf228('0xc')===typeof window[_0xf228('0x81')]['exec']&&window['_QuatroDigital_AmountProduct'][_0xf228('0x82')][_0xf228('0x72')](this);_0x42315d(_0xf228('0x7e'))['addClass'](_0xf228('0x7f'));};_0xf228('0x3')!==typeof window[_0xf228('0x18')][_0xf228('0x80')]?(_0x346c6e(window[_0xf228('0x18')][_0xf228('0x80')]),_0xf228('0xc')===typeof _0x4803b5&&_0x4803b5(window[_0xf228('0x18')][_0xf228('0x80')])):_0x42315d[_0xf228('0x83')](['items',_0xf228('0x84'),_0xf228('0x85')],{'done':function(_0x23ed1a){_0x346c6e[_0xf228('0x72')](this,_0x23ed1a);_0xf228('0xc')===typeof _0x4803b5&&_0x4803b5(_0x23ed1a);},'fail':function(_0x2ea474){_0x5575aa([_0xf228('0x86'),_0x2ea474]);}});}else alert(_0xf228('0x87'));};_0x756a0b[_0xf228('0x5c')]=function(){var _0x1489be=_0x42315d(_0xf228('0x7e'));_0x1489be['find']('.qd-ddc-prodRow')[_0xf228('0x8')]?_0x1489be['removeClass'](_0xf228('0x88')):_0x1489be['addClass'](_0xf228('0x88'));};_0x756a0b['renderProductsList']=function(_0x600980){var _0x290b39=_0x42315d('.qd-ddc-prodWrapper2');_0x290b39[_0xf228('0x89')]();_0x290b39[_0xf228('0x8a')](function(){var _0x290b39=_0x42315d(this),_0x42b181,_0x3eb948,_0xe4031d=_0x42315d(''),_0x1f538a;for(_0x1f538a in window[_0xf228('0x18')][_0xf228('0x80')][_0xf228('0x7a')])if(_0xf228('0x30')===typeof window[_0xf228('0x18')][_0xf228('0x80')][_0xf228('0x7a')][_0x1f538a]){var _0x2c65fd=window[_0xf228('0x18')][_0xf228('0x80')][_0xf228('0x7a')][_0x1f538a];var _0xe0ece4=_0x2c65fd[_0xf228('0x8b')][_0xf228('0x2')](/^\/|\/$/g,'')[_0xf228('0x7')]('/');var _0x3fce2b=_0x42315d(_0xf228('0x8c'));_0x3fce2b[_0xf228('0x8d')]({'data-sku':_0x2c65fd['id'],'data-sku-index':_0x1f538a,'data-qd-departament':_0xe0ece4[0x0],'data-qd-category':_0xe0ece4[_0xe0ece4[_0xf228('0x8')]-0x1]});_0x3fce2b['addClass'](_0xf228('0x8e')+_0x2c65fd[_0xf228('0x8f')]);_0x3fce2b[_0xf228('0x41')](_0xf228('0x90'))[_0xf228('0x35')](_0x430696[_0xf228('0x26')](_0x2c65fd));_0x3fce2b[_0xf228('0x41')]('.qd-ddc-prodPrice')[_0xf228('0x35')](isNaN(_0x2c65fd[_0xf228('0x91')])?_0x2c65fd['sellingPrice']:0x0==_0x2c65fd['sellingPrice']?_0xf228('0x92'):(_0x42315d('meta[name=currency]')[_0xf228('0x8d')](_0xf228('0x93'))||'R$')+'\x20'+qd_number_format(_0x2c65fd['sellingPrice']/0x64,0x2,',','.'));_0x3fce2b[_0xf228('0x41')](_0xf228('0x94'))[_0xf228('0x8d')]({'data-sku':_0x2c65fd['id'],'data-sku-index':_0x1f538a})[_0xf228('0x49')](_0x2c65fd[_0xf228('0x95')]);_0x3fce2b['find'](_0xf228('0x96'))[_0xf228('0x8d')]({'data-sku':_0x2c65fd['id'],'data-sku-index':_0x1f538a});_0x756a0b[_0xf228('0x97')](_0x2c65fd['id'],_0x3fce2b[_0xf228('0x41')](_0xf228('0x98')),_0x2c65fd['imageUrl']);_0x3fce2b[_0xf228('0x41')](_0xf228('0x99'))['attr']({'data-sku':_0x2c65fd['id'],'data-sku-index':_0x1f538a});_0x3fce2b[_0xf228('0x9a')](_0x290b39);_0xe4031d=_0xe4031d[_0xf228('0x37')](_0x3fce2b);}try{var _0xeb2c58=_0x290b39[_0xf228('0x0')](_0xf228('0x7e'))['find'](_0xf228('0x9b'));_0xeb2c58[_0xf228('0x8')]&&''==_0xeb2c58[_0xf228('0x49')]()&&window[_0xf228('0x18')][_0xf228('0x80')]['shippingData'][_0xf228('0x9c')]&&_0xeb2c58['val'](window[_0xf228('0x18')]['getOrderForm'][_0xf228('0x85')][_0xf228('0x9c')][_0xf228('0x9d')]);}catch(_0x10bf58){_0x5575aa(_0xf228('0x9e')+_0x10bf58['message'],_0xf228('0x15'));}_0x756a0b[_0xf228('0x9f')](_0x290b39);_0x756a0b[_0xf228('0x5c')]();_0x600980&&_0x600980[_0xf228('0xa0')]&&function(){_0x3eb948=_0xe4031d['filter']('[data-sku=\x27'+_0x600980[_0xf228('0xa0')]+'\x27]');_0x3eb948['length']&&(_0x42b181=0x0,_0xe4031d[_0xf228('0x8a')](function(){var _0x600980=_0x42315d(this);if(_0x600980['is'](_0x3eb948))return!0x1;_0x42b181+=_0x600980[_0xf228('0xa1')]();}),_0x756a0b[_0xf228('0x45')](void 0x0,void 0x0,_0x42b181,_0x290b39[_0xf228('0x37')](_0x290b39[_0xf228('0xa2')]())),_0xe4031d['removeClass'](_0xf228('0xa3')),function(_0x40408a){_0x40408a[_0xf228('0xa4')](_0xf228('0xa5'));_0x40408a[_0xf228('0xa4')](_0xf228('0xa3'));setTimeout(function(){_0x40408a[_0xf228('0x3a')]('qd-ddc-lastAdded');},_0x430696['timeRemoveNewItemClass']);}(_0x3eb948),_0x42315d(document[_0xf228('0x3c')])[_0xf228('0xa4')](_0xf228('0xa6')),setTimeout(function(){_0x42315d(document['body'])['removeClass'](_0xf228('0xa6'));},_0x430696[_0xf228('0x7d')]));}();});(function(){_QuatroDigital_DropDown['getOrderForm'][_0xf228('0x7a')][_0xf228('0x8')]?(_0x42315d(_0xf228('0x3c'))['removeClass'](_0xf228('0xa7'))[_0xf228('0xa4')](_0xf228('0xa8')),setTimeout(function(){_0x42315d('body')[_0xf228('0x3a')](_0xf228('0xa9'));},_0x430696[_0xf228('0x7d')])):_0x42315d('body')[_0xf228('0x3a')]('qd-ddc-cart-rendered')[_0xf228('0xa4')]('qd-ddc-cart-empty');}());'function'===typeof _0x430696[_0xf228('0xaa')]?_0x430696[_0xf228('0xaa')][_0xf228('0x72')](this):_0x5575aa('callbackProductsList\x20não\x20é\x20uma\x20função');};_0x756a0b[_0xf228('0x97')]=function(_0x33149a,_0x5d683e,_0x1253fb){function _0x525c67(){_0x430696[_0xf228('0xab')]&&_0xf228('0xac')==typeof _0x1253fb&&(_0x1253fb=_0x1253fb[_0xf228('0x2')](_0xf228('0xad'),'https'));_0x5d683e['removeClass']('qd-loaded')[_0xf228('0xae')](function(){_0x42315d(this)[_0xf228('0xa4')](_0xf228('0xaf'));})[_0xf228('0x8d')](_0xf228('0xb0'),_0x1253fb);}_0x1253fb?_0x525c67():isNaN(_0x33149a)?_0x5575aa(_0xf228('0xb1'),_0xf228('0x13')):alert(_0xf228('0xb2'));};_0x756a0b[_0xf228('0x9f')]=function(_0x11af52){var _0x290b39=function(_0x26d7c6,_0x172f56){var _0x4b63b5=_0x42315d(_0x26d7c6);var _0xfd71c7=_0x4b63b5[_0xf228('0x8d')]('data-sku');var _0xe0ece4=_0x4b63b5['attr'](_0xf228('0xb3'));if(_0xfd71c7){var _0x125571=parseInt(_0x4b63b5['val']())||0x1;_0x756a0b[_0xf228('0xb4')]([_0xfd71c7,_0xe0ece4],_0x125571,_0x125571+0x1,function(_0x1a4c6e){_0x4b63b5[_0xf228('0x49')](_0x1a4c6e);_0xf228('0xc')===typeof _0x172f56&&_0x172f56();});}};var _0x3cb980=function(_0x1ca5c2,_0x1a3a2b){var _0x290b39=_0x42315d(_0x1ca5c2);var _0xd6e6a7=_0x290b39[_0xf228('0x8d')]('data-sku');var _0xa4cd2b=_0x290b39[_0xf228('0x8d')](_0xf228('0xb3'));if(_0xd6e6a7){var _0xe0ece4=parseInt(_0x290b39['val']())||0x2;_0x756a0b['changeQantity']([_0xd6e6a7,_0xa4cd2b],_0xe0ece4,_0xe0ece4-0x1,function(_0x3fa03d){_0x290b39['val'](_0x3fa03d);_0xf228('0xc')===typeof _0x1a3a2b&&_0x1a3a2b();});}};var _0x4c7525=function(_0x63e513,_0x548a01){var _0xd949f5=_0x42315d(_0x63e513);var _0x3bf689=_0xd949f5[_0xf228('0x8d')](_0xf228('0xb5'));var _0xe0ece4=_0xd949f5['attr'](_0xf228('0xb3'));if(_0x3bf689){var _0x3a3c2b=parseInt(_0xd949f5[_0xf228('0x49')]())||0x1;_0x756a0b[_0xf228('0xb4')]([_0x3bf689,_0xe0ece4],0x1,_0x3a3c2b,function(_0x513c34){_0xd949f5['val'](_0x513c34);_0xf228('0xc')===typeof _0x548a01&&_0x548a01();});}};var _0xe0ece4=_0x11af52[_0xf228('0x41')](_0xf228('0xb6'));_0xe0ece4['addClass']('qd_on')['each'](function(){var _0x11af52=_0x42315d(this);_0x11af52[_0xf228('0x41')]('.qd-ddc-quantityMore')['on'](_0xf228('0xb7'),function(_0x491cef){_0x491cef[_0xf228('0x51')]();_0xe0ece4[_0xf228('0xa4')](_0xf228('0xb8'));_0x290b39(_0x11af52[_0xf228('0x41')]('.qd-ddc-quantity'),function(){_0xe0ece4[_0xf228('0x3a')](_0xf228('0xb8'));});});_0x11af52[_0xf228('0x41')]('.qd-ddc-quantityMinus')['on'](_0xf228('0xb9'),function(_0x26c7cd){_0x26c7cd[_0xf228('0x51')]();_0xe0ece4[_0xf228('0xa4')](_0xf228('0xb8'));_0x3cb980(_0x11af52[_0xf228('0x41')](_0xf228('0x94')),function(){_0xe0ece4['removeClass'](_0xf228('0xb8'));});});_0x11af52['find'](_0xf228('0x94'))['on']('focusout.qd_ddc_change',function(){_0xe0ece4[_0xf228('0xa4')](_0xf228('0xb8'));_0x4c7525(this,function(){_0xe0ece4[_0xf228('0x3a')](_0xf228('0xb8'));});});_0x11af52[_0xf228('0x41')](_0xf228('0x94'))['on']('keyup.qd_ddc_change',function(_0x238caf){0xd==_0x238caf[_0xf228('0x3f')]&&(_0xe0ece4['addClass'](_0xf228('0xb8')),_0x4c7525(this,function(){_0xe0ece4[_0xf228('0x3a')](_0xf228('0xb8'));}));});});_0x11af52[_0xf228('0x41')](_0xf228('0xba'))[_0xf228('0x8a')](function(){var _0x11af52=_0x42315d(this);_0x11af52[_0xf228('0x41')]('.qd-ddc-remove')['on']('click.qd_ddc_remove',function(){_0x11af52['addClass'](_0xf228('0xb8'));_0x756a0b[_0xf228('0xbb')](_0x42315d(this),function(_0x2438c2){_0x2438c2?_0x11af52[_0xf228('0xbc')](!0x0)[_0xf228('0xbd')](function(){_0x11af52[_0xf228('0xbe')]();_0x756a0b[_0xf228('0x5c')]();}):_0x11af52[_0xf228('0x3a')](_0xf228('0xb8'));});return!0x1;});});};_0x756a0b[_0xf228('0x4b')]=function(_0x21f9d9){var _0x510785=_0x21f9d9[_0xf228('0x49')]();_0x510785=_0x510785[_0xf228('0x2')](/[^0-9\-]/g,'');_0x510785=_0x510785[_0xf228('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0xf228('0xbf'));_0x510785=_0x510785[_0xf228('0x2')](/(.{9}).*/g,'$1');_0x21f9d9[_0xf228('0x49')](_0x510785);};_0x756a0b[_0xf228('0x57')]=function(_0x8aff85){var _0x5796b8=_0x8aff85[_0xf228('0x49')]();0x9<=_0x5796b8[_0xf228('0x8')]&&(_0x8aff85['data'](_0xf228('0xc0'))!=_0x5796b8&&_0x33e1c4[_0xf228('0xc1')]({'postalCode':_0x5796b8,'country':_0xf228('0xc2')})[_0xf228('0xc3')](function(_0x2b79a3){_0x8aff85[_0xf228('0x1')](_0xf228('0xc4'))[_0xf228('0x41')](_0xf228('0xc5'))['remove']();window[_0xf228('0x18')]['getOrderForm']=_0x2b79a3;_0x756a0b[_0xf228('0x5a')]();_0x2b79a3=_0x2b79a3[_0xf228('0x85')][_0xf228('0xc6')][0x0]['slas'];for(var _0xe0ece4=_0x42315d(_0xf228('0xc7')),_0x30d67a=0x0;_0x30d67a<_0x2b79a3[_0xf228('0x8')];_0x30d67a++){var _0x32b7c5=_0x2b79a3[_0x30d67a],_0x5a2f68=0x1<_0x32b7c5[_0xf228('0xc8')]?_0x32b7c5[_0xf228('0xc8')][_0xf228('0x2')]('bd',_0xf228('0xc9')):_0x32b7c5['shippingEstimate'][_0xf228('0x2')]('bd','\x20dias\x20útéis'),_0x50418d=_0x42315d(_0xf228('0xca'));_0x50418d[_0xf228('0x35')](_0xf228('0xcb')+qd_number_format(_0x32b7c5[_0xf228('0xcc')]/0x64,0x2,',','.')+_0xf228('0xcd')+_0x32b7c5['name']+_0xf228('0xce')+_0x5a2f68+'\x20para\x20o\x20CEP\x20'+_0x5796b8+_0xf228('0xcf'));_0x50418d[_0xf228('0x9a')](_0xe0ece4['find'](_0xf228('0xd0')));}_0xe0ece4[_0xf228('0xd1')](_0x8aff85[_0xf228('0x1')](_0xf228('0xc4'))[_0xf228('0x41')](_0xf228('0x50')));})[_0xf228('0xd2')](function(_0x50e7f6){_0x5575aa([_0xf228('0xd3'),_0x50e7f6]);updateCartData();}),_0x8aff85[_0xf228('0xd4')](_0xf228('0xc0'),_0x5796b8));};_0x756a0b[_0xf228('0xb4')]=function(_0x2270c6,_0x1aeeb4,_0x51d883,_0x2fdc69){function _0x14b4b4(_0x358b0d){_0x358b0d=_0xf228('0xd5')!==typeof _0x358b0d?!0x1:_0x358b0d;_0x756a0b[_0xf228('0x5a')]();window[_0xf228('0x18')]['allowUpdate']=!0x1;_0x756a0b[_0xf228('0x5c')]();_0xf228('0x3')!==typeof window['_QuatroDigital_AmountProduct']&&'function'===typeof window[_0xf228('0x81')][_0xf228('0x82')]&&window[_0xf228('0x81')]['exec'][_0xf228('0x72')](this);_0xf228('0xc')===typeof adminCart&&adminCart();_0x42315d['fn'][_0xf228('0x5b')](!0x0,void 0x0,_0x358b0d);_0xf228('0xc')===typeof _0x2fdc69&&_0x2fdc69(_0x1aeeb4);}_0x51d883=_0x51d883||0x1;if(0x1>_0x51d883)return _0x1aeeb4;if(_0x430696[_0xf228('0x28')]){if('undefined'===typeof window[_0xf228('0x18')][_0xf228('0x80')][_0xf228('0x7a')][_0x2270c6[0x1]])return _0x5575aa(_0xf228('0xd6')+_0x2270c6[0x1]+']'),_0x1aeeb4;window[_0xf228('0x18')][_0xf228('0x80')][_0xf228('0x7a')][_0x2270c6[0x1]][_0xf228('0x95')]=_0x51d883;window['_QuatroDigital_DropDown'][_0xf228('0x80')][_0xf228('0x7a')][_0x2270c6[0x1]]['index']=_0x2270c6[0x1];_0x33e1c4[_0xf228('0xd7')]([window[_0xf228('0x18')][_0xf228('0x80')][_0xf228('0x7a')][_0x2270c6[0x1]]],[_0xf228('0x7a'),_0xf228('0x84'),_0xf228('0x85')])[_0xf228('0xc3')](function(_0x36383b){window[_0xf228('0x18')][_0xf228('0x80')]=_0x36383b;_0x14b4b4(!0x0);})[_0xf228('0xd2')](function(_0x30e352){_0x5575aa(['Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho',_0x30e352]);_0x14b4b4();});}else _0x5575aa(_0xf228('0xd8'));};_0x756a0b['removeProduct']=function(_0x59e982,_0x28e644){function _0x4e7e82(_0x5133ad){_0x5133ad=_0xf228('0xd5')!==typeof _0x5133ad?!0x1:_0x5133ad;_0xf228('0x3')!==typeof window['_QuatroDigital_AmountProduct']&&'function'===typeof window[_0xf228('0x81')]['exec']&&window[_0xf228('0x81')]['exec'][_0xf228('0x72')](this);_0xf228('0xc')===typeof adminCart&&adminCart();_0x42315d['fn']['simpleCart'](!0x0,void 0x0,_0x5133ad);'function'===typeof _0x28e644&&_0x28e644(_0x2cdba0);}var _0x2cdba0=!0x1,_0xe0ece4=_0x42315d(_0x59e982)[_0xf228('0x8d')](_0xf228('0xb3'));if(_0x430696[_0xf228('0x28')]){if(_0xf228('0x3')===typeof window[_0xf228('0x18')][_0xf228('0x80')][_0xf228('0x7a')][_0xe0ece4])return _0x5575aa(_0xf228('0xd6')+_0xe0ece4+']'),_0x2cdba0;window[_0xf228('0x18')][_0xf228('0x80')]['items'][_0xe0ece4][_0xf228('0xd9')]=_0xe0ece4;_0x33e1c4[_0xf228('0xda')]([window['_QuatroDigital_DropDown'][_0xf228('0x80')][_0xf228('0x7a')][_0xe0ece4]],[_0xf228('0x7a'),_0xf228('0x84'),_0xf228('0x85')])[_0xf228('0xc3')](function(_0x2fb033){_0x2cdba0=!0x0;window[_0xf228('0x18')][_0xf228('0x80')]=_0x2fb033;_0x6c405b(_0x2fb033);_0x4e7e82(!0x0);})[_0xf228('0xd2')](function(_0x209a93){_0x5575aa([_0xf228('0xdb'),_0x209a93]);_0x4e7e82();});}else alert(_0xf228('0xdc'));};_0x756a0b[_0xf228('0x45')]=function(_0x5e173a,_0x13e707,_0x27ecfa,_0x47185b){_0x47185b=_0x47185b||_0x42315d(_0xf228('0xdd'));_0x5e173a=_0x5e173a||'+';_0x13e707=_0x13e707||0.9*_0x47185b[_0xf228('0xde')]();_0x47185b[_0xf228('0xbc')](!0x0,!0x0)[_0xf228('0xdf')]({'scrollTop':isNaN(_0x27ecfa)?_0x5e173a+'='+_0x13e707+'px':_0x27ecfa});};_0x430696['updateOnlyHover']||(_0x756a0b['getCartInfoByUrl'](),_0x42315d['fn'][_0xf228('0x5b')](!0x0));_0x42315d(window)['on']('productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex',function(){try{window[_0xf228('0x18')][_0xf228('0x80')]=void 0x0,_0x756a0b['getCartInfoByUrl']();}catch(_0x557016){_0x5575aa(_0xf228('0xe0')+_0x557016['message'],'avisso');}});'function'===typeof _0x430696[_0xf228('0xa')]?_0x430696['callback'][_0xf228('0x72')](this):_0x5575aa(_0xf228('0xe1'));};_0x42315d['fn']['QD_dropDownCart']=function(_0x4823bc){var _0x5866d1=_0x42315d(this);_0x5866d1['fn']=new _0x42315d[(_0xf228('0x1a'))](this,_0x4823bc);return _0x5866d1;};}catch(_0x494c33){_0xf228('0x3')!==typeof console&&_0xf228('0xc')===typeof console['error']&&console[_0xf228('0xd')]('Oooops!\x20',_0x494c33);}}(this));(function(_0x50a826){try{var _0x147605=jQuery;window['_QuatroDigital_AmountProduct']=window[_0xf228('0x81')]||{};window['_QuatroDigital_AmountProduct'][_0xf228('0x7a')]={};window['_QuatroDigital_AmountProduct'][_0xf228('0xe2')]=!0x1;window[_0xf228('0x81')][_0xf228('0xe3')]=!0x1;window[_0xf228('0x81')][_0xf228('0xe4')]=!0x1;var _0x2d007b=function(){if(window[_0xf228('0x81')]['allowRecalculate']){var _0x523810=!0x1;var _0x2513e9={};window[_0xf228('0x81')][_0xf228('0x7a')]={};for(_0x10beca in window[_0xf228('0x18')][_0xf228('0x80')][_0xf228('0x7a')])if(_0xf228('0x30')===typeof window[_0xf228('0x18')][_0xf228('0x80')][_0xf228('0x7a')][_0x10beca]){var _0x36a155=window[_0xf228('0x18')][_0xf228('0x80')][_0xf228('0x7a')][_0x10beca];_0xf228('0x3')!==typeof _0x36a155[_0xf228('0xe5')]&&null!==_0x36a155[_0xf228('0xe5')]&&''!==_0x36a155['productId']&&(window[_0xf228('0x81')]['items'][_0xf228('0xe6')+_0x36a155[_0xf228('0xe5')]]=window[_0xf228('0x81')][_0xf228('0x7a')][_0xf228('0xe6')+_0x36a155[_0xf228('0xe5')]]||{},window[_0xf228('0x81')][_0xf228('0x7a')][_0xf228('0xe6')+_0x36a155[_0xf228('0xe5')]][_0xf228('0xe7')]=_0x36a155[_0xf228('0xe5')],_0x2513e9[_0xf228('0xe6')+_0x36a155['productId']]||(window[_0xf228('0x81')][_0xf228('0x7a')]['prod_'+_0x36a155[_0xf228('0xe5')]]['qtt']=0x0),window['_QuatroDigital_AmountProduct'][_0xf228('0x7a')]['prod_'+_0x36a155[_0xf228('0xe5')]]['qtt']+=_0x36a155[_0xf228('0x95')],_0x523810=!0x0,_0x2513e9[_0xf228('0xe6')+_0x36a155[_0xf228('0xe5')]]=!0x0);}var _0x10beca=_0x523810;}else _0x10beca=void 0x0;window[_0xf228('0x81')][_0xf228('0xe2')]&&(_0x147605(_0xf228('0xe8'))[_0xf228('0xbe')](),_0x147605(_0xf228('0xe9'))[_0xf228('0x3a')]('qd-bap-item-added'));for(var _0x178360 in window[_0xf228('0x81')][_0xf228('0x7a')]){_0x36a155=window[_0xf228('0x81')]['items'][_0x178360];if(_0xf228('0x30')!==typeof _0x36a155)return;_0x2513e9=_0x147605(_0xf228('0xea')+_0x36a155[_0xf228('0xe7')]+']')[_0xf228('0x0')]('li');if(window['_QuatroDigital_AmountProduct'][_0xf228('0xe2')]||!_0x2513e9[_0xf228('0x41')](_0xf228('0xe8'))['length'])_0x523810=_0x147605(_0xf228('0xeb')),_0x523810['find'](_0xf228('0xec'))[_0xf228('0x67')](_0x36a155['qtt']),_0x36a155=_0x2513e9['find'](_0xf228('0xed')),_0x36a155[_0xf228('0x8')]?_0x36a155[_0xf228('0xee')](_0x523810)['addClass']('qd-bap-item-added'):_0x2513e9[_0xf228('0xee')](_0x523810);}_0x10beca&&(window[_0xf228('0x81')][_0xf228('0xe2')]=!0x1);};window[_0xf228('0x81')][_0xf228('0x82')]=function(){window['_QuatroDigital_AmountProduct']['allowRecalculate']=!0x0;_0x2d007b[_0xf228('0x72')](this);};_0x147605(document)['ajaxStop'](function(){_0x2d007b[_0xf228('0x72')](this);});}catch(_0x3a9dd8){_0xf228('0x3')!==typeof console&&_0xf228('0xc')===typeof console[_0xf228('0xd')]&&console[_0xf228('0xd')](_0xf228('0xe'),_0x3a9dd8);}}(this));(function(){try{var _0x52d688=jQuery,_0x5cacc2,_0x242d53={'selector':_0xf228('0xef'),'dropDown':{},'buyButton':{}};_0x52d688[_0xf228('0xf0')]=function(_0x5961b7){var _0x516405={};_0x5cacc2=_0x52d688[_0xf228('0x21')](!0x0,{},_0x242d53,_0x5961b7);_0x5961b7=_0x52d688(_0x5cacc2[_0xf228('0xf1')])[_0xf228('0x1a')](_0x5cacc2[_0xf228('0xf2')]);_0x516405[_0xf228('0xf3')]=_0xf228('0x3')!==typeof _0x5cacc2['dropDown'][_0xf228('0x59')]&&!0x1===_0x5cacc2[_0xf228('0xf2')][_0xf228('0x59')]?_0x52d688(_0x5cacc2[_0xf228('0xf1')])[_0xf228('0xf4')](_0x5961b7['fn'],_0x5cacc2[_0xf228('0xf3')]):_0x52d688(_0x5cacc2['selector'])['QD_buyButton'](_0x5cacc2['buyButton']);_0x516405[_0xf228('0xf2')]=_0x5961b7;return _0x516405;};_0x52d688['fn']['smartCart']=function(){_0xf228('0x30')===typeof console&&_0xf228('0xc')===typeof console[_0xf228('0xf')]&&console[_0xf228('0xf')](_0xf228('0xf5'));};_0x52d688['smartCart']=_0x52d688['fn'][_0xf228('0xf6')];}catch(_0xf1ab56){'undefined'!==typeof console&&'function'===typeof console[_0xf228('0xd')]&&console[_0xf228('0xd')]('Oooops!\x20',_0xf1ab56);}}());

/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

var _0x15e4=['scrollTop','bottom','height','first','length','Problemas\x20:(\x20.\x20Detalhes:\x20','addClass','qd-sil-image-loaded','attr','sizes','width','qd-sil-image','insertAfter','closest','qd-sil-on','offset','top','push','each','extend','QD_SIL_scrollRange','scroll','documentElement','trigger','QD_SIL_scroll','function','QD_smartImageLoad','henzntvn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','toUpperCase','ite','join','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Quatro\x20Digital\x20-\x20Smart\x20Image\x20Load','object','undefined','error','warn','unshift','alerta','toLowerCase','aviso','info','apply','300','find','imageWrapper','not','img:visible'];(function(_0x31b5bf,_0x16cdd7){var _0x23c2fa=function(_0xf10c05){while(--_0xf10c05){_0x31b5bf['push'](_0x31b5bf['shift']());}};_0x23c2fa(++_0x16cdd7);}(_0x15e4,0x193));var _0x415e=function(_0x37a3eb,_0x4b8f7f){_0x37a3eb=_0x37a3eb-0x0;var _0x177095=_0x15e4[_0x37a3eb];return _0x177095;};(function(_0x28d94f){'use strict';var _0x27f33a=jQuery;if(typeof _0x27f33a['fn']['QD_smartImageLoad']===_0x415e('0x0'))return;_0x27f33a['fn'][_0x415e('0x1')]=function(){};var _0x18d2b4=function(_0x179812){var _0x595d78={'c':_0x415e('0x2')};return function(_0x3e0740){var _0x4fe458,_0x43cfbe,_0x488414,_0x125c81;_0x43cfbe=function(_0x2eba7c){return _0x2eba7c;};_0x488414=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3e0740=_0x3e0740['d'+_0x488414[0x10]+'c'+_0x488414[0x11]+'m'+_0x43cfbe(_0x488414[0x1])+'n'+_0x488414[0xd]]['l'+_0x488414[0x12]+'c'+_0x488414[0x0]+'ti'+_0x43cfbe('o')+'n'];_0x4fe458=function(_0x599ad4){return escape(encodeURIComponent(_0x599ad4['replace'](/\./g,'¨')[_0x415e('0x3')](/[a-zA-Z]/g,function(_0x4b9475){return String[_0x415e('0x4')](('Z'>=_0x4b9475?0x5a:0x7a)>=(_0x4b9475=_0x4b9475['charCodeAt'](0x0)+0xd)?_0x4b9475:_0x4b9475-0x1a);})));};var _0x238322=_0x4fe458(_0x3e0740[[_0x488414[0x9],_0x43cfbe('o'),_0x488414[0xc],_0x488414[_0x43cfbe(0xd)]]['join']('')]);_0x4fe458=_0x4fe458((window[['js',_0x43cfbe('no'),'m',_0x488414[0x1],_0x488414[0x4][_0x415e('0x5')](),_0x415e('0x6')][_0x415e('0x7')]('')]||_0x415e('0x8'))+['.v',_0x488414[0xd],'e',_0x43cfbe('x'),'co',_0x43cfbe('mm'),_0x415e('0x9'),_0x488414[0x1],'.c',_0x43cfbe('o'),'m.',_0x488414[0x13],'r'][_0x415e('0x7')](''));for(var _0x227127 in _0x595d78){if(_0x4fe458===_0x227127+_0x595d78[_0x227127]||_0x238322===_0x227127+_0x595d78[_0x227127]){_0x125c81='tr'+_0x488414[0x11]+'e';break;}_0x125c81='f'+_0x488414[0x0]+'ls'+_0x43cfbe(_0x488414[0x1])+'';}_0x43cfbe=!0x1;-0x1<_0x3e0740[[_0x488414[0xc],'e',_0x488414[0x0],'rc',_0x488414[0x9]][_0x415e('0x7')]('')][_0x415e('0xa')](_0x415e('0xb'))&&(_0x43cfbe=!0x0);return[_0x125c81,_0x43cfbe];}(_0x179812);}(window);if(!eval(_0x18d2b4[0x0]))return _0x18d2b4[0x1]?_0x449de5(_0x415e('0xc')):!0x1;var _0x40c164=_0x415e('0xd');var _0x449de5=function(_0x246125,_0x220893){if(_0x415e('0xe')===typeof console&&_0x415e('0xf')!==typeof console[_0x415e('0x10')]&&_0x415e('0xf')!==typeof console['info']&&_0x415e('0xf')!==typeof console[_0x415e('0x11')]){if(_0x415e('0xe')==typeof _0x246125&&_0x415e('0x0')==typeof _0x246125['unshift']){_0x246125[_0x415e('0x12')]('['+_0x40c164+']\x0a');var _0x2ca622=_0x246125;}else _0x2ca622=['['+_0x40c164+']\x0a',_0x246125];if(_0x415e('0xf')==typeof _0x220893||_0x415e('0x13')!==_0x220893[_0x415e('0x14')]()&&_0x415e('0x15')!==_0x220893[_0x415e('0x14')]())if(_0x415e('0xf')!=typeof _0x220893&&_0x415e('0x16')==_0x220893[_0x415e('0x14')]())try{console[_0x415e('0x16')]['apply'](console,_0x2ca622);}catch(_0x46f336){try{console[_0x415e('0x16')](_0x2ca622[_0x415e('0x7')]('\x0a'));}catch(_0x550dea){}}else try{console[_0x415e('0x10')]['apply'](console,_0x2ca622);}catch(_0x622df2){try{console['error'](_0x2ca622['join']('\x0a'));}catch(_0x6ee796){}}else try{console['warn'][_0x415e('0x17')](console,_0x2ca622);}catch(_0x545c1f){try{console[_0x415e('0x11')](_0x2ca622[_0x415e('0x7')]('\x0a'));}catch(_0x23e34a){}}}};var _0x3d65ce=/(ids\/[0-9]+-)[0-9-]+/i;var _0x33d3a1={'imageWrapper':'.qd_sil_img_wrapper','sizes':{'width':_0x415e('0x18'),'height':_0x415e('0x18')}};var _0x281f38=function(_0x52c3b3,_0x36324e){'use strict';_0x20c14b();_0x27f33a(window)['on']('QD_SIL_scroll\x20QuatroDigital.is_Callback',_0x20c14b);function _0x20c14b(){try{var _0x1b93a8=_0x52c3b3[_0x415e('0x19')](_0x36324e[_0x415e('0x1a')])[_0x415e('0x1b')]('.qd-sil-on')[_0x415e('0x19')](_0x415e('0x1c'));if(!_0x1b93a8['length'])return;var _0x4fc373=_0x27f33a(window);var _0x2ed9f9={'top':_0x4fc373[_0x415e('0x1d')]()};_0x2ed9f9[_0x415e('0x1e')]=_0x2ed9f9['top']+_0x4fc373[_0x415e('0x1f')]();var _0x527254=_0x1b93a8[_0x415e('0x20')]()[_0x415e('0x1f')]();var _0xffecb8=_0x271b1e(_0x1b93a8,_0x2ed9f9,_0x527254);for(var _0x4bee71=0x0;_0x4bee71<_0xffecb8[_0x415e('0x21')];_0x4bee71++)_0x85fff2(_0x27f33a(_0xffecb8[_0x4bee71]));}catch(_0x4df5fe){typeof console!==_0x415e('0xf')&&typeof console[_0x415e('0x10')]===_0x415e('0x0')&&console[_0x415e('0x10')](_0x415e('0x22'),_0x4df5fe);}}function _0x85fff2(_0x25f935){var _0x4de190=_0x25f935['clone']();_0x4de190['on']('load',function(){_0x27f33a(this)[_0x415e('0x23')](_0x415e('0x24'));});_0x4de190[_0x415e('0x25')]({'src':_0x4de190[0x0]['src'][_0x415e('0x3')](_0x3d65ce,'$1'+_0x36324e[_0x415e('0x26')][_0x415e('0x27')]+'-'+_0x36324e['sizes']['height']),'width':_0x36324e['sizes'][_0x415e('0x27')],'height':_0x36324e[_0x415e('0x26')][_0x415e('0x1f')]});_0x4de190[_0x415e('0x23')](_0x415e('0x28'))[_0x415e('0x29')](_0x25f935);_0x4de190[_0x415e('0x2a')](_0x36324e[_0x415e('0x1a')])[_0x415e('0x23')](_0x415e('0x2b'));}function _0x271b1e(_0x5974bf,_0x40c1e8,_0x8a580a){var _0x260f82;var _0x3ea579=[];for(var _0x3982fc=0x0;_0x3982fc<_0x5974bf[_0x415e('0x21')];_0x3982fc++){_0x260f82=_0x27f33a(_0x5974bf[_0x3982fc])[_0x415e('0x2c')]();_0x260f82[_0x415e('0x1e')]=_0x260f82[_0x415e('0x2d')]+_0x8a580a;if(!(_0x40c1e8[_0x415e('0x1e')]<_0x260f82[_0x415e('0x2d')]||_0x40c1e8[_0x415e('0x2d')]>_0x260f82[_0x415e('0x1e')])){_0x3ea579[_0x415e('0x2e')](_0x5974bf[_0x3982fc]);}}return _0x3ea579;};};_0x27f33a['fn'][_0x415e('0x1')]=function(_0x23f265){var _0xac2acb=_0x27f33a(this);if(!_0xac2acb[_0x415e('0x21')])return _0xac2acb;_0xac2acb[_0x415e('0x2f')](function(){var _0x721d1b=_0x27f33a(this);_0x721d1b['QD_smartImageLoad']=new _0x281f38(_0x721d1b,_0x27f33a[_0x415e('0x30')]({},_0x33d3a1,_0x23f265));});return _0xac2acb;};window[_0x415e('0x31')]=0x28;var _0x5a6448=QD_SIL_scrollRange;var _0x475347=0x0;_0x27f33a(window)['on'](_0x415e('0x32'),function(){var _0x565cc1=document[_0x415e('0x33')][_0x415e('0x1d')];if(_0x565cc1>_0x475347+_0x5a6448||_0x565cc1<_0x475347-_0x5a6448){_0x27f33a(window)[_0x415e('0x34')](_0x415e('0x35'));_0x475347=_0x565cc1;}});}(this));

/* Automatizador de comments box do Facebook // 1.6 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a=$(".fb-comments");a.length&&a.attr("data-href",document.location.href.split("#").shift().split("?").shift());$("#fb-root").length||$("body").append('<div id="fb-root"></div>');if(!$("script#facebook-jssdk").length){a=$("meta[property='fb:app_id']").attr("content")||!1;var b,c=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||(b=document.createElement("script"),b.id="facebook-jssdk",b.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+
(a?"&appId="+a:""),c.parentNode.insertBefore(b,c))}"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse()});

/* Quatro Digital - Smart Photo Carousel // 1.0 // Carlos Vinicius // Todos os direitos reservados */

/*FUNÇÕES AUXILIARES*/

(function(t){function h(d,c,b){b=b[0];try{var e=d.find(c.imageWrapper);e.length||(e=a("<div></div>").appendTo(d));e.empty().attr("class",c.imageWrapper.slice(1));var f=d.find(c.thumbsWrapper);f.length||(f=a("<div></div>").appendTo(d));f.empty().attr("class",c.thumbsWrapper.slice(1));d=[];var k;for(k=0;k<b.Images.length;k++)d.push(b.Images[k][0]);var g;for(g=0;g<d.length;g++){var l=d[g].Path;var h=a("<img>",{"data-lazy":l.replace(m,"$1"+c.sizes.image)}).appendTo(e);h.wrap("<div></div>").wrap(a("<a></a>",
{href:l.replace(m,"$1"+c.sizes.imagezoom),"class":"jqzoom"}));a("<img>",{src:l.replace(m,"$1"+c.sizes.thumb)}).appendTo(f).wrap("<div></div>");d[g].IsMain&&(c.slickOptions.images.initialSlide=g)}}catch(n){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Problemas :( . Detalhes: ",n)}try{c.slickOptions.images.asNavFor=f,a(e).slick(c.slickOptions.images),c.slickOptions.thumbs.asNavFor=e,a(f).slick(c.slickOptions.thumbs),a(".jqzoom").jqzoom(c.zoomOptions),a(f).on("afterChange",
function(){a(e).slick("slickGoTo",a(this).slick("slickCurrentSlide"))})}catch(n){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Problemas :( . Detalhes: ",n)}}function p(d){return a.qdAjax({url:"/produto/sku/"+d,dataType:"json",error:function(){alert("erro ao buscar objeto SKU")}})}var a=jQuery;if("function"!==typeof a.fn.QD_smartPhotoCarousel){var m=/(ids\/[0-9]+-)[0-9-]+/i,q={imageWrapper:".qd-spc-image",thumbsWrapper:".qd-spc-thumbs",sizes:{thumb:"150-150",image:"500-500",
imagezoom:"1000-1000"},slickOptions:{images:{lazyLoad:"ondemand",infinite:!1,arrows:!1},thumbs:{slidesToShow:3,slidesToScroll:1,arrows:!1,focusOnSelect:!0}},zoomOptions:{}},r=function(d,c,b){if(!b&&(b=skuJson.skus[0].sku,skuJson.avaliable))for(var e=0;e<skuJson.skus.length;e++)if(skuJson.skus[e].avaliable){b=skuJson.skus[e].sku;break}p(b).done(function(a){h(d,c,a)});a(window).on("skuChanged.vtex",function(a,e,b){p(b.sku).done(function(a){h(d,c,a)})})};a.fn.QD_smartPhotoCarousel=function(d,c){var b=
a(this);if(!b.length)return b;b.each(function(){var b=a(this);b.QD_smartPhotoCarousel=new r(b,a.extend(!0,{},q,d),c)});return b};a(function(){a(".qd_auto_smart_photo_carousel").QD_smartPhotoCarousel()})}})(this);