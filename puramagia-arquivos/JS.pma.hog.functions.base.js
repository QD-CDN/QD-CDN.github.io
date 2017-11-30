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
var _0x7b85=['trigger','QuatroDigital.ssa.prodUnavailable','off','vtex.sku.selected.QD','henzntvn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','toUpperCase','ite','---','erc','join','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','qdPlugin','initialSkuSelected','sku','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','unavailable','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','available','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','function','qdAjax','qdAjaxQueue','extend','url','opts','push','call','parameters','callbackFns','successPopulated','errorPopulated','boolean','completePopulated','success','object','error','complete','clearQueueDelay','jqXHR','ajax','readyState','textStatus','errorThrown','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','QD_smartStockAvailable','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','undefined','alerta','toLowerCase','info','apply','warn','removeClass','qd-ssa-sku-no-selected','qd-ssa-sku-selected','AvailableQuantity','data-qd-ssa-qtt','each','find','[data-qd-ssa-text]','hide','addClass','qd-ssa-show','filter','[data-qd-ssa-text=\x22','length','qd-ssa-hide','html','replace','message','qd-ssa-on','qd-ssa-skus-','skus','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','split','SkuSellersInformation'];(function(_0x139b7c,_0x440f1f){var _0xe8dfcd=function(_0x583b6f){while(--_0x583b6f){_0x139b7c['push'](_0x139b7c['shift']());}};_0xe8dfcd(++_0x440f1f);}(_0x7b85,0x65));var _0x57b8=function(_0x19fc56,_0x21d9c5){_0x19fc56=_0x19fc56-0x0;var _0x309e23=_0x7b85[_0x19fc56];return _0x309e23;};(function(_0x5d1fbd){if(_0x57b8('0x0')!==typeof _0x5d1fbd[_0x57b8('0x1')]){var _0xf63a04={};_0x5d1fbd[_0x57b8('0x2')]=_0xf63a04;_0x5d1fbd[_0x57b8('0x1')]=function(_0x36a3b9){var _0x58ecd7=_0x5d1fbd[_0x57b8('0x3')]({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x36a3b9);var _0x572694=escape(encodeURIComponent(_0x58ecd7[_0x57b8('0x4')]));_0xf63a04[_0x572694]=_0xf63a04[_0x572694]||{};_0xf63a04[_0x572694]['opts']=_0xf63a04[_0x572694][_0x57b8('0x5')]||[];_0xf63a04[_0x572694][_0x57b8('0x5')][_0x57b8('0x6')]({'success':function(_0x51d24b,_0x1c38eb,_0x462ed8){_0x58ecd7['success'][_0x57b8('0x7')](this,_0x51d24b,_0x1c38eb,_0x462ed8);},'error':function(_0x41a6bf,_0x496366,_0x22bc3d){_0x58ecd7['error']['call'](this,_0x41a6bf,_0x496366,_0x22bc3d);},'complete':function(_0xef4637,_0x52e735){_0x58ecd7['complete'][_0x57b8('0x7')](this,_0xef4637,_0x52e735);}});_0xf63a04[_0x572694][_0x57b8('0x8')]=_0xf63a04[_0x572694][_0x57b8('0x8')]||{'success':{},'error':{},'complete':{}};_0xf63a04[_0x572694][_0x57b8('0x9')]=_0xf63a04[_0x572694][_0x57b8('0x9')]||{};_0xf63a04[_0x572694][_0x57b8('0x9')]['successPopulated']='boolean'===typeof _0xf63a04[_0x572694][_0x57b8('0x9')][_0x57b8('0xa')]?_0xf63a04[_0x572694][_0x57b8('0x9')]['successPopulated']:!0x1;_0xf63a04[_0x572694]['callbackFns'][_0x57b8('0xb')]=_0x57b8('0xc')===typeof _0xf63a04[_0x572694][_0x57b8('0x9')][_0x57b8('0xb')]?_0xf63a04[_0x572694][_0x57b8('0x9')][_0x57b8('0xb')]:!0x1;_0xf63a04[_0x572694][_0x57b8('0x9')]['completePopulated']=_0x57b8('0xc')===typeof _0xf63a04[_0x572694][_0x57b8('0x9')][_0x57b8('0xd')]?_0xf63a04[_0x572694]['callbackFns']['completePopulated']:!0x1;_0x36a3b9=_0x5d1fbd[_0x57b8('0x3')]({},_0x58ecd7,{'success':function(_0x4262d,_0x106ba2,_0x2064c1){_0xf63a04[_0x572694]['parameters'][_0x57b8('0xe')]={'data':_0x4262d,'textStatus':_0x106ba2,'jqXHR':_0x2064c1};_0xf63a04[_0x572694][_0x57b8('0x9')]['successPopulated']=!0x0;for(var _0x536f9c in _0xf63a04[_0x572694][_0x57b8('0x5')])_0x57b8('0xf')===typeof _0xf63a04[_0x572694][_0x57b8('0x5')][_0x536f9c]&&(_0xf63a04[_0x572694][_0x57b8('0x5')][_0x536f9c]['success'][_0x57b8('0x7')](this,_0x4262d,_0x106ba2,_0x2064c1),_0xf63a04[_0x572694][_0x57b8('0x5')][_0x536f9c]['success']=function(){});},'error':function(_0x88db01,_0x3efb1a,_0x34b9f1){_0xf63a04[_0x572694][_0x57b8('0x8')]['error']={'errorThrown':_0x34b9f1,'textStatus':_0x3efb1a,'jqXHR':_0x88db01};_0xf63a04[_0x572694][_0x57b8('0x9')][_0x57b8('0xb')]=!0x0;for(var _0x5372ad in _0xf63a04[_0x572694][_0x57b8('0x5')])_0x57b8('0xf')===typeof _0xf63a04[_0x572694]['opts'][_0x5372ad]&&(_0xf63a04[_0x572694]['opts'][_0x5372ad][_0x57b8('0x10')][_0x57b8('0x7')](this,_0x88db01,_0x3efb1a,_0x34b9f1),_0xf63a04[_0x572694][_0x57b8('0x5')][_0x5372ad][_0x57b8('0x10')]=function(){});},'complete':function(_0x4f0132,_0xd55dee){_0xf63a04[_0x572694]['parameters'][_0x57b8('0x11')]={'textStatus':_0xd55dee,'jqXHR':_0x4f0132};_0xf63a04[_0x572694]['callbackFns'][_0x57b8('0xd')]=!0x0;for(var _0x31cfe9 in _0xf63a04[_0x572694]['opts'])_0x57b8('0xf')===typeof _0xf63a04[_0x572694][_0x57b8('0x5')][_0x31cfe9]&&(_0xf63a04[_0x572694][_0x57b8('0x5')][_0x31cfe9][_0x57b8('0x11')][_0x57b8('0x7')](this,_0x4f0132,_0xd55dee),_0xf63a04[_0x572694][_0x57b8('0x5')][_0x31cfe9][_0x57b8('0x11')]=function(){});isNaN(parseInt(_0x58ecd7[_0x57b8('0x12')]))||setTimeout(function(){_0xf63a04[_0x572694][_0x57b8('0x13')]=void 0x0;_0xf63a04[_0x572694][_0x57b8('0x5')]=void 0x0;_0xf63a04[_0x572694][_0x57b8('0x8')]=void 0x0;_0xf63a04[_0x572694][_0x57b8('0x9')]=void 0x0;},_0x58ecd7['clearQueueDelay']);}});'undefined'===typeof _0xf63a04[_0x572694][_0x57b8('0x13')]?_0xf63a04[_0x572694]['jqXHR']=_0x5d1fbd[_0x57b8('0x14')](_0x36a3b9):_0xf63a04[_0x572694][_0x57b8('0x13')]&&_0xf63a04[_0x572694][_0x57b8('0x13')]['readyState']&&0x4==_0xf63a04[_0x572694][_0x57b8('0x13')][_0x57b8('0x15')]&&(_0xf63a04[_0x572694][_0x57b8('0x9')][_0x57b8('0xa')]&&_0x36a3b9[_0x57b8('0xe')](_0xf63a04[_0x572694][_0x57b8('0x8')]['success']['data'],_0xf63a04[_0x572694][_0x57b8('0x8')]['success'][_0x57b8('0x16')],_0xf63a04[_0x572694][_0x57b8('0x8')][_0x57b8('0xe')]['jqXHR']),_0xf63a04[_0x572694][_0x57b8('0x9')][_0x57b8('0xb')]&&_0x36a3b9['error'](_0xf63a04[_0x572694]['parameters'][_0x57b8('0x10')][_0x57b8('0x13')],_0xf63a04[_0x572694][_0x57b8('0x8')][_0x57b8('0x10')][_0x57b8('0x16')],_0xf63a04[_0x572694]['parameters']['error'][_0x57b8('0x17')]),_0xf63a04[_0x572694]['callbackFns'][_0x57b8('0xd')]&&_0x36a3b9['complete'](_0xf63a04[_0x572694]['parameters'][_0x57b8('0x11')][_0x57b8('0x13')],_0xf63a04[_0x572694][_0x57b8('0x8')][_0x57b8('0x11')]['textStatus']));};_0x5d1fbd[_0x57b8('0x1')]['version']='2.1';}}(jQuery));(function(_0x2fcd23){function _0x10f541(_0x3bdd65,_0x45df14){_0x46f764['qdAjax']({'url':'/produto/sku/'+_0x3bdd65,'clearQueueDelay':null,'success':_0x45df14,'error':function(){_0x2e1993(_0x57b8('0x18'));}});}var _0x46f764=jQuery;if(_0x57b8('0x0')!==typeof _0x46f764['fn'][_0x57b8('0x19')]){var _0x2e1993=function(_0x18f224,_0x282eed){if('object'===typeof console){var _0x159c28;_0x57b8('0xf')===typeof _0x18f224?(_0x18f224['unshift'](_0x57b8('0x1a')),_0x159c28=_0x18f224):_0x159c28=[_0x57b8('0x1a')+_0x18f224];_0x57b8('0x1b')===typeof _0x282eed||_0x57b8('0x1c')!==_0x282eed['toLowerCase']()&&'aviso'!==_0x282eed[_0x57b8('0x1d')]()?'undefined'!==typeof _0x282eed&&_0x57b8('0x1e')===_0x282eed['toLowerCase']()?console[_0x57b8('0x1e')][_0x57b8('0x1f')](console,_0x159c28):console['error']['apply'](console,_0x159c28):console[_0x57b8('0x20')]['apply'](console,_0x159c28);}},_0xeef426={},_0x51ec63=function(_0x5cb17f,_0x2c5990){function _0x157cfd(_0x44088c){try{_0x5cb17f[_0x57b8('0x21')](_0x57b8('0x22'))['addClass'](_0x57b8('0x23'));var _0x394432=_0x44088c[0x0]['SkuSellersInformation'][0x0][_0x57b8('0x24')];_0x5cb17f['attr'](_0x57b8('0x25'),_0x394432);_0x5cb17f[_0x57b8('0x26')](function(){var _0x5cb17f=_0x46f764(this)[_0x57b8('0x27')](_0x57b8('0x28'));if(0x1>_0x394432)return _0x5cb17f[_0x57b8('0x29')]()[_0x57b8('0x2a')]('qd-ssa-hide')[_0x57b8('0x21')](_0x57b8('0x2b'));var _0x44088c=_0x5cb17f[_0x57b8('0x2c')](_0x57b8('0x2d')+_0x394432+'\x22]');_0x44088c=_0x44088c[_0x57b8('0x2e')]?_0x44088c:_0x5cb17f['filter']('[data-qd-ssa-text=\x22default\x22]');_0x5cb17f[_0x57b8('0x29')]()[_0x57b8('0x2a')](_0x57b8('0x2f'))[_0x57b8('0x21')]('qd-ssa-show');_0x44088c[_0x57b8('0x30')]((_0x44088c[_0x57b8('0x30')]()||'')[_0x57b8('0x31')]('#qtt',_0x394432));_0x44088c['show']()[_0x57b8('0x2a')](_0x57b8('0x2b'))[_0x57b8('0x21')](_0x57b8('0x2f'));});}catch(_0x5a1059){_0x2e1993(['Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20',_0x5a1059[_0x57b8('0x32')]]);}}if(_0x5cb17f[_0x57b8('0x2e')]){_0x5cb17f[_0x57b8('0x2a')](_0x57b8('0x33'));_0x5cb17f['addClass']('qd-ssa-sku-no-selected');try{_0x5cb17f[_0x57b8('0x2a')](_0x57b8('0x34')+vtxctx[_0x57b8('0x35')]['split'](';')[_0x57b8('0x2e')]);}catch(_0x503cbb){_0x2e1993(['Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20',_0x503cbb[_0x57b8('0x32')]]);}_0x46f764(window)['on'](_0x57b8('0x36'),function(_0x1a51b0,_0x3ad43b,_0x561e8c){try{_0x10f541(_0x561e8c['sku'],function(_0x5ef47e){_0x157cfd(_0x5ef47e);0x1===vtxctx['skus'][_0x57b8('0x37')](';')[_0x57b8('0x2e')]&&0x0==_0x5ef47e[0x0][_0x57b8('0x38')][0x0][_0x57b8('0x24')]&&_0x46f764(window)[_0x57b8('0x39')](_0x57b8('0x3a'));});}catch(_0x576a73){_0x2e1993(['Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20',_0x576a73[_0x57b8('0x32')]]);}});_0x46f764(window)[_0x57b8('0x3b')](_0x57b8('0x3c'));_0x46f764(window)['on'](_0x57b8('0x3a'),function(){_0x5cb17f[_0x57b8('0x2a')]('qd-ssa-sku-prod-unavailable')[_0x57b8('0x29')]();});}};_0x2fcd23=function(_0x15f235){var _0x8a15ed={'c':_0x57b8('0x3d')};return function(_0x5db906){var _0xd6cf04=function(_0x43a19e){return _0x43a19e;};var _0x35e790=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5db906=_0x5db906['d'+_0x35e790[0x10]+'c'+_0x35e790[0x11]+'m'+_0xd6cf04(_0x35e790[0x1])+'n'+_0x35e790[0xd]]['l'+_0x35e790[0x12]+'c'+_0x35e790[0x0]+'ti'+_0xd6cf04('o')+'n'];var _0x1a81bc=function(_0x2b272b){return escape(encodeURIComponent(_0x2b272b[_0x57b8('0x31')](/\./g,'¨')[_0x57b8('0x31')](/[a-zA-Z]/g,function(_0x959949){return String['fromCharCode'](('Z'>=_0x959949?0x5a:0x7a)>=(_0x959949=_0x959949[_0x57b8('0x3e')](0x0)+0xd)?_0x959949:_0x959949-0x1a);})));};var _0x227623=_0x1a81bc(_0x5db906[[_0x35e790[0x9],_0xd6cf04('o'),_0x35e790[0xc],_0x35e790[_0xd6cf04(0xd)]]['join']('')]);_0x1a81bc=_0x1a81bc((window[['js',_0xd6cf04('no'),'m',_0x35e790[0x1],_0x35e790[0x4][_0x57b8('0x3f')](),_0x57b8('0x40')]['join']('')]||_0x57b8('0x41'))+['.v',_0x35e790[0xd],'e',_0xd6cf04('x'),'co',_0xd6cf04('mm'),_0x57b8('0x42'),_0x35e790[0x1],'.c',_0xd6cf04('o'),'m.',_0x35e790[0x13],'r']['join'](''));for(var _0x79e436 in _0x8a15ed){if(_0x1a81bc===_0x79e436+_0x8a15ed[_0x79e436]||_0x227623===_0x79e436+_0x8a15ed[_0x79e436]){var _0x390979='tr'+_0x35e790[0x11]+'e';break;}_0x390979='f'+_0x35e790[0x0]+'ls'+_0xd6cf04(_0x35e790[0x1])+'';}_0xd6cf04=!0x1;-0x1<_0x5db906[[_0x35e790[0xc],'e',_0x35e790[0x0],'rc',_0x35e790[0x9]][_0x57b8('0x43')]('')][_0x57b8('0x44')](_0x57b8('0x45'))&&(_0xd6cf04=!0x0);return[_0x390979,_0xd6cf04];}(_0x15f235);}(window);if(!eval(_0x2fcd23[0x0]))return _0x2fcd23[0x1]?_0x2e1993('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x46f764['fn'][_0x57b8('0x19')]=function(_0x579b15){var _0x26a618=_0x46f764(this);_0x579b15=_0x46f764[_0x57b8('0x3')](!0x0,{},_0xeef426,_0x579b15);_0x26a618[_0x57b8('0x46')]=new _0x51ec63(_0x26a618,_0x579b15);try{'object'===typeof _0x46f764['fn'][_0x57b8('0x19')][_0x57b8('0x47')]&&_0x46f764(window)['trigger']('QuatroDigital.ssa.skuSelected',[_0x46f764['fn'][_0x57b8('0x19')][_0x57b8('0x47')]['prod'],_0x46f764['fn'][_0x57b8('0x19')][_0x57b8('0x47')][_0x57b8('0x48')]]);}catch(_0x6f8eb7){_0x2e1993([_0x57b8('0x49'),_0x6f8eb7[_0x57b8('0x32')]]);}_0x46f764['fn'][_0x57b8('0x19')][_0x57b8('0x4a')]&&_0x46f764(window)[_0x57b8('0x39')]('QuatroDigital.ssa.prodUnavailable');return _0x26a618;};_0x46f764(window)['on'](_0x57b8('0x3c'),function(_0x21342f,_0x522cee,_0xc31639){try{_0x46f764['fn'][_0x57b8('0x19')][_0x57b8('0x47')]={'prod':_0x522cee,'sku':_0xc31639},_0x46f764(this)[_0x57b8('0x3b')](_0x21342f);}catch(_0x3785a3){_0x2e1993([_0x57b8('0x4b'),_0x3785a3[_0x57b8('0x32')]]);}});_0x46f764(window)['on']('vtex.sku.selectable',function(_0x2d36fe,_0x239326,_0x52b865){try{for(var _0x1c8a4d=_0x52b865[_0x57b8('0x2e')],_0x1a749d=_0x239326=0x0;_0x1a749d<_0x1c8a4d&&!_0x52b865[_0x1a749d][_0x57b8('0x4c')];_0x1a749d++)_0x239326+=0x1;_0x1c8a4d<=_0x239326&&(_0x46f764['fn'][_0x57b8('0x19')][_0x57b8('0x4a')]=!0x0);_0x46f764(this)['off'](_0x2d36fe);}catch(_0xc9b4b6){_0x2e1993([_0x57b8('0x4d'),_0xc9b4b6[_0x57b8('0x32')]]);}});_0x46f764(function(){_0x46f764(_0x57b8('0x4e'))[_0x57b8('0x19')]();});}}(window));
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
var _0x4992=['.qd_amazing_menu_auto','getParent','closest','function','QD_amazingMenu','/qd-amazing-menu','undefined','error','info','object','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','apply','join','warn','qdAmAddNdx','addClass','qd-am-li-','qd-am-first','qd-am-last','henzntvn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','charCodeAt','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-collection-wrapper','qdAjax','url','html','find','img[alt=\x27','attr','data-qdam-value','each','.box-banner','insertBefore','hide','qd-am-content-loaded','text','trim','[class*=\x27colunas\x27]','clone','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ul[itemscope]','li\x20>ul','qd-am-has-ul','children','qd-am-elem-','first','replaceSpecialChars','>li','qd-amazing-menu','qd-am-column','qd-am-dropdown','add','callback','trigger','QuatroDigital.am.callback','extend','exec'];(function(_0x3c8a81,_0x1b04b7){var _0xe0f453=function(_0x1354ce){while(--_0x1354ce){_0x3c8a81['push'](_0x3c8a81['shift']());}};_0xe0f453(++_0x1b04b7);}(_0x4992,0x1f2));var _0x2499=function(_0x4c320e,_0x2f0abb){_0x4c320e=_0x4c320e-0x0;var _0x5d72b7=_0x4992[_0x4c320e];return _0x5d72b7;};(function(_0x3c099d){_0x3c099d['fn'][_0x2499('0x0')]=_0x3c099d['fn'][_0x2499('0x1')];}(jQuery));(function(_0x1461b7){var _0x4ce08e;var _0x7f2d=jQuery;if(_0x2499('0x2')!==typeof _0x7f2d['fn'][_0x2499('0x3')]){var _0x4619af={'url':_0x2499('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0x38c1e8=function(_0x319fcb,_0x285775){if('object'===typeof console&&_0x2499('0x5')!==typeof console[_0x2499('0x6')]&&_0x2499('0x5')!==typeof console[_0x2499('0x7')]&&_0x2499('0x5')!==typeof console['warn']){var _0x1c083c;_0x2499('0x8')===typeof _0x319fcb?(_0x319fcb[_0x2499('0x9')](_0x2499('0xa')),_0x1c083c=_0x319fcb):_0x1c083c=[_0x2499('0xa')+_0x319fcb];if('undefined'===typeof _0x285775||_0x2499('0xb')!==_0x285775[_0x2499('0xc')]()&&'aviso'!==_0x285775[_0x2499('0xc')]())if('undefined'!==typeof _0x285775&&'info'===_0x285775[_0x2499('0xc')]())try{console[_0x2499('0x7')][_0x2499('0xd')](console,_0x1c083c);}catch(_0x17ce81){try{console['info'](_0x1c083c['join']('\x0a'));}catch(_0x409a4d){}}else try{console[_0x2499('0x6')][_0x2499('0xd')](console,_0x1c083c);}catch(_0x2f871b){try{console[_0x2499('0x6')](_0x1c083c[_0x2499('0xe')]('\x0a'));}catch(_0x51ad4b){}}else try{console['warn'][_0x2499('0xd')](console,_0x1c083c);}catch(_0x1f88f4){try{console[_0x2499('0xf')](_0x1c083c['join']('\x0a'));}catch(_0x5ded76){}}}};_0x7f2d['fn'][_0x2499('0x10')]=function(){var _0x3bb91c=_0x7f2d(this);_0x3bb91c['each'](function(_0x499593){_0x7f2d(this)[_0x2499('0x11')](_0x2499('0x12')+_0x499593);});_0x3bb91c['first']()[_0x2499('0x11')](_0x2499('0x13'));_0x3bb91c['last']()['addClass'](_0x2499('0x14'));return _0x3bb91c;};_0x7f2d['fn'][_0x2499('0x3')]=function(){};_0x1461b7=function(_0x5663fc){var _0x47fe25={'c':_0x2499('0x15')};return function(_0x180a63){var _0x2014a2=function(_0x5a66d1){return _0x5a66d1;};var _0x6f8b0f=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x180a63=_0x180a63['d'+_0x6f8b0f[0x10]+'c'+_0x6f8b0f[0x11]+'m'+_0x2014a2(_0x6f8b0f[0x1])+'n'+_0x6f8b0f[0xd]]['l'+_0x6f8b0f[0x12]+'c'+_0x6f8b0f[0x0]+'ti'+_0x2014a2('o')+'n'];var _0x353c02=function(_0x35ea3a){return escape(encodeURIComponent(_0x35ea3a[_0x2499('0x16')](/\./g,'¨')[_0x2499('0x16')](/[a-zA-Z]/g,function(_0x1a159f){return String['fromCharCode'](('Z'>=_0x1a159f?0x5a:0x7a)>=(_0x1a159f=_0x1a159f[_0x2499('0x17')](0x0)+0xd)?_0x1a159f:_0x1a159f-0x1a);})));};var _0x517507=_0x353c02(_0x180a63[[_0x6f8b0f[0x9],_0x2014a2('o'),_0x6f8b0f[0xc],_0x6f8b0f[_0x2014a2(0xd)]][_0x2499('0xe')]('')]);_0x353c02=_0x353c02((window[['js',_0x2014a2('no'),'m',_0x6f8b0f[0x1],_0x6f8b0f[0x4]['toUpperCase'](),'ite'][_0x2499('0xe')]('')]||_0x2499('0x18'))+['.v',_0x6f8b0f[0xd],'e',_0x2014a2('x'),'co',_0x2014a2('mm'),_0x2499('0x19'),_0x6f8b0f[0x1],'.c',_0x2014a2('o'),'m.',_0x6f8b0f[0x13],'r'][_0x2499('0xe')](''));for(var _0x31d90b in _0x47fe25){if(_0x353c02===_0x31d90b+_0x47fe25[_0x31d90b]||_0x517507===_0x31d90b+_0x47fe25[_0x31d90b]){var _0x155f9b='tr'+_0x6f8b0f[0x11]+'e';break;}_0x155f9b='f'+_0x6f8b0f[0x0]+'ls'+_0x2014a2(_0x6f8b0f[0x1])+'';}_0x2014a2=!0x1;-0x1<_0x180a63[[_0x6f8b0f[0xc],'e',_0x6f8b0f[0x0],'rc',_0x6f8b0f[0x9]][_0x2499('0xe')]('')]['indexOf'](_0x2499('0x1a'))&&(_0x2014a2=!0x0);return[_0x155f9b,_0x2014a2];}(_0x5663fc);}(window);if(!eval(_0x1461b7[0x0]))return _0x1461b7[0x1]?_0x38c1e8(_0x2499('0x1b')):!0x1;var _0x51b47a=function(_0x220b79){var _0x2aa9e1=_0x220b79['find'](_0x2499('0x1c'));var _0x5f00da=_0x2aa9e1[_0x2499('0x1d')](_0x2499('0x1e'));var _0x2a577c=_0x2aa9e1[_0x2499('0x1d')](_0x2499('0x1f'));if(_0x5f00da[_0x2499('0x20')]||_0x2a577c[_0x2499('0x20')])_0x5f00da[_0x2499('0x21')]()[_0x2499('0x11')]('qd-am-banner-wrapper'),_0x2a577c[_0x2499('0x21')]()[_0x2499('0x11')](_0x2499('0x22')),_0x7f2d[_0x2499('0x23')]({'url':_0x4ce08e[_0x2499('0x24')],'dataType':_0x2499('0x25'),'success':function(_0x5a9883){var _0xfb577=_0x7f2d(_0x5a9883);_0x5f00da['each'](function(){var _0x5a9883=_0x7f2d(this);var _0x19be05=_0xfb577[_0x2499('0x26')](_0x2499('0x27')+_0x5a9883[_0x2499('0x28')](_0x2499('0x29'))+'\x27]');_0x19be05[_0x2499('0x20')]&&(_0x19be05[_0x2499('0x2a')](function(){_0x7f2d(this)[_0x2499('0x0')](_0x2499('0x2b'))['clone']()[_0x2499('0x2c')](_0x5a9883);}),_0x5a9883[_0x2499('0x2d')]());})['addClass'](_0x2499('0x2e'));_0x2a577c['each'](function(){var _0x5a9883={};var _0x89ed8e=_0x7f2d(this);_0xfb577['find']('h2')['each'](function(){if(_0x7f2d(this)[_0x2499('0x2f')]()[_0x2499('0x30')]()[_0x2499('0xc')]()==_0x89ed8e[_0x2499('0x28')](_0x2499('0x29'))[_0x2499('0x30')]()[_0x2499('0xc')]())return _0x5a9883=_0x7f2d(this),!0x1;});_0x5a9883[_0x2499('0x20')]&&(_0x5a9883[_0x2499('0x2a')](function(){_0x7f2d(this)[_0x2499('0x0')](_0x2499('0x31'))[_0x2499('0x32')]()['insertBefore'](_0x89ed8e);}),_0x89ed8e[_0x2499('0x2d')]());})[_0x2499('0x11')](_0x2499('0x2e'));},'error':function(){_0x38c1e8(_0x2499('0x33')+_0x4ce08e[_0x2499('0x24')]+_0x2499('0x34'));},'complete':function(){_0x4ce08e['ajaxCallback']['call'](this);_0x7f2d(window)['trigger']('QuatroDigital.am.ajaxCallback',_0x220b79);},'clearQueueDelay':0xbb8});};_0x7f2d['QD_amazingMenu']=function(_0x3b9945){var _0x3d8490=_0x3b9945[_0x2499('0x26')](_0x2499('0x35'))['each'](function(){var _0x50a095=_0x7f2d(this);if(!_0x50a095[_0x2499('0x20')])return _0x38c1e8(['UL\x20do\x20menu\x20não\x20encontrada',_0x3b9945],_0x2499('0xb'));_0x50a095[_0x2499('0x26')](_0x2499('0x36'))[_0x2499('0x21')]()[_0x2499('0x11')](_0x2499('0x37'));_0x50a095[_0x2499('0x26')]('li')[_0x2499('0x2a')](function(){var _0x2c3acf=_0x7f2d(this);var _0x80c999=_0x2c3acf[_0x2499('0x38')](':not(ul)');_0x80c999[_0x2499('0x20')]&&_0x2c3acf[_0x2499('0x11')](_0x2499('0x39')+_0x80c999[_0x2499('0x3a')]()['text']()[_0x2499('0x30')]()[_0x2499('0x3b')]()[_0x2499('0x16')](/\./g,'')[_0x2499('0x16')](/\s/g,'-')[_0x2499('0xc')]());});var _0x1095e4=_0x50a095['find'](_0x2499('0x3c'))[_0x2499('0x10')]();_0x50a095[_0x2499('0x11')](_0x2499('0x3d'));_0x1095e4=_0x1095e4[_0x2499('0x26')]('>ul');_0x1095e4[_0x2499('0x2a')](function(){var _0x19a384=_0x7f2d(this);_0x19a384[_0x2499('0x26')](_0x2499('0x3c'))[_0x2499('0x10')]()[_0x2499('0x11')](_0x2499('0x3e'));_0x19a384[_0x2499('0x11')]('qd-am-dropdown-menu');_0x19a384[_0x2499('0x21')]()['addClass']('qd-am-dropdown');});_0x1095e4[_0x2499('0x11')](_0x2499('0x3f'));var _0x4d2df8=0x0,_0x1461b7=function(_0x108a88){_0x4d2df8+=0x1;_0x108a88=_0x108a88[_0x2499('0x38')]('li')[_0x2499('0x38')]('*');_0x108a88[_0x2499('0x20')]&&(_0x108a88[_0x2499('0x11')]('qd-am-level-'+_0x4d2df8),_0x1461b7(_0x108a88));};_0x1461b7(_0x50a095);_0x50a095[_0x2499('0x40')](_0x50a095[_0x2499('0x26')]('ul'))['each'](function(){var _0x54d776=_0x7f2d(this);_0x54d776[_0x2499('0x11')]('qd-am-'+_0x54d776['children']('li')[_0x2499('0x20')]+'-li');});});_0x51b47a(_0x3d8490);_0x4ce08e[_0x2499('0x41')]['call'](this);_0x7f2d(window)[_0x2499('0x42')](_0x2499('0x43'),_0x3b9945);};_0x7f2d['fn'][_0x2499('0x3')]=function(_0x3648bc){var _0x1c8b98=_0x7f2d(this);if(!_0x1c8b98[_0x2499('0x20')])return _0x1c8b98;_0x4ce08e=_0x7f2d[_0x2499('0x44')]({},_0x4619af,_0x3648bc);_0x1c8b98[_0x2499('0x45')]=new _0x7f2d[(_0x2499('0x3'))](_0x7f2d(this));return _0x1c8b98;};_0x7f2d(function(){_0x7f2d(_0x2499('0x46'))[_0x2499('0x3')]();});}}(this));
/* Quatro Digital Smart Cart */
var _0x1303=['qd-ddc-product-add-time','callbackProductsList','load','qd-loaded','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','changeQantity','data-sku-index','.qd-ddc-prodQttWrapper:not(.qd_on)','.qd-ddc-quantityMore','click.qd_ddc_more','preventDefault','qd-loading','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','.qd-ddc-prodRow','click.qd_ddc_remove','removeProduct','stop','remove','shippingCalculate','$1-$2$3','data','calculateShipping','BRA','done','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','qdDdcLastPostalCode','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','prodId','qtt','.qd-bap-wrapper','.qd-bap-item-added','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','qd-bap-item-added','.qdDdcContainer','QD_smartCart','extend','selector','dropDown','QD_buyButton','buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','closest','replace','abs','undefined','pow','round','toFixed','split','join','_QuatroDigital_CartData','callback','Callbacks','error','Oooops!\x20','message','object','warn','unshift','alerta','toLowerCase','aviso','info','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','henzntvn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','length','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','name','smartCheckout','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','removeClass','qd-bb-lightBoxProdAdd','off','keyup.qd_ddc_closeFn','keyCode','body','find','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','val','keyup.qd_ddc_cep','updateOnlyHover','mouseenter.qd_ddc_hover','getCartInfoByUrl','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','html','.qd_ddc_continueShopping','continueShopping','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','cartContainer','each','call','clone','total','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','allTotal','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','getOrderForm','_QuatroDigital_AmountProduct','exec','function','QD_checkoutQueue','items','totalizers','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','qd-ddc-noItems','addClass','.qd-ddc-prodWrapper2','empty','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','attr','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','meta[name=currency]','content','.qd-ddc-quantity','quantity','insertProdImg','.qd-ddc-image','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','.qd-ddc-wrapper','address','shippingData','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','filter','lastSku','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time'];(function(_0x5c6cd1,_0x14bff2){var _0x4154a4=function(_0x85f8cd){while(--_0x85f8cd){_0x5c6cd1['push'](_0x5c6cd1['shift']());}};_0x4154a4(++_0x14bff2);}(_0x1303,0x1f2));var _0x3130=function(_0x59db42,_0x12290e){_0x59db42=_0x59db42-0x0;var _0x5cd5f5=_0x1303[_0x59db42];return _0x5cd5f5;};(function(_0x367cbf){_0x367cbf['fn'][_0x3130('0x0')]=_0x367cbf['fn'][_0x3130('0x1')];}(jQuery));function qd_number_format(_0x5429de,_0x507377,_0x3a8e33,_0x14afbb){_0x5429de=(_0x5429de+'')[_0x3130('0x2')](/[^0-9+\-Ee.]/g,'');_0x5429de=isFinite(+_0x5429de)?+_0x5429de:0x0;_0x507377=isFinite(+_0x507377)?Math[_0x3130('0x3')](_0x507377):0x0;_0x14afbb=_0x3130('0x4')===typeof _0x14afbb?',':_0x14afbb;_0x3a8e33=_0x3130('0x4')===typeof _0x3a8e33?'.':_0x3a8e33;var _0x234cde='',_0x234cde=function(_0x5599c7,_0xb732e7){var _0x507377=Math[_0x3130('0x5')](0xa,_0xb732e7);return''+(Math[_0x3130('0x6')](_0x5599c7*_0x507377)/_0x507377)[_0x3130('0x7')](_0xb732e7);},_0x234cde=(_0x507377?_0x234cde(_0x5429de,_0x507377):''+Math[_0x3130('0x6')](_0x5429de))[_0x3130('0x8')]('.');0x3<_0x234cde[0x0]['length']&&(_0x234cde[0x0]=_0x234cde[0x0][_0x3130('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x14afbb));(_0x234cde[0x1]||'')['length']<_0x507377&&(_0x234cde[0x1]=_0x234cde[0x1]||'',_0x234cde[0x1]+=Array(_0x507377-_0x234cde[0x1]['length']+0x1)[_0x3130('0x9')]('0'));return _0x234cde['join'](_0x3a8e33);};(function(){try{window[_0x3130('0xa')]=window['_QuatroDigital_CartData']||{},window[_0x3130('0xa')][_0x3130('0xb')]=window[_0x3130('0xa')][_0x3130('0xb')]||$[_0x3130('0xc')]();}catch(_0x22cdc2){_0x3130('0x4')!==typeof console&&'function'===typeof console[_0x3130('0xd')]&&console['error'](_0x3130('0xe'),_0x22cdc2[_0x3130('0xf')]);}}());(function(_0x4f795e){try{var _0x45fb60=jQuery,_0x103d3f=function(_0x2529e6,_0x4c06da){if(_0x3130('0x10')===typeof console&&'undefined'!==typeof console[_0x3130('0xd')]&&'undefined'!==typeof console['info']&&_0x3130('0x4')!==typeof console[_0x3130('0x11')]){var _0x522c88;_0x3130('0x10')===typeof _0x2529e6?(_0x2529e6[_0x3130('0x12')]('[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'),_0x522c88=_0x2529e6):_0x522c88=['[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'+_0x2529e6];if(_0x3130('0x4')===typeof _0x4c06da||_0x3130('0x13')!==_0x4c06da[_0x3130('0x14')]()&&_0x3130('0x15')!==_0x4c06da[_0x3130('0x14')]())if(_0x3130('0x4')!==typeof _0x4c06da&&_0x3130('0x16')===_0x4c06da[_0x3130('0x14')]())try{console['info'][_0x3130('0x17')](console,_0x522c88);}catch(_0x44aef7){try{console['info'](_0x522c88['join']('\x0a'));}catch(_0xa9a0ad){}}else try{console['error'][_0x3130('0x17')](console,_0x522c88);}catch(_0x1dfdac){try{console[_0x3130('0xd')](_0x522c88[_0x3130('0x9')]('\x0a'));}catch(_0x4d38cb){}}else try{console['warn']['apply'](console,_0x522c88);}catch(_0x438b54){try{console[_0x3130('0x11')](_0x522c88[_0x3130('0x9')]('\x0a'));}catch(_0x45e7b5){}}}};window[_0x3130('0x18')]=window['_QuatroDigital_DropDown']||{};window[_0x3130('0x18')][_0x3130('0x19')]=!0x0;_0x45fb60['QD_dropDownCart']=function(){};_0x45fb60['fn'][_0x3130('0x1a')]=function(){return{'fn':new _0x45fb60()};};var _0x1d870a=function(_0x167697){var _0x23f7cc={'c':_0x3130('0x1b')};return function(_0x39a65e){var _0x241956=function(_0x2a18a3){return _0x2a18a3;};var _0x252a57=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x39a65e=_0x39a65e['d'+_0x252a57[0x10]+'c'+_0x252a57[0x11]+'m'+_0x241956(_0x252a57[0x1])+'n'+_0x252a57[0xd]]['l'+_0x252a57[0x12]+'c'+_0x252a57[0x0]+'ti'+_0x241956('o')+'n'];var _0x406fab=function(_0x55e62b){return escape(encodeURIComponent(_0x55e62b['replace'](/\./g,'¨')[_0x3130('0x2')](/[a-zA-Z]/g,function(_0x1e7659){return String[_0x3130('0x1c')](('Z'>=_0x1e7659?0x5a:0x7a)>=(_0x1e7659=_0x1e7659[_0x3130('0x1d')](0x0)+0xd)?_0x1e7659:_0x1e7659-0x1a);})));};var _0x3262a8=_0x406fab(_0x39a65e[[_0x252a57[0x9],_0x241956('o'),_0x252a57[0xc],_0x252a57[_0x241956(0xd)]][_0x3130('0x9')]('')]);_0x406fab=_0x406fab((window[['js',_0x241956('no'),'m',_0x252a57[0x1],_0x252a57[0x4][_0x3130('0x1e')](),'ite'][_0x3130('0x9')]('')]||_0x3130('0x1f'))+['.v',_0x252a57[0xd],'e',_0x241956('x'),'co',_0x241956('mm'),_0x3130('0x20'),_0x252a57[0x1],'.c',_0x241956('o'),'m.',_0x252a57[0x13],'r'][_0x3130('0x9')](''));for(var _0x55fdf3 in _0x23f7cc){if(_0x406fab===_0x55fdf3+_0x23f7cc[_0x55fdf3]||_0x3262a8===_0x55fdf3+_0x23f7cc[_0x55fdf3]){var _0x2ff37b='tr'+_0x252a57[0x11]+'e';break;}_0x2ff37b='f'+_0x252a57[0x0]+'ls'+_0x241956(_0x252a57[0x1])+'';}_0x241956=!0x1;-0x1<_0x39a65e[[_0x252a57[0xc],'e',_0x252a57[0x0],'rc',_0x252a57[0x9]]['join']('')][_0x3130('0x21')](_0x3130('0x22'))&&(_0x241956=!0x0);return[_0x2ff37b,_0x241956];}(_0x167697);}(window);if(!eval(_0x1d870a[0x0]))return _0x1d870a[0x1]?_0x103d3f(_0x3130('0x23')):!0x1;_0x45fb60[_0x3130('0x1a')]=function(_0x570d32,_0x4f7d59){var _0x2ac5f4=_0x45fb60(_0x570d32);if(!_0x2ac5f4[_0x3130('0x24')])return _0x2ac5f4;var _0x18258b=_0x45fb60['extend'](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x3130('0x25'),'linkCheckout':_0x3130('0x26'),'cartTotal':_0x3130('0x27'),'emptyCart':_0x3130('0x28'),'continueShopping':_0x3130('0x29'),'shippingForm':_0x3130('0x2a')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0xc75539){return _0xc75539[_0x3130('0x2b')]||_0xc75539[_0x3130('0x2c')];},'callback':function(){},'callbackProductsList':function(){}},_0x4f7d59);_0x45fb60('');var _0x12ee3d=this;if(_0x18258b[_0x3130('0x2d')]){var _0x30d1a1=!0x1;_0x3130('0x4')===typeof window[_0x3130('0x2e')]&&(_0x103d3f(_0x3130('0x2f')),_0x45fb60['ajax']({'url':_0x3130('0x30'),'async':!0x1,'dataType':'script','error':function(){_0x103d3f('Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.');_0x30d1a1=!0x0;}}));if(_0x30d1a1)return _0x103d3f(_0x3130('0x31'));}if(_0x3130('0x10')===typeof window[_0x3130('0x2e')]&&_0x3130('0x4')!==typeof window[_0x3130('0x2e')]['checkout'])var _0x4f795e=window['vtexjs']['checkout'];else if(_0x3130('0x10')===typeof vtex&&_0x3130('0x10')===typeof vtex[_0x3130('0x32')]&&_0x3130('0x4')!==typeof vtex[_0x3130('0x32')][_0x3130('0x33')])_0x4f795e=new vtex[(_0x3130('0x32'))][(_0x3130('0x33'))]();else return _0x103d3f(_0x3130('0x34'));_0x12ee3d['cartContainer']=_0x3130('0x35');var _0x27456c=function(_0xb11adf){_0x45fb60(this)[_0x3130('0x36')](_0xb11adf);_0xb11adf['find'](_0x3130('0x37'))[_0x3130('0x38')](_0x45fb60('.qd_ddc_lightBoxOverlay'))['on']('click.qd_ddc_closeFn',function(){_0x2ac5f4[_0x3130('0x39')](_0x3130('0x3a'));_0x45fb60(document['body'])['removeClass']('qd-bb-lightBoxBodyProdAdd');});_0x45fb60(document)[_0x3130('0x3b')](_0x3130('0x3c'))['on'](_0x3130('0x3c'),function(_0x325948){0x1b==_0x325948[_0x3130('0x3d')]&&(_0x2ac5f4['removeClass'](_0x3130('0x3a')),_0x45fb60(document[_0x3130('0x3e')])[_0x3130('0x39')]('qd-bb-lightBoxBodyProdAdd'));});var _0x51ce07=_0xb11adf[_0x3130('0x3f')](_0x3130('0x40'));_0xb11adf[_0x3130('0x3f')](_0x3130('0x41'))['on'](_0x3130('0x42'),function(){_0x12ee3d[_0x3130('0x43')]('-',void 0x0,void 0x0,_0x51ce07);return!0x1;});_0xb11adf[_0x3130('0x3f')](_0x3130('0x44'))['on'](_0x3130('0x45'),function(){_0x12ee3d[_0x3130('0x43')](void 0x0,void 0x0,void 0x0,_0x51ce07);return!0x1;});_0xb11adf['find']('.qd-ddc-shipping\x20input')[_0x3130('0x46')]('')['on'](_0x3130('0x47'),function(){_0x12ee3d['shippingCalculate'](_0x45fb60(this));});if(_0x18258b[_0x3130('0x48')]){var _0x4f7d59=0x0;_0x45fb60(this)['on'](_0x3130('0x49'),function(){var _0xb11adf=function(){window['_QuatroDigital_DropDown'][_0x3130('0x19')]&&(_0x12ee3d[_0x3130('0x4a')](),window[_0x3130('0x18')][_0x3130('0x19')]=!0x1,_0x45fb60['fn'][_0x3130('0x4b')](!0x0),_0x12ee3d[_0x3130('0x4c')]());};_0x4f7d59=setInterval(function(){_0xb11adf();},0x258);_0xb11adf();});_0x45fb60(this)['on'](_0x3130('0x4d'),function(){clearInterval(_0x4f7d59);});}};var _0x53fc53=function(_0x2f9ddd){_0x2f9ddd=_0x45fb60(_0x2f9ddd);_0x18258b[_0x3130('0x4e')][_0x3130('0x4f')]=_0x18258b[_0x3130('0x4e')]['cartTotal'][_0x3130('0x2')](_0x3130('0x50'),_0x3130('0x51'));_0x18258b[_0x3130('0x4e')][_0x3130('0x4f')]=_0x18258b[_0x3130('0x4e')][_0x3130('0x4f')]['replace'](_0x3130('0x52'),_0x3130('0x53'));_0x18258b['texts'][_0x3130('0x4f')]=_0x18258b[_0x3130('0x4e')]['cartTotal'][_0x3130('0x2')]('#shipping',_0x3130('0x54'));_0x18258b[_0x3130('0x4e')][_0x3130('0x4f')]=_0x18258b[_0x3130('0x4e')][_0x3130('0x4f')]['replace'](_0x3130('0x55'),'<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0x2f9ddd[_0x3130('0x3f')]('.qd-ddc-viewCart')[_0x3130('0x56')](_0x18258b[_0x3130('0x4e')]['linkCart']);_0x2f9ddd[_0x3130('0x3f')](_0x3130('0x57'))[_0x3130('0x56')](_0x18258b['texts'][_0x3130('0x58')]);_0x2f9ddd[_0x3130('0x3f')]('.qd-ddc-checkout')[_0x3130('0x56')](_0x18258b[_0x3130('0x4e')][_0x3130('0x59')]);_0x2f9ddd[_0x3130('0x3f')](_0x3130('0x5a'))['html'](_0x18258b[_0x3130('0x4e')]['cartTotal']);_0x2f9ddd[_0x3130('0x3f')](_0x3130('0x5b'))[_0x3130('0x56')](_0x18258b[_0x3130('0x4e')][_0x3130('0x5c')]);_0x2f9ddd[_0x3130('0x3f')]('.qd-ddc-emptyCart\x20p')['html'](_0x18258b[_0x3130('0x4e')]['emptyCart']);return _0x2f9ddd;}(this[_0x3130('0x5d')]);var _0x390469=0x0;_0x2ac5f4[_0x3130('0x5e')](function(){0x0<_0x390469?_0x27456c[_0x3130('0x5f')](this,_0x53fc53[_0x3130('0x60')]()):_0x27456c[_0x3130('0x5f')](this,_0x53fc53);_0x390469++;});window[_0x3130('0xa')][_0x3130('0xb')][_0x3130('0x38')](function(){_0x45fb60('.qd-ddc-infoTotalValue')[_0x3130('0x56')](window[_0x3130('0xa')][_0x3130('0x61')]||'--');_0x45fb60(_0x3130('0x62'))['html'](window['_QuatroDigital_CartData']['qtt']||'0');_0x45fb60(_0x3130('0x63'))[_0x3130('0x56')](window[_0x3130('0xa')][_0x3130('0x64')]||'--');_0x45fb60(_0x3130('0x65'))['html'](window[_0x3130('0xa')][_0x3130('0x66')]||'--');});var _0x59eee7=function(_0xa47f2a,_0x4efd9f){if(_0x3130('0x4')===typeof _0xa47f2a['items'])return _0x103d3f('Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição');_0x12ee3d[_0x3130('0x67')][_0x3130('0x5f')](this,_0x4efd9f);};_0x12ee3d[_0x3130('0x4a')]=function(_0x2d8b9c,_0xcf63c3){_0x3130('0x4')!=typeof _0xcf63c3?window[_0x3130('0x18')][_0x3130('0x68')]=_0xcf63c3:window[_0x3130('0x18')][_0x3130('0x68')]&&(_0xcf63c3=window[_0x3130('0x18')][_0x3130('0x68')]);setTimeout(function(){window[_0x3130('0x18')]['dataOptionsCache']=void 0x0;},_0x18258b[_0x3130('0x69')]);_0x45fb60('.qd-ddc-wrapper')[_0x3130('0x39')]('qd-ddc-prodLoaded');if(_0x18258b[_0x3130('0x2d')]){var _0x4f7d59=function(_0xb0f654){window[_0x3130('0x18')][_0x3130('0x6a')]=_0xb0f654;_0x59eee7(_0xb0f654,_0xcf63c3);_0x3130('0x4')!==typeof window[_0x3130('0x6b')]&&'function'===typeof window[_0x3130('0x6b')][_0x3130('0x6c')]&&window[_0x3130('0x6b')][_0x3130('0x6c')][_0x3130('0x5f')](this);_0x45fb60('.qd-ddc-wrapper')['addClass']('qd-ddc-prodLoaded');};'undefined'!==typeof window[_0x3130('0x18')][_0x3130('0x6a')]?(_0x4f7d59(window[_0x3130('0x18')][_0x3130('0x6a')]),_0x3130('0x6d')===typeof _0x2d8b9c&&_0x2d8b9c(window['_QuatroDigital_DropDown'][_0x3130('0x6a')])):_0x45fb60[_0x3130('0x6e')]([_0x3130('0x6f'),_0x3130('0x70'),'shippingData'],{'done':function(_0x1d13ba){_0x4f7d59[_0x3130('0x5f')](this,_0x1d13ba);_0x3130('0x6d')===typeof _0x2d8b9c&&_0x2d8b9c(_0x1d13ba);},'fail':function(_0x45e6ca){_0x103d3f([_0x3130('0x71'),_0x45e6ca]);}});}else alert(_0x3130('0x72'));};_0x12ee3d[_0x3130('0x4c')]=function(){var _0x229efe=_0x45fb60('.qd-ddc-wrapper');_0x229efe[_0x3130('0x3f')]('.qd-ddc-prodRow')['length']?_0x229efe[_0x3130('0x39')](_0x3130('0x73')):_0x229efe[_0x3130('0x74')](_0x3130('0x73'));};_0x12ee3d[_0x3130('0x67')]=function(_0x221455){var _0x4f7d59=_0x45fb60(_0x3130('0x75'));_0x4f7d59[_0x3130('0x76')]();_0x4f7d59[_0x3130('0x5e')](function(){var _0x4f7d59=_0x45fb60(this),_0x41e6de,_0x570d32,_0x36c89e=_0x45fb60(''),_0x2eb836;for(_0x2eb836 in window[_0x3130('0x18')][_0x3130('0x6a')][_0x3130('0x6f')])if(_0x3130('0x10')===typeof window['_QuatroDigital_DropDown']['getOrderForm']['items'][_0x2eb836]){var _0x2e3999=window[_0x3130('0x18')][_0x3130('0x6a')][_0x3130('0x6f')][_0x2eb836];var _0x4123f8=_0x2e3999[_0x3130('0x77')]['replace'](/^\/|\/$/g,'')['split']('/');var _0x339998=_0x45fb60(_0x3130('0x78'));_0x339998[_0x3130('0x79')]({'data-sku':_0x2e3999['id'],'data-sku-index':_0x2eb836,'data-qd-departament':_0x4123f8[0x0],'data-qd-category':_0x4123f8[_0x4123f8[_0x3130('0x24')]-0x1]});_0x339998[_0x3130('0x74')]('qd-ddc-'+_0x2e3999[_0x3130('0x7a')]);_0x339998[_0x3130('0x3f')](_0x3130('0x7b'))[_0x3130('0x36')](_0x18258b[_0x3130('0x2b')](_0x2e3999));_0x339998[_0x3130('0x3f')](_0x3130('0x7c'))['append'](isNaN(_0x2e3999[_0x3130('0x7d')])?_0x2e3999['sellingPrice']:0x0==_0x2e3999[_0x3130('0x7d')]?'Grátis':(_0x45fb60(_0x3130('0x7e'))[_0x3130('0x79')](_0x3130('0x7f'))||'R$')+'\x20'+qd_number_format(_0x2e3999[_0x3130('0x7d')]/0x64,0x2,',','.'));_0x339998['find'](_0x3130('0x80'))[_0x3130('0x79')]({'data-sku':_0x2e3999['id'],'data-sku-index':_0x2eb836})[_0x3130('0x46')](_0x2e3999[_0x3130('0x81')]);_0x339998['find']('.qd-ddc-remove')[_0x3130('0x79')]({'data-sku':_0x2e3999['id'],'data-sku-index':_0x2eb836});_0x12ee3d[_0x3130('0x82')](_0x2e3999['id'],_0x339998[_0x3130('0x3f')](_0x3130('0x83')),_0x2e3999['imageUrl']);_0x339998[_0x3130('0x3f')](_0x3130('0x84'))[_0x3130('0x79')]({'data-sku':_0x2e3999['id'],'data-sku-index':_0x2eb836});_0x339998[_0x3130('0x85')](_0x4f7d59);_0x36c89e=_0x36c89e[_0x3130('0x38')](_0x339998);}try{var _0x4f795e=_0x4f7d59[_0x3130('0x0')](_0x3130('0x86'))['find']('.qd-ddc-shipping\x20input');_0x4f795e[_0x3130('0x24')]&&''==_0x4f795e[_0x3130('0x46')]()&&window['_QuatroDigital_DropDown']['getOrderForm']['shippingData'][_0x3130('0x87')]&&_0x4f795e['val'](window['_QuatroDigital_DropDown'][_0x3130('0x6a')][_0x3130('0x88')][_0x3130('0x87')][_0x3130('0x89')]);}catch(_0x19c0f2){_0x103d3f(_0x3130('0x8a')+_0x19c0f2[_0x3130('0xf')],_0x3130('0x15'));}_0x12ee3d['actionButtons'](_0x4f7d59);_0x12ee3d['cartIsEmpty']();_0x221455&&_0x221455['lastSku']&&function(){_0x570d32=_0x36c89e[_0x3130('0x8b')]('[data-sku=\x27'+_0x221455[_0x3130('0x8c')]+'\x27]');_0x570d32['length']&&(_0x41e6de=0x0,_0x36c89e['each'](function(){var _0x221455=_0x45fb60(this);if(_0x221455['is'](_0x570d32))return!0x1;_0x41e6de+=_0x221455[_0x3130('0x8d')]();}),_0x12ee3d[_0x3130('0x43')](void 0x0,void 0x0,_0x41e6de,_0x4f7d59[_0x3130('0x38')](_0x4f7d59['parent']())),_0x36c89e[_0x3130('0x39')](_0x3130('0x8e')),function(_0x20657d){_0x20657d[_0x3130('0x74')]('qd-ddc-lastAdded');_0x20657d[_0x3130('0x74')](_0x3130('0x8e'));setTimeout(function(){_0x20657d[_0x3130('0x39')](_0x3130('0x8f'));},_0x18258b[_0x3130('0x69')]);}(_0x570d32),_0x45fb60(document[_0x3130('0x3e')])['addClass'](_0x3130('0x90')),setTimeout(function(){_0x45fb60(document[_0x3130('0x3e')])[_0x3130('0x39')]('qd-ddc-product-add-time-v2');},_0x18258b[_0x3130('0x69')]));}();});(function(){_QuatroDigital_DropDown[_0x3130('0x6a')]['items'][_0x3130('0x24')]?(_0x45fb60('body')[_0x3130('0x39')](_0x3130('0x91'))['addClass'](_0x3130('0x92')),setTimeout(function(){_0x45fb60(_0x3130('0x3e'))[_0x3130('0x39')](_0x3130('0x93'));},_0x18258b[_0x3130('0x69')])):_0x45fb60('body')[_0x3130('0x39')]('qd-ddc-cart-rendered')[_0x3130('0x74')]('qd-ddc-cart-empty');}());_0x3130('0x6d')===typeof _0x18258b[_0x3130('0x94')]?_0x18258b[_0x3130('0x94')]['call'](this):_0x103d3f('callbackProductsList\x20não\x20é\x20uma\x20função');};_0x12ee3d['insertProdImg']=function(_0x1d17c0,_0x38ffdf,_0x31a574){function _0x160a19(){_0x38ffdf[_0x3130('0x39')]('qd-loaded')[_0x3130('0x95')](function(){_0x45fb60(this)['addClass'](_0x3130('0x96'));})[_0x3130('0x79')](_0x3130('0x97'),_0x31a574);}_0x31a574?_0x160a19():isNaN(_0x1d17c0)?_0x103d3f(_0x3130('0x98'),_0x3130('0x13')):alert(_0x3130('0x99'));};_0x12ee3d['actionButtons']=function(_0x113759){var _0x4f7d59=function(_0x252705,_0x101346){var _0x5cb6ea=_0x45fb60(_0x252705);var _0x1e2a74=_0x5cb6ea['attr'](_0x3130('0x9a'));var _0x570d32=_0x5cb6ea['attr']('data-sku-index');if(_0x1e2a74){var _0x14b99e=parseInt(_0x5cb6ea[_0x3130('0x46')]())||0x1;_0x12ee3d[_0x3130('0x9b')]([_0x1e2a74,_0x570d32],_0x14b99e,_0x14b99e+0x1,function(_0x5242bb){_0x5cb6ea[_0x3130('0x46')](_0x5242bb);_0x3130('0x6d')===typeof _0x101346&&_0x101346();});}};var _0x5e147b=function(_0x135571,_0x5d5f2f){var _0x535d60=_0x45fb60(_0x135571);var _0x570d32=_0x535d60[_0x3130('0x79')]('data-sku');var _0x3d9f1e=_0x535d60[_0x3130('0x79')]('data-sku-index');if(_0x570d32){var _0x43a23b=parseInt(_0x535d60['val']())||0x2;_0x12ee3d[_0x3130('0x9b')]([_0x570d32,_0x3d9f1e],_0x43a23b,_0x43a23b-0x1,function(_0x166379){_0x535d60[_0x3130('0x46')](_0x166379);_0x3130('0x6d')===typeof _0x5d5f2f&&_0x5d5f2f();});}};var _0x285983=function(_0x165aaf,_0x3d54c0){var _0x4f7d59=_0x45fb60(_0x165aaf);var _0x570d32=_0x4f7d59[_0x3130('0x79')]('data-sku');var _0x1f18a7=_0x4f7d59['attr'](_0x3130('0x9c'));if(_0x570d32){var _0x2baff5=parseInt(_0x4f7d59[_0x3130('0x46')]())||0x1;_0x12ee3d['changeQantity']([_0x570d32,_0x1f18a7],0x1,_0x2baff5,function(_0x35b5f9){_0x4f7d59[_0x3130('0x46')](_0x35b5f9);_0x3130('0x6d')===typeof _0x3d54c0&&_0x3d54c0();});}};var _0x570d32=_0x113759['find'](_0x3130('0x9d'));_0x570d32[_0x3130('0x74')]('qd_on')['each'](function(){var _0x113759=_0x45fb60(this);_0x113759[_0x3130('0x3f')](_0x3130('0x9e'))['on'](_0x3130('0x9f'),function(_0x2f5bd7){_0x2f5bd7[_0x3130('0xa0')]();_0x570d32[_0x3130('0x74')](_0x3130('0xa1'));_0x4f7d59(_0x113759['find'](_0x3130('0x80')),function(){_0x570d32[_0x3130('0x39')]('qd-loading');});});_0x113759[_0x3130('0x3f')]('.qd-ddc-quantityMinus')['on'](_0x3130('0xa2'),function(_0x47a2ad){_0x47a2ad[_0x3130('0xa0')]();_0x570d32[_0x3130('0x74')]('qd-loading');_0x5e147b(_0x113759['find'](_0x3130('0x80')),function(){_0x570d32[_0x3130('0x39')](_0x3130('0xa1'));});});_0x113759[_0x3130('0x3f')](_0x3130('0x80'))['on'](_0x3130('0xa3'),function(){_0x570d32[_0x3130('0x74')](_0x3130('0xa1'));_0x285983(this,function(){_0x570d32[_0x3130('0x39')](_0x3130('0xa1'));});});_0x113759[_0x3130('0x3f')]('.qd-ddc-quantity')['on'](_0x3130('0xa4'),function(_0xf0d415){0xd==_0xf0d415[_0x3130('0x3d')]&&(_0x570d32[_0x3130('0x74')](_0x3130('0xa1')),_0x285983(this,function(){_0x570d32[_0x3130('0x39')](_0x3130('0xa1'));}));});});_0x113759[_0x3130('0x3f')](_0x3130('0xa5'))[_0x3130('0x5e')](function(){var _0x113759=_0x45fb60(this);_0x113759[_0x3130('0x3f')]('.qd-ddc-remove')['on'](_0x3130('0xa6'),function(){_0x113759[_0x3130('0x74')](_0x3130('0xa1'));_0x12ee3d[_0x3130('0xa7')](_0x45fb60(this),function(_0x17f4ae){_0x17f4ae?_0x113759[_0x3130('0xa8')](!0x0)['slideUp'](function(){_0x113759[_0x3130('0xa9')]();_0x12ee3d[_0x3130('0x4c')]();}):_0x113759['removeClass']('qd-loading');});return!0x1;});});};_0x12ee3d[_0x3130('0xaa')]=function(_0x433438){var _0x4ec62f=_0x433438[_0x3130('0x46')]();_0x4ec62f=_0x4ec62f[_0x3130('0x2')](/[^0-9\-]/g,'');_0x4ec62f=_0x4ec62f[_0x3130('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x3130('0xab'));_0x4ec62f=_0x4ec62f[_0x3130('0x2')](/(.{9}).*/g,'$1');_0x433438[_0x3130('0x46')](_0x4ec62f);0x9<=_0x4ec62f['length']&&(_0x433438[_0x3130('0xac')]('qdDdcLastPostalCode')!=_0x4ec62f&&_0x4f795e[_0x3130('0xad')]({'postalCode':_0x4ec62f,'country':_0x3130('0xae')})[_0x3130('0xaf')](function(_0x3294d5){window[_0x3130('0x18')][_0x3130('0x6a')]=_0x3294d5;_0x12ee3d[_0x3130('0x4a')]();})[_0x3130('0xb0')](function(_0x18c16a){_0x103d3f([_0x3130('0xb1'),_0x18c16a]);updateCartData();}),_0x433438[_0x3130('0xac')](_0x3130('0xb2'),_0x4ec62f));};_0x12ee3d[_0x3130('0x9b')]=function(_0x380141,_0x46d30c,_0x255f4b,_0x4df644){function _0x5afa3b(_0x55895d){_0x55895d=_0x3130('0xb3')!==typeof _0x55895d?!0x1:_0x55895d;_0x12ee3d[_0x3130('0x4a')]();window[_0x3130('0x18')][_0x3130('0x19')]=!0x1;_0x12ee3d[_0x3130('0x4c')]();_0x3130('0x4')!==typeof window[_0x3130('0x6b')]&&_0x3130('0x6d')===typeof window[_0x3130('0x6b')][_0x3130('0x6c')]&&window['_QuatroDigital_AmountProduct'][_0x3130('0x6c')]['call'](this);_0x3130('0x6d')===typeof adminCart&&adminCart();_0x45fb60['fn'][_0x3130('0x4b')](!0x0,void 0x0,_0x55895d);_0x3130('0x6d')===typeof _0x4df644&&_0x4df644(_0x46d30c);}_0x255f4b=_0x255f4b||0x1;if(0x1>_0x255f4b)return _0x46d30c;if(_0x18258b['smartCheckout']){if(_0x3130('0x4')===typeof window['_QuatroDigital_DropDown']['getOrderForm'][_0x3130('0x6f')][_0x380141[0x1]])return _0x103d3f(_0x3130('0xb4')+_0x380141[0x1]+']'),_0x46d30c;window[_0x3130('0x18')][_0x3130('0x6a')][_0x3130('0x6f')][_0x380141[0x1]]['quantity']=_0x255f4b;window[_0x3130('0x18')][_0x3130('0x6a')]['items'][_0x380141[0x1]][_0x3130('0xb5')]=_0x380141[0x1];_0x4f795e['updateItems']([window[_0x3130('0x18')]['getOrderForm'][_0x3130('0x6f')][_0x380141[0x1]]],[_0x3130('0x6f'),_0x3130('0x70'),'shippingData'])[_0x3130('0xaf')](function(_0x1f7eb2){window[_0x3130('0x18')][_0x3130('0x6a')]=_0x1f7eb2;_0x5afa3b(!0x0);})[_0x3130('0xb0')](function(_0x1c6f07){_0x103d3f([_0x3130('0xb6'),_0x1c6f07]);_0x5afa3b();});}else _0x103d3f(_0x3130('0xb7'));};_0x12ee3d[_0x3130('0xa7')]=function(_0x47f885,_0x1601fa){function _0x2ff497(_0x3fa664){_0x3fa664=_0x3130('0xb3')!==typeof _0x3fa664?!0x1:_0x3fa664;'undefined'!==typeof window[_0x3130('0x6b')]&&_0x3130('0x6d')===typeof window[_0x3130('0x6b')][_0x3130('0x6c')]&&window['_QuatroDigital_AmountProduct'][_0x3130('0x6c')][_0x3130('0x5f')](this);'function'===typeof adminCart&&adminCart();_0x45fb60['fn'][_0x3130('0x4b')](!0x0,void 0x0,_0x3fa664);_0x3130('0x6d')===typeof _0x1601fa&&_0x1601fa(_0x570d32);}var _0x570d32=!0x1,_0x5b85d8=_0x45fb60(_0x47f885)[_0x3130('0x79')](_0x3130('0x9c'));if(_0x18258b[_0x3130('0x2d')]){if('undefined'===typeof window['_QuatroDigital_DropDown'][_0x3130('0x6a')][_0x3130('0x6f')][_0x5b85d8])return _0x103d3f(_0x3130('0xb4')+_0x5b85d8+']'),_0x570d32;window[_0x3130('0x18')]['getOrderForm']['items'][_0x5b85d8][_0x3130('0xb5')]=_0x5b85d8;_0x4f795e[_0x3130('0xb8')]([window[_0x3130('0x18')][_0x3130('0x6a')][_0x3130('0x6f')][_0x5b85d8]],[_0x3130('0x6f'),'totalizers',_0x3130('0x88')])['done'](function(_0x53efe6){_0x570d32=!0x0;window['_QuatroDigital_DropDown'][_0x3130('0x6a')]=_0x53efe6;_0x59eee7(_0x53efe6);_0x2ff497(!0x0);})[_0x3130('0xb0')](function(_0x1e1c31){_0x103d3f([_0x3130('0xb9'),_0x1e1c31]);_0x2ff497();});}else alert('Atenção,\x20este\x20método\x20esta\x20descontinuado.');};_0x12ee3d[_0x3130('0x43')]=function(_0x54176e,_0xf8c535,_0x1e22c5,_0x12a87b){_0x12a87b=_0x12a87b||_0x45fb60(_0x3130('0xba'));_0x54176e=_0x54176e||'+';_0xf8c535=_0xf8c535||0.9*_0x12a87b[_0x3130('0xbb')]();_0x12a87b[_0x3130('0xa8')](!0x0,!0x0)[_0x3130('0xbc')]({'scrollTop':isNaN(_0x1e22c5)?_0x54176e+'='+_0xf8c535+'px':_0x1e22c5});};_0x18258b[_0x3130('0x48')]||(_0x12ee3d[_0x3130('0x4a')](),_0x45fb60['fn'][_0x3130('0x4b')](!0x0));_0x45fb60(window)['on'](_0x3130('0xbd'),function(){try{window['_QuatroDigital_DropDown'][_0x3130('0x6a')]=void 0x0,_0x12ee3d[_0x3130('0x4a')]();}catch(_0x348751){_0x103d3f(_0x3130('0xbe')+_0x348751[_0x3130('0xf')],'avisso');}});_0x3130('0x6d')===typeof _0x18258b[_0x3130('0xb')]?_0x18258b[_0x3130('0xb')][_0x3130('0x5f')](this):_0x103d3f(_0x3130('0xbf'));};_0x45fb60['fn'][_0x3130('0x1a')]=function(_0x36adcb){var _0x1eaeba=_0x45fb60(this);_0x1eaeba['fn']=new _0x45fb60[(_0x3130('0x1a'))](this,_0x36adcb);return _0x1eaeba;};}catch(_0x8994e7){'undefined'!==typeof console&&'function'===typeof console['error']&&console['error'](_0x3130('0xe'),_0x8994e7);}}(this));(function(_0x48a583){try{var _0xe983ff=jQuery;window[_0x3130('0x6b')]=window[_0x3130('0x6b')]||{};window[_0x3130('0x6b')][_0x3130('0x6f')]={};window[_0x3130('0x6b')][_0x3130('0xc0')]=!0x1;window[_0x3130('0x6b')][_0x3130('0xc1')]=!0x1;window[_0x3130('0x6b')][_0x3130('0xc2')]=!0x1;var _0x3c9f54=function(){if(window[_0x3130('0x6b')][_0x3130('0xc0')]){var _0x8ebfa=!0x1;var _0x470d3d={};window[_0x3130('0x6b')][_0x3130('0x6f')]={};for(_0x39bc7a in window['_QuatroDigital_DropDown'][_0x3130('0x6a')][_0x3130('0x6f')])if(_0x3130('0x10')===typeof window[_0x3130('0x18')][_0x3130('0x6a')][_0x3130('0x6f')][_0x39bc7a]){var _0x5ac4fd=window[_0x3130('0x18')][_0x3130('0x6a')]['items'][_0x39bc7a];_0x3130('0x4')!==typeof _0x5ac4fd[_0x3130('0xc3')]&&null!==_0x5ac4fd[_0x3130('0xc3')]&&''!==_0x5ac4fd[_0x3130('0xc3')]&&(window[_0x3130('0x6b')][_0x3130('0x6f')][_0x3130('0xc4')+_0x5ac4fd[_0x3130('0xc3')]]=window[_0x3130('0x6b')]['items'][_0x3130('0xc4')+_0x5ac4fd[_0x3130('0xc3')]]||{},window[_0x3130('0x6b')][_0x3130('0x6f')][_0x3130('0xc4')+_0x5ac4fd[_0x3130('0xc3')]][_0x3130('0xc5')]=_0x5ac4fd[_0x3130('0xc3')],_0x470d3d[_0x3130('0xc4')+_0x5ac4fd[_0x3130('0xc3')]]||(window['_QuatroDigital_AmountProduct'][_0x3130('0x6f')][_0x3130('0xc4')+_0x5ac4fd[_0x3130('0xc3')]][_0x3130('0xc6')]=0x0),window[_0x3130('0x6b')][_0x3130('0x6f')][_0x3130('0xc4')+_0x5ac4fd[_0x3130('0xc3')]][_0x3130('0xc6')]+=_0x5ac4fd[_0x3130('0x81')],_0x8ebfa=!0x0,_0x470d3d[_0x3130('0xc4')+_0x5ac4fd[_0x3130('0xc3')]]=!0x0);}var _0x39bc7a=_0x8ebfa;}else _0x39bc7a=void 0x0;window[_0x3130('0x6b')][_0x3130('0xc0')]&&(_0xe983ff(_0x3130('0xc7'))['remove'](),_0xe983ff(_0x3130('0xc8'))[_0x3130('0x39')]('qd-bap-item-added'));for(var _0x4c04ea in window['_QuatroDigital_AmountProduct'][_0x3130('0x6f')]){_0x5ac4fd=window[_0x3130('0x6b')][_0x3130('0x6f')][_0x4c04ea];if(_0x3130('0x10')!==typeof _0x5ac4fd)return;_0x470d3d=_0xe983ff('input.qd-productId[value='+_0x5ac4fd[_0x3130('0xc5')]+']')[_0x3130('0x0')]('li');if(window[_0x3130('0x6b')][_0x3130('0xc0')]||!_0x470d3d[_0x3130('0x3f')]('.qd-bap-wrapper')['length'])_0x8ebfa=_0xe983ff(_0x3130('0xc9')),_0x8ebfa[_0x3130('0x3f')](_0x3130('0xca'))[_0x3130('0x56')](_0x5ac4fd['qtt']),_0x5ac4fd=_0x470d3d[_0x3130('0x3f')](_0x3130('0xcb')),_0x5ac4fd['length']?_0x5ac4fd[_0x3130('0xcc')](_0x8ebfa)['addClass'](_0x3130('0xcd')):_0x470d3d['prepend'](_0x8ebfa);}_0x39bc7a&&(window[_0x3130('0x6b')][_0x3130('0xc0')]=!0x1);};window[_0x3130('0x6b')][_0x3130('0x6c')]=function(){window['_QuatroDigital_AmountProduct'][_0x3130('0xc0')]=!0x0;_0x3c9f54['call'](this);};_0xe983ff(document)['ajaxStop'](function(){_0x3c9f54['call'](this);});}catch(_0x3dd0f9){_0x3130('0x4')!==typeof console&&'function'===typeof console[_0x3130('0xd')]&&console[_0x3130('0xd')](_0x3130('0xe'),_0x3dd0f9);}}(this));(function(){try{var _0x536bdb=jQuery,_0x19da4b,_0x45c8b5={'selector':_0x3130('0xce'),'dropDown':{},'buyButton':{}};_0x536bdb[_0x3130('0xcf')]=function(_0x5e5b71){var _0x595841={};_0x19da4b=_0x536bdb[_0x3130('0xd0')](!0x0,{},_0x45c8b5,_0x5e5b71);_0x5e5b71=_0x536bdb(_0x19da4b[_0x3130('0xd1')])[_0x3130('0x1a')](_0x19da4b['dropDown']);_0x595841['buyButton']=_0x3130('0x4')!==typeof _0x19da4b[_0x3130('0xd2')][_0x3130('0x48')]&&!0x1===_0x19da4b[_0x3130('0xd2')][_0x3130('0x48')]?_0x536bdb(_0x19da4b[_0x3130('0xd1')])[_0x3130('0xd3')](_0x5e5b71['fn'],_0x19da4b[_0x3130('0xd4')]):_0x536bdb(_0x19da4b['selector'])[_0x3130('0xd3')](_0x19da4b['buyButton']);_0x595841[_0x3130('0xd2')]=_0x5e5b71;return _0x595841;};_0x536bdb['fn'][_0x3130('0xd5')]=function(){_0x3130('0x10')===typeof console&&_0x3130('0x6d')===typeof console[_0x3130('0x16')]&&console[_0x3130('0x16')](_0x3130('0xd6'));};_0x536bdb[_0x3130('0xd5')]=_0x536bdb['fn'][_0x3130('0xd5')];}catch(_0x3ca3e1){_0x3130('0x4')!==typeof console&&_0x3130('0x6d')===typeof console[_0x3130('0xd')]&&console['error'](_0x3130('0xe'),_0x3ca3e1);}}());

/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

var _0x4f81=['scroll','trigger','QD_smartImageLoad','function','henzntvn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','join','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','object','undefined','info','warn','unshift','alerta','aviso','toLowerCase','apply','error','.qd_sil_img_wrapper','300','QD_SIL_scroll\x20QuatroDigital.is_Callback','find','not','length','scrollTop','top','first','height','clone','load','qd-sil-image-loaded','attr','src','sizes','width','insertAfter','qd-sil-on','offset','bottom','QD_SIL_scrollRange'];(function(_0x5e6671,_0x5a8451){var _0x5a7fb8=function(_0x4dc42d){while(--_0x4dc42d){_0x5e6671['push'](_0x5e6671['shift']());}};_0x5a7fb8(++_0x5a8451);}(_0x4f81,0x14b));var _0x14f8=function(_0xee4668,_0x42d912){_0xee4668=_0xee4668-0x0;var _0x407d17=_0x4f81[_0xee4668];return _0x407d17;};(function(_0x2ac230){'use strict';var _0x3bd417=jQuery;if(typeof _0x3bd417['fn'][_0x14f8('0x0')]===_0x14f8('0x1'))return;_0x3bd417['fn'][_0x14f8('0x0')]=function(){};var _0x3669f8=function(_0x35e59a){var _0x43d36d={'c':_0x14f8('0x2')};return function(_0x57a86b){var _0x45427d,_0x22ef64,_0x145e78,_0xb8c8dd;_0x22ef64=function(_0x263fd0){return _0x263fd0;};_0x145e78=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x57a86b=_0x57a86b['d'+_0x145e78[0x10]+'c'+_0x145e78[0x11]+'m'+_0x22ef64(_0x145e78[0x1])+'n'+_0x145e78[0xd]]['l'+_0x145e78[0x12]+'c'+_0x145e78[0x0]+'ti'+_0x22ef64('o')+'n'];_0x45427d=function(_0x24f3e5){return escape(encodeURIComponent(_0x24f3e5[_0x14f8('0x3')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x4c37d7){return String[_0x14f8('0x4')](('Z'>=_0x4c37d7?0x5a:0x7a)>=(_0x4c37d7=_0x4c37d7[_0x14f8('0x5')](0x0)+0xd)?_0x4c37d7:_0x4c37d7-0x1a);})));};var _0xd00087=_0x45427d(_0x57a86b[[_0x145e78[0x9],_0x22ef64('o'),_0x145e78[0xc],_0x145e78[_0x22ef64(0xd)]]['join']('')]);_0x45427d=_0x45427d((window[['js',_0x22ef64('no'),'m',_0x145e78[0x1],_0x145e78[0x4][_0x14f8('0x6')](),'ite'][_0x14f8('0x7')]('')]||_0x14f8('0x8'))+['.v',_0x145e78[0xd],'e',_0x22ef64('x'),'co',_0x22ef64('mm'),_0x14f8('0x9'),_0x145e78[0x1],'.c',_0x22ef64('o'),'m.',_0x145e78[0x13],'r'][_0x14f8('0x7')](''));for(var _0x570adb in _0x43d36d){if(_0x45427d===_0x570adb+_0x43d36d[_0x570adb]||_0xd00087===_0x570adb+_0x43d36d[_0x570adb]){_0xb8c8dd='tr'+_0x145e78[0x11]+'e';break;}_0xb8c8dd='f'+_0x145e78[0x0]+'ls'+_0x22ef64(_0x145e78[0x1])+'';}_0x22ef64=!0x1;-0x1<_0x57a86b[[_0x145e78[0xc],'e',_0x145e78[0x0],'rc',_0x145e78[0x9]][_0x14f8('0x7')]('')][_0x14f8('0xa')](_0x14f8('0xb'))&&(_0x22ef64=!0x0);return[_0xb8c8dd,_0x22ef64];}(_0x35e59a);}(window);if(!eval(_0x3669f8[0x0]))return _0x3669f8[0x1]?_0x358a49(_0x14f8('0xc')):!0x1;var _0x342699='Quatro\x20Digital\x20-\x20Smart\x20Image\x20Load';var _0x358a49=function(_0x4eb2d0,_0x4d57cf){if(_0x14f8('0xd')===typeof console&&'undefined'!==typeof console['error']&&_0x14f8('0xe')!==typeof console[_0x14f8('0xf')]&&'undefined'!==typeof console[_0x14f8('0x10')]){if(_0x14f8('0xd')==typeof _0x4eb2d0&&_0x14f8('0x1')==typeof _0x4eb2d0['unshift']){_0x4eb2d0[_0x14f8('0x11')]('['+_0x342699+']\x0a');var _0x3db4e7=_0x4eb2d0;}else _0x3db4e7=['['+_0x342699+']\x0a',_0x4eb2d0];if(_0x14f8('0xe')==typeof _0x4d57cf||_0x14f8('0x12')!==_0x4d57cf['toLowerCase']()&&_0x14f8('0x13')!==_0x4d57cf['toLowerCase']())if(_0x14f8('0xe')!=typeof _0x4d57cf&&'info'==_0x4d57cf[_0x14f8('0x14')]())try{console['info'][_0x14f8('0x15')](console,_0x3db4e7);}catch(_0x49eb3c){try{console[_0x14f8('0xf')](_0x3db4e7['join']('\x0a'));}catch(_0x54ba99){}}else try{console[_0x14f8('0x16')]['apply'](console,_0x3db4e7);}catch(_0x3b751d){try{console[_0x14f8('0x16')](_0x3db4e7['join']('\x0a'));}catch(_0x40b6e4){}}else try{console[_0x14f8('0x10')][_0x14f8('0x15')](console,_0x3db4e7);}catch(_0x10b755){try{console[_0x14f8('0x10')](_0x3db4e7[_0x14f8('0x7')]('\x0a'));}catch(_0x480f5){}}}};var _0x5533c3=/(ids\/[0-9]+-)[0-9-]+/i;var _0x24f37c={'imageWrapper':_0x14f8('0x17'),'sizes':{'width':'300','height':_0x14f8('0x18')}};var _0x5e3939=function(_0x33fa22,_0x2bc61d){'use strict';_0x44ce5f();_0x3bd417(window)['on'](_0x14f8('0x19'),_0x44ce5f);function _0x44ce5f(){try{var _0x4c573a=_0x33fa22[_0x14f8('0x1a')](_0x2bc61d['imageWrapper'])[_0x14f8('0x1b')]('.qd-sil-on')[_0x14f8('0x1a')]('img:visible');if(!_0x4c573a[_0x14f8('0x1c')])return;var _0x525ce9=_0x3bd417(window);var _0x3d4a32={'top':_0x525ce9[_0x14f8('0x1d')]()};_0x3d4a32['bottom']=_0x3d4a32[_0x14f8('0x1e')]+_0x525ce9['height']();var _0x5bcdf4=_0x4c573a[_0x14f8('0x1f')]()[_0x14f8('0x20')]();var _0x24dbaa=_0x5c7d87(_0x4c573a,_0x3d4a32,_0x5bcdf4);for(var _0x5de599=0x0;_0x5de599<_0x24dbaa[_0x14f8('0x1c')];_0x5de599++)_0x2cb601(_0x3bd417(_0x24dbaa[_0x5de599]));}catch(_0x347a6b){typeof console!==_0x14f8('0xe')&&typeof console[_0x14f8('0x16')]==='function'&&console[_0x14f8('0x16')]('Problemas\x20:(\x20.\x20Detalhes:\x20',_0x347a6b);}}function _0x2cb601(_0x26cf33){var _0x544c64=_0x26cf33[_0x14f8('0x21')]();_0x544c64['on'](_0x14f8('0x22'),function(){_0x3bd417(this)['addClass'](_0x14f8('0x23'));});_0x544c64[_0x14f8('0x24')]({'src':_0x544c64[0x0][_0x14f8('0x25')]['replace'](_0x5533c3,'$1'+_0x2bc61d[_0x14f8('0x26')][_0x14f8('0x27')]+'-'+_0x2bc61d[_0x14f8('0x26')][_0x14f8('0x20')]),'width':_0x2bc61d[_0x14f8('0x26')][_0x14f8('0x27')],'height':_0x2bc61d[_0x14f8('0x26')][_0x14f8('0x20')]});_0x544c64['addClass']('qd-sil-image')[_0x14f8('0x28')](_0x26cf33);_0x544c64['closest'](_0x2bc61d['imageWrapper'])['addClass'](_0x14f8('0x29'));}function _0x5c7d87(_0x3a9775,_0x418556,_0x2e8be1){var _0x5534f7;var _0x1ea5d4=[];for(var _0x196fb0=0x0;_0x196fb0<_0x3a9775['length'];_0x196fb0++){_0x5534f7=_0x3bd417(_0x3a9775[_0x196fb0])[_0x14f8('0x2a')]();_0x5534f7[_0x14f8('0x2b')]=_0x5534f7[_0x14f8('0x1e')]+_0x2e8be1;if(!(_0x418556[_0x14f8('0x2b')]<_0x5534f7['top']||_0x418556[_0x14f8('0x1e')]>_0x5534f7['bottom'])){_0x1ea5d4['push'](_0x3a9775[_0x196fb0]);}}return _0x1ea5d4;};};_0x3bd417['fn'][_0x14f8('0x0')]=function(_0x3f92b4){var _0x5228aa=_0x3bd417(this);if(!_0x5228aa[_0x14f8('0x1c')])return _0x5228aa;_0x5228aa['each'](function(){var _0x15df2a=_0x3bd417(this);_0x15df2a[_0x14f8('0x0')]=new _0x5e3939(_0x15df2a,_0x3bd417['extend']({},_0x24f37c,_0x3f92b4));});return _0x5228aa;};window[_0x14f8('0x2c')]=0x28;var _0x34547c=QD_SIL_scrollRange;var _0x27502c=0x0;_0x3bd417(window)['on'](_0x14f8('0x2d'),function(){var _0x504345=document['documentElement'][_0x14f8('0x1d')];if(_0x504345>_0x27502c+_0x34547c||_0x504345<_0x27502c-_0x34547c){_0x3bd417(window)[_0x14f8('0x2e')]('QD_SIL_scroll');_0x27502c=_0x504345;}});}(this));

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