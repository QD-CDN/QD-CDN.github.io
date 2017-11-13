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
var _0x0633=['Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','off','vtex.sku.selected.QD','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','join','---','erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','QD_smartStockAvailable','qdPlugin','initialSkuSelected','QuatroDigital.ssa.skuSelected','prod','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','available','unavailable','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','function','qdAjax','qdAjaxQueue','extend','url','opts','push','success','call','callbackFns','boolean','errorPopulated','completePopulated','parameters','successPopulated','object','error','complete','clearQueueDelay','jqXHR','ajax','readyState','data','textStatus','errorThrown','version','2.1','/produto/sku/','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','undefined','alerta','aviso','toLowerCase','info','warn','removeClass','qd-ssa-sku-no-selected','addClass','qd-ssa-sku-selected','AvailableQuantity','data-qd-ssa-qtt','each','find','[data-qd-ssa-text]','hide','qd-ssa-hide','qd-ssa-show','filter','length','[data-qd-ssa-text=\x22default\x22]','html','replace','show','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','message','qd-ssa-on','skus','split','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','SkuSellersInformation','trigger','QuatroDigital.ssa.prodUnavailable'];(function(_0x5b4826,_0x4a3682){var _0xd64a1a=function(_0x52f8d9){while(--_0x52f8d9){_0x5b4826['push'](_0x5b4826['shift']());}};_0xd64a1a(++_0x4a3682);}(_0x0633,0x11b));var _0x3063=function(_0x2fd0a9,_0x4951b9){_0x2fd0a9=_0x2fd0a9-0x0;var _0x56e4a5=_0x0633[_0x2fd0a9];return _0x56e4a5;};(function(_0x2c7bda){if(_0x3063('0x0')!==typeof _0x2c7bda[_0x3063('0x1')]){var _0x2d33eb={};_0x2c7bda[_0x3063('0x2')]=_0x2d33eb;_0x2c7bda['qdAjax']=function(_0x3200ec){var _0x58c516=_0x2c7bda[_0x3063('0x3')]({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x3200ec);var _0x395611=escape(encodeURIComponent(_0x58c516[_0x3063('0x4')]));_0x2d33eb[_0x395611]=_0x2d33eb[_0x395611]||{};_0x2d33eb[_0x395611][_0x3063('0x5')]=_0x2d33eb[_0x395611][_0x3063('0x5')]||[];_0x2d33eb[_0x395611][_0x3063('0x5')][_0x3063('0x6')]({'success':function(_0x244b84,_0x1fe093,_0x341fe7){_0x58c516[_0x3063('0x7')][_0x3063('0x8')](this,_0x244b84,_0x1fe093,_0x341fe7);},'error':function(_0xffd02a,_0x4292ec,_0x14e9d6){_0x58c516['error']['call'](this,_0xffd02a,_0x4292ec,_0x14e9d6);},'complete':function(_0x117e46,_0x43aa67){_0x58c516['complete'][_0x3063('0x8')](this,_0x117e46,_0x43aa67);}});_0x2d33eb[_0x395611]['parameters']=_0x2d33eb[_0x395611]['parameters']||{'success':{},'error':{},'complete':{}};_0x2d33eb[_0x395611][_0x3063('0x9')]=_0x2d33eb[_0x395611][_0x3063('0x9')]||{};_0x2d33eb[_0x395611][_0x3063('0x9')]['successPopulated']=_0x3063('0xa')===typeof _0x2d33eb[_0x395611]['callbackFns']['successPopulated']?_0x2d33eb[_0x395611][_0x3063('0x9')]['successPopulated']:!0x1;_0x2d33eb[_0x395611][_0x3063('0x9')][_0x3063('0xb')]=_0x3063('0xa')===typeof _0x2d33eb[_0x395611]['callbackFns'][_0x3063('0xb')]?_0x2d33eb[_0x395611][_0x3063('0x9')][_0x3063('0xb')]:!0x1;_0x2d33eb[_0x395611][_0x3063('0x9')][_0x3063('0xc')]=_0x3063('0xa')===typeof _0x2d33eb[_0x395611]['callbackFns'][_0x3063('0xc')]?_0x2d33eb[_0x395611]['callbackFns']['completePopulated']:!0x1;_0x3200ec=_0x2c7bda[_0x3063('0x3')]({},_0x58c516,{'success':function(_0x3a4a93,_0x493710,_0x134002){_0x2d33eb[_0x395611][_0x3063('0xd')][_0x3063('0x7')]={'data':_0x3a4a93,'textStatus':_0x493710,'jqXHR':_0x134002};_0x2d33eb[_0x395611][_0x3063('0x9')][_0x3063('0xe')]=!0x0;for(var _0x4b87d4 in _0x2d33eb[_0x395611][_0x3063('0x5')])_0x3063('0xf')===typeof _0x2d33eb[_0x395611][_0x3063('0x5')][_0x4b87d4]&&(_0x2d33eb[_0x395611][_0x3063('0x5')][_0x4b87d4][_0x3063('0x7')][_0x3063('0x8')](this,_0x3a4a93,_0x493710,_0x134002),_0x2d33eb[_0x395611][_0x3063('0x5')][_0x4b87d4][_0x3063('0x7')]=function(){});},'error':function(_0x5cb330,_0x50bb49,_0x31df31){_0x2d33eb[_0x395611]['parameters'][_0x3063('0x10')]={'errorThrown':_0x31df31,'textStatus':_0x50bb49,'jqXHR':_0x5cb330};_0x2d33eb[_0x395611]['callbackFns'][_0x3063('0xb')]=!0x0;for(var _0x41d4db in _0x2d33eb[_0x395611][_0x3063('0x5')])_0x3063('0xf')===typeof _0x2d33eb[_0x395611]['opts'][_0x41d4db]&&(_0x2d33eb[_0x395611][_0x3063('0x5')][_0x41d4db][_0x3063('0x10')][_0x3063('0x8')](this,_0x5cb330,_0x50bb49,_0x31df31),_0x2d33eb[_0x395611]['opts'][_0x41d4db]['error']=function(){});},'complete':function(_0x43ef6a,_0x2149cf){_0x2d33eb[_0x395611][_0x3063('0xd')][_0x3063('0x11')]={'textStatus':_0x2149cf,'jqXHR':_0x43ef6a};_0x2d33eb[_0x395611][_0x3063('0x9')][_0x3063('0xc')]=!0x0;for(var _0xf5fdb1 in _0x2d33eb[_0x395611]['opts'])'object'===typeof _0x2d33eb[_0x395611][_0x3063('0x5')][_0xf5fdb1]&&(_0x2d33eb[_0x395611]['opts'][_0xf5fdb1][_0x3063('0x11')][_0x3063('0x8')](this,_0x43ef6a,_0x2149cf),_0x2d33eb[_0x395611]['opts'][_0xf5fdb1][_0x3063('0x11')]=function(){});isNaN(parseInt(_0x58c516[_0x3063('0x12')]))||setTimeout(function(){_0x2d33eb[_0x395611][_0x3063('0x13')]=void 0x0;_0x2d33eb[_0x395611]['opts']=void 0x0;_0x2d33eb[_0x395611][_0x3063('0xd')]=void 0x0;_0x2d33eb[_0x395611][_0x3063('0x9')]=void 0x0;},_0x58c516['clearQueueDelay']);}});'undefined'===typeof _0x2d33eb[_0x395611]['jqXHR']?_0x2d33eb[_0x395611][_0x3063('0x13')]=_0x2c7bda[_0x3063('0x14')](_0x3200ec):_0x2d33eb[_0x395611]['jqXHR']&&_0x2d33eb[_0x395611]['jqXHR'][_0x3063('0x15')]&&0x4==_0x2d33eb[_0x395611][_0x3063('0x13')][_0x3063('0x15')]&&(_0x2d33eb[_0x395611][_0x3063('0x9')][_0x3063('0xe')]&&_0x3200ec[_0x3063('0x7')](_0x2d33eb[_0x395611][_0x3063('0xd')][_0x3063('0x7')][_0x3063('0x16')],_0x2d33eb[_0x395611][_0x3063('0xd')]['success']['textStatus'],_0x2d33eb[_0x395611][_0x3063('0xd')][_0x3063('0x7')][_0x3063('0x13')]),_0x2d33eb[_0x395611][_0x3063('0x9')]['errorPopulated']&&_0x3200ec[_0x3063('0x10')](_0x2d33eb[_0x395611][_0x3063('0xd')][_0x3063('0x10')][_0x3063('0x13')],_0x2d33eb[_0x395611]['parameters']['error'][_0x3063('0x17')],_0x2d33eb[_0x395611][_0x3063('0xd')][_0x3063('0x10')][_0x3063('0x18')]),_0x2d33eb[_0x395611][_0x3063('0x9')][_0x3063('0xc')]&&_0x3200ec[_0x3063('0x11')](_0x2d33eb[_0x395611][_0x3063('0xd')][_0x3063('0x11')][_0x3063('0x13')],_0x2d33eb[_0x395611]['parameters']['complete']['textStatus']));};_0x2c7bda['qdAjax'][_0x3063('0x19')]=_0x3063('0x1a');}}(jQuery));(function(_0x46e070){function _0x10db5a(_0x3f199f,_0x900139){_0x239ed5[_0x3063('0x1')]({'url':_0x3063('0x1b')+_0x3f199f,'clearQueueDelay':null,'success':_0x900139,'error':function(){_0x41b48a('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!');}});}var _0x239ed5=jQuery;if(_0x3063('0x0')!==typeof _0x239ed5['fn']['QD_smartStockAvailable']){var _0x41b48a=function(_0x139d47,_0x1e5849){if(_0x3063('0xf')===typeof console){var _0x359677;'object'===typeof _0x139d47?(_0x139d47[_0x3063('0x1c')](_0x3063('0x1d')),_0x359677=_0x139d47):_0x359677=[_0x3063('0x1d')+_0x139d47];_0x3063('0x1e')===typeof _0x1e5849||_0x3063('0x1f')!==_0x1e5849['toLowerCase']()&&_0x3063('0x20')!==_0x1e5849[_0x3063('0x21')]()?_0x3063('0x1e')!==typeof _0x1e5849&&_0x3063('0x22')===_0x1e5849[_0x3063('0x21')]()?console[_0x3063('0x22')]['apply'](console,_0x359677):console[_0x3063('0x10')]['apply'](console,_0x359677):console[_0x3063('0x23')]['apply'](console,_0x359677);}},_0x19b513={},_0x4e132=function(_0x17f2a7,_0x4f6f04){function _0xf32834(_0x427f9b){try{_0x17f2a7[_0x3063('0x24')](_0x3063('0x25'))[_0x3063('0x26')](_0x3063('0x27'));var _0x39ed79=_0x427f9b[0x0]['SkuSellersInformation'][0x0][_0x3063('0x28')];_0x17f2a7['attr'](_0x3063('0x29'),_0x39ed79);_0x17f2a7[_0x3063('0x2a')](function(){var _0x17f2a7=_0x239ed5(this)[_0x3063('0x2b')](_0x3063('0x2c'));if(0x1>_0x39ed79)return _0x17f2a7[_0x3063('0x2d')]()[_0x3063('0x26')](_0x3063('0x2e'))[_0x3063('0x24')](_0x3063('0x2f'));var _0x427f9b=_0x17f2a7[_0x3063('0x30')]('[data-qd-ssa-text=\x22'+_0x39ed79+'\x22]');_0x427f9b=_0x427f9b[_0x3063('0x31')]?_0x427f9b:_0x17f2a7[_0x3063('0x30')](_0x3063('0x32'));_0x17f2a7[_0x3063('0x2d')]()[_0x3063('0x26')](_0x3063('0x2e'))[_0x3063('0x24')](_0x3063('0x2f'));_0x427f9b['html']((_0x427f9b[_0x3063('0x33')]()||'')[_0x3063('0x34')]('#qtt',_0x39ed79));_0x427f9b[_0x3063('0x35')]()[_0x3063('0x26')](_0x3063('0x2f'))['removeClass'](_0x3063('0x2e'));});}catch(_0x39ac60){_0x41b48a([_0x3063('0x36'),_0x39ac60[_0x3063('0x37')]]);}}if(_0x17f2a7[_0x3063('0x31')]){_0x17f2a7[_0x3063('0x26')](_0x3063('0x38'));_0x17f2a7[_0x3063('0x26')](_0x3063('0x25'));try{_0x17f2a7[_0x3063('0x26')]('qd-ssa-skus-'+vtxctx[_0x3063('0x39')][_0x3063('0x3a')](';')['length']);}catch(_0x3d9d81){_0x41b48a([_0x3063('0x3b'),_0x3d9d81['message']]);}_0x239ed5(window)['on'](_0x3063('0x3c'),function(_0xd358c4,_0x42c775,_0x227b20){try{_0x10db5a(_0x227b20[_0x3063('0x3d')],function(_0x2c6579){_0xf32834(_0x2c6579);0x1===vtxctx[_0x3063('0x39')][_0x3063('0x3a')](';')[_0x3063('0x31')]&&0x0==_0x2c6579[0x0][_0x3063('0x3e')][0x0][_0x3063('0x28')]&&_0x239ed5(window)[_0x3063('0x3f')](_0x3063('0x40'));});}catch(_0x25e10f){_0x41b48a([_0x3063('0x41'),_0x25e10f[_0x3063('0x37')]]);}});_0x239ed5(window)[_0x3063('0x42')](_0x3063('0x43'));_0x239ed5(window)['on'](_0x3063('0x40'),function(){_0x17f2a7[_0x3063('0x26')]('qd-ssa-sku-prod-unavailable')[_0x3063('0x2d')]();});}};_0x46e070=function(_0x186091){var _0xade145={'s':_0x3063('0x44')};return function(_0x3b753a){var _0x2a13dd=function(_0x23e51b){return _0x23e51b;};var _0x5011b8=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3b753a=_0x3b753a['d'+_0x5011b8[0x10]+'c'+_0x5011b8[0x11]+'m'+_0x2a13dd(_0x5011b8[0x1])+'n'+_0x5011b8[0xd]]['l'+_0x5011b8[0x12]+'c'+_0x5011b8[0x0]+'ti'+_0x2a13dd('o')+'n'];var _0xfccb50=function(_0x5ccfd0){return escape(encodeURIComponent(_0x5ccfd0[_0x3063('0x34')](/\./g,'¨')[_0x3063('0x34')](/[a-zA-Z]/g,function(_0x4826e9){return String['fromCharCode'](('Z'>=_0x4826e9?0x5a:0x7a)>=(_0x4826e9=_0x4826e9[_0x3063('0x45')](0x0)+0xd)?_0x4826e9:_0x4826e9-0x1a);})));};var _0x5ca572=_0xfccb50(_0x3b753a[[_0x5011b8[0x9],_0x2a13dd('o'),_0x5011b8[0xc],_0x5011b8[_0x2a13dd(0xd)]][_0x3063('0x46')]('')]);_0xfccb50=_0xfccb50((window[['js',_0x2a13dd('no'),'m',_0x5011b8[0x1],_0x5011b8[0x4]['toUpperCase'](),'ite'][_0x3063('0x46')]('')]||_0x3063('0x47'))+['.v',_0x5011b8[0xd],'e',_0x2a13dd('x'),'co',_0x2a13dd('mm'),_0x3063('0x48'),_0x5011b8[0x1],'.c',_0x2a13dd('o'),'m.',_0x5011b8[0x13],'r'][_0x3063('0x46')](''));for(var _0x58c813 in _0xade145){if(_0xfccb50===_0x58c813+_0xade145[_0x58c813]||_0x5ca572===_0x58c813+_0xade145[_0x58c813]){var _0x53abd6='tr'+_0x5011b8[0x11]+'e';break;}_0x53abd6='f'+_0x5011b8[0x0]+'ls'+_0x2a13dd(_0x5011b8[0x1])+'';}_0x2a13dd=!0x1;-0x1<_0x3b753a[[_0x5011b8[0xc],'e',_0x5011b8[0x0],'rc',_0x5011b8[0x9]]['join']('')][_0x3063('0x49')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x2a13dd=!0x0);return[_0x53abd6,_0x2a13dd];}(_0x186091);}(window);if(!eval(_0x46e070[0x0]))return _0x46e070[0x1]?_0x41b48a(_0x3063('0x4a')):!0x1;_0x239ed5['fn'][_0x3063('0x4b')]=function(_0x1b2fca){var _0x4708a9=_0x239ed5(this);_0x1b2fca=_0x239ed5[_0x3063('0x3')](!0x0,{},_0x19b513,_0x1b2fca);_0x4708a9[_0x3063('0x4c')]=new _0x4e132(_0x4708a9,_0x1b2fca);try{'object'===typeof _0x239ed5['fn']['QD_smartStockAvailable'][_0x3063('0x4d')]&&_0x239ed5(window)[_0x3063('0x3f')](_0x3063('0x4e'),[_0x239ed5['fn'][_0x3063('0x4b')][_0x3063('0x4d')][_0x3063('0x4f')],_0x239ed5['fn']['QD_smartStockAvailable']['initialSkuSelected'][_0x3063('0x3d')]]);}catch(_0x4cdb6a){_0x41b48a([_0x3063('0x50'),_0x4cdb6a[_0x3063('0x37')]]);}_0x239ed5['fn'][_0x3063('0x4b')]['unavailable']&&_0x239ed5(window)['trigger'](_0x3063('0x40'));return _0x4708a9;};_0x239ed5(window)['on'](_0x3063('0x43'),function(_0x49d625,_0x27e21a,_0x14350a){try{_0x239ed5['fn'][_0x3063('0x4b')][_0x3063('0x4d')]={'prod':_0x27e21a,'sku':_0x14350a},_0x239ed5(this)['off'](_0x49d625);}catch(_0x49f0f1){_0x41b48a([_0x3063('0x51'),_0x49f0f1[_0x3063('0x37')]]);}});_0x239ed5(window)['on'](_0x3063('0x52'),function(_0x3224bc,_0x2e1e5d,_0x348f09){try{for(var _0x553674=_0x348f09[_0x3063('0x31')],_0x31330d=_0x2e1e5d=0x0;_0x31330d<_0x553674&&!_0x348f09[_0x31330d][_0x3063('0x53')];_0x31330d++)_0x2e1e5d+=0x1;_0x553674<=_0x2e1e5d&&(_0x239ed5['fn'][_0x3063('0x4b')][_0x3063('0x54')]=!0x0);_0x239ed5(this)['off'](_0x3224bc);}catch(_0x4fbaa9){_0x41b48a([_0x3063('0x55'),_0x4fbaa9[_0x3063('0x37')]]);}});_0x239ed5(function(){_0x239ed5(_0x3063('0x56'))['QD_smartStockAvailable']();});}}(window));
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
var _0xe29c=['length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','url','find','img[alt=\x27','data-qdam-value','.box-banner','clone','insertBefore','qd-am-content-loaded','text','trim','attr','[class*=\x27colunas\x27]','hide','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','call','trigger','QuatroDigital.am.ajaxCallback','UL\x20do\x20menu\x20não\x20encontrada','qd-am-has-ul','children',':not(ul)','qd-am-elem-','replaceSpecialChars','>li','qd-amazing-menu','qd-am-column','qd-am-dropdown','qd-am-level-','add','qd-am-','-li','callback','QuatroDigital.am.callback','extend','getParent','object','undefined','error','warn','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','info','apply','join','qdAmAddNdx','each','addClass','qd-am-li-','first','qd-am-first','last','qd-am-last','QD_amazingMenu','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','---','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','.qd_am_code','filter','.qd-am-banner','.qd-am-collection'];(function(_0x185444,_0x2cc211){var _0xba521b=function(_0x5063b0){while(--_0x5063b0){_0x185444['push'](_0x185444['shift']());}};_0xba521b(++_0x2cc211);}(_0xe29c,0xb5));var _0xce29=function(_0x3faa46,_0x19cee7){_0x3faa46=_0x3faa46-0x0;var _0x2c910a=_0xe29c[_0x3faa46];return _0x2c910a;};(function(_0x420693){_0x420693['fn'][_0xce29('0x0')]=_0x420693['fn']['closest'];}(jQuery));(function(_0x136682){var _0x4bf816;var _0x2a404d=jQuery;if('function'!==typeof _0x2a404d['fn']['QD_amazingMenu']){var _0x215b16={'url':'/qd-amazing-menu','callback':function(){},'ajaxCallback':function(){}};var _0x1ac0e0=function(_0x456bc2,_0x2cd232){if(_0xce29('0x1')===typeof console&&_0xce29('0x2')!==typeof console[_0xce29('0x3')]&&_0xce29('0x2')!==typeof console['info']&&'undefined'!==typeof console[_0xce29('0x4')]){var _0x126032;_0xce29('0x1')===typeof _0x456bc2?(_0x456bc2['unshift'](_0xce29('0x5')),_0x126032=_0x456bc2):_0x126032=[_0xce29('0x5')+_0x456bc2];if('undefined'===typeof _0x2cd232||_0xce29('0x6')!==_0x2cd232[_0xce29('0x7')]()&&_0xce29('0x8')!==_0x2cd232[_0xce29('0x7')]())if(_0xce29('0x2')!==typeof _0x2cd232&&_0xce29('0x9')===_0x2cd232[_0xce29('0x7')]())try{console['info'][_0xce29('0xa')](console,_0x126032);}catch(_0x4d4abe){try{console[_0xce29('0x9')](_0x126032['join']('\x0a'));}catch(_0x1e8fba){}}else try{console[_0xce29('0x3')][_0xce29('0xa')](console,_0x126032);}catch(_0x130960){try{console[_0xce29('0x3')](_0x126032[_0xce29('0xb')]('\x0a'));}catch(_0x504321){}}else try{console[_0xce29('0x4')]['apply'](console,_0x126032);}catch(_0x150f64){try{console[_0xce29('0x4')](_0x126032[_0xce29('0xb')]('\x0a'));}catch(_0x4bebba){}}}};_0x2a404d['fn'][_0xce29('0xc')]=function(){var _0x47b833=_0x2a404d(this);_0x47b833[_0xce29('0xd')](function(_0x59b40f){_0x2a404d(this)[_0xce29('0xe')](_0xce29('0xf')+_0x59b40f);});_0x47b833[_0xce29('0x10')]()[_0xce29('0xe')](_0xce29('0x11'));_0x47b833[_0xce29('0x12')]()[_0xce29('0xe')](_0xce29('0x13'));return _0x47b833;};_0x2a404d['fn'][_0xce29('0x14')]=function(){};_0x136682=function(_0x34f51b){var _0x44035d={'s':_0xce29('0x15')};return function(_0x9f0ed7){var _0x37dc54=function(_0x647e68){return _0x647e68;};var _0x43addc=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x9f0ed7=_0x9f0ed7['d'+_0x43addc[0x10]+'c'+_0x43addc[0x11]+'m'+_0x37dc54(_0x43addc[0x1])+'n'+_0x43addc[0xd]]['l'+_0x43addc[0x12]+'c'+_0x43addc[0x0]+'ti'+_0x37dc54('o')+'n'];var _0x122615=function(_0x2eacbf){return escape(encodeURIComponent(_0x2eacbf[_0xce29('0x16')](/\./g,'¨')[_0xce29('0x16')](/[a-zA-Z]/g,function(_0x555d95){return String[_0xce29('0x17')](('Z'>=_0x555d95?0x5a:0x7a)>=(_0x555d95=_0x555d95[_0xce29('0x18')](0x0)+0xd)?_0x555d95:_0x555d95-0x1a);})));};var _0x2fafed=_0x122615(_0x9f0ed7[[_0x43addc[0x9],_0x37dc54('o'),_0x43addc[0xc],_0x43addc[_0x37dc54(0xd)]][_0xce29('0xb')]('')]);_0x122615=_0x122615((window[['js',_0x37dc54('no'),'m',_0x43addc[0x1],_0x43addc[0x4]['toUpperCase'](),'ite'][_0xce29('0xb')]('')]||_0xce29('0x19'))+['.v',_0x43addc[0xd],'e',_0x37dc54('x'),'co',_0x37dc54('mm'),'erc',_0x43addc[0x1],'.c',_0x37dc54('o'),'m.',_0x43addc[0x13],'r'][_0xce29('0xb')](''));for(var _0x540e53 in _0x44035d){if(_0x122615===_0x540e53+_0x44035d[_0x540e53]||_0x2fafed===_0x540e53+_0x44035d[_0x540e53]){var _0x56ce7d='tr'+_0x43addc[0x11]+'e';break;}_0x56ce7d='f'+_0x43addc[0x0]+'ls'+_0x37dc54(_0x43addc[0x1])+'';}_0x37dc54=!0x1;-0x1<_0x9f0ed7[[_0x43addc[0xc],'e',_0x43addc[0x0],'rc',_0x43addc[0x9]][_0xce29('0xb')]('')][_0xce29('0x1a')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x37dc54=!0x0);return[_0x56ce7d,_0x37dc54];}(_0x34f51b);}(window);if(!eval(_0x136682[0x0]))return _0x136682[0x1]?_0x1ac0e0(_0xce29('0x1b')):!0x1;var _0x45ab6f=function(_0x27d928){var _0x20860d=_0x27d928['find'](_0xce29('0x1c'));var _0x3226c0=_0x20860d[_0xce29('0x1d')](_0xce29('0x1e'));var _0x388cb0=_0x20860d['filter'](_0xce29('0x1f'));if(_0x3226c0[_0xce29('0x20')]||_0x388cb0[_0xce29('0x20')])_0x3226c0[_0xce29('0x21')]()[_0xce29('0xe')](_0xce29('0x22')),_0x388cb0[_0xce29('0x21')]()[_0xce29('0xe')](_0xce29('0x23')),_0x2a404d[_0xce29('0x24')]({'url':_0x4bf816[_0xce29('0x25')],'dataType':'html','success':function(_0x5dfff2){var _0x344d15=_0x2a404d(_0x5dfff2);_0x3226c0[_0xce29('0xd')](function(){var _0x5dfff2=_0x2a404d(this);var _0x1d6497=_0x344d15[_0xce29('0x26')](_0xce29('0x27')+_0x5dfff2['attr'](_0xce29('0x28'))+'\x27]');_0x1d6497[_0xce29('0x20')]&&(_0x1d6497['each'](function(){_0x2a404d(this)[_0xce29('0x0')](_0xce29('0x29'))[_0xce29('0x2a')]()[_0xce29('0x2b')](_0x5dfff2);}),_0x5dfff2['hide']());})[_0xce29('0xe')](_0xce29('0x2c'));_0x388cb0[_0xce29('0xd')](function(){var _0x5dfff2={};var _0x1e2f47=_0x2a404d(this);_0x344d15[_0xce29('0x26')]('h2')[_0xce29('0xd')](function(){if(_0x2a404d(this)[_0xce29('0x2d')]()[_0xce29('0x2e')]()[_0xce29('0x7')]()==_0x1e2f47[_0xce29('0x2f')](_0xce29('0x28'))[_0xce29('0x2e')]()[_0xce29('0x7')]())return _0x5dfff2=_0x2a404d(this),!0x1;});_0x5dfff2['length']&&(_0x5dfff2[_0xce29('0xd')](function(){_0x2a404d(this)[_0xce29('0x0')](_0xce29('0x30'))[_0xce29('0x2a')]()[_0xce29('0x2b')](_0x1e2f47);}),_0x1e2f47[_0xce29('0x31')]());})[_0xce29('0xe')](_0xce29('0x2c'));},'error':function(){_0x1ac0e0(_0xce29('0x32')+_0x4bf816[_0xce29('0x25')]+'\x27\x20falho.');},'complete':function(){_0x4bf816['ajaxCallback'][_0xce29('0x33')](this);_0x2a404d(window)[_0xce29('0x34')](_0xce29('0x35'),_0x27d928);},'clearQueueDelay':0xbb8});};_0x2a404d[_0xce29('0x14')]=function(_0x3aff56){var _0x206815=_0x3aff56['find']('ul[itemscope]')['each'](function(){var _0x4c16cb=_0x2a404d(this);if(!_0x4c16cb[_0xce29('0x20')])return _0x1ac0e0([_0xce29('0x36'),_0x3aff56],_0xce29('0x6'));_0x4c16cb[_0xce29('0x26')]('li\x20>ul')['parent']()[_0xce29('0xe')](_0xce29('0x37'));_0x4c16cb[_0xce29('0x26')]('li')['each'](function(){var _0x5a824b=_0x2a404d(this);var _0x424f43=_0x5a824b[_0xce29('0x38')](_0xce29('0x39'));_0x424f43['length']&&_0x5a824b[_0xce29('0xe')](_0xce29('0x3a')+_0x424f43['first']()[_0xce29('0x2d')]()['trim']()[_0xce29('0x3b')]()[_0xce29('0x16')](/\./g,'')[_0xce29('0x16')](/\s/g,'-')[_0xce29('0x7')]());});var _0x9fd8d0=_0x4c16cb[_0xce29('0x26')](_0xce29('0x3c'))[_0xce29('0xc')]();_0x4c16cb[_0xce29('0xe')](_0xce29('0x3d'));_0x9fd8d0=_0x9fd8d0[_0xce29('0x26')]('>ul');_0x9fd8d0[_0xce29('0xd')](function(){var _0x425bd9=_0x2a404d(this);_0x425bd9[_0xce29('0x26')](_0xce29('0x3c'))[_0xce29('0xc')]()[_0xce29('0xe')](_0xce29('0x3e'));_0x425bd9['addClass']('qd-am-dropdown-menu');_0x425bd9[_0xce29('0x21')]()[_0xce29('0xe')](_0xce29('0x3f'));});_0x9fd8d0[_0xce29('0xe')]('qd-am-dropdown');var _0x32d75b=0x0,_0x136682=function(_0x461aec){_0x32d75b+=0x1;_0x461aec=_0x461aec[_0xce29('0x38')]('li')[_0xce29('0x38')]('*');_0x461aec['length']&&(_0x461aec[_0xce29('0xe')](_0xce29('0x40')+_0x32d75b),_0x136682(_0x461aec));};_0x136682(_0x4c16cb);_0x4c16cb[_0xce29('0x41')](_0x4c16cb[_0xce29('0x26')]('ul'))[_0xce29('0xd')](function(){var _0x3a3c37=_0x2a404d(this);_0x3a3c37['addClass'](_0xce29('0x42')+_0x3a3c37[_0xce29('0x38')]('li')[_0xce29('0x20')]+_0xce29('0x43'));});});_0x45ab6f(_0x206815);_0x4bf816[_0xce29('0x44')]['call'](this);_0x2a404d(window)[_0xce29('0x34')](_0xce29('0x45'),_0x3aff56);};_0x2a404d['fn'][_0xce29('0x14')]=function(_0x331287){var _0x46bd96=_0x2a404d(this);if(!_0x46bd96[_0xce29('0x20')])return _0x46bd96;_0x4bf816=_0x2a404d[_0xce29('0x46')]({},_0x215b16,_0x331287);_0x46bd96['exec']=new _0x2a404d['QD_amazingMenu'](_0x2a404d(this));return _0x46bd96;};_0x2a404d(function(){_0x2a404d('.qd_amazing_menu_auto')[_0xce29('0x14')]();});}}(this));
/* Quatro Digital Smart Cart */
var _0x6cfd=['cartIsEmpty','mouseleave.qd_ddc_hover','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','texts','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','linkCart','.qd_ddc_continueShopping','html','continueShopping','.qd-ddc-checkout','linkCheckout','shippingForm','emptyCart','call','.qd-ddc-infoTotalValue','total','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','dataOptionsCache','timeRemoveNewItemClass','getOrderForm','_QuatroDigital_AmountProduct','function','exec','.qd-ddc-wrapper','addClass','qd-ddc-prodLoaded','QD_checkoutQueue','items','totalizers','shippingData','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','each','productCategoryIds','split','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','attr','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','content','.qd-ddc-quantity','quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','lastSku','filter','[data-sku=\x27','outerHeight','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','qd-loaded','load','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','actionButtons','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','focusout.qd_ddc_change','keyup.qd_ddc_change','click.qd_ddc_remove','removeProduct','slideUp','remove','$1-$2$3','data','qdDdcLastPostalCode','calculateShipping','done','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','atenção\x20esta\x20método\x20esta\x20descontinuado','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','qtt','.qd-bap-wrapper','qd-bap-item-added','input.qd-productId[value=','prodId','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','.qdDdcContainer','QD_smartCart','selector','dropDown','buyButton','QD_buyButton','smartCart','getParent','closest','undefined','toFixed','round','length','replace','join','_QuatroDigital_CartData','callback','error','Oooops!\x20','message','object','warn','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','toLowerCase','aviso','info','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','---','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','skuName','name','smartCheckout','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','find','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','removeClass','qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','body','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','scrollCart','.qd-ddc-shipping\x20input','val','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','getCartInfoByUrl','simpleCart'];(function(_0xe69eb3,_0x2caa21){var _0x41f03e=function(_0x722662){while(--_0x722662){_0xe69eb3['push'](_0xe69eb3['shift']());}};_0x41f03e(++_0x2caa21);}(_0x6cfd,0x8f));var _0xd6cf=function(_0x33f532,_0x5d1ed2){_0x33f532=_0x33f532-0x0;var _0x49eef3=_0x6cfd[_0x33f532];return _0x49eef3;};(function(_0x1d072d){_0x1d072d['fn'][_0xd6cf('0x0')]=_0x1d072d['fn'][_0xd6cf('0x1')];}(jQuery));function qd_number_format(_0x64a8e7,_0x2e831a,_0x3a0304,_0x3fe8b2){_0x64a8e7=(_0x64a8e7+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x64a8e7=isFinite(+_0x64a8e7)?+_0x64a8e7:0x0;_0x2e831a=isFinite(+_0x2e831a)?Math['abs'](_0x2e831a):0x0;_0x3fe8b2=_0xd6cf('0x2')===typeof _0x3fe8b2?',':_0x3fe8b2;_0x3a0304='undefined'===typeof _0x3a0304?'.':_0x3a0304;var _0x133839='',_0x133839=function(_0x39fc91,_0x140e67){var _0x2e831a=Math['pow'](0xa,_0x140e67);return''+(Math['round'](_0x39fc91*_0x2e831a)/_0x2e831a)[_0xd6cf('0x3')](_0x140e67);},_0x133839=(_0x2e831a?_0x133839(_0x64a8e7,_0x2e831a):''+Math[_0xd6cf('0x4')](_0x64a8e7))['split']('.');0x3<_0x133839[0x0][_0xd6cf('0x5')]&&(_0x133839[0x0]=_0x133839[0x0][_0xd6cf('0x6')](/\B(?=(?:\d{3})+(?!\d))/g,_0x3fe8b2));(_0x133839[0x1]||'')[_0xd6cf('0x5')]<_0x2e831a&&(_0x133839[0x1]=_0x133839[0x1]||'',_0x133839[0x1]+=Array(_0x2e831a-_0x133839[0x1][_0xd6cf('0x5')]+0x1)[_0xd6cf('0x7')]('0'));return _0x133839[_0xd6cf('0x7')](_0x3a0304);};(function(){try{window['_QuatroDigital_CartData']=window[_0xd6cf('0x8')]||{},window[_0xd6cf('0x8')]['callback']=window[_0xd6cf('0x8')][_0xd6cf('0x9')]||$['Callbacks']();}catch(_0x17775b){_0xd6cf('0x2')!==typeof console&&'function'===typeof console[_0xd6cf('0xa')]&&console[_0xd6cf('0xa')](_0xd6cf('0xb'),_0x17775b[_0xd6cf('0xc')]);}}());(function(_0x1aa3d3){try{var _0x240b03=jQuery,_0x1abf9c=function(_0x56a707,_0x4d89c1){if(_0xd6cf('0xd')===typeof console&&_0xd6cf('0x2')!==typeof console[_0xd6cf('0xa')]&&_0xd6cf('0x2')!==typeof console['info']&&_0xd6cf('0x2')!==typeof console[_0xd6cf('0xe')]){var _0x5e3527;_0xd6cf('0xd')===typeof _0x56a707?(_0x56a707[_0xd6cf('0xf')](_0xd6cf('0x10')),_0x5e3527=_0x56a707):_0x5e3527=[_0xd6cf('0x10')+_0x56a707];if(_0xd6cf('0x2')===typeof _0x4d89c1||_0xd6cf('0x11')!==_0x4d89c1[_0xd6cf('0x12')]()&&_0xd6cf('0x13')!==_0x4d89c1[_0xd6cf('0x12')]())if(_0xd6cf('0x2')!==typeof _0x4d89c1&&_0xd6cf('0x14')===_0x4d89c1[_0xd6cf('0x12')]())try{console[_0xd6cf('0x14')][_0xd6cf('0x15')](console,_0x5e3527);}catch(_0x56d230){try{console[_0xd6cf('0x14')](_0x5e3527[_0xd6cf('0x7')]('\x0a'));}catch(_0x322018){}}else try{console[_0xd6cf('0xa')][_0xd6cf('0x15')](console,_0x5e3527);}catch(_0x548685){try{console['error'](_0x5e3527['join']('\x0a'));}catch(_0x5a0e72){}}else try{console[_0xd6cf('0xe')][_0xd6cf('0x15')](console,_0x5e3527);}catch(_0x5f446b){try{console[_0xd6cf('0xe')](_0x5e3527['join']('\x0a'));}catch(_0x322ed3){}}}};window['_QuatroDigital_DropDown']=window[_0xd6cf('0x16')]||{};window['_QuatroDigital_DropDown'][_0xd6cf('0x17')]=!0x0;_0x240b03[_0xd6cf('0x18')]=function(){};_0x240b03['fn'][_0xd6cf('0x18')]=function(){return{'fn':new _0x240b03()};};var _0x1cc0d8=function(_0x4fb3ab){var _0x4b8463={'s':_0xd6cf('0x19')};return function(_0x18120c){var _0x439efb=function(_0x2752ef){return _0x2752ef;};var _0x3c8479=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x18120c=_0x18120c['d'+_0x3c8479[0x10]+'c'+_0x3c8479[0x11]+'m'+_0x439efb(_0x3c8479[0x1])+'n'+_0x3c8479[0xd]]['l'+_0x3c8479[0x12]+'c'+_0x3c8479[0x0]+'ti'+_0x439efb('o')+'n'];var _0x10dba3=function(_0x33ad9d){return escape(encodeURIComponent(_0x33ad9d[_0xd6cf('0x6')](/\./g,'¨')[_0xd6cf('0x6')](/[a-zA-Z]/g,function(_0x1b4a61){return String[_0xd6cf('0x1a')](('Z'>=_0x1b4a61?0x5a:0x7a)>=(_0x1b4a61=_0x1b4a61[_0xd6cf('0x1b')](0x0)+0xd)?_0x1b4a61:_0x1b4a61-0x1a);})));};var _0x373dfe=_0x10dba3(_0x18120c[[_0x3c8479[0x9],_0x439efb('o'),_0x3c8479[0xc],_0x3c8479[_0x439efb(0xd)]][_0xd6cf('0x7')]('')]);_0x10dba3=_0x10dba3((window[['js',_0x439efb('no'),'m',_0x3c8479[0x1],_0x3c8479[0x4]['toUpperCase'](),'ite']['join']('')]||_0xd6cf('0x1c'))+['.v',_0x3c8479[0xd],'e',_0x439efb('x'),'co',_0x439efb('mm'),'erc',_0x3c8479[0x1],'.c',_0x439efb('o'),'m.',_0x3c8479[0x13],'r'][_0xd6cf('0x7')](''));for(var _0x28edd9 in _0x4b8463){if(_0x10dba3===_0x28edd9+_0x4b8463[_0x28edd9]||_0x373dfe===_0x28edd9+_0x4b8463[_0x28edd9]){var _0x1e6a5b='tr'+_0x3c8479[0x11]+'e';break;}_0x1e6a5b='f'+_0x3c8479[0x0]+'ls'+_0x439efb(_0x3c8479[0x1])+'';}_0x439efb=!0x1;-0x1<_0x18120c[[_0x3c8479[0xc],'e',_0x3c8479[0x0],'rc',_0x3c8479[0x9]][_0xd6cf('0x7')]('')][_0xd6cf('0x1d')](_0xd6cf('0x1e'))&&(_0x439efb=!0x0);return[_0x1e6a5b,_0x439efb];}(_0x4fb3ab);}(window);if(!eval(_0x1cc0d8[0x0]))return _0x1cc0d8[0x1]?_0x1abf9c(_0xd6cf('0x1f')):!0x1;_0x240b03[_0xd6cf('0x18')]=function(_0x368562,_0x34ef3b){var _0x1fefa1=_0x240b03(_0x368562);if(!_0x1fefa1[_0xd6cf('0x5')])return _0x1fefa1;var _0x5682d5=_0x240b03['extend'](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0xd6cf('0x20'),'linkCheckout':_0xd6cf('0x21'),'cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':_0xd6cf('0x22'),'continueShopping':'Continuar\x20Comprando','shippingForm':'<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x4c9aed){return _0x4c9aed[_0xd6cf('0x23')]||_0x4c9aed[_0xd6cf('0x24')];},'callback':function(){},'callbackProductsList':function(){}},_0x34ef3b);_0x240b03('');var _0x1e0ce0=this;if(_0x5682d5[_0xd6cf('0x25')]){var _0x4923bc=!0x1;'undefined'===typeof window[_0xd6cf('0x26')]&&(_0x1abf9c(_0xd6cf('0x27')),_0x240b03[_0xd6cf('0x28')]({'url':_0xd6cf('0x29'),'async':!0x1,'dataType':_0xd6cf('0x2a'),'error':function(){_0x1abf9c('Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.');_0x4923bc=!0x0;}}));if(_0x4923bc)return _0x1abf9c(_0xd6cf('0x2b'));}if(_0xd6cf('0xd')===typeof window[_0xd6cf('0x26')]&&_0xd6cf('0x2')!==typeof window[_0xd6cf('0x26')][_0xd6cf('0x2c')])var _0x1aa3d3=window[_0xd6cf('0x26')][_0xd6cf('0x2c')];else if(_0xd6cf('0xd')===typeof vtex&&_0xd6cf('0xd')===typeof vtex[_0xd6cf('0x2c')]&&_0xd6cf('0x2')!==typeof vtex[_0xd6cf('0x2c')][_0xd6cf('0x2d')])_0x1aa3d3=new vtex[(_0xd6cf('0x2c'))]['SDK']();else return _0x1abf9c(_0xd6cf('0x2e'));_0x1e0ce0[_0xd6cf('0x2f')]=_0xd6cf('0x30');var _0x4fd550=function(_0x17f86a){_0x240b03(this)[_0xd6cf('0x31')](_0x17f86a);_0x17f86a[_0xd6cf('0x32')](_0xd6cf('0x33'))[_0xd6cf('0x34')](_0x240b03(_0xd6cf('0x35')))['on']('click.qd_ddc_closeFn',function(){_0x1fefa1[_0xd6cf('0x36')](_0xd6cf('0x37'));_0x240b03(document['body'])[_0xd6cf('0x36')](_0xd6cf('0x38'));});_0x240b03(document)[_0xd6cf('0x39')]('keyup.qd_ddc_closeFn')['on'](_0xd6cf('0x3a'),function(_0x3cd484){0x1b==_0x3cd484['keyCode']&&(_0x1fefa1[_0xd6cf('0x36')]('qd-bb-lightBoxProdAdd'),_0x240b03(document[_0xd6cf('0x3b')])[_0xd6cf('0x36')]('qd-bb-lightBoxBodyProdAdd'));});var _0x3ad58f=_0x17f86a[_0xd6cf('0x32')]('.qd-ddc-prodWrapper');_0x17f86a[_0xd6cf('0x32')](_0xd6cf('0x3c'))['on'](_0xd6cf('0x3d'),function(){_0x1e0ce0['scrollCart']('-',void 0x0,void 0x0,_0x3ad58f);return!0x1;});_0x17f86a[_0xd6cf('0x32')](_0xd6cf('0x3e'))['on'](_0xd6cf('0x3f'),function(){_0x1e0ce0[_0xd6cf('0x40')](void 0x0,void 0x0,void 0x0,_0x3ad58f);return!0x1;});_0x17f86a['find'](_0xd6cf('0x41'))[_0xd6cf('0x42')]('')['on']('keyup.qd_ddc_cep',function(){_0x1e0ce0[_0xd6cf('0x43')](_0x240b03(this));});if(_0x5682d5[_0xd6cf('0x44')]){var _0x34ef3b=0x0;_0x240b03(this)['on'](_0xd6cf('0x45'),function(){var _0x17f86a=function(){window[_0xd6cf('0x16')][_0xd6cf('0x17')]&&(_0x1e0ce0[_0xd6cf('0x46')](),window[_0xd6cf('0x16')][_0xd6cf('0x17')]=!0x1,_0x240b03['fn'][_0xd6cf('0x47')](!0x0),_0x1e0ce0[_0xd6cf('0x48')]());};_0x34ef3b=setInterval(function(){_0x17f86a();},0x258);_0x17f86a();});_0x240b03(this)['on'](_0xd6cf('0x49'),function(){clearInterval(_0x34ef3b);});}};var _0x54ebff=function(_0x1c60c7){_0x1c60c7=_0x240b03(_0x1c60c7);_0x5682d5['texts'][_0xd6cf('0x4a')]=_0x5682d5['texts'][_0xd6cf('0x4a')][_0xd6cf('0x6')](_0xd6cf('0x4b'),_0xd6cf('0x4c'));_0x5682d5[_0xd6cf('0x4d')][_0xd6cf('0x4a')]=_0x5682d5[_0xd6cf('0x4d')]['cartTotal']['replace'](_0xd6cf('0x4e'),_0xd6cf('0x4f'));_0x5682d5['texts'][_0xd6cf('0x4a')]=_0x5682d5[_0xd6cf('0x4d')][_0xd6cf('0x4a')][_0xd6cf('0x6')](_0xd6cf('0x50'),'<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>');_0x5682d5[_0xd6cf('0x4d')][_0xd6cf('0x4a')]=_0x5682d5[_0xd6cf('0x4d')][_0xd6cf('0x4a')]['replace'](_0xd6cf('0x51'),_0xd6cf('0x52'));_0x1c60c7[_0xd6cf('0x32')](_0xd6cf('0x53'))['html'](_0x5682d5[_0xd6cf('0x4d')][_0xd6cf('0x54')]);_0x1c60c7['find'](_0xd6cf('0x55'))[_0xd6cf('0x56')](_0x5682d5[_0xd6cf('0x4d')][_0xd6cf('0x57')]);_0x1c60c7[_0xd6cf('0x32')](_0xd6cf('0x58'))[_0xd6cf('0x56')](_0x5682d5[_0xd6cf('0x4d')][_0xd6cf('0x59')]);_0x1c60c7[_0xd6cf('0x32')]('.qd-ddc-infoTotal')[_0xd6cf('0x56')](_0x5682d5[_0xd6cf('0x4d')][_0xd6cf('0x4a')]);_0x1c60c7[_0xd6cf('0x32')]('.qd-ddc-shipping')[_0xd6cf('0x56')](_0x5682d5[_0xd6cf('0x4d')][_0xd6cf('0x5a')]);_0x1c60c7[_0xd6cf('0x32')]('.qd-ddc-emptyCart\x20p')[_0xd6cf('0x56')](_0x5682d5[_0xd6cf('0x4d')][_0xd6cf('0x5b')]);return _0x1c60c7;}(this[_0xd6cf('0x2f')]);var _0x1ff482=0x0;_0x1fefa1['each'](function(){0x0<_0x1ff482?_0x4fd550[_0xd6cf('0x5c')](this,_0x54ebff['clone']()):_0x4fd550[_0xd6cf('0x5c')](this,_0x54ebff);_0x1ff482++;});window[_0xd6cf('0x8')][_0xd6cf('0x9')]['add'](function(){_0x240b03(_0xd6cf('0x5d'))[_0xd6cf('0x56')](window[_0xd6cf('0x8')][_0xd6cf('0x5e')]||'--');_0x240b03(_0xd6cf('0x5f'))[_0xd6cf('0x56')](window[_0xd6cf('0x8')]['qtt']||'0');_0x240b03(_0xd6cf('0x60'))['html'](window['_QuatroDigital_CartData'][_0xd6cf('0x61')]||'--');_0x240b03(_0xd6cf('0x62'))[_0xd6cf('0x56')](window['_QuatroDigital_CartData']['allTotal']||'--');});var _0x1f3deb=function(_0x1d0545,_0x3f9b46){if('undefined'===typeof _0x1d0545['items'])return _0x1abf9c(_0xd6cf('0x63'));_0x1e0ce0['renderProductsList']['call'](this,_0x3f9b46);};_0x1e0ce0['getCartInfoByUrl']=function(_0x585713,_0x2ea3e9){_0xd6cf('0x2')!=typeof _0x2ea3e9?window[_0xd6cf('0x16')]['dataOptionsCache']=_0x2ea3e9:window[_0xd6cf('0x16')][_0xd6cf('0x64')]&&(_0x2ea3e9=window[_0xd6cf('0x16')]['dataOptionsCache']);setTimeout(function(){window[_0xd6cf('0x16')][_0xd6cf('0x64')]=void 0x0;},_0x5682d5[_0xd6cf('0x65')]);_0x240b03('.qd-ddc-wrapper')[_0xd6cf('0x36')]('qd-ddc-prodLoaded');if(_0x5682d5[_0xd6cf('0x25')]){var _0x34ef3b=function(_0x19ad4a){window[_0xd6cf('0x16')][_0xd6cf('0x66')]=_0x19ad4a;_0x1f3deb(_0x19ad4a,_0x2ea3e9);'undefined'!==typeof window[_0xd6cf('0x67')]&&_0xd6cf('0x68')===typeof window[_0xd6cf('0x67')]['exec']&&window[_0xd6cf('0x67')][_0xd6cf('0x69')][_0xd6cf('0x5c')](this);_0x240b03(_0xd6cf('0x6a'))[_0xd6cf('0x6b')](_0xd6cf('0x6c'));};_0xd6cf('0x2')!==typeof window[_0xd6cf('0x16')][_0xd6cf('0x66')]?(_0x34ef3b(window[_0xd6cf('0x16')][_0xd6cf('0x66')]),_0xd6cf('0x68')===typeof _0x585713&&_0x585713(window[_0xd6cf('0x16')][_0xd6cf('0x66')])):_0x240b03[_0xd6cf('0x6d')]([_0xd6cf('0x6e'),_0xd6cf('0x6f'),_0xd6cf('0x70')],{'done':function(_0x469403){_0x34ef3b[_0xd6cf('0x5c')](this,_0x469403);_0xd6cf('0x68')===typeof _0x585713&&_0x585713(_0x469403);},'fail':function(_0x5766c0){_0x1abf9c(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0x5766c0]);}});}else alert(_0xd6cf('0x71'));};_0x1e0ce0[_0xd6cf('0x48')]=function(){var _0x3e6c20=_0x240b03(_0xd6cf('0x6a'));_0x3e6c20[_0xd6cf('0x32')](_0xd6cf('0x72'))['length']?_0x3e6c20[_0xd6cf('0x36')](_0xd6cf('0x73')):_0x3e6c20[_0xd6cf('0x6b')](_0xd6cf('0x73'));};_0x1e0ce0['renderProductsList']=function(_0x5d96cd){var _0x34ef3b=_0x240b03(_0xd6cf('0x74'));_0x34ef3b[_0xd6cf('0x75')]();_0x34ef3b[_0xd6cf('0x76')](function(){var _0x34ef3b=_0x240b03(this),_0x40a74c,_0x368562,_0x5345da=_0x240b03(''),_0x380e68;for(_0x380e68 in window[_0xd6cf('0x16')][_0xd6cf('0x66')][_0xd6cf('0x6e')])if(_0xd6cf('0xd')===typeof window[_0xd6cf('0x16')][_0xd6cf('0x66')][_0xd6cf('0x6e')][_0x380e68]){var _0x1f2634=window[_0xd6cf('0x16')][_0xd6cf('0x66')][_0xd6cf('0x6e')][_0x380e68];var _0x11cbe8=_0x1f2634[_0xd6cf('0x77')]['replace'](/^\/|\/$/g,'')[_0xd6cf('0x78')]('/');var _0x6c4f71=_0x240b03(_0xd6cf('0x79'));_0x6c4f71[_0xd6cf('0x7a')]({'data-sku':_0x1f2634['id'],'data-sku-index':_0x380e68,'data-qd-departament':_0x11cbe8[0x0],'data-qd-category':_0x11cbe8[_0x11cbe8['length']-0x1]});_0x6c4f71[_0xd6cf('0x6b')]('qd-ddc-'+_0x1f2634[_0xd6cf('0x7b')]);_0x6c4f71[_0xd6cf('0x32')](_0xd6cf('0x7c'))[_0xd6cf('0x31')](_0x5682d5['skuName'](_0x1f2634));_0x6c4f71[_0xd6cf('0x32')](_0xd6cf('0x7d'))[_0xd6cf('0x31')](isNaN(_0x1f2634[_0xd6cf('0x7e')])?_0x1f2634[_0xd6cf('0x7e')]:0x0==_0x1f2634[_0xd6cf('0x7e')]?_0xd6cf('0x7f'):(_0x240b03(_0xd6cf('0x80'))['attr'](_0xd6cf('0x81'))||'R$')+'\x20'+qd_number_format(_0x1f2634['sellingPrice']/0x64,0x2,',','.'));_0x6c4f71[_0xd6cf('0x32')](_0xd6cf('0x82'))['attr']({'data-sku':_0x1f2634['id'],'data-sku-index':_0x380e68})[_0xd6cf('0x42')](_0x1f2634[_0xd6cf('0x83')]);_0x6c4f71[_0xd6cf('0x32')](_0xd6cf('0x84'))[_0xd6cf('0x7a')]({'data-sku':_0x1f2634['id'],'data-sku-index':_0x380e68});_0x1e0ce0[_0xd6cf('0x85')](_0x1f2634['id'],_0x6c4f71[_0xd6cf('0x32')](_0xd6cf('0x86')),_0x1f2634[_0xd6cf('0x87')]);_0x6c4f71[_0xd6cf('0x32')](_0xd6cf('0x88'))[_0xd6cf('0x7a')]({'data-sku':_0x1f2634['id'],'data-sku-index':_0x380e68});_0x6c4f71[_0xd6cf('0x89')](_0x34ef3b);_0x5345da=_0x5345da[_0xd6cf('0x34')](_0x6c4f71);}try{var _0x1aa3d3=_0x34ef3b['getParent'](_0xd6cf('0x6a'))[_0xd6cf('0x32')](_0xd6cf('0x41'));_0x1aa3d3['length']&&''==_0x1aa3d3[_0xd6cf('0x42')]()&&window[_0xd6cf('0x16')]['getOrderForm'][_0xd6cf('0x70')]['address']&&_0x1aa3d3[_0xd6cf('0x42')](window[_0xd6cf('0x16')][_0xd6cf('0x66')][_0xd6cf('0x70')][_0xd6cf('0x8a')][_0xd6cf('0x8b')]);}catch(_0x21e090){_0x1abf9c(_0xd6cf('0x8c')+_0x21e090[_0xd6cf('0xc')],_0xd6cf('0x13'));}_0x1e0ce0['actionButtons'](_0x34ef3b);_0x1e0ce0[_0xd6cf('0x48')]();_0x5d96cd&&_0x5d96cd[_0xd6cf('0x8d')]&&function(){_0x368562=_0x5345da[_0xd6cf('0x8e')](_0xd6cf('0x8f')+_0x5d96cd[_0xd6cf('0x8d')]+'\x27]');_0x368562[_0xd6cf('0x5')]&&(_0x40a74c=0x0,_0x5345da[_0xd6cf('0x76')](function(){var _0x5d96cd=_0x240b03(this);if(_0x5d96cd['is'](_0x368562))return!0x1;_0x40a74c+=_0x5d96cd[_0xd6cf('0x90')]();}),_0x1e0ce0[_0xd6cf('0x40')](void 0x0,void 0x0,_0x40a74c,_0x34ef3b[_0xd6cf('0x34')](_0x34ef3b[_0xd6cf('0x91')]())),_0x5345da[_0xd6cf('0x36')](_0xd6cf('0x92')),function(_0x547f38){_0x547f38[_0xd6cf('0x6b')](_0xd6cf('0x93'));_0x547f38[_0xd6cf('0x6b')](_0xd6cf('0x92'));setTimeout(function(){_0x547f38[_0xd6cf('0x36')](_0xd6cf('0x93'));},_0x5682d5[_0xd6cf('0x65')]);}(_0x368562),_0x240b03(document[_0xd6cf('0x3b')])[_0xd6cf('0x6b')](_0xd6cf('0x94')),setTimeout(function(){_0x240b03(document[_0xd6cf('0x3b')])[_0xd6cf('0x36')](_0xd6cf('0x94'));},_0x5682d5[_0xd6cf('0x65')]));}();});(function(){_QuatroDigital_DropDown[_0xd6cf('0x66')]['items']['length']?(_0x240b03('body')[_0xd6cf('0x36')](_0xd6cf('0x95'))[_0xd6cf('0x6b')](_0xd6cf('0x96')),setTimeout(function(){_0x240b03('body')[_0xd6cf('0x36')](_0xd6cf('0x97'));},_0x5682d5[_0xd6cf('0x65')])):_0x240b03(_0xd6cf('0x3b'))[_0xd6cf('0x36')](_0xd6cf('0x98'))[_0xd6cf('0x6b')](_0xd6cf('0x95'));}());_0xd6cf('0x68')===typeof _0x5682d5[_0xd6cf('0x99')]?_0x5682d5[_0xd6cf('0x99')]['call'](this):_0x1abf9c('callbackProductsList\x20não\x20é\x20uma\x20função');};_0x1e0ce0[_0xd6cf('0x85')]=function(_0x3db571,_0x3e44b2,_0x526c30){function _0x41f67a(){_0x3e44b2[_0xd6cf('0x36')](_0xd6cf('0x9a'))[_0xd6cf('0x9b')](function(){_0x240b03(this)['addClass']('qd-loaded');})['attr'](_0xd6cf('0x9c'),_0x526c30);}_0x526c30?_0x41f67a():isNaN(_0x3db571)?_0x1abf9c(_0xd6cf('0x9d'),_0xd6cf('0x11')):alert(_0xd6cf('0x9e'));};_0x1e0ce0[_0xd6cf('0x9f')]=function(_0x54cbbe){var _0x34ef3b=function(_0xa7182d,_0x60aee2){var _0x353420=_0x240b03(_0xa7182d);var _0xb63d61=_0x353420[_0xd6cf('0x7a')](_0xd6cf('0xa0'));var _0x368562=_0x353420[_0xd6cf('0x7a')](_0xd6cf('0xa1'));if(_0xb63d61){var _0x129957=parseInt(_0x353420[_0xd6cf('0x42')]())||0x1;_0x1e0ce0[_0xd6cf('0xa2')]([_0xb63d61,_0x368562],_0x129957,_0x129957+0x1,function(_0x1e6a6d){_0x353420['val'](_0x1e6a6d);_0xd6cf('0x68')===typeof _0x60aee2&&_0x60aee2();});}};var _0x3c35da=function(_0x2a7ebd,_0x2196a5){var _0xb8d85f=_0x240b03(_0x2a7ebd);var _0x368562=_0xb8d85f[_0xd6cf('0x7a')](_0xd6cf('0xa0'));var _0x4f2c13=_0xb8d85f['attr'](_0xd6cf('0xa1'));if(_0x368562){var _0x28b2fa=parseInt(_0xb8d85f[_0xd6cf('0x42')]())||0x2;_0x1e0ce0[_0xd6cf('0xa2')]([_0x368562,_0x4f2c13],_0x28b2fa,_0x28b2fa-0x1,function(_0x4bcaa1){_0xb8d85f['val'](_0x4bcaa1);_0xd6cf('0x68')===typeof _0x2196a5&&_0x2196a5();});}};var _0x5e226b=function(_0x523bb6,_0x47cedf){var _0x34ef3b=_0x240b03(_0x523bb6);var _0x368562=_0x34ef3b[_0xd6cf('0x7a')]('data-sku');var _0x40e7c5=_0x34ef3b[_0xd6cf('0x7a')](_0xd6cf('0xa1'));if(_0x368562){var _0x690894=parseInt(_0x34ef3b['val']())||0x1;_0x1e0ce0['changeQantity']([_0x368562,_0x40e7c5],0x1,_0x690894,function(_0x46257b){_0x34ef3b[_0xd6cf('0x42')](_0x46257b);_0xd6cf('0x68')===typeof _0x47cedf&&_0x47cedf();});}};var _0x368562=_0x54cbbe['find'](_0xd6cf('0xa3'));_0x368562[_0xd6cf('0x6b')](_0xd6cf('0xa4'))[_0xd6cf('0x76')](function(){var _0x54cbbe=_0x240b03(this);_0x54cbbe[_0xd6cf('0x32')](_0xd6cf('0xa5'))['on'](_0xd6cf('0xa6'),function(_0xe2fcaf){_0xe2fcaf['preventDefault']();_0x368562[_0xd6cf('0x6b')](_0xd6cf('0xa7'));_0x34ef3b(_0x54cbbe[_0xd6cf('0x32')](_0xd6cf('0x82')),function(){_0x368562[_0xd6cf('0x36')](_0xd6cf('0xa7'));});});_0x54cbbe[_0xd6cf('0x32')](_0xd6cf('0xa8'))['on']('click.qd_ddc_minus',function(_0x286afa){_0x286afa['preventDefault']();_0x368562[_0xd6cf('0x6b')]('qd-loading');_0x3c35da(_0x54cbbe['find'](_0xd6cf('0x82')),function(){_0x368562[_0xd6cf('0x36')]('qd-loading');});});_0x54cbbe[_0xd6cf('0x32')](_0xd6cf('0x82'))['on'](_0xd6cf('0xa9'),function(){_0x368562['addClass'](_0xd6cf('0xa7'));_0x5e226b(this,function(){_0x368562[_0xd6cf('0x36')](_0xd6cf('0xa7'));});});_0x54cbbe['find']('.qd-ddc-quantity')['on'](_0xd6cf('0xaa'),function(_0x289178){0xd==_0x289178['keyCode']&&(_0x368562[_0xd6cf('0x6b')](_0xd6cf('0xa7')),_0x5e226b(this,function(){_0x368562[_0xd6cf('0x36')](_0xd6cf('0xa7'));}));});});_0x54cbbe['find'](_0xd6cf('0x72'))['each'](function(){var _0x54cbbe=_0x240b03(this);_0x54cbbe[_0xd6cf('0x32')](_0xd6cf('0x84'))['on'](_0xd6cf('0xab'),function(){_0x54cbbe[_0xd6cf('0x6b')]('qd-loading');_0x1e0ce0[_0xd6cf('0xac')](_0x240b03(this),function(_0x99e8f7){_0x99e8f7?_0x54cbbe['stop'](!0x0)[_0xd6cf('0xad')](function(){_0x54cbbe[_0xd6cf('0xae')]();_0x1e0ce0[_0xd6cf('0x48')]();}):_0x54cbbe['removeClass'](_0xd6cf('0xa7'));});return!0x1;});});};_0x1e0ce0[_0xd6cf('0x43')]=function(_0xc5a8ec){var _0x216222=_0xc5a8ec[_0xd6cf('0x42')]();_0x216222=_0x216222[_0xd6cf('0x6')](/[^0-9\-]/g,'');_0x216222=_0x216222[_0xd6cf('0x6')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0xd6cf('0xaf'));_0x216222=_0x216222[_0xd6cf('0x6')](/(.{9}).*/g,'$1');_0xc5a8ec['val'](_0x216222);0x9<=_0x216222[_0xd6cf('0x5')]&&(_0xc5a8ec[_0xd6cf('0xb0')](_0xd6cf('0xb1'))!=_0x216222&&_0x1aa3d3[_0xd6cf('0xb2')]({'postalCode':_0x216222,'country':'BRA'})[_0xd6cf('0xb3')](function(_0x4924ad){window[_0xd6cf('0x16')][_0xd6cf('0x66')]=_0x4924ad;_0x1e0ce0[_0xd6cf('0x46')]();})[_0xd6cf('0xb4')](function(_0x162065){_0x1abf9c([_0xd6cf('0xb5'),_0x162065]);updateCartData();}),_0xc5a8ec['data']('qdDdcLastPostalCode',_0x216222));};_0x1e0ce0[_0xd6cf('0xa2')]=function(_0x4fce55,_0x1d40c4,_0x5acb38,_0x28a99e){function _0x3091cf(_0x4efc31){_0x4efc31=_0xd6cf('0xb6')!==typeof _0x4efc31?!0x1:_0x4efc31;_0x1e0ce0[_0xd6cf('0x46')]();window[_0xd6cf('0x16')][_0xd6cf('0x17')]=!0x1;_0x1e0ce0[_0xd6cf('0x48')]();'undefined'!==typeof window[_0xd6cf('0x67')]&&_0xd6cf('0x68')===typeof window[_0xd6cf('0x67')]['exec']&&window[_0xd6cf('0x67')][_0xd6cf('0x69')][_0xd6cf('0x5c')](this);_0xd6cf('0x68')===typeof adminCart&&adminCart();_0x240b03['fn'][_0xd6cf('0x47')](!0x0,void 0x0,_0x4efc31);'function'===typeof _0x28a99e&&_0x28a99e(_0x1d40c4);}_0x5acb38=_0x5acb38||0x1;if(0x1>_0x5acb38)return _0x1d40c4;if(_0x5682d5[_0xd6cf('0x25')]){if(_0xd6cf('0x2')===typeof window[_0xd6cf('0x16')]['getOrderForm'][_0xd6cf('0x6e')][_0x4fce55[0x1]])return _0x1abf9c(_0xd6cf('0xb7')+_0x4fce55[0x1]+']'),_0x1d40c4;window[_0xd6cf('0x16')][_0xd6cf('0x66')][_0xd6cf('0x6e')][_0x4fce55[0x1]]['quantity']=_0x5acb38;window[_0xd6cf('0x16')][_0xd6cf('0x66')][_0xd6cf('0x6e')][_0x4fce55[0x1]][_0xd6cf('0xb8')]=_0x4fce55[0x1];_0x1aa3d3['updateItems']([window[_0xd6cf('0x16')]['getOrderForm'][_0xd6cf('0x6e')][_0x4fce55[0x1]]],[_0xd6cf('0x6e'),'totalizers','shippingData'])[_0xd6cf('0xb3')](function(_0x10a2d3){window[_0xd6cf('0x16')]['getOrderForm']=_0x10a2d3;_0x3091cf(!0x0);})[_0xd6cf('0xb4')](function(_0x31b88b){_0x1abf9c(['Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho',_0x31b88b]);_0x3091cf();});}else _0x1abf9c(_0xd6cf('0xb9'));};_0x1e0ce0[_0xd6cf('0xac')]=function(_0x3c4379,_0x55ed30){function _0x7f8a1e(_0x823e43){_0x823e43=_0xd6cf('0xb6')!==typeof _0x823e43?!0x1:_0x823e43;_0xd6cf('0x2')!==typeof window[_0xd6cf('0x67')]&&_0xd6cf('0x68')===typeof window['_QuatroDigital_AmountProduct'][_0xd6cf('0x69')]&&window[_0xd6cf('0x67')][_0xd6cf('0x69')][_0xd6cf('0x5c')](this);_0xd6cf('0x68')===typeof adminCart&&adminCart();_0x240b03['fn'][_0xd6cf('0x47')](!0x0,void 0x0,_0x823e43);'function'===typeof _0x55ed30&&_0x55ed30(_0x368562);}var _0x368562=!0x1,_0x2e3f87=_0x240b03(_0x3c4379)[_0xd6cf('0x7a')](_0xd6cf('0xa1'));if(_0x5682d5[_0xd6cf('0x25')]){if(_0xd6cf('0x2')===typeof window['_QuatroDigital_DropDown'][_0xd6cf('0x66')][_0xd6cf('0x6e')][_0x2e3f87])return _0x1abf9c(_0xd6cf('0xb7')+_0x2e3f87+']'),_0x368562;window[_0xd6cf('0x16')]['getOrderForm']['items'][_0x2e3f87][_0xd6cf('0xb8')]=_0x2e3f87;_0x1aa3d3[_0xd6cf('0xba')]([window[_0xd6cf('0x16')][_0xd6cf('0x66')]['items'][_0x2e3f87]],[_0xd6cf('0x6e'),_0xd6cf('0x6f'),_0xd6cf('0x70')])['done'](function(_0x37b782){_0x368562=!0x0;window[_0xd6cf('0x16')][_0xd6cf('0x66')]=_0x37b782;_0x1f3deb(_0x37b782);_0x7f8a1e(!0x0);})['fail'](function(_0x292570){_0x1abf9c([_0xd6cf('0xbb'),_0x292570]);_0x7f8a1e();});}else alert(_0xd6cf('0xbc'));};_0x1e0ce0['scrollCart']=function(_0x50ab8a,_0x3ff0da,_0x7d266f,_0x95fb9f){_0x95fb9f=_0x95fb9f||_0x240b03(_0xd6cf('0xbd'));_0x50ab8a=_0x50ab8a||'+';_0x3ff0da=_0x3ff0da||0.9*_0x95fb9f[_0xd6cf('0xbe')]();_0x95fb9f['stop'](!0x0,!0x0)[_0xd6cf('0xbf')]({'scrollTop':isNaN(_0x7d266f)?_0x50ab8a+'='+_0x3ff0da+'px':_0x7d266f});};_0x5682d5['updateOnlyHover']||(_0x1e0ce0[_0xd6cf('0x46')](),_0x240b03['fn'][_0xd6cf('0x47')](!0x0));_0x240b03(window)['on'](_0xd6cf('0xc0'),function(){try{window[_0xd6cf('0x16')][_0xd6cf('0x66')]=void 0x0,_0x1e0ce0[_0xd6cf('0x46')]();}catch(_0x21f17a){_0x1abf9c(_0xd6cf('0xc1')+_0x21f17a[_0xd6cf('0xc')],'avisso');}});_0xd6cf('0x68')===typeof _0x5682d5[_0xd6cf('0x9')]?_0x5682d5[_0xd6cf('0x9')][_0xd6cf('0x5c')](this):_0x1abf9c(_0xd6cf('0xc2'));};_0x240b03['fn']['QD_dropDownCart']=function(_0x2980ed){var _0x1a5e21=_0x240b03(this);_0x1a5e21['fn']=new _0x240b03[(_0xd6cf('0x18'))](this,_0x2980ed);return _0x1a5e21;};}catch(_0x226791){'undefined'!==typeof console&&_0xd6cf('0x68')===typeof console['error']&&console[_0xd6cf('0xa')](_0xd6cf('0xb'),_0x226791);}}(this));(function(_0x41c732){try{var _0x160821=jQuery;window['_QuatroDigital_AmountProduct']=window[_0xd6cf('0x67')]||{};window['_QuatroDigital_AmountProduct'][_0xd6cf('0x6e')]={};window[_0xd6cf('0x67')][_0xd6cf('0xc3')]=!0x1;window[_0xd6cf('0x67')][_0xd6cf('0xc4')]=!0x1;window[_0xd6cf('0x67')][_0xd6cf('0xc5')]=!0x1;var _0xbb70ea=function(){if(window['_QuatroDigital_AmountProduct'][_0xd6cf('0xc3')]){var _0x34300b=!0x1;var _0x3cc9b3={};window[_0xd6cf('0x67')]['items']={};for(_0x574fcd in window[_0xd6cf('0x16')][_0xd6cf('0x66')][_0xd6cf('0x6e')])if(_0xd6cf('0xd')===typeof window[_0xd6cf('0x16')]['getOrderForm'][_0xd6cf('0x6e')][_0x574fcd]){var _0x4069eb=window[_0xd6cf('0x16')][_0xd6cf('0x66')][_0xd6cf('0x6e')][_0x574fcd];'undefined'!==typeof _0x4069eb['productId']&&null!==_0x4069eb[_0xd6cf('0xc6')]&&''!==_0x4069eb[_0xd6cf('0xc6')]&&(window[_0xd6cf('0x67')][_0xd6cf('0x6e')][_0xd6cf('0xc7')+_0x4069eb[_0xd6cf('0xc6')]]=window[_0xd6cf('0x67')][_0xd6cf('0x6e')][_0xd6cf('0xc7')+_0x4069eb[_0xd6cf('0xc6')]]||{},window[_0xd6cf('0x67')][_0xd6cf('0x6e')]['prod_'+_0x4069eb[_0xd6cf('0xc6')]]['prodId']=_0x4069eb[_0xd6cf('0xc6')],_0x3cc9b3[_0xd6cf('0xc7')+_0x4069eb['productId']]||(window['_QuatroDigital_AmountProduct']['items'][_0xd6cf('0xc7')+_0x4069eb[_0xd6cf('0xc6')]][_0xd6cf('0xc8')]=0x0),window['_QuatroDigital_AmountProduct'][_0xd6cf('0x6e')]['prod_'+_0x4069eb[_0xd6cf('0xc6')]][_0xd6cf('0xc8')]+=_0x4069eb[_0xd6cf('0x83')],_0x34300b=!0x0,_0x3cc9b3[_0xd6cf('0xc7')+_0x4069eb['productId']]=!0x0);}var _0x574fcd=_0x34300b;}else _0x574fcd=void 0x0;window[_0xd6cf('0x67')][_0xd6cf('0xc3')]&&(_0x160821(_0xd6cf('0xc9'))[_0xd6cf('0xae')](),_0x160821('.qd-bap-item-added')[_0xd6cf('0x36')](_0xd6cf('0xca')));for(var _0x265531 in window[_0xd6cf('0x67')]['items']){_0x4069eb=window[_0xd6cf('0x67')][_0xd6cf('0x6e')][_0x265531];if(_0xd6cf('0xd')!==typeof _0x4069eb)return;_0x3cc9b3=_0x160821(_0xd6cf('0xcb')+_0x4069eb[_0xd6cf('0xcc')]+']')['getParent']('li');if(window[_0xd6cf('0x67')][_0xd6cf('0xc3')]||!_0x3cc9b3[_0xd6cf('0x32')]('.qd-bap-wrapper')[_0xd6cf('0x5')])_0x34300b=_0x160821('<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>'),_0x34300b[_0xd6cf('0x32')](_0xd6cf('0xcd'))['html'](_0x4069eb[_0xd6cf('0xc8')]),_0x4069eb=_0x3cc9b3[_0xd6cf('0x32')](_0xd6cf('0xce')),_0x4069eb[_0xd6cf('0x5')]?_0x4069eb[_0xd6cf('0xcf')](_0x34300b)[_0xd6cf('0x6b')](_0xd6cf('0xca')):_0x3cc9b3['prepend'](_0x34300b);}_0x574fcd&&(window['_QuatroDigital_AmountProduct'][_0xd6cf('0xc3')]=!0x1);};window[_0xd6cf('0x67')][_0xd6cf('0x69')]=function(){window[_0xd6cf('0x67')]['allowRecalculate']=!0x0;_0xbb70ea[_0xd6cf('0x5c')](this);};_0x160821(document)['ajaxStop'](function(){_0xbb70ea['call'](this);});}catch(_0x3e3943){_0xd6cf('0x2')!==typeof console&&'function'===typeof console[_0xd6cf('0xa')]&&console[_0xd6cf('0xa')](_0xd6cf('0xb'),_0x3e3943);}}(this));(function(){try{var _0x4fd6ca=jQuery,_0xfe9689,_0x46f92e={'selector':_0xd6cf('0xd0'),'dropDown':{},'buyButton':{}};_0x4fd6ca[_0xd6cf('0xd1')]=function(_0x3184e2){var _0x43c94b={};_0xfe9689=_0x4fd6ca['extend'](!0x0,{},_0x46f92e,_0x3184e2);_0x3184e2=_0x4fd6ca(_0xfe9689[_0xd6cf('0xd2')])['QD_dropDownCart'](_0xfe9689[_0xd6cf('0xd3')]);_0x43c94b[_0xd6cf('0xd4')]='undefined'!==typeof _0xfe9689[_0xd6cf('0xd3')][_0xd6cf('0x44')]&&!0x1===_0xfe9689['dropDown']['updateOnlyHover']?_0x4fd6ca(_0xfe9689['selector'])[_0xd6cf('0xd5')](_0x3184e2['fn'],_0xfe9689['buyButton']):_0x4fd6ca(_0xfe9689['selector'])['QD_buyButton'](_0xfe9689[_0xd6cf('0xd4')]);_0x43c94b[_0xd6cf('0xd3')]=_0x3184e2;return _0x43c94b;};_0x4fd6ca['fn'][_0xd6cf('0xd6')]=function(){_0xd6cf('0xd')===typeof console&&_0xd6cf('0x68')===typeof console[_0xd6cf('0x14')]&&console[_0xd6cf('0x14')]('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x4fd6ca[_0xd6cf('0xd6')]=_0x4fd6ca['fn']['smartCart'];}catch(_0x1d0a9a){_0xd6cf('0x2')!==typeof console&&_0xd6cf('0x68')===typeof console[_0xd6cf('0xa')]&&console[_0xd6cf('0xa')](_0xd6cf('0xb'),_0x1d0a9a);}}());

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0x64b2=['height','stop','fadeTo','addClass','qdpv-video-on','add','find','iframe','a:not(\x27.qd-videoLink\x27)','bind','click.removeVideo','hide','removeClass','animate','.qd-videoItem','string','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27','\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','click.playVideo','controlVideo','.qd-playerWrapper\x20iframe','call','contentWindow','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','attr','rel','a:not(.qd-videoLink)','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','start','insertThumbsIn','prependTo','QuatroDigital.pv_video_added','ajaxStop','ImageControl','.qd-videoLink','body','.produto','object','undefined','alerta','toLowerCase','warn','[Video\x20in\x20product]\x20','qdVideoInProduct','extend','td.value-field.Videos:first','http','ul.thumbs','div#image','videoFieldSelector','text','split','length','indexOf','pop','youtu.be','be/','shift','#include','wrap','<div\x20class=\x22qd-playerContainer\x22></div>','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','join','toUpperCase','ite','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','youtube','html','<iframe\x20src=\x22','://www.youtube.com/embed/','data'];(function(_0x1b110c,_0xeccfcf){var _0x2e566b=function(_0x4fa37c){while(--_0x4fa37c){_0x1b110c['push'](_0x1b110c['shift']());}};_0x2e566b(++_0xeccfcf);}(_0x64b2,0x1ed));var _0x264b=function(_0x49a462,_0x5f28b8){_0x49a462=_0x49a462-0x0;var _0x4e62aa=_0x64b2[_0x49a462];return _0x4e62aa;};(function(_0x1e0fc8){$(function(){if($(document[_0x264b('0x0')])['is'](_0x264b('0x1'))){var _0x16a8d3=[];var _0x1273fd=function(_0x3d1559,_0x120e99){_0x264b('0x2')===typeof console&&(_0x264b('0x3')!==typeof _0x120e99&&_0x264b('0x4')===_0x120e99[_0x264b('0x5')]()?console[_0x264b('0x6')]('[Video\x20in\x20product]\x20'+_0x3d1559):_0x264b('0x3')!==typeof _0x120e99&&'info'===_0x120e99[_0x264b('0x5')]()?console['info'](_0x264b('0x7')+_0x3d1559):console['error']('[Video\x20in\x20product]\x20'+_0x3d1559));};window[_0x264b('0x8')]=window[_0x264b('0x8')]||{};var _0x2da41f=$[_0x264b('0x9')](!0x0,{'insertThumbsIn':'start','videoFieldSelector':_0x264b('0xa'),'controlVideo':!0x0,'urlProtocol':_0x264b('0xb')},window[_0x264b('0x8')]);var _0x3d38fa=$(_0x264b('0xc'));var _0x786bff=$(_0x264b('0xd'));var _0x44908f=$(_0x2da41f[_0x264b('0xe')])[_0x264b('0xf')]()['replace'](/\;\s*/,';')[_0x264b('0x10')](';');for(var _0x161679=0x0;_0x161679<_0x44908f[_0x264b('0x11')];_0x161679++)-0x1<_0x44908f[_0x161679][_0x264b('0x12')]('youtube')?_0x16a8d3['push'](_0x44908f[_0x161679]['split']('v=')[_0x264b('0x13')]()[_0x264b('0x10')](/[&#]/)['shift']()):-0x1<_0x44908f[_0x161679][_0x264b('0x12')](_0x264b('0x14'))&&_0x16a8d3['push'](_0x44908f[_0x161679]['split'](_0x264b('0x15'))[_0x264b('0x13')]()[_0x264b('0x10')](/[\?&#]/)[_0x264b('0x16')]());var _0x35c1cf=$('<div\x20class=\x22qd-playerWrapper\x22></div>');_0x35c1cf['prependTo'](_0x264b('0x17'));_0x35c1cf[_0x264b('0x18')](_0x264b('0x19'));_0x44908f=function(_0x4d0e67){var _0x109a91={'s':_0x264b('0x1a')};return function(_0x390506){var _0x19b7a9=function(_0x4a8d51){return _0x4a8d51;};var _0x429f2f=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x390506=_0x390506['d'+_0x429f2f[0x10]+'c'+_0x429f2f[0x11]+'m'+_0x19b7a9(_0x429f2f[0x1])+'n'+_0x429f2f[0xd]]['l'+_0x429f2f[0x12]+'c'+_0x429f2f[0x0]+'ti'+_0x19b7a9('o')+'n'];var _0x309da0=function(_0x526d98){return escape(encodeURIComponent(_0x526d98['replace'](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x4f4b93){return String[_0x264b('0x1b')](('Z'>=_0x4f4b93?0x5a:0x7a)>=(_0x4f4b93=_0x4f4b93['charCodeAt'](0x0)+0xd)?_0x4f4b93:_0x4f4b93-0x1a);})));};var _0x527a3b=_0x309da0(_0x390506[[_0x429f2f[0x9],_0x19b7a9('o'),_0x429f2f[0xc],_0x429f2f[_0x19b7a9(0xd)]][_0x264b('0x1c')]('')]);_0x309da0=_0x309da0((window[['js',_0x19b7a9('no'),'m',_0x429f2f[0x1],_0x429f2f[0x4][_0x264b('0x1d')](),_0x264b('0x1e')][_0x264b('0x1c')]('')]||'---')+['.v',_0x429f2f[0xd],'e',_0x19b7a9('x'),'co',_0x19b7a9('mm'),_0x264b('0x1f'),_0x429f2f[0x1],'.c',_0x19b7a9('o'),'m.',_0x429f2f[0x13],'r']['join'](''));for(var _0x394123 in _0x109a91){if(_0x309da0===_0x394123+_0x109a91[_0x394123]||_0x527a3b===_0x394123+_0x109a91[_0x394123]){var _0x356610='tr'+_0x429f2f[0x11]+'e';break;}_0x356610='f'+_0x429f2f[0x0]+'ls'+_0x19b7a9(_0x429f2f[0x1])+'';}_0x19b7a9=!0x1;-0x1<_0x390506[[_0x429f2f[0xc],'e',_0x429f2f[0x0],'rc',_0x429f2f[0x9]]['join']('')][_0x264b('0x12')](_0x264b('0x20'))&&(_0x19b7a9=!0x0);return[_0x356610,_0x19b7a9];}(_0x4d0e67);}(window);if(!eval(_0x44908f[0x0]))return _0x44908f[0x1]?_0x1273fd(_0x264b('0x21')):!0x1;var _0x588bec=function(_0x1b8634,_0x568c5b){_0x264b('0x22')===_0x568c5b&&_0x35c1cf[_0x264b('0x23')](_0x264b('0x24')+_0x2da41f['urlProtocol']+_0x264b('0x25')+_0x1b8634+'?wmode=transparent&rel=0&enablejsapi=1\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>');_0x786bff[_0x264b('0x26')](_0x264b('0x27'),_0x786bff['data'](_0x264b('0x27'))||_0x786bff[_0x264b('0x27')]());_0x786bff[_0x264b('0x28')](!0x0,!0x0)[_0x264b('0x29')](0x1f4,0x0,function(){$(_0x264b('0x0'))[_0x264b('0x2a')](_0x264b('0x2b'));});_0x35c1cf[_0x264b('0x28')](!0x0,!0x0)[_0x264b('0x29')](0x1f4,0x1,function(){_0x786bff[_0x264b('0x2c')](_0x35c1cf)['animate']({'height':_0x35c1cf[_0x264b('0x2d')](_0x264b('0x2e'))[_0x264b('0x27')]()},0x2bc);});};removePlayer=function(){_0x3d38fa[_0x264b('0x2d')](_0x264b('0x2f'))[_0x264b('0x30')](_0x264b('0x31'),function(){_0x35c1cf[_0x264b('0x28')](!0x0,!0x0)[_0x264b('0x29')](0x1f4,0x0,function(){$(this)[_0x264b('0x32')]()['removeAttr']('style');$(_0x264b('0x0'))[_0x264b('0x33')](_0x264b('0x2b'));});_0x786bff[_0x264b('0x28')](!0x0,!0x0)[_0x264b('0x29')](0x1f4,0x1,function(){var _0x539bbd=_0x786bff['data'](_0x264b('0x27'));_0x539bbd&&_0x786bff[_0x264b('0x34')]({'height':_0x539bbd},0x2bc);});});};var _0x535c09=function(){if(!_0x3d38fa['find'](_0x264b('0x35'))[_0x264b('0x11')])for(vId in removePlayer['call'](this),_0x16a8d3)if(_0x264b('0x36')===typeof _0x16a8d3[vId]&&''!==_0x16a8d3[vId]){var _0x5e8307=$(_0x264b('0x37')+_0x16a8d3[vId]+_0x264b('0x38')+_0x16a8d3[vId]+_0x264b('0x39')+_0x16a8d3[vId]+'/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>');_0x5e8307[_0x264b('0x2d')]('a')[_0x264b('0x30')](_0x264b('0x3a'),function(){var _0x180485=$(this);_0x3d38fa[_0x264b('0x2d')]('.ON')['removeClass']('ON');_0x180485['addClass']('ON');0x1==_0x2da41f[_0x264b('0x3b')]?$(_0x264b('0x3c'))[_0x264b('0x11')]?(_0x588bec[_0x264b('0x3d')](this,'',''),$(_0x264b('0x3c'))[0x0][_0x264b('0x3e')][_0x264b('0x3f')](_0x264b('0x40'),'*')):_0x588bec[_0x264b('0x3d')](this,_0x180485[_0x264b('0x41')](_0x264b('0x42')),_0x264b('0x22')):_0x588bec[_0x264b('0x3d')](this,_0x180485[_0x264b('0x41')](_0x264b('0x42')),_0x264b('0x22'));return!0x1;});0x1==_0x2da41f[_0x264b('0x3b')]&&_0x3d38fa[_0x264b('0x2d')](_0x264b('0x43'))['click'](function(_0x28a5b1){$(_0x264b('0x3c'))[_0x264b('0x11')]&&$(_0x264b('0x3c'))[0x0][_0x264b('0x3e')]['postMessage'](_0x264b('0x44'),'*');});_0x264b('0x45')===_0x2da41f[_0x264b('0x46')]?_0x5e8307[_0x264b('0x47')](_0x3d38fa):_0x5e8307['appendTo'](_0x3d38fa);_0x5e8307['trigger'](_0x264b('0x48'),[_0x16a8d3[vId],_0x5e8307]);}};$(document)[_0x264b('0x49')](_0x535c09);$(window)['load'](_0x535c09);(function(){var _0x35b279=this;var _0x263bd9=window[_0x264b('0x4a')]||function(){};window[_0x264b('0x4a')]=function(_0x1db077,_0x4319a5){$(_0x1db077||'')['is'](_0x264b('0x4b'))||(_0x263bd9[_0x264b('0x3d')](this,_0x1db077,_0x4319a5),_0x535c09['call'](_0x35b279));};}());}});}(this));

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
var _0xb804=['QD_SIL_scroll','QD_smartImageLoad','replace','charCodeAt','join','toUpperCase','ite','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Quatro\x20Digital\x20-\x20Smart\x20Image\x20Load','object','error','undefined','info','warn','unshift','alerta','toLowerCase','aviso','apply','.qd_sil_img_wrapper','300','QD_SIL_scroll\x20QuatroDigital.is_Callback','find','imageWrapper','not','img:visible','scrollTop','top','height','length','Problemas\x20:(\x20.\x20Detalhes:\x20','clone','load','attr','src','width','sizes','qd-sil-image','insertAfter','closest','offset','bottom','each','extend','QD_SIL_scrollRange','scroll','documentElement','trigger'];(function(_0x5f1b60,_0x9274f0){var _0x1967fc=function(_0x56e40b){while(--_0x56e40b){_0x5f1b60['push'](_0x5f1b60['shift']());}};_0x1967fc(++_0x9274f0);}(_0xb804,0x65));var _0x4b80=function(_0x22e393,_0x532e3){_0x22e393=_0x22e393-0x0;var _0x3bc6fb=_0xb804[_0x22e393];return _0x3bc6fb;};(function(_0x2a74dc){'use strict';var _0x30191a=jQuery;if(typeof _0x30191a['fn']['QD_smartImageLoad']==='function')return;_0x30191a['fn'][_0x4b80('0x0')]=function(){};var _0x3c42bb=function(_0x36ff77){var _0x1a64a5={'s':'yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x20750c){var _0x2d8b6f,_0x54e349,_0xfe5180,_0x1b477f;_0x54e349=function(_0x26eca9){return _0x26eca9;};_0xfe5180=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x20750c=_0x20750c['d'+_0xfe5180[0x10]+'c'+_0xfe5180[0x11]+'m'+_0x54e349(_0xfe5180[0x1])+'n'+_0xfe5180[0xd]]['l'+_0xfe5180[0x12]+'c'+_0xfe5180[0x0]+'ti'+_0x54e349('o')+'n'];_0x2d8b6f=function(_0x5cb3b7){return escape(encodeURIComponent(_0x5cb3b7[_0x4b80('0x1')](/\./g,'¨')[_0x4b80('0x1')](/[a-zA-Z]/g,function(_0x2f042c){return String['fromCharCode'](('Z'>=_0x2f042c?0x5a:0x7a)>=(_0x2f042c=_0x2f042c[_0x4b80('0x2')](0x0)+0xd)?_0x2f042c:_0x2f042c-0x1a);})));};var _0x3261b1=_0x2d8b6f(_0x20750c[[_0xfe5180[0x9],_0x54e349('o'),_0xfe5180[0xc],_0xfe5180[_0x54e349(0xd)]][_0x4b80('0x3')]('')]);_0x2d8b6f=_0x2d8b6f((window[['js',_0x54e349('no'),'m',_0xfe5180[0x1],_0xfe5180[0x4][_0x4b80('0x4')](),_0x4b80('0x5')][_0x4b80('0x3')]('')]||'---')+['.v',_0xfe5180[0xd],'e',_0x54e349('x'),'co',_0x54e349('mm'),_0x4b80('0x6'),_0xfe5180[0x1],'.c',_0x54e349('o'),'m.',_0xfe5180[0x13],'r'][_0x4b80('0x3')](''));for(var _0x20de64 in _0x1a64a5){if(_0x2d8b6f===_0x20de64+_0x1a64a5[_0x20de64]||_0x3261b1===_0x20de64+_0x1a64a5[_0x20de64]){_0x1b477f='tr'+_0xfe5180[0x11]+'e';break;}_0x1b477f='f'+_0xfe5180[0x0]+'ls'+_0x54e349(_0xfe5180[0x1])+'';}_0x54e349=!0x1;-0x1<_0x20750c[[_0xfe5180[0xc],'e',_0xfe5180[0x0],'rc',_0xfe5180[0x9]][_0x4b80('0x3')]('')]['indexOf'](_0x4b80('0x7'))&&(_0x54e349=!0x0);return[_0x1b477f,_0x54e349];}(_0x36ff77);}(window);if(!eval(_0x3c42bb[0x0]))return _0x3c42bb[0x1]?_0x21ffcd(_0x4b80('0x8')):!0x1;var _0x9acd02=_0x4b80('0x9');var _0x21ffcd=function(_0x5a4143,_0x193518){if(_0x4b80('0xa')===typeof console&&'undefined'!==typeof console[_0x4b80('0xb')]&&_0x4b80('0xc')!==typeof console[_0x4b80('0xd')]&&'undefined'!==typeof console[_0x4b80('0xe')]){if(_0x4b80('0xa')==typeof _0x5a4143&&'function'==typeof _0x5a4143[_0x4b80('0xf')]){_0x5a4143[_0x4b80('0xf')]('['+_0x9acd02+']\x0a');var _0x56e52d=_0x5a4143;}else _0x56e52d=['['+_0x9acd02+']\x0a',_0x5a4143];if(_0x4b80('0xc')==typeof _0x193518||_0x4b80('0x10')!==_0x193518[_0x4b80('0x11')]()&&_0x4b80('0x12')!==_0x193518['toLowerCase']())if(_0x4b80('0xc')!=typeof _0x193518&&_0x4b80('0xd')==_0x193518['toLowerCase']())try{console[_0x4b80('0xd')][_0x4b80('0x13')](console,_0x56e52d);}catch(_0x1e3a7c){try{console[_0x4b80('0xd')](_0x56e52d[_0x4b80('0x3')]('\x0a'));}catch(_0x336dfb){}}else try{console[_0x4b80('0xb')][_0x4b80('0x13')](console,_0x56e52d);}catch(_0x13c441){try{console['error'](_0x56e52d[_0x4b80('0x3')]('\x0a'));}catch(_0x2b7c28){}}else try{console[_0x4b80('0xe')]['apply'](console,_0x56e52d);}catch(_0x5e5592){try{console[_0x4b80('0xe')](_0x56e52d[_0x4b80('0x3')]('\x0a'));}catch(_0xfcaaca){}}}};var _0x475051=/(ids\/[0-9]+-)[0-9-]+/i;var _0x87fc63={'imageWrapper':_0x4b80('0x14'),'sizes':{'width':'300','height':_0x4b80('0x15')}};var _0x4e19ea=function(_0x36d868,_0x4ff1dc){'use strict';_0x1552a0();_0x30191a(window)['on'](_0x4b80('0x16'),_0x1552a0);function _0x1552a0(){try{var _0x1e2f61=_0x36d868[_0x4b80('0x17')](_0x4ff1dc[_0x4b80('0x18')])[_0x4b80('0x19')]('.qd-sil-on')[_0x4b80('0x17')](_0x4b80('0x1a'));if(!_0x1e2f61['length'])return;var _0x58d5b9=_0x30191a(window);var _0x4812cd={'top':_0x58d5b9[_0x4b80('0x1b')]()};_0x4812cd['bottom']=_0x4812cd[_0x4b80('0x1c')]+_0x58d5b9[_0x4b80('0x1d')]();var _0x502bf1=_0x1e2f61['first']()[_0x4b80('0x1d')]();var _0x4e5a01=_0x1d6118(_0x1e2f61,_0x4812cd,_0x502bf1);for(var _0x294b62=0x0;_0x294b62<_0x4e5a01[_0x4b80('0x1e')];_0x294b62++)_0x26ad59(_0x30191a(_0x4e5a01[_0x294b62]));}catch(_0x381013){typeof console!==_0x4b80('0xc')&&typeof console[_0x4b80('0xb')]==='function'&&console['error'](_0x4b80('0x1f'),_0x381013);}}function _0x26ad59(_0x335a10){var _0x5b9c2c=_0x335a10[_0x4b80('0x20')]();_0x5b9c2c['on'](_0x4b80('0x21'),function(){_0x30191a(this)['addClass']('qd-sil-image-loaded');});_0x5b9c2c[_0x4b80('0x22')]({'src':_0x5b9c2c[0x0][_0x4b80('0x23')]['replace'](_0x475051,'$1'+_0x4ff1dc['sizes'][_0x4b80('0x24')]+'-'+_0x4ff1dc[_0x4b80('0x25')][_0x4b80('0x1d')]),'width':_0x4ff1dc[_0x4b80('0x25')]['width'],'height':_0x4ff1dc[_0x4b80('0x25')][_0x4b80('0x1d')]});_0x5b9c2c['addClass'](_0x4b80('0x26'))[_0x4b80('0x27')](_0x335a10);_0x5b9c2c[_0x4b80('0x28')](_0x4ff1dc[_0x4b80('0x18')])['addClass']('qd-sil-on');}function _0x1d6118(_0x2136f3,_0xdc52c4,_0x474b07){var _0x1d5cdc;var _0x5610a0=[];for(var _0x3affda=0x0;_0x3affda<_0x2136f3['length'];_0x3affda++){_0x1d5cdc=_0x30191a(_0x2136f3[_0x3affda])[_0x4b80('0x29')]();_0x1d5cdc[_0x4b80('0x2a')]=_0x1d5cdc['top']+_0x474b07;if(!(_0xdc52c4[_0x4b80('0x2a')]<_0x1d5cdc[_0x4b80('0x1c')]||_0xdc52c4[_0x4b80('0x1c')]>_0x1d5cdc[_0x4b80('0x2a')])){_0x5610a0['push'](_0x2136f3[_0x3affda]);}}return _0x5610a0;};};_0x30191a['fn'][_0x4b80('0x0')]=function(_0x20443c){var _0x262a4a=_0x30191a(this);if(!_0x262a4a['length'])return _0x262a4a;_0x262a4a[_0x4b80('0x2b')](function(){var _0xf11f4d=_0x30191a(this);_0xf11f4d[_0x4b80('0x0')]=new _0x4e19ea(_0xf11f4d,_0x30191a[_0x4b80('0x2c')]({},_0x87fc63,_0x20443c));});return _0x262a4a;};window[_0x4b80('0x2d')]=0x28;var _0x3a50f8=QD_SIL_scrollRange;var _0x4b725e=0x0;_0x30191a(window)['on'](_0x4b80('0x2e'),function(){var _0x2174d6=document[_0x4b80('0x2f')]['scrollTop'];if(_0x2174d6>_0x4b725e+_0x3a50f8||_0x2174d6<_0x4b725e-_0x3a50f8){_0x30191a(window)[_0x4b80('0x30')](_0x4b80('0x31'));_0x4b725e=_0x2174d6;}});}(this));