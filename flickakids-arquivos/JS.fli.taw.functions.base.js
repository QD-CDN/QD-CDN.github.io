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
var _0x800e=['errorPopulated','completePopulated','object','error','clearQueueDelay','jqXHR','undefined','ajax','readyState','data','textStatus','errorThrown','version','2.1','/produto/sku/','QD_smartStockAvailable','unshift','aviso','toLowerCase','info','apply','warn','removeClass','qd-ssa-sku-no-selected','addClass','qd-ssa-sku-selected','AvailableQuantity','attr','data-qd-ssa-qtt','find','hide','qd-ssa-hide','qd-ssa-show','filter','[data-qd-ssa-text=\x22','length','replace','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','message','qd-ssa-on','qd-ssa-skus-','split','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','SkuSellersInformation','trigger','QuatroDigital.ssa.prodUnavailable','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','vtex.sku.selected.QD','qd-ssa-sku-prod-unavailable','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','join','toUpperCase','ite','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','qdPlugin','initialSkuSelected','QuatroDigital.ssa.skuSelected','prod','sku','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','unavailable','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','off','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','function','qdAjax','qdAjaxQueue','extend','opts','push','success','call','complete','parameters','successPopulated','boolean','callbackFns'];(function(_0x39f7c4,_0x3ab3c4){var _0x1b5ef8=function(_0x16bc86){while(--_0x16bc86){_0x39f7c4['push'](_0x39f7c4['shift']());}};_0x1b5ef8(++_0x3ab3c4);}(_0x800e,0xe6));var _0xe800=function(_0x3c2172,_0x19a195){_0x3c2172=_0x3c2172-0x0;var _0x1ece7b=_0x800e[_0x3c2172];return _0x1ece7b;};(function(_0x34df9b){if(_0xe800('0x0')!==typeof _0x34df9b[_0xe800('0x1')]){var _0x15b38f={};_0x34df9b[_0xe800('0x2')]=_0x15b38f;_0x34df9b[_0xe800('0x1')]=function(_0x59c958){var _0x4efb51=_0x34df9b[_0xe800('0x3')]({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x59c958);var _0x2bcb18=escape(encodeURIComponent(_0x4efb51['url']));_0x15b38f[_0x2bcb18]=_0x15b38f[_0x2bcb18]||{};_0x15b38f[_0x2bcb18][_0xe800('0x4')]=_0x15b38f[_0x2bcb18][_0xe800('0x4')]||[];_0x15b38f[_0x2bcb18][_0xe800('0x4')][_0xe800('0x5')]({'success':function(_0x4e2143,_0xe4c159,_0x4abe08){_0x4efb51[_0xe800('0x6')]['call'](this,_0x4e2143,_0xe4c159,_0x4abe08);},'error':function(_0x4069b4,_0x5542ff,_0x9f92a7){_0x4efb51['error'][_0xe800('0x7')](this,_0x4069b4,_0x5542ff,_0x9f92a7);},'complete':function(_0x52097f,_0xc1e3b1){_0x4efb51[_0xe800('0x8')][_0xe800('0x7')](this,_0x52097f,_0xc1e3b1);}});_0x15b38f[_0x2bcb18][_0xe800('0x9')]=_0x15b38f[_0x2bcb18][_0xe800('0x9')]||{'success':{},'error':{},'complete':{}};_0x15b38f[_0x2bcb18]['callbackFns']=_0x15b38f[_0x2bcb18]['callbackFns']||{};_0x15b38f[_0x2bcb18]['callbackFns'][_0xe800('0xa')]=_0xe800('0xb')===typeof _0x15b38f[_0x2bcb18]['callbackFns']['successPopulated']?_0x15b38f[_0x2bcb18]['callbackFns'][_0xe800('0xa')]:!0x1;_0x15b38f[_0x2bcb18][_0xe800('0xc')][_0xe800('0xd')]=_0xe800('0xb')===typeof _0x15b38f[_0x2bcb18]['callbackFns'][_0xe800('0xd')]?_0x15b38f[_0x2bcb18][_0xe800('0xc')][_0xe800('0xd')]:!0x1;_0x15b38f[_0x2bcb18][_0xe800('0xc')]['completePopulated']=_0xe800('0xb')===typeof _0x15b38f[_0x2bcb18]['callbackFns']['completePopulated']?_0x15b38f[_0x2bcb18]['callbackFns'][_0xe800('0xe')]:!0x1;_0x59c958=_0x34df9b['extend']({},_0x4efb51,{'success':function(_0x2340fe,_0x1c6d07,_0x1925ed){_0x15b38f[_0x2bcb18][_0xe800('0x9')][_0xe800('0x6')]={'data':_0x2340fe,'textStatus':_0x1c6d07,'jqXHR':_0x1925ed};_0x15b38f[_0x2bcb18][_0xe800('0xc')][_0xe800('0xa')]=!0x0;for(var _0x1c55cb in _0x15b38f[_0x2bcb18][_0xe800('0x4')])_0xe800('0xf')===typeof _0x15b38f[_0x2bcb18][_0xe800('0x4')][_0x1c55cb]&&(_0x15b38f[_0x2bcb18][_0xe800('0x4')][_0x1c55cb][_0xe800('0x6')][_0xe800('0x7')](this,_0x2340fe,_0x1c6d07,_0x1925ed),_0x15b38f[_0x2bcb18][_0xe800('0x4')][_0x1c55cb][_0xe800('0x6')]=function(){});},'error':function(_0x5c23f5,_0x184f84,_0xa3cff2){_0x15b38f[_0x2bcb18][_0xe800('0x9')][_0xe800('0x10')]={'errorThrown':_0xa3cff2,'textStatus':_0x184f84,'jqXHR':_0x5c23f5};_0x15b38f[_0x2bcb18][_0xe800('0xc')][_0xe800('0xd')]=!0x0;for(var _0x112880 in _0x15b38f[_0x2bcb18][_0xe800('0x4')])_0xe800('0xf')===typeof _0x15b38f[_0x2bcb18][_0xe800('0x4')][_0x112880]&&(_0x15b38f[_0x2bcb18][_0xe800('0x4')][_0x112880][_0xe800('0x10')][_0xe800('0x7')](this,_0x5c23f5,_0x184f84,_0xa3cff2),_0x15b38f[_0x2bcb18][_0xe800('0x4')][_0x112880][_0xe800('0x10')]=function(){});},'complete':function(_0x54dfef,_0x2a762e){_0x15b38f[_0x2bcb18]['parameters']['complete']={'textStatus':_0x2a762e,'jqXHR':_0x54dfef};_0x15b38f[_0x2bcb18][_0xe800('0xc')]['completePopulated']=!0x0;for(var _0x2e8f1a in _0x15b38f[_0x2bcb18]['opts'])'object'===typeof _0x15b38f[_0x2bcb18]['opts'][_0x2e8f1a]&&(_0x15b38f[_0x2bcb18][_0xe800('0x4')][_0x2e8f1a][_0xe800('0x8')]['call'](this,_0x54dfef,_0x2a762e),_0x15b38f[_0x2bcb18][_0xe800('0x4')][_0x2e8f1a][_0xe800('0x8')]=function(){});isNaN(parseInt(_0x4efb51[_0xe800('0x11')]))||setTimeout(function(){_0x15b38f[_0x2bcb18][_0xe800('0x12')]=void 0x0;_0x15b38f[_0x2bcb18][_0xe800('0x4')]=void 0x0;_0x15b38f[_0x2bcb18][_0xe800('0x9')]=void 0x0;_0x15b38f[_0x2bcb18][_0xe800('0xc')]=void 0x0;},_0x4efb51['clearQueueDelay']);}});_0xe800('0x13')===typeof _0x15b38f[_0x2bcb18][_0xe800('0x12')]?_0x15b38f[_0x2bcb18][_0xe800('0x12')]=_0x34df9b[_0xe800('0x14')](_0x59c958):_0x15b38f[_0x2bcb18][_0xe800('0x12')]&&_0x15b38f[_0x2bcb18][_0xe800('0x12')][_0xe800('0x15')]&&0x4==_0x15b38f[_0x2bcb18][_0xe800('0x12')]['readyState']&&(_0x15b38f[_0x2bcb18][_0xe800('0xc')][_0xe800('0xa')]&&_0x59c958['success'](_0x15b38f[_0x2bcb18][_0xe800('0x9')][_0xe800('0x6')][_0xe800('0x16')],_0x15b38f[_0x2bcb18]['parameters']['success'][_0xe800('0x17')],_0x15b38f[_0x2bcb18][_0xe800('0x9')]['success']['jqXHR']),_0x15b38f[_0x2bcb18][_0xe800('0xc')][_0xe800('0xd')]&&_0x59c958['error'](_0x15b38f[_0x2bcb18][_0xe800('0x9')][_0xe800('0x10')][_0xe800('0x12')],_0x15b38f[_0x2bcb18][_0xe800('0x9')][_0xe800('0x10')][_0xe800('0x17')],_0x15b38f[_0x2bcb18]['parameters'][_0xe800('0x10')][_0xe800('0x18')]),_0x15b38f[_0x2bcb18]['callbackFns'][_0xe800('0xe')]&&_0x59c958[_0xe800('0x8')](_0x15b38f[_0x2bcb18][_0xe800('0x9')]['complete'][_0xe800('0x12')],_0x15b38f[_0x2bcb18][_0xe800('0x9')][_0xe800('0x8')][_0xe800('0x17')]));};_0x34df9b[_0xe800('0x1')][_0xe800('0x19')]=_0xe800('0x1a');}}(jQuery));(function(_0x2af5a3){function _0x3853bd(_0x394a76,_0x24e3c6){_0x57bacd[_0xe800('0x1')]({'url':_0xe800('0x1b')+_0x394a76,'clearQueueDelay':null,'success':_0x24e3c6,'error':function(){_0x3695e9('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!');}});}var _0x57bacd=jQuery;if(_0xe800('0x0')!==typeof _0x57bacd['fn'][_0xe800('0x1c')]){var _0x3695e9=function(_0x5f0dca,_0x3f3095){if(_0xe800('0xf')===typeof console){var _0x4c47f5;'object'===typeof _0x5f0dca?(_0x5f0dca[_0xe800('0x1d')]('[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a'),_0x4c47f5=_0x5f0dca):_0x4c47f5=['[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a'+_0x5f0dca];_0xe800('0x13')===typeof _0x3f3095||'alerta'!==_0x3f3095['toLowerCase']()&&_0xe800('0x1e')!==_0x3f3095[_0xe800('0x1f')]()?_0xe800('0x13')!==typeof _0x3f3095&&'info'===_0x3f3095[_0xe800('0x1f')]()?console[_0xe800('0x20')][_0xe800('0x21')](console,_0x4c47f5):console[_0xe800('0x10')]['apply'](console,_0x4c47f5):console[_0xe800('0x22')][_0xe800('0x21')](console,_0x4c47f5);}},_0x21c409={},_0x393d60=function(_0x359fbb,_0x255452){function _0x1db4c5(_0x91568b){try{_0x359fbb[_0xe800('0x23')](_0xe800('0x24'))[_0xe800('0x25')](_0xe800('0x26'));var _0xda551b=_0x91568b[0x0]['SkuSellersInformation'][0x0][_0xe800('0x27')];_0x359fbb[_0xe800('0x28')](_0xe800('0x29'),_0xda551b);_0x359fbb['each'](function(){var _0x359fbb=_0x57bacd(this)[_0xe800('0x2a')]('[data-qd-ssa-text]');if(0x1>_0xda551b)return _0x359fbb[_0xe800('0x2b')]()[_0xe800('0x25')](_0xe800('0x2c'))[_0xe800('0x23')](_0xe800('0x2d'));var _0x91568b=_0x359fbb[_0xe800('0x2e')](_0xe800('0x2f')+_0xda551b+'\x22]');_0x91568b=_0x91568b[_0xe800('0x30')]?_0x91568b:_0x359fbb[_0xe800('0x2e')]('[data-qd-ssa-text=\x22default\x22]');_0x359fbb[_0xe800('0x2b')]()[_0xe800('0x25')](_0xe800('0x2c'))['removeClass'](_0xe800('0x2d'));_0x91568b['html']((_0x91568b['html']()||'')[_0xe800('0x31')]('#qtt',_0xda551b));_0x91568b['show']()[_0xe800('0x25')](_0xe800('0x2d'))[_0xe800('0x23')](_0xe800('0x2c'));});}catch(_0x2825b2){_0x3695e9([_0xe800('0x32'),_0x2825b2[_0xe800('0x33')]]);}}if(_0x359fbb[_0xe800('0x30')]){_0x359fbb['addClass'](_0xe800('0x34'));_0x359fbb[_0xe800('0x25')](_0xe800('0x24'));try{_0x359fbb['addClass'](_0xe800('0x35')+vtxctx['skus'][_0xe800('0x36')](';')[_0xe800('0x30')]);}catch(_0x49a1c3){_0x3695e9([_0xe800('0x37'),_0x49a1c3['message']]);}_0x57bacd(window)['on']('vtex.sku.selected\x20QuatroDigital.ssa.skuSelected',function(_0x5bc53a,_0x15cfa5,_0x5b504a){try{_0x3853bd(_0x5b504a['sku'],function(_0x22daca){_0x1db4c5(_0x22daca);0x1===vtxctx['skus'][_0xe800('0x36')](';')[_0xe800('0x30')]&&0x0==_0x22daca[0x0][_0xe800('0x38')][0x0][_0xe800('0x27')]&&_0x57bacd(window)[_0xe800('0x39')](_0xe800('0x3a'));});}catch(_0x11d1c0){_0x3695e9([_0xe800('0x3b'),_0x11d1c0[_0xe800('0x33')]]);}});_0x57bacd(window)['off'](_0xe800('0x3c'));_0x57bacd(window)['on'](_0xe800('0x3a'),function(){_0x359fbb[_0xe800('0x25')](_0xe800('0x3d'))['hide']();});}};_0x2af5a3=function(_0x155b8e){var _0x1cec47={'s':_0xe800('0x3e')};return function(_0x15f706){var _0x45e1f1=function(_0x3c1169){return _0x3c1169;};var _0x5ca976=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x15f706=_0x15f706['d'+_0x5ca976[0x10]+'c'+_0x5ca976[0x11]+'m'+_0x45e1f1(_0x5ca976[0x1])+'n'+_0x5ca976[0xd]]['l'+_0x5ca976[0x12]+'c'+_0x5ca976[0x0]+'ti'+_0x45e1f1('o')+'n'];var _0x2e610d=function(_0x470bf7){return escape(encodeURIComponent(_0x470bf7[_0xe800('0x31')](/\./g,'¨')[_0xe800('0x31')](/[a-zA-Z]/g,function(_0x3ef67c){return String[_0xe800('0x3f')](('Z'>=_0x3ef67c?0x5a:0x7a)>=(_0x3ef67c=_0x3ef67c['charCodeAt'](0x0)+0xd)?_0x3ef67c:_0x3ef67c-0x1a);})));};var _0x5a2a36=_0x2e610d(_0x15f706[[_0x5ca976[0x9],_0x45e1f1('o'),_0x5ca976[0xc],_0x5ca976[_0x45e1f1(0xd)]][_0xe800('0x40')]('')]);_0x2e610d=_0x2e610d((window[['js',_0x45e1f1('no'),'m',_0x5ca976[0x1],_0x5ca976[0x4][_0xe800('0x41')](),_0xe800('0x42')][_0xe800('0x40')]('')]||'---')+['.v',_0x5ca976[0xd],'e',_0x45e1f1('x'),'co',_0x45e1f1('mm'),_0xe800('0x43'),_0x5ca976[0x1],'.c',_0x45e1f1('o'),'m.',_0x5ca976[0x13],'r'][_0xe800('0x40')](''));for(var _0x13af86 in _0x1cec47){if(_0x2e610d===_0x13af86+_0x1cec47[_0x13af86]||_0x5a2a36===_0x13af86+_0x1cec47[_0x13af86]){var _0x5515b6='tr'+_0x5ca976[0x11]+'e';break;}_0x5515b6='f'+_0x5ca976[0x0]+'ls'+_0x45e1f1(_0x5ca976[0x1])+'';}_0x45e1f1=!0x1;-0x1<_0x15f706[[_0x5ca976[0xc],'e',_0x5ca976[0x0],'rc',_0x5ca976[0x9]][_0xe800('0x40')]('')]['indexOf'](_0xe800('0x44'))&&(_0x45e1f1=!0x0);return[_0x5515b6,_0x45e1f1];}(_0x155b8e);}(window);if(!eval(_0x2af5a3[0x0]))return _0x2af5a3[0x1]?_0x3695e9('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x57bacd['fn'][_0xe800('0x1c')]=function(_0x234870){var _0x5242c8=_0x57bacd(this);_0x234870=_0x57bacd[_0xe800('0x3')](!0x0,{},_0x21c409,_0x234870);_0x5242c8[_0xe800('0x45')]=new _0x393d60(_0x5242c8,_0x234870);try{'object'===typeof _0x57bacd['fn']['QD_smartStockAvailable'][_0xe800('0x46')]&&_0x57bacd(window)[_0xe800('0x39')](_0xe800('0x47'),[_0x57bacd['fn']['QD_smartStockAvailable'][_0xe800('0x46')][_0xe800('0x48')],_0x57bacd['fn']['QD_smartStockAvailable'][_0xe800('0x46')][_0xe800('0x49')]]);}catch(_0x4f24b){_0x3695e9([_0xe800('0x4a'),_0x4f24b['message']]);}_0x57bacd['fn'][_0xe800('0x1c')][_0xe800('0x4b')]&&_0x57bacd(window)['trigger']('QuatroDigital.ssa.prodUnavailable');return _0x5242c8;};_0x57bacd(window)['on'](_0xe800('0x3c'),function(_0x4bc4d1,_0x53c075,_0x2d9eda){try{_0x57bacd['fn']['QD_smartStockAvailable'][_0xe800('0x46')]={'prod':_0x53c075,'sku':_0x2d9eda},_0x57bacd(this)['off'](_0x4bc4d1);}catch(_0x2dde0d){_0x3695e9([_0xe800('0x4c'),_0x2dde0d[_0xe800('0x33')]]);}});_0x57bacd(window)['on'](_0xe800('0x4d'),function(_0xe11cbe,_0x1c9be6,_0x4cc87b){try{for(var _0x66afaa=_0x4cc87b['length'],_0x4e3f62=_0x1c9be6=0x0;_0x4e3f62<_0x66afaa&&!_0x4cc87b[_0x4e3f62]['available'];_0x4e3f62++)_0x1c9be6+=0x1;_0x66afaa<=_0x1c9be6&&(_0x57bacd['fn'][_0xe800('0x1c')][_0xe800('0x4b')]=!0x0);_0x57bacd(this)[_0xe800('0x4e')](_0xe11cbe);}catch(_0x1afc50){_0x3695e9([_0xe800('0x4f'),_0x1afc50['message']]);}});_0x57bacd(function(){_0x57bacd(_0xe800('0x50'))[_0xe800('0x1c')]();});}}(window));
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
var _0x2aee=['trim','getParent','[class*=\x27colunas\x27]','insertBefore','hide','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','ajaxCallback','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','children',':not(ul)','qd-am-elem-','text','replaceSpecialChars','>li','qd-amazing-menu','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','add','qd-am-','call','extend','exec','.qd_amazing_menu_auto','/qd-amazing-menu','undefined','info','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','toLowerCase','apply','join','error','qdAmAddNdx','each','qd-am-li-','first','addClass','qd-am-first','last','qd-am-last','QD_amazingMenu','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','length','parent','qd-am-banner-wrapper','qdAjax','url','img[alt=\x27','attr','data-qdam-value','qd-am-content-loaded'];(function(_0x3c2172,_0x19a195){var _0x1ece7b=function(_0x4d2c13){while(--_0x4d2c13){_0x3c2172['push'](_0x3c2172['shift']());}};_0x1ece7b(++_0x19a195);}(_0x2aee,0x135));var _0xe2ae=function(_0x13dc30,_0x5c50c3){_0x13dc30=_0x13dc30-0x0;var _0x28334d=_0x2aee[_0x13dc30];return _0x28334d;};(function(_0x286923){_0x286923['fn']['getParent']=_0x286923['fn']['closest'];}(jQuery));(function(_0x1f24e8){var _0x98b722;var _0x3e0b0a=jQuery;if('function'!==typeof _0x3e0b0a['fn']['QD_amazingMenu']){var _0x296991={'url':_0xe2ae('0x0'),'callback':function(){},'ajaxCallback':function(){}};var _0x1c3c56=function(_0x222876,_0x171bde){if('object'===typeof console&&_0xe2ae('0x1')!==typeof console['error']&&_0xe2ae('0x1')!==typeof console[_0xe2ae('0x2')]&&_0xe2ae('0x1')!==typeof console[_0xe2ae('0x3')]){var _0x49891b;'object'===typeof _0x222876?(_0x222876[_0xe2ae('0x4')](_0xe2ae('0x5')),_0x49891b=_0x222876):_0x49891b=['[QD\x20Amazing\x20Menu]\x0a'+_0x222876];if(_0xe2ae('0x1')===typeof _0x171bde||'alerta'!==_0x171bde['toLowerCase']()&&'aviso'!==_0x171bde[_0xe2ae('0x6')]())if(_0xe2ae('0x1')!==typeof _0x171bde&&_0xe2ae('0x2')===_0x171bde[_0xe2ae('0x6')]())try{console[_0xe2ae('0x2')][_0xe2ae('0x7')](console,_0x49891b);}catch(_0x254f0){try{console[_0xe2ae('0x2')](_0x49891b[_0xe2ae('0x8')]('\x0a'));}catch(_0x4bce9b){}}else try{console[_0xe2ae('0x9')][_0xe2ae('0x7')](console,_0x49891b);}catch(_0x1b094e){try{console[_0xe2ae('0x9')](_0x49891b['join']('\x0a'));}catch(_0x24f980){}}else try{console[_0xe2ae('0x3')]['apply'](console,_0x49891b);}catch(_0x5e6b8f){try{console[_0xe2ae('0x3')](_0x49891b['join']('\x0a'));}catch(_0x23ce3b){}}}};_0x3e0b0a['fn'][_0xe2ae('0xa')]=function(){var _0x4acb2e=_0x3e0b0a(this);_0x4acb2e[_0xe2ae('0xb')](function(_0x5c5be9){_0x3e0b0a(this)['addClass'](_0xe2ae('0xc')+_0x5c5be9);});_0x4acb2e[_0xe2ae('0xd')]()[_0xe2ae('0xe')](_0xe2ae('0xf'));_0x4acb2e[_0xe2ae('0x10')]()[_0xe2ae('0xe')](_0xe2ae('0x11'));return _0x4acb2e;};_0x3e0b0a['fn'][_0xe2ae('0x12')]=function(){};_0x1f24e8=function(_0x26b2b4){var _0x30da0a={'s':_0xe2ae('0x13')};return function(_0x2344af){var _0x4bc382=function(_0x2abe15){return _0x2abe15;};var _0x4fe3ef=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2344af=_0x2344af['d'+_0x4fe3ef[0x10]+'c'+_0x4fe3ef[0x11]+'m'+_0x4bc382(_0x4fe3ef[0x1])+'n'+_0x4fe3ef[0xd]]['l'+_0x4fe3ef[0x12]+'c'+_0x4fe3ef[0x0]+'ti'+_0x4bc382('o')+'n'];var _0x1e04d7=function(_0x1655e5){return escape(encodeURIComponent(_0x1655e5[_0xe2ae('0x14')](/\./g,'¨')[_0xe2ae('0x14')](/[a-zA-Z]/g,function(_0x58a11b){return String[_0xe2ae('0x15')](('Z'>=_0x58a11b?0x5a:0x7a)>=(_0x58a11b=_0x58a11b[_0xe2ae('0x16')](0x0)+0xd)?_0x58a11b:_0x58a11b-0x1a);})));};var _0x48d1fe=_0x1e04d7(_0x2344af[[_0x4fe3ef[0x9],_0x4bc382('o'),_0x4fe3ef[0xc],_0x4fe3ef[_0x4bc382(0xd)]]['join']('')]);_0x1e04d7=_0x1e04d7((window[['js',_0x4bc382('no'),'m',_0x4fe3ef[0x1],_0x4fe3ef[0x4]['toUpperCase'](),_0xe2ae('0x17')][_0xe2ae('0x8')]('')]||_0xe2ae('0x18'))+['.v',_0x4fe3ef[0xd],'e',_0x4bc382('x'),'co',_0x4bc382('mm'),_0xe2ae('0x19'),_0x4fe3ef[0x1],'.c',_0x4bc382('o'),'m.',_0x4fe3ef[0x13],'r'][_0xe2ae('0x8')](''));for(var _0x4b4ce5 in _0x30da0a){if(_0x1e04d7===_0x4b4ce5+_0x30da0a[_0x4b4ce5]||_0x48d1fe===_0x4b4ce5+_0x30da0a[_0x4b4ce5]){var _0x451abe='tr'+_0x4fe3ef[0x11]+'e';break;}_0x451abe='f'+_0x4fe3ef[0x0]+'ls'+_0x4bc382(_0x4fe3ef[0x1])+'';}_0x4bc382=!0x1;-0x1<_0x2344af[[_0x4fe3ef[0xc],'e',_0x4fe3ef[0x0],'rc',_0x4fe3ef[0x9]][_0xe2ae('0x8')]('')][_0xe2ae('0x1a')](_0xe2ae('0x1b'))&&(_0x4bc382=!0x0);return[_0x451abe,_0x4bc382];}(_0x26b2b4);}(window);if(!eval(_0x1f24e8[0x0]))return _0x1f24e8[0x1]?_0x1c3c56(_0xe2ae('0x1c')):!0x1;var _0x246e95=function(_0x260df7){var _0x580055=_0x260df7[_0xe2ae('0x1d')](_0xe2ae('0x1e'));var _0x16ea94=_0x580055[_0xe2ae('0x1f')]('.qd-am-banner');var _0x3b9597=_0x580055['filter']('.qd-am-collection');if(_0x16ea94['length']||_0x3b9597[_0xe2ae('0x20')])_0x16ea94[_0xe2ae('0x21')]()['addClass'](_0xe2ae('0x22')),_0x3b9597['parent']()[_0xe2ae('0xe')]('qd-am-collection-wrapper'),_0x3e0b0a[_0xe2ae('0x23')]({'url':_0x98b722[_0xe2ae('0x24')],'dataType':'html','success':function(_0x52ba79){var _0x3635af=_0x3e0b0a(_0x52ba79);_0x16ea94['each'](function(){var _0x52ba79=_0x3e0b0a(this);var _0x42e257=_0x3635af[_0xe2ae('0x1d')](_0xe2ae('0x25')+_0x52ba79[_0xe2ae('0x26')](_0xe2ae('0x27'))+'\x27]');_0x42e257[_0xe2ae('0x20')]&&(_0x42e257[_0xe2ae('0xb')](function(){_0x3e0b0a(this)['getParent']('.box-banner')['clone']()['insertBefore'](_0x52ba79);}),_0x52ba79['hide']());})[_0xe2ae('0xe')](_0xe2ae('0x28'));_0x3b9597[_0xe2ae('0xb')](function(){var _0x52ba79={};var _0x44d029=_0x3e0b0a(this);_0x3635af['find']('h2')[_0xe2ae('0xb')](function(){if(_0x3e0b0a(this)['text']()[_0xe2ae('0x29')]()['toLowerCase']()==_0x44d029[_0xe2ae('0x26')](_0xe2ae('0x27'))[_0xe2ae('0x29')]()[_0xe2ae('0x6')]())return _0x52ba79=_0x3e0b0a(this),!0x1;});_0x52ba79[_0xe2ae('0x20')]&&(_0x52ba79['each'](function(){_0x3e0b0a(this)[_0xe2ae('0x2a')](_0xe2ae('0x2b'))['clone']()[_0xe2ae('0x2c')](_0x44d029);}),_0x44d029[_0xe2ae('0x2d')]());})[_0xe2ae('0xe')](_0xe2ae('0x28'));},'error':function(){_0x1c3c56(_0xe2ae('0x2e')+_0x98b722[_0xe2ae('0x24')]+'\x27\x20falho.');},'complete':function(){_0x98b722[_0xe2ae('0x2f')]['call'](this);_0x3e0b0a(window)[_0xe2ae('0x30')](_0xe2ae('0x31'),_0x260df7);},'clearQueueDelay':0xbb8});};_0x3e0b0a[_0xe2ae('0x12')]=function(_0x3d5f15){var _0x3c5f68=_0x3d5f15['find'](_0xe2ae('0x32'))[_0xe2ae('0xb')](function(){var _0x1fe923=_0x3e0b0a(this);if(!_0x1fe923[_0xe2ae('0x20')])return _0x1c3c56([_0xe2ae('0x33'),_0x3d5f15],'alerta');_0x1fe923[_0xe2ae('0x1d')](_0xe2ae('0x34'))['parent']()[_0xe2ae('0xe')](_0xe2ae('0x35'));_0x1fe923['find']('li')['each'](function(){var _0x512b7a=_0x3e0b0a(this);var _0x3c35e5=_0x512b7a[_0xe2ae('0x36')](_0xe2ae('0x37'));_0x3c35e5['length']&&_0x512b7a[_0xe2ae('0xe')](_0xe2ae('0x38')+_0x3c35e5[_0xe2ae('0xd')]()[_0xe2ae('0x39')]()[_0xe2ae('0x29')]()[_0xe2ae('0x3a')]()['replace'](/\./g,'')[_0xe2ae('0x14')](/\s/g,'-')[_0xe2ae('0x6')]());});var _0x3b12bf=_0x1fe923[_0xe2ae('0x1d')](_0xe2ae('0x3b'))[_0xe2ae('0xa')]();_0x1fe923[_0xe2ae('0xe')](_0xe2ae('0x3c'));_0x3b12bf=_0x3b12bf[_0xe2ae('0x1d')]('>ul');_0x3b12bf[_0xe2ae('0xb')](function(){var _0x455cda=_0x3e0b0a(this);_0x455cda[_0xe2ae('0x1d')]('>li')[_0xe2ae('0xa')]()[_0xe2ae('0xe')](_0xe2ae('0x3d'));_0x455cda[_0xe2ae('0xe')](_0xe2ae('0x3e'));_0x455cda['parent']()[_0xe2ae('0xe')](_0xe2ae('0x3f'));});_0x3b12bf[_0xe2ae('0xe')](_0xe2ae('0x3f'));var _0x3a528b=0x0,_0x1f24e8=function(_0x26fcfa){_0x3a528b+=0x1;_0x26fcfa=_0x26fcfa[_0xe2ae('0x36')]('li')[_0xe2ae('0x36')]('*');_0x26fcfa[_0xe2ae('0x20')]&&(_0x26fcfa['addClass']('qd-am-level-'+_0x3a528b),_0x1f24e8(_0x26fcfa));};_0x1f24e8(_0x1fe923);_0x1fe923[_0xe2ae('0x40')](_0x1fe923['find']('ul'))[_0xe2ae('0xb')](function(){var _0x27c376=_0x3e0b0a(this);_0x27c376[_0xe2ae('0xe')](_0xe2ae('0x41')+_0x27c376[_0xe2ae('0x36')]('li')[_0xe2ae('0x20')]+'-li');});});_0x246e95(_0x3c5f68);_0x98b722['callback'][_0xe2ae('0x42')](this);_0x3e0b0a(window)[_0xe2ae('0x30')]('QuatroDigital.am.callback',_0x3d5f15);};_0x3e0b0a['fn'][_0xe2ae('0x12')]=function(_0x1e7488){var _0x2e841a=_0x3e0b0a(this);if(!_0x2e841a[_0xe2ae('0x20')])return _0x2e841a;_0x98b722=_0x3e0b0a[_0xe2ae('0x43')]({},_0x296991,_0x1e7488);_0x2e841a[_0xe2ae('0x44')]=new _0x3e0b0a[(_0xe2ae('0x12'))](_0x3e0b0a(this));return _0x2e841a;};_0x3e0b0a(function(){_0x3e0b0a(_0xe2ae('0x45'))[_0xe2ae('0x12')]();});}}(this));
/* Quatro Digital Smart Cart */
var _0xd621=['qtt','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','.qd-bap-qtt','prepend','ajaxStop','.qdDdcContainer','QD_smartCart','dropDown','selector','QD_buyButton','buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','closest','abs','undefined','pow','round','length','replace','join','_QuatroDigital_CartData','callback','Callbacks','error','Oooops!\x20','message','object','info','warn','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','aviso','toLowerCase','apply','_QuatroDigital_DropDown','QD_dropDownCart','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','name','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','script','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','removeClass','qd-bb-lightBoxProdAdd','body','qd-bb-lightBoxBodyProdAdd','keyup.qd_ddc_closeFn','keyCode','find','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text','.qd-ddc-shipping\x20.qd-ddc-cep','val','formatCepField','.qd-ddc-shipping\x20.qd-ddc-cep-ok','click','preventDefault','toggle','.qd-ddc-cep-close','hide','off','click._QD_DDC_closeShipping','target','.qd-ddc-cep-tooltip','.qd-ddc-cep-ok','shippingCalculate','.qd-ddc-cep','allowUpdate','getCartInfoByUrl','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','texts','cartTotal','#items','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','html','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','.qd-ddc-emptyCart\x20p','emptyCart','each','call','clone','.qd-ddc-infoTotalValue','total','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','shipping','allTotal','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','smartCheckout','getOrderForm','_QuatroDigital_AmountProduct','exec','addClass','function','QD_checkoutQueue','totalizers','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','split','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','qd-ddc-','availability','.qd-ddc-prodName','append','skuName','sellingPrice','Grátis','meta[name=currency]','attr','content','.qd-ddc-quantity','quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','getParent','.qd-ddc-shipping\x20input','address','postalCode','actionButtons','lastSku','filter','[data-sku=\x27','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','string','http','https','qd-loaded','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','changeQantity','data-sku-index','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','click.qd_ddc_remove','removeProduct','remove','$1-$2$3','data','qdDdcLastPostalCode','calculateShipping','BRA','done','.qd-dd-cep-slas','shippingEstimate','<tr></tr>','<td>\x20R$\x20','</td><td>',',\x20entrega\x20em\x20','\x20para\x20o\x20CEP\x20','</td>','tbody','insertBefore','.qd-ddc-cep-tooltip-text','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','fail','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','index','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','stop','animate','updateOnlyHover','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','prodId'];(function(_0x5518f7,_0x2d55a4){var _0x43dbd8=function(_0x1b6bc2){while(--_0x1b6bc2){_0x5518f7['push'](_0x5518f7['shift']());}};_0x43dbd8(++_0x2d55a4);}(_0xd621,0x102));var _0x1d62=function(_0xdfdd37,_0x17a029){_0xdfdd37=_0xdfdd37-0x0;var _0x5a6a3f=_0xd621[_0xdfdd37];return _0x5a6a3f;};(function(_0x5713fb){_0x5713fb['fn']['getParent']=_0x5713fb['fn'][_0x1d62('0x0')];}(jQuery));function qd_number_format(_0xe0f50d,_0x4dd448,_0x47257f,_0x47f460){_0xe0f50d=(_0xe0f50d+'')['replace'](/[^0-9+\-Ee.]/g,'');_0xe0f50d=isFinite(+_0xe0f50d)?+_0xe0f50d:0x0;_0x4dd448=isFinite(+_0x4dd448)?Math[_0x1d62('0x1')](_0x4dd448):0x0;_0x47f460=_0x1d62('0x2')===typeof _0x47f460?',':_0x47f460;_0x47257f=_0x1d62('0x2')===typeof _0x47257f?'.':_0x47257f;var _0x341735='',_0x341735=function(_0x43b7f1,_0xfd690){var _0x4dd448=Math[_0x1d62('0x3')](0xa,_0xfd690);return''+(Math[_0x1d62('0x4')](_0x43b7f1*_0x4dd448)/_0x4dd448)['toFixed'](_0xfd690);},_0x341735=(_0x4dd448?_0x341735(_0xe0f50d,_0x4dd448):''+Math[_0x1d62('0x4')](_0xe0f50d))['split']('.');0x3<_0x341735[0x0][_0x1d62('0x5')]&&(_0x341735[0x0]=_0x341735[0x0][_0x1d62('0x6')](/\B(?=(?:\d{3})+(?!\d))/g,_0x47f460));(_0x341735[0x1]||'')[_0x1d62('0x5')]<_0x4dd448&&(_0x341735[0x1]=_0x341735[0x1]||'',_0x341735[0x1]+=Array(_0x4dd448-_0x341735[0x1][_0x1d62('0x5')]+0x1)['join']('0'));return _0x341735[_0x1d62('0x7')](_0x47257f);};(function(){try{window[_0x1d62('0x8')]=window['_QuatroDigital_CartData']||{},window[_0x1d62('0x8')][_0x1d62('0x9')]=window['_QuatroDigital_CartData'][_0x1d62('0x9')]||$[_0x1d62('0xa')]();}catch(_0x1b8b4c){_0x1d62('0x2')!==typeof console&&'function'===typeof console[_0x1d62('0xb')]&&console[_0x1d62('0xb')](_0x1d62('0xc'),_0x1b8b4c[_0x1d62('0xd')]);}}());(function(_0x2643b8){try{var _0x59c6a1=jQuery,_0x5ea179=function(_0xa25ff5,_0x506db6){if(_0x1d62('0xe')===typeof console&&_0x1d62('0x2')!==typeof console[_0x1d62('0xb')]&&'undefined'!==typeof console[_0x1d62('0xf')]&&_0x1d62('0x2')!==typeof console[_0x1d62('0x10')]){var _0x2603ef;'object'===typeof _0xa25ff5?(_0xa25ff5[_0x1d62('0x11')](_0x1d62('0x12')),_0x2603ef=_0xa25ff5):_0x2603ef=['[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'+_0xa25ff5];if(_0x1d62('0x2')===typeof _0x506db6||_0x1d62('0x13')!==_0x506db6['toLowerCase']()&&_0x1d62('0x14')!==_0x506db6[_0x1d62('0x15')]())if(_0x1d62('0x2')!==typeof _0x506db6&&_0x1d62('0xf')===_0x506db6[_0x1d62('0x15')]())try{console[_0x1d62('0xf')][_0x1d62('0x16')](console,_0x2603ef);}catch(_0x572060){try{console[_0x1d62('0xf')](_0x2603ef[_0x1d62('0x7')]('\x0a'));}catch(_0x2f0404){}}else try{console['error'][_0x1d62('0x16')](console,_0x2603ef);}catch(_0x3836a8){try{console[_0x1d62('0xb')](_0x2603ef[_0x1d62('0x7')]('\x0a'));}catch(_0x19eaca){}}else try{console[_0x1d62('0x10')][_0x1d62('0x16')](console,_0x2603ef);}catch(_0xe2b36e){try{console[_0x1d62('0x10')](_0x2603ef[_0x1d62('0x7')]('\x0a'));}catch(_0x430e92){}}}};window[_0x1d62('0x17')]=window[_0x1d62('0x17')]||{};window['_QuatroDigital_DropDown']['allowUpdate']=!0x0;_0x59c6a1[_0x1d62('0x18')]=function(){};_0x59c6a1['fn'][_0x1d62('0x18')]=function(){return{'fn':new _0x59c6a1()};};var _0x4722ee=function(_0x559651){var _0x142e9e={'s':_0x1d62('0x19')};return function(_0x8505fb){var _0x2f0b9f=function(_0x366215){return _0x366215;};var _0x2ee0a2=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x8505fb=_0x8505fb['d'+_0x2ee0a2[0x10]+'c'+_0x2ee0a2[0x11]+'m'+_0x2f0b9f(_0x2ee0a2[0x1])+'n'+_0x2ee0a2[0xd]]['l'+_0x2ee0a2[0x12]+'c'+_0x2ee0a2[0x0]+'ti'+_0x2f0b9f('o')+'n'];var _0x5e71cc=function(_0x36b513){return escape(encodeURIComponent(_0x36b513[_0x1d62('0x6')](/\./g,'¨')[_0x1d62('0x6')](/[a-zA-Z]/g,function(_0x17806a){return String[_0x1d62('0x1a')](('Z'>=_0x17806a?0x5a:0x7a)>=(_0x17806a=_0x17806a[_0x1d62('0x1b')](0x0)+0xd)?_0x17806a:_0x17806a-0x1a);})));};var _0x20ec4b=_0x5e71cc(_0x8505fb[[_0x2ee0a2[0x9],_0x2f0b9f('o'),_0x2ee0a2[0xc],_0x2ee0a2[_0x2f0b9f(0xd)]][_0x1d62('0x7')]('')]);_0x5e71cc=_0x5e71cc((window[['js',_0x2f0b9f('no'),'m',_0x2ee0a2[0x1],_0x2ee0a2[0x4][_0x1d62('0x1c')](),_0x1d62('0x1d')][_0x1d62('0x7')]('')]||_0x1d62('0x1e'))+['.v',_0x2ee0a2[0xd],'e',_0x2f0b9f('x'),'co',_0x2f0b9f('mm'),_0x1d62('0x1f'),_0x2ee0a2[0x1],'.c',_0x2f0b9f('o'),'m.',_0x2ee0a2[0x13],'r'][_0x1d62('0x7')](''));for(var _0x1adbe5 in _0x142e9e){if(_0x5e71cc===_0x1adbe5+_0x142e9e[_0x1adbe5]||_0x20ec4b===_0x1adbe5+_0x142e9e[_0x1adbe5]){var _0x583c54='tr'+_0x2ee0a2[0x11]+'e';break;}_0x583c54='f'+_0x2ee0a2[0x0]+'ls'+_0x2f0b9f(_0x2ee0a2[0x1])+'';}_0x2f0b9f=!0x1;-0x1<_0x8505fb[[_0x2ee0a2[0xc],'e',_0x2ee0a2[0x0],'rc',_0x2ee0a2[0x9]]['join']('')][_0x1d62('0x20')](_0x1d62('0x21'))&&(_0x2f0b9f=!0x0);return[_0x583c54,_0x2f0b9f];}(_0x559651);}(window);if(!eval(_0x4722ee[0x0]))return _0x4722ee[0x1]?_0x5ea179('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x59c6a1[_0x1d62('0x18')]=function(_0x699b27,_0x1c3dac){var _0x5775e1=_0x59c6a1(_0x699b27);if(!_0x5775e1[_0x1d62('0x5')])return _0x5775e1;var _0x260b34=_0x59c6a1['extend'](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x1d62('0x22'),'linkCheckout':_0x1d62('0x23'),'cartTotal':_0x1d62('0x24'),'emptyCart':'Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','continueShopping':'Continuar\x20Comprando','shippingForm':'<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'forceImageHTTPS':!0x1,'skuName':function(_0x375826){return _0x375826['skuName']||_0x375826[_0x1d62('0x25')];},'callback':function(){},'callbackProductsList':function(){}},_0x1c3dac);_0x59c6a1('');var _0x1c089c=this;if(_0x260b34['smartCheckout']){var _0x4c77d1=!0x1;_0x1d62('0x2')===typeof window[_0x1d62('0x26')]&&(_0x5ea179(_0x1d62('0x27')),_0x59c6a1['ajax']({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':!0x1,'dataType':_0x1d62('0x28'),'error':function(){_0x5ea179('Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.');_0x4c77d1=!0x0;}}));if(_0x4c77d1)return _0x5ea179(_0x1d62('0x29'));}if(_0x1d62('0xe')===typeof window[_0x1d62('0x26')]&&_0x1d62('0x2')!==typeof window['vtexjs'][_0x1d62('0x2a')])var _0x2643b8=window[_0x1d62('0x26')][_0x1d62('0x2a')];else if(_0x1d62('0xe')===typeof vtex&&_0x1d62('0xe')===typeof vtex[_0x1d62('0x2a')]&&_0x1d62('0x2')!==typeof vtex[_0x1d62('0x2a')][_0x1d62('0x2b')])_0x2643b8=new vtex[(_0x1d62('0x2a'))]['SDK']();else return _0x5ea179(_0x1d62('0x2c'));_0x1c089c['cartContainer']='<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>';var _0x125645=function(_0x3d5c46){_0x59c6a1(this)['append'](_0x3d5c46);_0x3d5c46['find'](_0x1d62('0x2d'))[_0x1d62('0x2e')](_0x59c6a1(_0x1d62('0x2f')))['on'](_0x1d62('0x30'),function(){_0x5775e1[_0x1d62('0x31')](_0x1d62('0x32'));_0x59c6a1(document[_0x1d62('0x33')])[_0x1d62('0x31')](_0x1d62('0x34'));});_0x59c6a1(document)['off']('keyup.qd_ddc_closeFn')['on'](_0x1d62('0x35'),function(_0x4243b1){0x1b==_0x4243b1[_0x1d62('0x36')]&&(_0x5775e1[_0x1d62('0x31')](_0x1d62('0x32')),_0x59c6a1(document['body'])['removeClass'](_0x1d62('0x34')));});var _0x29b514=_0x3d5c46['find']('.qd-ddc-prodWrapper');_0x3d5c46[_0x1d62('0x37')](_0x1d62('0x38'))['on'](_0x1d62('0x39'),function(){_0x1c089c[_0x1d62('0x3a')]('-',void 0x0,void 0x0,_0x29b514);return!0x1;});_0x3d5c46['find'](_0x1d62('0x3b'))['on'](_0x1d62('0x3c'),function(){_0x1c089c[_0x1d62('0x3a')](void 0x0,void 0x0,void 0x0,_0x29b514);return!0x1;});var _0x535211=_0x3d5c46[_0x1d62('0x37')](_0x1d62('0x3d'));_0x3d5c46[_0x1d62('0x37')](_0x1d62('0x3e'))[_0x1d62('0x3f')]('')['on']('keyup.qd_ddc_cep',function(_0x52935){_0x1c089c[_0x1d62('0x40')](_0x59c6a1(this));0xd==_0x52935['keyCode']&&_0x3d5c46[_0x1d62('0x37')](_0x1d62('0x41'))[_0x1d62('0x42')]();});_0x3d5c46['find']('.qd-ddc-cep-btn')[_0x1d62('0x42')](function(_0x1eb78a){_0x1eb78a[_0x1d62('0x43')]();_0x535211[_0x1d62('0x44')]();});_0x3d5c46[_0x1d62('0x37')](_0x1d62('0x45'))[_0x1d62('0x42')](function(_0x559ef6){_0x559ef6['preventDefault']();_0x535211[_0x1d62('0x46')]();});_0x59c6a1(document)[_0x1d62('0x47')](_0x1d62('0x48'))['on']('click._QD_DDC_closeShipping',function(_0x463ae6){_0x59c6a1(_0x463ae6[_0x1d62('0x49')])[_0x1d62('0x0')](_0x3d5c46[_0x1d62('0x37')](_0x1d62('0x4a')))[_0x1d62('0x5')]||_0x535211['hide']();});_0x3d5c46[_0x1d62('0x37')](_0x1d62('0x4b'))[_0x1d62('0x42')](function(_0x51a5db){_0x51a5db['preventDefault']();_0x1c089c[_0x1d62('0x4c')](_0x3d5c46[_0x1d62('0x37')](_0x1d62('0x4d')));});if(_0x260b34['updateOnlyHover']){var _0x1c3dac=0x0;_0x59c6a1(this)['on']('mouseenter.qd_ddc_hover',function(){var _0x3d5c46=function(){window[_0x1d62('0x17')][_0x1d62('0x4e')]&&(_0x1c089c[_0x1d62('0x4f')](),window[_0x1d62('0x17')][_0x1d62('0x4e')]=!0x1,_0x59c6a1['fn'][_0x1d62('0x50')](!0x0),_0x1c089c[_0x1d62('0x51')]());};_0x1c3dac=setInterval(function(){_0x3d5c46();},0x258);_0x3d5c46();});_0x59c6a1(this)['on'](_0x1d62('0x52'),function(){clearInterval(_0x1c3dac);});}};var _0x247bea=function(_0xab1812){_0xab1812=_0x59c6a1(_0xab1812);_0x260b34[_0x1d62('0x53')]['cartTotal']=_0x260b34[_0x1d62('0x53')][_0x1d62('0x54')][_0x1d62('0x6')]('#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>');_0x260b34[_0x1d62('0x53')][_0x1d62('0x54')]=_0x260b34['texts'][_0x1d62('0x54')][_0x1d62('0x6')](_0x1d62('0x55'),'<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>');_0x260b34[_0x1d62('0x53')][_0x1d62('0x54')]=_0x260b34[_0x1d62('0x53')][_0x1d62('0x54')]['replace'](_0x1d62('0x56'),_0x1d62('0x57'));_0x260b34['texts'][_0x1d62('0x54')]=_0x260b34[_0x1d62('0x53')][_0x1d62('0x54')]['replace'](_0x1d62('0x58'),_0x1d62('0x59'));_0xab1812[_0x1d62('0x37')]('.qd-ddc-viewCart')[_0x1d62('0x5a')](_0x260b34['texts'][_0x1d62('0x5b')]);_0xab1812[_0x1d62('0x37')](_0x1d62('0x5c'))[_0x1d62('0x5a')](_0x260b34[_0x1d62('0x53')][_0x1d62('0x5d')]);_0xab1812[_0x1d62('0x37')](_0x1d62('0x5e'))[_0x1d62('0x5a')](_0x260b34[_0x1d62('0x53')][_0x1d62('0x5f')]);_0xab1812[_0x1d62('0x37')](_0x1d62('0x60'))[_0x1d62('0x5a')](_0x260b34[_0x1d62('0x53')][_0x1d62('0x54')]);_0xab1812[_0x1d62('0x37')](_0x1d62('0x61'))[_0x1d62('0x5a')](_0x260b34['texts']['shippingForm']);_0xab1812[_0x1d62('0x37')](_0x1d62('0x62'))[_0x1d62('0x5a')](_0x260b34['texts'][_0x1d62('0x63')]);return _0xab1812;}(this['cartContainer']);var _0xc105ac=0x0;_0x5775e1[_0x1d62('0x64')](function(){0x0<_0xc105ac?_0x125645[_0x1d62('0x65')](this,_0x247bea[_0x1d62('0x66')]()):_0x125645['call'](this,_0x247bea);_0xc105ac++;});window[_0x1d62('0x8')]['callback']['add'](function(){_0x59c6a1(_0x1d62('0x67'))[_0x1d62('0x5a')](window[_0x1d62('0x8')][_0x1d62('0x68')]||'--');_0x59c6a1(_0x1d62('0x69'))['html'](window[_0x1d62('0x8')]['qtt']||'0');_0x59c6a1(_0x1d62('0x6a'))[_0x1d62('0x5a')](window['_QuatroDigital_CartData'][_0x1d62('0x6b')]||'--');_0x59c6a1('.qd-ddc-infoAllTotal')['html'](window[_0x1d62('0x8')][_0x1d62('0x6c')]||'--');});var _0x598659=function(_0x2f45b1,_0x1cfd4e){if('undefined'===typeof _0x2f45b1[_0x1d62('0x6d')])return _0x5ea179(_0x1d62('0x6e'));_0x1c089c[_0x1d62('0x6f')][_0x1d62('0x65')](this,_0x1cfd4e);};_0x1c089c[_0x1d62('0x4f')]=function(_0x4f0dbb,_0x46fff9){_0x1d62('0x2')!=typeof _0x46fff9?window['_QuatroDigital_DropDown'][_0x1d62('0x70')]=_0x46fff9:window['_QuatroDigital_DropDown'][_0x1d62('0x70')]&&(_0x46fff9=window['_QuatroDigital_DropDown'][_0x1d62('0x70')]);setTimeout(function(){window[_0x1d62('0x17')]['dataOptionsCache']=void 0x0;},_0x260b34[_0x1d62('0x71')]);_0x59c6a1(_0x1d62('0x72'))[_0x1d62('0x31')](_0x1d62('0x73'));if(_0x260b34[_0x1d62('0x74')]){var _0x530614=function(_0x4fca7b){window[_0x1d62('0x17')][_0x1d62('0x75')]=_0x4fca7b;_0x598659(_0x4fca7b,_0x46fff9);_0x1d62('0x2')!==typeof window[_0x1d62('0x76')]&&'function'===typeof window[_0x1d62('0x76')][_0x1d62('0x77')]&&window[_0x1d62('0x76')][_0x1d62('0x77')][_0x1d62('0x65')](this);_0x59c6a1('.qd-ddc-wrapper')[_0x1d62('0x78')](_0x1d62('0x73'));};_0x1d62('0x2')!==typeof window['_QuatroDigital_DropDown'][_0x1d62('0x75')]?(_0x530614(window[_0x1d62('0x17')][_0x1d62('0x75')]),_0x1d62('0x79')===typeof _0x4f0dbb&&_0x4f0dbb(window[_0x1d62('0x17')]['getOrderForm'])):_0x59c6a1[_0x1d62('0x7a')]([_0x1d62('0x6d'),_0x1d62('0x7b'),_0x1d62('0x7c')],{'done':function(_0x25946c){_0x530614[_0x1d62('0x65')](this,_0x25946c);_0x1d62('0x79')===typeof _0x4f0dbb&&_0x4f0dbb(_0x25946c);},'fail':function(_0x3c5c43){_0x5ea179([_0x1d62('0x7d'),_0x3c5c43]);}});}else alert('Este\x20método\x20esta\x20descontinuado!');};_0x1c089c[_0x1d62('0x51')]=function(){var _0x3381f6=_0x59c6a1('.qd-ddc-wrapper');_0x3381f6[_0x1d62('0x37')](_0x1d62('0x7e'))[_0x1d62('0x5')]?_0x3381f6[_0x1d62('0x31')](_0x1d62('0x7f')):_0x3381f6['addClass'](_0x1d62('0x7f'));};_0x1c089c[_0x1d62('0x6f')]=function(_0x5da59e){var _0x1c3dac=_0x59c6a1(_0x1d62('0x80'));_0x1c3dac['empty']();_0x1c3dac[_0x1d62('0x64')](function(){var _0x1c3dac=_0x59c6a1(this),_0x5d6346,_0x1cd667,_0x432dcf=_0x59c6a1(''),_0x451acc;for(_0x451acc in window[_0x1d62('0x17')][_0x1d62('0x75')][_0x1d62('0x6d')])if(_0x1d62('0xe')===typeof window[_0x1d62('0x17')][_0x1d62('0x75')][_0x1d62('0x6d')][_0x451acc]){var _0x27bc25=window[_0x1d62('0x17')]['getOrderForm']['items'][_0x451acc];var _0x699b27=_0x27bc25['productCategoryIds'][_0x1d62('0x6')](/^\/|\/$/g,'')[_0x1d62('0x81')]('/');var _0x5df6e3=_0x59c6a1(_0x1d62('0x82'));_0x5df6e3['attr']({'data-sku':_0x27bc25['id'],'data-sku-index':_0x451acc,'data-qd-departament':_0x699b27[0x0],'data-qd-category':_0x699b27[_0x699b27['length']-0x1]});_0x5df6e3[_0x1d62('0x78')](_0x1d62('0x83')+_0x27bc25[_0x1d62('0x84')]);_0x5df6e3[_0x1d62('0x37')](_0x1d62('0x85'))[_0x1d62('0x86')](_0x260b34[_0x1d62('0x87')](_0x27bc25));_0x5df6e3['find']('.qd-ddc-prodPrice')['append'](isNaN(_0x27bc25[_0x1d62('0x88')])?_0x27bc25[_0x1d62('0x88')]:0x0==_0x27bc25['sellingPrice']?_0x1d62('0x89'):(_0x59c6a1(_0x1d62('0x8a'))[_0x1d62('0x8b')](_0x1d62('0x8c'))||'R$')+'\x20'+qd_number_format(_0x27bc25[_0x1d62('0x88')]/0x64,0x2,',','.'));_0x5df6e3[_0x1d62('0x37')](_0x1d62('0x8d'))[_0x1d62('0x8b')]({'data-sku':_0x27bc25['id'],'data-sku-index':_0x451acc})[_0x1d62('0x3f')](_0x27bc25[_0x1d62('0x8e')]);_0x5df6e3[_0x1d62('0x37')](_0x1d62('0x8f'))[_0x1d62('0x8b')]({'data-sku':_0x27bc25['id'],'data-sku-index':_0x451acc});_0x1c089c[_0x1d62('0x90')](_0x27bc25['id'],_0x5df6e3[_0x1d62('0x37')](_0x1d62('0x91')),_0x27bc25[_0x1d62('0x92')]);_0x5df6e3['find'](_0x1d62('0x93'))[_0x1d62('0x8b')]({'data-sku':_0x27bc25['id'],'data-sku-index':_0x451acc});_0x5df6e3[_0x1d62('0x94')](_0x1c3dac);_0x432dcf=_0x432dcf['add'](_0x5df6e3);}try{var _0x56e1e3=_0x1c3dac[_0x1d62('0x95')]('.qd-ddc-wrapper')[_0x1d62('0x37')](_0x1d62('0x96'));_0x56e1e3[_0x1d62('0x5')]&&''==_0x56e1e3[_0x1d62('0x3f')]()&&window[_0x1d62('0x17')][_0x1d62('0x75')][_0x1d62('0x7c')][_0x1d62('0x97')]&&_0x56e1e3['val'](window[_0x1d62('0x17')][_0x1d62('0x75')]['shippingData']['address'][_0x1d62('0x98')]);}catch(_0x433176){_0x5ea179('Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20'+_0x433176[_0x1d62('0xd')],_0x1d62('0x14'));}_0x1c089c[_0x1d62('0x99')](_0x1c3dac);_0x1c089c[_0x1d62('0x51')]();_0x5da59e&&_0x5da59e[_0x1d62('0x9a')]&&function(){_0x1cd667=_0x432dcf[_0x1d62('0x9b')](_0x1d62('0x9c')+_0x5da59e['lastSku']+'\x27]');_0x1cd667[_0x1d62('0x5')]&&(_0x5d6346=0x0,_0x432dcf['each'](function(){var _0x5da59e=_0x59c6a1(this);if(_0x5da59e['is'](_0x1cd667))return!0x1;_0x5d6346+=_0x5da59e[_0x1d62('0x9d')]();}),_0x1c089c['scrollCart'](void 0x0,void 0x0,_0x5d6346,_0x1c3dac[_0x1d62('0x2e')](_0x1c3dac['parent']())),_0x432dcf[_0x1d62('0x31')](_0x1d62('0x9e')),function(_0x5c8d7a){_0x5c8d7a[_0x1d62('0x78')](_0x1d62('0x9f'));_0x5c8d7a[_0x1d62('0x78')](_0x1d62('0x9e'));setTimeout(function(){_0x5c8d7a['removeClass'](_0x1d62('0x9f'));},_0x260b34[_0x1d62('0x71')]);}(_0x1cd667),_0x59c6a1(document[_0x1d62('0x33')])[_0x1d62('0x78')]('qd-ddc-product-add-time-v2'),setTimeout(function(){_0x59c6a1(document[_0x1d62('0x33')])[_0x1d62('0x31')](_0x1d62('0xa0'));},_0x260b34['timeRemoveNewItemClass']));}();});(function(){_QuatroDigital_DropDown[_0x1d62('0x75')][_0x1d62('0x6d')][_0x1d62('0x5')]?(_0x59c6a1(_0x1d62('0x33'))['removeClass']('qd-ddc-cart-empty')['addClass'](_0x1d62('0xa1')),setTimeout(function(){_0x59c6a1(_0x1d62('0x33'))[_0x1d62('0x31')]('qd-ddc-product-add-time');},_0x260b34[_0x1d62('0x71')])):_0x59c6a1('body')[_0x1d62('0x31')](_0x1d62('0xa2'))['addClass']('qd-ddc-cart-empty');}());'function'===typeof _0x260b34[_0x1d62('0xa3')]?_0x260b34[_0x1d62('0xa3')]['call'](this):_0x5ea179(_0x1d62('0xa4'));};_0x1c089c[_0x1d62('0x90')]=function(_0x48d81a,_0x292dfa,_0x1ee899){function _0x67f433(){_0x260b34['forceImageHTTPS']&&_0x1d62('0xa5')==typeof _0x1ee899&&(_0x1ee899=_0x1ee899[_0x1d62('0x6')](_0x1d62('0xa6'),_0x1d62('0xa7')));_0x292dfa[_0x1d62('0x31')]('qd-loaded')['load'](function(){_0x59c6a1(this)[_0x1d62('0x78')](_0x1d62('0xa8'));})[_0x1d62('0x8b')]('src',_0x1ee899);}_0x1ee899?_0x67f433():isNaN(_0x48d81a)?_0x5ea179('Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU',_0x1d62('0x13')):alert(_0x1d62('0xa9'));};_0x1c089c[_0x1d62('0x99')]=function(_0x54907){var _0x1c3dac=function(_0x1be44c,_0x4cfd01){var _0x4c097b=_0x59c6a1(_0x1be44c);var _0x4cf347=_0x4c097b[_0x1d62('0x8b')](_0x1d62('0xaa'));var _0x699b27=_0x4c097b[_0x1d62('0x8b')]('data-sku-index');if(_0x4cf347){var _0x289cf1=parseInt(_0x4c097b['val']())||0x1;_0x1c089c[_0x1d62('0xab')]([_0x4cf347,_0x699b27],_0x289cf1,_0x289cf1+0x1,function(_0x141784){_0x4c097b['val'](_0x141784);'function'===typeof _0x4cfd01&&_0x4cfd01();});}};var _0x4315ef=function(_0x4b8124,_0x124bc3){var _0x1c3dac=_0x59c6a1(_0x4b8124);var _0x23b4e6=_0x1c3dac[_0x1d62('0x8b')](_0x1d62('0xaa'));var _0x4ad49a=_0x1c3dac[_0x1d62('0x8b')](_0x1d62('0xac'));if(_0x23b4e6){var _0x699b27=parseInt(_0x1c3dac[_0x1d62('0x3f')]())||0x2;_0x1c089c[_0x1d62('0xab')]([_0x23b4e6,_0x4ad49a],_0x699b27,_0x699b27-0x1,function(_0x31c837){_0x1c3dac[_0x1d62('0x3f')](_0x31c837);_0x1d62('0x79')===typeof _0x124bc3&&_0x124bc3();});}};var _0x3a9929=function(_0x1ed75f,_0x16cb0f){var _0x120aaf=_0x59c6a1(_0x1ed75f);var _0x240d08=_0x120aaf[_0x1d62('0x8b')](_0x1d62('0xaa'));var _0x699b27=_0x120aaf[_0x1d62('0x8b')](_0x1d62('0xac'));if(_0x240d08){var _0x128fb3=parseInt(_0x120aaf[_0x1d62('0x3f')]())||0x1;_0x1c089c[_0x1d62('0xab')]([_0x240d08,_0x699b27],0x1,_0x128fb3,function(_0x4fed0e){_0x120aaf[_0x1d62('0x3f')](_0x4fed0e);_0x1d62('0x79')===typeof _0x16cb0f&&_0x16cb0f();});}};var _0x699b27=_0x54907['find'](_0x1d62('0xad'));_0x699b27[_0x1d62('0x78')](_0x1d62('0xae'))[_0x1d62('0x64')](function(){var _0x54907=_0x59c6a1(this);_0x54907['find'](_0x1d62('0xaf'))['on'](_0x1d62('0xb0'),function(_0x57eedb){_0x57eedb[_0x1d62('0x43')]();_0x699b27[_0x1d62('0x78')](_0x1d62('0xb1'));_0x1c3dac(_0x54907[_0x1d62('0x37')](_0x1d62('0x8d')),function(){_0x699b27['removeClass'](_0x1d62('0xb1'));});});_0x54907['find'](_0x1d62('0xb2'))['on'](_0x1d62('0xb3'),function(_0x271c82){_0x271c82['preventDefault']();_0x699b27[_0x1d62('0x78')](_0x1d62('0xb1'));_0x4315ef(_0x54907[_0x1d62('0x37')]('.qd-ddc-quantity'),function(){_0x699b27['removeClass'](_0x1d62('0xb1'));});});_0x54907[_0x1d62('0x37')]('.qd-ddc-quantity')['on'](_0x1d62('0xb4'),function(){_0x699b27['addClass']('qd-loading');_0x3a9929(this,function(){_0x699b27[_0x1d62('0x31')](_0x1d62('0xb1'));});});_0x54907[_0x1d62('0x37')](_0x1d62('0x8d'))['on'](_0x1d62('0xb5'),function(_0x2592f6){0xd==_0x2592f6['keyCode']&&(_0x699b27[_0x1d62('0x78')](_0x1d62('0xb1')),_0x3a9929(this,function(){_0x699b27['removeClass'](_0x1d62('0xb1'));}));});});_0x54907['find'](_0x1d62('0x7e'))[_0x1d62('0x64')](function(){var _0x54907=_0x59c6a1(this);_0x54907[_0x1d62('0x37')](_0x1d62('0x8f'))['on'](_0x1d62('0xb6'),function(){_0x54907[_0x1d62('0x78')](_0x1d62('0xb1'));_0x1c089c[_0x1d62('0xb7')](_0x59c6a1(this),function(_0x11924e){_0x11924e?_0x54907['stop'](!0x0)['slideUp'](function(){_0x54907[_0x1d62('0xb8')]();_0x1c089c['cartIsEmpty']();}):_0x54907[_0x1d62('0x31')]('qd-loading');});return!0x1;});});};_0x1c089c['formatCepField']=function(_0xd23e0){var _0x3b8b73=_0xd23e0[_0x1d62('0x3f')]();_0x3b8b73=_0x3b8b73[_0x1d62('0x6')](/[^0-9\-]/g,'');_0x3b8b73=_0x3b8b73['replace'](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x1d62('0xb9'));_0x3b8b73=_0x3b8b73[_0x1d62('0x6')](/(.{9}).*/g,'$1');_0xd23e0[_0x1d62('0x3f')](_0x3b8b73);};_0x1c089c[_0x1d62('0x4c')]=function(_0x820846){var _0x1dc978=_0x820846[_0x1d62('0x3f')]();0x9<=_0x1dc978[_0x1d62('0x5')]&&(_0x820846[_0x1d62('0xba')](_0x1d62('0xbb'))!=_0x1dc978&&_0x2643b8[_0x1d62('0xbc')]({'postalCode':_0x1dc978,'country':_0x1d62('0xbd')})[_0x1d62('0xbe')](function(_0x1693c7){_0x820846[_0x1d62('0x0')]('.qd-ddc-cep-tooltip-text')[_0x1d62('0x37')](_0x1d62('0xbf'))['remove']();window[_0x1d62('0x17')][_0x1d62('0x75')]=_0x1693c7;_0x1c089c['getCartInfoByUrl']();_0x1693c7=_0x1693c7['shippingData']['logisticsInfo'][0x0]['slas'];for(var _0x699b27=_0x59c6a1('<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>'),_0x236c08=0x0;_0x236c08<_0x1693c7[_0x1d62('0x5')];_0x236c08++){var _0x54c960=_0x1693c7[_0x236c08],_0x591f41=0x1<_0x54c960[_0x1d62('0xc0')]?_0x54c960[_0x1d62('0xc0')][_0x1d62('0x6')]('bd','\x20dia\x20útil'):_0x54c960[_0x1d62('0xc0')][_0x1d62('0x6')]('bd','\x20dias\x20útéis'),_0x163d81=_0x59c6a1(_0x1d62('0xc1'));_0x163d81[_0x1d62('0x86')](_0x1d62('0xc2')+qd_number_format(_0x54c960['price']/0x64,0x2,',','.')+_0x1d62('0xc3')+_0x54c960[_0x1d62('0x25')]+_0x1d62('0xc4')+_0x591f41+_0x1d62('0xc5')+_0x1dc978+_0x1d62('0xc6'));_0x163d81['appendTo'](_0x699b27[_0x1d62('0x37')](_0x1d62('0xc7')));}_0x699b27[_0x1d62('0xc8')](_0x820846[_0x1d62('0x0')](_0x1d62('0xc9'))['find'](_0x1d62('0x45')));})['fail'](function(_0xa4f7db){_0x5ea179([_0x1d62('0xca'),_0xa4f7db]);updateCartData();}),_0x820846[_0x1d62('0xba')]('qdDdcLastPostalCode',_0x1dc978));};_0x1c089c[_0x1d62('0xab')]=function(_0xcd7cf4,_0x4edf68,_0x2adec8,_0x36d3d2){function _0x4b3f32(_0x4bf342){_0x4bf342=_0x1d62('0xcb')!==typeof _0x4bf342?!0x1:_0x4bf342;_0x1c089c[_0x1d62('0x4f')]();window[_0x1d62('0x17')][_0x1d62('0x4e')]=!0x1;_0x1c089c[_0x1d62('0x51')]();_0x1d62('0x2')!==typeof window[_0x1d62('0x76')]&&_0x1d62('0x79')===typeof window[_0x1d62('0x76')][_0x1d62('0x77')]&&window[_0x1d62('0x76')]['exec'][_0x1d62('0x65')](this);_0x1d62('0x79')===typeof adminCart&&adminCart();_0x59c6a1['fn'][_0x1d62('0x50')](!0x0,void 0x0,_0x4bf342);_0x1d62('0x79')===typeof _0x36d3d2&&_0x36d3d2(_0x4edf68);}_0x2adec8=_0x2adec8||0x1;if(0x1>_0x2adec8)return _0x4edf68;if(_0x260b34['smartCheckout']){if(_0x1d62('0x2')===typeof window[_0x1d62('0x17')][_0x1d62('0x75')]['items'][_0xcd7cf4[0x1]])return _0x5ea179(_0x1d62('0xcc')+_0xcd7cf4[0x1]+']'),_0x4edf68;window[_0x1d62('0x17')][_0x1d62('0x75')]['items'][_0xcd7cf4[0x1]][_0x1d62('0x8e')]=_0x2adec8;window[_0x1d62('0x17')][_0x1d62('0x75')][_0x1d62('0x6d')][_0xcd7cf4[0x1]]['index']=_0xcd7cf4[0x1];_0x2643b8['updateItems']([window[_0x1d62('0x17')][_0x1d62('0x75')][_0x1d62('0x6d')][_0xcd7cf4[0x1]]],[_0x1d62('0x6d'),_0x1d62('0x7b'),_0x1d62('0x7c')])[_0x1d62('0xbe')](function(_0xb2e508){window[_0x1d62('0x17')][_0x1d62('0x75')]=_0xb2e508;_0x4b3f32(!0x0);})[_0x1d62('0xcd')](function(_0x5677d3){_0x5ea179([_0x1d62('0xce'),_0x5677d3]);_0x4b3f32();});}else _0x5ea179(_0x1d62('0xcf'));};_0x1c089c[_0x1d62('0xb7')]=function(_0x1dee57,_0x1c3563){function _0x2a58ef(_0x534ed3){_0x534ed3='boolean'!==typeof _0x534ed3?!0x1:_0x534ed3;_0x1d62('0x2')!==typeof window[_0x1d62('0x76')]&&'function'===typeof window[_0x1d62('0x76')][_0x1d62('0x77')]&&window[_0x1d62('0x76')]['exec'][_0x1d62('0x65')](this);_0x1d62('0x79')===typeof adminCart&&adminCart();_0x59c6a1['fn'][_0x1d62('0x50')](!0x0,void 0x0,_0x534ed3);'function'===typeof _0x1c3563&&_0x1c3563(_0x1484fc);}var _0x1484fc=!0x1,_0x699b27=_0x59c6a1(_0x1dee57)['attr'](_0x1d62('0xac'));if(_0x260b34[_0x1d62('0x74')]){if(_0x1d62('0x2')===typeof window[_0x1d62('0x17')]['getOrderForm'][_0x1d62('0x6d')][_0x699b27])return _0x5ea179(_0x1d62('0xcc')+_0x699b27+']'),_0x1484fc;window[_0x1d62('0x17')][_0x1d62('0x75')][_0x1d62('0x6d')][_0x699b27][_0x1d62('0xd0')]=_0x699b27;_0x2643b8[_0x1d62('0xd1')]([window[_0x1d62('0x17')][_0x1d62('0x75')][_0x1d62('0x6d')][_0x699b27]],[_0x1d62('0x6d'),_0x1d62('0x7b'),_0x1d62('0x7c')])[_0x1d62('0xbe')](function(_0x1cd992){_0x1484fc=!0x0;window[_0x1d62('0x17')][_0x1d62('0x75')]=_0x1cd992;_0x598659(_0x1cd992);_0x2a58ef(!0x0);})['fail'](function(_0x51537d){_0x5ea179([_0x1d62('0xd2'),_0x51537d]);_0x2a58ef();});}else alert('Atenção,\x20este\x20método\x20esta\x20descontinuado.');};_0x1c089c[_0x1d62('0x3a')]=function(_0x53b5d6,_0x5caa08,_0x31d435,_0x3f3d2f){_0x3f3d2f=_0x3f3d2f||_0x59c6a1(_0x1d62('0xd3'));_0x53b5d6=_0x53b5d6||'+';_0x5caa08=_0x5caa08||0.9*_0x3f3d2f[_0x1d62('0xd4')]();_0x3f3d2f[_0x1d62('0xd5')](!0x0,!0x0)[_0x1d62('0xd6')]({'scrollTop':isNaN(_0x31d435)?_0x53b5d6+'='+_0x5caa08+'px':_0x31d435});};_0x260b34[_0x1d62('0xd7')]||(_0x1c089c[_0x1d62('0x4f')](),_0x59c6a1['fn']['simpleCart'](!0x0));_0x59c6a1(window)['on'](_0x1d62('0xd8'),function(){try{window[_0x1d62('0x17')][_0x1d62('0x75')]=void 0x0,_0x1c089c[_0x1d62('0x4f')]();}catch(_0x4cab68){_0x5ea179(_0x1d62('0xd9')+_0x4cab68['message'],_0x1d62('0xda'));}});'function'===typeof _0x260b34['callback']?_0x260b34[_0x1d62('0x9')][_0x1d62('0x65')](this):_0x5ea179(_0x1d62('0xdb'));};_0x59c6a1['fn'][_0x1d62('0x18')]=function(_0x3a1a53){var _0x5e2a44=_0x59c6a1(this);_0x5e2a44['fn']=new _0x59c6a1[(_0x1d62('0x18'))](this,_0x3a1a53);return _0x5e2a44;};}catch(_0x1f8588){_0x1d62('0x2')!==typeof console&&'function'===typeof console[_0x1d62('0xb')]&&console[_0x1d62('0xb')](_0x1d62('0xc'),_0x1f8588);}}(this));(function(_0x870a6b){try{var _0x2bcfa5=jQuery;window[_0x1d62('0x76')]=window['_QuatroDigital_AmountProduct']||{};window[_0x1d62('0x76')][_0x1d62('0x6d')]={};window[_0x1d62('0x76')][_0x1d62('0xdc')]=!0x1;window[_0x1d62('0x76')][_0x1d62('0xdd')]=!0x1;window['_QuatroDigital_AmountProduct'][_0x1d62('0xde')]=!0x1;var _0x492c6d=function(){if(window[_0x1d62('0x76')][_0x1d62('0xdc')]){var _0x404575=!0x1;var _0x2936c3={};window[_0x1d62('0x76')][_0x1d62('0x6d')]={};for(_0x2114e7 in window['_QuatroDigital_DropDown']['getOrderForm'][_0x1d62('0x6d')])if(_0x1d62('0xe')===typeof window['_QuatroDigital_DropDown'][_0x1d62('0x75')][_0x1d62('0x6d')][_0x2114e7]){var _0x33de80=window[_0x1d62('0x17')][_0x1d62('0x75')]['items'][_0x2114e7];_0x1d62('0x2')!==typeof _0x33de80[_0x1d62('0xdf')]&&null!==_0x33de80[_0x1d62('0xdf')]&&''!==_0x33de80[_0x1d62('0xdf')]&&(window[_0x1d62('0x76')][_0x1d62('0x6d')][_0x1d62('0xe0')+_0x33de80['productId']]=window['_QuatroDigital_AmountProduct'][_0x1d62('0x6d')][_0x1d62('0xe0')+_0x33de80[_0x1d62('0xdf')]]||{},window['_QuatroDigital_AmountProduct'][_0x1d62('0x6d')][_0x1d62('0xe0')+_0x33de80[_0x1d62('0xdf')]][_0x1d62('0xe1')]=_0x33de80[_0x1d62('0xdf')],_0x2936c3[_0x1d62('0xe0')+_0x33de80[_0x1d62('0xdf')]]||(window[_0x1d62('0x76')][_0x1d62('0x6d')][_0x1d62('0xe0')+_0x33de80[_0x1d62('0xdf')]][_0x1d62('0xe2')]=0x0),window[_0x1d62('0x76')]['items'][_0x1d62('0xe0')+_0x33de80[_0x1d62('0xdf')]][_0x1d62('0xe2')]+=_0x33de80[_0x1d62('0x8e')],_0x404575=!0x0,_0x2936c3[_0x1d62('0xe0')+_0x33de80[_0x1d62('0xdf')]]=!0x0);}var _0x2114e7=_0x404575;}else _0x2114e7=void 0x0;window[_0x1d62('0x76')][_0x1d62('0xdc')]&&(_0x2bcfa5(_0x1d62('0xe3'))[_0x1d62('0xb8')](),_0x2bcfa5(_0x1d62('0xe4'))['removeClass'](_0x1d62('0xe5')));for(var _0x3b7d4a in window['_QuatroDigital_AmountProduct'][_0x1d62('0x6d')]){_0x33de80=window['_QuatroDigital_AmountProduct'][_0x1d62('0x6d')][_0x3b7d4a];if(_0x1d62('0xe')!==typeof _0x33de80)return;_0x2936c3=_0x2bcfa5(_0x1d62('0xe6')+_0x33de80[_0x1d62('0xe1')]+']')[_0x1d62('0x95')]('li');if(window[_0x1d62('0x76')][_0x1d62('0xdc')]||!_0x2936c3[_0x1d62('0x37')](_0x1d62('0xe3'))[_0x1d62('0x5')])_0x404575=_0x2bcfa5('<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>'),_0x404575['find'](_0x1d62('0xe7'))[_0x1d62('0x5a')](_0x33de80[_0x1d62('0xe2')]),_0x33de80=_0x2936c3[_0x1d62('0x37')]('.qd_bap_wrapper_content'),_0x33de80[_0x1d62('0x5')]?_0x33de80[_0x1d62('0xe8')](_0x404575)[_0x1d62('0x78')](_0x1d62('0xe5')):_0x2936c3[_0x1d62('0xe8')](_0x404575);}_0x2114e7&&(window[_0x1d62('0x76')][_0x1d62('0xdc')]=!0x1);};window['_QuatroDigital_AmountProduct']['exec']=function(){window[_0x1d62('0x76')][_0x1d62('0xdc')]=!0x0;_0x492c6d['call'](this);};_0x2bcfa5(document)[_0x1d62('0xe9')](function(){_0x492c6d[_0x1d62('0x65')](this);});}catch(_0x53ea0b){'undefined'!==typeof console&&_0x1d62('0x79')===typeof console[_0x1d62('0xb')]&&console[_0x1d62('0xb')](_0x1d62('0xc'),_0x53ea0b);}}(this));(function(){try{var _0x1769f2=jQuery,_0x128bf3,_0x3c0fa9={'selector':_0x1d62('0xea'),'dropDown':{},'buyButton':{}};_0x1769f2[_0x1d62('0xeb')]=function(_0x1d64ea){var _0x3efc9b={};_0x128bf3=_0x1769f2['extend'](!0x0,{},_0x3c0fa9,_0x1d64ea);_0x1d64ea=_0x1769f2(_0x128bf3['selector'])[_0x1d62('0x18')](_0x128bf3[_0x1d62('0xec')]);_0x3efc9b['buyButton']=_0x1d62('0x2')!==typeof _0x128bf3[_0x1d62('0xec')][_0x1d62('0xd7')]&&!0x1===_0x128bf3[_0x1d62('0xec')][_0x1d62('0xd7')]?_0x1769f2(_0x128bf3[_0x1d62('0xed')])[_0x1d62('0xee')](_0x1d64ea['fn'],_0x128bf3[_0x1d62('0xef')]):_0x1769f2(_0x128bf3['selector'])[_0x1d62('0xee')](_0x128bf3[_0x1d62('0xef')]);_0x3efc9b[_0x1d62('0xec')]=_0x1d64ea;return _0x3efc9b;};_0x1769f2['fn'][_0x1d62('0xf0')]=function(){_0x1d62('0xe')===typeof console&&_0x1d62('0x79')===typeof console[_0x1d62('0xf')]&&console[_0x1d62('0xf')](_0x1d62('0xf1'));};_0x1769f2[_0x1d62('0xf0')]=_0x1769f2['fn'][_0x1d62('0xf0')];}catch(_0x45acf3){_0x1d62('0x2')!==typeof console&&_0x1d62('0x79')===typeof console['error']&&console['error'](_0x1d62('0xc'),_0x45acf3);}}());

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0xa9e0=['youtube','attr','click','contentWindow','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','start','insertThumbsIn','appendTo','trigger','QuatroDigital.pv_video_added','ajaxStop','load','ImageControl','.qd-videoLink','body','object','alerta','toLowerCase','warn','info','[Video\x20in\x20product]\x20','error','qdVideoInProduct','ul.thumbs','div#image','text','replace','split','length','indexOf','push','pop','shift','be/','<div\x20class=\x22qd-playerWrapper\x22></div>','prependTo','#include','wrap','<div\x20class=\x22qd-playerContainer\x22></div>','fromCharCode','join','toUpperCase','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','html','<iframe\x20src=\x22','urlProtocol','://www.youtube.com/embed/','?wmode=transparent&rel=0&enablejsapi=1&autoplay=','autoPlay','&mute=','mute','data','height','stop','fadeTo','addClass','qdpv-video-on','add','animate','iframe','find','a:not(\x27.qd-videoLink\x27)','bind','click.removeVideo','hide','removeAttr','style','removeClass','.qd-videoItem','call','string','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','click.playVideo','controlVideo','.qd-playerWrapper\x20iframe','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','rel'];(function(_0x2aab99,_0x49ae43){var _0x3e7d92=function(_0x456bc2){while(--_0x456bc2){_0x2aab99['push'](_0x2aab99['shift']());}};_0x3e7d92(++_0x49ae43);}(_0xa9e0,0x1a9));var _0x0a9e=function(_0x34ee7b,_0x4bf773){_0x34ee7b=_0x34ee7b-0x0;var _0x2d66a6=_0xa9e0[_0x34ee7b];return _0x2d66a6;};(function(_0x4a3682){$(function(){if($(document[_0x0a9e('0x0')])['is']('.produto')){var _0x333808=[];var _0x432180=function(_0x2ab90b,_0x991246){_0x0a9e('0x1')===typeof console&&('undefined'!==typeof _0x991246&&_0x0a9e('0x2')===_0x991246[_0x0a9e('0x3')]()?console[_0x0a9e('0x4')]('[Video\x20in\x20product]\x20'+_0x2ab90b):'undefined'!==typeof _0x991246&&_0x0a9e('0x5')===_0x991246['toLowerCase']()?console['info'](_0x0a9e('0x6')+_0x2ab90b):console[_0x0a9e('0x7')](_0x0a9e('0x6')+_0x2ab90b));};window[_0x0a9e('0x8')]=window[_0x0a9e('0x8')]||{};var _0xbd1168=$['extend'](!0x0,{'insertThumbsIn':'start','videoFieldSelector':'td.value-field.Videos:first','controlVideo':!0x0,'urlProtocol':'http','autoPlay':0x0,'mute':0x0},window[_0x0a9e('0x8')]);var _0x36471c=$(_0x0a9e('0x9'));var _0x26d672=$(_0x0a9e('0xa'));var _0x69aeb7=$(_0xbd1168['videoFieldSelector'])[_0x0a9e('0xb')]()[_0x0a9e('0xc')](/;\s*/,';')[_0x0a9e('0xd')](';');for(var _0x281129=0x0;_0x281129<_0x69aeb7[_0x0a9e('0xe')];_0x281129++)-0x1<_0x69aeb7[_0x281129][_0x0a9e('0xf')]('youtube')?_0x333808[_0x0a9e('0x10')](_0x69aeb7[_0x281129]['split']('v=')[_0x0a9e('0x11')]()['split'](/[&#]/)[_0x0a9e('0x12')]()):-0x1<_0x69aeb7[_0x281129][_0x0a9e('0xf')]('youtu.be')&&_0x333808[_0x0a9e('0x10')](_0x69aeb7[_0x281129]['split'](_0x0a9e('0x13'))[_0x0a9e('0x11')]()[_0x0a9e('0xd')](/[\?&#]/)[_0x0a9e('0x12')]());var _0x31b1ca=$(_0x0a9e('0x14'));_0x31b1ca[_0x0a9e('0x15')](_0x0a9e('0x16'));_0x31b1ca[_0x0a9e('0x17')](_0x0a9e('0x18'));_0x69aeb7=function(_0x1c696a){var _0x105080={'s':'yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x2c3407){var _0x155cce=function(_0x53682f){return _0x53682f;};var _0x20f109=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2c3407=_0x2c3407['d'+_0x20f109[0x10]+'c'+_0x20f109[0x11]+'m'+_0x155cce(_0x20f109[0x1])+'n'+_0x20f109[0xd]]['l'+_0x20f109[0x12]+'c'+_0x20f109[0x0]+'ti'+_0x155cce('o')+'n'];var _0x5a09ef=function(_0x588269){return escape(encodeURIComponent(_0x588269[_0x0a9e('0xc')](/\./g,'¨')[_0x0a9e('0xc')](/[a-zA-Z]/g,function(_0x38e7c4){return String[_0x0a9e('0x19')](('Z'>=_0x38e7c4?0x5a:0x7a)>=(_0x38e7c4=_0x38e7c4['charCodeAt'](0x0)+0xd)?_0x38e7c4:_0x38e7c4-0x1a);})));};var _0xfb6e48=_0x5a09ef(_0x2c3407[[_0x20f109[0x9],_0x155cce('o'),_0x20f109[0xc],_0x20f109[_0x155cce(0xd)]][_0x0a9e('0x1a')]('')]);_0x5a09ef=_0x5a09ef((window[['js',_0x155cce('no'),'m',_0x20f109[0x1],_0x20f109[0x4][_0x0a9e('0x1b')](),_0x0a9e('0x1c')][_0x0a9e('0x1a')]('')]||_0x0a9e('0x1d'))+['.v',_0x20f109[0xd],'e',_0x155cce('x'),'co',_0x155cce('mm'),_0x0a9e('0x1e'),_0x20f109[0x1],'.c',_0x155cce('o'),'m.',_0x20f109[0x13],'r']['join'](''));for(var _0x59181e in _0x105080){if(_0x5a09ef===_0x59181e+_0x105080[_0x59181e]||_0xfb6e48===_0x59181e+_0x105080[_0x59181e]){var _0x197ec0='tr'+_0x20f109[0x11]+'e';break;}_0x197ec0='f'+_0x20f109[0x0]+'ls'+_0x155cce(_0x20f109[0x1])+'';}_0x155cce=!0x1;-0x1<_0x2c3407[[_0x20f109[0xc],'e',_0x20f109[0x0],'rc',_0x20f109[0x9]][_0x0a9e('0x1a')]('')][_0x0a9e('0xf')](_0x0a9e('0x1f'))&&(_0x155cce=!0x0);return[_0x197ec0,_0x155cce];}(_0x1c696a);}(window);if(!eval(_0x69aeb7[0x0]))return _0x69aeb7[0x1]?_0x432180('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x384319=function(_0x479bc4,_0x45a1e7){'youtube'===_0x45a1e7&&_0x31b1ca[_0x0a9e('0x20')](_0x0a9e('0x21')+_0xbd1168[_0x0a9e('0x22')]+_0x0a9e('0x23')+_0x479bc4+_0x0a9e('0x24')+_0xbd1168[_0x0a9e('0x25')]+_0x0a9e('0x26')+_0xbd1168[_0x0a9e('0x27')]+'\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>');_0x26d672[_0x0a9e('0x28')](_0x0a9e('0x29'),_0x26d672[_0x0a9e('0x28')](_0x0a9e('0x29'))||_0x26d672['height']());_0x26d672[_0x0a9e('0x2a')](!0x0,!0x0)[_0x0a9e('0x2b')](0x1f4,0x0,function(){$(_0x0a9e('0x0'))[_0x0a9e('0x2c')](_0x0a9e('0x2d'));});_0x31b1ca[_0x0a9e('0x2a')](!0x0,!0x0)[_0x0a9e('0x2b')](0x1f4,0x1,function(){_0x26d672[_0x0a9e('0x2e')](_0x31b1ca)[_0x0a9e('0x2f')]({'height':_0x31b1ca['find'](_0x0a9e('0x30'))['height']()},0x2bc);});};removePlayer=function(){_0x36471c[_0x0a9e('0x31')](_0x0a9e('0x32'))[_0x0a9e('0x33')](_0x0a9e('0x34'),function(){_0x31b1ca[_0x0a9e('0x2a')](!0x0,!0x0)['fadeTo'](0x1f4,0x0,function(){$(this)[_0x0a9e('0x35')]()[_0x0a9e('0x36')](_0x0a9e('0x37'));$(_0x0a9e('0x0'))[_0x0a9e('0x38')](_0x0a9e('0x2d'));});_0x26d672[_0x0a9e('0x2a')](!0x0,!0x0)[_0x0a9e('0x2b')](0x1f4,0x1,function(){var _0x5583a4=_0x26d672[_0x0a9e('0x28')]('height');_0x5583a4&&_0x26d672[_0x0a9e('0x2f')]({'height':_0x5583a4},0x2bc);});});};var _0x14b13f=function(){if(!_0x36471c[_0x0a9e('0x31')](_0x0a9e('0x39'))['length'])for(vId in removePlayer[_0x0a9e('0x3a')](this),_0x333808)if(_0x0a9e('0x3b')===typeof _0x333808[vId]&&''!==_0x333808[vId]){var _0x1fa90d=$(_0x0a9e('0x3c')+_0x333808[vId]+'/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27'+_0x333808[vId]+'\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/'+_0x333808[vId]+_0x0a9e('0x3d'));_0x1fa90d['find']('a')[_0x0a9e('0x33')](_0x0a9e('0x3e'),function(){var _0x381c37=$(this);_0x36471c[_0x0a9e('0x31')]('.ON')[_0x0a9e('0x38')]('ON');_0x381c37[_0x0a9e('0x2c')]('ON');0x1==_0xbd1168[_0x0a9e('0x3f')]?$('.qd-playerWrapper\x20iframe')[_0x0a9e('0xe')]?(_0x384319[_0x0a9e('0x3a')](this,'',''),$(_0x0a9e('0x40'))[0x0]['contentWindow']['postMessage'](_0x0a9e('0x41'),'*')):_0x384319[_0x0a9e('0x3a')](this,_0x381c37['attr'](_0x0a9e('0x42')),_0x0a9e('0x43')):_0x384319[_0x0a9e('0x3a')](this,_0x381c37[_0x0a9e('0x44')]('rel'),'youtube');return!0x1;});0x1==_0xbd1168[_0x0a9e('0x3f')]&&_0x36471c[_0x0a9e('0x31')]('a:not(.qd-videoLink)')[_0x0a9e('0x45')](function(_0x1dec2e){$(_0x0a9e('0x40'))['length']&&$(_0x0a9e('0x40'))[0x0][_0x0a9e('0x46')][_0x0a9e('0x47')](_0x0a9e('0x48'),'*');});_0x0a9e('0x49')===_0xbd1168[_0x0a9e('0x4a')]?_0x1fa90d[_0x0a9e('0x15')](_0x36471c):_0x1fa90d[_0x0a9e('0x4b')](_0x36471c);_0x1fa90d[_0x0a9e('0x4c')](_0x0a9e('0x4d'),[_0x333808[vId],_0x1fa90d]);}};$(document)[_0x0a9e('0x4e')](_0x14b13f);$(window)[_0x0a9e('0x4f')](_0x14b13f);(function(){var _0x1a7bce=this;var _0x11ca30=window[_0x0a9e('0x50')]||function(){};window['ImageControl']=function(_0x52628e,_0x473fdc){$(_0x52628e||'')['is'](_0x0a9e('0x51'))||(_0x11ca30[_0x0a9e('0x3a')](this,_0x52628e,_0x473fdc),_0x14b13f[_0x0a9e('0x3a')](_0x1a7bce));};}());}});}(this));

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
var _0x6915=['fromCharCode','charCodeAt','join','toUpperCase','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','Quatro\x20Digital\x20-\x20Smart\x20Image\x20Load','object','undefined','error','warn','unshift','alerta','aviso','toLowerCase','info','apply','300','QD_SIL_scroll\x20QuatroDigital.is_Callback','find','imageWrapper','not','.qd-sil-on','img:visible','length','scrollTop','top','first','height','Problemas\x20:(\x20.\x20Detalhes:\x20','addClass','qd-sil-image-loaded','attr','src','sizes','width','qd-sil-image','insertAfter','closest','qd-sil-on','offset','bottom','each','scroll','trigger','QD_smartImageLoad','function','replace'];(function(_0x4d78b6,_0x5debe6){var _0x28d332=function(_0x2c34fb){while(--_0x2c34fb){_0x4d78b6['push'](_0x4d78b6['shift']());}};_0x28d332(++_0x5debe6);}(_0x6915,0x123));var _0x5691=function(_0x5eedc2,_0x180b55){_0x5eedc2=_0x5eedc2-0x0;var _0x4f986b=_0x6915[_0x5eedc2];return _0x4f986b;};(function(_0x3d7e79){'use strict';var _0x400bec=jQuery;if(typeof _0x400bec['fn'][_0x5691('0x0')]===_0x5691('0x1'))return;_0x400bec['fn'][_0x5691('0x0')]=function(){};var _0x4baa80=function(_0x23f710){var _0x59f8fb={'s':'yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x24f054){var _0x209ff3,_0x49943e,_0x1da3ba,_0x2aac5a;_0x49943e=function(_0x19fc82){return _0x19fc82;};_0x1da3ba=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x24f054=_0x24f054['d'+_0x1da3ba[0x10]+'c'+_0x1da3ba[0x11]+'m'+_0x49943e(_0x1da3ba[0x1])+'n'+_0x1da3ba[0xd]]['l'+_0x1da3ba[0x12]+'c'+_0x1da3ba[0x0]+'ti'+_0x49943e('o')+'n'];_0x209ff3=function(_0x7aaf03){return escape(encodeURIComponent(_0x7aaf03[_0x5691('0x2')](/\./g,'¨')[_0x5691('0x2')](/[a-zA-Z]/g,function(_0x3de3f6){return String[_0x5691('0x3')](('Z'>=_0x3de3f6?0x5a:0x7a)>=(_0x3de3f6=_0x3de3f6[_0x5691('0x4')](0x0)+0xd)?_0x3de3f6:_0x3de3f6-0x1a);})));};var _0x400659=_0x209ff3(_0x24f054[[_0x1da3ba[0x9],_0x49943e('o'),_0x1da3ba[0xc],_0x1da3ba[_0x49943e(0xd)]][_0x5691('0x5')]('')]);_0x209ff3=_0x209ff3((window[['js',_0x49943e('no'),'m',_0x1da3ba[0x1],_0x1da3ba[0x4][_0x5691('0x6')](),'ite']['join']('')]||_0x5691('0x7'))+['.v',_0x1da3ba[0xd],'e',_0x49943e('x'),'co',_0x49943e('mm'),_0x5691('0x8'),_0x1da3ba[0x1],'.c',_0x49943e('o'),'m.',_0x1da3ba[0x13],'r']['join'](''));for(var _0x126926 in _0x59f8fb){if(_0x209ff3===_0x126926+_0x59f8fb[_0x126926]||_0x400659===_0x126926+_0x59f8fb[_0x126926]){_0x2aac5a='tr'+_0x1da3ba[0x11]+'e';break;}_0x2aac5a='f'+_0x1da3ba[0x0]+'ls'+_0x49943e(_0x1da3ba[0x1])+'';}_0x49943e=!0x1;-0x1<_0x24f054[[_0x1da3ba[0xc],'e',_0x1da3ba[0x0],'rc',_0x1da3ba[0x9]]['join']('')]['indexOf'](_0x5691('0x9'))&&(_0x49943e=!0x0);return[_0x2aac5a,_0x49943e];}(_0x23f710);}(window);if(!eval(_0x4baa80[0x0]))return _0x4baa80[0x1]?_0x8a2e7e('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x5027f3=_0x5691('0xa');var _0x8a2e7e=function(_0x174a4f,_0x1fe716){if(_0x5691('0xb')===typeof console&&_0x5691('0xc')!==typeof console[_0x5691('0xd')]&&_0x5691('0xc')!==typeof console['info']&&'undefined'!==typeof console[_0x5691('0xe')]){if(_0x5691('0xb')==typeof _0x174a4f&&'function'==typeof _0x174a4f[_0x5691('0xf')]){_0x174a4f[_0x5691('0xf')]('['+_0x5027f3+']\x0a');var _0x13bf47=_0x174a4f;}else _0x13bf47=['['+_0x5027f3+']\x0a',_0x174a4f];if(_0x5691('0xc')==typeof _0x1fe716||_0x5691('0x10')!==_0x1fe716['toLowerCase']()&&_0x5691('0x11')!==_0x1fe716[_0x5691('0x12')]())if(_0x5691('0xc')!=typeof _0x1fe716&&_0x5691('0x13')==_0x1fe716['toLowerCase']())try{console['info']['apply'](console,_0x13bf47);}catch(_0x47bf5e){try{console[_0x5691('0x13')](_0x13bf47[_0x5691('0x5')]('\x0a'));}catch(_0x22efb8){}}else try{console[_0x5691('0xd')]['apply'](console,_0x13bf47);}catch(_0x1ea790){try{console[_0x5691('0xd')](_0x13bf47[_0x5691('0x5')]('\x0a'));}catch(_0x453471){}}else try{console[_0x5691('0xe')][_0x5691('0x14')](console,_0x13bf47);}catch(_0x3bf9a4){try{console[_0x5691('0xe')](_0x13bf47[_0x5691('0x5')]('\x0a'));}catch(_0x27544b){}}}};var _0x1a96a7=/(ids\/[0-9]+-)[0-9-]+/i;var _0x18aa6c={'imageWrapper':'.qd_sil_img_wrapper','sizes':{'width':_0x5691('0x15'),'height':'300'}};var _0x35165c=function(_0x54c371,_0x29b845){'use strict';_0xf4c0d4();_0x400bec(window)['on'](_0x5691('0x16'),_0xf4c0d4);function _0xf4c0d4(){try{var _0x25a8b4=_0x54c371[_0x5691('0x17')](_0x29b845[_0x5691('0x18')])[_0x5691('0x19')](_0x5691('0x1a'))[_0x5691('0x17')](_0x5691('0x1b'));if(!_0x25a8b4[_0x5691('0x1c')])return;var _0x1a2821=_0x400bec(window);var _0x5374da={'top':_0x1a2821[_0x5691('0x1d')]()};_0x5374da['bottom']=_0x5374da[_0x5691('0x1e')]+_0x1a2821['height']();var _0x33fc53=_0x25a8b4[_0x5691('0x1f')]()[_0x5691('0x20')]();var _0x4985fd=_0x3b3151(_0x25a8b4,_0x5374da,_0x33fc53);for(var _0x1b2a0a=0x0;_0x1b2a0a<_0x4985fd[_0x5691('0x1c')];_0x1b2a0a++)_0x7e5347(_0x400bec(_0x4985fd[_0x1b2a0a]));}catch(_0x332e8a){typeof console!==_0x5691('0xc')&&typeof console[_0x5691('0xd')]===_0x5691('0x1')&&console[_0x5691('0xd')](_0x5691('0x21'),_0x332e8a);}}function _0x7e5347(_0x4107d3){var _0x300a14=_0x4107d3['clone']();_0x300a14['on']('load',function(){_0x400bec(this)[_0x5691('0x22')](_0x5691('0x23'));});_0x300a14[_0x5691('0x24')]({'src':_0x300a14[0x0][_0x5691('0x25')][_0x5691('0x2')](_0x1a96a7,'$1'+_0x29b845[_0x5691('0x26')][_0x5691('0x27')]+'-'+_0x29b845[_0x5691('0x26')]['height']),'width':_0x29b845[_0x5691('0x26')]['width'],'height':_0x29b845[_0x5691('0x26')]['height']});_0x300a14[_0x5691('0x22')](_0x5691('0x28'))[_0x5691('0x29')](_0x4107d3);_0x300a14[_0x5691('0x2a')](_0x29b845[_0x5691('0x18')])[_0x5691('0x22')](_0x5691('0x2b'));}function _0x3b3151(_0x63b51e,_0x5e5c56,_0xc1e65e){var _0x2ec300;var _0x876776=[];for(var _0x281c5c=0x0;_0x281c5c<_0x63b51e[_0x5691('0x1c')];_0x281c5c++){_0x2ec300=_0x400bec(_0x63b51e[_0x281c5c])[_0x5691('0x2c')]();_0x2ec300['bottom']=_0x2ec300[_0x5691('0x1e')]+_0xc1e65e;if(!(_0x5e5c56[_0x5691('0x2d')]<_0x2ec300[_0x5691('0x1e')]||_0x5e5c56[_0x5691('0x1e')]>_0x2ec300['bottom'])){_0x876776['push'](_0x63b51e[_0x281c5c]);}}return _0x876776;};};_0x400bec['fn'][_0x5691('0x0')]=function(_0x45a8cc){var _0x15db2e=_0x400bec(this);if(!_0x15db2e[_0x5691('0x1c')])return _0x15db2e;_0x15db2e[_0x5691('0x2e')](function(){var _0x508773=_0x400bec(this);_0x508773[_0x5691('0x0')]=new _0x35165c(_0x508773,_0x400bec['extend']({},_0x18aa6c,_0x45a8cc));});return _0x15db2e;};window['QD_SIL_scrollRange']=0x28;var _0x391e2a=QD_SIL_scrollRange;var _0x47471b=0x0;_0x400bec(window)['on'](_0x5691('0x2f'),function(){var _0x12b98e=document['documentElement'][_0x5691('0x1d')];if(_0x12b98e>_0x47471b+_0x391e2a||_0x12b98e<_0x47471b-_0x391e2a){_0x400bec(window)[_0x5691('0x30')]('QD_SIL_scroll');_0x47471b=_0x12b98e;}});}(this));