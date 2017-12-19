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
			var wrapper = $('.tip-bar-qd-v1-carousel');

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
			var wrapper = $('.tip-bar-qd-v1-carousel-footer');

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
				$t.text(($t.text().trim().match(/[0-9]+/) || [""]).pop() + '%');
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
					'scrollTop': $('.product-qd-v1-description').offset().top -100
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
					flag.text(parseInt(100 - data.bestPrice / data.listPrice * 100) + "%").show();
				else
					flag.hide();
			});

			if (skuJson.skus.length >= 1) {
				if (!flag.length)
					flag = $('<div class="product-qd-v1-stamps-highlight-discount"></div>').prependTo('.product-qd-v1-stamps');

				if (skuJson.skus[0].listPrice > skuJson.skus[0].bestPrice)
					flag.text(parseInt(100 - skuJson.skus[0].bestPrice / skuJson.skus[0].listPrice * 100) + "%").show();
			}
		},
		openShipping: function() {
			if( typeof window.ShippingValue === "function" )
				window.ShippingValue();
		},
		qdClickTableMeasures: function() {
			var wrapper = $(".product-qd-v1-sku-selection");
			var modal = $(".qd-v1-modal").clone().appendTo(document.body).addClass('qd-v1-modal-table-measures');

			$(".product-qd-v1-table-measures").click(function() {
				modal.find('.modal-body:not(.qd-on)').addClass('qd-on').append('<img width="720" height="688" alt="tabela de medidas" src="//flickakids.vteximg.com.br/arquivos/tabela-de-medidas.jpg" complete="complete">');
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

				var modalItems = '<fieldset class="qd-customize-fieldset-text"><label>Digite o nome</label><div class="input-group"><input type="text" class="qd-baby-name form-control" placeholder="Escreva aqui o nome do bebê" maxlength="18"></div></fieldset>';
				modalItems += '<fieldset><label>Escolha a ilustração</label><div class="input-group"><select class="qd-illustration"><option value="">Sem ilustração</option><option value="sol">Sol</option></option><option value="lua">Lua</option></option><option value="casa">Casa</option></select></div></fieldset>';
				var options = '<label style="font-family:cursive;" class="radio-inline"><input type="radio" value="cursive">Arya</label><label style="font-family:fantasy;" class="radio-inline"><input type="radio" value="fantasy">Jon</label>'
				options += '<label style="font-family:PT Sans;" class="radio-inline"><input type="radio" value="PT Sans">Sansa</label><label style="font-family:Times New Roman;" class="radio-inline"><input type="radio" value="Times New Roman">Jon</label>'
				options += '<label style="font-family:Arial;" class="radio-inline"><input type="radio" value="Arial">Brandon</label><label style="font-family:fantasy;" class="radio-inline"><input type="radio" value="fantasy">Rickson</label>'
				options += '<label style="font-family:Arial Black;" class="radio-inline"><input type="radio" value="Arial Black">Catelyn</label><label style="font-family:webdings;" class="radio-inline"><input type="radio" value="webdings">Jason</label>'
				modalItems += '<fieldset><label>Escolha a fonte</label><div class="qd-font input-group-radio">' + options + '</div></fieldset>';
				modalItems += '<fieldset><label class="checkbox"><input class="qd-authorize-remove-product" type="checkbox" value="autorizado"> Autorizo a Flicka Kids a retirar o produto da embalagem, para realizar a personalização por mim escolhida.</label></fieldset>';
				modal.find('.qd-customize-items').append($.parseHTML(modalItems));

				var modalFooter = '<a href="javascript: void(0);" class="qd-customize-close" data-dismiss="modal">Não quero personalizar o produto</a>';
				modal.find('.modal-footer').append([$.parseHTML(modalFooter), $('<div class="qd-customize-price"></div>'), $('<div class="product-qd-v1-buy-button"></div>')]);
				modal.find('.modal-footer .qd-customize-price').append($.parseHTML('Valor com a personalização:<span class="total-price">R$299,90</span>'));
				modal.find('.modal-footer .product-qd-v1-buy-button').append($('.product-qd-v1-sku-selection-box .buy-button').first().clone().text('Comprar personalizado'));

				modal.insertAfter($('.qd-v1-modal').first());
				modal.modal();

				modal.on('hidden.bs.modal', function (e) {
					$(this).remove();
				});


				$('.qd-customize-items select').on("change", function () {
					var imgUrl = '/arquivos/' + $(this).val() + '.png';
					imgUrl = '/arquivos/icone-amazing-exemplo.png';
					updateCustomize(null, imgUrl, null);

					if ($(this).val())
						$(this).closest('.input-group').addClass('filled');
					else
						$(this).closest('.input-group').removeClass('filled');
				});

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
								if (items[itemIndex].offerings[offeringIndex].attachmentOfferings[i].name == "Personalização") {
									fonts = items[itemIndex].offerings[offeringIndex].attachmentOfferings[i].schema['Letra'].domain;
									illustrations = items[itemIndex].offerings[offeringIndex].attachmentOfferings[i].schema['Figura'].domain;
								}
							}
							
							if (fonts == null || illustrations == null)
								return;

							$('.qd-illustration').empty();
							$('.qd-illustration').append('<option value="">Sem ilustração</option>');

							for (var i = 0; i < illustrations.length; i++)
								$('.qd-illustration').append('<option value="'+illustrations[i]+'">'+illustrations[i]+'</option>');

							$(document.head).append('<link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/select2/4.0.5/css/select2.min.css">');
							$.getScript( "https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.5/js/select2.min.js", function() { 
								$('.qd-illustration').select2({
									placeholder: 'Sem ilustração',
									minimumResultsForSearch: Infinity,					  
									templateResult: function(data) {
										if (!data.id)
										  return data.text;
	
										var imgName = data.text.toLowerCase().replace('â', 'a');
										var imgUrl = '/arquivos/qd-stamp-' + imgName + '.png';
										var $data = $('<span><img src="' + imgUrl + '" class="img-flag" /> '+data.text+'</span>');
										$data.find('.img-flag').css('width', '40px');
										return $data;
									}
								});
							});

							$('.qd-font').empty();
							
							for (var i = 0; i < fonts.length; i++)
								$('.qd-font').append('<label style="font-family:'+fonts[i]+';" class="radio-inline"><input type="radio" value="'+fonts[i]+'">'+fonts[i].split(' ').pop()+'</label>');
							
							
							$('.qd-customize-items input[type="radio"]').on("click", function () {
								$('.input-group-radio .radio-inline').removeClass('checked');
								$(this).closest('.radio-inline').addClass('checked');

								updateCustomize(null, null, $(this).val());
							});

							$('.qd-customize-items select').on("change", function () {
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

				function updateCustomize(text, imageUrl, font) {
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
				}

				function addCustomization(skuId, attContent) {
					var offeringId = null;
					var offeringAttName = "Personalização";
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

				function showSuccessModal() {					
					$(window).one('orderFormUpdated.vtex', function () {
						var content = {
							Letra: (modal.find('.qd-font .checked input').val() || '*** NÃO ***'),
							Texto:  (modal.find('.qd-baby-name').val() || '*** NÃO ***'),
							Figura:  (modal.find('.qd-illustration').val() || '*** NÃO ***'),
							'Cor da letra':  (modal.find('.qd-font-color').text() || '*** NÃO ***'),
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

				modal.find('.modal-footer').QD_buyButton({
					buyButton: ".product-qd-v1-buy-button .buy-button",
					productPageCallback: showSuccessModal
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
var _0x76da=['replace','#qtt','show','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','message','qd-ssa-on','qd-ssa-skus-','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','skus','off','QuatroDigital.ssa.prodUnavailable','qd-ssa-sku-prod-unavailable','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','toUpperCase','---','erc','join','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','qdPlugin','initialSkuSelected','prod','unavailable','trigger','vtex.sku.selected.QD','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','available','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','function','qdAjax','extend','opts','push','success','error','call','complete','parameters','callbackFns','successPopulated','boolean','errorPopulated','completePopulated','object','clearQueueDelay','jqXHR','undefined','ajax','readyState','textStatus','errorThrown','2.1','/produto/sku/','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','QD_smartStockAvailable','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','alerta','toLowerCase','aviso','info','apply','warn','qd-ssa-sku-no-selected','qd-ssa-sku-selected','SkuSellersInformation','AvailableQuantity','each','find','[data-qd-ssa-text]','hide','addClass','qd-ssa-hide','removeClass','qd-ssa-show','filter','[data-qd-ssa-text=\x22','length','[data-qd-ssa-text=\x22default\x22]','html'];(function(_0x1c6002,_0x4e8adf){var _0x1238f6=function(_0x5f4cd9){while(--_0x5f4cd9){_0x1c6002['push'](_0x1c6002['shift']());}};_0x1238f6(++_0x4e8adf);}(_0x76da,0x1d0));var _0xa76d=function(_0x381b21,_0xc368b2){_0x381b21=_0x381b21-0x0;var _0x21110d=_0x76da[_0x381b21];return _0x21110d;};(function(_0x3a4c52){if(_0xa76d('0x0')!==typeof _0x3a4c52[_0xa76d('0x1')]){var _0x9840ec={};_0x3a4c52['qdAjaxQueue']=_0x9840ec;_0x3a4c52[_0xa76d('0x1')]=function(_0x15a826){var _0x547afa=_0x3a4c52[_0xa76d('0x2')]({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x15a826);var _0x264055=escape(encodeURIComponent(_0x547afa['url']));_0x9840ec[_0x264055]=_0x9840ec[_0x264055]||{};_0x9840ec[_0x264055][_0xa76d('0x3')]=_0x9840ec[_0x264055][_0xa76d('0x3')]||[];_0x9840ec[_0x264055][_0xa76d('0x3')][_0xa76d('0x4')]({'success':function(_0x122119,_0x5d8924,_0x2eaa3f){_0x547afa[_0xa76d('0x5')]['call'](this,_0x122119,_0x5d8924,_0x2eaa3f);},'error':function(_0x1efd21,_0x595260,_0x47d9b5){_0x547afa[_0xa76d('0x6')][_0xa76d('0x7')](this,_0x1efd21,_0x595260,_0x47d9b5);},'complete':function(_0x28142d,_0x393693){_0x547afa[_0xa76d('0x8')][_0xa76d('0x7')](this,_0x28142d,_0x393693);}});_0x9840ec[_0x264055][_0xa76d('0x9')]=_0x9840ec[_0x264055][_0xa76d('0x9')]||{'success':{},'error':{},'complete':{}};_0x9840ec[_0x264055][_0xa76d('0xa')]=_0x9840ec[_0x264055][_0xa76d('0xa')]||{};_0x9840ec[_0x264055][_0xa76d('0xa')][_0xa76d('0xb')]=_0xa76d('0xc')===typeof _0x9840ec[_0x264055][_0xa76d('0xa')][_0xa76d('0xb')]?_0x9840ec[_0x264055][_0xa76d('0xa')][_0xa76d('0xb')]:!0x1;_0x9840ec[_0x264055][_0xa76d('0xa')][_0xa76d('0xd')]=_0xa76d('0xc')===typeof _0x9840ec[_0x264055][_0xa76d('0xa')][_0xa76d('0xd')]?_0x9840ec[_0x264055][_0xa76d('0xa')][_0xa76d('0xd')]:!0x1;_0x9840ec[_0x264055][_0xa76d('0xa')][_0xa76d('0xe')]=_0xa76d('0xc')===typeof _0x9840ec[_0x264055][_0xa76d('0xa')]['completePopulated']?_0x9840ec[_0x264055]['callbackFns'][_0xa76d('0xe')]:!0x1;_0x15a826=_0x3a4c52['extend']({},_0x547afa,{'success':function(_0x2cd6a9,_0x440eb4,_0x330c9b){_0x9840ec[_0x264055][_0xa76d('0x9')]['success']={'data':_0x2cd6a9,'textStatus':_0x440eb4,'jqXHR':_0x330c9b};_0x9840ec[_0x264055][_0xa76d('0xa')]['successPopulated']=!0x0;for(var _0xd606c in _0x9840ec[_0x264055][_0xa76d('0x3')])_0xa76d('0xf')===typeof _0x9840ec[_0x264055][_0xa76d('0x3')][_0xd606c]&&(_0x9840ec[_0x264055][_0xa76d('0x3')][_0xd606c][_0xa76d('0x5')][_0xa76d('0x7')](this,_0x2cd6a9,_0x440eb4,_0x330c9b),_0x9840ec[_0x264055][_0xa76d('0x3')][_0xd606c]['success']=function(){});},'error':function(_0x2a528c,_0x506f1f,_0x4d91a6){_0x9840ec[_0x264055]['parameters'][_0xa76d('0x6')]={'errorThrown':_0x4d91a6,'textStatus':_0x506f1f,'jqXHR':_0x2a528c};_0x9840ec[_0x264055]['callbackFns'][_0xa76d('0xd')]=!0x0;for(var _0x2956e2 in _0x9840ec[_0x264055][_0xa76d('0x3')])_0xa76d('0xf')===typeof _0x9840ec[_0x264055][_0xa76d('0x3')][_0x2956e2]&&(_0x9840ec[_0x264055][_0xa76d('0x3')][_0x2956e2][_0xa76d('0x6')][_0xa76d('0x7')](this,_0x2a528c,_0x506f1f,_0x4d91a6),_0x9840ec[_0x264055]['opts'][_0x2956e2][_0xa76d('0x6')]=function(){});},'complete':function(_0x154e21,_0x18990b){_0x9840ec[_0x264055]['parameters']['complete']={'textStatus':_0x18990b,'jqXHR':_0x154e21};_0x9840ec[_0x264055][_0xa76d('0xa')]['completePopulated']=!0x0;for(var _0x295674 in _0x9840ec[_0x264055]['opts'])_0xa76d('0xf')===typeof _0x9840ec[_0x264055]['opts'][_0x295674]&&(_0x9840ec[_0x264055][_0xa76d('0x3')][_0x295674][_0xa76d('0x8')]['call'](this,_0x154e21,_0x18990b),_0x9840ec[_0x264055]['opts'][_0x295674]['complete']=function(){});isNaN(parseInt(_0x547afa[_0xa76d('0x10')]))||setTimeout(function(){_0x9840ec[_0x264055][_0xa76d('0x11')]=void 0x0;_0x9840ec[_0x264055][_0xa76d('0x3')]=void 0x0;_0x9840ec[_0x264055]['parameters']=void 0x0;_0x9840ec[_0x264055][_0xa76d('0xa')]=void 0x0;},_0x547afa[_0xa76d('0x10')]);}});_0xa76d('0x12')===typeof _0x9840ec[_0x264055][_0xa76d('0x11')]?_0x9840ec[_0x264055][_0xa76d('0x11')]=_0x3a4c52[_0xa76d('0x13')](_0x15a826):_0x9840ec[_0x264055]['jqXHR']&&_0x9840ec[_0x264055][_0xa76d('0x11')][_0xa76d('0x14')]&&0x4==_0x9840ec[_0x264055]['jqXHR'][_0xa76d('0x14')]&&(_0x9840ec[_0x264055][_0xa76d('0xa')][_0xa76d('0xb')]&&_0x15a826[_0xa76d('0x5')](_0x9840ec[_0x264055][_0xa76d('0x9')][_0xa76d('0x5')]['data'],_0x9840ec[_0x264055][_0xa76d('0x9')][_0xa76d('0x5')]['textStatus'],_0x9840ec[_0x264055][_0xa76d('0x9')]['success'][_0xa76d('0x11')]),_0x9840ec[_0x264055][_0xa76d('0xa')][_0xa76d('0xd')]&&_0x15a826[_0xa76d('0x6')](_0x9840ec[_0x264055]['parameters'][_0xa76d('0x6')][_0xa76d('0x11')],_0x9840ec[_0x264055][_0xa76d('0x9')][_0xa76d('0x6')][_0xa76d('0x15')],_0x9840ec[_0x264055][_0xa76d('0x9')][_0xa76d('0x6')][_0xa76d('0x16')]),_0x9840ec[_0x264055][_0xa76d('0xa')][_0xa76d('0xe')]&&_0x15a826['complete'](_0x9840ec[_0x264055][_0xa76d('0x9')]['complete'][_0xa76d('0x11')],_0x9840ec[_0x264055][_0xa76d('0x9')][_0xa76d('0x8')][_0xa76d('0x15')]));};_0x3a4c52[_0xa76d('0x1')]['version']=_0xa76d('0x17');}}(jQuery));(function(_0x442979){function _0x10f58c(_0x13a014,_0x521f69){_0x75dc60['qdAjax']({'url':_0xa76d('0x18')+_0x13a014,'clearQueueDelay':null,'success':_0x521f69,'error':function(){_0x103208(_0xa76d('0x19'));}});}var _0x75dc60=jQuery;if(_0xa76d('0x0')!==typeof _0x75dc60['fn'][_0xa76d('0x1a')]){var _0x103208=function(_0x435abc,_0x3fd55a){if('object'===typeof console){var _0x2c0883;'object'===typeof _0x435abc?(_0x435abc[_0xa76d('0x1b')](_0xa76d('0x1c')),_0x2c0883=_0x435abc):_0x2c0883=['[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a'+_0x435abc];_0xa76d('0x12')===typeof _0x3fd55a||_0xa76d('0x1d')!==_0x3fd55a[_0xa76d('0x1e')]()&&_0xa76d('0x1f')!==_0x3fd55a[_0xa76d('0x1e')]()?_0xa76d('0x12')!==typeof _0x3fd55a&&_0xa76d('0x20')===_0x3fd55a[_0xa76d('0x1e')]()?console[_0xa76d('0x20')][_0xa76d('0x21')](console,_0x2c0883):console['error'][_0xa76d('0x21')](console,_0x2c0883):console[_0xa76d('0x22')][_0xa76d('0x21')](console,_0x2c0883);}},_0x16cbf3={},_0x23cd91=function(_0x4f93d8,_0x5e5754){function _0x379b26(_0x440274){try{_0x4f93d8['removeClass'](_0xa76d('0x23'))['addClass'](_0xa76d('0x24'));var _0x52c6d0=_0x440274[0x0][_0xa76d('0x25')][0x0][_0xa76d('0x26')];_0x4f93d8['attr']('data-qd-ssa-qtt',_0x52c6d0);_0x4f93d8[_0xa76d('0x27')](function(){var _0x4f93d8=_0x75dc60(this)[_0xa76d('0x28')](_0xa76d('0x29'));if(0x1>_0x52c6d0)return _0x4f93d8[_0xa76d('0x2a')]()[_0xa76d('0x2b')](_0xa76d('0x2c'))[_0xa76d('0x2d')](_0xa76d('0x2e'));var _0x440274=_0x4f93d8[_0xa76d('0x2f')](_0xa76d('0x30')+_0x52c6d0+'\x22]');_0x440274=_0x440274[_0xa76d('0x31')]?_0x440274:_0x4f93d8[_0xa76d('0x2f')](_0xa76d('0x32'));_0x4f93d8[_0xa76d('0x2a')]()[_0xa76d('0x2b')]('qd-ssa-hide')[_0xa76d('0x2d')](_0xa76d('0x2e'));_0x440274[_0xa76d('0x33')]((_0x440274[_0xa76d('0x33')]()||'')[_0xa76d('0x34')](_0xa76d('0x35'),_0x52c6d0));_0x440274[_0xa76d('0x36')]()['addClass'](_0xa76d('0x2e'))[_0xa76d('0x2d')](_0xa76d('0x2c'));});}catch(_0x214717){_0x103208([_0xa76d('0x37'),_0x214717[_0xa76d('0x38')]]);}}if(_0x4f93d8[_0xa76d('0x31')]){_0x4f93d8['addClass'](_0xa76d('0x39'));_0x4f93d8[_0xa76d('0x2b')](_0xa76d('0x23'));try{_0x4f93d8['addClass'](_0xa76d('0x3a')+vtxctx['skus']['split'](';')[_0xa76d('0x31')]);}catch(_0x395d56){_0x103208([_0xa76d('0x3b'),_0x395d56[_0xa76d('0x38')]]);}_0x75dc60(window)['on'](_0xa76d('0x3c'),function(_0xff5fe1,_0x367ec5,_0x954ddf){try{_0x10f58c(_0x954ddf[_0xa76d('0x3d')],function(_0x42809e){_0x379b26(_0x42809e);0x1===vtxctx[_0xa76d('0x3e')]['split'](';')[_0xa76d('0x31')]&&0x0==_0x42809e[0x0][_0xa76d('0x25')][0x0][_0xa76d('0x26')]&&_0x75dc60(window)['trigger']('QuatroDigital.ssa.prodUnavailable');});}catch(_0x318414){_0x103208(['Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20',_0x318414[_0xa76d('0x38')]]);}});_0x75dc60(window)[_0xa76d('0x3f')]('vtex.sku.selected.QD');_0x75dc60(window)['on'](_0xa76d('0x40'),function(){_0x4f93d8[_0xa76d('0x2b')](_0xa76d('0x41'))[_0xa76d('0x2a')]();});}};_0x442979=function(_0x510fd9){var _0x4bc631={'s':_0xa76d('0x42')};return function(_0x168561){var _0xaeca33=function(_0x45088a){return _0x45088a;};var _0x3a0a96=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x168561=_0x168561['d'+_0x3a0a96[0x10]+'c'+_0x3a0a96[0x11]+'m'+_0xaeca33(_0x3a0a96[0x1])+'n'+_0x3a0a96[0xd]]['l'+_0x3a0a96[0x12]+'c'+_0x3a0a96[0x0]+'ti'+_0xaeca33('o')+'n'];var _0x30efaa=function(_0x3805aa){return escape(encodeURIComponent(_0x3805aa['replace'](/\./g,'¨')[_0xa76d('0x34')](/[a-zA-Z]/g,function(_0x3f6492){return String['fromCharCode'](('Z'>=_0x3f6492?0x5a:0x7a)>=(_0x3f6492=_0x3f6492[_0xa76d('0x43')](0x0)+0xd)?_0x3f6492:_0x3f6492-0x1a);})));};var _0x23dea8=_0x30efaa(_0x168561[[_0x3a0a96[0x9],_0xaeca33('o'),_0x3a0a96[0xc],_0x3a0a96[_0xaeca33(0xd)]]['join']('')]);_0x30efaa=_0x30efaa((window[['js',_0xaeca33('no'),'m',_0x3a0a96[0x1],_0x3a0a96[0x4][_0xa76d('0x44')](),'ite']['join']('')]||_0xa76d('0x45'))+['.v',_0x3a0a96[0xd],'e',_0xaeca33('x'),'co',_0xaeca33('mm'),_0xa76d('0x46'),_0x3a0a96[0x1],'.c',_0xaeca33('o'),'m.',_0x3a0a96[0x13],'r'][_0xa76d('0x47')](''));for(var _0x2919e1 in _0x4bc631){if(_0x30efaa===_0x2919e1+_0x4bc631[_0x2919e1]||_0x23dea8===_0x2919e1+_0x4bc631[_0x2919e1]){var _0x29c15f='tr'+_0x3a0a96[0x11]+'e';break;}_0x29c15f='f'+_0x3a0a96[0x0]+'ls'+_0xaeca33(_0x3a0a96[0x1])+'';}_0xaeca33=!0x1;-0x1<_0x168561[[_0x3a0a96[0xc],'e',_0x3a0a96[0x0],'rc',_0x3a0a96[0x9]]['join']('')][_0xa76d('0x48')](_0xa76d('0x49'))&&(_0xaeca33=!0x0);return[_0x29c15f,_0xaeca33];}(_0x510fd9);}(window);if(!eval(_0x442979[0x0]))return _0x442979[0x1]?_0x103208(_0xa76d('0x4a')):!0x1;_0x75dc60['fn'][_0xa76d('0x1a')]=function(_0x578725){var _0x502aa7=_0x75dc60(this);_0x578725=_0x75dc60[_0xa76d('0x2')](!0x0,{},_0x16cbf3,_0x578725);_0x502aa7[_0xa76d('0x4b')]=new _0x23cd91(_0x502aa7,_0x578725);try{_0xa76d('0xf')===typeof _0x75dc60['fn']['QD_smartStockAvailable'][_0xa76d('0x4c')]&&_0x75dc60(window)['trigger']('QuatroDigital.ssa.skuSelected',[_0x75dc60['fn'][_0xa76d('0x1a')][_0xa76d('0x4c')][_0xa76d('0x4d')],_0x75dc60['fn'][_0xa76d('0x1a')]['initialSkuSelected'][_0xa76d('0x3d')]]);}catch(_0x11bec0){_0x103208(['Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20',_0x11bec0[_0xa76d('0x38')]]);}_0x75dc60['fn'][_0xa76d('0x1a')][_0xa76d('0x4e')]&&_0x75dc60(window)[_0xa76d('0x4f')](_0xa76d('0x40'));return _0x502aa7;};_0x75dc60(window)['on'](_0xa76d('0x50'),function(_0x349958,_0x5259bb,_0x3ecef6){try{_0x75dc60['fn'][_0xa76d('0x1a')][_0xa76d('0x4c')]={'prod':_0x5259bb,'sku':_0x3ecef6},_0x75dc60(this)[_0xa76d('0x3f')](_0x349958);}catch(_0x2b26fd){_0x103208([_0xa76d('0x51'),_0x2b26fd[_0xa76d('0x38')]]);}});_0x75dc60(window)['on'](_0xa76d('0x52'),function(_0x2b2a11,_0x251077,_0x4e1cc3){try{for(var _0x286ce9=_0x4e1cc3['length'],_0x1a2f0c=_0x251077=0x0;_0x1a2f0c<_0x286ce9&&!_0x4e1cc3[_0x1a2f0c][_0xa76d('0x53')];_0x1a2f0c++)_0x251077+=0x1;_0x286ce9<=_0x251077&&(_0x75dc60['fn'][_0xa76d('0x1a')][_0xa76d('0x4e')]=!0x0);_0x75dc60(this)[_0xa76d('0x3f')](_0x2b2a11);}catch(_0x230d6e){_0x103208([_0xa76d('0x54'),_0x230d6e[_0xa76d('0x38')]]);}});_0x75dc60(function(){_0x75dc60(_0xa76d('0x55'))[_0xa76d('0x1a')]();});}}(window));
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
var _0x6304=['data-qdam-value','getParent','.box-banner','clone','insertBefore','hide','find','text','trim','attr','qd-am-content-loaded','\x27\x20falho.','ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','alerta','li\x20>ul','qd-am-has-ul',':not(ul)','first','>li','qdAmAddNdx','>ul','qd-am-column','qd-am-dropdown-menu','children','qd-am-level-','qd-am-','-li','extend','exec','.qd_amazing_menu_auto','closest','function','QD_amazingMenu','/qd-amazing-menu','undefined','warn','unshift','toLowerCase','info','apply','join','error','each','addClass','qd-am-li-','qd-am-first','last','qd-am-last','replace','fromCharCode','charCodeAt','toUpperCase','ite','---','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','.qd_am_code','filter','.qd-am-collection','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','url','html','img[alt=\x27'];(function(_0x271e98,_0x47c4b6){var _0x2368e=function(_0x4c1091){while(--_0x4c1091){_0x271e98['push'](_0x271e98['shift']());}};_0x2368e(++_0x47c4b6);}(_0x6304,0x186));var _0x4630=function(_0x1a8f5b,_0x2601c2){_0x1a8f5b=_0x1a8f5b-0x0;var _0x39702b=_0x6304[_0x1a8f5b];return _0x39702b;};(function(_0x20d80c){_0x20d80c['fn']['getParent']=_0x20d80c['fn'][_0x4630('0x0')];}(jQuery));(function(_0x11b901){var _0x52714c;var _0x23c52d=jQuery;if(_0x4630('0x1')!==typeof _0x23c52d['fn'][_0x4630('0x2')]){var _0x5cbc3b={'url':_0x4630('0x3'),'callback':function(){},'ajaxCallback':function(){}};var _0x2e2941=function(_0x4226e2,_0x1b02a0){if('object'===typeof console&&_0x4630('0x4')!==typeof console['error']&&'undefined'!==typeof console['info']&&_0x4630('0x4')!==typeof console[_0x4630('0x5')]){var _0x40247b;'object'===typeof _0x4226e2?(_0x4226e2[_0x4630('0x6')]('[QD\x20Amazing\x20Menu]\x0a'),_0x40247b=_0x4226e2):_0x40247b=['[QD\x20Amazing\x20Menu]\x0a'+_0x4226e2];if(_0x4630('0x4')===typeof _0x1b02a0||'alerta'!==_0x1b02a0[_0x4630('0x7')]()&&'aviso'!==_0x1b02a0[_0x4630('0x7')]())if(_0x4630('0x4')!==typeof _0x1b02a0&&_0x4630('0x8')===_0x1b02a0[_0x4630('0x7')]())try{console[_0x4630('0x8')][_0x4630('0x9')](console,_0x40247b);}catch(_0x34fde7){try{console['info'](_0x40247b[_0x4630('0xa')]('\x0a'));}catch(_0x5f5a9f){}}else try{console[_0x4630('0xb')][_0x4630('0x9')](console,_0x40247b);}catch(_0x16c0f0){try{console[_0x4630('0xb')](_0x40247b[_0x4630('0xa')]('\x0a'));}catch(_0x5bf531){}}else try{console['warn'][_0x4630('0x9')](console,_0x40247b);}catch(_0x3611ff){try{console[_0x4630('0x5')](_0x40247b[_0x4630('0xa')]('\x0a'));}catch(_0x424b00){}}}};_0x23c52d['fn']['qdAmAddNdx']=function(){var _0x4425f3=_0x23c52d(this);_0x4425f3[_0x4630('0xc')](function(_0x44ffaa){_0x23c52d(this)[_0x4630('0xd')](_0x4630('0xe')+_0x44ffaa);});_0x4425f3['first']()[_0x4630('0xd')](_0x4630('0xf'));_0x4425f3[_0x4630('0x10')]()['addClass'](_0x4630('0x11'));return _0x4425f3;};_0x23c52d['fn']['QD_amazingMenu']=function(){};_0x11b901=function(_0x24037c){var _0x2f09dd={'s':'yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x61edd3){var _0x88edc0=function(_0x5e9670){return _0x5e9670;};var _0x4b7584=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x61edd3=_0x61edd3['d'+_0x4b7584[0x10]+'c'+_0x4b7584[0x11]+'m'+_0x88edc0(_0x4b7584[0x1])+'n'+_0x4b7584[0xd]]['l'+_0x4b7584[0x12]+'c'+_0x4b7584[0x0]+'ti'+_0x88edc0('o')+'n'];var _0x7e1625=function(_0x41a544){return escape(encodeURIComponent(_0x41a544[_0x4630('0x12')](/\./g,'¨')[_0x4630('0x12')](/[a-zA-Z]/g,function(_0x324c5c){return String[_0x4630('0x13')](('Z'>=_0x324c5c?0x5a:0x7a)>=(_0x324c5c=_0x324c5c[_0x4630('0x14')](0x0)+0xd)?_0x324c5c:_0x324c5c-0x1a);})));};var _0x3b5d52=_0x7e1625(_0x61edd3[[_0x4b7584[0x9],_0x88edc0('o'),_0x4b7584[0xc],_0x4b7584[_0x88edc0(0xd)]][_0x4630('0xa')]('')]);_0x7e1625=_0x7e1625((window[['js',_0x88edc0('no'),'m',_0x4b7584[0x1],_0x4b7584[0x4][_0x4630('0x15')](),_0x4630('0x16')][_0x4630('0xa')]('')]||_0x4630('0x17'))+['.v',_0x4b7584[0xd],'e',_0x88edc0('x'),'co',_0x88edc0('mm'),'erc',_0x4b7584[0x1],'.c',_0x88edc0('o'),'m.',_0x4b7584[0x13],'r']['join'](''));for(var _0x56a102 in _0x2f09dd){if(_0x7e1625===_0x56a102+_0x2f09dd[_0x56a102]||_0x3b5d52===_0x56a102+_0x2f09dd[_0x56a102]){var _0x1a6cf3='tr'+_0x4b7584[0x11]+'e';break;}_0x1a6cf3='f'+_0x4b7584[0x0]+'ls'+_0x88edc0(_0x4b7584[0x1])+'';}_0x88edc0=!0x1;-0x1<_0x61edd3[[_0x4b7584[0xc],'e',_0x4b7584[0x0],'rc',_0x4b7584[0x9]][_0x4630('0xa')]('')]['indexOf'](_0x4630('0x18'))&&(_0x88edc0=!0x0);return[_0x1a6cf3,_0x88edc0];}(_0x24037c);}(window);if(!eval(_0x11b901[0x0]))return _0x11b901[0x1]?_0x2e2941(_0x4630('0x19')):!0x1;var _0x1bdd11=function(_0x5c1325){var _0x22e161=_0x5c1325['find'](_0x4630('0x1a'));var _0x50f916=_0x22e161[_0x4630('0x1b')]('.qd-am-banner');var _0x458534=_0x22e161[_0x4630('0x1b')](_0x4630('0x1c'));if(_0x50f916[_0x4630('0x1d')]||_0x458534[_0x4630('0x1d')])_0x50f916[_0x4630('0x1e')]()['addClass'](_0x4630('0x1f')),_0x458534[_0x4630('0x1e')]()[_0x4630('0xd')](_0x4630('0x20')),_0x23c52d['qdAjax']({'url':_0x52714c[_0x4630('0x21')],'dataType':_0x4630('0x22'),'success':function(_0x39a304){var _0xc6206=_0x23c52d(_0x39a304);_0x50f916['each'](function(){var _0x39a304=_0x23c52d(this);var _0x402af0=_0xc6206['find'](_0x4630('0x23')+_0x39a304['attr'](_0x4630('0x24'))+'\x27]');_0x402af0[_0x4630('0x1d')]&&(_0x402af0['each'](function(){_0x23c52d(this)[_0x4630('0x25')](_0x4630('0x26'))[_0x4630('0x27')]()[_0x4630('0x28')](_0x39a304);}),_0x39a304[_0x4630('0x29')]());})[_0x4630('0xd')]('qd-am-content-loaded');_0x458534[_0x4630('0xc')](function(){var _0x39a304={};var _0x1c056f=_0x23c52d(this);_0xc6206[_0x4630('0x2a')]('h2')[_0x4630('0xc')](function(){if(_0x23c52d(this)[_0x4630('0x2b')]()[_0x4630('0x2c')]()[_0x4630('0x7')]()==_0x1c056f[_0x4630('0x2d')](_0x4630('0x24'))[_0x4630('0x2c')]()[_0x4630('0x7')]())return _0x39a304=_0x23c52d(this),!0x1;});_0x39a304[_0x4630('0x1d')]&&(_0x39a304[_0x4630('0xc')](function(){_0x23c52d(this)[_0x4630('0x25')]('[class*=\x27colunas\x27]')[_0x4630('0x27')]()[_0x4630('0x28')](_0x1c056f);}),_0x1c056f[_0x4630('0x29')]());})['addClass'](_0x4630('0x2e'));},'error':function(){_0x2e2941('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27'+_0x52714c[_0x4630('0x21')]+_0x4630('0x2f'));},'complete':function(){_0x52714c[_0x4630('0x30')][_0x4630('0x31')](this);_0x23c52d(window)[_0x4630('0x32')](_0x4630('0x33'),_0x5c1325);},'clearQueueDelay':0xbb8});};_0x23c52d[_0x4630('0x2')]=function(_0x49d9cf){var _0x553c82=_0x49d9cf[_0x4630('0x2a')](_0x4630('0x34'))[_0x4630('0xc')](function(){var _0x4660ad=_0x23c52d(this);if(!_0x4660ad[_0x4630('0x1d')])return _0x2e2941([_0x4630('0x35'),_0x49d9cf],_0x4630('0x36'));_0x4660ad[_0x4630('0x2a')](_0x4630('0x37'))[_0x4630('0x1e')]()[_0x4630('0xd')](_0x4630('0x38'));_0x4660ad['find']('li')[_0x4630('0xc')](function(){var _0x269450=_0x23c52d(this);var _0x3b9e24=_0x269450['children'](_0x4630('0x39'));_0x3b9e24[_0x4630('0x1d')]&&_0x269450[_0x4630('0xd')]('qd-am-elem-'+_0x3b9e24[_0x4630('0x3a')]()[_0x4630('0x2b')]()['trim']()['replaceSpecialChars']()[_0x4630('0x12')](/\./g,'')[_0x4630('0x12')](/\s/g,'-')[_0x4630('0x7')]());});var _0x37d5cf=_0x4660ad['find'](_0x4630('0x3b'))[_0x4630('0x3c')]();_0x4660ad[_0x4630('0xd')]('qd-amazing-menu');_0x37d5cf=_0x37d5cf[_0x4630('0x2a')](_0x4630('0x3d'));_0x37d5cf[_0x4630('0xc')](function(){var _0x51f3fb=_0x23c52d(this);_0x51f3fb[_0x4630('0x2a')](_0x4630('0x3b'))['qdAmAddNdx']()[_0x4630('0xd')](_0x4630('0x3e'));_0x51f3fb[_0x4630('0xd')](_0x4630('0x3f'));_0x51f3fb['parent']()[_0x4630('0xd')]('qd-am-dropdown');});_0x37d5cf[_0x4630('0xd')]('qd-am-dropdown');var _0x282c21=0x0,_0x11b901=function(_0x37e7c6){_0x282c21+=0x1;_0x37e7c6=_0x37e7c6[_0x4630('0x40')]('li')[_0x4630('0x40')]('*');_0x37e7c6['length']&&(_0x37e7c6[_0x4630('0xd')](_0x4630('0x41')+_0x282c21),_0x11b901(_0x37e7c6));};_0x11b901(_0x4660ad);_0x4660ad['add'](_0x4660ad[_0x4630('0x2a')]('ul'))['each'](function(){var _0x315a9b=_0x23c52d(this);_0x315a9b['addClass'](_0x4630('0x42')+_0x315a9b[_0x4630('0x40')]('li')[_0x4630('0x1d')]+_0x4630('0x43'));});});_0x1bdd11(_0x553c82);_0x52714c['callback']['call'](this);_0x23c52d(window)['trigger']('QuatroDigital.am.callback',_0x49d9cf);};_0x23c52d['fn'][_0x4630('0x2')]=function(_0x37d5cd){var _0x1b3cdb=_0x23c52d(this);if(!_0x1b3cdb[_0x4630('0x1d')])return _0x1b3cdb;_0x52714c=_0x23c52d[_0x4630('0x44')]({},_0x5cbc3b,_0x37d5cd);_0x1b3cdb[_0x4630('0x45')]=new _0x23c52d[(_0x4630('0x2'))](_0x23c52d(this));return _0x1b3cdb;};_0x23c52d(function(){_0x23c52d(_0x4630('0x46'))[_0x4630('0x2')]();});}}(this));
/* Quatro Digital Smart Cart */
var _0x8cd8=['error','Oooops!\x20','message','object','info','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','toLowerCase','apply','warn','_QuatroDigital_DropDown','QD_dropDownCart','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','toUpperCase','ite','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','extend','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>','skuName','smartCheckout','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','append','find','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','removeClass','body','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','.qd-ddc-scrollDown','scrollCart','.qd-ddc-shipping\x20.qd-ddc-cep','val','keyup.qd_ddc_cep','keyCode','.qd-ddc-shipping\x20.qd-ddc-cep-ok','.qd-ddc-cep-btn','click','preventDefault','.qd-ddc-cep-close','hide','click._QD_DDC_closeShipping','target','.qd-ddc-cep-tooltip','.qd-ddc-cep-ok','.qd-ddc-cep','updateOnlyHover','mouseenter.qd_ddc_hover','allowUpdate','simpleCart','mouseleave.qd_ddc_hover','cartTotal','texts','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','.qd-ddc-viewCart','html','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','emptyCart','each','clone','callback','.qd-ddc-infoTotalValue','total','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','.qd-ddc-infoAllTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','call','getCartInfoByUrl','dataOptionsCache','.qd-ddc-wrapper','getOrderForm','_QuatroDigital_AmountProduct','exec','addClass','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','.qd-ddc-prodRow','qd-ddc-noItems','renderProductsList','.qd-ddc-prodWrapper2','items','split','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','attr','qd-ddc-','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','content','.qd-ddc-quantity','quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','getParent','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','aviso','actionButtons','cartIsEmpty','filter','[data-sku=\x27','lastSku','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','timeRemoveNewItemClass','qd-ddc-product-add-time-v2','qd-ddc-cart-rendered','qd-ddc-cart-empty','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','forceImageHTTPS','string','http','https','qd-loaded','load','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','click.qd_ddc_remove','removeProduct','stop','slideUp','formatCepField','$1-$2$3','shippingCalculate','qdDdcLastPostalCode','calculateShipping','BRA','done','.qd-ddc-cep-tooltip-text','.qd-dd-cep-slas','remove','logisticsInfo','slas','<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>','shippingEstimate','<td>\x20R$\x20','price','</td><td>','name','\x20para\x20o\x20CEP\x20','tbody','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','index','totalizers','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','.qd_bap_wrapper_content','prepend','ajaxStop','.qdDdcContainer','QD_smartCart','selector','dropDown','buyButton','QD_buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','closest','abs','undefined','pow','toFixed','length','join','_QuatroDigital_CartData','Callbacks','function'];(function(_0x1ee663,_0x49825f){var _0x2a122f=function(_0x3f4580){while(--_0x3f4580){_0x1ee663['push'](_0x1ee663['shift']());}};_0x2a122f(++_0x49825f);}(_0x8cd8,0xe8));var _0x88cd=function(_0x28c16e,_0xcbd274){_0x28c16e=_0x28c16e-0x0;var _0x2f9728=_0x8cd8[_0x28c16e];return _0x2f9728;};(function(_0x15646e){_0x15646e['fn']['getParent']=_0x15646e['fn'][_0x88cd('0x0')];}(jQuery));function qd_number_format(_0x2c0258,_0x2e6ff6,_0x4a4b32,_0x4ec8f2){_0x2c0258=(_0x2c0258+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x2c0258=isFinite(+_0x2c0258)?+_0x2c0258:0x0;_0x2e6ff6=isFinite(+_0x2e6ff6)?Math[_0x88cd('0x1')](_0x2e6ff6):0x0;_0x4ec8f2=_0x88cd('0x2')===typeof _0x4ec8f2?',':_0x4ec8f2;_0x4a4b32=_0x88cd('0x2')===typeof _0x4a4b32?'.':_0x4a4b32;var _0x202c1c='',_0x202c1c=function(_0x5823ba,_0x5bac5f){var _0x2e6ff6=Math[_0x88cd('0x3')](0xa,_0x5bac5f);return''+(Math['round'](_0x5823ba*_0x2e6ff6)/_0x2e6ff6)[_0x88cd('0x4')](_0x5bac5f);},_0x202c1c=(_0x2e6ff6?_0x202c1c(_0x2c0258,_0x2e6ff6):''+Math['round'](_0x2c0258))['split']('.');0x3<_0x202c1c[0x0][_0x88cd('0x5')]&&(_0x202c1c[0x0]=_0x202c1c[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x4ec8f2));(_0x202c1c[0x1]||'')['length']<_0x2e6ff6&&(_0x202c1c[0x1]=_0x202c1c[0x1]||'',_0x202c1c[0x1]+=Array(_0x2e6ff6-_0x202c1c[0x1][_0x88cd('0x5')]+0x1)['join']('0'));return _0x202c1c[_0x88cd('0x6')](_0x4a4b32);};(function(){try{window[_0x88cd('0x7')]=window['_QuatroDigital_CartData']||{},window['_QuatroDigital_CartData']['callback']=window[_0x88cd('0x7')]['callback']||$[_0x88cd('0x8')]();}catch(_0x18bf12){'undefined'!==typeof console&&_0x88cd('0x9')===typeof console[_0x88cd('0xa')]&&console['error'](_0x88cd('0xb'),_0x18bf12[_0x88cd('0xc')]);}}());(function(_0x571b83){try{var _0x146eed=jQuery,_0x11b423=function(_0x54c950,_0x1eda7e){if(_0x88cd('0xd')===typeof console&&_0x88cd('0x2')!==typeof console[_0x88cd('0xa')]&&_0x88cd('0x2')!==typeof console[_0x88cd('0xe')]&&'undefined'!==typeof console['warn']){var _0x4488d2;_0x88cd('0xd')===typeof _0x54c950?(_0x54c950['unshift'](_0x88cd('0xf')),_0x4488d2=_0x54c950):_0x4488d2=[_0x88cd('0xf')+_0x54c950];if(_0x88cd('0x2')===typeof _0x1eda7e||_0x88cd('0x10')!==_0x1eda7e['toLowerCase']()&&'aviso'!==_0x1eda7e[_0x88cd('0x11')]())if(_0x88cd('0x2')!==typeof _0x1eda7e&&_0x88cd('0xe')===_0x1eda7e[_0x88cd('0x11')]())try{console[_0x88cd('0xe')][_0x88cd('0x12')](console,_0x4488d2);}catch(_0x2c35c1){try{console[_0x88cd('0xe')](_0x4488d2[_0x88cd('0x6')]('\x0a'));}catch(_0x3a2cec){}}else try{console[_0x88cd('0xa')][_0x88cd('0x12')](console,_0x4488d2);}catch(_0x1795b5){try{console[_0x88cd('0xa')](_0x4488d2[_0x88cd('0x6')]('\x0a'));}catch(_0x423180){}}else try{console['warn'][_0x88cd('0x12')](console,_0x4488d2);}catch(_0x9c1713){try{console[_0x88cd('0x13')](_0x4488d2['join']('\x0a'));}catch(_0x5d32a5){}}}};window[_0x88cd('0x14')]=window[_0x88cd('0x14')]||{};window[_0x88cd('0x14')]['allowUpdate']=!0x0;_0x146eed[_0x88cd('0x15')]=function(){};_0x146eed['fn'][_0x88cd('0x15')]=function(){return{'fn':new _0x146eed()};};var _0x1403b6=function(_0x3dccae){var _0x501b54={'s':_0x88cd('0x16')};return function(_0x3e0975){var _0x322839=function(_0x22ca96){return _0x22ca96;};var _0x1cd403=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3e0975=_0x3e0975['d'+_0x1cd403[0x10]+'c'+_0x1cd403[0x11]+'m'+_0x322839(_0x1cd403[0x1])+'n'+_0x1cd403[0xd]]['l'+_0x1cd403[0x12]+'c'+_0x1cd403[0x0]+'ti'+_0x322839('o')+'n'];var _0x547aa1=function(_0x2a75a8){return escape(encodeURIComponent(_0x2a75a8[_0x88cd('0x17')](/\./g,'¨')[_0x88cd('0x17')](/[a-zA-Z]/g,function(_0x1075f4){return String[_0x88cd('0x18')](('Z'>=_0x1075f4?0x5a:0x7a)>=(_0x1075f4=_0x1075f4['charCodeAt'](0x0)+0xd)?_0x1075f4:_0x1075f4-0x1a);})));};var _0x481a3c=_0x547aa1(_0x3e0975[[_0x1cd403[0x9],_0x322839('o'),_0x1cd403[0xc],_0x1cd403[_0x322839(0xd)]][_0x88cd('0x6')]('')]);_0x547aa1=_0x547aa1((window[['js',_0x322839('no'),'m',_0x1cd403[0x1],_0x1cd403[0x4][_0x88cd('0x19')](),_0x88cd('0x1a')][_0x88cd('0x6')]('')]||'---')+['.v',_0x1cd403[0xd],'e',_0x322839('x'),'co',_0x322839('mm'),'erc',_0x1cd403[0x1],'.c',_0x322839('o'),'m.',_0x1cd403[0x13],'r']['join'](''));for(var _0x21197e in _0x501b54){if(_0x547aa1===_0x21197e+_0x501b54[_0x21197e]||_0x481a3c===_0x21197e+_0x501b54[_0x21197e]){var _0x5a4c80='tr'+_0x1cd403[0x11]+'e';break;}_0x5a4c80='f'+_0x1cd403[0x0]+'ls'+_0x322839(_0x1cd403[0x1])+'';}_0x322839=!0x1;-0x1<_0x3e0975[[_0x1cd403[0xc],'e',_0x1cd403[0x0],'rc',_0x1cd403[0x9]]['join']('')][_0x88cd('0x1b')](_0x88cd('0x1c'))&&(_0x322839=!0x0);return[_0x5a4c80,_0x322839];}(_0x3dccae);}(window);if(!eval(_0x1403b6[0x0]))return _0x1403b6[0x1]?_0x11b423('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x146eed[_0x88cd('0x15')]=function(_0x5a00db,_0x262fd6){var _0x33fee8=_0x146eed(_0x5a00db);if(!_0x33fee8[_0x88cd('0x5')])return _0x33fee8;var _0x20d3e2=_0x146eed[_0x88cd('0x1d')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':_0x88cd('0x1e'),'cartTotal':_0x88cd('0x1f'),'emptyCart':_0x88cd('0x20'),'continueShopping':_0x88cd('0x21'),'shippingForm':_0x88cd('0x22')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'forceImageHTTPS':!0x1,'skuName':function(_0xa3e365){return _0xa3e365[_0x88cd('0x23')]||_0xa3e365['name'];},'callback':function(){},'callbackProductsList':function(){}},_0x262fd6);_0x146eed('');var _0x25a65e=this;if(_0x20d3e2[_0x88cd('0x24')]){var _0x458cec=!0x1;_0x88cd('0x2')===typeof window[_0x88cd('0x25')]&&(_0x11b423(_0x88cd('0x26')),_0x146eed[_0x88cd('0x27')]({'url':_0x88cd('0x28'),'async':!0x1,'dataType':_0x88cd('0x29'),'error':function(){_0x11b423(_0x88cd('0x2a'));_0x458cec=!0x0;}}));if(_0x458cec)return _0x11b423(_0x88cd('0x2b'));}if(_0x88cd('0xd')===typeof window['vtexjs']&&'undefined'!==typeof window[_0x88cd('0x25')][_0x88cd('0x2c')])var _0x571b83=window[_0x88cd('0x25')][_0x88cd('0x2c')];else if(_0x88cd('0xd')===typeof vtex&&'object'===typeof vtex[_0x88cd('0x2c')]&&_0x88cd('0x2')!==typeof vtex[_0x88cd('0x2c')][_0x88cd('0x2d')])_0x571b83=new vtex[(_0x88cd('0x2c'))][(_0x88cd('0x2d'))]();else return _0x11b423(_0x88cd('0x2e'));_0x25a65e[_0x88cd('0x2f')]='<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>';var _0x797767=function(_0x152afe){_0x146eed(this)[_0x88cd('0x30')](_0x152afe);_0x152afe[_0x88cd('0x31')](_0x88cd('0x32'))[_0x88cd('0x33')](_0x146eed(_0x88cd('0x34')))['on'](_0x88cd('0x35'),function(){_0x33fee8[_0x88cd('0x36')]('qd-bb-lightBoxProdAdd');_0x146eed(document[_0x88cd('0x37')])[_0x88cd('0x36')](_0x88cd('0x38'));});_0x146eed(document)[_0x88cd('0x39')](_0x88cd('0x3a'))['on'](_0x88cd('0x3a'),function(_0x32d1ae){0x1b==_0x32d1ae['keyCode']&&(_0x33fee8['removeClass'](_0x88cd('0x3b')),_0x146eed(document[_0x88cd('0x37')])[_0x88cd('0x36')](_0x88cd('0x38')));});var _0x4ffd77=_0x152afe[_0x88cd('0x31')](_0x88cd('0x3c'));_0x152afe[_0x88cd('0x31')](_0x88cd('0x3d'))['on']('click.qd_ddc_scrollUp',function(){_0x25a65e['scrollCart']('-',void 0x0,void 0x0,_0x4ffd77);return!0x1;});_0x152afe[_0x88cd('0x31')](_0x88cd('0x3e'))['on']('click.qd_ddc_scrollDown',function(){_0x25a65e[_0x88cd('0x3f')](void 0x0,void 0x0,void 0x0,_0x4ffd77);return!0x1;});var _0x328e2d=_0x152afe[_0x88cd('0x31')]('.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text');_0x152afe['find'](_0x88cd('0x40'))[_0x88cd('0x41')]('')['on'](_0x88cd('0x42'),function(_0x3c4266){_0x25a65e['formatCepField'](_0x146eed(this));0xd==_0x3c4266[_0x88cd('0x43')]&&_0x152afe[_0x88cd('0x31')](_0x88cd('0x44'))['click']();});_0x152afe[_0x88cd('0x31')](_0x88cd('0x45'))[_0x88cd('0x46')](function(_0x9c1ad7){_0x9c1ad7[_0x88cd('0x47')]();_0x328e2d['toggle']();});_0x152afe[_0x88cd('0x31')](_0x88cd('0x48'))[_0x88cd('0x46')](function(_0x4621ae){_0x4621ae[_0x88cd('0x47')]();_0x328e2d[_0x88cd('0x49')]();});_0x146eed(document)[_0x88cd('0x39')](_0x88cd('0x4a'))['on'](_0x88cd('0x4a'),function(_0x2b3288){_0x146eed(_0x2b3288[_0x88cd('0x4b')])[_0x88cd('0x0')](_0x152afe['find'](_0x88cd('0x4c')))[_0x88cd('0x5')]||_0x328e2d[_0x88cd('0x49')]();});_0x152afe[_0x88cd('0x31')](_0x88cd('0x4d'))[_0x88cd('0x46')](function(_0x354d44){_0x354d44[_0x88cd('0x47')]();_0x25a65e['shippingCalculate'](_0x152afe[_0x88cd('0x31')](_0x88cd('0x4e')));});if(_0x20d3e2[_0x88cd('0x4f')]){var _0x262fd6=0x0;_0x146eed(this)['on'](_0x88cd('0x50'),function(){var _0x152afe=function(){window['_QuatroDigital_DropDown'][_0x88cd('0x51')]&&(_0x25a65e['getCartInfoByUrl'](),window[_0x88cd('0x14')][_0x88cd('0x51')]=!0x1,_0x146eed['fn'][_0x88cd('0x52')](!0x0),_0x25a65e['cartIsEmpty']());};_0x262fd6=setInterval(function(){_0x152afe();},0x258);_0x152afe();});_0x146eed(this)['on'](_0x88cd('0x53'),function(){clearInterval(_0x262fd6);});}};var _0x2c2434=function(_0x4595b4){_0x4595b4=_0x146eed(_0x4595b4);_0x20d3e2['texts'][_0x88cd('0x54')]=_0x20d3e2[_0x88cd('0x55')]['cartTotal'][_0x88cd('0x17')](_0x88cd('0x56'),_0x88cd('0x57'));_0x20d3e2[_0x88cd('0x55')]['cartTotal']=_0x20d3e2['texts'][_0x88cd('0x54')][_0x88cd('0x17')](_0x88cd('0x58'),'<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>');_0x20d3e2['texts'][_0x88cd('0x54')]=_0x20d3e2['texts'][_0x88cd('0x54')]['replace'](_0x88cd('0x59'),_0x88cd('0x5a'));_0x20d3e2[_0x88cd('0x55')][_0x88cd('0x54')]=_0x20d3e2['texts'][_0x88cd('0x54')]['replace'](_0x88cd('0x5b'),'<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0x4595b4[_0x88cd('0x31')](_0x88cd('0x5c'))[_0x88cd('0x5d')](_0x20d3e2[_0x88cd('0x55')]['linkCart']);_0x4595b4[_0x88cd('0x31')]('.qd_ddc_continueShopping')[_0x88cd('0x5d')](_0x20d3e2[_0x88cd('0x55')][_0x88cd('0x5e')]);_0x4595b4['find'](_0x88cd('0x5f'))[_0x88cd('0x5d')](_0x20d3e2[_0x88cd('0x55')][_0x88cd('0x60')]);_0x4595b4[_0x88cd('0x31')]('.qd-ddc-infoTotal')[_0x88cd('0x5d')](_0x20d3e2[_0x88cd('0x55')]['cartTotal']);_0x4595b4[_0x88cd('0x31')](_0x88cd('0x61'))[_0x88cd('0x5d')](_0x20d3e2[_0x88cd('0x55')][_0x88cd('0x62')]);_0x4595b4[_0x88cd('0x31')](_0x88cd('0x63'))[_0x88cd('0x5d')](_0x20d3e2[_0x88cd('0x55')][_0x88cd('0x64')]);return _0x4595b4;}(this[_0x88cd('0x2f')]);var _0x21acc3=0x0;_0x33fee8[_0x88cd('0x65')](function(){0x0<_0x21acc3?_0x797767['call'](this,_0x2c2434[_0x88cd('0x66')]()):_0x797767['call'](this,_0x2c2434);_0x21acc3++;});window[_0x88cd('0x7')][_0x88cd('0x67')][_0x88cd('0x33')](function(){_0x146eed(_0x88cd('0x68'))[_0x88cd('0x5d')](window[_0x88cd('0x7')][_0x88cd('0x69')]||'--');_0x146eed(_0x88cd('0x6a'))[_0x88cd('0x5d')](window[_0x88cd('0x7')][_0x88cd('0x6b')]||'0');_0x146eed(_0x88cd('0x6c'))[_0x88cd('0x5d')](window[_0x88cd('0x7')]['shipping']||'--');_0x146eed(_0x88cd('0x6d'))[_0x88cd('0x5d')](window[_0x88cd('0x7')]['allTotal']||'--');});var _0x30124d=function(_0x168245,_0x5519a4){if(_0x88cd('0x2')===typeof _0x168245['items'])return _0x11b423(_0x88cd('0x6e'));_0x25a65e['renderProductsList'][_0x88cd('0x6f')](this,_0x5519a4);};_0x25a65e[_0x88cd('0x70')]=function(_0x36b435,_0x3139db){_0x88cd('0x2')!=typeof _0x3139db?window[_0x88cd('0x14')][_0x88cd('0x71')]=_0x3139db:window[_0x88cd('0x14')][_0x88cd('0x71')]&&(_0x3139db=window['_QuatroDigital_DropDown']['dataOptionsCache']);setTimeout(function(){window[_0x88cd('0x14')]['dataOptionsCache']=void 0x0;},_0x20d3e2['timeRemoveNewItemClass']);_0x146eed(_0x88cd('0x72'))[_0x88cd('0x36')]('qd-ddc-prodLoaded');if(_0x20d3e2[_0x88cd('0x24')]){var _0x84a7cc=function(_0x7818e2){window[_0x88cd('0x14')][_0x88cd('0x73')]=_0x7818e2;_0x30124d(_0x7818e2,_0x3139db);_0x88cd('0x2')!==typeof window[_0x88cd('0x74')]&&_0x88cd('0x9')===typeof window[_0x88cd('0x74')][_0x88cd('0x75')]&&window[_0x88cd('0x74')]['exec'][_0x88cd('0x6f')](this);_0x146eed(_0x88cd('0x72'))[_0x88cd('0x76')]('qd-ddc-prodLoaded');};_0x88cd('0x2')!==typeof window[_0x88cd('0x14')][_0x88cd('0x73')]?(_0x84a7cc(window[_0x88cd('0x14')][_0x88cd('0x73')]),_0x88cd('0x9')===typeof _0x36b435&&_0x36b435(window[_0x88cd('0x14')][_0x88cd('0x73')])):_0x146eed['QD_checkoutQueue'](['items','totalizers',_0x88cd('0x77')],{'done':function(_0x86e591){_0x84a7cc[_0x88cd('0x6f')](this,_0x86e591);_0x88cd('0x9')===typeof _0x36b435&&_0x36b435(_0x86e591);},'fail':function(_0x244b37){_0x11b423([_0x88cd('0x78'),_0x244b37]);}});}else alert('Este\x20método\x20esta\x20descontinuado!');};_0x25a65e['cartIsEmpty']=function(){var _0x48d577=_0x146eed(_0x88cd('0x72'));_0x48d577[_0x88cd('0x31')](_0x88cd('0x79'))[_0x88cd('0x5')]?_0x48d577[_0x88cd('0x36')](_0x88cd('0x7a')):_0x48d577[_0x88cd('0x76')](_0x88cd('0x7a'));};_0x25a65e[_0x88cd('0x7b')]=function(_0x4acbec){var _0x262fd6=_0x146eed(_0x88cd('0x7c'));_0x262fd6['empty']();_0x262fd6[_0x88cd('0x65')](function(){var _0x262fd6=_0x146eed(this),_0x29a654,_0x1676d2,_0xfa2487=_0x146eed(''),_0x2c81e4;for(_0x2c81e4 in window['_QuatroDigital_DropDown'][_0x88cd('0x73')][_0x88cd('0x7d')])if(_0x88cd('0xd')===typeof window[_0x88cd('0x14')][_0x88cd('0x73')][_0x88cd('0x7d')][_0x2c81e4]){var _0x2764f5=window[_0x88cd('0x14')]['getOrderForm'][_0x88cd('0x7d')][_0x2c81e4];var _0x5a00db=_0x2764f5['productCategoryIds'][_0x88cd('0x17')](/^\/|\/$/g,'')[_0x88cd('0x7e')]('/');var _0x42bb71=_0x146eed(_0x88cd('0x7f'));_0x42bb71[_0x88cd('0x80')]({'data-sku':_0x2764f5['id'],'data-sku-index':_0x2c81e4,'data-qd-departament':_0x5a00db[0x0],'data-qd-category':_0x5a00db[_0x5a00db[_0x88cd('0x5')]-0x1]});_0x42bb71[_0x88cd('0x76')](_0x88cd('0x81')+_0x2764f5[_0x88cd('0x82')]);_0x42bb71[_0x88cd('0x31')](_0x88cd('0x83'))[_0x88cd('0x30')](_0x20d3e2[_0x88cd('0x23')](_0x2764f5));_0x42bb71[_0x88cd('0x31')](_0x88cd('0x84'))[_0x88cd('0x30')](isNaN(_0x2764f5[_0x88cd('0x85')])?_0x2764f5[_0x88cd('0x85')]:0x0==_0x2764f5[_0x88cd('0x85')]?_0x88cd('0x86'):(_0x146eed(_0x88cd('0x87'))[_0x88cd('0x80')](_0x88cd('0x88'))||'R$')+'\x20'+qd_number_format(_0x2764f5['sellingPrice']/0x64,0x2,',','.'));_0x42bb71[_0x88cd('0x31')](_0x88cd('0x89'))[_0x88cd('0x80')]({'data-sku':_0x2764f5['id'],'data-sku-index':_0x2c81e4})[_0x88cd('0x41')](_0x2764f5[_0x88cd('0x8a')]);_0x42bb71[_0x88cd('0x31')](_0x88cd('0x8b'))[_0x88cd('0x80')]({'data-sku':_0x2764f5['id'],'data-sku-index':_0x2c81e4});_0x25a65e[_0x88cd('0x8c')](_0x2764f5['id'],_0x42bb71[_0x88cd('0x31')](_0x88cd('0x8d')),_0x2764f5[_0x88cd('0x8e')]);_0x42bb71[_0x88cd('0x31')](_0x88cd('0x8f'))[_0x88cd('0x80')]({'data-sku':_0x2764f5['id'],'data-sku-index':_0x2c81e4});_0x42bb71[_0x88cd('0x90')](_0x262fd6);_0xfa2487=_0xfa2487[_0x88cd('0x33')](_0x42bb71);}try{var _0x376042=_0x262fd6[_0x88cd('0x91')](_0x88cd('0x72'))[_0x88cd('0x31')]('.qd-ddc-shipping\x20input');_0x376042['length']&&''==_0x376042[_0x88cd('0x41')]()&&window['_QuatroDigital_DropDown'][_0x88cd('0x73')][_0x88cd('0x77')][_0x88cd('0x92')]&&_0x376042['val'](window[_0x88cd('0x14')]['getOrderForm'][_0x88cd('0x77')][_0x88cd('0x92')][_0x88cd('0x93')]);}catch(_0x4168fa){_0x11b423(_0x88cd('0x94')+_0x4168fa[_0x88cd('0xc')],_0x88cd('0x95'));}_0x25a65e[_0x88cd('0x96')](_0x262fd6);_0x25a65e[_0x88cd('0x97')]();_0x4acbec&&_0x4acbec['lastSku']&&function(){_0x1676d2=_0xfa2487[_0x88cd('0x98')](_0x88cd('0x99')+_0x4acbec[_0x88cd('0x9a')]+'\x27]');_0x1676d2[_0x88cd('0x5')]&&(_0x29a654=0x0,_0xfa2487[_0x88cd('0x65')](function(){var _0x4acbec=_0x146eed(this);if(_0x4acbec['is'](_0x1676d2))return!0x1;_0x29a654+=_0x4acbec[_0x88cd('0x9b')]();}),_0x25a65e[_0x88cd('0x3f')](void 0x0,void 0x0,_0x29a654,_0x262fd6[_0x88cd('0x33')](_0x262fd6['parent']())),_0xfa2487[_0x88cd('0x36')](_0x88cd('0x9c')),function(_0x4ff25d){_0x4ff25d['addClass'](_0x88cd('0x9d'));_0x4ff25d[_0x88cd('0x76')]('qd-ddc-lastAddedFixed');setTimeout(function(){_0x4ff25d[_0x88cd('0x36')]('qd-ddc-lastAdded');},_0x20d3e2[_0x88cd('0x9e')]);}(_0x1676d2),_0x146eed(document['body'])[_0x88cd('0x76')](_0x88cd('0x9f')),setTimeout(function(){_0x146eed(document[_0x88cd('0x37')])[_0x88cd('0x36')](_0x88cd('0x9f'));},_0x20d3e2['timeRemoveNewItemClass']));}();});(function(){_QuatroDigital_DropDown[_0x88cd('0x73')][_0x88cd('0x7d')][_0x88cd('0x5')]?(_0x146eed(_0x88cd('0x37'))[_0x88cd('0x36')]('qd-ddc-cart-empty')[_0x88cd('0x76')]('qd-ddc-cart-rendered\x20qd-ddc-product-add-time'),setTimeout(function(){_0x146eed(_0x88cd('0x37'))[_0x88cd('0x36')]('qd-ddc-product-add-time');},_0x20d3e2['timeRemoveNewItemClass'])):_0x146eed(_0x88cd('0x37'))['removeClass'](_0x88cd('0xa0'))[_0x88cd('0x76')](_0x88cd('0xa1'));}());_0x88cd('0x9')===typeof _0x20d3e2[_0x88cd('0xa2')]?_0x20d3e2[_0x88cd('0xa2')][_0x88cd('0x6f')](this):_0x11b423(_0x88cd('0xa3'));};_0x25a65e[_0x88cd('0x8c')]=function(_0x185972,_0x20bd5c,_0x57ceec){function _0x284206(){_0x20d3e2[_0x88cd('0xa4')]&&_0x88cd('0xa5')==typeof _0x57ceec&&(_0x57ceec=_0x57ceec[_0x88cd('0x17')](_0x88cd('0xa6'),_0x88cd('0xa7')));_0x20bd5c[_0x88cd('0x36')](_0x88cd('0xa8'))[_0x88cd('0xa9')](function(){_0x146eed(this)[_0x88cd('0x76')](_0x88cd('0xa8'));})[_0x88cd('0x80')](_0x88cd('0xaa'),_0x57ceec);}_0x57ceec?_0x284206():isNaN(_0x185972)?_0x11b423(_0x88cd('0xab'),'alerta'):alert('Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.');};_0x25a65e[_0x88cd('0x96')]=function(_0x318629){var _0x262fd6=function(_0x2bdc47,_0x330720){var _0x350731=_0x146eed(_0x2bdc47);var _0x54684e=_0x350731['attr'](_0x88cd('0xac'));var _0x5a00db=_0x350731[_0x88cd('0x80')](_0x88cd('0xad'));if(_0x54684e){var _0x26a354=parseInt(_0x350731[_0x88cd('0x41')]())||0x1;_0x25a65e[_0x88cd('0xae')]([_0x54684e,_0x5a00db],_0x26a354,_0x26a354+0x1,function(_0x25ac4a){_0x350731[_0x88cd('0x41')](_0x25ac4a);_0x88cd('0x9')===typeof _0x330720&&_0x330720();});}};var _0x581021=function(_0x41c8e7,_0xffcf00){var _0x262fd6=_0x146eed(_0x41c8e7);var _0x1bfa27=_0x262fd6[_0x88cd('0x80')](_0x88cd('0xac'));var _0x2bc5c7=_0x262fd6[_0x88cd('0x80')]('data-sku-index');if(_0x1bfa27){var _0x5a00db=parseInt(_0x262fd6[_0x88cd('0x41')]())||0x2;_0x25a65e['changeQantity']([_0x1bfa27,_0x2bc5c7],_0x5a00db,_0x5a00db-0x1,function(_0x2f14aa){_0x262fd6[_0x88cd('0x41')](_0x2f14aa);_0x88cd('0x9')===typeof _0xffcf00&&_0xffcf00();});}};var _0xa5720e=function(_0x12d7ce,_0x5435b4){var _0xbf7f4=_0x146eed(_0x12d7ce);var _0x59595f=_0xbf7f4[_0x88cd('0x80')](_0x88cd('0xac'));var _0x5a00db=_0xbf7f4[_0x88cd('0x80')](_0x88cd('0xad'));if(_0x59595f){var _0x139fd8=parseInt(_0xbf7f4['val']())||0x1;_0x25a65e[_0x88cd('0xae')]([_0x59595f,_0x5a00db],0x1,_0x139fd8,function(_0x317704){_0xbf7f4[_0x88cd('0x41')](_0x317704);'function'===typeof _0x5435b4&&_0x5435b4();});}};var _0x5a00db=_0x318629[_0x88cd('0x31')](_0x88cd('0xaf'));_0x5a00db[_0x88cd('0x76')](_0x88cd('0xb0'))[_0x88cd('0x65')](function(){var _0x318629=_0x146eed(this);_0x318629[_0x88cd('0x31')](_0x88cd('0xb1'))['on'](_0x88cd('0xb2'),function(_0x1dc459){_0x1dc459[_0x88cd('0x47')]();_0x5a00db[_0x88cd('0x76')]('qd-loading');_0x262fd6(_0x318629[_0x88cd('0x31')](_0x88cd('0x89')),function(){_0x5a00db['removeClass'](_0x88cd('0xb3'));});});_0x318629['find'](_0x88cd('0xb4'))['on'](_0x88cd('0xb5'),function(_0x22c9cb){_0x22c9cb['preventDefault']();_0x5a00db['addClass'](_0x88cd('0xb3'));_0x581021(_0x318629['find']('.qd-ddc-quantity'),function(){_0x5a00db[_0x88cd('0x36')]('qd-loading');});});_0x318629[_0x88cd('0x31')]('.qd-ddc-quantity')['on'](_0x88cd('0xb6'),function(){_0x5a00db[_0x88cd('0x76')](_0x88cd('0xb3'));_0xa5720e(this,function(){_0x5a00db['removeClass'](_0x88cd('0xb3'));});});_0x318629[_0x88cd('0x31')](_0x88cd('0x89'))['on'](_0x88cd('0xb7'),function(_0x4a69d6){0xd==_0x4a69d6[_0x88cd('0x43')]&&(_0x5a00db[_0x88cd('0x76')]('qd-loading'),_0xa5720e(this,function(){_0x5a00db[_0x88cd('0x36')](_0x88cd('0xb3'));}));});});_0x318629['find'](_0x88cd('0x79'))['each'](function(){var _0x318629=_0x146eed(this);_0x318629[_0x88cd('0x31')]('.qd-ddc-remove')['on'](_0x88cd('0xb8'),function(){_0x318629[_0x88cd('0x76')]('qd-loading');_0x25a65e[_0x88cd('0xb9')](_0x146eed(this),function(_0x236af7){_0x236af7?_0x318629[_0x88cd('0xba')](!0x0)[_0x88cd('0xbb')](function(){_0x318629['remove']();_0x25a65e['cartIsEmpty']();}):_0x318629['removeClass'](_0x88cd('0xb3'));});return!0x1;});});};_0x25a65e[_0x88cd('0xbc')]=function(_0x1b9f21){var _0x216531=_0x1b9f21[_0x88cd('0x41')]();_0x216531=_0x216531[_0x88cd('0x17')](/[^0-9\-]/g,'');_0x216531=_0x216531[_0x88cd('0x17')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x88cd('0xbd'));_0x216531=_0x216531[_0x88cd('0x17')](/(.{9}).*/g,'$1');_0x1b9f21[_0x88cd('0x41')](_0x216531);};_0x25a65e[_0x88cd('0xbe')]=function(_0xe6f44b){var _0x1feda3=_0xe6f44b[_0x88cd('0x41')]();0x9<=_0x1feda3['length']&&(_0xe6f44b['data'](_0x88cd('0xbf'))!=_0x1feda3&&_0x571b83[_0x88cd('0xc0')]({'postalCode':_0x1feda3,'country':_0x88cd('0xc1')})[_0x88cd('0xc2')](function(_0x421303){_0xe6f44b[_0x88cd('0x0')](_0x88cd('0xc3'))['find'](_0x88cd('0xc4'))[_0x88cd('0xc5')]();window[_0x88cd('0x14')]['getOrderForm']=_0x421303;_0x25a65e['getCartInfoByUrl']();_0x421303=_0x421303['shippingData'][_0x88cd('0xc6')][0x0][_0x88cd('0xc7')];for(var _0x5a00db=_0x146eed(_0x88cd('0xc8')),_0x341785=0x0;_0x341785<_0x421303[_0x88cd('0x5')];_0x341785++){var _0xd26803=_0x421303[_0x341785],_0x37dde6=0x1<_0xd26803['shippingEstimate']?_0xd26803['shippingEstimate'][_0x88cd('0x17')]('bd','\x20dia\x20útil'):_0xd26803[_0x88cd('0xc9')]['replace']('bd','\x20dias\x20útéis'),_0x434e4e=_0x146eed('<tr></tr>');_0x434e4e[_0x88cd('0x30')](_0x88cd('0xca')+qd_number_format(_0xd26803[_0x88cd('0xcb')]/0x64,0x2,',','.')+_0x88cd('0xcc')+_0xd26803[_0x88cd('0xcd')]+',\x20entrega\x20em\x20'+_0x37dde6+_0x88cd('0xce')+_0x1feda3+'</td>');_0x434e4e[_0x88cd('0x90')](_0x5a00db[_0x88cd('0x31')](_0x88cd('0xcf')));}_0x5a00db['insertBefore'](_0xe6f44b[_0x88cd('0x0')](_0x88cd('0xc3'))[_0x88cd('0x31')](_0x88cd('0x48')));})[_0x88cd('0xd0')](function(_0x35c00c){_0x11b423([_0x88cd('0xd1'),_0x35c00c]);updateCartData();}),_0xe6f44b['data'](_0x88cd('0xbf'),_0x1feda3));};_0x25a65e[_0x88cd('0xae')]=function(_0x14a4b5,_0x4bbee8,_0x490407,_0x563d24){function _0x27142c(_0x4976f9){_0x4976f9='boolean'!==typeof _0x4976f9?!0x1:_0x4976f9;_0x25a65e[_0x88cd('0x70')]();window[_0x88cd('0x14')][_0x88cd('0x51')]=!0x1;_0x25a65e[_0x88cd('0x97')]();_0x88cd('0x2')!==typeof window[_0x88cd('0x74')]&&_0x88cd('0x9')===typeof window[_0x88cd('0x74')][_0x88cd('0x75')]&&window[_0x88cd('0x74')][_0x88cd('0x75')][_0x88cd('0x6f')](this);_0x88cd('0x9')===typeof adminCart&&adminCart();_0x146eed['fn'][_0x88cd('0x52')](!0x0,void 0x0,_0x4976f9);_0x88cd('0x9')===typeof _0x563d24&&_0x563d24(_0x4bbee8);}_0x490407=_0x490407||0x1;if(0x1>_0x490407)return _0x4bbee8;if(_0x20d3e2[_0x88cd('0x24')]){if(_0x88cd('0x2')===typeof window[_0x88cd('0x14')]['getOrderForm'][_0x88cd('0x7d')][_0x14a4b5[0x1]])return _0x11b423('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x14a4b5[0x1]+']'),_0x4bbee8;window['_QuatroDigital_DropDown'][_0x88cd('0x73')]['items'][_0x14a4b5[0x1]][_0x88cd('0x8a')]=_0x490407;window[_0x88cd('0x14')][_0x88cd('0x73')]['items'][_0x14a4b5[0x1]][_0x88cd('0xd2')]=_0x14a4b5[0x1];_0x571b83['updateItems']([window[_0x88cd('0x14')][_0x88cd('0x73')][_0x88cd('0x7d')][_0x14a4b5[0x1]]],[_0x88cd('0x7d'),_0x88cd('0xd3'),_0x88cd('0x77')])['done'](function(_0x3e8592){window[_0x88cd('0x14')]['getOrderForm']=_0x3e8592;_0x27142c(!0x0);})[_0x88cd('0xd0')](function(_0x3a21e){_0x11b423([_0x88cd('0xd4'),_0x3a21e]);_0x27142c();});}else _0x11b423('atenção\x20esta\x20método\x20esta\x20descontinuado');};_0x25a65e[_0x88cd('0xb9')]=function(_0x7b5475,_0x346b0b){function _0x2d27d3(_0x4f0a42){_0x4f0a42=_0x88cd('0xd5')!==typeof _0x4f0a42?!0x1:_0x4f0a42;_0x88cd('0x2')!==typeof window[_0x88cd('0x74')]&&_0x88cd('0x9')===typeof window[_0x88cd('0x74')][_0x88cd('0x75')]&&window['_QuatroDigital_AmountProduct'][_0x88cd('0x75')][_0x88cd('0x6f')](this);_0x88cd('0x9')===typeof adminCart&&adminCart();_0x146eed['fn']['simpleCart'](!0x0,void 0x0,_0x4f0a42);_0x88cd('0x9')===typeof _0x346b0b&&_0x346b0b(_0x1d37c3);}var _0x1d37c3=!0x1,_0x5a00db=_0x146eed(_0x7b5475)[_0x88cd('0x80')](_0x88cd('0xad'));if(_0x20d3e2[_0x88cd('0x24')]){if('undefined'===typeof window[_0x88cd('0x14')]['getOrderForm']['items'][_0x5a00db])return _0x11b423(_0x88cd('0xd6')+_0x5a00db+']'),_0x1d37c3;window['_QuatroDigital_DropDown'][_0x88cd('0x73')][_0x88cd('0x7d')][_0x5a00db][_0x88cd('0xd2')]=_0x5a00db;_0x571b83[_0x88cd('0xd7')]([window[_0x88cd('0x14')]['getOrderForm'][_0x88cd('0x7d')][_0x5a00db]],[_0x88cd('0x7d'),_0x88cd('0xd3'),_0x88cd('0x77')])['done'](function(_0x4b474e){_0x1d37c3=!0x0;window[_0x88cd('0x14')][_0x88cd('0x73')]=_0x4b474e;_0x30124d(_0x4b474e);_0x2d27d3(!0x0);})[_0x88cd('0xd0')](function(_0x4a492e){_0x11b423([_0x88cd('0xd8'),_0x4a492e]);_0x2d27d3();});}else alert('Atenção,\x20este\x20método\x20esta\x20descontinuado.');};_0x25a65e['scrollCart']=function(_0x4933b4,_0x761281,_0x582fad,_0x6235c3){_0x6235c3=_0x6235c3||_0x146eed(_0x88cd('0xd9'));_0x4933b4=_0x4933b4||'+';_0x761281=_0x761281||0.9*_0x6235c3[_0x88cd('0xda')]();_0x6235c3['stop'](!0x0,!0x0)['animate']({'scrollTop':isNaN(_0x582fad)?_0x4933b4+'='+_0x761281+'px':_0x582fad});};_0x20d3e2['updateOnlyHover']||(_0x25a65e[_0x88cd('0x70')](),_0x146eed['fn'][_0x88cd('0x52')](!0x0));_0x146eed(window)['on']('productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex',function(){try{window[_0x88cd('0x14')][_0x88cd('0x73')]=void 0x0,_0x25a65e[_0x88cd('0x70')]();}catch(_0x6f5117){_0x11b423(_0x88cd('0xdb')+_0x6f5117[_0x88cd('0xc')],_0x88cd('0xdc'));}});'function'===typeof _0x20d3e2[_0x88cd('0x67')]?_0x20d3e2['callback'][_0x88cd('0x6f')](this):_0x11b423('Callback\x20não\x20é\x20uma\x20função');};_0x146eed['fn'][_0x88cd('0x15')]=function(_0xe50c87){var _0x38ffc7=_0x146eed(this);_0x38ffc7['fn']=new _0x146eed[(_0x88cd('0x15'))](this,_0xe50c87);return _0x38ffc7;};}catch(_0x3e14d9){_0x88cd('0x2')!==typeof console&&_0x88cd('0x9')===typeof console[_0x88cd('0xa')]&&console['error'](_0x88cd('0xb'),_0x3e14d9);}}(this));(function(_0x1c1b59){try{var _0x19e389=jQuery;window[_0x88cd('0x74')]=window['_QuatroDigital_AmountProduct']||{};window[_0x88cd('0x74')][_0x88cd('0x7d')]={};window[_0x88cd('0x74')][_0x88cd('0xdd')]=!0x1;window[_0x88cd('0x74')][_0x88cd('0xde')]=!0x1;window['_QuatroDigital_AmountProduct'][_0x88cd('0xdf')]=!0x1;var _0x503beb=function(){if(window[_0x88cd('0x74')][_0x88cd('0xdd')]){var _0x5c256c=!0x1;var _0x23f94b={};window[_0x88cd('0x74')][_0x88cd('0x7d')]={};for(_0x13ea04 in window[_0x88cd('0x14')]['getOrderForm'][_0x88cd('0x7d')])if(_0x88cd('0xd')===typeof window['_QuatroDigital_DropDown'][_0x88cd('0x73')][_0x88cd('0x7d')][_0x13ea04]){var _0x5e53ae=window[_0x88cd('0x14')][_0x88cd('0x73')][_0x88cd('0x7d')][_0x13ea04];_0x88cd('0x2')!==typeof _0x5e53ae[_0x88cd('0xe0')]&&null!==_0x5e53ae[_0x88cd('0xe0')]&&''!==_0x5e53ae['productId']&&(window['_QuatroDigital_AmountProduct'][_0x88cd('0x7d')][_0x88cd('0xe1')+_0x5e53ae['productId']]=window['_QuatroDigital_AmountProduct']['items'][_0x88cd('0xe1')+_0x5e53ae[_0x88cd('0xe0')]]||{},window[_0x88cd('0x74')][_0x88cd('0x7d')][_0x88cd('0xe1')+_0x5e53ae[_0x88cd('0xe0')]][_0x88cd('0xe2')]=_0x5e53ae[_0x88cd('0xe0')],_0x23f94b[_0x88cd('0xe1')+_0x5e53ae['productId']]||(window['_QuatroDigital_AmountProduct'][_0x88cd('0x7d')][_0x88cd('0xe1')+_0x5e53ae['productId']]['qtt']=0x0),window[_0x88cd('0x74')][_0x88cd('0x7d')][_0x88cd('0xe1')+_0x5e53ae[_0x88cd('0xe0')]][_0x88cd('0x6b')]+=_0x5e53ae[_0x88cd('0x8a')],_0x5c256c=!0x0,_0x23f94b[_0x88cd('0xe1')+_0x5e53ae['productId']]=!0x0);}var _0x13ea04=_0x5c256c;}else _0x13ea04=void 0x0;window[_0x88cd('0x74')]['allowRecalculate']&&(_0x19e389(_0x88cd('0xe3'))[_0x88cd('0xc5')](),_0x19e389(_0x88cd('0xe4'))[_0x88cd('0x36')](_0x88cd('0xe5')));for(var _0x905434 in window[_0x88cd('0x74')][_0x88cd('0x7d')]){_0x5e53ae=window['_QuatroDigital_AmountProduct'][_0x88cd('0x7d')][_0x905434];if(_0x88cd('0xd')!==typeof _0x5e53ae)return;_0x23f94b=_0x19e389(_0x88cd('0xe6')+_0x5e53ae[_0x88cd('0xe2')]+']')[_0x88cd('0x91')]('li');if(window['_QuatroDigital_AmountProduct'][_0x88cd('0xdd')]||!_0x23f94b[_0x88cd('0x31')]('.qd-bap-wrapper')[_0x88cd('0x5')])_0x5c256c=_0x19e389('<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>'),_0x5c256c[_0x88cd('0x31')]('.qd-bap-qtt')[_0x88cd('0x5d')](_0x5e53ae[_0x88cd('0x6b')]),_0x5e53ae=_0x23f94b[_0x88cd('0x31')](_0x88cd('0xe7')),_0x5e53ae['length']?_0x5e53ae[_0x88cd('0xe8')](_0x5c256c)['addClass'](_0x88cd('0xe5')):_0x23f94b[_0x88cd('0xe8')](_0x5c256c);}_0x13ea04&&(window[_0x88cd('0x74')][_0x88cd('0xdd')]=!0x1);};window[_0x88cd('0x74')][_0x88cd('0x75')]=function(){window[_0x88cd('0x74')]['allowRecalculate']=!0x0;_0x503beb[_0x88cd('0x6f')](this);};_0x19e389(document)[_0x88cd('0xe9')](function(){_0x503beb[_0x88cd('0x6f')](this);});}catch(_0x21aca2){_0x88cd('0x2')!==typeof console&&_0x88cd('0x9')===typeof console[_0x88cd('0xa')]&&console[_0x88cd('0xa')]('Oooops!\x20',_0x21aca2);}}(this));(function(){try{var _0x24ab9b=jQuery,_0x595c75,_0x48ecbd={'selector':_0x88cd('0xea'),'dropDown':{},'buyButton':{}};_0x24ab9b[_0x88cd('0xeb')]=function(_0x46ee9c){var _0x40987a={};_0x595c75=_0x24ab9b[_0x88cd('0x1d')](!0x0,{},_0x48ecbd,_0x46ee9c);_0x46ee9c=_0x24ab9b(_0x595c75[_0x88cd('0xec')])['QD_dropDownCart'](_0x595c75[_0x88cd('0xed')]);_0x40987a[_0x88cd('0xee')]=_0x88cd('0x2')!==typeof _0x595c75[_0x88cd('0xed')][_0x88cd('0x4f')]&&!0x1===_0x595c75[_0x88cd('0xed')][_0x88cd('0x4f')]?_0x24ab9b(_0x595c75[_0x88cd('0xec')])['QD_buyButton'](_0x46ee9c['fn'],_0x595c75['buyButton']):_0x24ab9b(_0x595c75['selector'])[_0x88cd('0xef')](_0x595c75['buyButton']);_0x40987a[_0x88cd('0xed')]=_0x46ee9c;return _0x40987a;};_0x24ab9b['fn'][_0x88cd('0xf0')]=function(){_0x88cd('0xd')===typeof console&&_0x88cd('0x9')===typeof console[_0x88cd('0xe')]&&console[_0x88cd('0xe')](_0x88cd('0xf1'));};_0x24ab9b[_0x88cd('0xf0')]=_0x24ab9b['fn']['smartCart'];}catch(_0xff9e46){_0x88cd('0x2')!==typeof console&&_0x88cd('0x9')===typeof console['error']&&console[_0x88cd('0xa')](_0x88cd('0xb'),_0xff9e46);}}());

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0x11f6=['appendTo','QuatroDigital.pv_video_added','ajaxStop','load','ImageControl','Video\x20in\x20product','object','undefined','alerta','warn','info','toLowerCase','start','td.value-field.Videos:first','http','qdVideoInProduct','extend','div#image','text','replace','split','length','indexOf','youtube','push','pop','shift','youtu.be','be/','<div\x20class=\x22qd-playerWrapper\x22></div>','prependTo','<div\x20class=\x22qd-playerContainer\x22></div>','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','join','toUpperCase','ite','erc','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','<iframe\x20src=\x22','://www.youtube.com/embed/','?wmode=transparent&rel=0&enablejsapi=1&autoplay=','autoPlay','\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>','data','height','stop','body','addClass','qdpv-video-on','fadeTo','add','animate','find','iframe','a:not(\x27.qd-videoLink\x27)','click.removeVideo','style','removeClass','call','string','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','bind','click.playVideo','controlVideo','.qd-playerWrapper\x20iframe','attr','rel','contentWindow','{\x22event\x22:\x22command\x22,\x22func\x22:\x22','playVideo','\x22,\x22args\x22:\x22\x22}','a:not(.qd-videoLink)','postMessage','pauseVideo','insertThumbsIn'];(function(_0x30ed11,_0x359fbf){var _0x261832=function(_0x1ed319){while(--_0x1ed319){_0x30ed11['push'](_0x30ed11['shift']());}};_0x261832(++_0x359fbf);}(_0x11f6,0x190));var _0x611f=function(_0x28b980,_0x3ee45f){_0x28b980=_0x28b980-0x0;var _0xd91ac6=_0x11f6[_0x28b980];return _0xd91ac6;};(function(_0x2e7314){$(function(){if(!$(document['body'])['is']('.produto'))return;var _0x2530b3,_0x4d7073,_0x1966cb=[],_0x14fd56,_0x90fce4,_0x29f856,_0x2a8506,_0x32a25f,_0x17518a,_0x1c92fd,_0x2380ff,_0x3be90b,_0x3ab92d,_0x395f99,_0x13f3a2,_0x89cbbe,_0xbb1693;_0x90fce4=_0x611f('0x0');_0x29f856=function(_0x5425bb,_0x5afecf){_0x611f('0x1')===typeof console&&(_0x611f('0x2')!==typeof _0x5afecf&&_0x611f('0x3')===_0x5afecf['toLowerCase']()?console[_0x611f('0x4')]('['+_0x90fce4+']\x20'+_0x5425bb):'undefined'!==typeof _0x5afecf&&_0x611f('0x5')===_0x5afecf[_0x611f('0x6')]()?console[_0x611f('0x5')]('['+_0x90fce4+']\x20'+_0x5425bb):console['error']('['+_0x90fce4+']\x20'+_0x5425bb));};_0x2a8506={'insertThumbsIn':_0x611f('0x7'),'videoFieldSelector':_0x611f('0x8'),'controlVideo':!0x0,'urlProtocol':_0x611f('0x9'),'autoPlay':0x0};window[_0x611f('0xa')]=window[_0x611f('0xa')]||{};_0x32a25f=$[_0x611f('0xb')](!0x0,_0x2a8506,window[_0x611f('0xa')]);_0x2530b3=$('ul.thumbs');_0x3be90b=$(_0x611f('0xc'));_0x4d7073=$(_0x32a25f['videoFieldSelector'])[_0x611f('0xd')]();_0x13f3a2=function(_0x794e78){return _0x794e78;};_0x14fd56=_0x4d7073[_0x611f('0xe')](/\;\s*/,';')[_0x611f('0xf')](';');for(var _0x215050=0x0;_0x215050<_0x14fd56[_0x611f('0x10')];_0x215050++){if(_0x14fd56[_0x215050][_0x611f('0x11')](_0x611f('0x12'))>-0x1){_0x1966cb[_0x611f('0x13')](_0x14fd56[_0x215050][_0x611f('0xf')]('v=')[_0x611f('0x14')]()[_0x611f('0xf')](/[&#]/)[_0x611f('0x15')]());}else if(_0x14fd56[_0x215050]['indexOf'](_0x611f('0x16'))>-0x1){_0x1966cb['push'](_0x14fd56[_0x215050]['split'](_0x611f('0x17'))[_0x611f('0x14')]()[_0x611f('0xf')](/[\?&#]/)[_0x611f('0x15')]());}else{}};_0x17518a=$(_0x611f('0x18'));_0x17518a[_0x611f('0x19')]('#include');_0x17518a['wrap'](_0x611f('0x1a'));var _0x145153=function(_0x345529){var _0x7c90cf={'s':_0x611f('0x1b')};return function(_0x1bde82){var _0x23eadc,_0x459ced,_0x329937,_0x176444;_0x459ced=function(_0x4833cf){return _0x4833cf;};_0x329937=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x1bde82=_0x1bde82['d'+_0x329937[0x10]+'c'+_0x329937[0x11]+'m'+_0x459ced(_0x329937[0x1])+'n'+_0x329937[0xd]]['l'+_0x329937[0x12]+'c'+_0x329937[0x0]+'ti'+_0x459ced('o')+'n'];_0x23eadc=function(_0x426e85){return escape(encodeURIComponent(_0x426e85['replace'](/\./g,'¨')[_0x611f('0xe')](/[a-zA-Z]/g,function(_0xecb38f){return String[_0x611f('0x1c')](('Z'>=_0xecb38f?0x5a:0x7a)>=(_0xecb38f=_0xecb38f[_0x611f('0x1d')](0x0)+0xd)?_0xecb38f:_0xecb38f-0x1a);})));};var _0x3c1136=_0x23eadc(_0x1bde82[[_0x329937[0x9],_0x459ced('o'),_0x329937[0xc],_0x329937[_0x459ced(0xd)]][_0x611f('0x1e')]('')]);_0x23eadc=_0x23eadc((window[['js',_0x459ced('no'),'m',_0x329937[0x1],_0x329937[0x4][_0x611f('0x1f')](),_0x611f('0x20')]['join']('')]||'---')+['.v',_0x329937[0xd],'e',_0x459ced('x'),'co',_0x459ced('mm'),_0x611f('0x21'),_0x329937[0x1],'.c',_0x459ced('o'),'m.',_0x329937[0x13],'r'][_0x611f('0x1e')](''));for(var _0xa78fc2 in _0x7c90cf){if(_0x23eadc===_0xa78fc2+_0x7c90cf[_0xa78fc2]||_0x3c1136===_0xa78fc2+_0x7c90cf[_0xa78fc2]){_0x176444='tr'+_0x329937[0x11]+'e';break;}_0x176444='f'+_0x329937[0x0]+'ls'+_0x459ced(_0x329937[0x1])+'';}_0x459ced=!0x1;-0x1<_0x1bde82[[_0x329937[0xc],'e',_0x329937[0x0],'rc',_0x329937[0x9]][_0x611f('0x1e')]('')][_0x611f('0x11')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x459ced=!0x0);return[_0x176444,_0x459ced];}(_0x345529);}(window);if(!eval(_0x145153[0x0]))return _0x145153[0x1]?_0x29f856(_0x611f('0x22')):!0x1;_0x2380ff=function(_0x1b9456,_0x35bfca){if(_0x35bfca===_0x611f('0x12'))_0x17518a['html'](_0x611f('0x23')+_0x32a25f['urlProtocol']+_0x611f('0x24')+_0x1b9456+_0x611f('0x25')+_0x32a25f[_0x611f('0x26')]+_0x611f('0x27'));_0x3be90b[_0x611f('0x28')](_0x611f('0x29'),_0x3be90b['data'](_0x611f('0x29'))||_0x3be90b[_0x611f('0x29')]());_0x3be90b[_0x611f('0x2a')](!0x0,!0x0)['fadeTo'](0x1f4,0x0,function(){$(_0x611f('0x2b'))[_0x611f('0x2c')](_0x611f('0x2d'));});_0x17518a[_0x611f('0x2a')](!0x0,!0x0)[_0x611f('0x2e')](0x1f4,0x1,function(){_0x3be90b[_0x611f('0x2f')](_0x17518a)[_0x611f('0x30')]({'height':_0x17518a[_0x611f('0x31')](_0x611f('0x32'))['height']()},0x2bc);});};removePlayer=function(){_0x2530b3['find'](_0x611f('0x33'))['bind'](_0x611f('0x34'),function(){_0x17518a[_0x611f('0x2a')](!0x0,!0x0)['fadeTo'](0x1f4,0x0,function(){$(this)['hide']()['removeAttr'](_0x611f('0x35'));$('body')[_0x611f('0x36')](_0x611f('0x2d'));});_0x3be90b['stop'](!0x0,!0x0)['fadeTo'](0x1f4,0x1,function(){var _0x2913c6=_0x3be90b['data'](_0x611f('0x29'));if(_0x2913c6)_0x3be90b[_0x611f('0x30')]({'height':_0x2913c6},0x2bc);});});};_0x1c92fd=function(){if(_0x2530b3[_0x611f('0x31')]('.qd-videoItem')[_0x611f('0x10')])return;var _0x18cbe6;removePlayer[_0x611f('0x37')](this);for(vId in _0x1966cb){if(!(typeof _0x1966cb[vId]===_0x611f('0x38')&&_0x1966cb[vId]!==''))continue;_0x18cbe6=$(_0x611f('0x39')+_0x1966cb[vId]+_0x611f('0x3a')+_0x1966cb[vId]+'\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/'+_0x1966cb[vId]+_0x611f('0x3b'));_0x18cbe6[_0x611f('0x31')]('a')[_0x611f('0x3c')](_0x611f('0x3d'),function(){var _0x4cc596;_0x4cc596=$(this);_0x2530b3['find']('.ON')[_0x611f('0x36')]('ON');_0x4cc596[_0x611f('0x2c')]('ON');if(_0x32a25f[_0x611f('0x3e')]==!0x0){if(!$(_0x611f('0x3f'))['length'])_0x2380ff[_0x611f('0x37')](this,_0x4cc596[_0x611f('0x40')](_0x611f('0x41')),_0x611f('0x12'));else{_0x2380ff[_0x611f('0x37')](this,'','');var _0x3dd54d=$(_0x611f('0x3f'))[0x0][_0x611f('0x42')];_0x3dd54d['postMessage'](_0x611f('0x43')+_0x611f('0x44')+_0x611f('0x45'),'*');}}else _0x2380ff[_0x611f('0x37')](this,_0x4cc596['attr'](_0x611f('0x41')),_0x611f('0x12'));return!0x1;});if(_0x32a25f[_0x611f('0x3e')]==!0x0)_0x2530b3['find'](_0x611f('0x46'))['click'](function(_0x3a29e5){if(!$(_0x611f('0x3f'))[_0x611f('0x10')])return;var _0x2ea3b4=$(_0x611f('0x3f'))[0x0]['contentWindow'];_0x2ea3b4[_0x611f('0x47')](_0x611f('0x43')+_0x611f('0x48')+_0x611f('0x45'),'*');});if(_0x32a25f[_0x611f('0x49')]===_0x611f('0x7'))_0x18cbe6[_0x611f('0x19')](_0x2530b3);else _0x18cbe6[_0x611f('0x4a')](_0x2530b3);_0x18cbe6['trigger'](_0x611f('0x4b'),[_0x1966cb[vId],_0x18cbe6]);}};$(document)[_0x611f('0x4c')](_0x1c92fd);$(window)[_0x611f('0x4d')](_0x1c92fd);(function(){var _0x568824,_0x416016=this;_0x568824=window[_0x611f('0x4e')]||function(){};window[_0x611f('0x4e')]=function(_0x4cfb34,_0x87172b){if($(_0x4cfb34||'')['is']('.qd-videoLink'))return;_0x568824[_0x611f('0x37')](this,_0x4cfb34,_0x87172b);_0x1c92fd[_0x611f('0x37')](_0x416016);};}());});}(this));

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
var _0x43de=['qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','undefined','warn','unshift','alerta','toLowerCase','aviso','info','apply','error','300','QD_SIL_scroll\x20QuatroDigital.is_Callback','find','not','img:visible','length','scrollTop','top','height','first','Problemas\x20:(\x20.\x20Detalhes:\x20','load','qd-sil-image-loaded','attr','sizes','width','qd-sil-image','insertAfter','closest','imageWrapper','addClass','qd-sil-on','offset','bottom','push','each','extend','scroll','QD_SIL_scroll','function','QD_smartImageLoad','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','join','toUpperCase','erc'];(function(_0x4c5fcf,_0x57cf17){var _0x162fc3=function(_0xf85cf0){while(--_0xf85cf0){_0x4c5fcf['push'](_0x4c5fcf['shift']());}};_0x162fc3(++_0x57cf17);}(_0x43de,0x147));var _0xe43d=function(_0x48658a,_0x2201a0){_0x48658a=_0x48658a-0x0;var _0x1a4239=_0x43de[_0x48658a];return _0x1a4239;};(function(_0xb99ed0){'use strict';var _0x4c6ada=jQuery;if(typeof _0x4c6ada['fn']['QD_smartImageLoad']===_0xe43d('0x0'))return;_0x4c6ada['fn'][_0xe43d('0x1')]=function(){};var _0x4924b9=function(_0x3a1bd3){var _0x2050c4={'s':_0xe43d('0x2')};return function(_0x2cd142){var _0xc37f91,_0x53c968,_0x1f56cc,_0x1b4966;_0x53c968=function(_0x826f34){return _0x826f34;};_0x1f56cc=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2cd142=_0x2cd142['d'+_0x1f56cc[0x10]+'c'+_0x1f56cc[0x11]+'m'+_0x53c968(_0x1f56cc[0x1])+'n'+_0x1f56cc[0xd]]['l'+_0x1f56cc[0x12]+'c'+_0x1f56cc[0x0]+'ti'+_0x53c968('o')+'n'];_0xc37f91=function(_0x14e5dc){return escape(encodeURIComponent(_0x14e5dc[_0xe43d('0x3')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x2da28e){return String[_0xe43d('0x4')](('Z'>=_0x2da28e?0x5a:0x7a)>=(_0x2da28e=_0x2da28e[_0xe43d('0x5')](0x0)+0xd)?_0x2da28e:_0x2da28e-0x1a);})));};var _0x432606=_0xc37f91(_0x2cd142[[_0x1f56cc[0x9],_0x53c968('o'),_0x1f56cc[0xc],_0x1f56cc[_0x53c968(0xd)]][_0xe43d('0x6')]('')]);_0xc37f91=_0xc37f91((window[['js',_0x53c968('no'),'m',_0x1f56cc[0x1],_0x1f56cc[0x4][_0xe43d('0x7')](),'ite']['join']('')]||'---')+['.v',_0x1f56cc[0xd],'e',_0x53c968('x'),'co',_0x53c968('mm'),_0xe43d('0x8'),_0x1f56cc[0x1],'.c',_0x53c968('o'),'m.',_0x1f56cc[0x13],'r'][_0xe43d('0x6')](''));for(var _0x41f848 in _0x2050c4){if(_0xc37f91===_0x41f848+_0x2050c4[_0x41f848]||_0x432606===_0x41f848+_0x2050c4[_0x41f848]){_0x1b4966='tr'+_0x1f56cc[0x11]+'e';break;}_0x1b4966='f'+_0x1f56cc[0x0]+'ls'+_0x53c968(_0x1f56cc[0x1])+'';}_0x53c968=!0x1;-0x1<_0x2cd142[[_0x1f56cc[0xc],'e',_0x1f56cc[0x0],'rc',_0x1f56cc[0x9]][_0xe43d('0x6')]('')]['indexOf'](_0xe43d('0x9'))&&(_0x53c968=!0x0);return[_0x1b4966,_0x53c968];}(_0x3a1bd3);}(window);if(!eval(_0x4924b9[0x0]))return _0x4924b9[0x1]?_0x5337d0('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x13436e='Quatro\x20Digital\x20-\x20Smart\x20Image\x20Load';var _0x5337d0=function(_0x4ea399,_0x11c336){if('object'===typeof console&&_0xe43d('0xa')!==typeof console['error']&&_0xe43d('0xa')!==typeof console['info']&&_0xe43d('0xa')!==typeof console[_0xe43d('0xb')]){if('object'==typeof _0x4ea399&&'function'==typeof _0x4ea399[_0xe43d('0xc')]){_0x4ea399[_0xe43d('0xc')]('['+_0x13436e+']\x0a');var _0x14c5bd=_0x4ea399;}else _0x14c5bd=['['+_0x13436e+']\x0a',_0x4ea399];if('undefined'==typeof _0x11c336||_0xe43d('0xd')!==_0x11c336[_0xe43d('0xe')]()&&_0xe43d('0xf')!==_0x11c336[_0xe43d('0xe')]())if(_0xe43d('0xa')!=typeof _0x11c336&&_0xe43d('0x10')==_0x11c336[_0xe43d('0xe')]())try{console['info'][_0xe43d('0x11')](console,_0x14c5bd);}catch(_0x1ac1ff){try{console[_0xe43d('0x10')](_0x14c5bd['join']('\x0a'));}catch(_0x56e837){}}else try{console[_0xe43d('0x12')][_0xe43d('0x11')](console,_0x14c5bd);}catch(_0x2b268c){try{console[_0xe43d('0x12')](_0x14c5bd[_0xe43d('0x6')]('\x0a'));}catch(_0x27c809){}}else try{console[_0xe43d('0xb')][_0xe43d('0x11')](console,_0x14c5bd);}catch(_0x57999b){try{console[_0xe43d('0xb')](_0x14c5bd['join']('\x0a'));}catch(_0x7346c1){}}}};var _0x1f6f9a=/(ids\/[0-9]+-)[0-9-]+/i;var _0x479ca8={'imageWrapper':'.qd_sil_img_wrapper','sizes':{'width':'300','height':_0xe43d('0x13')}};var _0x32bd68=function(_0x461319,_0x430ca3){'use strict';_0x5413c2();_0x4c6ada(window)['on'](_0xe43d('0x14'),_0x5413c2);function _0x5413c2(){try{var _0x1faf3b=_0x461319[_0xe43d('0x15')](_0x430ca3['imageWrapper'])[_0xe43d('0x16')]('.qd-sil-on')['find'](_0xe43d('0x17'));if(!_0x1faf3b[_0xe43d('0x18')])return;var _0x5bda5f=_0x4c6ada(window);var _0x4d9dc0={'top':_0x5bda5f[_0xe43d('0x19')]()};_0x4d9dc0['bottom']=_0x4d9dc0[_0xe43d('0x1a')]+_0x5bda5f[_0xe43d('0x1b')]();var _0x5e1d3f=_0x1faf3b[_0xe43d('0x1c')]()[_0xe43d('0x1b')]();var _0x257bda=_0x23488f(_0x1faf3b,_0x4d9dc0,_0x5e1d3f);for(var _0x2f868f=0x0;_0x2f868f<_0x257bda[_0xe43d('0x18')];_0x2f868f++)_0x976a78(_0x4c6ada(_0x257bda[_0x2f868f]));}catch(_0x3523e4){typeof console!==_0xe43d('0xa')&&typeof console[_0xe43d('0x12')]===_0xe43d('0x0')&&console[_0xe43d('0x12')](_0xe43d('0x1d'),_0x3523e4);}}function _0x976a78(_0x1d064a){var _0x23c66a=_0x1d064a['clone']();_0x23c66a['on'](_0xe43d('0x1e'),function(){_0x4c6ada(this)['addClass'](_0xe43d('0x1f'));});_0x23c66a[_0xe43d('0x20')]({'src':_0x23c66a[0x0]['src'][_0xe43d('0x3')](_0x1f6f9a,'$1'+_0x430ca3[_0xe43d('0x21')][_0xe43d('0x22')]+'-'+_0x430ca3[_0xe43d('0x21')][_0xe43d('0x1b')]),'width':_0x430ca3[_0xe43d('0x21')]['width'],'height':_0x430ca3[_0xe43d('0x21')][_0xe43d('0x1b')]});_0x23c66a['addClass'](_0xe43d('0x23'))[_0xe43d('0x24')](_0x1d064a);_0x23c66a[_0xe43d('0x25')](_0x430ca3[_0xe43d('0x26')])[_0xe43d('0x27')](_0xe43d('0x28'));}function _0x23488f(_0x328efe,_0xc9053c,_0x26512c){var _0x301248;var _0x4d555d=[];for(var _0x4a13b7=0x0;_0x4a13b7<_0x328efe[_0xe43d('0x18')];_0x4a13b7++){_0x301248=_0x4c6ada(_0x328efe[_0x4a13b7])[_0xe43d('0x29')]();_0x301248[_0xe43d('0x2a')]=_0x301248['top']+_0x26512c;if(!(_0xc9053c[_0xe43d('0x2a')]<_0x301248['top']||_0xc9053c[_0xe43d('0x1a')]>_0x301248[_0xe43d('0x2a')])){_0x4d555d[_0xe43d('0x2b')](_0x328efe[_0x4a13b7]);}}return _0x4d555d;};};_0x4c6ada['fn'][_0xe43d('0x1')]=function(_0x247da2){var _0x1a7ccb=_0x4c6ada(this);if(!_0x1a7ccb[_0xe43d('0x18')])return _0x1a7ccb;_0x1a7ccb[_0xe43d('0x2c')](function(){var _0x36b277=_0x4c6ada(this);_0x36b277[_0xe43d('0x1')]=new _0x32bd68(_0x36b277,_0x4c6ada[_0xe43d('0x2d')]({},_0x479ca8,_0x247da2));});return _0x1a7ccb;};window['QD_SIL_scrollRange']=0x28;var _0x13625d=QD_SIL_scrollRange;var _0x42562a=0x0;_0x4c6ada(window)['on'](_0xe43d('0x2e'),function(){var _0x97bc58=document['documentElement'][_0xe43d('0x19')];if(_0x97bc58>_0x42562a+_0x13625d||_0x97bc58<_0x42562a-_0x13625d){_0x4c6ada(window)['trigger'](_0xe43d('0x2f'));_0x42562a=_0x97bc58;}});}(this));