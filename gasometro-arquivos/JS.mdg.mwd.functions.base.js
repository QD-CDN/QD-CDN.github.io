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
var _0xbf4f=['.qd_productPrice','Por\x20alguma\x20razão\x20não\x20consegui\x20obter\x20o\x20preço\x20deste\x20produto\x20:(','appliedDiscount','listPrice','.qd_productOldPrice','.qd_displayPrice','skuPrice','.qd-sp-display-discount','html','installments','changeInstallments','installmentValue','.qd_sp_display_installmentValue','.qd_sp_installments','.qd_saveAmount','.qd_saveAmountPercent','changeNativeSaveAmount','em.economia-de','each','skuSelected.vtex','qd_sp_processedItem','startedByWrapper','forcePromotion','not','.qd_sp_processedItem','.qd_productPrice:not(.qd_sp_processedItem)','display:none\x20!important;','append','after','call','extend','boolean','body','.produto','function','prototype','trim','replace','abs','undefined','round','toFixed','length','join','QD_SmartPrice','object','info','warn','alerta','toLowerCase','aviso','apply','error','text','search','match','.flag','strong.skuBestPrice','label.skuBestInstallmentNumber','label.skuBestInstallmentValue','strong.skuPrice','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','---','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','productPage','isProductPage','closest','wrapperElement','filterFlagBy','find','skuBestPrice','addClass','qd-active','qd-sp-active','.qd_sp_on,\x20.qd_sp_ignored','.qd_active','removeClass','oneFlagByItem','siblings','.qd_sp_on','qd_sp_ignored','qd_sp_on','isDiscountFlag','div[skuCorrente]:first','attr','skuCorrente','skus','available','bestPrice','isSmartCheckout','qd-sp-product-unavailable','getDiscountValue','O\x20valor\x20informado\x20p/\x20o\x20desconto\x20não\x20é\x20um\x20número.'];(function(_0x4a30bb,_0x455c5e){var _0x1708f8=function(_0x1df1ca){while(--_0x1df1ca){_0x4a30bb['push'](_0x4a30bb['shift']());}};_0x1708f8(++_0x455c5e);}(_0xbf4f,0xe6));var _0xfbf4=function(_0x5341ff,_0x1de6df){_0x5341ff=_0x5341ff-0x0;var _0x53be58=_0xbf4f[_0x5341ff];return _0x53be58;};_0xfbf4('0x0')!==typeof String[_0xfbf4('0x1')][_0xfbf4('0x2')]&&(String[_0xfbf4('0x1')]['trim']=function(){return this[_0xfbf4('0x3')](/^\s+|\s+$/g,'');});function qd_number_format(_0x437bd2,_0x2565ad,_0x599221,_0x560aa3){_0x437bd2=(_0x437bd2+'')[_0xfbf4('0x3')](/[^0-9+\-Ee.]/g,'');_0x437bd2=isFinite(+_0x437bd2)?+_0x437bd2:0x0;_0x2565ad=isFinite(+_0x2565ad)?Math[_0xfbf4('0x4')](_0x2565ad):0x0;_0x560aa3=_0xfbf4('0x5')===typeof _0x560aa3?',':_0x560aa3;_0x599221=_0xfbf4('0x5')===typeof _0x599221?'.':_0x599221;var _0x3f04c5='',_0x3f04c5=function(_0x49056f,_0x55d6ae){var _0x2565ad=Math['pow'](0xa,_0x55d6ae);return''+(Math[_0xfbf4('0x6')](_0x49056f*_0x2565ad)/_0x2565ad)[_0xfbf4('0x7')](_0x55d6ae);},_0x3f04c5=(_0x2565ad?_0x3f04c5(_0x437bd2,_0x2565ad):''+Math['round'](_0x437bd2))['split']('.');0x3<_0x3f04c5[0x0]['length']&&(_0x3f04c5[0x0]=_0x3f04c5[0x0][_0xfbf4('0x3')](/\B(?=(?:\d{3})+(?!\d))/g,_0x560aa3));(_0x3f04c5[0x1]||'')['length']<_0x2565ad&&(_0x3f04c5[0x1]=_0x3f04c5[0x1]||'',_0x3f04c5[0x1]+=Array(_0x2565ad-_0x3f04c5[0x1][_0xfbf4('0x8')]+0x1)[_0xfbf4('0x9')]('0'));return _0x3f04c5[_0xfbf4('0x9')](_0x599221);};(function(_0x493688){'use strict';var _0x4812f5=jQuery;if(typeof _0x4812f5['fn'][_0xfbf4('0xa')]==='function')return;var _0x3a70bd='Smart\x20Price';var _0x87b3c0=function(_0x2f31f2,_0x3a607a){if(_0xfbf4('0xb')===typeof console&&_0xfbf4('0x0')===typeof console['error']&&_0xfbf4('0x0')===typeof console[_0xfbf4('0xc')]&&'function'===typeof console[_0xfbf4('0xd')]){var _0x538ae1;'object'===typeof _0x2f31f2?(_0x2f31f2['unshift']('['+_0x3a70bd+']\x0a'),_0x538ae1=_0x2f31f2):_0x538ae1=['['+_0x3a70bd+']\x0a'+_0x2f31f2];if(_0xfbf4('0x5')===typeof _0x3a607a||_0xfbf4('0xe')!==_0x3a607a[_0xfbf4('0xf')]()&&_0xfbf4('0x10')!==_0x3a607a[_0xfbf4('0xf')]())if(_0xfbf4('0x5')!==typeof _0x3a607a&&_0xfbf4('0xc')===_0x3a607a['toLowerCase']())try{console[_0xfbf4('0xc')][_0xfbf4('0x11')](console,_0x538ae1);}catch(_0x4c6ffa){console[_0xfbf4('0xc')](_0x538ae1[_0xfbf4('0x9')]('\x0a'));}else try{console['error'][_0xfbf4('0x11')](console,_0x538ae1);}catch(_0x30b4dd){console[_0xfbf4('0x12')](_0x538ae1['join']('\x0a'));}else try{console[_0xfbf4('0xd')][_0xfbf4('0x11')](console,_0x538ae1);}catch(_0x16eacf){console[_0xfbf4('0xd')](_0x538ae1['join']('\x0a'));}}};var _0x2d9186=/[0-9]+\%/i;var _0x309356=/[0-9\.]+(?=\%)/i;var _0x34c59c={'isDiscountFlag':function(_0x2ec0c6){if(_0x2ec0c6[_0xfbf4('0x13')]()[_0xfbf4('0x14')](_0x2d9186)>-0x1)return!![];return![];},'getDiscountValue':function(_0x111da7){return _0x111da7['text']()[_0xfbf4('0x15')](_0x309356);},'startedByWrapper':![],'flagElement':_0xfbf4('0x16'),'wrapperElement':'li','filterFlagBy':'[class*=\x27desconto\x27]','forcePromotion':null,'appliedDiscount':null,'oneFlagByItem':!![],'isSmartCheckout':!![],'changeInstallments':![],'productPage':{'changeNativeSaveAmount':!![],'changeNativePrice':!![],'changeInstallments':![],'isProductPage':'auto','wrapperElement':'.productRightColumn','skuBestPrice':_0xfbf4('0x17'),'installments':_0xfbf4('0x18'),'installmentValue':_0xfbf4('0x19'),'skuPrice':_0xfbf4('0x1a')}};_0x4812f5['fn'][_0xfbf4('0xa')]=function(){};var _0x24bde7=function(_0x4105b8){var _0x139ec5={'t':_0xfbf4('0x1b')};return function(_0x269392){var _0x568c46,_0x573d82,_0x392f38,_0x37afac;_0x573d82=function(_0x3434d3){return _0x3434d3;};_0x392f38=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x269392=_0x269392['d'+_0x392f38[0x10]+'c'+_0x392f38[0x11]+'m'+_0x573d82(_0x392f38[0x1])+'n'+_0x392f38[0xd]]['l'+_0x392f38[0x12]+'c'+_0x392f38[0x0]+'ti'+_0x573d82('o')+'n'];_0x568c46=function(_0xd329f2){return escape(encodeURIComponent(_0xd329f2[_0xfbf4('0x3')](/\./g,'¨')[_0xfbf4('0x3')](/[a-zA-Z]/g,function(_0x32c8f4){return String[_0xfbf4('0x1c')](('Z'>=_0x32c8f4?0x5a:0x7a)>=(_0x32c8f4=_0x32c8f4[_0xfbf4('0x1d')](0x0)+0xd)?_0x32c8f4:_0x32c8f4-0x1a);})));};var _0x520395=_0x568c46(_0x269392[[_0x392f38[0x9],_0x573d82('o'),_0x392f38[0xc],_0x392f38[_0x573d82(0xd)]][_0xfbf4('0x9')]('')]);_0x568c46=_0x568c46((window[['js',_0x573d82('no'),'m',_0x392f38[0x1],_0x392f38[0x4][_0xfbf4('0x1e')](),'ite'][_0xfbf4('0x9')]('')]||_0xfbf4('0x1f'))+['.v',_0x392f38[0xd],'e',_0x573d82('x'),'co',_0x573d82('mm'),'erc',_0x392f38[0x1],'.c',_0x573d82('o'),'m.',_0x392f38[0x13],'r'][_0xfbf4('0x9')](''));for(var _0x47d8f7 in _0x139ec5){if(_0x568c46===_0x47d8f7+_0x139ec5[_0x47d8f7]||_0x520395===_0x47d8f7+_0x139ec5[_0x47d8f7]){_0x37afac='tr'+_0x392f38[0x11]+'e';break;}_0x37afac='f'+_0x392f38[0x0]+'ls'+_0x573d82(_0x392f38[0x1])+'';}_0x573d82=!0x1;-0x1<_0x269392[[_0x392f38[0xc],'e',_0x392f38[0x0],'rc',_0x392f38[0x9]][_0xfbf4('0x9')]('')][_0xfbf4('0x20')](_0xfbf4('0x21'))&&(_0x573d82=!0x0);return[_0x37afac,_0x573d82];}(_0x4105b8);}(window);if(!eval(_0x24bde7[0x0]))return _0x24bde7[0x1]?_0x87b3c0(_0xfbf4('0x22')):!0x1;var _0x1a2c13=function(_0x43ba77,_0x1bf385){'use strict';var _0x2a80fb=function(_0x26e189){'use strict';var _0x5d2a2f,_0x19e660,_0x377607,_0x1dbbca,_0x412e98,_0x5dc391,_0x190e4e,_0x228291,_0x8e5396,_0x449e21,_0x109b89,_0xbcf0bf,_0x27a783,_0xcdfeeb,_0x50e383,_0x453212,_0x1b167e,_0x2f3346,_0x592684;var _0x46e4a9=_0x4812f5(this);_0x26e189=typeof _0x26e189===_0xfbf4('0x5')?![]:_0x26e189;if(_0x1bf385[_0xfbf4('0x23')][_0xfbf4('0x24')])var _0x53a6f5=_0x46e4a9[_0xfbf4('0x25')](_0x1bf385[_0xfbf4('0x23')][_0xfbf4('0x26')]);else var _0x53a6f5=_0x46e4a9[_0xfbf4('0x25')](_0x1bf385[_0xfbf4('0x26')]);if(!_0x26e189&&!_0x46e4a9['is'](_0x1bf385[_0xfbf4('0x27')])){if(_0x1bf385[_0xfbf4('0x23')][_0xfbf4('0x24')]&&_0x53a6f5['is'](_0x1bf385['productPage']['wrapperElement'])){_0x53a6f5[_0xfbf4('0x28')](_0x1bf385['productPage'][_0xfbf4('0x29')])[_0xfbf4('0x2a')](_0xfbf4('0x2b'));_0x53a6f5['addClass'](_0xfbf4('0x2c'));}return;}var _0x188d47=_0x1bf385['productPage'][_0xfbf4('0x24')];if(_0x46e4a9['is'](_0xfbf4('0x2d'))&&!_0x188d47)return;if(_0x188d47){_0x228291=_0x53a6f5['find'](_0x1bf385['productPage'][_0xfbf4('0x29')]);if(_0x228291['find'](_0xfbf4('0x2e'))[_0xfbf4('0x8')])return;_0x228291[_0xfbf4('0x2f')](_0xfbf4('0x2b'));_0x53a6f5[_0xfbf4('0x2f')]('qd-sp-active');}if(_0x1bf385[_0xfbf4('0x30')]&&_0x46e4a9[_0xfbf4('0x31')](_0xfbf4('0x32'))['length']){_0x46e4a9[_0xfbf4('0x2a')](_0xfbf4('0x33'));return;}_0x46e4a9[_0xfbf4('0x2a')](_0xfbf4('0x34'));if(!_0x1bf385[_0xfbf4('0x35')](_0x46e4a9))return;if(_0x188d47){_0x377607={};var _0x2d9a3b=parseInt(_0x4812f5(_0xfbf4('0x36'))[_0xfbf4('0x37')](_0xfbf4('0x38')),0xa);if(_0x2d9a3b){for(var _0x388c2d=0x0;_0x388c2d<skuJson['skus'][_0xfbf4('0x8')];_0x388c2d++){if(skuJson[_0xfbf4('0x39')][_0x388c2d]['sku']==_0x2d9a3b){_0x377607=skuJson[_0xfbf4('0x39')][_0x388c2d];break;}}}else{var _0x5cbebd=0x5af3107a3fff;for(var _0x370407 in skuJson['skus']){if(typeof skuJson[_0xfbf4('0x39')][_0x370407]===_0xfbf4('0x0'))continue;if(!skuJson[_0xfbf4('0x39')][_0x370407][_0xfbf4('0x3a')])continue;if(skuJson[_0xfbf4('0x39')][_0x370407]['bestPrice']<_0x5cbebd){_0x5cbebd=skuJson['skus'][_0x370407][_0xfbf4('0x3b')];_0x377607=skuJson[_0xfbf4('0x39')][_0x370407];}}}}_0x453212=!![];_0x1b167e=0x0;if(_0x1bf385[_0xfbf4('0x3c')]&&_0x2f3346){_0x453212=skuJson['available'];if(!_0x453212)return _0x53a6f5[_0xfbf4('0x2a')](_0xfbf4('0x3d'));}_0x19e660=_0x1bf385[_0xfbf4('0x3e')](_0x46e4a9);_0x5d2a2f=parseFloat(_0x19e660,0xa);if(isNaN(_0x5d2a2f))return _0x87b3c0([_0xfbf4('0x3f'),_0x46e4a9],_0xfbf4('0xe'));var _0x8abaf9=function(_0x1798cb){if(_0x188d47)_0x1dbbca=(_0x1798cb[_0xfbf4('0x3b')]||0x0)/0x64;else{_0x27a783=_0x53a6f5['find'](_0xfbf4('0x40'));_0x1dbbca=parseFloat((_0x27a783['val']()||'')['replace'](/[^0-9\.\,]+/i,'')[_0xfbf4('0x3')]('.','')['replace'](',','.'),0xa);}if(isNaN(_0x1dbbca))return _0x87b3c0([_0xfbf4('0x41'),_0x46e4a9,_0x53a6f5]);if(_0x1bf385['appliedDiscount']!==null){_0xcdfeeb=0x0;if(!isNaN(_0x1bf385[_0xfbf4('0x42')]))_0xcdfeeb=_0x1bf385[_0xfbf4('0x42')];else{_0x50e383=_0x53a6f5[_0xfbf4('0x28')](_0x1bf385[_0xfbf4('0x42')]);if(_0x50e383[_0xfbf4('0x8')])_0xcdfeeb=_0x1bf385['getDiscountValue'](_0x50e383);}_0xcdfeeb=parseFloat(_0xcdfeeb,0xa);if(isNaN(_0xcdfeeb))_0xcdfeeb=0x0;if(_0xcdfeeb!==0x0)_0x1dbbca=_0x1dbbca*0x64/(0x64-_0xcdfeeb);}if(_0x188d47)_0x412e98=(_0x1798cb[_0xfbf4('0x43')]||0x0)/0x64;else _0x412e98=parseFloat((_0x53a6f5[_0xfbf4('0x28')](_0xfbf4('0x44'))['val']()||'')[_0xfbf4('0x3')](/[^0-9\.\,]+/i,'')[_0xfbf4('0x3')]('.','')[_0xfbf4('0x3')](',','.'),0xa);if(isNaN(_0x412e98))_0x412e98=0.001;_0x5dc391=_0x1dbbca*((0x64-_0x5d2a2f)/0x64);if(_0x188d47&&_0x1bf385[_0xfbf4('0x23')]['changeNativePrice']){_0x228291['text'](_0x228291[_0xfbf4('0x13')]()[_0xfbf4('0x2')]()[_0xfbf4('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x5dc391,0x2,',','.')))['addClass'](_0xfbf4('0x2b'));_0x53a6f5[_0xfbf4('0x2a')](_0xfbf4('0x2c'));}else{_0x592684=_0x53a6f5['find'](_0xfbf4('0x45'));_0x592684[_0xfbf4('0x13')](_0x592684[_0xfbf4('0x13')]()[_0xfbf4('0x3')](/[0-9\.]+,[0-9]+/i,'')+qd_number_format(_0x5dc391,0x2,',','.'));}if(_0x188d47){_0x190e4e=_0x53a6f5[_0xfbf4('0x28')](_0x1bf385[_0xfbf4('0x23')][_0xfbf4('0x46')]);if(_0x190e4e[_0xfbf4('0x8')])_0x190e4e[_0xfbf4('0x13')](_0x190e4e[_0xfbf4('0x13')]()[_0xfbf4('0x2')]()[_0xfbf4('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x5dc391,0x2,',','.')));}var _0x1804c6=_0x53a6f5[_0xfbf4('0x28')](_0xfbf4('0x47'));_0x1804c6[_0xfbf4('0x13')](_0x1804c6[_0xfbf4('0x13')]()[_0xfbf4('0x3')](/[0-9]+\%/i,_0x5d2a2f+'%'));var _0x508b61=function(_0x4a6173,_0x1d3396,_0x104fa6){var _0x47c5c7=_0x53a6f5[_0xfbf4('0x28')](_0x4a6173);if(_0x47c5c7[_0xfbf4('0x8')])_0x47c5c7['html'](_0x47c5c7[_0xfbf4('0x48')]()[_0xfbf4('0x2')]()[_0xfbf4('0x3')](/[0-9]{1,2}/,_0x104fa6?_0x104fa6:_0x1798cb[_0xfbf4('0x49')]||0x0));var _0x3b6857=_0x53a6f5[_0xfbf4('0x28')](_0x1d3396);if(_0x3b6857[_0xfbf4('0x8')])_0x3b6857[_0xfbf4('0x48')](_0x3b6857['html']()[_0xfbf4('0x2')]()['replace'](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x5dc391/(_0x104fa6?_0x104fa6:_0x1798cb[_0xfbf4('0x49')]||0x1),0x2,',','.')));};if(_0x188d47&&_0x1bf385['productPage'][_0xfbf4('0x4a')])_0x508b61(_0x1bf385[_0xfbf4('0x23')][_0xfbf4('0x49')],_0x1bf385[_0xfbf4('0x23')][_0xfbf4('0x4b')]);else if(_0x1bf385[_0xfbf4('0x4a')])_0x508b61('.qd_sp_display_installments',_0xfbf4('0x4c'),parseInt(_0x53a6f5['find'](_0xfbf4('0x4d'))['val']()||0x1)||0x1);_0x53a6f5[_0xfbf4('0x28')](_0xfbf4('0x4e'))['append'](qd_number_format(_0x412e98-_0x5dc391,0x2,',','.'));_0x53a6f5[_0xfbf4('0x28')](_0xfbf4('0x4f'))['prepend'](qd_number_format((_0x412e98-_0x5dc391)*0x64/_0x412e98,0x2,',','.'));if(_0x188d47&&_0x1bf385[_0xfbf4('0x23')][_0xfbf4('0x50')]){_0x4812f5(_0xfbf4('0x51'))[_0xfbf4('0x52')](function(){_0x109b89=_0x4812f5(this);_0x109b89['text'](_0x109b89[_0xfbf4('0x13')]()['trim']()[_0xfbf4('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x412e98-_0x5dc391,0x2,',','.')));_0x109b89['addClass']('qd-active');});}};_0x8abaf9(_0x377607);if(_0x188d47)_0x4812f5(window)['on'](_0xfbf4('0x53'),function(_0x382932,_0x2e3e30,_0x129d3c){_0x8abaf9(_0x129d3c);});_0x53a6f5[_0xfbf4('0x2a')]('qd_sp_processedItem');if(!_0x188d47)_0x27a783[_0xfbf4('0x2a')](_0xfbf4('0x54'));};(_0x1bf385[_0xfbf4('0x55')]?_0x43ba77[_0xfbf4('0x28')](_0x1bf385['flagElement']):_0x43ba77)['each'](function(){_0x2a80fb['call'](this,![]);});if(typeof _0x1bf385[_0xfbf4('0x56')]=='string'){var _0x5418d1=_0x1bf385[_0xfbf4('0x55')]?_0x43ba77:_0x43ba77[_0xfbf4('0x25')](_0x1bf385['wrapperElement']);if(_0x1bf385[_0xfbf4('0x23')][_0xfbf4('0x24')])_0x5418d1=_0x5418d1['closest'](_0x1bf385[_0xfbf4('0x23')][_0xfbf4('0x26')])[_0xfbf4('0x57')](_0xfbf4('0x58'));else _0x5418d1=_0x5418d1[_0xfbf4('0x28')](_0xfbf4('0x59'));_0x5418d1[_0xfbf4('0x52')](function(){var _0x2772de=_0x4812f5(_0x1bf385[_0xfbf4('0x56')]);_0x2772de[_0xfbf4('0x37')]('style',_0xfbf4('0x5a'));if(_0x1bf385[_0xfbf4('0x23')][_0xfbf4('0x24')])_0x4812f5(this)[_0xfbf4('0x5b')](_0x2772de);else _0x4812f5(this)[_0xfbf4('0x5c')](_0x2772de);_0x2a80fb[_0xfbf4('0x5d')](_0x2772de,!![]);});}};_0x4812f5['fn'][_0xfbf4('0xa')]=function(_0x16ff1d){var _0x36dfb6=_0x4812f5(this);if(!_0x36dfb6[_0xfbf4('0x8')])return _0x36dfb6;var _0x3794c2=_0x4812f5[_0xfbf4('0x5e')](!![],{},_0x34c59c,_0x16ff1d);if(typeof _0x3794c2[_0xfbf4('0x23')]['isProductPage']!=_0xfbf4('0x5f'))_0x3794c2['productPage']['isProductPage']=_0x4812f5(document[_0xfbf4('0x60')])['is'](_0xfbf4('0x61'));_0x1a2c13(_0x36dfb6,_0x3794c2);return _0x36dfb6;};}(this));
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
var _0x58bb=['extend','exec','.qd_amazing_menu_auto','getParent','closest','function','QD_amazingMenu','/qd-amazing-menu','object','undefined','info','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','toLowerCase','aviso','apply','join','error','qdAmAddNdx','each','addClass','first','qd-am-first','last','qd-am-last','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','toUpperCase','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','filter','.qd-am-collection','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','img[alt=\x27','data-qdam-value','.box-banner','clone','insertBefore','hide','qd-am-content-loaded','text','trim','[class*=\x27colunas\x27]','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','alerta','li\x20>ul','qd-am-has-ul','children',':not(ul)','qd-am-elem-','replaceSpecialChars','>li','qd-amazing-menu','qd-am-column','qd-am-dropdown','qd-am-level-','qd-am-','-li','callback'];(function(_0x54faaf,_0x2bd9e6){var _0x112cfd=function(_0x5bcf84){while(--_0x5bcf84){_0x54faaf['push'](_0x54faaf['shift']());}};_0x112cfd(++_0x2bd9e6);}(_0x58bb,0x9b));var _0xb58b=function(_0x4949e4,_0x4f4400){_0x4949e4=_0x4949e4-0x0;var _0x306e16=_0x58bb[_0x4949e4];return _0x306e16;};(function(_0x2d04bd){_0x2d04bd['fn'][_0xb58b('0x0')]=_0x2d04bd['fn'][_0xb58b('0x1')];}(jQuery));(function(_0x5be8b6){var _0x3e8d36;var _0x4a2d4c=jQuery;if(_0xb58b('0x2')!==typeof _0x4a2d4c['fn'][_0xb58b('0x3')]){var _0x647fe7={'url':_0xb58b('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0x65a248=function(_0x517371,_0x4dc3b7){if(_0xb58b('0x5')===typeof console&&_0xb58b('0x6')!==typeof console['error']&&_0xb58b('0x6')!==typeof console[_0xb58b('0x7')]&&_0xb58b('0x6')!==typeof console[_0xb58b('0x8')]){var _0x374380;'object'===typeof _0x517371?(_0x517371[_0xb58b('0x9')](_0xb58b('0xa')),_0x374380=_0x517371):_0x374380=[_0xb58b('0xa')+_0x517371];if(_0xb58b('0x6')===typeof _0x4dc3b7||'alerta'!==_0x4dc3b7[_0xb58b('0xb')]()&&_0xb58b('0xc')!==_0x4dc3b7[_0xb58b('0xb')]())if('undefined'!==typeof _0x4dc3b7&&'info'===_0x4dc3b7['toLowerCase']())try{console[_0xb58b('0x7')][_0xb58b('0xd')](console,_0x374380);}catch(_0x434b18){try{console[_0xb58b('0x7')](_0x374380[_0xb58b('0xe')]('\x0a'));}catch(_0x2897b9){}}else try{console[_0xb58b('0xf')][_0xb58b('0xd')](console,_0x374380);}catch(_0x49e407){try{console[_0xb58b('0xf')](_0x374380[_0xb58b('0xe')]('\x0a'));}catch(_0x4f7921){}}else try{console[_0xb58b('0x8')][_0xb58b('0xd')](console,_0x374380);}catch(_0x3ee513){try{console['warn'](_0x374380[_0xb58b('0xe')]('\x0a'));}catch(_0x1c829b){}}}};_0x4a2d4c['fn'][_0xb58b('0x10')]=function(){var _0x27b309=_0x4a2d4c(this);_0x27b309[_0xb58b('0x11')](function(_0x480722){_0x4a2d4c(this)[_0xb58b('0x12')]('qd-am-li-'+_0x480722);});_0x27b309[_0xb58b('0x13')]()[_0xb58b('0x12')](_0xb58b('0x14'));_0x27b309[_0xb58b('0x15')]()[_0xb58b('0x12')](_0xb58b('0x16'));return _0x27b309;};_0x4a2d4c['fn'][_0xb58b('0x3')]=function(){};_0x5be8b6=function(_0x2e4943){var _0x59b99f={'t':_0xb58b('0x17')};return function(_0x4dce83){var _0x38a4c2=function(_0x19f036){return _0x19f036;};var _0x34ba9e=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4dce83=_0x4dce83['d'+_0x34ba9e[0x10]+'c'+_0x34ba9e[0x11]+'m'+_0x38a4c2(_0x34ba9e[0x1])+'n'+_0x34ba9e[0xd]]['l'+_0x34ba9e[0x12]+'c'+_0x34ba9e[0x0]+'ti'+_0x38a4c2('o')+'n'];var _0x1203d7=function(_0x384728){return escape(encodeURIComponent(_0x384728[_0xb58b('0x18')](/\./g,'¨')[_0xb58b('0x18')](/[a-zA-Z]/g,function(_0x177e76){return String[_0xb58b('0x19')](('Z'>=_0x177e76?0x5a:0x7a)>=(_0x177e76=_0x177e76['charCodeAt'](0x0)+0xd)?_0x177e76:_0x177e76-0x1a);})));};var _0x26dabb=_0x1203d7(_0x4dce83[[_0x34ba9e[0x9],_0x38a4c2('o'),_0x34ba9e[0xc],_0x34ba9e[_0x38a4c2(0xd)]][_0xb58b('0xe')]('')]);_0x1203d7=_0x1203d7((window[['js',_0x38a4c2('no'),'m',_0x34ba9e[0x1],_0x34ba9e[0x4][_0xb58b('0x1a')](),_0xb58b('0x1b')][_0xb58b('0xe')]('')]||_0xb58b('0x1c'))+['.v',_0x34ba9e[0xd],'e',_0x38a4c2('x'),'co',_0x38a4c2('mm'),_0xb58b('0x1d'),_0x34ba9e[0x1],'.c',_0x38a4c2('o'),'m.',_0x34ba9e[0x13],'r'][_0xb58b('0xe')](''));for(var _0x29e70d in _0x59b99f){if(_0x1203d7===_0x29e70d+_0x59b99f[_0x29e70d]||_0x26dabb===_0x29e70d+_0x59b99f[_0x29e70d]){var _0x45da5b='tr'+_0x34ba9e[0x11]+'e';break;}_0x45da5b='f'+_0x34ba9e[0x0]+'ls'+_0x38a4c2(_0x34ba9e[0x1])+'';}_0x38a4c2=!0x1;-0x1<_0x4dce83[[_0x34ba9e[0xc],'e',_0x34ba9e[0x0],'rc',_0x34ba9e[0x9]]['join']('')]['indexOf'](_0xb58b('0x1e'))&&(_0x38a4c2=!0x0);return[_0x45da5b,_0x38a4c2];}(_0x2e4943);}(window);if(!eval(_0x5be8b6[0x0]))return _0x5be8b6[0x1]?_0x65a248(_0xb58b('0x1f')):!0x1;var _0x41085e=function(_0x24031b){var _0xa95177=_0x24031b[_0xb58b('0x20')]('.qd_am_code');var _0x2ee318=_0xa95177['filter']('.qd-am-banner');var _0x2bd6f0=_0xa95177[_0xb58b('0x21')](_0xb58b('0x22'));if(_0x2ee318[_0xb58b('0x23')]||_0x2bd6f0[_0xb58b('0x23')])_0x2ee318[_0xb58b('0x24')]()[_0xb58b('0x12')](_0xb58b('0x25')),_0x2bd6f0['parent']()[_0xb58b('0x12')](_0xb58b('0x26')),_0x4a2d4c[_0xb58b('0x27')]({'url':_0x3e8d36['url'],'dataType':'html','success':function(_0x33fbed){var _0x3b02a0=_0x4a2d4c(_0x33fbed);_0x2ee318['each'](function(){var _0x33fbed=_0x4a2d4c(this);var _0x4e5f51=_0x3b02a0[_0xb58b('0x20')](_0xb58b('0x28')+_0x33fbed['attr'](_0xb58b('0x29'))+'\x27]');_0x4e5f51[_0xb58b('0x23')]&&(_0x4e5f51['each'](function(){_0x4a2d4c(this)[_0xb58b('0x0')](_0xb58b('0x2a'))[_0xb58b('0x2b')]()[_0xb58b('0x2c')](_0x33fbed);}),_0x33fbed[_0xb58b('0x2d')]());})[_0xb58b('0x12')](_0xb58b('0x2e'));_0x2bd6f0[_0xb58b('0x11')](function(){var _0x33fbed={};var _0x3f7626=_0x4a2d4c(this);_0x3b02a0[_0xb58b('0x20')]('h2')[_0xb58b('0x11')](function(){if(_0x4a2d4c(this)[_0xb58b('0x2f')]()['trim']()[_0xb58b('0xb')]()==_0x3f7626['attr'](_0xb58b('0x29'))[_0xb58b('0x30')]()[_0xb58b('0xb')]())return _0x33fbed=_0x4a2d4c(this),!0x1;});_0x33fbed[_0xb58b('0x23')]&&(_0x33fbed[_0xb58b('0x11')](function(){_0x4a2d4c(this)[_0xb58b('0x0')](_0xb58b('0x31'))[_0xb58b('0x2b')]()[_0xb58b('0x2c')](_0x3f7626);}),_0x3f7626['hide']());})['addClass'](_0xb58b('0x2e'));},'error':function(){_0x65a248(_0xb58b('0x32')+_0x3e8d36['url']+_0xb58b('0x33'));},'complete':function(){_0x3e8d36[_0xb58b('0x34')][_0xb58b('0x35')](this);_0x4a2d4c(window)[_0xb58b('0x36')](_0xb58b('0x37'),_0x24031b);},'clearQueueDelay':0xbb8});};_0x4a2d4c['QD_amazingMenu']=function(_0x30a0d4){var _0x43f5f9=_0x30a0d4[_0xb58b('0x20')](_0xb58b('0x38'))['each'](function(){var _0x4ccd03=_0x4a2d4c(this);if(!_0x4ccd03[_0xb58b('0x23')])return _0x65a248([_0xb58b('0x39'),_0x30a0d4],_0xb58b('0x3a'));_0x4ccd03[_0xb58b('0x20')](_0xb58b('0x3b'))[_0xb58b('0x24')]()[_0xb58b('0x12')](_0xb58b('0x3c'));_0x4ccd03[_0xb58b('0x20')]('li')[_0xb58b('0x11')](function(){var _0x43538e=_0x4a2d4c(this);var _0x25705=_0x43538e[_0xb58b('0x3d')](_0xb58b('0x3e'));_0x25705[_0xb58b('0x23')]&&_0x43538e[_0xb58b('0x12')](_0xb58b('0x3f')+_0x25705[_0xb58b('0x13')]()[_0xb58b('0x2f')]()[_0xb58b('0x30')]()[_0xb58b('0x40')]()['replace'](/\./g,'')[_0xb58b('0x18')](/\s/g,'-')[_0xb58b('0xb')]());});var _0x822160=_0x4ccd03[_0xb58b('0x20')](_0xb58b('0x41'))[_0xb58b('0x10')]();_0x4ccd03[_0xb58b('0x12')](_0xb58b('0x42'));_0x822160=_0x822160[_0xb58b('0x20')]('>ul');_0x822160[_0xb58b('0x11')](function(){var _0xbbd8cd=_0x4a2d4c(this);_0xbbd8cd[_0xb58b('0x20')](_0xb58b('0x41'))[_0xb58b('0x10')]()[_0xb58b('0x12')](_0xb58b('0x43'));_0xbbd8cd['addClass']('qd-am-dropdown-menu');_0xbbd8cd[_0xb58b('0x24')]()[_0xb58b('0x12')](_0xb58b('0x44'));});_0x822160[_0xb58b('0x12')](_0xb58b('0x44'));var _0x4d879a=0x0,_0x5be8b6=function(_0x442618){_0x4d879a+=0x1;_0x442618=_0x442618['children']('li')[_0xb58b('0x3d')]('*');_0x442618['length']&&(_0x442618[_0xb58b('0x12')](_0xb58b('0x45')+_0x4d879a),_0x5be8b6(_0x442618));};_0x5be8b6(_0x4ccd03);_0x4ccd03['add'](_0x4ccd03[_0xb58b('0x20')]('ul'))[_0xb58b('0x11')](function(){var _0xea4b43=_0x4a2d4c(this);_0xea4b43[_0xb58b('0x12')](_0xb58b('0x46')+_0xea4b43[_0xb58b('0x3d')]('li')[_0xb58b('0x23')]+_0xb58b('0x47'));});});_0x41085e(_0x43f5f9);_0x3e8d36[_0xb58b('0x48')][_0xb58b('0x35')](this);_0x4a2d4c(window)['trigger']('QuatroDigital.am.callback',_0x30a0d4);};_0x4a2d4c['fn'][_0xb58b('0x3')]=function(_0x3c3e57){var _0x4b00da=_0x4a2d4c(this);if(!_0x4b00da[_0xb58b('0x23')])return _0x4b00da;_0x3e8d36=_0x4a2d4c[_0xb58b('0x49')]({},_0x647fe7,_0x3c3e57);_0x4b00da[_0xb58b('0x4a')]=new _0x4a2d4c['QD_amazingMenu'](_0x4a2d4c(this));return _0x4b00da;};_0x4a2d4c(function(){_0x4a2d4c(_0xb58b('0x4b'))['QD_amazingMenu']();});}}(this));

/* Quatro Digital Smart Cart */
var _0x6f0d=['qd_on','.qd-ddc-quantityMore','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','.qd-ddc-prodRow','click.qd_ddc_remove','stop','remove','$1-$2$3','calculateShipping','BRA','qdDdcLastPostalCode','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','removeProduct','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','updateOnlyHover','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','buyButtonClicked','quickViewUpdate','allowRecalculate','productId','prod_','.qd-bap-wrapper','qd-bap-item-added','input.qd-productId[value=','prodId','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','ajaxStop','.qdDdcContainer','QD_smartCart','dropDown','smartCart','getParent','closest','replace','abs','undefined','pow','round','split','length','join','function','prototype','trim','capitalize','charAt','slice','toLowerCase','qdAjaxQueue','jquery','000','error','qdAjax','extend','GET','object','data','toString','url','type','jqXHR','ajax','success','always','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','message','version','4.0','simpleCart','checkout','getOrderForm','call','QuatroDigital_simpleCart','ajaxStopOn','alerta','warn','[Simple\x20Cart]\x0a','info','QD_simpleCart','elements','.qd_cart_qtt','.qd_cart_total','attr','content','each','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','Shipping','value','currencySymbol','shipping','allTotal','qtt','showQuantityByItems','items','quantity','callback','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','hide','.singular','show','.plural','addClass','removeClass','$this','html','total','cartQttE','find','cartQtt','cartTotalE','cartTotal','itemsTextE','itemsText','emptyCart','smartCheckout','_QuatroDigital_DropDown','vtexjs','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','shippingData','trigger','simpleCartCallback.quatro_digital','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','bind','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','QD_checkoutQueue','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','add','done','Callbacks','fail','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','.productInformationWrapper\x20\x20a.buy-button','input.buy-in-page-quantity','javascript:','body','.productQuickView','Produto\x20adicionado\x20ao\x20carrinho!','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','href','QD_buyButton','isSmartCheckout','qd-bb-click-active','clickBuySmartCheckout','preventDefault','Método\x20descontinuado!','.qd-sbb-on','.btn-add-buy-button-asynchronous','qd-bb-active','.qd-bb-productAdded','append','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','.buy-in-page-button','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','prodAdd','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','buyButton','filter','---','qd-bb-itemAddBuyButtonWrapper','qd-bb-itemAddCartWrapper','timeRemoveNewItemClass','getCartInfoByUrl','função\x20descontinuada','allowUpdate','autoWatchBuyButton','unbind','click','load','mouseenter.qd_bb_buy_sc','indexOf','selectSkuMsg','?redirect=false&','redirect=true','buyIfQuantityZeroed','test','push','productPageCallback','buyButtonClickCallback','ku=','shift','asyncCallback','productAddedToCart','parent','_QuatroDigital_prodBuyCallback','Callback\x20não\x20é\x20uma\x20função','.qd-bb-itemAddWrapper','prepend','QuatroDigital.qd_bb_prod_add','ajaxSend','/checkout/cart/add','match','pop','productAddedToCart.qdSbbVtex','Oooops!\x20','toFixed','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','QD_dropDownCart','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','toUpperCase','ite','erc','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','name','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','off','keyup.qd_ddc_closeFn','keyCode','qd-bb-lightBoxProdAdd','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-shipping\x20input','val','shippingCalculate','mouseenter.qd_ddc_hover','cartIsEmpty','mouseleave.qd_ddc_hover','texts','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','linkCart','.qd_ddc_continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','renderProductsList','dataOptionsCache','.qd-ddc-wrapper','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','qd-ddc-noItems','empty','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','qd-ddc-','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','.qd-ddc-quantity','.qd-ddc-remove','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','[data-sku=\x27','lastSku','outerHeight','qd-ddc-lastAdded','qd-ddc-lastAddedFixed','qd-ddc-cart-empty','qd-ddc-product-add-time','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','insertProdImg','qd-loaded','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)'];(function(_0x4775e5,_0x101c6a){var _0x575734=function(_0x5791d8){while(--_0x5791d8){_0x4775e5['push'](_0x4775e5['shift']());}};_0x575734(++_0x101c6a);}(_0x6f0d,0x16c));var _0xd6f0=function(_0x4fed02,_0x17cade){_0x4fed02=_0x4fed02-0x0;var _0x10e1bf=_0x6f0d[_0x4fed02];return _0x10e1bf;};(function(_0x3bce3a){_0x3bce3a['fn'][_0xd6f0('0x0')]=_0x3bce3a['fn'][_0xd6f0('0x1')];}(jQuery));function qd_number_format(_0xd1480,_0x107a8c,_0x573473,_0x275230){_0xd1480=(_0xd1480+'')[_0xd6f0('0x2')](/[^0-9+\-Ee.]/g,'');_0xd1480=isFinite(+_0xd1480)?+_0xd1480:0x0;_0x107a8c=isFinite(+_0x107a8c)?Math[_0xd6f0('0x3')](_0x107a8c):0x0;_0x275230=_0xd6f0('0x4')===typeof _0x275230?',':_0x275230;_0x573473=_0xd6f0('0x4')===typeof _0x573473?'.':_0x573473;var _0x4a8b0c='',_0x4a8b0c=function(_0xe21ac4,_0x1af29c){var _0x107a8c=Math[_0xd6f0('0x5')](0xa,_0x1af29c);return''+(Math['round'](_0xe21ac4*_0x107a8c)/_0x107a8c)['toFixed'](_0x1af29c);},_0x4a8b0c=(_0x107a8c?_0x4a8b0c(_0xd1480,_0x107a8c):''+Math[_0xd6f0('0x6')](_0xd1480))[_0xd6f0('0x7')]('.');0x3<_0x4a8b0c[0x0][_0xd6f0('0x8')]&&(_0x4a8b0c[0x0]=_0x4a8b0c[0x0][_0xd6f0('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x275230));(_0x4a8b0c[0x1]||'')[_0xd6f0('0x8')]<_0x107a8c&&(_0x4a8b0c[0x1]=_0x4a8b0c[0x1]||'',_0x4a8b0c[0x1]+=Array(_0x107a8c-_0x4a8b0c[0x1]['length']+0x1)[_0xd6f0('0x9')]('0'));return _0x4a8b0c[_0xd6f0('0x9')](_0x573473);};_0xd6f0('0xa')!==typeof String[_0xd6f0('0xb')]['trim']&&(String[_0xd6f0('0xb')][_0xd6f0('0xc')]=function(){return this[_0xd6f0('0x2')](/^\s+|\s+$/g,'');});_0xd6f0('0xa')!=typeof String[_0xd6f0('0xb')][_0xd6f0('0xd')]&&(String[_0xd6f0('0xb')][_0xd6f0('0xd')]=function(){return this[_0xd6f0('0xe')](0x0)['toUpperCase']()+this[_0xd6f0('0xf')](0x1)[_0xd6f0('0x10')]();});(function(_0x4c1559){if(_0xd6f0('0xa')!==typeof _0x4c1559['qdAjax']){var _0x3f4851={};_0x4c1559[_0xd6f0('0x11')]=_0x3f4851;0x96>parseInt((_0x4c1559['fn'][_0xd6f0('0x12')][_0xd6f0('0x2')](/[^0-9]+/g,'')+_0xd6f0('0x13'))[_0xd6f0('0xf')](0x0,0x3),0xa)&&console&&_0xd6f0('0xa')==typeof console[_0xd6f0('0x14')]&&console[_0xd6f0('0x14')]();_0x4c1559[_0xd6f0('0x15')]=function(_0x23ab6c){try{var _0x17e7c6=_0x4c1559[_0xd6f0('0x16')]({},{'url':'','type':_0xd6f0('0x17'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x23ab6c);var _0x1f43d7=_0xd6f0('0x18')===typeof _0x17e7c6['data']?JSON['stringify'](_0x17e7c6[_0xd6f0('0x19')]):_0x17e7c6[_0xd6f0('0x19')][_0xd6f0('0x1a')]();var _0x54300d=encodeURIComponent(_0x17e7c6[_0xd6f0('0x1b')]+'|'+_0x17e7c6[_0xd6f0('0x1c')]+'|'+_0x1f43d7);_0x3f4851[_0x54300d]=_0x3f4851[_0x54300d]||{};'undefined'==typeof _0x3f4851[_0x54300d][_0xd6f0('0x1d')]?_0x3f4851[_0x54300d]['jqXHR']=_0x4c1559[_0xd6f0('0x1e')](_0x17e7c6):(_0x3f4851[_0x54300d][_0xd6f0('0x1d')]['done'](_0x17e7c6[_0xd6f0('0x1f')]),_0x3f4851[_0x54300d][_0xd6f0('0x1d')]['fail'](_0x17e7c6[_0xd6f0('0x14')]),_0x3f4851[_0x54300d][_0xd6f0('0x1d')][_0xd6f0('0x20')](_0x17e7c6['complete']));_0x3f4851[_0x54300d][_0xd6f0('0x1d')][_0xd6f0('0x20')](function(){isNaN(parseInt(_0x17e7c6['clearQueueDelay']))||setTimeout(function(){_0x3f4851[_0x54300d][_0xd6f0('0x1d')]=void 0x0;},_0x17e7c6['clearQueueDelay']);});return _0x3f4851[_0x54300d][_0xd6f0('0x1d')];}catch(_0x3fb5c3){_0xd6f0('0x4')!==typeof console&&_0xd6f0('0xa')===typeof console[_0xd6f0('0x14')]&&console[_0xd6f0('0x14')](_0xd6f0('0x21')+_0x3fb5c3[_0xd6f0('0x22')]);}};_0x4c1559['qdAjax'][_0xd6f0('0x23')]=_0xd6f0('0x24');}}(jQuery));(function(_0x55656c){_0x55656c['fn'][_0xd6f0('0x0')]=_0x55656c['fn'][_0xd6f0('0x1')];}(jQuery));(function(){var _0x27db5e=jQuery;if(_0xd6f0('0xa')!==typeof _0x27db5e['fn'][_0xd6f0('0x25')]){_0x27db5e(function(){var _0x39e96a=vtexjs[_0xd6f0('0x26')][_0xd6f0('0x27')];vtexjs[_0xd6f0('0x26')][_0xd6f0('0x27')]=function(){return _0x39e96a[_0xd6f0('0x28')]();};});try{window[_0xd6f0('0x29')]=window[_0xd6f0('0x29')]||{};window[_0xd6f0('0x29')][_0xd6f0('0x2a')]=!0x1;_0x27db5e['fn'][_0xd6f0('0x25')]=function(_0x31c493,_0x376890,_0x1086d6){var _0x180e5f=function(_0x3906ca,_0x26ab29){if('object'===typeof console){var _0x11124c='object'===typeof _0x3906ca;'undefined'!==typeof _0x26ab29&&_0xd6f0('0x2b')===_0x26ab29[_0xd6f0('0x10')]()?_0x11124c?console[_0xd6f0('0x2c')](_0xd6f0('0x2d'),_0x3906ca[0x0],_0x3906ca[0x1],_0x3906ca[0x2],_0x3906ca[0x3],_0x3906ca[0x4],_0x3906ca[0x5],_0x3906ca[0x6],_0x3906ca[0x7]):console[_0xd6f0('0x2c')]('[Simple\x20Cart]\x0a'+_0x3906ca):_0xd6f0('0x4')!==typeof _0x26ab29&&'info'===_0x26ab29[_0xd6f0('0x10')]()?_0x11124c?console[_0xd6f0('0x2e')](_0xd6f0('0x2d'),_0x3906ca[0x0],_0x3906ca[0x1],_0x3906ca[0x2],_0x3906ca[0x3],_0x3906ca[0x4],_0x3906ca[0x5],_0x3906ca[0x6],_0x3906ca[0x7]):console[_0xd6f0('0x2e')](_0xd6f0('0x2d')+_0x3906ca):_0x11124c?console['error']('[Simple\x20Cart]\x0a',_0x3906ca[0x0],_0x3906ca[0x1],_0x3906ca[0x2],_0x3906ca[0x3],_0x3906ca[0x4],_0x3906ca[0x5],_0x3906ca[0x6],_0x3906ca[0x7]):console[_0xd6f0('0x14')](_0xd6f0('0x2d')+_0x3906ca);}};var _0x4a6c65=_0x27db5e(this);_0xd6f0('0x18')===typeof _0x31c493?_0x376890=_0x31c493:(_0x31c493=_0x31c493||!0x1,_0x4a6c65=_0x4a6c65['add'](_0x27db5e[_0xd6f0('0x2f')][_0xd6f0('0x30')]));if(!_0x4a6c65[_0xd6f0('0x8')])return _0x4a6c65;_0x27db5e[_0xd6f0('0x2f')][_0xd6f0('0x30')]=_0x27db5e[_0xd6f0('0x2f')][_0xd6f0('0x30')]['add'](_0x4a6c65);_0x1086d6='undefined'===typeof _0x1086d6?!0x1:_0x1086d6;var _0x162537={'cartQtt':_0xd6f0('0x31'),'cartTotal':_0xd6f0('0x32'),'itemsText':'.qd_items_text','currencySymbol':(_0x27db5e('meta[name=currency]')[_0xd6f0('0x33')](_0xd6f0('0x34'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x39fd07=_0x27db5e[_0xd6f0('0x16')]({},_0x162537,_0x376890);var _0x2e3225=_0x27db5e('');_0x4a6c65[_0xd6f0('0x35')](function(){var _0x2e9043=_0x27db5e(this);_0x2e9043[_0xd6f0('0x19')]('qd_simpleCartOpts')||_0x2e9043[_0xd6f0('0x19')](_0xd6f0('0x36'),_0x39fd07);});var _0x1e3c8a=function(_0x3964e6){window['_QuatroDigital_CartData']=window[_0xd6f0('0x37')]||{};for(var _0x31c493=0x0,_0x30d1ba=0x0,_0x1fd79b=0x0;_0x1fd79b<_0x3964e6[_0xd6f0('0x38')]['length'];_0x1fd79b++)_0xd6f0('0x39')==_0x3964e6[_0xd6f0('0x38')][_0x1fd79b]['id']&&(_0x30d1ba+=_0x3964e6[_0xd6f0('0x38')][_0x1fd79b]['value']),_0x31c493+=_0x3964e6[_0xd6f0('0x38')][_0x1fd79b][_0xd6f0('0x3a')];window['_QuatroDigital_CartData']['total']=_0x39fd07[_0xd6f0('0x3b')]+qd_number_format(_0x31c493/0x64,0x2,',','.');window[_0xd6f0('0x37')][_0xd6f0('0x3c')]=_0x39fd07['currencySymbol']+qd_number_format(_0x30d1ba/0x64,0x2,',','.');window[_0xd6f0('0x37')][_0xd6f0('0x3d')]=_0x39fd07['currencySymbol']+qd_number_format((_0x31c493+_0x30d1ba)/0x64,0x2,',','.');window[_0xd6f0('0x37')][_0xd6f0('0x3e')]=0x0;if(_0x39fd07[_0xd6f0('0x3f')])for(_0x1fd79b=0x0;_0x1fd79b<_0x3964e6[_0xd6f0('0x40')]['length'];_0x1fd79b++)window[_0xd6f0('0x37')][_0xd6f0('0x3e')]+=_0x3964e6[_0xd6f0('0x40')][_0x1fd79b][_0xd6f0('0x41')];else window[_0xd6f0('0x37')][_0xd6f0('0x3e')]=_0x3964e6[_0xd6f0('0x40')][_0xd6f0('0x8')]||0x0;try{window['_QuatroDigital_CartData'][_0xd6f0('0x42')]&&window[_0xd6f0('0x37')]['callback'][_0xd6f0('0x43')]&&window[_0xd6f0('0x37')][_0xd6f0('0x42')][_0xd6f0('0x43')]();}catch(_0x4f1e07){_0x180e5f(_0xd6f0('0x44'));}_0x232757(_0x2e3225);};var _0xe5fd11=function(_0x494542,_0x558622){0x1===_0x494542?_0x558622[_0xd6f0('0x45')]()['filter'](_0xd6f0('0x46'))[_0xd6f0('0x47')]():_0x558622[_0xd6f0('0x45')]()['filter'](_0xd6f0('0x48'))[_0xd6f0('0x47')]();};var _0x19dafc=function(_0x153ac7){0x1>_0x153ac7?_0x4a6c65[_0xd6f0('0x49')]('qd-emptyCart'):_0x4a6c65[_0xd6f0('0x4a')]('qd-emptyCart');};var _0x416a94=function(_0x212bd0,_0x2eb338){var _0x1dc320=parseInt(window['_QuatroDigital_CartData']['qtt'],0xa);_0x2eb338[_0xd6f0('0x4b')][_0xd6f0('0x47')]();isNaN(_0x1dc320)&&(_0x180e5f('O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.',_0xd6f0('0x2b')),_0x1dc320=0x0);_0x2eb338['cartTotalE'][_0xd6f0('0x4c')](window[_0xd6f0('0x37')][_0xd6f0('0x4d')]);_0x2eb338[_0xd6f0('0x4e')][_0xd6f0('0x4c')](_0x1dc320);_0xe5fd11(_0x1dc320,_0x2eb338['itemsTextE']);_0x19dafc(_0x1dc320);};var _0x232757=function(_0x335383){_0x4a6c65[_0xd6f0('0x35')](function(){var _0x25d0a9={};var _0x2a1058=_0x27db5e(this);_0x31c493&&_0x2a1058[_0xd6f0('0x19')](_0xd6f0('0x36'))&&_0x27db5e[_0xd6f0('0x16')](_0x39fd07,_0x2a1058['data'](_0xd6f0('0x36')));_0x25d0a9[_0xd6f0('0x4b')]=_0x2a1058;_0x25d0a9[_0xd6f0('0x4e')]=_0x2a1058[_0xd6f0('0x4f')](_0x39fd07[_0xd6f0('0x50')])||_0x2e3225;_0x25d0a9[_0xd6f0('0x51')]=_0x2a1058[_0xd6f0('0x4f')](_0x39fd07[_0xd6f0('0x52')])||_0x2e3225;_0x25d0a9[_0xd6f0('0x53')]=_0x2a1058['find'](_0x39fd07[_0xd6f0('0x54')])||_0x2e3225;_0x25d0a9['emptyElem']=_0x2a1058['find'](_0x39fd07[_0xd6f0('0x55')])||_0x2e3225;_0x416a94(_0x335383,_0x25d0a9);_0x2a1058['addClass']('qd-sc-populated');});};(function(){if(_0x39fd07[_0xd6f0('0x56')]){window[_0xd6f0('0x57')]=window[_0xd6f0('0x57')]||{};if('undefined'!==typeof window[_0xd6f0('0x57')][_0xd6f0('0x27')]&&(_0x1086d6||!_0x31c493))return _0x1e3c8a(window[_0xd6f0('0x57')]['getOrderForm']);if(_0xd6f0('0x18')!==typeof window[_0xd6f0('0x58')]||'undefined'===typeof window[_0xd6f0('0x58')][_0xd6f0('0x26')])if('object'===typeof vtex&&_0xd6f0('0x18')===typeof vtex[_0xd6f0('0x26')]&&_0xd6f0('0x4')!==typeof vtex[_0xd6f0('0x26')][_0xd6f0('0x59')])new vtex['checkout'][(_0xd6f0('0x59'))]();else return _0x180e5f(_0xd6f0('0x5a'));_0x27db5e['QD_checkoutQueue']([_0xd6f0('0x40'),_0xd6f0('0x38'),_0xd6f0('0x5b')],{'done':function(_0x5e74b4){_0x1e3c8a(_0x5e74b4);window[_0xd6f0('0x57')]['getOrderForm']=_0x5e74b4;},'fail':function(_0x4f24b7){_0x180e5f(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.',_0x4f24b7]);}});}else alert('Esta\x20é\x20uma\x20função\x20descontinuada\x20=/');}());_0x39fd07[_0xd6f0('0x42')]();_0x27db5e(window)[_0xd6f0('0x5c')](_0xd6f0('0x5d'));return _0x4a6c65;};_0x27db5e[_0xd6f0('0x2f')]={'elements':_0x27db5e('')};_0x27db5e(function(){var _0x530bcc;_0xd6f0('0xa')===typeof window['ajaxRequestbuyButtonAsynchronous']&&(_0x530bcc=window[_0xd6f0('0x5e')],window[_0xd6f0('0x5e')]=function(_0x2ba889,_0x50d93a,_0x32d73a,_0x31b055,_0x269dd7){_0x530bcc[_0xd6f0('0x28')](this,_0x2ba889,_0x50d93a,_0x32d73a,_0x31b055,function(){'function'===typeof _0x269dd7&&_0x269dd7();_0x27db5e[_0xd6f0('0x2f')][_0xd6f0('0x30')][_0xd6f0('0x35')](function(){var _0x47ccde=_0x27db5e(this);_0x47ccde[_0xd6f0('0x25')](_0x47ccde[_0xd6f0('0x19')](_0xd6f0('0x36')));});});});});var _0x23d8cb=window['ReloadItemsCart']||void 0x0;window[_0xd6f0('0x5f')]=function(_0x2082b5){_0x27db5e['fn'][_0xd6f0('0x25')](!0x0);_0xd6f0('0xa')===typeof _0x23d8cb?_0x23d8cb['call'](this,_0x2082b5):alert(_0x2082b5);};_0x27db5e(function(){var _0x535910=_0x27db5e('.qd_cart_auto');_0x535910['length']&&_0x535910[_0xd6f0('0x25')]();});_0x27db5e(function(){_0x27db5e(window)[_0xd6f0('0x60')](_0xd6f0('0x61'),function(){_0x27db5e['fn'][_0xd6f0('0x25')](!0x0);});});}catch(_0x318a64){_0xd6f0('0x4')!==typeof console&&_0xd6f0('0xa')===typeof console[_0xd6f0('0x14')]&&console[_0xd6f0('0x14')]('Oooops!\x20',_0x318a64);}}}());(function(){var _0x55f96e=function(_0x30349d,_0x3dbeb5){if(_0xd6f0('0x18')===typeof console){var _0x407d7=_0xd6f0('0x18')===typeof _0x30349d;'undefined'!==typeof _0x3dbeb5&&_0xd6f0('0x2b')===_0x3dbeb5[_0xd6f0('0x10')]()?_0x407d7?console[_0xd6f0('0x2c')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x30349d[0x0],_0x30349d[0x1],_0x30349d[0x2],_0x30349d[0x3],_0x30349d[0x4],_0x30349d[0x5],_0x30349d[0x6],_0x30349d[0x7]):console[_0xd6f0('0x2c')](_0xd6f0('0x62')+_0x30349d):'undefined'!==typeof _0x3dbeb5&&_0xd6f0('0x2e')===_0x3dbeb5[_0xd6f0('0x10')]()?_0x407d7?console[_0xd6f0('0x2e')](_0xd6f0('0x62'),_0x30349d[0x0],_0x30349d[0x1],_0x30349d[0x2],_0x30349d[0x3],_0x30349d[0x4],_0x30349d[0x5],_0x30349d[0x6],_0x30349d[0x7]):console[_0xd6f0('0x2e')](_0xd6f0('0x62')+_0x30349d):_0x407d7?console[_0xd6f0('0x14')](_0xd6f0('0x62'),_0x30349d[0x0],_0x30349d[0x1],_0x30349d[0x2],_0x30349d[0x3],_0x30349d[0x4],_0x30349d[0x5],_0x30349d[0x6],_0x30349d[0x7]):console[_0xd6f0('0x14')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a'+_0x30349d);}},_0x1b9728=null,_0x5af4f6={},_0x237bea={},_0x3a85bd={};$[_0xd6f0('0x63')]=function(_0x205b6a,_0x24aa32){if(null===_0x1b9728)if(_0xd6f0('0x18')===typeof window['vtexjs']&&_0xd6f0('0x4')!==typeof window[_0xd6f0('0x58')][_0xd6f0('0x26')])_0x1b9728=window[_0xd6f0('0x58')][_0xd6f0('0x26')];else return _0x55f96e(_0xd6f0('0x64'));var _0x907a6f=$[_0xd6f0('0x16')]({'done':function(){},'fail':function(){}},_0x24aa32),_0x183142=_0x205b6a['join'](';'),_0x92b8d0=function(){_0x5af4f6[_0x183142][_0xd6f0('0x65')](_0x907a6f[_0xd6f0('0x66')]);_0x237bea[_0x183142][_0xd6f0('0x65')](_0x907a6f['fail']);};_0x3a85bd[_0x183142]?_0x92b8d0():(_0x5af4f6[_0x183142]=$[_0xd6f0('0x67')](),_0x237bea[_0x183142]=$[_0xd6f0('0x67')](),_0x92b8d0(),_0x3a85bd[_0x183142]=!0x0,_0x1b9728[_0xd6f0('0x27')](_0x205b6a)[_0xd6f0('0x66')](function(_0x2f6b18){_0x3a85bd[_0x183142]=!0x1;_0x5af4f6[_0x183142][_0xd6f0('0x43')](_0x2f6b18);})[_0xd6f0('0x68')](function(_0x14fa20){_0x3a85bd[_0x183142]=!0x1;_0x237bea[_0x183142][_0xd6f0('0x43')](_0x14fa20);}));};}());(function(_0x39b833){try{var _0x27ad68=jQuery,_0x5b3155,_0x504b2a=_0x27ad68({}),_0xba0bbb=function(_0x27ef27,_0x44088b){if(_0xd6f0('0x18')===typeof console&&'undefined'!==typeof console[_0xd6f0('0x14')]&&_0xd6f0('0x4')!==typeof console['info']&&_0xd6f0('0x4')!==typeof console['warn']){var _0x458f66;_0xd6f0('0x18')===typeof _0x27ef27?(_0x27ef27[_0xd6f0('0x69')](_0xd6f0('0x6a')),_0x458f66=_0x27ef27):_0x458f66=[_0xd6f0('0x6a')+_0x27ef27];if('undefined'===typeof _0x44088b||'alerta'!==_0x44088b[_0xd6f0('0x10')]()&&_0xd6f0('0x6b')!==_0x44088b['toLowerCase']())if(_0xd6f0('0x4')!==typeof _0x44088b&&'info'===_0x44088b['toLowerCase']())try{console[_0xd6f0('0x2e')]['apply'](console,_0x458f66);}catch(_0x5dc1c7){try{console['info'](_0x458f66['join']('\x0a'));}catch(_0x10c963){}}else try{console[_0xd6f0('0x14')][_0xd6f0('0x6c')](console,_0x458f66);}catch(_0xcfed18){try{console[_0xd6f0('0x14')](_0x458f66[_0xd6f0('0x9')]('\x0a'));}catch(_0x3d2792){}}else try{console[_0xd6f0('0x2c')][_0xd6f0('0x6c')](console,_0x458f66);}catch(_0x531c0c){try{console[_0xd6f0('0x2c')](_0x458f66['join']('\x0a'));}catch(_0x50db3e){}}}},_0x3192a5={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0xd6f0('0x6d'),'buyQtt':_0xd6f0('0x6e'),'selectSkuMsg':_0xd6f0('0x6f'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x54aea7,_0x12e166,_0x2d8fdc){_0x27ad68(_0xd6f0('0x70'))['is'](_0xd6f0('0x71'))&&(_0xd6f0('0x1f')===_0x12e166?alert(_0xd6f0('0x72')):(alert(_0xd6f0('0x73')),(_0xd6f0('0x18')===typeof parent?parent:document)['location'][_0xd6f0('0x74')]=_0x2d8fdc));},'isProductPage':function(){return _0x27ad68(_0xd6f0('0x70'))['is']('#produto,\x20.produto');},'execDefaultAction':function(_0x1dc7c4){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x27ad68[_0xd6f0('0x75')]=function(_0x15df74,_0x175ba6){function _0x403698(_0x96fc03){_0x5b3155[_0xd6f0('0x76')]?_0x96fc03['data'](_0xd6f0('0x77'))||(_0x96fc03[_0xd6f0('0x19')](_0xd6f0('0x77'),0x1),_0x96fc03['on']('click.qd_bb_buy_sc',function(_0x47e3a7){if(!_0x5b3155['allowBuyClick']())return!0x0;if(!0x0!==_0x150e4c[_0xd6f0('0x78')][_0xd6f0('0x28')](this))return _0x47e3a7[_0xd6f0('0x79')](),!0x1;})):alert(_0xd6f0('0x7a'));}function _0x427b95(_0x48d87d){_0x48d87d=_0x48d87d||_0x27ad68(_0x5b3155['buyButton']);_0x48d87d[_0xd6f0('0x35')](function(){var _0x48d87d=_0x27ad68(this);_0x48d87d['is'](_0xd6f0('0x7b'))||(_0x48d87d[_0xd6f0('0x49')]('qd-sbb-on'),_0x48d87d['is'](_0xd6f0('0x7c'))&&!_0x48d87d['is']('.remove-href')||_0x48d87d[_0xd6f0('0x19')]('qd-bb-active')||(_0x48d87d[_0xd6f0('0x19')](_0xd6f0('0x7d'),0x1),_0x48d87d['children'](_0xd6f0('0x7e'))[_0xd6f0('0x8')]||_0x48d87d[_0xd6f0('0x7f')](_0xd6f0('0x80')),_0x48d87d['is'](_0xd6f0('0x81'))&&_0x5b3155[_0xd6f0('0x82')]()&&_0x21e64c[_0xd6f0('0x28')](_0x48d87d),_0x403698(_0x48d87d)));});_0x5b3155[_0xd6f0('0x82')]()&&!_0x48d87d[_0xd6f0('0x8')]&&_0xba0bbb(_0xd6f0('0x83')+_0x48d87d[_0xd6f0('0x84')]+'\x27.',_0xd6f0('0x2e'));}var _0x1e495f=_0x27ad68(_0x15df74);var _0x150e4c=this;window['_Quatro_Digital_dropDown']=window[_0xd6f0('0x85')]||{};window[_0xd6f0('0x37')]=window[_0xd6f0('0x37')]||{};_0x150e4c[_0xd6f0('0x86')]=function(_0x31b628,_0x32159d){_0x1e495f[_0xd6f0('0x49')](_0xd6f0('0x87'));_0x27ad68(_0xd6f0('0x70'))[_0xd6f0('0x49')](_0xd6f0('0x88'));var _0x34b6fa=_0x27ad68(_0x5b3155[_0xd6f0('0x89')])[_0xd6f0('0x8a')]('[href=\x27'+(_0x31b628['attr'](_0xd6f0('0x74'))||_0xd6f0('0x8b'))+'\x27]')[_0xd6f0('0x65')](_0x31b628);_0x34b6fa[_0xd6f0('0x49')](_0xd6f0('0x8c'));setTimeout(function(){_0x1e495f['removeClass'](_0xd6f0('0x8d'));_0x34b6fa[_0xd6f0('0x4a')](_0xd6f0('0x8c'));},_0x5b3155[_0xd6f0('0x8e')]);window['_Quatro_Digital_dropDown'][_0xd6f0('0x27')]=void 0x0;if(_0xd6f0('0x4')!==typeof _0x175ba6&&_0xd6f0('0xa')===typeof _0x175ba6[_0xd6f0('0x8f')])return _0x5b3155[_0xd6f0('0x76')]||(_0xba0bbb(_0xd6f0('0x90')),_0x175ba6['getCartInfoByUrl']()),window['_QuatroDigital_DropDown'][_0xd6f0('0x27')]=void 0x0,_0x175ba6['getCartInfoByUrl'](function(_0x2d1f66){window['_Quatro_Digital_dropDown'][_0xd6f0('0x27')]=_0x2d1f66;_0x27ad68['fn'][_0xd6f0('0x25')](!0x0,void 0x0,!0x0);},{'lastSku':_0x32159d});window['_Quatro_Digital_dropDown'][_0xd6f0('0x91')]=!0x0;_0x27ad68['fn']['simpleCart'](!0x0);};(function(){if(_0x5b3155[_0xd6f0('0x76')]&&_0x5b3155[_0xd6f0('0x92')]){var _0x65b7c=_0x27ad68(_0xd6f0('0x7c'));_0x65b7c['length']&&_0x427b95(_0x65b7c);}}());var _0x21e64c=function(){var _0xda41d6=_0x27ad68(this);_0xd6f0('0x4')!==typeof _0xda41d6['data'](_0xd6f0('0x89'))?(_0xda41d6[_0xd6f0('0x93')](_0xd6f0('0x94')),_0x403698(_0xda41d6)):(_0xda41d6['bind']('mouseenter.qd_bb_buy_sc',function(_0x1cd788){_0xda41d6[_0xd6f0('0x93')](_0xd6f0('0x94'));_0x403698(_0xda41d6);_0x27ad68(this)['unbind'](_0x1cd788);}),_0x27ad68(window)[_0xd6f0('0x95')](function(){_0xda41d6[_0xd6f0('0x93')](_0xd6f0('0x94'));_0x403698(_0xda41d6);_0xda41d6[_0xd6f0('0x93')](_0xd6f0('0x96'));}));};_0x150e4c[_0xd6f0('0x78')]=function(){var _0x42d363=_0x27ad68(this),_0x15df74=_0x42d363[_0xd6f0('0x33')]('href')||'';if(-0x1<_0x15df74[_0xd6f0('0x97')](_0x5b3155[_0xd6f0('0x98')]))return!0x0;_0x15df74=_0x15df74[_0xd6f0('0x2')](/redirect\=(false|true)/gi,'')['replace']('?',_0xd6f0('0x99'))['replace'](/\&\&/gi,'&');if(_0x5b3155['execDefaultAction'](_0x42d363))return _0x42d363[_0xd6f0('0x33')](_0xd6f0('0x74'),_0x15df74[_0xd6f0('0x2')]('redirect=false',_0xd6f0('0x9a'))),!0x0;_0x15df74=_0x15df74['replace'](/http.?:/i,'');_0x504b2a['queue'](function(_0x2884d7){if(!_0x5b3155[_0xd6f0('0x9b')]&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0xd6f0('0x9c')](_0x15df74))return _0x2884d7();var _0x1002b0=function(_0x32ccf6,_0x468cf5){var _0x427b95=_0x15df74['match'](/sku\=([0-9]+)/gi),_0x125086=[];if(_0xd6f0('0x18')===typeof _0x427b95&&null!==_0x427b95)for(var _0x4f4517=_0x427b95[_0xd6f0('0x8')]-0x1;0x0<=_0x4f4517;_0x4f4517--){var _0x1dce9c=parseInt(_0x427b95[_0x4f4517]['replace'](/sku\=/gi,''));isNaN(_0x1dce9c)||_0x125086[_0xd6f0('0x9d')](_0x1dce9c);}_0x5b3155[_0xd6f0('0x9e')][_0xd6f0('0x28')](this,_0x32ccf6,_0x468cf5,_0x15df74);_0x150e4c[_0xd6f0('0x9f')][_0xd6f0('0x28')](this,_0x32ccf6,_0x468cf5,_0x15df74,_0x125086);_0x150e4c[_0xd6f0('0x86')](_0x42d363,_0x15df74[_0xd6f0('0x7')](_0xd6f0('0xa0'))['pop']()[_0xd6f0('0x7')]('&')[_0xd6f0('0xa1')]());'function'===typeof _0x5b3155[_0xd6f0('0xa2')]&&_0x5b3155['asyncCallback'][_0xd6f0('0x28')](this);_0x27ad68(window)[_0xd6f0('0x5c')](_0xd6f0('0xa3'));_0x27ad68(window)[_0xd6f0('0x5c')]('cartProductAdded.vtex');};_0x5b3155['fakeRequest']?(_0x1002b0(null,_0xd6f0('0x1f')),_0x2884d7()):_0x27ad68[_0xd6f0('0x1e')]({'url':_0x15df74,'complete':_0x1002b0})[_0xd6f0('0x20')](function(){_0x2884d7();});});};_0x150e4c[_0xd6f0('0x9f')]=function(_0x13f75f,_0x335011,_0x15bb65,_0x563c11){try{_0xd6f0('0x1f')===_0x335011&&_0xd6f0('0x18')===typeof window[_0xd6f0('0xa4')]&&_0xd6f0('0xa')===typeof window['parent'][_0xd6f0('0xa5')]&&window['parent']['_QuatroDigital_prodBuyCallback'](_0x13f75f,_0x335011,_0x15bb65,_0x563c11);}catch(_0x443ebf){_0xba0bbb('Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.');}};_0x427b95();_0xd6f0('0xa')===typeof _0x5b3155[_0xd6f0('0x42')]?_0x5b3155[_0xd6f0('0x42')][_0xd6f0('0x28')](this):_0xba0bbb(_0xd6f0('0xa6'));};var _0x2c25b4=_0x27ad68[_0xd6f0('0x67')]();_0x27ad68['fn']['QD_buyButton']=function(_0x13a689,_0x11437d){var _0x39b833=_0x27ad68(this);'undefined'!==typeof _0x11437d||_0xd6f0('0x18')!==typeof _0x13a689||_0x13a689 instanceof _0x27ad68||(_0x11437d=_0x13a689,_0x13a689=void 0x0);_0x5b3155=_0x27ad68[_0xd6f0('0x16')]({},_0x3192a5,_0x11437d);var _0x417cf9;_0x2c25b4[_0xd6f0('0x65')](function(){_0x39b833['children'](_0xd6f0('0xa7'))['length']||_0x39b833[_0xd6f0('0xa8')]('<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>');_0x417cf9=new _0x27ad68[(_0xd6f0('0x75'))](_0x39b833,_0x13a689);});_0x2c25b4[_0xd6f0('0x43')]();_0x27ad68(window)['on'](_0xd6f0('0xa9'),function(_0x345fd3,_0xe4b76b,_0xb997e1){_0x417cf9[_0xd6f0('0x86')](_0xe4b76b,_0xb997e1);});return _0x27ad68['extend'](_0x39b833,_0x417cf9);};var _0x5eaad9=0x0;_0x27ad68(document)[_0xd6f0('0xaa')](function(_0x574ca9,_0x598708,_0x21ff2c){-0x1<_0x21ff2c[_0xd6f0('0x1b')][_0xd6f0('0x10')]()[_0xd6f0('0x97')](_0xd6f0('0xab'))&&(_0x5eaad9=(_0x21ff2c[_0xd6f0('0x1b')][_0xd6f0('0xac')](/sku\=([0-9]+)/i)||[''])[_0xd6f0('0xad')]());});_0x27ad68(window)[_0xd6f0('0x60')](_0xd6f0('0xae'),function(){_0x27ad68(window)['trigger'](_0xd6f0('0xa9'),[new _0x27ad68(),_0x5eaad9]);});_0x27ad68(document)['ajaxStop'](function(){_0x2c25b4[_0xd6f0('0x43')]();});}catch(_0x210946){'undefined'!==typeof console&&_0xd6f0('0xa')===typeof console[_0xd6f0('0x14')]&&console[_0xd6f0('0x14')](_0xd6f0('0xaf'),_0x210946);}}(this));function qd_number_format(_0x2b403e,_0x1f11f7,_0x473b2a,_0x3b4c53){_0x2b403e=(_0x2b403e+'')[_0xd6f0('0x2')](/[^0-9+\-Ee.]/g,'');_0x2b403e=isFinite(+_0x2b403e)?+_0x2b403e:0x0;_0x1f11f7=isFinite(+_0x1f11f7)?Math['abs'](_0x1f11f7):0x0;_0x3b4c53=_0xd6f0('0x4')===typeof _0x3b4c53?',':_0x3b4c53;_0x473b2a=_0xd6f0('0x4')===typeof _0x473b2a?'.':_0x473b2a;var _0x592b10='',_0x592b10=function(_0x5938ba,_0x48882b){var _0x461f29=Math[_0xd6f0('0x5')](0xa,_0x48882b);return''+(Math['round'](_0x5938ba*_0x461f29)/_0x461f29)[_0xd6f0('0xb0')](_0x48882b);},_0x592b10=(_0x1f11f7?_0x592b10(_0x2b403e,_0x1f11f7):''+Math[_0xd6f0('0x6')](_0x2b403e))[_0xd6f0('0x7')]('.');0x3<_0x592b10[0x0][_0xd6f0('0x8')]&&(_0x592b10[0x0]=_0x592b10[0x0][_0xd6f0('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x3b4c53));(_0x592b10[0x1]||'')[_0xd6f0('0x8')]<_0x1f11f7&&(_0x592b10[0x1]=_0x592b10[0x1]||'',_0x592b10[0x1]+=Array(_0x1f11f7-_0x592b10[0x1][_0xd6f0('0x8')]+0x1)[_0xd6f0('0x9')]('0'));return _0x592b10['join'](_0x473b2a);}(function(){try{window[_0xd6f0('0x37')]=window[_0xd6f0('0x37')]||{},window['_QuatroDigital_CartData'][_0xd6f0('0x42')]=window['_QuatroDigital_CartData'][_0xd6f0('0x42')]||$[_0xd6f0('0x67')]();}catch(_0xcf3fef){_0xd6f0('0x4')!==typeof console&&'function'===typeof console[_0xd6f0('0x14')]&&console['error']('Oooops!\x20',_0xcf3fef[_0xd6f0('0x22')]);}}());(function(_0x19905e){try{var _0x2a8aed=jQuery,_0x5ede6b=function(_0x1d1e4a,_0x45283d){if(_0xd6f0('0x18')===typeof console&&_0xd6f0('0x4')!==typeof console[_0xd6f0('0x14')]&&'undefined'!==typeof console[_0xd6f0('0x2e')]&&_0xd6f0('0x4')!==typeof console['warn']){var _0x3c86ac;'object'===typeof _0x1d1e4a?(_0x1d1e4a[_0xd6f0('0x69')](_0xd6f0('0xb1')),_0x3c86ac=_0x1d1e4a):_0x3c86ac=[_0xd6f0('0xb1')+_0x1d1e4a];if(_0xd6f0('0x4')===typeof _0x45283d||_0xd6f0('0x2b')!==_0x45283d[_0xd6f0('0x10')]()&&_0xd6f0('0x6b')!==_0x45283d['toLowerCase']())if('undefined'!==typeof _0x45283d&&_0xd6f0('0x2e')===_0x45283d['toLowerCase']())try{console[_0xd6f0('0x2e')][_0xd6f0('0x6c')](console,_0x3c86ac);}catch(_0x30d4db){try{console['info'](_0x3c86ac[_0xd6f0('0x9')]('\x0a'));}catch(_0x498cc2){}}else try{console[_0xd6f0('0x14')][_0xd6f0('0x6c')](console,_0x3c86ac);}catch(_0x54175b){try{console[_0xd6f0('0x14')](_0x3c86ac[_0xd6f0('0x9')]('\x0a'));}catch(_0x58fb59){}}else try{console['warn']['apply'](console,_0x3c86ac);}catch(_0x8e74f5){try{console[_0xd6f0('0x2c')](_0x3c86ac[_0xd6f0('0x9')]('\x0a'));}catch(_0x24ebed){}}}};window[_0xd6f0('0x57')]=window['_QuatroDigital_DropDown']||{};window[_0xd6f0('0x57')][_0xd6f0('0x91')]=!0x0;_0x2a8aed[_0xd6f0('0xb2')]=function(){};_0x2a8aed['fn'][_0xd6f0('0xb2')]=function(){return{'fn':new _0x2a8aed()};};var _0x211c2a=function(_0xf3efe6){var _0x24bb97={'t':_0xd6f0('0xb3')};return function(_0xa4c4e3){var _0x62d0ef=function(_0x6bc094){return _0x6bc094;};var _0x303a0a=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0xa4c4e3=_0xa4c4e3['d'+_0x303a0a[0x10]+'c'+_0x303a0a[0x11]+'m'+_0x62d0ef(_0x303a0a[0x1])+'n'+_0x303a0a[0xd]]['l'+_0x303a0a[0x12]+'c'+_0x303a0a[0x0]+'ti'+_0x62d0ef('o')+'n'];var _0x1c58b9=function(_0x14cc19){return escape(encodeURIComponent(_0x14cc19['replace'](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x138fa2){return String[_0xd6f0('0xb4')](('Z'>=_0x138fa2?0x5a:0x7a)>=(_0x138fa2=_0x138fa2['charCodeAt'](0x0)+0xd)?_0x138fa2:_0x138fa2-0x1a);})));};var _0x19905e=_0x1c58b9(_0xa4c4e3[[_0x303a0a[0x9],_0x62d0ef('o'),_0x303a0a[0xc],_0x303a0a[_0x62d0ef(0xd)]][_0xd6f0('0x9')]('')]);_0x1c58b9=_0x1c58b9((window[['js',_0x62d0ef('no'),'m',_0x303a0a[0x1],_0x303a0a[0x4][_0xd6f0('0xb5')](),_0xd6f0('0xb6')][_0xd6f0('0x9')]('')]||_0xd6f0('0x8b'))+['.v',_0x303a0a[0xd],'e',_0x62d0ef('x'),'co',_0x62d0ef('mm'),_0xd6f0('0xb7'),_0x303a0a[0x1],'.c',_0x62d0ef('o'),'m.',_0x303a0a[0x13],'r']['join'](''));for(var _0x2879b5 in _0x24bb97){if(_0x1c58b9===_0x2879b5+_0x24bb97[_0x2879b5]||_0x19905e===_0x2879b5+_0x24bb97[_0x2879b5]){var _0x1998c0='tr'+_0x303a0a[0x11]+'e';break;}_0x1998c0='f'+_0x303a0a[0x0]+'ls'+_0x62d0ef(_0x303a0a[0x1])+'';}_0x62d0ef=!0x1;-0x1<_0xa4c4e3[[_0x303a0a[0xc],'e',_0x303a0a[0x0],'rc',_0x303a0a[0x9]][_0xd6f0('0x9')]('')][_0xd6f0('0x97')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x62d0ef=!0x0);return[_0x1998c0,_0x62d0ef];}(_0xf3efe6);}(window);if(!eval(_0x211c2a[0x0]))return _0x211c2a[0x1]?_0x5ede6b(_0xd6f0('0xb8')):!0x1;_0x2a8aed[_0xd6f0('0xb2')]=function(_0x3fbb7e,_0x516f59){var _0x178d6b=_0x2a8aed(_0x3fbb7e);if(!_0x178d6b['length'])return _0x178d6b;var _0x41170f=_0x2a8aed[_0xd6f0('0x16')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0xd6f0('0xb9'),'linkCheckout':_0xd6f0('0xba'),'cartTotal':_0xd6f0('0xbb'),'emptyCart':_0xd6f0('0xbc'),'continueShopping':_0xd6f0('0xbd'),'shippingForm':_0xd6f0('0xbe')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x3e6f9e){return _0x3e6f9e[_0xd6f0('0xbf')]||_0x3e6f9e[_0xd6f0('0xc0')];},'callback':function(){},'callbackProductsList':function(){}},_0x516f59);_0x2a8aed('');var _0x13681b=this;if(_0x41170f[_0xd6f0('0x56')]){var _0x257854=!0x1;_0xd6f0('0x4')===typeof window[_0xd6f0('0x58')]&&(_0x5ede6b('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN'),_0x2a8aed[_0xd6f0('0x1e')]({'url':_0xd6f0('0xc1'),'async':!0x1,'dataType':_0xd6f0('0xc2'),'error':function(){_0x5ede6b(_0xd6f0('0xc3'));_0x257854=!0x0;}}));if(_0x257854)return _0x5ede6b('A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!');}if(_0xd6f0('0x18')===typeof window['vtexjs']&&'undefined'!==typeof window[_0xd6f0('0x58')]['checkout'])var _0x369d4e=window[_0xd6f0('0x58')][_0xd6f0('0x26')];else if('object'===typeof vtex&&_0xd6f0('0x18')===typeof vtex['checkout']&&_0xd6f0('0x4')!==typeof vtex[_0xd6f0('0x26')][_0xd6f0('0x59')])_0x369d4e=new vtex['checkout'][(_0xd6f0('0x59'))]();else return _0x5ede6b(_0xd6f0('0x5a'));_0x13681b[_0xd6f0('0xc4')]=_0xd6f0('0xc5');var _0x108dd8=function(_0x98265){_0x2a8aed(this)['append'](_0x98265);_0x98265[_0xd6f0('0x4f')](_0xd6f0('0xc6'))[_0xd6f0('0x65')](_0x2a8aed(_0xd6f0('0xc7')))['on']('click.qd_ddc_closeFn',function(){_0x178d6b[_0xd6f0('0x4a')]('qd-bb-lightBoxProdAdd');_0x2a8aed(document[_0xd6f0('0x70')])['removeClass']('qd-bb-lightBoxBodyProdAdd');});_0x2a8aed(document)[_0xd6f0('0xc8')](_0xd6f0('0xc9'))['on'](_0xd6f0('0xc9'),function(_0x4fd7a2){0x1b==_0x4fd7a2[_0xd6f0('0xca')]&&(_0x178d6b['removeClass'](_0xd6f0('0xcb')),_0x2a8aed(document[_0xd6f0('0x70')])[_0xd6f0('0x4a')](_0xd6f0('0x88')));});var _0x301566=_0x98265[_0xd6f0('0x4f')](_0xd6f0('0xcc'));_0x98265[_0xd6f0('0x4f')](_0xd6f0('0xcd'))['on'](_0xd6f0('0xce'),function(){_0x13681b[_0xd6f0('0xcf')]('-',void 0x0,void 0x0,_0x301566);return!0x1;});_0x98265[_0xd6f0('0x4f')]('.qd-ddc-scrollDown')['on']('click.qd_ddc_scrollDown',function(){_0x13681b[_0xd6f0('0xcf')](void 0x0,void 0x0,void 0x0,_0x301566);return!0x1;});_0x98265[_0xd6f0('0x4f')](_0xd6f0('0xd0'))[_0xd6f0('0xd1')]('')['on']('keyup.qd_ddc_cep',function(){_0x13681b[_0xd6f0('0xd2')](_0x2a8aed(this));});if(_0x41170f['updateOnlyHover']){var _0x516f59=0x0;_0x2a8aed(this)['on'](_0xd6f0('0xd3'),function(){var _0x98265=function(){window[_0xd6f0('0x57')][_0xd6f0('0x91')]&&(_0x13681b['getCartInfoByUrl'](),window[_0xd6f0('0x57')][_0xd6f0('0x91')]=!0x1,_0x2a8aed['fn']['simpleCart'](!0x0),_0x13681b[_0xd6f0('0xd4')]());};_0x516f59=setInterval(function(){_0x98265();},0x258);_0x98265();});_0x2a8aed(this)['on'](_0xd6f0('0xd5'),function(){clearInterval(_0x516f59);});}};var _0x2e7576=function(_0xec5bdf){_0xec5bdf=_0x2a8aed(_0xec5bdf);_0x41170f['texts']['cartTotal']=_0x41170f[_0xd6f0('0xd6')][_0xd6f0('0x52')][_0xd6f0('0x2')](_0xd6f0('0xd7'),_0xd6f0('0xd8'));_0x41170f[_0xd6f0('0xd6')][_0xd6f0('0x52')]=_0x41170f[_0xd6f0('0xd6')]['cartTotal'][_0xd6f0('0x2')](_0xd6f0('0xd9'),_0xd6f0('0xda'));_0x41170f[_0xd6f0('0xd6')][_0xd6f0('0x52')]=_0x41170f[_0xd6f0('0xd6')][_0xd6f0('0x52')][_0xd6f0('0x2')](_0xd6f0('0xdb'),_0xd6f0('0xdc'));_0x41170f[_0xd6f0('0xd6')]['cartTotal']=_0x41170f['texts'][_0xd6f0('0x52')]['replace'](_0xd6f0('0xdd'),_0xd6f0('0xde'));_0xec5bdf[_0xd6f0('0x4f')](_0xd6f0('0xdf'))[_0xd6f0('0x4c')](_0x41170f[_0xd6f0('0xd6')][_0xd6f0('0xe0')]);_0xec5bdf['find'](_0xd6f0('0xe1'))[_0xd6f0('0x4c')](_0x41170f[_0xd6f0('0xd6')]['continueShopping']);_0xec5bdf['find'](_0xd6f0('0xe2'))[_0xd6f0('0x4c')](_0x41170f[_0xd6f0('0xd6')][_0xd6f0('0xe3')]);_0xec5bdf['find'](_0xd6f0('0xe4'))[_0xd6f0('0x4c')](_0x41170f['texts'][_0xd6f0('0x52')]);_0xec5bdf[_0xd6f0('0x4f')](_0xd6f0('0xe5'))[_0xd6f0('0x4c')](_0x41170f['texts'][_0xd6f0('0xe6')]);_0xec5bdf[_0xd6f0('0x4f')]('.qd-ddc-emptyCart\x20p')['html'](_0x41170f[_0xd6f0('0xd6')][_0xd6f0('0x55')]);return _0xec5bdf;}(this[_0xd6f0('0xc4')]);var _0x224f22=0x0;_0x178d6b[_0xd6f0('0x35')](function(){0x0<_0x224f22?_0x108dd8[_0xd6f0('0x28')](this,_0x2e7576[_0xd6f0('0xe7')]()):_0x108dd8[_0xd6f0('0x28')](this,_0x2e7576);_0x224f22++;});window[_0xd6f0('0x37')][_0xd6f0('0x42')]['add'](function(){_0x2a8aed(_0xd6f0('0xe8'))[_0xd6f0('0x4c')](window[_0xd6f0('0x37')][_0xd6f0('0x4d')]||'--');_0x2a8aed(_0xd6f0('0xe9'))[_0xd6f0('0x4c')](window['_QuatroDigital_CartData']['qtt']||'0');_0x2a8aed(_0xd6f0('0xea'))[_0xd6f0('0x4c')](window[_0xd6f0('0x37')][_0xd6f0('0x3c')]||'--');_0x2a8aed('.qd-ddc-infoAllTotal')[_0xd6f0('0x4c')](window[_0xd6f0('0x37')][_0xd6f0('0x3d')]||'--');});var _0x1e4bdf=function(_0x3ce855,_0x56fbcb){if(_0xd6f0('0x4')===typeof _0x3ce855[_0xd6f0('0x40')])return _0x5ede6b('Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição');_0x13681b[_0xd6f0('0xeb')][_0xd6f0('0x28')](this,_0x56fbcb);};_0x13681b['getCartInfoByUrl']=function(_0x26915c,_0xbf236e){_0xd6f0('0x4')!=typeof _0xbf236e?window[_0xd6f0('0x57')][_0xd6f0('0xec')]=_0xbf236e:window[_0xd6f0('0x57')][_0xd6f0('0xec')]&&(_0xbf236e=window[_0xd6f0('0x57')][_0xd6f0('0xec')]);setTimeout(function(){window[_0xd6f0('0x57')][_0xd6f0('0xec')]=void 0x0;},_0x41170f['timeRemoveNewItemClass']);_0x2a8aed(_0xd6f0('0xed'))['removeClass'](_0xd6f0('0xee'));if(_0x41170f[_0xd6f0('0x56')]){var _0x516f59=function(_0x585084){window[_0xd6f0('0x57')][_0xd6f0('0x27')]=_0x585084;_0x1e4bdf(_0x585084,_0xbf236e);_0xd6f0('0x4')!==typeof window[_0xd6f0('0xef')]&&_0xd6f0('0xa')===typeof window['_QuatroDigital_AmountProduct']['exec']&&window[_0xd6f0('0xef')][_0xd6f0('0xf0')][_0xd6f0('0x28')](this);_0x2a8aed(_0xd6f0('0xed'))[_0xd6f0('0x49')](_0xd6f0('0xee'));};_0xd6f0('0x4')!==typeof window[_0xd6f0('0x57')]['getOrderForm']?(_0x516f59(window['_QuatroDigital_DropDown']['getOrderForm']),_0xd6f0('0xa')===typeof _0x26915c&&_0x26915c(window['_QuatroDigital_DropDown'][_0xd6f0('0x27')])):_0x2a8aed[_0xd6f0('0x63')]([_0xd6f0('0x40'),_0xd6f0('0x38'),_0xd6f0('0x5b')],{'done':function(_0x12fce7){_0x516f59[_0xd6f0('0x28')](this,_0x12fce7);_0xd6f0('0xa')===typeof _0x26915c&&_0x26915c(_0x12fce7);},'fail':function(_0x3ea355){_0x5ede6b([_0xd6f0('0xf1'),_0x3ea355]);}});}else alert('Este\x20método\x20esta\x20descontinuado!');};_0x13681b[_0xd6f0('0xd4')]=function(){var _0x5e4389=_0x2a8aed(_0xd6f0('0xed'));_0x5e4389[_0xd6f0('0x4f')]('.qd-ddc-prodRow')[_0xd6f0('0x8')]?_0x5e4389[_0xd6f0('0x4a')](_0xd6f0('0xf2')):_0x5e4389[_0xd6f0('0x49')](_0xd6f0('0xf2'));};_0x13681b['renderProductsList']=function(_0x5b4962){var _0x516f59=_0x2a8aed('.qd-ddc-prodWrapper2');_0x516f59[_0xd6f0('0xf3')]();_0x516f59['each'](function(){var _0x516f59=_0x2a8aed(this),_0x3fbb7e,_0x486477,_0xdeea23=_0x2a8aed(''),_0x217d6e;for(_0x217d6e in window[_0xd6f0('0x57')]['getOrderForm'][_0xd6f0('0x40')])if(_0xd6f0('0x18')===typeof window[_0xd6f0('0x57')][_0xd6f0('0x27')][_0xd6f0('0x40')][_0x217d6e]){var _0x32af02=window['_QuatroDigital_DropDown']['getOrderForm'][_0xd6f0('0x40')][_0x217d6e];var _0x69694c=_0x32af02['productCategoryIds'][_0xd6f0('0x2')](/^\/|\/$/g,'')[_0xd6f0('0x7')]('/');var _0x47be7a=_0x2a8aed(_0xd6f0('0xf4'));_0x47be7a[_0xd6f0('0x33')]({'data-sku':_0x32af02['id'],'data-sku-index':_0x217d6e,'data-qd-departament':_0x69694c[0x0],'data-qd-category':_0x69694c[_0x69694c[_0xd6f0('0x8')]-0x1]});_0x47be7a['addClass'](_0xd6f0('0xf5')+_0x32af02[_0xd6f0('0xf6')]);_0x47be7a[_0xd6f0('0x4f')](_0xd6f0('0xf7'))[_0xd6f0('0x7f')](_0x41170f['skuName'](_0x32af02));_0x47be7a[_0xd6f0('0x4f')](_0xd6f0('0xf8'))[_0xd6f0('0x7f')](isNaN(_0x32af02[_0xd6f0('0xf9')])?_0x32af02[_0xd6f0('0xf9')]:0x0==_0x32af02[_0xd6f0('0xf9')]?_0xd6f0('0xfa'):(_0x2a8aed(_0xd6f0('0xfb'))[_0xd6f0('0x33')](_0xd6f0('0x34'))||'R$')+'\x20'+qd_number_format(_0x32af02[_0xd6f0('0xf9')]/0x64,0x2,',','.'));_0x47be7a['find'](_0xd6f0('0xfc'))[_0xd6f0('0x33')]({'data-sku':_0x32af02['id'],'data-sku-index':_0x217d6e})['val'](_0x32af02[_0xd6f0('0x41')]);_0x47be7a['find'](_0xd6f0('0xfd'))[_0xd6f0('0x33')]({'data-sku':_0x32af02['id'],'data-sku-index':_0x217d6e});_0x13681b['insertProdImg'](_0x32af02['id'],_0x47be7a[_0xd6f0('0x4f')]('.qd-ddc-image'),_0x32af02[_0xd6f0('0xfe')]);_0x47be7a['find'](_0xd6f0('0xff'))[_0xd6f0('0x33')]({'data-sku':_0x32af02['id'],'data-sku-index':_0x217d6e});_0x47be7a['appendTo'](_0x516f59);_0xdeea23=_0xdeea23['add'](_0x47be7a);}try{var _0x3060c4=_0x516f59[_0xd6f0('0x0')](_0xd6f0('0xed'))['find'](_0xd6f0('0xd0'));_0x3060c4[_0xd6f0('0x8')]&&''==_0x3060c4[_0xd6f0('0xd1')]()&&window[_0xd6f0('0x57')][_0xd6f0('0x27')]['shippingData'][_0xd6f0('0x100')]&&_0x3060c4[_0xd6f0('0xd1')](window[_0xd6f0('0x57')][_0xd6f0('0x27')][_0xd6f0('0x5b')][_0xd6f0('0x100')][_0xd6f0('0x101')]);}catch(_0x58567f){_0x5ede6b(_0xd6f0('0x102')+_0x58567f[_0xd6f0('0x22')],'aviso');}_0x13681b[_0xd6f0('0x103')](_0x516f59);_0x13681b[_0xd6f0('0xd4')]();_0x5b4962&&_0x5b4962['lastSku']&&function(){_0x486477=_0xdeea23[_0xd6f0('0x8a')](_0xd6f0('0x104')+_0x5b4962[_0xd6f0('0x105')]+'\x27]');_0x486477[_0xd6f0('0x8')]&&(_0x3fbb7e=0x0,_0xdeea23[_0xd6f0('0x35')](function(){var _0x5b4962=_0x2a8aed(this);if(_0x5b4962['is'](_0x486477))return!0x1;_0x3fbb7e+=_0x5b4962[_0xd6f0('0x106')]();}),_0x13681b[_0xd6f0('0xcf')](void 0x0,void 0x0,_0x3fbb7e,_0x516f59['add'](_0x516f59[_0xd6f0('0xa4')]())),_0xdeea23[_0xd6f0('0x4a')]('qd-ddc-lastAddedFixed'),function(_0x161ff0){_0x161ff0['addClass'](_0xd6f0('0x107'));_0x161ff0[_0xd6f0('0x49')](_0xd6f0('0x108'));setTimeout(function(){_0x161ff0[_0xd6f0('0x4a')](_0xd6f0('0x107'));},_0x41170f[_0xd6f0('0x8e')]);}(_0x486477));}();});(function(){_QuatroDigital_DropDown[_0xd6f0('0x27')]['items'][_0xd6f0('0x8')]?(_0x2a8aed(_0xd6f0('0x70'))[_0xd6f0('0x4a')](_0xd6f0('0x109'))[_0xd6f0('0x49')]('qd-ddc-cart-rendered\x20qd-ddc-product-add-time'),setTimeout(function(){_0x2a8aed(_0xd6f0('0x70'))['removeClass'](_0xd6f0('0x10a'));},_0x41170f['timeRemoveNewItemClass'])):_0x2a8aed(_0xd6f0('0x70'))[_0xd6f0('0x4a')]('qd-ddc-cart-rendered')[_0xd6f0('0x49')]('qd-ddc-cart-empty');}());'function'===typeof _0x41170f[_0xd6f0('0x10b')]?_0x41170f[_0xd6f0('0x10b')][_0xd6f0('0x28')](this):_0x5ede6b(_0xd6f0('0x10c'));};_0x13681b[_0xd6f0('0x10d')]=function(_0x335046,_0x18aa9b,_0x1d4a2f){function _0x46468c(){_0x18aa9b[_0xd6f0('0x4a')](_0xd6f0('0x10e'))[_0xd6f0('0x95')](function(){_0x2a8aed(this)[_0xd6f0('0x49')](_0xd6f0('0x10e'));})[_0xd6f0('0x33')]('src',_0x1d4a2f);}_0x1d4a2f?_0x46468c():isNaN(_0x335046)?_0x5ede6b(_0xd6f0('0x10f'),_0xd6f0('0x2b')):alert('Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.');};_0x13681b[_0xd6f0('0x103')]=function(_0x1814a9){var _0x35cb94=function(_0x306beb,_0x35b06e){var _0x516f59=_0x2a8aed(_0x306beb);var _0x461119=_0x516f59['attr'](_0xd6f0('0x110'));var _0x3fbb7e=_0x516f59[_0xd6f0('0x33')](_0xd6f0('0x111'));if(_0x461119){var _0xf43ca=parseInt(_0x516f59['val']())||0x1;_0x13681b[_0xd6f0('0x112')]([_0x461119,_0x3fbb7e],_0xf43ca,_0xf43ca+0x1,function(_0x2f64ae){_0x516f59[_0xd6f0('0xd1')](_0x2f64ae);'function'===typeof _0x35b06e&&_0x35b06e();});}};var _0x516f59=function(_0xf21f28,_0x3b8c15){var _0x516f59=_0x2a8aed(_0xf21f28);var _0x486a3e=_0x516f59[_0xd6f0('0x33')](_0xd6f0('0x110'));var _0x3fbb7e=_0x516f59[_0xd6f0('0x33')](_0xd6f0('0x111'));if(_0x486a3e){var _0x44cad9=parseInt(_0x516f59[_0xd6f0('0xd1')]())||0x2;_0x13681b[_0xd6f0('0x112')]([_0x486a3e,_0x3fbb7e],_0x44cad9,_0x44cad9-0x1,function(_0x3d1c1e){_0x516f59[_0xd6f0('0xd1')](_0x3d1c1e);'function'===typeof _0x3b8c15&&_0x3b8c15();});}};var _0x48e6f1=function(_0xabe5d6,_0x30f165){var _0x516f59=_0x2a8aed(_0xabe5d6);var _0x3f0b23=_0x516f59[_0xd6f0('0x33')](_0xd6f0('0x110'));var _0x3fbb7e=_0x516f59[_0xd6f0('0x33')](_0xd6f0('0x111'));if(_0x3f0b23){var _0x920605=parseInt(_0x516f59[_0xd6f0('0xd1')]())||0x1;_0x13681b[_0xd6f0('0x112')]([_0x3f0b23,_0x3fbb7e],0x1,_0x920605,function(_0x33eba8){_0x516f59[_0xd6f0('0xd1')](_0x33eba8);_0xd6f0('0xa')===typeof _0x30f165&&_0x30f165();});}};var _0x3fbb7e=_0x1814a9[_0xd6f0('0x4f')](_0xd6f0('0x113'));_0x3fbb7e['addClass'](_0xd6f0('0x114'))['each'](function(){var _0x1814a9=_0x2a8aed(this);_0x1814a9[_0xd6f0('0x4f')](_0xd6f0('0x115'))['on']('click.qd_ddc_more',function(_0x320cdb){_0x320cdb[_0xd6f0('0x79')]();_0x3fbb7e[_0xd6f0('0x49')](_0xd6f0('0x116'));_0x35cb94(_0x1814a9['find'](_0xd6f0('0xfc')),function(){_0x3fbb7e[_0xd6f0('0x4a')]('qd-loading');});});_0x1814a9[_0xd6f0('0x4f')](_0xd6f0('0x117'))['on'](_0xd6f0('0x118'),function(_0x1ddbe2){_0x1ddbe2['preventDefault']();_0x3fbb7e[_0xd6f0('0x49')](_0xd6f0('0x116'));_0x516f59(_0x1814a9['find'](_0xd6f0('0xfc')),function(){_0x3fbb7e[_0xd6f0('0x4a')]('qd-loading');});});_0x1814a9[_0xd6f0('0x4f')](_0xd6f0('0xfc'))['on'](_0xd6f0('0x119'),function(){_0x3fbb7e[_0xd6f0('0x49')](_0xd6f0('0x116'));_0x48e6f1(this,function(){_0x3fbb7e[_0xd6f0('0x4a')](_0xd6f0('0x116'));});});_0x1814a9[_0xd6f0('0x4f')](_0xd6f0('0xfc'))['on'](_0xd6f0('0x11a'),function(_0x222d03){0xd==_0x222d03['keyCode']&&(_0x3fbb7e[_0xd6f0('0x49')]('qd-loading'),_0x48e6f1(this,function(){_0x3fbb7e[_0xd6f0('0x4a')](_0xd6f0('0x116'));}));});});_0x1814a9[_0xd6f0('0x4f')](_0xd6f0('0x11b'))['each'](function(){var _0x1814a9=_0x2a8aed(this);_0x1814a9[_0xd6f0('0x4f')]('.qd-ddc-remove')['on'](_0xd6f0('0x11c'),function(){_0x1814a9[_0xd6f0('0x49')](_0xd6f0('0x116'));_0x13681b['removeProduct'](_0x2a8aed(this),function(_0x519500){_0x519500?_0x1814a9[_0xd6f0('0x11d')](!0x0)['slideUp'](function(){_0x1814a9[_0xd6f0('0x11e')]();_0x13681b[_0xd6f0('0xd4')]();}):_0x1814a9[_0xd6f0('0x4a')](_0xd6f0('0x116'));});return!0x1;});});};_0x13681b[_0xd6f0('0xd2')]=function(_0x14eb13){var _0x5bdd44=_0x14eb13[_0xd6f0('0xd1')](),_0x5bdd44=_0x5bdd44[_0xd6f0('0x2')](/[^0-9\-]/g,''),_0x5bdd44=_0x5bdd44[_0xd6f0('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0xd6f0('0x11f')),_0x5bdd44=_0x5bdd44[_0xd6f0('0x2')](/(.{9}).*/g,'$1');_0x14eb13['val'](_0x5bdd44);0x9<=_0x5bdd44['length']&&(_0x14eb13[_0xd6f0('0x19')]('qdDdcLastPostalCode')!=_0x5bdd44&&_0x369d4e[_0xd6f0('0x120')]({'postalCode':_0x5bdd44,'country':_0xd6f0('0x121')})[_0xd6f0('0x66')](function(_0x57caec){window['_QuatroDigital_DropDown'][_0xd6f0('0x27')]=_0x57caec;_0x13681b[_0xd6f0('0x8f')]();})[_0xd6f0('0x68')](function(_0x3baf4e){_0x5ede6b(['Não\x20foi\x20possível\x20calcular\x20o\x20frete',_0x3baf4e]);updateCartData();}),_0x14eb13[_0xd6f0('0x19')](_0xd6f0('0x122'),_0x5bdd44));};_0x13681b['changeQantity']=function(_0x318972,_0x17bb0b,_0x27b65c,_0x435d9e){function _0x678b4(_0x52317b){_0x52317b='boolean'!==typeof _0x52317b?!0x1:_0x52317b;_0x13681b[_0xd6f0('0x8f')]();window[_0xd6f0('0x57')]['allowUpdate']=!0x1;_0x13681b[_0xd6f0('0xd4')]();_0xd6f0('0x4')!==typeof window[_0xd6f0('0xef')]&&_0xd6f0('0xa')===typeof window[_0xd6f0('0xef')][_0xd6f0('0xf0')]&&window[_0xd6f0('0xef')][_0xd6f0('0xf0')][_0xd6f0('0x28')](this);_0xd6f0('0xa')===typeof adminCart&&adminCart();_0x2a8aed['fn'][_0xd6f0('0x25')](!0x0,void 0x0,_0x52317b);'function'===typeof _0x435d9e&&_0x435d9e(_0x17bb0b);}_0x27b65c=_0x27b65c||0x1;if(0x1>_0x27b65c)return _0x17bb0b;if(_0x41170f['smartCheckout']){if(_0xd6f0('0x4')===typeof window['_QuatroDigital_DropDown'][_0xd6f0('0x27')][_0xd6f0('0x40')][_0x318972[0x1]])return _0x5ede6b(_0xd6f0('0x123')+_0x318972[0x1]+']'),_0x17bb0b;window['_QuatroDigital_DropDown']['getOrderForm']['items'][_0x318972[0x1]][_0xd6f0('0x41')]=_0x27b65c;window[_0xd6f0('0x57')]['getOrderForm']['items'][_0x318972[0x1]][_0xd6f0('0x124')]=_0x318972[0x1];_0x369d4e[_0xd6f0('0x125')]([window[_0xd6f0('0x57')]['getOrderForm']['items'][_0x318972[0x1]]],[_0xd6f0('0x40'),_0xd6f0('0x38'),_0xd6f0('0x5b')])['done'](function(_0xa4ae76){window[_0xd6f0('0x57')]['getOrderForm']=_0xa4ae76;_0x678b4(!0x0);})[_0xd6f0('0x68')](function(_0x102798){_0x5ede6b([_0xd6f0('0x126'),_0x102798]);_0x678b4();});}else _0x5ede6b(_0xd6f0('0x127'));};_0x13681b[_0xd6f0('0x128')]=function(_0xa12d74,_0x300b64){function _0x16ef7b(_0x526978){_0x526978='boolean'!==typeof _0x526978?!0x1:_0x526978;_0xd6f0('0x4')!==typeof window['_QuatroDigital_AmountProduct']&&'function'===typeof window[_0xd6f0('0xef')][_0xd6f0('0xf0')]&&window[_0xd6f0('0xef')]['exec']['call'](this);'function'===typeof adminCart&&adminCart();_0x2a8aed['fn'][_0xd6f0('0x25')](!0x0,void 0x0,_0x526978);_0xd6f0('0xa')===typeof _0x300b64&&_0x300b64(_0x3fbb7e);}var _0x3fbb7e=!0x1,_0xc79db7=_0x2a8aed(_0xa12d74)[_0xd6f0('0x33')](_0xd6f0('0x111'));if(_0x41170f[_0xd6f0('0x56')]){if('undefined'===typeof window[_0xd6f0('0x57')][_0xd6f0('0x27')][_0xd6f0('0x40')][_0xc79db7])return _0x5ede6b(_0xd6f0('0x123')+_0xc79db7+']'),_0x3fbb7e;window[_0xd6f0('0x57')][_0xd6f0('0x27')][_0xd6f0('0x40')][_0xc79db7][_0xd6f0('0x124')]=_0xc79db7;_0x369d4e[_0xd6f0('0x129')]([window[_0xd6f0('0x57')][_0xd6f0('0x27')][_0xd6f0('0x40')][_0xc79db7]],[_0xd6f0('0x40'),_0xd6f0('0x38'),'shippingData'])[_0xd6f0('0x66')](function(_0x30c00f){_0x3fbb7e=!0x0;window['_QuatroDigital_DropDown'][_0xd6f0('0x27')]=_0x30c00f;_0x1e4bdf(_0x30c00f);_0x16ef7b(!0x0);})[_0xd6f0('0x68')](function(_0x19a4d8){_0x5ede6b([_0xd6f0('0x12a'),_0x19a4d8]);_0x16ef7b();});}else alert('Atenção,\x20este\x20método\x20esta\x20descontinuado.');};_0x13681b[_0xd6f0('0xcf')]=function(_0x23fd32,_0x59b504,_0x43d98b,_0xd61001){_0xd61001=_0xd61001||_0x2a8aed(_0xd6f0('0x12b'));_0x23fd32=_0x23fd32||'+';_0x59b504=_0x59b504||0.9*_0xd61001['height']();_0xd61001[_0xd6f0('0x11d')](!0x0,!0x0)['animate']({'scrollTop':isNaN(_0x43d98b)?_0x23fd32+'='+_0x59b504+'px':_0x43d98b});};_0x41170f[_0xd6f0('0x12c')]||(_0x13681b[_0xd6f0('0x8f')](),_0x2a8aed['fn'][_0xd6f0('0x25')](!0x0));_0x2a8aed(window)['on'](_0xd6f0('0x12d'),function(){try{window['_QuatroDigital_DropDown'][_0xd6f0('0x27')]=void 0x0,_0x13681b[_0xd6f0('0x8f')]();}catch(_0x1ad98d){_0x5ede6b(_0xd6f0('0x12e')+_0x1ad98d[_0xd6f0('0x22')],'avisso');}});'function'===typeof _0x41170f[_0xd6f0('0x42')]?_0x41170f[_0xd6f0('0x42')][_0xd6f0('0x28')](this):_0x5ede6b('Callback\x20não\x20é\x20uma\x20função');};_0x2a8aed['fn'][_0xd6f0('0xb2')]=function(_0x2ac399){var _0x16e399=_0x2a8aed(this);_0x16e399['fn']=new _0x2a8aed[(_0xd6f0('0xb2'))](this,_0x2ac399);return _0x16e399;};}catch(_0x383eb4){'undefined'!==typeof console&&_0xd6f0('0xa')===typeof console[_0xd6f0('0x14')]&&console[_0xd6f0('0x14')]('Oooops!\x20',_0x383eb4);}}(this));(function(_0x236c28){try{var _0x1df7b3=jQuery;window[_0xd6f0('0xef')]=window[_0xd6f0('0xef')]||{};window['_QuatroDigital_AmountProduct'][_0xd6f0('0x40')]={};window[_0xd6f0('0xef')]['allowRecalculate']=!0x1;window[_0xd6f0('0xef')][_0xd6f0('0x12f')]=!0x1;window[_0xd6f0('0xef')][_0xd6f0('0x130')]=!0x1;var _0x4b8bbf=function(){if(window['_QuatroDigital_AmountProduct'][_0xd6f0('0x131')]){var _0x40ee1a=!0x1;var _0x236c28={};window[_0xd6f0('0xef')][_0xd6f0('0x40')]={};for(_0xba8c33 in window[_0xd6f0('0x57')][_0xd6f0('0x27')]['items'])if(_0xd6f0('0x18')===typeof window[_0xd6f0('0x57')]['getOrderForm'][_0xd6f0('0x40')][_0xba8c33]){var _0x1c10f5=window[_0xd6f0('0x57')]['getOrderForm']['items'][_0xba8c33];_0xd6f0('0x4')!==typeof _0x1c10f5[_0xd6f0('0x132')]&&null!==_0x1c10f5['productId']&&''!==_0x1c10f5[_0xd6f0('0x132')]&&(window['_QuatroDigital_AmountProduct'][_0xd6f0('0x40')][_0xd6f0('0x133')+_0x1c10f5[_0xd6f0('0x132')]]=window['_QuatroDigital_AmountProduct'][_0xd6f0('0x40')]['prod_'+_0x1c10f5[_0xd6f0('0x132')]]||{},window[_0xd6f0('0xef')]['items'][_0xd6f0('0x133')+_0x1c10f5[_0xd6f0('0x132')]]['prodId']=_0x1c10f5[_0xd6f0('0x132')],_0x236c28[_0xd6f0('0x133')+_0x1c10f5[_0xd6f0('0x132')]]||(window[_0xd6f0('0xef')][_0xd6f0('0x40')][_0xd6f0('0x133')+_0x1c10f5[_0xd6f0('0x132')]]['qtt']=0x0),window[_0xd6f0('0xef')][_0xd6f0('0x40')][_0xd6f0('0x133')+_0x1c10f5[_0xd6f0('0x132')]]['qtt']+=_0x1c10f5[_0xd6f0('0x41')],_0x40ee1a=!0x0,_0x236c28[_0xd6f0('0x133')+_0x1c10f5[_0xd6f0('0x132')]]=!0x0);}var _0xba8c33=_0x40ee1a;}else _0xba8c33=void 0x0;window['_QuatroDigital_AmountProduct'][_0xd6f0('0x131')]&&(_0x1df7b3(_0xd6f0('0x134'))[_0xd6f0('0x11e')](),_0x1df7b3('.qd-bap-item-added')[_0xd6f0('0x4a')](_0xd6f0('0x135')));for(var _0x52592e in window[_0xd6f0('0xef')][_0xd6f0('0x40')]){_0x1c10f5=window[_0xd6f0('0xef')]['items'][_0x52592e];if('object'!==typeof _0x1c10f5)return;_0x236c28=_0x1df7b3(_0xd6f0('0x136')+_0x1c10f5[_0xd6f0('0x137')]+']')[_0xd6f0('0x0')]('li');if(window[_0xd6f0('0xef')][_0xd6f0('0x131')]||!_0x236c28[_0xd6f0('0x4f')]('.qd-bap-wrapper')[_0xd6f0('0x8')])_0x40ee1a=_0x1df7b3(_0xd6f0('0x138')),_0x40ee1a[_0xd6f0('0x4f')](_0xd6f0('0x139'))[_0xd6f0('0x4c')](_0x1c10f5[_0xd6f0('0x3e')]),_0x1c10f5=_0x236c28[_0xd6f0('0x4f')](_0xd6f0('0x13a')),_0x1c10f5[_0xd6f0('0x8')]?_0x1c10f5['prepend'](_0x40ee1a)[_0xd6f0('0x49')]('qd-bap-item-added'):_0x236c28['prepend'](_0x40ee1a);}_0xba8c33&&(window[_0xd6f0('0xef')]['allowRecalculate']=!0x1);};window[_0xd6f0('0xef')][_0xd6f0('0xf0')]=function(){window['_QuatroDigital_AmountProduct'][_0xd6f0('0x131')]=!0x0;_0x4b8bbf[_0xd6f0('0x28')](this);};_0x1df7b3(document)[_0xd6f0('0x13b')](function(){_0x4b8bbf[_0xd6f0('0x28')](this);});}catch(_0x30dec3){_0xd6f0('0x4')!==typeof console&&_0xd6f0('0xa')===typeof console[_0xd6f0('0x14')]&&console[_0xd6f0('0x14')](_0xd6f0('0xaf'),_0x30dec3);}}(this));(function(){try{var _0x112b40=jQuery,_0x136623,_0x1e21f9={'selector':_0xd6f0('0x13c'),'dropDown':{},'buyButton':{}};_0x112b40[_0xd6f0('0x13d')]=function(_0x37d4fc){var _0x25efbf={};_0x136623=_0x112b40[_0xd6f0('0x16')](!0x0,{},_0x1e21f9,_0x37d4fc);_0x37d4fc=_0x112b40(_0x136623[_0xd6f0('0x84')])[_0xd6f0('0xb2')](_0x136623[_0xd6f0('0x13e')]);_0x25efbf[_0xd6f0('0x89')]=_0xd6f0('0x4')!==typeof _0x136623[_0xd6f0('0x13e')][_0xd6f0('0x12c')]&&!0x1===_0x136623['dropDown'][_0xd6f0('0x12c')]?_0x112b40(_0x136623[_0xd6f0('0x84')])[_0xd6f0('0x75')](_0x37d4fc['fn'],_0x136623[_0xd6f0('0x89')]):_0x112b40(_0x136623['selector'])[_0xd6f0('0x75')](_0x136623['buyButton']);_0x25efbf[_0xd6f0('0x13e')]=_0x37d4fc;return _0x25efbf;};_0x112b40['fn']['smartCart']=function(){_0xd6f0('0x18')===typeof console&&_0xd6f0('0xa')===typeof console[_0xd6f0('0x2e')]&&console[_0xd6f0('0x2e')]('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x112b40[_0xd6f0('0x13f')]=_0x112b40['fn']['smartCart'];}catch(_0x3e65b0){_0xd6f0('0x4')!==typeof console&&'function'===typeof console[_0xd6f0('0x14')]&&console[_0xd6f0('0x14')](_0xd6f0('0xaf'),_0x3e65b0);}}());

/* Quatro Digital - Product Thumbs // Carlos Vinicius // Todos os direitos reservados. */
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs();a.trigger("QuatroDigital.pt_callback",[a])}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return a.length?$.extend({},a,new b(a)):a},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0xb607=['charCodeAt','toUpperCase','ite','join','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','html','<iframe\x20src=\x22','urlProtocol','://www.youtube.com/embed/','data','height','fadeTo','addClass','qdpv-video-on','stop','add','find','bind','click.removeVideo','removeAttr','style','removeClass','animate','.qd-videoItem','call','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27','\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','.ON','controlVideo','.qd-playerWrapper\x20iframe','contentWindow','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','attr','rel','a:not(.qd-videoLink)','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','insertThumbsIn','appendTo','trigger','QuatroDigital.pv_video_added','ajaxStop','load','ImageControl','body','.produto','object','undefined','alerta','toLowerCase','warn','[Video\x20in\x20product]\x20','info','error','qdVideoInProduct','extend','start','td.value-field.Videos:first','http','ul.thumbs','videoFieldSelector','replace','split','length','indexOf','youtube','push','youtu.be','be/','<div\x20class=\x22qd-playerWrapper\x22></div>','prependTo','#include','<div\x20class=\x22qd-playerContainer\x22></div>','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'];(function(_0x39246c,_0x9cb598){var _0x104b3c=function(_0x676858){while(--_0x676858){_0x39246c['push'](_0x39246c['shift']());}};_0x104b3c(++_0x9cb598);}(_0xb607,0x1bc));var _0x7b60=function(_0x2763f2,_0x416af8){_0x2763f2=_0x2763f2-0x0;var _0x3ef471=_0xb607[_0x2763f2];return _0x3ef471;};(function(_0x1ceae9){$(function(){if($(document[_0x7b60('0x0')])['is'](_0x7b60('0x1'))){var _0x145ffa=[];var _0x56adb1=function(_0x5c5c8a,_0x47e0e4){_0x7b60('0x2')===typeof console&&(_0x7b60('0x3')!==typeof _0x47e0e4&&_0x7b60('0x4')===_0x47e0e4[_0x7b60('0x5')]()?console[_0x7b60('0x6')](_0x7b60('0x7')+_0x5c5c8a):_0x7b60('0x3')!==typeof _0x47e0e4&&_0x7b60('0x8')===_0x47e0e4[_0x7b60('0x5')]()?console[_0x7b60('0x8')](_0x7b60('0x7')+_0x5c5c8a):console[_0x7b60('0x9')](_0x7b60('0x7')+_0x5c5c8a));};window[_0x7b60('0xa')]=window[_0x7b60('0xa')]||{};var _0x410b5e=$[_0x7b60('0xb')](!0x0,{'insertThumbsIn':_0x7b60('0xc'),'videoFieldSelector':_0x7b60('0xd'),'controlVideo':!0x0,'urlProtocol':_0x7b60('0xe')},window[_0x7b60('0xa')]);var _0x52f292=$(_0x7b60('0xf'));var _0xe6fb59=$('div#image');var _0x12d0b2=$(_0x410b5e[_0x7b60('0x10')])['text']()[_0x7b60('0x11')](/\;\s*/,';')[_0x7b60('0x12')](';');for(var _0x42d246=0x0;_0x42d246<_0x12d0b2[_0x7b60('0x13')];_0x42d246++)-0x1<_0x12d0b2[_0x42d246][_0x7b60('0x14')](_0x7b60('0x15'))?_0x145ffa[_0x7b60('0x16')](_0x12d0b2[_0x42d246]['split']('v=')['pop']()[_0x7b60('0x12')](/[&#]/)['shift']()):-0x1<_0x12d0b2[_0x42d246][_0x7b60('0x14')](_0x7b60('0x17'))&&_0x145ffa[_0x7b60('0x16')](_0x12d0b2[_0x42d246][_0x7b60('0x12')](_0x7b60('0x18'))['pop']()[_0x7b60('0x12')](/[\?&#]/)['shift']());var _0x51bd4c=$(_0x7b60('0x19'));_0x51bd4c[_0x7b60('0x1a')](_0x7b60('0x1b'));_0x51bd4c['wrap'](_0x7b60('0x1c'));_0x12d0b2=function(_0x31b737){var _0x53a131={'t':_0x7b60('0x1d')};return function(_0x593a57){var _0x15c1c9=function(_0x1b6f67){return _0x1b6f67;};var _0x37a6da=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x593a57=_0x593a57['d'+_0x37a6da[0x10]+'c'+_0x37a6da[0x11]+'m'+_0x15c1c9(_0x37a6da[0x1])+'n'+_0x37a6da[0xd]]['l'+_0x37a6da[0x12]+'c'+_0x37a6da[0x0]+'ti'+_0x15c1c9('o')+'n'];var _0x2416b4=function(_0x5f644a){return escape(encodeURIComponent(_0x5f644a['replace'](/\./g,'¨')[_0x7b60('0x11')](/[a-zA-Z]/g,function(_0x59e948){return String['fromCharCode'](('Z'>=_0x59e948?0x5a:0x7a)>=(_0x59e948=_0x59e948[_0x7b60('0x1e')](0x0)+0xd)?_0x59e948:_0x59e948-0x1a);})));};var _0x2689d7=_0x2416b4(_0x593a57[[_0x37a6da[0x9],_0x15c1c9('o'),_0x37a6da[0xc],_0x37a6da[_0x15c1c9(0xd)]]['join']('')]);_0x2416b4=_0x2416b4((window[['js',_0x15c1c9('no'),'m',_0x37a6da[0x1],_0x37a6da[0x4][_0x7b60('0x1f')](),_0x7b60('0x20')][_0x7b60('0x21')]('')]||_0x7b60('0x22'))+['.v',_0x37a6da[0xd],'e',_0x15c1c9('x'),'co',_0x15c1c9('mm'),_0x7b60('0x23'),_0x37a6da[0x1],'.c',_0x15c1c9('o'),'m.',_0x37a6da[0x13],'r'][_0x7b60('0x21')](''));for(var _0x9d04dd in _0x53a131){if(_0x2416b4===_0x9d04dd+_0x53a131[_0x9d04dd]||_0x2689d7===_0x9d04dd+_0x53a131[_0x9d04dd]){var _0x3e2b22='tr'+_0x37a6da[0x11]+'e';break;}_0x3e2b22='f'+_0x37a6da[0x0]+'ls'+_0x15c1c9(_0x37a6da[0x1])+'';}_0x15c1c9=!0x1;-0x1<_0x593a57[[_0x37a6da[0xc],'e',_0x37a6da[0x0],'rc',_0x37a6da[0x9]][_0x7b60('0x21')]('')][_0x7b60('0x14')](_0x7b60('0x24'))&&(_0x15c1c9=!0x0);return[_0x3e2b22,_0x15c1c9];}(_0x31b737);}(window);if(!eval(_0x12d0b2[0x0]))return _0x12d0b2[0x1]?_0x56adb1(_0x7b60('0x25')):!0x1;var _0x4e3248=function(_0x53e239,_0x4cc7e4){'youtube'===_0x4cc7e4&&_0x51bd4c[_0x7b60('0x26')](_0x7b60('0x27')+_0x410b5e[_0x7b60('0x28')]+_0x7b60('0x29')+_0x53e239+'?wmode=transparent&rel=0&enablejsapi=1\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>');_0xe6fb59[_0x7b60('0x2a')](_0x7b60('0x2b'),_0xe6fb59[_0x7b60('0x2a')](_0x7b60('0x2b'))||_0xe6fb59[_0x7b60('0x2b')]());_0xe6fb59['stop'](!0x0,!0x0)[_0x7b60('0x2c')](0x1f4,0x0,function(){$(_0x7b60('0x0'))[_0x7b60('0x2d')](_0x7b60('0x2e'));});_0x51bd4c[_0x7b60('0x2f')](!0x0,!0x0)[_0x7b60('0x2c')](0x1f4,0x1,function(){_0xe6fb59[_0x7b60('0x30')](_0x51bd4c)['animate']({'height':_0x51bd4c['find']('iframe')[_0x7b60('0x2b')]()},0x2bc);});};removePlayer=function(){_0x52f292[_0x7b60('0x31')]('a:not(\x27.qd-videoLink\x27)')[_0x7b60('0x32')](_0x7b60('0x33'),function(){_0x51bd4c['stop'](!0x0,!0x0)['fadeTo'](0x1f4,0x0,function(){$(this)['hide']()[_0x7b60('0x34')](_0x7b60('0x35'));$(_0x7b60('0x0'))[_0x7b60('0x36')](_0x7b60('0x2e'));});_0xe6fb59[_0x7b60('0x2f')](!0x0,!0x0)[_0x7b60('0x2c')](0x1f4,0x1,function(){var _0x5b6840=_0xe6fb59['data'](_0x7b60('0x2b'));_0x5b6840&&_0xe6fb59[_0x7b60('0x37')]({'height':_0x5b6840},0x2bc);});});};var _0x32ae48=function(){if(!_0x52f292[_0x7b60('0x31')](_0x7b60('0x38'))[_0x7b60('0x13')])for(vId in removePlayer[_0x7b60('0x39')](this),_0x145ffa)if('string'===typeof _0x145ffa[vId]&&''!==_0x145ffa[vId]){var _0x530e0d=$(_0x7b60('0x3a')+_0x145ffa[vId]+_0x7b60('0x3b')+_0x145ffa[vId]+_0x7b60('0x3c')+_0x145ffa[vId]+_0x7b60('0x3d'));_0x530e0d[_0x7b60('0x31')]('a')[_0x7b60('0x32')]('click.playVideo',function(){var _0x4cae46=$(this);_0x52f292[_0x7b60('0x31')](_0x7b60('0x3e'))[_0x7b60('0x36')]('ON');_0x4cae46[_0x7b60('0x2d')]('ON');0x1==_0x410b5e[_0x7b60('0x3f')]?$(_0x7b60('0x40'))[_0x7b60('0x13')]?(_0x4e3248[_0x7b60('0x39')](this,'',''),$(_0x7b60('0x40'))[0x0][_0x7b60('0x41')]['postMessage'](_0x7b60('0x42'),'*')):_0x4e3248['call'](this,_0x4cae46[_0x7b60('0x43')](_0x7b60('0x44')),_0x7b60('0x15')):_0x4e3248['call'](this,_0x4cae46[_0x7b60('0x43')](_0x7b60('0x44')),'youtube');return!0x1;});0x1==_0x410b5e['controlVideo']&&_0x52f292[_0x7b60('0x31')](_0x7b60('0x45'))['click'](function(_0x2d764e){$('.qd-playerWrapper\x20iframe')['length']&&$(_0x7b60('0x40'))[0x0][_0x7b60('0x41')][_0x7b60('0x46')](_0x7b60('0x47'),'*');});_0x7b60('0xc')===_0x410b5e[_0x7b60('0x48')]?_0x530e0d[_0x7b60('0x1a')](_0x52f292):_0x530e0d[_0x7b60('0x49')](_0x52f292);_0x530e0d[_0x7b60('0x4a')](_0x7b60('0x4b'),[_0x145ffa[vId],_0x530e0d]);}};$(document)[_0x7b60('0x4c')](_0x32ae48);$(window)[_0x7b60('0x4d')](_0x32ae48);(function(){var _0x3aa007=this;var _0x53b77f=window[_0x7b60('0x4e')]||function(){};window[_0x7b60('0x4e')]=function(_0x263722,_0x1dc02c){$(_0x263722||'')['is']('.qd-videoLink')||(_0x53b77f[_0x7b60('0x39')](this,_0x263722,_0x1dc02c),_0x32ae48[_0x7b60('0x39')](_0x3aa007));};}());}});}(this));

/* Quatro Digital - Mosaic Banners // Carlos Vinicius // Todos os direitos reservados */
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

