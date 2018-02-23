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
			Common.setDataScrollToggle();
			Common.qdOverlay();
			Common.applySmartCart();
			Common.applyAmazingMenu();
			Common.applyAmazingMenuMobile();			
			Common.applyAmazingMenuFooter();
			Common.showFooterLinks();
			Common.applyCarouselShelf();
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
			$('.header-qd-v1-amazing-menu').QD_amazingMenu();
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
				responsive: [ { breakpoint: 1200, settings: { slidesToShow: 4, slidesToScroll: 4 } }, { breakpoint: 991, settings: { slidesToShow: 3, slidesToScroll: 3 } }, { breakpoint: 550, settings: { slidesToShow: 2, slidesToScroll: 2 } }, { breakpoint: 380, settings: { slidesToShow: 2, slidesToScroll: 2 } } ]
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
				responsive: [ { breakpoint: 1200, settings: { slidesToShow: 3, slidesToScroll: 3 } }, { breakpoint: 991, settings: { slidesToShow: 2, slidesToScroll: 2 } }, { breakpoint: 550, settings: { slidesToShow: 1, slidesToScroll: 1 } } ]
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
					var wrapper = $("div[id*='ResultItems_'] >.prateleira:not('.qd-fi-on')").addClass('qd-fi-on qd-xs');

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
			Product.scrollToDescription();
			Product.qdCallThumbVideo();
			Product.qdHideUniqueSkuOption();
			Product.saveAmountFlag();
			Product.openShipping();
			Product.qdClickTableMeasures();
			Product.scrollToBuyButton();
			Product.showFloatingBuyBar();
			
			$(window).on('skuSelectable.vtex', Product.applyCarouselThumb);
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
				responsive: [ { breakpoint: 1200, settings: { slidesToShow: 3, slidesToScroll: 3 } }, { breakpoint: 991, settings: { slidesToShow: 2, slidesToScroll: 2 } }, { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } } ]
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
				responsive: [ { breakpoint: 600, settings: { arrows: false, slidesToShow: 4, slidesToScroll: 4, variableWidth: false } } ]
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
			var wrapper = $(".product-qd-v1-sku-selection .specification");
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

			var $w = $(window);
			$w.scroll(function () {
				if ($w.scrollTop() > targetOffset)
					elem.addClass("active");
				else
					elem.removeClass("active");
			});
		},
		scrollToBuyButton: function() {
			$('.product-qd-v1-buy-button-float').click(function(e) {
				e.preventDefault();
				
				$('html, body').stop().animate({
					'scrollTop': $('.product-qd-v1-name').offset().top -100
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
var _0x559c=['textStatus','errorThrown','2.1','/produto/sku/','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','alerta','aviso','toLowerCase','info','apply','removeClass','qd-ssa-sku-no-selected','qd-ssa-sku-selected','SkuSellersInformation','AvailableQuantity','data-qd-ssa-qtt','each','find','[data-qd-ssa-text]','hide','qd-ssa-show','filter','length','[data-qd-ssa-text=\x22default\x22]','qd-ssa-hide','html','#qtt','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','message','qd-ssa-on','addClass','skus','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','split','trigger','QuatroDigital.ssa.prodUnavailable','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','off','vtex.sku.selected.QD','qd-ssa-sku-prod-unavailable','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','join','toUpperCase','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','QD_smartStockAvailable','initialSkuSelected','QuatroDigital.ssa.skuSelected','prod','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','unavailable','vtex.sku.selectable','available','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','function','qdAjaxQueue','qdAjax','extend','url','opts','success','call','error','complete','parameters','callbackFns','successPopulated','errorPopulated','boolean','completePopulated','object','clearQueueDelay','jqXHR','undefined','ajax'];(function(_0x47bed9,_0x33a600){var _0x5048c7=function(_0x1db8c4){while(--_0x1db8c4){_0x47bed9['push'](_0x47bed9['shift']());}};_0x5048c7(++_0x33a600);}(_0x559c,0x95));var _0xc559=function(_0x5bbaff,_0xc369d9){_0x5bbaff=_0x5bbaff-0x0;var _0x36bba4=_0x559c[_0x5bbaff];return _0x36bba4;};(function(_0x5df6e5){if(_0xc559('0x0')!==typeof _0x5df6e5['qdAjax']){var _0x1cb589={};_0x5df6e5[_0xc559('0x1')]=_0x1cb589;_0x5df6e5[_0xc559('0x2')]=function(_0x19e60d){var _0x4a707a=_0x5df6e5[_0xc559('0x3')]({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x19e60d);var _0x52f7e4=escape(encodeURIComponent(_0x4a707a[_0xc559('0x4')]));_0x1cb589[_0x52f7e4]=_0x1cb589[_0x52f7e4]||{};_0x1cb589[_0x52f7e4]['opts']=_0x1cb589[_0x52f7e4][_0xc559('0x5')]||[];_0x1cb589[_0x52f7e4][_0xc559('0x5')]['push']({'success':function(_0x3aff3e,_0x17628f,_0x2a5dab){_0x4a707a[_0xc559('0x6')][_0xc559('0x7')](this,_0x3aff3e,_0x17628f,_0x2a5dab);},'error':function(_0x49486f,_0x441e16,_0x34f82f){_0x4a707a[_0xc559('0x8')][_0xc559('0x7')](this,_0x49486f,_0x441e16,_0x34f82f);},'complete':function(_0x51aff6,_0x44f12c){_0x4a707a[_0xc559('0x9')][_0xc559('0x7')](this,_0x51aff6,_0x44f12c);}});_0x1cb589[_0x52f7e4]['parameters']=_0x1cb589[_0x52f7e4][_0xc559('0xa')]||{'success':{},'error':{},'complete':{}};_0x1cb589[_0x52f7e4][_0xc559('0xb')]=_0x1cb589[_0x52f7e4][_0xc559('0xb')]||{};_0x1cb589[_0x52f7e4]['callbackFns'][_0xc559('0xc')]='boolean'===typeof _0x1cb589[_0x52f7e4][_0xc559('0xb')][_0xc559('0xc')]?_0x1cb589[_0x52f7e4][_0xc559('0xb')][_0xc559('0xc')]:!0x1;_0x1cb589[_0x52f7e4][_0xc559('0xb')][_0xc559('0xd')]=_0xc559('0xe')===typeof _0x1cb589[_0x52f7e4][_0xc559('0xb')]['errorPopulated']?_0x1cb589[_0x52f7e4][_0xc559('0xb')][_0xc559('0xd')]:!0x1;_0x1cb589[_0x52f7e4][_0xc559('0xb')][_0xc559('0xf')]='boolean'===typeof _0x1cb589[_0x52f7e4]['callbackFns'][_0xc559('0xf')]?_0x1cb589[_0x52f7e4][_0xc559('0xb')][_0xc559('0xf')]:!0x1;_0x19e60d=_0x5df6e5[_0xc559('0x3')]({},_0x4a707a,{'success':function(_0x260485,_0x3f2222,_0x31f45f){_0x1cb589[_0x52f7e4][_0xc559('0xa')][_0xc559('0x6')]={'data':_0x260485,'textStatus':_0x3f2222,'jqXHR':_0x31f45f};_0x1cb589[_0x52f7e4]['callbackFns'][_0xc559('0xc')]=!0x0;for(var _0x44941d in _0x1cb589[_0x52f7e4][_0xc559('0x5')])_0xc559('0x10')===typeof _0x1cb589[_0x52f7e4]['opts'][_0x44941d]&&(_0x1cb589[_0x52f7e4]['opts'][_0x44941d]['success'][_0xc559('0x7')](this,_0x260485,_0x3f2222,_0x31f45f),_0x1cb589[_0x52f7e4]['opts'][_0x44941d][_0xc559('0x6')]=function(){});},'error':function(_0x58d390,_0x5742a5,_0x53b7d4){_0x1cb589[_0x52f7e4]['parameters'][_0xc559('0x8')]={'errorThrown':_0x53b7d4,'textStatus':_0x5742a5,'jqXHR':_0x58d390};_0x1cb589[_0x52f7e4][_0xc559('0xb')][_0xc559('0xd')]=!0x0;for(var _0x5ecfd3 in _0x1cb589[_0x52f7e4][_0xc559('0x5')])_0xc559('0x10')===typeof _0x1cb589[_0x52f7e4][_0xc559('0x5')][_0x5ecfd3]&&(_0x1cb589[_0x52f7e4][_0xc559('0x5')][_0x5ecfd3][_0xc559('0x8')][_0xc559('0x7')](this,_0x58d390,_0x5742a5,_0x53b7d4),_0x1cb589[_0x52f7e4][_0xc559('0x5')][_0x5ecfd3][_0xc559('0x8')]=function(){});},'complete':function(_0x29adb7,_0x92b1e2){_0x1cb589[_0x52f7e4][_0xc559('0xa')][_0xc559('0x9')]={'textStatus':_0x92b1e2,'jqXHR':_0x29adb7};_0x1cb589[_0x52f7e4][_0xc559('0xb')][_0xc559('0xf')]=!0x0;for(var _0x5a245d in _0x1cb589[_0x52f7e4][_0xc559('0x5')])_0xc559('0x10')===typeof _0x1cb589[_0x52f7e4][_0xc559('0x5')][_0x5a245d]&&(_0x1cb589[_0x52f7e4][_0xc559('0x5')][_0x5a245d][_0xc559('0x9')][_0xc559('0x7')](this,_0x29adb7,_0x92b1e2),_0x1cb589[_0x52f7e4][_0xc559('0x5')][_0x5a245d][_0xc559('0x9')]=function(){});isNaN(parseInt(_0x4a707a[_0xc559('0x11')]))||setTimeout(function(){_0x1cb589[_0x52f7e4][_0xc559('0x12')]=void 0x0;_0x1cb589[_0x52f7e4][_0xc559('0x5')]=void 0x0;_0x1cb589[_0x52f7e4][_0xc559('0xa')]=void 0x0;_0x1cb589[_0x52f7e4][_0xc559('0xb')]=void 0x0;},_0x4a707a[_0xc559('0x11')]);}});_0xc559('0x13')===typeof _0x1cb589[_0x52f7e4][_0xc559('0x12')]?_0x1cb589[_0x52f7e4][_0xc559('0x12')]=_0x5df6e5[_0xc559('0x14')](_0x19e60d):_0x1cb589[_0x52f7e4][_0xc559('0x12')]&&_0x1cb589[_0x52f7e4]['jqXHR']['readyState']&&0x4==_0x1cb589[_0x52f7e4]['jqXHR']['readyState']&&(_0x1cb589[_0x52f7e4][_0xc559('0xb')]['successPopulated']&&_0x19e60d[_0xc559('0x6')](_0x1cb589[_0x52f7e4][_0xc559('0xa')]['success']['data'],_0x1cb589[_0x52f7e4][_0xc559('0xa')][_0xc559('0x6')][_0xc559('0x15')],_0x1cb589[_0x52f7e4][_0xc559('0xa')]['success'][_0xc559('0x12')]),_0x1cb589[_0x52f7e4][_0xc559('0xb')][_0xc559('0xd')]&&_0x19e60d[_0xc559('0x8')](_0x1cb589[_0x52f7e4][_0xc559('0xa')][_0xc559('0x8')][_0xc559('0x12')],_0x1cb589[_0x52f7e4][_0xc559('0xa')]['error'][_0xc559('0x15')],_0x1cb589[_0x52f7e4][_0xc559('0xa')]['error'][_0xc559('0x16')]),_0x1cb589[_0x52f7e4]['callbackFns'][_0xc559('0xf')]&&_0x19e60d[_0xc559('0x9')](_0x1cb589[_0x52f7e4]['parameters'][_0xc559('0x9')][_0xc559('0x12')],_0x1cb589[_0x52f7e4][_0xc559('0xa')][_0xc559('0x9')][_0xc559('0x15')]));};_0x5df6e5['qdAjax']['version']=_0xc559('0x17');}}(jQuery));(function(_0x42abba){function _0x4adb07(_0x4b10fe,_0x2181f4){_0x1d90a4['qdAjax']({'url':_0xc559('0x18')+_0x4b10fe,'clearQueueDelay':null,'success':_0x2181f4,'error':function(){_0x1ef7c5(_0xc559('0x19'));}});}var _0x1d90a4=jQuery;if('function'!==typeof _0x1d90a4['fn']['QD_smartStockAvailable']){var _0x1ef7c5=function(_0x1c028c,_0x53424b){if('object'===typeof console){var _0x42f4d8;_0xc559('0x10')===typeof _0x1c028c?(_0x1c028c[_0xc559('0x1a')](_0xc559('0x1b')),_0x42f4d8=_0x1c028c):_0x42f4d8=['[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a'+_0x1c028c];_0xc559('0x13')===typeof _0x53424b||_0xc559('0x1c')!==_0x53424b['toLowerCase']()&&_0xc559('0x1d')!==_0x53424b[_0xc559('0x1e')]()?_0xc559('0x13')!==typeof _0x53424b&&_0xc559('0x1f')===_0x53424b[_0xc559('0x1e')]()?console[_0xc559('0x1f')]['apply'](console,_0x42f4d8):console[_0xc559('0x8')]['apply'](console,_0x42f4d8):console['warn'][_0xc559('0x20')](console,_0x42f4d8);}},_0x42c22c={},_0x3cf530=function(_0x98e7,_0x3c86a6){function _0x577e1a(_0x5a28ef){try{_0x98e7[_0xc559('0x21')](_0xc559('0x22'))['addClass'](_0xc559('0x23'));var _0x127a95=_0x5a28ef[0x0][_0xc559('0x24')][0x0][_0xc559('0x25')];_0x98e7['attr'](_0xc559('0x26'),_0x127a95);_0x98e7[_0xc559('0x27')](function(){var _0x98e7=_0x1d90a4(this)[_0xc559('0x28')](_0xc559('0x29'));if(0x1>_0x127a95)return _0x98e7[_0xc559('0x2a')]()['addClass']('qd-ssa-hide')[_0xc559('0x21')](_0xc559('0x2b'));var _0x5a28ef=_0x98e7[_0xc559('0x2c')]('[data-qd-ssa-text=\x22'+_0x127a95+'\x22]');_0x5a28ef=_0x5a28ef[_0xc559('0x2d')]?_0x5a28ef:_0x98e7['filter'](_0xc559('0x2e'));_0x98e7[_0xc559('0x2a')]()['addClass'](_0xc559('0x2f'))[_0xc559('0x21')](_0xc559('0x2b'));_0x5a28ef[_0xc559('0x30')]((_0x5a28ef['html']()||'')['replace'](_0xc559('0x31'),_0x127a95));_0x5a28ef['show']()['addClass'](_0xc559('0x2b'))['removeClass'](_0xc559('0x2f'));});}catch(_0x5aa628){_0x1ef7c5([_0xc559('0x32'),_0x5aa628[_0xc559('0x33')]]);}}if(_0x98e7[_0xc559('0x2d')]){_0x98e7['addClass'](_0xc559('0x34'));_0x98e7[_0xc559('0x35')](_0xc559('0x22'));try{_0x98e7[_0xc559('0x35')]('qd-ssa-skus-'+vtxctx[_0xc559('0x36')]['split'](';')[_0xc559('0x2d')]);}catch(_0xb3ef98){_0x1ef7c5([_0xc559('0x37'),_0xb3ef98[_0xc559('0x33')]]);}_0x1d90a4(window)['on'](_0xc559('0x38'),function(_0x2b3a0f,_0x2016c8,_0x4d8983){try{_0x4adb07(_0x4d8983[_0xc559('0x39')],function(_0x5d97e0){_0x577e1a(_0x5d97e0);0x1===vtxctx[_0xc559('0x36')][_0xc559('0x3a')](';')[_0xc559('0x2d')]&&0x0==_0x5d97e0[0x0][_0xc559('0x24')][0x0][_0xc559('0x25')]&&_0x1d90a4(window)[_0xc559('0x3b')](_0xc559('0x3c'));});}catch(_0x8e8ea6){_0x1ef7c5([_0xc559('0x3d'),_0x8e8ea6[_0xc559('0x33')]]);}});_0x1d90a4(window)[_0xc559('0x3e')](_0xc559('0x3f'));_0x1d90a4(window)['on'](_0xc559('0x3c'),function(){_0x98e7[_0xc559('0x35')](_0xc559('0x40'))['hide']();});}};_0x42abba=function(_0x338745){var _0x44a915={'s':_0xc559('0x41')};return function(_0x54fc85){var _0x3d9874=function(_0x3f40d0){return _0x3f40d0;};var _0x537cc0=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x54fc85=_0x54fc85['d'+_0x537cc0[0x10]+'c'+_0x537cc0[0x11]+'m'+_0x3d9874(_0x537cc0[0x1])+'n'+_0x537cc0[0xd]]['l'+_0x537cc0[0x12]+'c'+_0x537cc0[0x0]+'ti'+_0x3d9874('o')+'n'];var _0x2e73d4=function(_0x32a1f5){return escape(encodeURIComponent(_0x32a1f5[_0xc559('0x42')](/\./g,'¨')[_0xc559('0x42')](/[a-zA-Z]/g,function(_0xf2e3a9){return String[_0xc559('0x43')](('Z'>=_0xf2e3a9?0x5a:0x7a)>=(_0xf2e3a9=_0xf2e3a9['charCodeAt'](0x0)+0xd)?_0xf2e3a9:_0xf2e3a9-0x1a);})));};var _0x218564=_0x2e73d4(_0x54fc85[[_0x537cc0[0x9],_0x3d9874('o'),_0x537cc0[0xc],_0x537cc0[_0x3d9874(0xd)]][_0xc559('0x44')]('')]);_0x2e73d4=_0x2e73d4((window[['js',_0x3d9874('no'),'m',_0x537cc0[0x1],_0x537cc0[0x4][_0xc559('0x45')](),'ite']['join']('')]||_0xc559('0x46'))+['.v',_0x537cc0[0xd],'e',_0x3d9874('x'),'co',_0x3d9874('mm'),_0xc559('0x47'),_0x537cc0[0x1],'.c',_0x3d9874('o'),'m.',_0x537cc0[0x13],'r'][_0xc559('0x44')](''));for(var _0x1d474c in _0x44a915){if(_0x2e73d4===_0x1d474c+_0x44a915[_0x1d474c]||_0x218564===_0x1d474c+_0x44a915[_0x1d474c]){var _0x1d62dd='tr'+_0x537cc0[0x11]+'e';break;}_0x1d62dd='f'+_0x537cc0[0x0]+'ls'+_0x3d9874(_0x537cc0[0x1])+'';}_0x3d9874=!0x1;-0x1<_0x54fc85[[_0x537cc0[0xc],'e',_0x537cc0[0x0],'rc',_0x537cc0[0x9]][_0xc559('0x44')]('')][_0xc559('0x48')](_0xc559('0x49'))&&(_0x3d9874=!0x0);return[_0x1d62dd,_0x3d9874];}(_0x338745);}(window);if(!eval(_0x42abba[0x0]))return _0x42abba[0x1]?_0x1ef7c5(_0xc559('0x4a')):!0x1;_0x1d90a4['fn'][_0xc559('0x4b')]=function(_0x31eea1){var _0x2110e6=_0x1d90a4(this);_0x31eea1=_0x1d90a4[_0xc559('0x3')](!0x0,{},_0x42c22c,_0x31eea1);_0x2110e6['qdPlugin']=new _0x3cf530(_0x2110e6,_0x31eea1);try{_0xc559('0x10')===typeof _0x1d90a4['fn']['QD_smartStockAvailable'][_0xc559('0x4c')]&&_0x1d90a4(window)[_0xc559('0x3b')](_0xc559('0x4d'),[_0x1d90a4['fn'][_0xc559('0x4b')]['initialSkuSelected'][_0xc559('0x4e')],_0x1d90a4['fn']['QD_smartStockAvailable'][_0xc559('0x4c')][_0xc559('0x39')]]);}catch(_0x3b78e3){_0x1ef7c5([_0xc559('0x4f'),_0x3b78e3['message']]);}_0x1d90a4['fn'][_0xc559('0x4b')][_0xc559('0x50')]&&_0x1d90a4(window)['trigger']('QuatroDigital.ssa.prodUnavailable');return _0x2110e6;};_0x1d90a4(window)['on']('vtex.sku.selected.QD',function(_0x46db3b,_0x5516f1,_0x233b9c){try{_0x1d90a4['fn'][_0xc559('0x4b')][_0xc559('0x4c')]={'prod':_0x5516f1,'sku':_0x233b9c},_0x1d90a4(this)[_0xc559('0x3e')](_0x46db3b);}catch(_0x5442cb){_0x1ef7c5(['Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20',_0x5442cb['message']]);}});_0x1d90a4(window)['on'](_0xc559('0x51'),function(_0x43f169,_0x5b4841,_0x5c4b96){try{for(var _0x429d24=_0x5c4b96['length'],_0x2d0cb1=_0x5b4841=0x0;_0x2d0cb1<_0x429d24&&!_0x5c4b96[_0x2d0cb1][_0xc559('0x52')];_0x2d0cb1++)_0x5b4841+=0x1;_0x429d24<=_0x5b4841&&(_0x1d90a4['fn'][_0xc559('0x4b')]['unavailable']=!0x0);_0x1d90a4(this)[_0xc559('0x3e')](_0x43f169);}catch(_0x95fe20){_0x1ef7c5([_0xc559('0x53'),_0x95fe20[_0xc559('0x33')]]);}});_0x1d90a4(function(){_0x1d90a4(_0xc559('0x54'))['QD_smartStockAvailable']();});}}(window));
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
var _0x7b2e=['function','QD_amazingMenu','object','undefined','info','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','apply','join','error','warn','qdAmAddNdx','each','addClass','qd-am-li-','qd-am-first','last','qd-am-last','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','---','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd-am-banner','filter','.qd-am-collection','length','parent','qd-am-banner-wrapper','qdAjax','url','img[alt=\x27','attr','data-qdam-value','.box-banner','clone','insertBefore','hide','qd-am-content-loaded','text','trim','[class*=\x27colunas\x27]','\x27\x20falho.','ajaxCallback','trigger','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','children','qd-am-elem-','first','replaceSpecialChars','replace','>li','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','add','qd-am-','-li','callback','call','QuatroDigital.am.callback','extend','exec','getParent','closest'];(function(_0x497b32,_0x57f0d4){var _0x3f4c06=function(_0x490ae6){while(--_0x490ae6){_0x497b32['push'](_0x497b32['shift']());}};_0x3f4c06(++_0x57f0d4);}(_0x7b2e,0x17f));var _0xe7b2=function(_0x400ce8,_0x1548d7){_0x400ce8=_0x400ce8-0x0;var _0x398c3a=_0x7b2e[_0x400ce8];return _0x398c3a;};(function(_0x2ac5fa){_0x2ac5fa['fn'][_0xe7b2('0x0')]=_0x2ac5fa['fn'][_0xe7b2('0x1')];}(jQuery));(function(_0x98103e){var _0x23b173;var _0x278a85=jQuery;if(_0xe7b2('0x2')!==typeof _0x278a85['fn'][_0xe7b2('0x3')]){var _0x3f2ba7={'url':'/qd-amazing-menu','callback':function(){},'ajaxCallback':function(){}};var _0x445638=function(_0x32b216,_0x7bbb98){if(_0xe7b2('0x4')===typeof console&&_0xe7b2('0x5')!==typeof console['error']&&_0xe7b2('0x5')!==typeof console[_0xe7b2('0x6')]&&_0xe7b2('0x5')!==typeof console['warn']){var _0x3f7388;_0xe7b2('0x4')===typeof _0x32b216?(_0x32b216[_0xe7b2('0x7')](_0xe7b2('0x8')),_0x3f7388=_0x32b216):_0x3f7388=[_0xe7b2('0x8')+_0x32b216];if(_0xe7b2('0x5')===typeof _0x7bbb98||_0xe7b2('0x9')!==_0x7bbb98[_0xe7b2('0xa')]()&&_0xe7b2('0xb')!==_0x7bbb98[_0xe7b2('0xa')]())if(_0xe7b2('0x5')!==typeof _0x7bbb98&&_0xe7b2('0x6')===_0x7bbb98[_0xe7b2('0xa')]())try{console[_0xe7b2('0x6')][_0xe7b2('0xc')](console,_0x3f7388);}catch(_0x5d1d5a){try{console['info'](_0x3f7388[_0xe7b2('0xd')]('\x0a'));}catch(_0x3d744b){}}else try{console['error'][_0xe7b2('0xc')](console,_0x3f7388);}catch(_0x59c076){try{console[_0xe7b2('0xe')](_0x3f7388['join']('\x0a'));}catch(_0x53bca8){}}else try{console[_0xe7b2('0xf')][_0xe7b2('0xc')](console,_0x3f7388);}catch(_0x3387f4){try{console[_0xe7b2('0xf')](_0x3f7388[_0xe7b2('0xd')]('\x0a'));}catch(_0x1de5c4){}}}};_0x278a85['fn'][_0xe7b2('0x10')]=function(){var _0xa18fae=_0x278a85(this);_0xa18fae[_0xe7b2('0x11')](function(_0x3827da){_0x278a85(this)[_0xe7b2('0x12')](_0xe7b2('0x13')+_0x3827da);});_0xa18fae['first']()[_0xe7b2('0x12')](_0xe7b2('0x14'));_0xa18fae[_0xe7b2('0x15')]()[_0xe7b2('0x12')](_0xe7b2('0x16'));return _0xa18fae;};_0x278a85['fn']['QD_amazingMenu']=function(){};_0x98103e=function(_0x125872){var _0x13169f={'s':_0xe7b2('0x17')};return function(_0x2098af){var _0x5f37bc=function(_0x11e28c){return _0x11e28c;};var _0x3bd05a=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2098af=_0x2098af['d'+_0x3bd05a[0x10]+'c'+_0x3bd05a[0x11]+'m'+_0x5f37bc(_0x3bd05a[0x1])+'n'+_0x3bd05a[0xd]]['l'+_0x3bd05a[0x12]+'c'+_0x3bd05a[0x0]+'ti'+_0x5f37bc('o')+'n'];var _0x43823f=function(_0x258fc5){return escape(encodeURIComponent(_0x258fc5['replace'](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0xba71eb){return String[_0xe7b2('0x18')](('Z'>=_0xba71eb?0x5a:0x7a)>=(_0xba71eb=_0xba71eb[_0xe7b2('0x19')](0x0)+0xd)?_0xba71eb:_0xba71eb-0x1a);})));};var _0x19f59b=_0x43823f(_0x2098af[[_0x3bd05a[0x9],_0x5f37bc('o'),_0x3bd05a[0xc],_0x3bd05a[_0x5f37bc(0xd)]][_0xe7b2('0xd')]('')]);_0x43823f=_0x43823f((window[['js',_0x5f37bc('no'),'m',_0x3bd05a[0x1],_0x3bd05a[0x4][_0xe7b2('0x1a')](),_0xe7b2('0x1b')]['join']('')]||_0xe7b2('0x1c'))+['.v',_0x3bd05a[0xd],'e',_0x5f37bc('x'),'co',_0x5f37bc('mm'),'erc',_0x3bd05a[0x1],'.c',_0x5f37bc('o'),'m.',_0x3bd05a[0x13],'r'][_0xe7b2('0xd')](''));for(var _0x88843e in _0x13169f){if(_0x43823f===_0x88843e+_0x13169f[_0x88843e]||_0x19f59b===_0x88843e+_0x13169f[_0x88843e]){var _0x3b53e9='tr'+_0x3bd05a[0x11]+'e';break;}_0x3b53e9='f'+_0x3bd05a[0x0]+'ls'+_0x5f37bc(_0x3bd05a[0x1])+'';}_0x5f37bc=!0x1;-0x1<_0x2098af[[_0x3bd05a[0xc],'e',_0x3bd05a[0x0],'rc',_0x3bd05a[0x9]]['join']('')][_0xe7b2('0x1d')](_0xe7b2('0x1e'))&&(_0x5f37bc=!0x0);return[_0x3b53e9,_0x5f37bc];}(_0x125872);}(window);if(!eval(_0x98103e[0x0]))return _0x98103e[0x1]?_0x445638(_0xe7b2('0x1f')):!0x1;var _0x289c98=function(_0x162678){var _0x3d7d78=_0x162678[_0xe7b2('0x20')]('.qd_am_code');var _0x36ab24=_0x3d7d78['filter'](_0xe7b2('0x21'));var _0x7adfb2=_0x3d7d78[_0xe7b2('0x22')](_0xe7b2('0x23'));if(_0x36ab24[_0xe7b2('0x24')]||_0x7adfb2[_0xe7b2('0x24')])_0x36ab24[_0xe7b2('0x25')]()[_0xe7b2('0x12')](_0xe7b2('0x26')),_0x7adfb2[_0xe7b2('0x25')]()[_0xe7b2('0x12')]('qd-am-collection-wrapper'),_0x278a85[_0xe7b2('0x27')]({'url':_0x23b173[_0xe7b2('0x28')],'dataType':'html','success':function(_0x4e2559){var _0xc955dd=_0x278a85(_0x4e2559);_0x36ab24[_0xe7b2('0x11')](function(){var _0x4e2559=_0x278a85(this);var _0x1b1a06=_0xc955dd[_0xe7b2('0x20')](_0xe7b2('0x29')+_0x4e2559[_0xe7b2('0x2a')](_0xe7b2('0x2b'))+'\x27]');_0x1b1a06[_0xe7b2('0x24')]&&(_0x1b1a06['each'](function(){_0x278a85(this)[_0xe7b2('0x0')](_0xe7b2('0x2c'))[_0xe7b2('0x2d')]()[_0xe7b2('0x2e')](_0x4e2559);}),_0x4e2559[_0xe7b2('0x2f')]());})[_0xe7b2('0x12')](_0xe7b2('0x30'));_0x7adfb2[_0xe7b2('0x11')](function(){var _0x4e2559={};var _0x2cef02=_0x278a85(this);_0xc955dd[_0xe7b2('0x20')]('h2')[_0xe7b2('0x11')](function(){if(_0x278a85(this)[_0xe7b2('0x31')]()[_0xe7b2('0x32')]()[_0xe7b2('0xa')]()==_0x2cef02[_0xe7b2('0x2a')](_0xe7b2('0x2b'))[_0xe7b2('0x32')]()[_0xe7b2('0xa')]())return _0x4e2559=_0x278a85(this),!0x1;});_0x4e2559[_0xe7b2('0x24')]&&(_0x4e2559[_0xe7b2('0x11')](function(){_0x278a85(this)['getParent'](_0xe7b2('0x33'))[_0xe7b2('0x2d')]()[_0xe7b2('0x2e')](_0x2cef02);}),_0x2cef02[_0xe7b2('0x2f')]());})[_0xe7b2('0x12')](_0xe7b2('0x30'));},'error':function(){_0x445638('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27'+_0x23b173[_0xe7b2('0x28')]+_0xe7b2('0x34'));},'complete':function(){_0x23b173[_0xe7b2('0x35')]['call'](this);_0x278a85(window)[_0xe7b2('0x36')]('QuatroDigital.am.ajaxCallback',_0x162678);},'clearQueueDelay':0xbb8});};_0x278a85['QD_amazingMenu']=function(_0x5c52c5){var _0x8df23b=_0x5c52c5[_0xe7b2('0x20')](_0xe7b2('0x37'))[_0xe7b2('0x11')](function(){var _0x42d28d=_0x278a85(this);if(!_0x42d28d[_0xe7b2('0x24')])return _0x445638([_0xe7b2('0x38'),_0x5c52c5],_0xe7b2('0x9'));_0x42d28d['find'](_0xe7b2('0x39'))[_0xe7b2('0x25')]()['addClass'](_0xe7b2('0x3a'));_0x42d28d[_0xe7b2('0x20')]('li')['each'](function(){var _0x200df5=_0x278a85(this);var _0x5570b9=_0x200df5[_0xe7b2('0x3b')](':not(ul)');_0x5570b9[_0xe7b2('0x24')]&&_0x200df5[_0xe7b2('0x12')](_0xe7b2('0x3c')+_0x5570b9[_0xe7b2('0x3d')]()['text']()[_0xe7b2('0x32')]()[_0xe7b2('0x3e')]()['replace'](/\./g,'')[_0xe7b2('0x3f')](/\s/g,'-')[_0xe7b2('0xa')]());});var _0x4748ce=_0x42d28d[_0xe7b2('0x20')](_0xe7b2('0x40'))['qdAmAddNdx']();_0x42d28d[_0xe7b2('0x12')]('qd-amazing-menu');_0x4748ce=_0x4748ce[_0xe7b2('0x20')]('>ul');_0x4748ce[_0xe7b2('0x11')](function(){var _0x49e49b=_0x278a85(this);_0x49e49b[_0xe7b2('0x20')](_0xe7b2('0x40'))['qdAmAddNdx']()['addClass'](_0xe7b2('0x41'));_0x49e49b[_0xe7b2('0x12')](_0xe7b2('0x42'));_0x49e49b[_0xe7b2('0x25')]()[_0xe7b2('0x12')](_0xe7b2('0x43'));});_0x4748ce[_0xe7b2('0x12')](_0xe7b2('0x43'));var _0x214164=0x0,_0x98103e=function(_0x1c5e99){_0x214164+=0x1;_0x1c5e99=_0x1c5e99['children']('li')[_0xe7b2('0x3b')]('*');_0x1c5e99[_0xe7b2('0x24')]&&(_0x1c5e99[_0xe7b2('0x12')](_0xe7b2('0x44')+_0x214164),_0x98103e(_0x1c5e99));};_0x98103e(_0x42d28d);_0x42d28d[_0xe7b2('0x45')](_0x42d28d[_0xe7b2('0x20')]('ul'))['each'](function(){var _0x2d9d68=_0x278a85(this);_0x2d9d68[_0xe7b2('0x12')](_0xe7b2('0x46')+_0x2d9d68['children']('li')[_0xe7b2('0x24')]+_0xe7b2('0x47'));});});_0x289c98(_0x8df23b);_0x23b173[_0xe7b2('0x48')][_0xe7b2('0x49')](this);_0x278a85(window)[_0xe7b2('0x36')](_0xe7b2('0x4a'),_0x5c52c5);};_0x278a85['fn'][_0xe7b2('0x3')]=function(_0x3b4f45){var _0x2af763=_0x278a85(this);if(!_0x2af763[_0xe7b2('0x24')])return _0x2af763;_0x23b173=_0x278a85[_0xe7b2('0x4b')]({},_0x3f2ba7,_0x3b4f45);_0x2af763[_0xe7b2('0x4c')]=new _0x278a85[(_0xe7b2('0x3'))](_0x278a85(this));return _0x2af763;};_0x278a85(function(){_0x278a85('.qd_amazing_menu_auto')[_0xe7b2('0x3')]();});}}(this));
/* Quatro Digital Smart Cart */
var _0x6d61=['mouseenter.qd_ddc_hover','getCartInfoByUrl','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','texts','cartTotal','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','.qd-ddc-viewCart','html','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','emptyCart','cartContainer','each','call','clone','total','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','.qd-ddc-infoAllTotal','allTotal','items','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','smartCheckout','getOrderForm','_QuatroDigital_AmountProduct','function','exec','addClass','QD_checkoutQueue','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','availability','.qd-ddc-prodPrice','sellingPrice','Grátis','attr','content','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','.qd-ddc-shipping\x20input','address','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','[data-sku=\x27','lastSku','outerHeight','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','string','http','https','qd-loaded','load','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','data-sku-index','changeQantity','data-sku','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','click.qd_ddc_more','qd-loading','.qd-ddc-quantity','.qd-ddc-quantityMinus','focusout.qd_ddc_change','keyup.qd_ddc_change','click.qd_ddc_remove','removeProduct','slideUp','remove','$1-$2$3','data','qdDdcLastPostalCode','calculateShipping','BRA','closest','logisticsInfo','<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>','shippingEstimate','<tr></tr>','<td>\x20R$\x20','price','</td><td>','</td>','appendTo','tbody','insertBefore','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','quantity','index','updateItems','totalizers','done','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','removeItems','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','stop','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','avisso','Callback\x20não\x20é\x20uma\x20função','buyButtonClicked','quickViewUpdate','allowRecalculate','productId','prod_','prodId','.qd-bap-wrapper','qd-bap-item-added','input.qd-productId[value=','.qd-bap-qtt','prepend','ajaxStop','selector','dropDown','buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','replace','abs','pow','round','toFixed','split','length','join','_QuatroDigital_CartData','callback','Callbacks','undefined','error','Oooops!\x20','message','object','info','warn','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','toLowerCase','aviso','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>','skuName','name','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','vtexjs','checkout','SDK','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','find','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','qd-bb-lightBoxProdAdd','body','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','keyCode','removeClass','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text','.qd-ddc-shipping\x20.qd-ddc-cep','val','keyup.qd_ddc_cep','formatCepField','click','.qd-ddc-cep-btn','preventDefault','toggle','.qd-ddc-cep-close','hide','click._QD_DDC_closeShipping','target','.qd-ddc-cep-tooltip','.qd-ddc-cep-ok','shippingCalculate','.qd-ddc-cep','updateOnlyHover'];(function(_0x58bd00,_0x6c5a97){var _0x392ba7=function(_0x2ae60b){while(--_0x2ae60b){_0x58bd00['push'](_0x58bd00['shift']());}};_0x392ba7(++_0x6c5a97);}(_0x6d61,0x9d));var _0x16d6=function(_0x2bd4e3,_0x3c2dc6){_0x2bd4e3=_0x2bd4e3-0x0;var _0x2e5c9a=_0x6d61[_0x2bd4e3];return _0x2e5c9a;};(function(_0x27abb7){_0x27abb7['fn'][_0x16d6('0x0')]=_0x27abb7['fn']['closest'];}(jQuery));function qd_number_format(_0x1af572,_0x391e4c,_0x4679e2,_0x2b07c2){_0x1af572=(_0x1af572+'')[_0x16d6('0x1')](/[^0-9+\-Ee.]/g,'');_0x1af572=isFinite(+_0x1af572)?+_0x1af572:0x0;_0x391e4c=isFinite(+_0x391e4c)?Math[_0x16d6('0x2')](_0x391e4c):0x0;_0x2b07c2='undefined'===typeof _0x2b07c2?',':_0x2b07c2;_0x4679e2='undefined'===typeof _0x4679e2?'.':_0x4679e2;var _0x2277bc='',_0x2277bc=function(_0x5d52a7,_0xbd3580){var _0x391e4c=Math[_0x16d6('0x3')](0xa,_0xbd3580);return''+(Math[_0x16d6('0x4')](_0x5d52a7*_0x391e4c)/_0x391e4c)[_0x16d6('0x5')](_0xbd3580);},_0x2277bc=(_0x391e4c?_0x2277bc(_0x1af572,_0x391e4c):''+Math[_0x16d6('0x4')](_0x1af572))[_0x16d6('0x6')]('.');0x3<_0x2277bc[0x0][_0x16d6('0x7')]&&(_0x2277bc[0x0]=_0x2277bc[0x0][_0x16d6('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x2b07c2));(_0x2277bc[0x1]||'')[_0x16d6('0x7')]<_0x391e4c&&(_0x2277bc[0x1]=_0x2277bc[0x1]||'',_0x2277bc[0x1]+=Array(_0x391e4c-_0x2277bc[0x1][_0x16d6('0x7')]+0x1)[_0x16d6('0x8')]('0'));return _0x2277bc['join'](_0x4679e2);};(function(){try{window[_0x16d6('0x9')]=window[_0x16d6('0x9')]||{},window[_0x16d6('0x9')]['callback']=window['_QuatroDigital_CartData'][_0x16d6('0xa')]||$[_0x16d6('0xb')]();}catch(_0x94abb4){_0x16d6('0xc')!==typeof console&&'function'===typeof console[_0x16d6('0xd')]&&console[_0x16d6('0xd')](_0x16d6('0xe'),_0x94abb4[_0x16d6('0xf')]);}}());(function(_0x571bbc){try{var _0x3b65fd=jQuery,_0x5215ba=function(_0x371eab,_0x341d39){if(_0x16d6('0x10')===typeof console&&_0x16d6('0xc')!==typeof console['error']&&_0x16d6('0xc')!==typeof console[_0x16d6('0x11')]&&'undefined'!==typeof console[_0x16d6('0x12')]){var _0x45d53d;_0x16d6('0x10')===typeof _0x371eab?(_0x371eab[_0x16d6('0x13')](_0x16d6('0x14')),_0x45d53d=_0x371eab):_0x45d53d=['[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'+_0x371eab];if(_0x16d6('0xc')===typeof _0x341d39||_0x16d6('0x15')!==_0x341d39[_0x16d6('0x16')]()&&_0x16d6('0x17')!==_0x341d39[_0x16d6('0x16')]())if(_0x16d6('0xc')!==typeof _0x341d39&&_0x16d6('0x11')===_0x341d39[_0x16d6('0x16')]())try{console[_0x16d6('0x11')][_0x16d6('0x18')](console,_0x45d53d);}catch(_0x5e091b){try{console[_0x16d6('0x11')](_0x45d53d[_0x16d6('0x8')]('\x0a'));}catch(_0x597e07){}}else try{console[_0x16d6('0xd')][_0x16d6('0x18')](console,_0x45d53d);}catch(_0x4f41a6){try{console['error'](_0x45d53d['join']('\x0a'));}catch(_0x3c6a6c){}}else try{console[_0x16d6('0x12')][_0x16d6('0x18')](console,_0x45d53d);}catch(_0x15a02f){try{console[_0x16d6('0x12')](_0x45d53d[_0x16d6('0x8')]('\x0a'));}catch(_0x5d7ef6){}}}};window['_QuatroDigital_DropDown']=window[_0x16d6('0x19')]||{};window[_0x16d6('0x19')][_0x16d6('0x1a')]=!0x0;_0x3b65fd['QD_dropDownCart']=function(){};_0x3b65fd['fn'][_0x16d6('0x1b')]=function(){return{'fn':new _0x3b65fd()};};var _0x211725=function(_0x3d9fd1){var _0x475fc8={'s':'yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x23090d){var _0xe8beee=function(_0x533866){return _0x533866;};var _0x58ed6f=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x23090d=_0x23090d['d'+_0x58ed6f[0x10]+'c'+_0x58ed6f[0x11]+'m'+_0xe8beee(_0x58ed6f[0x1])+'n'+_0x58ed6f[0xd]]['l'+_0x58ed6f[0x12]+'c'+_0x58ed6f[0x0]+'ti'+_0xe8beee('o')+'n'];var _0x6cebed=function(_0x2d00f4){return escape(encodeURIComponent(_0x2d00f4[_0x16d6('0x1')](/\./g,'¨')[_0x16d6('0x1')](/[a-zA-Z]/g,function(_0x40efb1){return String[_0x16d6('0x1c')](('Z'>=_0x40efb1?0x5a:0x7a)>=(_0x40efb1=_0x40efb1[_0x16d6('0x1d')](0x0)+0xd)?_0x40efb1:_0x40efb1-0x1a);})));};var _0x579a89=_0x6cebed(_0x23090d[[_0x58ed6f[0x9],_0xe8beee('o'),_0x58ed6f[0xc],_0x58ed6f[_0xe8beee(0xd)]][_0x16d6('0x8')]('')]);_0x6cebed=_0x6cebed((window[['js',_0xe8beee('no'),'m',_0x58ed6f[0x1],_0x58ed6f[0x4][_0x16d6('0x1e')](),_0x16d6('0x1f')][_0x16d6('0x8')]('')]||_0x16d6('0x20'))+['.v',_0x58ed6f[0xd],'e',_0xe8beee('x'),'co',_0xe8beee('mm'),_0x16d6('0x21'),_0x58ed6f[0x1],'.c',_0xe8beee('o'),'m.',_0x58ed6f[0x13],'r']['join'](''));for(var _0x3145a5 in _0x475fc8){if(_0x6cebed===_0x3145a5+_0x475fc8[_0x3145a5]||_0x579a89===_0x3145a5+_0x475fc8[_0x3145a5]){var _0x2712d1='tr'+_0x58ed6f[0x11]+'e';break;}_0x2712d1='f'+_0x58ed6f[0x0]+'ls'+_0xe8beee(_0x58ed6f[0x1])+'';}_0xe8beee=!0x1;-0x1<_0x23090d[[_0x58ed6f[0xc],'e',_0x58ed6f[0x0],'rc',_0x58ed6f[0x9]][_0x16d6('0x8')]('')][_0x16d6('0x22')](_0x16d6('0x23'))&&(_0xe8beee=!0x0);return[_0x2712d1,_0xe8beee];}(_0x3d9fd1);}(window);if(!eval(_0x211725[0x0]))return _0x211725[0x1]?_0x5215ba(_0x16d6('0x24')):!0x1;_0x3b65fd[_0x16d6('0x1b')]=function(_0x2581a9,_0x180890){var _0x27151a=_0x3b65fd(_0x2581a9);if(!_0x27151a[_0x16d6('0x7')])return _0x27151a;var _0x38b031=_0x3b65fd[_0x16d6('0x25')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':_0x16d6('0x26'),'cartTotal':_0x16d6('0x27'),'emptyCart':_0x16d6('0x28'),'continueShopping':_0x16d6('0x29'),'shippingForm':_0x16d6('0x2a')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'forceImageHTTPS':!0x1,'skuName':function(_0x377b06){return _0x377b06[_0x16d6('0x2b')]||_0x377b06[_0x16d6('0x2c')];},'callback':function(){},'callbackProductsList':function(){}},_0x180890);_0x3b65fd('');var _0x40de42=this;if(_0x38b031['smartCheckout']){var _0x2994e9=!0x1;_0x16d6('0xc')===typeof window['vtexjs']&&(_0x5215ba(_0x16d6('0x2d')),_0x3b65fd[_0x16d6('0x2e')]({'url':_0x16d6('0x2f'),'async':!0x1,'dataType':_0x16d6('0x30'),'error':function(){_0x5215ba(_0x16d6('0x31'));_0x2994e9=!0x0;}}));if(_0x2994e9)return _0x5215ba(_0x16d6('0x32'));}if('object'===typeof window['vtexjs']&&'undefined'!==typeof window[_0x16d6('0x33')][_0x16d6('0x34')])var _0x571bbc=window[_0x16d6('0x33')][_0x16d6('0x34')];else if(_0x16d6('0x10')===typeof vtex&&_0x16d6('0x10')===typeof vtex['checkout']&&_0x16d6('0xc')!==typeof vtex['checkout'][_0x16d6('0x35')])_0x571bbc=new vtex['checkout'][(_0x16d6('0x35'))]();else return _0x5215ba('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x40de42['cartContainer']=_0x16d6('0x36');var _0x190904=function(_0x58280e){_0x3b65fd(this)[_0x16d6('0x37')](_0x58280e);_0x58280e[_0x16d6('0x38')](_0x16d6('0x39'))[_0x16d6('0x3a')](_0x3b65fd(_0x16d6('0x3b')))['on']('click.qd_ddc_closeFn',function(){_0x27151a['removeClass'](_0x16d6('0x3c'));_0x3b65fd(document[_0x16d6('0x3d')])['removeClass'](_0x16d6('0x3e'));});_0x3b65fd(document)[_0x16d6('0x3f')](_0x16d6('0x40'))['on'](_0x16d6('0x40'),function(_0x2af846){0x1b==_0x2af846[_0x16d6('0x41')]&&(_0x27151a['removeClass']('qd-bb-lightBoxProdAdd'),_0x3b65fd(document['body'])[_0x16d6('0x42')]('qd-bb-lightBoxBodyProdAdd'));});var _0x14988b=_0x58280e['find'](_0x16d6('0x43'));_0x58280e[_0x16d6('0x38')](_0x16d6('0x44'))['on']('click.qd_ddc_scrollUp',function(){_0x40de42[_0x16d6('0x45')]('-',void 0x0,void 0x0,_0x14988b);return!0x1;});_0x58280e[_0x16d6('0x38')](_0x16d6('0x46'))['on'](_0x16d6('0x47'),function(){_0x40de42[_0x16d6('0x45')](void 0x0,void 0x0,void 0x0,_0x14988b);return!0x1;});var _0x5c5447=_0x58280e['find'](_0x16d6('0x48'));_0x58280e[_0x16d6('0x38')](_0x16d6('0x49'))[_0x16d6('0x4a')]('')['on'](_0x16d6('0x4b'),function(_0x476c0c){_0x40de42[_0x16d6('0x4c')](_0x3b65fd(this));0xd==_0x476c0c[_0x16d6('0x41')]&&_0x58280e[_0x16d6('0x38')]('.qd-ddc-shipping\x20.qd-ddc-cep-ok')[_0x16d6('0x4d')]();});_0x58280e[_0x16d6('0x38')](_0x16d6('0x4e'))[_0x16d6('0x4d')](function(_0x276c56){_0x276c56[_0x16d6('0x4f')]();_0x5c5447[_0x16d6('0x50')]();});_0x58280e['find'](_0x16d6('0x51'))['click'](function(_0x5544bb){_0x5544bb['preventDefault']();_0x5c5447[_0x16d6('0x52')]();});_0x3b65fd(document)[_0x16d6('0x3f')](_0x16d6('0x53'))['on'](_0x16d6('0x53'),function(_0x957e0b){_0x3b65fd(_0x957e0b[_0x16d6('0x54')])['closest'](_0x58280e['find'](_0x16d6('0x55')))[_0x16d6('0x7')]||_0x5c5447['hide']();});_0x58280e[_0x16d6('0x38')](_0x16d6('0x56'))[_0x16d6('0x4d')](function(_0x104a68){_0x104a68['preventDefault']();_0x40de42[_0x16d6('0x57')](_0x58280e['find'](_0x16d6('0x58')));});if(_0x38b031[_0x16d6('0x59')]){var _0x180890=0x0;_0x3b65fd(this)['on'](_0x16d6('0x5a'),function(){var _0x58280e=function(){window[_0x16d6('0x19')]['allowUpdate']&&(_0x40de42[_0x16d6('0x5b')](),window['_QuatroDigital_DropDown']['allowUpdate']=!0x1,_0x3b65fd['fn'][_0x16d6('0x5c')](!0x0),_0x40de42[_0x16d6('0x5d')]());};_0x180890=setInterval(function(){_0x58280e();},0x258);_0x58280e();});_0x3b65fd(this)['on'](_0x16d6('0x5e'),function(){clearInterval(_0x180890);});}};var _0x17329c=function(_0x2f64ad){_0x2f64ad=_0x3b65fd(_0x2f64ad);_0x38b031[_0x16d6('0x5f')][_0x16d6('0x60')]=_0x38b031['texts'][_0x16d6('0x60')][_0x16d6('0x1')]('#value',_0x16d6('0x61'));_0x38b031[_0x16d6('0x5f')][_0x16d6('0x60')]=_0x38b031[_0x16d6('0x5f')][_0x16d6('0x60')][_0x16d6('0x1')](_0x16d6('0x62'),_0x16d6('0x63'));_0x38b031['texts'][_0x16d6('0x60')]=_0x38b031[_0x16d6('0x5f')][_0x16d6('0x60')][_0x16d6('0x1')](_0x16d6('0x64'),_0x16d6('0x65'));_0x38b031[_0x16d6('0x5f')][_0x16d6('0x60')]=_0x38b031[_0x16d6('0x5f')][_0x16d6('0x60')][_0x16d6('0x1')]('#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0x2f64ad[_0x16d6('0x38')](_0x16d6('0x66'))[_0x16d6('0x67')](_0x38b031[_0x16d6('0x5f')][_0x16d6('0x68')]);_0x2f64ad[_0x16d6('0x38')](_0x16d6('0x69'))['html'](_0x38b031[_0x16d6('0x5f')][_0x16d6('0x6a')]);_0x2f64ad[_0x16d6('0x38')](_0x16d6('0x6b'))['html'](_0x38b031['texts'][_0x16d6('0x6c')]);_0x2f64ad[_0x16d6('0x38')](_0x16d6('0x6d'))[_0x16d6('0x67')](_0x38b031[_0x16d6('0x5f')][_0x16d6('0x60')]);_0x2f64ad[_0x16d6('0x38')](_0x16d6('0x6e'))[_0x16d6('0x67')](_0x38b031[_0x16d6('0x5f')][_0x16d6('0x6f')]);_0x2f64ad[_0x16d6('0x38')](_0x16d6('0x70'))[_0x16d6('0x67')](_0x38b031['texts'][_0x16d6('0x71')]);return _0x2f64ad;}(this[_0x16d6('0x72')]);var _0x35992d=0x0;_0x27151a[_0x16d6('0x73')](function(){0x0<_0x35992d?_0x190904[_0x16d6('0x74')](this,_0x17329c[_0x16d6('0x75')]()):_0x190904['call'](this,_0x17329c);_0x35992d++;});window[_0x16d6('0x9')][_0x16d6('0xa')][_0x16d6('0x3a')](function(){_0x3b65fd('.qd-ddc-infoTotalValue')[_0x16d6('0x67')](window[_0x16d6('0x9')][_0x16d6('0x76')]||'--');_0x3b65fd(_0x16d6('0x77'))[_0x16d6('0x67')](window[_0x16d6('0x9')][_0x16d6('0x78')]||'0');_0x3b65fd(_0x16d6('0x79'))[_0x16d6('0x67')](window[_0x16d6('0x9')]['shipping']||'--');_0x3b65fd(_0x16d6('0x7a'))['html'](window['_QuatroDigital_CartData'][_0x16d6('0x7b')]||'--');});var _0x41c574=function(_0x1d7476,_0x44de73){if(_0x16d6('0xc')===typeof _0x1d7476[_0x16d6('0x7c')])return _0x5215ba('Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição');_0x40de42[_0x16d6('0x7d')]['call'](this,_0x44de73);};_0x40de42[_0x16d6('0x5b')]=function(_0x26b6e5,_0x3b71ad){_0x16d6('0xc')!=typeof _0x3b71ad?window['_QuatroDigital_DropDown'][_0x16d6('0x7e')]=_0x3b71ad:window[_0x16d6('0x19')]['dataOptionsCache']&&(_0x3b71ad=window[_0x16d6('0x19')]['dataOptionsCache']);setTimeout(function(){window[_0x16d6('0x19')][_0x16d6('0x7e')]=void 0x0;},_0x38b031[_0x16d6('0x7f')]);_0x3b65fd(_0x16d6('0x80'))[_0x16d6('0x42')](_0x16d6('0x81'));if(_0x38b031[_0x16d6('0x82')]){var _0x41314e=function(_0xe432dd){window[_0x16d6('0x19')][_0x16d6('0x83')]=_0xe432dd;_0x41c574(_0xe432dd,_0x3b71ad);_0x16d6('0xc')!==typeof window[_0x16d6('0x84')]&&_0x16d6('0x85')===typeof window[_0x16d6('0x84')][_0x16d6('0x86')]&&window[_0x16d6('0x84')][_0x16d6('0x86')][_0x16d6('0x74')](this);_0x3b65fd('.qd-ddc-wrapper')[_0x16d6('0x87')](_0x16d6('0x81'));};'undefined'!==typeof window[_0x16d6('0x19')]['getOrderForm']?(_0x41314e(window['_QuatroDigital_DropDown'][_0x16d6('0x83')]),_0x16d6('0x85')===typeof _0x26b6e5&&_0x26b6e5(window['_QuatroDigital_DropDown'][_0x16d6('0x83')])):_0x3b65fd[_0x16d6('0x88')](['items','totalizers',_0x16d6('0x89')],{'done':function(_0x39db2a){_0x41314e['call'](this,_0x39db2a);_0x16d6('0x85')===typeof _0x26b6e5&&_0x26b6e5(_0x39db2a);},'fail':function(_0x4deb7b){_0x5215ba([_0x16d6('0x8a'),_0x4deb7b]);}});}else alert(_0x16d6('0x8b'));};_0x40de42[_0x16d6('0x5d')]=function(){var _0x39e09a=_0x3b65fd(_0x16d6('0x80'));_0x39e09a[_0x16d6('0x38')](_0x16d6('0x8c'))[_0x16d6('0x7')]?_0x39e09a[_0x16d6('0x42')](_0x16d6('0x8d')):_0x39e09a[_0x16d6('0x87')](_0x16d6('0x8d'));};_0x40de42[_0x16d6('0x7d')]=function(_0x3df177){var _0x180890=_0x3b65fd(_0x16d6('0x8e'));_0x180890[_0x16d6('0x8f')]();_0x180890['each'](function(){var _0x180890=_0x3b65fd(this),_0x51dcf7,_0x5c2e65,_0x1218a8=_0x3b65fd(''),_0x2ce491;for(_0x2ce491 in window[_0x16d6('0x19')]['getOrderForm'][_0x16d6('0x7c')])if('object'===typeof window['_QuatroDigital_DropDown'][_0x16d6('0x83')][_0x16d6('0x7c')][_0x2ce491]){var _0x47e9c7=window[_0x16d6('0x19')]['getOrderForm']['items'][_0x2ce491];var _0x2581a9=_0x47e9c7['productCategoryIds'][_0x16d6('0x1')](/^\/|\/$/g,'')[_0x16d6('0x6')]('/');var _0x25b41c=_0x3b65fd(_0x16d6('0x90'));_0x25b41c['attr']({'data-sku':_0x47e9c7['id'],'data-sku-index':_0x2ce491,'data-qd-departament':_0x2581a9[0x0],'data-qd-category':_0x2581a9[_0x2581a9['length']-0x1]});_0x25b41c[_0x16d6('0x87')]('qd-ddc-'+_0x47e9c7[_0x16d6('0x91')]);_0x25b41c[_0x16d6('0x38')]('.qd-ddc-prodName')[_0x16d6('0x37')](_0x38b031[_0x16d6('0x2b')](_0x47e9c7));_0x25b41c[_0x16d6('0x38')](_0x16d6('0x92'))[_0x16d6('0x37')](isNaN(_0x47e9c7[_0x16d6('0x93')])?_0x47e9c7[_0x16d6('0x93')]:0x0==_0x47e9c7[_0x16d6('0x93')]?_0x16d6('0x94'):(_0x3b65fd('meta[name=currency]')[_0x16d6('0x95')](_0x16d6('0x96'))||'R$')+'\x20'+qd_number_format(_0x47e9c7['sellingPrice']/0x64,0x2,',','.'));_0x25b41c[_0x16d6('0x38')]('.qd-ddc-quantity')['attr']({'data-sku':_0x47e9c7['id'],'data-sku-index':_0x2ce491})['val'](_0x47e9c7['quantity']);_0x25b41c[_0x16d6('0x38')](_0x16d6('0x97'))[_0x16d6('0x95')]({'data-sku':_0x47e9c7['id'],'data-sku-index':_0x2ce491});_0x40de42[_0x16d6('0x98')](_0x47e9c7['id'],_0x25b41c['find'](_0x16d6('0x99')),_0x47e9c7[_0x16d6('0x9a')]);_0x25b41c['find'](_0x16d6('0x9b'))[_0x16d6('0x95')]({'data-sku':_0x47e9c7['id'],'data-sku-index':_0x2ce491});_0x25b41c['appendTo'](_0x180890);_0x1218a8=_0x1218a8[_0x16d6('0x3a')](_0x25b41c);}try{var _0x4ff71f=_0x180890['getParent']('.qd-ddc-wrapper')[_0x16d6('0x38')](_0x16d6('0x9c'));_0x4ff71f[_0x16d6('0x7')]&&''==_0x4ff71f[_0x16d6('0x4a')]()&&window[_0x16d6('0x19')][_0x16d6('0x83')][_0x16d6('0x89')][_0x16d6('0x9d')]&&_0x4ff71f['val'](window[_0x16d6('0x19')][_0x16d6('0x83')][_0x16d6('0x89')][_0x16d6('0x9d')]['postalCode']);}catch(_0x1d7583){_0x5215ba(_0x16d6('0x9e')+_0x1d7583['message'],_0x16d6('0x17'));}_0x40de42[_0x16d6('0x9f')](_0x180890);_0x40de42[_0x16d6('0x5d')]();_0x3df177&&_0x3df177['lastSku']&&function(){_0x5c2e65=_0x1218a8['filter'](_0x16d6('0xa0')+_0x3df177[_0x16d6('0xa1')]+'\x27]');_0x5c2e65[_0x16d6('0x7')]&&(_0x51dcf7=0x0,_0x1218a8[_0x16d6('0x73')](function(){var _0x3df177=_0x3b65fd(this);if(_0x3df177['is'](_0x5c2e65))return!0x1;_0x51dcf7+=_0x3df177[_0x16d6('0xa2')]();}),_0x40de42[_0x16d6('0x45')](void 0x0,void 0x0,_0x51dcf7,_0x180890[_0x16d6('0x3a')](_0x180890[_0x16d6('0xa3')]())),_0x1218a8['removeClass'](_0x16d6('0xa4')),function(_0x32b3ab){_0x32b3ab[_0x16d6('0x87')](_0x16d6('0xa5'));_0x32b3ab[_0x16d6('0x87')](_0x16d6('0xa4'));setTimeout(function(){_0x32b3ab[_0x16d6('0x42')]('qd-ddc-lastAdded');},_0x38b031[_0x16d6('0x7f')]);}(_0x5c2e65),_0x3b65fd(document['body'])[_0x16d6('0x87')]('qd-ddc-product-add-time-v2'),setTimeout(function(){_0x3b65fd(document[_0x16d6('0x3d')])[_0x16d6('0x42')](_0x16d6('0xa6'));},_0x38b031['timeRemoveNewItemClass']));}();});(function(){_QuatroDigital_DropDown[_0x16d6('0x83')]['items']['length']?(_0x3b65fd('body')[_0x16d6('0x42')](_0x16d6('0xa7'))[_0x16d6('0x87')](_0x16d6('0xa8')),setTimeout(function(){_0x3b65fd('body')['removeClass'](_0x16d6('0xa9'));},_0x38b031['timeRemoveNewItemClass'])):_0x3b65fd(_0x16d6('0x3d'))[_0x16d6('0x42')](_0x16d6('0xaa'))[_0x16d6('0x87')](_0x16d6('0xa7'));}());_0x16d6('0x85')===typeof _0x38b031[_0x16d6('0xab')]?_0x38b031['callbackProductsList'][_0x16d6('0x74')](this):_0x5215ba(_0x16d6('0xac'));};_0x40de42['insertProdImg']=function(_0xe4a55e,_0x1a05c2,_0x484056){function _0x481031(){_0x38b031['forceImageHTTPS']&&_0x16d6('0xad')==typeof _0x484056&&(_0x484056=_0x484056[_0x16d6('0x1')](_0x16d6('0xae'),_0x16d6('0xaf')));_0x1a05c2[_0x16d6('0x42')](_0x16d6('0xb0'))[_0x16d6('0xb1')](function(){_0x3b65fd(this)[_0x16d6('0x87')]('qd-loaded');})[_0x16d6('0x95')](_0x16d6('0xb2'),_0x484056);}_0x484056?_0x481031():isNaN(_0xe4a55e)?_0x5215ba(_0x16d6('0xb3'),'alerta'):alert('Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.');};_0x40de42[_0x16d6('0x9f')]=function(_0x5deb9f){var _0x180890=function(_0x14c2f2,_0x38daef){var _0x4f1056=_0x3b65fd(_0x14c2f2);var _0x160098=_0x4f1056[_0x16d6('0x95')]('data-sku');var _0x2581a9=_0x4f1056[_0x16d6('0x95')](_0x16d6('0xb4'));if(_0x160098){var _0x121284=parseInt(_0x4f1056[_0x16d6('0x4a')]())||0x1;_0x40de42[_0x16d6('0xb5')]([_0x160098,_0x2581a9],_0x121284,_0x121284+0x1,function(_0x3a32d1){_0x4f1056[_0x16d6('0x4a')](_0x3a32d1);_0x16d6('0x85')===typeof _0x38daef&&_0x38daef();});}};var _0x411d2c=function(_0x39ee1e,_0x4f1e03){var _0x180890=_0x3b65fd(_0x39ee1e);var _0x1b4632=_0x180890[_0x16d6('0x95')]('data-sku');var _0xd83187=_0x180890[_0x16d6('0x95')](_0x16d6('0xb4'));if(_0x1b4632){var _0x2581a9=parseInt(_0x180890[_0x16d6('0x4a')]())||0x2;_0x40de42[_0x16d6('0xb5')]([_0x1b4632,_0xd83187],_0x2581a9,_0x2581a9-0x1,function(_0x3a442e){_0x180890[_0x16d6('0x4a')](_0x3a442e);_0x16d6('0x85')===typeof _0x4f1e03&&_0x4f1e03();});}};var _0x20ddf2=function(_0x25eac3,_0x3f4d1d){var _0x1c5d32=_0x3b65fd(_0x25eac3);var _0x1935a2=_0x1c5d32[_0x16d6('0x95')](_0x16d6('0xb6'));var _0x2581a9=_0x1c5d32[_0x16d6('0x95')](_0x16d6('0xb4'));if(_0x1935a2){var _0x4c575e=parseInt(_0x1c5d32[_0x16d6('0x4a')]())||0x1;_0x40de42['changeQantity']([_0x1935a2,_0x2581a9],0x1,_0x4c575e,function(_0x4b785b){_0x1c5d32[_0x16d6('0x4a')](_0x4b785b);'function'===typeof _0x3f4d1d&&_0x3f4d1d();});}};var _0x2581a9=_0x5deb9f[_0x16d6('0x38')](_0x16d6('0xb7'));_0x2581a9[_0x16d6('0x87')](_0x16d6('0xb8'))['each'](function(){var _0x5deb9f=_0x3b65fd(this);_0x5deb9f[_0x16d6('0x38')]('.qd-ddc-quantityMore')['on'](_0x16d6('0xb9'),function(_0x38a88e){_0x38a88e[_0x16d6('0x4f')]();_0x2581a9['addClass'](_0x16d6('0xba'));_0x180890(_0x5deb9f[_0x16d6('0x38')](_0x16d6('0xbb')),function(){_0x2581a9[_0x16d6('0x42')]('qd-loading');});});_0x5deb9f[_0x16d6('0x38')](_0x16d6('0xbc'))['on']('click.qd_ddc_minus',function(_0x85eba8){_0x85eba8[_0x16d6('0x4f')]();_0x2581a9[_0x16d6('0x87')](_0x16d6('0xba'));_0x411d2c(_0x5deb9f[_0x16d6('0x38')]('.qd-ddc-quantity'),function(){_0x2581a9[_0x16d6('0x42')](_0x16d6('0xba'));});});_0x5deb9f[_0x16d6('0x38')](_0x16d6('0xbb'))['on'](_0x16d6('0xbd'),function(){_0x2581a9[_0x16d6('0x87')]('qd-loading');_0x20ddf2(this,function(){_0x2581a9[_0x16d6('0x42')](_0x16d6('0xba'));});});_0x5deb9f[_0x16d6('0x38')](_0x16d6('0xbb'))['on'](_0x16d6('0xbe'),function(_0x368ffa){0xd==_0x368ffa[_0x16d6('0x41')]&&(_0x2581a9[_0x16d6('0x87')](_0x16d6('0xba')),_0x20ddf2(this,function(){_0x2581a9['removeClass'](_0x16d6('0xba'));}));});});_0x5deb9f[_0x16d6('0x38')]('.qd-ddc-prodRow')[_0x16d6('0x73')](function(){var _0x5deb9f=_0x3b65fd(this);_0x5deb9f[_0x16d6('0x38')](_0x16d6('0x97'))['on'](_0x16d6('0xbf'),function(){_0x5deb9f[_0x16d6('0x87')]('qd-loading');_0x40de42[_0x16d6('0xc0')](_0x3b65fd(this),function(_0x446f6b){_0x446f6b?_0x5deb9f['stop'](!0x0)[_0x16d6('0xc1')](function(){_0x5deb9f[_0x16d6('0xc2')]();_0x40de42[_0x16d6('0x5d')]();}):_0x5deb9f[_0x16d6('0x42')](_0x16d6('0xba'));});return!0x1;});});};_0x40de42[_0x16d6('0x4c')]=function(_0x35e3be){var _0x2205e8=_0x35e3be[_0x16d6('0x4a')]();_0x2205e8=_0x2205e8[_0x16d6('0x1')](/[^0-9\-]/g,'');_0x2205e8=_0x2205e8[_0x16d6('0x1')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x16d6('0xc3'));_0x2205e8=_0x2205e8['replace'](/(.{9}).*/g,'$1');_0x35e3be[_0x16d6('0x4a')](_0x2205e8);};_0x40de42[_0x16d6('0x57')]=function(_0x1df676){var _0x36ada9=_0x1df676[_0x16d6('0x4a')]();0x9<=_0x36ada9[_0x16d6('0x7')]&&(_0x1df676[_0x16d6('0xc4')](_0x16d6('0xc5'))!=_0x36ada9&&_0x571bbc[_0x16d6('0xc6')]({'postalCode':_0x36ada9,'country':_0x16d6('0xc7')})['done'](function(_0x1160d8){_0x1df676[_0x16d6('0xc8')]('.qd-ddc-cep-tooltip-text')[_0x16d6('0x38')]('.qd-dd-cep-slas')[_0x16d6('0xc2')]();window['_QuatroDigital_DropDown'][_0x16d6('0x83')]=_0x1160d8;_0x40de42[_0x16d6('0x5b')]();_0x1160d8=_0x1160d8[_0x16d6('0x89')][_0x16d6('0xc9')][0x0]['slas'];for(var _0x2581a9=_0x3b65fd(_0x16d6('0xca')),_0x3678af=0x0;_0x3678af<_0x1160d8['length'];_0x3678af++){var _0x4a50f7=_0x1160d8[_0x3678af],_0x10c4dd=0x1<_0x4a50f7[_0x16d6('0xcb')]?_0x4a50f7['shippingEstimate'][_0x16d6('0x1')]('bd','\x20dia\x20útil'):_0x4a50f7['shippingEstimate'][_0x16d6('0x1')]('bd','\x20dias\x20útéis'),_0x5ed646=_0x3b65fd(_0x16d6('0xcc'));_0x5ed646[_0x16d6('0x37')](_0x16d6('0xcd')+qd_number_format(_0x4a50f7[_0x16d6('0xce')]/0x64,0x2,',','.')+_0x16d6('0xcf')+_0x4a50f7[_0x16d6('0x2c')]+',\x20entrega\x20em\x20'+_0x10c4dd+'\x20para\x20o\x20CEP\x20'+_0x36ada9+_0x16d6('0xd0'));_0x5ed646[_0x16d6('0xd1')](_0x2581a9[_0x16d6('0x38')](_0x16d6('0xd2')));}_0x2581a9[_0x16d6('0xd3')](_0x1df676[_0x16d6('0xc8')]('.qd-ddc-cep-tooltip-text')[_0x16d6('0x38')]('.qd-ddc-cep-close'));})[_0x16d6('0xd4')](function(_0x412294){_0x5215ba([_0x16d6('0xd5'),_0x412294]);updateCartData();}),_0x1df676[_0x16d6('0xc4')](_0x16d6('0xc5'),_0x36ada9));};_0x40de42[_0x16d6('0xb5')]=function(_0x507e29,_0x26cee8,_0x5df408,_0x342120){function _0x78695a(_0x329653){_0x329653=_0x16d6('0xd6')!==typeof _0x329653?!0x1:_0x329653;_0x40de42['getCartInfoByUrl']();window[_0x16d6('0x19')][_0x16d6('0x1a')]=!0x1;_0x40de42['cartIsEmpty']();_0x16d6('0xc')!==typeof window['_QuatroDigital_AmountProduct']&&'function'===typeof window[_0x16d6('0x84')]['exec']&&window[_0x16d6('0x84')][_0x16d6('0x86')][_0x16d6('0x74')](this);_0x16d6('0x85')===typeof adminCart&&adminCart();_0x3b65fd['fn'][_0x16d6('0x5c')](!0x0,void 0x0,_0x329653);'function'===typeof _0x342120&&_0x342120(_0x26cee8);}_0x5df408=_0x5df408||0x1;if(0x1>_0x5df408)return _0x26cee8;if(_0x38b031['smartCheckout']){if(_0x16d6('0xc')===typeof window[_0x16d6('0x19')][_0x16d6('0x83')][_0x16d6('0x7c')][_0x507e29[0x1]])return _0x5215ba(_0x16d6('0xd7')+_0x507e29[0x1]+']'),_0x26cee8;window[_0x16d6('0x19')][_0x16d6('0x83')]['items'][_0x507e29[0x1]][_0x16d6('0xd8')]=_0x5df408;window['_QuatroDigital_DropDown'][_0x16d6('0x83')][_0x16d6('0x7c')][_0x507e29[0x1]][_0x16d6('0xd9')]=_0x507e29[0x1];_0x571bbc[_0x16d6('0xda')]([window[_0x16d6('0x19')]['getOrderForm'][_0x16d6('0x7c')][_0x507e29[0x1]]],[_0x16d6('0x7c'),_0x16d6('0xdb'),_0x16d6('0x89')])[_0x16d6('0xdc')](function(_0x41de6c){window[_0x16d6('0x19')][_0x16d6('0x83')]=_0x41de6c;_0x78695a(!0x0);})['fail'](function(_0x57877c){_0x5215ba([_0x16d6('0xdd'),_0x57877c]);_0x78695a();});}else _0x5215ba('atenção\x20esta\x20método\x20esta\x20descontinuado');};_0x40de42[_0x16d6('0xc0')]=function(_0x33bf0e,_0x900e44){function _0x384107(_0x333b9c){_0x333b9c=_0x16d6('0xd6')!==typeof _0x333b9c?!0x1:_0x333b9c;_0x16d6('0xc')!==typeof window[_0x16d6('0x84')]&&_0x16d6('0x85')===typeof window[_0x16d6('0x84')][_0x16d6('0x86')]&&window[_0x16d6('0x84')][_0x16d6('0x86')][_0x16d6('0x74')](this);'function'===typeof adminCart&&adminCart();_0x3b65fd['fn']['simpleCart'](!0x0,void 0x0,_0x333b9c);'function'===typeof _0x900e44&&_0x900e44(_0x3b6a70);}var _0x3b6a70=!0x1,_0x2581a9=_0x3b65fd(_0x33bf0e)[_0x16d6('0x95')]('data-sku-index');if(_0x38b031['smartCheckout']){if(_0x16d6('0xc')===typeof window[_0x16d6('0x19')][_0x16d6('0x83')][_0x16d6('0x7c')][_0x2581a9])return _0x5215ba('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x2581a9+']'),_0x3b6a70;window['_QuatroDigital_DropDown'][_0x16d6('0x83')]['items'][_0x2581a9][_0x16d6('0xd9')]=_0x2581a9;_0x571bbc[_0x16d6('0xde')]([window[_0x16d6('0x19')]['getOrderForm'][_0x16d6('0x7c')][_0x2581a9]],['items',_0x16d6('0xdb'),'shippingData'])['done'](function(_0x1b010c){_0x3b6a70=!0x0;window['_QuatroDigital_DropDown'][_0x16d6('0x83')]=_0x1b010c;_0x41c574(_0x1b010c);_0x384107(!0x0);})['fail'](function(_0x10d42c){_0x5215ba(['Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho',_0x10d42c]);_0x384107();});}else alert('Atenção,\x20este\x20método\x20esta\x20descontinuado.');};_0x40de42['scrollCart']=function(_0xd3b13d,_0x51a472,_0x489e66,_0x374b05){_0x374b05=_0x374b05||_0x3b65fd(_0x16d6('0xdf'));_0xd3b13d=_0xd3b13d||'+';_0x51a472=_0x51a472||0.9*_0x374b05[_0x16d6('0xe0')]();_0x374b05[_0x16d6('0xe1')](!0x0,!0x0)[_0x16d6('0xe2')]({'scrollTop':isNaN(_0x489e66)?_0xd3b13d+'='+_0x51a472+'px':_0x489e66});};_0x38b031[_0x16d6('0x59')]||(_0x40de42[_0x16d6('0x5b')](),_0x3b65fd['fn'][_0x16d6('0x5c')](!0x0));_0x3b65fd(window)['on'](_0x16d6('0xe3'),function(){try{window[_0x16d6('0x19')]['getOrderForm']=void 0x0,_0x40de42[_0x16d6('0x5b')]();}catch(_0x668db){_0x5215ba('Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20'+_0x668db['message'],_0x16d6('0xe4'));}});'function'===typeof _0x38b031['callback']?_0x38b031[_0x16d6('0xa')][_0x16d6('0x74')](this):_0x5215ba(_0x16d6('0xe5'));};_0x3b65fd['fn'][_0x16d6('0x1b')]=function(_0xabd781){var _0x2ac1c3=_0x3b65fd(this);_0x2ac1c3['fn']=new _0x3b65fd[(_0x16d6('0x1b'))](this,_0xabd781);return _0x2ac1c3;};}catch(_0x316ef9){_0x16d6('0xc')!==typeof console&&_0x16d6('0x85')===typeof console[_0x16d6('0xd')]&&console[_0x16d6('0xd')](_0x16d6('0xe'),_0x316ef9);}}(this));(function(_0x25b55a){try{var _0x589c29=jQuery;window[_0x16d6('0x84')]=window[_0x16d6('0x84')]||{};window[_0x16d6('0x84')][_0x16d6('0x7c')]={};window[_0x16d6('0x84')]['allowRecalculate']=!0x1;window[_0x16d6('0x84')][_0x16d6('0xe6')]=!0x1;window['_QuatroDigital_AmountProduct'][_0x16d6('0xe7')]=!0x1;var _0x167832=function(){if(window['_QuatroDigital_AmountProduct'][_0x16d6('0xe8')]){var _0x1b251b=!0x1;var _0x564403={};window['_QuatroDigital_AmountProduct'][_0x16d6('0x7c')]={};for(_0x5ef964 in window[_0x16d6('0x19')][_0x16d6('0x83')][_0x16d6('0x7c')])if(_0x16d6('0x10')===typeof window[_0x16d6('0x19')]['getOrderForm'][_0x16d6('0x7c')][_0x5ef964]){var _0x28e73d=window[_0x16d6('0x19')][_0x16d6('0x83')]['items'][_0x5ef964];_0x16d6('0xc')!==typeof _0x28e73d[_0x16d6('0xe9')]&&null!==_0x28e73d['productId']&&''!==_0x28e73d[_0x16d6('0xe9')]&&(window['_QuatroDigital_AmountProduct']['items'][_0x16d6('0xea')+_0x28e73d[_0x16d6('0xe9')]]=window['_QuatroDigital_AmountProduct'][_0x16d6('0x7c')][_0x16d6('0xea')+_0x28e73d[_0x16d6('0xe9')]]||{},window[_0x16d6('0x84')][_0x16d6('0x7c')][_0x16d6('0xea')+_0x28e73d[_0x16d6('0xe9')]][_0x16d6('0xeb')]=_0x28e73d[_0x16d6('0xe9')],_0x564403['prod_'+_0x28e73d[_0x16d6('0xe9')]]||(window[_0x16d6('0x84')][_0x16d6('0x7c')]['prod_'+_0x28e73d[_0x16d6('0xe9')]][_0x16d6('0x78')]=0x0),window[_0x16d6('0x84')]['items']['prod_'+_0x28e73d[_0x16d6('0xe9')]]['qtt']+=_0x28e73d[_0x16d6('0xd8')],_0x1b251b=!0x0,_0x564403[_0x16d6('0xea')+_0x28e73d['productId']]=!0x0);}var _0x5ef964=_0x1b251b;}else _0x5ef964=void 0x0;window[_0x16d6('0x84')][_0x16d6('0xe8')]&&(_0x589c29(_0x16d6('0xec'))['remove'](),_0x589c29('.qd-bap-item-added')['removeClass'](_0x16d6('0xed')));for(var _0x323e07 in window[_0x16d6('0x84')][_0x16d6('0x7c')]){_0x28e73d=window[_0x16d6('0x84')][_0x16d6('0x7c')][_0x323e07];if('object'!==typeof _0x28e73d)return;_0x564403=_0x589c29(_0x16d6('0xee')+_0x28e73d[_0x16d6('0xeb')]+']')[_0x16d6('0x0')]('li');if(window[_0x16d6('0x84')][_0x16d6('0xe8')]||!_0x564403[_0x16d6('0x38')](_0x16d6('0xec'))['length'])_0x1b251b=_0x589c29('<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>'),_0x1b251b[_0x16d6('0x38')](_0x16d6('0xef'))[_0x16d6('0x67')](_0x28e73d[_0x16d6('0x78')]),_0x28e73d=_0x564403[_0x16d6('0x38')]('.qd_bap_wrapper_content'),_0x28e73d[_0x16d6('0x7')]?_0x28e73d[_0x16d6('0xf0')](_0x1b251b)[_0x16d6('0x87')](_0x16d6('0xed')):_0x564403[_0x16d6('0xf0')](_0x1b251b);}_0x5ef964&&(window[_0x16d6('0x84')]['allowRecalculate']=!0x1);};window[_0x16d6('0x84')]['exec']=function(){window['_QuatroDigital_AmountProduct'][_0x16d6('0xe8')]=!0x0;_0x167832[_0x16d6('0x74')](this);};_0x589c29(document)[_0x16d6('0xf1')](function(){_0x167832[_0x16d6('0x74')](this);});}catch(_0x18f732){_0x16d6('0xc')!==typeof console&&_0x16d6('0x85')===typeof console['error']&&console[_0x16d6('0xd')](_0x16d6('0xe'),_0x18f732);}}(this));(function(){try{var _0x51f0f6=jQuery,_0x4c228d,_0x4107bc={'selector':'.qdDdcContainer','dropDown':{},'buyButton':{}};_0x51f0f6['QD_smartCart']=function(_0x540fde){var _0x1b12f1={};_0x4c228d=_0x51f0f6[_0x16d6('0x25')](!0x0,{},_0x4107bc,_0x540fde);_0x540fde=_0x51f0f6(_0x4c228d[_0x16d6('0xf2')])['QD_dropDownCart'](_0x4c228d[_0x16d6('0xf3')]);_0x1b12f1['buyButton']=_0x16d6('0xc')!==typeof _0x4c228d['dropDown'][_0x16d6('0x59')]&&!0x1===_0x4c228d['dropDown']['updateOnlyHover']?_0x51f0f6(_0x4c228d[_0x16d6('0xf2')])['QD_buyButton'](_0x540fde['fn'],_0x4c228d[_0x16d6('0xf4')]):_0x51f0f6(_0x4c228d['selector'])['QD_buyButton'](_0x4c228d[_0x16d6('0xf4')]);_0x1b12f1[_0x16d6('0xf3')]=_0x540fde;return _0x1b12f1;};_0x51f0f6['fn'][_0x16d6('0xf5')]=function(){_0x16d6('0x10')===typeof console&&_0x16d6('0x85')===typeof console[_0x16d6('0x11')]&&console[_0x16d6('0x11')](_0x16d6('0xf6'));};_0x51f0f6[_0x16d6('0xf5')]=_0x51f0f6['fn'][_0x16d6('0xf5')];}catch(_0x4ff246){_0x16d6('0xc')!==typeof console&&_0x16d6('0x85')===typeof console[_0x16d6('0xd')]&&console[_0x16d6('0xd')](_0x16d6('0xe'),_0x4ff246);}}());

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0xa9e0=['youtube','attr','click','contentWindow','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','start','insertThumbsIn','appendTo','trigger','QuatroDigital.pv_video_added','ajaxStop','load','ImageControl','.qd-videoLink','body','object','alerta','toLowerCase','warn','info','[Video\x20in\x20product]\x20','error','qdVideoInProduct','ul.thumbs','div#image','text','replace','split','length','indexOf','push','pop','shift','be/','<div\x20class=\x22qd-playerWrapper\x22></div>','prependTo','#include','wrap','<div\x20class=\x22qd-playerContainer\x22></div>','fromCharCode','join','toUpperCase','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','html','<iframe\x20src=\x22','urlProtocol','://www.youtube.com/embed/','?wmode=transparent&rel=0&enablejsapi=1&autoplay=','autoPlay','&mute=','mute','data','height','stop','fadeTo','addClass','qdpv-video-on','add','animate','iframe','find','a:not(\x27.qd-videoLink\x27)','bind','click.removeVideo','hide','removeAttr','style','removeClass','.qd-videoItem','call','string','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','click.playVideo','controlVideo','.qd-playerWrapper\x20iframe','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','rel'];(function(_0x1ae4ed,_0x44b54b){var _0x47d1f9=function(_0x1e70ca){while(--_0x1e70ca){_0x1ae4ed['push'](_0x1ae4ed['shift']());}};_0x47d1f9(++_0x44b54b);}(_0xa9e0,0x1a9));var _0x0a9e=function(_0x32eb81,_0x23e874){_0x32eb81=_0x32eb81-0x0;var _0x4e31ee=_0xa9e0[_0x32eb81];return _0x4e31ee;};(function(_0x4a3682){$(function(){if($(document[_0x0a9e('0x0')])['is']('.produto')){var _0x333808=[];var _0x432180=function(_0x2ab90b,_0x991246){_0x0a9e('0x1')===typeof console&&('undefined'!==typeof _0x991246&&_0x0a9e('0x2')===_0x991246[_0x0a9e('0x3')]()?console[_0x0a9e('0x4')]('[Video\x20in\x20product]\x20'+_0x2ab90b):'undefined'!==typeof _0x991246&&_0x0a9e('0x5')===_0x991246['toLowerCase']()?console['info'](_0x0a9e('0x6')+_0x2ab90b):console[_0x0a9e('0x7')](_0x0a9e('0x6')+_0x2ab90b));};window[_0x0a9e('0x8')]=window[_0x0a9e('0x8')]||{};var _0xbd1168=$['extend'](!0x0,{'insertThumbsIn':'start','videoFieldSelector':'td.value-field.Videos:first','controlVideo':!0x0,'urlProtocol':'http','autoPlay':0x0,'mute':0x0},window[_0x0a9e('0x8')]);var _0x36471c=$(_0x0a9e('0x9'));var _0x26d672=$(_0x0a9e('0xa'));var _0x69aeb7=$(_0xbd1168['videoFieldSelector'])[_0x0a9e('0xb')]()[_0x0a9e('0xc')](/;\s*/,';')[_0x0a9e('0xd')](';');for(var _0x281129=0x0;_0x281129<_0x69aeb7[_0x0a9e('0xe')];_0x281129++)-0x1<_0x69aeb7[_0x281129][_0x0a9e('0xf')]('youtube')?_0x333808[_0x0a9e('0x10')](_0x69aeb7[_0x281129]['split']('v=')[_0x0a9e('0x11')]()['split'](/[&#]/)[_0x0a9e('0x12')]()):-0x1<_0x69aeb7[_0x281129][_0x0a9e('0xf')]('youtu.be')&&_0x333808[_0x0a9e('0x10')](_0x69aeb7[_0x281129]['split'](_0x0a9e('0x13'))[_0x0a9e('0x11')]()[_0x0a9e('0xd')](/[\?&#]/)[_0x0a9e('0x12')]());var _0x31b1ca=$(_0x0a9e('0x14'));_0x31b1ca[_0x0a9e('0x15')](_0x0a9e('0x16'));_0x31b1ca[_0x0a9e('0x17')](_0x0a9e('0x18'));_0x69aeb7=function(_0x1c696a){var _0x105080={'s':'yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x2c3407){var _0x155cce=function(_0x53682f){return _0x53682f;};var _0x20f109=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2c3407=_0x2c3407['d'+_0x20f109[0x10]+'c'+_0x20f109[0x11]+'m'+_0x155cce(_0x20f109[0x1])+'n'+_0x20f109[0xd]]['l'+_0x20f109[0x12]+'c'+_0x20f109[0x0]+'ti'+_0x155cce('o')+'n'];var _0x5a09ef=function(_0x588269){return escape(encodeURIComponent(_0x588269[_0x0a9e('0xc')](/\./g,'¨')[_0x0a9e('0xc')](/[a-zA-Z]/g,function(_0x38e7c4){return String[_0x0a9e('0x19')](('Z'>=_0x38e7c4?0x5a:0x7a)>=(_0x38e7c4=_0x38e7c4['charCodeAt'](0x0)+0xd)?_0x38e7c4:_0x38e7c4-0x1a);})));};var _0xfb6e48=_0x5a09ef(_0x2c3407[[_0x20f109[0x9],_0x155cce('o'),_0x20f109[0xc],_0x20f109[_0x155cce(0xd)]][_0x0a9e('0x1a')]('')]);_0x5a09ef=_0x5a09ef((window[['js',_0x155cce('no'),'m',_0x20f109[0x1],_0x20f109[0x4][_0x0a9e('0x1b')](),_0x0a9e('0x1c')][_0x0a9e('0x1a')]('')]||_0x0a9e('0x1d'))+['.v',_0x20f109[0xd],'e',_0x155cce('x'),'co',_0x155cce('mm'),_0x0a9e('0x1e'),_0x20f109[0x1],'.c',_0x155cce('o'),'m.',_0x20f109[0x13],'r']['join'](''));for(var _0x59181e in _0x105080){if(_0x5a09ef===_0x59181e+_0x105080[_0x59181e]||_0xfb6e48===_0x59181e+_0x105080[_0x59181e]){var _0x197ec0='tr'+_0x20f109[0x11]+'e';break;}_0x197ec0='f'+_0x20f109[0x0]+'ls'+_0x155cce(_0x20f109[0x1])+'';}_0x155cce=!0x1;-0x1<_0x2c3407[[_0x20f109[0xc],'e',_0x20f109[0x0],'rc',_0x20f109[0x9]][_0x0a9e('0x1a')]('')][_0x0a9e('0xf')](_0x0a9e('0x1f'))&&(_0x155cce=!0x0);return[_0x197ec0,_0x155cce];}(_0x1c696a);}(window);if(!eval(_0x69aeb7[0x0]))return _0x69aeb7[0x1]?_0x432180('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x384319=function(_0x479bc4,_0x45a1e7){'youtube'===_0x45a1e7&&_0x31b1ca[_0x0a9e('0x20')](_0x0a9e('0x21')+_0xbd1168[_0x0a9e('0x22')]+_0x0a9e('0x23')+_0x479bc4+_0x0a9e('0x24')+_0xbd1168[_0x0a9e('0x25')]+_0x0a9e('0x26')+_0xbd1168[_0x0a9e('0x27')]+'\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>');_0x26d672[_0x0a9e('0x28')](_0x0a9e('0x29'),_0x26d672[_0x0a9e('0x28')](_0x0a9e('0x29'))||_0x26d672['height']());_0x26d672[_0x0a9e('0x2a')](!0x0,!0x0)[_0x0a9e('0x2b')](0x1f4,0x0,function(){$(_0x0a9e('0x0'))[_0x0a9e('0x2c')](_0x0a9e('0x2d'));});_0x31b1ca[_0x0a9e('0x2a')](!0x0,!0x0)[_0x0a9e('0x2b')](0x1f4,0x1,function(){_0x26d672[_0x0a9e('0x2e')](_0x31b1ca)[_0x0a9e('0x2f')]({'height':_0x31b1ca['find'](_0x0a9e('0x30'))['height']()},0x2bc);});};removePlayer=function(){_0x36471c[_0x0a9e('0x31')](_0x0a9e('0x32'))[_0x0a9e('0x33')](_0x0a9e('0x34'),function(){_0x31b1ca[_0x0a9e('0x2a')](!0x0,!0x0)['fadeTo'](0x1f4,0x0,function(){$(this)[_0x0a9e('0x35')]()[_0x0a9e('0x36')](_0x0a9e('0x37'));$(_0x0a9e('0x0'))[_0x0a9e('0x38')](_0x0a9e('0x2d'));});_0x26d672[_0x0a9e('0x2a')](!0x0,!0x0)[_0x0a9e('0x2b')](0x1f4,0x1,function(){var _0x5583a4=_0x26d672[_0x0a9e('0x28')]('height');_0x5583a4&&_0x26d672[_0x0a9e('0x2f')]({'height':_0x5583a4},0x2bc);});});};var _0x14b13f=function(){if(!_0x36471c[_0x0a9e('0x31')](_0x0a9e('0x39'))['length'])for(vId in removePlayer[_0x0a9e('0x3a')](this),_0x333808)if(_0x0a9e('0x3b')===typeof _0x333808[vId]&&''!==_0x333808[vId]){var _0x1fa90d=$(_0x0a9e('0x3c')+_0x333808[vId]+'/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27'+_0x333808[vId]+'\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/'+_0x333808[vId]+_0x0a9e('0x3d'));_0x1fa90d['find']('a')[_0x0a9e('0x33')](_0x0a9e('0x3e'),function(){var _0x381c37=$(this);_0x36471c[_0x0a9e('0x31')]('.ON')[_0x0a9e('0x38')]('ON');_0x381c37[_0x0a9e('0x2c')]('ON');0x1==_0xbd1168[_0x0a9e('0x3f')]?$('.qd-playerWrapper\x20iframe')[_0x0a9e('0xe')]?(_0x384319[_0x0a9e('0x3a')](this,'',''),$(_0x0a9e('0x40'))[0x0]['contentWindow']['postMessage'](_0x0a9e('0x41'),'*')):_0x384319[_0x0a9e('0x3a')](this,_0x381c37['attr'](_0x0a9e('0x42')),_0x0a9e('0x43')):_0x384319[_0x0a9e('0x3a')](this,_0x381c37[_0x0a9e('0x44')]('rel'),'youtube');return!0x1;});0x1==_0xbd1168[_0x0a9e('0x3f')]&&_0x36471c[_0x0a9e('0x31')]('a:not(.qd-videoLink)')[_0x0a9e('0x45')](function(_0x1dec2e){$(_0x0a9e('0x40'))['length']&&$(_0x0a9e('0x40'))[0x0][_0x0a9e('0x46')][_0x0a9e('0x47')](_0x0a9e('0x48'),'*');});_0x0a9e('0x49')===_0xbd1168[_0x0a9e('0x4a')]?_0x1fa90d[_0x0a9e('0x15')](_0x36471c):_0x1fa90d[_0x0a9e('0x4b')](_0x36471c);_0x1fa90d[_0x0a9e('0x4c')](_0x0a9e('0x4d'),[_0x333808[vId],_0x1fa90d]);}};$(document)[_0x0a9e('0x4e')](_0x14b13f);$(window)[_0x0a9e('0x4f')](_0x14b13f);(function(){var _0x1a7bce=this;var _0x11ca30=window[_0x0a9e('0x50')]||function(){};window['ImageControl']=function(_0x52628e,_0x473fdc){$(_0x52628e||'')['is'](_0x0a9e('0x51'))||(_0x11ca30[_0x0a9e('0x3a')](this,_0x52628e,_0x473fdc),_0x14b13f[_0x0a9e('0x3a')](_0x1a7bce));};}());}});}(this));

/* Automatizador de comments box do Facebook // Carlos Vinicius [Quatro Digital] */
/* Automatizador de comments box do Facebook // 1.6 // Carlos Vinicius [Quatro Digital] */
$(window).on("load QD_autoFaceComments",function(){if(window.QD_lazyFaceComments)
return;var fbComments=$(".fb-comments");if(fbComments.find('iframe').length)
return;if(fbComments.length)
fbComments.attr("data-href",document.location.href.split("#").shift().split("?").shift());if(!$("#fb-root").length)
$("body").append('<div id="fb-root"></div>');if(!$("script#facebook-jssdk").length){var fbAppId=$("meta[property='fb:app_id']").attr("content")||!1;(function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(d.getElementById(id))return;js=d.createElement(s);js.id=id;js.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+(fbAppId?"&appId="+fbAppId:"");fjs.parentNode.insertBefore(js,fjs)}(document,'script','facebook-jssdk'))}
if(typeof FB!=="undefined"&&typeof FB.XFBML!=="undefined")
FB.XFBML.parse()});

/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);
/* Quatro Digital - Smart Image Load // Carlos Vinicius // Todos os direitos reservados */
var _0xd902=['not','.qd-sil-on','img:visible','length','bottom','top','height','first','Problemas\x20:(\x20.\x20Detalhes:\x20','clone','qd-sil-image-loaded','sizes','width','addClass','qd-sil-image','insertAfter','closest','qd-sil-on','offset','push','each','QD_SIL_scrollRange','scroll','documentElement','scrollTop','body','trigger','QD_SIL_scroll','QD_smartImageLoad','function','replace','fromCharCode','charCodeAt','join','toUpperCase','ite','---','erc','indexOf','Quatro\x20Digital\x20-\x20Smart\x20Image\x20Load','object','undefined','error','info','unshift','alerta','aviso','toLowerCase','apply','warn','.qd_sil_img_wrapper','300','QD_SIL_scroll\x20QuatroDigital.is_Callback','find','imageWrapper'];(function(_0x5dadf5,_0x16f4af){var _0x1f32e7=function(_0x345025){while(--_0x345025){_0x5dadf5['push'](_0x5dadf5['shift']());}};_0x1f32e7(++_0x16f4af);}(_0xd902,0x166));var _0x2d90=function(_0x5a45af,_0x531bfe){_0x5a45af=_0x5a45af-0x0;var _0x173e8a=_0xd902[_0x5a45af];return _0x173e8a;};(function(_0x5345eb){'use strict';var _0x2a0e01=jQuery;if(typeof _0x2a0e01['fn'][_0x2d90('0x0')]===_0x2d90('0x1'))return;_0x2a0e01['fn'][_0x2d90('0x0')]=function(){};var _0x166527=function(_0x5574f2){var _0x3aae6c={'s':'yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x207b67){var _0x2e3c1c,_0xd47c6a,_0x6dc4f0,_0x48bf43;_0xd47c6a=function(_0x28f892){return _0x28f892;};_0x6dc4f0=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x207b67=_0x207b67['d'+_0x6dc4f0[0x10]+'c'+_0x6dc4f0[0x11]+'m'+_0xd47c6a(_0x6dc4f0[0x1])+'n'+_0x6dc4f0[0xd]]['l'+_0x6dc4f0[0x12]+'c'+_0x6dc4f0[0x0]+'ti'+_0xd47c6a('o')+'n'];_0x2e3c1c=function(_0xc3224d){return escape(encodeURIComponent(_0xc3224d['replace'](/\./g,'¨')[_0x2d90('0x2')](/[a-zA-Z]/g,function(_0x209590){return String[_0x2d90('0x3')](('Z'>=_0x209590?0x5a:0x7a)>=(_0x209590=_0x209590[_0x2d90('0x4')](0x0)+0xd)?_0x209590:_0x209590-0x1a);})));};var _0x9cb68a=_0x2e3c1c(_0x207b67[[_0x6dc4f0[0x9],_0xd47c6a('o'),_0x6dc4f0[0xc],_0x6dc4f0[_0xd47c6a(0xd)]][_0x2d90('0x5')]('')]);_0x2e3c1c=_0x2e3c1c((window[['js',_0xd47c6a('no'),'m',_0x6dc4f0[0x1],_0x6dc4f0[0x4][_0x2d90('0x6')](),_0x2d90('0x7')]['join']('')]||_0x2d90('0x8'))+['.v',_0x6dc4f0[0xd],'e',_0xd47c6a('x'),'co',_0xd47c6a('mm'),_0x2d90('0x9'),_0x6dc4f0[0x1],'.c',_0xd47c6a('o'),'m.',_0x6dc4f0[0x13],'r']['join'](''));for(var _0x4da93d in _0x3aae6c){if(_0x2e3c1c===_0x4da93d+_0x3aae6c[_0x4da93d]||_0x9cb68a===_0x4da93d+_0x3aae6c[_0x4da93d]){_0x48bf43='tr'+_0x6dc4f0[0x11]+'e';break;}_0x48bf43='f'+_0x6dc4f0[0x0]+'ls'+_0xd47c6a(_0x6dc4f0[0x1])+'';}_0xd47c6a=!0x1;-0x1<_0x207b67[[_0x6dc4f0[0xc],'e',_0x6dc4f0[0x0],'rc',_0x6dc4f0[0x9]][_0x2d90('0x5')]('')][_0x2d90('0xa')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0xd47c6a=!0x0);return[_0x48bf43,_0xd47c6a];}(_0x5574f2);}(window);if(!eval(_0x166527[0x0]))return _0x166527[0x1]?_0x1e2f06('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x5e30a2=_0x2d90('0xb');var _0x1e2f06=function(_0x40998a,_0x24864e){if(_0x2d90('0xc')===typeof console&&_0x2d90('0xd')!==typeof console[_0x2d90('0xe')]&&_0x2d90('0xd')!==typeof console[_0x2d90('0xf')]&&_0x2d90('0xd')!==typeof console['warn']){if(_0x2d90('0xc')==typeof _0x40998a&&_0x2d90('0x1')==typeof _0x40998a[_0x2d90('0x10')]){_0x40998a[_0x2d90('0x10')]('['+_0x5e30a2+']\x0a');var _0x962cf7=_0x40998a;}else _0x962cf7=['['+_0x5e30a2+']\x0a',_0x40998a];if(_0x2d90('0xd')==typeof _0x24864e||_0x2d90('0x11')!==_0x24864e['toLowerCase']()&&_0x2d90('0x12')!==_0x24864e['toLowerCase']())if(_0x2d90('0xd')!=typeof _0x24864e&&_0x2d90('0xf')==_0x24864e[_0x2d90('0x13')]())try{console['info']['apply'](console,_0x962cf7);}catch(_0x5e21de){try{console[_0x2d90('0xf')](_0x962cf7[_0x2d90('0x5')]('\x0a'));}catch(_0x3dab2d){}}else try{console[_0x2d90('0xe')][_0x2d90('0x14')](console,_0x962cf7);}catch(_0x5e0f75){try{console[_0x2d90('0xe')](_0x962cf7[_0x2d90('0x5')]('\x0a'));}catch(_0x562b2e){}}else try{console['warn'][_0x2d90('0x14')](console,_0x962cf7);}catch(_0x17cee7){try{console[_0x2d90('0x15')](_0x962cf7['join']('\x0a'));}catch(_0x11a50f){}}}};var _0x38ce15=/(ids\/[0-9]+-)[0-9-]+/i;var _0x97072c={'imageWrapper':_0x2d90('0x16'),'sizes':{'width':_0x2d90('0x17'),'height':_0x2d90('0x17')}};var _0x387eb7=function(_0x487c72,_0x7cdb87){'use strict';_0x570078();_0x2a0e01(window)['on'](_0x2d90('0x18'),_0x570078);function _0x570078(){try{var _0x16a0a4=_0x487c72[_0x2d90('0x19')](_0x7cdb87[_0x2d90('0x1a')])[_0x2d90('0x1b')](_0x2d90('0x1c'))[_0x2d90('0x19')](_0x2d90('0x1d'));if(!_0x16a0a4[_0x2d90('0x1e')])return;var _0x24d32f=_0x2a0e01(window);var _0x284e5d={'top':_0x24d32f['scrollTop']()};_0x284e5d[_0x2d90('0x1f')]=_0x284e5d[_0x2d90('0x20')]+_0x24d32f[_0x2d90('0x21')]();var _0x11cc1e=_0x16a0a4[_0x2d90('0x22')]()[_0x2d90('0x21')]();var _0x5f268e=_0x5ddd70(_0x16a0a4,_0x284e5d,_0x11cc1e);for(var _0x101f12=0x0;_0x101f12<_0x5f268e['length'];_0x101f12++)_0x1f7cb9(_0x2a0e01(_0x5f268e[_0x101f12]));}catch(_0x2f702e){typeof console!==_0x2d90('0xd')&&typeof console['error']===_0x2d90('0x1')&&console[_0x2d90('0xe')](_0x2d90('0x23'),_0x2f702e);}}function _0x1f7cb9(_0x18c63d){var _0x3134bb=_0x18c63d[_0x2d90('0x24')]();_0x3134bb['on']('load',function(){_0x2a0e01(this)['addClass'](_0x2d90('0x25'));});_0x3134bb['attr']({'src':_0x3134bb[0x0]['src'][_0x2d90('0x2')](_0x38ce15,'$1'+_0x7cdb87[_0x2d90('0x26')][_0x2d90('0x27')]+'-'+_0x7cdb87[_0x2d90('0x26')]['height']),'width':_0x7cdb87[_0x2d90('0x26')][_0x2d90('0x27')],'height':_0x7cdb87[_0x2d90('0x26')][_0x2d90('0x21')]});_0x3134bb[_0x2d90('0x28')](_0x2d90('0x29'))[_0x2d90('0x2a')](_0x18c63d);_0x3134bb[_0x2d90('0x2b')](_0x7cdb87['imageWrapper'])[_0x2d90('0x28')](_0x2d90('0x2c'));}function _0x5ddd70(_0x1da456,_0x59b828,_0x391a84){var _0x53b4e4;var _0xf02cbf=[];for(var _0x251391=0x0;_0x251391<_0x1da456[_0x2d90('0x1e')];_0x251391++){_0x53b4e4=_0x2a0e01(_0x1da456[_0x251391])[_0x2d90('0x2d')]();_0x53b4e4[_0x2d90('0x1f')]=_0x53b4e4[_0x2d90('0x20')]+_0x391a84;if(!(_0x59b828[_0x2d90('0x1f')]<_0x53b4e4[_0x2d90('0x20')]||_0x59b828[_0x2d90('0x20')]>_0x53b4e4[_0x2d90('0x1f')])){_0xf02cbf[_0x2d90('0x2e')](_0x1da456[_0x251391]);}}return _0xf02cbf;};};_0x2a0e01['fn']['QD_smartImageLoad']=function(_0x3a265c){var _0x3ee229=_0x2a0e01(this);if(!_0x3ee229[_0x2d90('0x1e')])return _0x3ee229;_0x3ee229[_0x2d90('0x2f')](function(){var _0x53c49c=_0x2a0e01(this);_0x53c49c[_0x2d90('0x0')]=new _0x387eb7(_0x53c49c,_0x2a0e01['extend']({},_0x97072c,_0x3a265c));});return _0x3ee229;};window[_0x2d90('0x30')]=0x28;var _0x35b1e4=QD_SIL_scrollRange;var _0x327573=0x0;_0x2a0e01(window)['on'](_0x2d90('0x31'),function(){var _0x2e01ff=document[_0x2d90('0x32')][_0x2d90('0x33')]||document[_0x2d90('0x34')][_0x2d90('0x33')];if(_0x2e01ff>_0x327573+_0x35b1e4||_0x2e01ff<_0x327573-_0x35b1e4){_0x2a0e01(window)[_0x2d90('0x35')](_0x2d90('0x36'));_0x327573=_0x2e01ff;}});}(this));