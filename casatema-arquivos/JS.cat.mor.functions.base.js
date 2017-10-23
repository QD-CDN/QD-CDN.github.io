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
			Search.shelfLineFix();			
			Search.infinityScroll();			
			Home.sliderFull();			
		},
		ajaxStop: function() {
			Search.shelfLineFix();			
		},
		windowOnload: function() {},
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

			$('.navigation-tabs').prepend('<span class="search-qd-v1-navigator-close hide"><i class="fa fa-times-circle" aria-hidden="true"></i></span>');
			
			$('.search-qd-v1-navigator-close').click(function() {
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
var _0xc7e5=['version','/produto/sku/','QD_smartStockAvailable','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','undefined','alerta','toLowerCase','aviso','info','apply','warn','removeClass','qd-ssa-sku-no-selected','addClass','qd-ssa-sku-selected','SkuSellersInformation','AvailableQuantity','attr','each','find','[data-qd-ssa-text]','hide','qd-ssa-show','filter','length','[data-qd-ssa-text=\x22default\x22]','qd-ssa-hide','html','replace','#qtt','show','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','qd-ssa-on','qd-ssa-skus-','skus','split','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','message','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','trigger','QuatroDigital.ssa.prodUnavailable','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','off','vtex.sku.selected.QD','nfngrzn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','join','toUpperCase','ite','---','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','qdPlugin','initialSkuSelected','QuatroDigital.ssa.skuSelected','prod','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','vtex.sku.selectable','available','unavailable','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','function','qdAjax','qdAjaxQueue','url','opts','push','call','complete','parameters','callbackFns','successPopulated','errorPopulated','boolean','completePopulated','success','object','error','clearQueueDelay','jqXHR','ajax','readyState','data','textStatus','errorThrown'];(function(_0x577e68,_0x476d1e){var _0x3c3803=function(_0x325988){while(--_0x325988){_0x577e68['push'](_0x577e68['shift']());}};_0x3c3803(++_0x476d1e);}(_0xc7e5,0x1af));var _0x5c7e=function(_0x358a5a,_0x700c4a){_0x358a5a=_0x358a5a-0x0;var _0x37c16e=_0xc7e5[_0x358a5a];return _0x37c16e;};(function(_0x3be1e0){if(_0x5c7e('0x0')!==typeof _0x3be1e0[_0x5c7e('0x1')]){var _0x3a95f3={};_0x3be1e0[_0x5c7e('0x2')]=_0x3a95f3;_0x3be1e0[_0x5c7e('0x1')]=function(_0x12aede){var _0x3cf906=_0x3be1e0['extend']({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x12aede);var _0x2542cb=escape(encodeURIComponent(_0x3cf906[_0x5c7e('0x3')]));_0x3a95f3[_0x2542cb]=_0x3a95f3[_0x2542cb]||{};_0x3a95f3[_0x2542cb][_0x5c7e('0x4')]=_0x3a95f3[_0x2542cb][_0x5c7e('0x4')]||[];_0x3a95f3[_0x2542cb][_0x5c7e('0x4')][_0x5c7e('0x5')]({'success':function(_0x303d03,_0x55a7a9,_0x4e9f61){_0x3cf906['success'][_0x5c7e('0x6')](this,_0x303d03,_0x55a7a9,_0x4e9f61);},'error':function(_0x2b5573,_0x5d01ca,_0x1771cb){_0x3cf906['error']['call'](this,_0x2b5573,_0x5d01ca,_0x1771cb);},'complete':function(_0x52f3b6,_0x42f618){_0x3cf906[_0x5c7e('0x7')][_0x5c7e('0x6')](this,_0x52f3b6,_0x42f618);}});_0x3a95f3[_0x2542cb][_0x5c7e('0x8')]=_0x3a95f3[_0x2542cb][_0x5c7e('0x8')]||{'success':{},'error':{},'complete':{}};_0x3a95f3[_0x2542cb]['callbackFns']=_0x3a95f3[_0x2542cb][_0x5c7e('0x9')]||{};_0x3a95f3[_0x2542cb][_0x5c7e('0x9')]['successPopulated']='boolean'===typeof _0x3a95f3[_0x2542cb][_0x5c7e('0x9')][_0x5c7e('0xa')]?_0x3a95f3[_0x2542cb][_0x5c7e('0x9')][_0x5c7e('0xa')]:!0x1;_0x3a95f3[_0x2542cb][_0x5c7e('0x9')][_0x5c7e('0xb')]=_0x5c7e('0xc')===typeof _0x3a95f3[_0x2542cb][_0x5c7e('0x9')][_0x5c7e('0xb')]?_0x3a95f3[_0x2542cb][_0x5c7e('0x9')][_0x5c7e('0xb')]:!0x1;_0x3a95f3[_0x2542cb]['callbackFns'][_0x5c7e('0xd')]=_0x5c7e('0xc')===typeof _0x3a95f3[_0x2542cb][_0x5c7e('0x9')]['completePopulated']?_0x3a95f3[_0x2542cb][_0x5c7e('0x9')][_0x5c7e('0xd')]:!0x1;_0x12aede=_0x3be1e0['extend']({},_0x3cf906,{'success':function(_0x46bf03,_0xc1bbe,_0x5baaa2){_0x3a95f3[_0x2542cb][_0x5c7e('0x8')][_0x5c7e('0xe')]={'data':_0x46bf03,'textStatus':_0xc1bbe,'jqXHR':_0x5baaa2};_0x3a95f3[_0x2542cb]['callbackFns']['successPopulated']=!0x0;for(var _0x312df5 in _0x3a95f3[_0x2542cb][_0x5c7e('0x4')])_0x5c7e('0xf')===typeof _0x3a95f3[_0x2542cb][_0x5c7e('0x4')][_0x312df5]&&(_0x3a95f3[_0x2542cb]['opts'][_0x312df5]['success'][_0x5c7e('0x6')](this,_0x46bf03,_0xc1bbe,_0x5baaa2),_0x3a95f3[_0x2542cb][_0x5c7e('0x4')][_0x312df5][_0x5c7e('0xe')]=function(){});},'error':function(_0x387a79,_0x3f049b,_0x4c583b){_0x3a95f3[_0x2542cb]['parameters'][_0x5c7e('0x10')]={'errorThrown':_0x4c583b,'textStatus':_0x3f049b,'jqXHR':_0x387a79};_0x3a95f3[_0x2542cb]['callbackFns'][_0x5c7e('0xb')]=!0x0;for(var _0x148ce8 in _0x3a95f3[_0x2542cb][_0x5c7e('0x4')])_0x5c7e('0xf')===typeof _0x3a95f3[_0x2542cb][_0x5c7e('0x4')][_0x148ce8]&&(_0x3a95f3[_0x2542cb][_0x5c7e('0x4')][_0x148ce8][_0x5c7e('0x10')][_0x5c7e('0x6')](this,_0x387a79,_0x3f049b,_0x4c583b),_0x3a95f3[_0x2542cb][_0x5c7e('0x4')][_0x148ce8]['error']=function(){});},'complete':function(_0x591893,_0x5043c8){_0x3a95f3[_0x2542cb][_0x5c7e('0x8')][_0x5c7e('0x7')]={'textStatus':_0x5043c8,'jqXHR':_0x591893};_0x3a95f3[_0x2542cb]['callbackFns'][_0x5c7e('0xd')]=!0x0;for(var _0xd80bd5 in _0x3a95f3[_0x2542cb][_0x5c7e('0x4')])_0x5c7e('0xf')===typeof _0x3a95f3[_0x2542cb][_0x5c7e('0x4')][_0xd80bd5]&&(_0x3a95f3[_0x2542cb][_0x5c7e('0x4')][_0xd80bd5][_0x5c7e('0x7')][_0x5c7e('0x6')](this,_0x591893,_0x5043c8),_0x3a95f3[_0x2542cb][_0x5c7e('0x4')][_0xd80bd5][_0x5c7e('0x7')]=function(){});isNaN(parseInt(_0x3cf906[_0x5c7e('0x11')]))||setTimeout(function(){_0x3a95f3[_0x2542cb][_0x5c7e('0x12')]=void 0x0;_0x3a95f3[_0x2542cb][_0x5c7e('0x4')]=void 0x0;_0x3a95f3[_0x2542cb][_0x5c7e('0x8')]=void 0x0;_0x3a95f3[_0x2542cb][_0x5c7e('0x9')]=void 0x0;},_0x3cf906[_0x5c7e('0x11')]);}});'undefined'===typeof _0x3a95f3[_0x2542cb][_0x5c7e('0x12')]?_0x3a95f3[_0x2542cb][_0x5c7e('0x12')]=_0x3be1e0[_0x5c7e('0x13')](_0x12aede):_0x3a95f3[_0x2542cb]['jqXHR']&&_0x3a95f3[_0x2542cb][_0x5c7e('0x12')]['readyState']&&0x4==_0x3a95f3[_0x2542cb]['jqXHR'][_0x5c7e('0x14')]&&(_0x3a95f3[_0x2542cb]['callbackFns'][_0x5c7e('0xa')]&&_0x12aede[_0x5c7e('0xe')](_0x3a95f3[_0x2542cb][_0x5c7e('0x8')][_0x5c7e('0xe')][_0x5c7e('0x15')],_0x3a95f3[_0x2542cb][_0x5c7e('0x8')][_0x5c7e('0xe')][_0x5c7e('0x16')],_0x3a95f3[_0x2542cb][_0x5c7e('0x8')]['success'][_0x5c7e('0x12')]),_0x3a95f3[_0x2542cb][_0x5c7e('0x9')][_0x5c7e('0xb')]&&_0x12aede[_0x5c7e('0x10')](_0x3a95f3[_0x2542cb][_0x5c7e('0x8')][_0x5c7e('0x10')][_0x5c7e('0x12')],_0x3a95f3[_0x2542cb]['parameters']['error']['textStatus'],_0x3a95f3[_0x2542cb][_0x5c7e('0x8')][_0x5c7e('0x10')][_0x5c7e('0x17')]),_0x3a95f3[_0x2542cb][_0x5c7e('0x9')][_0x5c7e('0xd')]&&_0x12aede['complete'](_0x3a95f3[_0x2542cb][_0x5c7e('0x8')]['complete']['jqXHR'],_0x3a95f3[_0x2542cb]['parameters'][_0x5c7e('0x7')]['textStatus']));};_0x3be1e0[_0x5c7e('0x1')][_0x5c7e('0x18')]='2.1';}}(jQuery));(function(_0x48526e){function _0x1f7bb2(_0x5a6cfe,_0x1907f7){_0x4584f3[_0x5c7e('0x1')]({'url':_0x5c7e('0x19')+_0x5a6cfe,'clearQueueDelay':null,'success':_0x1907f7,'error':function(){_0x35004d('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!');}});}var _0x4584f3=jQuery;if(_0x5c7e('0x0')!==typeof _0x4584f3['fn'][_0x5c7e('0x1a')]){var _0x35004d=function(_0x32401b,_0x21c8f1){if(_0x5c7e('0xf')===typeof console){var _0x1b73ba;_0x5c7e('0xf')===typeof _0x32401b?(_0x32401b[_0x5c7e('0x1b')](_0x5c7e('0x1c')),_0x1b73ba=_0x32401b):_0x1b73ba=[_0x5c7e('0x1c')+_0x32401b];_0x5c7e('0x1d')===typeof _0x21c8f1||_0x5c7e('0x1e')!==_0x21c8f1[_0x5c7e('0x1f')]()&&_0x5c7e('0x20')!==_0x21c8f1[_0x5c7e('0x1f')]()?_0x5c7e('0x1d')!==typeof _0x21c8f1&&'info'===_0x21c8f1[_0x5c7e('0x1f')]()?console[_0x5c7e('0x21')]['apply'](console,_0x1b73ba):console['error'][_0x5c7e('0x22')](console,_0x1b73ba):console[_0x5c7e('0x23')][_0x5c7e('0x22')](console,_0x1b73ba);}},_0x21b3c4={},_0x156c40=function(_0x39add6,_0x4b2ce7){function _0x121686(_0x38a789){try{_0x39add6[_0x5c7e('0x24')](_0x5c7e('0x25'))[_0x5c7e('0x26')](_0x5c7e('0x27'));var _0x2c3289=_0x38a789[0x0][_0x5c7e('0x28')][0x0][_0x5c7e('0x29')];_0x39add6[_0x5c7e('0x2a')]('data-qd-ssa-qtt',_0x2c3289);_0x39add6[_0x5c7e('0x2b')](function(){var _0x39add6=_0x4584f3(this)[_0x5c7e('0x2c')](_0x5c7e('0x2d'));if(0x1>_0x2c3289)return _0x39add6[_0x5c7e('0x2e')]()[_0x5c7e('0x26')]('qd-ssa-hide')['removeClass'](_0x5c7e('0x2f'));var _0x38a789=_0x39add6[_0x5c7e('0x30')]('[data-qd-ssa-text=\x22'+_0x2c3289+'\x22]');_0x38a789=_0x38a789[_0x5c7e('0x31')]?_0x38a789:_0x39add6[_0x5c7e('0x30')](_0x5c7e('0x32'));_0x39add6[_0x5c7e('0x2e')]()[_0x5c7e('0x26')](_0x5c7e('0x33'))[_0x5c7e('0x24')](_0x5c7e('0x2f'));_0x38a789[_0x5c7e('0x34')]((_0x38a789['html']()||'')[_0x5c7e('0x35')](_0x5c7e('0x36'),_0x2c3289));_0x38a789[_0x5c7e('0x37')]()['addClass'](_0x5c7e('0x2f'))[_0x5c7e('0x24')](_0x5c7e('0x33'));});}catch(_0x49fe28){_0x35004d([_0x5c7e('0x38'),_0x49fe28['message']]);}}if(_0x39add6[_0x5c7e('0x31')]){_0x39add6[_0x5c7e('0x26')](_0x5c7e('0x39'));_0x39add6[_0x5c7e('0x26')](_0x5c7e('0x25'));try{_0x39add6[_0x5c7e('0x26')](_0x5c7e('0x3a')+vtxctx[_0x5c7e('0x3b')][_0x5c7e('0x3c')](';')[_0x5c7e('0x31')]);}catch(_0x193118){_0x35004d([_0x5c7e('0x3d'),_0x193118[_0x5c7e('0x3e')]]);}_0x4584f3(window)['on'](_0x5c7e('0x3f'),function(_0x25df95,_0x1a2739,_0x878517){try{_0x1f7bb2(_0x878517[_0x5c7e('0x40')],function(_0x452e62){_0x121686(_0x452e62);0x1===vtxctx[_0x5c7e('0x3b')][_0x5c7e('0x3c')](';')['length']&&0x0==_0x452e62[0x0][_0x5c7e('0x28')][0x0]['AvailableQuantity']&&_0x4584f3(window)[_0x5c7e('0x41')](_0x5c7e('0x42'));});}catch(_0x2f91fe){_0x35004d([_0x5c7e('0x43'),_0x2f91fe['message']]);}});_0x4584f3(window)[_0x5c7e('0x44')](_0x5c7e('0x45'));_0x4584f3(window)['on'](_0x5c7e('0x42'),function(){_0x39add6[_0x5c7e('0x26')]('qd-ssa-sku-prod-unavailable')['hide']();});}};_0x48526e=function(_0x852aba){var _0x245b68={'p':_0x5c7e('0x46')};return function(_0xdbc751){var _0xbdc079=function(_0x5cf047){return _0x5cf047;};var _0x116e71=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0xdbc751=_0xdbc751['d'+_0x116e71[0x10]+'c'+_0x116e71[0x11]+'m'+_0xbdc079(_0x116e71[0x1])+'n'+_0x116e71[0xd]]['l'+_0x116e71[0x12]+'c'+_0x116e71[0x0]+'ti'+_0xbdc079('o')+'n'];var _0x58bebe=function(_0x26e9a1){return escape(encodeURIComponent(_0x26e9a1[_0x5c7e('0x35')](/\./g,'¨')[_0x5c7e('0x35')](/[a-zA-Z]/g,function(_0x5236be){return String[_0x5c7e('0x47')](('Z'>=_0x5236be?0x5a:0x7a)>=(_0x5236be=_0x5236be[_0x5c7e('0x48')](0x0)+0xd)?_0x5236be:_0x5236be-0x1a);})));};var _0x5832cf=_0x58bebe(_0xdbc751[[_0x116e71[0x9],_0xbdc079('o'),_0x116e71[0xc],_0x116e71[_0xbdc079(0xd)]][_0x5c7e('0x49')]('')]);_0x58bebe=_0x58bebe((window[['js',_0xbdc079('no'),'m',_0x116e71[0x1],_0x116e71[0x4][_0x5c7e('0x4a')](),_0x5c7e('0x4b')][_0x5c7e('0x49')]('')]||_0x5c7e('0x4c'))+['.v',_0x116e71[0xd],'e',_0xbdc079('x'),'co',_0xbdc079('mm'),'erc',_0x116e71[0x1],'.c',_0xbdc079('o'),'m.',_0x116e71[0x13],'r'][_0x5c7e('0x49')](''));for(var _0x1fe9bc in _0x245b68){if(_0x58bebe===_0x1fe9bc+_0x245b68[_0x1fe9bc]||_0x5832cf===_0x1fe9bc+_0x245b68[_0x1fe9bc]){var _0x348f8d='tr'+_0x116e71[0x11]+'e';break;}_0x348f8d='f'+_0x116e71[0x0]+'ls'+_0xbdc079(_0x116e71[0x1])+'';}_0xbdc079=!0x1;-0x1<_0xdbc751[[_0x116e71[0xc],'e',_0x116e71[0x0],'rc',_0x116e71[0x9]]['join']('')][_0x5c7e('0x4d')](_0x5c7e('0x4e'))&&(_0xbdc079=!0x0);return[_0x348f8d,_0xbdc079];}(_0x852aba);}(window);if(!eval(_0x48526e[0x0]))return _0x48526e[0x1]?_0x35004d(_0x5c7e('0x4f')):!0x1;_0x4584f3['fn'][_0x5c7e('0x1a')]=function(_0x119509){var _0x5b9926=_0x4584f3(this);_0x119509=_0x4584f3[_0x5c7e('0x50')](!0x0,{},_0x21b3c4,_0x119509);_0x5b9926[_0x5c7e('0x51')]=new _0x156c40(_0x5b9926,_0x119509);try{'object'===typeof _0x4584f3['fn'][_0x5c7e('0x1a')][_0x5c7e('0x52')]&&_0x4584f3(window)['trigger'](_0x5c7e('0x53'),[_0x4584f3['fn']['QD_smartStockAvailable'][_0x5c7e('0x52')][_0x5c7e('0x54')],_0x4584f3['fn']['QD_smartStockAvailable'][_0x5c7e('0x52')][_0x5c7e('0x40')]]);}catch(_0x3d341a){_0x35004d([_0x5c7e('0x55'),_0x3d341a['message']]);}_0x4584f3['fn']['QD_smartStockAvailable']['unavailable']&&_0x4584f3(window)[_0x5c7e('0x41')]('QuatroDigital.ssa.prodUnavailable');return _0x5b9926;};_0x4584f3(window)['on'](_0x5c7e('0x45'),function(_0x4c2da0,_0x3a2f58,_0x4fa6b1){try{_0x4584f3['fn']['QD_smartStockAvailable'][_0x5c7e('0x52')]={'prod':_0x3a2f58,'sku':_0x4fa6b1},_0x4584f3(this)[_0x5c7e('0x44')](_0x4c2da0);}catch(_0x53bbee){_0x35004d(['Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20',_0x53bbee[_0x5c7e('0x3e')]]);}});_0x4584f3(window)['on'](_0x5c7e('0x56'),function(_0x44ac25,_0x1c52ff,_0x2aa6b1){try{for(var _0x281703=_0x2aa6b1[_0x5c7e('0x31')],_0x3f90be=_0x1c52ff=0x0;_0x3f90be<_0x281703&&!_0x2aa6b1[_0x3f90be][_0x5c7e('0x57')];_0x3f90be++)_0x1c52ff+=0x1;_0x281703<=_0x1c52ff&&(_0x4584f3['fn'][_0x5c7e('0x1a')][_0x5c7e('0x58')]=!0x0);_0x4584f3(this)[_0x5c7e('0x44')](_0x44ac25);}catch(_0x44bc73){_0x35004d([_0x5c7e('0x59'),_0x44bc73[_0x5c7e('0x3e')]]);}});_0x4584f3(function(){_0x4584f3(_0x5c7e('0x5a'))[_0x5c7e('0x1a')]();});}}(window));
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
var _0xfc57=['html','img[alt=\x27','attr','data-qdam-value','.box-banner','clone','qd-am-content-loaded','insertBefore','hide','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','call','trigger','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','qd-am-elem-','text','trim','replaceSpecialChars','>li','qd-amazing-menu','>ul','qd-am-dropdown-menu','qd-am-dropdown','children','qd-am-level-','add','qd-am-','-li','callback','QuatroDigital.am.callback','exec','.qd_amazing_menu_auto','getParent','function','QD_amazingMenu','/qd-amazing-menu','object','undefined','error','info','unshift','[QD\x20Amazing\x20Menu]\x0a','toLowerCase','aviso','join','warn','qdAmAddNdx','each','addClass','qd-am-li-','first','qd-am-first','qd-am-last','nfngrzn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','find','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-banner-wrapper','qdAjax','url'];(function(_0x2eb2e1,_0x4d334f){var _0x3585fa=function(_0x1cb537){while(--_0x1cb537){_0x2eb2e1['push'](_0x2eb2e1['shift']());}};_0x3585fa(++_0x4d334f);}(_0xfc57,0x6c));var _0x7fc5=function(_0x2d7445,_0x4530d4){_0x2d7445=_0x2d7445-0x0;var _0x23ec53=_0xfc57[_0x2d7445];return _0x23ec53;};(function(_0x3a1b00){_0x3a1b00['fn'][_0x7fc5('0x0')]=_0x3a1b00['fn']['closest'];}(jQuery));(function(_0x6876fa){var _0x1df692;var _0x4bb3de=jQuery;if(_0x7fc5('0x1')!==typeof _0x4bb3de['fn'][_0x7fc5('0x2')]){var _0x209c58={'url':_0x7fc5('0x3'),'callback':function(){},'ajaxCallback':function(){}};var _0x1b0844=function(_0x2ab040,_0x20b488){if(_0x7fc5('0x4')===typeof console&&_0x7fc5('0x5')!==typeof console[_0x7fc5('0x6')]&&_0x7fc5('0x5')!==typeof console[_0x7fc5('0x7')]&&_0x7fc5('0x5')!==typeof console['warn']){var _0x1e218a;_0x7fc5('0x4')===typeof _0x2ab040?(_0x2ab040[_0x7fc5('0x8')](_0x7fc5('0x9')),_0x1e218a=_0x2ab040):_0x1e218a=[_0x7fc5('0x9')+_0x2ab040];if(_0x7fc5('0x5')===typeof _0x20b488||'alerta'!==_0x20b488[_0x7fc5('0xa')]()&&_0x7fc5('0xb')!==_0x20b488[_0x7fc5('0xa')]())if(_0x7fc5('0x5')!==typeof _0x20b488&&_0x7fc5('0x7')===_0x20b488[_0x7fc5('0xa')]())try{console[_0x7fc5('0x7')]['apply'](console,_0x1e218a);}catch(_0x338736){try{console[_0x7fc5('0x7')](_0x1e218a[_0x7fc5('0xc')]('\x0a'));}catch(_0x3b7913){}}else try{console['error']['apply'](console,_0x1e218a);}catch(_0x38c344){try{console[_0x7fc5('0x6')](_0x1e218a[_0x7fc5('0xc')]('\x0a'));}catch(_0x59b272){}}else try{console[_0x7fc5('0xd')]['apply'](console,_0x1e218a);}catch(_0x250352){try{console[_0x7fc5('0xd')](_0x1e218a[_0x7fc5('0xc')]('\x0a'));}catch(_0x5edc21){}}}};_0x4bb3de['fn'][_0x7fc5('0xe')]=function(){var _0x25d433=_0x4bb3de(this);_0x25d433[_0x7fc5('0xf')](function(_0xddc6b9){_0x4bb3de(this)[_0x7fc5('0x10')](_0x7fc5('0x11')+_0xddc6b9);});_0x25d433[_0x7fc5('0x12')]()[_0x7fc5('0x10')](_0x7fc5('0x13'));_0x25d433['last']()[_0x7fc5('0x10')](_0x7fc5('0x14'));return _0x25d433;};_0x4bb3de['fn'][_0x7fc5('0x2')]=function(){};_0x6876fa=function(_0x32bccd){var _0x91d76b={'p':_0x7fc5('0x15')};return function(_0x41a973){var _0x3e6b2b=function(_0x463781){return _0x463781;};var _0x4abe78=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x41a973=_0x41a973['d'+_0x4abe78[0x10]+'c'+_0x4abe78[0x11]+'m'+_0x3e6b2b(_0x4abe78[0x1])+'n'+_0x4abe78[0xd]]['l'+_0x4abe78[0x12]+'c'+_0x4abe78[0x0]+'ti'+_0x3e6b2b('o')+'n'];var _0x14798f=function(_0xd982a2){return escape(encodeURIComponent(_0xd982a2[_0x7fc5('0x16')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x582418){return String[_0x7fc5('0x17')](('Z'>=_0x582418?0x5a:0x7a)>=(_0x582418=_0x582418[_0x7fc5('0x18')](0x0)+0xd)?_0x582418:_0x582418-0x1a);})));};var _0x4cb6d9=_0x14798f(_0x41a973[[_0x4abe78[0x9],_0x3e6b2b('o'),_0x4abe78[0xc],_0x4abe78[_0x3e6b2b(0xd)]][_0x7fc5('0xc')]('')]);_0x14798f=_0x14798f((window[['js',_0x3e6b2b('no'),'m',_0x4abe78[0x1],_0x4abe78[0x4][_0x7fc5('0x19')](),_0x7fc5('0x1a')]['join']('')]||_0x7fc5('0x1b'))+['.v',_0x4abe78[0xd],'e',_0x3e6b2b('x'),'co',_0x3e6b2b('mm'),_0x7fc5('0x1c'),_0x4abe78[0x1],'.c',_0x3e6b2b('o'),'m.',_0x4abe78[0x13],'r']['join'](''));for(var _0x36cff5 in _0x91d76b){if(_0x14798f===_0x36cff5+_0x91d76b[_0x36cff5]||_0x4cb6d9===_0x36cff5+_0x91d76b[_0x36cff5]){var _0x18d8de='tr'+_0x4abe78[0x11]+'e';break;}_0x18d8de='f'+_0x4abe78[0x0]+'ls'+_0x3e6b2b(_0x4abe78[0x1])+'';}_0x3e6b2b=!0x1;-0x1<_0x41a973[[_0x4abe78[0xc],'e',_0x4abe78[0x0],'rc',_0x4abe78[0x9]]['join']('')][_0x7fc5('0x1d')](_0x7fc5('0x1e'))&&(_0x3e6b2b=!0x0);return[_0x18d8de,_0x3e6b2b];}(_0x32bccd);}(window);if(!eval(_0x6876fa[0x0]))return _0x6876fa[0x1]?_0x1b0844('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x403ce6=function(_0x4bf6aa){var _0x564a84=_0x4bf6aa[_0x7fc5('0x1f')]('.qd_am_code');var _0x2f343c=_0x564a84[_0x7fc5('0x20')](_0x7fc5('0x21'));var _0x167793=_0x564a84['filter'](_0x7fc5('0x22'));if(_0x2f343c[_0x7fc5('0x23')]||_0x167793[_0x7fc5('0x23')])_0x2f343c[_0x7fc5('0x24')]()[_0x7fc5('0x10')](_0x7fc5('0x25')),_0x167793[_0x7fc5('0x24')]()[_0x7fc5('0x10')]('qd-am-collection-wrapper'),_0x4bb3de[_0x7fc5('0x26')]({'url':_0x1df692[_0x7fc5('0x27')],'dataType':_0x7fc5('0x28'),'success':function(_0x201bbb){var _0x21e812=_0x4bb3de(_0x201bbb);_0x2f343c['each'](function(){var _0x201bbb=_0x4bb3de(this);var _0x3d8238=_0x21e812[_0x7fc5('0x1f')](_0x7fc5('0x29')+_0x201bbb[_0x7fc5('0x2a')](_0x7fc5('0x2b'))+'\x27]');_0x3d8238[_0x7fc5('0x23')]&&(_0x3d8238['each'](function(){_0x4bb3de(this)['getParent'](_0x7fc5('0x2c'))[_0x7fc5('0x2d')]()['insertBefore'](_0x201bbb);}),_0x201bbb['hide']());})[_0x7fc5('0x10')](_0x7fc5('0x2e'));_0x167793[_0x7fc5('0xf')](function(){var _0x201bbb={};var _0x4d4322=_0x4bb3de(this);_0x21e812[_0x7fc5('0x1f')]('h2')[_0x7fc5('0xf')](function(){if(_0x4bb3de(this)['text']()['trim']()['toLowerCase']()==_0x4d4322['attr'](_0x7fc5('0x2b'))['trim']()[_0x7fc5('0xa')]())return _0x201bbb=_0x4bb3de(this),!0x1;});_0x201bbb['length']&&(_0x201bbb[_0x7fc5('0xf')](function(){_0x4bb3de(this)[_0x7fc5('0x0')]('[class*=\x27colunas\x27]')[_0x7fc5('0x2d')]()[_0x7fc5('0x2f')](_0x4d4322);}),_0x4d4322[_0x7fc5('0x30')]());})[_0x7fc5('0x10')](_0x7fc5('0x2e'));},'error':function(){_0x1b0844(_0x7fc5('0x31')+_0x1df692[_0x7fc5('0x27')]+_0x7fc5('0x32'));},'complete':function(){_0x1df692['ajaxCallback'][_0x7fc5('0x33')](this);_0x4bb3de(window)[_0x7fc5('0x34')]('QuatroDigital.am.ajaxCallback',_0x4bf6aa);},'clearQueueDelay':0xbb8});};_0x4bb3de[_0x7fc5('0x2')]=function(_0x384041){var _0x2114cd=_0x384041['find']('ul[itemscope]')[_0x7fc5('0xf')](function(){var _0x263bcc=_0x4bb3de(this);if(!_0x263bcc[_0x7fc5('0x23')])return _0x1b0844([_0x7fc5('0x35'),_0x384041],'alerta');_0x263bcc[_0x7fc5('0x1f')](_0x7fc5('0x36'))[_0x7fc5('0x24')]()[_0x7fc5('0x10')](_0x7fc5('0x37'));_0x263bcc[_0x7fc5('0x1f')]('li')[_0x7fc5('0xf')](function(){var _0x3613e2=_0x4bb3de(this);var _0x5e8b18=_0x3613e2['children'](':not(ul)');_0x5e8b18[_0x7fc5('0x23')]&&_0x3613e2[_0x7fc5('0x10')](_0x7fc5('0x38')+_0x5e8b18[_0x7fc5('0x12')]()[_0x7fc5('0x39')]()[_0x7fc5('0x3a')]()[_0x7fc5('0x3b')]()[_0x7fc5('0x16')](/\./g,'')[_0x7fc5('0x16')](/\s/g,'-')[_0x7fc5('0xa')]());});var _0x5a0d1a=_0x263bcc[_0x7fc5('0x1f')](_0x7fc5('0x3c'))['qdAmAddNdx']();_0x263bcc[_0x7fc5('0x10')](_0x7fc5('0x3d'));_0x5a0d1a=_0x5a0d1a['find'](_0x7fc5('0x3e'));_0x5a0d1a['each'](function(){var _0x4e6119=_0x4bb3de(this);_0x4e6119[_0x7fc5('0x1f')]('>li')[_0x7fc5('0xe')]()[_0x7fc5('0x10')]('qd-am-column');_0x4e6119['addClass'](_0x7fc5('0x3f'));_0x4e6119[_0x7fc5('0x24')]()[_0x7fc5('0x10')](_0x7fc5('0x40'));});_0x5a0d1a[_0x7fc5('0x10')](_0x7fc5('0x40'));var _0x2ca803=0x0,_0x6876fa=function(_0x64ad3d){_0x2ca803+=0x1;_0x64ad3d=_0x64ad3d[_0x7fc5('0x41')]('li')[_0x7fc5('0x41')]('*');_0x64ad3d['length']&&(_0x64ad3d[_0x7fc5('0x10')](_0x7fc5('0x42')+_0x2ca803),_0x6876fa(_0x64ad3d));};_0x6876fa(_0x263bcc);_0x263bcc[_0x7fc5('0x43')](_0x263bcc['find']('ul'))[_0x7fc5('0xf')](function(){var _0x5b0fdf=_0x4bb3de(this);_0x5b0fdf[_0x7fc5('0x10')](_0x7fc5('0x44')+_0x5b0fdf[_0x7fc5('0x41')]('li')[_0x7fc5('0x23')]+_0x7fc5('0x45'));});});_0x403ce6(_0x2114cd);_0x1df692[_0x7fc5('0x46')][_0x7fc5('0x33')](this);_0x4bb3de(window)[_0x7fc5('0x34')](_0x7fc5('0x47'),_0x384041);};_0x4bb3de['fn'][_0x7fc5('0x2')]=function(_0x188ec9){var _0x5eab07=_0x4bb3de(this);if(!_0x5eab07[_0x7fc5('0x23')])return _0x5eab07;_0x1df692=_0x4bb3de['extend']({},_0x209c58,_0x188ec9);_0x5eab07[_0x7fc5('0x48')]=new _0x4bb3de[(_0x7fc5('0x2'))](_0x4bb3de(this));return _0x5eab07;};_0x4bb3de(function(){_0x4bb3de(_0x7fc5('0x49'))['QD_amazingMenu']();});}}(this));
/* Quatro Digital Smart Cart */
var _0xe62e=['click.qd_ddc_minus','preventDefault','.qd-ddc-remove','click.qd_ddc_remove','stop','slideUp','$1-$2$3','data','qdDdcLastPostalCode','calculateShipping','BRA','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','totalizers','done','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','.qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd_bap_wrapper_content','qd-bap-item-added','prepend','.qdDdcContainer','dropDown','buyButton','selector','QD_buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','closest','replace','undefined','pow','toFixed','split','length','join','_QuatroDigital_CartData','callback','Callbacks','function','error','Oooops!\x20','message','info','warn','object','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','toLowerCase','aviso','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','nfngrzn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','skuName','name','smartCheckout','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','removeClass','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','keyCode','find','.qd-ddc-prodWrapper','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','shippingCalculate','updateOnlyHover','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','texts','cartTotal','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','linkCart','.qd-ddc-infoTotal','html','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','emptyCart','each','call','clone','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','allTotal','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','getCartInfoByUrl','dataOptionsCache','timeRemoveNewItemClass','_QuatroDigital_AmountProduct','exec','.qd-ddc-wrapper','addClass','qd-ddc-prodLoaded','getOrderForm','QD_checkoutQueue','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','attr','qd-ddc-','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','content','.qd-ddc-quantity','val','quantity','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','add','.qd-ddc-shipping\x20input','shippingData','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','filter','[data-sku=\x27','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','body','qd-ddc-product-add-time-v2','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','qd-ddc-cart-empty','callbackProductsList','insertProdImg','load','qd-loaded','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','changeQantity','data-sku-index','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus'];(function(_0x1b8274,_0x8173ff){var _0x4b18a9=function(_0x35332b){while(--_0x35332b){_0x1b8274['push'](_0x1b8274['shift']());}};_0x4b18a9(++_0x8173ff);}(_0xe62e,0x103));var _0xee62=function(_0x352fb0,_0xe7cf47){_0x352fb0=_0x352fb0-0x0;var _0x233f3a=_0xe62e[_0x352fb0];return _0x233f3a;};(function(_0x451333){_0x451333['fn'][_0xee62('0x0')]=_0x451333['fn'][_0xee62('0x1')];}(jQuery));function qd_number_format(_0x476407,_0x2439c5,_0x313be8,_0x44cd4a){_0x476407=(_0x476407+'')[_0xee62('0x2')](/[^0-9+\-Ee.]/g,'');_0x476407=isFinite(+_0x476407)?+_0x476407:0x0;_0x2439c5=isFinite(+_0x2439c5)?Math['abs'](_0x2439c5):0x0;_0x44cd4a=_0xee62('0x3')===typeof _0x44cd4a?',':_0x44cd4a;_0x313be8=_0xee62('0x3')===typeof _0x313be8?'.':_0x313be8;var _0x4b2245='',_0x4b2245=function(_0x3f4cd5,_0x4c1ef7){var _0x2439c5=Math[_0xee62('0x4')](0xa,_0x4c1ef7);return''+(Math['round'](_0x3f4cd5*_0x2439c5)/_0x2439c5)[_0xee62('0x5')](_0x4c1ef7);},_0x4b2245=(_0x2439c5?_0x4b2245(_0x476407,_0x2439c5):''+Math['round'](_0x476407))[_0xee62('0x6')]('.');0x3<_0x4b2245[0x0][_0xee62('0x7')]&&(_0x4b2245[0x0]=_0x4b2245[0x0][_0xee62('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x44cd4a));(_0x4b2245[0x1]||'')[_0xee62('0x7')]<_0x2439c5&&(_0x4b2245[0x1]=_0x4b2245[0x1]||'',_0x4b2245[0x1]+=Array(_0x2439c5-_0x4b2245[0x1]['length']+0x1)[_0xee62('0x8')]('0'));return _0x4b2245['join'](_0x313be8);};(function(){try{window['_QuatroDigital_CartData']=window[_0xee62('0x9')]||{},window[_0xee62('0x9')][_0xee62('0xa')]=window[_0xee62('0x9')][_0xee62('0xa')]||$[_0xee62('0xb')]();}catch(_0x14c9f4){_0xee62('0x3')!==typeof console&&_0xee62('0xc')===typeof console[_0xee62('0xd')]&&console[_0xee62('0xd')](_0xee62('0xe'),_0x14c9f4[_0xee62('0xf')]);}}());(function(_0x3ed282){try{var _0x4696af=jQuery,_0x2eef56=function(_0x16f88a,_0x4429d5){if('object'===typeof console&&_0xee62('0x3')!==typeof console[_0xee62('0xd')]&&'undefined'!==typeof console[_0xee62('0x10')]&&_0xee62('0x3')!==typeof console[_0xee62('0x11')]){var _0x45abd9;_0xee62('0x12')===typeof _0x16f88a?(_0x16f88a[_0xee62('0x13')](_0xee62('0x14')),_0x45abd9=_0x16f88a):_0x45abd9=[_0xee62('0x14')+_0x16f88a];if(_0xee62('0x3')===typeof _0x4429d5||_0xee62('0x15')!==_0x4429d5[_0xee62('0x16')]()&&_0xee62('0x17')!==_0x4429d5[_0xee62('0x16')]())if('undefined'!==typeof _0x4429d5&&_0xee62('0x10')===_0x4429d5['toLowerCase']())try{console[_0xee62('0x10')][_0xee62('0x18')](console,_0x45abd9);}catch(_0x5d9f86){try{console[_0xee62('0x10')](_0x45abd9['join']('\x0a'));}catch(_0x55614e){}}else try{console[_0xee62('0xd')][_0xee62('0x18')](console,_0x45abd9);}catch(_0xdf5889){try{console['error'](_0x45abd9[_0xee62('0x8')]('\x0a'));}catch(_0x1b39a3){}}else try{console[_0xee62('0x11')][_0xee62('0x18')](console,_0x45abd9);}catch(_0x407889){try{console[_0xee62('0x11')](_0x45abd9['join']('\x0a'));}catch(_0x40ae64){}}}};window[_0xee62('0x19')]=window[_0xee62('0x19')]||{};window[_0xee62('0x19')][_0xee62('0x1a')]=!0x0;_0x4696af['QD_dropDownCart']=function(){};_0x4696af['fn'][_0xee62('0x1b')]=function(){return{'fn':new _0x4696af()};};var _0x40ea92=function(_0x58d4d9){var _0x465877={'p':_0xee62('0x1c')};return function(_0x11b5cd){var _0x33b29a=function(_0x42211b){return _0x42211b;};var _0x1f6677=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x11b5cd=_0x11b5cd['d'+_0x1f6677[0x10]+'c'+_0x1f6677[0x11]+'m'+_0x33b29a(_0x1f6677[0x1])+'n'+_0x1f6677[0xd]]['l'+_0x1f6677[0x12]+'c'+_0x1f6677[0x0]+'ti'+_0x33b29a('o')+'n'];var _0x47bf2d=function(_0x5e5a2a){return escape(encodeURIComponent(_0x5e5a2a[_0xee62('0x2')](/\./g,'¨')[_0xee62('0x2')](/[a-zA-Z]/g,function(_0x7b59ee){return String[_0xee62('0x1d')](('Z'>=_0x7b59ee?0x5a:0x7a)>=(_0x7b59ee=_0x7b59ee[_0xee62('0x1e')](0x0)+0xd)?_0x7b59ee:_0x7b59ee-0x1a);})));};var _0x1f8c7c=_0x47bf2d(_0x11b5cd[[_0x1f6677[0x9],_0x33b29a('o'),_0x1f6677[0xc],_0x1f6677[_0x33b29a(0xd)]]['join']('')]);_0x47bf2d=_0x47bf2d((window[['js',_0x33b29a('no'),'m',_0x1f6677[0x1],_0x1f6677[0x4][_0xee62('0x1f')](),_0xee62('0x20')][_0xee62('0x8')]('')]||'---')+['.v',_0x1f6677[0xd],'e',_0x33b29a('x'),'co',_0x33b29a('mm'),_0xee62('0x21'),_0x1f6677[0x1],'.c',_0x33b29a('o'),'m.',_0x1f6677[0x13],'r'][_0xee62('0x8')](''));for(var _0x511e09 in _0x465877){if(_0x47bf2d===_0x511e09+_0x465877[_0x511e09]||_0x1f8c7c===_0x511e09+_0x465877[_0x511e09]){var _0x59a134='tr'+_0x1f6677[0x11]+'e';break;}_0x59a134='f'+_0x1f6677[0x0]+'ls'+_0x33b29a(_0x1f6677[0x1])+'';}_0x33b29a=!0x1;-0x1<_0x11b5cd[[_0x1f6677[0xc],'e',_0x1f6677[0x0],'rc',_0x1f6677[0x9]][_0xee62('0x8')]('')][_0xee62('0x22')](_0xee62('0x23'))&&(_0x33b29a=!0x0);return[_0x59a134,_0x33b29a];}(_0x58d4d9);}(window);if(!eval(_0x40ea92[0x0]))return _0x40ea92[0x1]?_0x2eef56(_0xee62('0x24')):!0x1;_0x4696af[_0xee62('0x1b')]=function(_0x4bba5b,_0xfb7c27){var _0x36bb55=_0x4696af(_0x4bba5b);if(!_0x36bb55[_0xee62('0x7')])return _0x36bb55;var _0x2abfd9=_0x4696af[_0xee62('0x25')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':'Finalizar\x20Compra','cartTotal':_0xee62('0x26'),'emptyCart':_0xee62('0x27'),'continueShopping':_0xee62('0x28'),'shippingForm':'<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x44a99e){return _0x44a99e[_0xee62('0x29')]||_0x44a99e[_0xee62('0x2a')];},'callback':function(){},'callbackProductsList':function(){}},_0xfb7c27);_0x4696af('');var _0x23b753=this;if(_0x2abfd9[_0xee62('0x2b')]){var _0xa01a2b=!0x1;_0xee62('0x3')===typeof window[_0xee62('0x2c')]&&(_0x2eef56(_0xee62('0x2d')),_0x4696af[_0xee62('0x2e')]({'url':_0xee62('0x2f'),'async':!0x1,'dataType':_0xee62('0x30'),'error':function(){_0x2eef56(_0xee62('0x31'));_0xa01a2b=!0x0;}}));if(_0xa01a2b)return _0x2eef56(_0xee62('0x32'));}if(_0xee62('0x12')===typeof window[_0xee62('0x2c')]&&_0xee62('0x3')!==typeof window['vtexjs'][_0xee62('0x33')])var _0x3ed282=window[_0xee62('0x2c')][_0xee62('0x33')];else if(_0xee62('0x12')===typeof vtex&&_0xee62('0x12')===typeof vtex[_0xee62('0x33')]&&'undefined'!==typeof vtex[_0xee62('0x33')][_0xee62('0x34')])_0x3ed282=new vtex[(_0xee62('0x33'))][(_0xee62('0x34'))]();else return _0x2eef56('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x23b753[_0xee62('0x35')]=_0xee62('0x36');var _0x13b22c=function(_0x4dbb57){_0x4696af(this)[_0xee62('0x37')](_0x4dbb57);_0x4dbb57['find'](_0xee62('0x38'))['add'](_0x4696af(_0xee62('0x39')))['on'](_0xee62('0x3a'),function(){_0x36bb55[_0xee62('0x3b')]('qd-bb-lightBoxProdAdd');_0x4696af(document['body'])['removeClass'](_0xee62('0x3c'));});_0x4696af(document)[_0xee62('0x3d')](_0xee62('0x3e'))['on'](_0xee62('0x3e'),function(_0xe9414a){0x1b==_0xe9414a[_0xee62('0x3f')]&&(_0x36bb55[_0xee62('0x3b')]('qd-bb-lightBoxProdAdd'),_0x4696af(document['body'])[_0xee62('0x3b')]('qd-bb-lightBoxBodyProdAdd'));});var _0x3cb7de=_0x4dbb57[_0xee62('0x40')](_0xee62('0x41'));_0x4dbb57[_0xee62('0x40')]('.qd-ddc-scrollUp')['on'](_0xee62('0x42'),function(){_0x23b753[_0xee62('0x43')]('-',void 0x0,void 0x0,_0x3cb7de);return!0x1;});_0x4dbb57[_0xee62('0x40')](_0xee62('0x44'))['on']('click.qd_ddc_scrollDown',function(){_0x23b753['scrollCart'](void 0x0,void 0x0,void 0x0,_0x3cb7de);return!0x1;});_0x4dbb57[_0xee62('0x40')]('.qd-ddc-shipping\x20input')['val']('')['on']('keyup.qd_ddc_cep',function(){_0x23b753[_0xee62('0x45')](_0x4696af(this));});if(_0x2abfd9[_0xee62('0x46')]){var _0xfb7c27=0x0;_0x4696af(this)['on']('mouseenter.qd_ddc_hover',function(){var _0x4dbb57=function(){window[_0xee62('0x19')]['allowUpdate']&&(_0x23b753['getCartInfoByUrl'](),window['_QuatroDigital_DropDown'][_0xee62('0x1a')]=!0x1,_0x4696af['fn'][_0xee62('0x47')](!0x0),_0x23b753[_0xee62('0x48')]());};_0xfb7c27=setInterval(function(){_0x4dbb57();},0x258);_0x4dbb57();});_0x4696af(this)['on'](_0xee62('0x49'),function(){clearInterval(_0xfb7c27);});}};var _0xe11919=function(_0x3bf458){_0x3bf458=_0x4696af(_0x3bf458);_0x2abfd9[_0xee62('0x4a')][_0xee62('0x4b')]=_0x2abfd9['texts'][_0xee62('0x4b')]['replace']('#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>');_0x2abfd9[_0xee62('0x4a')][_0xee62('0x4b')]=_0x2abfd9[_0xee62('0x4a')][_0xee62('0x4b')][_0xee62('0x2')](_0xee62('0x4c'),_0xee62('0x4d'));_0x2abfd9['texts'][_0xee62('0x4b')]=_0x2abfd9[_0xee62('0x4a')]['cartTotal'][_0xee62('0x2')](_0xee62('0x4e'),_0xee62('0x4f'));_0x2abfd9['texts']['cartTotal']=_0x2abfd9[_0xee62('0x4a')][_0xee62('0x4b')][_0xee62('0x2')](_0xee62('0x50'),_0xee62('0x51'));_0x3bf458[_0xee62('0x40')](_0xee62('0x52'))['html'](_0x2abfd9[_0xee62('0x4a')][_0xee62('0x53')]);_0x3bf458[_0xee62('0x40')]('.qd_ddc_continueShopping')['html'](_0x2abfd9[_0xee62('0x4a')]['continueShopping']);_0x3bf458[_0xee62('0x40')]('.qd-ddc-checkout')['html'](_0x2abfd9[_0xee62('0x4a')]['linkCheckout']);_0x3bf458[_0xee62('0x40')](_0xee62('0x54'))[_0xee62('0x55')](_0x2abfd9['texts'][_0xee62('0x4b')]);_0x3bf458[_0xee62('0x40')](_0xee62('0x56'))[_0xee62('0x55')](_0x2abfd9[_0xee62('0x4a')][_0xee62('0x57')]);_0x3bf458[_0xee62('0x40')](_0xee62('0x58'))[_0xee62('0x55')](_0x2abfd9[_0xee62('0x4a')][_0xee62('0x59')]);return _0x3bf458;}(this[_0xee62('0x35')]);var _0x5ba560=0x0;_0x36bb55[_0xee62('0x5a')](function(){0x0<_0x5ba560?_0x13b22c[_0xee62('0x5b')](this,_0xe11919[_0xee62('0x5c')]()):_0x13b22c[_0xee62('0x5b')](this,_0xe11919);_0x5ba560++;});window['_QuatroDigital_CartData'][_0xee62('0xa')]['add'](function(){_0x4696af('.qd-ddc-infoTotalValue')[_0xee62('0x55')](window[_0xee62('0x9')]['total']||'--');_0x4696af(_0xee62('0x5d'))['html'](window[_0xee62('0x9')][_0xee62('0x5e')]||'0');_0x4696af(_0xee62('0x5f'))[_0xee62('0x55')](window['_QuatroDigital_CartData'][_0xee62('0x60')]||'--');_0x4696af(_0xee62('0x61'))[_0xee62('0x55')](window['_QuatroDigital_CartData'][_0xee62('0x62')]||'--');});var _0x1adccb=function(_0x333523,_0x1f87a9){if(_0xee62('0x3')===typeof _0x333523[_0xee62('0x63')])return _0x2eef56(_0xee62('0x64'));_0x23b753[_0xee62('0x65')]['call'](this,_0x1f87a9);};_0x23b753[_0xee62('0x66')]=function(_0x5616f8,_0x547c76){'undefined'!=typeof _0x547c76?window[_0xee62('0x19')][_0xee62('0x67')]=_0x547c76:window[_0xee62('0x19')][_0xee62('0x67')]&&(_0x547c76=window[_0xee62('0x19')]['dataOptionsCache']);setTimeout(function(){window[_0xee62('0x19')]['dataOptionsCache']=void 0x0;},_0x2abfd9[_0xee62('0x68')]);_0x4696af('.qd-ddc-wrapper')['removeClass']('qd-ddc-prodLoaded');if(_0x2abfd9['smartCheckout']){var _0xfb7c27=function(_0x3a7db3){window['_QuatroDigital_DropDown']['getOrderForm']=_0x3a7db3;_0x1adccb(_0x3a7db3,_0x547c76);_0xee62('0x3')!==typeof window[_0xee62('0x69')]&&_0xee62('0xc')===typeof window[_0xee62('0x69')][_0xee62('0x6a')]&&window[_0xee62('0x69')][_0xee62('0x6a')]['call'](this);_0x4696af(_0xee62('0x6b'))[_0xee62('0x6c')](_0xee62('0x6d'));};_0xee62('0x3')!==typeof window[_0xee62('0x19')][_0xee62('0x6e')]?(_0xfb7c27(window[_0xee62('0x19')]['getOrderForm']),_0xee62('0xc')===typeof _0x5616f8&&_0x5616f8(window['_QuatroDigital_DropDown'][_0xee62('0x6e')])):_0x4696af[_0xee62('0x6f')]([_0xee62('0x63'),'totalizers','shippingData'],{'done':function(_0x21ae2c){_0xfb7c27[_0xee62('0x5b')](this,_0x21ae2c);_0xee62('0xc')===typeof _0x5616f8&&_0x5616f8(_0x21ae2c);},'fail':function(_0x27fc9e){_0x2eef56([_0xee62('0x70'),_0x27fc9e]);}});}else alert('Este\x20método\x20esta\x20descontinuado!');};_0x23b753[_0xee62('0x48')]=function(){var _0x24d188=_0x4696af(_0xee62('0x6b'));_0x24d188[_0xee62('0x40')]('.qd-ddc-prodRow')['length']?_0x24d188[_0xee62('0x3b')](_0xee62('0x71')):_0x24d188[_0xee62('0x6c')]('qd-ddc-noItems');};_0x23b753['renderProductsList']=function(_0x2f26a9){var _0xfb7c27=_0x4696af(_0xee62('0x72'));_0xfb7c27[_0xee62('0x73')]();_0xfb7c27['each'](function(){var _0xfb7c27=_0x4696af(this),_0x5eadf6,_0x4bba5b,_0x19b84c=_0x4696af(''),_0x40bc81;for(_0x40bc81 in window[_0xee62('0x19')][_0xee62('0x6e')][_0xee62('0x63')])if(_0xee62('0x12')===typeof window[_0xee62('0x19')][_0xee62('0x6e')][_0xee62('0x63')][_0x40bc81]){var _0x42bdc9=window[_0xee62('0x19')][_0xee62('0x6e')][_0xee62('0x63')][_0x40bc81];var _0x3d8d61=_0x42bdc9['productCategoryIds']['replace'](/^\/|\/$/g,'')[_0xee62('0x6')]('/');var _0x3b43ad=_0x4696af(_0xee62('0x74'));_0x3b43ad[_0xee62('0x75')]({'data-sku':_0x42bdc9['id'],'data-sku-index':_0x40bc81,'data-qd-departament':_0x3d8d61[0x0],'data-qd-category':_0x3d8d61[_0x3d8d61[_0xee62('0x7')]-0x1]});_0x3b43ad[_0xee62('0x6c')](_0xee62('0x76')+_0x42bdc9[_0xee62('0x77')]);_0x3b43ad['find'](_0xee62('0x78'))[_0xee62('0x37')](_0x2abfd9[_0xee62('0x29')](_0x42bdc9));_0x3b43ad[_0xee62('0x40')](_0xee62('0x79'))[_0xee62('0x37')](isNaN(_0x42bdc9[_0xee62('0x7a')])?_0x42bdc9[_0xee62('0x7a')]:0x0==_0x42bdc9[_0xee62('0x7a')]?_0xee62('0x7b'):(_0x4696af(_0xee62('0x7c'))['attr'](_0xee62('0x7d'))||'R$')+'\x20'+qd_number_format(_0x42bdc9[_0xee62('0x7a')]/0x64,0x2,',','.'));_0x3b43ad[_0xee62('0x40')](_0xee62('0x7e'))[_0xee62('0x75')]({'data-sku':_0x42bdc9['id'],'data-sku-index':_0x40bc81})[_0xee62('0x7f')](_0x42bdc9[_0xee62('0x80')]);_0x3b43ad['find']('.qd-ddc-remove')[_0xee62('0x75')]({'data-sku':_0x42bdc9['id'],'data-sku-index':_0x40bc81});_0x23b753['insertProdImg'](_0x42bdc9['id'],_0x3b43ad[_0xee62('0x40')](_0xee62('0x81')),_0x42bdc9[_0xee62('0x82')]);_0x3b43ad[_0xee62('0x40')](_0xee62('0x83'))['attr']({'data-sku':_0x42bdc9['id'],'data-sku-index':_0x40bc81});_0x3b43ad[_0xee62('0x84')](_0xfb7c27);_0x19b84c=_0x19b84c[_0xee62('0x85')](_0x3b43ad);}try{var _0x3ed282=_0xfb7c27[_0xee62('0x0')]('.qd-ddc-wrapper')[_0xee62('0x40')](_0xee62('0x86'));_0x3ed282[_0xee62('0x7')]&&''==_0x3ed282[_0xee62('0x7f')]()&&window[_0xee62('0x19')][_0xee62('0x6e')][_0xee62('0x87')]['address']&&_0x3ed282['val'](window[_0xee62('0x19')]['getOrderForm'][_0xee62('0x87')]['address']['postalCode']);}catch(_0x3a4681){_0x2eef56(_0xee62('0x88')+_0x3a4681[_0xee62('0xf')],_0xee62('0x17'));}_0x23b753[_0xee62('0x89')](_0xfb7c27);_0x23b753[_0xee62('0x48')]();_0x2f26a9&&_0x2f26a9['lastSku']&&function(){_0x4bba5b=_0x19b84c[_0xee62('0x8a')](_0xee62('0x8b')+_0x2f26a9['lastSku']+'\x27]');_0x4bba5b[_0xee62('0x7')]&&(_0x5eadf6=0x0,_0x19b84c[_0xee62('0x5a')](function(){var _0x2f26a9=_0x4696af(this);if(_0x2f26a9['is'](_0x4bba5b))return!0x1;_0x5eadf6+=_0x2f26a9[_0xee62('0x8c')]();}),_0x23b753[_0xee62('0x43')](void 0x0,void 0x0,_0x5eadf6,_0xfb7c27['add'](_0xfb7c27['parent']())),_0x19b84c[_0xee62('0x3b')](_0xee62('0x8d')),function(_0x45697f){_0x45697f[_0xee62('0x6c')]('qd-ddc-lastAdded');_0x45697f[_0xee62('0x6c')]('qd-ddc-lastAddedFixed');setTimeout(function(){_0x45697f[_0xee62('0x3b')](_0xee62('0x8e'));},_0x2abfd9[_0xee62('0x68')]);}(_0x4bba5b),_0x4696af(document[_0xee62('0x8f')])[_0xee62('0x6c')]('qd-ddc-product-add-time-v2'),setTimeout(function(){_0x4696af(document[_0xee62('0x8f')])[_0xee62('0x3b')](_0xee62('0x90'));},_0x2abfd9[_0xee62('0x68')]));}();});(function(){_QuatroDigital_DropDown['getOrderForm'][_0xee62('0x63')][_0xee62('0x7')]?(_0x4696af(_0xee62('0x8f'))[_0xee62('0x3b')]('qd-ddc-cart-empty')[_0xee62('0x6c')](_0xee62('0x91')),setTimeout(function(){_0x4696af('body')[_0xee62('0x3b')](_0xee62('0x92'));},_0x2abfd9[_0xee62('0x68')])):_0x4696af(_0xee62('0x8f'))[_0xee62('0x3b')](_0xee62('0x93'))[_0xee62('0x6c')](_0xee62('0x94'));}());'function'===typeof _0x2abfd9[_0xee62('0x95')]?_0x2abfd9[_0xee62('0x95')][_0xee62('0x5b')](this):_0x2eef56('callbackProductsList\x20não\x20é\x20uma\x20função');};_0x23b753[_0xee62('0x96')]=function(_0x374d98,_0x4b287b,_0x3e3820){function _0x51ce17(){_0x4b287b['removeClass']('qd-loaded')[_0xee62('0x97')](function(){_0x4696af(this)[_0xee62('0x6c')](_0xee62('0x98'));})[_0xee62('0x75')]('src',_0x3e3820);}_0x3e3820?_0x51ce17():isNaN(_0x374d98)?_0x2eef56('Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU',_0xee62('0x15')):alert(_0xee62('0x99'));};_0x23b753[_0xee62('0x89')]=function(_0x5c0b00){var _0xfb7c27=function(_0x296ea8,_0x1bd5c7){var _0x528812=_0x4696af(_0x296ea8);var _0x2c5f48=_0x528812[_0xee62('0x75')](_0xee62('0x9a'));var _0x4bba5b=_0x528812[_0xee62('0x75')]('data-sku-index');if(_0x2c5f48){var _0x1f6709=parseInt(_0x528812[_0xee62('0x7f')]())||0x1;_0x23b753[_0xee62('0x9b')]([_0x2c5f48,_0x4bba5b],_0x1f6709,_0x1f6709+0x1,function(_0x4fe706){_0x528812[_0xee62('0x7f')](_0x4fe706);_0xee62('0xc')===typeof _0x1bd5c7&&_0x1bd5c7();});}};var _0x5d4040=function(_0x593479,_0x1ff14e){var _0x29dba0=_0x4696af(_0x593479);var _0x4bba5b=_0x29dba0[_0xee62('0x75')](_0xee62('0x9a'));var _0x32b328=_0x29dba0[_0xee62('0x75')](_0xee62('0x9c'));if(_0x4bba5b){var _0x1c3648=parseInt(_0x29dba0[_0xee62('0x7f')]())||0x2;_0x23b753['changeQantity']([_0x4bba5b,_0x32b328],_0x1c3648,_0x1c3648-0x1,function(_0x4c8384){_0x29dba0[_0xee62('0x7f')](_0x4c8384);_0xee62('0xc')===typeof _0x1ff14e&&_0x1ff14e();});}};var _0x53651e=function(_0xdc143c,_0x3ae670){var _0xfb7c27=_0x4696af(_0xdc143c);var _0x4bba5b=_0xfb7c27[_0xee62('0x75')]('data-sku');var _0x512fe2=_0xfb7c27['attr']('data-sku-index');if(_0x4bba5b){var _0x463328=parseInt(_0xfb7c27['val']())||0x1;_0x23b753[_0xee62('0x9b')]([_0x4bba5b,_0x512fe2],0x1,_0x463328,function(_0x1eb857){_0xfb7c27[_0xee62('0x7f')](_0x1eb857);'function'===typeof _0x3ae670&&_0x3ae670();});}};var _0x4bba5b=_0x5c0b00[_0xee62('0x40')](_0xee62('0x9d'));_0x4bba5b[_0xee62('0x6c')](_0xee62('0x9e'))[_0xee62('0x5a')](function(){var _0x5c0b00=_0x4696af(this);_0x5c0b00[_0xee62('0x40')](_0xee62('0x9f'))['on'](_0xee62('0xa0'),function(_0x329c62){_0x329c62['preventDefault']();_0x4bba5b['addClass'](_0xee62('0xa1'));_0xfb7c27(_0x5c0b00[_0xee62('0x40')](_0xee62('0x7e')),function(){_0x4bba5b[_0xee62('0x3b')](_0xee62('0xa1'));});});_0x5c0b00[_0xee62('0x40')](_0xee62('0xa2'))['on'](_0xee62('0xa3'),function(_0x2d4bc9){_0x2d4bc9[_0xee62('0xa4')]();_0x4bba5b['addClass'](_0xee62('0xa1'));_0x5d4040(_0x5c0b00[_0xee62('0x40')](_0xee62('0x7e')),function(){_0x4bba5b[_0xee62('0x3b')](_0xee62('0xa1'));});});_0x5c0b00[_0xee62('0x40')](_0xee62('0x7e'))['on']('focusout.qd_ddc_change',function(){_0x4bba5b['addClass'](_0xee62('0xa1'));_0x53651e(this,function(){_0x4bba5b[_0xee62('0x3b')]('qd-loading');});});_0x5c0b00[_0xee62('0x40')](_0xee62('0x7e'))['on']('keyup.qd_ddc_change',function(_0x21fd78){0xd==_0x21fd78[_0xee62('0x3f')]&&(_0x4bba5b[_0xee62('0x6c')](_0xee62('0xa1')),_0x53651e(this,function(){_0x4bba5b[_0xee62('0x3b')](_0xee62('0xa1'));}));});});_0x5c0b00['find']('.qd-ddc-prodRow')[_0xee62('0x5a')](function(){var _0x5c0b00=_0x4696af(this);_0x5c0b00[_0xee62('0x40')](_0xee62('0xa5'))['on'](_0xee62('0xa6'),function(){_0x5c0b00[_0xee62('0x6c')](_0xee62('0xa1'));_0x23b753['removeProduct'](_0x4696af(this),function(_0x350a6f){_0x350a6f?_0x5c0b00[_0xee62('0xa7')](!0x0)[_0xee62('0xa8')](function(){_0x5c0b00['remove']();_0x23b753[_0xee62('0x48')]();}):_0x5c0b00[_0xee62('0x3b')](_0xee62('0xa1'));});return!0x1;});});};_0x23b753[_0xee62('0x45')]=function(_0x2ad37b){var _0x5d7a10=_0x2ad37b[_0xee62('0x7f')]();_0x5d7a10=_0x5d7a10[_0xee62('0x2')](/[^0-9\-]/g,'');_0x5d7a10=_0x5d7a10[_0xee62('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0xee62('0xa9'));_0x5d7a10=_0x5d7a10['replace'](/(.{9}).*/g,'$1');_0x2ad37b[_0xee62('0x7f')](_0x5d7a10);0x9<=_0x5d7a10[_0xee62('0x7')]&&(_0x2ad37b[_0xee62('0xaa')](_0xee62('0xab'))!=_0x5d7a10&&_0x3ed282[_0xee62('0xac')]({'postalCode':_0x5d7a10,'country':_0xee62('0xad')})['done'](function(_0x4be1b7){window[_0xee62('0x19')][_0xee62('0x6e')]=_0x4be1b7;_0x23b753[_0xee62('0x66')]();})[_0xee62('0xae')](function(_0x29f85f){_0x2eef56([_0xee62('0xaf'),_0x29f85f]);updateCartData();}),_0x2ad37b[_0xee62('0xaa')](_0xee62('0xab'),_0x5d7a10));};_0x23b753[_0xee62('0x9b')]=function(_0x357b7f,_0x27ef71,_0x566575,_0x39bc8a){function _0x2c0930(_0x356ff2){_0x356ff2=_0xee62('0xb0')!==typeof _0x356ff2?!0x1:_0x356ff2;_0x23b753[_0xee62('0x66')]();window[_0xee62('0x19')]['allowUpdate']=!0x1;_0x23b753[_0xee62('0x48')]();_0xee62('0x3')!==typeof window[_0xee62('0x69')]&&_0xee62('0xc')===typeof window[_0xee62('0x69')][_0xee62('0x6a')]&&window[_0xee62('0x69')][_0xee62('0x6a')][_0xee62('0x5b')](this);_0xee62('0xc')===typeof adminCart&&adminCart();_0x4696af['fn']['simpleCart'](!0x0,void 0x0,_0x356ff2);_0xee62('0xc')===typeof _0x39bc8a&&_0x39bc8a(_0x27ef71);}_0x566575=_0x566575||0x1;if(0x1>_0x566575)return _0x27ef71;if(_0x2abfd9[_0xee62('0x2b')]){if(_0xee62('0x3')===typeof window[_0xee62('0x19')]['getOrderForm'][_0xee62('0x63')][_0x357b7f[0x1]])return _0x2eef56(_0xee62('0xb1')+_0x357b7f[0x1]+']'),_0x27ef71;window[_0xee62('0x19')][_0xee62('0x6e')][_0xee62('0x63')][_0x357b7f[0x1]][_0xee62('0x80')]=_0x566575;window[_0xee62('0x19')][_0xee62('0x6e')][_0xee62('0x63')][_0x357b7f[0x1]][_0xee62('0xb2')]=_0x357b7f[0x1];_0x3ed282[_0xee62('0xb3')]([window['_QuatroDigital_DropDown']['getOrderForm']['items'][_0x357b7f[0x1]]],[_0xee62('0x63'),_0xee62('0xb4'),_0xee62('0x87')])[_0xee62('0xb5')](function(_0x64f266){window[_0xee62('0x19')]['getOrderForm']=_0x64f266;_0x2c0930(!0x0);})['fail'](function(_0x140a25){_0x2eef56([_0xee62('0xb6'),_0x140a25]);_0x2c0930();});}else _0x2eef56(_0xee62('0xb7'));};_0x23b753['removeProduct']=function(_0x2c6080,_0x18567a){function _0x281b8d(_0x56739b){_0x56739b=_0xee62('0xb0')!==typeof _0x56739b?!0x1:_0x56739b;_0xee62('0x3')!==typeof window[_0xee62('0x69')]&&'function'===typeof window[_0xee62('0x69')]['exec']&&window[_0xee62('0x69')][_0xee62('0x6a')][_0xee62('0x5b')](this);_0xee62('0xc')===typeof adminCart&&adminCart();_0x4696af['fn'][_0xee62('0x47')](!0x0,void 0x0,_0x56739b);_0xee62('0xc')===typeof _0x18567a&&_0x18567a(_0x4bba5b);}var _0x4bba5b=!0x1,_0x61ba52=_0x4696af(_0x2c6080)['attr']('data-sku-index');if(_0x2abfd9[_0xee62('0x2b')]){if('undefined'===typeof window[_0xee62('0x19')][_0xee62('0x6e')]['items'][_0x61ba52])return _0x2eef56(_0xee62('0xb1')+_0x61ba52+']'),_0x4bba5b;window[_0xee62('0x19')][_0xee62('0x6e')][_0xee62('0x63')][_0x61ba52][_0xee62('0xb2')]=_0x61ba52;_0x3ed282['removeItems']([window[_0xee62('0x19')][_0xee62('0x6e')][_0xee62('0x63')][_0x61ba52]],[_0xee62('0x63'),'totalizers',_0xee62('0x87')])[_0xee62('0xb5')](function(_0x4a7bbc){_0x4bba5b=!0x0;window[_0xee62('0x19')][_0xee62('0x6e')]=_0x4a7bbc;_0x1adccb(_0x4a7bbc);_0x281b8d(!0x0);})[_0xee62('0xae')](function(_0x1fe2d8){_0x2eef56(['Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho',_0x1fe2d8]);_0x281b8d();});}else alert(_0xee62('0xb8'));};_0x23b753[_0xee62('0x43')]=function(_0x46574b,_0x59b7e3,_0x1634c2,_0x1e0af6){_0x1e0af6=_0x1e0af6||_0x4696af(_0xee62('0xb9'));_0x46574b=_0x46574b||'+';_0x59b7e3=_0x59b7e3||0.9*_0x1e0af6[_0xee62('0xba')]();_0x1e0af6['stop'](!0x0,!0x0)[_0xee62('0xbb')]({'scrollTop':isNaN(_0x1634c2)?_0x46574b+'='+_0x59b7e3+'px':_0x1634c2});};_0x2abfd9[_0xee62('0x46')]||(_0x23b753[_0xee62('0x66')](),_0x4696af['fn']['simpleCart'](!0x0));_0x4696af(window)['on'](_0xee62('0xbc'),function(){try{window[_0xee62('0x19')][_0xee62('0x6e')]=void 0x0,_0x23b753['getCartInfoByUrl']();}catch(_0x355706){_0x2eef56(_0xee62('0xbd')+_0x355706[_0xee62('0xf')],'avisso');}});'function'===typeof _0x2abfd9[_0xee62('0xa')]?_0x2abfd9[_0xee62('0xa')]['call'](this):_0x2eef56(_0xee62('0xbe'));};_0x4696af['fn']['QD_dropDownCart']=function(_0x3286e7){var _0xda8dfc=_0x4696af(this);_0xda8dfc['fn']=new _0x4696af[(_0xee62('0x1b'))](this,_0x3286e7);return _0xda8dfc;};}catch(_0xf9f2f7){_0xee62('0x3')!==typeof console&&_0xee62('0xc')===typeof console[_0xee62('0xd')]&&console[_0xee62('0xd')]('Oooops!\x20',_0xf9f2f7);}}(this));(function(_0x200ec0){try{var _0x143948=jQuery;window[_0xee62('0x69')]=window[_0xee62('0x69')]||{};window[_0xee62('0x69')][_0xee62('0x63')]={};window[_0xee62('0x69')][_0xee62('0xbf')]=!0x1;window['_QuatroDigital_AmountProduct'][_0xee62('0xc0')]=!0x1;window['_QuatroDigital_AmountProduct'][_0xee62('0xc1')]=!0x1;var _0x1bef3a=function(){if(window[_0xee62('0x69')][_0xee62('0xbf')]){var _0x326af3=!0x1;var _0x5f0529={};window['_QuatroDigital_AmountProduct'][_0xee62('0x63')]={};for(_0x1bd980 in window[_0xee62('0x19')][_0xee62('0x6e')][_0xee62('0x63')])if(_0xee62('0x12')===typeof window[_0xee62('0x19')][_0xee62('0x6e')][_0xee62('0x63')][_0x1bd980]){var _0x297a08=window[_0xee62('0x19')]['getOrderForm']['items'][_0x1bd980];_0xee62('0x3')!==typeof _0x297a08[_0xee62('0xc2')]&&null!==_0x297a08[_0xee62('0xc2')]&&''!==_0x297a08[_0xee62('0xc2')]&&(window[_0xee62('0x69')][_0xee62('0x63')][_0xee62('0xc3')+_0x297a08[_0xee62('0xc2')]]=window[_0xee62('0x69')][_0xee62('0x63')][_0xee62('0xc3')+_0x297a08['productId']]||{},window[_0xee62('0x69')][_0xee62('0x63')][_0xee62('0xc3')+_0x297a08[_0xee62('0xc2')]][_0xee62('0xc4')]=_0x297a08[_0xee62('0xc2')],_0x5f0529[_0xee62('0xc3')+_0x297a08[_0xee62('0xc2')]]||(window[_0xee62('0x69')][_0xee62('0x63')][_0xee62('0xc3')+_0x297a08[_0xee62('0xc2')]][_0xee62('0x5e')]=0x0),window[_0xee62('0x69')][_0xee62('0x63')][_0xee62('0xc3')+_0x297a08[_0xee62('0xc2')]][_0xee62('0x5e')]+=_0x297a08['quantity'],_0x326af3=!0x0,_0x5f0529['prod_'+_0x297a08[_0xee62('0xc2')]]=!0x0);}var _0x1bd980=_0x326af3;}else _0x1bd980=void 0x0;window['_QuatroDigital_AmountProduct'][_0xee62('0xbf')]&&(_0x143948(_0xee62('0xc5'))['remove'](),_0x143948(_0xee62('0xc6'))['removeClass']('qd-bap-item-added'));for(var _0x58a5f1 in window['_QuatroDigital_AmountProduct'][_0xee62('0x63')]){_0x297a08=window[_0xee62('0x69')][_0xee62('0x63')][_0x58a5f1];if('object'!==typeof _0x297a08)return;_0x5f0529=_0x143948(_0xee62('0xc7')+_0x297a08[_0xee62('0xc4')]+']')[_0xee62('0x0')]('li');if(window[_0xee62('0x69')][_0xee62('0xbf')]||!_0x5f0529[_0xee62('0x40')](_0xee62('0xc5'))[_0xee62('0x7')])_0x326af3=_0x143948(_0xee62('0xc8')),_0x326af3['find']('.qd-bap-qtt')[_0xee62('0x55')](_0x297a08[_0xee62('0x5e')]),_0x297a08=_0x5f0529[_0xee62('0x40')](_0xee62('0xc9')),_0x297a08[_0xee62('0x7')]?_0x297a08['prepend'](_0x326af3)[_0xee62('0x6c')](_0xee62('0xca')):_0x5f0529[_0xee62('0xcb')](_0x326af3);}_0x1bd980&&(window['_QuatroDigital_AmountProduct'][_0xee62('0xbf')]=!0x1);};window[_0xee62('0x69')][_0xee62('0x6a')]=function(){window[_0xee62('0x69')][_0xee62('0xbf')]=!0x0;_0x1bef3a[_0xee62('0x5b')](this);};_0x143948(document)['ajaxStop'](function(){_0x1bef3a['call'](this);});}catch(_0x242a70){_0xee62('0x3')!==typeof console&&_0xee62('0xc')===typeof console[_0xee62('0xd')]&&console[_0xee62('0xd')](_0xee62('0xe'),_0x242a70);}}(this));(function(){try{var _0x2f8730=jQuery,_0x547e5c,_0x26770a={'selector':_0xee62('0xcc'),'dropDown':{},'buyButton':{}};_0x2f8730['QD_smartCart']=function(_0x2c0b0a){var _0x5649be={};_0x547e5c=_0x2f8730[_0xee62('0x25')](!0x0,{},_0x26770a,_0x2c0b0a);_0x2c0b0a=_0x2f8730(_0x547e5c['selector'])[_0xee62('0x1b')](_0x547e5c[_0xee62('0xcd')]);_0x5649be[_0xee62('0xce')]=_0xee62('0x3')!==typeof _0x547e5c[_0xee62('0xcd')]['updateOnlyHover']&&!0x1===_0x547e5c['dropDown'][_0xee62('0x46')]?_0x2f8730(_0x547e5c[_0xee62('0xcf')])[_0xee62('0xd0')](_0x2c0b0a['fn'],_0x547e5c[_0xee62('0xce')]):_0x2f8730(_0x547e5c[_0xee62('0xcf')])[_0xee62('0xd0')](_0x547e5c[_0xee62('0xce')]);_0x5649be[_0xee62('0xcd')]=_0x2c0b0a;return _0x5649be;};_0x2f8730['fn'][_0xee62('0xd1')]=function(){'object'===typeof console&&_0xee62('0xc')===typeof console[_0xee62('0x10')]&&console['info'](_0xee62('0xd2'));};_0x2f8730[_0xee62('0xd1')]=_0x2f8730['fn']['smartCart'];}catch(_0x2cf86d){'undefined'!==typeof console&&'function'===typeof console['error']&&console['error'](_0xee62('0xe'),_0x2cf86d);}}());

/* Quatro Digital - Mosaic Banners // Carlos Vinicius // Todos os direitos reservados */
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);
