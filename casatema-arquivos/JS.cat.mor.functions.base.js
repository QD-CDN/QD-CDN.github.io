/**
* Funções base
*/
"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});"function"!=typeof String.prototype.capitalize&&(String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1).toLowerCase()});
"function"!==typeof String.prototype.replaceSpecialChars&&(String.prototype.replaceSpecialChars=function(){var b={"\u00e7":"c","\u00e6":"ae","\u0153":"oe","\u00e1":"a","\u00e9":"e","\u00ed":"i","\u00f3":"o","\u00fa":"u","\u00e0":"a","\u00e8":"e","\u00ec":"i","\u00f2":"o","\u00f9":"u","\u00e4":"a","\u00eb":"e","\u00ef":"i","\u00f6":"o","\u00fc":"u","\u00ff":"y","\u00e2":"a","\u00ea":"e","\u00ee":"i","\u00f4":"o","\u00fb":"u","\u00e5":"a","\u00e3":"a","\u00f8":"o","\u00f5":"o",u:"u","\u00c1":"A","\u00c9":"E",
"\u00cd":"I","\u00d3":"O","\u00da":"U","\u00ca":"E","\u00d4":"O","\u00dc":"U","\u00c3":"A","\u00d5":"O","\u00c0":"A","\u00c7":"C"};return this.replace(/[\u00e0-\u00fa]/ig,function(a){return"undefined"!=typeof b[a]?b[a]:a})});
Array.prototype.indexOf||(Array.prototype.indexOf=function(d,e){var a;if(null==this)throw new TypeError('"this" is null or not defined');var c=Object(this),b=c.length>>>0;if(0===b)return-1;a=+e||0;Infinity===Math.abs(a)&&(a=0);if(a>=b)return-1;for(a=Math.max(0<=a?a:b-Math.abs(a),0);a<b;){if(a in c&&c[a]===d)return a;a++}return-1});
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs();a.trigger("QuatroDigital.pt_callback",[a])}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return a.length?$.extend({},a,new b(a)):a},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();
try {
	var Common = {
		run: function() {},
		init: function() {
			Common.vtexBindQuickViewDestroy();
			Common.qdOverlay();			
			Common.applyMosaicCategorieBanners();		
			Common.applyMosaicCategorieBannersFull();
			Common.applySmartCart();			
			Common.applyAmazingMenu();			
			Common.applyAmazingMenuMobile();
			Common.applyTipBarCarousel();
			Common.applyDifferentialsCarousel();
			Common.applyCarouselShelf();			
			Common.openModalVideoInstitutional();
			Common.saveAmountFix();
			Common.setDataScrollToggle();
			Common.openSearchModal();
		},
		ajaxStop: function() {
			Common.saveAmountFix();			
		},
		windowOnload: function() {
			Common.saveAmountFix();			
		},
		openSearchModal: function() {
			$('.header-qd-v1-action-search').click(function() {
				$('.modal-qd-v1-search').modal();
				return false;
			});
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
		applyAmazingMenu: function() {
			$('.header-qd-v1-amazing-menu').QD_amazingMenu({
				callback: function() {
					$('ul.qd-am-dropdown-menu').each(function() {
						$(this).wrapInner('<li class="container"><ul></ul></li>');
					});
				}
			});

			$('.footer-qd-v1-menu-list').QD_amazingMenu();
			
			$('.footer-qd-v1-menu-list >ul >li').click(function(){
				var $t = $(this);
				$t.toggleClass('qd-is-active');
				$t.find('> ul').toggleClass('qd-is-active');
			});
		},
		applyAmazingMenuMobile: function() {
			var wrapper = $('.header-qd-v1-amazing-menu-mobile');

			wrapper.find('> ul > li > ul').prepend(function(){return $(this).prev().clone().wrap('<li></li>').parent()});

			wrapper.QD_amazingMenu({
				callback: function() {
					$('<span class="qd-am-dropdown-trigger"><i class="fa fa-angle-down"></i></span>').appendTo(wrapper.find('.qd-am-has-ul')).click(function() {
						var $t = $(this);
						$.merge($t.parent(), $t.closest('ul')).toggleClass('qd-am-is-active');

						$t.filter(function(){return !$(this).closest('ul').is('.qd-amazing-menu');}).siblings('ul').stop(true, true).slideToggle();
					});

					wrapper.find('> ul > li > .qd-am-dropdown-trigger').click(function() {
						var w = $('.header-qd-v1-amazing-menu-mobile-wrapper');
						w.addClass('qd-am-is-active');
						w.animate({ scrollTop: 0 }, 200);
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

			$('.header-qd-v1-navigator-close').click(function() {
				$(document.body).removeClass('qd-sn-on');
				$('.search-qd-v1-navigator-close').addClass('hide');
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
				// Se estiver dentro do product-qd-v1-tip-bar, ele mostrará só 2 slides por vez, mantendo as outras propriedades da variável options
				if(wrapper.closest('.product-qd-v1-tip-bar').length)
					return { slidesToShow: 2 };
				return {};
			})()));
		},
		applyMosaicCategorieBanners: function() {
			$('.mosaic-categories-qd-v1-wrapper > .box-banner').QD_mosaicBanners({
				classFourColumn: "col-xs-12 col-sm-12 col-md-6 col-lg-12"
			});
		},
		applyMosaicCategorieBannersFull: function() {
			$('.mosaic-categories-qd-v2-wrapper > .box-banner').QD_mosaicBanners({
				classFourColumn: "col-xs-12 col-sm-12",
				containerWidth: 715
			});
		},
		applySmartCart: function() {
			$('.header-qd-v1-cart, .fixed-buttons-qd-v1 .fixed-buttons-qd-v1-cart').append('<div class="smart-cart-qd-v1-wrapper"><div class="qd-sc-wrapper"></div></div>');
			
			$(document.body).append('<div class="smart-cart-qd-v1-wrapper"><div class="qd-sc-wrapper"></div></div>');

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
						$(".qd-ddc-wrapper3").prepend('<div class="qd-cartTitle"><h3>Meu carrinho</h3></div>');
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

			$('.header-qd-v1-cart-link, .header-qd-v1-cart-link-float').click(function(evt) {
				evt.preventDefault();
				$(document.body).toggleClass('qd-cart-show');

				wrapper.height($(window).height());
				wrapper.find(".qd-ddc-prodWrapper").css('max-height', $(window).height() - 193);
			});

			$('.qd_ddc_lightBoxClose').click(function(evt){
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		},
		openModalVideoInstitutional: function() {
			var videoRegex = /(youtu\.be\/|\?v=)([^&]+)/i;

			$('.box-banner a').filter('[href*="youtube.com/"], [href*="youtu.be/"]').click(function(e) {
				e.preventDefault();
				var modal = $('.qd-v1-modal').clone().appendTo(document.body).addClass('hotsite-information-qd-v1-modal');
				var $t = $(this);
				var videoId = ($t.attr('href').match(videoRegex) || ['']).pop();

				modal.find('.modal-header').append('<h2 class="modal-title">' + $t.find('img').attr('alt') + '</h2>');
				$('<iframe src="' + 'https://www.youtube.com/embed/' + videoId + '?wmode=transparent&rel=0" frameborder="0"></iframe>').appendTo(modal.find('.modal-body'));
				modal.modal();
				
				modal.on('hidden.bs.modal', function() {
					modal.remove();
				});
			});
		},
		saveAmountFix: function() {
			$('.shelf-qd-v1-highlight-discount-percentage:not(.qd-on)').addClass('qd-on').each(function() {
				var $t = $(this);
				$t.text(($t.text().trim().match(/[0-9]+/) || [""]).pop() + '% OFF');
			});
		},
		setDataScrollToggle: function() {
			$(document.body).attr('data-qd-scroll-limit', '100');
		},
		applyCarouselShelf: function() {
			var wrapper = $('.carousel-qd-v1-shelf .prateleira').not('.slick-initialized');

			if (!wrapper.length)
				return false;

			wrapper.has('h2').each(function () {
				var $t = $(this);
				$t.find('h2').insertBefore($t);
			});

			var slidesToShow;
			var slidesToShowB;

			wrapper.each(function(){
								
				if ($(this).parent().hasClass('special-carousel-qd-v1-shelf')) {
					slidesToShow = 2;
					slidesToShowB = 1;
				} else {
					slidesToShow = 4;
					slidesToShowB = 2;
				}
					
				$(this).slick({
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
								slidesToShow: slidesToShowB,
								slidesToScroll: slidesToShowB
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
			});

		},
		applyDifferentialsCarousel: function() {
			var wrapper = $('.differentials-carroussel-qd-v1-carousel');

			if (!wrapper.length)
				return;

			var options = {
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				autoplay: true,
				slidesToShow: 3,
				slidesToScroll: 3,
				infinite: true,
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

			wrapper.slick($.extend(true, options, (function() {})()));
		}
	};

	var Home = {
		init: function() {
			Home.sliderFull();
			Home.applyBrandsCarousel();			
			Home.applyHotsiteShelfCarousel();			
			Home.scrollBottomHotsite();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		sliderFull: function() {
			var wrapper = $('.slider-qd-v1-full');

			wrapper.slick({
				dots: true,
				fade: true,
				cssEase: 'linear',
				infinite: true,
				speed: 500,
				draggable: false,
				autoplay: true,
				autoplaySpeed: 4000				
			});

			wrapper.each(function() {
				$(this).find('.slick-arrow').wrapAll('<div class="slick-nav" />');
			});
		},
		applyBrandsCarousel: function() {
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
							slidesToScroll: 2,
							centerMode: true,
							infinite: true								
						}
					},

					{
						breakpoint: 380,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							centerMode: true,
							infinite: true									
						}
					}
				]
			});
		},
		scrollBottomHotsite: function() {
			$('.hotsite-full-banner-qd-v1-scroll-btn').click(function(e) {
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $('.home-special-departament-video-qd-v1-wrapper').offset().top -100
				}, 900, 'swing');
			});
		},
		applyHotsiteShelfCarousel: function() {
			var wrapper = $('.hotsite-banner-shelf-qd-v1-carousel .prateleira').not('.slick-initialized');
			
			if (!wrapper.length)
				return false;

			wrapper.has('h2').each(function () {
				var $t = $(this);
				$t.find('h2').insertBefore($t);
			});

			wrapper.each(function(){										
				$(this).slick({
					prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
					nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					draggable: false,
					speed: 700
				});
			});
		}
	};

	var Search = {
		init: function() {},
		ajaxStop: function() {},
		windowOnload: function() {}
	};

	var Product = {
		run: function() {},
		init: function() {
			// Product.forceImageZoom();
			Product.applyCarouselThumb(); $(window).on('skuSelected.vtex', Product.applyCarouselThumb);			
			Product.accessoriesFix();
			Product.accessoriesApplyCarousel();
			Product.setAvailableBodyClass();
			Product.openShipping();
			Product.scrollToDescription();
			Product.qdHideUniqueSkuOption();
			Product.scrollToBuyButton();
			Product.showFloatingBuyBar();
			Product.saveAmountFlag();			
			Product.applyBuyTogetherBackground();			
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
			var sliderWrapper = $('.product-qd-v1-image-carrousel'); // Wrapper que será inserido o carousel
			var thumbsWrapper = $('.thumbs').first(); // Wrapper onde foi inserido as thumbs
			var thumbsSliderWrapper = $('.product-qd-v1-image-thumbs'); // Wrapper onde foi inserido as thumbs

			sliderWrapper.filter('.slick-initialized').slick('unslick');
			thumbsSliderWrapper.filter('.slick-initialized').slick('unslick');

			var thumbsLi;
			(function cloneThumb () {
				thumbsLi = thumbsWrapper.find('li');
				if(thumbsLi.length <= 4){
					thumbsLi.clone().appendTo(thumbsWrapper);
					cloneThumb();
				}
			})();

			thumbsSliderWrapper.html(thumbsWrapper.html());

			thumbsSliderWrapper.find('img').each(function(){
				$t = $(this);
				$t.attr('src', $t.attr('src').replace('-55-55', '-90-90'));
			});

			sliderWrapper.empty();
			thumbsWrapper.find('a').each(function(index){
				$t = $(this);
				$('<div class="qd-slide qd-product-image-' + index + '"><a href="' + $t.attr('rel').replace('-292-292', '-640-640') + '"><img src="' + $t.attr('rel').replace('-292-292', '-640-640') + '"/></a></div>').appendTo(sliderWrapper);
			});

			var options = {
				centerMode: true,
				slidesToShow: 4,
				slidesToScroll: 1,
				focusOnSelect: true,
				centerPadding: 0
			};
			sliderWrapper.slick($.extend({}, options, {
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
  				asNavFor: '.product-qd-v1-image-thumbs',
  				responsive: [
					{
						breakpoint: 991,
						settings: {
							slidesToShow: 1,
							centerPadding: '0'
						}
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 1,
							centerPadding: 0,
							arrows: false
						}
					},
				]
			}));

			thumbsSliderWrapper.addClass('slick-slide').slick($.extend({}, options, {
				arrows: false,
				  asNavFor: '.product-qd-v1-image-carrousel',
				  slidesToShow: 5
			}));
			thumbsSliderWrapper.on('afterChange', function(event, slick, slide){
				thumbsSliderWrapper.find('.ON').removeClass('ON');
				thumbsSliderWrapper.find('.slick-active.slick-center a').addClass('ON');
			}).slick('getSlick').slickGoTo(0);

			sliderWrapper.find('a').click(function(e){e.preventDefault()});
		},
		openShipping: function() {
			if( typeof window.ShippingValue === "function" )
				window.ShippingValue();
		},
		scrollToDescription: function() {
			$('.product-qd-v1-link-description').click(function(e) {
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $('.product-qd-v1-information-wrapper').offset().top -100
				}, 900, 'swing');
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
		scrollToBuyButton: function() {
			$('.product-qd-v1-buy-button-float').click(function(e) {
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $('.product-qd-v1-name').offset().top -100
				}, 900, 'swing');
			});
		},
		showFloatingBuyBar: function () {
			var targetOffset = $(".product-qd-v1-buy-button").offset().top - 10;
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
		saveAmountFlag: function() {
			var flag = $('.product-qd-v1-stamps-highlight-discount');

			$(window).on('skuSelected.vtex', function(e, sku, data) {
				if (!flag.length)
					flag = $('<div class="product-qd-v1-stamps-highlight-discount"></div>').prependTo('.product-qd-v1-stamps');

				if (data.listPrice > data.bestPrice)
					flag.text(parseInt(100 - data.bestPrice / data.listPrice * 100) + "% OFF").show();
				else
					flag.hide();
			});

			if (skuJson.skus.length >= 1) {
				if (!flag.length)
					flag = $('<div class="product-qd-v1-stamps-highlight-discount"></div>').prependTo('.product-qd-v1-stamps');

				if (skuJson.skus[0].listPrice > skuJson.skus[0].bestPrice)
					flag.text(parseInt(100 - skuJson.skus[0].bestPrice / skuJson.skus[0].listPrice * 100) + "% OFF").show();
			}
		},
		applyBuyTogetherBackground: function() {
			var wrapper = $('.product-qd-v1-buy-together-wrapper');

			if (!wrapper.length)
				wrapper.addClass('qd-am-is-active');
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
		sideMenuToggle:function() {
			$('.institucional-qd-v1-menu-toggle-wrap').click(function(evt) {
				evt.preventDefault();
				$(document.body).addClass('qd-sn-on');
			});

			$('.institucional-qd-v1-side-menu-wrap-close').click(function(){
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
var _0x7f6d=['sku','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','unavailable','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','available','off','.qd_smart_stock_available_auto','function','qdAjax','extend','url','opts','push','success','call','error','complete','parameters','callbackFns','successPopulated','boolean','errorPopulated','completePopulated','object','clearQueueDelay','jqXHR','undefined','readyState','data','textStatus','errorThrown','2.1','/produto/sku/','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','QD_smartStockAvailable','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','toLowerCase','info','apply','warn','removeClass','qd-ssa-sku-no-selected','qd-ssa-sku-selected','SkuSellersInformation','attr','data-qd-ssa-qtt','find','[data-qd-ssa-text]','addClass','qd-ssa-show','length','filter','hide','qd-ssa-hide','html','#qtt','show','message','qd-ssa-on','skus','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','split','AvailableQuantity','QuatroDigital.ssa.prodUnavailable','vtex.sku.selected.QD','qd-ssa-sku-prod-unavailable','nfngrzn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','ite','join','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','trigger','QuatroDigital.ssa.skuSelected','initialSkuSelected','prod'];(function(_0x126558,_0x143c9a){var _0x1f6d14=function(_0x2b0eea){while(--_0x2b0eea){_0x126558['push'](_0x126558['shift']());}};_0x1f6d14(++_0x143c9a);}(_0x7f6d,0xb0));var _0xd7f6=function(_0x49d41c,_0x2bdc35){_0x49d41c=_0x49d41c-0x0;var _0xb64c5f=_0x7f6d[_0x49d41c];return _0xb64c5f;};(function(_0x4a5c02){if(_0xd7f6('0x0')!==typeof _0x4a5c02[_0xd7f6('0x1')]){var _0x54151e={};_0x4a5c02['qdAjaxQueue']=_0x54151e;_0x4a5c02['qdAjax']=function(_0x8f8a98){var _0x350bc9=_0x4a5c02[_0xd7f6('0x2')]({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x8f8a98);var _0x2e36ee=escape(encodeURIComponent(_0x350bc9[_0xd7f6('0x3')]));_0x54151e[_0x2e36ee]=_0x54151e[_0x2e36ee]||{};_0x54151e[_0x2e36ee][_0xd7f6('0x4')]=_0x54151e[_0x2e36ee][_0xd7f6('0x4')]||[];_0x54151e[_0x2e36ee][_0xd7f6('0x4')][_0xd7f6('0x5')]({'success':function(_0x197b95,_0x5a2aec,_0x19c522){_0x350bc9[_0xd7f6('0x6')][_0xd7f6('0x7')](this,_0x197b95,_0x5a2aec,_0x19c522);},'error':function(_0x337174,_0x2839ce,_0x28ac71){_0x350bc9[_0xd7f6('0x8')][_0xd7f6('0x7')](this,_0x337174,_0x2839ce,_0x28ac71);},'complete':function(_0x202c73,_0x479fbf){_0x350bc9[_0xd7f6('0x9')][_0xd7f6('0x7')](this,_0x202c73,_0x479fbf);}});_0x54151e[_0x2e36ee][_0xd7f6('0xa')]=_0x54151e[_0x2e36ee][_0xd7f6('0xa')]||{'success':{},'error':{},'complete':{}};_0x54151e[_0x2e36ee][_0xd7f6('0xb')]=_0x54151e[_0x2e36ee][_0xd7f6('0xb')]||{};_0x54151e[_0x2e36ee][_0xd7f6('0xb')][_0xd7f6('0xc')]=_0xd7f6('0xd')===typeof _0x54151e[_0x2e36ee][_0xd7f6('0xb')]['successPopulated']?_0x54151e[_0x2e36ee][_0xd7f6('0xb')]['successPopulated']:!0x1;_0x54151e[_0x2e36ee][_0xd7f6('0xb')][_0xd7f6('0xe')]='boolean'===typeof _0x54151e[_0x2e36ee][_0xd7f6('0xb')][_0xd7f6('0xe')]?_0x54151e[_0x2e36ee][_0xd7f6('0xb')]['errorPopulated']:!0x1;_0x54151e[_0x2e36ee][_0xd7f6('0xb')][_0xd7f6('0xf')]=_0xd7f6('0xd')===typeof _0x54151e[_0x2e36ee][_0xd7f6('0xb')][_0xd7f6('0xf')]?_0x54151e[_0x2e36ee][_0xd7f6('0xb')]['completePopulated']:!0x1;_0x8f8a98=_0x4a5c02[_0xd7f6('0x2')]({},_0x350bc9,{'success':function(_0x40fd67,_0x545933,_0x482bfc){_0x54151e[_0x2e36ee][_0xd7f6('0xa')]['success']={'data':_0x40fd67,'textStatus':_0x545933,'jqXHR':_0x482bfc};_0x54151e[_0x2e36ee][_0xd7f6('0xb')]['successPopulated']=!0x0;for(var _0x479408 in _0x54151e[_0x2e36ee][_0xd7f6('0x4')])'object'===typeof _0x54151e[_0x2e36ee]['opts'][_0x479408]&&(_0x54151e[_0x2e36ee][_0xd7f6('0x4')][_0x479408][_0xd7f6('0x6')][_0xd7f6('0x7')](this,_0x40fd67,_0x545933,_0x482bfc),_0x54151e[_0x2e36ee][_0xd7f6('0x4')][_0x479408][_0xd7f6('0x6')]=function(){});},'error':function(_0x535dbd,_0x36b3ef,_0x1de627){_0x54151e[_0x2e36ee][_0xd7f6('0xa')]['error']={'errorThrown':_0x1de627,'textStatus':_0x36b3ef,'jqXHR':_0x535dbd};_0x54151e[_0x2e36ee][_0xd7f6('0xb')][_0xd7f6('0xe')]=!0x0;for(var _0x27808a in _0x54151e[_0x2e36ee][_0xd7f6('0x4')])_0xd7f6('0x10')===typeof _0x54151e[_0x2e36ee]['opts'][_0x27808a]&&(_0x54151e[_0x2e36ee][_0xd7f6('0x4')][_0x27808a][_0xd7f6('0x8')][_0xd7f6('0x7')](this,_0x535dbd,_0x36b3ef,_0x1de627),_0x54151e[_0x2e36ee][_0xd7f6('0x4')][_0x27808a][_0xd7f6('0x8')]=function(){});},'complete':function(_0x276390,_0x65898c){_0x54151e[_0x2e36ee][_0xd7f6('0xa')][_0xd7f6('0x9')]={'textStatus':_0x65898c,'jqXHR':_0x276390};_0x54151e[_0x2e36ee]['callbackFns']['completePopulated']=!0x0;for(var _0x544a99 in _0x54151e[_0x2e36ee]['opts'])_0xd7f6('0x10')===typeof _0x54151e[_0x2e36ee]['opts'][_0x544a99]&&(_0x54151e[_0x2e36ee][_0xd7f6('0x4')][_0x544a99][_0xd7f6('0x9')]['call'](this,_0x276390,_0x65898c),_0x54151e[_0x2e36ee][_0xd7f6('0x4')][_0x544a99]['complete']=function(){});isNaN(parseInt(_0x350bc9[_0xd7f6('0x11')]))||setTimeout(function(){_0x54151e[_0x2e36ee][_0xd7f6('0x12')]=void 0x0;_0x54151e[_0x2e36ee]['opts']=void 0x0;_0x54151e[_0x2e36ee][_0xd7f6('0xa')]=void 0x0;_0x54151e[_0x2e36ee][_0xd7f6('0xb')]=void 0x0;},_0x350bc9[_0xd7f6('0x11')]);}});_0xd7f6('0x13')===typeof _0x54151e[_0x2e36ee]['jqXHR']?_0x54151e[_0x2e36ee][_0xd7f6('0x12')]=_0x4a5c02['ajax'](_0x8f8a98):_0x54151e[_0x2e36ee][_0xd7f6('0x12')]&&_0x54151e[_0x2e36ee][_0xd7f6('0x12')][_0xd7f6('0x14')]&&0x4==_0x54151e[_0x2e36ee][_0xd7f6('0x12')][_0xd7f6('0x14')]&&(_0x54151e[_0x2e36ee]['callbackFns'][_0xd7f6('0xc')]&&_0x8f8a98[_0xd7f6('0x6')](_0x54151e[_0x2e36ee][_0xd7f6('0xa')][_0xd7f6('0x6')][_0xd7f6('0x15')],_0x54151e[_0x2e36ee][_0xd7f6('0xa')][_0xd7f6('0x6')][_0xd7f6('0x16')],_0x54151e[_0x2e36ee][_0xd7f6('0xa')]['success']['jqXHR']),_0x54151e[_0x2e36ee]['callbackFns'][_0xd7f6('0xe')]&&_0x8f8a98[_0xd7f6('0x8')](_0x54151e[_0x2e36ee]['parameters'][_0xd7f6('0x8')]['jqXHR'],_0x54151e[_0x2e36ee][_0xd7f6('0xa')]['error']['textStatus'],_0x54151e[_0x2e36ee][_0xd7f6('0xa')][_0xd7f6('0x8')][_0xd7f6('0x17')]),_0x54151e[_0x2e36ee]['callbackFns'][_0xd7f6('0xf')]&&_0x8f8a98[_0xd7f6('0x9')](_0x54151e[_0x2e36ee][_0xd7f6('0xa')]['complete'][_0xd7f6('0x12')],_0x54151e[_0x2e36ee][_0xd7f6('0xa')][_0xd7f6('0x9')][_0xd7f6('0x16')]));};_0x4a5c02[_0xd7f6('0x1')]['version']=_0xd7f6('0x18');}}(jQuery));(function(_0x5170be){function _0x262810(_0x58cf90,_0x42f69e){_0x2b59b5[_0xd7f6('0x1')]({'url':_0xd7f6('0x19')+_0x58cf90,'clearQueueDelay':null,'success':_0x42f69e,'error':function(){_0x1b4207(_0xd7f6('0x1a'));}});}var _0x2b59b5=jQuery;if(_0xd7f6('0x0')!==typeof _0x2b59b5['fn'][_0xd7f6('0x1b')]){var _0x1b4207=function(_0x5bc1ea,_0x11bb04){if(_0xd7f6('0x10')===typeof console){var _0x2668f8;_0xd7f6('0x10')===typeof _0x5bc1ea?(_0x5bc1ea[_0xd7f6('0x1c')](_0xd7f6('0x1d')),_0x2668f8=_0x5bc1ea):_0x2668f8=[_0xd7f6('0x1d')+_0x5bc1ea];_0xd7f6('0x13')===typeof _0x11bb04||'alerta'!==_0x11bb04[_0xd7f6('0x1e')]()&&'aviso'!==_0x11bb04[_0xd7f6('0x1e')]()?_0xd7f6('0x13')!==typeof _0x11bb04&&_0xd7f6('0x1f')===_0x11bb04['toLowerCase']()?console['info'][_0xd7f6('0x20')](console,_0x2668f8):console[_0xd7f6('0x8')][_0xd7f6('0x20')](console,_0x2668f8):console[_0xd7f6('0x21')]['apply'](console,_0x2668f8);}},_0xb89a96={},_0x33736d=function(_0x3e388e,_0x2e0efc){function _0xeb47b6(_0x5a2ec8){try{_0x3e388e[_0xd7f6('0x22')](_0xd7f6('0x23'))['addClass'](_0xd7f6('0x24'));var _0x136351=_0x5a2ec8[0x0][_0xd7f6('0x25')][0x0]['AvailableQuantity'];_0x3e388e[_0xd7f6('0x26')](_0xd7f6('0x27'),_0x136351);_0x3e388e['each'](function(){var _0x3e388e=_0x2b59b5(this)[_0xd7f6('0x28')](_0xd7f6('0x29'));if(0x1>_0x136351)return _0x3e388e['hide']()[_0xd7f6('0x2a')]('qd-ssa-hide')[_0xd7f6('0x22')](_0xd7f6('0x2b'));var _0x5a2ec8=_0x3e388e['filter']('[data-qd-ssa-text=\x22'+_0x136351+'\x22]');_0x5a2ec8=_0x5a2ec8[_0xd7f6('0x2c')]?_0x5a2ec8:_0x3e388e[_0xd7f6('0x2d')]('[data-qd-ssa-text=\x22default\x22]');_0x3e388e[_0xd7f6('0x2e')]()[_0xd7f6('0x2a')](_0xd7f6('0x2f'))['removeClass'](_0xd7f6('0x2b'));_0x5a2ec8[_0xd7f6('0x30')]((_0x5a2ec8[_0xd7f6('0x30')]()||'')['replace'](_0xd7f6('0x31'),_0x136351));_0x5a2ec8[_0xd7f6('0x32')]()[_0xd7f6('0x2a')]('qd-ssa-show')[_0xd7f6('0x22')](_0xd7f6('0x2f'));});}catch(_0x18b2ce){_0x1b4207(['Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20',_0x18b2ce[_0xd7f6('0x33')]]);}}if(_0x3e388e[_0xd7f6('0x2c')]){_0x3e388e[_0xd7f6('0x2a')](_0xd7f6('0x34'));_0x3e388e[_0xd7f6('0x2a')](_0xd7f6('0x23'));try{_0x3e388e[_0xd7f6('0x2a')]('qd-ssa-skus-'+vtxctx[_0xd7f6('0x35')]['split'](';')['length']);}catch(_0xae39a1){_0x1b4207(['Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20',_0xae39a1['message']]);}_0x2b59b5(window)['on'](_0xd7f6('0x36'),function(_0x30a43d,_0x58ba1b,_0x2afd89){try{_0x262810(_0x2afd89['sku'],function(_0x2a41b9){_0xeb47b6(_0x2a41b9);0x1===vtxctx[_0xd7f6('0x35')][_0xd7f6('0x37')](';')['length']&&0x0==_0x2a41b9[0x0][_0xd7f6('0x25')][0x0][_0xd7f6('0x38')]&&_0x2b59b5(window)['trigger'](_0xd7f6('0x39'));});}catch(_0x240b44){_0x1b4207(['Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20',_0x240b44['message']]);}});_0x2b59b5(window)['off'](_0xd7f6('0x3a'));_0x2b59b5(window)['on'](_0xd7f6('0x39'),function(){_0x3e388e[_0xd7f6('0x2a')](_0xd7f6('0x3b'))['hide']();});}};_0x5170be=function(_0x432ed3){var _0x49bb2f={'p':_0xd7f6('0x3c')};return function(_0x348912){var _0x26ea9e=function(_0x337965){return _0x337965;};var _0x90a284=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x348912=_0x348912['d'+_0x90a284[0x10]+'c'+_0x90a284[0x11]+'m'+_0x26ea9e(_0x90a284[0x1])+'n'+_0x90a284[0xd]]['l'+_0x90a284[0x12]+'c'+_0x90a284[0x0]+'ti'+_0x26ea9e('o')+'n'];var _0x4f777d=function(_0x247174){return escape(encodeURIComponent(_0x247174[_0xd7f6('0x3d')](/\./g,'¨')[_0xd7f6('0x3d')](/[a-zA-Z]/g,function(_0x2f0a72){return String[_0xd7f6('0x3e')](('Z'>=_0x2f0a72?0x5a:0x7a)>=(_0x2f0a72=_0x2f0a72[_0xd7f6('0x3f')](0x0)+0xd)?_0x2f0a72:_0x2f0a72-0x1a);})));};var _0x366ab0=_0x4f777d(_0x348912[[_0x90a284[0x9],_0x26ea9e('o'),_0x90a284[0xc],_0x90a284[_0x26ea9e(0xd)]]['join']('')]);_0x4f777d=_0x4f777d((window[['js',_0x26ea9e('no'),'m',_0x90a284[0x1],_0x90a284[0x4][_0xd7f6('0x40')](),_0xd7f6('0x41')][_0xd7f6('0x42')]('')]||_0xd7f6('0x43'))+['.v',_0x90a284[0xd],'e',_0x26ea9e('x'),'co',_0x26ea9e('mm'),_0xd7f6('0x44'),_0x90a284[0x1],'.c',_0x26ea9e('o'),'m.',_0x90a284[0x13],'r'][_0xd7f6('0x42')](''));for(var _0x10e4e2 in _0x49bb2f){if(_0x4f777d===_0x10e4e2+_0x49bb2f[_0x10e4e2]||_0x366ab0===_0x10e4e2+_0x49bb2f[_0x10e4e2]){var _0x4e54ba='tr'+_0x90a284[0x11]+'e';break;}_0x4e54ba='f'+_0x90a284[0x0]+'ls'+_0x26ea9e(_0x90a284[0x1])+'';}_0x26ea9e=!0x1;-0x1<_0x348912[[_0x90a284[0xc],'e',_0x90a284[0x0],'rc',_0x90a284[0x9]][_0xd7f6('0x42')]('')][_0xd7f6('0x45')](_0xd7f6('0x46'))&&(_0x26ea9e=!0x0);return[_0x4e54ba,_0x26ea9e];}(_0x432ed3);}(window);if(!eval(_0x5170be[0x0]))return _0x5170be[0x1]?_0x1b4207(_0xd7f6('0x47')):!0x1;_0x2b59b5['fn'][_0xd7f6('0x1b')]=function(_0x2cc165){var _0x41b170=_0x2b59b5(this);_0x2cc165=_0x2b59b5[_0xd7f6('0x2')](!0x0,{},_0xb89a96,_0x2cc165);_0x41b170['qdPlugin']=new _0x33736d(_0x41b170,_0x2cc165);try{_0xd7f6('0x10')===typeof _0x2b59b5['fn'][_0xd7f6('0x1b')]['initialSkuSelected']&&_0x2b59b5(window)[_0xd7f6('0x48')](_0xd7f6('0x49'),[_0x2b59b5['fn'][_0xd7f6('0x1b')][_0xd7f6('0x4a')][_0xd7f6('0x4b')],_0x2b59b5['fn'][_0xd7f6('0x1b')][_0xd7f6('0x4a')][_0xd7f6('0x4c')]]);}catch(_0x1539bd){_0x1b4207([_0xd7f6('0x4d'),_0x1539bd[_0xd7f6('0x33')]]);}_0x2b59b5['fn'][_0xd7f6('0x1b')][_0xd7f6('0x4e')]&&_0x2b59b5(window)['trigger'](_0xd7f6('0x39'));return _0x41b170;};_0x2b59b5(window)['on'](_0xd7f6('0x3a'),function(_0x584759,_0xdb57db,_0x43d6a8){try{_0x2b59b5['fn'][_0xd7f6('0x1b')]['initialSkuSelected']={'prod':_0xdb57db,'sku':_0x43d6a8},_0x2b59b5(this)['off'](_0x584759);}catch(_0x570237){_0x1b4207([_0xd7f6('0x4f'),_0x570237['message']]);}});_0x2b59b5(window)['on'](_0xd7f6('0x50'),function(_0x53c60b,_0x12e6a1,_0x2e0ed9){try{for(var _0x36f73f=_0x2e0ed9[_0xd7f6('0x2c')],_0x5b7299=_0x12e6a1=0x0;_0x5b7299<_0x36f73f&&!_0x2e0ed9[_0x5b7299][_0xd7f6('0x51')];_0x5b7299++)_0x12e6a1+=0x1;_0x36f73f<=_0x12e6a1&&(_0x2b59b5['fn'][_0xd7f6('0x1b')][_0xd7f6('0x4e')]=!0x0);_0x2b59b5(this)[_0xd7f6('0x52')](_0x53c60b);}catch(_0x393e7f){_0x1b4207(['Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20',_0x393e7f['message']]);}});_0x2b59b5(function(){_0x2b59b5(_0xd7f6('0x53'))[_0xd7f6('0x1b')]();});}}(window));
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

/* Quatro Digital Amazing Menu */
var _0xdf5d=['qd-am-level-','add','qd-am-','callback','trigger','extend','exec','.qd_amazing_menu_auto','getParent','closest','function','/qd-amazing-menu','object','undefined','info','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','apply','join','error','warn','qdAmAddNdx','each','addClass','qd-am-li-','first','qd-am-first','last','qd-am-last','QD_amazingMenu','nfngrzn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','charCodeAt','toUpperCase','ite','---','erc','indexOf','filter','length','parent','html','find','attr','.box-banner','insertBefore','hide','qd-am-content-loaded','text','trim','[class*=\x27colunas\x27]','clone','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','ajaxCallback','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','children','qd-am-elem-','replaceSpecialChars','>li','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown'];(function(_0x3c126c,_0x22f353){var _0x3b89e4=function(_0x1472c0){while(--_0x1472c0){_0x3c126c['push'](_0x3c126c['shift']());}};_0x3b89e4(++_0x22f353);}(_0xdf5d,0xd7));var _0xddf5=function(_0x196cf4,_0x5dfa97){_0x196cf4=_0x196cf4-0x0;var _0x3c1db4=_0xdf5d[_0x196cf4];return _0x3c1db4;};(function(_0x2c5ed2){_0x2c5ed2['fn'][_0xddf5('0x0')]=_0x2c5ed2['fn'][_0xddf5('0x1')];}(jQuery));(function(_0x13f635){var _0x43caab;var _0x2edb7f=jQuery;if(_0xddf5('0x2')!==typeof _0x2edb7f['fn']['QD_amazingMenu']){var _0xd99da8={'url':_0xddf5('0x3'),'callback':function(){},'ajaxCallback':function(){}};var _0x2ed5bf=function(_0x3d1f5b,_0x54115a){if(_0xddf5('0x4')===typeof console&&_0xddf5('0x5')!==typeof console['error']&&_0xddf5('0x5')!==typeof console[_0xddf5('0x6')]&&_0xddf5('0x5')!==typeof console['warn']){var _0x27ee4a;_0xddf5('0x4')===typeof _0x3d1f5b?(_0x3d1f5b[_0xddf5('0x7')](_0xddf5('0x8')),_0x27ee4a=_0x3d1f5b):_0x27ee4a=['[QD\x20Amazing\x20Menu]\x0a'+_0x3d1f5b];if(_0xddf5('0x5')===typeof _0x54115a||_0xddf5('0x9')!==_0x54115a[_0xddf5('0xa')]()&&'aviso'!==_0x54115a[_0xddf5('0xa')]())if(_0xddf5('0x5')!==typeof _0x54115a&&_0xddf5('0x6')===_0x54115a['toLowerCase']())try{console[_0xddf5('0x6')][_0xddf5('0xb')](console,_0x27ee4a);}catch(_0x1a7600){try{console['info'](_0x27ee4a[_0xddf5('0xc')]('\x0a'));}catch(_0x4f8439){}}else try{console[_0xddf5('0xd')][_0xddf5('0xb')](console,_0x27ee4a);}catch(_0x13c67a){try{console[_0xddf5('0xd')](_0x27ee4a[_0xddf5('0xc')]('\x0a'));}catch(_0x54969d){}}else try{console[_0xddf5('0xe')][_0xddf5('0xb')](console,_0x27ee4a);}catch(_0x5b303a){try{console[_0xddf5('0xe')](_0x27ee4a[_0xddf5('0xc')]('\x0a'));}catch(_0x2d2272){}}}};_0x2edb7f['fn'][_0xddf5('0xf')]=function(){var _0x20aa7c=_0x2edb7f(this);_0x20aa7c[_0xddf5('0x10')](function(_0x160a39){_0x2edb7f(this)[_0xddf5('0x11')](_0xddf5('0x12')+_0x160a39);});_0x20aa7c[_0xddf5('0x13')]()[_0xddf5('0x11')](_0xddf5('0x14'));_0x20aa7c[_0xddf5('0x15')]()[_0xddf5('0x11')](_0xddf5('0x16'));return _0x20aa7c;};_0x2edb7f['fn'][_0xddf5('0x17')]=function(){};_0x13f635=function(_0x2b6d56){var _0x5bee44={'p':_0xddf5('0x18')};return function(_0x421f8a){var _0x52265f=function(_0x425ad6){return _0x425ad6;};var _0x867841=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x421f8a=_0x421f8a['d'+_0x867841[0x10]+'c'+_0x867841[0x11]+'m'+_0x52265f(_0x867841[0x1])+'n'+_0x867841[0xd]]['l'+_0x867841[0x12]+'c'+_0x867841[0x0]+'ti'+_0x52265f('o')+'n'];var _0x2f147c=function(_0x4beaf6){return escape(encodeURIComponent(_0x4beaf6['replace'](/\./g,'¨')[_0xddf5('0x19')](/[a-zA-Z]/g,function(_0x442c8f){return String['fromCharCode'](('Z'>=_0x442c8f?0x5a:0x7a)>=(_0x442c8f=_0x442c8f[_0xddf5('0x1a')](0x0)+0xd)?_0x442c8f:_0x442c8f-0x1a);})));};var _0x342b0e=_0x2f147c(_0x421f8a[[_0x867841[0x9],_0x52265f('o'),_0x867841[0xc],_0x867841[_0x52265f(0xd)]][_0xddf5('0xc')]('')]);_0x2f147c=_0x2f147c((window[['js',_0x52265f('no'),'m',_0x867841[0x1],_0x867841[0x4][_0xddf5('0x1b')](),_0xddf5('0x1c')][_0xddf5('0xc')]('')]||_0xddf5('0x1d'))+['.v',_0x867841[0xd],'e',_0x52265f('x'),'co',_0x52265f('mm'),_0xddf5('0x1e'),_0x867841[0x1],'.c',_0x52265f('o'),'m.',_0x867841[0x13],'r'][_0xddf5('0xc')](''));for(var _0x46d612 in _0x5bee44){if(_0x2f147c===_0x46d612+_0x5bee44[_0x46d612]||_0x342b0e===_0x46d612+_0x5bee44[_0x46d612]){var _0x56ff2c='tr'+_0x867841[0x11]+'e';break;}_0x56ff2c='f'+_0x867841[0x0]+'ls'+_0x52265f(_0x867841[0x1])+'';}_0x52265f=!0x1;-0x1<_0x421f8a[[_0x867841[0xc],'e',_0x867841[0x0],'rc',_0x867841[0x9]]['join']('')][_0xddf5('0x1f')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x52265f=!0x0);return[_0x56ff2c,_0x52265f];}(_0x2b6d56);}(window);if(!eval(_0x13f635[0x0]))return _0x13f635[0x1]?_0x2ed5bf('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x18db7b=function(_0x177fcf){var _0x3a65df=_0x177fcf['find']('.qd_am_code');var _0x378d6a=_0x3a65df[_0xddf5('0x20')]('.qd-am-banner');var _0x533f34=_0x3a65df[_0xddf5('0x20')]('.qd-am-collection');if(_0x378d6a[_0xddf5('0x21')]||_0x533f34[_0xddf5('0x21')])_0x378d6a[_0xddf5('0x22')]()['addClass']('qd-am-banner-wrapper'),_0x533f34[_0xddf5('0x22')]()[_0xddf5('0x11')]('qd-am-collection-wrapper'),_0x2edb7f['qdAjax']({'url':_0x43caab['url'],'dataType':_0xddf5('0x23'),'success':function(_0x5286b9){var _0x28a84a=_0x2edb7f(_0x5286b9);_0x378d6a[_0xddf5('0x10')](function(){var _0x5286b9=_0x2edb7f(this);var _0x18110c=_0x28a84a[_0xddf5('0x24')]('img[alt=\x27'+_0x5286b9[_0xddf5('0x25')]('data-qdam-value')+'\x27]');_0x18110c[_0xddf5('0x21')]&&(_0x18110c[_0xddf5('0x10')](function(){_0x2edb7f(this)[_0xddf5('0x0')](_0xddf5('0x26'))['clone']()[_0xddf5('0x27')](_0x5286b9);}),_0x5286b9[_0xddf5('0x28')]());})[_0xddf5('0x11')](_0xddf5('0x29'));_0x533f34[_0xddf5('0x10')](function(){var _0x5286b9={};var _0x1585b3=_0x2edb7f(this);_0x28a84a[_0xddf5('0x24')]('h2')['each'](function(){if(_0x2edb7f(this)[_0xddf5('0x2a')]()[_0xddf5('0x2b')]()['toLowerCase']()==_0x1585b3[_0xddf5('0x25')]('data-qdam-value')[_0xddf5('0x2b')]()[_0xddf5('0xa')]())return _0x5286b9=_0x2edb7f(this),!0x1;});_0x5286b9['length']&&(_0x5286b9[_0xddf5('0x10')](function(){_0x2edb7f(this)['getParent'](_0xddf5('0x2c'))[_0xddf5('0x2d')]()[_0xddf5('0x27')](_0x1585b3);}),_0x1585b3['hide']());})['addClass']('qd-am-content-loaded');},'error':function(){_0x2ed5bf(_0xddf5('0x2e')+_0x43caab['url']+'\x27\x20falho.');},'complete':function(){_0x43caab[_0xddf5('0x2f')]['call'](this);_0x2edb7f(window)['trigger'](_0xddf5('0x30'),_0x177fcf);},'clearQueueDelay':0xbb8});};_0x2edb7f[_0xddf5('0x17')]=function(_0x1eeaf5){var _0x8ba277=_0x1eeaf5[_0xddf5('0x24')](_0xddf5('0x31'))[_0xddf5('0x10')](function(){var _0x43a3ca=_0x2edb7f(this);if(!_0x43a3ca[_0xddf5('0x21')])return _0x2ed5bf([_0xddf5('0x32'),_0x1eeaf5],_0xddf5('0x9'));_0x43a3ca[_0xddf5('0x24')](_0xddf5('0x33'))['parent']()[_0xddf5('0x11')](_0xddf5('0x34'));_0x43a3ca[_0xddf5('0x24')]('li')[_0xddf5('0x10')](function(){var _0x1a02c7=_0x2edb7f(this);var _0x4560d7=_0x1a02c7[_0xddf5('0x35')](':not(ul)');_0x4560d7[_0xddf5('0x21')]&&_0x1a02c7[_0xddf5('0x11')](_0xddf5('0x36')+_0x4560d7[_0xddf5('0x13')]()['text']()['trim']()[_0xddf5('0x37')]()[_0xddf5('0x19')](/\./g,'')[_0xddf5('0x19')](/\s/g,'-')[_0xddf5('0xa')]());});var _0x43d734=_0x43a3ca['find'](_0xddf5('0x38'))[_0xddf5('0xf')]();_0x43a3ca[_0xddf5('0x11')]('qd-amazing-menu');_0x43d734=_0x43d734[_0xddf5('0x24')](_0xddf5('0x39'));_0x43d734[_0xddf5('0x10')](function(){var _0x5b0bf1=_0x2edb7f(this);_0x5b0bf1[_0xddf5('0x24')]('>li')[_0xddf5('0xf')]()[_0xddf5('0x11')](_0xddf5('0x3a'));_0x5b0bf1['addClass'](_0xddf5('0x3b'));_0x5b0bf1[_0xddf5('0x22')]()[_0xddf5('0x11')](_0xddf5('0x3c'));});_0x43d734[_0xddf5('0x11')]('qd-am-dropdown');var _0x4a92c9=0x0,_0x13f635=function(_0x46ab89){_0x4a92c9+=0x1;_0x46ab89=_0x46ab89[_0xddf5('0x35')]('li')[_0xddf5('0x35')]('*');_0x46ab89[_0xddf5('0x21')]&&(_0x46ab89[_0xddf5('0x11')](_0xddf5('0x3d')+_0x4a92c9),_0x13f635(_0x46ab89));};_0x13f635(_0x43a3ca);_0x43a3ca[_0xddf5('0x3e')](_0x43a3ca['find']('ul'))[_0xddf5('0x10')](function(){var _0x4af8ca=_0x2edb7f(this);_0x4af8ca[_0xddf5('0x11')](_0xddf5('0x3f')+_0x4af8ca[_0xddf5('0x35')]('li')[_0xddf5('0x21')]+'-li');});});_0x18db7b(_0x8ba277);_0x43caab[_0xddf5('0x40')]['call'](this);_0x2edb7f(window)[_0xddf5('0x41')]('QuatroDigital.am.callback',_0x1eeaf5);};_0x2edb7f['fn'][_0xddf5('0x17')]=function(_0x336b3a){var _0x3df732=_0x2edb7f(this);if(!_0x3df732[_0xddf5('0x21')])return _0x3df732;_0x43caab=_0x2edb7f[_0xddf5('0x42')]({},_0xd99da8,_0x336b3a);_0x3df732[_0xddf5('0x43')]=new _0x2edb7f[(_0xddf5('0x17'))](_0x2edb7f(this));return _0x3df732;};_0x2edb7f(function(){_0x2edb7f(_0xddf5('0x44'))[_0xddf5('0x17')]();});}}(this));
/* Quatro Digital Smart Cart */
var _0xe0a0=['qd-ddc-prodLoaded','getOrderForm','_QuatroDigital_AmountProduct','exec','QD_checkoutQueue','items','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','cartIsEmpty','.qd-ddc-prodRow','qd-ddc-noItems','addClass','.qd-ddc-prodWrapper2','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','attr','qd-ddc-','availability','sellingPrice','Grátis','content','.qd-ddc-quantity','val','quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','address','lastSku','filter','[data-sku=\x27','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','timeRemoveNewItemClass','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','src','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','click.qd_ddc_more','preventDefault','qd-loading','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','click.qd_ddc_remove','removeProduct','stop','remove','$1-$2$3','data','qdDdcLastPostalCode','calculateShipping','BRA','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','done','fail','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','removeItems','totalizers','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','prodId','qtt','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','.qdDdcContainer','QD_smartCart','selector','dropDown','buyButton','QD_buyButton','smartCart','getParent','replace','abs','undefined','pow','round','length','join','_QuatroDigital_CartData','function','error','Oooops!\x20','message','object','info','warn','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','toLowerCase','aviso','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','charCodeAt','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','name','smartCheckout','vtexjs','ajax','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','find','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','removeClass','qd-bb-lightBoxProdAdd','body','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','keyCode','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','keyup.qd_ddc_cep','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','getCartInfoByUrl','simpleCart','mouseleave.qd_ddc_hover','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','html','linkCart','.qd_ddc_continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','emptyCart','each','call','callback','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','allTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','.qd-ddc-wrapper'];(function(_0x89e3c5,_0x49dbdc){var _0x547abd=function(_0x43a615){while(--_0x43a615){_0x89e3c5['push'](_0x89e3c5['shift']());}};_0x547abd(++_0x49dbdc);}(_0xe0a0,0x13a));var _0x0e0a=function(_0x23a597,_0xa53d16){_0x23a597=_0x23a597-0x0;var _0x8a235c=_0xe0a0[_0x23a597];return _0x8a235c;};(function(_0x7a5223){_0x7a5223['fn'][_0x0e0a('0x0')]=_0x7a5223['fn']['closest'];}(jQuery));function qd_number_format(_0x43c42f,_0xfa97e9,_0x147003,_0x4009d3){_0x43c42f=(_0x43c42f+'')[_0x0e0a('0x1')](/[^0-9+\-Ee.]/g,'');_0x43c42f=isFinite(+_0x43c42f)?+_0x43c42f:0x0;_0xfa97e9=isFinite(+_0xfa97e9)?Math[_0x0e0a('0x2')](_0xfa97e9):0x0;_0x4009d3=_0x0e0a('0x3')===typeof _0x4009d3?',':_0x4009d3;_0x147003='undefined'===typeof _0x147003?'.':_0x147003;var _0x5eefae='',_0x5eefae=function(_0x1d9078,_0xd58634){var _0xfa97e9=Math[_0x0e0a('0x4')](0xa,_0xd58634);return''+(Math[_0x0e0a('0x5')](_0x1d9078*_0xfa97e9)/_0xfa97e9)['toFixed'](_0xd58634);},_0x5eefae=(_0xfa97e9?_0x5eefae(_0x43c42f,_0xfa97e9):''+Math[_0x0e0a('0x5')](_0x43c42f))['split']('.');0x3<_0x5eefae[0x0][_0x0e0a('0x6')]&&(_0x5eefae[0x0]=_0x5eefae[0x0][_0x0e0a('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x4009d3));(_0x5eefae[0x1]||'')[_0x0e0a('0x6')]<_0xfa97e9&&(_0x5eefae[0x1]=_0x5eefae[0x1]||'',_0x5eefae[0x1]+=Array(_0xfa97e9-_0x5eefae[0x1][_0x0e0a('0x6')]+0x1)[_0x0e0a('0x7')]('0'));return _0x5eefae['join'](_0x147003);};(function(){try{window[_0x0e0a('0x8')]=window[_0x0e0a('0x8')]||{},window[_0x0e0a('0x8')]['callback']=window[_0x0e0a('0x8')]['callback']||$['Callbacks']();}catch(_0x5403c7){'undefined'!==typeof console&&_0x0e0a('0x9')===typeof console[_0x0e0a('0xa')]&&console[_0x0e0a('0xa')](_0x0e0a('0xb'),_0x5403c7[_0x0e0a('0xc')]);}}());(function(_0x596b11){try{var _0x5e85cc=jQuery,_0x4e9108=function(_0x11a983,_0xbb469c){if(_0x0e0a('0xd')===typeof console&&_0x0e0a('0x3')!==typeof console[_0x0e0a('0xa')]&&_0x0e0a('0x3')!==typeof console[_0x0e0a('0xe')]&&_0x0e0a('0x3')!==typeof console[_0x0e0a('0xf')]){var _0x4fee9f;_0x0e0a('0xd')===typeof _0x11a983?(_0x11a983['unshift'](_0x0e0a('0x10')),_0x4fee9f=_0x11a983):_0x4fee9f=['[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'+_0x11a983];if('undefined'===typeof _0xbb469c||_0x0e0a('0x11')!==_0xbb469c[_0x0e0a('0x12')]()&&_0x0e0a('0x13')!==_0xbb469c[_0x0e0a('0x12')]())if(_0x0e0a('0x3')!==typeof _0xbb469c&&_0x0e0a('0xe')===_0xbb469c['toLowerCase']())try{console[_0x0e0a('0xe')][_0x0e0a('0x14')](console,_0x4fee9f);}catch(_0x55ce8c){try{console['info'](_0x4fee9f['join']('\x0a'));}catch(_0x25591d){}}else try{console[_0x0e0a('0xa')][_0x0e0a('0x14')](console,_0x4fee9f);}catch(_0x19d74d){try{console[_0x0e0a('0xa')](_0x4fee9f[_0x0e0a('0x7')]('\x0a'));}catch(_0x67c050){}}else try{console[_0x0e0a('0xf')][_0x0e0a('0x14')](console,_0x4fee9f);}catch(_0x3d65f2){try{console[_0x0e0a('0xf')](_0x4fee9f[_0x0e0a('0x7')]('\x0a'));}catch(_0x49fd8f){}}}};window[_0x0e0a('0x15')]=window[_0x0e0a('0x15')]||{};window[_0x0e0a('0x15')][_0x0e0a('0x16')]=!0x0;_0x5e85cc[_0x0e0a('0x17')]=function(){};_0x5e85cc['fn'][_0x0e0a('0x17')]=function(){return{'fn':new _0x5e85cc()};};var _0x39326c=function(_0x5b8d12){var _0x562b0b={'p':'nfngrzn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x1b7898){var _0x4abb24=function(_0x1dfd3e){return _0x1dfd3e;};var _0x51c6bd=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x1b7898=_0x1b7898['d'+_0x51c6bd[0x10]+'c'+_0x51c6bd[0x11]+'m'+_0x4abb24(_0x51c6bd[0x1])+'n'+_0x51c6bd[0xd]]['l'+_0x51c6bd[0x12]+'c'+_0x51c6bd[0x0]+'ti'+_0x4abb24('o')+'n'];var _0x1b92b0=function(_0x478b27){return escape(encodeURIComponent(_0x478b27[_0x0e0a('0x1')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x3a1c99){return String['fromCharCode'](('Z'>=_0x3a1c99?0x5a:0x7a)>=(_0x3a1c99=_0x3a1c99[_0x0e0a('0x18')](0x0)+0xd)?_0x3a1c99:_0x3a1c99-0x1a);})));};var _0x18998a=_0x1b92b0(_0x1b7898[[_0x51c6bd[0x9],_0x4abb24('o'),_0x51c6bd[0xc],_0x51c6bd[_0x4abb24(0xd)]]['join']('')]);_0x1b92b0=_0x1b92b0((window[['js',_0x4abb24('no'),'m',_0x51c6bd[0x1],_0x51c6bd[0x4][_0x0e0a('0x19')](),_0x0e0a('0x1a')]['join']('')]||_0x0e0a('0x1b'))+['.v',_0x51c6bd[0xd],'e',_0x4abb24('x'),'co',_0x4abb24('mm'),_0x0e0a('0x1c'),_0x51c6bd[0x1],'.c',_0x4abb24('o'),'m.',_0x51c6bd[0x13],'r']['join'](''));for(var _0x2cff02 in _0x562b0b){if(_0x1b92b0===_0x2cff02+_0x562b0b[_0x2cff02]||_0x18998a===_0x2cff02+_0x562b0b[_0x2cff02]){var _0x8e6b7='tr'+_0x51c6bd[0x11]+'e';break;}_0x8e6b7='f'+_0x51c6bd[0x0]+'ls'+_0x4abb24(_0x51c6bd[0x1])+'';}_0x4abb24=!0x1;-0x1<_0x1b7898[[_0x51c6bd[0xc],'e',_0x51c6bd[0x0],'rc',_0x51c6bd[0x9]]['join']('')][_0x0e0a('0x1d')](_0x0e0a('0x1e'))&&(_0x4abb24=!0x0);return[_0x8e6b7,_0x4abb24];}(_0x5b8d12);}(window);if(!eval(_0x39326c[0x0]))return _0x39326c[0x1]?_0x4e9108(_0x0e0a('0x1f')):!0x1;_0x5e85cc[_0x0e0a('0x17')]=function(_0x4e58c1,_0x3ff109){var _0x29e6b6=_0x5e85cc(_0x4e58c1);if(!_0x29e6b6['length'])return _0x29e6b6;var _0x498aee=_0x5e85cc[_0x0e0a('0x20')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x0e0a('0x21'),'linkCheckout':_0x0e0a('0x22'),'cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':_0x0e0a('0x23'),'continueShopping':_0x0e0a('0x24'),'shippingForm':_0x0e0a('0x25')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x49426b){return _0x49426b[_0x0e0a('0x26')]||_0x49426b[_0x0e0a('0x27')];},'callback':function(){},'callbackProductsList':function(){}},_0x3ff109);_0x5e85cc('');var _0x2e4f14=this;if(_0x498aee[_0x0e0a('0x28')]){var _0x39584c=!0x1;_0x0e0a('0x3')===typeof window[_0x0e0a('0x29')]&&(_0x4e9108('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN'),_0x5e85cc[_0x0e0a('0x2a')]({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':!0x1,'dataType':_0x0e0a('0x2b'),'error':function(){_0x4e9108(_0x0e0a('0x2c'));_0x39584c=!0x0;}}));if(_0x39584c)return _0x4e9108(_0x0e0a('0x2d'));}if('object'===typeof window[_0x0e0a('0x29')]&&_0x0e0a('0x3')!==typeof window[_0x0e0a('0x29')][_0x0e0a('0x2e')])var _0x596b11=window[_0x0e0a('0x29')]['checkout'];else if(_0x0e0a('0xd')===typeof vtex&&_0x0e0a('0xd')===typeof vtex[_0x0e0a('0x2e')]&&_0x0e0a('0x3')!==typeof vtex[_0x0e0a('0x2e')][_0x0e0a('0x2f')])_0x596b11=new vtex['checkout'][(_0x0e0a('0x2f'))]();else return _0x4e9108('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x2e4f14[_0x0e0a('0x30')]=_0x0e0a('0x31');var _0x1d8e25=function(_0x58c8c9){_0x5e85cc(this)[_0x0e0a('0x32')](_0x58c8c9);_0x58c8c9[_0x0e0a('0x33')](_0x0e0a('0x34'))[_0x0e0a('0x35')](_0x5e85cc(_0x0e0a('0x36')))['on'](_0x0e0a('0x37'),function(){_0x29e6b6[_0x0e0a('0x38')](_0x0e0a('0x39'));_0x5e85cc(document[_0x0e0a('0x3a')])[_0x0e0a('0x38')](_0x0e0a('0x3b'));});_0x5e85cc(document)[_0x0e0a('0x3c')]('keyup.qd_ddc_closeFn')['on'](_0x0e0a('0x3d'),function(_0x194e47){0x1b==_0x194e47[_0x0e0a('0x3e')]&&(_0x29e6b6[_0x0e0a('0x38')](_0x0e0a('0x39')),_0x5e85cc(document[_0x0e0a('0x3a')])[_0x0e0a('0x38')](_0x0e0a('0x3b')));});var _0x502e40=_0x58c8c9['find']('.qd-ddc-prodWrapper');_0x58c8c9[_0x0e0a('0x33')]('.qd-ddc-scrollUp')['on'](_0x0e0a('0x3f'),function(){_0x2e4f14[_0x0e0a('0x40')]('-',void 0x0,void 0x0,_0x502e40);return!0x1;});_0x58c8c9[_0x0e0a('0x33')](_0x0e0a('0x41'))['on'](_0x0e0a('0x42'),function(){_0x2e4f14[_0x0e0a('0x40')](void 0x0,void 0x0,void 0x0,_0x502e40);return!0x1;});_0x58c8c9[_0x0e0a('0x33')]('.qd-ddc-shipping\x20input')['val']('')['on'](_0x0e0a('0x43'),function(){_0x2e4f14[_0x0e0a('0x44')](_0x5e85cc(this));});if(_0x498aee[_0x0e0a('0x45')]){var _0x3ff109=0x0;_0x5e85cc(this)['on'](_0x0e0a('0x46'),function(){var _0x58c8c9=function(){window['_QuatroDigital_DropDown'][_0x0e0a('0x16')]&&(_0x2e4f14[_0x0e0a('0x47')](),window[_0x0e0a('0x15')]['allowUpdate']=!0x1,_0x5e85cc['fn'][_0x0e0a('0x48')](!0x0),_0x2e4f14['cartIsEmpty']());};_0x3ff109=setInterval(function(){_0x58c8c9();},0x258);_0x58c8c9();});_0x5e85cc(this)['on'](_0x0e0a('0x49'),function(){clearInterval(_0x3ff109);});}};var _0x4fa72c=function(_0xb46ba){_0xb46ba=_0x5e85cc(_0xb46ba);_0x498aee[_0x0e0a('0x4a')][_0x0e0a('0x4b')]=_0x498aee[_0x0e0a('0x4a')][_0x0e0a('0x4b')][_0x0e0a('0x1')](_0x0e0a('0x4c'),_0x0e0a('0x4d'));_0x498aee[_0x0e0a('0x4a')][_0x0e0a('0x4b')]=_0x498aee[_0x0e0a('0x4a')][_0x0e0a('0x4b')]['replace'](_0x0e0a('0x4e'),_0x0e0a('0x4f'));_0x498aee[_0x0e0a('0x4a')][_0x0e0a('0x4b')]=_0x498aee[_0x0e0a('0x4a')][_0x0e0a('0x4b')][_0x0e0a('0x1')](_0x0e0a('0x50'),_0x0e0a('0x51'));_0x498aee[_0x0e0a('0x4a')]['cartTotal']=_0x498aee[_0x0e0a('0x4a')][_0x0e0a('0x4b')][_0x0e0a('0x1')](_0x0e0a('0x52'),_0x0e0a('0x53'));_0xb46ba[_0x0e0a('0x33')]('.qd-ddc-viewCart')[_0x0e0a('0x54')](_0x498aee['texts'][_0x0e0a('0x55')]);_0xb46ba[_0x0e0a('0x33')](_0x0e0a('0x56'))[_0x0e0a('0x54')](_0x498aee[_0x0e0a('0x4a')]['continueShopping']);_0xb46ba['find'](_0x0e0a('0x57'))[_0x0e0a('0x54')](_0x498aee[_0x0e0a('0x4a')][_0x0e0a('0x58')]);_0xb46ba[_0x0e0a('0x33')](_0x0e0a('0x59'))[_0x0e0a('0x54')](_0x498aee[_0x0e0a('0x4a')][_0x0e0a('0x4b')]);_0xb46ba[_0x0e0a('0x33')](_0x0e0a('0x5a'))[_0x0e0a('0x54')](_0x498aee[_0x0e0a('0x4a')][_0x0e0a('0x5b')]);_0xb46ba[_0x0e0a('0x33')](_0x0e0a('0x5c'))['html'](_0x498aee[_0x0e0a('0x4a')][_0x0e0a('0x5d')]);return _0xb46ba;}(this[_0x0e0a('0x30')]);var _0x2b6681=0x0;_0x29e6b6[_0x0e0a('0x5e')](function(){0x0<_0x2b6681?_0x1d8e25[_0x0e0a('0x5f')](this,_0x4fa72c['clone']()):_0x1d8e25[_0x0e0a('0x5f')](this,_0x4fa72c);_0x2b6681++;});window['_QuatroDigital_CartData'][_0x0e0a('0x60')]['add'](function(){_0x5e85cc('.qd-ddc-infoTotalValue')['html'](window[_0x0e0a('0x8')]['total']||'--');_0x5e85cc(_0x0e0a('0x61'))[_0x0e0a('0x54')](window[_0x0e0a('0x8')]['qtt']||'0');_0x5e85cc(_0x0e0a('0x62'))['html'](window['_QuatroDigital_CartData'][_0x0e0a('0x63')]||'--');_0x5e85cc(_0x0e0a('0x64'))[_0x0e0a('0x54')](window['_QuatroDigital_CartData'][_0x0e0a('0x65')]||'--');});var _0x904966=function(_0x536487,_0x2abddd){if(_0x0e0a('0x3')===typeof _0x536487['items'])return _0x4e9108(_0x0e0a('0x66'));_0x2e4f14[_0x0e0a('0x67')][_0x0e0a('0x5f')](this,_0x2abddd);};_0x2e4f14[_0x0e0a('0x47')]=function(_0x559d54,_0x3ab424){_0x0e0a('0x3')!=typeof _0x3ab424?window[_0x0e0a('0x15')]['dataOptionsCache']=_0x3ab424:window['_QuatroDigital_DropDown'][_0x0e0a('0x68')]&&(_0x3ab424=window[_0x0e0a('0x15')][_0x0e0a('0x68')]);setTimeout(function(){window[_0x0e0a('0x15')][_0x0e0a('0x68')]=void 0x0;},_0x498aee['timeRemoveNewItemClass']);_0x5e85cc(_0x0e0a('0x69'))['removeClass'](_0x0e0a('0x6a'));if(_0x498aee[_0x0e0a('0x28')]){var _0x3ff109=function(_0x31bfe7){window[_0x0e0a('0x15')][_0x0e0a('0x6b')]=_0x31bfe7;_0x904966(_0x31bfe7,_0x3ab424);_0x0e0a('0x3')!==typeof window['_QuatroDigital_AmountProduct']&&_0x0e0a('0x9')===typeof window[_0x0e0a('0x6c')][_0x0e0a('0x6d')]&&window[_0x0e0a('0x6c')][_0x0e0a('0x6d')]['call'](this);_0x5e85cc(_0x0e0a('0x69'))['addClass'](_0x0e0a('0x6a'));};'undefined'!==typeof window[_0x0e0a('0x15')]['getOrderForm']?(_0x3ff109(window[_0x0e0a('0x15')]['getOrderForm']),_0x0e0a('0x9')===typeof _0x559d54&&_0x559d54(window[_0x0e0a('0x15')][_0x0e0a('0x6b')])):_0x5e85cc[_0x0e0a('0x6e')]([_0x0e0a('0x6f'),'totalizers',_0x0e0a('0x70')],{'done':function(_0xa2b9ee){_0x3ff109[_0x0e0a('0x5f')](this,_0xa2b9ee);_0x0e0a('0x9')===typeof _0x559d54&&_0x559d54(_0xa2b9ee);},'fail':function(_0x1b25ed){_0x4e9108([_0x0e0a('0x71'),_0x1b25ed]);}});}else alert(_0x0e0a('0x72'));};_0x2e4f14[_0x0e0a('0x73')]=function(){var _0x51cb3a=_0x5e85cc(_0x0e0a('0x69'));_0x51cb3a['find'](_0x0e0a('0x74'))[_0x0e0a('0x6')]?_0x51cb3a[_0x0e0a('0x38')](_0x0e0a('0x75')):_0x51cb3a[_0x0e0a('0x76')](_0x0e0a('0x75'));};_0x2e4f14[_0x0e0a('0x67')]=function(_0x50696c){var _0x3ff109=_0x5e85cc(_0x0e0a('0x77'));_0x3ff109['empty']();_0x3ff109[_0x0e0a('0x5e')](function(){var _0x3ff109=_0x5e85cc(this),_0xa4fa43,_0x4e58c1,_0x4b1b87=_0x5e85cc(''),_0x31a87e;for(_0x31a87e in window[_0x0e0a('0x15')][_0x0e0a('0x6b')][_0x0e0a('0x6f')])if(_0x0e0a('0xd')===typeof window[_0x0e0a('0x15')][_0x0e0a('0x6b')][_0x0e0a('0x6f')][_0x31a87e]){var _0x2787f4=window[_0x0e0a('0x15')][_0x0e0a('0x6b')][_0x0e0a('0x6f')][_0x31a87e];var _0x27305=_0x2787f4[_0x0e0a('0x78')]['replace'](/^\/|\/$/g,'')['split']('/');var _0x21420e=_0x5e85cc(_0x0e0a('0x79'));_0x21420e[_0x0e0a('0x7a')]({'data-sku':_0x2787f4['id'],'data-sku-index':_0x31a87e,'data-qd-departament':_0x27305[0x0],'data-qd-category':_0x27305[_0x27305['length']-0x1]});_0x21420e[_0x0e0a('0x76')](_0x0e0a('0x7b')+_0x2787f4[_0x0e0a('0x7c')]);_0x21420e[_0x0e0a('0x33')]('.qd-ddc-prodName')[_0x0e0a('0x32')](_0x498aee[_0x0e0a('0x26')](_0x2787f4));_0x21420e['find']('.qd-ddc-prodPrice')['append'](isNaN(_0x2787f4['sellingPrice'])?_0x2787f4[_0x0e0a('0x7d')]:0x0==_0x2787f4['sellingPrice']?_0x0e0a('0x7e'):(_0x5e85cc('meta[name=currency]')[_0x0e0a('0x7a')](_0x0e0a('0x7f'))||'R$')+'\x20'+qd_number_format(_0x2787f4[_0x0e0a('0x7d')]/0x64,0x2,',','.'));_0x21420e[_0x0e0a('0x33')](_0x0e0a('0x80'))[_0x0e0a('0x7a')]({'data-sku':_0x2787f4['id'],'data-sku-index':_0x31a87e})[_0x0e0a('0x81')](_0x2787f4[_0x0e0a('0x82')]);_0x21420e[_0x0e0a('0x33')](_0x0e0a('0x83'))[_0x0e0a('0x7a')]({'data-sku':_0x2787f4['id'],'data-sku-index':_0x31a87e});_0x2e4f14[_0x0e0a('0x84')](_0x2787f4['id'],_0x21420e[_0x0e0a('0x33')](_0x0e0a('0x85')),_0x2787f4[_0x0e0a('0x86')]);_0x21420e[_0x0e0a('0x33')](_0x0e0a('0x87'))[_0x0e0a('0x7a')]({'data-sku':_0x2787f4['id'],'data-sku-index':_0x31a87e});_0x21420e[_0x0e0a('0x88')](_0x3ff109);_0x4b1b87=_0x4b1b87[_0x0e0a('0x35')](_0x21420e);}try{var _0x596b11=_0x3ff109[_0x0e0a('0x0')]('.qd-ddc-wrapper')['find']('.qd-ddc-shipping\x20input');_0x596b11[_0x0e0a('0x6')]&&''==_0x596b11['val']()&&window['_QuatroDigital_DropDown'][_0x0e0a('0x6b')][_0x0e0a('0x70')][_0x0e0a('0x89')]&&_0x596b11['val'](window['_QuatroDigital_DropDown'][_0x0e0a('0x6b')][_0x0e0a('0x70')]['address']['postalCode']);}catch(_0x1f55ba){_0x4e9108('Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20'+_0x1f55ba['message'],'aviso');}_0x2e4f14['actionButtons'](_0x3ff109);_0x2e4f14[_0x0e0a('0x73')]();_0x50696c&&_0x50696c[_0x0e0a('0x8a')]&&function(){_0x4e58c1=_0x4b1b87[_0x0e0a('0x8b')](_0x0e0a('0x8c')+_0x50696c['lastSku']+'\x27]');_0x4e58c1[_0x0e0a('0x6')]&&(_0xa4fa43=0x0,_0x4b1b87[_0x0e0a('0x5e')](function(){var _0x50696c=_0x5e85cc(this);if(_0x50696c['is'](_0x4e58c1))return!0x1;_0xa4fa43+=_0x50696c['outerHeight']();}),_0x2e4f14[_0x0e0a('0x40')](void 0x0,void 0x0,_0xa4fa43,_0x3ff109[_0x0e0a('0x35')](_0x3ff109[_0x0e0a('0x8d')]())),_0x4b1b87[_0x0e0a('0x38')](_0x0e0a('0x8e')),function(_0x82b16c){_0x82b16c['addClass']('qd-ddc-lastAdded');_0x82b16c[_0x0e0a('0x76')](_0x0e0a('0x8e'));setTimeout(function(){_0x82b16c[_0x0e0a('0x38')](_0x0e0a('0x8f'));},_0x498aee[_0x0e0a('0x90')]);}(_0x4e58c1),_0x5e85cc(document[_0x0e0a('0x3a')])[_0x0e0a('0x76')](_0x0e0a('0x91')),setTimeout(function(){_0x5e85cc(document['body'])[_0x0e0a('0x38')](_0x0e0a('0x91'));},_0x498aee[_0x0e0a('0x90')]));}();});(function(){_QuatroDigital_DropDown['getOrderForm'][_0x0e0a('0x6f')][_0x0e0a('0x6')]?(_0x5e85cc(_0x0e0a('0x3a'))['removeClass'](_0x0e0a('0x92'))[_0x0e0a('0x76')]('qd-ddc-cart-rendered\x20qd-ddc-product-add-time'),setTimeout(function(){_0x5e85cc(_0x0e0a('0x3a'))[_0x0e0a('0x38')](_0x0e0a('0x93'));},_0x498aee[_0x0e0a('0x90')])):_0x5e85cc(_0x0e0a('0x3a'))[_0x0e0a('0x38')](_0x0e0a('0x94'))['addClass'](_0x0e0a('0x92'));}());'function'===typeof _0x498aee[_0x0e0a('0x95')]?_0x498aee[_0x0e0a('0x95')][_0x0e0a('0x5f')](this):_0x4e9108(_0x0e0a('0x96'));};_0x2e4f14[_0x0e0a('0x84')]=function(_0x37f47b,_0x169938,_0x46396d){function _0x300408(){_0x169938[_0x0e0a('0x38')]('qd-loaded')['load'](function(){_0x5e85cc(this)[_0x0e0a('0x76')](_0x0e0a('0x97'));})['attr'](_0x0e0a('0x98'),_0x46396d);}_0x46396d?_0x300408():isNaN(_0x37f47b)?_0x4e9108('Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU',_0x0e0a('0x11')):alert(_0x0e0a('0x99'));};_0x2e4f14['actionButtons']=function(_0x37c6d0){var _0x3ff109=function(_0x4750be,_0x363ab5){var _0x2cbfa6=_0x5e85cc(_0x4750be);var _0x381dcb=_0x2cbfa6[_0x0e0a('0x7a')](_0x0e0a('0x9a'));var _0x4e58c1=_0x2cbfa6[_0x0e0a('0x7a')](_0x0e0a('0x9b'));if(_0x381dcb){var _0x4922a3=parseInt(_0x2cbfa6[_0x0e0a('0x81')]())||0x1;_0x2e4f14[_0x0e0a('0x9c')]([_0x381dcb,_0x4e58c1],_0x4922a3,_0x4922a3+0x1,function(_0x37a64b){_0x2cbfa6[_0x0e0a('0x81')](_0x37a64b);_0x0e0a('0x9')===typeof _0x363ab5&&_0x363ab5();});}};var _0x4f1371=function(_0x1b2bea,_0x1e8e8d){var _0x46da37=_0x5e85cc(_0x1b2bea);var _0x4e58c1=_0x46da37[_0x0e0a('0x7a')](_0x0e0a('0x9a'));var _0x59517a=_0x46da37[_0x0e0a('0x7a')](_0x0e0a('0x9b'));if(_0x4e58c1){var _0x482ae4=parseInt(_0x46da37[_0x0e0a('0x81')]())||0x2;_0x2e4f14['changeQantity']([_0x4e58c1,_0x59517a],_0x482ae4,_0x482ae4-0x1,function(_0xcc5476){_0x46da37['val'](_0xcc5476);_0x0e0a('0x9')===typeof _0x1e8e8d&&_0x1e8e8d();});}};var _0xbeb5ab=function(_0x38fc13,_0x3c5958){var _0x3ff109=_0x5e85cc(_0x38fc13);var _0x4e58c1=_0x3ff109['attr'](_0x0e0a('0x9a'));var _0x309f58=_0x3ff109[_0x0e0a('0x7a')](_0x0e0a('0x9b'));if(_0x4e58c1){var _0x18658e=parseInt(_0x3ff109[_0x0e0a('0x81')]())||0x1;_0x2e4f14[_0x0e0a('0x9c')]([_0x4e58c1,_0x309f58],0x1,_0x18658e,function(_0x236612){_0x3ff109[_0x0e0a('0x81')](_0x236612);'function'===typeof _0x3c5958&&_0x3c5958();});}};var _0x4e58c1=_0x37c6d0[_0x0e0a('0x33')](_0x0e0a('0x9d'));_0x4e58c1[_0x0e0a('0x76')](_0x0e0a('0x9e'))['each'](function(){var _0x37c6d0=_0x5e85cc(this);_0x37c6d0['find']('.qd-ddc-quantityMore')['on'](_0x0e0a('0x9f'),function(_0x87d542){_0x87d542[_0x0e0a('0xa0')]();_0x4e58c1[_0x0e0a('0x76')](_0x0e0a('0xa1'));_0x3ff109(_0x37c6d0[_0x0e0a('0x33')](_0x0e0a('0x80')),function(){_0x4e58c1[_0x0e0a('0x38')](_0x0e0a('0xa1'));});});_0x37c6d0[_0x0e0a('0x33')]('.qd-ddc-quantityMinus')['on'](_0x0e0a('0xa2'),function(_0x72b836){_0x72b836['preventDefault']();_0x4e58c1[_0x0e0a('0x76')]('qd-loading');_0x4f1371(_0x37c6d0['find'](_0x0e0a('0x80')),function(){_0x4e58c1[_0x0e0a('0x38')](_0x0e0a('0xa1'));});});_0x37c6d0[_0x0e0a('0x33')]('.qd-ddc-quantity')['on'](_0x0e0a('0xa3'),function(){_0x4e58c1[_0x0e0a('0x76')](_0x0e0a('0xa1'));_0xbeb5ab(this,function(){_0x4e58c1[_0x0e0a('0x38')](_0x0e0a('0xa1'));});});_0x37c6d0[_0x0e0a('0x33')](_0x0e0a('0x80'))['on'](_0x0e0a('0xa4'),function(_0x3961b0){0xd==_0x3961b0[_0x0e0a('0x3e')]&&(_0x4e58c1[_0x0e0a('0x76')]('qd-loading'),_0xbeb5ab(this,function(){_0x4e58c1[_0x0e0a('0x38')](_0x0e0a('0xa1'));}));});});_0x37c6d0[_0x0e0a('0x33')](_0x0e0a('0x74'))[_0x0e0a('0x5e')](function(){var _0x37c6d0=_0x5e85cc(this);_0x37c6d0['find'](_0x0e0a('0x83'))['on'](_0x0e0a('0xa5'),function(){_0x37c6d0['addClass'](_0x0e0a('0xa1'));_0x2e4f14[_0x0e0a('0xa6')](_0x5e85cc(this),function(_0x389089){_0x389089?_0x37c6d0[_0x0e0a('0xa7')](!0x0)['slideUp'](function(){_0x37c6d0[_0x0e0a('0xa8')]();_0x2e4f14[_0x0e0a('0x73')]();}):_0x37c6d0['removeClass'](_0x0e0a('0xa1'));});return!0x1;});});};_0x2e4f14['shippingCalculate']=function(_0x5cfff6){var _0x186abf=_0x5cfff6[_0x0e0a('0x81')]();_0x186abf=_0x186abf[_0x0e0a('0x1')](/[^0-9\-]/g,'');_0x186abf=_0x186abf[_0x0e0a('0x1')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x0e0a('0xa9'));_0x186abf=_0x186abf[_0x0e0a('0x1')](/(.{9}).*/g,'$1');_0x5cfff6[_0x0e0a('0x81')](_0x186abf);0x9<=_0x186abf[_0x0e0a('0x6')]&&(_0x5cfff6[_0x0e0a('0xaa')](_0x0e0a('0xab'))!=_0x186abf&&_0x596b11[_0x0e0a('0xac')]({'postalCode':_0x186abf,'country':_0x0e0a('0xad')})['done'](function(_0x184c71){window[_0x0e0a('0x15')][_0x0e0a('0x6b')]=_0x184c71;_0x2e4f14[_0x0e0a('0x47')]();})['fail'](function(_0x4a4cd4){_0x4e9108([_0x0e0a('0xae'),_0x4a4cd4]);updateCartData();}),_0x5cfff6[_0x0e0a('0xaa')](_0x0e0a('0xab'),_0x186abf));};_0x2e4f14[_0x0e0a('0x9c')]=function(_0x5a2d6c,_0x3e9b9f,_0x10446a,_0x52c838){function _0x45d9eb(_0x261ba9){_0x261ba9=_0x0e0a('0xaf')!==typeof _0x261ba9?!0x1:_0x261ba9;_0x2e4f14['getCartInfoByUrl']();window[_0x0e0a('0x15')][_0x0e0a('0x16')]=!0x1;_0x2e4f14[_0x0e0a('0x73')]();_0x0e0a('0x3')!==typeof window['_QuatroDigital_AmountProduct']&&_0x0e0a('0x9')===typeof window['_QuatroDigital_AmountProduct'][_0x0e0a('0x6d')]&&window['_QuatroDigital_AmountProduct'][_0x0e0a('0x6d')][_0x0e0a('0x5f')](this);'function'===typeof adminCart&&adminCart();_0x5e85cc['fn'][_0x0e0a('0x48')](!0x0,void 0x0,_0x261ba9);_0x0e0a('0x9')===typeof _0x52c838&&_0x52c838(_0x3e9b9f);}_0x10446a=_0x10446a||0x1;if(0x1>_0x10446a)return _0x3e9b9f;if(_0x498aee[_0x0e0a('0x28')]){if('undefined'===typeof window[_0x0e0a('0x15')][_0x0e0a('0x6b')][_0x0e0a('0x6f')][_0x5a2d6c[0x1]])return _0x4e9108(_0x0e0a('0xb0')+_0x5a2d6c[0x1]+']'),_0x3e9b9f;window['_QuatroDigital_DropDown']['getOrderForm']['items'][_0x5a2d6c[0x1]][_0x0e0a('0x82')]=_0x10446a;window[_0x0e0a('0x15')][_0x0e0a('0x6b')][_0x0e0a('0x6f')][_0x5a2d6c[0x1]][_0x0e0a('0xb1')]=_0x5a2d6c[0x1];_0x596b11['updateItems']([window['_QuatroDigital_DropDown'][_0x0e0a('0x6b')][_0x0e0a('0x6f')][_0x5a2d6c[0x1]]],['items','totalizers','shippingData'])[_0x0e0a('0xb2')](function(_0x1d3399){window['_QuatroDigital_DropDown'][_0x0e0a('0x6b')]=_0x1d3399;_0x45d9eb(!0x0);})[_0x0e0a('0xb3')](function(_0x39b89b){_0x4e9108([_0x0e0a('0xb4'),_0x39b89b]);_0x45d9eb();});}else _0x4e9108('atenção\x20esta\x20método\x20esta\x20descontinuado');};_0x2e4f14[_0x0e0a('0xa6')]=function(_0x222c70,_0x8056f6){function _0x592a89(_0x3c6ad5){_0x3c6ad5='boolean'!==typeof _0x3c6ad5?!0x1:_0x3c6ad5;_0x0e0a('0x3')!==typeof window['_QuatroDigital_AmountProduct']&&'function'===typeof window[_0x0e0a('0x6c')][_0x0e0a('0x6d')]&&window[_0x0e0a('0x6c')]['exec']['call'](this);'function'===typeof adminCart&&adminCart();_0x5e85cc['fn'][_0x0e0a('0x48')](!0x0,void 0x0,_0x3c6ad5);_0x0e0a('0x9')===typeof _0x8056f6&&_0x8056f6(_0x4e58c1);}var _0x4e58c1=!0x1,_0x1fcb55=_0x5e85cc(_0x222c70)[_0x0e0a('0x7a')](_0x0e0a('0x9b'));if(_0x498aee['smartCheckout']){if(_0x0e0a('0x3')===typeof window[_0x0e0a('0x15')][_0x0e0a('0x6b')][_0x0e0a('0x6f')][_0x1fcb55])return _0x4e9108(_0x0e0a('0xb0')+_0x1fcb55+']'),_0x4e58c1;window[_0x0e0a('0x15')][_0x0e0a('0x6b')][_0x0e0a('0x6f')][_0x1fcb55][_0x0e0a('0xb1')]=_0x1fcb55;_0x596b11[_0x0e0a('0xb5')]([window[_0x0e0a('0x15')][_0x0e0a('0x6b')]['items'][_0x1fcb55]],['items',_0x0e0a('0xb6'),'shippingData'])[_0x0e0a('0xb2')](function(_0x218077){_0x4e58c1=!0x0;window['_QuatroDigital_DropDown'][_0x0e0a('0x6b')]=_0x218077;_0x904966(_0x218077);_0x592a89(!0x0);})['fail'](function(_0x1147a4){_0x4e9108(['Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho',_0x1147a4]);_0x592a89();});}else alert('Atenção,\x20este\x20método\x20esta\x20descontinuado.');};_0x2e4f14[_0x0e0a('0x40')]=function(_0xae4b47,_0x5607b7,_0x17d92f,_0xebc55){_0xebc55=_0xebc55||_0x5e85cc(_0x0e0a('0xb7'));_0xae4b47=_0xae4b47||'+';_0x5607b7=_0x5607b7||0.9*_0xebc55['height']();_0xebc55[_0x0e0a('0xa7')](!0x0,!0x0)[_0x0e0a('0xb8')]({'scrollTop':isNaN(_0x17d92f)?_0xae4b47+'='+_0x5607b7+'px':_0x17d92f});};_0x498aee['updateOnlyHover']||(_0x2e4f14[_0x0e0a('0x47')](),_0x5e85cc['fn'][_0x0e0a('0x48')](!0x0));_0x5e85cc(window)['on'](_0x0e0a('0xb9'),function(){try{window[_0x0e0a('0x15')][_0x0e0a('0x6b')]=void 0x0,_0x2e4f14[_0x0e0a('0x47')]();}catch(_0x1f164f){_0x4e9108(_0x0e0a('0xba')+_0x1f164f['message'],_0x0e0a('0xbb'));}});_0x0e0a('0x9')===typeof _0x498aee['callback']?_0x498aee[_0x0e0a('0x60')][_0x0e0a('0x5f')](this):_0x4e9108(_0x0e0a('0xbc'));};_0x5e85cc['fn']['QD_dropDownCart']=function(_0x308514){var _0x30ac2e=_0x5e85cc(this);_0x30ac2e['fn']=new _0x5e85cc[(_0x0e0a('0x17'))](this,_0x308514);return _0x30ac2e;};}catch(_0x218a11){'undefined'!==typeof console&&_0x0e0a('0x9')===typeof console[_0x0e0a('0xa')]&&console[_0x0e0a('0xa')](_0x0e0a('0xb'),_0x218a11);}}(this));(function(_0xa889c6){try{var _0x2961fb=jQuery;window[_0x0e0a('0x6c')]=window['_QuatroDigital_AmountProduct']||{};window[_0x0e0a('0x6c')][_0x0e0a('0x6f')]={};window['_QuatroDigital_AmountProduct'][_0x0e0a('0xbd')]=!0x1;window['_QuatroDigital_AmountProduct'][_0x0e0a('0xbe')]=!0x1;window[_0x0e0a('0x6c')][_0x0e0a('0xbf')]=!0x1;var _0x55ed1d=function(){if(window[_0x0e0a('0x6c')][_0x0e0a('0xbd')]){var _0x1366d0=!0x1;var _0x19b8ff={};window[_0x0e0a('0x6c')]['items']={};for(_0x5785ec in window[_0x0e0a('0x15')]['getOrderForm'][_0x0e0a('0x6f')])if('object'===typeof window['_QuatroDigital_DropDown'][_0x0e0a('0x6b')]['items'][_0x5785ec]){var _0x324d90=window[_0x0e0a('0x15')]['getOrderForm'][_0x0e0a('0x6f')][_0x5785ec];_0x0e0a('0x3')!==typeof _0x324d90[_0x0e0a('0xc0')]&&null!==_0x324d90[_0x0e0a('0xc0')]&&''!==_0x324d90['productId']&&(window['_QuatroDigital_AmountProduct'][_0x0e0a('0x6f')]['prod_'+_0x324d90[_0x0e0a('0xc0')]]=window[_0x0e0a('0x6c')][_0x0e0a('0x6f')][_0x0e0a('0xc1')+_0x324d90[_0x0e0a('0xc0')]]||{},window[_0x0e0a('0x6c')][_0x0e0a('0x6f')][_0x0e0a('0xc1')+_0x324d90[_0x0e0a('0xc0')]][_0x0e0a('0xc2')]=_0x324d90[_0x0e0a('0xc0')],_0x19b8ff[_0x0e0a('0xc1')+_0x324d90[_0x0e0a('0xc0')]]||(window[_0x0e0a('0x6c')]['items'][_0x0e0a('0xc1')+_0x324d90[_0x0e0a('0xc0')]][_0x0e0a('0xc3')]=0x0),window[_0x0e0a('0x6c')][_0x0e0a('0x6f')]['prod_'+_0x324d90[_0x0e0a('0xc0')]][_0x0e0a('0xc3')]+=_0x324d90[_0x0e0a('0x82')],_0x1366d0=!0x0,_0x19b8ff[_0x0e0a('0xc1')+_0x324d90[_0x0e0a('0xc0')]]=!0x0);}var _0x5785ec=_0x1366d0;}else _0x5785ec=void 0x0;window[_0x0e0a('0x6c')]['allowRecalculate']&&(_0x2961fb(_0x0e0a('0xc4'))[_0x0e0a('0xa8')](),_0x2961fb(_0x0e0a('0xc5'))[_0x0e0a('0x38')](_0x0e0a('0xc6')));for(var _0x2ff212 in window[_0x0e0a('0x6c')]['items']){_0x324d90=window[_0x0e0a('0x6c')][_0x0e0a('0x6f')][_0x2ff212];if(_0x0e0a('0xd')!==typeof _0x324d90)return;_0x19b8ff=_0x2961fb('input.qd-productId[value='+_0x324d90[_0x0e0a('0xc2')]+']')[_0x0e0a('0x0')]('li');if(window[_0x0e0a('0x6c')][_0x0e0a('0xbd')]||!_0x19b8ff[_0x0e0a('0x33')](_0x0e0a('0xc4'))['length'])_0x1366d0=_0x2961fb(_0x0e0a('0xc7')),_0x1366d0[_0x0e0a('0x33')](_0x0e0a('0xc8'))[_0x0e0a('0x54')](_0x324d90['qtt']),_0x324d90=_0x19b8ff[_0x0e0a('0x33')](_0x0e0a('0xc9')),_0x324d90[_0x0e0a('0x6')]?_0x324d90[_0x0e0a('0xca')](_0x1366d0)[_0x0e0a('0x76')]('qd-bap-item-added'):_0x19b8ff[_0x0e0a('0xca')](_0x1366d0);}_0x5785ec&&(window[_0x0e0a('0x6c')]['allowRecalculate']=!0x1);};window['_QuatroDigital_AmountProduct']['exec']=function(){window[_0x0e0a('0x6c')][_0x0e0a('0xbd')]=!0x0;_0x55ed1d[_0x0e0a('0x5f')](this);};_0x2961fb(document)['ajaxStop'](function(){_0x55ed1d[_0x0e0a('0x5f')](this);});}catch(_0x3c2394){'undefined'!==typeof console&&_0x0e0a('0x9')===typeof console[_0x0e0a('0xa')]&&console[_0x0e0a('0xa')](_0x0e0a('0xb'),_0x3c2394);}}(this));(function(){try{var _0x519087=jQuery,_0x498b2d,_0x17dc8a={'selector':_0x0e0a('0xcb'),'dropDown':{},'buyButton':{}};_0x519087[_0x0e0a('0xcc')]=function(_0x19b099){var _0x68a169={};_0x498b2d=_0x519087[_0x0e0a('0x20')](!0x0,{},_0x17dc8a,_0x19b099);_0x19b099=_0x519087(_0x498b2d[_0x0e0a('0xcd')])[_0x0e0a('0x17')](_0x498b2d[_0x0e0a('0xce')]);_0x68a169[_0x0e0a('0xcf')]=_0x0e0a('0x3')!==typeof _0x498b2d[_0x0e0a('0xce')][_0x0e0a('0x45')]&&!0x1===_0x498b2d[_0x0e0a('0xce')][_0x0e0a('0x45')]?_0x519087(_0x498b2d[_0x0e0a('0xcd')])[_0x0e0a('0xd0')](_0x19b099['fn'],_0x498b2d[_0x0e0a('0xcf')]):_0x519087(_0x498b2d['selector'])['QD_buyButton'](_0x498b2d['buyButton']);_0x68a169['dropDown']=_0x19b099;return _0x68a169;};_0x519087['fn'][_0x0e0a('0xd1')]=function(){_0x0e0a('0xd')===typeof console&&_0x0e0a('0x9')===typeof console[_0x0e0a('0xe')]&&console[_0x0e0a('0xe')]('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x519087['smartCart']=_0x519087['fn'][_0x0e0a('0xd1')];}catch(_0x57f15a){'undefined'!==typeof console&&_0x0e0a('0x9')===typeof console['error']&&console[_0x0e0a('0xa')](_0x0e0a('0xb'),_0x57f15a);}}());

/* Quatro Digital - Mosaic Banners // Carlos Vinicius // Todos os direitos reservados */
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);