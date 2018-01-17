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
			Common.applySmartCart();
			Common.applyAmazingMenu();
			Common.applyAmazingMenuMobile();			
			Common.applyAmazingMenuFooter();
			Common.showFooterLinks();
			Common.applyCarouselShelf();
			Common.setDataScrollToggle();
			Common.openSearchModal();
			Common.applyTipBarCarousel();
			Common.applyTipBarCarouselFooter();
			Common.openAccountMobile();				
			Common.applyMosaicCategorieBanners();				
			Common.applyImageLoad();	
			Common.saveAmountFix();	
			// $(window).on('QuatroDigital.is_Callback', Common.applyImageLoad);			
		},
		ajaxStop: function() {
			Common.saveAmountFix();	
		},
		windowOnload: function() {},
		vtexBindQuickViewDestroy: function() {
			window.bindQuickView = function() {};			
		},
		applyAmazingMenuFooter: function() {
			$('.footer-qd-v1-menu-list').QD_amazingMenu();
		},
		applyMosaicCategorieBanners: function () {
			$('.mosaic-categories-qd-v1-wrapper > .box-banner').QD_mosaicBanners({
				bannerColSecurityMargin: 0,
				containerWidth: 1336,
				classFourColumn: "col-xs-12 col-sm-6 col-md-2"
			});
		},
		qdOverlayClass: 'qd-am-on qd-cart-show qd-sn-on',
		qdOverlay: function () {
			$('.components-qd-v1-overlay').click(function () {
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		},
		applySmartCart: function () {
			$('.header-qd-v1-actions-cart, .fixed-buttons-qd-v1 .fixed-buttons-qd-v1-cart').append('<div class="smart-cart-qd-v1-wrapper"><div class="qd-sc-wrapper"></div></div>');

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
					forceImageHTTPS: true,
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

			$('.header-qd-v1-cart-link, .header-qd-v1-cart-link-float').click(function (evt) {
				evt.preventDefault();
				$(document.body).toggleClass('qd-cart-show');

				wrapper.height($(window).height());
				wrapper.find(".qd-ddc-prodWrapper").css('max-height', $(window).height() - 193);
			});

			$('.qd_ddc_lightBoxClose').click(function (evt) {
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		},
		applyAmazingMenu: function () {
			$('.header-qd-v1-amazing-menu').QD_amazingMenu({
				// callback: function () {
				// 	$('ul.qd-am-dropdown-menu').each(function () {
				// 		$(this).wrapInner('<li class="container"><ul></ul></li>');
				// 	});
				// }
			});
		},
		applyAmazingMenuMobile: function () {
			var wrapper = $('.header-qd-v1-amazing-menu-mobile');

			wrapper.find('> ul > li > ul').prepend(function () { return $(this).prev().clone().wrap('<li></li>').parent() });

			wrapper.QD_amazingMenu({
				callback: function () {
					$('<span class="qd-am-dropdown-trigger"><i class="fa fa-angle-down"></i></span>').appendTo(wrapper.find('.qd-am-has-ul')).click(function () {
						var $t = $(this);
						$.merge($t.parent(), $t.closest('ul')).toggleClass('qd-am-is-active');

						$t.filter(function () { return !$(this).closest('ul').is('.qd-amazing-menu'); }).siblings('ul').stop(true, true).slideToggle();
					});

					wrapper.find('> ul > li > .qd-am-dropdown-trigger').click(function () {
						var w = $('.header-qd-v1-amazing-menu-mobile-wrapper');
						w.addClass('qd-am-is-active');
						w.animate({ scrollTop: 0 }, 200);
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

			$('.header-qd-v1-amazing-menu-mobile-wrapper .header-qd-v1-user-message').append('<div class="header-qd-v1-close-amazing-menu-mobile"></div>');

			$('.header-qd-v1-close-amazing-menu-mobile').click(function (evt) {
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		},
		showFooterLinks: function () {
			$('.footer-qd-v1-menu-list > ul > li').click(function (e) {
				var $t = $(this);
				$t.toggleClass('qd-is-active');
				$t.find('> ul').toggleClass('qd-is-active');
			});
		},
		applyCarouselShelf: function() {
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
		setDataScrollToggle: function () {
			$(document.body).attr('data-qd-scroll-limit', '100');
		},
		openSearchModal: function () {
			$('.header-qd-v1-action-search').click(function () {
				$('.modal-qd-v1-search').modal();
				return false;
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
					return { slidesToShow: 3 };
				return {};
			})()));
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
					return { slidesToShow: 3 };
				return {};
			})()));
		},
		openAccountMobile: function () {
			$('.header-qd-v1-actions-user-link').click(function (e) {
				e.preventDefault();

				$(".header-qd-v1-actions-user-dropdown-mobile").toggle();
			});
		},
		applyImageLoad: function() {
			$('.search-qd-v1-result, .carousel-qd-v1-shelf, .accessories-qd-v1-wrapper').QD_smartImageLoad({
				sizes: {
					width: '230',
					height: '230'
				}
			});
		},
		saveAmountFix: function () {
			$('.shelf-qd-v1-highlight-discount-percentage:not(.qd-on)').addClass('qd-on').each(function () {
				var $t = $(this);
				$t.text(($t.text().trim().match(/[0-9]+/) || [""]).pop() + '% off');
			});
		}
	};

	var Home = {
		init: function() {
			Home.applySliderFull();
			Home.applyBrandCarousel();
			Home.applyCategoryCarousel();
			Home.applyMosaicCategorieBannersV2();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		applySliderFull: function() {
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

			wrapper.each(function() {
				$(this).find('.slick-arrow').wrapAll('<div class="slick-nav" />');
			});
		},
		applyBrandCarousel: function() {
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
							slidesToShow: 2,
							slidesToScroll: 2
						}
					}
				]
			});
		},
		applyCategoryCarousel: function () {
			var wrapper = $('.categories-qd-v1-banners-pre-departament');

			wrapper.slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: 4,
				slidesToScroll: 4,
				infinite: true,
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
		applyMosaicCategorieBannersV2: function () {
			$('.mosaic-categories-qd-v2-wrapper > .box-banner').QD_mosaicBanners({
				containerWidth: 1024
			});
		}
	};

	var Search = {
		init: function() {
			Search.hideExtendedMenu();
			Search.openFiltersMenu();
			Search.shelfLineFix();
			Search.infinityScroll();
			Home.applySliderFull();
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
			Product.scrollToDescription();
			Product.qdCallThumbVideo();
			Product.qdHideUniqueSkuOption();
			Product.saveAmountFlag();
			Product.openShipping();
			Product.qdClickTableMeasures();
			Product.scrollToBuyButton();
			Product.showFloatingBuyBar();
			Product.showCustomize();
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
		applyCarouselThumb: function() {
			// Wrapper onde foi inserido as thumbs
			var thumbsSliderWrapper = $('.product-qd-v1-thumbs-mobile');
			thumbsSliderWrapper.removeClass('slick-initialized slick-slider');
			
			// Inicializa com o primeiro selecionado
			thumbsSliderWrapper.on('init', function(event, slick){
				$(this).find('.slick-current a').addClass('ON');
				$(this).find('a').on('click', function() {
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
		scrollToDescription: function() {
			$('.product-qd-v1-link-description').click(function(e) {
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $('.product-qd-v1-description').offset().top -280
				}, 900, 'swing');
			});
		},
		qdCallThumbVideo: function() {

			// $('#caracteristicas').append('<div id="caracteristicas"><h4 class="group Especificacao">Especificação</h4><table cellspacing="0" class="group Especificacao"><tbody><tr class="even"><th class="name-field Fantasia-de">Fantasia de</th><td class="value-field Fantasia-de">Malévola</td></tr><tr><th class="name-field Codigo-do-Produto">Codigo do Produto</th><td class="value-field Codigo-do-Produto">43516</td></tr><tr class="even"><th class="name-field Itens-Inclusos">Itens Inclusos</th><td class="value-field Itens-Inclusos">Vestido , Bolsa , Polainas , Peruca Com Faixa</td></tr><tr><th class="name-field Genero">Genero</th><td class="value-field Genero">Feminino</td></tr><tr class="even"><th class="name-field Garantia">Garantia</th><td class="value-field Garantia">30 dias</td></tr><tr><th class="name-field Video">Video</th><td class="value-field Video">https://www.youtube.com/watch?v=gCmBqppAyiU</td></tr><tr class="even"><th class="name-field Linha">Linha</th><td class="value-field Linha">Luxo</td></tr></tbody></table></div>');

			var iframe = $("td.value-field.Video:first iframe");

			if (!iframe.length) {
				window.qdVideoInProduct = {
					videoFieldSelector: 'td.value-field.Video:first',
					urlProtocol: 'https'
				};
				return;
			}

			window.qdVideoInProduct = {
				videoFieldSelector: $('<span/>').addClass('video-product').text('https://www.youtube.com/watch?v=' + iframe.attr("src").split("?").shift().split("/").pop() + '&rel=0'),
				urlProtocol: 'https'
			};
		},
		qdHideUniqueSkuOption: function() {
			$(".product-qd-v1-sku-selection [class*='group_']").each(function(){
				var $t = $(this);
				var input =  $t.find("input");

				if(input.length !== 1)
					return;

				input.attr("checked", true).change();
				$t.getParent("ul").hide();
			});
		},
		saveAmountFlag: function() {
			var flag = $('.product-qd-v1-stamps-highlight-discount');

			$(window).on('skuSelected.vtex', function(e, sku, data) {
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
		openShipping: function() {
			if( typeof window.ShippingValue === "function" )
				window.ShippingValue();
		},
		qdClickTableMeasures: function() {
			var wrapper = $(".product-qd-v1-sku-selection");
			var imgTable = $('.measure-table-qd-v1').clone();
			var modal = $(".qd-v1-modal").clone().appendTo(document.body).addClass('qd-v1-modal-table-measures');

		    if (imgTable.find('.box-banner').length < 1)
				return;

			wrapper.append('<span class="product-qd-v1-table-measures">Tabela de Medidas</span>');	

			$(".product-qd-v1-table-measures").click(function() {
				modal.find('.modal-body').append(imgTable);
				modal.find(imgTable).removeClass('hide');
				modal.modal();

				modal.on('hidden.bs.modal', function() {
					modal.remove();
				});
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
		scrollToBuyButton: function() {
			$('.product-qd-v1-buy-button-float').click(function(e) {
				e.preventDefault();
				
				$('html, body').stop().animate({
					'scrollTop': $('.product-qd-v1-name').offset().top -100
				}, 900, 'swing');
			});
		},
		showCustomize: function () {
			var link = $('<a>').attr('href', '#').addClass('qd-product-customize').text('Personalizar');

			$(document.body).append('<script type="text/javascript" src="/arquivos/JS.jquery.validate.min.js"></script>');
			$('.product-qd-v1-sku-selection-box .product-qd-v1-buy-button').prepend(link);

			$('.qd-product-customize').on("click", function () {
				if ($('a.buy-button[href*="javascript"]').length) {
					$('a.buy-button')[0].click();
					// showSuccessModal();
					return;
				}

				var modal = $('.qd-v1-modal').first().clone();
				modal.addClass('qd-modal-customize');

				modal.find('.modal-header').append($('<h5></h5>').text($('.product-qd-v1-sku-selection-box .product-qd-v1-name').text()));
				modal.find('.modal-header .close').addClass('qd-customize-close').text('Não quero personalizar o produto');

				var modalBody = '<div class="row"><div class="col-xs-12 col-sm-5 qd-customize-image"></div><div class="col-xs-12 col-sm-7 qd-customize-items"></div></div>';
				modal.find('.modal-body').append($.parseHTML(modalBody));
				var urlImg = $('.product-qd-v1-image-wrapper #image-main')[0].src.replace($('.product-qd-v1-image-wrapper #image-main')[0].src.match(/\d+-(\d+-\d+)/)[1], '350-350');
				// var urlImg = '//flickakids.vteximg.com.br/arquivos/ids/157027-350-350/142-FLICKA-KIDS-2015.jpg';
				modal.find('.qd-customize-image').append([$('.product-qd-v1-image-wrapper #image-main').clone().attr('src', urlImg), $('<div class="qd-customize-area">')]);

				var modalItems = '<form class="form-qd-v1"><fieldset class="qd-customize-fieldset-text"><label>Digite o nome</label><div class="input-group"><input type="text" class="qd-baby-name form-control required" placeholder="Escreva aqui o nome do bebê" maxlength="18"  name="qd_form_baby_name"></div><div class="qd-preview-text">Preview: <span></span></div></fieldset>';
				modalItems += '<fieldset><label>Escolha a ilustração</label><div class="input-group"><select class="qd-illustration required" name="qd_form_illustration"><option value="">Sem ilustração</option><option value="sol">Sol</option></option><option value="lua">Lua</option></option><option value="casa">Casa</option></select></div></fieldset>';
				var options = '<label style="font-family:cursive;" class="radio-inline"><input type="radio" value="cursive">Arya</label><label style="font-family:fantasy;" class="radio-inline"><input type="radio" value="fantasy">Jon</label>'
				options += '<label style="font-family:PT Sans;" class="radio-inline"><input type="radio" value="PT Sans">Sansa</label><label style="font-family:Times New Roman;" class="radio-inline"><input type="radio" value="Times New Roman">Jon</label>'
				options += '<label style="font-family:Arial;" class="radio-inline"><input type="radio" value="Arial">Brandon</label><label style="font-family:fantasy;" class="radio-inline"><input type="radio" value="fantasy">Rickson</label>'
				options += '<label style="font-family:Arial Black;" class="radio-inline"><input type="radio" value="Arial Black">Catelyn</label><label style="font-family:webdings;" class="radio-inline"><input type="radio" value="webdings">Jason</label>'
				modalItems += '<fieldset><label>Escolha a fonte</label><div class="qd-font input-group-radio">' + options + '</div></fieldset>';
				modalItems += '<fieldset><label>Escolha a cor</label><div class="input-group"><select class="qd-colors required"><option value="" name="qd_form_color">Sem cor</option><option value="amarelo">Amarelo</option></option><option value="vermelho">Vermelho</option></option><option value="casa">Casa</option></select></div></fieldset>';
				modalItems += '<fieldset><label class="checkbox"><input class="qd-authorize-remove-product required" type="checkbox" name="qd-form-authorize-remove-product" value="autorizado"> Autorizo a Flicka Kids a retirar o produto da embalagem, para realizar a personalização por mim escolhida.</label></fieldset></form>';
				modal.find('.qd-customize-items').append($.parseHTML(modalItems));

				var modalFooter = '<a href="javascript: void(0);" class="qd-customize-close" data-dismiss="modal">Não quero personalizar o produto</a>';
				modal.find('.modal-footer').append([$.parseHTML(modalFooter), $('<div class="qd-customize-price"></div>'), $('<div class="product-qd-v1-buy-button"></div>')]);
				modal.find('.modal-footer .qd-customize-price').append($.parseHTML('Valor com a personalização:<span class="total-price">R$299,90</span>'));
				modal.find('.modal-footer .product-qd-v1-buy-button').append('<a class="buy-button" href="'+$('.product-qd-v1-sku-selection-box .buy-button').first().attr('href')+'" >Comprar personalizado</a>');
				// $('.product-qd-v1-sku-selection-box .buy-button').first().clone().text('Comprar personalizado'));

				modal.insertAfter($('.qd-v1-modal').first());
				modal.modal();

				modal.on('hidden.bs.modal', function (e) {
					$(this).remove();
				});


				$('.qd-customize-items select').on("change", function () {
					if ($(this).val()) {
						$(this).closest('.input-group').addClass('filled');
					} else {
						$(this).closest('.input-group').removeClass('filled');
					}

					if(!$(this).is('.qd-illustration'))
						return;

					var imgUrl = '/arquivos/' + $(this).val() + '.png';
					imgUrl = '/arquivos/icone-amazing-exemplo.png';
					updateCustomize(null, imgUrl, null);
				});
				// $('.qd-customize-items .qd-illustration').on("change", function () {
				// 	var imgUrl = '/arquivos/' + $(this).val() + '.png';
				// 	imgUrl = '/arquivos/icone-amazing-exemplo.png';
				// 	updateCustomize(null, imgUrl, null);

				// 	if ($(this).val()) {
				// 		$(this).closest('.input-group').addClass('filled');
				// 		wrapperCustomize.find('.qd-preview-text').show();
				// 	} else {
				// 		$(this).closest('.input-group').removeClass('filled');
				// 		wrapperCustomize.find('.qd-preview-text').hide();
				// 	}
				// });

				$('.qd-customize-items input[type="radio"]').on("click", function () {
					$('.input-group-radio .radio-inline').removeClass('checked');
					$(this).closest('.radio-inline').addClass('checked');

					updateCustomize(null, null, $(this).val());
				});

				$('input[type="text"], button', '.qd-customize-items').on("click keyup", function () {
					var input = $(this).closest('fieldset').find('input');

					if (input.val()) {
						input.closest('.input-group').addClass('filled');
						updateCustomize(input.val());
					} else {
						input.closest('.input-group').removeClass('filled');
						updateCustomize(" ");
					}

				});

				function getCustomizationOptions() {
					var skuId = skuJson.skus[0].sku;
					var item = [{
						id: skuId,
						quantity: 1,
						seller: skuJson.skus[0].sellerId
					}];
					
					vtexjs.checkout.simulateShipping(item, '', 'BRA')
						.done(function (result) {
							var items = result.items;        
							var itemIndex = null;
							var offeringIndex = null;
							var itemPrice = null;
							var offeringPrice = null;
							var fonts = null;
							var illustrations = null;
							var colors = null;
							
							for (var i = 0; i < items.length; i++) {
								if (items[i].id == skuId) {
									itemIndex = i;
									itemPrice = items[i].sellingPrice;
								}
							}
					
							if (itemIndex == null || itemPrice == null)
								return;
					
							for (var i = 0; i < items[itemIndex].offerings.length; i++) {
								if (items[itemIndex].offerings[i].type == "QD Personaliza nome _sku_") {
									offeringIndex = i;
									offeringPrice = items[itemIndex].offerings[i].price;
								}
							}
					
							if (offeringIndex == null || offeringPrice == null)
								return;
					
							var price = itemPrice + offeringPrice;
							$('.qd-customize-price .total-price').text("R$ " + qd_number_format(price /100, 2, ",", "."));
							
							for (var i = 0; i < items[itemIndex].offerings[offeringIndex].attachmentOfferings.length; i++) {
								if (items[itemIndex].offerings[offeringIndex].attachmentOfferings[i].name == "QD Personaliza nome _anexo_") {
									fonts = items[itemIndex].offerings[offeringIndex].attachmentOfferings[i].schema['Letra'].domain;
									illustrations = items[itemIndex].offerings[offeringIndex].attachmentOfferings[i].schema['Figura'].domain;
									colors = items[itemIndex].offerings[offeringIndex].attachmentOfferings[i].schema['Cor da letra'].domain;
								}
							}
							
							if (fonts == null || illustrations == null || colors == null)
								return;

							$('.qd-illustration').empty();
							$('.qd-colors').empty();

							$('.qd-illustration').append('<option value="">Sem ilustração</option>');
							$('.qd-colors').append('<option value="">Sem cor</option>');

							for (var i = 0; i < illustrations.length; i++)
								$('.qd-illustration').append('<option value="'+illustrations[i]+'">'+illustrations[i]+'</option>');

							for (var i = 0; i < colors.length; i++)
								$('.qd-colors').append('<option value="'+colors[i]+'">'+colors[i]+'</option>');

							$(document.head).append('<link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/select2/4.0.5/css/select2.min.css">');
							$.getScript( "https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.5/js/select2.min.js", function() { 
								$('.qd-illustration').select2({
									placeholder: 'Sem ilustração',
									minimumResultsForSearch: Infinity,					  
									templateResult: function(data) {
										if (!data.id)
										  return data.text;
	
										var imgName = data.text.toLowerCase().replaceSpecialChars();
										var imgUrl = '/arquivos/qd-stamp-' + imgName + '.png';
										var $data = $('<span><img src="' + imgUrl + '" class="img-flag" /> '+data.text+'</span>');
										$data.find('.img-flag').css('width', '40px');
										return $data;
									}
								});
								$('.qd-colors').select2({
									placeholder: 'Sem cor',			  
									templateResult: function(data) {
										if (!data.id)
										  return data.text;
	
										var imgName = data.text.toLowerCase().replaceSpecialChars().replace(' ', '-');
										var imgUrl = '/arquivos/personalizacao-cor-' + imgName + '.jpg';
										var $data = $('<span><img src="' + imgUrl + '" class="img-flag" /> '+data.text+'</span>');
										$data.find('.img-flag').css('width', '40px');
										return $data;
									}
								});
							});

							$('.qd-font').empty();
							
							for (var i = 0; i < fonts.length; i++)
								$('.qd-font').append('<label for="'+fonts[i].toLowerCase().replaceSpecialChars().replace(' ', '-')+'" style="font-family:'+fonts[i]+';" class="radio-inline"><input type="radio" id="'+fonts[i].toLowerCase().replaceSpecialChars().replace(' ', '-')+'" name="qd_font_radio" value="'+fonts[i]+'">'+fonts[i].split(' ').pop()+'</label>');
							
							$('.qd-font .radio-inline').first().find('input').addClass('required');
							
							$('.qd-customize-items input[type="radio"]').on("click", function () {
								$('.input-group-radio .radio-inline').removeClass('checked');
								$(this).closest('.radio-inline').addClass('checked');

								updateCustomize(null, null, $(this).val(), $(this).val().toLowerCase().replace(' ', '-'));
							});

							$('.qd-customize-items .qd-illustration').on("change", function () {
								var imgName = $(this).val().toLowerCase().replace('â', 'a');
								var imgUrl = '/arquivos/qd-stamp-' + imgName + '.png';
								// imgUrl = '/arquivos/icone-amazing-exemplo.png';
								updateCustomize(null, imgUrl, null);
			
								if ($(this).val())
									$(this).closest('.input-group').addClass('filled');
								else
									$(this).closest('.input-group').removeClass('filled');
							});

							$(document.body).append('<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/textfit/2.3.1/textFit.min.js"></script>');
						});
				}

				getCustomizationOptions();

				function updateCustomize(text, imageUrl, font, preview) {
					if (!$('.qd-customize-area #qd_customize_nome').length)
						$('.qd-customize-area').append($('<div id="qd_customize_nome">'));

					wrapperCustomize = $('.qd-customize-area #qd_customize_nome');

					if (imageUrl) {
						var wrapperImg = wrapperCustomize.find('img').length ? wrapperCustomize.find('img') : $('<img>').prependTo(wrapperCustomize);
						wrapperImg.attr('src', imageUrl);
					}
					
					var wrapperText = wrapperCustomize.find('.qd-customize-text').length ? wrapperCustomize.find('.qd-customize-text') : $('<div class="qd-customize-text"><span></span></div>').appendTo(wrapperCustomize);

					if (text) {
						wrapperText.html(text.replace(/\s/gi, '<br>'));
						if (text != " ")
							textFit(wrapperText, {minFontSize:16, maxFontSize: 37});
					}
					if (font)
						wrapperText.find('span').css('font-family', font);

					if (preview) {		
						$('.qd-preview-text span').empty();
						$('.qd-preview-text').hide();

						var img = $('<img src="/arquivos/personalizacao-preview-'+preview+'.jpg" />')
						.load(function(e) {
							$('.qd-preview-text').show();
						})	
						.error(function(e) {
							$('.qd-preview-text').hide();
						})
						.appendTo('.qd-preview-text span');
					}
				}

				function addCustomization(skuId, attContent) {
					var offeringId = null;
					var offeringAttName = "QD Personaliza nome _anexo_";
					var offeringName = null;
					var itemIndex = null;
					var items = vtexjs.checkout.orderForm.items;
				
					for (var i = 0; i < items.length; i++) {
						if (items[i].id == skuId)
							itemIndex = i;
					}
				
					if(itemIndex == null)
						return;
				
					for (var i = 0; i < items[itemIndex].offerings.length; i++) {
						if (items[itemIndex].offerings[i].type == "QD Personaliza nome _sku_") {
							offeringName = items[itemIndex].offerings[i].name;
							offeringId = items[itemIndex].offerings[i].id;
						}
					}
				
					if(offeringId == null || offeringName == null)
						return;
					vtexjs.checkout.addOffering(offeringId, itemIndex)
						.done(function (orderForm) {
							vtexjs.checkout.addBundleItemAttachment(itemIndex, offeringId, offeringAttName, attContent)
								.done(function (orderForm) {
									console.log(orderForm);
									$(window).trigger('QuatroDigital.bia_callback');
								});
						});
				}

				function validateForm() {			
					var $form = $('.qd-customize-items .form-qd-v1');
					$form.validate({
						rules: {
							email: {
								email: true
							}
						},
						submitHandler: function(form) {
							console.log('vem');
							var $form = $(form);
							console.log('$form.valid()');
							console.log($form.valid());
							if (!$form.valid()) return;
							modal.find('.modal-footer').QD_buyButton({
								buyButton: ".product-qd-v1-buy-button .buy-button",
								productPageCallback: showSuccessModal
							});
							// showSuccessModal();
						},
						highlight: function(element) {
							$(element).addClass('error');
							
							if ($(element).is(':radio')) {
								$(element).parents('.input-group-radio').addClass('error');
							} else {
								$(element).parent().addClass('error');
							}
						},
						unhighlight: function(element) {
							$(element).removeClass('error');
							
							if ($(element).is(':radio')) {
								$(element).parents('.input-group-radio').removeClass('error');
							} else {
								$(element).parent().removeClass('error');
							}
						},
						errorPlacement: function() { }
						// 	console.log('error=');
						// 	console.log(error);
						// 	// $(this).parent('div').addClass('error');
						// 	// $(this).parent().addClass('error');
						// 	// $(element).parent('div').addClass('error');
						// 	$(element).parent('div').addClass('error');
						// }
					});

					$form.submit();
				}

				function showSuccessModal() {					
					$(window).one('orderFormUpdated.vtex', function () {
						var content = {
							Letra: (modal.find('.qd-font .checked input').val() || '*** NÃO ***'),
							Texto:  (modal.find('.qd-baby-name').val() || '*** NÃO ***'),
							Figura:  (modal.find('.qd-illustration').val() || '*** NÃO ***'),
							'Cor da letra':  (modal.find('.qd-colors').val() || '*** NÃO ***'),
							'Autoriza abrir embalagem': (modal.find('.qd-authorize-remove-product').is(':checked') ? 'true' : 'false')						
						};
	
						addCustomization(skuJson.skus[0].sku, content);
					});

					$(window).one('QuatroDigital.bia_callback', function () {
						$(document.body).removeClass('.qd-ddc-product-add-time-v2');
						$('.qd-modal-customize').modal('hide');
						
						var modalSuccess = $('.qd-v1-modal').first().clone();
						modalSuccess.addClass('qd-modal-success');
	
						var modalBody = '<a href="javascript: void(0);" class="qd-customize-close" data-dismiss="modal">Fechar</a>';
						modalBody += '<i class="fa fa-check-circle" aria-hidden="true"></i>';
						modalBody += '<h5 class="qd-customize-success">Produto adicionado com sucesso!</h5>';
						modalBody += '<div class="product-qd-v1-buy-button"><a href="/checkout">Finalizar Compra</a></div>';
						modalBody += '<a href="javascript: void(0);" class="qd-customize-continue" data-dismiss="modal">Continuar comprado</a>';
						modalSuccess.find('.modal-body').append($.parseHTML(modalBody));
						modalSuccess.find('.modal-header, .modal-footer').remove();
	
						modalSuccess.modal();						
					});
				}

				// modal.find('.modal-footer').QD_buyButton({
				// 	buyButton: ".product-qd-v1-buy-button .buy-button",
				// 	productPageCallback: validateForm
				// });
				modal.find('.modal-footer .buy-button').click(function(e){
					e.preventDefault();
					validateForm();
					return false;
					// showSuccessModal();
				});

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
var _0x030e=['alerta','toLowerCase','aviso','info','apply','warn','removeClass','qd-ssa-sku-no-selected','addClass','SkuSellersInformation','AvailableQuantity','attr','data-qd-ssa-qtt','each','find','[data-qd-ssa-text]','qd-ssa-show','filter','length','[data-qd-ssa-text=\x22default\x22]','hide','qd-ssa-hide','html','replace','#qtt','show','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','message','qd-ssa-on','qd-ssa-skus-','split','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','skus','QuatroDigital.ssa.prodUnavailable','off','vtex.sku.selected.QD','fromCharCode','charCodeAt','join','ite','---','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','qdPlugin','initialSkuSelected','trigger','QuatroDigital.ssa.skuSelected','prod','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','available','unavailable','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','function','qdAjax','qdAjaxQueue','url','opts','success','error','call','complete','parameters','callbackFns','successPopulated','boolean','errorPopulated','completePopulated','object','clearQueueDelay','jqXHR','undefined','ajax','readyState','data','textStatus','errorThrown','2.1','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','QD_smartStockAvailable','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a'];(function(_0x5ad1d3,_0xce520c){var _0x3d1b45=function(_0x17b773){while(--_0x17b773){_0x5ad1d3['push'](_0x5ad1d3['shift']());}};_0x3d1b45(++_0xce520c);}(_0x030e,0xe5));var _0xe030=function(_0x26c402,_0x44e41a){_0x26c402=_0x26c402-0x0;var _0x373076=_0x030e[_0x26c402];return _0x373076;};(function(_0x44804d){if(_0xe030('0x0')!==typeof _0x44804d[_0xe030('0x1')]){var _0xbd38={};_0x44804d[_0xe030('0x2')]=_0xbd38;_0x44804d[_0xe030('0x1')]=function(_0x542ea0){var _0x24769d=_0x44804d['extend']({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x542ea0);var _0x40660b=escape(encodeURIComponent(_0x24769d[_0xe030('0x3')]));_0xbd38[_0x40660b]=_0xbd38[_0x40660b]||{};_0xbd38[_0x40660b][_0xe030('0x4')]=_0xbd38[_0x40660b][_0xe030('0x4')]||[];_0xbd38[_0x40660b][_0xe030('0x4')]['push']({'success':function(_0x3e4cd8,_0x18737d,_0x19daf5){_0x24769d[_0xe030('0x5')]['call'](this,_0x3e4cd8,_0x18737d,_0x19daf5);},'error':function(_0x527f45,_0x4c62cb,_0xd14027){_0x24769d[_0xe030('0x6')][_0xe030('0x7')](this,_0x527f45,_0x4c62cb,_0xd14027);},'complete':function(_0x4731fd,_0x3753a4){_0x24769d[_0xe030('0x8')]['call'](this,_0x4731fd,_0x3753a4);}});_0xbd38[_0x40660b][_0xe030('0x9')]=_0xbd38[_0x40660b][_0xe030('0x9')]||{'success':{},'error':{},'complete':{}};_0xbd38[_0x40660b]['callbackFns']=_0xbd38[_0x40660b]['callbackFns']||{};_0xbd38[_0x40660b][_0xe030('0xa')][_0xe030('0xb')]=_0xe030('0xc')===typeof _0xbd38[_0x40660b][_0xe030('0xa')][_0xe030('0xb')]?_0xbd38[_0x40660b][_0xe030('0xa')][_0xe030('0xb')]:!0x1;_0xbd38[_0x40660b]['callbackFns'][_0xe030('0xd')]='boolean'===typeof _0xbd38[_0x40660b][_0xe030('0xa')]['errorPopulated']?_0xbd38[_0x40660b][_0xe030('0xa')][_0xe030('0xd')]:!0x1;_0xbd38[_0x40660b][_0xe030('0xa')][_0xe030('0xe')]='boolean'===typeof _0xbd38[_0x40660b]['callbackFns'][_0xe030('0xe')]?_0xbd38[_0x40660b][_0xe030('0xa')][_0xe030('0xe')]:!0x1;_0x542ea0=_0x44804d['extend']({},_0x24769d,{'success':function(_0xeed0d0,_0x2c4c3f,_0x2b467e){_0xbd38[_0x40660b][_0xe030('0x9')][_0xe030('0x5')]={'data':_0xeed0d0,'textStatus':_0x2c4c3f,'jqXHR':_0x2b467e};_0xbd38[_0x40660b][_0xe030('0xa')][_0xe030('0xb')]=!0x0;for(var _0x3fbd9d in _0xbd38[_0x40660b][_0xe030('0x4')])_0xe030('0xf')===typeof _0xbd38[_0x40660b]['opts'][_0x3fbd9d]&&(_0xbd38[_0x40660b][_0xe030('0x4')][_0x3fbd9d][_0xe030('0x5')]['call'](this,_0xeed0d0,_0x2c4c3f,_0x2b467e),_0xbd38[_0x40660b][_0xe030('0x4')][_0x3fbd9d]['success']=function(){});},'error':function(_0x3c841b,_0xb46f26,_0xaaf754){_0xbd38[_0x40660b]['parameters']['error']={'errorThrown':_0xaaf754,'textStatus':_0xb46f26,'jqXHR':_0x3c841b};_0xbd38[_0x40660b][_0xe030('0xa')][_0xe030('0xd')]=!0x0;for(var _0xa10270 in _0xbd38[_0x40660b]['opts'])_0xe030('0xf')===typeof _0xbd38[_0x40660b][_0xe030('0x4')][_0xa10270]&&(_0xbd38[_0x40660b][_0xe030('0x4')][_0xa10270][_0xe030('0x6')][_0xe030('0x7')](this,_0x3c841b,_0xb46f26,_0xaaf754),_0xbd38[_0x40660b]['opts'][_0xa10270]['error']=function(){});},'complete':function(_0x4b4070,_0x180ddf){_0xbd38[_0x40660b]['parameters']['complete']={'textStatus':_0x180ddf,'jqXHR':_0x4b4070};_0xbd38[_0x40660b][_0xe030('0xa')][_0xe030('0xe')]=!0x0;for(var _0x4e5de4 in _0xbd38[_0x40660b][_0xe030('0x4')])'object'===typeof _0xbd38[_0x40660b][_0xe030('0x4')][_0x4e5de4]&&(_0xbd38[_0x40660b][_0xe030('0x4')][_0x4e5de4][_0xe030('0x8')][_0xe030('0x7')](this,_0x4b4070,_0x180ddf),_0xbd38[_0x40660b][_0xe030('0x4')][_0x4e5de4][_0xe030('0x8')]=function(){});isNaN(parseInt(_0x24769d[_0xe030('0x10')]))||setTimeout(function(){_0xbd38[_0x40660b][_0xe030('0x11')]=void 0x0;_0xbd38[_0x40660b][_0xe030('0x4')]=void 0x0;_0xbd38[_0x40660b][_0xe030('0x9')]=void 0x0;_0xbd38[_0x40660b][_0xe030('0xa')]=void 0x0;},_0x24769d[_0xe030('0x10')]);}});_0xe030('0x12')===typeof _0xbd38[_0x40660b]['jqXHR']?_0xbd38[_0x40660b][_0xe030('0x11')]=_0x44804d[_0xe030('0x13')](_0x542ea0):_0xbd38[_0x40660b][_0xe030('0x11')]&&_0xbd38[_0x40660b][_0xe030('0x11')]['readyState']&&0x4==_0xbd38[_0x40660b][_0xe030('0x11')][_0xe030('0x14')]&&(_0xbd38[_0x40660b][_0xe030('0xa')][_0xe030('0xb')]&&_0x542ea0[_0xe030('0x5')](_0xbd38[_0x40660b][_0xe030('0x9')][_0xe030('0x5')][_0xe030('0x15')],_0xbd38[_0x40660b][_0xe030('0x9')][_0xe030('0x5')][_0xe030('0x16')],_0xbd38[_0x40660b]['parameters'][_0xe030('0x5')][_0xe030('0x11')]),_0xbd38[_0x40660b]['callbackFns'][_0xe030('0xd')]&&_0x542ea0[_0xe030('0x6')](_0xbd38[_0x40660b][_0xe030('0x9')][_0xe030('0x6')][_0xe030('0x11')],_0xbd38[_0x40660b][_0xe030('0x9')][_0xe030('0x6')][_0xe030('0x16')],_0xbd38[_0x40660b]['parameters']['error'][_0xe030('0x17')]),_0xbd38[_0x40660b][_0xe030('0xa')]['completePopulated']&&_0x542ea0[_0xe030('0x8')](_0xbd38[_0x40660b]['parameters'][_0xe030('0x8')][_0xe030('0x11')],_0xbd38[_0x40660b][_0xe030('0x9')]['complete'][_0xe030('0x16')]));};_0x44804d[_0xe030('0x1')]['version']=_0xe030('0x18');}}(jQuery));(function(_0x19607d){function _0x4f291a(_0x23125d,_0x3abab6){_0x1a4b24['qdAjax']({'url':'/produto/sku/'+_0x23125d,'clearQueueDelay':null,'success':_0x3abab6,'error':function(){_0x17d93a(_0xe030('0x19'));}});}var _0x1a4b24=jQuery;if(_0xe030('0x0')!==typeof _0x1a4b24['fn'][_0xe030('0x1a')]){var _0x17d93a=function(_0x5aa35c,_0x1fb15a){if(_0xe030('0xf')===typeof console){var _0x2d10b6;_0xe030('0xf')===typeof _0x5aa35c?(_0x5aa35c[_0xe030('0x1b')](_0xe030('0x1c')),_0x2d10b6=_0x5aa35c):_0x2d10b6=[_0xe030('0x1c')+_0x5aa35c];'undefined'===typeof _0x1fb15a||_0xe030('0x1d')!==_0x1fb15a[_0xe030('0x1e')]()&&_0xe030('0x1f')!==_0x1fb15a[_0xe030('0x1e')]()?'undefined'!==typeof _0x1fb15a&&_0xe030('0x20')===_0x1fb15a[_0xe030('0x1e')]()?console[_0xe030('0x20')][_0xe030('0x21')](console,_0x2d10b6):console[_0xe030('0x6')]['apply'](console,_0x2d10b6):console[_0xe030('0x22')][_0xe030('0x21')](console,_0x2d10b6);}},_0x3d04ed={},_0x5c1565=function(_0x11c9ce,_0x97f9a3){function _0x56bf8b(_0x1f721b){try{_0x11c9ce[_0xe030('0x23')](_0xe030('0x24'))[_0xe030('0x25')]('qd-ssa-sku-selected');var _0x1f3840=_0x1f721b[0x0][_0xe030('0x26')][0x0][_0xe030('0x27')];_0x11c9ce[_0xe030('0x28')](_0xe030('0x29'),_0x1f3840);_0x11c9ce[_0xe030('0x2a')](function(){var _0x11c9ce=_0x1a4b24(this)[_0xe030('0x2b')](_0xe030('0x2c'));if(0x1>_0x1f3840)return _0x11c9ce['hide']()['addClass']('qd-ssa-hide')[_0xe030('0x23')](_0xe030('0x2d'));var _0x1f721b=_0x11c9ce[_0xe030('0x2e')]('[data-qd-ssa-text=\x22'+_0x1f3840+'\x22]');_0x1f721b=_0x1f721b[_0xe030('0x2f')]?_0x1f721b:_0x11c9ce[_0xe030('0x2e')](_0xe030('0x30'));_0x11c9ce[_0xe030('0x31')]()[_0xe030('0x25')](_0xe030('0x32'))[_0xe030('0x23')](_0xe030('0x2d'));_0x1f721b[_0xe030('0x33')]((_0x1f721b[_0xe030('0x33')]()||'')[_0xe030('0x34')](_0xe030('0x35'),_0x1f3840));_0x1f721b[_0xe030('0x36')]()['addClass'](_0xe030('0x2d'))[_0xe030('0x23')](_0xe030('0x32'));});}catch(_0xa0b729){_0x17d93a([_0xe030('0x37'),_0xa0b729[_0xe030('0x38')]]);}}if(_0x11c9ce[_0xe030('0x2f')]){_0x11c9ce[_0xe030('0x25')](_0xe030('0x39'));_0x11c9ce[_0xe030('0x25')](_0xe030('0x24'));try{_0x11c9ce[_0xe030('0x25')](_0xe030('0x3a')+vtxctx['skus'][_0xe030('0x3b')](';')[_0xe030('0x2f')]);}catch(_0x28bb03){_0x17d93a([_0xe030('0x3c'),_0x28bb03[_0xe030('0x38')]]);}_0x1a4b24(window)['on'](_0xe030('0x3d'),function(_0x2a33cd,_0x442193,_0x278f92){try{_0x4f291a(_0x278f92[_0xe030('0x3e')],function(_0x180bcf){_0x56bf8b(_0x180bcf);0x1===vtxctx[_0xe030('0x3f')][_0xe030('0x3b')](';')[_0xe030('0x2f')]&&0x0==_0x180bcf[0x0][_0xe030('0x26')][0x0][_0xe030('0x27')]&&_0x1a4b24(window)['trigger'](_0xe030('0x40'));});}catch(_0x5e85c3){_0x17d93a(['Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20',_0x5e85c3[_0xe030('0x38')]]);}});_0x1a4b24(window)[_0xe030('0x41')](_0xe030('0x42'));_0x1a4b24(window)['on']('QuatroDigital.ssa.prodUnavailable',function(){_0x11c9ce['addClass']('qd-ssa-sku-prod-unavailable')[_0xe030('0x31')]();});}};_0x19607d=function(_0x87c5da){var _0x380732={'s':'yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x325ac9){var _0x22d429=function(_0x254ab0){return _0x254ab0;};var _0x3e424c=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x325ac9=_0x325ac9['d'+_0x3e424c[0x10]+'c'+_0x3e424c[0x11]+'m'+_0x22d429(_0x3e424c[0x1])+'n'+_0x3e424c[0xd]]['l'+_0x3e424c[0x12]+'c'+_0x3e424c[0x0]+'ti'+_0x22d429('o')+'n'];var _0x220a11=function(_0xcc389e){return escape(encodeURIComponent(_0xcc389e[_0xe030('0x34')](/\./g,'¨')[_0xe030('0x34')](/[a-zA-Z]/g,function(_0x4549d1){return String[_0xe030('0x43')](('Z'>=_0x4549d1?0x5a:0x7a)>=(_0x4549d1=_0x4549d1[_0xe030('0x44')](0x0)+0xd)?_0x4549d1:_0x4549d1-0x1a);})));};var _0xb029a8=_0x220a11(_0x325ac9[[_0x3e424c[0x9],_0x22d429('o'),_0x3e424c[0xc],_0x3e424c[_0x22d429(0xd)]][_0xe030('0x45')]('')]);_0x220a11=_0x220a11((window[['js',_0x22d429('no'),'m',_0x3e424c[0x1],_0x3e424c[0x4]['toUpperCase'](),_0xe030('0x46')][_0xe030('0x45')]('')]||_0xe030('0x47'))+['.v',_0x3e424c[0xd],'e',_0x22d429('x'),'co',_0x22d429('mm'),'erc',_0x3e424c[0x1],'.c',_0x22d429('o'),'m.',_0x3e424c[0x13],'r'][_0xe030('0x45')](''));for(var _0xdfcabf in _0x380732){if(_0x220a11===_0xdfcabf+_0x380732[_0xdfcabf]||_0xb029a8===_0xdfcabf+_0x380732[_0xdfcabf]){var _0x4e4f56='tr'+_0x3e424c[0x11]+'e';break;}_0x4e4f56='f'+_0x3e424c[0x0]+'ls'+_0x22d429(_0x3e424c[0x1])+'';}_0x22d429=!0x1;-0x1<_0x325ac9[[_0x3e424c[0xc],'e',_0x3e424c[0x0],'rc',_0x3e424c[0x9]]['join']('')][_0xe030('0x48')](_0xe030('0x49'))&&(_0x22d429=!0x0);return[_0x4e4f56,_0x22d429];}(_0x87c5da);}(window);if(!eval(_0x19607d[0x0]))return _0x19607d[0x1]?_0x17d93a(_0xe030('0x4a')):!0x1;_0x1a4b24['fn'][_0xe030('0x1a')]=function(_0x3600b0){var _0x34d3b8=_0x1a4b24(this);_0x3600b0=_0x1a4b24[_0xe030('0x4b')](!0x0,{},_0x3d04ed,_0x3600b0);_0x34d3b8[_0xe030('0x4c')]=new _0x5c1565(_0x34d3b8,_0x3600b0);try{_0xe030('0xf')===typeof _0x1a4b24['fn'][_0xe030('0x1a')][_0xe030('0x4d')]&&_0x1a4b24(window)[_0xe030('0x4e')](_0xe030('0x4f'),[_0x1a4b24['fn']['QD_smartStockAvailable'][_0xe030('0x4d')][_0xe030('0x50')],_0x1a4b24['fn'][_0xe030('0x1a')][_0xe030('0x4d')]['sku']]);}catch(_0x20958c){_0x17d93a([_0xe030('0x51'),_0x20958c['message']]);}_0x1a4b24['fn'][_0xe030('0x1a')]['unavailable']&&_0x1a4b24(window)[_0xe030('0x4e')](_0xe030('0x40'));return _0x34d3b8;};_0x1a4b24(window)['on'](_0xe030('0x42'),function(_0x15c512,_0xc96db9,_0x20c855){try{_0x1a4b24['fn'][_0xe030('0x1a')]['initialSkuSelected']={'prod':_0xc96db9,'sku':_0x20c855},_0x1a4b24(this)['off'](_0x15c512);}catch(_0x20779e){_0x17d93a([_0xe030('0x52'),_0x20779e[_0xe030('0x38')]]);}});_0x1a4b24(window)['on']('vtex.sku.selectable',function(_0x24900d,_0x3b1795,_0x4797f6){try{for(var _0x17930b=_0x4797f6['length'],_0x34c019=_0x3b1795=0x0;_0x34c019<_0x17930b&&!_0x4797f6[_0x34c019][_0xe030('0x53')];_0x34c019++)_0x3b1795+=0x1;_0x17930b<=_0x3b1795&&(_0x1a4b24['fn']['QD_smartStockAvailable'][_0xe030('0x54')]=!0x0);_0x1a4b24(this)[_0xe030('0x41')](_0x24900d);}catch(_0x2bdb60){_0x17d93a([_0xe030('0x55'),_0x2bdb60[_0xe030('0x38')]]);}});_0x1a4b24(function(){_0x1a4b24('.qd_smart_stock_available_auto')[_0xe030('0x1a')]();});}}(window));
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
var _0x8930=['qd-am-li-','qd-am-first','last','qd-am-last','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','charCodeAt','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','filter','.qd-am-banner','length','qd-am-banner-wrapper','parent','qdAjax','url','find','img[alt=\x27','attr','data-qdam-value','.box-banner','clone','insertBefore','hide','[class*=\x27colunas\x27]','qd-am-content-loaded','\x27\x20falho.','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','alerta','li\x20>ul','qd-am-has-ul','children','qd-am-elem-','first','text','replaceSpecialChars','>li','qdAmAddNdx','qd-amazing-menu','>ul','qd-am-dropdown-menu','qd-am-level-','add','callback','call','QuatroDigital.am.callback','extend','exec','.qd_amazing_menu_auto','getParent','closest','function','QD_amazingMenu','object','undefined','info','unshift','[QD\x20Amazing\x20Menu]\x0a','toLowerCase','apply','error','warn','join','each','addClass'];(function(_0x160b64,_0x168efb){var _0x4ad790=function(_0x13b718){while(--_0x13b718){_0x160b64['push'](_0x160b64['shift']());}};_0x4ad790(++_0x168efb);}(_0x8930,0x7e));var _0x0893=function(_0x373186,_0x22fb36){_0x373186=_0x373186-0x0;var _0x94d151=_0x8930[_0x373186];return _0x94d151;};(function(_0x3fd1f5){_0x3fd1f5['fn'][_0x0893('0x0')]=_0x3fd1f5['fn'][_0x0893('0x1')];}(jQuery));(function(_0xda6f0e){var _0x2f204;var _0x3549ee=jQuery;if(_0x0893('0x2')!==typeof _0x3549ee['fn'][_0x0893('0x3')]){var _0x43e3a9={'url':'/qd-amazing-menu','callback':function(){},'ajaxCallback':function(){}};var _0x1d1932=function(_0x353abc,_0x43f9ab){if(_0x0893('0x4')===typeof console&&_0x0893('0x5')!==typeof console['error']&&'undefined'!==typeof console[_0x0893('0x6')]&&_0x0893('0x5')!==typeof console['warn']){var _0x3bf5d5;_0x0893('0x4')===typeof _0x353abc?(_0x353abc[_0x0893('0x7')](_0x0893('0x8')),_0x3bf5d5=_0x353abc):_0x3bf5d5=[_0x0893('0x8')+_0x353abc];if(_0x0893('0x5')===typeof _0x43f9ab||'alerta'!==_0x43f9ab['toLowerCase']()&&'aviso'!==_0x43f9ab[_0x0893('0x9')]())if(_0x0893('0x5')!==typeof _0x43f9ab&&_0x0893('0x6')===_0x43f9ab[_0x0893('0x9')]())try{console[_0x0893('0x6')][_0x0893('0xa')](console,_0x3bf5d5);}catch(_0x51e659){try{console[_0x0893('0x6')](_0x3bf5d5['join']('\x0a'));}catch(_0x106b18){}}else try{console[_0x0893('0xb')][_0x0893('0xa')](console,_0x3bf5d5);}catch(_0x424127){try{console[_0x0893('0xb')](_0x3bf5d5['join']('\x0a'));}catch(_0x469392){}}else try{console[_0x0893('0xc')][_0x0893('0xa')](console,_0x3bf5d5);}catch(_0x48bac2){try{console[_0x0893('0xc')](_0x3bf5d5[_0x0893('0xd')]('\x0a'));}catch(_0x5af173){}}}};_0x3549ee['fn']['qdAmAddNdx']=function(){var _0x2d0b79=_0x3549ee(this);_0x2d0b79[_0x0893('0xe')](function(_0x53f8db){_0x3549ee(this)[_0x0893('0xf')](_0x0893('0x10')+_0x53f8db);});_0x2d0b79['first']()['addClass'](_0x0893('0x11'));_0x2d0b79[_0x0893('0x12')]()[_0x0893('0xf')](_0x0893('0x13'));return _0x2d0b79;};_0x3549ee['fn']['QD_amazingMenu']=function(){};_0xda6f0e=function(_0x1c91d8){var _0x2d9fbd={'s':_0x0893('0x14')};return function(_0x1d842d){var _0x7361e2=function(_0x41de37){return _0x41de37;};var _0x28c8f9=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x1d842d=_0x1d842d['d'+_0x28c8f9[0x10]+'c'+_0x28c8f9[0x11]+'m'+_0x7361e2(_0x28c8f9[0x1])+'n'+_0x28c8f9[0xd]]['l'+_0x28c8f9[0x12]+'c'+_0x28c8f9[0x0]+'ti'+_0x7361e2('o')+'n'];var _0x5e9604=function(_0x291457){return escape(encodeURIComponent(_0x291457[_0x0893('0x15')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x234b64){return String['fromCharCode'](('Z'>=_0x234b64?0x5a:0x7a)>=(_0x234b64=_0x234b64[_0x0893('0x16')](0x0)+0xd)?_0x234b64:_0x234b64-0x1a);})));};var _0x3b95e9=_0x5e9604(_0x1d842d[[_0x28c8f9[0x9],_0x7361e2('o'),_0x28c8f9[0xc],_0x28c8f9[_0x7361e2(0xd)]][_0x0893('0xd')]('')]);_0x5e9604=_0x5e9604((window[['js',_0x7361e2('no'),'m',_0x28c8f9[0x1],_0x28c8f9[0x4]['toUpperCase'](),'ite'][_0x0893('0xd')]('')]||_0x0893('0x17'))+['.v',_0x28c8f9[0xd],'e',_0x7361e2('x'),'co',_0x7361e2('mm'),_0x0893('0x18'),_0x28c8f9[0x1],'.c',_0x7361e2('o'),'m.',_0x28c8f9[0x13],'r'][_0x0893('0xd')](''));for(var _0x494d87 in _0x2d9fbd){if(_0x5e9604===_0x494d87+_0x2d9fbd[_0x494d87]||_0x3b95e9===_0x494d87+_0x2d9fbd[_0x494d87]){var _0x44566a='tr'+_0x28c8f9[0x11]+'e';break;}_0x44566a='f'+_0x28c8f9[0x0]+'ls'+_0x7361e2(_0x28c8f9[0x1])+'';}_0x7361e2=!0x1;-0x1<_0x1d842d[[_0x28c8f9[0xc],'e',_0x28c8f9[0x0],'rc',_0x28c8f9[0x9]]['join']('')][_0x0893('0x19')](_0x0893('0x1a'))&&(_0x7361e2=!0x0);return[_0x44566a,_0x7361e2];}(_0x1c91d8);}(window);if(!eval(_0xda6f0e[0x0]))return _0xda6f0e[0x1]?_0x1d1932(_0x0893('0x1b')):!0x1;var _0x48b4dd=function(_0x591016){var _0x244d9e=_0x591016['find']('.qd_am_code');var _0xce6aa1=_0x244d9e[_0x0893('0x1c')](_0x0893('0x1d'));var _0xd8e102=_0x244d9e[_0x0893('0x1c')]('.qd-am-collection');if(_0xce6aa1['length']||_0xd8e102[_0x0893('0x1e')])_0xce6aa1['parent']()['addClass'](_0x0893('0x1f')),_0xd8e102[_0x0893('0x20')]()['addClass']('qd-am-collection-wrapper'),_0x3549ee[_0x0893('0x21')]({'url':_0x2f204[_0x0893('0x22')],'dataType':'html','success':function(_0x1c99d3){var _0x21bf46=_0x3549ee(_0x1c99d3);_0xce6aa1[_0x0893('0xe')](function(){var _0x1c99d3=_0x3549ee(this);var _0x974929=_0x21bf46[_0x0893('0x23')](_0x0893('0x24')+_0x1c99d3[_0x0893('0x25')](_0x0893('0x26'))+'\x27]');_0x974929[_0x0893('0x1e')]&&(_0x974929[_0x0893('0xe')](function(){_0x3549ee(this)[_0x0893('0x0')](_0x0893('0x27'))[_0x0893('0x28')]()[_0x0893('0x29')](_0x1c99d3);}),_0x1c99d3[_0x0893('0x2a')]());})[_0x0893('0xf')]('qd-am-content-loaded');_0xd8e102[_0x0893('0xe')](function(){var _0x1c99d3={};var _0x4714fa=_0x3549ee(this);_0x21bf46[_0x0893('0x23')]('h2')[_0x0893('0xe')](function(){if(_0x3549ee(this)['text']()['trim']()[_0x0893('0x9')]()==_0x4714fa[_0x0893('0x25')](_0x0893('0x26'))['trim']()[_0x0893('0x9')]())return _0x1c99d3=_0x3549ee(this),!0x1;});_0x1c99d3[_0x0893('0x1e')]&&(_0x1c99d3['each'](function(){_0x3549ee(this)['getParent'](_0x0893('0x2b'))[_0x0893('0x28')]()[_0x0893('0x29')](_0x4714fa);}),_0x4714fa[_0x0893('0x2a')]());})[_0x0893('0xf')](_0x0893('0x2c'));},'error':function(){_0x1d1932('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27'+_0x2f204[_0x0893('0x22')]+_0x0893('0x2d'));},'complete':function(){_0x2f204['ajaxCallback']['call'](this);_0x3549ee(window)[_0x0893('0x2e')](_0x0893('0x2f'),_0x591016);},'clearQueueDelay':0xbb8});};_0x3549ee[_0x0893('0x3')]=function(_0x1cb4d5){var _0x4f2039=_0x1cb4d5['find'](_0x0893('0x30'))[_0x0893('0xe')](function(){var _0x527175=_0x3549ee(this);if(!_0x527175[_0x0893('0x1e')])return _0x1d1932([_0x0893('0x31'),_0x1cb4d5],_0x0893('0x32'));_0x527175[_0x0893('0x23')](_0x0893('0x33'))[_0x0893('0x20')]()['addClass'](_0x0893('0x34'));_0x527175[_0x0893('0x23')]('li')[_0x0893('0xe')](function(){var _0x198a65=_0x3549ee(this);var _0x5df5c1=_0x198a65[_0x0893('0x35')](':not(ul)');_0x5df5c1['length']&&_0x198a65[_0x0893('0xf')](_0x0893('0x36')+_0x5df5c1[_0x0893('0x37')]()[_0x0893('0x38')]()['trim']()[_0x0893('0x39')]()[_0x0893('0x15')](/\./g,'')[_0x0893('0x15')](/\s/g,'-')[_0x0893('0x9')]());});var _0x29adea=_0x527175[_0x0893('0x23')](_0x0893('0x3a'))[_0x0893('0x3b')]();_0x527175['addClass'](_0x0893('0x3c'));_0x29adea=_0x29adea['find'](_0x0893('0x3d'));_0x29adea[_0x0893('0xe')](function(){var _0x3ecfca=_0x3549ee(this);_0x3ecfca['find']('>li')['qdAmAddNdx']()[_0x0893('0xf')]('qd-am-column');_0x3ecfca[_0x0893('0xf')](_0x0893('0x3e'));_0x3ecfca['parent']()['addClass']('qd-am-dropdown');});_0x29adea['addClass']('qd-am-dropdown');var _0x40d580=0x0,_0xda6f0e=function(_0x51e47c){_0x40d580+=0x1;_0x51e47c=_0x51e47c[_0x0893('0x35')]('li')['children']('*');_0x51e47c['length']&&(_0x51e47c[_0x0893('0xf')](_0x0893('0x3f')+_0x40d580),_0xda6f0e(_0x51e47c));};_0xda6f0e(_0x527175);_0x527175[_0x0893('0x40')](_0x527175[_0x0893('0x23')]('ul'))[_0x0893('0xe')](function(){var _0x1ee132=_0x3549ee(this);_0x1ee132['addClass']('qd-am-'+_0x1ee132[_0x0893('0x35')]('li')[_0x0893('0x1e')]+'-li');});});_0x48b4dd(_0x4f2039);_0x2f204[_0x0893('0x41')][_0x0893('0x42')](this);_0x3549ee(window)[_0x0893('0x2e')](_0x0893('0x43'),_0x1cb4d5);};_0x3549ee['fn'][_0x0893('0x3')]=function(_0x455eb2){var _0x34a40f=_0x3549ee(this);if(!_0x34a40f[_0x0893('0x1e')])return _0x34a40f;_0x2f204=_0x3549ee[_0x0893('0x44')]({},_0x43e3a9,_0x455eb2);_0x34a40f[_0x0893('0x45')]=new _0x3549ee[(_0x0893('0x3'))](_0x3549ee(this));return _0x34a40f;};_0x3549ee(function(){_0x3549ee(_0x0893('0x46'))['QD_amazingMenu']();});}}(this));
/* Quatro Digital Smart Cart */
var _0x3338=['\x20para\x20o\x20CEP\x20','</td>','insertBefore','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','qdDdcLastPostalCode','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','done','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','removeProduct','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','buyButtonClicked','allowRecalculate','productId','prod_','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','prodId','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','prepend','QD_smartCart','selector','buyButton','dropDown','updateOnlyHover','QD_buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','closest','abs','undefined','pow','round','toFixed','split','length','join','_QuatroDigital_CartData','callback','function','error','Oooops!\x20','message','object','warn','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','info','toLowerCase','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','ite','---','indexOf','extend','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>','skuName','name','smartCheckout','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','checkout','SDK','cartContainer','append','find','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','removeClass','qd-bb-lightBoxProdAdd','body','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20.qd-ddc-cep','keyup.qd_ddc_cep','click','preventDefault','.qd-ddc-cep-close','hide','click._QD_DDC_closeShipping','target','.qd-ddc-cep-tooltip','.qd-ddc-cep-ok','shippingCalculate','mouseenter.qd_ddc_hover','getCartInfoByUrl','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','texts','#value','cartTotal','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','html','linkCart','.qd_ddc_continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','shippingForm','.qd-ddc-emptyCart\x20p','emptyCart','each','clone','.qd-ddc-infoTotalValue','total','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','items','renderProductsList','call','dataOptionsCache','timeRemoveNewItemClass','getOrderForm','_QuatroDigital_AmountProduct','exec','.qd-ddc-wrapper','addClass','qd-ddc-prodLoaded','QD_checkoutQueue','totalizers','shippingData','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','qd-ddc-','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','attr','.qd-ddc-quantity','val','quantity','insertProdImg','.qd-ddc-image','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','getParent','.qd-ddc-shipping\x20input','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','filter','[data-sku=\x27','scrollCart','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','qd-ddc-cart-empty','callbackProductsList\x20não\x20é\x20uma\x20função','forceImageHTTPS','string','http','https','qd-loaded','load','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku-index','changeQantity','data-sku','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','focusout.qd_ddc_change','.qd-ddc-remove','click.qd_ddc_remove','stop','slideUp','remove','formatCepField','calculateShipping','BRA','.qd-ddc-cep-tooltip-text','logisticsInfo','\x20dia\x20útil','price',',\x20entrega\x20em\x20'];(function(_0x223303,_0x414a4a){var _0x991028=function(_0x4692c0){while(--_0x4692c0){_0x223303['push'](_0x223303['shift']());}};_0x991028(++_0x414a4a);}(_0x3338,0x114));var _0x8333=function(_0x165090,_0x15df3a){_0x165090=_0x165090-0x0;var _0x1a6aab=_0x3338[_0x165090];return _0x1a6aab;};(function(_0x42b3ca){_0x42b3ca['fn']['getParent']=_0x42b3ca['fn'][_0x8333('0x0')];}(jQuery));function qd_number_format(_0x3c54ac,_0xfad628,_0x2e3998,_0x3265a3){_0x3c54ac=(_0x3c54ac+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x3c54ac=isFinite(+_0x3c54ac)?+_0x3c54ac:0x0;_0xfad628=isFinite(+_0xfad628)?Math[_0x8333('0x1')](_0xfad628):0x0;_0x3265a3=_0x8333('0x2')===typeof _0x3265a3?',':_0x3265a3;_0x2e3998=_0x8333('0x2')===typeof _0x2e3998?'.':_0x2e3998;var _0x4dae4c='',_0x4dae4c=function(_0x365ed2,_0x5b3144){var _0xfad628=Math[_0x8333('0x3')](0xa,_0x5b3144);return''+(Math[_0x8333('0x4')](_0x365ed2*_0xfad628)/_0xfad628)[_0x8333('0x5')](_0x5b3144);},_0x4dae4c=(_0xfad628?_0x4dae4c(_0x3c54ac,_0xfad628):''+Math['round'](_0x3c54ac))[_0x8333('0x6')]('.');0x3<_0x4dae4c[0x0]['length']&&(_0x4dae4c[0x0]=_0x4dae4c[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x3265a3));(_0x4dae4c[0x1]||'')[_0x8333('0x7')]<_0xfad628&&(_0x4dae4c[0x1]=_0x4dae4c[0x1]||'',_0x4dae4c[0x1]+=Array(_0xfad628-_0x4dae4c[0x1]['length']+0x1)[_0x8333('0x8')]('0'));return _0x4dae4c[_0x8333('0x8')](_0x2e3998);};(function(){try{window[_0x8333('0x9')]=window[_0x8333('0x9')]||{},window['_QuatroDigital_CartData'][_0x8333('0xa')]=window['_QuatroDigital_CartData'][_0x8333('0xa')]||$['Callbacks']();}catch(_0x488f31){_0x8333('0x2')!==typeof console&&_0x8333('0xb')===typeof console[_0x8333('0xc')]&&console['error'](_0x8333('0xd'),_0x488f31[_0x8333('0xe')]);}}());(function(_0x7d274){try{var _0x4921ce=jQuery,_0x8d1209=function(_0x230cc5,_0x52cf6e){if(_0x8333('0xf')===typeof console&&_0x8333('0x2')!==typeof console[_0x8333('0xc')]&&_0x8333('0x2')!==typeof console['info']&&'undefined'!==typeof console[_0x8333('0x10')]){var _0x2d20bf;_0x8333('0xf')===typeof _0x230cc5?(_0x230cc5[_0x8333('0x11')](_0x8333('0x12')),_0x2d20bf=_0x230cc5):_0x2d20bf=[_0x8333('0x12')+_0x230cc5];if(_0x8333('0x2')===typeof _0x52cf6e||_0x8333('0x13')!==_0x52cf6e['toLowerCase']()&&'aviso'!==_0x52cf6e['toLowerCase']())if(_0x8333('0x2')!==typeof _0x52cf6e&&_0x8333('0x14')===_0x52cf6e[_0x8333('0x15')]())try{console['info']['apply'](console,_0x2d20bf);}catch(_0x4ba596){try{console[_0x8333('0x14')](_0x2d20bf['join']('\x0a'));}catch(_0x328c6b){}}else try{console['error'][_0x8333('0x16')](console,_0x2d20bf);}catch(_0x326247){try{console[_0x8333('0xc')](_0x2d20bf['join']('\x0a'));}catch(_0x46da22){}}else try{console[_0x8333('0x10')][_0x8333('0x16')](console,_0x2d20bf);}catch(_0x28da21){try{console[_0x8333('0x10')](_0x2d20bf[_0x8333('0x8')]('\x0a'));}catch(_0x20a4f3){}}}};window[_0x8333('0x17')]=window[_0x8333('0x17')]||{};window[_0x8333('0x17')][_0x8333('0x18')]=!0x0;_0x4921ce[_0x8333('0x19')]=function(){};_0x4921ce['fn'][_0x8333('0x19')]=function(){return{'fn':new _0x4921ce()};};var _0x10c45a=function(_0x1f9fcb){var _0x3cbb5b={'s':_0x8333('0x1a')};return function(_0x2dbe45){var _0x386181=function(_0x1571f2){return _0x1571f2;};var _0x371b97=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2dbe45=_0x2dbe45['d'+_0x371b97[0x10]+'c'+_0x371b97[0x11]+'m'+_0x386181(_0x371b97[0x1])+'n'+_0x371b97[0xd]]['l'+_0x371b97[0x12]+'c'+_0x371b97[0x0]+'ti'+_0x386181('o')+'n'];var _0x3eae68=function(_0x3e48c8){return escape(encodeURIComponent(_0x3e48c8[_0x8333('0x1b')](/\./g,'¨')[_0x8333('0x1b')](/[a-zA-Z]/g,function(_0xea14ef){return String[_0x8333('0x1c')](('Z'>=_0xea14ef?0x5a:0x7a)>=(_0xea14ef=_0xea14ef[_0x8333('0x1d')](0x0)+0xd)?_0xea14ef:_0xea14ef-0x1a);})));};var _0x3ff996=_0x3eae68(_0x2dbe45[[_0x371b97[0x9],_0x386181('o'),_0x371b97[0xc],_0x371b97[_0x386181(0xd)]][_0x8333('0x8')]('')]);_0x3eae68=_0x3eae68((window[['js',_0x386181('no'),'m',_0x371b97[0x1],_0x371b97[0x4][_0x8333('0x1e')](),_0x8333('0x1f')][_0x8333('0x8')]('')]||_0x8333('0x20'))+['.v',_0x371b97[0xd],'e',_0x386181('x'),'co',_0x386181('mm'),'erc',_0x371b97[0x1],'.c',_0x386181('o'),'m.',_0x371b97[0x13],'r'][_0x8333('0x8')](''));for(var _0x5ba746 in _0x3cbb5b){if(_0x3eae68===_0x5ba746+_0x3cbb5b[_0x5ba746]||_0x3ff996===_0x5ba746+_0x3cbb5b[_0x5ba746]){var _0x23de95='tr'+_0x371b97[0x11]+'e';break;}_0x23de95='f'+_0x371b97[0x0]+'ls'+_0x386181(_0x371b97[0x1])+'';}_0x386181=!0x1;-0x1<_0x2dbe45[[_0x371b97[0xc],'e',_0x371b97[0x0],'rc',_0x371b97[0x9]][_0x8333('0x8')]('')][_0x8333('0x21')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x386181=!0x0);return[_0x23de95,_0x386181];}(_0x1f9fcb);}(window);if(!eval(_0x10c45a[0x0]))return _0x10c45a[0x1]?_0x8d1209('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x4921ce[_0x8333('0x19')]=function(_0x2920d9,_0x41d69c){var _0x3708cc=_0x4921ce(_0x2920d9);if(!_0x3708cc[_0x8333('0x7')])return _0x3708cc;var _0x4e7c57=_0x4921ce[_0x8333('0x22')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x8333('0x23'),'linkCheckout':_0x8333('0x24'),'cartTotal':_0x8333('0x25'),'emptyCart':_0x8333('0x26'),'continueShopping':_0x8333('0x27'),'shippingForm':_0x8333('0x28')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'forceImageHTTPS':!0x1,'skuName':function(_0x531a79){return _0x531a79[_0x8333('0x29')]||_0x531a79[_0x8333('0x2a')];},'callback':function(){},'callbackProductsList':function(){}},_0x41d69c);_0x4921ce('');var _0x5026e1=this;if(_0x4e7c57[_0x8333('0x2b')]){var _0x492a3e=!0x1;_0x8333('0x2')===typeof window[_0x8333('0x2c')]&&(_0x8d1209(_0x8333('0x2d')),_0x4921ce[_0x8333('0x2e')]({'url':_0x8333('0x2f'),'async':!0x1,'dataType':_0x8333('0x30'),'error':function(){_0x8d1209(_0x8333('0x31'));_0x492a3e=!0x0;}}));if(_0x492a3e)return _0x8d1209('A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!');}if(_0x8333('0xf')===typeof window[_0x8333('0x2c')]&&'undefined'!==typeof window[_0x8333('0x2c')]['checkout'])var _0x7d274=window[_0x8333('0x2c')][_0x8333('0x32')];else if(_0x8333('0xf')===typeof vtex&&'object'===typeof vtex[_0x8333('0x32')]&&_0x8333('0x2')!==typeof vtex['checkout']['SDK'])_0x7d274=new vtex[(_0x8333('0x32'))][(_0x8333('0x33'))]();else return _0x8d1209('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x5026e1[_0x8333('0x34')]='<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>';var _0x2b9d9b=function(_0x102acc){_0x4921ce(this)[_0x8333('0x35')](_0x102acc);_0x102acc[_0x8333('0x36')]('.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose')[_0x8333('0x37')](_0x4921ce(_0x8333('0x38')))['on'](_0x8333('0x39'),function(){_0x3708cc[_0x8333('0x3a')](_0x8333('0x3b'));_0x4921ce(document[_0x8333('0x3c')])[_0x8333('0x3a')](_0x8333('0x3d'));});_0x4921ce(document)[_0x8333('0x3e')](_0x8333('0x3f'))['on'](_0x8333('0x3f'),function(_0x37117d){0x1b==_0x37117d[_0x8333('0x40')]&&(_0x3708cc[_0x8333('0x3a')](_0x8333('0x3b')),_0x4921ce(document[_0x8333('0x3c')])[_0x8333('0x3a')]('qd-bb-lightBoxBodyProdAdd'));});var _0x465c58=_0x102acc['find'](_0x8333('0x41'));_0x102acc['find'](_0x8333('0x42'))['on'](_0x8333('0x43'),function(){_0x5026e1['scrollCart']('-',void 0x0,void 0x0,_0x465c58);return!0x1;});_0x102acc[_0x8333('0x36')]('.qd-ddc-scrollDown')['on'](_0x8333('0x44'),function(){_0x5026e1['scrollCart'](void 0x0,void 0x0,void 0x0,_0x465c58);return!0x1;});var _0x177a5d=_0x102acc[_0x8333('0x36')]('.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text');_0x102acc[_0x8333('0x36')](_0x8333('0x45'))['val']('')['on'](_0x8333('0x46'),function(_0x641367){_0x5026e1['formatCepField'](_0x4921ce(this));0xd==_0x641367[_0x8333('0x40')]&&_0x102acc[_0x8333('0x36')]('.qd-ddc-shipping\x20.qd-ddc-cep-ok')[_0x8333('0x47')]();});_0x102acc[_0x8333('0x36')]('.qd-ddc-cep-btn')[_0x8333('0x47')](function(_0x1ccf88){_0x1ccf88[_0x8333('0x48')]();_0x177a5d['toggle']();});_0x102acc[_0x8333('0x36')](_0x8333('0x49'))['click'](function(_0x2c0ac4){_0x2c0ac4[_0x8333('0x48')]();_0x177a5d[_0x8333('0x4a')]();});_0x4921ce(document)[_0x8333('0x3e')](_0x8333('0x4b'))['on'](_0x8333('0x4b'),function(_0x3b87a3){_0x4921ce(_0x3b87a3[_0x8333('0x4c')])[_0x8333('0x0')](_0x102acc[_0x8333('0x36')](_0x8333('0x4d')))[_0x8333('0x7')]||_0x177a5d[_0x8333('0x4a')]();});_0x102acc[_0x8333('0x36')](_0x8333('0x4e'))[_0x8333('0x47')](function(_0x3b4bde){_0x3b4bde[_0x8333('0x48')]();_0x5026e1[_0x8333('0x4f')](_0x102acc[_0x8333('0x36')]('.qd-ddc-cep'));});if(_0x4e7c57['updateOnlyHover']){var _0x41d69c=0x0;_0x4921ce(this)['on'](_0x8333('0x50'),function(){var _0x102acc=function(){window['_QuatroDigital_DropDown'][_0x8333('0x18')]&&(_0x5026e1[_0x8333('0x51')](),window[_0x8333('0x17')]['allowUpdate']=!0x1,_0x4921ce['fn'][_0x8333('0x52')](!0x0),_0x5026e1[_0x8333('0x53')]());};_0x41d69c=setInterval(function(){_0x102acc();},0x258);_0x102acc();});_0x4921ce(this)['on'](_0x8333('0x54'),function(){clearInterval(_0x41d69c);});}};var _0x3a08eb=function(_0x1f801b){_0x1f801b=_0x4921ce(_0x1f801b);_0x4e7c57[_0x8333('0x55')]['cartTotal']=_0x4e7c57[_0x8333('0x55')]['cartTotal'][_0x8333('0x1b')](_0x8333('0x56'),'<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>');_0x4e7c57[_0x8333('0x55')][_0x8333('0x57')]=_0x4e7c57[_0x8333('0x55')][_0x8333('0x57')]['replace']('#items',_0x8333('0x58'));_0x4e7c57[_0x8333('0x55')][_0x8333('0x57')]=_0x4e7c57[_0x8333('0x55')][_0x8333('0x57')][_0x8333('0x1b')]('#shipping',_0x8333('0x59'));_0x4e7c57[_0x8333('0x55')][_0x8333('0x57')]=_0x4e7c57[_0x8333('0x55')][_0x8333('0x57')][_0x8333('0x1b')](_0x8333('0x5a'),_0x8333('0x5b'));_0x1f801b['find'](_0x8333('0x5c'))[_0x8333('0x5d')](_0x4e7c57['texts'][_0x8333('0x5e')]);_0x1f801b['find'](_0x8333('0x5f'))[_0x8333('0x5d')](_0x4e7c57['texts']['continueShopping']);_0x1f801b['find'](_0x8333('0x60'))[_0x8333('0x5d')](_0x4e7c57[_0x8333('0x55')][_0x8333('0x61')]);_0x1f801b[_0x8333('0x36')](_0x8333('0x62'))[_0x8333('0x5d')](_0x4e7c57[_0x8333('0x55')][_0x8333('0x57')]);_0x1f801b['find']('.qd-ddc-shipping')[_0x8333('0x5d')](_0x4e7c57[_0x8333('0x55')][_0x8333('0x63')]);_0x1f801b[_0x8333('0x36')](_0x8333('0x64'))[_0x8333('0x5d')](_0x4e7c57['texts'][_0x8333('0x65')]);return _0x1f801b;}(this[_0x8333('0x34')]);var _0x2d7649=0x0;_0x3708cc[_0x8333('0x66')](function(){0x0<_0x2d7649?_0x2b9d9b['call'](this,_0x3a08eb[_0x8333('0x67')]()):_0x2b9d9b['call'](this,_0x3a08eb);_0x2d7649++;});window[_0x8333('0x9')]['callback'][_0x8333('0x37')](function(){_0x4921ce(_0x8333('0x68'))['html'](window[_0x8333('0x9')][_0x8333('0x69')]||'--');_0x4921ce(_0x8333('0x6a'))[_0x8333('0x5d')](window[_0x8333('0x9')][_0x8333('0x6b')]||'0');_0x4921ce(_0x8333('0x6c'))[_0x8333('0x5d')](window[_0x8333('0x9')][_0x8333('0x6d')]||'--');_0x4921ce(_0x8333('0x6e'))[_0x8333('0x5d')](window[_0x8333('0x9')]['allTotal']||'--');});var _0x469d42=function(_0x4a766e,_0x267a8d){if(_0x8333('0x2')===typeof _0x4a766e[_0x8333('0x6f')])return _0x8d1209('Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição');_0x5026e1[_0x8333('0x70')][_0x8333('0x71')](this,_0x267a8d);};_0x5026e1[_0x8333('0x51')]=function(_0x144fef,_0x260bb4){_0x8333('0x2')!=typeof _0x260bb4?window['_QuatroDigital_DropDown'][_0x8333('0x72')]=_0x260bb4:window[_0x8333('0x17')]['dataOptionsCache']&&(_0x260bb4=window[_0x8333('0x17')]['dataOptionsCache']);setTimeout(function(){window['_QuatroDigital_DropDown']['dataOptionsCache']=void 0x0;},_0x4e7c57[_0x8333('0x73')]);_0x4921ce('.qd-ddc-wrapper')['removeClass']('qd-ddc-prodLoaded');if(_0x4e7c57['smartCheckout']){var _0x1285dc=function(_0x59071a){window['_QuatroDigital_DropDown'][_0x8333('0x74')]=_0x59071a;_0x469d42(_0x59071a,_0x260bb4);_0x8333('0x2')!==typeof window[_0x8333('0x75')]&&'function'===typeof window[_0x8333('0x75')][_0x8333('0x76')]&&window[_0x8333('0x75')][_0x8333('0x76')][_0x8333('0x71')](this);_0x4921ce(_0x8333('0x77'))[_0x8333('0x78')](_0x8333('0x79'));};_0x8333('0x2')!==typeof window[_0x8333('0x17')][_0x8333('0x74')]?(_0x1285dc(window[_0x8333('0x17')][_0x8333('0x74')]),_0x8333('0xb')===typeof _0x144fef&&_0x144fef(window[_0x8333('0x17')]['getOrderForm'])):_0x4921ce[_0x8333('0x7a')]([_0x8333('0x6f'),_0x8333('0x7b'),_0x8333('0x7c')],{'done':function(_0x1c7e2b){_0x1285dc[_0x8333('0x71')](this,_0x1c7e2b);'function'===typeof _0x144fef&&_0x144fef(_0x1c7e2b);},'fail':function(_0x476d1a){_0x8d1209(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0x476d1a]);}});}else alert(_0x8333('0x7d'));};_0x5026e1['cartIsEmpty']=function(){var _0x4be765=_0x4921ce('.qd-ddc-wrapper');_0x4be765[_0x8333('0x36')](_0x8333('0x7e'))[_0x8333('0x7')]?_0x4be765[_0x8333('0x3a')]('qd-ddc-noItems'):_0x4be765[_0x8333('0x78')](_0x8333('0x7f'));};_0x5026e1[_0x8333('0x70')]=function(_0x168df8){var _0x41d69c=_0x4921ce(_0x8333('0x80'));_0x41d69c['empty']();_0x41d69c['each'](function(){var _0x41d69c=_0x4921ce(this),_0x5d9e8a,_0x3689ee,_0x1f9b58=_0x4921ce(''),_0x400e06;for(_0x400e06 in window[_0x8333('0x17')]['getOrderForm']['items'])if(_0x8333('0xf')===typeof window[_0x8333('0x17')]['getOrderForm'][_0x8333('0x6f')][_0x400e06]){var _0x28bc2c=window[_0x8333('0x17')][_0x8333('0x74')][_0x8333('0x6f')][_0x400e06];var _0x2920d9=_0x28bc2c[_0x8333('0x81')]['replace'](/^\/|\/$/g,'')[_0x8333('0x6')]('/');var _0x5e2578=_0x4921ce(_0x8333('0x82'));_0x5e2578['attr']({'data-sku':_0x28bc2c['id'],'data-sku-index':_0x400e06,'data-qd-departament':_0x2920d9[0x0],'data-qd-category':_0x2920d9[_0x2920d9['length']-0x1]});_0x5e2578[_0x8333('0x78')](_0x8333('0x83')+_0x28bc2c[_0x8333('0x84')]);_0x5e2578['find'](_0x8333('0x85'))[_0x8333('0x35')](_0x4e7c57[_0x8333('0x29')](_0x28bc2c));_0x5e2578[_0x8333('0x36')](_0x8333('0x86'))['append'](isNaN(_0x28bc2c[_0x8333('0x87')])?_0x28bc2c['sellingPrice']:0x0==_0x28bc2c[_0x8333('0x87')]?_0x8333('0x88'):(_0x4921ce(_0x8333('0x89'))[_0x8333('0x8a')]('content')||'R$')+'\x20'+qd_number_format(_0x28bc2c[_0x8333('0x87')]/0x64,0x2,',','.'));_0x5e2578['find'](_0x8333('0x8b'))['attr']({'data-sku':_0x28bc2c['id'],'data-sku-index':_0x400e06})[_0x8333('0x8c')](_0x28bc2c[_0x8333('0x8d')]);_0x5e2578['find']('.qd-ddc-remove')[_0x8333('0x8a')]({'data-sku':_0x28bc2c['id'],'data-sku-index':_0x400e06});_0x5026e1[_0x8333('0x8e')](_0x28bc2c['id'],_0x5e2578[_0x8333('0x36')](_0x8333('0x8f')),_0x28bc2c['imageUrl']);_0x5e2578[_0x8333('0x36')](_0x8333('0x90'))[_0x8333('0x8a')]({'data-sku':_0x28bc2c['id'],'data-sku-index':_0x400e06});_0x5e2578[_0x8333('0x91')](_0x41d69c);_0x1f9b58=_0x1f9b58[_0x8333('0x37')](_0x5e2578);}try{var _0x2898e6=_0x41d69c[_0x8333('0x92')]('.qd-ddc-wrapper')['find'](_0x8333('0x93'));_0x2898e6[_0x8333('0x7')]&&''==_0x2898e6[_0x8333('0x8c')]()&&window[_0x8333('0x17')][_0x8333('0x74')]['shippingData'][_0x8333('0x94')]&&_0x2898e6[_0x8333('0x8c')](window[_0x8333('0x17')][_0x8333('0x74')][_0x8333('0x7c')][_0x8333('0x94')][_0x8333('0x95')]);}catch(_0x11819b){_0x8d1209(_0x8333('0x96')+_0x11819b[_0x8333('0xe')],'aviso');}_0x5026e1[_0x8333('0x97')](_0x41d69c);_0x5026e1['cartIsEmpty']();_0x168df8&&_0x168df8[_0x8333('0x98')]&&function(){_0x3689ee=_0x1f9b58[_0x8333('0x99')](_0x8333('0x9a')+_0x168df8['lastSku']+'\x27]');_0x3689ee['length']&&(_0x5d9e8a=0x0,_0x1f9b58[_0x8333('0x66')](function(){var _0x168df8=_0x4921ce(this);if(_0x168df8['is'](_0x3689ee))return!0x1;_0x5d9e8a+=_0x168df8['outerHeight']();}),_0x5026e1[_0x8333('0x9b')](void 0x0,void 0x0,_0x5d9e8a,_0x41d69c[_0x8333('0x37')](_0x41d69c['parent']())),_0x1f9b58[_0x8333('0x3a')]('qd-ddc-lastAddedFixed'),function(_0x166da7){_0x166da7[_0x8333('0x78')](_0x8333('0x9c'));_0x166da7[_0x8333('0x78')]('qd-ddc-lastAddedFixed');setTimeout(function(){_0x166da7[_0x8333('0x3a')](_0x8333('0x9c'));},_0x4e7c57[_0x8333('0x73')]);}(_0x3689ee),_0x4921ce(document[_0x8333('0x3c')])[_0x8333('0x78')](_0x8333('0x9d')),setTimeout(function(){_0x4921ce(document[_0x8333('0x3c')])[_0x8333('0x3a')](_0x8333('0x9d'));},_0x4e7c57['timeRemoveNewItemClass']));}();});(function(){_QuatroDigital_DropDown['getOrderForm'][_0x8333('0x6f')][_0x8333('0x7')]?(_0x4921ce('body')[_0x8333('0x3a')]('qd-ddc-cart-empty')[_0x8333('0x78')](_0x8333('0x9e')),setTimeout(function(){_0x4921ce('body')['removeClass'](_0x8333('0x9f'));},_0x4e7c57[_0x8333('0x73')])):_0x4921ce(_0x8333('0x3c'))['removeClass'](_0x8333('0xa0'))[_0x8333('0x78')](_0x8333('0xa1'));}());_0x8333('0xb')===typeof _0x4e7c57['callbackProductsList']?_0x4e7c57['callbackProductsList'][_0x8333('0x71')](this):_0x8d1209(_0x8333('0xa2'));};_0x5026e1[_0x8333('0x8e')]=function(_0x34a766,_0x503686,_0x598aca){function _0x448375(){_0x4e7c57[_0x8333('0xa3')]&&_0x8333('0xa4')==typeof _0x598aca&&(_0x598aca=_0x598aca[_0x8333('0x1b')](_0x8333('0xa5'),_0x8333('0xa6')));_0x503686[_0x8333('0x3a')](_0x8333('0xa7'))[_0x8333('0xa8')](function(){_0x4921ce(this)[_0x8333('0x78')](_0x8333('0xa7'));})[_0x8333('0x8a')](_0x8333('0xa9'),_0x598aca);}_0x598aca?_0x448375():isNaN(_0x34a766)?_0x8d1209(_0x8333('0xaa'),'alerta'):alert(_0x8333('0xab'));};_0x5026e1[_0x8333('0x97')]=function(_0x4a3c82){var _0x41d69c=function(_0x9e791e,_0x2d5089){var _0x2ed5a6=_0x4921ce(_0x9e791e);var _0x5e98da=_0x2ed5a6[_0x8333('0x8a')]('data-sku');var _0x2920d9=_0x2ed5a6[_0x8333('0x8a')](_0x8333('0xac'));if(_0x5e98da){var _0x5e2a9b=parseInt(_0x2ed5a6[_0x8333('0x8c')]())||0x1;_0x5026e1[_0x8333('0xad')]([_0x5e98da,_0x2920d9],_0x5e2a9b,_0x5e2a9b+0x1,function(_0x3e7942){_0x2ed5a6[_0x8333('0x8c')](_0x3e7942);'function'===typeof _0x2d5089&&_0x2d5089();});}};var _0x461490=function(_0x5311d6,_0x24ae77){var _0x41d69c=_0x4921ce(_0x5311d6);var _0x4980a6=_0x41d69c[_0x8333('0x8a')]('data-sku');var _0x1654c0=_0x41d69c[_0x8333('0x8a')](_0x8333('0xac'));if(_0x4980a6){var _0x2920d9=parseInt(_0x41d69c[_0x8333('0x8c')]())||0x2;_0x5026e1[_0x8333('0xad')]([_0x4980a6,_0x1654c0],_0x2920d9,_0x2920d9-0x1,function(_0x3c1192){_0x41d69c[_0x8333('0x8c')](_0x3c1192);_0x8333('0xb')===typeof _0x24ae77&&_0x24ae77();});}};var _0x4365d9=function(_0x156e10,_0x46380c){var _0x49b755=_0x4921ce(_0x156e10);var _0x296229=_0x49b755[_0x8333('0x8a')](_0x8333('0xae'));var _0x2920d9=_0x49b755[_0x8333('0x8a')]('data-sku-index');if(_0x296229){var _0x512212=parseInt(_0x49b755[_0x8333('0x8c')]())||0x1;_0x5026e1[_0x8333('0xad')]([_0x296229,_0x2920d9],0x1,_0x512212,function(_0xa3c85d){_0x49b755[_0x8333('0x8c')](_0xa3c85d);_0x8333('0xb')===typeof _0x46380c&&_0x46380c();});}};var _0x2920d9=_0x4a3c82[_0x8333('0x36')]('.qd-ddc-prodQttWrapper:not(.qd_on)');_0x2920d9[_0x8333('0x78')](_0x8333('0xaf'))['each'](function(){var _0x4a3c82=_0x4921ce(this);_0x4a3c82['find'](_0x8333('0xb0'))['on'](_0x8333('0xb1'),function(_0x210983){_0x210983[_0x8333('0x48')]();_0x2920d9['addClass'](_0x8333('0xb2'));_0x41d69c(_0x4a3c82[_0x8333('0x36')](_0x8333('0x8b')),function(){_0x2920d9[_0x8333('0x3a')]('qd-loading');});});_0x4a3c82[_0x8333('0x36')](_0x8333('0xb3'))['on']('click.qd_ddc_minus',function(_0x30f42f){_0x30f42f['preventDefault']();_0x2920d9['addClass'](_0x8333('0xb2'));_0x461490(_0x4a3c82[_0x8333('0x36')](_0x8333('0x8b')),function(){_0x2920d9[_0x8333('0x3a')](_0x8333('0xb2'));});});_0x4a3c82[_0x8333('0x36')](_0x8333('0x8b'))['on'](_0x8333('0xb4'),function(){_0x2920d9[_0x8333('0x78')](_0x8333('0xb2'));_0x4365d9(this,function(){_0x2920d9[_0x8333('0x3a')](_0x8333('0xb2'));});});_0x4a3c82['find'](_0x8333('0x8b'))['on']('keyup.qd_ddc_change',function(_0x3b96e5){0xd==_0x3b96e5['keyCode']&&(_0x2920d9[_0x8333('0x78')](_0x8333('0xb2')),_0x4365d9(this,function(){_0x2920d9[_0x8333('0x3a')](_0x8333('0xb2'));}));});});_0x4a3c82['find'](_0x8333('0x7e'))[_0x8333('0x66')](function(){var _0x4a3c82=_0x4921ce(this);_0x4a3c82[_0x8333('0x36')](_0x8333('0xb5'))['on'](_0x8333('0xb6'),function(){_0x4a3c82['addClass'](_0x8333('0xb2'));_0x5026e1['removeProduct'](_0x4921ce(this),function(_0x480b4f){_0x480b4f?_0x4a3c82[_0x8333('0xb7')](!0x0)[_0x8333('0xb8')](function(){_0x4a3c82[_0x8333('0xb9')]();_0x5026e1[_0x8333('0x53')]();}):_0x4a3c82['removeClass'](_0x8333('0xb2'));});return!0x1;});});};_0x5026e1[_0x8333('0xba')]=function(_0x2844e7){var _0x1b744e=_0x2844e7[_0x8333('0x8c')]();_0x1b744e=_0x1b744e['replace'](/[^0-9\-]/g,'');_0x1b744e=_0x1b744e['replace'](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3');_0x1b744e=_0x1b744e[_0x8333('0x1b')](/(.{9}).*/g,'$1');_0x2844e7[_0x8333('0x8c')](_0x1b744e);};_0x5026e1[_0x8333('0x4f')]=function(_0x529549){var _0x5a7cd6=_0x529549[_0x8333('0x8c')]();0x9<=_0x5a7cd6[_0x8333('0x7')]&&(_0x529549['data']('qdDdcLastPostalCode')!=_0x5a7cd6&&_0x7d274[_0x8333('0xbb')]({'postalCode':_0x5a7cd6,'country':_0x8333('0xbc')})['done'](function(_0x38a9bf){_0x529549[_0x8333('0x0')](_0x8333('0xbd'))['find']('.qd-dd-cep-slas')[_0x8333('0xb9')]();window['_QuatroDigital_DropDown'][_0x8333('0x74')]=_0x38a9bf;_0x5026e1[_0x8333('0x51')]();_0x38a9bf=_0x38a9bf[_0x8333('0x7c')][_0x8333('0xbe')][0x0]['slas'];for(var _0x2920d9=_0x4921ce('<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>'),_0x5dfb58=0x0;_0x5dfb58<_0x38a9bf[_0x8333('0x7')];_0x5dfb58++){var _0x41c89d=_0x38a9bf[_0x5dfb58],_0x42eaf6=0x1<_0x41c89d['shippingEstimate']?_0x41c89d['shippingEstimate'][_0x8333('0x1b')]('bd',_0x8333('0xbf')):_0x41c89d['shippingEstimate']['replace']('bd','\x20dias\x20útéis'),_0x575748=_0x4921ce('<tr></tr>');_0x575748['append']('<td>\x20R$\x20'+qd_number_format(_0x41c89d[_0x8333('0xc0')]/0x64,0x2,',','.')+'</td><td>'+_0x41c89d[_0x8333('0x2a')]+_0x8333('0xc1')+_0x42eaf6+_0x8333('0xc2')+_0x5a7cd6+_0x8333('0xc3'));_0x575748[_0x8333('0x91')](_0x2920d9[_0x8333('0x36')]('tbody'));}_0x2920d9[_0x8333('0xc4')](_0x529549[_0x8333('0x0')](_0x8333('0xbd'))[_0x8333('0x36')](_0x8333('0x49')));})[_0x8333('0xc5')](function(_0x1f502f){_0x8d1209([_0x8333('0xc6'),_0x1f502f]);updateCartData();}),_0x529549['data'](_0x8333('0xc7'),_0x5a7cd6));};_0x5026e1[_0x8333('0xad')]=function(_0x873f26,_0x2f754c,_0x2932ae,_0x295c65){function _0x2f48f6(_0x1f47de){_0x1f47de=_0x8333('0xc8')!==typeof _0x1f47de?!0x1:_0x1f47de;_0x5026e1[_0x8333('0x51')]();window[_0x8333('0x17')]['allowUpdate']=!0x1;_0x5026e1[_0x8333('0x53')]();_0x8333('0x2')!==typeof window[_0x8333('0x75')]&&_0x8333('0xb')===typeof window['_QuatroDigital_AmountProduct'][_0x8333('0x76')]&&window[_0x8333('0x75')][_0x8333('0x76')][_0x8333('0x71')](this);_0x8333('0xb')===typeof adminCart&&adminCart();_0x4921ce['fn']['simpleCart'](!0x0,void 0x0,_0x1f47de);_0x8333('0xb')===typeof _0x295c65&&_0x295c65(_0x2f754c);}_0x2932ae=_0x2932ae||0x1;if(0x1>_0x2932ae)return _0x2f754c;if(_0x4e7c57[_0x8333('0x2b')]){if('undefined'===typeof window['_QuatroDigital_DropDown'][_0x8333('0x74')]['items'][_0x873f26[0x1]])return _0x8d1209(_0x8333('0xc9')+_0x873f26[0x1]+']'),_0x2f754c;window[_0x8333('0x17')][_0x8333('0x74')][_0x8333('0x6f')][_0x873f26[0x1]]['quantity']=_0x2932ae;window['_QuatroDigital_DropDown'][_0x8333('0x74')][_0x8333('0x6f')][_0x873f26[0x1]][_0x8333('0xca')]=_0x873f26[0x1];_0x7d274[_0x8333('0xcb')]([window[_0x8333('0x17')][_0x8333('0x74')][_0x8333('0x6f')][_0x873f26[0x1]]],[_0x8333('0x6f'),'totalizers',_0x8333('0x7c')])[_0x8333('0xcc')](function(_0x18351d){window[_0x8333('0x17')]['getOrderForm']=_0x18351d;_0x2f48f6(!0x0);})[_0x8333('0xc5')](function(_0x5e6da5){_0x8d1209([_0x8333('0xcd'),_0x5e6da5]);_0x2f48f6();});}else _0x8d1209(_0x8333('0xce'));};_0x5026e1[_0x8333('0xcf')]=function(_0x5bde42,_0x3cd2be){function _0x517c99(_0x2064bc){_0x2064bc='boolean'!==typeof _0x2064bc?!0x1:_0x2064bc;'undefined'!==typeof window[_0x8333('0x75')]&&'function'===typeof window[_0x8333('0x75')][_0x8333('0x76')]&&window['_QuatroDigital_AmountProduct'][_0x8333('0x76')][_0x8333('0x71')](this);_0x8333('0xb')===typeof adminCart&&adminCart();_0x4921ce['fn'][_0x8333('0x52')](!0x0,void 0x0,_0x2064bc);'function'===typeof _0x3cd2be&&_0x3cd2be(_0x4b35f1);}var _0x4b35f1=!0x1,_0x2920d9=_0x4921ce(_0x5bde42)['attr'](_0x8333('0xac'));if(_0x4e7c57[_0x8333('0x2b')]){if(_0x8333('0x2')===typeof window['_QuatroDigital_DropDown'][_0x8333('0x74')]['items'][_0x2920d9])return _0x8d1209(_0x8333('0xc9')+_0x2920d9+']'),_0x4b35f1;window[_0x8333('0x17')][_0x8333('0x74')][_0x8333('0x6f')][_0x2920d9]['index']=_0x2920d9;_0x7d274[_0x8333('0xd0')]([window['_QuatroDigital_DropDown'][_0x8333('0x74')][_0x8333('0x6f')][_0x2920d9]],[_0x8333('0x6f'),'totalizers',_0x8333('0x7c')])[_0x8333('0xcc')](function(_0x6c0958){_0x4b35f1=!0x0;window['_QuatroDigital_DropDown']['getOrderForm']=_0x6c0958;_0x469d42(_0x6c0958);_0x517c99(!0x0);})[_0x8333('0xc5')](function(_0x2e85f0){_0x8d1209([_0x8333('0xd1'),_0x2e85f0]);_0x517c99();});}else alert('Atenção,\x20este\x20método\x20esta\x20descontinuado.');};_0x5026e1[_0x8333('0x9b')]=function(_0x128653,_0x158504,_0x4beb9f,_0x25991a){_0x25991a=_0x25991a||_0x4921ce('.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2');_0x128653=_0x128653||'+';_0x158504=_0x158504||0.9*_0x25991a[_0x8333('0xd2')]();_0x25991a[_0x8333('0xb7')](!0x0,!0x0)[_0x8333('0xd3')]({'scrollTop':isNaN(_0x4beb9f)?_0x128653+'='+_0x158504+'px':_0x4beb9f});};_0x4e7c57['updateOnlyHover']||(_0x5026e1[_0x8333('0x51')](),_0x4921ce['fn'][_0x8333('0x52')](!0x0));_0x4921ce(window)['on'](_0x8333('0xd4'),function(){try{window[_0x8333('0x17')][_0x8333('0x74')]=void 0x0,_0x5026e1[_0x8333('0x51')]();}catch(_0x279f2d){_0x8d1209(_0x8333('0xd5')+_0x279f2d[_0x8333('0xe')],_0x8333('0xd6'));}});_0x8333('0xb')===typeof _0x4e7c57[_0x8333('0xa')]?_0x4e7c57[_0x8333('0xa')][_0x8333('0x71')](this):_0x8d1209('Callback\x20não\x20é\x20uma\x20função');};_0x4921ce['fn'][_0x8333('0x19')]=function(_0x4685a9){var _0x5f347c=_0x4921ce(this);_0x5f347c['fn']=new _0x4921ce[(_0x8333('0x19'))](this,_0x4685a9);return _0x5f347c;};}catch(_0x46fb08){_0x8333('0x2')!==typeof console&&_0x8333('0xb')===typeof console[_0x8333('0xc')]&&console[_0x8333('0xc')]('Oooops!\x20',_0x46fb08);}}(this));(function(_0x51c48d){try{var _0x32908e=jQuery;window[_0x8333('0x75')]=window['_QuatroDigital_AmountProduct']||{};window[_0x8333('0x75')][_0x8333('0x6f')]={};window['_QuatroDigital_AmountProduct']['allowRecalculate']=!0x1;window[_0x8333('0x75')][_0x8333('0xd7')]=!0x1;window[_0x8333('0x75')]['quickViewUpdate']=!0x1;var _0x36bcc1=function(){if(window['_QuatroDigital_AmountProduct'][_0x8333('0xd8')]){var _0x5cf963=!0x1;var _0x5a1c0a={};window[_0x8333('0x75')][_0x8333('0x6f')]={};for(_0x64c4d2 in window[_0x8333('0x17')]['getOrderForm'][_0x8333('0x6f')])if(_0x8333('0xf')===typeof window[_0x8333('0x17')][_0x8333('0x74')][_0x8333('0x6f')][_0x64c4d2]){var _0x36b028=window[_0x8333('0x17')][_0x8333('0x74')]['items'][_0x64c4d2];_0x8333('0x2')!==typeof _0x36b028['productId']&&null!==_0x36b028[_0x8333('0xd9')]&&''!==_0x36b028[_0x8333('0xd9')]&&(window[_0x8333('0x75')][_0x8333('0x6f')][_0x8333('0xda')+_0x36b028[_0x8333('0xd9')]]=window[_0x8333('0x75')]['items'][_0x8333('0xda')+_0x36b028[_0x8333('0xd9')]]||{},window[_0x8333('0x75')][_0x8333('0x6f')][_0x8333('0xda')+_0x36b028[_0x8333('0xd9')]]['prodId']=_0x36b028[_0x8333('0xd9')],_0x5a1c0a[_0x8333('0xda')+_0x36b028[_0x8333('0xd9')]]||(window[_0x8333('0x75')]['items'][_0x8333('0xda')+_0x36b028[_0x8333('0xd9')]][_0x8333('0x6b')]=0x0),window[_0x8333('0x75')][_0x8333('0x6f')][_0x8333('0xda')+_0x36b028[_0x8333('0xd9')]][_0x8333('0x6b')]+=_0x36b028['quantity'],_0x5cf963=!0x0,_0x5a1c0a['prod_'+_0x36b028['productId']]=!0x0);}var _0x64c4d2=_0x5cf963;}else _0x64c4d2=void 0x0;window[_0x8333('0x75')][_0x8333('0xd8')]&&(_0x32908e(_0x8333('0xdb'))[_0x8333('0xb9')](),_0x32908e(_0x8333('0xdc'))[_0x8333('0x3a')](_0x8333('0xdd')));for(var _0x18626d in window[_0x8333('0x75')][_0x8333('0x6f')]){_0x36b028=window['_QuatroDigital_AmountProduct'][_0x8333('0x6f')][_0x18626d];if('object'!==typeof _0x36b028)return;_0x5a1c0a=_0x32908e(_0x8333('0xde')+_0x36b028[_0x8333('0xdf')]+']')[_0x8333('0x92')]('li');if(window['_QuatroDigital_AmountProduct'][_0x8333('0xd8')]||!_0x5a1c0a[_0x8333('0x36')](_0x8333('0xdb'))[_0x8333('0x7')])_0x5cf963=_0x32908e(_0x8333('0xe0')),_0x5cf963[_0x8333('0x36')](_0x8333('0xe1'))[_0x8333('0x5d')](_0x36b028['qtt']),_0x36b028=_0x5a1c0a[_0x8333('0x36')]('.qd_bap_wrapper_content'),_0x36b028[_0x8333('0x7')]?_0x36b028[_0x8333('0xe2')](_0x5cf963)['addClass']('qd-bap-item-added'):_0x5a1c0a[_0x8333('0xe2')](_0x5cf963);}_0x64c4d2&&(window[_0x8333('0x75')]['allowRecalculate']=!0x1);};window['_QuatroDigital_AmountProduct']['exec']=function(){window[_0x8333('0x75')][_0x8333('0xd8')]=!0x0;_0x36bcc1[_0x8333('0x71')](this);};_0x32908e(document)['ajaxStop'](function(){_0x36bcc1['call'](this);});}catch(_0xe1dc49){_0x8333('0x2')!==typeof console&&_0x8333('0xb')===typeof console[_0x8333('0xc')]&&console[_0x8333('0xc')]('Oooops!\x20',_0xe1dc49);}}(this));(function(){try{var _0x5c70bd=jQuery,_0x2a0fc2,_0x443823={'selector':'.qdDdcContainer','dropDown':{},'buyButton':{}};_0x5c70bd[_0x8333('0xe3')]=function(_0x5226f0){var _0x3f8627={};_0x2a0fc2=_0x5c70bd[_0x8333('0x22')](!0x0,{},_0x443823,_0x5226f0);_0x5226f0=_0x5c70bd(_0x2a0fc2[_0x8333('0xe4')])[_0x8333('0x19')](_0x2a0fc2['dropDown']);_0x3f8627[_0x8333('0xe5')]=_0x8333('0x2')!==typeof _0x2a0fc2[_0x8333('0xe6')][_0x8333('0xe7')]&&!0x1===_0x2a0fc2[_0x8333('0xe6')][_0x8333('0xe7')]?_0x5c70bd(_0x2a0fc2[_0x8333('0xe4')])[_0x8333('0xe8')](_0x5226f0['fn'],_0x2a0fc2[_0x8333('0xe5')]):_0x5c70bd(_0x2a0fc2[_0x8333('0xe4')])['QD_buyButton'](_0x2a0fc2[_0x8333('0xe5')]);_0x3f8627[_0x8333('0xe6')]=_0x5226f0;return _0x3f8627;};_0x5c70bd['fn'][_0x8333('0xe9')]=function(){_0x8333('0xf')===typeof console&&_0x8333('0xb')===typeof console[_0x8333('0x14')]&&console[_0x8333('0x14')](_0x8333('0xea'));};_0x5c70bd[_0x8333('0xe9')]=_0x5c70bd['fn']['smartCart'];}catch(_0x138ab9){_0x8333('0x2')!==typeof console&&_0x8333('0xb')===typeof console[_0x8333('0xc')]&&console[_0x8333('0xc')](_0x8333('0xd'),_0x138ab9);}}());

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0xa9e0=['youtube','attr','click','contentWindow','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','start','insertThumbsIn','appendTo','trigger','QuatroDigital.pv_video_added','ajaxStop','load','ImageControl','.qd-videoLink','body','object','alerta','toLowerCase','warn','info','[Video\x20in\x20product]\x20','error','qdVideoInProduct','ul.thumbs','div#image','text','replace','split','length','indexOf','push','pop','shift','be/','<div\x20class=\x22qd-playerWrapper\x22></div>','prependTo','#include','wrap','<div\x20class=\x22qd-playerContainer\x22></div>','fromCharCode','join','toUpperCase','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','html','<iframe\x20src=\x22','urlProtocol','://www.youtube.com/embed/','?wmode=transparent&rel=0&enablejsapi=1&autoplay=','autoPlay','&mute=','mute','data','height','stop','fadeTo','addClass','qdpv-video-on','add','animate','iframe','find','a:not(\x27.qd-videoLink\x27)','bind','click.removeVideo','hide','removeAttr','style','removeClass','.qd-videoItem','call','string','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','click.playVideo','controlVideo','.qd-playerWrapper\x20iframe','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','rel'];(function(_0x41c742,_0x43f665){var _0x339e64=function(_0x249b90){while(--_0x249b90){_0x41c742['push'](_0x41c742['shift']());}};_0x339e64(++_0x43f665);}(_0xa9e0,0x1a9));var _0x0a9e=function(_0x26d19f,_0x347f31){_0x26d19f=_0x26d19f-0x0;var _0x14e5f4=_0xa9e0[_0x26d19f];return _0x14e5f4;};(function(_0x4a3682){$(function(){if($(document[_0x0a9e('0x0')])['is']('.produto')){var _0x333808=[];var _0x432180=function(_0x2ab90b,_0x991246){_0x0a9e('0x1')===typeof console&&('undefined'!==typeof _0x991246&&_0x0a9e('0x2')===_0x991246[_0x0a9e('0x3')]()?console[_0x0a9e('0x4')]('[Video\x20in\x20product]\x20'+_0x2ab90b):'undefined'!==typeof _0x991246&&_0x0a9e('0x5')===_0x991246['toLowerCase']()?console['info'](_0x0a9e('0x6')+_0x2ab90b):console[_0x0a9e('0x7')](_0x0a9e('0x6')+_0x2ab90b));};window[_0x0a9e('0x8')]=window[_0x0a9e('0x8')]||{};var _0xbd1168=$['extend'](!0x0,{'insertThumbsIn':'start','videoFieldSelector':'td.value-field.Videos:first','controlVideo':!0x0,'urlProtocol':'http','autoPlay':0x0,'mute':0x0},window[_0x0a9e('0x8')]);var _0x36471c=$(_0x0a9e('0x9'));var _0x26d672=$(_0x0a9e('0xa'));var _0x69aeb7=$(_0xbd1168['videoFieldSelector'])[_0x0a9e('0xb')]()[_0x0a9e('0xc')](/;\s*/,';')[_0x0a9e('0xd')](';');for(var _0x281129=0x0;_0x281129<_0x69aeb7[_0x0a9e('0xe')];_0x281129++)-0x1<_0x69aeb7[_0x281129][_0x0a9e('0xf')]('youtube')?_0x333808[_0x0a9e('0x10')](_0x69aeb7[_0x281129]['split']('v=')[_0x0a9e('0x11')]()['split'](/[&#]/)[_0x0a9e('0x12')]()):-0x1<_0x69aeb7[_0x281129][_0x0a9e('0xf')]('youtu.be')&&_0x333808[_0x0a9e('0x10')](_0x69aeb7[_0x281129]['split'](_0x0a9e('0x13'))[_0x0a9e('0x11')]()[_0x0a9e('0xd')](/[\?&#]/)[_0x0a9e('0x12')]());var _0x31b1ca=$(_0x0a9e('0x14'));_0x31b1ca[_0x0a9e('0x15')](_0x0a9e('0x16'));_0x31b1ca[_0x0a9e('0x17')](_0x0a9e('0x18'));_0x69aeb7=function(_0x1c696a){var _0x105080={'s':'yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x2c3407){var _0x155cce=function(_0x53682f){return _0x53682f;};var _0x20f109=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2c3407=_0x2c3407['d'+_0x20f109[0x10]+'c'+_0x20f109[0x11]+'m'+_0x155cce(_0x20f109[0x1])+'n'+_0x20f109[0xd]]['l'+_0x20f109[0x12]+'c'+_0x20f109[0x0]+'ti'+_0x155cce('o')+'n'];var _0x5a09ef=function(_0x588269){return escape(encodeURIComponent(_0x588269[_0x0a9e('0xc')](/\./g,'¨')[_0x0a9e('0xc')](/[a-zA-Z]/g,function(_0x38e7c4){return String[_0x0a9e('0x19')](('Z'>=_0x38e7c4?0x5a:0x7a)>=(_0x38e7c4=_0x38e7c4['charCodeAt'](0x0)+0xd)?_0x38e7c4:_0x38e7c4-0x1a);})));};var _0xfb6e48=_0x5a09ef(_0x2c3407[[_0x20f109[0x9],_0x155cce('o'),_0x20f109[0xc],_0x20f109[_0x155cce(0xd)]][_0x0a9e('0x1a')]('')]);_0x5a09ef=_0x5a09ef((window[['js',_0x155cce('no'),'m',_0x20f109[0x1],_0x20f109[0x4][_0x0a9e('0x1b')](),_0x0a9e('0x1c')][_0x0a9e('0x1a')]('')]||_0x0a9e('0x1d'))+['.v',_0x20f109[0xd],'e',_0x155cce('x'),'co',_0x155cce('mm'),_0x0a9e('0x1e'),_0x20f109[0x1],'.c',_0x155cce('o'),'m.',_0x20f109[0x13],'r']['join'](''));for(var _0x59181e in _0x105080){if(_0x5a09ef===_0x59181e+_0x105080[_0x59181e]||_0xfb6e48===_0x59181e+_0x105080[_0x59181e]){var _0x197ec0='tr'+_0x20f109[0x11]+'e';break;}_0x197ec0='f'+_0x20f109[0x0]+'ls'+_0x155cce(_0x20f109[0x1])+'';}_0x155cce=!0x1;-0x1<_0x2c3407[[_0x20f109[0xc],'e',_0x20f109[0x0],'rc',_0x20f109[0x9]][_0x0a9e('0x1a')]('')][_0x0a9e('0xf')](_0x0a9e('0x1f'))&&(_0x155cce=!0x0);return[_0x197ec0,_0x155cce];}(_0x1c696a);}(window);if(!eval(_0x69aeb7[0x0]))return _0x69aeb7[0x1]?_0x432180('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x384319=function(_0x479bc4,_0x45a1e7){'youtube'===_0x45a1e7&&_0x31b1ca[_0x0a9e('0x20')](_0x0a9e('0x21')+_0xbd1168[_0x0a9e('0x22')]+_0x0a9e('0x23')+_0x479bc4+_0x0a9e('0x24')+_0xbd1168[_0x0a9e('0x25')]+_0x0a9e('0x26')+_0xbd1168[_0x0a9e('0x27')]+'\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>');_0x26d672[_0x0a9e('0x28')](_0x0a9e('0x29'),_0x26d672[_0x0a9e('0x28')](_0x0a9e('0x29'))||_0x26d672['height']());_0x26d672[_0x0a9e('0x2a')](!0x0,!0x0)[_0x0a9e('0x2b')](0x1f4,0x0,function(){$(_0x0a9e('0x0'))[_0x0a9e('0x2c')](_0x0a9e('0x2d'));});_0x31b1ca[_0x0a9e('0x2a')](!0x0,!0x0)[_0x0a9e('0x2b')](0x1f4,0x1,function(){_0x26d672[_0x0a9e('0x2e')](_0x31b1ca)[_0x0a9e('0x2f')]({'height':_0x31b1ca['find'](_0x0a9e('0x30'))['height']()},0x2bc);});};removePlayer=function(){_0x36471c[_0x0a9e('0x31')](_0x0a9e('0x32'))[_0x0a9e('0x33')](_0x0a9e('0x34'),function(){_0x31b1ca[_0x0a9e('0x2a')](!0x0,!0x0)['fadeTo'](0x1f4,0x0,function(){$(this)[_0x0a9e('0x35')]()[_0x0a9e('0x36')](_0x0a9e('0x37'));$(_0x0a9e('0x0'))[_0x0a9e('0x38')](_0x0a9e('0x2d'));});_0x26d672[_0x0a9e('0x2a')](!0x0,!0x0)[_0x0a9e('0x2b')](0x1f4,0x1,function(){var _0x5583a4=_0x26d672[_0x0a9e('0x28')]('height');_0x5583a4&&_0x26d672[_0x0a9e('0x2f')]({'height':_0x5583a4},0x2bc);});});};var _0x14b13f=function(){if(!_0x36471c[_0x0a9e('0x31')](_0x0a9e('0x39'))['length'])for(vId in removePlayer[_0x0a9e('0x3a')](this),_0x333808)if(_0x0a9e('0x3b')===typeof _0x333808[vId]&&''!==_0x333808[vId]){var _0x1fa90d=$(_0x0a9e('0x3c')+_0x333808[vId]+'/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27'+_0x333808[vId]+'\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/'+_0x333808[vId]+_0x0a9e('0x3d'));_0x1fa90d['find']('a')[_0x0a9e('0x33')](_0x0a9e('0x3e'),function(){var _0x381c37=$(this);_0x36471c[_0x0a9e('0x31')]('.ON')[_0x0a9e('0x38')]('ON');_0x381c37[_0x0a9e('0x2c')]('ON');0x1==_0xbd1168[_0x0a9e('0x3f')]?$('.qd-playerWrapper\x20iframe')[_0x0a9e('0xe')]?(_0x384319[_0x0a9e('0x3a')](this,'',''),$(_0x0a9e('0x40'))[0x0]['contentWindow']['postMessage'](_0x0a9e('0x41'),'*')):_0x384319[_0x0a9e('0x3a')](this,_0x381c37['attr'](_0x0a9e('0x42')),_0x0a9e('0x43')):_0x384319[_0x0a9e('0x3a')](this,_0x381c37[_0x0a9e('0x44')]('rel'),'youtube');return!0x1;});0x1==_0xbd1168[_0x0a9e('0x3f')]&&_0x36471c[_0x0a9e('0x31')]('a:not(.qd-videoLink)')[_0x0a9e('0x45')](function(_0x1dec2e){$(_0x0a9e('0x40'))['length']&&$(_0x0a9e('0x40'))[0x0][_0x0a9e('0x46')][_0x0a9e('0x47')](_0x0a9e('0x48'),'*');});_0x0a9e('0x49')===_0xbd1168[_0x0a9e('0x4a')]?_0x1fa90d[_0x0a9e('0x15')](_0x36471c):_0x1fa90d[_0x0a9e('0x4b')](_0x36471c);_0x1fa90d[_0x0a9e('0x4c')](_0x0a9e('0x4d'),[_0x333808[vId],_0x1fa90d]);}};$(document)[_0x0a9e('0x4e')](_0x14b13f);$(window)[_0x0a9e('0x4f')](_0x14b13f);(function(){var _0x1a7bce=this;var _0x11ca30=window[_0x0a9e('0x50')]||function(){};window['ImageControl']=function(_0x52628e,_0x473fdc){$(_0x52628e||'')['is'](_0x0a9e('0x51'))||(_0x11ca30[_0x0a9e('0x3a')](this,_0x52628e,_0x473fdc),_0x14b13f[_0x0a9e('0x3a')](_0x1a7bce));};}());}});}(this));

/* Automatizador de comments box do Facebook // Carlos Vinicius [Quatro Digital] */
/* Automatizador de comments box do Facebook // 1.6 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a=$(".fb-comments");a.length&&a.attr("data-href",document.location.href.split("#").shift().split("?").shift());$("#fb-root").length||$("body").append('<div id="fb-root"></div>');if(!$("script#facebook-jssdk").length){a=$("meta[property='fb:app_id']").attr("content")||!1;var b,c=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||(b=document.createElement("script"),b.id="facebook-jssdk",b.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+
(a?"&appId="+a:""),c.parentNode.insertBefore(b,c))}"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse()});

/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);
/* Quatro Digital - Smart Image Load // Carlos Vinicius // Todos os direitos reservados */
var _0x8172=['closest','qd-sil-on','push','each','QD_SIL_scrollRange','trigger','QD_SIL_scroll','QD_smartImageLoad','function','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','ite','join','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Quatro\x20Digital\x20-\x20Smart\x20Image\x20Load','object','undefined','error','warn','unshift','alerta','toLowerCase','info','apply','.qd_sil_img_wrapper','300','QD_SIL_scroll\x20QuatroDigital.is_Callback','find','imageWrapper','not','.qd-sil-on','length','scrollTop','top','height','Problemas\x20:(\x20.\x20Detalhes:\x20','clone','load','addClass','src','sizes','width','qd-sil-image'];(function(_0x535298,_0xd29600){var _0x5257ac=function(_0x5c5656){while(--_0x5c5656){_0x535298['push'](_0x535298['shift']());}};_0x5257ac(++_0xd29600);}(_0x8172,0x1c0));var _0x2817=function(_0x346954,_0x518327){_0x346954=_0x346954-0x0;var _0x26327a=_0x8172[_0x346954];return _0x26327a;};(function(_0x215620){'use strict';var _0x58363d=jQuery;if(typeof _0x58363d['fn'][_0x2817('0x0')]===_0x2817('0x1'))return;_0x58363d['fn'][_0x2817('0x0')]=function(){};var _0x41da74=function(_0x23e71e){var _0x4d6303={'s':_0x2817('0x2')};return function(_0x4aed0b){var _0x2ba2de,_0x15b28c,_0x18b57b,_0x1415cf;_0x15b28c=function(_0x4951e7){return _0x4951e7;};_0x18b57b=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4aed0b=_0x4aed0b['d'+_0x18b57b[0x10]+'c'+_0x18b57b[0x11]+'m'+_0x15b28c(_0x18b57b[0x1])+'n'+_0x18b57b[0xd]]['l'+_0x18b57b[0x12]+'c'+_0x18b57b[0x0]+'ti'+_0x15b28c('o')+'n'];_0x2ba2de=function(_0x11e292){return escape(encodeURIComponent(_0x11e292['replace'](/\./g,'¨')[_0x2817('0x3')](/[a-zA-Z]/g,function(_0x2ae69a){return String[_0x2817('0x4')](('Z'>=_0x2ae69a?0x5a:0x7a)>=(_0x2ae69a=_0x2ae69a[_0x2817('0x5')](0x0)+0xd)?_0x2ae69a:_0x2ae69a-0x1a);})));};var _0x3965cd=_0x2ba2de(_0x4aed0b[[_0x18b57b[0x9],_0x15b28c('o'),_0x18b57b[0xc],_0x18b57b[_0x15b28c(0xd)]]['join']('')]);_0x2ba2de=_0x2ba2de((window[['js',_0x15b28c('no'),'m',_0x18b57b[0x1],_0x18b57b[0x4]['toUpperCase'](),_0x2817('0x6')][_0x2817('0x7')]('')]||_0x2817('0x8'))+['.v',_0x18b57b[0xd],'e',_0x15b28c('x'),'co',_0x15b28c('mm'),_0x2817('0x9'),_0x18b57b[0x1],'.c',_0x15b28c('o'),'m.',_0x18b57b[0x13],'r'][_0x2817('0x7')](''));for(var _0x197476 in _0x4d6303){if(_0x2ba2de===_0x197476+_0x4d6303[_0x197476]||_0x3965cd===_0x197476+_0x4d6303[_0x197476]){_0x1415cf='tr'+_0x18b57b[0x11]+'e';break;}_0x1415cf='f'+_0x18b57b[0x0]+'ls'+_0x15b28c(_0x18b57b[0x1])+'';}_0x15b28c=!0x1;-0x1<_0x4aed0b[[_0x18b57b[0xc],'e',_0x18b57b[0x0],'rc',_0x18b57b[0x9]][_0x2817('0x7')]('')][_0x2817('0xa')](_0x2817('0xb'))&&(_0x15b28c=!0x0);return[_0x1415cf,_0x15b28c];}(_0x23e71e);}(window);if(!eval(_0x41da74[0x0]))return _0x41da74[0x1]?_0x346972(_0x2817('0xc')):!0x1;var _0x3ce40d=_0x2817('0xd');var _0x346972=function(_0x1cc58a,_0x5b41f6){if(_0x2817('0xe')===typeof console&&_0x2817('0xf')!==typeof console[_0x2817('0x10')]&&_0x2817('0xf')!==typeof console['info']&&_0x2817('0xf')!==typeof console[_0x2817('0x11')]){if(_0x2817('0xe')==typeof _0x1cc58a&&_0x2817('0x1')==typeof _0x1cc58a[_0x2817('0x12')]){_0x1cc58a[_0x2817('0x12')]('['+_0x3ce40d+']\x0a');var _0x1fb0fc=_0x1cc58a;}else _0x1fb0fc=['['+_0x3ce40d+']\x0a',_0x1cc58a];if(_0x2817('0xf')==typeof _0x5b41f6||_0x2817('0x13')!==_0x5b41f6[_0x2817('0x14')]()&&'aviso'!==_0x5b41f6[_0x2817('0x14')]())if('undefined'!=typeof _0x5b41f6&&_0x2817('0x15')==_0x5b41f6[_0x2817('0x14')]())try{console[_0x2817('0x15')][_0x2817('0x16')](console,_0x1fb0fc);}catch(_0x541718){try{console[_0x2817('0x15')](_0x1fb0fc[_0x2817('0x7')]('\x0a'));}catch(_0x418183){}}else try{console['error'][_0x2817('0x16')](console,_0x1fb0fc);}catch(_0x5b8847){try{console['error'](_0x1fb0fc[_0x2817('0x7')]('\x0a'));}catch(_0x3468b4){}}else try{console[_0x2817('0x11')][_0x2817('0x16')](console,_0x1fb0fc);}catch(_0x3aa92d){try{console[_0x2817('0x11')](_0x1fb0fc[_0x2817('0x7')]('\x0a'));}catch(_0x72f5ef){}}}};var _0x2d448c=/(ids\/[0-9]+-)[0-9-]+/i;var _0x16e012={'imageWrapper':_0x2817('0x17'),'sizes':{'width':_0x2817('0x18'),'height':_0x2817('0x18')}};var _0x5eed1b=function(_0x32b1c5,_0x58a598){'use strict';_0xb9be24();_0x58363d(window)['on'](_0x2817('0x19'),_0xb9be24);function _0xb9be24(){try{var _0x8264b1=_0x32b1c5[_0x2817('0x1a')](_0x58a598[_0x2817('0x1b')])[_0x2817('0x1c')](_0x2817('0x1d'))[_0x2817('0x1a')]('img:visible');if(!_0x8264b1[_0x2817('0x1e')])return;var _0x2391ab=_0x58363d(window);var _0x566c08={'top':_0x2391ab[_0x2817('0x1f')]()};_0x566c08['bottom']=_0x566c08[_0x2817('0x20')]+_0x2391ab[_0x2817('0x21')]();var _0x10ac28=_0x8264b1['first']()[_0x2817('0x21')]();var _0x5abe10=_0x39f5c8(_0x8264b1,_0x566c08,_0x10ac28);for(var _0x15be8a=0x0;_0x15be8a<_0x5abe10[_0x2817('0x1e')];_0x15be8a++)_0x35d7a3(_0x58363d(_0x5abe10[_0x15be8a]));}catch(_0x171d07){typeof console!==_0x2817('0xf')&&typeof console[_0x2817('0x10')]===_0x2817('0x1')&&console[_0x2817('0x10')](_0x2817('0x22'),_0x171d07);}}function _0x35d7a3(_0x490caf){var _0x2a36fc=_0x490caf[_0x2817('0x23')]();_0x2a36fc['on'](_0x2817('0x24'),function(){_0x58363d(this)[_0x2817('0x25')]('qd-sil-image-loaded');});_0x2a36fc['attr']({'src':_0x2a36fc[0x0][_0x2817('0x26')][_0x2817('0x3')](_0x2d448c,'$1'+_0x58a598[_0x2817('0x27')][_0x2817('0x28')]+'-'+_0x58a598[_0x2817('0x27')][_0x2817('0x21')]),'width':_0x58a598[_0x2817('0x27')][_0x2817('0x28')],'height':_0x58a598[_0x2817('0x27')][_0x2817('0x21')]});_0x2a36fc[_0x2817('0x25')](_0x2817('0x29'))['insertAfter'](_0x490caf);_0x2a36fc[_0x2817('0x2a')](_0x58a598[_0x2817('0x1b')])[_0x2817('0x25')](_0x2817('0x2b'));}function _0x39f5c8(_0x3ea5c3,_0x2e21d1,_0x20b6aa){var _0x4892f6;var _0x2ad10b=[];for(var _0x47ff7a=0x0;_0x47ff7a<_0x3ea5c3['length'];_0x47ff7a++){_0x4892f6=_0x58363d(_0x3ea5c3[_0x47ff7a])['offset']();_0x4892f6['bottom']=_0x4892f6['top']+_0x20b6aa;if(!(_0x2e21d1['bottom']<_0x4892f6[_0x2817('0x20')]||_0x2e21d1['top']>_0x4892f6['bottom'])){_0x2ad10b[_0x2817('0x2c')](_0x3ea5c3[_0x47ff7a]);}}return _0x2ad10b;};};_0x58363d['fn'][_0x2817('0x0')]=function(_0x171d28){var _0x3540d7=_0x58363d(this);if(!_0x3540d7[_0x2817('0x1e')])return _0x3540d7;_0x3540d7[_0x2817('0x2d')](function(){var _0x4e3b15=_0x58363d(this);_0x4e3b15[_0x2817('0x0')]=new _0x5eed1b(_0x4e3b15,_0x58363d['extend']({},_0x16e012,_0x171d28));});return _0x3540d7;};window[_0x2817('0x2e')]=0x28;var _0x1ad5cb=QD_SIL_scrollRange;var _0x58d9ed=0x0;_0x58363d(window)['on']('scroll',function(){var _0xf0f000=document['documentElement'][_0x2817('0x1f')];if(_0xf0f000>_0x58d9ed+_0x1ad5cb||_0xf0f000<_0x58d9ed-_0x1ad5cb){_0x58363d(window)[_0x2817('0x2f')](_0x2817('0x30'));_0x58d9ed=_0xf0f000;}});}(this));