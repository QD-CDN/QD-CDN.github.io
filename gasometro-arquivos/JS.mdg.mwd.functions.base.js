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
			Product.itemSelected();
			// Product.setBuyUrl();
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
			$(".specification-row div:first").each(function () {
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
				$(".product-buy-button a").attr( "href", "/checkout/cart/add?" + uri.join("&") + "&" + ( btns.first().attr("href").match(/sc=[0-9]+/i) || [""] )[0] );
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
			$(window).bind("skuSelected", function () {
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
var _0x363b=['join','QD_SmartPrice','Smart\x20Price','object','info','warn','unshift','alerta','toLowerCase','apply','error','text','match','.flag','[class*=\x27desconto\x27]','.productRightColumn','strong.skuBestPrice','label.skuBestInstallmentNumber','label.skuBestInstallmentValue','strong.skuPrice','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','productPage','isProductPage','closest','wrapperElement','find','skuBestPrice','addClass','qd-active','qd-sp-active','.qd_sp_on,\x20.qd_sp_ignored','.qd_active','length','removeClass','oneFlagByItem','siblings','.qd_sp_on','qd_sp_ignored','qd_sp_on','isDiscountFlag','div[skuCorrente]:first','attr','skuCorrente','skus','sku','available','bestPrice','isSmartCheckout','qd-sp-product-unavailable','getDiscountValue','Por\x20alguma\x20razão\x20não\x20consegui\x20obter\x20o\x20preço\x20deste\x20produto\x20:(','appliedDiscount','.qd_productOldPrice','val','changeNativePrice','.qd_displayPrice','skuPrice','.qd-sp-display-discount','html','installments','changeInstallments','installmentValue','.qd_sp_display_installments','.qd_sp_installments','append','prepend','changeNativeSaveAmount','em.economia-de','each','qd_sp_processedItem','startedByWrapper','flagElement','forcePromotion','string','not','.qd_productPrice:not(.qd_sp_processedItem)','style','display:none\x20!important;','after','call','extend','boolean','function','prototype','trim','replace','abs','undefined','round','split'];(function(_0xdedb93,_0x5d1b2e){var _0x24e6c7=function(_0x558892){while(--_0x558892){_0xdedb93['push'](_0xdedb93['shift']());}};_0x24e6c7(++_0x5d1b2e);}(_0x363b,0x17c));var _0xb363=function(_0x3673be,_0x1dbb0b){_0x3673be=_0x3673be-0x0;var _0x5bd2ec=_0x363b[_0x3673be];return _0x5bd2ec;};_0xb363('0x0')!==typeof String[_0xb363('0x1')][_0xb363('0x2')]&&(String[_0xb363('0x1')][_0xb363('0x2')]=function(){return this[_0xb363('0x3')](/^\s+|\s+$/g,'');});function qd_number_format(_0x4341d9,_0x356393,_0x18d5fb,_0x1e9bca){_0x4341d9=(_0x4341d9+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x4341d9=isFinite(+_0x4341d9)?+_0x4341d9:0x0;_0x356393=isFinite(+_0x356393)?Math[_0xb363('0x4')](_0x356393):0x0;_0x1e9bca=_0xb363('0x5')===typeof _0x1e9bca?',':_0x1e9bca;_0x18d5fb='undefined'===typeof _0x18d5fb?'.':_0x18d5fb;var _0x1f9d36='',_0x1f9d36=function(_0x2069e0,_0x4d6e98){var _0x356393=Math['pow'](0xa,_0x4d6e98);return''+(Math['round'](_0x2069e0*_0x356393)/_0x356393)['toFixed'](_0x4d6e98);},_0x1f9d36=(_0x356393?_0x1f9d36(_0x4341d9,_0x356393):''+Math[_0xb363('0x6')](_0x4341d9))[_0xb363('0x7')]('.');0x3<_0x1f9d36[0x0]['length']&&(_0x1f9d36[0x0]=_0x1f9d36[0x0][_0xb363('0x3')](/\B(?=(?:\d{3})+(?!\d))/g,_0x1e9bca));(_0x1f9d36[0x1]||'')['length']<_0x356393&&(_0x1f9d36[0x1]=_0x1f9d36[0x1]||'',_0x1f9d36[0x1]+=Array(_0x356393-_0x1f9d36[0x1]['length']+0x1)[_0xb363('0x8')]('0'));return _0x1f9d36[_0xb363('0x8')](_0x18d5fb);};(function(_0x3ade43){'use strict';var _0xf54049=jQuery;if(typeof _0xf54049['fn'][_0xb363('0x9')]===_0xb363('0x0'))return;var _0x7ddd3a=_0xb363('0xa');var _0x100a81=function(_0x58ae89,_0x58f2fa){if(_0xb363('0xb')===typeof console&&_0xb363('0x0')===typeof console['error']&&'function'===typeof console[_0xb363('0xc')]&&'function'===typeof console[_0xb363('0xd')]){var _0x3d0fe4;_0xb363('0xb')===typeof _0x58ae89?(_0x58ae89[_0xb363('0xe')]('['+_0x7ddd3a+']\x0a'),_0x3d0fe4=_0x58ae89):_0x3d0fe4=['['+_0x7ddd3a+']\x0a'+_0x58ae89];if('undefined'===typeof _0x58f2fa||_0xb363('0xf')!==_0x58f2fa[_0xb363('0x10')]()&&'aviso'!==_0x58f2fa[_0xb363('0x10')]())if('undefined'!==typeof _0x58f2fa&&_0xb363('0xc')===_0x58f2fa[_0xb363('0x10')]())try{console['info'][_0xb363('0x11')](console,_0x3d0fe4);}catch(_0x2bb455){console[_0xb363('0xc')](_0x3d0fe4[_0xb363('0x8')]('\x0a'));}else try{console[_0xb363('0x12')]['apply'](console,_0x3d0fe4);}catch(_0x363fd6){console[_0xb363('0x12')](_0x3d0fe4[_0xb363('0x8')]('\x0a'));}else try{console['warn'][_0xb363('0x11')](console,_0x3d0fe4);}catch(_0x468a8c){console['warn'](_0x3d0fe4[_0xb363('0x8')]('\x0a'));}}};var _0xf61aa1=/[0-9]+\%/i;var _0x42e021=/[0-9\.]+(?=\%)/i;var _0x29f2ab={'isDiscountFlag':function(_0x48e016){if(_0x48e016[_0xb363('0x13')]()['search'](_0xf61aa1)>-0x1)return!![];return![];},'getDiscountValue':function(_0x1357cb){return _0x1357cb[_0xb363('0x13')]()[_0xb363('0x14')](_0x42e021);},'startedByWrapper':![],'flagElement':_0xb363('0x15'),'wrapperElement':'li','filterFlagBy':_0xb363('0x16'),'forcePromotion':null,'appliedDiscount':null,'oneFlagByItem':!![],'isSmartCheckout':!![],'changeInstallments':![],'productPage':{'changeNativeSaveAmount':!![],'changeNativePrice':!![],'changeInstallments':![],'isProductPage':'auto','wrapperElement':_0xb363('0x17'),'skuBestPrice':_0xb363('0x18'),'installments':_0xb363('0x19'),'installmentValue':_0xb363('0x1a'),'skuPrice':_0xb363('0x1b')}};_0xf54049['fn'][_0xb363('0x9')]=function(){};var _0x6922c9=function(_0x1a05e0){var _0x25905e={'t':_0xb363('0x1c')};return function(_0x4499d1){var _0xe73f84,_0x239b83,_0x3be5b7,_0x1fb293;_0x239b83=function(_0x4c848c){return _0x4c848c;};_0x3be5b7=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4499d1=_0x4499d1['d'+_0x3be5b7[0x10]+'c'+_0x3be5b7[0x11]+'m'+_0x239b83(_0x3be5b7[0x1])+'n'+_0x3be5b7[0xd]]['l'+_0x3be5b7[0x12]+'c'+_0x3be5b7[0x0]+'ti'+_0x239b83('o')+'n'];_0xe73f84=function(_0x2b233c){return escape(encodeURIComponent(_0x2b233c[_0xb363('0x3')](/\./g,'¨')[_0xb363('0x3')](/[a-zA-Z]/g,function(_0x36f6a6){return String[_0xb363('0x1d')](('Z'>=_0x36f6a6?0x5a:0x7a)>=(_0x36f6a6=_0x36f6a6[_0xb363('0x1e')](0x0)+0xd)?_0x36f6a6:_0x36f6a6-0x1a);})));};var _0x48ac98=_0xe73f84(_0x4499d1[[_0x3be5b7[0x9],_0x239b83('o'),_0x3be5b7[0xc],_0x3be5b7[_0x239b83(0xd)]][_0xb363('0x8')]('')]);_0xe73f84=_0xe73f84((window[['js',_0x239b83('no'),'m',_0x3be5b7[0x1],_0x3be5b7[0x4][_0xb363('0x1f')](),_0xb363('0x20')]['join']('')]||'---')+['.v',_0x3be5b7[0xd],'e',_0x239b83('x'),'co',_0x239b83('mm'),_0xb363('0x21'),_0x3be5b7[0x1],'.c',_0x239b83('o'),'m.',_0x3be5b7[0x13],'r'][_0xb363('0x8')](''));for(var _0x20e9b9 in _0x25905e){if(_0xe73f84===_0x20e9b9+_0x25905e[_0x20e9b9]||_0x48ac98===_0x20e9b9+_0x25905e[_0x20e9b9]){_0x1fb293='tr'+_0x3be5b7[0x11]+'e';break;}_0x1fb293='f'+_0x3be5b7[0x0]+'ls'+_0x239b83(_0x3be5b7[0x1])+'';}_0x239b83=!0x1;-0x1<_0x4499d1[[_0x3be5b7[0xc],'e',_0x3be5b7[0x0],'rc',_0x3be5b7[0x9]][_0xb363('0x8')]('')][_0xb363('0x22')](_0xb363('0x23'))&&(_0x239b83=!0x0);return[_0x1fb293,_0x239b83];}(_0x1a05e0);}(window);if(!eval(_0x6922c9[0x0]))return _0x6922c9[0x1]?_0x100a81('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x470d65=function(_0x5780a8,_0x67e478){'use strict';var _0x51d8e0=function(_0x49173e){'use strict';var _0x235c8e,_0x38dd26,_0x3440a3,_0x2a4b81,_0x3857eb,_0xbb38cb,_0x20309a,_0x19ef12,_0x5756fd,_0x4a8d9a,_0x2dc02a,_0x36ca51,_0x4c2545,_0x469114,_0x40c9b5,_0x2917fa,_0x5ba103,_0x4cec14,_0x5a80d2;var _0x57a982=_0xf54049(this);_0x49173e=typeof _0x49173e===_0xb363('0x5')?![]:_0x49173e;if(_0x67e478[_0xb363('0x24')][_0xb363('0x25')])var _0x4bfc4f=_0x57a982[_0xb363('0x26')](_0x67e478[_0xb363('0x24')][_0xb363('0x27')]);else var _0x4bfc4f=_0x57a982[_0xb363('0x26')](_0x67e478[_0xb363('0x27')]);if(!_0x49173e&&!_0x57a982['is'](_0x67e478['filterFlagBy'])){if(_0x67e478['productPage'][_0xb363('0x25')]&&_0x4bfc4f['is'](_0x67e478['productPage']['wrapperElement'])){_0x4bfc4f[_0xb363('0x28')](_0x67e478['productPage'][_0xb363('0x29')])[_0xb363('0x2a')](_0xb363('0x2b'));_0x4bfc4f['addClass'](_0xb363('0x2c'));}return;}var _0x1af877=_0x67e478[_0xb363('0x24')][_0xb363('0x25')];if(_0x57a982['is'](_0xb363('0x2d'))&&!_0x1af877)return;if(_0x1af877){_0x19ef12=_0x4bfc4f['find'](_0x67e478[_0xb363('0x24')]['skuBestPrice']);if(_0x19ef12[_0xb363('0x28')](_0xb363('0x2e'))[_0xb363('0x2f')])return;_0x19ef12[_0xb363('0x30')]('qd-active');_0x4bfc4f[_0xb363('0x30')](_0xb363('0x2c'));}if(_0x67e478[_0xb363('0x31')]&&_0x57a982[_0xb363('0x32')](_0xb363('0x33'))['length']){_0x57a982[_0xb363('0x2a')](_0xb363('0x34'));return;}_0x57a982['addClass'](_0xb363('0x35'));if(!_0x67e478[_0xb363('0x36')](_0x57a982))return;if(_0x1af877){_0x3440a3={};var _0x1276c5=parseInt(_0xf54049(_0xb363('0x37'))[_0xb363('0x38')](_0xb363('0x39')),0xa);if(_0x1276c5){for(var _0x34ac57=0x0;_0x34ac57<skuJson['skus'][_0xb363('0x2f')];_0x34ac57++){if(skuJson[_0xb363('0x3a')][_0x34ac57][_0xb363('0x3b')]==_0x1276c5){_0x3440a3=skuJson['skus'][_0x34ac57];break;}}}else{var _0x4ce4a2=0x5af3107a3fff;for(var _0x2f526d in skuJson['skus']){if(typeof skuJson[_0xb363('0x3a')][_0x2f526d]==='function')continue;if(!skuJson[_0xb363('0x3a')][_0x2f526d][_0xb363('0x3c')])continue;if(skuJson[_0xb363('0x3a')][_0x2f526d][_0xb363('0x3d')]<_0x4ce4a2){_0x4ce4a2=skuJson[_0xb363('0x3a')][_0x2f526d]['bestPrice'];_0x3440a3=skuJson[_0xb363('0x3a')][_0x2f526d];}}}}_0x2917fa=!![];_0x5ba103=0x0;if(_0x67e478[_0xb363('0x3e')]&&_0x4cec14){_0x2917fa=skuJson[_0xb363('0x3c')];if(!_0x2917fa)return _0x4bfc4f[_0xb363('0x2a')](_0xb363('0x3f'));}_0x38dd26=_0x67e478[_0xb363('0x40')](_0x57a982);_0x235c8e=parseFloat(_0x38dd26,0xa);if(isNaN(_0x235c8e))return _0x100a81(['O\x20valor\x20informado\x20p/\x20o\x20desconto\x20não\x20é\x20um\x20número.',_0x57a982],_0xb363('0xf'));var _0x44c60d=function(_0x2d7287){if(_0x1af877)_0x2a4b81=(_0x2d7287['bestPrice']||0x0)/0x64;else{_0x4c2545=_0x4bfc4f[_0xb363('0x28')]('.qd_productPrice');_0x2a4b81=parseFloat((_0x4c2545['val']()||'')['replace'](/[^0-9\.\,]+/i,'')['replace']('.','')[_0xb363('0x3')](',','.'),0xa);}if(isNaN(_0x2a4b81))return _0x100a81([_0xb363('0x41'),_0x57a982,_0x4bfc4f]);if(_0x67e478[_0xb363('0x42')]!==null){_0x469114=0x0;if(!isNaN(_0x67e478[_0xb363('0x42')]))_0x469114=_0x67e478[_0xb363('0x42')];else{_0x40c9b5=_0x4bfc4f[_0xb363('0x28')](_0x67e478[_0xb363('0x42')]);if(_0x40c9b5[_0xb363('0x2f')])_0x469114=_0x67e478[_0xb363('0x40')](_0x40c9b5);}_0x469114=parseFloat(_0x469114,0xa);if(isNaN(_0x469114))_0x469114=0x0;if(_0x469114!==0x0)_0x2a4b81=_0x2a4b81*0x64/(0x64-_0x469114);}if(_0x1af877)_0x3857eb=(_0x2d7287['listPrice']||0x0)/0x64;else _0x3857eb=parseFloat((_0x4bfc4f['find'](_0xb363('0x43'))[_0xb363('0x44')]()||'')[_0xb363('0x3')](/[^0-9\.\,]+/i,'')[_0xb363('0x3')]('.','')[_0xb363('0x3')](',','.'),0xa);if(isNaN(_0x3857eb))_0x3857eb=0.001;_0xbb38cb=_0x2a4b81*((0x64-_0x235c8e)/0x64);if(_0x1af877&&_0x67e478[_0xb363('0x24')][_0xb363('0x45')]){_0x19ef12[_0xb363('0x13')](_0x19ef12['text']()[_0xb363('0x2')]()[_0xb363('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0xbb38cb,0x2,',','.')))['addClass'](_0xb363('0x2b'));_0x4bfc4f['addClass'](_0xb363('0x2c'));}else{_0x5a80d2=_0x4bfc4f['find'](_0xb363('0x46'));_0x5a80d2[_0xb363('0x13')](_0x5a80d2[_0xb363('0x13')]()[_0xb363('0x3')](/[0-9\.]+,[0-9]+/i,'')+qd_number_format(_0xbb38cb,0x2,',','.'));}if(_0x1af877){_0x20309a=_0x4bfc4f[_0xb363('0x28')](_0x67e478[_0xb363('0x24')][_0xb363('0x47')]);if(_0x20309a['length'])_0x20309a[_0xb363('0x13')](_0x20309a[_0xb363('0x13')]()[_0xb363('0x2')]()[_0xb363('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0xbb38cb,0x2,',','.')));}var _0x5de178=_0x4bfc4f[_0xb363('0x28')](_0xb363('0x48'));_0x5de178['text'](_0x5de178['text']()[_0xb363('0x3')](/[0-9]+\%/i,_0x235c8e+'%'));var _0x559b06=function(_0x3deb63,_0x12bc0c,_0x53d20c){var _0x2f7630=_0x4bfc4f[_0xb363('0x28')](_0x3deb63);if(_0x2f7630[_0xb363('0x2f')])_0x2f7630['html'](_0x2f7630[_0xb363('0x49')]()[_0xb363('0x2')]()[_0xb363('0x3')](/[0-9]{1,2}/,_0x53d20c?_0x53d20c:_0x2d7287[_0xb363('0x4a')]||0x0));var _0x50ac93=_0x4bfc4f[_0xb363('0x28')](_0x12bc0c);if(_0x50ac93['length'])_0x50ac93['html'](_0x50ac93[_0xb363('0x49')]()[_0xb363('0x2')]()['replace'](/[0-9\.]+\,[0-9]+/,qd_number_format(_0xbb38cb/(_0x53d20c?_0x53d20c:_0x2d7287[_0xb363('0x4a')]||0x1),0x2,',','.')));};if(_0x1af877&&_0x67e478[_0xb363('0x24')][_0xb363('0x4b')])_0x559b06(_0x67e478[_0xb363('0x24')]['installments'],_0x67e478[_0xb363('0x24')][_0xb363('0x4c')]);else if(_0x67e478[_0xb363('0x4b')])_0x559b06(_0xb363('0x4d'),'.qd_sp_display_installmentValue',parseInt(_0x4bfc4f[_0xb363('0x28')](_0xb363('0x4e'))[_0xb363('0x44')]()||0x1)||0x1);_0x4bfc4f['find']('.qd_saveAmount')[_0xb363('0x4f')](qd_number_format(_0x3857eb-_0xbb38cb,0x2,',','.'));_0x4bfc4f[_0xb363('0x28')]('.qd_saveAmountPercent')[_0xb363('0x50')](qd_number_format((_0x3857eb-_0xbb38cb)*0x64/_0x3857eb,0x2,',','.'));if(_0x1af877&&_0x67e478[_0xb363('0x24')][_0xb363('0x51')]){_0xf54049(_0xb363('0x52'))[_0xb363('0x53')](function(){_0x2dc02a=_0xf54049(this);_0x2dc02a[_0xb363('0x13')](_0x2dc02a[_0xb363('0x13')]()['trim']()[_0xb363('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x3857eb-_0xbb38cb,0x2,',','.')));_0x2dc02a[_0xb363('0x2a')](_0xb363('0x2b'));});}};_0x44c60d(_0x3440a3);if(_0x1af877)_0xf54049(window)['on']('skuSelected.vtex',function(_0x47b55e,_0x451bac,_0xbed291){_0x44c60d(_0xbed291);});_0x4bfc4f[_0xb363('0x2a')](_0xb363('0x54'));if(!_0x1af877)_0x4c2545[_0xb363('0x2a')](_0xb363('0x54'));};(_0x67e478[_0xb363('0x55')]?_0x5780a8[_0xb363('0x28')](_0x67e478[_0xb363('0x56')]):_0x5780a8)[_0xb363('0x53')](function(){_0x51d8e0['call'](this,![]);});if(typeof _0x67e478[_0xb363('0x57')]==_0xb363('0x58')){var _0x2f4c23=_0x67e478[_0xb363('0x55')]?_0x5780a8:_0x5780a8[_0xb363('0x26')](_0x67e478[_0xb363('0x27')]);if(_0x67e478['productPage']['isProductPage'])_0x2f4c23=_0x2f4c23[_0xb363('0x26')](_0x67e478[_0xb363('0x24')][_0xb363('0x27')])[_0xb363('0x59')]('.qd_sp_processedItem');else _0x2f4c23=_0x2f4c23[_0xb363('0x28')](_0xb363('0x5a'));_0x2f4c23[_0xb363('0x53')](function(){var _0x3fc1e4=_0xf54049(_0x67e478[_0xb363('0x57')]);_0x3fc1e4[_0xb363('0x38')](_0xb363('0x5b'),_0xb363('0x5c'));if(_0x67e478[_0xb363('0x24')]['isProductPage'])_0xf54049(this)['append'](_0x3fc1e4);else _0xf54049(this)[_0xb363('0x5d')](_0x3fc1e4);_0x51d8e0[_0xb363('0x5e')](_0x3fc1e4,!![]);});}};_0xf54049['fn'][_0xb363('0x9')]=function(_0x4f65b2){var _0x35172a=_0xf54049(this);if(!_0x35172a['length'])return _0x35172a;var _0x5666d9=_0xf54049[_0xb363('0x5f')](!![],{},_0x29f2ab,_0x4f65b2);if(typeof _0x5666d9[_0xb363('0x24')][_0xb363('0x25')]!=_0xb363('0x60'))_0x5666d9['productPage'][_0xb363('0x25')]=_0xf54049(document['body'])['is']('.produto');_0x470d65(_0x35172a,_0x5666d9);return _0x35172a;};}(this));
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
var _0xb820=['qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','qd-am-','-li','QuatroDigital.am.callback','extend','.qd_amazing_menu_auto','closest','function','QD_amazingMenu','/qd-amazing-menu','object','error','info','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','toLowerCase','aviso','apply','join','qdAmAddNdx','each','addClass','qd-am-li-','first','qd-am-first','last','qd-am-last','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','---','erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','.qd-am-banner','filter','.qd-am-collection','length','parent','url','html','img[alt=\x27','attr','getParent','clone','insertBefore','hide','trim','data-qdam-value','qd-am-content-loaded','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','children',':not(ul)','text','replaceSpecialChars','>li','qd-amazing-menu','>ul','qd-am-column'];(function(_0x5aea39,_0x4dab22){var _0x3a009f=function(_0x3f89be){while(--_0x3f89be){_0x5aea39['push'](_0x5aea39['shift']());}};_0x3a009f(++_0x4dab22);}(_0xb820,0xe6));var _0x0b82=function(_0x2fb8b1,_0x19c7dc){_0x2fb8b1=_0x2fb8b1-0x0;var _0x15c58a=_0xb820[_0x2fb8b1];return _0x15c58a;};(function(_0x451e6f){_0x451e6f['fn']['getParent']=_0x451e6f['fn'][_0x0b82('0x0')];}(jQuery));(function(_0x4c4540){var _0x169038;var _0x4c673b=jQuery;if(_0x0b82('0x1')!==typeof _0x4c673b['fn'][_0x0b82('0x2')]){var _0x3e4469={'url':_0x0b82('0x3'),'callback':function(){},'ajaxCallback':function(){}};var _0x1c3f18=function(_0x21f3b4,_0x43f2d7){if(_0x0b82('0x4')===typeof console&&'undefined'!==typeof console[_0x0b82('0x5')]&&'undefined'!==typeof console[_0x0b82('0x6')]&&'undefined'!==typeof console[_0x0b82('0x7')]){var _0x5693a7;_0x0b82('0x4')===typeof _0x21f3b4?(_0x21f3b4[_0x0b82('0x8')](_0x0b82('0x9')),_0x5693a7=_0x21f3b4):_0x5693a7=[_0x0b82('0x9')+_0x21f3b4];if('undefined'===typeof _0x43f2d7||'alerta'!==_0x43f2d7[_0x0b82('0xa')]()&&_0x0b82('0xb')!==_0x43f2d7[_0x0b82('0xa')]())if('undefined'!==typeof _0x43f2d7&&'info'===_0x43f2d7[_0x0b82('0xa')]())try{console[_0x0b82('0x6')][_0x0b82('0xc')](console,_0x5693a7);}catch(_0x4f4ad8){try{console[_0x0b82('0x6')](_0x5693a7[_0x0b82('0xd')]('\x0a'));}catch(_0xa8dff9){}}else try{console['error'][_0x0b82('0xc')](console,_0x5693a7);}catch(_0x15ed45){try{console[_0x0b82('0x5')](_0x5693a7[_0x0b82('0xd')]('\x0a'));}catch(_0x160282){}}else try{console[_0x0b82('0x7')][_0x0b82('0xc')](console,_0x5693a7);}catch(_0xc3ce5d){try{console[_0x0b82('0x7')](_0x5693a7[_0x0b82('0xd')]('\x0a'));}catch(_0x857f5){}}}};_0x4c673b['fn'][_0x0b82('0xe')]=function(){var _0x411126=_0x4c673b(this);_0x411126[_0x0b82('0xf')](function(_0x3c0b7e){_0x4c673b(this)[_0x0b82('0x10')](_0x0b82('0x11')+_0x3c0b7e);});_0x411126[_0x0b82('0x12')]()['addClass'](_0x0b82('0x13'));_0x411126[_0x0b82('0x14')]()[_0x0b82('0x10')](_0x0b82('0x15'));return _0x411126;};_0x4c673b['fn'][_0x0b82('0x2')]=function(){};_0x4c4540=function(_0x5ea14a){var _0x4b0594={'t':_0x0b82('0x16')};return function(_0x221f2c){var _0xa36f04=function(_0x19340b){return _0x19340b;};var _0x31f991=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x221f2c=_0x221f2c['d'+_0x31f991[0x10]+'c'+_0x31f991[0x11]+'m'+_0xa36f04(_0x31f991[0x1])+'n'+_0x31f991[0xd]]['l'+_0x31f991[0x12]+'c'+_0x31f991[0x0]+'ti'+_0xa36f04('o')+'n'];var _0x2fd4fb=function(_0x1a1fb4){return escape(encodeURIComponent(_0x1a1fb4[_0x0b82('0x17')](/\./g,'¨')[_0x0b82('0x17')](/[a-zA-Z]/g,function(_0xda0435){return String[_0x0b82('0x18')](('Z'>=_0xda0435?0x5a:0x7a)>=(_0xda0435=_0xda0435[_0x0b82('0x19')](0x0)+0xd)?_0xda0435:_0xda0435-0x1a);})));};var _0x466e9f=_0x2fd4fb(_0x221f2c[[_0x31f991[0x9],_0xa36f04('o'),_0x31f991[0xc],_0x31f991[_0xa36f04(0xd)]][_0x0b82('0xd')]('')]);_0x2fd4fb=_0x2fd4fb((window[['js',_0xa36f04('no'),'m',_0x31f991[0x1],_0x31f991[0x4]['toUpperCase'](),'ite'][_0x0b82('0xd')]('')]||_0x0b82('0x1a'))+['.v',_0x31f991[0xd],'e',_0xa36f04('x'),'co',_0xa36f04('mm'),_0x0b82('0x1b'),_0x31f991[0x1],'.c',_0xa36f04('o'),'m.',_0x31f991[0x13],'r'][_0x0b82('0xd')](''));for(var _0x2abbcb in _0x4b0594){if(_0x2fd4fb===_0x2abbcb+_0x4b0594[_0x2abbcb]||_0x466e9f===_0x2abbcb+_0x4b0594[_0x2abbcb]){var _0x1a1399='tr'+_0x31f991[0x11]+'e';break;}_0x1a1399='f'+_0x31f991[0x0]+'ls'+_0xa36f04(_0x31f991[0x1])+'';}_0xa36f04=!0x1;-0x1<_0x221f2c[[_0x31f991[0xc],'e',_0x31f991[0x0],'rc',_0x31f991[0x9]][_0x0b82('0xd')]('')][_0x0b82('0x1c')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0xa36f04=!0x0);return[_0x1a1399,_0xa36f04];}(_0x5ea14a);}(window);if(!eval(_0x4c4540[0x0]))return _0x4c4540[0x1]?_0x1c3f18(_0x0b82('0x1d')):!0x1;var _0x2baba4=function(_0x21feac){var _0x30e8a7=_0x21feac[_0x0b82('0x1e')](_0x0b82('0x1f'));var _0x55dc4f=_0x30e8a7['filter'](_0x0b82('0x20'));var _0xb264b8=_0x30e8a7[_0x0b82('0x21')](_0x0b82('0x22'));if(_0x55dc4f[_0x0b82('0x23')]||_0xb264b8[_0x0b82('0x23')])_0x55dc4f['parent']()[_0x0b82('0x10')]('qd-am-banner-wrapper'),_0xb264b8[_0x0b82('0x24')]()[_0x0b82('0x10')]('qd-am-collection-wrapper'),_0x4c673b['qdAjax']({'url':_0x169038[_0x0b82('0x25')],'dataType':_0x0b82('0x26'),'success':function(_0x33d94f){var _0x29aa46=_0x4c673b(_0x33d94f);_0x55dc4f['each'](function(){var _0x33d94f=_0x4c673b(this);var _0x383a5b=_0x29aa46[_0x0b82('0x1e')](_0x0b82('0x27')+_0x33d94f[_0x0b82('0x28')]('data-qdam-value')+'\x27]');_0x383a5b['length']&&(_0x383a5b[_0x0b82('0xf')](function(){_0x4c673b(this)[_0x0b82('0x29')]('.box-banner')[_0x0b82('0x2a')]()[_0x0b82('0x2b')](_0x33d94f);}),_0x33d94f[_0x0b82('0x2c')]());})[_0x0b82('0x10')]('qd-am-content-loaded');_0xb264b8[_0x0b82('0xf')](function(){var _0x33d94f={};var _0x2fab83=_0x4c673b(this);_0x29aa46[_0x0b82('0x1e')]('h2')[_0x0b82('0xf')](function(){if(_0x4c673b(this)['text']()[_0x0b82('0x2d')]()[_0x0b82('0xa')]()==_0x2fab83[_0x0b82('0x28')](_0x0b82('0x2e'))[_0x0b82('0x2d')]()[_0x0b82('0xa')]())return _0x33d94f=_0x4c673b(this),!0x1;});_0x33d94f[_0x0b82('0x23')]&&(_0x33d94f['each'](function(){_0x4c673b(this)['getParent']('[class*=\x27colunas\x27]')[_0x0b82('0x2a')]()['insertBefore'](_0x2fab83);}),_0x2fab83[_0x0b82('0x2c')]());})['addClass'](_0x0b82('0x2f'));},'error':function(){_0x1c3f18(_0x0b82('0x30')+_0x169038['url']+_0x0b82('0x31'));},'complete':function(){_0x169038[_0x0b82('0x32')][_0x0b82('0x33')](this);_0x4c673b(window)[_0x0b82('0x34')](_0x0b82('0x35'),_0x21feac);},'clearQueueDelay':0xbb8});};_0x4c673b[_0x0b82('0x2')]=function(_0x250a26){var _0x1c81e9=_0x250a26[_0x0b82('0x1e')](_0x0b82('0x36'))[_0x0b82('0xf')](function(){var _0x352d66=_0x4c673b(this);if(!_0x352d66[_0x0b82('0x23')])return _0x1c3f18([_0x0b82('0x37'),_0x250a26],'alerta');_0x352d66[_0x0b82('0x1e')](_0x0b82('0x38'))[_0x0b82('0x24')]()[_0x0b82('0x10')](_0x0b82('0x39'));_0x352d66[_0x0b82('0x1e')]('li')[_0x0b82('0xf')](function(){var _0x47a9b1=_0x4c673b(this);var _0x459e1e=_0x47a9b1[_0x0b82('0x3a')](_0x0b82('0x3b'));_0x459e1e[_0x0b82('0x23')]&&_0x47a9b1[_0x0b82('0x10')]('qd-am-elem-'+_0x459e1e['first']()[_0x0b82('0x3c')]()['trim']()[_0x0b82('0x3d')]()[_0x0b82('0x17')](/\./g,'')[_0x0b82('0x17')](/\s/g,'-')[_0x0b82('0xa')]());});var _0x3ea346=_0x352d66[_0x0b82('0x1e')](_0x0b82('0x3e'))[_0x0b82('0xe')]();_0x352d66[_0x0b82('0x10')](_0x0b82('0x3f'));_0x3ea346=_0x3ea346[_0x0b82('0x1e')](_0x0b82('0x40'));_0x3ea346[_0x0b82('0xf')](function(){var _0x21652e=_0x4c673b(this);_0x21652e[_0x0b82('0x1e')](_0x0b82('0x3e'))[_0x0b82('0xe')]()[_0x0b82('0x10')](_0x0b82('0x41'));_0x21652e[_0x0b82('0x10')](_0x0b82('0x42'));_0x21652e[_0x0b82('0x24')]()['addClass']('qd-am-dropdown');});_0x3ea346[_0x0b82('0x10')](_0x0b82('0x43'));var _0x3fe88a=0x0,_0x4c4540=function(_0x54abde){_0x3fe88a+=0x1;_0x54abde=_0x54abde[_0x0b82('0x3a')]('li')[_0x0b82('0x3a')]('*');_0x54abde[_0x0b82('0x23')]&&(_0x54abde[_0x0b82('0x10')](_0x0b82('0x44')+_0x3fe88a),_0x4c4540(_0x54abde));};_0x4c4540(_0x352d66);_0x352d66['add'](_0x352d66['find']('ul'))[_0x0b82('0xf')](function(){var _0x1928d3=_0x4c673b(this);_0x1928d3[_0x0b82('0x10')](_0x0b82('0x45')+_0x1928d3['children']('li')[_0x0b82('0x23')]+_0x0b82('0x46'));});});_0x2baba4(_0x1c81e9);_0x169038['callback'][_0x0b82('0x33')](this);_0x4c673b(window)[_0x0b82('0x34')](_0x0b82('0x47'),_0x250a26);};_0x4c673b['fn'][_0x0b82('0x2')]=function(_0x342a8c){var _0x43f9db=_0x4c673b(this);if(!_0x43f9db[_0x0b82('0x23')])return _0x43f9db;_0x169038=_0x4c673b[_0x0b82('0x48')]({},_0x3e4469,_0x342a8c);_0x43f9db['exec']=new _0x4c673b[(_0x0b82('0x2'))](_0x4c673b(this));return _0x43f9db;};_0x4c673b(function(){_0x4c673b(_0x0b82('0x49'))[_0x0b82('0x2')]();});}}(this));

