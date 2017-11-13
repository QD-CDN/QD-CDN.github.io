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

			$('.header-qd-v1-navigator-close').click(function () {
				$(document.body).removeClass('qd-sn-on');
				$('.search-qd-v1-navigator-close').addClass('hide');
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
			$('.shelf-qd-v1').QD_smartImageLoad({
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
		showCustomize: function() {
			var link = $('<a>').attr('href', '#').addClass('qd-product-customize').text('Personalizar');
			
			$('.product-qd-v1-sku-selection-box .product-qd-v1-buy-button').prepend(link);
			
			$('.qd-product-customize').on("click", function(){
				if($('a.buy-button[href*="javascript"]').length) {
					$('a.buy-button')[0].click();
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
				modalItems += '<fieldset><label class="checkbox"><input type="checkbox" value="autorizado"> Autorizo a Flicka Kids a retirar o produto da embalagem, para realizara personalização por mim escolhida.</label></fieldset>';
				modal.find('.qd-customize-items').append($.parseHTML(modalItems));
				
				var modalFooter = '<a href="javascript: void(0);" class="qd-customize-close" data-dismiss="modal">Não quero personalizar o produto</a>'; 
				modal.find('.modal-footer').append([$.parseHTML(modalFooter), $('<div class="qd-customize-price"></div>'), $('<div class="product-qd-v1-buy-button"></div>')]);
				modal.find('.modal-footer .qd-customize-price').append($.parseHTML('Valor com a personalização:<span class="total-price">R$299,90</span>'));
				modal.find('.modal-footer .product-qd-v1-buy-button').append($('.product-qd-v1-sku-selection-box .buy-button').first().clone().text('Comprar personalizado'));

				modal.insertAfter($('.qd-v1-modal').first());
				modal.modal();

				modal.on('hidden.bs.modal', function(e) {
					$(this).remove();
				});

				$('.qd-customize-items select').on("change", function() {
					var imgUrl = '/arquivos/' + $(this).val() + '.png';
					imgUrl = '/arquivos/icone-amazing-exemplo.png';
					updateCustomize(null, imgUrl, null);

					if($(this).val())
						$(this).closest('.input-group').addClass('filled');
					else 
						$(this).closest('.input-group').removeClass('filled'); 
				});

				$('.qd-customize-items input[type="radio"]').on("click", function() {
					$('.input-group-radio .radio-inline').removeClass('checked');
					$(this).closest('.radio-inline').addClass('checked');

					updateCustomize(null, null, $(this).val());
				});

				$('input[type="text"], button','.qd-customize-items').on("click keyup", function(){
					var input =$(this).closest('fieldset').find('input');
					updateCustomize(input.val());
					
					if(input.val())
						input.closest('.input-group').addClass('filled');
					else 
						input.closest('.input-group').removeClass('filled'); 

				});

				function updateCustomize(text, imageUrl, font) {
					if(!$('.qd-customize-area #qd_customize_nome').length)
						$('.qd-customize-area').append($('<div id="qd_customize_nome">'));
					
					wrapperCustomize = $('.qd-customize-area #qd_customize_nome');
					
					
					
					var wrapperText = wrapperCustomize.find('span').length ? wrapperCustomize.find('span') : $('<span></span>').appendTo(wrapperCustomize);
					if(text)
						wrapperText.text(text);
					if(font)
						wrapperText.css('font-family', font);

					if(imageUrl) {
						var wrapperImg = wrapperCustomize.find('img').length ? wrapperCustomize.find('img') : $('<img>').appendTo(wrapperCustomize);
						wrapperImg.attr('src', imageUrl);	
					}

				}
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
var _0x1dd3=['each','find','hide','qd-ssa-hide','qd-ssa-show','filter','[data-qd-ssa-text=\x22','length','html','replace','show','message','qd-ssa-skus-','skus','split','sku','QuatroDigital.ssa.prodUnavailable','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','vtex.sku.selected.QD','qd-ssa-sku-prod-unavailable','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','join','ite','---','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','QD_smartStockAvailable','initialSkuSelected','trigger','prod','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','unavailable','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','available','off','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','qdAjax','qdAjaxQueue','extend','url','opts','push','success','call','parameters','callbackFns','successPopulated','boolean','errorPopulated','completePopulated','object','error','complete','clearQueueDelay','jqXHR','readyState','data','errorThrown','textStatus','version','2.1','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','function','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','alerta','toLowerCase','aviso','undefined','info','apply','warn','removeClass','qd-ssa-sku-no-selected','addClass','AvailableQuantity','attr'];(function(_0x2b8079,_0x8609f1){var _0x1c3e43=function(_0x51f264){while(--_0x51f264){_0x2b8079['push'](_0x2b8079['shift']());}};_0x1c3e43(++_0x8609f1);}(_0x1dd3,0x1b7));var _0x31dd=function(_0x83c5ec,_0x481b55){_0x83c5ec=_0x83c5ec-0x0;var _0x2d3274=_0x1dd3[_0x83c5ec];return _0x2d3274;};(function(_0x29327a){if('function'!==typeof _0x29327a[_0x31dd('0x0')]){var _0x49c28b={};_0x29327a[_0x31dd('0x1')]=_0x49c28b;_0x29327a[_0x31dd('0x0')]=function(_0x2478f1){var _0xd12922=_0x29327a[_0x31dd('0x2')]({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x2478f1);var _0x2c7e4d=escape(encodeURIComponent(_0xd12922[_0x31dd('0x3')]));_0x49c28b[_0x2c7e4d]=_0x49c28b[_0x2c7e4d]||{};_0x49c28b[_0x2c7e4d][_0x31dd('0x4')]=_0x49c28b[_0x2c7e4d][_0x31dd('0x4')]||[];_0x49c28b[_0x2c7e4d][_0x31dd('0x4')][_0x31dd('0x5')]({'success':function(_0x8a1e9,_0x143876,_0x302268){_0xd12922[_0x31dd('0x6')][_0x31dd('0x7')](this,_0x8a1e9,_0x143876,_0x302268);},'error':function(_0x1ef084,_0x4db674,_0x137eb3){_0xd12922['error'][_0x31dd('0x7')](this,_0x1ef084,_0x4db674,_0x137eb3);},'complete':function(_0x3812bb,_0x498723){_0xd12922['complete']['call'](this,_0x3812bb,_0x498723);}});_0x49c28b[_0x2c7e4d]['parameters']=_0x49c28b[_0x2c7e4d][_0x31dd('0x8')]||{'success':{},'error':{},'complete':{}};_0x49c28b[_0x2c7e4d][_0x31dd('0x9')]=_0x49c28b[_0x2c7e4d][_0x31dd('0x9')]||{};_0x49c28b[_0x2c7e4d][_0x31dd('0x9')][_0x31dd('0xa')]=_0x31dd('0xb')===typeof _0x49c28b[_0x2c7e4d]['callbackFns']['successPopulated']?_0x49c28b[_0x2c7e4d][_0x31dd('0x9')][_0x31dd('0xa')]:!0x1;_0x49c28b[_0x2c7e4d][_0x31dd('0x9')]['errorPopulated']=_0x31dd('0xb')===typeof _0x49c28b[_0x2c7e4d][_0x31dd('0x9')][_0x31dd('0xc')]?_0x49c28b[_0x2c7e4d][_0x31dd('0x9')][_0x31dd('0xc')]:!0x1;_0x49c28b[_0x2c7e4d][_0x31dd('0x9')][_0x31dd('0xd')]=_0x31dd('0xb')===typeof _0x49c28b[_0x2c7e4d][_0x31dd('0x9')][_0x31dd('0xd')]?_0x49c28b[_0x2c7e4d]['callbackFns']['completePopulated']:!0x1;_0x2478f1=_0x29327a[_0x31dd('0x2')]({},_0xd12922,{'success':function(_0x2730ba,_0x3ccd84,_0x1fd091){_0x49c28b[_0x2c7e4d][_0x31dd('0x8')]['success']={'data':_0x2730ba,'textStatus':_0x3ccd84,'jqXHR':_0x1fd091};_0x49c28b[_0x2c7e4d][_0x31dd('0x9')]['successPopulated']=!0x0;for(var _0x19c381 in _0x49c28b[_0x2c7e4d][_0x31dd('0x4')])_0x31dd('0xe')===typeof _0x49c28b[_0x2c7e4d][_0x31dd('0x4')][_0x19c381]&&(_0x49c28b[_0x2c7e4d][_0x31dd('0x4')][_0x19c381][_0x31dd('0x6')][_0x31dd('0x7')](this,_0x2730ba,_0x3ccd84,_0x1fd091),_0x49c28b[_0x2c7e4d][_0x31dd('0x4')][_0x19c381][_0x31dd('0x6')]=function(){});},'error':function(_0xdb33b1,_0x3a7bed,_0x4f66c5){_0x49c28b[_0x2c7e4d][_0x31dd('0x8')]['error']={'errorThrown':_0x4f66c5,'textStatus':_0x3a7bed,'jqXHR':_0xdb33b1};_0x49c28b[_0x2c7e4d][_0x31dd('0x9')][_0x31dd('0xc')]=!0x0;for(var _0x1eb078 in _0x49c28b[_0x2c7e4d]['opts'])_0x31dd('0xe')===typeof _0x49c28b[_0x2c7e4d][_0x31dd('0x4')][_0x1eb078]&&(_0x49c28b[_0x2c7e4d][_0x31dd('0x4')][_0x1eb078][_0x31dd('0xf')]['call'](this,_0xdb33b1,_0x3a7bed,_0x4f66c5),_0x49c28b[_0x2c7e4d]['opts'][_0x1eb078][_0x31dd('0xf')]=function(){});},'complete':function(_0x3919dd,_0x199376){_0x49c28b[_0x2c7e4d][_0x31dd('0x8')]['complete']={'textStatus':_0x199376,'jqXHR':_0x3919dd};_0x49c28b[_0x2c7e4d][_0x31dd('0x9')][_0x31dd('0xd')]=!0x0;for(var _0x3109a8 in _0x49c28b[_0x2c7e4d][_0x31dd('0x4')])'object'===typeof _0x49c28b[_0x2c7e4d]['opts'][_0x3109a8]&&(_0x49c28b[_0x2c7e4d][_0x31dd('0x4')][_0x3109a8]['complete'][_0x31dd('0x7')](this,_0x3919dd,_0x199376),_0x49c28b[_0x2c7e4d][_0x31dd('0x4')][_0x3109a8][_0x31dd('0x10')]=function(){});isNaN(parseInt(_0xd12922[_0x31dd('0x11')]))||setTimeout(function(){_0x49c28b[_0x2c7e4d][_0x31dd('0x12')]=void 0x0;_0x49c28b[_0x2c7e4d]['opts']=void 0x0;_0x49c28b[_0x2c7e4d]['parameters']=void 0x0;_0x49c28b[_0x2c7e4d][_0x31dd('0x9')]=void 0x0;},_0xd12922[_0x31dd('0x11')]);}});'undefined'===typeof _0x49c28b[_0x2c7e4d]['jqXHR']?_0x49c28b[_0x2c7e4d]['jqXHR']=_0x29327a['ajax'](_0x2478f1):_0x49c28b[_0x2c7e4d][_0x31dd('0x12')]&&_0x49c28b[_0x2c7e4d]['jqXHR'][_0x31dd('0x13')]&&0x4==_0x49c28b[_0x2c7e4d][_0x31dd('0x12')][_0x31dd('0x13')]&&(_0x49c28b[_0x2c7e4d][_0x31dd('0x9')][_0x31dd('0xa')]&&_0x2478f1[_0x31dd('0x6')](_0x49c28b[_0x2c7e4d][_0x31dd('0x8')][_0x31dd('0x6')][_0x31dd('0x14')],_0x49c28b[_0x2c7e4d][_0x31dd('0x8')][_0x31dd('0x6')]['textStatus'],_0x49c28b[_0x2c7e4d]['parameters'][_0x31dd('0x6')][_0x31dd('0x12')]),_0x49c28b[_0x2c7e4d][_0x31dd('0x9')]['errorPopulated']&&_0x2478f1[_0x31dd('0xf')](_0x49c28b[_0x2c7e4d][_0x31dd('0x8')][_0x31dd('0xf')][_0x31dd('0x12')],_0x49c28b[_0x2c7e4d][_0x31dd('0x8')][_0x31dd('0xf')]['textStatus'],_0x49c28b[_0x2c7e4d][_0x31dd('0x8')][_0x31dd('0xf')][_0x31dd('0x15')]),_0x49c28b[_0x2c7e4d][_0x31dd('0x9')][_0x31dd('0xd')]&&_0x2478f1[_0x31dd('0x10')](_0x49c28b[_0x2c7e4d][_0x31dd('0x8')][_0x31dd('0x10')][_0x31dd('0x12')],_0x49c28b[_0x2c7e4d]['parameters'][_0x31dd('0x10')][_0x31dd('0x16')]));};_0x29327a[_0x31dd('0x0')][_0x31dd('0x17')]=_0x31dd('0x18');}}(jQuery));(function(_0x1c700a){function _0x500e1e(_0x76b507,_0x496b09){_0xb0800f[_0x31dd('0x0')]({'url':'/produto/sku/'+_0x76b507,'clearQueueDelay':null,'success':_0x496b09,'error':function(){_0x5852fd(_0x31dd('0x19'));}});}var _0xb0800f=jQuery;if(_0x31dd('0x1a')!==typeof _0xb0800f['fn']['QD_smartStockAvailable']){var _0x5852fd=function(_0x390964,_0x5982a7){if(_0x31dd('0xe')===typeof console){var _0x34ac2b;_0x31dd('0xe')===typeof _0x390964?(_0x390964[_0x31dd('0x1b')]('[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a'),_0x34ac2b=_0x390964):_0x34ac2b=[_0x31dd('0x1c')+_0x390964];'undefined'===typeof _0x5982a7||_0x31dd('0x1d')!==_0x5982a7[_0x31dd('0x1e')]()&&_0x31dd('0x1f')!==_0x5982a7[_0x31dd('0x1e')]()?_0x31dd('0x20')!==typeof _0x5982a7&&_0x31dd('0x21')===_0x5982a7[_0x31dd('0x1e')]()?console[_0x31dd('0x21')][_0x31dd('0x22')](console,_0x34ac2b):console['error'][_0x31dd('0x22')](console,_0x34ac2b):console[_0x31dd('0x23')]['apply'](console,_0x34ac2b);}},_0x27dfd4={},_0x3c2553=function(_0x449211,_0x12c549){function _0x1361c1(_0x1850c4){try{_0x449211[_0x31dd('0x24')](_0x31dd('0x25'))[_0x31dd('0x26')]('qd-ssa-sku-selected');var _0x4845a9=_0x1850c4[0x0]['SkuSellersInformation'][0x0][_0x31dd('0x27')];_0x449211[_0x31dd('0x28')]('data-qd-ssa-qtt',_0x4845a9);_0x449211[_0x31dd('0x29')](function(){var _0x449211=_0xb0800f(this)[_0x31dd('0x2a')]('[data-qd-ssa-text]');if(0x1>_0x4845a9)return _0x449211[_0x31dd('0x2b')]()[_0x31dd('0x26')](_0x31dd('0x2c'))[_0x31dd('0x24')](_0x31dd('0x2d'));var _0x1850c4=_0x449211[_0x31dd('0x2e')](_0x31dd('0x2f')+_0x4845a9+'\x22]');_0x1850c4=_0x1850c4[_0x31dd('0x30')]?_0x1850c4:_0x449211['filter']('[data-qd-ssa-text=\x22default\x22]');_0x449211[_0x31dd('0x2b')]()[_0x31dd('0x26')](_0x31dd('0x2c'))[_0x31dd('0x24')](_0x31dd('0x2d'));_0x1850c4['html']((_0x1850c4[_0x31dd('0x31')]()||'')[_0x31dd('0x32')]('#qtt',_0x4845a9));_0x1850c4[_0x31dd('0x33')]()['addClass']('qd-ssa-show')['removeClass'](_0x31dd('0x2c'));});}catch(_0x2088c9){_0x5852fd(['Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20',_0x2088c9[_0x31dd('0x34')]]);}}if(_0x449211[_0x31dd('0x30')]){_0x449211[_0x31dd('0x26')]('qd-ssa-on');_0x449211['addClass'](_0x31dd('0x25'));try{_0x449211[_0x31dd('0x26')](_0x31dd('0x35')+vtxctx[_0x31dd('0x36')][_0x31dd('0x37')](';')[_0x31dd('0x30')]);}catch(_0x39bb2d){_0x5852fd(['Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20',_0x39bb2d[_0x31dd('0x34')]]);}_0xb0800f(window)['on']('vtex.sku.selected\x20QuatroDigital.ssa.skuSelected',function(_0x828125,_0x2dab5d,_0x3a1061){try{_0x500e1e(_0x3a1061[_0x31dd('0x38')],function(_0x20f35b){_0x1361c1(_0x20f35b);0x1===vtxctx[_0x31dd('0x36')][_0x31dd('0x37')](';')[_0x31dd('0x30')]&&0x0==_0x20f35b[0x0]['SkuSellersInformation'][0x0][_0x31dd('0x27')]&&_0xb0800f(window)['trigger'](_0x31dd('0x39'));});}catch(_0x3ae470){_0x5852fd([_0x31dd('0x3a'),_0x3ae470[_0x31dd('0x34')]]);}});_0xb0800f(window)['off'](_0x31dd('0x3b'));_0xb0800f(window)['on'](_0x31dd('0x39'),function(){_0x449211[_0x31dd('0x26')](_0x31dd('0x3c'))['hide']();});}};_0x1c700a=function(_0x2e8386){var _0x2750b8={'s':_0x31dd('0x3d')};return function(_0x4e7e1d){var _0x43b3cb=function(_0x4aa759){return _0x4aa759;};var _0x3cb649=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4e7e1d=_0x4e7e1d['d'+_0x3cb649[0x10]+'c'+_0x3cb649[0x11]+'m'+_0x43b3cb(_0x3cb649[0x1])+'n'+_0x3cb649[0xd]]['l'+_0x3cb649[0x12]+'c'+_0x3cb649[0x0]+'ti'+_0x43b3cb('o')+'n'];var _0x5f2333=function(_0x22f337){return escape(encodeURIComponent(_0x22f337[_0x31dd('0x32')](/\./g,'¨')[_0x31dd('0x32')](/[a-zA-Z]/g,function(_0x69cecd){return String['fromCharCode'](('Z'>=_0x69cecd?0x5a:0x7a)>=(_0x69cecd=_0x69cecd[_0x31dd('0x3e')](0x0)+0xd)?_0x69cecd:_0x69cecd-0x1a);})));};var _0x31e3e4=_0x5f2333(_0x4e7e1d[[_0x3cb649[0x9],_0x43b3cb('o'),_0x3cb649[0xc],_0x3cb649[_0x43b3cb(0xd)]][_0x31dd('0x3f')]('')]);_0x5f2333=_0x5f2333((window[['js',_0x43b3cb('no'),'m',_0x3cb649[0x1],_0x3cb649[0x4]['toUpperCase'](),_0x31dd('0x40')][_0x31dd('0x3f')]('')]||_0x31dd('0x41'))+['.v',_0x3cb649[0xd],'e',_0x43b3cb('x'),'co',_0x43b3cb('mm'),'erc',_0x3cb649[0x1],'.c',_0x43b3cb('o'),'m.',_0x3cb649[0x13],'r']['join'](''));for(var _0x553e5d in _0x2750b8){if(_0x5f2333===_0x553e5d+_0x2750b8[_0x553e5d]||_0x31e3e4===_0x553e5d+_0x2750b8[_0x553e5d]){var _0x5cb9fd='tr'+_0x3cb649[0x11]+'e';break;}_0x5cb9fd='f'+_0x3cb649[0x0]+'ls'+_0x43b3cb(_0x3cb649[0x1])+'';}_0x43b3cb=!0x1;-0x1<_0x4e7e1d[[_0x3cb649[0xc],'e',_0x3cb649[0x0],'rc',_0x3cb649[0x9]][_0x31dd('0x3f')]('')][_0x31dd('0x42')](_0x31dd('0x43'))&&(_0x43b3cb=!0x0);return[_0x5cb9fd,_0x43b3cb];}(_0x2e8386);}(window);if(!eval(_0x1c700a[0x0]))return _0x1c700a[0x1]?_0x5852fd('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0xb0800f['fn'][_0x31dd('0x44')]=function(_0x3f6b09){var _0x43ac83=_0xb0800f(this);_0x3f6b09=_0xb0800f[_0x31dd('0x2')](!0x0,{},_0x27dfd4,_0x3f6b09);_0x43ac83['qdPlugin']=new _0x3c2553(_0x43ac83,_0x3f6b09);try{_0x31dd('0xe')===typeof _0xb0800f['fn'][_0x31dd('0x44')][_0x31dd('0x45')]&&_0xb0800f(window)[_0x31dd('0x46')]('QuatroDigital.ssa.skuSelected',[_0xb0800f['fn']['QD_smartStockAvailable']['initialSkuSelected'][_0x31dd('0x47')],_0xb0800f['fn'][_0x31dd('0x44')][_0x31dd('0x45')]['sku']]);}catch(_0x1ad6b7){_0x5852fd([_0x31dd('0x48'),_0x1ad6b7[_0x31dd('0x34')]]);}_0xb0800f['fn'][_0x31dd('0x44')][_0x31dd('0x49')]&&_0xb0800f(window)[_0x31dd('0x46')](_0x31dd('0x39'));return _0x43ac83;};_0xb0800f(window)['on']('vtex.sku.selected.QD',function(_0x370013,_0x1de80e,_0x49b21d){try{_0xb0800f['fn'][_0x31dd('0x44')]['initialSkuSelected']={'prod':_0x1de80e,'sku':_0x49b21d},_0xb0800f(this)['off'](_0x370013);}catch(_0x17912e){_0x5852fd([_0x31dd('0x4a'),_0x17912e[_0x31dd('0x34')]]);}});_0xb0800f(window)['on'](_0x31dd('0x4b'),function(_0x27418e,_0x1b78f2,_0x5647d3){try{for(var _0xf30753=_0x5647d3[_0x31dd('0x30')],_0x19ac4e=_0x1b78f2=0x0;_0x19ac4e<_0xf30753&&!_0x5647d3[_0x19ac4e][_0x31dd('0x4c')];_0x19ac4e++)_0x1b78f2+=0x1;_0xf30753<=_0x1b78f2&&(_0xb0800f['fn']['QD_smartStockAvailable'][_0x31dd('0x49')]=!0x0);_0xb0800f(this)[_0x31dd('0x4d')](_0x27418e);}catch(_0xe4cca6){_0x5852fd([_0x31dd('0x4e'),_0xe4cca6[_0x31dd('0x34')]]);}});_0xb0800f(function(){_0xb0800f(_0x31dd('0x4f'))[_0x31dd('0x44')]();});}}(window));
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
var _0x451c=['getParent','closest','function','QD_amazingMenu','object','error','info','undefined','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','toLowerCase','apply','join','qdAmAddNdx','each','addClass','qd-am-first','qd-am-last','replace','fromCharCode','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','qd-am-banner-wrapper','parent','qd-am-collection-wrapper','qdAjax','url','html','img[alt=\x27','attr','data-qdam-value','.box-banner','clone','insertBefore','hide','qd-am-content-loaded','trim','[class*=\x27colunas\x27]','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','trigger','QuatroDigital.am.ajaxCallback','UL\x20do\x20menu\x20não\x20encontrada','alerta','li\x20>ul','qd-am-has-ul','children',':not(ul)','text','replaceSpecialChars','>li','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','qd-am-','-li','callback','call','QuatroDigital.am.callback','extend','exec'];(function(_0x3fc339,_0x447af6){var _0xebc378=function(_0x22949c){while(--_0x22949c){_0x3fc339['push'](_0x3fc339['shift']());}};_0xebc378(++_0x447af6);}(_0x451c,0x128));var _0xc451=function(_0x1da718,_0x3285fa){_0x1da718=_0x1da718-0x0;var _0x3aa47c=_0x451c[_0x1da718];return _0x3aa47c;};(function(_0x3cf9ee){_0x3cf9ee['fn'][_0xc451('0x0')]=_0x3cf9ee['fn'][_0xc451('0x1')];}(jQuery));(function(_0x387591){var _0x4eda82;var _0x39ad6f=jQuery;if(_0xc451('0x2')!==typeof _0x39ad6f['fn'][_0xc451('0x3')]){var _0x5d03ed={'url':'/qd-amazing-menu','callback':function(){},'ajaxCallback':function(){}};var _0x1b7fe6=function(_0x1a620d,_0x21ea3a){if(_0xc451('0x4')===typeof console&&'undefined'!==typeof console[_0xc451('0x5')]&&'undefined'!==typeof console[_0xc451('0x6')]&&_0xc451('0x7')!==typeof console[_0xc451('0x8')]){var _0x46cc9a;'object'===typeof _0x1a620d?(_0x1a620d[_0xc451('0x9')](_0xc451('0xa')),_0x46cc9a=_0x1a620d):_0x46cc9a=[_0xc451('0xa')+_0x1a620d];if(_0xc451('0x7')===typeof _0x21ea3a||'alerta'!==_0x21ea3a[_0xc451('0xb')]()&&'aviso'!==_0x21ea3a[_0xc451('0xb')]())if(_0xc451('0x7')!==typeof _0x21ea3a&&_0xc451('0x6')===_0x21ea3a[_0xc451('0xb')]())try{console[_0xc451('0x6')][_0xc451('0xc')](console,_0x46cc9a);}catch(_0x2fed67){try{console[_0xc451('0x6')](_0x46cc9a[_0xc451('0xd')]('\x0a'));}catch(_0x1805ab){}}else try{console[_0xc451('0x5')][_0xc451('0xc')](console,_0x46cc9a);}catch(_0x391e67){try{console[_0xc451('0x5')](_0x46cc9a[_0xc451('0xd')]('\x0a'));}catch(_0x1d0cb7){}}else try{console['warn'][_0xc451('0xc')](console,_0x46cc9a);}catch(_0x58be97){try{console[_0xc451('0x8')](_0x46cc9a[_0xc451('0xd')]('\x0a'));}catch(_0x539c89){}}}};_0x39ad6f['fn'][_0xc451('0xe')]=function(){var _0x568658=_0x39ad6f(this);_0x568658[_0xc451('0xf')](function(_0x54fe57){_0x39ad6f(this)[_0xc451('0x10')]('qd-am-li-'+_0x54fe57);});_0x568658['first']()[_0xc451('0x10')](_0xc451('0x11'));_0x568658['last']()[_0xc451('0x10')](_0xc451('0x12'));return _0x568658;};_0x39ad6f['fn'][_0xc451('0x3')]=function(){};_0x387591=function(_0x15428d){var _0x3fa546={'s':'yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x141b15){var _0x3be0c1=function(_0x4f96b6){return _0x4f96b6;};var _0x344494=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x141b15=_0x141b15['d'+_0x344494[0x10]+'c'+_0x344494[0x11]+'m'+_0x3be0c1(_0x344494[0x1])+'n'+_0x344494[0xd]]['l'+_0x344494[0x12]+'c'+_0x344494[0x0]+'ti'+_0x3be0c1('o')+'n'];var _0x5ddf77=function(_0xfeb1e8){return escape(encodeURIComponent(_0xfeb1e8[_0xc451('0x13')](/\./g,'¨')[_0xc451('0x13')](/[a-zA-Z]/g,function(_0x1b4dc2){return String[_0xc451('0x14')](('Z'>=_0x1b4dc2?0x5a:0x7a)>=(_0x1b4dc2=_0x1b4dc2['charCodeAt'](0x0)+0xd)?_0x1b4dc2:_0x1b4dc2-0x1a);})));};var _0xb58eae=_0x5ddf77(_0x141b15[[_0x344494[0x9],_0x3be0c1('o'),_0x344494[0xc],_0x344494[_0x3be0c1(0xd)]][_0xc451('0xd')]('')]);_0x5ddf77=_0x5ddf77((window[['js',_0x3be0c1('no'),'m',_0x344494[0x1],_0x344494[0x4]['toUpperCase'](),_0xc451('0x15')][_0xc451('0xd')]('')]||_0xc451('0x16'))+['.v',_0x344494[0xd],'e',_0x3be0c1('x'),'co',_0x3be0c1('mm'),_0xc451('0x17'),_0x344494[0x1],'.c',_0x3be0c1('o'),'m.',_0x344494[0x13],'r'][_0xc451('0xd')](''));for(var _0xce8b30 in _0x3fa546){if(_0x5ddf77===_0xce8b30+_0x3fa546[_0xce8b30]||_0xb58eae===_0xce8b30+_0x3fa546[_0xce8b30]){var _0x472d99='tr'+_0x344494[0x11]+'e';break;}_0x472d99='f'+_0x344494[0x0]+'ls'+_0x3be0c1(_0x344494[0x1])+'';}_0x3be0c1=!0x1;-0x1<_0x141b15[[_0x344494[0xc],'e',_0x344494[0x0],'rc',_0x344494[0x9]][_0xc451('0xd')]('')]['indexOf'](_0xc451('0x18'))&&(_0x3be0c1=!0x0);return[_0x472d99,_0x3be0c1];}(_0x15428d);}(window);if(!eval(_0x387591[0x0]))return _0x387591[0x1]?_0x1b7fe6(_0xc451('0x19')):!0x1;var _0x465b22=function(_0x176106){var _0x479d9d=_0x176106[_0xc451('0x1a')](_0xc451('0x1b'));var _0x1f8a6b=_0x479d9d[_0xc451('0x1c')](_0xc451('0x1d'));var _0x33a3a1=_0x479d9d[_0xc451('0x1c')](_0xc451('0x1e'));if(_0x1f8a6b[_0xc451('0x1f')]||_0x33a3a1[_0xc451('0x1f')])_0x1f8a6b['parent']()[_0xc451('0x10')](_0xc451('0x20')),_0x33a3a1[_0xc451('0x21')]()[_0xc451('0x10')](_0xc451('0x22')),_0x39ad6f[_0xc451('0x23')]({'url':_0x4eda82[_0xc451('0x24')],'dataType':_0xc451('0x25'),'success':function(_0x2d4b22){var _0x142cd9=_0x39ad6f(_0x2d4b22);_0x1f8a6b[_0xc451('0xf')](function(){var _0x2d4b22=_0x39ad6f(this);var _0x3d97f6=_0x142cd9[_0xc451('0x1a')](_0xc451('0x26')+_0x2d4b22[_0xc451('0x27')](_0xc451('0x28'))+'\x27]');_0x3d97f6['length']&&(_0x3d97f6['each'](function(){_0x39ad6f(this)[_0xc451('0x0')](_0xc451('0x29'))[_0xc451('0x2a')]()[_0xc451('0x2b')](_0x2d4b22);}),_0x2d4b22[_0xc451('0x2c')]());})[_0xc451('0x10')](_0xc451('0x2d'));_0x33a3a1[_0xc451('0xf')](function(){var _0x2d4b22={};var _0x5616d0=_0x39ad6f(this);_0x142cd9['find']('h2')[_0xc451('0xf')](function(){if(_0x39ad6f(this)['text']()[_0xc451('0x2e')]()[_0xc451('0xb')]()==_0x5616d0['attr'](_0xc451('0x28'))['trim']()[_0xc451('0xb')]())return _0x2d4b22=_0x39ad6f(this),!0x1;});_0x2d4b22[_0xc451('0x1f')]&&(_0x2d4b22[_0xc451('0xf')](function(){_0x39ad6f(this)[_0xc451('0x0')](_0xc451('0x2f'))[_0xc451('0x2a')]()[_0xc451('0x2b')](_0x5616d0);}),_0x5616d0[_0xc451('0x2c')]());})['addClass'](_0xc451('0x2d'));},'error':function(){_0x1b7fe6(_0xc451('0x30')+_0x4eda82[_0xc451('0x24')]+_0xc451('0x31'));},'complete':function(){_0x4eda82[_0xc451('0x32')]['call'](this);_0x39ad6f(window)[_0xc451('0x33')](_0xc451('0x34'),_0x176106);},'clearQueueDelay':0xbb8});};_0x39ad6f[_0xc451('0x3')]=function(_0x31681b){var _0x151c04=_0x31681b[_0xc451('0x1a')]('ul[itemscope]')['each'](function(){var _0x812965=_0x39ad6f(this);if(!_0x812965[_0xc451('0x1f')])return _0x1b7fe6([_0xc451('0x35'),_0x31681b],_0xc451('0x36'));_0x812965['find'](_0xc451('0x37'))[_0xc451('0x21')]()[_0xc451('0x10')](_0xc451('0x38'));_0x812965[_0xc451('0x1a')]('li')['each'](function(){var _0x99d296=_0x39ad6f(this);var _0x5b37ab=_0x99d296[_0xc451('0x39')](_0xc451('0x3a'));_0x5b37ab[_0xc451('0x1f')]&&_0x99d296[_0xc451('0x10')]('qd-am-elem-'+_0x5b37ab['first']()[_0xc451('0x3b')]()[_0xc451('0x2e')]()[_0xc451('0x3c')]()[_0xc451('0x13')](/\./g,'')[_0xc451('0x13')](/\s/g,'-')[_0xc451('0xb')]());});var _0x3de27b=_0x812965['find'](_0xc451('0x3d'))['qdAmAddNdx']();_0x812965[_0xc451('0x10')]('qd-amazing-menu');_0x3de27b=_0x3de27b[_0xc451('0x1a')](_0xc451('0x3e'));_0x3de27b[_0xc451('0xf')](function(){var _0x2d049b=_0x39ad6f(this);_0x2d049b['find'](_0xc451('0x3d'))[_0xc451('0xe')]()[_0xc451('0x10')](_0xc451('0x3f'));_0x2d049b[_0xc451('0x10')](_0xc451('0x40'));_0x2d049b[_0xc451('0x21')]()[_0xc451('0x10')](_0xc451('0x41'));});_0x3de27b[_0xc451('0x10')](_0xc451('0x41'));var _0x2b206a=0x0,_0x387591=function(_0x3b5394){_0x2b206a+=0x1;_0x3b5394=_0x3b5394[_0xc451('0x39')]('li')[_0xc451('0x39')]('*');_0x3b5394[_0xc451('0x1f')]&&(_0x3b5394[_0xc451('0x10')](_0xc451('0x42')+_0x2b206a),_0x387591(_0x3b5394));};_0x387591(_0x812965);_0x812965['add'](_0x812965['find']('ul'))[_0xc451('0xf')](function(){var _0x36a0a9=_0x39ad6f(this);_0x36a0a9[_0xc451('0x10')](_0xc451('0x43')+_0x36a0a9[_0xc451('0x39')]('li')[_0xc451('0x1f')]+_0xc451('0x44'));});});_0x465b22(_0x151c04);_0x4eda82[_0xc451('0x45')][_0xc451('0x46')](this);_0x39ad6f(window)[_0xc451('0x33')](_0xc451('0x47'),_0x31681b);};_0x39ad6f['fn'][_0xc451('0x3')]=function(_0x495a92){var _0x14071f=_0x39ad6f(this);if(!_0x14071f[_0xc451('0x1f')])return _0x14071f;_0x4eda82=_0x39ad6f[_0xc451('0x48')]({},_0x5d03ed,_0x495a92);_0x14071f[_0xc451('0x49')]=new _0x39ad6f['QD_amazingMenu'](_0x39ad6f(this));return _0x14071f;};_0x39ad6f(function(){_0x39ad6f('.qd_amazing_menu_auto')['QD_amazingMenu']();});}}(this));
/* Quatro Digital Smart Cart */
var _0x8c56=['.qd-ddc-viewCart','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','.qd-ddc-infoTotal','html','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','each','call','.qd-ddc-infoTotalValue','total','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','allTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','.qd-ddc-wrapper','qd-ddc-prodLoaded','getOrderForm','_QuatroDigital_AmountProduct','exec','addClass','QD_checkoutQueue','items','totalizers','shippingData','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','attr','qd-ddc-','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','content','.qd-ddc-quantity','val','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','.qd-ddc-shipping\x20input','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','filter','[data-sku=\x27','lastSku','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','timeRemoveNewItemClass','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','insertProdImg','qd-loaded','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','click.qd_ddc_minus','preventDefault','focusout.qd_ddc_change','keyup.qd_ddc_change','.qd-ddc-remove','removeProduct','stop','slideUp','shippingCalculate','data','qdDdcLastPostalCode','calculateShipping','done','boolean','simpleCart','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','quantity','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','avisso','allowRecalculate','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','remove','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','ajaxStop','.qdDdcContainer','QD_smartCart','selector','dropDown','buyButton','QD_buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','closest','replace','abs','undefined','pow','toFixed','length','join','_QuatroDigital_CartData','callback','Callbacks','function','error','Oooops!\x20','message','info','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','toLowerCase','aviso','apply','warn','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','ite','---','erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','name','smartCheckout','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','object','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','find','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','body','removeClass','keyup.qd_ddc_closeFn','keyCode','qd-bb-lightBoxBodyProdAdd','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','updateOnlyHover','mouseenter.qd_ddc_hover','getCartInfoByUrl','cartIsEmpty','mouseleave.qd_ddc_hover','cartTotal','#value','texts','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total'];(function(_0xd0460f,_0x34f3f1){var _0x20ff51=function(_0x2f43fa){while(--_0x2f43fa){_0xd0460f['push'](_0xd0460f['shift']());}};_0x20ff51(++_0x34f3f1);}(_0x8c56,0x85));var _0x68c5=function(_0x4ccf0a,_0x17140e){_0x4ccf0a=_0x4ccf0a-0x0;var _0x481fe8=_0x8c56[_0x4ccf0a];return _0x481fe8;};(function(_0x2d2acb){_0x2d2acb['fn'][_0x68c5('0x0')]=_0x2d2acb['fn'][_0x68c5('0x1')];}(jQuery));function qd_number_format(_0x4d99db,_0x44d20f,_0x155d87,_0x4c0230){_0x4d99db=(_0x4d99db+'')[_0x68c5('0x2')](/[^0-9+\-Ee.]/g,'');_0x4d99db=isFinite(+_0x4d99db)?+_0x4d99db:0x0;_0x44d20f=isFinite(+_0x44d20f)?Math[_0x68c5('0x3')](_0x44d20f):0x0;_0x4c0230='undefined'===typeof _0x4c0230?',':_0x4c0230;_0x155d87=_0x68c5('0x4')===typeof _0x155d87?'.':_0x155d87;var _0x36b9fe='',_0x36b9fe=function(_0x2c0043,_0x1c9867){var _0x44d20f=Math[_0x68c5('0x5')](0xa,_0x1c9867);return''+(Math['round'](_0x2c0043*_0x44d20f)/_0x44d20f)[_0x68c5('0x6')](_0x1c9867);},_0x36b9fe=(_0x44d20f?_0x36b9fe(_0x4d99db,_0x44d20f):''+Math['round'](_0x4d99db))['split']('.');0x3<_0x36b9fe[0x0]['length']&&(_0x36b9fe[0x0]=_0x36b9fe[0x0][_0x68c5('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x4c0230));(_0x36b9fe[0x1]||'')[_0x68c5('0x7')]<_0x44d20f&&(_0x36b9fe[0x1]=_0x36b9fe[0x1]||'',_0x36b9fe[0x1]+=Array(_0x44d20f-_0x36b9fe[0x1][_0x68c5('0x7')]+0x1)[_0x68c5('0x8')]('0'));return _0x36b9fe['join'](_0x155d87);};(function(){try{window[_0x68c5('0x9')]=window[_0x68c5('0x9')]||{},window[_0x68c5('0x9')][_0x68c5('0xa')]=window[_0x68c5('0x9')][_0x68c5('0xa')]||$[_0x68c5('0xb')]();}catch(_0x3699a5){_0x68c5('0x4')!==typeof console&&_0x68c5('0xc')===typeof console[_0x68c5('0xd')]&&console['error'](_0x68c5('0xe'),_0x3699a5[_0x68c5('0xf')]);}}());(function(_0x1327e9){try{var _0x1d168d=jQuery,_0x414007=function(_0x1ed71a,_0x5ec727){if('object'===typeof console&&'undefined'!==typeof console[_0x68c5('0xd')]&&_0x68c5('0x4')!==typeof console[_0x68c5('0x10')]&&_0x68c5('0x4')!==typeof console['warn']){var _0x86bda0;'object'===typeof _0x1ed71a?(_0x1ed71a['unshift']('[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'),_0x86bda0=_0x1ed71a):_0x86bda0=[_0x68c5('0x11')+_0x1ed71a];if(_0x68c5('0x4')===typeof _0x5ec727||_0x68c5('0x12')!==_0x5ec727[_0x68c5('0x13')]()&&_0x68c5('0x14')!==_0x5ec727['toLowerCase']())if(_0x68c5('0x4')!==typeof _0x5ec727&&_0x68c5('0x10')===_0x5ec727[_0x68c5('0x13')]())try{console[_0x68c5('0x10')][_0x68c5('0x15')](console,_0x86bda0);}catch(_0x5205f3){try{console[_0x68c5('0x10')](_0x86bda0[_0x68c5('0x8')]('\x0a'));}catch(_0x58ff30){}}else try{console[_0x68c5('0xd')][_0x68c5('0x15')](console,_0x86bda0);}catch(_0x105bd6){try{console[_0x68c5('0xd')](_0x86bda0['join']('\x0a'));}catch(_0x15205e){}}else try{console[_0x68c5('0x16')][_0x68c5('0x15')](console,_0x86bda0);}catch(_0x2b656e){try{console[_0x68c5('0x16')](_0x86bda0[_0x68c5('0x8')]('\x0a'));}catch(_0x282000){}}}};window['_QuatroDigital_DropDown']=window[_0x68c5('0x17')]||{};window['_QuatroDigital_DropDown'][_0x68c5('0x18')]=!0x0;_0x1d168d[_0x68c5('0x19')]=function(){};_0x1d168d['fn'][_0x68c5('0x19')]=function(){return{'fn':new _0x1d168d()};};var _0x42bc6b=function(_0x1423a7){var _0x2527fa={'s':_0x68c5('0x1a')};return function(_0x20229d){var _0x8d243e=function(_0x1f155c){return _0x1f155c;};var _0x1e4811=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x20229d=_0x20229d['d'+_0x1e4811[0x10]+'c'+_0x1e4811[0x11]+'m'+_0x8d243e(_0x1e4811[0x1])+'n'+_0x1e4811[0xd]]['l'+_0x1e4811[0x12]+'c'+_0x1e4811[0x0]+'ti'+_0x8d243e('o')+'n'];var _0x800303=function(_0x447a2e){return escape(encodeURIComponent(_0x447a2e['replace'](/\./g,'¨')[_0x68c5('0x2')](/[a-zA-Z]/g,function(_0x2c1d68){return String[_0x68c5('0x1b')](('Z'>=_0x2c1d68?0x5a:0x7a)>=(_0x2c1d68=_0x2c1d68[_0x68c5('0x1c')](0x0)+0xd)?_0x2c1d68:_0x2c1d68-0x1a);})));};var _0x58e770=_0x800303(_0x20229d[[_0x1e4811[0x9],_0x8d243e('o'),_0x1e4811[0xc],_0x1e4811[_0x8d243e(0xd)]]['join']('')]);_0x800303=_0x800303((window[['js',_0x8d243e('no'),'m',_0x1e4811[0x1],_0x1e4811[0x4]['toUpperCase'](),_0x68c5('0x1d')]['join']('')]||_0x68c5('0x1e'))+['.v',_0x1e4811[0xd],'e',_0x8d243e('x'),'co',_0x8d243e('mm'),_0x68c5('0x1f'),_0x1e4811[0x1],'.c',_0x8d243e('o'),'m.',_0x1e4811[0x13],'r'][_0x68c5('0x8')](''));for(var _0x17583e in _0x2527fa){if(_0x800303===_0x17583e+_0x2527fa[_0x17583e]||_0x58e770===_0x17583e+_0x2527fa[_0x17583e]){var _0x2b5675='tr'+_0x1e4811[0x11]+'e';break;}_0x2b5675='f'+_0x1e4811[0x0]+'ls'+_0x8d243e(_0x1e4811[0x1])+'';}_0x8d243e=!0x1;-0x1<_0x20229d[[_0x1e4811[0xc],'e',_0x1e4811[0x0],'rc',_0x1e4811[0x9]]['join']('')][_0x68c5('0x20')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x8d243e=!0x0);return[_0x2b5675,_0x8d243e];}(_0x1423a7);}(window);if(!eval(_0x42bc6b[0x0]))return _0x42bc6b[0x1]?_0x414007(_0x68c5('0x21')):!0x1;_0x1d168d[_0x68c5('0x19')]=function(_0x4b9804,_0x331d0d){var _0x2012cb=_0x1d168d(_0x4b9804);if(!_0x2012cb['length'])return _0x2012cb;var _0x2a49a9=_0x1d168d[_0x68c5('0x22')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x68c5('0x23'),'linkCheckout':_0x68c5('0x24'),'cartTotal':_0x68c5('0x25'),'emptyCart':_0x68c5('0x26'),'continueShopping':_0x68c5('0x27'),'shippingForm':_0x68c5('0x28')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x3d5167){return _0x3d5167[_0x68c5('0x29')]||_0x3d5167[_0x68c5('0x2a')];},'callback':function(){},'callbackProductsList':function(){}},_0x331d0d);_0x1d168d('');var _0x449f91=this;if(_0x2a49a9[_0x68c5('0x2b')]){var _0x3da050=!0x1;_0x68c5('0x4')===typeof window[_0x68c5('0x2c')]&&(_0x414007(_0x68c5('0x2d')),_0x1d168d['ajax']({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':!0x1,'dataType':_0x68c5('0x2e'),'error':function(){_0x414007(_0x68c5('0x2f'));_0x3da050=!0x0;}}));if(_0x3da050)return _0x414007(_0x68c5('0x30'));}if('object'===typeof window[_0x68c5('0x2c')]&&_0x68c5('0x4')!==typeof window['vtexjs'][_0x68c5('0x31')])var _0x1327e9=window[_0x68c5('0x2c')]['checkout'];else if(_0x68c5('0x32')===typeof vtex&&_0x68c5('0x32')===typeof vtex[_0x68c5('0x31')]&&'undefined'!==typeof vtex[_0x68c5('0x31')][_0x68c5('0x33')])_0x1327e9=new vtex[(_0x68c5('0x31'))][(_0x68c5('0x33'))]();else return _0x414007(_0x68c5('0x34'));_0x449f91[_0x68c5('0x35')]=_0x68c5('0x36');var _0xee1ddc=function(_0x2a0d8b){_0x1d168d(this)[_0x68c5('0x37')](_0x2a0d8b);_0x2a0d8b[_0x68c5('0x38')]('.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose')[_0x68c5('0x39')](_0x1d168d(_0x68c5('0x3a')))['on'](_0x68c5('0x3b'),function(){_0x2012cb['removeClass'](_0x68c5('0x3c'));_0x1d168d(document[_0x68c5('0x3d')])[_0x68c5('0x3e')]('qd-bb-lightBoxBodyProdAdd');});_0x1d168d(document)['off'](_0x68c5('0x3f'))['on'](_0x68c5('0x3f'),function(_0x3c5212){0x1b==_0x3c5212[_0x68c5('0x40')]&&(_0x2012cb[_0x68c5('0x3e')](_0x68c5('0x3c')),_0x1d168d(document['body'])[_0x68c5('0x3e')](_0x68c5('0x41')));});var _0x1b1760=_0x2a0d8b[_0x68c5('0x38')]('.qd-ddc-prodWrapper');_0x2a0d8b[_0x68c5('0x38')](_0x68c5('0x42'))['on'](_0x68c5('0x43'),function(){_0x449f91[_0x68c5('0x44')]('-',void 0x0,void 0x0,_0x1b1760);return!0x1;});_0x2a0d8b[_0x68c5('0x38')]('.qd-ddc-scrollDown')['on']('click.qd_ddc_scrollDown',function(){_0x449f91['scrollCart'](void 0x0,void 0x0,void 0x0,_0x1b1760);return!0x1;});_0x2a0d8b[_0x68c5('0x38')]('.qd-ddc-shipping\x20input')['val']('')['on']('keyup.qd_ddc_cep',function(){_0x449f91['shippingCalculate'](_0x1d168d(this));});if(_0x2a49a9[_0x68c5('0x45')]){var _0x331d0d=0x0;_0x1d168d(this)['on'](_0x68c5('0x46'),function(){var _0x2a0d8b=function(){window[_0x68c5('0x17')][_0x68c5('0x18')]&&(_0x449f91[_0x68c5('0x47')](),window[_0x68c5('0x17')][_0x68c5('0x18')]=!0x1,_0x1d168d['fn']['simpleCart'](!0x0),_0x449f91[_0x68c5('0x48')]());};_0x331d0d=setInterval(function(){_0x2a0d8b();},0x258);_0x2a0d8b();});_0x1d168d(this)['on'](_0x68c5('0x49'),function(){clearInterval(_0x331d0d);});}};var _0x2354da=function(_0x5e6b13){_0x5e6b13=_0x1d168d(_0x5e6b13);_0x2a49a9['texts'][_0x68c5('0x4a')]=_0x2a49a9['texts'][_0x68c5('0x4a')][_0x68c5('0x2')](_0x68c5('0x4b'),'<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>');_0x2a49a9[_0x68c5('0x4c')][_0x68c5('0x4a')]=_0x2a49a9[_0x68c5('0x4c')]['cartTotal'][_0x68c5('0x2')](_0x68c5('0x4d'),_0x68c5('0x4e'));_0x2a49a9['texts'][_0x68c5('0x4a')]=_0x2a49a9[_0x68c5('0x4c')]['cartTotal'][_0x68c5('0x2')](_0x68c5('0x4f'),_0x68c5('0x50'));_0x2a49a9[_0x68c5('0x4c')][_0x68c5('0x4a')]=_0x2a49a9[_0x68c5('0x4c')][_0x68c5('0x4a')][_0x68c5('0x2')](_0x68c5('0x51'),'<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0x5e6b13['find'](_0x68c5('0x52'))['html'](_0x2a49a9['texts'][_0x68c5('0x53')]);_0x5e6b13[_0x68c5('0x38')](_0x68c5('0x54'))['html'](_0x2a49a9[_0x68c5('0x4c')][_0x68c5('0x55')]);_0x5e6b13[_0x68c5('0x38')](_0x68c5('0x56'))['html'](_0x2a49a9[_0x68c5('0x4c')]['linkCheckout']);_0x5e6b13[_0x68c5('0x38')](_0x68c5('0x57'))[_0x68c5('0x58')](_0x2a49a9[_0x68c5('0x4c')]['cartTotal']);_0x5e6b13[_0x68c5('0x38')](_0x68c5('0x59'))[_0x68c5('0x58')](_0x2a49a9[_0x68c5('0x4c')][_0x68c5('0x5a')]);_0x5e6b13[_0x68c5('0x38')](_0x68c5('0x5b'))['html'](_0x2a49a9['texts']['emptyCart']);return _0x5e6b13;}(this[_0x68c5('0x35')]);var _0xbebe00=0x0;_0x2012cb[_0x68c5('0x5c')](function(){0x0<_0xbebe00?_0xee1ddc[_0x68c5('0x5d')](this,_0x2354da['clone']()):_0xee1ddc['call'](this,_0x2354da);_0xbebe00++;});window['_QuatroDigital_CartData']['callback'][_0x68c5('0x39')](function(){_0x1d168d(_0x68c5('0x5e'))[_0x68c5('0x58')](window['_QuatroDigital_CartData'][_0x68c5('0x5f')]||'--');_0x1d168d(_0x68c5('0x60'))[_0x68c5('0x58')](window[_0x68c5('0x9')][_0x68c5('0x61')]||'0');_0x1d168d(_0x68c5('0x62'))['html'](window[_0x68c5('0x9')][_0x68c5('0x63')]||'--');_0x1d168d(_0x68c5('0x64'))['html'](window[_0x68c5('0x9')][_0x68c5('0x65')]||'--');});var _0x50fa97=function(_0x4a21f5,_0x3aa43d){if(_0x68c5('0x4')===typeof _0x4a21f5['items'])return _0x414007(_0x68c5('0x66'));_0x449f91[_0x68c5('0x67')][_0x68c5('0x5d')](this,_0x3aa43d);};_0x449f91['getCartInfoByUrl']=function(_0x331ca3,_0x1bd9f){_0x68c5('0x4')!=typeof _0x1bd9f?window[_0x68c5('0x17')][_0x68c5('0x68')]=_0x1bd9f:window[_0x68c5('0x17')][_0x68c5('0x68')]&&(_0x1bd9f=window['_QuatroDigital_DropDown'][_0x68c5('0x68')]);setTimeout(function(){window[_0x68c5('0x17')][_0x68c5('0x68')]=void 0x0;},_0x2a49a9['timeRemoveNewItemClass']);_0x1d168d(_0x68c5('0x69'))['removeClass'](_0x68c5('0x6a'));if(_0x2a49a9['smartCheckout']){var _0x331d0d=function(_0x2f6935){window['_QuatroDigital_DropDown'][_0x68c5('0x6b')]=_0x2f6935;_0x50fa97(_0x2f6935,_0x1bd9f);'undefined'!==typeof window[_0x68c5('0x6c')]&&_0x68c5('0xc')===typeof window[_0x68c5('0x6c')][_0x68c5('0x6d')]&&window['_QuatroDigital_AmountProduct'][_0x68c5('0x6d')][_0x68c5('0x5d')](this);_0x1d168d(_0x68c5('0x69'))[_0x68c5('0x6e')]('qd-ddc-prodLoaded');};_0x68c5('0x4')!==typeof window['_QuatroDigital_DropDown']['getOrderForm']?(_0x331d0d(window[_0x68c5('0x17')][_0x68c5('0x6b')]),'function'===typeof _0x331ca3&&_0x331ca3(window[_0x68c5('0x17')][_0x68c5('0x6b')])):_0x1d168d[_0x68c5('0x6f')]([_0x68c5('0x70'),_0x68c5('0x71'),_0x68c5('0x72')],{'done':function(_0x4cac93){_0x331d0d[_0x68c5('0x5d')](this,_0x4cac93);_0x68c5('0xc')===typeof _0x331ca3&&_0x331ca3(_0x4cac93);},'fail':function(_0x286190){_0x414007(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0x286190]);}});}else alert(_0x68c5('0x73'));};_0x449f91[_0x68c5('0x48')]=function(){var _0x3f96b5=_0x1d168d(_0x68c5('0x69'));_0x3f96b5[_0x68c5('0x38')](_0x68c5('0x74'))[_0x68c5('0x7')]?_0x3f96b5[_0x68c5('0x3e')](_0x68c5('0x75')):_0x3f96b5['addClass'](_0x68c5('0x75'));};_0x449f91[_0x68c5('0x67')]=function(_0x9a151b){var _0x331d0d=_0x1d168d(_0x68c5('0x76'));_0x331d0d[_0x68c5('0x77')]();_0x331d0d[_0x68c5('0x5c')](function(){var _0x331d0d=_0x1d168d(this),_0x27b14b,_0x4b9804,_0x2f39dd=_0x1d168d(''),_0x3aef3a;for(_0x3aef3a in window[_0x68c5('0x17')][_0x68c5('0x6b')][_0x68c5('0x70')])if(_0x68c5('0x32')===typeof window[_0x68c5('0x17')][_0x68c5('0x6b')][_0x68c5('0x70')][_0x3aef3a]){var _0x4bd448=window[_0x68c5('0x17')][_0x68c5('0x6b')][_0x68c5('0x70')][_0x3aef3a];var _0x16e683=_0x4bd448[_0x68c5('0x78')][_0x68c5('0x2')](/^\/|\/$/g,'')['split']('/');var _0x36b1b7=_0x1d168d(_0x68c5('0x79'));_0x36b1b7[_0x68c5('0x7a')]({'data-sku':_0x4bd448['id'],'data-sku-index':_0x3aef3a,'data-qd-departament':_0x16e683[0x0],'data-qd-category':_0x16e683[_0x16e683[_0x68c5('0x7')]-0x1]});_0x36b1b7[_0x68c5('0x6e')](_0x68c5('0x7b')+_0x4bd448[_0x68c5('0x7c')]);_0x36b1b7['find'](_0x68c5('0x7d'))['append'](_0x2a49a9[_0x68c5('0x29')](_0x4bd448));_0x36b1b7[_0x68c5('0x38')](_0x68c5('0x7e'))['append'](isNaN(_0x4bd448[_0x68c5('0x7f')])?_0x4bd448[_0x68c5('0x7f')]:0x0==_0x4bd448[_0x68c5('0x7f')]?_0x68c5('0x80'):(_0x1d168d(_0x68c5('0x81'))[_0x68c5('0x7a')](_0x68c5('0x82'))||'R$')+'\x20'+qd_number_format(_0x4bd448[_0x68c5('0x7f')]/0x64,0x2,',','.'));_0x36b1b7[_0x68c5('0x38')](_0x68c5('0x83'))[_0x68c5('0x7a')]({'data-sku':_0x4bd448['id'],'data-sku-index':_0x3aef3a})[_0x68c5('0x84')](_0x4bd448['quantity']);_0x36b1b7[_0x68c5('0x38')]('.qd-ddc-remove')['attr']({'data-sku':_0x4bd448['id'],'data-sku-index':_0x3aef3a});_0x449f91['insertProdImg'](_0x4bd448['id'],_0x36b1b7['find'](_0x68c5('0x85')),_0x4bd448[_0x68c5('0x86')]);_0x36b1b7[_0x68c5('0x38')](_0x68c5('0x87'))[_0x68c5('0x7a')]({'data-sku':_0x4bd448['id'],'data-sku-index':_0x3aef3a});_0x36b1b7[_0x68c5('0x88')](_0x331d0d);_0x2f39dd=_0x2f39dd[_0x68c5('0x39')](_0x36b1b7);}try{var _0x1327e9=_0x331d0d[_0x68c5('0x0')](_0x68c5('0x69'))[_0x68c5('0x38')](_0x68c5('0x89'));_0x1327e9[_0x68c5('0x7')]&&''==_0x1327e9[_0x68c5('0x84')]()&&window[_0x68c5('0x17')][_0x68c5('0x6b')]['shippingData'][_0x68c5('0x8a')]&&_0x1327e9[_0x68c5('0x84')](window[_0x68c5('0x17')]['getOrderForm'][_0x68c5('0x72')]['address'][_0x68c5('0x8b')]);}catch(_0x112d15){_0x414007(_0x68c5('0x8c')+_0x112d15['message'],'aviso');}_0x449f91[_0x68c5('0x8d')](_0x331d0d);_0x449f91['cartIsEmpty']();_0x9a151b&&_0x9a151b['lastSku']&&function(){_0x4b9804=_0x2f39dd[_0x68c5('0x8e')](_0x68c5('0x8f')+_0x9a151b[_0x68c5('0x90')]+'\x27]');_0x4b9804[_0x68c5('0x7')]&&(_0x27b14b=0x0,_0x2f39dd[_0x68c5('0x5c')](function(){var _0x9a151b=_0x1d168d(this);if(_0x9a151b['is'](_0x4b9804))return!0x1;_0x27b14b+=_0x9a151b['outerHeight']();}),_0x449f91['scrollCart'](void 0x0,void 0x0,_0x27b14b,_0x331d0d[_0x68c5('0x39')](_0x331d0d['parent']())),_0x2f39dd[_0x68c5('0x3e')](_0x68c5('0x91')),function(_0x542fe2){_0x542fe2[_0x68c5('0x6e')](_0x68c5('0x92'));_0x542fe2['addClass'](_0x68c5('0x91'));setTimeout(function(){_0x542fe2[_0x68c5('0x3e')](_0x68c5('0x92'));},_0x2a49a9[_0x68c5('0x93')]);}(_0x4b9804),_0x1d168d(document[_0x68c5('0x3d')])[_0x68c5('0x6e')]('qd-ddc-product-add-time-v2'),setTimeout(function(){_0x1d168d(document[_0x68c5('0x3d')])['removeClass'](_0x68c5('0x94'));},_0x2a49a9[_0x68c5('0x93')]));}();});(function(){_QuatroDigital_DropDown[_0x68c5('0x6b')]['items']['length']?(_0x1d168d(_0x68c5('0x3d'))[_0x68c5('0x3e')](_0x68c5('0x95'))['addClass']('qd-ddc-cart-rendered\x20qd-ddc-product-add-time'),setTimeout(function(){_0x1d168d('body')[_0x68c5('0x3e')](_0x68c5('0x96'));},_0x2a49a9[_0x68c5('0x93')])):_0x1d168d(_0x68c5('0x3d'))[_0x68c5('0x3e')](_0x68c5('0x97'))[_0x68c5('0x6e')](_0x68c5('0x95'));}());_0x68c5('0xc')===typeof _0x2a49a9['callbackProductsList']?_0x2a49a9[_0x68c5('0x98')][_0x68c5('0x5d')](this):_0x414007('callbackProductsList\x20não\x20é\x20uma\x20função');};_0x449f91[_0x68c5('0x99')]=function(_0x4668bb,_0x4e7a5b,_0x42c555){function _0x3d61b7(){_0x4e7a5b[_0x68c5('0x3e')](_0x68c5('0x9a'))['load'](function(){_0x1d168d(this)['addClass'](_0x68c5('0x9a'));})['attr']('src',_0x42c555);}_0x42c555?_0x3d61b7():isNaN(_0x4668bb)?_0x414007(_0x68c5('0x9b'),_0x68c5('0x12')):alert(_0x68c5('0x9c'));};_0x449f91[_0x68c5('0x8d')]=function(_0x3ea7ba){var _0x331d0d=function(_0x1245c1,_0x354589){var _0x3954d7=_0x1d168d(_0x1245c1);var _0x2e0ad0=_0x3954d7['attr'](_0x68c5('0x9d'));var _0x4b9804=_0x3954d7[_0x68c5('0x7a')](_0x68c5('0x9e'));if(_0x2e0ad0){var _0x1fc3e5=parseInt(_0x3954d7[_0x68c5('0x84')]())||0x1;_0x449f91[_0x68c5('0x9f')]([_0x2e0ad0,_0x4b9804],_0x1fc3e5,_0x1fc3e5+0x1,function(_0x5434aa){_0x3954d7[_0x68c5('0x84')](_0x5434aa);_0x68c5('0xc')===typeof _0x354589&&_0x354589();});}};var _0x5bcc6d=function(_0x4b0679,_0x1c185b){var _0x5e06e8=_0x1d168d(_0x4b0679);var _0x4b9804=_0x5e06e8[_0x68c5('0x7a')](_0x68c5('0x9d'));var _0x3ba9c0=_0x5e06e8[_0x68c5('0x7a')](_0x68c5('0x9e'));if(_0x4b9804){var _0x5e3352=parseInt(_0x5e06e8[_0x68c5('0x84')]())||0x2;_0x449f91[_0x68c5('0x9f')]([_0x4b9804,_0x3ba9c0],_0x5e3352,_0x5e3352-0x1,function(_0x4bd6dc){_0x5e06e8[_0x68c5('0x84')](_0x4bd6dc);_0x68c5('0xc')===typeof _0x1c185b&&_0x1c185b();});}};var _0x42ba6a=function(_0x289432,_0x3040c5){var _0x331d0d=_0x1d168d(_0x289432);var _0x4b9804=_0x331d0d['attr'](_0x68c5('0x9d'));var _0x2b3d88=_0x331d0d[_0x68c5('0x7a')](_0x68c5('0x9e'));if(_0x4b9804){var _0xec8866=parseInt(_0x331d0d[_0x68c5('0x84')]())||0x1;_0x449f91[_0x68c5('0x9f')]([_0x4b9804,_0x2b3d88],0x1,_0xec8866,function(_0x562b17){_0x331d0d[_0x68c5('0x84')](_0x562b17);_0x68c5('0xc')===typeof _0x3040c5&&_0x3040c5();});}};var _0x4b9804=_0x3ea7ba['find'](_0x68c5('0xa0'));_0x4b9804[_0x68c5('0x6e')](_0x68c5('0xa1'))['each'](function(){var _0x3ea7ba=_0x1d168d(this);_0x3ea7ba[_0x68c5('0x38')](_0x68c5('0xa2'))['on'](_0x68c5('0xa3'),function(_0x3b3b0d){_0x3b3b0d['preventDefault']();_0x4b9804['addClass'](_0x68c5('0xa4'));_0x331d0d(_0x3ea7ba[_0x68c5('0x38')]('.qd-ddc-quantity'),function(){_0x4b9804[_0x68c5('0x3e')]('qd-loading');});});_0x3ea7ba['find']('.qd-ddc-quantityMinus')['on'](_0x68c5('0xa5'),function(_0x1b5bb7){_0x1b5bb7[_0x68c5('0xa6')]();_0x4b9804[_0x68c5('0x6e')](_0x68c5('0xa4'));_0x5bcc6d(_0x3ea7ba[_0x68c5('0x38')]('.qd-ddc-quantity'),function(){_0x4b9804['removeClass']('qd-loading');});});_0x3ea7ba[_0x68c5('0x38')](_0x68c5('0x83'))['on'](_0x68c5('0xa7'),function(){_0x4b9804['addClass']('qd-loading');_0x42ba6a(this,function(){_0x4b9804['removeClass'](_0x68c5('0xa4'));});});_0x3ea7ba['find']('.qd-ddc-quantity')['on'](_0x68c5('0xa8'),function(_0x294997){0xd==_0x294997[_0x68c5('0x40')]&&(_0x4b9804[_0x68c5('0x6e')](_0x68c5('0xa4')),_0x42ba6a(this,function(){_0x4b9804[_0x68c5('0x3e')](_0x68c5('0xa4'));}));});});_0x3ea7ba[_0x68c5('0x38')](_0x68c5('0x74'))['each'](function(){var _0x3ea7ba=_0x1d168d(this);_0x3ea7ba[_0x68c5('0x38')](_0x68c5('0xa9'))['on']('click.qd_ddc_remove',function(){_0x3ea7ba[_0x68c5('0x6e')](_0x68c5('0xa4'));_0x449f91[_0x68c5('0xaa')](_0x1d168d(this),function(_0x1eaa9d){_0x1eaa9d?_0x3ea7ba[_0x68c5('0xab')](!0x0)[_0x68c5('0xac')](function(){_0x3ea7ba['remove']();_0x449f91[_0x68c5('0x48')]();}):_0x3ea7ba[_0x68c5('0x3e')](_0x68c5('0xa4'));});return!0x1;});});};_0x449f91[_0x68c5('0xad')]=function(_0xcc5d20){var _0x5053ea=_0xcc5d20[_0x68c5('0x84')]();_0x5053ea=_0x5053ea['replace'](/[^0-9\-]/g,'');_0x5053ea=_0x5053ea[_0x68c5('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3');_0x5053ea=_0x5053ea[_0x68c5('0x2')](/(.{9}).*/g,'$1');_0xcc5d20[_0x68c5('0x84')](_0x5053ea);0x9<=_0x5053ea[_0x68c5('0x7')]&&(_0xcc5d20[_0x68c5('0xae')](_0x68c5('0xaf'))!=_0x5053ea&&_0x1327e9[_0x68c5('0xb0')]({'postalCode':_0x5053ea,'country':'BRA'})[_0x68c5('0xb1')](function(_0xd0e125){window['_QuatroDigital_DropDown'][_0x68c5('0x6b')]=_0xd0e125;_0x449f91[_0x68c5('0x47')]();})['fail'](function(_0xf31aec){_0x414007(['Não\x20foi\x20possível\x20calcular\x20o\x20frete',_0xf31aec]);updateCartData();}),_0xcc5d20[_0x68c5('0xae')](_0x68c5('0xaf'),_0x5053ea));};_0x449f91['changeQantity']=function(_0x5b3721,_0x5800cc,_0x16a108,_0xc55cdb){function _0x56e950(_0x452c82){_0x452c82=_0x68c5('0xb2')!==typeof _0x452c82?!0x1:_0x452c82;_0x449f91[_0x68c5('0x47')]();window[_0x68c5('0x17')][_0x68c5('0x18')]=!0x1;_0x449f91[_0x68c5('0x48')]();'undefined'!==typeof window[_0x68c5('0x6c')]&&_0x68c5('0xc')===typeof window[_0x68c5('0x6c')][_0x68c5('0x6d')]&&window[_0x68c5('0x6c')]['exec'][_0x68c5('0x5d')](this);_0x68c5('0xc')===typeof adminCart&&adminCart();_0x1d168d['fn'][_0x68c5('0xb3')](!0x0,void 0x0,_0x452c82);'function'===typeof _0xc55cdb&&_0xc55cdb(_0x5800cc);}_0x16a108=_0x16a108||0x1;if(0x1>_0x16a108)return _0x5800cc;if(_0x2a49a9[_0x68c5('0x2b')]){if(_0x68c5('0x4')===typeof window[_0x68c5('0x17')][_0x68c5('0x6b')][_0x68c5('0x70')][_0x5b3721[0x1]])return _0x414007(_0x68c5('0xb4')+_0x5b3721[0x1]+']'),_0x5800cc;window[_0x68c5('0x17')][_0x68c5('0x6b')]['items'][_0x5b3721[0x1]][_0x68c5('0xb5')]=_0x16a108;window[_0x68c5('0x17')][_0x68c5('0x6b')][_0x68c5('0x70')][_0x5b3721[0x1]][_0x68c5('0xb6')]=_0x5b3721[0x1];_0x1327e9[_0x68c5('0xb7')]([window[_0x68c5('0x17')][_0x68c5('0x6b')][_0x68c5('0x70')][_0x5b3721[0x1]]],[_0x68c5('0x70'),_0x68c5('0x71'),_0x68c5('0x72')])['done'](function(_0x6f5e1c){window[_0x68c5('0x17')][_0x68c5('0x6b')]=_0x6f5e1c;_0x56e950(!0x0);})['fail'](function(_0x22016f){_0x414007([_0x68c5('0xb8'),_0x22016f]);_0x56e950();});}else _0x414007(_0x68c5('0xb9'));};_0x449f91[_0x68c5('0xaa')]=function(_0xfd787d,_0x9797b7){function _0x3e7cbc(_0x562731){_0x562731=_0x68c5('0xb2')!==typeof _0x562731?!0x1:_0x562731;_0x68c5('0x4')!==typeof window[_0x68c5('0x6c')]&&_0x68c5('0xc')===typeof window[_0x68c5('0x6c')][_0x68c5('0x6d')]&&window[_0x68c5('0x6c')][_0x68c5('0x6d')][_0x68c5('0x5d')](this);_0x68c5('0xc')===typeof adminCart&&adminCart();_0x1d168d['fn']['simpleCart'](!0x0,void 0x0,_0x562731);_0x68c5('0xc')===typeof _0x9797b7&&_0x9797b7(_0x4b9804);}var _0x4b9804=!0x1,_0x3769d7=_0x1d168d(_0xfd787d)[_0x68c5('0x7a')](_0x68c5('0x9e'));if(_0x2a49a9[_0x68c5('0x2b')]){if('undefined'===typeof window[_0x68c5('0x17')][_0x68c5('0x6b')][_0x68c5('0x70')][_0x3769d7])return _0x414007(_0x68c5('0xb4')+_0x3769d7+']'),_0x4b9804;window[_0x68c5('0x17')][_0x68c5('0x6b')][_0x68c5('0x70')][_0x3769d7][_0x68c5('0xb6')]=_0x3769d7;_0x1327e9[_0x68c5('0xba')]([window['_QuatroDigital_DropDown'][_0x68c5('0x6b')]['items'][_0x3769d7]],[_0x68c5('0x70'),_0x68c5('0x71'),'shippingData'])[_0x68c5('0xb1')](function(_0x2afc03){_0x4b9804=!0x0;window[_0x68c5('0x17')]['getOrderForm']=_0x2afc03;_0x50fa97(_0x2afc03);_0x3e7cbc(!0x0);})['fail'](function(_0x23da0c){_0x414007([_0x68c5('0xbb'),_0x23da0c]);_0x3e7cbc();});}else alert(_0x68c5('0xbc'));};_0x449f91[_0x68c5('0x44')]=function(_0x19d47a,_0x55709c,_0x4838c7,_0x21416f){_0x21416f=_0x21416f||_0x1d168d('.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2');_0x19d47a=_0x19d47a||'+';_0x55709c=_0x55709c||0.9*_0x21416f[_0x68c5('0xbd')]();_0x21416f['stop'](!0x0,!0x0)[_0x68c5('0xbe')]({'scrollTop':isNaN(_0x4838c7)?_0x19d47a+'='+_0x55709c+'px':_0x4838c7});};_0x2a49a9[_0x68c5('0x45')]||(_0x449f91[_0x68c5('0x47')](),_0x1d168d['fn']['simpleCart'](!0x0));_0x1d168d(window)['on'](_0x68c5('0xbf'),function(){try{window[_0x68c5('0x17')][_0x68c5('0x6b')]=void 0x0,_0x449f91[_0x68c5('0x47')]();}catch(_0x16c5d9){_0x414007('Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20'+_0x16c5d9[_0x68c5('0xf')],_0x68c5('0xc0'));}});'function'===typeof _0x2a49a9[_0x68c5('0xa')]?_0x2a49a9[_0x68c5('0xa')][_0x68c5('0x5d')](this):_0x414007('Callback\x20não\x20é\x20uma\x20função');};_0x1d168d['fn']['QD_dropDownCart']=function(_0x2a6ce5){var _0x1a291e=_0x1d168d(this);_0x1a291e['fn']=new _0x1d168d[(_0x68c5('0x19'))](this,_0x2a6ce5);return _0x1a291e;};}catch(_0x3bbbcf){'undefined'!==typeof console&&_0x68c5('0xc')===typeof console[_0x68c5('0xd')]&&console[_0x68c5('0xd')]('Oooops!\x20',_0x3bbbcf);}}(this));(function(_0x3374c1){try{var _0x457c13=jQuery;window[_0x68c5('0x6c')]=window['_QuatroDigital_AmountProduct']||{};window[_0x68c5('0x6c')]['items']={};window[_0x68c5('0x6c')][_0x68c5('0xc1')]=!0x1;window['_QuatroDigital_AmountProduct']['buyButtonClicked']=!0x1;window[_0x68c5('0x6c')][_0x68c5('0xc2')]=!0x1;var _0x25aab3=function(){if(window['_QuatroDigital_AmountProduct'][_0x68c5('0xc1')]){var _0x3fec26=!0x1;var _0x5c2396={};window[_0x68c5('0x6c')][_0x68c5('0x70')]={};for(_0x295882 in window[_0x68c5('0x17')]['getOrderForm']['items'])if(_0x68c5('0x32')===typeof window['_QuatroDigital_DropDown']['getOrderForm'][_0x68c5('0x70')][_0x295882]){var _0x2c951f=window['_QuatroDigital_DropDown'][_0x68c5('0x6b')][_0x68c5('0x70')][_0x295882];'undefined'!==typeof _0x2c951f[_0x68c5('0xc3')]&&null!==_0x2c951f[_0x68c5('0xc3')]&&''!==_0x2c951f['productId']&&(window['_QuatroDigital_AmountProduct'][_0x68c5('0x70')]['prod_'+_0x2c951f['productId']]=window[_0x68c5('0x6c')][_0x68c5('0x70')]['prod_'+_0x2c951f[_0x68c5('0xc3')]]||{},window[_0x68c5('0x6c')]['items'][_0x68c5('0xc4')+_0x2c951f[_0x68c5('0xc3')]][_0x68c5('0xc5')]=_0x2c951f[_0x68c5('0xc3')],_0x5c2396[_0x68c5('0xc4')+_0x2c951f[_0x68c5('0xc3')]]||(window['_QuatroDigital_AmountProduct'][_0x68c5('0x70')]['prod_'+_0x2c951f[_0x68c5('0xc3')]][_0x68c5('0x61')]=0x0),window[_0x68c5('0x6c')]['items'][_0x68c5('0xc4')+_0x2c951f[_0x68c5('0xc3')]][_0x68c5('0x61')]+=_0x2c951f[_0x68c5('0xb5')],_0x3fec26=!0x0,_0x5c2396[_0x68c5('0xc4')+_0x2c951f[_0x68c5('0xc3')]]=!0x0);}var _0x295882=_0x3fec26;}else _0x295882=void 0x0;window[_0x68c5('0x6c')]['allowRecalculate']&&(_0x457c13(_0x68c5('0xc6'))[_0x68c5('0xc7')](),_0x457c13(_0x68c5('0xc8'))[_0x68c5('0x3e')](_0x68c5('0xc9')));for(var _0x1ed1d1 in window[_0x68c5('0x6c')][_0x68c5('0x70')]){_0x2c951f=window[_0x68c5('0x6c')]['items'][_0x1ed1d1];if(_0x68c5('0x32')!==typeof _0x2c951f)return;_0x5c2396=_0x457c13(_0x68c5('0xca')+_0x2c951f['prodId']+']')[_0x68c5('0x0')]('li');if(window['_QuatroDigital_AmountProduct']['allowRecalculate']||!_0x5c2396[_0x68c5('0x38')](_0x68c5('0xc6'))[_0x68c5('0x7')])_0x3fec26=_0x457c13('<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>'),_0x3fec26['find'](_0x68c5('0xcb'))['html'](_0x2c951f['qtt']),_0x2c951f=_0x5c2396[_0x68c5('0x38')](_0x68c5('0xcc')),_0x2c951f[_0x68c5('0x7')]?_0x2c951f['prepend'](_0x3fec26)['addClass'](_0x68c5('0xc9')):_0x5c2396[_0x68c5('0xcd')](_0x3fec26);}_0x295882&&(window[_0x68c5('0x6c')][_0x68c5('0xc1')]=!0x1);};window[_0x68c5('0x6c')]['exec']=function(){window[_0x68c5('0x6c')][_0x68c5('0xc1')]=!0x0;_0x25aab3[_0x68c5('0x5d')](this);};_0x457c13(document)[_0x68c5('0xce')](function(){_0x25aab3['call'](this);});}catch(_0x4e2d41){_0x68c5('0x4')!==typeof console&&_0x68c5('0xc')===typeof console['error']&&console[_0x68c5('0xd')](_0x68c5('0xe'),_0x4e2d41);}}(this));(function(){try{var _0x2dcc4c=jQuery,_0x4af6f6,_0x1f247e={'selector':_0x68c5('0xcf'),'dropDown':{},'buyButton':{}};_0x2dcc4c[_0x68c5('0xd0')]=function(_0xc0e102){var _0x2ccf85={};_0x4af6f6=_0x2dcc4c[_0x68c5('0x22')](!0x0,{},_0x1f247e,_0xc0e102);_0xc0e102=_0x2dcc4c(_0x4af6f6[_0x68c5('0xd1')])[_0x68c5('0x19')](_0x4af6f6[_0x68c5('0xd2')]);_0x2ccf85[_0x68c5('0xd3')]=_0x68c5('0x4')!==typeof _0x4af6f6[_0x68c5('0xd2')][_0x68c5('0x45')]&&!0x1===_0x4af6f6[_0x68c5('0xd2')][_0x68c5('0x45')]?_0x2dcc4c(_0x4af6f6[_0x68c5('0xd1')])[_0x68c5('0xd4')](_0xc0e102['fn'],_0x4af6f6[_0x68c5('0xd3')]):_0x2dcc4c(_0x4af6f6[_0x68c5('0xd1')])[_0x68c5('0xd4')](_0x4af6f6[_0x68c5('0xd3')]);_0x2ccf85['dropDown']=_0xc0e102;return _0x2ccf85;};_0x2dcc4c['fn'][_0x68c5('0xd5')]=function(){_0x68c5('0x32')===typeof console&&_0x68c5('0xc')===typeof console['info']&&console['info'](_0x68c5('0xd6'));};_0x2dcc4c[_0x68c5('0xd5')]=_0x2dcc4c['fn'][_0x68c5('0xd5')];}catch(_0xcc6836){'undefined'!==typeof console&&_0x68c5('0xc')===typeof console[_0x68c5('0xd')]&&console[_0x68c5('0xd')](_0x68c5('0xe'),_0xcc6836);}}());

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0xcac5=['addClass','qdpv-video-on','fadeTo','add','animate','find','a:not(\x27.qd-videoLink\x27)','bind','click.removeVideo','stop','hide','style','call','string','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27','\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','click.playVideo','removeClass','.qd-playerWrapper\x20iframe','contentWindow','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','attr','rel','a:not(.qd-videoLink)','click','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','insertThumbsIn','trigger','ajaxStop','ImageControl','body','object','undefined','warn','[Video\x20in\x20product]\x20','info','toLowerCase','error','qdVideoInProduct','td.value-field.Videos:first','http','ul.thumbs','div#image','videoFieldSelector','replace','split','length','indexOf','push','shift','youtu.be','pop','#include','wrap','<div\x20class=\x22qd-playerContainer\x22></div>','fromCharCode','charCodeAt','join','toUpperCase','ite','---','erc','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','youtube','html','<iframe\x20src=\x22','urlProtocol','://www.youtube.com/embed/','height','data'];(function(_0x339631,_0x7645ca){var _0x1cbcd6=function(_0xb74561){while(--_0xb74561){_0x339631['push'](_0x339631['shift']());}};_0x1cbcd6(++_0x7645ca);}(_0xcac5,0xfc));var _0x5cac=function(_0x3d031f,_0xa066a6){_0x3d031f=_0x3d031f-0x0;var _0x8a8cc4=_0xcac5[_0x3d031f];return _0x8a8cc4;};(function(_0x1bb2af){$(function(){if($(document[_0x5cac('0x0')])['is']('.produto')){var _0x5e00c3=[];var _0xc0e3de=function(_0x21dbe7,_0x3e2bf9){_0x5cac('0x1')===typeof console&&(_0x5cac('0x2')!==typeof _0x3e2bf9&&'alerta'===_0x3e2bf9['toLowerCase']()?console[_0x5cac('0x3')](_0x5cac('0x4')+_0x21dbe7):_0x5cac('0x2')!==typeof _0x3e2bf9&&_0x5cac('0x5')===_0x3e2bf9[_0x5cac('0x6')]()?console[_0x5cac('0x5')](_0x5cac('0x4')+_0x21dbe7):console[_0x5cac('0x7')]('[Video\x20in\x20product]\x20'+_0x21dbe7));};window[_0x5cac('0x8')]=window['qdVideoInProduct']||{};var _0x5caeee=$['extend'](!0x0,{'insertThumbsIn':'start','videoFieldSelector':_0x5cac('0x9'),'controlVideo':!0x0,'urlProtocol':_0x5cac('0xa')},window[_0x5cac('0x8')]);var _0x37127f=$(_0x5cac('0xb'));var _0x576356=$(_0x5cac('0xc'));var _0x1b9ffd=$(_0x5caeee[_0x5cac('0xd')])['text']()[_0x5cac('0xe')](/\;\s*/,';')[_0x5cac('0xf')](';');for(var _0x45853a=0x0;_0x45853a<_0x1b9ffd[_0x5cac('0x10')];_0x45853a++)-0x1<_0x1b9ffd[_0x45853a][_0x5cac('0x11')]('youtube')?_0x5e00c3[_0x5cac('0x12')](_0x1b9ffd[_0x45853a][_0x5cac('0xf')]('v=')['pop']()['split'](/[&#]/)[_0x5cac('0x13')]()):-0x1<_0x1b9ffd[_0x45853a]['indexOf'](_0x5cac('0x14'))&&_0x5e00c3['push'](_0x1b9ffd[_0x45853a]['split']('be/')[_0x5cac('0x15')]()[_0x5cac('0xf')](/[\?&#]/)[_0x5cac('0x13')]());var _0x2523bb=$('<div\x20class=\x22qd-playerWrapper\x22></div>');_0x2523bb['prependTo'](_0x5cac('0x16'));_0x2523bb[_0x5cac('0x17')](_0x5cac('0x18'));_0x1b9ffd=function(_0x8652f4){var _0x2708d7={'s':'yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x377a7c){var _0x208dcf=function(_0x44120e){return _0x44120e;};var _0x19810c=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x377a7c=_0x377a7c['d'+_0x19810c[0x10]+'c'+_0x19810c[0x11]+'m'+_0x208dcf(_0x19810c[0x1])+'n'+_0x19810c[0xd]]['l'+_0x19810c[0x12]+'c'+_0x19810c[0x0]+'ti'+_0x208dcf('o')+'n'];var _0x2d0d3c=function(_0xf66cbe){return escape(encodeURIComponent(_0xf66cbe['replace'](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x217266){return String[_0x5cac('0x19')](('Z'>=_0x217266?0x5a:0x7a)>=(_0x217266=_0x217266[_0x5cac('0x1a')](0x0)+0xd)?_0x217266:_0x217266-0x1a);})));};var _0x1acf22=_0x2d0d3c(_0x377a7c[[_0x19810c[0x9],_0x208dcf('o'),_0x19810c[0xc],_0x19810c[_0x208dcf(0xd)]][_0x5cac('0x1b')]('')]);_0x2d0d3c=_0x2d0d3c((window[['js',_0x208dcf('no'),'m',_0x19810c[0x1],_0x19810c[0x4][_0x5cac('0x1c')](),_0x5cac('0x1d')][_0x5cac('0x1b')]('')]||_0x5cac('0x1e'))+['.v',_0x19810c[0xd],'e',_0x208dcf('x'),'co',_0x208dcf('mm'),_0x5cac('0x1f'),_0x19810c[0x1],'.c',_0x208dcf('o'),'m.',_0x19810c[0x13],'r'][_0x5cac('0x1b')](''));for(var _0x3f3069 in _0x2708d7){if(_0x2d0d3c===_0x3f3069+_0x2708d7[_0x3f3069]||_0x1acf22===_0x3f3069+_0x2708d7[_0x3f3069]){var _0x3665de='tr'+_0x19810c[0x11]+'e';break;}_0x3665de='f'+_0x19810c[0x0]+'ls'+_0x208dcf(_0x19810c[0x1])+'';}_0x208dcf=!0x1;-0x1<_0x377a7c[[_0x19810c[0xc],'e',_0x19810c[0x0],'rc',_0x19810c[0x9]][_0x5cac('0x1b')]('')][_0x5cac('0x11')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x208dcf=!0x0);return[_0x3665de,_0x208dcf];}(_0x8652f4);}(window);if(!eval(_0x1b9ffd[0x0]))return _0x1b9ffd[0x1]?_0xc0e3de(_0x5cac('0x20')):!0x1;var _0x25f715=function(_0x33b039,_0x3ad9e6){_0x5cac('0x21')===_0x3ad9e6&&_0x2523bb[_0x5cac('0x22')](_0x5cac('0x23')+_0x5caeee[_0x5cac('0x24')]+_0x5cac('0x25')+_0x33b039+'?wmode=transparent&rel=0&enablejsapi=1\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>');_0x576356['data'](_0x5cac('0x26'),_0x576356[_0x5cac('0x27')](_0x5cac('0x26'))||_0x576356[_0x5cac('0x26')]());_0x576356['stop'](!0x0,!0x0)['fadeTo'](0x1f4,0x0,function(){$(_0x5cac('0x0'))[_0x5cac('0x28')](_0x5cac('0x29'));});_0x2523bb['stop'](!0x0,!0x0)[_0x5cac('0x2a')](0x1f4,0x1,function(){_0x576356[_0x5cac('0x2b')](_0x2523bb)[_0x5cac('0x2c')]({'height':_0x2523bb[_0x5cac('0x2d')]('iframe')['height']()},0x2bc);});};removePlayer=function(){_0x37127f['find'](_0x5cac('0x2e'))[_0x5cac('0x2f')](_0x5cac('0x30'),function(){_0x2523bb[_0x5cac('0x31')](!0x0,!0x0)[_0x5cac('0x2a')](0x1f4,0x0,function(){$(this)[_0x5cac('0x32')]()['removeAttr'](_0x5cac('0x33'));$(_0x5cac('0x0'))['removeClass'](_0x5cac('0x29'));});_0x576356[_0x5cac('0x31')](!0x0,!0x0)['fadeTo'](0x1f4,0x1,function(){var _0x25ed65=_0x576356['data'](_0x5cac('0x26'));_0x25ed65&&_0x576356['animate']({'height':_0x25ed65},0x2bc);});});};var _0x39d72e=function(){if(!_0x37127f[_0x5cac('0x2d')]('.qd-videoItem')[_0x5cac('0x10')])for(vId in removePlayer[_0x5cac('0x34')](this),_0x5e00c3)if(_0x5cac('0x35')===typeof _0x5e00c3[vId]&&''!==_0x5e00c3[vId]){var _0x1d4bca=$(_0x5cac('0x36')+_0x5e00c3[vId]+_0x5cac('0x37')+_0x5e00c3[vId]+_0x5cac('0x38')+_0x5e00c3[vId]+_0x5cac('0x39'));_0x1d4bca['find']('a')[_0x5cac('0x2f')](_0x5cac('0x3a'),function(){var _0x2bf5bc=$(this);_0x37127f[_0x5cac('0x2d')]('.ON')[_0x5cac('0x3b')]('ON');_0x2bf5bc[_0x5cac('0x28')]('ON');0x1==_0x5caeee['controlVideo']?$(_0x5cac('0x3c'))[_0x5cac('0x10')]?(_0x25f715[_0x5cac('0x34')](this,'',''),$(_0x5cac('0x3c'))[0x0][_0x5cac('0x3d')][_0x5cac('0x3e')](_0x5cac('0x3f'),'*')):_0x25f715['call'](this,_0x2bf5bc[_0x5cac('0x40')](_0x5cac('0x41')),_0x5cac('0x21')):_0x25f715[_0x5cac('0x34')](this,_0x2bf5bc['attr'](_0x5cac('0x41')),_0x5cac('0x21'));return!0x1;});0x1==_0x5caeee['controlVideo']&&_0x37127f[_0x5cac('0x2d')](_0x5cac('0x42'))[_0x5cac('0x43')](function(_0x43402e){$(_0x5cac('0x3c'))[_0x5cac('0x10')]&&$('.qd-playerWrapper\x20iframe')[0x0][_0x5cac('0x3d')][_0x5cac('0x3e')](_0x5cac('0x44'),'*');});'start'===_0x5caeee[_0x5cac('0x45')]?_0x1d4bca['prependTo'](_0x37127f):_0x1d4bca['appendTo'](_0x37127f);_0x1d4bca[_0x5cac('0x46')]('QuatroDigital.pv_video_added',[_0x5e00c3[vId],_0x1d4bca]);}};$(document)[_0x5cac('0x47')](_0x39d72e);$(window)['load'](_0x39d72e);(function(){var _0x66b756=this;var _0x4715aa=window[_0x5cac('0x48')]||function(){};window[_0x5cac('0x48')]=function(_0x53c9b5,_0x3dbb63){$(_0x53c9b5||'')['is']('.qd-videoLink')||(_0x4715aa[_0x5cac('0x34')](this,_0x53c9b5,_0x3dbb63),_0x39d72e['call'](_0x66b756));};}());}});}(this));

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
var _0xda3a=['documentElement','QD_SIL_scroll','QD_smartImageLoad','function','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','join','erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','object','undefined','warn','unshift','toLowerCase','info','apply','.qd_sil_img_wrapper','300','QD_SIL_scroll\x20QuatroDigital.is_Callback','find','imageWrapper','.qd-sil-on','img:visible','length','scrollTop','bottom','first','height','error','Problemas\x20:(\x20.\x20Detalhes:\x20','clone','load','addClass','attr','src','replace','sizes','width','qd-sil-image','insertAfter','qd-sil-on','top','each','extend'];(function(_0x53f1ea,_0x2e4de1){var _0x486da3=function(_0x474027){while(--_0x474027){_0x53f1ea['push'](_0x53f1ea['shift']());}};_0x486da3(++_0x2e4de1);}(_0xda3a,0x8c));var _0xada3=function(_0x59c178,_0x5a31ee){_0x59c178=_0x59c178-0x0;var _0x3423fe=_0xda3a[_0x59c178];return _0x3423fe;};(function(_0x1113d9){'use strict';var _0x2fadf3=jQuery;if(typeof _0x2fadf3['fn'][_0xada3('0x0')]===_0xada3('0x1'))return;_0x2fadf3['fn'][_0xada3('0x0')]=function(){};var _0x4cbfe3=function(_0xeb76cf){var _0xe00efb={'s':_0xada3('0x2')};return function(_0x5bafcb){var _0x33d46c,_0x42bac4,_0x4abc4b,_0x272e30;_0x42bac4=function(_0x26fe6d){return _0x26fe6d;};_0x4abc4b=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5bafcb=_0x5bafcb['d'+_0x4abc4b[0x10]+'c'+_0x4abc4b[0x11]+'m'+_0x42bac4(_0x4abc4b[0x1])+'n'+_0x4abc4b[0xd]]['l'+_0x4abc4b[0x12]+'c'+_0x4abc4b[0x0]+'ti'+_0x42bac4('o')+'n'];_0x33d46c=function(_0x32a6ea){return escape(encodeURIComponent(_0x32a6ea['replace'](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x209edf){return String[_0xada3('0x3')](('Z'>=_0x209edf?0x5a:0x7a)>=(_0x209edf=_0x209edf[_0xada3('0x4')](0x0)+0xd)?_0x209edf:_0x209edf-0x1a);})));};var _0x14a883=_0x33d46c(_0x5bafcb[[_0x4abc4b[0x9],_0x42bac4('o'),_0x4abc4b[0xc],_0x4abc4b[_0x42bac4(0xd)]][_0xada3('0x5')]('')]);_0x33d46c=_0x33d46c((window[['js',_0x42bac4('no'),'m',_0x4abc4b[0x1],_0x4abc4b[0x4]['toUpperCase'](),'ite']['join']('')]||'---')+['.v',_0x4abc4b[0xd],'e',_0x42bac4('x'),'co',_0x42bac4('mm'),_0xada3('0x6'),_0x4abc4b[0x1],'.c',_0x42bac4('o'),'m.',_0x4abc4b[0x13],'r'][_0xada3('0x5')](''));for(var _0x1235b4 in _0xe00efb){if(_0x33d46c===_0x1235b4+_0xe00efb[_0x1235b4]||_0x14a883===_0x1235b4+_0xe00efb[_0x1235b4]){_0x272e30='tr'+_0x4abc4b[0x11]+'e';break;}_0x272e30='f'+_0x4abc4b[0x0]+'ls'+_0x42bac4(_0x4abc4b[0x1])+'';}_0x42bac4=!0x1;-0x1<_0x5bafcb[[_0x4abc4b[0xc],'e',_0x4abc4b[0x0],'rc',_0x4abc4b[0x9]]['join']('')][_0xada3('0x7')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x42bac4=!0x0);return[_0x272e30,_0x42bac4];}(_0xeb76cf);}(window);if(!eval(_0x4cbfe3[0x0]))return _0x4cbfe3[0x1]?_0x1a6b0f(_0xada3('0x8')):!0x1;var _0x20debb='Quatro\x20Digital\x20-\x20Smart\x20Image\x20Load';var _0x1a6b0f=function(_0x3639bc,_0x314a9d){if(_0xada3('0x9')===typeof console&&_0xada3('0xa')!==typeof console['error']&&_0xada3('0xa')!==typeof console['info']&&_0xada3('0xa')!==typeof console[_0xada3('0xb')]){if(_0xada3('0x9')==typeof _0x3639bc&&_0xada3('0x1')==typeof _0x3639bc[_0xada3('0xc')]){_0x3639bc[_0xada3('0xc')]('['+_0x20debb+']\x0a');var _0x23d093=_0x3639bc;}else _0x23d093=['['+_0x20debb+']\x0a',_0x3639bc];if(_0xada3('0xa')==typeof _0x314a9d||'alerta'!==_0x314a9d[_0xada3('0xd')]()&&'aviso'!==_0x314a9d[_0xada3('0xd')]())if(_0xada3('0xa')!=typeof _0x314a9d&&_0xada3('0xe')==_0x314a9d[_0xada3('0xd')]())try{console[_0xada3('0xe')]['apply'](console,_0x23d093);}catch(_0x554c0d){try{console[_0xada3('0xe')](_0x23d093[_0xada3('0x5')]('\x0a'));}catch(_0x1ed3bc){}}else try{console['error'][_0xada3('0xf')](console,_0x23d093);}catch(_0x3bc9fe){try{console['error'](_0x23d093[_0xada3('0x5')]('\x0a'));}catch(_0x3be758){}}else try{console[_0xada3('0xb')]['apply'](console,_0x23d093);}catch(_0x55f26c){try{console[_0xada3('0xb')](_0x23d093[_0xada3('0x5')]('\x0a'));}catch(_0x4ab097){}}}};var _0x33834e=/(ids\/[0-9]+-)[0-9-]+/i;var _0x30ea27={'imageWrapper':_0xada3('0x10'),'sizes':{'width':_0xada3('0x11'),'height':_0xada3('0x11')}};var _0x203e5f=function(_0x157875,_0xd63329){'use strict';_0x659cd8();_0x2fadf3(window)['on'](_0xada3('0x12'),_0x659cd8);function _0x659cd8(){try{var _0x1ce0c8=_0x157875[_0xada3('0x13')](_0xd63329[_0xada3('0x14')])['not'](_0xada3('0x15'))[_0xada3('0x13')](_0xada3('0x16'));if(!_0x1ce0c8[_0xada3('0x17')])return;var _0x44ad6f=_0x2fadf3(window);var _0x472645={'top':_0x44ad6f[_0xada3('0x18')]()};_0x472645[_0xada3('0x19')]=_0x472645['top']+_0x44ad6f['height']();var _0x5d4ef7=_0x1ce0c8[_0xada3('0x1a')]()[_0xada3('0x1b')]();var _0x56401d=_0xd6cfde(_0x1ce0c8,_0x472645,_0x5d4ef7);for(var _0x27d381=0x0;_0x27d381<_0x56401d[_0xada3('0x17')];_0x27d381++)_0x4aa1cb(_0x2fadf3(_0x56401d[_0x27d381]));}catch(_0x2bd641){typeof console!=='undefined'&&typeof console[_0xada3('0x1c')]===_0xada3('0x1')&&console[_0xada3('0x1c')](_0xada3('0x1d'),_0x2bd641);}}function _0x4aa1cb(_0x16ff05){var _0x2131d1=_0x16ff05[_0xada3('0x1e')]();_0x2131d1['on'](_0xada3('0x1f'),function(){_0x2fadf3(this)[_0xada3('0x20')]('qd-sil-image-loaded');});_0x2131d1[_0xada3('0x21')]({'src':_0x2131d1[0x0][_0xada3('0x22')][_0xada3('0x23')](_0x33834e,'$1'+_0xd63329[_0xada3('0x24')]['width']+'-'+_0xd63329[_0xada3('0x24')]['height']),'width':_0xd63329[_0xada3('0x24')][_0xada3('0x25')],'height':_0xd63329['sizes']['height']});_0x2131d1['addClass'](_0xada3('0x26'))[_0xada3('0x27')](_0x16ff05);_0x2131d1['closest'](_0xd63329[_0xada3('0x14')])[_0xada3('0x20')](_0xada3('0x28'));}function _0xd6cfde(_0x28f909,_0x36fcaa,_0x4aec13){var _0x22789a;var _0x26379d=[];for(var _0x1bd968=0x0;_0x1bd968<_0x28f909[_0xada3('0x17')];_0x1bd968++){_0x22789a=_0x2fadf3(_0x28f909[_0x1bd968])['offset']();_0x22789a['bottom']=_0x22789a[_0xada3('0x29')]+_0x4aec13;if(!(_0x36fcaa[_0xada3('0x19')]<_0x22789a[_0xada3('0x29')]||_0x36fcaa[_0xada3('0x29')]>_0x22789a['bottom'])){_0x26379d['push'](_0x28f909[_0x1bd968]);}}return _0x26379d;};};_0x2fadf3['fn']['QD_smartImageLoad']=function(_0x4d7ec0){var _0x368f13=_0x2fadf3(this);if(!_0x368f13[_0xada3('0x17')])return _0x368f13;_0x368f13[_0xada3('0x2a')](function(){var _0x44e212=_0x2fadf3(this);_0x44e212['QD_smartImageLoad']=new _0x203e5f(_0x44e212,_0x2fadf3[_0xada3('0x2b')]({},_0x30ea27,_0x4d7ec0));});return _0x368f13;};window['QD_SIL_scrollRange']=0x28;var _0x5f3336=QD_SIL_scrollRange;var _0x46a4a7=0x0;_0x2fadf3(window)['on']('scroll',function(){var _0x4c860b=document[_0xada3('0x2c')]['scrollTop'];if(_0x4c860b>_0x46a4a7+_0x5f3336||_0x4c860b<_0x46a4a7-_0x5f3336){_0x2fadf3(window)['trigger'](_0xada3('0x2d'));_0x46a4a7=_0x4c860b;}});}(this));