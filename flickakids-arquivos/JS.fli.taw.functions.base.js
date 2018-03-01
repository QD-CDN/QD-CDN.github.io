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
			// Product.setAvailableBodyClass();
			Product.scrollToDescription();
			Product.qdCallThumbVideo();
			Product.qdHideUniqueSkuOption();
			// Product.saveAmountFlag();
			Product.openShipping();
			Product.qdClickTableMeasures();
			Product.scrollToBuyButton();
			Product.showFloatingBuyBar();

			// Apenas para tela de KIT
			if( $(document.body).is(".product-kit")){
				Product.kitShowItem();
				Product.kitShowSpecification();
				Product.kitItemSelected();
				Product.kitItemSkuSelect();
				Product.kitDustRenderCallback();
				Product.kitUnavailableCheck();
				Product.kitShowDescription();
				Product.kitShowImage();
				Product.kitBuyAllItemsButton();
				Product.updateKitTotalPrice();
			}
			else{
				Product.saveAmountFlag();
				Product.setAvailableBodyClass();	
			}
			
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
		},
		kitShowItem: function () {
			$(".product-qd-v1-kit-item-row").each(function () {
				if ($(this).find("#image-main").length) {
					$(this).show();
				}
			});
		},
		kitShowSpecification: function () {
			$(".specification-row").each(function () {
				if ($(this).find(".productName").length) {
					$(this).show();
				}
			});
		},
		kitItemSelected: function () {
			$(".kit-item-selects").bind("click", function () {
				$(this).parents(".product-qd-v1-kit-item-row").toggleClass("qd-state-not-selected");
				Product.updateKitTotalPrice();
			});
		},
		kitBuyAllItemsButton: function() {
			$(".product-qd-v1-buy-button a").attr('href', '#').click(function(e){
				
				var url = Product.setBuyUrl();
				if(url)
					$(this).attr('href', url);
				else{
					e.preventDefault();
					alert('Por favor, selecione o modelo desejado.');
				}
			});
		},
		setBuyUrl: function(){
			var btns = $(".product-qd-v1-kit-item-row:not('.qd-state-not-selected, .qd-item-unavailable') .buy-in-page-button");
			var uri = [];
			btns.each(function(){
				var href = this.href || "";
				
				if( href == "" || href.indexOf("javascript:alert(") > -1 ){
					uri = [];
					
					var elem = $(this).closest('.product-qd-v1-kit-item-row').addClass('qd-state-not-chosen');
					$("html, body").animate({ scrollTop: elem.offset().top - 150 });
					setTimeout(function() {
						elem.removeClass('qd-state-not-chosen');
					}, 700);

					return false;
				}

				var param = (this.search || '').replace('?','').split("&");
				var itemUri = [];
				for( var k = 0; k < param.length; k++ ){
					if( param[k].search(/^(sku|qty|seller)/i) != 0)
						continue;
					itemUri.push( param[k] );
				}
				uri.push( itemUri.join("&") );

			});

			if(uri.length)
				return "/checkout/cart/add?" + uri.join("&") + "&sc=" + jssalesChannel;
		},
		kitDustRenderCallback: function () {
			var orig = window.dust.render;

			window.dust.render = function () {
				orig.apply(this, arguments);

				Product.kitUnavailableCheck();
			}
		},
		kitUnavailableCheck: function () {
			$(".product-qd-v1-kit-item-row").each(function () {
				var $t = $(this);
				if ($t.find(".sku-notifyme:visible").length)
					$t.addClass("qd-item-unavailable");
				else
					$t.removeClass("qd-item-unavailable");
			});
		},
		kitShowDescription: function () {
			var wrapper = $('.product-qd-v1-specification');

			$(".product-qd-v1-kit-details a").click(function (e) {
				e.preventDefault();				

				var pId = $(this).closest('.product-qd-v1-kit-item-row').find('.product-qd-v1-name #___rc-p-id').val();
				var elem = wrapper.find('#___rc-p-id[value=' + pId + ']').closest('.specification-row').addClass('qd-specification-hightlight');
				$("html, body").animate({ scrollTop: elem.offset().top - 150 });
				setTimeout(function() {
					elem.removeClass('qd-specification-hightlight');
				}, 1500);
				
				return false;
			})
		},
		kitShowImage: function () {
			$(".product-qd-v1-kit-image").bind("click", function () {
				if (typeof window.FireSkuChangeImage === "function")
					window.FireSkuChangeImage(($(this).parents(".product-qd-v1-kit-item-row").find("#___rc-p-sku-ids").val() || "").split(",").shift());

				$('html, body').animate({ scrollTop: Math.floor($(".bread-crumb").offset().top || 0) });

				return false;
			});

			$(".product-picture").bind("click", function () {
				if (typeof window.FireSkuChangeImage === "function")
					window.FireSkuChangeImage(($(".product-qd-v1-name #___rc-p-sku-ids").val() || "").split(",").shift());

				$('html, body').animate({ scrollTop: Math.floor($("header").offset().top || 0) });
				// $('html, body').animate({ scrollTop: Math.floor($(".bread-crumb").offset().top || 0) });

				return false;
			});
		},
		kitItemSkuSelect: function () {
			$(".product-kit-sku-selection .sku-selector").bind("change", function () {
				if($(this)[0].value)
					Product.updateKitTotalPrice();
			});
		},
		updateKitTotalPrice: function () {
			var installment = 1;
			var totalPrice = 0;
			var items = $(".product-qd-v1-kit-item-row:not('.qd-state-not-selected, .qd-item-unavailable') a.buy-in-page-button");
			
			for(var i = 0; i < items.length; i++){
				var sku = '';
				var url = items[i].href;
				if(url.indexOf('sku=') >= 0){
					sku = items[i].href.split('?')[1].match(/sku=(\s*\d+)/i)[1];
				}

				var skuData = Product.getKitItemPrice($(items[i]).attr('productindex'), sku);
				
				installment = Math.min(installment, skuData['installment']);
				totalPrice += skuData['price'];
			}
			
			
			$('.product-qd-v1-price-wrapper .skuBestInstallmentNumber').html(installment + "<span class='x'>x</span>");
			$('.product-qd-v1-price-wrapper .skuBestInstallmentValue').text('R$ ' + (totalPrice / (installment*100)).toFixed(2).toString().replace('.',','));
			$('.product-qd-v1-price-wrapper .skuBestPrice').text('R$ ' + (totalPrice / 100).toFixed(2).toString().replace('.',','));
		},
		getKitItemPrice: function(productindex, sku) {
			var skuData = [];
			var selectedSku = '';
			var productJson = window['skuJson_' + productindex];
			if(sku){
				for(var k = 0; k < productJson.skus.length; k++) {
					if(productJson.skus[k].sku == sku)
						selectedSku = productJson.skus[k];
				}
			}
			else {
				for(var k = 0; k < productJson.skus.length; k++) {
					if(!selectedSku || productJson.skus[k].bestPrice < selectedSku.bestPrice)
						selectedSku = productJson.skus[k];
				}
			}
			skuData['price'] = selectedSku.bestPrice * selectedSku.unitMultiplier;
			skuData['installment'] = selectedSku.installments;
			return skuData;
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
var _0x19bc=['readyState','data','textStatus','errorThrown','version','2.1','/produto/sku/','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','QD_smartStockAvailable','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','alerta','aviso','info','toLowerCase','apply','warn','removeClass','qd-ssa-sku-no-selected','addClass','SkuSellersInformation','AvailableQuantity','attr','data-qd-ssa-qtt','find','[data-qd-ssa-text]','hide','qd-ssa-hide','qd-ssa-show','filter','[data-qd-ssa-text=\x22','length','html','replace','#qtt','message','qd-ssa-skus-','skus','split','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','trigger','QuatroDigital.ssa.prodUnavailable','off','qd-ssa-sku-prod-unavailable','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','join','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','qdPlugin','initialSkuSelected','QuatroDigital.ssa.skuSelected','unavailable','vtex.sku.selected.QD','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','available','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','function','qdAjax','qdAjaxQueue','extend','url','opts','push','call','error','parameters','callbackFns','successPopulated','boolean','errorPopulated','completePopulated','success','object','complete','clearQueueDelay','undefined','jqXHR','ajax'];(function(_0x5941c0,_0x4dacd6){var _0x2eca75=function(_0x1f68bb){while(--_0x1f68bb){_0x5941c0['push'](_0x5941c0['shift']());}};_0x2eca75(++_0x4dacd6);}(_0x19bc,0x1a7));var _0x191c=function(_0x36fdde,_0x5df993){_0x36fdde=_0x36fdde-0x0;var _0x40579f=_0x19bc[_0x36fdde];return _0x40579f;};(function(_0x1ba2a1){if(_0x191c('0x0')!==typeof _0x1ba2a1[_0x191c('0x1')]){var _0x37139a={};_0x1ba2a1[_0x191c('0x2')]=_0x37139a;_0x1ba2a1[_0x191c('0x1')]=function(_0x30f8fb){var _0x1bc451=_0x1ba2a1[_0x191c('0x3')]({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x30f8fb);var _0x27b5e8=escape(encodeURIComponent(_0x1bc451[_0x191c('0x4')]));_0x37139a[_0x27b5e8]=_0x37139a[_0x27b5e8]||{};_0x37139a[_0x27b5e8]['opts']=_0x37139a[_0x27b5e8]['opts']||[];_0x37139a[_0x27b5e8][_0x191c('0x5')][_0x191c('0x6')]({'success':function(_0x4e59d3,_0x4f6eff,_0x5060ac){_0x1bc451['success'][_0x191c('0x7')](this,_0x4e59d3,_0x4f6eff,_0x5060ac);},'error':function(_0x53e856,_0x303a7e,_0x202581){_0x1bc451[_0x191c('0x8')][_0x191c('0x7')](this,_0x53e856,_0x303a7e,_0x202581);},'complete':function(_0x27e88e,_0x1b0a15){_0x1bc451['complete'][_0x191c('0x7')](this,_0x27e88e,_0x1b0a15);}});_0x37139a[_0x27b5e8]['parameters']=_0x37139a[_0x27b5e8][_0x191c('0x9')]||{'success':{},'error':{},'complete':{}};_0x37139a[_0x27b5e8][_0x191c('0xa')]=_0x37139a[_0x27b5e8][_0x191c('0xa')]||{};_0x37139a[_0x27b5e8]['callbackFns'][_0x191c('0xb')]=_0x191c('0xc')===typeof _0x37139a[_0x27b5e8][_0x191c('0xa')]['successPopulated']?_0x37139a[_0x27b5e8][_0x191c('0xa')]['successPopulated']:!0x1;_0x37139a[_0x27b5e8][_0x191c('0xa')][_0x191c('0xd')]=_0x191c('0xc')===typeof _0x37139a[_0x27b5e8]['callbackFns'][_0x191c('0xd')]?_0x37139a[_0x27b5e8][_0x191c('0xa')][_0x191c('0xd')]:!0x1;_0x37139a[_0x27b5e8][_0x191c('0xa')][_0x191c('0xe')]='boolean'===typeof _0x37139a[_0x27b5e8][_0x191c('0xa')][_0x191c('0xe')]?_0x37139a[_0x27b5e8][_0x191c('0xa')][_0x191c('0xe')]:!0x1;_0x30f8fb=_0x1ba2a1[_0x191c('0x3')]({},_0x1bc451,{'success':function(_0x8b8eac,_0xfadf6a,_0x56af5b){_0x37139a[_0x27b5e8][_0x191c('0x9')][_0x191c('0xf')]={'data':_0x8b8eac,'textStatus':_0xfadf6a,'jqXHR':_0x56af5b};_0x37139a[_0x27b5e8][_0x191c('0xa')][_0x191c('0xb')]=!0x0;for(var _0x3a8e63 in _0x37139a[_0x27b5e8]['opts'])_0x191c('0x10')===typeof _0x37139a[_0x27b5e8][_0x191c('0x5')][_0x3a8e63]&&(_0x37139a[_0x27b5e8][_0x191c('0x5')][_0x3a8e63]['success'][_0x191c('0x7')](this,_0x8b8eac,_0xfadf6a,_0x56af5b),_0x37139a[_0x27b5e8][_0x191c('0x5')][_0x3a8e63][_0x191c('0xf')]=function(){});},'error':function(_0x3832c2,_0x27ca34,_0xac1e1e){_0x37139a[_0x27b5e8][_0x191c('0x9')][_0x191c('0x8')]={'errorThrown':_0xac1e1e,'textStatus':_0x27ca34,'jqXHR':_0x3832c2};_0x37139a[_0x27b5e8]['callbackFns'][_0x191c('0xd')]=!0x0;for(var _0x1c8a01 in _0x37139a[_0x27b5e8][_0x191c('0x5')])_0x191c('0x10')===typeof _0x37139a[_0x27b5e8][_0x191c('0x5')][_0x1c8a01]&&(_0x37139a[_0x27b5e8][_0x191c('0x5')][_0x1c8a01][_0x191c('0x8')][_0x191c('0x7')](this,_0x3832c2,_0x27ca34,_0xac1e1e),_0x37139a[_0x27b5e8][_0x191c('0x5')][_0x1c8a01][_0x191c('0x8')]=function(){});},'complete':function(_0x4a4b36,_0x1ce498){_0x37139a[_0x27b5e8]['parameters'][_0x191c('0x11')]={'textStatus':_0x1ce498,'jqXHR':_0x4a4b36};_0x37139a[_0x27b5e8]['callbackFns'][_0x191c('0xe')]=!0x0;for(var _0x44823e in _0x37139a[_0x27b5e8][_0x191c('0x5')])_0x191c('0x10')===typeof _0x37139a[_0x27b5e8][_0x191c('0x5')][_0x44823e]&&(_0x37139a[_0x27b5e8]['opts'][_0x44823e][_0x191c('0x11')][_0x191c('0x7')](this,_0x4a4b36,_0x1ce498),_0x37139a[_0x27b5e8][_0x191c('0x5')][_0x44823e][_0x191c('0x11')]=function(){});isNaN(parseInt(_0x1bc451[_0x191c('0x12')]))||setTimeout(function(){_0x37139a[_0x27b5e8]['jqXHR']=void 0x0;_0x37139a[_0x27b5e8][_0x191c('0x5')]=void 0x0;_0x37139a[_0x27b5e8][_0x191c('0x9')]=void 0x0;_0x37139a[_0x27b5e8]['callbackFns']=void 0x0;},_0x1bc451[_0x191c('0x12')]);}});_0x191c('0x13')===typeof _0x37139a[_0x27b5e8]['jqXHR']?_0x37139a[_0x27b5e8][_0x191c('0x14')]=_0x1ba2a1[_0x191c('0x15')](_0x30f8fb):_0x37139a[_0x27b5e8][_0x191c('0x14')]&&_0x37139a[_0x27b5e8][_0x191c('0x14')][_0x191c('0x16')]&&0x4==_0x37139a[_0x27b5e8][_0x191c('0x14')][_0x191c('0x16')]&&(_0x37139a[_0x27b5e8][_0x191c('0xa')][_0x191c('0xb')]&&_0x30f8fb['success'](_0x37139a[_0x27b5e8][_0x191c('0x9')][_0x191c('0xf')][_0x191c('0x17')],_0x37139a[_0x27b5e8]['parameters'][_0x191c('0xf')][_0x191c('0x18')],_0x37139a[_0x27b5e8][_0x191c('0x9')][_0x191c('0xf')]['jqXHR']),_0x37139a[_0x27b5e8][_0x191c('0xa')]['errorPopulated']&&_0x30f8fb['error'](_0x37139a[_0x27b5e8][_0x191c('0x9')][_0x191c('0x8')][_0x191c('0x14')],_0x37139a[_0x27b5e8][_0x191c('0x9')][_0x191c('0x8')][_0x191c('0x18')],_0x37139a[_0x27b5e8][_0x191c('0x9')]['error'][_0x191c('0x19')]),_0x37139a[_0x27b5e8]['callbackFns'][_0x191c('0xe')]&&_0x30f8fb['complete'](_0x37139a[_0x27b5e8][_0x191c('0x9')]['complete']['jqXHR'],_0x37139a[_0x27b5e8][_0x191c('0x9')][_0x191c('0x11')][_0x191c('0x18')]));};_0x1ba2a1['qdAjax'][_0x191c('0x1a')]=_0x191c('0x1b');}}(jQuery));(function(_0x44a915){function _0x51cef6(_0x290e50,_0x3c027c){_0x16b0dc['qdAjax']({'url':_0x191c('0x1c')+_0x290e50,'clearQueueDelay':null,'success':_0x3c027c,'error':function(){_0x5088d8(_0x191c('0x1d'));}});}var _0x16b0dc=jQuery;if(_0x191c('0x0')!==typeof _0x16b0dc['fn'][_0x191c('0x1e')]){var _0x5088d8=function(_0x428910,_0x1a519a){if(_0x191c('0x10')===typeof console){var _0x1b4f33;_0x191c('0x10')===typeof _0x428910?(_0x428910[_0x191c('0x1f')](_0x191c('0x20')),_0x1b4f33=_0x428910):_0x1b4f33=[_0x191c('0x20')+_0x428910];_0x191c('0x13')===typeof _0x1a519a||_0x191c('0x21')!==_0x1a519a['toLowerCase']()&&_0x191c('0x22')!==_0x1a519a['toLowerCase']()?_0x191c('0x13')!==typeof _0x1a519a&&_0x191c('0x23')===_0x1a519a[_0x191c('0x24')]()?console['info'][_0x191c('0x25')](console,_0x1b4f33):console[_0x191c('0x8')][_0x191c('0x25')](console,_0x1b4f33):console[_0x191c('0x26')]['apply'](console,_0x1b4f33);}},_0x16d87f={},_0xde3965=function(_0x365652,_0x19b07f){function _0x22638b(_0x1b51ad){try{_0x365652[_0x191c('0x27')](_0x191c('0x28'))[_0x191c('0x29')]('qd-ssa-sku-selected');var _0x12ec42=_0x1b51ad[0x0][_0x191c('0x2a')][0x0][_0x191c('0x2b')];_0x365652[_0x191c('0x2c')](_0x191c('0x2d'),_0x12ec42);_0x365652['each'](function(){var _0x365652=_0x16b0dc(this)[_0x191c('0x2e')](_0x191c('0x2f'));if(0x1>_0x12ec42)return _0x365652[_0x191c('0x30')]()[_0x191c('0x29')](_0x191c('0x31'))['removeClass'](_0x191c('0x32'));var _0x1b51ad=_0x365652[_0x191c('0x33')](_0x191c('0x34')+_0x12ec42+'\x22]');_0x1b51ad=_0x1b51ad[_0x191c('0x35')]?_0x1b51ad:_0x365652['filter']('[data-qd-ssa-text=\x22default\x22]');_0x365652['hide']()['addClass'](_0x191c('0x31'))[_0x191c('0x27')](_0x191c('0x32'));_0x1b51ad[_0x191c('0x36')]((_0x1b51ad[_0x191c('0x36')]()||'')[_0x191c('0x37')](_0x191c('0x38'),_0x12ec42));_0x1b51ad['show']()[_0x191c('0x29')](_0x191c('0x32'))[_0x191c('0x27')](_0x191c('0x31'));});}catch(_0x175284){_0x5088d8(['Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20',_0x175284[_0x191c('0x39')]]);}}if(_0x365652['length']){_0x365652[_0x191c('0x29')]('qd-ssa-on');_0x365652['addClass'](_0x191c('0x28'));try{_0x365652[_0x191c('0x29')](_0x191c('0x3a')+vtxctx[_0x191c('0x3b')][_0x191c('0x3c')](';')[_0x191c('0x35')]);}catch(_0x4f6bdd){_0x5088d8([_0x191c('0x3d'),_0x4f6bdd['message']]);}_0x16b0dc(window)['on'](_0x191c('0x3e'),function(_0x15ce91,_0x2a8be,_0x3f509b){try{_0x51cef6(_0x3f509b[_0x191c('0x3f')],function(_0x3e62cf){_0x22638b(_0x3e62cf);0x1===vtxctx[_0x191c('0x3b')][_0x191c('0x3c')](';')[_0x191c('0x35')]&&0x0==_0x3e62cf[0x0]['SkuSellersInformation'][0x0][_0x191c('0x2b')]&&_0x16b0dc(window)[_0x191c('0x40')](_0x191c('0x41'));});}catch(_0x19e138){_0x5088d8(['Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20',_0x19e138[_0x191c('0x39')]]);}});_0x16b0dc(window)[_0x191c('0x42')]('vtex.sku.selected.QD');_0x16b0dc(window)['on']('QuatroDigital.ssa.prodUnavailable',function(){_0x365652[_0x191c('0x29')](_0x191c('0x43'))['hide']();});}};_0x44a915=function(_0x12cf7f){var _0x55b675={'s':_0x191c('0x44')};return function(_0x232608){var _0xa5ef12=function(_0x1d7a38){return _0x1d7a38;};var _0x2b61cb=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x232608=_0x232608['d'+_0x2b61cb[0x10]+'c'+_0x2b61cb[0x11]+'m'+_0xa5ef12(_0x2b61cb[0x1])+'n'+_0x2b61cb[0xd]]['l'+_0x2b61cb[0x12]+'c'+_0x2b61cb[0x0]+'ti'+_0xa5ef12('o')+'n'];var _0x5e52ab=function(_0x1ba8e3){return escape(encodeURIComponent(_0x1ba8e3[_0x191c('0x37')](/\./g,'¨')[_0x191c('0x37')](/[a-zA-Z]/g,function(_0x1d6437){return String[_0x191c('0x45')](('Z'>=_0x1d6437?0x5a:0x7a)>=(_0x1d6437=_0x1d6437[_0x191c('0x46')](0x0)+0xd)?_0x1d6437:_0x1d6437-0x1a);})));};var _0x4c8e68=_0x5e52ab(_0x232608[[_0x2b61cb[0x9],_0xa5ef12('o'),_0x2b61cb[0xc],_0x2b61cb[_0xa5ef12(0xd)]][_0x191c('0x47')]('')]);_0x5e52ab=_0x5e52ab((window[['js',_0xa5ef12('no'),'m',_0x2b61cb[0x1],_0x2b61cb[0x4][_0x191c('0x48')](),_0x191c('0x49')][_0x191c('0x47')]('')]||_0x191c('0x4a'))+['.v',_0x2b61cb[0xd],'e',_0xa5ef12('x'),'co',_0xa5ef12('mm'),_0x191c('0x4b'),_0x2b61cb[0x1],'.c',_0xa5ef12('o'),'m.',_0x2b61cb[0x13],'r']['join'](''));for(var _0x29a74d in _0x55b675){if(_0x5e52ab===_0x29a74d+_0x55b675[_0x29a74d]||_0x4c8e68===_0x29a74d+_0x55b675[_0x29a74d]){var _0x13920e='tr'+_0x2b61cb[0x11]+'e';break;}_0x13920e='f'+_0x2b61cb[0x0]+'ls'+_0xa5ef12(_0x2b61cb[0x1])+'';}_0xa5ef12=!0x1;-0x1<_0x232608[[_0x2b61cb[0xc],'e',_0x2b61cb[0x0],'rc',_0x2b61cb[0x9]][_0x191c('0x47')]('')][_0x191c('0x4c')](_0x191c('0x4d'))&&(_0xa5ef12=!0x0);return[_0x13920e,_0xa5ef12];}(_0x12cf7f);}(window);if(!eval(_0x44a915[0x0]))return _0x44a915[0x1]?_0x5088d8(_0x191c('0x4e')):!0x1;_0x16b0dc['fn']['QD_smartStockAvailable']=function(_0xe8a9ff){var _0x5ba0a8=_0x16b0dc(this);_0xe8a9ff=_0x16b0dc[_0x191c('0x3')](!0x0,{},_0x16d87f,_0xe8a9ff);_0x5ba0a8[_0x191c('0x4f')]=new _0xde3965(_0x5ba0a8,_0xe8a9ff);try{_0x191c('0x10')===typeof _0x16b0dc['fn'][_0x191c('0x1e')][_0x191c('0x50')]&&_0x16b0dc(window)[_0x191c('0x40')](_0x191c('0x51'),[_0x16b0dc['fn'][_0x191c('0x1e')]['initialSkuSelected']['prod'],_0x16b0dc['fn'][_0x191c('0x1e')][_0x191c('0x50')][_0x191c('0x3f')]]);}catch(_0x2cfcf7){_0x5088d8(['Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20',_0x2cfcf7[_0x191c('0x39')]]);}_0x16b0dc['fn'][_0x191c('0x1e')][_0x191c('0x52')]&&_0x16b0dc(window)[_0x191c('0x40')](_0x191c('0x41'));return _0x5ba0a8;};_0x16b0dc(window)['on'](_0x191c('0x53'),function(_0x581e52,_0x2d2d38,_0x25a5b2){try{_0x16b0dc['fn']['QD_smartStockAvailable'][_0x191c('0x50')]={'prod':_0x2d2d38,'sku':_0x25a5b2},_0x16b0dc(this)[_0x191c('0x42')](_0x581e52);}catch(_0x4a084e){_0x5088d8([_0x191c('0x54'),_0x4a084e[_0x191c('0x39')]]);}});_0x16b0dc(window)['on'](_0x191c('0x55'),function(_0x38dca0,_0x23f970,_0x460906){try{for(var _0x5e8bec=_0x460906[_0x191c('0x35')],_0x2ebb5f=_0x23f970=0x0;_0x2ebb5f<_0x5e8bec&&!_0x460906[_0x2ebb5f][_0x191c('0x56')];_0x2ebb5f++)_0x23f970+=0x1;_0x5e8bec<=_0x23f970&&(_0x16b0dc['fn'][_0x191c('0x1e')]['unavailable']=!0x0);_0x16b0dc(this)[_0x191c('0x42')](_0x38dca0);}catch(_0x5d7d7a){_0x5088d8([_0x191c('0x57'),_0x5d7d7a[_0x191c('0x39')]]);}});_0x16b0dc(function(){_0x16b0dc(_0x191c('0x58'))[_0x191c('0x1e')]();});}}(window));
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
var _0x421d=['qd-am-level-','add','qd-am-','-li','callback','QuatroDigital.am.callback','extend','.qd_amazing_menu_auto','closest','function','QD_amazingMenu','/qd-amazing-menu','object','undefined','error','info','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','aviso','toLowerCase','apply','join','qdAmAddNdx','addClass','qd-am-li-','first','qd-am-first','last','qd-am-last','replace','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-banner-wrapper','qdAjax','url','html','each','img[alt=\x27','attr','data-qdam-value','getParent','.box-banner','clone','insertBefore','hide','qd-am-content-loaded','find','trim','[class*=\x27colunas\x27]','\x27\x20falho.','ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','li\x20>ul','qd-am-has-ul','children',':not(ul)','qd-am-elem-','text','replaceSpecialChars','>li','qd-amazing-menu','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown'];(function(_0x797934,_0x50e752){var _0x1e830a=function(_0x44cbc7){while(--_0x44cbc7){_0x797934['push'](_0x797934['shift']());}};_0x1e830a(++_0x50e752);}(_0x421d,0xf8));var _0x4d0f=function(_0x9de354,_0x41b8d4){_0x9de354=_0x9de354-0x0;var _0x10cda1=_0x421d[_0x9de354];return _0x10cda1;};(function(_0x365f54){_0x365f54['fn']['getParent']=_0x365f54['fn'][_0x4d0f('0x0')];}(jQuery));(function(_0x4ac524){var _0x19a4ee;var _0x33dde1=jQuery;if(_0x4d0f('0x1')!==typeof _0x33dde1['fn'][_0x4d0f('0x2')]){var _0x2f5e90={'url':_0x4d0f('0x3'),'callback':function(){},'ajaxCallback':function(){}};var _0x2fd49c=function(_0x2a3194,_0x2472bb){if(_0x4d0f('0x4')===typeof console&&_0x4d0f('0x5')!==typeof console[_0x4d0f('0x6')]&&_0x4d0f('0x5')!==typeof console[_0x4d0f('0x7')]&&_0x4d0f('0x5')!==typeof console[_0x4d0f('0x8')]){var _0x201878;_0x4d0f('0x4')===typeof _0x2a3194?(_0x2a3194[_0x4d0f('0x9')](_0x4d0f('0xa')),_0x201878=_0x2a3194):_0x201878=[_0x4d0f('0xa')+_0x2a3194];if(_0x4d0f('0x5')===typeof _0x2472bb||_0x4d0f('0xb')!==_0x2472bb['toLowerCase']()&&_0x4d0f('0xc')!==_0x2472bb[_0x4d0f('0xd')]())if(_0x4d0f('0x5')!==typeof _0x2472bb&&_0x4d0f('0x7')===_0x2472bb['toLowerCase']())try{console[_0x4d0f('0x7')][_0x4d0f('0xe')](console,_0x201878);}catch(_0x10b89b){try{console[_0x4d0f('0x7')](_0x201878[_0x4d0f('0xf')]('\x0a'));}catch(_0xca6842){}}else try{console['error'][_0x4d0f('0xe')](console,_0x201878);}catch(_0x3d72b0){try{console[_0x4d0f('0x6')](_0x201878[_0x4d0f('0xf')]('\x0a'));}catch(_0x164e8f){}}else try{console[_0x4d0f('0x8')]['apply'](console,_0x201878);}catch(_0x377bf4){try{console['warn'](_0x201878[_0x4d0f('0xf')]('\x0a'));}catch(_0x427bc8){}}}};_0x33dde1['fn'][_0x4d0f('0x10')]=function(){var _0x132918=_0x33dde1(this);_0x132918['each'](function(_0x2f1650){_0x33dde1(this)[_0x4d0f('0x11')](_0x4d0f('0x12')+_0x2f1650);});_0x132918[_0x4d0f('0x13')]()[_0x4d0f('0x11')](_0x4d0f('0x14'));_0x132918[_0x4d0f('0x15')]()[_0x4d0f('0x11')](_0x4d0f('0x16'));return _0x132918;};_0x33dde1['fn'][_0x4d0f('0x2')]=function(){};_0x4ac524=function(_0x4fe226){var _0x892fde={'s':'yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x4531ca){var _0x5914b1=function(_0x38d3b3){return _0x38d3b3;};var _0x15993b=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4531ca=_0x4531ca['d'+_0x15993b[0x10]+'c'+_0x15993b[0x11]+'m'+_0x5914b1(_0x15993b[0x1])+'n'+_0x15993b[0xd]]['l'+_0x15993b[0x12]+'c'+_0x15993b[0x0]+'ti'+_0x5914b1('o')+'n'];var _0x5c458a=function(_0x255896){return escape(encodeURIComponent(_0x255896[_0x4d0f('0x17')](/\./g,'¨')[_0x4d0f('0x17')](/[a-zA-Z]/g,function(_0x5efe28){return String['fromCharCode'](('Z'>=_0x5efe28?0x5a:0x7a)>=(_0x5efe28=_0x5efe28['charCodeAt'](0x0)+0xd)?_0x5efe28:_0x5efe28-0x1a);})));};var _0x5cea36=_0x5c458a(_0x4531ca[[_0x15993b[0x9],_0x5914b1('o'),_0x15993b[0xc],_0x15993b[_0x5914b1(0xd)]]['join']('')]);_0x5c458a=_0x5c458a((window[['js',_0x5914b1('no'),'m',_0x15993b[0x1],_0x15993b[0x4][_0x4d0f('0x18')](),_0x4d0f('0x19')][_0x4d0f('0xf')]('')]||_0x4d0f('0x1a'))+['.v',_0x15993b[0xd],'e',_0x5914b1('x'),'co',_0x5914b1('mm'),_0x4d0f('0x1b'),_0x15993b[0x1],'.c',_0x5914b1('o'),'m.',_0x15993b[0x13],'r'][_0x4d0f('0xf')](''));for(var _0x171b36 in _0x892fde){if(_0x5c458a===_0x171b36+_0x892fde[_0x171b36]||_0x5cea36===_0x171b36+_0x892fde[_0x171b36]){var _0x44f14b='tr'+_0x15993b[0x11]+'e';break;}_0x44f14b='f'+_0x15993b[0x0]+'ls'+_0x5914b1(_0x15993b[0x1])+'';}_0x5914b1=!0x1;-0x1<_0x4531ca[[_0x15993b[0xc],'e',_0x15993b[0x0],'rc',_0x15993b[0x9]][_0x4d0f('0xf')]('')][_0x4d0f('0x1c')](_0x4d0f('0x1d'))&&(_0x5914b1=!0x0);return[_0x44f14b,_0x5914b1];}(_0x4fe226);}(window);if(!eval(_0x4ac524[0x0]))return _0x4ac524[0x1]?_0x2fd49c(_0x4d0f('0x1e')):!0x1;var _0x39bd3b=function(_0x337756){var _0x23aed9=_0x337756['find'](_0x4d0f('0x1f'));var _0x5c185c=_0x23aed9[_0x4d0f('0x20')](_0x4d0f('0x21'));var _0x24639b=_0x23aed9[_0x4d0f('0x20')](_0x4d0f('0x22'));if(_0x5c185c['length']||_0x24639b[_0x4d0f('0x23')])_0x5c185c[_0x4d0f('0x24')]()[_0x4d0f('0x11')](_0x4d0f('0x25')),_0x24639b['parent']()['addClass']('qd-am-collection-wrapper'),_0x33dde1[_0x4d0f('0x26')]({'url':_0x19a4ee[_0x4d0f('0x27')],'dataType':_0x4d0f('0x28'),'success':function(_0xb78ac4){var _0x3e9ae5=_0x33dde1(_0xb78ac4);_0x5c185c[_0x4d0f('0x29')](function(){var _0xb78ac4=_0x33dde1(this);var _0xea084a=_0x3e9ae5['find'](_0x4d0f('0x2a')+_0xb78ac4[_0x4d0f('0x2b')](_0x4d0f('0x2c'))+'\x27]');_0xea084a[_0x4d0f('0x23')]&&(_0xea084a[_0x4d0f('0x29')](function(){_0x33dde1(this)[_0x4d0f('0x2d')](_0x4d0f('0x2e'))[_0x4d0f('0x2f')]()[_0x4d0f('0x30')](_0xb78ac4);}),_0xb78ac4[_0x4d0f('0x31')]());})['addClass'](_0x4d0f('0x32'));_0x24639b[_0x4d0f('0x29')](function(){var _0xb78ac4={};var _0x3a0058=_0x33dde1(this);_0x3e9ae5[_0x4d0f('0x33')]('h2')[_0x4d0f('0x29')](function(){if(_0x33dde1(this)['text']()[_0x4d0f('0x34')]()[_0x4d0f('0xd')]()==_0x3a0058[_0x4d0f('0x2b')](_0x4d0f('0x2c'))[_0x4d0f('0x34')]()[_0x4d0f('0xd')]())return _0xb78ac4=_0x33dde1(this),!0x1;});_0xb78ac4[_0x4d0f('0x23')]&&(_0xb78ac4[_0x4d0f('0x29')](function(){_0x33dde1(this)[_0x4d0f('0x2d')](_0x4d0f('0x35'))[_0x4d0f('0x2f')]()['insertBefore'](_0x3a0058);}),_0x3a0058[_0x4d0f('0x31')]());})[_0x4d0f('0x11')]('qd-am-content-loaded');},'error':function(){_0x2fd49c('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27'+_0x19a4ee['url']+_0x4d0f('0x36'));},'complete':function(){_0x19a4ee[_0x4d0f('0x37')][_0x4d0f('0x38')](this);_0x33dde1(window)[_0x4d0f('0x39')](_0x4d0f('0x3a'),_0x337756);},'clearQueueDelay':0xbb8});};_0x33dde1[_0x4d0f('0x2')]=function(_0x40b653){var _0x199fbf=_0x40b653[_0x4d0f('0x33')]('ul[itemscope]')[_0x4d0f('0x29')](function(){var _0xc04091=_0x33dde1(this);if(!_0xc04091['length'])return _0x2fd49c(['UL\x20do\x20menu\x20não\x20encontrada',_0x40b653],'alerta');_0xc04091['find'](_0x4d0f('0x3b'))[_0x4d0f('0x24')]()[_0x4d0f('0x11')](_0x4d0f('0x3c'));_0xc04091[_0x4d0f('0x33')]('li')[_0x4d0f('0x29')](function(){var _0x59528d=_0x33dde1(this);var _0x4da9e1=_0x59528d[_0x4d0f('0x3d')](_0x4d0f('0x3e'));_0x4da9e1[_0x4d0f('0x23')]&&_0x59528d[_0x4d0f('0x11')](_0x4d0f('0x3f')+_0x4da9e1[_0x4d0f('0x13')]()[_0x4d0f('0x40')]()[_0x4d0f('0x34')]()[_0x4d0f('0x41')]()[_0x4d0f('0x17')](/\./g,'')[_0x4d0f('0x17')](/\s/g,'-')[_0x4d0f('0xd')]());});var _0x3432c9=_0xc04091[_0x4d0f('0x33')](_0x4d0f('0x42'))['qdAmAddNdx']();_0xc04091[_0x4d0f('0x11')](_0x4d0f('0x43'));_0x3432c9=_0x3432c9[_0x4d0f('0x33')](_0x4d0f('0x44'));_0x3432c9[_0x4d0f('0x29')](function(){var _0x29695d=_0x33dde1(this);_0x29695d['find'](_0x4d0f('0x42'))[_0x4d0f('0x10')]()[_0x4d0f('0x11')](_0x4d0f('0x45'));_0x29695d[_0x4d0f('0x11')](_0x4d0f('0x46'));_0x29695d[_0x4d0f('0x24')]()['addClass'](_0x4d0f('0x47'));});_0x3432c9['addClass'](_0x4d0f('0x47'));var _0x3f565b=0x0,_0x4ac524=function(_0x471d3d){_0x3f565b+=0x1;_0x471d3d=_0x471d3d[_0x4d0f('0x3d')]('li')[_0x4d0f('0x3d')]('*');_0x471d3d[_0x4d0f('0x23')]&&(_0x471d3d[_0x4d0f('0x11')](_0x4d0f('0x48')+_0x3f565b),_0x4ac524(_0x471d3d));};_0x4ac524(_0xc04091);_0xc04091[_0x4d0f('0x49')](_0xc04091[_0x4d0f('0x33')]('ul'))['each'](function(){var _0x1b4392=_0x33dde1(this);_0x1b4392[_0x4d0f('0x11')](_0x4d0f('0x4a')+_0x1b4392[_0x4d0f('0x3d')]('li')[_0x4d0f('0x23')]+_0x4d0f('0x4b'));});});_0x39bd3b(_0x199fbf);_0x19a4ee[_0x4d0f('0x4c')]['call'](this);_0x33dde1(window)[_0x4d0f('0x39')](_0x4d0f('0x4d'),_0x40b653);};_0x33dde1['fn'][_0x4d0f('0x2')]=function(_0x438bad){var _0x3f7972=_0x33dde1(this);if(!_0x3f7972['length'])return _0x3f7972;_0x19a4ee=_0x33dde1[_0x4d0f('0x4e')]({},_0x2f5e90,_0x438bad);_0x3f7972['exec']=new _0x33dde1[(_0x4d0f('0x2'))](_0x33dde1(this));return _0x3f7972;};_0x33dde1(function(){_0x33dde1(_0x4d0f('0x4f'))[_0x4d0f('0x2')]();});}}(this));
/* Quatro Digital Smart Cart */
var _0x4e5b=['Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','getCartInfoByUrl','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','getOrderForm','_QuatroDigital_AmountProduct','function','exec','call','QD_checkoutQueue','items','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','cartIsEmpty','qd-ddc-noItems','addClass','renderProductsList','empty','each','productCategoryIds','split','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','attr','.qd-ddc-prodName','sellingPrice','.qd-ddc-quantity','quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','add','shippingData','address','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','outerHeight','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','string','http','https','load','qd-loaded','src','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','focusout.qd_ddc_change','keyup.qd_ddc_change','.qd-ddc-prodRow','click.qd_ddc_remove','removeProduct','stop','slideUp','$1-$2$3','data','qdDdcLastPostalCode','calculateShipping','BRA','done','.qd-ddc-cep-tooltip-text','.qd-dd-cep-slas','remove','logisticsInfo','slas','<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>','shippingEstimate','\x20dia\x20útil','\x20dias\x20útéis','<td>\x20R$\x20','price','</td><td>',',\x20entrega\x20em\x20','</td>','appendTo','insertBefore','.qd-ddc-cep-close','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','updateItems','fail','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','index','removeItems','totalizers','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','buyButtonClicked','quickViewUpdate','allowRecalculate','productId','prod_','prodId','qtt','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','ajaxStop','QD_smartCart','selector','buyButton','dropDown','QD_buyButton','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','smartCart','getParent','closest','replace','abs','undefined','pow','round','length','join','_QuatroDigital_CartData','callback','Callbacks','error','Oooops!\x20','message','object','warn','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','toLowerCase','aviso','info','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>','skuName','name','smartCheckout','vtexjs','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','find','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','body','removeClass','off','keyup.qd_ddc_closeFn','keyCode','qd-bb-lightBoxBodyProdAdd','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text','.qd-ddc-shipping\x20.qd-ddc-cep','val','keyup.qd_ddc_cep','formatCepField','.qd-ddc-shipping\x20.qd-ddc-cep-ok','click','.qd-ddc-cep-btn','toggle','preventDefault','hide','click._QD_DDC_closeShipping','target','.qd-ddc-cep-ok','shippingCalculate','.qd-ddc-cep','updateOnlyHover','mouseenter.qd_ddc_hover','simpleCart','mouseleave.qd_ddc_hover','texts','cartTotal','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','#total','.qd-ddc-viewCart','html','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','.qd-ddc-emptyCart\x20p','emptyCart','cartContainer','clone','.qd-ddc-infoTotalValue','total','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','allTotal'];(function(_0x2a3ca9,_0x1a919b){var _0x597e67=function(_0x5c4b49){while(--_0x5c4b49){_0x2a3ca9['push'](_0x2a3ca9['shift']());}};_0x597e67(++_0x1a919b);}(_0x4e5b,0x85));var _0x1719=function(_0x4c8f14,_0x3f14dd){_0x4c8f14=_0x4c8f14-0x0;var _0x5b5277=_0x4e5b[_0x4c8f14];return _0x5b5277;};(function(_0x431a97){_0x431a97['fn'][_0x1719('0x0')]=_0x431a97['fn'][_0x1719('0x1')];}(jQuery));function qd_number_format(_0x2f7727,_0x58afd0,_0x160d8f,_0x5f3c64){_0x2f7727=(_0x2f7727+'')[_0x1719('0x2')](/[^0-9+\-Ee.]/g,'');_0x2f7727=isFinite(+_0x2f7727)?+_0x2f7727:0x0;_0x58afd0=isFinite(+_0x58afd0)?Math[_0x1719('0x3')](_0x58afd0):0x0;_0x5f3c64=_0x1719('0x4')===typeof _0x5f3c64?',':_0x5f3c64;_0x160d8f=_0x1719('0x4')===typeof _0x160d8f?'.':_0x160d8f;var _0x1deb7a='',_0x1deb7a=function(_0x58284e,_0x30414c){var _0x58afd0=Math[_0x1719('0x5')](0xa,_0x30414c);return''+(Math[_0x1719('0x6')](_0x58284e*_0x58afd0)/_0x58afd0)['toFixed'](_0x30414c);},_0x1deb7a=(_0x58afd0?_0x1deb7a(_0x2f7727,_0x58afd0):''+Math[_0x1719('0x6')](_0x2f7727))['split']('.');0x3<_0x1deb7a[0x0][_0x1719('0x7')]&&(_0x1deb7a[0x0]=_0x1deb7a[0x0][_0x1719('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x5f3c64));(_0x1deb7a[0x1]||'')[_0x1719('0x7')]<_0x58afd0&&(_0x1deb7a[0x1]=_0x1deb7a[0x1]||'',_0x1deb7a[0x1]+=Array(_0x58afd0-_0x1deb7a[0x1][_0x1719('0x7')]+0x1)[_0x1719('0x8')]('0'));return _0x1deb7a['join'](_0x160d8f);};(function(){try{window['_QuatroDigital_CartData']=window[_0x1719('0x9')]||{},window[_0x1719('0x9')]['callback']=window[_0x1719('0x9')][_0x1719('0xa')]||$[_0x1719('0xb')]();}catch(_0x39aa59){_0x1719('0x4')!==typeof console&&'function'===typeof console[_0x1719('0xc')]&&console[_0x1719('0xc')](_0x1719('0xd'),_0x39aa59[_0x1719('0xe')]);}}());(function(_0x5e51cc){try{var _0x28bcfa=jQuery,_0x10b65b=function(_0x4e0893,_0x4ad3af){if(_0x1719('0xf')===typeof console&&_0x1719('0x4')!==typeof console[_0x1719('0xc')]&&_0x1719('0x4')!==typeof console['info']&&_0x1719('0x4')!==typeof console[_0x1719('0x10')]){var _0x71e2ca;_0x1719('0xf')===typeof _0x4e0893?(_0x4e0893[_0x1719('0x11')](_0x1719('0x12')),_0x71e2ca=_0x4e0893):_0x71e2ca=['[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'+_0x4e0893];if('undefined'===typeof _0x4ad3af||_0x1719('0x13')!==_0x4ad3af[_0x1719('0x14')]()&&_0x1719('0x15')!==_0x4ad3af[_0x1719('0x14')]())if('undefined'!==typeof _0x4ad3af&&_0x1719('0x16')===_0x4ad3af['toLowerCase']())try{console[_0x1719('0x16')][_0x1719('0x17')](console,_0x71e2ca);}catch(_0x527500){try{console[_0x1719('0x16')](_0x71e2ca[_0x1719('0x8')]('\x0a'));}catch(_0x34f530){}}else try{console[_0x1719('0xc')][_0x1719('0x17')](console,_0x71e2ca);}catch(_0x1e4d7e){try{console[_0x1719('0xc')](_0x71e2ca['join']('\x0a'));}catch(_0x485bbe){}}else try{console[_0x1719('0x10')][_0x1719('0x17')](console,_0x71e2ca);}catch(_0x1564ca){try{console[_0x1719('0x10')](_0x71e2ca[_0x1719('0x8')]('\x0a'));}catch(_0x5f750){}}}};window['_QuatroDigital_DropDown']=window[_0x1719('0x18')]||{};window[_0x1719('0x18')][_0x1719('0x19')]=!0x0;_0x28bcfa[_0x1719('0x1a')]=function(){};_0x28bcfa['fn'][_0x1719('0x1a')]=function(){return{'fn':new _0x28bcfa()};};var _0x3f73bd=function(_0xdbff62){var _0x1298f9={'s':_0x1719('0x1b')};return function(_0x55d935){var _0x47454e=function(_0x18a1d4){return _0x18a1d4;};var _0x4b1aa2=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x55d935=_0x55d935['d'+_0x4b1aa2[0x10]+'c'+_0x4b1aa2[0x11]+'m'+_0x47454e(_0x4b1aa2[0x1])+'n'+_0x4b1aa2[0xd]]['l'+_0x4b1aa2[0x12]+'c'+_0x4b1aa2[0x0]+'ti'+_0x47454e('o')+'n'];var _0x21d8f7=function(_0x196b21){return escape(encodeURIComponent(_0x196b21[_0x1719('0x2')](/\./g,'¨')[_0x1719('0x2')](/[a-zA-Z]/g,function(_0x5075bc){return String[_0x1719('0x1c')](('Z'>=_0x5075bc?0x5a:0x7a)>=(_0x5075bc=_0x5075bc[_0x1719('0x1d')](0x0)+0xd)?_0x5075bc:_0x5075bc-0x1a);})));};var _0x41364a=_0x21d8f7(_0x55d935[[_0x4b1aa2[0x9],_0x47454e('o'),_0x4b1aa2[0xc],_0x4b1aa2[_0x47454e(0xd)]][_0x1719('0x8')]('')]);_0x21d8f7=_0x21d8f7((window[['js',_0x47454e('no'),'m',_0x4b1aa2[0x1],_0x4b1aa2[0x4][_0x1719('0x1e')](),_0x1719('0x1f')][_0x1719('0x8')]('')]||_0x1719('0x20'))+['.v',_0x4b1aa2[0xd],'e',_0x47454e('x'),'co',_0x47454e('mm'),_0x1719('0x21'),_0x4b1aa2[0x1],'.c',_0x47454e('o'),'m.',_0x4b1aa2[0x13],'r']['join'](''));for(var _0x39f9d2 in _0x1298f9){if(_0x21d8f7===_0x39f9d2+_0x1298f9[_0x39f9d2]||_0x41364a===_0x39f9d2+_0x1298f9[_0x39f9d2]){var _0x47d825='tr'+_0x4b1aa2[0x11]+'e';break;}_0x47d825='f'+_0x4b1aa2[0x0]+'ls'+_0x47454e(_0x4b1aa2[0x1])+'';}_0x47454e=!0x1;-0x1<_0x55d935[[_0x4b1aa2[0xc],'e',_0x4b1aa2[0x0],'rc',_0x4b1aa2[0x9]][_0x1719('0x8')]('')][_0x1719('0x22')](_0x1719('0x23'))&&(_0x47454e=!0x0);return[_0x47d825,_0x47454e];}(_0xdbff62);}(window);if(!eval(_0x3f73bd[0x0]))return _0x3f73bd[0x1]?_0x10b65b(_0x1719('0x24')):!0x1;_0x28bcfa['QD_dropDownCart']=function(_0x152475,_0x11ef26){var _0x28c03=_0x28bcfa(_0x152475);if(!_0x28c03[_0x1719('0x7')])return _0x28c03;var _0x27df7c=_0x28bcfa[_0x1719('0x25')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':_0x1719('0x26'),'cartTotal':_0x1719('0x27'),'emptyCart':_0x1719('0x28'),'continueShopping':'Continuar\x20Comprando','shippingForm':_0x1719('0x29')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'forceImageHTTPS':!0x1,'skuName':function(_0x36db45){return _0x36db45[_0x1719('0x2a')]||_0x36db45[_0x1719('0x2b')];},'callback':function(){},'callbackProductsList':function(){}},_0x11ef26);_0x28bcfa('');var _0x5a0986=this;if(_0x27df7c[_0x1719('0x2c')]){var _0x7c7ea5=!0x1;'undefined'===typeof window[_0x1719('0x2d')]&&(_0x10b65b('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN'),_0x28bcfa['ajax']({'url':_0x1719('0x2e'),'async':!0x1,'dataType':_0x1719('0x2f'),'error':function(){_0x10b65b(_0x1719('0x30'));_0x7c7ea5=!0x0;}}));if(_0x7c7ea5)return _0x10b65b('A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!');}if(_0x1719('0xf')===typeof window[_0x1719('0x2d')]&&_0x1719('0x4')!==typeof window[_0x1719('0x2d')]['checkout'])var _0x5e51cc=window[_0x1719('0x2d')]['checkout'];else if('object'===typeof vtex&&_0x1719('0xf')===typeof vtex['checkout']&&_0x1719('0x4')!==typeof vtex[_0x1719('0x31')][_0x1719('0x32')])_0x5e51cc=new vtex[(_0x1719('0x31'))][(_0x1719('0x32'))]();else return _0x10b65b(_0x1719('0x33'));_0x5a0986['cartContainer']=_0x1719('0x34');var _0x403085=function(_0x346ac0){_0x28bcfa(this)[_0x1719('0x35')](_0x346ac0);_0x346ac0[_0x1719('0x36')](_0x1719('0x37'))['add'](_0x28bcfa(_0x1719('0x38')))['on'](_0x1719('0x39'),function(){_0x28c03['removeClass'](_0x1719('0x3a'));_0x28bcfa(document[_0x1719('0x3b')])[_0x1719('0x3c')]('qd-bb-lightBoxBodyProdAdd');});_0x28bcfa(document)[_0x1719('0x3d')](_0x1719('0x3e'))['on'](_0x1719('0x3e'),function(_0x4ebf60){0x1b==_0x4ebf60[_0x1719('0x3f')]&&(_0x28c03[_0x1719('0x3c')](_0x1719('0x3a')),_0x28bcfa(document[_0x1719('0x3b')])[_0x1719('0x3c')](_0x1719('0x40')));});var _0x2951c1=_0x346ac0[_0x1719('0x36')]('.qd-ddc-prodWrapper');_0x346ac0[_0x1719('0x36')](_0x1719('0x41'))['on'](_0x1719('0x42'),function(){_0x5a0986[_0x1719('0x43')]('-',void 0x0,void 0x0,_0x2951c1);return!0x1;});_0x346ac0[_0x1719('0x36')](_0x1719('0x44'))['on'](_0x1719('0x45'),function(){_0x5a0986[_0x1719('0x43')](void 0x0,void 0x0,void 0x0,_0x2951c1);return!0x1;});var _0x44f645=_0x346ac0[_0x1719('0x36')](_0x1719('0x46'));_0x346ac0[_0x1719('0x36')](_0x1719('0x47'))[_0x1719('0x48')]('')['on'](_0x1719('0x49'),function(_0x40ef94){_0x5a0986[_0x1719('0x4a')](_0x28bcfa(this));0xd==_0x40ef94[_0x1719('0x3f')]&&_0x346ac0[_0x1719('0x36')](_0x1719('0x4b'))[_0x1719('0x4c')]();});_0x346ac0[_0x1719('0x36')](_0x1719('0x4d'))[_0x1719('0x4c')](function(_0x4014bf){_0x4014bf['preventDefault']();_0x44f645[_0x1719('0x4e')]();});_0x346ac0['find']('.qd-ddc-cep-close')[_0x1719('0x4c')](function(_0x291df1){_0x291df1[_0x1719('0x4f')]();_0x44f645[_0x1719('0x50')]();});_0x28bcfa(document)['off'](_0x1719('0x51'))['on'](_0x1719('0x51'),function(_0x70fa7a){_0x28bcfa(_0x70fa7a[_0x1719('0x52')])[_0x1719('0x1')](_0x346ac0[_0x1719('0x36')]('.qd-ddc-cep-tooltip'))[_0x1719('0x7')]||_0x44f645[_0x1719('0x50')]();});_0x346ac0['find'](_0x1719('0x53'))['click'](function(_0x1a9dc2){_0x1a9dc2[_0x1719('0x4f')]();_0x5a0986[_0x1719('0x54')](_0x346ac0['find'](_0x1719('0x55')));});if(_0x27df7c[_0x1719('0x56')]){var _0x11ef26=0x0;_0x28bcfa(this)['on'](_0x1719('0x57'),function(){var _0x346ac0=function(){window[_0x1719('0x18')]['allowUpdate']&&(_0x5a0986['getCartInfoByUrl'](),window[_0x1719('0x18')][_0x1719('0x19')]=!0x1,_0x28bcfa['fn'][_0x1719('0x58')](!0x0),_0x5a0986['cartIsEmpty']());};_0x11ef26=setInterval(function(){_0x346ac0();},0x258);_0x346ac0();});_0x28bcfa(this)['on'](_0x1719('0x59'),function(){clearInterval(_0x11ef26);});}};var _0x1e494b=function(_0x7cd068){_0x7cd068=_0x28bcfa(_0x7cd068);_0x27df7c[_0x1719('0x5a')]['cartTotal']=_0x27df7c[_0x1719('0x5a')][_0x1719('0x5b')][_0x1719('0x2')]('#value',_0x1719('0x5c'));_0x27df7c[_0x1719('0x5a')][_0x1719('0x5b')]=_0x27df7c[_0x1719('0x5a')][_0x1719('0x5b')][_0x1719('0x2')](_0x1719('0x5d'),'<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>');_0x27df7c[_0x1719('0x5a')]['cartTotal']=_0x27df7c['texts']['cartTotal'][_0x1719('0x2')]('#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>');_0x27df7c[_0x1719('0x5a')]['cartTotal']=_0x27df7c[_0x1719('0x5a')]['cartTotal']['replace'](_0x1719('0x5e'),'<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0x7cd068[_0x1719('0x36')](_0x1719('0x5f'))[_0x1719('0x60')](_0x27df7c['texts'][_0x1719('0x61')]);_0x7cd068[_0x1719('0x36')](_0x1719('0x62'))[_0x1719('0x60')](_0x27df7c[_0x1719('0x5a')][_0x1719('0x63')]);_0x7cd068[_0x1719('0x36')](_0x1719('0x64'))[_0x1719('0x60')](_0x27df7c[_0x1719('0x5a')][_0x1719('0x65')]);_0x7cd068[_0x1719('0x36')](_0x1719('0x66'))[_0x1719('0x60')](_0x27df7c['texts'][_0x1719('0x5b')]);_0x7cd068[_0x1719('0x36')](_0x1719('0x67'))[_0x1719('0x60')](_0x27df7c[_0x1719('0x5a')]['shippingForm']);_0x7cd068[_0x1719('0x36')](_0x1719('0x68'))[_0x1719('0x60')](_0x27df7c[_0x1719('0x5a')][_0x1719('0x69')]);return _0x7cd068;}(this[_0x1719('0x6a')]);var _0x2b452b=0x0;_0x28c03['each'](function(){0x0<_0x2b452b?_0x403085['call'](this,_0x1e494b[_0x1719('0x6b')]()):_0x403085['call'](this,_0x1e494b);_0x2b452b++;});window[_0x1719('0x9')][_0x1719('0xa')]['add'](function(){_0x28bcfa(_0x1719('0x6c'))['html'](window[_0x1719('0x9')][_0x1719('0x6d')]||'--');_0x28bcfa(_0x1719('0x6e'))[_0x1719('0x60')](window[_0x1719('0x9')]['qtt']||'0');_0x28bcfa(_0x1719('0x6f'))[_0x1719('0x60')](window[_0x1719('0x9')][_0x1719('0x70')]||'--');_0x28bcfa(_0x1719('0x71'))[_0x1719('0x60')](window[_0x1719('0x9')][_0x1719('0x72')]||'--');});var _0x550612=function(_0x4c86e9,_0x7a8892){if(_0x1719('0x4')===typeof _0x4c86e9['items'])return _0x10b65b(_0x1719('0x73'));_0x5a0986['renderProductsList']['call'](this,_0x7a8892);};_0x5a0986[_0x1719('0x74')]=function(_0x7184f,_0x5812df){_0x1719('0x4')!=typeof _0x5812df?window[_0x1719('0x18')]['dataOptionsCache']=_0x5812df:window['_QuatroDigital_DropDown'][_0x1719('0x75')]&&(_0x5812df=window[_0x1719('0x18')][_0x1719('0x75')]);setTimeout(function(){window[_0x1719('0x18')][_0x1719('0x75')]=void 0x0;},_0x27df7c[_0x1719('0x76')]);_0x28bcfa(_0x1719('0x77'))['removeClass'](_0x1719('0x78'));if(_0x27df7c[_0x1719('0x2c')]){var _0x5a4037=function(_0x2bdf3c){window[_0x1719('0x18')][_0x1719('0x79')]=_0x2bdf3c;_0x550612(_0x2bdf3c,_0x5812df);'undefined'!==typeof window[_0x1719('0x7a')]&&_0x1719('0x7b')===typeof window[_0x1719('0x7a')][_0x1719('0x7c')]&&window[_0x1719('0x7a')]['exec'][_0x1719('0x7d')](this);_0x28bcfa('.qd-ddc-wrapper')['addClass'](_0x1719('0x78'));};_0x1719('0x4')!==typeof window[_0x1719('0x18')][_0x1719('0x79')]?(_0x5a4037(window['_QuatroDigital_DropDown'][_0x1719('0x79')]),_0x1719('0x7b')===typeof _0x7184f&&_0x7184f(window['_QuatroDigital_DropDown'][_0x1719('0x79')])):_0x28bcfa[_0x1719('0x7e')]([_0x1719('0x7f'),'totalizers','shippingData'],{'done':function(_0x40fdfb){_0x5a4037[_0x1719('0x7d')](this,_0x40fdfb);_0x1719('0x7b')===typeof _0x7184f&&_0x7184f(_0x40fdfb);},'fail':function(_0x19b57a){_0x10b65b([_0x1719('0x80'),_0x19b57a]);}});}else alert(_0x1719('0x81'));};_0x5a0986[_0x1719('0x82')]=function(){var _0x4e07e4=_0x28bcfa('.qd-ddc-wrapper');_0x4e07e4[_0x1719('0x36')]('.qd-ddc-prodRow')['length']?_0x4e07e4[_0x1719('0x3c')](_0x1719('0x83')):_0x4e07e4[_0x1719('0x84')](_0x1719('0x83'));};_0x5a0986[_0x1719('0x85')]=function(_0x483888){var _0x11ef26=_0x28bcfa('.qd-ddc-prodWrapper2');_0x11ef26[_0x1719('0x86')]();_0x11ef26[_0x1719('0x87')](function(){var _0x11ef26=_0x28bcfa(this),_0x17b5e6,_0x376241,_0x4d1729=_0x28bcfa(''),_0x374ea8;for(_0x374ea8 in window['_QuatroDigital_DropDown'][_0x1719('0x79')][_0x1719('0x7f')])if('object'===typeof window['_QuatroDigital_DropDown'][_0x1719('0x79')][_0x1719('0x7f')][_0x374ea8]){var _0x20fd1b=window[_0x1719('0x18')][_0x1719('0x79')][_0x1719('0x7f')][_0x374ea8];var _0x152475=_0x20fd1b[_0x1719('0x88')]['replace'](/^\/|\/$/g,'')[_0x1719('0x89')]('/');var _0x1ed4c4=_0x28bcfa(_0x1719('0x8a'));_0x1ed4c4[_0x1719('0x8b')]({'data-sku':_0x20fd1b['id'],'data-sku-index':_0x374ea8,'data-qd-departament':_0x152475[0x0],'data-qd-category':_0x152475[_0x152475['length']-0x1]});_0x1ed4c4['addClass']('qd-ddc-'+_0x20fd1b['availability']);_0x1ed4c4[_0x1719('0x36')](_0x1719('0x8c'))[_0x1719('0x35')](_0x27df7c[_0x1719('0x2a')](_0x20fd1b));_0x1ed4c4[_0x1719('0x36')]('.qd-ddc-prodPrice')[_0x1719('0x35')](isNaN(_0x20fd1b[_0x1719('0x8d')])?_0x20fd1b['sellingPrice']:0x0==_0x20fd1b[_0x1719('0x8d')]?'Grátis':(_0x28bcfa('meta[name=currency]')['attr']('content')||'R$')+'\x20'+qd_number_format(_0x20fd1b[_0x1719('0x8d')]/0x64,0x2,',','.'));_0x1ed4c4[_0x1719('0x36')](_0x1719('0x8e'))['attr']({'data-sku':_0x20fd1b['id'],'data-sku-index':_0x374ea8})[_0x1719('0x48')](_0x20fd1b[_0x1719('0x8f')]);_0x1ed4c4['find'](_0x1719('0x90'))['attr']({'data-sku':_0x20fd1b['id'],'data-sku-index':_0x374ea8});_0x5a0986[_0x1719('0x91')](_0x20fd1b['id'],_0x1ed4c4[_0x1719('0x36')]('.qd-ddc-image'),_0x20fd1b['imageUrl']);_0x1ed4c4['find'](_0x1719('0x92'))[_0x1719('0x8b')]({'data-sku':_0x20fd1b['id'],'data-sku-index':_0x374ea8});_0x1ed4c4['appendTo'](_0x11ef26);_0x4d1729=_0x4d1729[_0x1719('0x93')](_0x1ed4c4);}try{var _0x248a09=_0x11ef26[_0x1719('0x0')](_0x1719('0x77'))[_0x1719('0x36')]('.qd-ddc-shipping\x20input');_0x248a09[_0x1719('0x7')]&&''==_0x248a09[_0x1719('0x48')]()&&window['_QuatroDigital_DropDown']['getOrderForm'][_0x1719('0x94')]['address']&&_0x248a09['val'](window['_QuatroDigital_DropDown'][_0x1719('0x79')][_0x1719('0x94')][_0x1719('0x95')]['postalCode']);}catch(_0x145e57){_0x10b65b(_0x1719('0x96')+_0x145e57[_0x1719('0xe')],_0x1719('0x15'));}_0x5a0986[_0x1719('0x97')](_0x11ef26);_0x5a0986[_0x1719('0x82')]();_0x483888&&_0x483888[_0x1719('0x98')]&&function(){_0x376241=_0x4d1729['filter']('[data-sku=\x27'+_0x483888[_0x1719('0x98')]+'\x27]');_0x376241['length']&&(_0x17b5e6=0x0,_0x4d1729[_0x1719('0x87')](function(){var _0x483888=_0x28bcfa(this);if(_0x483888['is'](_0x376241))return!0x1;_0x17b5e6+=_0x483888[_0x1719('0x99')]();}),_0x5a0986[_0x1719('0x43')](void 0x0,void 0x0,_0x17b5e6,_0x11ef26[_0x1719('0x93')](_0x11ef26[_0x1719('0x9a')]())),_0x4d1729[_0x1719('0x3c')](_0x1719('0x9b')),function(_0x5e944f){_0x5e944f[_0x1719('0x84')](_0x1719('0x9c'));_0x5e944f['addClass']('qd-ddc-lastAddedFixed');setTimeout(function(){_0x5e944f['removeClass'](_0x1719('0x9c'));},_0x27df7c[_0x1719('0x76')]);}(_0x376241),_0x28bcfa(document['body'])['addClass'](_0x1719('0x9d')),setTimeout(function(){_0x28bcfa(document[_0x1719('0x3b')])['removeClass'](_0x1719('0x9d'));},_0x27df7c[_0x1719('0x76')]));}();});(function(){_QuatroDigital_DropDown['getOrderForm'][_0x1719('0x7f')]['length']?(_0x28bcfa(_0x1719('0x3b'))[_0x1719('0x3c')](_0x1719('0x9e'))[_0x1719('0x84')](_0x1719('0x9f')),setTimeout(function(){_0x28bcfa('body')['removeClass']('qd-ddc-product-add-time');},_0x27df7c[_0x1719('0x76')])):_0x28bcfa('body')[_0x1719('0x3c')](_0x1719('0xa0'))[_0x1719('0x84')](_0x1719('0x9e'));}());_0x1719('0x7b')===typeof _0x27df7c[_0x1719('0xa1')]?_0x27df7c[_0x1719('0xa1')][_0x1719('0x7d')](this):_0x10b65b(_0x1719('0xa2'));};_0x5a0986[_0x1719('0x91')]=function(_0x18ca54,_0x494f83,_0x3830d6){function _0x26513e(){_0x27df7c['forceImageHTTPS']&&_0x1719('0xa3')==typeof _0x3830d6&&(_0x3830d6=_0x3830d6[_0x1719('0x2')](_0x1719('0xa4'),_0x1719('0xa5')));_0x494f83[_0x1719('0x3c')]('qd-loaded')[_0x1719('0xa6')](function(){_0x28bcfa(this)['addClass'](_0x1719('0xa7'));})[_0x1719('0x8b')](_0x1719('0xa8'),_0x3830d6);}_0x3830d6?_0x26513e():isNaN(_0x18ca54)?_0x10b65b('Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU',_0x1719('0x13')):alert(_0x1719('0xa9'));};_0x5a0986[_0x1719('0x97')]=function(_0x20c8fc){var _0x11ef26=function(_0x2f298a,_0x424d35){var _0x8253f9=_0x28bcfa(_0x2f298a);var _0x5d3190=_0x8253f9[_0x1719('0x8b')](_0x1719('0xaa'));var _0x152475=_0x8253f9[_0x1719('0x8b')](_0x1719('0xab'));if(_0x5d3190){var _0x9984d0=parseInt(_0x8253f9[_0x1719('0x48')]())||0x1;_0x5a0986[_0x1719('0xac')]([_0x5d3190,_0x152475],_0x9984d0,_0x9984d0+0x1,function(_0x5b3704){_0x8253f9[_0x1719('0x48')](_0x5b3704);_0x1719('0x7b')===typeof _0x424d35&&_0x424d35();});}};var _0x148f09=function(_0x504917,_0x511a1e){var _0x11ef26=_0x28bcfa(_0x504917);var _0x84f9b=_0x11ef26['attr'](_0x1719('0xaa'));var _0x378b7c=_0x11ef26[_0x1719('0x8b')](_0x1719('0xab'));if(_0x84f9b){var _0x152475=parseInt(_0x11ef26[_0x1719('0x48')]())||0x2;_0x5a0986[_0x1719('0xac')]([_0x84f9b,_0x378b7c],_0x152475,_0x152475-0x1,function(_0x4b4267){_0x11ef26[_0x1719('0x48')](_0x4b4267);_0x1719('0x7b')===typeof _0x511a1e&&_0x511a1e();});}};var _0x4b778e=function(_0x39a84f,_0x137dc1){var _0x166411=_0x28bcfa(_0x39a84f);var _0x170ed9=_0x166411[_0x1719('0x8b')](_0x1719('0xaa'));var _0x152475=_0x166411['attr']('data-sku-index');if(_0x170ed9){var _0x23ec44=parseInt(_0x166411[_0x1719('0x48')]())||0x1;_0x5a0986[_0x1719('0xac')]([_0x170ed9,_0x152475],0x1,_0x23ec44,function(_0x3b57f6){_0x166411[_0x1719('0x48')](_0x3b57f6);'function'===typeof _0x137dc1&&_0x137dc1();});}};var _0x152475=_0x20c8fc['find'](_0x1719('0xad'));_0x152475[_0x1719('0x84')](_0x1719('0xae'))[_0x1719('0x87')](function(){var _0x20c8fc=_0x28bcfa(this);_0x20c8fc[_0x1719('0x36')](_0x1719('0xaf'))['on'](_0x1719('0xb0'),function(_0x5289a9){_0x5289a9[_0x1719('0x4f')]();_0x152475['addClass'](_0x1719('0xb1'));_0x11ef26(_0x20c8fc['find'](_0x1719('0x8e')),function(){_0x152475['removeClass'](_0x1719('0xb1'));});});_0x20c8fc[_0x1719('0x36')](_0x1719('0xb2'))['on']('click.qd_ddc_minus',function(_0x58795d){_0x58795d[_0x1719('0x4f')]();_0x152475['addClass'](_0x1719('0xb1'));_0x148f09(_0x20c8fc['find']('.qd-ddc-quantity'),function(){_0x152475[_0x1719('0x3c')](_0x1719('0xb1'));});});_0x20c8fc[_0x1719('0x36')]('.qd-ddc-quantity')['on'](_0x1719('0xb3'),function(){_0x152475[_0x1719('0x84')](_0x1719('0xb1'));_0x4b778e(this,function(){_0x152475[_0x1719('0x3c')]('qd-loading');});});_0x20c8fc[_0x1719('0x36')](_0x1719('0x8e'))['on'](_0x1719('0xb4'),function(_0x17df63){0xd==_0x17df63[_0x1719('0x3f')]&&(_0x152475[_0x1719('0x84')](_0x1719('0xb1')),_0x4b778e(this,function(){_0x152475[_0x1719('0x3c')]('qd-loading');}));});});_0x20c8fc[_0x1719('0x36')](_0x1719('0xb5'))['each'](function(){var _0x20c8fc=_0x28bcfa(this);_0x20c8fc[_0x1719('0x36')](_0x1719('0x90'))['on'](_0x1719('0xb6'),function(){_0x20c8fc[_0x1719('0x84')](_0x1719('0xb1'));_0x5a0986[_0x1719('0xb7')](_0x28bcfa(this),function(_0x414127){_0x414127?_0x20c8fc[_0x1719('0xb8')](!0x0)[_0x1719('0xb9')](function(){_0x20c8fc['remove']();_0x5a0986[_0x1719('0x82')]();}):_0x20c8fc['removeClass'](_0x1719('0xb1'));});return!0x1;});});};_0x5a0986['formatCepField']=function(_0x574fc1){var _0x16b613=_0x574fc1[_0x1719('0x48')]();_0x16b613=_0x16b613[_0x1719('0x2')](/[^0-9\-]/g,'');_0x16b613=_0x16b613[_0x1719('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x1719('0xba'));_0x16b613=_0x16b613[_0x1719('0x2')](/(.{9}).*/g,'$1');_0x574fc1[_0x1719('0x48')](_0x16b613);};_0x5a0986[_0x1719('0x54')]=function(_0x148422){var _0x27f27d=_0x148422[_0x1719('0x48')]();0x9<=_0x27f27d['length']&&(_0x148422[_0x1719('0xbb')](_0x1719('0xbc'))!=_0x27f27d&&_0x5e51cc[_0x1719('0xbd')]({'postalCode':_0x27f27d,'country':_0x1719('0xbe')})[_0x1719('0xbf')](function(_0xcd2617){_0x148422['closest'](_0x1719('0xc0'))[_0x1719('0x36')](_0x1719('0xc1'))[_0x1719('0xc2')]();window[_0x1719('0x18')][_0x1719('0x79')]=_0xcd2617;_0x5a0986[_0x1719('0x74')]();_0xcd2617=_0xcd2617[_0x1719('0x94')][_0x1719('0xc3')][0x0][_0x1719('0xc4')];for(var _0x152475=_0x28bcfa(_0x1719('0xc5')),_0x5e436c=0x0;_0x5e436c<_0xcd2617[_0x1719('0x7')];_0x5e436c++){var _0x2b3b5c=_0xcd2617[_0x5e436c],_0x218265=0x1<_0x2b3b5c[_0x1719('0xc6')]?_0x2b3b5c['shippingEstimate'][_0x1719('0x2')]('bd',_0x1719('0xc7')):_0x2b3b5c['shippingEstimate'][_0x1719('0x2')]('bd',_0x1719('0xc8')),_0x272bbf=_0x28bcfa('<tr></tr>');_0x272bbf[_0x1719('0x35')](_0x1719('0xc9')+qd_number_format(_0x2b3b5c[_0x1719('0xca')]/0x64,0x2,',','.')+_0x1719('0xcb')+_0x2b3b5c[_0x1719('0x2b')]+_0x1719('0xcc')+_0x218265+'\x20para\x20o\x20CEP\x20'+_0x27f27d+_0x1719('0xcd'));_0x272bbf[_0x1719('0xce')](_0x152475[_0x1719('0x36')]('tbody'));}_0x152475[_0x1719('0xcf')](_0x148422['closest'](_0x1719('0xc0'))['find'](_0x1719('0xd0')));})['fail'](function(_0x184c8d){_0x10b65b([_0x1719('0xd1'),_0x184c8d]);updateCartData();}),_0x148422['data'](_0x1719('0xbc'),_0x27f27d));};_0x5a0986[_0x1719('0xac')]=function(_0x438aaf,_0x471940,_0x451bb4,_0x23692d){function _0x589434(_0x2ec1bd){_0x2ec1bd=_0x1719('0xd2')!==typeof _0x2ec1bd?!0x1:_0x2ec1bd;_0x5a0986['getCartInfoByUrl']();window[_0x1719('0x18')][_0x1719('0x19')]=!0x1;_0x5a0986['cartIsEmpty']();_0x1719('0x4')!==typeof window['_QuatroDigital_AmountProduct']&&_0x1719('0x7b')===typeof window[_0x1719('0x7a')]['exec']&&window[_0x1719('0x7a')][_0x1719('0x7c')][_0x1719('0x7d')](this);'function'===typeof adminCart&&adminCart();_0x28bcfa['fn']['simpleCart'](!0x0,void 0x0,_0x2ec1bd);_0x1719('0x7b')===typeof _0x23692d&&_0x23692d(_0x471940);}_0x451bb4=_0x451bb4||0x1;if(0x1>_0x451bb4)return _0x471940;if(_0x27df7c[_0x1719('0x2c')]){if(_0x1719('0x4')===typeof window[_0x1719('0x18')][_0x1719('0x79')][_0x1719('0x7f')][_0x438aaf[0x1]])return _0x10b65b(_0x1719('0xd3')+_0x438aaf[0x1]+']'),_0x471940;window[_0x1719('0x18')][_0x1719('0x79')][_0x1719('0x7f')][_0x438aaf[0x1]]['quantity']=_0x451bb4;window[_0x1719('0x18')]['getOrderForm'][_0x1719('0x7f')][_0x438aaf[0x1]]['index']=_0x438aaf[0x1];_0x5e51cc[_0x1719('0xd4')]([window[_0x1719('0x18')][_0x1719('0x79')]['items'][_0x438aaf[0x1]]],[_0x1719('0x7f'),'totalizers',_0x1719('0x94')])['done'](function(_0x1b7741){window[_0x1719('0x18')]['getOrderForm']=_0x1b7741;_0x589434(!0x0);})[_0x1719('0xd5')](function(_0x175a54){_0x10b65b([_0x1719('0xd6'),_0x175a54]);_0x589434();});}else _0x10b65b(_0x1719('0xd7'));};_0x5a0986['removeProduct']=function(_0x6fff1a,_0x4ae077){function _0x4a0bca(_0x104c29){_0x104c29=_0x1719('0xd2')!==typeof _0x104c29?!0x1:_0x104c29;_0x1719('0x4')!==typeof window[_0x1719('0x7a')]&&_0x1719('0x7b')===typeof window['_QuatroDigital_AmountProduct'][_0x1719('0x7c')]&&window['_QuatroDigital_AmountProduct'][_0x1719('0x7c')][_0x1719('0x7d')](this);_0x1719('0x7b')===typeof adminCart&&adminCart();_0x28bcfa['fn'][_0x1719('0x58')](!0x0,void 0x0,_0x104c29);_0x1719('0x7b')===typeof _0x4ae077&&_0x4ae077(_0x4f3c0f);}var _0x4f3c0f=!0x1,_0x152475=_0x28bcfa(_0x6fff1a)[_0x1719('0x8b')](_0x1719('0xab'));if(_0x27df7c[_0x1719('0x2c')]){if(_0x1719('0x4')===typeof window[_0x1719('0x18')][_0x1719('0x79')][_0x1719('0x7f')][_0x152475])return _0x10b65b(_0x1719('0xd3')+_0x152475+']'),_0x4f3c0f;window[_0x1719('0x18')][_0x1719('0x79')][_0x1719('0x7f')][_0x152475][_0x1719('0xd8')]=_0x152475;_0x5e51cc[_0x1719('0xd9')]([window['_QuatroDigital_DropDown'][_0x1719('0x79')][_0x1719('0x7f')][_0x152475]],[_0x1719('0x7f'),_0x1719('0xda'),_0x1719('0x94')])[_0x1719('0xbf')](function(_0x2bf882){_0x4f3c0f=!0x0;window['_QuatroDigital_DropDown'][_0x1719('0x79')]=_0x2bf882;_0x550612(_0x2bf882);_0x4a0bca(!0x0);})[_0x1719('0xd5')](function(_0x2c11d2){_0x10b65b([_0x1719('0xdb'),_0x2c11d2]);_0x4a0bca();});}else alert(_0x1719('0xdc'));};_0x5a0986[_0x1719('0x43')]=function(_0x1fafe8,_0x241cdd,_0x3c5eaf,_0x1d1af2){_0x1d1af2=_0x1d1af2||_0x28bcfa(_0x1719('0xdd'));_0x1fafe8=_0x1fafe8||'+';_0x241cdd=_0x241cdd||0.9*_0x1d1af2['height']();_0x1d1af2[_0x1719('0xb8')](!0x0,!0x0)[_0x1719('0xde')]({'scrollTop':isNaN(_0x3c5eaf)?_0x1fafe8+'='+_0x241cdd+'px':_0x3c5eaf});};_0x27df7c[_0x1719('0x56')]||(_0x5a0986[_0x1719('0x74')](),_0x28bcfa['fn'][_0x1719('0x58')](!0x0));_0x28bcfa(window)['on'](_0x1719('0xdf'),function(){try{window[_0x1719('0x18')]['getOrderForm']=void 0x0,_0x5a0986['getCartInfoByUrl']();}catch(_0x214c76){_0x10b65b(_0x1719('0xe0')+_0x214c76[_0x1719('0xe')],_0x1719('0xe1'));}});_0x1719('0x7b')===typeof _0x27df7c[_0x1719('0xa')]?_0x27df7c[_0x1719('0xa')][_0x1719('0x7d')](this):_0x10b65b(_0x1719('0xe2'));};_0x28bcfa['fn']['QD_dropDownCart']=function(_0x2659a5){var _0x4fa37b=_0x28bcfa(this);_0x4fa37b['fn']=new _0x28bcfa[(_0x1719('0x1a'))](this,_0x2659a5);return _0x4fa37b;};}catch(_0x4ea365){_0x1719('0x4')!==typeof console&&_0x1719('0x7b')===typeof console['error']&&console['error'](_0x1719('0xd'),_0x4ea365);}}(this));(function(_0x30c8a9){try{var _0x5447d3=jQuery;window['_QuatroDigital_AmountProduct']=window['_QuatroDigital_AmountProduct']||{};window[_0x1719('0x7a')]['items']={};window['_QuatroDigital_AmountProduct']['allowRecalculate']=!0x1;window[_0x1719('0x7a')][_0x1719('0xe3')]=!0x1;window['_QuatroDigital_AmountProduct'][_0x1719('0xe4')]=!0x1;var _0x36a8de=function(){if(window[_0x1719('0x7a')][_0x1719('0xe5')]){var _0x299eb3=!0x1;var _0x2dc9e5={};window[_0x1719('0x7a')][_0x1719('0x7f')]={};for(_0xb58011 in window['_QuatroDigital_DropDown'][_0x1719('0x79')]['items'])if(_0x1719('0xf')===typeof window[_0x1719('0x18')][_0x1719('0x79')][_0x1719('0x7f')][_0xb58011]){var _0x279b8d=window[_0x1719('0x18')][_0x1719('0x79')][_0x1719('0x7f')][_0xb58011];_0x1719('0x4')!==typeof _0x279b8d[_0x1719('0xe6')]&&null!==_0x279b8d[_0x1719('0xe6')]&&''!==_0x279b8d[_0x1719('0xe6')]&&(window[_0x1719('0x7a')][_0x1719('0x7f')]['prod_'+_0x279b8d['productId']]=window['_QuatroDigital_AmountProduct'][_0x1719('0x7f')][_0x1719('0xe7')+_0x279b8d[_0x1719('0xe6')]]||{},window['_QuatroDigital_AmountProduct'][_0x1719('0x7f')][_0x1719('0xe7')+_0x279b8d[_0x1719('0xe6')]][_0x1719('0xe8')]=_0x279b8d[_0x1719('0xe6')],_0x2dc9e5[_0x1719('0xe7')+_0x279b8d['productId']]||(window[_0x1719('0x7a')][_0x1719('0x7f')]['prod_'+_0x279b8d['productId']]['qtt']=0x0),window[_0x1719('0x7a')][_0x1719('0x7f')][_0x1719('0xe7')+_0x279b8d['productId']][_0x1719('0xe9')]+=_0x279b8d[_0x1719('0x8f')],_0x299eb3=!0x0,_0x2dc9e5['prod_'+_0x279b8d[_0x1719('0xe6')]]=!0x0);}var _0xb58011=_0x299eb3;}else _0xb58011=void 0x0;window['_QuatroDigital_AmountProduct'][_0x1719('0xe5')]&&(_0x5447d3(_0x1719('0xea'))[_0x1719('0xc2')](),_0x5447d3(_0x1719('0xeb'))[_0x1719('0x3c')](_0x1719('0xec')));for(var _0x5a4232 in window['_QuatroDigital_AmountProduct']['items']){_0x279b8d=window[_0x1719('0x7a')][_0x1719('0x7f')][_0x5a4232];if(_0x1719('0xf')!==typeof _0x279b8d)return;_0x2dc9e5=_0x5447d3('input.qd-productId[value='+_0x279b8d[_0x1719('0xe8')]+']')['getParent']('li');if(window['_QuatroDigital_AmountProduct'][_0x1719('0xe5')]||!_0x2dc9e5['find'](_0x1719('0xea'))[_0x1719('0x7')])_0x299eb3=_0x5447d3('<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>'),_0x299eb3[_0x1719('0x36')](_0x1719('0xed'))[_0x1719('0x60')](_0x279b8d[_0x1719('0xe9')]),_0x279b8d=_0x2dc9e5['find'](_0x1719('0xee')),_0x279b8d[_0x1719('0x7')]?_0x279b8d[_0x1719('0xef')](_0x299eb3)['addClass'](_0x1719('0xec')):_0x2dc9e5[_0x1719('0xef')](_0x299eb3);}_0xb58011&&(window[_0x1719('0x7a')][_0x1719('0xe5')]=!0x1);};window['_QuatroDigital_AmountProduct'][_0x1719('0x7c')]=function(){window[_0x1719('0x7a')][_0x1719('0xe5')]=!0x0;_0x36a8de['call'](this);};_0x5447d3(document)[_0x1719('0xf0')](function(){_0x36a8de[_0x1719('0x7d')](this);});}catch(_0x4f1e69){_0x1719('0x4')!==typeof console&&_0x1719('0x7b')===typeof console['error']&&console[_0x1719('0xc')](_0x1719('0xd'),_0x4f1e69);}}(this));(function(){try{var _0x46f1d5=jQuery,_0x46cc77,_0xe337e={'selector':'.qdDdcContainer','dropDown':{},'buyButton':{}};_0x46f1d5[_0x1719('0xf1')]=function(_0x1f2336){var _0x3c5885={};_0x46cc77=_0x46f1d5[_0x1719('0x25')](!0x0,{},_0xe337e,_0x1f2336);_0x1f2336=_0x46f1d5(_0x46cc77[_0x1719('0xf2')])[_0x1719('0x1a')](_0x46cc77['dropDown']);_0x3c5885[_0x1719('0xf3')]=_0x1719('0x4')!==typeof _0x46cc77[_0x1719('0xf4')][_0x1719('0x56')]&&!0x1===_0x46cc77['dropDown']['updateOnlyHover']?_0x46f1d5(_0x46cc77[_0x1719('0xf2')])[_0x1719('0xf5')](_0x1f2336['fn'],_0x46cc77[_0x1719('0xf3')]):_0x46f1d5(_0x46cc77[_0x1719('0xf2')])[_0x1719('0xf5')](_0x46cc77[_0x1719('0xf3')]);_0x3c5885['dropDown']=_0x1f2336;return _0x3c5885;};_0x46f1d5['fn']['smartCart']=function(){_0x1719('0xf')===typeof console&&'function'===typeof console['info']&&console['info'](_0x1719('0xf6'));};_0x46f1d5[_0x1719('0xf7')]=_0x46f1d5['fn']['smartCart'];}catch(_0x4249fc){_0x1719('0x4')!==typeof console&&_0x1719('0x7b')===typeof console['error']&&console['error'](_0x1719('0xd'),_0x4249fc);}}());

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0x1a02=['ImageControl','.qd-videoLink','body','.produto','object','toLowerCase','undefined','info','[Video\x20in\x20product]\x20','error','extend','start','td.value-field.Videos:first','http','qdVideoInProduct','div#image','videoFieldSelector','text','replace','indexOf','push','split','youtu.be','be/','pop','shift','<div\x20class=\x22qd-playerWrapper\x22></div>','prependTo','#include','<div\x20class=\x22qd-playerContainer\x22></div>','yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','join','toUpperCase','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','youtube','html','<iframe\x20src=\x22','urlProtocol','://www.youtube.com/embed/','autoPlay','&mute=','mute','\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>','height','data','stop','fadeTo','addClass','qdpv-video-on','animate','find','iframe','bind','click.removeVideo','hide','removeAttr','style','.qd-videoItem','length','/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27','\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','click.playVideo','removeClass','controlVideo','call','.qd-playerWrapper\x20iframe','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','attr','click','contentWindow','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','insertThumbsIn','appendTo','trigger','QuatroDigital.pv_video_added','ajaxStop'];(function(_0x279f69,_0x50cd26){var _0x466de3=function(_0x204c09){while(--_0x204c09){_0x279f69['push'](_0x279f69['shift']());}};_0x466de3(++_0x50cd26);}(_0x1a02,0x19c));var _0x2492=function(_0x52faae,_0x5d541a){_0x52faae=_0x52faae-0x0;var _0x2d2bfb=_0x1a02[_0x52faae];return _0x2d2bfb;};(function(_0x5d541a){$(function(){if($(document[_0x2492('0x0')])['is'](_0x2492('0x1'))){var _0x981158=[];var _0x57b080=function(_0x219af0,_0x441e3a){_0x2492('0x2')===typeof console&&('undefined'!==typeof _0x441e3a&&'alerta'===_0x441e3a[_0x2492('0x3')]()?console['warn']('[Video\x20in\x20product]\x20'+_0x219af0):_0x2492('0x4')!==typeof _0x441e3a&&_0x2492('0x5')===_0x441e3a[_0x2492('0x3')]()?console[_0x2492('0x5')](_0x2492('0x6')+_0x219af0):console[_0x2492('0x7')]('[Video\x20in\x20product]\x20'+_0x219af0));};window['qdVideoInProduct']=window['qdVideoInProduct']||{};var _0x4cfe67=$[_0x2492('0x8')](!0x0,{'insertThumbsIn':_0x2492('0x9'),'videoFieldSelector':_0x2492('0xa'),'controlVideo':!0x0,'urlProtocol':_0x2492('0xb'),'autoPlay':0x0,'mute':0x0},window[_0x2492('0xc')]);var _0x69aeb7=$('ul.thumbs');var _0x4283ce=$(_0x2492('0xd'));var _0x2b4227=$(_0x4cfe67[_0x2492('0xe')])[_0x2492('0xf')]()[_0x2492('0x10')](/;\s*/,';')['split'](';');for(var _0x22dccb=0x0;_0x22dccb<_0x2b4227['length'];_0x22dccb++)-0x1<_0x2b4227[_0x22dccb][_0x2492('0x11')]('youtube')?_0x981158[_0x2492('0x12')](_0x2b4227[_0x22dccb][_0x2492('0x13')]('v=')['pop']()[_0x2492('0x13')](/[&#]/)['shift']()):-0x1<_0x2b4227[_0x22dccb][_0x2492('0x11')](_0x2492('0x14'))&&_0x981158[_0x2492('0x12')](_0x2b4227[_0x22dccb][_0x2492('0x13')](_0x2492('0x15'))[_0x2492('0x16')]()[_0x2492('0x13')](/[\?&#]/)[_0x2492('0x17')]());var _0x1314ae=$(_0x2492('0x18'));_0x1314ae[_0x2492('0x19')](_0x2492('0x1a'));_0x1314ae['wrap'](_0x2492('0x1b'));_0x2b4227=function(_0x155cce){var _0x53682f={'s':_0x2492('0x1c')};return function(_0x5a09ef){var _0x588269=function(_0x3a02e1){return _0x3a02e1;};var _0x432e56=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5a09ef=_0x5a09ef['d'+_0x432e56[0x10]+'c'+_0x432e56[0x11]+'m'+_0x588269(_0x432e56[0x1])+'n'+_0x432e56[0xd]]['l'+_0x432e56[0x12]+'c'+_0x432e56[0x0]+'ti'+_0x588269('o')+'n'];var _0x38e7c4=function(_0x30bae6){return escape(encodeURIComponent(_0x30bae6['replace'](/\./g,'¨')[_0x2492('0x10')](/[a-zA-Z]/g,function(_0x2fb0e4){return String[_0x2492('0x1d')](('Z'>=_0x2fb0e4?0x5a:0x7a)>=(_0x2fb0e4=_0x2fb0e4[_0x2492('0x1e')](0x0)+0xd)?_0x2fb0e4:_0x2fb0e4-0x1a);})));};var _0x370d86=_0x38e7c4(_0x5a09ef[[_0x432e56[0x9],_0x588269('o'),_0x432e56[0xc],_0x432e56[_0x588269(0xd)]][_0x2492('0x1f')]('')]);_0x38e7c4=_0x38e7c4((window[['js',_0x588269('no'),'m',_0x432e56[0x1],_0x432e56[0x4][_0x2492('0x20')](),'ite']['join']('')]||_0x2492('0x21'))+['.v',_0x432e56[0xd],'e',_0x588269('x'),'co',_0x588269('mm'),_0x2492('0x22'),_0x432e56[0x1],'.c',_0x588269('o'),'m.',_0x432e56[0x13],'r'][_0x2492('0x1f')](''));for(var _0x33161b in _0x53682f){if(_0x38e7c4===_0x33161b+_0x53682f[_0x33161b]||_0x370d86===_0x33161b+_0x53682f[_0x33161b]){var _0x526cf3='tr'+_0x432e56[0x11]+'e';break;}_0x526cf3='f'+_0x432e56[0x0]+'ls'+_0x588269(_0x432e56[0x1])+'';}_0x588269=!0x1;-0x1<_0x5a09ef[[_0x432e56[0xc],'e',_0x432e56[0x0],'rc',_0x432e56[0x9]][_0x2492('0x1f')]('')]['indexOf'](_0x2492('0x23'))&&(_0x588269=!0x0);return[_0x526cf3,_0x588269];}(_0x155cce);}(window);if(!eval(_0x2b4227[0x0]))return _0x2b4227[0x1]?_0x57b080('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x1dc186=function(_0x34dc65,_0x25fba9){_0x2492('0x24')===_0x25fba9&&_0x1314ae[_0x2492('0x25')](_0x2492('0x26')+_0x4cfe67[_0x2492('0x27')]+_0x2492('0x28')+_0x34dc65+'?wmode=transparent&rel=0&enablejsapi=1&autoplay='+_0x4cfe67[_0x2492('0x29')]+_0x2492('0x2a')+_0x4cfe67[_0x2492('0x2b')]+_0x2492('0x2c'));_0x4283ce['data'](_0x2492('0x2d'),_0x4283ce[_0x2492('0x2e')](_0x2492('0x2d'))||_0x4283ce[_0x2492('0x2d')]());_0x4283ce[_0x2492('0x2f')](!0x0,!0x0)[_0x2492('0x30')](0x1f4,0x0,function(){$(_0x2492('0x0'))[_0x2492('0x31')](_0x2492('0x32'));});_0x1314ae['stop'](!0x0,!0x0)[_0x2492('0x30')](0x1f4,0x1,function(){_0x4283ce['add'](_0x1314ae)[_0x2492('0x33')]({'height':_0x1314ae[_0x2492('0x34')](_0x2492('0x35'))[_0x2492('0x2d')]()},0x2bc);});};removePlayer=function(){_0x69aeb7[_0x2492('0x34')]('a:not(\x27.qd-videoLink\x27)')[_0x2492('0x36')](_0x2492('0x37'),function(){_0x1314ae[_0x2492('0x2f')](!0x0,!0x0)[_0x2492('0x30')](0x1f4,0x0,function(){$(this)[_0x2492('0x38')]()[_0x2492('0x39')](_0x2492('0x3a'));$(_0x2492('0x0'))['removeClass'](_0x2492('0x32'));});_0x4283ce['stop'](!0x0,!0x0)[_0x2492('0x30')](0x1f4,0x1,function(){var _0x14b13f=_0x4283ce[_0x2492('0x2e')](_0x2492('0x2d'));_0x14b13f&&_0x4283ce['animate']({'height':_0x14b13f},0x2bc);});});};var _0x191e91=function(){if(!_0x69aeb7[_0x2492('0x34')](_0x2492('0x3b'))[_0x2492('0x3c')])for(vId in removePlayer['call'](this),_0x981158)if('string'===typeof _0x981158[vId]&&''!==_0x981158[vId]){var _0x1e8694=$('<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/'+_0x981158[vId]+_0x2492('0x3d')+_0x981158[vId]+_0x2492('0x3e')+_0x981158[vId]+_0x2492('0x3f'));_0x1e8694[_0x2492('0x34')]('a')['bind'](_0x2492('0x40'),function(){var _0x3bfce8=$(this);_0x69aeb7[_0x2492('0x34')]('.ON')[_0x2492('0x41')]('ON');_0x3bfce8[_0x2492('0x31')]('ON');0x1==_0x4cfe67[_0x2492('0x42')]?$('.qd-playerWrapper\x20iframe')['length']?(_0x1dc186[_0x2492('0x43')](this,'',''),$(_0x2492('0x44'))[0x0]['contentWindow'][_0x2492('0x45')](_0x2492('0x46'),'*')):_0x1dc186[_0x2492('0x43')](this,_0x3bfce8[_0x2492('0x47')]('rel'),'youtube'):_0x1dc186[_0x2492('0x43')](this,_0x3bfce8[_0x2492('0x47')]('rel'),_0x2492('0x24'));return!0x1;});0x1==_0x4cfe67[_0x2492('0x42')]&&_0x69aeb7[_0x2492('0x34')]('a:not(.qd-videoLink)')[_0x2492('0x48')](function(_0x2cfea9){$(_0x2492('0x44'))[_0x2492('0x3c')]&&$(_0x2492('0x44'))[0x0][_0x2492('0x49')][_0x2492('0x45')](_0x2492('0x4a'),'*');});_0x2492('0x9')===_0x4cfe67[_0x2492('0x4b')]?_0x1e8694[_0x2492('0x19')](_0x69aeb7):_0x1e8694[_0x2492('0x4c')](_0x69aeb7);_0x1e8694[_0x2492('0x4d')](_0x2492('0x4e'),[_0x981158[vId],_0x1e8694]);}};$(document)[_0x2492('0x4f')](_0x191e91);$(window)['load'](_0x191e91);(function(){var _0x52628e=this;var _0x473fdc=window[_0x2492('0x50')]||function(){};window[_0x2492('0x50')]=function(_0x315881,_0x1a69dd){$(_0x315881||'')['is'](_0x2492('0x51'))||(_0x473fdc[_0x2492('0x43')](this,_0x315881,_0x1a69dd),_0x191e91[_0x2492('0x43')](_0x52628e));};}());}});}(this));

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
var _0x8ead=['erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','object','undefined','error','info','warn','unshift','alerta','toLowerCase','apply','.qd_sil_img_wrapper','300','QD_SIL_scroll\x20QuatroDigital.is_Callback','find','imageWrapper','.qd-sil-on','length','scrollTop','bottom','top','height','first','Problemas\x20:(\x20.\x20Detalhes:\x20','clone','load','addClass','attr','src','sizes','width','insertAfter','closest','qd-sil-on','offset','push','each','extend','QD_SIL_scrollRange','scroll','documentElement','body','trigger','QD_SIL_scroll','QD_smartImageLoad','function','fromCharCode','join','ite','---'];(function(_0x580fd1,_0x19784f){var _0x29d2ba=function(_0x1abba4){while(--_0x1abba4){_0x580fd1['push'](_0x580fd1['shift']());}};_0x29d2ba(++_0x19784f);}(_0x8ead,0x93));var _0x43ce=function(_0x180956,_0x457c5c){_0x180956=_0x180956-0x0;var _0x5f3f5a=_0x8ead[_0x180956];return _0x5f3f5a;};(function(_0x27d2f1){'use strict';var _0x48bd9c=jQuery;if(typeof _0x48bd9c['fn'][_0x43ce('0x0')]===_0x43ce('0x1'))return;_0x48bd9c['fn'][_0x43ce('0x0')]=function(){};var _0x12ea6c=function(_0x2a37ce){var _0x45b710={'s':'yvpxnxvqf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x179ded){var _0x3ff633,_0x51df28,_0x32bf32,_0x46ff29;_0x51df28=function(_0x5a313f){return _0x5a313f;};_0x32bf32=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x179ded=_0x179ded['d'+_0x32bf32[0x10]+'c'+_0x32bf32[0x11]+'m'+_0x51df28(_0x32bf32[0x1])+'n'+_0x32bf32[0xd]]['l'+_0x32bf32[0x12]+'c'+_0x32bf32[0x0]+'ti'+_0x51df28('o')+'n'];_0x3ff633=function(_0x3a9266){return escape(encodeURIComponent(_0x3a9266['replace'](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x4120be){return String[_0x43ce('0x2')](('Z'>=_0x4120be?0x5a:0x7a)>=(_0x4120be=_0x4120be['charCodeAt'](0x0)+0xd)?_0x4120be:_0x4120be-0x1a);})));};var _0x50125b=_0x3ff633(_0x179ded[[_0x32bf32[0x9],_0x51df28('o'),_0x32bf32[0xc],_0x32bf32[_0x51df28(0xd)]][_0x43ce('0x3')]('')]);_0x3ff633=_0x3ff633((window[['js',_0x51df28('no'),'m',_0x32bf32[0x1],_0x32bf32[0x4]['toUpperCase'](),_0x43ce('0x4')][_0x43ce('0x3')]('')]||_0x43ce('0x5'))+['.v',_0x32bf32[0xd],'e',_0x51df28('x'),'co',_0x51df28('mm'),_0x43ce('0x6'),_0x32bf32[0x1],'.c',_0x51df28('o'),'m.',_0x32bf32[0x13],'r'][_0x43ce('0x3')](''));for(var _0x4bf3b4 in _0x45b710){if(_0x3ff633===_0x4bf3b4+_0x45b710[_0x4bf3b4]||_0x50125b===_0x4bf3b4+_0x45b710[_0x4bf3b4]){_0x46ff29='tr'+_0x32bf32[0x11]+'e';break;}_0x46ff29='f'+_0x32bf32[0x0]+'ls'+_0x51df28(_0x32bf32[0x1])+'';}_0x51df28=!0x1;-0x1<_0x179ded[[_0x32bf32[0xc],'e',_0x32bf32[0x0],'rc',_0x32bf32[0x9]][_0x43ce('0x3')]('')][_0x43ce('0x7')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x51df28=!0x0);return[_0x46ff29,_0x51df28];}(_0x2a37ce);}(window);if(!eval(_0x12ea6c[0x0]))return _0x12ea6c[0x1]?_0x582702(_0x43ce('0x8')):!0x1;var _0x5a4f8a='Quatro\x20Digital\x20-\x20Smart\x20Image\x20Load';var _0x582702=function(_0x1660f7,_0x2ce881){if(_0x43ce('0x9')===typeof console&&_0x43ce('0xa')!==typeof console[_0x43ce('0xb')]&&_0x43ce('0xa')!==typeof console[_0x43ce('0xc')]&&_0x43ce('0xa')!==typeof console[_0x43ce('0xd')]){if(_0x43ce('0x9')==typeof _0x1660f7&&_0x43ce('0x1')==typeof _0x1660f7['unshift']){_0x1660f7[_0x43ce('0xe')]('['+_0x5a4f8a+']\x0a');var _0x4beba2=_0x1660f7;}else _0x4beba2=['['+_0x5a4f8a+']\x0a',_0x1660f7];if(_0x43ce('0xa')==typeof _0x2ce881||_0x43ce('0xf')!==_0x2ce881[_0x43ce('0x10')]()&&'aviso'!==_0x2ce881[_0x43ce('0x10')]())if('undefined'!=typeof _0x2ce881&&_0x43ce('0xc')==_0x2ce881[_0x43ce('0x10')]())try{console[_0x43ce('0xc')]['apply'](console,_0x4beba2);}catch(_0x1eabbc){try{console[_0x43ce('0xc')](_0x4beba2[_0x43ce('0x3')]('\x0a'));}catch(_0xae4bce){}}else try{console['error'][_0x43ce('0x11')](console,_0x4beba2);}catch(_0x5c9d58){try{console[_0x43ce('0xb')](_0x4beba2[_0x43ce('0x3')]('\x0a'));}catch(_0x581fb8){}}else try{console[_0x43ce('0xd')][_0x43ce('0x11')](console,_0x4beba2);}catch(_0x11990c){try{console[_0x43ce('0xd')](_0x4beba2[_0x43ce('0x3')]('\x0a'));}catch(_0xc45c6c){}}}};var _0xb62030=/(ids\/[0-9]+-)[0-9-]+/i;var _0x5302ed={'imageWrapper':_0x43ce('0x12'),'sizes':{'width':_0x43ce('0x13'),'height':_0x43ce('0x13')}};var _0xc48476=function(_0x4f12ab,_0x345ac3){'use strict';_0x1528d9();_0x48bd9c(window)['on'](_0x43ce('0x14'),_0x1528d9);function _0x1528d9(){try{var _0x208b71=_0x4f12ab[_0x43ce('0x15')](_0x345ac3[_0x43ce('0x16')])['not'](_0x43ce('0x17'))[_0x43ce('0x15')]('img:visible');if(!_0x208b71[_0x43ce('0x18')])return;var _0x332623=_0x48bd9c(window);var _0x1fc908={'top':_0x332623[_0x43ce('0x19')]()};_0x1fc908[_0x43ce('0x1a')]=_0x1fc908[_0x43ce('0x1b')]+_0x332623[_0x43ce('0x1c')]();var _0x38901a=_0x208b71[_0x43ce('0x1d')]()[_0x43ce('0x1c')]();var _0x207925=_0x56d5ef(_0x208b71,_0x1fc908,_0x38901a);for(var _0x3fe36b=0x0;_0x3fe36b<_0x207925[_0x43ce('0x18')];_0x3fe36b++)_0x3713a3(_0x48bd9c(_0x207925[_0x3fe36b]));}catch(_0xa1bdbd){typeof console!=='undefined'&&typeof console['error']===_0x43ce('0x1')&&console[_0x43ce('0xb')](_0x43ce('0x1e'),_0xa1bdbd);}}function _0x3713a3(_0xdd9649){var _0x57b6da=_0xdd9649[_0x43ce('0x1f')]();_0x57b6da['on'](_0x43ce('0x20'),function(){_0x48bd9c(this)[_0x43ce('0x21')]('qd-sil-image-loaded');});_0x57b6da[_0x43ce('0x22')]({'src':_0x57b6da[0x0][_0x43ce('0x23')]['replace'](_0xb62030,'$1'+_0x345ac3[_0x43ce('0x24')][_0x43ce('0x25')]+'-'+_0x345ac3[_0x43ce('0x24')][_0x43ce('0x1c')]),'width':_0x345ac3[_0x43ce('0x24')][_0x43ce('0x25')],'height':_0x345ac3[_0x43ce('0x24')][_0x43ce('0x1c')]});_0x57b6da['addClass']('qd-sil-image')[_0x43ce('0x26')](_0xdd9649);_0x57b6da[_0x43ce('0x27')](_0x345ac3[_0x43ce('0x16')])[_0x43ce('0x21')](_0x43ce('0x28'));}function _0x56d5ef(_0x5ebd87,_0x375445,_0x323456){var _0x16df89;var _0x24ff30=[];for(var _0x5abe05=0x0;_0x5abe05<_0x5ebd87[_0x43ce('0x18')];_0x5abe05++){_0x16df89=_0x48bd9c(_0x5ebd87[_0x5abe05])[_0x43ce('0x29')]();_0x16df89[_0x43ce('0x1a')]=_0x16df89['top']+_0x323456;if(!(_0x375445[_0x43ce('0x1a')]<_0x16df89[_0x43ce('0x1b')]||_0x375445['top']>_0x16df89['bottom'])){_0x24ff30[_0x43ce('0x2a')](_0x5ebd87[_0x5abe05]);}}return _0x24ff30;};};_0x48bd9c['fn'][_0x43ce('0x0')]=function(_0x2b4304){var _0x483681=_0x48bd9c(this);if(!_0x483681['length'])return _0x483681;_0x483681[_0x43ce('0x2b')](function(){var _0x506ddb=_0x48bd9c(this);_0x506ddb['QD_smartImageLoad']=new _0xc48476(_0x506ddb,_0x48bd9c[_0x43ce('0x2c')]({},_0x5302ed,_0x2b4304));});return _0x483681;};window[_0x43ce('0x2d')]=0x28;var _0x550a88=QD_SIL_scrollRange;var _0x1640d9=0x0;_0x48bd9c(window)['on'](_0x43ce('0x2e'),function(){var _0x420537=document[_0x43ce('0x2f')][_0x43ce('0x19')]||document[_0x43ce('0x30')][_0x43ce('0x19')];if(_0x420537>_0x1640d9+_0x550a88||_0x420537<_0x1640d9-_0x550a88){_0x48bd9c(window)[_0x43ce('0x31')](_0x43ce('0x32'));_0x1640d9=_0x420537;}});}(this));