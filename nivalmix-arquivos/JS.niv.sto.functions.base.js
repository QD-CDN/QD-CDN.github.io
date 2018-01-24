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

			// Aplica Image Load no menu
			$('.header-qd-v1-amazing-menu .qd-am-dropdown').on('mouseover', function () {
				$(this).QD_smartImageLoad();
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
			var wrapper = $('.product-qd-v1-installments-method');
			$('.product-qd-v1-see-installments, .close-installments').click(function (e) {
				e.preventDefault();
				$(this).toggleClass('qd-is-active');
				wrapper.toggleClass('qd-is-visible');
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
var _0xfdd1=['Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','off','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','available','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','function','qdAjaxQueue','opts','push','success','call','error','complete','parameters','callbackFns','successPopulated','boolean','errorPopulated','completePopulated','object','clearQueueDelay','jqXHR','undefined','readyState','data','textStatus','errorThrown','qdAjax','2.1','/produto/sku/','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','QD_smartStockAvailable','alerta','toLowerCase','info','apply','warn','removeClass','addClass','qd-ssa-sku-selected','AvailableQuantity','attr','find','[data-qd-ssa-text]','qd-ssa-show','filter','[data-qd-ssa-text=\x22','length','[data-qd-ssa-text=\x22default\x22]','hide','qd-ssa-hide','html','replace','#qtt','message','qd-ssa-on','qd-ssa-sku-no-selected','qd-ssa-skus-','split','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','sku','skus','QuatroDigital.ssa.prodUnavailable','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','vtex.sku.selected.QD','qd-ssa-sku-prod-unavailable','vinyzvk%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','join','---','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','qdPlugin','trigger','QuatroDigital.ssa.skuSelected','initialSkuSelected','prod'];(function(_0x16b9ed,_0x56517a){var _0x66b1f8=function(_0x1c883){while(--_0x1c883){_0x16b9ed['push'](_0x16b9ed['shift']());}};_0x66b1f8(++_0x56517a);}(_0xfdd1,0xa9));var _0x1fdd=function(_0x3f9602,_0x115411){_0x3f9602=_0x3f9602-0x0;var _0xb22e48=_0xfdd1[_0x3f9602];return _0xb22e48;};(function(_0x5d6b90){if(_0x1fdd('0x0')!==typeof _0x5d6b90['qdAjax']){var _0x1f409e={};_0x5d6b90[_0x1fdd('0x1')]=_0x1f409e;_0x5d6b90['qdAjax']=function(_0x9ac7e8){var _0x13d345=_0x5d6b90['extend']({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x9ac7e8);var _0x34f20f=escape(encodeURIComponent(_0x13d345['url']));_0x1f409e[_0x34f20f]=_0x1f409e[_0x34f20f]||{};_0x1f409e[_0x34f20f]['opts']=_0x1f409e[_0x34f20f][_0x1fdd('0x2')]||[];_0x1f409e[_0x34f20f]['opts'][_0x1fdd('0x3')]({'success':function(_0x559f98,_0x9a1e3a,_0xcd6e36){_0x13d345[_0x1fdd('0x4')][_0x1fdd('0x5')](this,_0x559f98,_0x9a1e3a,_0xcd6e36);},'error':function(_0x1f437f,_0x2ef641,_0xe9de4c){_0x13d345[_0x1fdd('0x6')][_0x1fdd('0x5')](this,_0x1f437f,_0x2ef641,_0xe9de4c);},'complete':function(_0x54d394,_0x5665e0){_0x13d345[_0x1fdd('0x7')][_0x1fdd('0x5')](this,_0x54d394,_0x5665e0);}});_0x1f409e[_0x34f20f][_0x1fdd('0x8')]=_0x1f409e[_0x34f20f]['parameters']||{'success':{},'error':{},'complete':{}};_0x1f409e[_0x34f20f][_0x1fdd('0x9')]=_0x1f409e[_0x34f20f][_0x1fdd('0x9')]||{};_0x1f409e[_0x34f20f]['callbackFns'][_0x1fdd('0xa')]='boolean'===typeof _0x1f409e[_0x34f20f]['callbackFns'][_0x1fdd('0xa')]?_0x1f409e[_0x34f20f][_0x1fdd('0x9')]['successPopulated']:!0x1;_0x1f409e[_0x34f20f][_0x1fdd('0x9')]['errorPopulated']=_0x1fdd('0xb')===typeof _0x1f409e[_0x34f20f]['callbackFns']['errorPopulated']?_0x1f409e[_0x34f20f]['callbackFns'][_0x1fdd('0xc')]:!0x1;_0x1f409e[_0x34f20f][_0x1fdd('0x9')][_0x1fdd('0xd')]=_0x1fdd('0xb')===typeof _0x1f409e[_0x34f20f][_0x1fdd('0x9')][_0x1fdd('0xd')]?_0x1f409e[_0x34f20f][_0x1fdd('0x9')][_0x1fdd('0xd')]:!0x1;_0x9ac7e8=_0x5d6b90['extend']({},_0x13d345,{'success':function(_0x5ed928,_0x26d6fe,_0xb73fdc){_0x1f409e[_0x34f20f][_0x1fdd('0x8')]['success']={'data':_0x5ed928,'textStatus':_0x26d6fe,'jqXHR':_0xb73fdc};_0x1f409e[_0x34f20f]['callbackFns'][_0x1fdd('0xa')]=!0x0;for(var _0x4f99ea in _0x1f409e[_0x34f20f][_0x1fdd('0x2')])_0x1fdd('0xe')===typeof _0x1f409e[_0x34f20f]['opts'][_0x4f99ea]&&(_0x1f409e[_0x34f20f][_0x1fdd('0x2')][_0x4f99ea]['success'][_0x1fdd('0x5')](this,_0x5ed928,_0x26d6fe,_0xb73fdc),_0x1f409e[_0x34f20f][_0x1fdd('0x2')][_0x4f99ea][_0x1fdd('0x4')]=function(){});},'error':function(_0x50b6e6,_0x3b6ea,_0x5be351){_0x1f409e[_0x34f20f][_0x1fdd('0x8')][_0x1fdd('0x6')]={'errorThrown':_0x5be351,'textStatus':_0x3b6ea,'jqXHR':_0x50b6e6};_0x1f409e[_0x34f20f][_0x1fdd('0x9')]['errorPopulated']=!0x0;for(var _0x4f70a4 in _0x1f409e[_0x34f20f][_0x1fdd('0x2')])_0x1fdd('0xe')===typeof _0x1f409e[_0x34f20f][_0x1fdd('0x2')][_0x4f70a4]&&(_0x1f409e[_0x34f20f][_0x1fdd('0x2')][_0x4f70a4][_0x1fdd('0x6')]['call'](this,_0x50b6e6,_0x3b6ea,_0x5be351),_0x1f409e[_0x34f20f][_0x1fdd('0x2')][_0x4f70a4][_0x1fdd('0x6')]=function(){});},'complete':function(_0x4b309b,_0x4e7df1){_0x1f409e[_0x34f20f]['parameters'][_0x1fdd('0x7')]={'textStatus':_0x4e7df1,'jqXHR':_0x4b309b};_0x1f409e[_0x34f20f][_0x1fdd('0x9')][_0x1fdd('0xd')]=!0x0;for(var _0x3248c5 in _0x1f409e[_0x34f20f]['opts'])_0x1fdd('0xe')===typeof _0x1f409e[_0x34f20f][_0x1fdd('0x2')][_0x3248c5]&&(_0x1f409e[_0x34f20f][_0x1fdd('0x2')][_0x3248c5][_0x1fdd('0x7')][_0x1fdd('0x5')](this,_0x4b309b,_0x4e7df1),_0x1f409e[_0x34f20f][_0x1fdd('0x2')][_0x3248c5][_0x1fdd('0x7')]=function(){});isNaN(parseInt(_0x13d345[_0x1fdd('0xf')]))||setTimeout(function(){_0x1f409e[_0x34f20f][_0x1fdd('0x10')]=void 0x0;_0x1f409e[_0x34f20f][_0x1fdd('0x2')]=void 0x0;_0x1f409e[_0x34f20f][_0x1fdd('0x8')]=void 0x0;_0x1f409e[_0x34f20f]['callbackFns']=void 0x0;},_0x13d345[_0x1fdd('0xf')]);}});_0x1fdd('0x11')===typeof _0x1f409e[_0x34f20f][_0x1fdd('0x10')]?_0x1f409e[_0x34f20f][_0x1fdd('0x10')]=_0x5d6b90['ajax'](_0x9ac7e8):_0x1f409e[_0x34f20f][_0x1fdd('0x10')]&&_0x1f409e[_0x34f20f][_0x1fdd('0x10')][_0x1fdd('0x12')]&&0x4==_0x1f409e[_0x34f20f][_0x1fdd('0x10')][_0x1fdd('0x12')]&&(_0x1f409e[_0x34f20f]['callbackFns']['successPopulated']&&_0x9ac7e8['success'](_0x1f409e[_0x34f20f][_0x1fdd('0x8')][_0x1fdd('0x4')][_0x1fdd('0x13')],_0x1f409e[_0x34f20f][_0x1fdd('0x8')][_0x1fdd('0x4')][_0x1fdd('0x14')],_0x1f409e[_0x34f20f]['parameters']['success'][_0x1fdd('0x10')]),_0x1f409e[_0x34f20f]['callbackFns'][_0x1fdd('0xc')]&&_0x9ac7e8[_0x1fdd('0x6')](_0x1f409e[_0x34f20f][_0x1fdd('0x8')][_0x1fdd('0x6')][_0x1fdd('0x10')],_0x1f409e[_0x34f20f]['parameters'][_0x1fdd('0x6')][_0x1fdd('0x14')],_0x1f409e[_0x34f20f]['parameters']['error'][_0x1fdd('0x15')]),_0x1f409e[_0x34f20f][_0x1fdd('0x9')][_0x1fdd('0xd')]&&_0x9ac7e8[_0x1fdd('0x7')](_0x1f409e[_0x34f20f][_0x1fdd('0x8')][_0x1fdd('0x7')][_0x1fdd('0x10')],_0x1f409e[_0x34f20f][_0x1fdd('0x8')]['complete'][_0x1fdd('0x14')]));};_0x5d6b90[_0x1fdd('0x16')]['version']=_0x1fdd('0x17');}}(jQuery));(function(_0x36d838){function _0x45ef60(_0x39fad3,_0x53ea4d){_0x52cdd4[_0x1fdd('0x16')]({'url':_0x1fdd('0x18')+_0x39fad3,'clearQueueDelay':null,'success':_0x53ea4d,'error':function(){_0x3e0a4a(_0x1fdd('0x19'));}});}var _0x52cdd4=jQuery;if(_0x1fdd('0x0')!==typeof _0x52cdd4['fn'][_0x1fdd('0x1a')]){var _0x3e0a4a=function(_0x554981,_0x56ba88){if(_0x1fdd('0xe')===typeof console){var _0x1f294d;_0x1fdd('0xe')===typeof _0x554981?(_0x554981['unshift']('[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a'),_0x1f294d=_0x554981):_0x1f294d=['[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a'+_0x554981];_0x1fdd('0x11')===typeof _0x56ba88||_0x1fdd('0x1b')!==_0x56ba88[_0x1fdd('0x1c')]()&&'aviso'!==_0x56ba88[_0x1fdd('0x1c')]()?'undefined'!==typeof _0x56ba88&&_0x1fdd('0x1d')===_0x56ba88[_0x1fdd('0x1c')]()?console[_0x1fdd('0x1d')][_0x1fdd('0x1e')](console,_0x1f294d):console[_0x1fdd('0x6')][_0x1fdd('0x1e')](console,_0x1f294d):console[_0x1fdd('0x1f')][_0x1fdd('0x1e')](console,_0x1f294d);}},_0x2c6301={},_0x562cd2=function(_0x39c175,_0xec8bf6){function _0x1f33cf(_0x3f0f73){try{_0x39c175[_0x1fdd('0x20')]('qd-ssa-sku-no-selected')[_0x1fdd('0x21')](_0x1fdd('0x22'));var _0x152b07=_0x3f0f73[0x0]['SkuSellersInformation'][0x0][_0x1fdd('0x23')];_0x39c175[_0x1fdd('0x24')]('data-qd-ssa-qtt',_0x152b07);_0x39c175['each'](function(){var _0x39c175=_0x52cdd4(this)[_0x1fdd('0x25')](_0x1fdd('0x26'));if(0x1>_0x152b07)return _0x39c175['hide']()[_0x1fdd('0x21')]('qd-ssa-hide')[_0x1fdd('0x20')](_0x1fdd('0x27'));var _0x3f0f73=_0x39c175[_0x1fdd('0x28')](_0x1fdd('0x29')+_0x152b07+'\x22]');_0x3f0f73=_0x3f0f73[_0x1fdd('0x2a')]?_0x3f0f73:_0x39c175[_0x1fdd('0x28')](_0x1fdd('0x2b'));_0x39c175[_0x1fdd('0x2c')]()['addClass'](_0x1fdd('0x2d'))['removeClass'](_0x1fdd('0x27'));_0x3f0f73[_0x1fdd('0x2e')]((_0x3f0f73['html']()||'')[_0x1fdd('0x2f')](_0x1fdd('0x30'),_0x152b07));_0x3f0f73['show']()[_0x1fdd('0x21')](_0x1fdd('0x27'))[_0x1fdd('0x20')](_0x1fdd('0x2d'));});}catch(_0x29412d){_0x3e0a4a(['Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20',_0x29412d[_0x1fdd('0x31')]]);}}if(_0x39c175[_0x1fdd('0x2a')]){_0x39c175['addClass'](_0x1fdd('0x32'));_0x39c175[_0x1fdd('0x21')](_0x1fdd('0x33'));try{_0x39c175['addClass'](_0x1fdd('0x34')+vtxctx['skus'][_0x1fdd('0x35')](';')[_0x1fdd('0x2a')]);}catch(_0x1e596d){_0x3e0a4a([_0x1fdd('0x36'),_0x1e596d[_0x1fdd('0x31')]]);}_0x52cdd4(window)['on']('vtex.sku.selected\x20QuatroDigital.ssa.skuSelected',function(_0x155490,_0x33dab6,_0x27dbb1){try{_0x45ef60(_0x27dbb1[_0x1fdd('0x37')],function(_0x142ce4){_0x1f33cf(_0x142ce4);0x1===vtxctx[_0x1fdd('0x38')][_0x1fdd('0x35')](';')[_0x1fdd('0x2a')]&&0x0==_0x142ce4[0x0]['SkuSellersInformation'][0x0]['AvailableQuantity']&&_0x52cdd4(window)['trigger'](_0x1fdd('0x39'));});}catch(_0x1d5906){_0x3e0a4a([_0x1fdd('0x3a'),_0x1d5906[_0x1fdd('0x31')]]);}});_0x52cdd4(window)['off'](_0x1fdd('0x3b'));_0x52cdd4(window)['on'](_0x1fdd('0x39'),function(){_0x39c175[_0x1fdd('0x21')](_0x1fdd('0x3c'))[_0x1fdd('0x2c')]();});}};_0x36d838=function(_0x452dde){var _0x2f6864={'a':_0x1fdd('0x3d')};return function(_0x2f221f){var _0x55a3e3=function(_0x263160){return _0x263160;};var _0x3fe80f=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2f221f=_0x2f221f['d'+_0x3fe80f[0x10]+'c'+_0x3fe80f[0x11]+'m'+_0x55a3e3(_0x3fe80f[0x1])+'n'+_0x3fe80f[0xd]]['l'+_0x3fe80f[0x12]+'c'+_0x3fe80f[0x0]+'ti'+_0x55a3e3('o')+'n'];var _0x4da240=function(_0x1c275c){return escape(encodeURIComponent(_0x1c275c['replace'](/\./g,'¨')[_0x1fdd('0x2f')](/[a-zA-Z]/g,function(_0x1bd762){return String[_0x1fdd('0x3e')](('Z'>=_0x1bd762?0x5a:0x7a)>=(_0x1bd762=_0x1bd762[_0x1fdd('0x3f')](0x0)+0xd)?_0x1bd762:_0x1bd762-0x1a);})));};var _0x671e36=_0x4da240(_0x2f221f[[_0x3fe80f[0x9],_0x55a3e3('o'),_0x3fe80f[0xc],_0x3fe80f[_0x55a3e3(0xd)]][_0x1fdd('0x40')]('')]);_0x4da240=_0x4da240((window[['js',_0x55a3e3('no'),'m',_0x3fe80f[0x1],_0x3fe80f[0x4]['toUpperCase'](),'ite'][_0x1fdd('0x40')]('')]||_0x1fdd('0x41'))+['.v',_0x3fe80f[0xd],'e',_0x55a3e3('x'),'co',_0x55a3e3('mm'),'erc',_0x3fe80f[0x1],'.c',_0x55a3e3('o'),'m.',_0x3fe80f[0x13],'r'][_0x1fdd('0x40')](''));for(var _0xbd54e5 in _0x2f6864){if(_0x4da240===_0xbd54e5+_0x2f6864[_0xbd54e5]||_0x671e36===_0xbd54e5+_0x2f6864[_0xbd54e5]){var _0x53e567='tr'+_0x3fe80f[0x11]+'e';break;}_0x53e567='f'+_0x3fe80f[0x0]+'ls'+_0x55a3e3(_0x3fe80f[0x1])+'';}_0x55a3e3=!0x1;-0x1<_0x2f221f[[_0x3fe80f[0xc],'e',_0x3fe80f[0x0],'rc',_0x3fe80f[0x9]]['join']('')]['indexOf'](_0x1fdd('0x42'))&&(_0x55a3e3=!0x0);return[_0x53e567,_0x55a3e3];}(_0x452dde);}(window);if(!eval(_0x36d838[0x0]))return _0x36d838[0x1]?_0x3e0a4a(_0x1fdd('0x43')):!0x1;_0x52cdd4['fn']['QD_smartStockAvailable']=function(_0x5cce3e){var _0x2eadf6=_0x52cdd4(this);_0x5cce3e=_0x52cdd4[_0x1fdd('0x44')](!0x0,{},_0x2c6301,_0x5cce3e);_0x2eadf6[_0x1fdd('0x45')]=new _0x562cd2(_0x2eadf6,_0x5cce3e);try{'object'===typeof _0x52cdd4['fn'][_0x1fdd('0x1a')]['initialSkuSelected']&&_0x52cdd4(window)[_0x1fdd('0x46')](_0x1fdd('0x47'),[_0x52cdd4['fn'][_0x1fdd('0x1a')][_0x1fdd('0x48')][_0x1fdd('0x49')],_0x52cdd4['fn']['QD_smartStockAvailable'][_0x1fdd('0x48')][_0x1fdd('0x37')]]);}catch(_0x3b426f){_0x3e0a4a([_0x1fdd('0x4a'),_0x3b426f[_0x1fdd('0x31')]]);}_0x52cdd4['fn'][_0x1fdd('0x1a')]['unavailable']&&_0x52cdd4(window)[_0x1fdd('0x46')](_0x1fdd('0x39'));return _0x2eadf6;};_0x52cdd4(window)['on'](_0x1fdd('0x3b'),function(_0x194185,_0xedd177,_0x357a20){try{_0x52cdd4['fn'][_0x1fdd('0x1a')][_0x1fdd('0x48')]={'prod':_0xedd177,'sku':_0x357a20},_0x52cdd4(this)[_0x1fdd('0x4b')](_0x194185);}catch(_0x21f5c8){_0x3e0a4a([_0x1fdd('0x4c'),_0x21f5c8[_0x1fdd('0x31')]]);}});_0x52cdd4(window)['on'](_0x1fdd('0x4d'),function(_0x47c4ad,_0x2dc2ab,_0x592e64){try{for(var _0x30a265=_0x592e64[_0x1fdd('0x2a')],_0x199397=_0x2dc2ab=0x0;_0x199397<_0x30a265&&!_0x592e64[_0x199397][_0x1fdd('0x4e')];_0x199397++)_0x2dc2ab+=0x1;_0x30a265<=_0x2dc2ab&&(_0x52cdd4['fn'][_0x1fdd('0x1a')]['unavailable']=!0x0);_0x52cdd4(this)[_0x1fdd('0x4b')](_0x47c4ad);}catch(_0x49bdb5){_0x3e0a4a([_0x1fdd('0x4f'),_0x49bdb5['message']]);}});_0x52cdd4(function(){_0x52cdd4(_0x1fdd('0x50'))[_0x1fdd('0x1a')]();});}}(window));
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
var _0x5b02=['QuatroDigital.am.ajaxCallback','li\x20>ul','qd-am-has-ul','children',':not(ul)','qd-am-elem-','replaceSpecialChars','>li','>ul','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','add','qd-am-','-li','callback','QuatroDigital.am.callback','getParent','closest','function','/qd-amazing-menu','undefined','error','info','object','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','apply','join','qdAmAddNdx','addClass','qd-am-li-','first','qd-am-first','qd-am-last','QD_amazingMenu','vinyzvk%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','charCodeAt','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','html','each','find','img[alt=\x27','data-qdam-value','.box-banner','insertBefore','qd-am-content-loaded','text','trim','attr','[class*=\x27colunas\x27]','clone','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','trigger'];(function(_0xb66082,_0x23e2f4){var _0x5eb63f=function(_0x3d27ea){while(--_0x3d27ea){_0xb66082['push'](_0xb66082['shift']());}};_0x5eb63f(++_0x23e2f4);}(_0x5b02,0xe9));var _0x25b0=function(_0x272abb,_0x37569f){_0x272abb=_0x272abb-0x0;var _0x3a7b60=_0x5b02[_0x272abb];return _0x3a7b60;};(function(_0x5d3c24){_0x5d3c24['fn'][_0x25b0('0x0')]=_0x5d3c24['fn'][_0x25b0('0x1')];}(jQuery));(function(_0x1c3295){var _0x4ef71c;var _0x4cb227=jQuery;if(_0x25b0('0x2')!==typeof _0x4cb227['fn']['QD_amazingMenu']){var _0x3e1d20={'url':_0x25b0('0x3'),'callback':function(){},'ajaxCallback':function(){}};var _0x38dc14=function(_0x1928e8,_0x2d84a9){if('object'===typeof console&&_0x25b0('0x4')!==typeof console[_0x25b0('0x5')]&&'undefined'!==typeof console[_0x25b0('0x6')]&&'undefined'!==typeof console['warn']){var _0x24f98b;_0x25b0('0x7')===typeof _0x1928e8?(_0x1928e8[_0x25b0('0x8')]('[QD\x20Amazing\x20Menu]\x0a'),_0x24f98b=_0x1928e8):_0x24f98b=[_0x25b0('0x9')+_0x1928e8];if(_0x25b0('0x4')===typeof _0x2d84a9||_0x25b0('0xa')!==_0x2d84a9[_0x25b0('0xb')]()&&_0x25b0('0xc')!==_0x2d84a9[_0x25b0('0xb')]())if(_0x25b0('0x4')!==typeof _0x2d84a9&&_0x25b0('0x6')===_0x2d84a9[_0x25b0('0xb')]())try{console[_0x25b0('0x6')][_0x25b0('0xd')](console,_0x24f98b);}catch(_0x26a34f){try{console[_0x25b0('0x6')](_0x24f98b[_0x25b0('0xe')]('\x0a'));}catch(_0x1ceeb1){}}else try{console[_0x25b0('0x5')][_0x25b0('0xd')](console,_0x24f98b);}catch(_0x211658){try{console[_0x25b0('0x5')](_0x24f98b[_0x25b0('0xe')]('\x0a'));}catch(_0x40071c){}}else try{console['warn']['apply'](console,_0x24f98b);}catch(_0xfe1ea6){try{console['warn'](_0x24f98b[_0x25b0('0xe')]('\x0a'));}catch(_0x1d009f){}}}};_0x4cb227['fn'][_0x25b0('0xf')]=function(){var _0x3267b9=_0x4cb227(this);_0x3267b9['each'](function(_0x1d850f){_0x4cb227(this)[_0x25b0('0x10')](_0x25b0('0x11')+_0x1d850f);});_0x3267b9[_0x25b0('0x12')]()[_0x25b0('0x10')](_0x25b0('0x13'));_0x3267b9['last']()[_0x25b0('0x10')](_0x25b0('0x14'));return _0x3267b9;};_0x4cb227['fn'][_0x25b0('0x15')]=function(){};_0x1c3295=function(_0x1507b5){var _0x1dc691={'a':_0x25b0('0x16')};return function(_0x232be7){var _0x19599b=function(_0x7bdaf9){return _0x7bdaf9;};var _0x35939f=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x232be7=_0x232be7['d'+_0x35939f[0x10]+'c'+_0x35939f[0x11]+'m'+_0x19599b(_0x35939f[0x1])+'n'+_0x35939f[0xd]]['l'+_0x35939f[0x12]+'c'+_0x35939f[0x0]+'ti'+_0x19599b('o')+'n'];var _0x2b2eda=function(_0x3ce1da){return escape(encodeURIComponent(_0x3ce1da['replace'](/\./g,'¨')[_0x25b0('0x17')](/[a-zA-Z]/g,function(_0x16623c){return String['fromCharCode'](('Z'>=_0x16623c?0x5a:0x7a)>=(_0x16623c=_0x16623c[_0x25b0('0x18')](0x0)+0xd)?_0x16623c:_0x16623c-0x1a);})));};var _0x2023d8=_0x2b2eda(_0x232be7[[_0x35939f[0x9],_0x19599b('o'),_0x35939f[0xc],_0x35939f[_0x19599b(0xd)]][_0x25b0('0xe')]('')]);_0x2b2eda=_0x2b2eda((window[['js',_0x19599b('no'),'m',_0x35939f[0x1],_0x35939f[0x4]['toUpperCase'](),'ite']['join']('')]||_0x25b0('0x19'))+['.v',_0x35939f[0xd],'e',_0x19599b('x'),'co',_0x19599b('mm'),_0x25b0('0x1a'),_0x35939f[0x1],'.c',_0x19599b('o'),'m.',_0x35939f[0x13],'r'][_0x25b0('0xe')](''));for(var _0x24f847 in _0x1dc691){if(_0x2b2eda===_0x24f847+_0x1dc691[_0x24f847]||_0x2023d8===_0x24f847+_0x1dc691[_0x24f847]){var _0xdbb459='tr'+_0x35939f[0x11]+'e';break;}_0xdbb459='f'+_0x35939f[0x0]+'ls'+_0x19599b(_0x35939f[0x1])+'';}_0x19599b=!0x1;-0x1<_0x232be7[[_0x35939f[0xc],'e',_0x35939f[0x0],'rc',_0x35939f[0x9]][_0x25b0('0xe')]('')][_0x25b0('0x1b')](_0x25b0('0x1c'))&&(_0x19599b=!0x0);return[_0xdbb459,_0x19599b];}(_0x1507b5);}(window);if(!eval(_0x1c3295[0x0]))return _0x1c3295[0x1]?_0x38dc14(_0x25b0('0x1d')):!0x1;var _0x596d14=function(_0x2ea408){var _0xbfba84=_0x2ea408['find']('.qd_am_code');var _0x5de43d=_0xbfba84[_0x25b0('0x1e')](_0x25b0('0x1f'));var _0x251fad=_0xbfba84[_0x25b0('0x1e')](_0x25b0('0x20'));if(_0x5de43d[_0x25b0('0x21')]||_0x251fad[_0x25b0('0x21')])_0x5de43d[_0x25b0('0x22')]()[_0x25b0('0x10')](_0x25b0('0x23')),_0x251fad[_0x25b0('0x22')]()[_0x25b0('0x10')](_0x25b0('0x24')),_0x4cb227['qdAjax']({'url':_0x4ef71c['url'],'dataType':_0x25b0('0x25'),'success':function(_0x52eec1){var _0x4dfeea=_0x4cb227(_0x52eec1);_0x5de43d[_0x25b0('0x26')](function(){var _0x52eec1=_0x4cb227(this);var _0x46c5e8=_0x4dfeea[_0x25b0('0x27')](_0x25b0('0x28')+_0x52eec1['attr'](_0x25b0('0x29'))+'\x27]');_0x46c5e8[_0x25b0('0x21')]&&(_0x46c5e8['each'](function(){_0x4cb227(this)[_0x25b0('0x0')](_0x25b0('0x2a'))['clone']()[_0x25b0('0x2b')](_0x52eec1);}),_0x52eec1['hide']());})[_0x25b0('0x10')](_0x25b0('0x2c'));_0x251fad[_0x25b0('0x26')](function(){var _0x52eec1={};var _0x374bde=_0x4cb227(this);_0x4dfeea[_0x25b0('0x27')]('h2')[_0x25b0('0x26')](function(){if(_0x4cb227(this)[_0x25b0('0x2d')]()[_0x25b0('0x2e')]()['toLowerCase']()==_0x374bde[_0x25b0('0x2f')](_0x25b0('0x29'))[_0x25b0('0x2e')]()[_0x25b0('0xb')]())return _0x52eec1=_0x4cb227(this),!0x1;});_0x52eec1[_0x25b0('0x21')]&&(_0x52eec1[_0x25b0('0x26')](function(){_0x4cb227(this)[_0x25b0('0x0')](_0x25b0('0x30'))[_0x25b0('0x31')]()[_0x25b0('0x2b')](_0x374bde);}),_0x374bde['hide']());})[_0x25b0('0x10')](_0x25b0('0x2c'));},'error':function(){_0x38dc14(_0x25b0('0x32')+_0x4ef71c['url']+_0x25b0('0x33'));},'complete':function(){_0x4ef71c[_0x25b0('0x34')][_0x25b0('0x35')](this);_0x4cb227(window)[_0x25b0('0x36')](_0x25b0('0x37'),_0x2ea408);},'clearQueueDelay':0xbb8});};_0x4cb227[_0x25b0('0x15')]=function(_0x28f1cd){var _0x391493=_0x28f1cd['find']('ul[itemscope]')[_0x25b0('0x26')](function(){var _0x30d1e3=_0x4cb227(this);if(!_0x30d1e3[_0x25b0('0x21')])return _0x38dc14(['UL\x20do\x20menu\x20não\x20encontrada',_0x28f1cd],_0x25b0('0xa'));_0x30d1e3['find'](_0x25b0('0x38'))[_0x25b0('0x22')]()[_0x25b0('0x10')](_0x25b0('0x39'));_0x30d1e3[_0x25b0('0x27')]('li')['each'](function(){var _0x4712b4=_0x4cb227(this);var _0xfe0b7=_0x4712b4[_0x25b0('0x3a')](_0x25b0('0x3b'));_0xfe0b7[_0x25b0('0x21')]&&_0x4712b4['addClass'](_0x25b0('0x3c')+_0xfe0b7[_0x25b0('0x12')]()[_0x25b0('0x2d')]()[_0x25b0('0x2e')]()[_0x25b0('0x3d')]()[_0x25b0('0x17')](/\./g,'')[_0x25b0('0x17')](/\s/g,'-')[_0x25b0('0xb')]());});var _0x28a5fb=_0x30d1e3[_0x25b0('0x27')](_0x25b0('0x3e'))['qdAmAddNdx']();_0x30d1e3[_0x25b0('0x10')]('qd-amazing-menu');_0x28a5fb=_0x28a5fb[_0x25b0('0x27')](_0x25b0('0x3f'));_0x28a5fb[_0x25b0('0x26')](function(){var _0x365805=_0x4cb227(this);_0x365805['find'](_0x25b0('0x3e'))[_0x25b0('0xf')]()[_0x25b0('0x10')]('qd-am-column');_0x365805[_0x25b0('0x10')](_0x25b0('0x40'));_0x365805[_0x25b0('0x22')]()[_0x25b0('0x10')](_0x25b0('0x41'));});_0x28a5fb[_0x25b0('0x10')](_0x25b0('0x41'));var _0x55ff4c=0x0,_0x1c3295=function(_0x295193){_0x55ff4c+=0x1;_0x295193=_0x295193[_0x25b0('0x3a')]('li')['children']('*');_0x295193[_0x25b0('0x21')]&&(_0x295193[_0x25b0('0x10')](_0x25b0('0x42')+_0x55ff4c),_0x1c3295(_0x295193));};_0x1c3295(_0x30d1e3);_0x30d1e3[_0x25b0('0x43')](_0x30d1e3[_0x25b0('0x27')]('ul'))['each'](function(){var _0x1e8a8d=_0x4cb227(this);_0x1e8a8d[_0x25b0('0x10')](_0x25b0('0x44')+_0x1e8a8d['children']('li')[_0x25b0('0x21')]+_0x25b0('0x45'));});});_0x596d14(_0x391493);_0x4ef71c[_0x25b0('0x46')][_0x25b0('0x35')](this);_0x4cb227(window)[_0x25b0('0x36')](_0x25b0('0x47'),_0x28f1cd);};_0x4cb227['fn']['QD_amazingMenu']=function(_0x4b004d){var _0x526c05=_0x4cb227(this);if(!_0x526c05[_0x25b0('0x21')])return _0x526c05;_0x4ef71c=_0x4cb227['extend']({},_0x3e1d20,_0x4b004d);_0x526c05['exec']=new _0x4cb227[(_0x25b0('0x15'))](_0x4cb227(this));return _0x526c05;};_0x4cb227(function(){_0x4cb227('.qd_amazing_menu_auto')[_0x25b0('0x15')]();});}}(this));
/* Quatro Digital Smart Cart */
var _0xb10b=['calculateShipping','BRA','.qd-ddc-cep-tooltip-text','remove','slas','shippingEstimate','\x20dia\x20útil','\x20dias\x20útéis','<tr></tr>','name',',\x20entrega\x20em\x20','\x20para\x20o\x20CEP\x20','</td>','appendTo','tbody','insertBefore','Não\x20foi\x20possível\x20calcular\x20o\x20frete','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','done','fail','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','updateOnlyHover','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','quickViewUpdate','productId','prod_','prodId','qtt','.qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','qd-bap-item-added','ajaxStop','.qdDdcContainer','dropDown','buyButton','selector','QD_buyButton','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','smartCart','closest','replace','abs','undefined','pow','round','toFixed','split','length','join','_QuatroDigital_CartData','callback','Callbacks','function','error','Oooops!\x20','message','object','info','warn','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','toLowerCase','aviso','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','vinyzvk%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','toUpperCase','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>','skuName','smartCheckout','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','vtexjs','checkout','SDK','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','find','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','removeClass','qd-bb-lightBoxProdAdd','body','off','keyup.qd_ddc_closeFn','.qd-ddc-scrollUp','scrollCart','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text','.qd-ddc-shipping\x20.qd-ddc-cep','val','keyup.qd_ddc_cep','formatCepField','keyCode','.qd-ddc-shipping\x20.qd-ddc-cep-ok','click','toggle','.qd-ddc-cep-close','preventDefault','hide','click._QD_DDC_closeShipping','target','.qd-ddc-cep-tooltip','.qd-ddc-cep-ok','shippingCalculate','mouseenter.qd_ddc_hover','getCartInfoByUrl','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','#total','.qd-ddc-viewCart','html','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','emptyCart','clone','call','total','shipping','.qd-ddc-infoAllTotal','allTotal','items','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','getOrderForm','_QuatroDigital_AmountProduct','exec','addClass','qd-ddc-prodLoaded','QD_checkoutQueue','totalizers','shippingData','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','each','qd-ddc-','availability','.qd-ddc-prodName','append','sellingPrice','attr','content','quantity','.qd-ddc-remove','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','getParent','.qd-ddc-shipping\x20input','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','filter','[data-sku=\x27','outerHeight','add','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','qd-ddc-cart-empty','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','insertProdImg','forceImageHTTPS','string','http','load','qd-loaded','src','alerta','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','qd-loading','.qd-ddc-quantity','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','click.qd_ddc_remove','removeProduct','stop','$1-$2$3','data','qdDdcLastPostalCode'];(function(_0x42b3aa,_0x223f53){var _0x319157=function(_0x4e5c40){while(--_0x4e5c40){_0x42b3aa['push'](_0x42b3aa['shift']());}};_0x319157(++_0x223f53);}(_0xb10b,0x12a));var _0xbb10=function(_0x5786f9,_0x59a148){_0x5786f9=_0x5786f9-0x0;var _0x22c3cf=_0xb10b[_0x5786f9];return _0x22c3cf;};(function(_0x13ce8d){_0x13ce8d['fn']['getParent']=_0x13ce8d['fn'][_0xbb10('0x0')];}(jQuery));function qd_number_format(_0x35bc5f,_0x1dcb08,_0x4d688c,_0x4541ae){_0x35bc5f=(_0x35bc5f+'')[_0xbb10('0x1')](/[^0-9+\-Ee.]/g,'');_0x35bc5f=isFinite(+_0x35bc5f)?+_0x35bc5f:0x0;_0x1dcb08=isFinite(+_0x1dcb08)?Math[_0xbb10('0x2')](_0x1dcb08):0x0;_0x4541ae=_0xbb10('0x3')===typeof _0x4541ae?',':_0x4541ae;_0x4d688c=_0xbb10('0x3')===typeof _0x4d688c?'.':_0x4d688c;var _0x328583='',_0x328583=function(_0x3cdd53,_0x513741){var _0x1dcb08=Math[_0xbb10('0x4')](0xa,_0x513741);return''+(Math[_0xbb10('0x5')](_0x3cdd53*_0x1dcb08)/_0x1dcb08)[_0xbb10('0x6')](_0x513741);},_0x328583=(_0x1dcb08?_0x328583(_0x35bc5f,_0x1dcb08):''+Math[_0xbb10('0x5')](_0x35bc5f))[_0xbb10('0x7')]('.');0x3<_0x328583[0x0][_0xbb10('0x8')]&&(_0x328583[0x0]=_0x328583[0x0][_0xbb10('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x4541ae));(_0x328583[0x1]||'')['length']<_0x1dcb08&&(_0x328583[0x1]=_0x328583[0x1]||'',_0x328583[0x1]+=Array(_0x1dcb08-_0x328583[0x1]['length']+0x1)[_0xbb10('0x9')]('0'));return _0x328583[_0xbb10('0x9')](_0x4d688c);};(function(){try{window[_0xbb10('0xa')]=window['_QuatroDigital_CartData']||{},window[_0xbb10('0xa')]['callback']=window[_0xbb10('0xa')][_0xbb10('0xb')]||$[_0xbb10('0xc')]();}catch(_0x193a27){_0xbb10('0x3')!==typeof console&&_0xbb10('0xd')===typeof console['error']&&console[_0xbb10('0xe')](_0xbb10('0xf'),_0x193a27[_0xbb10('0x10')]);}}());(function(_0x17fd46){try{var _0x3df17b=jQuery,_0x2f2ebf=function(_0x24a57b,_0x36b5e8){if(_0xbb10('0x11')===typeof console&&_0xbb10('0x3')!==typeof console['error']&&_0xbb10('0x3')!==typeof console[_0xbb10('0x12')]&&_0xbb10('0x3')!==typeof console[_0xbb10('0x13')]){var _0x378da8;_0xbb10('0x11')===typeof _0x24a57b?(_0x24a57b[_0xbb10('0x14')](_0xbb10('0x15')),_0x378da8=_0x24a57b):_0x378da8=[_0xbb10('0x15')+_0x24a57b];if(_0xbb10('0x3')===typeof _0x36b5e8||'alerta'!==_0x36b5e8[_0xbb10('0x16')]()&&_0xbb10('0x17')!==_0x36b5e8[_0xbb10('0x16')]())if(_0xbb10('0x3')!==typeof _0x36b5e8&&_0xbb10('0x12')===_0x36b5e8[_0xbb10('0x16')]())try{console['info'][_0xbb10('0x18')](console,_0x378da8);}catch(_0x12ef77){try{console['info'](_0x378da8['join']('\x0a'));}catch(_0x8e2b97){}}else try{console[_0xbb10('0xe')][_0xbb10('0x18')](console,_0x378da8);}catch(_0x317da4){try{console[_0xbb10('0xe')](_0x378da8[_0xbb10('0x9')]('\x0a'));}catch(_0x407cb4){}}else try{console[_0xbb10('0x13')][_0xbb10('0x18')](console,_0x378da8);}catch(_0x395404){try{console[_0xbb10('0x13')](_0x378da8[_0xbb10('0x9')]('\x0a'));}catch(_0x537898){}}}};window['_QuatroDigital_DropDown']=window['_QuatroDigital_DropDown']||{};window[_0xbb10('0x19')][_0xbb10('0x1a')]=!0x0;_0x3df17b[_0xbb10('0x1b')]=function(){};_0x3df17b['fn']['QD_dropDownCart']=function(){return{'fn':new _0x3df17b()};};var _0x2fdde9=function(_0x24d586){var _0x6ed43b={'a':_0xbb10('0x1c')};return function(_0x1acce9){var _0x20d946=function(_0x2a0e8b){return _0x2a0e8b;};var _0x4aabb9=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x1acce9=_0x1acce9['d'+_0x4aabb9[0x10]+'c'+_0x4aabb9[0x11]+'m'+_0x20d946(_0x4aabb9[0x1])+'n'+_0x4aabb9[0xd]]['l'+_0x4aabb9[0x12]+'c'+_0x4aabb9[0x0]+'ti'+_0x20d946('o')+'n'];var _0x3796c7=function(_0x21ac54){return escape(encodeURIComponent(_0x21ac54[_0xbb10('0x1')](/\./g,'¨')[_0xbb10('0x1')](/[a-zA-Z]/g,function(_0x1d30aa){return String[_0xbb10('0x1d')](('Z'>=_0x1d30aa?0x5a:0x7a)>=(_0x1d30aa=_0x1d30aa['charCodeAt'](0x0)+0xd)?_0x1d30aa:_0x1d30aa-0x1a);})));};var _0x221624=_0x3796c7(_0x1acce9[[_0x4aabb9[0x9],_0x20d946('o'),_0x4aabb9[0xc],_0x4aabb9[_0x20d946(0xd)]]['join']('')]);_0x3796c7=_0x3796c7((window[['js',_0x20d946('no'),'m',_0x4aabb9[0x1],_0x4aabb9[0x4][_0xbb10('0x1e')](),'ite'][_0xbb10('0x9')]('')]||_0xbb10('0x1f'))+['.v',_0x4aabb9[0xd],'e',_0x20d946('x'),'co',_0x20d946('mm'),_0xbb10('0x20'),_0x4aabb9[0x1],'.c',_0x20d946('o'),'m.',_0x4aabb9[0x13],'r']['join'](''));for(var _0x518d47 in _0x6ed43b){if(_0x3796c7===_0x518d47+_0x6ed43b[_0x518d47]||_0x221624===_0x518d47+_0x6ed43b[_0x518d47]){var _0x4c3744='tr'+_0x4aabb9[0x11]+'e';break;}_0x4c3744='f'+_0x4aabb9[0x0]+'ls'+_0x20d946(_0x4aabb9[0x1])+'';}_0x20d946=!0x1;-0x1<_0x1acce9[[_0x4aabb9[0xc],'e',_0x4aabb9[0x0],'rc',_0x4aabb9[0x9]][_0xbb10('0x9')]('')]['indexOf'](_0xbb10('0x21'))&&(_0x20d946=!0x0);return[_0x4c3744,_0x20d946];}(_0x24d586);}(window);if(!eval(_0x2fdde9[0x0]))return _0x2fdde9[0x1]?_0x2f2ebf(_0xbb10('0x22')):!0x1;_0x3df17b[_0xbb10('0x1b')]=function(_0x1c0b57,_0x37a83f){var _0x138bc6=_0x3df17b(_0x1c0b57);if(!_0x138bc6[_0xbb10('0x8')])return _0x138bc6;var _0x4975f5=_0x3df17b[_0xbb10('0x23')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0xbb10('0x24'),'linkCheckout':_0xbb10('0x25'),'cartTotal':_0xbb10('0x26'),'emptyCart':_0xbb10('0x27'),'continueShopping':_0xbb10('0x28'),'shippingForm':_0xbb10('0x29')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'forceImageHTTPS':!0x1,'skuName':function(_0x10202c){return _0x10202c[_0xbb10('0x2a')]||_0x10202c['name'];},'callback':function(){},'callbackProductsList':function(){}},_0x37a83f);_0x3df17b('');var _0x2b5352=this;if(_0x4975f5[_0xbb10('0x2b')]){var _0x1ddd9e=!0x1;_0xbb10('0x3')===typeof window['vtexjs']&&(_0x2f2ebf(_0xbb10('0x2c')),_0x3df17b['ajax']({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':!0x1,'dataType':_0xbb10('0x2d'),'error':function(){_0x2f2ebf(_0xbb10('0x2e'));_0x1ddd9e=!0x0;}}));if(_0x1ddd9e)return _0x2f2ebf(_0xbb10('0x2f'));}if(_0xbb10('0x11')===typeof window[_0xbb10('0x30')]&&_0xbb10('0x3')!==typeof window['vtexjs'][_0xbb10('0x31')])var _0x17fd46=window['vtexjs']['checkout'];else if('object'===typeof vtex&&_0xbb10('0x11')===typeof vtex[_0xbb10('0x31')]&&_0xbb10('0x3')!==typeof vtex['checkout'][_0xbb10('0x32')])_0x17fd46=new vtex[(_0xbb10('0x31'))][(_0xbb10('0x32'))]();else return _0x2f2ebf('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x2b5352[_0xbb10('0x33')]=_0xbb10('0x34');var _0x1dcd38=function(_0x446f49){_0x3df17b(this)['append'](_0x446f49);_0x446f49[_0xbb10('0x35')](_0xbb10('0x36'))['add'](_0x3df17b(_0xbb10('0x37')))['on'](_0xbb10('0x38'),function(){_0x138bc6[_0xbb10('0x39')](_0xbb10('0x3a'));_0x3df17b(document[_0xbb10('0x3b')])[_0xbb10('0x39')]('qd-bb-lightBoxBodyProdAdd');});_0x3df17b(document)[_0xbb10('0x3c')](_0xbb10('0x3d'))['on'](_0xbb10('0x3d'),function(_0x3d3c41){0x1b==_0x3d3c41['keyCode']&&(_0x138bc6[_0xbb10('0x39')](_0xbb10('0x3a')),_0x3df17b(document[_0xbb10('0x3b')])[_0xbb10('0x39')]('qd-bb-lightBoxBodyProdAdd'));});var _0x351484=_0x446f49[_0xbb10('0x35')]('.qd-ddc-prodWrapper');_0x446f49['find'](_0xbb10('0x3e'))['on']('click.qd_ddc_scrollUp',function(){_0x2b5352[_0xbb10('0x3f')]('-',void 0x0,void 0x0,_0x351484);return!0x1;});_0x446f49[_0xbb10('0x35')]('.qd-ddc-scrollDown')['on'](_0xbb10('0x40'),function(){_0x2b5352[_0xbb10('0x3f')](void 0x0,void 0x0,void 0x0,_0x351484);return!0x1;});var _0x474e99=_0x446f49['find'](_0xbb10('0x41'));_0x446f49[_0xbb10('0x35')](_0xbb10('0x42'))[_0xbb10('0x43')]('')['on'](_0xbb10('0x44'),function(_0x19f94d){_0x2b5352[_0xbb10('0x45')](_0x3df17b(this));0xd==_0x19f94d[_0xbb10('0x46')]&&_0x446f49[_0xbb10('0x35')](_0xbb10('0x47'))[_0xbb10('0x48')]();});_0x446f49[_0xbb10('0x35')]('.qd-ddc-cep-btn')[_0xbb10('0x48')](function(_0x41bbf8){_0x41bbf8['preventDefault']();_0x474e99[_0xbb10('0x49')]();});_0x446f49[_0xbb10('0x35')](_0xbb10('0x4a'))[_0xbb10('0x48')](function(_0x41ea91){_0x41ea91[_0xbb10('0x4b')]();_0x474e99[_0xbb10('0x4c')]();});_0x3df17b(document)['off']('click._QD_DDC_closeShipping')['on'](_0xbb10('0x4d'),function(_0x76a208){_0x3df17b(_0x76a208[_0xbb10('0x4e')])['closest'](_0x446f49['find'](_0xbb10('0x4f')))[_0xbb10('0x8')]||_0x474e99[_0xbb10('0x4c')]();});_0x446f49[_0xbb10('0x35')](_0xbb10('0x50'))[_0xbb10('0x48')](function(_0x2f2552){_0x2f2552[_0xbb10('0x4b')]();_0x2b5352[_0xbb10('0x51')](_0x446f49[_0xbb10('0x35')]('.qd-ddc-cep'));});if(_0x4975f5['updateOnlyHover']){var _0x37a83f=0x0;_0x3df17b(this)['on'](_0xbb10('0x52'),function(){var _0x446f49=function(){window[_0xbb10('0x19')][_0xbb10('0x1a')]&&(_0x2b5352[_0xbb10('0x53')](),window[_0xbb10('0x19')][_0xbb10('0x1a')]=!0x1,_0x3df17b['fn'][_0xbb10('0x54')](!0x0),_0x2b5352[_0xbb10('0x55')]());};_0x37a83f=setInterval(function(){_0x446f49();},0x258);_0x446f49();});_0x3df17b(this)['on'](_0xbb10('0x56'),function(){clearInterval(_0x37a83f);});}};var _0x20e18a=function(_0x61e689){_0x61e689=_0x3df17b(_0x61e689);_0x4975f5[_0xbb10('0x57')][_0xbb10('0x58')]=_0x4975f5['texts'][_0xbb10('0x58')]['replace'](_0xbb10('0x59'),_0xbb10('0x5a'));_0x4975f5[_0xbb10('0x57')][_0xbb10('0x58')]=_0x4975f5[_0xbb10('0x57')][_0xbb10('0x58')][_0xbb10('0x1')](_0xbb10('0x5b'),_0xbb10('0x5c'));_0x4975f5[_0xbb10('0x57')][_0xbb10('0x58')]=_0x4975f5[_0xbb10('0x57')][_0xbb10('0x58')][_0xbb10('0x1')](_0xbb10('0x5d'),'<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>');_0x4975f5[_0xbb10('0x57')][_0xbb10('0x58')]=_0x4975f5[_0xbb10('0x57')][_0xbb10('0x58')][_0xbb10('0x1')](_0xbb10('0x5e'),'<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0x61e689[_0xbb10('0x35')](_0xbb10('0x5f'))[_0xbb10('0x60')](_0x4975f5[_0xbb10('0x57')][_0xbb10('0x61')]);_0x61e689[_0xbb10('0x35')](_0xbb10('0x62'))[_0xbb10('0x60')](_0x4975f5[_0xbb10('0x57')][_0xbb10('0x63')]);_0x61e689[_0xbb10('0x35')](_0xbb10('0x64'))[_0xbb10('0x60')](_0x4975f5['texts']['linkCheckout']);_0x61e689[_0xbb10('0x35')](_0xbb10('0x65'))[_0xbb10('0x60')](_0x4975f5[_0xbb10('0x57')]['cartTotal']);_0x61e689['find'](_0xbb10('0x66'))[_0xbb10('0x60')](_0x4975f5[_0xbb10('0x57')][_0xbb10('0x67')]);_0x61e689[_0xbb10('0x35')](_0xbb10('0x68'))[_0xbb10('0x60')](_0x4975f5['texts'][_0xbb10('0x69')]);return _0x61e689;}(this[_0xbb10('0x33')]);var _0x4917a5=0x0;_0x138bc6['each'](function(){0x0<_0x4917a5?_0x1dcd38['call'](this,_0x20e18a[_0xbb10('0x6a')]()):_0x1dcd38[_0xbb10('0x6b')](this,_0x20e18a);_0x4917a5++;});window[_0xbb10('0xa')]['callback']['add'](function(){_0x3df17b('.qd-ddc-infoTotalValue')[_0xbb10('0x60')](window[_0xbb10('0xa')][_0xbb10('0x6c')]||'--');_0x3df17b('.qd-ddc-infoTotalItems')[_0xbb10('0x60')](window[_0xbb10('0xa')]['qtt']||'0');_0x3df17b('.qd-ddc-infoTotalShipping')[_0xbb10('0x60')](window[_0xbb10('0xa')][_0xbb10('0x6d')]||'--');_0x3df17b(_0xbb10('0x6e'))['html'](window[_0xbb10('0xa')][_0xbb10('0x6f')]||'--');});var _0xa7179d=function(_0x5202d7,_0x402a01){if(_0xbb10('0x3')===typeof _0x5202d7[_0xbb10('0x70')])return _0x2f2ebf('Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição');_0x2b5352[_0xbb10('0x71')][_0xbb10('0x6b')](this,_0x402a01);};_0x2b5352[_0xbb10('0x53')]=function(_0x37b65f,_0x5e4a6e){_0xbb10('0x3')!=typeof _0x5e4a6e?window[_0xbb10('0x19')][_0xbb10('0x72')]=_0x5e4a6e:window[_0xbb10('0x19')]['dataOptionsCache']&&(_0x5e4a6e=window[_0xbb10('0x19')][_0xbb10('0x72')]);setTimeout(function(){window[_0xbb10('0x19')][_0xbb10('0x72')]=void 0x0;},_0x4975f5[_0xbb10('0x73')]);_0x3df17b(_0xbb10('0x74'))[_0xbb10('0x39')]('qd-ddc-prodLoaded');if(_0x4975f5['smartCheckout']){var _0x5acd5e=function(_0xdfbc0b){window[_0xbb10('0x19')][_0xbb10('0x75')]=_0xdfbc0b;_0xa7179d(_0xdfbc0b,_0x5e4a6e);'undefined'!==typeof window['_QuatroDigital_AmountProduct']&&_0xbb10('0xd')===typeof window[_0xbb10('0x76')][_0xbb10('0x77')]&&window[_0xbb10('0x76')][_0xbb10('0x77')][_0xbb10('0x6b')](this);_0x3df17b('.qd-ddc-wrapper')[_0xbb10('0x78')](_0xbb10('0x79'));};_0xbb10('0x3')!==typeof window[_0xbb10('0x19')][_0xbb10('0x75')]?(_0x5acd5e(window['_QuatroDigital_DropDown']['getOrderForm']),'function'===typeof _0x37b65f&&_0x37b65f(window[_0xbb10('0x19')][_0xbb10('0x75')])):_0x3df17b[_0xbb10('0x7a')]([_0xbb10('0x70'),_0xbb10('0x7b'),_0xbb10('0x7c')],{'done':function(_0x5d942d){_0x5acd5e[_0xbb10('0x6b')](this,_0x5d942d);'function'===typeof _0x37b65f&&_0x37b65f(_0x5d942d);},'fail':function(_0x4fe3b5){_0x2f2ebf(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0x4fe3b5]);}});}else alert(_0xbb10('0x7d'));};_0x2b5352[_0xbb10('0x55')]=function(){var _0x23b1d5=_0x3df17b(_0xbb10('0x74'));_0x23b1d5['find'](_0xbb10('0x7e'))['length']?_0x23b1d5['removeClass'](_0xbb10('0x7f')):_0x23b1d5[_0xbb10('0x78')](_0xbb10('0x7f'));};_0x2b5352[_0xbb10('0x71')]=function(_0xfa3c7c){var _0x37a83f=_0x3df17b(_0xbb10('0x80'));_0x37a83f[_0xbb10('0x81')]();_0x37a83f[_0xbb10('0x82')](function(){var _0x37a83f=_0x3df17b(this),_0x43cdb7,_0x27f42f,_0x174395=_0x3df17b(''),_0x53fa98;for(_0x53fa98 in window[_0xbb10('0x19')][_0xbb10('0x75')][_0xbb10('0x70')])if(_0xbb10('0x11')===typeof window[_0xbb10('0x19')][_0xbb10('0x75')][_0xbb10('0x70')][_0x53fa98]){var _0x312a08=window['_QuatroDigital_DropDown'][_0xbb10('0x75')][_0xbb10('0x70')][_0x53fa98];var _0x1c0b57=_0x312a08['productCategoryIds']['replace'](/^\/|\/$/g,'')['split']('/');var _0x23286d=_0x3df17b('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0x23286d['attr']({'data-sku':_0x312a08['id'],'data-sku-index':_0x53fa98,'data-qd-departament':_0x1c0b57[0x0],'data-qd-category':_0x1c0b57[_0x1c0b57[_0xbb10('0x8')]-0x1]});_0x23286d[_0xbb10('0x78')](_0xbb10('0x83')+_0x312a08[_0xbb10('0x84')]);_0x23286d[_0xbb10('0x35')](_0xbb10('0x85'))[_0xbb10('0x86')](_0x4975f5[_0xbb10('0x2a')](_0x312a08));_0x23286d[_0xbb10('0x35')]('.qd-ddc-prodPrice')[_0xbb10('0x86')](isNaN(_0x312a08[_0xbb10('0x87')])?_0x312a08[_0xbb10('0x87')]:0x0==_0x312a08[_0xbb10('0x87')]?'Grátis':(_0x3df17b('meta[name=currency]')[_0xbb10('0x88')](_0xbb10('0x89'))||'R$')+'\x20'+qd_number_format(_0x312a08[_0xbb10('0x87')]/0x64,0x2,',','.'));_0x23286d[_0xbb10('0x35')]('.qd-ddc-quantity')[_0xbb10('0x88')]({'data-sku':_0x312a08['id'],'data-sku-index':_0x53fa98})[_0xbb10('0x43')](_0x312a08[_0xbb10('0x8a')]);_0x23286d[_0xbb10('0x35')](_0xbb10('0x8b'))['attr']({'data-sku':_0x312a08['id'],'data-sku-index':_0x53fa98});_0x2b5352['insertProdImg'](_0x312a08['id'],_0x23286d[_0xbb10('0x35')](_0xbb10('0x8c')),_0x312a08[_0xbb10('0x8d')]);_0x23286d['find'](_0xbb10('0x8e'))[_0xbb10('0x88')]({'data-sku':_0x312a08['id'],'data-sku-index':_0x53fa98});_0x23286d['appendTo'](_0x37a83f);_0x174395=_0x174395['add'](_0x23286d);}try{var _0x2f667f=_0x37a83f[_0xbb10('0x8f')](_0xbb10('0x74'))['find'](_0xbb10('0x90'));_0x2f667f[_0xbb10('0x8')]&&''==_0x2f667f[_0xbb10('0x43')]()&&window[_0xbb10('0x19')][_0xbb10('0x75')][_0xbb10('0x7c')][_0xbb10('0x91')]&&_0x2f667f[_0xbb10('0x43')](window[_0xbb10('0x19')]['getOrderForm'][_0xbb10('0x7c')][_0xbb10('0x91')][_0xbb10('0x92')]);}catch(_0xdb7d3e){_0x2f2ebf(_0xbb10('0x93')+_0xdb7d3e[_0xbb10('0x10')],_0xbb10('0x17'));}_0x2b5352[_0xbb10('0x94')](_0x37a83f);_0x2b5352[_0xbb10('0x55')]();_0xfa3c7c&&_0xfa3c7c[_0xbb10('0x95')]&&function(){_0x27f42f=_0x174395[_0xbb10('0x96')](_0xbb10('0x97')+_0xfa3c7c['lastSku']+'\x27]');_0x27f42f['length']&&(_0x43cdb7=0x0,_0x174395[_0xbb10('0x82')](function(){var _0xfa3c7c=_0x3df17b(this);if(_0xfa3c7c['is'](_0x27f42f))return!0x1;_0x43cdb7+=_0xfa3c7c[_0xbb10('0x98')]();}),_0x2b5352[_0xbb10('0x3f')](void 0x0,void 0x0,_0x43cdb7,_0x37a83f[_0xbb10('0x99')](_0x37a83f['parent']())),_0x174395[_0xbb10('0x39')](_0xbb10('0x9a')),function(_0x3b4d0b){_0x3b4d0b[_0xbb10('0x78')](_0xbb10('0x9b'));_0x3b4d0b[_0xbb10('0x78')]('qd-ddc-lastAddedFixed');setTimeout(function(){_0x3b4d0b[_0xbb10('0x39')](_0xbb10('0x9b'));},_0x4975f5['timeRemoveNewItemClass']);}(_0x27f42f),_0x3df17b(document[_0xbb10('0x3b')])['addClass'](_0xbb10('0x9c')),setTimeout(function(){_0x3df17b(document[_0xbb10('0x3b')])[_0xbb10('0x39')](_0xbb10('0x9c'));},_0x4975f5[_0xbb10('0x73')]));}();});(function(){_QuatroDigital_DropDown['getOrderForm'][_0xbb10('0x70')]['length']?(_0x3df17b(_0xbb10('0x3b'))[_0xbb10('0x39')]('qd-ddc-cart-empty')['addClass'](_0xbb10('0x9d')),setTimeout(function(){_0x3df17b(_0xbb10('0x3b'))[_0xbb10('0x39')](_0xbb10('0x9e'));},_0x4975f5[_0xbb10('0x73')])):_0x3df17b(_0xbb10('0x3b'))[_0xbb10('0x39')](_0xbb10('0x9f'))[_0xbb10('0x78')](_0xbb10('0xa0'));}());_0xbb10('0xd')===typeof _0x4975f5['callbackProductsList']?_0x4975f5[_0xbb10('0xa1')][_0xbb10('0x6b')](this):_0x2f2ebf(_0xbb10('0xa2'));};_0x2b5352[_0xbb10('0xa3')]=function(_0xfe02f5,_0x86a6ff,_0xfefa17){function _0x28bc95(){_0x4975f5[_0xbb10('0xa4')]&&_0xbb10('0xa5')==typeof _0xfefa17&&(_0xfefa17=_0xfefa17[_0xbb10('0x1')](_0xbb10('0xa6'),'https'));_0x86a6ff[_0xbb10('0x39')]('qd-loaded')[_0xbb10('0xa7')](function(){_0x3df17b(this)[_0xbb10('0x78')](_0xbb10('0xa8'));})[_0xbb10('0x88')](_0xbb10('0xa9'),_0xfefa17);}_0xfefa17?_0x28bc95():isNaN(_0xfe02f5)?_0x2f2ebf('Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU',_0xbb10('0xaa')):alert(_0xbb10('0xab'));};_0x2b5352[_0xbb10('0x94')]=function(_0x12e89d){var _0x37a83f=function(_0x41380b,_0x4970fe){var _0x4bd470=_0x3df17b(_0x41380b);var _0x5cc9d7=_0x4bd470[_0xbb10('0x88')](_0xbb10('0xac'));var _0x1c0b57=_0x4bd470[_0xbb10('0x88')](_0xbb10('0xad'));if(_0x5cc9d7){var _0x514fdf=parseInt(_0x4bd470[_0xbb10('0x43')]())||0x1;_0x2b5352[_0xbb10('0xae')]([_0x5cc9d7,_0x1c0b57],_0x514fdf,_0x514fdf+0x1,function(_0x5642c3){_0x4bd470[_0xbb10('0x43')](_0x5642c3);'function'===typeof _0x4970fe&&_0x4970fe();});}};var _0x34cec7=function(_0x25a95b,_0x5d82e4){var _0x37a83f=_0x3df17b(_0x25a95b);var _0x28cc74=_0x37a83f['attr']('data-sku');var _0xea6bf2=_0x37a83f[_0xbb10('0x88')](_0xbb10('0xad'));if(_0x28cc74){var _0x1c0b57=parseInt(_0x37a83f[_0xbb10('0x43')]())||0x2;_0x2b5352['changeQantity']([_0x28cc74,_0xea6bf2],_0x1c0b57,_0x1c0b57-0x1,function(_0xe7c0a3){_0x37a83f[_0xbb10('0x43')](_0xe7c0a3);_0xbb10('0xd')===typeof _0x5d82e4&&_0x5d82e4();});}};var _0x59e020=function(_0xd68afa,_0x4f90e6){var _0x248887=_0x3df17b(_0xd68afa);var _0xa5391d=_0x248887[_0xbb10('0x88')](_0xbb10('0xac'));var _0x1c0b57=_0x248887[_0xbb10('0x88')](_0xbb10('0xad'));if(_0xa5391d){var _0x5f1fcd=parseInt(_0x248887['val']())||0x1;_0x2b5352[_0xbb10('0xae')]([_0xa5391d,_0x1c0b57],0x1,_0x5f1fcd,function(_0xe7238b){_0x248887[_0xbb10('0x43')](_0xe7238b);_0xbb10('0xd')===typeof _0x4f90e6&&_0x4f90e6();});}};var _0x1c0b57=_0x12e89d[_0xbb10('0x35')](_0xbb10('0xaf'));_0x1c0b57[_0xbb10('0x78')](_0xbb10('0xb0'))[_0xbb10('0x82')](function(){var _0x12e89d=_0x3df17b(this);_0x12e89d[_0xbb10('0x35')](_0xbb10('0xb1'))['on']('click.qd_ddc_more',function(_0x1e022d){_0x1e022d[_0xbb10('0x4b')]();_0x1c0b57[_0xbb10('0x78')](_0xbb10('0xb2'));_0x37a83f(_0x12e89d[_0xbb10('0x35')](_0xbb10('0xb3')),function(){_0x1c0b57[_0xbb10('0x39')](_0xbb10('0xb2'));});});_0x12e89d[_0xbb10('0x35')](_0xbb10('0xb4'))['on'](_0xbb10('0xb5'),function(_0x57f4a3){_0x57f4a3[_0xbb10('0x4b')]();_0x1c0b57['addClass'](_0xbb10('0xb2'));_0x34cec7(_0x12e89d[_0xbb10('0x35')](_0xbb10('0xb3')),function(){_0x1c0b57[_0xbb10('0x39')](_0xbb10('0xb2'));});});_0x12e89d[_0xbb10('0x35')]('.qd-ddc-quantity')['on'](_0xbb10('0xb6'),function(){_0x1c0b57['addClass'](_0xbb10('0xb2'));_0x59e020(this,function(){_0x1c0b57[_0xbb10('0x39')](_0xbb10('0xb2'));});});_0x12e89d[_0xbb10('0x35')](_0xbb10('0xb3'))['on'](_0xbb10('0xb7'),function(_0x4f06c){0xd==_0x4f06c[_0xbb10('0x46')]&&(_0x1c0b57[_0xbb10('0x78')](_0xbb10('0xb2')),_0x59e020(this,function(){_0x1c0b57[_0xbb10('0x39')](_0xbb10('0xb2'));}));});});_0x12e89d['find'](_0xbb10('0x7e'))['each'](function(){var _0x12e89d=_0x3df17b(this);_0x12e89d[_0xbb10('0x35')](_0xbb10('0x8b'))['on'](_0xbb10('0xb8'),function(){_0x12e89d[_0xbb10('0x78')](_0xbb10('0xb2'));_0x2b5352[_0xbb10('0xb9')](_0x3df17b(this),function(_0x5e9888){_0x5e9888?_0x12e89d[_0xbb10('0xba')](!0x0)['slideUp'](function(){_0x12e89d['remove']();_0x2b5352[_0xbb10('0x55')]();}):_0x12e89d[_0xbb10('0x39')](_0xbb10('0xb2'));});return!0x1;});});};_0x2b5352[_0xbb10('0x45')]=function(_0x1fc4ec){var _0x16b8c1=_0x1fc4ec['val']();_0x16b8c1=_0x16b8c1[_0xbb10('0x1')](/[^0-9\-]/g,'');_0x16b8c1=_0x16b8c1[_0xbb10('0x1')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0xbb10('0xbb'));_0x16b8c1=_0x16b8c1[_0xbb10('0x1')](/(.{9}).*/g,'$1');_0x1fc4ec[_0xbb10('0x43')](_0x16b8c1);};_0x2b5352[_0xbb10('0x51')]=function(_0x528aff){var _0xdfdc42=_0x528aff[_0xbb10('0x43')]();0x9<=_0xdfdc42[_0xbb10('0x8')]&&(_0x528aff[_0xbb10('0xbc')](_0xbb10('0xbd'))!=_0xdfdc42&&_0x17fd46[_0xbb10('0xbe')]({'postalCode':_0xdfdc42,'country':_0xbb10('0xbf')})['done'](function(_0x33a43e){_0x528aff['closest'](_0xbb10('0xc0'))['find']('.qd-dd-cep-slas')[_0xbb10('0xc1')]();window[_0xbb10('0x19')][_0xbb10('0x75')]=_0x33a43e;_0x2b5352[_0xbb10('0x53')]();_0x33a43e=_0x33a43e[_0xbb10('0x7c')]['logisticsInfo'][0x0][_0xbb10('0xc2')];for(var _0x1c0b57=_0x3df17b('<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>'),_0x4b877c=0x0;_0x4b877c<_0x33a43e[_0xbb10('0x8')];_0x4b877c++){var _0x207e76=_0x33a43e[_0x4b877c],_0x1b9012=0x1<_0x207e76[_0xbb10('0xc3')]?_0x207e76['shippingEstimate'][_0xbb10('0x1')]('bd',_0xbb10('0xc4')):_0x207e76[_0xbb10('0xc3')][_0xbb10('0x1')]('bd',_0xbb10('0xc5')),_0x8a7c27=_0x3df17b(_0xbb10('0xc6'));_0x8a7c27[_0xbb10('0x86')]('<td>\x20R$\x20'+qd_number_format(_0x207e76['price']/0x64,0x2,',','.')+'</td><td>'+_0x207e76[_0xbb10('0xc7')]+_0xbb10('0xc8')+_0x1b9012+_0xbb10('0xc9')+_0xdfdc42+_0xbb10('0xca'));_0x8a7c27[_0xbb10('0xcb')](_0x1c0b57[_0xbb10('0x35')](_0xbb10('0xcc')));}_0x1c0b57[_0xbb10('0xcd')](_0x528aff[_0xbb10('0x0')](_0xbb10('0xc0'))['find']('.qd-ddc-cep-close'));})['fail'](function(_0x3d4b89){_0x2f2ebf([_0xbb10('0xce'),_0x3d4b89]);updateCartData();}),_0x528aff[_0xbb10('0xbc')]('qdDdcLastPostalCode',_0xdfdc42));};_0x2b5352[_0xbb10('0xae')]=function(_0x2f6be3,_0x2c638d,_0x290280,_0x2a6589){function _0x11279d(_0x485f46){_0x485f46='boolean'!==typeof _0x485f46?!0x1:_0x485f46;_0x2b5352[_0xbb10('0x53')]();window['_QuatroDigital_DropDown'][_0xbb10('0x1a')]=!0x1;_0x2b5352[_0xbb10('0x55')]();_0xbb10('0x3')!==typeof window[_0xbb10('0x76')]&&_0xbb10('0xd')===typeof window[_0xbb10('0x76')][_0xbb10('0x77')]&&window[_0xbb10('0x76')][_0xbb10('0x77')][_0xbb10('0x6b')](this);'function'===typeof adminCart&&adminCart();_0x3df17b['fn'][_0xbb10('0x54')](!0x0,void 0x0,_0x485f46);'function'===typeof _0x2a6589&&_0x2a6589(_0x2c638d);}_0x290280=_0x290280||0x1;if(0x1>_0x290280)return _0x2c638d;if(_0x4975f5[_0xbb10('0x2b')]){if('undefined'===typeof window[_0xbb10('0x19')][_0xbb10('0x75')][_0xbb10('0x70')][_0x2f6be3[0x1]])return _0x2f2ebf(_0xbb10('0xcf')+_0x2f6be3[0x1]+']'),_0x2c638d;window['_QuatroDigital_DropDown'][_0xbb10('0x75')]['items'][_0x2f6be3[0x1]][_0xbb10('0x8a')]=_0x290280;window[_0xbb10('0x19')][_0xbb10('0x75')]['items'][_0x2f6be3[0x1]][_0xbb10('0xd0')]=_0x2f6be3[0x1];_0x17fd46[_0xbb10('0xd1')]([window[_0xbb10('0x19')][_0xbb10('0x75')][_0xbb10('0x70')][_0x2f6be3[0x1]]],[_0xbb10('0x70'),'totalizers','shippingData'])['done'](function(_0x26a752){window['_QuatroDigital_DropDown'][_0xbb10('0x75')]=_0x26a752;_0x11279d(!0x0);})['fail'](function(_0xf90506){_0x2f2ebf([_0xbb10('0xd2'),_0xf90506]);_0x11279d();});}else _0x2f2ebf(_0xbb10('0xd3'));};_0x2b5352['removeProduct']=function(_0x4b5364,_0x451b4d){function _0x9e5cf2(_0x443e56){_0x443e56='boolean'!==typeof _0x443e56?!0x1:_0x443e56;_0xbb10('0x3')!==typeof window[_0xbb10('0x76')]&&_0xbb10('0xd')===typeof window['_QuatroDigital_AmountProduct']['exec']&&window['_QuatroDigital_AmountProduct'][_0xbb10('0x77')]['call'](this);_0xbb10('0xd')===typeof adminCart&&adminCart();_0x3df17b['fn'][_0xbb10('0x54')](!0x0,void 0x0,_0x443e56);_0xbb10('0xd')===typeof _0x451b4d&&_0x451b4d(_0x72f1c1);}var _0x72f1c1=!0x1,_0x1c0b57=_0x3df17b(_0x4b5364)[_0xbb10('0x88')](_0xbb10('0xad'));if(_0x4975f5[_0xbb10('0x2b')]){if(_0xbb10('0x3')===typeof window[_0xbb10('0x19')][_0xbb10('0x75')]['items'][_0x1c0b57])return _0x2f2ebf(_0xbb10('0xcf')+_0x1c0b57+']'),_0x72f1c1;window[_0xbb10('0x19')]['getOrderForm'][_0xbb10('0x70')][_0x1c0b57]['index']=_0x1c0b57;_0x17fd46['removeItems']([window[_0xbb10('0x19')][_0xbb10('0x75')][_0xbb10('0x70')][_0x1c0b57]],[_0xbb10('0x70'),_0xbb10('0x7b'),'shippingData'])[_0xbb10('0xd4')](function(_0x18b749){_0x72f1c1=!0x0;window['_QuatroDigital_DropDown'][_0xbb10('0x75')]=_0x18b749;_0xa7179d(_0x18b749);_0x9e5cf2(!0x0);})[_0xbb10('0xd5')](function(_0x5a82e7){_0x2f2ebf([_0xbb10('0xd6'),_0x5a82e7]);_0x9e5cf2();});}else alert('Atenção,\x20este\x20método\x20esta\x20descontinuado.');};_0x2b5352[_0xbb10('0x3f')]=function(_0x8e8049,_0x175dc4,_0xcda15c,_0x2dc07b){_0x2dc07b=_0x2dc07b||_0x3df17b(_0xbb10('0xd7'));_0x8e8049=_0x8e8049||'+';_0x175dc4=_0x175dc4||0.9*_0x2dc07b[_0xbb10('0xd8')]();_0x2dc07b['stop'](!0x0,!0x0)[_0xbb10('0xd9')]({'scrollTop':isNaN(_0xcda15c)?_0x8e8049+'='+_0x175dc4+'px':_0xcda15c});};_0x4975f5[_0xbb10('0xda')]||(_0x2b5352[_0xbb10('0x53')](),_0x3df17b['fn'][_0xbb10('0x54')](!0x0));_0x3df17b(window)['on'](_0xbb10('0xdb'),function(){try{window[_0xbb10('0x19')]['getOrderForm']=void 0x0,_0x2b5352['getCartInfoByUrl']();}catch(_0x5a40e8){_0x2f2ebf(_0xbb10('0xdc')+_0x5a40e8[_0xbb10('0x10')],_0xbb10('0xdd'));}});_0xbb10('0xd')===typeof _0x4975f5['callback']?_0x4975f5[_0xbb10('0xb')][_0xbb10('0x6b')](this):_0x2f2ebf(_0xbb10('0xde'));};_0x3df17b['fn']['QD_dropDownCart']=function(_0x4e295f){var _0xe5b08=_0x3df17b(this);_0xe5b08['fn']=new _0x3df17b['QD_dropDownCart'](this,_0x4e295f);return _0xe5b08;};}catch(_0x27b3e5){_0xbb10('0x3')!==typeof console&&_0xbb10('0xd')===typeof console[_0xbb10('0xe')]&&console[_0xbb10('0xe')](_0xbb10('0xf'),_0x27b3e5);}}(this));(function(_0x1fe250){try{var _0x57933f=jQuery;window[_0xbb10('0x76')]=window[_0xbb10('0x76')]||{};window['_QuatroDigital_AmountProduct'][_0xbb10('0x70')]={};window[_0xbb10('0x76')][_0xbb10('0xdf')]=!0x1;window['_QuatroDigital_AmountProduct']['buyButtonClicked']=!0x1;window['_QuatroDigital_AmountProduct'][_0xbb10('0xe0')]=!0x1;var _0x123bab=function(){if(window['_QuatroDigital_AmountProduct'][_0xbb10('0xdf')]){var _0x163420=!0x1;var _0x6a25ba={};window[_0xbb10('0x76')][_0xbb10('0x70')]={};for(_0x50bd15 in window[_0xbb10('0x19')][_0xbb10('0x75')]['items'])if(_0xbb10('0x11')===typeof window['_QuatroDigital_DropDown']['getOrderForm']['items'][_0x50bd15]){var _0x142b84=window[_0xbb10('0x19')]['getOrderForm'][_0xbb10('0x70')][_0x50bd15];'undefined'!==typeof _0x142b84[_0xbb10('0xe1')]&&null!==_0x142b84[_0xbb10('0xe1')]&&''!==_0x142b84[_0xbb10('0xe1')]&&(window['_QuatroDigital_AmountProduct']['items'][_0xbb10('0xe2')+_0x142b84['productId']]=window[_0xbb10('0x76')][_0xbb10('0x70')]['prod_'+_0x142b84['productId']]||{},window[_0xbb10('0x76')][_0xbb10('0x70')][_0xbb10('0xe2')+_0x142b84['productId']][_0xbb10('0xe3')]=_0x142b84[_0xbb10('0xe1')],_0x6a25ba[_0xbb10('0xe2')+_0x142b84['productId']]||(window[_0xbb10('0x76')][_0xbb10('0x70')][_0xbb10('0xe2')+_0x142b84[_0xbb10('0xe1')]][_0xbb10('0xe4')]=0x0),window[_0xbb10('0x76')][_0xbb10('0x70')][_0xbb10('0xe2')+_0x142b84[_0xbb10('0xe1')]][_0xbb10('0xe4')]+=_0x142b84[_0xbb10('0x8a')],_0x163420=!0x0,_0x6a25ba[_0xbb10('0xe2')+_0x142b84[_0xbb10('0xe1')]]=!0x0);}var _0x50bd15=_0x163420;}else _0x50bd15=void 0x0;window['_QuatroDigital_AmountProduct'][_0xbb10('0xdf')]&&(_0x57933f('.qd-bap-wrapper')[_0xbb10('0xc1')](),_0x57933f(_0xbb10('0xe5'))[_0xbb10('0x39')]('qd-bap-item-added'));for(var _0x284313 in window[_0xbb10('0x76')][_0xbb10('0x70')]){_0x142b84=window[_0xbb10('0x76')][_0xbb10('0x70')][_0x284313];if('object'!==typeof _0x142b84)return;_0x6a25ba=_0x57933f(_0xbb10('0xe6')+_0x142b84[_0xbb10('0xe3')]+']')[_0xbb10('0x8f')]('li');if(window[_0xbb10('0x76')][_0xbb10('0xdf')]||!_0x6a25ba[_0xbb10('0x35')]('.qd-bap-wrapper')[_0xbb10('0x8')])_0x163420=_0x57933f(_0xbb10('0xe7')),_0x163420['find'](_0xbb10('0xe8'))[_0xbb10('0x60')](_0x142b84[_0xbb10('0xe4')]),_0x142b84=_0x6a25ba[_0xbb10('0x35')](_0xbb10('0xe9')),_0x142b84[_0xbb10('0x8')]?_0x142b84[_0xbb10('0xea')](_0x163420)[_0xbb10('0x78')](_0xbb10('0xeb')):_0x6a25ba[_0xbb10('0xea')](_0x163420);}_0x50bd15&&(window[_0xbb10('0x76')][_0xbb10('0xdf')]=!0x1);};window[_0xbb10('0x76')][_0xbb10('0x77')]=function(){window[_0xbb10('0x76')]['allowRecalculate']=!0x0;_0x123bab[_0xbb10('0x6b')](this);};_0x57933f(document)[_0xbb10('0xec')](function(){_0x123bab['call'](this);});}catch(_0x5baeaa){_0xbb10('0x3')!==typeof console&&_0xbb10('0xd')===typeof console[_0xbb10('0xe')]&&console[_0xbb10('0xe')](_0xbb10('0xf'),_0x5baeaa);}}(this));(function(){try{var _0x355987=jQuery,_0x3a696f,_0xb6bc06={'selector':_0xbb10('0xed'),'dropDown':{},'buyButton':{}};_0x355987['QD_smartCart']=function(_0x5a1825){var _0x4e0cfb={};_0x3a696f=_0x355987['extend'](!0x0,{},_0xb6bc06,_0x5a1825);_0x5a1825=_0x355987(_0x3a696f['selector'])['QD_dropDownCart'](_0x3a696f[_0xbb10('0xee')]);_0x4e0cfb[_0xbb10('0xef')]=_0xbb10('0x3')!==typeof _0x3a696f[_0xbb10('0xee')]['updateOnlyHover']&&!0x1===_0x3a696f[_0xbb10('0xee')][_0xbb10('0xda')]?_0x355987(_0x3a696f[_0xbb10('0xf0')])[_0xbb10('0xf1')](_0x5a1825['fn'],_0x3a696f['buyButton']):_0x355987(_0x3a696f['selector'])[_0xbb10('0xf1')](_0x3a696f[_0xbb10('0xef')]);_0x4e0cfb['dropDown']=_0x5a1825;return _0x4e0cfb;};_0x355987['fn']['smartCart']=function(){_0xbb10('0x11')===typeof console&&_0xbb10('0xd')===typeof console[_0xbb10('0x12')]&&console[_0xbb10('0x12')](_0xbb10('0xf2'));};_0x355987['smartCart']=_0x355987['fn'][_0xbb10('0xf3')];}catch(_0x5382e9){'undefined'!==typeof console&&_0xbb10('0xd')===typeof console[_0xbb10('0xe')]&&console[_0xbb10('0xe')](_0xbb10('0xf'),_0x5382e9);}}());
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
var _0xc543=['attr','src','sizes','width','qd-sil-image','closest','qd-sil-on','offset','push','each','QD_SIL_scrollRange','scroll','documentElement','trigger','QD_SIL_scroll','QD_smartImageLoad','vinyzvk%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','join','toUpperCase','ite','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Quatro\x20Digital\x20-\x20Smart\x20Image\x20Load','object','undefined','info','warn','function','unshift','alerta','toLowerCase','aviso','apply','error','.qd_sil_img_wrapper','300','imageWrapper','find','length','scrollTop','bottom','top','first','height','Problemas\x20:(\x20.\x20Detalhes:\x20','clone','load','addClass','qd-sil-image-loaded'];(function(_0x4d88e9,_0x37bd4a){var _0x5299a6=function(_0x274ee5){while(--_0x274ee5){_0x4d88e9['push'](_0x4d88e9['shift']());}};_0x5299a6(++_0x37bd4a);}(_0xc543,0x1da));var _0x3c54=function(_0x5724e6,_0xa6ee67){_0x5724e6=_0x5724e6-0x0;var _0x4ccb15=_0xc543[_0x5724e6];return _0x4ccb15;};(function(_0x37db09){'use strict';var _0x43c826=jQuery;if(typeof _0x43c826['fn']['QD_smartImageLoad']==='function')return;_0x43c826['fn'][_0x3c54('0x0')]=function(){};var _0x371f2d=function(_0x7af60b){var _0x1d095c={'a':_0x3c54('0x1')};return function(_0x58942e){var _0x4fa198,_0x1e9fad,_0x4a3cb7,_0x8c78ab;_0x1e9fad=function(_0x2b65a2){return _0x2b65a2;};_0x4a3cb7=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x58942e=_0x58942e['d'+_0x4a3cb7[0x10]+'c'+_0x4a3cb7[0x11]+'m'+_0x1e9fad(_0x4a3cb7[0x1])+'n'+_0x4a3cb7[0xd]]['l'+_0x4a3cb7[0x12]+'c'+_0x4a3cb7[0x0]+'ti'+_0x1e9fad('o')+'n'];_0x4fa198=function(_0x4b4399){return escape(encodeURIComponent(_0x4b4399[_0x3c54('0x2')](/\./g,'¨')[_0x3c54('0x2')](/[a-zA-Z]/g,function(_0x31e2f8){return String[_0x3c54('0x3')](('Z'>=_0x31e2f8?0x5a:0x7a)>=(_0x31e2f8=_0x31e2f8['charCodeAt'](0x0)+0xd)?_0x31e2f8:_0x31e2f8-0x1a);})));};var _0x3632af=_0x4fa198(_0x58942e[[_0x4a3cb7[0x9],_0x1e9fad('o'),_0x4a3cb7[0xc],_0x4a3cb7[_0x1e9fad(0xd)]][_0x3c54('0x4')]('')]);_0x4fa198=_0x4fa198((window[['js',_0x1e9fad('no'),'m',_0x4a3cb7[0x1],_0x4a3cb7[0x4][_0x3c54('0x5')](),_0x3c54('0x6')][_0x3c54('0x4')]('')]||'---')+['.v',_0x4a3cb7[0xd],'e',_0x1e9fad('x'),'co',_0x1e9fad('mm'),'erc',_0x4a3cb7[0x1],'.c',_0x1e9fad('o'),'m.',_0x4a3cb7[0x13],'r']['join'](''));for(var _0x5c57b6 in _0x1d095c){if(_0x4fa198===_0x5c57b6+_0x1d095c[_0x5c57b6]||_0x3632af===_0x5c57b6+_0x1d095c[_0x5c57b6]){_0x8c78ab='tr'+_0x4a3cb7[0x11]+'e';break;}_0x8c78ab='f'+_0x4a3cb7[0x0]+'ls'+_0x1e9fad(_0x4a3cb7[0x1])+'';}_0x1e9fad=!0x1;-0x1<_0x58942e[[_0x4a3cb7[0xc],'e',_0x4a3cb7[0x0],'rc',_0x4a3cb7[0x9]][_0x3c54('0x4')]('')][_0x3c54('0x7')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x1e9fad=!0x0);return[_0x8c78ab,_0x1e9fad];}(_0x7af60b);}(window);if(!eval(_0x371f2d[0x0]))return _0x371f2d[0x1]?_0x12a9c8(_0x3c54('0x8')):!0x1;var _0x338865=_0x3c54('0x9');var _0x12a9c8=function(_0x424492,_0x42d587){if(_0x3c54('0xa')===typeof console&&'undefined'!==typeof console['error']&&_0x3c54('0xb')!==typeof console[_0x3c54('0xc')]&&_0x3c54('0xb')!==typeof console[_0x3c54('0xd')]){if(_0x3c54('0xa')==typeof _0x424492&&_0x3c54('0xe')==typeof _0x424492[_0x3c54('0xf')]){_0x424492[_0x3c54('0xf')]('['+_0x338865+']\x0a');var _0x4fa8ce=_0x424492;}else _0x4fa8ce=['['+_0x338865+']\x0a',_0x424492];if('undefined'==typeof _0x42d587||_0x3c54('0x10')!==_0x42d587[_0x3c54('0x11')]()&&_0x3c54('0x12')!==_0x42d587['toLowerCase']())if(_0x3c54('0xb')!=typeof _0x42d587&&_0x3c54('0xc')==_0x42d587[_0x3c54('0x11')]())try{console['info'][_0x3c54('0x13')](console,_0x4fa8ce);}catch(_0x536d95){try{console[_0x3c54('0xc')](_0x4fa8ce['join']('\x0a'));}catch(_0x430970){}}else try{console[_0x3c54('0x14')]['apply'](console,_0x4fa8ce);}catch(_0x30ed34){try{console[_0x3c54('0x14')](_0x4fa8ce[_0x3c54('0x4')]('\x0a'));}catch(_0x50b913){}}else try{console['warn'][_0x3c54('0x13')](console,_0x4fa8ce);}catch(_0x3f5783){try{console['warn'](_0x4fa8ce[_0x3c54('0x4')]('\x0a'));}catch(_0x1a3bb5){}}}};var _0xca70f2=/(ids\/[0-9]+-)[0-9-]+/i;var _0x1d0f08={'imageWrapper':_0x3c54('0x15'),'sizes':{'width':_0x3c54('0x16'),'height':'300'}};var _0x5378fe=function(_0x58f55b,_0x2a2ca1){'use strict';_0x3a4a27();_0x43c826(window)['on']('QD_SIL_scroll\x20QuatroDigital.is_Callback',_0x3a4a27);function _0x3a4a27(){try{var _0x173015=_0x58f55b['find'](_0x2a2ca1[_0x3c54('0x17')])['not']('.qd-sil-on')[_0x3c54('0x18')]('img:visible');if(!_0x173015[_0x3c54('0x19')])return;var _0x31952a=_0x43c826(window);var _0x1d0b79={'top':_0x31952a[_0x3c54('0x1a')]()};_0x1d0b79[_0x3c54('0x1b')]=_0x1d0b79[_0x3c54('0x1c')]+_0x31952a['height']();var _0x9729b9=_0x173015[_0x3c54('0x1d')]()[_0x3c54('0x1e')]();var _0x4c1fad=_0x5d1ced(_0x173015,_0x1d0b79,_0x9729b9);for(var _0xcc798b=0x0;_0xcc798b<_0x4c1fad[_0x3c54('0x19')];_0xcc798b++)_0x587a7f(_0x43c826(_0x4c1fad[_0xcc798b]));}catch(_0x5e8786){typeof console!==_0x3c54('0xb')&&typeof console[_0x3c54('0x14')]===_0x3c54('0xe')&&console['error'](_0x3c54('0x1f'),_0x5e8786);}}function _0x587a7f(_0xd3362b){var _0x1b9b82=_0xd3362b[_0x3c54('0x20')]();_0x1b9b82['on'](_0x3c54('0x21'),function(){_0x43c826(this)[_0x3c54('0x22')](_0x3c54('0x23'));});_0x1b9b82[_0x3c54('0x24')]({'src':_0x1b9b82[0x0][_0x3c54('0x25')][_0x3c54('0x2')](_0xca70f2,'$1'+_0x2a2ca1['sizes']['width']+'-'+_0x2a2ca1[_0x3c54('0x26')][_0x3c54('0x1e')]),'width':_0x2a2ca1[_0x3c54('0x26')][_0x3c54('0x27')],'height':_0x2a2ca1[_0x3c54('0x26')]['height']});_0x1b9b82[_0x3c54('0x22')](_0x3c54('0x28'))['insertAfter'](_0xd3362b);_0x1b9b82[_0x3c54('0x29')](_0x2a2ca1['imageWrapper'])[_0x3c54('0x22')](_0x3c54('0x2a'));}function _0x5d1ced(_0x5854ee,_0x45b482,_0x5a27fb){var _0x29a022;var _0x1cd4f0=[];for(var _0xd0178a=0x0;_0xd0178a<_0x5854ee[_0x3c54('0x19')];_0xd0178a++){_0x29a022=_0x43c826(_0x5854ee[_0xd0178a])[_0x3c54('0x2b')]();_0x29a022[_0x3c54('0x1b')]=_0x29a022['top']+_0x5a27fb;if(!(_0x45b482[_0x3c54('0x1b')]<_0x29a022[_0x3c54('0x1c')]||_0x45b482[_0x3c54('0x1c')]>_0x29a022[_0x3c54('0x1b')])){_0x1cd4f0[_0x3c54('0x2c')](_0x5854ee[_0xd0178a]);}}return _0x1cd4f0;};};_0x43c826['fn'][_0x3c54('0x0')]=function(_0x11427a){var _0x3b50af=_0x43c826(this);if(!_0x3b50af[_0x3c54('0x19')])return _0x3b50af;_0x3b50af[_0x3c54('0x2d')](function(){var _0xfe90f=_0x43c826(this);_0xfe90f[_0x3c54('0x0')]=new _0x5378fe(_0xfe90f,_0x43c826['extend']({},_0x1d0f08,_0x11427a));});return _0x3b50af;};window[_0x3c54('0x2e')]=0x28;var _0x4d5304=QD_SIL_scrollRange;var _0x1960c4=0x0;_0x43c826(window)['on'](_0x3c54('0x2f'),function(){var _0x145f55=document[_0x3c54('0x30')][_0x3c54('0x1a')];if(_0x145f55>_0x1960c4+_0x4d5304||_0x145f55<_0x1960c4-_0x4d5304){_0x43c826(window)[_0x3c54('0x31')](_0x3c54('0x32'));_0x1960c4=_0x145f55;}});}(this));
