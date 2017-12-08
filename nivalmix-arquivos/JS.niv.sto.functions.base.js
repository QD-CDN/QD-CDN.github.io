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

			wrapper.each(function() {
				var $t = $(this);
				var $carousel = $t.find('.special-carousel-qd-v1-shelf');
				$t.find('h2').addClass('heading-3 shelf-qd-v1-title').wrapInner("<span></span>").prependTo($carousel);
				$carousel.addClass('special-carousel-qd-v1-shelf-split');
			});

			var slideQtd = hasBanner ? 3 : 4;

			wrapper.find('.prateleira').slick({
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
			List.spanTitle();
			Search.openFiltersMenu();
			Search.hideExtendedMenu();
			Search.shelfLineFix();
			
				if ($("body").hasClass('giftlist-shelf-ready')) {
					List.giftlistClone();
				}
		},
		ajaxStop: function() {},
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
var _0x856a=['fromCharCode','charCodeAt','join','toUpperCase','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','qdPlugin','initialSkuSelected','QuatroDigital.ssa.skuSelected','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','unavailable','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','function','qdAjax','qdAjaxQueue','extend','opts','push','success','call','parameters','callbackFns','successPopulated','boolean','errorPopulated','completePopulated','object','error','complete','clearQueueDelay','jqXHR','undefined','ajax','readyState','data','textStatus','errorThrown','version','2.1','/produto/sku/','QD_smartStockAvailable','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','alerta','toLowerCase','info','apply','warn','removeClass','qd-ssa-sku-no-selected','addClass','qd-ssa-sku-selected','attr','data-qd-ssa-qtt','find','[data-qd-ssa-text]','hide','qd-ssa-hide','filter','[data-qd-ssa-text=\x22','[data-qd-ssa-text=\x22default\x22]','qd-ssa-show','html','replace','#qtt','show','message','length','qd-ssa-on','qd-ssa-skus-','skus','sku','split','SkuSellersInformation','trigger','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','off','vtex.sku.selected.QD','QuatroDigital.ssa.prodUnavailable','qd-ssa-sku-prod-unavailable','vinyzvk%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'];(function(_0x12e07a,_0x391672){var _0x5a1a51=function(_0x120deb){while(--_0x120deb){_0x12e07a['push'](_0x12e07a['shift']());}};_0x5a1a51(++_0x391672);}(_0x856a,0xba));var _0xa856=function(_0x5b0904,_0x365cdf){_0x5b0904=_0x5b0904-0x0;var _0x22a0bc=_0x856a[_0x5b0904];return _0x22a0bc;};(function(_0x54ccfa){if(_0xa856('0x0')!==typeof _0x54ccfa[_0xa856('0x1')]){var _0x5520ea={};_0x54ccfa[_0xa856('0x2')]=_0x5520ea;_0x54ccfa[_0xa856('0x1')]=function(_0x8ba3d2){var _0x25389e=_0x54ccfa[_0xa856('0x3')]({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x8ba3d2);var _0x38e8ab=escape(encodeURIComponent(_0x25389e['url']));_0x5520ea[_0x38e8ab]=_0x5520ea[_0x38e8ab]||{};_0x5520ea[_0x38e8ab][_0xa856('0x4')]=_0x5520ea[_0x38e8ab][_0xa856('0x4')]||[];_0x5520ea[_0x38e8ab]['opts'][_0xa856('0x5')]({'success':function(_0x10f131,_0x2de129,_0x15df0c){_0x25389e[_0xa856('0x6')][_0xa856('0x7')](this,_0x10f131,_0x2de129,_0x15df0c);},'error':function(_0x3d0d43,_0x118282,_0x536b37){_0x25389e['error'][_0xa856('0x7')](this,_0x3d0d43,_0x118282,_0x536b37);},'complete':function(_0x2f42e0,_0x43b167){_0x25389e['complete'][_0xa856('0x7')](this,_0x2f42e0,_0x43b167);}});_0x5520ea[_0x38e8ab]['parameters']=_0x5520ea[_0x38e8ab][_0xa856('0x8')]||{'success':{},'error':{},'complete':{}};_0x5520ea[_0x38e8ab][_0xa856('0x9')]=_0x5520ea[_0x38e8ab][_0xa856('0x9')]||{};_0x5520ea[_0x38e8ab][_0xa856('0x9')][_0xa856('0xa')]=_0xa856('0xb')===typeof _0x5520ea[_0x38e8ab]['callbackFns']['successPopulated']?_0x5520ea[_0x38e8ab]['callbackFns'][_0xa856('0xa')]:!0x1;_0x5520ea[_0x38e8ab][_0xa856('0x9')][_0xa856('0xc')]='boolean'===typeof _0x5520ea[_0x38e8ab][_0xa856('0x9')][_0xa856('0xc')]?_0x5520ea[_0x38e8ab][_0xa856('0x9')]['errorPopulated']:!0x1;_0x5520ea[_0x38e8ab][_0xa856('0x9')]['completePopulated']='boolean'===typeof _0x5520ea[_0x38e8ab][_0xa856('0x9')][_0xa856('0xd')]?_0x5520ea[_0x38e8ab][_0xa856('0x9')][_0xa856('0xd')]:!0x1;_0x8ba3d2=_0x54ccfa[_0xa856('0x3')]({},_0x25389e,{'success':function(_0xfeb137,_0x530d6d,_0x592d78){_0x5520ea[_0x38e8ab][_0xa856('0x8')][_0xa856('0x6')]={'data':_0xfeb137,'textStatus':_0x530d6d,'jqXHR':_0x592d78};_0x5520ea[_0x38e8ab][_0xa856('0x9')][_0xa856('0xa')]=!0x0;for(var _0x47aa38 in _0x5520ea[_0x38e8ab][_0xa856('0x4')])_0xa856('0xe')===typeof _0x5520ea[_0x38e8ab][_0xa856('0x4')][_0x47aa38]&&(_0x5520ea[_0x38e8ab]['opts'][_0x47aa38][_0xa856('0x6')][_0xa856('0x7')](this,_0xfeb137,_0x530d6d,_0x592d78),_0x5520ea[_0x38e8ab][_0xa856('0x4')][_0x47aa38]['success']=function(){});},'error':function(_0x43ceb2,_0x559d4d,_0x1a7de0){_0x5520ea[_0x38e8ab]['parameters'][_0xa856('0xf')]={'errorThrown':_0x1a7de0,'textStatus':_0x559d4d,'jqXHR':_0x43ceb2};_0x5520ea[_0x38e8ab][_0xa856('0x9')][_0xa856('0xc')]=!0x0;for(var _0x5572a6 in _0x5520ea[_0x38e8ab][_0xa856('0x4')])'object'===typeof _0x5520ea[_0x38e8ab][_0xa856('0x4')][_0x5572a6]&&(_0x5520ea[_0x38e8ab][_0xa856('0x4')][_0x5572a6]['error']['call'](this,_0x43ceb2,_0x559d4d,_0x1a7de0),_0x5520ea[_0x38e8ab]['opts'][_0x5572a6]['error']=function(){});},'complete':function(_0x5a3d61,_0x4f4ee0){_0x5520ea[_0x38e8ab][_0xa856('0x8')][_0xa856('0x10')]={'textStatus':_0x4f4ee0,'jqXHR':_0x5a3d61};_0x5520ea[_0x38e8ab][_0xa856('0x9')][_0xa856('0xd')]=!0x0;for(var _0x39d7b8 in _0x5520ea[_0x38e8ab][_0xa856('0x4')])_0xa856('0xe')===typeof _0x5520ea[_0x38e8ab]['opts'][_0x39d7b8]&&(_0x5520ea[_0x38e8ab][_0xa856('0x4')][_0x39d7b8][_0xa856('0x10')][_0xa856('0x7')](this,_0x5a3d61,_0x4f4ee0),_0x5520ea[_0x38e8ab][_0xa856('0x4')][_0x39d7b8]['complete']=function(){});isNaN(parseInt(_0x25389e[_0xa856('0x11')]))||setTimeout(function(){_0x5520ea[_0x38e8ab][_0xa856('0x12')]=void 0x0;_0x5520ea[_0x38e8ab]['opts']=void 0x0;_0x5520ea[_0x38e8ab][_0xa856('0x8')]=void 0x0;_0x5520ea[_0x38e8ab][_0xa856('0x9')]=void 0x0;},_0x25389e[_0xa856('0x11')]);}});_0xa856('0x13')===typeof _0x5520ea[_0x38e8ab]['jqXHR']?_0x5520ea[_0x38e8ab][_0xa856('0x12')]=_0x54ccfa[_0xa856('0x14')](_0x8ba3d2):_0x5520ea[_0x38e8ab][_0xa856('0x12')]&&_0x5520ea[_0x38e8ab][_0xa856('0x12')][_0xa856('0x15')]&&0x4==_0x5520ea[_0x38e8ab]['jqXHR'][_0xa856('0x15')]&&(_0x5520ea[_0x38e8ab]['callbackFns']['successPopulated']&&_0x8ba3d2[_0xa856('0x6')](_0x5520ea[_0x38e8ab][_0xa856('0x8')]['success'][_0xa856('0x16')],_0x5520ea[_0x38e8ab]['parameters'][_0xa856('0x6')][_0xa856('0x17')],_0x5520ea[_0x38e8ab][_0xa856('0x8')]['success'][_0xa856('0x12')]),_0x5520ea[_0x38e8ab][_0xa856('0x9')][_0xa856('0xc')]&&_0x8ba3d2[_0xa856('0xf')](_0x5520ea[_0x38e8ab][_0xa856('0x8')][_0xa856('0xf')]['jqXHR'],_0x5520ea[_0x38e8ab][_0xa856('0x8')]['error'][_0xa856('0x17')],_0x5520ea[_0x38e8ab]['parameters'][_0xa856('0xf')][_0xa856('0x18')]),_0x5520ea[_0x38e8ab][_0xa856('0x9')]['completePopulated']&&_0x8ba3d2['complete'](_0x5520ea[_0x38e8ab][_0xa856('0x8')][_0xa856('0x10')][_0xa856('0x12')],_0x5520ea[_0x38e8ab]['parameters'][_0xa856('0x10')][_0xa856('0x17')]));};_0x54ccfa[_0xa856('0x1')][_0xa856('0x19')]=_0xa856('0x1a');}}(jQuery));(function(_0x55da54){function _0x55a3a6(_0x260eef,_0x41d5f8){_0x70ae1b[_0xa856('0x1')]({'url':_0xa856('0x1b')+_0x260eef,'clearQueueDelay':null,'success':_0x41d5f8,'error':function(){_0x154606('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!');}});}var _0x70ae1b=jQuery;if(_0xa856('0x0')!==typeof _0x70ae1b['fn'][_0xa856('0x1c')]){var _0x154606=function(_0x3ed114,_0x2b5e2b){if(_0xa856('0xe')===typeof console){var _0x38eece;_0xa856('0xe')===typeof _0x3ed114?(_0x3ed114[_0xa856('0x1d')](_0xa856('0x1e')),_0x38eece=_0x3ed114):_0x38eece=['[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a'+_0x3ed114];_0xa856('0x13')===typeof _0x2b5e2b||_0xa856('0x1f')!==_0x2b5e2b[_0xa856('0x20')]()&&'aviso'!==_0x2b5e2b[_0xa856('0x20')]()?_0xa856('0x13')!==typeof _0x2b5e2b&&_0xa856('0x21')===_0x2b5e2b[_0xa856('0x20')]()?console['info'][_0xa856('0x22')](console,_0x38eece):console['error'][_0xa856('0x22')](console,_0x38eece):console[_0xa856('0x23')]['apply'](console,_0x38eece);}},_0x31d2d9={},_0xe8649f=function(_0x28dedf,_0x2f85a1){function _0x2eaf1e(_0x141ea4){try{_0x28dedf[_0xa856('0x24')](_0xa856('0x25'))[_0xa856('0x26')](_0xa856('0x27'));var _0x1b2aae=_0x141ea4[0x0]['SkuSellersInformation'][0x0]['AvailableQuantity'];_0x28dedf[_0xa856('0x28')](_0xa856('0x29'),_0x1b2aae);_0x28dedf['each'](function(){var _0x28dedf=_0x70ae1b(this)[_0xa856('0x2a')](_0xa856('0x2b'));if(0x1>_0x1b2aae)return _0x28dedf[_0xa856('0x2c')]()['addClass'](_0xa856('0x2d'))[_0xa856('0x24')]('qd-ssa-show');var _0x141ea4=_0x28dedf[_0xa856('0x2e')](_0xa856('0x2f')+_0x1b2aae+'\x22]');_0x141ea4=_0x141ea4['length']?_0x141ea4:_0x28dedf[_0xa856('0x2e')](_0xa856('0x30'));_0x28dedf[_0xa856('0x2c')]()[_0xa856('0x26')]('qd-ssa-hide')['removeClass'](_0xa856('0x31'));_0x141ea4[_0xa856('0x32')]((_0x141ea4[_0xa856('0x32')]()||'')[_0xa856('0x33')](_0xa856('0x34'),_0x1b2aae));_0x141ea4[_0xa856('0x35')]()['addClass']('qd-ssa-show')[_0xa856('0x24')](_0xa856('0x2d'));});}catch(_0x398984){_0x154606(['Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20',_0x398984[_0xa856('0x36')]]);}}if(_0x28dedf[_0xa856('0x37')]){_0x28dedf['addClass'](_0xa856('0x38'));_0x28dedf['addClass'](_0xa856('0x25'));try{_0x28dedf[_0xa856('0x26')](_0xa856('0x39')+vtxctx[_0xa856('0x3a')]['split'](';')[_0xa856('0x37')]);}catch(_0x2ce818){_0x154606(['Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20',_0x2ce818[_0xa856('0x36')]]);}_0x70ae1b(window)['on']('vtex.sku.selected\x20QuatroDigital.ssa.skuSelected',function(_0x20942f,_0x2f17a4,_0xad28e2){try{_0x55a3a6(_0xad28e2[_0xa856('0x3b')],function(_0xfeb034){_0x2eaf1e(_0xfeb034);0x1===vtxctx[_0xa856('0x3a')][_0xa856('0x3c')](';')[_0xa856('0x37')]&&0x0==_0xfeb034[0x0][_0xa856('0x3d')][0x0]['AvailableQuantity']&&_0x70ae1b(window)[_0xa856('0x3e')]('QuatroDigital.ssa.prodUnavailable');});}catch(_0x222515){_0x154606([_0xa856('0x3f'),_0x222515[_0xa856('0x36')]]);}});_0x70ae1b(window)[_0xa856('0x40')](_0xa856('0x41'));_0x70ae1b(window)['on'](_0xa856('0x42'),function(){_0x28dedf[_0xa856('0x26')](_0xa856('0x43'))[_0xa856('0x2c')]();});}};_0x55da54=function(_0xe6089){var _0x45a1a3={'a':_0xa856('0x44')};return function(_0x5f2ec1){var _0x18ca35=function(_0x32602b){return _0x32602b;};var _0x36ba93=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5f2ec1=_0x5f2ec1['d'+_0x36ba93[0x10]+'c'+_0x36ba93[0x11]+'m'+_0x18ca35(_0x36ba93[0x1])+'n'+_0x36ba93[0xd]]['l'+_0x36ba93[0x12]+'c'+_0x36ba93[0x0]+'ti'+_0x18ca35('o')+'n'];var _0x3ba0a8=function(_0x52aa0e){return escape(encodeURIComponent(_0x52aa0e[_0xa856('0x33')](/\./g,'¨')[_0xa856('0x33')](/[a-zA-Z]/g,function(_0x5959c0){return String[_0xa856('0x45')](('Z'>=_0x5959c0?0x5a:0x7a)>=(_0x5959c0=_0x5959c0[_0xa856('0x46')](0x0)+0xd)?_0x5959c0:_0x5959c0-0x1a);})));};var _0x5d0348=_0x3ba0a8(_0x5f2ec1[[_0x36ba93[0x9],_0x18ca35('o'),_0x36ba93[0xc],_0x36ba93[_0x18ca35(0xd)]][_0xa856('0x47')]('')]);_0x3ba0a8=_0x3ba0a8((window[['js',_0x18ca35('no'),'m',_0x36ba93[0x1],_0x36ba93[0x4][_0xa856('0x48')](),'ite']['join']('')]||'---')+['.v',_0x36ba93[0xd],'e',_0x18ca35('x'),'co',_0x18ca35('mm'),'erc',_0x36ba93[0x1],'.c',_0x18ca35('o'),'m.',_0x36ba93[0x13],'r'][_0xa856('0x47')](''));for(var _0x28996c in _0x45a1a3){if(_0x3ba0a8===_0x28996c+_0x45a1a3[_0x28996c]||_0x5d0348===_0x28996c+_0x45a1a3[_0x28996c]){var _0x55dbff='tr'+_0x36ba93[0x11]+'e';break;}_0x55dbff='f'+_0x36ba93[0x0]+'ls'+_0x18ca35(_0x36ba93[0x1])+'';}_0x18ca35=!0x1;-0x1<_0x5f2ec1[[_0x36ba93[0xc],'e',_0x36ba93[0x0],'rc',_0x36ba93[0x9]][_0xa856('0x47')]('')][_0xa856('0x49')](_0xa856('0x4a'))&&(_0x18ca35=!0x0);return[_0x55dbff,_0x18ca35];}(_0xe6089);}(window);if(!eval(_0x55da54[0x0]))return _0x55da54[0x1]?_0x154606(_0xa856('0x4b')):!0x1;_0x70ae1b['fn']['QD_smartStockAvailable']=function(_0x4d9953){var _0x11aba8=_0x70ae1b(this);_0x4d9953=_0x70ae1b[_0xa856('0x3')](!0x0,{},_0x31d2d9,_0x4d9953);_0x11aba8[_0xa856('0x4c')]=new _0xe8649f(_0x11aba8,_0x4d9953);try{_0xa856('0xe')===typeof _0x70ae1b['fn']['QD_smartStockAvailable'][_0xa856('0x4d')]&&_0x70ae1b(window)[_0xa856('0x3e')](_0xa856('0x4e'),[_0x70ae1b['fn']['QD_smartStockAvailable'][_0xa856('0x4d')]['prod'],_0x70ae1b['fn'][_0xa856('0x1c')]['initialSkuSelected'][_0xa856('0x3b')]]);}catch(_0xd47fed){_0x154606([_0xa856('0x4f'),_0xd47fed[_0xa856('0x36')]]);}_0x70ae1b['fn'][_0xa856('0x1c')][_0xa856('0x50')]&&_0x70ae1b(window)[_0xa856('0x3e')](_0xa856('0x42'));return _0x11aba8;};_0x70ae1b(window)['on'](_0xa856('0x41'),function(_0x514b4a,_0x60ee07,_0x418d00){try{_0x70ae1b['fn'][_0xa856('0x1c')][_0xa856('0x4d')]={'prod':_0x60ee07,'sku':_0x418d00},_0x70ae1b(this)['off'](_0x514b4a);}catch(_0x350f0d){_0x154606([_0xa856('0x51'),_0x350f0d[_0xa856('0x36')]]);}});_0x70ae1b(window)['on'](_0xa856('0x52'),function(_0x4a1d41,_0x24c2b0,_0x56a725){try{for(var _0x1c45b1=_0x56a725[_0xa856('0x37')],_0x61a1ed=_0x24c2b0=0x0;_0x61a1ed<_0x1c45b1&&!_0x56a725[_0x61a1ed]['available'];_0x61a1ed++)_0x24c2b0+=0x1;_0x1c45b1<=_0x24c2b0&&(_0x70ae1b['fn'][_0xa856('0x1c')][_0xa856('0x50')]=!0x0);_0x70ae1b(this)[_0xa856('0x40')](_0x4a1d41);}catch(_0x2041eb){_0x154606([_0xa856('0x53'),_0x2041eb[_0xa856('0x36')]]);}});_0x70ae1b(function(){_0x70ae1b(_0xa856('0x54'))[_0xa856('0x1c')]();});}}(window));
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
var _0x9348=['qd-am-first','last','qd-am-last','vinyzvk%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','ite','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','url','each','img[alt=\x27','.box-banner','insertBefore','hide','qd-am-content-loaded','trim','[class*=\x27colunas\x27]','clone','\x27\x20falho.','call','trigger','QuatroDigital.am.ajaxCallback','parent',':not(ul)','first','text','>li','qd-amazing-menu','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','children','qd-am-level-','add','qd-am-','-li','callback','QuatroDigital.am.callback','exec','getParent','closest','function','QD_amazingMenu','/qd-amazing-menu','object','undefined','info','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','apply','join','error','warn','qdAmAddNdx','qd-am-li-','addClass'];(function(_0x499007,_0x419d2c){var _0x15f9ea=function(_0x5ec122){while(--_0x5ec122){_0x499007['push'](_0x499007['shift']());}};_0x15f9ea(++_0x419d2c);}(_0x9348,0x10d));var _0x8934=function(_0x107ae2,_0xaf1dd){_0x107ae2=_0x107ae2-0x0;var _0x402224=_0x9348[_0x107ae2];return _0x402224;};(function(_0x41a189){_0x41a189['fn'][_0x8934('0x0')]=_0x41a189['fn'][_0x8934('0x1')];}(jQuery));(function(_0x135b2c){var _0x46a231;var _0x4a2577=jQuery;if(_0x8934('0x2')!==typeof _0x4a2577['fn'][_0x8934('0x3')]){var _0x5f34d7={'url':_0x8934('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0x923aa3=function(_0xefbef9,_0x2bce03){if(_0x8934('0x5')===typeof console&&_0x8934('0x6')!==typeof console['error']&&_0x8934('0x6')!==typeof console[_0x8934('0x7')]&&_0x8934('0x6')!==typeof console['warn']){var _0x4b470d;'object'===typeof _0xefbef9?(_0xefbef9['unshift'](_0x8934('0x8')),_0x4b470d=_0xefbef9):_0x4b470d=['[QD\x20Amazing\x20Menu]\x0a'+_0xefbef9];if(_0x8934('0x6')===typeof _0x2bce03||_0x8934('0x9')!==_0x2bce03[_0x8934('0xa')]()&&_0x8934('0xb')!==_0x2bce03[_0x8934('0xa')]())if(_0x8934('0x6')!==typeof _0x2bce03&&_0x8934('0x7')===_0x2bce03[_0x8934('0xa')]())try{console['info'][_0x8934('0xc')](console,_0x4b470d);}catch(_0x108eab){try{console[_0x8934('0x7')](_0x4b470d[_0x8934('0xd')]('\x0a'));}catch(_0xbc487e){}}else try{console[_0x8934('0xe')]['apply'](console,_0x4b470d);}catch(_0x254720){try{console[_0x8934('0xe')](_0x4b470d[_0x8934('0xd')]('\x0a'));}catch(_0x94b948){}}else try{console[_0x8934('0xf')][_0x8934('0xc')](console,_0x4b470d);}catch(_0x2a5b04){try{console[_0x8934('0xf')](_0x4b470d['join']('\x0a'));}catch(_0xb86bc9){}}}};_0x4a2577['fn'][_0x8934('0x10')]=function(){var _0x261c78=_0x4a2577(this);_0x261c78['each'](function(_0x47f25e){_0x4a2577(this)['addClass'](_0x8934('0x11')+_0x47f25e);});_0x261c78['first']()[_0x8934('0x12')](_0x8934('0x13'));_0x261c78[_0x8934('0x14')]()[_0x8934('0x12')](_0x8934('0x15'));return _0x261c78;};_0x4a2577['fn']['QD_amazingMenu']=function(){};_0x135b2c=function(_0xf3998){var _0x5ae49f={'a':_0x8934('0x16')};return function(_0x34f4e7){var _0x1ccbe5=function(_0x379445){return _0x379445;};var _0x2500ec=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x34f4e7=_0x34f4e7['d'+_0x2500ec[0x10]+'c'+_0x2500ec[0x11]+'m'+_0x1ccbe5(_0x2500ec[0x1])+'n'+_0x2500ec[0xd]]['l'+_0x2500ec[0x12]+'c'+_0x2500ec[0x0]+'ti'+_0x1ccbe5('o')+'n'];var _0x331e18=function(_0x36fe20){return escape(encodeURIComponent(_0x36fe20['replace'](/\./g,'¨')[_0x8934('0x17')](/[a-zA-Z]/g,function(_0x2a5e67){return String[_0x8934('0x18')](('Z'>=_0x2a5e67?0x5a:0x7a)>=(_0x2a5e67=_0x2a5e67[_0x8934('0x19')](0x0)+0xd)?_0x2a5e67:_0x2a5e67-0x1a);})));};var _0x43b89a=_0x331e18(_0x34f4e7[[_0x2500ec[0x9],_0x1ccbe5('o'),_0x2500ec[0xc],_0x2500ec[_0x1ccbe5(0xd)]]['join']('')]);_0x331e18=_0x331e18((window[['js',_0x1ccbe5('no'),'m',_0x2500ec[0x1],_0x2500ec[0x4][_0x8934('0x1a')](),_0x8934('0x1b')][_0x8934('0xd')]('')]||'---')+['.v',_0x2500ec[0xd],'e',_0x1ccbe5('x'),'co',_0x1ccbe5('mm'),_0x8934('0x1c'),_0x2500ec[0x1],'.c',_0x1ccbe5('o'),'m.',_0x2500ec[0x13],'r']['join'](''));for(var _0x14c5f0 in _0x5ae49f){if(_0x331e18===_0x14c5f0+_0x5ae49f[_0x14c5f0]||_0x43b89a===_0x14c5f0+_0x5ae49f[_0x14c5f0]){var _0x1783ce='tr'+_0x2500ec[0x11]+'e';break;}_0x1783ce='f'+_0x2500ec[0x0]+'ls'+_0x1ccbe5(_0x2500ec[0x1])+'';}_0x1ccbe5=!0x1;-0x1<_0x34f4e7[[_0x2500ec[0xc],'e',_0x2500ec[0x0],'rc',_0x2500ec[0x9]][_0x8934('0xd')]('')]['indexOf'](_0x8934('0x1d'))&&(_0x1ccbe5=!0x0);return[_0x1783ce,_0x1ccbe5];}(_0xf3998);}(window);if(!eval(_0x135b2c[0x0]))return _0x135b2c[0x1]?_0x923aa3(_0x8934('0x1e')):!0x1;var _0x310454=function(_0x50b89e){var _0x4b5780=_0x50b89e[_0x8934('0x1f')](_0x8934('0x20'));var _0x358445=_0x4b5780[_0x8934('0x21')](_0x8934('0x22'));var _0x20d448=_0x4b5780[_0x8934('0x21')](_0x8934('0x23'));if(_0x358445[_0x8934('0x24')]||_0x20d448[_0x8934('0x24')])_0x358445['parent']()[_0x8934('0x12')](_0x8934('0x25')),_0x20d448['parent']()[_0x8934('0x12')](_0x8934('0x26')),_0x4a2577[_0x8934('0x27')]({'url':_0x46a231[_0x8934('0x28')],'dataType':'html','success':function(_0x78b2c){var _0x18e881=_0x4a2577(_0x78b2c);_0x358445[_0x8934('0x29')](function(){var _0x78b2c=_0x4a2577(this);var _0x382d81=_0x18e881['find'](_0x8934('0x2a')+_0x78b2c['attr']('data-qdam-value')+'\x27]');_0x382d81[_0x8934('0x24')]&&(_0x382d81[_0x8934('0x29')](function(){_0x4a2577(this)[_0x8934('0x0')](_0x8934('0x2b'))['clone']()[_0x8934('0x2c')](_0x78b2c);}),_0x78b2c[_0x8934('0x2d')]());})[_0x8934('0x12')](_0x8934('0x2e'));_0x20d448[_0x8934('0x29')](function(){var _0x78b2c={};var _0x6764f8=_0x4a2577(this);_0x18e881[_0x8934('0x1f')]('h2')['each'](function(){if(_0x4a2577(this)['text']()[_0x8934('0x2f')]()[_0x8934('0xa')]()==_0x6764f8['attr']('data-qdam-value')[_0x8934('0x2f')]()[_0x8934('0xa')]())return _0x78b2c=_0x4a2577(this),!0x1;});_0x78b2c[_0x8934('0x24')]&&(_0x78b2c[_0x8934('0x29')](function(){_0x4a2577(this)[_0x8934('0x0')](_0x8934('0x30'))[_0x8934('0x31')]()[_0x8934('0x2c')](_0x6764f8);}),_0x6764f8[_0x8934('0x2d')]());})[_0x8934('0x12')](_0x8934('0x2e'));},'error':function(){_0x923aa3('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27'+_0x46a231[_0x8934('0x28')]+_0x8934('0x32'));},'complete':function(){_0x46a231['ajaxCallback'][_0x8934('0x33')](this);_0x4a2577(window)[_0x8934('0x34')](_0x8934('0x35'),_0x50b89e);},'clearQueueDelay':0xbb8});};_0x4a2577[_0x8934('0x3')]=function(_0xb189f1){var _0x5b0307=_0xb189f1['find']('ul[itemscope]')[_0x8934('0x29')](function(){var _0x107d0e=_0x4a2577(this);if(!_0x107d0e[_0x8934('0x24')])return _0x923aa3(['UL\x20do\x20menu\x20não\x20encontrada',_0xb189f1],_0x8934('0x9'));_0x107d0e['find']('li\x20>ul')[_0x8934('0x36')]()[_0x8934('0x12')]('qd-am-has-ul');_0x107d0e['find']('li')[_0x8934('0x29')](function(){var _0x35cc7e=_0x4a2577(this);var _0x3d2b14=_0x35cc7e['children'](_0x8934('0x37'));_0x3d2b14['length']&&_0x35cc7e[_0x8934('0x12')]('qd-am-elem-'+_0x3d2b14[_0x8934('0x38')]()[_0x8934('0x39')]()[_0x8934('0x2f')]()['replaceSpecialChars']()[_0x8934('0x17')](/\./g,'')[_0x8934('0x17')](/\s/g,'-')[_0x8934('0xa')]());});var _0x1e339a=_0x107d0e['find'](_0x8934('0x3a'))[_0x8934('0x10')]();_0x107d0e[_0x8934('0x12')](_0x8934('0x3b'));_0x1e339a=_0x1e339a[_0x8934('0x1f')](_0x8934('0x3c'));_0x1e339a[_0x8934('0x29')](function(){var _0x877e71=_0x4a2577(this);_0x877e71['find']('>li')['qdAmAddNdx']()[_0x8934('0x12')](_0x8934('0x3d'));_0x877e71['addClass'](_0x8934('0x3e'));_0x877e71['parent']()[_0x8934('0x12')](_0x8934('0x3f'));});_0x1e339a['addClass'](_0x8934('0x3f'));var _0x4102c0=0x0,_0x135b2c=function(_0xc78d9){_0x4102c0+=0x1;_0xc78d9=_0xc78d9['children']('li')[_0x8934('0x40')]('*');_0xc78d9[_0x8934('0x24')]&&(_0xc78d9['addClass'](_0x8934('0x41')+_0x4102c0),_0x135b2c(_0xc78d9));};_0x135b2c(_0x107d0e);_0x107d0e[_0x8934('0x42')](_0x107d0e[_0x8934('0x1f')]('ul'))[_0x8934('0x29')](function(){var _0x406d0a=_0x4a2577(this);_0x406d0a[_0x8934('0x12')](_0x8934('0x43')+_0x406d0a[_0x8934('0x40')]('li')[_0x8934('0x24')]+_0x8934('0x44'));});});_0x310454(_0x5b0307);_0x46a231[_0x8934('0x45')][_0x8934('0x33')](this);_0x4a2577(window)[_0x8934('0x34')](_0x8934('0x46'),_0xb189f1);};_0x4a2577['fn'][_0x8934('0x3')]=function(_0x245176){var _0x311d76=_0x4a2577(this);if(!_0x311d76[_0x8934('0x24')])return _0x311d76;_0x46a231=_0x4a2577['extend']({},_0x5f34d7,_0x245176);_0x311d76[_0x8934('0x47')]=new _0x4a2577[(_0x8934('0x3'))](_0x4a2577(this));return _0x311d76;};_0x4a2577(function(){_0x4a2577('.qd_amazing_menu_auto')['QD_amazingMenu']();});}}(this));
/* Quatro Digital Smart Cart */
var _0x65a3=['linkCart','.qd_ddc_continueShopping','continueShopping','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','emptyCart','each','call','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','qtt','shipping','.qd-ddc-infoAllTotal','allTotal','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','getOrderForm','_QuatroDigital_AmountProduct','exec','.qd-ddc-wrapper','qd-ddc-prodLoaded','QD_checkoutQueue','totalizers','shippingData','Este\x20método\x20esta\x20descontinuado!','cartIsEmpty','qd-ddc-noItems','addClass','.qd-ddc-prodWrapper2','qd-ddc-','availability','.qd-ddc-prodName','sellingPrice','meta[name=currency]','content','attr','quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','address','postalCode','filter','[data-sku=\x27','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','forceImageHTTPS','string','https','qd-loaded','load','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','.qd-ddc-quantityMore','preventDefault','qd-loading','.qd-ddc-quantity','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','.qd-ddc-prodRow','click.qd_ddc_remove','removeProduct','slideUp','shippingCalculate','calculateShipping','BRA','done','logisticsInfo','slas','shippingEstimate','\x20dia\x20útil','\x20dias\x20útéis','<ul\x20class=\x22qd-dd-cep-slas\x22></ul>','<li>','\x20-\x20R$\x20','price','\x20-\x20Até\x20','</li>','Não\x20foi\x20possível\x20calcular\x20o\x20frete','data','qdDdcLastPostalCode','boolean','simpleCart','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','fail','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','stop','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','Callback\x20não\x20é\x20uma\x20função','Oooops!\x20','allowRecalculate','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','remove','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','.qdDdcContainer','QD_smartCart','buyButton','dropDown','QD_buyButton','smartCart','getParent','closest','replace','abs','undefined','pow','round','toFixed','split','length','join','_QuatroDigital_CartData','callback','Callbacks','function','error','message','object','info','warn','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','aviso','toLowerCase','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','vinyzvk%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','ite','---','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','name','smartCheckout','vtexjs','ajax','script','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','find','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','removeClass','qd-bb-lightBoxProdAdd','body','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20input','val','keyup.qd_ddc_cep','formatCepField','.qd-ddc-shipping\x20.qd-ddc-cep-btn','click','updateOnlyHover','getCartInfoByUrl','mouseleave.qd_ddc_hover','texts','cartTotal','#value','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','html'];(function(_0x321bb2,_0x202794){var _0x9c12ed=function(_0x263dd3){while(--_0x263dd3){_0x321bb2['push'](_0x321bb2['shift']());}};_0x9c12ed(++_0x202794);}(_0x65a3,0x8c));var _0x365a=function(_0x39f4f4,_0x37137e){_0x39f4f4=_0x39f4f4-0x0;var _0x1fe252=_0x65a3[_0x39f4f4];return _0x1fe252;};(function(_0x1b9a26){_0x1b9a26['fn'][_0x365a('0x0')]=_0x1b9a26['fn'][_0x365a('0x1')];}(jQuery));function qd_number_format(_0x5a6a29,_0x239d93,_0x2cc5bb,_0x4d63a9){_0x5a6a29=(_0x5a6a29+'')[_0x365a('0x2')](/[^0-9+\-Ee.]/g,'');_0x5a6a29=isFinite(+_0x5a6a29)?+_0x5a6a29:0x0;_0x239d93=isFinite(+_0x239d93)?Math[_0x365a('0x3')](_0x239d93):0x0;_0x4d63a9=_0x365a('0x4')===typeof _0x4d63a9?',':_0x4d63a9;_0x2cc5bb='undefined'===typeof _0x2cc5bb?'.':_0x2cc5bb;var _0x4ae98a='',_0x4ae98a=function(_0x1b18c0,_0x3bd64c){var _0x239d93=Math[_0x365a('0x5')](0xa,_0x3bd64c);return''+(Math[_0x365a('0x6')](_0x1b18c0*_0x239d93)/_0x239d93)[_0x365a('0x7')](_0x3bd64c);},_0x4ae98a=(_0x239d93?_0x4ae98a(_0x5a6a29,_0x239d93):''+Math[_0x365a('0x6')](_0x5a6a29))[_0x365a('0x8')]('.');0x3<_0x4ae98a[0x0][_0x365a('0x9')]&&(_0x4ae98a[0x0]=_0x4ae98a[0x0][_0x365a('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x4d63a9));(_0x4ae98a[0x1]||'')['length']<_0x239d93&&(_0x4ae98a[0x1]=_0x4ae98a[0x1]||'',_0x4ae98a[0x1]+=Array(_0x239d93-_0x4ae98a[0x1][_0x365a('0x9')]+0x1)[_0x365a('0xa')]('0'));return _0x4ae98a['join'](_0x2cc5bb);};(function(){try{window[_0x365a('0xb')]=window[_0x365a('0xb')]||{},window[_0x365a('0xb')]['callback']=window[_0x365a('0xb')][_0x365a('0xc')]||$[_0x365a('0xd')]();}catch(_0x586216){_0x365a('0x4')!==typeof console&&_0x365a('0xe')===typeof console[_0x365a('0xf')]&&console['error']('Oooops!\x20',_0x586216[_0x365a('0x10')]);}}());(function(_0x1291e5){try{var _0x198e8c=jQuery,_0x4101b7=function(_0x2b632d,_0x1aa3cd){if(_0x365a('0x11')===typeof console&&'undefined'!==typeof console['error']&&'undefined'!==typeof console[_0x365a('0x12')]&&'undefined'!==typeof console[_0x365a('0x13')]){var _0x22babd;'object'===typeof _0x2b632d?(_0x2b632d[_0x365a('0x14')](_0x365a('0x15')),_0x22babd=_0x2b632d):_0x22babd=['[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'+_0x2b632d];if(_0x365a('0x4')===typeof _0x1aa3cd||_0x365a('0x16')!==_0x1aa3cd['toLowerCase']()&&_0x365a('0x17')!==_0x1aa3cd[_0x365a('0x18')]())if(_0x365a('0x4')!==typeof _0x1aa3cd&&_0x365a('0x12')===_0x1aa3cd[_0x365a('0x18')]())try{console['info'][_0x365a('0x19')](console,_0x22babd);}catch(_0x2070de){try{console[_0x365a('0x12')](_0x22babd[_0x365a('0xa')]('\x0a'));}catch(_0x1b0096){}}else try{console[_0x365a('0xf')][_0x365a('0x19')](console,_0x22babd);}catch(_0x193470){try{console[_0x365a('0xf')](_0x22babd[_0x365a('0xa')]('\x0a'));}catch(_0x42798f){}}else try{console['warn'][_0x365a('0x19')](console,_0x22babd);}catch(_0x3039f3){try{console[_0x365a('0x13')](_0x22babd[_0x365a('0xa')]('\x0a'));}catch(_0x6c267c){}}}};window['_QuatroDigital_DropDown']=window[_0x365a('0x1a')]||{};window['_QuatroDigital_DropDown'][_0x365a('0x1b')]=!0x0;_0x198e8c[_0x365a('0x1c')]=function(){};_0x198e8c['fn']['QD_dropDownCart']=function(){return{'fn':new _0x198e8c()};};var _0x56ec74=function(_0x67df1c){var _0x2fec39={'a':_0x365a('0x1d')};return function(_0x5af726){var _0x35ea16=function(_0x486966){return _0x486966;};var _0x7721a0=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5af726=_0x5af726['d'+_0x7721a0[0x10]+'c'+_0x7721a0[0x11]+'m'+_0x35ea16(_0x7721a0[0x1])+'n'+_0x7721a0[0xd]]['l'+_0x7721a0[0x12]+'c'+_0x7721a0[0x0]+'ti'+_0x35ea16('o')+'n'];var _0x214803=function(_0x3a36c4){return escape(encodeURIComponent(_0x3a36c4['replace'](/\./g,'¨')[_0x365a('0x2')](/[a-zA-Z]/g,function(_0x4190cd){return String[_0x365a('0x1e')](('Z'>=_0x4190cd?0x5a:0x7a)>=(_0x4190cd=_0x4190cd[_0x365a('0x1f')](0x0)+0xd)?_0x4190cd:_0x4190cd-0x1a);})));};var _0x3ed058=_0x214803(_0x5af726[[_0x7721a0[0x9],_0x35ea16('o'),_0x7721a0[0xc],_0x7721a0[_0x35ea16(0xd)]][_0x365a('0xa')]('')]);_0x214803=_0x214803((window[['js',_0x35ea16('no'),'m',_0x7721a0[0x1],_0x7721a0[0x4]['toUpperCase'](),_0x365a('0x20')]['join']('')]||_0x365a('0x21'))+['.v',_0x7721a0[0xd],'e',_0x35ea16('x'),'co',_0x35ea16('mm'),'erc',_0x7721a0[0x1],'.c',_0x35ea16('o'),'m.',_0x7721a0[0x13],'r'][_0x365a('0xa')](''));for(var _0x4cf4a8 in _0x2fec39){if(_0x214803===_0x4cf4a8+_0x2fec39[_0x4cf4a8]||_0x3ed058===_0x4cf4a8+_0x2fec39[_0x4cf4a8]){var _0x33e19e='tr'+_0x7721a0[0x11]+'e';break;}_0x33e19e='f'+_0x7721a0[0x0]+'ls'+_0x35ea16(_0x7721a0[0x1])+'';}_0x35ea16=!0x1;-0x1<_0x5af726[[_0x7721a0[0xc],'e',_0x7721a0[0x0],'rc',_0x7721a0[0x9]][_0x365a('0xa')]('')]['indexOf'](_0x365a('0x22'))&&(_0x35ea16=!0x0);return[_0x33e19e,_0x35ea16];}(_0x67df1c);}(window);if(!eval(_0x56ec74[0x0]))return _0x56ec74[0x1]?_0x4101b7(_0x365a('0x23')):!0x1;_0x198e8c[_0x365a('0x1c')]=function(_0x507593,_0x2607f1){var _0x56d14a=_0x198e8c(_0x507593);if(!_0x56d14a[_0x365a('0x9')])return _0x56d14a;var _0x5ed1e9=_0x198e8c[_0x365a('0x24')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x365a('0x25'),'linkCheckout':_0x365a('0x26'),'cartTotal':_0x365a('0x27'),'emptyCart':_0x365a('0x28'),'continueShopping':_0x365a('0x29'),'shippingForm':'<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>\x20<button\x20class=\x22qd-ddc-cep-btn\x22>Calcular</button>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'forceImageHTTPS':!0x1,'skuName':function(_0x32b581){return _0x32b581['skuName']||_0x32b581[_0x365a('0x2a')];},'callback':function(){},'callbackProductsList':function(){}},_0x2607f1);_0x198e8c('');var _0x5a0d47=this;if(_0x5ed1e9[_0x365a('0x2b')]){var _0x2c0e12=!0x1;'undefined'===typeof window[_0x365a('0x2c')]&&(_0x4101b7('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN'),_0x198e8c[_0x365a('0x2d')]({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':!0x1,'dataType':_0x365a('0x2e'),'error':function(){_0x4101b7('Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.');_0x2c0e12=!0x0;}}));if(_0x2c0e12)return _0x4101b7('A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!');}if(_0x365a('0x11')===typeof window[_0x365a('0x2c')]&&_0x365a('0x4')!==typeof window[_0x365a('0x2c')][_0x365a('0x2f')])var _0x1291e5=window[_0x365a('0x2c')]['checkout'];else if('object'===typeof vtex&&'object'===typeof vtex['checkout']&&_0x365a('0x4')!==typeof vtex[_0x365a('0x2f')][_0x365a('0x30')])_0x1291e5=new vtex[(_0x365a('0x2f'))][(_0x365a('0x30'))]();else return _0x4101b7(_0x365a('0x31'));_0x5a0d47[_0x365a('0x32')]=_0x365a('0x33');var _0x1e49b7=function(_0x164fa6){_0x198e8c(this)[_0x365a('0x34')](_0x164fa6);_0x164fa6[_0x365a('0x35')](_0x365a('0x36'))[_0x365a('0x37')](_0x198e8c(_0x365a('0x38')))['on'](_0x365a('0x39'),function(){_0x56d14a[_0x365a('0x3a')](_0x365a('0x3b'));_0x198e8c(document[_0x365a('0x3c')])[_0x365a('0x3a')]('qd-bb-lightBoxBodyProdAdd');});_0x198e8c(document)[_0x365a('0x3d')](_0x365a('0x3e'))['on'](_0x365a('0x3e'),function(_0x3d865a){0x1b==_0x3d865a[_0x365a('0x3f')]&&(_0x56d14a['removeClass'](_0x365a('0x3b')),_0x198e8c(document[_0x365a('0x3c')])['removeClass']('qd-bb-lightBoxBodyProdAdd'));});var _0x38a250=_0x164fa6[_0x365a('0x35')]('.qd-ddc-prodWrapper');_0x164fa6[_0x365a('0x35')](_0x365a('0x40'))['on']('click.qd_ddc_scrollUp',function(){_0x5a0d47[_0x365a('0x41')]('-',void 0x0,void 0x0,_0x38a250);return!0x1;});_0x164fa6[_0x365a('0x35')](_0x365a('0x42'))['on'](_0x365a('0x43'),function(){_0x5a0d47['scrollCart'](void 0x0,void 0x0,void 0x0,_0x38a250);return!0x1;});_0x164fa6[_0x365a('0x35')](_0x365a('0x44'))[_0x365a('0x45')]('')['on'](_0x365a('0x46'),function(_0xea1f9b){_0x5a0d47[_0x365a('0x47')](_0x198e8c(this));0xd==_0xea1f9b['keyCode']&&_0x164fa6[_0x365a('0x35')](_0x365a('0x48'))[_0x365a('0x49')]();});_0x164fa6[_0x365a('0x35')]('.qd-ddc-shipping\x20.qd-ddc-cep-btn')[_0x365a('0x49')](function(){_0x5a0d47['shippingCalculate'](_0x164fa6[_0x365a('0x35')](_0x365a('0x44')));});if(_0x5ed1e9[_0x365a('0x4a')]){var _0x30a8bd=0x0;_0x198e8c(this)['on']('mouseenter.qd_ddc_hover',function(){var _0x164fa6=function(){window[_0x365a('0x1a')]['allowUpdate']&&(_0x5a0d47[_0x365a('0x4b')](),window['_QuatroDigital_DropDown']['allowUpdate']=!0x1,_0x198e8c['fn']['simpleCart'](!0x0),_0x5a0d47['cartIsEmpty']());};_0x30a8bd=setInterval(function(){_0x164fa6();},0x258);_0x164fa6();});_0x198e8c(this)['on'](_0x365a('0x4c'),function(){clearInterval(_0x30a8bd);});}};var _0x3a2a13=function(_0x3ae381){_0x3ae381=_0x198e8c(_0x3ae381);_0x5ed1e9[_0x365a('0x4d')][_0x365a('0x4e')]=_0x5ed1e9[_0x365a('0x4d')][_0x365a('0x4e')][_0x365a('0x2')](_0x365a('0x4f'),'<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>');_0x5ed1e9[_0x365a('0x4d')][_0x365a('0x4e')]=_0x5ed1e9[_0x365a('0x4d')][_0x365a('0x4e')][_0x365a('0x2')]('#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>');_0x5ed1e9[_0x365a('0x4d')]['cartTotal']=_0x5ed1e9[_0x365a('0x4d')][_0x365a('0x4e')]['replace'](_0x365a('0x50'),_0x365a('0x51'));_0x5ed1e9[_0x365a('0x4d')][_0x365a('0x4e')]=_0x5ed1e9['texts'][_0x365a('0x4e')][_0x365a('0x2')](_0x365a('0x52'),_0x365a('0x53'));_0x3ae381[_0x365a('0x35')](_0x365a('0x54'))[_0x365a('0x55')](_0x5ed1e9[_0x365a('0x4d')][_0x365a('0x56')]);_0x3ae381['find'](_0x365a('0x57'))[_0x365a('0x55')](_0x5ed1e9[_0x365a('0x4d')][_0x365a('0x58')]);_0x3ae381[_0x365a('0x35')]('.qd-ddc-checkout')[_0x365a('0x55')](_0x5ed1e9[_0x365a('0x4d')][_0x365a('0x59')]);_0x3ae381[_0x365a('0x35')](_0x365a('0x5a'))['html'](_0x5ed1e9[_0x365a('0x4d')]['cartTotal']);_0x3ae381['find'](_0x365a('0x5b'))[_0x365a('0x55')](_0x5ed1e9['texts']['shippingForm']);_0x3ae381[_0x365a('0x35')]('.qd-ddc-emptyCart\x20p')[_0x365a('0x55')](_0x5ed1e9[_0x365a('0x4d')][_0x365a('0x5c')]);return _0x3ae381;}(this[_0x365a('0x32')]);var _0x3a9512=0x0;_0x56d14a[_0x365a('0x5d')](function(){0x0<_0x3a9512?_0x1e49b7[_0x365a('0x5e')](this,_0x3a2a13[_0x365a('0x5f')]()):_0x1e49b7[_0x365a('0x5e')](this,_0x3a2a13);_0x3a9512++;});window[_0x365a('0xb')][_0x365a('0xc')][_0x365a('0x37')](function(){_0x198e8c(_0x365a('0x60'))[_0x365a('0x55')](window[_0x365a('0xb')]['total']||'--');_0x198e8c(_0x365a('0x61'))[_0x365a('0x55')](window[_0x365a('0xb')][_0x365a('0x62')]||'0');_0x198e8c('.qd-ddc-infoTotalShipping')[_0x365a('0x55')](window[_0x365a('0xb')][_0x365a('0x63')]||'--');_0x198e8c(_0x365a('0x64'))[_0x365a('0x55')](window[_0x365a('0xb')][_0x365a('0x65')]||'--');});var _0xe87bac=function(_0x1ffa61,_0xa0ec8b){if(_0x365a('0x4')===typeof _0x1ffa61[_0x365a('0x66')])return _0x4101b7(_0x365a('0x67'));_0x5a0d47[_0x365a('0x68')]['call'](this,_0xa0ec8b);};_0x5a0d47[_0x365a('0x4b')]=function(_0x5ebfc9,_0x1acc17){_0x365a('0x4')!=typeof _0x1acc17?window[_0x365a('0x1a')][_0x365a('0x69')]=_0x1acc17:window[_0x365a('0x1a')][_0x365a('0x69')]&&(_0x1acc17=window['_QuatroDigital_DropDown']['dataOptionsCache']);setTimeout(function(){window[_0x365a('0x1a')]['dataOptionsCache']=void 0x0;},_0x5ed1e9[_0x365a('0x6a')]);_0x198e8c('.qd-ddc-wrapper')[_0x365a('0x3a')]('qd-ddc-prodLoaded');if(_0x5ed1e9['smartCheckout']){var _0x12bc1d=function(_0xbd019){window[_0x365a('0x1a')][_0x365a('0x6b')]=_0xbd019;_0xe87bac(_0xbd019,_0x1acc17);_0x365a('0x4')!==typeof window['_QuatroDigital_AmountProduct']&&_0x365a('0xe')===typeof window[_0x365a('0x6c')][_0x365a('0x6d')]&&window['_QuatroDigital_AmountProduct'][_0x365a('0x6d')][_0x365a('0x5e')](this);_0x198e8c(_0x365a('0x6e'))['addClass'](_0x365a('0x6f'));};_0x365a('0x4')!==typeof window[_0x365a('0x1a')][_0x365a('0x6b')]?(_0x12bc1d(window[_0x365a('0x1a')][_0x365a('0x6b')]),_0x365a('0xe')===typeof _0x5ebfc9&&_0x5ebfc9(window[_0x365a('0x1a')][_0x365a('0x6b')])):_0x198e8c[_0x365a('0x70')]([_0x365a('0x66'),_0x365a('0x71'),_0x365a('0x72')],{'done':function(_0x2b842b){_0x12bc1d[_0x365a('0x5e')](this,_0x2b842b);_0x365a('0xe')===typeof _0x5ebfc9&&_0x5ebfc9(_0x2b842b);},'fail':function(_0x1b54d6){_0x4101b7(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0x1b54d6]);}});}else alert(_0x365a('0x73'));};_0x5a0d47[_0x365a('0x74')]=function(){var _0x37ba4b=_0x198e8c(_0x365a('0x6e'));_0x37ba4b['find']('.qd-ddc-prodRow')[_0x365a('0x9')]?_0x37ba4b[_0x365a('0x3a')](_0x365a('0x75')):_0x37ba4b[_0x365a('0x76')]('qd-ddc-noItems');};_0x5a0d47['renderProductsList']=function(_0x4d871c){var _0x2607f1=_0x198e8c(_0x365a('0x77'));_0x2607f1['empty']();_0x2607f1[_0x365a('0x5d')](function(){var _0x2607f1=_0x198e8c(this),_0x5e896e,_0x52d6ad,_0x10351c=_0x198e8c(''),_0x4bccfb;for(_0x4bccfb in window['_QuatroDigital_DropDown'][_0x365a('0x6b')][_0x365a('0x66')])if(_0x365a('0x11')===typeof window[_0x365a('0x1a')][_0x365a('0x6b')][_0x365a('0x66')][_0x4bccfb]){var _0x4aeb1c=window[_0x365a('0x1a')][_0x365a('0x6b')]['items'][_0x4bccfb];var _0x507593=_0x4aeb1c['productCategoryIds'][_0x365a('0x2')](/^\/|\/$/g,'')[_0x365a('0x8')]('/');var _0x244035=_0x198e8c('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0x244035['attr']({'data-sku':_0x4aeb1c['id'],'data-sku-index':_0x4bccfb,'data-qd-departament':_0x507593[0x0],'data-qd-category':_0x507593[_0x507593['length']-0x1]});_0x244035[_0x365a('0x76')](_0x365a('0x78')+_0x4aeb1c[_0x365a('0x79')]);_0x244035[_0x365a('0x35')](_0x365a('0x7a'))[_0x365a('0x34')](_0x5ed1e9['skuName'](_0x4aeb1c));_0x244035[_0x365a('0x35')]('.qd-ddc-prodPrice')[_0x365a('0x34')](isNaN(_0x4aeb1c[_0x365a('0x7b')])?_0x4aeb1c[_0x365a('0x7b')]:0x0==_0x4aeb1c[_0x365a('0x7b')]?'Grátis':(_0x198e8c(_0x365a('0x7c'))['attr'](_0x365a('0x7d'))||'R$')+'\x20'+qd_number_format(_0x4aeb1c[_0x365a('0x7b')]/0x64,0x2,',','.'));_0x244035[_0x365a('0x35')]('.qd-ddc-quantity')[_0x365a('0x7e')]({'data-sku':_0x4aeb1c['id'],'data-sku-index':_0x4bccfb})[_0x365a('0x45')](_0x4aeb1c[_0x365a('0x7f')]);_0x244035[_0x365a('0x35')](_0x365a('0x80'))[_0x365a('0x7e')]({'data-sku':_0x4aeb1c['id'],'data-sku-index':_0x4bccfb});_0x5a0d47[_0x365a('0x81')](_0x4aeb1c['id'],_0x244035[_0x365a('0x35')](_0x365a('0x82')),_0x4aeb1c[_0x365a('0x83')]);_0x244035['find'](_0x365a('0x84'))[_0x365a('0x7e')]({'data-sku':_0x4aeb1c['id'],'data-sku-index':_0x4bccfb});_0x244035[_0x365a('0x85')](_0x2607f1);_0x10351c=_0x10351c[_0x365a('0x37')](_0x244035);}try{var _0x221971=_0x2607f1['getParent'](_0x365a('0x6e'))['find']('.qd-ddc-shipping\x20input');_0x221971[_0x365a('0x9')]&&''==_0x221971['val']()&&window[_0x365a('0x1a')][_0x365a('0x6b')][_0x365a('0x72')][_0x365a('0x86')]&&_0x221971[_0x365a('0x45')](window[_0x365a('0x1a')]['getOrderForm'][_0x365a('0x72')][_0x365a('0x86')][_0x365a('0x87')]);}catch(_0x2fdb20){_0x4101b7('Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20'+_0x2fdb20[_0x365a('0x10')],_0x365a('0x17'));}_0x5a0d47['actionButtons'](_0x2607f1);_0x5a0d47[_0x365a('0x74')]();_0x4d871c&&_0x4d871c['lastSku']&&function(){_0x52d6ad=_0x10351c[_0x365a('0x88')](_0x365a('0x89')+_0x4d871c['lastSku']+'\x27]');_0x52d6ad[_0x365a('0x9')]&&(_0x5e896e=0x0,_0x10351c[_0x365a('0x5d')](function(){var _0x4d871c=_0x198e8c(this);if(_0x4d871c['is'](_0x52d6ad))return!0x1;_0x5e896e+=_0x4d871c['outerHeight']();}),_0x5a0d47[_0x365a('0x41')](void 0x0,void 0x0,_0x5e896e,_0x2607f1[_0x365a('0x37')](_0x2607f1[_0x365a('0x8a')]())),_0x10351c[_0x365a('0x3a')](_0x365a('0x8b')),function(_0x1db0ba){_0x1db0ba[_0x365a('0x76')](_0x365a('0x8c'));_0x1db0ba[_0x365a('0x76')](_0x365a('0x8b'));setTimeout(function(){_0x1db0ba[_0x365a('0x3a')](_0x365a('0x8c'));},_0x5ed1e9['timeRemoveNewItemClass']);}(_0x52d6ad),_0x198e8c(document['body'])[_0x365a('0x76')]('qd-ddc-product-add-time-v2'),setTimeout(function(){_0x198e8c(document[_0x365a('0x3c')])['removeClass']('qd-ddc-product-add-time-v2');},_0x5ed1e9[_0x365a('0x6a')]));}();});(function(){_QuatroDigital_DropDown[_0x365a('0x6b')][_0x365a('0x66')][_0x365a('0x9')]?(_0x198e8c(_0x365a('0x3c'))[_0x365a('0x3a')](_0x365a('0x8d'))[_0x365a('0x76')](_0x365a('0x8e')),setTimeout(function(){_0x198e8c('body')[_0x365a('0x3a')](_0x365a('0x8f'));},_0x5ed1e9[_0x365a('0x6a')])):_0x198e8c(_0x365a('0x3c'))[_0x365a('0x3a')](_0x365a('0x90'))[_0x365a('0x76')]('qd-ddc-cart-empty');}());_0x365a('0xe')===typeof _0x5ed1e9['callbackProductsList']?_0x5ed1e9[_0x365a('0x91')][_0x365a('0x5e')](this):_0x4101b7(_0x365a('0x92'));};_0x5a0d47[_0x365a('0x81')]=function(_0x26bc02,_0x212c7c,_0x54182a){function _0x490a05(){_0x5ed1e9[_0x365a('0x93')]&&_0x365a('0x94')==typeof _0x54182a&&(_0x54182a=_0x54182a['replace']('http',_0x365a('0x95')));_0x212c7c['removeClass'](_0x365a('0x96'))[_0x365a('0x97')](function(){_0x198e8c(this)[_0x365a('0x76')](_0x365a('0x96'));})[_0x365a('0x7e')](_0x365a('0x98'),_0x54182a);}_0x54182a?_0x490a05():isNaN(_0x26bc02)?_0x4101b7(_0x365a('0x99'),_0x365a('0x16')):alert(_0x365a('0x9a'));};_0x5a0d47['actionButtons']=function(_0x106873){var _0x4c0c23=function(_0x3f5608,_0x9191f4){var _0x2607f1=_0x198e8c(_0x3f5608);var _0x25350a=_0x2607f1['attr'](_0x365a('0x9b'));var _0x507593=_0x2607f1[_0x365a('0x7e')](_0x365a('0x9c'));if(_0x25350a){var _0x4260ed=parseInt(_0x2607f1[_0x365a('0x45')]())||0x1;_0x5a0d47[_0x365a('0x9d')]([_0x25350a,_0x507593],_0x4260ed,_0x4260ed+0x1,function(_0x4c02eb){_0x2607f1[_0x365a('0x45')](_0x4c02eb);_0x365a('0xe')===typeof _0x9191f4&&_0x9191f4();});}};var _0x2607f1=function(_0x5bbd74,_0x427a7a){var _0xe47976=_0x198e8c(_0x5bbd74);var _0x5b714c=_0xe47976['attr']('data-sku');var _0x551317=_0xe47976[_0x365a('0x7e')](_0x365a('0x9c'));if(_0x5b714c){var _0x507593=parseInt(_0xe47976[_0x365a('0x45')]())||0x2;_0x5a0d47[_0x365a('0x9d')]([_0x5b714c,_0x551317],_0x507593,_0x507593-0x1,function(_0x35e30c){_0xe47976[_0x365a('0x45')](_0x35e30c);'function'===typeof _0x427a7a&&_0x427a7a();});}};var _0x222b47=function(_0x396928,_0x4d0e2f){var _0x2607f1=_0x198e8c(_0x396928);var _0x43492b=_0x2607f1[_0x365a('0x7e')](_0x365a('0x9b'));var _0x507593=_0x2607f1[_0x365a('0x7e')]('data-sku-index');if(_0x43492b){var _0x33899f=parseInt(_0x2607f1[_0x365a('0x45')]())||0x1;_0x5a0d47['changeQantity']([_0x43492b,_0x507593],0x1,_0x33899f,function(_0x491d3c){_0x2607f1[_0x365a('0x45')](_0x491d3c);'function'===typeof _0x4d0e2f&&_0x4d0e2f();});}};var _0x507593=_0x106873[_0x365a('0x35')](_0x365a('0x9e'));_0x507593[_0x365a('0x76')]('qd_on')[_0x365a('0x5d')](function(){var _0x106873=_0x198e8c(this);_0x106873[_0x365a('0x35')](_0x365a('0x9f'))['on']('click.qd_ddc_more',function(_0x4f6066){_0x4f6066[_0x365a('0xa0')]();_0x507593[_0x365a('0x76')](_0x365a('0xa1'));_0x4c0c23(_0x106873['find'](_0x365a('0xa2')),function(){_0x507593['removeClass']('qd-loading');});});_0x106873[_0x365a('0x35')](_0x365a('0xa3'))['on'](_0x365a('0xa4'),function(_0x200616){_0x200616[_0x365a('0xa0')]();_0x507593[_0x365a('0x76')]('qd-loading');_0x2607f1(_0x106873['find']('.qd-ddc-quantity'),function(){_0x507593[_0x365a('0x3a')](_0x365a('0xa1'));});});_0x106873['find'](_0x365a('0xa2'))['on'](_0x365a('0xa5'),function(){_0x507593[_0x365a('0x76')](_0x365a('0xa1'));_0x222b47(this,function(){_0x507593[_0x365a('0x3a')](_0x365a('0xa1'));});});_0x106873['find'](_0x365a('0xa2'))['on'](_0x365a('0xa6'),function(_0x501ea9){0xd==_0x501ea9[_0x365a('0x3f')]&&(_0x507593[_0x365a('0x76')]('qd-loading'),_0x222b47(this,function(){_0x507593[_0x365a('0x3a')]('qd-loading');}));});});_0x106873[_0x365a('0x35')](_0x365a('0xa7'))[_0x365a('0x5d')](function(){var _0x106873=_0x198e8c(this);_0x106873[_0x365a('0x35')](_0x365a('0x80'))['on'](_0x365a('0xa8'),function(){_0x106873[_0x365a('0x76')](_0x365a('0xa1'));_0x5a0d47[_0x365a('0xa9')](_0x198e8c(this),function(_0x20179e){_0x20179e?_0x106873['stop'](!0x0)[_0x365a('0xaa')](function(){_0x106873['remove']();_0x5a0d47[_0x365a('0x74')]();}):_0x106873[_0x365a('0x3a')]('qd-loading');});return!0x1;});});};_0x5a0d47[_0x365a('0x47')]=function(_0x2e3ee2){var _0x7382dd=_0x2e3ee2['val']();_0x7382dd=_0x7382dd[_0x365a('0x2')](/[^0-9\-]/g,'');_0x7382dd=_0x7382dd['replace'](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3');_0x7382dd=_0x7382dd[_0x365a('0x2')](/(.{9}).*/g,'$1');_0x2e3ee2['val'](_0x7382dd);};_0x5a0d47[_0x365a('0xab')]=function(_0x3e1ddf){var _0x2607f1=_0x3e1ddf[_0x365a('0x45')]();0x9<=_0x2607f1[_0x365a('0x9')]&&(_0x3e1ddf['data']('qdDdcLastPostalCode')!=_0x2607f1&&_0x1291e5[_0x365a('0xac')]({'postalCode':_0x2607f1,'country':_0x365a('0xad')})[_0x365a('0xae')](function(_0x1e5693){window[_0x365a('0x1a')]['getOrderForm']=_0x1e5693;_0x5a0d47[_0x365a('0x4b')]();_0x1e5693=_0x1e5693[_0x365a('0x72')][_0x365a('0xaf')][0x0][_0x365a('0xb0')];for(var _0x134381=0x0;_0x134381<_0x1e5693['length'];_0x134381++){var _0x507593=_0x1e5693[_0x134381],_0x59467f=0x1<_0x507593[_0x365a('0xb1')]?_0x507593[_0x365a('0xb1')][_0x365a('0x2')]('bd',_0x365a('0xb2')):_0x507593[_0x365a('0xb1')][_0x365a('0x2')]('bd',_0x365a('0xb3')),_0x5c71f9=_0x198e8c(_0x365a('0xb4'));_0x5c71f9[_0x365a('0x34')](_0x365a('0xb5')+_0x507593[_0x365a('0x2a')]+_0x365a('0xb6')+qd_number_format(_0x507593[_0x365a('0xb7')]/0x64,0x2,',','.')+_0x365a('0xb8')+_0x59467f+_0x365a('0xb9'));_0x3e1ddf['parent']()[_0x365a('0x34')](_0x5c71f9);}})['fail'](function(_0x39c8a6){_0x4101b7([_0x365a('0xba'),_0x39c8a6]);updateCartData();}),_0x3e1ddf[_0x365a('0xbb')](_0x365a('0xbc'),_0x2607f1));};_0x5a0d47[_0x365a('0x9d')]=function(_0x34eddb,_0xdfb2b5,_0x47b0ab,_0x1eac50){function _0x40fa7e(_0x58cc55){_0x58cc55=_0x365a('0xbd')!==typeof _0x58cc55?!0x1:_0x58cc55;_0x5a0d47[_0x365a('0x4b')]();window['_QuatroDigital_DropDown'][_0x365a('0x1b')]=!0x1;_0x5a0d47['cartIsEmpty']();_0x365a('0x4')!==typeof window[_0x365a('0x6c')]&&_0x365a('0xe')===typeof window[_0x365a('0x6c')][_0x365a('0x6d')]&&window['_QuatroDigital_AmountProduct']['exec'][_0x365a('0x5e')](this);_0x365a('0xe')===typeof adminCart&&adminCart();_0x198e8c['fn'][_0x365a('0xbe')](!0x0,void 0x0,_0x58cc55);_0x365a('0xe')===typeof _0x1eac50&&_0x1eac50(_0xdfb2b5);}_0x47b0ab=_0x47b0ab||0x1;if(0x1>_0x47b0ab)return _0xdfb2b5;if(_0x5ed1e9[_0x365a('0x2b')]){if('undefined'===typeof window['_QuatroDigital_DropDown'][_0x365a('0x6b')]['items'][_0x34eddb[0x1]])return _0x4101b7(_0x365a('0xbf')+_0x34eddb[0x1]+']'),_0xdfb2b5;window[_0x365a('0x1a')][_0x365a('0x6b')][_0x365a('0x66')][_0x34eddb[0x1]]['quantity']=_0x47b0ab;window[_0x365a('0x1a')]['getOrderForm'][_0x365a('0x66')][_0x34eddb[0x1]][_0x365a('0xc0')]=_0x34eddb[0x1];_0x1291e5[_0x365a('0xc1')]([window['_QuatroDigital_DropDown'][_0x365a('0x6b')][_0x365a('0x66')][_0x34eddb[0x1]]],[_0x365a('0x66'),'totalizers',_0x365a('0x72')])[_0x365a('0xae')](function(_0x3e9490){window[_0x365a('0x1a')]['getOrderForm']=_0x3e9490;_0x40fa7e(!0x0);})[_0x365a('0xc2')](function(_0x2d7156){_0x4101b7([_0x365a('0xc3'),_0x2d7156]);_0x40fa7e();});}else _0x4101b7(_0x365a('0xc4'));};_0x5a0d47[_0x365a('0xa9')]=function(_0x51ac6c,_0x1283cb){function _0x3800e8(_0x4b1f76){_0x4b1f76=_0x365a('0xbd')!==typeof _0x4b1f76?!0x1:_0x4b1f76;'undefined'!==typeof window['_QuatroDigital_AmountProduct']&&_0x365a('0xe')===typeof window[_0x365a('0x6c')][_0x365a('0x6d')]&&window['_QuatroDigital_AmountProduct'][_0x365a('0x6d')]['call'](this);_0x365a('0xe')===typeof adminCart&&adminCart();_0x198e8c['fn'][_0x365a('0xbe')](!0x0,void 0x0,_0x4b1f76);'function'===typeof _0x1283cb&&_0x1283cb(_0x507593);}var _0x507593=!0x1,_0x409fc9=_0x198e8c(_0x51ac6c)[_0x365a('0x7e')](_0x365a('0x9c'));if(_0x5ed1e9[_0x365a('0x2b')]){if(_0x365a('0x4')===typeof window['_QuatroDigital_DropDown'][_0x365a('0x6b')][_0x365a('0x66')][_0x409fc9])return _0x4101b7(_0x365a('0xbf')+_0x409fc9+']'),_0x507593;window['_QuatroDigital_DropDown']['getOrderForm'][_0x365a('0x66')][_0x409fc9]['index']=_0x409fc9;_0x1291e5[_0x365a('0xc5')]([window[_0x365a('0x1a')][_0x365a('0x6b')][_0x365a('0x66')][_0x409fc9]],['items',_0x365a('0x71'),_0x365a('0x72')])[_0x365a('0xae')](function(_0x44d46a){_0x507593=!0x0;window['_QuatroDigital_DropDown'][_0x365a('0x6b')]=_0x44d46a;_0xe87bac(_0x44d46a);_0x3800e8(!0x0);})['fail'](function(_0x49f111){_0x4101b7([_0x365a('0xc6'),_0x49f111]);_0x3800e8();});}else alert(_0x365a('0xc7'));};_0x5a0d47[_0x365a('0x41')]=function(_0x2581b5,_0x525ca3,_0x5d4490,_0x36ab6b){_0x36ab6b=_0x36ab6b||_0x198e8c(_0x365a('0xc8'));_0x2581b5=_0x2581b5||'+';_0x525ca3=_0x525ca3||0.9*_0x36ab6b[_0x365a('0xc9')]();_0x36ab6b[_0x365a('0xca')](!0x0,!0x0)['animate']({'scrollTop':isNaN(_0x5d4490)?_0x2581b5+'='+_0x525ca3+'px':_0x5d4490});};_0x5ed1e9[_0x365a('0x4a')]||(_0x5a0d47['getCartInfoByUrl'](),_0x198e8c['fn'][_0x365a('0xbe')](!0x0));_0x198e8c(window)['on'](_0x365a('0xcb'),function(){try{window[_0x365a('0x1a')][_0x365a('0x6b')]=void 0x0,_0x5a0d47[_0x365a('0x4b')]();}catch(_0x4108c9){_0x4101b7(_0x365a('0xcc')+_0x4108c9[_0x365a('0x10')],'avisso');}});_0x365a('0xe')===typeof _0x5ed1e9[_0x365a('0xc')]?_0x5ed1e9[_0x365a('0xc')][_0x365a('0x5e')](this):_0x4101b7(_0x365a('0xcd'));};_0x198e8c['fn'][_0x365a('0x1c')]=function(_0x21c0d0){var _0x50442a=_0x198e8c(this);_0x50442a['fn']=new _0x198e8c[(_0x365a('0x1c'))](this,_0x21c0d0);return _0x50442a;};}catch(_0x4d3666){_0x365a('0x4')!==typeof console&&_0x365a('0xe')===typeof console[_0x365a('0xf')]&&console[_0x365a('0xf')](_0x365a('0xce'),_0x4d3666);}}(this));(function(_0x423576){try{var _0x22a39d=jQuery;window['_QuatroDigital_AmountProduct']=window[_0x365a('0x6c')]||{};window[_0x365a('0x6c')][_0x365a('0x66')]={};window['_QuatroDigital_AmountProduct'][_0x365a('0xcf')]=!0x1;window['_QuatroDigital_AmountProduct']['buyButtonClicked']=!0x1;window[_0x365a('0x6c')][_0x365a('0xd0')]=!0x1;var _0x17f060=function(){if(window['_QuatroDigital_AmountProduct'][_0x365a('0xcf')]){var _0x2d62c9=!0x1;var _0x1eecc0={};window[_0x365a('0x6c')]['items']={};for(_0x281b3a in window[_0x365a('0x1a')][_0x365a('0x6b')][_0x365a('0x66')])if(_0x365a('0x11')===typeof window[_0x365a('0x1a')][_0x365a('0x6b')][_0x365a('0x66')][_0x281b3a]){var _0x2d95b5=window[_0x365a('0x1a')]['getOrderForm'][_0x365a('0x66')][_0x281b3a];_0x365a('0x4')!==typeof _0x2d95b5[_0x365a('0xd1')]&&null!==_0x2d95b5[_0x365a('0xd1')]&&''!==_0x2d95b5['productId']&&(window[_0x365a('0x6c')]['items'][_0x365a('0xd2')+_0x2d95b5[_0x365a('0xd1')]]=window[_0x365a('0x6c')][_0x365a('0x66')][_0x365a('0xd2')+_0x2d95b5[_0x365a('0xd1')]]||{},window['_QuatroDigital_AmountProduct'][_0x365a('0x66')][_0x365a('0xd2')+_0x2d95b5['productId']][_0x365a('0xd3')]=_0x2d95b5[_0x365a('0xd1')],_0x1eecc0['prod_'+_0x2d95b5[_0x365a('0xd1')]]||(window[_0x365a('0x6c')][_0x365a('0x66')][_0x365a('0xd2')+_0x2d95b5[_0x365a('0xd1')]][_0x365a('0x62')]=0x0),window[_0x365a('0x6c')][_0x365a('0x66')][_0x365a('0xd2')+_0x2d95b5[_0x365a('0xd1')]][_0x365a('0x62')]+=_0x2d95b5[_0x365a('0x7f')],_0x2d62c9=!0x0,_0x1eecc0[_0x365a('0xd2')+_0x2d95b5[_0x365a('0xd1')]]=!0x0);}var _0x281b3a=_0x2d62c9;}else _0x281b3a=void 0x0;window[_0x365a('0x6c')][_0x365a('0xcf')]&&(_0x22a39d(_0x365a('0xd4'))[_0x365a('0xd5')](),_0x22a39d(_0x365a('0xd6'))['removeClass'](_0x365a('0xd7')));for(var _0x21d24e in window[_0x365a('0x6c')][_0x365a('0x66')]){_0x2d95b5=window[_0x365a('0x6c')][_0x365a('0x66')][_0x21d24e];if(_0x365a('0x11')!==typeof _0x2d95b5)return;_0x1eecc0=_0x22a39d(_0x365a('0xd8')+_0x2d95b5[_0x365a('0xd3')]+']')[_0x365a('0x0')]('li');if(window[_0x365a('0x6c')][_0x365a('0xcf')]||!_0x1eecc0['find']('.qd-bap-wrapper')[_0x365a('0x9')])_0x2d62c9=_0x22a39d('<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>'),_0x2d62c9['find'](_0x365a('0xd9'))['html'](_0x2d95b5['qtt']),_0x2d95b5=_0x1eecc0[_0x365a('0x35')](_0x365a('0xda')),_0x2d95b5['length']?_0x2d95b5[_0x365a('0xdb')](_0x2d62c9)[_0x365a('0x76')](_0x365a('0xd7')):_0x1eecc0[_0x365a('0xdb')](_0x2d62c9);}_0x281b3a&&(window[_0x365a('0x6c')]['allowRecalculate']=!0x1);};window['_QuatroDigital_AmountProduct'][_0x365a('0x6d')]=function(){window[_0x365a('0x6c')][_0x365a('0xcf')]=!0x0;_0x17f060[_0x365a('0x5e')](this);};_0x22a39d(document)['ajaxStop'](function(){_0x17f060['call'](this);});}catch(_0x3921be){_0x365a('0x4')!==typeof console&&'function'===typeof console[_0x365a('0xf')]&&console[_0x365a('0xf')](_0x365a('0xce'),_0x3921be);}}(this));(function(){try{var _0x1ddfa0=jQuery,_0x29757d,_0x1d293e={'selector':_0x365a('0xdc'),'dropDown':{},'buyButton':{}};_0x1ddfa0[_0x365a('0xdd')]=function(_0x5dda28){var _0xd6a64e={};_0x29757d=_0x1ddfa0[_0x365a('0x24')](!0x0,{},_0x1d293e,_0x5dda28);_0x5dda28=_0x1ddfa0(_0x29757d['selector'])[_0x365a('0x1c')](_0x29757d['dropDown']);_0xd6a64e[_0x365a('0xde')]=_0x365a('0x4')!==typeof _0x29757d[_0x365a('0xdf')][_0x365a('0x4a')]&&!0x1===_0x29757d[_0x365a('0xdf')][_0x365a('0x4a')]?_0x1ddfa0(_0x29757d['selector'])[_0x365a('0xe0')](_0x5dda28['fn'],_0x29757d[_0x365a('0xde')]):_0x1ddfa0(_0x29757d['selector'])[_0x365a('0xe0')](_0x29757d['buyButton']);_0xd6a64e[_0x365a('0xdf')]=_0x5dda28;return _0xd6a64e;};_0x1ddfa0['fn']['smartCart']=function(){_0x365a('0x11')===typeof console&&_0x365a('0xe')===typeof console[_0x365a('0x12')]&&console[_0x365a('0x12')]('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x1ddfa0[_0x365a('0xe1')]=_0x1ddfa0['fn']['smartCart'];}catch(_0x2ca460){_0x365a('0x4')!==typeof console&&_0x365a('0xe')===typeof console[_0x365a('0xf')]&&console['error'](_0x365a('0xce'),_0x2ca460);}}());
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
var _0x233e=['top','height','first','function','Problemas\x20:(\x20.\x20Detalhes:\x20','clone','addClass','qd-sil-image-loaded','attr','src','sizes','width','qd-sil-image','closest','push','extend','scroll','QD_SIL_scroll','QD_smartImageLoad','vinyzvk%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','ite','join','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Quatro\x20Digital\x20-\x20Smart\x20Image\x20Load','object','undefined','error','info','unshift','alerta','toLowerCase','aviso','apply','.qd_sil_img_wrapper','300','find','imageWrapper','not','.qd-sil-on','img:visible','length','scrollTop','bottom'];(function(_0x4565bf,_0x5ad9d6){var _0x5610ba=function(_0x170988){while(--_0x170988){_0x4565bf['push'](_0x4565bf['shift']());}};_0x5610ba(++_0x5ad9d6);}(_0x233e,0x1dd));var _0xe233=function(_0x4c2c6b,_0x3ba1be){_0x4c2c6b=_0x4c2c6b-0x0;var _0x52a5f9=_0x233e[_0x4c2c6b];return _0x52a5f9;};(function(_0x484964){'use strict';var _0x3a5be2=jQuery;if(typeof _0x3a5be2['fn'][_0xe233('0x0')]==='function')return;_0x3a5be2['fn'][_0xe233('0x0')]=function(){};var _0x5d9607=function(_0x5b3b86){var _0x37d7c9={'a':_0xe233('0x1')};return function(_0x25b6bd){var _0x20655f,_0x3a8662,_0x488c8f,_0x4e0c5b;_0x3a8662=function(_0x74df9a){return _0x74df9a;};_0x488c8f=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x25b6bd=_0x25b6bd['d'+_0x488c8f[0x10]+'c'+_0x488c8f[0x11]+'m'+_0x3a8662(_0x488c8f[0x1])+'n'+_0x488c8f[0xd]]['l'+_0x488c8f[0x12]+'c'+_0x488c8f[0x0]+'ti'+_0x3a8662('o')+'n'];_0x20655f=function(_0x29434a){return escape(encodeURIComponent(_0x29434a[_0xe233('0x2')](/\./g,'¨')[_0xe233('0x2')](/[a-zA-Z]/g,function(_0x56d032){return String[_0xe233('0x3')](('Z'>=_0x56d032?0x5a:0x7a)>=(_0x56d032=_0x56d032[_0xe233('0x4')](0x0)+0xd)?_0x56d032:_0x56d032-0x1a);})));};var _0x5f2e3b=_0x20655f(_0x25b6bd[[_0x488c8f[0x9],_0x3a8662('o'),_0x488c8f[0xc],_0x488c8f[_0x3a8662(0xd)]]['join']('')]);_0x20655f=_0x20655f((window[['js',_0x3a8662('no'),'m',_0x488c8f[0x1],_0x488c8f[0x4][_0xe233('0x5')](),_0xe233('0x6')][_0xe233('0x7')]('')]||_0xe233('0x8'))+['.v',_0x488c8f[0xd],'e',_0x3a8662('x'),'co',_0x3a8662('mm'),_0xe233('0x9'),_0x488c8f[0x1],'.c',_0x3a8662('o'),'m.',_0x488c8f[0x13],'r']['join'](''));for(var _0xeeeb33 in _0x37d7c9){if(_0x20655f===_0xeeeb33+_0x37d7c9[_0xeeeb33]||_0x5f2e3b===_0xeeeb33+_0x37d7c9[_0xeeeb33]){_0x4e0c5b='tr'+_0x488c8f[0x11]+'e';break;}_0x4e0c5b='f'+_0x488c8f[0x0]+'ls'+_0x3a8662(_0x488c8f[0x1])+'';}_0x3a8662=!0x1;-0x1<_0x25b6bd[[_0x488c8f[0xc],'e',_0x488c8f[0x0],'rc',_0x488c8f[0x9]][_0xe233('0x7')]('')][_0xe233('0xa')](_0xe233('0xb'))&&(_0x3a8662=!0x0);return[_0x4e0c5b,_0x3a8662];}(_0x5b3b86);}(window);if(!eval(_0x5d9607[0x0]))return _0x5d9607[0x1]?_0x2d2460(_0xe233('0xc')):!0x1;var _0x2bbdb0=_0xe233('0xd');var _0x2d2460=function(_0x19180a,_0x38d2d4){if(_0xe233('0xe')===typeof console&&_0xe233('0xf')!==typeof console[_0xe233('0x10')]&&_0xe233('0xf')!==typeof console[_0xe233('0x11')]&&_0xe233('0xf')!==typeof console['warn']){if('object'==typeof _0x19180a&&'function'==typeof _0x19180a[_0xe233('0x12')]){_0x19180a[_0xe233('0x12')]('['+_0x2bbdb0+']\x0a');var _0x3d916d=_0x19180a;}else _0x3d916d=['['+_0x2bbdb0+']\x0a',_0x19180a];if(_0xe233('0xf')==typeof _0x38d2d4||_0xe233('0x13')!==_0x38d2d4[_0xe233('0x14')]()&&_0xe233('0x15')!==_0x38d2d4['toLowerCase']())if(_0xe233('0xf')!=typeof _0x38d2d4&&'info'==_0x38d2d4[_0xe233('0x14')]())try{console['info'][_0xe233('0x16')](console,_0x3d916d);}catch(_0x57082f){try{console[_0xe233('0x11')](_0x3d916d[_0xe233('0x7')]('\x0a'));}catch(_0x3e72e4){}}else try{console['error']['apply'](console,_0x3d916d);}catch(_0x2b013d){try{console[_0xe233('0x10')](_0x3d916d['join']('\x0a'));}catch(_0x2fe8c0){}}else try{console['warn'][_0xe233('0x16')](console,_0x3d916d);}catch(_0x2210fa){try{console['warn'](_0x3d916d[_0xe233('0x7')]('\x0a'));}catch(_0x18a64f){}}}};var _0x3148e8=/(ids\/[0-9]+-)[0-9-]+/i;var _0x125f2d={'imageWrapper':_0xe233('0x17'),'sizes':{'width':_0xe233('0x18'),'height':_0xe233('0x18')}};var _0x2ae17d=function(_0x5e88b2,_0x4bfb83){'use strict';_0x19f81d();_0x3a5be2(window)['on']('QD_SIL_scroll\x20QuatroDigital.is_Callback',_0x19f81d);function _0x19f81d(){try{var _0x3beab0=_0x5e88b2[_0xe233('0x19')](_0x4bfb83[_0xe233('0x1a')])[_0xe233('0x1b')](_0xe233('0x1c'))['find'](_0xe233('0x1d'));if(!_0x3beab0[_0xe233('0x1e')])return;var _0xa86c5e=_0x3a5be2(window);var _0x5b832e={'top':_0xa86c5e[_0xe233('0x1f')]()};_0x5b832e[_0xe233('0x20')]=_0x5b832e[_0xe233('0x21')]+_0xa86c5e[_0xe233('0x22')]();var _0x1afe0f=_0x3beab0[_0xe233('0x23')]()[_0xe233('0x22')]();var _0x4a9132=_0x4e5958(_0x3beab0,_0x5b832e,_0x1afe0f);for(var _0x468960=0x0;_0x468960<_0x4a9132['length'];_0x468960++)_0x366155(_0x3a5be2(_0x4a9132[_0x468960]));}catch(_0x2a6a81){typeof console!==_0xe233('0xf')&&typeof console[_0xe233('0x10')]===_0xe233('0x24')&&console[_0xe233('0x10')](_0xe233('0x25'),_0x2a6a81);}}function _0x366155(_0x132428){var _0x3a0ccb=_0x132428[_0xe233('0x26')]();_0x3a0ccb['on']('load',function(){_0x3a5be2(this)[_0xe233('0x27')](_0xe233('0x28'));});_0x3a0ccb[_0xe233('0x29')]({'src':_0x3a0ccb[0x0][_0xe233('0x2a')][_0xe233('0x2')](_0x3148e8,'$1'+_0x4bfb83[_0xe233('0x2b')][_0xe233('0x2c')]+'-'+_0x4bfb83[_0xe233('0x2b')][_0xe233('0x22')]),'width':_0x4bfb83[_0xe233('0x2b')][_0xe233('0x2c')],'height':_0x4bfb83['sizes'][_0xe233('0x22')]});_0x3a0ccb[_0xe233('0x27')](_0xe233('0x2d'))['insertAfter'](_0x132428);_0x3a0ccb[_0xe233('0x2e')](_0x4bfb83['imageWrapper'])[_0xe233('0x27')]('qd-sil-on');}function _0x4e5958(_0x2ab1ab,_0xd5f257,_0x15ed17){var _0x5aca9d;var _0x3c3631=[];for(var _0x485031=0x0;_0x485031<_0x2ab1ab[_0xe233('0x1e')];_0x485031++){_0x5aca9d=_0x3a5be2(_0x2ab1ab[_0x485031])['offset']();_0x5aca9d[_0xe233('0x20')]=_0x5aca9d[_0xe233('0x21')]+_0x15ed17;if(!(_0xd5f257['bottom']<_0x5aca9d[_0xe233('0x21')]||_0xd5f257['top']>_0x5aca9d[_0xe233('0x20')])){_0x3c3631[_0xe233('0x2f')](_0x2ab1ab[_0x485031]);}}return _0x3c3631;};};_0x3a5be2['fn'][_0xe233('0x0')]=function(_0x26da81){var _0x37a69c=_0x3a5be2(this);if(!_0x37a69c[_0xe233('0x1e')])return _0x37a69c;_0x37a69c['each'](function(){var _0x1ebf5d=_0x3a5be2(this);_0x1ebf5d[_0xe233('0x0')]=new _0x2ae17d(_0x1ebf5d,_0x3a5be2[_0xe233('0x30')]({},_0x125f2d,_0x26da81));});return _0x37a69c;};window['QD_SIL_scrollRange']=0x28;var _0x25f2d1=QD_SIL_scrollRange;var _0x3db6b6=0x0;_0x3a5be2(window)['on'](_0xe233('0x31'),function(){var _0x3ff79d=document['documentElement'][_0xe233('0x1f')];if(_0x3ff79d>_0x3db6b6+_0x25f2d1||_0x3ff79d<_0x3db6b6-_0x25f2d1){_0x3a5be2(window)['trigger'](_0xe233('0x32'));_0x3db6b6=_0x3ff79d;}});}(this));
