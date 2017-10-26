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
			$('.header-qd-v1-actions-cart, .fixed-buttons-qd-v1 .fixed-buttons-qd-v1-cart').append('<div class="smart-cart-qd-v1-wrapper"><div class="qd-sc-wrapper"></div></div>');
			
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
			Home.scrollToTop();
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
		},
		scrollToTop: function() {
			$('#returnToTop').click(function(e) {
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $('.common-qd-v1-structure').offset().top -100
				}, 900, 'swing');
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
				Product.updateKitTotalPrice();
			}
			else{
				Product.applyCarouselThumb(); $(window).on('skuSelected.vtex', Product.applyCarouselThumb);	
				Product.saveAmountFlag();
				Product.setAvailableBodyClass();
				Product.applyBuyTogetherBackground();
			}
			
			Product.buyButtonWithNotification();
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
			var thumbsWrapper = $('.thumbs').first().clone(); // Wrapper onde foi inserido as thumbs
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

			thumbsWrapper.find('li:first').appendTo(thumbsWrapper);

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

			var thumbIndex;

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
		updateKitTotalPrice: function () {
			// var installment = 1;
			var totalPrice = 0;
			var items = $(".product-qd-v1-kit-item-row:not('.qd-state-not-selected, .qd-item-unavailable') a.buy-in-page-button");
			
			for(var i = 0; i < items.length; i++){
				var sku = '';
				var url = items[i].href;
				if(url.indexOf('sku=') >= 0){
					sku = items[i].href.split('?')[1].match(/sku=(\s*\d+)/i)[1];
				}

				var skuData = Product.getKitItemPrice($(items[i]).attr('productindex'), sku);
				
				// installment = Math.min(installment, skuData['installment']);
				totalPrice += skuData['price'];
			}
			
			
			// $('.product-qd-v1-price-wrapper .skuBestInstallmentNumber').html(installment + "<span class='x'>x</span>");
			// $('.product-qd-v1-price-wrapper .skuBestInstallmentValue').text('R$ ' + (totalPrice / (installment*100)).toFixed(2).toString().replace('.',','));
			$('.product-qd-v1-price-wrapper .skuPrice').text('R$ ' + (totalPrice / 100).toFixed(2).toString().replace('.',',').replace(/(\d{1,3})(\d{3}),/, "$1.$2,"));
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
var _0x0f41=['removeClass','qd-ssa-sku-no-selected','addClass','SkuSellersInformation','AvailableQuantity','attr','each','find','qd-ssa-hide','qd-ssa-show','[data-qd-ssa-text=\x22','[data-qd-ssa-text=\x22default\x22]','hide','html','length','qd-ssa-skus-','skus','split','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','trigger','QuatroDigital.ssa.prodUnavailable','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','message','off','vtex.sku.selected.QD','qd-ssa-sku-prod-unavailable','nfngrzn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','join','toUpperCase','ite','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','initialSkuSelected','QuatroDigital.ssa.skuSelected','prod','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','available','unavailable','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','function','qdAjax','qdAjaxQueue','extend','opts','push','success','call','complete','parameters','callbackFns','successPopulated','boolean','errorPopulated','completePopulated','object','error','clearQueueDelay','jqXHR','undefined','ajax','readyState','textStatus','version','2.1','/produto/sku/','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','QD_smartStockAvailable','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','alerta','toLowerCase','info','apply','warn'];(function(_0x2da084,_0x16f6db){var _0x35c14c=function(_0x45a537){while(--_0x45a537){_0x2da084['push'](_0x2da084['shift']());}};_0x35c14c(++_0x16f6db);}(_0x0f41,0x16e));var _0x10f4=function(_0x512534,_0x216620){_0x512534=_0x512534-0x0;var _0x2f4e5d=_0x0f41[_0x512534];return _0x2f4e5d;};(function(_0x2ea8df){if(_0x10f4('0x0')!==typeof _0x2ea8df[_0x10f4('0x1')]){var _0x1c45a2={};_0x2ea8df[_0x10f4('0x2')]=_0x1c45a2;_0x2ea8df['qdAjax']=function(_0x46810f){var _0x1a72ec=_0x2ea8df[_0x10f4('0x3')]({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x46810f);var _0x899e21=escape(encodeURIComponent(_0x1a72ec['url']));_0x1c45a2[_0x899e21]=_0x1c45a2[_0x899e21]||{};_0x1c45a2[_0x899e21][_0x10f4('0x4')]=_0x1c45a2[_0x899e21]['opts']||[];_0x1c45a2[_0x899e21][_0x10f4('0x4')][_0x10f4('0x5')]({'success':function(_0x3a7b62,_0xdc5167,_0x278ebc){_0x1a72ec[_0x10f4('0x6')][_0x10f4('0x7')](this,_0x3a7b62,_0xdc5167,_0x278ebc);},'error':function(_0x4204d0,_0x42cb26,_0xf05cd7){_0x1a72ec['error'][_0x10f4('0x7')](this,_0x4204d0,_0x42cb26,_0xf05cd7);},'complete':function(_0x399ef9,_0x2c605d){_0x1a72ec[_0x10f4('0x8')][_0x10f4('0x7')](this,_0x399ef9,_0x2c605d);}});_0x1c45a2[_0x899e21][_0x10f4('0x9')]=_0x1c45a2[_0x899e21][_0x10f4('0x9')]||{'success':{},'error':{},'complete':{}};_0x1c45a2[_0x899e21][_0x10f4('0xa')]=_0x1c45a2[_0x899e21][_0x10f4('0xa')]||{};_0x1c45a2[_0x899e21][_0x10f4('0xa')][_0x10f4('0xb')]=_0x10f4('0xc')===typeof _0x1c45a2[_0x899e21][_0x10f4('0xa')]['successPopulated']?_0x1c45a2[_0x899e21]['callbackFns']['successPopulated']:!0x1;_0x1c45a2[_0x899e21]['callbackFns']['errorPopulated']=_0x10f4('0xc')===typeof _0x1c45a2[_0x899e21][_0x10f4('0xa')][_0x10f4('0xd')]?_0x1c45a2[_0x899e21]['callbackFns'][_0x10f4('0xd')]:!0x1;_0x1c45a2[_0x899e21][_0x10f4('0xa')][_0x10f4('0xe')]='boolean'===typeof _0x1c45a2[_0x899e21][_0x10f4('0xa')][_0x10f4('0xe')]?_0x1c45a2[_0x899e21][_0x10f4('0xa')]['completePopulated']:!0x1;_0x46810f=_0x2ea8df[_0x10f4('0x3')]({},_0x1a72ec,{'success':function(_0x1153bc,_0x5c54a7,_0x4e7942){_0x1c45a2[_0x899e21][_0x10f4('0x9')]['success']={'data':_0x1153bc,'textStatus':_0x5c54a7,'jqXHR':_0x4e7942};_0x1c45a2[_0x899e21][_0x10f4('0xa')][_0x10f4('0xb')]=!0x0;for(var _0x2b228e in _0x1c45a2[_0x899e21][_0x10f4('0x4')])'object'===typeof _0x1c45a2[_0x899e21][_0x10f4('0x4')][_0x2b228e]&&(_0x1c45a2[_0x899e21][_0x10f4('0x4')][_0x2b228e][_0x10f4('0x6')][_0x10f4('0x7')](this,_0x1153bc,_0x5c54a7,_0x4e7942),_0x1c45a2[_0x899e21][_0x10f4('0x4')][_0x2b228e]['success']=function(){});},'error':function(_0x3a0827,_0xa20a8a,_0xcff775){_0x1c45a2[_0x899e21][_0x10f4('0x9')]['error']={'errorThrown':_0xcff775,'textStatus':_0xa20a8a,'jqXHR':_0x3a0827};_0x1c45a2[_0x899e21][_0x10f4('0xa')]['errorPopulated']=!0x0;for(var _0x3c6747 in _0x1c45a2[_0x899e21][_0x10f4('0x4')])_0x10f4('0xf')===typeof _0x1c45a2[_0x899e21][_0x10f4('0x4')][_0x3c6747]&&(_0x1c45a2[_0x899e21][_0x10f4('0x4')][_0x3c6747][_0x10f4('0x10')][_0x10f4('0x7')](this,_0x3a0827,_0xa20a8a,_0xcff775),_0x1c45a2[_0x899e21][_0x10f4('0x4')][_0x3c6747][_0x10f4('0x10')]=function(){});},'complete':function(_0x25cecf,_0x58798a){_0x1c45a2[_0x899e21][_0x10f4('0x9')][_0x10f4('0x8')]={'textStatus':_0x58798a,'jqXHR':_0x25cecf};_0x1c45a2[_0x899e21][_0x10f4('0xa')][_0x10f4('0xe')]=!0x0;for(var _0x263b6b in _0x1c45a2[_0x899e21]['opts'])_0x10f4('0xf')===typeof _0x1c45a2[_0x899e21][_0x10f4('0x4')][_0x263b6b]&&(_0x1c45a2[_0x899e21]['opts'][_0x263b6b][_0x10f4('0x8')][_0x10f4('0x7')](this,_0x25cecf,_0x58798a),_0x1c45a2[_0x899e21][_0x10f4('0x4')][_0x263b6b][_0x10f4('0x8')]=function(){});isNaN(parseInt(_0x1a72ec[_0x10f4('0x11')]))||setTimeout(function(){_0x1c45a2[_0x899e21][_0x10f4('0x12')]=void 0x0;_0x1c45a2[_0x899e21][_0x10f4('0x4')]=void 0x0;_0x1c45a2[_0x899e21][_0x10f4('0x9')]=void 0x0;_0x1c45a2[_0x899e21][_0x10f4('0xa')]=void 0x0;},_0x1a72ec['clearQueueDelay']);}});_0x10f4('0x13')===typeof _0x1c45a2[_0x899e21][_0x10f4('0x12')]?_0x1c45a2[_0x899e21][_0x10f4('0x12')]=_0x2ea8df[_0x10f4('0x14')](_0x46810f):_0x1c45a2[_0x899e21][_0x10f4('0x12')]&&_0x1c45a2[_0x899e21][_0x10f4('0x12')]['readyState']&&0x4==_0x1c45a2[_0x899e21][_0x10f4('0x12')][_0x10f4('0x15')]&&(_0x1c45a2[_0x899e21][_0x10f4('0xa')][_0x10f4('0xb')]&&_0x46810f['success'](_0x1c45a2[_0x899e21][_0x10f4('0x9')][_0x10f4('0x6')]['data'],_0x1c45a2[_0x899e21][_0x10f4('0x9')][_0x10f4('0x6')][_0x10f4('0x16')],_0x1c45a2[_0x899e21]['parameters'][_0x10f4('0x6')][_0x10f4('0x12')]),_0x1c45a2[_0x899e21][_0x10f4('0xa')][_0x10f4('0xd')]&&_0x46810f[_0x10f4('0x10')](_0x1c45a2[_0x899e21]['parameters'][_0x10f4('0x10')][_0x10f4('0x12')],_0x1c45a2[_0x899e21][_0x10f4('0x9')]['error'][_0x10f4('0x16')],_0x1c45a2[_0x899e21]['parameters'][_0x10f4('0x10')]['errorThrown']),_0x1c45a2[_0x899e21][_0x10f4('0xa')][_0x10f4('0xe')]&&_0x46810f['complete'](_0x1c45a2[_0x899e21][_0x10f4('0x9')][_0x10f4('0x8')][_0x10f4('0x12')],_0x1c45a2[_0x899e21][_0x10f4('0x9')][_0x10f4('0x8')][_0x10f4('0x16')]));};_0x2ea8df[_0x10f4('0x1')][_0x10f4('0x17')]=_0x10f4('0x18');}}(jQuery));(function(_0x36d2a1){function _0x16cd32(_0x39e9c9,_0xe56f70){_0x26f8c3[_0x10f4('0x1')]({'url':_0x10f4('0x19')+_0x39e9c9,'clearQueueDelay':null,'success':_0xe56f70,'error':function(){_0x5a4f9b(_0x10f4('0x1a'));}});}var _0x26f8c3=jQuery;if(_0x10f4('0x0')!==typeof _0x26f8c3['fn'][_0x10f4('0x1b')]){var _0x5a4f9b=function(_0x11648c,_0x3db223){if(_0x10f4('0xf')===typeof console){var _0x5bdf89;'object'===typeof _0x11648c?(_0x11648c['unshift']('[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a'),_0x5bdf89=_0x11648c):_0x5bdf89=[_0x10f4('0x1c')+_0x11648c];'undefined'===typeof _0x3db223||_0x10f4('0x1d')!==_0x3db223[_0x10f4('0x1e')]()&&'aviso'!==_0x3db223[_0x10f4('0x1e')]()?_0x10f4('0x13')!==typeof _0x3db223&&_0x10f4('0x1f')===_0x3db223[_0x10f4('0x1e')]()?console['info'][_0x10f4('0x20')](console,_0x5bdf89):console[_0x10f4('0x10')]['apply'](console,_0x5bdf89):console[_0x10f4('0x21')][_0x10f4('0x20')](console,_0x5bdf89);}},_0xb67066={},_0x28acc2=function(_0x4300d1,_0x2f347d){function _0x2048ed(_0x4a8f78){try{_0x4300d1[_0x10f4('0x22')](_0x10f4('0x23'))[_0x10f4('0x24')]('qd-ssa-sku-selected');var _0xe23c1=_0x4a8f78[0x0][_0x10f4('0x25')][0x0][_0x10f4('0x26')];_0x4300d1[_0x10f4('0x27')]('data-qd-ssa-qtt',_0xe23c1);_0x4300d1[_0x10f4('0x28')](function(){var _0x4300d1=_0x26f8c3(this)[_0x10f4('0x29')]('[data-qd-ssa-text]');if(0x1>_0xe23c1)return _0x4300d1['hide']()[_0x10f4('0x24')](_0x10f4('0x2a'))['removeClass'](_0x10f4('0x2b'));var _0x4a8f78=_0x4300d1['filter'](_0x10f4('0x2c')+_0xe23c1+'\x22]');_0x4a8f78=_0x4a8f78['length']?_0x4a8f78:_0x4300d1['filter'](_0x10f4('0x2d'));_0x4300d1[_0x10f4('0x2e')]()[_0x10f4('0x24')](_0x10f4('0x2a'))[_0x10f4('0x22')](_0x10f4('0x2b'));_0x4a8f78[_0x10f4('0x2f')]((_0x4a8f78['html']()||'')['replace']('#qtt',_0xe23c1));_0x4a8f78['show']()[_0x10f4('0x24')]('qd-ssa-show')[_0x10f4('0x22')](_0x10f4('0x2a'));});}catch(_0x4f6581){_0x5a4f9b(['Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20',_0x4f6581['message']]);}}if(_0x4300d1[_0x10f4('0x30')]){_0x4300d1[_0x10f4('0x24')]('qd-ssa-on');_0x4300d1[_0x10f4('0x24')](_0x10f4('0x23'));try{_0x4300d1[_0x10f4('0x24')](_0x10f4('0x31')+vtxctx[_0x10f4('0x32')][_0x10f4('0x33')](';')[_0x10f4('0x30')]);}catch(_0x2b69a5){_0x5a4f9b(['Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20',_0x2b69a5['message']]);}_0x26f8c3(window)['on'](_0x10f4('0x34'),function(_0x2ae436,_0x551121,_0x1a04c8){try{_0x16cd32(_0x1a04c8[_0x10f4('0x35')],function(_0x20d77a){_0x2048ed(_0x20d77a);0x1===vtxctx[_0x10f4('0x32')][_0x10f4('0x33')](';')['length']&&0x0==_0x20d77a[0x0][_0x10f4('0x25')][0x0][_0x10f4('0x26')]&&_0x26f8c3(window)[_0x10f4('0x36')](_0x10f4('0x37'));});}catch(_0x1d2d56){_0x5a4f9b([_0x10f4('0x38'),_0x1d2d56[_0x10f4('0x39')]]);}});_0x26f8c3(window)[_0x10f4('0x3a')](_0x10f4('0x3b'));_0x26f8c3(window)['on'](_0x10f4('0x37'),function(){_0x4300d1[_0x10f4('0x24')](_0x10f4('0x3c'))[_0x10f4('0x2e')]();});}};_0x36d2a1=function(_0x3e0eff){var _0x1cdec2={'p':_0x10f4('0x3d')};return function(_0x39ad7d){var _0x385d0b=function(_0x136439){return _0x136439;};var _0x28bc6a=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x39ad7d=_0x39ad7d['d'+_0x28bc6a[0x10]+'c'+_0x28bc6a[0x11]+'m'+_0x385d0b(_0x28bc6a[0x1])+'n'+_0x28bc6a[0xd]]['l'+_0x28bc6a[0x12]+'c'+_0x28bc6a[0x0]+'ti'+_0x385d0b('o')+'n'];var _0x9e0c98=function(_0x164af4){return escape(encodeURIComponent(_0x164af4[_0x10f4('0x3e')](/\./g,'¨')[_0x10f4('0x3e')](/[a-zA-Z]/g,function(_0x57410f){return String[_0x10f4('0x3f')](('Z'>=_0x57410f?0x5a:0x7a)>=(_0x57410f=_0x57410f[_0x10f4('0x40')](0x0)+0xd)?_0x57410f:_0x57410f-0x1a);})));};var _0x10d7ef=_0x9e0c98(_0x39ad7d[[_0x28bc6a[0x9],_0x385d0b('o'),_0x28bc6a[0xc],_0x28bc6a[_0x385d0b(0xd)]][_0x10f4('0x41')]('')]);_0x9e0c98=_0x9e0c98((window[['js',_0x385d0b('no'),'m',_0x28bc6a[0x1],_0x28bc6a[0x4][_0x10f4('0x42')](),_0x10f4('0x43')][_0x10f4('0x41')]('')]||'---')+['.v',_0x28bc6a[0xd],'e',_0x385d0b('x'),'co',_0x385d0b('mm'),'erc',_0x28bc6a[0x1],'.c',_0x385d0b('o'),'m.',_0x28bc6a[0x13],'r'][_0x10f4('0x41')](''));for(var _0x5801de in _0x1cdec2){if(_0x9e0c98===_0x5801de+_0x1cdec2[_0x5801de]||_0x10d7ef===_0x5801de+_0x1cdec2[_0x5801de]){var _0x1ca4f1='tr'+_0x28bc6a[0x11]+'e';break;}_0x1ca4f1='f'+_0x28bc6a[0x0]+'ls'+_0x385d0b(_0x28bc6a[0x1])+'';}_0x385d0b=!0x1;-0x1<_0x39ad7d[[_0x28bc6a[0xc],'e',_0x28bc6a[0x0],'rc',_0x28bc6a[0x9]][_0x10f4('0x41')]('')][_0x10f4('0x44')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x385d0b=!0x0);return[_0x1ca4f1,_0x385d0b];}(_0x3e0eff);}(window);if(!eval(_0x36d2a1[0x0]))return _0x36d2a1[0x1]?_0x5a4f9b(_0x10f4('0x45')):!0x1;_0x26f8c3['fn'][_0x10f4('0x1b')]=function(_0x575959){var _0x57d739=_0x26f8c3(this);_0x575959=_0x26f8c3['extend'](!0x0,{},_0xb67066,_0x575959);_0x57d739['qdPlugin']=new _0x28acc2(_0x57d739,_0x575959);try{_0x10f4('0xf')===typeof _0x26f8c3['fn']['QD_smartStockAvailable'][_0x10f4('0x46')]&&_0x26f8c3(window)[_0x10f4('0x36')](_0x10f4('0x47'),[_0x26f8c3['fn'][_0x10f4('0x1b')]['initialSkuSelected'][_0x10f4('0x48')],_0x26f8c3['fn']['QD_smartStockAvailable'][_0x10f4('0x46')][_0x10f4('0x35')]]);}catch(_0x4fc09b){_0x5a4f9b([_0x10f4('0x49'),_0x4fc09b[_0x10f4('0x39')]]);}_0x26f8c3['fn'][_0x10f4('0x1b')]['unavailable']&&_0x26f8c3(window)['trigger']('QuatroDigital.ssa.prodUnavailable');return _0x57d739;};_0x26f8c3(window)['on']('vtex.sku.selected.QD',function(_0x30d75d,_0x420591,_0x2e0ca3){try{_0x26f8c3['fn'][_0x10f4('0x1b')][_0x10f4('0x46')]={'prod':_0x420591,'sku':_0x2e0ca3},_0x26f8c3(this)[_0x10f4('0x3a')](_0x30d75d);}catch(_0x4bcad5){_0x5a4f9b([_0x10f4('0x4a'),_0x4bcad5[_0x10f4('0x39')]]);}});_0x26f8c3(window)['on'](_0x10f4('0x4b'),function(_0x33366c,_0x4d08ae,_0x45fa1f){try{for(var _0x476bee=_0x45fa1f['length'],_0x1e40de=_0x4d08ae=0x0;_0x1e40de<_0x476bee&&!_0x45fa1f[_0x1e40de][_0x10f4('0x4c')];_0x1e40de++)_0x4d08ae+=0x1;_0x476bee<=_0x4d08ae&&(_0x26f8c3['fn'][_0x10f4('0x1b')][_0x10f4('0x4d')]=!0x0);_0x26f8c3(this)[_0x10f4('0x3a')](_0x33366c);}catch(_0x3ef2cf){_0x5a4f9b([_0x10f4('0x4e'),_0x3ef2cf[_0x10f4('0x39')]]);}});_0x26f8c3(function(){_0x26f8c3(_0x10f4('0x4f'))['QD_smartStockAvailable']();});}}(window));
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
var _0x86cd=['>ul','qd-am-dropdown-menu','qd-am-dropdown','children','qd-am-','callback','QuatroDigital.am.callback','extend','exec','.qd_amazing_menu_auto','closest','QD_amazingMenu','/qd-amazing-menu','object','undefined','error','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','toLowerCase','aviso','info','apply','join','qdAmAddNdx','each','addClass','qd-am-li-','first','last','qd-am-last','nfngrzn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','ite','erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','url','html','img[alt=\x27','attr','data-qdam-value','getParent','.box-banner','clone','insertBefore','hide','qd-am-content-loaded','text','trim','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','alerta','qd-am-has-ul',':not(ul)','qd-am-elem-','replaceSpecialChars','>li','qd-amazing-menu'];(function(_0xedf2bb,_0x77b0eb){var _0xd4cf8=function(_0x5ba6e5){while(--_0x5ba6e5){_0xedf2bb['push'](_0xedf2bb['shift']());}};_0xd4cf8(++_0x77b0eb);}(_0x86cd,0x13e));var _0xd86c=function(_0x18ccce,_0x326f35){_0x18ccce=_0x18ccce-0x0;var _0x31f5d5=_0x86cd[_0x18ccce];return _0x31f5d5;};(function(_0xed9ffa){_0xed9ffa['fn']['getParent']=_0xed9ffa['fn'][_0xd86c('0x0')];}(jQuery));(function(_0x2d1f26){var _0x4e310f;var _0x3accf5=jQuery;if('function'!==typeof _0x3accf5['fn'][_0xd86c('0x1')]){var _0x2cc98d={'url':_0xd86c('0x2'),'callback':function(){},'ajaxCallback':function(){}};var _0x31efe3=function(_0x2e1a35,_0x2d6335){if(_0xd86c('0x3')===typeof console&&_0xd86c('0x4')!==typeof console[_0xd86c('0x5')]&&_0xd86c('0x4')!==typeof console['info']&&_0xd86c('0x4')!==typeof console[_0xd86c('0x6')]){var _0x35a821;_0xd86c('0x3')===typeof _0x2e1a35?(_0x2e1a35[_0xd86c('0x7')](_0xd86c('0x8')),_0x35a821=_0x2e1a35):_0x35a821=[_0xd86c('0x8')+_0x2e1a35];if(_0xd86c('0x4')===typeof _0x2d6335||'alerta'!==_0x2d6335[_0xd86c('0x9')]()&&_0xd86c('0xa')!==_0x2d6335['toLowerCase']())if('undefined'!==typeof _0x2d6335&&_0xd86c('0xb')===_0x2d6335['toLowerCase']())try{console[_0xd86c('0xb')][_0xd86c('0xc')](console,_0x35a821);}catch(_0xc151b){try{console[_0xd86c('0xb')](_0x35a821[_0xd86c('0xd')]('\x0a'));}catch(_0x244e3f){}}else try{console[_0xd86c('0x5')][_0xd86c('0xc')](console,_0x35a821);}catch(_0x1a6271){try{console[_0xd86c('0x5')](_0x35a821[_0xd86c('0xd')]('\x0a'));}catch(_0xf9ffd4){}}else try{console[_0xd86c('0x6')][_0xd86c('0xc')](console,_0x35a821);}catch(_0x307ac3){try{console[_0xd86c('0x6')](_0x35a821['join']('\x0a'));}catch(_0x348d31){}}}};_0x3accf5['fn'][_0xd86c('0xe')]=function(){var _0x2a2cd4=_0x3accf5(this);_0x2a2cd4[_0xd86c('0xf')](function(_0x259b23){_0x3accf5(this)[_0xd86c('0x10')](_0xd86c('0x11')+_0x259b23);});_0x2a2cd4[_0xd86c('0x12')]()[_0xd86c('0x10')]('qd-am-first');_0x2a2cd4[_0xd86c('0x13')]()[_0xd86c('0x10')](_0xd86c('0x14'));return _0x2a2cd4;};_0x3accf5['fn'][_0xd86c('0x1')]=function(){};_0x2d1f26=function(_0x24c1b0){var _0x20dc4d={'p':_0xd86c('0x15')};return function(_0x407068){var _0x30309d=function(_0x1161a2){return _0x1161a2;};var _0x241fbf=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x407068=_0x407068['d'+_0x241fbf[0x10]+'c'+_0x241fbf[0x11]+'m'+_0x30309d(_0x241fbf[0x1])+'n'+_0x241fbf[0xd]]['l'+_0x241fbf[0x12]+'c'+_0x241fbf[0x0]+'ti'+_0x30309d('o')+'n'];var _0x25084d=function(_0x431e7d){return escape(encodeURIComponent(_0x431e7d[_0xd86c('0x16')](/\./g,'¨')[_0xd86c('0x16')](/[a-zA-Z]/g,function(_0x55b780){return String[_0xd86c('0x17')](('Z'>=_0x55b780?0x5a:0x7a)>=(_0x55b780=_0x55b780[_0xd86c('0x18')](0x0)+0xd)?_0x55b780:_0x55b780-0x1a);})));};var _0x394bfa=_0x25084d(_0x407068[[_0x241fbf[0x9],_0x30309d('o'),_0x241fbf[0xc],_0x241fbf[_0x30309d(0xd)]][_0xd86c('0xd')]('')]);_0x25084d=_0x25084d((window[['js',_0x30309d('no'),'m',_0x241fbf[0x1],_0x241fbf[0x4][_0xd86c('0x19')](),_0xd86c('0x1a')][_0xd86c('0xd')]('')]||'---')+['.v',_0x241fbf[0xd],'e',_0x30309d('x'),'co',_0x30309d('mm'),_0xd86c('0x1b'),_0x241fbf[0x1],'.c',_0x30309d('o'),'m.',_0x241fbf[0x13],'r'][_0xd86c('0xd')](''));for(var _0x48b03b in _0x20dc4d){if(_0x25084d===_0x48b03b+_0x20dc4d[_0x48b03b]||_0x394bfa===_0x48b03b+_0x20dc4d[_0x48b03b]){var _0x51d90e='tr'+_0x241fbf[0x11]+'e';break;}_0x51d90e='f'+_0x241fbf[0x0]+'ls'+_0x30309d(_0x241fbf[0x1])+'';}_0x30309d=!0x1;-0x1<_0x407068[[_0x241fbf[0xc],'e',_0x241fbf[0x0],'rc',_0x241fbf[0x9]]['join']('')][_0xd86c('0x1c')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x30309d=!0x0);return[_0x51d90e,_0x30309d];}(_0x24c1b0);}(window);if(!eval(_0x2d1f26[0x0]))return _0x2d1f26[0x1]?_0x31efe3(_0xd86c('0x1d')):!0x1;var _0x1ce069=function(_0x3cec82){var _0x62d493=_0x3cec82[_0xd86c('0x1e')]('.qd_am_code');var _0x1e02d1=_0x62d493[_0xd86c('0x1f')](_0xd86c('0x20'));var _0x2c4d4e=_0x62d493[_0xd86c('0x1f')](_0xd86c('0x21'));if(_0x1e02d1[_0xd86c('0x22')]||_0x2c4d4e[_0xd86c('0x22')])_0x1e02d1[_0xd86c('0x23')]()['addClass'](_0xd86c('0x24')),_0x2c4d4e[_0xd86c('0x23')]()['addClass'](_0xd86c('0x25')),_0x3accf5[_0xd86c('0x26')]({'url':_0x4e310f[_0xd86c('0x27')],'dataType':_0xd86c('0x28'),'success':function(_0x52fd97){var _0x281acb=_0x3accf5(_0x52fd97);_0x1e02d1[_0xd86c('0xf')](function(){var _0x52fd97=_0x3accf5(this);var _0x301e23=_0x281acb[_0xd86c('0x1e')](_0xd86c('0x29')+_0x52fd97[_0xd86c('0x2a')](_0xd86c('0x2b'))+'\x27]');_0x301e23[_0xd86c('0x22')]&&(_0x301e23[_0xd86c('0xf')](function(){_0x3accf5(this)[_0xd86c('0x2c')](_0xd86c('0x2d'))[_0xd86c('0x2e')]()[_0xd86c('0x2f')](_0x52fd97);}),_0x52fd97[_0xd86c('0x30')]());})['addClass'](_0xd86c('0x31'));_0x2c4d4e[_0xd86c('0xf')](function(){var _0x52fd97={};var _0x65517e=_0x3accf5(this);_0x281acb['find']('h2')[_0xd86c('0xf')](function(){if(_0x3accf5(this)[_0xd86c('0x32')]()[_0xd86c('0x33')]()[_0xd86c('0x9')]()==_0x65517e[_0xd86c('0x2a')](_0xd86c('0x2b'))['trim']()[_0xd86c('0x9')]())return _0x52fd97=_0x3accf5(this),!0x1;});_0x52fd97[_0xd86c('0x22')]&&(_0x52fd97[_0xd86c('0xf')](function(){_0x3accf5(this)[_0xd86c('0x2c')]('[class*=\x27colunas\x27]')[_0xd86c('0x2e')]()['insertBefore'](_0x65517e);}),_0x65517e[_0xd86c('0x30')]());})[_0xd86c('0x10')](_0xd86c('0x31'));},'error':function(){_0x31efe3(_0xd86c('0x34')+_0x4e310f[_0xd86c('0x27')]+_0xd86c('0x35'));},'complete':function(){_0x4e310f[_0xd86c('0x36')][_0xd86c('0x37')](this);_0x3accf5(window)[_0xd86c('0x38')](_0xd86c('0x39'),_0x3cec82);},'clearQueueDelay':0xbb8});};_0x3accf5[_0xd86c('0x1')]=function(_0x204005){var _0x18ffa1=_0x204005[_0xd86c('0x1e')](_0xd86c('0x3a'))[_0xd86c('0xf')](function(){var _0x5d2cc9=_0x3accf5(this);if(!_0x5d2cc9[_0xd86c('0x22')])return _0x31efe3([_0xd86c('0x3b'),_0x204005],_0xd86c('0x3c'));_0x5d2cc9['find']('li\x20>ul')[_0xd86c('0x23')]()['addClass'](_0xd86c('0x3d'));_0x5d2cc9['find']('li')[_0xd86c('0xf')](function(){var _0x39df45=_0x3accf5(this);var _0x453068=_0x39df45['children'](_0xd86c('0x3e'));_0x453068['length']&&_0x39df45[_0xd86c('0x10')](_0xd86c('0x3f')+_0x453068[_0xd86c('0x12')]()[_0xd86c('0x32')]()[_0xd86c('0x33')]()[_0xd86c('0x40')]()[_0xd86c('0x16')](/\./g,'')[_0xd86c('0x16')](/\s/g,'-')['toLowerCase']());});var _0x1a7d25=_0x5d2cc9[_0xd86c('0x1e')](_0xd86c('0x41'))['qdAmAddNdx']();_0x5d2cc9[_0xd86c('0x10')](_0xd86c('0x42'));_0x1a7d25=_0x1a7d25['find'](_0xd86c('0x43'));_0x1a7d25[_0xd86c('0xf')](function(){var _0xb80b04=_0x3accf5(this);_0xb80b04[_0xd86c('0x1e')](_0xd86c('0x41'))['qdAmAddNdx']()[_0xd86c('0x10')]('qd-am-column');_0xb80b04[_0xd86c('0x10')](_0xd86c('0x44'));_0xb80b04['parent']()['addClass'](_0xd86c('0x45'));});_0x1a7d25['addClass'](_0xd86c('0x45'));var _0x271598=0x0,_0x2d1f26=function(_0xaf0144){_0x271598+=0x1;_0xaf0144=_0xaf0144[_0xd86c('0x46')]('li')[_0xd86c('0x46')]('*');_0xaf0144['length']&&(_0xaf0144[_0xd86c('0x10')]('qd-am-level-'+_0x271598),_0x2d1f26(_0xaf0144));};_0x2d1f26(_0x5d2cc9);_0x5d2cc9['add'](_0x5d2cc9[_0xd86c('0x1e')]('ul'))['each'](function(){var _0x589bad=_0x3accf5(this);_0x589bad[_0xd86c('0x10')](_0xd86c('0x47')+_0x589bad['children']('li')['length']+'-li');});});_0x1ce069(_0x18ffa1);_0x4e310f[_0xd86c('0x48')][_0xd86c('0x37')](this);_0x3accf5(window)['trigger'](_0xd86c('0x49'),_0x204005);};_0x3accf5['fn'][_0xd86c('0x1')]=function(_0x51fd03){var _0x24f51c=_0x3accf5(this);if(!_0x24f51c[_0xd86c('0x22')])return _0x24f51c;_0x4e310f=_0x3accf5[_0xd86c('0x4a')]({},_0x2cc98d,_0x51fd03);_0x24f51c[_0xd86c('0x4b')]=new _0x3accf5[(_0xd86c('0x1'))](_0x3accf5(this));return _0x24f51c;};_0x3accf5(function(){_0x3accf5(_0xd86c('0x4c'))[_0xd86c('0x1')]();});}}(this));
/* Quatro Digital Smart Cart */
var _0x955f=['mouseenter.qd_ddc_hover','allowUpdate','cartIsEmpty','mouseleave.qd_ddc_hover','texts','#value','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','html','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','cartContainer','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','shippingData','Este\x20método\x20esta\x20descontinuado!','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','productCategoryIds','qd-ddc-','availability','.qd-ddc-prodName','sellingPrice','Grátis','.qd-ddc-remove','insertProdImg','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','address','postalCode','lastSku','[data-sku=\x27','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-cart-rendered','qd-ddc-cart-empty','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','actionButtons','data-sku-index','data-sku','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','click.qd_ddc_more','qd-loading','.qd-ddc-quantity','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','.qd-ddc-prodRow','click.qd_ddc_remove','removeProduct','stop','slideUp','remove','qdDdcLastPostalCode','calculateShipping','BRA','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','buyButtonClicked','quickViewUpdate','allowRecalculate','productId','prod_','prodId','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','ajaxStop','.qdDdcContainer','QD_smartCart','selector','dropDown','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','closest','replace','abs','undefined','pow','round','toFixed','length','join','function','trim','prototype','capitalize','charAt','toUpperCase','slice','qdAjax','qdAjaxQueue','jquery','error','extend','GET','object','data','stringify','url','type','jqXHR','ajax','done','success','fail','always','complete','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','version','getParent','simpleCart','checkout','getOrderForm','call','QuatroDigital_simpleCart','warn','[Simple\x20Cart]\x0a','info','add','QD_simpleCart','elements','.qd_cart_qtt','.qd_cart_total','meta[name=currency]','attr','content','each','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','Shipping','value','currencySymbol','shipping','qtt','showQuantityByItems','items','quantity','callback','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','hide','filter','.singular','show','.plural','qd-emptyCart','total','itemsTextE','$this','find','cartQtt','cartTotalE','cartTotal','itemsText','emptyElem','emptyCart','addClass','qd-sc-populated','smartCheckout','_QuatroDigital_DropDown','vtexjs','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','QD_checkoutQueue','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','trigger','simpleCartCallback.quatro_digital','ajaxRequestbuyButtonAsynchronous','.qd_cart_auto','bind','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','alerta','toLowerCase','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','Callbacks','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','input.buy-in-page-quantity','javascript:','body','.productQuickView','Produto\x20adicionado\x20ao\x20carrinho!','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','href','#produto,\x20.produto','QD_buyButton','qd-bb-click-active','preventDefault','buyButton','qd-sbb-on','.btn-add-buy-button-asynchronous','qd-bb-active','.qd-bb-productAdded','append','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','.buy-in-page-button','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','_Quatro_Digital_dropDown','prodAdd','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','---','removeClass','qd-bb-itemAddCartWrapper','qd-bb-itemAddBuyButtonWrapper','getCartInfoByUrl','isSmartCheckout','função\x20descontinuada','autoWatchBuyButton','unbind','mouseenter.qd_bb_buy_sc','click','load','clickBuySmartCheckout','selectSkuMsg','?redirect=false&','execDefaultAction','redirect=true','queue','buyIfQuantityZeroed','test','push','productPageCallback','buyButtonClickCallback','split','ku=','shift','asyncCallback','cartProductAdded.vtex','fakeRequest','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','Callback\x20não\x20é\x20uma\x20função','children','.qd-bb-itemAddWrapper','prepend','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','QuatroDigital.qd_bb_prod_add','ajaxSend','indexOf','/checkout/cart/add','match','pop','Oooops!\x20','message','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','QD_dropDownCart','nfngrzn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','ite','erc','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','name','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','qd-bb-lightBoxProdAdd','off','keyup.qd_ddc_closeFn','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','.qd-ddc-shipping\x20input','val','keyup.qd_ddc_cep','updateOnlyHover'];(function(_0xdf4fe2,_0x26e56e){var _0x19f5f4=function(_0x3126b9){while(--_0x3126b9){_0xdf4fe2['push'](_0xdf4fe2['shift']());}};_0x19f5f4(++_0x26e56e);}(_0x955f,0x7a));var _0xf955=function(_0x49e09a,_0x408770){_0x49e09a=_0x49e09a-0x0;var _0x46dcc4=_0x955f[_0x49e09a];return _0x46dcc4;};(function(_0x1cb7ec){_0x1cb7ec['fn']['getParent']=_0x1cb7ec['fn'][_0xf955('0x0')];}(jQuery));function qd_number_format(_0x5655ef,_0x5d0c95,_0x1db0dd,_0x5a20bc){_0x5655ef=(_0x5655ef+'')[_0xf955('0x1')](/[^0-9+\-Ee.]/g,'');_0x5655ef=isFinite(+_0x5655ef)?+_0x5655ef:0x0;_0x5d0c95=isFinite(+_0x5d0c95)?Math[_0xf955('0x2')](_0x5d0c95):0x0;_0x5a20bc=_0xf955('0x3')===typeof _0x5a20bc?',':_0x5a20bc;_0x1db0dd='undefined'===typeof _0x1db0dd?'.':_0x1db0dd;var _0x4f58fb='',_0x4f58fb=function(_0x254b38,_0x151034){var _0x5d0c95=Math[_0xf955('0x4')](0xa,_0x151034);return''+(Math[_0xf955('0x5')](_0x254b38*_0x5d0c95)/_0x5d0c95)[_0xf955('0x6')](_0x151034);},_0x4f58fb=(_0x5d0c95?_0x4f58fb(_0x5655ef,_0x5d0c95):''+Math[_0xf955('0x5')](_0x5655ef))['split']('.');0x3<_0x4f58fb[0x0][_0xf955('0x7')]&&(_0x4f58fb[0x0]=_0x4f58fb[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x5a20bc));(_0x4f58fb[0x1]||'')[_0xf955('0x7')]<_0x5d0c95&&(_0x4f58fb[0x1]=_0x4f58fb[0x1]||'',_0x4f58fb[0x1]+=Array(_0x5d0c95-_0x4f58fb[0x1][_0xf955('0x7')]+0x1)[_0xf955('0x8')]('0'));return _0x4f58fb['join'](_0x1db0dd);};_0xf955('0x9')!==typeof String['prototype'][_0xf955('0xa')]&&(String['prototype'][_0xf955('0xa')]=function(){return this[_0xf955('0x1')](/^\s+|\s+$/g,'');});_0xf955('0x9')!=typeof String[_0xf955('0xb')][_0xf955('0xc')]&&(String[_0xf955('0xb')][_0xf955('0xc')]=function(){return this[_0xf955('0xd')](0x0)[_0xf955('0xe')]()+this[_0xf955('0xf')](0x1)['toLowerCase']();});(function(_0xc29b35){if('function'!==typeof _0xc29b35[_0xf955('0x10')]){var _0x3a814f={};_0xc29b35[_0xf955('0x11')]=_0x3a814f;0x96>parseInt((_0xc29b35['fn'][_0xf955('0x12')]['replace'](/[^0-9]+/g,'')+'000')[_0xf955('0xf')](0x0,0x3),0xa)&&console&&_0xf955('0x9')==typeof console[_0xf955('0x13')]&&console['error']();_0xc29b35[_0xf955('0x10')]=function(_0x3576fa){try{var _0x423824=_0xc29b35[_0xf955('0x14')]({},{'url':'','type':_0xf955('0x15'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x3576fa);var _0x5f4d9a=_0xf955('0x16')===typeof _0x423824[_0xf955('0x17')]?JSON[_0xf955('0x18')](_0x423824['data']):_0x423824[_0xf955('0x17')]['toString']();var _0x21ae24=encodeURIComponent(_0x423824[_0xf955('0x19')]+'|'+_0x423824[_0xf955('0x1a')]+'|'+_0x5f4d9a);_0x3a814f[_0x21ae24]=_0x3a814f[_0x21ae24]||{};_0xf955('0x3')==typeof _0x3a814f[_0x21ae24][_0xf955('0x1b')]?_0x3a814f[_0x21ae24]['jqXHR']=_0xc29b35[_0xf955('0x1c')](_0x423824):(_0x3a814f[_0x21ae24][_0xf955('0x1b')][_0xf955('0x1d')](_0x423824[_0xf955('0x1e')]),_0x3a814f[_0x21ae24][_0xf955('0x1b')][_0xf955('0x1f')](_0x423824[_0xf955('0x13')]),_0x3a814f[_0x21ae24]['jqXHR'][_0xf955('0x20')](_0x423824[_0xf955('0x21')]));_0x3a814f[_0x21ae24][_0xf955('0x1b')][_0xf955('0x20')](function(){isNaN(parseInt(_0x423824[_0xf955('0x22')]))||setTimeout(function(){_0x3a814f[_0x21ae24][_0xf955('0x1b')]=void 0x0;},_0x423824[_0xf955('0x22')]);});return _0x3a814f[_0x21ae24]['jqXHR'];}catch(_0x3caea6){_0xf955('0x3')!==typeof console&&_0xf955('0x9')===typeof console[_0xf955('0x13')]&&console[_0xf955('0x13')](_0xf955('0x23')+_0x3caea6['message']);}};_0xc29b35[_0xf955('0x10')][_0xf955('0x24')]='4.0';}}(jQuery));(function(_0x256df5){_0x256df5['fn'][_0xf955('0x25')]=_0x256df5['fn'][_0xf955('0x0')];}(jQuery));(function(){var _0x1ef794=jQuery;if('function'!==typeof _0x1ef794['fn'][_0xf955('0x26')]){_0x1ef794(function(){var _0x518fb3=vtexjs[_0xf955('0x27')][_0xf955('0x28')];vtexjs[_0xf955('0x27')][_0xf955('0x28')]=function(){return _0x518fb3[_0xf955('0x29')]();};});try{window[_0xf955('0x2a')]=window[_0xf955('0x2a')]||{};window[_0xf955('0x2a')]['ajaxStopOn']=!0x1;_0x1ef794['fn'][_0xf955('0x26')]=function(_0x165cc4,_0x3964d3,_0x2046c8){var _0x4fea0c=function(_0x23c848,_0x31dad5){if(_0xf955('0x16')===typeof console){var _0xe1b436=_0xf955('0x16')===typeof _0x23c848;'undefined'!==typeof _0x31dad5&&'alerta'===_0x31dad5['toLowerCase']()?_0xe1b436?console[_0xf955('0x2b')](_0xf955('0x2c'),_0x23c848[0x0],_0x23c848[0x1],_0x23c848[0x2],_0x23c848[0x3],_0x23c848[0x4],_0x23c848[0x5],_0x23c848[0x6],_0x23c848[0x7]):console[_0xf955('0x2b')](_0xf955('0x2c')+_0x23c848):_0xf955('0x3')!==typeof _0x31dad5&&_0xf955('0x2d')===_0x31dad5['toLowerCase']()?_0xe1b436?console[_0xf955('0x2d')]('[Simple\x20Cart]\x0a',_0x23c848[0x0],_0x23c848[0x1],_0x23c848[0x2],_0x23c848[0x3],_0x23c848[0x4],_0x23c848[0x5],_0x23c848[0x6],_0x23c848[0x7]):console[_0xf955('0x2d')](_0xf955('0x2c')+_0x23c848):_0xe1b436?console[_0xf955('0x13')]('[Simple\x20Cart]\x0a',_0x23c848[0x0],_0x23c848[0x1],_0x23c848[0x2],_0x23c848[0x3],_0x23c848[0x4],_0x23c848[0x5],_0x23c848[0x6],_0x23c848[0x7]):console[_0xf955('0x13')]('[Simple\x20Cart]\x0a'+_0x23c848);}};var _0x2bc1a0=_0x1ef794(this);_0xf955('0x16')===typeof _0x165cc4?_0x3964d3=_0x165cc4:(_0x165cc4=_0x165cc4||!0x1,_0x2bc1a0=_0x2bc1a0[_0xf955('0x2e')](_0x1ef794[_0xf955('0x2f')]['elements']));if(!_0x2bc1a0[_0xf955('0x7')])return _0x2bc1a0;_0x1ef794[_0xf955('0x2f')]['elements']=_0x1ef794[_0xf955('0x2f')][_0xf955('0x30')][_0xf955('0x2e')](_0x2bc1a0);_0x2046c8='undefined'===typeof _0x2046c8?!0x1:_0x2046c8;var _0x292e53={'cartQtt':_0xf955('0x31'),'cartTotal':_0xf955('0x32'),'itemsText':'.qd_items_text','currencySymbol':(_0x1ef794(_0xf955('0x33'))[_0xf955('0x34')](_0xf955('0x35'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x2069f3=_0x1ef794[_0xf955('0x14')]({},_0x292e53,_0x3964d3);var _0x3c4b29=_0x1ef794('');_0x2bc1a0[_0xf955('0x36')](function(){var _0x228dae=_0x1ef794(this);_0x228dae['data'](_0xf955('0x37'))||_0x228dae[_0xf955('0x17')](_0xf955('0x37'),_0x2069f3);});var _0xe633fa=function(_0x16f7cd){window[_0xf955('0x38')]=window[_0xf955('0x38')]||{};for(var _0x165cc4=0x0,_0x47651b=0x0,_0x238a68=0x0;_0x238a68<_0x16f7cd[_0xf955('0x39')][_0xf955('0x7')];_0x238a68++)_0xf955('0x3a')==_0x16f7cd[_0xf955('0x39')][_0x238a68]['id']&&(_0x47651b+=_0x16f7cd[_0xf955('0x39')][_0x238a68][_0xf955('0x3b')]),_0x165cc4+=_0x16f7cd[_0xf955('0x39')][_0x238a68][_0xf955('0x3b')];window[_0xf955('0x38')]['total']=_0x2069f3[_0xf955('0x3c')]+qd_number_format(_0x165cc4/0x64,0x2,',','.');window[_0xf955('0x38')][_0xf955('0x3d')]=_0x2069f3['currencySymbol']+qd_number_format(_0x47651b/0x64,0x2,',','.');window[_0xf955('0x38')]['allTotal']=_0x2069f3[_0xf955('0x3c')]+qd_number_format((_0x165cc4+_0x47651b)/0x64,0x2,',','.');window['_QuatroDigital_CartData'][_0xf955('0x3e')]=0x0;if(_0x2069f3[_0xf955('0x3f')])for(_0x238a68=0x0;_0x238a68<_0x16f7cd[_0xf955('0x40')][_0xf955('0x7')];_0x238a68++)window['_QuatroDigital_CartData'][_0xf955('0x3e')]+=_0x16f7cd[_0xf955('0x40')][_0x238a68][_0xf955('0x41')];else window['_QuatroDigital_CartData']['qtt']=_0x16f7cd[_0xf955('0x40')][_0xf955('0x7')]||0x0;try{window[_0xf955('0x38')][_0xf955('0x42')]&&window['_QuatroDigital_CartData'][_0xf955('0x42')][_0xf955('0x43')]&&window[_0xf955('0x38')]['callback'][_0xf955('0x43')]();}catch(_0x5ba567){_0x4fea0c(_0xf955('0x44'));}_0x17fc93(_0x3c4b29);};var _0x3d3696=function(_0x2c867f,_0x4dd592){0x1===_0x2c867f?_0x4dd592[_0xf955('0x45')]()[_0xf955('0x46')](_0xf955('0x47'))[_0xf955('0x48')]():_0x4dd592['hide']()[_0xf955('0x46')](_0xf955('0x49'))[_0xf955('0x48')]();};var _0x17e687=function(_0x2c992c){0x1>_0x2c992c?_0x2bc1a0['addClass'](_0xf955('0x4a')):_0x2bc1a0['removeClass'](_0xf955('0x4a'));};var _0x5b5621=function(_0x38edc7,_0x55e625){var _0x57535f=parseInt(window[_0xf955('0x38')][_0xf955('0x3e')],0xa);_0x55e625['$this'][_0xf955('0x48')]();isNaN(_0x57535f)&&(_0x4fea0c('O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','alerta'),_0x57535f=0x0);_0x55e625['cartTotalE']['html'](window[_0xf955('0x38')][_0xf955('0x4b')]);_0x55e625['cartQttE']['html'](_0x57535f);_0x3d3696(_0x57535f,_0x55e625[_0xf955('0x4c')]);_0x17e687(_0x57535f);};var _0x17fc93=function(_0x460052){_0x2bc1a0[_0xf955('0x36')](function(){var _0x1b7b21={};var _0xa56483=_0x1ef794(this);_0x165cc4&&_0xa56483[_0xf955('0x17')](_0xf955('0x37'))&&_0x1ef794[_0xf955('0x14')](_0x2069f3,_0xa56483[_0xf955('0x17')](_0xf955('0x37')));_0x1b7b21[_0xf955('0x4d')]=_0xa56483;_0x1b7b21['cartQttE']=_0xa56483[_0xf955('0x4e')](_0x2069f3[_0xf955('0x4f')])||_0x3c4b29;_0x1b7b21[_0xf955('0x50')]=_0xa56483[_0xf955('0x4e')](_0x2069f3[_0xf955('0x51')])||_0x3c4b29;_0x1b7b21['itemsTextE']=_0xa56483[_0xf955('0x4e')](_0x2069f3[_0xf955('0x52')])||_0x3c4b29;_0x1b7b21[_0xf955('0x53')]=_0xa56483[_0xf955('0x4e')](_0x2069f3[_0xf955('0x54')])||_0x3c4b29;_0x5b5621(_0x460052,_0x1b7b21);_0xa56483[_0xf955('0x55')](_0xf955('0x56'));});};(function(){if(_0x2069f3[_0xf955('0x57')]){window[_0xf955('0x58')]=window[_0xf955('0x58')]||{};if('undefined'!==typeof window[_0xf955('0x58')][_0xf955('0x28')]&&(_0x2046c8||!_0x165cc4))return _0xe633fa(window[_0xf955('0x58')][_0xf955('0x28')]);if(_0xf955('0x16')!==typeof window[_0xf955('0x59')]||_0xf955('0x3')===typeof window[_0xf955('0x59')][_0xf955('0x27')])if(_0xf955('0x16')===typeof vtex&&_0xf955('0x16')===typeof vtex[_0xf955('0x27')]&&'undefined'!==typeof vtex[_0xf955('0x27')][_0xf955('0x5a')])new vtex[(_0xf955('0x27'))][(_0xf955('0x5a'))]();else return _0x4fea0c(_0xf955('0x5b'));_0x1ef794[_0xf955('0x5c')]([_0xf955('0x40'),'totalizers','shippingData'],{'done':function(_0x5e73ff){_0xe633fa(_0x5e73ff);window[_0xf955('0x58')]['getOrderForm']=_0x5e73ff;},'fail':function(_0x570b6a){_0x4fea0c([_0xf955('0x5d'),_0x570b6a]);}});}else alert('Esta\x20é\x20uma\x20função\x20descontinuada\x20=/');}());_0x2069f3[_0xf955('0x42')]();_0x1ef794(window)[_0xf955('0x5e')](_0xf955('0x5f'));return _0x2bc1a0;};_0x1ef794[_0xf955('0x2f')]={'elements':_0x1ef794('')};_0x1ef794(function(){var _0x4c88ae;_0xf955('0x9')===typeof window[_0xf955('0x60')]&&(_0x4c88ae=window[_0xf955('0x60')],window[_0xf955('0x60')]=function(_0x36364d,_0x545c1f,_0x189468,_0x5990d7,_0x18905b){_0x4c88ae[_0xf955('0x29')](this,_0x36364d,_0x545c1f,_0x189468,_0x5990d7,function(){_0xf955('0x9')===typeof _0x18905b&&_0x18905b();_0x1ef794['QD_simpleCart'][_0xf955('0x30')][_0xf955('0x36')](function(){var _0x16831f=_0x1ef794(this);_0x16831f[_0xf955('0x26')](_0x16831f[_0xf955('0x17')](_0xf955('0x37')));});});});});var _0x3761f2=window['ReloadItemsCart']||void 0x0;window['ReloadItemsCart']=function(_0x1bf4ac){_0x1ef794['fn'][_0xf955('0x26')](!0x0);_0xf955('0x9')===typeof _0x3761f2?_0x3761f2[_0xf955('0x29')](this,_0x1bf4ac):alert(_0x1bf4ac);};_0x1ef794(function(){var _0xab5eed=_0x1ef794(_0xf955('0x61'));_0xab5eed[_0xf955('0x7')]&&_0xab5eed[_0xf955('0x26')]();});_0x1ef794(function(){_0x1ef794(window)[_0xf955('0x62')](_0xf955('0x63'),function(){_0x1ef794['fn'][_0xf955('0x26')](!0x0);});});}catch(_0x4ff892){_0xf955('0x3')!==typeof console&&'function'===typeof console[_0xf955('0x13')]&&console['error']('Oooops!\x20',_0x4ff892);}}}());(function(){var _0x4210af=function(_0x5e8f86,_0x50b722){if(_0xf955('0x16')===typeof console){var _0xdf351a=_0xf955('0x16')===typeof _0x5e8f86;'undefined'!==typeof _0x50b722&&_0xf955('0x64')===_0x50b722[_0xf955('0x65')]()?_0xdf351a?console[_0xf955('0x2b')](_0xf955('0x66'),_0x5e8f86[0x0],_0x5e8f86[0x1],_0x5e8f86[0x2],_0x5e8f86[0x3],_0x5e8f86[0x4],_0x5e8f86[0x5],_0x5e8f86[0x6],_0x5e8f86[0x7]):console[_0xf955('0x2b')](_0xf955('0x66')+_0x5e8f86):_0xf955('0x3')!==typeof _0x50b722&&_0xf955('0x2d')===_0x50b722['toLowerCase']()?_0xdf351a?console[_0xf955('0x2d')](_0xf955('0x66'),_0x5e8f86[0x0],_0x5e8f86[0x1],_0x5e8f86[0x2],_0x5e8f86[0x3],_0x5e8f86[0x4],_0x5e8f86[0x5],_0x5e8f86[0x6],_0x5e8f86[0x7]):console['info'](_0xf955('0x66')+_0x5e8f86):_0xdf351a?console[_0xf955('0x13')](_0xf955('0x66'),_0x5e8f86[0x0],_0x5e8f86[0x1],_0x5e8f86[0x2],_0x5e8f86[0x3],_0x5e8f86[0x4],_0x5e8f86[0x5],_0x5e8f86[0x6],_0x5e8f86[0x7]):console[_0xf955('0x13')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a'+_0x5e8f86);}},_0x20f11c=null,_0x51c8a4={},_0x1e95c3={},_0x28e662={};$[_0xf955('0x5c')]=function(_0x360786,_0x4b85c2){if(null===_0x20f11c)if('object'===typeof window[_0xf955('0x59')]&&_0xf955('0x3')!==typeof window[_0xf955('0x59')][_0xf955('0x27')])_0x20f11c=window['vtexjs'][_0xf955('0x27')];else return _0x4210af(_0xf955('0x67'));var _0x3fee73=$[_0xf955('0x14')]({'done':function(){},'fail':function(){}},_0x4b85c2),_0x425d42=_0x360786[_0xf955('0x8')](';'),_0xc6b79=function(){_0x51c8a4[_0x425d42][_0xf955('0x2e')](_0x3fee73[_0xf955('0x1d')]);_0x1e95c3[_0x425d42][_0xf955('0x2e')](_0x3fee73[_0xf955('0x1f')]);};_0x28e662[_0x425d42]?_0xc6b79():(_0x51c8a4[_0x425d42]=$[_0xf955('0x68')](),_0x1e95c3[_0x425d42]=$[_0xf955('0x68')](),_0xc6b79(),_0x28e662[_0x425d42]=!0x0,_0x20f11c['getOrderForm'](_0x360786)[_0xf955('0x1d')](function(_0x22b3b3){_0x28e662[_0x425d42]=!0x1;_0x51c8a4[_0x425d42][_0xf955('0x43')](_0x22b3b3);})[_0xf955('0x1f')](function(_0x5a5e5e){_0x28e662[_0x425d42]=!0x1;_0x1e95c3[_0x425d42][_0xf955('0x43')](_0x5a5e5e);}));};}());(function(_0x38ef94){try{var _0x3ee50a=jQuery,_0x8bdcf2,_0x2b266d=_0x3ee50a({}),_0x30df2a=function(_0x46a692,_0x52a73c){if(_0xf955('0x16')===typeof console&&_0xf955('0x3')!==typeof console['error']&&_0xf955('0x3')!==typeof console[_0xf955('0x2d')]&&_0xf955('0x3')!==typeof console[_0xf955('0x2b')]){var _0x33aa10;_0xf955('0x16')===typeof _0x46a692?(_0x46a692[_0xf955('0x69')]('[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a'),_0x33aa10=_0x46a692):_0x33aa10=[_0xf955('0x6a')+_0x46a692];if('undefined'===typeof _0x52a73c||_0xf955('0x64')!==_0x52a73c['toLowerCase']()&&_0xf955('0x6b')!==_0x52a73c[_0xf955('0x65')]())if(_0xf955('0x3')!==typeof _0x52a73c&&_0xf955('0x2d')===_0x52a73c[_0xf955('0x65')]())try{console[_0xf955('0x2d')]['apply'](console,_0x33aa10);}catch(_0x1e8926){try{console[_0xf955('0x2d')](_0x33aa10[_0xf955('0x8')]('\x0a'));}catch(_0x4e2410){}}else try{console['error'][_0xf955('0x6c')](console,_0x33aa10);}catch(_0x179024){try{console[_0xf955('0x13')](_0x33aa10['join']('\x0a'));}catch(_0x3ee844){}}else try{console['warn'][_0xf955('0x6c')](console,_0x33aa10);}catch(_0x4afb35){try{console[_0xf955('0x2b')](_0x33aa10[_0xf955('0x8')]('\x0a'));}catch(_0x339c05){}}}},_0x14483d={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':'.productInformationWrapper\x20\x20a.buy-button','buyQtt':_0xf955('0x6d'),'selectSkuMsg':_0xf955('0x6e'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x2cd1bd,_0x521227,_0xba62d0){_0x3ee50a(_0xf955('0x6f'))['is'](_0xf955('0x70'))&&(_0xf955('0x1e')===_0x521227?alert(_0xf955('0x71')):(alert(_0xf955('0x72')),(_0xf955('0x16')===typeof parent?parent:document)['location'][_0xf955('0x73')]=_0xba62d0));},'isProductPage':function(){return _0x3ee50a(_0xf955('0x6f'))['is'](_0xf955('0x74'));},'execDefaultAction':function(_0x347078){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x3ee50a[_0xf955('0x75')]=function(_0x585a62,_0x15c3e1){function _0x23f90c(_0x4b7c1a){_0x8bdcf2['isSmartCheckout']?_0x4b7c1a[_0xf955('0x17')](_0xf955('0x76'))||(_0x4b7c1a[_0xf955('0x17')](_0xf955('0x76'),0x1),_0x4b7c1a['on']('click.qd_bb_buy_sc',function(_0x39f7ab){if(!_0x8bdcf2['allowBuyClick']())return!0x0;if(!0x0!==_0x5bdd36['clickBuySmartCheckout'][_0xf955('0x29')](this))return _0x39f7ab[_0xf955('0x77')](),!0x1;})):alert('Método\x20descontinuado!');}function _0x480610(_0x2fa2f5){_0x2fa2f5=_0x2fa2f5||_0x3ee50a(_0x8bdcf2[_0xf955('0x78')]);_0x2fa2f5[_0xf955('0x36')](function(){var _0x2fa2f5=_0x3ee50a(this);_0x2fa2f5['is']('.qd-sbb-on')||(_0x2fa2f5[_0xf955('0x55')](_0xf955('0x79')),_0x2fa2f5['is'](_0xf955('0x7a'))&&!_0x2fa2f5['is']('.remove-href')||_0x2fa2f5['data']('qd-bb-active')||(_0x2fa2f5['data'](_0xf955('0x7b'),0x1),_0x2fa2f5['children'](_0xf955('0x7c'))[_0xf955('0x7')]||_0x2fa2f5[_0xf955('0x7d')](_0xf955('0x7e')),_0x2fa2f5['is'](_0xf955('0x7f'))&&_0x8bdcf2['isProductPage']()&&_0x1a672b[_0xf955('0x29')](_0x2fa2f5),_0x23f90c(_0x2fa2f5)));});_0x8bdcf2[_0xf955('0x80')]()&&!_0x2fa2f5[_0xf955('0x7')]&&_0x30df2a(_0xf955('0x81')+_0x2fa2f5['selector']+'\x27.',_0xf955('0x2d'));}var _0x2737c6=_0x3ee50a(_0x585a62);var _0x5bdd36=this;window[_0xf955('0x82')]=window[_0xf955('0x82')]||{};window[_0xf955('0x38')]=window[_0xf955('0x38')]||{};_0x5bdd36[_0xf955('0x83')]=function(_0x3d83a9,_0x58080b){_0x2737c6['addClass'](_0xf955('0x84'));_0x3ee50a('body')[_0xf955('0x55')](_0xf955('0x85'));var _0xf3fce8=_0x3ee50a(_0x8bdcf2[_0xf955('0x78')])['filter']('[href=\x27'+(_0x3d83a9[_0xf955('0x34')](_0xf955('0x73'))||_0xf955('0x86'))+'\x27]')[_0xf955('0x2e')](_0x3d83a9);_0xf3fce8[_0xf955('0x55')]('qd-bb-itemAddBuyButtonWrapper');setTimeout(function(){_0x2737c6[_0xf955('0x87')](_0xf955('0x88'));_0xf3fce8[_0xf955('0x87')](_0xf955('0x89'));},_0x8bdcf2['timeRemoveNewItemClass']);window['_Quatro_Digital_dropDown'][_0xf955('0x28')]=void 0x0;if(_0xf955('0x3')!==typeof _0x15c3e1&&'function'===typeof _0x15c3e1[_0xf955('0x8a')])return _0x8bdcf2[_0xf955('0x8b')]||(_0x30df2a(_0xf955('0x8c')),_0x15c3e1[_0xf955('0x8a')]()),window['_QuatroDigital_DropDown'][_0xf955('0x28')]=void 0x0,_0x15c3e1[_0xf955('0x8a')](function(_0x34b879){window[_0xf955('0x82')][_0xf955('0x28')]=_0x34b879;_0x3ee50a['fn'][_0xf955('0x26')](!0x0,void 0x0,!0x0);},{'lastSku':_0x58080b});window[_0xf955('0x82')]['allowUpdate']=!0x0;_0x3ee50a['fn']['simpleCart'](!0x0);};(function(){if(_0x8bdcf2['isSmartCheckout']&&_0x8bdcf2[_0xf955('0x8d')]){var _0x3c64b0=_0x3ee50a(_0xf955('0x7a'));_0x3c64b0[_0xf955('0x7')]&&_0x480610(_0x3c64b0);}}());var _0x1a672b=function(){var _0x35aa70=_0x3ee50a(this);_0xf955('0x3')!==typeof _0x35aa70['data'](_0xf955('0x78'))?(_0x35aa70[_0xf955('0x8e')]('click'),_0x23f90c(_0x35aa70)):(_0x35aa70[_0xf955('0x62')](_0xf955('0x8f'),function(_0x101655){_0x35aa70[_0xf955('0x8e')](_0xf955('0x90'));_0x23f90c(_0x35aa70);_0x3ee50a(this)[_0xf955('0x8e')](_0x101655);}),_0x3ee50a(window)[_0xf955('0x91')](function(){_0x35aa70[_0xf955('0x8e')]('click');_0x23f90c(_0x35aa70);_0x35aa70['unbind']('mouseenter.qd_bb_buy_sc');}));};_0x5bdd36[_0xf955('0x92')]=function(){var _0x3945f5=_0x3ee50a(this),_0x585a62=_0x3945f5[_0xf955('0x34')](_0xf955('0x73'))||'';if(-0x1<_0x585a62['indexOf'](_0x8bdcf2[_0xf955('0x93')]))return!0x0;_0x585a62=_0x585a62[_0xf955('0x1')](/redirect\=(false|true)/gi,'')[_0xf955('0x1')]('?',_0xf955('0x94'))[_0xf955('0x1')](/\&\&/gi,'&');if(_0x8bdcf2[_0xf955('0x95')](_0x3945f5))return _0x3945f5[_0xf955('0x34')](_0xf955('0x73'),_0x585a62[_0xf955('0x1')]('redirect=false',_0xf955('0x96'))),!0x0;_0x585a62=_0x585a62['replace'](/http.?:/i,'');_0x2b266d[_0xf955('0x97')](function(_0x45cd55){if(!_0x8bdcf2[_0xf955('0x98')]&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0xf955('0x99')](_0x585a62))return _0x45cd55();var _0x35968b=function(_0x187fb0,_0x2d6b36){var _0x480610=_0x585a62['match'](/sku\=([0-9]+)/gi),_0x1ef189=[];if(_0xf955('0x16')===typeof _0x480610&&null!==_0x480610)for(var _0x40d7c7=_0x480610['length']-0x1;0x0<=_0x40d7c7;_0x40d7c7--){var _0x3503c6=parseInt(_0x480610[_0x40d7c7][_0xf955('0x1')](/sku\=/gi,''));isNaN(_0x3503c6)||_0x1ef189[_0xf955('0x9a')](_0x3503c6);}_0x8bdcf2[_0xf955('0x9b')][_0xf955('0x29')](this,_0x187fb0,_0x2d6b36,_0x585a62);_0x5bdd36[_0xf955('0x9c')][_0xf955('0x29')](this,_0x187fb0,_0x2d6b36,_0x585a62,_0x1ef189);_0x5bdd36['prodAdd'](_0x3945f5,_0x585a62[_0xf955('0x9d')](_0xf955('0x9e'))['pop']()[_0xf955('0x9d')]('&')[_0xf955('0x9f')]());'function'===typeof _0x8bdcf2['asyncCallback']&&_0x8bdcf2[_0xf955('0xa0')][_0xf955('0x29')](this);_0x3ee50a(window)[_0xf955('0x5e')]('productAddedToCart');_0x3ee50a(window)[_0xf955('0x5e')](_0xf955('0xa1'));};_0x8bdcf2[_0xf955('0xa2')]?(_0x35968b(null,_0xf955('0x1e')),_0x45cd55()):_0x3ee50a[_0xf955('0x1c')]({'url':_0x585a62,'complete':_0x35968b})[_0xf955('0x20')](function(){_0x45cd55();});});};_0x5bdd36[_0xf955('0x9c')]=function(_0x8d0c5b,_0x2ab571,_0x210cfb,_0x42939b){try{_0xf955('0x1e')===_0x2ab571&&_0xf955('0x16')===typeof window[_0xf955('0xa3')]&&'function'===typeof window['parent'][_0xf955('0xa4')]&&window[_0xf955('0xa3')][_0xf955('0xa4')](_0x8d0c5b,_0x2ab571,_0x210cfb,_0x42939b);}catch(_0x2add4a){_0x30df2a(_0xf955('0xa5'));}};_0x480610();'function'===typeof _0x8bdcf2[_0xf955('0x42')]?_0x8bdcf2[_0xf955('0x42')]['call'](this):_0x30df2a(_0xf955('0xa6'));};var _0x31deae=_0x3ee50a[_0xf955('0x68')]();_0x3ee50a['fn'][_0xf955('0x75')]=function(_0x5a20d4,_0x3cc61c){var _0x38ef94=_0x3ee50a(this);_0xf955('0x3')!==typeof _0x3cc61c||_0xf955('0x16')!==typeof _0x5a20d4||_0x5a20d4 instanceof _0x3ee50a||(_0x3cc61c=_0x5a20d4,_0x5a20d4=void 0x0);_0x8bdcf2=_0x3ee50a[_0xf955('0x14')]({},_0x14483d,_0x3cc61c);var _0xe9f9a8;_0x31deae['add'](function(){_0x38ef94[_0xf955('0xa7')](_0xf955('0xa8'))[_0xf955('0x7')]||_0x38ef94[_0xf955('0xa9')](_0xf955('0xaa'));_0xe9f9a8=new _0x3ee50a['QD_buyButton'](_0x38ef94,_0x5a20d4);});_0x31deae[_0xf955('0x43')]();_0x3ee50a(window)['on'](_0xf955('0xab'),function(_0x395013,_0x5f2c05,_0x24c2ea){_0xe9f9a8[_0xf955('0x83')](_0x5f2c05,_0x24c2ea);});return _0x3ee50a[_0xf955('0x14')](_0x38ef94,_0xe9f9a8);};var _0x218493=0x0;_0x3ee50a(document)[_0xf955('0xac')](function(_0x437020,_0x12d158,_0x55f941){-0x1<_0x55f941['url']['toLowerCase']()[_0xf955('0xad')](_0xf955('0xae'))&&(_0x218493=(_0x55f941['url'][_0xf955('0xaf')](/sku\=([0-9]+)/i)||[''])[_0xf955('0xb0')]());});_0x3ee50a(window)[_0xf955('0x62')]('productAddedToCart.qdSbbVtex',function(){_0x3ee50a(window)[_0xf955('0x5e')](_0xf955('0xab'),[new _0x3ee50a(),_0x218493]);});_0x3ee50a(document)['ajaxStop'](function(){_0x31deae['fire']();});}catch(_0x3033c7){_0xf955('0x3')!==typeof console&&_0xf955('0x9')===typeof console[_0xf955('0x13')]&&console[_0xf955('0x13')]('Oooops!\x20',_0x3033c7);}}(this));function qd_number_format(_0xc881d4,_0x250a78,_0x3a2c35,_0x38935f){_0xc881d4=(_0xc881d4+'')[_0xf955('0x1')](/[^0-9+\-Ee.]/g,'');_0xc881d4=isFinite(+_0xc881d4)?+_0xc881d4:0x0;_0x250a78=isFinite(+_0x250a78)?Math['abs'](_0x250a78):0x0;_0x38935f=_0xf955('0x3')===typeof _0x38935f?',':_0x38935f;_0x3a2c35=_0xf955('0x3')===typeof _0x3a2c35?'.':_0x3a2c35;var _0x497730='',_0x497730=function(_0xa91b3e,_0x410d1f){var _0x723d5e=Math[_0xf955('0x4')](0xa,_0x410d1f);return''+(Math[_0xf955('0x5')](_0xa91b3e*_0x723d5e)/_0x723d5e)['toFixed'](_0x410d1f);},_0x497730=(_0x250a78?_0x497730(_0xc881d4,_0x250a78):''+Math[_0xf955('0x5')](_0xc881d4))[_0xf955('0x9d')]('.');0x3<_0x497730[0x0]['length']&&(_0x497730[0x0]=_0x497730[0x0][_0xf955('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x38935f));(_0x497730[0x1]||'')[_0xf955('0x7')]<_0x250a78&&(_0x497730[0x1]=_0x497730[0x1]||'',_0x497730[0x1]+=Array(_0x250a78-_0x497730[0x1][_0xf955('0x7')]+0x1)[_0xf955('0x8')]('0'));return _0x497730[_0xf955('0x8')](_0x3a2c35);}(function(){try{window[_0xf955('0x38')]=window[_0xf955('0x38')]||{},window[_0xf955('0x38')][_0xf955('0x42')]=window[_0xf955('0x38')]['callback']||$['Callbacks']();}catch(_0x3bec17){_0xf955('0x3')!==typeof console&&_0xf955('0x9')===typeof console[_0xf955('0x13')]&&console['error'](_0xf955('0xb1'),_0x3bec17[_0xf955('0xb2')]);}}());(function(_0x57e0d7){try{var _0x54903a=jQuery,_0x318209=function(_0x436399,_0x24a48e){if(_0xf955('0x16')===typeof console&&'undefined'!==typeof console[_0xf955('0x13')]&&_0xf955('0x3')!==typeof console[_0xf955('0x2d')]&&_0xf955('0x3')!==typeof console[_0xf955('0x2b')]){var _0x15c720;_0xf955('0x16')===typeof _0x436399?(_0x436399[_0xf955('0x69')]('[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'),_0x15c720=_0x436399):_0x15c720=[_0xf955('0xb3')+_0x436399];if(_0xf955('0x3')===typeof _0x24a48e||_0xf955('0x64')!==_0x24a48e[_0xf955('0x65')]()&&_0xf955('0x6b')!==_0x24a48e[_0xf955('0x65')]())if(_0xf955('0x3')!==typeof _0x24a48e&&_0xf955('0x2d')===_0x24a48e[_0xf955('0x65')]())try{console[_0xf955('0x2d')]['apply'](console,_0x15c720);}catch(_0x11f0a8){try{console[_0xf955('0x2d')](_0x15c720[_0xf955('0x8')]('\x0a'));}catch(_0x27391f){}}else try{console[_0xf955('0x13')][_0xf955('0x6c')](console,_0x15c720);}catch(_0x25f442){try{console['error'](_0x15c720[_0xf955('0x8')]('\x0a'));}catch(_0x5c2de2){}}else try{console[_0xf955('0x2b')][_0xf955('0x6c')](console,_0x15c720);}catch(_0x14cde9){try{console[_0xf955('0x2b')](_0x15c720[_0xf955('0x8')]('\x0a'));}catch(_0x621a28){}}}};window[_0xf955('0x58')]=window[_0xf955('0x58')]||{};window[_0xf955('0x58')]['allowUpdate']=!0x0;_0x54903a[_0xf955('0xb4')]=function(){};_0x54903a['fn'][_0xf955('0xb4')]=function(){return{'fn':new _0x54903a()};};var _0x1182cd=function(_0x3d5c15){var _0x298fd2={'p':_0xf955('0xb5')};return function(_0x5a45ed){var _0x23aff1=function(_0x38ff21){return _0x38ff21;};var _0x378c6e=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5a45ed=_0x5a45ed['d'+_0x378c6e[0x10]+'c'+_0x378c6e[0x11]+'m'+_0x23aff1(_0x378c6e[0x1])+'n'+_0x378c6e[0xd]]['l'+_0x378c6e[0x12]+'c'+_0x378c6e[0x0]+'ti'+_0x23aff1('o')+'n'];var _0x5c8a3f=function(_0x2a2c9d){return escape(encodeURIComponent(_0x2a2c9d[_0xf955('0x1')](/\./g,'¨')[_0xf955('0x1')](/[a-zA-Z]/g,function(_0x40dcdd){return String[_0xf955('0xb6')](('Z'>=_0x40dcdd?0x5a:0x7a)>=(_0x40dcdd=_0x40dcdd[_0xf955('0xb7')](0x0)+0xd)?_0x40dcdd:_0x40dcdd-0x1a);})));};var _0x57e0d7=_0x5c8a3f(_0x5a45ed[[_0x378c6e[0x9],_0x23aff1('o'),_0x378c6e[0xc],_0x378c6e[_0x23aff1(0xd)]][_0xf955('0x8')]('')]);_0x5c8a3f=_0x5c8a3f((window[['js',_0x23aff1('no'),'m',_0x378c6e[0x1],_0x378c6e[0x4][_0xf955('0xe')](),_0xf955('0xb8')][_0xf955('0x8')]('')]||_0xf955('0x86'))+['.v',_0x378c6e[0xd],'e',_0x23aff1('x'),'co',_0x23aff1('mm'),_0xf955('0xb9'),_0x378c6e[0x1],'.c',_0x23aff1('o'),'m.',_0x378c6e[0x13],'r']['join'](''));for(var _0x266e39 in _0x298fd2){if(_0x5c8a3f===_0x266e39+_0x298fd2[_0x266e39]||_0x57e0d7===_0x266e39+_0x298fd2[_0x266e39]){var _0x5a7e41='tr'+_0x378c6e[0x11]+'e';break;}_0x5a7e41='f'+_0x378c6e[0x0]+'ls'+_0x23aff1(_0x378c6e[0x1])+'';}_0x23aff1=!0x1;-0x1<_0x5a45ed[[_0x378c6e[0xc],'e',_0x378c6e[0x0],'rc',_0x378c6e[0x9]]['join']('')]['indexOf']('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x23aff1=!0x0);return[_0x5a7e41,_0x23aff1];}(_0x3d5c15);}(window);if(!eval(_0x1182cd[0x0]))return _0x1182cd[0x1]?_0x318209(_0xf955('0xba')):!0x1;_0x54903a['QD_dropDownCart']=function(_0x54102e,_0x3cac67){var _0x5cb8bb=_0x54903a(_0x54102e);if(!_0x5cb8bb[_0xf955('0x7')])return _0x5cb8bb;var _0x5bbb80=_0x54903a[_0xf955('0x14')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':_0xf955('0xbb'),'cartTotal':_0xf955('0xbc'),'emptyCart':_0xf955('0xbd'),'continueShopping':_0xf955('0xbe'),'shippingForm':'<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x15b32a){return _0x15b32a['skuName']||_0x15b32a[_0xf955('0xbf')];},'callback':function(){},'callbackProductsList':function(){}},_0x3cac67);_0x54903a('');var _0x43c7f6=this;if(_0x5bbb80[_0xf955('0x57')]){var _0xe15ad7=!0x1;_0xf955('0x3')===typeof window[_0xf955('0x59')]&&(_0x318209(_0xf955('0xc0')),_0x54903a[_0xf955('0x1c')]({'url':_0xf955('0xc1'),'async':!0x1,'dataType':_0xf955('0xc2'),'error':function(){_0x318209('Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.');_0xe15ad7=!0x0;}}));if(_0xe15ad7)return _0x318209(_0xf955('0xc3'));}if(_0xf955('0x16')===typeof window[_0xf955('0x59')]&&_0xf955('0x3')!==typeof window[_0xf955('0x59')][_0xf955('0x27')])var _0x673f41=window['vtexjs'][_0xf955('0x27')];else if(_0xf955('0x16')===typeof vtex&&_0xf955('0x16')===typeof vtex[_0xf955('0x27')]&&_0xf955('0x3')!==typeof vtex[_0xf955('0x27')][_0xf955('0x5a')])_0x673f41=new vtex[(_0xf955('0x27'))][(_0xf955('0x5a'))]();else return _0x318209(_0xf955('0x5b'));_0x43c7f6['cartContainer']=_0xf955('0xc4');var _0x2c8e49=function(_0x2b3deb){_0x54903a(this)[_0xf955('0x7d')](_0x2b3deb);_0x2b3deb[_0xf955('0x4e')](_0xf955('0xc5'))[_0xf955('0x2e')](_0x54903a(_0xf955('0xc6')))['on']('click.qd_ddc_closeFn',function(){_0x5cb8bb[_0xf955('0x87')](_0xf955('0xc7'));_0x54903a(document[_0xf955('0x6f')])[_0xf955('0x87')](_0xf955('0x85'));});_0x54903a(document)[_0xf955('0xc8')](_0xf955('0xc9'))['on'](_0xf955('0xc9'),function(_0x48423c){0x1b==_0x48423c['keyCode']&&(_0x5cb8bb[_0xf955('0x87')](_0xf955('0xc7')),_0x54903a(document[_0xf955('0x6f')])[_0xf955('0x87')]('qd-bb-lightBoxBodyProdAdd'));});var _0x598b47=_0x2b3deb[_0xf955('0x4e')](_0xf955('0xca'));_0x2b3deb['find'](_0xf955('0xcb'))['on'](_0xf955('0xcc'),function(){_0x43c7f6[_0xf955('0xcd')]('-',void 0x0,void 0x0,_0x598b47);return!0x1;});_0x2b3deb[_0xf955('0x4e')](_0xf955('0xce'))['on']('click.qd_ddc_scrollDown',function(){_0x43c7f6[_0xf955('0xcd')](void 0x0,void 0x0,void 0x0,_0x598b47);return!0x1;});_0x2b3deb[_0xf955('0x4e')](_0xf955('0xcf'))[_0xf955('0xd0')]('')['on'](_0xf955('0xd1'),function(){_0x43c7f6['shippingCalculate'](_0x54903a(this));});if(_0x5bbb80[_0xf955('0xd2')]){var _0x3cac67=0x0;_0x54903a(this)['on'](_0xf955('0xd3'),function(){var _0x2b3deb=function(){window[_0xf955('0x58')][_0xf955('0xd4')]&&(_0x43c7f6[_0xf955('0x8a')](),window[_0xf955('0x58')][_0xf955('0xd4')]=!0x1,_0x54903a['fn'][_0xf955('0x26')](!0x0),_0x43c7f6[_0xf955('0xd5')]());};_0x3cac67=setInterval(function(){_0x2b3deb();},0x258);_0x2b3deb();});_0x54903a(this)['on'](_0xf955('0xd6'),function(){clearInterval(_0x3cac67);});}};var _0x421b76=function(_0x30a042){_0x30a042=_0x54903a(_0x30a042);_0x5bbb80['texts']['cartTotal']=_0x5bbb80[_0xf955('0xd7')][_0xf955('0x51')][_0xf955('0x1')](_0xf955('0xd8'),'<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>');_0x5bbb80['texts'][_0xf955('0x51')]=_0x5bbb80['texts']['cartTotal'][_0xf955('0x1')]('#items',_0xf955('0xd9'));_0x5bbb80[_0xf955('0xd7')]['cartTotal']=_0x5bbb80['texts'][_0xf955('0x51')][_0xf955('0x1')](_0xf955('0xda'),_0xf955('0xdb'));_0x5bbb80[_0xf955('0xd7')]['cartTotal']=_0x5bbb80[_0xf955('0xd7')]['cartTotal']['replace']('#total',_0xf955('0xdc'));_0x30a042[_0xf955('0x4e')](_0xf955('0xdd'))['html'](_0x5bbb80['texts'][_0xf955('0xde')]);_0x30a042['find'](_0xf955('0xdf'))['html'](_0x5bbb80[_0xf955('0xd7')][_0xf955('0xe0')]);_0x30a042['find'](_0xf955('0xe1'))['html'](_0x5bbb80[_0xf955('0xd7')][_0xf955('0xe2')]);_0x30a042[_0xf955('0x4e')](_0xf955('0xe3'))[_0xf955('0xe4')](_0x5bbb80['texts']['cartTotal']);_0x30a042[_0xf955('0x4e')](_0xf955('0xe5'))[_0xf955('0xe4')](_0x5bbb80[_0xf955('0xd7')][_0xf955('0xe6')]);_0x30a042[_0xf955('0x4e')](_0xf955('0xe7'))[_0xf955('0xe4')](_0x5bbb80[_0xf955('0xd7')]['emptyCart']);return _0x30a042;}(this[_0xf955('0xe8')]);var _0x212f68=0x0;_0x5cb8bb[_0xf955('0x36')](function(){0x0<_0x212f68?_0x2c8e49[_0xf955('0x29')](this,_0x421b76[_0xf955('0xe9')]()):_0x2c8e49['call'](this,_0x421b76);_0x212f68++;});window[_0xf955('0x38')][_0xf955('0x42')]['add'](function(){_0x54903a(_0xf955('0xea'))['html'](window['_QuatroDigital_CartData'][_0xf955('0x4b')]||'--');_0x54903a(_0xf955('0xeb'))[_0xf955('0xe4')](window[_0xf955('0x38')]['qtt']||'0');_0x54903a(_0xf955('0xec'))[_0xf955('0xe4')](window[_0xf955('0x38')][_0xf955('0x3d')]||'--');_0x54903a('.qd-ddc-infoAllTotal')[_0xf955('0xe4')](window[_0xf955('0x38')]['allTotal']||'--');});var _0x19ab8d=function(_0x16c4b9,_0x43130e){if('undefined'===typeof _0x16c4b9[_0xf955('0x40')])return _0x318209(_0xf955('0xed'));_0x43c7f6[_0xf955('0xee')]['call'](this,_0x43130e);};_0x43c7f6[_0xf955('0x8a')]=function(_0x49718e,_0x5aeba7){'undefined'!=typeof _0x5aeba7?window[_0xf955('0x58')][_0xf955('0xef')]=_0x5aeba7:window[_0xf955('0x58')][_0xf955('0xef')]&&(_0x5aeba7=window[_0xf955('0x58')][_0xf955('0xef')]);setTimeout(function(){window['_QuatroDigital_DropDown'][_0xf955('0xef')]=void 0x0;},_0x5bbb80[_0xf955('0xf0')]);_0x54903a(_0xf955('0xf1'))[_0xf955('0x87')](_0xf955('0xf2'));if(_0x5bbb80[_0xf955('0x57')]){var _0x3cac67=function(_0x287adf){window[_0xf955('0x58')][_0xf955('0x28')]=_0x287adf;_0x19ab8d(_0x287adf,_0x5aeba7);'undefined'!==typeof window[_0xf955('0xf3')]&&_0xf955('0x9')===typeof window[_0xf955('0xf3')]['exec']&&window['_QuatroDigital_AmountProduct'][_0xf955('0xf4')]['call'](this);_0x54903a(_0xf955('0xf1'))[_0xf955('0x55')](_0xf955('0xf2'));};_0xf955('0x3')!==typeof window['_QuatroDigital_DropDown'][_0xf955('0x28')]?(_0x3cac67(window[_0xf955('0x58')][_0xf955('0x28')]),'function'===typeof _0x49718e&&_0x49718e(window[_0xf955('0x58')]['getOrderForm'])):_0x54903a[_0xf955('0x5c')]([_0xf955('0x40'),_0xf955('0x39'),_0xf955('0xf5')],{'done':function(_0x4d0cd2){_0x3cac67[_0xf955('0x29')](this,_0x4d0cd2);_0xf955('0x9')===typeof _0x49718e&&_0x49718e(_0x4d0cd2);},'fail':function(_0x1df7ea){_0x318209(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0x1df7ea]);}});}else alert(_0xf955('0xf6'));};_0x43c7f6['cartIsEmpty']=function(){var _0x1c286a=_0x54903a('.qd-ddc-wrapper');_0x1c286a[_0xf955('0x4e')]('.qd-ddc-prodRow')[_0xf955('0x7')]?_0x1c286a['removeClass']('qd-ddc-noItems'):_0x1c286a['addClass'](_0xf955('0xf7'));};_0x43c7f6['renderProductsList']=function(_0x599ca1){var _0x3cac67=_0x54903a(_0xf955('0xf8'));_0x3cac67[_0xf955('0xf9')]();_0x3cac67[_0xf955('0x36')](function(){var _0x3cac67=_0x54903a(this),_0x54102e,_0x16e4e7,_0x42978f=_0x54903a(''),_0x4d8c47;for(_0x4d8c47 in window[_0xf955('0x58')][_0xf955('0x28')][_0xf955('0x40')])if(_0xf955('0x16')===typeof window[_0xf955('0x58')][_0xf955('0x28')][_0xf955('0x40')][_0x4d8c47]){var _0x356738=window[_0xf955('0x58')]['getOrderForm'][_0xf955('0x40')][_0x4d8c47];var _0x1b7a62=_0x356738[_0xf955('0xfa')][_0xf955('0x1')](/^\/|\/$/g,'')[_0xf955('0x9d')]('/');var _0x4513f1=_0x54903a('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0x4513f1[_0xf955('0x34')]({'data-sku':_0x356738['id'],'data-sku-index':_0x4d8c47,'data-qd-departament':_0x1b7a62[0x0],'data-qd-category':_0x1b7a62[_0x1b7a62[_0xf955('0x7')]-0x1]});_0x4513f1[_0xf955('0x55')](_0xf955('0xfb')+_0x356738[_0xf955('0xfc')]);_0x4513f1['find'](_0xf955('0xfd'))[_0xf955('0x7d')](_0x5bbb80['skuName'](_0x356738));_0x4513f1['find']('.qd-ddc-prodPrice')[_0xf955('0x7d')](isNaN(_0x356738[_0xf955('0xfe')])?_0x356738[_0xf955('0xfe')]:0x0==_0x356738[_0xf955('0xfe')]?_0xf955('0xff'):(_0x54903a(_0xf955('0x33'))[_0xf955('0x34')](_0xf955('0x35'))||'R$')+'\x20'+qd_number_format(_0x356738[_0xf955('0xfe')]/0x64,0x2,',','.'));_0x4513f1[_0xf955('0x4e')]('.qd-ddc-quantity')[_0xf955('0x34')]({'data-sku':_0x356738['id'],'data-sku-index':_0x4d8c47})[_0xf955('0xd0')](_0x356738[_0xf955('0x41')]);_0x4513f1[_0xf955('0x4e')](_0xf955('0x100'))['attr']({'data-sku':_0x356738['id'],'data-sku-index':_0x4d8c47});_0x43c7f6[_0xf955('0x101')](_0x356738['id'],_0x4513f1[_0xf955('0x4e')]('.qd-ddc-image'),_0x356738[_0xf955('0x102')]);_0x4513f1[_0xf955('0x4e')](_0xf955('0x103'))['attr']({'data-sku':_0x356738['id'],'data-sku-index':_0x4d8c47});_0x4513f1[_0xf955('0x104')](_0x3cac67);_0x42978f=_0x42978f[_0xf955('0x2e')](_0x4513f1);}try{var _0x2e837a=_0x3cac67[_0xf955('0x25')](_0xf955('0xf1'))[_0xf955('0x4e')](_0xf955('0xcf'));_0x2e837a['length']&&''==_0x2e837a[_0xf955('0xd0')]()&&window['_QuatroDigital_DropDown']['getOrderForm']['shippingData'][_0xf955('0x105')]&&_0x2e837a[_0xf955('0xd0')](window[_0xf955('0x58')][_0xf955('0x28')][_0xf955('0xf5')][_0xf955('0x105')][_0xf955('0x106')]);}catch(_0x56dc02){_0x318209('Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20'+_0x56dc02[_0xf955('0xb2')],_0xf955('0x6b'));}_0x43c7f6['actionButtons'](_0x3cac67);_0x43c7f6['cartIsEmpty']();_0x599ca1&&_0x599ca1[_0xf955('0x107')]&&function(){_0x16e4e7=_0x42978f[_0xf955('0x46')](_0xf955('0x108')+_0x599ca1['lastSku']+'\x27]');_0x16e4e7['length']&&(_0x54102e=0x0,_0x42978f[_0xf955('0x36')](function(){var _0x599ca1=_0x54903a(this);if(_0x599ca1['is'](_0x16e4e7))return!0x1;_0x54102e+=_0x599ca1[_0xf955('0x109')]();}),_0x43c7f6[_0xf955('0xcd')](void 0x0,void 0x0,_0x54102e,_0x3cac67[_0xf955('0x2e')](_0x3cac67['parent']())),_0x42978f['removeClass'](_0xf955('0x10a')),function(_0x32449b){_0x32449b[_0xf955('0x55')](_0xf955('0x10b'));_0x32449b['addClass'](_0xf955('0x10a'));setTimeout(function(){_0x32449b[_0xf955('0x87')](_0xf955('0x10b'));},_0x5bbb80[_0xf955('0xf0')]);}(_0x16e4e7));}();});(function(){_QuatroDigital_DropDown[_0xf955('0x28')][_0xf955('0x40')]['length']?(_0x54903a('body')[_0xf955('0x87')]('qd-ddc-cart-empty')[_0xf955('0x55')](_0xf955('0x10c')),setTimeout(function(){_0x54903a('body')['removeClass']('qd-ddc-product-add-time');},_0x5bbb80[_0xf955('0xf0')])):_0x54903a(_0xf955('0x6f'))[_0xf955('0x87')](_0xf955('0x10d'))[_0xf955('0x55')](_0xf955('0x10e'));}());_0xf955('0x9')===typeof _0x5bbb80[_0xf955('0x10f')]?_0x5bbb80[_0xf955('0x10f')]['call'](this):_0x318209(_0xf955('0x110'));};_0x43c7f6['insertProdImg']=function(_0x5858f7,_0x308f5d,_0x36327c){function _0x314f44(){_0x308f5d[_0xf955('0x87')]('qd-loaded')[_0xf955('0x91')](function(){_0x54903a(this)['addClass'](_0xf955('0x111'));})[_0xf955('0x34')](_0xf955('0x112'),_0x36327c);}_0x36327c?_0x314f44():isNaN(_0x5858f7)?_0x318209(_0xf955('0x113'),'alerta'):alert(_0xf955('0x114'));};_0x43c7f6[_0xf955('0x115')]=function(_0x1ff3b3){var _0x2dbec5=function(_0x3bab61,_0x432f39){var _0x3cac67=_0x54903a(_0x3bab61);var _0x3c6948=_0x3cac67[_0xf955('0x34')]('data-sku');var _0x54102e=_0x3cac67[_0xf955('0x34')](_0xf955('0x116'));if(_0x3c6948){var _0x932b98=parseInt(_0x3cac67[_0xf955('0xd0')]())||0x1;_0x43c7f6['changeQantity']([_0x3c6948,_0x54102e],_0x932b98,_0x932b98+0x1,function(_0x3ca289){_0x3cac67[_0xf955('0xd0')](_0x3ca289);_0xf955('0x9')===typeof _0x432f39&&_0x432f39();});}};var _0x3cac67=function(_0x458e89,_0x2308b2){var _0x3cac67=_0x54903a(_0x458e89);var _0x3419ef=_0x3cac67[_0xf955('0x34')](_0xf955('0x117'));var _0x54102e=_0x3cac67[_0xf955('0x34')]('data-sku-index');if(_0x3419ef){var _0x27af29=parseInt(_0x3cac67[_0xf955('0xd0')]())||0x2;_0x43c7f6[_0xf955('0x118')]([_0x3419ef,_0x54102e],_0x27af29,_0x27af29-0x1,function(_0x5cdb9b){_0x3cac67[_0xf955('0xd0')](_0x5cdb9b);_0xf955('0x9')===typeof _0x2308b2&&_0x2308b2();});}};var _0x4fdabb=function(_0xf1f969,_0x1c5db0){var _0x3cac67=_0x54903a(_0xf1f969);var _0x180e89=_0x3cac67[_0xf955('0x34')]('data-sku');var _0x54102e=_0x3cac67[_0xf955('0x34')](_0xf955('0x116'));if(_0x180e89){var _0x32552f=parseInt(_0x3cac67[_0xf955('0xd0')]())||0x1;_0x43c7f6[_0xf955('0x118')]([_0x180e89,_0x54102e],0x1,_0x32552f,function(_0x6f1894){_0x3cac67['val'](_0x6f1894);_0xf955('0x9')===typeof _0x1c5db0&&_0x1c5db0();});}};var _0x54102e=_0x1ff3b3[_0xf955('0x4e')](_0xf955('0x119'));_0x54102e['addClass'](_0xf955('0x11a'))[_0xf955('0x36')](function(){var _0x1ff3b3=_0x54903a(this);_0x1ff3b3[_0xf955('0x4e')]('.qd-ddc-quantityMore')['on'](_0xf955('0x11b'),function(_0x142a5d){_0x142a5d[_0xf955('0x77')]();_0x54102e[_0xf955('0x55')](_0xf955('0x11c'));_0x2dbec5(_0x1ff3b3[_0xf955('0x4e')](_0xf955('0x11d')),function(){_0x54102e['removeClass'](_0xf955('0x11c'));});});_0x1ff3b3[_0xf955('0x4e')](_0xf955('0x11e'))['on'](_0xf955('0x11f'),function(_0x35ae56){_0x35ae56[_0xf955('0x77')]();_0x54102e[_0xf955('0x55')](_0xf955('0x11c'));_0x3cac67(_0x1ff3b3[_0xf955('0x4e')](_0xf955('0x11d')),function(){_0x54102e[_0xf955('0x87')](_0xf955('0x11c'));});});_0x1ff3b3['find'](_0xf955('0x11d'))['on'](_0xf955('0x120'),function(){_0x54102e[_0xf955('0x55')]('qd-loading');_0x4fdabb(this,function(){_0x54102e[_0xf955('0x87')]('qd-loading');});});_0x1ff3b3[_0xf955('0x4e')](_0xf955('0x11d'))['on'](_0xf955('0x121'),function(_0x139935){0xd==_0x139935['keyCode']&&(_0x54102e['addClass']('qd-loading'),_0x4fdabb(this,function(){_0x54102e[_0xf955('0x87')](_0xf955('0x11c'));}));});});_0x1ff3b3[_0xf955('0x4e')](_0xf955('0x122'))[_0xf955('0x36')](function(){var _0x1ff3b3=_0x54903a(this);_0x1ff3b3[_0xf955('0x4e')](_0xf955('0x100'))['on'](_0xf955('0x123'),function(){_0x1ff3b3[_0xf955('0x55')]('qd-loading');_0x43c7f6[_0xf955('0x124')](_0x54903a(this),function(_0x28554a){_0x28554a?_0x1ff3b3[_0xf955('0x125')](!0x0)[_0xf955('0x126')](function(){_0x1ff3b3[_0xf955('0x127')]();_0x43c7f6[_0xf955('0xd5')]();}):_0x1ff3b3['removeClass'](_0xf955('0x11c'));});return!0x1;});});};_0x43c7f6['shippingCalculate']=function(_0xba5975){var _0x1ed31c=_0xba5975[_0xf955('0xd0')](),_0x1ed31c=_0x1ed31c[_0xf955('0x1')](/[^0-9\-]/g,''),_0x1ed31c=_0x1ed31c[_0xf955('0x1')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3'),_0x1ed31c=_0x1ed31c[_0xf955('0x1')](/(.{9}).*/g,'$1');_0xba5975[_0xf955('0xd0')](_0x1ed31c);0x9<=_0x1ed31c[_0xf955('0x7')]&&(_0xba5975[_0xf955('0x17')](_0xf955('0x128'))!=_0x1ed31c&&_0x673f41[_0xf955('0x129')]({'postalCode':_0x1ed31c,'country':_0xf955('0x12a')})['done'](function(_0x3525a9){window['_QuatroDigital_DropDown'][_0xf955('0x28')]=_0x3525a9;_0x43c7f6['getCartInfoByUrl']();})[_0xf955('0x1f')](function(_0x361ece){_0x318209(['Não\x20foi\x20possível\x20calcular\x20o\x20frete',_0x361ece]);updateCartData();}),_0xba5975[_0xf955('0x17')]('qdDdcLastPostalCode',_0x1ed31c));};_0x43c7f6[_0xf955('0x118')]=function(_0x54e116,_0x9b245,_0x387c0f,_0xda6744){function _0x35727b(_0x4b9107){_0x4b9107=_0xf955('0x12b')!==typeof _0x4b9107?!0x1:_0x4b9107;_0x43c7f6[_0xf955('0x8a')]();window[_0xf955('0x58')][_0xf955('0xd4')]=!0x1;_0x43c7f6[_0xf955('0xd5')]();_0xf955('0x3')!==typeof window[_0xf955('0xf3')]&&_0xf955('0x9')===typeof window['_QuatroDigital_AmountProduct'][_0xf955('0xf4')]&&window[_0xf955('0xf3')][_0xf955('0xf4')][_0xf955('0x29')](this);'function'===typeof adminCart&&adminCart();_0x54903a['fn'][_0xf955('0x26')](!0x0,void 0x0,_0x4b9107);_0xf955('0x9')===typeof _0xda6744&&_0xda6744(_0x9b245);}_0x387c0f=_0x387c0f||0x1;if(0x1>_0x387c0f)return _0x9b245;if(_0x5bbb80[_0xf955('0x57')]){if(_0xf955('0x3')===typeof window[_0xf955('0x58')][_0xf955('0x28')]['items'][_0x54e116[0x1]])return _0x318209(_0xf955('0x12c')+_0x54e116[0x1]+']'),_0x9b245;window[_0xf955('0x58')]['getOrderForm'][_0xf955('0x40')][_0x54e116[0x1]][_0xf955('0x41')]=_0x387c0f;window[_0xf955('0x58')][_0xf955('0x28')][_0xf955('0x40')][_0x54e116[0x1]][_0xf955('0x12d')]=_0x54e116[0x1];_0x673f41[_0xf955('0x12e')]([window['_QuatroDigital_DropDown'][_0xf955('0x28')][_0xf955('0x40')][_0x54e116[0x1]]],[_0xf955('0x40'),_0xf955('0x39'),_0xf955('0xf5')])[_0xf955('0x1d')](function(_0x22295e){window['_QuatroDigital_DropDown'][_0xf955('0x28')]=_0x22295e;_0x35727b(!0x0);})[_0xf955('0x1f')](function(_0x2dae80){_0x318209([_0xf955('0x12f'),_0x2dae80]);_0x35727b();});}else _0x318209(_0xf955('0x130'));};_0x43c7f6[_0xf955('0x124')]=function(_0x5b7980,_0x16661a){function _0x3607bb(_0x275f7d){_0x275f7d=_0xf955('0x12b')!==typeof _0x275f7d?!0x1:_0x275f7d;'undefined'!==typeof window['_QuatroDigital_AmountProduct']&&_0xf955('0x9')===typeof window[_0xf955('0xf3')][_0xf955('0xf4')]&&window['_QuatroDigital_AmountProduct'][_0xf955('0xf4')]['call'](this);_0xf955('0x9')===typeof adminCart&&adminCart();_0x54903a['fn']['simpleCart'](!0x0,void 0x0,_0x275f7d);'function'===typeof _0x16661a&&_0x16661a(_0x54102e);}var _0x54102e=!0x1,_0x25c0b6=_0x54903a(_0x5b7980)[_0xf955('0x34')](_0xf955('0x116'));if(_0x5bbb80[_0xf955('0x57')]){if(_0xf955('0x3')===typeof window[_0xf955('0x58')]['getOrderForm'][_0xf955('0x40')][_0x25c0b6])return _0x318209(_0xf955('0x12c')+_0x25c0b6+']'),_0x54102e;window[_0xf955('0x58')][_0xf955('0x28')][_0xf955('0x40')][_0x25c0b6][_0xf955('0x12d')]=_0x25c0b6;_0x673f41[_0xf955('0x131')]([window['_QuatroDigital_DropDown'][_0xf955('0x28')][_0xf955('0x40')][_0x25c0b6]],['items',_0xf955('0x39'),_0xf955('0xf5')])[_0xf955('0x1d')](function(_0x333194){_0x54102e=!0x0;window[_0xf955('0x58')]['getOrderForm']=_0x333194;_0x19ab8d(_0x333194);_0x3607bb(!0x0);})[_0xf955('0x1f')](function(_0x2d7e9f){_0x318209([_0xf955('0x132'),_0x2d7e9f]);_0x3607bb();});}else alert(_0xf955('0x133'));};_0x43c7f6[_0xf955('0xcd')]=function(_0x40a1e6,_0x456485,_0x32cabf,_0x2a6aa8){_0x2a6aa8=_0x2a6aa8||_0x54903a(_0xf955('0x134'));_0x40a1e6=_0x40a1e6||'+';_0x456485=_0x456485||0.9*_0x2a6aa8[_0xf955('0x135')]();_0x2a6aa8[_0xf955('0x125')](!0x0,!0x0)[_0xf955('0x136')]({'scrollTop':isNaN(_0x32cabf)?_0x40a1e6+'='+_0x456485+'px':_0x32cabf});};_0x5bbb80[_0xf955('0xd2')]||(_0x43c7f6['getCartInfoByUrl'](),_0x54903a['fn'][_0xf955('0x26')](!0x0));_0x54903a(window)['on'](_0xf955('0x137'),function(){try{window[_0xf955('0x58')][_0xf955('0x28')]=void 0x0,_0x43c7f6[_0xf955('0x8a')]();}catch(_0x41ff13){_0x318209(_0xf955('0x138')+_0x41ff13[_0xf955('0xb2')],_0xf955('0x139'));}});_0xf955('0x9')===typeof _0x5bbb80[_0xf955('0x42')]?_0x5bbb80['callback'][_0xf955('0x29')](this):_0x318209('Callback\x20não\x20é\x20uma\x20função');};_0x54903a['fn'][_0xf955('0xb4')]=function(_0xb571fe){var _0x222362=_0x54903a(this);_0x222362['fn']=new _0x54903a[(_0xf955('0xb4'))](this,_0xb571fe);return _0x222362;};}catch(_0x1dc01a){_0xf955('0x3')!==typeof console&&'function'===typeof console[_0xf955('0x13')]&&console['error'](_0xf955('0xb1'),_0x1dc01a);}}(this));(function(_0x4c0c39){try{var _0x1abcc7=jQuery;window['_QuatroDigital_AmountProduct']=window['_QuatroDigital_AmountProduct']||{};window[_0xf955('0xf3')][_0xf955('0x40')]={};window[_0xf955('0xf3')]['allowRecalculate']=!0x1;window[_0xf955('0xf3')][_0xf955('0x13a')]=!0x1;window['_QuatroDigital_AmountProduct'][_0xf955('0x13b')]=!0x1;var _0x14339c=function(){if(window[_0xf955('0xf3')][_0xf955('0x13c')]){var _0x3cbc20=!0x1;var _0x4c0c39={};window[_0xf955('0xf3')][_0xf955('0x40')]={};for(_0xffbcc1 in window[_0xf955('0x58')][_0xf955('0x28')][_0xf955('0x40')])if('object'===typeof window[_0xf955('0x58')][_0xf955('0x28')]['items'][_0xffbcc1]){var _0x1dfbbd=window['_QuatroDigital_DropDown'][_0xf955('0x28')]['items'][_0xffbcc1];_0xf955('0x3')!==typeof _0x1dfbbd['productId']&&null!==_0x1dfbbd[_0xf955('0x13d')]&&''!==_0x1dfbbd[_0xf955('0x13d')]&&(window[_0xf955('0xf3')][_0xf955('0x40')][_0xf955('0x13e')+_0x1dfbbd[_0xf955('0x13d')]]=window[_0xf955('0xf3')][_0xf955('0x40')]['prod_'+_0x1dfbbd[_0xf955('0x13d')]]||{},window[_0xf955('0xf3')][_0xf955('0x40')][_0xf955('0x13e')+_0x1dfbbd[_0xf955('0x13d')]][_0xf955('0x13f')]=_0x1dfbbd[_0xf955('0x13d')],_0x4c0c39['prod_'+_0x1dfbbd[_0xf955('0x13d')]]||(window[_0xf955('0xf3')][_0xf955('0x40')][_0xf955('0x13e')+_0x1dfbbd[_0xf955('0x13d')]][_0xf955('0x3e')]=0x0),window[_0xf955('0xf3')]['items'][_0xf955('0x13e')+_0x1dfbbd['productId']]['qtt']+=_0x1dfbbd[_0xf955('0x41')],_0x3cbc20=!0x0,_0x4c0c39[_0xf955('0x13e')+_0x1dfbbd[_0xf955('0x13d')]]=!0x0);}var _0xffbcc1=_0x3cbc20;}else _0xffbcc1=void 0x0;window[_0xf955('0xf3')][_0xf955('0x13c')]&&(_0x1abcc7('.qd-bap-wrapper')['remove'](),_0x1abcc7(_0xf955('0x140'))[_0xf955('0x87')](_0xf955('0x141')));for(var _0x4c36f6 in window[_0xf955('0xf3')][_0xf955('0x40')]){_0x1dfbbd=window[_0xf955('0xf3')][_0xf955('0x40')][_0x4c36f6];if(_0xf955('0x16')!==typeof _0x1dfbbd)return;_0x4c0c39=_0x1abcc7(_0xf955('0x142')+_0x1dfbbd[_0xf955('0x13f')]+']')['getParent']('li');if(window[_0xf955('0xf3')][_0xf955('0x13c')]||!_0x4c0c39['find']('.qd-bap-wrapper')[_0xf955('0x7')])_0x3cbc20=_0x1abcc7(_0xf955('0x143')),_0x3cbc20[_0xf955('0x4e')](_0xf955('0x144'))[_0xf955('0xe4')](_0x1dfbbd['qtt']),_0x1dfbbd=_0x4c0c39[_0xf955('0x4e')](_0xf955('0x145')),_0x1dfbbd[_0xf955('0x7')]?_0x1dfbbd[_0xf955('0xa9')](_0x3cbc20)[_0xf955('0x55')]('qd-bap-item-added'):_0x4c0c39[_0xf955('0xa9')](_0x3cbc20);}_0xffbcc1&&(window[_0xf955('0xf3')][_0xf955('0x13c')]=!0x1);};window['_QuatroDigital_AmountProduct'][_0xf955('0xf4')]=function(){window[_0xf955('0xf3')][_0xf955('0x13c')]=!0x0;_0x14339c[_0xf955('0x29')](this);};_0x1abcc7(document)[_0xf955('0x146')](function(){_0x14339c['call'](this);});}catch(_0x25b252){_0xf955('0x3')!==typeof console&&_0xf955('0x9')===typeof console[_0xf955('0x13')]&&console['error']('Oooops!\x20',_0x25b252);}}(this));(function(){try{var _0x2a970b=jQuery,_0xd521bd,_0x568f41={'selector':_0xf955('0x147'),'dropDown':{},'buyButton':{}};_0x2a970b[_0xf955('0x148')]=function(_0x1ecab4){var _0x20663c={};_0xd521bd=_0x2a970b[_0xf955('0x14')](!0x0,{},_0x568f41,_0x1ecab4);_0x1ecab4=_0x2a970b(_0xd521bd[_0xf955('0x149')])['QD_dropDownCart'](_0xd521bd[_0xf955('0x14a')]);_0x20663c[_0xf955('0x78')]='undefined'!==typeof _0xd521bd[_0xf955('0x14a')][_0xf955('0xd2')]&&!0x1===_0xd521bd[_0xf955('0x14a')][_0xf955('0xd2')]?_0x2a970b(_0xd521bd[_0xf955('0x149')])[_0xf955('0x75')](_0x1ecab4['fn'],_0xd521bd[_0xf955('0x78')]):_0x2a970b(_0xd521bd['selector'])[_0xf955('0x75')](_0xd521bd[_0xf955('0x78')]);_0x20663c[_0xf955('0x14a')]=_0x1ecab4;return _0x20663c;};_0x2a970b['fn'][_0xf955('0x14b')]=function(){_0xf955('0x16')===typeof console&&_0xf955('0x9')===typeof console[_0xf955('0x2d')]&&console[_0xf955('0x2d')](_0xf955('0x14c'));};_0x2a970b['smartCart']=_0x2a970b['fn'][_0xf955('0x14b')];}catch(_0x8420ae){'undefined'!==typeof console&&_0xf955('0x9')===typeof console['error']&&console[_0xf955('0x13')](_0xf955('0xb1'),_0x8420ae);}}());

/* Quatro Digital - Mosaic Banners // Carlos Vinicius // Todos os direitos reservados */
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);
