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
			Product.setAvailableBodyClass();	
			
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
			var iframe = $("td.value-field.Video:first iframe");

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
var _0xe3bf=['prepend','changeNativeSaveAmount','em.economia-de','each','qd_sp_processedItem','startedByWrapper','call','forcePromotion','not','.qd_sp_processedItem','.qd_productPrice:not(.qd_sp_processedItem)','style','display:none\x20!important;','after','extend','boolean','function','prototype','trim','replace','round','length','join','QD_SmartPrice','object','error','info','undefined','alerta','toLowerCase','aviso','apply','warn','search','text','match','.flag','[class*=\x27desconto\x27]','auto','.productRightColumn','label.skuBestInstallmentNumber','label.skuBestInstallmentValue','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','isProductPage','closest','wrapperElement','filterFlagBy','productPage','find','addClass','qd-sp-active','.qd_sp_on,\x20.qd_sp_ignored','skuBestPrice','.qd_active','removeClass','siblings','qd_sp_ignored','qd_sp_on','isDiscountFlag','attr','skuCorrente','skus','sku','available','bestPrice','isSmartCheckout','qd-sp-product-unavailable','getDiscountValue','O\x20valor\x20informado\x20p/\x20o\x20desconto\x20não\x20é\x20um\x20número.','.qd_productPrice','Por\x20alguma\x20razão\x20não\x20consegui\x20obter\x20o\x20preço\x20deste\x20produto\x20:(','appliedDiscount','.qd_productOldPrice','val','changeNativePrice','.qd_displayPrice','skuPrice','.qd-sp-display-discount','html','installments','changeInstallments','installmentValue','.qd_sp_display_installments','.qd_sp_display_installmentValue','.qd_sp_installments','append','.qd_saveAmountPercent'];(function(_0x5453ec,_0x22bddf){var _0x125d9c=function(_0x4fc96b){while(--_0x4fc96b){_0x5453ec['push'](_0x5453ec['shift']());}};_0x125d9c(++_0x22bddf);}(_0xe3bf,0xcc));var _0xfe3b=function(_0x4bfd28,_0x10eff3){_0x4bfd28=_0x4bfd28-0x0;var _0x387e5c=_0xe3bf[_0x4bfd28];return _0x387e5c;};_0xfe3b('0x0')!==typeof String[_0xfe3b('0x1')][_0xfe3b('0x2')]&&(String[_0xfe3b('0x1')][_0xfe3b('0x2')]=function(){return this['replace'](/^\s+|\s+$/g,'');});function qd_number_format(_0x284dfb,_0x4c5c89,_0x28a780,_0x5ab279){_0x284dfb=(_0x284dfb+'')[_0xfe3b('0x3')](/[^0-9+\-Ee.]/g,'');_0x284dfb=isFinite(+_0x284dfb)?+_0x284dfb:0x0;_0x4c5c89=isFinite(+_0x4c5c89)?Math['abs'](_0x4c5c89):0x0;_0x5ab279='undefined'===typeof _0x5ab279?',':_0x5ab279;_0x28a780='undefined'===typeof _0x28a780?'.':_0x28a780;var _0x1309f7='',_0x1309f7=function(_0x363831,_0x4fb3c4){var _0x4c5c89=Math['pow'](0xa,_0x4fb3c4);return''+(Math[_0xfe3b('0x4')](_0x363831*_0x4c5c89)/_0x4c5c89)['toFixed'](_0x4fb3c4);},_0x1309f7=(_0x4c5c89?_0x1309f7(_0x284dfb,_0x4c5c89):''+Math[_0xfe3b('0x4')](_0x284dfb))['split']('.');0x3<_0x1309f7[0x0][_0xfe3b('0x5')]&&(_0x1309f7[0x0]=_0x1309f7[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x5ab279));(_0x1309f7[0x1]||'')[_0xfe3b('0x5')]<_0x4c5c89&&(_0x1309f7[0x1]=_0x1309f7[0x1]||'',_0x1309f7[0x1]+=Array(_0x4c5c89-_0x1309f7[0x1][_0xfe3b('0x5')]+0x1)[_0xfe3b('0x6')]('0'));return _0x1309f7[_0xfe3b('0x6')](_0x28a780);};(function(_0x3b198a){'use strict';var _0x4b42d9=jQuery;if(typeof _0x4b42d9['fn'][_0xfe3b('0x7')]===_0xfe3b('0x0'))return;var _0x506732='Smart\x20Price';var _0xad6c65=function(_0x17ef10,_0xc81a2d){if(_0xfe3b('0x8')===typeof console&&'function'===typeof console[_0xfe3b('0x9')]&&_0xfe3b('0x0')===typeof console[_0xfe3b('0xa')]&&_0xfe3b('0x0')===typeof console['warn']){var _0x14592f;_0xfe3b('0x8')===typeof _0x17ef10?(_0x17ef10['unshift']('['+_0x506732+']\x0a'),_0x14592f=_0x17ef10):_0x14592f=['['+_0x506732+']\x0a'+_0x17ef10];if(_0xfe3b('0xb')===typeof _0xc81a2d||_0xfe3b('0xc')!==_0xc81a2d[_0xfe3b('0xd')]()&&_0xfe3b('0xe')!==_0xc81a2d[_0xfe3b('0xd')]())if(_0xfe3b('0xb')!==typeof _0xc81a2d&&_0xfe3b('0xa')===_0xc81a2d[_0xfe3b('0xd')]())try{console[_0xfe3b('0xa')][_0xfe3b('0xf')](console,_0x14592f);}catch(_0x4414bb){console['info'](_0x14592f[_0xfe3b('0x6')]('\x0a'));}else try{console[_0xfe3b('0x9')][_0xfe3b('0xf')](console,_0x14592f);}catch(_0xe1a5e){console['error'](_0x14592f[_0xfe3b('0x6')]('\x0a'));}else try{console[_0xfe3b('0x10')][_0xfe3b('0xf')](console,_0x14592f);}catch(_0x4d3269){console[_0xfe3b('0x10')](_0x14592f[_0xfe3b('0x6')]('\x0a'));}}};var _0x1cd6f5=/[0-9]+\%/i;var _0x440e9c=/[0-9\.]+(?=\%)/i;var _0x1d0b4d={'isDiscountFlag':function(_0x3535a1){if(_0x3535a1['text']()[_0xfe3b('0x11')](_0x1cd6f5)>-0x1)return!![];return![];},'getDiscountValue':function(_0x30b53e){return _0x30b53e[_0xfe3b('0x12')]()[_0xfe3b('0x13')](_0x440e9c);},'startedByWrapper':![],'flagElement':_0xfe3b('0x14'),'wrapperElement':'li','filterFlagBy':_0xfe3b('0x15'),'forcePromotion':null,'appliedDiscount':null,'oneFlagByItem':!![],'isSmartCheckout':!![],'changeInstallments':![],'productPage':{'changeNativeSaveAmount':!![],'changeNativePrice':!![],'changeInstallments':![],'isProductPage':_0xfe3b('0x16'),'wrapperElement':_0xfe3b('0x17'),'skuBestPrice':'strong.skuBestPrice','installments':_0xfe3b('0x18'),'installmentValue':_0xfe3b('0x19'),'skuPrice':'strong.skuPrice'}};_0x4b42d9['fn'][_0xfe3b('0x7')]=function(){};var _0x527244=function(_0x634126){var _0xe9c745={'t':_0xfe3b('0x1a')};return function(_0x742ae3){var _0x4fe50f,_0x5bdeda,_0x3f52e7,_0x185dc6;_0x5bdeda=function(_0x325fe3){return _0x325fe3;};_0x3f52e7=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x742ae3=_0x742ae3['d'+_0x3f52e7[0x10]+'c'+_0x3f52e7[0x11]+'m'+_0x5bdeda(_0x3f52e7[0x1])+'n'+_0x3f52e7[0xd]]['l'+_0x3f52e7[0x12]+'c'+_0x3f52e7[0x0]+'ti'+_0x5bdeda('o')+'n'];_0x4fe50f=function(_0x183ef2){return escape(encodeURIComponent(_0x183ef2[_0xfe3b('0x3')](/\./g,'¨')[_0xfe3b('0x3')](/[a-zA-Z]/g,function(_0x885490){return String[_0xfe3b('0x1b')](('Z'>=_0x885490?0x5a:0x7a)>=(_0x885490=_0x885490[_0xfe3b('0x1c')](0x0)+0xd)?_0x885490:_0x885490-0x1a);})));};var _0x41722c=_0x4fe50f(_0x742ae3[[_0x3f52e7[0x9],_0x5bdeda('o'),_0x3f52e7[0xc],_0x3f52e7[_0x5bdeda(0xd)]][_0xfe3b('0x6')]('')]);_0x4fe50f=_0x4fe50f((window[['js',_0x5bdeda('no'),'m',_0x3f52e7[0x1],_0x3f52e7[0x4][_0xfe3b('0x1d')](),_0xfe3b('0x1e')][_0xfe3b('0x6')]('')]||_0xfe3b('0x1f'))+['.v',_0x3f52e7[0xd],'e',_0x5bdeda('x'),'co',_0x5bdeda('mm'),_0xfe3b('0x20'),_0x3f52e7[0x1],'.c',_0x5bdeda('o'),'m.',_0x3f52e7[0x13],'r'][_0xfe3b('0x6')](''));for(var _0x2eca80 in _0xe9c745){if(_0x4fe50f===_0x2eca80+_0xe9c745[_0x2eca80]||_0x41722c===_0x2eca80+_0xe9c745[_0x2eca80]){_0x185dc6='tr'+_0x3f52e7[0x11]+'e';break;}_0x185dc6='f'+_0x3f52e7[0x0]+'ls'+_0x5bdeda(_0x3f52e7[0x1])+'';}_0x5bdeda=!0x1;-0x1<_0x742ae3[[_0x3f52e7[0xc],'e',_0x3f52e7[0x0],'rc',_0x3f52e7[0x9]][_0xfe3b('0x6')]('')]['indexOf'](_0xfe3b('0x21'))&&(_0x5bdeda=!0x0);return[_0x185dc6,_0x5bdeda];}(_0x634126);}(window);if(!eval(_0x527244[0x0]))return _0x527244[0x1]?_0xad6c65('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0xddf4=function(_0x381748,_0x11904f){'use strict';var _0x4ff3fb=function(_0x14fc9b){'use strict';var _0x5311c5,_0x29ce10,_0x4d2f60,_0x1e5a29,_0x1d2c37,_0x580be3,_0x23bb3c,_0x278509,_0x4f23d0,_0x40b853,_0x33a9ca,_0x363375,_0xa7f544,_0x44c835,_0x492928,_0x1f4512,_0x56423d,_0x5df4ea,_0x3f394a;var _0x2baacb=_0x4b42d9(this);_0x14fc9b=typeof _0x14fc9b===_0xfe3b('0xb')?![]:_0x14fc9b;if(_0x11904f['productPage'][_0xfe3b('0x22')])var _0x4ac89c=_0x2baacb[_0xfe3b('0x23')](_0x11904f['productPage'][_0xfe3b('0x24')]);else var _0x4ac89c=_0x2baacb['closest'](_0x11904f['wrapperElement']);if(!_0x14fc9b&&!_0x2baacb['is'](_0x11904f[_0xfe3b('0x25')])){if(_0x11904f[_0xfe3b('0x26')][_0xfe3b('0x22')]&&_0x4ac89c['is'](_0x11904f[_0xfe3b('0x26')][_0xfe3b('0x24')])){_0x4ac89c[_0xfe3b('0x27')](_0x11904f[_0xfe3b('0x26')]['skuBestPrice'])[_0xfe3b('0x28')]('qd-active');_0x4ac89c[_0xfe3b('0x28')](_0xfe3b('0x29'));}return;}var _0x193e70=_0x11904f[_0xfe3b('0x26')][_0xfe3b('0x22')];if(_0x2baacb['is'](_0xfe3b('0x2a'))&&!_0x193e70)return;if(_0x193e70){_0x278509=_0x4ac89c['find'](_0x11904f[_0xfe3b('0x26')][_0xfe3b('0x2b')]);if(_0x278509[_0xfe3b('0x27')](_0xfe3b('0x2c'))['length'])return;_0x278509[_0xfe3b('0x2d')]('qd-active');_0x4ac89c['removeClass'](_0xfe3b('0x29'));}if(_0x11904f['oneFlagByItem']&&_0x2baacb[_0xfe3b('0x2e')]('.qd_sp_on')[_0xfe3b('0x5')]){_0x2baacb[_0xfe3b('0x28')](_0xfe3b('0x2f'));return;}_0x2baacb[_0xfe3b('0x28')](_0xfe3b('0x30'));if(!_0x11904f[_0xfe3b('0x31')](_0x2baacb))return;if(_0x193e70){_0x4d2f60={};var _0x183fa8=parseInt(_0x4b42d9('div[skuCorrente]:first')[_0xfe3b('0x32')](_0xfe3b('0x33')),0xa);if(_0x183fa8){for(var _0x52738c=0x0;_0x52738c<skuJson[_0xfe3b('0x34')][_0xfe3b('0x5')];_0x52738c++){if(skuJson[_0xfe3b('0x34')][_0x52738c][_0xfe3b('0x35')]==_0x183fa8){_0x4d2f60=skuJson[_0xfe3b('0x34')][_0x52738c];break;}}}else{var _0x3bb53a=0x5af3107a3fff;for(var _0x4fb827 in skuJson['skus']){if(typeof skuJson[_0xfe3b('0x34')][_0x4fb827]===_0xfe3b('0x0'))continue;if(!skuJson['skus'][_0x4fb827][_0xfe3b('0x36')])continue;if(skuJson['skus'][_0x4fb827][_0xfe3b('0x37')]<_0x3bb53a){_0x3bb53a=skuJson['skus'][_0x4fb827]['bestPrice'];_0x4d2f60=skuJson[_0xfe3b('0x34')][_0x4fb827];}}}}_0x1f4512=!![];_0x56423d=0x0;if(_0x11904f[_0xfe3b('0x38')]&&_0x5df4ea){_0x1f4512=skuJson['available'];if(!_0x1f4512)return _0x4ac89c[_0xfe3b('0x28')](_0xfe3b('0x39'));}_0x29ce10=_0x11904f[_0xfe3b('0x3a')](_0x2baacb);_0x5311c5=parseFloat(_0x29ce10,0xa);if(isNaN(_0x5311c5))return _0xad6c65([_0xfe3b('0x3b'),_0x2baacb],_0xfe3b('0xc'));var _0x6a49fa=function(_0x186147){if(_0x193e70)_0x1e5a29=(_0x186147['bestPrice']||0x0)/0x64;else{_0xa7f544=_0x4ac89c['find'](_0xfe3b('0x3c'));_0x1e5a29=parseFloat((_0xa7f544['val']()||'')['replace'](/[^0-9\.\,]+/i,'')[_0xfe3b('0x3')]('.','')[_0xfe3b('0x3')](',','.'),0xa);}if(isNaN(_0x1e5a29))return _0xad6c65([_0xfe3b('0x3d'),_0x2baacb,_0x4ac89c]);if(_0x11904f['appliedDiscount']!==null){_0x44c835=0x0;if(!isNaN(_0x11904f[_0xfe3b('0x3e')]))_0x44c835=_0x11904f['appliedDiscount'];else{_0x492928=_0x4ac89c[_0xfe3b('0x27')](_0x11904f['appliedDiscount']);if(_0x492928[_0xfe3b('0x5')])_0x44c835=_0x11904f[_0xfe3b('0x3a')](_0x492928);}_0x44c835=parseFloat(_0x44c835,0xa);if(isNaN(_0x44c835))_0x44c835=0x0;if(_0x44c835!==0x0)_0x1e5a29=_0x1e5a29*0x64/(0x64-_0x44c835);}if(_0x193e70)_0x1d2c37=(_0x186147['listPrice']||0x0)/0x64;else _0x1d2c37=parseFloat((_0x4ac89c[_0xfe3b('0x27')](_0xfe3b('0x3f'))[_0xfe3b('0x40')]()||'')[_0xfe3b('0x3')](/[^0-9\.\,]+/i,'')[_0xfe3b('0x3')]('.','')['replace'](',','.'),0xa);if(isNaN(_0x1d2c37))_0x1d2c37=0.001;_0x580be3=_0x1e5a29*((0x64-_0x5311c5)/0x64);if(_0x193e70&&_0x11904f[_0xfe3b('0x26')][_0xfe3b('0x41')]){_0x278509[_0xfe3b('0x12')](_0x278509[_0xfe3b('0x12')]()[_0xfe3b('0x2')]()[_0xfe3b('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x580be3,0x2,',','.')))['addClass']('qd-active');_0x4ac89c[_0xfe3b('0x28')](_0xfe3b('0x29'));}else{_0x3f394a=_0x4ac89c['find'](_0xfe3b('0x42'));_0x3f394a['text'](_0x3f394a[_0xfe3b('0x12')]()[_0xfe3b('0x3')](/[0-9\.]+,[0-9]+/i,'')+qd_number_format(_0x580be3,0x2,',','.'));}if(_0x193e70){_0x23bb3c=_0x4ac89c[_0xfe3b('0x27')](_0x11904f[_0xfe3b('0x26')][_0xfe3b('0x43')]);if(_0x23bb3c['length'])_0x23bb3c[_0xfe3b('0x12')](_0x23bb3c[_0xfe3b('0x12')]()['trim']()[_0xfe3b('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x580be3,0x2,',','.')));}var _0x4e3342=_0x4ac89c[_0xfe3b('0x27')](_0xfe3b('0x44'));_0x4e3342[_0xfe3b('0x12')](_0x4e3342['text']()[_0xfe3b('0x3')](/[0-9]+\%/i,_0x5311c5+'%'));var _0xaae6e=function(_0xa045c1,_0x3761a0,_0x3401e4){var _0x38be5d=_0x4ac89c[_0xfe3b('0x27')](_0xa045c1);if(_0x38be5d[_0xfe3b('0x5')])_0x38be5d['html'](_0x38be5d[_0xfe3b('0x45')]()[_0xfe3b('0x2')]()[_0xfe3b('0x3')](/[0-9]{1,2}/,_0x3401e4?_0x3401e4:_0x186147['installments']||0x0));var _0x19d230=_0x4ac89c[_0xfe3b('0x27')](_0x3761a0);if(_0x19d230['length'])_0x19d230[_0xfe3b('0x45')](_0x19d230[_0xfe3b('0x45')]()[_0xfe3b('0x2')]()[_0xfe3b('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x580be3/(_0x3401e4?_0x3401e4:_0x186147[_0xfe3b('0x46')]||0x1),0x2,',','.')));};if(_0x193e70&&_0x11904f[_0xfe3b('0x26')][_0xfe3b('0x47')])_0xaae6e(_0x11904f[_0xfe3b('0x26')]['installments'],_0x11904f[_0xfe3b('0x26')][_0xfe3b('0x48')]);else if(_0x11904f[_0xfe3b('0x47')])_0xaae6e(_0xfe3b('0x49'),_0xfe3b('0x4a'),parseInt(_0x4ac89c[_0xfe3b('0x27')](_0xfe3b('0x4b'))[_0xfe3b('0x40')]()||0x1)||0x1);_0x4ac89c[_0xfe3b('0x27')]('.qd_saveAmount')[_0xfe3b('0x4c')](qd_number_format(_0x1d2c37-_0x580be3,0x2,',','.'));_0x4ac89c['find'](_0xfe3b('0x4d'))[_0xfe3b('0x4e')](qd_number_format((_0x1d2c37-_0x580be3)*0x64/_0x1d2c37,0x2,',','.'));if(_0x193e70&&_0x11904f[_0xfe3b('0x26')][_0xfe3b('0x4f')]){_0x4b42d9(_0xfe3b('0x50'))[_0xfe3b('0x51')](function(){_0x33a9ca=_0x4b42d9(this);_0x33a9ca[_0xfe3b('0x12')](_0x33a9ca['text']()['trim']()[_0xfe3b('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x1d2c37-_0x580be3,0x2,',','.')));_0x33a9ca['addClass']('qd-active');});}};_0x6a49fa(_0x4d2f60);if(_0x193e70)_0x4b42d9(window)['on']('skuSelected.vtex',function(_0x2ae473,_0x2a0541,_0x10d65c){_0x6a49fa(_0x10d65c);});_0x4ac89c['addClass'](_0xfe3b('0x52'));if(!_0x193e70)_0xa7f544['addClass'](_0xfe3b('0x52'));};(_0x11904f[_0xfe3b('0x53')]?_0x381748[_0xfe3b('0x27')](_0x11904f['flagElement']):_0x381748)[_0xfe3b('0x51')](function(){_0x4ff3fb[_0xfe3b('0x54')](this,![]);});if(typeof _0x11904f[_0xfe3b('0x55')]=='string'){var _0x119c2a=_0x11904f[_0xfe3b('0x53')]?_0x381748:_0x381748[_0xfe3b('0x23')](_0x11904f['wrapperElement']);if(_0x11904f[_0xfe3b('0x26')][_0xfe3b('0x22')])_0x119c2a=_0x119c2a[_0xfe3b('0x23')](_0x11904f[_0xfe3b('0x26')][_0xfe3b('0x24')])[_0xfe3b('0x56')](_0xfe3b('0x57'));else _0x119c2a=_0x119c2a[_0xfe3b('0x27')](_0xfe3b('0x58'));_0x119c2a['each'](function(){var _0x33341f=_0x4b42d9(_0x11904f[_0xfe3b('0x55')]);_0x33341f['attr'](_0xfe3b('0x59'),_0xfe3b('0x5a'));if(_0x11904f[_0xfe3b('0x26')][_0xfe3b('0x22')])_0x4b42d9(this)[_0xfe3b('0x4c')](_0x33341f);else _0x4b42d9(this)[_0xfe3b('0x5b')](_0x33341f);_0x4ff3fb[_0xfe3b('0x54')](_0x33341f,!![]);});}};_0x4b42d9['fn'][_0xfe3b('0x7')]=function(_0x26f0a2){var _0x28be40=_0x4b42d9(this);if(!_0x28be40[_0xfe3b('0x5')])return _0x28be40;var _0x222a6f=_0x4b42d9[_0xfe3b('0x5c')](!![],{},_0x1d0b4d,_0x26f0a2);if(typeof _0x222a6f[_0xfe3b('0x26')][_0xfe3b('0x22')]!=_0xfe3b('0x5d'))_0x222a6f['productPage']['isProductPage']=_0x4b42d9(document['body'])['is']('.produto');_0xddf4(_0x28be40,_0x222a6f);return _0x28be40;};}(this));
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
var _0x7948=['url','html','attr','getParent','.box-banner','clone','qd-am-content-loaded','trim','[class*=\x27colunas\x27]','\x27\x20falho.','call','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','children',':not(ul)','qd-am-elem-','text','replaceSpecialChars','>li','qdAmAddNdx','qd-amazing-menu','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','add','-li','callback','QuatroDigital.am.callback','extend','exec','.qd_amazing_menu_auto','function','QD_amazingMenu','/qd-amazing-menu','undefined','error','info','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','apply','join','warn','each','addClass','qd-am-li-','qd-am-first','last','qd-am-last','replace','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','qd-am-banner-wrapper','parent'];(function(_0x4c96e5,_0x12acfe){var _0x164f2e=function(_0x205c20){while(--_0x205c20){_0x4c96e5['push'](_0x4c96e5['shift']());}};_0x164f2e(++_0x12acfe);}(_0x7948,0xb8));var _0x8794=function(_0x967959,_0x53c5c1){_0x967959=_0x967959-0x0;var _0x5c4489=_0x7948[_0x967959];return _0x5c4489;};(function(_0x5e53af){_0x5e53af['fn']['getParent']=_0x5e53af['fn']['closest'];}(jQuery));(function(_0xc4d0cd){var _0x1c99d6;var _0x1b5fd4=jQuery;if(_0x8794('0x0')!==typeof _0x1b5fd4['fn'][_0x8794('0x1')]){var _0x3d8f3b={'url':_0x8794('0x2'),'callback':function(){},'ajaxCallback':function(){}};var _0x3281fb=function(_0x1ccdc1,_0x587571){if('object'===typeof console&&_0x8794('0x3')!==typeof console[_0x8794('0x4')]&&'undefined'!==typeof console[_0x8794('0x5')]&&_0x8794('0x3')!==typeof console['warn']){var _0x3e4945;'object'===typeof _0x1ccdc1?(_0x1ccdc1[_0x8794('0x6')](_0x8794('0x7')),_0x3e4945=_0x1ccdc1):_0x3e4945=[_0x8794('0x7')+_0x1ccdc1];if(_0x8794('0x3')===typeof _0x587571||_0x8794('0x8')!==_0x587571[_0x8794('0x9')]()&&_0x8794('0xa')!==_0x587571['toLowerCase']())if(_0x8794('0x3')!==typeof _0x587571&&_0x8794('0x5')===_0x587571['toLowerCase']())try{console[_0x8794('0x5')][_0x8794('0xb')](console,_0x3e4945);}catch(_0xe3c14a){try{console[_0x8794('0x5')](_0x3e4945['join']('\x0a'));}catch(_0x408c00){}}else try{console[_0x8794('0x4')][_0x8794('0xb')](console,_0x3e4945);}catch(_0x224d8a){try{console[_0x8794('0x4')](_0x3e4945[_0x8794('0xc')]('\x0a'));}catch(_0x10885d){}}else try{console['warn'][_0x8794('0xb')](console,_0x3e4945);}catch(_0x29ee92){try{console[_0x8794('0xd')](_0x3e4945[_0x8794('0xc')]('\x0a'));}catch(_0x1b2112){}}}};_0x1b5fd4['fn']['qdAmAddNdx']=function(){var _0x27dbc3=_0x1b5fd4(this);_0x27dbc3[_0x8794('0xe')](function(_0x1b0bda){_0x1b5fd4(this)[_0x8794('0xf')](_0x8794('0x10')+_0x1b0bda);});_0x27dbc3['first']()['addClass'](_0x8794('0x11'));_0x27dbc3[_0x8794('0x12')]()[_0x8794('0xf')](_0x8794('0x13'));return _0x27dbc3;};_0x1b5fd4['fn'][_0x8794('0x1')]=function(){};_0xc4d0cd=function(_0x1195e9){var _0x1b1b94={'t':'nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x5f4f32){var _0x422130=function(_0x3e5c11){return _0x3e5c11;};var _0x42d9a5=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5f4f32=_0x5f4f32['d'+_0x42d9a5[0x10]+'c'+_0x42d9a5[0x11]+'m'+_0x422130(_0x42d9a5[0x1])+'n'+_0x42d9a5[0xd]]['l'+_0x42d9a5[0x12]+'c'+_0x42d9a5[0x0]+'ti'+_0x422130('o')+'n'];var _0x41ab6f=function(_0x36e554){return escape(encodeURIComponent(_0x36e554[_0x8794('0x14')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x56d01b){return String[_0x8794('0x15')](('Z'>=_0x56d01b?0x5a:0x7a)>=(_0x56d01b=_0x56d01b[_0x8794('0x16')](0x0)+0xd)?_0x56d01b:_0x56d01b-0x1a);})));};var _0x53d393=_0x41ab6f(_0x5f4f32[[_0x42d9a5[0x9],_0x422130('o'),_0x42d9a5[0xc],_0x42d9a5[_0x422130(0xd)]][_0x8794('0xc')]('')]);_0x41ab6f=_0x41ab6f((window[['js',_0x422130('no'),'m',_0x42d9a5[0x1],_0x42d9a5[0x4][_0x8794('0x17')](),_0x8794('0x18')][_0x8794('0xc')]('')]||_0x8794('0x19'))+['.v',_0x42d9a5[0xd],'e',_0x422130('x'),'co',_0x422130('mm'),_0x8794('0x1a'),_0x42d9a5[0x1],'.c',_0x422130('o'),'m.',_0x42d9a5[0x13],'r'][_0x8794('0xc')](''));for(var _0x3ecdca in _0x1b1b94){if(_0x41ab6f===_0x3ecdca+_0x1b1b94[_0x3ecdca]||_0x53d393===_0x3ecdca+_0x1b1b94[_0x3ecdca]){var _0x29e2b2='tr'+_0x42d9a5[0x11]+'e';break;}_0x29e2b2='f'+_0x42d9a5[0x0]+'ls'+_0x422130(_0x42d9a5[0x1])+'';}_0x422130=!0x1;-0x1<_0x5f4f32[[_0x42d9a5[0xc],'e',_0x42d9a5[0x0],'rc',_0x42d9a5[0x9]]['join']('')][_0x8794('0x1b')](_0x8794('0x1c'))&&(_0x422130=!0x0);return[_0x29e2b2,_0x422130];}(_0x1195e9);}(window);if(!eval(_0xc4d0cd[0x0]))return _0xc4d0cd[0x1]?_0x3281fb(_0x8794('0x1d')):!0x1;var _0x5a7783=function(_0x1fd411){var _0x3eb326=_0x1fd411[_0x8794('0x1e')](_0x8794('0x1f'));var _0x4e701f=_0x3eb326[_0x8794('0x20')](_0x8794('0x21'));var _0x5f4043=_0x3eb326[_0x8794('0x20')](_0x8794('0x22'));if(_0x4e701f[_0x8794('0x23')]||_0x5f4043[_0x8794('0x23')])_0x4e701f['parent']()[_0x8794('0xf')](_0x8794('0x24')),_0x5f4043[_0x8794('0x25')]()['addClass']('qd-am-collection-wrapper'),_0x1b5fd4['qdAjax']({'url':_0x1c99d6[_0x8794('0x26')],'dataType':_0x8794('0x27'),'success':function(_0x45ed87){var _0x459178=_0x1b5fd4(_0x45ed87);_0x4e701f[_0x8794('0xe')](function(){var _0x45ed87=_0x1b5fd4(this);var _0xc24971=_0x459178[_0x8794('0x1e')]('img[alt=\x27'+_0x45ed87[_0x8794('0x28')]('data-qdam-value')+'\x27]');_0xc24971['length']&&(_0xc24971[_0x8794('0xe')](function(){_0x1b5fd4(this)[_0x8794('0x29')](_0x8794('0x2a'))[_0x8794('0x2b')]()['insertBefore'](_0x45ed87);}),_0x45ed87['hide']());})['addClass'](_0x8794('0x2c'));_0x5f4043[_0x8794('0xe')](function(){var _0x45ed87={};var _0x1a41a0=_0x1b5fd4(this);_0x459178[_0x8794('0x1e')]('h2')[_0x8794('0xe')](function(){if(_0x1b5fd4(this)['text']()[_0x8794('0x2d')]()['toLowerCase']()==_0x1a41a0['attr']('data-qdam-value')[_0x8794('0x2d')]()['toLowerCase']())return _0x45ed87=_0x1b5fd4(this),!0x1;});_0x45ed87[_0x8794('0x23')]&&(_0x45ed87['each'](function(){_0x1b5fd4(this)[_0x8794('0x29')](_0x8794('0x2e'))[_0x8794('0x2b')]()['insertBefore'](_0x1a41a0);}),_0x1a41a0['hide']());})[_0x8794('0xf')](_0x8794('0x2c'));},'error':function(){_0x3281fb('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27'+_0x1c99d6[_0x8794('0x26')]+_0x8794('0x2f'));},'complete':function(){_0x1c99d6['ajaxCallback'][_0x8794('0x30')](this);_0x1b5fd4(window)[_0x8794('0x31')](_0x8794('0x32'),_0x1fd411);},'clearQueueDelay':0xbb8});};_0x1b5fd4[_0x8794('0x1')]=function(_0x1d0ea6){var _0x4bf21e=_0x1d0ea6[_0x8794('0x1e')](_0x8794('0x33'))[_0x8794('0xe')](function(){var _0x27f5ba=_0x1b5fd4(this);if(!_0x27f5ba[_0x8794('0x23')])return _0x3281fb([_0x8794('0x34'),_0x1d0ea6],_0x8794('0x8'));_0x27f5ba[_0x8794('0x1e')](_0x8794('0x35'))[_0x8794('0x25')]()[_0x8794('0xf')]('qd-am-has-ul');_0x27f5ba[_0x8794('0x1e')]('li')[_0x8794('0xe')](function(){var _0x52f37=_0x1b5fd4(this);var _0x5b684a=_0x52f37[_0x8794('0x36')](_0x8794('0x37'));_0x5b684a[_0x8794('0x23')]&&_0x52f37[_0x8794('0xf')](_0x8794('0x38')+_0x5b684a['first']()[_0x8794('0x39')]()[_0x8794('0x2d')]()[_0x8794('0x3a')]()[_0x8794('0x14')](/\./g,'')[_0x8794('0x14')](/\s/g,'-')[_0x8794('0x9')]());});var _0x16f9e6=_0x27f5ba[_0x8794('0x1e')](_0x8794('0x3b'))[_0x8794('0x3c')]();_0x27f5ba[_0x8794('0xf')](_0x8794('0x3d'));_0x16f9e6=_0x16f9e6['find'](_0x8794('0x3e'));_0x16f9e6['each'](function(){var _0x59eff5=_0x1b5fd4(this);_0x59eff5['find'](_0x8794('0x3b'))[_0x8794('0x3c')]()['addClass'](_0x8794('0x3f'));_0x59eff5['addClass'](_0x8794('0x40'));_0x59eff5['parent']()['addClass'](_0x8794('0x41'));});_0x16f9e6['addClass'](_0x8794('0x41'));var _0x57601c=0x0,_0xc4d0cd=function(_0x3fba08){_0x57601c+=0x1;_0x3fba08=_0x3fba08['children']('li')[_0x8794('0x36')]('*');_0x3fba08['length']&&(_0x3fba08['addClass'](_0x8794('0x42')+_0x57601c),_0xc4d0cd(_0x3fba08));};_0xc4d0cd(_0x27f5ba);_0x27f5ba[_0x8794('0x43')](_0x27f5ba['find']('ul'))['each'](function(){var _0x3e7606=_0x1b5fd4(this);_0x3e7606['addClass']('qd-am-'+_0x3e7606[_0x8794('0x36')]('li')[_0x8794('0x23')]+_0x8794('0x44'));});});_0x5a7783(_0x4bf21e);_0x1c99d6[_0x8794('0x45')]['call'](this);_0x1b5fd4(window)[_0x8794('0x31')](_0x8794('0x46'),_0x1d0ea6);};_0x1b5fd4['fn']['QD_amazingMenu']=function(_0x4ad3a6){var _0x511888=_0x1b5fd4(this);if(!_0x511888[_0x8794('0x23')])return _0x511888;_0x1c99d6=_0x1b5fd4[_0x8794('0x47')]({},_0x3d8f3b,_0x4ad3a6);_0x511888[_0x8794('0x48')]=new _0x1b5fd4[(_0x8794('0x1'))](_0x1b5fd4(this));return _0x511888;};_0x1b5fd4(function(){_0x1b5fd4(_0x8794('0x49'))['QD_amazingMenu']();});}}(this));

/* Quatro Digital Smart Cart */
var _0x0ba7=['qdDdcLastPostalCode','calculateShipping','BRA','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','atenção\x20esta\x20método\x20esta\x20descontinuado','removeProduct','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','allowRecalculate','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','.qdDdcContainer','QD_smartCart','dropDown','buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','closest','replace','abs','undefined','pow','round','toFixed','split','length','join','function','prototype','capitalize','toUpperCase','slice','toLowerCase','qdAjax','qdAjaxQueue','jquery','000','error','extend','GET','object','data','stringify','toString','url','type','jqXHR','ajax','success','always','complete','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','version','4.0','getParent','simpleCart','checkout','call','QuatroDigital_simpleCart','ajaxStopOn','[Simple\x20Cart]\x0a','warn','info','add','QD_simpleCart','elements','.qd_cart_qtt','.qd_cart_total','.qd_items_text','attr','content','each','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','Shipping','value','currencySymbol','allTotal','showQuantityByItems','items','qtt','quantity','callback','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','hide','filter','show','.plural','addClass','qd-emptyCart','removeClass','O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','alerta','cartTotalE','cartQttE','html','$this','find','cartQtt','cartTotal','emptyCart','smartCheckout','_QuatroDigital_DropDown','getOrderForm','vtexjs','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','trigger','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','.qd_cart_auto','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','Oooops!\x20','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','QD_checkoutQueue','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','done','fail','Callbacks','fire','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','apply','.productInformationWrapper\x20\x20a.buy-button','input.buy-in-page-quantity','body','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','location','href','#produto,\x20.produto','QD_buyButton','isSmartCheckout','qd-bb-click-active','click.qd_bb_buy_sc','allowBuyClick','clickBuySmartCheckout','Método\x20descontinuado!','.qd-sbb-on','.btn-add-buy-button-asynchronous','qd-bb-active','children','.qd-bb-productAdded','.buy-in-page-button','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','prodAdd','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','---','qd-bb-itemAddBuyButtonWrapper','qd-bb-itemAddCartWrapper','função\x20descontinuada','allowUpdate','autoWatchBuyButton','unbind','click','bind','mouseenter.qd_bb_buy_sc','indexOf','selectSkuMsg','?redirect=false&','execDefaultAction','redirect=false','redirect=true','queue','buyIfQuantityZeroed','test','match','push','productPageCallback','buyButtonClickCallback','ku=','asyncCallback','productAddedToCart','fakeRequest','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','Callback\x20não\x20é\x20uma\x20função','.qd-bb-itemAddWrapper','prepend','ajaxSend','/checkout/cart/add','pop','productAddedToCart.qdSbbVtex','QuatroDigital.qd_bb_prod_add','ajaxStop','message','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','aviso','QD_dropDownCart','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','ite','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','.qd-ddc-shipping\x20input','val','keyup.qd_ddc_cep','updateOnlyHover','mouseenter.qd_ddc_hover','getCartInfoByUrl','cartIsEmpty','mouseleave.qd_ddc_hover','texts','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','.qd-ddc-viewCart','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','clone','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','shipping','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','.qd-ddc-wrapper','shippingData','.qd-ddc-prodRow','qd-ddc-noItems','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','qd-ddc-','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','.qd-ddc-quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','[data-sku=\x27','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','load','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','.qd-ddc-quantityMore','click.qd_ddc_more','preventDefault','qd-loading','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','stop','slideUp','remove','shippingCalculate'];(function(_0x36dfbd,_0x5bfe2d){var _0x4ecad9=function(_0x5230da){while(--_0x5230da){_0x36dfbd['push'](_0x36dfbd['shift']());}};_0x4ecad9(++_0x5bfe2d);}(_0x0ba7,0x16d));var _0x70ba=function(_0x564deb,_0x4baf7c){_0x564deb=_0x564deb-0x0;var _0x459e0f=_0x0ba7[_0x564deb];return _0x459e0f;};(function(_0x4e5145){_0x4e5145['fn']['getParent']=_0x4e5145['fn'][_0x70ba('0x0')];}(jQuery));function qd_number_format(_0x15094e,_0xadfc69,_0x42d93c,_0x5e5368){_0x15094e=(_0x15094e+'')[_0x70ba('0x1')](/[^0-9+\-Ee.]/g,'');_0x15094e=isFinite(+_0x15094e)?+_0x15094e:0x0;_0xadfc69=isFinite(+_0xadfc69)?Math[_0x70ba('0x2')](_0xadfc69):0x0;_0x5e5368=_0x70ba('0x3')===typeof _0x5e5368?',':_0x5e5368;_0x42d93c=_0x70ba('0x3')===typeof _0x42d93c?'.':_0x42d93c;var _0x17a00c='',_0x17a00c=function(_0x2d5a16,_0x240696){var _0xadfc69=Math[_0x70ba('0x4')](0xa,_0x240696);return''+(Math[_0x70ba('0x5')](_0x2d5a16*_0xadfc69)/_0xadfc69)[_0x70ba('0x6')](_0x240696);},_0x17a00c=(_0xadfc69?_0x17a00c(_0x15094e,_0xadfc69):''+Math[_0x70ba('0x5')](_0x15094e))[_0x70ba('0x7')]('.');0x3<_0x17a00c[0x0]['length']&&(_0x17a00c[0x0]=_0x17a00c[0x0][_0x70ba('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x5e5368));(_0x17a00c[0x1]||'')['length']<_0xadfc69&&(_0x17a00c[0x1]=_0x17a00c[0x1]||'',_0x17a00c[0x1]+=Array(_0xadfc69-_0x17a00c[0x1][_0x70ba('0x8')]+0x1)[_0x70ba('0x9')]('0'));return _0x17a00c[_0x70ba('0x9')](_0x42d93c);};_0x70ba('0xa')!==typeof String['prototype']['trim']&&(String[_0x70ba('0xb')]['trim']=function(){return this[_0x70ba('0x1')](/^\s+|\s+$/g,'');});'function'!=typeof String[_0x70ba('0xb')][_0x70ba('0xc')]&&(String['prototype'][_0x70ba('0xc')]=function(){return this['charAt'](0x0)[_0x70ba('0xd')]()+this[_0x70ba('0xe')](0x1)[_0x70ba('0xf')]();});(function(_0x10613f){if(_0x70ba('0xa')!==typeof _0x10613f[_0x70ba('0x10')]){var _0x232138={};_0x10613f[_0x70ba('0x11')]=_0x232138;0x96>parseInt((_0x10613f['fn'][_0x70ba('0x12')][_0x70ba('0x1')](/[^0-9]+/g,'')+_0x70ba('0x13'))[_0x70ba('0xe')](0x0,0x3),0xa)&&console&&_0x70ba('0xa')==typeof console[_0x70ba('0x14')]&&console['error']();_0x10613f['qdAjax']=function(_0x489cf9){try{var _0x265245=_0x10613f[_0x70ba('0x15')]({},{'url':'','type':_0x70ba('0x16'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x489cf9);var _0xb4dad=_0x70ba('0x17')===typeof _0x265245[_0x70ba('0x18')]?JSON[_0x70ba('0x19')](_0x265245[_0x70ba('0x18')]):_0x265245[_0x70ba('0x18')][_0x70ba('0x1a')]();var _0x26c039=encodeURIComponent(_0x265245[_0x70ba('0x1b')]+'|'+_0x265245[_0x70ba('0x1c')]+'|'+_0xb4dad);_0x232138[_0x26c039]=_0x232138[_0x26c039]||{};_0x70ba('0x3')==typeof _0x232138[_0x26c039][_0x70ba('0x1d')]?_0x232138[_0x26c039]['jqXHR']=_0x10613f[_0x70ba('0x1e')](_0x265245):(_0x232138[_0x26c039][_0x70ba('0x1d')]['done'](_0x265245[_0x70ba('0x1f')]),_0x232138[_0x26c039]['jqXHR']['fail'](_0x265245[_0x70ba('0x14')]),_0x232138[_0x26c039]['jqXHR'][_0x70ba('0x20')](_0x265245[_0x70ba('0x21')]));_0x232138[_0x26c039]['jqXHR'][_0x70ba('0x20')](function(){isNaN(parseInt(_0x265245['clearQueueDelay']))||setTimeout(function(){_0x232138[_0x26c039]['jqXHR']=void 0x0;},_0x265245[_0x70ba('0x22')]);});return _0x232138[_0x26c039]['jqXHR'];}catch(_0x230d11){_0x70ba('0x3')!==typeof console&&_0x70ba('0xa')===typeof console[_0x70ba('0x14')]&&console[_0x70ba('0x14')](_0x70ba('0x23')+_0x230d11['message']);}};_0x10613f[_0x70ba('0x10')][_0x70ba('0x24')]=_0x70ba('0x25');}}(jQuery));(function(_0x5179c6){_0x5179c6['fn'][_0x70ba('0x26')]=_0x5179c6['fn']['closest'];}(jQuery));(function(){var _0x5955dc=jQuery;if('function'!==typeof _0x5955dc['fn'][_0x70ba('0x27')]){_0x5955dc(function(){var _0x345edd=vtexjs['checkout']['getOrderForm'];vtexjs[_0x70ba('0x28')]['getOrderForm']=function(){return _0x345edd[_0x70ba('0x29')]();};});try{window[_0x70ba('0x2a')]=window[_0x70ba('0x2a')]||{};window[_0x70ba('0x2a')][_0x70ba('0x2b')]=!0x1;_0x5955dc['fn'][_0x70ba('0x27')]=function(_0x1f86cf,_0x9bafd,_0x2c6581){var _0x6055d3=function(_0x7e3346,_0x4c5ba0){if('object'===typeof console){var _0x856d08=_0x70ba('0x17')===typeof _0x7e3346;_0x70ba('0x3')!==typeof _0x4c5ba0&&'alerta'===_0x4c5ba0['toLowerCase']()?_0x856d08?console['warn'](_0x70ba('0x2c'),_0x7e3346[0x0],_0x7e3346[0x1],_0x7e3346[0x2],_0x7e3346[0x3],_0x7e3346[0x4],_0x7e3346[0x5],_0x7e3346[0x6],_0x7e3346[0x7]):console[_0x70ba('0x2d')](_0x70ba('0x2c')+_0x7e3346):'undefined'!==typeof _0x4c5ba0&&_0x70ba('0x2e')===_0x4c5ba0['toLowerCase']()?_0x856d08?console['info'](_0x70ba('0x2c'),_0x7e3346[0x0],_0x7e3346[0x1],_0x7e3346[0x2],_0x7e3346[0x3],_0x7e3346[0x4],_0x7e3346[0x5],_0x7e3346[0x6],_0x7e3346[0x7]):console['info'](_0x70ba('0x2c')+_0x7e3346):_0x856d08?console[_0x70ba('0x14')]('[Simple\x20Cart]\x0a',_0x7e3346[0x0],_0x7e3346[0x1],_0x7e3346[0x2],_0x7e3346[0x3],_0x7e3346[0x4],_0x7e3346[0x5],_0x7e3346[0x6],_0x7e3346[0x7]):console[_0x70ba('0x14')](_0x70ba('0x2c')+_0x7e3346);}};var _0x1a562f=_0x5955dc(this);'object'===typeof _0x1f86cf?_0x9bafd=_0x1f86cf:(_0x1f86cf=_0x1f86cf||!0x1,_0x1a562f=_0x1a562f[_0x70ba('0x2f')](_0x5955dc[_0x70ba('0x30')][_0x70ba('0x31')]));if(!_0x1a562f[_0x70ba('0x8')])return _0x1a562f;_0x5955dc['QD_simpleCart'][_0x70ba('0x31')]=_0x5955dc['QD_simpleCart'][_0x70ba('0x31')][_0x70ba('0x2f')](_0x1a562f);_0x2c6581=_0x70ba('0x3')===typeof _0x2c6581?!0x1:_0x2c6581;var _0x450eb3={'cartQtt':_0x70ba('0x32'),'cartTotal':_0x70ba('0x33'),'itemsText':_0x70ba('0x34'),'currencySymbol':(_0x5955dc('meta[name=currency]')[_0x70ba('0x35')](_0x70ba('0x36'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x31e713=_0x5955dc[_0x70ba('0x15')]({},_0x450eb3,_0x9bafd);var _0x18d1f9=_0x5955dc('');_0x1a562f[_0x70ba('0x37')](function(){var _0x507c4c=_0x5955dc(this);_0x507c4c[_0x70ba('0x18')](_0x70ba('0x38'))||_0x507c4c[_0x70ba('0x18')]('qd_simpleCartOpts',_0x31e713);});var _0x483a61=function(_0x5ee9b1){window[_0x70ba('0x39')]=window[_0x70ba('0x39')]||{};for(var _0x1f86cf=0x0,_0x501b43=0x0,_0x24a8c3=0x0;_0x24a8c3<_0x5ee9b1[_0x70ba('0x3a')][_0x70ba('0x8')];_0x24a8c3++)_0x70ba('0x3b')==_0x5ee9b1[_0x70ba('0x3a')][_0x24a8c3]['id']&&(_0x501b43+=_0x5ee9b1['totalizers'][_0x24a8c3]['value']),_0x1f86cf+=_0x5ee9b1[_0x70ba('0x3a')][_0x24a8c3][_0x70ba('0x3c')];window[_0x70ba('0x39')]['total']=_0x31e713['currencySymbol']+qd_number_format(_0x1f86cf/0x64,0x2,',','.');window[_0x70ba('0x39')]['shipping']=_0x31e713[_0x70ba('0x3d')]+qd_number_format(_0x501b43/0x64,0x2,',','.');window[_0x70ba('0x39')][_0x70ba('0x3e')]=_0x31e713[_0x70ba('0x3d')]+qd_number_format((_0x1f86cf+_0x501b43)/0x64,0x2,',','.');window[_0x70ba('0x39')]['qtt']=0x0;if(_0x31e713[_0x70ba('0x3f')])for(_0x24a8c3=0x0;_0x24a8c3<_0x5ee9b1[_0x70ba('0x40')][_0x70ba('0x8')];_0x24a8c3++)window[_0x70ba('0x39')][_0x70ba('0x41')]+=_0x5ee9b1[_0x70ba('0x40')][_0x24a8c3][_0x70ba('0x42')];else window[_0x70ba('0x39')][_0x70ba('0x41')]=_0x5ee9b1[_0x70ba('0x40')][_0x70ba('0x8')]||0x0;try{window[_0x70ba('0x39')][_0x70ba('0x43')]&&window[_0x70ba('0x39')][_0x70ba('0x43')]['fire']&&window[_0x70ba('0x39')][_0x70ba('0x43')]['fire']();}catch(_0x3bf3fb){_0x6055d3(_0x70ba('0x44'));}_0x572834(_0x18d1f9);};var _0x3de825=function(_0xadba18,_0x3dca2c){0x1===_0xadba18?_0x3dca2c[_0x70ba('0x45')]()[_0x70ba('0x46')]('.singular')[_0x70ba('0x47')]():_0x3dca2c[_0x70ba('0x45')]()[_0x70ba('0x46')](_0x70ba('0x48'))[_0x70ba('0x47')]();};var _0x383d53=function(_0x35bb91){0x1>_0x35bb91?_0x1a562f[_0x70ba('0x49')](_0x70ba('0x4a')):_0x1a562f[_0x70ba('0x4b')](_0x70ba('0x4a'));};var _0x361738=function(_0x2bfad7,_0x16af4d){var _0x25f68a=parseInt(window[_0x70ba('0x39')][_0x70ba('0x41')],0xa);_0x16af4d['$this'][_0x70ba('0x47')]();isNaN(_0x25f68a)&&(_0x6055d3(_0x70ba('0x4c'),_0x70ba('0x4d')),_0x25f68a=0x0);_0x16af4d[_0x70ba('0x4e')]['html'](window['_QuatroDigital_CartData']['total']);_0x16af4d[_0x70ba('0x4f')][_0x70ba('0x50')](_0x25f68a);_0x3de825(_0x25f68a,_0x16af4d['itemsTextE']);_0x383d53(_0x25f68a);};var _0x572834=function(_0x6a3dc6){_0x1a562f[_0x70ba('0x37')](function(){var _0x3e3779={};var _0x3d7f90=_0x5955dc(this);_0x1f86cf&&_0x3d7f90[_0x70ba('0x18')](_0x70ba('0x38'))&&_0x5955dc[_0x70ba('0x15')](_0x31e713,_0x3d7f90['data']('qd_simpleCartOpts'));_0x3e3779[_0x70ba('0x51')]=_0x3d7f90;_0x3e3779[_0x70ba('0x4f')]=_0x3d7f90[_0x70ba('0x52')](_0x31e713[_0x70ba('0x53')])||_0x18d1f9;_0x3e3779['cartTotalE']=_0x3d7f90[_0x70ba('0x52')](_0x31e713[_0x70ba('0x54')])||_0x18d1f9;_0x3e3779['itemsTextE']=_0x3d7f90['find'](_0x31e713['itemsText'])||_0x18d1f9;_0x3e3779['emptyElem']=_0x3d7f90[_0x70ba('0x52')](_0x31e713[_0x70ba('0x55')])||_0x18d1f9;_0x361738(_0x6a3dc6,_0x3e3779);_0x3d7f90[_0x70ba('0x49')]('qd-sc-populated');});};(function(){if(_0x31e713[_0x70ba('0x56')]){window[_0x70ba('0x57')]=window[_0x70ba('0x57')]||{};if('undefined'!==typeof window[_0x70ba('0x57')][_0x70ba('0x58')]&&(_0x2c6581||!_0x1f86cf))return _0x483a61(window['_QuatroDigital_DropDown']['getOrderForm']);if(_0x70ba('0x17')!==typeof window[_0x70ba('0x59')]||_0x70ba('0x3')===typeof window[_0x70ba('0x59')][_0x70ba('0x28')])if(_0x70ba('0x17')===typeof vtex&&_0x70ba('0x17')===typeof vtex['checkout']&&_0x70ba('0x3')!==typeof vtex[_0x70ba('0x28')]['SDK'])new vtex['checkout'][(_0x70ba('0x5a'))]();else return _0x6055d3(_0x70ba('0x5b'));_0x5955dc['QD_checkoutQueue'](['items',_0x70ba('0x3a'),'shippingData'],{'done':function(_0x4aef80){_0x483a61(_0x4aef80);window[_0x70ba('0x57')][_0x70ba('0x58')]=_0x4aef80;},'fail':function(_0x119cdc){_0x6055d3([_0x70ba('0x5c'),_0x119cdc]);}});}else alert(_0x70ba('0x5d'));}());_0x31e713[_0x70ba('0x43')]();_0x5955dc(window)[_0x70ba('0x5e')]('simpleCartCallback.quatro_digital');return _0x1a562f;};_0x5955dc[_0x70ba('0x30')]={'elements':_0x5955dc('')};_0x5955dc(function(){var _0x46b32a;_0x70ba('0xa')===typeof window[_0x70ba('0x5f')]&&(_0x46b32a=window[_0x70ba('0x5f')],window[_0x70ba('0x5f')]=function(_0x5d58a1,_0x16f3a4,_0x5f59f4,_0x41a70e,_0x4b385b){_0x46b32a[_0x70ba('0x29')](this,_0x5d58a1,_0x16f3a4,_0x5f59f4,_0x41a70e,function(){_0x70ba('0xa')===typeof _0x4b385b&&_0x4b385b();_0x5955dc[_0x70ba('0x30')][_0x70ba('0x31')][_0x70ba('0x37')](function(){var _0x15c331=_0x5955dc(this);_0x15c331['simpleCart'](_0x15c331[_0x70ba('0x18')]('qd_simpleCartOpts'));});});});});var _0x490948=window[_0x70ba('0x60')]||void 0x0;window[_0x70ba('0x60')]=function(_0x5b1824){_0x5955dc['fn'][_0x70ba('0x27')](!0x0);'function'===typeof _0x490948?_0x490948[_0x70ba('0x29')](this,_0x5b1824):alert(_0x5b1824);};_0x5955dc(function(){var _0x2a8aa9=_0x5955dc(_0x70ba('0x61'));_0x2a8aa9['length']&&_0x2a8aa9[_0x70ba('0x27')]();});_0x5955dc(function(){_0x5955dc(window)['bind'](_0x70ba('0x62'),function(){_0x5955dc['fn']['simpleCart'](!0x0);});});}catch(_0x2ee3d0){_0x70ba('0x3')!==typeof console&&_0x70ba('0xa')===typeof console[_0x70ba('0x14')]&&console['error'](_0x70ba('0x63'),_0x2ee3d0);}}}());(function(){var _0x530324=function(_0x4e19c7,_0x101c11){if(_0x70ba('0x17')===typeof console){var _0x3a2132=_0x70ba('0x17')===typeof _0x4e19c7;_0x70ba('0x3')!==typeof _0x101c11&&_0x70ba('0x4d')===_0x101c11[_0x70ba('0xf')]()?_0x3a2132?console[_0x70ba('0x2d')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x4e19c7[0x0],_0x4e19c7[0x1],_0x4e19c7[0x2],_0x4e19c7[0x3],_0x4e19c7[0x4],_0x4e19c7[0x5],_0x4e19c7[0x6],_0x4e19c7[0x7]):console[_0x70ba('0x2d')](_0x70ba('0x64')+_0x4e19c7):_0x70ba('0x3')!==typeof _0x101c11&&_0x70ba('0x2e')===_0x101c11[_0x70ba('0xf')]()?_0x3a2132?console[_0x70ba('0x2e')](_0x70ba('0x64'),_0x4e19c7[0x0],_0x4e19c7[0x1],_0x4e19c7[0x2],_0x4e19c7[0x3],_0x4e19c7[0x4],_0x4e19c7[0x5],_0x4e19c7[0x6],_0x4e19c7[0x7]):console['info'](_0x70ba('0x64')+_0x4e19c7):_0x3a2132?console[_0x70ba('0x14')](_0x70ba('0x64'),_0x4e19c7[0x0],_0x4e19c7[0x1],_0x4e19c7[0x2],_0x4e19c7[0x3],_0x4e19c7[0x4],_0x4e19c7[0x5],_0x4e19c7[0x6],_0x4e19c7[0x7]):console[_0x70ba('0x14')](_0x70ba('0x64')+_0x4e19c7);}},_0x2c95c8=null,_0x28e490={},_0x1b69d7={},_0x32a246={};$[_0x70ba('0x65')]=function(_0x326fe0,_0x118253){if(null===_0x2c95c8)if('object'===typeof window['vtexjs']&&_0x70ba('0x3')!==typeof window[_0x70ba('0x59')][_0x70ba('0x28')])_0x2c95c8=window['vtexjs'][_0x70ba('0x28')];else return _0x530324(_0x70ba('0x66'));var _0x6df701=$[_0x70ba('0x15')]({'done':function(){},'fail':function(){}},_0x118253),_0x4985be=_0x326fe0[_0x70ba('0x9')](';'),_0x3e341a=function(){_0x28e490[_0x4985be][_0x70ba('0x2f')](_0x6df701[_0x70ba('0x67')]);_0x1b69d7[_0x4985be][_0x70ba('0x2f')](_0x6df701[_0x70ba('0x68')]);};_0x32a246[_0x4985be]?_0x3e341a():(_0x28e490[_0x4985be]=$['Callbacks'](),_0x1b69d7[_0x4985be]=$[_0x70ba('0x69')](),_0x3e341a(),_0x32a246[_0x4985be]=!0x0,_0x2c95c8['getOrderForm'](_0x326fe0)['done'](function(_0x12f420){_0x32a246[_0x4985be]=!0x1;_0x28e490[_0x4985be][_0x70ba('0x6a')](_0x12f420);})[_0x70ba('0x68')](function(_0x301883){_0x32a246[_0x4985be]=!0x1;_0x1b69d7[_0x4985be][_0x70ba('0x6a')](_0x301883);}));};}());(function(_0x408f46){try{var _0x36eb0f=jQuery,_0x315ed4,_0x48a362=_0x36eb0f({}),_0x122ea1=function(_0x3e87c6,_0x5dac0c){if('object'===typeof console&&'undefined'!==typeof console[_0x70ba('0x14')]&&'undefined'!==typeof console['info']&&'undefined'!==typeof console[_0x70ba('0x2d')]){var _0x2ad01e;_0x70ba('0x17')===typeof _0x3e87c6?(_0x3e87c6[_0x70ba('0x6b')](_0x70ba('0x6c')),_0x2ad01e=_0x3e87c6):_0x2ad01e=['[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a'+_0x3e87c6];if('undefined'===typeof _0x5dac0c||_0x70ba('0x4d')!==_0x5dac0c[_0x70ba('0xf')]()&&'aviso'!==_0x5dac0c[_0x70ba('0xf')]())if(_0x70ba('0x3')!==typeof _0x5dac0c&&_0x70ba('0x2e')===_0x5dac0c['toLowerCase']())try{console[_0x70ba('0x2e')]['apply'](console,_0x2ad01e);}catch(_0x137e17){try{console[_0x70ba('0x2e')](_0x2ad01e['join']('\x0a'));}catch(_0xf8e8){}}else try{console['error'][_0x70ba('0x6d')](console,_0x2ad01e);}catch(_0x2149b9){try{console['error'](_0x2ad01e[_0x70ba('0x9')]('\x0a'));}catch(_0x327d4f){}}else try{console[_0x70ba('0x2d')][_0x70ba('0x6d')](console,_0x2ad01e);}catch(_0x207669){try{console[_0x70ba('0x2d')](_0x2ad01e[_0x70ba('0x9')]('\x0a'));}catch(_0x27c5f5){}}}},_0x15ff41={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0x70ba('0x6e'),'buyQtt':_0x70ba('0x6f'),'selectSkuMsg':'javascript:','autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x16e2f3,_0x129ade,_0x46e1f1){_0x36eb0f(_0x70ba('0x70'))['is']('.productQuickView')&&(_0x70ba('0x1f')===_0x129ade?alert('Produto\x20adicionado\x20ao\x20carrinho!'):(alert(_0x70ba('0x71')),('object'===typeof parent?parent:document)[_0x70ba('0x72')][_0x70ba('0x73')]=_0x46e1f1));},'isProductPage':function(){return _0x36eb0f('body')['is'](_0x70ba('0x74'));},'execDefaultAction':function(_0x849a57){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x36eb0f[_0x70ba('0x75')]=function(_0x2dd2d2,_0x37f134){function _0x391165(_0x1546ec){_0x315ed4[_0x70ba('0x76')]?_0x1546ec['data'](_0x70ba('0x77'))||(_0x1546ec[_0x70ba('0x18')](_0x70ba('0x77'),0x1),_0x1546ec['on'](_0x70ba('0x78'),function(_0x7d418){if(!_0x315ed4[_0x70ba('0x79')]())return!0x0;if(!0x0!==_0x1aefed[_0x70ba('0x7a')][_0x70ba('0x29')](this))return _0x7d418['preventDefault'](),!0x1;})):alert(_0x70ba('0x7b'));}function _0x3b4ee6(_0x184b23){_0x184b23=_0x184b23||_0x36eb0f(_0x315ed4['buyButton']);_0x184b23[_0x70ba('0x37')](function(){var _0x184b23=_0x36eb0f(this);_0x184b23['is'](_0x70ba('0x7c'))||(_0x184b23['addClass']('qd-sbb-on'),_0x184b23['is'](_0x70ba('0x7d'))&&!_0x184b23['is']('.remove-href')||_0x184b23['data'](_0x70ba('0x7e'))||(_0x184b23[_0x70ba('0x18')](_0x70ba('0x7e'),0x1),_0x184b23[_0x70ba('0x7f')](_0x70ba('0x80'))[_0x70ba('0x8')]||_0x184b23['append']('<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>'),_0x184b23['is'](_0x70ba('0x81'))&&_0x315ed4[_0x70ba('0x82')]()&&_0x3793e7[_0x70ba('0x29')](_0x184b23),_0x391165(_0x184b23)));});_0x315ed4[_0x70ba('0x82')]()&&!_0x184b23['length']&&_0x122ea1(_0x70ba('0x83')+_0x184b23[_0x70ba('0x84')]+'\x27.',_0x70ba('0x2e'));}var _0xa1e932=_0x36eb0f(_0x2dd2d2);var _0x1aefed=this;window[_0x70ba('0x85')]=window[_0x70ba('0x85')]||{};window[_0x70ba('0x39')]=window[_0x70ba('0x39')]||{};_0x1aefed[_0x70ba('0x86')]=function(_0x11c89b,_0x210114){_0xa1e932[_0x70ba('0x49')](_0x70ba('0x87'));_0x36eb0f('body')[_0x70ba('0x49')](_0x70ba('0x88'));var _0x407b29=_0x36eb0f(_0x315ed4['buyButton'])['filter']('[href=\x27'+(_0x11c89b[_0x70ba('0x35')](_0x70ba('0x73'))||_0x70ba('0x89'))+'\x27]')[_0x70ba('0x2f')](_0x11c89b);_0x407b29['addClass'](_0x70ba('0x8a'));setTimeout(function(){_0xa1e932[_0x70ba('0x4b')](_0x70ba('0x8b'));_0x407b29[_0x70ba('0x4b')]('qd-bb-itemAddBuyButtonWrapper');},_0x315ed4['timeRemoveNewItemClass']);window['_Quatro_Digital_dropDown'][_0x70ba('0x58')]=void 0x0;if('undefined'!==typeof _0x37f134&&_0x70ba('0xa')===typeof _0x37f134['getCartInfoByUrl'])return _0x315ed4[_0x70ba('0x76')]||(_0x122ea1(_0x70ba('0x8c')),_0x37f134['getCartInfoByUrl']()),window['_QuatroDigital_DropDown'][_0x70ba('0x58')]=void 0x0,_0x37f134['getCartInfoByUrl'](function(_0x594d69){window[_0x70ba('0x85')][_0x70ba('0x58')]=_0x594d69;_0x36eb0f['fn'][_0x70ba('0x27')](!0x0,void 0x0,!0x0);},{'lastSku':_0x210114});window[_0x70ba('0x85')][_0x70ba('0x8d')]=!0x0;_0x36eb0f['fn'][_0x70ba('0x27')](!0x0);};(function(){if(_0x315ed4[_0x70ba('0x76')]&&_0x315ed4[_0x70ba('0x8e')]){var _0x152fdb=_0x36eb0f(_0x70ba('0x7d'));_0x152fdb[_0x70ba('0x8')]&&_0x3b4ee6(_0x152fdb);}}());var _0x3793e7=function(){var _0x21cf81=_0x36eb0f(this);_0x70ba('0x3')!==typeof _0x21cf81[_0x70ba('0x18')]('buyButton')?(_0x21cf81[_0x70ba('0x8f')](_0x70ba('0x90')),_0x391165(_0x21cf81)):(_0x21cf81[_0x70ba('0x91')]('mouseenter.qd_bb_buy_sc',function(_0x285627){_0x21cf81[_0x70ba('0x8f')]('click');_0x391165(_0x21cf81);_0x36eb0f(this)[_0x70ba('0x8f')](_0x285627);}),_0x36eb0f(window)['load'](function(){_0x21cf81['unbind'](_0x70ba('0x90'));_0x391165(_0x21cf81);_0x21cf81['unbind'](_0x70ba('0x92'));}));};_0x1aefed['clickBuySmartCheckout']=function(){var _0x40cd13=_0x36eb0f(this),_0x2dd2d2=_0x40cd13[_0x70ba('0x35')](_0x70ba('0x73'))||'';if(-0x1<_0x2dd2d2[_0x70ba('0x93')](_0x315ed4[_0x70ba('0x94')]))return!0x0;_0x2dd2d2=_0x2dd2d2[_0x70ba('0x1')](/redirect\=(false|true)/gi,'')[_0x70ba('0x1')]('?',_0x70ba('0x95'))['replace'](/\&\&/gi,'&');if(_0x315ed4[_0x70ba('0x96')](_0x40cd13))return _0x40cd13['attr'](_0x70ba('0x73'),_0x2dd2d2[_0x70ba('0x1')](_0x70ba('0x97'),_0x70ba('0x98'))),!0x0;_0x2dd2d2=_0x2dd2d2[_0x70ba('0x1')](/http.?:/i,'');_0x48a362[_0x70ba('0x99')](function(_0x7e4687){if(!_0x315ed4[_0x70ba('0x9a')]&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0x70ba('0x9b')](_0x2dd2d2))return _0x7e4687();var _0x5ebb9a=function(_0x4d708b,_0x5abb3a){var _0x3b4ee6=_0x2dd2d2[_0x70ba('0x9c')](/sku\=([0-9]+)/gi),_0x556c20=[];if(_0x70ba('0x17')===typeof _0x3b4ee6&&null!==_0x3b4ee6)for(var _0x39afa8=_0x3b4ee6['length']-0x1;0x0<=_0x39afa8;_0x39afa8--){var _0x1fc1a3=parseInt(_0x3b4ee6[_0x39afa8][_0x70ba('0x1')](/sku\=/gi,''));isNaN(_0x1fc1a3)||_0x556c20[_0x70ba('0x9d')](_0x1fc1a3);}_0x315ed4[_0x70ba('0x9e')][_0x70ba('0x29')](this,_0x4d708b,_0x5abb3a,_0x2dd2d2);_0x1aefed[_0x70ba('0x9f')]['call'](this,_0x4d708b,_0x5abb3a,_0x2dd2d2,_0x556c20);_0x1aefed['prodAdd'](_0x40cd13,_0x2dd2d2[_0x70ba('0x7')](_0x70ba('0xa0'))['pop']()[_0x70ba('0x7')]('&')['shift']());_0x70ba('0xa')===typeof _0x315ed4[_0x70ba('0xa1')]&&_0x315ed4['asyncCallback'][_0x70ba('0x29')](this);_0x36eb0f(window)[_0x70ba('0x5e')](_0x70ba('0xa2'));_0x36eb0f(window)[_0x70ba('0x5e')]('cartProductAdded.vtex');};_0x315ed4[_0x70ba('0xa3')]?(_0x5ebb9a(null,_0x70ba('0x1f')),_0x7e4687()):_0x36eb0f[_0x70ba('0x1e')]({'url':_0x2dd2d2,'complete':_0x5ebb9a})[_0x70ba('0x20')](function(){_0x7e4687();});});};_0x1aefed['buyButtonClickCallback']=function(_0x10acf1,_0xec5942,_0xeed7d5,_0x21f988){try{'success'===_0xec5942&&'object'===typeof window[_0x70ba('0xa4')]&&_0x70ba('0xa')===typeof window['parent'][_0x70ba('0xa5')]&&window[_0x70ba('0xa4')][_0x70ba('0xa5')](_0x10acf1,_0xec5942,_0xeed7d5,_0x21f988);}catch(_0xcdd6c4){_0x122ea1(_0x70ba('0xa6'));}};_0x3b4ee6();_0x70ba('0xa')===typeof _0x315ed4[_0x70ba('0x43')]?_0x315ed4[_0x70ba('0x43')][_0x70ba('0x29')](this):_0x122ea1(_0x70ba('0xa7'));};var _0x2740ac=_0x36eb0f[_0x70ba('0x69')]();_0x36eb0f['fn'][_0x70ba('0x75')]=function(_0xa83ff8,_0xf94e68){var _0x408f46=_0x36eb0f(this);_0x70ba('0x3')!==typeof _0xf94e68||'object'!==typeof _0xa83ff8||_0xa83ff8 instanceof _0x36eb0f||(_0xf94e68=_0xa83ff8,_0xa83ff8=void 0x0);_0x315ed4=_0x36eb0f[_0x70ba('0x15')]({},_0x15ff41,_0xf94e68);var _0x1801bb;_0x2740ac[_0x70ba('0x2f')](function(){_0x408f46[_0x70ba('0x7f')](_0x70ba('0xa8'))[_0x70ba('0x8')]||_0x408f46[_0x70ba('0xa9')]('<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>');_0x1801bb=new _0x36eb0f['QD_buyButton'](_0x408f46,_0xa83ff8);});_0x2740ac[_0x70ba('0x6a')]();_0x36eb0f(window)['on']('QuatroDigital.qd_bb_prod_add',function(_0x18db80,_0x1a23d9,_0x12329d){_0x1801bb[_0x70ba('0x86')](_0x1a23d9,_0x12329d);});return _0x36eb0f[_0x70ba('0x15')](_0x408f46,_0x1801bb);};var _0x4109c8=0x0;_0x36eb0f(document)[_0x70ba('0xaa')](function(_0x4e4e50,_0x386d6e,_0x1729da){-0x1<_0x1729da[_0x70ba('0x1b')][_0x70ba('0xf')]()[_0x70ba('0x93')](_0x70ba('0xab'))&&(_0x4109c8=(_0x1729da['url'][_0x70ba('0x9c')](/sku\=([0-9]+)/i)||[''])[_0x70ba('0xac')]());});_0x36eb0f(window)[_0x70ba('0x91')](_0x70ba('0xad'),function(){_0x36eb0f(window)[_0x70ba('0x5e')](_0x70ba('0xae'),[new _0x36eb0f(),_0x4109c8]);});_0x36eb0f(document)[_0x70ba('0xaf')](function(){_0x2740ac['fire']();});}catch(_0x54f64f){_0x70ba('0x3')!==typeof console&&_0x70ba('0xa')===typeof console['error']&&console[_0x70ba('0x14')]('Oooops!\x20',_0x54f64f);}}(this));function qd_number_format(_0x177ec5,_0x1a7f1e,_0x2acab6,_0x49aa28){_0x177ec5=(_0x177ec5+'')[_0x70ba('0x1')](/[^0-9+\-Ee.]/g,'');_0x177ec5=isFinite(+_0x177ec5)?+_0x177ec5:0x0;_0x1a7f1e=isFinite(+_0x1a7f1e)?Math[_0x70ba('0x2')](_0x1a7f1e):0x0;_0x49aa28=_0x70ba('0x3')===typeof _0x49aa28?',':_0x49aa28;_0x2acab6=_0x70ba('0x3')===typeof _0x2acab6?'.':_0x2acab6;var _0x408eef='',_0x408eef=function(_0x237d3b,_0x206e19){var _0x58075d=Math[_0x70ba('0x4')](0xa,_0x206e19);return''+(Math[_0x70ba('0x5')](_0x237d3b*_0x58075d)/_0x58075d)['toFixed'](_0x206e19);},_0x408eef=(_0x1a7f1e?_0x408eef(_0x177ec5,_0x1a7f1e):''+Math[_0x70ba('0x5')](_0x177ec5))[_0x70ba('0x7')]('.');0x3<_0x408eef[0x0][_0x70ba('0x8')]&&(_0x408eef[0x0]=_0x408eef[0x0][_0x70ba('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x49aa28));(_0x408eef[0x1]||'')[_0x70ba('0x8')]<_0x1a7f1e&&(_0x408eef[0x1]=_0x408eef[0x1]||'',_0x408eef[0x1]+=Array(_0x1a7f1e-_0x408eef[0x1][_0x70ba('0x8')]+0x1)[_0x70ba('0x9')]('0'));return _0x408eef[_0x70ba('0x9')](_0x2acab6);}(function(){try{window[_0x70ba('0x39')]=window[_0x70ba('0x39')]||{},window[_0x70ba('0x39')][_0x70ba('0x43')]=window[_0x70ba('0x39')]['callback']||$[_0x70ba('0x69')]();}catch(_0x491471){_0x70ba('0x3')!==typeof console&&_0x70ba('0xa')===typeof console['error']&&console['error']('Oooops!\x20',_0x491471[_0x70ba('0xb0')]);}}());(function(_0x43aba3){try{var _0x3be57d=jQuery,_0x28dff2=function(_0x226f09,_0x5cb03a){if('object'===typeof console&&_0x70ba('0x3')!==typeof console['error']&&_0x70ba('0x3')!==typeof console[_0x70ba('0x2e')]&&_0x70ba('0x3')!==typeof console[_0x70ba('0x2d')]){var _0x1c8b80;_0x70ba('0x17')===typeof _0x226f09?(_0x226f09[_0x70ba('0x6b')](_0x70ba('0xb1')),_0x1c8b80=_0x226f09):_0x1c8b80=[_0x70ba('0xb1')+_0x226f09];if(_0x70ba('0x3')===typeof _0x5cb03a||_0x70ba('0x4d')!==_0x5cb03a[_0x70ba('0xf')]()&&_0x70ba('0xb2')!==_0x5cb03a[_0x70ba('0xf')]())if(_0x70ba('0x3')!==typeof _0x5cb03a&&_0x70ba('0x2e')===_0x5cb03a['toLowerCase']())try{console[_0x70ba('0x2e')]['apply'](console,_0x1c8b80);}catch(_0x3d0962){try{console['info'](_0x1c8b80[_0x70ba('0x9')]('\x0a'));}catch(_0x457a6c){}}else try{console['error'][_0x70ba('0x6d')](console,_0x1c8b80);}catch(_0x350e83){try{console[_0x70ba('0x14')](_0x1c8b80[_0x70ba('0x9')]('\x0a'));}catch(_0x89be4){}}else try{console[_0x70ba('0x2d')][_0x70ba('0x6d')](console,_0x1c8b80);}catch(_0x343b0b){try{console[_0x70ba('0x2d')](_0x1c8b80[_0x70ba('0x9')]('\x0a'));}catch(_0x365d84){}}}};window['_QuatroDigital_DropDown']=window[_0x70ba('0x57')]||{};window[_0x70ba('0x57')][_0x70ba('0x8d')]=!0x0;_0x3be57d['QD_dropDownCart']=function(){};_0x3be57d['fn'][_0x70ba('0xb3')]=function(){return{'fn':new _0x3be57d()};};var _0x4a58cc=function(_0x1cdcc8){var _0x51dc73={'t':_0x70ba('0xb4')};return function(_0x272d6d){var _0x17bf92=function(_0x264058){return _0x264058;};var _0x3ccf85=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x272d6d=_0x272d6d['d'+_0x3ccf85[0x10]+'c'+_0x3ccf85[0x11]+'m'+_0x17bf92(_0x3ccf85[0x1])+'n'+_0x3ccf85[0xd]]['l'+_0x3ccf85[0x12]+'c'+_0x3ccf85[0x0]+'ti'+_0x17bf92('o')+'n'];var _0x28a26c=function(_0x3bee99){return escape(encodeURIComponent(_0x3bee99[_0x70ba('0x1')](/\./g,'¨')[_0x70ba('0x1')](/[a-zA-Z]/g,function(_0x123b4f){return String['fromCharCode'](('Z'>=_0x123b4f?0x5a:0x7a)>=(_0x123b4f=_0x123b4f['charCodeAt'](0x0)+0xd)?_0x123b4f:_0x123b4f-0x1a);})));};var _0x43aba3=_0x28a26c(_0x272d6d[[_0x3ccf85[0x9],_0x17bf92('o'),_0x3ccf85[0xc],_0x3ccf85[_0x17bf92(0xd)]][_0x70ba('0x9')]('')]);_0x28a26c=_0x28a26c((window[['js',_0x17bf92('no'),'m',_0x3ccf85[0x1],_0x3ccf85[0x4][_0x70ba('0xd')](),_0x70ba('0xb5')][_0x70ba('0x9')]('')]||'---')+['.v',_0x3ccf85[0xd],'e',_0x17bf92('x'),'co',_0x17bf92('mm'),_0x70ba('0xb6'),_0x3ccf85[0x1],'.c',_0x17bf92('o'),'m.',_0x3ccf85[0x13],'r'][_0x70ba('0x9')](''));for(var _0xf83354 in _0x51dc73){if(_0x28a26c===_0xf83354+_0x51dc73[_0xf83354]||_0x43aba3===_0xf83354+_0x51dc73[_0xf83354]){var _0x348497='tr'+_0x3ccf85[0x11]+'e';break;}_0x348497='f'+_0x3ccf85[0x0]+'ls'+_0x17bf92(_0x3ccf85[0x1])+'';}_0x17bf92=!0x1;-0x1<_0x272d6d[[_0x3ccf85[0xc],'e',_0x3ccf85[0x0],'rc',_0x3ccf85[0x9]]['join']('')][_0x70ba('0x93')](_0x70ba('0xb7'))&&(_0x17bf92=!0x0);return[_0x348497,_0x17bf92];}(_0x1cdcc8);}(window);if(!eval(_0x4a58cc[0x0]))return _0x4a58cc[0x1]?_0x28dff2('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x3be57d[_0x70ba('0xb3')]=function(_0x45a1f0,_0x5d596a){var _0x20e690=_0x3be57d(_0x45a1f0);if(!_0x20e690['length'])return _0x20e690;var _0x310fae=_0x3be57d[_0x70ba('0x15')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x70ba('0xb8'),'linkCheckout':_0x70ba('0xb9'),'cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':_0x70ba('0xba'),'continueShopping':_0x70ba('0xbb'),'shippingForm':_0x70ba('0xbc')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x357fc2){return _0x357fc2[_0x70ba('0xbd')]||_0x357fc2['name'];},'callback':function(){},'callbackProductsList':function(){}},_0x5d596a);_0x3be57d('');var _0x3c6bbc=this;if(_0x310fae[_0x70ba('0x56')]){var _0x4ca6e5=!0x1;_0x70ba('0x3')===typeof window[_0x70ba('0x59')]&&(_0x28dff2(_0x70ba('0xbe')),_0x3be57d[_0x70ba('0x1e')]({'url':_0x70ba('0xbf'),'async':!0x1,'dataType':'script','error':function(){_0x28dff2(_0x70ba('0xc0'));_0x4ca6e5=!0x0;}}));if(_0x4ca6e5)return _0x28dff2('A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!');}if('object'===typeof window[_0x70ba('0x59')]&&_0x70ba('0x3')!==typeof window['vtexjs'][_0x70ba('0x28')])var _0x39d643=window['vtexjs']['checkout'];else if(_0x70ba('0x17')===typeof vtex&&'object'===typeof vtex[_0x70ba('0x28')]&&_0x70ba('0x3')!==typeof vtex[_0x70ba('0x28')][_0x70ba('0x5a')])_0x39d643=new vtex['checkout'][(_0x70ba('0x5a'))]();else return _0x28dff2(_0x70ba('0x5b'));_0x3c6bbc[_0x70ba('0xc1')]=_0x70ba('0xc2');var _0x45bde8=function(_0x5882e9){_0x3be57d(this)[_0x70ba('0xc3')](_0x5882e9);_0x5882e9['find'](_0x70ba('0xc4'))[_0x70ba('0x2f')](_0x3be57d('.qd_ddc_lightBoxOverlay'))['on'](_0x70ba('0xc5'),function(){_0x20e690[_0x70ba('0x4b')](_0x70ba('0xc6'));_0x3be57d(document[_0x70ba('0x70')])[_0x70ba('0x4b')]('qd-bb-lightBoxBodyProdAdd');});_0x3be57d(document)[_0x70ba('0xc7')]('keyup.qd_ddc_closeFn')['on'](_0x70ba('0xc8'),function(_0x173378){0x1b==_0x173378[_0x70ba('0xc9')]&&(_0x20e690[_0x70ba('0x4b')](_0x70ba('0xc6')),_0x3be57d(document[_0x70ba('0x70')])['removeClass'](_0x70ba('0x88')));});var _0x5bcb57=_0x5882e9[_0x70ba('0x52')](_0x70ba('0xca'));_0x5882e9['find'](_0x70ba('0xcb'))['on'](_0x70ba('0xcc'),function(){_0x3c6bbc[_0x70ba('0xcd')]('-',void 0x0,void 0x0,_0x5bcb57);return!0x1;});_0x5882e9[_0x70ba('0x52')](_0x70ba('0xce'))['on']('click.qd_ddc_scrollDown',function(){_0x3c6bbc[_0x70ba('0xcd')](void 0x0,void 0x0,void 0x0,_0x5bcb57);return!0x1;});_0x5882e9[_0x70ba('0x52')](_0x70ba('0xcf'))[_0x70ba('0xd0')]('')['on'](_0x70ba('0xd1'),function(){_0x3c6bbc['shippingCalculate'](_0x3be57d(this));});if(_0x310fae[_0x70ba('0xd2')]){var _0x5d596a=0x0;_0x3be57d(this)['on'](_0x70ba('0xd3'),function(){var _0x5882e9=function(){window['_QuatroDigital_DropDown']['allowUpdate']&&(_0x3c6bbc[_0x70ba('0xd4')](),window[_0x70ba('0x57')]['allowUpdate']=!0x1,_0x3be57d['fn']['simpleCart'](!0x0),_0x3c6bbc[_0x70ba('0xd5')]());};_0x5d596a=setInterval(function(){_0x5882e9();},0x258);_0x5882e9();});_0x3be57d(this)['on'](_0x70ba('0xd6'),function(){clearInterval(_0x5d596a);});}};var _0xa34814=function(_0x4ddab0){_0x4ddab0=_0x3be57d(_0x4ddab0);_0x310fae[_0x70ba('0xd7')]['cartTotal']=_0x310fae[_0x70ba('0xd7')][_0x70ba('0x54')][_0x70ba('0x1')](_0x70ba('0xd8'),_0x70ba('0xd9'));_0x310fae[_0x70ba('0xd7')]['cartTotal']=_0x310fae[_0x70ba('0xd7')]['cartTotal'][_0x70ba('0x1')](_0x70ba('0xda'),_0x70ba('0xdb'));_0x310fae[_0x70ba('0xd7')][_0x70ba('0x54')]=_0x310fae[_0x70ba('0xd7')][_0x70ba('0x54')][_0x70ba('0x1')](_0x70ba('0xdc'),_0x70ba('0xdd'));_0x310fae[_0x70ba('0xd7')][_0x70ba('0x54')]=_0x310fae[_0x70ba('0xd7')][_0x70ba('0x54')][_0x70ba('0x1')]('#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0x4ddab0[_0x70ba('0x52')](_0x70ba('0xde'))[_0x70ba('0x50')](_0x310fae[_0x70ba('0xd7')][_0x70ba('0xdf')]);_0x4ddab0[_0x70ba('0x52')](_0x70ba('0xe0'))[_0x70ba('0x50')](_0x310fae[_0x70ba('0xd7')][_0x70ba('0xe1')]);_0x4ddab0['find'](_0x70ba('0xe2'))[_0x70ba('0x50')](_0x310fae[_0x70ba('0xd7')][_0x70ba('0xe3')]);_0x4ddab0[_0x70ba('0x52')](_0x70ba('0xe4'))[_0x70ba('0x50')](_0x310fae[_0x70ba('0xd7')][_0x70ba('0x54')]);_0x4ddab0[_0x70ba('0x52')](_0x70ba('0xe5'))[_0x70ba('0x50')](_0x310fae[_0x70ba('0xd7')][_0x70ba('0xe6')]);_0x4ddab0['find'](_0x70ba('0xe7'))[_0x70ba('0x50')](_0x310fae[_0x70ba('0xd7')]['emptyCart']);return _0x4ddab0;}(this[_0x70ba('0xc1')]);var _0xf09588=0x0;_0x20e690[_0x70ba('0x37')](function(){0x0<_0xf09588?_0x45bde8[_0x70ba('0x29')](this,_0xa34814[_0x70ba('0xe8')]()):_0x45bde8['call'](this,_0xa34814);_0xf09588++;});window['_QuatroDigital_CartData'][_0x70ba('0x43')][_0x70ba('0x2f')](function(){_0x3be57d('.qd-ddc-infoTotalValue')[_0x70ba('0x50')](window[_0x70ba('0x39')]['total']||'--');_0x3be57d(_0x70ba('0xe9'))[_0x70ba('0x50')](window[_0x70ba('0x39')]['qtt']||'0');_0x3be57d(_0x70ba('0xea'))[_0x70ba('0x50')](window[_0x70ba('0x39')][_0x70ba('0xeb')]||'--');_0x3be57d('.qd-ddc-infoAllTotal')[_0x70ba('0x50')](window['_QuatroDigital_CartData']['allTotal']||'--');});var _0x8cee8a=function(_0x3d10d8,_0x26151c){if(_0x70ba('0x3')===typeof _0x3d10d8[_0x70ba('0x40')])return _0x28dff2(_0x70ba('0xec'));_0x3c6bbc[_0x70ba('0xed')][_0x70ba('0x29')](this,_0x26151c);};_0x3c6bbc['getCartInfoByUrl']=function(_0xc1213f,_0x25a976){_0x70ba('0x3')!=typeof _0x25a976?window[_0x70ba('0x57')]['dataOptionsCache']=_0x25a976:window[_0x70ba('0x57')]['dataOptionsCache']&&(_0x25a976=window['_QuatroDigital_DropDown']['dataOptionsCache']);setTimeout(function(){window['_QuatroDigital_DropDown'][_0x70ba('0xee')]=void 0x0;},_0x310fae[_0x70ba('0xef')]);_0x3be57d('.qd-ddc-wrapper')[_0x70ba('0x4b')](_0x70ba('0xf0'));if(_0x310fae[_0x70ba('0x56')]){var _0x5d596a=function(_0x2d64d2){window[_0x70ba('0x57')]['getOrderForm']=_0x2d64d2;_0x8cee8a(_0x2d64d2,_0x25a976);_0x70ba('0x3')!==typeof window[_0x70ba('0xf1')]&&_0x70ba('0xa')===typeof window[_0x70ba('0xf1')]['exec']&&window['_QuatroDigital_AmountProduct'][_0x70ba('0xf2')][_0x70ba('0x29')](this);_0x3be57d(_0x70ba('0xf3'))[_0x70ba('0x49')](_0x70ba('0xf0'));};'undefined'!==typeof window['_QuatroDigital_DropDown'][_0x70ba('0x58')]?(_0x5d596a(window['_QuatroDigital_DropDown']['getOrderForm']),_0x70ba('0xa')===typeof _0xc1213f&&_0xc1213f(window[_0x70ba('0x57')][_0x70ba('0x58')])):_0x3be57d['QD_checkoutQueue'](['items','totalizers',_0x70ba('0xf4')],{'done':function(_0x802dea){_0x5d596a[_0x70ba('0x29')](this,_0x802dea);_0x70ba('0xa')===typeof _0xc1213f&&_0xc1213f(_0x802dea);},'fail':function(_0x48176e){_0x28dff2(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0x48176e]);}});}else alert('Este\x20método\x20esta\x20descontinuado!');};_0x3c6bbc[_0x70ba('0xd5')]=function(){var _0x4ce93b=_0x3be57d('.qd-ddc-wrapper');_0x4ce93b[_0x70ba('0x52')](_0x70ba('0xf5'))['length']?_0x4ce93b['removeClass'](_0x70ba('0xf6')):_0x4ce93b[_0x70ba('0x49')](_0x70ba('0xf6'));};_0x3c6bbc['renderProductsList']=function(_0x2c83d8){var _0x5d596a=_0x3be57d('.qd-ddc-prodWrapper2');_0x5d596a['empty']();_0x5d596a[_0x70ba('0x37')](function(){var _0x5d596a=_0x3be57d(this),_0x45a1f0,_0xcb41b0,_0x435c7f=_0x3be57d(''),_0x5e5247;for(_0x5e5247 in window[_0x70ba('0x57')][_0x70ba('0x58')][_0x70ba('0x40')])if(_0x70ba('0x17')===typeof window[_0x70ba('0x57')][_0x70ba('0x58')][_0x70ba('0x40')][_0x5e5247]){var _0x2ba231=window[_0x70ba('0x57')]['getOrderForm'][_0x70ba('0x40')][_0x5e5247];var _0x5da6f3=_0x2ba231[_0x70ba('0xf7')]['replace'](/^\/|\/$/g,'')['split']('/');var _0x5b00ab=_0x3be57d(_0x70ba('0xf8'));_0x5b00ab[_0x70ba('0x35')]({'data-sku':_0x2ba231['id'],'data-sku-index':_0x5e5247,'data-qd-departament':_0x5da6f3[0x0],'data-qd-category':_0x5da6f3[_0x5da6f3[_0x70ba('0x8')]-0x1]});_0x5b00ab[_0x70ba('0x49')](_0x70ba('0xf9')+_0x2ba231[_0x70ba('0xfa')]);_0x5b00ab[_0x70ba('0x52')](_0x70ba('0xfb'))[_0x70ba('0xc3')](_0x310fae[_0x70ba('0xbd')](_0x2ba231));_0x5b00ab[_0x70ba('0x52')](_0x70ba('0xfc'))['append'](isNaN(_0x2ba231[_0x70ba('0xfd')])?_0x2ba231[_0x70ba('0xfd')]:0x0==_0x2ba231[_0x70ba('0xfd')]?_0x70ba('0xfe'):(_0x3be57d('meta[name=currency]')[_0x70ba('0x35')](_0x70ba('0x36'))||'R$')+'\x20'+qd_number_format(_0x2ba231[_0x70ba('0xfd')]/0x64,0x2,',','.'));_0x5b00ab['find'](_0x70ba('0xff'))[_0x70ba('0x35')]({'data-sku':_0x2ba231['id'],'data-sku-index':_0x5e5247})[_0x70ba('0xd0')](_0x2ba231[_0x70ba('0x42')]);_0x5b00ab['find'](_0x70ba('0x100'))['attr']({'data-sku':_0x2ba231['id'],'data-sku-index':_0x5e5247});_0x3c6bbc[_0x70ba('0x101')](_0x2ba231['id'],_0x5b00ab[_0x70ba('0x52')](_0x70ba('0x102')),_0x2ba231[_0x70ba('0x103')]);_0x5b00ab['find'](_0x70ba('0x104'))[_0x70ba('0x35')]({'data-sku':_0x2ba231['id'],'data-sku-index':_0x5e5247});_0x5b00ab[_0x70ba('0x105')](_0x5d596a);_0x435c7f=_0x435c7f['add'](_0x5b00ab);}try{var _0x1ba701=_0x5d596a[_0x70ba('0x26')](_0x70ba('0xf3'))[_0x70ba('0x52')](_0x70ba('0xcf'));_0x1ba701[_0x70ba('0x8')]&&''==_0x1ba701[_0x70ba('0xd0')]()&&window[_0x70ba('0x57')][_0x70ba('0x58')]['shippingData'][_0x70ba('0x106')]&&_0x1ba701['val'](window[_0x70ba('0x57')][_0x70ba('0x58')][_0x70ba('0xf4')][_0x70ba('0x106')][_0x70ba('0x107')]);}catch(_0x1b2193){_0x28dff2(_0x70ba('0x108')+_0x1b2193['message'],'aviso');}_0x3c6bbc[_0x70ba('0x109')](_0x5d596a);_0x3c6bbc[_0x70ba('0xd5')]();_0x2c83d8&&_0x2c83d8[_0x70ba('0x10a')]&&function(){_0xcb41b0=_0x435c7f[_0x70ba('0x46')](_0x70ba('0x10b')+_0x2c83d8['lastSku']+'\x27]');_0xcb41b0[_0x70ba('0x8')]&&(_0x45a1f0=0x0,_0x435c7f['each'](function(){var _0x2c83d8=_0x3be57d(this);if(_0x2c83d8['is'](_0xcb41b0))return!0x1;_0x45a1f0+=_0x2c83d8[_0x70ba('0x10c')]();}),_0x3c6bbc[_0x70ba('0xcd')](void 0x0,void 0x0,_0x45a1f0,_0x5d596a['add'](_0x5d596a[_0x70ba('0xa4')]())),_0x435c7f['removeClass'](_0x70ba('0x10d')),function(_0x23c80d){_0x23c80d[_0x70ba('0x49')]('qd-ddc-lastAdded');_0x23c80d[_0x70ba('0x49')](_0x70ba('0x10d'));setTimeout(function(){_0x23c80d[_0x70ba('0x4b')](_0x70ba('0x10e'));},_0x310fae[_0x70ba('0xef')]);}(_0xcb41b0));}();});(function(){_QuatroDigital_DropDown[_0x70ba('0x58')]['items']['length']?(_0x3be57d(_0x70ba('0x70'))[_0x70ba('0x4b')](_0x70ba('0x10f'))[_0x70ba('0x49')](_0x70ba('0x110')),setTimeout(function(){_0x3be57d(_0x70ba('0x70'))[_0x70ba('0x4b')](_0x70ba('0x111'));},_0x310fae[_0x70ba('0xef')])):_0x3be57d('body')[_0x70ba('0x4b')](_0x70ba('0x112'))[_0x70ba('0x49')](_0x70ba('0x10f'));}());_0x70ba('0xa')===typeof _0x310fae[_0x70ba('0x113')]?_0x310fae[_0x70ba('0x113')]['call'](this):_0x28dff2(_0x70ba('0x114'));};_0x3c6bbc[_0x70ba('0x101')]=function(_0x17b77e,_0x393f9f,_0x2b60a3){function _0x415dea(){_0x393f9f[_0x70ba('0x4b')](_0x70ba('0x115'))[_0x70ba('0x116')](function(){_0x3be57d(this)[_0x70ba('0x49')]('qd-loaded');})['attr'](_0x70ba('0x117'),_0x2b60a3);}_0x2b60a3?_0x415dea():isNaN(_0x17b77e)?_0x28dff2(_0x70ba('0x118'),_0x70ba('0x4d')):alert(_0x70ba('0x119'));};_0x3c6bbc[_0x70ba('0x109')]=function(_0x2f1d41){var _0x3079bb=function(_0x541fd6,_0x192d4d){var _0x5d596a=_0x3be57d(_0x541fd6);var _0x428215=_0x5d596a[_0x70ba('0x35')](_0x70ba('0x11a'));var _0x45a1f0=_0x5d596a[_0x70ba('0x35')](_0x70ba('0x11b'));if(_0x428215){var _0x44ed41=parseInt(_0x5d596a[_0x70ba('0xd0')]())||0x1;_0x3c6bbc['changeQantity']([_0x428215,_0x45a1f0],_0x44ed41,_0x44ed41+0x1,function(_0x50eafc){_0x5d596a[_0x70ba('0xd0')](_0x50eafc);_0x70ba('0xa')===typeof _0x192d4d&&_0x192d4d();});}};var _0x5d596a=function(_0x38323,_0x2b08c9){var _0x5d596a=_0x3be57d(_0x38323);var _0xac585=_0x5d596a[_0x70ba('0x35')](_0x70ba('0x11a'));var _0x45a1f0=_0x5d596a['attr'](_0x70ba('0x11b'));if(_0xac585){var _0x38b80c=parseInt(_0x5d596a[_0x70ba('0xd0')]())||0x2;_0x3c6bbc[_0x70ba('0x11c')]([_0xac585,_0x45a1f0],_0x38b80c,_0x38b80c-0x1,function(_0x53e4fa){_0x5d596a['val'](_0x53e4fa);_0x70ba('0xa')===typeof _0x2b08c9&&_0x2b08c9();});}};var _0x5b39c7=function(_0x5a8cdb,_0x2655d8){var _0x5d596a=_0x3be57d(_0x5a8cdb);var _0x5898a7=_0x5d596a['attr'](_0x70ba('0x11a'));var _0x45a1f0=_0x5d596a[_0x70ba('0x35')](_0x70ba('0x11b'));if(_0x5898a7){var _0x8d2d41=parseInt(_0x5d596a[_0x70ba('0xd0')]())||0x1;_0x3c6bbc['changeQantity']([_0x5898a7,_0x45a1f0],0x1,_0x8d2d41,function(_0x572655){_0x5d596a[_0x70ba('0xd0')](_0x572655);_0x70ba('0xa')===typeof _0x2655d8&&_0x2655d8();});}};var _0x45a1f0=_0x2f1d41['find'](_0x70ba('0x11d'));_0x45a1f0[_0x70ba('0x49')]('qd_on')['each'](function(){var _0x2f1d41=_0x3be57d(this);_0x2f1d41[_0x70ba('0x52')](_0x70ba('0x11e'))['on'](_0x70ba('0x11f'),function(_0x531ead){_0x531ead[_0x70ba('0x120')]();_0x45a1f0['addClass'](_0x70ba('0x121'));_0x3079bb(_0x2f1d41['find'](_0x70ba('0xff')),function(){_0x45a1f0[_0x70ba('0x4b')](_0x70ba('0x121'));});});_0x2f1d41[_0x70ba('0x52')]('.qd-ddc-quantityMinus')['on'](_0x70ba('0x122'),function(_0x48014f){_0x48014f[_0x70ba('0x120')]();_0x45a1f0[_0x70ba('0x49')](_0x70ba('0x121'));_0x5d596a(_0x2f1d41['find']('.qd-ddc-quantity'),function(){_0x45a1f0['removeClass'](_0x70ba('0x121'));});});_0x2f1d41['find'](_0x70ba('0xff'))['on'](_0x70ba('0x123'),function(){_0x45a1f0[_0x70ba('0x49')](_0x70ba('0x121'));_0x5b39c7(this,function(){_0x45a1f0[_0x70ba('0x4b')](_0x70ba('0x121'));});});_0x2f1d41[_0x70ba('0x52')](_0x70ba('0xff'))['on'](_0x70ba('0x124'),function(_0x2c19cf){0xd==_0x2c19cf[_0x70ba('0xc9')]&&(_0x45a1f0[_0x70ba('0x49')](_0x70ba('0x121')),_0x5b39c7(this,function(){_0x45a1f0[_0x70ba('0x4b')]('qd-loading');}));});});_0x2f1d41[_0x70ba('0x52')](_0x70ba('0xf5'))[_0x70ba('0x37')](function(){var _0x2f1d41=_0x3be57d(this);_0x2f1d41[_0x70ba('0x52')](_0x70ba('0x100'))['on']('click.qd_ddc_remove',function(){_0x2f1d41[_0x70ba('0x49')](_0x70ba('0x121'));_0x3c6bbc['removeProduct'](_0x3be57d(this),function(_0x2de674){_0x2de674?_0x2f1d41[_0x70ba('0x125')](!0x0)[_0x70ba('0x126')](function(){_0x2f1d41[_0x70ba('0x127')]();_0x3c6bbc[_0x70ba('0xd5')]();}):_0x2f1d41[_0x70ba('0x4b')](_0x70ba('0x121'));});return!0x1;});});};_0x3c6bbc[_0x70ba('0x128')]=function(_0xfb75ac){var _0x7cd1de=_0xfb75ac[_0x70ba('0xd0')](),_0x7cd1de=_0x7cd1de['replace'](/[^0-9\-]/g,''),_0x7cd1de=_0x7cd1de[_0x70ba('0x1')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3'),_0x7cd1de=_0x7cd1de['replace'](/(.{9}).*/g,'$1');_0xfb75ac[_0x70ba('0xd0')](_0x7cd1de);0x9<=_0x7cd1de['length']&&(_0xfb75ac[_0x70ba('0x18')](_0x70ba('0x129'))!=_0x7cd1de&&_0x39d643[_0x70ba('0x12a')]({'postalCode':_0x7cd1de,'country':_0x70ba('0x12b')})[_0x70ba('0x67')](function(_0x417015){window[_0x70ba('0x57')][_0x70ba('0x58')]=_0x417015;_0x3c6bbc[_0x70ba('0xd4')]();})[_0x70ba('0x68')](function(_0x15fe1d){_0x28dff2(['Não\x20foi\x20possível\x20calcular\x20o\x20frete',_0x15fe1d]);updateCartData();}),_0xfb75ac[_0x70ba('0x18')](_0x70ba('0x129'),_0x7cd1de));};_0x3c6bbc[_0x70ba('0x11c')]=function(_0x4f88f4,_0x204089,_0x5ec231,_0x581ac9){function _0x41bd90(_0x330f9f){_0x330f9f=_0x70ba('0x12c')!==typeof _0x330f9f?!0x1:_0x330f9f;_0x3c6bbc['getCartInfoByUrl']();window[_0x70ba('0x57')][_0x70ba('0x8d')]=!0x1;_0x3c6bbc[_0x70ba('0xd5')]();_0x70ba('0x3')!==typeof window['_QuatroDigital_AmountProduct']&&_0x70ba('0xa')===typeof window[_0x70ba('0xf1')][_0x70ba('0xf2')]&&window['_QuatroDigital_AmountProduct'][_0x70ba('0xf2')][_0x70ba('0x29')](this);'function'===typeof adminCart&&adminCart();_0x3be57d['fn'][_0x70ba('0x27')](!0x0,void 0x0,_0x330f9f);'function'===typeof _0x581ac9&&_0x581ac9(_0x204089);}_0x5ec231=_0x5ec231||0x1;if(0x1>_0x5ec231)return _0x204089;if(_0x310fae['smartCheckout']){if(_0x70ba('0x3')===typeof window['_QuatroDigital_DropDown'][_0x70ba('0x58')][_0x70ba('0x40')][_0x4f88f4[0x1]])return _0x28dff2(_0x70ba('0x12d')+_0x4f88f4[0x1]+']'),_0x204089;window[_0x70ba('0x57')][_0x70ba('0x58')][_0x70ba('0x40')][_0x4f88f4[0x1]]['quantity']=_0x5ec231;window[_0x70ba('0x57')][_0x70ba('0x58')][_0x70ba('0x40')][_0x4f88f4[0x1]][_0x70ba('0x12e')]=_0x4f88f4[0x1];_0x39d643['updateItems']([window[_0x70ba('0x57')][_0x70ba('0x58')]['items'][_0x4f88f4[0x1]]],['items',_0x70ba('0x3a'),_0x70ba('0xf4')])[_0x70ba('0x67')](function(_0x4fe10b){window[_0x70ba('0x57')]['getOrderForm']=_0x4fe10b;_0x41bd90(!0x0);})[_0x70ba('0x68')](function(_0x1d3edb){_0x28dff2(['Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho',_0x1d3edb]);_0x41bd90();});}else _0x28dff2(_0x70ba('0x12f'));};_0x3c6bbc[_0x70ba('0x130')]=function(_0x55034d,_0x493d90){function _0x5d5538(_0x5517f9){_0x5517f9=_0x70ba('0x12c')!==typeof _0x5517f9?!0x1:_0x5517f9;_0x70ba('0x3')!==typeof window[_0x70ba('0xf1')]&&'function'===typeof window[_0x70ba('0xf1')]['exec']&&window[_0x70ba('0xf1')][_0x70ba('0xf2')][_0x70ba('0x29')](this);_0x70ba('0xa')===typeof adminCart&&adminCart();_0x3be57d['fn'][_0x70ba('0x27')](!0x0,void 0x0,_0x5517f9);'function'===typeof _0x493d90&&_0x493d90(_0x45a1f0);}var _0x45a1f0=!0x1,_0x54668c=_0x3be57d(_0x55034d)['attr']('data-sku-index');if(_0x310fae[_0x70ba('0x56')]){if(_0x70ba('0x3')===typeof window[_0x70ba('0x57')]['getOrderForm'][_0x70ba('0x40')][_0x54668c])return _0x28dff2(_0x70ba('0x12d')+_0x54668c+']'),_0x45a1f0;window[_0x70ba('0x57')][_0x70ba('0x58')][_0x70ba('0x40')][_0x54668c][_0x70ba('0x12e')]=_0x54668c;_0x39d643[_0x70ba('0x131')]([window[_0x70ba('0x57')][_0x70ba('0x58')][_0x70ba('0x40')][_0x54668c]],[_0x70ba('0x40'),_0x70ba('0x3a'),_0x70ba('0xf4')])[_0x70ba('0x67')](function(_0x2a6f37){_0x45a1f0=!0x0;window[_0x70ba('0x57')]['getOrderForm']=_0x2a6f37;_0x8cee8a(_0x2a6f37);_0x5d5538(!0x0);})[_0x70ba('0x68')](function(_0x3e5590){_0x28dff2([_0x70ba('0x132'),_0x3e5590]);_0x5d5538();});}else alert('Atenção,\x20este\x20método\x20esta\x20descontinuado.');};_0x3c6bbc[_0x70ba('0xcd')]=function(_0x22067b,_0x3b7aa0,_0x4141d5,_0x5b92b2){_0x5b92b2=_0x5b92b2||_0x3be57d(_0x70ba('0x133'));_0x22067b=_0x22067b||'+';_0x3b7aa0=_0x3b7aa0||0.9*_0x5b92b2[_0x70ba('0x134')]();_0x5b92b2[_0x70ba('0x125')](!0x0,!0x0)[_0x70ba('0x135')]({'scrollTop':isNaN(_0x4141d5)?_0x22067b+'='+_0x3b7aa0+'px':_0x4141d5});};_0x310fae[_0x70ba('0xd2')]||(_0x3c6bbc[_0x70ba('0xd4')](),_0x3be57d['fn']['simpleCart'](!0x0));_0x3be57d(window)['on'](_0x70ba('0x136'),function(){try{window[_0x70ba('0x57')]['getOrderForm']=void 0x0,_0x3c6bbc['getCartInfoByUrl']();}catch(_0x4bbc38){_0x28dff2(_0x70ba('0x137')+_0x4bbc38['message'],_0x70ba('0x138'));}});'function'===typeof _0x310fae['callback']?_0x310fae[_0x70ba('0x43')][_0x70ba('0x29')](this):_0x28dff2(_0x70ba('0xa7'));};_0x3be57d['fn'][_0x70ba('0xb3')]=function(_0x138af3){var _0x1055ff=_0x3be57d(this);_0x1055ff['fn']=new _0x3be57d[(_0x70ba('0xb3'))](this,_0x138af3);return _0x1055ff;};}catch(_0x3f736a){_0x70ba('0x3')!==typeof console&&_0x70ba('0xa')===typeof console[_0x70ba('0x14')]&&console[_0x70ba('0x14')](_0x70ba('0x63'),_0x3f736a);}}(this));(function(_0x3c411d){try{var _0x1bd6af=jQuery;window[_0x70ba('0xf1')]=window['_QuatroDigital_AmountProduct']||{};window['_QuatroDigital_AmountProduct'][_0x70ba('0x40')]={};window['_QuatroDigital_AmountProduct'][_0x70ba('0x139')]=!0x1;window[_0x70ba('0xf1')]['buyButtonClicked']=!0x1;window[_0x70ba('0xf1')][_0x70ba('0x13a')]=!0x1;var _0x38afa1=function(){if(window[_0x70ba('0xf1')]['allowRecalculate']){var _0x38400a=!0x1;var _0x3c411d={};window[_0x70ba('0xf1')][_0x70ba('0x40')]={};for(_0xce2f2c in window['_QuatroDigital_DropDown'][_0x70ba('0x58')][_0x70ba('0x40')])if(_0x70ba('0x17')===typeof window[_0x70ba('0x57')][_0x70ba('0x58')][_0x70ba('0x40')][_0xce2f2c]){var _0x3637a7=window['_QuatroDigital_DropDown'][_0x70ba('0x58')]['items'][_0xce2f2c];_0x70ba('0x3')!==typeof _0x3637a7[_0x70ba('0x13b')]&&null!==_0x3637a7[_0x70ba('0x13b')]&&''!==_0x3637a7[_0x70ba('0x13b')]&&(window['_QuatroDigital_AmountProduct']['items'][_0x70ba('0x13c')+_0x3637a7[_0x70ba('0x13b')]]=window[_0x70ba('0xf1')][_0x70ba('0x40')][_0x70ba('0x13c')+_0x3637a7['productId']]||{},window[_0x70ba('0xf1')][_0x70ba('0x40')][_0x70ba('0x13c')+_0x3637a7[_0x70ba('0x13b')]][_0x70ba('0x13d')]=_0x3637a7['productId'],_0x3c411d[_0x70ba('0x13c')+_0x3637a7[_0x70ba('0x13b')]]||(window[_0x70ba('0xf1')][_0x70ba('0x40')][_0x70ba('0x13c')+_0x3637a7[_0x70ba('0x13b')]]['qtt']=0x0),window[_0x70ba('0xf1')][_0x70ba('0x40')][_0x70ba('0x13c')+_0x3637a7[_0x70ba('0x13b')]][_0x70ba('0x41')]+=_0x3637a7[_0x70ba('0x42')],_0x38400a=!0x0,_0x3c411d[_0x70ba('0x13c')+_0x3637a7[_0x70ba('0x13b')]]=!0x0);}var _0xce2f2c=_0x38400a;}else _0xce2f2c=void 0x0;window[_0x70ba('0xf1')][_0x70ba('0x139')]&&(_0x1bd6af(_0x70ba('0x13e'))[_0x70ba('0x127')](),_0x1bd6af(_0x70ba('0x13f'))['removeClass'](_0x70ba('0x140')));for(var _0x484776 in window[_0x70ba('0xf1')][_0x70ba('0x40')]){_0x3637a7=window['_QuatroDigital_AmountProduct']['items'][_0x484776];if('object'!==typeof _0x3637a7)return;_0x3c411d=_0x1bd6af(_0x70ba('0x141')+_0x3637a7['prodId']+']')[_0x70ba('0x26')]('li');if(window[_0x70ba('0xf1')][_0x70ba('0x139')]||!_0x3c411d['find']('.qd-bap-wrapper')[_0x70ba('0x8')])_0x38400a=_0x1bd6af(_0x70ba('0x142')),_0x38400a[_0x70ba('0x52')](_0x70ba('0x143'))[_0x70ba('0x50')](_0x3637a7[_0x70ba('0x41')]),_0x3637a7=_0x3c411d[_0x70ba('0x52')](_0x70ba('0x144')),_0x3637a7[_0x70ba('0x8')]?_0x3637a7[_0x70ba('0xa9')](_0x38400a)['addClass']('qd-bap-item-added'):_0x3c411d[_0x70ba('0xa9')](_0x38400a);}_0xce2f2c&&(window[_0x70ba('0xf1')][_0x70ba('0x139')]=!0x1);};window['_QuatroDigital_AmountProduct'][_0x70ba('0xf2')]=function(){window['_QuatroDigital_AmountProduct'][_0x70ba('0x139')]=!0x0;_0x38afa1[_0x70ba('0x29')](this);};_0x1bd6af(document)['ajaxStop'](function(){_0x38afa1[_0x70ba('0x29')](this);});}catch(_0x255d7e){_0x70ba('0x3')!==typeof console&&'function'===typeof console[_0x70ba('0x14')]&&console[_0x70ba('0x14')](_0x70ba('0x63'),_0x255d7e);}}(this));(function(){try{var _0x4f110b=jQuery,_0x391a5d,_0x586ce0={'selector':_0x70ba('0x145'),'dropDown':{},'buyButton':{}};_0x4f110b[_0x70ba('0x146')]=function(_0x1fc87a){var _0x5bce9b={};_0x391a5d=_0x4f110b[_0x70ba('0x15')](!0x0,{},_0x586ce0,_0x1fc87a);_0x1fc87a=_0x4f110b(_0x391a5d[_0x70ba('0x84')])['QD_dropDownCart'](_0x391a5d['dropDown']);_0x5bce9b['buyButton']=_0x70ba('0x3')!==typeof _0x391a5d[_0x70ba('0x147')][_0x70ba('0xd2')]&&!0x1===_0x391a5d['dropDown'][_0x70ba('0xd2')]?_0x4f110b(_0x391a5d['selector'])[_0x70ba('0x75')](_0x1fc87a['fn'],_0x391a5d[_0x70ba('0x148')]):_0x4f110b(_0x391a5d[_0x70ba('0x84')])[_0x70ba('0x75')](_0x391a5d['buyButton']);_0x5bce9b['dropDown']=_0x1fc87a;return _0x5bce9b;};_0x4f110b['fn'][_0x70ba('0x149')]=function(){_0x70ba('0x17')===typeof console&&_0x70ba('0xa')===typeof console['info']&&console[_0x70ba('0x2e')](_0x70ba('0x14a'));};_0x4f110b[_0x70ba('0x149')]=_0x4f110b['fn'][_0x70ba('0x149')];}catch(_0x49cf83){_0x70ba('0x3')!==typeof console&&_0x70ba('0xa')===typeof console[_0x70ba('0x14')]&&console[_0x70ba('0x14')](_0x70ba('0x63'),_0x49cf83);}}());

/* Quatro Digital - Product Thumbs // Carlos Vinicius // Todos os direitos reservados. */
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs();a.trigger("QuatroDigital.pt_callback",[a])}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return a.length?$.extend({},a,new b(a)):a},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0x99bc=['appendTo','QuatroDigital.pv_video_added','ajaxStop','load','ImageControl','body','.produto','object','undefined','alerta','warn','[Video\x20in\x20product]\x20','info','error','qdVideoInProduct','td.value-field.Videos:first','ul.thumbs','videoFieldSelector','text','replace','split','youtube','push','pop','youtu.be','be/','prependTo','#include','wrap','<div\x20class=\x22qd-playerContainer\x22></div>','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','join','toUpperCase','ite','---','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','urlProtocol','?wmode=transparent&rel=0&enablejsapi=1\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>','height','data','stop','fadeTo','addClass','qdpv-video-on','animate','iframe','a:not(\x27.qd-videoLink\x27)','bind','click.removeVideo','hide','removeAttr','removeClass','find','.qd-videoItem','length','call','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','click.playVideo','.ON','controlVideo','.qd-playerWrapper\x20iframe','contentWindow','attr','rel','a:not(.qd-videoLink)','click','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','start','insertThumbsIn'];(function(_0x35f7f5,_0x4e2ee1){var _0x5567a4=function(_0x3e5df0){while(--_0x3e5df0){_0x35f7f5['push'](_0x35f7f5['shift']());}};_0x5567a4(++_0x4e2ee1);}(_0x99bc,0x1c1));var _0xc99b=function(_0x2b9b7f,_0x4d47df){_0x2b9b7f=_0x2b9b7f-0x0;var _0x4ed19a=_0x99bc[_0x2b9b7f];return _0x4ed19a;};(function(_0x52bf8b){$(function(){if($(document[_0xc99b('0x0')])['is'](_0xc99b('0x1'))){var _0x59165a=[];var _0x5f581b=function(_0x1220bf,_0x33e47e){_0xc99b('0x2')===typeof console&&(_0xc99b('0x3')!==typeof _0x33e47e&&_0xc99b('0x4')===_0x33e47e['toLowerCase']()?console[_0xc99b('0x5')](_0xc99b('0x6')+_0x1220bf):_0xc99b('0x3')!==typeof _0x33e47e&&_0xc99b('0x7')===_0x33e47e['toLowerCase']()?console[_0xc99b('0x7')](_0xc99b('0x6')+_0x1220bf):console[_0xc99b('0x8')](_0xc99b('0x6')+_0x1220bf));};window['qdVideoInProduct']=window[_0xc99b('0x9')]||{};var _0x2ca25d=$['extend'](!0x0,{'insertThumbsIn':'start','videoFieldSelector':_0xc99b('0xa'),'controlVideo':!0x0,'urlProtocol':'http'},window[_0xc99b('0x9')]);var _0xf08308=$(_0xc99b('0xb'));var _0x18d53f=$('div#image');var _0x3e680f=$(_0x2ca25d[_0xc99b('0xc')])[_0xc99b('0xd')]()[_0xc99b('0xe')](/\;\s*/,';')[_0xc99b('0xf')](';');for(var _0x4e5fda=0x0;_0x4e5fda<_0x3e680f['length'];_0x4e5fda++)-0x1<_0x3e680f[_0x4e5fda]['indexOf'](_0xc99b('0x10'))?_0x59165a[_0xc99b('0x11')](_0x3e680f[_0x4e5fda][_0xc99b('0xf')]('v=')[_0xc99b('0x12')]()['split'](/[&#]/)['shift']()):-0x1<_0x3e680f[_0x4e5fda]['indexOf'](_0xc99b('0x13'))&&_0x59165a[_0xc99b('0x11')](_0x3e680f[_0x4e5fda][_0xc99b('0xf')](_0xc99b('0x14'))[_0xc99b('0x12')]()[_0xc99b('0xf')](/[\?&#]/)['shift']());var _0x50f8f8=$('<div\x20class=\x22qd-playerWrapper\x22></div>');_0x50f8f8[_0xc99b('0x15')](_0xc99b('0x16'));_0x50f8f8[_0xc99b('0x17')](_0xc99b('0x18'));_0x3e680f=function(_0x424b6c){var _0x2605c2={'t':_0xc99b('0x19')};return function(_0x244178){var _0x327781=function(_0x3e2d79){return _0x3e2d79;};var _0x18b88f=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x244178=_0x244178['d'+_0x18b88f[0x10]+'c'+_0x18b88f[0x11]+'m'+_0x327781(_0x18b88f[0x1])+'n'+_0x18b88f[0xd]]['l'+_0x18b88f[0x12]+'c'+_0x18b88f[0x0]+'ti'+_0x327781('o')+'n'];var _0x5d533e=function(_0x5c1e1a){return escape(encodeURIComponent(_0x5c1e1a[_0xc99b('0xe')](/\./g,'¨')[_0xc99b('0xe')](/[a-zA-Z]/g,function(_0x58e03d){return String[_0xc99b('0x1a')](('Z'>=_0x58e03d?0x5a:0x7a)>=(_0x58e03d=_0x58e03d[_0xc99b('0x1b')](0x0)+0xd)?_0x58e03d:_0x58e03d-0x1a);})));};var _0x180b83=_0x5d533e(_0x244178[[_0x18b88f[0x9],_0x327781('o'),_0x18b88f[0xc],_0x18b88f[_0x327781(0xd)]][_0xc99b('0x1c')]('')]);_0x5d533e=_0x5d533e((window[['js',_0x327781('no'),'m',_0x18b88f[0x1],_0x18b88f[0x4][_0xc99b('0x1d')](),_0xc99b('0x1e')][_0xc99b('0x1c')]('')]||_0xc99b('0x1f'))+['.v',_0x18b88f[0xd],'e',_0x327781('x'),'co',_0x327781('mm'),'erc',_0x18b88f[0x1],'.c',_0x327781('o'),'m.',_0x18b88f[0x13],'r']['join'](''));for(var _0x2877bb in _0x2605c2){if(_0x5d533e===_0x2877bb+_0x2605c2[_0x2877bb]||_0x180b83===_0x2877bb+_0x2605c2[_0x2877bb]){var _0x5cf79b='tr'+_0x18b88f[0x11]+'e';break;}_0x5cf79b='f'+_0x18b88f[0x0]+'ls'+_0x327781(_0x18b88f[0x1])+'';}_0x327781=!0x1;-0x1<_0x244178[[_0x18b88f[0xc],'e',_0x18b88f[0x0],'rc',_0x18b88f[0x9]][_0xc99b('0x1c')]('')][_0xc99b('0x20')](_0xc99b('0x21'))&&(_0x327781=!0x0);return[_0x5cf79b,_0x327781];}(_0x424b6c);}(window);if(!eval(_0x3e680f[0x0]))return _0x3e680f[0x1]?_0x5f581b('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x350c1a=function(_0x2a198e,_0x80e276){_0xc99b('0x10')===_0x80e276&&_0x50f8f8['html']('<iframe\x20src=\x22'+_0x2ca25d[_0xc99b('0x22')]+'://www.youtube.com/embed/'+_0x2a198e+_0xc99b('0x23'));_0x18d53f['data'](_0xc99b('0x24'),_0x18d53f[_0xc99b('0x25')](_0xc99b('0x24'))||_0x18d53f[_0xc99b('0x24')]());_0x18d53f[_0xc99b('0x26')](!0x0,!0x0)[_0xc99b('0x27')](0x1f4,0x0,function(){$(_0xc99b('0x0'))[_0xc99b('0x28')](_0xc99b('0x29'));});_0x50f8f8[_0xc99b('0x26')](!0x0,!0x0)['fadeTo'](0x1f4,0x1,function(){_0x18d53f['add'](_0x50f8f8)[_0xc99b('0x2a')]({'height':_0x50f8f8['find'](_0xc99b('0x2b'))['height']()},0x2bc);});};removePlayer=function(){_0xf08308['find'](_0xc99b('0x2c'))[_0xc99b('0x2d')](_0xc99b('0x2e'),function(){_0x50f8f8[_0xc99b('0x26')](!0x0,!0x0)[_0xc99b('0x27')](0x1f4,0x0,function(){$(this)[_0xc99b('0x2f')]()[_0xc99b('0x30')]('style');$(_0xc99b('0x0'))[_0xc99b('0x31')](_0xc99b('0x29'));});_0x18d53f[_0xc99b('0x26')](!0x0,!0x0)['fadeTo'](0x1f4,0x1,function(){var _0x186e02=_0x18d53f[_0xc99b('0x25')](_0xc99b('0x24'));_0x186e02&&_0x18d53f['animate']({'height':_0x186e02},0x2bc);});});};var _0x31f5a8=function(){if(!_0xf08308[_0xc99b('0x32')](_0xc99b('0x33'))[_0xc99b('0x34')])for(vId in removePlayer[_0xc99b('0x35')](this),_0x59165a)if('string'===typeof _0x59165a[vId]&&''!==_0x59165a[vId]){var _0xe7cdb1=$(_0xc99b('0x36')+_0x59165a[vId]+'/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27'+_0x59165a[vId]+_0xc99b('0x37')+_0x59165a[vId]+_0xc99b('0x38'));_0xe7cdb1[_0xc99b('0x32')]('a')[_0xc99b('0x2d')](_0xc99b('0x39'),function(){var _0x4b0c5b=$(this);_0xf08308[_0xc99b('0x32')](_0xc99b('0x3a'))[_0xc99b('0x31')]('ON');_0x4b0c5b[_0xc99b('0x28')]('ON');0x1==_0x2ca25d[_0xc99b('0x3b')]?$(_0xc99b('0x3c'))[_0xc99b('0x34')]?(_0x350c1a[_0xc99b('0x35')](this,'',''),$(_0xc99b('0x3c'))[0x0][_0xc99b('0x3d')]['postMessage']('{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','*')):_0x350c1a[_0xc99b('0x35')](this,_0x4b0c5b['attr']('rel'),_0xc99b('0x10')):_0x350c1a[_0xc99b('0x35')](this,_0x4b0c5b[_0xc99b('0x3e')](_0xc99b('0x3f')),_0xc99b('0x10'));return!0x1;});0x1==_0x2ca25d['controlVideo']&&_0xf08308[_0xc99b('0x32')](_0xc99b('0x40'))[_0xc99b('0x41')](function(_0xdbd801){$(_0xc99b('0x3c'))[_0xc99b('0x34')]&&$('.qd-playerWrapper\x20iframe')[0x0][_0xc99b('0x3d')]['postMessage'](_0xc99b('0x42'),'*');});_0xc99b('0x43')===_0x2ca25d[_0xc99b('0x44')]?_0xe7cdb1[_0xc99b('0x15')](_0xf08308):_0xe7cdb1[_0xc99b('0x45')](_0xf08308);_0xe7cdb1['trigger'](_0xc99b('0x46'),[_0x59165a[vId],_0xe7cdb1]);}};$(document)[_0xc99b('0x47')](_0x31f5a8);$(window)[_0xc99b('0x48')](_0x31f5a8);(function(){var _0x62409e=this;var _0x5ede4a=window[_0xc99b('0x49')]||function(){};window[_0xc99b('0x49')]=function(_0x621476,_0x809727){$(_0x621476||'')['is']('.qd-videoLink')||(_0x5ede4a[_0xc99b('0x35')](this,_0x621476,_0x809727),_0x31f5a8[_0xc99b('0x35')](_0x62409e));};}());}});}(this));

/* Quatro Digital - Mosaic Banners // Carlos Vinicius // Todos os direitos reservados */
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

