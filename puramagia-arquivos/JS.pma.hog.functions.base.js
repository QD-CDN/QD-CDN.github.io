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
			Product.accessoriesFix();
			Product.accessoriesApplyCarousel();
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
var _0x7dc0=['skus','split','length','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','trigger','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','off','vtex.sku.selected.QD','qd-ssa-sku-prod-unavailable','henzntvn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','join','toUpperCase','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','initialSkuSelected','prod','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','QuatroDigital.ssa.prodUnavailable','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','available','unavailable','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','function','qdAjax','qdAjaxQueue','extend','opts','push','call','error','complete','parameters','callbackFns','successPopulated','boolean','errorPopulated','completePopulated','success','object','jqXHR','clearQueueDelay','undefined','ajax','readyState','data','textStatus','errorThrown','version','/produto/sku/','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','QD_smartStockAvailable','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','toLowerCase','aviso','info','apply','warn','removeClass','qd-ssa-sku-no-selected','addClass','qd-ssa-sku-selected','SkuSellersInformation','data-qd-ssa-qtt','each','find','[data-qd-ssa-text]','hide','qd-ssa-hide','qd-ssa-show','[data-qd-ssa-text=\x22','html','replace','show','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','message','qd-ssa-on'];(function(_0x3beff9,_0x4e4c58){var _0x52a1a5=function(_0x419086){while(--_0x419086){_0x3beff9['push'](_0x3beff9['shift']());}};_0x52a1a5(++_0x4e4c58);}(_0x7dc0,0x73));var _0x07dc=function(_0x481666,_0x5d243c){_0x481666=_0x481666-0x0;var _0x44a45d=_0x7dc0[_0x481666];return _0x44a45d;};(function(_0x500cb9){if(_0x07dc('0x0')!==typeof _0x500cb9[_0x07dc('0x1')]){var _0x1bc19e={};_0x500cb9[_0x07dc('0x2')]=_0x1bc19e;_0x500cb9['qdAjax']=function(_0x32bfdb){var _0x4f509a=_0x500cb9[_0x07dc('0x3')]({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x32bfdb);var _0x2e1397=escape(encodeURIComponent(_0x4f509a['url']));_0x1bc19e[_0x2e1397]=_0x1bc19e[_0x2e1397]||{};_0x1bc19e[_0x2e1397]['opts']=_0x1bc19e[_0x2e1397][_0x07dc('0x4')]||[];_0x1bc19e[_0x2e1397][_0x07dc('0x4')][_0x07dc('0x5')]({'success':function(_0xf98bad,_0x5e393e,_0x475479){_0x4f509a['success'][_0x07dc('0x6')](this,_0xf98bad,_0x5e393e,_0x475479);},'error':function(_0x17b049,_0x7967de,_0x51c7d1){_0x4f509a[_0x07dc('0x7')][_0x07dc('0x6')](this,_0x17b049,_0x7967de,_0x51c7d1);},'complete':function(_0x1fa627,_0x370308){_0x4f509a[_0x07dc('0x8')]['call'](this,_0x1fa627,_0x370308);}});_0x1bc19e[_0x2e1397]['parameters']=_0x1bc19e[_0x2e1397][_0x07dc('0x9')]||{'success':{},'error':{},'complete':{}};_0x1bc19e[_0x2e1397][_0x07dc('0xa')]=_0x1bc19e[_0x2e1397][_0x07dc('0xa')]||{};_0x1bc19e[_0x2e1397]['callbackFns']['successPopulated']='boolean'===typeof _0x1bc19e[_0x2e1397]['callbackFns']['successPopulated']?_0x1bc19e[_0x2e1397][_0x07dc('0xa')][_0x07dc('0xb')]:!0x1;_0x1bc19e[_0x2e1397]['callbackFns']['errorPopulated']=_0x07dc('0xc')===typeof _0x1bc19e[_0x2e1397][_0x07dc('0xa')][_0x07dc('0xd')]?_0x1bc19e[_0x2e1397][_0x07dc('0xa')]['errorPopulated']:!0x1;_0x1bc19e[_0x2e1397][_0x07dc('0xa')][_0x07dc('0xe')]='boolean'===typeof _0x1bc19e[_0x2e1397][_0x07dc('0xa')][_0x07dc('0xe')]?_0x1bc19e[_0x2e1397][_0x07dc('0xa')][_0x07dc('0xe')]:!0x1;_0x32bfdb=_0x500cb9['extend']({},_0x4f509a,{'success':function(_0xf37b6a,_0x16c395,_0x7e1910){_0x1bc19e[_0x2e1397][_0x07dc('0x9')][_0x07dc('0xf')]={'data':_0xf37b6a,'textStatus':_0x16c395,'jqXHR':_0x7e1910};_0x1bc19e[_0x2e1397][_0x07dc('0xa')][_0x07dc('0xb')]=!0x0;for(var _0x6716ca in _0x1bc19e[_0x2e1397][_0x07dc('0x4')])_0x07dc('0x10')===typeof _0x1bc19e[_0x2e1397]['opts'][_0x6716ca]&&(_0x1bc19e[_0x2e1397][_0x07dc('0x4')][_0x6716ca][_0x07dc('0xf')][_0x07dc('0x6')](this,_0xf37b6a,_0x16c395,_0x7e1910),_0x1bc19e[_0x2e1397][_0x07dc('0x4')][_0x6716ca][_0x07dc('0xf')]=function(){});},'error':function(_0x1b62b9,_0x3ef609,_0x4cea82){_0x1bc19e[_0x2e1397][_0x07dc('0x9')][_0x07dc('0x7')]={'errorThrown':_0x4cea82,'textStatus':_0x3ef609,'jqXHR':_0x1b62b9};_0x1bc19e[_0x2e1397][_0x07dc('0xa')][_0x07dc('0xd')]=!0x0;for(var _0xa30816 in _0x1bc19e[_0x2e1397][_0x07dc('0x4')])_0x07dc('0x10')===typeof _0x1bc19e[_0x2e1397][_0x07dc('0x4')][_0xa30816]&&(_0x1bc19e[_0x2e1397][_0x07dc('0x4')][_0xa30816]['error'][_0x07dc('0x6')](this,_0x1b62b9,_0x3ef609,_0x4cea82),_0x1bc19e[_0x2e1397]['opts'][_0xa30816][_0x07dc('0x7')]=function(){});},'complete':function(_0xbaf295,_0x4f043e){_0x1bc19e[_0x2e1397][_0x07dc('0x9')]['complete']={'textStatus':_0x4f043e,'jqXHR':_0xbaf295};_0x1bc19e[_0x2e1397]['callbackFns'][_0x07dc('0xe')]=!0x0;for(var _0x288377 in _0x1bc19e[_0x2e1397][_0x07dc('0x4')])'object'===typeof _0x1bc19e[_0x2e1397][_0x07dc('0x4')][_0x288377]&&(_0x1bc19e[_0x2e1397][_0x07dc('0x4')][_0x288377]['complete'][_0x07dc('0x6')](this,_0xbaf295,_0x4f043e),_0x1bc19e[_0x2e1397][_0x07dc('0x4')][_0x288377][_0x07dc('0x8')]=function(){});isNaN(parseInt(_0x4f509a['clearQueueDelay']))||setTimeout(function(){_0x1bc19e[_0x2e1397][_0x07dc('0x11')]=void 0x0;_0x1bc19e[_0x2e1397][_0x07dc('0x4')]=void 0x0;_0x1bc19e[_0x2e1397][_0x07dc('0x9')]=void 0x0;_0x1bc19e[_0x2e1397][_0x07dc('0xa')]=void 0x0;},_0x4f509a[_0x07dc('0x12')]);}});_0x07dc('0x13')===typeof _0x1bc19e[_0x2e1397]['jqXHR']?_0x1bc19e[_0x2e1397]['jqXHR']=_0x500cb9[_0x07dc('0x14')](_0x32bfdb):_0x1bc19e[_0x2e1397][_0x07dc('0x11')]&&_0x1bc19e[_0x2e1397]['jqXHR'][_0x07dc('0x15')]&&0x4==_0x1bc19e[_0x2e1397]['jqXHR'][_0x07dc('0x15')]&&(_0x1bc19e[_0x2e1397][_0x07dc('0xa')]['successPopulated']&&_0x32bfdb['success'](_0x1bc19e[_0x2e1397][_0x07dc('0x9')][_0x07dc('0xf')][_0x07dc('0x16')],_0x1bc19e[_0x2e1397][_0x07dc('0x9')][_0x07dc('0xf')][_0x07dc('0x17')],_0x1bc19e[_0x2e1397]['parameters'][_0x07dc('0xf')][_0x07dc('0x11')]),_0x1bc19e[_0x2e1397][_0x07dc('0xa')][_0x07dc('0xd')]&&_0x32bfdb[_0x07dc('0x7')](_0x1bc19e[_0x2e1397][_0x07dc('0x9')]['error'][_0x07dc('0x11')],_0x1bc19e[_0x2e1397][_0x07dc('0x9')][_0x07dc('0x7')][_0x07dc('0x17')],_0x1bc19e[_0x2e1397]['parameters'][_0x07dc('0x7')][_0x07dc('0x18')]),_0x1bc19e[_0x2e1397][_0x07dc('0xa')][_0x07dc('0xe')]&&_0x32bfdb[_0x07dc('0x8')](_0x1bc19e[_0x2e1397][_0x07dc('0x9')][_0x07dc('0x8')]['jqXHR'],_0x1bc19e[_0x2e1397][_0x07dc('0x9')]['complete'][_0x07dc('0x17')]));};_0x500cb9[_0x07dc('0x1')][_0x07dc('0x19')]='2.1';}}(jQuery));(function(_0x484202){function _0x3cc199(_0x3fa90c,_0x5e7c20){_0x47f8af[_0x07dc('0x1')]({'url':_0x07dc('0x1a')+_0x3fa90c,'clearQueueDelay':null,'success':_0x5e7c20,'error':function(){_0x3b8c27(_0x07dc('0x1b'));}});}var _0x47f8af=jQuery;if(_0x07dc('0x0')!==typeof _0x47f8af['fn'][_0x07dc('0x1c')]){var _0x3b8c27=function(_0x486ff8,_0x1fed4e){if('object'===typeof console){var _0x1e4670;'object'===typeof _0x486ff8?(_0x486ff8[_0x07dc('0x1d')]('[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a'),_0x1e4670=_0x486ff8):_0x1e4670=[_0x07dc('0x1e')+_0x486ff8];'undefined'===typeof _0x1fed4e||'alerta'!==_0x1fed4e[_0x07dc('0x1f')]()&&_0x07dc('0x20')!==_0x1fed4e[_0x07dc('0x1f')]()?_0x07dc('0x13')!==typeof _0x1fed4e&&_0x07dc('0x21')===_0x1fed4e[_0x07dc('0x1f')]()?console[_0x07dc('0x21')][_0x07dc('0x22')](console,_0x1e4670):console['error'][_0x07dc('0x22')](console,_0x1e4670):console[_0x07dc('0x23')]['apply'](console,_0x1e4670);}},_0x288227={},_0x1dea8b=function(_0x50515b,_0x897e23){function _0x3db094(_0x2ec811){try{_0x50515b[_0x07dc('0x24')](_0x07dc('0x25'))[_0x07dc('0x26')](_0x07dc('0x27'));var _0x5db169=_0x2ec811[0x0][_0x07dc('0x28')][0x0]['AvailableQuantity'];_0x50515b['attr'](_0x07dc('0x29'),_0x5db169);_0x50515b[_0x07dc('0x2a')](function(){var _0x50515b=_0x47f8af(this)[_0x07dc('0x2b')](_0x07dc('0x2c'));if(0x1>_0x5db169)return _0x50515b[_0x07dc('0x2d')]()[_0x07dc('0x26')](_0x07dc('0x2e'))[_0x07dc('0x24')](_0x07dc('0x2f'));var _0x2ec811=_0x50515b['filter'](_0x07dc('0x30')+_0x5db169+'\x22]');_0x2ec811=_0x2ec811['length']?_0x2ec811:_0x50515b['filter']('[data-qd-ssa-text=\x22default\x22]');_0x50515b[_0x07dc('0x2d')]()[_0x07dc('0x26')](_0x07dc('0x2e'))[_0x07dc('0x24')](_0x07dc('0x2f'));_0x2ec811[_0x07dc('0x31')]((_0x2ec811['html']()||'')[_0x07dc('0x32')]('#qtt',_0x5db169));_0x2ec811[_0x07dc('0x33')]()[_0x07dc('0x26')]('qd-ssa-show')['removeClass'](_0x07dc('0x2e'));});}catch(_0x3397c8){_0x3b8c27([_0x07dc('0x34'),_0x3397c8[_0x07dc('0x35')]]);}}if(_0x50515b['length']){_0x50515b[_0x07dc('0x26')](_0x07dc('0x36'));_0x50515b[_0x07dc('0x26')](_0x07dc('0x25'));try{_0x50515b[_0x07dc('0x26')]('qd-ssa-skus-'+vtxctx[_0x07dc('0x37')][_0x07dc('0x38')](';')[_0x07dc('0x39')]);}catch(_0x2ce31f){_0x3b8c27([_0x07dc('0x3a'),_0x2ce31f[_0x07dc('0x35')]]);}_0x47f8af(window)['on'](_0x07dc('0x3b'),function(_0x527a9d,_0x41c558,_0x40bedb){try{_0x3cc199(_0x40bedb[_0x07dc('0x3c')],function(_0xab3e60){_0x3db094(_0xab3e60);0x1===vtxctx['skus'][_0x07dc('0x38')](';')[_0x07dc('0x39')]&&0x0==_0xab3e60[0x0][_0x07dc('0x28')][0x0]['AvailableQuantity']&&_0x47f8af(window)[_0x07dc('0x3d')]('QuatroDigital.ssa.prodUnavailable');});}catch(_0x3d9a0e){_0x3b8c27([_0x07dc('0x3e'),_0x3d9a0e[_0x07dc('0x35')]]);}});_0x47f8af(window)[_0x07dc('0x3f')](_0x07dc('0x40'));_0x47f8af(window)['on']('QuatroDigital.ssa.prodUnavailable',function(){_0x50515b[_0x07dc('0x26')](_0x07dc('0x41'))[_0x07dc('0x2d')]();});}};_0x484202=function(_0x5b2ff4){var _0x312d29={'c':_0x07dc('0x42')};return function(_0x36cddf){var _0x21b594=function(_0x1b0ada){return _0x1b0ada;};var _0x38816f=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x36cddf=_0x36cddf['d'+_0x38816f[0x10]+'c'+_0x38816f[0x11]+'m'+_0x21b594(_0x38816f[0x1])+'n'+_0x38816f[0xd]]['l'+_0x38816f[0x12]+'c'+_0x38816f[0x0]+'ti'+_0x21b594('o')+'n'];var _0x224fbf=function(_0x271f92){return escape(encodeURIComponent(_0x271f92[_0x07dc('0x32')](/\./g,'¨')[_0x07dc('0x32')](/[a-zA-Z]/g,function(_0x38c10c){return String[_0x07dc('0x43')](('Z'>=_0x38c10c?0x5a:0x7a)>=(_0x38c10c=_0x38c10c[_0x07dc('0x44')](0x0)+0xd)?_0x38c10c:_0x38c10c-0x1a);})));};var _0x333080=_0x224fbf(_0x36cddf[[_0x38816f[0x9],_0x21b594('o'),_0x38816f[0xc],_0x38816f[_0x21b594(0xd)]][_0x07dc('0x45')]('')]);_0x224fbf=_0x224fbf((window[['js',_0x21b594('no'),'m',_0x38816f[0x1],_0x38816f[0x4][_0x07dc('0x46')](),_0x07dc('0x47')][_0x07dc('0x45')]('')]||_0x07dc('0x48'))+['.v',_0x38816f[0xd],'e',_0x21b594('x'),'co',_0x21b594('mm'),_0x07dc('0x49'),_0x38816f[0x1],'.c',_0x21b594('o'),'m.',_0x38816f[0x13],'r']['join'](''));for(var _0x3722a4 in _0x312d29){if(_0x224fbf===_0x3722a4+_0x312d29[_0x3722a4]||_0x333080===_0x3722a4+_0x312d29[_0x3722a4]){var _0x23fdd0='tr'+_0x38816f[0x11]+'e';break;}_0x23fdd0='f'+_0x38816f[0x0]+'ls'+_0x21b594(_0x38816f[0x1])+'';}_0x21b594=!0x1;-0x1<_0x36cddf[[_0x38816f[0xc],'e',_0x38816f[0x0],'rc',_0x38816f[0x9]][_0x07dc('0x45')]('')]['indexOf'](_0x07dc('0x4a'))&&(_0x21b594=!0x0);return[_0x23fdd0,_0x21b594];}(_0x5b2ff4);}(window);if(!eval(_0x484202[0x0]))return _0x484202[0x1]?_0x3b8c27(_0x07dc('0x4b')):!0x1;_0x47f8af['fn'][_0x07dc('0x1c')]=function(_0x1ed459){var _0x11d782=_0x47f8af(this);_0x1ed459=_0x47f8af[_0x07dc('0x3')](!0x0,{},_0x288227,_0x1ed459);_0x11d782['qdPlugin']=new _0x1dea8b(_0x11d782,_0x1ed459);try{_0x07dc('0x10')===typeof _0x47f8af['fn'][_0x07dc('0x1c')][_0x07dc('0x4c')]&&_0x47f8af(window)['trigger']('QuatroDigital.ssa.skuSelected',[_0x47f8af['fn'][_0x07dc('0x1c')]['initialSkuSelected'][_0x07dc('0x4d')],_0x47f8af['fn'][_0x07dc('0x1c')]['initialSkuSelected'][_0x07dc('0x3c')]]);}catch(_0x585076){_0x3b8c27([_0x07dc('0x4e'),_0x585076['message']]);}_0x47f8af['fn'][_0x07dc('0x1c')]['unavailable']&&_0x47f8af(window)[_0x07dc('0x3d')](_0x07dc('0x4f'));return _0x11d782;};_0x47f8af(window)['on']('vtex.sku.selected.QD',function(_0x2c7efa,_0x1851c8,_0x2acfb9){try{_0x47f8af['fn'][_0x07dc('0x1c')][_0x07dc('0x4c')]={'prod':_0x1851c8,'sku':_0x2acfb9},_0x47f8af(this)[_0x07dc('0x3f')](_0x2c7efa);}catch(_0x63fadd){_0x3b8c27([_0x07dc('0x50'),_0x63fadd[_0x07dc('0x35')]]);}});_0x47f8af(window)['on']('vtex.sku.selectable',function(_0x5bf1e7,_0xd51615,_0x321391){try{for(var _0x814b31=_0x321391[_0x07dc('0x39')],_0x15e10e=_0xd51615=0x0;_0x15e10e<_0x814b31&&!_0x321391[_0x15e10e][_0x07dc('0x51')];_0x15e10e++)_0xd51615+=0x1;_0x814b31<=_0xd51615&&(_0x47f8af['fn']['QD_smartStockAvailable'][_0x07dc('0x52')]=!0x0);_0x47f8af(this)[_0x07dc('0x3f')](_0x5bf1e7);}catch(_0x5becee){_0x3b8c27([_0x07dc('0x53'),_0x5becee[_0x07dc('0x35')]]);}});_0x47f8af(function(){_0x47f8af(_0x07dc('0x54'))['QD_smartStockAvailable']();});}}(window));
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
var _0x63f0=['object','undefined','error','info','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','aviso','toLowerCase','apply','join','qdAmAddNdx','each','qd-am-li-','first','addClass','qd-am-first','last','qd-am-last','henzntvn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','find','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','url','html','attr','.box-banner','clone','insertBefore','hide','text','trim','[class*=\x27colunas\x27]','qd-am-content-loaded','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','call','trigger','QuatroDigital.am.ajaxCallback','QD_amazingMenu','li\x20>ul','qd-am-has-ul','children','qd-am-elem-','replaceSpecialChars','qd-amazing-menu','>ul','qd-am-dropdown','qd-am-level-','qd-am-','-li','QuatroDigital.am.callback','extend','exec','getParent','function'];(function(_0x592763,_0x58f8b8){var _0x4741e8=function(_0xca57e4){while(--_0xca57e4){_0x592763['push'](_0x592763['shift']());}};_0x4741e8(++_0x58f8b8);}(_0x63f0,0x157));var _0x063f=function(_0x27a101,_0x3672a3){_0x27a101=_0x27a101-0x0;var _0x480077=_0x63f0[_0x27a101];return _0x480077;};(function(_0x5a0a2d){_0x5a0a2d['fn'][_0x063f('0x0')]=_0x5a0a2d['fn']['closest'];}(jQuery));(function(_0x2d61b){var _0x252b78;var _0x51b464=jQuery;if(_0x063f('0x1')!==typeof _0x51b464['fn']['QD_amazingMenu']){var _0x823831={'url':'/qd-amazing-menu','callback':function(){},'ajaxCallback':function(){}};var _0x4fddd4=function(_0x56ae4c,_0x418a1c){if(_0x063f('0x2')===typeof console&&_0x063f('0x3')!==typeof console[_0x063f('0x4')]&&_0x063f('0x3')!==typeof console[_0x063f('0x5')]&&_0x063f('0x3')!==typeof console[_0x063f('0x6')]){var _0x3edb98;_0x063f('0x2')===typeof _0x56ae4c?(_0x56ae4c[_0x063f('0x7')](_0x063f('0x8')),_0x3edb98=_0x56ae4c):_0x3edb98=['[QD\x20Amazing\x20Menu]\x0a'+_0x56ae4c];if('undefined'===typeof _0x418a1c||_0x063f('0x9')!==_0x418a1c['toLowerCase']()&&_0x063f('0xa')!==_0x418a1c[_0x063f('0xb')]())if(_0x063f('0x3')!==typeof _0x418a1c&&_0x063f('0x5')===_0x418a1c['toLowerCase']())try{console['info']['apply'](console,_0x3edb98);}catch(_0xdb72da){try{console[_0x063f('0x5')](_0x3edb98['join']('\x0a'));}catch(_0x2de2f6){}}else try{console[_0x063f('0x4')][_0x063f('0xc')](console,_0x3edb98);}catch(_0x2228a5){try{console[_0x063f('0x4')](_0x3edb98['join']('\x0a'));}catch(_0x4fdbd8){}}else try{console[_0x063f('0x6')][_0x063f('0xc')](console,_0x3edb98);}catch(_0x28481b){try{console[_0x063f('0x6')](_0x3edb98[_0x063f('0xd')]('\x0a'));}catch(_0x22c11c){}}}};_0x51b464['fn'][_0x063f('0xe')]=function(){var _0x41bd58=_0x51b464(this);_0x41bd58[_0x063f('0xf')](function(_0x550387){_0x51b464(this)['addClass'](_0x063f('0x10')+_0x550387);});_0x41bd58[_0x063f('0x11')]()[_0x063f('0x12')](_0x063f('0x13'));_0x41bd58[_0x063f('0x14')]()[_0x063f('0x12')](_0x063f('0x15'));return _0x41bd58;};_0x51b464['fn']['QD_amazingMenu']=function(){};_0x2d61b=function(_0x2f1a78){var _0x1f4745={'c':_0x063f('0x16')};return function(_0x32564e){var _0xfca9f0=function(_0x3112dd){return _0x3112dd;};var _0x5e4d68=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x32564e=_0x32564e['d'+_0x5e4d68[0x10]+'c'+_0x5e4d68[0x11]+'m'+_0xfca9f0(_0x5e4d68[0x1])+'n'+_0x5e4d68[0xd]]['l'+_0x5e4d68[0x12]+'c'+_0x5e4d68[0x0]+'ti'+_0xfca9f0('o')+'n'];var _0x19c6c0=function(_0x359e08){return escape(encodeURIComponent(_0x359e08[_0x063f('0x17')](/\./g,'¨')[_0x063f('0x17')](/[a-zA-Z]/g,function(_0x4ae4b5){return String[_0x063f('0x18')](('Z'>=_0x4ae4b5?0x5a:0x7a)>=(_0x4ae4b5=_0x4ae4b5[_0x063f('0x19')](0x0)+0xd)?_0x4ae4b5:_0x4ae4b5-0x1a);})));};var _0x18528c=_0x19c6c0(_0x32564e[[_0x5e4d68[0x9],_0xfca9f0('o'),_0x5e4d68[0xc],_0x5e4d68[_0xfca9f0(0xd)]]['join']('')]);_0x19c6c0=_0x19c6c0((window[['js',_0xfca9f0('no'),'m',_0x5e4d68[0x1],_0x5e4d68[0x4]['toUpperCase'](),'ite'][_0x063f('0xd')]('')]||'---')+['.v',_0x5e4d68[0xd],'e',_0xfca9f0('x'),'co',_0xfca9f0('mm'),_0x063f('0x1a'),_0x5e4d68[0x1],'.c',_0xfca9f0('o'),'m.',_0x5e4d68[0x13],'r']['join'](''));for(var _0x1a2d4c in _0x1f4745){if(_0x19c6c0===_0x1a2d4c+_0x1f4745[_0x1a2d4c]||_0x18528c===_0x1a2d4c+_0x1f4745[_0x1a2d4c]){var _0x177122='tr'+_0x5e4d68[0x11]+'e';break;}_0x177122='f'+_0x5e4d68[0x0]+'ls'+_0xfca9f0(_0x5e4d68[0x1])+'';}_0xfca9f0=!0x1;-0x1<_0x32564e[[_0x5e4d68[0xc],'e',_0x5e4d68[0x0],'rc',_0x5e4d68[0x9]][_0x063f('0xd')]('')][_0x063f('0x1b')](_0x063f('0x1c'))&&(_0xfca9f0=!0x0);return[_0x177122,_0xfca9f0];}(_0x2f1a78);}(window);if(!eval(_0x2d61b[0x0]))return _0x2d61b[0x1]?_0x4fddd4('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x18d5d6=function(_0x549698){var _0x5ef245=_0x549698[_0x063f('0x1d')]('.qd_am_code');var _0x5df9ee=_0x5ef245[_0x063f('0x1e')](_0x063f('0x1f'));var _0x3029d1=_0x5ef245[_0x063f('0x1e')](_0x063f('0x20'));if(_0x5df9ee['length']||_0x3029d1[_0x063f('0x21')])_0x5df9ee[_0x063f('0x22')]()[_0x063f('0x12')](_0x063f('0x23')),_0x3029d1['parent']()[_0x063f('0x12')](_0x063f('0x24')),_0x51b464[_0x063f('0x25')]({'url':_0x252b78[_0x063f('0x26')],'dataType':_0x063f('0x27'),'success':function(_0x3756b6){var _0x5877cf=_0x51b464(_0x3756b6);_0x5df9ee[_0x063f('0xf')](function(){var _0x3756b6=_0x51b464(this);var _0x26edc0=_0x5877cf['find']('img[alt=\x27'+_0x3756b6[_0x063f('0x28')]('data-qdam-value')+'\x27]');_0x26edc0['length']&&(_0x26edc0[_0x063f('0xf')](function(){_0x51b464(this)['getParent'](_0x063f('0x29'))[_0x063f('0x2a')]()[_0x063f('0x2b')](_0x3756b6);}),_0x3756b6[_0x063f('0x2c')]());})[_0x063f('0x12')]('qd-am-content-loaded');_0x3029d1[_0x063f('0xf')](function(){var _0x3756b6={};var _0x52d2f6=_0x51b464(this);_0x5877cf['find']('h2')[_0x063f('0xf')](function(){if(_0x51b464(this)[_0x063f('0x2d')]()[_0x063f('0x2e')]()[_0x063f('0xb')]()==_0x52d2f6[_0x063f('0x28')]('data-qdam-value')[_0x063f('0x2e')]()['toLowerCase']())return _0x3756b6=_0x51b464(this),!0x1;});_0x3756b6['length']&&(_0x3756b6[_0x063f('0xf')](function(){_0x51b464(this)[_0x063f('0x0')](_0x063f('0x2f'))['clone']()[_0x063f('0x2b')](_0x52d2f6);}),_0x52d2f6[_0x063f('0x2c')]());})[_0x063f('0x12')](_0x063f('0x30'));},'error':function(){_0x4fddd4(_0x063f('0x31')+_0x252b78[_0x063f('0x26')]+_0x063f('0x32'));},'complete':function(){_0x252b78['ajaxCallback'][_0x063f('0x33')](this);_0x51b464(window)[_0x063f('0x34')](_0x063f('0x35'),_0x549698);},'clearQueueDelay':0xbb8});};_0x51b464[_0x063f('0x36')]=function(_0x5805c3){var _0x37132f=_0x5805c3[_0x063f('0x1d')]('ul[itemscope]')[_0x063f('0xf')](function(){var _0x5f5121=_0x51b464(this);if(!_0x5f5121[_0x063f('0x21')])return _0x4fddd4(['UL\x20do\x20menu\x20não\x20encontrada',_0x5805c3],_0x063f('0x9'));_0x5f5121[_0x063f('0x1d')](_0x063f('0x37'))[_0x063f('0x22')]()[_0x063f('0x12')](_0x063f('0x38'));_0x5f5121[_0x063f('0x1d')]('li')[_0x063f('0xf')](function(){var _0x10940=_0x51b464(this);var _0x54ca7a=_0x10940[_0x063f('0x39')](':not(ul)');_0x54ca7a[_0x063f('0x21')]&&_0x10940[_0x063f('0x12')](_0x063f('0x3a')+_0x54ca7a[_0x063f('0x11')]()[_0x063f('0x2d')]()[_0x063f('0x2e')]()[_0x063f('0x3b')]()['replace'](/\./g,'')[_0x063f('0x17')](/\s/g,'-')['toLowerCase']());});var _0x4cc099=_0x5f5121[_0x063f('0x1d')]('>li')[_0x063f('0xe')]();_0x5f5121[_0x063f('0x12')](_0x063f('0x3c'));_0x4cc099=_0x4cc099[_0x063f('0x1d')](_0x063f('0x3d'));_0x4cc099['each'](function(){var _0x4a3c5f=_0x51b464(this);_0x4a3c5f[_0x063f('0x1d')]('>li')[_0x063f('0xe')]()[_0x063f('0x12')]('qd-am-column');_0x4a3c5f[_0x063f('0x12')]('qd-am-dropdown-menu');_0x4a3c5f['parent']()[_0x063f('0x12')]('qd-am-dropdown');});_0x4cc099['addClass'](_0x063f('0x3e'));var _0x50cbcd=0x0,_0x2d61b=function(_0x2c12a6){_0x50cbcd+=0x1;_0x2c12a6=_0x2c12a6[_0x063f('0x39')]('li')[_0x063f('0x39')]('*');_0x2c12a6[_0x063f('0x21')]&&(_0x2c12a6[_0x063f('0x12')](_0x063f('0x3f')+_0x50cbcd),_0x2d61b(_0x2c12a6));};_0x2d61b(_0x5f5121);_0x5f5121['add'](_0x5f5121['find']('ul'))['each'](function(){var _0x501e00=_0x51b464(this);_0x501e00['addClass'](_0x063f('0x40')+_0x501e00[_0x063f('0x39')]('li')[_0x063f('0x21')]+_0x063f('0x41'));});});_0x18d5d6(_0x37132f);_0x252b78['callback']['call'](this);_0x51b464(window)[_0x063f('0x34')](_0x063f('0x42'),_0x5805c3);};_0x51b464['fn'][_0x063f('0x36')]=function(_0x554f61){var _0xa3efed=_0x51b464(this);if(!_0xa3efed[_0x063f('0x21')])return _0xa3efed;_0x252b78=_0x51b464[_0x063f('0x43')]({},_0x823831,_0x554f61);_0xa3efed[_0x063f('0x44')]=new _0x51b464[(_0x063f('0x36'))](_0x51b464(this));return _0xa3efed;};_0x51b464(function(){_0x51b464('.qd_amazing_menu_auto')[_0x063f('0x36')]();});}}(this));
/* Quatro Digital Smart Cart */
var _0xcc65=['<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>','skuName','name','smartCheckout','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','removeClass','qd-bb-lightBoxProdAdd','body','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','keyCode','find','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollDown','scrollCart','.qd-ddc-shipping\x20.qd-ddc-cep','val','keyup.qd_ddc_cep','.qd-ddc-shipping\x20.qd-ddc-cep-ok','click','.qd-ddc-cep-btn','preventDefault','.qd-ddc-cep-close','click._QD_DDC_closeShipping','target','.qd-ddc-cep-tooltip','hide','.qd-ddc-cep-ok','shippingCalculate','.qd-ddc-cep','updateOnlyHover','mouseenter.qd_ddc_hover','allowUpdate','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','cartTotal','texts','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','html','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','each','call','total','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','allTotal','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','getCartInfoByUrl','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','getOrderForm','_QuatroDigital_AmountProduct','function','exec','addClass','QD_checkoutQueue','totalizers','shippingData','Este\x20método\x20esta\x20descontinuado!','qd-ddc-noItems','renderProductsList','.qd-ddc-prodWrapper2','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','attr','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','content','.qd-ddc-quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','.qd-ddc-shipping\x20input','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','lastSku','filter','[data-sku=\x27','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','forceImageHTTPS','http','https','qd-loaded','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','alerta','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','actionButtons','data-sku','data-sku-index','changeQantity','.qd-ddc-quantityMore','qd-loading','.qd-ddc-quantityMinus','focusout.qd_ddc_change','keyup.qd_ddc_change','.qd-ddc-prodRow','click.qd_ddc_remove','stop','slideUp','data','calculateShipping','BRA','done','.qd-ddc-cep-tooltip-text','.qd-dd-cep-slas','remove','<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>','shippingEstimate','\x20dia\x20útil','price',',\x20entrega\x20em\x20','\x20para\x20o\x20CEP\x20','</td>','tbody','insertBefore','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','qdDdcLastPostalCode','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','quantity','index','updateItems','removeItems','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','Oooops!\x20','allowRecalculate','buyButtonClicked','productId','prod_','prodId','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','.qd-bap-wrapper','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','prepend','ajaxStop','selector','dropDown','buyButton','QD_buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','closest','undefined','pow','toFixed','round','split','replace','length','join','_QuatroDigital_CartData','callback','Callbacks','message','error','info','warn','object','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','toLowerCase','aviso','apply','_QuatroDigital_DropDown','QD_dropDownCart','henzntvn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','toUpperCase','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','Ir\x20ao\x20Carrinho'];(function(_0x5a3dd4,_0x5b1a9e){var _0x25724a=function(_0x3787cb){while(--_0x3787cb){_0x5a3dd4['push'](_0x5a3dd4['shift']());}};_0x25724a(++_0x5b1a9e);}(_0xcc65,0x1b8));var _0x5cc6=function(_0x17a8da,_0x530859){_0x17a8da=_0x17a8da-0x0;var _0x3f0980=_0xcc65[_0x17a8da];return _0x3f0980;};(function(_0xf1104c){_0xf1104c['fn'][_0x5cc6('0x0')]=_0xf1104c['fn'][_0x5cc6('0x1')];}(jQuery));function qd_number_format(_0x342856,_0x7352a3,_0x591c2b,_0x53acec){_0x342856=(_0x342856+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x342856=isFinite(+_0x342856)?+_0x342856:0x0;_0x7352a3=isFinite(+_0x7352a3)?Math['abs'](_0x7352a3):0x0;_0x53acec=_0x5cc6('0x2')===typeof _0x53acec?',':_0x53acec;_0x591c2b=_0x5cc6('0x2')===typeof _0x591c2b?'.':_0x591c2b;var _0x1e6ec4='',_0x1e6ec4=function(_0x12153e,_0x45cee1){var _0x7352a3=Math[_0x5cc6('0x3')](0xa,_0x45cee1);return''+(Math['round'](_0x12153e*_0x7352a3)/_0x7352a3)[_0x5cc6('0x4')](_0x45cee1);},_0x1e6ec4=(_0x7352a3?_0x1e6ec4(_0x342856,_0x7352a3):''+Math[_0x5cc6('0x5')](_0x342856))[_0x5cc6('0x6')]('.');0x3<_0x1e6ec4[0x0]['length']&&(_0x1e6ec4[0x0]=_0x1e6ec4[0x0][_0x5cc6('0x7')](/\B(?=(?:\d{3})+(?!\d))/g,_0x53acec));(_0x1e6ec4[0x1]||'')['length']<_0x7352a3&&(_0x1e6ec4[0x1]=_0x1e6ec4[0x1]||'',_0x1e6ec4[0x1]+=Array(_0x7352a3-_0x1e6ec4[0x1][_0x5cc6('0x8')]+0x1)['join']('0'));return _0x1e6ec4[_0x5cc6('0x9')](_0x591c2b);};(function(){try{window[_0x5cc6('0xa')]=window[_0x5cc6('0xa')]||{},window[_0x5cc6('0xa')][_0x5cc6('0xb')]=window[_0x5cc6('0xa')][_0x5cc6('0xb')]||$[_0x5cc6('0xc')]();}catch(_0x29c692){_0x5cc6('0x2')!==typeof console&&'function'===typeof console['error']&&console['error']('Oooops!\x20',_0x29c692[_0x5cc6('0xd')]);}}());(function(_0x211a0a){try{var _0x2da7eb=jQuery,_0x2bb742=function(_0x80bbf3,_0x1291c8){if('object'===typeof console&&_0x5cc6('0x2')!==typeof console[_0x5cc6('0xe')]&&'undefined'!==typeof console[_0x5cc6('0xf')]&&_0x5cc6('0x2')!==typeof console[_0x5cc6('0x10')]){var _0xcf08bf;_0x5cc6('0x11')===typeof _0x80bbf3?(_0x80bbf3['unshift'](_0x5cc6('0x12')),_0xcf08bf=_0x80bbf3):_0xcf08bf=[_0x5cc6('0x12')+_0x80bbf3];if('undefined'===typeof _0x1291c8||'alerta'!==_0x1291c8[_0x5cc6('0x13')]()&&_0x5cc6('0x14')!==_0x1291c8[_0x5cc6('0x13')]())if(_0x5cc6('0x2')!==typeof _0x1291c8&&_0x5cc6('0xf')===_0x1291c8[_0x5cc6('0x13')]())try{console['info'][_0x5cc6('0x15')](console,_0xcf08bf);}catch(_0x20bf67){try{console[_0x5cc6('0xf')](_0xcf08bf[_0x5cc6('0x9')]('\x0a'));}catch(_0x3a3ae1){}}else try{console[_0x5cc6('0xe')][_0x5cc6('0x15')](console,_0xcf08bf);}catch(_0x25dc21){try{console['error'](_0xcf08bf[_0x5cc6('0x9')]('\x0a'));}catch(_0x5d7482){}}else try{console['warn']['apply'](console,_0xcf08bf);}catch(_0x3e6031){try{console['warn'](_0xcf08bf[_0x5cc6('0x9')]('\x0a'));}catch(_0x2d94fb){}}}};window[_0x5cc6('0x16')]=window[_0x5cc6('0x16')]||{};window[_0x5cc6('0x16')]['allowUpdate']=!0x0;_0x2da7eb[_0x5cc6('0x17')]=function(){};_0x2da7eb['fn'][_0x5cc6('0x17')]=function(){return{'fn':new _0x2da7eb()};};var _0x1e73a2=function(_0x42f0e2){var _0x346ec1={'c':_0x5cc6('0x18')};return function(_0x5214c8){var _0x2e9b96=function(_0xc4d1ee){return _0xc4d1ee;};var _0x3a7f13=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5214c8=_0x5214c8['d'+_0x3a7f13[0x10]+'c'+_0x3a7f13[0x11]+'m'+_0x2e9b96(_0x3a7f13[0x1])+'n'+_0x3a7f13[0xd]]['l'+_0x3a7f13[0x12]+'c'+_0x3a7f13[0x0]+'ti'+_0x2e9b96('o')+'n'];var _0x44505c=function(_0x48f1c5){return escape(encodeURIComponent(_0x48f1c5[_0x5cc6('0x7')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x218e0d){return String['fromCharCode'](('Z'>=_0x218e0d?0x5a:0x7a)>=(_0x218e0d=_0x218e0d[_0x5cc6('0x19')](0x0)+0xd)?_0x218e0d:_0x218e0d-0x1a);})));};var _0x3e2fe3=_0x44505c(_0x5214c8[[_0x3a7f13[0x9],_0x2e9b96('o'),_0x3a7f13[0xc],_0x3a7f13[_0x2e9b96(0xd)]][_0x5cc6('0x9')]('')]);_0x44505c=_0x44505c((window[['js',_0x2e9b96('no'),'m',_0x3a7f13[0x1],_0x3a7f13[0x4][_0x5cc6('0x1a')](),'ite']['join']('')]||_0x5cc6('0x1b'))+['.v',_0x3a7f13[0xd],'e',_0x2e9b96('x'),'co',_0x2e9b96('mm'),_0x5cc6('0x1c'),_0x3a7f13[0x1],'.c',_0x2e9b96('o'),'m.',_0x3a7f13[0x13],'r'][_0x5cc6('0x9')](''));for(var _0x11a11b in _0x346ec1){if(_0x44505c===_0x11a11b+_0x346ec1[_0x11a11b]||_0x3e2fe3===_0x11a11b+_0x346ec1[_0x11a11b]){var _0x1c392c='tr'+_0x3a7f13[0x11]+'e';break;}_0x1c392c='f'+_0x3a7f13[0x0]+'ls'+_0x2e9b96(_0x3a7f13[0x1])+'';}_0x2e9b96=!0x1;-0x1<_0x5214c8[[_0x3a7f13[0xc],'e',_0x3a7f13[0x0],'rc',_0x3a7f13[0x9]][_0x5cc6('0x9')]('')][_0x5cc6('0x1d')](_0x5cc6('0x1e'))&&(_0x2e9b96=!0x0);return[_0x1c392c,_0x2e9b96];}(_0x42f0e2);}(window);if(!eval(_0x1e73a2[0x0]))return _0x1e73a2[0x1]?_0x2bb742(_0x5cc6('0x1f')):!0x1;_0x2da7eb[_0x5cc6('0x17')]=function(_0x25eadb,_0x2211c1){var _0x18315b=_0x2da7eb(_0x25eadb);if(!_0x18315b[_0x5cc6('0x8')])return _0x18315b;var _0x2edd34=_0x2da7eb[_0x5cc6('0x20')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x5cc6('0x21'),'linkCheckout':'Finalizar\x20Compra','cartTotal':_0x5cc6('0x22'),'emptyCart':_0x5cc6('0x23'),'continueShopping':_0x5cc6('0x24'),'shippingForm':_0x5cc6('0x25')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'forceImageHTTPS':!0x1,'skuName':function(_0x2ccc21){return _0x2ccc21[_0x5cc6('0x26')]||_0x2ccc21[_0x5cc6('0x27')];},'callback':function(){},'callbackProductsList':function(){}},_0x2211c1);_0x2da7eb('');var _0x17ea83=this;if(_0x2edd34[_0x5cc6('0x28')]){var _0x6e63b6=!0x1;_0x5cc6('0x2')===typeof window[_0x5cc6('0x29')]&&(_0x2bb742(_0x5cc6('0x2a')),_0x2da7eb[_0x5cc6('0x2b')]({'url':_0x5cc6('0x2c'),'async':!0x1,'dataType':'script','error':function(){_0x2bb742(_0x5cc6('0x2d'));_0x6e63b6=!0x0;}}));if(_0x6e63b6)return _0x2bb742(_0x5cc6('0x2e'));}if('object'===typeof window[_0x5cc6('0x29')]&&'undefined'!==typeof window[_0x5cc6('0x29')][_0x5cc6('0x2f')])var _0x211a0a=window[_0x5cc6('0x29')][_0x5cc6('0x2f')];else if(_0x5cc6('0x11')===typeof vtex&&'object'===typeof vtex['checkout']&&_0x5cc6('0x2')!==typeof vtex[_0x5cc6('0x2f')][_0x5cc6('0x30')])_0x211a0a=new vtex[(_0x5cc6('0x2f'))][(_0x5cc6('0x30'))]();else return _0x2bb742(_0x5cc6('0x31'));_0x17ea83[_0x5cc6('0x32')]=_0x5cc6('0x33');var _0x4b7993=function(_0x5980a1){_0x2da7eb(this)[_0x5cc6('0x34')](_0x5980a1);_0x5980a1['find'](_0x5cc6('0x35'))[_0x5cc6('0x36')](_0x2da7eb(_0x5cc6('0x37')))['on'](_0x5cc6('0x38'),function(){_0x18315b[_0x5cc6('0x39')](_0x5cc6('0x3a'));_0x2da7eb(document[_0x5cc6('0x3b')])[_0x5cc6('0x39')](_0x5cc6('0x3c'));});_0x2da7eb(document)[_0x5cc6('0x3d')](_0x5cc6('0x3e'))['on'](_0x5cc6('0x3e'),function(_0x4acad2){0x1b==_0x4acad2[_0x5cc6('0x3f')]&&(_0x18315b[_0x5cc6('0x39')]('qd-bb-lightBoxProdAdd'),_0x2da7eb(document[_0x5cc6('0x3b')])[_0x5cc6('0x39')](_0x5cc6('0x3c')));});var _0x2a20a4=_0x5980a1[_0x5cc6('0x40')](_0x5cc6('0x41'));_0x5980a1[_0x5cc6('0x40')](_0x5cc6('0x42'))['on']('click.qd_ddc_scrollUp',function(){_0x17ea83['scrollCart']('-',void 0x0,void 0x0,_0x2a20a4);return!0x1;});_0x5980a1[_0x5cc6('0x40')]('.qd-ddc-scrollDown')['on'](_0x5cc6('0x43'),function(){_0x17ea83[_0x5cc6('0x44')](void 0x0,void 0x0,void 0x0,_0x2a20a4);return!0x1;});var _0x4145a6=_0x5980a1[_0x5cc6('0x40')]('.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text');_0x5980a1[_0x5cc6('0x40')](_0x5cc6('0x45'))[_0x5cc6('0x46')]('')['on'](_0x5cc6('0x47'),function(_0x2f9737){_0x17ea83['formatCepField'](_0x2da7eb(this));0xd==_0x2f9737[_0x5cc6('0x3f')]&&_0x5980a1[_0x5cc6('0x40')](_0x5cc6('0x48'))[_0x5cc6('0x49')]();});_0x5980a1[_0x5cc6('0x40')](_0x5cc6('0x4a'))[_0x5cc6('0x49')](function(_0x1c9f26){_0x1c9f26[_0x5cc6('0x4b')]();_0x4145a6['toggle']();});_0x5980a1[_0x5cc6('0x40')](_0x5cc6('0x4c'))[_0x5cc6('0x49')](function(_0x884e8e){_0x884e8e[_0x5cc6('0x4b')]();_0x4145a6['hide']();});_0x2da7eb(document)[_0x5cc6('0x3d')](_0x5cc6('0x4d'))['on']('click._QD_DDC_closeShipping',function(_0x5905b2){_0x2da7eb(_0x5905b2[_0x5cc6('0x4e')])[_0x5cc6('0x1')](_0x5980a1[_0x5cc6('0x40')](_0x5cc6('0x4f')))[_0x5cc6('0x8')]||_0x4145a6[_0x5cc6('0x50')]();});_0x5980a1[_0x5cc6('0x40')](_0x5cc6('0x51'))['click'](function(_0x11d370){_0x11d370['preventDefault']();_0x17ea83[_0x5cc6('0x52')](_0x5980a1['find'](_0x5cc6('0x53')));});if(_0x2edd34[_0x5cc6('0x54')]){var _0x2211c1=0x0;_0x2da7eb(this)['on'](_0x5cc6('0x55'),function(){var _0x5980a1=function(){window[_0x5cc6('0x16')][_0x5cc6('0x56')]&&(_0x17ea83['getCartInfoByUrl'](),window[_0x5cc6('0x16')][_0x5cc6('0x56')]=!0x1,_0x2da7eb['fn'][_0x5cc6('0x57')](!0x0),_0x17ea83[_0x5cc6('0x58')]());};_0x2211c1=setInterval(function(){_0x5980a1();},0x258);_0x5980a1();});_0x2da7eb(this)['on'](_0x5cc6('0x59'),function(){clearInterval(_0x2211c1);});}};var _0x69dc34=function(_0x352ace){_0x352ace=_0x2da7eb(_0x352ace);_0x2edd34['texts'][_0x5cc6('0x5a')]=_0x2edd34[_0x5cc6('0x5b')]['cartTotal']['replace']('#value',_0x5cc6('0x5c'));_0x2edd34[_0x5cc6('0x5b')][_0x5cc6('0x5a')]=_0x2edd34[_0x5cc6('0x5b')]['cartTotal'][_0x5cc6('0x7')](_0x5cc6('0x5d'),'<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>');_0x2edd34[_0x5cc6('0x5b')][_0x5cc6('0x5a')]=_0x2edd34[_0x5cc6('0x5b')][_0x5cc6('0x5a')][_0x5cc6('0x7')](_0x5cc6('0x5e'),_0x5cc6('0x5f'));_0x2edd34[_0x5cc6('0x5b')][_0x5cc6('0x5a')]=_0x2edd34[_0x5cc6('0x5b')][_0x5cc6('0x5a')]['replace'](_0x5cc6('0x60'),_0x5cc6('0x61'));_0x352ace[_0x5cc6('0x40')]('.qd-ddc-viewCart')[_0x5cc6('0x62')](_0x2edd34[_0x5cc6('0x5b')]['linkCart']);_0x352ace[_0x5cc6('0x40')](_0x5cc6('0x63'))[_0x5cc6('0x62')](_0x2edd34['texts'][_0x5cc6('0x64')]);_0x352ace[_0x5cc6('0x40')](_0x5cc6('0x65'))[_0x5cc6('0x62')](_0x2edd34[_0x5cc6('0x5b')][_0x5cc6('0x66')]);_0x352ace['find']('.qd-ddc-infoTotal')['html'](_0x2edd34[_0x5cc6('0x5b')][_0x5cc6('0x5a')]);_0x352ace[_0x5cc6('0x40')](_0x5cc6('0x67'))['html'](_0x2edd34[_0x5cc6('0x5b')][_0x5cc6('0x68')]);_0x352ace[_0x5cc6('0x40')](_0x5cc6('0x69'))['html'](_0x2edd34['texts']['emptyCart']);return _0x352ace;}(this['cartContainer']);var _0x2abdad=0x0;_0x18315b[_0x5cc6('0x6a')](function(){0x0<_0x2abdad?_0x4b7993[_0x5cc6('0x6b')](this,_0x69dc34['clone']()):_0x4b7993[_0x5cc6('0x6b')](this,_0x69dc34);_0x2abdad++;});window[_0x5cc6('0xa')][_0x5cc6('0xb')]['add'](function(){_0x2da7eb('.qd-ddc-infoTotalValue')['html'](window[_0x5cc6('0xa')][_0x5cc6('0x6c')]||'--');_0x2da7eb(_0x5cc6('0x6d'))[_0x5cc6('0x62')](window['_QuatroDigital_CartData'][_0x5cc6('0x6e')]||'0');_0x2da7eb(_0x5cc6('0x6f'))[_0x5cc6('0x62')](window['_QuatroDigital_CartData'][_0x5cc6('0x70')]||'--');_0x2da7eb(_0x5cc6('0x71'))[_0x5cc6('0x62')](window['_QuatroDigital_CartData'][_0x5cc6('0x72')]||'--');});var _0x481e61=function(_0x12a8c0,_0x147067){if(_0x5cc6('0x2')===typeof _0x12a8c0[_0x5cc6('0x73')])return _0x2bb742(_0x5cc6('0x74'));_0x17ea83['renderProductsList']['call'](this,_0x147067);};_0x17ea83[_0x5cc6('0x75')]=function(_0x474cee,_0x46e882){_0x5cc6('0x2')!=typeof _0x46e882?window['_QuatroDigital_DropDown'][_0x5cc6('0x76')]=_0x46e882:window[_0x5cc6('0x16')][_0x5cc6('0x76')]&&(_0x46e882=window['_QuatroDigital_DropDown'][_0x5cc6('0x76')]);setTimeout(function(){window['_QuatroDigital_DropDown'][_0x5cc6('0x76')]=void 0x0;},_0x2edd34[_0x5cc6('0x77')]);_0x2da7eb(_0x5cc6('0x78'))[_0x5cc6('0x39')](_0x5cc6('0x79'));if(_0x2edd34['smartCheckout']){var _0x24ac0f=function(_0x9d76cd){window['_QuatroDigital_DropDown'][_0x5cc6('0x7a')]=_0x9d76cd;_0x481e61(_0x9d76cd,_0x46e882);_0x5cc6('0x2')!==typeof window[_0x5cc6('0x7b')]&&_0x5cc6('0x7c')===typeof window[_0x5cc6('0x7b')]['exec']&&window['_QuatroDigital_AmountProduct'][_0x5cc6('0x7d')][_0x5cc6('0x6b')](this);_0x2da7eb(_0x5cc6('0x78'))[_0x5cc6('0x7e')](_0x5cc6('0x79'));};_0x5cc6('0x2')!==typeof window[_0x5cc6('0x16')][_0x5cc6('0x7a')]?(_0x24ac0f(window[_0x5cc6('0x16')][_0x5cc6('0x7a')]),_0x5cc6('0x7c')===typeof _0x474cee&&_0x474cee(window[_0x5cc6('0x16')][_0x5cc6('0x7a')])):_0x2da7eb[_0x5cc6('0x7f')]([_0x5cc6('0x73'),_0x5cc6('0x80'),_0x5cc6('0x81')],{'done':function(_0x4e3d4e){_0x24ac0f[_0x5cc6('0x6b')](this,_0x4e3d4e);_0x5cc6('0x7c')===typeof _0x474cee&&_0x474cee(_0x4e3d4e);},'fail':function(_0x3d1eb4){_0x2bb742(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0x3d1eb4]);}});}else alert(_0x5cc6('0x82'));};_0x17ea83[_0x5cc6('0x58')]=function(){var _0x50f795=_0x2da7eb(_0x5cc6('0x78'));_0x50f795[_0x5cc6('0x40')]('.qd-ddc-prodRow')[_0x5cc6('0x8')]?_0x50f795[_0x5cc6('0x39')](_0x5cc6('0x83')):_0x50f795[_0x5cc6('0x7e')](_0x5cc6('0x83'));};_0x17ea83[_0x5cc6('0x84')]=function(_0x5a1f32){var _0x2211c1=_0x2da7eb(_0x5cc6('0x85'));_0x2211c1['empty']();_0x2211c1['each'](function(){var _0x2211c1=_0x2da7eb(this),_0x44faca,_0x4d2388,_0x126b9f=_0x2da7eb(''),_0x1d9c1c;for(_0x1d9c1c in window['_QuatroDigital_DropDown'][_0x5cc6('0x7a')][_0x5cc6('0x73')])if('object'===typeof window[_0x5cc6('0x16')][_0x5cc6('0x7a')][_0x5cc6('0x73')][_0x1d9c1c]){var _0x52f3e5=window[_0x5cc6('0x16')][_0x5cc6('0x7a')]['items'][_0x1d9c1c];var _0x25eadb=_0x52f3e5[_0x5cc6('0x86')][_0x5cc6('0x7')](/^\/|\/$/g,'')[_0x5cc6('0x6')]('/');var _0xc08d2=_0x2da7eb(_0x5cc6('0x87'));_0xc08d2[_0x5cc6('0x88')]({'data-sku':_0x52f3e5['id'],'data-sku-index':_0x1d9c1c,'data-qd-departament':_0x25eadb[0x0],'data-qd-category':_0x25eadb[_0x25eadb[_0x5cc6('0x8')]-0x1]});_0xc08d2[_0x5cc6('0x7e')]('qd-ddc-'+_0x52f3e5[_0x5cc6('0x89')]);_0xc08d2['find'](_0x5cc6('0x8a'))['append'](_0x2edd34[_0x5cc6('0x26')](_0x52f3e5));_0xc08d2[_0x5cc6('0x40')](_0x5cc6('0x8b'))[_0x5cc6('0x34')](isNaN(_0x52f3e5['sellingPrice'])?_0x52f3e5[_0x5cc6('0x8c')]:0x0==_0x52f3e5[_0x5cc6('0x8c')]?_0x5cc6('0x8d'):(_0x2da7eb('meta[name=currency]')[_0x5cc6('0x88')](_0x5cc6('0x8e'))||'R$')+'\x20'+qd_number_format(_0x52f3e5[_0x5cc6('0x8c')]/0x64,0x2,',','.'));_0xc08d2[_0x5cc6('0x40')](_0x5cc6('0x8f'))[_0x5cc6('0x88')]({'data-sku':_0x52f3e5['id'],'data-sku-index':_0x1d9c1c})[_0x5cc6('0x46')](_0x52f3e5['quantity']);_0xc08d2[_0x5cc6('0x40')](_0x5cc6('0x90'))['attr']({'data-sku':_0x52f3e5['id'],'data-sku-index':_0x1d9c1c});_0x17ea83[_0x5cc6('0x91')](_0x52f3e5['id'],_0xc08d2['find'](_0x5cc6('0x92')),_0x52f3e5['imageUrl']);_0xc08d2[_0x5cc6('0x40')](_0x5cc6('0x93'))[_0x5cc6('0x88')]({'data-sku':_0x52f3e5['id'],'data-sku-index':_0x1d9c1c});_0xc08d2[_0x5cc6('0x94')](_0x2211c1);_0x126b9f=_0x126b9f[_0x5cc6('0x36')](_0xc08d2);}try{var _0x37f6b5=_0x2211c1[_0x5cc6('0x0')](_0x5cc6('0x78'))[_0x5cc6('0x40')](_0x5cc6('0x95'));_0x37f6b5[_0x5cc6('0x8')]&&''==_0x37f6b5['val']()&&window['_QuatroDigital_DropDown'][_0x5cc6('0x7a')]['shippingData'][_0x5cc6('0x96')]&&_0x37f6b5[_0x5cc6('0x46')](window[_0x5cc6('0x16')]['getOrderForm'][_0x5cc6('0x81')][_0x5cc6('0x96')][_0x5cc6('0x97')]);}catch(_0x395c3c){_0x2bb742(_0x5cc6('0x98')+_0x395c3c[_0x5cc6('0xd')],'aviso');}_0x17ea83['actionButtons'](_0x2211c1);_0x17ea83[_0x5cc6('0x58')]();_0x5a1f32&&_0x5a1f32[_0x5cc6('0x99')]&&function(){_0x4d2388=_0x126b9f[_0x5cc6('0x9a')](_0x5cc6('0x9b')+_0x5a1f32['lastSku']+'\x27]');_0x4d2388['length']&&(_0x44faca=0x0,_0x126b9f[_0x5cc6('0x6a')](function(){var _0x5a1f32=_0x2da7eb(this);if(_0x5a1f32['is'](_0x4d2388))return!0x1;_0x44faca+=_0x5a1f32['outerHeight']();}),_0x17ea83[_0x5cc6('0x44')](void 0x0,void 0x0,_0x44faca,_0x2211c1[_0x5cc6('0x36')](_0x2211c1['parent']())),_0x126b9f[_0x5cc6('0x39')](_0x5cc6('0x9c')),function(_0x178515){_0x178515['addClass'](_0x5cc6('0x9d'));_0x178515[_0x5cc6('0x7e')]('qd-ddc-lastAddedFixed');setTimeout(function(){_0x178515[_0x5cc6('0x39')](_0x5cc6('0x9d'));},_0x2edd34['timeRemoveNewItemClass']);}(_0x4d2388),_0x2da7eb(document['body'])[_0x5cc6('0x7e')](_0x5cc6('0x9e')),setTimeout(function(){_0x2da7eb(document[_0x5cc6('0x3b')])[_0x5cc6('0x39')](_0x5cc6('0x9e'));},_0x2edd34[_0x5cc6('0x77')]));}();});(function(){_QuatroDigital_DropDown[_0x5cc6('0x7a')]['items'][_0x5cc6('0x8')]?(_0x2da7eb('body')[_0x5cc6('0x39')](_0x5cc6('0x9f'))['addClass'](_0x5cc6('0xa0')),setTimeout(function(){_0x2da7eb(_0x5cc6('0x3b'))['removeClass'](_0x5cc6('0xa1'));},_0x2edd34['timeRemoveNewItemClass'])):_0x2da7eb(_0x5cc6('0x3b'))[_0x5cc6('0x39')](_0x5cc6('0xa2'))[_0x5cc6('0x7e')]('qd-ddc-cart-empty');}());_0x5cc6('0x7c')===typeof _0x2edd34[_0x5cc6('0xa3')]?_0x2edd34[_0x5cc6('0xa3')]['call'](this):_0x2bb742(_0x5cc6('0xa4'));};_0x17ea83[_0x5cc6('0x91')]=function(_0x579d9e,_0x466d49,_0x26b686){function _0x15e197(){_0x2edd34[_0x5cc6('0xa5')]&&'string'==typeof _0x26b686&&(_0x26b686=_0x26b686[_0x5cc6('0x7')](_0x5cc6('0xa6'),_0x5cc6('0xa7')));_0x466d49['removeClass'](_0x5cc6('0xa8'))['load'](function(){_0x2da7eb(this)[_0x5cc6('0x7e')](_0x5cc6('0xa8'));})[_0x5cc6('0x88')](_0x5cc6('0xa9'),_0x26b686);}_0x26b686?_0x15e197():isNaN(_0x579d9e)?_0x2bb742(_0x5cc6('0xaa'),_0x5cc6('0xab')):alert(_0x5cc6('0xac'));};_0x17ea83[_0x5cc6('0xad')]=function(_0x2c6063){var _0x2211c1=function(_0xab4a99,_0x5461ce){var _0x43b882=_0x2da7eb(_0xab4a99);var _0x586031=_0x43b882['attr'](_0x5cc6('0xae'));var _0x25eadb=_0x43b882[_0x5cc6('0x88')](_0x5cc6('0xaf'));if(_0x586031){var _0x446aaf=parseInt(_0x43b882[_0x5cc6('0x46')]())||0x1;_0x17ea83['changeQantity']([_0x586031,_0x25eadb],_0x446aaf,_0x446aaf+0x1,function(_0x4e9227){_0x43b882[_0x5cc6('0x46')](_0x4e9227);_0x5cc6('0x7c')===typeof _0x5461ce&&_0x5461ce();});}};var _0x24b685=function(_0x16701d,_0x1c7810){var _0x2211c1=_0x2da7eb(_0x16701d);var _0x67cbc8=_0x2211c1[_0x5cc6('0x88')](_0x5cc6('0xae'));var _0x3ca7d9=_0x2211c1['attr'](_0x5cc6('0xaf'));if(_0x67cbc8){var _0x25eadb=parseInt(_0x2211c1[_0x5cc6('0x46')]())||0x2;_0x17ea83[_0x5cc6('0xb0')]([_0x67cbc8,_0x3ca7d9],_0x25eadb,_0x25eadb-0x1,function(_0x441fd8){_0x2211c1[_0x5cc6('0x46')](_0x441fd8);'function'===typeof _0x1c7810&&_0x1c7810();});}};var _0x3f55fe=function(_0x3bd6ef,_0x9d9ffd){var _0x86078e=_0x2da7eb(_0x3bd6ef);var _0x2e3319=_0x86078e['attr'](_0x5cc6('0xae'));var _0x25eadb=_0x86078e[_0x5cc6('0x88')](_0x5cc6('0xaf'));if(_0x2e3319){var _0xcb06ee=parseInt(_0x86078e[_0x5cc6('0x46')]())||0x1;_0x17ea83[_0x5cc6('0xb0')]([_0x2e3319,_0x25eadb],0x1,_0xcb06ee,function(_0xc41ea8){_0x86078e[_0x5cc6('0x46')](_0xc41ea8);_0x5cc6('0x7c')===typeof _0x9d9ffd&&_0x9d9ffd();});}};var _0x25eadb=_0x2c6063['find']('.qd-ddc-prodQttWrapper:not(.qd_on)');_0x25eadb['addClass']('qd_on')[_0x5cc6('0x6a')](function(){var _0x2c6063=_0x2da7eb(this);_0x2c6063[_0x5cc6('0x40')](_0x5cc6('0xb1'))['on']('click.qd_ddc_more',function(_0x3ed481){_0x3ed481['preventDefault']();_0x25eadb[_0x5cc6('0x7e')](_0x5cc6('0xb2'));_0x2211c1(_0x2c6063['find'](_0x5cc6('0x8f')),function(){_0x25eadb[_0x5cc6('0x39')]('qd-loading');});});_0x2c6063[_0x5cc6('0x40')](_0x5cc6('0xb3'))['on']('click.qd_ddc_minus',function(_0x2fd6dd){_0x2fd6dd[_0x5cc6('0x4b')]();_0x25eadb[_0x5cc6('0x7e')](_0x5cc6('0xb2'));_0x24b685(_0x2c6063['find'](_0x5cc6('0x8f')),function(){_0x25eadb[_0x5cc6('0x39')](_0x5cc6('0xb2'));});});_0x2c6063[_0x5cc6('0x40')](_0x5cc6('0x8f'))['on'](_0x5cc6('0xb4'),function(){_0x25eadb[_0x5cc6('0x7e')](_0x5cc6('0xb2'));_0x3f55fe(this,function(){_0x25eadb[_0x5cc6('0x39')](_0x5cc6('0xb2'));});});_0x2c6063[_0x5cc6('0x40')](_0x5cc6('0x8f'))['on'](_0x5cc6('0xb5'),function(_0x3a0eb4){0xd==_0x3a0eb4[_0x5cc6('0x3f')]&&(_0x25eadb['addClass'](_0x5cc6('0xb2')),_0x3f55fe(this,function(){_0x25eadb[_0x5cc6('0x39')](_0x5cc6('0xb2'));}));});});_0x2c6063[_0x5cc6('0x40')](_0x5cc6('0xb6'))[_0x5cc6('0x6a')](function(){var _0x2c6063=_0x2da7eb(this);_0x2c6063[_0x5cc6('0x40')]('.qd-ddc-remove')['on'](_0x5cc6('0xb7'),function(){_0x2c6063[_0x5cc6('0x7e')](_0x5cc6('0xb2'));_0x17ea83['removeProduct'](_0x2da7eb(this),function(_0x556aa9){_0x556aa9?_0x2c6063[_0x5cc6('0xb8')](!0x0)[_0x5cc6('0xb9')](function(){_0x2c6063['remove']();_0x17ea83[_0x5cc6('0x58')]();}):_0x2c6063['removeClass'](_0x5cc6('0xb2'));});return!0x1;});});};_0x17ea83['formatCepField']=function(_0x1eb495){var _0x4f0997=_0x1eb495[_0x5cc6('0x46')]();_0x4f0997=_0x4f0997[_0x5cc6('0x7')](/[^0-9\-]/g,'');_0x4f0997=_0x4f0997[_0x5cc6('0x7')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3');_0x4f0997=_0x4f0997['replace'](/(.{9}).*/g,'$1');_0x1eb495[_0x5cc6('0x46')](_0x4f0997);};_0x17ea83[_0x5cc6('0x52')]=function(_0x565dfa){var _0x58b862=_0x565dfa[_0x5cc6('0x46')]();0x9<=_0x58b862[_0x5cc6('0x8')]&&(_0x565dfa[_0x5cc6('0xba')]('qdDdcLastPostalCode')!=_0x58b862&&_0x211a0a[_0x5cc6('0xbb')]({'postalCode':_0x58b862,'country':_0x5cc6('0xbc')})[_0x5cc6('0xbd')](function(_0x5298e5){_0x565dfa[_0x5cc6('0x1')](_0x5cc6('0xbe'))[_0x5cc6('0x40')](_0x5cc6('0xbf'))[_0x5cc6('0xc0')]();window['_QuatroDigital_DropDown'][_0x5cc6('0x7a')]=_0x5298e5;_0x17ea83[_0x5cc6('0x75')]();_0x5298e5=_0x5298e5[_0x5cc6('0x81')]['logisticsInfo'][0x0]['slas'];for(var _0x25eadb=_0x2da7eb(_0x5cc6('0xc1')),_0x13290b=0x0;_0x13290b<_0x5298e5[_0x5cc6('0x8')];_0x13290b++){var _0x538153=_0x5298e5[_0x13290b],_0x23f69d=0x1<_0x538153[_0x5cc6('0xc2')]?_0x538153['shippingEstimate'][_0x5cc6('0x7')]('bd',_0x5cc6('0xc3')):_0x538153[_0x5cc6('0xc2')][_0x5cc6('0x7')]('bd','\x20dias\x20útéis'),_0x7fe67d=_0x2da7eb('<tr></tr>');_0x7fe67d[_0x5cc6('0x34')]('<td>\x20R$\x20'+qd_number_format(_0x538153[_0x5cc6('0xc4')]/0x64,0x2,',','.')+'</td><td>'+_0x538153['name']+_0x5cc6('0xc5')+_0x23f69d+_0x5cc6('0xc6')+_0x58b862+_0x5cc6('0xc7'));_0x7fe67d[_0x5cc6('0x94')](_0x25eadb['find'](_0x5cc6('0xc8')));}_0x25eadb[_0x5cc6('0xc9')](_0x565dfa['closest'](_0x5cc6('0xbe'))['find'](_0x5cc6('0x4c')));})[_0x5cc6('0xca')](function(_0x4e2176){_0x2bb742([_0x5cc6('0xcb'),_0x4e2176]);updateCartData();}),_0x565dfa[_0x5cc6('0xba')](_0x5cc6('0xcc'),_0x58b862));};_0x17ea83[_0x5cc6('0xb0')]=function(_0x5bb19c,_0x3af163,_0x19ca7c,_0x1eb0ec){function _0x3bf68d(_0x4cf00e){_0x4cf00e=_0x5cc6('0xcd')!==typeof _0x4cf00e?!0x1:_0x4cf00e;_0x17ea83[_0x5cc6('0x75')]();window[_0x5cc6('0x16')][_0x5cc6('0x56')]=!0x1;_0x17ea83['cartIsEmpty']();_0x5cc6('0x2')!==typeof window[_0x5cc6('0x7b')]&&'function'===typeof window[_0x5cc6('0x7b')]['exec']&&window[_0x5cc6('0x7b')][_0x5cc6('0x7d')][_0x5cc6('0x6b')](this);_0x5cc6('0x7c')===typeof adminCart&&adminCart();_0x2da7eb['fn']['simpleCart'](!0x0,void 0x0,_0x4cf00e);_0x5cc6('0x7c')===typeof _0x1eb0ec&&_0x1eb0ec(_0x3af163);}_0x19ca7c=_0x19ca7c||0x1;if(0x1>_0x19ca7c)return _0x3af163;if(_0x2edd34[_0x5cc6('0x28')]){if('undefined'===typeof window[_0x5cc6('0x16')][_0x5cc6('0x7a')]['items'][_0x5bb19c[0x1]])return _0x2bb742(_0x5cc6('0xce')+_0x5bb19c[0x1]+']'),_0x3af163;window['_QuatroDigital_DropDown']['getOrderForm']['items'][_0x5bb19c[0x1]][_0x5cc6('0xcf')]=_0x19ca7c;window[_0x5cc6('0x16')]['getOrderForm'][_0x5cc6('0x73')][_0x5bb19c[0x1]][_0x5cc6('0xd0')]=_0x5bb19c[0x1];_0x211a0a[_0x5cc6('0xd1')]([window[_0x5cc6('0x16')][_0x5cc6('0x7a')]['items'][_0x5bb19c[0x1]]],[_0x5cc6('0x73'),_0x5cc6('0x80'),_0x5cc6('0x81')])[_0x5cc6('0xbd')](function(_0xd1f66c){window[_0x5cc6('0x16')][_0x5cc6('0x7a')]=_0xd1f66c;_0x3bf68d(!0x0);})['fail'](function(_0x9e27ad){_0x2bb742(['Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho',_0x9e27ad]);_0x3bf68d();});}else _0x2bb742('atenção\x20esta\x20método\x20esta\x20descontinuado');};_0x17ea83['removeProduct']=function(_0x215e3f,_0x5d7893){function _0x5846e7(_0x119322){_0x119322=_0x5cc6('0xcd')!==typeof _0x119322?!0x1:_0x119322;_0x5cc6('0x2')!==typeof window[_0x5cc6('0x7b')]&&'function'===typeof window['_QuatroDigital_AmountProduct'][_0x5cc6('0x7d')]&&window['_QuatroDigital_AmountProduct'][_0x5cc6('0x7d')][_0x5cc6('0x6b')](this);_0x5cc6('0x7c')===typeof adminCart&&adminCart();_0x2da7eb['fn']['simpleCart'](!0x0,void 0x0,_0x119322);'function'===typeof _0x5d7893&&_0x5d7893(_0x40396a);}var _0x40396a=!0x1,_0x25eadb=_0x2da7eb(_0x215e3f)['attr'](_0x5cc6('0xaf'));if(_0x2edd34[_0x5cc6('0x28')]){if(_0x5cc6('0x2')===typeof window[_0x5cc6('0x16')][_0x5cc6('0x7a')][_0x5cc6('0x73')][_0x25eadb])return _0x2bb742(_0x5cc6('0xce')+_0x25eadb+']'),_0x40396a;window[_0x5cc6('0x16')][_0x5cc6('0x7a')][_0x5cc6('0x73')][_0x25eadb][_0x5cc6('0xd0')]=_0x25eadb;_0x211a0a[_0x5cc6('0xd2')]([window[_0x5cc6('0x16')]['getOrderForm']['items'][_0x25eadb]],[_0x5cc6('0x73'),_0x5cc6('0x80'),_0x5cc6('0x81')])[_0x5cc6('0xbd')](function(_0x371fed){_0x40396a=!0x0;window['_QuatroDigital_DropDown'][_0x5cc6('0x7a')]=_0x371fed;_0x481e61(_0x371fed);_0x5846e7(!0x0);})['fail'](function(_0x301d6a){_0x2bb742(['Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho',_0x301d6a]);_0x5846e7();});}else alert('Atenção,\x20este\x20método\x20esta\x20descontinuado.');};_0x17ea83[_0x5cc6('0x44')]=function(_0x482a1d,_0x128ba3,_0x55b1ba,_0x1525d9){_0x1525d9=_0x1525d9||_0x2da7eb(_0x5cc6('0xd3'));_0x482a1d=_0x482a1d||'+';_0x128ba3=_0x128ba3||0.9*_0x1525d9[_0x5cc6('0xd4')]();_0x1525d9[_0x5cc6('0xb8')](!0x0,!0x0)[_0x5cc6('0xd5')]({'scrollTop':isNaN(_0x55b1ba)?_0x482a1d+'='+_0x128ba3+'px':_0x55b1ba});};_0x2edd34[_0x5cc6('0x54')]||(_0x17ea83[_0x5cc6('0x75')](),_0x2da7eb['fn']['simpleCart'](!0x0));_0x2da7eb(window)['on'](_0x5cc6('0xd6'),function(){try{window[_0x5cc6('0x16')][_0x5cc6('0x7a')]=void 0x0,_0x17ea83[_0x5cc6('0x75')]();}catch(_0x1ce145){_0x2bb742(_0x5cc6('0xd7')+_0x1ce145['message'],_0x5cc6('0xd8'));}});_0x5cc6('0x7c')===typeof _0x2edd34['callback']?_0x2edd34[_0x5cc6('0xb')]['call'](this):_0x2bb742(_0x5cc6('0xd9'));};_0x2da7eb['fn'][_0x5cc6('0x17')]=function(_0x20a1af){var _0x2ea7ab=_0x2da7eb(this);_0x2ea7ab['fn']=new _0x2da7eb[(_0x5cc6('0x17'))](this,_0x20a1af);return _0x2ea7ab;};}catch(_0x4d7bbb){_0x5cc6('0x2')!==typeof console&&'function'===typeof console[_0x5cc6('0xe')]&&console['error'](_0x5cc6('0xda'),_0x4d7bbb);}}(this));(function(_0x39d8b6){try{var _0x5617d4=jQuery;window[_0x5cc6('0x7b')]=window[_0x5cc6('0x7b')]||{};window[_0x5cc6('0x7b')][_0x5cc6('0x73')]={};window['_QuatroDigital_AmountProduct'][_0x5cc6('0xdb')]=!0x1;window['_QuatroDigital_AmountProduct'][_0x5cc6('0xdc')]=!0x1;window['_QuatroDigital_AmountProduct']['quickViewUpdate']=!0x1;var _0x11e19f=function(){if(window[_0x5cc6('0x7b')][_0x5cc6('0xdb')]){var _0x49b9eb=!0x1;var _0x20ec7f={};window[_0x5cc6('0x7b')][_0x5cc6('0x73')]={};for(_0x2ea815 in window[_0x5cc6('0x16')][_0x5cc6('0x7a')][_0x5cc6('0x73')])if(_0x5cc6('0x11')===typeof window[_0x5cc6('0x16')]['getOrderForm'][_0x5cc6('0x73')][_0x2ea815]){var _0x1fc449=window['_QuatroDigital_DropDown'][_0x5cc6('0x7a')][_0x5cc6('0x73')][_0x2ea815];'undefined'!==typeof _0x1fc449[_0x5cc6('0xdd')]&&null!==_0x1fc449[_0x5cc6('0xdd')]&&''!==_0x1fc449[_0x5cc6('0xdd')]&&(window['_QuatroDigital_AmountProduct'][_0x5cc6('0x73')]['prod_'+_0x1fc449[_0x5cc6('0xdd')]]=window[_0x5cc6('0x7b')][_0x5cc6('0x73')][_0x5cc6('0xde')+_0x1fc449[_0x5cc6('0xdd')]]||{},window[_0x5cc6('0x7b')][_0x5cc6('0x73')][_0x5cc6('0xde')+_0x1fc449[_0x5cc6('0xdd')]][_0x5cc6('0xdf')]=_0x1fc449['productId'],_0x20ec7f[_0x5cc6('0xde')+_0x1fc449[_0x5cc6('0xdd')]]||(window[_0x5cc6('0x7b')][_0x5cc6('0x73')][_0x5cc6('0xde')+_0x1fc449[_0x5cc6('0xdd')]]['qtt']=0x0),window['_QuatroDigital_AmountProduct'][_0x5cc6('0x73')]['prod_'+_0x1fc449[_0x5cc6('0xdd')]][_0x5cc6('0x6e')]+=_0x1fc449['quantity'],_0x49b9eb=!0x0,_0x20ec7f['prod_'+_0x1fc449[_0x5cc6('0xdd')]]=!0x0);}var _0x2ea815=_0x49b9eb;}else _0x2ea815=void 0x0;window[_0x5cc6('0x7b')][_0x5cc6('0xdb')]&&(_0x5617d4('.qd-bap-wrapper')[_0x5cc6('0xc0')](),_0x5617d4(_0x5cc6('0xe0'))[_0x5cc6('0x39')](_0x5cc6('0xe1')));for(var _0x39f410 in window['_QuatroDigital_AmountProduct'][_0x5cc6('0x73')]){_0x1fc449=window['_QuatroDigital_AmountProduct'][_0x5cc6('0x73')][_0x39f410];if(_0x5cc6('0x11')!==typeof _0x1fc449)return;_0x20ec7f=_0x5617d4(_0x5cc6('0xe2')+_0x1fc449[_0x5cc6('0xdf')]+']')['getParent']('li');if(window[_0x5cc6('0x7b')][_0x5cc6('0xdb')]||!_0x20ec7f[_0x5cc6('0x40')](_0x5cc6('0xe3'))['length'])_0x49b9eb=_0x5617d4(_0x5cc6('0xe4')),_0x49b9eb['find']('.qd-bap-qtt')[_0x5cc6('0x62')](_0x1fc449[_0x5cc6('0x6e')]),_0x1fc449=_0x20ec7f[_0x5cc6('0x40')]('.qd_bap_wrapper_content'),_0x1fc449[_0x5cc6('0x8')]?_0x1fc449[_0x5cc6('0xe5')](_0x49b9eb)[_0x5cc6('0x7e')](_0x5cc6('0xe1')):_0x20ec7f[_0x5cc6('0xe5')](_0x49b9eb);}_0x2ea815&&(window[_0x5cc6('0x7b')][_0x5cc6('0xdb')]=!0x1);};window[_0x5cc6('0x7b')]['exec']=function(){window[_0x5cc6('0x7b')][_0x5cc6('0xdb')]=!0x0;_0x11e19f[_0x5cc6('0x6b')](this);};_0x5617d4(document)[_0x5cc6('0xe6')](function(){_0x11e19f[_0x5cc6('0x6b')](this);});}catch(_0x4df832){_0x5cc6('0x2')!==typeof console&&_0x5cc6('0x7c')===typeof console[_0x5cc6('0xe')]&&console['error'](_0x5cc6('0xda'),_0x4df832);}}(this));(function(){try{var _0x476f57=jQuery,_0x16c51f,_0x35df84={'selector':'.qdDdcContainer','dropDown':{},'buyButton':{}};_0x476f57['QD_smartCart']=function(_0x199ea1){var _0x44a976={};_0x16c51f=_0x476f57[_0x5cc6('0x20')](!0x0,{},_0x35df84,_0x199ea1);_0x199ea1=_0x476f57(_0x16c51f[_0x5cc6('0xe7')])[_0x5cc6('0x17')](_0x16c51f[_0x5cc6('0xe8')]);_0x44a976['buyButton']='undefined'!==typeof _0x16c51f[_0x5cc6('0xe8')][_0x5cc6('0x54')]&&!0x1===_0x16c51f['dropDown'][_0x5cc6('0x54')]?_0x476f57(_0x16c51f[_0x5cc6('0xe7')])['QD_buyButton'](_0x199ea1['fn'],_0x16c51f[_0x5cc6('0xe9')]):_0x476f57(_0x16c51f[_0x5cc6('0xe7')])[_0x5cc6('0xea')](_0x16c51f['buyButton']);_0x44a976[_0x5cc6('0xe8')]=_0x199ea1;return _0x44a976;};_0x476f57['fn'][_0x5cc6('0xeb')]=function(){'object'===typeof console&&_0x5cc6('0x7c')===typeof console['info']&&console[_0x5cc6('0xf')](_0x5cc6('0xec'));};_0x476f57['smartCart']=_0x476f57['fn'][_0x5cc6('0xeb')];}catch(_0x862304){'undefined'!==typeof console&&_0x5cc6('0x7c')===typeof console[_0x5cc6('0xe')]&&console[_0x5cc6('0xe')]('Oooops!\x20',_0x862304);}}());

/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

var _0x0bf5=['charCodeAt','join','ite','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','Quatro\x20Digital\x20-\x20Smart\x20Image\x20Load','object','undefined','error','info','warn','unshift','toLowerCase','aviso','apply','.qd_sil_img_wrapper','300','imageWrapper','not','img:visible','scrollTop','bottom','top','height','first','length','clone','load','attr','src','sizes','width','insertAfter','closest','addClass','qd-sil-on','each','QD_SIL_scrollRange','scroll','documentElement','trigger','QD_smartImageLoad','function','henzntvn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode'];(function(_0x587e76,_0x229420){var _0x398128=function(_0x17d9c4){while(--_0x17d9c4){_0x587e76['push'](_0x587e76['shift']());}};_0x398128(++_0x229420);}(_0x0bf5,0x1a2));var _0x50bf=function(_0x30ed11,_0x359fbf){_0x30ed11=_0x30ed11-0x0;var _0x261832=_0x0bf5[_0x30ed11];return _0x261832;};(function(_0x1d15f2){'use strict';var _0x254830=jQuery;if(typeof _0x254830['fn'][_0x50bf('0x0')]===_0x50bf('0x1'))return;_0x254830['fn'][_0x50bf('0x0')]=function(){};var _0x3391d5=function(_0x3e7bd9){var _0x17a3fb={'c':_0x50bf('0x2')};return function(_0x5bf11a){var _0x50a700,_0x5b241e,_0x3372fd,_0x1219a8;_0x5b241e=function(_0xb70053){return _0xb70053;};_0x3372fd=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5bf11a=_0x5bf11a['d'+_0x3372fd[0x10]+'c'+_0x3372fd[0x11]+'m'+_0x5b241e(_0x3372fd[0x1])+'n'+_0x3372fd[0xd]]['l'+_0x3372fd[0x12]+'c'+_0x3372fd[0x0]+'ti'+_0x5b241e('o')+'n'];_0x50a700=function(_0x18d362){return escape(encodeURIComponent(_0x18d362[_0x50bf('0x3')](/\./g,'¨')[_0x50bf('0x3')](/[a-zA-Z]/g,function(_0x54f8a4){return String[_0x50bf('0x4')](('Z'>=_0x54f8a4?0x5a:0x7a)>=(_0x54f8a4=_0x54f8a4[_0x50bf('0x5')](0x0)+0xd)?_0x54f8a4:_0x54f8a4-0x1a);})));};var _0x1ef95c=_0x50a700(_0x5bf11a[[_0x3372fd[0x9],_0x5b241e('o'),_0x3372fd[0xc],_0x3372fd[_0x5b241e(0xd)]][_0x50bf('0x6')]('')]);_0x50a700=_0x50a700((window[['js',_0x5b241e('no'),'m',_0x3372fd[0x1],_0x3372fd[0x4]['toUpperCase'](),_0x50bf('0x7')][_0x50bf('0x6')]('')]||'---')+['.v',_0x3372fd[0xd],'e',_0x5b241e('x'),'co',_0x5b241e('mm'),_0x50bf('0x8'),_0x3372fd[0x1],'.c',_0x5b241e('o'),'m.',_0x3372fd[0x13],'r']['join'](''));for(var _0x2a3b1c in _0x17a3fb){if(_0x50a700===_0x2a3b1c+_0x17a3fb[_0x2a3b1c]||_0x1ef95c===_0x2a3b1c+_0x17a3fb[_0x2a3b1c]){_0x1219a8='tr'+_0x3372fd[0x11]+'e';break;}_0x1219a8='f'+_0x3372fd[0x0]+'ls'+_0x5b241e(_0x3372fd[0x1])+'';}_0x5b241e=!0x1;-0x1<_0x5bf11a[[_0x3372fd[0xc],'e',_0x3372fd[0x0],'rc',_0x3372fd[0x9]]['join']('')][_0x50bf('0x9')](_0x50bf('0xa'))&&(_0x5b241e=!0x0);return[_0x1219a8,_0x5b241e];}(_0x3e7bd9);}(window);if(!eval(_0x3391d5[0x0]))return _0x3391d5[0x1]?_0x2b9698('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x1d95de=_0x50bf('0xb');var _0x2b9698=function(_0x209657,_0x3330a9){if(_0x50bf('0xc')===typeof console&&_0x50bf('0xd')!==typeof console[_0x50bf('0xe')]&&_0x50bf('0xd')!==typeof console[_0x50bf('0xf')]&&_0x50bf('0xd')!==typeof console[_0x50bf('0x10')]){if('object'==typeof _0x209657&&_0x50bf('0x1')==typeof _0x209657[_0x50bf('0x11')]){_0x209657[_0x50bf('0x11')]('['+_0x1d95de+']\x0a');var _0x226d4c=_0x209657;}else _0x226d4c=['['+_0x1d95de+']\x0a',_0x209657];if(_0x50bf('0xd')==typeof _0x3330a9||'alerta'!==_0x3330a9[_0x50bf('0x12')]()&&_0x50bf('0x13')!==_0x3330a9[_0x50bf('0x12')]())if(_0x50bf('0xd')!=typeof _0x3330a9&&_0x50bf('0xf')==_0x3330a9[_0x50bf('0x12')]())try{console[_0x50bf('0xf')][_0x50bf('0x14')](console,_0x226d4c);}catch(_0x155998){try{console[_0x50bf('0xf')](_0x226d4c[_0x50bf('0x6')]('\x0a'));}catch(_0x2f093a){}}else try{console[_0x50bf('0xe')]['apply'](console,_0x226d4c);}catch(_0x12a6f8){try{console[_0x50bf('0xe')](_0x226d4c['join']('\x0a'));}catch(_0x3dd378){}}else try{console[_0x50bf('0x10')]['apply'](console,_0x226d4c);}catch(_0x32a5a8){try{console[_0x50bf('0x10')](_0x226d4c['join']('\x0a'));}catch(_0x31bf54){}}}};var _0x498138=/(ids\/[0-9]+-)[0-9-]+/i;var _0x2e1c7f={'imageWrapper':_0x50bf('0x15'),'sizes':{'width':_0x50bf('0x16'),'height':_0x50bf('0x16')}};var _0x4aab01=function(_0x3d545e,_0x1904a3){'use strict';_0x31bf74();_0x254830(window)['on']('QD_SIL_scroll\x20QuatroDigital.is_Callback',_0x31bf74);function _0x31bf74(){try{var _0x29d827=_0x3d545e['find'](_0x1904a3[_0x50bf('0x17')])[_0x50bf('0x18')]('.qd-sil-on')['find'](_0x50bf('0x19'));if(!_0x29d827['length'])return;var _0x2c0c32=_0x254830(window);var _0x2f7b10={'top':_0x2c0c32[_0x50bf('0x1a')]()};_0x2f7b10[_0x50bf('0x1b')]=_0x2f7b10[_0x50bf('0x1c')]+_0x2c0c32[_0x50bf('0x1d')]();var _0x3be871=_0x29d827[_0x50bf('0x1e')]()['height']();var _0x504933=_0xeb0380(_0x29d827,_0x2f7b10,_0x3be871);for(var _0x5243f4=0x0;_0x5243f4<_0x504933[_0x50bf('0x1f')];_0x5243f4++)_0x42701c(_0x254830(_0x504933[_0x5243f4]));}catch(_0x497d16){typeof console!==_0x50bf('0xd')&&typeof console[_0x50bf('0xe')]===_0x50bf('0x1')&&console[_0x50bf('0xe')]('Problemas\x20:(\x20.\x20Detalhes:\x20',_0x497d16);}}function _0x42701c(_0x1f8dbe){var _0x5c5d79=_0x1f8dbe[_0x50bf('0x20')]();_0x5c5d79['on'](_0x50bf('0x21'),function(){_0x254830(this)['addClass']('qd-sil-image-loaded');});_0x5c5d79[_0x50bf('0x22')]({'src':_0x5c5d79[0x0][_0x50bf('0x23')][_0x50bf('0x3')](_0x498138,'$1'+_0x1904a3[_0x50bf('0x24')][_0x50bf('0x25')]+'-'+_0x1904a3['sizes'][_0x50bf('0x1d')]),'width':_0x1904a3[_0x50bf('0x24')][_0x50bf('0x25')],'height':_0x1904a3[_0x50bf('0x24')][_0x50bf('0x1d')]});_0x5c5d79['addClass']('qd-sil-image')[_0x50bf('0x26')](_0x1f8dbe);_0x5c5d79[_0x50bf('0x27')](_0x1904a3[_0x50bf('0x17')])[_0x50bf('0x28')](_0x50bf('0x29'));}function _0xeb0380(_0x5a9a6d,_0x1de0be,_0x3d231e){var _0x3d9020;var _0x1e285e=[];for(var _0x3bb7ce=0x0;_0x3bb7ce<_0x5a9a6d[_0x50bf('0x1f')];_0x3bb7ce++){_0x3d9020=_0x254830(_0x5a9a6d[_0x3bb7ce])['offset']();_0x3d9020[_0x50bf('0x1b')]=_0x3d9020[_0x50bf('0x1c')]+_0x3d231e;if(!(_0x1de0be['bottom']<_0x3d9020[_0x50bf('0x1c')]||_0x1de0be['top']>_0x3d9020[_0x50bf('0x1b')])){_0x1e285e['push'](_0x5a9a6d[_0x3bb7ce]);}}return _0x1e285e;};};_0x254830['fn'][_0x50bf('0x0')]=function(_0x9b003){var _0x2a19f8=_0x254830(this);if(!_0x2a19f8['length'])return _0x2a19f8;_0x2a19f8[_0x50bf('0x2a')](function(){var _0x312f75=_0x254830(this);_0x312f75[_0x50bf('0x0')]=new _0x4aab01(_0x312f75,_0x254830['extend']({},_0x2e1c7f,_0x9b003));});return _0x2a19f8;};window[_0x50bf('0x2b')]=0x28;var _0x30f88f=QD_SIL_scrollRange;var _0x128e42=0x0;_0x254830(window)['on'](_0x50bf('0x2c'),function(){var _0x54b165=document[_0x50bf('0x2d')][_0x50bf('0x1a')];if(_0x54b165>_0x128e42+_0x30f88f||_0x54b165<_0x128e42-_0x30f88f){_0x254830(window)[_0x50bf('0x2e')]('QD_SIL_scroll');_0x128e42=_0x54b165;}});}(this));

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