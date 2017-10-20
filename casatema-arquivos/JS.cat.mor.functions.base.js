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
				autoplaySpeed: 7000				
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
		init: function() {
			Search.openFiltersMenu();
			Search.hideExtendedMenu();
			Home.sliderFull();			
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
		openFiltersMenu: function() {
			$('.search-qd-v1-navigator-trigger').click(function(e) {
				e.preventDefault();				
				$(document.body).toggleClass('qd-sn-on');
				$('.search-qd-v1-navigator-close').appendTo('.search-single-navigator').removeClass('hide');
			});

			$('.navigation-tabs').prepend('<span class="search-qd-v1-navigator-close hide"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
			
			$('.search-qd-v1-navigator-close').click(function() {
				$(document.body).removeClass('qd-sn-on');
				$('.search-qd-v1-navigator-close').addClass('hide');
			});
		}
	};

	var Product = {
		run: function() {},
		init: function() {
			Product.forceImageZoom();	
			Product.accessoriesFix();
			Product.accessoriesApplyCarousel();
			Product.openShipping();
			Product.scrollToDescription();
			Product.qdHideUniqueSkuOption();
			Product.scrollToBuyButton();
			Product.showFloatingBuyBar();
			Product.buyButtonWithNotification();
			
			// Apenas para tela de KIT
			if( $(document.body).is(".produto-kit")){
				Product.kitShowItem();
				Product.kitShowSpecification();
				Product.kitItemSelected();
				Product.kitDustRenderCallback();
				Product.kitUnavailableCheck();
				Product.kitShowDescription();
				Product.kitShowImage();
				Product.kitBuyAllItemsButton();
				Product.scrollToKitProducts();
			}
			else{
				Product.applyCarouselThumb(); $(window).on('skuSelected.vtex', Product.applyCarouselThumb);	
				Product.saveAmountFlag();
				Product.setAvailableBodyClass();
				Product.applyBuyTogetherBackground();
			}
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
		scrollToKitProducts: function() {
			$('.ver-itens-kit').click(function(e) {
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $('.product-qd-v1-kit-products').offset().top -100
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
			var wrapper = $('.buy-together-content').html();

			if (wrapper.length >= 1)
				$('.product-qd-v1-buy-together-wrapper').addClass('qd-am-is-active');
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
			var i = 0;
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

				i++;
			});

			if( i == btns.length )
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
		buyButtonWithNotification: function() {
			var wrapper = $(".qd_cart_auto");
			if (!wrapper.length)
				wrapper = $(document.body);

			wrapper.QD_buyButton({
				buyButton: '.buy-button'
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
var _0xb7a6=['Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','off','nfngrzn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','join','toUpperCase','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','QuatroDigital.ssa.skuSelected','initialSkuSelected','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','unavailable','vtex.sku.selected.QD','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','available','.qd_smart_stock_available_auto','function','qdAjaxQueue','qdAjax','extend','url','opts','error','call','parameters','callbackFns','successPopulated','errorPopulated','boolean','completePopulated','success','object','complete','clearQueueDelay','jqXHR','undefined','ajax','textStatus','errorThrown','version','/produto/sku/','QD_smartStockAvailable','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','alerta','toLowerCase','info','apply','warn','removeClass','qd-ssa-sku-no-selected','addClass','SkuSellersInformation','attr','data-qd-ssa-qtt','each','find','[data-qd-ssa-text]','hide','qd-ssa-hide','qd-ssa-show','[data-qd-ssa-text=\x22','length','filter','html','replace','#qtt','show','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','message','qd-ssa-on','qd-ssa-skus-','skus','split','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','AvailableQuantity','trigger','QuatroDigital.ssa.prodUnavailable'];(function(_0x425491,_0x46ddfe){var _0x35518a=function(_0x50aa34){while(--_0x50aa34){_0x425491['push'](_0x425491['shift']());}};_0x35518a(++_0x46ddfe);}(_0xb7a6,0x66));var _0x6b7a=function(_0x51e88a,_0x4237b2){_0x51e88a=_0x51e88a-0x0;var _0x1f0bba=_0xb7a6[_0x51e88a];return _0x1f0bba;};(function(_0x144670){if(_0x6b7a('0x0')!==typeof _0x144670['qdAjax']){var _0x2be300={};_0x144670[_0x6b7a('0x1')]=_0x2be300;_0x144670[_0x6b7a('0x2')]=function(_0x48d5a3){var _0x56c70f=_0x144670[_0x6b7a('0x3')]({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x48d5a3);var _0x2e33c4=escape(encodeURIComponent(_0x56c70f[_0x6b7a('0x4')]));_0x2be300[_0x2e33c4]=_0x2be300[_0x2e33c4]||{};_0x2be300[_0x2e33c4]['opts']=_0x2be300[_0x2e33c4]['opts']||[];_0x2be300[_0x2e33c4][_0x6b7a('0x5')]['push']({'success':function(_0x59d3f5,_0x10bd01,_0x69fc9e){_0x56c70f['success']['call'](this,_0x59d3f5,_0x10bd01,_0x69fc9e);},'error':function(_0x24759b,_0x410f28,_0x408e0c){_0x56c70f[_0x6b7a('0x6')][_0x6b7a('0x7')](this,_0x24759b,_0x410f28,_0x408e0c);},'complete':function(_0x48a754,_0x21eb42){_0x56c70f['complete'][_0x6b7a('0x7')](this,_0x48a754,_0x21eb42);}});_0x2be300[_0x2e33c4][_0x6b7a('0x8')]=_0x2be300[_0x2e33c4][_0x6b7a('0x8')]||{'success':{},'error':{},'complete':{}};_0x2be300[_0x2e33c4][_0x6b7a('0x9')]=_0x2be300[_0x2e33c4][_0x6b7a('0x9')]||{};_0x2be300[_0x2e33c4][_0x6b7a('0x9')][_0x6b7a('0xa')]='boolean'===typeof _0x2be300[_0x2e33c4][_0x6b7a('0x9')][_0x6b7a('0xa')]?_0x2be300[_0x2e33c4]['callbackFns']['successPopulated']:!0x1;_0x2be300[_0x2e33c4][_0x6b7a('0x9')][_0x6b7a('0xb')]=_0x6b7a('0xc')===typeof _0x2be300[_0x2e33c4][_0x6b7a('0x9')][_0x6b7a('0xb')]?_0x2be300[_0x2e33c4][_0x6b7a('0x9')]['errorPopulated']:!0x1;_0x2be300[_0x2e33c4][_0x6b7a('0x9')][_0x6b7a('0xd')]=_0x6b7a('0xc')===typeof _0x2be300[_0x2e33c4]['callbackFns'][_0x6b7a('0xd')]?_0x2be300[_0x2e33c4][_0x6b7a('0x9')][_0x6b7a('0xd')]:!0x1;_0x48d5a3=_0x144670[_0x6b7a('0x3')]({},_0x56c70f,{'success':function(_0x56afa9,_0x452a83,_0x25f7d4){_0x2be300[_0x2e33c4][_0x6b7a('0x8')][_0x6b7a('0xe')]={'data':_0x56afa9,'textStatus':_0x452a83,'jqXHR':_0x25f7d4};_0x2be300[_0x2e33c4]['callbackFns'][_0x6b7a('0xa')]=!0x0;for(var _0x6a65f9 in _0x2be300[_0x2e33c4][_0x6b7a('0x5')])'object'===typeof _0x2be300[_0x2e33c4]['opts'][_0x6a65f9]&&(_0x2be300[_0x2e33c4][_0x6b7a('0x5')][_0x6a65f9][_0x6b7a('0xe')][_0x6b7a('0x7')](this,_0x56afa9,_0x452a83,_0x25f7d4),_0x2be300[_0x2e33c4][_0x6b7a('0x5')][_0x6a65f9][_0x6b7a('0xe')]=function(){});},'error':function(_0x1230c3,_0x241d1b,_0x20e92f){_0x2be300[_0x2e33c4][_0x6b7a('0x8')][_0x6b7a('0x6')]={'errorThrown':_0x20e92f,'textStatus':_0x241d1b,'jqXHR':_0x1230c3};_0x2be300[_0x2e33c4]['callbackFns']['errorPopulated']=!0x0;for(var _0x237755 in _0x2be300[_0x2e33c4]['opts'])_0x6b7a('0xf')===typeof _0x2be300[_0x2e33c4][_0x6b7a('0x5')][_0x237755]&&(_0x2be300[_0x2e33c4][_0x6b7a('0x5')][_0x237755]['error'][_0x6b7a('0x7')](this,_0x1230c3,_0x241d1b,_0x20e92f),_0x2be300[_0x2e33c4][_0x6b7a('0x5')][_0x237755][_0x6b7a('0x6')]=function(){});},'complete':function(_0xf17719,_0x11f567){_0x2be300[_0x2e33c4]['parameters'][_0x6b7a('0x10')]={'textStatus':_0x11f567,'jqXHR':_0xf17719};_0x2be300[_0x2e33c4][_0x6b7a('0x9')][_0x6b7a('0xd')]=!0x0;for(var _0x3693ca in _0x2be300[_0x2e33c4][_0x6b7a('0x5')])_0x6b7a('0xf')===typeof _0x2be300[_0x2e33c4][_0x6b7a('0x5')][_0x3693ca]&&(_0x2be300[_0x2e33c4][_0x6b7a('0x5')][_0x3693ca][_0x6b7a('0x10')][_0x6b7a('0x7')](this,_0xf17719,_0x11f567),_0x2be300[_0x2e33c4][_0x6b7a('0x5')][_0x3693ca][_0x6b7a('0x10')]=function(){});isNaN(parseInt(_0x56c70f[_0x6b7a('0x11')]))||setTimeout(function(){_0x2be300[_0x2e33c4][_0x6b7a('0x12')]=void 0x0;_0x2be300[_0x2e33c4]['opts']=void 0x0;_0x2be300[_0x2e33c4][_0x6b7a('0x8')]=void 0x0;_0x2be300[_0x2e33c4]['callbackFns']=void 0x0;},_0x56c70f['clearQueueDelay']);}});_0x6b7a('0x13')===typeof _0x2be300[_0x2e33c4]['jqXHR']?_0x2be300[_0x2e33c4]['jqXHR']=_0x144670[_0x6b7a('0x14')](_0x48d5a3):_0x2be300[_0x2e33c4]['jqXHR']&&_0x2be300[_0x2e33c4]['jqXHR']['readyState']&&0x4==_0x2be300[_0x2e33c4]['jqXHR']['readyState']&&(_0x2be300[_0x2e33c4]['callbackFns'][_0x6b7a('0xa')]&&_0x48d5a3[_0x6b7a('0xe')](_0x2be300[_0x2e33c4][_0x6b7a('0x8')][_0x6b7a('0xe')]['data'],_0x2be300[_0x2e33c4][_0x6b7a('0x8')][_0x6b7a('0xe')][_0x6b7a('0x15')],_0x2be300[_0x2e33c4][_0x6b7a('0x8')]['success'][_0x6b7a('0x12')]),_0x2be300[_0x2e33c4][_0x6b7a('0x9')]['errorPopulated']&&_0x48d5a3[_0x6b7a('0x6')](_0x2be300[_0x2e33c4][_0x6b7a('0x8')][_0x6b7a('0x6')][_0x6b7a('0x12')],_0x2be300[_0x2e33c4][_0x6b7a('0x8')]['error'][_0x6b7a('0x15')],_0x2be300[_0x2e33c4][_0x6b7a('0x8')][_0x6b7a('0x6')][_0x6b7a('0x16')]),_0x2be300[_0x2e33c4][_0x6b7a('0x9')][_0x6b7a('0xd')]&&_0x48d5a3[_0x6b7a('0x10')](_0x2be300[_0x2e33c4][_0x6b7a('0x8')]['complete'][_0x6b7a('0x12')],_0x2be300[_0x2e33c4][_0x6b7a('0x8')][_0x6b7a('0x10')][_0x6b7a('0x15')]));};_0x144670[_0x6b7a('0x2')][_0x6b7a('0x17')]='2.1';}}(jQuery));(function(_0x7fbc95){function _0x45df9f(_0x335f6d,_0x44753b){_0x327c4d[_0x6b7a('0x2')]({'url':_0x6b7a('0x18')+_0x335f6d,'clearQueueDelay':null,'success':_0x44753b,'error':function(){_0x36a90d('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!');}});}var _0x327c4d=jQuery;if(_0x6b7a('0x0')!==typeof _0x327c4d['fn'][_0x6b7a('0x19')]){var _0x36a90d=function(_0x49e7f8,_0x50f280){if(_0x6b7a('0xf')===typeof console){var _0x2e11e8;_0x6b7a('0xf')===typeof _0x49e7f8?(_0x49e7f8[_0x6b7a('0x1a')](_0x6b7a('0x1b')),_0x2e11e8=_0x49e7f8):_0x2e11e8=[_0x6b7a('0x1b')+_0x49e7f8];_0x6b7a('0x13')===typeof _0x50f280||_0x6b7a('0x1c')!==_0x50f280[_0x6b7a('0x1d')]()&&'aviso'!==_0x50f280[_0x6b7a('0x1d')]()?'undefined'!==typeof _0x50f280&&'info'===_0x50f280[_0x6b7a('0x1d')]()?console[_0x6b7a('0x1e')][_0x6b7a('0x1f')](console,_0x2e11e8):console[_0x6b7a('0x6')]['apply'](console,_0x2e11e8):console[_0x6b7a('0x20')][_0x6b7a('0x1f')](console,_0x2e11e8);}},_0x526d6b={},_0x422a47=function(_0xb5b671,_0x4f5ed4){function _0x30d2c2(_0x46926a){try{_0xb5b671[_0x6b7a('0x21')](_0x6b7a('0x22'))[_0x6b7a('0x23')]('qd-ssa-sku-selected');var _0x48b1e9=_0x46926a[0x0][_0x6b7a('0x24')][0x0]['AvailableQuantity'];_0xb5b671[_0x6b7a('0x25')](_0x6b7a('0x26'),_0x48b1e9);_0xb5b671[_0x6b7a('0x27')](function(){var _0xb5b671=_0x327c4d(this)[_0x6b7a('0x28')](_0x6b7a('0x29'));if(0x1>_0x48b1e9)return _0xb5b671[_0x6b7a('0x2a')]()['addClass'](_0x6b7a('0x2b'))['removeClass'](_0x6b7a('0x2c'));var _0x46926a=_0xb5b671['filter'](_0x6b7a('0x2d')+_0x48b1e9+'\x22]');_0x46926a=_0x46926a[_0x6b7a('0x2e')]?_0x46926a:_0xb5b671[_0x6b7a('0x2f')]('[data-qd-ssa-text=\x22default\x22]');_0xb5b671[_0x6b7a('0x2a')]()[_0x6b7a('0x23')](_0x6b7a('0x2b'))[_0x6b7a('0x21')](_0x6b7a('0x2c'));_0x46926a[_0x6b7a('0x30')]((_0x46926a[_0x6b7a('0x30')]()||'')[_0x6b7a('0x31')](_0x6b7a('0x32'),_0x48b1e9));_0x46926a[_0x6b7a('0x33')]()['addClass'](_0x6b7a('0x2c'))[_0x6b7a('0x21')](_0x6b7a('0x2b'));});}catch(_0x446e02){_0x36a90d([_0x6b7a('0x34'),_0x446e02[_0x6b7a('0x35')]]);}}if(_0xb5b671['length']){_0xb5b671[_0x6b7a('0x23')](_0x6b7a('0x36'));_0xb5b671['addClass'](_0x6b7a('0x22'));try{_0xb5b671['addClass'](_0x6b7a('0x37')+vtxctx[_0x6b7a('0x38')][_0x6b7a('0x39')](';')[_0x6b7a('0x2e')]);}catch(_0x53149e){_0x36a90d([_0x6b7a('0x3a'),_0x53149e[_0x6b7a('0x35')]]);}_0x327c4d(window)['on'](_0x6b7a('0x3b'),function(_0x5521f8,_0x3d3e70,_0x377300){try{_0x45df9f(_0x377300[_0x6b7a('0x3c')],function(_0x522999){_0x30d2c2(_0x522999);0x1===vtxctx[_0x6b7a('0x38')][_0x6b7a('0x39')](';')['length']&&0x0==_0x522999[0x0][_0x6b7a('0x24')][0x0][_0x6b7a('0x3d')]&&_0x327c4d(window)[_0x6b7a('0x3e')](_0x6b7a('0x3f'));});}catch(_0x3a5737){_0x36a90d([_0x6b7a('0x40'),_0x3a5737[_0x6b7a('0x35')]]);}});_0x327c4d(window)[_0x6b7a('0x41')]('vtex.sku.selected.QD');_0x327c4d(window)['on'](_0x6b7a('0x3f'),function(){_0xb5b671[_0x6b7a('0x23')]('qd-ssa-sku-prod-unavailable')[_0x6b7a('0x2a')]();});}};_0x7fbc95=function(_0x544c64){var _0x2d17c4={'p':_0x6b7a('0x42')};return function(_0x42c5a2){var _0x58e78f=function(_0x44bc99){return _0x44bc99;};var _0x15b9a6=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x42c5a2=_0x42c5a2['d'+_0x15b9a6[0x10]+'c'+_0x15b9a6[0x11]+'m'+_0x58e78f(_0x15b9a6[0x1])+'n'+_0x15b9a6[0xd]]['l'+_0x15b9a6[0x12]+'c'+_0x15b9a6[0x0]+'ti'+_0x58e78f('o')+'n'];var _0x112ca5=function(_0x376b8f){return escape(encodeURIComponent(_0x376b8f[_0x6b7a('0x31')](/\./g,'¨')[_0x6b7a('0x31')](/[a-zA-Z]/g,function(_0x5a10c6){return String[_0x6b7a('0x43')](('Z'>=_0x5a10c6?0x5a:0x7a)>=(_0x5a10c6=_0x5a10c6[_0x6b7a('0x44')](0x0)+0xd)?_0x5a10c6:_0x5a10c6-0x1a);})));};var _0x59124f=_0x112ca5(_0x42c5a2[[_0x15b9a6[0x9],_0x58e78f('o'),_0x15b9a6[0xc],_0x15b9a6[_0x58e78f(0xd)]][_0x6b7a('0x45')]('')]);_0x112ca5=_0x112ca5((window[['js',_0x58e78f('no'),'m',_0x15b9a6[0x1],_0x15b9a6[0x4][_0x6b7a('0x46')](),'ite'][_0x6b7a('0x45')]('')]||'---')+['.v',_0x15b9a6[0xd],'e',_0x58e78f('x'),'co',_0x58e78f('mm'),_0x6b7a('0x47'),_0x15b9a6[0x1],'.c',_0x58e78f('o'),'m.',_0x15b9a6[0x13],'r']['join'](''));for(var _0x329384 in _0x2d17c4){if(_0x112ca5===_0x329384+_0x2d17c4[_0x329384]||_0x59124f===_0x329384+_0x2d17c4[_0x329384]){var _0x487dc0='tr'+_0x15b9a6[0x11]+'e';break;}_0x487dc0='f'+_0x15b9a6[0x0]+'ls'+_0x58e78f(_0x15b9a6[0x1])+'';}_0x58e78f=!0x1;-0x1<_0x42c5a2[[_0x15b9a6[0xc],'e',_0x15b9a6[0x0],'rc',_0x15b9a6[0x9]][_0x6b7a('0x45')]('')][_0x6b7a('0x48')](_0x6b7a('0x49'))&&(_0x58e78f=!0x0);return[_0x487dc0,_0x58e78f];}(_0x544c64);}(window);if(!eval(_0x7fbc95[0x0]))return _0x7fbc95[0x1]?_0x36a90d(_0x6b7a('0x4a')):!0x1;_0x327c4d['fn'][_0x6b7a('0x19')]=function(_0x33404b){var _0x5d0fc1=_0x327c4d(this);_0x33404b=_0x327c4d[_0x6b7a('0x3')](!0x0,{},_0x526d6b,_0x33404b);_0x5d0fc1['qdPlugin']=new _0x422a47(_0x5d0fc1,_0x33404b);try{_0x6b7a('0xf')===typeof _0x327c4d['fn'][_0x6b7a('0x19')]['initialSkuSelected']&&_0x327c4d(window)[_0x6b7a('0x3e')](_0x6b7a('0x4b'),[_0x327c4d['fn'][_0x6b7a('0x19')]['initialSkuSelected']['prod'],_0x327c4d['fn'][_0x6b7a('0x19')][_0x6b7a('0x4c')][_0x6b7a('0x3c')]]);}catch(_0x2a301e){_0x36a90d([_0x6b7a('0x4d'),_0x2a301e[_0x6b7a('0x35')]]);}_0x327c4d['fn'][_0x6b7a('0x19')][_0x6b7a('0x4e')]&&_0x327c4d(window)[_0x6b7a('0x3e')]('QuatroDigital.ssa.prodUnavailable');return _0x5d0fc1;};_0x327c4d(window)['on'](_0x6b7a('0x4f'),function(_0x4fa6ab,_0x4aa539,_0x414617){try{_0x327c4d['fn'][_0x6b7a('0x19')][_0x6b7a('0x4c')]={'prod':_0x4aa539,'sku':_0x414617},_0x327c4d(this)[_0x6b7a('0x41')](_0x4fa6ab);}catch(_0x35ba96){_0x36a90d([_0x6b7a('0x50'),_0x35ba96['message']]);}});_0x327c4d(window)['on']('vtex.sku.selectable',function(_0xa21637,_0x6ed0f,_0x38331a){try{for(var _0x58fd37=_0x38331a['length'],_0x24d43e=_0x6ed0f=0x0;_0x24d43e<_0x58fd37&&!_0x38331a[_0x24d43e][_0x6b7a('0x51')];_0x24d43e++)_0x6ed0f+=0x1;_0x58fd37<=_0x6ed0f&&(_0x327c4d['fn'][_0x6b7a('0x19')][_0x6b7a('0x4e')]=!0x0);_0x327c4d(this)[_0x6b7a('0x41')](_0xa21637);}catch(_0x6ec41f){_0x36a90d(['Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20',_0x6ec41f[_0x6b7a('0x35')]]);}});_0x327c4d(function(){_0x327c4d(_0x6b7a('0x52'))['QD_smartStockAvailable']();});}}(window));
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
var _0x8e10=['qd-am-dropdown-menu','qd-am-dropdown','children','qd-am-level-','qd-am-','-li','callback','QuatroDigital.am.callback','getParent','function','QD_amazingMenu','/qd-amazing-menu','object','undefined','unshift','[QD\x20Amazing\x20Menu]\x0a','aviso','toLowerCase','info','apply','join','error','warn','qdAmAddNdx','addClass','qd-am-li-','first','qd-am-first','last','qd-am-last','nfngrzn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','toUpperCase','ite','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-collection-wrapper','qdAjax','html','find','img[alt=\x27','attr','each','insertBefore','hide','qd-am-content-loaded','text','trim','data-qdam-value','[class*=\x27colunas\x27]','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','call','trigger','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','alerta','li\x20>ul','qd-am-has-ul',':not(ul)','qd-am-elem-','replaceSpecialChars','>li','qd-am-column'];(function(_0x355ce8,_0x5f1d0a){var _0x1db8b8=function(_0x277eb2){while(--_0x277eb2){_0x355ce8['push'](_0x355ce8['shift']());}};_0x1db8b8(++_0x5f1d0a);}(_0x8e10,0x120));var _0x08e1=function(_0x1ebe90,_0x5d29fc){_0x1ebe90=_0x1ebe90-0x0;var _0x447c82=_0x8e10[_0x1ebe90];return _0x447c82;};(function(_0x44ea43){_0x44ea43['fn'][_0x08e1('0x0')]=_0x44ea43['fn']['closest'];}(jQuery));(function(_0x45a8a8){var _0x15f4c2;var _0x24c441=jQuery;if(_0x08e1('0x1')!==typeof _0x24c441['fn'][_0x08e1('0x2')]){var _0x247164={'url':_0x08e1('0x3'),'callback':function(){},'ajaxCallback':function(){}};var _0x532762=function(_0x3e39f2,_0x4e2b8f){if(_0x08e1('0x4')===typeof console&&_0x08e1('0x5')!==typeof console['error']&&'undefined'!==typeof console['info']&&_0x08e1('0x5')!==typeof console['warn']){var _0x42ca28;_0x08e1('0x4')===typeof _0x3e39f2?(_0x3e39f2[_0x08e1('0x6')]('[QD\x20Amazing\x20Menu]\x0a'),_0x42ca28=_0x3e39f2):_0x42ca28=[_0x08e1('0x7')+_0x3e39f2];if('undefined'===typeof _0x4e2b8f||'alerta'!==_0x4e2b8f['toLowerCase']()&&_0x08e1('0x8')!==_0x4e2b8f[_0x08e1('0x9')]())if('undefined'!==typeof _0x4e2b8f&&_0x08e1('0xa')===_0x4e2b8f[_0x08e1('0x9')]())try{console[_0x08e1('0xa')][_0x08e1('0xb')](console,_0x42ca28);}catch(_0x39ef10){try{console['info'](_0x42ca28[_0x08e1('0xc')]('\x0a'));}catch(_0x525cc4){}}else try{console[_0x08e1('0xd')][_0x08e1('0xb')](console,_0x42ca28);}catch(_0xb591bd){try{console[_0x08e1('0xd')](_0x42ca28[_0x08e1('0xc')]('\x0a'));}catch(_0x2a2c35){}}else try{console[_0x08e1('0xe')][_0x08e1('0xb')](console,_0x42ca28);}catch(_0x442be8){try{console['warn'](_0x42ca28[_0x08e1('0xc')]('\x0a'));}catch(_0x5575a0){}}}};_0x24c441['fn'][_0x08e1('0xf')]=function(){var _0xa3f28e=_0x24c441(this);_0xa3f28e['each'](function(_0x40e1f8){_0x24c441(this)[_0x08e1('0x10')](_0x08e1('0x11')+_0x40e1f8);});_0xa3f28e[_0x08e1('0x12')]()[_0x08e1('0x10')](_0x08e1('0x13'));_0xa3f28e[_0x08e1('0x14')]()[_0x08e1('0x10')](_0x08e1('0x15'));return _0xa3f28e;};_0x24c441['fn'][_0x08e1('0x2')]=function(){};_0x45a8a8=function(_0xf21d56){var _0x25eb25={'p':_0x08e1('0x16')};return function(_0x9f406){var _0x162675=function(_0x43ec59){return _0x43ec59;};var _0x576d3e=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x9f406=_0x9f406['d'+_0x576d3e[0x10]+'c'+_0x576d3e[0x11]+'m'+_0x162675(_0x576d3e[0x1])+'n'+_0x576d3e[0xd]]['l'+_0x576d3e[0x12]+'c'+_0x576d3e[0x0]+'ti'+_0x162675('o')+'n'];var _0x833ffb=function(_0x1b2713){return escape(encodeURIComponent(_0x1b2713[_0x08e1('0x17')](/\./g,'¨')[_0x08e1('0x17')](/[a-zA-Z]/g,function(_0x4c79d2){return String['fromCharCode'](('Z'>=_0x4c79d2?0x5a:0x7a)>=(_0x4c79d2=_0x4c79d2['charCodeAt'](0x0)+0xd)?_0x4c79d2:_0x4c79d2-0x1a);})));};var _0x510b32=_0x833ffb(_0x9f406[[_0x576d3e[0x9],_0x162675('o'),_0x576d3e[0xc],_0x576d3e[_0x162675(0xd)]]['join']('')]);_0x833ffb=_0x833ffb((window[['js',_0x162675('no'),'m',_0x576d3e[0x1],_0x576d3e[0x4][_0x08e1('0x18')](),_0x08e1('0x19')]['join']('')]||'---')+['.v',_0x576d3e[0xd],'e',_0x162675('x'),'co',_0x162675('mm'),'erc',_0x576d3e[0x1],'.c',_0x162675('o'),'m.',_0x576d3e[0x13],'r'][_0x08e1('0xc')](''));for(var _0x3d0533 in _0x25eb25){if(_0x833ffb===_0x3d0533+_0x25eb25[_0x3d0533]||_0x510b32===_0x3d0533+_0x25eb25[_0x3d0533]){var _0x2dc3e9='tr'+_0x576d3e[0x11]+'e';break;}_0x2dc3e9='f'+_0x576d3e[0x0]+'ls'+_0x162675(_0x576d3e[0x1])+'';}_0x162675=!0x1;-0x1<_0x9f406[[_0x576d3e[0xc],'e',_0x576d3e[0x0],'rc',_0x576d3e[0x9]][_0x08e1('0xc')]('')]['indexOf'](_0x08e1('0x1a'))&&(_0x162675=!0x0);return[_0x2dc3e9,_0x162675];}(_0xf21d56);}(window);if(!eval(_0x45a8a8[0x0]))return _0x45a8a8[0x1]?_0x532762(_0x08e1('0x1b')):!0x1;var _0x25c603=function(_0x42279d){var _0x13e8a1=_0x42279d['find'](_0x08e1('0x1c'));var _0x279427=_0x13e8a1[_0x08e1('0x1d')](_0x08e1('0x1e'));var _0x483ea8=_0x13e8a1[_0x08e1('0x1d')](_0x08e1('0x1f'));if(_0x279427[_0x08e1('0x20')]||_0x483ea8[_0x08e1('0x20')])_0x279427[_0x08e1('0x21')]()['addClass']('qd-am-banner-wrapper'),_0x483ea8[_0x08e1('0x21')]()[_0x08e1('0x10')](_0x08e1('0x22')),_0x24c441[_0x08e1('0x23')]({'url':_0x15f4c2['url'],'dataType':_0x08e1('0x24'),'success':function(_0x42f136){var _0x1f0424=_0x24c441(_0x42f136);_0x279427['each'](function(){var _0x42f136=_0x24c441(this);var _0x3fcbe7=_0x1f0424[_0x08e1('0x25')](_0x08e1('0x26')+_0x42f136[_0x08e1('0x27')]('data-qdam-value')+'\x27]');_0x3fcbe7[_0x08e1('0x20')]&&(_0x3fcbe7[_0x08e1('0x28')](function(){_0x24c441(this)[_0x08e1('0x0')]('.box-banner')['clone']()[_0x08e1('0x29')](_0x42f136);}),_0x42f136[_0x08e1('0x2a')]());})[_0x08e1('0x10')](_0x08e1('0x2b'));_0x483ea8[_0x08e1('0x28')](function(){var _0x42f136={};var _0x555299=_0x24c441(this);_0x1f0424[_0x08e1('0x25')]('h2')[_0x08e1('0x28')](function(){if(_0x24c441(this)[_0x08e1('0x2c')]()[_0x08e1('0x2d')]()[_0x08e1('0x9')]()==_0x555299['attr'](_0x08e1('0x2e'))[_0x08e1('0x2d')]()[_0x08e1('0x9')]())return _0x42f136=_0x24c441(this),!0x1;});_0x42f136['length']&&(_0x42f136[_0x08e1('0x28')](function(){_0x24c441(this)[_0x08e1('0x0')](_0x08e1('0x2f'))['clone']()[_0x08e1('0x29')](_0x555299);}),_0x555299['hide']());})[_0x08e1('0x10')](_0x08e1('0x2b'));},'error':function(){_0x532762(_0x08e1('0x30')+_0x15f4c2['url']+_0x08e1('0x31'));},'complete':function(){_0x15f4c2['ajaxCallback'][_0x08e1('0x32')](this);_0x24c441(window)[_0x08e1('0x33')]('QuatroDigital.am.ajaxCallback',_0x42279d);},'clearQueueDelay':0xbb8});};_0x24c441['QD_amazingMenu']=function(_0x405f44){var _0x207e42=_0x405f44[_0x08e1('0x25')](_0x08e1('0x34'))[_0x08e1('0x28')](function(){var _0x5405e6=_0x24c441(this);if(!_0x5405e6[_0x08e1('0x20')])return _0x532762([_0x08e1('0x35'),_0x405f44],_0x08e1('0x36'));_0x5405e6['find'](_0x08e1('0x37'))[_0x08e1('0x21')]()[_0x08e1('0x10')](_0x08e1('0x38'));_0x5405e6[_0x08e1('0x25')]('li')[_0x08e1('0x28')](function(){var _0x1d5538=_0x24c441(this);var _0x4ec633=_0x1d5538['children'](_0x08e1('0x39'));_0x4ec633[_0x08e1('0x20')]&&_0x1d5538[_0x08e1('0x10')](_0x08e1('0x3a')+_0x4ec633[_0x08e1('0x12')]()['text']()[_0x08e1('0x2d')]()[_0x08e1('0x3b')]()['replace'](/\./g,'')['replace'](/\s/g,'-')[_0x08e1('0x9')]());});var _0xa6c569=_0x5405e6[_0x08e1('0x25')](_0x08e1('0x3c'))[_0x08e1('0xf')]();_0x5405e6['addClass']('qd-amazing-menu');_0xa6c569=_0xa6c569['find']('>ul');_0xa6c569['each'](function(){var _0x1ab397=_0x24c441(this);_0x1ab397[_0x08e1('0x25')](_0x08e1('0x3c'))[_0x08e1('0xf')]()[_0x08e1('0x10')](_0x08e1('0x3d'));_0x1ab397[_0x08e1('0x10')](_0x08e1('0x3e'));_0x1ab397[_0x08e1('0x21')]()[_0x08e1('0x10')](_0x08e1('0x3f'));});_0xa6c569['addClass']('qd-am-dropdown');var _0x32763e=0x0,_0x45a8a8=function(_0x24282a){_0x32763e+=0x1;_0x24282a=_0x24282a[_0x08e1('0x40')]('li')[_0x08e1('0x40')]('*');_0x24282a['length']&&(_0x24282a[_0x08e1('0x10')](_0x08e1('0x41')+_0x32763e),_0x45a8a8(_0x24282a));};_0x45a8a8(_0x5405e6);_0x5405e6['add'](_0x5405e6[_0x08e1('0x25')]('ul'))[_0x08e1('0x28')](function(){var _0x1abaf6=_0x24c441(this);_0x1abaf6[_0x08e1('0x10')](_0x08e1('0x42')+_0x1abaf6[_0x08e1('0x40')]('li')['length']+_0x08e1('0x43'));});});_0x25c603(_0x207e42);_0x15f4c2[_0x08e1('0x44')][_0x08e1('0x32')](this);_0x24c441(window)[_0x08e1('0x33')](_0x08e1('0x45'),_0x405f44);};_0x24c441['fn'][_0x08e1('0x2')]=function(_0x992adb){var _0x38fa40=_0x24c441(this);if(!_0x38fa40[_0x08e1('0x20')])return _0x38fa40;_0x15f4c2=_0x24c441['extend']({},_0x247164,_0x992adb);_0x38fa40['exec']=new _0x24c441[(_0x08e1('0x2'))](_0x24c441(this));return _0x38fa40;};_0x24c441(function(){_0x24c441('.qd_amazing_menu_auto')[_0x08e1('0x2')]();});}}(this));
/* Quatro Digital Smart Cart */
var _0xe532=['.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20input','val','keyup.qd_ddc_cep','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','getCartInfoByUrl','cartIsEmpty','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','texts','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','html','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-shipping','.qd-ddc-emptyCart\x20p','emptyCart','each','call','clone','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','dataOptionsCache','timeRemoveNewItemClass','qd-ddc-prodLoaded','getOrderForm','_QuatroDigital_AmountProduct','exec','.qd-ddc-wrapper','totalizers','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','renderProductsList','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','qd-ddc-','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','content','.qd-ddc-quantity','attr','quantity','.qd-ddc-remove','insertProdImg','imageUrl','appendTo','address','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','filter','[data-sku=\x27','outerHeight','parent','addClass','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','load','src','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','click.qd_ddc_minus','preventDefault','keyup.qd_ddc_change','click.qd_ddc_remove','removeProduct','stop','slideUp','remove','$1-$2$3','qdDdcLastPostalCode','calculateShipping','BRA','done','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','data','boolean','simpleCart','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','prodId','qtt','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','QD_smartCart','extend','selector','dropDown','buyButton','QD_buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','closest','abs','undefined','pow','round','split','length','replace','join','_QuatroDigital_CartData','callback','Callbacks','function','error','Oooops!\x20','message','object','info','warn','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','toLowerCase','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','fromCharCode','toUpperCase','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','Ir\x20ao\x20Carrinho','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','skuName','name','smartCheckout','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','vtexjs','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','append','find','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','removeClass','body','off','keyup.qd_ddc_closeFn','keyCode','qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart'];(function(_0x48c998,_0x37d255){var _0x59c2a2=function(_0x40eaa2){while(--_0x40eaa2){_0x48c998['push'](_0x48c998['shift']());}};_0x59c2a2(++_0x37d255);}(_0xe532,0x168));var _0x2e53=function(_0x519756,_0x288785){_0x519756=_0x519756-0x0;var _0x37047e=_0xe532[_0x519756];return _0x37047e;};(function(_0x5da85f){_0x5da85f['fn'][_0x2e53('0x0')]=_0x5da85f['fn'][_0x2e53('0x1')];}(jQuery));function qd_number_format(_0x31fecf,_0x303d88,_0x554b07,_0x1400a4){_0x31fecf=(_0x31fecf+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x31fecf=isFinite(+_0x31fecf)?+_0x31fecf:0x0;_0x303d88=isFinite(+_0x303d88)?Math[_0x2e53('0x2')](_0x303d88):0x0;_0x1400a4='undefined'===typeof _0x1400a4?',':_0x1400a4;_0x554b07=_0x2e53('0x3')===typeof _0x554b07?'.':_0x554b07;var _0x3c864f='',_0x3c864f=function(_0x3fb092,_0x4d80f5){var _0x303d88=Math[_0x2e53('0x4')](0xa,_0x4d80f5);return''+(Math[_0x2e53('0x5')](_0x3fb092*_0x303d88)/_0x303d88)['toFixed'](_0x4d80f5);},_0x3c864f=(_0x303d88?_0x3c864f(_0x31fecf,_0x303d88):''+Math[_0x2e53('0x5')](_0x31fecf))[_0x2e53('0x6')]('.');0x3<_0x3c864f[0x0][_0x2e53('0x7')]&&(_0x3c864f[0x0]=_0x3c864f[0x0][_0x2e53('0x8')](/\B(?=(?:\d{3})+(?!\d))/g,_0x1400a4));(_0x3c864f[0x1]||'')[_0x2e53('0x7')]<_0x303d88&&(_0x3c864f[0x1]=_0x3c864f[0x1]||'',_0x3c864f[0x1]+=Array(_0x303d88-_0x3c864f[0x1][_0x2e53('0x7')]+0x1)[_0x2e53('0x9')]('0'));return _0x3c864f[_0x2e53('0x9')](_0x554b07);};(function(){try{window[_0x2e53('0xa')]=window[_0x2e53('0xa')]||{},window[_0x2e53('0xa')]['callback']=window[_0x2e53('0xa')][_0x2e53('0xb')]||$[_0x2e53('0xc')]();}catch(_0x3505dd){'undefined'!==typeof console&&_0x2e53('0xd')===typeof console[_0x2e53('0xe')]&&console[_0x2e53('0xe')](_0x2e53('0xf'),_0x3505dd[_0x2e53('0x10')]);}}());(function(_0x42bbc4){try{var _0x18c660=jQuery,_0x29aa66=function(_0x4f9286,_0x42949e){if(_0x2e53('0x11')===typeof console&&_0x2e53('0x3')!==typeof console[_0x2e53('0xe')]&&'undefined'!==typeof console[_0x2e53('0x12')]&&_0x2e53('0x3')!==typeof console[_0x2e53('0x13')]){var _0x1dcc57;_0x2e53('0x11')===typeof _0x4f9286?(_0x4f9286[_0x2e53('0x14')](_0x2e53('0x15')),_0x1dcc57=_0x4f9286):_0x1dcc57=[_0x2e53('0x15')+_0x4f9286];if(_0x2e53('0x3')===typeof _0x42949e||_0x2e53('0x16')!==_0x42949e[_0x2e53('0x17')]()&&'aviso'!==_0x42949e[_0x2e53('0x17')]())if(_0x2e53('0x3')!==typeof _0x42949e&&_0x2e53('0x12')===_0x42949e['toLowerCase']())try{console[_0x2e53('0x12')][_0x2e53('0x18')](console,_0x1dcc57);}catch(_0x206189){try{console[_0x2e53('0x12')](_0x1dcc57[_0x2e53('0x9')]('\x0a'));}catch(_0x552bd1){}}else try{console[_0x2e53('0xe')][_0x2e53('0x18')](console,_0x1dcc57);}catch(_0x50de7a){try{console['error'](_0x1dcc57[_0x2e53('0x9')]('\x0a'));}catch(_0x2d3d33){}}else try{console[_0x2e53('0x13')][_0x2e53('0x18')](console,_0x1dcc57);}catch(_0x539e08){try{console[_0x2e53('0x13')](_0x1dcc57['join']('\x0a'));}catch(_0x3dd232){}}}};window[_0x2e53('0x19')]=window['_QuatroDigital_DropDown']||{};window[_0x2e53('0x19')][_0x2e53('0x1a')]=!0x0;_0x18c660[_0x2e53('0x1b')]=function(){};_0x18c660['fn'][_0x2e53('0x1b')]=function(){return{'fn':new _0x18c660()};};var _0x95e4a=function(_0x8e13ac){var _0x537f34={'p':'nfngrzn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x81fc8){var _0x414d84=function(_0x55100d){return _0x55100d;};var _0x5b218a=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x81fc8=_0x81fc8['d'+_0x5b218a[0x10]+'c'+_0x5b218a[0x11]+'m'+_0x414d84(_0x5b218a[0x1])+'n'+_0x5b218a[0xd]]['l'+_0x5b218a[0x12]+'c'+_0x5b218a[0x0]+'ti'+_0x414d84('o')+'n'];var _0x1ad9b8=function(_0x40c2f4){return escape(encodeURIComponent(_0x40c2f4[_0x2e53('0x8')](/\./g,'¨')[_0x2e53('0x8')](/[a-zA-Z]/g,function(_0x5ef9b2){return String[_0x2e53('0x1c')](('Z'>=_0x5ef9b2?0x5a:0x7a)>=(_0x5ef9b2=_0x5ef9b2['charCodeAt'](0x0)+0xd)?_0x5ef9b2:_0x5ef9b2-0x1a);})));};var _0x7c80d3=_0x1ad9b8(_0x81fc8[[_0x5b218a[0x9],_0x414d84('o'),_0x5b218a[0xc],_0x5b218a[_0x414d84(0xd)]][_0x2e53('0x9')]('')]);_0x1ad9b8=_0x1ad9b8((window[['js',_0x414d84('no'),'m',_0x5b218a[0x1],_0x5b218a[0x4][_0x2e53('0x1d')](),'ite']['join']('')]||'---')+['.v',_0x5b218a[0xd],'e',_0x414d84('x'),'co',_0x414d84('mm'),_0x2e53('0x1e'),_0x5b218a[0x1],'.c',_0x414d84('o'),'m.',_0x5b218a[0x13],'r']['join'](''));for(var _0x4ade16 in _0x537f34){if(_0x1ad9b8===_0x4ade16+_0x537f34[_0x4ade16]||_0x7c80d3===_0x4ade16+_0x537f34[_0x4ade16]){var _0x396c38='tr'+_0x5b218a[0x11]+'e';break;}_0x396c38='f'+_0x5b218a[0x0]+'ls'+_0x414d84(_0x5b218a[0x1])+'';}_0x414d84=!0x1;-0x1<_0x81fc8[[_0x5b218a[0xc],'e',_0x5b218a[0x0],'rc',_0x5b218a[0x9]]['join']('')][_0x2e53('0x1f')](_0x2e53('0x20'))&&(_0x414d84=!0x0);return[_0x396c38,_0x414d84];}(_0x8e13ac);}(window);if(!eval(_0x95e4a[0x0]))return _0x95e4a[0x1]?_0x29aa66('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x18c660['QD_dropDownCart']=function(_0x30d45b,_0x51811b){var _0x212509=_0x18c660(_0x30d45b);if(!_0x212509[_0x2e53('0x7')])return _0x212509;var _0x2c1b21=_0x18c660['extend'](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x2e53('0x21'),'linkCheckout':'Finalizar\x20Compra','cartTotal':_0x2e53('0x22'),'emptyCart':_0x2e53('0x23'),'continueShopping':'Continuar\x20Comprando','shippingForm':'<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x32a9e6){return _0x32a9e6[_0x2e53('0x24')]||_0x32a9e6[_0x2e53('0x25')];},'callback':function(){},'callbackProductsList':function(){}},_0x51811b);_0x18c660('');var _0x44d445=this;if(_0x2c1b21[_0x2e53('0x26')]){var _0x45ed07=!0x1;_0x2e53('0x3')===typeof window['vtexjs']&&(_0x29aa66(_0x2e53('0x27')),_0x18c660[_0x2e53('0x28')]({'url':_0x2e53('0x29'),'async':!0x1,'dataType':_0x2e53('0x2a'),'error':function(){_0x29aa66(_0x2e53('0x2b'));_0x45ed07=!0x0;}}));if(_0x45ed07)return _0x29aa66(_0x2e53('0x2c'));}if(_0x2e53('0x11')===typeof window[_0x2e53('0x2d')]&&'undefined'!==typeof window[_0x2e53('0x2d')]['checkout'])var _0x42bbc4=window[_0x2e53('0x2d')][_0x2e53('0x2e')];else if(_0x2e53('0x11')===typeof vtex&&_0x2e53('0x11')===typeof vtex['checkout']&&_0x2e53('0x3')!==typeof vtex['checkout']['SDK'])_0x42bbc4=new vtex[(_0x2e53('0x2e'))][(_0x2e53('0x2f'))]();else return _0x29aa66(_0x2e53('0x30'));_0x44d445[_0x2e53('0x31')]='<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>';var _0x1a8e7b=function(_0x71748c){_0x18c660(this)[_0x2e53('0x32')](_0x71748c);_0x71748c[_0x2e53('0x33')]('.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose')[_0x2e53('0x34')](_0x18c660(_0x2e53('0x35')))['on'](_0x2e53('0x36'),function(){_0x212509[_0x2e53('0x37')]('qd-bb-lightBoxProdAdd');_0x18c660(document[_0x2e53('0x38')])[_0x2e53('0x37')]('qd-bb-lightBoxBodyProdAdd');});_0x18c660(document)[_0x2e53('0x39')]('keyup.qd_ddc_closeFn')['on'](_0x2e53('0x3a'),function(_0x22951d){0x1b==_0x22951d[_0x2e53('0x3b')]&&(_0x212509[_0x2e53('0x37')](_0x2e53('0x3c')),_0x18c660(document[_0x2e53('0x38')])[_0x2e53('0x37')](_0x2e53('0x3d')));});var _0x2aa2ca=_0x71748c[_0x2e53('0x33')](_0x2e53('0x3e'));_0x71748c[_0x2e53('0x33')](_0x2e53('0x3f'))['on'](_0x2e53('0x40'),function(){_0x44d445[_0x2e53('0x41')]('-',void 0x0,void 0x0,_0x2aa2ca);return!0x1;});_0x71748c[_0x2e53('0x33')](_0x2e53('0x42'))['on'](_0x2e53('0x43'),function(){_0x44d445[_0x2e53('0x41')](void 0x0,void 0x0,void 0x0,_0x2aa2ca);return!0x1;});_0x71748c[_0x2e53('0x33')](_0x2e53('0x44'))[_0x2e53('0x45')]('')['on'](_0x2e53('0x46'),function(){_0x44d445[_0x2e53('0x47')](_0x18c660(this));});if(_0x2c1b21[_0x2e53('0x48')]){var _0x51811b=0x0;_0x18c660(this)['on'](_0x2e53('0x49'),function(){var _0x71748c=function(){window['_QuatroDigital_DropDown'][_0x2e53('0x1a')]&&(_0x44d445[_0x2e53('0x4a')](),window[_0x2e53('0x19')][_0x2e53('0x1a')]=!0x1,_0x18c660['fn']['simpleCart'](!0x0),_0x44d445[_0x2e53('0x4b')]());};_0x51811b=setInterval(function(){_0x71748c();},0x258);_0x71748c();});_0x18c660(this)['on']('mouseleave.qd_ddc_hover',function(){clearInterval(_0x51811b);});}};var _0x54cd21=function(_0x425c0a){_0x425c0a=_0x18c660(_0x425c0a);_0x2c1b21['texts'][_0x2e53('0x4c')]=_0x2c1b21['texts'][_0x2e53('0x4c')]['replace'](_0x2e53('0x4d'),_0x2e53('0x4e'));_0x2c1b21['texts'][_0x2e53('0x4c')]=_0x2c1b21[_0x2e53('0x4f')]['cartTotal'][_0x2e53('0x8')](_0x2e53('0x50'),_0x2e53('0x51'));_0x2c1b21['texts']['cartTotal']=_0x2c1b21[_0x2e53('0x4f')][_0x2e53('0x4c')][_0x2e53('0x8')](_0x2e53('0x52'),_0x2e53('0x53'));_0x2c1b21[_0x2e53('0x4f')][_0x2e53('0x4c')]=_0x2c1b21[_0x2e53('0x4f')][_0x2e53('0x4c')]['replace'](_0x2e53('0x54'),_0x2e53('0x55'));_0x425c0a[_0x2e53('0x33')](_0x2e53('0x56'))[_0x2e53('0x57')](_0x2c1b21[_0x2e53('0x4f')][_0x2e53('0x58')]);_0x425c0a['find'](_0x2e53('0x59'))[_0x2e53('0x57')](_0x2c1b21[_0x2e53('0x4f')][_0x2e53('0x5a')]);_0x425c0a[_0x2e53('0x33')]('.qd-ddc-checkout')[_0x2e53('0x57')](_0x2c1b21[_0x2e53('0x4f')]['linkCheckout']);_0x425c0a['find']('.qd-ddc-infoTotal')['html'](_0x2c1b21[_0x2e53('0x4f')]['cartTotal']);_0x425c0a[_0x2e53('0x33')](_0x2e53('0x5b'))[_0x2e53('0x57')](_0x2c1b21[_0x2e53('0x4f')]['shippingForm']);_0x425c0a[_0x2e53('0x33')](_0x2e53('0x5c'))[_0x2e53('0x57')](_0x2c1b21[_0x2e53('0x4f')][_0x2e53('0x5d')]);return _0x425c0a;}(this[_0x2e53('0x31')]);var _0x5b446e=0x0;_0x212509[_0x2e53('0x5e')](function(){0x0<_0x5b446e?_0x1a8e7b[_0x2e53('0x5f')](this,_0x54cd21[_0x2e53('0x60')]()):_0x1a8e7b[_0x2e53('0x5f')](this,_0x54cd21);_0x5b446e++;});window['_QuatroDigital_CartData']['callback']['add'](function(){_0x18c660('.qd-ddc-infoTotalValue')['html'](window[_0x2e53('0xa')]['total']||'--');_0x18c660(_0x2e53('0x61'))[_0x2e53('0x57')](window[_0x2e53('0xa')]['qtt']||'0');_0x18c660(_0x2e53('0x62'))[_0x2e53('0x57')](window[_0x2e53('0xa')][_0x2e53('0x63')]||'--');_0x18c660(_0x2e53('0x64'))['html'](window[_0x2e53('0xa')]['allTotal']||'--');});var _0x1c0d0a=function(_0x12a7b1,_0x571732){if(_0x2e53('0x3')===typeof _0x12a7b1[_0x2e53('0x65')])return _0x29aa66(_0x2e53('0x66'));_0x44d445['renderProductsList'][_0x2e53('0x5f')](this,_0x571732);};_0x44d445[_0x2e53('0x4a')]=function(_0x4c0b11,_0x4d6b98){_0x2e53('0x3')!=typeof _0x4d6b98?window[_0x2e53('0x19')][_0x2e53('0x67')]=_0x4d6b98:window[_0x2e53('0x19')][_0x2e53('0x67')]&&(_0x4d6b98=window['_QuatroDigital_DropDown'][_0x2e53('0x67')]);setTimeout(function(){window[_0x2e53('0x19')][_0x2e53('0x67')]=void 0x0;},_0x2c1b21[_0x2e53('0x68')]);_0x18c660('.qd-ddc-wrapper')['removeClass'](_0x2e53('0x69'));if(_0x2c1b21[_0x2e53('0x26')]){var _0x51811b=function(_0x3ab673){window[_0x2e53('0x19')][_0x2e53('0x6a')]=_0x3ab673;_0x1c0d0a(_0x3ab673,_0x4d6b98);_0x2e53('0x3')!==typeof window['_QuatroDigital_AmountProduct']&&_0x2e53('0xd')===typeof window[_0x2e53('0x6b')][_0x2e53('0x6c')]&&window[_0x2e53('0x6b')][_0x2e53('0x6c')][_0x2e53('0x5f')](this);_0x18c660(_0x2e53('0x6d'))['addClass']('qd-ddc-prodLoaded');};_0x2e53('0x3')!==typeof window['_QuatroDigital_DropDown']['getOrderForm']?(_0x51811b(window[_0x2e53('0x19')]['getOrderForm']),_0x2e53('0xd')===typeof _0x4c0b11&&_0x4c0b11(window[_0x2e53('0x19')]['getOrderForm'])):_0x18c660['QD_checkoutQueue']([_0x2e53('0x65'),_0x2e53('0x6e'),_0x2e53('0x6f')],{'done':function(_0x91cc15){_0x51811b[_0x2e53('0x5f')](this,_0x91cc15);'function'===typeof _0x4c0b11&&_0x4c0b11(_0x91cc15);},'fail':function(_0x5ab02a){_0x29aa66([_0x2e53('0x70'),_0x5ab02a]);}});}else alert(_0x2e53('0x71'));};_0x44d445[_0x2e53('0x4b')]=function(){var _0x22e5bd=_0x18c660('.qd-ddc-wrapper');_0x22e5bd['find'](_0x2e53('0x72'))[_0x2e53('0x7')]?_0x22e5bd['removeClass']('qd-ddc-noItems'):_0x22e5bd['addClass'](_0x2e53('0x73'));};_0x44d445[_0x2e53('0x74')]=function(_0x37be7d){var _0x51811b=_0x18c660('.qd-ddc-prodWrapper2');_0x51811b['empty']();_0x51811b[_0x2e53('0x5e')](function(){var _0x51811b=_0x18c660(this),_0x598af2,_0x30d45b,_0x1a0a67=_0x18c660(''),_0x2e2a0d;for(_0x2e2a0d in window['_QuatroDigital_DropDown']['getOrderForm'][_0x2e53('0x65')])if('object'===typeof window[_0x2e53('0x19')][_0x2e53('0x6a')]['items'][_0x2e2a0d]){var _0x3917e4=window[_0x2e53('0x19')]['getOrderForm'][_0x2e53('0x65')][_0x2e2a0d];var _0xf513e8=_0x3917e4[_0x2e53('0x75')]['replace'](/^\/|\/$/g,'')[_0x2e53('0x6')]('/');var _0x5dea39=_0x18c660(_0x2e53('0x76'));_0x5dea39['attr']({'data-sku':_0x3917e4['id'],'data-sku-index':_0x2e2a0d,'data-qd-departament':_0xf513e8[0x0],'data-qd-category':_0xf513e8[_0xf513e8[_0x2e53('0x7')]-0x1]});_0x5dea39['addClass'](_0x2e53('0x77')+_0x3917e4[_0x2e53('0x78')]);_0x5dea39[_0x2e53('0x33')](_0x2e53('0x79'))[_0x2e53('0x32')](_0x2c1b21[_0x2e53('0x24')](_0x3917e4));_0x5dea39['find'](_0x2e53('0x7a'))['append'](isNaN(_0x3917e4[_0x2e53('0x7b')])?_0x3917e4['sellingPrice']:0x0==_0x3917e4[_0x2e53('0x7b')]?_0x2e53('0x7c'):(_0x18c660('meta[name=currency]')['attr'](_0x2e53('0x7d'))||'R$')+'\x20'+qd_number_format(_0x3917e4['sellingPrice']/0x64,0x2,',','.'));_0x5dea39[_0x2e53('0x33')](_0x2e53('0x7e'))[_0x2e53('0x7f')]({'data-sku':_0x3917e4['id'],'data-sku-index':_0x2e2a0d})[_0x2e53('0x45')](_0x3917e4[_0x2e53('0x80')]);_0x5dea39[_0x2e53('0x33')](_0x2e53('0x81'))[_0x2e53('0x7f')]({'data-sku':_0x3917e4['id'],'data-sku-index':_0x2e2a0d});_0x44d445[_0x2e53('0x82')](_0x3917e4['id'],_0x5dea39[_0x2e53('0x33')]('.qd-ddc-image'),_0x3917e4[_0x2e53('0x83')]);_0x5dea39['find']('.qd-ddc-quantityMore,.qd-ddc-quantityMinus')[_0x2e53('0x7f')]({'data-sku':_0x3917e4['id'],'data-sku-index':_0x2e2a0d});_0x5dea39[_0x2e53('0x84')](_0x51811b);_0x1a0a67=_0x1a0a67[_0x2e53('0x34')](_0x5dea39);}try{var _0x42bbc4=_0x51811b[_0x2e53('0x0')]('.qd-ddc-wrapper')['find']('.qd-ddc-shipping\x20input');_0x42bbc4[_0x2e53('0x7')]&&''==_0x42bbc4[_0x2e53('0x45')]()&&window[_0x2e53('0x19')][_0x2e53('0x6a')][_0x2e53('0x6f')][_0x2e53('0x85')]&&_0x42bbc4[_0x2e53('0x45')](window[_0x2e53('0x19')][_0x2e53('0x6a')][_0x2e53('0x6f')][_0x2e53('0x85')]['postalCode']);}catch(_0x4c066b){_0x29aa66(_0x2e53('0x86')+_0x4c066b[_0x2e53('0x10')],'aviso');}_0x44d445[_0x2e53('0x87')](_0x51811b);_0x44d445[_0x2e53('0x4b')]();_0x37be7d&&_0x37be7d[_0x2e53('0x88')]&&function(){_0x30d45b=_0x1a0a67[_0x2e53('0x89')](_0x2e53('0x8a')+_0x37be7d[_0x2e53('0x88')]+'\x27]');_0x30d45b['length']&&(_0x598af2=0x0,_0x1a0a67[_0x2e53('0x5e')](function(){var _0x37be7d=_0x18c660(this);if(_0x37be7d['is'](_0x30d45b))return!0x1;_0x598af2+=_0x37be7d[_0x2e53('0x8b')]();}),_0x44d445[_0x2e53('0x41')](void 0x0,void 0x0,_0x598af2,_0x51811b[_0x2e53('0x34')](_0x51811b[_0x2e53('0x8c')]())),_0x1a0a67[_0x2e53('0x37')]('qd-ddc-lastAddedFixed'),function(_0x4112a2){_0x4112a2[_0x2e53('0x8d')](_0x2e53('0x8e'));_0x4112a2[_0x2e53('0x8d')]('qd-ddc-lastAddedFixed');setTimeout(function(){_0x4112a2[_0x2e53('0x37')](_0x2e53('0x8e'));},_0x2c1b21['timeRemoveNewItemClass']);}(_0x30d45b),_0x18c660(document['body'])['addClass'](_0x2e53('0x8f')),setTimeout(function(){_0x18c660(document[_0x2e53('0x38')])['removeClass'](_0x2e53('0x8f'));},_0x2c1b21['timeRemoveNewItemClass']));}();});(function(){_QuatroDigital_DropDown['getOrderForm'][_0x2e53('0x65')][_0x2e53('0x7')]?(_0x18c660(_0x2e53('0x38'))[_0x2e53('0x37')](_0x2e53('0x90'))[_0x2e53('0x8d')](_0x2e53('0x91')),setTimeout(function(){_0x18c660('body')[_0x2e53('0x37')](_0x2e53('0x92'));},_0x2c1b21[_0x2e53('0x68')])):_0x18c660('body')['removeClass'](_0x2e53('0x93'))['addClass'](_0x2e53('0x90'));}());'function'===typeof _0x2c1b21[_0x2e53('0x94')]?_0x2c1b21[_0x2e53('0x94')][_0x2e53('0x5f')](this):_0x29aa66(_0x2e53('0x95'));};_0x44d445[_0x2e53('0x82')]=function(_0x455785,_0xc98279,_0x3cfcbe){function _0x5ae3dd(){_0xc98279['removeClass'](_0x2e53('0x96'))[_0x2e53('0x97')](function(){_0x18c660(this)[_0x2e53('0x8d')](_0x2e53('0x96'));})[_0x2e53('0x7f')](_0x2e53('0x98'),_0x3cfcbe);}_0x3cfcbe?_0x5ae3dd():isNaN(_0x455785)?_0x29aa66('Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU',_0x2e53('0x16')):alert(_0x2e53('0x99'));};_0x44d445[_0x2e53('0x87')]=function(_0x5de94a){var _0x51811b=function(_0x38cfed,_0x50c3a7){var _0x3dcac7=_0x18c660(_0x38cfed);var _0x5cdf4d=_0x3dcac7['attr'](_0x2e53('0x9a'));var _0x30d45b=_0x3dcac7[_0x2e53('0x7f')](_0x2e53('0x9b'));if(_0x5cdf4d){var _0x3c6e5e=parseInt(_0x3dcac7[_0x2e53('0x45')]())||0x1;_0x44d445[_0x2e53('0x9c')]([_0x5cdf4d,_0x30d45b],_0x3c6e5e,_0x3c6e5e+0x1,function(_0xdc7c4b){_0x3dcac7[_0x2e53('0x45')](_0xdc7c4b);_0x2e53('0xd')===typeof _0x50c3a7&&_0x50c3a7();});}};var _0x28085e=function(_0x5d477b,_0x5dd887){var _0x38bca0=_0x18c660(_0x5d477b);var _0x30d45b=_0x38bca0['attr'](_0x2e53('0x9a'));var _0x1355bd=_0x38bca0[_0x2e53('0x7f')](_0x2e53('0x9b'));if(_0x30d45b){var _0x230d4f=parseInt(_0x38bca0['val']())||0x2;_0x44d445['changeQantity']([_0x30d45b,_0x1355bd],_0x230d4f,_0x230d4f-0x1,function(_0x2d88da){_0x38bca0['val'](_0x2d88da);'function'===typeof _0x5dd887&&_0x5dd887();});}};var _0x27225c=function(_0x5eb60c,_0x51c549){var _0x51811b=_0x18c660(_0x5eb60c);var _0x30d45b=_0x51811b[_0x2e53('0x7f')]('data-sku');var _0x54e358=_0x51811b['attr'](_0x2e53('0x9b'));if(_0x30d45b){var _0x24d61f=parseInt(_0x51811b['val']())||0x1;_0x44d445[_0x2e53('0x9c')]([_0x30d45b,_0x54e358],0x1,_0x24d61f,function(_0x17fd8d){_0x51811b[_0x2e53('0x45')](_0x17fd8d);'function'===typeof _0x51c549&&_0x51c549();});}};var _0x30d45b=_0x5de94a[_0x2e53('0x33')]('.qd-ddc-prodQttWrapper:not(.qd_on)');_0x30d45b[_0x2e53('0x8d')](_0x2e53('0x9d'))[_0x2e53('0x5e')](function(){var _0x5de94a=_0x18c660(this);_0x5de94a[_0x2e53('0x33')](_0x2e53('0x9e'))['on'](_0x2e53('0x9f'),function(_0x27377c){_0x27377c['preventDefault']();_0x30d45b['addClass'](_0x2e53('0xa0'));_0x51811b(_0x5de94a[_0x2e53('0x33')](_0x2e53('0x7e')),function(){_0x30d45b[_0x2e53('0x37')](_0x2e53('0xa0'));});});_0x5de94a[_0x2e53('0x33')]('.qd-ddc-quantityMinus')['on'](_0x2e53('0xa1'),function(_0x29bf5d){_0x29bf5d[_0x2e53('0xa2')]();_0x30d45b[_0x2e53('0x8d')](_0x2e53('0xa0'));_0x28085e(_0x5de94a[_0x2e53('0x33')](_0x2e53('0x7e')),function(){_0x30d45b[_0x2e53('0x37')]('qd-loading');});});_0x5de94a['find'](_0x2e53('0x7e'))['on']('focusout.qd_ddc_change',function(){_0x30d45b[_0x2e53('0x8d')](_0x2e53('0xa0'));_0x27225c(this,function(){_0x30d45b[_0x2e53('0x37')](_0x2e53('0xa0'));});});_0x5de94a[_0x2e53('0x33')](_0x2e53('0x7e'))['on'](_0x2e53('0xa3'),function(_0x4c8d1f){0xd==_0x4c8d1f['keyCode']&&(_0x30d45b[_0x2e53('0x8d')]('qd-loading'),_0x27225c(this,function(){_0x30d45b[_0x2e53('0x37')](_0x2e53('0xa0'));}));});});_0x5de94a[_0x2e53('0x33')]('.qd-ddc-prodRow')['each'](function(){var _0x5de94a=_0x18c660(this);_0x5de94a[_0x2e53('0x33')](_0x2e53('0x81'))['on'](_0x2e53('0xa4'),function(){_0x5de94a['addClass'](_0x2e53('0xa0'));_0x44d445[_0x2e53('0xa5')](_0x18c660(this),function(_0x3cbe50){_0x3cbe50?_0x5de94a[_0x2e53('0xa6')](!0x0)[_0x2e53('0xa7')](function(){_0x5de94a[_0x2e53('0xa8')]();_0x44d445[_0x2e53('0x4b')]();}):_0x5de94a[_0x2e53('0x37')](_0x2e53('0xa0'));});return!0x1;});});};_0x44d445[_0x2e53('0x47')]=function(_0x1b1245){var _0x2b5b1f=_0x1b1245[_0x2e53('0x45')]();_0x2b5b1f=_0x2b5b1f[_0x2e53('0x8')](/[^0-9\-]/g,'');_0x2b5b1f=_0x2b5b1f[_0x2e53('0x8')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x2e53('0xa9'));_0x2b5b1f=_0x2b5b1f[_0x2e53('0x8')](/(.{9}).*/g,'$1');_0x1b1245['val'](_0x2b5b1f);0x9<=_0x2b5b1f[_0x2e53('0x7')]&&(_0x1b1245['data'](_0x2e53('0xaa'))!=_0x2b5b1f&&_0x42bbc4[_0x2e53('0xab')]({'postalCode':_0x2b5b1f,'country':_0x2e53('0xac')})[_0x2e53('0xad')](function(_0x56ed57){window[_0x2e53('0x19')][_0x2e53('0x6a')]=_0x56ed57;_0x44d445['getCartInfoByUrl']();})[_0x2e53('0xae')](function(_0x30482b){_0x29aa66([_0x2e53('0xaf'),_0x30482b]);updateCartData();}),_0x1b1245[_0x2e53('0xb0')](_0x2e53('0xaa'),_0x2b5b1f));};_0x44d445[_0x2e53('0x9c')]=function(_0x1662d7,_0x1f192a,_0x5a741f,_0x459110){function _0x38a5c4(_0x43e799){_0x43e799=_0x2e53('0xb1')!==typeof _0x43e799?!0x1:_0x43e799;_0x44d445[_0x2e53('0x4a')]();window[_0x2e53('0x19')]['allowUpdate']=!0x1;_0x44d445[_0x2e53('0x4b')]();'undefined'!==typeof window[_0x2e53('0x6b')]&&_0x2e53('0xd')===typeof window[_0x2e53('0x6b')][_0x2e53('0x6c')]&&window[_0x2e53('0x6b')][_0x2e53('0x6c')][_0x2e53('0x5f')](this);_0x2e53('0xd')===typeof adminCart&&adminCart();_0x18c660['fn'][_0x2e53('0xb2')](!0x0,void 0x0,_0x43e799);_0x2e53('0xd')===typeof _0x459110&&_0x459110(_0x1f192a);}_0x5a741f=_0x5a741f||0x1;if(0x1>_0x5a741f)return _0x1f192a;if(_0x2c1b21[_0x2e53('0x26')]){if(_0x2e53('0x3')===typeof window[_0x2e53('0x19')][_0x2e53('0x6a')][_0x2e53('0x65')][_0x1662d7[0x1]])return _0x29aa66(_0x2e53('0xb3')+_0x1662d7[0x1]+']'),_0x1f192a;window[_0x2e53('0x19')][_0x2e53('0x6a')][_0x2e53('0x65')][_0x1662d7[0x1]]['quantity']=_0x5a741f;window[_0x2e53('0x19')][_0x2e53('0x6a')][_0x2e53('0x65')][_0x1662d7[0x1]][_0x2e53('0xb4')]=_0x1662d7[0x1];_0x42bbc4[_0x2e53('0xb5')]([window[_0x2e53('0x19')][_0x2e53('0x6a')][_0x2e53('0x65')][_0x1662d7[0x1]]],[_0x2e53('0x65'),'totalizers','shippingData'])[_0x2e53('0xad')](function(_0x5ca3d3){window[_0x2e53('0x19')][_0x2e53('0x6a')]=_0x5ca3d3;_0x38a5c4(!0x0);})['fail'](function(_0x35c826){_0x29aa66(['Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho',_0x35c826]);_0x38a5c4();});}else _0x29aa66('atenção\x20esta\x20método\x20esta\x20descontinuado');};_0x44d445['removeProduct']=function(_0x4e182f,_0x122684){function _0x456781(_0x348aaa){_0x348aaa=_0x2e53('0xb1')!==typeof _0x348aaa?!0x1:_0x348aaa;_0x2e53('0x3')!==typeof window[_0x2e53('0x6b')]&&_0x2e53('0xd')===typeof window[_0x2e53('0x6b')][_0x2e53('0x6c')]&&window[_0x2e53('0x6b')][_0x2e53('0x6c')][_0x2e53('0x5f')](this);'function'===typeof adminCart&&adminCart();_0x18c660['fn'][_0x2e53('0xb2')](!0x0,void 0x0,_0x348aaa);_0x2e53('0xd')===typeof _0x122684&&_0x122684(_0x30d45b);}var _0x30d45b=!0x1,_0x3562ad=_0x18c660(_0x4e182f)[_0x2e53('0x7f')](_0x2e53('0x9b'));if(_0x2c1b21[_0x2e53('0x26')]){if(_0x2e53('0x3')===typeof window[_0x2e53('0x19')][_0x2e53('0x6a')][_0x2e53('0x65')][_0x3562ad])return _0x29aa66(_0x2e53('0xb3')+_0x3562ad+']'),_0x30d45b;window[_0x2e53('0x19')][_0x2e53('0x6a')][_0x2e53('0x65')][_0x3562ad]['index']=_0x3562ad;_0x42bbc4[_0x2e53('0xb6')]([window[_0x2e53('0x19')]['getOrderForm'][_0x2e53('0x65')][_0x3562ad]],['items',_0x2e53('0x6e'),_0x2e53('0x6f')])['done'](function(_0x2f46f9){_0x30d45b=!0x0;window[_0x2e53('0x19')]['getOrderForm']=_0x2f46f9;_0x1c0d0a(_0x2f46f9);_0x456781(!0x0);})[_0x2e53('0xae')](function(_0x467cd5){_0x29aa66([_0x2e53('0xb7'),_0x467cd5]);_0x456781();});}else alert(_0x2e53('0xb8'));};_0x44d445[_0x2e53('0x41')]=function(_0x299ab0,_0x1cbdf6,_0x29bd18,_0x561859){_0x561859=_0x561859||_0x18c660(_0x2e53('0xb9'));_0x299ab0=_0x299ab0||'+';_0x1cbdf6=_0x1cbdf6||0.9*_0x561859[_0x2e53('0xba')]();_0x561859[_0x2e53('0xa6')](!0x0,!0x0)['animate']({'scrollTop':isNaN(_0x29bd18)?_0x299ab0+'='+_0x1cbdf6+'px':_0x29bd18});};_0x2c1b21[_0x2e53('0x48')]||(_0x44d445[_0x2e53('0x4a')](),_0x18c660['fn']['simpleCart'](!0x0));_0x18c660(window)['on'](_0x2e53('0xbb'),function(){try{window[_0x2e53('0x19')][_0x2e53('0x6a')]=void 0x0,_0x44d445[_0x2e53('0x4a')]();}catch(_0x18314d){_0x29aa66(_0x2e53('0xbc')+_0x18314d[_0x2e53('0x10')],'avisso');}});_0x2e53('0xd')===typeof _0x2c1b21[_0x2e53('0xb')]?_0x2c1b21[_0x2e53('0xb')][_0x2e53('0x5f')](this):_0x29aa66(_0x2e53('0xbd'));};_0x18c660['fn'][_0x2e53('0x1b')]=function(_0xbfb5a9){var _0x505215=_0x18c660(this);_0x505215['fn']=new _0x18c660[(_0x2e53('0x1b'))](this,_0xbfb5a9);return _0x505215;};}catch(_0x253d7e){'undefined'!==typeof console&&_0x2e53('0xd')===typeof console[_0x2e53('0xe')]&&console[_0x2e53('0xe')](_0x2e53('0xf'),_0x253d7e);}}(this));(function(_0x32b5dc){try{var _0x526dd8=jQuery;window[_0x2e53('0x6b')]=window['_QuatroDigital_AmountProduct']||{};window[_0x2e53('0x6b')]['items']={};window['_QuatroDigital_AmountProduct'][_0x2e53('0xbe')]=!0x1;window['_QuatroDigital_AmountProduct'][_0x2e53('0xbf')]=!0x1;window[_0x2e53('0x6b')][_0x2e53('0xc0')]=!0x1;var _0x15bcfd=function(){if(window[_0x2e53('0x6b')]['allowRecalculate']){var _0x3c0593=!0x1;var _0x19f337={};window['_QuatroDigital_AmountProduct'][_0x2e53('0x65')]={};for(_0x2fc02e in window[_0x2e53('0x19')][_0x2e53('0x6a')][_0x2e53('0x65')])if(_0x2e53('0x11')===typeof window['_QuatroDigital_DropDown']['getOrderForm'][_0x2e53('0x65')][_0x2fc02e]){var _0x13e240=window[_0x2e53('0x19')]['getOrderForm'][_0x2e53('0x65')][_0x2fc02e];_0x2e53('0x3')!==typeof _0x13e240[_0x2e53('0xc1')]&&null!==_0x13e240['productId']&&''!==_0x13e240[_0x2e53('0xc1')]&&(window[_0x2e53('0x6b')]['items'][_0x2e53('0xc2')+_0x13e240['productId']]=window[_0x2e53('0x6b')][_0x2e53('0x65')]['prod_'+_0x13e240[_0x2e53('0xc1')]]||{},window['_QuatroDigital_AmountProduct']['items'][_0x2e53('0xc2')+_0x13e240[_0x2e53('0xc1')]][_0x2e53('0xc3')]=_0x13e240[_0x2e53('0xc1')],_0x19f337[_0x2e53('0xc2')+_0x13e240[_0x2e53('0xc1')]]||(window['_QuatroDigital_AmountProduct'][_0x2e53('0x65')][_0x2e53('0xc2')+_0x13e240['productId']]['qtt']=0x0),window[_0x2e53('0x6b')][_0x2e53('0x65')][_0x2e53('0xc2')+_0x13e240[_0x2e53('0xc1')]][_0x2e53('0xc4')]+=_0x13e240['quantity'],_0x3c0593=!0x0,_0x19f337['prod_'+_0x13e240[_0x2e53('0xc1')]]=!0x0);}var _0x2fc02e=_0x3c0593;}else _0x2fc02e=void 0x0;window[_0x2e53('0x6b')][_0x2e53('0xbe')]&&(_0x526dd8(_0x2e53('0xc5'))[_0x2e53('0xa8')](),_0x526dd8(_0x2e53('0xc6'))[_0x2e53('0x37')](_0x2e53('0xc7')));for(var _0x3869b5 in window['_QuatroDigital_AmountProduct'][_0x2e53('0x65')]){_0x13e240=window[_0x2e53('0x6b')][_0x2e53('0x65')][_0x3869b5];if(_0x2e53('0x11')!==typeof _0x13e240)return;_0x19f337=_0x526dd8(_0x2e53('0xc8')+_0x13e240[_0x2e53('0xc3')]+']')[_0x2e53('0x0')]('li');if(window[_0x2e53('0x6b')][_0x2e53('0xbe')]||!_0x19f337[_0x2e53('0x33')](_0x2e53('0xc5'))[_0x2e53('0x7')])_0x3c0593=_0x526dd8(_0x2e53('0xc9')),_0x3c0593[_0x2e53('0x33')](_0x2e53('0xca'))[_0x2e53('0x57')](_0x13e240[_0x2e53('0xc4')]),_0x13e240=_0x19f337[_0x2e53('0x33')](_0x2e53('0xcb')),_0x13e240['length']?_0x13e240['prepend'](_0x3c0593)[_0x2e53('0x8d')]('qd-bap-item-added'):_0x19f337[_0x2e53('0xcc')](_0x3c0593);}_0x2fc02e&&(window[_0x2e53('0x6b')][_0x2e53('0xbe')]=!0x1);};window[_0x2e53('0x6b')][_0x2e53('0x6c')]=function(){window[_0x2e53('0x6b')][_0x2e53('0xbe')]=!0x0;_0x15bcfd[_0x2e53('0x5f')](this);};_0x526dd8(document)['ajaxStop'](function(){_0x15bcfd[_0x2e53('0x5f')](this);});}catch(_0x33f66d){_0x2e53('0x3')!==typeof console&&_0x2e53('0xd')===typeof console[_0x2e53('0xe')]&&console[_0x2e53('0xe')]('Oooops!\x20',_0x33f66d);}}(this));(function(){try{var _0x3a8b2f=jQuery,_0x315843,_0x5b3662={'selector':'.qdDdcContainer','dropDown':{},'buyButton':{}};_0x3a8b2f[_0x2e53('0xcd')]=function(_0x4cfac4){var _0x14c16b={};_0x315843=_0x3a8b2f[_0x2e53('0xce')](!0x0,{},_0x5b3662,_0x4cfac4);_0x4cfac4=_0x3a8b2f(_0x315843[_0x2e53('0xcf')])[_0x2e53('0x1b')](_0x315843[_0x2e53('0xd0')]);_0x14c16b[_0x2e53('0xd1')]='undefined'!==typeof _0x315843[_0x2e53('0xd0')][_0x2e53('0x48')]&&!0x1===_0x315843[_0x2e53('0xd0')][_0x2e53('0x48')]?_0x3a8b2f(_0x315843[_0x2e53('0xcf')])['QD_buyButton'](_0x4cfac4['fn'],_0x315843[_0x2e53('0xd1')]):_0x3a8b2f(_0x315843[_0x2e53('0xcf')])[_0x2e53('0xd2')](_0x315843['buyButton']);_0x14c16b[_0x2e53('0xd0')]=_0x4cfac4;return _0x14c16b;};_0x3a8b2f['fn'][_0x2e53('0xd3')]=function(){_0x2e53('0x11')===typeof console&&_0x2e53('0xd')===typeof console[_0x2e53('0x12')]&&console['info'](_0x2e53('0xd4'));};_0x3a8b2f[_0x2e53('0xd3')]=_0x3a8b2f['fn'][_0x2e53('0xd3')];}catch(_0x96943f){'undefined'!==typeof console&&_0x2e53('0xd')===typeof console[_0x2e53('0xe')]&&console[_0x2e53('0xe')](_0x2e53('0xf'),_0x96943f);}}());

/* Quatro Digital - Mosaic Banners // Carlos Vinicius // Todos os direitos reservados */
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);
