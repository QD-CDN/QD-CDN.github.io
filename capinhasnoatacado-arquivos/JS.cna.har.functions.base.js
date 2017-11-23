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
			Common.qdOverlay();
			Common.setDataScrollToggle();			
			Common.applyAmazingMenuMobile();				
			Common.applyAmazingMenu();
			Common.showFooterLinks();			
			Common.applyTipBarCarousel();
			Common.applyMosaicCategorieBanners();
			Common.applyCarouselShelf();
			Common.saveAmountFix();
			Common.applyImageLoad();			
			Common.applySmartCart();			
			Common.openSearchModal();			
			Common.openAccountLinksMobile();			
		},
		ajaxStop: function() {
			Common.saveAmountFix();			
		},
		windowOnload: function() {
			Common.saveAmountFix();			
		},
		vtexBindQuickViewDestroy: function() {
			window.bindQuickView = function() {};
		},
		setDataScrollToggle: function() {
			$(document.body).attr('data-qd-scroll-limit', '100');
		},
		openSearchModal: function () {
			$('.header-qd-v1-action-search').click(function () {
				$('.modal-qd-v1-search').modal();
				return false;
			});
		},
		openAccountLinksMobile: function() {
			$('.header-qd-v1-list-link').click(function(){
				$(this).toggleClass('mobile-active').find('+ .header-qd-v1-actions-dropdown').toggleClass('mobile-active');
			});
		},
		applySmartCart: function () {
			$('.header-qd-v1-cart, .header-qd-v1-cart-link').append('<div class="smart-cart-qd-v1-wrapper"><div class="qd-sc-wrapper"></div></div>');

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
		qdOverlayClass: 'qd-am-on qd-cart-show qd-sn-on',
		qdOverlay: function () {
			$('.components-qd-v1-overlay').click(function () {
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		},
		applyAmazingMenuMobile: function() {
			var wrapper = $('.header-qd-v1-amazing-menu-mobile');

			wrapper.find('> ul > li > ul').prepend(function(){return $(this).prev().clone().wrap('<li></li>').parent()});

			wrapper.QD_amazingMenu({
				url: window.location.origin+"/qd-amazing-menu",
				callback: function() {
					$('<span class="qd-am-dropdown-trigger"><i class="fa fa-angle-right"></i></span>').appendTo(wrapper.find('.qd-am-has-ul')).click(function() {
						var $t = $(this);
						$.merge($t.parent(), $t.closest('ul')).toggleClass('qd-am-is-active');

						$t.filter(function(){return !$(this).closest('ul').is('.qd-amazing-menu');}).siblings('ul').stop(true, true).slideToggle();
					});

					wrapper.find('> ul > li > .qd-am-dropdown-trigger').click(function() {
						$('.header-qd-v1-amazing-menu-mobile-wrapper').addClass('qd-am-is-active');
						$('.header-qd-v1-amazing-menu-mobile-wrapper').animate({
				          scrollTop: 0
				        }, 200);
					});

					wrapper.find('> ul > li > ul > li:first-child').click(function(e){
						e.preventDefault();
						$(this).parents(".qd-am-is-active").removeClass('qd-am-is-active');
					});
				}
			});

			$('.header-qd-v1-amazing-menu-trigger').click(function(evt) {
				evt.preventDefault();
				$(document.body).toggleClass('qd-am-on');
			});

			$('.header-qd-v1-amazing-menu-mobile-wrapper .header-qd-v1-user-message').on('click', 'a#login', function() {
				$(document.body).removeClass('qd-am-on');
			});

			$('.header-qd-v1-amazing-menu-mobile-close').click(function(evt) {
				evt.preventDefault();
				$(document.body).removeClass('qd-am-on');
			});
		},
		applyAmazingMenu: function() {
			var amazingMenu = $('.header-qd-v1-amazing-menu');
			amazingMenu.QD_amazingMenu();
		},
		saveAmountFix: function () {
			$('.shelf-qd-v1-highlight-discount-percentage:not(.qd-on)').addClass('qd-on').each(function () {
				var $t = $(this);
				$t.text(($t.text().trim().match(/[0-9]+/) || [""]).pop() + '% off');
			});
		},
		applyTipBarCarousel: function () {
			var wrapper = $('.tip-bar-qd-v1-carousel >ul, .footer-qd-v1-tip-bar >ul');

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
			$('.mosaic-categories-qd-v1-wrapper > .box-banner').QD_mosaicBanners({
				bannerColSecurityMargin: 0,
				containerWidth: 1336,
				classFourColumn: "col-xs-12 col-sm-4 col-md-4"
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

			wrapper.slick({
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
							slidesToShow: 4,
							slidesToScroll: 4
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
		applyImageLoad: function () {
			$('.search-qd-v1-result, .carousel-qd-v1-shelf').QD_smartImageLoad({
				sizes: {
					width: '230',
					height: '230'
				}
			});
		},
		showFooterLinks: function () {
			$('.footer-qd-v1-menu-list > ul > li').click(function (e) {
				var $t = $(this);
				$t.toggleClass('qd-is-active');
				$t.find('> ul').toggleClass('qd-is-active');
			});
		}
	};

	var Home = {
		init: function() {
			Home.applySliderFull();
			Home.applyMosaicSpecialCategorieBanners();											
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		applySliderFull: function () {
			var wrapper = $('.slider-qd-v1-full, .hotsite-qd-v1-banner-slider');

			wrapper.slick({
				autoplay: true,
				dots: true,
				fade: true,
				cssEase: 'linear',
				infinite: true,
				speed: 500,
				draggable: false
			});

			wrapper.each(function () {
				$(this).find('.slick-arrow').wrapAll('<div class="slick-nav" />');
			});
		},
		applyMosaicSpecialCategorieBanners: function () {
			$('.mosaic-categories-qd-v2-wrapper > .box-banner').QD_mosaicBanners({
				bannerColSecurityMargin: 0,
				containerWidth: 1336,
				classFourColumn: "col-xs-6 col-sm-6 col-md-3"
			});
		}
	};

	var Search = {
		init: function() {
			Search.hideExtendedMenu();
			Search.openFiltersMenu();
			Search.shelfLineFix();
			Home.applySliderFull();
			Search.infinityScroll();			
		},
		ajaxStop: function() {},
		windowOnload: function() {},
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
		openFiltersMenu: function() {
			$('.search-qd-v1-navigator-trigger').click(function(e) {
				e.preventDefault();				
				$(document.body).toggleClass('qd-sn-on');
				$('.search-qd-v1-navigator-close').appendTo('.search-single-navigator').removeClass('hide');
			});

			$('.menu-departamento').prepend('<span class="search-qd-v1-navigator-close hide"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
			
			$('.search-qd-v1-navigator-close').click(function() {
				$(document.body).removeClass('qd-sn-on');
				$('.search-qd-v1-navigator-close').addClass('hide');
			});
		},
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
		infinityScroll: function () {
			$(".prateleira[id*=ResultItems]").QD_infinityScroll();
		}
	};

	var Product = {
		run: function() {},
		init: function() {
			Product.accessoriesFix();
			Product.accessoriesApplyCarousel();
			Product.forceImageZoom();
			Product.setAvailableBodyClass();
			$(window).on('skuSelectable.vtex', Product.applyCarouselThumb);
			Product.saveAmountFlag();
			Product.scrollToDescription();
			Product.qdHideUniqueSkuOption();
			Product.openShipping();
			Product.seeInstalments();
			Product.scrollToBuyButton();
			Product.showFloatingBuyBar();
		},
		ajaxStop: function() {
			Product.applyCarouselThumb();
		},
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
		applyCarouselThumb: function () {
			// Wrapper onde foi inserido as thumbs
			var thumbsSliderWrapper = $('.product-qd-v1-image-thumbs');
			thumbsSliderWrapper.removeClass('slick-initialized slick-slider');

			// Inicializa com o primeiro selecionado
			thumbsSliderWrapper.on('init', function (event, slick) {
				$(this).find('.slick-current a').addClass('ON');
				$(this).find('a').on('click', function () {
					thumbsSliderWrapper.slick('slickGoTo', $(this).closest('li').attr('data-slick-index'));
				});
			});

			thumbsSliderWrapper.slick({
				slidesToShow: 4,
				slidesToScroll: 4,
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				infinite: false,
				draggable: true,
				swipeToSlide: true,
				edgeFriction: .1,
				variableWidth: true,
				responsive: [
					{
						breakpoint: 600,
						settings: {
							arrows: false,
							slidesToShow: 4,
							slidesToScroll: 4,
							variableWidth: false
						}
					}
				]
			});
		},
		saveAmountFlag: function () {
			var flag = $('.product-qd-v1-stamps-highlight-discount');

			$(window).on('skuSelected.vtex', function (e, sku, data) {
				if (!flag.length)
					flag = $('<div class="product-qd-v1-stamps-highlight-discount"></div>').prependTo('.product-qd-v1-stamps');

				if (data.listPrice > data.bestPrice)
					flag.text(parseInt(100 - data.bestPrice / data.listPrice * 100) + "% off").show();
				else
					flag.hide();
			});

			if (skuJson.skus.length >= 1) {
				if (!flag.length)
					flag = $('<div class="product-qd-v1-stamps-highlight-discount"></div>').prependTo('.product-qd-v1-stamps');

				if (skuJson.skus[0].listPrice > skuJson.skus[0].bestPrice)
					flag.text(parseInt(100 - skuJson.skus[0].bestPrice / skuJson.skus[0].listPrice * 100) + "% off").show();
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
		openShipping: function () {
			if (typeof window.ShippingValue === "function")
				window.ShippingValue();
		},
		seeInstalments: function () {
			$('.product-qd-v1-see-installments').click(function (e) {
				e.preventDefault();
				$(this).toggleClass('qd-is-active');
				$('.product-qd-v1-installments-method').toggleClass('qd-is-visible');
			});
		},
		showFloatingBuyBar: function () {
			var targetOffset = $(".product-qd-v1-buy-button").offset().top - 10;
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
		scrollToBuyButton: function () {
			$('.product-qd-v1-buy-button-float').click(function (e) {
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $('.product-qd-v1-name').offset().top - 100
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
var _0x0bb5=['2.1','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','QD_smartStockAvailable','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','alerta','toLowerCase','info','apply','warn','removeClass','qd-ssa-sku-no-selected','addClass','qd-ssa-sku-selected','SkuSellersInformation','attr','data-qd-ssa-qtt','each','find','[data-qd-ssa-text]','hide','qd-ssa-hide','qd-ssa-show','filter','[data-qd-ssa-text=\x22','html','replace','show','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','message','length','qd-ssa-on','skus','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','AvailableQuantity','trigger','QuatroDigital.ssa.prodUnavailable','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','off','ncvaunfabngnpnqb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','join','toUpperCase','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','initialSkuSelected','QuatroDigital.ssa.skuSelected','prod','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','unavailable','vtex.sku.selected.QD','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','available','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','function','qdAjax','qdAjaxQueue','url','opts','success','call','error','complete','parameters','callbackFns','boolean','successPopulated','errorPopulated','completePopulated','object','jqXHR','clearQueueDelay','undefined','ajax','readyState','data','textStatus','errorThrown','version'];(function(_0x19ee85,_0x59262c){var _0x1cf3a5=function(_0x11da9f){while(--_0x11da9f){_0x19ee85['push'](_0x19ee85['shift']());}};_0x1cf3a5(++_0x59262c);}(_0x0bb5,0x13f));var _0x50bb=function(_0x1339e1,_0x3c85b4){_0x1339e1=_0x1339e1-0x0;var _0x2433fb=_0x0bb5[_0x1339e1];return _0x2433fb;};(function(_0x3454a9){if(_0x50bb('0x0')!==typeof _0x3454a9[_0x50bb('0x1')]){var _0x117e36={};_0x3454a9[_0x50bb('0x2')]=_0x117e36;_0x3454a9[_0x50bb('0x1')]=function(_0x451b4c){var _0x33f2c5=_0x3454a9['extend']({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x451b4c);var _0x4a105c=escape(encodeURIComponent(_0x33f2c5[_0x50bb('0x3')]));_0x117e36[_0x4a105c]=_0x117e36[_0x4a105c]||{};_0x117e36[_0x4a105c][_0x50bb('0x4')]=_0x117e36[_0x4a105c][_0x50bb('0x4')]||[];_0x117e36[_0x4a105c][_0x50bb('0x4')]['push']({'success':function(_0x4ab8d7,_0x2bede8,_0x1c2174){_0x33f2c5[_0x50bb('0x5')][_0x50bb('0x6')](this,_0x4ab8d7,_0x2bede8,_0x1c2174);},'error':function(_0x5512e1,_0x36f7a1,_0x2edeeb){_0x33f2c5[_0x50bb('0x7')][_0x50bb('0x6')](this,_0x5512e1,_0x36f7a1,_0x2edeeb);},'complete':function(_0x346422,_0x304c3a){_0x33f2c5[_0x50bb('0x8')]['call'](this,_0x346422,_0x304c3a);}});_0x117e36[_0x4a105c][_0x50bb('0x9')]=_0x117e36[_0x4a105c]['parameters']||{'success':{},'error':{},'complete':{}};_0x117e36[_0x4a105c][_0x50bb('0xa')]=_0x117e36[_0x4a105c][_0x50bb('0xa')]||{};_0x117e36[_0x4a105c][_0x50bb('0xa')]['successPopulated']=_0x50bb('0xb')===typeof _0x117e36[_0x4a105c][_0x50bb('0xa')][_0x50bb('0xc')]?_0x117e36[_0x4a105c]['callbackFns'][_0x50bb('0xc')]:!0x1;_0x117e36[_0x4a105c]['callbackFns'][_0x50bb('0xd')]=_0x50bb('0xb')===typeof _0x117e36[_0x4a105c][_0x50bb('0xa')][_0x50bb('0xd')]?_0x117e36[_0x4a105c][_0x50bb('0xa')]['errorPopulated']:!0x1;_0x117e36[_0x4a105c][_0x50bb('0xa')][_0x50bb('0xe')]='boolean'===typeof _0x117e36[_0x4a105c][_0x50bb('0xa')]['completePopulated']?_0x117e36[_0x4a105c][_0x50bb('0xa')][_0x50bb('0xe')]:!0x1;_0x451b4c=_0x3454a9['extend']({},_0x33f2c5,{'success':function(_0x4f1c0a,_0x43465b,_0x1499dc){_0x117e36[_0x4a105c][_0x50bb('0x9')][_0x50bb('0x5')]={'data':_0x4f1c0a,'textStatus':_0x43465b,'jqXHR':_0x1499dc};_0x117e36[_0x4a105c]['callbackFns'][_0x50bb('0xc')]=!0x0;for(var _0x32bfc3 in _0x117e36[_0x4a105c][_0x50bb('0x4')])'object'===typeof _0x117e36[_0x4a105c][_0x50bb('0x4')][_0x32bfc3]&&(_0x117e36[_0x4a105c][_0x50bb('0x4')][_0x32bfc3][_0x50bb('0x5')]['call'](this,_0x4f1c0a,_0x43465b,_0x1499dc),_0x117e36[_0x4a105c][_0x50bb('0x4')][_0x32bfc3]['success']=function(){});},'error':function(_0x1c81a1,_0x3391da,_0x1a2a0b){_0x117e36[_0x4a105c][_0x50bb('0x9')][_0x50bb('0x7')]={'errorThrown':_0x1a2a0b,'textStatus':_0x3391da,'jqXHR':_0x1c81a1};_0x117e36[_0x4a105c][_0x50bb('0xa')]['errorPopulated']=!0x0;for(var _0xad17ac in _0x117e36[_0x4a105c][_0x50bb('0x4')])_0x50bb('0xf')===typeof _0x117e36[_0x4a105c][_0x50bb('0x4')][_0xad17ac]&&(_0x117e36[_0x4a105c]['opts'][_0xad17ac][_0x50bb('0x7')]['call'](this,_0x1c81a1,_0x3391da,_0x1a2a0b),_0x117e36[_0x4a105c]['opts'][_0xad17ac][_0x50bb('0x7')]=function(){});},'complete':function(_0x491632,_0x5cfe4b){_0x117e36[_0x4a105c][_0x50bb('0x9')][_0x50bb('0x8')]={'textStatus':_0x5cfe4b,'jqXHR':_0x491632};_0x117e36[_0x4a105c][_0x50bb('0xa')][_0x50bb('0xe')]=!0x0;for(var _0x17c158 in _0x117e36[_0x4a105c][_0x50bb('0x4')])_0x50bb('0xf')===typeof _0x117e36[_0x4a105c][_0x50bb('0x4')][_0x17c158]&&(_0x117e36[_0x4a105c]['opts'][_0x17c158][_0x50bb('0x8')][_0x50bb('0x6')](this,_0x491632,_0x5cfe4b),_0x117e36[_0x4a105c][_0x50bb('0x4')][_0x17c158][_0x50bb('0x8')]=function(){});isNaN(parseInt(_0x33f2c5['clearQueueDelay']))||setTimeout(function(){_0x117e36[_0x4a105c][_0x50bb('0x10')]=void 0x0;_0x117e36[_0x4a105c][_0x50bb('0x4')]=void 0x0;_0x117e36[_0x4a105c][_0x50bb('0x9')]=void 0x0;_0x117e36[_0x4a105c][_0x50bb('0xa')]=void 0x0;},_0x33f2c5[_0x50bb('0x11')]);}});_0x50bb('0x12')===typeof _0x117e36[_0x4a105c][_0x50bb('0x10')]?_0x117e36[_0x4a105c][_0x50bb('0x10')]=_0x3454a9[_0x50bb('0x13')](_0x451b4c):_0x117e36[_0x4a105c][_0x50bb('0x10')]&&_0x117e36[_0x4a105c][_0x50bb('0x10')][_0x50bb('0x14')]&&0x4==_0x117e36[_0x4a105c]['jqXHR'][_0x50bb('0x14')]&&(_0x117e36[_0x4a105c][_0x50bb('0xa')][_0x50bb('0xc')]&&_0x451b4c[_0x50bb('0x5')](_0x117e36[_0x4a105c][_0x50bb('0x9')][_0x50bb('0x5')][_0x50bb('0x15')],_0x117e36[_0x4a105c][_0x50bb('0x9')][_0x50bb('0x5')][_0x50bb('0x16')],_0x117e36[_0x4a105c][_0x50bb('0x9')]['success'][_0x50bb('0x10')]),_0x117e36[_0x4a105c][_0x50bb('0xa')][_0x50bb('0xd')]&&_0x451b4c[_0x50bb('0x7')](_0x117e36[_0x4a105c][_0x50bb('0x9')][_0x50bb('0x7')]['jqXHR'],_0x117e36[_0x4a105c]['parameters'][_0x50bb('0x7')]['textStatus'],_0x117e36[_0x4a105c][_0x50bb('0x9')][_0x50bb('0x7')][_0x50bb('0x17')]),_0x117e36[_0x4a105c][_0x50bb('0xa')][_0x50bb('0xe')]&&_0x451b4c['complete'](_0x117e36[_0x4a105c][_0x50bb('0x9')]['complete'][_0x50bb('0x10')],_0x117e36[_0x4a105c][_0x50bb('0x9')][_0x50bb('0x8')]['textStatus']));};_0x3454a9['qdAjax'][_0x50bb('0x18')]=_0x50bb('0x19');}}(jQuery));(function(_0x43e86f){function _0x21a180(_0x51750b,_0x3c273b){_0x4c437a['qdAjax']({'url':'/produto/sku/'+_0x51750b,'clearQueueDelay':null,'success':_0x3c273b,'error':function(){_0x1ef231(_0x50bb('0x1a'));}});}var _0x4c437a=jQuery;if(_0x50bb('0x0')!==typeof _0x4c437a['fn'][_0x50bb('0x1b')]){var _0x1ef231=function(_0x437524,_0x2c079a){if(_0x50bb('0xf')===typeof console){var _0x46039a;_0x50bb('0xf')===typeof _0x437524?(_0x437524['unshift']('[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a'),_0x46039a=_0x437524):_0x46039a=[_0x50bb('0x1c')+_0x437524];_0x50bb('0x12')===typeof _0x2c079a||_0x50bb('0x1d')!==_0x2c079a[_0x50bb('0x1e')]()&&'aviso'!==_0x2c079a[_0x50bb('0x1e')]()?'undefined'!==typeof _0x2c079a&&_0x50bb('0x1f')===_0x2c079a[_0x50bb('0x1e')]()?console[_0x50bb('0x1f')][_0x50bb('0x20')](console,_0x46039a):console[_0x50bb('0x7')][_0x50bb('0x20')](console,_0x46039a):console[_0x50bb('0x21')][_0x50bb('0x20')](console,_0x46039a);}},_0x1f156e={},_0x3a9fe4=function(_0x425632,_0x46c1c3){function _0x349474(_0x24e375){try{_0x425632[_0x50bb('0x22')](_0x50bb('0x23'))[_0x50bb('0x24')](_0x50bb('0x25'));var _0x511013=_0x24e375[0x0][_0x50bb('0x26')][0x0]['AvailableQuantity'];_0x425632[_0x50bb('0x27')](_0x50bb('0x28'),_0x511013);_0x425632[_0x50bb('0x29')](function(){var _0x425632=_0x4c437a(this)[_0x50bb('0x2a')](_0x50bb('0x2b'));if(0x1>_0x511013)return _0x425632[_0x50bb('0x2c')]()[_0x50bb('0x24')](_0x50bb('0x2d'))[_0x50bb('0x22')](_0x50bb('0x2e'));var _0x24e375=_0x425632[_0x50bb('0x2f')](_0x50bb('0x30')+_0x511013+'\x22]');_0x24e375=_0x24e375['length']?_0x24e375:_0x425632[_0x50bb('0x2f')]('[data-qd-ssa-text=\x22default\x22]');_0x425632[_0x50bb('0x2c')]()[_0x50bb('0x24')](_0x50bb('0x2d'))[_0x50bb('0x22')](_0x50bb('0x2e'));_0x24e375[_0x50bb('0x31')]((_0x24e375[_0x50bb('0x31')]()||'')[_0x50bb('0x32')]('#qtt',_0x511013));_0x24e375[_0x50bb('0x33')]()[_0x50bb('0x24')](_0x50bb('0x2e'))[_0x50bb('0x22')](_0x50bb('0x2d'));});}catch(_0x5075f9){_0x1ef231([_0x50bb('0x34'),_0x5075f9[_0x50bb('0x35')]]);}}if(_0x425632[_0x50bb('0x36')]){_0x425632[_0x50bb('0x24')](_0x50bb('0x37'));_0x425632['addClass']('qd-ssa-sku-no-selected');try{_0x425632[_0x50bb('0x24')]('qd-ssa-skus-'+vtxctx[_0x50bb('0x38')]['split'](';')[_0x50bb('0x36')]);}catch(_0x24c9f3){_0x1ef231([_0x50bb('0x39'),_0x24c9f3['message']]);}_0x4c437a(window)['on'](_0x50bb('0x3a'),function(_0x1bb951,_0x588dfe,_0x184147){try{_0x21a180(_0x184147[_0x50bb('0x3b')],function(_0x8d62af){_0x349474(_0x8d62af);0x1===vtxctx[_0x50bb('0x38')]['split'](';')[_0x50bb('0x36')]&&0x0==_0x8d62af[0x0][_0x50bb('0x26')][0x0][_0x50bb('0x3c')]&&_0x4c437a(window)[_0x50bb('0x3d')](_0x50bb('0x3e'));});}catch(_0x5e61fe){_0x1ef231([_0x50bb('0x3f'),_0x5e61fe['message']]);}});_0x4c437a(window)[_0x50bb('0x40')]('vtex.sku.selected.QD');_0x4c437a(window)['on']('QuatroDigital.ssa.prodUnavailable',function(){_0x425632[_0x50bb('0x24')]('qd-ssa-sku-prod-unavailable')['hide']();});}};_0x43e86f=function(_0x387f9f){var _0xa3b3f4={'p':_0x50bb('0x41')};return function(_0x1bbebc){var _0x3ef5d8=function(_0x3b78bd){return _0x3b78bd;};var _0x284eb7=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x1bbebc=_0x1bbebc['d'+_0x284eb7[0x10]+'c'+_0x284eb7[0x11]+'m'+_0x3ef5d8(_0x284eb7[0x1])+'n'+_0x284eb7[0xd]]['l'+_0x284eb7[0x12]+'c'+_0x284eb7[0x0]+'ti'+_0x3ef5d8('o')+'n'];var _0x1408fa=function(_0x57d749){return escape(encodeURIComponent(_0x57d749['replace'](/\./g,'¨')[_0x50bb('0x32')](/[a-zA-Z]/g,function(_0x345bb5){return String[_0x50bb('0x42')](('Z'>=_0x345bb5?0x5a:0x7a)>=(_0x345bb5=_0x345bb5[_0x50bb('0x43')](0x0)+0xd)?_0x345bb5:_0x345bb5-0x1a);})));};var _0x45d4bf=_0x1408fa(_0x1bbebc[[_0x284eb7[0x9],_0x3ef5d8('o'),_0x284eb7[0xc],_0x284eb7[_0x3ef5d8(0xd)]][_0x50bb('0x44')]('')]);_0x1408fa=_0x1408fa((window[['js',_0x3ef5d8('no'),'m',_0x284eb7[0x1],_0x284eb7[0x4][_0x50bb('0x45')](),'ite'][_0x50bb('0x44')]('')]||_0x50bb('0x46'))+['.v',_0x284eb7[0xd],'e',_0x3ef5d8('x'),'co',_0x3ef5d8('mm'),_0x50bb('0x47'),_0x284eb7[0x1],'.c',_0x3ef5d8('o'),'m.',_0x284eb7[0x13],'r'][_0x50bb('0x44')](''));for(var _0x201c1f in _0xa3b3f4){if(_0x1408fa===_0x201c1f+_0xa3b3f4[_0x201c1f]||_0x45d4bf===_0x201c1f+_0xa3b3f4[_0x201c1f]){var _0x5dbfcb='tr'+_0x284eb7[0x11]+'e';break;}_0x5dbfcb='f'+_0x284eb7[0x0]+'ls'+_0x3ef5d8(_0x284eb7[0x1])+'';}_0x3ef5d8=!0x1;-0x1<_0x1bbebc[[_0x284eb7[0xc],'e',_0x284eb7[0x0],'rc',_0x284eb7[0x9]][_0x50bb('0x44')]('')][_0x50bb('0x48')](_0x50bb('0x49'))&&(_0x3ef5d8=!0x0);return[_0x5dbfcb,_0x3ef5d8];}(_0x387f9f);}(window);if(!eval(_0x43e86f[0x0]))return _0x43e86f[0x1]?_0x1ef231(_0x50bb('0x4a')):!0x1;_0x4c437a['fn'][_0x50bb('0x1b')]=function(_0x5b20f7){var _0x261bf5=_0x4c437a(this);_0x5b20f7=_0x4c437a['extend'](!0x0,{},_0x1f156e,_0x5b20f7);_0x261bf5['qdPlugin']=new _0x3a9fe4(_0x261bf5,_0x5b20f7);try{_0x50bb('0xf')===typeof _0x4c437a['fn'][_0x50bb('0x1b')][_0x50bb('0x4b')]&&_0x4c437a(window)[_0x50bb('0x3d')](_0x50bb('0x4c'),[_0x4c437a['fn'][_0x50bb('0x1b')][_0x50bb('0x4b')][_0x50bb('0x4d')],_0x4c437a['fn'][_0x50bb('0x1b')][_0x50bb('0x4b')][_0x50bb('0x3b')]]);}catch(_0x534ebc){_0x1ef231([_0x50bb('0x4e'),_0x534ebc['message']]);}_0x4c437a['fn'][_0x50bb('0x1b')][_0x50bb('0x4f')]&&_0x4c437a(window)['trigger'](_0x50bb('0x3e'));return _0x261bf5;};_0x4c437a(window)['on'](_0x50bb('0x50'),function(_0xafa1b7,_0x3f8c1f,_0x46ea8f){try{_0x4c437a['fn'][_0x50bb('0x1b')][_0x50bb('0x4b')]={'prod':_0x3f8c1f,'sku':_0x46ea8f},_0x4c437a(this)[_0x50bb('0x40')](_0xafa1b7);}catch(_0x580d6b){_0x1ef231([_0x50bb('0x51'),_0x580d6b[_0x50bb('0x35')]]);}});_0x4c437a(window)['on'](_0x50bb('0x52'),function(_0x4a226d,_0x1d1d00,_0x2779b3){try{for(var _0x46651a=_0x2779b3[_0x50bb('0x36')],_0x9914b6=_0x1d1d00=0x0;_0x9914b6<_0x46651a&&!_0x2779b3[_0x9914b6][_0x50bb('0x53')];_0x9914b6++)_0x1d1d00+=0x1;_0x46651a<=_0x1d1d00&&(_0x4c437a['fn']['QD_smartStockAvailable'][_0x50bb('0x4f')]=!0x0);_0x4c437a(this)[_0x50bb('0x40')](_0x4a226d);}catch(_0x409082){_0x1ef231([_0x50bb('0x54'),_0x409082[_0x50bb('0x35')]]);}});_0x4c437a(function(){_0x4c437a(_0x50bb('0x55'))['QD_smartStockAvailable']();});}}(window));
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
var _0x22ea=['qd-am-first','qd-am-last','ncvaunfabngnpnqb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','charCodeAt','toUpperCase','ite','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','url','html','find','img[alt=\x27','attr','data-qdam-value','.box-banner','insertBefore','hide','qd-am-content-loaded','trim','[class*=\x27colunas\x27]','clone','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]',':not(ul)','qd-am-elem-','>li','qd-amazing-menu','>ul','qd-am-column','qd-am-dropdown','children','qd-am-level-','qd-am-','-li','callback','exec','.qd_amazing_menu_auto','getParent','function','QD_amazingMenu','object','undefined','error','info','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','apply','join','warn','qdAmAddNdx','each','addClass','qd-am-li-','first'];(function(_0x297bd6,_0xd4ee59){var _0xf003c2=function(_0xebccd7){while(--_0xebccd7){_0x297bd6['push'](_0x297bd6['shift']());}};_0xf003c2(++_0xd4ee59);}(_0x22ea,0x1d8));var _0xa22e=function(_0x1e2900,_0x429936){_0x1e2900=_0x1e2900-0x0;var _0x1dbc97=_0x22ea[_0x1e2900];return _0x1dbc97;};(function(_0x3e2031){_0x3e2031['fn'][_0xa22e('0x0')]=_0x3e2031['fn']['closest'];}(jQuery));(function(_0x267cf2){var _0x3daa37;var _0x21e118=jQuery;if(_0xa22e('0x1')!==typeof _0x21e118['fn'][_0xa22e('0x2')]){var _0x59e287={'url':'/qd-amazing-menu','callback':function(){},'ajaxCallback':function(){}};var _0x172a46=function(_0x2088bc,_0x35d380){if(_0xa22e('0x3')===typeof console&&_0xa22e('0x4')!==typeof console[_0xa22e('0x5')]&&_0xa22e('0x4')!==typeof console[_0xa22e('0x6')]&&_0xa22e('0x4')!==typeof console['warn']){var _0x4387a7;_0xa22e('0x3')===typeof _0x2088bc?(_0x2088bc['unshift'](_0xa22e('0x7')),_0x4387a7=_0x2088bc):_0x4387a7=[_0xa22e('0x7')+_0x2088bc];if(_0xa22e('0x4')===typeof _0x35d380||_0xa22e('0x8')!==_0x35d380['toLowerCase']()&&'aviso'!==_0x35d380[_0xa22e('0x9')]())if(_0xa22e('0x4')!==typeof _0x35d380&&_0xa22e('0x6')===_0x35d380[_0xa22e('0x9')]())try{console[_0xa22e('0x6')][_0xa22e('0xa')](console,_0x4387a7);}catch(_0x36d769){try{console[_0xa22e('0x6')](_0x4387a7[_0xa22e('0xb')]('\x0a'));}catch(_0x16d760){}}else try{console[_0xa22e('0x5')][_0xa22e('0xa')](console,_0x4387a7);}catch(_0x2b59a0){try{console[_0xa22e('0x5')](_0x4387a7[_0xa22e('0xb')]('\x0a'));}catch(_0x209273){}}else try{console[_0xa22e('0xc')][_0xa22e('0xa')](console,_0x4387a7);}catch(_0x3b0f9d){try{console[_0xa22e('0xc')](_0x4387a7[_0xa22e('0xb')]('\x0a'));}catch(_0x28eef5){}}}};_0x21e118['fn'][_0xa22e('0xd')]=function(){var _0x3ea0df=_0x21e118(this);_0x3ea0df[_0xa22e('0xe')](function(_0x590975){_0x21e118(this)[_0xa22e('0xf')](_0xa22e('0x10')+_0x590975);});_0x3ea0df[_0xa22e('0x11')]()[_0xa22e('0xf')](_0xa22e('0x12'));_0x3ea0df['last']()[_0xa22e('0xf')](_0xa22e('0x13'));return _0x3ea0df;};_0x21e118['fn'][_0xa22e('0x2')]=function(){};_0x267cf2=function(_0x5a3790){var _0x3fd6b4={'p':_0xa22e('0x14')};return function(_0xcccaca){var _0x283318=function(_0x301b30){return _0x301b30;};var _0x24a1ed=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0xcccaca=_0xcccaca['d'+_0x24a1ed[0x10]+'c'+_0x24a1ed[0x11]+'m'+_0x283318(_0x24a1ed[0x1])+'n'+_0x24a1ed[0xd]]['l'+_0x24a1ed[0x12]+'c'+_0x24a1ed[0x0]+'ti'+_0x283318('o')+'n'];var _0x55d654=function(_0x5c5717){return escape(encodeURIComponent(_0x5c5717[_0xa22e('0x15')](/\./g,'¨')[_0xa22e('0x15')](/[a-zA-Z]/g,function(_0x364cf0){return String['fromCharCode'](('Z'>=_0x364cf0?0x5a:0x7a)>=(_0x364cf0=_0x364cf0[_0xa22e('0x16')](0x0)+0xd)?_0x364cf0:_0x364cf0-0x1a);})));};var _0x429749=_0x55d654(_0xcccaca[[_0x24a1ed[0x9],_0x283318('o'),_0x24a1ed[0xc],_0x24a1ed[_0x283318(0xd)]][_0xa22e('0xb')]('')]);_0x55d654=_0x55d654((window[['js',_0x283318('no'),'m',_0x24a1ed[0x1],_0x24a1ed[0x4][_0xa22e('0x17')](),_0xa22e('0x18')][_0xa22e('0xb')]('')]||'---')+['.v',_0x24a1ed[0xd],'e',_0x283318('x'),'co',_0x283318('mm'),'erc',_0x24a1ed[0x1],'.c',_0x283318('o'),'m.',_0x24a1ed[0x13],'r'][_0xa22e('0xb')](''));for(var _0x5bfa2e in _0x3fd6b4){if(_0x55d654===_0x5bfa2e+_0x3fd6b4[_0x5bfa2e]||_0x429749===_0x5bfa2e+_0x3fd6b4[_0x5bfa2e]){var _0x220d96='tr'+_0x24a1ed[0x11]+'e';break;}_0x220d96='f'+_0x24a1ed[0x0]+'ls'+_0x283318(_0x24a1ed[0x1])+'';}_0x283318=!0x1;-0x1<_0xcccaca[[_0x24a1ed[0xc],'e',_0x24a1ed[0x0],'rc',_0x24a1ed[0x9]]['join']('')][_0xa22e('0x19')](_0xa22e('0x1a'))&&(_0x283318=!0x0);return[_0x220d96,_0x283318];}(_0x5a3790);}(window);if(!eval(_0x267cf2[0x0]))return _0x267cf2[0x1]?_0x172a46(_0xa22e('0x1b')):!0x1;var _0x1fb7a7=function(_0x800569){var _0x49298f=_0x800569['find'](_0xa22e('0x1c'));var _0x46124b=_0x49298f[_0xa22e('0x1d')](_0xa22e('0x1e'));var _0x1fad61=_0x49298f[_0xa22e('0x1d')](_0xa22e('0x1f'));if(_0x46124b[_0xa22e('0x20')]||_0x1fad61['length'])_0x46124b[_0xa22e('0x21')]()['addClass'](_0xa22e('0x22')),_0x1fad61['parent']()[_0xa22e('0xf')](_0xa22e('0x23')),_0x21e118[_0xa22e('0x24')]({'url':_0x3daa37[_0xa22e('0x25')],'dataType':_0xa22e('0x26'),'success':function(_0x502994){var _0x203f12=_0x21e118(_0x502994);_0x46124b[_0xa22e('0xe')](function(){var _0x502994=_0x21e118(this);var _0x84d659=_0x203f12[_0xa22e('0x27')](_0xa22e('0x28')+_0x502994[_0xa22e('0x29')](_0xa22e('0x2a'))+'\x27]');_0x84d659['length']&&(_0x84d659[_0xa22e('0xe')](function(){_0x21e118(this)[_0xa22e('0x0')](_0xa22e('0x2b'))['clone']()[_0xa22e('0x2c')](_0x502994);}),_0x502994[_0xa22e('0x2d')]());})[_0xa22e('0xf')](_0xa22e('0x2e'));_0x1fad61['each'](function(){var _0x502994={};var _0xb74ab4=_0x21e118(this);_0x203f12[_0xa22e('0x27')]('h2')['each'](function(){if(_0x21e118(this)['text']()[_0xa22e('0x2f')]()['toLowerCase']()==_0xb74ab4['attr'](_0xa22e('0x2a'))[_0xa22e('0x2f')]()[_0xa22e('0x9')]())return _0x502994=_0x21e118(this),!0x1;});_0x502994[_0xa22e('0x20')]&&(_0x502994[_0xa22e('0xe')](function(){_0x21e118(this)['getParent'](_0xa22e('0x30'))[_0xa22e('0x31')]()[_0xa22e('0x2c')](_0xb74ab4);}),_0xb74ab4[_0xa22e('0x2d')]());})['addClass'](_0xa22e('0x2e'));},'error':function(){_0x172a46(_0xa22e('0x32')+_0x3daa37[_0xa22e('0x25')]+'\x27\x20falho.');},'complete':function(){_0x3daa37[_0xa22e('0x33')][_0xa22e('0x34')](this);_0x21e118(window)[_0xa22e('0x35')](_0xa22e('0x36'),_0x800569);},'clearQueueDelay':0xbb8});};_0x21e118[_0xa22e('0x2')]=function(_0x4370ec){var _0x398cbd=_0x4370ec['find'](_0xa22e('0x37'))[_0xa22e('0xe')](function(){var _0x489d2a=_0x21e118(this);if(!_0x489d2a['length'])return _0x172a46(['UL\x20do\x20menu\x20não\x20encontrada',_0x4370ec],_0xa22e('0x8'));_0x489d2a['find']('li\x20>ul')[_0xa22e('0x21')]()[_0xa22e('0xf')]('qd-am-has-ul');_0x489d2a['find']('li')['each'](function(){var _0x55052a=_0x21e118(this);var _0x43e184=_0x55052a['children'](_0xa22e('0x38'));_0x43e184[_0xa22e('0x20')]&&_0x55052a[_0xa22e('0xf')](_0xa22e('0x39')+_0x43e184[_0xa22e('0x11')]()['text']()['trim']()['replaceSpecialChars']()['replace'](/\./g,'')[_0xa22e('0x15')](/\s/g,'-')[_0xa22e('0x9')]());});var _0x2d8589=_0x489d2a[_0xa22e('0x27')](_0xa22e('0x3a'))[_0xa22e('0xd')]();_0x489d2a[_0xa22e('0xf')](_0xa22e('0x3b'));_0x2d8589=_0x2d8589[_0xa22e('0x27')](_0xa22e('0x3c'));_0x2d8589[_0xa22e('0xe')](function(){var _0x14253d=_0x21e118(this);_0x14253d[_0xa22e('0x27')](_0xa22e('0x3a'))[_0xa22e('0xd')]()[_0xa22e('0xf')](_0xa22e('0x3d'));_0x14253d[_0xa22e('0xf')]('qd-am-dropdown-menu');_0x14253d[_0xa22e('0x21')]()[_0xa22e('0xf')](_0xa22e('0x3e'));});_0x2d8589[_0xa22e('0xf')](_0xa22e('0x3e'));var _0x45898a=0x0,_0x267cf2=function(_0x290536){_0x45898a+=0x1;_0x290536=_0x290536[_0xa22e('0x3f')]('li')['children']('*');_0x290536['length']&&(_0x290536[_0xa22e('0xf')](_0xa22e('0x40')+_0x45898a),_0x267cf2(_0x290536));};_0x267cf2(_0x489d2a);_0x489d2a['add'](_0x489d2a[_0xa22e('0x27')]('ul'))[_0xa22e('0xe')](function(){var _0x5e811c=_0x21e118(this);_0x5e811c['addClass'](_0xa22e('0x41')+_0x5e811c['children']('li')[_0xa22e('0x20')]+_0xa22e('0x42'));});});_0x1fb7a7(_0x398cbd);_0x3daa37[_0xa22e('0x43')][_0xa22e('0x34')](this);_0x21e118(window)[_0xa22e('0x35')]('QuatroDigital.am.callback',_0x4370ec);};_0x21e118['fn']['QD_amazingMenu']=function(_0x26583c){var _0x1adf6b=_0x21e118(this);if(!_0x1adf6b[_0xa22e('0x20')])return _0x1adf6b;_0x3daa37=_0x21e118['extend']({},_0x59e287,_0x26583c);_0x1adf6b[_0xa22e('0x44')]=new _0x21e118[(_0xa22e('0x2'))](_0x21e118(this));return _0x1adf6b;};_0x21e118(function(){_0x21e118(_0xa22e('0x45'))['QD_amazingMenu']();});}}(this));
/* Quatro Digital Smart Cart */
var _0xbd51=['Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','name','smartCheckout','vtexjs','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','body','removeClass','qd-bb-lightBoxBodyProdAdd','keyup.qd_ddc_closeFn','keyCode','qd-bb-lightBoxProdAdd','find','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20input','val','keyup.qd_ddc_cep','updateOnlyHover','cartIsEmpty','texts','cartTotal','#value','#items','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','html','linkCart','linkCheckout','.qd-ddc-shipping','emptyCart','each','call','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','allTotal','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','.qd-ddc-wrapper','getOrderForm','_QuatroDigital_AmountProduct','exec','QD_checkoutQueue','totalizers','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','addClass','.qd-ddc-prodWrapper2','empty','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','attr','availability','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','.qd-ddc-quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','message','filter','[data-sku=\x27','lastSku','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','timeRemoveNewItemClass','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','actionButtons','data-sku','changeQantity','data-sku-index','preventDefault','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','click.qd_ddc_remove','removeProduct','stop','slideUp','remove','shippingCalculate','qdDdcLastPostalCode','calculateShipping','BRA','done','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','data','boolean','getCartInfoByUrl','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','quantity','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','simpleCart','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','Oooops!\x20','buyButtonClicked','allowRecalculate','productId','prod_','prodId','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','prepend','.qdDdcContainer','selector','dropDown','buyButton','QD_buyButton','smartCart','getParent','replace','abs','undefined','round','toFixed','split','length','join','_QuatroDigital_CartData','callback','function','error','object','warn','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','toLowerCase','aviso','info','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','ncvaunfabngnpnqb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','ite','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend'];(function(_0x4bb3e2,_0x2637ce){var _0x1fda28=function(_0x44c03c){while(--_0x44c03c){_0x4bb3e2['push'](_0x4bb3e2['shift']());}};_0x1fda28(++_0x2637ce);}(_0xbd51,0xaa));var _0x1bd5=function(_0xb5df88,_0x3079d6){_0xb5df88=_0xb5df88-0x0;var _0x1523cc=_0xbd51[_0xb5df88];return _0x1523cc;};(function(_0x2ddaa6){_0x2ddaa6['fn'][_0x1bd5('0x0')]=_0x2ddaa6['fn']['closest'];}(jQuery));function qd_number_format(_0x4d1bba,_0x58af16,_0x531028,_0x3bce00){_0x4d1bba=(_0x4d1bba+'')[_0x1bd5('0x1')](/[^0-9+\-Ee.]/g,'');_0x4d1bba=isFinite(+_0x4d1bba)?+_0x4d1bba:0x0;_0x58af16=isFinite(+_0x58af16)?Math[_0x1bd5('0x2')](_0x58af16):0x0;_0x3bce00='undefined'===typeof _0x3bce00?',':_0x3bce00;_0x531028=_0x1bd5('0x3')===typeof _0x531028?'.':_0x531028;var _0x27d58f='',_0x27d58f=function(_0xd8418f,_0x4a7f90){var _0x58af16=Math['pow'](0xa,_0x4a7f90);return''+(Math[_0x1bd5('0x4')](_0xd8418f*_0x58af16)/_0x58af16)[_0x1bd5('0x5')](_0x4a7f90);},_0x27d58f=(_0x58af16?_0x27d58f(_0x4d1bba,_0x58af16):''+Math[_0x1bd5('0x4')](_0x4d1bba))[_0x1bd5('0x6')]('.');0x3<_0x27d58f[0x0][_0x1bd5('0x7')]&&(_0x27d58f[0x0]=_0x27d58f[0x0][_0x1bd5('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x3bce00));(_0x27d58f[0x1]||'')['length']<_0x58af16&&(_0x27d58f[0x1]=_0x27d58f[0x1]||'',_0x27d58f[0x1]+=Array(_0x58af16-_0x27d58f[0x1][_0x1bd5('0x7')]+0x1)['join']('0'));return _0x27d58f[_0x1bd5('0x8')](_0x531028);};(function(){try{window[_0x1bd5('0x9')]=window[_0x1bd5('0x9')]||{},window[_0x1bd5('0x9')][_0x1bd5('0xa')]=window[_0x1bd5('0x9')][_0x1bd5('0xa')]||$['Callbacks']();}catch(_0x5650b5){_0x1bd5('0x3')!==typeof console&&_0x1bd5('0xb')===typeof console[_0x1bd5('0xc')]&&console[_0x1bd5('0xc')]('Oooops!\x20',_0x5650b5['message']);}}());(function(_0xa63190){try{var _0xc7277e=jQuery,_0x2b2c57=function(_0x4793dd,_0x43ea3e){if(_0x1bd5('0xd')===typeof console&&_0x1bd5('0x3')!==typeof console[_0x1bd5('0xc')]&&_0x1bd5('0x3')!==typeof console['info']&&'undefined'!==typeof console[_0x1bd5('0xe')]){var _0x260827;_0x1bd5('0xd')===typeof _0x4793dd?(_0x4793dd[_0x1bd5('0xf')](_0x1bd5('0x10')),_0x260827=_0x4793dd):_0x260827=[_0x1bd5('0x10')+_0x4793dd];if(_0x1bd5('0x3')===typeof _0x43ea3e||_0x1bd5('0x11')!==_0x43ea3e[_0x1bd5('0x12')]()&&_0x1bd5('0x13')!==_0x43ea3e[_0x1bd5('0x12')]())if(_0x1bd5('0x3')!==typeof _0x43ea3e&&_0x1bd5('0x14')===_0x43ea3e[_0x1bd5('0x12')]())try{console[_0x1bd5('0x14')][_0x1bd5('0x15')](console,_0x260827);}catch(_0x1f13e7){try{console[_0x1bd5('0x14')](_0x260827['join']('\x0a'));}catch(_0x42c43d){}}else try{console['error'][_0x1bd5('0x15')](console,_0x260827);}catch(_0x1e534e){try{console[_0x1bd5('0xc')](_0x260827['join']('\x0a'));}catch(_0x3f4156){}}else try{console['warn'][_0x1bd5('0x15')](console,_0x260827);}catch(_0x30676d){try{console[_0x1bd5('0xe')](_0x260827[_0x1bd5('0x8')]('\x0a'));}catch(_0x47c84b){}}}};window[_0x1bd5('0x16')]=window[_0x1bd5('0x16')]||{};window[_0x1bd5('0x16')][_0x1bd5('0x17')]=!0x0;_0xc7277e['QD_dropDownCart']=function(){};_0xc7277e['fn'][_0x1bd5('0x18')]=function(){return{'fn':new _0xc7277e()};};var _0x24d4d9=function(_0x3595e9){var _0x369b88={'p':_0x1bd5('0x19')};return function(_0xc73670){var _0x4e72b2=function(_0x289097){return _0x289097;};var _0x472b22=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0xc73670=_0xc73670['d'+_0x472b22[0x10]+'c'+_0x472b22[0x11]+'m'+_0x4e72b2(_0x472b22[0x1])+'n'+_0x472b22[0xd]]['l'+_0x472b22[0x12]+'c'+_0x472b22[0x0]+'ti'+_0x4e72b2('o')+'n'];var _0x8d53ba=function(_0x4bcc77){return escape(encodeURIComponent(_0x4bcc77[_0x1bd5('0x1')](/\./g,'¨')[_0x1bd5('0x1')](/[a-zA-Z]/g,function(_0x345181){return String[_0x1bd5('0x1a')](('Z'>=_0x345181?0x5a:0x7a)>=(_0x345181=_0x345181[_0x1bd5('0x1b')](0x0)+0xd)?_0x345181:_0x345181-0x1a);})));};var _0x1d612b=_0x8d53ba(_0xc73670[[_0x472b22[0x9],_0x4e72b2('o'),_0x472b22[0xc],_0x472b22[_0x4e72b2(0xd)]]['join']('')]);_0x8d53ba=_0x8d53ba((window[['js',_0x4e72b2('no'),'m',_0x472b22[0x1],_0x472b22[0x4]['toUpperCase'](),_0x1bd5('0x1c')][_0x1bd5('0x8')]('')]||'---')+['.v',_0x472b22[0xd],'e',_0x4e72b2('x'),'co',_0x4e72b2('mm'),_0x1bd5('0x1d'),_0x472b22[0x1],'.c',_0x4e72b2('o'),'m.',_0x472b22[0x13],'r'][_0x1bd5('0x8')](''));for(var _0x1efa8c in _0x369b88){if(_0x8d53ba===_0x1efa8c+_0x369b88[_0x1efa8c]||_0x1d612b===_0x1efa8c+_0x369b88[_0x1efa8c]){var _0x24dc20='tr'+_0x472b22[0x11]+'e';break;}_0x24dc20='f'+_0x472b22[0x0]+'ls'+_0x4e72b2(_0x472b22[0x1])+'';}_0x4e72b2=!0x1;-0x1<_0xc73670[[_0x472b22[0xc],'e',_0x472b22[0x0],'rc',_0x472b22[0x9]]['join']('')][_0x1bd5('0x1e')](_0x1bd5('0x1f'))&&(_0x4e72b2=!0x0);return[_0x24dc20,_0x4e72b2];}(_0x3595e9);}(window);if(!eval(_0x24d4d9[0x0]))return _0x24d4d9[0x1]?_0x2b2c57(_0x1bd5('0x20')):!0x1;_0xc7277e[_0x1bd5('0x18')]=function(_0x209ce1,_0x223161){var _0x42fb08=_0xc7277e(_0x209ce1);if(!_0x42fb08[_0x1bd5('0x7')])return _0x42fb08;var _0x592255=_0xc7277e[_0x1bd5('0x21')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x1bd5('0x22'),'linkCheckout':_0x1bd5('0x23'),'cartTotal':_0x1bd5('0x24'),'emptyCart':_0x1bd5('0x25'),'continueShopping':_0x1bd5('0x26'),'shippingForm':_0x1bd5('0x27')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x4de4b0){return _0x4de4b0[_0x1bd5('0x28')]||_0x4de4b0[_0x1bd5('0x29')];},'callback':function(){},'callbackProductsList':function(){}},_0x223161);_0xc7277e('');var _0x44ab3a=this;if(_0x592255[_0x1bd5('0x2a')]){var _0x3cf898=!0x1;_0x1bd5('0x3')===typeof window[_0x1bd5('0x2b')]&&(_0x2b2c57('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN'),_0xc7277e['ajax']({'url':_0x1bd5('0x2c'),'async':!0x1,'dataType':_0x1bd5('0x2d'),'error':function(){_0x2b2c57(_0x1bd5('0x2e'));_0x3cf898=!0x0;}}));if(_0x3cf898)return _0x2b2c57('A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!');}if(_0x1bd5('0xd')===typeof window['vtexjs']&&_0x1bd5('0x3')!==typeof window[_0x1bd5('0x2b')][_0x1bd5('0x2f')])var _0xa63190=window[_0x1bd5('0x2b')][_0x1bd5('0x2f')];else if(_0x1bd5('0xd')===typeof vtex&&_0x1bd5('0xd')===typeof vtex['checkout']&&_0x1bd5('0x3')!==typeof vtex[_0x1bd5('0x2f')]['SDK'])_0xa63190=new vtex[(_0x1bd5('0x2f'))][(_0x1bd5('0x30'))]();else return _0x2b2c57(_0x1bd5('0x31'));_0x44ab3a['cartContainer']=_0x1bd5('0x32');var _0x53482=function(_0x2997a2){_0xc7277e(this)[_0x1bd5('0x33')](_0x2997a2);_0x2997a2['find'](_0x1bd5('0x34'))[_0x1bd5('0x35')](_0xc7277e(_0x1bd5('0x36')))['on'](_0x1bd5('0x37'),function(){_0x42fb08['removeClass']('qd-bb-lightBoxProdAdd');_0xc7277e(document[_0x1bd5('0x38')])[_0x1bd5('0x39')](_0x1bd5('0x3a'));});_0xc7277e(document)['off'](_0x1bd5('0x3b'))['on'](_0x1bd5('0x3b'),function(_0x574d95){0x1b==_0x574d95[_0x1bd5('0x3c')]&&(_0x42fb08['removeClass'](_0x1bd5('0x3d')),_0xc7277e(document[_0x1bd5('0x38')])['removeClass'](_0x1bd5('0x3a')));});var _0x178f18=_0x2997a2[_0x1bd5('0x3e')](_0x1bd5('0x3f'));_0x2997a2[_0x1bd5('0x3e')](_0x1bd5('0x40'))['on'](_0x1bd5('0x41'),function(){_0x44ab3a[_0x1bd5('0x42')]('-',void 0x0,void 0x0,_0x178f18);return!0x1;});_0x2997a2[_0x1bd5('0x3e')](_0x1bd5('0x43'))['on'](_0x1bd5('0x44'),function(){_0x44ab3a[_0x1bd5('0x42')](void 0x0,void 0x0,void 0x0,_0x178f18);return!0x1;});_0x2997a2['find'](_0x1bd5('0x45'))[_0x1bd5('0x46')]('')['on'](_0x1bd5('0x47'),function(){_0x44ab3a['shippingCalculate'](_0xc7277e(this));});if(_0x592255[_0x1bd5('0x48')]){var _0x223161=0x0;_0xc7277e(this)['on']('mouseenter.qd_ddc_hover',function(){var _0x2997a2=function(){window['_QuatroDigital_DropDown'][_0x1bd5('0x17')]&&(_0x44ab3a['getCartInfoByUrl'](),window[_0x1bd5('0x16')][_0x1bd5('0x17')]=!0x1,_0xc7277e['fn']['simpleCart'](!0x0),_0x44ab3a[_0x1bd5('0x49')]());};_0x223161=setInterval(function(){_0x2997a2();},0x258);_0x2997a2();});_0xc7277e(this)['on']('mouseleave.qd_ddc_hover',function(){clearInterval(_0x223161);});}};var _0x293fc3=function(_0x38dced){_0x38dced=_0xc7277e(_0x38dced);_0x592255[_0x1bd5('0x4a')][_0x1bd5('0x4b')]=_0x592255[_0x1bd5('0x4a')][_0x1bd5('0x4b')][_0x1bd5('0x1')](_0x1bd5('0x4c'),'<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>');_0x592255[_0x1bd5('0x4a')][_0x1bd5('0x4b')]=_0x592255[_0x1bd5('0x4a')][_0x1bd5('0x4b')][_0x1bd5('0x1')](_0x1bd5('0x4d'),'<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>');_0x592255[_0x1bd5('0x4a')][_0x1bd5('0x4b')]=_0x592255[_0x1bd5('0x4a')][_0x1bd5('0x4b')][_0x1bd5('0x1')](_0x1bd5('0x4e'),_0x1bd5('0x4f'));_0x592255['texts']['cartTotal']=_0x592255[_0x1bd5('0x4a')][_0x1bd5('0x4b')][_0x1bd5('0x1')]('#total',_0x1bd5('0x50'));_0x38dced[_0x1bd5('0x3e')](_0x1bd5('0x51'))[_0x1bd5('0x52')](_0x592255[_0x1bd5('0x4a')][_0x1bd5('0x53')]);_0x38dced[_0x1bd5('0x3e')]('.qd_ddc_continueShopping')[_0x1bd5('0x52')](_0x592255[_0x1bd5('0x4a')]['continueShopping']);_0x38dced[_0x1bd5('0x3e')]('.qd-ddc-checkout')[_0x1bd5('0x52')](_0x592255['texts'][_0x1bd5('0x54')]);_0x38dced[_0x1bd5('0x3e')]('.qd-ddc-infoTotal')[_0x1bd5('0x52')](_0x592255[_0x1bd5('0x4a')][_0x1bd5('0x4b')]);_0x38dced[_0x1bd5('0x3e')](_0x1bd5('0x55'))[_0x1bd5('0x52')](_0x592255[_0x1bd5('0x4a')]['shippingForm']);_0x38dced[_0x1bd5('0x3e')]('.qd-ddc-emptyCart\x20p')[_0x1bd5('0x52')](_0x592255[_0x1bd5('0x4a')][_0x1bd5('0x56')]);return _0x38dced;}(this['cartContainer']);var _0x5d0cfd=0x0;_0x42fb08[_0x1bd5('0x57')](function(){0x0<_0x5d0cfd?_0x53482[_0x1bd5('0x58')](this,_0x293fc3[_0x1bd5('0x59')]()):_0x53482[_0x1bd5('0x58')](this,_0x293fc3);_0x5d0cfd++;});window[_0x1bd5('0x9')][_0x1bd5('0xa')][_0x1bd5('0x35')](function(){_0xc7277e(_0x1bd5('0x5a'))[_0x1bd5('0x52')](window[_0x1bd5('0x9')]['total']||'--');_0xc7277e(_0x1bd5('0x5b'))['html'](window[_0x1bd5('0x9')][_0x1bd5('0x5c')]||'0');_0xc7277e(_0x1bd5('0x5d'))['html'](window[_0x1bd5('0x9')][_0x1bd5('0x5e')]||'--');_0xc7277e(_0x1bd5('0x5f'))['html'](window[_0x1bd5('0x9')][_0x1bd5('0x60')]||'--');});var _0x39f973=function(_0x197e74,_0x5534c5){if('undefined'===typeof _0x197e74[_0x1bd5('0x61')])return _0x2b2c57(_0x1bd5('0x62'));_0x44ab3a[_0x1bd5('0x63')]['call'](this,_0x5534c5);};_0x44ab3a['getCartInfoByUrl']=function(_0x2bc0dc,_0x5cf4c6){_0x1bd5('0x3')!=typeof _0x5cf4c6?window[_0x1bd5('0x16')]['dataOptionsCache']=_0x5cf4c6:window[_0x1bd5('0x16')]['dataOptionsCache']&&(_0x5cf4c6=window[_0x1bd5('0x16')]['dataOptionsCache']);setTimeout(function(){window[_0x1bd5('0x16')][_0x1bd5('0x64')]=void 0x0;},_0x592255['timeRemoveNewItemClass']);_0xc7277e(_0x1bd5('0x65'))[_0x1bd5('0x39')]('qd-ddc-prodLoaded');if(_0x592255['smartCheckout']){var _0x223161=function(_0x31d224){window['_QuatroDigital_DropDown'][_0x1bd5('0x66')]=_0x31d224;_0x39f973(_0x31d224,_0x5cf4c6);_0x1bd5('0x3')!==typeof window['_QuatroDigital_AmountProduct']&&'function'===typeof window[_0x1bd5('0x67')][_0x1bd5('0x68')]&&window[_0x1bd5('0x67')]['exec'][_0x1bd5('0x58')](this);_0xc7277e(_0x1bd5('0x65'))['addClass']('qd-ddc-prodLoaded');};_0x1bd5('0x3')!==typeof window[_0x1bd5('0x16')][_0x1bd5('0x66')]?(_0x223161(window[_0x1bd5('0x16')][_0x1bd5('0x66')]),'function'===typeof _0x2bc0dc&&_0x2bc0dc(window[_0x1bd5('0x16')]['getOrderForm'])):_0xc7277e[_0x1bd5('0x69')]([_0x1bd5('0x61'),_0x1bd5('0x6a'),_0x1bd5('0x6b')],{'done':function(_0x5e43f6){_0x223161['call'](this,_0x5e43f6);_0x1bd5('0xb')===typeof _0x2bc0dc&&_0x2bc0dc(_0x5e43f6);},'fail':function(_0x36d62e){_0x2b2c57([_0x1bd5('0x6c'),_0x36d62e]);}});}else alert(_0x1bd5('0x6d'));};_0x44ab3a[_0x1bd5('0x49')]=function(){var _0x484fbf=_0xc7277e(_0x1bd5('0x65'));_0x484fbf[_0x1bd5('0x3e')](_0x1bd5('0x6e'))[_0x1bd5('0x7')]?_0x484fbf[_0x1bd5('0x39')](_0x1bd5('0x6f')):_0x484fbf[_0x1bd5('0x70')](_0x1bd5('0x6f'));};_0x44ab3a[_0x1bd5('0x63')]=function(_0x154bf5){var _0x223161=_0xc7277e(_0x1bd5('0x71'));_0x223161[_0x1bd5('0x72')]();_0x223161[_0x1bd5('0x57')](function(){var _0x223161=_0xc7277e(this),_0x4ba749,_0x209ce1,_0x3ddf27=_0xc7277e(''),_0x56e99c;for(_0x56e99c in window[_0x1bd5('0x16')][_0x1bd5('0x66')][_0x1bd5('0x61')])if(_0x1bd5('0xd')===typeof window[_0x1bd5('0x16')][_0x1bd5('0x66')][_0x1bd5('0x61')][_0x56e99c]){var _0x55e64b=window[_0x1bd5('0x16')][_0x1bd5('0x66')][_0x1bd5('0x61')][_0x56e99c];var _0x1184b3=_0x55e64b['productCategoryIds'][_0x1bd5('0x1')](/^\/|\/$/g,'')[_0x1bd5('0x6')]('/');var _0x173fd2=_0xc7277e(_0x1bd5('0x73'));_0x173fd2[_0x1bd5('0x74')]({'data-sku':_0x55e64b['id'],'data-sku-index':_0x56e99c,'data-qd-departament':_0x1184b3[0x0],'data-qd-category':_0x1184b3[_0x1184b3[_0x1bd5('0x7')]-0x1]});_0x173fd2[_0x1bd5('0x70')]('qd-ddc-'+_0x55e64b[_0x1bd5('0x75')]);_0x173fd2['find']('.qd-ddc-prodName')[_0x1bd5('0x33')](_0x592255['skuName'](_0x55e64b));_0x173fd2[_0x1bd5('0x3e')](_0x1bd5('0x76'))['append'](isNaN(_0x55e64b[_0x1bd5('0x77')])?_0x55e64b[_0x1bd5('0x77')]:0x0==_0x55e64b[_0x1bd5('0x77')]?_0x1bd5('0x78'):(_0xc7277e(_0x1bd5('0x79'))[_0x1bd5('0x74')]('content')||'R$')+'\x20'+qd_number_format(_0x55e64b[_0x1bd5('0x77')]/0x64,0x2,',','.'));_0x173fd2[_0x1bd5('0x3e')](_0x1bd5('0x7a'))[_0x1bd5('0x74')]({'data-sku':_0x55e64b['id'],'data-sku-index':_0x56e99c})['val'](_0x55e64b['quantity']);_0x173fd2[_0x1bd5('0x3e')](_0x1bd5('0x7b'))[_0x1bd5('0x74')]({'data-sku':_0x55e64b['id'],'data-sku-index':_0x56e99c});_0x44ab3a[_0x1bd5('0x7c')](_0x55e64b['id'],_0x173fd2['find'](_0x1bd5('0x7d')),_0x55e64b['imageUrl']);_0x173fd2['find'](_0x1bd5('0x7e'))['attr']({'data-sku':_0x55e64b['id'],'data-sku-index':_0x56e99c});_0x173fd2[_0x1bd5('0x7f')](_0x223161);_0x3ddf27=_0x3ddf27[_0x1bd5('0x35')](_0x173fd2);}try{var _0xa63190=_0x223161[_0x1bd5('0x0')](_0x1bd5('0x65'))[_0x1bd5('0x3e')](_0x1bd5('0x45'));_0xa63190[_0x1bd5('0x7')]&&''==_0xa63190[_0x1bd5('0x46')]()&&window['_QuatroDigital_DropDown'][_0x1bd5('0x66')]['shippingData']['address']&&_0xa63190['val'](window[_0x1bd5('0x16')]['getOrderForm'][_0x1bd5('0x6b')][_0x1bd5('0x80')][_0x1bd5('0x81')]);}catch(_0x4a3f74){_0x2b2c57(_0x1bd5('0x82')+_0x4a3f74[_0x1bd5('0x83')],_0x1bd5('0x13'));}_0x44ab3a['actionButtons'](_0x223161);_0x44ab3a[_0x1bd5('0x49')]();_0x154bf5&&_0x154bf5['lastSku']&&function(){_0x209ce1=_0x3ddf27[_0x1bd5('0x84')](_0x1bd5('0x85')+_0x154bf5[_0x1bd5('0x86')]+'\x27]');_0x209ce1['length']&&(_0x4ba749=0x0,_0x3ddf27['each'](function(){var _0x154bf5=_0xc7277e(this);if(_0x154bf5['is'](_0x209ce1))return!0x1;_0x4ba749+=_0x154bf5['outerHeight']();}),_0x44ab3a[_0x1bd5('0x42')](void 0x0,void 0x0,_0x4ba749,_0x223161['add'](_0x223161[_0x1bd5('0x87')]())),_0x3ddf27[_0x1bd5('0x39')](_0x1bd5('0x88')),function(_0x2ec300){_0x2ec300[_0x1bd5('0x70')](_0x1bd5('0x89'));_0x2ec300[_0x1bd5('0x70')](_0x1bd5('0x88'));setTimeout(function(){_0x2ec300[_0x1bd5('0x39')](_0x1bd5('0x89'));},_0x592255[_0x1bd5('0x8a')]);}(_0x209ce1),_0xc7277e(document[_0x1bd5('0x38')])[_0x1bd5('0x70')](_0x1bd5('0x8b')),setTimeout(function(){_0xc7277e(document['body'])[_0x1bd5('0x39')](_0x1bd5('0x8b'));},_0x592255[_0x1bd5('0x8a')]));}();});(function(){_QuatroDigital_DropDown['getOrderForm'][_0x1bd5('0x61')][_0x1bd5('0x7')]?(_0xc7277e('body')[_0x1bd5('0x39')](_0x1bd5('0x8c'))[_0x1bd5('0x70')]('qd-ddc-cart-rendered\x20qd-ddc-product-add-time'),setTimeout(function(){_0xc7277e(_0x1bd5('0x38'))[_0x1bd5('0x39')](_0x1bd5('0x8d'));},_0x592255[_0x1bd5('0x8a')])):_0xc7277e('body')[_0x1bd5('0x39')](_0x1bd5('0x8e'))[_0x1bd5('0x70')]('qd-ddc-cart-empty');}());_0x1bd5('0xb')===typeof _0x592255[_0x1bd5('0x8f')]?_0x592255['callbackProductsList']['call'](this):_0x2b2c57(_0x1bd5('0x90'));};_0x44ab3a[_0x1bd5('0x7c')]=function(_0x5c9098,_0x5d6b17,_0x6539f1){function _0x5ce94f(){_0x5d6b17['removeClass'](_0x1bd5('0x91'))['load'](function(){_0xc7277e(this)[_0x1bd5('0x70')](_0x1bd5('0x91'));})['attr'](_0x1bd5('0x92'),_0x6539f1);}_0x6539f1?_0x5ce94f():isNaN(_0x5c9098)?_0x2b2c57(_0x1bd5('0x93'),_0x1bd5('0x11')):alert('Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.');};_0x44ab3a[_0x1bd5('0x94')]=function(_0x5d8c54){var _0x223161=function(_0x13759c,_0x164287){var _0x24e013=_0xc7277e(_0x13759c);var _0x2f9dff=_0x24e013['attr'](_0x1bd5('0x95'));var _0x209ce1=_0x24e013[_0x1bd5('0x74')]('data-sku-index');if(_0x2f9dff){var _0x4ac05b=parseInt(_0x24e013[_0x1bd5('0x46')]())||0x1;_0x44ab3a[_0x1bd5('0x96')]([_0x2f9dff,_0x209ce1],_0x4ac05b,_0x4ac05b+0x1,function(_0x22f935){_0x24e013[_0x1bd5('0x46')](_0x22f935);'function'===typeof _0x164287&&_0x164287();});}};var _0x380c7d=function(_0x3ec572,_0x2ede9d){var _0x374f89=_0xc7277e(_0x3ec572);var _0x209ce1=_0x374f89[_0x1bd5('0x74')](_0x1bd5('0x95'));var _0x16fd7a=_0x374f89[_0x1bd5('0x74')](_0x1bd5('0x97'));if(_0x209ce1){var _0x3cf023=parseInt(_0x374f89[_0x1bd5('0x46')]())||0x2;_0x44ab3a[_0x1bd5('0x96')]([_0x209ce1,_0x16fd7a],_0x3cf023,_0x3cf023-0x1,function(_0x2934fe){_0x374f89['val'](_0x2934fe);_0x1bd5('0xb')===typeof _0x2ede9d&&_0x2ede9d();});}};var _0x2440a8=function(_0x1391ac,_0x2c03e3){var _0x223161=_0xc7277e(_0x1391ac);var _0x209ce1=_0x223161[_0x1bd5('0x74')](_0x1bd5('0x95'));var _0xf61654=_0x223161[_0x1bd5('0x74')](_0x1bd5('0x97'));if(_0x209ce1){var _0x56fb4b=parseInt(_0x223161[_0x1bd5('0x46')]())||0x1;_0x44ab3a[_0x1bd5('0x96')]([_0x209ce1,_0xf61654],0x1,_0x56fb4b,function(_0x2268db){_0x223161[_0x1bd5('0x46')](_0x2268db);'function'===typeof _0x2c03e3&&_0x2c03e3();});}};var _0x209ce1=_0x5d8c54[_0x1bd5('0x3e')]('.qd-ddc-prodQttWrapper:not(.qd_on)');_0x209ce1['addClass']('qd_on')[_0x1bd5('0x57')](function(){var _0x5d8c54=_0xc7277e(this);_0x5d8c54[_0x1bd5('0x3e')]('.qd-ddc-quantityMore')['on']('click.qd_ddc_more',function(_0x24bdd4){_0x24bdd4[_0x1bd5('0x98')]();_0x209ce1['addClass'](_0x1bd5('0x99'));_0x223161(_0x5d8c54[_0x1bd5('0x3e')]('.qd-ddc-quantity'),function(){_0x209ce1[_0x1bd5('0x39')]('qd-loading');});});_0x5d8c54[_0x1bd5('0x3e')](_0x1bd5('0x9a'))['on'](_0x1bd5('0x9b'),function(_0x12aaef){_0x12aaef[_0x1bd5('0x98')]();_0x209ce1['addClass'](_0x1bd5('0x99'));_0x380c7d(_0x5d8c54[_0x1bd5('0x3e')](_0x1bd5('0x7a')),function(){_0x209ce1[_0x1bd5('0x39')]('qd-loading');});});_0x5d8c54[_0x1bd5('0x3e')](_0x1bd5('0x7a'))['on'](_0x1bd5('0x9c'),function(){_0x209ce1['addClass'](_0x1bd5('0x99'));_0x2440a8(this,function(){_0x209ce1[_0x1bd5('0x39')](_0x1bd5('0x99'));});});_0x5d8c54[_0x1bd5('0x3e')](_0x1bd5('0x7a'))['on']('keyup.qd_ddc_change',function(_0x28256b){0xd==_0x28256b[_0x1bd5('0x3c')]&&(_0x209ce1['addClass'](_0x1bd5('0x99')),_0x2440a8(this,function(){_0x209ce1[_0x1bd5('0x39')]('qd-loading');}));});});_0x5d8c54['find'](_0x1bd5('0x6e'))[_0x1bd5('0x57')](function(){var _0x5d8c54=_0xc7277e(this);_0x5d8c54[_0x1bd5('0x3e')]('.qd-ddc-remove')['on'](_0x1bd5('0x9d'),function(){_0x5d8c54[_0x1bd5('0x70')](_0x1bd5('0x99'));_0x44ab3a[_0x1bd5('0x9e')](_0xc7277e(this),function(_0x22380d){_0x22380d?_0x5d8c54[_0x1bd5('0x9f')](!0x0)[_0x1bd5('0xa0')](function(){_0x5d8c54[_0x1bd5('0xa1')]();_0x44ab3a[_0x1bd5('0x49')]();}):_0x5d8c54[_0x1bd5('0x39')](_0x1bd5('0x99'));});return!0x1;});});};_0x44ab3a[_0x1bd5('0xa2')]=function(_0x196f09){var _0xc166c1=_0x196f09[_0x1bd5('0x46')]();_0xc166c1=_0xc166c1[_0x1bd5('0x1')](/[^0-9\-]/g,'');_0xc166c1=_0xc166c1[_0x1bd5('0x1')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3');_0xc166c1=_0xc166c1[_0x1bd5('0x1')](/(.{9}).*/g,'$1');_0x196f09[_0x1bd5('0x46')](_0xc166c1);0x9<=_0xc166c1[_0x1bd5('0x7')]&&(_0x196f09['data'](_0x1bd5('0xa3'))!=_0xc166c1&&_0xa63190[_0x1bd5('0xa4')]({'postalCode':_0xc166c1,'country':_0x1bd5('0xa5')})[_0x1bd5('0xa6')](function(_0x209de8){window[_0x1bd5('0x16')][_0x1bd5('0x66')]=_0x209de8;_0x44ab3a['getCartInfoByUrl']();})[_0x1bd5('0xa7')](function(_0x177943){_0x2b2c57([_0x1bd5('0xa8'),_0x177943]);updateCartData();}),_0x196f09[_0x1bd5('0xa9')](_0x1bd5('0xa3'),_0xc166c1));};_0x44ab3a[_0x1bd5('0x96')]=function(_0x834968,_0x2cb2f2,_0x218021,_0x5013bd){function _0x27d194(_0x16949d){_0x16949d=_0x1bd5('0xaa')!==typeof _0x16949d?!0x1:_0x16949d;_0x44ab3a[_0x1bd5('0xab')]();window['_QuatroDigital_DropDown'][_0x1bd5('0x17')]=!0x1;_0x44ab3a[_0x1bd5('0x49')]();'undefined'!==typeof window['_QuatroDigital_AmountProduct']&&_0x1bd5('0xb')===typeof window[_0x1bd5('0x67')][_0x1bd5('0x68')]&&window[_0x1bd5('0x67')][_0x1bd5('0x68')][_0x1bd5('0x58')](this);'function'===typeof adminCart&&adminCart();_0xc7277e['fn']['simpleCart'](!0x0,void 0x0,_0x16949d);_0x1bd5('0xb')===typeof _0x5013bd&&_0x5013bd(_0x2cb2f2);}_0x218021=_0x218021||0x1;if(0x1>_0x218021)return _0x2cb2f2;if(_0x592255[_0x1bd5('0x2a')]){if(_0x1bd5('0x3')===typeof window[_0x1bd5('0x16')][_0x1bd5('0x66')][_0x1bd5('0x61')][_0x834968[0x1]])return _0x2b2c57(_0x1bd5('0xac')+_0x834968[0x1]+']'),_0x2cb2f2;window[_0x1bd5('0x16')][_0x1bd5('0x66')][_0x1bd5('0x61')][_0x834968[0x1]][_0x1bd5('0xad')]=_0x218021;window[_0x1bd5('0x16')][_0x1bd5('0x66')][_0x1bd5('0x61')][_0x834968[0x1]]['index']=_0x834968[0x1];_0xa63190[_0x1bd5('0xae')]([window[_0x1bd5('0x16')][_0x1bd5('0x66')][_0x1bd5('0x61')][_0x834968[0x1]]],['items','totalizers',_0x1bd5('0x6b')])[_0x1bd5('0xa6')](function(_0x3a514f){window['_QuatroDigital_DropDown'][_0x1bd5('0x66')]=_0x3a514f;_0x27d194(!0x0);})['fail'](function(_0x364ad7){_0x2b2c57([_0x1bd5('0xaf'),_0x364ad7]);_0x27d194();});}else _0x2b2c57(_0x1bd5('0xb0'));};_0x44ab3a['removeProduct']=function(_0x529925,_0x213bc6){function _0x4c0179(_0x575e58){_0x575e58=_0x1bd5('0xaa')!==typeof _0x575e58?!0x1:_0x575e58;_0x1bd5('0x3')!==typeof window[_0x1bd5('0x67')]&&'function'===typeof window[_0x1bd5('0x67')][_0x1bd5('0x68')]&&window[_0x1bd5('0x67')][_0x1bd5('0x68')][_0x1bd5('0x58')](this);_0x1bd5('0xb')===typeof adminCart&&adminCart();_0xc7277e['fn'][_0x1bd5('0xb1')](!0x0,void 0x0,_0x575e58);_0x1bd5('0xb')===typeof _0x213bc6&&_0x213bc6(_0x209ce1);}var _0x209ce1=!0x1,_0x180fdd=_0xc7277e(_0x529925)['attr'](_0x1bd5('0x97'));if(_0x592255['smartCheckout']){if('undefined'===typeof window[_0x1bd5('0x16')]['getOrderForm'][_0x1bd5('0x61')][_0x180fdd])return _0x2b2c57('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x180fdd+']'),_0x209ce1;window['_QuatroDigital_DropDown'][_0x1bd5('0x66')]['items'][_0x180fdd]['index']=_0x180fdd;_0xa63190['removeItems']([window[_0x1bd5('0x16')][_0x1bd5('0x66')]['items'][_0x180fdd]],[_0x1bd5('0x61'),'totalizers',_0x1bd5('0x6b')])[_0x1bd5('0xa6')](function(_0x3edac2){_0x209ce1=!0x0;window[_0x1bd5('0x16')]['getOrderForm']=_0x3edac2;_0x39f973(_0x3edac2);_0x4c0179(!0x0);})[_0x1bd5('0xa7')](function(_0x1a949a){_0x2b2c57([_0x1bd5('0xb2'),_0x1a949a]);_0x4c0179();});}else alert(_0x1bd5('0xb3'));};_0x44ab3a[_0x1bd5('0x42')]=function(_0x34a142,_0x1b24eb,_0x1f726b,_0x27fcbb){_0x27fcbb=_0x27fcbb||_0xc7277e('.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2');_0x34a142=_0x34a142||'+';_0x1b24eb=_0x1b24eb||0.9*_0x27fcbb[_0x1bd5('0xb4')]();_0x27fcbb['stop'](!0x0,!0x0)[_0x1bd5('0xb5')]({'scrollTop':isNaN(_0x1f726b)?_0x34a142+'='+_0x1b24eb+'px':_0x1f726b});};_0x592255[_0x1bd5('0x48')]||(_0x44ab3a[_0x1bd5('0xab')](),_0xc7277e['fn'][_0x1bd5('0xb1')](!0x0));_0xc7277e(window)['on'](_0x1bd5('0xb6'),function(){try{window[_0x1bd5('0x16')][_0x1bd5('0x66')]=void 0x0,_0x44ab3a['getCartInfoByUrl']();}catch(_0x20de51){_0x2b2c57(_0x1bd5('0xb7')+_0x20de51[_0x1bd5('0x83')],_0x1bd5('0xb8'));}});_0x1bd5('0xb')===typeof _0x592255[_0x1bd5('0xa')]?_0x592255[_0x1bd5('0xa')][_0x1bd5('0x58')](this):_0x2b2c57(_0x1bd5('0xb9'));};_0xc7277e['fn'][_0x1bd5('0x18')]=function(_0x5ee187){var _0x3e7fc6=_0xc7277e(this);_0x3e7fc6['fn']=new _0xc7277e[(_0x1bd5('0x18'))](this,_0x5ee187);return _0x3e7fc6;};}catch(_0x4463db){'undefined'!==typeof console&&_0x1bd5('0xb')===typeof console['error']&&console['error'](_0x1bd5('0xba'),_0x4463db);}}(this));(function(_0x445d31){try{var _0x34ab16=jQuery;window[_0x1bd5('0x67')]=window[_0x1bd5('0x67')]||{};window[_0x1bd5('0x67')][_0x1bd5('0x61')]={};window[_0x1bd5('0x67')]['allowRecalculate']=!0x1;window['_QuatroDigital_AmountProduct'][_0x1bd5('0xbb')]=!0x1;window[_0x1bd5('0x67')]['quickViewUpdate']=!0x1;var _0x3502e5=function(){if(window[_0x1bd5('0x67')][_0x1bd5('0xbc')]){var _0x28a9d2=!0x1;var _0x253bad={};window['_QuatroDigital_AmountProduct'][_0x1bd5('0x61')]={};for(_0x2d4575 in window[_0x1bd5('0x16')][_0x1bd5('0x66')]['items'])if(_0x1bd5('0xd')===typeof window[_0x1bd5('0x16')][_0x1bd5('0x66')]['items'][_0x2d4575]){var _0x43a412=window['_QuatroDigital_DropDown'][_0x1bd5('0x66')][_0x1bd5('0x61')][_0x2d4575];'undefined'!==typeof _0x43a412[_0x1bd5('0xbd')]&&null!==_0x43a412[_0x1bd5('0xbd')]&&''!==_0x43a412[_0x1bd5('0xbd')]&&(window[_0x1bd5('0x67')][_0x1bd5('0x61')]['prod_'+_0x43a412['productId']]=window['_QuatroDigital_AmountProduct'][_0x1bd5('0x61')]['prod_'+_0x43a412[_0x1bd5('0xbd')]]||{},window['_QuatroDigital_AmountProduct'][_0x1bd5('0x61')][_0x1bd5('0xbe')+_0x43a412['productId']][_0x1bd5('0xbf')]=_0x43a412[_0x1bd5('0xbd')],_0x253bad[_0x1bd5('0xbe')+_0x43a412[_0x1bd5('0xbd')]]||(window['_QuatroDigital_AmountProduct']['items'][_0x1bd5('0xbe')+_0x43a412['productId']][_0x1bd5('0x5c')]=0x0),window[_0x1bd5('0x67')]['items'][_0x1bd5('0xbe')+_0x43a412[_0x1bd5('0xbd')]][_0x1bd5('0x5c')]+=_0x43a412[_0x1bd5('0xad')],_0x28a9d2=!0x0,_0x253bad[_0x1bd5('0xbe')+_0x43a412['productId']]=!0x0);}var _0x2d4575=_0x28a9d2;}else _0x2d4575=void 0x0;window[_0x1bd5('0x67')][_0x1bd5('0xbc')]&&(_0x34ab16('.qd-bap-wrapper')[_0x1bd5('0xa1')](),_0x34ab16(_0x1bd5('0xc0'))[_0x1bd5('0x39')](_0x1bd5('0xc1')));for(var _0x52f16b in window['_QuatroDigital_AmountProduct'][_0x1bd5('0x61')]){_0x43a412=window[_0x1bd5('0x67')][_0x1bd5('0x61')][_0x52f16b];if(_0x1bd5('0xd')!==typeof _0x43a412)return;_0x253bad=_0x34ab16(_0x1bd5('0xc2')+_0x43a412[_0x1bd5('0xbf')]+']')[_0x1bd5('0x0')]('li');if(window[_0x1bd5('0x67')][_0x1bd5('0xbc')]||!_0x253bad[_0x1bd5('0x3e')]('.qd-bap-wrapper')[_0x1bd5('0x7')])_0x28a9d2=_0x34ab16(_0x1bd5('0xc3')),_0x28a9d2[_0x1bd5('0x3e')](_0x1bd5('0xc4'))['html'](_0x43a412[_0x1bd5('0x5c')]),_0x43a412=_0x253bad[_0x1bd5('0x3e')]('.qd_bap_wrapper_content'),_0x43a412[_0x1bd5('0x7')]?_0x43a412[_0x1bd5('0xc5')](_0x28a9d2)['addClass'](_0x1bd5('0xc1')):_0x253bad[_0x1bd5('0xc5')](_0x28a9d2);}_0x2d4575&&(window[_0x1bd5('0x67')][_0x1bd5('0xbc')]=!0x1);};window[_0x1bd5('0x67')][_0x1bd5('0x68')]=function(){window[_0x1bd5('0x67')][_0x1bd5('0xbc')]=!0x0;_0x3502e5[_0x1bd5('0x58')](this);};_0x34ab16(document)['ajaxStop'](function(){_0x3502e5[_0x1bd5('0x58')](this);});}catch(_0x332d79){_0x1bd5('0x3')!==typeof console&&_0x1bd5('0xb')===typeof console[_0x1bd5('0xc')]&&console[_0x1bd5('0xc')](_0x1bd5('0xba'),_0x332d79);}}(this));(function(){try{var _0x5aebc8=jQuery,_0x3a274d,_0x50f49d={'selector':_0x1bd5('0xc6'),'dropDown':{},'buyButton':{}};_0x5aebc8['QD_smartCart']=function(_0x5988b9){var _0x31c55b={};_0x3a274d=_0x5aebc8[_0x1bd5('0x21')](!0x0,{},_0x50f49d,_0x5988b9);_0x5988b9=_0x5aebc8(_0x3a274d[_0x1bd5('0xc7')])['QD_dropDownCart'](_0x3a274d[_0x1bd5('0xc8')]);_0x31c55b[_0x1bd5('0xc9')]=_0x1bd5('0x3')!==typeof _0x3a274d[_0x1bd5('0xc8')]['updateOnlyHover']&&!0x1===_0x3a274d['dropDown'][_0x1bd5('0x48')]?_0x5aebc8(_0x3a274d[_0x1bd5('0xc7')])[_0x1bd5('0xca')](_0x5988b9['fn'],_0x3a274d[_0x1bd5('0xc9')]):_0x5aebc8(_0x3a274d[_0x1bd5('0xc7')])[_0x1bd5('0xca')](_0x3a274d[_0x1bd5('0xc9')]);_0x31c55b[_0x1bd5('0xc8')]=_0x5988b9;return _0x31c55b;};_0x5aebc8['fn'][_0x1bd5('0xcb')]=function(){_0x1bd5('0xd')===typeof console&&_0x1bd5('0xb')===typeof console[_0x1bd5('0x14')]&&console[_0x1bd5('0x14')]('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x5aebc8[_0x1bd5('0xcb')]=_0x5aebc8['fn'][_0x1bd5('0xcb')];}catch(_0x2965a7){'undefined'!==typeof console&&_0x1bd5('0xb')===typeof console[_0x1bd5('0xc')]&&console['error'](_0x1bd5('0xba'),_0x2965a7);}}());
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);
/* Quatro Digital - Smart Image Load // Carlos Vinicius // Todos os direitos reservados */
var _0xfaba=['alerta','toLowerCase','aviso','info','apply','300','not','.qd-sil-on','find','img:visible','scrollTop','bottom','top','height','first','length','Problemas\x20:(\x20.\x20Detalhes:\x20','clone','load','addClass','sizes','width','qd-sil-image','insertAfter','closest','qd-sil-on','offset','push','extend','QD_SIL_scrollRange','documentElement','trigger','QD_SIL_scroll','QD_smartImageLoad','ncvaunfabngnpnqb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','charCodeAt','join','ite','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Quatro\x20Digital\x20-\x20Smart\x20Image\x20Load','object','error','undefined','warn','function','unshift'];(function(_0xe4771f,_0x18ab62){var _0x12f936=function(_0x41d930){while(--_0x41d930){_0xe4771f['push'](_0xe4771f['shift']());}};_0x12f936(++_0x18ab62);}(_0xfaba,0x11b));var _0xafab=function(_0x5b4826,_0x4a3682){_0x5b4826=_0x5b4826-0x0;var _0xd64a1a=_0xfaba[_0x5b4826];return _0xd64a1a;};(function(_0x5e1d78){'use strict';var _0x581d41=jQuery;if(typeof _0x581d41['fn']['QD_smartImageLoad']==='function')return;_0x581d41['fn'][_0xafab('0x0')]=function(){};var _0x590d22=function(_0xf38271){var _0x490fe1={'p':_0xafab('0x1')};return function(_0x5154e0){var _0x10fac3,_0x1af638,_0x4d3542,_0x210f8c;_0x1af638=function(_0x26ce9f){return _0x26ce9f;};_0x4d3542=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5154e0=_0x5154e0['d'+_0x4d3542[0x10]+'c'+_0x4d3542[0x11]+'m'+_0x1af638(_0x4d3542[0x1])+'n'+_0x4d3542[0xd]]['l'+_0x4d3542[0x12]+'c'+_0x4d3542[0x0]+'ti'+_0x1af638('o')+'n'];_0x10fac3=function(_0x49e42d){return escape(encodeURIComponent(_0x49e42d[_0xafab('0x2')](/\./g,'¨')[_0xafab('0x2')](/[a-zA-Z]/g,function(_0x4d86dd){return String['fromCharCode'](('Z'>=_0x4d86dd?0x5a:0x7a)>=(_0x4d86dd=_0x4d86dd[_0xafab('0x3')](0x0)+0xd)?_0x4d86dd:_0x4d86dd-0x1a);})));};var _0x14294b=_0x10fac3(_0x5154e0[[_0x4d3542[0x9],_0x1af638('o'),_0x4d3542[0xc],_0x4d3542[_0x1af638(0xd)]][_0xafab('0x4')]('')]);_0x10fac3=_0x10fac3((window[['js',_0x1af638('no'),'m',_0x4d3542[0x1],_0x4d3542[0x4]['toUpperCase'](),_0xafab('0x5')]['join']('')]||'---')+['.v',_0x4d3542[0xd],'e',_0x1af638('x'),'co',_0x1af638('mm'),_0xafab('0x6'),_0x4d3542[0x1],'.c',_0x1af638('o'),'m.',_0x4d3542[0x13],'r'][_0xafab('0x4')](''));for(var _0x3eb9e7 in _0x490fe1){if(_0x10fac3===_0x3eb9e7+_0x490fe1[_0x3eb9e7]||_0x14294b===_0x3eb9e7+_0x490fe1[_0x3eb9e7]){_0x210f8c='tr'+_0x4d3542[0x11]+'e';break;}_0x210f8c='f'+_0x4d3542[0x0]+'ls'+_0x1af638(_0x4d3542[0x1])+'';}_0x1af638=!0x1;-0x1<_0x5154e0[[_0x4d3542[0xc],'e',_0x4d3542[0x0],'rc',_0x4d3542[0x9]][_0xafab('0x4')]('')][_0xafab('0x7')](_0xafab('0x8'))&&(_0x1af638=!0x0);return[_0x210f8c,_0x1af638];}(_0xf38271);}(window);if(!eval(_0x590d22[0x0]))return _0x590d22[0x1]?_0x300448(_0xafab('0x9')):!0x1;var _0x5e2322=_0xafab('0xa');var _0x300448=function(_0x5074a7,_0x1e428e){if(_0xafab('0xb')===typeof console&&'undefined'!==typeof console[_0xafab('0xc')]&&_0xafab('0xd')!==typeof console['info']&&'undefined'!==typeof console[_0xafab('0xe')]){if(_0xafab('0xb')==typeof _0x5074a7&&_0xafab('0xf')==typeof _0x5074a7[_0xafab('0x10')]){_0x5074a7['unshift']('['+_0x5e2322+']\x0a');var _0x3b8140=_0x5074a7;}else _0x3b8140=['['+_0x5e2322+']\x0a',_0x5074a7];if('undefined'==typeof _0x1e428e||_0xafab('0x11')!==_0x1e428e[_0xafab('0x12')]()&&_0xafab('0x13')!==_0x1e428e['toLowerCase']())if(_0xafab('0xd')!=typeof _0x1e428e&&_0xafab('0x14')==_0x1e428e[_0xafab('0x12')]())try{console[_0xafab('0x14')][_0xafab('0x15')](console,_0x3b8140);}catch(_0x599e54){try{console['info'](_0x3b8140[_0xafab('0x4')]('\x0a'));}catch(_0x19cfc1){}}else try{console[_0xafab('0xc')][_0xafab('0x15')](console,_0x3b8140);}catch(_0x4e9adb){try{console[_0xafab('0xc')](_0x3b8140[_0xafab('0x4')]('\x0a'));}catch(_0xc10edd){}}else try{console[_0xafab('0xe')]['apply'](console,_0x3b8140);}catch(_0x4049e1){try{console[_0xafab('0xe')](_0x3b8140[_0xafab('0x4')]('\x0a'));}catch(_0x54f8b2){}}}};var _0x546b9c=/(ids\/[0-9]+-)[0-9-]+/i;var _0xc3b2cb={'imageWrapper':'.qd_sil_img_wrapper','sizes':{'width':_0xafab('0x16'),'height':_0xafab('0x16')}};var _0x3fa273=function(_0x2ed594,_0x5b84ab){'use strict';_0x3c0dbd();_0x581d41(window)['on']('QD_SIL_scroll\x20QuatroDigital.is_Callback',_0x3c0dbd);function _0x3c0dbd(){try{var _0x1f09b8=_0x2ed594['find'](_0x5b84ab['imageWrapper'])[_0xafab('0x17')](_0xafab('0x18'))[_0xafab('0x19')](_0xafab('0x1a'));if(!_0x1f09b8['length'])return;var _0x47ec50=_0x581d41(window);var _0x3ab4c8={'top':_0x47ec50[_0xafab('0x1b')]()};_0x3ab4c8[_0xafab('0x1c')]=_0x3ab4c8[_0xafab('0x1d')]+_0x47ec50[_0xafab('0x1e')]();var _0xcea4af=_0x1f09b8[_0xafab('0x1f')]()['height']();var _0x2c5aa4=_0x3edf0a(_0x1f09b8,_0x3ab4c8,_0xcea4af);for(var _0x534354=0x0;_0x534354<_0x2c5aa4[_0xafab('0x20')];_0x534354++)_0x1b9e33(_0x581d41(_0x2c5aa4[_0x534354]));}catch(_0x5448a9){typeof console!==_0xafab('0xd')&&typeof console[_0xafab('0xc')]===_0xafab('0xf')&&console['error'](_0xafab('0x21'),_0x5448a9);}}function _0x1b9e33(_0x1b3ab9){var _0x2eae79=_0x1b3ab9[_0xafab('0x22')]();_0x2eae79['on'](_0xafab('0x23'),function(){_0x581d41(this)[_0xafab('0x24')]('qd-sil-image-loaded');});_0x2eae79['attr']({'src':_0x2eae79[0x0]['src']['replace'](_0x546b9c,'$1'+_0x5b84ab[_0xafab('0x25')][_0xafab('0x26')]+'-'+_0x5b84ab['sizes'][_0xafab('0x1e')]),'width':_0x5b84ab[_0xafab('0x25')][_0xafab('0x26')],'height':_0x5b84ab[_0xafab('0x25')][_0xafab('0x1e')]});_0x2eae79[_0xafab('0x24')](_0xafab('0x27'))[_0xafab('0x28')](_0x1b3ab9);_0x2eae79[_0xafab('0x29')](_0x5b84ab['imageWrapper'])['addClass'](_0xafab('0x2a'));}function _0x3edf0a(_0x1dbc6d,_0x2b5e00,_0x4acfdc){var _0x413e0b;var _0x507bca=[];for(var _0x1763b1=0x0;_0x1763b1<_0x1dbc6d[_0xafab('0x20')];_0x1763b1++){_0x413e0b=_0x581d41(_0x1dbc6d[_0x1763b1])[_0xafab('0x2b')]();_0x413e0b[_0xafab('0x1c')]=_0x413e0b[_0xafab('0x1d')]+_0x4acfdc;if(!(_0x2b5e00[_0xafab('0x1c')]<_0x413e0b['top']||_0x2b5e00[_0xafab('0x1d')]>_0x413e0b['bottom'])){_0x507bca[_0xafab('0x2c')](_0x1dbc6d[_0x1763b1]);}}return _0x507bca;};};_0x581d41['fn']['QD_smartImageLoad']=function(_0x49fe9b){var _0x28b27a=_0x581d41(this);if(!_0x28b27a[_0xafab('0x20')])return _0x28b27a;_0x28b27a['each'](function(){var _0x1ef58f=_0x581d41(this);_0x1ef58f[_0xafab('0x0')]=new _0x3fa273(_0x1ef58f,_0x581d41[_0xafab('0x2d')]({},_0xc3b2cb,_0x49fe9b));});return _0x28b27a;};window[_0xafab('0x2e')]=0x28;var _0x1bece9=QD_SIL_scrollRange;var _0x4dfddd=0x0;_0x581d41(window)['on']('scroll',function(){var _0xbd3727=document[_0xafab('0x2f')][_0xafab('0x1b')];if(_0xbd3727>_0x4dfddd+_0x1bece9||_0xbd3727<_0x4dfddd-_0x1bece9){_0x581d41(window)[_0xafab('0x30')](_0xafab('0x31'));_0x4dfddd=_0xbd3727;}});}(this));

/* Automatizador de comments box do Facebook // Carlos Vinicius [Quatro Digital] */
/* Automatizador de comments box do Facebook // 1.6 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a=$(".fb-comments");a.length&&a.attr("data-href",document.location.href.split("#").shift().split("?").shift());$("#fb-root").length||$("body").append('<div id="fb-root"></div>');if(!$("script#facebook-jssdk").length){a=$("meta[property='fb:app_id']").attr("content")||!1;var b,c=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||(b=document.createElement("script"),b.id="facebook-jssdk",b.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+
(a?"&appId="+a:""),c.parentNode.insertBefore(b,c))}"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse()});
