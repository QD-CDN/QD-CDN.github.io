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
var _0x5563=['toLowerCase','info','apply','warn','qd-ssa-sku-no-selected','qd-ssa-sku-selected','SkuSellersInformation','data-qd-ssa-qtt','each','find','[data-qd-ssa-text]','hide','removeClass','qd-ssa-show','[data-qd-ssa-text=\x22','filter','[data-qd-ssa-text=\x22default\x22]','addClass','qd-ssa-hide','html','#qtt','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','length','qd-ssa-on','skus','split','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','message','sku','AvailableQuantity','trigger','QuatroDigital.ssa.prodUnavailable','off','qd-ssa-sku-prod-unavailable','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','join','toUpperCase','---','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','initialSkuSelected','QuatroDigital.ssa.skuSelected','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','unavailable','vtex.sku.selected.QD','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','available','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','qdAjax','qdAjaxQueue','extend','url','opts','push','success','call','error','complete','parameters','callbackFns','boolean','successPopulated','errorPopulated','completePopulated','object','clearQueueDelay','jqXHR','undefined','readyState','textStatus','errorThrown','version','2.1','/produto/sku/','function','QD_smartStockAvailable','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','alerta','aviso'];(function(_0x360b0c,_0x33ba7f){var _0x14c443=function(_0x370b22){while(--_0x370b22){_0x360b0c['push'](_0x360b0c['shift']());}};_0x14c443(++_0x33ba7f);}(_0x5563,0x8a));var _0x3556=function(_0x1cd715,_0x302b52){_0x1cd715=_0x1cd715-0x0;var _0x583e6b=_0x5563[_0x1cd715];return _0x583e6b;};(function(_0x37507c){if('function'!==typeof _0x37507c[_0x3556('0x0')]){var _0x4e4ebb={};_0x37507c[_0x3556('0x1')]=_0x4e4ebb;_0x37507c[_0x3556('0x0')]=function(_0x991204){var _0xc8820=_0x37507c[_0x3556('0x2')]({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x991204);var _0x452333=escape(encodeURIComponent(_0xc8820[_0x3556('0x3')]));_0x4e4ebb[_0x452333]=_0x4e4ebb[_0x452333]||{};_0x4e4ebb[_0x452333][_0x3556('0x4')]=_0x4e4ebb[_0x452333][_0x3556('0x4')]||[];_0x4e4ebb[_0x452333]['opts'][_0x3556('0x5')]({'success':function(_0x471cdf,_0x402e36,_0x3aea13){_0xc8820[_0x3556('0x6')][_0x3556('0x7')](this,_0x471cdf,_0x402e36,_0x3aea13);},'error':function(_0x2f3f01,_0x2b2127,_0x3261fa){_0xc8820[_0x3556('0x8')][_0x3556('0x7')](this,_0x2f3f01,_0x2b2127,_0x3261fa);},'complete':function(_0x4ebbaf,_0x389b61){_0xc8820[_0x3556('0x9')][_0x3556('0x7')](this,_0x4ebbaf,_0x389b61);}});_0x4e4ebb[_0x452333][_0x3556('0xa')]=_0x4e4ebb[_0x452333][_0x3556('0xa')]||{'success':{},'error':{},'complete':{}};_0x4e4ebb[_0x452333]['callbackFns']=_0x4e4ebb[_0x452333][_0x3556('0xb')]||{};_0x4e4ebb[_0x452333][_0x3556('0xb')]['successPopulated']=_0x3556('0xc')===typeof _0x4e4ebb[_0x452333]['callbackFns'][_0x3556('0xd')]?_0x4e4ebb[_0x452333][_0x3556('0xb')][_0x3556('0xd')]:!0x1;_0x4e4ebb[_0x452333][_0x3556('0xb')][_0x3556('0xe')]='boolean'===typeof _0x4e4ebb[_0x452333][_0x3556('0xb')][_0x3556('0xe')]?_0x4e4ebb[_0x452333][_0x3556('0xb')][_0x3556('0xe')]:!0x1;_0x4e4ebb[_0x452333][_0x3556('0xb')][_0x3556('0xf')]=_0x3556('0xc')===typeof _0x4e4ebb[_0x452333]['callbackFns'][_0x3556('0xf')]?_0x4e4ebb[_0x452333][_0x3556('0xb')][_0x3556('0xf')]:!0x1;_0x991204=_0x37507c[_0x3556('0x2')]({},_0xc8820,{'success':function(_0x5335ad,_0x33da86,_0xc62400){_0x4e4ebb[_0x452333][_0x3556('0xa')]['success']={'data':_0x5335ad,'textStatus':_0x33da86,'jqXHR':_0xc62400};_0x4e4ebb[_0x452333][_0x3556('0xb')]['successPopulated']=!0x0;for(var _0x44b4af in _0x4e4ebb[_0x452333][_0x3556('0x4')])_0x3556('0x10')===typeof _0x4e4ebb[_0x452333][_0x3556('0x4')][_0x44b4af]&&(_0x4e4ebb[_0x452333]['opts'][_0x44b4af][_0x3556('0x6')][_0x3556('0x7')](this,_0x5335ad,_0x33da86,_0xc62400),_0x4e4ebb[_0x452333][_0x3556('0x4')][_0x44b4af][_0x3556('0x6')]=function(){});},'error':function(_0x4ea0d0,_0x7bb76e,_0x58746b){_0x4e4ebb[_0x452333]['parameters'][_0x3556('0x8')]={'errorThrown':_0x58746b,'textStatus':_0x7bb76e,'jqXHR':_0x4ea0d0};_0x4e4ebb[_0x452333][_0x3556('0xb')][_0x3556('0xe')]=!0x0;for(var _0x522994 in _0x4e4ebb[_0x452333][_0x3556('0x4')])_0x3556('0x10')===typeof _0x4e4ebb[_0x452333][_0x3556('0x4')][_0x522994]&&(_0x4e4ebb[_0x452333][_0x3556('0x4')][_0x522994]['error'][_0x3556('0x7')](this,_0x4ea0d0,_0x7bb76e,_0x58746b),_0x4e4ebb[_0x452333][_0x3556('0x4')][_0x522994]['error']=function(){});},'complete':function(_0x1fec27,_0x5c7c67){_0x4e4ebb[_0x452333][_0x3556('0xa')][_0x3556('0x9')]={'textStatus':_0x5c7c67,'jqXHR':_0x1fec27};_0x4e4ebb[_0x452333]['callbackFns']['completePopulated']=!0x0;for(var _0x2c564f in _0x4e4ebb[_0x452333]['opts'])'object'===typeof _0x4e4ebb[_0x452333][_0x3556('0x4')][_0x2c564f]&&(_0x4e4ebb[_0x452333][_0x3556('0x4')][_0x2c564f][_0x3556('0x9')]['call'](this,_0x1fec27,_0x5c7c67),_0x4e4ebb[_0x452333]['opts'][_0x2c564f]['complete']=function(){});isNaN(parseInt(_0xc8820[_0x3556('0x11')]))||setTimeout(function(){_0x4e4ebb[_0x452333][_0x3556('0x12')]=void 0x0;_0x4e4ebb[_0x452333][_0x3556('0x4')]=void 0x0;_0x4e4ebb[_0x452333]['parameters']=void 0x0;_0x4e4ebb[_0x452333][_0x3556('0xb')]=void 0x0;},_0xc8820[_0x3556('0x11')]);}});_0x3556('0x13')===typeof _0x4e4ebb[_0x452333][_0x3556('0x12')]?_0x4e4ebb[_0x452333][_0x3556('0x12')]=_0x37507c['ajax'](_0x991204):_0x4e4ebb[_0x452333][_0x3556('0x12')]&&_0x4e4ebb[_0x452333][_0x3556('0x12')][_0x3556('0x14')]&&0x4==_0x4e4ebb[_0x452333]['jqXHR'][_0x3556('0x14')]&&(_0x4e4ebb[_0x452333][_0x3556('0xb')][_0x3556('0xd')]&&_0x991204[_0x3556('0x6')](_0x4e4ebb[_0x452333][_0x3556('0xa')][_0x3556('0x6')]['data'],_0x4e4ebb[_0x452333][_0x3556('0xa')]['success'][_0x3556('0x15')],_0x4e4ebb[_0x452333][_0x3556('0xa')][_0x3556('0x6')][_0x3556('0x12')]),_0x4e4ebb[_0x452333][_0x3556('0xb')][_0x3556('0xe')]&&_0x991204[_0x3556('0x8')](_0x4e4ebb[_0x452333]['parameters'][_0x3556('0x8')][_0x3556('0x12')],_0x4e4ebb[_0x452333][_0x3556('0xa')][_0x3556('0x8')]['textStatus'],_0x4e4ebb[_0x452333][_0x3556('0xa')][_0x3556('0x8')][_0x3556('0x16')]),_0x4e4ebb[_0x452333]['callbackFns'][_0x3556('0xf')]&&_0x991204['complete'](_0x4e4ebb[_0x452333][_0x3556('0xa')]['complete'][_0x3556('0x12')],_0x4e4ebb[_0x452333][_0x3556('0xa')]['complete'][_0x3556('0x15')]));};_0x37507c[_0x3556('0x0')][_0x3556('0x17')]=_0x3556('0x18');}}(jQuery));(function(_0x4b25ac){function _0x2daf02(_0x150091,_0x31b042){_0x5ac22b[_0x3556('0x0')]({'url':_0x3556('0x19')+_0x150091,'clearQueueDelay':null,'success':_0x31b042,'error':function(){_0x189050('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!');}});}var _0x5ac22b=jQuery;if(_0x3556('0x1a')!==typeof _0x5ac22b['fn'][_0x3556('0x1b')]){var _0x189050=function(_0x2b02a3,_0x2c115b){if(_0x3556('0x10')===typeof console){var _0x3b1a77;_0x3556('0x10')===typeof _0x2b02a3?(_0x2b02a3[_0x3556('0x1c')](_0x3556('0x1d')),_0x3b1a77=_0x2b02a3):_0x3b1a77=['[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a'+_0x2b02a3];_0x3556('0x13')===typeof _0x2c115b||_0x3556('0x1e')!==_0x2c115b['toLowerCase']()&&_0x3556('0x1f')!==_0x2c115b[_0x3556('0x20')]()?'undefined'!==typeof _0x2c115b&&'info'===_0x2c115b[_0x3556('0x20')]()?console[_0x3556('0x21')][_0x3556('0x22')](console,_0x3b1a77):console[_0x3556('0x8')][_0x3556('0x22')](console,_0x3b1a77):console[_0x3556('0x23')][_0x3556('0x22')](console,_0x3b1a77);}},_0x304632={},_0xe2d455=function(_0x2013a9,_0x24706f){function _0x5e167d(_0x1b3ec0){try{_0x2013a9['removeClass'](_0x3556('0x24'))['addClass'](_0x3556('0x25'));var _0x1e44ed=_0x1b3ec0[0x0][_0x3556('0x26')][0x0]['AvailableQuantity'];_0x2013a9['attr'](_0x3556('0x27'),_0x1e44ed);_0x2013a9[_0x3556('0x28')](function(){var _0x2013a9=_0x5ac22b(this)[_0x3556('0x29')](_0x3556('0x2a'));if(0x1>_0x1e44ed)return _0x2013a9[_0x3556('0x2b')]()['addClass']('qd-ssa-hide')[_0x3556('0x2c')](_0x3556('0x2d'));var _0x1b3ec0=_0x2013a9['filter'](_0x3556('0x2e')+_0x1e44ed+'\x22]');_0x1b3ec0=_0x1b3ec0['length']?_0x1b3ec0:_0x2013a9[_0x3556('0x2f')](_0x3556('0x30'));_0x2013a9[_0x3556('0x2b')]()[_0x3556('0x31')](_0x3556('0x32'))['removeClass'](_0x3556('0x2d'));_0x1b3ec0[_0x3556('0x33')]((_0x1b3ec0[_0x3556('0x33')]()||'')['replace'](_0x3556('0x34'),_0x1e44ed));_0x1b3ec0['show']()['addClass'](_0x3556('0x2d'))[_0x3556('0x2c')](_0x3556('0x32'));});}catch(_0x51e191){_0x189050([_0x3556('0x35'),_0x51e191['message']]);}}if(_0x2013a9[_0x3556('0x36')]){_0x2013a9[_0x3556('0x31')](_0x3556('0x37'));_0x2013a9[_0x3556('0x31')]('qd-ssa-sku-no-selected');try{_0x2013a9['addClass']('qd-ssa-skus-'+vtxctx[_0x3556('0x38')][_0x3556('0x39')](';')[_0x3556('0x36')]);}catch(_0x4e8ad9){_0x189050([_0x3556('0x3a'),_0x4e8ad9[_0x3556('0x3b')]]);}_0x5ac22b(window)['on']('vtex.sku.selected\x20QuatroDigital.ssa.skuSelected',function(_0x6be979,_0x4b5e4b,_0x2ba4da){try{_0x2daf02(_0x2ba4da[_0x3556('0x3c')],function(_0x78fa1d){_0x5e167d(_0x78fa1d);0x1===vtxctx[_0x3556('0x38')][_0x3556('0x39')](';')[_0x3556('0x36')]&&0x0==_0x78fa1d[0x0][_0x3556('0x26')][0x0][_0x3556('0x3d')]&&_0x5ac22b(window)[_0x3556('0x3e')](_0x3556('0x3f'));});}catch(_0x2990b1){_0x189050(['Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20',_0x2990b1[_0x3556('0x3b')]]);}});_0x5ac22b(window)[_0x3556('0x40')]('vtex.sku.selected.QD');_0x5ac22b(window)['on']('QuatroDigital.ssa.prodUnavailable',function(){_0x2013a9[_0x3556('0x31')](_0x3556('0x41'))[_0x3556('0x2b')]();});}};_0x4b25ac=function(_0x34542c){var _0x3b3d2e={'s':_0x3556('0x42')};return function(_0x219343){var _0x48b331=function(_0x3e8adf){return _0x3e8adf;};var _0x3221e5=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x219343=_0x219343['d'+_0x3221e5[0x10]+'c'+_0x3221e5[0x11]+'m'+_0x48b331(_0x3221e5[0x1])+'n'+_0x3221e5[0xd]]['l'+_0x3221e5[0x12]+'c'+_0x3221e5[0x0]+'ti'+_0x48b331('o')+'n'];var _0x25505a=function(_0x460fb0){return escape(encodeURIComponent(_0x460fb0['replace'](/\./g,'¨')[_0x3556('0x43')](/[a-zA-Z]/g,function(_0x31388d){return String[_0x3556('0x44')](('Z'>=_0x31388d?0x5a:0x7a)>=(_0x31388d=_0x31388d[_0x3556('0x45')](0x0)+0xd)?_0x31388d:_0x31388d-0x1a);})));};var _0x3cfdc1=_0x25505a(_0x219343[[_0x3221e5[0x9],_0x48b331('o'),_0x3221e5[0xc],_0x3221e5[_0x48b331(0xd)]][_0x3556('0x46')]('')]);_0x25505a=_0x25505a((window[['js',_0x48b331('no'),'m',_0x3221e5[0x1],_0x3221e5[0x4][_0x3556('0x47')](),'ite'][_0x3556('0x46')]('')]||_0x3556('0x48'))+['.v',_0x3221e5[0xd],'e',_0x48b331('x'),'co',_0x48b331('mm'),'erc',_0x3221e5[0x1],'.c',_0x48b331('o'),'m.',_0x3221e5[0x13],'r'][_0x3556('0x46')](''));for(var _0x4dcdef in _0x3b3d2e){if(_0x25505a===_0x4dcdef+_0x3b3d2e[_0x4dcdef]||_0x3cfdc1===_0x4dcdef+_0x3b3d2e[_0x4dcdef]){var _0x18969c='tr'+_0x3221e5[0x11]+'e';break;}_0x18969c='f'+_0x3221e5[0x0]+'ls'+_0x48b331(_0x3221e5[0x1])+'';}_0x48b331=!0x1;-0x1<_0x219343[[_0x3221e5[0xc],'e',_0x3221e5[0x0],'rc',_0x3221e5[0x9]]['join']('')][_0x3556('0x49')](_0x3556('0x4a'))&&(_0x48b331=!0x0);return[_0x18969c,_0x48b331];}(_0x34542c);}(window);if(!eval(_0x4b25ac[0x0]))return _0x4b25ac[0x1]?_0x189050(_0x3556('0x4b')):!0x1;_0x5ac22b['fn'][_0x3556('0x1b')]=function(_0x430990){var _0x54b313=_0x5ac22b(this);_0x430990=_0x5ac22b[_0x3556('0x2')](!0x0,{},_0x304632,_0x430990);_0x54b313['qdPlugin']=new _0xe2d455(_0x54b313,_0x430990);try{_0x3556('0x10')===typeof _0x5ac22b['fn'][_0x3556('0x1b')][_0x3556('0x4c')]&&_0x5ac22b(window)[_0x3556('0x3e')](_0x3556('0x4d'),[_0x5ac22b['fn']['QD_smartStockAvailable'][_0x3556('0x4c')]['prod'],_0x5ac22b['fn'][_0x3556('0x1b')][_0x3556('0x4c')][_0x3556('0x3c')]]);}catch(_0x3d224a){_0x189050([_0x3556('0x4e'),_0x3d224a[_0x3556('0x3b')]]);}_0x5ac22b['fn'][_0x3556('0x1b')][_0x3556('0x4f')]&&_0x5ac22b(window)[_0x3556('0x3e')](_0x3556('0x3f'));return _0x54b313;};_0x5ac22b(window)['on'](_0x3556('0x50'),function(_0x4ce4dd,_0x8ae2e8,_0x37edd9){try{_0x5ac22b['fn'][_0x3556('0x1b')][_0x3556('0x4c')]={'prod':_0x8ae2e8,'sku':_0x37edd9},_0x5ac22b(this)[_0x3556('0x40')](_0x4ce4dd);}catch(_0x379cab){_0x189050([_0x3556('0x51'),_0x379cab[_0x3556('0x3b')]]);}});_0x5ac22b(window)['on'](_0x3556('0x52'),function(_0x3a3102,_0x6bd0a0,_0x3441d7){try{for(var _0x1f5048=_0x3441d7[_0x3556('0x36')],_0x4f8dd8=_0x6bd0a0=0x0;_0x4f8dd8<_0x1f5048&&!_0x3441d7[_0x4f8dd8][_0x3556('0x53')];_0x4f8dd8++)_0x6bd0a0+=0x1;_0x1f5048<=_0x6bd0a0&&(_0x5ac22b['fn'][_0x3556('0x1b')][_0x3556('0x4f')]=!0x0);_0x5ac22b(this)[_0x3556('0x40')](_0x3a3102);}catch(_0x2e5b88){_0x189050([_0x3556('0x54'),_0x2e5b88[_0x3556('0x3b')]]);}});_0x5ac22b(function(){_0x5ac22b('.qd_smart_stock_available_auto')[_0x3556('0x1b')]();});}}(window));
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
var _0x2458=['add','-li','trigger','QuatroDigital.am.callback','extend','exec','.qd_amazing_menu_auto','getParent','QD_amazingMenu','/qd-amazing-menu','object','undefined','error','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','toLowerCase','aviso','info','apply','join','qdAmAddNdx','each','addClass','first','last','qd-am-last','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','.qd-am-banner','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','html','img[alt=\x27','attr','.box-banner','clone','qd-am-content-loaded','text','trim','[class*=\x27colunas\x27]','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','url','\x27\x20falho.','call','QuatroDigital.am.ajaxCallback','ul[itemscope]','alerta','li\x20>ul','qd-am-has-ul',':not(ul)','>li','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','children'];(function(_0x3fe83c,_0x1c9bed){var _0x5a896e=function(_0x154cf1){while(--_0x154cf1){_0x3fe83c['push'](_0x3fe83c['shift']());}};_0x5a896e(++_0x1c9bed);}(_0x2458,0x127));var _0x8245=function(_0x405686,_0x34c4e6){_0x405686=_0x405686-0x0;var _0x554d8a=_0x2458[_0x405686];return _0x554d8a;};(function(_0x51e4bb){_0x51e4bb['fn'][_0x8245('0x0')]=_0x51e4bb['fn']['closest'];}(jQuery));(function(_0x27504c){var _0x2a40d6;var _0x5864aa=jQuery;if('function'!==typeof _0x5864aa['fn'][_0x8245('0x1')]){var _0x2ffb52={'url':_0x8245('0x2'),'callback':function(){},'ajaxCallback':function(){}};var _0x26c8a7=function(_0x2d94e9,_0x47aea0){if(_0x8245('0x3')===typeof console&&_0x8245('0x4')!==typeof console[_0x8245('0x5')]&&_0x8245('0x4')!==typeof console['info']&&'undefined'!==typeof console[_0x8245('0x6')]){var _0x1c6460;_0x8245('0x3')===typeof _0x2d94e9?(_0x2d94e9[_0x8245('0x7')]('[QD\x20Amazing\x20Menu]\x0a'),_0x1c6460=_0x2d94e9):_0x1c6460=[_0x8245('0x8')+_0x2d94e9];if(_0x8245('0x4')===typeof _0x47aea0||'alerta'!==_0x47aea0[_0x8245('0x9')]()&&_0x8245('0xa')!==_0x47aea0['toLowerCase']())if('undefined'!==typeof _0x47aea0&&'info'===_0x47aea0['toLowerCase']())try{console[_0x8245('0xb')][_0x8245('0xc')](console,_0x1c6460);}catch(_0x188f13){try{console['info'](_0x1c6460[_0x8245('0xd')]('\x0a'));}catch(_0x170488){}}else try{console['error']['apply'](console,_0x1c6460);}catch(_0x579f1d){try{console[_0x8245('0x5')](_0x1c6460[_0x8245('0xd')]('\x0a'));}catch(_0x1608d9){}}else try{console[_0x8245('0x6')]['apply'](console,_0x1c6460);}catch(_0x5ea182){try{console[_0x8245('0x6')](_0x1c6460[_0x8245('0xd')]('\x0a'));}catch(_0x1f49aa){}}}};_0x5864aa['fn'][_0x8245('0xe')]=function(){var _0x4ddcb3=_0x5864aa(this);_0x4ddcb3[_0x8245('0xf')](function(_0x5ceb14){_0x5864aa(this)[_0x8245('0x10')]('qd-am-li-'+_0x5ceb14);});_0x4ddcb3[_0x8245('0x11')]()[_0x8245('0x10')]('qd-am-first');_0x4ddcb3[_0x8245('0x12')]()['addClass'](_0x8245('0x13'));return _0x4ddcb3;};_0x5864aa['fn'][_0x8245('0x1')]=function(){};_0x27504c=function(_0x773e19){var _0x5561e8={'s':_0x8245('0x14')};return function(_0x2ef906){var _0x1afc29=function(_0x24f9f4){return _0x24f9f4;};var _0x27d399=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2ef906=_0x2ef906['d'+_0x27d399[0x10]+'c'+_0x27d399[0x11]+'m'+_0x1afc29(_0x27d399[0x1])+'n'+_0x27d399[0xd]]['l'+_0x27d399[0x12]+'c'+_0x27d399[0x0]+'ti'+_0x1afc29('o')+'n'];var _0xab3cdf=function(_0x5f1d03){return escape(encodeURIComponent(_0x5f1d03[_0x8245('0x15')](/\./g,'¨')[_0x8245('0x15')](/[a-zA-Z]/g,function(_0xc92d68){return String[_0x8245('0x16')](('Z'>=_0xc92d68?0x5a:0x7a)>=(_0xc92d68=_0xc92d68[_0x8245('0x17')](0x0)+0xd)?_0xc92d68:_0xc92d68-0x1a);})));};var _0x5b7c8d=_0xab3cdf(_0x2ef906[[_0x27d399[0x9],_0x1afc29('o'),_0x27d399[0xc],_0x27d399[_0x1afc29(0xd)]][_0x8245('0xd')]('')]);_0xab3cdf=_0xab3cdf((window[['js',_0x1afc29('no'),'m',_0x27d399[0x1],_0x27d399[0x4][_0x8245('0x18')](),_0x8245('0x19')]['join']('')]||_0x8245('0x1a'))+['.v',_0x27d399[0xd],'e',_0x1afc29('x'),'co',_0x1afc29('mm'),_0x8245('0x1b'),_0x27d399[0x1],'.c',_0x1afc29('o'),'m.',_0x27d399[0x13],'r'][_0x8245('0xd')](''));for(var _0x509ec3 in _0x5561e8){if(_0xab3cdf===_0x509ec3+_0x5561e8[_0x509ec3]||_0x5b7c8d===_0x509ec3+_0x5561e8[_0x509ec3]){var _0x47a5b='tr'+_0x27d399[0x11]+'e';break;}_0x47a5b='f'+_0x27d399[0x0]+'ls'+_0x1afc29(_0x27d399[0x1])+'';}_0x1afc29=!0x1;-0x1<_0x2ef906[[_0x27d399[0xc],'e',_0x27d399[0x0],'rc',_0x27d399[0x9]][_0x8245('0xd')]('')][_0x8245('0x1c')](_0x8245('0x1d'))&&(_0x1afc29=!0x0);return[_0x47a5b,_0x1afc29];}(_0x773e19);}(window);if(!eval(_0x27504c[0x0]))return _0x27504c[0x1]?_0x26c8a7(_0x8245('0x1e')):!0x1;var _0x33d078=function(_0x623a3e){var _0x1ff41f=_0x623a3e[_0x8245('0x1f')](_0x8245('0x20'));var _0x167aad=_0x1ff41f[_0x8245('0x21')](_0x8245('0x22'));var _0x1dd62f=_0x1ff41f['filter']('.qd-am-collection');if(_0x167aad[_0x8245('0x23')]||_0x1dd62f[_0x8245('0x23')])_0x167aad[_0x8245('0x24')]()[_0x8245('0x10')](_0x8245('0x25')),_0x1dd62f[_0x8245('0x24')]()[_0x8245('0x10')](_0x8245('0x26')),_0x5864aa[_0x8245('0x27')]({'url':_0x2a40d6['url'],'dataType':_0x8245('0x28'),'success':function(_0x483b15){var _0x58c8d7=_0x5864aa(_0x483b15);_0x167aad['each'](function(){var _0x483b15=_0x5864aa(this);var _0x123e78=_0x58c8d7['find'](_0x8245('0x29')+_0x483b15[_0x8245('0x2a')]('data-qdam-value')+'\x27]');_0x123e78['length']&&(_0x123e78[_0x8245('0xf')](function(){_0x5864aa(this)[_0x8245('0x0')](_0x8245('0x2b'))[_0x8245('0x2c')]()['insertBefore'](_0x483b15);}),_0x483b15['hide']());})[_0x8245('0x10')](_0x8245('0x2d'));_0x1dd62f[_0x8245('0xf')](function(){var _0x483b15={};var _0xaf0f4d=_0x5864aa(this);_0x58c8d7[_0x8245('0x1f')]('h2')[_0x8245('0xf')](function(){if(_0x5864aa(this)[_0x8245('0x2e')]()[_0x8245('0x2f')]()['toLowerCase']()==_0xaf0f4d[_0x8245('0x2a')]('data-qdam-value')[_0x8245('0x2f')]()[_0x8245('0x9')]())return _0x483b15=_0x5864aa(this),!0x1;});_0x483b15[_0x8245('0x23')]&&(_0x483b15[_0x8245('0xf')](function(){_0x5864aa(this)[_0x8245('0x0')](_0x8245('0x30'))[_0x8245('0x2c')]()['insertBefore'](_0xaf0f4d);}),_0xaf0f4d['hide']());})[_0x8245('0x10')]('qd-am-content-loaded');},'error':function(){_0x26c8a7(_0x8245('0x31')+_0x2a40d6[_0x8245('0x32')]+_0x8245('0x33'));},'complete':function(){_0x2a40d6['ajaxCallback'][_0x8245('0x34')](this);_0x5864aa(window)['trigger'](_0x8245('0x35'),_0x623a3e);},'clearQueueDelay':0xbb8});};_0x5864aa[_0x8245('0x1')]=function(_0x5f3a02){var _0x5cf454=_0x5f3a02[_0x8245('0x1f')](_0x8245('0x36'))[_0x8245('0xf')](function(){var _0x132a12=_0x5864aa(this);if(!_0x132a12[_0x8245('0x23')])return _0x26c8a7(['UL\x20do\x20menu\x20não\x20encontrada',_0x5f3a02],_0x8245('0x37'));_0x132a12[_0x8245('0x1f')](_0x8245('0x38'))[_0x8245('0x24')]()['addClass'](_0x8245('0x39'));_0x132a12['find']('li')[_0x8245('0xf')](function(){var _0x1b100b=_0x5864aa(this);var _0x369267=_0x1b100b['children'](_0x8245('0x3a'));_0x369267[_0x8245('0x23')]&&_0x1b100b['addClass']('qd-am-elem-'+_0x369267[_0x8245('0x11')]()[_0x8245('0x2e')]()['trim']()['replaceSpecialChars']()[_0x8245('0x15')](/\./g,'')[_0x8245('0x15')](/\s/g,'-')['toLowerCase']());});var _0x1cba5e=_0x132a12[_0x8245('0x1f')](_0x8245('0x3b'))[_0x8245('0xe')]();_0x132a12[_0x8245('0x10')]('qd-amazing-menu');_0x1cba5e=_0x1cba5e[_0x8245('0x1f')](_0x8245('0x3c'));_0x1cba5e['each'](function(){var _0x5d4084=_0x5864aa(this);_0x5d4084[_0x8245('0x1f')]('>li')[_0x8245('0xe')]()[_0x8245('0x10')](_0x8245('0x3d'));_0x5d4084['addClass'](_0x8245('0x3e'));_0x5d4084[_0x8245('0x24')]()[_0x8245('0x10')](_0x8245('0x3f'));});_0x1cba5e['addClass'](_0x8245('0x3f'));var _0x3953d0=0x0,_0x27504c=function(_0x2020dd){_0x3953d0+=0x1;_0x2020dd=_0x2020dd[_0x8245('0x40')]('li')[_0x8245('0x40')]('*');_0x2020dd[_0x8245('0x23')]&&(_0x2020dd[_0x8245('0x10')]('qd-am-level-'+_0x3953d0),_0x27504c(_0x2020dd));};_0x27504c(_0x132a12);_0x132a12[_0x8245('0x41')](_0x132a12[_0x8245('0x1f')]('ul'))['each'](function(){var _0x1711f6=_0x5864aa(this);_0x1711f6['addClass']('qd-am-'+_0x1711f6[_0x8245('0x40')]('li')[_0x8245('0x23')]+_0x8245('0x42'));});});_0x33d078(_0x5cf454);_0x2a40d6['callback'][_0x8245('0x34')](this);_0x5864aa(window)[_0x8245('0x43')](_0x8245('0x44'),_0x5f3a02);};_0x5864aa['fn'][_0x8245('0x1')]=function(_0x280ce4){var _0x2f64d2=_0x5864aa(this);if(!_0x2f64d2['length'])return _0x2f64d2;_0x2a40d6=_0x5864aa[_0x8245('0x45')]({},_0x2ffb52,_0x280ce4);_0x2f64d2[_0x8245('0x46')]=new _0x5864aa[(_0x8245('0x1'))](_0x5864aa(this));return _0x2f64d2;};_0x5864aa(function(){_0x5864aa(_0x8245('0x47'))['QD_amazingMenu']();});}}(this));
/* Quatro Digital Smart Cart */
var _0x8cda=['.qd-ddc-prodRow','addClass','qd-ddc-noItems','empty','each','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','attr','qd-ddc-','availability','append','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','content','.qd-ddc-quantity','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','getParent','.qd-ddc-shipping\x20input','address','actionButtons','lastSku','filter','[data-sku=\x27','outerHeight','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','qd-ddc-cart-empty','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','forceImageHTTPS','http','https','qd-loaded','load','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','.qd-ddc-remove','click.qd_ddc_remove','stop','slideUp','remove','$1-$2$3','shippingCalculate','data','done','.qd-ddc-cep-tooltip-text','logisticsInfo','<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>','shippingEstimate','\x20dia\x20útil','\x20dias\x20útéis','<tr></tr>','price',',\x20entrega\x20em\x20','\x20para\x20o\x20CEP\x20','</td>','appendTo','tbody','insertBefore','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','qdDdcLastPostalCode','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','removeProduct','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','quickViewUpdate','allowRecalculate','productId','prod_','quantity','.qd-bap-wrapper','.qd-bap-item-added','input.qd-productId[value=','prodId','.qd-bap-qtt','qd-bap-item-added','ajaxStop','.qdDdcContainer','selector','dropDown','buyButton','QD_buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','closest','abs','undefined','pow','round','toFixed','split','length','replace','join','_QuatroDigital_CartData','callback','Callbacks','function','error','Oooops!\x20','message','info','warn','object','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','toLowerCase','aviso','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','extend','Ir\x20ao\x20Carrinho','Continuar\x20Comprando','skuName','name','smartCheckout','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','find','add','removeClass','qd-bb-lightBoxProdAdd','body','qd-bb-lightBoxBodyProdAdd','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','val','keyup.qd_ddc_cep','click','.qd-ddc-cep-btn','preventDefault','toggle','.qd-ddc-cep-close','hide','off','click._QD_DDC_closeShipping','target','.qd-ddc-cep-tooltip','.qd-ddc-cep-ok','updateOnlyHover','mouseenter.qd_ddc_hover','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','texts','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','.qd-ddc-viewCart','linkCart','html','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-emptyCart\x20p','emptyCart','call','clone','.qd-ddc-infoTotalValue','total','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','shipping','allTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','getCartInfoByUrl','dataOptionsCache','timeRemoveNewItemClass','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','getOrderForm','QD_checkoutQueue','items','totalizers','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!'];(function(_0x2eb209,_0x1328a5){var _0x42fef7=function(_0x19c6ef){while(--_0x19c6ef){_0x2eb209['push'](_0x2eb209['shift']());}};_0x42fef7(++_0x1328a5);}(_0x8cda,0x168));var _0xa8cd=function(_0x51adc6,_0x4c4f72){_0x51adc6=_0x51adc6-0x0;var _0xc3b86b=_0x8cda[_0x51adc6];return _0xc3b86b;};(function(_0xe4b5cf){_0xe4b5cf['fn']['getParent']=_0xe4b5cf['fn'][_0xa8cd('0x0')];}(jQuery));function qd_number_format(_0x417651,_0x984f18,_0x393e95,_0x484e1a){_0x417651=(_0x417651+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x417651=isFinite(+_0x417651)?+_0x417651:0x0;_0x984f18=isFinite(+_0x984f18)?Math[_0xa8cd('0x1')](_0x984f18):0x0;_0x484e1a=_0xa8cd('0x2')===typeof _0x484e1a?',':_0x484e1a;_0x393e95=_0xa8cd('0x2')===typeof _0x393e95?'.':_0x393e95;var _0xdffe84='',_0xdffe84=function(_0x1f5baf,_0x4d3287){var _0x984f18=Math[_0xa8cd('0x3')](0xa,_0x4d3287);return''+(Math[_0xa8cd('0x4')](_0x1f5baf*_0x984f18)/_0x984f18)[_0xa8cd('0x5')](_0x4d3287);},_0xdffe84=(_0x984f18?_0xdffe84(_0x417651,_0x984f18):''+Math[_0xa8cd('0x4')](_0x417651))[_0xa8cd('0x6')]('.');0x3<_0xdffe84[0x0][_0xa8cd('0x7')]&&(_0xdffe84[0x0]=_0xdffe84[0x0][_0xa8cd('0x8')](/\B(?=(?:\d{3})+(?!\d))/g,_0x484e1a));(_0xdffe84[0x1]||'')[_0xa8cd('0x7')]<_0x984f18&&(_0xdffe84[0x1]=_0xdffe84[0x1]||'',_0xdffe84[0x1]+=Array(_0x984f18-_0xdffe84[0x1][_0xa8cd('0x7')]+0x1)['join']('0'));return _0xdffe84[_0xa8cd('0x9')](_0x393e95);};(function(){try{window[_0xa8cd('0xa')]=window['_QuatroDigital_CartData']||{},window[_0xa8cd('0xa')][_0xa8cd('0xb')]=window[_0xa8cd('0xa')][_0xa8cd('0xb')]||$[_0xa8cd('0xc')]();}catch(_0x2cf5e3){_0xa8cd('0x2')!==typeof console&&_0xa8cd('0xd')===typeof console['error']&&console[_0xa8cd('0xe')](_0xa8cd('0xf'),_0x2cf5e3[_0xa8cd('0x10')]);}}());(function(_0x130558){try{var _0x16cdd3=jQuery,_0x305889=function(_0x2c94ce,_0x2b4bdb){if('object'===typeof console&&_0xa8cd('0x2')!==typeof console[_0xa8cd('0xe')]&&_0xa8cd('0x2')!==typeof console[_0xa8cd('0x11')]&&_0xa8cd('0x2')!==typeof console[_0xa8cd('0x12')]){var _0x1bbbf4;_0xa8cd('0x13')===typeof _0x2c94ce?(_0x2c94ce[_0xa8cd('0x14')](_0xa8cd('0x15')),_0x1bbbf4=_0x2c94ce):_0x1bbbf4=[_0xa8cd('0x15')+_0x2c94ce];if(_0xa8cd('0x2')===typeof _0x2b4bdb||_0xa8cd('0x16')!==_0x2b4bdb[_0xa8cd('0x17')]()&&_0xa8cd('0x18')!==_0x2b4bdb[_0xa8cd('0x17')]())if(_0xa8cd('0x2')!==typeof _0x2b4bdb&&_0xa8cd('0x11')===_0x2b4bdb['toLowerCase']())try{console[_0xa8cd('0x11')][_0xa8cd('0x19')](console,_0x1bbbf4);}catch(_0x67967f){try{console[_0xa8cd('0x11')](_0x1bbbf4[_0xa8cd('0x9')]('\x0a'));}catch(_0x3541bf){}}else try{console[_0xa8cd('0xe')][_0xa8cd('0x19')](console,_0x1bbbf4);}catch(_0x500a90){try{console[_0xa8cd('0xe')](_0x1bbbf4[_0xa8cd('0x9')]('\x0a'));}catch(_0x5ae406){}}else try{console[_0xa8cd('0x12')][_0xa8cd('0x19')](console,_0x1bbbf4);}catch(_0x30be59){try{console[_0xa8cd('0x12')](_0x1bbbf4[_0xa8cd('0x9')]('\x0a'));}catch(_0x28d355){}}}};window[_0xa8cd('0x1a')]=window['_QuatroDigital_DropDown']||{};window['_QuatroDigital_DropDown'][_0xa8cd('0x1b')]=!0x0;_0x16cdd3[_0xa8cd('0x1c')]=function(){};_0x16cdd3['fn'][_0xa8cd('0x1c')]=function(){return{'fn':new _0x16cdd3()};};var _0x294d20=function(_0x41268d){var _0x2333d6={'s':_0xa8cd('0x1d')};return function(_0x31723e){var _0x1aa730=function(_0x165f4b){return _0x165f4b;};var _0x56758a=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x31723e=_0x31723e['d'+_0x56758a[0x10]+'c'+_0x56758a[0x11]+'m'+_0x1aa730(_0x56758a[0x1])+'n'+_0x56758a[0xd]]['l'+_0x56758a[0x12]+'c'+_0x56758a[0x0]+'ti'+_0x1aa730('o')+'n'];var _0x317048=function(_0x48fe17){return escape(encodeURIComponent(_0x48fe17[_0xa8cd('0x8')](/\./g,'¨')[_0xa8cd('0x8')](/[a-zA-Z]/g,function(_0x38c6ca){return String[_0xa8cd('0x1e')](('Z'>=_0x38c6ca?0x5a:0x7a)>=(_0x38c6ca=_0x38c6ca[_0xa8cd('0x1f')](0x0)+0xd)?_0x38c6ca:_0x38c6ca-0x1a);})));};var _0x403e36=_0x317048(_0x31723e[[_0x56758a[0x9],_0x1aa730('o'),_0x56758a[0xc],_0x56758a[_0x1aa730(0xd)]][_0xa8cd('0x9')]('')]);_0x317048=_0x317048((window[['js',_0x1aa730('no'),'m',_0x56758a[0x1],_0x56758a[0x4]['toUpperCase'](),'ite'][_0xa8cd('0x9')]('')]||'---')+['.v',_0x56758a[0xd],'e',_0x1aa730('x'),'co',_0x1aa730('mm'),'erc',_0x56758a[0x1],'.c',_0x1aa730('o'),'m.',_0x56758a[0x13],'r']['join'](''));for(var _0x3494da in _0x2333d6){if(_0x317048===_0x3494da+_0x2333d6[_0x3494da]||_0x403e36===_0x3494da+_0x2333d6[_0x3494da]){var _0x32895a='tr'+_0x56758a[0x11]+'e';break;}_0x32895a='f'+_0x56758a[0x0]+'ls'+_0x1aa730(_0x56758a[0x1])+'';}_0x1aa730=!0x1;-0x1<_0x31723e[[_0x56758a[0xc],'e',_0x56758a[0x0],'rc',_0x56758a[0x9]][_0xa8cd('0x9')]('')][_0xa8cd('0x20')](_0xa8cd('0x21'))&&(_0x1aa730=!0x0);return[_0x32895a,_0x1aa730];}(_0x41268d);}(window);if(!eval(_0x294d20[0x0]))return _0x294d20[0x1]?_0x305889('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x16cdd3[_0xa8cd('0x1c')]=function(_0x17098a,_0x48a406){var _0x4f4d36=_0x16cdd3(_0x17098a);if(!_0x4f4d36[_0xa8cd('0x7')])return _0x4f4d36;var _0x1a8954=_0x16cdd3[_0xa8cd('0x22')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0xa8cd('0x23'),'linkCheckout':'Finalizar\x20Compra','cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':'Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','continueShopping':_0xa8cd('0x24'),'shippingForm':'<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'forceImageHTTPS':!0x1,'skuName':function(_0x4753a8){return _0x4753a8[_0xa8cd('0x25')]||_0x4753a8[_0xa8cd('0x26')];},'callback':function(){},'callbackProductsList':function(){}},_0x48a406);_0x16cdd3('');var _0x397a42=this;if(_0x1a8954[_0xa8cd('0x27')]){var _0x276d51=!0x1;'undefined'===typeof window[_0xa8cd('0x28')]&&(_0x305889(_0xa8cd('0x29')),_0x16cdd3[_0xa8cd('0x2a')]({'url':_0xa8cd('0x2b'),'async':!0x1,'dataType':_0xa8cd('0x2c'),'error':function(){_0x305889(_0xa8cd('0x2d'));_0x276d51=!0x0;}}));if(_0x276d51)return _0x305889(_0xa8cd('0x2e'));}if('object'===typeof window[_0xa8cd('0x28')]&&_0xa8cd('0x2')!==typeof window['vtexjs'][_0xa8cd('0x2f')])var _0x130558=window[_0xa8cd('0x28')][_0xa8cd('0x2f')];else if('object'===typeof vtex&&'object'===typeof vtex[_0xa8cd('0x2f')]&&_0xa8cd('0x2')!==typeof vtex['checkout']['SDK'])_0x130558=new vtex[(_0xa8cd('0x2f'))][(_0xa8cd('0x30'))]();else return _0x305889(_0xa8cd('0x31'));_0x397a42[_0xa8cd('0x32')]=_0xa8cd('0x33');var _0x9d11e1=function(_0x1189cc){_0x16cdd3(this)['append'](_0x1189cc);_0x1189cc[_0xa8cd('0x34')]('.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose')[_0xa8cd('0x35')](_0x16cdd3('.qd_ddc_lightBoxOverlay'))['on']('click.qd_ddc_closeFn',function(){_0x4f4d36[_0xa8cd('0x36')](_0xa8cd('0x37'));_0x16cdd3(document[_0xa8cd('0x38')])[_0xa8cd('0x36')](_0xa8cd('0x39'));});_0x16cdd3(document)['off'](_0xa8cd('0x3a'))['on']('keyup.qd_ddc_closeFn',function(_0x194962){0x1b==_0x194962[_0xa8cd('0x3b')]&&(_0x4f4d36[_0xa8cd('0x36')](_0xa8cd('0x37')),_0x16cdd3(document['body'])['removeClass'](_0xa8cd('0x39')));});var _0x291d00=_0x1189cc['find'](_0xa8cd('0x3c'));_0x1189cc[_0xa8cd('0x34')](_0xa8cd('0x3d'))['on'](_0xa8cd('0x3e'),function(){_0x397a42[_0xa8cd('0x3f')]('-',void 0x0,void 0x0,_0x291d00);return!0x1;});_0x1189cc[_0xa8cd('0x34')](_0xa8cd('0x40'))['on']('click.qd_ddc_scrollDown',function(){_0x397a42[_0xa8cd('0x3f')](void 0x0,void 0x0,void 0x0,_0x291d00);return!0x1;});var _0x378a8b=_0x1189cc[_0xa8cd('0x34')]('.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text');_0x1189cc[_0xa8cd('0x34')]('.qd-ddc-shipping\x20.qd-ddc-cep')[_0xa8cd('0x41')]('')['on'](_0xa8cd('0x42'),function(_0x423d81){_0x397a42['formatCepField'](_0x16cdd3(this));0xd==_0x423d81[_0xa8cd('0x3b')]&&_0x1189cc[_0xa8cd('0x34')]('.qd-ddc-shipping\x20.qd-ddc-cep-ok')[_0xa8cd('0x43')]();});_0x1189cc['find'](_0xa8cd('0x44'))[_0xa8cd('0x43')](function(_0xd5f1e2){_0xd5f1e2[_0xa8cd('0x45')]();_0x378a8b[_0xa8cd('0x46')]();});_0x1189cc[_0xa8cd('0x34')](_0xa8cd('0x47'))[_0xa8cd('0x43')](function(_0x4935b8){_0x4935b8['preventDefault']();_0x378a8b[_0xa8cd('0x48')]();});_0x16cdd3(document)[_0xa8cd('0x49')](_0xa8cd('0x4a'))['on']('click._QD_DDC_closeShipping',function(_0x29f85b){_0x16cdd3(_0x29f85b[_0xa8cd('0x4b')])['closest'](_0x1189cc['find'](_0xa8cd('0x4c')))[_0xa8cd('0x7')]||_0x378a8b[_0xa8cd('0x48')]();});_0x1189cc[_0xa8cd('0x34')](_0xa8cd('0x4d'))['click'](function(_0x47524f){_0x47524f['preventDefault']();_0x397a42['shippingCalculate'](_0x1189cc[_0xa8cd('0x34')]('.qd-ddc-cep'));});if(_0x1a8954[_0xa8cd('0x4e')]){var _0x48a406=0x0;_0x16cdd3(this)['on'](_0xa8cd('0x4f'),function(){var _0x1189cc=function(){window['_QuatroDigital_DropDown']['allowUpdate']&&(_0x397a42['getCartInfoByUrl'](),window['_QuatroDigital_DropDown'][_0xa8cd('0x1b')]=!0x1,_0x16cdd3['fn'][_0xa8cd('0x50')](!0x0),_0x397a42[_0xa8cd('0x51')]());};_0x48a406=setInterval(function(){_0x1189cc();},0x258);_0x1189cc();});_0x16cdd3(this)['on'](_0xa8cd('0x52'),function(){clearInterval(_0x48a406);});}};var _0x574063=function(_0xbc780a){_0xbc780a=_0x16cdd3(_0xbc780a);_0x1a8954['texts'][_0xa8cd('0x53')]=_0x1a8954['texts']['cartTotal'][_0xa8cd('0x8')](_0xa8cd('0x54'),_0xa8cd('0x55'));_0x1a8954[_0xa8cd('0x56')][_0xa8cd('0x53')]=_0x1a8954[_0xa8cd('0x56')][_0xa8cd('0x53')][_0xa8cd('0x8')]('#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>');_0x1a8954['texts']['cartTotal']=_0x1a8954[_0xa8cd('0x56')][_0xa8cd('0x53')][_0xa8cd('0x8')](_0xa8cd('0x57'),_0xa8cd('0x58'));_0x1a8954['texts'][_0xa8cd('0x53')]=_0x1a8954[_0xa8cd('0x56')][_0xa8cd('0x53')][_0xa8cd('0x8')](_0xa8cd('0x59'),'<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0xbc780a[_0xa8cd('0x34')](_0xa8cd('0x5a'))['html'](_0x1a8954[_0xa8cd('0x56')][_0xa8cd('0x5b')]);_0xbc780a[_0xa8cd('0x34')]('.qd_ddc_continueShopping')[_0xa8cd('0x5c')](_0x1a8954[_0xa8cd('0x56')][_0xa8cd('0x5d')]);_0xbc780a[_0xa8cd('0x34')](_0xa8cd('0x5e'))[_0xa8cd('0x5c')](_0x1a8954['texts'][_0xa8cd('0x5f')]);_0xbc780a[_0xa8cd('0x34')]('.qd-ddc-infoTotal')[_0xa8cd('0x5c')](_0x1a8954[_0xa8cd('0x56')]['cartTotal']);_0xbc780a['find']('.qd-ddc-shipping')[_0xa8cd('0x5c')](_0x1a8954[_0xa8cd('0x56')]['shippingForm']);_0xbc780a['find'](_0xa8cd('0x60'))[_0xa8cd('0x5c')](_0x1a8954[_0xa8cd('0x56')][_0xa8cd('0x61')]);return _0xbc780a;}(this['cartContainer']);var _0x534d4f=0x0;_0x4f4d36['each'](function(){0x0<_0x534d4f?_0x9d11e1[_0xa8cd('0x62')](this,_0x574063[_0xa8cd('0x63')]()):_0x9d11e1[_0xa8cd('0x62')](this,_0x574063);_0x534d4f++;});window[_0xa8cd('0xa')][_0xa8cd('0xb')][_0xa8cd('0x35')](function(){_0x16cdd3(_0xa8cd('0x64'))[_0xa8cd('0x5c')](window[_0xa8cd('0xa')][_0xa8cd('0x65')]||'--');_0x16cdd3(_0xa8cd('0x66'))['html'](window[_0xa8cd('0xa')][_0xa8cd('0x67')]||'0');_0x16cdd3(_0xa8cd('0x68'))[_0xa8cd('0x5c')](window[_0xa8cd('0xa')][_0xa8cd('0x69')]||'--');_0x16cdd3('.qd-ddc-infoAllTotal')[_0xa8cd('0x5c')](window[_0xa8cd('0xa')][_0xa8cd('0x6a')]||'--');});var _0x8e47c8=function(_0x8e981,_0x540234){if(_0xa8cd('0x2')===typeof _0x8e981['items'])return _0x305889(_0xa8cd('0x6b'));_0x397a42[_0xa8cd('0x6c')][_0xa8cd('0x62')](this,_0x540234);};_0x397a42[_0xa8cd('0x6d')]=function(_0x3b302a,_0x4475c4){_0xa8cd('0x2')!=typeof _0x4475c4?window[_0xa8cd('0x1a')]['dataOptionsCache']=_0x4475c4:window[_0xa8cd('0x1a')]['dataOptionsCache']&&(_0x4475c4=window[_0xa8cd('0x1a')]['dataOptionsCache']);setTimeout(function(){window[_0xa8cd('0x1a')][_0xa8cd('0x6e')]=void 0x0;},_0x1a8954[_0xa8cd('0x6f')]);_0x16cdd3('.qd-ddc-wrapper')['removeClass'](_0xa8cd('0x70'));if(_0x1a8954['smartCheckout']){var _0x5747ee=function(_0x5c4b9f){window[_0xa8cd('0x1a')]['getOrderForm']=_0x5c4b9f;_0x8e47c8(_0x5c4b9f,_0x4475c4);_0xa8cd('0x2')!==typeof window['_QuatroDigital_AmountProduct']&&_0xa8cd('0xd')===typeof window[_0xa8cd('0x71')][_0xa8cd('0x72')]&&window[_0xa8cd('0x71')][_0xa8cd('0x72')][_0xa8cd('0x62')](this);_0x16cdd3('.qd-ddc-wrapper')['addClass'](_0xa8cd('0x70'));};'undefined'!==typeof window[_0xa8cd('0x1a')][_0xa8cd('0x73')]?(_0x5747ee(window[_0xa8cd('0x1a')][_0xa8cd('0x73')]),_0xa8cd('0xd')===typeof _0x3b302a&&_0x3b302a(window[_0xa8cd('0x1a')][_0xa8cd('0x73')])):_0x16cdd3[_0xa8cd('0x74')]([_0xa8cd('0x75'),_0xa8cd('0x76'),_0xa8cd('0x77')],{'done':function(_0x42b0f7){_0x5747ee[_0xa8cd('0x62')](this,_0x42b0f7);_0xa8cd('0xd')===typeof _0x3b302a&&_0x3b302a(_0x42b0f7);},'fail':function(_0x3460e0){_0x305889([_0xa8cd('0x78'),_0x3460e0]);}});}else alert(_0xa8cd('0x79'));};_0x397a42[_0xa8cd('0x51')]=function(){var _0x55df6f=_0x16cdd3('.qd-ddc-wrapper');_0x55df6f[_0xa8cd('0x34')](_0xa8cd('0x7a'))[_0xa8cd('0x7')]?_0x55df6f['removeClass']('qd-ddc-noItems'):_0x55df6f[_0xa8cd('0x7b')](_0xa8cd('0x7c'));};_0x397a42[_0xa8cd('0x6c')]=function(_0x3fe302){var _0x48a406=_0x16cdd3('.qd-ddc-prodWrapper2');_0x48a406[_0xa8cd('0x7d')]();_0x48a406[_0xa8cd('0x7e')](function(){var _0x48a406=_0x16cdd3(this),_0x8b6933,_0x2d0cb8,_0x54e086=_0x16cdd3(''),_0x279e1a;for(_0x279e1a in window[_0xa8cd('0x1a')][_0xa8cd('0x73')][_0xa8cd('0x75')])if(_0xa8cd('0x13')===typeof window[_0xa8cd('0x1a')][_0xa8cd('0x73')][_0xa8cd('0x75')][_0x279e1a]){var _0x30e63e=window['_QuatroDigital_DropDown'][_0xa8cd('0x73')][_0xa8cd('0x75')][_0x279e1a];var _0x17098a=_0x30e63e[_0xa8cd('0x7f')][_0xa8cd('0x8')](/^\/|\/$/g,'')[_0xa8cd('0x6')]('/');var _0x3aaeff=_0x16cdd3(_0xa8cd('0x80'));_0x3aaeff[_0xa8cd('0x81')]({'data-sku':_0x30e63e['id'],'data-sku-index':_0x279e1a,'data-qd-departament':_0x17098a[0x0],'data-qd-category':_0x17098a[_0x17098a[_0xa8cd('0x7')]-0x1]});_0x3aaeff[_0xa8cd('0x7b')](_0xa8cd('0x82')+_0x30e63e[_0xa8cd('0x83')]);_0x3aaeff[_0xa8cd('0x34')]('.qd-ddc-prodName')[_0xa8cd('0x84')](_0x1a8954['skuName'](_0x30e63e));_0x3aaeff[_0xa8cd('0x34')](_0xa8cd('0x85'))[_0xa8cd('0x84')](isNaN(_0x30e63e[_0xa8cd('0x86')])?_0x30e63e[_0xa8cd('0x86')]:0x0==_0x30e63e[_0xa8cd('0x86')]?_0xa8cd('0x87'):(_0x16cdd3(_0xa8cd('0x88'))['attr'](_0xa8cd('0x89'))||'R$')+'\x20'+qd_number_format(_0x30e63e[_0xa8cd('0x86')]/0x64,0x2,',','.'));_0x3aaeff['find'](_0xa8cd('0x8a'))[_0xa8cd('0x81')]({'data-sku':_0x30e63e['id'],'data-sku-index':_0x279e1a})['val'](_0x30e63e['quantity']);_0x3aaeff[_0xa8cd('0x34')]('.qd-ddc-remove')[_0xa8cd('0x81')]({'data-sku':_0x30e63e['id'],'data-sku-index':_0x279e1a});_0x397a42[_0xa8cd('0x8b')](_0x30e63e['id'],_0x3aaeff[_0xa8cd('0x34')](_0xa8cd('0x8c')),_0x30e63e[_0xa8cd('0x8d')]);_0x3aaeff[_0xa8cd('0x34')](_0xa8cd('0x8e'))[_0xa8cd('0x81')]({'data-sku':_0x30e63e['id'],'data-sku-index':_0x279e1a});_0x3aaeff['appendTo'](_0x48a406);_0x54e086=_0x54e086[_0xa8cd('0x35')](_0x3aaeff);}try{var _0x508c63=_0x48a406[_0xa8cd('0x8f')]('.qd-ddc-wrapper')[_0xa8cd('0x34')](_0xa8cd('0x90'));_0x508c63['length']&&''==_0x508c63['val']()&&window[_0xa8cd('0x1a')]['getOrderForm']['shippingData']['address']&&_0x508c63[_0xa8cd('0x41')](window[_0xa8cd('0x1a')][_0xa8cd('0x73')]['shippingData'][_0xa8cd('0x91')]['postalCode']);}catch(_0x1816b7){_0x305889('Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20'+_0x1816b7['message'],'aviso');}_0x397a42[_0xa8cd('0x92')](_0x48a406);_0x397a42[_0xa8cd('0x51')]();_0x3fe302&&_0x3fe302[_0xa8cd('0x93')]&&function(){_0x2d0cb8=_0x54e086[_0xa8cd('0x94')](_0xa8cd('0x95')+_0x3fe302[_0xa8cd('0x93')]+'\x27]');_0x2d0cb8['length']&&(_0x8b6933=0x0,_0x54e086[_0xa8cd('0x7e')](function(){var _0x3fe302=_0x16cdd3(this);if(_0x3fe302['is'](_0x2d0cb8))return!0x1;_0x8b6933+=_0x3fe302[_0xa8cd('0x96')]();}),_0x397a42[_0xa8cd('0x3f')](void 0x0,void 0x0,_0x8b6933,_0x48a406['add'](_0x48a406[_0xa8cd('0x97')]())),_0x54e086['removeClass'](_0xa8cd('0x98')),function(_0x3e6e83){_0x3e6e83[_0xa8cd('0x7b')](_0xa8cd('0x99'));_0x3e6e83[_0xa8cd('0x7b')](_0xa8cd('0x98'));setTimeout(function(){_0x3e6e83[_0xa8cd('0x36')]('qd-ddc-lastAdded');},_0x1a8954[_0xa8cd('0x6f')]);}(_0x2d0cb8),_0x16cdd3(document[_0xa8cd('0x38')])['addClass'](_0xa8cd('0x9a')),setTimeout(function(){_0x16cdd3(document[_0xa8cd('0x38')])[_0xa8cd('0x36')](_0xa8cd('0x9a'));},_0x1a8954[_0xa8cd('0x6f')]));}();});(function(){_QuatroDigital_DropDown[_0xa8cd('0x73')]['items'][_0xa8cd('0x7')]?(_0x16cdd3('body')[_0xa8cd('0x36')]('qd-ddc-cart-empty')[_0xa8cd('0x7b')](_0xa8cd('0x9b')),setTimeout(function(){_0x16cdd3('body')[_0xa8cd('0x36')](_0xa8cd('0x9c'));},_0x1a8954['timeRemoveNewItemClass'])):_0x16cdd3(_0xa8cd('0x38'))[_0xa8cd('0x36')](_0xa8cd('0x9d'))[_0xa8cd('0x7b')](_0xa8cd('0x9e'));}());_0xa8cd('0xd')===typeof _0x1a8954[_0xa8cd('0x9f')]?_0x1a8954[_0xa8cd('0x9f')]['call'](this):_0x305889(_0xa8cd('0xa0'));};_0x397a42['insertProdImg']=function(_0x183190,_0x479926,_0x2ed233){function _0x25c9e2(){_0x1a8954[_0xa8cd('0xa1')]&&'string'==typeof _0x2ed233&&(_0x2ed233=_0x2ed233[_0xa8cd('0x8')](_0xa8cd('0xa2'),_0xa8cd('0xa3')));_0x479926['removeClass'](_0xa8cd('0xa4'))[_0xa8cd('0xa5')](function(){_0x16cdd3(this)[_0xa8cd('0x7b')]('qd-loaded');})['attr'](_0xa8cd('0xa6'),_0x2ed233);}_0x2ed233?_0x25c9e2():isNaN(_0x183190)?_0x305889(_0xa8cd('0xa7'),_0xa8cd('0x16')):alert(_0xa8cd('0xa8'));};_0x397a42[_0xa8cd('0x92')]=function(_0x3c17ab){var _0x48a406=function(_0x14b0c5,_0x44fc0c){var _0x4c1ed9=_0x16cdd3(_0x14b0c5);var _0x1da08d=_0x4c1ed9[_0xa8cd('0x81')](_0xa8cd('0xa9'));var _0x17098a=_0x4c1ed9['attr']('data-sku-index');if(_0x1da08d){var _0x4a2d69=parseInt(_0x4c1ed9[_0xa8cd('0x41')]())||0x1;_0x397a42['changeQantity']([_0x1da08d,_0x17098a],_0x4a2d69,_0x4a2d69+0x1,function(_0x3df531){_0x4c1ed9[_0xa8cd('0x41')](_0x3df531);_0xa8cd('0xd')===typeof _0x44fc0c&&_0x44fc0c();});}};var _0x4fb90c=function(_0x1d5da3,_0x2acfa9){var _0x48a406=_0x16cdd3(_0x1d5da3);var _0x318551=_0x48a406['attr'](_0xa8cd('0xa9'));var _0x2aa1d=_0x48a406[_0xa8cd('0x81')](_0xa8cd('0xaa'));if(_0x318551){var _0x17098a=parseInt(_0x48a406[_0xa8cd('0x41')]())||0x2;_0x397a42[_0xa8cd('0xab')]([_0x318551,_0x2aa1d],_0x17098a,_0x17098a-0x1,function(_0x277b25){_0x48a406['val'](_0x277b25);'function'===typeof _0x2acfa9&&_0x2acfa9();});}};var _0x341fa0=function(_0x33d6a3,_0x15a299){var _0x1fc21b=_0x16cdd3(_0x33d6a3);var _0xe6173=_0x1fc21b[_0xa8cd('0x81')](_0xa8cd('0xa9'));var _0x17098a=_0x1fc21b[_0xa8cd('0x81')](_0xa8cd('0xaa'));if(_0xe6173){var _0x4b2f06=parseInt(_0x1fc21b[_0xa8cd('0x41')]())||0x1;_0x397a42[_0xa8cd('0xab')]([_0xe6173,_0x17098a],0x1,_0x4b2f06,function(_0x5a62ba){_0x1fc21b['val'](_0x5a62ba);_0xa8cd('0xd')===typeof _0x15a299&&_0x15a299();});}};var _0x17098a=_0x3c17ab[_0xa8cd('0x34')](_0xa8cd('0xac'));_0x17098a['addClass'](_0xa8cd('0xad'))[_0xa8cd('0x7e')](function(){var _0x3c17ab=_0x16cdd3(this);_0x3c17ab[_0xa8cd('0x34')](_0xa8cd('0xae'))['on'](_0xa8cd('0xaf'),function(_0x3b0d88){_0x3b0d88[_0xa8cd('0x45')]();_0x17098a[_0xa8cd('0x7b')]('qd-loading');_0x48a406(_0x3c17ab[_0xa8cd('0x34')](_0xa8cd('0x8a')),function(){_0x17098a[_0xa8cd('0x36')](_0xa8cd('0xb0'));});});_0x3c17ab['find'](_0xa8cd('0xb1'))['on'](_0xa8cd('0xb2'),function(_0x361026){_0x361026[_0xa8cd('0x45')]();_0x17098a['addClass'](_0xa8cd('0xb0'));_0x4fb90c(_0x3c17ab[_0xa8cd('0x34')](_0xa8cd('0x8a')),function(){_0x17098a[_0xa8cd('0x36')]('qd-loading');});});_0x3c17ab[_0xa8cd('0x34')](_0xa8cd('0x8a'))['on'](_0xa8cd('0xb3'),function(){_0x17098a['addClass'](_0xa8cd('0xb0'));_0x341fa0(this,function(){_0x17098a[_0xa8cd('0x36')](_0xa8cd('0xb0'));});});_0x3c17ab[_0xa8cd('0x34')](_0xa8cd('0x8a'))['on'](_0xa8cd('0xb4'),function(_0x274aeb){0xd==_0x274aeb['keyCode']&&(_0x17098a[_0xa8cd('0x7b')](_0xa8cd('0xb0')),_0x341fa0(this,function(){_0x17098a[_0xa8cd('0x36')](_0xa8cd('0xb0'));}));});});_0x3c17ab[_0xa8cd('0x34')](_0xa8cd('0x7a'))['each'](function(){var _0x3c17ab=_0x16cdd3(this);_0x3c17ab['find'](_0xa8cd('0xb5'))['on'](_0xa8cd('0xb6'),function(){_0x3c17ab[_0xa8cd('0x7b')](_0xa8cd('0xb0'));_0x397a42['removeProduct'](_0x16cdd3(this),function(_0x29ae6a){_0x29ae6a?_0x3c17ab[_0xa8cd('0xb7')](!0x0)[_0xa8cd('0xb8')](function(){_0x3c17ab[_0xa8cd('0xb9')]();_0x397a42[_0xa8cd('0x51')]();}):_0x3c17ab[_0xa8cd('0x36')]('qd-loading');});return!0x1;});});};_0x397a42['formatCepField']=function(_0xea73ec){var _0x19d36a=_0xea73ec[_0xa8cd('0x41')]();_0x19d36a=_0x19d36a[_0xa8cd('0x8')](/[^0-9\-]/g,'');_0x19d36a=_0x19d36a[_0xa8cd('0x8')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0xa8cd('0xba'));_0x19d36a=_0x19d36a[_0xa8cd('0x8')](/(.{9}).*/g,'$1');_0xea73ec[_0xa8cd('0x41')](_0x19d36a);};_0x397a42[_0xa8cd('0xbb')]=function(_0x8a704d){var _0x496727=_0x8a704d[_0xa8cd('0x41')]();0x9<=_0x496727[_0xa8cd('0x7')]&&(_0x8a704d[_0xa8cd('0xbc')]('qdDdcLastPostalCode')!=_0x496727&&_0x130558['calculateShipping']({'postalCode':_0x496727,'country':'BRA'})[_0xa8cd('0xbd')](function(_0x4e0f57){_0x8a704d[_0xa8cd('0x0')](_0xa8cd('0xbe'))[_0xa8cd('0x34')]('.qd-dd-cep-slas')[_0xa8cd('0xb9')]();window[_0xa8cd('0x1a')]['getOrderForm']=_0x4e0f57;_0x397a42[_0xa8cd('0x6d')]();_0x4e0f57=_0x4e0f57[_0xa8cd('0x77')][_0xa8cd('0xbf')][0x0]['slas'];for(var _0x17098a=_0x16cdd3(_0xa8cd('0xc0')),_0x3e2703=0x0;_0x3e2703<_0x4e0f57[_0xa8cd('0x7')];_0x3e2703++){var _0x580b54=_0x4e0f57[_0x3e2703],_0x498bcb=0x1<_0x580b54[_0xa8cd('0xc1')]?_0x580b54['shippingEstimate'][_0xa8cd('0x8')]('bd',_0xa8cd('0xc2')):_0x580b54[_0xa8cd('0xc1')]['replace']('bd',_0xa8cd('0xc3')),_0x33a480=_0x16cdd3(_0xa8cd('0xc4'));_0x33a480[_0xa8cd('0x84')]('<td>\x20R$\x20'+qd_number_format(_0x580b54[_0xa8cd('0xc5')]/0x64,0x2,',','.')+'</td><td>'+_0x580b54[_0xa8cd('0x26')]+_0xa8cd('0xc6')+_0x498bcb+_0xa8cd('0xc7')+_0x496727+_0xa8cd('0xc8'));_0x33a480[_0xa8cd('0xc9')](_0x17098a[_0xa8cd('0x34')](_0xa8cd('0xca')));}_0x17098a[_0xa8cd('0xcb')](_0x8a704d[_0xa8cd('0x0')](_0xa8cd('0xbe'))['find'](_0xa8cd('0x47')));})[_0xa8cd('0xcc')](function(_0x5944e4){_0x305889([_0xa8cd('0xcd'),_0x5944e4]);updateCartData();}),_0x8a704d['data'](_0xa8cd('0xce'),_0x496727));};_0x397a42[_0xa8cd('0xab')]=function(_0x4062f6,_0x2fb083,_0x4df268,_0x46a7a2){function _0x2a48f8(_0x10a1f4){_0x10a1f4=_0xa8cd('0xcf')!==typeof _0x10a1f4?!0x1:_0x10a1f4;_0x397a42[_0xa8cd('0x6d')]();window['_QuatroDigital_DropDown']['allowUpdate']=!0x1;_0x397a42[_0xa8cd('0x51')]();'undefined'!==typeof window[_0xa8cd('0x71')]&&_0xa8cd('0xd')===typeof window['_QuatroDigital_AmountProduct'][_0xa8cd('0x72')]&&window['_QuatroDigital_AmountProduct'][_0xa8cd('0x72')]['call'](this);_0xa8cd('0xd')===typeof adminCart&&adminCart();_0x16cdd3['fn'][_0xa8cd('0x50')](!0x0,void 0x0,_0x10a1f4);'function'===typeof _0x46a7a2&&_0x46a7a2(_0x2fb083);}_0x4df268=_0x4df268||0x1;if(0x1>_0x4df268)return _0x2fb083;if(_0x1a8954['smartCheckout']){if(_0xa8cd('0x2')===typeof window[_0xa8cd('0x1a')][_0xa8cd('0x73')][_0xa8cd('0x75')][_0x4062f6[0x1]])return _0x305889(_0xa8cd('0xd0')+_0x4062f6[0x1]+']'),_0x2fb083;window['_QuatroDigital_DropDown'][_0xa8cd('0x73')][_0xa8cd('0x75')][_0x4062f6[0x1]]['quantity']=_0x4df268;window[_0xa8cd('0x1a')][_0xa8cd('0x73')]['items'][_0x4062f6[0x1]][_0xa8cd('0xd1')]=_0x4062f6[0x1];_0x130558[_0xa8cd('0xd2')]([window['_QuatroDigital_DropDown'][_0xa8cd('0x73')][_0xa8cd('0x75')][_0x4062f6[0x1]]],[_0xa8cd('0x75'),_0xa8cd('0x76'),_0xa8cd('0x77')])[_0xa8cd('0xbd')](function(_0x2454fe){window['_QuatroDigital_DropDown'][_0xa8cd('0x73')]=_0x2454fe;_0x2a48f8(!0x0);})[_0xa8cd('0xcc')](function(_0x3724ff){_0x305889([_0xa8cd('0xd3'),_0x3724ff]);_0x2a48f8();});}else _0x305889(_0xa8cd('0xd4'));};_0x397a42[_0xa8cd('0xd5')]=function(_0x1f6c7a,_0x24dcac){function _0x1151ab(_0x5e376b){_0x5e376b=_0xa8cd('0xcf')!==typeof _0x5e376b?!0x1:_0x5e376b;_0xa8cd('0x2')!==typeof window[_0xa8cd('0x71')]&&_0xa8cd('0xd')===typeof window['_QuatroDigital_AmountProduct'][_0xa8cd('0x72')]&&window[_0xa8cd('0x71')][_0xa8cd('0x72')][_0xa8cd('0x62')](this);_0xa8cd('0xd')===typeof adminCart&&adminCart();_0x16cdd3['fn'][_0xa8cd('0x50')](!0x0,void 0x0,_0x5e376b);'function'===typeof _0x24dcac&&_0x24dcac(_0x6ff185);}var _0x6ff185=!0x1,_0x17098a=_0x16cdd3(_0x1f6c7a)[_0xa8cd('0x81')](_0xa8cd('0xaa'));if(_0x1a8954['smartCheckout']){if(_0xa8cd('0x2')===typeof window['_QuatroDigital_DropDown'][_0xa8cd('0x73')][_0xa8cd('0x75')][_0x17098a])return _0x305889('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x17098a+']'),_0x6ff185;window[_0xa8cd('0x1a')][_0xa8cd('0x73')]['items'][_0x17098a][_0xa8cd('0xd1')]=_0x17098a;_0x130558['removeItems']([window[_0xa8cd('0x1a')][_0xa8cd('0x73')][_0xa8cd('0x75')][_0x17098a]],[_0xa8cd('0x75'),_0xa8cd('0x76'),_0xa8cd('0x77')])['done'](function(_0x4dd4df){_0x6ff185=!0x0;window['_QuatroDigital_DropDown'][_0xa8cd('0x73')]=_0x4dd4df;_0x8e47c8(_0x4dd4df);_0x1151ab(!0x0);})[_0xa8cd('0xcc')](function(_0x330853){_0x305889([_0xa8cd('0xd6'),_0x330853]);_0x1151ab();});}else alert(_0xa8cd('0xd7'));};_0x397a42['scrollCart']=function(_0x1827f3,_0x2432b6,_0x1bfc55,_0x201040){_0x201040=_0x201040||_0x16cdd3(_0xa8cd('0xd8'));_0x1827f3=_0x1827f3||'+';_0x2432b6=_0x2432b6||0.9*_0x201040[_0xa8cd('0xd9')]();_0x201040[_0xa8cd('0xb7')](!0x0,!0x0)[_0xa8cd('0xda')]({'scrollTop':isNaN(_0x1bfc55)?_0x1827f3+'='+_0x2432b6+'px':_0x1bfc55});};_0x1a8954['updateOnlyHover']||(_0x397a42[_0xa8cd('0x6d')](),_0x16cdd3['fn'][_0xa8cd('0x50')](!0x0));_0x16cdd3(window)['on']('productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex',function(){try{window[_0xa8cd('0x1a')][_0xa8cd('0x73')]=void 0x0,_0x397a42[_0xa8cd('0x6d')]();}catch(_0x288fc1){_0x305889(_0xa8cd('0xdb')+_0x288fc1[_0xa8cd('0x10')],_0xa8cd('0xdc'));}});'function'===typeof _0x1a8954[_0xa8cd('0xb')]?_0x1a8954[_0xa8cd('0xb')][_0xa8cd('0x62')](this):_0x305889(_0xa8cd('0xdd'));};_0x16cdd3['fn'][_0xa8cd('0x1c')]=function(_0x35d3da){var _0x875031=_0x16cdd3(this);_0x875031['fn']=new _0x16cdd3[(_0xa8cd('0x1c'))](this,_0x35d3da);return _0x875031;};}catch(_0x3ecffe){'undefined'!==typeof console&&_0xa8cd('0xd')===typeof console[_0xa8cd('0xe')]&&console['error'](_0xa8cd('0xf'),_0x3ecffe);}}(this));(function(_0xc1a532){try{var _0x255984=jQuery;window[_0xa8cd('0x71')]=window[_0xa8cd('0x71')]||{};window['_QuatroDigital_AmountProduct'][_0xa8cd('0x75')]={};window[_0xa8cd('0x71')]['allowRecalculate']=!0x1;window[_0xa8cd('0x71')]['buyButtonClicked']=!0x1;window[_0xa8cd('0x71')][_0xa8cd('0xde')]=!0x1;var _0xf84ec=function(){if(window[_0xa8cd('0x71')][_0xa8cd('0xdf')]){var _0x1c2a45=!0x1;var _0x556e8a={};window['_QuatroDigital_AmountProduct']['items']={};for(_0x1439b5 in window[_0xa8cd('0x1a')]['getOrderForm'][_0xa8cd('0x75')])if(_0xa8cd('0x13')===typeof window[_0xa8cd('0x1a')]['getOrderForm'][_0xa8cd('0x75')][_0x1439b5]){var _0x3e37ae=window[_0xa8cd('0x1a')][_0xa8cd('0x73')][_0xa8cd('0x75')][_0x1439b5];'undefined'!==typeof _0x3e37ae[_0xa8cd('0xe0')]&&null!==_0x3e37ae[_0xa8cd('0xe0')]&&''!==_0x3e37ae[_0xa8cd('0xe0')]&&(window[_0xa8cd('0x71')][_0xa8cd('0x75')][_0xa8cd('0xe1')+_0x3e37ae[_0xa8cd('0xe0')]]=window[_0xa8cd('0x71')][_0xa8cd('0x75')][_0xa8cd('0xe1')+_0x3e37ae[_0xa8cd('0xe0')]]||{},window[_0xa8cd('0x71')][_0xa8cd('0x75')]['prod_'+_0x3e37ae[_0xa8cd('0xe0')]]['prodId']=_0x3e37ae['productId'],_0x556e8a[_0xa8cd('0xe1')+_0x3e37ae[_0xa8cd('0xe0')]]||(window[_0xa8cd('0x71')][_0xa8cd('0x75')]['prod_'+_0x3e37ae['productId']][_0xa8cd('0x67')]=0x0),window['_QuatroDigital_AmountProduct']['items'][_0xa8cd('0xe1')+_0x3e37ae[_0xa8cd('0xe0')]]['qtt']+=_0x3e37ae[_0xa8cd('0xe2')],_0x1c2a45=!0x0,_0x556e8a[_0xa8cd('0xe1')+_0x3e37ae[_0xa8cd('0xe0')]]=!0x0);}var _0x1439b5=_0x1c2a45;}else _0x1439b5=void 0x0;window[_0xa8cd('0x71')][_0xa8cd('0xdf')]&&(_0x255984(_0xa8cd('0xe3'))[_0xa8cd('0xb9')](),_0x255984(_0xa8cd('0xe4'))[_0xa8cd('0x36')]('qd-bap-item-added'));for(var _0x39555d in window[_0xa8cd('0x71')][_0xa8cd('0x75')]){_0x3e37ae=window[_0xa8cd('0x71')][_0xa8cd('0x75')][_0x39555d];if(_0xa8cd('0x13')!==typeof _0x3e37ae)return;_0x556e8a=_0x255984(_0xa8cd('0xe5')+_0x3e37ae[_0xa8cd('0xe6')]+']')[_0xa8cd('0x8f')]('li');if(window[_0xa8cd('0x71')][_0xa8cd('0xdf')]||!_0x556e8a[_0xa8cd('0x34')](_0xa8cd('0xe3'))['length'])_0x1c2a45=_0x255984('<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>'),_0x1c2a45[_0xa8cd('0x34')](_0xa8cd('0xe7'))[_0xa8cd('0x5c')](_0x3e37ae[_0xa8cd('0x67')]),_0x3e37ae=_0x556e8a[_0xa8cd('0x34')]('.qd_bap_wrapper_content'),_0x3e37ae[_0xa8cd('0x7')]?_0x3e37ae['prepend'](_0x1c2a45)[_0xa8cd('0x7b')](_0xa8cd('0xe8')):_0x556e8a['prepend'](_0x1c2a45);}_0x1439b5&&(window[_0xa8cd('0x71')]['allowRecalculate']=!0x1);};window[_0xa8cd('0x71')]['exec']=function(){window[_0xa8cd('0x71')]['allowRecalculate']=!0x0;_0xf84ec['call'](this);};_0x255984(document)[_0xa8cd('0xe9')](function(){_0xf84ec[_0xa8cd('0x62')](this);});}catch(_0x2e0661){'undefined'!==typeof console&&'function'===typeof console['error']&&console[_0xa8cd('0xe')](_0xa8cd('0xf'),_0x2e0661);}}(this));(function(){try{var _0x5b36a9=jQuery,_0x162c1d,_0x1e789b={'selector':_0xa8cd('0xea'),'dropDown':{},'buyButton':{}};_0x5b36a9['QD_smartCart']=function(_0x1a67db){var _0x672086={};_0x162c1d=_0x5b36a9[_0xa8cd('0x22')](!0x0,{},_0x1e789b,_0x1a67db);_0x1a67db=_0x5b36a9(_0x162c1d[_0xa8cd('0xeb')])[_0xa8cd('0x1c')](_0x162c1d[_0xa8cd('0xec')]);_0x672086[_0xa8cd('0xed')]=_0xa8cd('0x2')!==typeof _0x162c1d['dropDown'][_0xa8cd('0x4e')]&&!0x1===_0x162c1d[_0xa8cd('0xec')][_0xa8cd('0x4e')]?_0x5b36a9(_0x162c1d[_0xa8cd('0xeb')])['QD_buyButton'](_0x1a67db['fn'],_0x162c1d[_0xa8cd('0xed')]):_0x5b36a9(_0x162c1d[_0xa8cd('0xeb')])[_0xa8cd('0xee')](_0x162c1d[_0xa8cd('0xed')]);_0x672086['dropDown']=_0x1a67db;return _0x672086;};_0x5b36a9['fn'][_0xa8cd('0xef')]=function(){_0xa8cd('0x13')===typeof console&&_0xa8cd('0xd')===typeof console['info']&&console[_0xa8cd('0x11')](_0xa8cd('0xf0'));};_0x5b36a9[_0xa8cd('0xef')]=_0x5b36a9['fn']['smartCart'];}catch(_0x36ea8d){_0xa8cd('0x2')!==typeof console&&_0xa8cd('0xd')===typeof console[_0xa8cd('0xe')]&&console['error'](_0xa8cd('0xf'),_0x36ea8d);}}());

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0xa9e0=['youtube','attr','click','contentWindow','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','start','insertThumbsIn','appendTo','trigger','QuatroDigital.pv_video_added','ajaxStop','load','ImageControl','.qd-videoLink','body','object','alerta','toLowerCase','warn','info','[Video\x20in\x20product]\x20','error','qdVideoInProduct','ul.thumbs','div#image','text','replace','split','length','indexOf','push','pop','shift','be/','<div\x20class=\x22qd-playerWrapper\x22></div>','prependTo','#include','wrap','<div\x20class=\x22qd-playerContainer\x22></div>','fromCharCode','join','toUpperCase','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','html','<iframe\x20src=\x22','urlProtocol','://www.youtube.com/embed/','?wmode=transparent&rel=0&enablejsapi=1&autoplay=','autoPlay','&mute=','mute','data','height','stop','fadeTo','addClass','qdpv-video-on','add','animate','iframe','find','a:not(\x27.qd-videoLink\x27)','bind','click.removeVideo','hide','removeAttr','style','removeClass','.qd-videoItem','call','string','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','click.playVideo','controlVideo','.qd-playerWrapper\x20iframe','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','rel'];(function(_0x43d9d1,_0x4f4779){var _0x5c321d=function(_0x42079f){while(--_0x42079f){_0x43d9d1['push'](_0x43d9d1['shift']());}};_0x5c321d(++_0x4f4779);}(_0xa9e0,0x1a9));var _0x0a9e=function(_0x2b4d76,_0x47bf96){_0x2b4d76=_0x2b4d76-0x0;var _0x4230d8=_0xa9e0[_0x2b4d76];return _0x4230d8;};(function(_0x4a3682){$(function(){if($(document[_0x0a9e('0x0')])['is']('.produto')){var _0x333808=[];var _0x432180=function(_0x2ab90b,_0x991246){_0x0a9e('0x1')===typeof console&&('undefined'!==typeof _0x991246&&_0x0a9e('0x2')===_0x991246[_0x0a9e('0x3')]()?console[_0x0a9e('0x4')]('[Video\x20in\x20product]\x20'+_0x2ab90b):'undefined'!==typeof _0x991246&&_0x0a9e('0x5')===_0x991246['toLowerCase']()?console['info'](_0x0a9e('0x6')+_0x2ab90b):console[_0x0a9e('0x7')](_0x0a9e('0x6')+_0x2ab90b));};window[_0x0a9e('0x8')]=window[_0x0a9e('0x8')]||{};var _0xbd1168=$['extend'](!0x0,{'insertThumbsIn':'start','videoFieldSelector':'td.value-field.Videos:first','controlVideo':!0x0,'urlProtocol':'http','autoPlay':0x0,'mute':0x0},window[_0x0a9e('0x8')]);var _0x36471c=$(_0x0a9e('0x9'));var _0x26d672=$(_0x0a9e('0xa'));var _0x69aeb7=$(_0xbd1168['videoFieldSelector'])[_0x0a9e('0xb')]()[_0x0a9e('0xc')](/;\s*/,';')[_0x0a9e('0xd')](';');for(var _0x281129=0x0;_0x281129<_0x69aeb7[_0x0a9e('0xe')];_0x281129++)-0x1<_0x69aeb7[_0x281129][_0x0a9e('0xf')]('youtube')?_0x333808[_0x0a9e('0x10')](_0x69aeb7[_0x281129]['split']('v=')[_0x0a9e('0x11')]()['split'](/[&#]/)[_0x0a9e('0x12')]()):-0x1<_0x69aeb7[_0x281129][_0x0a9e('0xf')]('youtu.be')&&_0x333808[_0x0a9e('0x10')](_0x69aeb7[_0x281129]['split'](_0x0a9e('0x13'))[_0x0a9e('0x11')]()[_0x0a9e('0xd')](/[\?&#]/)[_0x0a9e('0x12')]());var _0x31b1ca=$(_0x0a9e('0x14'));_0x31b1ca[_0x0a9e('0x15')](_0x0a9e('0x16'));_0x31b1ca[_0x0a9e('0x17')](_0x0a9e('0x18'));_0x69aeb7=function(_0x1c696a){var _0x105080={'s':'yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x2c3407){var _0x155cce=function(_0x53682f){return _0x53682f;};var _0x20f109=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2c3407=_0x2c3407['d'+_0x20f109[0x10]+'c'+_0x20f109[0x11]+'m'+_0x155cce(_0x20f109[0x1])+'n'+_0x20f109[0xd]]['l'+_0x20f109[0x12]+'c'+_0x20f109[0x0]+'ti'+_0x155cce('o')+'n'];var _0x5a09ef=function(_0x588269){return escape(encodeURIComponent(_0x588269[_0x0a9e('0xc')](/\./g,'¨')[_0x0a9e('0xc')](/[a-zA-Z]/g,function(_0x38e7c4){return String[_0x0a9e('0x19')](('Z'>=_0x38e7c4?0x5a:0x7a)>=(_0x38e7c4=_0x38e7c4['charCodeAt'](0x0)+0xd)?_0x38e7c4:_0x38e7c4-0x1a);})));};var _0xfb6e48=_0x5a09ef(_0x2c3407[[_0x20f109[0x9],_0x155cce('o'),_0x20f109[0xc],_0x20f109[_0x155cce(0xd)]][_0x0a9e('0x1a')]('')]);_0x5a09ef=_0x5a09ef((window[['js',_0x155cce('no'),'m',_0x20f109[0x1],_0x20f109[0x4][_0x0a9e('0x1b')](),_0x0a9e('0x1c')][_0x0a9e('0x1a')]('')]||_0x0a9e('0x1d'))+['.v',_0x20f109[0xd],'e',_0x155cce('x'),'co',_0x155cce('mm'),_0x0a9e('0x1e'),_0x20f109[0x1],'.c',_0x155cce('o'),'m.',_0x20f109[0x13],'r']['join'](''));for(var _0x59181e in _0x105080){if(_0x5a09ef===_0x59181e+_0x105080[_0x59181e]||_0xfb6e48===_0x59181e+_0x105080[_0x59181e]){var _0x197ec0='tr'+_0x20f109[0x11]+'e';break;}_0x197ec0='f'+_0x20f109[0x0]+'ls'+_0x155cce(_0x20f109[0x1])+'';}_0x155cce=!0x1;-0x1<_0x2c3407[[_0x20f109[0xc],'e',_0x20f109[0x0],'rc',_0x20f109[0x9]][_0x0a9e('0x1a')]('')][_0x0a9e('0xf')](_0x0a9e('0x1f'))&&(_0x155cce=!0x0);return[_0x197ec0,_0x155cce];}(_0x1c696a);}(window);if(!eval(_0x69aeb7[0x0]))return _0x69aeb7[0x1]?_0x432180('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x384319=function(_0x479bc4,_0x45a1e7){'youtube'===_0x45a1e7&&_0x31b1ca[_0x0a9e('0x20')](_0x0a9e('0x21')+_0xbd1168[_0x0a9e('0x22')]+_0x0a9e('0x23')+_0x479bc4+_0x0a9e('0x24')+_0xbd1168[_0x0a9e('0x25')]+_0x0a9e('0x26')+_0xbd1168[_0x0a9e('0x27')]+'\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>');_0x26d672[_0x0a9e('0x28')](_0x0a9e('0x29'),_0x26d672[_0x0a9e('0x28')](_0x0a9e('0x29'))||_0x26d672['height']());_0x26d672[_0x0a9e('0x2a')](!0x0,!0x0)[_0x0a9e('0x2b')](0x1f4,0x0,function(){$(_0x0a9e('0x0'))[_0x0a9e('0x2c')](_0x0a9e('0x2d'));});_0x31b1ca[_0x0a9e('0x2a')](!0x0,!0x0)[_0x0a9e('0x2b')](0x1f4,0x1,function(){_0x26d672[_0x0a9e('0x2e')](_0x31b1ca)[_0x0a9e('0x2f')]({'height':_0x31b1ca['find'](_0x0a9e('0x30'))['height']()},0x2bc);});};removePlayer=function(){_0x36471c[_0x0a9e('0x31')](_0x0a9e('0x32'))[_0x0a9e('0x33')](_0x0a9e('0x34'),function(){_0x31b1ca[_0x0a9e('0x2a')](!0x0,!0x0)['fadeTo'](0x1f4,0x0,function(){$(this)[_0x0a9e('0x35')]()[_0x0a9e('0x36')](_0x0a9e('0x37'));$(_0x0a9e('0x0'))[_0x0a9e('0x38')](_0x0a9e('0x2d'));});_0x26d672[_0x0a9e('0x2a')](!0x0,!0x0)[_0x0a9e('0x2b')](0x1f4,0x1,function(){var _0x5583a4=_0x26d672[_0x0a9e('0x28')]('height');_0x5583a4&&_0x26d672[_0x0a9e('0x2f')]({'height':_0x5583a4},0x2bc);});});};var _0x14b13f=function(){if(!_0x36471c[_0x0a9e('0x31')](_0x0a9e('0x39'))['length'])for(vId in removePlayer[_0x0a9e('0x3a')](this),_0x333808)if(_0x0a9e('0x3b')===typeof _0x333808[vId]&&''!==_0x333808[vId]){var _0x1fa90d=$(_0x0a9e('0x3c')+_0x333808[vId]+'/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27'+_0x333808[vId]+'\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/'+_0x333808[vId]+_0x0a9e('0x3d'));_0x1fa90d['find']('a')[_0x0a9e('0x33')](_0x0a9e('0x3e'),function(){var _0x381c37=$(this);_0x36471c[_0x0a9e('0x31')]('.ON')[_0x0a9e('0x38')]('ON');_0x381c37[_0x0a9e('0x2c')]('ON');0x1==_0xbd1168[_0x0a9e('0x3f')]?$('.qd-playerWrapper\x20iframe')[_0x0a9e('0xe')]?(_0x384319[_0x0a9e('0x3a')](this,'',''),$(_0x0a9e('0x40'))[0x0]['contentWindow']['postMessage'](_0x0a9e('0x41'),'*')):_0x384319[_0x0a9e('0x3a')](this,_0x381c37['attr'](_0x0a9e('0x42')),_0x0a9e('0x43')):_0x384319[_0x0a9e('0x3a')](this,_0x381c37[_0x0a9e('0x44')]('rel'),'youtube');return!0x1;});0x1==_0xbd1168[_0x0a9e('0x3f')]&&_0x36471c[_0x0a9e('0x31')]('a:not(.qd-videoLink)')[_0x0a9e('0x45')](function(_0x1dec2e){$(_0x0a9e('0x40'))['length']&&$(_0x0a9e('0x40'))[0x0][_0x0a9e('0x46')][_0x0a9e('0x47')](_0x0a9e('0x48'),'*');});_0x0a9e('0x49')===_0xbd1168[_0x0a9e('0x4a')]?_0x1fa90d[_0x0a9e('0x15')](_0x36471c):_0x1fa90d[_0x0a9e('0x4b')](_0x36471c);_0x1fa90d[_0x0a9e('0x4c')](_0x0a9e('0x4d'),[_0x333808[vId],_0x1fa90d]);}};$(document)[_0x0a9e('0x4e')](_0x14b13f);$(window)[_0x0a9e('0x4f')](_0x14b13f);(function(){var _0x1a7bce=this;var _0x11ca30=window[_0x0a9e('0x50')]||function(){};window['ImageControl']=function(_0x52628e,_0x473fdc){$(_0x52628e||'')['is'](_0x0a9e('0x51'))||(_0x11ca30[_0x0a9e('0x3a')](this,_0x52628e,_0x473fdc),_0x14b13f[_0x0a9e('0x3a')](_0x1a7bce));};}());}});}(this));

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
var _0xbf98=['apply','.qd_sil_img_wrapper','300','QD_SIL_scroll\x20QuatroDigital.is_Callback','not','img:visible','length','scrollTop','top','height','first','Problemas\x20:(\x20.\x20Detalhes:\x20','clone','load','addClass','attr','src','sizes','width','qd-sil-image','insertAfter','closest','imageWrapper','offset','bottom','each','QD_SIL_scrollRange','scroll','documentElement','trigger','QD_SIL_scroll','QD_smartImageLoad','function','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','charCodeAt','ite','erc','join','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Quatro\x20Digital\x20-\x20Smart\x20Image\x20Load','object','undefined','error','info','warn','unshift','alerta','toLowerCase'];(function(_0x423d29,_0xc81e50){var _0x3c884a=function(_0x4d2fb9){while(--_0x4d2fb9){_0x423d29['push'](_0x423d29['shift']());}};_0x3c884a(++_0xc81e50);}(_0xbf98,0x85));var _0x8bf9=function(_0x42b12c,_0xafc95c){_0x42b12c=_0x42b12c-0x0;var _0x5797bc=_0xbf98[_0x42b12c];return _0x5797bc;};(function(_0x3474a6){'use strict';var _0x311eef=jQuery;if(typeof _0x311eef['fn'][_0x8bf9('0x0')]===_0x8bf9('0x1'))return;_0x311eef['fn'][_0x8bf9('0x0')]=function(){};var _0x1a9524=function(_0x22da2c){var _0x58f7e5={'s':_0x8bf9('0x2')};return function(_0x4cd0db){var _0x2e6880,_0x11e373,_0x42e00d,_0x51fc2f;_0x11e373=function(_0x379bfc){return _0x379bfc;};_0x42e00d=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4cd0db=_0x4cd0db['d'+_0x42e00d[0x10]+'c'+_0x42e00d[0x11]+'m'+_0x11e373(_0x42e00d[0x1])+'n'+_0x42e00d[0xd]]['l'+_0x42e00d[0x12]+'c'+_0x42e00d[0x0]+'ti'+_0x11e373('o')+'n'];_0x2e6880=function(_0x43d577){return escape(encodeURIComponent(_0x43d577[_0x8bf9('0x3')](/\./g,'¨')[_0x8bf9('0x3')](/[a-zA-Z]/g,function(_0x22a1c8){return String['fromCharCode'](('Z'>=_0x22a1c8?0x5a:0x7a)>=(_0x22a1c8=_0x22a1c8[_0x8bf9('0x4')](0x0)+0xd)?_0x22a1c8:_0x22a1c8-0x1a);})));};var _0x2e22c=_0x2e6880(_0x4cd0db[[_0x42e00d[0x9],_0x11e373('o'),_0x42e00d[0xc],_0x42e00d[_0x11e373(0xd)]]['join']('')]);_0x2e6880=_0x2e6880((window[['js',_0x11e373('no'),'m',_0x42e00d[0x1],_0x42e00d[0x4]['toUpperCase'](),_0x8bf9('0x5')]['join']('')]||'---')+['.v',_0x42e00d[0xd],'e',_0x11e373('x'),'co',_0x11e373('mm'),_0x8bf9('0x6'),_0x42e00d[0x1],'.c',_0x11e373('o'),'m.',_0x42e00d[0x13],'r'][_0x8bf9('0x7')](''));for(var _0x41e022 in _0x58f7e5){if(_0x2e6880===_0x41e022+_0x58f7e5[_0x41e022]||_0x2e22c===_0x41e022+_0x58f7e5[_0x41e022]){_0x51fc2f='tr'+_0x42e00d[0x11]+'e';break;}_0x51fc2f='f'+_0x42e00d[0x0]+'ls'+_0x11e373(_0x42e00d[0x1])+'';}_0x11e373=!0x1;-0x1<_0x4cd0db[[_0x42e00d[0xc],'e',_0x42e00d[0x0],'rc',_0x42e00d[0x9]][_0x8bf9('0x7')]('')][_0x8bf9('0x8')](_0x8bf9('0x9'))&&(_0x11e373=!0x0);return[_0x51fc2f,_0x11e373];}(_0x22da2c);}(window);if(!eval(_0x1a9524[0x0]))return _0x1a9524[0x1]?_0x3b6c39(_0x8bf9('0xa')):!0x1;var _0x124c35=_0x8bf9('0xb');var _0x3b6c39=function(_0x5a906a,_0x2a1d9e){if(_0x8bf9('0xc')===typeof console&&_0x8bf9('0xd')!==typeof console[_0x8bf9('0xe')]&&'undefined'!==typeof console[_0x8bf9('0xf')]&&_0x8bf9('0xd')!==typeof console[_0x8bf9('0x10')]){if('object'==typeof _0x5a906a&&_0x8bf9('0x1')==typeof _0x5a906a[_0x8bf9('0x11')]){_0x5a906a['unshift']('['+_0x124c35+']\x0a');var _0x2fe737=_0x5a906a;}else _0x2fe737=['['+_0x124c35+']\x0a',_0x5a906a];if(_0x8bf9('0xd')==typeof _0x2a1d9e||_0x8bf9('0x12')!==_0x2a1d9e['toLowerCase']()&&'aviso'!==_0x2a1d9e['toLowerCase']())if(_0x8bf9('0xd')!=typeof _0x2a1d9e&&_0x8bf9('0xf')==_0x2a1d9e[_0x8bf9('0x13')]())try{console[_0x8bf9('0xf')][_0x8bf9('0x14')](console,_0x2fe737);}catch(_0x2d4b26){try{console[_0x8bf9('0xf')](_0x2fe737[_0x8bf9('0x7')]('\x0a'));}catch(_0x5daaaa){}}else try{console[_0x8bf9('0xe')][_0x8bf9('0x14')](console,_0x2fe737);}catch(_0x2ff7c2){try{console[_0x8bf9('0xe')](_0x2fe737[_0x8bf9('0x7')]('\x0a'));}catch(_0x348034){}}else try{console['warn'][_0x8bf9('0x14')](console,_0x2fe737);}catch(_0x24d139){try{console[_0x8bf9('0x10')](_0x2fe737[_0x8bf9('0x7')]('\x0a'));}catch(_0x148a81){}}}};var _0x2387cc=/(ids\/[0-9]+-)[0-9-]+/i;var _0x2849bd={'imageWrapper':_0x8bf9('0x15'),'sizes':{'width':_0x8bf9('0x16'),'height':'300'}};var _0xb31825=function(_0x20f75f,_0x174c71){'use strict';_0x5e7428();_0x311eef(window)['on'](_0x8bf9('0x17'),_0x5e7428);function _0x5e7428(){try{var _0x5a8d42=_0x20f75f['find'](_0x174c71['imageWrapper'])[_0x8bf9('0x18')]('.qd-sil-on')['find'](_0x8bf9('0x19'));if(!_0x5a8d42[_0x8bf9('0x1a')])return;var _0x347b08=_0x311eef(window);var _0x47d7e7={'top':_0x347b08[_0x8bf9('0x1b')]()};_0x47d7e7['bottom']=_0x47d7e7[_0x8bf9('0x1c')]+_0x347b08[_0x8bf9('0x1d')]();var _0x382341=_0x5a8d42[_0x8bf9('0x1e')]()[_0x8bf9('0x1d')]();var _0x18a310=_0xcc5cfc(_0x5a8d42,_0x47d7e7,_0x382341);for(var _0x4f54db=0x0;_0x4f54db<_0x18a310[_0x8bf9('0x1a')];_0x4f54db++)_0x22477c(_0x311eef(_0x18a310[_0x4f54db]));}catch(_0x142bb8){typeof console!==_0x8bf9('0xd')&&typeof console['error']===_0x8bf9('0x1')&&console['error'](_0x8bf9('0x1f'),_0x142bb8);}}function _0x22477c(_0x45d52b){var _0x31ca16=_0x45d52b[_0x8bf9('0x20')]();_0x31ca16['on'](_0x8bf9('0x21'),function(){_0x311eef(this)[_0x8bf9('0x22')]('qd-sil-image-loaded');});_0x31ca16[_0x8bf9('0x23')]({'src':_0x31ca16[0x0][_0x8bf9('0x24')]['replace'](_0x2387cc,'$1'+_0x174c71[_0x8bf9('0x25')][_0x8bf9('0x26')]+'-'+_0x174c71[_0x8bf9('0x25')][_0x8bf9('0x1d')]),'width':_0x174c71[_0x8bf9('0x25')]['width'],'height':_0x174c71[_0x8bf9('0x25')][_0x8bf9('0x1d')]});_0x31ca16[_0x8bf9('0x22')](_0x8bf9('0x27'))[_0x8bf9('0x28')](_0x45d52b);_0x31ca16[_0x8bf9('0x29')](_0x174c71[_0x8bf9('0x2a')])['addClass']('qd-sil-on');}function _0xcc5cfc(_0xb8d20f,_0x1ea130,_0xc1157f){var _0x7dbe7d;var _0x5b903a=[];for(var _0x37564e=0x0;_0x37564e<_0xb8d20f[_0x8bf9('0x1a')];_0x37564e++){_0x7dbe7d=_0x311eef(_0xb8d20f[_0x37564e])[_0x8bf9('0x2b')]();_0x7dbe7d[_0x8bf9('0x2c')]=_0x7dbe7d[_0x8bf9('0x1c')]+_0xc1157f;if(!(_0x1ea130[_0x8bf9('0x2c')]<_0x7dbe7d[_0x8bf9('0x1c')]||_0x1ea130[_0x8bf9('0x1c')]>_0x7dbe7d[_0x8bf9('0x2c')])){_0x5b903a['push'](_0xb8d20f[_0x37564e]);}}return _0x5b903a;};};_0x311eef['fn'][_0x8bf9('0x0')]=function(_0x2782bd){var _0x17791f=_0x311eef(this);if(!_0x17791f[_0x8bf9('0x1a')])return _0x17791f;_0x17791f[_0x8bf9('0x2d')](function(){var _0x240592=_0x311eef(this);_0x240592[_0x8bf9('0x0')]=new _0xb31825(_0x240592,_0x311eef['extend']({},_0x2849bd,_0x2782bd));});return _0x17791f;};window[_0x8bf9('0x2e')]=0x28;var _0x582144=QD_SIL_scrollRange;var _0x3fc3a3=0x0;_0x311eef(window)['on'](_0x8bf9('0x2f'),function(){var _0x46afb7=document[_0x8bf9('0x30')]['scrollTop'];if(_0x46afb7>_0x3fc3a3+_0x582144||_0x46afb7<_0x3fc3a3-_0x582144){_0x311eef(window)[_0x8bf9('0x31')](_0x8bf9('0x32'));_0x3fc3a3=_0x46afb7;}});}(this));