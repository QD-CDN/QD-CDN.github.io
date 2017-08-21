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
			Common.applySmartCart();
			Common.openSearchModal();
			Common.vtexBindQuickViewDestroy();
			Common.boxTelevendas();
			Common.applyAmazingMenu();
			Common.applyAmazingMenuMobile();
			Common.qdOverlay();
			Common.showFooterLinks();
			Common.applyTipBarCarousel();
			Common.saveAmountFix();
			Common.applySmartPrice();
			Common.applyCarouselShelf();
		},
		ajaxStop: function() {
			Common.appendSkuPopUpCloseBtn();
		},
		windowOnload: function() {
			Common.facebookLikebox();
			Common.saveAmountFix();
		},
		applySmartCart: function() {
			$('.header-qd-v1').append('<div class="smart-cart-qd-v1-wrapper"><div class="qd-sc-wrapper"></div></div>');

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
		appendSkuPopUpCloseBtn: function() {
			var wrapper = $('.boxPopUp2 .selectSkuTitle:not(.qd-on)');
			wrapper.addClass('qd-on').append($('<span class="modal-qd-v1-box-popup-close">Fechar</span>').click(function() {
				$(window).trigger('vtex.modal.hide');
				wrapper.removeClass('.qd-on');
				return false;
			}));
		},		
		qdOverlayClass: 'qd-am-on qd-cart-show qd-sn-on',
		qdOverlay: function() {
			$('.components-qd-v1-overlay').click(function() {
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		},		
		vtexBindQuickViewDestroy: function() {
			window.bindQuickView = function() {};
		},
		boxTelevendas: function () {
			var wrapper = $('.boxTelevendas');

			wrapper.slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				draggable: false,
				speed: 700,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					},

					{
						breakpoint: 991,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
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
			wrapper.first().css('opacity', '1');
		},
		applyAmazingMenu: function() {
			$('.header-qd-v1-amazing-menu, .footer-qd-v1-menu-list').QD_amazingMenu();

			$('.header-qd-v1-floating-amazing-menu').click(function(e) {
				$('.header-qd-v1-amazing-menu-wrapper').toggleClass('qd-is-active');
				e.preventDefault();
			});
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
		facebookLikebox: function () {
			$(".footer-qd-v1-facebook-likebox").html('<div class="fb-page" data-href="https://www.facebook.com/gasometromadeiras/" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="false"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/gasometromadeiras/">Vitrine do Artesanato</a></blockquote></div></div>');
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
					return { slidesToShow: 2 };
				return {};
			})()));
		},
		saveAmountFix: function() {
			$('.shelf-qd-v1-highlight-discount-percentage:not(.qd-on)').addClass('qd-on').each(function() {
				var $t = $(this);
				$t.text(($t.text().trim().match(/[0-9]+/) || [""]).pop() + '%');
			});
		},
		applySmartPrice:function(){
			$('<p class="flag desconto-5--a-vista-boleto">Desconto 5% à vista Boleto</p>').appendTo('.shelf-qd-v1-highlight');

			// ATENÇÃO CHAMAR ESSA FUNÇÃO TBM NO AJAX STOP
			var wrapper = $("li[layout]");

			$('<div class="shelf-qd-v1-smart-price component-qd-v1-smart-price"> <div class="row"> <div class="col-xs-2"> <div class="shelf-qd-v1-sp-icon"> <i class="fa fa-barcode" aria-hidden="true"></i> </div> </div> <div class="col-xs-10"> <span class="qd_displayPrice shelf-qd-v1-sp-best-price">R$ </span> <span class="qd-sp-display-discount shelf-qd-v1-sp-discount">0% de desconto no boleto</span> </div> </div> </div>').insertBefore(".shelf-qd-v1-price");

			wrapper.find(".flag").QD_SmartPrice({
				filterFlagBy: "[class*='boleto']",
				wrapperElement: wrapper,
				productPage:{
					isProductPage: false
				}
			});            
		},
		applyCarouselShelf: function() {
			var wrapper = $('.carousel-qd-v1-shelf .prateleira');

			if (!wrapper.length)
				return false;

			wrapper.each(function() {
				var $t = $(this);
				$t.find('h2').insertBefore(wrapper);
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
	};

	var Home = {
		init: function() {
			Home.sliderFull();
			Home.applySpecialShelfCarousel();
			Home.homeSpecialLinksToggle();
			Home.applyMosaicCategorieBanners();
			Home.applyBrandCarousel();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		sliderFull: function() {
			var wrapper = $('.slider-qd-v1-full');
			
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
				autoplay: false,
				autoplaySpeed: 8000,
				draggable: false
			});
			
			var mobileDotsWrapper = $('.slider-qd-v1-full-mobile .slick-dots');
			mobileDotsWrapper.on('init', function(event, slick){
				$(this).find('.slick-current').addClass('slick-active');
			});	

			mobileDotsWrapper.slick({
				asNavFor: '.slider-qd-v1-full-mobile',
				arrows: false,
				centerMode: true,
				infinite: false,
				focusOnSelect: true,
				variableWidth: true,
				centerPadding: '24%'
			});

			// On after slide change
			var mobileWrapper = $('.slider-qd-v1-full.slider-qd-v1-full-mobile');
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
							slidesToShow: 2,
							slidesToScroll: 2
						}
					}
				]
			});
		},
		homeSpecialLinksToggle:function() {	
			var closedHeight = $('.home-qd-v1-special-links').outerHeight();
			var maxheight = $('.home-qd-v1-special-links >ul').height();

			$('.home-qd-v1-special-links').click(function() {
				$(this).stop();

				if ($(this).outerHeight() == closedHeight) {
					$(this).animate({
						height: maxheight
					});
				}
				else {
					$(this).animate({
						height: closedHeight
					});
				}
			});

		},
		applySpecialShelfCarousel: function() {
			var wrapper = $('.home-qd-v1-special-carousel-banner');

			if (!wrapper.length)
				return false;

			var hasBanner = wrapper.find('.box-banner, .home-qd-v1-special-links ul[itemscope="itemscope"]').length;
			if (!hasBanner)
				wrapper.find('[class*="col-md-"]').removeClass().addClass('col-xs-12');

			wrapper.each(function() {
				var $t = $(this);
				$t.find('.special-carousel-qd-v1-shelf h2').remove();
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
		},
		applyMosaicCategorieBanners: function() {
			$('.mosaic-categories-qd-v1-wrapper > .box-banner').QD_mosaicBanners({
			});
		},		
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
				qtt = 200;

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

			// wrapper.find('h3, h4, h5').toggleClass('qd-seach-active-menu');
			// wrapper.find('h3, h4, h5').find("+ ul").stop(true, true).slideToggle();
			// wrapper.find('h3, h4, h5').find("+ div").stop(true, true).slideToggle();

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
			// Product.setAvailableBodyClass(); comentado poq está dando erro na página de kit
			Product.openShipping();
			Product.qdClickTableMeasures();
			Product.qdCallThumbVideo();
			Product.forceImageZoom();
			Product.selectSku();
			Product.scrollToDescription();
			// Roda slick das thumbs quando volta para estado inicial
			$(window).on('skuSelectable.vtex', Product.applyCarouselThumb);

			Product.applySmartPrice();	
			
			// Apenas para tela de KIT
			if( $("body").is(".product-kit") ){
			Product.showKitItem();
			Product.showKitSpecification();
			Product.itemSelected();
			Product.setBuyUrl();
			// Product.skuItemClick();
			Product.dustRenderCallback();
			Product.unavailableCheck();
			Product.vtexSkuSelected();
			Product.showKitDescription();
			Product.showKitImage();
			}
		},

		ajaxStop: function() {
			Product.applyCarouselThumb();
		},
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
		applySmartPrice:function(){
			$('<p class="flag desconto-5--a-vista-boleto">Desconto 5% à vista Boleto</p>').appendTo('.product-qd-v1-stamps');
			
			$(".product-qd-v1-price").prepend('<div class="product-qd-v1-bank-slip"> <div class="row"> <div class="col-xs-2"> <div class="shelf-qd-v1-sp-icon"> <i class="fa fa-barcode" aria-hidden="true"></i> </div> </div> <div class="col-xs-10"> <p class="qd-sp-best-price"><span class="qd_displayPrice">R$ </span></p> <p class="qd-sp-best-discount"><span class="qd-sp-display-discount">0%  de desconto no boleto</span></p> </div> </div> </div>');

			$(".product-qd-v1-stamps .flag").QD_SmartPrice({
				filterFlagBy: "[class*='boleto']",
				productPage:{
					wrapperElement: ".product-qd-v1-wrapper",
					changeNativePrice: false,
					isProductPage: true
				}
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
  				slidesToShow: 3,
  				arrows: false,
				infinite: false,
				draggable: true,
				swipeToSlide: true,
				edgeFriction: .1,
				variableWidth: true
			});
		},
		qdClickTableMeasures: function() {
			var wrapper = $(".product-qd-v1-sku-selection");
			var modal = $(".qd-v1-modal");

			$(".sku-qd-v1-click-table-measures").click(function() {
				modal.find('.modal-body:not(.qd-on)').addClass('qd-on').append('<img width="720" height="688" alt="tabela de medidas" src="//madeirasgasometro.vteximg.com.br/arquivos/ids/166944-1000-1000/coladeira-de-bordas-new-plus-diamante-imagem-01.jpg" complete="complete">');
				modal.addClass('qd-v1-modal-table-measures');
				modal.modal();
			});
		},
		qdCallThumbVideo: function() {
			window.qdVideoInProduct = {videoFieldSelector: 'td.value-field.Videos:first'};
			var iframe = $("td.value-field.Video-Descricao-do-Produto:first iframe");

			if (!iframe.length) {
				window.qdVideoInProduct = {videoFieldSelector: 'td.value-field.Video:first'};
				return;
			}

			window.qdVideoInProduct = {videoFieldSelector: $('<span/>').addClass('video-product').text('https://www.youtube.com/watch?v=' + iframe.attr("src").split("?").shift().split("/").pop() + '&rel=0')};
		},
		scrollToDescription: function() {
			$('.product-qd-v1-link-description').click(function(e) {
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $('.product-qd-v1-description').offset().top -100
				}, 900, 'swing');
			});
		},
		openShipping: function() {
			if( typeof window.ShippingValue === "function" )
				window.ShippingValue();
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

		//scripts kit
		showKitItem: function () {
			$(".product-qd-v1-kit-item-row").each(function () {
				if ($(this).find("#image-main").length) {
					$(this).show();
				}
			});
		},
		showKitSpecification: function () {
			$(".specification-row").each(function () {
				if ($(this).find(".productName").length) {
					$(this).show();
				}
			});
		},
		itemSelected: function () {
			$(".kit-item-selects").bind("click", function () {
				$(this).parents(".product-qd-v1-kit-item-row").toggleClass("qd-state-not-selected");
			});
		},
		setBuyUrl : function(){
			var btns = $(".product-qd-v1-kit-item-row:not('.qd-state-not-selected, .qd-item-unavailable') .buy-in-page-button");
			var i = 0;
			var uri = [];
			btns.each(function(){
				var href = $(this).attr("href") || "";

				if( href === "" || href.indexOf("lert(") > -1 )
					return false;

				var param = href.split("?").pop().split("#").shift().split("&");
				var itemUri = [];
				for( var k in param ){
					if( typeof param[k] === "function" || param[k].search(/^(sku|qty|seller)/i) < 0 )
						continue;
					itemUri.push( param[k] );
				}
				uri.push( itemUri.join("&") );

				i++;
			});

			if( i === btns.length )
				$(".product-qd-v1-buy-button a").attr( "href", "/checkout/cart/add?" + uri.join("&") + "&" + ( btns.first().attr("href").match(/sc=[0-9]+/i) || [""] )[0] );
		},
		skuItemClick: function () {
			$(".product-qd-v1-kit-item-row").bind("click", function () {
				Product.unavailableCheck();
				Product.setBuyUrl();
			});
		},
		dustRenderCallback: function () {
			var orig = window.dust.render;

			window.dust.render = function () {
				orig.apply(this, arguments);

				Product.unavailableCheck();
			}
		},
		unavailableCheck: function () {
			$(".product-qd-v1-kit-item-row").each(function () {
				var $t = $(this);
				if ($t.find(".sku-notifyme:visible").length)
					$t.addClass("qd-item-unavailable");
				else
					$t.removeClass("qd-item-unavailable");
			});
		},
		vtexSkuSelected: function () {
			$(window).bind(".kit-item-selects", function () {
				Product.setBuyUrl();
			});
		},
		showKitDescription: function () {
			$(".product-qd-v1-kit-details a").bind("click", function () {
				$('html, body').animate({
					scrollTop:
					Math.floor($(".product-qd-v1-specification .productName:contains('" +
						$(this).parents(".product-qd-v1-kit-item-row").find(".productName").text()
						+ "')").offset().top || 0)
				});

				return false;
			})
		},
		showKitImage: function () {
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
		}
	};

	var List = {
		run: function() {},
		init: function() {},
		ajaxStop: function() {},
		windowOnload: function() {}
	};

	var Institutional = {
		init: function() {},
		ajaxStop: function() {},
		windowOnload: function() {}
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

/* Automatizador de comments box do Facebook // 1.6 // Carlos Vinicius [Quatro Digital] */
$(window).load(function () { var a = $(".fb-comments"); a.length && a.attr("data-href", document.location.href.split("#").shift().split("?").shift()); $("#fb-root").length || $("body").append('<div id="fb-root"></div>'); if (!$("script#facebook-jssdk").length) { a = $("meta[property='fb:app_id']").attr("content") || !1; var b, c = document.getElementsByTagName("script")[0]; document.getElementById("facebook-jssdk") || (b = document.createElement("script"), b.id = "facebook-jssdk", b.src = "//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3" + (a ? "&appId=" + a : ""), c.parentNode.insertBefore(b, c)) } "undefined" !== typeof FB && "undefined" !== typeof FB.XFBML && FB.XFBML.parse() });

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
/* Quatro Digital - jQuery Ajax Queue // 4.0 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT <http://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT> */
(function(d){if("function"!==typeof d.qdAjax){var a={};d.qdAjaxQueue=a;150>parseInt((d.fn.jquery.replace(/[^0-9]+/g,"")+"000").slice(0,3),10)&&console&&"function"==typeof console.error&&console.error();d.qdAjax=function(f){try{var b=d.extend({},{url:"",type:"GET",data:"",success:function(){},error:function(){},complete:function(){},clearQueueDelay:5},f),e;e="object"===typeof b.data?JSON.stringify(b.data):b.data.toString();var c=encodeURIComponent(b.url+"|"+b.type+"|"+e);a[c]=a[c]||{};"undefined"==
typeof a[c].jqXHR?a[c].jqXHR=d.ajax(b):(a[c].jqXHR.done(b.success),a[c].jqXHR.fail(b.error),a[c].jqXHR.always(b.complete));a[c].jqXHR.always(function(){isNaN(parseInt(b.clearQueueDelay))||setTimeout(function(){a[c].jqXHR=void 0},b.clearQueueDelay)});return a[c].jqXHR}catch(g){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Problemas no $.qdAjax :( . Detalhes: "+g.message)}};d.qdAjax.version="4.0"}})(jQuery);
/* Quatro Digital - Scroll Toggle // 1.4 // Carlos Vinicius // Todos os direitos reservados */
(function(){var c=jQuery,e=function(a,d){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var b;"object"===typeof a?(a.unshift("[QD Scroll Toggle]\n"),b=a):b=["[QD Scroll Toggle]\n"+a];if("undefined"===typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===d.toLowerCase())try{console.info.apply(console,b)}catch(c){try{console.info(b.join("\n"))}catch(e){}}else try{console.error.apply(console,
b)}catch(h){try{console.error(b.join("\n"))}catch(k){}}else try{console.warn.apply(console,b)}catch(l){try{console.warn(b.join("\n"))}catch(m){}}}};"function"!==typeof c.QD_scrollToggle&&(c.QD_scrollToggle=function(a){var d=[];if("string"!==typeof a&&"number"!==typeof a||"auto"===a)if("auto"===a)d.push(c(window).height());else return e("N\u00e3o foi informado o limite de scroll necess\u00e1rio para adicionar o atributo.");else{var b=a.split(","),f;for(f in b)"function"!==typeof b[f]&&(a=parseInt(b[f].trim()),
isNaN(a)||d.push(a))}if(!d.length)return e("Aaeeeeeeee irm\u00e3o! N\u00e3o consegui encontrar nenhum valor para calcular o scroll");if(!document||!document.body||"undefined"===typeof document.body.setAttribute)return e('"document.body.setAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!document||!document.body||"undefined"===typeof document.body.removeAttribute)return e('"document.body.removeAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!document||!document.body||"undefined"===
typeof document.body.getAttribute)return e('"document.body.getAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!c(window).scrollTop||isNaN(parseInt(c(window).scrollTop())))return e('"$(window).scrollTop" n\u00e3o esta retornando um n\u00famero inteiro :(');try{document.body.setAttribute("data-qd-scroll",1),document.body.getAttribute("data-qd-scroll"),document.body.removeAttribute("data-qd-scroll"),document.body.getAttribute("data-qd-scroll")}catch(g){e("N\u00e3o foi poss\u00edvel fazer o passo a passo de consultar, adicionar e remover um atributo",
g.message)}c(window).scroll(function(){for(var a=0;a<d.length;a++)c(window).scrollTop()>d[a]?document.body.getAttribute("data-qd-scroll-"+a)||document.body.setAttribute("data-qd-scroll-"+a,1):document.body.getAttribute("data-qd-scroll-"+a)&&document.body.removeAttribute("data-qd-scroll-"+a)})},c(function(){var a=c("body[data-qd-scroll-limit]");a.length&&c.QD_scrollToggle(a.attr("data-qd-scroll-limit"))}))})();
/* Quatro Digital - Smart Price // 3.0 // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */

/*FUNÇÕES AUXILIARES*/
	"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});
	/*http://phpjs.org/functions/number_format/*/
	function qd_number_format(b,c,d,e){b=(b+"").replace(/[^0-9+\-Ee.]/g,"");b=isFinite(+b)?+b:0;c=isFinite(+c)?Math.abs(c):0;e="undefined"===typeof e?",":e;d="undefined"===typeof d?".":d;var a="",a=function(a,b){var c=Math.pow(10,b);return""+(Math.round(a*c)/c).toFixed(b)},a=(c?a(b,c):""+Math.round(b)).split(".");3<a[0].length&&(a[0]=a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,e));(a[1]||"").length<c&&(a[1]=a[1]||"",a[1]+=Array(c-a[1].length+1).join("0"));return a.join(d)};

(function(qdWindow) {
	"use strict";

	var $ = jQuery;

	if (typeof $.fn.QD_SmartPrice === "function") return;

	// Log
	var extTitle = "Smart Price";
	var log=function(c,b){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var a;"object"===typeof c?(c.unshift("["+extTitle+"]\n"),a=c):a=["["+extTitle+"]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,a)}catch(d){console.info(a.join("\n"))}else try{console.error.apply(console,a)}catch(e){console.error(a.join("\n"))}else try{console.warn.apply(console, a)}catch(f){console.warn(a.join("\n"))}}};

	// padrões do aplicativo
	var isDiscountFlagRegex = /[0-9]+\%/i;
	var getDiscountValueRegex = /[0-9\.]+(?=\%)/i;
	var defaults = {
		// Função que validade se a flag atual é a flag com o valor do desconto, retorna um valor booleano
		isDiscountFlag: function($flag) {
			if ($flag.text().search(isDiscountFlagRegex) > -1)
				return true;

			return false;
		},
		// Função para retornar o valor concedido pelo desconto. O retorno deve ser um númerico. Exemplo: "Desconto de 15%" o retorno deve ser "15"
		getDiscountValue: function($flag) {
			return $flag.text().match(getDiscountValueRegex);
		},
		// Define que o plugin foi iniciado pelo wrapper e não pela flag. Útil para quando o produto não possui nenhuma .flag mas é necessário que ele seja processado
		startedByWrapper: false,
		// Caso o 'startedByWrapper' seja tru, você pode customizar quem será o elemento com a flag
		flagElement: '.flag',
		// Elemento pai do preço do produto e da flag de desconto (vitrines)
		wrapperElement: "li",
		// String com o seletor jQuery que será utilizado para filtar as flags "<p>"
		filterFlagBy: "[class*='desconto']",
		// Este parametro espera que seja passado um string com um p.flag simulando uma promoção de 0%. Ele é utilizado quando é preciso exibir o SmartPrice mesmo para produtos que não possuem uma promoção atrelada.
		// Exemplo da string esperada: '<p class="flag desconto-0-">desconto 0%</p>'
		forcePromotion: null,
		// Este parametro recebe a informação de desconto que já esta aplicada ao produto, ou seja se a promoção afeta o preço da prateleira e a VTEX já exibe com desconto essa opção auxilia a calcular o valor correto para o desconto do boleto
		// Pode ser informado um seletor jQuery, um elemento jQuery ou um valor numerico correspondente ao desconto.
		appliedDiscount: null,
		// Parametro que define se o produto sera ignorado após possuir a primeira flag processada
		oneFlagByItem: true,
		// Define se o plugin esta executando em um abiente SmartCheckout
		/*DESCONTINUADO*/
		isSmartCheckout: true,
		// Booleano que define se será calculado o valor da parcela com base no preço com desconto
		changeInstallments: false,
		// Definições específicas para a página de produto
		productPage: {
			// Booleano que define se o economize do controle nativo da VTEX será alterado pelo plugin, somente na página de produto
			changeNativeSaveAmount: true,
			// Booleano que define se o preço do controle nativo da VTEX será alterado pelo plugin, somente na página de produto
			changeNativePrice: true,
			// Booleano que define se será calculado o valor da parcela com base no preço com desconto
			changeInstallments: false,
			// booleano informando se o script esta sendo chamado em uma página de produto
			isProductPage: "auto",
			// Elemento pai do preço do produto e da flag de desconto (tela de produto)
			wrapperElement: ".productRightColumn",
			// Seletor do elemento com o preço nativo do produto
			skuBestPrice: "strong.skuBestPrice",
			// Seletor para o elemento de quantidade de parcelas nativo da VTEX
			installments: "label.skuBestInstallmentNumber",
			// Seletor para o elemento de valor das parcelas nativo da VTEX
			installmentValue: "label.skuBestInstallmentValue",
			// Seletor do elemento que exibe o preço à vista do produto. Caso não queira que esse item seja modificado passe "null" como valor
			skuPrice: "strong.skuPrice"
		}
	};

	$.fn.QD_SmartPrice = function() {};
	// Validação de dominio - p/ debugar use a query string: qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82=debug
	var qdAuthorize=function(c){
		// chave do dominio
		var f={
			//nomeloja.com.br(paulinhomotos)
			"j":"jj%25C2%25A8abzrybwn%25C2%25A8pbz%25C2%25A8oe",
			"ab":"zrybwn%25C2%25A8pbz%25C2%25A8oe",
			"cnh":"yvaubzbgbf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe",
			"cnhy":"vaubzbgbf%25C2%25A8igrkpbzzreprorgn%25C2%25A8pbz%25C2%25A8oe",
			"cnhyv":"aubzbgbf%25C2%25A8igrkpbzzreprfgnoyr%25C2%25A8pbz%25C2%25A8oe",
			"cnhyva":"ubzbgbf%25C2%25A8igrk%25C2%25A8dhngebqvtvgny%25C2%25A8pbz%25C2%25A8oe",
			"jjj%25C":"2%25A8cnhyvaubzbgbf%25C2%25A8igrkpbzzreprorgn%25C2%25A8pbz%25C2%25A8oe",
			"jjj%25C2":"%25A8cnhyvaubzbgbf%25C2%25A8igrkpbzzreprfgnoyr%25C2%25A8pbz%25C2%25A8oe"
		};
		return function(c){var d,b,a,g;b=function(a){return a};a=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o","b"];
		c=c["d"+a[16]+"c"+a[17]+"m"+b(a[1])+"n"+a[13]]["l"+a[18]+"c"+a[0]+"ti"+b("o")+"n"];d=function(a){return escape(encodeURIComponent(a.replace(/\./g,"\u00a8").replace(/[a-zA-Z]/g,function(a){return String.fromCharCode(("Z">=a?90:122)>=(a=a.charCodeAt(0)+13)?a:a-26)})))};var h=d(c[[a[9],b("o"),a[12],a[b(13)]].join("")]);d=d((window[["js",b("no"),"m",a[1],a[4].toUpperCase(),"ite"].join("")]||"---")+[".v",a[13],"e",b("x"),"co",b("mm"),"erc",a[1],".c",b("o"),"m.",a[19],"r"].join(""));for(var e in f){if(d===
		e+f[e]||h===e+f[e]){g="tr"+a[17]+"e";break}g="f"+a[0]+"ls"+b(a[1])+""}b=!1;-1<c[[a[12],"e",a[0],"rc",a[9]].join("")].indexOf("qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82")&&(b=!0);return[g,b]}(c)
	}(window);
	if(!eval(qdAuthorize[0]))return qdAuthorize[1]?log("\u0e17\u00c3\u0472 \u221a\u0391\u2113\u00a1\u2202\u0391\u2202\u0472 \u03a1\u0391\u0ae8\u0391 \u0aef\u0abd\u01ac\u0391 L\u0472J\u0391!"):!1;

	var smartPrice = function($elem, options) {
		"use strict";

		// Função que processa cada item. É esperado que seja um p.flag
		var processItem = function(noFilter) {
			"use strict";

			var discount, discountStr, skuData, price, oldPrice, newPrice, skuPrice, skuBestPrice, priceStr, oldPriceStr, saveAmount, input, productPrice, appliedDiscount, appliedDiscountElem, productAvailable, productAvailableCount, isProductWrapper, displayPrice;
			var $t = $(this);

			// Verificando se foi passado algo informando que é para ignorar o filtro da flag
			noFilter = typeof noFilter === "undefined"? false: noFilter;

			// Obtendo a "li" do produto corrente ou o elemento passado por parametro
			if(options.productPage.isProductPage)
				var wrapper = $t.closest(options.productPage.wrapperElement);
			else 
				var wrapper = $t.closest(options.wrapperElement);

			// Verificando se a flag é aprovada no filtro passado por parametro
			if (!noFilter && !$t.is(options.filterFlagBy)) {
				if (options.productPage.isProductPage && wrapper.is(options.productPage.wrapperElement)) {
					// Informa que o preço pode ser exibido
					wrapper.find(options.productPage.skuBestPrice).addClass("qd-active");
					wrapper.addClass("qd-sp-active");
				}

				return;
			}

			// Armazenando se esta é uma página de produto
			var isPriceProductPage = options.productPage.isProductPage;

			// Verificando se o item já foi executado
			if ($t.is(".qd_sp_on, .qd_sp_ignored") && !isPriceProductPage)
				return;

			// Obtendo os elementos de preço na tela de produto
			if (isPriceProductPage) {
				skuBestPrice = wrapper.find(options.productPage.skuBestPrice);

				if (skuBestPrice.find(".qd_active").length)
					return;

				// Informando que o preço ainda não esta pronto
				skuBestPrice.removeClass("qd-active");
				wrapper.removeClass("qd-sp-active");
			}

			// Verificando se as flags irmãs já foram executadas e caso o plugin esteja configurado para executar apenas uma vez por item a execução terminará por aqui
			if (options.oneFlagByItem && $t.siblings(".qd_sp_on").length) {
				// Adiconando classe de ignorado por conta da irmã
				$t.addClass('qd_sp_ignored');
				return;
			}

			// Adicionando a classe de verificado
			$t.addClass('qd_sp_on');

			// verificando se o p.flag é um de desconto, se não for, nem continuamos e vamos p/ a próxima
			if (!options.isDiscountFlag($t))
				return;

			// Verificando se foi passado os dados do SKU para calculo de preço e etc
			if (isPriceProductPage) {
				// Obtendo o preço do primeiro SKU disponível
				skuData = {};
				var idSkuShipping = parseInt($("div[skuCorrente]:first").attr("skuCorrente"), 10);

				if (idSkuShipping) {
					for (var l = 0; l < skuJson.skus.length; l++) {
						if(skuJson.skus[l].sku == idSkuShipping){
							skuData = skuJson.skus[l];
							break;
						}
					}
				}
				else {
					var skuLowerPrice = 99999999999999;
					for (var i in skuJson.skus) {
						if (typeof skuJson.skus[i] === "function")
							continue;

						if (!skuJson.skus[i].available)
							continue;

						if(skuJson.skus[i].bestPrice < skuLowerPrice){
							skuLowerPrice = skuJson.skus[i].bestPrice;
							skuData = skuJson.skus[i];
						}
					}
				}
			}

			// Verificando se o produto esta disponível. Apenas para smart Checkout
			productAvailable = true;
			productAvailableCount = 0;
			if (options.isSmartCheckout && isProductWrapper) {
				productAvailable = skuJson.available;
				// Adicionando classe de produto indisponível ao wrapper
				if (!productAvailable)
					return wrapper.addClass("qd-sp-product-unavailable");
			}

			// Obtendo o valor do desconto
			discountStr = options.getDiscountValue($t);
			// Verificando se realmente é um número
			discount = parseFloat(discountStr, 10);
			if (isNaN(discount)) return log(["O valor informado p/ o desconto não é um número.", $t], "alerta");

			// Função que faz o cálculo do preço após todas as validaçoes
			var calculatePrice = function(skuData) {
				// Obtendo o preço do produto que é informado pela VTEX

				if (isPriceProductPage)
					price = (skuData.bestPrice || 0) / 100;
				else{
					// Input com o preço do produto
					productPrice = wrapper.find(".qd_productPrice");
					price = parseFloat((productPrice.val() || "").replace(/[^0-9\.\,]+/i, "").replace(".", "").replace(",", "."), 10);
				}
				// Verificando se foi possível obter o preço
				if (isNaN(price))
					return log(["Por alguma razão não consegui obter o preço deste produto :(", $t, wrapper]);

				// Verificando se foi informado que este preço já possui um desconto aplicado
				if (options.appliedDiscount !== null) {
					appliedDiscount = 0;

					// Verificando se foi passado um valor número ou não
					if (!isNaN(options.appliedDiscount))
						appliedDiscount = options.appliedDiscount;
					else {
						// Caso não seja passado um valor numérico sera considerado um elemento jQuery
						appliedDiscountElem = wrapper.find(options.appliedDiscount);
						if (appliedDiscountElem.length)
							appliedDiscount = options.getDiscountValue(appliedDiscountElem);
					}

					// Verificando se o valor do desconto realmente é um número
					appliedDiscount = parseFloat(appliedDiscount, 10);
					if (isNaN(appliedDiscount))
						appliedDiscount = 0;

					// Fazendo o cálculo do preço real do produto sem o efeito do desconto aplicado pela VTEX
					if (appliedDiscount !== 0)
						price = price * 100 / (100 - appliedDiscount);
				}

				// Preço anterior do produto
				if (isPriceProductPage)
					oldPrice = (skuData.listPrice || 0) / 100;
				else
					oldPrice = parseFloat((wrapper.find(".qd_productOldPrice").val() || "").replace(/[^0-9\.\,]+/i, "").replace(".", "").replace(",", "."), 10);
				// Verificando se foi possível obter o preço anterior
				if (isNaN(oldPrice))
					oldPrice = 0.001;

				// Inserindo o preço final
				newPrice = price * ((100 - discount) / 100);
				if (isPriceProductPage && options.productPage.changeNativePrice) {
					skuBestPrice.text(skuBestPrice.text().trim().replace(/[0-9\.]+\,[0-9]+/, qd_number_format(newPrice, 2, ",", "."))).addClass("qd-active");
					wrapper.addClass("qd-sp-active");
				}
				else {
					displayPrice = wrapper.find(".qd_displayPrice");
					displayPrice.text(displayPrice.text().replace(/[0-9\.]+,[0-9]+/i, "") + qd_number_format(newPrice, 2, ",", "."));
				}

				// Atualizando o elemento de preço à vista da VTEX
				if (isPriceProductPage) {
					skuPrice = wrapper.find(options.productPage.skuPrice);
					if (skuPrice.length)
						skuPrice.text(skuPrice.text().trim().replace(/[0-9\.]+\,[0-9]+/, qd_number_format(newPrice, 2, ",", ".")));
				}

				// Informando o valor concedido pelo desconto
				var displayDiscount = wrapper.find(".qd-sp-display-discount");
				displayDiscount.text(displayDiscount.text().replace(/[0-9]+\%/i, discount + "%"));

				// Função que altera o parcelamento
				var changeInstallments = function(installmentsSel, installmentValueSel, shelf) {
					// Quantidade de parcelas
					var installments = wrapper.find(installmentsSel);
					if (installments.length)
						installments.html(installments.html().trim().replace(/[0-9]{1,2}/, shelf ? shelf : (skuData.installments || 0)));
					// Valor das parcelas
					var installmentValue = wrapper.find(installmentValueSel);
					if (installmentValue.length)
						installmentValue.html(installmentValue.html().trim().replace(/[0-9\.]+\,[0-9]+/, qd_number_format(newPrice / (shelf ? shelf : (skuData.installments || 1)), 2, ",", ".")));
				};
				// Atualizando as informações de parcelamento na página de produto
				if (isPriceProductPage && options.productPage.changeInstallments)
					changeInstallments(options.productPage.installments, options.productPage.installmentValue);
				else if (options.changeInstallments)
					changeInstallments(".qd_sp_display_installments", ".qd_sp_display_installmentValue", (parseInt(wrapper.find(".qd_sp_installments").val() || 1) || 1));

				// Calculando o "economize"
				wrapper.find(".qd_saveAmount").append(qd_number_format(oldPrice - newPrice, 2, ",", "."));
				wrapper.find(".qd_saveAmountPercent").prepend(qd_number_format((oldPrice - newPrice) * 100 / oldPrice, 2, ",", "."));
				if (isPriceProductPage && options.productPage.changeNativeSaveAmount) {
					$("em.economia-de").each(function() {
						saveAmount = $(this);
						saveAmount.text(saveAmount.text().trim().replace(/[0-9\.]+\,[0-9]+/, qd_number_format(oldPrice - newPrice, 2, ",", ".")));
						saveAmount.addClass("qd-active");
					});
				}
			};
			calculatePrice(skuData);

			// Quando o SKU é alterado na tela de produto, eu faço o cálculo do preço novamente
			if(isPriceProductPage)
				$(window).on("skuSelected.vtex", function(e, prod, sku) {
					calculatePrice(sku);
				});

			// Adicionamos uma classe ao wrapper informando que já passamos por ele
			wrapper.addClass("qd_sp_processedItem");
			// Informamos tbm que já passamos pelo input do preço real
			if(!isPriceProductPage)
				productPrice.addClass("qd_sp_processedItem");
		};

		// Percorrendo todos os elementos passados. É esperado que sejam os p.flag
		(options.startedByWrapper? $elem.find(options.flagElement): $elem).each(function() {
			processItem.call(this, false);
		});

		// Verificando se é para forçar uma promoção
		if (typeof options.forcePromotion == "string"){
			var wrapper = options.startedByWrapper? $elem: $elem.closest(options.wrapperElement);

			if(options.productPage.isProductPage)
				wrapper = wrapper.closest(options.productPage.wrapperElement).not('.qd_sp_processedItem');
			else
				wrapper = wrapper.find(".qd_productPrice:not(.qd_sp_processedItem)");

			// Percorrendo todos os inputs de preço original para verificar se nenhum ficou sem ser processando e então é feito uma nova varredura
			wrapper.each(function() {
				// Adiciona uma p.flag forçando um desconto de zero porcento
				var pElem = $(options.forcePromotion);
				pElem.attr("style", "display:none !important;");
				
				if(options.productPage.isProductPage)
					$(this).append(pElem);
				else
					$(this).after(pElem);

				processItem.call(pElem, true);
			});
		}
	};

	$.fn.QD_SmartPrice = function(opts) {
		var $t = $(this);

		if(!$t.length)
			return $t;

		var options = $.extend(true, {}, defaults, opts);

		// Verificando se a opção de de tipo de página esta definida
		if (typeof options.productPage.isProductPage != "boolean")
			options.productPage.isProductPage = $(document.body).is(".produto");

		smartPrice($t, options);

		return $t;
	};
})(this);
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

/* Quatro Digital Amazing Menu */
var _0x493b=['alerta','aviso','toLowerCase','apply','join','qdAmAddNdx','each','qd-am-li-','first','addClass','qd-am-first','last','qd-am-last','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','ite','---','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-collection-wrapper','qdAjax','url','html','find','data-qdam-value','.box-banner','clone','insertBefore','hide','qd-am-content-loaded','text','trim','attr','[class*=\x27colunas\x27]','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','QuatroDigital.am.ajaxCallback','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','qd-am-elem-','replaceSpecialChars','>li','qd-amazing-menu','>ul','qd-am-dropdown-menu','qd-am-dropdown','children','qd-am-level-','add','-li','callback','QuatroDigital.am.callback','extend','exec','.qd_amazing_menu_auto','getParent','closest','function','QD_amazingMenu','/qd-amazing-menu','object','undefined','error','info','warn','unshift','[QD\x20Amazing\x20Menu]\x0a'];(function(_0x49a5d0,_0x295990){var _0x29ecb4=function(_0x51da73){while(--_0x51da73){_0x49a5d0['push'](_0x49a5d0['shift']());}};_0x29ecb4(++_0x295990);}(_0x493b,0x128));var _0xb493=function(_0x5c8e4c,_0x261e73){_0x5c8e4c=_0x5c8e4c-0x0;var _0xaab991=_0x493b[_0x5c8e4c];return _0xaab991;};(function(_0x409a4a){_0x409a4a['fn'][_0xb493('0x0')]=_0x409a4a['fn'][_0xb493('0x1')];}(jQuery));(function(_0x5675e3){var _0x3dc758;var _0x5a5d1b=jQuery;if(_0xb493('0x2')!==typeof _0x5a5d1b['fn'][_0xb493('0x3')]){var _0x254a61={'url':_0xb493('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0x201fbf=function(_0x1ed245,_0x2c28c2){if(_0xb493('0x5')===typeof console&&_0xb493('0x6')!==typeof console[_0xb493('0x7')]&&'undefined'!==typeof console[_0xb493('0x8')]&&_0xb493('0x6')!==typeof console[_0xb493('0x9')]){var _0x35bd6f;'object'===typeof _0x1ed245?(_0x1ed245[_0xb493('0xa')](_0xb493('0xb')),_0x35bd6f=_0x1ed245):_0x35bd6f=[_0xb493('0xb')+_0x1ed245];if('undefined'===typeof _0x2c28c2||_0xb493('0xc')!==_0x2c28c2['toLowerCase']()&&_0xb493('0xd')!==_0x2c28c2[_0xb493('0xe')]())if(_0xb493('0x6')!==typeof _0x2c28c2&&_0xb493('0x8')===_0x2c28c2[_0xb493('0xe')]())try{console[_0xb493('0x8')][_0xb493('0xf')](console,_0x35bd6f);}catch(_0x5adabc){try{console[_0xb493('0x8')](_0x35bd6f[_0xb493('0x10')]('\x0a'));}catch(_0x570366){}}else try{console['error'][_0xb493('0xf')](console,_0x35bd6f);}catch(_0xbc5b46){try{console[_0xb493('0x7')](_0x35bd6f[_0xb493('0x10')]('\x0a'));}catch(_0x590e73){}}else try{console['warn'][_0xb493('0xf')](console,_0x35bd6f);}catch(_0x545b4c){try{console[_0xb493('0x9')](_0x35bd6f[_0xb493('0x10')]('\x0a'));}catch(_0x182619){}}}};_0x5a5d1b['fn'][_0xb493('0x11')]=function(){var _0x136266=_0x5a5d1b(this);_0x136266[_0xb493('0x12')](function(_0x4624e5){_0x5a5d1b(this)['addClass'](_0xb493('0x13')+_0x4624e5);});_0x136266[_0xb493('0x14')]()[_0xb493('0x15')](_0xb493('0x16'));_0x136266[_0xb493('0x17')]()[_0xb493('0x15')](_0xb493('0x18'));return _0x136266;};_0x5a5d1b['fn'][_0xb493('0x3')]=function(){};_0x5675e3=function(_0x3dcbaa){var _0x1ed5df={'t':_0xb493('0x19')};return function(_0x3233bd){var _0xf8e18c=function(_0x53a938){return _0x53a938;};var _0xc800f2=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3233bd=_0x3233bd['d'+_0xc800f2[0x10]+'c'+_0xc800f2[0x11]+'m'+_0xf8e18c(_0xc800f2[0x1])+'n'+_0xc800f2[0xd]]['l'+_0xc800f2[0x12]+'c'+_0xc800f2[0x0]+'ti'+_0xf8e18c('o')+'n'];var _0x27dc40=function(_0x42f36c){return escape(encodeURIComponent(_0x42f36c[_0xb493('0x1a')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x583373){return String[_0xb493('0x1b')](('Z'>=_0x583373?0x5a:0x7a)>=(_0x583373=_0x583373[_0xb493('0x1c')](0x0)+0xd)?_0x583373:_0x583373-0x1a);})));};var _0x210328=_0x27dc40(_0x3233bd[[_0xc800f2[0x9],_0xf8e18c('o'),_0xc800f2[0xc],_0xc800f2[_0xf8e18c(0xd)]][_0xb493('0x10')]('')]);_0x27dc40=_0x27dc40((window[['js',_0xf8e18c('no'),'m',_0xc800f2[0x1],_0xc800f2[0x4]['toUpperCase'](),_0xb493('0x1d')]['join']('')]||_0xb493('0x1e'))+['.v',_0xc800f2[0xd],'e',_0xf8e18c('x'),'co',_0xf8e18c('mm'),'erc',_0xc800f2[0x1],'.c',_0xf8e18c('o'),'m.',_0xc800f2[0x13],'r'][_0xb493('0x10')](''));for(var _0x29ebd6 in _0x1ed5df){if(_0x27dc40===_0x29ebd6+_0x1ed5df[_0x29ebd6]||_0x210328===_0x29ebd6+_0x1ed5df[_0x29ebd6]){var _0x1af057='tr'+_0xc800f2[0x11]+'e';break;}_0x1af057='f'+_0xc800f2[0x0]+'ls'+_0xf8e18c(_0xc800f2[0x1])+'';}_0xf8e18c=!0x1;-0x1<_0x3233bd[[_0xc800f2[0xc],'e',_0xc800f2[0x0],'rc',_0xc800f2[0x9]][_0xb493('0x10')]('')]['indexOf'](_0xb493('0x1f'))&&(_0xf8e18c=!0x0);return[_0x1af057,_0xf8e18c];}(_0x3dcbaa);}(window);if(!eval(_0x5675e3[0x0]))return _0x5675e3[0x1]?_0x201fbf(_0xb493('0x20')):!0x1;var _0x5af8b2=function(_0x205f42){var _0x47d791=_0x205f42['find'](_0xb493('0x21'));var _0x248ab8=_0x47d791[_0xb493('0x22')](_0xb493('0x23'));var _0x5b1320=_0x47d791['filter'](_0xb493('0x24'));if(_0x248ab8['length']||_0x5b1320[_0xb493('0x25')])_0x248ab8[_0xb493('0x26')]()[_0xb493('0x15')]('qd-am-banner-wrapper'),_0x5b1320['parent']()[_0xb493('0x15')](_0xb493('0x27')),_0x5a5d1b[_0xb493('0x28')]({'url':_0x3dc758[_0xb493('0x29')],'dataType':_0xb493('0x2a'),'success':function(_0x4c5bcf){var _0x367a93=_0x5a5d1b(_0x4c5bcf);_0x248ab8[_0xb493('0x12')](function(){var _0x4c5bcf=_0x5a5d1b(this);var _0x261b56=_0x367a93[_0xb493('0x2b')]('img[alt=\x27'+_0x4c5bcf['attr'](_0xb493('0x2c'))+'\x27]');_0x261b56['length']&&(_0x261b56[_0xb493('0x12')](function(){_0x5a5d1b(this)[_0xb493('0x0')](_0xb493('0x2d'))[_0xb493('0x2e')]()[_0xb493('0x2f')](_0x4c5bcf);}),_0x4c5bcf[_0xb493('0x30')]());})[_0xb493('0x15')](_0xb493('0x31'));_0x5b1320['each'](function(){var _0x4c5bcf={};var _0x5e207d=_0x5a5d1b(this);_0x367a93[_0xb493('0x2b')]('h2')['each'](function(){if(_0x5a5d1b(this)[_0xb493('0x32')]()[_0xb493('0x33')]()['toLowerCase']()==_0x5e207d[_0xb493('0x34')](_0xb493('0x2c'))[_0xb493('0x33')]()[_0xb493('0xe')]())return _0x4c5bcf=_0x5a5d1b(this),!0x1;});_0x4c5bcf[_0xb493('0x25')]&&(_0x4c5bcf['each'](function(){_0x5a5d1b(this)[_0xb493('0x0')](_0xb493('0x35'))[_0xb493('0x2e')]()[_0xb493('0x2f')](_0x5e207d);}),_0x5e207d[_0xb493('0x30')]());})['addClass'](_0xb493('0x31'));},'error':function(){_0x201fbf(_0xb493('0x36')+_0x3dc758[_0xb493('0x29')]+_0xb493('0x37'));},'complete':function(){_0x3dc758[_0xb493('0x38')]['call'](this);_0x5a5d1b(window)['trigger'](_0xb493('0x39'),_0x205f42);},'clearQueueDelay':0xbb8});};_0x5a5d1b[_0xb493('0x3')]=function(_0x14a2a0){var _0x32f02d=_0x14a2a0[_0xb493('0x2b')]('ul[itemscope]')['each'](function(){var _0x7da0eb=_0x5a5d1b(this);if(!_0x7da0eb[_0xb493('0x25')])return _0x201fbf([_0xb493('0x3a'),_0x14a2a0],_0xb493('0xc'));_0x7da0eb['find'](_0xb493('0x3b'))[_0xb493('0x26')]()[_0xb493('0x15')](_0xb493('0x3c'));_0x7da0eb[_0xb493('0x2b')]('li')['each'](function(){var _0xa37679=_0x5a5d1b(this);var _0x5ba3c1=_0xa37679['children'](':not(ul)');_0x5ba3c1[_0xb493('0x25')]&&_0xa37679[_0xb493('0x15')](_0xb493('0x3d')+_0x5ba3c1[_0xb493('0x14')]()[_0xb493('0x32')]()['trim']()[_0xb493('0x3e')]()[_0xb493('0x1a')](/\./g,'')[_0xb493('0x1a')](/\s/g,'-')[_0xb493('0xe')]());});var _0x244a0b=_0x7da0eb[_0xb493('0x2b')](_0xb493('0x3f'))['qdAmAddNdx']();_0x7da0eb[_0xb493('0x15')](_0xb493('0x40'));_0x244a0b=_0x244a0b[_0xb493('0x2b')](_0xb493('0x41'));_0x244a0b[_0xb493('0x12')](function(){var _0x3fdf18=_0x5a5d1b(this);_0x3fdf18[_0xb493('0x2b')]('>li')[_0xb493('0x11')]()[_0xb493('0x15')]('qd-am-column');_0x3fdf18[_0xb493('0x15')](_0xb493('0x42'));_0x3fdf18[_0xb493('0x26')]()[_0xb493('0x15')](_0xb493('0x43'));});_0x244a0b[_0xb493('0x15')]('qd-am-dropdown');var _0x10c337=0x0,_0x5675e3=function(_0x362bf5){_0x10c337+=0x1;_0x362bf5=_0x362bf5['children']('li')[_0xb493('0x44')]('*');_0x362bf5['length']&&(_0x362bf5[_0xb493('0x15')](_0xb493('0x45')+_0x10c337),_0x5675e3(_0x362bf5));};_0x5675e3(_0x7da0eb);_0x7da0eb[_0xb493('0x46')](_0x7da0eb[_0xb493('0x2b')]('ul'))['each'](function(){var _0x2a8928=_0x5a5d1b(this);_0x2a8928[_0xb493('0x15')]('qd-am-'+_0x2a8928[_0xb493('0x44')]('li')[_0xb493('0x25')]+_0xb493('0x47'));});});_0x5af8b2(_0x32f02d);_0x3dc758[_0xb493('0x48')]['call'](this);_0x5a5d1b(window)['trigger'](_0xb493('0x49'),_0x14a2a0);};_0x5a5d1b['fn'][_0xb493('0x3')]=function(_0x502fb3){var _0x5b1267=_0x5a5d1b(this);if(!_0x5b1267['length'])return _0x5b1267;_0x3dc758=_0x5a5d1b[_0xb493('0x4a')]({},_0x254a61,_0x502fb3);_0x5b1267[_0xb493('0x4b')]=new _0x5a5d1b[(_0xb493('0x3'))](_0x5a5d1b(this));return _0x5b1267;};_0x5a5d1b(function(){_0x5a5d1b(_0xb493('0x4c'))[_0xb493('0x3')]();});}}(this));

/* Quatro Digital Smart Cart */
var _0x524a=['find','cartQtt','cartTotal','itemsText','emptyElem','emptyCart','qd-sc-populated','smartCheckout','_QuatroDigital_DropDown','vtexjs','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','shippingData','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','trigger','simpleCartCallback.quatro_digital','ReloadItemsCart','simpleCart','.qd_cart_auto','Oooops!\x20','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','QD_checkoutQueue','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','input.buy-in-page-quantity','javascript:','body','.productQuickView','Produto\x20adicionado\x20ao\x20carrinho!','href','#produto,\x20.produto','QD_buyButton','isSmartCheckout','qd-bb-click-active','click.qd_bb_buy_sc','clickBuySmartCheckout','preventDefault','Método\x20descontinuado!','buyButton','qd-sbb-on','.btn-add-buy-button-asynchronous','.remove-href','qd-bb-active','children','append','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','prodAdd','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','[href=\x27','attr','qd-bb-itemAddBuyButtonWrapper','qd-bb-itemAddCartWrapper','getCartInfoByUrl','função\x20descontinuada','autoWatchBuyButton','unbind','click','mouseenter.qd_bb_buy_sc','indexOf','selectSkuMsg','execDefaultAction','redirect=false','buyIfQuantityZeroed','test','match','push','productPageCallback','buyButtonClickCallback','ku=','pop','shift','asyncCallback','productAddedToCart','fakeRequest','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','Callback\x20não\x20é\x20uma\x20função','.qd-bb-itemAddWrapper','prepend','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','ajaxSend','/checkout/cart/add','bind','productAddedToCart.qdSbbVtex','QuatroDigital.qd_bb_prod_add','ajaxStop','abs','Callbacks','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','QD_dropDownCart','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','name','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20input','val','keyup.qd_ddc_cep','updateOnlyHover','allowUpdate','cartIsEmpty','texts','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','#total','.qd_ddc_continueShopping','continueShopping','linkCheckout','.qd-ddc-infoTotal','shippingForm','.qd-ddc-emptyCart\x20p','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','.qd-ddc-infoAllTotal','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','_QuatroDigital_AmountProduct','exec','qd-ddc-prodLoaded','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','qd-ddc-','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','.qd-ddc-quantity','quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','[data-sku=\x27','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku-index','changeQantity','data-sku','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','click.qd_ddc_more','qd-loading','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','removeProduct','stop','slideUp','remove','calculateShipping','BRA','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','buyButtonClicked','quickViewUpdate','allowRecalculate','productId','prod_','prodId','.qd-bap-wrapper','.qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','qd-bap-item-added','.qdDdcContainer','dropDown','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','closest','replace','undefined','pow','toFixed','round','split','length','join','prototype','trim','function','capitalize','toUpperCase','slice','qdAjax','qdAjaxQueue','jquery','error','extend','object','data','stringify','toString','url','type','jqXHR','ajax','done','success','fail','always','complete','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','message','version','4.0','checkout','getOrderForm','call','QuatroDigital_simpleCart','warn','[Simple\x20Cart]\x0a','info','toLowerCase','QD_simpleCart','elements','add','.qd_cart_qtt','.qd_items_text','meta[name=currency]','content','each','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','Shipping','value','total','shipping','allTotal','qtt','items','callback','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','hide','filter','.singular','.plural','show','addClass','removeClass','qd-emptyCart','$this','O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','alerta','cartTotalE','html','cartQttE','itemsTextE'];(function(_0x3d14e8,_0x1582fc){var _0x40914a=function(_0x50897f){while(--_0x50897f){_0x3d14e8['push'](_0x3d14e8['shift']());}};_0x40914a(++_0x1582fc);}(_0x524a,0xf5));var _0xa524=function(_0x348017,_0x534e32){_0x348017=_0x348017-0x0;var _0x3c3d99=_0x524a[_0x348017];return _0x3c3d99;};(function(_0x6366f7){_0x6366f7['fn'][_0xa524('0x0')]=_0x6366f7['fn'][_0xa524('0x1')];}(jQuery));function qd_number_format(_0x3d238d,_0x53c48c,_0x4a29b7,_0x2ef77c){_0x3d238d=(_0x3d238d+'')[_0xa524('0x2')](/[^0-9+\-Ee.]/g,'');_0x3d238d=isFinite(+_0x3d238d)?+_0x3d238d:0x0;_0x53c48c=isFinite(+_0x53c48c)?Math['abs'](_0x53c48c):0x0;_0x2ef77c='undefined'===typeof _0x2ef77c?',':_0x2ef77c;_0x4a29b7=_0xa524('0x3')===typeof _0x4a29b7?'.':_0x4a29b7;var _0x5f472f='',_0x5f472f=function(_0x460738,_0x56bd0e){var _0x53c48c=Math[_0xa524('0x4')](0xa,_0x56bd0e);return''+(Math['round'](_0x460738*_0x53c48c)/_0x53c48c)[_0xa524('0x5')](_0x56bd0e);},_0x5f472f=(_0x53c48c?_0x5f472f(_0x3d238d,_0x53c48c):''+Math[_0xa524('0x6')](_0x3d238d))[_0xa524('0x7')]('.');0x3<_0x5f472f[0x0][_0xa524('0x8')]&&(_0x5f472f[0x0]=_0x5f472f[0x0][_0xa524('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x2ef77c));(_0x5f472f[0x1]||'')['length']<_0x53c48c&&(_0x5f472f[0x1]=_0x5f472f[0x1]||'',_0x5f472f[0x1]+=Array(_0x53c48c-_0x5f472f[0x1][_0xa524('0x8')]+0x1)[_0xa524('0x9')]('0'));return _0x5f472f['join'](_0x4a29b7);};'function'!==typeof String[_0xa524('0xa')][_0xa524('0xb')]&&(String[_0xa524('0xa')]['trim']=function(){return this['replace'](/^\s+|\s+$/g,'');});_0xa524('0xc')!=typeof String['prototype'][_0xa524('0xd')]&&(String['prototype'][_0xa524('0xd')]=function(){return this['charAt'](0x0)[_0xa524('0xe')]()+this[_0xa524('0xf')](0x1)['toLowerCase']();});(function(_0x2d8bdb){if(_0xa524('0xc')!==typeof _0x2d8bdb[_0xa524('0x10')]){var _0x1de01e={};_0x2d8bdb[_0xa524('0x11')]=_0x1de01e;0x96>parseInt((_0x2d8bdb['fn'][_0xa524('0x12')][_0xa524('0x2')](/[^0-9]+/g,'')+'000')[_0xa524('0xf')](0x0,0x3),0xa)&&console&&_0xa524('0xc')==typeof console[_0xa524('0x13')]&&console[_0xa524('0x13')]();_0x2d8bdb[_0xa524('0x10')]=function(_0x805b93){try{var _0x562941=_0x2d8bdb[_0xa524('0x14')]({},{'url':'','type':'GET','data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x805b93);var _0x304dea=_0xa524('0x15')===typeof _0x562941[_0xa524('0x16')]?JSON[_0xa524('0x17')](_0x562941['data']):_0x562941['data'][_0xa524('0x18')]();var _0xc560dd=encodeURIComponent(_0x562941[_0xa524('0x19')]+'|'+_0x562941[_0xa524('0x1a')]+'|'+_0x304dea);_0x1de01e[_0xc560dd]=_0x1de01e[_0xc560dd]||{};_0xa524('0x3')==typeof _0x1de01e[_0xc560dd][_0xa524('0x1b')]?_0x1de01e[_0xc560dd]['jqXHR']=_0x2d8bdb[_0xa524('0x1c')](_0x562941):(_0x1de01e[_0xc560dd][_0xa524('0x1b')][_0xa524('0x1d')](_0x562941[_0xa524('0x1e')]),_0x1de01e[_0xc560dd][_0xa524('0x1b')][_0xa524('0x1f')](_0x562941[_0xa524('0x13')]),_0x1de01e[_0xc560dd]['jqXHR'][_0xa524('0x20')](_0x562941[_0xa524('0x21')]));_0x1de01e[_0xc560dd]['jqXHR']['always'](function(){isNaN(parseInt(_0x562941[_0xa524('0x22')]))||setTimeout(function(){_0x1de01e[_0xc560dd][_0xa524('0x1b')]=void 0x0;},_0x562941[_0xa524('0x22')]);});return _0x1de01e[_0xc560dd][_0xa524('0x1b')];}catch(_0x131356){'undefined'!==typeof console&&'function'===typeof console[_0xa524('0x13')]&&console[_0xa524('0x13')](_0xa524('0x23')+_0x131356[_0xa524('0x24')]);}};_0x2d8bdb['qdAjax'][_0xa524('0x25')]=_0xa524('0x26');}}(jQuery));(function(_0x4a5ca9){_0x4a5ca9['fn'][_0xa524('0x0')]=_0x4a5ca9['fn'][_0xa524('0x1')];}(jQuery));(function(){var _0x4c587b=jQuery;if(_0xa524('0xc')!==typeof _0x4c587b['fn']['simpleCart']){_0x4c587b(function(){var _0x24005e=vtexjs[_0xa524('0x27')][_0xa524('0x28')];vtexjs[_0xa524('0x27')][_0xa524('0x28')]=function(){return _0x24005e[_0xa524('0x29')]();};});try{window[_0xa524('0x2a')]=window[_0xa524('0x2a')]||{};window[_0xa524('0x2a')]['ajaxStopOn']=!0x1;_0x4c587b['fn']['simpleCart']=function(_0x1b39f1,_0x52dd9f,_0x4a9e32){var _0x46af1b=function(_0x5ffa3e,_0x35a9ae){if(_0xa524('0x15')===typeof console){var _0x541ad2='object'===typeof _0x5ffa3e;_0xa524('0x3')!==typeof _0x35a9ae&&'alerta'===_0x35a9ae['toLowerCase']()?_0x541ad2?console[_0xa524('0x2b')](_0xa524('0x2c'),_0x5ffa3e[0x0],_0x5ffa3e[0x1],_0x5ffa3e[0x2],_0x5ffa3e[0x3],_0x5ffa3e[0x4],_0x5ffa3e[0x5],_0x5ffa3e[0x6],_0x5ffa3e[0x7]):console[_0xa524('0x2b')](_0xa524('0x2c')+_0x5ffa3e):_0xa524('0x3')!==typeof _0x35a9ae&&_0xa524('0x2d')===_0x35a9ae[_0xa524('0x2e')]()?_0x541ad2?console[_0xa524('0x2d')](_0xa524('0x2c'),_0x5ffa3e[0x0],_0x5ffa3e[0x1],_0x5ffa3e[0x2],_0x5ffa3e[0x3],_0x5ffa3e[0x4],_0x5ffa3e[0x5],_0x5ffa3e[0x6],_0x5ffa3e[0x7]):console[_0xa524('0x2d')](_0xa524('0x2c')+_0x5ffa3e):_0x541ad2?console[_0xa524('0x13')]('[Simple\x20Cart]\x0a',_0x5ffa3e[0x0],_0x5ffa3e[0x1],_0x5ffa3e[0x2],_0x5ffa3e[0x3],_0x5ffa3e[0x4],_0x5ffa3e[0x5],_0x5ffa3e[0x6],_0x5ffa3e[0x7]):console['error']('[Simple\x20Cart]\x0a'+_0x5ffa3e);}};var _0x31473e=_0x4c587b(this);_0xa524('0x15')===typeof _0x1b39f1?_0x52dd9f=_0x1b39f1:(_0x1b39f1=_0x1b39f1||!0x1,_0x31473e=_0x31473e['add'](_0x4c587b[_0xa524('0x2f')]['elements']));if(!_0x31473e[_0xa524('0x8')])return _0x31473e;_0x4c587b[_0xa524('0x2f')]['elements']=_0x4c587b[_0xa524('0x2f')][_0xa524('0x30')][_0xa524('0x31')](_0x31473e);_0x4a9e32='undefined'===typeof _0x4a9e32?!0x1:_0x4a9e32;var _0x42efb5={'cartQtt':_0xa524('0x32'),'cartTotal':'.qd_cart_total','itemsText':_0xa524('0x33'),'currencySymbol':(_0x4c587b(_0xa524('0x34'))['attr'](_0xa524('0x35'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x31d21d=_0x4c587b['extend']({},_0x42efb5,_0x52dd9f);var _0x63e628=_0x4c587b('');_0x31473e[_0xa524('0x36')](function(){var _0x186395=_0x4c587b(this);_0x186395[_0xa524('0x16')](_0xa524('0x37'))||_0x186395[_0xa524('0x16')](_0xa524('0x37'),_0x31d21d);});var _0xcda15c=function(_0x33755c){window[_0xa524('0x38')]=window[_0xa524('0x38')]||{};for(var _0x1b39f1=0x0,_0x1dc2c4=0x0,_0x52d281=0x0;_0x52d281<_0x33755c[_0xa524('0x39')][_0xa524('0x8')];_0x52d281++)_0xa524('0x3a')==_0x33755c[_0xa524('0x39')][_0x52d281]['id']&&(_0x1dc2c4+=_0x33755c[_0xa524('0x39')][_0x52d281][_0xa524('0x3b')]),_0x1b39f1+=_0x33755c[_0xa524('0x39')][_0x52d281][_0xa524('0x3b')];window[_0xa524('0x38')][_0xa524('0x3c')]=_0x31d21d['currencySymbol']+qd_number_format(_0x1b39f1/0x64,0x2,',','.');window[_0xa524('0x38')][_0xa524('0x3d')]=_0x31d21d['currencySymbol']+qd_number_format(_0x1dc2c4/0x64,0x2,',','.');window[_0xa524('0x38')][_0xa524('0x3e')]=_0x31d21d['currencySymbol']+qd_number_format((_0x1b39f1+_0x1dc2c4)/0x64,0x2,',','.');window['_QuatroDigital_CartData']['qtt']=0x0;if(_0x31d21d['showQuantityByItems'])for(_0x52d281=0x0;_0x52d281<_0x33755c['items'][_0xa524('0x8')];_0x52d281++)window[_0xa524('0x38')][_0xa524('0x3f')]+=_0x33755c[_0xa524('0x40')][_0x52d281]['quantity'];else window[_0xa524('0x38')][_0xa524('0x3f')]=_0x33755c[_0xa524('0x40')][_0xa524('0x8')]||0x0;try{window['_QuatroDigital_CartData'][_0xa524('0x41')]&&window[_0xa524('0x38')][_0xa524('0x41')][_0xa524('0x42')]&&window[_0xa524('0x38')]['callback'][_0xa524('0x42')]();}catch(_0xc3b40b){_0x46af1b(_0xa524('0x43'));}_0x3a374f(_0x63e628);};var _0x150428=function(_0x10e1ba,_0x3d2676){0x1===_0x10e1ba?_0x3d2676[_0xa524('0x44')]()[_0xa524('0x45')](_0xa524('0x46'))['show']():_0x3d2676['hide']()[_0xa524('0x45')](_0xa524('0x47'))[_0xa524('0x48')]();};var _0x1d444e=function(_0x8d2011){0x1>_0x8d2011?_0x31473e[_0xa524('0x49')]('qd-emptyCart'):_0x31473e[_0xa524('0x4a')](_0xa524('0x4b'));};var _0xbe44b2=function(_0x38942b,_0x24c7ef){var _0x451bbe=parseInt(window['_QuatroDigital_CartData'][_0xa524('0x3f')],0xa);_0x24c7ef[_0xa524('0x4c')][_0xa524('0x48')]();isNaN(_0x451bbe)&&(_0x46af1b(_0xa524('0x4d'),_0xa524('0x4e')),_0x451bbe=0x0);_0x24c7ef[_0xa524('0x4f')][_0xa524('0x50')](window[_0xa524('0x38')][_0xa524('0x3c')]);_0x24c7ef[_0xa524('0x51')][_0xa524('0x50')](_0x451bbe);_0x150428(_0x451bbe,_0x24c7ef[_0xa524('0x52')]);_0x1d444e(_0x451bbe);};var _0x3a374f=function(_0x90db67){_0x31473e[_0xa524('0x36')](function(){var _0x5e9919={};var _0x1264f5=_0x4c587b(this);_0x1b39f1&&_0x1264f5[_0xa524('0x16')]('qd_simpleCartOpts')&&_0x4c587b['extend'](_0x31d21d,_0x1264f5[_0xa524('0x16')](_0xa524('0x37')));_0x5e9919[_0xa524('0x4c')]=_0x1264f5;_0x5e9919[_0xa524('0x51')]=_0x1264f5[_0xa524('0x53')](_0x31d21d[_0xa524('0x54')])||_0x63e628;_0x5e9919[_0xa524('0x4f')]=_0x1264f5['find'](_0x31d21d[_0xa524('0x55')])||_0x63e628;_0x5e9919[_0xa524('0x52')]=_0x1264f5[_0xa524('0x53')](_0x31d21d[_0xa524('0x56')])||_0x63e628;_0x5e9919[_0xa524('0x57')]=_0x1264f5['find'](_0x31d21d[_0xa524('0x58')])||_0x63e628;_0xbe44b2(_0x90db67,_0x5e9919);_0x1264f5['addClass'](_0xa524('0x59'));});};(function(){if(_0x31d21d[_0xa524('0x5a')]){window[_0xa524('0x5b')]=window[_0xa524('0x5b')]||{};if(_0xa524('0x3')!==typeof window[_0xa524('0x5b')][_0xa524('0x28')]&&(_0x4a9e32||!_0x1b39f1))return _0xcda15c(window['_QuatroDigital_DropDown']['getOrderForm']);if(_0xa524('0x15')!==typeof window[_0xa524('0x5c')]||_0xa524('0x3')===typeof window['vtexjs'][_0xa524('0x27')])if(_0xa524('0x15')===typeof vtex&&'object'===typeof vtex[_0xa524('0x27')]&&_0xa524('0x3')!==typeof vtex[_0xa524('0x27')][_0xa524('0x5d')])new vtex[(_0xa524('0x27'))][(_0xa524('0x5d'))]();else return _0x46af1b(_0xa524('0x5e'));_0x4c587b['QD_checkoutQueue']([_0xa524('0x40'),_0xa524('0x39'),_0xa524('0x5f')],{'done':function(_0x1ef1aa){_0xcda15c(_0x1ef1aa);window['_QuatroDigital_DropDown'][_0xa524('0x28')]=_0x1ef1aa;},'fail':function(_0x25e68f){_0x46af1b(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.',_0x25e68f]);}});}else alert(_0xa524('0x60'));}());_0x31d21d[_0xa524('0x41')]();_0x4c587b(window)[_0xa524('0x61')](_0xa524('0x62'));return _0x31473e;};_0x4c587b['QD_simpleCart']={'elements':_0x4c587b('')};_0x4c587b(function(){var _0x491ce0;_0xa524('0xc')===typeof window['ajaxRequestbuyButtonAsynchronous']&&(_0x491ce0=window['ajaxRequestbuyButtonAsynchronous'],window['ajaxRequestbuyButtonAsynchronous']=function(_0x2e5216,_0x59d66a,_0x5d5a44,_0x27525a,_0x3e4255){_0x491ce0[_0xa524('0x29')](this,_0x2e5216,_0x59d66a,_0x5d5a44,_0x27525a,function(){_0xa524('0xc')===typeof _0x3e4255&&_0x3e4255();_0x4c587b['QD_simpleCart'][_0xa524('0x30')][_0xa524('0x36')](function(){var _0x23b253=_0x4c587b(this);_0x23b253['simpleCart'](_0x23b253[_0xa524('0x16')](_0xa524('0x37')));});});});});var _0x5da1de=window['ReloadItemsCart']||void 0x0;window[_0xa524('0x63')]=function(_0x3e8167){_0x4c587b['fn'][_0xa524('0x64')](!0x0);_0xa524('0xc')===typeof _0x5da1de?_0x5da1de['call'](this,_0x3e8167):alert(_0x3e8167);};_0x4c587b(function(){var _0x4d1f65=_0x4c587b(_0xa524('0x65'));_0x4d1f65[_0xa524('0x8')]&&_0x4d1f65[_0xa524('0x64')]();});_0x4c587b(function(){_0x4c587b(window)['bind']('productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex',function(){_0x4c587b['fn'][_0xa524('0x64')](!0x0);});});}catch(_0x4a9127){'undefined'!==typeof console&&'function'===typeof console['error']&&console[_0xa524('0x13')](_0xa524('0x66'),_0x4a9127);}}}());(function(){var _0x5a5ce4=function(_0x45c52e,_0x1bd372){if(_0xa524('0x15')===typeof console){var _0x396a4a=_0xa524('0x15')===typeof _0x45c52e;_0xa524('0x3')!==typeof _0x1bd372&&_0xa524('0x4e')===_0x1bd372[_0xa524('0x2e')]()?_0x396a4a?console[_0xa524('0x2b')](_0xa524('0x67'),_0x45c52e[0x0],_0x45c52e[0x1],_0x45c52e[0x2],_0x45c52e[0x3],_0x45c52e[0x4],_0x45c52e[0x5],_0x45c52e[0x6],_0x45c52e[0x7]):console['warn'](_0xa524('0x67')+_0x45c52e):_0xa524('0x3')!==typeof _0x1bd372&&_0xa524('0x2d')===_0x1bd372[_0xa524('0x2e')]()?_0x396a4a?console[_0xa524('0x2d')](_0xa524('0x67'),_0x45c52e[0x0],_0x45c52e[0x1],_0x45c52e[0x2],_0x45c52e[0x3],_0x45c52e[0x4],_0x45c52e[0x5],_0x45c52e[0x6],_0x45c52e[0x7]):console['info']('[QD\x20VTEX\x20Checkout\x20Queue]\x0a'+_0x45c52e):_0x396a4a?console[_0xa524('0x13')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x45c52e[0x0],_0x45c52e[0x1],_0x45c52e[0x2],_0x45c52e[0x3],_0x45c52e[0x4],_0x45c52e[0x5],_0x45c52e[0x6],_0x45c52e[0x7]):console[_0xa524('0x13')](_0xa524('0x67')+_0x45c52e);}},_0x4ab4bc=null,_0x3c9028={},_0x19da31={},_0x50ec48={};$[_0xa524('0x68')]=function(_0x4975bb,_0x28c764){if(null===_0x4ab4bc)if(_0xa524('0x15')===typeof window[_0xa524('0x5c')]&&_0xa524('0x3')!==typeof window[_0xa524('0x5c')][_0xa524('0x27')])_0x4ab4bc=window[_0xa524('0x5c')]['checkout'];else return _0x5a5ce4(_0xa524('0x69'));var _0x2c52fa=$[_0xa524('0x14')]({'done':function(){},'fail':function(){}},_0x28c764),_0x1c9a40=_0x4975bb[_0xa524('0x9')](';'),_0x99ef26=function(){_0x3c9028[_0x1c9a40]['add'](_0x2c52fa[_0xa524('0x1d')]);_0x19da31[_0x1c9a40][_0xa524('0x31')](_0x2c52fa[_0xa524('0x1f')]);};_0x50ec48[_0x1c9a40]?_0x99ef26():(_0x3c9028[_0x1c9a40]=$['Callbacks'](),_0x19da31[_0x1c9a40]=$['Callbacks'](),_0x99ef26(),_0x50ec48[_0x1c9a40]=!0x0,_0x4ab4bc[_0xa524('0x28')](_0x4975bb)[_0xa524('0x1d')](function(_0x162254){_0x50ec48[_0x1c9a40]=!0x1;_0x3c9028[_0x1c9a40][_0xa524('0x42')](_0x162254);})[_0xa524('0x1f')](function(_0xf934dc){_0x50ec48[_0x1c9a40]=!0x1;_0x19da31[_0x1c9a40][_0xa524('0x42')](_0xf934dc);}));};}());(function(_0x21c9e0){try{var _0x1da85f=jQuery,_0x4a77d9,_0x1b9563=_0x1da85f({}),_0x3d65a1=function(_0x1b3ebe,_0x2f06cb){if(_0xa524('0x15')===typeof console&&_0xa524('0x3')!==typeof console[_0xa524('0x13')]&&_0xa524('0x3')!==typeof console['info']&&'undefined'!==typeof console['warn']){var _0x43cf85;'object'===typeof _0x1b3ebe?(_0x1b3ebe['unshift'](_0xa524('0x6a')),_0x43cf85=_0x1b3ebe):_0x43cf85=[_0xa524('0x6a')+_0x1b3ebe];if(_0xa524('0x3')===typeof _0x2f06cb||_0xa524('0x4e')!==_0x2f06cb[_0xa524('0x2e')]()&&_0xa524('0x6b')!==_0x2f06cb['toLowerCase']())if(_0xa524('0x3')!==typeof _0x2f06cb&&_0xa524('0x2d')===_0x2f06cb['toLowerCase']())try{console[_0xa524('0x2d')]['apply'](console,_0x43cf85);}catch(_0x388966){try{console[_0xa524('0x2d')](_0x43cf85['join']('\x0a'));}catch(_0x3a850c){}}else try{console['error']['apply'](console,_0x43cf85);}catch(_0x430c40){try{console[_0xa524('0x13')](_0x43cf85[_0xa524('0x9')]('\x0a'));}catch(_0x38e170){}}else try{console[_0xa524('0x2b')][_0xa524('0x6c')](console,_0x43cf85);}catch(_0x2d46b6){try{console[_0xa524('0x2b')](_0x43cf85[_0xa524('0x9')]('\x0a'));}catch(_0x47220d){}}}},_0x5100f9={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':'.productInformationWrapper\x20\x20a.buy-button','buyQtt':_0xa524('0x6d'),'selectSkuMsg':_0xa524('0x6e'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x35bc24,_0x1943bc,_0x1dbda7){_0x1da85f(_0xa524('0x6f'))['is'](_0xa524('0x70'))&&(_0xa524('0x1e')===_0x1943bc?alert(_0xa524('0x71')):(alert('Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.'),(_0xa524('0x15')===typeof parent?parent:document)['location'][_0xa524('0x72')]=_0x1dbda7));},'isProductPage':function(){return _0x1da85f(_0xa524('0x6f'))['is'](_0xa524('0x73'));},'execDefaultAction':function(_0x52699a){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x1da85f[_0xa524('0x74')]=function(_0x574477,_0x598ad3){function _0x5c4356(_0x5b38e1){_0x4a77d9[_0xa524('0x75')]?_0x5b38e1[_0xa524('0x16')](_0xa524('0x76'))||(_0x5b38e1[_0xa524('0x16')](_0xa524('0x76'),0x1),_0x5b38e1['on'](_0xa524('0x77'),function(_0x552ef8){if(!_0x4a77d9['allowBuyClick']())return!0x0;if(!0x0!==_0x410601[_0xa524('0x78')][_0xa524('0x29')](this))return _0x552ef8[_0xa524('0x79')](),!0x1;})):alert(_0xa524('0x7a'));}function _0xe45bdd(_0x262caa){_0x262caa=_0x262caa||_0x1da85f(_0x4a77d9[_0xa524('0x7b')]);_0x262caa[_0xa524('0x36')](function(){var _0x262caa=_0x1da85f(this);_0x262caa['is']('.qd-sbb-on')||(_0x262caa['addClass'](_0xa524('0x7c')),_0x262caa['is'](_0xa524('0x7d'))&&!_0x262caa['is'](_0xa524('0x7e'))||_0x262caa[_0xa524('0x16')](_0xa524('0x7f'))||(_0x262caa['data']('qd-bb-active',0x1),_0x262caa[_0xa524('0x80')]('.qd-bb-productAdded')[_0xa524('0x8')]||_0x262caa[_0xa524('0x81')](_0xa524('0x82')),_0x262caa['is']('.buy-in-page-button')&&_0x4a77d9[_0xa524('0x83')]()&&_0xc59bc7[_0xa524('0x29')](_0x262caa),_0x5c4356(_0x262caa)));});_0x4a77d9['isProductPage']()&&!_0x262caa[_0xa524('0x8')]&&_0x3d65a1(_0xa524('0x84')+_0x262caa[_0xa524('0x85')]+'\x27.','info');}var _0x50fdd0=_0x1da85f(_0x574477);var _0x410601=this;window['_Quatro_Digital_dropDown']=window[_0xa524('0x86')]||{};window[_0xa524('0x38')]=window[_0xa524('0x38')]||{};_0x410601[_0xa524('0x87')]=function(_0x2d288d,_0x2e745c){_0x50fdd0[_0xa524('0x49')](_0xa524('0x88'));_0x1da85f(_0xa524('0x6f'))[_0xa524('0x49')](_0xa524('0x89'));var _0x5d4b41=_0x1da85f(_0x4a77d9[_0xa524('0x7b')])[_0xa524('0x45')](_0xa524('0x8a')+(_0x2d288d[_0xa524('0x8b')]('href')||'---')+'\x27]')['add'](_0x2d288d);_0x5d4b41[_0xa524('0x49')](_0xa524('0x8c'));setTimeout(function(){_0x50fdd0[_0xa524('0x4a')](_0xa524('0x8d'));_0x5d4b41[_0xa524('0x4a')](_0xa524('0x8c'));},_0x4a77d9['timeRemoveNewItemClass']);window[_0xa524('0x86')][_0xa524('0x28')]=void 0x0;if(_0xa524('0x3')!==typeof _0x598ad3&&_0xa524('0xc')===typeof _0x598ad3[_0xa524('0x8e')])return _0x4a77d9['isSmartCheckout']||(_0x3d65a1(_0xa524('0x8f')),_0x598ad3[_0xa524('0x8e')]()),window['_QuatroDigital_DropDown'][_0xa524('0x28')]=void 0x0,_0x598ad3['getCartInfoByUrl'](function(_0x378202){window[_0xa524('0x86')][_0xa524('0x28')]=_0x378202;_0x1da85f['fn'][_0xa524('0x64')](!0x0,void 0x0,!0x0);},{'lastSku':_0x2e745c});window[_0xa524('0x86')]['allowUpdate']=!0x0;_0x1da85f['fn'][_0xa524('0x64')](!0x0);};(function(){if(_0x4a77d9[_0xa524('0x75')]&&_0x4a77d9[_0xa524('0x90')]){var _0x57074c=_0x1da85f(_0xa524('0x7d'));_0x57074c[_0xa524('0x8')]&&_0xe45bdd(_0x57074c);}}());var _0xc59bc7=function(){var _0x45d188=_0x1da85f(this);_0xa524('0x3')!==typeof _0x45d188[_0xa524('0x16')]('buyButton')?(_0x45d188[_0xa524('0x91')](_0xa524('0x92')),_0x5c4356(_0x45d188)):(_0x45d188['bind'](_0xa524('0x93'),function(_0x3231c3){_0x45d188[_0xa524('0x91')](_0xa524('0x92'));_0x5c4356(_0x45d188);_0x1da85f(this)['unbind'](_0x3231c3);}),_0x1da85f(window)['load'](function(){_0x45d188['unbind'](_0xa524('0x92'));_0x5c4356(_0x45d188);_0x45d188[_0xa524('0x91')](_0xa524('0x93'));}));};_0x410601['clickBuySmartCheckout']=function(){var _0x1dc096=_0x1da85f(this),_0x574477=_0x1dc096[_0xa524('0x8b')](_0xa524('0x72'))||'';if(-0x1<_0x574477[_0xa524('0x94')](_0x4a77d9[_0xa524('0x95')]))return!0x0;_0x574477=_0x574477[_0xa524('0x2')](/redirect\=(false|true)/gi,'')[_0xa524('0x2')]('?','?redirect=false&')[_0xa524('0x2')](/\&\&/gi,'&');if(_0x4a77d9[_0xa524('0x96')](_0x1dc096))return _0x1dc096[_0xa524('0x8b')](_0xa524('0x72'),_0x574477['replace'](_0xa524('0x97'),'redirect=true')),!0x0;_0x574477=_0x574477[_0xa524('0x2')](/http.?:/i,'');_0x1b9563['queue'](function(_0x54423a){if(!_0x4a77d9[_0xa524('0x98')]&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0xa524('0x99')](_0x574477))return _0x54423a();var _0x1bffdb=function(_0x82285c,_0x51f2b1){var _0xe45bdd=_0x574477[_0xa524('0x9a')](/sku\=([0-9]+)/gi),_0x8bea9a=[];if('object'===typeof _0xe45bdd&&null!==_0xe45bdd)for(var _0x34da26=_0xe45bdd[_0xa524('0x8')]-0x1;0x0<=_0x34da26;_0x34da26--){var _0x13c2ad=parseInt(_0xe45bdd[_0x34da26][_0xa524('0x2')](/sku\=/gi,''));isNaN(_0x13c2ad)||_0x8bea9a[_0xa524('0x9b')](_0x13c2ad);}_0x4a77d9[_0xa524('0x9c')][_0xa524('0x29')](this,_0x82285c,_0x51f2b1,_0x574477);_0x410601[_0xa524('0x9d')][_0xa524('0x29')](this,_0x82285c,_0x51f2b1,_0x574477,_0x8bea9a);_0x410601[_0xa524('0x87')](_0x1dc096,_0x574477[_0xa524('0x7')](_0xa524('0x9e'))[_0xa524('0x9f')]()['split']('&')[_0xa524('0xa0')]());'function'===typeof _0x4a77d9['asyncCallback']&&_0x4a77d9[_0xa524('0xa1')][_0xa524('0x29')](this);_0x1da85f(window)[_0xa524('0x61')](_0xa524('0xa2'));_0x1da85f(window)[_0xa524('0x61')]('cartProductAdded.vtex');};_0x4a77d9[_0xa524('0xa3')]?(_0x1bffdb(null,_0xa524('0x1e')),_0x54423a()):_0x1da85f[_0xa524('0x1c')]({'url':_0x574477,'complete':_0x1bffdb})[_0xa524('0x20')](function(){_0x54423a();});});};_0x410601[_0xa524('0x9d')]=function(_0x3a98b4,_0xed69d5,_0xcdff52,_0x402f08){try{'success'===_0xed69d5&&'object'===typeof window[_0xa524('0xa4')]&&_0xa524('0xc')===typeof window['parent'][_0xa524('0xa5')]&&window[_0xa524('0xa4')]['_QuatroDigital_prodBuyCallback'](_0x3a98b4,_0xed69d5,_0xcdff52,_0x402f08);}catch(_0x4aea04){_0x3d65a1(_0xa524('0xa6'));}};_0xe45bdd();_0xa524('0xc')===typeof _0x4a77d9[_0xa524('0x41')]?_0x4a77d9[_0xa524('0x41')][_0xa524('0x29')](this):_0x3d65a1(_0xa524('0xa7'));};var _0x4862a7=_0x1da85f['Callbacks']();_0x1da85f['fn'][_0xa524('0x74')]=function(_0x5704f3,_0x110978){var _0x21c9e0=_0x1da85f(this);'undefined'!==typeof _0x110978||_0xa524('0x15')!==typeof _0x5704f3||_0x5704f3 instanceof _0x1da85f||(_0x110978=_0x5704f3,_0x5704f3=void 0x0);_0x4a77d9=_0x1da85f[_0xa524('0x14')]({},_0x5100f9,_0x110978);var _0x148b3d;_0x4862a7[_0xa524('0x31')](function(){_0x21c9e0[_0xa524('0x80')](_0xa524('0xa8'))[_0xa524('0x8')]||_0x21c9e0[_0xa524('0xa9')](_0xa524('0xaa'));_0x148b3d=new _0x1da85f['QD_buyButton'](_0x21c9e0,_0x5704f3);});_0x4862a7['fire']();_0x1da85f(window)['on']('QuatroDigital.qd_bb_prod_add',function(_0x44efce,_0x3ab825,_0x270e76){_0x148b3d['prodAdd'](_0x3ab825,_0x270e76);});return _0x1da85f[_0xa524('0x14')](_0x21c9e0,_0x148b3d);};var _0x55c50a=0x0;_0x1da85f(document)[_0xa524('0xab')](function(_0x3f7b89,_0x4a69a2,_0x5f0210){-0x1<_0x5f0210[_0xa524('0x19')][_0xa524('0x2e')]()['indexOf'](_0xa524('0xac'))&&(_0x55c50a=(_0x5f0210['url'][_0xa524('0x9a')](/sku\=([0-9]+)/i)||[''])[_0xa524('0x9f')]());});_0x1da85f(window)[_0xa524('0xad')](_0xa524('0xae'),function(){_0x1da85f(window)[_0xa524('0x61')](_0xa524('0xaf'),[new _0x1da85f(),_0x55c50a]);});_0x1da85f(document)[_0xa524('0xb0')](function(){_0x4862a7[_0xa524('0x42')]();});}catch(_0x555219){_0xa524('0x3')!==typeof console&&'function'===typeof console['error']&&console[_0xa524('0x13')](_0xa524('0x66'),_0x555219);}}(this));function qd_number_format(_0x2ca476,_0x18264d,_0x6386ef,_0x1a8744){_0x2ca476=(_0x2ca476+'')[_0xa524('0x2')](/[^0-9+\-Ee.]/g,'');_0x2ca476=isFinite(+_0x2ca476)?+_0x2ca476:0x0;_0x18264d=isFinite(+_0x18264d)?Math[_0xa524('0xb1')](_0x18264d):0x0;_0x1a8744=_0xa524('0x3')===typeof _0x1a8744?',':_0x1a8744;_0x6386ef=_0xa524('0x3')===typeof _0x6386ef?'.':_0x6386ef;var _0x309caa='',_0x309caa=function(_0x36b2fc,_0x1bd29f){var _0x10a045=Math['pow'](0xa,_0x1bd29f);return''+(Math[_0xa524('0x6')](_0x36b2fc*_0x10a045)/_0x10a045)[_0xa524('0x5')](_0x1bd29f);},_0x309caa=(_0x18264d?_0x309caa(_0x2ca476,_0x18264d):''+Math[_0xa524('0x6')](_0x2ca476))[_0xa524('0x7')]('.');0x3<_0x309caa[0x0]['length']&&(_0x309caa[0x0]=_0x309caa[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x1a8744));(_0x309caa[0x1]||'')[_0xa524('0x8')]<_0x18264d&&(_0x309caa[0x1]=_0x309caa[0x1]||'',_0x309caa[0x1]+=Array(_0x18264d-_0x309caa[0x1][_0xa524('0x8')]+0x1)['join']('0'));return _0x309caa[_0xa524('0x9')](_0x6386ef);}(function(){try{window[_0xa524('0x38')]=window[_0xa524('0x38')]||{},window[_0xa524('0x38')]['callback']=window[_0xa524('0x38')][_0xa524('0x41')]||$[_0xa524('0xb2')]();}catch(_0x57122a){_0xa524('0x3')!==typeof console&&_0xa524('0xc')===typeof console[_0xa524('0x13')]&&console['error'](_0xa524('0x66'),_0x57122a[_0xa524('0x24')]);}}());(function(_0x2490a8){try{var _0x8944e6=jQuery,_0x1284e4=function(_0x2810cf,_0x1dbdcc){if(_0xa524('0x15')===typeof console&&_0xa524('0x3')!==typeof console[_0xa524('0x13')]&&_0xa524('0x3')!==typeof console[_0xa524('0x2d')]&&_0xa524('0x3')!==typeof console[_0xa524('0x2b')]){var _0x2eaf1e;_0xa524('0x15')===typeof _0x2810cf?(_0x2810cf[_0xa524('0xb3')](_0xa524('0xb4')),_0x2eaf1e=_0x2810cf):_0x2eaf1e=[_0xa524('0xb4')+_0x2810cf];if(_0xa524('0x3')===typeof _0x1dbdcc||_0xa524('0x4e')!==_0x1dbdcc[_0xa524('0x2e')]()&&_0xa524('0x6b')!==_0x1dbdcc['toLowerCase']())if(_0xa524('0x3')!==typeof _0x1dbdcc&&_0xa524('0x2d')===_0x1dbdcc['toLowerCase']())try{console[_0xa524('0x2d')][_0xa524('0x6c')](console,_0x2eaf1e);}catch(_0x4763c9){try{console['info'](_0x2eaf1e[_0xa524('0x9')]('\x0a'));}catch(_0x53f37f){}}else try{console[_0xa524('0x13')][_0xa524('0x6c')](console,_0x2eaf1e);}catch(_0x448b16){try{console[_0xa524('0x13')](_0x2eaf1e[_0xa524('0x9')]('\x0a'));}catch(_0x4a68c4){}}else try{console[_0xa524('0x2b')][_0xa524('0x6c')](console,_0x2eaf1e);}catch(_0x4f09a0){try{console[_0xa524('0x2b')](_0x2eaf1e[_0xa524('0x9')]('\x0a'));}catch(_0x3ed35c){}}}};window['_QuatroDigital_DropDown']=window[_0xa524('0x5b')]||{};window['_QuatroDigital_DropDown']['allowUpdate']=!0x0;_0x8944e6[_0xa524('0xb5')]=function(){};_0x8944e6['fn'][_0xa524('0xb5')]=function(){return{'fn':new _0x8944e6()};};var _0x1fbc9f=function(_0x1e3614){var _0x3bbdb0={'t':_0xa524('0xb6')};return function(_0x9bc00e){var _0x51e882=function(_0x30a8b3){return _0x30a8b3;};var _0x276713=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x9bc00e=_0x9bc00e['d'+_0x276713[0x10]+'c'+_0x276713[0x11]+'m'+_0x51e882(_0x276713[0x1])+'n'+_0x276713[0xd]]['l'+_0x276713[0x12]+'c'+_0x276713[0x0]+'ti'+_0x51e882('o')+'n'];var _0x3a7382=function(_0x1c6101){return escape(encodeURIComponent(_0x1c6101[_0xa524('0x2')](/\./g,'¨')[_0xa524('0x2')](/[a-zA-Z]/g,function(_0x2d1a3e){return String[_0xa524('0xb7')](('Z'>=_0x2d1a3e?0x5a:0x7a)>=(_0x2d1a3e=_0x2d1a3e['charCodeAt'](0x0)+0xd)?_0x2d1a3e:_0x2d1a3e-0x1a);})));};var _0x2490a8=_0x3a7382(_0x9bc00e[[_0x276713[0x9],_0x51e882('o'),_0x276713[0xc],_0x276713[_0x51e882(0xd)]]['join']('')]);_0x3a7382=_0x3a7382((window[['js',_0x51e882('no'),'m',_0x276713[0x1],_0x276713[0x4][_0xa524('0xe')](),_0xa524('0xb8')][_0xa524('0x9')]('')]||_0xa524('0xb9'))+['.v',_0x276713[0xd],'e',_0x51e882('x'),'co',_0x51e882('mm'),_0xa524('0xba'),_0x276713[0x1],'.c',_0x51e882('o'),'m.',_0x276713[0x13],'r'][_0xa524('0x9')](''));for(var _0xcfcb60 in _0x3bbdb0){if(_0x3a7382===_0xcfcb60+_0x3bbdb0[_0xcfcb60]||_0x2490a8===_0xcfcb60+_0x3bbdb0[_0xcfcb60]){var _0x1f5193='tr'+_0x276713[0x11]+'e';break;}_0x1f5193='f'+_0x276713[0x0]+'ls'+_0x51e882(_0x276713[0x1])+'';}_0x51e882=!0x1;-0x1<_0x9bc00e[[_0x276713[0xc],'e',_0x276713[0x0],'rc',_0x276713[0x9]][_0xa524('0x9')]('')]['indexOf'](_0xa524('0xbb'))&&(_0x51e882=!0x0);return[_0x1f5193,_0x51e882];}(_0x1e3614);}(window);if(!eval(_0x1fbc9f[0x0]))return _0x1fbc9f[0x1]?_0x1284e4(_0xa524('0xbc')):!0x1;_0x8944e6[_0xa524('0xb5')]=function(_0x3b926b,_0x232ed4){var _0x1a1de5=_0x8944e6(_0x3b926b);if(!_0x1a1de5[_0xa524('0x8')])return _0x1a1de5;var _0x5dee8c=_0x8944e6[_0xa524('0x14')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0xa524('0xbd'),'linkCheckout':_0xa524('0xbe'),'cartTotal':_0xa524('0xbf'),'emptyCart':_0xa524('0xc0'),'continueShopping':'Continuar\x20Comprando','shippingForm':_0xa524('0xc1')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x33724c){return _0x33724c[_0xa524('0xc2')]||_0x33724c[_0xa524('0xc3')];},'callback':function(){},'callbackProductsList':function(){}},_0x232ed4);_0x8944e6('');var _0x8c763f=this;if(_0x5dee8c[_0xa524('0x5a')]){var _0x1a2350=!0x1;_0xa524('0x3')===typeof window['vtexjs']&&(_0x1284e4('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN'),_0x8944e6['ajax']({'url':_0xa524('0xc4'),'async':!0x1,'dataType':_0xa524('0xc5'),'error':function(){_0x1284e4(_0xa524('0xc6'));_0x1a2350=!0x0;}}));if(_0x1a2350)return _0x1284e4(_0xa524('0xc7'));}if(_0xa524('0x15')===typeof window['vtexjs']&&'undefined'!==typeof window[_0xa524('0x5c')][_0xa524('0x27')])var _0x4e24a4=window['vtexjs']['checkout'];else if('object'===typeof vtex&&_0xa524('0x15')===typeof vtex[_0xa524('0x27')]&&_0xa524('0x3')!==typeof vtex[_0xa524('0x27')][_0xa524('0x5d')])_0x4e24a4=new vtex[(_0xa524('0x27'))][(_0xa524('0x5d'))]();else return _0x1284e4(_0xa524('0x5e'));_0x8c763f[_0xa524('0xc8')]=_0xa524('0xc9');var _0x18f7ea=function(_0x59aa7d){_0x8944e6(this)[_0xa524('0x81')](_0x59aa7d);_0x59aa7d[_0xa524('0x53')]('.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose')[_0xa524('0x31')](_0x8944e6('.qd_ddc_lightBoxOverlay'))['on'](_0xa524('0xca'),function(){_0x1a1de5[_0xa524('0x4a')](_0xa524('0xcb'));_0x8944e6(document[_0xa524('0x6f')])[_0xa524('0x4a')]('qd-bb-lightBoxBodyProdAdd');});_0x8944e6(document)[_0xa524('0xcc')](_0xa524('0xcd'))['on'](_0xa524('0xcd'),function(_0x293d0f){0x1b==_0x293d0f[_0xa524('0xce')]&&(_0x1a1de5[_0xa524('0x4a')](_0xa524('0xcb')),_0x8944e6(document[_0xa524('0x6f')])[_0xa524('0x4a')](_0xa524('0x89')));});var _0x416e0b=_0x59aa7d[_0xa524('0x53')](_0xa524('0xcf'));_0x59aa7d[_0xa524('0x53')](_0xa524('0xd0'))['on'](_0xa524('0xd1'),function(){_0x8c763f['scrollCart']('-',void 0x0,void 0x0,_0x416e0b);return!0x1;});_0x59aa7d['find'](_0xa524('0xd2'))['on'](_0xa524('0xd3'),function(){_0x8c763f['scrollCart'](void 0x0,void 0x0,void 0x0,_0x416e0b);return!0x1;});_0x59aa7d[_0xa524('0x53')](_0xa524('0xd4'))[_0xa524('0xd5')]('')['on'](_0xa524('0xd6'),function(){_0x8c763f['shippingCalculate'](_0x8944e6(this));});if(_0x5dee8c[_0xa524('0xd7')]){var _0x232ed4=0x0;_0x8944e6(this)['on']('mouseenter.qd_ddc_hover',function(){var _0x59aa7d=function(){window[_0xa524('0x5b')][_0xa524('0xd8')]&&(_0x8c763f['getCartInfoByUrl'](),window[_0xa524('0x5b')]['allowUpdate']=!0x1,_0x8944e6['fn'][_0xa524('0x64')](!0x0),_0x8c763f[_0xa524('0xd9')]());};_0x232ed4=setInterval(function(){_0x59aa7d();},0x258);_0x59aa7d();});_0x8944e6(this)['on']('mouseleave.qd_ddc_hover',function(){clearInterval(_0x232ed4);});}};var _0x25934e=function(_0x4ba144){_0x4ba144=_0x8944e6(_0x4ba144);_0x5dee8c[_0xa524('0xda')][_0xa524('0x55')]=_0x5dee8c[_0xa524('0xda')][_0xa524('0x55')][_0xa524('0x2')](_0xa524('0xdb'),_0xa524('0xdc'));_0x5dee8c[_0xa524('0xda')][_0xa524('0x55')]=_0x5dee8c['texts'][_0xa524('0x55')]['replace'](_0xa524('0xdd'),_0xa524('0xde'));_0x5dee8c['texts'][_0xa524('0x55')]=_0x5dee8c[_0xa524('0xda')][_0xa524('0x55')]['replace'](_0xa524('0xdf'),'<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>');_0x5dee8c[_0xa524('0xda')][_0xa524('0x55')]=_0x5dee8c['texts'][_0xa524('0x55')][_0xa524('0x2')](_0xa524('0xe0'),'<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0x4ba144[_0xa524('0x53')]('.qd-ddc-viewCart')['html'](_0x5dee8c['texts']['linkCart']);_0x4ba144[_0xa524('0x53')](_0xa524('0xe1'))[_0xa524('0x50')](_0x5dee8c[_0xa524('0xda')][_0xa524('0xe2')]);_0x4ba144['find']('.qd-ddc-checkout')['html'](_0x5dee8c[_0xa524('0xda')][_0xa524('0xe3')]);_0x4ba144[_0xa524('0x53')](_0xa524('0xe4'))['html'](_0x5dee8c[_0xa524('0xda')][_0xa524('0x55')]);_0x4ba144['find']('.qd-ddc-shipping')['html'](_0x5dee8c[_0xa524('0xda')][_0xa524('0xe5')]);_0x4ba144[_0xa524('0x53')](_0xa524('0xe6'))['html'](_0x5dee8c['texts']['emptyCart']);return _0x4ba144;}(this[_0xa524('0xc8')]);var _0x4fe320=0x0;_0x1a1de5['each'](function(){0x0<_0x4fe320?_0x18f7ea[_0xa524('0x29')](this,_0x25934e[_0xa524('0xe7')]()):_0x18f7ea[_0xa524('0x29')](this,_0x25934e);_0x4fe320++;});window[_0xa524('0x38')][_0xa524('0x41')][_0xa524('0x31')](function(){_0x8944e6(_0xa524('0xe8'))['html'](window[_0xa524('0x38')][_0xa524('0x3c')]||'--');_0x8944e6(_0xa524('0xe9'))[_0xa524('0x50')](window[_0xa524('0x38')][_0xa524('0x3f')]||'0');_0x8944e6(_0xa524('0xea'))[_0xa524('0x50')](window[_0xa524('0x38')][_0xa524('0x3d')]||'--');_0x8944e6(_0xa524('0xeb'))['html'](window[_0xa524('0x38')][_0xa524('0x3e')]||'--');});var _0xf55e9c=function(_0x3b7ccf,_0x8cb914){if(_0xa524('0x3')===typeof _0x3b7ccf[_0xa524('0x40')])return _0x1284e4('Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição');_0x8c763f[_0xa524('0xec')][_0xa524('0x29')](this,_0x8cb914);};_0x8c763f['getCartInfoByUrl']=function(_0x1daab0,_0x3d921c){'undefined'!=typeof _0x3d921c?window['_QuatroDigital_DropDown']['dataOptionsCache']=_0x3d921c:window[_0xa524('0x5b')][_0xa524('0xed')]&&(_0x3d921c=window[_0xa524('0x5b')]['dataOptionsCache']);setTimeout(function(){window['_QuatroDigital_DropDown'][_0xa524('0xed')]=void 0x0;},_0x5dee8c[_0xa524('0xee')]);_0x8944e6(_0xa524('0xef'))[_0xa524('0x4a')]('qd-ddc-prodLoaded');if(_0x5dee8c[_0xa524('0x5a')]){var _0x232ed4=function(_0x61c181){window['_QuatroDigital_DropDown'][_0xa524('0x28')]=_0x61c181;_0xf55e9c(_0x61c181,_0x3d921c);'undefined'!==typeof window[_0xa524('0xf0')]&&'function'===typeof window[_0xa524('0xf0')][_0xa524('0xf1')]&&window[_0xa524('0xf0')]['exec'][_0xa524('0x29')](this);_0x8944e6('.qd-ddc-wrapper')['addClass'](_0xa524('0xf2'));};_0xa524('0x3')!==typeof window[_0xa524('0x5b')][_0xa524('0x28')]?(_0x232ed4(window['_QuatroDigital_DropDown'][_0xa524('0x28')]),_0xa524('0xc')===typeof _0x1daab0&&_0x1daab0(window['_QuatroDigital_DropDown'][_0xa524('0x28')])):_0x8944e6['QD_checkoutQueue']([_0xa524('0x40'),_0xa524('0x39'),'shippingData'],{'done':function(_0x225b8e){_0x232ed4[_0xa524('0x29')](this,_0x225b8e);_0xa524('0xc')===typeof _0x1daab0&&_0x1daab0(_0x225b8e);},'fail':function(_0x1968e4){_0x1284e4([_0xa524('0xf3'),_0x1968e4]);}});}else alert(_0xa524('0xf4'));};_0x8c763f[_0xa524('0xd9')]=function(){var _0x2f87c5=_0x8944e6(_0xa524('0xef'));_0x2f87c5[_0xa524('0x53')](_0xa524('0xf5'))[_0xa524('0x8')]?_0x2f87c5[_0xa524('0x4a')](_0xa524('0xf6')):_0x2f87c5[_0xa524('0x49')]('qd-ddc-noItems');};_0x8c763f['renderProductsList']=function(_0xd0c0f1){var _0x232ed4=_0x8944e6(_0xa524('0xf7'));_0x232ed4['empty']();_0x232ed4[_0xa524('0x36')](function(){var _0x232ed4=_0x8944e6(this),_0x3b926b,_0x16d7bd,_0x51d18a=_0x8944e6(''),_0x3890dc;for(_0x3890dc in window[_0xa524('0x5b')][_0xa524('0x28')][_0xa524('0x40')])if('object'===typeof window[_0xa524('0x5b')][_0xa524('0x28')][_0xa524('0x40')][_0x3890dc]){var _0x302cbe=window['_QuatroDigital_DropDown']['getOrderForm']['items'][_0x3890dc];var _0x57de3c=_0x302cbe['productCategoryIds'][_0xa524('0x2')](/^\/|\/$/g,'')[_0xa524('0x7')]('/');var _0x555647=_0x8944e6(_0xa524('0xf8'));_0x555647[_0xa524('0x8b')]({'data-sku':_0x302cbe['id'],'data-sku-index':_0x3890dc,'data-qd-departament':_0x57de3c[0x0],'data-qd-category':_0x57de3c[_0x57de3c['length']-0x1]});_0x555647[_0xa524('0x49')](_0xa524('0xf9')+_0x302cbe[_0xa524('0xfa')]);_0x555647[_0xa524('0x53')](_0xa524('0xfb'))['append'](_0x5dee8c[_0xa524('0xc2')](_0x302cbe));_0x555647[_0xa524('0x53')](_0xa524('0xfc'))[_0xa524('0x81')](isNaN(_0x302cbe['sellingPrice'])?_0x302cbe[_0xa524('0xfd')]:0x0==_0x302cbe[_0xa524('0xfd')]?'Grátis':(_0x8944e6(_0xa524('0x34'))['attr']('content')||'R$')+'\x20'+qd_number_format(_0x302cbe[_0xa524('0xfd')]/0x64,0x2,',','.'));_0x555647[_0xa524('0x53')](_0xa524('0xfe'))[_0xa524('0x8b')]({'data-sku':_0x302cbe['id'],'data-sku-index':_0x3890dc})['val'](_0x302cbe[_0xa524('0xff')]);_0x555647[_0xa524('0x53')](_0xa524('0x100'))['attr']({'data-sku':_0x302cbe['id'],'data-sku-index':_0x3890dc});_0x8c763f[_0xa524('0x101')](_0x302cbe['id'],_0x555647[_0xa524('0x53')](_0xa524('0x102')),_0x302cbe[_0xa524('0x103')]);_0x555647[_0xa524('0x53')](_0xa524('0x104'))['attr']({'data-sku':_0x302cbe['id'],'data-sku-index':_0x3890dc});_0x555647[_0xa524('0x105')](_0x232ed4);_0x51d18a=_0x51d18a[_0xa524('0x31')](_0x555647);}try{var _0x1cafc5=_0x232ed4['getParent'](_0xa524('0xef'))['find'](_0xa524('0xd4'));_0x1cafc5[_0xa524('0x8')]&&''==_0x1cafc5['val']()&&window[_0xa524('0x5b')][_0xa524('0x28')][_0xa524('0x5f')][_0xa524('0x106')]&&_0x1cafc5[_0xa524('0xd5')](window[_0xa524('0x5b')][_0xa524('0x28')][_0xa524('0x5f')][_0xa524('0x106')][_0xa524('0x107')]);}catch(_0xec6ab){_0x1284e4(_0xa524('0x108')+_0xec6ab['message'],_0xa524('0x6b'));}_0x8c763f[_0xa524('0x109')](_0x232ed4);_0x8c763f['cartIsEmpty']();_0xd0c0f1&&_0xd0c0f1[_0xa524('0x10a')]&&function(){_0x16d7bd=_0x51d18a['filter'](_0xa524('0x10b')+_0xd0c0f1[_0xa524('0x10a')]+'\x27]');_0x16d7bd[_0xa524('0x8')]&&(_0x3b926b=0x0,_0x51d18a[_0xa524('0x36')](function(){var _0xd0c0f1=_0x8944e6(this);if(_0xd0c0f1['is'](_0x16d7bd))return!0x1;_0x3b926b+=_0xd0c0f1[_0xa524('0x10c')]();}),_0x8c763f['scrollCart'](void 0x0,void 0x0,_0x3b926b,_0x232ed4[_0xa524('0x31')](_0x232ed4[_0xa524('0xa4')]())),_0x51d18a['removeClass'](_0xa524('0x10d')),function(_0x6f2718){_0x6f2718[_0xa524('0x49')]('qd-ddc-lastAdded');_0x6f2718[_0xa524('0x49')](_0xa524('0x10d'));setTimeout(function(){_0x6f2718[_0xa524('0x4a')](_0xa524('0x10e'));},_0x5dee8c[_0xa524('0xee')]);}(_0x16d7bd));}();});(function(){_QuatroDigital_DropDown[_0xa524('0x28')][_0xa524('0x40')]['length']?(_0x8944e6('body')[_0xa524('0x4a')](_0xa524('0x10f'))[_0xa524('0x49')](_0xa524('0x110')),setTimeout(function(){_0x8944e6(_0xa524('0x6f'))['removeClass'](_0xa524('0x111'));},_0x5dee8c[_0xa524('0xee')])):_0x8944e6(_0xa524('0x6f'))[_0xa524('0x4a')](_0xa524('0x112'))[_0xa524('0x49')](_0xa524('0x10f'));}());'function'===typeof _0x5dee8c[_0xa524('0x113')]?_0x5dee8c[_0xa524('0x113')][_0xa524('0x29')](this):_0x1284e4(_0xa524('0x114'));};_0x8c763f[_0xa524('0x101')]=function(_0x10b644,_0xb17ae1,_0x4bb57c){function _0x5f2cd6(){_0xb17ae1['removeClass']('qd-loaded')['load'](function(){_0x8944e6(this)['addClass'](_0xa524('0x115'));})[_0xa524('0x8b')](_0xa524('0x116'),_0x4bb57c);}_0x4bb57c?_0x5f2cd6():isNaN(_0x10b644)?_0x1284e4(_0xa524('0x117'),'alerta'):alert(_0xa524('0x118'));};_0x8c763f[_0xa524('0x109')]=function(_0x2d9c40){var _0x2cefeb=function(_0x211158,_0x3db4f7){var _0x232ed4=_0x8944e6(_0x211158);var _0x38e7b1=_0x232ed4[_0xa524('0x8b')]('data-sku');var _0x3b926b=_0x232ed4[_0xa524('0x8b')](_0xa524('0x119'));if(_0x38e7b1){var _0x176d3b=parseInt(_0x232ed4['val']())||0x1;_0x8c763f[_0xa524('0x11a')]([_0x38e7b1,_0x3b926b],_0x176d3b,_0x176d3b+0x1,function(_0x290be1){_0x232ed4[_0xa524('0xd5')](_0x290be1);'function'===typeof _0x3db4f7&&_0x3db4f7();});}};var _0x232ed4=function(_0x2b9e14,_0x3c1121){var _0x232ed4=_0x8944e6(_0x2b9e14);var _0x451158=_0x232ed4[_0xa524('0x8b')](_0xa524('0x11b'));var _0x3b926b=_0x232ed4['attr'](_0xa524('0x119'));if(_0x451158){var _0x121c90=parseInt(_0x232ed4[_0xa524('0xd5')]())||0x2;_0x8c763f[_0xa524('0x11a')]([_0x451158,_0x3b926b],_0x121c90,_0x121c90-0x1,function(_0xceb81f){_0x232ed4[_0xa524('0xd5')](_0xceb81f);_0xa524('0xc')===typeof _0x3c1121&&_0x3c1121();});}};var _0xfc8663=function(_0x2f9613,_0x58caab){var _0x232ed4=_0x8944e6(_0x2f9613);var _0x33a02=_0x232ed4[_0xa524('0x8b')]('data-sku');var _0x3b926b=_0x232ed4[_0xa524('0x8b')](_0xa524('0x119'));if(_0x33a02){var _0xb62ff=parseInt(_0x232ed4['val']())||0x1;_0x8c763f[_0xa524('0x11a')]([_0x33a02,_0x3b926b],0x1,_0xb62ff,function(_0x4d3a87){_0x232ed4[_0xa524('0xd5')](_0x4d3a87);_0xa524('0xc')===typeof _0x58caab&&_0x58caab();});}};var _0x3b926b=_0x2d9c40[_0xa524('0x53')](_0xa524('0x11c'));_0x3b926b[_0xa524('0x49')](_0xa524('0x11d'))[_0xa524('0x36')](function(){var _0x2d9c40=_0x8944e6(this);_0x2d9c40[_0xa524('0x53')]('.qd-ddc-quantityMore')['on'](_0xa524('0x11e'),function(_0x3f13ad){_0x3f13ad['preventDefault']();_0x3b926b[_0xa524('0x49')](_0xa524('0x11f'));_0x2cefeb(_0x2d9c40[_0xa524('0x53')](_0xa524('0xfe')),function(){_0x3b926b[_0xa524('0x4a')](_0xa524('0x11f'));});});_0x2d9c40[_0xa524('0x53')]('.qd-ddc-quantityMinus')['on'](_0xa524('0x120'),function(_0x872824){_0x872824[_0xa524('0x79')]();_0x3b926b[_0xa524('0x49')](_0xa524('0x11f'));_0x232ed4(_0x2d9c40[_0xa524('0x53')](_0xa524('0xfe')),function(){_0x3b926b[_0xa524('0x4a')](_0xa524('0x11f'));});});_0x2d9c40[_0xa524('0x53')](_0xa524('0xfe'))['on'](_0xa524('0x121'),function(){_0x3b926b[_0xa524('0x49')](_0xa524('0x11f'));_0xfc8663(this,function(){_0x3b926b['removeClass'](_0xa524('0x11f'));});});_0x2d9c40[_0xa524('0x53')](_0xa524('0xfe'))['on'](_0xa524('0x122'),function(_0x29c5ee){0xd==_0x29c5ee['keyCode']&&(_0x3b926b[_0xa524('0x49')](_0xa524('0x11f')),_0xfc8663(this,function(){_0x3b926b[_0xa524('0x4a')](_0xa524('0x11f'));}));});});_0x2d9c40[_0xa524('0x53')](_0xa524('0xf5'))[_0xa524('0x36')](function(){var _0x2d9c40=_0x8944e6(this);_0x2d9c40[_0xa524('0x53')](_0xa524('0x100'))['on']('click.qd_ddc_remove',function(){_0x2d9c40['addClass'](_0xa524('0x11f'));_0x8c763f[_0xa524('0x123')](_0x8944e6(this),function(_0x3a13f8){_0x3a13f8?_0x2d9c40[_0xa524('0x124')](!0x0)[_0xa524('0x125')](function(){_0x2d9c40[_0xa524('0x126')]();_0x8c763f[_0xa524('0xd9')]();}):_0x2d9c40[_0xa524('0x4a')]('qd-loading');});return!0x1;});});};_0x8c763f['shippingCalculate']=function(_0x3caa83){var _0x5a724c=_0x3caa83['val'](),_0x5a724c=_0x5a724c[_0xa524('0x2')](/[^0-9\-]/g,''),_0x5a724c=_0x5a724c[_0xa524('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3'),_0x5a724c=_0x5a724c[_0xa524('0x2')](/(.{9}).*/g,'$1');_0x3caa83[_0xa524('0xd5')](_0x5a724c);0x9<=_0x5a724c[_0xa524('0x8')]&&(_0x3caa83['data']('qdDdcLastPostalCode')!=_0x5a724c&&_0x4e24a4[_0xa524('0x127')]({'postalCode':_0x5a724c,'country':_0xa524('0x128')})[_0xa524('0x1d')](function(_0xc57c1){window[_0xa524('0x5b')][_0xa524('0x28')]=_0xc57c1;_0x8c763f[_0xa524('0x8e')]();})[_0xa524('0x1f')](function(_0x2da6fc){_0x1284e4([_0xa524('0x129'),_0x2da6fc]);updateCartData();}),_0x3caa83[_0xa524('0x16')]('qdDdcLastPostalCode',_0x5a724c));};_0x8c763f[_0xa524('0x11a')]=function(_0x3d57dc,_0x3e616a,_0x14415f,_0x9194d7){function _0x1d9419(_0x238f55){_0x238f55=_0xa524('0x12a')!==typeof _0x238f55?!0x1:_0x238f55;_0x8c763f[_0xa524('0x8e')]();window['_QuatroDigital_DropDown'][_0xa524('0xd8')]=!0x1;_0x8c763f[_0xa524('0xd9')]();_0xa524('0x3')!==typeof window[_0xa524('0xf0')]&&'function'===typeof window[_0xa524('0xf0')][_0xa524('0xf1')]&&window[_0xa524('0xf0')]['exec'][_0xa524('0x29')](this);_0xa524('0xc')===typeof adminCart&&adminCart();_0x8944e6['fn'][_0xa524('0x64')](!0x0,void 0x0,_0x238f55);_0xa524('0xc')===typeof _0x9194d7&&_0x9194d7(_0x3e616a);}_0x14415f=_0x14415f||0x1;if(0x1>_0x14415f)return _0x3e616a;if(_0x5dee8c[_0xa524('0x5a')]){if(_0xa524('0x3')===typeof window[_0xa524('0x5b')][_0xa524('0x28')]['items'][_0x3d57dc[0x1]])return _0x1284e4('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x3d57dc[0x1]+']'),_0x3e616a;window['_QuatroDigital_DropDown'][_0xa524('0x28')]['items'][_0x3d57dc[0x1]][_0xa524('0xff')]=_0x14415f;window[_0xa524('0x5b')][_0xa524('0x28')]['items'][_0x3d57dc[0x1]][_0xa524('0x12b')]=_0x3d57dc[0x1];_0x4e24a4[_0xa524('0x12c')]([window[_0xa524('0x5b')]['getOrderForm'][_0xa524('0x40')][_0x3d57dc[0x1]]],[_0xa524('0x40'),_0xa524('0x39'),_0xa524('0x5f')])[_0xa524('0x1d')](function(_0x5bcdb9){window[_0xa524('0x5b')][_0xa524('0x28')]=_0x5bcdb9;_0x1d9419(!0x0);})[_0xa524('0x1f')](function(_0x2ad455){_0x1284e4([_0xa524('0x12d'),_0x2ad455]);_0x1d9419();});}else _0x1284e4(_0xa524('0x12e'));};_0x8c763f[_0xa524('0x123')]=function(_0x218806,_0x50a174){function _0x1858b2(_0x6bc06b){_0x6bc06b=_0xa524('0x12a')!==typeof _0x6bc06b?!0x1:_0x6bc06b;_0xa524('0x3')!==typeof window[_0xa524('0xf0')]&&_0xa524('0xc')===typeof window['_QuatroDigital_AmountProduct'][_0xa524('0xf1')]&&window[_0xa524('0xf0')][_0xa524('0xf1')][_0xa524('0x29')](this);'function'===typeof adminCart&&adminCart();_0x8944e6['fn'][_0xa524('0x64')](!0x0,void 0x0,_0x6bc06b);_0xa524('0xc')===typeof _0x50a174&&_0x50a174(_0x3b926b);}var _0x3b926b=!0x1,_0x5dd036=_0x8944e6(_0x218806)[_0xa524('0x8b')](_0xa524('0x119'));if(_0x5dee8c[_0xa524('0x5a')]){if(_0xa524('0x3')===typeof window[_0xa524('0x5b')]['getOrderForm']['items'][_0x5dd036])return _0x1284e4(_0xa524('0x12f')+_0x5dd036+']'),_0x3b926b;window[_0xa524('0x5b')][_0xa524('0x28')]['items'][_0x5dd036][_0xa524('0x12b')]=_0x5dd036;_0x4e24a4[_0xa524('0x130')]([window['_QuatroDigital_DropDown'][_0xa524('0x28')][_0xa524('0x40')][_0x5dd036]],[_0xa524('0x40'),_0xa524('0x39'),_0xa524('0x5f')])[_0xa524('0x1d')](function(_0x5e5393){_0x3b926b=!0x0;window[_0xa524('0x5b')]['getOrderForm']=_0x5e5393;_0xf55e9c(_0x5e5393);_0x1858b2(!0x0);})[_0xa524('0x1f')](function(_0x2935ab){_0x1284e4([_0xa524('0x131'),_0x2935ab]);_0x1858b2();});}else alert(_0xa524('0x132'));};_0x8c763f['scrollCart']=function(_0x3f5988,_0x2317c6,_0x30f94e,_0x42d599){_0x42d599=_0x42d599||_0x8944e6(_0xa524('0x133'));_0x3f5988=_0x3f5988||'+';_0x2317c6=_0x2317c6||0.9*_0x42d599['height']();_0x42d599[_0xa524('0x124')](!0x0,!0x0)[_0xa524('0x134')]({'scrollTop':isNaN(_0x30f94e)?_0x3f5988+'='+_0x2317c6+'px':_0x30f94e});};_0x5dee8c[_0xa524('0xd7')]||(_0x8c763f[_0xa524('0x8e')](),_0x8944e6['fn'][_0xa524('0x64')](!0x0));_0x8944e6(window)['on'](_0xa524('0x135'),function(){try{window[_0xa524('0x5b')]['getOrderForm']=void 0x0,_0x8c763f[_0xa524('0x8e')]();}catch(_0x9511e7){_0x1284e4(_0xa524('0x136')+_0x9511e7[_0xa524('0x24')],_0xa524('0x137'));}});_0xa524('0xc')===typeof _0x5dee8c[_0xa524('0x41')]?_0x5dee8c[_0xa524('0x41')][_0xa524('0x29')](this):_0x1284e4('Callback\x20não\x20é\x20uma\x20função');};_0x8944e6['fn'][_0xa524('0xb5')]=function(_0xc27eac){var _0x557922=_0x8944e6(this);_0x557922['fn']=new _0x8944e6[(_0xa524('0xb5'))](this,_0xc27eac);return _0x557922;};}catch(_0x24a04d){_0xa524('0x3')!==typeof console&&_0xa524('0xc')===typeof console['error']&&console[_0xa524('0x13')]('Oooops!\x20',_0x24a04d);}}(this));(function(_0x1a7e95){try{var _0x3eef60=jQuery;window[_0xa524('0xf0')]=window['_QuatroDigital_AmountProduct']||{};window['_QuatroDigital_AmountProduct'][_0xa524('0x40')]={};window[_0xa524('0xf0')]['allowRecalculate']=!0x1;window['_QuatroDigital_AmountProduct'][_0xa524('0x138')]=!0x1;window[_0xa524('0xf0')][_0xa524('0x139')]=!0x1;var _0xdde267=function(){if(window[_0xa524('0xf0')][_0xa524('0x13a')]){var _0x4fcc9a=!0x1;var _0x1a7e95={};window[_0xa524('0xf0')]['items']={};for(_0x36d861 in window[_0xa524('0x5b')][_0xa524('0x28')]['items'])if(_0xa524('0x15')===typeof window[_0xa524('0x5b')][_0xa524('0x28')]['items'][_0x36d861]){var _0x1dd72d=window[_0xa524('0x5b')][_0xa524('0x28')][_0xa524('0x40')][_0x36d861];'undefined'!==typeof _0x1dd72d['productId']&&null!==_0x1dd72d[_0xa524('0x13b')]&&''!==_0x1dd72d[_0xa524('0x13b')]&&(window[_0xa524('0xf0')][_0xa524('0x40')][_0xa524('0x13c')+_0x1dd72d[_0xa524('0x13b')]]=window[_0xa524('0xf0')][_0xa524('0x40')]['prod_'+_0x1dd72d[_0xa524('0x13b')]]||{},window[_0xa524('0xf0')]['items'][_0xa524('0x13c')+_0x1dd72d[_0xa524('0x13b')]][_0xa524('0x13d')]=_0x1dd72d[_0xa524('0x13b')],_0x1a7e95[_0xa524('0x13c')+_0x1dd72d[_0xa524('0x13b')]]||(window[_0xa524('0xf0')][_0xa524('0x40')][_0xa524('0x13c')+_0x1dd72d[_0xa524('0x13b')]]['qtt']=0x0),window['_QuatroDigital_AmountProduct'][_0xa524('0x40')]['prod_'+_0x1dd72d[_0xa524('0x13b')]]['qtt']+=_0x1dd72d[_0xa524('0xff')],_0x4fcc9a=!0x0,_0x1a7e95[_0xa524('0x13c')+_0x1dd72d['productId']]=!0x0);}var _0x36d861=_0x4fcc9a;}else _0x36d861=void 0x0;window['_QuatroDigital_AmountProduct'][_0xa524('0x13a')]&&(_0x3eef60(_0xa524('0x13e'))[_0xa524('0x126')](),_0x3eef60(_0xa524('0x13f'))[_0xa524('0x4a')]('qd-bap-item-added'));for(var _0x3b0f6b in window[_0xa524('0xf0')]['items']){_0x1dd72d=window[_0xa524('0xf0')][_0xa524('0x40')][_0x3b0f6b];if(_0xa524('0x15')!==typeof _0x1dd72d)return;_0x1a7e95=_0x3eef60(_0xa524('0x140')+_0x1dd72d[_0xa524('0x13d')]+']')[_0xa524('0x0')]('li');if(window[_0xa524('0xf0')][_0xa524('0x13a')]||!_0x1a7e95[_0xa524('0x53')]('.qd-bap-wrapper')[_0xa524('0x8')])_0x4fcc9a=_0x3eef60(_0xa524('0x141')),_0x4fcc9a['find'](_0xa524('0x142'))[_0xa524('0x50')](_0x1dd72d[_0xa524('0x3f')]),_0x1dd72d=_0x1a7e95['find'](_0xa524('0x143')),_0x1dd72d['length']?_0x1dd72d['prepend'](_0x4fcc9a)[_0xa524('0x49')](_0xa524('0x144')):_0x1a7e95[_0xa524('0xa9')](_0x4fcc9a);}_0x36d861&&(window['_QuatroDigital_AmountProduct'][_0xa524('0x13a')]=!0x1);};window[_0xa524('0xf0')][_0xa524('0xf1')]=function(){window[_0xa524('0xf0')]['allowRecalculate']=!0x0;_0xdde267[_0xa524('0x29')](this);};_0x3eef60(document)[_0xa524('0xb0')](function(){_0xdde267[_0xa524('0x29')](this);});}catch(_0x165480){_0xa524('0x3')!==typeof console&&_0xa524('0xc')===typeof console['error']&&console[_0xa524('0x13')]('Oooops!\x20',_0x165480);}}(this));(function(){try{var _0x16900f=jQuery,_0x2e7d7e,_0x2d93d6={'selector':_0xa524('0x145'),'dropDown':{},'buyButton':{}};_0x16900f['QD_smartCart']=function(_0x7fec53){var _0x43aa8f={};_0x2e7d7e=_0x16900f[_0xa524('0x14')](!0x0,{},_0x2d93d6,_0x7fec53);_0x7fec53=_0x16900f(_0x2e7d7e[_0xa524('0x85')])[_0xa524('0xb5')](_0x2e7d7e[_0xa524('0x146')]);_0x43aa8f[_0xa524('0x7b')]=_0xa524('0x3')!==typeof _0x2e7d7e['dropDown'][_0xa524('0xd7')]&&!0x1===_0x2e7d7e[_0xa524('0x146')][_0xa524('0xd7')]?_0x16900f(_0x2e7d7e[_0xa524('0x85')])[_0xa524('0x74')](_0x7fec53['fn'],_0x2e7d7e[_0xa524('0x7b')]):_0x16900f(_0x2e7d7e[_0xa524('0x85')])[_0xa524('0x74')](_0x2e7d7e[_0xa524('0x7b')]);_0x43aa8f[_0xa524('0x146')]=_0x7fec53;return _0x43aa8f;};_0x16900f['fn']['smartCart']=function(){_0xa524('0x15')===typeof console&&_0xa524('0xc')===typeof console[_0xa524('0x2d')]&&console[_0xa524('0x2d')](_0xa524('0x147'));};_0x16900f['smartCart']=_0x16900f['fn']['smartCart'];}catch(_0x5096a8){_0xa524('0x3')!==typeof console&&_0xa524('0xc')===typeof console['error']&&console[_0xa524('0x13')](_0xa524('0x66'),_0x5096a8);}}());

/* Quatro Digital - Product Thumbs // Carlos Vinicius // Todos os direitos reservados. */
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs();a.trigger("QuatroDigital.pt_callback",[a])}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return a.length?$.extend({},a,new b(a)):a},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0x0e5b=['fadeTo','addClass','qdpv-video-on','stop','add','find','iframe','a:not(\x27.qd-videoLink\x27)','click.removeVideo','hide','removeAttr','style','removeClass','.qd-videoItem','call','string','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27','\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','click.playVideo','.ON','controlVideo','.qd-playerWrapper\x20iframe','contentWindow','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','attr','rel','a:not(.qd-videoLink)','click','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','insertThumbsIn','appendTo','trigger','QuatroDigital.pv_video_added','ajaxStop','load','ImageControl','.qd-videoLink','body','.produto','object','undefined','toLowerCase','warn','info','[Video\x20in\x20product]\x20','error','qdVideoInProduct','extend','start','td.value-field.Videos:first','http','ul.thumbs','text','replace','split','length','indexOf','pop','shift','youtu.be','push','be/','<div\x20class=\x22qd-playerWrapper\x22></div>','prependTo','#include','wrap','<div\x20class=\x22qd-playerContainer\x22></div>','fromCharCode','charCodeAt','toUpperCase','join','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','youtube','html','?wmode=transparent&rel=0&enablejsapi=1\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>','data','height'];(function(_0x343849,_0x10dbd3){var _0x2e7cbf=function(_0x4e2a6b){while(--_0x4e2a6b){_0x343849['push'](_0x343849['shift']());}};_0x2e7cbf(++_0x10dbd3);}(_0x0e5b,0x170));var _0xb0e5=function(_0x55919a,_0x4c0a6c){_0x55919a=_0x55919a-0x0;var _0x5d7dc9=_0x0e5b[_0x55919a];return _0x5d7dc9;};(function(_0x34cad8){$(function(){if($(document[_0xb0e5('0x0')])['is'](_0xb0e5('0x1'))){var _0x5126f7=[];var _0x6ecbaa=function(_0x3e1f53,_0x57e791){_0xb0e5('0x2')===typeof console&&(_0xb0e5('0x3')!==typeof _0x57e791&&'alerta'===_0x57e791[_0xb0e5('0x4')]()?console[_0xb0e5('0x5')]('[Video\x20in\x20product]\x20'+_0x3e1f53):_0xb0e5('0x3')!==typeof _0x57e791&&_0xb0e5('0x6')===_0x57e791['toLowerCase']()?console[_0xb0e5('0x6')](_0xb0e5('0x7')+_0x3e1f53):console[_0xb0e5('0x8')]('[Video\x20in\x20product]\x20'+_0x3e1f53));};window['qdVideoInProduct']=window[_0xb0e5('0x9')]||{};var _0x47b421=$[_0xb0e5('0xa')](!0x0,{'insertThumbsIn':_0xb0e5('0xb'),'videoFieldSelector':_0xb0e5('0xc'),'controlVideo':!0x0,'urlProtocol':_0xb0e5('0xd')},window[_0xb0e5('0x9')]);var _0xcf88fc=$(_0xb0e5('0xe'));var _0x4830e8=$('div#image');var _0x49146d=$(_0x47b421['videoFieldSelector'])[_0xb0e5('0xf')]()[_0xb0e5('0x10')](/\;\s*/,';')[_0xb0e5('0x11')](';');for(var _0x1142dc=0x0;_0x1142dc<_0x49146d[_0xb0e5('0x12')];_0x1142dc++)-0x1<_0x49146d[_0x1142dc][_0xb0e5('0x13')]('youtube')?_0x5126f7['push'](_0x49146d[_0x1142dc][_0xb0e5('0x11')]('v=')[_0xb0e5('0x14')]()['split'](/[&#]/)[_0xb0e5('0x15')]()):-0x1<_0x49146d[_0x1142dc]['indexOf'](_0xb0e5('0x16'))&&_0x5126f7[_0xb0e5('0x17')](_0x49146d[_0x1142dc][_0xb0e5('0x11')](_0xb0e5('0x18'))[_0xb0e5('0x14')]()[_0xb0e5('0x11')](/[\?&#]/)[_0xb0e5('0x15')]());var _0x3dabca=$(_0xb0e5('0x19'));_0x3dabca[_0xb0e5('0x1a')](_0xb0e5('0x1b'));_0x3dabca[_0xb0e5('0x1c')](_0xb0e5('0x1d'));_0x49146d=function(_0xedb4e6){var _0x4c573b={'t':'nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x1b74db){var _0x19c44d=function(_0x22bcb4){return _0x22bcb4;};var _0x45f2db=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x1b74db=_0x1b74db['d'+_0x45f2db[0x10]+'c'+_0x45f2db[0x11]+'m'+_0x19c44d(_0x45f2db[0x1])+'n'+_0x45f2db[0xd]]['l'+_0x45f2db[0x12]+'c'+_0x45f2db[0x0]+'ti'+_0x19c44d('o')+'n'];var _0x1b7963=function(_0x2b0c7d){return escape(encodeURIComponent(_0x2b0c7d[_0xb0e5('0x10')](/\./g,'¨')[_0xb0e5('0x10')](/[a-zA-Z]/g,function(_0x12f026){return String[_0xb0e5('0x1e')](('Z'>=_0x12f026?0x5a:0x7a)>=(_0x12f026=_0x12f026[_0xb0e5('0x1f')](0x0)+0xd)?_0x12f026:_0x12f026-0x1a);})));};var _0x5831fd=_0x1b7963(_0x1b74db[[_0x45f2db[0x9],_0x19c44d('o'),_0x45f2db[0xc],_0x45f2db[_0x19c44d(0xd)]]['join']('')]);_0x1b7963=_0x1b7963((window[['js',_0x19c44d('no'),'m',_0x45f2db[0x1],_0x45f2db[0x4][_0xb0e5('0x20')](),'ite'][_0xb0e5('0x21')]('')]||_0xb0e5('0x22'))+['.v',_0x45f2db[0xd],'e',_0x19c44d('x'),'co',_0x19c44d('mm'),_0xb0e5('0x23'),_0x45f2db[0x1],'.c',_0x19c44d('o'),'m.',_0x45f2db[0x13],'r'][_0xb0e5('0x21')](''));for(var _0xef3be7 in _0x4c573b){if(_0x1b7963===_0xef3be7+_0x4c573b[_0xef3be7]||_0x5831fd===_0xef3be7+_0x4c573b[_0xef3be7]){var _0x163ccb='tr'+_0x45f2db[0x11]+'e';break;}_0x163ccb='f'+_0x45f2db[0x0]+'ls'+_0x19c44d(_0x45f2db[0x1])+'';}_0x19c44d=!0x1;-0x1<_0x1b74db[[_0x45f2db[0xc],'e',_0x45f2db[0x0],'rc',_0x45f2db[0x9]]['join']('')][_0xb0e5('0x13')](_0xb0e5('0x24'))&&(_0x19c44d=!0x0);return[_0x163ccb,_0x19c44d];}(_0xedb4e6);}(window);if(!eval(_0x49146d[0x0]))return _0x49146d[0x1]?_0x6ecbaa('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x12cba1=function(_0xec1cef,_0x513296){_0xb0e5('0x25')===_0x513296&&_0x3dabca[_0xb0e5('0x26')]('<iframe\x20src=\x22'+_0x47b421['urlProtocol']+'://www.youtube.com/embed/'+_0xec1cef+_0xb0e5('0x27'));_0x4830e8['data']('height',_0x4830e8[_0xb0e5('0x28')](_0xb0e5('0x29'))||_0x4830e8[_0xb0e5('0x29')]());_0x4830e8['stop'](!0x0,!0x0)[_0xb0e5('0x2a')](0x1f4,0x0,function(){$(_0xb0e5('0x0'))[_0xb0e5('0x2b')](_0xb0e5('0x2c'));});_0x3dabca[_0xb0e5('0x2d')](!0x0,!0x0)[_0xb0e5('0x2a')](0x1f4,0x1,function(){_0x4830e8[_0xb0e5('0x2e')](_0x3dabca)['animate']({'height':_0x3dabca[_0xb0e5('0x2f')](_0xb0e5('0x30'))[_0xb0e5('0x29')]()},0x2bc);});};removePlayer=function(){_0xcf88fc[_0xb0e5('0x2f')](_0xb0e5('0x31'))['bind'](_0xb0e5('0x32'),function(){_0x3dabca[_0xb0e5('0x2d')](!0x0,!0x0)[_0xb0e5('0x2a')](0x1f4,0x0,function(){$(this)[_0xb0e5('0x33')]()[_0xb0e5('0x34')](_0xb0e5('0x35'));$(_0xb0e5('0x0'))[_0xb0e5('0x36')](_0xb0e5('0x2c'));});_0x4830e8[_0xb0e5('0x2d')](!0x0,!0x0)['fadeTo'](0x1f4,0x1,function(){var _0x23d767=_0x4830e8[_0xb0e5('0x28')]('height');_0x23d767&&_0x4830e8['animate']({'height':_0x23d767},0x2bc);});});};var _0x4aaca8=function(){if(!_0xcf88fc[_0xb0e5('0x2f')](_0xb0e5('0x37'))[_0xb0e5('0x12')])for(vId in removePlayer[_0xb0e5('0x38')](this),_0x5126f7)if(_0xb0e5('0x39')===typeof _0x5126f7[vId]&&''!==_0x5126f7[vId]){var _0x91dece=$(_0xb0e5('0x3a')+_0x5126f7[vId]+_0xb0e5('0x3b')+_0x5126f7[vId]+_0xb0e5('0x3c')+_0x5126f7[vId]+_0xb0e5('0x3d'));_0x91dece[_0xb0e5('0x2f')]('a')['bind'](_0xb0e5('0x3e'),function(){var _0x58ca80=$(this);_0xcf88fc[_0xb0e5('0x2f')](_0xb0e5('0x3f'))[_0xb0e5('0x36')]('ON');_0x58ca80[_0xb0e5('0x2b')]('ON');0x1==_0x47b421[_0xb0e5('0x40')]?$(_0xb0e5('0x41'))[_0xb0e5('0x12')]?(_0x12cba1[_0xb0e5('0x38')](this,'',''),$(_0xb0e5('0x41'))[0x0][_0xb0e5('0x42')][_0xb0e5('0x43')](_0xb0e5('0x44'),'*')):_0x12cba1[_0xb0e5('0x38')](this,_0x58ca80[_0xb0e5('0x45')](_0xb0e5('0x46')),'youtube'):_0x12cba1[_0xb0e5('0x38')](this,_0x58ca80[_0xb0e5('0x45')](_0xb0e5('0x46')),'youtube');return!0x1;});0x1==_0x47b421[_0xb0e5('0x40')]&&_0xcf88fc['find'](_0xb0e5('0x47'))[_0xb0e5('0x48')](function(_0x282f22){$(_0xb0e5('0x41'))['length']&&$(_0xb0e5('0x41'))[0x0][_0xb0e5('0x42')][_0xb0e5('0x43')](_0xb0e5('0x49'),'*');});_0xb0e5('0xb')===_0x47b421[_0xb0e5('0x4a')]?_0x91dece[_0xb0e5('0x1a')](_0xcf88fc):_0x91dece[_0xb0e5('0x4b')](_0xcf88fc);_0x91dece[_0xb0e5('0x4c')](_0xb0e5('0x4d'),[_0x5126f7[vId],_0x91dece]);}};$(document)[_0xb0e5('0x4e')](_0x4aaca8);$(window)[_0xb0e5('0x4f')](_0x4aaca8);(function(){var _0x3e7387=this;var _0x570c6d=window[_0xb0e5('0x50')]||function(){};window[_0xb0e5('0x50')]=function(_0x59b309,_0x4172c0){$(_0x59b309||'')['is'](_0xb0e5('0x51'))||(_0x570c6d[_0xb0e5('0x38')](this,_0x59b309,_0x4172c0),_0x4aaca8[_0xb0e5('0x38')](_0x3e7387));};}());}});}(this));

/* Quatro Digital - Mosaic Banners // Carlos Vinicius // Todos os direitos reservados */
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

