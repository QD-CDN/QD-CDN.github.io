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
			Common.applyCarouselShelf();
			Common.applyAmazingMenu();
			Common.applyAmazingMenuMobile();
			Common.applyImageLoad(); // Carregar após Amazing Menu sempre
			Common.applySmartCart();
			Common.openSearchModal();
			Common.overlay();
			Common.saveAmountFix();
			Common.applyTipBarCarouselFooter();
			Common.showFooterLinks();
			Common.applyMosaicCategorieBanners();
		},
		ajaxStop: function() {
			Common.saveAmountFix();
		},
		windowOnload: function() {},
		vtexBindQuickViewDestroy: function() {
			window.bindQuickView = function() {};
		},
		applyImageLoad: function () {
			$('.search-qd-v1-result, .carousel-qd-v1-shelf, .accessories-qd-v1-wrapper').QD_smartImageLoad({
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
		showFooterLinks: function () {
			$('.info-title').click(function (e) {
				var $t = $(this);
				$t.toggleClass('qd-is-active');
				$('.info-nav').toggleClass('qd-is-active');
			});
			
			$('.help-title').click(function (e) {
				var $t = $(this);
				$t.toggleClass('qd-is-active');
				$('.help-nav').toggleClass('qd-is-active');
			});
			// $('.social-title').click(function (e) {
			// 	var $t = $(this);
			// 	$t.toggleClass('qd-is-active');
			// 	$('.footer-qd-v1-social-link').toggleClass('qd-is-active');
			// });
		},
		applyMosaicCategorieBanners: function () {
			$('.banner-qd-v1-responsive > .box-banner').QD_mosaicBanners();
		},
		saveAmountFix: function () {
			$('.shelf-qd-v1-highlight-discount-percentage:not(.qd-on)').addClass('qd-on').each(function () {
				var $t = $(this);
				$t.text(($t.text().trim().match(/[0-9]+/) || [""]).pop() + '% off');
			});
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
				return { slidesToShow: 1 };
				return {};
			})()));
		},
		
		setDataScrollToggle: function () {
			$(document.body).attr('data-qd-scroll-limit', '100, 800');
		},
		applyCarouselShelf: function () {
			var wrapper = $('.carousel-qd-v1-shelf .prateleira').not('.slick-initialized');
			
			if (!wrapper.length)
			return false;
			
			wrapper.has('h2').each(function () {
				var $t = $(this);
				$t.find('h2').addClass("component-qd-v1-section-title").insertBefore($t);
			});
			
			wrapper.slick({
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
		applyAmazingMenu: function () {
			$('.header-qd-v1-amazing-menu, .footer-qd-v1-menu-list').QD_amazingMenu();
		},
		applyAmazingMenuMobile: function () {
			var wrapper = $('.header-qd-v1-amazing-menu-mobile');
			
			wrapper.find('> ul > li > ul').prepend(function () { return $(this).prev().clone().wrap('<li></li>').parent() });
			
			wrapper.QD_amazingMenu({
				callback: function () {
					$('<span class="qd-am-dropdown-trigger"><i class="fa fa-chevron-right"></i></span>').appendTo(wrapper.find('.qd-am-has-ul')).click(function () {
						var $t = $(this);
						$.merge($t.parent(), $t.closest('ul')).toggleClass('qd-am-is-active');
						
						$t.filter(function () { return !$(this).closest('ul').is('.qd-amazing-menu'); }).siblings('ul').stop(true, true).slideToggle();
					});
					
					wrapper.find('nav > ul > li > .qd-am-dropdown-trigger').click(function () {
						$('.header-qd-v1-amazing-menu-mobile').addClass('qd-am-is-active');
						$('.header-qd-v1-amazing-menu-mobile').animate({
							scrollTop: 0
						}, 200);
					});
					
					wrapper.find('nav > ul > li > ul > li:first-child').click(function (e) {
						e.preventDefault();
						$(this).parents(".qd-am-is-active").removeClass('qd-am-is-active');
					});
				}
			});
			
			$('.header-qd-v1-amazing-menu-trigger').click(function (evt) {
				evt.preventDefault();
				$(document.body).toggleClass('qd-am-on');
			});
			
			$('.header-qd-v1-amazing-menu-mobile .header-qd-v1-user-message').on('click', 'a#login', function () {
				$(document.body).removeClass('qd-am-on');
			});
			
			$('.header-qd-v1-amazing-menu-mobile .header-qd-v1-user-message').append('<div class="header-qd-v1-close-amazing-menu-mobile"></div>');
			
			$('.header-qd-v1-close-amazing-menu-mobile').click(function (evt) {
				$(document.body).removeClass(Common.qdOverlayClass);
			});
			
		},
		applySmartCart: function () {
			$('.header-qd-v1-cart').append('<div class="smart-cart-qd-v1-wrapper"><div class="qd-sc-wrapper"></div></div>');
			
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
			
			$('.header-qd-v1-cart-link-trigger').click(function (evt) {
				evt.preventDefault();
				$(document.body).toggleClass('qd-cart-show');
				
				wrapper.height($(window).height());
				wrapper.find(".qd-ddc-prodWrapper").css('max-height', $(window).height() - 242);
				
				if (window.Tawk_API)
					window.Tawk_API.toggleVisibility();
			});
			
			$('.qd_ddc_lightBoxClose').click(function (evt) {
				$(document.body).removeClass(Common.qdOverlayClass);
				
				if (window.Tawk_API)
				window.Tawk_API.toggleVisibility();
			});
		},
		openSearchModal: function () {
			$('.header-qd-v1-search-trriger').click(function () {
				$('.modal-qd-v1-search').modal();
				return false;
			});
		},
		qdOverlayClass: 'qd-am-on qd-cart-show qd-sn-on',
		overlay: function () {
			$('.components-qd-v1-overlay').click(function () {
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		}
	};
	
	var Home = {
		init: function() {
			Home.applySlickSlider();
			Home.applyMosaicCarousel();
			Home.applyBrandCarousel();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		applySlickSlider: function () {
			var wrapper = $('.slider-qd-v1-full');
			
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
			
			// var mobileDotsWrapper = $('.slider-qd-v1-full-mobile .slick-dots');
			// mobileDotsWrapper.on('init', function (event, slick) {
			// 	$(this).find('.slick-current').addClass('slick-active');
			// });
			
			// mobileDotsWrapper.slick({
			// 	asNavFor: '.slider-qd-v1-full-mobile',
			// 	arrows: false,
			// 	centerMode: true,
			// 	infinite: false,
			// 	focusOnSelect: true,
			// 	variableWidth: true,
			// 	centerPadding: '24%'
			// });
			
			// // On after slide change
			// var mobileWrapper = $('.slider-qd-v1-full.slider-qd-v1-full-mobile');
			// mobileWrapper.on('afterChange', function (event, slick, currentSlide, nextSlide) {
			// 	mobileDotsWrapper.slick('slickGoTo', currentSlide);
			// 	mobileDotsWrapper.find('.slick-current').addClass('slick-active');
			// });
			
			wrapper.each(function () {
				$(this).find('.slick-arrow').wrapAll('<div class="slick-nav" />');
			});
		},
		applyMosaicCarousel: function () {
			var wrapper = $('.categories-carousel-qd-v1-banners .mosaic-categories-qd-v1-wrapper').not('.slick-initialized');
			var mbRow = $('.categories-carousel-qd-v1-banners .banner-qd-v1-responsive > .qd-mb-row');
			
			if (!wrapper.length)
			return false;
			
			mbRow.each(function () {
				$(this).find('.box-banner').insertBefore(this);
			}).remove();
			
			wrapper.slick({
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
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
		},
		applyBrandCarousel: function () {
			var wrapper = $('.brand-carousel-qd-v1-carousel');
			
			wrapper.slick({
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
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
		}
	};
	
	var Search = {
		init: function () { 
			Search.openFiltersMenu();
			Search.hideExtendedMenu();
			Search.infinityScroll();
			Home.applySlickSlider(); 
			Search.shelfLineFix();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
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
		infinityScroll: function () {
			$(".prateleira[id*=ResultItems]").QD_infinityScroll();
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
		}
	};
	
	var Product = {
		run: function() {},
		init: function() {
			// Product.forceImageZoom();
			Product.accessoriesFix();
			Product.accessoriesApplyCarousel();
			Product.setAvailableBodyClass();
			Product.productThumbCarousel();
			Product.qdHideUniqueSkuOption();
			Product.fixSKUselect();
			Product.openShipping();
			Product.scrollToBuyButton();
			Product.applyCarouselShelfSimilares();
			Product.rotateBuyTogether();
		},
		ajaxStop: function() {},
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
				responsive: [{ breakpoint: 1200, settings: { slidesToShow: 3, slidesToScroll: 3 } }, { breakpoint: 991, settings: { slidesToShow: 2, slidesToScroll: 2 } }, { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } }]
			});
		},
		productThumbCarousel: function () {
			$('.product-qd-v1-image-info-wrapper').QD_smartPhotoCarousel({
				imageWrapper: '.product-qd-v1-image',
				thumbsWrapper: '.product-qd-v1-image-thumbs',
				sizes: {
					thumb: '150-150',
					image: '751-751',
					imagezoom: '1000-1000'
				},
				slickOptions: {
					images: {
						lazyLoad: 'ondemand',
						infinite: false,
						arrows: false,
					},
					thumbs: {
						vertical: false,
						slidesToShow: 4,
						slidesToScroll: 1,
						arrows: false,
						focusOnSelect: true,
						centerMode: true,
						centerPadding: '25px',						
						responsive: [
							{
								breakpoint: 991,
								settings: {
									centerPadding: '10px'
								}
							}
						]
					}
				},
			});
		},
		qdHideUniqueSkuOption: function () {
			$(".product-qd-v1-sku-selection [class*='group_']").each(function () {
				var $t = $(this);
				var input = $t.find("input");
				
				if (input.length !== 1)
				return;
				
				input.attr("checked", true).change();
				$t.getParent("ul").hide();
			});
		},
		fixSKUselect: function () {
			var wrapper = $('.product-qd-v1-sku-selection');
			var value = wrapper.find('li.specification').first().text();
			wrapper.find('select').find('option[value=""]').append(value).attr('value', 'selecione');
		},
		openShipping: function () {
			if (typeof window.ShippingValue === "function")
				window.ShippingValue();
		},
		scrollToBuyButton: function () {
			$('.product-qd-v1-fixed-bar .buy-button').click(function (e) {
				e.preventDefault();
				
				$('html, body').stop().animate({
					'scrollTop': $('.product-qd-v1-sku-selection-wrapper').offset().top - 75
				}, 900, 'swing');
			});
		},
		applyCarouselShelfSimilares: function () {
			var wrapper = $('.qd-kenning-color');
			
			if (!wrapper.length)
			return false;
			
			wrapper.each(function () {
				var $t = $(this);
				$t.find('h2').insertBefore(wrapper);
			});
			
			wrapper.parent().removeClass('mosaic-qd-v1-wrapper'); // remove classe de mosaico se tiver carrossel
			
			wrapper.slick({
				prevArrow: '<button type="button" class="slick-prev slick-arrow"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next slick-arrow"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: 4,
				slidesToScroll: 4,
				infinite: true,
				draggable: false,
				speed: 700
			});
		},
		rotateBuyTogether: function () {
			if (typeof $.fn.slick != "function")
			return;
			
			var slider = $('<div class="rotative-buy-together-qd-v1-slide" />').insertAfter('#divTitulo');
			var wrapper = $('.product-qd-v1-buy-together');
			wrapper.find('tr').each(function () {
				$(this).appendTo(slider).wrap("<div><table /></div>");
			});
			wrapper.find('.buy-together-content > table').remove();
			
			slider.slick({
				autoplay: false,
				draggable: true,
				autoplay: true,
				autoplaySpeed: 7000,
				fade: true,
				cssEase: 'linear'
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
		var _0x4b6c=['undefined','readyState','data','textStatus','errorThrown','version','/produto/sku/','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','QD_smartStockAvailable','unshift','alerta','toLowerCase','aviso','info','apply','removeClass','addClass','qd-ssa-sku-selected','SkuSellersInformation','AvailableQuantity','attr','data-qd-ssa-qtt','each','find','hide','qd-ssa-hide','filter','length','[data-qd-ssa-text=\x22default\x22]','qd-ssa-show','html','replace','#qtt','show','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','message','qd-ssa-sku-no-selected','qd-ssa-skus-','skus','split','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','QuatroDigital.ssa.prodUnavailable','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','off','qd-ssa-sku-prod-unavailable','hkpnfr%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','join','erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','qdPlugin','QuatroDigital.ssa.skuSelected','initialSkuSelected','prod','unavailable','vtex.sku.selected.QD','vtex.sku.selectable','available','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','function','qdAjax','qdAjaxQueue','opts','push','success','call','error','parameters','callbackFns','successPopulated','boolean','errorPopulated','completePopulated','extend','object','complete','clearQueueDelay','jqXHR'];(function(_0x30a0b9,_0x2e5a5a){var _0x4acbc1=function(_0x154b79){while(--_0x154b79){_0x30a0b9['push'](_0x30a0b9['shift']());}};_0x4acbc1(++_0x2e5a5a);}(_0x4b6c,0x18c));var _0x3ff1=function(_0x174c7f,_0x312b78){_0x174c7f=_0x174c7f-0x0;var _0xada71c=_0x4b6c[_0x174c7f];return _0xada71c;};(function(_0x34ec24){if(_0x3ff1('0x0')!==typeof _0x34ec24[_0x3ff1('0x1')]){var _0x598361={};_0x34ec24[_0x3ff1('0x2')]=_0x598361;_0x34ec24[_0x3ff1('0x1')]=function(_0x306b48){var _0x41b12a=_0x34ec24['extend']({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x306b48);var _0x2ef647=escape(encodeURIComponent(_0x41b12a['url']));_0x598361[_0x2ef647]=_0x598361[_0x2ef647]||{};_0x598361[_0x2ef647][_0x3ff1('0x3')]=_0x598361[_0x2ef647][_0x3ff1('0x3')]||[];_0x598361[_0x2ef647][_0x3ff1('0x3')][_0x3ff1('0x4')]({'success':function(_0x43e864,_0x162a4d,_0xf92459){_0x41b12a[_0x3ff1('0x5')][_0x3ff1('0x6')](this,_0x43e864,_0x162a4d,_0xf92459);},'error':function(_0x20b5fc,_0x1bc15e,_0x2d0d4d){_0x41b12a[_0x3ff1('0x7')]['call'](this,_0x20b5fc,_0x1bc15e,_0x2d0d4d);},'complete':function(_0x12357e,_0x7f28fa){_0x41b12a['complete'][_0x3ff1('0x6')](this,_0x12357e,_0x7f28fa);}});_0x598361[_0x2ef647][_0x3ff1('0x8')]=_0x598361[_0x2ef647][_0x3ff1('0x8')]||{'success':{},'error':{},'complete':{}};_0x598361[_0x2ef647][_0x3ff1('0x9')]=_0x598361[_0x2ef647][_0x3ff1('0x9')]||{};_0x598361[_0x2ef647]['callbackFns'][_0x3ff1('0xa')]=_0x3ff1('0xb')===typeof _0x598361[_0x2ef647][_0x3ff1('0x9')][_0x3ff1('0xa')]?_0x598361[_0x2ef647]['callbackFns'][_0x3ff1('0xa')]:!0x1;_0x598361[_0x2ef647][_0x3ff1('0x9')][_0x3ff1('0xc')]='boolean'===typeof _0x598361[_0x2ef647][_0x3ff1('0x9')]['errorPopulated']?_0x598361[_0x2ef647][_0x3ff1('0x9')]['errorPopulated']:!0x1;_0x598361[_0x2ef647][_0x3ff1('0x9')]['completePopulated']=_0x3ff1('0xb')===typeof _0x598361[_0x2ef647][_0x3ff1('0x9')][_0x3ff1('0xd')]?_0x598361[_0x2ef647]['callbackFns'][_0x3ff1('0xd')]:!0x1;_0x306b48=_0x34ec24[_0x3ff1('0xe')]({},_0x41b12a,{'success':function(_0x4b1176,_0x2be20e,_0x2c643d){_0x598361[_0x2ef647][_0x3ff1('0x8')]['success']={'data':_0x4b1176,'textStatus':_0x2be20e,'jqXHR':_0x2c643d};_0x598361[_0x2ef647][_0x3ff1('0x9')][_0x3ff1('0xa')]=!0x0;for(var _0x4afd0 in _0x598361[_0x2ef647][_0x3ff1('0x3')])_0x3ff1('0xf')===typeof _0x598361[_0x2ef647][_0x3ff1('0x3')][_0x4afd0]&&(_0x598361[_0x2ef647]['opts'][_0x4afd0][_0x3ff1('0x5')]['call'](this,_0x4b1176,_0x2be20e,_0x2c643d),_0x598361[_0x2ef647][_0x3ff1('0x3')][_0x4afd0][_0x3ff1('0x5')]=function(){});},'error':function(_0x3ef4dc,_0x4eb968,_0x57b740){_0x598361[_0x2ef647][_0x3ff1('0x8')][_0x3ff1('0x7')]={'errorThrown':_0x57b740,'textStatus':_0x4eb968,'jqXHR':_0x3ef4dc};_0x598361[_0x2ef647][_0x3ff1('0x9')][_0x3ff1('0xc')]=!0x0;for(var _0x2bbbeb in _0x598361[_0x2ef647]['opts'])_0x3ff1('0xf')===typeof _0x598361[_0x2ef647]['opts'][_0x2bbbeb]&&(_0x598361[_0x2ef647]['opts'][_0x2bbbeb][_0x3ff1('0x7')][_0x3ff1('0x6')](this,_0x3ef4dc,_0x4eb968,_0x57b740),_0x598361[_0x2ef647][_0x3ff1('0x3')][_0x2bbbeb][_0x3ff1('0x7')]=function(){});},'complete':function(_0x2ded55,_0x3f8258){_0x598361[_0x2ef647][_0x3ff1('0x8')][_0x3ff1('0x10')]={'textStatus':_0x3f8258,'jqXHR':_0x2ded55};_0x598361[_0x2ef647][_0x3ff1('0x9')][_0x3ff1('0xd')]=!0x0;for(var _0x2df9a2 in _0x598361[_0x2ef647][_0x3ff1('0x3')])_0x3ff1('0xf')===typeof _0x598361[_0x2ef647][_0x3ff1('0x3')][_0x2df9a2]&&(_0x598361[_0x2ef647][_0x3ff1('0x3')][_0x2df9a2][_0x3ff1('0x10')][_0x3ff1('0x6')](this,_0x2ded55,_0x3f8258),_0x598361[_0x2ef647][_0x3ff1('0x3')][_0x2df9a2][_0x3ff1('0x10')]=function(){});isNaN(parseInt(_0x41b12a[_0x3ff1('0x11')]))||setTimeout(function(){_0x598361[_0x2ef647][_0x3ff1('0x12')]=void 0x0;_0x598361[_0x2ef647][_0x3ff1('0x3')]=void 0x0;_0x598361[_0x2ef647][_0x3ff1('0x8')]=void 0x0;_0x598361[_0x2ef647]['callbackFns']=void 0x0;},_0x41b12a[_0x3ff1('0x11')]);}});_0x3ff1('0x13')===typeof _0x598361[_0x2ef647]['jqXHR']?_0x598361[_0x2ef647][_0x3ff1('0x12')]=_0x34ec24['ajax'](_0x306b48):_0x598361[_0x2ef647][_0x3ff1('0x12')]&&_0x598361[_0x2ef647][_0x3ff1('0x12')][_0x3ff1('0x14')]&&0x4==_0x598361[_0x2ef647][_0x3ff1('0x12')]['readyState']&&(_0x598361[_0x2ef647][_0x3ff1('0x9')][_0x3ff1('0xa')]&&_0x306b48['success'](_0x598361[_0x2ef647][_0x3ff1('0x8')][_0x3ff1('0x5')][_0x3ff1('0x15')],_0x598361[_0x2ef647][_0x3ff1('0x8')][_0x3ff1('0x5')][_0x3ff1('0x16')],_0x598361[_0x2ef647][_0x3ff1('0x8')][_0x3ff1('0x5')][_0x3ff1('0x12')]),_0x598361[_0x2ef647]['callbackFns'][_0x3ff1('0xc')]&&_0x306b48['error'](_0x598361[_0x2ef647][_0x3ff1('0x8')][_0x3ff1('0x7')]['jqXHR'],_0x598361[_0x2ef647][_0x3ff1('0x8')][_0x3ff1('0x7')][_0x3ff1('0x16')],_0x598361[_0x2ef647][_0x3ff1('0x8')][_0x3ff1('0x7')][_0x3ff1('0x17')]),_0x598361[_0x2ef647][_0x3ff1('0x9')][_0x3ff1('0xd')]&&_0x306b48[_0x3ff1('0x10')](_0x598361[_0x2ef647][_0x3ff1('0x8')]['complete']['jqXHR'],_0x598361[_0x2ef647]['parameters'][_0x3ff1('0x10')][_0x3ff1('0x16')]));};_0x34ec24[_0x3ff1('0x1')][_0x3ff1('0x18')]='2.1';}}(jQuery));(function(_0x9813ef){function _0x271cfa(_0x5c6d77,_0x2c2c04){_0xa37904['qdAjax']({'url':_0x3ff1('0x19')+_0x5c6d77,'clearQueueDelay':null,'success':_0x2c2c04,'error':function(){_0x389470(_0x3ff1('0x1a'));}});}var _0xa37904=jQuery;if('function'!==typeof _0xa37904['fn'][_0x3ff1('0x1b')]){var _0x389470=function(_0x4f2241,_0x49d1a9){if(_0x3ff1('0xf')===typeof console){var _0x202ad7;'object'===typeof _0x4f2241?(_0x4f2241[_0x3ff1('0x1c')]('[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a'),_0x202ad7=_0x4f2241):_0x202ad7=['[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a'+_0x4f2241];_0x3ff1('0x13')===typeof _0x49d1a9||_0x3ff1('0x1d')!==_0x49d1a9[_0x3ff1('0x1e')]()&&_0x3ff1('0x1f')!==_0x49d1a9['toLowerCase']()?'undefined'!==typeof _0x49d1a9&&_0x3ff1('0x20')===_0x49d1a9['toLowerCase']()?console['info']['apply'](console,_0x202ad7):console['error'][_0x3ff1('0x21')](console,_0x202ad7):console['warn'][_0x3ff1('0x21')](console,_0x202ad7);}},_0x481969={},_0x752dea=function(_0x45a073,_0x1a0553){function _0x5169dc(_0xe9a96a){try{_0x45a073[_0x3ff1('0x22')]('qd-ssa-sku-no-selected')[_0x3ff1('0x23')](_0x3ff1('0x24'));var _0x3b2fa7=_0xe9a96a[0x0][_0x3ff1('0x25')][0x0][_0x3ff1('0x26')];_0x45a073[_0x3ff1('0x27')](_0x3ff1('0x28'),_0x3b2fa7);_0x45a073[_0x3ff1('0x29')](function(){var _0x45a073=_0xa37904(this)[_0x3ff1('0x2a')]('[data-qd-ssa-text]');if(0x1>_0x3b2fa7)return _0x45a073[_0x3ff1('0x2b')]()['addClass'](_0x3ff1('0x2c'))[_0x3ff1('0x22')]('qd-ssa-show');var _0xe9a96a=_0x45a073[_0x3ff1('0x2d')]('[data-qd-ssa-text=\x22'+_0x3b2fa7+'\x22]');_0xe9a96a=_0xe9a96a[_0x3ff1('0x2e')]?_0xe9a96a:_0x45a073[_0x3ff1('0x2d')](_0x3ff1('0x2f'));_0x45a073[_0x3ff1('0x2b')]()[_0x3ff1('0x23')]('qd-ssa-hide')['removeClass'](_0x3ff1('0x30'));_0xe9a96a['html']((_0xe9a96a[_0x3ff1('0x31')]()||'')[_0x3ff1('0x32')](_0x3ff1('0x33'),_0x3b2fa7));_0xe9a96a[_0x3ff1('0x34')]()[_0x3ff1('0x23')](_0x3ff1('0x30'))[_0x3ff1('0x22')](_0x3ff1('0x2c'));});}catch(_0x19babb){_0x389470([_0x3ff1('0x35'),_0x19babb[_0x3ff1('0x36')]]);}}if(_0x45a073['length']){_0x45a073['addClass']('qd-ssa-on');_0x45a073['addClass'](_0x3ff1('0x37'));try{_0x45a073[_0x3ff1('0x23')](_0x3ff1('0x38')+vtxctx[_0x3ff1('0x39')][_0x3ff1('0x3a')](';')['length']);}catch(_0x523276){_0x389470([_0x3ff1('0x3b'),_0x523276['message']]);}_0xa37904(window)['on'](_0x3ff1('0x3c'),function(_0x2247e1,_0x29b684,_0x2061a3){try{_0x271cfa(_0x2061a3[_0x3ff1('0x3d')],function(_0x5d9497){_0x5169dc(_0x5d9497);0x1===vtxctx[_0x3ff1('0x39')][_0x3ff1('0x3a')](';')[_0x3ff1('0x2e')]&&0x0==_0x5d9497[0x0][_0x3ff1('0x25')][0x0][_0x3ff1('0x26')]&&_0xa37904(window)['trigger'](_0x3ff1('0x3e'));});}catch(_0x28e223){_0x389470([_0x3ff1('0x3f'),_0x28e223['message']]);}});_0xa37904(window)[_0x3ff1('0x40')]('vtex.sku.selected.QD');_0xa37904(window)['on'](_0x3ff1('0x3e'),function(){_0x45a073[_0x3ff1('0x23')](_0x3ff1('0x41'))[_0x3ff1('0x2b')]();});}};_0x9813ef=function(_0x152e0e){var _0x3f8363={'y':_0x3ff1('0x42')};return function(_0x49c5ca){var _0x331f74=function(_0x52f851){return _0x52f851;};var _0x6efb3b=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x49c5ca=_0x49c5ca['d'+_0x6efb3b[0x10]+'c'+_0x6efb3b[0x11]+'m'+_0x331f74(_0x6efb3b[0x1])+'n'+_0x6efb3b[0xd]]['l'+_0x6efb3b[0x12]+'c'+_0x6efb3b[0x0]+'ti'+_0x331f74('o')+'n'];var _0x117b16=function(_0x4cfd64){return escape(encodeURIComponent(_0x4cfd64[_0x3ff1('0x32')](/\./g,'¨')[_0x3ff1('0x32')](/[a-zA-Z]/g,function(_0x527621){return String[_0x3ff1('0x43')](('Z'>=_0x527621?0x5a:0x7a)>=(_0x527621=_0x527621[_0x3ff1('0x44')](0x0)+0xd)?_0x527621:_0x527621-0x1a);})));};var _0x24701b=_0x117b16(_0x49c5ca[[_0x6efb3b[0x9],_0x331f74('o'),_0x6efb3b[0xc],_0x6efb3b[_0x331f74(0xd)]]['join']('')]);_0x117b16=_0x117b16((window[['js',_0x331f74('no'),'m',_0x6efb3b[0x1],_0x6efb3b[0x4][_0x3ff1('0x45')](),'ite'][_0x3ff1('0x46')]('')]||'---')+['.v',_0x6efb3b[0xd],'e',_0x331f74('x'),'co',_0x331f74('mm'),_0x3ff1('0x47'),_0x6efb3b[0x1],'.c',_0x331f74('o'),'m.',_0x6efb3b[0x13],'r'][_0x3ff1('0x46')](''));for(var _0x2e9377 in _0x3f8363){if(_0x117b16===_0x2e9377+_0x3f8363[_0x2e9377]||_0x24701b===_0x2e9377+_0x3f8363[_0x2e9377]){var _0x197cac='tr'+_0x6efb3b[0x11]+'e';break;}_0x197cac='f'+_0x6efb3b[0x0]+'ls'+_0x331f74(_0x6efb3b[0x1])+'';}_0x331f74=!0x1;-0x1<_0x49c5ca[[_0x6efb3b[0xc],'e',_0x6efb3b[0x0],'rc',_0x6efb3b[0x9]]['join']('')][_0x3ff1('0x48')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x331f74=!0x0);return[_0x197cac,_0x331f74];}(_0x152e0e);}(window);if(!eval(_0x9813ef[0x0]))return _0x9813ef[0x1]?_0x389470(_0x3ff1('0x49')):!0x1;_0xa37904['fn']['QD_smartStockAvailable']=function(_0x31c6ac){var _0x19925d=_0xa37904(this);_0x31c6ac=_0xa37904[_0x3ff1('0xe')](!0x0,{},_0x481969,_0x31c6ac);_0x19925d[_0x3ff1('0x4a')]=new _0x752dea(_0x19925d,_0x31c6ac);try{_0x3ff1('0xf')===typeof _0xa37904['fn']['QD_smartStockAvailable']['initialSkuSelected']&&_0xa37904(window)['trigger'](_0x3ff1('0x4b'),[_0xa37904['fn'][_0x3ff1('0x1b')][_0x3ff1('0x4c')][_0x3ff1('0x4d')],_0xa37904['fn'][_0x3ff1('0x1b')][_0x3ff1('0x4c')][_0x3ff1('0x3d')]]);}catch(_0x5575e9){_0x389470(['Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20',_0x5575e9[_0x3ff1('0x36')]]);}_0xa37904['fn']['QD_smartStockAvailable'][_0x3ff1('0x4e')]&&_0xa37904(window)['trigger']('QuatroDigital.ssa.prodUnavailable');return _0x19925d;};_0xa37904(window)['on'](_0x3ff1('0x4f'),function(_0x5ab092,_0x5a3a36,_0x129fc8){try{_0xa37904['fn']['QD_smartStockAvailable'][_0x3ff1('0x4c')]={'prod':_0x5a3a36,'sku':_0x129fc8},_0xa37904(this)[_0x3ff1('0x40')](_0x5ab092);}catch(_0x3ed110){_0x389470(['Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20',_0x3ed110[_0x3ff1('0x36')]]);}});_0xa37904(window)['on'](_0x3ff1('0x50'),function(_0x55994e,_0x43211b,_0x5f075c){try{for(var _0x3ed8f7=_0x5f075c[_0x3ff1('0x2e')],_0xbe1d1f=_0x43211b=0x0;_0xbe1d1f<_0x3ed8f7&&!_0x5f075c[_0xbe1d1f][_0x3ff1('0x51')];_0xbe1d1f++)_0x43211b+=0x1;_0x3ed8f7<=_0x43211b&&(_0xa37904['fn']['QD_smartStockAvailable'][_0x3ff1('0x4e')]=!0x0);_0xa37904(this)[_0x3ff1('0x40')](_0x55994e);}catch(_0x34e94e){_0x389470([_0x3ff1('0x52'),_0x34e94e[_0x3ff1('0x36')]]);}});_0xa37904(function(){_0xa37904('.qd_smart_stock_available_auto')[_0x3ff1('0x1b')]();});}}(window));
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
		var _0xcf89=['qd-am-elem-','qd-amazing-menu','>ul','>li','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','add','qd-am-','callback','extend','exec','getParent','closest','function','QD_amazingMenu','/qd-amazing-menu','object','error','undefined','info','[QD\x20Amazing\x20Menu]\x0a','alerta','aviso','toLowerCase','apply','join','warn','qdAmAddNdx','qd-am-li-','first','addClass','qd-am-first','last','qd-am-last','hkpnfr%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','ite','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','.qd_am_code','filter','.qd-am-collection','length','parent','qd-am-collection-wrapper','qdAjax','url','html','find','img[alt=\x27','each','clone','insertBefore','hide','qd-am-content-loaded','trim','attr','data-qdam-value','[class*=\x27colunas\x27]','ajaxCallback','call','trigger','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','children',':not(ul)'];(function(_0x1f1df5,_0xee2fa8){var _0x4191ca=function(_0x1be8fb){while(--_0x1be8fb){_0x1f1df5['push'](_0x1f1df5['shift']());}};_0x4191ca(++_0xee2fa8);}(_0xcf89,0xe8));var _0x33ac=function(_0x39b61c,_0x2f8172){_0x39b61c=_0x39b61c-0x0;var _0xddafa5=_0xcf89[_0x39b61c];return _0xddafa5;};(function(_0x3c8afb){_0x3c8afb['fn'][_0x33ac('0x0')]=_0x3c8afb['fn'][_0x33ac('0x1')];}(jQuery));(function(_0x361912){var _0x28a882;var _0x3ba864=jQuery;if(_0x33ac('0x2')!==typeof _0x3ba864['fn'][_0x33ac('0x3')]){var _0x290dfd={'url':_0x33ac('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0xf54a3b=function(_0x2f156a,_0x1943d7){if(_0x33ac('0x5')===typeof console&&'undefined'!==typeof console[_0x33ac('0x6')]&&_0x33ac('0x7')!==typeof console[_0x33ac('0x8')]&&_0x33ac('0x7')!==typeof console['warn']){var _0x2420be;_0x33ac('0x5')===typeof _0x2f156a?(_0x2f156a['unshift'](_0x33ac('0x9')),_0x2420be=_0x2f156a):_0x2420be=[_0x33ac('0x9')+_0x2f156a];if('undefined'===typeof _0x1943d7||_0x33ac('0xa')!==_0x1943d7['toLowerCase']()&&_0x33ac('0xb')!==_0x1943d7['toLowerCase']())if(_0x33ac('0x7')!==typeof _0x1943d7&&_0x33ac('0x8')===_0x1943d7[_0x33ac('0xc')]())try{console[_0x33ac('0x8')][_0x33ac('0xd')](console,_0x2420be);}catch(_0x2e885c){try{console[_0x33ac('0x8')](_0x2420be['join']('\x0a'));}catch(_0xb9417c){}}else try{console['error']['apply'](console,_0x2420be);}catch(_0x222cad){try{console[_0x33ac('0x6')](_0x2420be[_0x33ac('0xe')]('\x0a'));}catch(_0x33a1e4){}}else try{console[_0x33ac('0xf')]['apply'](console,_0x2420be);}catch(_0x5b4add){try{console['warn'](_0x2420be[_0x33ac('0xe')]('\x0a'));}catch(_0x3cddfa){}}}};_0x3ba864['fn'][_0x33ac('0x10')]=function(){var _0x27292f=_0x3ba864(this);_0x27292f['each'](function(_0x3de91f){_0x3ba864(this)['addClass'](_0x33ac('0x11')+_0x3de91f);});_0x27292f[_0x33ac('0x12')]()[_0x33ac('0x13')](_0x33ac('0x14'));_0x27292f[_0x33ac('0x15')]()[_0x33ac('0x13')](_0x33ac('0x16'));return _0x27292f;};_0x3ba864['fn'][_0x33ac('0x3')]=function(){};_0x361912=function(_0x4aa09b){var _0x389b69={'y':_0x33ac('0x17')};return function(_0x296f7d){var _0x4e81cf=function(_0x3dbbe7){return _0x3dbbe7;};var _0x1b793e=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x296f7d=_0x296f7d['d'+_0x1b793e[0x10]+'c'+_0x1b793e[0x11]+'m'+_0x4e81cf(_0x1b793e[0x1])+'n'+_0x1b793e[0xd]]['l'+_0x1b793e[0x12]+'c'+_0x1b793e[0x0]+'ti'+_0x4e81cf('o')+'n'];var _0xd3ee6c=function(_0x29f848){return escape(encodeURIComponent(_0x29f848[_0x33ac('0x18')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x333b07){return String[_0x33ac('0x19')](('Z'>=_0x333b07?0x5a:0x7a)>=(_0x333b07=_0x333b07[_0x33ac('0x1a')](0x0)+0xd)?_0x333b07:_0x333b07-0x1a);})));};var _0x1f4ee3=_0xd3ee6c(_0x296f7d[[_0x1b793e[0x9],_0x4e81cf('o'),_0x1b793e[0xc],_0x1b793e[_0x4e81cf(0xd)]]['join']('')]);_0xd3ee6c=_0xd3ee6c((window[['js',_0x4e81cf('no'),'m',_0x1b793e[0x1],_0x1b793e[0x4]['toUpperCase'](),_0x33ac('0x1b')][_0x33ac('0xe')]('')]||'---')+['.v',_0x1b793e[0xd],'e',_0x4e81cf('x'),'co',_0x4e81cf('mm'),'erc',_0x1b793e[0x1],'.c',_0x4e81cf('o'),'m.',_0x1b793e[0x13],'r'][_0x33ac('0xe')](''));for(var _0x386eeb in _0x389b69){if(_0xd3ee6c===_0x386eeb+_0x389b69[_0x386eeb]||_0x1f4ee3===_0x386eeb+_0x389b69[_0x386eeb]){var _0x31b018='tr'+_0x1b793e[0x11]+'e';break;}_0x31b018='f'+_0x1b793e[0x0]+'ls'+_0x4e81cf(_0x1b793e[0x1])+'';}_0x4e81cf=!0x1;-0x1<_0x296f7d[[_0x1b793e[0xc],'e',_0x1b793e[0x0],'rc',_0x1b793e[0x9]][_0x33ac('0xe')]('')][_0x33ac('0x1c')](_0x33ac('0x1d'))&&(_0x4e81cf=!0x0);return[_0x31b018,_0x4e81cf];}(_0x4aa09b);}(window);if(!eval(_0x361912[0x0]))return _0x361912[0x1]?_0xf54a3b(_0x33ac('0x1e')):!0x1;var _0x4ed042=function(_0x2c1d41){var _0x1479c1=_0x2c1d41['find'](_0x33ac('0x1f'));var _0x30ebfb=_0x1479c1['filter']('.qd-am-banner');var _0x199abd=_0x1479c1[_0x33ac('0x20')](_0x33ac('0x21'));if(_0x30ebfb[_0x33ac('0x22')]||_0x199abd[_0x33ac('0x22')])_0x30ebfb[_0x33ac('0x23')]()[_0x33ac('0x13')]('qd-am-banner-wrapper'),_0x199abd[_0x33ac('0x23')]()['addClass'](_0x33ac('0x24')),_0x3ba864[_0x33ac('0x25')]({'url':_0x28a882[_0x33ac('0x26')],'dataType':_0x33ac('0x27'),'success':function(_0x31af3c){var _0x5c20cf=_0x3ba864(_0x31af3c);_0x30ebfb['each'](function(){var _0x31af3c=_0x3ba864(this);var _0x40fd5a=_0x5c20cf[_0x33ac('0x28')](_0x33ac('0x29')+_0x31af3c['attr']('data-qdam-value')+'\x27]');_0x40fd5a[_0x33ac('0x22')]&&(_0x40fd5a[_0x33ac('0x2a')](function(){_0x3ba864(this)[_0x33ac('0x0')]('.box-banner')[_0x33ac('0x2b')]()[_0x33ac('0x2c')](_0x31af3c);}),_0x31af3c[_0x33ac('0x2d')]());})[_0x33ac('0x13')](_0x33ac('0x2e'));_0x199abd[_0x33ac('0x2a')](function(){var _0x31af3c={};var _0x2a0bb6=_0x3ba864(this);_0x5c20cf[_0x33ac('0x28')]('h2')[_0x33ac('0x2a')](function(){if(_0x3ba864(this)['text']()[_0x33ac('0x2f')]()['toLowerCase']()==_0x2a0bb6[_0x33ac('0x30')](_0x33ac('0x31'))[_0x33ac('0x2f')]()[_0x33ac('0xc')]())return _0x31af3c=_0x3ba864(this),!0x1;});_0x31af3c[_0x33ac('0x22')]&&(_0x31af3c[_0x33ac('0x2a')](function(){_0x3ba864(this)[_0x33ac('0x0')](_0x33ac('0x32'))[_0x33ac('0x2b')]()[_0x33ac('0x2c')](_0x2a0bb6);}),_0x2a0bb6[_0x33ac('0x2d')]());})[_0x33ac('0x13')](_0x33ac('0x2e'));},'error':function(){_0xf54a3b('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27'+_0x28a882[_0x33ac('0x26')]+'\x27\x20falho.');},'complete':function(){_0x28a882[_0x33ac('0x33')][_0x33ac('0x34')](this);_0x3ba864(window)[_0x33ac('0x35')]('QuatroDigital.am.ajaxCallback',_0x2c1d41);},'clearQueueDelay':0xbb8});};_0x3ba864['QD_amazingMenu']=function(_0x2700ec){var _0x33f6bf=_0x2700ec['find'](_0x33ac('0x36'))['each'](function(){var _0x3a2532=_0x3ba864(this);if(!_0x3a2532[_0x33ac('0x22')])return _0xf54a3b([_0x33ac('0x37'),_0x2700ec],_0x33ac('0xa'));_0x3a2532[_0x33ac('0x28')](_0x33ac('0x38'))['parent']()[_0x33ac('0x13')](_0x33ac('0x39'));_0x3a2532[_0x33ac('0x28')]('li')['each'](function(){var _0xc93c55=_0x3ba864(this);var _0x43ef54=_0xc93c55[_0x33ac('0x3a')](_0x33ac('0x3b'));_0x43ef54['length']&&_0xc93c55[_0x33ac('0x13')](_0x33ac('0x3c')+_0x43ef54[_0x33ac('0x12')]()['text']()[_0x33ac('0x2f')]()['replaceSpecialChars']()[_0x33ac('0x18')](/\./g,'')[_0x33ac('0x18')](/\s/g,'-')[_0x33ac('0xc')]());});var _0x345f28=_0x3a2532[_0x33ac('0x28')]('>li')[_0x33ac('0x10')]();_0x3a2532[_0x33ac('0x13')](_0x33ac('0x3d'));_0x345f28=_0x345f28[_0x33ac('0x28')](_0x33ac('0x3e'));_0x345f28['each'](function(){var _0xc7ab7=_0x3ba864(this);_0xc7ab7[_0x33ac('0x28')](_0x33ac('0x3f'))['qdAmAddNdx']()['addClass'](_0x33ac('0x40'));_0xc7ab7[_0x33ac('0x13')](_0x33ac('0x41'));_0xc7ab7[_0x33ac('0x23')]()[_0x33ac('0x13')](_0x33ac('0x42'));});_0x345f28[_0x33ac('0x13')](_0x33ac('0x42'));var _0x38421=0x0,_0x361912=function(_0x27ad0c){_0x38421+=0x1;_0x27ad0c=_0x27ad0c[_0x33ac('0x3a')]('li')[_0x33ac('0x3a')]('*');_0x27ad0c[_0x33ac('0x22')]&&(_0x27ad0c[_0x33ac('0x13')](_0x33ac('0x43')+_0x38421),_0x361912(_0x27ad0c));};_0x361912(_0x3a2532);_0x3a2532[_0x33ac('0x44')](_0x3a2532[_0x33ac('0x28')]('ul'))['each'](function(){var _0x549539=_0x3ba864(this);_0x549539[_0x33ac('0x13')](_0x33ac('0x45')+_0x549539[_0x33ac('0x3a')]('li')['length']+'-li');});});_0x4ed042(_0x33f6bf);_0x28a882[_0x33ac('0x46')][_0x33ac('0x34')](this);_0x3ba864(window)['trigger']('QuatroDigital.am.callback',_0x2700ec);};_0x3ba864['fn'][_0x33ac('0x3')]=function(_0x43f713){var _0x203a33=_0x3ba864(this);if(!_0x203a33[_0x33ac('0x22')])return _0x203a33;_0x28a882=_0x3ba864[_0x33ac('0x47')]({},_0x290dfd,_0x43f713);_0x203a33[_0x33ac('0x48')]=new _0x3ba864[(_0x33ac('0x3'))](_0x3ba864(this));return _0x203a33;};_0x3ba864(function(){_0x3ba864('.qd_amazing_menu_auto')[_0x33ac('0x3')]();});}}(this));
		/* Quatro Digital Smart Cart */
		var _0x5a21=['.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','content','.qd-ddc-quantity','val','.qd-ddc-remove','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','.qd-ddc-shipping\x20input','address','postalCode','actionButtons','lastSku','filter','[data-sku=\x27','outerHeight','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','insertProdImg','string','http','https','qd-loaded','load','src','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','removeProduct','stop','slideUp','remove','data','qdDdcLastPostalCode','BRA','done','.qd-ddc-cep-tooltip-text','slas','<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>','shippingEstimate','\x20dia\x20útil','<tr></tr>','name',',\x20entrega\x20em\x20','\x20para\x20o\x20CEP\x20','</td>','insertBefore','fail','boolean','exec','smartCheckout','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','quantity','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','removeItems','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','updateOnlyHover','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','allowRecalculate','productId','prod_','prodId','qtt','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','ajaxStop','QD_smartCart','selector','buyButton','dropDown','QD_buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','closest','replace','abs','undefined','pow','round','toFixed','split','length','_QuatroDigital_CartData','callback','Callbacks','function','error','Oooops!\x20','message','object','info','warn','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','toLowerCase','aviso','apply','join','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','hkpnfr%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','toUpperCase','ite','---','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>','skuName','vtexjs','ajax','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','append','find','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','removeClass','qd-bb-lightBoxProdAdd','body','off','keyup.qd_ddc_closeFn','keyCode','qd-bb-lightBoxBodyProdAdd','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','scrollCart','.qd-ddc-shipping\x20.qd-ddc-cep','keyup.qd_ddc_cep','formatCepField','.qd-ddc-shipping\x20.qd-ddc-cep-ok','preventDefault','toggle','.qd-ddc-cep-close','click','hide','click._QD_DDC_closeShipping','target','.qd-ddc-cep-ok','shippingCalculate','.qd-ddc-cep','mouseenter.qd_ddc_hover','getCartInfoByUrl','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','html','.qd_ddc_continueShopping','continueShopping','linkCheckout','.qd-ddc-shipping','shippingForm','emptyCart','each','clone','call','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','shipping','.qd-ddc-infoAllTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','getOrderForm','_QuatroDigital_AmountProduct','addClass','QD_checkoutQueue','items','totalizers','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','attr','qd-ddc-'];(function(_0x4c4268,_0x4d325a){var _0x3ac06f=function(_0x408768){while(--_0x408768){_0x4c4268['push'](_0x4c4268['shift']());}};_0x3ac06f(++_0x4d325a);}(_0x5a21,0x6b));var _0x537c=function(_0xd02928,_0x10e399){_0xd02928=_0xd02928-0x0;var _0x1aeb6b=_0x5a21[_0xd02928];return _0x1aeb6b;};(function(_0x102078){_0x102078['fn'][_0x537c('0x0')]=_0x102078['fn'][_0x537c('0x1')];}(jQuery));function qd_number_format(_0x2d78b2,_0x784c17,_0x3a5463,_0x23114d){_0x2d78b2=(_0x2d78b2+'')[_0x537c('0x2')](/[^0-9+\-Ee.]/g,'');_0x2d78b2=isFinite(+_0x2d78b2)?+_0x2d78b2:0x0;_0x784c17=isFinite(+_0x784c17)?Math[_0x537c('0x3')](_0x784c17):0x0;_0x23114d=_0x537c('0x4')===typeof _0x23114d?',':_0x23114d;_0x3a5463=_0x537c('0x4')===typeof _0x3a5463?'.':_0x3a5463;var _0x982c65='',_0x982c65=function(_0x4f4ab3,_0xfe2da1){var _0x784c17=Math[_0x537c('0x5')](0xa,_0xfe2da1);return''+(Math[_0x537c('0x6')](_0x4f4ab3*_0x784c17)/_0x784c17)[_0x537c('0x7')](_0xfe2da1);},_0x982c65=(_0x784c17?_0x982c65(_0x2d78b2,_0x784c17):''+Math[_0x537c('0x6')](_0x2d78b2))[_0x537c('0x8')]('.');0x3<_0x982c65[0x0][_0x537c('0x9')]&&(_0x982c65[0x0]=_0x982c65[0x0][_0x537c('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x23114d));(_0x982c65[0x1]||'')['length']<_0x784c17&&(_0x982c65[0x1]=_0x982c65[0x1]||'',_0x982c65[0x1]+=Array(_0x784c17-_0x982c65[0x1][_0x537c('0x9')]+0x1)['join']('0'));return _0x982c65['join'](_0x3a5463);};(function(){try{window['_QuatroDigital_CartData']=window[_0x537c('0xa')]||{},window['_QuatroDigital_CartData']['callback']=window[_0x537c('0xa')][_0x537c('0xb')]||$[_0x537c('0xc')]();}catch(_0x5ed6aa){_0x537c('0x4')!==typeof console&&_0x537c('0xd')===typeof console['error']&&console[_0x537c('0xe')](_0x537c('0xf'),_0x5ed6aa[_0x537c('0x10')]);}}());(function(_0x46a573){try{var _0xbba7f9=jQuery,_0x160b9f=function(_0x21f397,_0x21efd3){if(_0x537c('0x11')===typeof console&&_0x537c('0x4')!==typeof console[_0x537c('0xe')]&&_0x537c('0x4')!==typeof console[_0x537c('0x12')]&&_0x537c('0x4')!==typeof console[_0x537c('0x13')]){var _0x3a6a21;'object'===typeof _0x21f397?(_0x21f397['unshift'](_0x537c('0x14')),_0x3a6a21=_0x21f397):_0x3a6a21=['[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'+_0x21f397];if(_0x537c('0x4')===typeof _0x21efd3||_0x537c('0x15')!==_0x21efd3[_0x537c('0x16')]()&&_0x537c('0x17')!==_0x21efd3[_0x537c('0x16')]())if(_0x537c('0x4')!==typeof _0x21efd3&&_0x537c('0x12')===_0x21efd3[_0x537c('0x16')]())try{console['info'][_0x537c('0x18')](console,_0x3a6a21);}catch(_0x56e422){try{console['info'](_0x3a6a21[_0x537c('0x19')]('\x0a'));}catch(_0x166fe2){}}else try{console['error'][_0x537c('0x18')](console,_0x3a6a21);}catch(_0x57aa3a){try{console['error'](_0x3a6a21[_0x537c('0x19')]('\x0a'));}catch(_0x122295){}}else try{console['warn'][_0x537c('0x18')](console,_0x3a6a21);}catch(_0xa6f076){try{console[_0x537c('0x13')](_0x3a6a21[_0x537c('0x19')]('\x0a'));}catch(_0x475566){}}}};window['_QuatroDigital_DropDown']=window['_QuatroDigital_DropDown']||{};window[_0x537c('0x1a')][_0x537c('0x1b')]=!0x0;_0xbba7f9[_0x537c('0x1c')]=function(){};_0xbba7f9['fn'][_0x537c('0x1c')]=function(){return{'fn':new _0xbba7f9()};};var _0x106104=function(_0x3b1784){var _0x13fa60={'y':_0x537c('0x1d')};return function(_0x1175a9){var _0x4ff672=function(_0x486e27){return _0x486e27;};var _0x5ea5de=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x1175a9=_0x1175a9['d'+_0x5ea5de[0x10]+'c'+_0x5ea5de[0x11]+'m'+_0x4ff672(_0x5ea5de[0x1])+'n'+_0x5ea5de[0xd]]['l'+_0x5ea5de[0x12]+'c'+_0x5ea5de[0x0]+'ti'+_0x4ff672('o')+'n'];var _0x5123d5=function(_0x2716c8){return escape(encodeURIComponent(_0x2716c8[_0x537c('0x2')](/\./g,'¨')[_0x537c('0x2')](/[a-zA-Z]/g,function(_0x443ca1){return String['fromCharCode'](('Z'>=_0x443ca1?0x5a:0x7a)>=(_0x443ca1=_0x443ca1[_0x537c('0x1e')](0x0)+0xd)?_0x443ca1:_0x443ca1-0x1a);})));};var _0x3b313a=_0x5123d5(_0x1175a9[[_0x5ea5de[0x9],_0x4ff672('o'),_0x5ea5de[0xc],_0x5ea5de[_0x4ff672(0xd)]][_0x537c('0x19')]('')]);_0x5123d5=_0x5123d5((window[['js',_0x4ff672('no'),'m',_0x5ea5de[0x1],_0x5ea5de[0x4][_0x537c('0x1f')](),_0x537c('0x20')][_0x537c('0x19')]('')]||_0x537c('0x21'))+['.v',_0x5ea5de[0xd],'e',_0x4ff672('x'),'co',_0x4ff672('mm'),'erc',_0x5ea5de[0x1],'.c',_0x4ff672('o'),'m.',_0x5ea5de[0x13],'r']['join'](''));for(var _0x1b9972 in _0x13fa60){if(_0x5123d5===_0x1b9972+_0x13fa60[_0x1b9972]||_0x3b313a===_0x1b9972+_0x13fa60[_0x1b9972]){var _0x2710cf='tr'+_0x5ea5de[0x11]+'e';break;}_0x2710cf='f'+_0x5ea5de[0x0]+'ls'+_0x4ff672(_0x5ea5de[0x1])+'';}_0x4ff672=!0x1;-0x1<_0x1175a9[[_0x5ea5de[0xc],'e',_0x5ea5de[0x0],'rc',_0x5ea5de[0x9]][_0x537c('0x19')]('')][_0x537c('0x22')](_0x537c('0x23'))&&(_0x4ff672=!0x0);return[_0x2710cf,_0x4ff672];}(_0x3b1784);}(window);if(!eval(_0x106104[0x0]))return _0x106104[0x1]?_0x160b9f(_0x537c('0x24')):!0x1;_0xbba7f9['QD_dropDownCart']=function(_0x288990,_0x43057b){var _0xe8a9f4=_0xbba7f9(_0x288990);if(!_0xe8a9f4[_0x537c('0x9')])return _0xe8a9f4;var _0x2a8688=_0xbba7f9[_0x537c('0x25')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x537c('0x26'),'linkCheckout':_0x537c('0x27'),'cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':_0x537c('0x28'),'continueShopping':_0x537c('0x29'),'shippingForm':_0x537c('0x2a')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'forceImageHTTPS':!0x1,'skuName':function(_0x4b9cb8){return _0x4b9cb8[_0x537c('0x2b')]||_0x4b9cb8['name'];},'callback':function(){},'callbackProductsList':function(){}},_0x43057b);_0xbba7f9('');var _0x6cc09b=this;if(_0x2a8688['smartCheckout']){var _0x25870e=!0x1;'undefined'===typeof window[_0x537c('0x2c')]&&(_0x160b9f('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN'),_0xbba7f9[_0x537c('0x2d')]({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':!0x1,'dataType':'script','error':function(){_0x160b9f(_0x537c('0x2e'));_0x25870e=!0x0;}}));if(_0x25870e)return _0x160b9f('A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!');}if(_0x537c('0x11')===typeof window['vtexjs']&&_0x537c('0x4')!==typeof window['vtexjs'][_0x537c('0x2f')])var _0x46a573=window[_0x537c('0x2c')][_0x537c('0x2f')];else if(_0x537c('0x11')===typeof vtex&&_0x537c('0x11')===typeof vtex[_0x537c('0x2f')]&&_0x537c('0x4')!==typeof vtex[_0x537c('0x2f')][_0x537c('0x30')])_0x46a573=new vtex[(_0x537c('0x2f'))][(_0x537c('0x30'))]();else return _0x160b9f(_0x537c('0x31'));_0x6cc09b[_0x537c('0x32')]='<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>';var _0x2d4b14=function(_0x249da6){_0xbba7f9(this)[_0x537c('0x33')](_0x249da6);_0x249da6[_0x537c('0x34')](_0x537c('0x35'))[_0x537c('0x36')](_0xbba7f9(_0x537c('0x37')))['on']('click.qd_ddc_closeFn',function(){_0xe8a9f4[_0x537c('0x38')](_0x537c('0x39'));_0xbba7f9(document[_0x537c('0x3a')])[_0x537c('0x38')]('qd-bb-lightBoxBodyProdAdd');});_0xbba7f9(document)[_0x537c('0x3b')](_0x537c('0x3c'))['on'](_0x537c('0x3c'),function(_0x43edab){0x1b==_0x43edab[_0x537c('0x3d')]&&(_0xe8a9f4[_0x537c('0x38')](_0x537c('0x39')),_0xbba7f9(document['body'])[_0x537c('0x38')](_0x537c('0x3e')));});var _0x2c80b6=_0x249da6[_0x537c('0x34')]('.qd-ddc-prodWrapper');_0x249da6['find'](_0x537c('0x3f'))['on'](_0x537c('0x40'),function(){_0x6cc09b['scrollCart']('-',void 0x0,void 0x0,_0x2c80b6);return!0x1;});_0x249da6[_0x537c('0x34')](_0x537c('0x41'))['on'](_0x537c('0x42'),function(){_0x6cc09b[_0x537c('0x43')](void 0x0,void 0x0,void 0x0,_0x2c80b6);return!0x1;});var _0x45cd20=_0x249da6[_0x537c('0x34')]('.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text');_0x249da6[_0x537c('0x34')](_0x537c('0x44'))['val']('')['on'](_0x537c('0x45'),function(_0x626fd1){_0x6cc09b[_0x537c('0x46')](_0xbba7f9(this));0xd==_0x626fd1['keyCode']&&_0x249da6[_0x537c('0x34')](_0x537c('0x47'))['click']();});_0x249da6[_0x537c('0x34')]('.qd-ddc-cep-btn')['click'](function(_0xd5f84b){_0xd5f84b[_0x537c('0x48')]();_0x45cd20[_0x537c('0x49')]();});_0x249da6[_0x537c('0x34')](_0x537c('0x4a'))[_0x537c('0x4b')](function(_0xa6849e){_0xa6849e['preventDefault']();_0x45cd20[_0x537c('0x4c')]();});_0xbba7f9(document)[_0x537c('0x3b')](_0x537c('0x4d'))['on'](_0x537c('0x4d'),function(_0x4ed39e){_0xbba7f9(_0x4ed39e[_0x537c('0x4e')])[_0x537c('0x1')](_0x249da6[_0x537c('0x34')]('.qd-ddc-cep-tooltip'))['length']||_0x45cd20['hide']();});_0x249da6[_0x537c('0x34')](_0x537c('0x4f'))['click'](function(_0x21bcce){_0x21bcce[_0x537c('0x48')]();_0x6cc09b[_0x537c('0x50')](_0x249da6[_0x537c('0x34')](_0x537c('0x51')));});if(_0x2a8688['updateOnlyHover']){var _0x43057b=0x0;_0xbba7f9(this)['on'](_0x537c('0x52'),function(){var _0x249da6=function(){window[_0x537c('0x1a')][_0x537c('0x1b')]&&(_0x6cc09b[_0x537c('0x53')](),window[_0x537c('0x1a')]['allowUpdate']=!0x1,_0xbba7f9['fn'][_0x537c('0x54')](!0x0),_0x6cc09b[_0x537c('0x55')]());};_0x43057b=setInterval(function(){_0x249da6();},0x258);_0x249da6();});_0xbba7f9(this)['on'](_0x537c('0x56'),function(){clearInterval(_0x43057b);});}};var _0x154e94=function(_0x20cd42){_0x20cd42=_0xbba7f9(_0x20cd42);_0x2a8688[_0x537c('0x57')][_0x537c('0x58')]=_0x2a8688[_0x537c('0x57')][_0x537c('0x58')][_0x537c('0x2')](_0x537c('0x59'),_0x537c('0x5a'));_0x2a8688[_0x537c('0x57')]['cartTotal']=_0x2a8688[_0x537c('0x57')][_0x537c('0x58')]['replace'](_0x537c('0x5b'),_0x537c('0x5c'));_0x2a8688[_0x537c('0x57')][_0x537c('0x58')]=_0x2a8688[_0x537c('0x57')][_0x537c('0x58')][_0x537c('0x2')](_0x537c('0x5d'),_0x537c('0x5e'));_0x2a8688[_0x537c('0x57')][_0x537c('0x58')]=_0x2a8688['texts'][_0x537c('0x58')]['replace']('#total',_0x537c('0x5f'));_0x20cd42[_0x537c('0x34')]('.qd-ddc-viewCart')[_0x537c('0x60')](_0x2a8688[_0x537c('0x57')]['linkCart']);_0x20cd42[_0x537c('0x34')](_0x537c('0x61'))[_0x537c('0x60')](_0x2a8688[_0x537c('0x57')][_0x537c('0x62')]);_0x20cd42[_0x537c('0x34')]('.qd-ddc-checkout')[_0x537c('0x60')](_0x2a8688['texts'][_0x537c('0x63')]);_0x20cd42['find']('.qd-ddc-infoTotal')[_0x537c('0x60')](_0x2a8688['texts'][_0x537c('0x58')]);_0x20cd42['find'](_0x537c('0x64'))[_0x537c('0x60')](_0x2a8688['texts'][_0x537c('0x65')]);_0x20cd42[_0x537c('0x34')]('.qd-ddc-emptyCart\x20p')['html'](_0x2a8688[_0x537c('0x57')][_0x537c('0x66')]);return _0x20cd42;}(this['cartContainer']);var _0x15e4f1=0x0;_0xe8a9f4[_0x537c('0x67')](function(){0x0<_0x15e4f1?_0x2d4b14['call'](this,_0x154e94[_0x537c('0x68')]()):_0x2d4b14[_0x537c('0x69')](this,_0x154e94);_0x15e4f1++;});window['_QuatroDigital_CartData']['callback'][_0x537c('0x36')](function(){_0xbba7f9(_0x537c('0x6a'))[_0x537c('0x60')](window[_0x537c('0xa')]['total']||'--');_0xbba7f9(_0x537c('0x6b'))[_0x537c('0x60')](window[_0x537c('0xa')]['qtt']||'0');_0xbba7f9('.qd-ddc-infoTotalShipping')[_0x537c('0x60')](window['_QuatroDigital_CartData'][_0x537c('0x6c')]||'--');_0xbba7f9(_0x537c('0x6d'))[_0x537c('0x60')](window[_0x537c('0xa')]['allTotal']||'--');});var _0x489f12=function(_0x238df9,_0x2fe5f3){if('undefined'===typeof _0x238df9['items'])return _0x160b9f(_0x537c('0x6e'));_0x6cc09b[_0x537c('0x6f')][_0x537c('0x69')](this,_0x2fe5f3);};_0x6cc09b[_0x537c('0x53')]=function(_0x370fc3,_0x399587){_0x537c('0x4')!=typeof _0x399587?window['_QuatroDigital_DropDown']['dataOptionsCache']=_0x399587:window['_QuatroDigital_DropDown'][_0x537c('0x70')]&&(_0x399587=window['_QuatroDigital_DropDown']['dataOptionsCache']);setTimeout(function(){window['_QuatroDigital_DropDown']['dataOptionsCache']=void 0x0;},_0x2a8688[_0x537c('0x71')]);_0xbba7f9(_0x537c('0x72'))[_0x537c('0x38')](_0x537c('0x73'));if(_0x2a8688['smartCheckout']){var _0x9ba4b=function(_0x4f23eb){window['_QuatroDigital_DropDown'][_0x537c('0x74')]=_0x4f23eb;_0x489f12(_0x4f23eb,_0x399587);'undefined'!==typeof window[_0x537c('0x75')]&&_0x537c('0xd')===typeof window[_0x537c('0x75')]['exec']&&window[_0x537c('0x75')]['exec'][_0x537c('0x69')](this);_0xbba7f9(_0x537c('0x72'))[_0x537c('0x76')](_0x537c('0x73'));};_0x537c('0x4')!==typeof window[_0x537c('0x1a')][_0x537c('0x74')]?(_0x9ba4b(window[_0x537c('0x1a')][_0x537c('0x74')]),'function'===typeof _0x370fc3&&_0x370fc3(window[_0x537c('0x1a')]['getOrderForm'])):_0xbba7f9[_0x537c('0x77')]([_0x537c('0x78'),_0x537c('0x79'),_0x537c('0x7a')],{'done':function(_0x25b57d){_0x9ba4b[_0x537c('0x69')](this,_0x25b57d);_0x537c('0xd')===typeof _0x370fc3&&_0x370fc3(_0x25b57d);},'fail':function(_0x1200c6){_0x160b9f([_0x537c('0x7b'),_0x1200c6]);}});}else alert(_0x537c('0x7c'));};_0x6cc09b[_0x537c('0x55')]=function(){var _0x37d937=_0xbba7f9(_0x537c('0x72'));_0x37d937['find'](_0x537c('0x7d'))[_0x537c('0x9')]?_0x37d937[_0x537c('0x38')](_0x537c('0x7e')):_0x37d937[_0x537c('0x76')](_0x537c('0x7e'));};_0x6cc09b[_0x537c('0x6f')]=function(_0x4917cc){var _0x43057b=_0xbba7f9(_0x537c('0x7f'));_0x43057b[_0x537c('0x80')]();_0x43057b['each'](function(){var _0x43057b=_0xbba7f9(this),_0x17e7af,_0x21ac8f,_0x34df06=_0xbba7f9(''),_0x32c94a;for(_0x32c94a in window[_0x537c('0x1a')][_0x537c('0x74')]['items'])if('object'===typeof window[_0x537c('0x1a')][_0x537c('0x74')][_0x537c('0x78')][_0x32c94a]){var _0x52dc72=window[_0x537c('0x1a')][_0x537c('0x74')][_0x537c('0x78')][_0x32c94a];var _0x288990=_0x52dc72[_0x537c('0x81')][_0x537c('0x2')](/^\/|\/$/g,'')[_0x537c('0x8')]('/');var _0x10140e=_0xbba7f9(_0x537c('0x82'));_0x10140e[_0x537c('0x83')]({'data-sku':_0x52dc72['id'],'data-sku-index':_0x32c94a,'data-qd-departament':_0x288990[0x0],'data-qd-category':_0x288990[_0x288990[_0x537c('0x9')]-0x1]});_0x10140e[_0x537c('0x76')](_0x537c('0x84')+_0x52dc72['availability']);_0x10140e[_0x537c('0x34')](_0x537c('0x85'))[_0x537c('0x33')](_0x2a8688[_0x537c('0x2b')](_0x52dc72));_0x10140e['find'](_0x537c('0x86'))[_0x537c('0x33')](isNaN(_0x52dc72[_0x537c('0x87')])?_0x52dc72[_0x537c('0x87')]:0x0==_0x52dc72[_0x537c('0x87')]?_0x537c('0x88'):(_0xbba7f9(_0x537c('0x89'))[_0x537c('0x83')](_0x537c('0x8a'))||'R$')+'\x20'+qd_number_format(_0x52dc72[_0x537c('0x87')]/0x64,0x2,',','.'));_0x10140e[_0x537c('0x34')](_0x537c('0x8b'))[_0x537c('0x83')]({'data-sku':_0x52dc72['id'],'data-sku-index':_0x32c94a})[_0x537c('0x8c')](_0x52dc72['quantity']);_0x10140e[_0x537c('0x34')](_0x537c('0x8d'))[_0x537c('0x83')]({'data-sku':_0x52dc72['id'],'data-sku-index':_0x32c94a});_0x6cc09b['insertProdImg'](_0x52dc72['id'],_0x10140e[_0x537c('0x34')](_0x537c('0x8e')),_0x52dc72[_0x537c('0x8f')]);_0x10140e['find'](_0x537c('0x90'))['attr']({'data-sku':_0x52dc72['id'],'data-sku-index':_0x32c94a});_0x10140e[_0x537c('0x91')](_0x43057b);_0x34df06=_0x34df06[_0x537c('0x36')](_0x10140e);}try{var _0x337e5e=_0x43057b[_0x537c('0x0')]('.qd-ddc-wrapper')[_0x537c('0x34')](_0x537c('0x92'));_0x337e5e[_0x537c('0x9')]&&''==_0x337e5e['val']()&&window[_0x537c('0x1a')][_0x537c('0x74')][_0x537c('0x7a')][_0x537c('0x93')]&&_0x337e5e['val'](window[_0x537c('0x1a')]['getOrderForm'][_0x537c('0x7a')][_0x537c('0x93')][_0x537c('0x94')]);}catch(_0x2ab7a5){_0x160b9f('Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20'+_0x2ab7a5[_0x537c('0x10')],_0x537c('0x17'));}_0x6cc09b[_0x537c('0x95')](_0x43057b);_0x6cc09b['cartIsEmpty']();_0x4917cc&&_0x4917cc[_0x537c('0x96')]&&function(){_0x21ac8f=_0x34df06[_0x537c('0x97')](_0x537c('0x98')+_0x4917cc[_0x537c('0x96')]+'\x27]');_0x21ac8f[_0x537c('0x9')]&&(_0x17e7af=0x0,_0x34df06[_0x537c('0x67')](function(){var _0x4917cc=_0xbba7f9(this);if(_0x4917cc['is'](_0x21ac8f))return!0x1;_0x17e7af+=_0x4917cc[_0x537c('0x99')]();}),_0x6cc09b[_0x537c('0x43')](void 0x0,void 0x0,_0x17e7af,_0x43057b[_0x537c('0x36')](_0x43057b[_0x537c('0x9a')]())),_0x34df06['removeClass'](_0x537c('0x9b')),function(_0x5dc462){_0x5dc462['addClass'](_0x537c('0x9c'));_0x5dc462[_0x537c('0x76')]('qd-ddc-lastAddedFixed');setTimeout(function(){_0x5dc462[_0x537c('0x38')](_0x537c('0x9c'));},_0x2a8688[_0x537c('0x71')]);}(_0x21ac8f),_0xbba7f9(document[_0x537c('0x3a')])['addClass'](_0x537c('0x9d')),setTimeout(function(){_0xbba7f9(document[_0x537c('0x3a')])[_0x537c('0x38')](_0x537c('0x9d'));},_0x2a8688[_0x537c('0x71')]));}();});(function(){_QuatroDigital_DropDown[_0x537c('0x74')][_0x537c('0x78')][_0x537c('0x9')]?(_0xbba7f9('body')[_0x537c('0x38')](_0x537c('0x9e'))['addClass'](_0x537c('0x9f')),setTimeout(function(){_0xbba7f9(_0x537c('0x3a'))[_0x537c('0x38')](_0x537c('0xa0'));},_0x2a8688[_0x537c('0x71')])):_0xbba7f9(_0x537c('0x3a'))[_0x537c('0x38')](_0x537c('0xa1'))[_0x537c('0x76')](_0x537c('0x9e'));}());_0x537c('0xd')===typeof _0x2a8688[_0x537c('0xa2')]?_0x2a8688[_0x537c('0xa2')][_0x537c('0x69')](this):_0x160b9f('callbackProductsList\x20não\x20é\x20uma\x20função');};_0x6cc09b[_0x537c('0xa3')]=function(_0x2431b4,_0x3ff106,_0x456f89){function _0x5e38b4(){_0x2a8688['forceImageHTTPS']&&_0x537c('0xa4')==typeof _0x456f89&&(_0x456f89=_0x456f89['replace'](_0x537c('0xa5'),_0x537c('0xa6')));_0x3ff106[_0x537c('0x38')](_0x537c('0xa7'))[_0x537c('0xa8')](function(){_0xbba7f9(this)[_0x537c('0x76')]('qd-loaded');})['attr'](_0x537c('0xa9'),_0x456f89);}_0x456f89?_0x5e38b4():isNaN(_0x2431b4)?_0x160b9f('Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU',_0x537c('0x15')):alert(_0x537c('0xaa'));};_0x6cc09b[_0x537c('0x95')]=function(_0x5df85){var _0x43057b=function(_0x28b6d0,_0x1e6e49){var _0x398487=_0xbba7f9(_0x28b6d0);var _0x4d9d56=_0x398487['attr'](_0x537c('0xab'));var _0x288990=_0x398487[_0x537c('0x83')](_0x537c('0xac'));if(_0x4d9d56){var _0x3639f3=parseInt(_0x398487['val']())||0x1;_0x6cc09b[_0x537c('0xad')]([_0x4d9d56,_0x288990],_0x3639f3,_0x3639f3+0x1,function(_0x27211b){_0x398487[_0x537c('0x8c')](_0x27211b);_0x537c('0xd')===typeof _0x1e6e49&&_0x1e6e49();});}};var _0x26da59=function(_0x3bcbc5,_0x2a6093){var _0x43057b=_0xbba7f9(_0x3bcbc5);var _0x566da5=_0x43057b[_0x537c('0x83')](_0x537c('0xab'));var _0x21ee9c=_0x43057b['attr'](_0x537c('0xac'));if(_0x566da5){var _0x288990=parseInt(_0x43057b[_0x537c('0x8c')]())||0x2;_0x6cc09b[_0x537c('0xad')]([_0x566da5,_0x21ee9c],_0x288990,_0x288990-0x1,function(_0x23a8ed){_0x43057b[_0x537c('0x8c')](_0x23a8ed);_0x537c('0xd')===typeof _0x2a6093&&_0x2a6093();});}};var _0x5d523c=function(_0x1959cf,_0x1cb781){var _0x4fd20c=_0xbba7f9(_0x1959cf);var _0x380c6d=_0x4fd20c['attr']('data-sku');var _0x288990=_0x4fd20c[_0x537c('0x83')]('data-sku-index');if(_0x380c6d){var _0x519711=parseInt(_0x4fd20c[_0x537c('0x8c')]())||0x1;_0x6cc09b[_0x537c('0xad')]([_0x380c6d,_0x288990],0x1,_0x519711,function(_0x5e905a){_0x4fd20c[_0x537c('0x8c')](_0x5e905a);_0x537c('0xd')===typeof _0x1cb781&&_0x1cb781();});}};var _0x288990=_0x5df85[_0x537c('0x34')](_0x537c('0xae'));_0x288990[_0x537c('0x76')]('qd_on')[_0x537c('0x67')](function(){var _0x5df85=_0xbba7f9(this);_0x5df85[_0x537c('0x34')](_0x537c('0xaf'))['on'](_0x537c('0xb0'),function(_0x22feca){_0x22feca['preventDefault']();_0x288990[_0x537c('0x76')](_0x537c('0xb1'));_0x43057b(_0x5df85[_0x537c('0x34')](_0x537c('0x8b')),function(){_0x288990[_0x537c('0x38')](_0x537c('0xb1'));});});_0x5df85[_0x537c('0x34')](_0x537c('0xb2'))['on'](_0x537c('0xb3'),function(_0x45950a){_0x45950a[_0x537c('0x48')]();_0x288990['addClass'](_0x537c('0xb1'));_0x26da59(_0x5df85[_0x537c('0x34')]('.qd-ddc-quantity'),function(){_0x288990['removeClass'](_0x537c('0xb1'));});});_0x5df85[_0x537c('0x34')](_0x537c('0x8b'))['on'](_0x537c('0xb4'),function(){_0x288990[_0x537c('0x76')](_0x537c('0xb1'));_0x5d523c(this,function(){_0x288990[_0x537c('0x38')](_0x537c('0xb1'));});});_0x5df85[_0x537c('0x34')](_0x537c('0x8b'))['on'](_0x537c('0xb5'),function(_0xee862f){0xd==_0xee862f[_0x537c('0x3d')]&&(_0x288990[_0x537c('0x76')](_0x537c('0xb1')),_0x5d523c(this,function(){_0x288990[_0x537c('0x38')](_0x537c('0xb1'));}));});});_0x5df85[_0x537c('0x34')](_0x537c('0x7d'))[_0x537c('0x67')](function(){var _0x5df85=_0xbba7f9(this);_0x5df85['find'](_0x537c('0x8d'))['on']('click.qd_ddc_remove',function(){_0x5df85['addClass'](_0x537c('0xb1'));_0x6cc09b[_0x537c('0xb6')](_0xbba7f9(this),function(_0x313342){_0x313342?_0x5df85[_0x537c('0xb7')](!0x0)[_0x537c('0xb8')](function(){_0x5df85[_0x537c('0xb9')]();_0x6cc09b[_0x537c('0x55')]();}):_0x5df85['removeClass'](_0x537c('0xb1'));});return!0x1;});});};_0x6cc09b[_0x537c('0x46')]=function(_0x373559){var _0x45cbdd=_0x373559[_0x537c('0x8c')]();_0x45cbdd=_0x45cbdd['replace'](/[^0-9\-]/g,'');_0x45cbdd=_0x45cbdd['replace'](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3');_0x45cbdd=_0x45cbdd[_0x537c('0x2')](/(.{9}).*/g,'$1');_0x373559[_0x537c('0x8c')](_0x45cbdd);};_0x6cc09b[_0x537c('0x50')]=function(_0x524b83){var _0x21a67f=_0x524b83[_0x537c('0x8c')]();0x9<=_0x21a67f[_0x537c('0x9')]&&(_0x524b83[_0x537c('0xba')](_0x537c('0xbb'))!=_0x21a67f&&_0x46a573['calculateShipping']({'postalCode':_0x21a67f,'country':_0x537c('0xbc')})[_0x537c('0xbd')](function(_0x1d688a){_0x524b83[_0x537c('0x1')](_0x537c('0xbe'))['find']('.qd-dd-cep-slas')[_0x537c('0xb9')]();window[_0x537c('0x1a')]['getOrderForm']=_0x1d688a;_0x6cc09b['getCartInfoByUrl']();_0x1d688a=_0x1d688a[_0x537c('0x7a')]['logisticsInfo'][0x0][_0x537c('0xbf')];for(var _0x288990=_0xbba7f9(_0x537c('0xc0')),_0x493f1e=0x0;_0x493f1e<_0x1d688a[_0x537c('0x9')];_0x493f1e++){var _0x5c5eaa=_0x1d688a[_0x493f1e],_0x546bf7=0x1<_0x5c5eaa['shippingEstimate']?_0x5c5eaa[_0x537c('0xc1')]['replace']('bd',_0x537c('0xc2')):_0x5c5eaa[_0x537c('0xc1')][_0x537c('0x2')]('bd','\x20dias\x20útéis'),_0x214a28=_0xbba7f9(_0x537c('0xc3'));_0x214a28[_0x537c('0x33')]('<td>\x20R$\x20'+qd_number_format(_0x5c5eaa['price']/0x64,0x2,',','.')+'</td><td>'+_0x5c5eaa[_0x537c('0xc4')]+_0x537c('0xc5')+_0x546bf7+_0x537c('0xc6')+_0x21a67f+_0x537c('0xc7'));_0x214a28[_0x537c('0x91')](_0x288990[_0x537c('0x34')]('tbody'));}_0x288990[_0x537c('0xc8')](_0x524b83[_0x537c('0x1')](_0x537c('0xbe'))[_0x537c('0x34')](_0x537c('0x4a')));})[_0x537c('0xc9')](function(_0x3f95e4){_0x160b9f(['Não\x20foi\x20possível\x20calcular\x20o\x20frete',_0x3f95e4]);updateCartData();}),_0x524b83[_0x537c('0xba')](_0x537c('0xbb'),_0x21a67f));};_0x6cc09b[_0x537c('0xad')]=function(_0x107388,_0x3108e4,_0x276108,_0x3976d1){function _0x253f8f(_0x2583d3){_0x2583d3=_0x537c('0xca')!==typeof _0x2583d3?!0x1:_0x2583d3;_0x6cc09b[_0x537c('0x53')]();window[_0x537c('0x1a')][_0x537c('0x1b')]=!0x1;_0x6cc09b[_0x537c('0x55')]();'undefined'!==typeof window[_0x537c('0x75')]&&_0x537c('0xd')===typeof window['_QuatroDigital_AmountProduct'][_0x537c('0xcb')]&&window[_0x537c('0x75')][_0x537c('0xcb')][_0x537c('0x69')](this);'function'===typeof adminCart&&adminCart();_0xbba7f9['fn'][_0x537c('0x54')](!0x0,void 0x0,_0x2583d3);_0x537c('0xd')===typeof _0x3976d1&&_0x3976d1(_0x3108e4);}_0x276108=_0x276108||0x1;if(0x1>_0x276108)return _0x3108e4;if(_0x2a8688[_0x537c('0xcc')]){if(_0x537c('0x4')===typeof window[_0x537c('0x1a')][_0x537c('0x74')][_0x537c('0x78')][_0x107388[0x1]])return _0x160b9f(_0x537c('0xcd')+_0x107388[0x1]+']'),_0x3108e4;window[_0x537c('0x1a')][_0x537c('0x74')]['items'][_0x107388[0x1]][_0x537c('0xce')]=_0x276108;window['_QuatroDigital_DropDown'][_0x537c('0x74')]['items'][_0x107388[0x1]][_0x537c('0xcf')]=_0x107388[0x1];_0x46a573[_0x537c('0xd0')]([window['_QuatroDigital_DropDown'][_0x537c('0x74')][_0x537c('0x78')][_0x107388[0x1]]],[_0x537c('0x78'),'totalizers','shippingData'])[_0x537c('0xbd')](function(_0x3e0f3f){window[_0x537c('0x1a')][_0x537c('0x74')]=_0x3e0f3f;_0x253f8f(!0x0);})[_0x537c('0xc9')](function(_0x4a2034){_0x160b9f([_0x537c('0xd1'),_0x4a2034]);_0x253f8f();});}else _0x160b9f(_0x537c('0xd2'));};_0x6cc09b[_0x537c('0xb6')]=function(_0x2f2ec2,_0x1d8951){function _0x5bb025(_0x183c70){_0x183c70='boolean'!==typeof _0x183c70?!0x1:_0x183c70;_0x537c('0x4')!==typeof window[_0x537c('0x75')]&&_0x537c('0xd')===typeof window[_0x537c('0x75')][_0x537c('0xcb')]&&window[_0x537c('0x75')][_0x537c('0xcb')][_0x537c('0x69')](this);_0x537c('0xd')===typeof adminCart&&adminCart();_0xbba7f9['fn']['simpleCart'](!0x0,void 0x0,_0x183c70);_0x537c('0xd')===typeof _0x1d8951&&_0x1d8951(_0x4c1a60);}var _0x4c1a60=!0x1,_0x288990=_0xbba7f9(_0x2f2ec2)[_0x537c('0x83')]('data-sku-index');if(_0x2a8688[_0x537c('0xcc')]){if('undefined'===typeof window[_0x537c('0x1a')]['getOrderForm']['items'][_0x288990])return _0x160b9f(_0x537c('0xcd')+_0x288990+']'),_0x4c1a60;window[_0x537c('0x1a')][_0x537c('0x74')]['items'][_0x288990][_0x537c('0xcf')]=_0x288990;_0x46a573[_0x537c('0xd3')]([window[_0x537c('0x1a')]['getOrderForm'][_0x537c('0x78')][_0x288990]],['items',_0x537c('0x79'),_0x537c('0x7a')])[_0x537c('0xbd')](function(_0x2152ea){_0x4c1a60=!0x0;window[_0x537c('0x1a')][_0x537c('0x74')]=_0x2152ea;_0x489f12(_0x2152ea);_0x5bb025(!0x0);})[_0x537c('0xc9')](function(_0x591b35){_0x160b9f(['Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho',_0x591b35]);_0x5bb025();});}else alert(_0x537c('0xd4'));};_0x6cc09b['scrollCart']=function(_0x58c8d3,_0x431400,_0x2ea475,_0x12be4e){_0x12be4e=_0x12be4e||_0xbba7f9(_0x537c('0xd5'));_0x58c8d3=_0x58c8d3||'+';_0x431400=_0x431400||0.9*_0x12be4e[_0x537c('0xd6')]();_0x12be4e[_0x537c('0xb7')](!0x0,!0x0)[_0x537c('0xd7')]({'scrollTop':isNaN(_0x2ea475)?_0x58c8d3+'='+_0x431400+'px':_0x2ea475});};_0x2a8688[_0x537c('0xd8')]||(_0x6cc09b[_0x537c('0x53')](),_0xbba7f9['fn'][_0x537c('0x54')](!0x0));_0xbba7f9(window)['on'](_0x537c('0xd9'),function(){try{window[_0x537c('0x1a')][_0x537c('0x74')]=void 0x0,_0x6cc09b[_0x537c('0x53')]();}catch(_0xae786a){_0x160b9f(_0x537c('0xda')+_0xae786a[_0x537c('0x10')],'avisso');}});_0x537c('0xd')===typeof _0x2a8688[_0x537c('0xb')]?_0x2a8688[_0x537c('0xb')][_0x537c('0x69')](this):_0x160b9f('Callback\x20não\x20é\x20uma\x20função');};_0xbba7f9['fn'][_0x537c('0x1c')]=function(_0x1e435c){var _0xa3861b=_0xbba7f9(this);_0xa3861b['fn']=new _0xbba7f9['QD_dropDownCart'](this,_0x1e435c);return _0xa3861b;};}catch(_0x11097d){_0x537c('0x4')!==typeof console&&_0x537c('0xd')===typeof console[_0x537c('0xe')]&&console[_0x537c('0xe')](_0x537c('0xf'),_0x11097d);}}(this));(function(_0x144bb6){try{var _0x497c17=jQuery;window['_QuatroDigital_AmountProduct']=window['_QuatroDigital_AmountProduct']||{};window[_0x537c('0x75')]['items']={};window[_0x537c('0x75')][_0x537c('0xdb')]=!0x1;window[_0x537c('0x75')]['buyButtonClicked']=!0x1;window[_0x537c('0x75')]['quickViewUpdate']=!0x1;var _0x3bebbe=function(){if(window['_QuatroDigital_AmountProduct']['allowRecalculate']){var _0x2c75ad=!0x1;var _0x9687a={};window[_0x537c('0x75')][_0x537c('0x78')]={};for(_0x2ec407 in window[_0x537c('0x1a')][_0x537c('0x74')][_0x537c('0x78')])if(_0x537c('0x11')===typeof window['_QuatroDigital_DropDown']['getOrderForm'][_0x537c('0x78')][_0x2ec407]){var _0x106238=window[_0x537c('0x1a')][_0x537c('0x74')]['items'][_0x2ec407];_0x537c('0x4')!==typeof _0x106238[_0x537c('0xdc')]&&null!==_0x106238[_0x537c('0xdc')]&&''!==_0x106238['productId']&&(window['_QuatroDigital_AmountProduct'][_0x537c('0x78')][_0x537c('0xdd')+_0x106238[_0x537c('0xdc')]]=window['_QuatroDigital_AmountProduct'][_0x537c('0x78')]['prod_'+_0x106238['productId']]||{},window[_0x537c('0x75')]['items'][_0x537c('0xdd')+_0x106238[_0x537c('0xdc')]][_0x537c('0xde')]=_0x106238[_0x537c('0xdc')],_0x9687a['prod_'+_0x106238[_0x537c('0xdc')]]||(window[_0x537c('0x75')]['items'][_0x537c('0xdd')+_0x106238[_0x537c('0xdc')]]['qtt']=0x0),window[_0x537c('0x75')][_0x537c('0x78')][_0x537c('0xdd')+_0x106238['productId']][_0x537c('0xdf')]+=_0x106238['quantity'],_0x2c75ad=!0x0,_0x9687a[_0x537c('0xdd')+_0x106238[_0x537c('0xdc')]]=!0x0);}var _0x2ec407=_0x2c75ad;}else _0x2ec407=void 0x0;window[_0x537c('0x75')][_0x537c('0xdb')]&&(_0x497c17(_0x537c('0xe0'))[_0x537c('0xb9')](),_0x497c17(_0x537c('0xe1'))[_0x537c('0x38')](_0x537c('0xe2')));for(var _0x13f509 in window[_0x537c('0x75')]['items']){_0x106238=window['_QuatroDigital_AmountProduct'][_0x537c('0x78')][_0x13f509];if(_0x537c('0x11')!==typeof _0x106238)return;_0x9687a=_0x497c17(_0x537c('0xe3')+_0x106238[_0x537c('0xde')]+']')[_0x537c('0x0')]('li');if(window[_0x537c('0x75')][_0x537c('0xdb')]||!_0x9687a[_0x537c('0x34')]('.qd-bap-wrapper')[_0x537c('0x9')])_0x2c75ad=_0x497c17(_0x537c('0xe4')),_0x2c75ad[_0x537c('0x34')](_0x537c('0xe5'))[_0x537c('0x60')](_0x106238[_0x537c('0xdf')]),_0x106238=_0x9687a['find'](_0x537c('0xe6')),_0x106238[_0x537c('0x9')]?_0x106238['prepend'](_0x2c75ad)['addClass'](_0x537c('0xe2')):_0x9687a[_0x537c('0xe7')](_0x2c75ad);}_0x2ec407&&(window[_0x537c('0x75')][_0x537c('0xdb')]=!0x1);};window['_QuatroDigital_AmountProduct'][_0x537c('0xcb')]=function(){window[_0x537c('0x75')][_0x537c('0xdb')]=!0x0;_0x3bebbe['call'](this);};_0x497c17(document)[_0x537c('0xe8')](function(){_0x3bebbe['call'](this);});}catch(_0x38c48d){_0x537c('0x4')!==typeof console&&'function'===typeof console[_0x537c('0xe')]&&console['error'](_0x537c('0xf'),_0x38c48d);}}(this));(function(){try{var _0xac7a54=jQuery,_0x38ee15,_0x4950fd={'selector':'.qdDdcContainer','dropDown':{},'buyButton':{}};_0xac7a54[_0x537c('0xe9')]=function(_0x304f10){var _0xeef1c={};_0x38ee15=_0xac7a54[_0x537c('0x25')](!0x0,{},_0x4950fd,_0x304f10);_0x304f10=_0xac7a54(_0x38ee15[_0x537c('0xea')])[_0x537c('0x1c')](_0x38ee15['dropDown']);_0xeef1c[_0x537c('0xeb')]=_0x537c('0x4')!==typeof _0x38ee15[_0x537c('0xec')]['updateOnlyHover']&&!0x1===_0x38ee15[_0x537c('0xec')][_0x537c('0xd8')]?_0xac7a54(_0x38ee15['selector'])[_0x537c('0xed')](_0x304f10['fn'],_0x38ee15[_0x537c('0xeb')]):_0xac7a54(_0x38ee15[_0x537c('0xea')])[_0x537c('0xed')](_0x38ee15[_0x537c('0xeb')]);_0xeef1c[_0x537c('0xec')]=_0x304f10;return _0xeef1c;};_0xac7a54['fn'][_0x537c('0xee')]=function(){_0x537c('0x11')===typeof console&&_0x537c('0xd')===typeof console[_0x537c('0x12')]&&console[_0x537c('0x12')](_0x537c('0xef'));};_0xac7a54[_0x537c('0xee')]=_0xac7a54['fn']['smartCart'];}catch(_0x2e153f){_0x537c('0x4')!==typeof console&&_0x537c('0xd')===typeof console['error']&&console[_0x537c('0xe')](_0x537c('0xf'),_0x2e153f);}}());
		
		/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);
		
		var _0x5672=['scrollTop','bottom','top','height','first','Problemas\x20:(\x20.\x20Detalhes:\x20','addClass','qd-sil-image-loaded','attr','src','width','sizes','qd-sil-image','insertAfter','closest','offset','each','QD_SIL_scrollRange','body','trigger','QD_SIL_scroll','QD_smartImageLoad','function','hkpnfr%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','charCodeAt','toUpperCase','ite','join','---','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','object','undefined','error','warn','unshift','alerta','aviso','toLowerCase','info','apply','300','QD_SIL_scroll\x20QuatroDigital.is_Callback','find','imageWrapper','.qd-sil-on','length'];(function(_0x5418d6,_0x135cc0){var _0x6af668=function(_0x40d006){while(--_0x40d006){_0x5418d6['push'](_0x5418d6['shift']());}};_0x6af668(++_0x135cc0);}(_0x5672,0x165));var _0x4746=function(_0x5a6247,_0x1fd218){_0x5a6247=_0x5a6247-0x0;var _0x2ccd58=_0x5672[_0x5a6247];return _0x2ccd58;};(function(_0x2e6ad9){'use strict';var _0x36c49b=jQuery;if(typeof _0x36c49b['fn'][_0x4746('0x0')]===_0x4746('0x1'))return;_0x36c49b['fn']['QD_smartImageLoad']=function(){};var _0x35b393=function(_0x253786){var _0x91b43d={'y':_0x4746('0x2')};return function(_0x204f5d){var _0x5f2973,_0x2df3ce,_0x4021ef,_0x80a9e9;_0x2df3ce=function(_0x4fe3ae){return _0x4fe3ae;};_0x4021ef=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x204f5d=_0x204f5d['d'+_0x4021ef[0x10]+'c'+_0x4021ef[0x11]+'m'+_0x2df3ce(_0x4021ef[0x1])+'n'+_0x4021ef[0xd]]['l'+_0x4021ef[0x12]+'c'+_0x4021ef[0x0]+'ti'+_0x2df3ce('o')+'n'];_0x5f2973=function(_0x54dd26){return escape(encodeURIComponent(_0x54dd26['replace'](/\./g,'¨')[_0x4746('0x3')](/[a-zA-Z]/g,function(_0x20eff6){return String['fromCharCode'](('Z'>=_0x20eff6?0x5a:0x7a)>=(_0x20eff6=_0x20eff6[_0x4746('0x4')](0x0)+0xd)?_0x20eff6:_0x20eff6-0x1a);})));};var _0x1e6bcd=_0x5f2973(_0x204f5d[[_0x4021ef[0x9],_0x2df3ce('o'),_0x4021ef[0xc],_0x4021ef[_0x2df3ce(0xd)]]['join']('')]);_0x5f2973=_0x5f2973((window[['js',_0x2df3ce('no'),'m',_0x4021ef[0x1],_0x4021ef[0x4][_0x4746('0x5')](),_0x4746('0x6')][_0x4746('0x7')]('')]||_0x4746('0x8'))+['.v',_0x4021ef[0xd],'e',_0x2df3ce('x'),'co',_0x2df3ce('mm'),'erc',_0x4021ef[0x1],'.c',_0x2df3ce('o'),'m.',_0x4021ef[0x13],'r'][_0x4746('0x7')](''));for(var _0x9afc07 in _0x91b43d){if(_0x5f2973===_0x9afc07+_0x91b43d[_0x9afc07]||_0x1e6bcd===_0x9afc07+_0x91b43d[_0x9afc07]){_0x80a9e9='tr'+_0x4021ef[0x11]+'e';break;}_0x80a9e9='f'+_0x4021ef[0x0]+'ls'+_0x2df3ce(_0x4021ef[0x1])+'';}_0x2df3ce=!0x1;-0x1<_0x204f5d[[_0x4021ef[0xc],'e',_0x4021ef[0x0],'rc',_0x4021ef[0x9]][_0x4746('0x7')]('')]['indexOf'](_0x4746('0x9'))&&(_0x2df3ce=!0x0);return[_0x80a9e9,_0x2df3ce];}(_0x253786);}(window);if(!eval(_0x35b393[0x0]))return _0x35b393[0x1]?_0xceb502(_0x4746('0xa')):!0x1;var _0x5bf7ac='Quatro\x20Digital\x20-\x20Smart\x20Image\x20Load';var _0xceb502=function(_0x5335c6,_0x267e19){if(_0x4746('0xb')===typeof console&&_0x4746('0xc')!==typeof console[_0x4746('0xd')]&&'undefined'!==typeof console['info']&&_0x4746('0xc')!==typeof console[_0x4746('0xe')]){if(_0x4746('0xb')==typeof _0x5335c6&&_0x4746('0x1')==typeof _0x5335c6[_0x4746('0xf')]){_0x5335c6['unshift']('['+_0x5bf7ac+']\x0a');var _0x3cf58c=_0x5335c6;}else _0x3cf58c=['['+_0x5bf7ac+']\x0a',_0x5335c6];if(_0x4746('0xc')==typeof _0x267e19||_0x4746('0x10')!==_0x267e19['toLowerCase']()&&_0x4746('0x11')!==_0x267e19[_0x4746('0x12')]())if(_0x4746('0xc')!=typeof _0x267e19&&_0x4746('0x13')==_0x267e19['toLowerCase']())try{console['info'][_0x4746('0x14')](console,_0x3cf58c);}catch(_0x4e58e7){try{console['info'](_0x3cf58c[_0x4746('0x7')]('\x0a'));}catch(_0x181cc0){}}else try{console[_0x4746('0xd')][_0x4746('0x14')](console,_0x3cf58c);}catch(_0x422faf){try{console['error'](_0x3cf58c[_0x4746('0x7')]('\x0a'));}catch(_0xf0022c){}}else try{console[_0x4746('0xe')]['apply'](console,_0x3cf58c);}catch(_0x2e1e55){try{console[_0x4746('0xe')](_0x3cf58c[_0x4746('0x7')]('\x0a'));}catch(_0x23d216){}}}};var _0x4cf78a=/(ids\/[0-9]+-)[0-9-]+/i;var _0xc7862e={'imageWrapper':'.qd_sil_img_wrapper','sizes':{'width':_0x4746('0x15'),'height':_0x4746('0x15')}};var _0x14d4b0=function(_0x1e4d87,_0x24777e){'use strict';_0x371bc2();_0x36c49b(window)['on'](_0x4746('0x16'),_0x371bc2);function _0x371bc2(){try{var _0xb7bee4=_0x1e4d87[_0x4746('0x17')](_0x24777e[_0x4746('0x18')])['not'](_0x4746('0x19'))[_0x4746('0x17')]('img:visible');if(!_0xb7bee4[_0x4746('0x1a')])return;var _0x1061ef=_0x36c49b(window);var _0x1bd776={'top':_0x1061ef[_0x4746('0x1b')]()};_0x1bd776[_0x4746('0x1c')]=_0x1bd776[_0x4746('0x1d')]+_0x1061ef[_0x4746('0x1e')]();var _0x47799b=_0xb7bee4[_0x4746('0x1f')]()['height']();var _0x5567a4=_0x5750e3(_0xb7bee4,_0x1bd776,_0x47799b);for(var _0xdcfdb5=0x0;_0xdcfdb5<_0x5567a4[_0x4746('0x1a')];_0xdcfdb5++)_0xd23771(_0x36c49b(_0x5567a4[_0xdcfdb5]));}catch(_0x398cf1){typeof console!=='undefined'&&typeof console[_0x4746('0xd')]===_0x4746('0x1')&&console[_0x4746('0xd')](_0x4746('0x20'),_0x398cf1);}}function _0xd23771(_0x320e55){var _0x4d99c5=_0x320e55['clone']();_0x4d99c5['on']('load',function(){_0x36c49b(this)[_0x4746('0x21')](_0x4746('0x22'));});_0x4d99c5[_0x4746('0x23')]({'src':_0x4d99c5[0x0][_0x4746('0x24')][_0x4746('0x3')](_0x4cf78a,'$1'+_0x24777e['sizes'][_0x4746('0x25')]+'-'+_0x24777e[_0x4746('0x26')][_0x4746('0x1e')]),'width':_0x24777e[_0x4746('0x26')][_0x4746('0x25')],'height':_0x24777e['sizes'][_0x4746('0x1e')]});_0x4d99c5[_0x4746('0x21')](_0x4746('0x27'))[_0x4746('0x28')](_0x320e55);_0x4d99c5[_0x4746('0x29')](_0x24777e[_0x4746('0x18')])['addClass']('qd-sil-on');}function _0x5750e3(_0x28461f,_0x59fa92,_0x5c8eb7){var _0x30eacf;var _0x7be075=[];for(var _0x565e4c=0x0;_0x565e4c<_0x28461f['length'];_0x565e4c++){_0x30eacf=_0x36c49b(_0x28461f[_0x565e4c])[_0x4746('0x2a')]();_0x30eacf[_0x4746('0x1c')]=_0x30eacf['top']+_0x5c8eb7;if(!(_0x59fa92[_0x4746('0x1c')]<_0x30eacf[_0x4746('0x1d')]||_0x59fa92['top']>_0x30eacf[_0x4746('0x1c')])){_0x7be075['push'](_0x28461f[_0x565e4c]);}}return _0x7be075;};};_0x36c49b['fn'][_0x4746('0x0')]=function(_0x15b070){var _0x59a833=_0x36c49b(this);if(!_0x59a833[_0x4746('0x1a')])return _0x59a833;_0x59a833[_0x4746('0x2b')](function(){var _0x292589=_0x36c49b(this);_0x292589[_0x4746('0x0')]=new _0x14d4b0(_0x292589,_0x36c49b['extend']({},_0xc7862e,_0x15b070));});return _0x59a833;};window[_0x4746('0x2c')]=0x28;var _0x3ca79b=QD_SIL_scrollRange;var _0x3e5daa=0x0;_0x36c49b(window)['on']('scroll',function(){var _0x3533a0=document['documentElement']['scrollTop']||document[_0x4746('0x2d')][_0x4746('0x1b')];if(_0x3533a0>_0x3e5daa+_0x3ca79b||_0x3533a0<_0x3e5daa-_0x3ca79b){_0x36c49b(window)[_0x4746('0x2e')](_0x4746('0x2f'));_0x3e5daa=_0x3533a0;}});}(this));
		
		/* Automatizador de comments box do Facebook // 1.6 // Carlos Vinicius [Quatro Digital] */
$(window).on("load QD_autoFaceComments",function(){if(window.QD_lazyFaceComments)
return;var fbComments=$(".fb-comments");if(fbComments.find('iframe').length)
return;if(fbComments.length)
fbComments.attr("data-href",document.location.href.split("#").shift().split("?").shift());if(!$("#fb-root").length)
$("body").append('<div id="fb-root"></div>');if(!$("script#facebook-jssdk").length){var fbAppId=$("meta[property='fb:app_id']").attr("content")||!1;(function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(d.getElementById(id))return;js=d.createElement(s);js.id=id;js.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+(fbAppId?"&appId="+fbAppId:"");fjs.parentNode.insertBefore(js,fjs)}(document,'script','facebook-jssdk'))}
if(typeof FB!=="undefined"&&typeof FB.XFBML!=="undefined")
FB.XFBML.parse()});
		
		/* Quatro Digital - Smart Photo Carousel // 1.0 // Carlos Vinicius // Todos os direitos reservados */

/*FUNÇÕES AUXILIARES*/

(function(t){function h(d,c,b){b=b[0];try{var e=d.find(c.imageWrapper);e.length||(e=a("<div></div>").appendTo(d));e.empty().attr("class",c.imageWrapper.slice(1));var f=d.find(c.thumbsWrapper);f.length||(f=a("<div></div>").appendTo(d));f.empty().attr("class",c.thumbsWrapper.slice(1));d=[];var k;for(k=0;k<b.Images.length;k++)d.push(b.Images[k][0]);var g;for(g=0;g<d.length;g++){var l=d[g].Path;var h=a("<img>",{"data-lazy":l.replace(m,"$1"+c.sizes.image)}).appendTo(e);h.wrap("<div></div>").wrap(a("<a></a>",
{href:l.replace(m,"$1"+c.sizes.imagezoom),"class":"jqzoom"}));a("<img>",{src:l.replace(m,"$1"+c.sizes.thumb)}).appendTo(f).wrap("<div></div>");d[g].IsMain&&(c.slickOptions.images.initialSlide=g)}}catch(n){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Problemas :( . Detalhes: ",n)}try{c.slickOptions.images.asNavFor=f,a(e).slick(c.slickOptions.images),c.slickOptions.thumbs.asNavFor=e,a(f).slick(c.slickOptions.thumbs),a(".jqzoom").jqzoom(c.zoomOptions),a(f).on("afterChange",
function(){a(e).slick("slickGoTo",a(this).slick("slickCurrentSlide"))})}catch(n){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Problemas :( . Detalhes: ",n)}}function p(d){return a.qdAjax({url:"/produto/sku/"+d,dataType:"json",error:function(){alert("erro ao buscar objeto SKU")}})}var a=jQuery;if("function"!==typeof a.fn.QD_smartPhotoCarousel){var m=/(ids\/[0-9]+-)[0-9-]+/i,q={imageWrapper:".qd-spc-image",thumbsWrapper:".qd-spc-thumbs",sizes:{thumb:"150-150",image:"500-500",
imagezoom:"1000-1000"},slickOptions:{images:{lazyLoad:"ondemand",infinite:!1,arrows:!1},thumbs:{slidesToShow:3,slidesToScroll:1,arrows:!1,focusOnSelect:!0}},zoomOptions:{}},r=function(d,c,b){if(!b&&(b=skuJson.skus[0].sku,skuJson.avaliable))for(var e=0;e<skuJson.skus.length;e++)if(skuJson.skus[e].avaliable){b=skuJson.skus[e].sku;break}p(b).done(function(a){h(d,c,a)});a(window).on("skuChanged.vtex",function(a,e,b){p(b.sku).done(function(a){h(d,c,a)})})};a.fn.QD_smartPhotoCarousel=function(d,c){var b=
a(this);if(!b.length)return b;b.each(function(){var b=a(this);b.QD_smartPhotoCarousel=new r(b,a.extend(!0,{},q,d),c)});return b};a(function(){a(".qd_auto_smart_photo_carousel").QD_smartPhotoCarousel()})}})(this);
		
		