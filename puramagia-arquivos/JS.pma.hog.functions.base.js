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
		applyMosaicCategorieBanners: function () {
			$('.banner-qd-v1-responsive > .box-banner').QD_mosaicBanners({
				// classFourColumn: "col-xs-12 col-sm-6 col-md-2"
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
				autoplay: true,
				autoplaySpeed: 7000,
				draggable: true,
				responsive: [
					{
						breakpoint: 767,
						settings: {
							dots: true
						}
					}
				]
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
			$('.product-qd-v1-image').QD_smartPhotoCarousel({
				imageWrapper: '#include',
				thumbsWrapper: '.thumbs',
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
						slidesToShow: 3,
						slidesToScroll: 1,
						arrows: false,
						focusOnSelect: true
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
var _0xaa4a=['qd-ssa-on','qd-ssa-skus-','skus','split','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','message','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','trigger','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','off','vtex.sku.selected.QD','QuatroDigital.ssa.prodUnavailable','qd-ssa-sku-prod-unavailable','henzntvn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','join','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','qdPlugin','QuatroDigital.ssa.skuSelected','initialSkuSelected','prod','sku','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','unavailable','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','function','qdAjax','qdAjaxQueue','extend','url','opts','call','error','complete','parameters','callbackFns','successPopulated','boolean','errorPopulated','completePopulated','success','object','clearQueueDelay','undefined','ajax','jqXHR','readyState','textStatus','errorThrown','2.1','/produto/sku/','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','QD_smartStockAvailable','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','alerta','toLowerCase','aviso','info','apply','removeClass','qd-ssa-sku-no-selected','addClass','qd-ssa-sku-selected','SkuSellersInformation','AvailableQuantity','attr','data-qd-ssa-qtt','each','hide','qd-ssa-hide','qd-ssa-show','filter','[data-qd-ssa-text=\x22','length','html','replace','#qtt','show','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20'];(function(_0x56d3b2,_0x526a3c){var _0x4f0326=function(_0x146485){while(--_0x146485){_0x56d3b2['push'](_0x56d3b2['shift']());}};_0x4f0326(++_0x526a3c);}(_0xaa4a,0xd4));var _0xaaa4=function(_0x5d0cbc,_0x18eef9){_0x5d0cbc=_0x5d0cbc-0x0;var _0x3284ce=_0xaa4a[_0x5d0cbc];return _0x3284ce;};(function(_0x1c0766){if(_0xaaa4('0x0')!==typeof _0x1c0766[_0xaaa4('0x1')]){var _0x295fb3={};_0x1c0766[_0xaaa4('0x2')]=_0x295fb3;_0x1c0766[_0xaaa4('0x1')]=function(_0x2e8932){var _0x49910e=_0x1c0766[_0xaaa4('0x3')]({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x2e8932);var _0x474445=escape(encodeURIComponent(_0x49910e[_0xaaa4('0x4')]));_0x295fb3[_0x474445]=_0x295fb3[_0x474445]||{};_0x295fb3[_0x474445][_0xaaa4('0x5')]=_0x295fb3[_0x474445][_0xaaa4('0x5')]||[];_0x295fb3[_0x474445][_0xaaa4('0x5')]['push']({'success':function(_0x103916,_0xd10920,_0xe89739){_0x49910e['success'][_0xaaa4('0x6')](this,_0x103916,_0xd10920,_0xe89739);},'error':function(_0x2f2ee2,_0x2ade64,_0x54cd78){_0x49910e[_0xaaa4('0x7')]['call'](this,_0x2f2ee2,_0x2ade64,_0x54cd78);},'complete':function(_0x335d9c,_0x1bab86){_0x49910e[_0xaaa4('0x8')][_0xaaa4('0x6')](this,_0x335d9c,_0x1bab86);}});_0x295fb3[_0x474445]['parameters']=_0x295fb3[_0x474445][_0xaaa4('0x9')]||{'success':{},'error':{},'complete':{}};_0x295fb3[_0x474445][_0xaaa4('0xa')]=_0x295fb3[_0x474445]['callbackFns']||{};_0x295fb3[_0x474445]['callbackFns'][_0xaaa4('0xb')]=_0xaaa4('0xc')===typeof _0x295fb3[_0x474445][_0xaaa4('0xa')][_0xaaa4('0xb')]?_0x295fb3[_0x474445][_0xaaa4('0xa')][_0xaaa4('0xb')]:!0x1;_0x295fb3[_0x474445]['callbackFns'][_0xaaa4('0xd')]='boolean'===typeof _0x295fb3[_0x474445][_0xaaa4('0xa')][_0xaaa4('0xd')]?_0x295fb3[_0x474445]['callbackFns']['errorPopulated']:!0x1;_0x295fb3[_0x474445][_0xaaa4('0xa')]['completePopulated']='boolean'===typeof _0x295fb3[_0x474445]['callbackFns'][_0xaaa4('0xe')]?_0x295fb3[_0x474445][_0xaaa4('0xa')][_0xaaa4('0xe')]:!0x1;_0x2e8932=_0x1c0766[_0xaaa4('0x3')]({},_0x49910e,{'success':function(_0x5695c6,_0xb08940,_0x41b075){_0x295fb3[_0x474445][_0xaaa4('0x9')][_0xaaa4('0xf')]={'data':_0x5695c6,'textStatus':_0xb08940,'jqXHR':_0x41b075};_0x295fb3[_0x474445]['callbackFns'][_0xaaa4('0xb')]=!0x0;for(var _0x389e53 in _0x295fb3[_0x474445][_0xaaa4('0x5')])_0xaaa4('0x10')===typeof _0x295fb3[_0x474445]['opts'][_0x389e53]&&(_0x295fb3[_0x474445]['opts'][_0x389e53]['success']['call'](this,_0x5695c6,_0xb08940,_0x41b075),_0x295fb3[_0x474445][_0xaaa4('0x5')][_0x389e53]['success']=function(){});},'error':function(_0xbadaa8,_0x53b04e,_0x5dc618){_0x295fb3[_0x474445][_0xaaa4('0x9')]['error']={'errorThrown':_0x5dc618,'textStatus':_0x53b04e,'jqXHR':_0xbadaa8};_0x295fb3[_0x474445][_0xaaa4('0xa')]['errorPopulated']=!0x0;for(var _0x407739 in _0x295fb3[_0x474445]['opts'])_0xaaa4('0x10')===typeof _0x295fb3[_0x474445][_0xaaa4('0x5')][_0x407739]&&(_0x295fb3[_0x474445][_0xaaa4('0x5')][_0x407739][_0xaaa4('0x7')][_0xaaa4('0x6')](this,_0xbadaa8,_0x53b04e,_0x5dc618),_0x295fb3[_0x474445][_0xaaa4('0x5')][_0x407739]['error']=function(){});},'complete':function(_0x1184df,_0x1535c5){_0x295fb3[_0x474445][_0xaaa4('0x9')][_0xaaa4('0x8')]={'textStatus':_0x1535c5,'jqXHR':_0x1184df};_0x295fb3[_0x474445][_0xaaa4('0xa')][_0xaaa4('0xe')]=!0x0;for(var _0x20345a in _0x295fb3[_0x474445][_0xaaa4('0x5')])'object'===typeof _0x295fb3[_0x474445][_0xaaa4('0x5')][_0x20345a]&&(_0x295fb3[_0x474445][_0xaaa4('0x5')][_0x20345a][_0xaaa4('0x8')][_0xaaa4('0x6')](this,_0x1184df,_0x1535c5),_0x295fb3[_0x474445][_0xaaa4('0x5')][_0x20345a]['complete']=function(){});isNaN(parseInt(_0x49910e['clearQueueDelay']))||setTimeout(function(){_0x295fb3[_0x474445]['jqXHR']=void 0x0;_0x295fb3[_0x474445][_0xaaa4('0x5')]=void 0x0;_0x295fb3[_0x474445]['parameters']=void 0x0;_0x295fb3[_0x474445][_0xaaa4('0xa')]=void 0x0;},_0x49910e[_0xaaa4('0x11')]);}});_0xaaa4('0x12')===typeof _0x295fb3[_0x474445]['jqXHR']?_0x295fb3[_0x474445]['jqXHR']=_0x1c0766[_0xaaa4('0x13')](_0x2e8932):_0x295fb3[_0x474445][_0xaaa4('0x14')]&&_0x295fb3[_0x474445][_0xaaa4('0x14')][_0xaaa4('0x15')]&&0x4==_0x295fb3[_0x474445]['jqXHR']['readyState']&&(_0x295fb3[_0x474445][_0xaaa4('0xa')][_0xaaa4('0xb')]&&_0x2e8932[_0xaaa4('0xf')](_0x295fb3[_0x474445][_0xaaa4('0x9')]['success']['data'],_0x295fb3[_0x474445][_0xaaa4('0x9')][_0xaaa4('0xf')][_0xaaa4('0x16')],_0x295fb3[_0x474445][_0xaaa4('0x9')][_0xaaa4('0xf')][_0xaaa4('0x14')]),_0x295fb3[_0x474445][_0xaaa4('0xa')][_0xaaa4('0xd')]&&_0x2e8932[_0xaaa4('0x7')](_0x295fb3[_0x474445][_0xaaa4('0x9')]['error']['jqXHR'],_0x295fb3[_0x474445][_0xaaa4('0x9')][_0xaaa4('0x7')][_0xaaa4('0x16')],_0x295fb3[_0x474445]['parameters'][_0xaaa4('0x7')][_0xaaa4('0x17')]),_0x295fb3[_0x474445][_0xaaa4('0xa')][_0xaaa4('0xe')]&&_0x2e8932[_0xaaa4('0x8')](_0x295fb3[_0x474445]['parameters']['complete'][_0xaaa4('0x14')],_0x295fb3[_0x474445][_0xaaa4('0x9')][_0xaaa4('0x8')]['textStatus']));};_0x1c0766[_0xaaa4('0x1')]['version']=_0xaaa4('0x18');}}(jQuery));(function(_0xc2dd06){function _0x387c37(_0x1a83d2,_0x4127ad){_0x35c7aa[_0xaaa4('0x1')]({'url':_0xaaa4('0x19')+_0x1a83d2,'clearQueueDelay':null,'success':_0x4127ad,'error':function(){_0x2e4c5f(_0xaaa4('0x1a'));}});}var _0x35c7aa=jQuery;if(_0xaaa4('0x0')!==typeof _0x35c7aa['fn'][_0xaaa4('0x1b')]){var _0x2e4c5f=function(_0x30a433,_0x4d0068){if(_0xaaa4('0x10')===typeof console){var _0x234b21;_0xaaa4('0x10')===typeof _0x30a433?(_0x30a433[_0xaaa4('0x1c')](_0xaaa4('0x1d')),_0x234b21=_0x30a433):_0x234b21=['[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a'+_0x30a433];_0xaaa4('0x12')===typeof _0x4d0068||_0xaaa4('0x1e')!==_0x4d0068[_0xaaa4('0x1f')]()&&_0xaaa4('0x20')!==_0x4d0068[_0xaaa4('0x1f')]()?'undefined'!==typeof _0x4d0068&&_0xaaa4('0x21')===_0x4d0068[_0xaaa4('0x1f')]()?console[_0xaaa4('0x21')][_0xaaa4('0x22')](console,_0x234b21):console[_0xaaa4('0x7')][_0xaaa4('0x22')](console,_0x234b21):console['warn'][_0xaaa4('0x22')](console,_0x234b21);}},_0x28453f={},_0x318426=function(_0x3e9803,_0x34c4dd){function _0x9fb5eb(_0x238279){try{_0x3e9803[_0xaaa4('0x23')](_0xaaa4('0x24'))[_0xaaa4('0x25')](_0xaaa4('0x26'));var _0x4f97d2=_0x238279[0x0][_0xaaa4('0x27')][0x0][_0xaaa4('0x28')];_0x3e9803[_0xaaa4('0x29')](_0xaaa4('0x2a'),_0x4f97d2);_0x3e9803[_0xaaa4('0x2b')](function(){var _0x3e9803=_0x35c7aa(this)['find']('[data-qd-ssa-text]');if(0x1>_0x4f97d2)return _0x3e9803[_0xaaa4('0x2c')]()['addClass'](_0xaaa4('0x2d'))[_0xaaa4('0x23')](_0xaaa4('0x2e'));var _0x238279=_0x3e9803[_0xaaa4('0x2f')](_0xaaa4('0x30')+_0x4f97d2+'\x22]');_0x238279=_0x238279[_0xaaa4('0x31')]?_0x238279:_0x3e9803[_0xaaa4('0x2f')]('[data-qd-ssa-text=\x22default\x22]');_0x3e9803[_0xaaa4('0x2c')]()[_0xaaa4('0x25')](_0xaaa4('0x2d'))[_0xaaa4('0x23')](_0xaaa4('0x2e'));_0x238279[_0xaaa4('0x32')]((_0x238279[_0xaaa4('0x32')]()||'')[_0xaaa4('0x33')](_0xaaa4('0x34'),_0x4f97d2));_0x238279[_0xaaa4('0x35')]()[_0xaaa4('0x25')](_0xaaa4('0x2e'))[_0xaaa4('0x23')](_0xaaa4('0x2d'));});}catch(_0x1549ac){_0x2e4c5f([_0xaaa4('0x36'),_0x1549ac['message']]);}}if(_0x3e9803[_0xaaa4('0x31')]){_0x3e9803['addClass'](_0xaaa4('0x37'));_0x3e9803[_0xaaa4('0x25')]('qd-ssa-sku-no-selected');try{_0x3e9803[_0xaaa4('0x25')](_0xaaa4('0x38')+vtxctx[_0xaaa4('0x39')][_0xaaa4('0x3a')](';')[_0xaaa4('0x31')]);}catch(_0x1914f9){_0x2e4c5f([_0xaaa4('0x3b'),_0x1914f9[_0xaaa4('0x3c')]]);}_0x35c7aa(window)['on'](_0xaaa4('0x3d'),function(_0xd20f68,_0x51b0b3,_0x532624){try{_0x387c37(_0x532624['sku'],function(_0x40282c){_0x9fb5eb(_0x40282c);0x1===vtxctx[_0xaaa4('0x39')][_0xaaa4('0x3a')](';')['length']&&0x0==_0x40282c[0x0]['SkuSellersInformation'][0x0][_0xaaa4('0x28')]&&_0x35c7aa(window)[_0xaaa4('0x3e')]('QuatroDigital.ssa.prodUnavailable');});}catch(_0x50c556){_0x2e4c5f([_0xaaa4('0x3f'),_0x50c556[_0xaaa4('0x3c')]]);}});_0x35c7aa(window)[_0xaaa4('0x40')](_0xaaa4('0x41'));_0x35c7aa(window)['on'](_0xaaa4('0x42'),function(){_0x3e9803['addClass'](_0xaaa4('0x43'))[_0xaaa4('0x2c')]();});}};_0xc2dd06=function(_0x31657c){var _0x13a98a={'c':_0xaaa4('0x44')};return function(_0xf9e672){var _0x4a3d6a=function(_0x45efd9){return _0x45efd9;};var _0x4cf397=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0xf9e672=_0xf9e672['d'+_0x4cf397[0x10]+'c'+_0x4cf397[0x11]+'m'+_0x4a3d6a(_0x4cf397[0x1])+'n'+_0x4cf397[0xd]]['l'+_0x4cf397[0x12]+'c'+_0x4cf397[0x0]+'ti'+_0x4a3d6a('o')+'n'];var _0x1f9c37=function(_0x47ddad){return escape(encodeURIComponent(_0x47ddad[_0xaaa4('0x33')](/\./g,'¨')[_0xaaa4('0x33')](/[a-zA-Z]/g,function(_0x3d820b){return String[_0xaaa4('0x45')](('Z'>=_0x3d820b?0x5a:0x7a)>=(_0x3d820b=_0x3d820b[_0xaaa4('0x46')](0x0)+0xd)?_0x3d820b:_0x3d820b-0x1a);})));};var _0x47d5ae=_0x1f9c37(_0xf9e672[[_0x4cf397[0x9],_0x4a3d6a('o'),_0x4cf397[0xc],_0x4cf397[_0x4a3d6a(0xd)]][_0xaaa4('0x47')]('')]);_0x1f9c37=_0x1f9c37((window[['js',_0x4a3d6a('no'),'m',_0x4cf397[0x1],_0x4cf397[0x4]['toUpperCase'](),_0xaaa4('0x48')][_0xaaa4('0x47')]('')]||_0xaaa4('0x49'))+['.v',_0x4cf397[0xd],'e',_0x4a3d6a('x'),'co',_0x4a3d6a('mm'),_0xaaa4('0x4a'),_0x4cf397[0x1],'.c',_0x4a3d6a('o'),'m.',_0x4cf397[0x13],'r']['join'](''));for(var _0x513070 in _0x13a98a){if(_0x1f9c37===_0x513070+_0x13a98a[_0x513070]||_0x47d5ae===_0x513070+_0x13a98a[_0x513070]){var _0x2d7a0c='tr'+_0x4cf397[0x11]+'e';break;}_0x2d7a0c='f'+_0x4cf397[0x0]+'ls'+_0x4a3d6a(_0x4cf397[0x1])+'';}_0x4a3d6a=!0x1;-0x1<_0xf9e672[[_0x4cf397[0xc],'e',_0x4cf397[0x0],'rc',_0x4cf397[0x9]][_0xaaa4('0x47')]('')][_0xaaa4('0x4b')](_0xaaa4('0x4c'))&&(_0x4a3d6a=!0x0);return[_0x2d7a0c,_0x4a3d6a];}(_0x31657c);}(window);if(!eval(_0xc2dd06[0x0]))return _0xc2dd06[0x1]?_0x2e4c5f(_0xaaa4('0x4d')):!0x1;_0x35c7aa['fn'][_0xaaa4('0x1b')]=function(_0x256689){var _0x4e3a3f=_0x35c7aa(this);_0x256689=_0x35c7aa[_0xaaa4('0x3')](!0x0,{},_0x28453f,_0x256689);_0x4e3a3f[_0xaaa4('0x4e')]=new _0x318426(_0x4e3a3f,_0x256689);try{_0xaaa4('0x10')===typeof _0x35c7aa['fn'][_0xaaa4('0x1b')]['initialSkuSelected']&&_0x35c7aa(window)[_0xaaa4('0x3e')](_0xaaa4('0x4f'),[_0x35c7aa['fn'][_0xaaa4('0x1b')][_0xaaa4('0x50')][_0xaaa4('0x51')],_0x35c7aa['fn']['QD_smartStockAvailable']['initialSkuSelected'][_0xaaa4('0x52')]]);}catch(_0x5aa528){_0x2e4c5f([_0xaaa4('0x53'),_0x5aa528[_0xaaa4('0x3c')]]);}_0x35c7aa['fn']['QD_smartStockAvailable']['unavailable']&&_0x35c7aa(window)['trigger'](_0xaaa4('0x42'));return _0x4e3a3f;};_0x35c7aa(window)['on'](_0xaaa4('0x41'),function(_0x586be1,_0x154001,_0x31fa4e){try{_0x35c7aa['fn'][_0xaaa4('0x1b')][_0xaaa4('0x50')]={'prod':_0x154001,'sku':_0x31fa4e},_0x35c7aa(this)[_0xaaa4('0x40')](_0x586be1);}catch(_0x2cd96e){_0x2e4c5f([_0xaaa4('0x54'),_0x2cd96e[_0xaaa4('0x3c')]]);}});_0x35c7aa(window)['on'](_0xaaa4('0x55'),function(_0x2a6d92,_0x30ef4f,_0x2d323b){try{for(var _0x54acb6=_0x2d323b[_0xaaa4('0x31')],_0x599ef6=_0x30ef4f=0x0;_0x599ef6<_0x54acb6&&!_0x2d323b[_0x599ef6]['available'];_0x599ef6++)_0x30ef4f+=0x1;_0x54acb6<=_0x30ef4f&&(_0x35c7aa['fn']['QD_smartStockAvailable'][_0xaaa4('0x56')]=!0x0);_0x35c7aa(this)['off'](_0x2a6d92);}catch(_0x2cc932){_0x2e4c5f([_0xaaa4('0x57'),_0x2cc932[_0xaaa4('0x3c')]]);}});_0x35c7aa(function(){_0x35c7aa(_0xaaa4('0x58'))[_0xaaa4('0x1b')]();});}}(window));
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
var _0x0bb1=['clone','insertBefore','hide','text','trim','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','li\x20>ul','qd-am-has-ul','qd-am-elem-','replaceSpecialChars','>li','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','children','qd-am-level-','add','qd-am-','-li','callback','QuatroDigital.am.callback','extend','.qd_amazing_menu_auto','closest','QD_amazingMenu','/qd-amazing-menu','undefined','info','warn','object','unshift','[QD\x20Amazing\x20Menu]\x0a','toLowerCase','aviso','apply','error','join','qdAmAddNdx','each','addClass','qd-am-li-','first','last','qd-am-last','henzntvn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','ite','---','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','filter','.qd-am-collection','length','parent','qd-am-collection-wrapper','url','html','img[alt=\x27','attr','data-qdam-value','getParent','.box-banner'];(function(_0x49f210,_0x271494){var _0x5784af=function(_0x3f76d4){while(--_0x3f76d4){_0x49f210['push'](_0x49f210['shift']());}};_0x5784af(++_0x271494);}(_0x0bb1,0xf9));var _0x10bb=function(_0x2a66e2,_0x3dd932){_0x2a66e2=_0x2a66e2-0x0;var _0x49270e=_0x0bb1[_0x2a66e2];return _0x49270e;};(function(_0x575fe0){_0x575fe0['fn']['getParent']=_0x575fe0['fn'][_0x10bb('0x0')];}(jQuery));(function(_0xdaa5dd){var _0x25ce13;var _0x5a05e6=jQuery;if('function'!==typeof _0x5a05e6['fn'][_0x10bb('0x1')]){var _0x2da976={'url':_0x10bb('0x2'),'callback':function(){},'ajaxCallback':function(){}};var _0x1acc27=function(_0x283b5c,_0x41933){if('object'===typeof console&&'undefined'!==typeof console['error']&&_0x10bb('0x3')!==typeof console[_0x10bb('0x4')]&&_0x10bb('0x3')!==typeof console[_0x10bb('0x5')]){var _0xf17ae9;_0x10bb('0x6')===typeof _0x283b5c?(_0x283b5c[_0x10bb('0x7')](_0x10bb('0x8')),_0xf17ae9=_0x283b5c):_0xf17ae9=[_0x10bb('0x8')+_0x283b5c];if('undefined'===typeof _0x41933||'alerta'!==_0x41933[_0x10bb('0x9')]()&&_0x10bb('0xa')!==_0x41933[_0x10bb('0x9')]())if('undefined'!==typeof _0x41933&&_0x10bb('0x4')===_0x41933[_0x10bb('0x9')]())try{console['info'][_0x10bb('0xb')](console,_0xf17ae9);}catch(_0xdb46fe){try{console[_0x10bb('0x4')](_0xf17ae9['join']('\x0a'));}catch(_0x21a1d1){}}else try{console[_0x10bb('0xc')][_0x10bb('0xb')](console,_0xf17ae9);}catch(_0x4cf0fb){try{console[_0x10bb('0xc')](_0xf17ae9[_0x10bb('0xd')]('\x0a'));}catch(_0x5ce45a){}}else try{console['warn']['apply'](console,_0xf17ae9);}catch(_0x2e9fbd){try{console[_0x10bb('0x5')](_0xf17ae9['join']('\x0a'));}catch(_0x18c2cb){}}}};_0x5a05e6['fn'][_0x10bb('0xe')]=function(){var _0x328934=_0x5a05e6(this);_0x328934[_0x10bb('0xf')](function(_0x1c0fce){_0x5a05e6(this)[_0x10bb('0x10')](_0x10bb('0x11')+_0x1c0fce);});_0x328934[_0x10bb('0x12')]()[_0x10bb('0x10')]('qd-am-first');_0x328934[_0x10bb('0x13')]()[_0x10bb('0x10')](_0x10bb('0x14'));return _0x328934;};_0x5a05e6['fn']['QD_amazingMenu']=function(){};_0xdaa5dd=function(_0x576b4e){var _0x3c3305={'c':_0x10bb('0x15')};return function(_0x5d47c6){var _0x59566e=function(_0x31d74d){return _0x31d74d;};var _0x31345d=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5d47c6=_0x5d47c6['d'+_0x31345d[0x10]+'c'+_0x31345d[0x11]+'m'+_0x59566e(_0x31345d[0x1])+'n'+_0x31345d[0xd]]['l'+_0x31345d[0x12]+'c'+_0x31345d[0x0]+'ti'+_0x59566e('o')+'n'];var _0x18232c=function(_0x3eab75){return escape(encodeURIComponent(_0x3eab75[_0x10bb('0x16')](/\./g,'¨')[_0x10bb('0x16')](/[a-zA-Z]/g,function(_0x4a9019){return String[_0x10bb('0x17')](('Z'>=_0x4a9019?0x5a:0x7a)>=(_0x4a9019=_0x4a9019[_0x10bb('0x18')](0x0)+0xd)?_0x4a9019:_0x4a9019-0x1a);})));};var _0x273b1c=_0x18232c(_0x5d47c6[[_0x31345d[0x9],_0x59566e('o'),_0x31345d[0xc],_0x31345d[_0x59566e(0xd)]][_0x10bb('0xd')]('')]);_0x18232c=_0x18232c((window[['js',_0x59566e('no'),'m',_0x31345d[0x1],_0x31345d[0x4][_0x10bb('0x19')](),_0x10bb('0x1a')]['join']('')]||_0x10bb('0x1b'))+['.v',_0x31345d[0xd],'e',_0x59566e('x'),'co',_0x59566e('mm'),'erc',_0x31345d[0x1],'.c',_0x59566e('o'),'m.',_0x31345d[0x13],'r'][_0x10bb('0xd')](''));for(var _0x33a211 in _0x3c3305){if(_0x18232c===_0x33a211+_0x3c3305[_0x33a211]||_0x273b1c===_0x33a211+_0x3c3305[_0x33a211]){var _0x384e75='tr'+_0x31345d[0x11]+'e';break;}_0x384e75='f'+_0x31345d[0x0]+'ls'+_0x59566e(_0x31345d[0x1])+'';}_0x59566e=!0x1;-0x1<_0x5d47c6[[_0x31345d[0xc],'e',_0x31345d[0x0],'rc',_0x31345d[0x9]][_0x10bb('0xd')]('')]['indexOf'](_0x10bb('0x1c'))&&(_0x59566e=!0x0);return[_0x384e75,_0x59566e];}(_0x576b4e);}(window);if(!eval(_0xdaa5dd[0x0]))return _0xdaa5dd[0x1]?_0x1acc27(_0x10bb('0x1d')):!0x1;var _0x190822=function(_0x389840){var _0x34110=_0x389840[_0x10bb('0x1e')]('.qd_am_code');var _0x4f3ad1=_0x34110[_0x10bb('0x1f')]('.qd-am-banner');var _0x57daae=_0x34110[_0x10bb('0x1f')](_0x10bb('0x20'));if(_0x4f3ad1[_0x10bb('0x21')]||_0x57daae[_0x10bb('0x21')])_0x4f3ad1[_0x10bb('0x22')]()[_0x10bb('0x10')]('qd-am-banner-wrapper'),_0x57daae[_0x10bb('0x22')]()['addClass'](_0x10bb('0x23')),_0x5a05e6['qdAjax']({'url':_0x25ce13[_0x10bb('0x24')],'dataType':_0x10bb('0x25'),'success':function(_0x4d821b){var _0x567bbf=_0x5a05e6(_0x4d821b);_0x4f3ad1[_0x10bb('0xf')](function(){var _0x4d821b=_0x5a05e6(this);var _0x14d857=_0x567bbf['find'](_0x10bb('0x26')+_0x4d821b[_0x10bb('0x27')](_0x10bb('0x28'))+'\x27]');_0x14d857[_0x10bb('0x21')]&&(_0x14d857[_0x10bb('0xf')](function(){_0x5a05e6(this)[_0x10bb('0x29')](_0x10bb('0x2a'))[_0x10bb('0x2b')]()[_0x10bb('0x2c')](_0x4d821b);}),_0x4d821b[_0x10bb('0x2d')]());})[_0x10bb('0x10')]('qd-am-content-loaded');_0x57daae['each'](function(){var _0x4d821b={};var _0x34bd04=_0x5a05e6(this);_0x567bbf['find']('h2')[_0x10bb('0xf')](function(){if(_0x5a05e6(this)[_0x10bb('0x2e')]()['trim']()[_0x10bb('0x9')]()==_0x34bd04['attr'](_0x10bb('0x28'))[_0x10bb('0x2f')]()[_0x10bb('0x9')]())return _0x4d821b=_0x5a05e6(this),!0x1;});_0x4d821b['length']&&(_0x4d821b[_0x10bb('0xf')](function(){_0x5a05e6(this)['getParent']('[class*=\x27colunas\x27]')[_0x10bb('0x2b')]()[_0x10bb('0x2c')](_0x34bd04);}),_0x34bd04[_0x10bb('0x2d')]());})[_0x10bb('0x10')]('qd-am-content-loaded');},'error':function(){_0x1acc27(_0x10bb('0x30')+_0x25ce13[_0x10bb('0x24')]+_0x10bb('0x31'));},'complete':function(){_0x25ce13[_0x10bb('0x32')][_0x10bb('0x33')](this);_0x5a05e6(window)[_0x10bb('0x34')](_0x10bb('0x35'),_0x389840);},'clearQueueDelay':0xbb8});};_0x5a05e6[_0x10bb('0x1')]=function(_0x48212b){var _0x3ebffc=_0x48212b[_0x10bb('0x1e')](_0x10bb('0x36'))['each'](function(){var _0x4cbb85=_0x5a05e6(this);if(!_0x4cbb85[_0x10bb('0x21')])return _0x1acc27(['UL\x20do\x20menu\x20não\x20encontrada',_0x48212b],'alerta');_0x4cbb85[_0x10bb('0x1e')](_0x10bb('0x37'))['parent']()['addClass'](_0x10bb('0x38'));_0x4cbb85['find']('li')[_0x10bb('0xf')](function(){var _0x620fe9=_0x5a05e6(this);var _0x1e45b2=_0x620fe9['children'](':not(ul)');_0x1e45b2[_0x10bb('0x21')]&&_0x620fe9[_0x10bb('0x10')](_0x10bb('0x39')+_0x1e45b2[_0x10bb('0x12')]()[_0x10bb('0x2e')]()[_0x10bb('0x2f')]()[_0x10bb('0x3a')]()[_0x10bb('0x16')](/\./g,'')['replace'](/\s/g,'-')[_0x10bb('0x9')]());});var _0x2fdf7c=_0x4cbb85[_0x10bb('0x1e')](_0x10bb('0x3b'))[_0x10bb('0xe')]();_0x4cbb85[_0x10bb('0x10')]('qd-amazing-menu');_0x2fdf7c=_0x2fdf7c['find'](_0x10bb('0x3c'));_0x2fdf7c['each'](function(){var _0x23e88a=_0x5a05e6(this);_0x23e88a[_0x10bb('0x1e')](_0x10bb('0x3b'))['qdAmAddNdx']()['addClass'](_0x10bb('0x3d'));_0x23e88a['addClass'](_0x10bb('0x3e'));_0x23e88a[_0x10bb('0x22')]()['addClass'](_0x10bb('0x3f'));});_0x2fdf7c[_0x10bb('0x10')](_0x10bb('0x3f'));var _0x1ea375=0x0,_0xdaa5dd=function(_0x58bb30){_0x1ea375+=0x1;_0x58bb30=_0x58bb30[_0x10bb('0x40')]('li')[_0x10bb('0x40')]('*');_0x58bb30[_0x10bb('0x21')]&&(_0x58bb30[_0x10bb('0x10')](_0x10bb('0x41')+_0x1ea375),_0xdaa5dd(_0x58bb30));};_0xdaa5dd(_0x4cbb85);_0x4cbb85[_0x10bb('0x42')](_0x4cbb85[_0x10bb('0x1e')]('ul'))[_0x10bb('0xf')](function(){var _0xf07727=_0x5a05e6(this);_0xf07727[_0x10bb('0x10')](_0x10bb('0x43')+_0xf07727[_0x10bb('0x40')]('li')[_0x10bb('0x21')]+_0x10bb('0x44'));});});_0x190822(_0x3ebffc);_0x25ce13[_0x10bb('0x45')][_0x10bb('0x33')](this);_0x5a05e6(window)[_0x10bb('0x34')](_0x10bb('0x46'),_0x48212b);};_0x5a05e6['fn'][_0x10bb('0x1')]=function(_0x395a6d){var _0x569fe5=_0x5a05e6(this);if(!_0x569fe5[_0x10bb('0x21')])return _0x569fe5;_0x25ce13=_0x5a05e6[_0x10bb('0x47')]({},_0x2da976,_0x395a6d);_0x569fe5['exec']=new _0x5a05e6['QD_amazingMenu'](_0x5a05e6(this));return _0x569fe5;};_0x5a05e6(function(){_0x5a05e6(_0x10bb('0x48'))[_0x10bb('0x1')]();});}}(this));
/* Quatro Digital Smart Cart */
var _0x5b2e=['fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','data','qdDdcLastPostalCode','boolean','index','updateItems','atenção\x20esta\x20método\x20esta\x20descontinuado','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','allowRecalculate','buyButtonClicked','productId','prod_','prodId','.qd-bap-wrapper','.qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd_bap_wrapper_content','prepend','qd-bap-item-added','ajaxStop','.qdDdcContainer','QD_smartCart','selector','buyButton','dropDown','QD_buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','replace','abs','undefined','pow','toFixed','split','length','join','_QuatroDigital_CartData','callback','Callbacks','function','error','Oooops!\x20','message','object','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','toLowerCase','info','apply','warn','_QuatroDigital_DropDown','QD_dropDownCart','fromCharCode','charCodeAt','toUpperCase','ite','erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','Ir\x20ao\x20Carrinho','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','name','smartCheckout','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','find','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','removeClass','qd-bb-lightBoxProdAdd','body','qd-bb-lightBoxBodyProdAdd','off','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','.qd-ddc-scrollDown','scrollCart','.qd-ddc-shipping\x20input','val','keyup.qd_ddc_cep','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','getCartInfoByUrl','allowUpdate','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','texts','cartTotal','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','html','.qd-ddc-checkout','linkCheckout','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','emptyCart','each','clone','call','total','qtt','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','allTotal','items','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','qd-ddc-prodLoaded','getOrderForm','_QuatroDigital_AmountProduct','exec','.qd-ddc-wrapper','QD_checkoutQueue','totalizers','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','addClass','empty','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','qd-ddc-','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','attr','content','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','shippingData','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','aviso','actionButtons','lastSku','filter','[data-sku=\x27','outerHeight','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','load','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku-index','changeQantity','data-sku','.qd-ddc-prodQttWrapper:not(.qd_on)','click.qd_ddc_more','qd-loading','.qd-ddc-quantity','.qd-ddc-quantityMinus','click.qd_ddc_minus','preventDefault','focusout.qd_ddc_change','keyup.qd_ddc_change','keyCode','click.qd_ddc_remove','removeProduct','stop','remove','$1-$2$3','calculateShipping','BRA','done'];(function(_0x278506,_0x3513c7){var _0xc57e56=function(_0x3f3745){while(--_0x3f3745){_0x278506['push'](_0x278506['shift']());}};_0xc57e56(++_0x3513c7);}(_0x5b2e,0x105));var _0xe5b2=function(_0x42bf73,_0x49259f){_0x42bf73=_0x42bf73-0x0;var _0xdcf225=_0x5b2e[_0x42bf73];return _0xdcf225;};(function(_0x5d5bea){_0x5d5bea['fn'][_0xe5b2('0x0')]=_0x5d5bea['fn']['closest'];}(jQuery));function qd_number_format(_0x47db5b,_0xddc225,_0x4d4a9e,_0x144a75){_0x47db5b=(_0x47db5b+'')[_0xe5b2('0x1')](/[^0-9+\-Ee.]/g,'');_0x47db5b=isFinite(+_0x47db5b)?+_0x47db5b:0x0;_0xddc225=isFinite(+_0xddc225)?Math[_0xe5b2('0x2')](_0xddc225):0x0;_0x144a75=_0xe5b2('0x3')===typeof _0x144a75?',':_0x144a75;_0x4d4a9e='undefined'===typeof _0x4d4a9e?'.':_0x4d4a9e;var _0x2c8552='',_0x2c8552=function(_0x24fcd5,_0x1598b8){var _0xddc225=Math[_0xe5b2('0x4')](0xa,_0x1598b8);return''+(Math['round'](_0x24fcd5*_0xddc225)/_0xddc225)[_0xe5b2('0x5')](_0x1598b8);},_0x2c8552=(_0xddc225?_0x2c8552(_0x47db5b,_0xddc225):''+Math['round'](_0x47db5b))[_0xe5b2('0x6')]('.');0x3<_0x2c8552[0x0]['length']&&(_0x2c8552[0x0]=_0x2c8552[0x0][_0xe5b2('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x144a75));(_0x2c8552[0x1]||'')[_0xe5b2('0x7')]<_0xddc225&&(_0x2c8552[0x1]=_0x2c8552[0x1]||'',_0x2c8552[0x1]+=Array(_0xddc225-_0x2c8552[0x1][_0xe5b2('0x7')]+0x1)['join']('0'));return _0x2c8552[_0xe5b2('0x8')](_0x4d4a9e);};(function(){try{window[_0xe5b2('0x9')]=window['_QuatroDigital_CartData']||{},window[_0xe5b2('0x9')][_0xe5b2('0xa')]=window[_0xe5b2('0x9')][_0xe5b2('0xa')]||$[_0xe5b2('0xb')]();}catch(_0x143954){_0xe5b2('0x3')!==typeof console&&_0xe5b2('0xc')===typeof console['error']&&console[_0xe5b2('0xd')](_0xe5b2('0xe'),_0x143954[_0xe5b2('0xf')]);}}());(function(_0x2c6922){try{var _0x408e4a=jQuery,_0x316523=function(_0x58e03,_0xd2e24c){if(_0xe5b2('0x10')===typeof console&&_0xe5b2('0x3')!==typeof console[_0xe5b2('0xd')]&&_0xe5b2('0x3')!==typeof console['info']&&'undefined'!==typeof console['warn']){var _0x4852a0;'object'===typeof _0x58e03?(_0x58e03[_0xe5b2('0x11')](_0xe5b2('0x12')),_0x4852a0=_0x58e03):_0x4852a0=[_0xe5b2('0x12')+_0x58e03];if(_0xe5b2('0x3')===typeof _0xd2e24c||_0xe5b2('0x13')!==_0xd2e24c[_0xe5b2('0x14')]()&&'aviso'!==_0xd2e24c[_0xe5b2('0x14')]())if(_0xe5b2('0x3')!==typeof _0xd2e24c&&'info'===_0xd2e24c['toLowerCase']())try{console['info']['apply'](console,_0x4852a0);}catch(_0x30583){try{console[_0xe5b2('0x15')](_0x4852a0[_0xe5b2('0x8')]('\x0a'));}catch(_0x2fd4ba){}}else try{console['error'][_0xe5b2('0x16')](console,_0x4852a0);}catch(_0x1c4de8){try{console['error'](_0x4852a0['join']('\x0a'));}catch(_0x4a50f5){}}else try{console[_0xe5b2('0x17')][_0xe5b2('0x16')](console,_0x4852a0);}catch(_0x190d5e){try{console[_0xe5b2('0x17')](_0x4852a0[_0xe5b2('0x8')]('\x0a'));}catch(_0x18a45e){}}}};window[_0xe5b2('0x18')]=window['_QuatroDigital_DropDown']||{};window[_0xe5b2('0x18')]['allowUpdate']=!0x0;_0x408e4a[_0xe5b2('0x19')]=function(){};_0x408e4a['fn'][_0xe5b2('0x19')]=function(){return{'fn':new _0x408e4a()};};var _0x5b1cd2=function(_0x48a516){var _0x394aa5={'c':'henzntvn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x284b1f){var _0x46fe9f=function(_0x10b709){return _0x10b709;};var _0xf8fc9b=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x284b1f=_0x284b1f['d'+_0xf8fc9b[0x10]+'c'+_0xf8fc9b[0x11]+'m'+_0x46fe9f(_0xf8fc9b[0x1])+'n'+_0xf8fc9b[0xd]]['l'+_0xf8fc9b[0x12]+'c'+_0xf8fc9b[0x0]+'ti'+_0x46fe9f('o')+'n'];var _0x4c2784=function(_0x408470){return escape(encodeURIComponent(_0x408470['replace'](/\./g,'¨')[_0xe5b2('0x1')](/[a-zA-Z]/g,function(_0x970151){return String[_0xe5b2('0x1a')](('Z'>=_0x970151?0x5a:0x7a)>=(_0x970151=_0x970151[_0xe5b2('0x1b')](0x0)+0xd)?_0x970151:_0x970151-0x1a);})));};var _0x6a9cc=_0x4c2784(_0x284b1f[[_0xf8fc9b[0x9],_0x46fe9f('o'),_0xf8fc9b[0xc],_0xf8fc9b[_0x46fe9f(0xd)]][_0xe5b2('0x8')]('')]);_0x4c2784=_0x4c2784((window[['js',_0x46fe9f('no'),'m',_0xf8fc9b[0x1],_0xf8fc9b[0x4][_0xe5b2('0x1c')](),_0xe5b2('0x1d')][_0xe5b2('0x8')]('')]||'---')+['.v',_0xf8fc9b[0xd],'e',_0x46fe9f('x'),'co',_0x46fe9f('mm'),_0xe5b2('0x1e'),_0xf8fc9b[0x1],'.c',_0x46fe9f('o'),'m.',_0xf8fc9b[0x13],'r']['join'](''));for(var _0x12e4e3 in _0x394aa5){if(_0x4c2784===_0x12e4e3+_0x394aa5[_0x12e4e3]||_0x6a9cc===_0x12e4e3+_0x394aa5[_0x12e4e3]){var _0xe5df7d='tr'+_0xf8fc9b[0x11]+'e';break;}_0xe5df7d='f'+_0xf8fc9b[0x0]+'ls'+_0x46fe9f(_0xf8fc9b[0x1])+'';}_0x46fe9f=!0x1;-0x1<_0x284b1f[[_0xf8fc9b[0xc],'e',_0xf8fc9b[0x0],'rc',_0xf8fc9b[0x9]][_0xe5b2('0x8')]('')][_0xe5b2('0x1f')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x46fe9f=!0x0);return[_0xe5df7d,_0x46fe9f];}(_0x48a516);}(window);if(!eval(_0x5b1cd2[0x0]))return _0x5b1cd2[0x1]?_0x316523(_0xe5b2('0x20')):!0x1;_0x408e4a['QD_dropDownCart']=function(_0x2cb029,_0x118858){var _0x4ccfd1=_0x408e4a(_0x2cb029);if(!_0x4ccfd1['length'])return _0x4ccfd1;var _0x4c3618=_0x408e4a[_0xe5b2('0x21')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0xe5b2('0x22'),'linkCheckout':'Finalizar\x20Compra','cartTotal':_0xe5b2('0x23'),'emptyCart':_0xe5b2('0x24'),'continueShopping':_0xe5b2('0x25'),'shippingForm':_0xe5b2('0x26')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x47223b){return _0x47223b[_0xe5b2('0x27')]||_0x47223b[_0xe5b2('0x28')];},'callback':function(){},'callbackProductsList':function(){}},_0x118858);_0x408e4a('');var _0x4dad32=this;if(_0x4c3618[_0xe5b2('0x29')]){var _0x33b6d5=!0x1;_0xe5b2('0x3')===typeof window[_0xe5b2('0x2a')]&&(_0x316523(_0xe5b2('0x2b')),_0x408e4a[_0xe5b2('0x2c')]({'url':_0xe5b2('0x2d'),'async':!0x1,'dataType':_0xe5b2('0x2e'),'error':function(){_0x316523(_0xe5b2('0x2f'));_0x33b6d5=!0x0;}}));if(_0x33b6d5)return _0x316523(_0xe5b2('0x30'));}if(_0xe5b2('0x10')===typeof window['vtexjs']&&'undefined'!==typeof window['vtexjs'][_0xe5b2('0x31')])var _0x2c6922=window[_0xe5b2('0x2a')]['checkout'];else if(_0xe5b2('0x10')===typeof vtex&&_0xe5b2('0x10')===typeof vtex[_0xe5b2('0x31')]&&_0xe5b2('0x3')!==typeof vtex[_0xe5b2('0x31')][_0xe5b2('0x32')])_0x2c6922=new vtex[(_0xe5b2('0x31'))][(_0xe5b2('0x32'))]();else return _0x316523(_0xe5b2('0x33'));_0x4dad32[_0xe5b2('0x34')]=_0xe5b2('0x35');var _0x24b100=function(_0x5f3f74){_0x408e4a(this)[_0xe5b2('0x36')](_0x5f3f74);_0x5f3f74[_0xe5b2('0x37')](_0xe5b2('0x38'))[_0xe5b2('0x39')](_0x408e4a(_0xe5b2('0x3a')))['on'](_0xe5b2('0x3b'),function(){_0x4ccfd1[_0xe5b2('0x3c')](_0xe5b2('0x3d'));_0x408e4a(document[_0xe5b2('0x3e')])[_0xe5b2('0x3c')](_0xe5b2('0x3f'));});_0x408e4a(document)[_0xe5b2('0x40')]('keyup.qd_ddc_closeFn')['on']('keyup.qd_ddc_closeFn',function(_0x1b4cd5){0x1b==_0x1b4cd5['keyCode']&&(_0x4ccfd1['removeClass'](_0xe5b2('0x3d')),_0x408e4a(document[_0xe5b2('0x3e')])[_0xe5b2('0x3c')](_0xe5b2('0x3f')));});var _0x36ffac=_0x5f3f74['find'](_0xe5b2('0x41'));_0x5f3f74[_0xe5b2('0x37')](_0xe5b2('0x42'))['on'](_0xe5b2('0x43'),function(){_0x4dad32['scrollCart']('-',void 0x0,void 0x0,_0x36ffac);return!0x1;});_0x5f3f74[_0xe5b2('0x37')](_0xe5b2('0x44'))['on']('click.qd_ddc_scrollDown',function(){_0x4dad32[_0xe5b2('0x45')](void 0x0,void 0x0,void 0x0,_0x36ffac);return!0x1;});_0x5f3f74[_0xe5b2('0x37')](_0xe5b2('0x46'))[_0xe5b2('0x47')]('')['on'](_0xe5b2('0x48'),function(){_0x4dad32[_0xe5b2('0x49')](_0x408e4a(this));});if(_0x4c3618[_0xe5b2('0x4a')]){var _0x118858=0x0;_0x408e4a(this)['on'](_0xe5b2('0x4b'),function(){var _0x5f3f74=function(){window[_0xe5b2('0x18')]['allowUpdate']&&(_0x4dad32[_0xe5b2('0x4c')](),window[_0xe5b2('0x18')][_0xe5b2('0x4d')]=!0x1,_0x408e4a['fn'][_0xe5b2('0x4e')](!0x0),_0x4dad32[_0xe5b2('0x4f')]());};_0x118858=setInterval(function(){_0x5f3f74();},0x258);_0x5f3f74();});_0x408e4a(this)['on'](_0xe5b2('0x50'),function(){clearInterval(_0x118858);});}};var _0x3b3ea2=function(_0x943bdc){_0x943bdc=_0x408e4a(_0x943bdc);_0x4c3618[_0xe5b2('0x51')][_0xe5b2('0x52')]=_0x4c3618['texts'][_0xe5b2('0x52')][_0xe5b2('0x1')]('#value',_0xe5b2('0x53'));_0x4c3618[_0xe5b2('0x51')][_0xe5b2('0x52')]=_0x4c3618['texts'][_0xe5b2('0x52')][_0xe5b2('0x1')](_0xe5b2('0x54'),_0xe5b2('0x55'));_0x4c3618['texts'][_0xe5b2('0x52')]=_0x4c3618[_0xe5b2('0x51')][_0xe5b2('0x52')][_0xe5b2('0x1')]('#shipping',_0xe5b2('0x56'));_0x4c3618[_0xe5b2('0x51')]['cartTotal']=_0x4c3618[_0xe5b2('0x51')][_0xe5b2('0x52')][_0xe5b2('0x1')](_0xe5b2('0x57'),_0xe5b2('0x58'));_0x943bdc[_0xe5b2('0x37')]('.qd-ddc-viewCart')[_0xe5b2('0x59')](_0x4c3618[_0xe5b2('0x51')]['linkCart']);_0x943bdc['find']('.qd_ddc_continueShopping')[_0xe5b2('0x59')](_0x4c3618['texts']['continueShopping']);_0x943bdc[_0xe5b2('0x37')](_0xe5b2('0x5a'))[_0xe5b2('0x59')](_0x4c3618[_0xe5b2('0x51')][_0xe5b2('0x5b')]);_0x943bdc[_0xe5b2('0x37')]('.qd-ddc-infoTotal')[_0xe5b2('0x59')](_0x4c3618['texts']['cartTotal']);_0x943bdc['find'](_0xe5b2('0x5c'))[_0xe5b2('0x59')](_0x4c3618['texts'][_0xe5b2('0x5d')]);_0x943bdc[_0xe5b2('0x37')](_0xe5b2('0x5e'))['html'](_0x4c3618[_0xe5b2('0x51')][_0xe5b2('0x5f')]);return _0x943bdc;}(this[_0xe5b2('0x34')]);var _0x1c8507=0x0;_0x4ccfd1[_0xe5b2('0x60')](function(){0x0<_0x1c8507?_0x24b100['call'](this,_0x3b3ea2[_0xe5b2('0x61')]()):_0x24b100[_0xe5b2('0x62')](this,_0x3b3ea2);_0x1c8507++;});window['_QuatroDigital_CartData'][_0xe5b2('0xa')][_0xe5b2('0x39')](function(){_0x408e4a('.qd-ddc-infoTotalValue')['html'](window['_QuatroDigital_CartData'][_0xe5b2('0x63')]||'--');_0x408e4a('.qd-ddc-infoTotalItems')[_0xe5b2('0x59')](window['_QuatroDigital_CartData'][_0xe5b2('0x64')]||'0');_0x408e4a(_0xe5b2('0x65'))['html'](window['_QuatroDigital_CartData'][_0xe5b2('0x66')]||'--');_0x408e4a(_0xe5b2('0x67'))[_0xe5b2('0x59')](window[_0xe5b2('0x9')][_0xe5b2('0x68')]||'--');});var _0x8a842e=function(_0x147094,_0x4ddf42){if(_0xe5b2('0x3')===typeof _0x147094[_0xe5b2('0x69')])return _0x316523('Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição');_0x4dad32[_0xe5b2('0x6a')][_0xe5b2('0x62')](this,_0x4ddf42);};_0x4dad32[_0xe5b2('0x4c')]=function(_0x265273,_0x96a041){'undefined'!=typeof _0x96a041?window[_0xe5b2('0x18')][_0xe5b2('0x6b')]=_0x96a041:window[_0xe5b2('0x18')][_0xe5b2('0x6b')]&&(_0x96a041=window[_0xe5b2('0x18')][_0xe5b2('0x6b')]);setTimeout(function(){window[_0xe5b2('0x18')]['dataOptionsCache']=void 0x0;},_0x4c3618[_0xe5b2('0x6c')]);_0x408e4a('.qd-ddc-wrapper')[_0xe5b2('0x3c')](_0xe5b2('0x6d'));if(_0x4c3618[_0xe5b2('0x29')]){var _0x118858=function(_0x21a571){window[_0xe5b2('0x18')][_0xe5b2('0x6e')]=_0x21a571;_0x8a842e(_0x21a571,_0x96a041);_0xe5b2('0x3')!==typeof window[_0xe5b2('0x6f')]&&'function'===typeof window[_0xe5b2('0x6f')][_0xe5b2('0x70')]&&window['_QuatroDigital_AmountProduct'][_0xe5b2('0x70')]['call'](this);_0x408e4a(_0xe5b2('0x71'))['addClass'](_0xe5b2('0x6d'));};_0xe5b2('0x3')!==typeof window['_QuatroDigital_DropDown'][_0xe5b2('0x6e')]?(_0x118858(window[_0xe5b2('0x18')]['getOrderForm']),_0xe5b2('0xc')===typeof _0x265273&&_0x265273(window['_QuatroDigital_DropDown']['getOrderForm'])):_0x408e4a[_0xe5b2('0x72')]([_0xe5b2('0x69'),_0xe5b2('0x73'),'shippingData'],{'done':function(_0x303320){_0x118858[_0xe5b2('0x62')](this,_0x303320);_0xe5b2('0xc')===typeof _0x265273&&_0x265273(_0x303320);},'fail':function(_0x532f51){_0x316523([_0xe5b2('0x74'),_0x532f51]);}});}else alert(_0xe5b2('0x75'));};_0x4dad32[_0xe5b2('0x4f')]=function(){var _0x547652=_0x408e4a(_0xe5b2('0x71'));_0x547652[_0xe5b2('0x37')](_0xe5b2('0x76'))[_0xe5b2('0x7')]?_0x547652[_0xe5b2('0x3c')](_0xe5b2('0x77')):_0x547652[_0xe5b2('0x78')](_0xe5b2('0x77'));};_0x4dad32[_0xe5b2('0x6a')]=function(_0x5806ce){var _0x118858=_0x408e4a('.qd-ddc-prodWrapper2');_0x118858[_0xe5b2('0x79')]();_0x118858[_0xe5b2('0x60')](function(){var _0x118858=_0x408e4a(this),_0x49553c,_0x2cb029,_0x298737=_0x408e4a(''),_0x5677e0;for(_0x5677e0 in window['_QuatroDigital_DropDown'][_0xe5b2('0x6e')]['items'])if(_0xe5b2('0x10')===typeof window['_QuatroDigital_DropDown'][_0xe5b2('0x6e')]['items'][_0x5677e0]){var _0x57d834=window['_QuatroDigital_DropDown']['getOrderForm']['items'][_0x5677e0];var _0x46ce26=_0x57d834[_0xe5b2('0x7a')]['replace'](/^\/|\/$/g,'')[_0xe5b2('0x6')]('/');var _0x1a5106=_0x408e4a(_0xe5b2('0x7b'));_0x1a5106['attr']({'data-sku':_0x57d834['id'],'data-sku-index':_0x5677e0,'data-qd-departament':_0x46ce26[0x0],'data-qd-category':_0x46ce26[_0x46ce26['length']-0x1]});_0x1a5106[_0xe5b2('0x78')](_0xe5b2('0x7c')+_0x57d834[_0xe5b2('0x7d')]);_0x1a5106[_0xe5b2('0x37')](_0xe5b2('0x7e'))['append'](_0x4c3618[_0xe5b2('0x27')](_0x57d834));_0x1a5106[_0xe5b2('0x37')](_0xe5b2('0x7f'))[_0xe5b2('0x36')](isNaN(_0x57d834['sellingPrice'])?_0x57d834[_0xe5b2('0x80')]:0x0==_0x57d834['sellingPrice']?_0xe5b2('0x81'):(_0x408e4a(_0xe5b2('0x82'))[_0xe5b2('0x83')](_0xe5b2('0x84'))||'R$')+'\x20'+qd_number_format(_0x57d834[_0xe5b2('0x80')]/0x64,0x2,',','.'));_0x1a5106[_0xe5b2('0x37')]('.qd-ddc-quantity')['attr']({'data-sku':_0x57d834['id'],'data-sku-index':_0x5677e0})[_0xe5b2('0x47')](_0x57d834['quantity']);_0x1a5106['find'](_0xe5b2('0x85'))[_0xe5b2('0x83')]({'data-sku':_0x57d834['id'],'data-sku-index':_0x5677e0});_0x4dad32[_0xe5b2('0x86')](_0x57d834['id'],_0x1a5106[_0xe5b2('0x37')](_0xe5b2('0x87')),_0x57d834[_0xe5b2('0x88')]);_0x1a5106[_0xe5b2('0x37')](_0xe5b2('0x89'))[_0xe5b2('0x83')]({'data-sku':_0x57d834['id'],'data-sku-index':_0x5677e0});_0x1a5106[_0xe5b2('0x8a')](_0x118858);_0x298737=_0x298737[_0xe5b2('0x39')](_0x1a5106);}try{var _0x2c6922=_0x118858[_0xe5b2('0x0')]('.qd-ddc-wrapper')[_0xe5b2('0x37')](_0xe5b2('0x46'));_0x2c6922[_0xe5b2('0x7')]&&''==_0x2c6922[_0xe5b2('0x47')]()&&window[_0xe5b2('0x18')][_0xe5b2('0x6e')][_0xe5b2('0x8b')][_0xe5b2('0x8c')]&&_0x2c6922['val'](window[_0xe5b2('0x18')][_0xe5b2('0x6e')][_0xe5b2('0x8b')][_0xe5b2('0x8c')][_0xe5b2('0x8d')]);}catch(_0x55d5f0){_0x316523(_0xe5b2('0x8e')+_0x55d5f0['message'],_0xe5b2('0x8f'));}_0x4dad32[_0xe5b2('0x90')](_0x118858);_0x4dad32['cartIsEmpty']();_0x5806ce&&_0x5806ce[_0xe5b2('0x91')]&&function(){_0x2cb029=_0x298737[_0xe5b2('0x92')](_0xe5b2('0x93')+_0x5806ce[_0xe5b2('0x91')]+'\x27]');_0x2cb029['length']&&(_0x49553c=0x0,_0x298737[_0xe5b2('0x60')](function(){var _0x5806ce=_0x408e4a(this);if(_0x5806ce['is'](_0x2cb029))return!0x1;_0x49553c+=_0x5806ce[_0xe5b2('0x94')]();}),_0x4dad32['scrollCart'](void 0x0,void 0x0,_0x49553c,_0x118858[_0xe5b2('0x39')](_0x118858[_0xe5b2('0x95')]())),_0x298737[_0xe5b2('0x3c')](_0xe5b2('0x96')),function(_0x598665){_0x598665['addClass'](_0xe5b2('0x97'));_0x598665[_0xe5b2('0x78')](_0xe5b2('0x96'));setTimeout(function(){_0x598665[_0xe5b2('0x3c')]('qd-ddc-lastAdded');},_0x4c3618[_0xe5b2('0x6c')]);}(_0x2cb029),_0x408e4a(document[_0xe5b2('0x3e')])[_0xe5b2('0x78')](_0xe5b2('0x98')),setTimeout(function(){_0x408e4a(document['body'])[_0xe5b2('0x3c')]('qd-ddc-product-add-time-v2');},_0x4c3618[_0xe5b2('0x6c')]));}();});(function(){_QuatroDigital_DropDown[_0xe5b2('0x6e')][_0xe5b2('0x69')][_0xe5b2('0x7')]?(_0x408e4a(_0xe5b2('0x3e'))[_0xe5b2('0x3c')]('qd-ddc-cart-empty')[_0xe5b2('0x78')](_0xe5b2('0x99')),setTimeout(function(){_0x408e4a('body')[_0xe5b2('0x3c')]('qd-ddc-product-add-time');},_0x4c3618[_0xe5b2('0x6c')])):_0x408e4a(_0xe5b2('0x3e'))['removeClass'](_0xe5b2('0x9a'))[_0xe5b2('0x78')]('qd-ddc-cart-empty');}());_0xe5b2('0xc')===typeof _0x4c3618[_0xe5b2('0x9b')]?_0x4c3618[_0xe5b2('0x9b')][_0xe5b2('0x62')](this):_0x316523(_0xe5b2('0x9c'));};_0x4dad32['insertProdImg']=function(_0x1d5676,_0x5af60b,_0x515e8f){function _0x3f416c(){_0x5af60b['removeClass'](_0xe5b2('0x9d'))[_0xe5b2('0x9e')](function(){_0x408e4a(this)['addClass'](_0xe5b2('0x9d'));})['attr'](_0xe5b2('0x9f'),_0x515e8f);}_0x515e8f?_0x3f416c():isNaN(_0x1d5676)?_0x316523(_0xe5b2('0xa0'),'alerta'):alert(_0xe5b2('0xa1'));};_0x4dad32[_0xe5b2('0x90')]=function(_0x4d595b){var _0x118858=function(_0xf778c4,_0x38da3d){var _0x28354e=_0x408e4a(_0xf778c4);var _0x5087cf=_0x28354e[_0xe5b2('0x83')]('data-sku');var _0x2cb029=_0x28354e[_0xe5b2('0x83')](_0xe5b2('0xa2'));if(_0x5087cf){var _0x3ed2ee=parseInt(_0x28354e[_0xe5b2('0x47')]())||0x1;_0x4dad32[_0xe5b2('0xa3')]([_0x5087cf,_0x2cb029],_0x3ed2ee,_0x3ed2ee+0x1,function(_0x4cd5c0){_0x28354e[_0xe5b2('0x47')](_0x4cd5c0);_0xe5b2('0xc')===typeof _0x38da3d&&_0x38da3d();});}};var _0x945708=function(_0x5a00c2,_0x55f834){var _0x103369=_0x408e4a(_0x5a00c2);var _0x2cb029=_0x103369['attr'](_0xe5b2('0xa4'));var _0x59d5ba=_0x103369[_0xe5b2('0x83')](_0xe5b2('0xa2'));if(_0x2cb029){var _0x1ad0e8=parseInt(_0x103369[_0xe5b2('0x47')]())||0x2;_0x4dad32['changeQantity']([_0x2cb029,_0x59d5ba],_0x1ad0e8,_0x1ad0e8-0x1,function(_0x4447b9){_0x103369[_0xe5b2('0x47')](_0x4447b9);_0xe5b2('0xc')===typeof _0x55f834&&_0x55f834();});}};var _0x31365b=function(_0x2833ac,_0x7cdefc){var _0x118858=_0x408e4a(_0x2833ac);var _0x2cb029=_0x118858[_0xe5b2('0x83')](_0xe5b2('0xa4'));var _0x26270f=_0x118858[_0xe5b2('0x83')](_0xe5b2('0xa2'));if(_0x2cb029){var _0x132805=parseInt(_0x118858[_0xe5b2('0x47')]())||0x1;_0x4dad32[_0xe5b2('0xa3')]([_0x2cb029,_0x26270f],0x1,_0x132805,function(_0x5266b1){_0x118858['val'](_0x5266b1);_0xe5b2('0xc')===typeof _0x7cdefc&&_0x7cdefc();});}};var _0x2cb029=_0x4d595b[_0xe5b2('0x37')](_0xe5b2('0xa5'));_0x2cb029[_0xe5b2('0x78')]('qd_on')[_0xe5b2('0x60')](function(){var _0x4d595b=_0x408e4a(this);_0x4d595b[_0xe5b2('0x37')]('.qd-ddc-quantityMore')['on'](_0xe5b2('0xa6'),function(_0x303f5b){_0x303f5b['preventDefault']();_0x2cb029[_0xe5b2('0x78')](_0xe5b2('0xa7'));_0x118858(_0x4d595b['find'](_0xe5b2('0xa8')),function(){_0x2cb029[_0xe5b2('0x3c')](_0xe5b2('0xa7'));});});_0x4d595b[_0xe5b2('0x37')](_0xe5b2('0xa9'))['on'](_0xe5b2('0xaa'),function(_0x3852fc){_0x3852fc[_0xe5b2('0xab')]();_0x2cb029[_0xe5b2('0x78')]('qd-loading');_0x945708(_0x4d595b[_0xe5b2('0x37')](_0xe5b2('0xa8')),function(){_0x2cb029[_0xe5b2('0x3c')](_0xe5b2('0xa7'));});});_0x4d595b[_0xe5b2('0x37')](_0xe5b2('0xa8'))['on'](_0xe5b2('0xac'),function(){_0x2cb029[_0xe5b2('0x78')]('qd-loading');_0x31365b(this,function(){_0x2cb029['removeClass'](_0xe5b2('0xa7'));});});_0x4d595b[_0xe5b2('0x37')]('.qd-ddc-quantity')['on'](_0xe5b2('0xad'),function(_0x4a6f62){0xd==_0x4a6f62[_0xe5b2('0xae')]&&(_0x2cb029[_0xe5b2('0x78')](_0xe5b2('0xa7')),_0x31365b(this,function(){_0x2cb029[_0xe5b2('0x3c')](_0xe5b2('0xa7'));}));});});_0x4d595b[_0xe5b2('0x37')](_0xe5b2('0x76'))['each'](function(){var _0x4d595b=_0x408e4a(this);_0x4d595b[_0xe5b2('0x37')](_0xe5b2('0x85'))['on'](_0xe5b2('0xaf'),function(){_0x4d595b[_0xe5b2('0x78')](_0xe5b2('0xa7'));_0x4dad32[_0xe5b2('0xb0')](_0x408e4a(this),function(_0x1c81ae){_0x1c81ae?_0x4d595b[_0xe5b2('0xb1')](!0x0)['slideUp'](function(){_0x4d595b[_0xe5b2('0xb2')]();_0x4dad32[_0xe5b2('0x4f')]();}):_0x4d595b[_0xe5b2('0x3c')](_0xe5b2('0xa7'));});return!0x1;});});};_0x4dad32['shippingCalculate']=function(_0x519723){var _0x5fe0d6=_0x519723[_0xe5b2('0x47')]();_0x5fe0d6=_0x5fe0d6[_0xe5b2('0x1')](/[^0-9\-]/g,'');_0x5fe0d6=_0x5fe0d6[_0xe5b2('0x1')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0xe5b2('0xb3'));_0x5fe0d6=_0x5fe0d6[_0xe5b2('0x1')](/(.{9}).*/g,'$1');_0x519723[_0xe5b2('0x47')](_0x5fe0d6);0x9<=_0x5fe0d6[_0xe5b2('0x7')]&&(_0x519723['data']('qdDdcLastPostalCode')!=_0x5fe0d6&&_0x2c6922[_0xe5b2('0xb4')]({'postalCode':_0x5fe0d6,'country':_0xe5b2('0xb5')})[_0xe5b2('0xb6')](function(_0x3df013){window[_0xe5b2('0x18')][_0xe5b2('0x6e')]=_0x3df013;_0x4dad32['getCartInfoByUrl']();})[_0xe5b2('0xb7')](function(_0x3e4b82){_0x316523([_0xe5b2('0xb8'),_0x3e4b82]);updateCartData();}),_0x519723[_0xe5b2('0xb9')](_0xe5b2('0xba'),_0x5fe0d6));};_0x4dad32[_0xe5b2('0xa3')]=function(_0x226e55,_0x5e48bb,_0x3afb32,_0x410c6a){function _0x3d1dde(_0x242483){_0x242483=_0xe5b2('0xbb')!==typeof _0x242483?!0x1:_0x242483;_0x4dad32[_0xe5b2('0x4c')]();window[_0xe5b2('0x18')][_0xe5b2('0x4d')]=!0x1;_0x4dad32[_0xe5b2('0x4f')]();_0xe5b2('0x3')!==typeof window[_0xe5b2('0x6f')]&&_0xe5b2('0xc')===typeof window['_QuatroDigital_AmountProduct'][_0xe5b2('0x70')]&&window[_0xe5b2('0x6f')]['exec']['call'](this);_0xe5b2('0xc')===typeof adminCart&&adminCart();_0x408e4a['fn']['simpleCart'](!0x0,void 0x0,_0x242483);_0xe5b2('0xc')===typeof _0x410c6a&&_0x410c6a(_0x5e48bb);}_0x3afb32=_0x3afb32||0x1;if(0x1>_0x3afb32)return _0x5e48bb;if(_0x4c3618['smartCheckout']){if(_0xe5b2('0x3')===typeof window[_0xe5b2('0x18')]['getOrderForm'][_0xe5b2('0x69')][_0x226e55[0x1]])return _0x316523('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x226e55[0x1]+']'),_0x5e48bb;window[_0xe5b2('0x18')][_0xe5b2('0x6e')][_0xe5b2('0x69')][_0x226e55[0x1]]['quantity']=_0x3afb32;window[_0xe5b2('0x18')][_0xe5b2('0x6e')][_0xe5b2('0x69')][_0x226e55[0x1]][_0xe5b2('0xbc')]=_0x226e55[0x1];_0x2c6922[_0xe5b2('0xbd')]([window['_QuatroDigital_DropDown'][_0xe5b2('0x6e')][_0xe5b2('0x69')][_0x226e55[0x1]]],['items',_0xe5b2('0x73'),_0xe5b2('0x8b')])[_0xe5b2('0xb6')](function(_0xd5df7e){window[_0xe5b2('0x18')][_0xe5b2('0x6e')]=_0xd5df7e;_0x3d1dde(!0x0);})['fail'](function(_0x4b0bb6){_0x316523(['Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho',_0x4b0bb6]);_0x3d1dde();});}else _0x316523(_0xe5b2('0xbe'));};_0x4dad32[_0xe5b2('0xb0')]=function(_0x4bc26a,_0x2fa7c1){function _0x39d91c(_0x4e42ae){_0x4e42ae=_0xe5b2('0xbb')!==typeof _0x4e42ae?!0x1:_0x4e42ae;_0xe5b2('0x3')!==typeof window['_QuatroDigital_AmountProduct']&&_0xe5b2('0xc')===typeof window['_QuatroDigital_AmountProduct'][_0xe5b2('0x70')]&&window[_0xe5b2('0x6f')]['exec']['call'](this);'function'===typeof adminCart&&adminCart();_0x408e4a['fn']['simpleCart'](!0x0,void 0x0,_0x4e42ae);'function'===typeof _0x2fa7c1&&_0x2fa7c1(_0x2cb029);}var _0x2cb029=!0x1,_0x10e4fc=_0x408e4a(_0x4bc26a)[_0xe5b2('0x83')](_0xe5b2('0xa2'));if(_0x4c3618[_0xe5b2('0x29')]){if('undefined'===typeof window[_0xe5b2('0x18')][_0xe5b2('0x6e')]['items'][_0x10e4fc])return _0x316523(_0xe5b2('0xbf')+_0x10e4fc+']'),_0x2cb029;window[_0xe5b2('0x18')][_0xe5b2('0x6e')]['items'][_0x10e4fc][_0xe5b2('0xbc')]=_0x10e4fc;_0x2c6922[_0xe5b2('0xc0')]([window['_QuatroDigital_DropDown'][_0xe5b2('0x6e')][_0xe5b2('0x69')][_0x10e4fc]],[_0xe5b2('0x69'),'totalizers',_0xe5b2('0x8b')])[_0xe5b2('0xb6')](function(_0x59bcc9){_0x2cb029=!0x0;window[_0xe5b2('0x18')][_0xe5b2('0x6e')]=_0x59bcc9;_0x8a842e(_0x59bcc9);_0x39d91c(!0x0);})[_0xe5b2('0xb7')](function(_0x29b64f){_0x316523([_0xe5b2('0xc1'),_0x29b64f]);_0x39d91c();});}else alert(_0xe5b2('0xc2'));};_0x4dad32[_0xe5b2('0x45')]=function(_0x3d6593,_0x49d258,_0x272730,_0x31eb16){_0x31eb16=_0x31eb16||_0x408e4a(_0xe5b2('0xc3'));_0x3d6593=_0x3d6593||'+';_0x49d258=_0x49d258||0.9*_0x31eb16[_0xe5b2('0xc4')]();_0x31eb16[_0xe5b2('0xb1')](!0x0,!0x0)[_0xe5b2('0xc5')]({'scrollTop':isNaN(_0x272730)?_0x3d6593+'='+_0x49d258+'px':_0x272730});};_0x4c3618['updateOnlyHover']||(_0x4dad32[_0xe5b2('0x4c')](),_0x408e4a['fn'][_0xe5b2('0x4e')](!0x0));_0x408e4a(window)['on'](_0xe5b2('0xc6'),function(){try{window[_0xe5b2('0x18')][_0xe5b2('0x6e')]=void 0x0,_0x4dad32[_0xe5b2('0x4c')]();}catch(_0x41ba0d){_0x316523(_0xe5b2('0xc7')+_0x41ba0d['message'],_0xe5b2('0xc8'));}});_0xe5b2('0xc')===typeof _0x4c3618['callback']?_0x4c3618[_0xe5b2('0xa')]['call'](this):_0x316523('Callback\x20não\x20é\x20uma\x20função');};_0x408e4a['fn'][_0xe5b2('0x19')]=function(_0x395aaf){var _0x5bf650=_0x408e4a(this);_0x5bf650['fn']=new _0x408e4a[(_0xe5b2('0x19'))](this,_0x395aaf);return _0x5bf650;};}catch(_0x55a25a){_0xe5b2('0x3')!==typeof console&&'function'===typeof console['error']&&console['error'](_0xe5b2('0xe'),_0x55a25a);}}(this));(function(_0x4e9d40){try{var _0x13274f=jQuery;window[_0xe5b2('0x6f')]=window[_0xe5b2('0x6f')]||{};window['_QuatroDigital_AmountProduct'][_0xe5b2('0x69')]={};window[_0xe5b2('0x6f')][_0xe5b2('0xc9')]=!0x1;window[_0xe5b2('0x6f')][_0xe5b2('0xca')]=!0x1;window[_0xe5b2('0x6f')]['quickViewUpdate']=!0x1;var _0x1684c4=function(){if(window[_0xe5b2('0x6f')][_0xe5b2('0xc9')]){var _0x164199=!0x1;var _0x44f4a3={};window['_QuatroDigital_AmountProduct'][_0xe5b2('0x69')]={};for(_0x575ac0 in window[_0xe5b2('0x18')][_0xe5b2('0x6e')][_0xe5b2('0x69')])if(_0xe5b2('0x10')===typeof window[_0xe5b2('0x18')][_0xe5b2('0x6e')][_0xe5b2('0x69')][_0x575ac0]){var _0x578d17=window['_QuatroDigital_DropDown']['getOrderForm']['items'][_0x575ac0];_0xe5b2('0x3')!==typeof _0x578d17[_0xe5b2('0xcb')]&&null!==_0x578d17[_0xe5b2('0xcb')]&&''!==_0x578d17[_0xe5b2('0xcb')]&&(window[_0xe5b2('0x6f')]['items'][_0xe5b2('0xcc')+_0x578d17[_0xe5b2('0xcb')]]=window[_0xe5b2('0x6f')][_0xe5b2('0x69')]['prod_'+_0x578d17['productId']]||{},window[_0xe5b2('0x6f')][_0xe5b2('0x69')][_0xe5b2('0xcc')+_0x578d17[_0xe5b2('0xcb')]][_0xe5b2('0xcd')]=_0x578d17[_0xe5b2('0xcb')],_0x44f4a3[_0xe5b2('0xcc')+_0x578d17[_0xe5b2('0xcb')]]||(window[_0xe5b2('0x6f')][_0xe5b2('0x69')][_0xe5b2('0xcc')+_0x578d17[_0xe5b2('0xcb')]][_0xe5b2('0x64')]=0x0),window['_QuatroDigital_AmountProduct'][_0xe5b2('0x69')][_0xe5b2('0xcc')+_0x578d17[_0xe5b2('0xcb')]][_0xe5b2('0x64')]+=_0x578d17['quantity'],_0x164199=!0x0,_0x44f4a3['prod_'+_0x578d17[_0xe5b2('0xcb')]]=!0x0);}var _0x575ac0=_0x164199;}else _0x575ac0=void 0x0;window[_0xe5b2('0x6f')]['allowRecalculate']&&(_0x13274f(_0xe5b2('0xce'))[_0xe5b2('0xb2')](),_0x13274f(_0xe5b2('0xcf'))[_0xe5b2('0x3c')]('qd-bap-item-added'));for(var _0x1b3ffc in window['_QuatroDigital_AmountProduct']['items']){_0x578d17=window['_QuatroDigital_AmountProduct'][_0xe5b2('0x69')][_0x1b3ffc];if(_0xe5b2('0x10')!==typeof _0x578d17)return;_0x44f4a3=_0x13274f(_0xe5b2('0xd0')+_0x578d17[_0xe5b2('0xcd')]+']')[_0xe5b2('0x0')]('li');if(window[_0xe5b2('0x6f')]['allowRecalculate']||!_0x44f4a3['find'](_0xe5b2('0xce'))['length'])_0x164199=_0x13274f(_0xe5b2('0xd1')),_0x164199['find']('.qd-bap-qtt')[_0xe5b2('0x59')](_0x578d17[_0xe5b2('0x64')]),_0x578d17=_0x44f4a3['find'](_0xe5b2('0xd2')),_0x578d17[_0xe5b2('0x7')]?_0x578d17[_0xe5b2('0xd3')](_0x164199)['addClass'](_0xe5b2('0xd4')):_0x44f4a3[_0xe5b2('0xd3')](_0x164199);}_0x575ac0&&(window[_0xe5b2('0x6f')][_0xe5b2('0xc9')]=!0x1);};window[_0xe5b2('0x6f')][_0xe5b2('0x70')]=function(){window[_0xe5b2('0x6f')][_0xe5b2('0xc9')]=!0x0;_0x1684c4[_0xe5b2('0x62')](this);};_0x13274f(document)[_0xe5b2('0xd5')](function(){_0x1684c4[_0xe5b2('0x62')](this);});}catch(_0x3ba603){_0xe5b2('0x3')!==typeof console&&'function'===typeof console[_0xe5b2('0xd')]&&console[_0xe5b2('0xd')]('Oooops!\x20',_0x3ba603);}}(this));(function(){try{var _0x1d3b95=jQuery,_0x112f95,_0x419d9d={'selector':_0xe5b2('0xd6'),'dropDown':{},'buyButton':{}};_0x1d3b95[_0xe5b2('0xd7')]=function(_0x3b2a50){var _0x19d659={};_0x112f95=_0x1d3b95[_0xe5b2('0x21')](!0x0,{},_0x419d9d,_0x3b2a50);_0x3b2a50=_0x1d3b95(_0x112f95[_0xe5b2('0xd8')])[_0xe5b2('0x19')](_0x112f95['dropDown']);_0x19d659[_0xe5b2('0xd9')]=_0xe5b2('0x3')!==typeof _0x112f95[_0xe5b2('0xda')][_0xe5b2('0x4a')]&&!0x1===_0x112f95[_0xe5b2('0xda')][_0xe5b2('0x4a')]?_0x1d3b95(_0x112f95[_0xe5b2('0xd8')])[_0xe5b2('0xdb')](_0x3b2a50['fn'],_0x112f95['buyButton']):_0x1d3b95(_0x112f95[_0xe5b2('0xd8')])[_0xe5b2('0xdb')](_0x112f95[_0xe5b2('0xd9')]);_0x19d659[_0xe5b2('0xda')]=_0x3b2a50;return _0x19d659;};_0x1d3b95['fn'][_0xe5b2('0xdc')]=function(){_0xe5b2('0x10')===typeof console&&_0xe5b2('0xc')===typeof console[_0xe5b2('0x15')]&&console[_0xe5b2('0x15')](_0xe5b2('0xdd'));};_0x1d3b95[_0xe5b2('0xdc')]=_0x1d3b95['fn']['smartCart'];}catch(_0x3378a5){_0xe5b2('0x3')!==typeof console&&_0xe5b2('0xc')===typeof console[_0xe5b2('0xd')]&&console[_0xe5b2('0xd')](_0xe5b2('0xe'),_0x3378a5);}}());

/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

var _0x51b9=['push','QD_smartImageLoad','each','extend','QD_SIL_scrollRange','scroll','trigger','QD_SIL_scroll','function','henzntvn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','join','toUpperCase','ite','---','erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Quatro\x20Digital\x20-\x20Smart\x20Image\x20Load','undefined','error','warn','object','unshift','alerta','toLowerCase','info','apply','.qd_sil_img_wrapper','300','find','imageWrapper','not','.qd-sil-on','img:visible','length','scrollTop','height','first','Problemas\x20:(\x20.\x20Detalhes:\x20','clone','addClass','qd-sil-image-loaded','src','sizes','width','qd-sil-image','insertAfter','closest','bottom'];(function(_0xe10e8e,_0x7b416e){var _0x4593f8=function(_0x27c250){while(--_0x27c250){_0xe10e8e['push'](_0xe10e8e['shift']());}};_0x4593f8(++_0x7b416e);}(_0x51b9,0x10c));var _0x951b=function(_0x5f1c34,_0x2408c7){_0x5f1c34=_0x5f1c34-0x0;var _0x23ce26=_0x51b9[_0x5f1c34];return _0x23ce26;};(function(_0x201d18){'use strict';var _0x2dde93=jQuery;if(typeof _0x2dde93['fn']['QD_smartImageLoad']===_0x951b('0x0'))return;_0x2dde93['fn']['QD_smartImageLoad']=function(){};var _0x1c586d=function(_0x22dc0c){var _0x59bedb={'c':_0x951b('0x1')};return function(_0x391a3e){var _0x5b06f8,_0x40417a,_0x2df8db,_0x3a3e4f;_0x40417a=function(_0x410da5){return _0x410da5;};_0x2df8db=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x391a3e=_0x391a3e['d'+_0x2df8db[0x10]+'c'+_0x2df8db[0x11]+'m'+_0x40417a(_0x2df8db[0x1])+'n'+_0x2df8db[0xd]]['l'+_0x2df8db[0x12]+'c'+_0x2df8db[0x0]+'ti'+_0x40417a('o')+'n'];_0x5b06f8=function(_0x5f4387){return escape(encodeURIComponent(_0x5f4387['replace'](/\./g,'¨')[_0x951b('0x2')](/[a-zA-Z]/g,function(_0x47311c){return String[_0x951b('0x3')](('Z'>=_0x47311c?0x5a:0x7a)>=(_0x47311c=_0x47311c[_0x951b('0x4')](0x0)+0xd)?_0x47311c:_0x47311c-0x1a);})));};var _0x56e556=_0x5b06f8(_0x391a3e[[_0x2df8db[0x9],_0x40417a('o'),_0x2df8db[0xc],_0x2df8db[_0x40417a(0xd)]][_0x951b('0x5')]('')]);_0x5b06f8=_0x5b06f8((window[['js',_0x40417a('no'),'m',_0x2df8db[0x1],_0x2df8db[0x4][_0x951b('0x6')](),_0x951b('0x7')][_0x951b('0x5')]('')]||_0x951b('0x8'))+['.v',_0x2df8db[0xd],'e',_0x40417a('x'),'co',_0x40417a('mm'),_0x951b('0x9'),_0x2df8db[0x1],'.c',_0x40417a('o'),'m.',_0x2df8db[0x13],'r'][_0x951b('0x5')](''));for(var _0x37e5ea in _0x59bedb){if(_0x5b06f8===_0x37e5ea+_0x59bedb[_0x37e5ea]||_0x56e556===_0x37e5ea+_0x59bedb[_0x37e5ea]){_0x3a3e4f='tr'+_0x2df8db[0x11]+'e';break;}_0x3a3e4f='f'+_0x2df8db[0x0]+'ls'+_0x40417a(_0x2df8db[0x1])+'';}_0x40417a=!0x1;-0x1<_0x391a3e[[_0x2df8db[0xc],'e',_0x2df8db[0x0],'rc',_0x2df8db[0x9]][_0x951b('0x5')]('')][_0x951b('0xa')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x40417a=!0x0);return[_0x3a3e4f,_0x40417a];}(_0x22dc0c);}(window);if(!eval(_0x1c586d[0x0]))return _0x1c586d[0x1]?_0x1dc064(_0x951b('0xb')):!0x1;var _0x2ddd9e=_0x951b('0xc');var _0x1dc064=function(_0x8f3ad7,_0x388e71){if('object'===typeof console&&_0x951b('0xd')!==typeof console[_0x951b('0xe')]&&'undefined'!==typeof console['info']&&_0x951b('0xd')!==typeof console[_0x951b('0xf')]){if(_0x951b('0x10')==typeof _0x8f3ad7&&_0x951b('0x0')==typeof _0x8f3ad7[_0x951b('0x11')]){_0x8f3ad7[_0x951b('0x11')]('['+_0x2ddd9e+']\x0a');var _0x97b35b=_0x8f3ad7;}else _0x97b35b=['['+_0x2ddd9e+']\x0a',_0x8f3ad7];if(_0x951b('0xd')==typeof _0x388e71||_0x951b('0x12')!==_0x388e71[_0x951b('0x13')]()&&'aviso'!==_0x388e71[_0x951b('0x13')]())if(_0x951b('0xd')!=typeof _0x388e71&&_0x951b('0x14')==_0x388e71[_0x951b('0x13')]())try{console[_0x951b('0x14')][_0x951b('0x15')](console,_0x97b35b);}catch(_0x55ff48){try{console[_0x951b('0x14')](_0x97b35b[_0x951b('0x5')]('\x0a'));}catch(_0x44901c){}}else try{console[_0x951b('0xe')]['apply'](console,_0x97b35b);}catch(_0x172c3f){try{console[_0x951b('0xe')](_0x97b35b[_0x951b('0x5')]('\x0a'));}catch(_0x425487){}}else try{console[_0x951b('0xf')][_0x951b('0x15')](console,_0x97b35b);}catch(_0x4912e8){try{console[_0x951b('0xf')](_0x97b35b[_0x951b('0x5')]('\x0a'));}catch(_0x1d6c65){}}}};var _0x2d3203=/(ids\/[0-9]+-)[0-9-]+/i;var _0x1eb7e4={'imageWrapper':_0x951b('0x16'),'sizes':{'width':_0x951b('0x17'),'height':_0x951b('0x17')}};var _0x157867=function(_0x27bccd,_0x5dddf5){'use strict';_0x1f189e();_0x2dde93(window)['on']('QD_SIL_scroll\x20QuatroDigital.is_Callback',_0x1f189e);function _0x1f189e(){try{var _0x5d9b9d=_0x27bccd[_0x951b('0x18')](_0x5dddf5[_0x951b('0x19')])[_0x951b('0x1a')](_0x951b('0x1b'))[_0x951b('0x18')](_0x951b('0x1c'));if(!_0x5d9b9d[_0x951b('0x1d')])return;var _0xae6256=_0x2dde93(window);var _0x54a4cb={'top':_0xae6256[_0x951b('0x1e')]()};_0x54a4cb['bottom']=_0x54a4cb['top']+_0xae6256[_0x951b('0x1f')]();var _0x2afd3f=_0x5d9b9d[_0x951b('0x20')]()[_0x951b('0x1f')]();var _0x490bc2=_0x27b32e(_0x5d9b9d,_0x54a4cb,_0x2afd3f);for(var _0x199e27=0x0;_0x199e27<_0x490bc2[_0x951b('0x1d')];_0x199e27++)_0x5311f7(_0x2dde93(_0x490bc2[_0x199e27]));}catch(_0x3d31bf){typeof console!=='undefined'&&typeof console['error']===_0x951b('0x0')&&console[_0x951b('0xe')](_0x951b('0x21'),_0x3d31bf);}}function _0x5311f7(_0x4e3d71){var _0x574d2a=_0x4e3d71[_0x951b('0x22')]();_0x574d2a['on']('load',function(){_0x2dde93(this)[_0x951b('0x23')](_0x951b('0x24'));});_0x574d2a['attr']({'src':_0x574d2a[0x0][_0x951b('0x25')]['replace'](_0x2d3203,'$1'+_0x5dddf5['sizes']['width']+'-'+_0x5dddf5[_0x951b('0x26')]['height']),'width':_0x5dddf5[_0x951b('0x26')][_0x951b('0x27')],'height':_0x5dddf5['sizes']['height']});_0x574d2a['addClass'](_0x951b('0x28'))[_0x951b('0x29')](_0x4e3d71);_0x574d2a[_0x951b('0x2a')](_0x5dddf5[_0x951b('0x19')])[_0x951b('0x23')]('qd-sil-on');}function _0x27b32e(_0x54ea2f,_0x46a700,_0xe2d20d){var _0x2039d4;var _0x4d16c5=[];for(var _0x1640e9=0x0;_0x1640e9<_0x54ea2f[_0x951b('0x1d')];_0x1640e9++){_0x2039d4=_0x2dde93(_0x54ea2f[_0x1640e9])['offset']();_0x2039d4[_0x951b('0x2b')]=_0x2039d4['top']+_0xe2d20d;if(!(_0x46a700['bottom']<_0x2039d4['top']||_0x46a700['top']>_0x2039d4[_0x951b('0x2b')])){_0x4d16c5[_0x951b('0x2c')](_0x54ea2f[_0x1640e9]);}}return _0x4d16c5;};};_0x2dde93['fn'][_0x951b('0x2d')]=function(_0x5a86c9){var _0x2b5581=_0x2dde93(this);if(!_0x2b5581[_0x951b('0x1d')])return _0x2b5581;_0x2b5581[_0x951b('0x2e')](function(){var _0x1b09e8=_0x2dde93(this);_0x1b09e8['QD_smartImageLoad']=new _0x157867(_0x1b09e8,_0x2dde93[_0x951b('0x2f')]({},_0x1eb7e4,_0x5a86c9));});return _0x2b5581;};window[_0x951b('0x30')]=0x28;var _0x26d261=QD_SIL_scrollRange;var _0x23761a=0x0;_0x2dde93(window)['on'](_0x951b('0x31'),function(){var _0x23fbbe=document['documentElement'][_0x951b('0x1e')];if(_0x23fbbe>_0x23761a+_0x26d261||_0x23fbbe<_0x23761a-_0x26d261){_0x2dde93(window)[_0x951b('0x32')](_0x951b('0x33'));_0x23761a=_0x23fbbe;}});}(this));

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