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
var _0xd237=['Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','off','vtex.sku.selected.QD','qd-ssa-sku-prod-unavailable','vinyzvk%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','join','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','qdPlugin','initialSkuSelected','QuatroDigital.ssa.skuSelected','prod','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','available','unavailable','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','function','qdAjax','qdAjaxQueue','url','opts','push','call','parameters','callbackFns','successPopulated','boolean','errorPopulated','completePopulated','success','object','error','complete','clearQueueDelay','undefined','jqXHR','readyState','data','textStatus','errorThrown','version','2.1','/produto/sku/','QD_smartStockAvailable','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','alerta','toLowerCase','info','apply','warn','removeClass','addClass','SkuSellersInformation','data-qd-ssa-qtt','each','find','[data-qd-ssa-text]','hide','qd-ssa-hide','qd-ssa-show','filter','[data-qd-ssa-text=\x22','[data-qd-ssa-text=\x22default\x22]','html','#qtt','message','length','qd-ssa-on','skus','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','sku','split','AvailableQuantity','trigger','QuatroDigital.ssa.prodUnavailable'];(function(_0x2095d0,_0x7f3f86){var _0x4c8775=function(_0x47b5bc){while(--_0x47b5bc){_0x2095d0['push'](_0x2095d0['shift']());}};_0x4c8775(++_0x7f3f86);}(_0xd237,0xc9));var _0x7d23=function(_0x499603,_0x4ca954){_0x499603=_0x499603-0x0;var _0x1c0227=_0xd237[_0x499603];return _0x1c0227;};(function(_0x325482){if(_0x7d23('0x0')!==typeof _0x325482[_0x7d23('0x1')]){var _0x5c7588={};_0x325482[_0x7d23('0x2')]=_0x5c7588;_0x325482[_0x7d23('0x1')]=function(_0xb6e30c){var _0x1f12ee=_0x325482['extend']({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0xb6e30c);var _0x4563cb=escape(encodeURIComponent(_0x1f12ee[_0x7d23('0x3')]));_0x5c7588[_0x4563cb]=_0x5c7588[_0x4563cb]||{};_0x5c7588[_0x4563cb]['opts']=_0x5c7588[_0x4563cb][_0x7d23('0x4')]||[];_0x5c7588[_0x4563cb][_0x7d23('0x4')][_0x7d23('0x5')]({'success':function(_0xd9578a,_0x3df5ea,_0x5cdfd2){_0x1f12ee['success'][_0x7d23('0x6')](this,_0xd9578a,_0x3df5ea,_0x5cdfd2);},'error':function(_0x1b8761,_0x3b43d4,_0x3a7deb){_0x1f12ee['error'][_0x7d23('0x6')](this,_0x1b8761,_0x3b43d4,_0x3a7deb);},'complete':function(_0x13fb25,_0x5bd0d0){_0x1f12ee['complete'][_0x7d23('0x6')](this,_0x13fb25,_0x5bd0d0);}});_0x5c7588[_0x4563cb]['parameters']=_0x5c7588[_0x4563cb][_0x7d23('0x7')]||{'success':{},'error':{},'complete':{}};_0x5c7588[_0x4563cb]['callbackFns']=_0x5c7588[_0x4563cb][_0x7d23('0x8')]||{};_0x5c7588[_0x4563cb]['callbackFns'][_0x7d23('0x9')]=_0x7d23('0xa')===typeof _0x5c7588[_0x4563cb][_0x7d23('0x8')][_0x7d23('0x9')]?_0x5c7588[_0x4563cb][_0x7d23('0x8')][_0x7d23('0x9')]:!0x1;_0x5c7588[_0x4563cb]['callbackFns'][_0x7d23('0xb')]=_0x7d23('0xa')===typeof _0x5c7588[_0x4563cb][_0x7d23('0x8')][_0x7d23('0xb')]?_0x5c7588[_0x4563cb][_0x7d23('0x8')][_0x7d23('0xb')]:!0x1;_0x5c7588[_0x4563cb][_0x7d23('0x8')]['completePopulated']='boolean'===typeof _0x5c7588[_0x4563cb][_0x7d23('0x8')]['completePopulated']?_0x5c7588[_0x4563cb][_0x7d23('0x8')][_0x7d23('0xc')]:!0x1;_0xb6e30c=_0x325482['extend']({},_0x1f12ee,{'success':function(_0x12fa49,_0x3daf1b,_0x5ae919){_0x5c7588[_0x4563cb][_0x7d23('0x7')][_0x7d23('0xd')]={'data':_0x12fa49,'textStatus':_0x3daf1b,'jqXHR':_0x5ae919};_0x5c7588[_0x4563cb]['callbackFns'][_0x7d23('0x9')]=!0x0;for(var _0x294576 in _0x5c7588[_0x4563cb]['opts'])_0x7d23('0xe')===typeof _0x5c7588[_0x4563cb][_0x7d23('0x4')][_0x294576]&&(_0x5c7588[_0x4563cb]['opts'][_0x294576][_0x7d23('0xd')][_0x7d23('0x6')](this,_0x12fa49,_0x3daf1b,_0x5ae919),_0x5c7588[_0x4563cb]['opts'][_0x294576][_0x7d23('0xd')]=function(){});},'error':function(_0x40bb2d,_0x561149,_0x114eff){_0x5c7588[_0x4563cb]['parameters']['error']={'errorThrown':_0x114eff,'textStatus':_0x561149,'jqXHR':_0x40bb2d};_0x5c7588[_0x4563cb][_0x7d23('0x8')][_0x7d23('0xb')]=!0x0;for(var _0x232d96 in _0x5c7588[_0x4563cb][_0x7d23('0x4')])_0x7d23('0xe')===typeof _0x5c7588[_0x4563cb]['opts'][_0x232d96]&&(_0x5c7588[_0x4563cb][_0x7d23('0x4')][_0x232d96][_0x7d23('0xf')][_0x7d23('0x6')](this,_0x40bb2d,_0x561149,_0x114eff),_0x5c7588[_0x4563cb][_0x7d23('0x4')][_0x232d96][_0x7d23('0xf')]=function(){});},'complete':function(_0xbadb25,_0x29d8bd){_0x5c7588[_0x4563cb][_0x7d23('0x7')]['complete']={'textStatus':_0x29d8bd,'jqXHR':_0xbadb25};_0x5c7588[_0x4563cb][_0x7d23('0x8')]['completePopulated']=!0x0;for(var _0x155fee in _0x5c7588[_0x4563cb][_0x7d23('0x4')])_0x7d23('0xe')===typeof _0x5c7588[_0x4563cb][_0x7d23('0x4')][_0x155fee]&&(_0x5c7588[_0x4563cb]['opts'][_0x155fee]['complete'][_0x7d23('0x6')](this,_0xbadb25,_0x29d8bd),_0x5c7588[_0x4563cb][_0x7d23('0x4')][_0x155fee][_0x7d23('0x10')]=function(){});isNaN(parseInt(_0x1f12ee[_0x7d23('0x11')]))||setTimeout(function(){_0x5c7588[_0x4563cb]['jqXHR']=void 0x0;_0x5c7588[_0x4563cb]['opts']=void 0x0;_0x5c7588[_0x4563cb][_0x7d23('0x7')]=void 0x0;_0x5c7588[_0x4563cb]['callbackFns']=void 0x0;},_0x1f12ee['clearQueueDelay']);}});_0x7d23('0x12')===typeof _0x5c7588[_0x4563cb][_0x7d23('0x13')]?_0x5c7588[_0x4563cb][_0x7d23('0x13')]=_0x325482['ajax'](_0xb6e30c):_0x5c7588[_0x4563cb][_0x7d23('0x13')]&&_0x5c7588[_0x4563cb]['jqXHR'][_0x7d23('0x14')]&&0x4==_0x5c7588[_0x4563cb]['jqXHR'][_0x7d23('0x14')]&&(_0x5c7588[_0x4563cb][_0x7d23('0x8')][_0x7d23('0x9')]&&_0xb6e30c[_0x7d23('0xd')](_0x5c7588[_0x4563cb][_0x7d23('0x7')]['success'][_0x7d23('0x15')],_0x5c7588[_0x4563cb][_0x7d23('0x7')][_0x7d23('0xd')][_0x7d23('0x16')],_0x5c7588[_0x4563cb][_0x7d23('0x7')][_0x7d23('0xd')][_0x7d23('0x13')]),_0x5c7588[_0x4563cb]['callbackFns']['errorPopulated']&&_0xb6e30c[_0x7d23('0xf')](_0x5c7588[_0x4563cb][_0x7d23('0x7')][_0x7d23('0xf')][_0x7d23('0x13')],_0x5c7588[_0x4563cb]['parameters'][_0x7d23('0xf')][_0x7d23('0x16')],_0x5c7588[_0x4563cb][_0x7d23('0x7')][_0x7d23('0xf')][_0x7d23('0x17')]),_0x5c7588[_0x4563cb][_0x7d23('0x8')][_0x7d23('0xc')]&&_0xb6e30c[_0x7d23('0x10')](_0x5c7588[_0x4563cb][_0x7d23('0x7')][_0x7d23('0x10')][_0x7d23('0x13')],_0x5c7588[_0x4563cb][_0x7d23('0x7')][_0x7d23('0x10')][_0x7d23('0x16')]));};_0x325482[_0x7d23('0x1')][_0x7d23('0x18')]=_0x7d23('0x19');}}(jQuery));(function(_0x2e11d7){function _0x2dc07b(_0x58e3d0,_0x49adcc){_0x344874['qdAjax']({'url':_0x7d23('0x1a')+_0x58e3d0,'clearQueueDelay':null,'success':_0x49adcc,'error':function(){_0x13fc02('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!');}});}var _0x344874=jQuery;if('function'!==typeof _0x344874['fn'][_0x7d23('0x1b')]){var _0x13fc02=function(_0x19e82b,_0x4aa11b){if(_0x7d23('0xe')===typeof console){var _0x5466a4;_0x7d23('0xe')===typeof _0x19e82b?(_0x19e82b[_0x7d23('0x1c')](_0x7d23('0x1d')),_0x5466a4=_0x19e82b):_0x5466a4=[_0x7d23('0x1d')+_0x19e82b];_0x7d23('0x12')===typeof _0x4aa11b||_0x7d23('0x1e')!==_0x4aa11b['toLowerCase']()&&'aviso'!==_0x4aa11b[_0x7d23('0x1f')]()?'undefined'!==typeof _0x4aa11b&&_0x7d23('0x20')===_0x4aa11b[_0x7d23('0x1f')]()?console[_0x7d23('0x20')][_0x7d23('0x21')](console,_0x5466a4):console[_0x7d23('0xf')][_0x7d23('0x21')](console,_0x5466a4):console[_0x7d23('0x22')]['apply'](console,_0x5466a4);}},_0x1e6a42={},_0x2ef78e=function(_0x5168ee,_0x2dcb9c){function _0x254dcf(_0x54d0dd){try{_0x5168ee[_0x7d23('0x23')]('qd-ssa-sku-no-selected')[_0x7d23('0x24')]('qd-ssa-sku-selected');var _0x39b805=_0x54d0dd[0x0][_0x7d23('0x25')][0x0]['AvailableQuantity'];_0x5168ee['attr'](_0x7d23('0x26'),_0x39b805);_0x5168ee[_0x7d23('0x27')](function(){var _0x5168ee=_0x344874(this)[_0x7d23('0x28')](_0x7d23('0x29'));if(0x1>_0x39b805)return _0x5168ee[_0x7d23('0x2a')]()[_0x7d23('0x24')](_0x7d23('0x2b'))[_0x7d23('0x23')](_0x7d23('0x2c'));var _0x54d0dd=_0x5168ee[_0x7d23('0x2d')](_0x7d23('0x2e')+_0x39b805+'\x22]');_0x54d0dd=_0x54d0dd['length']?_0x54d0dd:_0x5168ee[_0x7d23('0x2d')](_0x7d23('0x2f'));_0x5168ee[_0x7d23('0x2a')]()[_0x7d23('0x24')](_0x7d23('0x2b'))[_0x7d23('0x23')](_0x7d23('0x2c'));_0x54d0dd[_0x7d23('0x30')]((_0x54d0dd['html']()||'')['replace'](_0x7d23('0x31'),_0x39b805));_0x54d0dd['show']()[_0x7d23('0x24')](_0x7d23('0x2c'))[_0x7d23('0x23')]('qd-ssa-hide');});}catch(_0x46a040){_0x13fc02(['Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20',_0x46a040[_0x7d23('0x32')]]);}}if(_0x5168ee[_0x7d23('0x33')]){_0x5168ee['addClass'](_0x7d23('0x34'));_0x5168ee[_0x7d23('0x24')]('qd-ssa-sku-no-selected');try{_0x5168ee[_0x7d23('0x24')]('qd-ssa-skus-'+vtxctx[_0x7d23('0x35')]['split'](';')[_0x7d23('0x33')]);}catch(_0xe2b4a8){_0x13fc02([_0x7d23('0x36'),_0xe2b4a8[_0x7d23('0x32')]]);}_0x344874(window)['on']('vtex.sku.selected\x20QuatroDigital.ssa.skuSelected',function(_0x4e9058,_0x1abb87,_0x58e70d){try{_0x2dc07b(_0x58e70d[_0x7d23('0x37')],function(_0x4f14a0){_0x254dcf(_0x4f14a0);0x1===vtxctx[_0x7d23('0x35')][_0x7d23('0x38')](';')[_0x7d23('0x33')]&&0x0==_0x4f14a0[0x0][_0x7d23('0x25')][0x0][_0x7d23('0x39')]&&_0x344874(window)[_0x7d23('0x3a')](_0x7d23('0x3b'));});}catch(_0x492aa9){_0x13fc02([_0x7d23('0x3c'),_0x492aa9[_0x7d23('0x32')]]);}});_0x344874(window)[_0x7d23('0x3d')](_0x7d23('0x3e'));_0x344874(window)['on'](_0x7d23('0x3b'),function(){_0x5168ee[_0x7d23('0x24')](_0x7d23('0x3f'))[_0x7d23('0x2a')]();});}};_0x2e11d7=function(_0x547a81){var _0x4c3f1b={'a':_0x7d23('0x40')};return function(_0x4e7ecf){var _0x4d0069=function(_0x3f5be4){return _0x3f5be4;};var _0xa17cb3=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4e7ecf=_0x4e7ecf['d'+_0xa17cb3[0x10]+'c'+_0xa17cb3[0x11]+'m'+_0x4d0069(_0xa17cb3[0x1])+'n'+_0xa17cb3[0xd]]['l'+_0xa17cb3[0x12]+'c'+_0xa17cb3[0x0]+'ti'+_0x4d0069('o')+'n'];var _0x12307a=function(_0x46d3d3){return escape(encodeURIComponent(_0x46d3d3[_0x7d23('0x41')](/\./g,'¨')[_0x7d23('0x41')](/[a-zA-Z]/g,function(_0x24fa30){return String[_0x7d23('0x42')](('Z'>=_0x24fa30?0x5a:0x7a)>=(_0x24fa30=_0x24fa30[_0x7d23('0x43')](0x0)+0xd)?_0x24fa30:_0x24fa30-0x1a);})));};var _0x172c83=_0x12307a(_0x4e7ecf[[_0xa17cb3[0x9],_0x4d0069('o'),_0xa17cb3[0xc],_0xa17cb3[_0x4d0069(0xd)]][_0x7d23('0x44')]('')]);_0x12307a=_0x12307a((window[['js',_0x4d0069('no'),'m',_0xa17cb3[0x1],_0xa17cb3[0x4][_0x7d23('0x45')](),_0x7d23('0x46')][_0x7d23('0x44')]('')]||_0x7d23('0x47'))+['.v',_0xa17cb3[0xd],'e',_0x4d0069('x'),'co',_0x4d0069('mm'),_0x7d23('0x48'),_0xa17cb3[0x1],'.c',_0x4d0069('o'),'m.',_0xa17cb3[0x13],'r'][_0x7d23('0x44')](''));for(var _0x3213c7 in _0x4c3f1b){if(_0x12307a===_0x3213c7+_0x4c3f1b[_0x3213c7]||_0x172c83===_0x3213c7+_0x4c3f1b[_0x3213c7]){var _0x487547='tr'+_0xa17cb3[0x11]+'e';break;}_0x487547='f'+_0xa17cb3[0x0]+'ls'+_0x4d0069(_0xa17cb3[0x1])+'';}_0x4d0069=!0x1;-0x1<_0x4e7ecf[[_0xa17cb3[0xc],'e',_0xa17cb3[0x0],'rc',_0xa17cb3[0x9]][_0x7d23('0x44')]('')][_0x7d23('0x49')](_0x7d23('0x4a'))&&(_0x4d0069=!0x0);return[_0x487547,_0x4d0069];}(_0x547a81);}(window);if(!eval(_0x2e11d7[0x0]))return _0x2e11d7[0x1]?_0x13fc02(_0x7d23('0x4b')):!0x1;_0x344874['fn']['QD_smartStockAvailable']=function(_0x23d9fc){var _0x3ca868=_0x344874(this);_0x23d9fc=_0x344874[_0x7d23('0x4c')](!0x0,{},_0x1e6a42,_0x23d9fc);_0x3ca868[_0x7d23('0x4d')]=new _0x2ef78e(_0x3ca868,_0x23d9fc);try{'object'===typeof _0x344874['fn'][_0x7d23('0x1b')][_0x7d23('0x4e')]&&_0x344874(window)[_0x7d23('0x3a')](_0x7d23('0x4f'),[_0x344874['fn'][_0x7d23('0x1b')][_0x7d23('0x4e')][_0x7d23('0x50')],_0x344874['fn'][_0x7d23('0x1b')]['initialSkuSelected'][_0x7d23('0x37')]]);}catch(_0x55eeb6){_0x13fc02([_0x7d23('0x51'),_0x55eeb6[_0x7d23('0x32')]]);}_0x344874['fn'][_0x7d23('0x1b')]['unavailable']&&_0x344874(window)[_0x7d23('0x3a')](_0x7d23('0x3b'));return _0x3ca868;};_0x344874(window)['on'](_0x7d23('0x3e'),function(_0x2d0419,_0x4212b6,_0x39df84){try{_0x344874['fn']['QD_smartStockAvailable'][_0x7d23('0x4e')]={'prod':_0x4212b6,'sku':_0x39df84},_0x344874(this)['off'](_0x2d0419);}catch(_0x5e8639){_0x13fc02([_0x7d23('0x52'),_0x5e8639[_0x7d23('0x32')]]);}});_0x344874(window)['on'](_0x7d23('0x53'),function(_0x1ba2ad,_0x576add,_0x496fab){try{for(var _0x540b4f=_0x496fab[_0x7d23('0x33')],_0x17aabe=_0x576add=0x0;_0x17aabe<_0x540b4f&&!_0x496fab[_0x17aabe][_0x7d23('0x54')];_0x17aabe++)_0x576add+=0x1;_0x540b4f<=_0x576add&&(_0x344874['fn'][_0x7d23('0x1b')][_0x7d23('0x55')]=!0x0);_0x344874(this)[_0x7d23('0x3d')](_0x1ba2ad);}catch(_0x514137){_0x13fc02([_0x7d23('0x56'),_0x514137[_0x7d23('0x32')]]);}});_0x344874(function(){_0x344874('.qd_smart_stock_available_auto')['QD_smartStockAvailable']();});}}(window));
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
var _0x6f7a=['warn','unshift','alerta','aviso','info','toLowerCase','join','apply','qdAmAddNdx','addClass','first','last','qd-am-last','replace','charCodeAt','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','html','img[alt=\x27','attr','each','.box-banner','clone','insertBefore','hide','qd-am-content-loaded','text','data-qdam-value','[class*=\x27colunas\x27]','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','url','\x27\x20falho.','ajaxCallback','call','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','qd-am-has-ul','children','qd-am-elem-','trim','replaceSpecialChars','>li','qd-amazing-menu','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','add','qd-am-','trigger','QuatroDigital.am.callback','extend','exec','.qd_amazing_menu_auto','getParent','closest','function','QD_amazingMenu','/qd-amazing-menu','object','undefined','error'];(function(_0x2641f9,_0x26715f){var _0x585741=function(_0x2d1462){while(--_0x2d1462){_0x2641f9['push'](_0x2641f9['shift']());}};_0x585741(++_0x26715f);}(_0x6f7a,0x1ae));var _0xa6f7=function(_0x171aba,_0x2f36d6){_0x171aba=_0x171aba-0x0;var _0x47efa9=_0x6f7a[_0x171aba];return _0x47efa9;};(function(_0x31411a){_0x31411a['fn'][_0xa6f7('0x0')]=_0x31411a['fn'][_0xa6f7('0x1')];}(jQuery));(function(_0x982062){var _0x4dd99d;var _0x93614a=jQuery;if(_0xa6f7('0x2')!==typeof _0x93614a['fn'][_0xa6f7('0x3')]){var _0x1da6dc={'url':_0xa6f7('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0x1f5922=function(_0x35f8f0,_0x20cccd){if(_0xa6f7('0x5')===typeof console&&_0xa6f7('0x6')!==typeof console[_0xa6f7('0x7')]&&'undefined'!==typeof console['info']&&_0xa6f7('0x6')!==typeof console[_0xa6f7('0x8')]){var _0x397020;_0xa6f7('0x5')===typeof _0x35f8f0?(_0x35f8f0[_0xa6f7('0x9')]('[QD\x20Amazing\x20Menu]\x0a'),_0x397020=_0x35f8f0):_0x397020=['[QD\x20Amazing\x20Menu]\x0a'+_0x35f8f0];if(_0xa6f7('0x6')===typeof _0x20cccd||_0xa6f7('0xa')!==_0x20cccd['toLowerCase']()&&_0xa6f7('0xb')!==_0x20cccd['toLowerCase']())if(_0xa6f7('0x6')!==typeof _0x20cccd&&_0xa6f7('0xc')===_0x20cccd[_0xa6f7('0xd')]())try{console[_0xa6f7('0xc')]['apply'](console,_0x397020);}catch(_0x3fc7f1){try{console['info'](_0x397020[_0xa6f7('0xe')]('\x0a'));}catch(_0x68fd8a){}}else try{console[_0xa6f7('0x7')]['apply'](console,_0x397020);}catch(_0x34c02d){try{console['error'](_0x397020[_0xa6f7('0xe')]('\x0a'));}catch(_0x57308a){}}else try{console[_0xa6f7('0x8')][_0xa6f7('0xf')](console,_0x397020);}catch(_0x6efd38){try{console['warn'](_0x397020[_0xa6f7('0xe')]('\x0a'));}catch(_0x22635e){}}}};_0x93614a['fn'][_0xa6f7('0x10')]=function(){var _0x2401b9=_0x93614a(this);_0x2401b9['each'](function(_0x4a8827){_0x93614a(this)[_0xa6f7('0x11')]('qd-am-li-'+_0x4a8827);});_0x2401b9[_0xa6f7('0x12')]()[_0xa6f7('0x11')]('qd-am-first');_0x2401b9[_0xa6f7('0x13')]()[_0xa6f7('0x11')](_0xa6f7('0x14'));return _0x2401b9;};_0x93614a['fn'][_0xa6f7('0x3')]=function(){};_0x982062=function(_0x1f9d20){var _0x1aa8dc={'a':'vinyzvk%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x3c0c55){var _0x45d79e=function(_0x58b6a1){return _0x58b6a1;};var _0x5d1159=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3c0c55=_0x3c0c55['d'+_0x5d1159[0x10]+'c'+_0x5d1159[0x11]+'m'+_0x45d79e(_0x5d1159[0x1])+'n'+_0x5d1159[0xd]]['l'+_0x5d1159[0x12]+'c'+_0x5d1159[0x0]+'ti'+_0x45d79e('o')+'n'];var _0x5ddc8d=function(_0x1de6c9){return escape(encodeURIComponent(_0x1de6c9[_0xa6f7('0x15')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x51b71b){return String['fromCharCode'](('Z'>=_0x51b71b?0x5a:0x7a)>=(_0x51b71b=_0x51b71b[_0xa6f7('0x16')](0x0)+0xd)?_0x51b71b:_0x51b71b-0x1a);})));};var _0xc77e8e=_0x5ddc8d(_0x3c0c55[[_0x5d1159[0x9],_0x45d79e('o'),_0x5d1159[0xc],_0x5d1159[_0x45d79e(0xd)]][_0xa6f7('0xe')]('')]);_0x5ddc8d=_0x5ddc8d((window[['js',_0x45d79e('no'),'m',_0x5d1159[0x1],_0x5d1159[0x4]['toUpperCase'](),'ite'][_0xa6f7('0xe')]('')]||'---')+['.v',_0x5d1159[0xd],'e',_0x45d79e('x'),'co',_0x45d79e('mm'),'erc',_0x5d1159[0x1],'.c',_0x45d79e('o'),'m.',_0x5d1159[0x13],'r'][_0xa6f7('0xe')](''));for(var _0x5efdce in _0x1aa8dc){if(_0x5ddc8d===_0x5efdce+_0x1aa8dc[_0x5efdce]||_0xc77e8e===_0x5efdce+_0x1aa8dc[_0x5efdce]){var _0x35847e='tr'+_0x5d1159[0x11]+'e';break;}_0x35847e='f'+_0x5d1159[0x0]+'ls'+_0x45d79e(_0x5d1159[0x1])+'';}_0x45d79e=!0x1;-0x1<_0x3c0c55[[_0x5d1159[0xc],'e',_0x5d1159[0x0],'rc',_0x5d1159[0x9]][_0xa6f7('0xe')]('')][_0xa6f7('0x17')](_0xa6f7('0x18'))&&(_0x45d79e=!0x0);return[_0x35847e,_0x45d79e];}(_0x1f9d20);}(window);if(!eval(_0x982062[0x0]))return _0x982062[0x1]?_0x1f5922(_0xa6f7('0x19')):!0x1;var _0x4b8d2b=function(_0x51db47){var _0x1c419b=_0x51db47[_0xa6f7('0x1a')]('.qd_am_code');var _0x267917=_0x1c419b[_0xa6f7('0x1b')](_0xa6f7('0x1c'));var _0x3a7ff9=_0x1c419b[_0xa6f7('0x1b')](_0xa6f7('0x1d'));if(_0x267917[_0xa6f7('0x1e')]||_0x3a7ff9[_0xa6f7('0x1e')])_0x267917[_0xa6f7('0x1f')]()[_0xa6f7('0x11')](_0xa6f7('0x20')),_0x3a7ff9[_0xa6f7('0x1f')]()['addClass'](_0xa6f7('0x21')),_0x93614a[_0xa6f7('0x22')]({'url':_0x4dd99d['url'],'dataType':_0xa6f7('0x23'),'success':function(_0x34d571){var _0x4d79d8=_0x93614a(_0x34d571);_0x267917['each'](function(){var _0x34d571=_0x93614a(this);var _0x25dcad=_0x4d79d8[_0xa6f7('0x1a')](_0xa6f7('0x24')+_0x34d571[_0xa6f7('0x25')]('data-qdam-value')+'\x27]');_0x25dcad['length']&&(_0x25dcad[_0xa6f7('0x26')](function(){_0x93614a(this)['getParent'](_0xa6f7('0x27'))[_0xa6f7('0x28')]()[_0xa6f7('0x29')](_0x34d571);}),_0x34d571[_0xa6f7('0x2a')]());})[_0xa6f7('0x11')](_0xa6f7('0x2b'));_0x3a7ff9['each'](function(){var _0x34d571={};var _0xb1a7f8=_0x93614a(this);_0x4d79d8[_0xa6f7('0x1a')]('h2')['each'](function(){if(_0x93614a(this)[_0xa6f7('0x2c')]()['trim']()[_0xa6f7('0xd')]()==_0xb1a7f8[_0xa6f7('0x25')](_0xa6f7('0x2d'))['trim']()[_0xa6f7('0xd')]())return _0x34d571=_0x93614a(this),!0x1;});_0x34d571[_0xa6f7('0x1e')]&&(_0x34d571[_0xa6f7('0x26')](function(){_0x93614a(this)[_0xa6f7('0x0')](_0xa6f7('0x2e'))[_0xa6f7('0x28')]()['insertBefore'](_0xb1a7f8);}),_0xb1a7f8[_0xa6f7('0x2a')]());})[_0xa6f7('0x11')](_0xa6f7('0x2b'));},'error':function(){_0x1f5922(_0xa6f7('0x2f')+_0x4dd99d[_0xa6f7('0x30')]+_0xa6f7('0x31'));},'complete':function(){_0x4dd99d[_0xa6f7('0x32')][_0xa6f7('0x33')](this);_0x93614a(window)['trigger'](_0xa6f7('0x34'),_0x51db47);},'clearQueueDelay':0xbb8});};_0x93614a[_0xa6f7('0x3')]=function(_0x353e54){var _0x518088=_0x353e54[_0xa6f7('0x1a')](_0xa6f7('0x35'))['each'](function(){var _0x39349a=_0x93614a(this);if(!_0x39349a[_0xa6f7('0x1e')])return _0x1f5922([_0xa6f7('0x36'),_0x353e54],_0xa6f7('0xa'));_0x39349a[_0xa6f7('0x1a')]('li\x20>ul')[_0xa6f7('0x1f')]()[_0xa6f7('0x11')](_0xa6f7('0x37'));_0x39349a[_0xa6f7('0x1a')]('li')[_0xa6f7('0x26')](function(){var _0x1c60e3=_0x93614a(this);var _0x393eed=_0x1c60e3[_0xa6f7('0x38')](':not(ul)');_0x393eed['length']&&_0x1c60e3[_0xa6f7('0x11')](_0xa6f7('0x39')+_0x393eed[_0xa6f7('0x12')]()[_0xa6f7('0x2c')]()[_0xa6f7('0x3a')]()[_0xa6f7('0x3b')]()[_0xa6f7('0x15')](/\./g,'')[_0xa6f7('0x15')](/\s/g,'-')[_0xa6f7('0xd')]());});var _0x395ad7=_0x39349a['find'](_0xa6f7('0x3c'))[_0xa6f7('0x10')]();_0x39349a['addClass'](_0xa6f7('0x3d'));_0x395ad7=_0x395ad7[_0xa6f7('0x1a')](_0xa6f7('0x3e'));_0x395ad7[_0xa6f7('0x26')](function(){var _0x51de13=_0x93614a(this);_0x51de13[_0xa6f7('0x1a')]('>li')['qdAmAddNdx']()[_0xa6f7('0x11')](_0xa6f7('0x3f'));_0x51de13[_0xa6f7('0x11')](_0xa6f7('0x40'));_0x51de13[_0xa6f7('0x1f')]()[_0xa6f7('0x11')](_0xa6f7('0x41'));});_0x395ad7['addClass'](_0xa6f7('0x41'));var _0x40dbe6=0x0,_0x982062=function(_0x2026a9){_0x40dbe6+=0x1;_0x2026a9=_0x2026a9[_0xa6f7('0x38')]('li')[_0xa6f7('0x38')]('*');_0x2026a9['length']&&(_0x2026a9[_0xa6f7('0x11')]('qd-am-level-'+_0x40dbe6),_0x982062(_0x2026a9));};_0x982062(_0x39349a);_0x39349a[_0xa6f7('0x42')](_0x39349a[_0xa6f7('0x1a')]('ul'))[_0xa6f7('0x26')](function(){var _0x5f3c84=_0x93614a(this);_0x5f3c84['addClass'](_0xa6f7('0x43')+_0x5f3c84['children']('li')[_0xa6f7('0x1e')]+'-li');});});_0x4b8d2b(_0x518088);_0x4dd99d['callback'][_0xa6f7('0x33')](this);_0x93614a(window)[_0xa6f7('0x44')](_0xa6f7('0x45'),_0x353e54);};_0x93614a['fn'][_0xa6f7('0x3')]=function(_0x151de5){var _0x3bd4f6=_0x93614a(this);if(!_0x3bd4f6['length'])return _0x3bd4f6;_0x4dd99d=_0x93614a[_0xa6f7('0x46')]({},_0x1da6dc,_0x151de5);_0x3bd4f6[_0xa6f7('0x47')]=new _0x93614a['QD_amazingMenu'](_0x93614a(this));return _0x3bd4f6;};_0x93614a(function(){_0x93614a(_0xa6f7('0x48'))['QD_amazingMenu']();});}}(this));
/* Quatro Digital Smart Cart */
var _0x8e08=['removeItems','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','updateOnlyHover','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','avisso','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','.qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','qd-bap-item-added','prepend','.qdDdcContainer','QD_smartCart','selector','dropDown','buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','replace','abs','pow','round','toFixed','length','join','_QuatroDigital_CartData','callback','Callbacks','undefined','function','error','Oooops!\x20','message','object','info','warn','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','toLowerCase','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','vinyzvk%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','toUpperCase','ite','---','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','extend','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','name','smartCheckout','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','vtexjs','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','append','find','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','click.qd_ddc_closeFn','removeClass','body','qd-bb-lightBoxBodyProdAdd','off','keyCode','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','.qd-ddc-shipping\x20input','keyup.qd_ddc_cep','formatCepField','.qd-ddc-shipping\x20.qd-ddc-cep-btn','click','shippingCalculate','getCartInfoByUrl','simpleCart','texts','cartTotal','#value','#items','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','.qd-ddc-viewCart','html','linkCart','continueShopping','linkCheckout','.qd-ddc-shipping','.qd-ddc-emptyCart\x20p','emptyCart','cartContainer','each','clone','add','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','call','dataOptionsCache','timeRemoveNewItemClass','qd-ddc-prodLoaded','getOrderForm','_QuatroDigital_AmountProduct','exec','.qd-ddc-wrapper','addClass','QD_checkoutQueue','totalizers','shippingData','Este\x20método\x20esta\x20descontinuado!','cartIsEmpty','qd-ddc-noItems','renderProductsList','.qd-ddc-prodWrapper2','empty','productCategoryIds','attr','availability','.qd-ddc-prodName','skuName','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','content','.qd-ddc-quantity','val','quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','address','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','aviso','actionButtons','lastSku','[data-sku=\x27','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','forceImageHTTPS','string','http','https','load','qd-loaded','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','changeQantity','data-sku-index','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','preventDefault','qd-loading','.qd-ddc-quantityMinus','focusout.qd_ddc_change','keyup.qd_ddc_change','.qd-ddc-prodRow','click.qd_ddc_remove','removeProduct','stop','slideUp','remove','data','qdDdcLastPostalCode','BRA','done','logisticsInfo','shippingEstimate','\x20dia\x20útil','<ul\x20class=\x22qd-dd-cep-slas\x22></ul>','<li>','\x20-\x20R$\x20','price','\x20-\x20Até\x20','</li>','parent','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho'];(function(_0x2a4095,_0x13f4f0){var _0x52eeab=function(_0x3950dd){while(--_0x3950dd){_0x2a4095['push'](_0x2a4095['shift']());}};_0x52eeab(++_0x13f4f0);}(_0x8e08,0xf9));var _0x88e0=function(_0x2728b9,_0x535cb2){_0x2728b9=_0x2728b9-0x0;var _0x469405=_0x8e08[_0x2728b9];return _0x469405;};(function(_0x173518){_0x173518['fn'][_0x88e0('0x0')]=_0x173518['fn']['closest'];}(jQuery));function qd_number_format(_0x333474,_0x3e6c11,_0x337378,_0x533fc9){_0x333474=(_0x333474+'')[_0x88e0('0x1')](/[^0-9+\-Ee.]/g,'');_0x333474=isFinite(+_0x333474)?+_0x333474:0x0;_0x3e6c11=isFinite(+_0x3e6c11)?Math[_0x88e0('0x2')](_0x3e6c11):0x0;_0x533fc9='undefined'===typeof _0x533fc9?',':_0x533fc9;_0x337378='undefined'===typeof _0x337378?'.':_0x337378;var _0x455c61='',_0x455c61=function(_0x3a636c,_0x5a24a3){var _0x3e6c11=Math[_0x88e0('0x3')](0xa,_0x5a24a3);return''+(Math[_0x88e0('0x4')](_0x3a636c*_0x3e6c11)/_0x3e6c11)[_0x88e0('0x5')](_0x5a24a3);},_0x455c61=(_0x3e6c11?_0x455c61(_0x333474,_0x3e6c11):''+Math['round'](_0x333474))['split']('.');0x3<_0x455c61[0x0]['length']&&(_0x455c61[0x0]=_0x455c61[0x0][_0x88e0('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x533fc9));(_0x455c61[0x1]||'')['length']<_0x3e6c11&&(_0x455c61[0x1]=_0x455c61[0x1]||'',_0x455c61[0x1]+=Array(_0x3e6c11-_0x455c61[0x1][_0x88e0('0x6')]+0x1)['join']('0'));return _0x455c61[_0x88e0('0x7')](_0x337378);};(function(){try{window['_QuatroDigital_CartData']=window[_0x88e0('0x8')]||{},window[_0x88e0('0x8')][_0x88e0('0x9')]=window['_QuatroDigital_CartData']['callback']||$[_0x88e0('0xa')]();}catch(_0x5104ba){_0x88e0('0xb')!==typeof console&&_0x88e0('0xc')===typeof console[_0x88e0('0xd')]&&console[_0x88e0('0xd')](_0x88e0('0xe'),_0x5104ba[_0x88e0('0xf')]);}}());(function(_0x4321c6){try{var _0x46fc61=jQuery,_0x3439a8=function(_0x413135,_0x739ed2){if(_0x88e0('0x10')===typeof console&&_0x88e0('0xb')!==typeof console[_0x88e0('0xd')]&&'undefined'!==typeof console[_0x88e0('0x11')]&&_0x88e0('0xb')!==typeof console[_0x88e0('0x12')]){var _0x53d48e;_0x88e0('0x10')===typeof _0x413135?(_0x413135['unshift'](_0x88e0('0x13')),_0x53d48e=_0x413135):_0x53d48e=[_0x88e0('0x13')+_0x413135];if(_0x88e0('0xb')===typeof _0x739ed2||_0x88e0('0x14')!==_0x739ed2['toLowerCase']()&&'aviso'!==_0x739ed2[_0x88e0('0x15')]())if(_0x88e0('0xb')!==typeof _0x739ed2&&_0x88e0('0x11')===_0x739ed2[_0x88e0('0x15')]())try{console[_0x88e0('0x11')][_0x88e0('0x16')](console,_0x53d48e);}catch(_0x343715){try{console[_0x88e0('0x11')](_0x53d48e['join']('\x0a'));}catch(_0x442376){}}else try{console[_0x88e0('0xd')][_0x88e0('0x16')](console,_0x53d48e);}catch(_0x5a7f39){try{console[_0x88e0('0xd')](_0x53d48e[_0x88e0('0x7')]('\x0a'));}catch(_0x350c4c){}}else try{console[_0x88e0('0x12')][_0x88e0('0x16')](console,_0x53d48e);}catch(_0x266302){try{console[_0x88e0('0x12')](_0x53d48e['join']('\x0a'));}catch(_0x5551c1){}}}};window['_QuatroDigital_DropDown']=window[_0x88e0('0x17')]||{};window[_0x88e0('0x17')][_0x88e0('0x18')]=!0x0;_0x46fc61['QD_dropDownCart']=function(){};_0x46fc61['fn'][_0x88e0('0x19')]=function(){return{'fn':new _0x46fc61()};};var _0x442a52=function(_0xde6196){var _0x302bf1={'a':_0x88e0('0x1a')};return function(_0x401bb2){var _0x279087=function(_0x553136){return _0x553136;};var _0x2759e5=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x401bb2=_0x401bb2['d'+_0x2759e5[0x10]+'c'+_0x2759e5[0x11]+'m'+_0x279087(_0x2759e5[0x1])+'n'+_0x2759e5[0xd]]['l'+_0x2759e5[0x12]+'c'+_0x2759e5[0x0]+'ti'+_0x279087('o')+'n'];var _0x459300=function(_0x280c95){return escape(encodeURIComponent(_0x280c95[_0x88e0('0x1')](/\./g,'¨')[_0x88e0('0x1')](/[a-zA-Z]/g,function(_0xbdb85f){return String['fromCharCode'](('Z'>=_0xbdb85f?0x5a:0x7a)>=(_0xbdb85f=_0xbdb85f[_0x88e0('0x1b')](0x0)+0xd)?_0xbdb85f:_0xbdb85f-0x1a);})));};var _0x185b27=_0x459300(_0x401bb2[[_0x2759e5[0x9],_0x279087('o'),_0x2759e5[0xc],_0x2759e5[_0x279087(0xd)]]['join']('')]);_0x459300=_0x459300((window[['js',_0x279087('no'),'m',_0x2759e5[0x1],_0x2759e5[0x4][_0x88e0('0x1c')](),_0x88e0('0x1d')][_0x88e0('0x7')]('')]||_0x88e0('0x1e'))+['.v',_0x2759e5[0xd],'e',_0x279087('x'),'co',_0x279087('mm'),'erc',_0x2759e5[0x1],'.c',_0x279087('o'),'m.',_0x2759e5[0x13],'r'][_0x88e0('0x7')](''));for(var _0x2f08ec in _0x302bf1){if(_0x459300===_0x2f08ec+_0x302bf1[_0x2f08ec]||_0x185b27===_0x2f08ec+_0x302bf1[_0x2f08ec]){var _0x4ba3d2='tr'+_0x2759e5[0x11]+'e';break;}_0x4ba3d2='f'+_0x2759e5[0x0]+'ls'+_0x279087(_0x2759e5[0x1])+'';}_0x279087=!0x1;-0x1<_0x401bb2[[_0x2759e5[0xc],'e',_0x2759e5[0x0],'rc',_0x2759e5[0x9]][_0x88e0('0x7')]('')][_0x88e0('0x1f')](_0x88e0('0x20'))&&(_0x279087=!0x0);return[_0x4ba3d2,_0x279087];}(_0xde6196);}(window);if(!eval(_0x442a52[0x0]))return _0x442a52[0x1]?_0x3439a8('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x46fc61[_0x88e0('0x19')]=function(_0x2a7ad1,_0x3c3fb6){var _0x2c05fb=_0x46fc61(_0x2a7ad1);if(!_0x2c05fb[_0x88e0('0x6')])return _0x2c05fb;var _0x37a783=_0x46fc61[_0x88e0('0x21')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x88e0('0x22'),'linkCheckout':_0x88e0('0x23'),'cartTotal':_0x88e0('0x24'),'emptyCart':'Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','continueShopping':'Continuar\x20Comprando','shippingForm':'<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>\x20<button\x20class=\x22qd-ddc-cep-btn\x22>Calcular</button>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'forceImageHTTPS':!0x1,'skuName':function(_0x5ee952){return _0x5ee952['skuName']||_0x5ee952[_0x88e0('0x25')];},'callback':function(){},'callbackProductsList':function(){}},_0x3c3fb6);_0x46fc61('');var _0x3c5c95=this;if(_0x37a783[_0x88e0('0x26')]){var _0x65c0f=!0x1;_0x88e0('0xb')===typeof window['vtexjs']&&(_0x3439a8('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN'),_0x46fc61[_0x88e0('0x27')]({'url':_0x88e0('0x28'),'async':!0x1,'dataType':_0x88e0('0x29'),'error':function(){_0x3439a8(_0x88e0('0x2a'));_0x65c0f=!0x0;}}));if(_0x65c0f)return _0x3439a8(_0x88e0('0x2b'));}if('object'===typeof window['vtexjs']&&_0x88e0('0xb')!==typeof window[_0x88e0('0x2c')][_0x88e0('0x2d')])var _0x4321c6=window[_0x88e0('0x2c')]['checkout'];else if(_0x88e0('0x10')===typeof vtex&&'object'===typeof vtex[_0x88e0('0x2d')]&&_0x88e0('0xb')!==typeof vtex['checkout'][_0x88e0('0x2e')])_0x4321c6=new vtex[(_0x88e0('0x2d'))]['SDK']();else return _0x3439a8(_0x88e0('0x2f'));_0x3c5c95['cartContainer']='<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>';var _0x5c4c00=function(_0x1b66de){_0x46fc61(this)[_0x88e0('0x30')](_0x1b66de);_0x1b66de[_0x88e0('0x31')](_0x88e0('0x32'))['add'](_0x46fc61('.qd_ddc_lightBoxOverlay'))['on'](_0x88e0('0x33'),function(){_0x2c05fb[_0x88e0('0x34')]('qd-bb-lightBoxProdAdd');_0x46fc61(document[_0x88e0('0x35')])['removeClass'](_0x88e0('0x36'));});_0x46fc61(document)[_0x88e0('0x37')]('keyup.qd_ddc_closeFn')['on']('keyup.qd_ddc_closeFn',function(_0x35597d){0x1b==_0x35597d[_0x88e0('0x38')]&&(_0x2c05fb[_0x88e0('0x34')]('qd-bb-lightBoxProdAdd'),_0x46fc61(document['body'])[_0x88e0('0x34')]('qd-bb-lightBoxBodyProdAdd'));});var _0x1f3c00=_0x1b66de['find'](_0x88e0('0x39'));_0x1b66de[_0x88e0('0x31')](_0x88e0('0x3a'))['on'](_0x88e0('0x3b'),function(){_0x3c5c95[_0x88e0('0x3c')]('-',void 0x0,void 0x0,_0x1f3c00);return!0x1;});_0x1b66de['find'](_0x88e0('0x3d'))['on']('click.qd_ddc_scrollDown',function(){_0x3c5c95['scrollCart'](void 0x0,void 0x0,void 0x0,_0x1f3c00);return!0x1;});_0x1b66de['find'](_0x88e0('0x3e'))['val']('')['on'](_0x88e0('0x3f'),function(_0x1e202a){_0x3c5c95[_0x88e0('0x40')](_0x46fc61(this));0xd==_0x1e202a[_0x88e0('0x38')]&&_0x1b66de[_0x88e0('0x31')](_0x88e0('0x41'))[_0x88e0('0x42')]();});_0x1b66de['find']('.qd-ddc-shipping\x20.qd-ddc-cep-btn')[_0x88e0('0x42')](function(){_0x3c5c95[_0x88e0('0x43')](_0x1b66de[_0x88e0('0x31')](_0x88e0('0x3e')));});if(_0x37a783['updateOnlyHover']){var _0x2e9cb4=0x0;_0x46fc61(this)['on']('mouseenter.qd_ddc_hover',function(){var _0x1b66de=function(){window['_QuatroDigital_DropDown'][_0x88e0('0x18')]&&(_0x3c5c95[_0x88e0('0x44')](),window[_0x88e0('0x17')][_0x88e0('0x18')]=!0x1,_0x46fc61['fn'][_0x88e0('0x45')](!0x0),_0x3c5c95['cartIsEmpty']());};_0x2e9cb4=setInterval(function(){_0x1b66de();},0x258);_0x1b66de();});_0x46fc61(this)['on']('mouseleave.qd_ddc_hover',function(){clearInterval(_0x2e9cb4);});}};var _0x18537b=function(_0xa58186){_0xa58186=_0x46fc61(_0xa58186);_0x37a783[_0x88e0('0x46')]['cartTotal']=_0x37a783[_0x88e0('0x46')][_0x88e0('0x47')][_0x88e0('0x1')](_0x88e0('0x48'),'<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>');_0x37a783[_0x88e0('0x46')][_0x88e0('0x47')]=_0x37a783[_0x88e0('0x46')]['cartTotal'][_0x88e0('0x1')](_0x88e0('0x49'),'<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>');_0x37a783['texts'][_0x88e0('0x47')]=_0x37a783[_0x88e0('0x46')][_0x88e0('0x47')]['replace']('#shipping',_0x88e0('0x4a'));_0x37a783[_0x88e0('0x46')]['cartTotal']=_0x37a783['texts'][_0x88e0('0x47')][_0x88e0('0x1')](_0x88e0('0x4b'),'<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0xa58186[_0x88e0('0x31')](_0x88e0('0x4c'))[_0x88e0('0x4d')](_0x37a783[_0x88e0('0x46')][_0x88e0('0x4e')]);_0xa58186[_0x88e0('0x31')]('.qd_ddc_continueShopping')['html'](_0x37a783[_0x88e0('0x46')][_0x88e0('0x4f')]);_0xa58186[_0x88e0('0x31')]('.qd-ddc-checkout')[_0x88e0('0x4d')](_0x37a783['texts'][_0x88e0('0x50')]);_0xa58186[_0x88e0('0x31')]('.qd-ddc-infoTotal')['html'](_0x37a783[_0x88e0('0x46')][_0x88e0('0x47')]);_0xa58186[_0x88e0('0x31')](_0x88e0('0x51'))['html'](_0x37a783[_0x88e0('0x46')]['shippingForm']);_0xa58186[_0x88e0('0x31')](_0x88e0('0x52'))[_0x88e0('0x4d')](_0x37a783[_0x88e0('0x46')][_0x88e0('0x53')]);return _0xa58186;}(this[_0x88e0('0x54')]);var _0x1bcfbf=0x0;_0x2c05fb[_0x88e0('0x55')](function(){0x0<_0x1bcfbf?_0x5c4c00['call'](this,_0x18537b[_0x88e0('0x56')]()):_0x5c4c00['call'](this,_0x18537b);_0x1bcfbf++;});window[_0x88e0('0x8')][_0x88e0('0x9')][_0x88e0('0x57')](function(){_0x46fc61('.qd-ddc-infoTotalValue')[_0x88e0('0x4d')](window[_0x88e0('0x8')]['total']||'--');_0x46fc61(_0x88e0('0x58'))[_0x88e0('0x4d')](window['_QuatroDigital_CartData'][_0x88e0('0x59')]||'0');_0x46fc61(_0x88e0('0x5a'))[_0x88e0('0x4d')](window['_QuatroDigital_CartData'][_0x88e0('0x5b')]||'--');_0x46fc61(_0x88e0('0x5c'))[_0x88e0('0x4d')](window['_QuatroDigital_CartData']['allTotal']||'--');});var _0xd448e=function(_0x342675,_0x40df99){if(_0x88e0('0xb')===typeof _0x342675[_0x88e0('0x5d')])return _0x3439a8(_0x88e0('0x5e'));_0x3c5c95['renderProductsList'][_0x88e0('0x5f')](this,_0x40df99);};_0x3c5c95[_0x88e0('0x44')]=function(_0x50ca8b,_0x707503){_0x88e0('0xb')!=typeof _0x707503?window[_0x88e0('0x17')][_0x88e0('0x60')]=_0x707503:window[_0x88e0('0x17')][_0x88e0('0x60')]&&(_0x707503=window[_0x88e0('0x17')][_0x88e0('0x60')]);setTimeout(function(){window[_0x88e0('0x17')][_0x88e0('0x60')]=void 0x0;},_0x37a783[_0x88e0('0x61')]);_0x46fc61('.qd-ddc-wrapper')[_0x88e0('0x34')](_0x88e0('0x62'));if(_0x37a783['smartCheckout']){var _0x279eb7=function(_0x49b184){window[_0x88e0('0x17')][_0x88e0('0x63')]=_0x49b184;_0xd448e(_0x49b184,_0x707503);_0x88e0('0xb')!==typeof window[_0x88e0('0x64')]&&_0x88e0('0xc')===typeof window[_0x88e0('0x64')][_0x88e0('0x65')]&&window[_0x88e0('0x64')]['exec'][_0x88e0('0x5f')](this);_0x46fc61(_0x88e0('0x66'))[_0x88e0('0x67')]('qd-ddc-prodLoaded');};_0x88e0('0xb')!==typeof window[_0x88e0('0x17')][_0x88e0('0x63')]?(_0x279eb7(window['_QuatroDigital_DropDown'][_0x88e0('0x63')]),_0x88e0('0xc')===typeof _0x50ca8b&&_0x50ca8b(window[_0x88e0('0x17')]['getOrderForm'])):_0x46fc61[_0x88e0('0x68')]([_0x88e0('0x5d'),_0x88e0('0x69'),_0x88e0('0x6a')],{'done':function(_0x58a59f){_0x279eb7[_0x88e0('0x5f')](this,_0x58a59f);'function'===typeof _0x50ca8b&&_0x50ca8b(_0x58a59f);},'fail':function(_0x3de8f9){_0x3439a8(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0x3de8f9]);}});}else alert(_0x88e0('0x6b'));};_0x3c5c95[_0x88e0('0x6c')]=function(){var _0x2ea7b5=_0x46fc61(_0x88e0('0x66'));_0x2ea7b5[_0x88e0('0x31')]('.qd-ddc-prodRow')[_0x88e0('0x6')]?_0x2ea7b5[_0x88e0('0x34')](_0x88e0('0x6d')):_0x2ea7b5[_0x88e0('0x67')](_0x88e0('0x6d'));};_0x3c5c95[_0x88e0('0x6e')]=function(_0x2c1f8b){var _0x3c3fb6=_0x46fc61(_0x88e0('0x6f'));_0x3c3fb6[_0x88e0('0x70')]();_0x3c3fb6[_0x88e0('0x55')](function(){var _0x3c3fb6=_0x46fc61(this),_0x83101a,_0x31962a,_0x41b02a=_0x46fc61(''),_0x13061f;for(_0x13061f in window[_0x88e0('0x17')][_0x88e0('0x63')]['items'])if(_0x88e0('0x10')===typeof window[_0x88e0('0x17')][_0x88e0('0x63')][_0x88e0('0x5d')][_0x13061f]){var _0x2cff6f=window[_0x88e0('0x17')][_0x88e0('0x63')]['items'][_0x13061f];var _0x2a7ad1=_0x2cff6f[_0x88e0('0x71')][_0x88e0('0x1')](/^\/|\/$/g,'')['split']('/');var _0x455642=_0x46fc61('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0x455642[_0x88e0('0x72')]({'data-sku':_0x2cff6f['id'],'data-sku-index':_0x13061f,'data-qd-departament':_0x2a7ad1[0x0],'data-qd-category':_0x2a7ad1[_0x2a7ad1['length']-0x1]});_0x455642[_0x88e0('0x67')]('qd-ddc-'+_0x2cff6f[_0x88e0('0x73')]);_0x455642[_0x88e0('0x31')](_0x88e0('0x74'))[_0x88e0('0x30')](_0x37a783[_0x88e0('0x75')](_0x2cff6f));_0x455642[_0x88e0('0x31')](_0x88e0('0x76'))['append'](isNaN(_0x2cff6f['sellingPrice'])?_0x2cff6f[_0x88e0('0x77')]:0x0==_0x2cff6f['sellingPrice']?_0x88e0('0x78'):(_0x46fc61(_0x88e0('0x79'))[_0x88e0('0x72')](_0x88e0('0x7a'))||'R$')+'\x20'+qd_number_format(_0x2cff6f['sellingPrice']/0x64,0x2,',','.'));_0x455642[_0x88e0('0x31')](_0x88e0('0x7b'))['attr']({'data-sku':_0x2cff6f['id'],'data-sku-index':_0x13061f})[_0x88e0('0x7c')](_0x2cff6f[_0x88e0('0x7d')]);_0x455642[_0x88e0('0x31')](_0x88e0('0x7e'))[_0x88e0('0x72')]({'data-sku':_0x2cff6f['id'],'data-sku-index':_0x13061f});_0x3c5c95[_0x88e0('0x7f')](_0x2cff6f['id'],_0x455642[_0x88e0('0x31')]('.qd-ddc-image'),_0x2cff6f['imageUrl']);_0x455642['find'](_0x88e0('0x80'))[_0x88e0('0x72')]({'data-sku':_0x2cff6f['id'],'data-sku-index':_0x13061f});_0x455642['appendTo'](_0x3c3fb6);_0x41b02a=_0x41b02a[_0x88e0('0x57')](_0x455642);}try{var _0x560891=_0x3c3fb6[_0x88e0('0x0')](_0x88e0('0x66'))[_0x88e0('0x31')](_0x88e0('0x3e'));_0x560891[_0x88e0('0x6')]&&''==_0x560891[_0x88e0('0x7c')]()&&window[_0x88e0('0x17')][_0x88e0('0x63')]['shippingData'][_0x88e0('0x81')]&&_0x560891[_0x88e0('0x7c')](window[_0x88e0('0x17')]['getOrderForm'][_0x88e0('0x6a')]['address']['postalCode']);}catch(_0x263f78){_0x3439a8(_0x88e0('0x82')+_0x263f78['message'],_0x88e0('0x83'));}_0x3c5c95[_0x88e0('0x84')](_0x3c3fb6);_0x3c5c95[_0x88e0('0x6c')]();_0x2c1f8b&&_0x2c1f8b[_0x88e0('0x85')]&&function(){_0x31962a=_0x41b02a['filter'](_0x88e0('0x86')+_0x2c1f8b[_0x88e0('0x85')]+'\x27]');_0x31962a['length']&&(_0x83101a=0x0,_0x41b02a[_0x88e0('0x55')](function(){var _0x2c1f8b=_0x46fc61(this);if(_0x2c1f8b['is'](_0x31962a))return!0x1;_0x83101a+=_0x2c1f8b[_0x88e0('0x87')]();}),_0x3c5c95[_0x88e0('0x3c')](void 0x0,void 0x0,_0x83101a,_0x3c3fb6[_0x88e0('0x57')](_0x3c3fb6['parent']())),_0x41b02a[_0x88e0('0x34')](_0x88e0('0x88')),function(_0x14b870){_0x14b870[_0x88e0('0x67')](_0x88e0('0x89'));_0x14b870[_0x88e0('0x67')](_0x88e0('0x88'));setTimeout(function(){_0x14b870[_0x88e0('0x34')](_0x88e0('0x89'));},_0x37a783[_0x88e0('0x61')]);}(_0x31962a),_0x46fc61(document[_0x88e0('0x35')])[_0x88e0('0x67')](_0x88e0('0x8a')),setTimeout(function(){_0x46fc61(document[_0x88e0('0x35')])['removeClass'](_0x88e0('0x8a'));},_0x37a783[_0x88e0('0x61')]));}();});(function(){_QuatroDigital_DropDown[_0x88e0('0x63')][_0x88e0('0x5d')][_0x88e0('0x6')]?(_0x46fc61('body')[_0x88e0('0x34')](_0x88e0('0x8b'))['addClass'](_0x88e0('0x8c')),setTimeout(function(){_0x46fc61(_0x88e0('0x35'))[_0x88e0('0x34')](_0x88e0('0x8d'));},_0x37a783['timeRemoveNewItemClass'])):_0x46fc61(_0x88e0('0x35'))[_0x88e0('0x34')]('qd-ddc-cart-rendered')[_0x88e0('0x67')](_0x88e0('0x8b'));}());_0x88e0('0xc')===typeof _0x37a783[_0x88e0('0x8e')]?_0x37a783[_0x88e0('0x8e')][_0x88e0('0x5f')](this):_0x3439a8(_0x88e0('0x8f'));};_0x3c5c95['insertProdImg']=function(_0x314f94,_0xba65f7,_0x547861){function _0x231916(){_0x37a783[_0x88e0('0x90')]&&_0x88e0('0x91')==typeof _0x547861&&(_0x547861=_0x547861['replace'](_0x88e0('0x92'),_0x88e0('0x93')));_0xba65f7[_0x88e0('0x34')]('qd-loaded')[_0x88e0('0x94')](function(){_0x46fc61(this)[_0x88e0('0x67')](_0x88e0('0x95'));})[_0x88e0('0x72')](_0x88e0('0x96'),_0x547861);}_0x547861?_0x231916():isNaN(_0x314f94)?_0x3439a8(_0x88e0('0x97'),_0x88e0('0x14')):alert(_0x88e0('0x98'));};_0x3c5c95[_0x88e0('0x84')]=function(_0x5b19fd){var _0x2bf129=function(_0x1be862,_0x439aff){var _0x3c3fb6=_0x46fc61(_0x1be862);var _0x3db871=_0x3c3fb6['attr'](_0x88e0('0x99'));var _0x2a7ad1=_0x3c3fb6[_0x88e0('0x72')]('data-sku-index');if(_0x3db871){var _0x267f41=parseInt(_0x3c3fb6[_0x88e0('0x7c')]())||0x1;_0x3c5c95[_0x88e0('0x9a')]([_0x3db871,_0x2a7ad1],_0x267f41,_0x267f41+0x1,function(_0x176e79){_0x3c3fb6[_0x88e0('0x7c')](_0x176e79);_0x88e0('0xc')===typeof _0x439aff&&_0x439aff();});}};var _0x3c3fb6=function(_0x3c3d82,_0x9570f3){var _0x1e6aeb=_0x46fc61(_0x3c3d82);var _0x23edd3=_0x1e6aeb['attr'](_0x88e0('0x99'));var _0x3c5db9=_0x1e6aeb[_0x88e0('0x72')](_0x88e0('0x9b'));if(_0x23edd3){var _0x2a7ad1=parseInt(_0x1e6aeb['val']())||0x2;_0x3c5c95[_0x88e0('0x9a')]([_0x23edd3,_0x3c5db9],_0x2a7ad1,_0x2a7ad1-0x1,function(_0x1b799b){_0x1e6aeb[_0x88e0('0x7c')](_0x1b799b);_0x88e0('0xc')===typeof _0x9570f3&&_0x9570f3();});}};var _0x4140e8=function(_0x5ada18,_0x28b087){var _0x3c3fb6=_0x46fc61(_0x5ada18);var _0x5dd4ce=_0x3c3fb6[_0x88e0('0x72')](_0x88e0('0x99'));var _0x2a7ad1=_0x3c3fb6['attr'](_0x88e0('0x9b'));if(_0x5dd4ce){var _0x3f8b87=parseInt(_0x3c3fb6[_0x88e0('0x7c')]())||0x1;_0x3c5c95['changeQantity']([_0x5dd4ce,_0x2a7ad1],0x1,_0x3f8b87,function(_0x5aedf4){_0x3c3fb6[_0x88e0('0x7c')](_0x5aedf4);_0x88e0('0xc')===typeof _0x28b087&&_0x28b087();});}};var _0x2a7ad1=_0x5b19fd['find'](_0x88e0('0x9c'));_0x2a7ad1[_0x88e0('0x67')](_0x88e0('0x9d'))[_0x88e0('0x55')](function(){var _0x5b19fd=_0x46fc61(this);_0x5b19fd[_0x88e0('0x31')](_0x88e0('0x9e'))['on'](_0x88e0('0x9f'),function(_0x1a00d0){_0x1a00d0[_0x88e0('0xa0')]();_0x2a7ad1[_0x88e0('0x67')](_0x88e0('0xa1'));_0x2bf129(_0x5b19fd[_0x88e0('0x31')](_0x88e0('0x7b')),function(){_0x2a7ad1[_0x88e0('0x34')](_0x88e0('0xa1'));});});_0x5b19fd['find'](_0x88e0('0xa2'))['on']('click.qd_ddc_minus',function(_0xf30745){_0xf30745['preventDefault']();_0x2a7ad1[_0x88e0('0x67')](_0x88e0('0xa1'));_0x3c3fb6(_0x5b19fd[_0x88e0('0x31')](_0x88e0('0x7b')),function(){_0x2a7ad1['removeClass'](_0x88e0('0xa1'));});});_0x5b19fd[_0x88e0('0x31')](_0x88e0('0x7b'))['on'](_0x88e0('0xa3'),function(){_0x2a7ad1[_0x88e0('0x67')](_0x88e0('0xa1'));_0x4140e8(this,function(){_0x2a7ad1['removeClass'](_0x88e0('0xa1'));});});_0x5b19fd[_0x88e0('0x31')](_0x88e0('0x7b'))['on'](_0x88e0('0xa4'),function(_0x524e34){0xd==_0x524e34[_0x88e0('0x38')]&&(_0x2a7ad1[_0x88e0('0x67')]('qd-loading'),_0x4140e8(this,function(){_0x2a7ad1[_0x88e0('0x34')](_0x88e0('0xa1'));}));});});_0x5b19fd[_0x88e0('0x31')](_0x88e0('0xa5'))['each'](function(){var _0x5b19fd=_0x46fc61(this);_0x5b19fd[_0x88e0('0x31')](_0x88e0('0x7e'))['on'](_0x88e0('0xa6'),function(){_0x5b19fd['addClass'](_0x88e0('0xa1'));_0x3c5c95[_0x88e0('0xa7')](_0x46fc61(this),function(_0xc4a6a1){_0xc4a6a1?_0x5b19fd[_0x88e0('0xa8')](!0x0)[_0x88e0('0xa9')](function(){_0x5b19fd[_0x88e0('0xaa')]();_0x3c5c95[_0x88e0('0x6c')]();}):_0x5b19fd[_0x88e0('0x34')](_0x88e0('0xa1'));});return!0x1;});});};_0x3c5c95[_0x88e0('0x40')]=function(_0x37eb4f){var _0x3d0911=_0x37eb4f[_0x88e0('0x7c')]();_0x3d0911=_0x3d0911[_0x88e0('0x1')](/[^0-9\-]/g,'');_0x3d0911=_0x3d0911[_0x88e0('0x1')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3');_0x3d0911=_0x3d0911[_0x88e0('0x1')](/(.{9}).*/g,'$1');_0x37eb4f[_0x88e0('0x7c')](_0x3d0911);};_0x3c5c95['shippingCalculate']=function(_0x87fa6a){var _0x3c3fb6=_0x87fa6a[_0x88e0('0x7c')]();0x9<=_0x3c3fb6[_0x88e0('0x6')]&&(_0x87fa6a[_0x88e0('0xab')](_0x88e0('0xac'))!=_0x3c3fb6&&_0x4321c6['calculateShipping']({'postalCode':_0x3c3fb6,'country':_0x88e0('0xad')})[_0x88e0('0xae')](function(_0x2ec4a3){window['_QuatroDigital_DropDown']['getOrderForm']=_0x2ec4a3;_0x3c5c95['getCartInfoByUrl']();_0x2ec4a3=_0x2ec4a3['shippingData'][_0x88e0('0xaf')][0x0]['slas'];for(var _0x36ddc7=0x0;_0x36ddc7<_0x2ec4a3[_0x88e0('0x6')];_0x36ddc7++){var _0x2a7ad1=_0x2ec4a3[_0x36ddc7],_0x574689=0x1<_0x2a7ad1[_0x88e0('0xb0')]?_0x2a7ad1['shippingEstimate'][_0x88e0('0x1')]('bd',_0x88e0('0xb1')):_0x2a7ad1[_0x88e0('0xb0')][_0x88e0('0x1')]('bd','\x20dias\x20útéis'),_0x11d699=_0x46fc61(_0x88e0('0xb2'));_0x11d699[_0x88e0('0x30')](_0x88e0('0xb3')+_0x2a7ad1[_0x88e0('0x25')]+_0x88e0('0xb4')+qd_number_format(_0x2a7ad1[_0x88e0('0xb5')]/0x64,0x2,',','.')+_0x88e0('0xb6')+_0x574689+_0x88e0('0xb7'));_0x87fa6a[_0x88e0('0xb8')]()['append'](_0x11d699);}})[_0x88e0('0xb9')](function(_0x144cf7){_0x3439a8([_0x88e0('0xba'),_0x144cf7]);updateCartData();}),_0x87fa6a[_0x88e0('0xab')](_0x88e0('0xac'),_0x3c3fb6));};_0x3c5c95[_0x88e0('0x9a')]=function(_0x2cc10d,_0x14044d,_0x2049af,_0x515530){function _0x1c7b80(_0x320a78){_0x320a78='boolean'!==typeof _0x320a78?!0x1:_0x320a78;_0x3c5c95[_0x88e0('0x44')]();window[_0x88e0('0x17')]['allowUpdate']=!0x1;_0x3c5c95['cartIsEmpty']();'undefined'!==typeof window[_0x88e0('0x64')]&&_0x88e0('0xc')===typeof window[_0x88e0('0x64')][_0x88e0('0x65')]&&window[_0x88e0('0x64')][_0x88e0('0x65')][_0x88e0('0x5f')](this);_0x88e0('0xc')===typeof adminCart&&adminCart();_0x46fc61['fn'][_0x88e0('0x45')](!0x0,void 0x0,_0x320a78);_0x88e0('0xc')===typeof _0x515530&&_0x515530(_0x14044d);}_0x2049af=_0x2049af||0x1;if(0x1>_0x2049af)return _0x14044d;if(_0x37a783[_0x88e0('0x26')]){if('undefined'===typeof window[_0x88e0('0x17')][_0x88e0('0x63')][_0x88e0('0x5d')][_0x2cc10d[0x1]])return _0x3439a8(_0x88e0('0xbb')+_0x2cc10d[0x1]+']'),_0x14044d;window['_QuatroDigital_DropDown'][_0x88e0('0x63')][_0x88e0('0x5d')][_0x2cc10d[0x1]][_0x88e0('0x7d')]=_0x2049af;window['_QuatroDigital_DropDown'][_0x88e0('0x63')][_0x88e0('0x5d')][_0x2cc10d[0x1]][_0x88e0('0xbc')]=_0x2cc10d[0x1];_0x4321c6[_0x88e0('0xbd')]([window[_0x88e0('0x17')][_0x88e0('0x63')][_0x88e0('0x5d')][_0x2cc10d[0x1]]],[_0x88e0('0x5d'),_0x88e0('0x69'),'shippingData'])['done'](function(_0x9820bb){window['_QuatroDigital_DropDown'][_0x88e0('0x63')]=_0x9820bb;_0x1c7b80(!0x0);})[_0x88e0('0xb9')](function(_0x17e7c8){_0x3439a8([_0x88e0('0xbe'),_0x17e7c8]);_0x1c7b80();});}else _0x3439a8('atenção\x20esta\x20método\x20esta\x20descontinuado');};_0x3c5c95[_0x88e0('0xa7')]=function(_0x4464cf,_0x2aad84){function _0x3d9600(_0x315c5e){_0x315c5e='boolean'!==typeof _0x315c5e?!0x1:_0x315c5e;'undefined'!==typeof window[_0x88e0('0x64')]&&_0x88e0('0xc')===typeof window[_0x88e0('0x64')][_0x88e0('0x65')]&&window['_QuatroDigital_AmountProduct'][_0x88e0('0x65')][_0x88e0('0x5f')](this);'function'===typeof adminCart&&adminCart();_0x46fc61['fn'][_0x88e0('0x45')](!0x0,void 0x0,_0x315c5e);'function'===typeof _0x2aad84&&_0x2aad84(_0x2a7ad1);}var _0x2a7ad1=!0x1,_0x3531ff=_0x46fc61(_0x4464cf)[_0x88e0('0x72')]('data-sku-index');if(_0x37a783[_0x88e0('0x26')]){if(_0x88e0('0xb')===typeof window[_0x88e0('0x17')]['getOrderForm'][_0x88e0('0x5d')][_0x3531ff])return _0x3439a8(_0x88e0('0xbb')+_0x3531ff+']'),_0x2a7ad1;window['_QuatroDigital_DropDown'][_0x88e0('0x63')][_0x88e0('0x5d')][_0x3531ff]['index']=_0x3531ff;_0x4321c6[_0x88e0('0xbf')]([window['_QuatroDigital_DropDown'][_0x88e0('0x63')][_0x88e0('0x5d')][_0x3531ff]],['items','totalizers',_0x88e0('0x6a')])[_0x88e0('0xae')](function(_0x52fc06){_0x2a7ad1=!0x0;window[_0x88e0('0x17')][_0x88e0('0x63')]=_0x52fc06;_0xd448e(_0x52fc06);_0x3d9600(!0x0);})[_0x88e0('0xb9')](function(_0x599d78){_0x3439a8(['Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho',_0x599d78]);_0x3d9600();});}else alert(_0x88e0('0xc0'));};_0x3c5c95[_0x88e0('0x3c')]=function(_0x40602a,_0x1d7a09,_0x1c0739,_0x4afbdd){_0x4afbdd=_0x4afbdd||_0x46fc61(_0x88e0('0xc1'));_0x40602a=_0x40602a||'+';_0x1d7a09=_0x1d7a09||0.9*_0x4afbdd[_0x88e0('0xc2')]();_0x4afbdd['stop'](!0x0,!0x0)[_0x88e0('0xc3')]({'scrollTop':isNaN(_0x1c0739)?_0x40602a+'='+_0x1d7a09+'px':_0x1c0739});};_0x37a783[_0x88e0('0xc4')]||(_0x3c5c95[_0x88e0('0x44')](),_0x46fc61['fn'][_0x88e0('0x45')](!0x0));_0x46fc61(window)['on'](_0x88e0('0xc5'),function(){try{window[_0x88e0('0x17')][_0x88e0('0x63')]=void 0x0,_0x3c5c95[_0x88e0('0x44')]();}catch(_0x4f78ec){_0x3439a8('Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20'+_0x4f78ec[_0x88e0('0xf')],_0x88e0('0xc6'));}});_0x88e0('0xc')===typeof _0x37a783[_0x88e0('0x9')]?_0x37a783[_0x88e0('0x9')][_0x88e0('0x5f')](this):_0x3439a8(_0x88e0('0xc7'));};_0x46fc61['fn'][_0x88e0('0x19')]=function(_0x11350c){var _0x260954=_0x46fc61(this);_0x260954['fn']=new _0x46fc61['QD_dropDownCart'](this,_0x11350c);return _0x260954;};}catch(_0x303ded){_0x88e0('0xb')!==typeof console&&_0x88e0('0xc')===typeof console['error']&&console['error'](_0x88e0('0xe'),_0x303ded);}}(this));(function(_0x5d307d){try{var _0x214b1d=jQuery;window[_0x88e0('0x64')]=window['_QuatroDigital_AmountProduct']||{};window['_QuatroDigital_AmountProduct'][_0x88e0('0x5d')]={};window[_0x88e0('0x64')][_0x88e0('0xc8')]=!0x1;window[_0x88e0('0x64')][_0x88e0('0xc9')]=!0x1;window[_0x88e0('0x64')][_0x88e0('0xca')]=!0x1;var _0x2b2f55=function(){if(window['_QuatroDigital_AmountProduct'][_0x88e0('0xc8')]){var _0x516b49=!0x1;var _0x3d8d45={};window['_QuatroDigital_AmountProduct'][_0x88e0('0x5d')]={};for(_0x5376e5 in window[_0x88e0('0x17')][_0x88e0('0x63')]['items'])if('object'===typeof window[_0x88e0('0x17')][_0x88e0('0x63')][_0x88e0('0x5d')][_0x5376e5]){var _0x8f684=window[_0x88e0('0x17')][_0x88e0('0x63')][_0x88e0('0x5d')][_0x5376e5];_0x88e0('0xb')!==typeof _0x8f684[_0x88e0('0xcb')]&&null!==_0x8f684[_0x88e0('0xcb')]&&''!==_0x8f684[_0x88e0('0xcb')]&&(window[_0x88e0('0x64')][_0x88e0('0x5d')]['prod_'+_0x8f684['productId']]=window[_0x88e0('0x64')][_0x88e0('0x5d')][_0x88e0('0xcc')+_0x8f684[_0x88e0('0xcb')]]||{},window[_0x88e0('0x64')][_0x88e0('0x5d')][_0x88e0('0xcc')+_0x8f684['productId']][_0x88e0('0xcd')]=_0x8f684[_0x88e0('0xcb')],_0x3d8d45[_0x88e0('0xcc')+_0x8f684[_0x88e0('0xcb')]]||(window[_0x88e0('0x64')]['items']['prod_'+_0x8f684[_0x88e0('0xcb')]][_0x88e0('0x59')]=0x0),window['_QuatroDigital_AmountProduct'][_0x88e0('0x5d')][_0x88e0('0xcc')+_0x8f684[_0x88e0('0xcb')]][_0x88e0('0x59')]+=_0x8f684[_0x88e0('0x7d')],_0x516b49=!0x0,_0x3d8d45[_0x88e0('0xcc')+_0x8f684[_0x88e0('0xcb')]]=!0x0);}var _0x5376e5=_0x516b49;}else _0x5376e5=void 0x0;window[_0x88e0('0x64')]['allowRecalculate']&&(_0x214b1d(_0x88e0('0xce'))[_0x88e0('0xaa')](),_0x214b1d(_0x88e0('0xcf'))[_0x88e0('0x34')]('qd-bap-item-added'));for(var _0x398b8f in window[_0x88e0('0x64')][_0x88e0('0x5d')]){_0x8f684=window[_0x88e0('0x64')][_0x88e0('0x5d')][_0x398b8f];if(_0x88e0('0x10')!==typeof _0x8f684)return;_0x3d8d45=_0x214b1d(_0x88e0('0xd0')+_0x8f684['prodId']+']')['getParent']('li');if(window[_0x88e0('0x64')][_0x88e0('0xc8')]||!_0x3d8d45['find'](_0x88e0('0xce'))['length'])_0x516b49=_0x214b1d(_0x88e0('0xd1')),_0x516b49[_0x88e0('0x31')](_0x88e0('0xd2'))[_0x88e0('0x4d')](_0x8f684['qtt']),_0x8f684=_0x3d8d45[_0x88e0('0x31')]('.qd_bap_wrapper_content'),_0x8f684[_0x88e0('0x6')]?_0x8f684['prepend'](_0x516b49)[_0x88e0('0x67')](_0x88e0('0xd3')):_0x3d8d45[_0x88e0('0xd4')](_0x516b49);}_0x5376e5&&(window['_QuatroDigital_AmountProduct'][_0x88e0('0xc8')]=!0x1);};window[_0x88e0('0x64')][_0x88e0('0x65')]=function(){window[_0x88e0('0x64')][_0x88e0('0xc8')]=!0x0;_0x2b2f55['call'](this);};_0x214b1d(document)['ajaxStop'](function(){_0x2b2f55[_0x88e0('0x5f')](this);});}catch(_0x4a7c5b){_0x88e0('0xb')!==typeof console&&'function'===typeof console[_0x88e0('0xd')]&&console[_0x88e0('0xd')](_0x88e0('0xe'),_0x4a7c5b);}}(this));(function(){try{var _0x587d88=jQuery,_0x4d39c4,_0x2134d6={'selector':_0x88e0('0xd5'),'dropDown':{},'buyButton':{}};_0x587d88[_0x88e0('0xd6')]=function(_0x2d587f){var _0x4e4c9d={};_0x4d39c4=_0x587d88[_0x88e0('0x21')](!0x0,{},_0x2134d6,_0x2d587f);_0x2d587f=_0x587d88(_0x4d39c4[_0x88e0('0xd7')])['QD_dropDownCart'](_0x4d39c4[_0x88e0('0xd8')]);_0x4e4c9d[_0x88e0('0xd9')]=_0x88e0('0xb')!==typeof _0x4d39c4[_0x88e0('0xd8')][_0x88e0('0xc4')]&&!0x1===_0x4d39c4['dropDown'][_0x88e0('0xc4')]?_0x587d88(_0x4d39c4['selector'])['QD_buyButton'](_0x2d587f['fn'],_0x4d39c4[_0x88e0('0xd9')]):_0x587d88(_0x4d39c4['selector'])['QD_buyButton'](_0x4d39c4['buyButton']);_0x4e4c9d[_0x88e0('0xd8')]=_0x2d587f;return _0x4e4c9d;};_0x587d88['fn'][_0x88e0('0xda')]=function(){_0x88e0('0x10')===typeof console&&_0x88e0('0xc')===typeof console[_0x88e0('0x11')]&&console[_0x88e0('0x11')](_0x88e0('0xdb'));};_0x587d88['smartCart']=_0x587d88['fn'][_0x88e0('0xda')];}catch(_0x817d0a){_0x88e0('0xb')!==typeof console&&_0x88e0('0xc')===typeof console[_0x88e0('0xd')]&&console[_0x88e0('0xd')](_0x88e0('0xe'),_0x817d0a);}}());
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
var _0x4745=['fromCharCode','charCodeAt','join','ite','erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','object','undefined','info','warn','unshift','alerta','aviso','toLowerCase','apply','error','.qd_sil_img_wrapper','300','imageWrapper','not','find','img:visible','length','scrollTop','top','height','function','qd-sil-image-loaded','attr','src','sizes','width','addClass','qd-sil-image','qd-sil-on','offset','bottom','push','each','extend','QD_SIL_scrollRange','scroll','trigger','QD_SIL_scroll','QD_smartImageLoad','replace'];(function(_0x46cac1,_0x705ddd){var _0x458e29=function(_0x29d7f0){while(--_0x29d7f0){_0x46cac1['push'](_0x46cac1['shift']());}};_0x458e29(++_0x705ddd);}(_0x4745,0x147));var _0x5474=function(_0x55f8b4,_0x43f30d){_0x55f8b4=_0x55f8b4-0x0;var _0x2475f9=_0x4745[_0x55f8b4];return _0x2475f9;};(function(_0x3957aa){'use strict';var _0x71e55b=jQuery;if(typeof _0x71e55b['fn'][_0x5474('0x0')]==='function')return;_0x71e55b['fn'][_0x5474('0x0')]=function(){};var _0x15b388=function(_0xff0dcc){var _0x4963cd={'a':'vinyzvk%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x57ae3d){var _0x1e02c9,_0x34f4ce,_0x3d0116,_0x281d9a;_0x34f4ce=function(_0x14ec7b){return _0x14ec7b;};_0x3d0116=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x57ae3d=_0x57ae3d['d'+_0x3d0116[0x10]+'c'+_0x3d0116[0x11]+'m'+_0x34f4ce(_0x3d0116[0x1])+'n'+_0x3d0116[0xd]]['l'+_0x3d0116[0x12]+'c'+_0x3d0116[0x0]+'ti'+_0x34f4ce('o')+'n'];_0x1e02c9=function(_0x5407b7){return escape(encodeURIComponent(_0x5407b7['replace'](/\./g,'¨')[_0x5474('0x1')](/[a-zA-Z]/g,function(_0x165649){return String[_0x5474('0x2')](('Z'>=_0x165649?0x5a:0x7a)>=(_0x165649=_0x165649[_0x5474('0x3')](0x0)+0xd)?_0x165649:_0x165649-0x1a);})));};var _0x311a50=_0x1e02c9(_0x57ae3d[[_0x3d0116[0x9],_0x34f4ce('o'),_0x3d0116[0xc],_0x3d0116[_0x34f4ce(0xd)]][_0x5474('0x4')]('')]);_0x1e02c9=_0x1e02c9((window[['js',_0x34f4ce('no'),'m',_0x3d0116[0x1],_0x3d0116[0x4]['toUpperCase'](),_0x5474('0x5')][_0x5474('0x4')]('')]||'---')+['.v',_0x3d0116[0xd],'e',_0x34f4ce('x'),'co',_0x34f4ce('mm'),_0x5474('0x6'),_0x3d0116[0x1],'.c',_0x34f4ce('o'),'m.',_0x3d0116[0x13],'r']['join'](''));for(var _0x26eb9d in _0x4963cd){if(_0x1e02c9===_0x26eb9d+_0x4963cd[_0x26eb9d]||_0x311a50===_0x26eb9d+_0x4963cd[_0x26eb9d]){_0x281d9a='tr'+_0x3d0116[0x11]+'e';break;}_0x281d9a='f'+_0x3d0116[0x0]+'ls'+_0x34f4ce(_0x3d0116[0x1])+'';}_0x34f4ce=!0x1;-0x1<_0x57ae3d[[_0x3d0116[0xc],'e',_0x3d0116[0x0],'rc',_0x3d0116[0x9]][_0x5474('0x4')]('')][_0x5474('0x7')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x34f4ce=!0x0);return[_0x281d9a,_0x34f4ce];}(_0xff0dcc);}(window);if(!eval(_0x15b388[0x0]))return _0x15b388[0x1]?_0x1ed6c9(_0x5474('0x8')):!0x1;var _0x21a52d='Quatro\x20Digital\x20-\x20Smart\x20Image\x20Load';var _0x1ed6c9=function(_0x10ae9d,_0x5495aa){if(_0x5474('0x9')===typeof console&&_0x5474('0xa')!==typeof console['error']&&'undefined'!==typeof console[_0x5474('0xb')]&&_0x5474('0xa')!==typeof console[_0x5474('0xc')]){if('object'==typeof _0x10ae9d&&'function'==typeof _0x10ae9d[_0x5474('0xd')]){_0x10ae9d['unshift']('['+_0x21a52d+']\x0a');var _0x4c49ac=_0x10ae9d;}else _0x4c49ac=['['+_0x21a52d+']\x0a',_0x10ae9d];if(_0x5474('0xa')==typeof _0x5495aa||_0x5474('0xe')!==_0x5495aa['toLowerCase']()&&_0x5474('0xf')!==_0x5495aa[_0x5474('0x10')]())if(_0x5474('0xa')!=typeof _0x5495aa&&_0x5474('0xb')==_0x5495aa['toLowerCase']())try{console['info'][_0x5474('0x11')](console,_0x4c49ac);}catch(_0x391a45){try{console[_0x5474('0xb')](_0x4c49ac[_0x5474('0x4')]('\x0a'));}catch(_0x70c5fc){}}else try{console[_0x5474('0x12')][_0x5474('0x11')](console,_0x4c49ac);}catch(_0x4b63e9){try{console[_0x5474('0x12')](_0x4c49ac[_0x5474('0x4')]('\x0a'));}catch(_0xe949c3){}}else try{console[_0x5474('0xc')]['apply'](console,_0x4c49ac);}catch(_0x185097){try{console[_0x5474('0xc')](_0x4c49ac['join']('\x0a'));}catch(_0x39d6f6){}}}};var _0xc59a37=/(ids\/[0-9]+-)[0-9-]+/i;var _0x4677c6={'imageWrapper':_0x5474('0x13'),'sizes':{'width':_0x5474('0x14'),'height':_0x5474('0x14')}};var _0x46ea64=function(_0x24bb42,_0x1ecffb){'use strict';_0x570eb0();_0x71e55b(window)['on']('QD_SIL_scroll\x20QuatroDigital.is_Callback',_0x570eb0);function _0x570eb0(){try{var _0x136539=_0x24bb42['find'](_0x1ecffb[_0x5474('0x15')])[_0x5474('0x16')]('.qd-sil-on')[_0x5474('0x17')](_0x5474('0x18'));if(!_0x136539[_0x5474('0x19')])return;var _0x1ed382=_0x71e55b(window);var _0x4f4c42={'top':_0x1ed382[_0x5474('0x1a')]()};_0x4f4c42['bottom']=_0x4f4c42[_0x5474('0x1b')]+_0x1ed382[_0x5474('0x1c')]();var _0x25ef6f=_0x136539['first']()[_0x5474('0x1c')]();var _0x1e75fa=_0x533b20(_0x136539,_0x4f4c42,_0x25ef6f);for(var _0x4e9f86=0x0;_0x4e9f86<_0x1e75fa[_0x5474('0x19')];_0x4e9f86++)_0x12dd9a(_0x71e55b(_0x1e75fa[_0x4e9f86]));}catch(_0x2ea163){typeof console!==_0x5474('0xa')&&typeof console[_0x5474('0x12')]===_0x5474('0x1d')&&console[_0x5474('0x12')]('Problemas\x20:(\x20.\x20Detalhes:\x20',_0x2ea163);}}function _0x12dd9a(_0x133b54){var _0x5cfef0=_0x133b54['clone']();_0x5cfef0['on']('load',function(){_0x71e55b(this)['addClass'](_0x5474('0x1e'));});_0x5cfef0[_0x5474('0x1f')]({'src':_0x5cfef0[0x0][_0x5474('0x20')][_0x5474('0x1')](_0xc59a37,'$1'+_0x1ecffb[_0x5474('0x21')][_0x5474('0x22')]+'-'+_0x1ecffb['sizes']['height']),'width':_0x1ecffb[_0x5474('0x21')][_0x5474('0x22')],'height':_0x1ecffb[_0x5474('0x21')][_0x5474('0x1c')]});_0x5cfef0[_0x5474('0x23')](_0x5474('0x24'))['insertAfter'](_0x133b54);_0x5cfef0['closest'](_0x1ecffb['imageWrapper'])['addClass'](_0x5474('0x25'));}function _0x533b20(_0x426720,_0x1a5d1f,_0x4e3693){var _0x13fcf9;var _0x103358=[];for(var _0x30ff11=0x0;_0x30ff11<_0x426720[_0x5474('0x19')];_0x30ff11++){_0x13fcf9=_0x71e55b(_0x426720[_0x30ff11])[_0x5474('0x26')]();_0x13fcf9['bottom']=_0x13fcf9['top']+_0x4e3693;if(!(_0x1a5d1f[_0x5474('0x27')]<_0x13fcf9[_0x5474('0x1b')]||_0x1a5d1f[_0x5474('0x1b')]>_0x13fcf9[_0x5474('0x27')])){_0x103358[_0x5474('0x28')](_0x426720[_0x30ff11]);}}return _0x103358;};};_0x71e55b['fn'][_0x5474('0x0')]=function(_0x1edfb6){var _0x51ae9f=_0x71e55b(this);if(!_0x51ae9f[_0x5474('0x19')])return _0x51ae9f;_0x51ae9f[_0x5474('0x29')](function(){var _0x1bcf5e=_0x71e55b(this);_0x1bcf5e['QD_smartImageLoad']=new _0x46ea64(_0x1bcf5e,_0x71e55b[_0x5474('0x2a')]({},_0x4677c6,_0x1edfb6));});return _0x51ae9f;};window[_0x5474('0x2b')]=0x28;var _0x228a29=QD_SIL_scrollRange;var _0x18c074=0x0;_0x71e55b(window)['on'](_0x5474('0x2c'),function(){var _0x3d869f=document['documentElement'][_0x5474('0x1a')];if(_0x3d869f>_0x18c074+_0x228a29||_0x3d869f<_0x18c074-_0x228a29){_0x71e55b(window)[_0x5474('0x2d')](_0x5474('0x2e'));_0x18c074=_0x3d869f;}});}(this));
