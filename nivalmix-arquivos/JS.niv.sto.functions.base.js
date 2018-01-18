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
			Common.saveAmountFix();
			Common.applyTipBarCarousel();
			Common.applyCarouselShelf();
			Common.setDataScrollToggle();
			Common.applySmartCart();
			Common.applyAmazingMenu();
			Common.applyAmazingMenuMobile();
			Common.showFooterLinks();
			Common.giftlistAddShoppingList();
			Common.openSearchModal();
			Common.applyMosaicCategorieBanners();
			Common.applyImageLoad();			
		},
		ajaxStop: function() {},
		windowOnload: function() {
			Common.saveAmountFix();
		},
		vtexBindQuickViewDestroy: function() {
			window.bindQuickView = function() {};
		},
		qdOverlayClass: 'qd-am-on qd-cart-show qd-sn-on',
		qdOverlay: function() {
			$('.components-qd-v1-overlay').click(function() {
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		},
		saveAmountFix: function() {
			$('.shelf-qd-v1-highlight-discount-percentage:not(.qd-on)').addClass('qd-on').each(function() {
				var $t = $(this);
				$t.text(($t.text().trim().match(/[0-9]+/) || [""]).pop() + '% OFF');
			});
		},
		applyMosaicCategorieBanners: function () {
			$('.mosaic-categories-qd-v1-wrapper > .box-banner').QD_mosaicBanners({
				bannerColSecurityMargin: 0,
				containerWidth: 1336,
				classFourColumn: "col-xs-12 col-sm-6 col-md-3"
			});
		},
		applyImageLoad: function () {
			$('.search-qd-v1-result, .carousel-qd-v1-shelf').QD_smartImageLoad({
				sizes: {
					width: '300',
					height: '300'
				}
			});
		},
		applyTipBarCarousel: function() {
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

			wrapper.slick($.extend(true, options, (function() {
				// Se estiver dentro do product-qd-v1-sku-selection-box, ele mostrará só 2 slides por vez, mantendo as outras propriedades da variável options
				if(wrapper.closest('.product-qd-v1-sku-selection-box').length)
					return { slidesToShow: 2 };
				return {};
			})()));
		},
		applyCarouselShelf: function() {
			if ($(document.body).is('.produto'))
				return

			var wrapper = $('.carousel-qd-v1-shelf:not(.special-carousel-qd-v1-shelf) .prateleira'); // todos, menos o carrossel especial, que é específico

			if (!wrapper.length)
				return false;

			wrapper.each(function() {
				var $t = $(this);
				$t.find('h2').insertBefore(wrapper).addClass('heading-3 shelf-qd-v1-title').wrapInner("<span></span>");
				
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
		setDataScrollToggle: function() {
			$(document.body).attr('data-qd-scroll-limit', '100');
		},
		applySmartCart: function() {
			$('.header-qd-v1-actions-wrapper').append('<div class="smart-cart-qd-v1-wrapper"><div class="qd-sc-wrapper"></div></div>');

			$(document.body).append('<div class="smart-cart-qd-v2-wrapper"><div class="qd-sc-wrapper"></div></div>');

			var wrapper = $(".qd-sc-wrapper");

			$.QD_smartCart({
				selector: wrapper,
				dropDown:{
					texts: {
						linkCart: "Finalizar Compra",
						cartTotal: '<span class="qd-infoTotalItems">Itens: #items</span><span class="qd-infoTotalValue">Total: #value</span>'
					},
					updateOnlyHover: false,
					smartCheckout: true,
					callback: function() {
						$(".qd-ddc-wrapper3").prepend('<div class="qd-cartTitle"><h3>Meu Carrinho</h3></div>');
						wrapper.find('.qd_ddc_continueShopping').after(wrapper.find('.qd-ddc-viewCart'));
					},
					skuName: function(data) {
						return data.name + ' - ' + data.skuName.replace(data.name, '');
					},
					callbackProductsList: function() {
						wrapper.find(".qd-ddc-prodQtt").each(function() {
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
			window._QuatroDigital_prodBuyCallback = function(jqXHR, textStatus, prodLink, skus){
				$.fn.simpleCart(true);
				$(".shelf-qd-v1-buy-button-modal").modal("hide");
				$(window).trigger("QuatroDigital.qd_bb_prod_add", [new $, skus[0] || 0]);
			};

			$('.header-qd-v1-cart-link').click(function(evt) {
				evt.preventDefault();
				$(document.body).toggleClass('qd-cart-show');

				wrapper.height($(window).height());
				wrapper.find(".qd-ddc-prodWrapper").css('max-height', $(window).height() - 193);
			});

			$('.qd_ddc_lightBoxClose').click(function(evt){
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		},
		applyAmazingMenuMobile: function() {
			var wrapper = $('.header-qd-v1-amazing-menu-mobile');

			wrapper.find('> ul > li > ul').prepend(function(){return $(this).prev().clone().wrap('<li></li>').parent()});

			wrapper.QD_amazingMenu({
				url: window.location.origin+"/qd-amazing-menu",
				callback: function() {
					$('<span class="qd-am-dropdown-trigger"><i class="fa fa-angle-down"></i></span>').appendTo(wrapper.find('.qd-am-has-ul')).click(function() {
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
		},
		applyAmazingMenu: function() {
			$('.header-qd-v1-amazing-menu').QD_amazingMenu({
				callback: function() {
					$('ul.qd-am-dropdown-menu').each(function() {
						$(this).wrapInner('<li class="container"><ul></ul></li>');
					});
				}
			});

			$('.header-qd-v1-floating-amazing-menu').click(function(e) {
				$('.header-qd-v1-amazing-menu-wrapper').toggleClass('qd-is-active');
				e.preventDefault();
			});
		},
		giftlistAddShoppingList: function() {
			$(".shelf-qd-v1-giftlist-add:not(.qd-on)").addClass("qd-on").click(function(){
				var $t = $(this);

				if ($(".glis-popup-link").length > 0) {
					$(".product-insertsku .insert-sku-checkbox").filter(":checked, [checked]").removeAttr("checked").click();
					$t.parent().find(".product-insertsku .insert-sku-checkbox").attr("checked", true).click();
					$(".glis-popup-link").click();
				} else {
					$(window.document.location).attr('href', $(".glis-link.must-login").attr("href"));
				}
			});
		},
		openSearchModal: function() {
			$('.header-qd-v1-action-search').click(function(e) {
				e.preventDefault();
				
				var modal = $('.modal-qd-v1-search');
				modal.modal();
				
				$(document.body).addClass('qd-sm-on');
				modal.on('hidden.bs.modal', function (e) {
					$(document.body).removeClass('qd-sm-on');
					modal.off(e);
				})
			});
		},
		showFooterLinks: function () {
			$('.footer-qd-v1-links-wrapper > ul > li').click(function (e) {
				var $t = $(this);
				$t.toggleClass('qd-is-active');
				$t.find('> ul').toggleClass('qd-is-active');
			});
		},
	};

	var Home = {
		init: function() {
			Home.applySliderFull();
			Home.applyBrandCarousel();
			Home.applySpecialShelfCarousel();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		applySliderFull: function() {
			var wrapper = $('.slider-qd-v1-full');

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
		applyMosaicCategorieBanners: function() {
			$('.mosaic-categories-qd-v1-wrapper > .box-banner').QD_mosaicBanners({
				bannerColSecurityMargin: -30,
				containerWidth: 1326,
				classFourColumn: "col-xs-12 col-sm-6 col-md-3"
			});
		},
		applySpecialShelfCarousel: function() {
			var wrapper = $('.home-qd-v1-special-carousel-banner');

			if (!wrapper.length)
				return false;

			var hasBanner = wrapper.find('.box-banner').length;
			if (!hasBanner)
				wrapper.find('[class*="col-md-"]').removeClass().addClass('col-xs-12');

			wrapper.find('.prateleira').each(function() {
				var $wrap = $(this).parent();
				// var $carousel = $t.find('.special-carousel-qd-v1-shelf');
				$(this).find('h2').addClass('heading-3 shelf-qd-v1-title').wrapInner("<span></span>").insertBefore($(this));
				$wrap.addClass('special-carousel-qd-v1-shelf-split');
			});

			var slideQtd = hasBanner ? 3 : 4;

			wrapper.find('.special-carousel-qd-v1-shelf .prateleira').slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: slideQtd,
				slidesToScroll: slideQtd,
				infinite: true,
				draggable: false,
				speed: 700,
				responsive: [
					{
						breakpoint: 1200,
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
		}
	};

	var Search = {
		init: function() {
			Search.spanTitle();
			Search.openFiltersMenu();
			Search.hideExtendedMenu();
			Home.applySliderFull();	
			Search.shelfLineFix();
			Search.infinityScroll();						
		},
		ajaxStop: function() {
			Search.shelfLineFix();			
		},
		windowOnload: function() {

		},
		infinityScroll: function () {
			$(".prateleira[id*=ResultItems]").QD_infinityScroll();
		},
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
		spanTitle: function(){
			$('.search-qd-v1-result-title').find('h1,h2,h3,h4').wrapInner("<span></span>");
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
					if(!window.qd_shelf_line_fix_is){
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
		}
	};

	var Product = {
		run: function() {},
		init: function() {
			Product.accessoriesApplyCarousel();
			Product.accessoriesFix();
			Product.forceImageZoom();
			Product.setAvailableBodyClass();
			// Roda slick das thumbs quando volta para estado inicial
			$(window).on('skuSelectable.vtex', Product.applyCarouselThumb);
			Product.qdHideUniqueSkuOption();
			Product.saveAmountFlag();
			Product.openShipping();
			Product.scrollToDescription();
			Product.selectSku();
			Product.seeInstalments();
			Product.checkBuyTogether();
			Product.applyCarouselShelfProduct(); // executar após checkBuyTogether
			Product.scrollToBuyButton();
			Product.showFloatingBuyBar();
		},
		ajaxStop: function() {
			Product.applyCarouselThumb();
		},
		windowOnload: function() {
			Product.setCEPPlaceholder();
		},
		accessoriesFix: function () {
			$('fieldset >.buy-product-checkbox').parent().each(function () {
				var $t = $(this);
				$t.add($t.prev('ul')).wrapAll('<div class="accessories-qd-v1-item col-xs-12 col-sm-6 col-md-3"/>');
			});
		},
		accessoriesApplyCarousel: function () {
			var item = $('.accessories-qd-v1-item');
			var spanT = $('.accessories-qd-v1-wrapper');
			
			if (!spanT.length)
				return;

			spanT.each(function() {
				var $t = $(this);
				$t.find('h2').insertBefore(spanT).addClass('accessories-qd-v1-title heading-3 shelf-qd-v1-title').wrapInner("<span></span>");
				
			});

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
		applyCarouselShelfProduct: function() {

			var wrapper = $('.carousel-qd-v1-shelf .prateleira');

			if (!wrapper.length)
				return false;

			wrapper.each(function() {
				var $t = $(this);			
				$t.find('h2').insertBefore(wrapper).addClass('heading-3 shelf-qd-v1-title').wrapInner("<span></span>");
			});

			var slidesToShow = 4;

			if (wrapper.hasClass('carousel-shelf-qd-v1-split'))
				slidesToShow = 2;

			wrapper.slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: slidesToShow,
				slidesToScroll: slidesToShow,
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
		showFloatingBuyBar: function () {
			var targetOffset = $(".product-qd-v1-buy-button").offset().top - 30;
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
				slidesToShow: 5,
				slidesToScroll: 5,				  
  				arrows: false,
				infinite: false,
				draggable: true,
				swipeToSlide: true,
				edgeFriction: .1,
				variableWidth: true,
				responsive: [
					{
					breakpoint: 600,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3,
							variableWidth: false
						}
					}
				]
			});
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
		scrollToDescription: function() {
			$('.product-qd-v1-link-description').click(function(e) {
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $('.product-qd-v1-description').offset().top -100
				}, 900, 'swing');
			});
		},
		selectSku: function(){
			var wrapper = $('.skuList');

			wrapper.on('selectSku.qd_click', function() {
				try{
					var $t = $(this);

					var buyButton = $t.find('.buy-button');
					if(buyButton.length)
						var skuId = buyButton.attr('href').match(/sku\=([0-9]+)/i)[1];
					else
						var skuId = $t.find('.sku-notifyme-skuid').val();

					var selectedSku;
					for(var i = 0; i < skuJson.skus.length; i++){
						if(skuJson.skus[i].sku == skuId){
							selectedSku = skuJson.skus[i];
							break;
						}
					}

					if(selectedSku)
						$(document).trigger('skuSelected.vtex', [skuId, selectedSku]);

					wrapper.removeClass('qd-sku-list-selected qd-sku-list-selected-by-click');
					$t.addClass('qd-sku-list-selected');
				}
				catch(e){if (typeof console !== 'undefined' && typeof console.info === 'function') console.info('Problemas ao selecionar o SKU', e.message); };
			});

			wrapper.click(function() {
				var $t = $(this);

				$t.trigger('selectSku.qd_click');
				$t.addClass('qd-sku-list-selected-by-click');
			});
		},
		seeInstalments: function () {
			$('.product-qd-v1-see-installments').click(function (e) {
				e.preventDefault();
				$(this).toggleClass('qd-is-active');
				$('.product-qd-v1-installments-method').toggleClass('qd-is-visible');
			});
		},
		checkBuyTogether: function(){
			var buyTogether = $(".product-qd-v1-buy-together-wrapper");
			var placeholder = $('.product-qd-v1-crosseling-wrapper');
			var placeholderCarousel = placeholder.find('.carousel-qd-v1-shelf');

			if(placeholderCarousel.length > 0 && buyTogether.find('.buy-together-content > *').length > 0) {
				$('.product-qd-v1-buy-together-crosseling').addClass('col-lg-6');
				placeholderCarousel.removeClass('qd-shelf-sm-3').addClass('qd-shelf-sm-6');
				buyTogether.find('#divTitulo').addClass('heading-3 shelf-qd-v1-title').wrapInner("<span></span>");
				placeholder.find('.prateleira').addClass('carousel-shelf-qd-v1-split');
			}
		},
		setCEPPlaceholder: function(){
			$('.freight-zip-box').attr('placeholder', 'Digite seu Cep');
		}
	};

	var List = {
		run: function() {},
		init: function() {
			Home.applySliderFull();
			List.openModalVideoInstitutional();		
			List.applyGiftlistCarousel();
			// List.spanTitle();
			// List.manageInfo();
			Search.openFiltersMenu();
			Search.hideExtendedMenu();
			Search.shelfLineFix();
			List.scrollToGiftlistSearch();
			
			if ($("body").hasClass('giftlist-shelf-ready')) {
				List.giftlistClone();
			}
		},
		ajaxStop: function() {
			List.spanTitle();
			List.manageInfo();
		},
		windowOnload: function() {},
		openModalVideoInstitutional: function () {
			var videoRegex = /(youtu\.be\/|\?v=)([^&]+)/i;

			$('.box-banner a').filter('[href*="youtube.com/"], [href*="youtu.be/"]').click(function (e) {
				e.preventDefault();
				var modal = $('.qd-v1-modal').clone().appendTo(document.body).addClass('giftlist-information-qd-v1-modal');
				var $t = $(this);
				var videoId = ($t.attr('href').match(videoRegex) || ['']).pop();

				modal.find('.modal-header').append('<h2 class="modal-title"><span>' + $t.find('img').attr('alt') + '</span></h2>').prepend('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
				$('<iframe src="' + 'https://www.youtube.com/embed/' + videoId + '?wmode=transparent&rel=0" frameborder="0"></iframe>').appendTo(modal.find('.modal-body'));
				$(".giftlist-information-qd-v1-modal").find('iframe').wrap('<div class="embed-responsive embed-responsive-16by9"></div>')

				modal.modal();

				modal.on('hidden.bs.modal', function () {
					modal.remove();
				});
			});
		},
		giftlistClone: function () {
			$('<div class="giftlist-qd-v1-clone"><a class="giftlist-qd-v1-clone-list">COPIAR LISTA <i class="fa fa-files-o" aria-hidden="true"></i></a></div>').insertAfter('.giftlistinfo-message').click(function () {
				if ($(".glis-popup-link").length > 0) {
					$(".glis-sku-listtolist .glis-listtolist-checkbox").attr("checked", true).click();
					$(".glis-popup-link").click();
				} else {
					$(window.document.location).attr('href', $(".glis-link.must-login").attr("href"));
				}
				return false;
			});
		},
		applyGiftlistCarousel: function () {
			var wrapper = $('.giftlist-videos-carousel-qd-v1-carousel');

			wrapper.slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				dots: true,
				speed: 700
			});
		},
		spanTitle: function () {
			$('h1,h2,h3,h4, .giftlistinfo-description').each(function () {
				$(this).wrapInner("<span></span>");
			});
		},
		manageInfo: function () {
			var wrapper = $('#giftliststatistics');

			wrapper.find('thead .glstat-table-itens:not(.qd-on)').addClass('qd-on').append('<span>' + wrapper.find('tbody .glstat-table-itens').text() + '</span>');
			wrapper.find('thead .glstat-table-purchased:not(.qd-on)').addClass('qd-on').append('<span>' + wrapper.find('tbody .glstat-table-purchased').text() + '</span>');
		},
		scrollToGiftlistSearch: function () {
			$('.giftlist-qd-v1-link-search').click(function (e) {
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $('.giftlist-qd-v1-home-search').offset().top - 100
				}, 900, 'swing');
			});
		}
	};

	var Institutional = {
		init: function() {
			Institutional.spanTitle();
			Institutional.openFilterMenu();			
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		spanTitle: function(){
			$('h1,h2,h3,h4').each(function(){
				$(this).wrapInner("<span></span>");
			});	
		},
		openFilterMenu: function(){
			$('.institucional-qd-v1-menu-toggle').click(function(e) {
				e.preventDefault();
				
				$(document.body).toggleClass('qd-sn-on');
			});
		}
	};

	var Orders = {
		init: function() {
			Orders.bootstrapCssFix();
			Orders.spanTitle();
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
		},
		spanTitle: function(){
			$('h1,h2,h3,h4').each(function(){
				$(this).wrapInner("<span></span>");
			});	
		},
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
			else if (body.is(".giftlist")) List.windowOnload();
			else if (body.is(".institucional")) Institutional.windowOnload();
			else if (body.is(".orders")) Orders.windowOnload();
		};

		ajaxStop = function() {
			Common.ajaxStop();
			if (body.is(".home")) Home.ajaxStop();
			else if (body.is(".resultado-busca, .departamento, .categoria")) Search.ajaxStop();
			else if (body.is(".produto")) Product.ajaxStop();
			else if (body.is(".giftlist")) List.ajaxStop();
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
			else if (body.is(".giftlist")) List.init();
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
var _0x8425=['aviso','info','apply','removeClass','qd-ssa-sku-no-selected','addClass','qd-ssa-sku-selected','SkuSellersInformation','AvailableQuantity','attr','data-qd-ssa-qtt','each','find','hide','qd-ssa-show','[data-qd-ssa-text=\x22','length','filter','[data-qd-ssa-text=\x22default\x22]','html','replace','#qtt','show','qd-ssa-hide','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','message','qd-ssa-on','qd-ssa-skus-','skus','split','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','QuatroDigital.ssa.prodUnavailable','vtex.sku.selected.QD','qd-ssa-sku-prod-unavailable','vinyzvk%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','toUpperCase','ite','join','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','initialSkuSelected','QuatroDigital.ssa.skuSelected','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','trigger','off','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','unavailable','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','qdAjaxQueue','qdAjax','opts','success','call','error','complete','parameters','callbackFns','successPopulated','boolean','errorPopulated','completePopulated','object','clearQueueDelay','undefined','jqXHR','readyState','data','textStatus','errorThrown','version','2.1','/produto/sku/','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','function','QD_smartStockAvailable','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','toLowerCase'];(function(_0x378849,_0xf62e){var _0x13c341=function(_0x4c5802){while(--_0x4c5802){_0x378849['push'](_0x378849['shift']());}};_0x13c341(++_0xf62e);}(_0x8425,0x190));var _0x5842=function(_0x3cd494,_0x95673b){_0x3cd494=_0x3cd494-0x0;var _0x2b1cc7=_0x8425[_0x3cd494];return _0x2b1cc7;};(function(_0x4709c0){if('function'!==typeof _0x4709c0['qdAjax']){var _0x2dfba6={};_0x4709c0[_0x5842('0x0')]=_0x2dfba6;_0x4709c0[_0x5842('0x1')]=function(_0x2def36){var _0x4d9455=_0x4709c0['extend']({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x2def36);var _0x1e97f6=escape(encodeURIComponent(_0x4d9455['url']));_0x2dfba6[_0x1e97f6]=_0x2dfba6[_0x1e97f6]||{};_0x2dfba6[_0x1e97f6][_0x5842('0x2')]=_0x2dfba6[_0x1e97f6][_0x5842('0x2')]||[];_0x2dfba6[_0x1e97f6][_0x5842('0x2')]['push']({'success':function(_0x41e210,_0x56492f,_0x13b394){_0x4d9455[_0x5842('0x3')][_0x5842('0x4')](this,_0x41e210,_0x56492f,_0x13b394);},'error':function(_0x1f62ef,_0x4f3ca7,_0x1db5b6){_0x4d9455[_0x5842('0x5')]['call'](this,_0x1f62ef,_0x4f3ca7,_0x1db5b6);},'complete':function(_0x12b4f1,_0x5393f0){_0x4d9455[_0x5842('0x6')]['call'](this,_0x12b4f1,_0x5393f0);}});_0x2dfba6[_0x1e97f6]['parameters']=_0x2dfba6[_0x1e97f6][_0x5842('0x7')]||{'success':{},'error':{},'complete':{}};_0x2dfba6[_0x1e97f6]['callbackFns']=_0x2dfba6[_0x1e97f6][_0x5842('0x8')]||{};_0x2dfba6[_0x1e97f6][_0x5842('0x8')][_0x5842('0x9')]=_0x5842('0xa')===typeof _0x2dfba6[_0x1e97f6]['callbackFns'][_0x5842('0x9')]?_0x2dfba6[_0x1e97f6][_0x5842('0x8')][_0x5842('0x9')]:!0x1;_0x2dfba6[_0x1e97f6][_0x5842('0x8')]['errorPopulated']=_0x5842('0xa')===typeof _0x2dfba6[_0x1e97f6][_0x5842('0x8')][_0x5842('0xb')]?_0x2dfba6[_0x1e97f6][_0x5842('0x8')][_0x5842('0xb')]:!0x1;_0x2dfba6[_0x1e97f6][_0x5842('0x8')][_0x5842('0xc')]=_0x5842('0xa')===typeof _0x2dfba6[_0x1e97f6][_0x5842('0x8')][_0x5842('0xc')]?_0x2dfba6[_0x1e97f6][_0x5842('0x8')][_0x5842('0xc')]:!0x1;_0x2def36=_0x4709c0['extend']({},_0x4d9455,{'success':function(_0x36efe8,_0x4ac835,_0xffa276){_0x2dfba6[_0x1e97f6][_0x5842('0x7')][_0x5842('0x3')]={'data':_0x36efe8,'textStatus':_0x4ac835,'jqXHR':_0xffa276};_0x2dfba6[_0x1e97f6][_0x5842('0x8')][_0x5842('0x9')]=!0x0;for(var _0xcd8eb2 in _0x2dfba6[_0x1e97f6][_0x5842('0x2')])_0x5842('0xd')===typeof _0x2dfba6[_0x1e97f6][_0x5842('0x2')][_0xcd8eb2]&&(_0x2dfba6[_0x1e97f6]['opts'][_0xcd8eb2][_0x5842('0x3')][_0x5842('0x4')](this,_0x36efe8,_0x4ac835,_0xffa276),_0x2dfba6[_0x1e97f6][_0x5842('0x2')][_0xcd8eb2][_0x5842('0x3')]=function(){});},'error':function(_0xfe827c,_0x37f90e,_0x4375a7){_0x2dfba6[_0x1e97f6]['parameters'][_0x5842('0x5')]={'errorThrown':_0x4375a7,'textStatus':_0x37f90e,'jqXHR':_0xfe827c};_0x2dfba6[_0x1e97f6]['callbackFns'][_0x5842('0xb')]=!0x0;for(var _0x4fe85b in _0x2dfba6[_0x1e97f6][_0x5842('0x2')])'object'===typeof _0x2dfba6[_0x1e97f6][_0x5842('0x2')][_0x4fe85b]&&(_0x2dfba6[_0x1e97f6][_0x5842('0x2')][_0x4fe85b][_0x5842('0x5')][_0x5842('0x4')](this,_0xfe827c,_0x37f90e,_0x4375a7),_0x2dfba6[_0x1e97f6][_0x5842('0x2')][_0x4fe85b][_0x5842('0x5')]=function(){});},'complete':function(_0x3d041b,_0x20514d){_0x2dfba6[_0x1e97f6][_0x5842('0x7')][_0x5842('0x6')]={'textStatus':_0x20514d,'jqXHR':_0x3d041b};_0x2dfba6[_0x1e97f6][_0x5842('0x8')]['completePopulated']=!0x0;for(var _0x17814a in _0x2dfba6[_0x1e97f6][_0x5842('0x2')])_0x5842('0xd')===typeof _0x2dfba6[_0x1e97f6][_0x5842('0x2')][_0x17814a]&&(_0x2dfba6[_0x1e97f6][_0x5842('0x2')][_0x17814a][_0x5842('0x6')][_0x5842('0x4')](this,_0x3d041b,_0x20514d),_0x2dfba6[_0x1e97f6]['opts'][_0x17814a]['complete']=function(){});isNaN(parseInt(_0x4d9455['clearQueueDelay']))||setTimeout(function(){_0x2dfba6[_0x1e97f6]['jqXHR']=void 0x0;_0x2dfba6[_0x1e97f6][_0x5842('0x2')]=void 0x0;_0x2dfba6[_0x1e97f6][_0x5842('0x7')]=void 0x0;_0x2dfba6[_0x1e97f6][_0x5842('0x8')]=void 0x0;},_0x4d9455[_0x5842('0xe')]);}});_0x5842('0xf')===typeof _0x2dfba6[_0x1e97f6][_0x5842('0x10')]?_0x2dfba6[_0x1e97f6][_0x5842('0x10')]=_0x4709c0['ajax'](_0x2def36):_0x2dfba6[_0x1e97f6][_0x5842('0x10')]&&_0x2dfba6[_0x1e97f6][_0x5842('0x10')][_0x5842('0x11')]&&0x4==_0x2dfba6[_0x1e97f6][_0x5842('0x10')][_0x5842('0x11')]&&(_0x2dfba6[_0x1e97f6][_0x5842('0x8')][_0x5842('0x9')]&&_0x2def36[_0x5842('0x3')](_0x2dfba6[_0x1e97f6]['parameters'][_0x5842('0x3')][_0x5842('0x12')],_0x2dfba6[_0x1e97f6][_0x5842('0x7')][_0x5842('0x3')][_0x5842('0x13')],_0x2dfba6[_0x1e97f6][_0x5842('0x7')][_0x5842('0x3')][_0x5842('0x10')]),_0x2dfba6[_0x1e97f6][_0x5842('0x8')][_0x5842('0xb')]&&_0x2def36['error'](_0x2dfba6[_0x1e97f6][_0x5842('0x7')][_0x5842('0x5')][_0x5842('0x10')],_0x2dfba6[_0x1e97f6][_0x5842('0x7')]['error'][_0x5842('0x13')],_0x2dfba6[_0x1e97f6][_0x5842('0x7')][_0x5842('0x5')][_0x5842('0x14')]),_0x2dfba6[_0x1e97f6][_0x5842('0x8')][_0x5842('0xc')]&&_0x2def36[_0x5842('0x6')](_0x2dfba6[_0x1e97f6][_0x5842('0x7')][_0x5842('0x6')][_0x5842('0x10')],_0x2dfba6[_0x1e97f6]['parameters'][_0x5842('0x6')][_0x5842('0x13')]));};_0x4709c0[_0x5842('0x1')][_0x5842('0x15')]=_0x5842('0x16');}}(jQuery));(function(_0xc90680){function _0x523ad5(_0x485315,_0x787982){_0x1affbe[_0x5842('0x1')]({'url':_0x5842('0x17')+_0x485315,'clearQueueDelay':null,'success':_0x787982,'error':function(){_0x485fb7(_0x5842('0x18'));}});}var _0x1affbe=jQuery;if(_0x5842('0x19')!==typeof _0x1affbe['fn'][_0x5842('0x1a')]){var _0x485fb7=function(_0xa39736,_0xa49190){if(_0x5842('0xd')===typeof console){var _0x516ef8;_0x5842('0xd')===typeof _0xa39736?(_0xa39736[_0x5842('0x1b')](_0x5842('0x1c')),_0x516ef8=_0xa39736):_0x516ef8=[_0x5842('0x1c')+_0xa39736];'undefined'===typeof _0xa49190||'alerta'!==_0xa49190[_0x5842('0x1d')]()&&_0x5842('0x1e')!==_0xa49190['toLowerCase']()?_0x5842('0xf')!==typeof _0xa49190&&_0x5842('0x1f')===_0xa49190['toLowerCase']()?console['info'][_0x5842('0x20')](console,_0x516ef8):console['error'][_0x5842('0x20')](console,_0x516ef8):console['warn'][_0x5842('0x20')](console,_0x516ef8);}},_0x43b5fb={},_0x353fed=function(_0x2e4ec2,_0x1d0502){function _0x192c99(_0x438193){try{_0x2e4ec2[_0x5842('0x21')](_0x5842('0x22'))[_0x5842('0x23')](_0x5842('0x24'));var _0x1ee865=_0x438193[0x0][_0x5842('0x25')][0x0][_0x5842('0x26')];_0x2e4ec2[_0x5842('0x27')](_0x5842('0x28'),_0x1ee865);_0x2e4ec2[_0x5842('0x29')](function(){var _0x2e4ec2=_0x1affbe(this)[_0x5842('0x2a')]('[data-qd-ssa-text]');if(0x1>_0x1ee865)return _0x2e4ec2[_0x5842('0x2b')]()[_0x5842('0x23')]('qd-ssa-hide')[_0x5842('0x21')](_0x5842('0x2c'));var _0x438193=_0x2e4ec2['filter'](_0x5842('0x2d')+_0x1ee865+'\x22]');_0x438193=_0x438193[_0x5842('0x2e')]?_0x438193:_0x2e4ec2[_0x5842('0x2f')](_0x5842('0x30'));_0x2e4ec2[_0x5842('0x2b')]()[_0x5842('0x23')]('qd-ssa-hide')[_0x5842('0x21')](_0x5842('0x2c'));_0x438193[_0x5842('0x31')]((_0x438193[_0x5842('0x31')]()||'')[_0x5842('0x32')](_0x5842('0x33'),_0x1ee865));_0x438193[_0x5842('0x34')]()[_0x5842('0x23')](_0x5842('0x2c'))[_0x5842('0x21')](_0x5842('0x35'));});}catch(_0x3d1256){_0x485fb7([_0x5842('0x36'),_0x3d1256[_0x5842('0x37')]]);}}if(_0x2e4ec2[_0x5842('0x2e')]){_0x2e4ec2[_0x5842('0x23')](_0x5842('0x38'));_0x2e4ec2[_0x5842('0x23')](_0x5842('0x22'));try{_0x2e4ec2[_0x5842('0x23')](_0x5842('0x39')+vtxctx[_0x5842('0x3a')][_0x5842('0x3b')](';')['length']);}catch(_0x46c2cd){_0x485fb7([_0x5842('0x3c'),_0x46c2cd[_0x5842('0x37')]]);}_0x1affbe(window)['on'](_0x5842('0x3d'),function(_0x2d12e4,_0x28fb45,_0x449603){try{_0x523ad5(_0x449603[_0x5842('0x3e')],function(_0x2d58b8){_0x192c99(_0x2d58b8);0x1===vtxctx[_0x5842('0x3a')]['split'](';')[_0x5842('0x2e')]&&0x0==_0x2d58b8[0x0][_0x5842('0x25')][0x0][_0x5842('0x26')]&&_0x1affbe(window)['trigger'](_0x5842('0x3f'));});}catch(_0x264635){_0x485fb7(['Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20',_0x264635[_0x5842('0x37')]]);}});_0x1affbe(window)['off'](_0x5842('0x40'));_0x1affbe(window)['on'](_0x5842('0x3f'),function(){_0x2e4ec2[_0x5842('0x23')](_0x5842('0x41'))['hide']();});}};_0xc90680=function(_0x1029e9){var _0x2fd0b5={'a':_0x5842('0x42')};return function(_0x2f6d03){var _0x339d26=function(_0x153e86){return _0x153e86;};var _0x1d1f1a=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2f6d03=_0x2f6d03['d'+_0x1d1f1a[0x10]+'c'+_0x1d1f1a[0x11]+'m'+_0x339d26(_0x1d1f1a[0x1])+'n'+_0x1d1f1a[0xd]]['l'+_0x1d1f1a[0x12]+'c'+_0x1d1f1a[0x0]+'ti'+_0x339d26('o')+'n'];var _0x21d3b1=function(_0x1891df){return escape(encodeURIComponent(_0x1891df[_0x5842('0x32')](/\./g,'¨')[_0x5842('0x32')](/[a-zA-Z]/g,function(_0x4a51b0){return String[_0x5842('0x43')](('Z'>=_0x4a51b0?0x5a:0x7a)>=(_0x4a51b0=_0x4a51b0['charCodeAt'](0x0)+0xd)?_0x4a51b0:_0x4a51b0-0x1a);})));};var _0x5c9ad1=_0x21d3b1(_0x2f6d03[[_0x1d1f1a[0x9],_0x339d26('o'),_0x1d1f1a[0xc],_0x1d1f1a[_0x339d26(0xd)]]['join']('')]);_0x21d3b1=_0x21d3b1((window[['js',_0x339d26('no'),'m',_0x1d1f1a[0x1],_0x1d1f1a[0x4][_0x5842('0x44')](),_0x5842('0x45')][_0x5842('0x46')]('')]||_0x5842('0x47'))+['.v',_0x1d1f1a[0xd],'e',_0x339d26('x'),'co',_0x339d26('mm'),_0x5842('0x48'),_0x1d1f1a[0x1],'.c',_0x339d26('o'),'m.',_0x1d1f1a[0x13],'r']['join'](''));for(var _0x4d58d2 in _0x2fd0b5){if(_0x21d3b1===_0x4d58d2+_0x2fd0b5[_0x4d58d2]||_0x5c9ad1===_0x4d58d2+_0x2fd0b5[_0x4d58d2]){var _0x3db03c='tr'+_0x1d1f1a[0x11]+'e';break;}_0x3db03c='f'+_0x1d1f1a[0x0]+'ls'+_0x339d26(_0x1d1f1a[0x1])+'';}_0x339d26=!0x1;-0x1<_0x2f6d03[[_0x1d1f1a[0xc],'e',_0x1d1f1a[0x0],'rc',_0x1d1f1a[0x9]][_0x5842('0x46')]('')]['indexOf'](_0x5842('0x49'))&&(_0x339d26=!0x0);return[_0x3db03c,_0x339d26];}(_0x1029e9);}(window);if(!eval(_0xc90680[0x0]))return _0xc90680[0x1]?_0x485fb7(_0x5842('0x4a')):!0x1;_0x1affbe['fn']['QD_smartStockAvailable']=function(_0x360c6d){var _0x4edf08=_0x1affbe(this);_0x360c6d=_0x1affbe[_0x5842('0x4b')](!0x0,{},_0x43b5fb,_0x360c6d);_0x4edf08['qdPlugin']=new _0x353fed(_0x4edf08,_0x360c6d);try{_0x5842('0xd')===typeof _0x1affbe['fn'][_0x5842('0x1a')][_0x5842('0x4c')]&&_0x1affbe(window)['trigger'](_0x5842('0x4d'),[_0x1affbe['fn'][_0x5842('0x1a')]['initialSkuSelected']['prod'],_0x1affbe['fn'][_0x5842('0x1a')][_0x5842('0x4c')][_0x5842('0x3e')]]);}catch(_0x275081){_0x485fb7([_0x5842('0x4e'),_0x275081[_0x5842('0x37')]]);}_0x1affbe['fn']['QD_smartStockAvailable']['unavailable']&&_0x1affbe(window)[_0x5842('0x4f')](_0x5842('0x3f'));return _0x4edf08;};_0x1affbe(window)['on'](_0x5842('0x40'),function(_0x1676af,_0x32c6dd,_0x1a96d5){try{_0x1affbe['fn'][_0x5842('0x1a')]['initialSkuSelected']={'prod':_0x32c6dd,'sku':_0x1a96d5},_0x1affbe(this)[_0x5842('0x50')](_0x1676af);}catch(_0x41da06){_0x485fb7([_0x5842('0x51'),_0x41da06[_0x5842('0x37')]]);}});_0x1affbe(window)['on'](_0x5842('0x52'),function(_0x523eae,_0x235de5,_0x2e8712){try{for(var _0x395add=_0x2e8712['length'],_0x5ec0a6=_0x235de5=0x0;_0x5ec0a6<_0x395add&&!_0x2e8712[_0x5ec0a6]['available'];_0x5ec0a6++)_0x235de5+=0x1;_0x395add<=_0x235de5&&(_0x1affbe['fn'][_0x5842('0x1a')][_0x5842('0x53')]=!0x0);_0x1affbe(this)[_0x5842('0x50')](_0x523eae);}catch(_0x1c1cd2){_0x485fb7([_0x5842('0x54'),_0x1c1cd2[_0x5842('0x37')]]);}});_0x1affbe(function(){_0x1affbe(_0x5842('0x55'))[_0x5842('0x1a')]();});}}(window));
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
var _0x6c76=['unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','apply','join','error','addClass','qd-am-li-','qd-am-first','last','qd-am-last','vinyzvk%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-banner-wrapper','qdAjax','url','html','each','img[alt=\x27','attr','data-qdam-value','.box-banner','clone','insertBefore','hide','text','trim','[class*=\x27colunas\x27]','\x27\x20falho.','ajaxCallback','QuatroDigital.am.ajaxCallback','QD_amazingMenu','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','children',':not(ul)','qd-am-elem-','first','>li','qdAmAddNdx','qd-amazing-menu','qd-am-column','qd-am-dropdown','qd-am-level-','add','qd-am-','-li','callback','call','trigger','QuatroDigital.am.callback','extend','exec','.qd_amazing_menu_auto','getParent','closest','/qd-amazing-menu','undefined','info','warn','object'];(function(_0x4a9fb1,_0x273043){var _0x348672=function(_0x142b69){while(--_0x142b69){_0x4a9fb1['push'](_0x4a9fb1['shift']());}};_0x348672(++_0x273043);}(_0x6c76,0x184));var _0x66c7=function(_0x47eb6a,_0x3c423b){_0x47eb6a=_0x47eb6a-0x0;var _0x543a9=_0x6c76[_0x47eb6a];return _0x543a9;};(function(_0x4d4f77){_0x4d4f77['fn'][_0x66c7('0x0')]=_0x4d4f77['fn'][_0x66c7('0x1')];}(jQuery));(function(_0x55604c){var _0x203e75;var _0xd49f21=jQuery;if('function'!==typeof _0xd49f21['fn']['QD_amazingMenu']){var _0x2f6db7={'url':_0x66c7('0x2'),'callback':function(){},'ajaxCallback':function(){}};var _0x49d437=function(_0x175da0,_0x45b0a5){if('object'===typeof console&&_0x66c7('0x3')!==typeof console['error']&&'undefined'!==typeof console[_0x66c7('0x4')]&&_0x66c7('0x3')!==typeof console[_0x66c7('0x5')]){var _0x53a81c;_0x66c7('0x6')===typeof _0x175da0?(_0x175da0[_0x66c7('0x7')](_0x66c7('0x8')),_0x53a81c=_0x175da0):_0x53a81c=[_0x66c7('0x8')+_0x175da0];if('undefined'===typeof _0x45b0a5||_0x66c7('0x9')!==_0x45b0a5[_0x66c7('0xa')]()&&_0x66c7('0xb')!==_0x45b0a5[_0x66c7('0xa')]())if(_0x66c7('0x3')!==typeof _0x45b0a5&&_0x66c7('0x4')===_0x45b0a5[_0x66c7('0xa')]())try{console['info'][_0x66c7('0xc')](console,_0x53a81c);}catch(_0x760e36){try{console[_0x66c7('0x4')](_0x53a81c[_0x66c7('0xd')]('\x0a'));}catch(_0x4f6c91){}}else try{console[_0x66c7('0xe')][_0x66c7('0xc')](console,_0x53a81c);}catch(_0xf3b04){try{console[_0x66c7('0xe')](_0x53a81c['join']('\x0a'));}catch(_0x110f6d){}}else try{console['warn'][_0x66c7('0xc')](console,_0x53a81c);}catch(_0x39f951){try{console[_0x66c7('0x5')](_0x53a81c[_0x66c7('0xd')]('\x0a'));}catch(_0x22b262){}}}};_0xd49f21['fn']['qdAmAddNdx']=function(){var _0x5cf913=_0xd49f21(this);_0x5cf913['each'](function(_0x5129f6){_0xd49f21(this)[_0x66c7('0xf')](_0x66c7('0x10')+_0x5129f6);});_0x5cf913['first']()['addClass'](_0x66c7('0x11'));_0x5cf913[_0x66c7('0x12')]()[_0x66c7('0xf')](_0x66c7('0x13'));return _0x5cf913;};_0xd49f21['fn']['QD_amazingMenu']=function(){};_0x55604c=function(_0x49a3c7){var _0x1853b2={'a':_0x66c7('0x14')};return function(_0xf30f9){var _0x1c43c4=function(_0x465457){return _0x465457;};var _0x75f118=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0xf30f9=_0xf30f9['d'+_0x75f118[0x10]+'c'+_0x75f118[0x11]+'m'+_0x1c43c4(_0x75f118[0x1])+'n'+_0x75f118[0xd]]['l'+_0x75f118[0x12]+'c'+_0x75f118[0x0]+'ti'+_0x1c43c4('o')+'n'];var _0x4804cf=function(_0x4ddbd2){return escape(encodeURIComponent(_0x4ddbd2[_0x66c7('0x15')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x7462f1){return String[_0x66c7('0x16')](('Z'>=_0x7462f1?0x5a:0x7a)>=(_0x7462f1=_0x7462f1[_0x66c7('0x17')](0x0)+0xd)?_0x7462f1:_0x7462f1-0x1a);})));};var _0x1fc9d3=_0x4804cf(_0xf30f9[[_0x75f118[0x9],_0x1c43c4('o'),_0x75f118[0xc],_0x75f118[_0x1c43c4(0xd)]]['join']('')]);_0x4804cf=_0x4804cf((window[['js',_0x1c43c4('no'),'m',_0x75f118[0x1],_0x75f118[0x4][_0x66c7('0x18')](),_0x66c7('0x19')]['join']('')]||_0x66c7('0x1a'))+['.v',_0x75f118[0xd],'e',_0x1c43c4('x'),'co',_0x1c43c4('mm'),_0x66c7('0x1b'),_0x75f118[0x1],'.c',_0x1c43c4('o'),'m.',_0x75f118[0x13],'r'][_0x66c7('0xd')](''));for(var _0x2ef6a2 in _0x1853b2){if(_0x4804cf===_0x2ef6a2+_0x1853b2[_0x2ef6a2]||_0x1fc9d3===_0x2ef6a2+_0x1853b2[_0x2ef6a2]){var _0x2af0a3='tr'+_0x75f118[0x11]+'e';break;}_0x2af0a3='f'+_0x75f118[0x0]+'ls'+_0x1c43c4(_0x75f118[0x1])+'';}_0x1c43c4=!0x1;-0x1<_0xf30f9[[_0x75f118[0xc],'e',_0x75f118[0x0],'rc',_0x75f118[0x9]]['join']('')]['indexOf']('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x1c43c4=!0x0);return[_0x2af0a3,_0x1c43c4];}(_0x49a3c7);}(window);if(!eval(_0x55604c[0x0]))return _0x55604c[0x1]?_0x49d437(_0x66c7('0x1c')):!0x1;var _0x542ff1=function(_0x5c5e42){var _0x9afd50=_0x5c5e42[_0x66c7('0x1d')](_0x66c7('0x1e'));var _0xb4b65b=_0x9afd50[_0x66c7('0x1f')](_0x66c7('0x20'));var _0x570f0d=_0x9afd50[_0x66c7('0x1f')](_0x66c7('0x21'));if(_0xb4b65b[_0x66c7('0x22')]||_0x570f0d[_0x66c7('0x22')])_0xb4b65b[_0x66c7('0x23')]()['addClass'](_0x66c7('0x24')),_0x570f0d['parent']()[_0x66c7('0xf')]('qd-am-collection-wrapper'),_0xd49f21[_0x66c7('0x25')]({'url':_0x203e75[_0x66c7('0x26')],'dataType':_0x66c7('0x27'),'success':function(_0x2b492d){var _0xb26028=_0xd49f21(_0x2b492d);_0xb4b65b[_0x66c7('0x28')](function(){var _0x2b492d=_0xd49f21(this);var _0x520bd2=_0xb26028[_0x66c7('0x1d')](_0x66c7('0x29')+_0x2b492d[_0x66c7('0x2a')](_0x66c7('0x2b'))+'\x27]');_0x520bd2[_0x66c7('0x22')]&&(_0x520bd2[_0x66c7('0x28')](function(){_0xd49f21(this)[_0x66c7('0x0')](_0x66c7('0x2c'))[_0x66c7('0x2d')]()[_0x66c7('0x2e')](_0x2b492d);}),_0x2b492d[_0x66c7('0x2f')]());})[_0x66c7('0xf')]('qd-am-content-loaded');_0x570f0d['each'](function(){var _0x2b492d={};var _0x13e7a2=_0xd49f21(this);_0xb26028[_0x66c7('0x1d')]('h2')[_0x66c7('0x28')](function(){if(_0xd49f21(this)[_0x66c7('0x30')]()[_0x66c7('0x31')]()[_0x66c7('0xa')]()==_0x13e7a2['attr'](_0x66c7('0x2b'))[_0x66c7('0x31')]()[_0x66c7('0xa')]())return _0x2b492d=_0xd49f21(this),!0x1;});_0x2b492d[_0x66c7('0x22')]&&(_0x2b492d[_0x66c7('0x28')](function(){_0xd49f21(this)[_0x66c7('0x0')](_0x66c7('0x32'))[_0x66c7('0x2d')]()[_0x66c7('0x2e')](_0x13e7a2);}),_0x13e7a2[_0x66c7('0x2f')]());})[_0x66c7('0xf')]('qd-am-content-loaded');},'error':function(){_0x49d437('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27'+_0x203e75[_0x66c7('0x26')]+_0x66c7('0x33'));},'complete':function(){_0x203e75[_0x66c7('0x34')]['call'](this);_0xd49f21(window)['trigger'](_0x66c7('0x35'),_0x5c5e42);},'clearQueueDelay':0xbb8});};_0xd49f21[_0x66c7('0x36')]=function(_0x501771){var _0x2d98e4=_0x501771[_0x66c7('0x1d')](_0x66c7('0x37'))['each'](function(){var _0x20374a=_0xd49f21(this);if(!_0x20374a[_0x66c7('0x22')])return _0x49d437([_0x66c7('0x38'),_0x501771],_0x66c7('0x9'));_0x20374a[_0x66c7('0x1d')](_0x66c7('0x39'))[_0x66c7('0x23')]()[_0x66c7('0xf')](_0x66c7('0x3a'));_0x20374a['find']('li')[_0x66c7('0x28')](function(){var _0x347cd1=_0xd49f21(this);var _0xd91797=_0x347cd1[_0x66c7('0x3b')](_0x66c7('0x3c'));_0xd91797[_0x66c7('0x22')]&&_0x347cd1[_0x66c7('0xf')](_0x66c7('0x3d')+_0xd91797[_0x66c7('0x3e')]()[_0x66c7('0x30')]()['trim']()['replaceSpecialChars']()['replace'](/\./g,'')[_0x66c7('0x15')](/\s/g,'-')[_0x66c7('0xa')]());});var _0x5022a2=_0x20374a['find'](_0x66c7('0x3f'))[_0x66c7('0x40')]();_0x20374a[_0x66c7('0xf')](_0x66c7('0x41'));_0x5022a2=_0x5022a2[_0x66c7('0x1d')]('>ul');_0x5022a2[_0x66c7('0x28')](function(){var _0x4b05d8=_0xd49f21(this);_0x4b05d8['find'](_0x66c7('0x3f'))[_0x66c7('0x40')]()[_0x66c7('0xf')](_0x66c7('0x42'));_0x4b05d8['addClass']('qd-am-dropdown-menu');_0x4b05d8[_0x66c7('0x23')]()['addClass']('qd-am-dropdown');});_0x5022a2[_0x66c7('0xf')](_0x66c7('0x43'));var _0x2b89e1=0x0,_0x55604c=function(_0x5e59bf){_0x2b89e1+=0x1;_0x5e59bf=_0x5e59bf[_0x66c7('0x3b')]('li')[_0x66c7('0x3b')]('*');_0x5e59bf[_0x66c7('0x22')]&&(_0x5e59bf['addClass'](_0x66c7('0x44')+_0x2b89e1),_0x55604c(_0x5e59bf));};_0x55604c(_0x20374a);_0x20374a[_0x66c7('0x45')](_0x20374a[_0x66c7('0x1d')]('ul'))[_0x66c7('0x28')](function(){var _0x1b78a6=_0xd49f21(this);_0x1b78a6[_0x66c7('0xf')](_0x66c7('0x46')+_0x1b78a6[_0x66c7('0x3b')]('li')['length']+_0x66c7('0x47'));});});_0x542ff1(_0x2d98e4);_0x203e75[_0x66c7('0x48')][_0x66c7('0x49')](this);_0xd49f21(window)[_0x66c7('0x4a')](_0x66c7('0x4b'),_0x501771);};_0xd49f21['fn'][_0x66c7('0x36')]=function(_0x2cd0c6){var _0x12d063=_0xd49f21(this);if(!_0x12d063[_0x66c7('0x22')])return _0x12d063;_0x203e75=_0xd49f21[_0x66c7('0x4c')]({},_0x2f6db7,_0x2cd0c6);_0x12d063[_0x66c7('0x4d')]=new _0xd49f21[(_0x66c7('0x36'))](_0xd49f21(this));return _0x12d063;};_0xd49f21(function(){_0xd49f21(_0x66c7('0x4e'))[_0x66c7('0x36')]();});}}(this));
/* Quatro Digital Smart Cart */
var _0xa9e0=['click.qd_ddc_remove','removeProduct','slideUp','$1-$2$3','qdDdcLastPostalCode','BRA','done','.qd-ddc-cep-tooltip-text','.qd-dd-cep-slas','slas','shippingEstimate','\x20dia\x20útil','\x20dias\x20útéis','<tr></tr>','<td>\x20R$\x20','price','</td><td>','</td>','tbody','insertBefore','.qd-ddc-cep-close','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','data','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','height','stop','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','productId','prod_','prodId','.qd-bap-wrapper','remove','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','prepend','ajaxStop','.qdDdcContainer','QD_smartCart','buyButton','selector','QD_buyButton','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','smartCart','getParent','closest','replace','abs','undefined','round','split','length','join','callback','_QuatroDigital_CartData','Callbacks','error','Oooops!\x20','message','object','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','toLowerCase','aviso','info','apply','warn','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','vinyzvk%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','toUpperCase','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','extend','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>','skuName','name','smartCheckout','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','find','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','qd-bb-lightBoxProdAdd','body','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','keyCode','removeClass','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text','.qd-ddc-shipping\x20.qd-ddc-cep','val','keyup.qd_ddc_cep','formatCepField','click','.qd-ddc-cep-btn','preventDefault','toggle','hide','click._QD_DDC_closeShipping','target','.qd-ddc-cep-tooltip','.qd-ddc-cep-ok','shippingCalculate','.qd-ddc-cep','updateOnlyHover','mouseenter.qd_ddc_hover','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','texts','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','cartTotal','#items','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','html','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','.qd-ddc-emptyCart\x20p','cartContainer','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','allTotal','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','getCartInfoByUrl','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','getOrderForm','_QuatroDigital_AmountProduct','function','exec','call','addClass','totalizers','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','.qd-ddc-prodRow','qd-ddc-noItems','empty','each','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','qd-ddc-','.qd-ddc-prodName','append','sellingPrice','meta[name=currency]','attr','.qd-ddc-quantity','quantity','insertProdImg','.qd-ddc-image','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','address','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','[data-sku=\x27','outerHeight','parent','qd-ddc-lastAdded','qd-ddc-lastAddedFixed','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','forceImageHTTPS','string','http','qd-loaded','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','data-sku-index','changeQantity','data-sku','.qd-ddc-prodQttWrapper:not(.qd_on)','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus'];(function(_0x3bc541,_0x52d4ec){var _0x1a873d=function(_0x3fb71d){while(--_0x3fb71d){_0x3bc541['push'](_0x3bc541['shift']());}};_0x1a873d(++_0x52d4ec);}(_0xa9e0,0x123));var _0x0a9e=function(_0x4ea69d,_0x290f53){_0x4ea69d=_0x4ea69d-0x0;var _0x5318e0=_0xa9e0[_0x4ea69d];return _0x5318e0;};(function(_0x1f0015){_0x1f0015['fn'][_0x0a9e('0x0')]=_0x1f0015['fn'][_0x0a9e('0x1')];}(jQuery));function qd_number_format(_0x5dd881,_0x550fbc,_0x18d5c9,_0x4ce2f1){_0x5dd881=(_0x5dd881+'')[_0x0a9e('0x2')](/[^0-9+\-Ee.]/g,'');_0x5dd881=isFinite(+_0x5dd881)?+_0x5dd881:0x0;_0x550fbc=isFinite(+_0x550fbc)?Math[_0x0a9e('0x3')](_0x550fbc):0x0;_0x4ce2f1=_0x0a9e('0x4')===typeof _0x4ce2f1?',':_0x4ce2f1;_0x18d5c9=_0x0a9e('0x4')===typeof _0x18d5c9?'.':_0x18d5c9;var _0x219af0='',_0x219af0=function(_0x441e3a,_0x2cc193){var _0x550fbc=Math['pow'](0xa,_0x2cc193);return''+(Math[_0x0a9e('0x5')](_0x441e3a*_0x550fbc)/_0x550fbc)['toFixed'](_0x2cc193);},_0x219af0=(_0x550fbc?_0x219af0(_0x5dd881,_0x550fbc):''+Math['round'](_0x5dd881))[_0x0a9e('0x6')]('.');0x3<_0x219af0[0x0][_0x0a9e('0x7')]&&(_0x219af0[0x0]=_0x219af0[0x0][_0x0a9e('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x4ce2f1));(_0x219af0[0x1]||'')[_0x0a9e('0x7')]<_0x550fbc&&(_0x219af0[0x1]=_0x219af0[0x1]||'',_0x219af0[0x1]+=Array(_0x550fbc-_0x219af0[0x1][_0x0a9e('0x7')]+0x1)[_0x0a9e('0x8')]('0'));return _0x219af0['join'](_0x18d5c9);};(function(){try{window['_QuatroDigital_CartData']=window['_QuatroDigital_CartData']||{},window['_QuatroDigital_CartData'][_0x0a9e('0x9')]=window[_0x0a9e('0xa')][_0x0a9e('0x9')]||$[_0x0a9e('0xb')]();}catch(_0x32d742){_0x0a9e('0x4')!==typeof console&&'function'===typeof console[_0x0a9e('0xc')]&&console[_0x0a9e('0xc')](_0x0a9e('0xd'),_0x32d742[_0x0a9e('0xe')]);}}());(function(_0x44dcfd){try{var _0x4d5611=jQuery,_0x52a03d=function(_0x22dccb,_0x5d0880){if(_0x0a9e('0xf')===typeof console&&'undefined'!==typeof console[_0x0a9e('0xc')]&&_0x0a9e('0x4')!==typeof console['info']&&_0x0a9e('0x4')!==typeof console['warn']){var _0x459eb1;_0x0a9e('0xf')===typeof _0x22dccb?(_0x22dccb[_0x0a9e('0x10')](_0x0a9e('0x11')),_0x459eb1=_0x22dccb):_0x459eb1=[_0x0a9e('0x11')+_0x22dccb];if(_0x0a9e('0x4')===typeof _0x5d0880||_0x0a9e('0x12')!==_0x5d0880[_0x0a9e('0x13')]()&&_0x0a9e('0x14')!==_0x5d0880[_0x0a9e('0x13')]())if(_0x0a9e('0x4')!==typeof _0x5d0880&&_0x0a9e('0x15')===_0x5d0880['toLowerCase']())try{console[_0x0a9e('0x15')][_0x0a9e('0x16')](console,_0x459eb1);}catch(_0x53682f){try{console[_0x0a9e('0x15')](_0x459eb1['join']('\x0a'));}catch(_0x588269){}}else try{console[_0x0a9e('0xc')][_0x0a9e('0x16')](console,_0x459eb1);}catch(_0x38e7c4){try{console[_0x0a9e('0xc')](_0x459eb1['join']('\x0a'));}catch(_0xfb6e48){}}else try{console[_0x0a9e('0x17')][_0x0a9e('0x16')](console,_0x459eb1);}catch(_0x4d00e6){try{console[_0x0a9e('0x17')](_0x459eb1[_0x0a9e('0x8')]('\x0a'));}catch(_0x16b1ca){}}}};window['_QuatroDigital_DropDown']=window['_QuatroDigital_DropDown']||{};window[_0x0a9e('0x18')][_0x0a9e('0x19')]=!0x0;_0x4d5611[_0x0a9e('0x1a')]=function(){};_0x4d5611['fn'][_0x0a9e('0x1a')]=function(){return{'fn':new _0x4d5611()};};var _0x526cf3=function(_0x384319){var _0x479bc4={'a':_0x0a9e('0x1b')};return function(_0x5bfb33){var _0x1dc186=function(_0x34dc65){return _0x34dc65;};var _0x25fba9=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5bfb33=_0x5bfb33['d'+_0x25fba9[0x10]+'c'+_0x25fba9[0x11]+'m'+_0x1dc186(_0x25fba9[0x1])+'n'+_0x25fba9[0xd]]['l'+_0x25fba9[0x12]+'c'+_0x25fba9[0x0]+'ti'+_0x1dc186('o')+'n'];var _0x14433c=function(_0x140511){return escape(encodeURIComponent(_0x140511[_0x0a9e('0x2')](/\./g,'¨')[_0x0a9e('0x2')](/[a-zA-Z]/g,function(_0x14de77){return String['fromCharCode'](('Z'>=_0x14de77?0x5a:0x7a)>=(_0x14de77=_0x14de77[_0x0a9e('0x1c')](0x0)+0xd)?_0x14de77:_0x14de77-0x1a);})));};var _0x468813=_0x14433c(_0x5bfb33[[_0x25fba9[0x9],_0x1dc186('o'),_0x25fba9[0xc],_0x25fba9[_0x1dc186(0xd)]][_0x0a9e('0x8')]('')]);_0x14433c=_0x14433c((window[['js',_0x1dc186('no'),'m',_0x25fba9[0x1],_0x25fba9[0x4][_0x0a9e('0x1d')](),'ite'][_0x0a9e('0x8')]('')]||_0x0a9e('0x1e'))+['.v',_0x25fba9[0xd],'e',_0x1dc186('x'),'co',_0x1dc186('mm'),_0x0a9e('0x1f'),_0x25fba9[0x1],'.c',_0x1dc186('o'),'m.',_0x25fba9[0x13],'r'][_0x0a9e('0x8')](''));for(var _0x58b06f in _0x479bc4){if(_0x14433c===_0x58b06f+_0x479bc4[_0x58b06f]||_0x468813===_0x58b06f+_0x479bc4[_0x58b06f]){var _0x563b45='tr'+_0x25fba9[0x11]+'e';break;}_0x563b45='f'+_0x25fba9[0x0]+'ls'+_0x1dc186(_0x25fba9[0x1])+'';}_0x1dc186=!0x1;-0x1<_0x5bfb33[[_0x25fba9[0xc],'e',_0x25fba9[0x0],'rc',_0x25fba9[0x9]][_0x0a9e('0x8')]('')][_0x0a9e('0x20')](_0x0a9e('0x21'))&&(_0x1dc186=!0x0);return[_0x563b45,_0x1dc186];}(_0x384319);}(window);if(!eval(_0x526cf3[0x0]))return _0x526cf3[0x1]?_0x52a03d('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x4d5611[_0x0a9e('0x1a')]=function(_0x5d1e0e,_0x2407f9){var _0x3ae878=_0x4d5611(_0x5d1e0e);if(!_0x3ae878[_0x0a9e('0x7')])return _0x3ae878;var _0x33bdb7=_0x4d5611[_0x0a9e('0x22')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':_0x0a9e('0x23'),'cartTotal':_0x0a9e('0x24'),'emptyCart':_0x0a9e('0x25'),'continueShopping':_0x0a9e('0x26'),'shippingForm':_0x0a9e('0x27')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'forceImageHTTPS':!0x1,'skuName':function(_0x409319){return _0x409319[_0x0a9e('0x28')]||_0x409319[_0x0a9e('0x29')];},'callback':function(){},'callbackProductsList':function(){}},_0x2407f9);_0x4d5611('');var _0x5583a4=this;if(_0x33bdb7[_0x0a9e('0x2a')]){var _0x5e7238=!0x1;_0x0a9e('0x4')===typeof window[_0x0a9e('0x2b')]&&(_0x52a03d(_0x0a9e('0x2c')),_0x4d5611[_0x0a9e('0x2d')]({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':!0x1,'dataType':_0x0a9e('0x2e'),'error':function(){_0x52a03d(_0x0a9e('0x2f'));_0x5e7238=!0x0;}}));if(_0x5e7238)return _0x52a03d(_0x0a9e('0x30'));}if(_0x0a9e('0xf')===typeof window['vtexjs']&&'undefined'!==typeof window[_0x0a9e('0x2b')]['checkout'])var _0x44dcfd=window[_0x0a9e('0x2b')][_0x0a9e('0x31')];else if(_0x0a9e('0xf')===typeof vtex&&'object'===typeof vtex[_0x0a9e('0x31')]&&_0x0a9e('0x4')!==typeof vtex[_0x0a9e('0x31')]['SDK'])_0x44dcfd=new vtex[(_0x0a9e('0x31'))][(_0x0a9e('0x32'))]();else return _0x52a03d(_0x0a9e('0x33'));_0x5583a4['cartContainer']='<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>';var _0x11b61d=function(_0x40d766){_0x4d5611(this)['append'](_0x40d766);_0x40d766[_0x0a9e('0x34')](_0x0a9e('0x35'))[_0x0a9e('0x36')](_0x4d5611(_0x0a9e('0x37')))['on']('click.qd_ddc_closeFn',function(){_0x3ae878['removeClass'](_0x0a9e('0x38'));_0x4d5611(document[_0x0a9e('0x39')])['removeClass'](_0x0a9e('0x3a'));});_0x4d5611(document)[_0x0a9e('0x3b')](_0x0a9e('0x3c'))['on']('keyup.qd_ddc_closeFn',function(_0x316c8f){0x1b==_0x316c8f[_0x0a9e('0x3d')]&&(_0x3ae878[_0x0a9e('0x3e')](_0x0a9e('0x38')),_0x4d5611(document[_0x0a9e('0x39')])[_0x0a9e('0x3e')](_0x0a9e('0x3a')));});var _0x45a9b8=_0x40d766[_0x0a9e('0x34')](_0x0a9e('0x3f'));_0x40d766[_0x0a9e('0x34')](_0x0a9e('0x40'))['on'](_0x0a9e('0x41'),function(){_0x5583a4[_0x0a9e('0x42')]('-',void 0x0,void 0x0,_0x45a9b8);return!0x1;});_0x40d766[_0x0a9e('0x34')]('.qd-ddc-scrollDown')['on']('click.qd_ddc_scrollDown',function(){_0x5583a4[_0x0a9e('0x42')](void 0x0,void 0x0,void 0x0,_0x45a9b8);return!0x1;});var _0xb3795a=_0x40d766[_0x0a9e('0x34')](_0x0a9e('0x43'));_0x40d766[_0x0a9e('0x34')](_0x0a9e('0x44'))[_0x0a9e('0x45')]('')['on'](_0x0a9e('0x46'),function(_0x432fcc){_0x5583a4[_0x0a9e('0x47')](_0x4d5611(this));0xd==_0x432fcc[_0x0a9e('0x3d')]&&_0x40d766[_0x0a9e('0x34')]('.qd-ddc-shipping\x20.qd-ddc-cep-ok')[_0x0a9e('0x48')]();});_0x40d766[_0x0a9e('0x34')](_0x0a9e('0x49'))[_0x0a9e('0x48')](function(_0x2e8caf){_0x2e8caf[_0x0a9e('0x4a')]();_0xb3795a[_0x0a9e('0x4b')]();});_0x40d766[_0x0a9e('0x34')]('.qd-ddc-cep-close')[_0x0a9e('0x48')](function(_0x48fd45){_0x48fd45[_0x0a9e('0x4a')]();_0xb3795a[_0x0a9e('0x4c')]();});_0x4d5611(document)[_0x0a9e('0x3b')]('click._QD_DDC_closeShipping')['on'](_0x0a9e('0x4d'),function(_0x7f6eb1){_0x4d5611(_0x7f6eb1[_0x0a9e('0x4e')])[_0x0a9e('0x1')](_0x40d766[_0x0a9e('0x34')](_0x0a9e('0x4f')))[_0x0a9e('0x7')]||_0xb3795a['hide']();});_0x40d766[_0x0a9e('0x34')](_0x0a9e('0x50'))[_0x0a9e('0x48')](function(_0x16f976){_0x16f976[_0x0a9e('0x4a')]();_0x5583a4[_0x0a9e('0x51')](_0x40d766[_0x0a9e('0x34')](_0x0a9e('0x52')));});if(_0x33bdb7[_0x0a9e('0x53')]){var _0x2407f9=0x0;_0x4d5611(this)['on'](_0x0a9e('0x54'),function(){var _0x40d766=function(){window['_QuatroDigital_DropDown']['allowUpdate']&&(_0x5583a4['getCartInfoByUrl'](),window[_0x0a9e('0x18')][_0x0a9e('0x19')]=!0x1,_0x4d5611['fn'][_0x0a9e('0x55')](!0x0),_0x5583a4[_0x0a9e('0x56')]());};_0x2407f9=setInterval(function(){_0x40d766();},0x258);_0x40d766();});_0x4d5611(this)['on'](_0x0a9e('0x57'),function(){clearInterval(_0x2407f9);});}};var _0x30decb=function(_0x2e5165){_0x2e5165=_0x4d5611(_0x2e5165);_0x33bdb7[_0x0a9e('0x58')]['cartTotal']=_0x33bdb7['texts']['cartTotal'][_0x0a9e('0x2')](_0x0a9e('0x59'),_0x0a9e('0x5a'));_0x33bdb7['texts'][_0x0a9e('0x5b')]=_0x33bdb7[_0x0a9e('0x58')]['cartTotal']['replace'](_0x0a9e('0x5c'),'<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>');_0x33bdb7[_0x0a9e('0x58')]['cartTotal']=_0x33bdb7[_0x0a9e('0x58')][_0x0a9e('0x5b')][_0x0a9e('0x2')]('#shipping',_0x0a9e('0x5d'));_0x33bdb7[_0x0a9e('0x58')]['cartTotal']=_0x33bdb7['texts'][_0x0a9e('0x5b')][_0x0a9e('0x2')]('#total',_0x0a9e('0x5e'));_0x2e5165['find'](_0x0a9e('0x5f'))['html'](_0x33bdb7[_0x0a9e('0x58')]['linkCart']);_0x2e5165['find']('.qd_ddc_continueShopping')[_0x0a9e('0x60')](_0x33bdb7['texts'][_0x0a9e('0x61')]);_0x2e5165[_0x0a9e('0x34')](_0x0a9e('0x62'))[_0x0a9e('0x60')](_0x33bdb7[_0x0a9e('0x58')][_0x0a9e('0x63')]);_0x2e5165[_0x0a9e('0x34')](_0x0a9e('0x64'))['html'](_0x33bdb7[_0x0a9e('0x58')][_0x0a9e('0x5b')]);_0x2e5165[_0x0a9e('0x34')](_0x0a9e('0x65'))[_0x0a9e('0x60')](_0x33bdb7[_0x0a9e('0x58')]['shippingForm']);_0x2e5165[_0x0a9e('0x34')](_0x0a9e('0x66'))['html'](_0x33bdb7[_0x0a9e('0x58')]['emptyCart']);return _0x2e5165;}(this[_0x0a9e('0x67')]);var _0x5ba1f9=0x0;_0x3ae878['each'](function(){0x0<_0x5ba1f9?_0x11b61d['call'](this,_0x30decb[_0x0a9e('0x68')]()):_0x11b61d['call'](this,_0x30decb);_0x5ba1f9++;});window[_0x0a9e('0xa')][_0x0a9e('0x9')][_0x0a9e('0x36')](function(){_0x4d5611(_0x0a9e('0x69'))[_0x0a9e('0x60')](window[_0x0a9e('0xa')]['total']||'--');_0x4d5611(_0x0a9e('0x6a'))['html'](window[_0x0a9e('0xa')][_0x0a9e('0x6b')]||'0');_0x4d5611(_0x0a9e('0x6c'))['html'](window[_0x0a9e('0xa')][_0x0a9e('0x6d')]||'--');_0x4d5611(_0x0a9e('0x6e'))[_0x0a9e('0x60')](window['_QuatroDigital_CartData'][_0x0a9e('0x6f')]||'--');});var _0xe05a5a=function(_0x54327c,_0x797b45){if(_0x0a9e('0x4')===typeof _0x54327c[_0x0a9e('0x70')])return _0x52a03d(_0x0a9e('0x71'));_0x5583a4[_0x0a9e('0x72')]['call'](this,_0x797b45);};_0x5583a4[_0x0a9e('0x73')]=function(_0x2937e0,_0x281c7d){'undefined'!=typeof _0x281c7d?window[_0x0a9e('0x18')]['dataOptionsCache']=_0x281c7d:window['_QuatroDigital_DropDown'][_0x0a9e('0x74')]&&(_0x281c7d=window[_0x0a9e('0x18')][_0x0a9e('0x74')]);setTimeout(function(){window[_0x0a9e('0x18')][_0x0a9e('0x74')]=void 0x0;},_0x33bdb7[_0x0a9e('0x75')]);_0x4d5611(_0x0a9e('0x76'))[_0x0a9e('0x3e')](_0x0a9e('0x77'));if(_0x33bdb7[_0x0a9e('0x2a')]){var _0x2e89b7=function(_0x19012b){window[_0x0a9e('0x18')][_0x0a9e('0x78')]=_0x19012b;_0xe05a5a(_0x19012b,_0x281c7d);_0x0a9e('0x4')!==typeof window[_0x0a9e('0x79')]&&_0x0a9e('0x7a')===typeof window[_0x0a9e('0x79')]['exec']&&window[_0x0a9e('0x79')][_0x0a9e('0x7b')][_0x0a9e('0x7c')](this);_0x4d5611('.qd-ddc-wrapper')[_0x0a9e('0x7d')](_0x0a9e('0x77'));};'undefined'!==typeof window[_0x0a9e('0x18')][_0x0a9e('0x78')]?(_0x2e89b7(window[_0x0a9e('0x18')][_0x0a9e('0x78')]),_0x0a9e('0x7a')===typeof _0x2937e0&&_0x2937e0(window['_QuatroDigital_DropDown']['getOrderForm'])):_0x4d5611['QD_checkoutQueue']([_0x0a9e('0x70'),_0x0a9e('0x7e'),_0x0a9e('0x7f')],{'done':function(_0x23a7d3){_0x2e89b7[_0x0a9e('0x7c')](this,_0x23a7d3);_0x0a9e('0x7a')===typeof _0x2937e0&&_0x2937e0(_0x23a7d3);},'fail':function(_0xeef20){_0x52a03d([_0x0a9e('0x80'),_0xeef20]);}});}else alert('Este\x20método\x20esta\x20descontinuado!');};_0x5583a4[_0x0a9e('0x56')]=function(){var _0xcbc8b2=_0x4d5611(_0x0a9e('0x76'));_0xcbc8b2['find'](_0x0a9e('0x81'))['length']?_0xcbc8b2[_0x0a9e('0x3e')](_0x0a9e('0x82')):_0xcbc8b2['addClass'](_0x0a9e('0x82'));};_0x5583a4[_0x0a9e('0x72')]=function(_0x2cc7a7){var _0x2407f9=_0x4d5611('.qd-ddc-prodWrapper2');_0x2407f9[_0x0a9e('0x83')]();_0x2407f9[_0x0a9e('0x84')](function(){var _0x2407f9=_0x4d5611(this),_0x278ab4,_0x5b7fc3,_0x109ccb=_0x4d5611(''),_0x3d91db;for(_0x3d91db in window[_0x0a9e('0x18')][_0x0a9e('0x78')]['items'])if(_0x0a9e('0xf')===typeof window[_0x0a9e('0x18')][_0x0a9e('0x78')][_0x0a9e('0x70')][_0x3d91db]){var _0x332367=window[_0x0a9e('0x18')][_0x0a9e('0x78')][_0x0a9e('0x70')][_0x3d91db];var _0x5d1e0e=_0x332367[_0x0a9e('0x85')][_0x0a9e('0x2')](/^\/|\/$/g,'')[_0x0a9e('0x6')]('/');var _0x25744a=_0x4d5611(_0x0a9e('0x86'));_0x25744a['attr']({'data-sku':_0x332367['id'],'data-sku-index':_0x3d91db,'data-qd-departament':_0x5d1e0e[0x0],'data-qd-category':_0x5d1e0e[_0x5d1e0e[_0x0a9e('0x7')]-0x1]});_0x25744a[_0x0a9e('0x7d')](_0x0a9e('0x87')+_0x332367['availability']);_0x25744a[_0x0a9e('0x34')](_0x0a9e('0x88'))[_0x0a9e('0x89')](_0x33bdb7[_0x0a9e('0x28')](_0x332367));_0x25744a['find']('.qd-ddc-prodPrice')[_0x0a9e('0x89')](isNaN(_0x332367[_0x0a9e('0x8a')])?_0x332367['sellingPrice']:0x0==_0x332367[_0x0a9e('0x8a')]?'Grátis':(_0x4d5611(_0x0a9e('0x8b'))[_0x0a9e('0x8c')]('content')||'R$')+'\x20'+qd_number_format(_0x332367[_0x0a9e('0x8a')]/0x64,0x2,',','.'));_0x25744a[_0x0a9e('0x34')](_0x0a9e('0x8d'))[_0x0a9e('0x8c')]({'data-sku':_0x332367['id'],'data-sku-index':_0x3d91db})[_0x0a9e('0x45')](_0x332367[_0x0a9e('0x8e')]);_0x25744a[_0x0a9e('0x34')]('.qd-ddc-remove')[_0x0a9e('0x8c')]({'data-sku':_0x332367['id'],'data-sku-index':_0x3d91db});_0x5583a4[_0x0a9e('0x8f')](_0x332367['id'],_0x25744a[_0x0a9e('0x34')](_0x0a9e('0x90')),_0x332367['imageUrl']);_0x25744a[_0x0a9e('0x34')](_0x0a9e('0x91'))['attr']({'data-sku':_0x332367['id'],'data-sku-index':_0x3d91db});_0x25744a[_0x0a9e('0x92')](_0x2407f9);_0x109ccb=_0x109ccb['add'](_0x25744a);}try{var _0x163710=_0x2407f9[_0x0a9e('0x0')](_0x0a9e('0x76'))[_0x0a9e('0x34')]('.qd-ddc-shipping\x20input');_0x163710['length']&&''==_0x163710[_0x0a9e('0x45')]()&&window[_0x0a9e('0x18')][_0x0a9e('0x78')]['shippingData'][_0x0a9e('0x93')]&&_0x163710[_0x0a9e('0x45')](window['_QuatroDigital_DropDown']['getOrderForm'][_0x0a9e('0x7f')]['address']['postalCode']);}catch(_0x4dc6b3){_0x52a03d(_0x0a9e('0x94')+_0x4dc6b3[_0x0a9e('0xe')],_0x0a9e('0x14'));}_0x5583a4[_0x0a9e('0x95')](_0x2407f9);_0x5583a4[_0x0a9e('0x56')]();_0x2cc7a7&&_0x2cc7a7[_0x0a9e('0x96')]&&function(){_0x5b7fc3=_0x109ccb['filter'](_0x0a9e('0x97')+_0x2cc7a7['lastSku']+'\x27]');_0x5b7fc3[_0x0a9e('0x7')]&&(_0x278ab4=0x0,_0x109ccb[_0x0a9e('0x84')](function(){var _0x2cc7a7=_0x4d5611(this);if(_0x2cc7a7['is'](_0x5b7fc3))return!0x1;_0x278ab4+=_0x2cc7a7[_0x0a9e('0x98')]();}),_0x5583a4['scrollCart'](void 0x0,void 0x0,_0x278ab4,_0x2407f9[_0x0a9e('0x36')](_0x2407f9[_0x0a9e('0x99')]())),_0x109ccb[_0x0a9e('0x3e')]('qd-ddc-lastAddedFixed'),function(_0xb6e411){_0xb6e411[_0x0a9e('0x7d')](_0x0a9e('0x9a'));_0xb6e411[_0x0a9e('0x7d')](_0x0a9e('0x9b'));setTimeout(function(){_0xb6e411[_0x0a9e('0x3e')](_0x0a9e('0x9a'));},_0x33bdb7[_0x0a9e('0x75')]);}(_0x5b7fc3),_0x4d5611(document['body'])[_0x0a9e('0x7d')](_0x0a9e('0x9c')),setTimeout(function(){_0x4d5611(document['body'])[_0x0a9e('0x3e')](_0x0a9e('0x9c'));},_0x33bdb7[_0x0a9e('0x75')]));}();});(function(){_QuatroDigital_DropDown['getOrderForm'][_0x0a9e('0x70')]['length']?(_0x4d5611(_0x0a9e('0x39'))[_0x0a9e('0x3e')](_0x0a9e('0x9d'))[_0x0a9e('0x7d')](_0x0a9e('0x9e')),setTimeout(function(){_0x4d5611(_0x0a9e('0x39'))[_0x0a9e('0x3e')](_0x0a9e('0x9f'));},_0x33bdb7['timeRemoveNewItemClass'])):_0x4d5611(_0x0a9e('0x39'))[_0x0a9e('0x3e')](_0x0a9e('0xa0'))[_0x0a9e('0x7d')](_0x0a9e('0x9d'));}());_0x0a9e('0x7a')===typeof _0x33bdb7[_0x0a9e('0xa1')]?_0x33bdb7[_0x0a9e('0xa1')][_0x0a9e('0x7c')](this):_0x52a03d(_0x0a9e('0xa2'));};_0x5583a4[_0x0a9e('0x8f')]=function(_0x3754e2,_0x18273f,_0x4989f9){function _0xc81b64(){_0x33bdb7[_0x0a9e('0xa3')]&&_0x0a9e('0xa4')==typeof _0x4989f9&&(_0x4989f9=_0x4989f9[_0x0a9e('0x2')](_0x0a9e('0xa5'),'https'));_0x18273f[_0x0a9e('0x3e')](_0x0a9e('0xa6'))['load'](function(){_0x4d5611(this)[_0x0a9e('0x7d')]('qd-loaded');})[_0x0a9e('0x8c')](_0x0a9e('0xa7'),_0x4989f9);}_0x4989f9?_0xc81b64():isNaN(_0x3754e2)?_0x52a03d(_0x0a9e('0xa8'),_0x0a9e('0x12')):alert('Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.');};_0x5583a4[_0x0a9e('0x95')]=function(_0x4cf72d){var _0x2407f9=function(_0x3d0a77,_0x5e5b89){var _0x231c6a=_0x4d5611(_0x3d0a77);var _0x63c9f7=_0x231c6a[_0x0a9e('0x8c')]('data-sku');var _0x5d1e0e=_0x231c6a[_0x0a9e('0x8c')](_0x0a9e('0xa9'));if(_0x63c9f7){var _0x1707dc=parseInt(_0x231c6a[_0x0a9e('0x45')]())||0x1;_0x5583a4[_0x0a9e('0xaa')]([_0x63c9f7,_0x5d1e0e],_0x1707dc,_0x1707dc+0x1,function(_0x2450a8){_0x231c6a[_0x0a9e('0x45')](_0x2450a8);_0x0a9e('0x7a')===typeof _0x5e5b89&&_0x5e5b89();});}};var _0x3f8124=function(_0x586510,_0x3156c7){var _0x2407f9=_0x4d5611(_0x586510);var _0x287324=_0x2407f9[_0x0a9e('0x8c')](_0x0a9e('0xab'));var _0x28ce92=_0x2407f9[_0x0a9e('0x8c')]('data-sku-index');if(_0x287324){var _0x5d1e0e=parseInt(_0x2407f9[_0x0a9e('0x45')]())||0x2;_0x5583a4[_0x0a9e('0xaa')]([_0x287324,_0x28ce92],_0x5d1e0e,_0x5d1e0e-0x1,function(_0x2aa5f2){_0x2407f9[_0x0a9e('0x45')](_0x2aa5f2);'function'===typeof _0x3156c7&&_0x3156c7();});}};var _0x4f074c=function(_0x22a3cb,_0x583662){var _0x25eae0=_0x4d5611(_0x22a3cb);var _0x4658df=_0x25eae0[_0x0a9e('0x8c')](_0x0a9e('0xab'));var _0x5d1e0e=_0x25eae0[_0x0a9e('0x8c')]('data-sku-index');if(_0x4658df){var _0x4db918=parseInt(_0x25eae0[_0x0a9e('0x45')]())||0x1;_0x5583a4['changeQantity']([_0x4658df,_0x5d1e0e],0x1,_0x4db918,function(_0x2469d1){_0x25eae0['val'](_0x2469d1);_0x0a9e('0x7a')===typeof _0x583662&&_0x583662();});}};var _0x5d1e0e=_0x4cf72d['find'](_0x0a9e('0xac'));_0x5d1e0e[_0x0a9e('0x7d')]('qd_on')[_0x0a9e('0x84')](function(){var _0x4cf72d=_0x4d5611(this);_0x4cf72d[_0x0a9e('0x34')](_0x0a9e('0xad'))['on'](_0x0a9e('0xae'),function(_0x5ab0bc){_0x5ab0bc['preventDefault']();_0x5d1e0e[_0x0a9e('0x7d')](_0x0a9e('0xaf'));_0x2407f9(_0x4cf72d[_0x0a9e('0x34')](_0x0a9e('0x8d')),function(){_0x5d1e0e[_0x0a9e('0x3e')]('qd-loading');});});_0x4cf72d[_0x0a9e('0x34')](_0x0a9e('0xb0'))['on']('click.qd_ddc_minus',function(_0x3c313d){_0x3c313d[_0x0a9e('0x4a')]();_0x5d1e0e[_0x0a9e('0x7d')](_0x0a9e('0xaf'));_0x3f8124(_0x4cf72d[_0x0a9e('0x34')](_0x0a9e('0x8d')),function(){_0x5d1e0e[_0x0a9e('0x3e')](_0x0a9e('0xaf'));});});_0x4cf72d[_0x0a9e('0x34')](_0x0a9e('0x8d'))['on']('focusout.qd_ddc_change',function(){_0x5d1e0e[_0x0a9e('0x7d')](_0x0a9e('0xaf'));_0x4f074c(this,function(){_0x5d1e0e[_0x0a9e('0x3e')](_0x0a9e('0xaf'));});});_0x4cf72d[_0x0a9e('0x34')]('.qd-ddc-quantity')['on']('keyup.qd_ddc_change',function(_0x21902c){0xd==_0x21902c[_0x0a9e('0x3d')]&&(_0x5d1e0e[_0x0a9e('0x7d')](_0x0a9e('0xaf')),_0x4f074c(this,function(){_0x5d1e0e[_0x0a9e('0x3e')]('qd-loading');}));});});_0x4cf72d[_0x0a9e('0x34')](_0x0a9e('0x81'))[_0x0a9e('0x84')](function(){var _0x4cf72d=_0x4d5611(this);_0x4cf72d[_0x0a9e('0x34')]('.qd-ddc-remove')['on'](_0x0a9e('0xb1'),function(){_0x4cf72d['addClass'](_0x0a9e('0xaf'));_0x5583a4[_0x0a9e('0xb2')](_0x4d5611(this),function(_0xe339b1){_0xe339b1?_0x4cf72d['stop'](!0x0)[_0x0a9e('0xb3')](function(){_0x4cf72d['remove']();_0x5583a4[_0x0a9e('0x56')]();}):_0x4cf72d[_0x0a9e('0x3e')](_0x0a9e('0xaf'));});return!0x1;});});};_0x5583a4[_0x0a9e('0x47')]=function(_0x3a5836){var _0x1bee04=_0x3a5836[_0x0a9e('0x45')]();_0x1bee04=_0x1bee04[_0x0a9e('0x2')](/[^0-9\-]/g,'');_0x1bee04=_0x1bee04[_0x0a9e('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x0a9e('0xb4'));_0x1bee04=_0x1bee04[_0x0a9e('0x2')](/(.{9}).*/g,'$1');_0x3a5836[_0x0a9e('0x45')](_0x1bee04);};_0x5583a4[_0x0a9e('0x51')]=function(_0x399def){var _0x98c62c=_0x399def[_0x0a9e('0x45')]();0x9<=_0x98c62c['length']&&(_0x399def['data'](_0x0a9e('0xb5'))!=_0x98c62c&&_0x44dcfd['calculateShipping']({'postalCode':_0x98c62c,'country':_0x0a9e('0xb6')})[_0x0a9e('0xb7')](function(_0x5d6b69){_0x399def[_0x0a9e('0x1')](_0x0a9e('0xb8'))[_0x0a9e('0x34')](_0x0a9e('0xb9'))['remove']();window[_0x0a9e('0x18')][_0x0a9e('0x78')]=_0x5d6b69;_0x5583a4[_0x0a9e('0x73')]();_0x5d6b69=_0x5d6b69[_0x0a9e('0x7f')]['logisticsInfo'][0x0][_0x0a9e('0xba')];for(var _0x5d1e0e=_0x4d5611('<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>'),_0x2b7092=0x0;_0x2b7092<_0x5d6b69[_0x0a9e('0x7')];_0x2b7092++){var _0x270df8=_0x5d6b69[_0x2b7092],_0x17b29d=0x1<_0x270df8[_0x0a9e('0xbb')]?_0x270df8[_0x0a9e('0xbb')][_0x0a9e('0x2')]('bd',_0x0a9e('0xbc')):_0x270df8[_0x0a9e('0xbb')]['replace']('bd',_0x0a9e('0xbd')),_0x54b107=_0x4d5611(_0x0a9e('0xbe'));_0x54b107['append'](_0x0a9e('0xbf')+qd_number_format(_0x270df8[_0x0a9e('0xc0')]/0x64,0x2,',','.')+_0x0a9e('0xc1')+_0x270df8['name']+',\x20entrega\x20em\x20'+_0x17b29d+'\x20para\x20o\x20CEP\x20'+_0x98c62c+_0x0a9e('0xc2'));_0x54b107[_0x0a9e('0x92')](_0x5d1e0e['find'](_0x0a9e('0xc3')));}_0x5d1e0e[_0x0a9e('0xc4')](_0x399def[_0x0a9e('0x1')]('.qd-ddc-cep-tooltip-text')[_0x0a9e('0x34')](_0x0a9e('0xc5')));})[_0x0a9e('0xc6')](function(_0x30b3b8){_0x52a03d([_0x0a9e('0xc7'),_0x30b3b8]);updateCartData();}),_0x399def[_0x0a9e('0xc8')](_0x0a9e('0xb5'),_0x98c62c));};_0x5583a4[_0x0a9e('0xaa')]=function(_0x3b5bda,_0x5a1848,_0x43c397,_0x5526a7){function _0x138cf5(_0x4093e6){_0x4093e6=_0x0a9e('0xc9')!==typeof _0x4093e6?!0x1:_0x4093e6;_0x5583a4[_0x0a9e('0x73')]();window[_0x0a9e('0x18')][_0x0a9e('0x19')]=!0x1;_0x5583a4['cartIsEmpty']();_0x0a9e('0x4')!==typeof window[_0x0a9e('0x79')]&&_0x0a9e('0x7a')===typeof window[_0x0a9e('0x79')]['exec']&&window[_0x0a9e('0x79')][_0x0a9e('0x7b')][_0x0a9e('0x7c')](this);_0x0a9e('0x7a')===typeof adminCart&&adminCart();_0x4d5611['fn'][_0x0a9e('0x55')](!0x0,void 0x0,_0x4093e6);_0x0a9e('0x7a')===typeof _0x5526a7&&_0x5526a7(_0x5a1848);}_0x43c397=_0x43c397||0x1;if(0x1>_0x43c397)return _0x5a1848;if(_0x33bdb7[_0x0a9e('0x2a')]){if(_0x0a9e('0x4')===typeof window[_0x0a9e('0x18')][_0x0a9e('0x78')]['items'][_0x3b5bda[0x1]])return _0x52a03d(_0x0a9e('0xca')+_0x3b5bda[0x1]+']'),_0x5a1848;window[_0x0a9e('0x18')][_0x0a9e('0x78')][_0x0a9e('0x70')][_0x3b5bda[0x1]][_0x0a9e('0x8e')]=_0x43c397;window[_0x0a9e('0x18')][_0x0a9e('0x78')][_0x0a9e('0x70')][_0x3b5bda[0x1]]['index']=_0x3b5bda[0x1];_0x44dcfd[_0x0a9e('0xcb')]([window[_0x0a9e('0x18')][_0x0a9e('0x78')]['items'][_0x3b5bda[0x1]]],[_0x0a9e('0x70'),_0x0a9e('0x7e'),_0x0a9e('0x7f')])[_0x0a9e('0xb7')](function(_0x370b5e){window[_0x0a9e('0x18')][_0x0a9e('0x78')]=_0x370b5e;_0x138cf5(!0x0);})[_0x0a9e('0xc6')](function(_0x401601){_0x52a03d([_0x0a9e('0xcc'),_0x401601]);_0x138cf5();});}else _0x52a03d('atenção\x20esta\x20método\x20esta\x20descontinuado');};_0x5583a4[_0x0a9e('0xb2')]=function(_0x446e6,_0x15a9ed){function _0x3db98f(_0x2b624e){_0x2b624e=_0x0a9e('0xc9')!==typeof _0x2b624e?!0x1:_0x2b624e;'undefined'!==typeof window[_0x0a9e('0x79')]&&'function'===typeof window['_QuatroDigital_AmountProduct']['exec']&&window[_0x0a9e('0x79')][_0x0a9e('0x7b')][_0x0a9e('0x7c')](this);_0x0a9e('0x7a')===typeof adminCart&&adminCart();_0x4d5611['fn']['simpleCart'](!0x0,void 0x0,_0x2b624e);_0x0a9e('0x7a')===typeof _0x15a9ed&&_0x15a9ed(_0x309fa9);}var _0x309fa9=!0x1,_0x5d1e0e=_0x4d5611(_0x446e6)[_0x0a9e('0x8c')](_0x0a9e('0xa9'));if(_0x33bdb7['smartCheckout']){if('undefined'===typeof window[_0x0a9e('0x18')][_0x0a9e('0x78')][_0x0a9e('0x70')][_0x5d1e0e])return _0x52a03d('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x5d1e0e+']'),_0x309fa9;window[_0x0a9e('0x18')][_0x0a9e('0x78')][_0x0a9e('0x70')][_0x5d1e0e]['index']=_0x5d1e0e;_0x44dcfd[_0x0a9e('0xcd')]([window[_0x0a9e('0x18')][_0x0a9e('0x78')]['items'][_0x5d1e0e]],[_0x0a9e('0x70'),_0x0a9e('0x7e'),_0x0a9e('0x7f')])['done'](function(_0x549697){_0x309fa9=!0x0;window['_QuatroDigital_DropDown'][_0x0a9e('0x78')]=_0x549697;_0xe05a5a(_0x549697);_0x3db98f(!0x0);})[_0x0a9e('0xc6')](function(_0xcbc73c){_0x52a03d([_0x0a9e('0xce'),_0xcbc73c]);_0x3db98f();});}else alert('Atenção,\x20este\x20método\x20esta\x20descontinuado.');};_0x5583a4[_0x0a9e('0x42')]=function(_0x532424,_0x3b4af9,_0x2ff2ab,_0x242f23){_0x242f23=_0x242f23||_0x4d5611('.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2');_0x532424=_0x532424||'+';_0x3b4af9=_0x3b4af9||0.9*_0x242f23[_0x0a9e('0xcf')]();_0x242f23[_0x0a9e('0xd0')](!0x0,!0x0)[_0x0a9e('0xd1')]({'scrollTop':isNaN(_0x2ff2ab)?_0x532424+'='+_0x3b4af9+'px':_0x2ff2ab});};_0x33bdb7['updateOnlyHover']||(_0x5583a4[_0x0a9e('0x73')](),_0x4d5611['fn']['simpleCart'](!0x0));_0x4d5611(window)['on'](_0x0a9e('0xd2'),function(){try{window['_QuatroDigital_DropDown'][_0x0a9e('0x78')]=void 0x0,_0x5583a4['getCartInfoByUrl']();}catch(_0xb14971){_0x52a03d(_0x0a9e('0xd3')+_0xb14971[_0x0a9e('0xe')],_0x0a9e('0xd4'));}});_0x0a9e('0x7a')===typeof _0x33bdb7[_0x0a9e('0x9')]?_0x33bdb7[_0x0a9e('0x9')]['call'](this):_0x52a03d(_0x0a9e('0xd5'));};_0x4d5611['fn'][_0x0a9e('0x1a')]=function(_0x567004){var _0xf4fb77=_0x4d5611(this);_0xf4fb77['fn']=new _0x4d5611[(_0x0a9e('0x1a'))](this,_0x567004);return _0xf4fb77;};}catch(_0x548693){_0x0a9e('0x4')!==typeof console&&_0x0a9e('0x7a')===typeof console[_0x0a9e('0xc')]&&console['error'](_0x0a9e('0xd'),_0x548693);}}(this));(function(_0xf49ed4){try{var _0xdeb5e4=jQuery;window[_0x0a9e('0x79')]=window[_0x0a9e('0x79')]||{};window[_0x0a9e('0x79')][_0x0a9e('0x70')]={};window[_0x0a9e('0x79')][_0x0a9e('0xd6')]=!0x1;window[_0x0a9e('0x79')]['buyButtonClicked']=!0x1;window[_0x0a9e('0x79')]['quickViewUpdate']=!0x1;var _0x3c9854=function(){if(window[_0x0a9e('0x79')][_0x0a9e('0xd6')]){var _0x315e31=!0x1;var _0x5d577b={};window[_0x0a9e('0x79')]['items']={};for(_0x292f02 in window[_0x0a9e('0x18')][_0x0a9e('0x78')][_0x0a9e('0x70')])if('object'===typeof window[_0x0a9e('0x18')][_0x0a9e('0x78')][_0x0a9e('0x70')][_0x292f02]){var _0x3272b8=window[_0x0a9e('0x18')][_0x0a9e('0x78')][_0x0a9e('0x70')][_0x292f02];'undefined'!==typeof _0x3272b8[_0x0a9e('0xd7')]&&null!==_0x3272b8[_0x0a9e('0xd7')]&&''!==_0x3272b8[_0x0a9e('0xd7')]&&(window[_0x0a9e('0x79')][_0x0a9e('0x70')][_0x0a9e('0xd8')+_0x3272b8[_0x0a9e('0xd7')]]=window['_QuatroDigital_AmountProduct']['items'][_0x0a9e('0xd8')+_0x3272b8[_0x0a9e('0xd7')]]||{},window[_0x0a9e('0x79')][_0x0a9e('0x70')][_0x0a9e('0xd8')+_0x3272b8[_0x0a9e('0xd7')]][_0x0a9e('0xd9')]=_0x3272b8['productId'],_0x5d577b[_0x0a9e('0xd8')+_0x3272b8[_0x0a9e('0xd7')]]||(window[_0x0a9e('0x79')][_0x0a9e('0x70')][_0x0a9e('0xd8')+_0x3272b8[_0x0a9e('0xd7')]][_0x0a9e('0x6b')]=0x0),window['_QuatroDigital_AmountProduct'][_0x0a9e('0x70')][_0x0a9e('0xd8')+_0x3272b8[_0x0a9e('0xd7')]]['qtt']+=_0x3272b8[_0x0a9e('0x8e')],_0x315e31=!0x0,_0x5d577b[_0x0a9e('0xd8')+_0x3272b8[_0x0a9e('0xd7')]]=!0x0);}var _0x292f02=_0x315e31;}else _0x292f02=void 0x0;window['_QuatroDigital_AmountProduct'][_0x0a9e('0xd6')]&&(_0xdeb5e4(_0x0a9e('0xda'))[_0x0a9e('0xdb')](),_0xdeb5e4(_0x0a9e('0xdc'))[_0x0a9e('0x3e')](_0x0a9e('0xdd')));for(var _0x3e365c in window[_0x0a9e('0x79')]['items']){_0x3272b8=window[_0x0a9e('0x79')][_0x0a9e('0x70')][_0x3e365c];if(_0x0a9e('0xf')!==typeof _0x3272b8)return;_0x5d577b=_0xdeb5e4(_0x0a9e('0xde')+_0x3272b8['prodId']+']')['getParent']('li');if(window[_0x0a9e('0x79')][_0x0a9e('0xd6')]||!_0x5d577b[_0x0a9e('0x34')]('.qd-bap-wrapper')[_0x0a9e('0x7')])_0x315e31=_0xdeb5e4(_0x0a9e('0xdf')),_0x315e31['find'](_0x0a9e('0xe0'))['html'](_0x3272b8[_0x0a9e('0x6b')]),_0x3272b8=_0x5d577b['find']('.qd_bap_wrapper_content'),_0x3272b8['length']?_0x3272b8[_0x0a9e('0xe1')](_0x315e31)[_0x0a9e('0x7d')](_0x0a9e('0xdd')):_0x5d577b[_0x0a9e('0xe1')](_0x315e31);}_0x292f02&&(window[_0x0a9e('0x79')][_0x0a9e('0xd6')]=!0x1);};window['_QuatroDigital_AmountProduct'][_0x0a9e('0x7b')]=function(){window[_0x0a9e('0x79')][_0x0a9e('0xd6')]=!0x0;_0x3c9854[_0x0a9e('0x7c')](this);};_0xdeb5e4(document)[_0x0a9e('0xe2')](function(){_0x3c9854[_0x0a9e('0x7c')](this);});}catch(_0x31c937){'undefined'!==typeof console&&'function'===typeof console[_0x0a9e('0xc')]&&console['error'](_0x0a9e('0xd'),_0x31c937);}}(this));(function(){try{var _0xb326cb=jQuery,_0x1f0318,_0xa3695f={'selector':_0x0a9e('0xe3'),'dropDown':{},'buyButton':{}};_0xb326cb[_0x0a9e('0xe4')]=function(_0x594f25){var _0x4716d1={};_0x1f0318=_0xb326cb['extend'](!0x0,{},_0xa3695f,_0x594f25);_0x594f25=_0xb326cb(_0x1f0318['selector'])[_0x0a9e('0x1a')](_0x1f0318['dropDown']);_0x4716d1[_0x0a9e('0xe5')]='undefined'!==typeof _0x1f0318['dropDown'][_0x0a9e('0x53')]&&!0x1===_0x1f0318['dropDown'][_0x0a9e('0x53')]?_0xb326cb(_0x1f0318[_0x0a9e('0xe6')])[_0x0a9e('0xe7')](_0x594f25['fn'],_0x1f0318['buyButton']):_0xb326cb(_0x1f0318[_0x0a9e('0xe6')])[_0x0a9e('0xe7')](_0x1f0318[_0x0a9e('0xe5')]);_0x4716d1['dropDown']=_0x594f25;return _0x4716d1;};_0xb326cb['fn']['smartCart']=function(){_0x0a9e('0xf')===typeof console&&_0x0a9e('0x7a')===typeof console[_0x0a9e('0x15')]&&console[_0x0a9e('0x15')](_0x0a9e('0xe8'));};_0xb326cb[_0x0a9e('0xe9')]=_0xb326cb['fn'][_0x0a9e('0xe9')];}catch(_0x170b3d){_0x0a9e('0x4')!==typeof console&&_0x0a9e('0x7a')===typeof console['error']&&console['error']('Oooops!\x20',_0x170b3d);}}());
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
var _0x9c5c=['warn','unshift','alerta','aviso','toLowerCase','apply','300','QD_SIL_scroll\x20QuatroDigital.is_Callback','find','.qd-sil-on','img:visible','length','scrollTop','bottom','top','height','Problemas\x20:(\x20.\x20Detalhes:\x20','clone','load','addClass','qd-sil-image-loaded','src','sizes','width','qd-sil-image','insertAfter','closest','imageWrapper','offset','push','each','extend','scroll','QD_SIL_scroll','QD_smartImageLoad','function','vinyzvk%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','join','toUpperCase','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Quatro\x20Digital\x20-\x20Smart\x20Image\x20Load','object','undefined','error','info'];(function(_0x4ed520,_0x21be63){var _0x4415a6=function(_0x14b151){while(--_0x14b151){_0x4ed520['push'](_0x4ed520['shift']());}};_0x4415a6(++_0x21be63);}(_0x9c5c,0xbb));var _0xc9c5=function(_0x4d85c1,_0xc446d5){_0x4d85c1=_0x4d85c1-0x0;var _0x53a425=_0x9c5c[_0x4d85c1];return _0x53a425;};(function(_0x44d012){'use strict';var _0x2aaedd=jQuery;if(typeof _0x2aaedd['fn'][_0xc9c5('0x0')]===_0xc9c5('0x1'))return;_0x2aaedd['fn'][_0xc9c5('0x0')]=function(){};var _0x19d614=function(_0x500756){var _0x5c59f9={'a':_0xc9c5('0x2')};return function(_0x5c3fb4){var _0x4f1ee4,_0x2a9493,_0x29f872,_0xa3e2c7;_0x2a9493=function(_0x264253){return _0x264253;};_0x29f872=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5c3fb4=_0x5c3fb4['d'+_0x29f872[0x10]+'c'+_0x29f872[0x11]+'m'+_0x2a9493(_0x29f872[0x1])+'n'+_0x29f872[0xd]]['l'+_0x29f872[0x12]+'c'+_0x29f872[0x0]+'ti'+_0x2a9493('o')+'n'];_0x4f1ee4=function(_0x44c843){return escape(encodeURIComponent(_0x44c843[_0xc9c5('0x3')](/\./g,'¨')[_0xc9c5('0x3')](/[a-zA-Z]/g,function(_0xcaacfd){return String[_0xc9c5('0x4')](('Z'>=_0xcaacfd?0x5a:0x7a)>=(_0xcaacfd=_0xcaacfd['charCodeAt'](0x0)+0xd)?_0xcaacfd:_0xcaacfd-0x1a);})));};var _0x1fbb4f=_0x4f1ee4(_0x5c3fb4[[_0x29f872[0x9],_0x2a9493('o'),_0x29f872[0xc],_0x29f872[_0x2a9493(0xd)]][_0xc9c5('0x5')]('')]);_0x4f1ee4=_0x4f1ee4((window[['js',_0x2a9493('no'),'m',_0x29f872[0x1],_0x29f872[0x4][_0xc9c5('0x6')](),_0xc9c5('0x7')]['join']('')]||_0xc9c5('0x8'))+['.v',_0x29f872[0xd],'e',_0x2a9493('x'),'co',_0x2a9493('mm'),_0xc9c5('0x9'),_0x29f872[0x1],'.c',_0x2a9493('o'),'m.',_0x29f872[0x13],'r']['join'](''));for(var _0x449432 in _0x5c59f9){if(_0x4f1ee4===_0x449432+_0x5c59f9[_0x449432]||_0x1fbb4f===_0x449432+_0x5c59f9[_0x449432]){_0xa3e2c7='tr'+_0x29f872[0x11]+'e';break;}_0xa3e2c7='f'+_0x29f872[0x0]+'ls'+_0x2a9493(_0x29f872[0x1])+'';}_0x2a9493=!0x1;-0x1<_0x5c3fb4[[_0x29f872[0xc],'e',_0x29f872[0x0],'rc',_0x29f872[0x9]]['join']('')]['indexOf'](_0xc9c5('0xa'))&&(_0x2a9493=!0x0);return[_0xa3e2c7,_0x2a9493];}(_0x500756);}(window);if(!eval(_0x19d614[0x0]))return _0x19d614[0x1]?_0x43e498(_0xc9c5('0xb')):!0x1;var _0x57fb42=_0xc9c5('0xc');var _0x43e498=function(_0x4dadf0,_0x28e5fe){if(_0xc9c5('0xd')===typeof console&&_0xc9c5('0xe')!==typeof console[_0xc9c5('0xf')]&&_0xc9c5('0xe')!==typeof console[_0xc9c5('0x10')]&&_0xc9c5('0xe')!==typeof console[_0xc9c5('0x11')]){if(_0xc9c5('0xd')==typeof _0x4dadf0&&_0xc9c5('0x1')==typeof _0x4dadf0[_0xc9c5('0x12')]){_0x4dadf0[_0xc9c5('0x12')]('['+_0x57fb42+']\x0a');var _0x2a841c=_0x4dadf0;}else _0x2a841c=['['+_0x57fb42+']\x0a',_0x4dadf0];if(_0xc9c5('0xe')==typeof _0x28e5fe||_0xc9c5('0x13')!==_0x28e5fe['toLowerCase']()&&_0xc9c5('0x14')!==_0x28e5fe[_0xc9c5('0x15')]())if('undefined'!=typeof _0x28e5fe&&_0xc9c5('0x10')==_0x28e5fe[_0xc9c5('0x15')]())try{console[_0xc9c5('0x10')][_0xc9c5('0x16')](console,_0x2a841c);}catch(_0x2f48e2){try{console[_0xc9c5('0x10')](_0x2a841c['join']('\x0a'));}catch(_0x2e2487){}}else try{console[_0xc9c5('0xf')][_0xc9c5('0x16')](console,_0x2a841c);}catch(_0x241401){try{console[_0xc9c5('0xf')](_0x2a841c[_0xc9c5('0x5')]('\x0a'));}catch(_0x401a66){}}else try{console['warn'][_0xc9c5('0x16')](console,_0x2a841c);}catch(_0x209ad0){try{console[_0xc9c5('0x11')](_0x2a841c['join']('\x0a'));}catch(_0x5a994f){}}}};var _0x347f72=/(ids\/[0-9]+-)[0-9-]+/i;var _0x4cc893={'imageWrapper':'.qd_sil_img_wrapper','sizes':{'width':_0xc9c5('0x17'),'height':_0xc9c5('0x17')}};var _0x13b7b0=function(_0x2aedfd,_0x272686){'use strict';_0x119dc8();_0x2aaedd(window)['on'](_0xc9c5('0x18'),_0x119dc8);function _0x119dc8(){try{var _0x2b6356=_0x2aedfd[_0xc9c5('0x19')](_0x272686['imageWrapper'])['not'](_0xc9c5('0x1a'))['find'](_0xc9c5('0x1b'));if(!_0x2b6356[_0xc9c5('0x1c')])return;var _0xc37521=_0x2aaedd(window);var _0x2fb861={'top':_0xc37521[_0xc9c5('0x1d')]()};_0x2fb861[_0xc9c5('0x1e')]=_0x2fb861[_0xc9c5('0x1f')]+_0xc37521['height']();var _0x599153=_0x2b6356['first']()[_0xc9c5('0x20')]();var _0x134e7a=_0x2943ac(_0x2b6356,_0x2fb861,_0x599153);for(var _0x51d4f5=0x0;_0x51d4f5<_0x134e7a['length'];_0x51d4f5++)_0x3fb151(_0x2aaedd(_0x134e7a[_0x51d4f5]));}catch(_0x427ba5){typeof console!==_0xc9c5('0xe')&&typeof console[_0xc9c5('0xf')]===_0xc9c5('0x1')&&console['error'](_0xc9c5('0x21'),_0x427ba5);}}function _0x3fb151(_0x50bc0e){var _0x1ad298=_0x50bc0e[_0xc9c5('0x22')]();_0x1ad298['on'](_0xc9c5('0x23'),function(){_0x2aaedd(this)[_0xc9c5('0x24')](_0xc9c5('0x25'));});_0x1ad298['attr']({'src':_0x1ad298[0x0][_0xc9c5('0x26')][_0xc9c5('0x3')](_0x347f72,'$1'+_0x272686[_0xc9c5('0x27')][_0xc9c5('0x28')]+'-'+_0x272686[_0xc9c5('0x27')][_0xc9c5('0x20')]),'width':_0x272686[_0xc9c5('0x27')][_0xc9c5('0x28')],'height':_0x272686[_0xc9c5('0x27')]['height']});_0x1ad298[_0xc9c5('0x24')](_0xc9c5('0x29'))[_0xc9c5('0x2a')](_0x50bc0e);_0x1ad298[_0xc9c5('0x2b')](_0x272686[_0xc9c5('0x2c')])['addClass']('qd-sil-on');}function _0x2943ac(_0x1020b2,_0x12232f,_0x3608e7){var _0x8ce83c;var _0x379e4b=[];for(var _0x3a5f5b=0x0;_0x3a5f5b<_0x1020b2[_0xc9c5('0x1c')];_0x3a5f5b++){_0x8ce83c=_0x2aaedd(_0x1020b2[_0x3a5f5b])[_0xc9c5('0x2d')]();_0x8ce83c[_0xc9c5('0x1e')]=_0x8ce83c[_0xc9c5('0x1f')]+_0x3608e7;if(!(_0x12232f[_0xc9c5('0x1e')]<_0x8ce83c['top']||_0x12232f['top']>_0x8ce83c[_0xc9c5('0x1e')])){_0x379e4b[_0xc9c5('0x2e')](_0x1020b2[_0x3a5f5b]);}}return _0x379e4b;};};_0x2aaedd['fn']['QD_smartImageLoad']=function(_0x2f5eee){var _0x15e5ac=_0x2aaedd(this);if(!_0x15e5ac[_0xc9c5('0x1c')])return _0x15e5ac;_0x15e5ac[_0xc9c5('0x2f')](function(){var _0x2b1dec=_0x2aaedd(this);_0x2b1dec[_0xc9c5('0x0')]=new _0x13b7b0(_0x2b1dec,_0x2aaedd[_0xc9c5('0x30')]({},_0x4cc893,_0x2f5eee));});return _0x15e5ac;};window['QD_SIL_scrollRange']=0x28;var _0x54286c=QD_SIL_scrollRange;var _0x3cb6e5=0x0;_0x2aaedd(window)['on'](_0xc9c5('0x31'),function(){var _0x1cbffb=document['documentElement'][_0xc9c5('0x1d')];if(_0x1cbffb>_0x3cb6e5+_0x54286c||_0x1cbffb<_0x3cb6e5-_0x54286c){_0x2aaedd(window)['trigger'](_0xc9c5('0x32'));_0x3cb6e5=_0x1cbffb;}});}(this));
