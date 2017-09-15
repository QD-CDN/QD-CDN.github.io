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
			Common.applyMosaicCategorieBanners();
			Common.applySmartCart();
			Common.applyAmazingMenu();
			Common.applyAmazingMenuMobile();
			Common.applyAmazingMenuFooter();
			Common.openSearchModal();
			Common.showFooterLinks();
			Common.applyTipBarCarousel();
			Common.applyCarouselShelf();
			Common.saveAmountFix();
			Common.setDataScrollToggle();			
			Common.qdOverlay();
		},
		ajaxStop: function() {},
		windowOnload: function() {
			Common.saveAmountFix();
		},
		vtexBindQuickViewDestroy: function() {
			window.bindQuickView = function() {};
		},
		applySmartCart: function() {
			$('.header-qd-v1-cart').append('<div class="smart-cart-qd-v1-wrapper"><div class="qd-sc-wrapper"></div></div>');

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
		applyAmazingMenu: function() {
			$('.header-qd-v1-amazing-menu').QD_amazingMenu({
				callback: function() {
					$('ul.qd-am-dropdown-menu').each(function() {
						$(this).wrapInner('<li class="container"><ul></ul></li>');
					});
				}
			});
		},
		applyAmazingMenuFooter: function() {
			$('.footer-qd-v1-menu-list, .footer-qd-v1-category-list').QD_amazingMenu();
		},
		applyAmazingMenuMobile: function() {
			var wrapper = $('.header-qd-v1-amazing-menu-mobile');

			wrapper.find('> ul > li > ul').prepend(function(){return $(this).prev().clone().wrap('<li></li>').parent()});

			wrapper.QD_amazingMenu({
				callback: function() {
					$('<span class="qd-am-dropdown-trigger"><i class="fa fa-angle-right"></i></span>').appendTo(wrapper.find('.qd-am-has-ul')).click(function() {
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
		qdOverlayClass: 'qd-am-on qd-cart-show qd-sn-on',
		qdOverlay: function() {
			$('.components-qd-v1-overlay').click(function() {
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		},			
		openSearchModal: function() {
			$('.header-qd-v1-actions-search, .header-qd-v1-action-search').click(function() {
				$('.modal-qd-v1-search').modal();
				return false;
			});
		},
		showFooterLinks: function () {
			$('.footer-qd-v1-menu-list > ul > li').click(function (e) {
				var $t = $(this);
				$t.toggleClass('qd-is-active');
				$t.find('> ul').toggleClass('qd-is-active');
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
					return { slidesToShow: 3 };
				return {};
			})()));
		},
		applyCarouselShelf: function() {
			var wrapper = $('.carousel-qd-v1-shelf .prateleira').not('.slick-initialized');

			if (!wrapper.length)
				return false;

			wrapper.has('h2').each(function () {
				var $t = $(this);
				$t.find('h2').insertBefore($t);
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
		saveAmountFix: function() {
			$('.shelf-qd-v1-highlight-discount-percentage:not(.qd-on)').addClass('qd-on').each(function() {
				var $t = $(this);
				$t.text(($t.text().trim().match(/[0-9]+/) || [""]).pop() + '%');
			});
		},
		setDataScrollToggle: function() {
			$(document.body).attr('data-qd-scroll-limit', '100');
		},
		applyMosaicCategorieBanners: function() {
			$('.mosaic-categories-qd-v1-wrapper > .box-banner').QD_mosaicBanners({
				classFourColumn: "col-xs-12 col-sm-6 col-md-2"
			});
		}		
	};

	var Home = {
		init: function() {
			Home.applySlickBannerSlider();
			Home.applyBrandCarousel();
			Home.tabShelfCarousel();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		applySlickBannerSlider: function() {
			console.log("oi");
			var wrapper = $('.slider-qd-v1-full, .slider-qd-v1-full-hotsite');
			
			// wrapper.find(".box-banner").each(function() {
				
			wrapper.slick({
				dots: true,
				customPaging : function(slider, i) {
					var alt = slider.$slides[i].querySelector('img').alt;
					return '<button data-role="none" tabindex="' + i + '">' + alt + '</button>';
				},
				fade: true,
				cssEase: 'linear',
				infinite: true,
				speed: 500,
				autoplay: true,
				autoplaySpeed: 2000,
				draggable: false
			});
			
			var mobileDotsWrapper = $('.slider-qd-v1-full-mobile .slick-dots, .slider-qd-v1-full-hotsite-mobile .slick-dots ');
			mobileDotsWrapper.on('init', function(event, slick){
				$(this).find('.slick-current').addClass('slick-active');
			});	

			mobileDotsWrapper.slick({
				asNavFor: '.slider-qd-v1-full-mobile, .slider-qd-v1-full-hotsite-mobile',
				arrows: false,
				centerMode: true,
				infinite: false,
				focusOnSelect: true,
				variableWidth: true,
				centerPadding: '24%'
			});

			// On after slide change
			var mobileWrapper = $('.slider-qd-v1-full.slider-qd-v1-full-mobile, .slider-qd-v1-full-hotsite.slider-qd-v1-full-hotsite-mobile');
			mobileWrapper.on('afterChange', function(event, slick, currentSlide, nextSlide){
				mobileDotsWrapper.slick('slickGoTo', currentSlide);
				mobileDotsWrapper.find('.slick-current').addClass('slick-active');
			});

			wrapper.each(function() {
				$(this).find('.slick-arrow').wrapAll('<div class="slick-nav" />');
			});
		},
		applyBrandCarousel: function() {
			var wrapper = $('.brand-carousel-qd-v1-carousel');

			var slideShow = 6;
			var slideShowM = 1;

			wrapper.slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: slideShow,
				slidesToScroll: slideShow,
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
							slidesToShow: slideShowM,
							slidesToScroll: slideShowM,
							centerMode: true,
							infinite: true,
							centerPadding: '40px'	
						} 
					},

					{
						breakpoint: 380,
						settings: {
							slidesToShow: slideShowM,
							slidesToScroll: slideShowM,
							centerMode: true,
							infinite: true,
							centerPadding: '40px'							
							
						}
					}
				]
			});
		},
		tabShelfCarousel: function () {
			var wrapper = $('.tabs-qd-v1-carousel-wrapper');
			var shelves = wrapper.find('.prateleira');

			wrapper.find('h2').each(function () {
				var $t = $(this);
				var text = $t.text().toLowerCase().replace(/ /g, '-');
				$t.wrap('<a class="qd-tab-item" href="#' + text + '" />');
				$t.parent().nextAll('.prateleira').first().attr('id', text).addClass('tab-pane');
			}).parent().appendTo(wrapper.find('.tabs-qd-v1-links')).click(function (e) {
				e.preventDefault();
				var $t = $(this).addClass('active');
				$t.siblings('a').removeClass('active');
				shelves.filter('.slick-initialized').slick('unslick');
				$t.tab('show');
				Common.applyCarouselShelf();
			}).first().click();

			wrapper.find('.carousel-qd-v1-shelf').addClass('tab-content');
		}						
	};

	var Search = {
		init: function() {
			Search.hideExtendedMenu();
			Search.openFiltersMenu();
			Search.shelfLineFix();
		},
		ajaxStop: function() {
			Search.shelfLineFix();			
		},
		windowOnload: function() {
			Search.shelfLineFix();			
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
			Product.accessoriesFix();
			Product.accessoriesApplyCarousel();
			Product.forceImageZoom();
			Product.setAvailableBodyClass();
			// Roda slick das thumbs quando volta para estado inicial
			$(window).on('skuSelectable.vtex', Product.applyCarouselThumb);
			Product.scrollToDescription();
			Product.seeInstalments();
			Product.openShipping();
			Product.showFloatingBuyBar();
			Product.qdCallThumbVideo();
			Product.qdHideUniqueSkuOption();
			Product.qdClickTableMeasures();
			Product.qdSeePreTitles();
			Product.saveAmountFlag();
		},
		ajaxStop: function() {
			Product.applyCarouselThumb();
		},
		windowOnload: function() {},
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
		scrollToDescription: function() {
			$('.product-qd-v1-link-description').click(function(e) {
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $('.product-qd-v1-description').offset().top -100
				}, 900, 'swing');
			});
		},
		seeInstalments: function () {
			$('.product-qd-v1-see-installments').click(function (e) {
				e.preventDefault();
				$(this).toggleClass('qd-is-active');
				$('.product-qd-v1-installments-method').toggleClass('qd-is-visible');
			});
		},
		openShipping: function() {
			if( typeof window.ShippingValue === "function" )
				window.ShippingValue();
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
		qdCallThumbVideo: function() {
			var iframe = $("td.value-field.Video:first iframe");

			if (!iframe.length) {
				window.qdVideoInProduct = {videoFieldSelector: 'td.value-field.Video:first'};
				return;
			}

			window.qdVideoInProduct = {videoFieldSelector: $('<span/>').addClass('video-product').text('https://www.youtube.com/watch?v=' + iframe.attr("src").split("?").shift().split("/").pop() + '&rel=0')};
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
		qdClickTableMeasures: function() {
			var wrapper = $(".product-qd-v1-sku-selection");
			var modal = $(".qd-v1-modal").clone().appendTo(document.body).addClass('qd-v1-modal-table-measures');

			$(".product-qd-v1-table-measures").click(function() {
				modal.find('.modal-body:not(.qd-on)').addClass('qd-on').append('<img width="720" height="688" alt="tabela de medidas" src="//madeirasgasometro.vteximg.com.br/arquivos/ids/166944-1000-1000/coladeira-de-bordas-new-plus-diamante-imagem-01.jpg" complete="complete">');
				modal.modal();

				modal.on('hidden.bs.modal', function() {
					modal.remove();
				});
			});
		},
		qdSeePreTitles: function() {
			var wrapper = $('.product-qd-v1-section');
			var subWrappers = wrapper.find('.productDescription, .buy-together-content >*, h4.group.Especificacao, .prateleira');
			
			subWrappers.each(function() {
				if($(this).length < 1)
					return;
				$(this).parents('.product-qd-v1-section').find('.product-qd-v1-pre-title').addClass('qd-active');
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
			Institutional.sidemenuToggle();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		sidemenuToggle:function() {
			// Amazing Menu Responsivo
			$('.institucional-qd-v1-menu-toggle').click(function(evt) {
				evt.preventDefault();
				$(document.body).addClass('qd-sn-on');
			});
			$('.institucional-qd-v1-side-menu-wrap-close').click(function() {
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
var _0xba0d=['-li','callback','trigger','QuatroDigital.am.callback','extend','exec','closest','function','/qd-amazing-menu','undefined','error','info','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','join','apply','qdAmAddNdx','each','addClass','first','qd-am-first','last','QD_amazingMenu','oenxnqnoen%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','---','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','.qd-am-collection','length','parent','qd-am-collection-wrapper','qdAjax','html','data-qdam-value','getParent','.box-banner','hide','text','trim','attr','clone','insertBefore','url','call','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','children',':not(ul)','qd-am-elem-','replaceSpecialChars','>ul','>li','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','add','qd-am-'];(function(_0x2c1114,_0x2a5c50){var _0x2b877c=function(_0x4f356d){while(--_0x4f356d){_0x2c1114['push'](_0x2c1114['shift']());}};_0x2b877c(++_0x2a5c50);}(_0xba0d,0x8e));var _0xdba0=function(_0x268237,_0x17b74d){_0x268237=_0x268237-0x0;var _0x5b0422=_0xba0d[_0x268237];return _0x5b0422;};(function(_0x3ba709){_0x3ba709['fn']['getParent']=_0x3ba709['fn'][_0xdba0('0x0')];}(jQuery));(function(_0x43db19){var _0xce5297;var _0x5da7bc=jQuery;if(_0xdba0('0x1')!==typeof _0x5da7bc['fn']['QD_amazingMenu']){var _0xebb600={'url':_0xdba0('0x2'),'callback':function(){},'ajaxCallback':function(){}};var _0x6a96ad=function(_0x8b0331,_0x592a53){if('object'===typeof console&&_0xdba0('0x3')!==typeof console[_0xdba0('0x4')]&&_0xdba0('0x3')!==typeof console[_0xdba0('0x5')]&&'undefined'!==typeof console[_0xdba0('0x6')]){var _0x5d2ac2;'object'===typeof _0x8b0331?(_0x8b0331[_0xdba0('0x7')]('[QD\x20Amazing\x20Menu]\x0a'),_0x5d2ac2=_0x8b0331):_0x5d2ac2=[_0xdba0('0x8')+_0x8b0331];if('undefined'===typeof _0x592a53||_0xdba0('0x9')!==_0x592a53[_0xdba0('0xa')]()&&_0xdba0('0xb')!==_0x592a53[_0xdba0('0xa')]())if(_0xdba0('0x3')!==typeof _0x592a53&&_0xdba0('0x5')===_0x592a53[_0xdba0('0xa')]())try{console[_0xdba0('0x5')]['apply'](console,_0x5d2ac2);}catch(_0x49e581){try{console[_0xdba0('0x5')](_0x5d2ac2[_0xdba0('0xc')]('\x0a'));}catch(_0x223797){}}else try{console[_0xdba0('0x4')][_0xdba0('0xd')](console,_0x5d2ac2);}catch(_0x28da4c){try{console[_0xdba0('0x4')](_0x5d2ac2['join']('\x0a'));}catch(_0x327932){}}else try{console[_0xdba0('0x6')][_0xdba0('0xd')](console,_0x5d2ac2);}catch(_0xb0ffc4){try{console[_0xdba0('0x6')](_0x5d2ac2[_0xdba0('0xc')]('\x0a'));}catch(_0x316a23){}}}};_0x5da7bc['fn'][_0xdba0('0xe')]=function(){var _0x119c31=_0x5da7bc(this);_0x119c31[_0xdba0('0xf')](function(_0x479a46){_0x5da7bc(this)[_0xdba0('0x10')]('qd-am-li-'+_0x479a46);});_0x119c31[_0xdba0('0x11')]()[_0xdba0('0x10')](_0xdba0('0x12'));_0x119c31[_0xdba0('0x13')]()['addClass']('qd-am-last');return _0x119c31;};_0x5da7bc['fn'][_0xdba0('0x14')]=function(){};_0x43db19=function(_0x427dea){var _0x57f5e1={'n':_0xdba0('0x15')};return function(_0x233deb){var _0x907a7a=function(_0x591b0e){return _0x591b0e;};var _0x36adb3=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x233deb=_0x233deb['d'+_0x36adb3[0x10]+'c'+_0x36adb3[0x11]+'m'+_0x907a7a(_0x36adb3[0x1])+'n'+_0x36adb3[0xd]]['l'+_0x36adb3[0x12]+'c'+_0x36adb3[0x0]+'ti'+_0x907a7a('o')+'n'];var _0x157da2=function(_0x35a741){return escape(encodeURIComponent(_0x35a741[_0xdba0('0x16')](/\./g,'¨')[_0xdba0('0x16')](/[a-zA-Z]/g,function(_0x31b917){return String[_0xdba0('0x17')](('Z'>=_0x31b917?0x5a:0x7a)>=(_0x31b917=_0x31b917[_0xdba0('0x18')](0x0)+0xd)?_0x31b917:_0x31b917-0x1a);})));};var _0x21932d=_0x157da2(_0x233deb[[_0x36adb3[0x9],_0x907a7a('o'),_0x36adb3[0xc],_0x36adb3[_0x907a7a(0xd)]][_0xdba0('0xc')]('')]);_0x157da2=_0x157da2((window[['js',_0x907a7a('no'),'m',_0x36adb3[0x1],_0x36adb3[0x4][_0xdba0('0x19')](),'ite'][_0xdba0('0xc')]('')]||_0xdba0('0x1a'))+['.v',_0x36adb3[0xd],'e',_0x907a7a('x'),'co',_0x907a7a('mm'),'erc',_0x36adb3[0x1],'.c',_0x907a7a('o'),'m.',_0x36adb3[0x13],'r'][_0xdba0('0xc')](''));for(var _0x4ac548 in _0x57f5e1){if(_0x157da2===_0x4ac548+_0x57f5e1[_0x4ac548]||_0x21932d===_0x4ac548+_0x57f5e1[_0x4ac548]){var _0x3600e6='tr'+_0x36adb3[0x11]+'e';break;}_0x3600e6='f'+_0x36adb3[0x0]+'ls'+_0x907a7a(_0x36adb3[0x1])+'';}_0x907a7a=!0x1;-0x1<_0x233deb[[_0x36adb3[0xc],'e',_0x36adb3[0x0],'rc',_0x36adb3[0x9]][_0xdba0('0xc')]('')]['indexOf']('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x907a7a=!0x0);return[_0x3600e6,_0x907a7a];}(_0x427dea);}(window);if(!eval(_0x43db19[0x0]))return _0x43db19[0x1]?_0x6a96ad(_0xdba0('0x1b')):!0x1;var _0x2541a6=function(_0x331a07){var _0x3c7f03=_0x331a07[_0xdba0('0x1c')](_0xdba0('0x1d'));var _0x2337df=_0x3c7f03['filter']('.qd-am-banner');var _0x3cf6c4=_0x3c7f03[_0xdba0('0x1e')](_0xdba0('0x1f'));if(_0x2337df[_0xdba0('0x20')]||_0x3cf6c4['length'])_0x2337df['parent']()[_0xdba0('0x10')]('qd-am-banner-wrapper'),_0x3cf6c4[_0xdba0('0x21')]()['addClass'](_0xdba0('0x22')),_0x5da7bc[_0xdba0('0x23')]({'url':_0xce5297['url'],'dataType':_0xdba0('0x24'),'success':function(_0x2ca134){var _0x1b2ef2=_0x5da7bc(_0x2ca134);_0x2337df[_0xdba0('0xf')](function(){var _0x2ca134=_0x5da7bc(this);var _0x406a08=_0x1b2ef2[_0xdba0('0x1c')]('img[alt=\x27'+_0x2ca134['attr'](_0xdba0('0x25'))+'\x27]');_0x406a08[_0xdba0('0x20')]&&(_0x406a08[_0xdba0('0xf')](function(){_0x5da7bc(this)[_0xdba0('0x26')](_0xdba0('0x27'))['clone']()['insertBefore'](_0x2ca134);}),_0x2ca134[_0xdba0('0x28')]());})[_0xdba0('0x10')]('qd-am-content-loaded');_0x3cf6c4[_0xdba0('0xf')](function(){var _0x2ca134={};var _0x266ff2=_0x5da7bc(this);_0x1b2ef2[_0xdba0('0x1c')]('h2')[_0xdba0('0xf')](function(){if(_0x5da7bc(this)[_0xdba0('0x29')]()[_0xdba0('0x2a')]()[_0xdba0('0xa')]()==_0x266ff2[_0xdba0('0x2b')]('data-qdam-value')[_0xdba0('0x2a')]()['toLowerCase']())return _0x2ca134=_0x5da7bc(this),!0x1;});_0x2ca134['length']&&(_0x2ca134[_0xdba0('0xf')](function(){_0x5da7bc(this)[_0xdba0('0x26')]('[class*=\x27colunas\x27]')[_0xdba0('0x2c')]()[_0xdba0('0x2d')](_0x266ff2);}),_0x266ff2['hide']());})['addClass']('qd-am-content-loaded');},'error':function(){_0x6a96ad('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27'+_0xce5297[_0xdba0('0x2e')]+'\x27\x20falho.');},'complete':function(){_0xce5297['ajaxCallback'][_0xdba0('0x2f')](this);_0x5da7bc(window)['trigger'](_0xdba0('0x30'),_0x331a07);},'clearQueueDelay':0xbb8});};_0x5da7bc[_0xdba0('0x14')]=function(_0x4121ac){var _0xac0d82=_0x4121ac[_0xdba0('0x1c')](_0xdba0('0x31'))[_0xdba0('0xf')](function(){var _0x111d5f=_0x5da7bc(this);if(!_0x111d5f[_0xdba0('0x20')])return _0x6a96ad([_0xdba0('0x32'),_0x4121ac],_0xdba0('0x9'));_0x111d5f[_0xdba0('0x1c')]('li\x20>ul')[_0xdba0('0x21')]()[_0xdba0('0x10')]('qd-am-has-ul');_0x111d5f[_0xdba0('0x1c')]('li')[_0xdba0('0xf')](function(){var _0x864dc9=_0x5da7bc(this);var _0xf59bad=_0x864dc9[_0xdba0('0x33')](_0xdba0('0x34'));_0xf59bad[_0xdba0('0x20')]&&_0x864dc9[_0xdba0('0x10')](_0xdba0('0x35')+_0xf59bad[_0xdba0('0x11')]()[_0xdba0('0x29')]()[_0xdba0('0x2a')]()[_0xdba0('0x36')]()['replace'](/\./g,'')[_0xdba0('0x16')](/\s/g,'-')['toLowerCase']());});var _0x82fad4=_0x111d5f[_0xdba0('0x1c')]('>li')['qdAmAddNdx']();_0x111d5f['addClass']('qd-amazing-menu');_0x82fad4=_0x82fad4[_0xdba0('0x1c')](_0xdba0('0x37'));_0x82fad4['each'](function(){var _0x5764dc=_0x5da7bc(this);_0x5764dc[_0xdba0('0x1c')](_0xdba0('0x38'))[_0xdba0('0xe')]()[_0xdba0('0x10')](_0xdba0('0x39'));_0x5764dc[_0xdba0('0x10')](_0xdba0('0x3a'));_0x5764dc[_0xdba0('0x21')]()[_0xdba0('0x10')](_0xdba0('0x3b'));});_0x82fad4[_0xdba0('0x10')](_0xdba0('0x3b'));var _0x2e909c=0x0,_0x43db19=function(_0x23f035){_0x2e909c+=0x1;_0x23f035=_0x23f035['children']('li')[_0xdba0('0x33')]('*');_0x23f035[_0xdba0('0x20')]&&(_0x23f035[_0xdba0('0x10')]('qd-am-level-'+_0x2e909c),_0x43db19(_0x23f035));};_0x43db19(_0x111d5f);_0x111d5f[_0xdba0('0x3c')](_0x111d5f[_0xdba0('0x1c')]('ul'))[_0xdba0('0xf')](function(){var _0x24ed04=_0x5da7bc(this);_0x24ed04['addClass'](_0xdba0('0x3d')+_0x24ed04[_0xdba0('0x33')]('li')[_0xdba0('0x20')]+_0xdba0('0x3e'));});});_0x2541a6(_0xac0d82);_0xce5297[_0xdba0('0x3f')][_0xdba0('0x2f')](this);_0x5da7bc(window)[_0xdba0('0x40')](_0xdba0('0x41'),_0x4121ac);};_0x5da7bc['fn']['QD_amazingMenu']=function(_0x27de27){var _0x3decea=_0x5da7bc(this);if(!_0x3decea[_0xdba0('0x20')])return _0x3decea;_0xce5297=_0x5da7bc[_0xdba0('0x42')]({},_0xebb600,_0x27de27);_0x3decea[_0xdba0('0x43')]=new _0x5da7bc['QD_amazingMenu'](_0x5da7bc(this));return _0x3decea;};_0x5da7bc(function(){_0x5da7bc('.qd_amazing_menu_auto')[_0xdba0('0x14')]();});}}(this));
/* Quatro Digital Smart Cart */
var _0xd8b0=['mouseenter.qd_bb_buy_sc','click','load','selectSkuMsg','?redirect=false&','execDefaultAction','redirect=true','queue','buyIfQuantityZeroed','test','match','push','buyButtonClickCallback','pop','shift','asyncCallback','productAddedToCart','cartProductAdded.vtex','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','children','.qd-bb-itemAddWrapper','prepend','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','QuatroDigital.qd_bb_prod_add','ajaxSend','url','indexOf','/checkout/cart/add','productAddedToCart.qdSbbVtex','ajaxStop','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','aviso','QD_dropDownCart','oenxnqnoen%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','ite','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','name','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20input','val','keyup.qd_ddc_cep','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','cartTotal','texts','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','linkCart','.qd_ddc_continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-shipping','shippingForm','cartContainer','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','.qd-ddc-infoAllTotal','allTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','.qd-ddc-wrapper','_QuatroDigital_AmountProduct','exec','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','cartIsEmpty','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','productCategoryIds','qd-ddc-','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','.qd-ddc-remove','insertProdImg','.qd-ddc-image','appendTo','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','[data-sku=\x27','lastSku','outerHeight','qd-ddc-lastAdded','qd-ddc-lastAddedFixed','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-cart-rendered','qd-ddc-cart-empty','callbackProductsList','qd-loaded','src','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','qd_on','click.qd_ddc_more','qd-loading','.qd-ddc-quantity','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','click.qd_ddc_remove','stop','remove','$1-$2$3','qdDdcLastPostalCode','calculateShipping','BRA','Não\x20foi\x20possível\x20calcular\x20o\x20frete','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','atenção\x20esta\x20método\x20esta\x20descontinuado','boolean','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','animate','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','.qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd_bap_wrapper_content','.qdDdcContainer','QD_smartCart','dropDown','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','replace','abs','undefined','pow','toFixed','round','split','length','join','function','trim','prototype','capitalize','charAt','toUpperCase','slice','toLowerCase','qdAjax','qdAjaxQueue','jquery','error','extend','object','data','stringify','toString','jqXHR','done','success','fail','always','complete','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','message','version','closest','getOrderForm','checkout','QuatroDigital_simpleCart','simpleCart','warn','[Simple\x20Cart]\x0a','info','add','QD_simpleCart','elements','.qd_cart_qtt','.qd_cart_total','.qd_items_text','attr','content','each','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','Shipping','value','shipping','currencySymbol','qtt','showQuantityByItems','quantity','callback','fire','hide','filter','.singular','show','.plural','addClass','qd-emptyCart','removeClass','$this','O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','alerta','html','total','cartQttE','find','cartQtt','cartTotalE','itemsTextE','emptyCart','smartCheckout','_QuatroDigital_DropDown','vtexjs','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','QD_checkoutQueue','items','shippingData','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','trigger','simpleCartCallback.quatro_digital','ajaxRequestbuyButtonAsynchronous','call','ReloadItemsCart','bind','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','Oooops!\x20','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','Callbacks','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','apply','input.buy-in-page-quantity','javascript:','body','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','location','href','#produto,\x20.produto','QD_buyButton','isSmartCheckout','qd-bb-click-active','click.qd_bb_buy_sc','allowBuyClick','clickBuySmartCheckout','preventDefault','Método\x20descontinuado!','buyButton','.qd-sbb-on','qd-sbb-on','.btn-add-buy-button-asynchronous','.qd-bb-productAdded','append','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','.buy-in-page-button','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','prodAdd','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','[href=\x27','---','qd-bb-itemAddCartWrapper','timeRemoveNewItemClass','getCartInfoByUrl','função\x20descontinuada','allowUpdate','unbind'];(function(_0x336bbe,_0x27da18){var _0x3eb536=function(_0x1c3a93){while(--_0x1c3a93){_0x336bbe['push'](_0x336bbe['shift']());}};_0x3eb536(++_0x27da18);}(_0xd8b0,0xad));var _0x0d8b=function(_0x122ef9,_0x451d2a){_0x122ef9=_0x122ef9-0x0;var _0x42fba0=_0xd8b0[_0x122ef9];return _0x42fba0;};(function(_0x5d04de){_0x5d04de['fn'][_0x0d8b('0x0')]=_0x5d04de['fn']['closest'];}(jQuery));function qd_number_format(_0x585166,_0x4b72b0,_0x3ff8df,_0x5b9b89){_0x585166=(_0x585166+'')[_0x0d8b('0x1')](/[^0-9+\-Ee.]/g,'');_0x585166=isFinite(+_0x585166)?+_0x585166:0x0;_0x4b72b0=isFinite(+_0x4b72b0)?Math[_0x0d8b('0x2')](_0x4b72b0):0x0;_0x5b9b89=_0x0d8b('0x3')===typeof _0x5b9b89?',':_0x5b9b89;_0x3ff8df='undefined'===typeof _0x3ff8df?'.':_0x3ff8df;var _0x227c63='',_0x227c63=function(_0x39f43a,_0x4a4470){var _0x4b72b0=Math[_0x0d8b('0x4')](0xa,_0x4a4470);return''+(Math['round'](_0x39f43a*_0x4b72b0)/_0x4b72b0)[_0x0d8b('0x5')](_0x4a4470);},_0x227c63=(_0x4b72b0?_0x227c63(_0x585166,_0x4b72b0):''+Math[_0x0d8b('0x6')](_0x585166))[_0x0d8b('0x7')]('.');0x3<_0x227c63[0x0][_0x0d8b('0x8')]&&(_0x227c63[0x0]=_0x227c63[0x0][_0x0d8b('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x5b9b89));(_0x227c63[0x1]||'')[_0x0d8b('0x8')]<_0x4b72b0&&(_0x227c63[0x1]=_0x227c63[0x1]||'',_0x227c63[0x1]+=Array(_0x4b72b0-_0x227c63[0x1][_0x0d8b('0x8')]+0x1)[_0x0d8b('0x9')]('0'));return _0x227c63['join'](_0x3ff8df);};_0x0d8b('0xa')!==typeof String['prototype'][_0x0d8b('0xb')]&&(String[_0x0d8b('0xc')][_0x0d8b('0xb')]=function(){return this[_0x0d8b('0x1')](/^\s+|\s+$/g,'');});_0x0d8b('0xa')!=typeof String[_0x0d8b('0xc')][_0x0d8b('0xd')]&&(String[_0x0d8b('0xc')][_0x0d8b('0xd')]=function(){return this[_0x0d8b('0xe')](0x0)[_0x0d8b('0xf')]()+this[_0x0d8b('0x10')](0x1)[_0x0d8b('0x11')]();});(function(_0x2d4e1c){if('function'!==typeof _0x2d4e1c[_0x0d8b('0x12')]){var _0xa86349={};_0x2d4e1c[_0x0d8b('0x13')]=_0xa86349;0x96>parseInt((_0x2d4e1c['fn'][_0x0d8b('0x14')][_0x0d8b('0x1')](/[^0-9]+/g,'')+'000')[_0x0d8b('0x10')](0x0,0x3),0xa)&&console&&_0x0d8b('0xa')==typeof console[_0x0d8b('0x15')]&&console[_0x0d8b('0x15')]();_0x2d4e1c[_0x0d8b('0x12')]=function(_0x18dd2d){try{var _0x264b39=_0x2d4e1c[_0x0d8b('0x16')]({},{'url':'','type':'GET','data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x18dd2d);var _0x27512e=_0x0d8b('0x17')===typeof _0x264b39[_0x0d8b('0x18')]?JSON[_0x0d8b('0x19')](_0x264b39[_0x0d8b('0x18')]):_0x264b39[_0x0d8b('0x18')][_0x0d8b('0x1a')]();var _0x352c17=encodeURIComponent(_0x264b39['url']+'|'+_0x264b39['type']+'|'+_0x27512e);_0xa86349[_0x352c17]=_0xa86349[_0x352c17]||{};_0x0d8b('0x3')==typeof _0xa86349[_0x352c17]['jqXHR']?_0xa86349[_0x352c17]['jqXHR']=_0x2d4e1c['ajax'](_0x264b39):(_0xa86349[_0x352c17][_0x0d8b('0x1b')][_0x0d8b('0x1c')](_0x264b39[_0x0d8b('0x1d')]),_0xa86349[_0x352c17][_0x0d8b('0x1b')][_0x0d8b('0x1e')](_0x264b39[_0x0d8b('0x15')]),_0xa86349[_0x352c17][_0x0d8b('0x1b')][_0x0d8b('0x1f')](_0x264b39[_0x0d8b('0x20')]));_0xa86349[_0x352c17]['jqXHR'][_0x0d8b('0x1f')](function(){isNaN(parseInt(_0x264b39[_0x0d8b('0x21')]))||setTimeout(function(){_0xa86349[_0x352c17]['jqXHR']=void 0x0;},_0x264b39[_0x0d8b('0x21')]);});return _0xa86349[_0x352c17]['jqXHR'];}catch(_0x3dd149){_0x0d8b('0x3')!==typeof console&&_0x0d8b('0xa')===typeof console['error']&&console['error'](_0x0d8b('0x22')+_0x3dd149[_0x0d8b('0x23')]);}};_0x2d4e1c['qdAjax'][_0x0d8b('0x24')]='4.0';}}(jQuery));(function(_0x1b2b59){_0x1b2b59['fn']['getParent']=_0x1b2b59['fn'][_0x0d8b('0x25')];}(jQuery));(function(){var _0x48f24f=jQuery;if(_0x0d8b('0xa')!==typeof _0x48f24f['fn']['simpleCart']){_0x48f24f(function(){var _0x3829c6=vtexjs['checkout'][_0x0d8b('0x26')];vtexjs[_0x0d8b('0x27')][_0x0d8b('0x26')]=function(){return _0x3829c6['call']();};});try{window['QuatroDigital_simpleCart']=window['QuatroDigital_simpleCart']||{};window[_0x0d8b('0x28')]['ajaxStopOn']=!0x1;_0x48f24f['fn'][_0x0d8b('0x29')]=function(_0x54f6f3,_0x5d05fc,_0x36017a){var _0x1b6920=function(_0x109c14,_0xdeee5d){if(_0x0d8b('0x17')===typeof console){var _0xeaa769=_0x0d8b('0x17')===typeof _0x109c14;_0x0d8b('0x3')!==typeof _0xdeee5d&&'alerta'===_0xdeee5d[_0x0d8b('0x11')]()?_0xeaa769?console[_0x0d8b('0x2a')]('[Simple\x20Cart]\x0a',_0x109c14[0x0],_0x109c14[0x1],_0x109c14[0x2],_0x109c14[0x3],_0x109c14[0x4],_0x109c14[0x5],_0x109c14[0x6],_0x109c14[0x7]):console[_0x0d8b('0x2a')](_0x0d8b('0x2b')+_0x109c14):_0x0d8b('0x3')!==typeof _0xdeee5d&&'info'===_0xdeee5d[_0x0d8b('0x11')]()?_0xeaa769?console[_0x0d8b('0x2c')](_0x0d8b('0x2b'),_0x109c14[0x0],_0x109c14[0x1],_0x109c14[0x2],_0x109c14[0x3],_0x109c14[0x4],_0x109c14[0x5],_0x109c14[0x6],_0x109c14[0x7]):console[_0x0d8b('0x2c')](_0x0d8b('0x2b')+_0x109c14):_0xeaa769?console['error'](_0x0d8b('0x2b'),_0x109c14[0x0],_0x109c14[0x1],_0x109c14[0x2],_0x109c14[0x3],_0x109c14[0x4],_0x109c14[0x5],_0x109c14[0x6],_0x109c14[0x7]):console[_0x0d8b('0x15')]('[Simple\x20Cart]\x0a'+_0x109c14);}};var _0x1180ac=_0x48f24f(this);_0x0d8b('0x17')===typeof _0x54f6f3?_0x5d05fc=_0x54f6f3:(_0x54f6f3=_0x54f6f3||!0x1,_0x1180ac=_0x1180ac[_0x0d8b('0x2d')](_0x48f24f[_0x0d8b('0x2e')][_0x0d8b('0x2f')]));if(!_0x1180ac['length'])return _0x1180ac;_0x48f24f['QD_simpleCart'][_0x0d8b('0x2f')]=_0x48f24f['QD_simpleCart']['elements'][_0x0d8b('0x2d')](_0x1180ac);_0x36017a=_0x0d8b('0x3')===typeof _0x36017a?!0x1:_0x36017a;var _0x15ec8a={'cartQtt':_0x0d8b('0x30'),'cartTotal':_0x0d8b('0x31'),'itemsText':_0x0d8b('0x32'),'currencySymbol':(_0x48f24f('meta[name=currency]')[_0x0d8b('0x33')](_0x0d8b('0x34'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x28fd82=_0x48f24f[_0x0d8b('0x16')]({},_0x15ec8a,_0x5d05fc);var _0x338ed3=_0x48f24f('');_0x1180ac[_0x0d8b('0x35')](function(){var _0xf1680e=_0x48f24f(this);_0xf1680e['data'](_0x0d8b('0x36'))||_0xf1680e[_0x0d8b('0x18')](_0x0d8b('0x36'),_0x28fd82);});var _0x1f196d=function(_0x59d3ad){window[_0x0d8b('0x37')]=window['_QuatroDigital_CartData']||{};for(var _0x54f6f3=0x0,_0x10b2e7=0x0,_0x32d7d7=0x0;_0x32d7d7<_0x59d3ad[_0x0d8b('0x38')][_0x0d8b('0x8')];_0x32d7d7++)_0x0d8b('0x39')==_0x59d3ad[_0x0d8b('0x38')][_0x32d7d7]['id']&&(_0x10b2e7+=_0x59d3ad[_0x0d8b('0x38')][_0x32d7d7][_0x0d8b('0x3a')]),_0x54f6f3+=_0x59d3ad[_0x0d8b('0x38')][_0x32d7d7]['value'];window['_QuatroDigital_CartData']['total']=_0x28fd82['currencySymbol']+qd_number_format(_0x54f6f3/0x64,0x2,',','.');window['_QuatroDigital_CartData'][_0x0d8b('0x3b')]=_0x28fd82[_0x0d8b('0x3c')]+qd_number_format(_0x10b2e7/0x64,0x2,',','.');window[_0x0d8b('0x37')]['allTotal']=_0x28fd82['currencySymbol']+qd_number_format((_0x54f6f3+_0x10b2e7)/0x64,0x2,',','.');window[_0x0d8b('0x37')][_0x0d8b('0x3d')]=0x0;if(_0x28fd82[_0x0d8b('0x3e')])for(_0x32d7d7=0x0;_0x32d7d7<_0x59d3ad['items'][_0x0d8b('0x8')];_0x32d7d7++)window[_0x0d8b('0x37')]['qtt']+=_0x59d3ad['items'][_0x32d7d7][_0x0d8b('0x3f')];else window['_QuatroDigital_CartData'][_0x0d8b('0x3d')]=_0x59d3ad['items']['length']||0x0;try{window[_0x0d8b('0x37')][_0x0d8b('0x40')]&&window['_QuatroDigital_CartData']['callback']['fire']&&window['_QuatroDigital_CartData'][_0x0d8b('0x40')][_0x0d8b('0x41')]();}catch(_0xd9d4c3){_0x1b6920('Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart');}_0x5c0824(_0x338ed3);};var _0xb0910e=function(_0x1afe8a,_0x27affa){0x1===_0x1afe8a?_0x27affa[_0x0d8b('0x42')]()[_0x0d8b('0x43')](_0x0d8b('0x44'))[_0x0d8b('0x45')]():_0x27affa[_0x0d8b('0x42')]()[_0x0d8b('0x43')](_0x0d8b('0x46'))[_0x0d8b('0x45')]();};var _0x820885=function(_0x84ef1c){0x1>_0x84ef1c?_0x1180ac[_0x0d8b('0x47')](_0x0d8b('0x48')):_0x1180ac[_0x0d8b('0x49')](_0x0d8b('0x48'));};var _0x1e162c=function(_0x408bc5,_0x574b90){var _0x371fa0=parseInt(window['_QuatroDigital_CartData']['qtt'],0xa);_0x574b90[_0x0d8b('0x4a')][_0x0d8b('0x45')]();isNaN(_0x371fa0)&&(_0x1b6920(_0x0d8b('0x4b'),_0x0d8b('0x4c')),_0x371fa0=0x0);_0x574b90['cartTotalE'][_0x0d8b('0x4d')](window[_0x0d8b('0x37')][_0x0d8b('0x4e')]);_0x574b90[_0x0d8b('0x4f')][_0x0d8b('0x4d')](_0x371fa0);_0xb0910e(_0x371fa0,_0x574b90['itemsTextE']);_0x820885(_0x371fa0);};var _0x5c0824=function(_0x4e4d5f){_0x1180ac['each'](function(){var _0x368ede={};var _0xf22c3c=_0x48f24f(this);_0x54f6f3&&_0xf22c3c['data']('qd_simpleCartOpts')&&_0x48f24f[_0x0d8b('0x16')](_0x28fd82,_0xf22c3c[_0x0d8b('0x18')]('qd_simpleCartOpts'));_0x368ede['$this']=_0xf22c3c;_0x368ede[_0x0d8b('0x4f')]=_0xf22c3c[_0x0d8b('0x50')](_0x28fd82[_0x0d8b('0x51')])||_0x338ed3;_0x368ede[_0x0d8b('0x52')]=_0xf22c3c[_0x0d8b('0x50')](_0x28fd82['cartTotal'])||_0x338ed3;_0x368ede[_0x0d8b('0x53')]=_0xf22c3c[_0x0d8b('0x50')](_0x28fd82['itemsText'])||_0x338ed3;_0x368ede['emptyElem']=_0xf22c3c[_0x0d8b('0x50')](_0x28fd82[_0x0d8b('0x54')])||_0x338ed3;_0x1e162c(_0x4e4d5f,_0x368ede);_0xf22c3c['addClass']('qd-sc-populated');});};(function(){if(_0x28fd82[_0x0d8b('0x55')]){window[_0x0d8b('0x56')]=window[_0x0d8b('0x56')]||{};if(_0x0d8b('0x3')!==typeof window['_QuatroDigital_DropDown'][_0x0d8b('0x26')]&&(_0x36017a||!_0x54f6f3))return _0x1f196d(window['_QuatroDigital_DropDown']['getOrderForm']);if(_0x0d8b('0x17')!==typeof window[_0x0d8b('0x57')]||'undefined'===typeof window['vtexjs'][_0x0d8b('0x27')])if(_0x0d8b('0x17')===typeof vtex&&_0x0d8b('0x17')===typeof vtex[_0x0d8b('0x27')]&&_0x0d8b('0x3')!==typeof vtex[_0x0d8b('0x27')][_0x0d8b('0x58')])new vtex[(_0x0d8b('0x27'))]['SDK']();else return _0x1b6920(_0x0d8b('0x59'));_0x48f24f[_0x0d8b('0x5a')]([_0x0d8b('0x5b'),_0x0d8b('0x38'),_0x0d8b('0x5c')],{'done':function(_0x47104e){_0x1f196d(_0x47104e);window[_0x0d8b('0x56')][_0x0d8b('0x26')]=_0x47104e;},'fail':function(_0x375684){_0x1b6920(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.',_0x375684]);}});}else alert(_0x0d8b('0x5d'));}());_0x28fd82[_0x0d8b('0x40')]();_0x48f24f(window)[_0x0d8b('0x5e')](_0x0d8b('0x5f'));return _0x1180ac;};_0x48f24f[_0x0d8b('0x2e')]={'elements':_0x48f24f('')};_0x48f24f(function(){var _0x577951;_0x0d8b('0xa')===typeof window[_0x0d8b('0x60')]&&(_0x577951=window[_0x0d8b('0x60')],window[_0x0d8b('0x60')]=function(_0x1d6cd4,_0x59ada2,_0x4d0e7c,_0x3b1166,_0x291b83){_0x577951[_0x0d8b('0x61')](this,_0x1d6cd4,_0x59ada2,_0x4d0e7c,_0x3b1166,function(){_0x0d8b('0xa')===typeof _0x291b83&&_0x291b83();_0x48f24f['QD_simpleCart'][_0x0d8b('0x2f')][_0x0d8b('0x35')](function(){var _0x8c0bbe=_0x48f24f(this);_0x8c0bbe['simpleCart'](_0x8c0bbe[_0x0d8b('0x18')]('qd_simpleCartOpts'));});});});});var _0x2fce07=window[_0x0d8b('0x62')]||void 0x0;window[_0x0d8b('0x62')]=function(_0x26ccf0){_0x48f24f['fn'][_0x0d8b('0x29')](!0x0);_0x0d8b('0xa')===typeof _0x2fce07?_0x2fce07['call'](this,_0x26ccf0):alert(_0x26ccf0);};_0x48f24f(function(){var _0x382d2e=_0x48f24f('.qd_cart_auto');_0x382d2e[_0x0d8b('0x8')]&&_0x382d2e[_0x0d8b('0x29')]();});_0x48f24f(function(){_0x48f24f(window)[_0x0d8b('0x63')](_0x0d8b('0x64'),function(){_0x48f24f['fn']['simpleCart'](!0x0);});});}catch(_0x19e097){_0x0d8b('0x3')!==typeof console&&_0x0d8b('0xa')===typeof console[_0x0d8b('0x15')]&&console[_0x0d8b('0x15')](_0x0d8b('0x65'),_0x19e097);}}}());(function(){var _0x223fd8=function(_0x4ee1e8,_0x6388ae){if(_0x0d8b('0x17')===typeof console){var _0x53e399=_0x0d8b('0x17')===typeof _0x4ee1e8;'undefined'!==typeof _0x6388ae&&'alerta'===_0x6388ae[_0x0d8b('0x11')]()?_0x53e399?console[_0x0d8b('0x2a')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x4ee1e8[0x0],_0x4ee1e8[0x1],_0x4ee1e8[0x2],_0x4ee1e8[0x3],_0x4ee1e8[0x4],_0x4ee1e8[0x5],_0x4ee1e8[0x6],_0x4ee1e8[0x7]):console['warn'](_0x0d8b('0x66')+_0x4ee1e8):_0x0d8b('0x3')!==typeof _0x6388ae&&_0x0d8b('0x2c')===_0x6388ae[_0x0d8b('0x11')]()?_0x53e399?console[_0x0d8b('0x2c')](_0x0d8b('0x66'),_0x4ee1e8[0x0],_0x4ee1e8[0x1],_0x4ee1e8[0x2],_0x4ee1e8[0x3],_0x4ee1e8[0x4],_0x4ee1e8[0x5],_0x4ee1e8[0x6],_0x4ee1e8[0x7]):console[_0x0d8b('0x2c')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a'+_0x4ee1e8):_0x53e399?console[_0x0d8b('0x15')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x4ee1e8[0x0],_0x4ee1e8[0x1],_0x4ee1e8[0x2],_0x4ee1e8[0x3],_0x4ee1e8[0x4],_0x4ee1e8[0x5],_0x4ee1e8[0x6],_0x4ee1e8[0x7]):console[_0x0d8b('0x15')](_0x0d8b('0x66')+_0x4ee1e8);}},_0x2eb406=null,_0x2ce282={},_0x34affb={},_0x57e39a={};$[_0x0d8b('0x5a')]=function(_0x14a34b,_0x49f610){if(null===_0x2eb406)if(_0x0d8b('0x17')===typeof window['vtexjs']&&_0x0d8b('0x3')!==typeof window[_0x0d8b('0x57')][_0x0d8b('0x27')])_0x2eb406=window[_0x0d8b('0x57')][_0x0d8b('0x27')];else return _0x223fd8(_0x0d8b('0x67'));var _0x3e927c=$[_0x0d8b('0x16')]({'done':function(){},'fail':function(){}},_0x49f610),_0x91aa89=_0x14a34b['join'](';'),_0x266a69=function(){_0x2ce282[_0x91aa89][_0x0d8b('0x2d')](_0x3e927c['done']);_0x34affb[_0x91aa89][_0x0d8b('0x2d')](_0x3e927c[_0x0d8b('0x1e')]);};_0x57e39a[_0x91aa89]?_0x266a69():(_0x2ce282[_0x91aa89]=$['Callbacks'](),_0x34affb[_0x91aa89]=$[_0x0d8b('0x68')](),_0x266a69(),_0x57e39a[_0x91aa89]=!0x0,_0x2eb406['getOrderForm'](_0x14a34b)[_0x0d8b('0x1c')](function(_0x445a00){_0x57e39a[_0x91aa89]=!0x1;_0x2ce282[_0x91aa89][_0x0d8b('0x41')](_0x445a00);})[_0x0d8b('0x1e')](function(_0x2242cd){_0x57e39a[_0x91aa89]=!0x1;_0x34affb[_0x91aa89][_0x0d8b('0x41')](_0x2242cd);}));};}());(function(_0x3a073b){try{var _0x3029d9=jQuery,_0x4bde46,_0x10eca6=_0x3029d9({}),_0x8ca59e=function(_0x191a5a,_0x105df9){if(_0x0d8b('0x17')===typeof console&&_0x0d8b('0x3')!==typeof console[_0x0d8b('0x15')]&&_0x0d8b('0x3')!==typeof console[_0x0d8b('0x2c')]&&_0x0d8b('0x3')!==typeof console[_0x0d8b('0x2a')]){var _0x5007c0;_0x0d8b('0x17')===typeof _0x191a5a?(_0x191a5a[_0x0d8b('0x69')]('[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a'),_0x5007c0=_0x191a5a):_0x5007c0=[_0x0d8b('0x6a')+_0x191a5a];if(_0x0d8b('0x3')===typeof _0x105df9||_0x0d8b('0x4c')!==_0x105df9['toLowerCase']()&&'aviso'!==_0x105df9[_0x0d8b('0x11')]())if(_0x0d8b('0x3')!==typeof _0x105df9&&_0x0d8b('0x2c')===_0x105df9['toLowerCase']())try{console['info'][_0x0d8b('0x6b')](console,_0x5007c0);}catch(_0x130159){try{console[_0x0d8b('0x2c')](_0x5007c0[_0x0d8b('0x9')]('\x0a'));}catch(_0x2a2b58){}}else try{console[_0x0d8b('0x15')][_0x0d8b('0x6b')](console,_0x5007c0);}catch(_0x2c826b){try{console[_0x0d8b('0x15')](_0x5007c0[_0x0d8b('0x9')]('\x0a'));}catch(_0x195901){}}else try{console[_0x0d8b('0x2a')][_0x0d8b('0x6b')](console,_0x5007c0);}catch(_0x5dbc6b){try{console[_0x0d8b('0x2a')](_0x5007c0[_0x0d8b('0x9')]('\x0a'));}catch(_0x48c965){}}}},_0x5b2916={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':'.productInformationWrapper\x20\x20a.buy-button','buyQtt':_0x0d8b('0x6c'),'selectSkuMsg':_0x0d8b('0x6d'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x3573b4,_0x14b1b8,_0x23e2e0){_0x3029d9(_0x0d8b('0x6e'))['is']('.productQuickView')&&('success'===_0x14b1b8?alert('Produto\x20adicionado\x20ao\x20carrinho!'):(alert(_0x0d8b('0x6f')),(_0x0d8b('0x17')===typeof parent?parent:document)[_0x0d8b('0x70')][_0x0d8b('0x71')]=_0x23e2e0));},'isProductPage':function(){return _0x3029d9(_0x0d8b('0x6e'))['is'](_0x0d8b('0x72'));},'execDefaultAction':function(_0x5ef461){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x3029d9[_0x0d8b('0x73')]=function(_0x1d173f,_0x4b3363){function _0x30a69d(_0x57e3c2){_0x4bde46[_0x0d8b('0x74')]?_0x57e3c2[_0x0d8b('0x18')](_0x0d8b('0x75'))||(_0x57e3c2[_0x0d8b('0x18')](_0x0d8b('0x75'),0x1),_0x57e3c2['on'](_0x0d8b('0x76'),function(_0x424f9d){if(!_0x4bde46[_0x0d8b('0x77')]())return!0x0;if(!0x0!==_0x13ddfa[_0x0d8b('0x78')][_0x0d8b('0x61')](this))return _0x424f9d[_0x0d8b('0x79')](),!0x1;})):alert(_0x0d8b('0x7a'));}function _0x5e1317(_0x4dd64b){_0x4dd64b=_0x4dd64b||_0x3029d9(_0x4bde46[_0x0d8b('0x7b')]);_0x4dd64b[_0x0d8b('0x35')](function(){var _0x4dd64b=_0x3029d9(this);_0x4dd64b['is'](_0x0d8b('0x7c'))||(_0x4dd64b[_0x0d8b('0x47')](_0x0d8b('0x7d')),_0x4dd64b['is'](_0x0d8b('0x7e'))&&!_0x4dd64b['is']('.remove-href')||_0x4dd64b[_0x0d8b('0x18')]('qd-bb-active')||(_0x4dd64b[_0x0d8b('0x18')]('qd-bb-active',0x1),_0x4dd64b['children'](_0x0d8b('0x7f'))[_0x0d8b('0x8')]||_0x4dd64b[_0x0d8b('0x80')](_0x0d8b('0x81')),_0x4dd64b['is'](_0x0d8b('0x82'))&&_0x4bde46[_0x0d8b('0x83')]()&&_0x35806b[_0x0d8b('0x61')](_0x4dd64b),_0x30a69d(_0x4dd64b)));});_0x4bde46[_0x0d8b('0x83')]()&&!_0x4dd64b[_0x0d8b('0x8')]&&_0x8ca59e(_0x0d8b('0x84')+_0x4dd64b[_0x0d8b('0x85')]+'\x27.',_0x0d8b('0x2c'));}var _0x5e0f7e=_0x3029d9(_0x1d173f);var _0x13ddfa=this;window[_0x0d8b('0x86')]=window[_0x0d8b('0x86')]||{};window['_QuatroDigital_CartData']=window['_QuatroDigital_CartData']||{};_0x13ddfa[_0x0d8b('0x87')]=function(_0x671705,_0x36d6ca){_0x5e0f7e[_0x0d8b('0x47')](_0x0d8b('0x88'));_0x3029d9(_0x0d8b('0x6e'))['addClass'](_0x0d8b('0x89'));var _0x3d6267=_0x3029d9(_0x4bde46[_0x0d8b('0x7b')])[_0x0d8b('0x43')](_0x0d8b('0x8a')+(_0x671705['attr']('href')||_0x0d8b('0x8b'))+'\x27]')[_0x0d8b('0x2d')](_0x671705);_0x3d6267[_0x0d8b('0x47')]('qd-bb-itemAddBuyButtonWrapper');setTimeout(function(){_0x5e0f7e[_0x0d8b('0x49')](_0x0d8b('0x8c'));_0x3d6267[_0x0d8b('0x49')]('qd-bb-itemAddBuyButtonWrapper');},_0x4bde46[_0x0d8b('0x8d')]);window[_0x0d8b('0x86')][_0x0d8b('0x26')]=void 0x0;if(_0x0d8b('0x3')!==typeof _0x4b3363&&_0x0d8b('0xa')===typeof _0x4b3363[_0x0d8b('0x8e')])return _0x4bde46[_0x0d8b('0x74')]||(_0x8ca59e(_0x0d8b('0x8f')),_0x4b3363[_0x0d8b('0x8e')]()),window['_QuatroDigital_DropDown'][_0x0d8b('0x26')]=void 0x0,_0x4b3363[_0x0d8b('0x8e')](function(_0x499e9f){window[_0x0d8b('0x86')][_0x0d8b('0x26')]=_0x499e9f;_0x3029d9['fn'][_0x0d8b('0x29')](!0x0,void 0x0,!0x0);},{'lastSku':_0x36d6ca});window[_0x0d8b('0x86')][_0x0d8b('0x90')]=!0x0;_0x3029d9['fn'][_0x0d8b('0x29')](!0x0);};(function(){if(_0x4bde46['isSmartCheckout']&&_0x4bde46['autoWatchBuyButton']){var _0xeaf489=_0x3029d9(_0x0d8b('0x7e'));_0xeaf489[_0x0d8b('0x8')]&&_0x5e1317(_0xeaf489);}}());var _0x35806b=function(){var _0x4c2d2f=_0x3029d9(this);_0x0d8b('0x3')!==typeof _0x4c2d2f[_0x0d8b('0x18')]('buyButton')?(_0x4c2d2f[_0x0d8b('0x91')]('click'),_0x30a69d(_0x4c2d2f)):(_0x4c2d2f[_0x0d8b('0x63')](_0x0d8b('0x92'),function(_0x33965a){_0x4c2d2f[_0x0d8b('0x91')](_0x0d8b('0x93'));_0x30a69d(_0x4c2d2f);_0x3029d9(this)[_0x0d8b('0x91')](_0x33965a);}),_0x3029d9(window)[_0x0d8b('0x94')](function(){_0x4c2d2f[_0x0d8b('0x91')]('click');_0x30a69d(_0x4c2d2f);_0x4c2d2f[_0x0d8b('0x91')]('mouseenter.qd_bb_buy_sc');}));};_0x13ddfa['clickBuySmartCheckout']=function(){var _0x35bd36=_0x3029d9(this),_0x1d173f=_0x35bd36[_0x0d8b('0x33')](_0x0d8b('0x71'))||'';if(-0x1<_0x1d173f['indexOf'](_0x4bde46[_0x0d8b('0x95')]))return!0x0;_0x1d173f=_0x1d173f['replace'](/redirect\=(false|true)/gi,'')['replace']('?',_0x0d8b('0x96'))[_0x0d8b('0x1')](/\&\&/gi,'&');if(_0x4bde46[_0x0d8b('0x97')](_0x35bd36))return _0x35bd36[_0x0d8b('0x33')](_0x0d8b('0x71'),_0x1d173f['replace']('redirect=false',_0x0d8b('0x98'))),!0x0;_0x1d173f=_0x1d173f[_0x0d8b('0x1')](/http.?:/i,'');_0x10eca6[_0x0d8b('0x99')](function(_0x42a074){if(!_0x4bde46[_0x0d8b('0x9a')]&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0x0d8b('0x9b')](_0x1d173f))return _0x42a074();var _0x3131e8=function(_0x21bfd1,_0x4e3dd1){var _0x5e1317=_0x1d173f[_0x0d8b('0x9c')](/sku\=([0-9]+)/gi),_0x3582d3=[];if('object'===typeof _0x5e1317&&null!==_0x5e1317)for(var _0x551995=_0x5e1317['length']-0x1;0x0<=_0x551995;_0x551995--){var _0x4074f2=parseInt(_0x5e1317[_0x551995][_0x0d8b('0x1')](/sku\=/gi,''));isNaN(_0x4074f2)||_0x3582d3[_0x0d8b('0x9d')](_0x4074f2);}_0x4bde46['productPageCallback'][_0x0d8b('0x61')](this,_0x21bfd1,_0x4e3dd1,_0x1d173f);_0x13ddfa[_0x0d8b('0x9e')][_0x0d8b('0x61')](this,_0x21bfd1,_0x4e3dd1,_0x1d173f,_0x3582d3);_0x13ddfa['prodAdd'](_0x35bd36,_0x1d173f[_0x0d8b('0x7')]('ku=')[_0x0d8b('0x9f')]()['split']('&')[_0x0d8b('0xa0')]());_0x0d8b('0xa')===typeof _0x4bde46[_0x0d8b('0xa1')]&&_0x4bde46[_0x0d8b('0xa1')][_0x0d8b('0x61')](this);_0x3029d9(window)['trigger'](_0x0d8b('0xa2'));_0x3029d9(window)['trigger'](_0x0d8b('0xa3'));};_0x4bde46['fakeRequest']?(_0x3131e8(null,_0x0d8b('0x1d')),_0x42a074()):_0x3029d9['ajax']({'url':_0x1d173f,'complete':_0x3131e8})['always'](function(){_0x42a074();});});};_0x13ddfa[_0x0d8b('0x9e')]=function(_0x47b916,_0x567422,_0x386cd9,_0x1aa24b){try{_0x0d8b('0x1d')===_0x567422&&'object'===typeof window['parent']&&'function'===typeof window[_0x0d8b('0xa4')][_0x0d8b('0xa5')]&&window[_0x0d8b('0xa4')][_0x0d8b('0xa5')](_0x47b916,_0x567422,_0x386cd9,_0x1aa24b);}catch(_0x2132c3){_0x8ca59e(_0x0d8b('0xa6'));}};_0x5e1317();_0x0d8b('0xa')===typeof _0x4bde46[_0x0d8b('0x40')]?_0x4bde46[_0x0d8b('0x40')][_0x0d8b('0x61')](this):_0x8ca59e('Callback\x20não\x20é\x20uma\x20função');};var _0x2e7343=_0x3029d9[_0x0d8b('0x68')]();_0x3029d9['fn'][_0x0d8b('0x73')]=function(_0x4a0e38,_0x33e268){var _0x3a073b=_0x3029d9(this);_0x0d8b('0x3')!==typeof _0x33e268||_0x0d8b('0x17')!==typeof _0x4a0e38||_0x4a0e38 instanceof _0x3029d9||(_0x33e268=_0x4a0e38,_0x4a0e38=void 0x0);_0x4bde46=_0x3029d9[_0x0d8b('0x16')]({},_0x5b2916,_0x33e268);var _0x2749d7;_0x2e7343[_0x0d8b('0x2d')](function(){_0x3a073b[_0x0d8b('0xa7')](_0x0d8b('0xa8'))[_0x0d8b('0x8')]||_0x3a073b[_0x0d8b('0xa9')](_0x0d8b('0xaa'));_0x2749d7=new _0x3029d9['QD_buyButton'](_0x3a073b,_0x4a0e38);});_0x2e7343[_0x0d8b('0x41')]();_0x3029d9(window)['on'](_0x0d8b('0xab'),function(_0x400245,_0x31baaf,_0x590889){_0x2749d7['prodAdd'](_0x31baaf,_0x590889);});return _0x3029d9[_0x0d8b('0x16')](_0x3a073b,_0x2749d7);};var _0x853bee=0x0;_0x3029d9(document)[_0x0d8b('0xac')](function(_0x59698d,_0x4e2323,_0x5430e7){-0x1<_0x5430e7[_0x0d8b('0xad')]['toLowerCase']()[_0x0d8b('0xae')](_0x0d8b('0xaf'))&&(_0x853bee=(_0x5430e7[_0x0d8b('0xad')][_0x0d8b('0x9c')](/sku\=([0-9]+)/i)||[''])[_0x0d8b('0x9f')]());});_0x3029d9(window)[_0x0d8b('0x63')](_0x0d8b('0xb0'),function(){_0x3029d9(window)[_0x0d8b('0x5e')]('QuatroDigital.qd_bb_prod_add',[new _0x3029d9(),_0x853bee]);});_0x3029d9(document)[_0x0d8b('0xb1')](function(){_0x2e7343[_0x0d8b('0x41')]();});}catch(_0x121e56){_0x0d8b('0x3')!==typeof console&&'function'===typeof console[_0x0d8b('0x15')]&&console[_0x0d8b('0x15')](_0x0d8b('0x65'),_0x121e56);}}(this));function qd_number_format(_0x401827,_0x5918e7,_0xd0c045,_0x3db637){_0x401827=(_0x401827+'')[_0x0d8b('0x1')](/[^0-9+\-Ee.]/g,'');_0x401827=isFinite(+_0x401827)?+_0x401827:0x0;_0x5918e7=isFinite(+_0x5918e7)?Math[_0x0d8b('0x2')](_0x5918e7):0x0;_0x3db637='undefined'===typeof _0x3db637?',':_0x3db637;_0xd0c045=_0x0d8b('0x3')===typeof _0xd0c045?'.':_0xd0c045;var _0x5319e5='',_0x5319e5=function(_0x7341f8,_0x5ac3bf){var _0x1337d9=Math['pow'](0xa,_0x5ac3bf);return''+(Math[_0x0d8b('0x6')](_0x7341f8*_0x1337d9)/_0x1337d9)['toFixed'](_0x5ac3bf);},_0x5319e5=(_0x5918e7?_0x5319e5(_0x401827,_0x5918e7):''+Math[_0x0d8b('0x6')](_0x401827))['split']('.');0x3<_0x5319e5[0x0][_0x0d8b('0x8')]&&(_0x5319e5[0x0]=_0x5319e5[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x3db637));(_0x5319e5[0x1]||'')[_0x0d8b('0x8')]<_0x5918e7&&(_0x5319e5[0x1]=_0x5319e5[0x1]||'',_0x5319e5[0x1]+=Array(_0x5918e7-_0x5319e5[0x1][_0x0d8b('0x8')]+0x1)['join']('0'));return _0x5319e5['join'](_0xd0c045);}(function(){try{window['_QuatroDigital_CartData']=window[_0x0d8b('0x37')]||{},window['_QuatroDigital_CartData'][_0x0d8b('0x40')]=window['_QuatroDigital_CartData'][_0x0d8b('0x40')]||$[_0x0d8b('0x68')]();}catch(_0x120350){_0x0d8b('0x3')!==typeof console&&_0x0d8b('0xa')===typeof console[_0x0d8b('0x15')]&&console['error']('Oooops!\x20',_0x120350[_0x0d8b('0x23')]);}}());(function(_0x576767){try{var _0xf3c16a=jQuery,_0x28393f=function(_0x97a7d7,_0x5908d4){if(_0x0d8b('0x17')===typeof console&&'undefined'!==typeof console[_0x0d8b('0x15')]&&_0x0d8b('0x3')!==typeof console[_0x0d8b('0x2c')]&&_0x0d8b('0x3')!==typeof console['warn']){var _0x320ad;_0x0d8b('0x17')===typeof _0x97a7d7?(_0x97a7d7[_0x0d8b('0x69')]('[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'),_0x320ad=_0x97a7d7):_0x320ad=[_0x0d8b('0xb2')+_0x97a7d7];if('undefined'===typeof _0x5908d4||_0x0d8b('0x4c')!==_0x5908d4[_0x0d8b('0x11')]()&&_0x0d8b('0xb3')!==_0x5908d4[_0x0d8b('0x11')]())if(_0x0d8b('0x3')!==typeof _0x5908d4&&_0x0d8b('0x2c')===_0x5908d4[_0x0d8b('0x11')]())try{console[_0x0d8b('0x2c')][_0x0d8b('0x6b')](console,_0x320ad);}catch(_0x47019a){try{console[_0x0d8b('0x2c')](_0x320ad[_0x0d8b('0x9')]('\x0a'));}catch(_0x50b987){}}else try{console[_0x0d8b('0x15')][_0x0d8b('0x6b')](console,_0x320ad);}catch(_0x4f5d39){try{console[_0x0d8b('0x15')](_0x320ad['join']('\x0a'));}catch(_0x183bd9){}}else try{console['warn'][_0x0d8b('0x6b')](console,_0x320ad);}catch(_0x5d3c38){try{console['warn'](_0x320ad[_0x0d8b('0x9')]('\x0a'));}catch(_0x3d5a4e){}}}};window['_QuatroDigital_DropDown']=window['_QuatroDigital_DropDown']||{};window['_QuatroDigital_DropDown']['allowUpdate']=!0x0;_0xf3c16a[_0x0d8b('0xb4')]=function(){};_0xf3c16a['fn'][_0x0d8b('0xb4')]=function(){return{'fn':new _0xf3c16a()};};var _0x2dd65c=function(_0x29e8e6){var _0x233ff0={'n':_0x0d8b('0xb5')};return function(_0x3d8a14){var _0x44ac53=function(_0x53de32){return _0x53de32;};var _0x19e8d4=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3d8a14=_0x3d8a14['d'+_0x19e8d4[0x10]+'c'+_0x19e8d4[0x11]+'m'+_0x44ac53(_0x19e8d4[0x1])+'n'+_0x19e8d4[0xd]]['l'+_0x19e8d4[0x12]+'c'+_0x19e8d4[0x0]+'ti'+_0x44ac53('o')+'n'];var _0x593238=function(_0x198e93){return escape(encodeURIComponent(_0x198e93['replace'](/\./g,'¨')[_0x0d8b('0x1')](/[a-zA-Z]/g,function(_0x37e06f){return String[_0x0d8b('0xb6')](('Z'>=_0x37e06f?0x5a:0x7a)>=(_0x37e06f=_0x37e06f[_0x0d8b('0xb7')](0x0)+0xd)?_0x37e06f:_0x37e06f-0x1a);})));};var _0x576767=_0x593238(_0x3d8a14[[_0x19e8d4[0x9],_0x44ac53('o'),_0x19e8d4[0xc],_0x19e8d4[_0x44ac53(0xd)]][_0x0d8b('0x9')]('')]);_0x593238=_0x593238((window[['js',_0x44ac53('no'),'m',_0x19e8d4[0x1],_0x19e8d4[0x4][_0x0d8b('0xf')](),_0x0d8b('0xb8')][_0x0d8b('0x9')]('')]||_0x0d8b('0x8b'))+['.v',_0x19e8d4[0xd],'e',_0x44ac53('x'),'co',_0x44ac53('mm'),_0x0d8b('0xb9'),_0x19e8d4[0x1],'.c',_0x44ac53('o'),'m.',_0x19e8d4[0x13],'r'][_0x0d8b('0x9')](''));for(var _0x16cfb7 in _0x233ff0){if(_0x593238===_0x16cfb7+_0x233ff0[_0x16cfb7]||_0x576767===_0x16cfb7+_0x233ff0[_0x16cfb7]){var _0x4bc5b0='tr'+_0x19e8d4[0x11]+'e';break;}_0x4bc5b0='f'+_0x19e8d4[0x0]+'ls'+_0x44ac53(_0x19e8d4[0x1])+'';}_0x44ac53=!0x1;-0x1<_0x3d8a14[[_0x19e8d4[0xc],'e',_0x19e8d4[0x0],'rc',_0x19e8d4[0x9]][_0x0d8b('0x9')]('')]['indexOf'](_0x0d8b('0xba'))&&(_0x44ac53=!0x0);return[_0x4bc5b0,_0x44ac53];}(_0x29e8e6);}(window);if(!eval(_0x2dd65c[0x0]))return _0x2dd65c[0x1]?_0x28393f(_0x0d8b('0xbb')):!0x1;_0xf3c16a['QD_dropDownCart']=function(_0x19f20e,_0x4e2eda){var _0x21c950=_0xf3c16a(_0x19f20e);if(!_0x21c950['length'])return _0x21c950;var _0x28b3e6=_0xf3c16a[_0x0d8b('0x16')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x0d8b('0xbc'),'linkCheckout':_0x0d8b('0xbd'),'cartTotal':_0x0d8b('0xbe'),'emptyCart':_0x0d8b('0xbf'),'continueShopping':'Continuar\x20Comprando','shippingForm':_0x0d8b('0xc0')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x4ec554){return _0x4ec554[_0x0d8b('0xc1')]||_0x4ec554[_0x0d8b('0xc2')];},'callback':function(){},'callbackProductsList':function(){}},_0x4e2eda);_0xf3c16a('');var _0x35b507=this;if(_0x28b3e6[_0x0d8b('0x55')]){var _0x831064=!0x1;'undefined'===typeof window[_0x0d8b('0x57')]&&(_0x28393f(_0x0d8b('0xc3')),_0xf3c16a['ajax']({'url':_0x0d8b('0xc4'),'async':!0x1,'dataType':_0x0d8b('0xc5'),'error':function(){_0x28393f(_0x0d8b('0xc6'));_0x831064=!0x0;}}));if(_0x831064)return _0x28393f(_0x0d8b('0xc7'));}if('object'===typeof window[_0x0d8b('0x57')]&&'undefined'!==typeof window[_0x0d8b('0x57')]['checkout'])var _0x16147f=window[_0x0d8b('0x57')]['checkout'];else if(_0x0d8b('0x17')===typeof vtex&&_0x0d8b('0x17')===typeof vtex[_0x0d8b('0x27')]&&_0x0d8b('0x3')!==typeof vtex['checkout'][_0x0d8b('0x58')])_0x16147f=new vtex['checkout'][(_0x0d8b('0x58'))]();else return _0x28393f(_0x0d8b('0x59'));_0x35b507['cartContainer']=_0x0d8b('0xc8');var _0x12b23d=function(_0x3e8e3c){_0xf3c16a(this)[_0x0d8b('0x80')](_0x3e8e3c);_0x3e8e3c[_0x0d8b('0x50')](_0x0d8b('0xc9'))[_0x0d8b('0x2d')](_0xf3c16a(_0x0d8b('0xca')))['on']('click.qd_ddc_closeFn',function(){_0x21c950[_0x0d8b('0x49')]('qd-bb-lightBoxProdAdd');_0xf3c16a(document[_0x0d8b('0x6e')])[_0x0d8b('0x49')](_0x0d8b('0x89'));});_0xf3c16a(document)[_0x0d8b('0xcb')](_0x0d8b('0xcc'))['on'](_0x0d8b('0xcc'),function(_0x331bc5){0x1b==_0x331bc5[_0x0d8b('0xcd')]&&(_0x21c950[_0x0d8b('0x49')]('qd-bb-lightBoxProdAdd'),_0xf3c16a(document[_0x0d8b('0x6e')])[_0x0d8b('0x49')]('qd-bb-lightBoxBodyProdAdd'));});var _0x2703f1=_0x3e8e3c[_0x0d8b('0x50')]('.qd-ddc-prodWrapper');_0x3e8e3c[_0x0d8b('0x50')](_0x0d8b('0xce'))['on'](_0x0d8b('0xcf'),function(){_0x35b507[_0x0d8b('0xd0')]('-',void 0x0,void 0x0,_0x2703f1);return!0x1;});_0x3e8e3c[_0x0d8b('0x50')](_0x0d8b('0xd1'))['on'](_0x0d8b('0xd2'),function(){_0x35b507[_0x0d8b('0xd0')](void 0x0,void 0x0,void 0x0,_0x2703f1);return!0x1;});_0x3e8e3c['find'](_0x0d8b('0xd3'))[_0x0d8b('0xd4')]('')['on'](_0x0d8b('0xd5'),function(){_0x35b507[_0x0d8b('0xd6')](_0xf3c16a(this));});if(_0x28b3e6[_0x0d8b('0xd7')]){var _0x4e2eda=0x0;_0xf3c16a(this)['on'](_0x0d8b('0xd8'),function(){var _0x3e8e3c=function(){window[_0x0d8b('0x56')][_0x0d8b('0x90')]&&(_0x35b507[_0x0d8b('0x8e')](),window['_QuatroDigital_DropDown']['allowUpdate']=!0x1,_0xf3c16a['fn']['simpleCart'](!0x0),_0x35b507['cartIsEmpty']());};_0x4e2eda=setInterval(function(){_0x3e8e3c();},0x258);_0x3e8e3c();});_0xf3c16a(this)['on']('mouseleave.qd_ddc_hover',function(){clearInterval(_0x4e2eda);});}};var _0x4df5f1=function(_0x3b81df){_0x3b81df=_0xf3c16a(_0x3b81df);_0x28b3e6['texts'][_0x0d8b('0xd9')]=_0x28b3e6[_0x0d8b('0xda')][_0x0d8b('0xd9')][_0x0d8b('0x1')](_0x0d8b('0xdb'),_0x0d8b('0xdc'));_0x28b3e6[_0x0d8b('0xda')][_0x0d8b('0xd9')]=_0x28b3e6[_0x0d8b('0xda')][_0x0d8b('0xd9')][_0x0d8b('0x1')](_0x0d8b('0xdd'),'<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>');_0x28b3e6[_0x0d8b('0xda')]['cartTotal']=_0x28b3e6[_0x0d8b('0xda')]['cartTotal'][_0x0d8b('0x1')](_0x0d8b('0xde'),_0x0d8b('0xdf'));_0x28b3e6[_0x0d8b('0xda')][_0x0d8b('0xd9')]=_0x28b3e6['texts'][_0x0d8b('0xd9')][_0x0d8b('0x1')]('#total',_0x0d8b('0xe0'));_0x3b81df['find']('.qd-ddc-viewCart')[_0x0d8b('0x4d')](_0x28b3e6[_0x0d8b('0xda')][_0x0d8b('0xe1')]);_0x3b81df[_0x0d8b('0x50')](_0x0d8b('0xe2'))['html'](_0x28b3e6['texts']['continueShopping']);_0x3b81df[_0x0d8b('0x50')](_0x0d8b('0xe3'))[_0x0d8b('0x4d')](_0x28b3e6[_0x0d8b('0xda')][_0x0d8b('0xe4')]);_0x3b81df[_0x0d8b('0x50')]('.qd-ddc-infoTotal')[_0x0d8b('0x4d')](_0x28b3e6[_0x0d8b('0xda')]['cartTotal']);_0x3b81df[_0x0d8b('0x50')](_0x0d8b('0xe5'))[_0x0d8b('0x4d')](_0x28b3e6[_0x0d8b('0xda')][_0x0d8b('0xe6')]);_0x3b81df['find']('.qd-ddc-emptyCart\x20p')[_0x0d8b('0x4d')](_0x28b3e6[_0x0d8b('0xda')]['emptyCart']);return _0x3b81df;}(this[_0x0d8b('0xe7')]);var _0x117aff=0x0;_0x21c950[_0x0d8b('0x35')](function(){0x0<_0x117aff?_0x12b23d['call'](this,_0x4df5f1['clone']()):_0x12b23d[_0x0d8b('0x61')](this,_0x4df5f1);_0x117aff++;});window[_0x0d8b('0x37')]['callback']['add'](function(){_0xf3c16a(_0x0d8b('0xe8'))['html'](window[_0x0d8b('0x37')]['total']||'--');_0xf3c16a(_0x0d8b('0xe9'))[_0x0d8b('0x4d')](window['_QuatroDigital_CartData'][_0x0d8b('0x3d')]||'0');_0xf3c16a('.qd-ddc-infoTotalShipping')[_0x0d8b('0x4d')](window[_0x0d8b('0x37')][_0x0d8b('0x3b')]||'--');_0xf3c16a(_0x0d8b('0xea'))[_0x0d8b('0x4d')](window['_QuatroDigital_CartData'][_0x0d8b('0xeb')]||'--');});var _0x3a8a02=function(_0x208367,_0x4da36c){if(_0x0d8b('0x3')===typeof _0x208367['items'])return _0x28393f(_0x0d8b('0xec'));_0x35b507[_0x0d8b('0xed')]['call'](this,_0x4da36c);};_0x35b507['getCartInfoByUrl']=function(_0x4b69b6,_0x24705e){_0x0d8b('0x3')!=typeof _0x24705e?window['_QuatroDigital_DropDown'][_0x0d8b('0xee')]=_0x24705e:window['_QuatroDigital_DropDown'][_0x0d8b('0xee')]&&(_0x24705e=window[_0x0d8b('0x56')][_0x0d8b('0xee')]);setTimeout(function(){window[_0x0d8b('0x56')][_0x0d8b('0xee')]=void 0x0;},_0x28b3e6[_0x0d8b('0x8d')]);_0xf3c16a(_0x0d8b('0xef'))[_0x0d8b('0x49')]('qd-ddc-prodLoaded');if(_0x28b3e6[_0x0d8b('0x55')]){var _0x4e2eda=function(_0x50957b){window[_0x0d8b('0x56')][_0x0d8b('0x26')]=_0x50957b;_0x3a8a02(_0x50957b,_0x24705e);_0x0d8b('0x3')!==typeof window[_0x0d8b('0xf0')]&&_0x0d8b('0xa')===typeof window[_0x0d8b('0xf0')][_0x0d8b('0xf1')]&&window['_QuatroDigital_AmountProduct'][_0x0d8b('0xf1')]['call'](this);_0xf3c16a('.qd-ddc-wrapper')[_0x0d8b('0x47')]('qd-ddc-prodLoaded');};_0x0d8b('0x3')!==typeof window['_QuatroDigital_DropDown']['getOrderForm']?(_0x4e2eda(window[_0x0d8b('0x56')][_0x0d8b('0x26')]),_0x0d8b('0xa')===typeof _0x4b69b6&&_0x4b69b6(window[_0x0d8b('0x56')][_0x0d8b('0x26')])):_0xf3c16a[_0x0d8b('0x5a')](['items','totalizers',_0x0d8b('0x5c')],{'done':function(_0x381aa3){_0x4e2eda[_0x0d8b('0x61')](this,_0x381aa3);_0x0d8b('0xa')===typeof _0x4b69b6&&_0x4b69b6(_0x381aa3);},'fail':function(_0xe589b6){_0x28393f([_0x0d8b('0xf2'),_0xe589b6]);}});}else alert(_0x0d8b('0xf3'));};_0x35b507[_0x0d8b('0xf4')]=function(){var _0x13d965=_0xf3c16a(_0x0d8b('0xef'));_0x13d965[_0x0d8b('0x50')](_0x0d8b('0xf5'))[_0x0d8b('0x8')]?_0x13d965['removeClass']('qd-ddc-noItems'):_0x13d965['addClass'](_0x0d8b('0xf6'));};_0x35b507[_0x0d8b('0xed')]=function(_0x4372db){var _0x4e2eda=_0xf3c16a(_0x0d8b('0xf7'));_0x4e2eda[_0x0d8b('0xf8')]();_0x4e2eda[_0x0d8b('0x35')](function(){var _0x4e2eda=_0xf3c16a(this),_0x19f20e,_0x1f5eb2,_0x36eab6=_0xf3c16a(''),_0x261abd;for(_0x261abd in window[_0x0d8b('0x56')][_0x0d8b('0x26')][_0x0d8b('0x5b')])if(_0x0d8b('0x17')===typeof window[_0x0d8b('0x56')]['getOrderForm']['items'][_0x261abd]){var _0x12812e=window['_QuatroDigital_DropDown']['getOrderForm']['items'][_0x261abd];var _0x17f24b=_0x12812e[_0x0d8b('0xf9')][_0x0d8b('0x1')](/^\/|\/$/g,'')[_0x0d8b('0x7')]('/');var _0x31b4dc=_0xf3c16a('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0x31b4dc[_0x0d8b('0x33')]({'data-sku':_0x12812e['id'],'data-sku-index':_0x261abd,'data-qd-departament':_0x17f24b[0x0],'data-qd-category':_0x17f24b[_0x17f24b[_0x0d8b('0x8')]-0x1]});_0x31b4dc[_0x0d8b('0x47')](_0x0d8b('0xfa')+_0x12812e['availability']);_0x31b4dc['find'](_0x0d8b('0xfb'))['append'](_0x28b3e6[_0x0d8b('0xc1')](_0x12812e));_0x31b4dc[_0x0d8b('0x50')](_0x0d8b('0xfc'))[_0x0d8b('0x80')](isNaN(_0x12812e[_0x0d8b('0xfd')])?_0x12812e[_0x0d8b('0xfd')]:0x0==_0x12812e['sellingPrice']?_0x0d8b('0xfe'):(_0xf3c16a('meta[name=currency]')[_0x0d8b('0x33')](_0x0d8b('0x34'))||'R$')+'\x20'+qd_number_format(_0x12812e[_0x0d8b('0xfd')]/0x64,0x2,',','.'));_0x31b4dc[_0x0d8b('0x50')]('.qd-ddc-quantity')['attr']({'data-sku':_0x12812e['id'],'data-sku-index':_0x261abd})['val'](_0x12812e['quantity']);_0x31b4dc[_0x0d8b('0x50')](_0x0d8b('0xff'))[_0x0d8b('0x33')]({'data-sku':_0x12812e['id'],'data-sku-index':_0x261abd});_0x35b507[_0x0d8b('0x100')](_0x12812e['id'],_0x31b4dc[_0x0d8b('0x50')](_0x0d8b('0x101')),_0x12812e['imageUrl']);_0x31b4dc['find']('.qd-ddc-quantityMore,.qd-ddc-quantityMinus')['attr']({'data-sku':_0x12812e['id'],'data-sku-index':_0x261abd});_0x31b4dc[_0x0d8b('0x102')](_0x4e2eda);_0x36eab6=_0x36eab6[_0x0d8b('0x2d')](_0x31b4dc);}try{var _0x5e8b8b=_0x4e2eda[_0x0d8b('0x0')](_0x0d8b('0xef'))[_0x0d8b('0x50')](_0x0d8b('0xd3'));_0x5e8b8b[_0x0d8b('0x8')]&&''==_0x5e8b8b[_0x0d8b('0xd4')]()&&window[_0x0d8b('0x56')]['getOrderForm'][_0x0d8b('0x5c')][_0x0d8b('0x103')]&&_0x5e8b8b[_0x0d8b('0xd4')](window['_QuatroDigital_DropDown'][_0x0d8b('0x26')][_0x0d8b('0x5c')][_0x0d8b('0x103')][_0x0d8b('0x104')]);}catch(_0x25d84a){_0x28393f(_0x0d8b('0x105')+_0x25d84a[_0x0d8b('0x23')],_0x0d8b('0xb3'));}_0x35b507[_0x0d8b('0x106')](_0x4e2eda);_0x35b507['cartIsEmpty']();_0x4372db&&_0x4372db['lastSku']&&function(){_0x1f5eb2=_0x36eab6['filter'](_0x0d8b('0x107')+_0x4372db[_0x0d8b('0x108')]+'\x27]');_0x1f5eb2[_0x0d8b('0x8')]&&(_0x19f20e=0x0,_0x36eab6[_0x0d8b('0x35')](function(){var _0x4372db=_0xf3c16a(this);if(_0x4372db['is'](_0x1f5eb2))return!0x1;_0x19f20e+=_0x4372db[_0x0d8b('0x109')]();}),_0x35b507[_0x0d8b('0xd0')](void 0x0,void 0x0,_0x19f20e,_0x4e2eda[_0x0d8b('0x2d')](_0x4e2eda[_0x0d8b('0xa4')]())),_0x36eab6[_0x0d8b('0x49')]('qd-ddc-lastAddedFixed'),function(_0x4fab5e){_0x4fab5e[_0x0d8b('0x47')](_0x0d8b('0x10a'));_0x4fab5e[_0x0d8b('0x47')](_0x0d8b('0x10b'));setTimeout(function(){_0x4fab5e['removeClass']('qd-ddc-lastAdded');},_0x28b3e6[_0x0d8b('0x8d')]);}(_0x1f5eb2));}();});(function(){_QuatroDigital_DropDown[_0x0d8b('0x26')][_0x0d8b('0x5b')][_0x0d8b('0x8')]?(_0xf3c16a(_0x0d8b('0x6e'))['removeClass']('qd-ddc-cart-empty')[_0x0d8b('0x47')](_0x0d8b('0x10c')),setTimeout(function(){_0xf3c16a(_0x0d8b('0x6e'))[_0x0d8b('0x49')]('qd-ddc-product-add-time');},_0x28b3e6[_0x0d8b('0x8d')])):_0xf3c16a(_0x0d8b('0x6e'))[_0x0d8b('0x49')](_0x0d8b('0x10d'))[_0x0d8b('0x47')](_0x0d8b('0x10e'));}());'function'===typeof _0x28b3e6[_0x0d8b('0x10f')]?_0x28b3e6[_0x0d8b('0x10f')][_0x0d8b('0x61')](this):_0x28393f('callbackProductsList\x20não\x20é\x20uma\x20função');};_0x35b507[_0x0d8b('0x100')]=function(_0xd37e13,_0x543757,_0x5400bd){function _0x21e735(){_0x543757[_0x0d8b('0x49')](_0x0d8b('0x110'))[_0x0d8b('0x94')](function(){_0xf3c16a(this)[_0x0d8b('0x47')]('qd-loaded');})[_0x0d8b('0x33')](_0x0d8b('0x111'),_0x5400bd);}_0x5400bd?_0x21e735():isNaN(_0xd37e13)?_0x28393f('Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU',_0x0d8b('0x4c')):alert(_0x0d8b('0x112'));};_0x35b507[_0x0d8b('0x106')]=function(_0x4277bf){var _0x436239=function(_0x5cbcc2,_0x510e01){var _0x4e2eda=_0xf3c16a(_0x5cbcc2);var _0x106aad=_0x4e2eda['attr'](_0x0d8b('0x113'));var _0x19f20e=_0x4e2eda['attr'](_0x0d8b('0x114'));if(_0x106aad){var _0x1e397d=parseInt(_0x4e2eda[_0x0d8b('0xd4')]())||0x1;_0x35b507['changeQantity']([_0x106aad,_0x19f20e],_0x1e397d,_0x1e397d+0x1,function(_0x59c2bf){_0x4e2eda[_0x0d8b('0xd4')](_0x59c2bf);'function'===typeof _0x510e01&&_0x510e01();});}};var _0x4e2eda=function(_0x3dc01c,_0x323815){var _0x4e2eda=_0xf3c16a(_0x3dc01c);var _0x407b66=_0x4e2eda[_0x0d8b('0x33')](_0x0d8b('0x113'));var _0x19f20e=_0x4e2eda['attr'](_0x0d8b('0x114'));if(_0x407b66){var _0x4da9bc=parseInt(_0x4e2eda[_0x0d8b('0xd4')]())||0x2;_0x35b507['changeQantity']([_0x407b66,_0x19f20e],_0x4da9bc,_0x4da9bc-0x1,function(_0x149413){_0x4e2eda[_0x0d8b('0xd4')](_0x149413);_0x0d8b('0xa')===typeof _0x323815&&_0x323815();});}};var _0x1d2bc3=function(_0x38a06b,_0x20906c){var _0x4e2eda=_0xf3c16a(_0x38a06b);var _0x58a292=_0x4e2eda[_0x0d8b('0x33')](_0x0d8b('0x113'));var _0x19f20e=_0x4e2eda[_0x0d8b('0x33')](_0x0d8b('0x114'));if(_0x58a292){var _0x140a11=parseInt(_0x4e2eda[_0x0d8b('0xd4')]())||0x1;_0x35b507[_0x0d8b('0x115')]([_0x58a292,_0x19f20e],0x1,_0x140a11,function(_0x569dca){_0x4e2eda['val'](_0x569dca);_0x0d8b('0xa')===typeof _0x20906c&&_0x20906c();});}};var _0x19f20e=_0x4277bf[_0x0d8b('0x50')]('.qd-ddc-prodQttWrapper:not(.qd_on)');_0x19f20e['addClass'](_0x0d8b('0x116'))[_0x0d8b('0x35')](function(){var _0x4277bf=_0xf3c16a(this);_0x4277bf[_0x0d8b('0x50')]('.qd-ddc-quantityMore')['on'](_0x0d8b('0x117'),function(_0x458a22){_0x458a22[_0x0d8b('0x79')]();_0x19f20e[_0x0d8b('0x47')](_0x0d8b('0x118'));_0x436239(_0x4277bf[_0x0d8b('0x50')](_0x0d8b('0x119')),function(){_0x19f20e['removeClass'](_0x0d8b('0x118'));});});_0x4277bf[_0x0d8b('0x50')](_0x0d8b('0x11a'))['on'](_0x0d8b('0x11b'),function(_0x71bef){_0x71bef[_0x0d8b('0x79')]();_0x19f20e['addClass'](_0x0d8b('0x118'));_0x4e2eda(_0x4277bf[_0x0d8b('0x50')](_0x0d8b('0x119')),function(){_0x19f20e['removeClass'](_0x0d8b('0x118'));});});_0x4277bf['find'](_0x0d8b('0x119'))['on'](_0x0d8b('0x11c'),function(){_0x19f20e[_0x0d8b('0x47')](_0x0d8b('0x118'));_0x1d2bc3(this,function(){_0x19f20e[_0x0d8b('0x49')]('qd-loading');});});_0x4277bf[_0x0d8b('0x50')]('.qd-ddc-quantity')['on'](_0x0d8b('0x11d'),function(_0x56ef17){0xd==_0x56ef17['keyCode']&&(_0x19f20e[_0x0d8b('0x47')](_0x0d8b('0x118')),_0x1d2bc3(this,function(){_0x19f20e[_0x0d8b('0x49')]('qd-loading');}));});});_0x4277bf[_0x0d8b('0x50')](_0x0d8b('0xf5'))[_0x0d8b('0x35')](function(){var _0x4277bf=_0xf3c16a(this);_0x4277bf['find']('.qd-ddc-remove')['on'](_0x0d8b('0x11e'),function(){_0x4277bf[_0x0d8b('0x47')](_0x0d8b('0x118'));_0x35b507['removeProduct'](_0xf3c16a(this),function(_0x1930f8){_0x1930f8?_0x4277bf[_0x0d8b('0x11f')](!0x0)['slideUp'](function(){_0x4277bf[_0x0d8b('0x120')]();_0x35b507[_0x0d8b('0xf4')]();}):_0x4277bf['removeClass']('qd-loading');});return!0x1;});});};_0x35b507[_0x0d8b('0xd6')]=function(_0x2a6691){var _0x3277a1=_0x2a6691[_0x0d8b('0xd4')](),_0x3277a1=_0x3277a1['replace'](/[^0-9\-]/g,''),_0x3277a1=_0x3277a1[_0x0d8b('0x1')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x0d8b('0x121')),_0x3277a1=_0x3277a1[_0x0d8b('0x1')](/(.{9}).*/g,'$1');_0x2a6691[_0x0d8b('0xd4')](_0x3277a1);0x9<=_0x3277a1[_0x0d8b('0x8')]&&(_0x2a6691[_0x0d8b('0x18')](_0x0d8b('0x122'))!=_0x3277a1&&_0x16147f[_0x0d8b('0x123')]({'postalCode':_0x3277a1,'country':_0x0d8b('0x124')})[_0x0d8b('0x1c')](function(_0x5c36d){window[_0x0d8b('0x56')][_0x0d8b('0x26')]=_0x5c36d;_0x35b507[_0x0d8b('0x8e')]();})['fail'](function(_0x3d2cc5){_0x28393f([_0x0d8b('0x125'),_0x3d2cc5]);updateCartData();}),_0x2a6691[_0x0d8b('0x18')](_0x0d8b('0x122'),_0x3277a1));};_0x35b507[_0x0d8b('0x115')]=function(_0x5ab3be,_0x580671,_0x4b81a6,_0x2a2f7a){function _0x56350d(_0x51194f){_0x51194f='boolean'!==typeof _0x51194f?!0x1:_0x51194f;_0x35b507['getCartInfoByUrl']();window[_0x0d8b('0x56')][_0x0d8b('0x90')]=!0x1;_0x35b507['cartIsEmpty']();_0x0d8b('0x3')!==typeof window[_0x0d8b('0xf0')]&&'function'===typeof window[_0x0d8b('0xf0')]['exec']&&window[_0x0d8b('0xf0')][_0x0d8b('0xf1')][_0x0d8b('0x61')](this);'function'===typeof adminCart&&adminCart();_0xf3c16a['fn'][_0x0d8b('0x29')](!0x0,void 0x0,_0x51194f);_0x0d8b('0xa')===typeof _0x2a2f7a&&_0x2a2f7a(_0x580671);}_0x4b81a6=_0x4b81a6||0x1;if(0x1>_0x4b81a6)return _0x580671;if(_0x28b3e6['smartCheckout']){if('undefined'===typeof window[_0x0d8b('0x56')][_0x0d8b('0x26')]['items'][_0x5ab3be[0x1]])return _0x28393f(_0x0d8b('0x126')+_0x5ab3be[0x1]+']'),_0x580671;window[_0x0d8b('0x56')][_0x0d8b('0x26')]['items'][_0x5ab3be[0x1]][_0x0d8b('0x3f')]=_0x4b81a6;window[_0x0d8b('0x56')][_0x0d8b('0x26')]['items'][_0x5ab3be[0x1]][_0x0d8b('0x127')]=_0x5ab3be[0x1];_0x16147f[_0x0d8b('0x128')]([window[_0x0d8b('0x56')][_0x0d8b('0x26')]['items'][_0x5ab3be[0x1]]],[_0x0d8b('0x5b'),'totalizers','shippingData'])[_0x0d8b('0x1c')](function(_0xc31ff7){window[_0x0d8b('0x56')]['getOrderForm']=_0xc31ff7;_0x56350d(!0x0);})[_0x0d8b('0x1e')](function(_0x341735){_0x28393f(['Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho',_0x341735]);_0x56350d();});}else _0x28393f(_0x0d8b('0x129'));};_0x35b507['removeProduct']=function(_0x439847,_0x444240){function _0x5a6ae9(_0x4f811b){_0x4f811b=_0x0d8b('0x12a')!==typeof _0x4f811b?!0x1:_0x4f811b;_0x0d8b('0x3')!==typeof window[_0x0d8b('0xf0')]&&_0x0d8b('0xa')===typeof window['_QuatroDigital_AmountProduct']['exec']&&window['_QuatroDigital_AmountProduct'][_0x0d8b('0xf1')][_0x0d8b('0x61')](this);_0x0d8b('0xa')===typeof adminCart&&adminCart();_0xf3c16a['fn'][_0x0d8b('0x29')](!0x0,void 0x0,_0x4f811b);_0x0d8b('0xa')===typeof _0x444240&&_0x444240(_0x19f20e);}var _0x19f20e=!0x1,_0x4449f1=_0xf3c16a(_0x439847)[_0x0d8b('0x33')](_0x0d8b('0x114'));if(_0x28b3e6[_0x0d8b('0x55')]){if(_0x0d8b('0x3')===typeof window[_0x0d8b('0x56')]['getOrderForm'][_0x0d8b('0x5b')][_0x4449f1])return _0x28393f('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x4449f1+']'),_0x19f20e;window[_0x0d8b('0x56')][_0x0d8b('0x26')][_0x0d8b('0x5b')][_0x4449f1][_0x0d8b('0x127')]=_0x4449f1;_0x16147f[_0x0d8b('0x12b')]([window[_0x0d8b('0x56')]['getOrderForm'][_0x0d8b('0x5b')][_0x4449f1]],[_0x0d8b('0x5b'),'totalizers',_0x0d8b('0x5c')])[_0x0d8b('0x1c')](function(_0x7c8294){_0x19f20e=!0x0;window[_0x0d8b('0x56')][_0x0d8b('0x26')]=_0x7c8294;_0x3a8a02(_0x7c8294);_0x5a6ae9(!0x0);})[_0x0d8b('0x1e')](function(_0x11eb1f){_0x28393f([_0x0d8b('0x12c'),_0x11eb1f]);_0x5a6ae9();});}else alert('Atenção,\x20este\x20método\x20esta\x20descontinuado.');};_0x35b507[_0x0d8b('0xd0')]=function(_0x3e71a7,_0x287dff,_0x1309fa,_0x693e1f){_0x693e1f=_0x693e1f||_0xf3c16a('.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2');_0x3e71a7=_0x3e71a7||'+';_0x287dff=_0x287dff||0.9*_0x693e1f['height']();_0x693e1f[_0x0d8b('0x11f')](!0x0,!0x0)[_0x0d8b('0x12d')]({'scrollTop':isNaN(_0x1309fa)?_0x3e71a7+'='+_0x287dff+'px':_0x1309fa});};_0x28b3e6[_0x0d8b('0xd7')]||(_0x35b507[_0x0d8b('0x8e')](),_0xf3c16a['fn'][_0x0d8b('0x29')](!0x0));_0xf3c16a(window)['on']('productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex',function(){try{window[_0x0d8b('0x56')][_0x0d8b('0x26')]=void 0x0,_0x35b507['getCartInfoByUrl']();}catch(_0x462f3){_0x28393f('Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20'+_0x462f3[_0x0d8b('0x23')],'avisso');}});_0x0d8b('0xa')===typeof _0x28b3e6['callback']?_0x28b3e6['callback'][_0x0d8b('0x61')](this):_0x28393f(_0x0d8b('0x12e'));};_0xf3c16a['fn'][_0x0d8b('0xb4')]=function(_0x534de4){var _0x573032=_0xf3c16a(this);_0x573032['fn']=new _0xf3c16a[(_0x0d8b('0xb4'))](this,_0x534de4);return _0x573032;};}catch(_0x397775){_0x0d8b('0x3')!==typeof console&&_0x0d8b('0xa')===typeof console[_0x0d8b('0x15')]&&console[_0x0d8b('0x15')]('Oooops!\x20',_0x397775);}}(this));(function(_0x3e31ae){try{var _0x5160c0=jQuery;window[_0x0d8b('0xf0')]=window['_QuatroDigital_AmountProduct']||{};window[_0x0d8b('0xf0')]['items']={};window[_0x0d8b('0xf0')][_0x0d8b('0x12f')]=!0x1;window['_QuatroDigital_AmountProduct'][_0x0d8b('0x130')]=!0x1;window[_0x0d8b('0xf0')][_0x0d8b('0x131')]=!0x1;var _0x17d06d=function(){if(window[_0x0d8b('0xf0')][_0x0d8b('0x12f')]){var _0x55d671=!0x1;var _0x3e31ae={};window[_0x0d8b('0xf0')][_0x0d8b('0x5b')]={};for(_0x48da09 in window[_0x0d8b('0x56')][_0x0d8b('0x26')]['items'])if('object'===typeof window[_0x0d8b('0x56')][_0x0d8b('0x26')]['items'][_0x48da09]){var _0x31c11e=window[_0x0d8b('0x56')][_0x0d8b('0x26')][_0x0d8b('0x5b')][_0x48da09];_0x0d8b('0x3')!==typeof _0x31c11e[_0x0d8b('0x132')]&&null!==_0x31c11e[_0x0d8b('0x132')]&&''!==_0x31c11e[_0x0d8b('0x132')]&&(window[_0x0d8b('0xf0')][_0x0d8b('0x5b')][_0x0d8b('0x133')+_0x31c11e['productId']]=window[_0x0d8b('0xf0')]['items'][_0x0d8b('0x133')+_0x31c11e['productId']]||{},window[_0x0d8b('0xf0')][_0x0d8b('0x5b')]['prod_'+_0x31c11e[_0x0d8b('0x132')]][_0x0d8b('0x134')]=_0x31c11e['productId'],_0x3e31ae[_0x0d8b('0x133')+_0x31c11e['productId']]||(window[_0x0d8b('0xf0')][_0x0d8b('0x5b')][_0x0d8b('0x133')+_0x31c11e['productId']][_0x0d8b('0x3d')]=0x0),window[_0x0d8b('0xf0')][_0x0d8b('0x5b')][_0x0d8b('0x133')+_0x31c11e[_0x0d8b('0x132')]][_0x0d8b('0x3d')]+=_0x31c11e[_0x0d8b('0x3f')],_0x55d671=!0x0,_0x3e31ae[_0x0d8b('0x133')+_0x31c11e[_0x0d8b('0x132')]]=!0x0);}var _0x48da09=_0x55d671;}else _0x48da09=void 0x0;window[_0x0d8b('0xf0')][_0x0d8b('0x12f')]&&(_0x5160c0(_0x0d8b('0x135'))['remove'](),_0x5160c0(_0x0d8b('0x136'))[_0x0d8b('0x49')]('qd-bap-item-added'));for(var _0xdbaca4 in window['_QuatroDigital_AmountProduct'][_0x0d8b('0x5b')]){_0x31c11e=window[_0x0d8b('0xf0')][_0x0d8b('0x5b')][_0xdbaca4];if('object'!==typeof _0x31c11e)return;_0x3e31ae=_0x5160c0(_0x0d8b('0x137')+_0x31c11e[_0x0d8b('0x134')]+']')['getParent']('li');if(window[_0x0d8b('0xf0')][_0x0d8b('0x12f')]||!_0x3e31ae[_0x0d8b('0x50')](_0x0d8b('0x135'))[_0x0d8b('0x8')])_0x55d671=_0x5160c0(_0x0d8b('0x138')),_0x55d671[_0x0d8b('0x50')]('.qd-bap-qtt')[_0x0d8b('0x4d')](_0x31c11e['qtt']),_0x31c11e=_0x3e31ae['find'](_0x0d8b('0x139')),_0x31c11e['length']?_0x31c11e[_0x0d8b('0xa9')](_0x55d671)[_0x0d8b('0x47')]('qd-bap-item-added'):_0x3e31ae[_0x0d8b('0xa9')](_0x55d671);}_0x48da09&&(window[_0x0d8b('0xf0')][_0x0d8b('0x12f')]=!0x1);};window['_QuatroDigital_AmountProduct'][_0x0d8b('0xf1')]=function(){window[_0x0d8b('0xf0')]['allowRecalculate']=!0x0;_0x17d06d[_0x0d8b('0x61')](this);};_0x5160c0(document)['ajaxStop'](function(){_0x17d06d[_0x0d8b('0x61')](this);});}catch(_0x42c8d1){_0x0d8b('0x3')!==typeof console&&_0x0d8b('0xa')===typeof console['error']&&console[_0x0d8b('0x15')](_0x0d8b('0x65'),_0x42c8d1);}}(this));(function(){try{var _0x3d2b3b=jQuery,_0x4e54a2,_0x520bcb={'selector':_0x0d8b('0x13a'),'dropDown':{},'buyButton':{}};_0x3d2b3b[_0x0d8b('0x13b')]=function(_0x37a72b){var _0x5f4f81={};_0x4e54a2=_0x3d2b3b[_0x0d8b('0x16')](!0x0,{},_0x520bcb,_0x37a72b);_0x37a72b=_0x3d2b3b(_0x4e54a2['selector'])['QD_dropDownCart'](_0x4e54a2[_0x0d8b('0x13c')]);_0x5f4f81[_0x0d8b('0x7b')]=_0x0d8b('0x3')!==typeof _0x4e54a2[_0x0d8b('0x13c')][_0x0d8b('0xd7')]&&!0x1===_0x4e54a2['dropDown']['updateOnlyHover']?_0x3d2b3b(_0x4e54a2[_0x0d8b('0x85')])[_0x0d8b('0x73')](_0x37a72b['fn'],_0x4e54a2[_0x0d8b('0x7b')]):_0x3d2b3b(_0x4e54a2['selector'])[_0x0d8b('0x73')](_0x4e54a2[_0x0d8b('0x7b')]);_0x5f4f81[_0x0d8b('0x13c')]=_0x37a72b;return _0x5f4f81;};_0x3d2b3b['fn'][_0x0d8b('0x13d')]=function(){_0x0d8b('0x17')===typeof console&&'function'===typeof console[_0x0d8b('0x2c')]&&console['info'](_0x0d8b('0x13e'));};_0x3d2b3b[_0x0d8b('0x13d')]=_0x3d2b3b['fn'][_0x0d8b('0x13d')];}catch(_0x2898fe){_0x0d8b('0x3')!==typeof console&&_0x0d8b('0xa')===typeof console[_0x0d8b('0x15')]&&console['error'](_0x0d8b('0x65'),_0x2898fe);}}());
/* Automatizador de comments box do Facebook // Carlos Vinicius [Quatro Digital] */
/* Automatizador de comments box do Facebook // 1.6 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a=$(".fb-comments");a.length&&a.attr("data-href",document.location.href.split("#").shift().split("?").shift());$("#fb-root").length||$("body").append('<div id="fb-root"></div>');if(!$("script#facebook-jssdk").length){a=$("meta[property='fb:app_id']").attr("content")||!1;var b,c=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||(b=document.createElement("script"),b.id="facebook-jssdk",b.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+
(a?"&appId="+a:""),c.parentNode.insertBefore(b,c))}"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse()});

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0x2e76=['join','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','html','<iframe\x20src=\x22','urlProtocol','://www.youtube.com/embed/','?wmode=transparent&rel=0&enablejsapi=1\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>','height','fadeTo','qdpv-video-on','stop','add','find','a:not(\x27.qd-videoLink\x27)','bind','click.removeVideo','removeAttr','style','data','animate','length','call','string','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27','\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','click.playVideo','.ON','removeClass','addClass','controlVideo','.qd-playerWrapper\x20iframe','contentWindow','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','attr','a:not(.qd-videoLink)','click','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','insertThumbsIn','appendTo','trigger','QuatroDigital.pv_video_added','ajaxStop','load','ImageControl','.qd-videoLink','body','.produto','alerta','toLowerCase','warn','undefined','info','error','[Video\x20in\x20product]\x20','qdVideoInProduct','start','td.value-field.Videos:first','http','ul.thumbs','div#image','text','replace','split','indexOf','youtube','push','pop','shift','youtu.be','be/','<div\x20class=\x22qd-playerWrapper\x22></div>','prependTo','#include','wrap','<div\x20class=\x22qd-playerContainer\x22></div>','fromCharCode','charCodeAt','ite','---','erc'];(function(_0x40ac5e,_0x2de228){var _0x2839d6=function(_0x123d47){while(--_0x123d47){_0x40ac5e['push'](_0x40ac5e['shift']());}};_0x2839d6(++_0x2de228);}(_0x2e76,0x85));var _0x62e7=function(_0x495c81,_0x552713){_0x495c81=_0x495c81-0x0;var _0x57761f=_0x2e76[_0x495c81];return _0x57761f;};(function(_0x2e33fe){$(function(){if($(document[_0x62e7('0x0')])['is'](_0x62e7('0x1'))){var _0x1d79ad=[];var _0xcf7fcc=function(_0x40a590,_0x3f928e){'object'===typeof console&&('undefined'!==typeof _0x3f928e&&_0x62e7('0x2')===_0x3f928e[_0x62e7('0x3')]()?console[_0x62e7('0x4')]('[Video\x20in\x20product]\x20'+_0x40a590):_0x62e7('0x5')!==typeof _0x3f928e&&_0x62e7('0x6')===_0x3f928e['toLowerCase']()?console['info']('[Video\x20in\x20product]\x20'+_0x40a590):console[_0x62e7('0x7')](_0x62e7('0x8')+_0x40a590));};window[_0x62e7('0x9')]=window[_0x62e7('0x9')]||{};var _0x4dd69b=$['extend'](!0x0,{'insertThumbsIn':_0x62e7('0xa'),'videoFieldSelector':_0x62e7('0xb'),'controlVideo':!0x0,'urlProtocol':_0x62e7('0xc')},window['qdVideoInProduct']);var _0x4f2f59=$(_0x62e7('0xd'));var _0x2a93f6=$(_0x62e7('0xe'));var _0x3d9fc1=$(_0x4dd69b['videoFieldSelector'])[_0x62e7('0xf')]()[_0x62e7('0x10')](/\;\s*/,';')[_0x62e7('0x11')](';');for(var _0x537aa2=0x0;_0x537aa2<_0x3d9fc1['length'];_0x537aa2++)-0x1<_0x3d9fc1[_0x537aa2][_0x62e7('0x12')](_0x62e7('0x13'))?_0x1d79ad[_0x62e7('0x14')](_0x3d9fc1[_0x537aa2]['split']('v=')[_0x62e7('0x15')]()['split'](/[&#]/)[_0x62e7('0x16')]()):-0x1<_0x3d9fc1[_0x537aa2][_0x62e7('0x12')](_0x62e7('0x17'))&&_0x1d79ad[_0x62e7('0x14')](_0x3d9fc1[_0x537aa2]['split'](_0x62e7('0x18'))['pop']()[_0x62e7('0x11')](/[\?&#]/)[_0x62e7('0x16')]());var _0x2c10fc=$(_0x62e7('0x19'));_0x2c10fc[_0x62e7('0x1a')](_0x62e7('0x1b'));_0x2c10fc[_0x62e7('0x1c')](_0x62e7('0x1d'));_0x3d9fc1=function(_0x178350){var _0x58a58a={'n':'oenxnqnoen%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x5e720c){var _0x3c69a1=function(_0xcc73d3){return _0xcc73d3;};var _0x5d9d93=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5e720c=_0x5e720c['d'+_0x5d9d93[0x10]+'c'+_0x5d9d93[0x11]+'m'+_0x3c69a1(_0x5d9d93[0x1])+'n'+_0x5d9d93[0xd]]['l'+_0x5d9d93[0x12]+'c'+_0x5d9d93[0x0]+'ti'+_0x3c69a1('o')+'n'];var _0x11a73c=function(_0x42e23a){return escape(encodeURIComponent(_0x42e23a[_0x62e7('0x10')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x2d997e){return String[_0x62e7('0x1e')](('Z'>=_0x2d997e?0x5a:0x7a)>=(_0x2d997e=_0x2d997e[_0x62e7('0x1f')](0x0)+0xd)?_0x2d997e:_0x2d997e-0x1a);})));};var _0x28fe37=_0x11a73c(_0x5e720c[[_0x5d9d93[0x9],_0x3c69a1('o'),_0x5d9d93[0xc],_0x5d9d93[_0x3c69a1(0xd)]]['join']('')]);_0x11a73c=_0x11a73c((window[['js',_0x3c69a1('no'),'m',_0x5d9d93[0x1],_0x5d9d93[0x4]['toUpperCase'](),_0x62e7('0x20')]['join']('')]||_0x62e7('0x21'))+['.v',_0x5d9d93[0xd],'e',_0x3c69a1('x'),'co',_0x3c69a1('mm'),_0x62e7('0x22'),_0x5d9d93[0x1],'.c',_0x3c69a1('o'),'m.',_0x5d9d93[0x13],'r'][_0x62e7('0x23')](''));for(var _0x2fc737 in _0x58a58a){if(_0x11a73c===_0x2fc737+_0x58a58a[_0x2fc737]||_0x28fe37===_0x2fc737+_0x58a58a[_0x2fc737]){var _0x1a5d7b='tr'+_0x5d9d93[0x11]+'e';break;}_0x1a5d7b='f'+_0x5d9d93[0x0]+'ls'+_0x3c69a1(_0x5d9d93[0x1])+'';}_0x3c69a1=!0x1;-0x1<_0x5e720c[[_0x5d9d93[0xc],'e',_0x5d9d93[0x0],'rc',_0x5d9d93[0x9]][_0x62e7('0x23')]('')]['indexOf'](_0x62e7('0x24'))&&(_0x3c69a1=!0x0);return[_0x1a5d7b,_0x3c69a1];}(_0x178350);}(window);if(!eval(_0x3d9fc1[0x0]))return _0x3d9fc1[0x1]?_0xcf7fcc(_0x62e7('0x25')):!0x1;var _0xb6c53e=function(_0x3d53ab,_0x313b0b){_0x62e7('0x13')===_0x313b0b&&_0x2c10fc[_0x62e7('0x26')](_0x62e7('0x27')+_0x4dd69b[_0x62e7('0x28')]+_0x62e7('0x29')+_0x3d53ab+_0x62e7('0x2a'));_0x2a93f6['data'](_0x62e7('0x2b'),_0x2a93f6['data'](_0x62e7('0x2b'))||_0x2a93f6[_0x62e7('0x2b')]());_0x2a93f6['stop'](!0x0,!0x0)[_0x62e7('0x2c')](0x1f4,0x0,function(){$(_0x62e7('0x0'))['addClass'](_0x62e7('0x2d'));});_0x2c10fc[_0x62e7('0x2e')](!0x0,!0x0)[_0x62e7('0x2c')](0x1f4,0x1,function(){_0x2a93f6[_0x62e7('0x2f')](_0x2c10fc)['animate']({'height':_0x2c10fc['find']('iframe')[_0x62e7('0x2b')]()},0x2bc);});};removePlayer=function(){_0x4f2f59[_0x62e7('0x30')](_0x62e7('0x31'))[_0x62e7('0x32')](_0x62e7('0x33'),function(){_0x2c10fc['stop'](!0x0,!0x0)[_0x62e7('0x2c')](0x1f4,0x0,function(){$(this)['hide']()[_0x62e7('0x34')](_0x62e7('0x35'));$(_0x62e7('0x0'))['removeClass'](_0x62e7('0x2d'));});_0x2a93f6[_0x62e7('0x2e')](!0x0,!0x0)[_0x62e7('0x2c')](0x1f4,0x1,function(){var _0x437da0=_0x2a93f6[_0x62e7('0x36')]('height');_0x437da0&&_0x2a93f6[_0x62e7('0x37')]({'height':_0x437da0},0x2bc);});});};var _0x5ab6f9=function(){if(!_0x4f2f59[_0x62e7('0x30')]('.qd-videoItem')[_0x62e7('0x38')])for(vId in removePlayer[_0x62e7('0x39')](this),_0x1d79ad)if(_0x62e7('0x3a')===typeof _0x1d79ad[vId]&&''!==_0x1d79ad[vId]){var _0x38e4c0=$(_0x62e7('0x3b')+_0x1d79ad[vId]+_0x62e7('0x3c')+_0x1d79ad[vId]+_0x62e7('0x3d')+_0x1d79ad[vId]+_0x62e7('0x3e'));_0x38e4c0['find']('a')[_0x62e7('0x32')](_0x62e7('0x3f'),function(){var _0x362952=$(this);_0x4f2f59[_0x62e7('0x30')](_0x62e7('0x40'))[_0x62e7('0x41')]('ON');_0x362952[_0x62e7('0x42')]('ON');0x1==_0x4dd69b[_0x62e7('0x43')]?$(_0x62e7('0x44'))[_0x62e7('0x38')]?(_0xb6c53e[_0x62e7('0x39')](this,'',''),$(_0x62e7('0x44'))[0x0][_0x62e7('0x45')][_0x62e7('0x46')](_0x62e7('0x47'),'*')):_0xb6c53e[_0x62e7('0x39')](this,_0x362952[_0x62e7('0x48')]('rel'),_0x62e7('0x13')):_0xb6c53e[_0x62e7('0x39')](this,_0x362952[_0x62e7('0x48')]('rel'),_0x62e7('0x13'));return!0x1;});0x1==_0x4dd69b[_0x62e7('0x43')]&&_0x4f2f59['find'](_0x62e7('0x49'))[_0x62e7('0x4a')](function(_0x52ced5){$(_0x62e7('0x44'))[_0x62e7('0x38')]&&$(_0x62e7('0x44'))[0x0][_0x62e7('0x45')][_0x62e7('0x46')](_0x62e7('0x4b'),'*');});_0x62e7('0xa')===_0x4dd69b[_0x62e7('0x4c')]?_0x38e4c0[_0x62e7('0x1a')](_0x4f2f59):_0x38e4c0[_0x62e7('0x4d')](_0x4f2f59);_0x38e4c0[_0x62e7('0x4e')](_0x62e7('0x4f'),[_0x1d79ad[vId],_0x38e4c0]);}};$(document)[_0x62e7('0x50')](_0x5ab6f9);$(window)[_0x62e7('0x51')](_0x5ab6f9);(function(){var _0x49548d=this;var _0x175534=window[_0x62e7('0x52')]||function(){};window[_0x62e7('0x52')]=function(_0x1077d1,_0xa323b0){$(_0x1077d1||'')['is'](_0x62e7('0x53'))||(_0x175534[_0x62e7('0x39')](this,_0x1077d1,_0xa323b0),_0x5ab6f9[_0x62e7('0x39')](_0x49548d));};}());}});}(this));

/* Quatro Digital - Mosaic Banners // Carlos Vinicius // Todos os direitos reservados */
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);