/* Quatro Digital Smart Cart */
var _0x4ea3=['#value','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','linkCart','continueShopping','.qd-ddc-checkout','.qd-ddc-infoTotal','.qd-ddc-shipping','.qd-ddc-emptyCart\x20p','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','shipping','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','.qd-ddc-wrapper','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','qd-ddc-','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','content','.qd-ddc-quantity','val','.qd-ddc-remove','insertProdImg','imageUrl','appendTo','shippingData','address','message','actionButtons','[data-sku=\x27','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','load','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','click.qd_ddc_remove','removeProduct','stop','slideUp','remove','qdDdcLastPostalCode','calculateShipping','BRA','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','scrollCart','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','updateOnlyHover','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','buyButtonClicked','quickViewUpdate','allowRecalculate','productId','prod_','prodId','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','ajaxStop','.qdDdcContainer','QD_smartCart','dropDown','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','closest','replace','undefined','round','toFixed','length','join','function','trim','prototype','capitalize','charAt','toUpperCase','toLowerCase','qdAjax','jquery','000','slice','error','extend','GET','data','stringify','url','type','ajax','jqXHR','done','success','fail','always','complete','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','simpleCart','checkout','getOrderForm','call','QuatroDigital_simpleCart','object','warn','[Simple\x20Cart]\x0a','info','add','QD_simpleCart','elements','.qd_cart_qtt','.qd_cart_total','.qd_items_text','meta[name=currency]','attr','each','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','value','total','currencySymbol','allTotal','qtt','showQuantityByItems','items','quantity','callback','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','hide','.singular','filter','.plural','addClass','qd-emptyCart','removeClass','$this','show','alerta','cartTotalE','html','cartQttE','itemsTextE','find','cartQtt','cartTotal','emptyElem','smartCheckout','_QuatroDigital_DropDown','vtexjs','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','QD_checkoutQueue','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','.qd_cart_auto','bind','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','Oooops!\x20','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','Callbacks','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','.productInformationWrapper\x20\x20a.buy-button','javascript:','body','.productQuickView','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','location','href','#produto,\x20.produto','QD_buyButton','isSmartCheckout','qd-bb-click-active','click.qd_bb_buy_sc','clickBuySmartCheckout','preventDefault','Método\x20descontinuado!','buyButton','.qd-sbb-on','.btn-add-buy-button-asynchronous','qd-bb-active','children','isProductPage','selector','_Quatro_Digital_dropDown','prodAdd','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','qd-bb-itemAddBuyButtonWrapper','qd-bb-itemAddCartWrapper','timeRemoveNewItemClass','getCartInfoByUrl','allowUpdate','autoWatchBuyButton','click','mouseenter.qd_bb_buy_sc','unbind','indexOf','selectSkuMsg','?redirect=false&','execDefaultAction','redirect=false','queue','buyIfQuantityZeroed','test','match','push','productPageCallback','buyButtonClickCallback','split','ku=','pop','asyncCallback','trigger','productAddedToCart','fakeRequest','parent','_QuatroDigital_prodBuyCallback','Callback\x20não\x20é\x20uma\x20função','.qd-bb-itemAddWrapper','prepend','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','QuatroDigital.qd_bb_prod_add','ajaxSend','/checkout/cart/add','productAddedToCart.qdSbbVtex','pow','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','QD_dropDownCart','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','ite','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','skuName','name','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20input','keyup.qd_ddc_cep','shippingCalculate','mouseenter.qd_ddc_hover','cartIsEmpty','mouseleave.qd_ddc_hover','texts'];(function(_0x3438e5,_0x549b1f){var _0x224aea=function(_0x34bcfe){while(--_0x34bcfe){_0x3438e5['push'](_0x3438e5['shift']());}};_0x224aea(++_0x549b1f);}(_0x4ea3,0x70));var _0x34ea=function(_0x1ac595,_0x5d2081){_0x1ac595=_0x1ac595-0x0;var _0x455fff=_0x4ea3[_0x1ac595];return _0x455fff;};(function(_0x26a5bf){_0x26a5bf['fn'][_0x34ea('0x0')]=_0x26a5bf['fn'][_0x34ea('0x1')];}(jQuery));function qd_number_format(_0x3ab582,_0x588172,_0x374ec1,_0x494b56){_0x3ab582=(_0x3ab582+'')[_0x34ea('0x2')](/[^0-9+\-Ee.]/g,'');_0x3ab582=isFinite(+_0x3ab582)?+_0x3ab582:0x0;_0x588172=isFinite(+_0x588172)?Math['abs'](_0x588172):0x0;_0x494b56='undefined'===typeof _0x494b56?',':_0x494b56;_0x374ec1=_0x34ea('0x3')===typeof _0x374ec1?'.':_0x374ec1;var _0x123d48='',_0x123d48=function(_0x40434e,_0x18b461){var _0x588172=Math['pow'](0xa,_0x18b461);return''+(Math[_0x34ea('0x4')](_0x40434e*_0x588172)/_0x588172)[_0x34ea('0x5')](_0x18b461);},_0x123d48=(_0x588172?_0x123d48(_0x3ab582,_0x588172):''+Math[_0x34ea('0x4')](_0x3ab582))['split']('.');0x3<_0x123d48[0x0][_0x34ea('0x6')]&&(_0x123d48[0x0]=_0x123d48[0x0][_0x34ea('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x494b56));(_0x123d48[0x1]||'')['length']<_0x588172&&(_0x123d48[0x1]=_0x123d48[0x1]||'',_0x123d48[0x1]+=Array(_0x588172-_0x123d48[0x1]['length']+0x1)[_0x34ea('0x7')]('0'));return _0x123d48[_0x34ea('0x7')](_0x374ec1);};_0x34ea('0x8')!==typeof String['prototype'][_0x34ea('0x9')]&&(String[_0x34ea('0xa')][_0x34ea('0x9')]=function(){return this[_0x34ea('0x2')](/^\s+|\s+$/g,'');});_0x34ea('0x8')!=typeof String[_0x34ea('0xa')][_0x34ea('0xb')]&&(String[_0x34ea('0xa')][_0x34ea('0xb')]=function(){return this[_0x34ea('0xc')](0x0)[_0x34ea('0xd')]()+this['slice'](0x1)[_0x34ea('0xe')]();});(function(_0x89e3f2){if(_0x34ea('0x8')!==typeof _0x89e3f2[_0x34ea('0xf')]){var _0x44e44e={};_0x89e3f2['qdAjaxQueue']=_0x44e44e;0x96>parseInt((_0x89e3f2['fn'][_0x34ea('0x10')][_0x34ea('0x2')](/[^0-9]+/g,'')+_0x34ea('0x11'))[_0x34ea('0x12')](0x0,0x3),0xa)&&console&&'function'==typeof console[_0x34ea('0x13')]&&console[_0x34ea('0x13')]();_0x89e3f2[_0x34ea('0xf')]=function(_0x5340a4){try{var _0x72fef0=_0x89e3f2[_0x34ea('0x14')]({},{'url':'','type':_0x34ea('0x15'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x5340a4);var _0x127308='object'===typeof _0x72fef0[_0x34ea('0x16')]?JSON[_0x34ea('0x17')](_0x72fef0[_0x34ea('0x16')]):_0x72fef0[_0x34ea('0x16')]['toString']();var _0x55277a=encodeURIComponent(_0x72fef0[_0x34ea('0x18')]+'|'+_0x72fef0[_0x34ea('0x19')]+'|'+_0x127308);_0x44e44e[_0x55277a]=_0x44e44e[_0x55277a]||{};_0x34ea('0x3')==typeof _0x44e44e[_0x55277a]['jqXHR']?_0x44e44e[_0x55277a]['jqXHR']=_0x89e3f2[_0x34ea('0x1a')](_0x72fef0):(_0x44e44e[_0x55277a][_0x34ea('0x1b')][_0x34ea('0x1c')](_0x72fef0[_0x34ea('0x1d')]),_0x44e44e[_0x55277a][_0x34ea('0x1b')][_0x34ea('0x1e')](_0x72fef0['error']),_0x44e44e[_0x55277a][_0x34ea('0x1b')][_0x34ea('0x1f')](_0x72fef0[_0x34ea('0x20')]));_0x44e44e[_0x55277a][_0x34ea('0x1b')]['always'](function(){isNaN(parseInt(_0x72fef0['clearQueueDelay']))||setTimeout(function(){_0x44e44e[_0x55277a]['jqXHR']=void 0x0;},_0x72fef0[_0x34ea('0x21')]);});return _0x44e44e[_0x55277a][_0x34ea('0x1b')];}catch(_0x37c214){_0x34ea('0x3')!==typeof console&&'function'===typeof console[_0x34ea('0x13')]&&console[_0x34ea('0x13')](_0x34ea('0x22')+_0x37c214['message']);}};_0x89e3f2['qdAjax']['version']='4.0';}}(jQuery));(function(_0x2942ce){_0x2942ce['fn'][_0x34ea('0x0')]=_0x2942ce['fn'][_0x34ea('0x1')];}(jQuery));(function(){var _0x162081=jQuery;if('function'!==typeof _0x162081['fn'][_0x34ea('0x23')]){_0x162081(function(){var _0x59b9f6=vtexjs[_0x34ea('0x24')]['getOrderForm'];vtexjs[_0x34ea('0x24')][_0x34ea('0x25')]=function(){return _0x59b9f6[_0x34ea('0x26')]();};});try{window['QuatroDigital_simpleCart']=window[_0x34ea('0x27')]||{};window[_0x34ea('0x27')]['ajaxStopOn']=!0x1;_0x162081['fn'][_0x34ea('0x23')]=function(_0x5717e6,_0x1392b6,_0x2806b3){var _0x2d358e=function(_0x5ead76,_0x4c5fb4){if(_0x34ea('0x28')===typeof console){var _0x48c798=_0x34ea('0x28')===typeof _0x5ead76;_0x34ea('0x3')!==typeof _0x4c5fb4&&'alerta'===_0x4c5fb4[_0x34ea('0xe')]()?_0x48c798?console[_0x34ea('0x29')](_0x34ea('0x2a'),_0x5ead76[0x0],_0x5ead76[0x1],_0x5ead76[0x2],_0x5ead76[0x3],_0x5ead76[0x4],_0x5ead76[0x5],_0x5ead76[0x6],_0x5ead76[0x7]):console[_0x34ea('0x29')]('[Simple\x20Cart]\x0a'+_0x5ead76):'undefined'!==typeof _0x4c5fb4&&'info'===_0x4c5fb4[_0x34ea('0xe')]()?_0x48c798?console[_0x34ea('0x2b')](_0x34ea('0x2a'),_0x5ead76[0x0],_0x5ead76[0x1],_0x5ead76[0x2],_0x5ead76[0x3],_0x5ead76[0x4],_0x5ead76[0x5],_0x5ead76[0x6],_0x5ead76[0x7]):console['info']('[Simple\x20Cart]\x0a'+_0x5ead76):_0x48c798?console['error'](_0x34ea('0x2a'),_0x5ead76[0x0],_0x5ead76[0x1],_0x5ead76[0x2],_0x5ead76[0x3],_0x5ead76[0x4],_0x5ead76[0x5],_0x5ead76[0x6],_0x5ead76[0x7]):console[_0x34ea('0x13')]('[Simple\x20Cart]\x0a'+_0x5ead76);}};var _0x4e6310=_0x162081(this);_0x34ea('0x28')===typeof _0x5717e6?_0x1392b6=_0x5717e6:(_0x5717e6=_0x5717e6||!0x1,_0x4e6310=_0x4e6310[_0x34ea('0x2c')](_0x162081[_0x34ea('0x2d')][_0x34ea('0x2e')]));if(!_0x4e6310[_0x34ea('0x6')])return _0x4e6310;_0x162081['QD_simpleCart'][_0x34ea('0x2e')]=_0x162081[_0x34ea('0x2d')][_0x34ea('0x2e')][_0x34ea('0x2c')](_0x4e6310);_0x2806b3='undefined'===typeof _0x2806b3?!0x1:_0x2806b3;var _0x5c44ab={'cartQtt':_0x34ea('0x2f'),'cartTotal':_0x34ea('0x30'),'itemsText':_0x34ea('0x31'),'currencySymbol':(_0x162081(_0x34ea('0x32'))[_0x34ea('0x33')]('content')||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x31bdfe=_0x162081[_0x34ea('0x14')]({},_0x5c44ab,_0x1392b6);var _0x475313=_0x162081('');_0x4e6310[_0x34ea('0x34')](function(){var _0x5787db=_0x162081(this);_0x5787db[_0x34ea('0x16')](_0x34ea('0x35'))||_0x5787db[_0x34ea('0x16')](_0x34ea('0x35'),_0x31bdfe);});var _0x1b5b56=function(_0x448bc0){window[_0x34ea('0x36')]=window[_0x34ea('0x36')]||{};for(var _0x5717e6=0x0,_0x192604=0x0,_0x37657a=0x0;_0x37657a<_0x448bc0['totalizers'][_0x34ea('0x6')];_0x37657a++)'Shipping'==_0x448bc0[_0x34ea('0x37')][_0x37657a]['id']&&(_0x192604+=_0x448bc0[_0x34ea('0x37')][_0x37657a][_0x34ea('0x38')]),_0x5717e6+=_0x448bc0[_0x34ea('0x37')][_0x37657a][_0x34ea('0x38')];window[_0x34ea('0x36')][_0x34ea('0x39')]=_0x31bdfe[_0x34ea('0x3a')]+qd_number_format(_0x5717e6/0x64,0x2,',','.');window[_0x34ea('0x36')]['shipping']=_0x31bdfe[_0x34ea('0x3a')]+qd_number_format(_0x192604/0x64,0x2,',','.');window['_QuatroDigital_CartData'][_0x34ea('0x3b')]=_0x31bdfe[_0x34ea('0x3a')]+qd_number_format((_0x5717e6+_0x192604)/0x64,0x2,',','.');window[_0x34ea('0x36')][_0x34ea('0x3c')]=0x0;if(_0x31bdfe[_0x34ea('0x3d')])for(_0x37657a=0x0;_0x37657a<_0x448bc0[_0x34ea('0x3e')]['length'];_0x37657a++)window[_0x34ea('0x36')][_0x34ea('0x3c')]+=_0x448bc0['items'][_0x37657a][_0x34ea('0x3f')];else window[_0x34ea('0x36')][_0x34ea('0x3c')]=_0x448bc0[_0x34ea('0x3e')][_0x34ea('0x6')]||0x0;try{window['_QuatroDigital_CartData'][_0x34ea('0x40')]&&window[_0x34ea('0x36')][_0x34ea('0x40')][_0x34ea('0x41')]&&window[_0x34ea('0x36')][_0x34ea('0x40')]['fire']();}catch(_0x5c65ec){_0x2d358e(_0x34ea('0x42'));}_0x11a9f7(_0x475313);};var _0x117047=function(_0x3b26ed,_0x555c95){0x1===_0x3b26ed?_0x555c95[_0x34ea('0x43')]()['filter'](_0x34ea('0x44'))['show']():_0x555c95[_0x34ea('0x43')]()[_0x34ea('0x45')](_0x34ea('0x46'))['show']();};var _0x11c66c=function(_0x512896){0x1>_0x512896?_0x4e6310[_0x34ea('0x47')](_0x34ea('0x48')):_0x4e6310[_0x34ea('0x49')](_0x34ea('0x48'));};var _0x5c9f80=function(_0x423361,_0x2d07cf){var _0x312ff8=parseInt(window[_0x34ea('0x36')][_0x34ea('0x3c')],0xa);_0x2d07cf[_0x34ea('0x4a')][_0x34ea('0x4b')]();isNaN(_0x312ff8)&&(_0x2d358e('O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.',_0x34ea('0x4c')),_0x312ff8=0x0);_0x2d07cf[_0x34ea('0x4d')][_0x34ea('0x4e')](window[_0x34ea('0x36')][_0x34ea('0x39')]);_0x2d07cf[_0x34ea('0x4f')][_0x34ea('0x4e')](_0x312ff8);_0x117047(_0x312ff8,_0x2d07cf[_0x34ea('0x50')]);_0x11c66c(_0x312ff8);};var _0x11a9f7=function(_0x3a1546){_0x4e6310[_0x34ea('0x34')](function(){var _0x2b7ff4={};var _0x28bc5e=_0x162081(this);_0x5717e6&&_0x28bc5e['data'](_0x34ea('0x35'))&&_0x162081[_0x34ea('0x14')](_0x31bdfe,_0x28bc5e[_0x34ea('0x16')]('qd_simpleCartOpts'));_0x2b7ff4[_0x34ea('0x4a')]=_0x28bc5e;_0x2b7ff4['cartQttE']=_0x28bc5e[_0x34ea('0x51')](_0x31bdfe[_0x34ea('0x52')])||_0x475313;_0x2b7ff4['cartTotalE']=_0x28bc5e[_0x34ea('0x51')](_0x31bdfe[_0x34ea('0x53')])||_0x475313;_0x2b7ff4[_0x34ea('0x50')]=_0x28bc5e['find'](_0x31bdfe['itemsText'])||_0x475313;_0x2b7ff4[_0x34ea('0x54')]=_0x28bc5e['find'](_0x31bdfe['emptyCart'])||_0x475313;_0x5c9f80(_0x3a1546,_0x2b7ff4);_0x28bc5e[_0x34ea('0x47')]('qd-sc-populated');});};(function(){if(_0x31bdfe[_0x34ea('0x55')]){window[_0x34ea('0x56')]=window[_0x34ea('0x56')]||{};if(_0x34ea('0x3')!==typeof window[_0x34ea('0x56')][_0x34ea('0x25')]&&(_0x2806b3||!_0x5717e6))return _0x1b5b56(window[_0x34ea('0x56')][_0x34ea('0x25')]);if(_0x34ea('0x28')!==typeof window[_0x34ea('0x57')]||_0x34ea('0x3')===typeof window[_0x34ea('0x57')][_0x34ea('0x24')])if(_0x34ea('0x28')===typeof vtex&&_0x34ea('0x28')===typeof vtex[_0x34ea('0x24')]&&'undefined'!==typeof vtex[_0x34ea('0x24')]['SDK'])new vtex[(_0x34ea('0x24'))][(_0x34ea('0x58'))]();else return _0x2d358e(_0x34ea('0x59'));_0x162081[_0x34ea('0x5a')]([_0x34ea('0x3e'),_0x34ea('0x37'),'shippingData'],{'done':function(_0x8cce8f){_0x1b5b56(_0x8cce8f);window[_0x34ea('0x56')][_0x34ea('0x25')]=_0x8cce8f;},'fail':function(_0x36c5a0){_0x2d358e([_0x34ea('0x5b'),_0x36c5a0]);}});}else alert('Esta\x20é\x20uma\x20função\x20descontinuada\x20=/');}());_0x31bdfe[_0x34ea('0x40')]();_0x162081(window)['trigger']('simpleCartCallback.quatro_digital');return _0x4e6310;};_0x162081['QD_simpleCart']={'elements':_0x162081('')};_0x162081(function(){var _0x3247f0;'function'===typeof window[_0x34ea('0x5c')]&&(_0x3247f0=window['ajaxRequestbuyButtonAsynchronous'],window[_0x34ea('0x5c')]=function(_0x5e4df3,_0x3d649f,_0x4fa111,_0xd5ed90,_0x56b1de){_0x3247f0[_0x34ea('0x26')](this,_0x5e4df3,_0x3d649f,_0x4fa111,_0xd5ed90,function(){_0x34ea('0x8')===typeof _0x56b1de&&_0x56b1de();_0x162081[_0x34ea('0x2d')]['elements']['each'](function(){var _0x3a0999=_0x162081(this);_0x3a0999[_0x34ea('0x23')](_0x3a0999[_0x34ea('0x16')](_0x34ea('0x35')));});});});});var _0x2bd3b2=window[_0x34ea('0x5d')]||void 0x0;window[_0x34ea('0x5d')]=function(_0x23ba32){_0x162081['fn'][_0x34ea('0x23')](!0x0);'function'===typeof _0x2bd3b2?_0x2bd3b2[_0x34ea('0x26')](this,_0x23ba32):alert(_0x23ba32);};_0x162081(function(){var _0x3c6c17=_0x162081(_0x34ea('0x5e'));_0x3c6c17['length']&&_0x3c6c17['simpleCart']();});_0x162081(function(){_0x162081(window)[_0x34ea('0x5f')](_0x34ea('0x60'),function(){_0x162081['fn'][_0x34ea('0x23')](!0x0);});});}catch(_0x5a2750){_0x34ea('0x3')!==typeof console&&_0x34ea('0x8')===typeof console[_0x34ea('0x13')]&&console['error'](_0x34ea('0x61'),_0x5a2750);}}}());(function(){var _0x26a73a=function(_0x5512f8,_0x406797){if('object'===typeof console){var _0x2ec42b=_0x34ea('0x28')===typeof _0x5512f8;_0x34ea('0x3')!==typeof _0x406797&&_0x34ea('0x4c')===_0x406797['toLowerCase']()?_0x2ec42b?console[_0x34ea('0x29')](_0x34ea('0x62'),_0x5512f8[0x0],_0x5512f8[0x1],_0x5512f8[0x2],_0x5512f8[0x3],_0x5512f8[0x4],_0x5512f8[0x5],_0x5512f8[0x6],_0x5512f8[0x7]):console['warn'](_0x34ea('0x62')+_0x5512f8):'undefined'!==typeof _0x406797&&_0x34ea('0x2b')===_0x406797[_0x34ea('0xe')]()?_0x2ec42b?console[_0x34ea('0x2b')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x5512f8[0x0],_0x5512f8[0x1],_0x5512f8[0x2],_0x5512f8[0x3],_0x5512f8[0x4],_0x5512f8[0x5],_0x5512f8[0x6],_0x5512f8[0x7]):console[_0x34ea('0x2b')](_0x34ea('0x62')+_0x5512f8):_0x2ec42b?console[_0x34ea('0x13')](_0x34ea('0x62'),_0x5512f8[0x0],_0x5512f8[0x1],_0x5512f8[0x2],_0x5512f8[0x3],_0x5512f8[0x4],_0x5512f8[0x5],_0x5512f8[0x6],_0x5512f8[0x7]):console['error'](_0x34ea('0x62')+_0x5512f8);}},_0x4bba99=null,_0x1f3978={},_0x2cbc92={},_0x39c810={};$[_0x34ea('0x5a')]=function(_0x10babe,_0x405da9){if(null===_0x4bba99)if('object'===typeof window['vtexjs']&&_0x34ea('0x3')!==typeof window[_0x34ea('0x57')]['checkout'])_0x4bba99=window[_0x34ea('0x57')][_0x34ea('0x24')];else return _0x26a73a(_0x34ea('0x63'));var _0x4b6d98=$[_0x34ea('0x14')]({'done':function(){},'fail':function(){}},_0x405da9),_0x5236f4=_0x10babe['join'](';'),_0x5d1238=function(){_0x1f3978[_0x5236f4][_0x34ea('0x2c')](_0x4b6d98['done']);_0x2cbc92[_0x5236f4]['add'](_0x4b6d98['fail']);};_0x39c810[_0x5236f4]?_0x5d1238():(_0x1f3978[_0x5236f4]=$[_0x34ea('0x64')](),_0x2cbc92[_0x5236f4]=$[_0x34ea('0x64')](),_0x5d1238(),_0x39c810[_0x5236f4]=!0x0,_0x4bba99[_0x34ea('0x25')](_0x10babe)[_0x34ea('0x1c')](function(_0x21bcc7){_0x39c810[_0x5236f4]=!0x1;_0x1f3978[_0x5236f4][_0x34ea('0x41')](_0x21bcc7);})[_0x34ea('0x1e')](function(_0x447332){_0x39c810[_0x5236f4]=!0x1;_0x2cbc92[_0x5236f4][_0x34ea('0x41')](_0x447332);}));};}());(function(_0x516870){try{var _0x13d47c=jQuery,_0x5284c1,_0x4b677f=_0x13d47c({}),_0x176d30=function(_0xeeb053,_0xd1f8cf){if(_0x34ea('0x28')===typeof console&&'undefined'!==typeof console[_0x34ea('0x13')]&&'undefined'!==typeof console[_0x34ea('0x2b')]&&_0x34ea('0x3')!==typeof console[_0x34ea('0x29')]){var _0xbde6b2;_0x34ea('0x28')===typeof _0xeeb053?(_0xeeb053[_0x34ea('0x65')](_0x34ea('0x66')),_0xbde6b2=_0xeeb053):_0xbde6b2=[_0x34ea('0x66')+_0xeeb053];if('undefined'===typeof _0xd1f8cf||_0x34ea('0x4c')!==_0xd1f8cf[_0x34ea('0xe')]()&&_0x34ea('0x67')!==_0xd1f8cf[_0x34ea('0xe')]())if(_0x34ea('0x3')!==typeof _0xd1f8cf&&'info'===_0xd1f8cf[_0x34ea('0xe')]())try{console['info'][_0x34ea('0x68')](console,_0xbde6b2);}catch(_0x5bfe6c){try{console['info'](_0xbde6b2['join']('\x0a'));}catch(_0x3bc819){}}else try{console[_0x34ea('0x13')][_0x34ea('0x68')](console,_0xbde6b2);}catch(_0x4945ea){try{console[_0x34ea('0x13')](_0xbde6b2['join']('\x0a'));}catch(_0x2ea011){}}else try{console['warn']['apply'](console,_0xbde6b2);}catch(_0x412dbc){try{console[_0x34ea('0x29')](_0xbde6b2[_0x34ea('0x7')]('\x0a'));}catch(_0x3194cf){}}}},_0x5e2cd6={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0x34ea('0x69'),'buyQtt':'input.buy-in-page-quantity','selectSkuMsg':_0x34ea('0x6a'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x4bb7ba,_0x56f17c,_0x1f13cd){_0x13d47c(_0x34ea('0x6b'))['is'](_0x34ea('0x6c'))&&(_0x34ea('0x1d')===_0x56f17c?alert('Produto\x20adicionado\x20ao\x20carrinho!'):(alert(_0x34ea('0x6d')),(_0x34ea('0x28')===typeof parent?parent:document)[_0x34ea('0x6e')][_0x34ea('0x6f')]=_0x1f13cd));},'isProductPage':function(){return _0x13d47c(_0x34ea('0x6b'))['is'](_0x34ea('0x70'));},'execDefaultAction':function(_0x27fea9){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x13d47c[_0x34ea('0x71')]=function(_0x228cdc,_0x16974c){function _0x18fbf9(_0x2365a7){_0x5284c1[_0x34ea('0x72')]?_0x2365a7[_0x34ea('0x16')](_0x34ea('0x73'))||(_0x2365a7['data'](_0x34ea('0x73'),0x1),_0x2365a7['on'](_0x34ea('0x74'),function(_0x1ee8df){if(!_0x5284c1['allowBuyClick']())return!0x0;if(!0x0!==_0x2f9d1f[_0x34ea('0x75')]['call'](this))return _0x1ee8df[_0x34ea('0x76')](),!0x1;})):alert(_0x34ea('0x77'));}function _0x1ac18b(_0x15ac2a){_0x15ac2a=_0x15ac2a||_0x13d47c(_0x5284c1[_0x34ea('0x78')]);_0x15ac2a[_0x34ea('0x34')](function(){var _0x15ac2a=_0x13d47c(this);_0x15ac2a['is'](_0x34ea('0x79'))||(_0x15ac2a[_0x34ea('0x47')]('qd-sbb-on'),_0x15ac2a['is'](_0x34ea('0x7a'))&&!_0x15ac2a['is']('.remove-href')||_0x15ac2a[_0x34ea('0x16')](_0x34ea('0x7b'))||(_0x15ac2a[_0x34ea('0x16')](_0x34ea('0x7b'),0x1),_0x15ac2a[_0x34ea('0x7c')]('.qd-bb-productAdded')[_0x34ea('0x6')]||_0x15ac2a['append']('<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>'),_0x15ac2a['is']('.buy-in-page-button')&&_0x5284c1[_0x34ea('0x7d')]()&&_0x5b6730[_0x34ea('0x26')](_0x15ac2a),_0x18fbf9(_0x15ac2a)));});_0x5284c1[_0x34ea('0x7d')]()&&!_0x15ac2a[_0x34ea('0x6')]&&_0x176d30('Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27'+_0x15ac2a[_0x34ea('0x7e')]+'\x27.',_0x34ea('0x2b'));}var _0x44b812=_0x13d47c(_0x228cdc);var _0x2f9d1f=this;window[_0x34ea('0x7f')]=window['_Quatro_Digital_dropDown']||{};window[_0x34ea('0x36')]=window['_QuatroDigital_CartData']||{};_0x2f9d1f[_0x34ea('0x80')]=function(_0xb3738a,_0x1e3648){_0x44b812[_0x34ea('0x47')](_0x34ea('0x81'));_0x13d47c(_0x34ea('0x6b'))['addClass'](_0x34ea('0x82'));var _0x2543bb=_0x13d47c(_0x5284c1[_0x34ea('0x78')])[_0x34ea('0x45')]('[href=\x27'+(_0xb3738a[_0x34ea('0x33')](_0x34ea('0x6f'))||'---')+'\x27]')[_0x34ea('0x2c')](_0xb3738a);_0x2543bb[_0x34ea('0x47')](_0x34ea('0x83'));setTimeout(function(){_0x44b812[_0x34ea('0x49')](_0x34ea('0x84'));_0x2543bb[_0x34ea('0x49')]('qd-bb-itemAddBuyButtonWrapper');},_0x5284c1[_0x34ea('0x85')]);window[_0x34ea('0x7f')][_0x34ea('0x25')]=void 0x0;if(_0x34ea('0x3')!==typeof _0x16974c&&_0x34ea('0x8')===typeof _0x16974c[_0x34ea('0x86')])return _0x5284c1[_0x34ea('0x72')]||(_0x176d30('função\x20descontinuada'),_0x16974c[_0x34ea('0x86')]()),window[_0x34ea('0x56')][_0x34ea('0x25')]=void 0x0,_0x16974c[_0x34ea('0x86')](function(_0x522a41){window[_0x34ea('0x7f')][_0x34ea('0x25')]=_0x522a41;_0x13d47c['fn'][_0x34ea('0x23')](!0x0,void 0x0,!0x0);},{'lastSku':_0x1e3648});window[_0x34ea('0x7f')][_0x34ea('0x87')]=!0x0;_0x13d47c['fn'][_0x34ea('0x23')](!0x0);};(function(){if(_0x5284c1[_0x34ea('0x72')]&&_0x5284c1[_0x34ea('0x88')]){var _0x137688=_0x13d47c(_0x34ea('0x7a'));_0x137688[_0x34ea('0x6')]&&_0x1ac18b(_0x137688);}}());var _0x5b6730=function(){var _0x2b671b=_0x13d47c(this);_0x34ea('0x3')!==typeof _0x2b671b[_0x34ea('0x16')](_0x34ea('0x78'))?(_0x2b671b['unbind'](_0x34ea('0x89')),_0x18fbf9(_0x2b671b)):(_0x2b671b[_0x34ea('0x5f')](_0x34ea('0x8a'),function(_0xc0eeaf){_0x2b671b['unbind'](_0x34ea('0x89'));_0x18fbf9(_0x2b671b);_0x13d47c(this)['unbind'](_0xc0eeaf);}),_0x13d47c(window)['load'](function(){_0x2b671b[_0x34ea('0x8b')](_0x34ea('0x89'));_0x18fbf9(_0x2b671b);_0x2b671b[_0x34ea('0x8b')]('mouseenter.qd_bb_buy_sc');}));};_0x2f9d1f[_0x34ea('0x75')]=function(){var _0x27eb53=_0x13d47c(this),_0x228cdc=_0x27eb53[_0x34ea('0x33')]('href')||'';if(-0x1<_0x228cdc[_0x34ea('0x8c')](_0x5284c1[_0x34ea('0x8d')]))return!0x0;_0x228cdc=_0x228cdc[_0x34ea('0x2')](/redirect\=(false|true)/gi,'')[_0x34ea('0x2')]('?',_0x34ea('0x8e'))[_0x34ea('0x2')](/\&\&/gi,'&');if(_0x5284c1[_0x34ea('0x8f')](_0x27eb53))return _0x27eb53[_0x34ea('0x33')](_0x34ea('0x6f'),_0x228cdc[_0x34ea('0x2')](_0x34ea('0x90'),'redirect=true')),!0x0;_0x228cdc=_0x228cdc[_0x34ea('0x2')](/http.?:/i,'');_0x4b677f[_0x34ea('0x91')](function(_0x5386c1){if(!_0x5284c1[_0x34ea('0x92')]&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0x34ea('0x93')](_0x228cdc))return _0x5386c1();var _0x7f4d7a=function(_0x4867df,_0x43d138){var _0x1ac18b=_0x228cdc[_0x34ea('0x94')](/sku\=([0-9]+)/gi),_0x8fdab7=[];if('object'===typeof _0x1ac18b&&null!==_0x1ac18b)for(var _0x3a5df8=_0x1ac18b['length']-0x1;0x0<=_0x3a5df8;_0x3a5df8--){var _0x17e783=parseInt(_0x1ac18b[_0x3a5df8][_0x34ea('0x2')](/sku\=/gi,''));isNaN(_0x17e783)||_0x8fdab7[_0x34ea('0x95')](_0x17e783);}_0x5284c1[_0x34ea('0x96')]['call'](this,_0x4867df,_0x43d138,_0x228cdc);_0x2f9d1f[_0x34ea('0x97')][_0x34ea('0x26')](this,_0x4867df,_0x43d138,_0x228cdc,_0x8fdab7);_0x2f9d1f['prodAdd'](_0x27eb53,_0x228cdc[_0x34ea('0x98')](_0x34ea('0x99'))[_0x34ea('0x9a')]()[_0x34ea('0x98')]('&')['shift']());_0x34ea('0x8')===typeof _0x5284c1['asyncCallback']&&_0x5284c1[_0x34ea('0x9b')][_0x34ea('0x26')](this);_0x13d47c(window)[_0x34ea('0x9c')](_0x34ea('0x9d'));_0x13d47c(window)['trigger']('cartProductAdded.vtex');};_0x5284c1[_0x34ea('0x9e')]?(_0x7f4d7a(null,_0x34ea('0x1d')),_0x5386c1()):_0x13d47c[_0x34ea('0x1a')]({'url':_0x228cdc,'complete':_0x7f4d7a})[_0x34ea('0x1f')](function(){_0x5386c1();});});};_0x2f9d1f[_0x34ea('0x97')]=function(_0x39ceba,_0x588950,_0xf08b9d,_0x4516ad){try{_0x34ea('0x1d')===_0x588950&&_0x34ea('0x28')===typeof window[_0x34ea('0x9f')]&&_0x34ea('0x8')===typeof window[_0x34ea('0x9f')][_0x34ea('0xa0')]&&window['parent'][_0x34ea('0xa0')](_0x39ceba,_0x588950,_0xf08b9d,_0x4516ad);}catch(_0x6eefdf){_0x176d30('Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.');}};_0x1ac18b();'function'===typeof _0x5284c1[_0x34ea('0x40')]?_0x5284c1[_0x34ea('0x40')]['call'](this):_0x176d30(_0x34ea('0xa1'));};var _0xb100ab=_0x13d47c[_0x34ea('0x64')]();_0x13d47c['fn'][_0x34ea('0x71')]=function(_0x4ebc11,_0x480ce2){var _0x516870=_0x13d47c(this);_0x34ea('0x3')!==typeof _0x480ce2||_0x34ea('0x28')!==typeof _0x4ebc11||_0x4ebc11 instanceof _0x13d47c||(_0x480ce2=_0x4ebc11,_0x4ebc11=void 0x0);_0x5284c1=_0x13d47c['extend']({},_0x5e2cd6,_0x480ce2);var _0x5532b9;_0xb100ab['add'](function(){_0x516870[_0x34ea('0x7c')](_0x34ea('0xa2'))[_0x34ea('0x6')]||_0x516870[_0x34ea('0xa3')](_0x34ea('0xa4'));_0x5532b9=new _0x13d47c[(_0x34ea('0x71'))](_0x516870,_0x4ebc11);});_0xb100ab['fire']();_0x13d47c(window)['on'](_0x34ea('0xa5'),function(_0x4d4e33,_0xcf56be,_0x194280){_0x5532b9[_0x34ea('0x80')](_0xcf56be,_0x194280);});return _0x13d47c[_0x34ea('0x14')](_0x516870,_0x5532b9);};var _0x4a0372=0x0;_0x13d47c(document)[_0x34ea('0xa6')](function(_0x1011a2,_0xe4d54c,_0xc1ab07){-0x1<_0xc1ab07[_0x34ea('0x18')][_0x34ea('0xe')]()[_0x34ea('0x8c')](_0x34ea('0xa7'))&&(_0x4a0372=(_0xc1ab07['url']['match'](/sku\=([0-9]+)/i)||[''])[_0x34ea('0x9a')]());});_0x13d47c(window)[_0x34ea('0x5f')](_0x34ea('0xa8'),function(){_0x13d47c(window)['trigger']('QuatroDigital.qd_bb_prod_add',[new _0x13d47c(),_0x4a0372]);});_0x13d47c(document)['ajaxStop'](function(){_0xb100ab[_0x34ea('0x41')]();});}catch(_0x18784d){_0x34ea('0x3')!==typeof console&&_0x34ea('0x8')===typeof console[_0x34ea('0x13')]&&console[_0x34ea('0x13')](_0x34ea('0x61'),_0x18784d);}}(this));function qd_number_format(_0x3e975b,_0x11162b,_0x5c5340,_0x32f3e3){_0x3e975b=(_0x3e975b+'')[_0x34ea('0x2')](/[^0-9+\-Ee.]/g,'');_0x3e975b=isFinite(+_0x3e975b)?+_0x3e975b:0x0;_0x11162b=isFinite(+_0x11162b)?Math['abs'](_0x11162b):0x0;_0x32f3e3=_0x34ea('0x3')===typeof _0x32f3e3?',':_0x32f3e3;_0x5c5340=_0x34ea('0x3')===typeof _0x5c5340?'.':_0x5c5340;var _0x28b02e='',_0x28b02e=function(_0x422fa0,_0x3feba9){var _0x462c64=Math[_0x34ea('0xa9')](0xa,_0x3feba9);return''+(Math[_0x34ea('0x4')](_0x422fa0*_0x462c64)/_0x462c64)['toFixed'](_0x3feba9);},_0x28b02e=(_0x11162b?_0x28b02e(_0x3e975b,_0x11162b):''+Math[_0x34ea('0x4')](_0x3e975b))[_0x34ea('0x98')]('.');0x3<_0x28b02e[0x0][_0x34ea('0x6')]&&(_0x28b02e[0x0]=_0x28b02e[0x0][_0x34ea('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x32f3e3));(_0x28b02e[0x1]||'')[_0x34ea('0x6')]<_0x11162b&&(_0x28b02e[0x1]=_0x28b02e[0x1]||'',_0x28b02e[0x1]+=Array(_0x11162b-_0x28b02e[0x1][_0x34ea('0x6')]+0x1)[_0x34ea('0x7')]('0'));return _0x28b02e[_0x34ea('0x7')](_0x5c5340);}(function(){try{window[_0x34ea('0x36')]=window[_0x34ea('0x36')]||{},window['_QuatroDigital_CartData'][_0x34ea('0x40')]=window[_0x34ea('0x36')][_0x34ea('0x40')]||$[_0x34ea('0x64')]();}catch(_0x405796){_0x34ea('0x3')!==typeof console&&_0x34ea('0x8')===typeof console['error']&&console[_0x34ea('0x13')](_0x34ea('0x61'),_0x405796['message']);}}());(function(_0x3154a4){try{var _0x305fdd=jQuery,_0x509622=function(_0x8af351,_0x3327fa){if(_0x34ea('0x28')===typeof console&&'undefined'!==typeof console[_0x34ea('0x13')]&&_0x34ea('0x3')!==typeof console[_0x34ea('0x2b')]&&_0x34ea('0x3')!==typeof console[_0x34ea('0x29')]){var _0x529db9;'object'===typeof _0x8af351?(_0x8af351[_0x34ea('0x65')](_0x34ea('0xaa')),_0x529db9=_0x8af351):_0x529db9=['[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'+_0x8af351];if(_0x34ea('0x3')===typeof _0x3327fa||_0x34ea('0x4c')!==_0x3327fa[_0x34ea('0xe')]()&&_0x34ea('0x67')!==_0x3327fa['toLowerCase']())if(_0x34ea('0x3')!==typeof _0x3327fa&&'info'===_0x3327fa[_0x34ea('0xe')]())try{console[_0x34ea('0x2b')][_0x34ea('0x68')](console,_0x529db9);}catch(_0x27af23){try{console[_0x34ea('0x2b')](_0x529db9[_0x34ea('0x7')]('\x0a'));}catch(_0x5099b7){}}else try{console['error']['apply'](console,_0x529db9);}catch(_0x4628d6){try{console['error'](_0x529db9[_0x34ea('0x7')]('\x0a'));}catch(_0x37dd79){}}else try{console[_0x34ea('0x29')][_0x34ea('0x68')](console,_0x529db9);}catch(_0x7b6948){try{console[_0x34ea('0x29')](_0x529db9[_0x34ea('0x7')]('\x0a'));}catch(_0x4b8f0b){}}}};window[_0x34ea('0x56')]=window[_0x34ea('0x56')]||{};window[_0x34ea('0x56')][_0x34ea('0x87')]=!0x0;_0x305fdd[_0x34ea('0xab')]=function(){};_0x305fdd['fn'][_0x34ea('0xab')]=function(){return{'fn':new _0x305fdd()};};var _0x1e1ffd=function(_0x2450a7){var _0x7ef904={'t':_0x34ea('0xac')};return function(_0x75f3a7){var _0x4a26b2=function(_0x230d42){return _0x230d42;};var _0x4fb7ad=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x75f3a7=_0x75f3a7['d'+_0x4fb7ad[0x10]+'c'+_0x4fb7ad[0x11]+'m'+_0x4a26b2(_0x4fb7ad[0x1])+'n'+_0x4fb7ad[0xd]]['l'+_0x4fb7ad[0x12]+'c'+_0x4fb7ad[0x0]+'ti'+_0x4a26b2('o')+'n'];var _0x4ebc6b=function(_0x339059){return escape(encodeURIComponent(_0x339059[_0x34ea('0x2')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x21f0ab){return String[_0x34ea('0xad')](('Z'>=_0x21f0ab?0x5a:0x7a)>=(_0x21f0ab=_0x21f0ab[_0x34ea('0xae')](0x0)+0xd)?_0x21f0ab:_0x21f0ab-0x1a);})));};var _0x3154a4=_0x4ebc6b(_0x75f3a7[[_0x4fb7ad[0x9],_0x4a26b2('o'),_0x4fb7ad[0xc],_0x4fb7ad[_0x4a26b2(0xd)]][_0x34ea('0x7')]('')]);_0x4ebc6b=_0x4ebc6b((window[['js',_0x4a26b2('no'),'m',_0x4fb7ad[0x1],_0x4fb7ad[0x4][_0x34ea('0xd')](),_0x34ea('0xaf')][_0x34ea('0x7')]('')]||'---')+['.v',_0x4fb7ad[0xd],'e',_0x4a26b2('x'),'co',_0x4a26b2('mm'),_0x34ea('0xb0'),_0x4fb7ad[0x1],'.c',_0x4a26b2('o'),'m.',_0x4fb7ad[0x13],'r']['join'](''));for(var _0x3baefe in _0x7ef904){if(_0x4ebc6b===_0x3baefe+_0x7ef904[_0x3baefe]||_0x3154a4===_0x3baefe+_0x7ef904[_0x3baefe]){var _0xe6123d='tr'+_0x4fb7ad[0x11]+'e';break;}_0xe6123d='f'+_0x4fb7ad[0x0]+'ls'+_0x4a26b2(_0x4fb7ad[0x1])+'';}_0x4a26b2=!0x1;-0x1<_0x75f3a7[[_0x4fb7ad[0xc],'e',_0x4fb7ad[0x0],'rc',_0x4fb7ad[0x9]]['join']('')][_0x34ea('0x8c')](_0x34ea('0xb1'))&&(_0x4a26b2=!0x0);return[_0xe6123d,_0x4a26b2];}(_0x2450a7);}(window);if(!eval(_0x1e1ffd[0x0]))return _0x1e1ffd[0x1]?_0x509622(_0x34ea('0xb2')):!0x1;_0x305fdd[_0x34ea('0xab')]=function(_0xac958b,_0x24871b){var _0x402f29=_0x305fdd(_0xac958b);if(!_0x402f29[_0x34ea('0x6')])return _0x402f29;var _0x121558=_0x305fdd[_0x34ea('0x14')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':_0x34ea('0xb3'),'cartTotal':_0x34ea('0xb4'),'emptyCart':_0x34ea('0xb5'),'continueShopping':_0x34ea('0xb6'),'shippingForm':'<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x315456){return _0x315456[_0x34ea('0xb7')]||_0x315456[_0x34ea('0xb8')];},'callback':function(){},'callbackProductsList':function(){}},_0x24871b);_0x305fdd('');var _0x43d604=this;if(_0x121558[_0x34ea('0x55')]){var _0x514872=!0x1;_0x34ea('0x3')===typeof window[_0x34ea('0x57')]&&(_0x509622(_0x34ea('0xb9')),_0x305fdd['ajax']({'url':_0x34ea('0xba'),'async':!0x1,'dataType':_0x34ea('0xbb'),'error':function(){_0x509622('Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.');_0x514872=!0x0;}}));if(_0x514872)return _0x509622('A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!');}if(_0x34ea('0x28')===typeof window[_0x34ea('0x57')]&&_0x34ea('0x3')!==typeof window[_0x34ea('0x57')][_0x34ea('0x24')])var _0x46182c=window['vtexjs'][_0x34ea('0x24')];else if('object'===typeof vtex&&_0x34ea('0x28')===typeof vtex[_0x34ea('0x24')]&&_0x34ea('0x3')!==typeof vtex[_0x34ea('0x24')][_0x34ea('0x58')])_0x46182c=new vtex[(_0x34ea('0x24'))]['SDK']();else return _0x509622(_0x34ea('0x59'));_0x43d604[_0x34ea('0xbc')]=_0x34ea('0xbd');var _0x4d8fda=function(_0x1888f6){_0x305fdd(this)[_0x34ea('0xbe')](_0x1888f6);_0x1888f6[_0x34ea('0x51')](_0x34ea('0xbf'))['add'](_0x305fdd(_0x34ea('0xc0')))['on'](_0x34ea('0xc1'),function(){_0x402f29[_0x34ea('0x49')](_0x34ea('0xc2'));_0x305fdd(document['body'])['removeClass'](_0x34ea('0x82'));});_0x305fdd(document)[_0x34ea('0xc3')](_0x34ea('0xc4'))['on'](_0x34ea('0xc4'),function(_0x2cf418){0x1b==_0x2cf418[_0x34ea('0xc5')]&&(_0x402f29[_0x34ea('0x49')](_0x34ea('0xc2')),_0x305fdd(document[_0x34ea('0x6b')])[_0x34ea('0x49')](_0x34ea('0x82')));});var _0x2ed030=_0x1888f6[_0x34ea('0x51')](_0x34ea('0xc6'));_0x1888f6[_0x34ea('0x51')](_0x34ea('0xc7'))['on'](_0x34ea('0xc8'),function(){_0x43d604['scrollCart']('-',void 0x0,void 0x0,_0x2ed030);return!0x1;});_0x1888f6[_0x34ea('0x51')](_0x34ea('0xc9'))['on'](_0x34ea('0xca'),function(){_0x43d604['scrollCart'](void 0x0,void 0x0,void 0x0,_0x2ed030);return!0x1;});_0x1888f6[_0x34ea('0x51')](_0x34ea('0xcb'))['val']('')['on'](_0x34ea('0xcc'),function(){_0x43d604[_0x34ea('0xcd')](_0x305fdd(this));});if(_0x121558['updateOnlyHover']){var _0x24871b=0x0;_0x305fdd(this)['on'](_0x34ea('0xce'),function(){var _0x1888f6=function(){window[_0x34ea('0x56')][_0x34ea('0x87')]&&(_0x43d604[_0x34ea('0x86')](),window['_QuatroDigital_DropDown'][_0x34ea('0x87')]=!0x1,_0x305fdd['fn'][_0x34ea('0x23')](!0x0),_0x43d604[_0x34ea('0xcf')]());};_0x24871b=setInterval(function(){_0x1888f6();},0x258);_0x1888f6();});_0x305fdd(this)['on'](_0x34ea('0xd0'),function(){clearInterval(_0x24871b);});}};var _0xf8c754=function(_0x1ca1be){_0x1ca1be=_0x305fdd(_0x1ca1be);_0x121558[_0x34ea('0xd1')][_0x34ea('0x53')]=_0x121558[_0x34ea('0xd1')][_0x34ea('0x53')][_0x34ea('0x2')](_0x34ea('0xd2'),'<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>');_0x121558[_0x34ea('0xd1')]['cartTotal']=_0x121558[_0x34ea('0xd1')][_0x34ea('0x53')][_0x34ea('0x2')](_0x34ea('0xd3'),_0x34ea('0xd4'));_0x121558[_0x34ea('0xd1')][_0x34ea('0x53')]=_0x121558[_0x34ea('0xd1')][_0x34ea('0x53')][_0x34ea('0x2')]('#shipping',_0x34ea('0xd5'));_0x121558[_0x34ea('0xd1')][_0x34ea('0x53')]=_0x121558[_0x34ea('0xd1')][_0x34ea('0x53')][_0x34ea('0x2')]('#total',_0x34ea('0xd6'));_0x1ca1be[_0x34ea('0x51')](_0x34ea('0xd7'))['html'](_0x121558[_0x34ea('0xd1')][_0x34ea('0xd8')]);_0x1ca1be['find']('.qd_ddc_continueShopping')[_0x34ea('0x4e')](_0x121558[_0x34ea('0xd1')][_0x34ea('0xd9')]);_0x1ca1be[_0x34ea('0x51')](_0x34ea('0xda'))[_0x34ea('0x4e')](_0x121558[_0x34ea('0xd1')]['linkCheckout']);_0x1ca1be['find'](_0x34ea('0xdb'))[_0x34ea('0x4e')](_0x121558[_0x34ea('0xd1')]['cartTotal']);_0x1ca1be[_0x34ea('0x51')](_0x34ea('0xdc'))[_0x34ea('0x4e')](_0x121558[_0x34ea('0xd1')]['shippingForm']);_0x1ca1be[_0x34ea('0x51')](_0x34ea('0xdd'))['html'](_0x121558[_0x34ea('0xd1')]['emptyCart']);return _0x1ca1be;}(this[_0x34ea('0xbc')]);var _0x480cb6=0x0;_0x402f29[_0x34ea('0x34')](function(){0x0<_0x480cb6?_0x4d8fda[_0x34ea('0x26')](this,_0xf8c754[_0x34ea('0xde')]()):_0x4d8fda[_0x34ea('0x26')](this,_0xf8c754);_0x480cb6++;});window[_0x34ea('0x36')][_0x34ea('0x40')]['add'](function(){_0x305fdd(_0x34ea('0xdf'))['html'](window[_0x34ea('0x36')][_0x34ea('0x39')]||'--');_0x305fdd(_0x34ea('0xe0'))[_0x34ea('0x4e')](window[_0x34ea('0x36')][_0x34ea('0x3c')]||'0');_0x305fdd(_0x34ea('0xe1'))[_0x34ea('0x4e')](window[_0x34ea('0x36')][_0x34ea('0xe2')]||'--');_0x305fdd('.qd-ddc-infoAllTotal')[_0x34ea('0x4e')](window[_0x34ea('0x36')]['allTotal']||'--');});var _0x1c4fea=function(_0x4a0a5e,_0x29d8d1){if(_0x34ea('0x3')===typeof _0x4a0a5e[_0x34ea('0x3e')])return _0x509622(_0x34ea('0xe3'));_0x43d604[_0x34ea('0xe4')][_0x34ea('0x26')](this,_0x29d8d1);};_0x43d604[_0x34ea('0x86')]=function(_0x5e1eca,_0x4782bd){_0x34ea('0x3')!=typeof _0x4782bd?window[_0x34ea('0x56')][_0x34ea('0xe5')]=_0x4782bd:window[_0x34ea('0x56')]['dataOptionsCache']&&(_0x4782bd=window[_0x34ea('0x56')][_0x34ea('0xe5')]);setTimeout(function(){window[_0x34ea('0x56')][_0x34ea('0xe5')]=void 0x0;},_0x121558[_0x34ea('0x85')]);_0x305fdd(_0x34ea('0xe6'))[_0x34ea('0x49')](_0x34ea('0xe7'));if(_0x121558[_0x34ea('0x55')]){var _0x24871b=function(_0x2f38f6){window[_0x34ea('0x56')][_0x34ea('0x25')]=_0x2f38f6;_0x1c4fea(_0x2f38f6,_0x4782bd);_0x34ea('0x3')!==typeof window[_0x34ea('0xe8')]&&_0x34ea('0x8')===typeof window[_0x34ea('0xe8')][_0x34ea('0xe9')]&&window[_0x34ea('0xe8')][_0x34ea('0xe9')]['call'](this);_0x305fdd('.qd-ddc-wrapper')[_0x34ea('0x47')](_0x34ea('0xe7'));};_0x34ea('0x3')!==typeof window['_QuatroDigital_DropDown']['getOrderForm']?(_0x24871b(window[_0x34ea('0x56')]['getOrderForm']),_0x34ea('0x8')===typeof _0x5e1eca&&_0x5e1eca(window[_0x34ea('0x56')][_0x34ea('0x25')])):_0x305fdd[_0x34ea('0x5a')]([_0x34ea('0x3e'),'totalizers','shippingData'],{'done':function(_0x347bd3){_0x24871b[_0x34ea('0x26')](this,_0x347bd3);_0x34ea('0x8')===typeof _0x5e1eca&&_0x5e1eca(_0x347bd3);},'fail':function(_0x44e5e1){_0x509622([_0x34ea('0xea'),_0x44e5e1]);}});}else alert(_0x34ea('0xeb'));};_0x43d604[_0x34ea('0xcf')]=function(){var _0x5a1b91=_0x305fdd(_0x34ea('0xe6'));_0x5a1b91[_0x34ea('0x51')](_0x34ea('0xec'))[_0x34ea('0x6')]?_0x5a1b91[_0x34ea('0x49')](_0x34ea('0xed')):_0x5a1b91[_0x34ea('0x47')](_0x34ea('0xed'));};_0x43d604[_0x34ea('0xe4')]=function(_0x393226){var _0x24871b=_0x305fdd(_0x34ea('0xee'));_0x24871b[_0x34ea('0xef')]();_0x24871b[_0x34ea('0x34')](function(){var _0x24871b=_0x305fdd(this),_0xac958b,_0x4c0d45,_0x30418e=_0x305fdd(''),_0x52cf34;for(_0x52cf34 in window[_0x34ea('0x56')][_0x34ea('0x25')]['items'])if(_0x34ea('0x28')===typeof window['_QuatroDigital_DropDown'][_0x34ea('0x25')][_0x34ea('0x3e')][_0x52cf34]){var _0x48e3f4=window[_0x34ea('0x56')]['getOrderForm']['items'][_0x52cf34];var _0x49e56e=_0x48e3f4['productCategoryIds'][_0x34ea('0x2')](/^\/|\/$/g,'')['split']('/');var _0x4e50a2=_0x305fdd(_0x34ea('0xf0'));_0x4e50a2[_0x34ea('0x33')]({'data-sku':_0x48e3f4['id'],'data-sku-index':_0x52cf34,'data-qd-departament':_0x49e56e[0x0],'data-qd-category':_0x49e56e[_0x49e56e[_0x34ea('0x6')]-0x1]});_0x4e50a2['addClass'](_0x34ea('0xf1')+_0x48e3f4[_0x34ea('0xf2')]);_0x4e50a2[_0x34ea('0x51')](_0x34ea('0xf3'))[_0x34ea('0xbe')](_0x121558[_0x34ea('0xb7')](_0x48e3f4));_0x4e50a2[_0x34ea('0x51')](_0x34ea('0xf4'))['append'](isNaN(_0x48e3f4[_0x34ea('0xf5')])?_0x48e3f4[_0x34ea('0xf5')]:0x0==_0x48e3f4[_0x34ea('0xf5')]?_0x34ea('0xf6'):(_0x305fdd(_0x34ea('0x32'))[_0x34ea('0x33')](_0x34ea('0xf7'))||'R$')+'\x20'+qd_number_format(_0x48e3f4[_0x34ea('0xf5')]/0x64,0x2,',','.'));_0x4e50a2[_0x34ea('0x51')](_0x34ea('0xf8'))[_0x34ea('0x33')]({'data-sku':_0x48e3f4['id'],'data-sku-index':_0x52cf34})[_0x34ea('0xf9')](_0x48e3f4[_0x34ea('0x3f')]);_0x4e50a2[_0x34ea('0x51')](_0x34ea('0xfa'))[_0x34ea('0x33')]({'data-sku':_0x48e3f4['id'],'data-sku-index':_0x52cf34});_0x43d604[_0x34ea('0xfb')](_0x48e3f4['id'],_0x4e50a2[_0x34ea('0x51')]('.qd-ddc-image'),_0x48e3f4[_0x34ea('0xfc')]);_0x4e50a2[_0x34ea('0x51')]('.qd-ddc-quantityMore,.qd-ddc-quantityMinus')['attr']({'data-sku':_0x48e3f4['id'],'data-sku-index':_0x52cf34});_0x4e50a2[_0x34ea('0xfd')](_0x24871b);_0x30418e=_0x30418e[_0x34ea('0x2c')](_0x4e50a2);}try{var _0x162a2a=_0x24871b[_0x34ea('0x0')](_0x34ea('0xe6'))['find'](_0x34ea('0xcb'));_0x162a2a[_0x34ea('0x6')]&&''==_0x162a2a[_0x34ea('0xf9')]()&&window[_0x34ea('0x56')][_0x34ea('0x25')][_0x34ea('0xfe')]['address']&&_0x162a2a['val'](window['_QuatroDigital_DropDown']['getOrderForm']['shippingData'][_0x34ea('0xff')]['postalCode']);}catch(_0x42ad09){_0x509622('Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20'+_0x42ad09[_0x34ea('0x100')],'aviso');}_0x43d604[_0x34ea('0x101')](_0x24871b);_0x43d604[_0x34ea('0xcf')]();_0x393226&&_0x393226['lastSku']&&function(){_0x4c0d45=_0x30418e[_0x34ea('0x45')](_0x34ea('0x102')+_0x393226['lastSku']+'\x27]');_0x4c0d45[_0x34ea('0x6')]&&(_0xac958b=0x0,_0x30418e[_0x34ea('0x34')](function(){var _0x393226=_0x305fdd(this);if(_0x393226['is'](_0x4c0d45))return!0x1;_0xac958b+=_0x393226['outerHeight']();}),_0x43d604['scrollCart'](void 0x0,void 0x0,_0xac958b,_0x24871b['add'](_0x24871b['parent']())),_0x30418e[_0x34ea('0x49')](_0x34ea('0x103')),function(_0x591275){_0x591275[_0x34ea('0x47')](_0x34ea('0x104'));_0x591275[_0x34ea('0x47')]('qd-ddc-lastAddedFixed');setTimeout(function(){_0x591275['removeClass'](_0x34ea('0x104'));},_0x121558['timeRemoveNewItemClass']);}(_0x4c0d45));}();});(function(){_QuatroDigital_DropDown['getOrderForm']['items'][_0x34ea('0x6')]?(_0x305fdd(_0x34ea('0x6b'))[_0x34ea('0x49')](_0x34ea('0x105'))[_0x34ea('0x47')](_0x34ea('0x106')),setTimeout(function(){_0x305fdd(_0x34ea('0x6b'))[_0x34ea('0x49')](_0x34ea('0x107'));},_0x121558['timeRemoveNewItemClass'])):_0x305fdd(_0x34ea('0x6b'))[_0x34ea('0x49')](_0x34ea('0x108'))[_0x34ea('0x47')](_0x34ea('0x105'));}());_0x34ea('0x8')===typeof _0x121558[_0x34ea('0x109')]?_0x121558[_0x34ea('0x109')][_0x34ea('0x26')](this):_0x509622(_0x34ea('0x10a'));};_0x43d604[_0x34ea('0xfb')]=function(_0x365c4d,_0x3b0636,_0x161160){function _0xc60fd8(){_0x3b0636[_0x34ea('0x49')](_0x34ea('0x10b'))[_0x34ea('0x10c')](function(){_0x305fdd(this)[_0x34ea('0x47')]('qd-loaded');})[_0x34ea('0x33')]('src',_0x161160);}_0x161160?_0xc60fd8():isNaN(_0x365c4d)?_0x509622(_0x34ea('0x10d'),'alerta'):alert(_0x34ea('0x10e'));};_0x43d604[_0x34ea('0x101')]=function(_0x1d7450){var _0x32febb=function(_0x13f2ae,_0x2aecd1){var _0x24871b=_0x305fdd(_0x13f2ae);var _0x560337=_0x24871b['attr'](_0x34ea('0x10f'));var _0xac958b=_0x24871b[_0x34ea('0x33')](_0x34ea('0x110'));if(_0x560337){var _0x5891b0=parseInt(_0x24871b[_0x34ea('0xf9')]())||0x1;_0x43d604['changeQantity']([_0x560337,_0xac958b],_0x5891b0,_0x5891b0+0x1,function(_0x32897b){_0x24871b[_0x34ea('0xf9')](_0x32897b);_0x34ea('0x8')===typeof _0x2aecd1&&_0x2aecd1();});}};var _0x24871b=function(_0x4f6086,_0x267f18){var _0x24871b=_0x305fdd(_0x4f6086);var _0x27c98e=_0x24871b['attr'](_0x34ea('0x10f'));var _0xac958b=_0x24871b[_0x34ea('0x33')](_0x34ea('0x110'));if(_0x27c98e){var _0x153f8d=parseInt(_0x24871b[_0x34ea('0xf9')]())||0x2;_0x43d604['changeQantity']([_0x27c98e,_0xac958b],_0x153f8d,_0x153f8d-0x1,function(_0x38c831){_0x24871b['val'](_0x38c831);_0x34ea('0x8')===typeof _0x267f18&&_0x267f18();});}};var _0x4290e6=function(_0xd1a4d7,_0x30044e){var _0x24871b=_0x305fdd(_0xd1a4d7);var _0x27af07=_0x24871b['attr'](_0x34ea('0x10f'));var _0xac958b=_0x24871b[_0x34ea('0x33')](_0x34ea('0x110'));if(_0x27af07){var _0x57fa0b=parseInt(_0x24871b[_0x34ea('0xf9')]())||0x1;_0x43d604[_0x34ea('0x111')]([_0x27af07,_0xac958b],0x1,_0x57fa0b,function(_0x1f6f45){_0x24871b[_0x34ea('0xf9')](_0x1f6f45);_0x34ea('0x8')===typeof _0x30044e&&_0x30044e();});}};var _0xac958b=_0x1d7450['find']('.qd-ddc-prodQttWrapper:not(.qd_on)');_0xac958b['addClass']('qd_on')['each'](function(){var _0x1d7450=_0x305fdd(this);_0x1d7450[_0x34ea('0x51')]('.qd-ddc-quantityMore')['on'](_0x34ea('0x112'),function(_0x2057ae){_0x2057ae[_0x34ea('0x76')]();_0xac958b[_0x34ea('0x47')](_0x34ea('0x113'));_0x32febb(_0x1d7450[_0x34ea('0x51')](_0x34ea('0xf8')),function(){_0xac958b[_0x34ea('0x49')](_0x34ea('0x113'));});});_0x1d7450[_0x34ea('0x51')](_0x34ea('0x114'))['on'](_0x34ea('0x115'),function(_0xc52210){_0xc52210[_0x34ea('0x76')]();_0xac958b['addClass'](_0x34ea('0x113'));_0x24871b(_0x1d7450[_0x34ea('0x51')](_0x34ea('0xf8')),function(){_0xac958b[_0x34ea('0x49')](_0x34ea('0x113'));});});_0x1d7450[_0x34ea('0x51')](_0x34ea('0xf8'))['on'](_0x34ea('0x116'),function(){_0xac958b[_0x34ea('0x47')]('qd-loading');_0x4290e6(this,function(){_0xac958b[_0x34ea('0x49')](_0x34ea('0x113'));});});_0x1d7450[_0x34ea('0x51')](_0x34ea('0xf8'))['on']('keyup.qd_ddc_change',function(_0xbdcdc0){0xd==_0xbdcdc0[_0x34ea('0xc5')]&&(_0xac958b[_0x34ea('0x47')](_0x34ea('0x113')),_0x4290e6(this,function(){_0xac958b[_0x34ea('0x49')](_0x34ea('0x113'));}));});});_0x1d7450[_0x34ea('0x51')]('.qd-ddc-prodRow')[_0x34ea('0x34')](function(){var _0x1d7450=_0x305fdd(this);_0x1d7450[_0x34ea('0x51')](_0x34ea('0xfa'))['on'](_0x34ea('0x117'),function(){_0x1d7450[_0x34ea('0x47')](_0x34ea('0x113'));_0x43d604[_0x34ea('0x118')](_0x305fdd(this),function(_0x45c213){_0x45c213?_0x1d7450[_0x34ea('0x119')](!0x0)[_0x34ea('0x11a')](function(){_0x1d7450[_0x34ea('0x11b')]();_0x43d604['cartIsEmpty']();}):_0x1d7450[_0x34ea('0x49')]('qd-loading');});return!0x1;});});};_0x43d604[_0x34ea('0xcd')]=function(_0x6d286e){var _0x414f1a=_0x6d286e[_0x34ea('0xf9')](),_0x414f1a=_0x414f1a['replace'](/[^0-9\-]/g,''),_0x414f1a=_0x414f1a['replace'](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3'),_0x414f1a=_0x414f1a[_0x34ea('0x2')](/(.{9}).*/g,'$1');_0x6d286e['val'](_0x414f1a);0x9<=_0x414f1a[_0x34ea('0x6')]&&(_0x6d286e[_0x34ea('0x16')](_0x34ea('0x11c'))!=_0x414f1a&&_0x46182c[_0x34ea('0x11d')]({'postalCode':_0x414f1a,'country':_0x34ea('0x11e')})[_0x34ea('0x1c')](function(_0x4c621c){window[_0x34ea('0x56')][_0x34ea('0x25')]=_0x4c621c;_0x43d604['getCartInfoByUrl']();})['fail'](function(_0x39a788){_0x509622([_0x34ea('0x11f'),_0x39a788]);updateCartData();}),_0x6d286e['data'](_0x34ea('0x11c'),_0x414f1a));};_0x43d604[_0x34ea('0x111')]=function(_0x38bf72,_0x17c55a,_0x55a405,_0x32752a){function _0x1df052(_0x2e7a5f){_0x2e7a5f=_0x34ea('0x120')!==typeof _0x2e7a5f?!0x1:_0x2e7a5f;_0x43d604[_0x34ea('0x86')]();window[_0x34ea('0x56')][_0x34ea('0x87')]=!0x1;_0x43d604['cartIsEmpty']();_0x34ea('0x3')!==typeof window['_QuatroDigital_AmountProduct']&&_0x34ea('0x8')===typeof window[_0x34ea('0xe8')]['exec']&&window[_0x34ea('0xe8')]['exec']['call'](this);_0x34ea('0x8')===typeof adminCart&&adminCart();_0x305fdd['fn'][_0x34ea('0x23')](!0x0,void 0x0,_0x2e7a5f);_0x34ea('0x8')===typeof _0x32752a&&_0x32752a(_0x17c55a);}_0x55a405=_0x55a405||0x1;if(0x1>_0x55a405)return _0x17c55a;if(_0x121558['smartCheckout']){if(_0x34ea('0x3')===typeof window[_0x34ea('0x56')][_0x34ea('0x25')][_0x34ea('0x3e')][_0x38bf72[0x1]])return _0x509622(_0x34ea('0x121')+_0x38bf72[0x1]+']'),_0x17c55a;window['_QuatroDigital_DropDown'][_0x34ea('0x25')][_0x34ea('0x3e')][_0x38bf72[0x1]][_0x34ea('0x3f')]=_0x55a405;window['_QuatroDigital_DropDown'][_0x34ea('0x25')][_0x34ea('0x3e')][_0x38bf72[0x1]][_0x34ea('0x122')]=_0x38bf72[0x1];_0x46182c[_0x34ea('0x123')]([window[_0x34ea('0x56')][_0x34ea('0x25')][_0x34ea('0x3e')][_0x38bf72[0x1]]],[_0x34ea('0x3e'),_0x34ea('0x37'),'shippingData'])['done'](function(_0x4d6d55){window['_QuatroDigital_DropDown'][_0x34ea('0x25')]=_0x4d6d55;_0x1df052(!0x0);})[_0x34ea('0x1e')](function(_0x3430fd){_0x509622([_0x34ea('0x124'),_0x3430fd]);_0x1df052();});}else _0x509622('atenção\x20esta\x20método\x20esta\x20descontinuado');};_0x43d604[_0x34ea('0x118')]=function(_0x5d26a8,_0x5ce8e7){function _0x6afdbe(_0x4e5053){_0x4e5053=_0x34ea('0x120')!==typeof _0x4e5053?!0x1:_0x4e5053;_0x34ea('0x3')!==typeof window[_0x34ea('0xe8')]&&_0x34ea('0x8')===typeof window[_0x34ea('0xe8')][_0x34ea('0xe9')]&&window[_0x34ea('0xe8')][_0x34ea('0xe9')][_0x34ea('0x26')](this);_0x34ea('0x8')===typeof adminCart&&adminCart();_0x305fdd['fn'][_0x34ea('0x23')](!0x0,void 0x0,_0x4e5053);'function'===typeof _0x5ce8e7&&_0x5ce8e7(_0xac958b);}var _0xac958b=!0x1,_0x57cfbf=_0x305fdd(_0x5d26a8)[_0x34ea('0x33')](_0x34ea('0x110'));if(_0x121558[_0x34ea('0x55')]){if(_0x34ea('0x3')===typeof window[_0x34ea('0x56')][_0x34ea('0x25')][_0x34ea('0x3e')][_0x57cfbf])return _0x509622(_0x34ea('0x121')+_0x57cfbf+']'),_0xac958b;window[_0x34ea('0x56')][_0x34ea('0x25')]['items'][_0x57cfbf][_0x34ea('0x122')]=_0x57cfbf;_0x46182c['removeItems']([window[_0x34ea('0x56')][_0x34ea('0x25')][_0x34ea('0x3e')][_0x57cfbf]],['items','totalizers','shippingData'])['done'](function(_0xc3b46b){_0xac958b=!0x0;window[_0x34ea('0x56')][_0x34ea('0x25')]=_0xc3b46b;_0x1c4fea(_0xc3b46b);_0x6afdbe(!0x0);})[_0x34ea('0x1e')](function(_0x4bbd8b){_0x509622([_0x34ea('0x125'),_0x4bbd8b]);_0x6afdbe();});}else alert(_0x34ea('0x126'));};_0x43d604[_0x34ea('0x127')]=function(_0x529c0f,_0x21c0ae,_0x37252b,_0x39d620){_0x39d620=_0x39d620||_0x305fdd(_0x34ea('0x128'));_0x529c0f=_0x529c0f||'+';_0x21c0ae=_0x21c0ae||0.9*_0x39d620[_0x34ea('0x129')]();_0x39d620['stop'](!0x0,!0x0)[_0x34ea('0x12a')]({'scrollTop':isNaN(_0x37252b)?_0x529c0f+'='+_0x21c0ae+'px':_0x37252b});};_0x121558[_0x34ea('0x12b')]||(_0x43d604[_0x34ea('0x86')](),_0x305fdd['fn']['simpleCart'](!0x0));_0x305fdd(window)['on'](_0x34ea('0x12c'),function(){try{window['_QuatroDigital_DropDown'][_0x34ea('0x25')]=void 0x0,_0x43d604[_0x34ea('0x86')]();}catch(_0x137b67){_0x509622(_0x34ea('0x12d')+_0x137b67[_0x34ea('0x100')],_0x34ea('0x12e'));}});_0x34ea('0x8')===typeof _0x121558['callback']?_0x121558[_0x34ea('0x40')][_0x34ea('0x26')](this):_0x509622('Callback\x20não\x20é\x20uma\x20função');};_0x305fdd['fn'][_0x34ea('0xab')]=function(_0x3617e4){var _0x1b8b38=_0x305fdd(this);_0x1b8b38['fn']=new _0x305fdd[(_0x34ea('0xab'))](this,_0x3617e4);return _0x1b8b38;};}catch(_0x36b5a9){_0x34ea('0x3')!==typeof console&&_0x34ea('0x8')===typeof console[_0x34ea('0x13')]&&console[_0x34ea('0x13')]('Oooops!\x20',_0x36b5a9);}}(this));(function(_0x43fcbb){try{var _0x461646=jQuery;window['_QuatroDigital_AmountProduct']=window[_0x34ea('0xe8')]||{};window[_0x34ea('0xe8')][_0x34ea('0x3e')]={};window[_0x34ea('0xe8')]['allowRecalculate']=!0x1;window[_0x34ea('0xe8')][_0x34ea('0x12f')]=!0x1;window[_0x34ea('0xe8')][_0x34ea('0x130')]=!0x1;var _0x5190c0=function(){if(window[_0x34ea('0xe8')][_0x34ea('0x131')]){var _0x1763da=!0x1;var _0x43fcbb={};window[_0x34ea('0xe8')][_0x34ea('0x3e')]={};for(_0x498a4c in window['_QuatroDigital_DropDown']['getOrderForm']['items'])if('object'===typeof window[_0x34ea('0x56')][_0x34ea('0x25')]['items'][_0x498a4c]){var _0x1270f8=window[_0x34ea('0x56')][_0x34ea('0x25')][_0x34ea('0x3e')][_0x498a4c];_0x34ea('0x3')!==typeof _0x1270f8['productId']&&null!==_0x1270f8['productId']&&''!==_0x1270f8[_0x34ea('0x132')]&&(window['_QuatroDigital_AmountProduct']['items']['prod_'+_0x1270f8[_0x34ea('0x132')]]=window[_0x34ea('0xe8')][_0x34ea('0x3e')][_0x34ea('0x133')+_0x1270f8[_0x34ea('0x132')]]||{},window[_0x34ea('0xe8')][_0x34ea('0x3e')][_0x34ea('0x133')+_0x1270f8[_0x34ea('0x132')]][_0x34ea('0x134')]=_0x1270f8[_0x34ea('0x132')],_0x43fcbb['prod_'+_0x1270f8[_0x34ea('0x132')]]||(window[_0x34ea('0xe8')][_0x34ea('0x3e')][_0x34ea('0x133')+_0x1270f8[_0x34ea('0x132')]][_0x34ea('0x3c')]=0x0),window['_QuatroDigital_AmountProduct']['items'][_0x34ea('0x133')+_0x1270f8[_0x34ea('0x132')]][_0x34ea('0x3c')]+=_0x1270f8[_0x34ea('0x3f')],_0x1763da=!0x0,_0x43fcbb[_0x34ea('0x133')+_0x1270f8[_0x34ea('0x132')]]=!0x0);}var _0x498a4c=_0x1763da;}else _0x498a4c=void 0x0;window[_0x34ea('0xe8')][_0x34ea('0x131')]&&(_0x461646(_0x34ea('0x135'))['remove'](),_0x461646(_0x34ea('0x136'))[_0x34ea('0x49')](_0x34ea('0x137')));for(var _0x12e19a in window[_0x34ea('0xe8')][_0x34ea('0x3e')]){_0x1270f8=window['_QuatroDigital_AmountProduct'][_0x34ea('0x3e')][_0x12e19a];if(_0x34ea('0x28')!==typeof _0x1270f8)return;_0x43fcbb=_0x461646(_0x34ea('0x138')+_0x1270f8['prodId']+']')['getParent']('li');if(window['_QuatroDigital_AmountProduct'][_0x34ea('0x131')]||!_0x43fcbb[_0x34ea('0x51')]('.qd-bap-wrapper')[_0x34ea('0x6')])_0x1763da=_0x461646(_0x34ea('0x139')),_0x1763da[_0x34ea('0x51')](_0x34ea('0x13a'))['html'](_0x1270f8[_0x34ea('0x3c')]),_0x1270f8=_0x43fcbb['find'](_0x34ea('0x13b')),_0x1270f8[_0x34ea('0x6')]?_0x1270f8['prepend'](_0x1763da)[_0x34ea('0x47')](_0x34ea('0x137')):_0x43fcbb['prepend'](_0x1763da);}_0x498a4c&&(window[_0x34ea('0xe8')][_0x34ea('0x131')]=!0x1);};window['_QuatroDigital_AmountProduct'][_0x34ea('0xe9')]=function(){window['_QuatroDigital_AmountProduct'][_0x34ea('0x131')]=!0x0;_0x5190c0[_0x34ea('0x26')](this);};_0x461646(document)[_0x34ea('0x13c')](function(){_0x5190c0[_0x34ea('0x26')](this);});}catch(_0x66510a){'undefined'!==typeof console&&_0x34ea('0x8')===typeof console[_0x34ea('0x13')]&&console[_0x34ea('0x13')](_0x34ea('0x61'),_0x66510a);}}(this));(function(){try{var _0x55bae6=jQuery,_0x53d453,_0x45c322={'selector':_0x34ea('0x13d'),'dropDown':{},'buyButton':{}};_0x55bae6[_0x34ea('0x13e')]=function(_0x1b5eed){var _0x3bda0e={};_0x53d453=_0x55bae6[_0x34ea('0x14')](!0x0,{},_0x45c322,_0x1b5eed);_0x1b5eed=_0x55bae6(_0x53d453['selector'])[_0x34ea('0xab')](_0x53d453[_0x34ea('0x13f')]);_0x3bda0e[_0x34ea('0x78')]='undefined'!==typeof _0x53d453[_0x34ea('0x13f')]['updateOnlyHover']&&!0x1===_0x53d453['dropDown'][_0x34ea('0x12b')]?_0x55bae6(_0x53d453['selector'])['QD_buyButton'](_0x1b5eed['fn'],_0x53d453[_0x34ea('0x78')]):_0x55bae6(_0x53d453[_0x34ea('0x7e')])['QD_buyButton'](_0x53d453[_0x34ea('0x78')]);_0x3bda0e[_0x34ea('0x13f')]=_0x1b5eed;return _0x3bda0e;};_0x55bae6['fn'][_0x34ea('0x140')]=function(){_0x34ea('0x28')===typeof console&&'function'===typeof console[_0x34ea('0x2b')]&&console['info'](_0x34ea('0x141'));};_0x55bae6[_0x34ea('0x140')]=_0x55bae6['fn'][_0x34ea('0x140')];}catch(_0x49ac57){'undefined'!==typeof console&&_0x34ea('0x8')===typeof console['error']&&console[_0x34ea('0x13')]('Oooops!\x20',_0x49ac57);}}());

/* Quatro Digital - Product Thumbs // Carlos Vinicius // Todos os direitos reservados. */
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs();a.trigger("QuatroDigital.pt_callback",[a])}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return a.length?$.extend({},a,new b(a)):a},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0x4ad3=['urlProtocol','://www.youtube.com/embed/','data','height','stop','fadeTo','addClass','qdpv-video-on','add','animate','find','a:not(\x27.qd-videoLink\x27)','bind','click.removeVideo','hide','removeAttr','style','removeClass','.qd-videoItem','call','string','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','click.playVideo','.ON','controlVideo','contentWindow','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','attr','.qd-playerWrapper\x20iframe','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','start','insertThumbsIn','prependTo','appendTo','trigger','QuatroDigital.pv_video_added','load','ImageControl','body','.produto','alerta','warn','[Video\x20in\x20product]\x20','undefined','info','error','qdVideoInProduct','td.value-field.Videos:first','http','ul.thumbs','div#image','videoFieldSelector','replace','split','length','indexOf','youtube','push','pop','shift','youtu.be','#include','wrap','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','join','---','erc','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','<iframe\x20src=\x22'];(function(_0x30a7f1,_0xf42b14){var _0x2c8344=function(_0x525cd5){while(--_0x525cd5){_0x30a7f1['push'](_0x30a7f1['shift']());}};_0x2c8344(++_0xf42b14);}(_0x4ad3,0x150));var _0x34ad=function(_0x18307e,_0x1898e8){_0x18307e=_0x18307e-0x0;var _0x24186b=_0x4ad3[_0x18307e];return _0x24186b;};(function(_0x3efe59){$(function(){if($(document[_0x34ad('0x0')])['is'](_0x34ad('0x1'))){var _0xccbef7=[];var _0x53e460=function(_0x22a4b1,_0x53e961){'object'===typeof console&&('undefined'!==typeof _0x53e961&&_0x34ad('0x2')===_0x53e961['toLowerCase']()?console[_0x34ad('0x3')](_0x34ad('0x4')+_0x22a4b1):_0x34ad('0x5')!==typeof _0x53e961&&_0x34ad('0x6')===_0x53e961['toLowerCase']()?console['info']('[Video\x20in\x20product]\x20'+_0x22a4b1):console[_0x34ad('0x7')](_0x34ad('0x4')+_0x22a4b1));};window[_0x34ad('0x8')]=window[_0x34ad('0x8')]||{};var _0x30a71a=$['extend'](!0x0,{'insertThumbsIn':'start','videoFieldSelector':_0x34ad('0x9'),'controlVideo':!0x0,'urlProtocol':_0x34ad('0xa')},window[_0x34ad('0x8')]);var _0x175d7c=$(_0x34ad('0xb'));var _0x43fb34=$(_0x34ad('0xc'));var _0x294968=$(_0x30a71a[_0x34ad('0xd')])['text']()[_0x34ad('0xe')](/\;\s*/,';')[_0x34ad('0xf')](';');for(var _0x460213=0x0;_0x460213<_0x294968[_0x34ad('0x10')];_0x460213++)-0x1<_0x294968[_0x460213][_0x34ad('0x11')](_0x34ad('0x12'))?_0xccbef7[_0x34ad('0x13')](_0x294968[_0x460213]['split']('v=')[_0x34ad('0x14')]()[_0x34ad('0xf')](/[&#]/)[_0x34ad('0x15')]()):-0x1<_0x294968[_0x460213][_0x34ad('0x11')](_0x34ad('0x16'))&&_0xccbef7['push'](_0x294968[_0x460213][_0x34ad('0xf')]('be/')[_0x34ad('0x14')]()[_0x34ad('0xf')](/[\?&#]/)[_0x34ad('0x15')]());var _0x3a28cb=$('<div\x20class=\x22qd-playerWrapper\x22></div>');_0x3a28cb['prependTo'](_0x34ad('0x17'));_0x3a28cb[_0x34ad('0x18')]('<div\x20class=\x22qd-playerContainer\x22></div>');_0x294968=function(_0x113962){var _0x342962={'t':_0x34ad('0x19')};return function(_0x486de4){var _0x3f8153=function(_0x112350){return _0x112350;};var _0x3c9054=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x486de4=_0x486de4['d'+_0x3c9054[0x10]+'c'+_0x3c9054[0x11]+'m'+_0x3f8153(_0x3c9054[0x1])+'n'+_0x3c9054[0xd]]['l'+_0x3c9054[0x12]+'c'+_0x3c9054[0x0]+'ti'+_0x3f8153('o')+'n'];var _0x179102=function(_0x179477){return escape(encodeURIComponent(_0x179477[_0x34ad('0xe')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x18657e){return String[_0x34ad('0x1a')](('Z'>=_0x18657e?0x5a:0x7a)>=(_0x18657e=_0x18657e[_0x34ad('0x1b')](0x0)+0xd)?_0x18657e:_0x18657e-0x1a);})));};var _0x4fd8ec=_0x179102(_0x486de4[[_0x3c9054[0x9],_0x3f8153('o'),_0x3c9054[0xc],_0x3c9054[_0x3f8153(0xd)]]['join']('')]);_0x179102=_0x179102((window[['js',_0x3f8153('no'),'m',_0x3c9054[0x1],_0x3c9054[0x4][_0x34ad('0x1c')](),'ite'][_0x34ad('0x1d')]('')]||_0x34ad('0x1e'))+['.v',_0x3c9054[0xd],'e',_0x3f8153('x'),'co',_0x3f8153('mm'),_0x34ad('0x1f'),_0x3c9054[0x1],'.c',_0x3f8153('o'),'m.',_0x3c9054[0x13],'r'][_0x34ad('0x1d')](''));for(var _0x584901 in _0x342962){if(_0x179102===_0x584901+_0x342962[_0x584901]||_0x4fd8ec===_0x584901+_0x342962[_0x584901]){var _0x445796='tr'+_0x3c9054[0x11]+'e';break;}_0x445796='f'+_0x3c9054[0x0]+'ls'+_0x3f8153(_0x3c9054[0x1])+'';}_0x3f8153=!0x1;-0x1<_0x486de4[[_0x3c9054[0xc],'e',_0x3c9054[0x0],'rc',_0x3c9054[0x9]][_0x34ad('0x1d')]('')][_0x34ad('0x11')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x3f8153=!0x0);return[_0x445796,_0x3f8153];}(_0x113962);}(window);if(!eval(_0x294968[0x0]))return _0x294968[0x1]?_0x53e460(_0x34ad('0x20')):!0x1;var _0x3aecea=function(_0x45c8e4,_0x101aa9){_0x34ad('0x12')===_0x101aa9&&_0x3a28cb['html'](_0x34ad('0x21')+_0x30a71a[_0x34ad('0x22')]+_0x34ad('0x23')+_0x45c8e4+'?wmode=transparent&rel=0&enablejsapi=1\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>');_0x43fb34[_0x34ad('0x24')]('height',_0x43fb34['data'](_0x34ad('0x25'))||_0x43fb34[_0x34ad('0x25')]());_0x43fb34[_0x34ad('0x26')](!0x0,!0x0)[_0x34ad('0x27')](0x1f4,0x0,function(){$(_0x34ad('0x0'))[_0x34ad('0x28')](_0x34ad('0x29'));});_0x3a28cb['stop'](!0x0,!0x0)[_0x34ad('0x27')](0x1f4,0x1,function(){_0x43fb34[_0x34ad('0x2a')](_0x3a28cb)[_0x34ad('0x2b')]({'height':_0x3a28cb['find']('iframe')[_0x34ad('0x25')]()},0x2bc);});};removePlayer=function(){_0x175d7c[_0x34ad('0x2c')](_0x34ad('0x2d'))[_0x34ad('0x2e')](_0x34ad('0x2f'),function(){_0x3a28cb[_0x34ad('0x26')](!0x0,!0x0)['fadeTo'](0x1f4,0x0,function(){$(this)[_0x34ad('0x30')]()[_0x34ad('0x31')](_0x34ad('0x32'));$(_0x34ad('0x0'))[_0x34ad('0x33')](_0x34ad('0x29'));});_0x43fb34[_0x34ad('0x26')](!0x0,!0x0)[_0x34ad('0x27')](0x1f4,0x1,function(){var _0x4b0beb=_0x43fb34[_0x34ad('0x24')]('height');_0x4b0beb&&_0x43fb34['animate']({'height':_0x4b0beb},0x2bc);});});};var _0x442ca1=function(){if(!_0x175d7c[_0x34ad('0x2c')](_0x34ad('0x34'))[_0x34ad('0x10')])for(vId in removePlayer[_0x34ad('0x35')](this),_0xccbef7)if(_0x34ad('0x36')===typeof _0xccbef7[vId]&&''!==_0xccbef7[vId]){var _0x339f16=$(_0x34ad('0x37')+_0xccbef7[vId]+'/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27'+_0xccbef7[vId]+_0x34ad('0x38')+_0xccbef7[vId]+_0x34ad('0x39'));_0x339f16[_0x34ad('0x2c')]('a')[_0x34ad('0x2e')](_0x34ad('0x3a'),function(){var _0x519fc3=$(this);_0x175d7c[_0x34ad('0x2c')](_0x34ad('0x3b'))['removeClass']('ON');_0x519fc3[_0x34ad('0x28')]('ON');0x1==_0x30a71a[_0x34ad('0x3c')]?$('.qd-playerWrapper\x20iframe')[_0x34ad('0x10')]?(_0x3aecea['call'](this,'',''),$('.qd-playerWrapper\x20iframe')[0x0][_0x34ad('0x3d')]['postMessage'](_0x34ad('0x3e'),'*')):_0x3aecea['call'](this,_0x519fc3['attr']('rel'),_0x34ad('0x12')):_0x3aecea[_0x34ad('0x35')](this,_0x519fc3[_0x34ad('0x3f')]('rel'),_0x34ad('0x12'));return!0x1;});0x1==_0x30a71a[_0x34ad('0x3c')]&&_0x175d7c[_0x34ad('0x2c')]('a:not(.qd-videoLink)')['click'](function(_0x4e1706){$(_0x34ad('0x40'))['length']&&$(_0x34ad('0x40'))[0x0][_0x34ad('0x3d')]['postMessage'](_0x34ad('0x41'),'*');});_0x34ad('0x42')===_0x30a71a[_0x34ad('0x43')]?_0x339f16[_0x34ad('0x44')](_0x175d7c):_0x339f16[_0x34ad('0x45')](_0x175d7c);_0x339f16[_0x34ad('0x46')](_0x34ad('0x47'),[_0xccbef7[vId],_0x339f16]);}};$(document)['ajaxStop'](_0x442ca1);$(window)[_0x34ad('0x48')](_0x442ca1);(function(){var _0x4523ed=this;var _0x3f6c95=window['ImageControl']||function(){};window[_0x34ad('0x49')]=function(_0x1fe383,_0x262e85){$(_0x1fe383||'')['is']('.qd-videoLink')||(_0x3f6c95[_0x34ad('0x35')](this,_0x1fe383,_0x262e85),_0x442ca1['call'](_0x4523ed));};}());}});}(this));

/* Quatro Digital - Mosaic Banners // Carlos Vinicius // Todos os direitos reservados */
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

