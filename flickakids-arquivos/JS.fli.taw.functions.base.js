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
			Common.openAccountMobile();				
			Common.applyMosaicCategorieBanners();				
			Common.applyImageLoad();	
			// $(window).on('QuatroDigital.is_Callback', Common.applyImageLoad);			
		},
		ajaxStop: function() {},
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
				callback: function () {
					$('ul.qd-am-dropdown-menu').each(function () {
						$(this).wrapInner('<li class="container"><ul></ul></li>');
					});
				}
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
					return { slidesToShow: 2 };
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
			$('.search-qd-v1-result, .carousel-qd-v1-shelf').QD_smartImageLoad({
				sizes: {
					width: '230',
					height: '230'
				}
			});
		}
	};

	var Home = {
		init: function() {
			Home.applySliderFull();
			Home.applyBrandCarousel();
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
			Search.applySlickBannerSlider();
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
		},
		applySlickBannerSlider: function () {
			var wrapper = $('.slider-qd-v1-full, .slider-qd-v1-full-hotsite');

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

			var mobileDotsWrapper = $('.slider-qd-v1-full-mobile .slick-dots, .slider-qd-v1-full-hotsite-mobile .slick-dots ');
			mobileDotsWrapper.on('init', function (event, slick) {
				$(this).find('.slick-current').addClass('slick-active');
			});

			mobileDotsWrapper.slick({
				asNavFor: '.slider-qd-v1-full-mobile, .slider-qd-v1-full-hotsite-mobile',
				arrows: false,
				centerMode: true,
				infinite: false,
				focusOnSelect: true,
				variableWidth: true,
				centerPadding: '24%'
			});

			// On after slide change
			var mobileWrapper = $('.slider-qd-v1-full.slider-qd-v1-full-mobile, .slider-qd-v1-full-hotsite.slider-qd-v1-full-hotsite-mobile');
			mobileWrapper.on('afterChange', function (event, slick, currentSlide, nextSlide) {
				mobileDotsWrapper.slick('slickGoTo', currentSlide);
				mobileDotsWrapper.find('.slick-current').addClass('slick-active');
			});

			wrapper.each(function () {
				$(this).find('.slick-arrow').wrapAll('<div class="slick-nav" />');
			});
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
				window.qdVideoInProduct = {videoFieldSelector: 'td.value-field.Video:first'};
				return;
			}

			window.qdVideoInProduct = {videoFieldSelector: $('<span/>').addClass('video-product').text('https://www.youtube.com/watch?v=' + iframe.attr("src").split("?").shift().split("/").pop() + '&rel=0')};
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
					showSuccessModal();
					return;
				}

				var modal = $('.qd-v1-modal').first().clone();
				modal.addClass('qd-modal-customize');

				modal.find('.modal-header').append($('<h5></h5>').text($('.product-qd-v1-sku-selection-box .product-qd-v1-name').text()));
				modal.find('.modal-header .close').addClass('qd-customize-close').text('Não quero personalizar o produto');

				var modalBody = '<div class="row"><div class="col-xs-12 col-sm-5 qd-customize-image"></div><div class="col-xs-12 col-sm-7 qd-customize-items"></div></div>';
				modal.find('.modal-body').append($.parseHTML(modalBody));
				var urlImg = $('.product-qd-v1-image-wrapper #image-main')[0].src.replace($('.product-qd-v1-image-wrapper #image-main')[0].src.match(/\d+-(\d+-\d+)/)[1], '350-350');
				modal.find('.qd-customize-image').append([$('.product-qd-v1-image-wrapper #image-main').clone().attr('src', urlImg), $('<div class="qd-customize-area">')]);

				var modalItems = '<fieldset class="qd-customize-fieldset-text"><label>Digite o nome</label><div class="input-group"><input type="text" class="form-control" placeholder="Escreva aqui o nome do bebê" maxlength="18"><span class="input-group-btn"><button type="button">Ok</button></span></div></fieldset>';
				modalItems += '<fieldset><label>Escolha a ilustração</label><div class="input-group"><select><option value="">Sem ilustração</option><option value="sol">Sol</option></select></div></fieldset>';
				var options = '<label style="font-family:cursive;" class="radio-inline"><input type="radio" value="cursive">Arya</label><label style="font-family:fantasy;" class="radio-inline"><input type="radio" value="fantasy">Jon</label>'
				options += '<label style="font-family:PT Sans;" class="radio-inline"><input type="radio" value="PT Sans">Sansa</label><label style="font-family:Times New Roman;" class="radio-inline"><input type="radio" value="Times New Roman">Jon</label>'
				options += '<label style="font-family:Arial;" class="radio-inline"><input type="radio" value="Arial">Brandon</label><label style="font-family:fantasy;" class="radio-inline"><input type="radio" value="fantasy">Rickson</label>'
				options += '<label style="font-family:Arial Black;" class="radio-inline"><input type="radio" value="Arial Black">Catelyn</label><label style="font-family:webdings;" class="radio-inline"><input type="radio" value="webdings">Jason</label>'
				modalItems += '<fieldset><label>Escolha a fonte</label><div class="input-group-radio">' + options + '</div></fieldset>';
				modalItems += '<fieldset><label class="checkbox"><input type="checkbox" value="autorizado"> Autorizo a Flicka Kids a retirar o produto da embalagem, para realizar a personalização por mim escolhida.</label></fieldset>';
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
					updateCustomize(input.val());

					if (input.val())
						input.closest('.input-group').addClass('filled');
					else
						input.closest('.input-group').removeClass('filled');

				});

				function updateCustomize(text, imageUrl, font) {
					if (!$('.qd-customize-area #qd_customize_nome').length)
						$('.qd-customize-area').append($('<div id="qd_customize_nome">'));

					wrapperCustomize = $('.qd-customize-area #qd_customize_nome');



					var wrapperText = wrapperCustomize.find('span').length ? wrapperCustomize.find('span') : $('<span></span>').appendTo(wrapperCustomize);
					if (text)
						wrapperText.text(text);
					if (font)
						wrapperText.css('font-family', font);

					if (imageUrl) {
						var wrapperImg = wrapperCustomize.find('img').length ? wrapperCustomize.find('img') : $('<img>').appendTo(wrapperCustomize);
						wrapperImg.attr('src', imageUrl);
					}

				}


				function showSuccessModal() {
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

/* Quatro Digital Newsletter // 5.1 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os Direitos Reservados */
(function(){var f=jQuery;if("function"!==typeof f.fn.QD_news){var t={defaultName:"Digite seu nome...",defaultEmail:"Digite seu e-mail...",nameField:".qd_news_name",checkNameFieldIsVisible:!0,emailField:".qd_news_email",btn:".qd_news_button",elementError:".nv2_messageError",elementSuccess:".nv2_messageSuccess",validationMethod:"popup",getAttr:"alt",setDefaultName:!0,checkNameExist:!0,validateName:!0,showInPopup:!0,animation:"blink",animateSpeed:100,animateDistance:15,animateRepeat:3,animateFieldSuccess:".qd_news_animate_field_success",
timeHideSuccessMsg:3E3,platform:"VTEX",allowSubmit:function(){return!0},successCallback:function(){},submitCallback:function(f,l){}};f.fn.QD_news=function(r){var l=function(a,d){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var g;"object"===typeof a?(a.unshift("[QD News]\n"),g=a):g=["[QD News]\n"+a];if("undefined"===typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===
d.toLowerCase())try{console.info.apply(console,g)}catch(b){console.info(g.join("\n"))}else try{console.error.apply(console,g)}catch(b){console.error(g.join("\n"))}else try{console.warn.apply(console,g)}catch(b){console.warn(g.join("\n"))}}},h=f(this);if(!h.length)return h;var a=f.extend({},t,r);a.showInPopup||(a.validationMethod="div");null!==a.animation?a.validationMethod="animateField":"animateField"==a.validationMethod&&(a.animation="leftRight");if("popup"==a.validationMethod&&"function"!==typeof f.fn.vtexPopUp2)return l("O popUp2 n\u00e3o foi encontrado. Adicione o Plugin de PopUp2."),
h;var q=function(f){var d,g,b;g=0;d=function(){f.animate({left:"-="+a.animateDistance},a.animateSpeed,function(){f.animate({left:"+="+a.animateDistance},a.animateSpeed,function(){g<a.animateRepeat&&d();g++})})};b=function(){f.fadeTo(a.animateSpeed,.2,function(){f.fadeTo(a.animateSpeed,1,function(){g<a.animateRepeat&&b();g++})})};f.stop(!0,!0);"leftRight"==a.animation?d():"blink"==a.animation&&b()};h.each(function(){var h,d,g,b=f(this),k=b.find(a.nameField),e=b.find(a.emailField),m=b.find(a.btn);"animateField"!=
a.validationMethod&&(d=b.find(a.elementError),g=b.find(a.elementSuccess));1>k.length&&a.checkNameExist&&l("Campo de nome, n\u00e3o encontrado ("+k.selector+"). Ser\u00e1 atribuido um valor padr\u00e3o.","info");if(1>e.length)return l("Campo de e-mail, n\u00e3o encontrado ("+e.selector+")"),b;if(1>m.length)return l("Bot\u00e3o de envio, n\u00e3o encontrado ("+m.selector+")"),b;if("animateField"!=a.validationMethod&&(1>g.length||1>d.length))return l("A(s) mensagem(ns) de erro e/ou sucesso esta(m) faltando \n ("+
g.selector+", "+d.selector+")"),b;a.setDefaultName&&k.is("input[type=text], textarea")&&k.val(a.defaultName);e.val(a.defaultEmail);(function(){if(a.checkNameExist){if(a.checkNameFieldIsVisible){var c=k.filter(":visible");if(!c.length)return}else c=k;var b=c.val();c.is("input:text, textarea")&&c.bind({focus:function(){c.val()!=b||0!==c.val().search(a.defaultName.substr(0,6))&&!a.setDefaultName||c.val("")},blur:function(){""===c.val()&&c.val(b)}})}})();(function(){var b;b=e.val();e.bind({focus:function(){e.val()==
b&&0===e.val().search(a.defaultEmail.substr(0,6))&&e.val("")},blur:function(){""===e.val()&&e.val(b)}})})();h=function(){var c,e,h,k;e=(c=b.find(a.nameField).filter("input[type=text],select,textarea").val())?c:b.find(a.nameField).filter("input[type=radio], input[type=checkbox]").length?b.find(a.nameField).filter("input[type=radio]:checked, input[type=checkbox]:checked").val()||"":(c=b.find(a.nameField).attr(a.getAttr))?c:(c=b.find(a.nameField).text())?c:(c=b.find(a.nameField).find(".box-banner img:first").attr("alt"))?
c:"Nome_Padrao";c=(b.find(a.emailField).val()||"").trim();h=b.find(a.nameField).is(":visible");h=a.validateName?(1>e.length||0===e.search(a.defaultName.substr(0,6)))&&(a.checkNameExist||h?h:!0):!1;k=0>c.search(/^[a-z0-9\_\-\.\+]+@[a-z0-9\_\-]+(\.[a-z0-9\_\-]{2,})+$/i);if(h||k)"animateField"==a.validationMethod?(h&&q(b.find(a.nameField)),k&&q(b.find(a.emailField))):"popup"==a.validationMethod?d.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterError"}):(d.slideDown().bind("click",function(){f(this).slideUp()}),
setTimeout(function(){d.slideUp()},1800));else if(a.allowSubmit()){m.attr("disabled","disabled");var n={postData:{newsletterClientEmail:c,newsletterClientName:a.defaultName==e?"-":e,newsInternalCampaign:"newsletter:opt-in",newsInternalPage:(document.location.pathname||"/").replace(/\//g,"_"),newsInternalPart:"newsletter"},button:m,wrapper:b};"linx"===a.platform&&(n.postData.nome=n.postData.newsletterClientName,n.postData.email=n.postData.newsletterClientEmail);f.ajax({url:"linx"===a.platform?"/newsletter.aspx":
"/no-cache/Newsletter.aspx",type:"linx"===a.platform?"GET":"POST",data:n.postData,success:function(c){var e,h,d;m.removeAttr("disabled");if("linx"===a.platform&&!(-1<c.indexOf(" com sucesso.")||-1<c.indexOf(" cadastrado.")))return alert(c);"popup"==a.validationMethod?g.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterSuccess"}):"animateField"!=a.validationMethod&&g.slideDown().bind("click",function(){f(this).slideUp()});d=b.find(a.emailField);a.setDefaultName&&b.find(a.nameField).is("input:text, textarea")&&
b.find(a.nameField).val(a.defaultName);e=function(){d.val(a.defaultEmail)};"animateField"==a.validationMethod?(d.val(b.find(a.animateFieldSuccess).val()||"Obrigado!!!"),d.addClass("vtexNewsSuccess"),h=setTimeout(function(){d.removeClass("vtexNewsSuccess");e();d.unbind("focus.vtexNews")},a.timeHideSuccessMsg),d.bind("focus.vtexNews",function(){d.removeClass("vtexNewsSuccess");clearTimeout(h);f(this).val("");f(this).unbind("focus.vtexNews")})):e();a.successCallback(n);f(b).trigger("qdNewsSuccessCallback",
n)}});a.submitCallback(c,e)}else l("Os dados n\u00e3o foram enviados pois o parametro 'allowSubmit' n\u00e3o retornou 'true'","info")};var p=function(a){13==(a.keyCode?a.keyCode:a.which)&&(a.preventDefault(),h())};k.filter("input:text, textarea").bind("keydown",p);e.bind("keydown",p);p=m.getParent("form");p.length?p.submit(function(a){a.preventDefault();h()}):m.bind("click.qd_news",function(){h()})});return h};f(function(){f(".qd_news_auto").QD_news()})}})();

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
var _0x858e=['ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','qdPlugin','initialSkuSelected','prod','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','unavailable','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','available','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','function','qdAjax','qdAjaxQueue','url','opts','push','call','error','complete','parameters','callbackFns','successPopulated','boolean','errorPopulated','completePopulated','extend','success','object','jqXHR','clearQueueDelay','undefined','ajax','readyState','data','textStatus','errorThrown','version','2.1','/produto/sku/','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','QD_smartStockAvailable','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','alerta','toLowerCase','aviso','info','apply','warn','removeClass','qd-ssa-sku-no-selected','addClass','qd-ssa-sku-selected','SkuSellersInformation','AvailableQuantity','data-qd-ssa-qtt','each','[data-qd-ssa-text]','qd-ssa-hide','filter','[data-qd-ssa-text=\x22','length','hide','qd-ssa-show','html','show','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','message','qd-ssa-on','skus','split','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','trigger','QuatroDigital.ssa.prodUnavailable','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','off','vtex.sku.selected.QD','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','charCodeAt','join','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82'];(function(_0x31d6dc,_0x350037){var _0xbce750=function(_0x5227f4){while(--_0x5227f4){_0x31d6dc['push'](_0x31d6dc['shift']());}};_0xbce750(++_0x350037);}(_0x858e,0x167));var _0xe858=function(_0x3cc8dd,_0x2c87bf){_0x3cc8dd=_0x3cc8dd-0x0;var _0x1e1734=_0x858e[_0x3cc8dd];return _0x1e1734;};(function(_0x4ef357){if(_0xe858('0x0')!==typeof _0x4ef357[_0xe858('0x1')]){var _0x2ac78a={};_0x4ef357[_0xe858('0x2')]=_0x2ac78a;_0x4ef357[_0xe858('0x1')]=function(_0x2adcf4){var _0x18e774=_0x4ef357['extend']({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x2adcf4);var _0x25fe84=escape(encodeURIComponent(_0x18e774[_0xe858('0x3')]));_0x2ac78a[_0x25fe84]=_0x2ac78a[_0x25fe84]||{};_0x2ac78a[_0x25fe84][_0xe858('0x4')]=_0x2ac78a[_0x25fe84]['opts']||[];_0x2ac78a[_0x25fe84]['opts'][_0xe858('0x5')]({'success':function(_0x2f32a7,_0x3fd3e9,_0x1c68e2){_0x18e774['success'][_0xe858('0x6')](this,_0x2f32a7,_0x3fd3e9,_0x1c68e2);},'error':function(_0xbf32bc,_0x1d4bdd,_0x23b500){_0x18e774[_0xe858('0x7')][_0xe858('0x6')](this,_0xbf32bc,_0x1d4bdd,_0x23b500);},'complete':function(_0x2c7c1e,_0x52f494){_0x18e774[_0xe858('0x8')][_0xe858('0x6')](this,_0x2c7c1e,_0x52f494);}});_0x2ac78a[_0x25fe84][_0xe858('0x9')]=_0x2ac78a[_0x25fe84][_0xe858('0x9')]||{'success':{},'error':{},'complete':{}};_0x2ac78a[_0x25fe84]['callbackFns']=_0x2ac78a[_0x25fe84]['callbackFns']||{};_0x2ac78a[_0x25fe84][_0xe858('0xa')][_0xe858('0xb')]=_0xe858('0xc')===typeof _0x2ac78a[_0x25fe84]['callbackFns'][_0xe858('0xb')]?_0x2ac78a[_0x25fe84]['callbackFns'][_0xe858('0xb')]:!0x1;_0x2ac78a[_0x25fe84][_0xe858('0xa')][_0xe858('0xd')]='boolean'===typeof _0x2ac78a[_0x25fe84]['callbackFns'][_0xe858('0xd')]?_0x2ac78a[_0x25fe84][_0xe858('0xa')][_0xe858('0xd')]:!0x1;_0x2ac78a[_0x25fe84]['callbackFns'][_0xe858('0xe')]='boolean'===typeof _0x2ac78a[_0x25fe84]['callbackFns'][_0xe858('0xe')]?_0x2ac78a[_0x25fe84][_0xe858('0xa')][_0xe858('0xe')]:!0x1;_0x2adcf4=_0x4ef357[_0xe858('0xf')]({},_0x18e774,{'success':function(_0x17160b,_0x1a069a,_0x4310a6){_0x2ac78a[_0x25fe84]['parameters'][_0xe858('0x10')]={'data':_0x17160b,'textStatus':_0x1a069a,'jqXHR':_0x4310a6};_0x2ac78a[_0x25fe84][_0xe858('0xa')][_0xe858('0xb')]=!0x0;for(var _0x4b687a in _0x2ac78a[_0x25fe84][_0xe858('0x4')])_0xe858('0x11')===typeof _0x2ac78a[_0x25fe84][_0xe858('0x4')][_0x4b687a]&&(_0x2ac78a[_0x25fe84]['opts'][_0x4b687a][_0xe858('0x10')][_0xe858('0x6')](this,_0x17160b,_0x1a069a,_0x4310a6),_0x2ac78a[_0x25fe84]['opts'][_0x4b687a][_0xe858('0x10')]=function(){});},'error':function(_0x43f8bc,_0x2e0855,_0x6ccad5){_0x2ac78a[_0x25fe84][_0xe858('0x9')]['error']={'errorThrown':_0x6ccad5,'textStatus':_0x2e0855,'jqXHR':_0x43f8bc};_0x2ac78a[_0x25fe84][_0xe858('0xa')][_0xe858('0xd')]=!0x0;for(var _0x512df5 in _0x2ac78a[_0x25fe84][_0xe858('0x4')])_0xe858('0x11')===typeof _0x2ac78a[_0x25fe84][_0xe858('0x4')][_0x512df5]&&(_0x2ac78a[_0x25fe84][_0xe858('0x4')][_0x512df5][_0xe858('0x7')][_0xe858('0x6')](this,_0x43f8bc,_0x2e0855,_0x6ccad5),_0x2ac78a[_0x25fe84][_0xe858('0x4')][_0x512df5][_0xe858('0x7')]=function(){});},'complete':function(_0x2c8ff2,_0x1a6009){_0x2ac78a[_0x25fe84][_0xe858('0x9')]['complete']={'textStatus':_0x1a6009,'jqXHR':_0x2c8ff2};_0x2ac78a[_0x25fe84][_0xe858('0xa')][_0xe858('0xe')]=!0x0;for(var _0x242709 in _0x2ac78a[_0x25fe84][_0xe858('0x4')])'object'===typeof _0x2ac78a[_0x25fe84][_0xe858('0x4')][_0x242709]&&(_0x2ac78a[_0x25fe84][_0xe858('0x4')][_0x242709]['complete'][_0xe858('0x6')](this,_0x2c8ff2,_0x1a6009),_0x2ac78a[_0x25fe84][_0xe858('0x4')][_0x242709][_0xe858('0x8')]=function(){});isNaN(parseInt(_0x18e774['clearQueueDelay']))||setTimeout(function(){_0x2ac78a[_0x25fe84][_0xe858('0x12')]=void 0x0;_0x2ac78a[_0x25fe84]['opts']=void 0x0;_0x2ac78a[_0x25fe84][_0xe858('0x9')]=void 0x0;_0x2ac78a[_0x25fe84]['callbackFns']=void 0x0;},_0x18e774[_0xe858('0x13')]);}});_0xe858('0x14')===typeof _0x2ac78a[_0x25fe84]['jqXHR']?_0x2ac78a[_0x25fe84][_0xe858('0x12')]=_0x4ef357[_0xe858('0x15')](_0x2adcf4):_0x2ac78a[_0x25fe84][_0xe858('0x12')]&&_0x2ac78a[_0x25fe84][_0xe858('0x12')][_0xe858('0x16')]&&0x4==_0x2ac78a[_0x25fe84][_0xe858('0x12')]['readyState']&&(_0x2ac78a[_0x25fe84][_0xe858('0xa')][_0xe858('0xb')]&&_0x2adcf4[_0xe858('0x10')](_0x2ac78a[_0x25fe84][_0xe858('0x9')][_0xe858('0x10')][_0xe858('0x17')],_0x2ac78a[_0x25fe84][_0xe858('0x9')]['success']['textStatus'],_0x2ac78a[_0x25fe84][_0xe858('0x9')][_0xe858('0x10')][_0xe858('0x12')]),_0x2ac78a[_0x25fe84][_0xe858('0xa')][_0xe858('0xd')]&&_0x2adcf4[_0xe858('0x7')](_0x2ac78a[_0x25fe84][_0xe858('0x9')]['error'][_0xe858('0x12')],_0x2ac78a[_0x25fe84][_0xe858('0x9')][_0xe858('0x7')][_0xe858('0x18')],_0x2ac78a[_0x25fe84][_0xe858('0x9')][_0xe858('0x7')][_0xe858('0x19')]),_0x2ac78a[_0x25fe84][_0xe858('0xa')][_0xe858('0xe')]&&_0x2adcf4['complete'](_0x2ac78a[_0x25fe84][_0xe858('0x9')]['complete'][_0xe858('0x12')],_0x2ac78a[_0x25fe84][_0xe858('0x9')][_0xe858('0x8')][_0xe858('0x18')]));};_0x4ef357[_0xe858('0x1')][_0xe858('0x1a')]=_0xe858('0x1b');}}(jQuery));(function(_0x3fe097){function _0x4b4b27(_0x520e53,_0x5977dd){_0x18b8f9[_0xe858('0x1')]({'url':_0xe858('0x1c')+_0x520e53,'clearQueueDelay':null,'success':_0x5977dd,'error':function(){_0x204e4c(_0xe858('0x1d'));}});}var _0x18b8f9=jQuery;if('function'!==typeof _0x18b8f9['fn'][_0xe858('0x1e')]){var _0x204e4c=function(_0x16fca4,_0x48a394){if(_0xe858('0x11')===typeof console){var _0x34ba4a;_0xe858('0x11')===typeof _0x16fca4?(_0x16fca4['unshift'](_0xe858('0x1f')),_0x34ba4a=_0x16fca4):_0x34ba4a=['[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a'+_0x16fca4];_0xe858('0x14')===typeof _0x48a394||_0xe858('0x20')!==_0x48a394[_0xe858('0x21')]()&&_0xe858('0x22')!==_0x48a394['toLowerCase']()?'undefined'!==typeof _0x48a394&&_0xe858('0x23')===_0x48a394['toLowerCase']()?console[_0xe858('0x23')][_0xe858('0x24')](console,_0x34ba4a):console[_0xe858('0x7')][_0xe858('0x24')](console,_0x34ba4a):console[_0xe858('0x25')][_0xe858('0x24')](console,_0x34ba4a);}},_0x1596ab={},_0xf416c3=function(_0x407489,_0x105e3c){function _0x373a57(_0x35d1d4){try{_0x407489[_0xe858('0x26')](_0xe858('0x27'))[_0xe858('0x28')](_0xe858('0x29'));var _0x39ef67=_0x35d1d4[0x0][_0xe858('0x2a')][0x0][_0xe858('0x2b')];_0x407489['attr'](_0xe858('0x2c'),_0x39ef67);_0x407489[_0xe858('0x2d')](function(){var _0x407489=_0x18b8f9(this)['find'](_0xe858('0x2e'));if(0x1>_0x39ef67)return _0x407489['hide']()[_0xe858('0x28')](_0xe858('0x2f'))[_0xe858('0x26')]('qd-ssa-show');var _0x35d1d4=_0x407489[_0xe858('0x30')](_0xe858('0x31')+_0x39ef67+'\x22]');_0x35d1d4=_0x35d1d4[_0xe858('0x32')]?_0x35d1d4:_0x407489[_0xe858('0x30')]('[data-qd-ssa-text=\x22default\x22]');_0x407489[_0xe858('0x33')]()[_0xe858('0x28')]('qd-ssa-hide')[_0xe858('0x26')](_0xe858('0x34'));_0x35d1d4[_0xe858('0x35')]((_0x35d1d4[_0xe858('0x35')]()||'')['replace']('#qtt',_0x39ef67));_0x35d1d4[_0xe858('0x36')]()['addClass'](_0xe858('0x34'))[_0xe858('0x26')](_0xe858('0x2f'));});}catch(_0x15b0df){_0x204e4c([_0xe858('0x37'),_0x15b0df[_0xe858('0x38')]]);}}if(_0x407489['length']){_0x407489['addClass'](_0xe858('0x39'));_0x407489[_0xe858('0x28')]('qd-ssa-sku-no-selected');try{_0x407489[_0xe858('0x28')]('qd-ssa-skus-'+vtxctx[_0xe858('0x3a')][_0xe858('0x3b')](';')[_0xe858('0x32')]);}catch(_0x251bad){_0x204e4c(['Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20',_0x251bad[_0xe858('0x38')]]);}_0x18b8f9(window)['on'](_0xe858('0x3c'),function(_0x3d6d0a,_0x3a0cf4,_0x198537){try{_0x4b4b27(_0x198537[_0xe858('0x3d')],function(_0x56a9a2){_0x373a57(_0x56a9a2);0x1===vtxctx[_0xe858('0x3a')]['split'](';')[_0xe858('0x32')]&&0x0==_0x56a9a2[0x0][_0xe858('0x2a')][0x0][_0xe858('0x2b')]&&_0x18b8f9(window)[_0xe858('0x3e')](_0xe858('0x3f'));});}catch(_0x147a51){_0x204e4c([_0xe858('0x40'),_0x147a51[_0xe858('0x38')]]);}});_0x18b8f9(window)[_0xe858('0x41')](_0xe858('0x42'));_0x18b8f9(window)['on']('QuatroDigital.ssa.prodUnavailable',function(){_0x407489[_0xe858('0x28')]('qd-ssa-sku-prod-unavailable')[_0xe858('0x33')]();});}};_0x3fe097=function(_0x44934c){var _0x46eda2={'s':_0xe858('0x43')};return function(_0x3fe06a){var _0x525844=function(_0x547962){return _0x547962;};var _0x1f7c98=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3fe06a=_0x3fe06a['d'+_0x1f7c98[0x10]+'c'+_0x1f7c98[0x11]+'m'+_0x525844(_0x1f7c98[0x1])+'n'+_0x1f7c98[0xd]]['l'+_0x1f7c98[0x12]+'c'+_0x1f7c98[0x0]+'ti'+_0x525844('o')+'n'];var _0x3f22ef=function(_0x56350d){return escape(encodeURIComponent(_0x56350d[_0xe858('0x44')](/\./g,'¨')[_0xe858('0x44')](/[a-zA-Z]/g,function(_0x55103c){return String['fromCharCode'](('Z'>=_0x55103c?0x5a:0x7a)>=(_0x55103c=_0x55103c[_0xe858('0x45')](0x0)+0xd)?_0x55103c:_0x55103c-0x1a);})));};var _0x10fa5c=_0x3f22ef(_0x3fe06a[[_0x1f7c98[0x9],_0x525844('o'),_0x1f7c98[0xc],_0x1f7c98[_0x525844(0xd)]][_0xe858('0x46')]('')]);_0x3f22ef=_0x3f22ef((window[['js',_0x525844('no'),'m',_0x1f7c98[0x1],_0x1f7c98[0x4]['toUpperCase'](),_0xe858('0x47')][_0xe858('0x46')]('')]||_0xe858('0x48'))+['.v',_0x1f7c98[0xd],'e',_0x525844('x'),'co',_0x525844('mm'),_0xe858('0x49'),_0x1f7c98[0x1],'.c',_0x525844('o'),'m.',_0x1f7c98[0x13],'r'][_0xe858('0x46')](''));for(var _0x124941 in _0x46eda2){if(_0x3f22ef===_0x124941+_0x46eda2[_0x124941]||_0x10fa5c===_0x124941+_0x46eda2[_0x124941]){var _0x37f029='tr'+_0x1f7c98[0x11]+'e';break;}_0x37f029='f'+_0x1f7c98[0x0]+'ls'+_0x525844(_0x1f7c98[0x1])+'';}_0x525844=!0x1;-0x1<_0x3fe06a[[_0x1f7c98[0xc],'e',_0x1f7c98[0x0],'rc',_0x1f7c98[0x9]][_0xe858('0x46')]('')][_0xe858('0x4a')](_0xe858('0x4b'))&&(_0x525844=!0x0);return[_0x37f029,_0x525844];}(_0x44934c);}(window);if(!eval(_0x3fe097[0x0]))return _0x3fe097[0x1]?_0x204e4c(_0xe858('0x4c')):!0x1;_0x18b8f9['fn'][_0xe858('0x1e')]=function(_0x3cf4a0){var _0x1da16d=_0x18b8f9(this);_0x3cf4a0=_0x18b8f9['extend'](!0x0,{},_0x1596ab,_0x3cf4a0);_0x1da16d[_0xe858('0x4d')]=new _0xf416c3(_0x1da16d,_0x3cf4a0);try{_0xe858('0x11')===typeof _0x18b8f9['fn'][_0xe858('0x1e')]['initialSkuSelected']&&_0x18b8f9(window)[_0xe858('0x3e')]('QuatroDigital.ssa.skuSelected',[_0x18b8f9['fn'][_0xe858('0x1e')][_0xe858('0x4e')][_0xe858('0x4f')],_0x18b8f9['fn'][_0xe858('0x1e')]['initialSkuSelected'][_0xe858('0x3d')]]);}catch(_0x36e4b6){_0x204e4c([_0xe858('0x50'),_0x36e4b6['message']]);}_0x18b8f9['fn'][_0xe858('0x1e')][_0xe858('0x51')]&&_0x18b8f9(window)[_0xe858('0x3e')]('QuatroDigital.ssa.prodUnavailable');return _0x1da16d;};_0x18b8f9(window)['on'](_0xe858('0x42'),function(_0x3fd2a1,_0x5a1105,_0x588bcb){try{_0x18b8f9['fn'][_0xe858('0x1e')][_0xe858('0x4e')]={'prod':_0x5a1105,'sku':_0x588bcb},_0x18b8f9(this)[_0xe858('0x41')](_0x3fd2a1);}catch(_0x50b435){_0x204e4c([_0xe858('0x52'),_0x50b435[_0xe858('0x38')]]);}});_0x18b8f9(window)['on'](_0xe858('0x53'),function(_0x1f33b1,_0xbf5ac9,_0x1fe1ac){try{for(var _0x516553=_0x1fe1ac[_0xe858('0x32')],_0x24276d=_0xbf5ac9=0x0;_0x24276d<_0x516553&&!_0x1fe1ac[_0x24276d][_0xe858('0x54')];_0x24276d++)_0xbf5ac9+=0x1;_0x516553<=_0xbf5ac9&&(_0x18b8f9['fn'][_0xe858('0x1e')][_0xe858('0x51')]=!0x0);_0x18b8f9(this)['off'](_0x1f33b1);}catch(_0x41ce97){_0x204e4c([_0xe858('0x55'),_0x41ce97['message']]);}});_0x18b8f9(function(){_0x18b8f9(_0xe858('0x56'))[_0xe858('0x1e')]();});}}(window));
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
var _0x4b87=['info','warn','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','join','apply','qdAmAddNdx','each','addClass','qd-am-li-','qd-am-first','last','qd-am-last','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','ite','---','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','qd-am-banner-wrapper','parent','qd-am-collection-wrapper','qdAjax','url','html','find','img[alt=\x27','attr','data-qdam-value','.box-banner','insertBefore','hide','qd-am-content-loaded','trim','[class*=\x27colunas\x27]','clone','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','children','qd-am-elem-','text','replaceSpecialChars','qd-amazing-menu','>ul','>li','qd-am-column','qd-am-dropdown','qd-am-level-','qd-am-','QuatroDigital.am.callback','.qd_amazing_menu_auto','getParent','closest','function','QD_amazingMenu','/qd-amazing-menu','object','undefined','error'];(function(_0x18c2d3,_0x28e4b7){var _0x49e56b=function(_0x522dca){while(--_0x522dca){_0x18c2d3['push'](_0x18c2d3['shift']());}};_0x49e56b(++_0x28e4b7);}(_0x4b87,0x174));var _0x74b8=function(_0x565244,_0x310323){_0x565244=_0x565244-0x0;var _0x2b497c=_0x4b87[_0x565244];return _0x2b497c;};(function(_0x3cbfa9){_0x3cbfa9['fn'][_0x74b8('0x0')]=_0x3cbfa9['fn'][_0x74b8('0x1')];}(jQuery));(function(_0x9c2f69){var _0x15942e;var _0x8c51e4=jQuery;if(_0x74b8('0x2')!==typeof _0x8c51e4['fn'][_0x74b8('0x3')]){var _0x2e0489={'url':_0x74b8('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0x269fbb=function(_0x34ca14,_0x2149b3){if(_0x74b8('0x5')===typeof console&&_0x74b8('0x6')!==typeof console[_0x74b8('0x7')]&&_0x74b8('0x6')!==typeof console[_0x74b8('0x8')]&&'undefined'!==typeof console[_0x74b8('0x9')]){var _0x3d10d4;_0x74b8('0x5')===typeof _0x34ca14?(_0x34ca14['unshift'](_0x74b8('0xa')),_0x3d10d4=_0x34ca14):_0x3d10d4=[_0x74b8('0xa')+_0x34ca14];if(_0x74b8('0x6')===typeof _0x2149b3||_0x74b8('0xb')!==_0x2149b3[_0x74b8('0xc')]()&&_0x74b8('0xd')!==_0x2149b3[_0x74b8('0xc')]())if(_0x74b8('0x6')!==typeof _0x2149b3&&'info'===_0x2149b3[_0x74b8('0xc')]())try{console[_0x74b8('0x8')]['apply'](console,_0x3d10d4);}catch(_0x3d3fac){try{console[_0x74b8('0x8')](_0x3d10d4[_0x74b8('0xe')]('\x0a'));}catch(_0x84097d){}}else try{console[_0x74b8('0x7')][_0x74b8('0xf')](console,_0x3d10d4);}catch(_0x372d85){try{console[_0x74b8('0x7')](_0x3d10d4[_0x74b8('0xe')]('\x0a'));}catch(_0x3c9b13){}}else try{console[_0x74b8('0x9')]['apply'](console,_0x3d10d4);}catch(_0x204948){try{console[_0x74b8('0x9')](_0x3d10d4[_0x74b8('0xe')]('\x0a'));}catch(_0x48f942){}}}};_0x8c51e4['fn'][_0x74b8('0x10')]=function(){var _0x5a78ed=_0x8c51e4(this);_0x5a78ed[_0x74b8('0x11')](function(_0xd886c3){_0x8c51e4(this)[_0x74b8('0x12')](_0x74b8('0x13')+_0xd886c3);});_0x5a78ed['first']()[_0x74b8('0x12')](_0x74b8('0x14'));_0x5a78ed[_0x74b8('0x15')]()[_0x74b8('0x12')](_0x74b8('0x16'));return _0x5a78ed;};_0x8c51e4['fn'][_0x74b8('0x3')]=function(){};_0x9c2f69=function(_0x4e0820){var _0x34a18f={'s':_0x74b8('0x17')};return function(_0x2a2ec2){var _0x117d3c=function(_0x371c67){return _0x371c67;};var _0x361b3b=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2a2ec2=_0x2a2ec2['d'+_0x361b3b[0x10]+'c'+_0x361b3b[0x11]+'m'+_0x117d3c(_0x361b3b[0x1])+'n'+_0x361b3b[0xd]]['l'+_0x361b3b[0x12]+'c'+_0x361b3b[0x0]+'ti'+_0x117d3c('o')+'n'];var _0xe29f88=function(_0x36ef80){return escape(encodeURIComponent(_0x36ef80[_0x74b8('0x18')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x46204c){return String[_0x74b8('0x19')](('Z'>=_0x46204c?0x5a:0x7a)>=(_0x46204c=_0x46204c[_0x74b8('0x1a')](0x0)+0xd)?_0x46204c:_0x46204c-0x1a);})));};var _0x22c953=_0xe29f88(_0x2a2ec2[[_0x361b3b[0x9],_0x117d3c('o'),_0x361b3b[0xc],_0x361b3b[_0x117d3c(0xd)]][_0x74b8('0xe')]('')]);_0xe29f88=_0xe29f88((window[['js',_0x117d3c('no'),'m',_0x361b3b[0x1],_0x361b3b[0x4]['toUpperCase'](),_0x74b8('0x1b')][_0x74b8('0xe')]('')]||_0x74b8('0x1c'))+['.v',_0x361b3b[0xd],'e',_0x117d3c('x'),'co',_0x117d3c('mm'),'erc',_0x361b3b[0x1],'.c',_0x117d3c('o'),'m.',_0x361b3b[0x13],'r']['join'](''));for(var _0x1e179b in _0x34a18f){if(_0xe29f88===_0x1e179b+_0x34a18f[_0x1e179b]||_0x22c953===_0x1e179b+_0x34a18f[_0x1e179b]){var _0xfd953f='tr'+_0x361b3b[0x11]+'e';break;}_0xfd953f='f'+_0x361b3b[0x0]+'ls'+_0x117d3c(_0x361b3b[0x1])+'';}_0x117d3c=!0x1;-0x1<_0x2a2ec2[[_0x361b3b[0xc],'e',_0x361b3b[0x0],'rc',_0x361b3b[0x9]]['join']('')][_0x74b8('0x1d')](_0x74b8('0x1e'))&&(_0x117d3c=!0x0);return[_0xfd953f,_0x117d3c];}(_0x4e0820);}(window);if(!eval(_0x9c2f69[0x0]))return _0x9c2f69[0x1]?_0x269fbb(_0x74b8('0x1f')):!0x1;var _0x175173=function(_0x123846){var _0x586137=_0x123846['find'](_0x74b8('0x20'));var _0x73bd21=_0x586137[_0x74b8('0x21')](_0x74b8('0x22'));var _0x1e41fc=_0x586137[_0x74b8('0x21')](_0x74b8('0x23'));if(_0x73bd21[_0x74b8('0x24')]||_0x1e41fc[_0x74b8('0x24')])_0x73bd21['parent']()[_0x74b8('0x12')](_0x74b8('0x25')),_0x1e41fc[_0x74b8('0x26')]()[_0x74b8('0x12')](_0x74b8('0x27')),_0x8c51e4[_0x74b8('0x28')]({'url':_0x15942e[_0x74b8('0x29')],'dataType':_0x74b8('0x2a'),'success':function(_0x273697){var _0x4842a4=_0x8c51e4(_0x273697);_0x73bd21[_0x74b8('0x11')](function(){var _0x273697=_0x8c51e4(this);var _0x1b1f0a=_0x4842a4[_0x74b8('0x2b')](_0x74b8('0x2c')+_0x273697[_0x74b8('0x2d')](_0x74b8('0x2e'))+'\x27]');_0x1b1f0a[_0x74b8('0x24')]&&(_0x1b1f0a['each'](function(){_0x8c51e4(this)[_0x74b8('0x0')](_0x74b8('0x2f'))['clone']()[_0x74b8('0x30')](_0x273697);}),_0x273697[_0x74b8('0x31')]());})['addClass'](_0x74b8('0x32'));_0x1e41fc[_0x74b8('0x11')](function(){var _0x273697={};var _0xe9b0d9=_0x8c51e4(this);_0x4842a4[_0x74b8('0x2b')]('h2')[_0x74b8('0x11')](function(){if(_0x8c51e4(this)['text']()[_0x74b8('0x33')]()[_0x74b8('0xc')]()==_0xe9b0d9[_0x74b8('0x2d')](_0x74b8('0x2e'))[_0x74b8('0x33')]()[_0x74b8('0xc')]())return _0x273697=_0x8c51e4(this),!0x1;});_0x273697[_0x74b8('0x24')]&&(_0x273697[_0x74b8('0x11')](function(){_0x8c51e4(this)[_0x74b8('0x0')](_0x74b8('0x34'))[_0x74b8('0x35')]()['insertBefore'](_0xe9b0d9);}),_0xe9b0d9[_0x74b8('0x31')]());})[_0x74b8('0x12')](_0x74b8('0x32'));},'error':function(){_0x269fbb(_0x74b8('0x36')+_0x15942e['url']+_0x74b8('0x37'));},'complete':function(){_0x15942e[_0x74b8('0x38')][_0x74b8('0x39')](this);_0x8c51e4(window)[_0x74b8('0x3a')](_0x74b8('0x3b'),_0x123846);},'clearQueueDelay':0xbb8});};_0x8c51e4[_0x74b8('0x3')]=function(_0xd9dc1){var _0x561fb3=_0xd9dc1[_0x74b8('0x2b')]('ul[itemscope]')[_0x74b8('0x11')](function(){var _0x8cd114=_0x8c51e4(this);if(!_0x8cd114['length'])return _0x269fbb([_0x74b8('0x3c'),_0xd9dc1],_0x74b8('0xb'));_0x8cd114[_0x74b8('0x2b')](_0x74b8('0x3d'))['parent']()['addClass'](_0x74b8('0x3e'));_0x8cd114[_0x74b8('0x2b')]('li')[_0x74b8('0x11')](function(){var _0x59cdef=_0x8c51e4(this);var _0x4030b6=_0x59cdef[_0x74b8('0x3f')](':not(ul)');_0x4030b6[_0x74b8('0x24')]&&_0x59cdef[_0x74b8('0x12')](_0x74b8('0x40')+_0x4030b6['first']()[_0x74b8('0x41')]()[_0x74b8('0x33')]()[_0x74b8('0x42')]()[_0x74b8('0x18')](/\./g,'')[_0x74b8('0x18')](/\s/g,'-')[_0x74b8('0xc')]());});var _0x9003ff=_0x8cd114[_0x74b8('0x2b')]('>li')[_0x74b8('0x10')]();_0x8cd114[_0x74b8('0x12')](_0x74b8('0x43'));_0x9003ff=_0x9003ff[_0x74b8('0x2b')](_0x74b8('0x44'));_0x9003ff['each'](function(){var _0x3bcc10=_0x8c51e4(this);_0x3bcc10['find'](_0x74b8('0x45'))['qdAmAddNdx']()[_0x74b8('0x12')](_0x74b8('0x46'));_0x3bcc10[_0x74b8('0x12')]('qd-am-dropdown-menu');_0x3bcc10[_0x74b8('0x26')]()[_0x74b8('0x12')]('qd-am-dropdown');});_0x9003ff[_0x74b8('0x12')](_0x74b8('0x47'));var _0x56c04e=0x0,_0x9c2f69=function(_0x48141f){_0x56c04e+=0x1;_0x48141f=_0x48141f[_0x74b8('0x3f')]('li')[_0x74b8('0x3f')]('*');_0x48141f[_0x74b8('0x24')]&&(_0x48141f[_0x74b8('0x12')](_0x74b8('0x48')+_0x56c04e),_0x9c2f69(_0x48141f));};_0x9c2f69(_0x8cd114);_0x8cd114['add'](_0x8cd114[_0x74b8('0x2b')]('ul'))[_0x74b8('0x11')](function(){var _0xf60277=_0x8c51e4(this);_0xf60277['addClass'](_0x74b8('0x49')+_0xf60277[_0x74b8('0x3f')]('li')[_0x74b8('0x24')]+'-li');});});_0x175173(_0x561fb3);_0x15942e['callback']['call'](this);_0x8c51e4(window)[_0x74b8('0x3a')](_0x74b8('0x4a'),_0xd9dc1);};_0x8c51e4['fn']['QD_amazingMenu']=function(_0x301984){var _0x196cc1=_0x8c51e4(this);if(!_0x196cc1[_0x74b8('0x24')])return _0x196cc1;_0x15942e=_0x8c51e4['extend']({},_0x2e0489,_0x301984);_0x196cc1['exec']=new _0x8c51e4[(_0x74b8('0x3'))](_0x8c51e4(this));return _0x196cc1;};_0x8c51e4(function(){_0x8c51e4(_0x74b8('0x4b'))[_0x74b8('0x3')]();});}}(this));
/* Quatro Digital Smart Cart */
var _0x8cac=['.qd-ddc-viewCart','html','.qd_ddc_continueShopping','continueShopping','linkCheckout','.qd-ddc-infoTotal','shippingForm','.qd-ddc-emptyCart\x20p','cartContainer','each','call','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','.qd-ddc-infoAllTotal','allTotal','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','smartCheckout','getOrderForm','_QuatroDigital_AmountProduct','exec','addClass','QD_checkoutQueue','shippingData','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','attr','.qd-ddc-quantity','quantity','.qd-ddc-remove','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','getParent','val','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','lastSku','filter','[data-sku=\x27','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','qd-ddc-cart-empty','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','insertProdImg','qd-loaded','load','src','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','actionButtons','data-sku-index','changeQantity','data-sku','.qd-ddc-prodQttWrapper:not(.qd_on)','.qd-ddc-quantityMore','click.qd_ddc_more','preventDefault','.qd-ddc-quantityMinus','qd-loading','click.qd_ddc_remove','removeProduct','stop','slideUp','$1-$2$3','data','qdDdcLastPostalCode','calculateShipping','BRA','done','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','totalizers','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','simpleCart','removeItems','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','buyButtonClicked','quickViewUpdate','productId','prod_','allowRecalculate','.qd-bap-wrapper','remove','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','prodId','.qd_bap_wrapper_content','prepend','ajaxStop','.qdDdcContainer','QD_smartCart','selector','dropDown','buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','closest','abs','undefined','pow','round','toFixed','split','length','replace','join','_QuatroDigital_CartData','callback','Callbacks','function','error','Oooops!\x20','message','object','info','warn','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','aviso','toLowerCase','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','Ir\x20ao\x20Carrinho','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','name','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','script','checkout','SDK','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','find','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','body','removeClass','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20input','keyup.qd_ddc_cep','updateOnlyHover','mouseenter.qd_ddc_hover','getCartInfoByUrl','cartIsEmpty','mouseleave.qd_ddc_hover','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total'];(function(_0x5c3d4a,_0x1b9fb5){var _0x39ddb3=function(_0x24e212){while(--_0x24e212){_0x5c3d4a['push'](_0x5c3d4a['shift']());}};_0x39ddb3(++_0x1b9fb5);}(_0x8cac,0x15b));var _0xc8ca=function(_0x5b4826,_0x4a3682){_0x5b4826=_0x5b4826-0x0;var _0xd64a1a=_0x8cac[_0x5b4826];return _0xd64a1a;};(function(_0x302b5f){_0x302b5f['fn']['getParent']=_0x302b5f['fn'][_0xc8ca('0x0')];}(jQuery));function qd_number_format(_0x4ddead,_0x56d2a1,_0x2eb35b,_0xc051a6){_0x4ddead=(_0x4ddead+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x4ddead=isFinite(+_0x4ddead)?+_0x4ddead:0x0;_0x56d2a1=isFinite(+_0x56d2a1)?Math[_0xc8ca('0x1')](_0x56d2a1):0x0;_0xc051a6=_0xc8ca('0x2')===typeof _0xc051a6?',':_0xc051a6;_0x2eb35b='undefined'===typeof _0x2eb35b?'.':_0x2eb35b;var _0x4e5df4='',_0x4e5df4=function(_0x420655,_0x3e35d8){var _0x56d2a1=Math[_0xc8ca('0x3')](0xa,_0x3e35d8);return''+(Math[_0xc8ca('0x4')](_0x420655*_0x56d2a1)/_0x56d2a1)[_0xc8ca('0x5')](_0x3e35d8);},_0x4e5df4=(_0x56d2a1?_0x4e5df4(_0x4ddead,_0x56d2a1):''+Math[_0xc8ca('0x4')](_0x4ddead))[_0xc8ca('0x6')]('.');0x3<_0x4e5df4[0x0][_0xc8ca('0x7')]&&(_0x4e5df4[0x0]=_0x4e5df4[0x0][_0xc8ca('0x8')](/\B(?=(?:\d{3})+(?!\d))/g,_0xc051a6));(_0x4e5df4[0x1]||'')[_0xc8ca('0x7')]<_0x56d2a1&&(_0x4e5df4[0x1]=_0x4e5df4[0x1]||'',_0x4e5df4[0x1]+=Array(_0x56d2a1-_0x4e5df4[0x1][_0xc8ca('0x7')]+0x1)['join']('0'));return _0x4e5df4[_0xc8ca('0x9')](_0x2eb35b);};(function(){try{window['_QuatroDigital_CartData']=window[_0xc8ca('0xa')]||{},window['_QuatroDigital_CartData'][_0xc8ca('0xb')]=window[_0xc8ca('0xa')][_0xc8ca('0xb')]||$[_0xc8ca('0xc')]();}catch(_0x58606d){'undefined'!==typeof console&&_0xc8ca('0xd')===typeof console[_0xc8ca('0xe')]&&console[_0xc8ca('0xe')](_0xc8ca('0xf'),_0x58606d[_0xc8ca('0x10')]);}}());(function(_0x598569){try{var _0x22570b=jQuery,_0x16fae1=function(_0x34ed26,_0x25a2c7){if(_0xc8ca('0x11')===typeof console&&_0xc8ca('0x2')!==typeof console[_0xc8ca('0xe')]&&_0xc8ca('0x2')!==typeof console[_0xc8ca('0x12')]&&_0xc8ca('0x2')!==typeof console[_0xc8ca('0x13')]){var _0x5a8370;_0xc8ca('0x11')===typeof _0x34ed26?(_0x34ed26[_0xc8ca('0x14')]('[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'),_0x5a8370=_0x34ed26):_0x5a8370=[_0xc8ca('0x15')+_0x34ed26];if(_0xc8ca('0x2')===typeof _0x25a2c7||_0xc8ca('0x16')!==_0x25a2c7['toLowerCase']()&&_0xc8ca('0x17')!==_0x25a2c7[_0xc8ca('0x18')]())if(_0xc8ca('0x2')!==typeof _0x25a2c7&&'info'===_0x25a2c7[_0xc8ca('0x18')]())try{console['info'][_0xc8ca('0x19')](console,_0x5a8370);}catch(_0x573808){try{console[_0xc8ca('0x12')](_0x5a8370[_0xc8ca('0x9')]('\x0a'));}catch(_0x56cdf8){}}else try{console[_0xc8ca('0xe')][_0xc8ca('0x19')](console,_0x5a8370);}catch(_0x1a7105){try{console['error'](_0x5a8370[_0xc8ca('0x9')]('\x0a'));}catch(_0x40ce35){}}else try{console[_0xc8ca('0x13')][_0xc8ca('0x19')](console,_0x5a8370);}catch(_0x5cd7f8){try{console[_0xc8ca('0x13')](_0x5a8370[_0xc8ca('0x9')]('\x0a'));}catch(_0x9486c0){}}}};window[_0xc8ca('0x1a')]=window['_QuatroDigital_DropDown']||{};window[_0xc8ca('0x1a')][_0xc8ca('0x1b')]=!0x0;_0x22570b[_0xc8ca('0x1c')]=function(){};_0x22570b['fn'][_0xc8ca('0x1c')]=function(){return{'fn':new _0x22570b()};};var _0x6c0159=function(_0x431f92){var _0x5cbfa5={'s':_0xc8ca('0x1d')};return function(_0x374038){var _0x22e161=function(_0x424fa6){return _0x424fa6;};var _0x22480b=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x374038=_0x374038['d'+_0x22480b[0x10]+'c'+_0x22480b[0x11]+'m'+_0x22e161(_0x22480b[0x1])+'n'+_0x22480b[0xd]]['l'+_0x22480b[0x12]+'c'+_0x22480b[0x0]+'ti'+_0x22e161('o')+'n'];var _0x3ebd2d=function(_0x752cef){return escape(encodeURIComponent(_0x752cef[_0xc8ca('0x8')](/\./g,'¨')[_0xc8ca('0x8')](/[a-zA-Z]/g,function(_0x140564){return String[_0xc8ca('0x1e')](('Z'>=_0x140564?0x5a:0x7a)>=(_0x140564=_0x140564[_0xc8ca('0x1f')](0x0)+0xd)?_0x140564:_0x140564-0x1a);})));};var _0x187836=_0x3ebd2d(_0x374038[[_0x22480b[0x9],_0x22e161('o'),_0x22480b[0xc],_0x22480b[_0x22e161(0xd)]][_0xc8ca('0x9')]('')]);_0x3ebd2d=_0x3ebd2d((window[['js',_0x22e161('no'),'m',_0x22480b[0x1],_0x22480b[0x4]['toUpperCase'](),_0xc8ca('0x20')][_0xc8ca('0x9')]('')]||_0xc8ca('0x21'))+['.v',_0x22480b[0xd],'e',_0x22e161('x'),'co',_0x22e161('mm'),_0xc8ca('0x22'),_0x22480b[0x1],'.c',_0x22e161('o'),'m.',_0x22480b[0x13],'r'][_0xc8ca('0x9')](''));for(var _0x3e4b0e in _0x5cbfa5){if(_0x3ebd2d===_0x3e4b0e+_0x5cbfa5[_0x3e4b0e]||_0x187836===_0x3e4b0e+_0x5cbfa5[_0x3e4b0e]){var _0x433e4d='tr'+_0x22480b[0x11]+'e';break;}_0x433e4d='f'+_0x22480b[0x0]+'ls'+_0x22e161(_0x22480b[0x1])+'';}_0x22e161=!0x1;-0x1<_0x374038[[_0x22480b[0xc],'e',_0x22480b[0x0],'rc',_0x22480b[0x9]][_0xc8ca('0x9')]('')][_0xc8ca('0x23')](_0xc8ca('0x24'))&&(_0x22e161=!0x0);return[_0x433e4d,_0x22e161];}(_0x431f92);}(window);if(!eval(_0x6c0159[0x0]))return _0x6c0159[0x1]?_0x16fae1(_0xc8ca('0x25')):!0x1;_0x22570b[_0xc8ca('0x1c')]=function(_0x1037d6,_0x20ea02){var _0x4daf86=_0x22570b(_0x1037d6);if(!_0x4daf86[_0xc8ca('0x7')])return _0x4daf86;var _0x284c96=_0x22570b[_0xc8ca('0x26')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0xc8ca('0x27'),'linkCheckout':'Finalizar\x20Compra','cartTotal':_0xc8ca('0x28'),'emptyCart':_0xc8ca('0x29'),'continueShopping':_0xc8ca('0x2a'),'shippingForm':_0xc8ca('0x2b')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0xe14a3){return _0xe14a3[_0xc8ca('0x2c')]||_0xe14a3[_0xc8ca('0x2d')];},'callback':function(){},'callbackProductsList':function(){}},_0x20ea02);_0x22570b('');var _0x391b2e=this;if(_0x284c96['smartCheckout']){var _0x22fba6=!0x1;_0xc8ca('0x2')===typeof window[_0xc8ca('0x2e')]&&(_0x16fae1(_0xc8ca('0x2f')),_0x22570b[_0xc8ca('0x30')]({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':!0x1,'dataType':_0xc8ca('0x31'),'error':function(){_0x16fae1('Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.');_0x22fba6=!0x0;}}));if(_0x22fba6)return _0x16fae1('A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!');}if(_0xc8ca('0x11')===typeof window['vtexjs']&&'undefined'!==typeof window[_0xc8ca('0x2e')]['checkout'])var _0x598569=window['vtexjs']['checkout'];else if(_0xc8ca('0x11')===typeof vtex&&_0xc8ca('0x11')===typeof vtex[_0xc8ca('0x32')]&&_0xc8ca('0x2')!==typeof vtex[_0xc8ca('0x32')][_0xc8ca('0x33')])_0x598569=new vtex[(_0xc8ca('0x32'))]['SDK']();else return _0x16fae1('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x391b2e['cartContainer']=_0xc8ca('0x34');var _0x1375c0=function(_0x1205c6){_0x22570b(this)[_0xc8ca('0x35')](_0x1205c6);_0x1205c6[_0xc8ca('0x36')](_0xc8ca('0x37'))[_0xc8ca('0x38')](_0x22570b(_0xc8ca('0x39')))['on'](_0xc8ca('0x3a'),function(){_0x4daf86['removeClass'](_0xc8ca('0x3b'));_0x22570b(document[_0xc8ca('0x3c')])[_0xc8ca('0x3d')](_0xc8ca('0x3e'));});_0x22570b(document)[_0xc8ca('0x3f')]('keyup.qd_ddc_closeFn')['on'](_0xc8ca('0x40'),function(_0x1afc2c){0x1b==_0x1afc2c[_0xc8ca('0x41')]&&(_0x4daf86['removeClass'](_0xc8ca('0x3b')),_0x22570b(document[_0xc8ca('0x3c')])[_0xc8ca('0x3d')](_0xc8ca('0x3e')));});var _0x9ee150=_0x1205c6[_0xc8ca('0x36')](_0xc8ca('0x42'));_0x1205c6['find']('.qd-ddc-scrollUp')['on'](_0xc8ca('0x43'),function(){_0x391b2e[_0xc8ca('0x44')]('-',void 0x0,void 0x0,_0x9ee150);return!0x1;});_0x1205c6[_0xc8ca('0x36')](_0xc8ca('0x45'))['on'](_0xc8ca('0x46'),function(){_0x391b2e[_0xc8ca('0x44')](void 0x0,void 0x0,void 0x0,_0x9ee150);return!0x1;});_0x1205c6['find'](_0xc8ca('0x47'))['val']('')['on'](_0xc8ca('0x48'),function(){_0x391b2e['shippingCalculate'](_0x22570b(this));});if(_0x284c96[_0xc8ca('0x49')]){var _0x20ea02=0x0;_0x22570b(this)['on'](_0xc8ca('0x4a'),function(){var _0x1205c6=function(){window[_0xc8ca('0x1a')][_0xc8ca('0x1b')]&&(_0x391b2e[_0xc8ca('0x4b')](),window['_QuatroDigital_DropDown']['allowUpdate']=!0x1,_0x22570b['fn']['simpleCart'](!0x0),_0x391b2e[_0xc8ca('0x4c')]());};_0x20ea02=setInterval(function(){_0x1205c6();},0x258);_0x1205c6();});_0x22570b(this)['on'](_0xc8ca('0x4d'),function(){clearInterval(_0x20ea02);});}};var _0x1e9d95=function(_0x275918){_0x275918=_0x22570b(_0x275918);_0x284c96[_0xc8ca('0x4e')][_0xc8ca('0x4f')]=_0x284c96[_0xc8ca('0x4e')]['cartTotal'][_0xc8ca('0x8')](_0xc8ca('0x50'),_0xc8ca('0x51'));_0x284c96[_0xc8ca('0x4e')][_0xc8ca('0x4f')]=_0x284c96['texts']['cartTotal'][_0xc8ca('0x8')](_0xc8ca('0x52'),_0xc8ca('0x53'));_0x284c96[_0xc8ca('0x4e')]['cartTotal']=_0x284c96[_0xc8ca('0x4e')][_0xc8ca('0x4f')][_0xc8ca('0x8')](_0xc8ca('0x54'),_0xc8ca('0x55'));_0x284c96['texts'][_0xc8ca('0x4f')]=_0x284c96[_0xc8ca('0x4e')][_0xc8ca('0x4f')]['replace'](_0xc8ca('0x56'),'<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0x275918[_0xc8ca('0x36')](_0xc8ca('0x57'))[_0xc8ca('0x58')](_0x284c96[_0xc8ca('0x4e')]['linkCart']);_0x275918[_0xc8ca('0x36')](_0xc8ca('0x59'))[_0xc8ca('0x58')](_0x284c96['texts'][_0xc8ca('0x5a')]);_0x275918[_0xc8ca('0x36')]('.qd-ddc-checkout')['html'](_0x284c96[_0xc8ca('0x4e')][_0xc8ca('0x5b')]);_0x275918[_0xc8ca('0x36')](_0xc8ca('0x5c'))[_0xc8ca('0x58')](_0x284c96[_0xc8ca('0x4e')][_0xc8ca('0x4f')]);_0x275918[_0xc8ca('0x36')]('.qd-ddc-shipping')[_0xc8ca('0x58')](_0x284c96[_0xc8ca('0x4e')][_0xc8ca('0x5d')]);_0x275918[_0xc8ca('0x36')](_0xc8ca('0x5e'))[_0xc8ca('0x58')](_0x284c96['texts']['emptyCart']);return _0x275918;}(this[_0xc8ca('0x5f')]);var _0x87eded=0x0;_0x4daf86[_0xc8ca('0x60')](function(){0x0<_0x87eded?_0x1375c0[_0xc8ca('0x61')](this,_0x1e9d95['clone']()):_0x1375c0['call'](this,_0x1e9d95);_0x87eded++;});window[_0xc8ca('0xa')]['callback'][_0xc8ca('0x38')](function(){_0x22570b('.qd-ddc-infoTotalValue')[_0xc8ca('0x58')](window[_0xc8ca('0xa')]['total']||'--');_0x22570b(_0xc8ca('0x62'))[_0xc8ca('0x58')](window['_QuatroDigital_CartData'][_0xc8ca('0x63')]||'0');_0x22570b(_0xc8ca('0x64'))[_0xc8ca('0x58')](window['_QuatroDigital_CartData']['shipping']||'--');_0x22570b(_0xc8ca('0x65'))[_0xc8ca('0x58')](window[_0xc8ca('0xa')][_0xc8ca('0x66')]||'--');});var _0x553085=function(_0x4cd2f4,_0x171db7){if(_0xc8ca('0x2')===typeof _0x4cd2f4[_0xc8ca('0x67')])return _0x16fae1(_0xc8ca('0x68'));_0x391b2e[_0xc8ca('0x69')][_0xc8ca('0x61')](this,_0x171db7);};_0x391b2e['getCartInfoByUrl']=function(_0x21d8ce,_0x12797e){'undefined'!=typeof _0x12797e?window['_QuatroDigital_DropDown'][_0xc8ca('0x6a')]=_0x12797e:window['_QuatroDigital_DropDown']['dataOptionsCache']&&(_0x12797e=window['_QuatroDigital_DropDown'][_0xc8ca('0x6a')]);setTimeout(function(){window['_QuatroDigital_DropDown']['dataOptionsCache']=void 0x0;},_0x284c96[_0xc8ca('0x6b')]);_0x22570b(_0xc8ca('0x6c'))[_0xc8ca('0x3d')](_0xc8ca('0x6d'));if(_0x284c96[_0xc8ca('0x6e')]){var _0x20ea02=function(_0x7fc189){window[_0xc8ca('0x1a')][_0xc8ca('0x6f')]=_0x7fc189;_0x553085(_0x7fc189,_0x12797e);_0xc8ca('0x2')!==typeof window['_QuatroDigital_AmountProduct']&&_0xc8ca('0xd')===typeof window[_0xc8ca('0x70')][_0xc8ca('0x71')]&&window[_0xc8ca('0x70')][_0xc8ca('0x71')]['call'](this);_0x22570b(_0xc8ca('0x6c'))[_0xc8ca('0x72')](_0xc8ca('0x6d'));};_0xc8ca('0x2')!==typeof window['_QuatroDigital_DropDown'][_0xc8ca('0x6f')]?(_0x20ea02(window[_0xc8ca('0x1a')][_0xc8ca('0x6f')]),'function'===typeof _0x21d8ce&&_0x21d8ce(window[_0xc8ca('0x1a')]['getOrderForm'])):_0x22570b[_0xc8ca('0x73')]([_0xc8ca('0x67'),'totalizers',_0xc8ca('0x74')],{'done':function(_0x37eddc){_0x20ea02[_0xc8ca('0x61')](this,_0x37eddc);'function'===typeof _0x21d8ce&&_0x21d8ce(_0x37eddc);},'fail':function(_0x4bd4e5){_0x16fae1(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0x4bd4e5]);}});}else alert('Este\x20método\x20esta\x20descontinuado!');};_0x391b2e[_0xc8ca('0x4c')]=function(){var _0x55bb47=_0x22570b(_0xc8ca('0x6c'));_0x55bb47['find'](_0xc8ca('0x75'))[_0xc8ca('0x7')]?_0x55bb47[_0xc8ca('0x3d')]('qd-ddc-noItems'):_0x55bb47[_0xc8ca('0x72')](_0xc8ca('0x76'));};_0x391b2e[_0xc8ca('0x69')]=function(_0x5b3056){var _0x20ea02=_0x22570b(_0xc8ca('0x77'));_0x20ea02['empty']();_0x20ea02['each'](function(){var _0x20ea02=_0x22570b(this),_0xc8bb3a,_0x1037d6,_0x4a1535=_0x22570b(''),_0x4f168b;for(_0x4f168b in window[_0xc8ca('0x1a')][_0xc8ca('0x6f')][_0xc8ca('0x67')])if(_0xc8ca('0x11')===typeof window[_0xc8ca('0x1a')][_0xc8ca('0x6f')][_0xc8ca('0x67')][_0x4f168b]){var _0xa2efd2=window[_0xc8ca('0x1a')]['getOrderForm'][_0xc8ca('0x67')][_0x4f168b];var _0x59144e=_0xa2efd2[_0xc8ca('0x78')][_0xc8ca('0x8')](/^\/|\/$/g,'')[_0xc8ca('0x6')]('/');var _0x5c19e8=_0x22570b(_0xc8ca('0x79'));_0x5c19e8['attr']({'data-sku':_0xa2efd2['id'],'data-sku-index':_0x4f168b,'data-qd-departament':_0x59144e[0x0],'data-qd-category':_0x59144e[_0x59144e[_0xc8ca('0x7')]-0x1]});_0x5c19e8[_0xc8ca('0x72')]('qd-ddc-'+_0xa2efd2[_0xc8ca('0x7a')]);_0x5c19e8[_0xc8ca('0x36')](_0xc8ca('0x7b'))['append'](_0x284c96[_0xc8ca('0x2c')](_0xa2efd2));_0x5c19e8[_0xc8ca('0x36')](_0xc8ca('0x7c'))['append'](isNaN(_0xa2efd2['sellingPrice'])?_0xa2efd2['sellingPrice']:0x0==_0xa2efd2[_0xc8ca('0x7d')]?_0xc8ca('0x7e'):(_0x22570b(_0xc8ca('0x7f'))[_0xc8ca('0x80')]('content')||'R$')+'\x20'+qd_number_format(_0xa2efd2[_0xc8ca('0x7d')]/0x64,0x2,',','.'));_0x5c19e8['find'](_0xc8ca('0x81'))[_0xc8ca('0x80')]({'data-sku':_0xa2efd2['id'],'data-sku-index':_0x4f168b})['val'](_0xa2efd2[_0xc8ca('0x82')]);_0x5c19e8['find'](_0xc8ca('0x83'))[_0xc8ca('0x80')]({'data-sku':_0xa2efd2['id'],'data-sku-index':_0x4f168b});_0x391b2e['insertProdImg'](_0xa2efd2['id'],_0x5c19e8[_0xc8ca('0x36')](_0xc8ca('0x84')),_0xa2efd2[_0xc8ca('0x85')]);_0x5c19e8[_0xc8ca('0x36')](_0xc8ca('0x86'))[_0xc8ca('0x80')]({'data-sku':_0xa2efd2['id'],'data-sku-index':_0x4f168b});_0x5c19e8['appendTo'](_0x20ea02);_0x4a1535=_0x4a1535[_0xc8ca('0x38')](_0x5c19e8);}try{var _0x598569=_0x20ea02[_0xc8ca('0x87')]('.qd-ddc-wrapper')[_0xc8ca('0x36')]('.qd-ddc-shipping\x20input');_0x598569['length']&&''==_0x598569[_0xc8ca('0x88')]()&&window['_QuatroDigital_DropDown'][_0xc8ca('0x6f')][_0xc8ca('0x74')]['address']&&_0x598569[_0xc8ca('0x88')](window['_QuatroDigital_DropDown'][_0xc8ca('0x6f')][_0xc8ca('0x74')][_0xc8ca('0x89')][_0xc8ca('0x8a')]);}catch(_0x2a6693){_0x16fae1(_0xc8ca('0x8b')+_0x2a6693[_0xc8ca('0x10')],_0xc8ca('0x17'));}_0x391b2e['actionButtons'](_0x20ea02);_0x391b2e['cartIsEmpty']();_0x5b3056&&_0x5b3056[_0xc8ca('0x8c')]&&function(){_0x1037d6=_0x4a1535[_0xc8ca('0x8d')](_0xc8ca('0x8e')+_0x5b3056[_0xc8ca('0x8c')]+'\x27]');_0x1037d6['length']&&(_0xc8bb3a=0x0,_0x4a1535[_0xc8ca('0x60')](function(){var _0x5b3056=_0x22570b(this);if(_0x5b3056['is'](_0x1037d6))return!0x1;_0xc8bb3a+=_0x5b3056[_0xc8ca('0x8f')]();}),_0x391b2e[_0xc8ca('0x44')](void 0x0,void 0x0,_0xc8bb3a,_0x20ea02[_0xc8ca('0x38')](_0x20ea02['parent']())),_0x4a1535['removeClass'](_0xc8ca('0x90')),function(_0x204bd9){_0x204bd9[_0xc8ca('0x72')]('qd-ddc-lastAdded');_0x204bd9[_0xc8ca('0x72')](_0xc8ca('0x90'));setTimeout(function(){_0x204bd9[_0xc8ca('0x3d')](_0xc8ca('0x91'));},_0x284c96[_0xc8ca('0x6b')]);}(_0x1037d6),_0x22570b(document[_0xc8ca('0x3c')])[_0xc8ca('0x72')](_0xc8ca('0x92')),setTimeout(function(){_0x22570b(document[_0xc8ca('0x3c')])[_0xc8ca('0x3d')]('qd-ddc-product-add-time-v2');},_0x284c96[_0xc8ca('0x6b')]));}();});(function(){_QuatroDigital_DropDown[_0xc8ca('0x6f')][_0xc8ca('0x67')]['length']?(_0x22570b(_0xc8ca('0x3c'))[_0xc8ca('0x3d')]('qd-ddc-cart-empty')[_0xc8ca('0x72')](_0xc8ca('0x93')),setTimeout(function(){_0x22570b('body')[_0xc8ca('0x3d')](_0xc8ca('0x94'));},_0x284c96['timeRemoveNewItemClass'])):_0x22570b(_0xc8ca('0x3c'))['removeClass'](_0xc8ca('0x95'))[_0xc8ca('0x72')](_0xc8ca('0x96'));}());_0xc8ca('0xd')===typeof _0x284c96[_0xc8ca('0x97')]?_0x284c96[_0xc8ca('0x97')]['call'](this):_0x16fae1(_0xc8ca('0x98'));};_0x391b2e[_0xc8ca('0x99')]=function(_0x454868,_0x4e10ac,_0x3baf9a){function _0x305663(){_0x4e10ac[_0xc8ca('0x3d')](_0xc8ca('0x9a'))[_0xc8ca('0x9b')](function(){_0x22570b(this)['addClass'](_0xc8ca('0x9a'));})[_0xc8ca('0x80')](_0xc8ca('0x9c'),_0x3baf9a);}_0x3baf9a?_0x305663():isNaN(_0x454868)?_0x16fae1('Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU',_0xc8ca('0x16')):alert(_0xc8ca('0x9d'));};_0x391b2e[_0xc8ca('0x9e')]=function(_0x438e69){var _0x20ea02=function(_0x3c941b,_0x3fd860){var _0x1405a9=_0x22570b(_0x3c941b);var _0x229e8f=_0x1405a9['attr']('data-sku');var _0x1037d6=_0x1405a9[_0xc8ca('0x80')](_0xc8ca('0x9f'));if(_0x229e8f){var _0x24adf1=parseInt(_0x1405a9[_0xc8ca('0x88')]())||0x1;_0x391b2e[_0xc8ca('0xa0')]([_0x229e8f,_0x1037d6],_0x24adf1,_0x24adf1+0x1,function(_0x4c74ef){_0x1405a9['val'](_0x4c74ef);_0xc8ca('0xd')===typeof _0x3fd860&&_0x3fd860();});}};var _0x1b0433=function(_0x389e56,_0x26a296){var _0x29e58c=_0x22570b(_0x389e56);var _0x1037d6=_0x29e58c['attr'](_0xc8ca('0xa1'));var _0x3f3a59=_0x29e58c[_0xc8ca('0x80')](_0xc8ca('0x9f'));if(_0x1037d6){var _0x5ca438=parseInt(_0x29e58c[_0xc8ca('0x88')]())||0x2;_0x391b2e[_0xc8ca('0xa0')]([_0x1037d6,_0x3f3a59],_0x5ca438,_0x5ca438-0x1,function(_0x5747e1){_0x29e58c['val'](_0x5747e1);'function'===typeof _0x26a296&&_0x26a296();});}};var _0x398570=function(_0x2a86aa,_0x5c7e55){var _0x20ea02=_0x22570b(_0x2a86aa);var _0x1037d6=_0x20ea02[_0xc8ca('0x80')](_0xc8ca('0xa1'));var _0x18f42d=_0x20ea02['attr'](_0xc8ca('0x9f'));if(_0x1037d6){var _0x503475=parseInt(_0x20ea02[_0xc8ca('0x88')]())||0x1;_0x391b2e[_0xc8ca('0xa0')]([_0x1037d6,_0x18f42d],0x1,_0x503475,function(_0xe6875f){_0x20ea02['val'](_0xe6875f);_0xc8ca('0xd')===typeof _0x5c7e55&&_0x5c7e55();});}};var _0x1037d6=_0x438e69[_0xc8ca('0x36')](_0xc8ca('0xa2'));_0x1037d6[_0xc8ca('0x72')]('qd_on')[_0xc8ca('0x60')](function(){var _0x438e69=_0x22570b(this);_0x438e69[_0xc8ca('0x36')](_0xc8ca('0xa3'))['on'](_0xc8ca('0xa4'),function(_0x1ef37d){_0x1ef37d[_0xc8ca('0xa5')]();_0x1037d6[_0xc8ca('0x72')]('qd-loading');_0x20ea02(_0x438e69[_0xc8ca('0x36')]('.qd-ddc-quantity'),function(){_0x1037d6[_0xc8ca('0x3d')]('qd-loading');});});_0x438e69[_0xc8ca('0x36')](_0xc8ca('0xa6'))['on']('click.qd_ddc_minus',function(_0x174731){_0x174731[_0xc8ca('0xa5')]();_0x1037d6[_0xc8ca('0x72')]('qd-loading');_0x1b0433(_0x438e69['find'](_0xc8ca('0x81')),function(){_0x1037d6['removeClass'](_0xc8ca('0xa7'));});});_0x438e69[_0xc8ca('0x36')]('.qd-ddc-quantity')['on']('focusout.qd_ddc_change',function(){_0x1037d6[_0xc8ca('0x72')]('qd-loading');_0x398570(this,function(){_0x1037d6[_0xc8ca('0x3d')]('qd-loading');});});_0x438e69[_0xc8ca('0x36')]('.qd-ddc-quantity')['on']('keyup.qd_ddc_change',function(_0x483f0a){0xd==_0x483f0a[_0xc8ca('0x41')]&&(_0x1037d6[_0xc8ca('0x72')](_0xc8ca('0xa7')),_0x398570(this,function(){_0x1037d6[_0xc8ca('0x3d')](_0xc8ca('0xa7'));}));});});_0x438e69[_0xc8ca('0x36')](_0xc8ca('0x75'))[_0xc8ca('0x60')](function(){var _0x438e69=_0x22570b(this);_0x438e69['find'](_0xc8ca('0x83'))['on'](_0xc8ca('0xa8'),function(){_0x438e69['addClass'](_0xc8ca('0xa7'));_0x391b2e[_0xc8ca('0xa9')](_0x22570b(this),function(_0x46c5c3){_0x46c5c3?_0x438e69[_0xc8ca('0xaa')](!0x0)[_0xc8ca('0xab')](function(){_0x438e69['remove']();_0x391b2e['cartIsEmpty']();}):_0x438e69['removeClass']('qd-loading');});return!0x1;});});};_0x391b2e['shippingCalculate']=function(_0x5a7959){var _0x773df8=_0x5a7959[_0xc8ca('0x88')]();_0x773df8=_0x773df8[_0xc8ca('0x8')](/[^0-9\-]/g,'');_0x773df8=_0x773df8[_0xc8ca('0x8')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0xc8ca('0xac'));_0x773df8=_0x773df8[_0xc8ca('0x8')](/(.{9}).*/g,'$1');_0x5a7959[_0xc8ca('0x88')](_0x773df8);0x9<=_0x773df8['length']&&(_0x5a7959[_0xc8ca('0xad')](_0xc8ca('0xae'))!=_0x773df8&&_0x598569[_0xc8ca('0xaf')]({'postalCode':_0x773df8,'country':_0xc8ca('0xb0')})[_0xc8ca('0xb1')](function(_0x38b67e){window[_0xc8ca('0x1a')][_0xc8ca('0x6f')]=_0x38b67e;_0x391b2e[_0xc8ca('0x4b')]();})[_0xc8ca('0xb2')](function(_0x55ab04){_0x16fae1([_0xc8ca('0xb3'),_0x55ab04]);updateCartData();}),_0x5a7959[_0xc8ca('0xad')](_0xc8ca('0xae'),_0x773df8));};_0x391b2e['changeQantity']=function(_0x453972,_0x24275e,_0x537ff8,_0x1d9845){function _0x4e6068(_0x18ac67){_0x18ac67=_0xc8ca('0xb4')!==typeof _0x18ac67?!0x1:_0x18ac67;_0x391b2e[_0xc8ca('0x4b')]();window[_0xc8ca('0x1a')][_0xc8ca('0x1b')]=!0x1;_0x391b2e[_0xc8ca('0x4c')]();_0xc8ca('0x2')!==typeof window[_0xc8ca('0x70')]&&'function'===typeof window[_0xc8ca('0x70')][_0xc8ca('0x71')]&&window[_0xc8ca('0x70')][_0xc8ca('0x71')][_0xc8ca('0x61')](this);'function'===typeof adminCart&&adminCart();_0x22570b['fn']['simpleCart'](!0x0,void 0x0,_0x18ac67);_0xc8ca('0xd')===typeof _0x1d9845&&_0x1d9845(_0x24275e);}_0x537ff8=_0x537ff8||0x1;if(0x1>_0x537ff8)return _0x24275e;if(_0x284c96[_0xc8ca('0x6e')]){if(_0xc8ca('0x2')===typeof window[_0xc8ca('0x1a')][_0xc8ca('0x6f')]['items'][_0x453972[0x1]])return _0x16fae1(_0xc8ca('0xb5')+_0x453972[0x1]+']'),_0x24275e;window['_QuatroDigital_DropDown']['getOrderForm'][_0xc8ca('0x67')][_0x453972[0x1]][_0xc8ca('0x82')]=_0x537ff8;window[_0xc8ca('0x1a')][_0xc8ca('0x6f')][_0xc8ca('0x67')][_0x453972[0x1]][_0xc8ca('0xb6')]=_0x453972[0x1];_0x598569[_0xc8ca('0xb7')]([window[_0xc8ca('0x1a')]['getOrderForm'][_0xc8ca('0x67')][_0x453972[0x1]]],[_0xc8ca('0x67'),_0xc8ca('0xb8'),'shippingData'])[_0xc8ca('0xb1')](function(_0x144db3){window[_0xc8ca('0x1a')][_0xc8ca('0x6f')]=_0x144db3;_0x4e6068(!0x0);})['fail'](function(_0xde6ea6){_0x16fae1([_0xc8ca('0xb9'),_0xde6ea6]);_0x4e6068();});}else _0x16fae1(_0xc8ca('0xba'));};_0x391b2e[_0xc8ca('0xa9')]=function(_0x2079a4,_0x334d49){function _0x23f7bc(_0x1b33a9){_0x1b33a9=_0xc8ca('0xb4')!==typeof _0x1b33a9?!0x1:_0x1b33a9;'undefined'!==typeof window[_0xc8ca('0x70')]&&_0xc8ca('0xd')===typeof window['_QuatroDigital_AmountProduct'][_0xc8ca('0x71')]&&window[_0xc8ca('0x70')][_0xc8ca('0x71')][_0xc8ca('0x61')](this);_0xc8ca('0xd')===typeof adminCart&&adminCart();_0x22570b['fn'][_0xc8ca('0xbb')](!0x0,void 0x0,_0x1b33a9);_0xc8ca('0xd')===typeof _0x334d49&&_0x334d49(_0x1037d6);}var _0x1037d6=!0x1,_0x1a9030=_0x22570b(_0x2079a4)[_0xc8ca('0x80')](_0xc8ca('0x9f'));if(_0x284c96['smartCheckout']){if(_0xc8ca('0x2')===typeof window[_0xc8ca('0x1a')][_0xc8ca('0x6f')][_0xc8ca('0x67')][_0x1a9030])return _0x16fae1(_0xc8ca('0xb5')+_0x1a9030+']'),_0x1037d6;window['_QuatroDigital_DropDown'][_0xc8ca('0x6f')][_0xc8ca('0x67')][_0x1a9030][_0xc8ca('0xb6')]=_0x1a9030;_0x598569[_0xc8ca('0xbc')]([window[_0xc8ca('0x1a')][_0xc8ca('0x6f')][_0xc8ca('0x67')][_0x1a9030]],[_0xc8ca('0x67'),_0xc8ca('0xb8'),_0xc8ca('0x74')])['done'](function(_0xbaed98){_0x1037d6=!0x0;window[_0xc8ca('0x1a')][_0xc8ca('0x6f')]=_0xbaed98;_0x553085(_0xbaed98);_0x23f7bc(!0x0);})[_0xc8ca('0xb2')](function(_0x43aaf0){_0x16fae1(['Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho',_0x43aaf0]);_0x23f7bc();});}else alert(_0xc8ca('0xbd'));};_0x391b2e['scrollCart']=function(_0x18e754,_0x1074f8,_0x59b5a6,_0x1f92d6){_0x1f92d6=_0x1f92d6||_0x22570b(_0xc8ca('0xbe'));_0x18e754=_0x18e754||'+';_0x1074f8=_0x1074f8||0.9*_0x1f92d6[_0xc8ca('0xbf')]();_0x1f92d6[_0xc8ca('0xaa')](!0x0,!0x0)[_0xc8ca('0xc0')]({'scrollTop':isNaN(_0x59b5a6)?_0x18e754+'='+_0x1074f8+'px':_0x59b5a6});};_0x284c96['updateOnlyHover']||(_0x391b2e[_0xc8ca('0x4b')](),_0x22570b['fn'][_0xc8ca('0xbb')](!0x0));_0x22570b(window)['on'](_0xc8ca('0xc1'),function(){try{window[_0xc8ca('0x1a')][_0xc8ca('0x6f')]=void 0x0,_0x391b2e['getCartInfoByUrl']();}catch(_0x336a73){_0x16fae1(_0xc8ca('0xc2')+_0x336a73[_0xc8ca('0x10')],_0xc8ca('0xc3'));}});_0xc8ca('0xd')===typeof _0x284c96[_0xc8ca('0xb')]?_0x284c96[_0xc8ca('0xb')]['call'](this):_0x16fae1('Callback\x20não\x20é\x20uma\x20função');};_0x22570b['fn'][_0xc8ca('0x1c')]=function(_0x495ed1){var _0x263402=_0x22570b(this);_0x263402['fn']=new _0x22570b[(_0xc8ca('0x1c'))](this,_0x495ed1);return _0x263402;};}catch(_0xc469c4){_0xc8ca('0x2')!==typeof console&&'function'===typeof console[_0xc8ca('0xe')]&&console['error'](_0xc8ca('0xf'),_0xc469c4);}}(this));(function(_0x4a4390){try{var _0x572270=jQuery;window[_0xc8ca('0x70')]=window[_0xc8ca('0x70')]||{};window[_0xc8ca('0x70')][_0xc8ca('0x67')]={};window[_0xc8ca('0x70')]['allowRecalculate']=!0x1;window['_QuatroDigital_AmountProduct'][_0xc8ca('0xc4')]=!0x1;window[_0xc8ca('0x70')][_0xc8ca('0xc5')]=!0x1;var _0x1f5c6f=function(){if(window[_0xc8ca('0x70')]['allowRecalculate']){var _0x516fb3=!0x1;var _0x4f8e22={};window['_QuatroDigital_AmountProduct'][_0xc8ca('0x67')]={};for(_0x3f088f in window['_QuatroDigital_DropDown'][_0xc8ca('0x6f')]['items'])if(_0xc8ca('0x11')===typeof window['_QuatroDigital_DropDown']['getOrderForm'][_0xc8ca('0x67')][_0x3f088f]){var _0x4f362a=window['_QuatroDigital_DropDown'][_0xc8ca('0x6f')][_0xc8ca('0x67')][_0x3f088f];'undefined'!==typeof _0x4f362a[_0xc8ca('0xc6')]&&null!==_0x4f362a[_0xc8ca('0xc6')]&&''!==_0x4f362a[_0xc8ca('0xc6')]&&(window[_0xc8ca('0x70')]['items'][_0xc8ca('0xc7')+_0x4f362a[_0xc8ca('0xc6')]]=window['_QuatroDigital_AmountProduct'][_0xc8ca('0x67')][_0xc8ca('0xc7')+_0x4f362a[_0xc8ca('0xc6')]]||{},window['_QuatroDigital_AmountProduct']['items'][_0xc8ca('0xc7')+_0x4f362a[_0xc8ca('0xc6')]]['prodId']=_0x4f362a[_0xc8ca('0xc6')],_0x4f8e22[_0xc8ca('0xc7')+_0x4f362a[_0xc8ca('0xc6')]]||(window[_0xc8ca('0x70')]['items']['prod_'+_0x4f362a['productId']]['qtt']=0x0),window[_0xc8ca('0x70')][_0xc8ca('0x67')][_0xc8ca('0xc7')+_0x4f362a[_0xc8ca('0xc6')]][_0xc8ca('0x63')]+=_0x4f362a[_0xc8ca('0x82')],_0x516fb3=!0x0,_0x4f8e22[_0xc8ca('0xc7')+_0x4f362a[_0xc8ca('0xc6')]]=!0x0);}var _0x3f088f=_0x516fb3;}else _0x3f088f=void 0x0;window['_QuatroDigital_AmountProduct'][_0xc8ca('0xc8')]&&(_0x572270(_0xc8ca('0xc9'))[_0xc8ca('0xca')](),_0x572270(_0xc8ca('0xcb'))[_0xc8ca('0x3d')](_0xc8ca('0xcc')));for(var _0xd971a8 in window[_0xc8ca('0x70')][_0xc8ca('0x67')]){_0x4f362a=window[_0xc8ca('0x70')]['items'][_0xd971a8];if('object'!==typeof _0x4f362a)return;_0x4f8e22=_0x572270(_0xc8ca('0xcd')+_0x4f362a[_0xc8ca('0xce')]+']')['getParent']('li');if(window[_0xc8ca('0x70')][_0xc8ca('0xc8')]||!_0x4f8e22[_0xc8ca('0x36')]('.qd-bap-wrapper')['length'])_0x516fb3=_0x572270('<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>'),_0x516fb3[_0xc8ca('0x36')]('.qd-bap-qtt')[_0xc8ca('0x58')](_0x4f362a['qtt']),_0x4f362a=_0x4f8e22[_0xc8ca('0x36')](_0xc8ca('0xcf')),_0x4f362a[_0xc8ca('0x7')]?_0x4f362a['prepend'](_0x516fb3)['addClass'](_0xc8ca('0xcc')):_0x4f8e22[_0xc8ca('0xd0')](_0x516fb3);}_0x3f088f&&(window[_0xc8ca('0x70')][_0xc8ca('0xc8')]=!0x1);};window[_0xc8ca('0x70')][_0xc8ca('0x71')]=function(){window[_0xc8ca('0x70')][_0xc8ca('0xc8')]=!0x0;_0x1f5c6f[_0xc8ca('0x61')](this);};_0x572270(document)[_0xc8ca('0xd1')](function(){_0x1f5c6f['call'](this);});}catch(_0x492b87){_0xc8ca('0x2')!==typeof console&&_0xc8ca('0xd')===typeof console['error']&&console['error'](_0xc8ca('0xf'),_0x492b87);}}(this));(function(){try{var _0x57cd25=jQuery,_0x5da62d,_0x25464f={'selector':_0xc8ca('0xd2'),'dropDown':{},'buyButton':{}};_0x57cd25[_0xc8ca('0xd3')]=function(_0x532e2d){var _0x865c18={};_0x5da62d=_0x57cd25[_0xc8ca('0x26')](!0x0,{},_0x25464f,_0x532e2d);_0x532e2d=_0x57cd25(_0x5da62d[_0xc8ca('0xd4')])['QD_dropDownCart'](_0x5da62d[_0xc8ca('0xd5')]);_0x865c18['buyButton']='undefined'!==typeof _0x5da62d['dropDown']['updateOnlyHover']&&!0x1===_0x5da62d[_0xc8ca('0xd5')]['updateOnlyHover']?_0x57cd25(_0x5da62d['selector'])['QD_buyButton'](_0x532e2d['fn'],_0x5da62d[_0xc8ca('0xd6')]):_0x57cd25(_0x5da62d[_0xc8ca('0xd4')])['QD_buyButton'](_0x5da62d[_0xc8ca('0xd6')]);_0x865c18[_0xc8ca('0xd5')]=_0x532e2d;return _0x865c18;};_0x57cd25['fn'][_0xc8ca('0xd7')]=function(){'object'===typeof console&&'function'===typeof console['info']&&console[_0xc8ca('0x12')](_0xc8ca('0xd8'));};_0x57cd25[_0xc8ca('0xd7')]=_0x57cd25['fn'][_0xc8ca('0xd7')];}catch(_0x3687ea){'undefined'!==typeof console&&_0xc8ca('0xd')===typeof console[_0xc8ca('0xe')]&&console[_0xc8ca('0xe')](_0xc8ca('0xf'),_0x3687ea);}}());

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0xb6c4=['qdpv-video-on','add','animate','find','iframe','click.removeVideo','hide','style','removeClass','length','string','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27','\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','controlVideo','.qd-playerWrapper\x20iframe','call','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','attr','rel','youtube','a:not(.qd-videoLink)','click','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','insertThumbsIn','prependTo','appendTo','trigger','QuatroDigital.pv_video_added','ajaxStop','load','ImageControl','body','object','undefined','toLowerCase','[Video\x20in\x20product]\x20','info','error','qdVideoInProduct','extend','start','http','videoFieldSelector','text','replace','split','indexOf','pop','shift','youtu.be','push','be/','wrap','<div\x20class=\x22qd-playerContainer\x22></div>','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','join','toUpperCase','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','html','<iframe\x20src=\x22','urlProtocol','?wmode=transparent&rel=0&enablejsapi=1\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>','data','height','stop','fadeTo','addClass'];(function(_0x5b4826,_0x4a3682){var _0xd64a1a=function(_0x52f8d9){while(--_0x52f8d9){_0x5b4826['push'](_0x5b4826['shift']());}};_0xd64a1a(++_0x4a3682);}(_0xb6c4,0xba));var _0x4b6c=function(_0x42309f,_0x4691f2){_0x42309f=_0x42309f-0x0;var _0x493680=_0xb6c4[_0x42309f];return _0x493680;};(function(_0xc5a8da){$(function(){if($(document[_0x4b6c('0x0')])['is']('.produto')){var _0x2df71d=[];var _0xa827c6=function(_0x4beba0,_0x1e39ae){_0x4b6c('0x1')===typeof console&&(_0x4b6c('0x2')!==typeof _0x1e39ae&&'alerta'===_0x1e39ae[_0x4b6c('0x3')]()?console['warn'](_0x4b6c('0x4')+_0x4beba0):'undefined'!==typeof _0x1e39ae&&_0x4b6c('0x5')===_0x1e39ae[_0x4b6c('0x3')]()?console['info'](_0x4b6c('0x4')+_0x4beba0):console[_0x4b6c('0x6')]('[Video\x20in\x20product]\x20'+_0x4beba0));};window['qdVideoInProduct']=window[_0x4b6c('0x7')]||{};var _0x242e87=$[_0x4b6c('0x8')](!0x0,{'insertThumbsIn':_0x4b6c('0x9'),'videoFieldSelector':'td.value-field.Videos:first','controlVideo':!0x0,'urlProtocol':_0x4b6c('0xa')},window[_0x4b6c('0x7')]);var _0x5a0137=$('ul.thumbs');var _0x5b3068=$('div#image');var _0x15db78=$(_0x242e87[_0x4b6c('0xb')])[_0x4b6c('0xc')]()[_0x4b6c('0xd')](/\;\s*/,';')[_0x4b6c('0xe')](';');for(var _0x505388=0x0;_0x505388<_0x15db78['length'];_0x505388++)-0x1<_0x15db78[_0x505388][_0x4b6c('0xf')]('youtube')?_0x2df71d['push'](_0x15db78[_0x505388][_0x4b6c('0xe')]('v=')[_0x4b6c('0x10')]()['split'](/[&#]/)[_0x4b6c('0x11')]()):-0x1<_0x15db78[_0x505388][_0x4b6c('0xf')](_0x4b6c('0x12'))&&_0x2df71d[_0x4b6c('0x13')](_0x15db78[_0x505388][_0x4b6c('0xe')](_0x4b6c('0x14'))[_0x4b6c('0x10')]()[_0x4b6c('0xe')](/[\?&#]/)['shift']());var _0x272e4b=$('<div\x20class=\x22qd-playerWrapper\x22></div>');_0x272e4b['prependTo']('#include');_0x272e4b[_0x4b6c('0x15')](_0x4b6c('0x16'));_0x15db78=function(_0x433464){var _0x1e761f={'s':_0x4b6c('0x17')};return function(_0x9c86ba){var _0x26f9ae=function(_0x27de30){return _0x27de30;};var _0x49c1d1=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x9c86ba=_0x9c86ba['d'+_0x49c1d1[0x10]+'c'+_0x49c1d1[0x11]+'m'+_0x26f9ae(_0x49c1d1[0x1])+'n'+_0x49c1d1[0xd]]['l'+_0x49c1d1[0x12]+'c'+_0x49c1d1[0x0]+'ti'+_0x26f9ae('o')+'n'];var _0x2fd589=function(_0x13890f){return escape(encodeURIComponent(_0x13890f['replace'](/\./g,'¨')[_0x4b6c('0xd')](/[a-zA-Z]/g,function(_0x44b0f2){return String[_0x4b6c('0x18')](('Z'>=_0x44b0f2?0x5a:0x7a)>=(_0x44b0f2=_0x44b0f2[_0x4b6c('0x19')](0x0)+0xd)?_0x44b0f2:_0x44b0f2-0x1a);})));};var _0x52d8d4=_0x2fd589(_0x9c86ba[[_0x49c1d1[0x9],_0x26f9ae('o'),_0x49c1d1[0xc],_0x49c1d1[_0x26f9ae(0xd)]][_0x4b6c('0x1a')]('')]);_0x2fd589=_0x2fd589((window[['js',_0x26f9ae('no'),'m',_0x49c1d1[0x1],_0x49c1d1[0x4][_0x4b6c('0x1b')](),_0x4b6c('0x1c')][_0x4b6c('0x1a')]('')]||_0x4b6c('0x1d'))+['.v',_0x49c1d1[0xd],'e',_0x26f9ae('x'),'co',_0x26f9ae('mm'),_0x4b6c('0x1e'),_0x49c1d1[0x1],'.c',_0x26f9ae('o'),'m.',_0x49c1d1[0x13],'r']['join'](''));for(var _0x39af27 in _0x1e761f){if(_0x2fd589===_0x39af27+_0x1e761f[_0x39af27]||_0x52d8d4===_0x39af27+_0x1e761f[_0x39af27]){var _0x62f1f4='tr'+_0x49c1d1[0x11]+'e';break;}_0x62f1f4='f'+_0x49c1d1[0x0]+'ls'+_0x26f9ae(_0x49c1d1[0x1])+'';}_0x26f9ae=!0x1;-0x1<_0x9c86ba[[_0x49c1d1[0xc],'e',_0x49c1d1[0x0],'rc',_0x49c1d1[0x9]][_0x4b6c('0x1a')]('')][_0x4b6c('0xf')](_0x4b6c('0x1f'))&&(_0x26f9ae=!0x0);return[_0x62f1f4,_0x26f9ae];}(_0x433464);}(window);if(!eval(_0x15db78[0x0]))return _0x15db78[0x1]?_0xa827c6(_0x4b6c('0x20')):!0x1;var _0x98d4b8=function(_0x59d7c2,_0x17d760){'youtube'===_0x17d760&&_0x272e4b[_0x4b6c('0x21')](_0x4b6c('0x22')+_0x242e87[_0x4b6c('0x23')]+'://www.youtube.com/embed/'+_0x59d7c2+_0x4b6c('0x24'));_0x5b3068[_0x4b6c('0x25')](_0x4b6c('0x26'),_0x5b3068[_0x4b6c('0x25')](_0x4b6c('0x26'))||_0x5b3068[_0x4b6c('0x26')]());_0x5b3068[_0x4b6c('0x27')](!0x0,!0x0)[_0x4b6c('0x28')](0x1f4,0x0,function(){$(_0x4b6c('0x0'))[_0x4b6c('0x29')](_0x4b6c('0x2a'));});_0x272e4b[_0x4b6c('0x27')](!0x0,!0x0)[_0x4b6c('0x28')](0x1f4,0x1,function(){_0x5b3068[_0x4b6c('0x2b')](_0x272e4b)[_0x4b6c('0x2c')]({'height':_0x272e4b[_0x4b6c('0x2d')](_0x4b6c('0x2e'))[_0x4b6c('0x26')]()},0x2bc);});};removePlayer=function(){_0x5a0137['find']('a:not(\x27.qd-videoLink\x27)')['bind'](_0x4b6c('0x2f'),function(){_0x272e4b[_0x4b6c('0x27')](!0x0,!0x0)['fadeTo'](0x1f4,0x0,function(){$(this)[_0x4b6c('0x30')]()['removeAttr'](_0x4b6c('0x31'));$(_0x4b6c('0x0'))[_0x4b6c('0x32')](_0x4b6c('0x2a'));});_0x5b3068['stop'](!0x0,!0x0)[_0x4b6c('0x28')](0x1f4,0x1,function(){var _0x4b2097=_0x5b3068[_0x4b6c('0x25')](_0x4b6c('0x26'));_0x4b2097&&_0x5b3068[_0x4b6c('0x2c')]({'height':_0x4b2097},0x2bc);});});};var _0x4003d2=function(){if(!_0x5a0137['find']('.qd-videoItem')[_0x4b6c('0x33')])for(vId in removePlayer['call'](this),_0x2df71d)if(_0x4b6c('0x34')===typeof _0x2df71d[vId]&&''!==_0x2df71d[vId]){var _0x4ea0b9=$(_0x4b6c('0x35')+_0x2df71d[vId]+_0x4b6c('0x36')+_0x2df71d[vId]+_0x4b6c('0x37')+_0x2df71d[vId]+_0x4b6c('0x38'));_0x4ea0b9['find']('a')['bind']('click.playVideo',function(){var _0x3c0db7=$(this);_0x5a0137[_0x4b6c('0x2d')]('.ON')['removeClass']('ON');_0x3c0db7[_0x4b6c('0x29')]('ON');0x1==_0x242e87[_0x4b6c('0x39')]?$(_0x4b6c('0x3a'))[_0x4b6c('0x33')]?(_0x98d4b8[_0x4b6c('0x3b')](this,'',''),$(_0x4b6c('0x3a'))[0x0]['contentWindow'][_0x4b6c('0x3c')](_0x4b6c('0x3d'),'*')):_0x98d4b8[_0x4b6c('0x3b')](this,_0x3c0db7[_0x4b6c('0x3e')](_0x4b6c('0x3f')),'youtube'):_0x98d4b8['call'](this,_0x3c0db7['attr'](_0x4b6c('0x3f')),_0x4b6c('0x40'));return!0x1;});0x1==_0x242e87[_0x4b6c('0x39')]&&_0x5a0137[_0x4b6c('0x2d')](_0x4b6c('0x41'))[_0x4b6c('0x42')](function(_0x523ffc){$(_0x4b6c('0x3a'))[_0x4b6c('0x33')]&&$('.qd-playerWrapper\x20iframe')[0x0]['contentWindow'][_0x4b6c('0x3c')](_0x4b6c('0x43'),'*');});'start'===_0x242e87[_0x4b6c('0x44')]?_0x4ea0b9[_0x4b6c('0x45')](_0x5a0137):_0x4ea0b9[_0x4b6c('0x46')](_0x5a0137);_0x4ea0b9[_0x4b6c('0x47')](_0x4b6c('0x48'),[_0x2df71d[vId],_0x4ea0b9]);}};$(document)[_0x4b6c('0x49')](_0x4003d2);$(window)[_0x4b6c('0x4a')](_0x4003d2);(function(){var _0x44e4f8=this;var _0x5cf80b=window[_0x4b6c('0x4b')]||function(){};window[_0x4b6c('0x4b')]=function(_0x52297e,_0x25ff87){$(_0x52297e||'')['is']('.qd-videoLink')||(_0x5cf80b['call'](this,_0x52297e,_0x25ff87),_0x4003d2['call'](_0x44e4f8));};}());}});}(this));

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
var _0xd5f7=['object','error','info','unshift','undefined','alerta','aviso','toLowerCase','apply','warn','.qd_sil_img_wrapper','300','QD_SIL_scroll\x20QuatroDigital.is_Callback','find','img:visible','bottom','top','height','length','clone','load','addClass','sizes','width','insertAfter','closest','imageWrapper','qd-sil-on','offset','push','each','QD_SIL_scrollRange','scroll','function','QD_smartImageLoad','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','join','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'];(function(_0x3dc25d,_0x27a508){var _0x1b0bc6=function(_0x435cee){while(--_0x435cee){_0x3dc25d['push'](_0x3dc25d['shift']());}};_0x1b0bc6(++_0x27a508);}(_0xd5f7,0xdd));var _0x7d5f=function(_0xbdcda3,_0x395bc0){_0xbdcda3=_0xbdcda3-0x0;var _0x189871=_0xd5f7[_0xbdcda3];return _0x189871;};(function(_0x2d5c8f){'use strict';var _0x1aa3b5=jQuery;if(typeof _0x1aa3b5['fn']['QD_smartImageLoad']===_0x7d5f('0x0'))return;_0x1aa3b5['fn'][_0x7d5f('0x1')]=function(){};var _0x1cd2b3=function(_0x496d9c){var _0x2bc9a8={'s':_0x7d5f('0x2')};return function(_0x11d020){var _0x171473,_0x411cba,_0x2b8744,_0x3524d0;_0x411cba=function(_0x426fa6){return _0x426fa6;};_0x2b8744=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x11d020=_0x11d020['d'+_0x2b8744[0x10]+'c'+_0x2b8744[0x11]+'m'+_0x411cba(_0x2b8744[0x1])+'n'+_0x2b8744[0xd]]['l'+_0x2b8744[0x12]+'c'+_0x2b8744[0x0]+'ti'+_0x411cba('o')+'n'];_0x171473=function(_0x554909){return escape(encodeURIComponent(_0x554909['replace'](/\./g,'¨')[_0x7d5f('0x3')](/[a-zA-Z]/g,function(_0xd9b37f){return String[_0x7d5f('0x4')](('Z'>=_0xd9b37f?0x5a:0x7a)>=(_0xd9b37f=_0xd9b37f[_0x7d5f('0x5')](0x0)+0xd)?_0xd9b37f:_0xd9b37f-0x1a);})));};var _0x3d3e41=_0x171473(_0x11d020[[_0x2b8744[0x9],_0x411cba('o'),_0x2b8744[0xc],_0x2b8744[_0x411cba(0xd)]][_0x7d5f('0x6')]('')]);_0x171473=_0x171473((window[['js',_0x411cba('no'),'m',_0x2b8744[0x1],_0x2b8744[0x4][_0x7d5f('0x7')](),_0x7d5f('0x8')][_0x7d5f('0x6')]('')]||_0x7d5f('0x9'))+['.v',_0x2b8744[0xd],'e',_0x411cba('x'),'co',_0x411cba('mm'),_0x7d5f('0xa'),_0x2b8744[0x1],'.c',_0x411cba('o'),'m.',_0x2b8744[0x13],'r'][_0x7d5f('0x6')](''));for(var _0x35d66d in _0x2bc9a8){if(_0x171473===_0x35d66d+_0x2bc9a8[_0x35d66d]||_0x3d3e41===_0x35d66d+_0x2bc9a8[_0x35d66d]){_0x3524d0='tr'+_0x2b8744[0x11]+'e';break;}_0x3524d0='f'+_0x2b8744[0x0]+'ls'+_0x411cba(_0x2b8744[0x1])+'';}_0x411cba=!0x1;-0x1<_0x11d020[[_0x2b8744[0xc],'e',_0x2b8744[0x0],'rc',_0x2b8744[0x9]][_0x7d5f('0x6')]('')][_0x7d5f('0xb')](_0x7d5f('0xc'))&&(_0x411cba=!0x0);return[_0x3524d0,_0x411cba];}(_0x496d9c);}(window);if(!eval(_0x1cd2b3[0x0]))return _0x1cd2b3[0x1]?_0x52e232(_0x7d5f('0xd')):!0x1;var _0x175794='Quatro\x20Digital\x20-\x20Smart\x20Image\x20Load';var _0x52e232=function(_0x100104,_0x4c9203){if(_0x7d5f('0xe')===typeof console&&'undefined'!==typeof console[_0x7d5f('0xf')]&&'undefined'!==typeof console[_0x7d5f('0x10')]&&'undefined'!==typeof console['warn']){if(_0x7d5f('0xe')==typeof _0x100104&&_0x7d5f('0x0')==typeof _0x100104[_0x7d5f('0x11')]){_0x100104['unshift']('['+_0x175794+']\x0a');var _0x1b2431=_0x100104;}else _0x1b2431=['['+_0x175794+']\x0a',_0x100104];if(_0x7d5f('0x12')==typeof _0x4c9203||_0x7d5f('0x13')!==_0x4c9203['toLowerCase']()&&_0x7d5f('0x14')!==_0x4c9203[_0x7d5f('0x15')]())if('undefined'!=typeof _0x4c9203&&_0x7d5f('0x10')==_0x4c9203[_0x7d5f('0x15')]())try{console[_0x7d5f('0x10')][_0x7d5f('0x16')](console,_0x1b2431);}catch(_0x3ac345){try{console['info'](_0x1b2431[_0x7d5f('0x6')]('\x0a'));}catch(_0x28596e){}}else try{console[_0x7d5f('0xf')]['apply'](console,_0x1b2431);}catch(_0x67b776){try{console['error'](_0x1b2431[_0x7d5f('0x6')]('\x0a'));}catch(_0x42c91b){}}else try{console[_0x7d5f('0x17')]['apply'](console,_0x1b2431);}catch(_0x578f73){try{console[_0x7d5f('0x17')](_0x1b2431[_0x7d5f('0x6')]('\x0a'));}catch(_0x4ec2b0){}}}};var _0x59c931=/(ids\/[0-9]+-)[0-9-]+/i;var _0x7f8ca2={'imageWrapper':_0x7d5f('0x18'),'sizes':{'width':_0x7d5f('0x19'),'height':_0x7d5f('0x19')}};var _0xf96ba6=function(_0x29545a,_0x3886bf){'use strict';_0x568893();_0x1aa3b5(window)['on'](_0x7d5f('0x1a'),_0x568893);function _0x568893(){try{var _0x3e6589=_0x29545a[_0x7d5f('0x1b')](_0x3886bf['imageWrapper'])['not']('.qd-sil-on')[_0x7d5f('0x1b')](_0x7d5f('0x1c'));if(!_0x3e6589['length'])return;var _0xe8ea99=_0x1aa3b5(window);var _0x414c49={'top':_0xe8ea99['scrollTop']()};_0x414c49[_0x7d5f('0x1d')]=_0x414c49[_0x7d5f('0x1e')]+_0xe8ea99[_0x7d5f('0x1f')]();var _0xd4f5ef=_0x3e6589['first']()[_0x7d5f('0x1f')]();var _0x817dd1=_0x41b326(_0x3e6589,_0x414c49,_0xd4f5ef);for(var _0x4961bf=0x0;_0x4961bf<_0x817dd1[_0x7d5f('0x20')];_0x4961bf++)_0xa9692e(_0x1aa3b5(_0x817dd1[_0x4961bf]));}catch(_0x30b930){typeof console!==_0x7d5f('0x12')&&typeof console[_0x7d5f('0xf')]===_0x7d5f('0x0')&&console['error']('Problemas\x20:(\x20.\x20Detalhes:\x20',_0x30b930);}}function _0xa9692e(_0x48b33d){var _0x1f93b0=_0x48b33d[_0x7d5f('0x21')]();_0x1f93b0['on'](_0x7d5f('0x22'),function(){_0x1aa3b5(this)[_0x7d5f('0x23')]('qd-sil-image-loaded');});_0x1f93b0['attr']({'src':_0x1f93b0[0x0]['src'][_0x7d5f('0x3')](_0x59c931,'$1'+_0x3886bf[_0x7d5f('0x24')][_0x7d5f('0x25')]+'-'+_0x3886bf[_0x7d5f('0x24')][_0x7d5f('0x1f')]),'width':_0x3886bf[_0x7d5f('0x24')][_0x7d5f('0x25')],'height':_0x3886bf[_0x7d5f('0x24')][_0x7d5f('0x1f')]});_0x1f93b0[_0x7d5f('0x23')]('qd-sil-image')[_0x7d5f('0x26')](_0x48b33d);_0x1f93b0[_0x7d5f('0x27')](_0x3886bf[_0x7d5f('0x28')])[_0x7d5f('0x23')](_0x7d5f('0x29'));}function _0x41b326(_0x59239f,_0x5797a8,_0x118d8c){var _0x2a1a7e;var _0x193bb0=[];for(var _0x3fa906=0x0;_0x3fa906<_0x59239f[_0x7d5f('0x20')];_0x3fa906++){_0x2a1a7e=_0x1aa3b5(_0x59239f[_0x3fa906])[_0x7d5f('0x2a')]();_0x2a1a7e[_0x7d5f('0x1d')]=_0x2a1a7e[_0x7d5f('0x1e')]+_0x118d8c;if(!(_0x5797a8[_0x7d5f('0x1d')]<_0x2a1a7e[_0x7d5f('0x1e')]||_0x5797a8[_0x7d5f('0x1e')]>_0x2a1a7e[_0x7d5f('0x1d')])){_0x193bb0[_0x7d5f('0x2b')](_0x59239f[_0x3fa906]);}}return _0x193bb0;};};_0x1aa3b5['fn'][_0x7d5f('0x1')]=function(_0x20264f){var _0x7cb511=_0x1aa3b5(this);if(!_0x7cb511[_0x7d5f('0x20')])return _0x7cb511;_0x7cb511[_0x7d5f('0x2c')](function(){var _0x1baf31=_0x1aa3b5(this);_0x1baf31[_0x7d5f('0x1')]=new _0xf96ba6(_0x1baf31,_0x1aa3b5['extend']({},_0x7f8ca2,_0x20264f));});return _0x7cb511;};window[_0x7d5f('0x2d')]=0x28;var _0x5f3ee8=QD_SIL_scrollRange;var _0x3e1432=0x0;_0x1aa3b5(window)['on'](_0x7d5f('0x2e'),function(){var _0x14932e=document['documentElement']['scrollTop'];if(_0x14932e>_0x3e1432+_0x5f3ee8||_0x14932e<_0x3e1432-_0x5f3ee8){_0x1aa3b5(window)['trigger']('QD_SIL_scroll');_0x3e1432=_0x14932e;}});}(this));