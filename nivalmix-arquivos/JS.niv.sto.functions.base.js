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
				$t.text(($t.text().trim().match(/[0-9]+/) || [""]).pop() + '%');
			});
		},
		applyMosaicCategorieBanners: function () {
			$('.mosaic-categories-qd-v1-wrapper > .box-banner').QD_mosaicBanners({
				bannerColSecurityMargin: 0,
				containerWidth: 1336,
				classFourColumn: "col-xs-12 col-sm-6 col-md-3"
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
		init: function() {},
		ajaxStop: function() {},
		windowOnload: function() {}
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
var _0x4edd=['qd-ssa-skus-','skus','split','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','QuatroDigital.ssa.prodUnavailable','off','vtex.sku.selected.QD','qd-ssa-sku-prod-unavailable','vinyzvk%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','join','erc','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','initialSkuSelected','trigger','prod','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','unavailable','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','available','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','function','qdAjax','url','opts','push','success','call','error','parameters','callbackFns','successPopulated','boolean','errorPopulated','completePopulated','extend','object','complete','clearQueueDelay','jqXHR','readyState','data','textStatus','errorThrown','version','/produto/sku/','QD_smartStockAvailable','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','alerta','toLowerCase','aviso','undefined','info','apply','removeClass','qd-ssa-sku-no-selected','qd-ssa-sku-selected','SkuSellersInformation','AvailableQuantity','each','find','hide','qd-ssa-hide','filter','length','addClass','qd-ssa-show','html','replace','#qtt','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','message','qd-ssa-on'];(function(_0x3e20a9,_0x2dcc47){var _0xa7212f=function(_0x11e69a){while(--_0x11e69a){_0x3e20a9['push'](_0x3e20a9['shift']());}};_0xa7212f(++_0x2dcc47);}(_0x4edd,0x1ac));var _0xd4ed=function(_0x3dd15e,_0x1f0015){_0x3dd15e=_0x3dd15e-0x0;var _0x231fd0=_0x4edd[_0x3dd15e];return _0x231fd0;};(function(_0x1bd6e4){if(_0xd4ed('0x0')!==typeof _0x1bd6e4['qdAjax']){var _0x4a48e2={};_0x1bd6e4['qdAjaxQueue']=_0x4a48e2;_0x1bd6e4[_0xd4ed('0x1')]=function(_0xf96c9e){var _0x3ab6b7=_0x1bd6e4['extend']({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0xf96c9e);var _0x2b6142=escape(encodeURIComponent(_0x3ab6b7[_0xd4ed('0x2')]));_0x4a48e2[_0x2b6142]=_0x4a48e2[_0x2b6142]||{};_0x4a48e2[_0x2b6142][_0xd4ed('0x3')]=_0x4a48e2[_0x2b6142][_0xd4ed('0x3')]||[];_0x4a48e2[_0x2b6142]['opts'][_0xd4ed('0x4')]({'success':function(_0x24d631,_0x599362,_0x1c0e74){_0x3ab6b7[_0xd4ed('0x5')][_0xd4ed('0x6')](this,_0x24d631,_0x599362,_0x1c0e74);},'error':function(_0x4460b9,_0x4e09bd,_0x3f113c){_0x3ab6b7[_0xd4ed('0x7')]['call'](this,_0x4460b9,_0x4e09bd,_0x3f113c);},'complete':function(_0xf3ae31,_0x381ece){_0x3ab6b7['complete'][_0xd4ed('0x6')](this,_0xf3ae31,_0x381ece);}});_0x4a48e2[_0x2b6142][_0xd4ed('0x8')]=_0x4a48e2[_0x2b6142][_0xd4ed('0x8')]||{'success':{},'error':{},'complete':{}};_0x4a48e2[_0x2b6142]['callbackFns']=_0x4a48e2[_0x2b6142]['callbackFns']||{};_0x4a48e2[_0x2b6142][_0xd4ed('0x9')][_0xd4ed('0xa')]=_0xd4ed('0xb')===typeof _0x4a48e2[_0x2b6142][_0xd4ed('0x9')]['successPopulated']?_0x4a48e2[_0x2b6142][_0xd4ed('0x9')][_0xd4ed('0xa')]:!0x1;_0x4a48e2[_0x2b6142][_0xd4ed('0x9')][_0xd4ed('0xc')]=_0xd4ed('0xb')===typeof _0x4a48e2[_0x2b6142][_0xd4ed('0x9')]['errorPopulated']?_0x4a48e2[_0x2b6142][_0xd4ed('0x9')][_0xd4ed('0xc')]:!0x1;_0x4a48e2[_0x2b6142][_0xd4ed('0x9')][_0xd4ed('0xd')]=_0xd4ed('0xb')===typeof _0x4a48e2[_0x2b6142][_0xd4ed('0x9')][_0xd4ed('0xd')]?_0x4a48e2[_0x2b6142]['callbackFns'][_0xd4ed('0xd')]:!0x1;_0xf96c9e=_0x1bd6e4[_0xd4ed('0xe')]({},_0x3ab6b7,{'success':function(_0xecde48,_0x388bb7,_0x4a9bd7){_0x4a48e2[_0x2b6142]['parameters']['success']={'data':_0xecde48,'textStatus':_0x388bb7,'jqXHR':_0x4a9bd7};_0x4a48e2[_0x2b6142]['callbackFns'][_0xd4ed('0xa')]=!0x0;for(var _0x3901e0 in _0x4a48e2[_0x2b6142][_0xd4ed('0x3')])_0xd4ed('0xf')===typeof _0x4a48e2[_0x2b6142]['opts'][_0x3901e0]&&(_0x4a48e2[_0x2b6142][_0xd4ed('0x3')][_0x3901e0]['success'][_0xd4ed('0x6')](this,_0xecde48,_0x388bb7,_0x4a9bd7),_0x4a48e2[_0x2b6142][_0xd4ed('0x3')][_0x3901e0][_0xd4ed('0x5')]=function(){});},'error':function(_0x4d0254,_0x1eef1a,_0x2115f6){_0x4a48e2[_0x2b6142]['parameters'][_0xd4ed('0x7')]={'errorThrown':_0x2115f6,'textStatus':_0x1eef1a,'jqXHR':_0x4d0254};_0x4a48e2[_0x2b6142][_0xd4ed('0x9')][_0xd4ed('0xc')]=!0x0;for(var _0x29b5e2 in _0x4a48e2[_0x2b6142][_0xd4ed('0x3')])_0xd4ed('0xf')===typeof _0x4a48e2[_0x2b6142][_0xd4ed('0x3')][_0x29b5e2]&&(_0x4a48e2[_0x2b6142][_0xd4ed('0x3')][_0x29b5e2]['error'][_0xd4ed('0x6')](this,_0x4d0254,_0x1eef1a,_0x2115f6),_0x4a48e2[_0x2b6142][_0xd4ed('0x3')][_0x29b5e2][_0xd4ed('0x7')]=function(){});},'complete':function(_0x56cecf,_0x50b07e){_0x4a48e2[_0x2b6142]['parameters'][_0xd4ed('0x10')]={'textStatus':_0x50b07e,'jqXHR':_0x56cecf};_0x4a48e2[_0x2b6142][_0xd4ed('0x9')][_0xd4ed('0xd')]=!0x0;for(var _0x26e363 in _0x4a48e2[_0x2b6142]['opts'])'object'===typeof _0x4a48e2[_0x2b6142]['opts'][_0x26e363]&&(_0x4a48e2[_0x2b6142][_0xd4ed('0x3')][_0x26e363][_0xd4ed('0x10')][_0xd4ed('0x6')](this,_0x56cecf,_0x50b07e),_0x4a48e2[_0x2b6142]['opts'][_0x26e363][_0xd4ed('0x10')]=function(){});isNaN(parseInt(_0x3ab6b7[_0xd4ed('0x11')]))||setTimeout(function(){_0x4a48e2[_0x2b6142][_0xd4ed('0x12')]=void 0x0;_0x4a48e2[_0x2b6142]['opts']=void 0x0;_0x4a48e2[_0x2b6142][_0xd4ed('0x8')]=void 0x0;_0x4a48e2[_0x2b6142][_0xd4ed('0x9')]=void 0x0;},_0x3ab6b7['clearQueueDelay']);}});'undefined'===typeof _0x4a48e2[_0x2b6142][_0xd4ed('0x12')]?_0x4a48e2[_0x2b6142][_0xd4ed('0x12')]=_0x1bd6e4['ajax'](_0xf96c9e):_0x4a48e2[_0x2b6142][_0xd4ed('0x12')]&&_0x4a48e2[_0x2b6142][_0xd4ed('0x12')][_0xd4ed('0x13')]&&0x4==_0x4a48e2[_0x2b6142][_0xd4ed('0x12')][_0xd4ed('0x13')]&&(_0x4a48e2[_0x2b6142][_0xd4ed('0x9')][_0xd4ed('0xa')]&&_0xf96c9e[_0xd4ed('0x5')](_0x4a48e2[_0x2b6142][_0xd4ed('0x8')][_0xd4ed('0x5')][_0xd4ed('0x14')],_0x4a48e2[_0x2b6142][_0xd4ed('0x8')][_0xd4ed('0x5')][_0xd4ed('0x15')],_0x4a48e2[_0x2b6142][_0xd4ed('0x8')]['success'][_0xd4ed('0x12')]),_0x4a48e2[_0x2b6142]['callbackFns']['errorPopulated']&&_0xf96c9e[_0xd4ed('0x7')](_0x4a48e2[_0x2b6142][_0xd4ed('0x8')][_0xd4ed('0x7')][_0xd4ed('0x12')],_0x4a48e2[_0x2b6142]['parameters']['error'][_0xd4ed('0x15')],_0x4a48e2[_0x2b6142][_0xd4ed('0x8')]['error'][_0xd4ed('0x16')]),_0x4a48e2[_0x2b6142]['callbackFns'][_0xd4ed('0xd')]&&_0xf96c9e[_0xd4ed('0x10')](_0x4a48e2[_0x2b6142]['parameters']['complete'][_0xd4ed('0x12')],_0x4a48e2[_0x2b6142][_0xd4ed('0x8')][_0xd4ed('0x10')][_0xd4ed('0x15')]));};_0x1bd6e4[_0xd4ed('0x1')][_0xd4ed('0x17')]='2.1';}}(jQuery));(function(_0x72c0dc){function _0x417877(_0x2b875f,_0x422d2c){_0x381e22[_0xd4ed('0x1')]({'url':_0xd4ed('0x18')+_0x2b875f,'clearQueueDelay':null,'success':_0x422d2c,'error':function(){_0x3fc3ed('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!');}});}var _0x381e22=jQuery;if('function'!==typeof _0x381e22['fn'][_0xd4ed('0x19')]){var _0x3fc3ed=function(_0x3dc387,_0x3a1a26){if(_0xd4ed('0xf')===typeof console){var _0x5b6bcc;_0xd4ed('0xf')===typeof _0x3dc387?(_0x3dc387['unshift'](_0xd4ed('0x1a')),_0x5b6bcc=_0x3dc387):_0x5b6bcc=[_0xd4ed('0x1a')+_0x3dc387];'undefined'===typeof _0x3a1a26||_0xd4ed('0x1b')!==_0x3a1a26[_0xd4ed('0x1c')]()&&_0xd4ed('0x1d')!==_0x3a1a26['toLowerCase']()?_0xd4ed('0x1e')!==typeof _0x3a1a26&&_0xd4ed('0x1f')===_0x3a1a26[_0xd4ed('0x1c')]()?console[_0xd4ed('0x1f')][_0xd4ed('0x20')](console,_0x5b6bcc):console[_0xd4ed('0x7')][_0xd4ed('0x20')](console,_0x5b6bcc):console['warn'][_0xd4ed('0x20')](console,_0x5b6bcc);}},_0x2a99ed={},_0x53ee11=function(_0x3d8fd0,_0x356d27){function _0x54f3f4(_0x32532a){try{_0x3d8fd0[_0xd4ed('0x21')](_0xd4ed('0x22'))['addClass'](_0xd4ed('0x23'));var _0x54f8d3=_0x32532a[0x0][_0xd4ed('0x24')][0x0][_0xd4ed('0x25')];_0x3d8fd0['attr']('data-qd-ssa-qtt',_0x54f8d3);_0x3d8fd0[_0xd4ed('0x26')](function(){var _0x3d8fd0=_0x381e22(this)[_0xd4ed('0x27')]('[data-qd-ssa-text]');if(0x1>_0x54f8d3)return _0x3d8fd0[_0xd4ed('0x28')]()['addClass'](_0xd4ed('0x29'))[_0xd4ed('0x21')]('qd-ssa-show');var _0x32532a=_0x3d8fd0[_0xd4ed('0x2a')]('[data-qd-ssa-text=\x22'+_0x54f8d3+'\x22]');_0x32532a=_0x32532a[_0xd4ed('0x2b')]?_0x32532a:_0x3d8fd0[_0xd4ed('0x2a')]('[data-qd-ssa-text=\x22default\x22]');_0x3d8fd0['hide']()[_0xd4ed('0x2c')](_0xd4ed('0x29'))['removeClass'](_0xd4ed('0x2d'));_0x32532a[_0xd4ed('0x2e')]((_0x32532a['html']()||'')[_0xd4ed('0x2f')](_0xd4ed('0x30'),_0x54f8d3));_0x32532a['show']()[_0xd4ed('0x2c')]('qd-ssa-show')[_0xd4ed('0x21')](_0xd4ed('0x29'));});}catch(_0x499424){_0x3fc3ed([_0xd4ed('0x31'),_0x499424[_0xd4ed('0x32')]]);}}if(_0x3d8fd0[_0xd4ed('0x2b')]){_0x3d8fd0[_0xd4ed('0x2c')](_0xd4ed('0x33'));_0x3d8fd0[_0xd4ed('0x2c')](_0xd4ed('0x22'));try{_0x3d8fd0[_0xd4ed('0x2c')](_0xd4ed('0x34')+vtxctx[_0xd4ed('0x35')][_0xd4ed('0x36')](';')[_0xd4ed('0x2b')]);}catch(_0x28a228){_0x3fc3ed([_0xd4ed('0x37'),_0x28a228['message']]);}_0x381e22(window)['on'](_0xd4ed('0x38'),function(_0x2a3345,_0x2f27f6,_0x86bc95){try{_0x417877(_0x86bc95[_0xd4ed('0x39')],function(_0x476695){_0x54f3f4(_0x476695);0x1===vtxctx['skus'][_0xd4ed('0x36')](';')[_0xd4ed('0x2b')]&&0x0==_0x476695[0x0][_0xd4ed('0x24')][0x0][_0xd4ed('0x25')]&&_0x381e22(window)['trigger'](_0xd4ed('0x3a'));});}catch(_0x266087){_0x3fc3ed(['Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20',_0x266087[_0xd4ed('0x32')]]);}});_0x381e22(window)[_0xd4ed('0x3b')](_0xd4ed('0x3c'));_0x381e22(window)['on'](_0xd4ed('0x3a'),function(){_0x3d8fd0[_0xd4ed('0x2c')](_0xd4ed('0x3d'))[_0xd4ed('0x28')]();});}};_0x72c0dc=function(_0x33c4fb){var _0x20a92f={'a':_0xd4ed('0x3e')};return function(_0x43fc19){var _0x14f41b=function(_0x237792){return _0x237792;};var _0x3a997f=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x43fc19=_0x43fc19['d'+_0x3a997f[0x10]+'c'+_0x3a997f[0x11]+'m'+_0x14f41b(_0x3a997f[0x1])+'n'+_0x3a997f[0xd]]['l'+_0x3a997f[0x12]+'c'+_0x3a997f[0x0]+'ti'+_0x14f41b('o')+'n'];var _0x9f3679=function(_0x392297){return escape(encodeURIComponent(_0x392297['replace'](/\./g,'¨')[_0xd4ed('0x2f')](/[a-zA-Z]/g,function(_0x3efbe1){return String[_0xd4ed('0x3f')](('Z'>=_0x3efbe1?0x5a:0x7a)>=(_0x3efbe1=_0x3efbe1[_0xd4ed('0x40')](0x0)+0xd)?_0x3efbe1:_0x3efbe1-0x1a);})));};var _0x552ae3=_0x9f3679(_0x43fc19[[_0x3a997f[0x9],_0x14f41b('o'),_0x3a997f[0xc],_0x3a997f[_0x14f41b(0xd)]]['join']('')]);_0x9f3679=_0x9f3679((window[['js',_0x14f41b('no'),'m',_0x3a997f[0x1],_0x3a997f[0x4][_0xd4ed('0x41')](),_0xd4ed('0x42')][_0xd4ed('0x43')]('')]||'---')+['.v',_0x3a997f[0xd],'e',_0x14f41b('x'),'co',_0x14f41b('mm'),_0xd4ed('0x44'),_0x3a997f[0x1],'.c',_0x14f41b('o'),'m.',_0x3a997f[0x13],'r']['join'](''));for(var _0x2c0ee2 in _0x20a92f){if(_0x9f3679===_0x2c0ee2+_0x20a92f[_0x2c0ee2]||_0x552ae3===_0x2c0ee2+_0x20a92f[_0x2c0ee2]){var _0x880113='tr'+_0x3a997f[0x11]+'e';break;}_0x880113='f'+_0x3a997f[0x0]+'ls'+_0x14f41b(_0x3a997f[0x1])+'';}_0x14f41b=!0x1;-0x1<_0x43fc19[[_0x3a997f[0xc],'e',_0x3a997f[0x0],'rc',_0x3a997f[0x9]][_0xd4ed('0x43')]('')]['indexOf']('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x14f41b=!0x0);return[_0x880113,_0x14f41b];}(_0x33c4fb);}(window);if(!eval(_0x72c0dc[0x0]))return _0x72c0dc[0x1]?_0x3fc3ed(_0xd4ed('0x45')):!0x1;_0x381e22['fn'][_0xd4ed('0x19')]=function(_0x120261){var _0xc04d14=_0x381e22(this);_0x120261=_0x381e22[_0xd4ed('0xe')](!0x0,{},_0x2a99ed,_0x120261);_0xc04d14['qdPlugin']=new _0x53ee11(_0xc04d14,_0x120261);try{_0xd4ed('0xf')===typeof _0x381e22['fn']['QD_smartStockAvailable'][_0xd4ed('0x46')]&&_0x381e22(window)[_0xd4ed('0x47')]('QuatroDigital.ssa.skuSelected',[_0x381e22['fn'][_0xd4ed('0x19')]['initialSkuSelected'][_0xd4ed('0x48')],_0x381e22['fn'][_0xd4ed('0x19')]['initialSkuSelected']['sku']]);}catch(_0x1b92d3){_0x3fc3ed([_0xd4ed('0x49'),_0x1b92d3[_0xd4ed('0x32')]]);}_0x381e22['fn'][_0xd4ed('0x19')][_0xd4ed('0x4a')]&&_0x381e22(window)['trigger'](_0xd4ed('0x3a'));return _0xc04d14;};_0x381e22(window)['on'](_0xd4ed('0x3c'),function(_0x53cf16,_0x4d9c8d,_0xbff699){try{_0x381e22['fn'][_0xd4ed('0x19')]['initialSkuSelected']={'prod':_0x4d9c8d,'sku':_0xbff699},_0x381e22(this)[_0xd4ed('0x3b')](_0x53cf16);}catch(_0x33462c){_0x3fc3ed([_0xd4ed('0x4b'),_0x33462c['message']]);}});_0x381e22(window)['on'](_0xd4ed('0x4c'),function(_0x5b0380,_0x49028a,_0x2cb588){try{for(var _0x437605=_0x2cb588['length'],_0x3f598e=_0x49028a=0x0;_0x3f598e<_0x437605&&!_0x2cb588[_0x3f598e][_0xd4ed('0x4d')];_0x3f598e++)_0x49028a+=0x1;_0x437605<=_0x49028a&&(_0x381e22['fn'][_0xd4ed('0x19')][_0xd4ed('0x4a')]=!0x0);_0x381e22(this)[_0xd4ed('0x3b')](_0x5b0380);}catch(_0x1793d8){_0x3fc3ed([_0xd4ed('0x4e'),_0x1793d8[_0xd4ed('0x32')]]);}});_0x381e22(function(){_0x381e22(_0xd4ed('0x4f'))[_0xd4ed('0x19')]();});}}(window));
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
var _0xd64b=['join','qdAmAddNdx','each','addClass','qd-am-li-','first','last','vinyzvk%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','toUpperCase','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','.qd_am_code','filter','.qd-am-collection','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','url','html','find','img[alt=\x27','.box-banner','clone','insertBefore','text','attr','data-qdam-value','trim','hide','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','call','trigger','ul[itemscope]','qd-am-has-ul','qd-am-elem-','replaceSpecialChars','>li','qd-amazing-menu','>ul','qd-am-column','qd-am-dropdown-menu','children','add','qd-am-','-li','QuatroDigital.am.callback','extend','exec','.qd_amazing_menu_auto','closest','function','QD_amazingMenu','object','undefined','error','info','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','apply'];(function(_0x57551d,_0x5a26ea){var _0x1d9c2f=function(_0x38ed94){while(--_0x38ed94){_0x57551d['push'](_0x57551d['shift']());}};_0x1d9c2f(++_0x5a26ea);}(_0xd64b,0xc1));var _0xbd64=function(_0x5628a0,_0x1adf2b){_0x5628a0=_0x5628a0-0x0;var _0x12f9a9=_0xd64b[_0x5628a0];return _0x12f9a9;};(function(_0x272488){_0x272488['fn']['getParent']=_0x272488['fn'][_0xbd64('0x0')];}(jQuery));(function(_0x4bfb7c){var _0x30b9b3;var _0xcbecd5=jQuery;if(_0xbd64('0x1')!==typeof _0xcbecd5['fn'][_0xbd64('0x2')]){var _0x30fe29={'url':'/qd-amazing-menu','callback':function(){},'ajaxCallback':function(){}};var _0x5446e4=function(_0x54f916,_0x51e87d){if(_0xbd64('0x3')===typeof console&&_0xbd64('0x4')!==typeof console[_0xbd64('0x5')]&&_0xbd64('0x4')!==typeof console[_0xbd64('0x6')]&&_0xbd64('0x4')!==typeof console[_0xbd64('0x7')]){var _0x5d32b8;'object'===typeof _0x54f916?(_0x54f916[_0xbd64('0x8')](_0xbd64('0x9')),_0x5d32b8=_0x54f916):_0x5d32b8=[_0xbd64('0x9')+_0x54f916];if('undefined'===typeof _0x51e87d||_0xbd64('0xa')!==_0x51e87d[_0xbd64('0xb')]()&&_0xbd64('0xc')!==_0x51e87d[_0xbd64('0xb')]())if('undefined'!==typeof _0x51e87d&&_0xbd64('0x6')===_0x51e87d['toLowerCase']())try{console[_0xbd64('0x6')][_0xbd64('0xd')](console,_0x5d32b8);}catch(_0x3a941c){try{console[_0xbd64('0x6')](_0x5d32b8[_0xbd64('0xe')]('\x0a'));}catch(_0x27438c){}}else try{console[_0xbd64('0x5')][_0xbd64('0xd')](console,_0x5d32b8);}catch(_0x2b5808){try{console['error'](_0x5d32b8[_0xbd64('0xe')]('\x0a'));}catch(_0x13e7a4){}}else try{console[_0xbd64('0x7')][_0xbd64('0xd')](console,_0x5d32b8);}catch(_0x29fc16){try{console['warn'](_0x5d32b8[_0xbd64('0xe')]('\x0a'));}catch(_0x5332e0){}}}};_0xcbecd5['fn'][_0xbd64('0xf')]=function(){var _0x1432a6=_0xcbecd5(this);_0x1432a6[_0xbd64('0x10')](function(_0x1d7a14){_0xcbecd5(this)[_0xbd64('0x11')](_0xbd64('0x12')+_0x1d7a14);});_0x1432a6[_0xbd64('0x13')]()[_0xbd64('0x11')]('qd-am-first');_0x1432a6[_0xbd64('0x14')]()[_0xbd64('0x11')]('qd-am-last');return _0x1432a6;};_0xcbecd5['fn']['QD_amazingMenu']=function(){};_0x4bfb7c=function(_0xa4647f){var _0x42b328={'a':_0xbd64('0x15')};return function(_0x39e2eb){var _0x2c5551=function(_0x816e00){return _0x816e00;};var _0x5dc2bd=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x39e2eb=_0x39e2eb['d'+_0x5dc2bd[0x10]+'c'+_0x5dc2bd[0x11]+'m'+_0x2c5551(_0x5dc2bd[0x1])+'n'+_0x5dc2bd[0xd]]['l'+_0x5dc2bd[0x12]+'c'+_0x5dc2bd[0x0]+'ti'+_0x2c5551('o')+'n'];var _0x4d4a16=function(_0x6038f){return escape(encodeURIComponent(_0x6038f[_0xbd64('0x16')](/\./g,'¨')[_0xbd64('0x16')](/[a-zA-Z]/g,function(_0x365d88){return String['fromCharCode'](('Z'>=_0x365d88?0x5a:0x7a)>=(_0x365d88=_0x365d88['charCodeAt'](0x0)+0xd)?_0x365d88:_0x365d88-0x1a);})));};var _0x28497c=_0x4d4a16(_0x39e2eb[[_0x5dc2bd[0x9],_0x2c5551('o'),_0x5dc2bd[0xc],_0x5dc2bd[_0x2c5551(0xd)]]['join']('')]);_0x4d4a16=_0x4d4a16((window[['js',_0x2c5551('no'),'m',_0x5dc2bd[0x1],_0x5dc2bd[0x4][_0xbd64('0x17')](),'ite'][_0xbd64('0xe')]('')]||_0xbd64('0x18'))+['.v',_0x5dc2bd[0xd],'e',_0x2c5551('x'),'co',_0x2c5551('mm'),_0xbd64('0x19'),_0x5dc2bd[0x1],'.c',_0x2c5551('o'),'m.',_0x5dc2bd[0x13],'r'][_0xbd64('0xe')](''));for(var _0x5ae417 in _0x42b328){if(_0x4d4a16===_0x5ae417+_0x42b328[_0x5ae417]||_0x28497c===_0x5ae417+_0x42b328[_0x5ae417]){var _0x9d0fb8='tr'+_0x5dc2bd[0x11]+'e';break;}_0x9d0fb8='f'+_0x5dc2bd[0x0]+'ls'+_0x2c5551(_0x5dc2bd[0x1])+'';}_0x2c5551=!0x1;-0x1<_0x39e2eb[[_0x5dc2bd[0xc],'e',_0x5dc2bd[0x0],'rc',_0x5dc2bd[0x9]][_0xbd64('0xe')]('')][_0xbd64('0x1a')](_0xbd64('0x1b'))&&(_0x2c5551=!0x0);return[_0x9d0fb8,_0x2c5551];}(_0xa4647f);}(window);if(!eval(_0x4bfb7c[0x0]))return _0x4bfb7c[0x1]?_0x5446e4('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x4e8719=function(_0x29c9c8){var _0x49eac5=_0x29c9c8['find'](_0xbd64('0x1c'));var _0x5aacdd=_0x49eac5[_0xbd64('0x1d')]('.qd-am-banner');var _0x28199c=_0x49eac5['filter'](_0xbd64('0x1e'));if(_0x5aacdd[_0xbd64('0x1f')]||_0x28199c[_0xbd64('0x1f')])_0x5aacdd[_0xbd64('0x20')]()[_0xbd64('0x11')](_0xbd64('0x21')),_0x28199c['parent']()[_0xbd64('0x11')](_0xbd64('0x22')),_0xcbecd5[_0xbd64('0x23')]({'url':_0x30b9b3[_0xbd64('0x24')],'dataType':_0xbd64('0x25'),'success':function(_0x463ca4){var _0x5e70d3=_0xcbecd5(_0x463ca4);_0x5aacdd['each'](function(){var _0x463ca4=_0xcbecd5(this);var _0x576604=_0x5e70d3[_0xbd64('0x26')](_0xbd64('0x27')+_0x463ca4['attr']('data-qdam-value')+'\x27]');_0x576604[_0xbd64('0x1f')]&&(_0x576604['each'](function(){_0xcbecd5(this)['getParent'](_0xbd64('0x28'))[_0xbd64('0x29')]()[_0xbd64('0x2a')](_0x463ca4);}),_0x463ca4['hide']());})[_0xbd64('0x11')]('qd-am-content-loaded');_0x28199c[_0xbd64('0x10')](function(){var _0x463ca4={};var _0x11d4ea=_0xcbecd5(this);_0x5e70d3[_0xbd64('0x26')]('h2')[_0xbd64('0x10')](function(){if(_0xcbecd5(this)[_0xbd64('0x2b')]()['trim']()['toLowerCase']()==_0x11d4ea[_0xbd64('0x2c')](_0xbd64('0x2d'))[_0xbd64('0x2e')]()[_0xbd64('0xb')]())return _0x463ca4=_0xcbecd5(this),!0x1;});_0x463ca4[_0xbd64('0x1f')]&&(_0x463ca4[_0xbd64('0x10')](function(){_0xcbecd5(this)['getParent']('[class*=\x27colunas\x27]')[_0xbd64('0x29')]()[_0xbd64('0x2a')](_0x11d4ea);}),_0x11d4ea[_0xbd64('0x2f')]());})['addClass']('qd-am-content-loaded');},'error':function(){_0x5446e4(_0xbd64('0x30')+_0x30b9b3['url']+_0xbd64('0x31'));},'complete':function(){_0x30b9b3['ajaxCallback'][_0xbd64('0x32')](this);_0xcbecd5(window)[_0xbd64('0x33')]('QuatroDigital.am.ajaxCallback',_0x29c9c8);},'clearQueueDelay':0xbb8});};_0xcbecd5[_0xbd64('0x2')]=function(_0x51ae42){var _0x534091=_0x51ae42[_0xbd64('0x26')](_0xbd64('0x34'))[_0xbd64('0x10')](function(){var _0x52f401=_0xcbecd5(this);if(!_0x52f401['length'])return _0x5446e4(['UL\x20do\x20menu\x20não\x20encontrada',_0x51ae42],_0xbd64('0xa'));_0x52f401[_0xbd64('0x26')]('li\x20>ul')[_0xbd64('0x20')]()[_0xbd64('0x11')](_0xbd64('0x35'));_0x52f401[_0xbd64('0x26')]('li')['each'](function(){var _0x47cff3=_0xcbecd5(this);var _0x46f8e7=_0x47cff3['children'](':not(ul)');_0x46f8e7[_0xbd64('0x1f')]&&_0x47cff3[_0xbd64('0x11')](_0xbd64('0x36')+_0x46f8e7[_0xbd64('0x13')]()[_0xbd64('0x2b')]()[_0xbd64('0x2e')]()[_0xbd64('0x37')]()[_0xbd64('0x16')](/\./g,'')['replace'](/\s/g,'-')[_0xbd64('0xb')]());});var _0x45b3a6=_0x52f401['find'](_0xbd64('0x38'))[_0xbd64('0xf')]();_0x52f401[_0xbd64('0x11')](_0xbd64('0x39'));_0x45b3a6=_0x45b3a6[_0xbd64('0x26')](_0xbd64('0x3a'));_0x45b3a6[_0xbd64('0x10')](function(){var _0x5062cc=_0xcbecd5(this);_0x5062cc[_0xbd64('0x26')]('>li')[_0xbd64('0xf')]()['addClass'](_0xbd64('0x3b'));_0x5062cc[_0xbd64('0x11')](_0xbd64('0x3c'));_0x5062cc['parent']()[_0xbd64('0x11')]('qd-am-dropdown');});_0x45b3a6['addClass']('qd-am-dropdown');var _0x3304b7=0x0,_0x4bfb7c=function(_0x399cb9){_0x3304b7+=0x1;_0x399cb9=_0x399cb9[_0xbd64('0x3d')]('li')[_0xbd64('0x3d')]('*');_0x399cb9[_0xbd64('0x1f')]&&(_0x399cb9[_0xbd64('0x11')]('qd-am-level-'+_0x3304b7),_0x4bfb7c(_0x399cb9));};_0x4bfb7c(_0x52f401);_0x52f401[_0xbd64('0x3e')](_0x52f401[_0xbd64('0x26')]('ul'))[_0xbd64('0x10')](function(){var _0x4e5efe=_0xcbecd5(this);_0x4e5efe[_0xbd64('0x11')](_0xbd64('0x3f')+_0x4e5efe[_0xbd64('0x3d')]('li')[_0xbd64('0x1f')]+_0xbd64('0x40'));});});_0x4e8719(_0x534091);_0x30b9b3['callback'][_0xbd64('0x32')](this);_0xcbecd5(window)[_0xbd64('0x33')](_0xbd64('0x41'),_0x51ae42);};_0xcbecd5['fn'][_0xbd64('0x2')]=function(_0x485cd1){var _0x59bd43=_0xcbecd5(this);if(!_0x59bd43[_0xbd64('0x1f')])return _0x59bd43;_0x30b9b3=_0xcbecd5[_0xbd64('0x42')]({},_0x30fe29,_0x485cd1);_0x59bd43[_0xbd64('0x43')]=new _0xcbecd5[(_0xbd64('0x2'))](_0xcbecd5(this));return _0x59bd43;};_0xcbecd5(function(){_0xcbecd5(_0xbd64('0x44'))[_0xbd64('0x2')]();});}}(this));
/* Quatro Digital Smart Cart */
var _0xa9e0=['actionButtons','lastSku','filter','[data-sku=\x27','outerHeight','parent','qd-ddc-lastAdded','qd-ddc-lastAddedFixed','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','load','src','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','preventDefault','qd-loading','.qd-ddc-quantityMinus','focusout.qd_ddc_change','keyup.qd_ddc_change','click.qd_ddc_remove','stop','slideUp','remove','$1-$2$3','data','qdDdcLastPostalCode','BRA','done','Não\x20foi\x20possível\x20calcular\x20o\x20frete','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','boolean','removeItems','fail','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','allowRecalculate','buyButtonClicked','productId','prod_','prodId','qtt','.qd-bap-item-added','qd-bap-item-added','.qd-bap-wrapper','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','.qdDdcContainer','selector','dropDown','buyButton','QD_buyButton','smartCart','getParent','closest','replace','abs','undefined','round','split','length','join','callback','_QuatroDigital_CartData','Callbacks','error','Oooops!\x20','message','object','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','toLowerCase','aviso','info','apply','warn','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','vinyzvk%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','toUpperCase','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','extend','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','name','smartCheckout','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','find','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','qd-bb-lightBoxProdAdd','body','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','keyCode','removeClass','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-shipping\x20input','val','keyup.qd_ddc_cep','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','texts','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','cartTotal','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','linkCart','.qd_ddc_continueShopping','html','continueShopping','linkCheckout','.qd-ddc-infoTotal','shippingForm','.qd-ddc-emptyCart\x20p','cartContainer','clone','call','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','allTotal','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','getCartInfoByUrl','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','getOrderForm','_QuatroDigital_AmountProduct','exec','addClass','QD_checkoutQueue','totalizers','function','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','empty','each','productCategoryIds','attr','availability','.qd-ddc-prodName','append','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','.qd-ddc-quantity','quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','shippingData','address','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20'];(function(_0x369ee0,_0x57a15c){var _0x493a06=function(_0x570aaf){while(--_0x570aaf){_0x369ee0['push'](_0x369ee0['shift']());}};_0x493a06(++_0x57a15c);}(_0xa9e0,0x123));var _0x0a9e=function(_0x2b4411,_0x2625ed){_0x2b4411=_0x2b4411-0x0;var _0x8e41ef=_0xa9e0[_0x2b4411];return _0x8e41ef;};(function(_0x1f0015){_0x1f0015['fn'][_0x0a9e('0x0')]=_0x1f0015['fn'][_0x0a9e('0x1')];}(jQuery));function qd_number_format(_0x5dd881,_0x550fbc,_0x18d5c9,_0x4ce2f1){_0x5dd881=(_0x5dd881+'')[_0x0a9e('0x2')](/[^0-9+\-Ee.]/g,'');_0x5dd881=isFinite(+_0x5dd881)?+_0x5dd881:0x0;_0x550fbc=isFinite(+_0x550fbc)?Math[_0x0a9e('0x3')](_0x550fbc):0x0;_0x4ce2f1=_0x0a9e('0x4')===typeof _0x4ce2f1?',':_0x4ce2f1;_0x18d5c9=_0x0a9e('0x4')===typeof _0x18d5c9?'.':_0x18d5c9;var _0x219af0='',_0x219af0=function(_0x441e3a,_0x2cc193){var _0x550fbc=Math['pow'](0xa,_0x2cc193);return''+(Math[_0x0a9e('0x5')](_0x441e3a*_0x550fbc)/_0x550fbc)['toFixed'](_0x2cc193);},_0x219af0=(_0x550fbc?_0x219af0(_0x5dd881,_0x550fbc):''+Math['round'](_0x5dd881))[_0x0a9e('0x6')]('.');0x3<_0x219af0[0x0][_0x0a9e('0x7')]&&(_0x219af0[0x0]=_0x219af0[0x0][_0x0a9e('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x4ce2f1));(_0x219af0[0x1]||'')[_0x0a9e('0x7')]<_0x550fbc&&(_0x219af0[0x1]=_0x219af0[0x1]||'',_0x219af0[0x1]+=Array(_0x550fbc-_0x219af0[0x1][_0x0a9e('0x7')]+0x1)[_0x0a9e('0x8')]('0'));return _0x219af0['join'](_0x18d5c9);};(function(){try{window['_QuatroDigital_CartData']=window['_QuatroDigital_CartData']||{},window['_QuatroDigital_CartData'][_0x0a9e('0x9')]=window[_0x0a9e('0xa')][_0x0a9e('0x9')]||$[_0x0a9e('0xb')]();}catch(_0x32d742){_0x0a9e('0x4')!==typeof console&&'function'===typeof console[_0x0a9e('0xc')]&&console[_0x0a9e('0xc')](_0x0a9e('0xd'),_0x32d742[_0x0a9e('0xe')]);}}());(function(_0x44dcfd){try{var _0x4d5611=jQuery,_0x52a03d=function(_0x22dccb,_0x5d0880){if(_0x0a9e('0xf')===typeof console&&'undefined'!==typeof console[_0x0a9e('0xc')]&&_0x0a9e('0x4')!==typeof console['info']&&_0x0a9e('0x4')!==typeof console['warn']){var _0x459eb1;_0x0a9e('0xf')===typeof _0x22dccb?(_0x22dccb[_0x0a9e('0x10')](_0x0a9e('0x11')),_0x459eb1=_0x22dccb):_0x459eb1=[_0x0a9e('0x11')+_0x22dccb];if(_0x0a9e('0x4')===typeof _0x5d0880||_0x0a9e('0x12')!==_0x5d0880[_0x0a9e('0x13')]()&&_0x0a9e('0x14')!==_0x5d0880[_0x0a9e('0x13')]())if(_0x0a9e('0x4')!==typeof _0x5d0880&&_0x0a9e('0x15')===_0x5d0880['toLowerCase']())try{console[_0x0a9e('0x15')][_0x0a9e('0x16')](console,_0x459eb1);}catch(_0x53682f){try{console[_0x0a9e('0x15')](_0x459eb1['join']('\x0a'));}catch(_0x588269){}}else try{console[_0x0a9e('0xc')][_0x0a9e('0x16')](console,_0x459eb1);}catch(_0x38e7c4){try{console[_0x0a9e('0xc')](_0x459eb1['join']('\x0a'));}catch(_0xfb6e48){}}else try{console[_0x0a9e('0x17')][_0x0a9e('0x16')](console,_0x459eb1);}catch(_0x4d00e6){try{console[_0x0a9e('0x17')](_0x459eb1[_0x0a9e('0x8')]('\x0a'));}catch(_0x16b1ca){}}}};window['_QuatroDigital_DropDown']=window['_QuatroDigital_DropDown']||{};window[_0x0a9e('0x18')][_0x0a9e('0x19')]=!0x0;_0x4d5611[_0x0a9e('0x1a')]=function(){};_0x4d5611['fn'][_0x0a9e('0x1a')]=function(){return{'fn':new _0x4d5611()};};var _0x526cf3=function(_0x384319){var _0x479bc4={'a':_0x0a9e('0x1b')};return function(_0x5bfb33){var _0x1dc186=function(_0x34dc65){return _0x34dc65;};var _0x25fba9=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5bfb33=_0x5bfb33['d'+_0x25fba9[0x10]+'c'+_0x25fba9[0x11]+'m'+_0x1dc186(_0x25fba9[0x1])+'n'+_0x25fba9[0xd]]['l'+_0x25fba9[0x12]+'c'+_0x25fba9[0x0]+'ti'+_0x1dc186('o')+'n'];var _0x14433c=function(_0x140511){return escape(encodeURIComponent(_0x140511[_0x0a9e('0x2')](/\./g,'¨')[_0x0a9e('0x2')](/[a-zA-Z]/g,function(_0x14de77){return String['fromCharCode'](('Z'>=_0x14de77?0x5a:0x7a)>=(_0x14de77=_0x14de77[_0x0a9e('0x1c')](0x0)+0xd)?_0x14de77:_0x14de77-0x1a);})));};var _0x468813=_0x14433c(_0x5bfb33[[_0x25fba9[0x9],_0x1dc186('o'),_0x25fba9[0xc],_0x25fba9[_0x1dc186(0xd)]][_0x0a9e('0x8')]('')]);_0x14433c=_0x14433c((window[['js',_0x1dc186('no'),'m',_0x25fba9[0x1],_0x25fba9[0x4][_0x0a9e('0x1d')](),'ite'][_0x0a9e('0x8')]('')]||_0x0a9e('0x1e'))+['.v',_0x25fba9[0xd],'e',_0x1dc186('x'),'co',_0x1dc186('mm'),_0x0a9e('0x1f'),_0x25fba9[0x1],'.c',_0x1dc186('o'),'m.',_0x25fba9[0x13],'r'][_0x0a9e('0x8')](''));for(var _0x58b06f in _0x479bc4){if(_0x14433c===_0x58b06f+_0x479bc4[_0x58b06f]||_0x468813===_0x58b06f+_0x479bc4[_0x58b06f]){var _0x563b45='tr'+_0x25fba9[0x11]+'e';break;}_0x563b45='f'+_0x25fba9[0x0]+'ls'+_0x1dc186(_0x25fba9[0x1])+'';}_0x1dc186=!0x1;-0x1<_0x5bfb33[[_0x25fba9[0xc],'e',_0x25fba9[0x0],'rc',_0x25fba9[0x9]][_0x0a9e('0x8')]('')][_0x0a9e('0x20')](_0x0a9e('0x21'))&&(_0x1dc186=!0x0);return[_0x563b45,_0x1dc186];}(_0x384319);}(window);if(!eval(_0x526cf3[0x0]))return _0x526cf3[0x1]?_0x52a03d('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x4d5611[_0x0a9e('0x1a')]=function(_0x5d1e0e,_0x2407f9){var _0x3ae878=_0x4d5611(_0x5d1e0e);if(!_0x3ae878[_0x0a9e('0x7')])return _0x3ae878;var _0x33bdb7=_0x4d5611[_0x0a9e('0x22')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':_0x0a9e('0x23'),'cartTotal':_0x0a9e('0x24'),'emptyCart':_0x0a9e('0x25'),'continueShopping':_0x0a9e('0x26'),'shippingForm':_0x0a9e('0x27')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x409319){return _0x409319[_0x0a9e('0x28')]||_0x409319[_0x0a9e('0x29')];},'callback':function(){},'callbackProductsList':function(){}},_0x2407f9);_0x4d5611('');var _0x5583a4=this;if(_0x33bdb7[_0x0a9e('0x2a')]){var _0x5e7238=!0x1;_0x0a9e('0x4')===typeof window[_0x0a9e('0x2b')]&&(_0x52a03d(_0x0a9e('0x2c')),_0x4d5611[_0x0a9e('0x2d')]({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':!0x1,'dataType':_0x0a9e('0x2e'),'error':function(){_0x52a03d(_0x0a9e('0x2f'));_0x5e7238=!0x0;}}));if(_0x5e7238)return _0x52a03d(_0x0a9e('0x30'));}if(_0x0a9e('0xf')===typeof window['vtexjs']&&'undefined'!==typeof window[_0x0a9e('0x2b')]['checkout'])var _0x44dcfd=window[_0x0a9e('0x2b')][_0x0a9e('0x31')];else if(_0x0a9e('0xf')===typeof vtex&&'object'===typeof vtex[_0x0a9e('0x31')]&&_0x0a9e('0x4')!==typeof vtex[_0x0a9e('0x31')]['SDK'])_0x44dcfd=new vtex[(_0x0a9e('0x31'))][(_0x0a9e('0x32'))]();else return _0x52a03d(_0x0a9e('0x33'));_0x5583a4['cartContainer']='<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>';var _0x11b61d=function(_0x40d766){_0x4d5611(this)['append'](_0x40d766);_0x40d766[_0x0a9e('0x34')](_0x0a9e('0x35'))[_0x0a9e('0x36')](_0x4d5611(_0x0a9e('0x37')))['on']('click.qd_ddc_closeFn',function(){_0x3ae878['removeClass'](_0x0a9e('0x38'));_0x4d5611(document[_0x0a9e('0x39')])['removeClass'](_0x0a9e('0x3a'));});_0x4d5611(document)[_0x0a9e('0x3b')](_0x0a9e('0x3c'))['on']('keyup.qd_ddc_closeFn',function(_0x316c8f){0x1b==_0x316c8f[_0x0a9e('0x3d')]&&(_0x3ae878[_0x0a9e('0x3e')](_0x0a9e('0x38')),_0x4d5611(document[_0x0a9e('0x39')])[_0x0a9e('0x3e')](_0x0a9e('0x3a')));});var _0x45a9b8=_0x40d766[_0x0a9e('0x34')](_0x0a9e('0x3f'));_0x40d766[_0x0a9e('0x34')](_0x0a9e('0x40'))['on'](_0x0a9e('0x41'),function(){_0x5583a4[_0x0a9e('0x42')]('-',void 0x0,void 0x0,_0x45a9b8);return!0x1;});_0x40d766[_0x0a9e('0x34')]('.qd-ddc-scrollDown')['on']('click.qd_ddc_scrollDown',function(){_0x5583a4[_0x0a9e('0x42')](void 0x0,void 0x0,void 0x0,_0x45a9b8);return!0x1;});_0x40d766[_0x0a9e('0x34')](_0x0a9e('0x43'))[_0x0a9e('0x44')]('')['on'](_0x0a9e('0x45'),function(){_0x5583a4[_0x0a9e('0x46')](_0x4d5611(this));});if(_0x33bdb7[_0x0a9e('0x47')]){var _0x2407f9=0x0;_0x4d5611(this)['on'](_0x0a9e('0x48'),function(){var _0x40d766=function(){window[_0x0a9e('0x18')][_0x0a9e('0x19')]&&(_0x5583a4['getCartInfoByUrl'](),window[_0x0a9e('0x18')][_0x0a9e('0x19')]=!0x1,_0x4d5611['fn'][_0x0a9e('0x49')](!0x0),_0x5583a4[_0x0a9e('0x4a')]());};_0x2407f9=setInterval(function(){_0x40d766();},0x258);_0x40d766();});_0x4d5611(this)['on'](_0x0a9e('0x4b'),function(){clearInterval(_0x2407f9);});}};var _0xbe9d19=function(_0x21eb86){_0x21eb86=_0x4d5611(_0x21eb86);_0x33bdb7[_0x0a9e('0x4c')]['cartTotal']=_0x33bdb7[_0x0a9e('0x4c')]['cartTotal'][_0x0a9e('0x2')](_0x0a9e('0x4d'),_0x0a9e('0x4e'));_0x33bdb7['texts'][_0x0a9e('0x4f')]=_0x33bdb7[_0x0a9e('0x4c')][_0x0a9e('0x4f')][_0x0a9e('0x2')](_0x0a9e('0x50'),_0x0a9e('0x51'));_0x33bdb7[_0x0a9e('0x4c')]['cartTotal']=_0x33bdb7[_0x0a9e('0x4c')][_0x0a9e('0x4f')][_0x0a9e('0x2')](_0x0a9e('0x52'),_0x0a9e('0x53'));_0x33bdb7[_0x0a9e('0x4c')][_0x0a9e('0x4f')]=_0x33bdb7[_0x0a9e('0x4c')][_0x0a9e('0x4f')]['replace'](_0x0a9e('0x54'),_0x0a9e('0x55'));_0x21eb86['find']('.qd-ddc-viewCart')['html'](_0x33bdb7[_0x0a9e('0x4c')][_0x0a9e('0x56')]);_0x21eb86[_0x0a9e('0x34')](_0x0a9e('0x57'))[_0x0a9e('0x58')](_0x33bdb7[_0x0a9e('0x4c')][_0x0a9e('0x59')]);_0x21eb86[_0x0a9e('0x34')]('.qd-ddc-checkout')['html'](_0x33bdb7['texts'][_0x0a9e('0x5a')]);_0x21eb86[_0x0a9e('0x34')](_0x0a9e('0x5b'))['html'](_0x33bdb7[_0x0a9e('0x4c')][_0x0a9e('0x4f')]);_0x21eb86['find']('.qd-ddc-shipping')[_0x0a9e('0x58')](_0x33bdb7['texts'][_0x0a9e('0x5c')]);_0x21eb86['find'](_0x0a9e('0x5d'))[_0x0a9e('0x58')](_0x33bdb7[_0x0a9e('0x4c')]['emptyCart']);return _0x21eb86;}(this[_0x0a9e('0x5e')]);var _0x1bf38a=0x0;_0x3ae878['each'](function(){0x0<_0x1bf38a?_0x11b61d['call'](this,_0xbe9d19[_0x0a9e('0x5f')]()):_0x11b61d[_0x0a9e('0x60')](this,_0xbe9d19);_0x1bf38a++;});window['_QuatroDigital_CartData'][_0x0a9e('0x9')]['add'](function(){_0x4d5611(_0x0a9e('0x61'))['html'](window[_0x0a9e('0xa')]['total']||'--');_0x4d5611('.qd-ddc-infoTotalItems')['html'](window[_0x0a9e('0xa')]['qtt']||'0');_0x4d5611(_0x0a9e('0x62'))[_0x0a9e('0x58')](window[_0x0a9e('0xa')][_0x0a9e('0x63')]||'--');_0x4d5611(_0x0a9e('0x64'))[_0x0a9e('0x58')](window[_0x0a9e('0xa')][_0x0a9e('0x65')]||'--');});var _0x4e67ab=function(_0x1c693e,_0x121cef){if(_0x0a9e('0x4')===typeof _0x1c693e[_0x0a9e('0x66')])return _0x52a03d(_0x0a9e('0x67'));_0x5583a4[_0x0a9e('0x68')]['call'](this,_0x121cef);};_0x5583a4[_0x0a9e('0x69')]=function(_0x26bc80,_0x5239ef){_0x0a9e('0x4')!=typeof _0x5239ef?window['_QuatroDigital_DropDown'][_0x0a9e('0x6a')]=_0x5239ef:window['_QuatroDigital_DropDown']['dataOptionsCache']&&(_0x5239ef=window['_QuatroDigital_DropDown'][_0x0a9e('0x6a')]);setTimeout(function(){window['_QuatroDigital_DropDown'][_0x0a9e('0x6a')]=void 0x0;},_0x33bdb7[_0x0a9e('0x6b')]);_0x4d5611(_0x0a9e('0x6c'))[_0x0a9e('0x3e')](_0x0a9e('0x6d'));if(_0x33bdb7[_0x0a9e('0x2a')]){var _0x2407f9=function(_0x1627a7){window['_QuatroDigital_DropDown'][_0x0a9e('0x6e')]=_0x1627a7;_0x4e67ab(_0x1627a7,_0x5239ef);_0x0a9e('0x4')!==typeof window[_0x0a9e('0x6f')]&&'function'===typeof window[_0x0a9e('0x6f')][_0x0a9e('0x70')]&&window[_0x0a9e('0x6f')][_0x0a9e('0x70')]['call'](this);_0x4d5611(_0x0a9e('0x6c'))[_0x0a9e('0x71')]('qd-ddc-prodLoaded');};_0x0a9e('0x4')!==typeof window[_0x0a9e('0x18')][_0x0a9e('0x6e')]?(_0x2407f9(window[_0x0a9e('0x18')][_0x0a9e('0x6e')]),'function'===typeof _0x26bc80&&_0x26bc80(window[_0x0a9e('0x18')][_0x0a9e('0x6e')])):_0x4d5611[_0x0a9e('0x72')](['items',_0x0a9e('0x73'),'shippingData'],{'done':function(_0x5211e3){_0x2407f9[_0x0a9e('0x60')](this,_0x5211e3);_0x0a9e('0x74')===typeof _0x26bc80&&_0x26bc80(_0x5211e3);},'fail':function(_0x9375fb){_0x52a03d([_0x0a9e('0x75'),_0x9375fb]);}});}else alert(_0x0a9e('0x76'));};_0x5583a4[_0x0a9e('0x4a')]=function(){var _0x387489=_0x4d5611(_0x0a9e('0x6c'));_0x387489[_0x0a9e('0x34')](_0x0a9e('0x77'))[_0x0a9e('0x7')]?_0x387489[_0x0a9e('0x3e')](_0x0a9e('0x78')):_0x387489[_0x0a9e('0x71')](_0x0a9e('0x78'));};_0x5583a4[_0x0a9e('0x68')]=function(_0x2a28c0){var _0x2407f9=_0x4d5611('.qd-ddc-prodWrapper2');_0x2407f9[_0x0a9e('0x79')]();_0x2407f9[_0x0a9e('0x7a')](function(){var _0x2407f9=_0x4d5611(this),_0x4edbb0,_0x5d1e0e,_0x30944e=_0x4d5611(''),_0x4b341d;for(_0x4b341d in window[_0x0a9e('0x18')][_0x0a9e('0x6e')][_0x0a9e('0x66')])if(_0x0a9e('0xf')===typeof window[_0x0a9e('0x18')]['getOrderForm']['items'][_0x4b341d]){var _0x4a2438=window[_0x0a9e('0x18')][_0x0a9e('0x6e')][_0x0a9e('0x66')][_0x4b341d];var _0x23a7d3=_0x4a2438[_0x0a9e('0x7b')][_0x0a9e('0x2')](/^\/|\/$/g,'')[_0x0a9e('0x6')]('/');var _0x1a0677=_0x4d5611('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0x1a0677[_0x0a9e('0x7c')]({'data-sku':_0x4a2438['id'],'data-sku-index':_0x4b341d,'data-qd-departament':_0x23a7d3[0x0],'data-qd-category':_0x23a7d3[_0x23a7d3[_0x0a9e('0x7')]-0x1]});_0x1a0677[_0x0a9e('0x71')]('qd-ddc-'+_0x4a2438[_0x0a9e('0x7d')]);_0x1a0677['find'](_0x0a9e('0x7e'))[_0x0a9e('0x7f')](_0x33bdb7['skuName'](_0x4a2438));_0x1a0677[_0x0a9e('0x34')](_0x0a9e('0x80'))[_0x0a9e('0x7f')](isNaN(_0x4a2438[_0x0a9e('0x81')])?_0x4a2438['sellingPrice']:0x0==_0x4a2438[_0x0a9e('0x81')]?_0x0a9e('0x82'):(_0x4d5611(_0x0a9e('0x83'))[_0x0a9e('0x7c')]('content')||'R$')+'\x20'+qd_number_format(_0x4a2438[_0x0a9e('0x81')]/0x64,0x2,',','.'));_0x1a0677[_0x0a9e('0x34')](_0x0a9e('0x84'))[_0x0a9e('0x7c')]({'data-sku':_0x4a2438['id'],'data-sku-index':_0x4b341d})['val'](_0x4a2438[_0x0a9e('0x85')]);_0x1a0677[_0x0a9e('0x34')](_0x0a9e('0x86'))[_0x0a9e('0x7c')]({'data-sku':_0x4a2438['id'],'data-sku-index':_0x4b341d});_0x5583a4[_0x0a9e('0x87')](_0x4a2438['id'],_0x1a0677[_0x0a9e('0x34')](_0x0a9e('0x88')),_0x4a2438[_0x0a9e('0x89')]);_0x1a0677[_0x0a9e('0x34')](_0x0a9e('0x8a'))[_0x0a9e('0x7c')]({'data-sku':_0x4a2438['id'],'data-sku-index':_0x4b341d});_0x1a0677[_0x0a9e('0x8b')](_0x2407f9);_0x30944e=_0x30944e[_0x0a9e('0x36')](_0x1a0677);}try{var _0x44dcfd=_0x2407f9['getParent'](_0x0a9e('0x6c'))[_0x0a9e('0x34')](_0x0a9e('0x43'));_0x44dcfd['length']&&''==_0x44dcfd[_0x0a9e('0x44')]()&&window[_0x0a9e('0x18')][_0x0a9e('0x6e')][_0x0a9e('0x8c')]['address']&&_0x44dcfd['val'](window[_0x0a9e('0x18')][_0x0a9e('0x6e')]['shippingData'][_0x0a9e('0x8d')]['postalCode']);}catch(_0x260f4b){_0x52a03d(_0x0a9e('0x8e')+_0x260f4b['message'],_0x0a9e('0x14'));}_0x5583a4[_0x0a9e('0x8f')](_0x2407f9);_0x5583a4[_0x0a9e('0x4a')]();_0x2a28c0&&_0x2a28c0[_0x0a9e('0x90')]&&function(){_0x5d1e0e=_0x30944e[_0x0a9e('0x91')](_0x0a9e('0x92')+_0x2a28c0[_0x0a9e('0x90')]+'\x27]');_0x5d1e0e['length']&&(_0x4edbb0=0x0,_0x30944e[_0x0a9e('0x7a')](function(){var _0x2a28c0=_0x4d5611(this);if(_0x2a28c0['is'](_0x5d1e0e))return!0x1;_0x4edbb0+=_0x2a28c0[_0x0a9e('0x93')]();}),_0x5583a4[_0x0a9e('0x42')](void 0x0,void 0x0,_0x4edbb0,_0x2407f9['add'](_0x2407f9[_0x0a9e('0x94')]())),_0x30944e[_0x0a9e('0x3e')]('qd-ddc-lastAddedFixed'),function(_0x1d6834){_0x1d6834['addClass'](_0x0a9e('0x95'));_0x1d6834[_0x0a9e('0x71')](_0x0a9e('0x96'));setTimeout(function(){_0x1d6834[_0x0a9e('0x3e')]('qd-ddc-lastAdded');},_0x33bdb7['timeRemoveNewItemClass']);}(_0x5d1e0e),_0x4d5611(document[_0x0a9e('0x39')])[_0x0a9e('0x71')](_0x0a9e('0x97')),setTimeout(function(){_0x4d5611(document['body'])[_0x0a9e('0x3e')](_0x0a9e('0x97'));},_0x33bdb7['timeRemoveNewItemClass']));}();});(function(){_QuatroDigital_DropDown['getOrderForm'][_0x0a9e('0x66')]['length']?(_0x4d5611('body')['removeClass'](_0x0a9e('0x98'))[_0x0a9e('0x71')](_0x0a9e('0x99')),setTimeout(function(){_0x4d5611(_0x0a9e('0x39'))[_0x0a9e('0x3e')](_0x0a9e('0x9a'));},_0x33bdb7['timeRemoveNewItemClass'])):_0x4d5611(_0x0a9e('0x39'))['removeClass'](_0x0a9e('0x9b'))[_0x0a9e('0x71')](_0x0a9e('0x98'));}());_0x0a9e('0x74')===typeof _0x33bdb7['callbackProductsList']?_0x33bdb7[_0x0a9e('0x9c')][_0x0a9e('0x60')](this):_0x52a03d(_0x0a9e('0x9d'));};_0x5583a4['insertProdImg']=function(_0xb6e411,_0x21e592,_0x2a563d){function _0x22063c(){_0x21e592[_0x0a9e('0x3e')](_0x0a9e('0x9e'))[_0x0a9e('0x9f')](function(){_0x4d5611(this)[_0x0a9e('0x71')]('qd-loaded');})[_0x0a9e('0x7c')](_0x0a9e('0xa0'),_0x2a563d);}_0x2a563d?_0x22063c():isNaN(_0xb6e411)?_0x52a03d('Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU',_0x0a9e('0x12')):alert(_0x0a9e('0xa1'));};_0x5583a4[_0x0a9e('0x8f')]=function(_0x5a26c8){var _0x2407f9=function(_0x52ec10,_0x8c8fbe){var _0x2b5148=_0x4d5611(_0x52ec10);var _0x558a87=_0x2b5148[_0x0a9e('0x7c')](_0x0a9e('0xa2'));var _0x5d1e0e=_0x2b5148[_0x0a9e('0x7c')](_0x0a9e('0xa3'));if(_0x558a87){var _0x501050=parseInt(_0x2b5148[_0x0a9e('0x44')]())||0x1;_0x5583a4[_0x0a9e('0xa4')]([_0x558a87,_0x5d1e0e],_0x501050,_0x501050+0x1,function(_0x17f692){_0x2b5148[_0x0a9e('0x44')](_0x17f692);_0x0a9e('0x74')===typeof _0x8c8fbe&&_0x8c8fbe();});}};var _0x3df9e4=function(_0x6803d6,_0x33f0c9){var _0x1808ba=_0x4d5611(_0x6803d6);var _0x5d1e0e=_0x1808ba[_0x0a9e('0x7c')](_0x0a9e('0xa2'));var _0x18273f=_0x1808ba['attr'](_0x0a9e('0xa3'));if(_0x5d1e0e){var _0x23e2bd=parseInt(_0x1808ba[_0x0a9e('0x44')]())||0x2;_0x5583a4[_0x0a9e('0xa4')]([_0x5d1e0e,_0x18273f],_0x23e2bd,_0x23e2bd-0x1,function(_0xb0599a){_0x1808ba['val'](_0xb0599a);_0x0a9e('0x74')===typeof _0x33f0c9&&_0x33f0c9();});}};var _0x1756c7=function(_0x5ce99d,_0x23b447){var _0x2407f9=_0x4d5611(_0x5ce99d);var _0x5d1e0e=_0x2407f9[_0x0a9e('0x7c')](_0x0a9e('0xa2'));var _0xf8c6c4=_0x2407f9['attr'](_0x0a9e('0xa3'));if(_0x5d1e0e){var _0x4cf72d=parseInt(_0x2407f9[_0x0a9e('0x44')]())||0x1;_0x5583a4[_0x0a9e('0xa4')]([_0x5d1e0e,_0xf8c6c4],0x1,_0x4cf72d,function(_0x5e5b89){_0x2407f9[_0x0a9e('0x44')](_0x5e5b89);_0x0a9e('0x74')===typeof _0x23b447&&_0x23b447();});}};var _0x5d1e0e=_0x5a26c8['find']('.qd-ddc-prodQttWrapper:not(.qd_on)');_0x5d1e0e[_0x0a9e('0x71')](_0x0a9e('0xa5'))[_0x0a9e('0x7a')](function(){var _0x5a26c8=_0x4d5611(this);_0x5a26c8[_0x0a9e('0x34')](_0x0a9e('0xa6'))['on'](_0x0a9e('0xa7'),function(_0x3c75b9){_0x3c75b9[_0x0a9e('0xa8')]();_0x5d1e0e['addClass'](_0x0a9e('0xa9'));_0x2407f9(_0x5a26c8['find'](_0x0a9e('0x84')),function(){_0x5d1e0e[_0x0a9e('0x3e')](_0x0a9e('0xa9'));});});_0x5a26c8[_0x0a9e('0x34')](_0x0a9e('0xaa'))['on']('click.qd_ddc_minus',function(_0x436313){_0x436313[_0x0a9e('0xa8')]();_0x5d1e0e[_0x0a9e('0x71')](_0x0a9e('0xa9'));_0x3df9e4(_0x5a26c8[_0x0a9e('0x34')]('.qd-ddc-quantity'),function(){_0x5d1e0e['removeClass'](_0x0a9e('0xa9'));});});_0x5a26c8['find'](_0x0a9e('0x84'))['on'](_0x0a9e('0xab'),function(){_0x5d1e0e[_0x0a9e('0x71')](_0x0a9e('0xa9'));_0x1756c7(this,function(){_0x5d1e0e[_0x0a9e('0x3e')](_0x0a9e('0xa9'));});});_0x5a26c8['find']('.qd-ddc-quantity')['on'](_0x0a9e('0xac'),function(_0x5dfbe2){0xd==_0x5dfbe2[_0x0a9e('0x3d')]&&(_0x5d1e0e['addClass'](_0x0a9e('0xa9')),_0x1756c7(this,function(){_0x5d1e0e['removeClass']('qd-loading');}));});});_0x5a26c8[_0x0a9e('0x34')](_0x0a9e('0x77'))['each'](function(){var _0x5a26c8=_0x4d5611(this);_0x5a26c8[_0x0a9e('0x34')](_0x0a9e('0x86'))['on'](_0x0a9e('0xad'),function(){_0x5a26c8[_0x0a9e('0x71')]('qd-loading');_0x5583a4['removeProduct'](_0x4d5611(this),function(_0x16449b){_0x16449b?_0x5a26c8[_0x0a9e('0xae')](!0x0)[_0x0a9e('0xaf')](function(){_0x5a26c8[_0x0a9e('0xb0')]();_0x5583a4[_0x0a9e('0x4a')]();}):_0x5a26c8['removeClass'](_0x0a9e('0xa9'));});return!0x1;});});};_0x5583a4[_0x0a9e('0x46')]=function(_0x5416a9){var _0x3c313d=_0x5416a9[_0x0a9e('0x44')]();_0x3c313d=_0x3c313d[_0x0a9e('0x2')](/[^0-9\-]/g,'');_0x3c313d=_0x3c313d[_0x0a9e('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x0a9e('0xb1'));_0x3c313d=_0x3c313d[_0x0a9e('0x2')](/(.{9}).*/g,'$1');_0x5416a9[_0x0a9e('0x44')](_0x3c313d);0x9<=_0x3c313d[_0x0a9e('0x7')]&&(_0x5416a9[_0x0a9e('0xb2')](_0x0a9e('0xb3'))!=_0x3c313d&&_0x44dcfd['calculateShipping']({'postalCode':_0x3c313d,'country':_0x0a9e('0xb4')})[_0x0a9e('0xb5')](function(_0x2ada60){window[_0x0a9e('0x18')][_0x0a9e('0x6e')]=_0x2ada60;_0x5583a4['getCartInfoByUrl']();})['fail'](function(_0x21902c){_0x52a03d([_0x0a9e('0xb6'),_0x21902c]);updateCartData();}),_0x5416a9[_0x0a9e('0xb2')](_0x0a9e('0xb3'),_0x3c313d));};_0x5583a4[_0x0a9e('0xa4')]=function(_0x59e46f,_0x1339d0,_0x3c775a,_0x3450ae){function _0x52b661(_0x318fc3){_0x318fc3='boolean'!==typeof _0x318fc3?!0x1:_0x318fc3;_0x5583a4[_0x0a9e('0x69')]();window['_QuatroDigital_DropDown'][_0x0a9e('0x19')]=!0x1;_0x5583a4[_0x0a9e('0x4a')]();_0x0a9e('0x4')!==typeof window['_QuatroDigital_AmountProduct']&&_0x0a9e('0x74')===typeof window['_QuatroDigital_AmountProduct'][_0x0a9e('0x70')]&&window[_0x0a9e('0x6f')][_0x0a9e('0x70')][_0x0a9e('0x60')](this);_0x0a9e('0x74')===typeof adminCart&&adminCart();_0x4d5611['fn'][_0x0a9e('0x49')](!0x0,void 0x0,_0x318fc3);_0x0a9e('0x74')===typeof _0x3450ae&&_0x3450ae(_0x1339d0);}_0x3c775a=_0x3c775a||0x1;if(0x1>_0x3c775a)return _0x1339d0;if(_0x33bdb7[_0x0a9e('0x2a')]){if(_0x0a9e('0x4')===typeof window[_0x0a9e('0x18')][_0x0a9e('0x6e')][_0x0a9e('0x66')][_0x59e46f[0x1]])return _0x52a03d(_0x0a9e('0xb7')+_0x59e46f[0x1]+']'),_0x1339d0;window[_0x0a9e('0x18')][_0x0a9e('0x6e')][_0x0a9e('0x66')][_0x59e46f[0x1]]['quantity']=_0x3c775a;window['_QuatroDigital_DropDown'][_0x0a9e('0x6e')]['items'][_0x59e46f[0x1]][_0x0a9e('0xb8')]=_0x59e46f[0x1];_0x44dcfd[_0x0a9e('0xb9')]([window['_QuatroDigital_DropDown'][_0x0a9e('0x6e')][_0x0a9e('0x66')][_0x59e46f[0x1]]],[_0x0a9e('0x66'),_0x0a9e('0x73'),'shippingData'])[_0x0a9e('0xb5')](function(_0x26cb76){window[_0x0a9e('0x18')][_0x0a9e('0x6e')]=_0x26cb76;_0x52b661(!0x0);})['fail'](function(_0x19e9ed){_0x52a03d([_0x0a9e('0xba'),_0x19e9ed]);_0x52b661();});}else _0x52a03d(_0x0a9e('0xbb'));};_0x5583a4['removeProduct']=function(_0x2650eb,_0x270df8){function _0x17b29d(_0x54b107){_0x54b107=_0x0a9e('0xbc')!==typeof _0x54b107?!0x1:_0x54b107;_0x0a9e('0x4')!==typeof window[_0x0a9e('0x6f')]&&_0x0a9e('0x74')===typeof window[_0x0a9e('0x6f')]['exec']&&window[_0x0a9e('0x6f')][_0x0a9e('0x70')]['call'](this);_0x0a9e('0x74')===typeof adminCart&&adminCart();_0x4d5611['fn'][_0x0a9e('0x49')](!0x0,void 0x0,_0x54b107);_0x0a9e('0x74')===typeof _0x270df8&&_0x270df8(_0x5d1e0e);}var _0x5d1e0e=!0x1,_0x5c3b6f=_0x4d5611(_0x2650eb)['attr'](_0x0a9e('0xa3'));if(_0x33bdb7[_0x0a9e('0x2a')]){if('undefined'===typeof window[_0x0a9e('0x18')][_0x0a9e('0x6e')][_0x0a9e('0x66')][_0x5c3b6f])return _0x52a03d('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x5c3b6f+']'),_0x5d1e0e;window[_0x0a9e('0x18')][_0x0a9e('0x6e')][_0x0a9e('0x66')][_0x5c3b6f][_0x0a9e('0xb8')]=_0x5c3b6f;_0x44dcfd[_0x0a9e('0xbd')]([window[_0x0a9e('0x18')][_0x0a9e('0x6e')][_0x0a9e('0x66')][_0x5c3b6f]],[_0x0a9e('0x66'),'totalizers',_0x0a9e('0x8c')])['done'](function(_0x138cf5){_0x5d1e0e=!0x0;window[_0x0a9e('0x18')][_0x0a9e('0x6e')]=_0x138cf5;_0x4e67ab(_0x138cf5);_0x17b29d(!0x0);})[_0x0a9e('0xbe')](function(_0x407e9d){_0x52a03d([_0x0a9e('0xbf'),_0x407e9d]);_0x17b29d();});}else alert('Atenção,\x20este\x20método\x20esta\x20descontinuado.');};_0x5583a4[_0x0a9e('0x42')]=function(_0x33da81,_0xe25eb5,_0x1af799,_0x51aa2f){_0x51aa2f=_0x51aa2f||_0x4d5611(_0x0a9e('0xc0'));_0x33da81=_0x33da81||'+';_0xe25eb5=_0xe25eb5||0.9*_0x51aa2f[_0x0a9e('0xc1')]();_0x51aa2f[_0x0a9e('0xae')](!0x0,!0x0)[_0x0a9e('0xc2')]({'scrollTop':isNaN(_0x1af799)?_0x33da81+'='+_0xe25eb5+'px':_0x1af799});};_0x33bdb7[_0x0a9e('0x47')]||(_0x5583a4[_0x0a9e('0x69')](),_0x4d5611['fn'][_0x0a9e('0x49')](!0x0));_0x4d5611(window)['on'](_0x0a9e('0xc3'),function(){try{window[_0x0a9e('0x18')][_0x0a9e('0x6e')]=void 0x0,_0x5583a4['getCartInfoByUrl']();}catch(_0x2272bc){_0x52a03d(_0x0a9e('0xc4')+_0x2272bc[_0x0a9e('0xe')],_0x0a9e('0xc5'));}});_0x0a9e('0x74')===typeof _0x33bdb7[_0x0a9e('0x9')]?_0x33bdb7[_0x0a9e('0x9')][_0x0a9e('0x60')](this):_0x52a03d('Callback\x20não\x20é\x20uma\x20função');};_0x4d5611['fn'][_0x0a9e('0x1a')]=function(_0xd2391){var _0x1a9ef1=_0x4d5611(this);_0x1a9ef1['fn']=new _0x4d5611['QD_dropDownCart'](this,_0xd2391);return _0x1a9ef1;};}catch(_0x1402c7){_0x0a9e('0x4')!==typeof console&&_0x0a9e('0x74')===typeof console[_0x0a9e('0xc')]&&console[_0x0a9e('0xc')](_0x0a9e('0xd'),_0x1402c7);}}(this));(function(_0x424f1b){try{var _0x336a19=jQuery;window[_0x0a9e('0x6f')]=window[_0x0a9e('0x6f')]||{};window['_QuatroDigital_AmountProduct'][_0x0a9e('0x66')]={};window[_0x0a9e('0x6f')][_0x0a9e('0xc6')]=!0x1;window[_0x0a9e('0x6f')][_0x0a9e('0xc7')]=!0x1;window[_0x0a9e('0x6f')]['quickViewUpdate']=!0x1;var _0x382687=function(){if(window['_QuatroDigital_AmountProduct']['allowRecalculate']){var _0x573df6=!0x1;var _0x19e4e6={};window[_0x0a9e('0x6f')][_0x0a9e('0x66')]={};for(_0x1b637c in window[_0x0a9e('0x18')]['getOrderForm'][_0x0a9e('0x66')])if(_0x0a9e('0xf')===typeof window[_0x0a9e('0x18')][_0x0a9e('0x6e')][_0x0a9e('0x66')][_0x1b637c]){var _0x4b6c21=window['_QuatroDigital_DropDown'][_0x0a9e('0x6e')][_0x0a9e('0x66')][_0x1b637c];_0x0a9e('0x4')!==typeof _0x4b6c21['productId']&&null!==_0x4b6c21[_0x0a9e('0xc8')]&&''!==_0x4b6c21[_0x0a9e('0xc8')]&&(window[_0x0a9e('0x6f')]['items'][_0x0a9e('0xc9')+_0x4b6c21[_0x0a9e('0xc8')]]=window[_0x0a9e('0x6f')]['items'][_0x0a9e('0xc9')+_0x4b6c21[_0x0a9e('0xc8')]]||{},window[_0x0a9e('0x6f')]['items']['prod_'+_0x4b6c21['productId']][_0x0a9e('0xca')]=_0x4b6c21[_0x0a9e('0xc8')],_0x19e4e6[_0x0a9e('0xc9')+_0x4b6c21[_0x0a9e('0xc8')]]||(window['_QuatroDigital_AmountProduct'][_0x0a9e('0x66')]['prod_'+_0x4b6c21[_0x0a9e('0xc8')]][_0x0a9e('0xcb')]=0x0),window[_0x0a9e('0x6f')]['items'][_0x0a9e('0xc9')+_0x4b6c21[_0x0a9e('0xc8')]][_0x0a9e('0xcb')]+=_0x4b6c21['quantity'],_0x573df6=!0x0,_0x19e4e6[_0x0a9e('0xc9')+_0x4b6c21['productId']]=!0x0);}var _0x1b637c=_0x573df6;}else _0x1b637c=void 0x0;window['_QuatroDigital_AmountProduct'][_0x0a9e('0xc6')]&&(_0x336a19('.qd-bap-wrapper')[_0x0a9e('0xb0')](),_0x336a19(_0x0a9e('0xcc'))[_0x0a9e('0x3e')](_0x0a9e('0xcd')));for(var _0x1e306c in window[_0x0a9e('0x6f')][_0x0a9e('0x66')]){_0x4b6c21=window['_QuatroDigital_AmountProduct'][_0x0a9e('0x66')][_0x1e306c];if(_0x0a9e('0xf')!==typeof _0x4b6c21)return;_0x19e4e6=_0x336a19('input.qd-productId[value='+_0x4b6c21[_0x0a9e('0xca')]+']')[_0x0a9e('0x0')]('li');if(window['_QuatroDigital_AmountProduct'][_0x0a9e('0xc6')]||!_0x19e4e6[_0x0a9e('0x34')](_0x0a9e('0xce'))['length'])_0x573df6=_0x336a19(_0x0a9e('0xcf')),_0x573df6[_0x0a9e('0x34')](_0x0a9e('0xd0'))[_0x0a9e('0x58')](_0x4b6c21[_0x0a9e('0xcb')]),_0x4b6c21=_0x19e4e6[_0x0a9e('0x34')](_0x0a9e('0xd1')),_0x4b6c21[_0x0a9e('0x7')]?_0x4b6c21[_0x0a9e('0xd2')](_0x573df6)[_0x0a9e('0x71')]('qd-bap-item-added'):_0x19e4e6[_0x0a9e('0xd2')](_0x573df6);}_0x1b637c&&(window['_QuatroDigital_AmountProduct'][_0x0a9e('0xc6')]=!0x1);};window[_0x0a9e('0x6f')][_0x0a9e('0x70')]=function(){window[_0x0a9e('0x6f')][_0x0a9e('0xc6')]=!0x0;_0x382687[_0x0a9e('0x60')](this);};_0x336a19(document)['ajaxStop'](function(){_0x382687[_0x0a9e('0x60')](this);});}catch(_0x469035){_0x0a9e('0x4')!==typeof console&&'function'===typeof console[_0x0a9e('0xc')]&&console[_0x0a9e('0xc')](_0x0a9e('0xd'),_0x469035);}}(this));(function(){try{var _0x3272b8=jQuery,_0x31e1e0,_0x1d0a78={'selector':_0x0a9e('0xd3'),'dropDown':{},'buyButton':{}};_0x3272b8['QD_smartCart']=function(_0x4e1b3){var _0x228c10={};_0x31e1e0=_0x3272b8[_0x0a9e('0x22')](!0x0,{},_0x1d0a78,_0x4e1b3);_0x4e1b3=_0x3272b8(_0x31e1e0[_0x0a9e('0xd4')])[_0x0a9e('0x1a')](_0x31e1e0[_0x0a9e('0xd5')]);_0x228c10[_0x0a9e('0xd6')]='undefined'!==typeof _0x31e1e0['dropDown'][_0x0a9e('0x47')]&&!0x1===_0x31e1e0[_0x0a9e('0xd5')][_0x0a9e('0x47')]?_0x3272b8(_0x31e1e0[_0x0a9e('0xd4')])[_0x0a9e('0xd7')](_0x4e1b3['fn'],_0x31e1e0[_0x0a9e('0xd6')]):_0x3272b8(_0x31e1e0[_0x0a9e('0xd4')])['QD_buyButton'](_0x31e1e0[_0x0a9e('0xd6')]);_0x228c10[_0x0a9e('0xd5')]=_0x4e1b3;return _0x228c10;};_0x3272b8['fn'][_0x0a9e('0xd8')]=function(){_0x0a9e('0xf')===typeof console&&_0x0a9e('0x74')===typeof console[_0x0a9e('0x15')]&&console[_0x0a9e('0x15')]('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x3272b8[_0x0a9e('0xd8')]=_0x3272b8['fn'][_0x0a9e('0xd8')];}catch(_0x231826){'undefined'!==typeof console&&_0x0a9e('0x74')===typeof console[_0x0a9e('0xc')]&&console[_0x0a9e('0xc')](_0x0a9e('0xd'),_0x231826);}}());
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
