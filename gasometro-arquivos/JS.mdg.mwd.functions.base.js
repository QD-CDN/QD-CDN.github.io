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

  				slidesToShow: 3,
  				arrows: false,
				infinite: false,
				draggable: false,
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
			$(".product-kit-link a").bind("click", function () {
				$('html, body').animate({
					scrollTop:
					Math.floor($(".product-description-list-wrapper .productName:contains('" +
						$(this).parents(".kit-item-row").find(".productName").text()
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
var _0xe173=['find','addClass','qd-active','qd-sp-active','.qd_sp_on,\x20.qd_sp_ignored','.qd_active','removeClass','siblings','.qd_sp_on','qd_sp_on','isDiscountFlag','div[skuCorrente]:first','attr','skuCorrente','skus','sku','bestPrice','available','qd-sp-product-unavailable','getDiscountValue','.qd_productPrice','Por\x20alguma\x20razão\x20não\x20consegui\x20obter\x20o\x20preço\x20deste\x20produto\x20:(','appliedDiscount','listPrice','val','skuPrice','.qd-sp-display-discount','html','installments','changeInstallments','.qd_sp_display_installments','.qd_sp_display_installmentValue','.qd_sp_installments','.qd_saveAmount','prepend','changeNativeSaveAmount','each','skuSelected.vtex','qd_sp_processedItem','startedByWrapper','flagElement','call','string','not','.qd_sp_processedItem','forcePromotion','style','display:none\x20!important;','append','after','extend','boolean','body','function','trim','prototype','replace','abs','undefined','round','toFixed','split','length','join','QD_SmartPrice','Smart\x20Price','object','error','info','unshift','alerta','toLowerCase','apply','warn','search','text','match','.flag','[class*=\x27desconto\x27]','.productRightColumn','strong.skuBestPrice','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','---','erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','closest','productPage','wrapperElement','isProductPage'];(function(_0x109dbd,_0x290d2b){var _0x395644=function(_0x5a8c2d){while(--_0x5a8c2d){_0x109dbd['push'](_0x109dbd['shift']());}};_0x395644(++_0x290d2b);}(_0xe173,0x14c));var _0x3e17=function(_0x5c33be,_0x5c14db){_0x5c33be=_0x5c33be-0x0;var _0x2f1d15=_0xe173[_0x5c33be];return _0x2f1d15;};_0x3e17('0x0')!==typeof String['prototype'][_0x3e17('0x1')]&&(String[_0x3e17('0x2')][_0x3e17('0x1')]=function(){return this[_0x3e17('0x3')](/^\s+|\s+$/g,'');});function qd_number_format(_0x5947d8,_0x46bb66,_0x4ab9ec,_0x37334f){_0x5947d8=(_0x5947d8+'')[_0x3e17('0x3')](/[^0-9+\-Ee.]/g,'');_0x5947d8=isFinite(+_0x5947d8)?+_0x5947d8:0x0;_0x46bb66=isFinite(+_0x46bb66)?Math[_0x3e17('0x4')](_0x46bb66):0x0;_0x37334f=_0x3e17('0x5')===typeof _0x37334f?',':_0x37334f;_0x4ab9ec='undefined'===typeof _0x4ab9ec?'.':_0x4ab9ec;var _0x233aaa='',_0x233aaa=function(_0x5d3d76,_0x5ccb89){var _0x46bb66=Math['pow'](0xa,_0x5ccb89);return''+(Math[_0x3e17('0x6')](_0x5d3d76*_0x46bb66)/_0x46bb66)[_0x3e17('0x7')](_0x5ccb89);},_0x233aaa=(_0x46bb66?_0x233aaa(_0x5947d8,_0x46bb66):''+Math['round'](_0x5947d8))[_0x3e17('0x8')]('.');0x3<_0x233aaa[0x0]['length']&&(_0x233aaa[0x0]=_0x233aaa[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x37334f));(_0x233aaa[0x1]||'')[_0x3e17('0x9')]<_0x46bb66&&(_0x233aaa[0x1]=_0x233aaa[0x1]||'',_0x233aaa[0x1]+=Array(_0x46bb66-_0x233aaa[0x1]['length']+0x1)[_0x3e17('0xa')]('0'));return _0x233aaa[_0x3e17('0xa')](_0x4ab9ec);};(function(_0x1bf2fc){'use strict';var _0x17369f=jQuery;if(typeof _0x17369f['fn'][_0x3e17('0xb')]==='function')return;var _0x58b10c=_0x3e17('0xc');var _0x2bde34=function(_0x413c5c,_0x3408f2){if(_0x3e17('0xd')===typeof console&&_0x3e17('0x0')===typeof console[_0x3e17('0xe')]&&_0x3e17('0x0')===typeof console[_0x3e17('0xf')]&&_0x3e17('0x0')===typeof console['warn']){var _0x5f4cb1;'object'===typeof _0x413c5c?(_0x413c5c[_0x3e17('0x10')]('['+_0x58b10c+']\x0a'),_0x5f4cb1=_0x413c5c):_0x5f4cb1=['['+_0x58b10c+']\x0a'+_0x413c5c];if('undefined'===typeof _0x3408f2||_0x3e17('0x11')!==_0x3408f2['toLowerCase']()&&'aviso'!==_0x3408f2[_0x3e17('0x12')]())if(_0x3e17('0x5')!==typeof _0x3408f2&&'info'===_0x3408f2[_0x3e17('0x12')]())try{console['info']['apply'](console,_0x5f4cb1);}catch(_0x5d2fad){console[_0x3e17('0xf')](_0x5f4cb1[_0x3e17('0xa')]('\x0a'));}else try{console[_0x3e17('0xe')]['apply'](console,_0x5f4cb1);}catch(_0xb3d47){console[_0x3e17('0xe')](_0x5f4cb1[_0x3e17('0xa')]('\x0a'));}else try{console['warn'][_0x3e17('0x13')](console,_0x5f4cb1);}catch(_0x4d7633){console[_0x3e17('0x14')](_0x5f4cb1[_0x3e17('0xa')]('\x0a'));}}};var _0x703b9a=/[0-9]+\%/i;var _0x154db9=/[0-9\.]+(?=\%)/i;var _0x6cbe36={'isDiscountFlag':function(_0x5bfaff){if(_0x5bfaff['text']()[_0x3e17('0x15')](_0x703b9a)>-0x1)return!![];return![];},'getDiscountValue':function(_0x5abc22){return _0x5abc22[_0x3e17('0x16')]()[_0x3e17('0x17')](_0x154db9);},'startedByWrapper':![],'flagElement':_0x3e17('0x18'),'wrapperElement':'li','filterFlagBy':_0x3e17('0x19'),'forcePromotion':null,'appliedDiscount':null,'oneFlagByItem':!![],'isSmartCheckout':!![],'changeInstallments':![],'productPage':{'changeNativeSaveAmount':!![],'changeNativePrice':!![],'changeInstallments':![],'isProductPage':'auto','wrapperElement':_0x3e17('0x1a'),'skuBestPrice':_0x3e17('0x1b'),'installments':'label.skuBestInstallmentNumber','installmentValue':'label.skuBestInstallmentValue','skuPrice':'strong.skuPrice'}};_0x17369f['fn'][_0x3e17('0xb')]=function(){};var _0x7b1cd=function(_0x6bb044){var _0x5ac29e={'t':_0x3e17('0x1c')};return function(_0x14881b){var _0x5c06e0,_0x445525,_0x2616dc,_0x1cdb7a;_0x445525=function(_0x550465){return _0x550465;};_0x2616dc=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x14881b=_0x14881b['d'+_0x2616dc[0x10]+'c'+_0x2616dc[0x11]+'m'+_0x445525(_0x2616dc[0x1])+'n'+_0x2616dc[0xd]]['l'+_0x2616dc[0x12]+'c'+_0x2616dc[0x0]+'ti'+_0x445525('o')+'n'];_0x5c06e0=function(_0x38c4f3){return escape(encodeURIComponent(_0x38c4f3[_0x3e17('0x3')](/\./g,'¨')[_0x3e17('0x3')](/[a-zA-Z]/g,function(_0x1234a8){return String[_0x3e17('0x1d')](('Z'>=_0x1234a8?0x5a:0x7a)>=(_0x1234a8=_0x1234a8[_0x3e17('0x1e')](0x0)+0xd)?_0x1234a8:_0x1234a8-0x1a);})));};var _0x1a4056=_0x5c06e0(_0x14881b[[_0x2616dc[0x9],_0x445525('o'),_0x2616dc[0xc],_0x2616dc[_0x445525(0xd)]]['join']('')]);_0x5c06e0=_0x5c06e0((window[['js',_0x445525('no'),'m',_0x2616dc[0x1],_0x2616dc[0x4][_0x3e17('0x1f')](),'ite'][_0x3e17('0xa')]('')]||_0x3e17('0x20'))+['.v',_0x2616dc[0xd],'e',_0x445525('x'),'co',_0x445525('mm'),_0x3e17('0x21'),_0x2616dc[0x1],'.c',_0x445525('o'),'m.',_0x2616dc[0x13],'r']['join'](''));for(var _0xc16608 in _0x5ac29e){if(_0x5c06e0===_0xc16608+_0x5ac29e[_0xc16608]||_0x1a4056===_0xc16608+_0x5ac29e[_0xc16608]){_0x1cdb7a='tr'+_0x2616dc[0x11]+'e';break;}_0x1cdb7a='f'+_0x2616dc[0x0]+'ls'+_0x445525(_0x2616dc[0x1])+'';}_0x445525=!0x1;-0x1<_0x14881b[[_0x2616dc[0xc],'e',_0x2616dc[0x0],'rc',_0x2616dc[0x9]]['join']('')][_0x3e17('0x22')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x445525=!0x0);return[_0x1cdb7a,_0x445525];}(_0x6bb044);}(window);if(!eval(_0x7b1cd[0x0]))return _0x7b1cd[0x1]?_0x2bde34(_0x3e17('0x23')):!0x1;var _0x227f6d=function(_0x3bf613,_0x143171){'use strict';var _0x299fa0=function(_0x22892d){'use strict';var _0x40be7a,_0x333ea0,_0x2d4383,_0x562bf8,_0x5d3f24,_0x30a905,_0xf872,_0x460b90,_0x539e52,_0x339a2d,_0x2b2f10,_0x1f5910,_0x8b2edd,_0x2d3026,_0x468604,_0x3a6046,_0x192876,_0xf1f72f,_0x26463d;var _0x122883=_0x17369f(this);_0x22892d=typeof _0x22892d===_0x3e17('0x5')?![]:_0x22892d;if(_0x143171['productPage']['isProductPage'])var _0xd4a565=_0x122883[_0x3e17('0x24')](_0x143171[_0x3e17('0x25')][_0x3e17('0x26')]);else var _0xd4a565=_0x122883['closest'](_0x143171[_0x3e17('0x26')]);if(!_0x22892d&&!_0x122883['is'](_0x143171['filterFlagBy'])){if(_0x143171[_0x3e17('0x25')][_0x3e17('0x27')]&&_0xd4a565['is'](_0x143171[_0x3e17('0x25')]['wrapperElement'])){_0xd4a565[_0x3e17('0x28')](_0x143171[_0x3e17('0x25')]['skuBestPrice'])[_0x3e17('0x29')](_0x3e17('0x2a'));_0xd4a565[_0x3e17('0x29')](_0x3e17('0x2b'));}return;}var _0x5d1f60=_0x143171[_0x3e17('0x25')][_0x3e17('0x27')];if(_0x122883['is'](_0x3e17('0x2c'))&&!_0x5d1f60)return;if(_0x5d1f60){_0x460b90=_0xd4a565[_0x3e17('0x28')](_0x143171['productPage']['skuBestPrice']);if(_0x460b90[_0x3e17('0x28')](_0x3e17('0x2d'))[_0x3e17('0x9')])return;_0x460b90[_0x3e17('0x2e')]('qd-active');_0xd4a565[_0x3e17('0x2e')]('qd-sp-active');}if(_0x143171['oneFlagByItem']&&_0x122883[_0x3e17('0x2f')](_0x3e17('0x30'))[_0x3e17('0x9')]){_0x122883[_0x3e17('0x29')]('qd_sp_ignored');return;}_0x122883[_0x3e17('0x29')](_0x3e17('0x31'));if(!_0x143171[_0x3e17('0x32')](_0x122883))return;if(_0x5d1f60){_0x2d4383={};var _0x497135=parseInt(_0x17369f(_0x3e17('0x33'))[_0x3e17('0x34')](_0x3e17('0x35')),0xa);if(_0x497135){for(var _0x3d6a80=0x0;_0x3d6a80<skuJson[_0x3e17('0x36')][_0x3e17('0x9')];_0x3d6a80++){if(skuJson[_0x3e17('0x36')][_0x3d6a80][_0x3e17('0x37')]==_0x497135){_0x2d4383=skuJson[_0x3e17('0x36')][_0x3d6a80];break;}}}else{var _0x3f87a1=0x5af3107a3fff;for(var _0x13932a in skuJson[_0x3e17('0x36')]){if(typeof skuJson['skus'][_0x13932a]==='function')continue;if(!skuJson[_0x3e17('0x36')][_0x13932a]['available'])continue;if(skuJson['skus'][_0x13932a]['bestPrice']<_0x3f87a1){_0x3f87a1=skuJson[_0x3e17('0x36')][_0x13932a][_0x3e17('0x38')];_0x2d4383=skuJson[_0x3e17('0x36')][_0x13932a];}}}}_0x3a6046=!![];_0x192876=0x0;if(_0x143171['isSmartCheckout']&&_0xf1f72f){_0x3a6046=skuJson[_0x3e17('0x39')];if(!_0x3a6046)return _0xd4a565[_0x3e17('0x29')](_0x3e17('0x3a'));}_0x333ea0=_0x143171[_0x3e17('0x3b')](_0x122883);_0x40be7a=parseFloat(_0x333ea0,0xa);if(isNaN(_0x40be7a))return _0x2bde34(['O\x20valor\x20informado\x20p/\x20o\x20desconto\x20não\x20é\x20um\x20número.',_0x122883],_0x3e17('0x11'));var _0x2eeccd=function(_0x333da9){if(_0x5d1f60)_0x562bf8=(_0x333da9[_0x3e17('0x38')]||0x0)/0x64;else{_0x8b2edd=_0xd4a565[_0x3e17('0x28')](_0x3e17('0x3c'));_0x562bf8=parseFloat((_0x8b2edd['val']()||'')[_0x3e17('0x3')](/[^0-9\.\,]+/i,'')[_0x3e17('0x3')]('.','')[_0x3e17('0x3')](',','.'),0xa);}if(isNaN(_0x562bf8))return _0x2bde34([_0x3e17('0x3d'),_0x122883,_0xd4a565]);if(_0x143171['appliedDiscount']!==null){_0x2d3026=0x0;if(!isNaN(_0x143171[_0x3e17('0x3e')]))_0x2d3026=_0x143171[_0x3e17('0x3e')];else{_0x468604=_0xd4a565[_0x3e17('0x28')](_0x143171[_0x3e17('0x3e')]);if(_0x468604[_0x3e17('0x9')])_0x2d3026=_0x143171['getDiscountValue'](_0x468604);}_0x2d3026=parseFloat(_0x2d3026,0xa);if(isNaN(_0x2d3026))_0x2d3026=0x0;if(_0x2d3026!==0x0)_0x562bf8=_0x562bf8*0x64/(0x64-_0x2d3026);}if(_0x5d1f60)_0x5d3f24=(_0x333da9[_0x3e17('0x3f')]||0x0)/0x64;else _0x5d3f24=parseFloat((_0xd4a565[_0x3e17('0x28')]('.qd_productOldPrice')[_0x3e17('0x40')]()||'')[_0x3e17('0x3')](/[^0-9\.\,]+/i,'')['replace']('.','')['replace'](',','.'),0xa);if(isNaN(_0x5d3f24))_0x5d3f24=0.001;_0x30a905=_0x562bf8*((0x64-_0x40be7a)/0x64);if(_0x5d1f60&&_0x143171['productPage']['changeNativePrice']){_0x460b90['text'](_0x460b90['text']()[_0x3e17('0x1')]()[_0x3e17('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x30a905,0x2,',','.')))['addClass'](_0x3e17('0x2a'));_0xd4a565[_0x3e17('0x29')](_0x3e17('0x2b'));}else{_0x26463d=_0xd4a565['find']('.qd_displayPrice');_0x26463d[_0x3e17('0x16')](_0x26463d['text']()[_0x3e17('0x3')](/[0-9\.]+,[0-9]+/i,'')+qd_number_format(_0x30a905,0x2,',','.'));}if(_0x5d1f60){_0xf872=_0xd4a565[_0x3e17('0x28')](_0x143171[_0x3e17('0x25')][_0x3e17('0x41')]);if(_0xf872['length'])_0xf872[_0x3e17('0x16')](_0xf872[_0x3e17('0x16')]()[_0x3e17('0x1')]()[_0x3e17('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x30a905,0x2,',','.')));}var _0x1b9d74=_0xd4a565['find'](_0x3e17('0x42'));_0x1b9d74[_0x3e17('0x16')](_0x1b9d74[_0x3e17('0x16')]()[_0x3e17('0x3')](/[0-9]+\%/i,_0x40be7a+'%'));var _0x2e231b=function(_0x2acaf2,_0x48e4cc,_0x412b82){var _0x2b3f8c=_0xd4a565[_0x3e17('0x28')](_0x2acaf2);if(_0x2b3f8c[_0x3e17('0x9')])_0x2b3f8c[_0x3e17('0x43')](_0x2b3f8c[_0x3e17('0x43')]()[_0x3e17('0x1')]()[_0x3e17('0x3')](/[0-9]{1,2}/,_0x412b82?_0x412b82:_0x333da9[_0x3e17('0x44')]||0x0));var _0x133bb3=_0xd4a565['find'](_0x48e4cc);if(_0x133bb3[_0x3e17('0x9')])_0x133bb3[_0x3e17('0x43')](_0x133bb3[_0x3e17('0x43')]()[_0x3e17('0x1')]()[_0x3e17('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x30a905/(_0x412b82?_0x412b82:_0x333da9[_0x3e17('0x44')]||0x1),0x2,',','.')));};if(_0x5d1f60&&_0x143171[_0x3e17('0x25')]['changeInstallments'])_0x2e231b(_0x143171[_0x3e17('0x25')][_0x3e17('0x44')],_0x143171[_0x3e17('0x25')]['installmentValue']);else if(_0x143171[_0x3e17('0x45')])_0x2e231b(_0x3e17('0x46'),_0x3e17('0x47'),parseInt(_0xd4a565[_0x3e17('0x28')](_0x3e17('0x48'))[_0x3e17('0x40')]()||0x1)||0x1);_0xd4a565[_0x3e17('0x28')](_0x3e17('0x49'))['append'](qd_number_format(_0x5d3f24-_0x30a905,0x2,',','.'));_0xd4a565[_0x3e17('0x28')]('.qd_saveAmountPercent')[_0x3e17('0x4a')](qd_number_format((_0x5d3f24-_0x30a905)*0x64/_0x5d3f24,0x2,',','.'));if(_0x5d1f60&&_0x143171[_0x3e17('0x25')][_0x3e17('0x4b')]){_0x17369f('em.economia-de')[_0x3e17('0x4c')](function(){_0x2b2f10=_0x17369f(this);_0x2b2f10['text'](_0x2b2f10[_0x3e17('0x16')]()[_0x3e17('0x1')]()['replace'](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x5d3f24-_0x30a905,0x2,',','.')));_0x2b2f10[_0x3e17('0x29')](_0x3e17('0x2a'));});}};_0x2eeccd(_0x2d4383);if(_0x5d1f60)_0x17369f(window)['on'](_0x3e17('0x4d'),function(_0x3febb2,_0x2e62aa,_0x3c419e){_0x2eeccd(_0x3c419e);});_0xd4a565[_0x3e17('0x29')](_0x3e17('0x4e'));if(!_0x5d1f60)_0x8b2edd[_0x3e17('0x29')](_0x3e17('0x4e'));};(_0x143171[_0x3e17('0x4f')]?_0x3bf613[_0x3e17('0x28')](_0x143171[_0x3e17('0x50')]):_0x3bf613)[_0x3e17('0x4c')](function(){_0x299fa0[_0x3e17('0x51')](this,![]);});if(typeof _0x143171['forcePromotion']==_0x3e17('0x52')){var _0x59cc2b=_0x143171[_0x3e17('0x4f')]?_0x3bf613:_0x3bf613[_0x3e17('0x24')](_0x143171['wrapperElement']);if(_0x143171['productPage'][_0x3e17('0x27')])_0x59cc2b=_0x59cc2b[_0x3e17('0x24')](_0x143171[_0x3e17('0x25')][_0x3e17('0x26')])[_0x3e17('0x53')](_0x3e17('0x54'));else _0x59cc2b=_0x59cc2b[_0x3e17('0x28')]('.qd_productPrice:not(.qd_sp_processedItem)');_0x59cc2b[_0x3e17('0x4c')](function(){var _0xc64c8=_0x17369f(_0x143171[_0x3e17('0x55')]);_0xc64c8[_0x3e17('0x34')](_0x3e17('0x56'),_0x3e17('0x57'));if(_0x143171['productPage']['isProductPage'])_0x17369f(this)[_0x3e17('0x58')](_0xc64c8);else _0x17369f(this)[_0x3e17('0x59')](_0xc64c8);_0x299fa0[_0x3e17('0x51')](_0xc64c8,!![]);});}};_0x17369f['fn']['QD_SmartPrice']=function(_0x480e48){var _0x17d9f7=_0x17369f(this);if(!_0x17d9f7[_0x3e17('0x9')])return _0x17d9f7;var _0x1e057d=_0x17369f[_0x3e17('0x5a')](!![],{},_0x6cbe36,_0x480e48);if(typeof _0x1e057d['productPage'][_0x3e17('0x27')]!=_0x3e17('0x5b'))_0x1e057d[_0x3e17('0x25')][_0x3e17('0x27')]=_0x17369f(document[_0x3e17('0x5c')])['is']('.produto');_0x227f6d(_0x17d9f7,_0x1e057d);return _0x17d9f7;};}(this));
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
var _0xe559=['toUpperCase','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','url','html','img[alt=\x27','getParent','.box-banner','clone','hide','qd-am-content-loaded','text','trim','attr','data-qdam-value','[class*=\x27colunas\x27]','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','call','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','li\x20>ul',':not(ul)','qd-am-elem-','replaceSpecialChars','qdAmAddNdx','qd-amazing-menu','>li','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','children','qd-am-level-','qd-am-','-li','callback','QuatroDigital.am.callback','extend','exec','closest','/qd-amazing-menu','undefined','error','object','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','aviso','toLowerCase','info','apply','join','warn','each','addClass','qd-am-li-','QD_amazingMenu','replace','fromCharCode'];(function(_0x15c18e,_0x3d3288){var _0x24e232=function(_0x23f9eb){while(--_0x23f9eb){_0x15c18e['push'](_0x15c18e['shift']());}};_0x24e232(++_0x3d3288);}(_0xe559,0x13b));var _0x9e55=function(_0x64bf40,_0x3cc4de){_0x64bf40=_0x64bf40-0x0;var _0x3e7de3=_0xe559[_0x64bf40];return _0x3e7de3;};(function(_0xccd07f){_0xccd07f['fn']['getParent']=_0xccd07f['fn'][_0x9e55('0x0')];}(jQuery));(function(_0x3254e2){var _0x178284;var _0xd1c986=jQuery;if('function'!==typeof _0xd1c986['fn']['QD_amazingMenu']){var _0x4a16c1={'url':_0x9e55('0x1'),'callback':function(){},'ajaxCallback':function(){}};var _0xc1ee23=function(_0x3d4cf7,_0x3d9f1f){if('object'===typeof console&&_0x9e55('0x2')!==typeof console[_0x9e55('0x3')]&&'undefined'!==typeof console['info']&&_0x9e55('0x2')!==typeof console['warn']){var _0x264c49;_0x9e55('0x4')===typeof _0x3d4cf7?(_0x3d4cf7[_0x9e55('0x5')](_0x9e55('0x6')),_0x264c49=_0x3d4cf7):_0x264c49=['[QD\x20Amazing\x20Menu]\x0a'+_0x3d4cf7];if(_0x9e55('0x2')===typeof _0x3d9f1f||_0x9e55('0x7')!==_0x3d9f1f['toLowerCase']()&&_0x9e55('0x8')!==_0x3d9f1f[_0x9e55('0x9')]())if(_0x9e55('0x2')!==typeof _0x3d9f1f&&_0x9e55('0xa')===_0x3d9f1f[_0x9e55('0x9')]())try{console[_0x9e55('0xa')][_0x9e55('0xb')](console,_0x264c49);}catch(_0x2d20ca){try{console[_0x9e55('0xa')](_0x264c49[_0x9e55('0xc')]('\x0a'));}catch(_0x36ba4f){}}else try{console[_0x9e55('0x3')][_0x9e55('0xb')](console,_0x264c49);}catch(_0x3486ae){try{console[_0x9e55('0x3')](_0x264c49[_0x9e55('0xc')]('\x0a'));}catch(_0xe5c7f2){}}else try{console[_0x9e55('0xd')][_0x9e55('0xb')](console,_0x264c49);}catch(_0x5422d1){try{console['warn'](_0x264c49[_0x9e55('0xc')]('\x0a'));}catch(_0x287b8f){}}}};_0xd1c986['fn']['qdAmAddNdx']=function(){var _0x2fc288=_0xd1c986(this);_0x2fc288[_0x9e55('0xe')](function(_0x46e920){_0xd1c986(this)[_0x9e55('0xf')](_0x9e55('0x10')+_0x46e920);});_0x2fc288['first']()[_0x9e55('0xf')]('qd-am-first');_0x2fc288['last']()['addClass']('qd-am-last');return _0x2fc288;};_0xd1c986['fn'][_0x9e55('0x11')]=function(){};_0x3254e2=function(_0x3ee66e){var _0x2c2062={'t':'nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x43cfc4){var _0x59bcbf=function(_0xa779f9){return _0xa779f9;};var _0x58dc54=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x43cfc4=_0x43cfc4['d'+_0x58dc54[0x10]+'c'+_0x58dc54[0x11]+'m'+_0x59bcbf(_0x58dc54[0x1])+'n'+_0x58dc54[0xd]]['l'+_0x58dc54[0x12]+'c'+_0x58dc54[0x0]+'ti'+_0x59bcbf('o')+'n'];var _0x2ef1f0=function(_0x362d0c){return escape(encodeURIComponent(_0x362d0c[_0x9e55('0x12')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x2bcce3){return String[_0x9e55('0x13')](('Z'>=_0x2bcce3?0x5a:0x7a)>=(_0x2bcce3=_0x2bcce3['charCodeAt'](0x0)+0xd)?_0x2bcce3:_0x2bcce3-0x1a);})));};var _0x25869b=_0x2ef1f0(_0x43cfc4[[_0x58dc54[0x9],_0x59bcbf('o'),_0x58dc54[0xc],_0x58dc54[_0x59bcbf(0xd)]]['join']('')]);_0x2ef1f0=_0x2ef1f0((window[['js',_0x59bcbf('no'),'m',_0x58dc54[0x1],_0x58dc54[0x4][_0x9e55('0x14')](),_0x9e55('0x15')][_0x9e55('0xc')]('')]||_0x9e55('0x16'))+['.v',_0x58dc54[0xd],'e',_0x59bcbf('x'),'co',_0x59bcbf('mm'),_0x9e55('0x17'),_0x58dc54[0x1],'.c',_0x59bcbf('o'),'m.',_0x58dc54[0x13],'r'][_0x9e55('0xc')](''));for(var _0x15ab75 in _0x2c2062){if(_0x2ef1f0===_0x15ab75+_0x2c2062[_0x15ab75]||_0x25869b===_0x15ab75+_0x2c2062[_0x15ab75]){var _0x537caa='tr'+_0x58dc54[0x11]+'e';break;}_0x537caa='f'+_0x58dc54[0x0]+'ls'+_0x59bcbf(_0x58dc54[0x1])+'';}_0x59bcbf=!0x1;-0x1<_0x43cfc4[[_0x58dc54[0xc],'e',_0x58dc54[0x0],'rc',_0x58dc54[0x9]][_0x9e55('0xc')]('')]['indexOf'](_0x9e55('0x18'))&&(_0x59bcbf=!0x0);return[_0x537caa,_0x59bcbf];}(_0x3ee66e);}(window);if(!eval(_0x3254e2[0x0]))return _0x3254e2[0x1]?_0xc1ee23(_0x9e55('0x19')):!0x1;var _0x4e4b9e=function(_0x342737){var _0x476415=_0x342737[_0x9e55('0x1a')]('.qd_am_code');var _0x5086a1=_0x476415['filter']('.qd-am-banner');var _0x17f537=_0x476415['filter']('.qd-am-collection');if(_0x5086a1[_0x9e55('0x1b')]||_0x17f537[_0x9e55('0x1b')])_0x5086a1[_0x9e55('0x1c')]()['addClass'](_0x9e55('0x1d')),_0x17f537[_0x9e55('0x1c')]()[_0x9e55('0xf')](_0x9e55('0x1e')),_0xd1c986['qdAjax']({'url':_0x178284[_0x9e55('0x1f')],'dataType':_0x9e55('0x20'),'success':function(_0xe03669){var _0x39c4c6=_0xd1c986(_0xe03669);_0x5086a1[_0x9e55('0xe')](function(){var _0xe03669=_0xd1c986(this);var _0x2d6b73=_0x39c4c6['find'](_0x9e55('0x21')+_0xe03669['attr']('data-qdam-value')+'\x27]');_0x2d6b73[_0x9e55('0x1b')]&&(_0x2d6b73[_0x9e55('0xe')](function(){_0xd1c986(this)[_0x9e55('0x22')](_0x9e55('0x23'))[_0x9e55('0x24')]()['insertBefore'](_0xe03669);}),_0xe03669[_0x9e55('0x25')]());})['addClass'](_0x9e55('0x26'));_0x17f537[_0x9e55('0xe')](function(){var _0xe03669={};var _0x47516a=_0xd1c986(this);_0x39c4c6[_0x9e55('0x1a')]('h2')[_0x9e55('0xe')](function(){if(_0xd1c986(this)[_0x9e55('0x27')]()[_0x9e55('0x28')]()[_0x9e55('0x9')]()==_0x47516a[_0x9e55('0x29')](_0x9e55('0x2a'))[_0x9e55('0x28')]()[_0x9e55('0x9')]())return _0xe03669=_0xd1c986(this),!0x1;});_0xe03669[_0x9e55('0x1b')]&&(_0xe03669[_0x9e55('0xe')](function(){_0xd1c986(this)[_0x9e55('0x22')](_0x9e55('0x2b'))[_0x9e55('0x24')]()['insertBefore'](_0x47516a);}),_0x47516a['hide']());})[_0x9e55('0xf')](_0x9e55('0x26'));},'error':function(){_0xc1ee23(_0x9e55('0x2c')+_0x178284[_0x9e55('0x1f')]+'\x27\x20falho.');},'complete':function(){_0x178284['ajaxCallback'][_0x9e55('0x2d')](this);_0xd1c986(window)[_0x9e55('0x2e')](_0x9e55('0x2f'),_0x342737);},'clearQueueDelay':0xbb8});};_0xd1c986[_0x9e55('0x11')]=function(_0x4a68b7){var _0x5526ce=_0x4a68b7[_0x9e55('0x1a')](_0x9e55('0x30'))[_0x9e55('0xe')](function(){var _0x39e5d5=_0xd1c986(this);if(!_0x39e5d5[_0x9e55('0x1b')])return _0xc1ee23(['UL\x20do\x20menu\x20não\x20encontrada',_0x4a68b7],_0x9e55('0x7'));_0x39e5d5[_0x9e55('0x1a')](_0x9e55('0x31'))['parent']()[_0x9e55('0xf')]('qd-am-has-ul');_0x39e5d5['find']('li')[_0x9e55('0xe')](function(){var _0x54a6db=_0xd1c986(this);var _0xcdd8fa=_0x54a6db['children'](_0x9e55('0x32'));_0xcdd8fa['length']&&_0x54a6db[_0x9e55('0xf')](_0x9e55('0x33')+_0xcdd8fa['first']()[_0x9e55('0x27')]()[_0x9e55('0x28')]()[_0x9e55('0x34')]()[_0x9e55('0x12')](/\./g,'')[_0x9e55('0x12')](/\s/g,'-')['toLowerCase']());});var _0x2becac=_0x39e5d5['find']('>li')[_0x9e55('0x35')]();_0x39e5d5[_0x9e55('0xf')](_0x9e55('0x36'));_0x2becac=_0x2becac['find']('>ul');_0x2becac[_0x9e55('0xe')](function(){var _0x14b18c=_0xd1c986(this);_0x14b18c[_0x9e55('0x1a')](_0x9e55('0x37'))['qdAmAddNdx']()[_0x9e55('0xf')](_0x9e55('0x38'));_0x14b18c['addClass'](_0x9e55('0x39'));_0x14b18c[_0x9e55('0x1c')]()['addClass'](_0x9e55('0x3a'));});_0x2becac[_0x9e55('0xf')]('qd-am-dropdown');var _0x579434=0x0,_0x3254e2=function(_0x661770){_0x579434+=0x1;_0x661770=_0x661770[_0x9e55('0x3b')]('li')[_0x9e55('0x3b')]('*');_0x661770['length']&&(_0x661770[_0x9e55('0xf')](_0x9e55('0x3c')+_0x579434),_0x3254e2(_0x661770));};_0x3254e2(_0x39e5d5);_0x39e5d5['add'](_0x39e5d5[_0x9e55('0x1a')]('ul'))[_0x9e55('0xe')](function(){var _0x177b8f=_0xd1c986(this);_0x177b8f[_0x9e55('0xf')](_0x9e55('0x3d')+_0x177b8f[_0x9e55('0x3b')]('li')[_0x9e55('0x1b')]+_0x9e55('0x3e'));});});_0x4e4b9e(_0x5526ce);_0x178284[_0x9e55('0x3f')][_0x9e55('0x2d')](this);_0xd1c986(window)[_0x9e55('0x2e')](_0x9e55('0x40'),_0x4a68b7);};_0xd1c986['fn'][_0x9e55('0x11')]=function(_0x578757){var _0x37ae87=_0xd1c986(this);if(!_0x37ae87[_0x9e55('0x1b')])return _0x37ae87;_0x178284=_0xd1c986[_0x9e55('0x41')]({},_0x4a16c1,_0x578757);_0x37ae87[_0x9e55('0x42')]=new _0xd1c986[(_0x9e55('0x11'))](_0xd1c986(this));return _0x37ae87;};_0xd1c986(function(){_0xd1c986('.qd_amazing_menu_auto')[_0x9e55('0x11')]();});}}(this));

/* Quatro Digital Smart Cart */
var _0xd404=['Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','.qd-bap-wrapper','remove','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','prodId','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','QD_smartCart','dropDown','smartCart','getParent','replace','abs','undefined','pow','toFixed','length','join','function','prototype','trim','capitalize','charAt','toUpperCase','slice','qdAjax','qdAjaxQueue','jquery','000','error','extend','data','stringify','toString','type','jqXHR','ajax','done','fail','always','complete','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','message','version','4.0','simpleCart','getOrderForm','checkout','QuatroDigital_simpleCart','ajaxStopOn','object','alerta','toLowerCase','warn','info','[Simple\x20Cart]\x0a','QD_simpleCart','elements','add','.qd_cart_total','.qd_items_text','content','each','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','Shipping','value','total','currencySymbol','allTotal','qtt','items','quantity','callback','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','hide','.singular','filter','.plural','show','addClass','qd-emptyCart','removeClass','$this','html','itemsTextE','cartQttE','find','cartTotalE','cartTotal','itemsText','emptyElem','emptyCart','qd-sc-populated','smartCheckout','_QuatroDigital_DropDown','vtexjs','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','QD_checkoutQueue','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','trigger','ajaxRequestbuyButtonAsynchronous','call','.qd_cart_auto','bind','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','Oooops!\x20','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Callbacks','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','.productInformationWrapper\x20\x20a.buy-button','javascript:','body','Produto\x20adicionado\x20ao\x20carrinho!','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','location','href','#produto,\x20.produto','qd-bb-click-active','click.qd_bb_buy_sc','allowBuyClick','clickBuySmartCheckout','preventDefault','Método\x20descontinuado!','buyButton','.qd-sbb-on','.btn-add-buy-button-asynchronous','.remove-href','qd-bb-active','.qd-bb-productAdded','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','prodAdd','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','[href=\x27','---','qd-bb-itemAddBuyButtonWrapper','qd-bb-itemAddCartWrapper','getCartInfoByUrl','isSmartCheckout','função\x20descontinuada','allowUpdate','autoWatchBuyButton','unbind','click','load','attr','indexOf','?redirect=false&','redirect=false','redirect=true','queue','buyIfQuantityZeroed','match','push','productPageCallback','buyButtonClickCallback','split','ku=','pop','shift','asyncCallback','productAddedToCart','fakeRequest','success','parent','_QuatroDigital_prodBuyCallback','Callback\x20não\x20é\x20uma\x20função','QD_buyButton','.qd-bb-itemAddWrapper','prepend','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','ajaxSend','/checkout/cart/add','url','productAddedToCart.qdSbbVtex','QuatroDigital.qd_bb_prod_add','ajaxStop','round','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','QD_dropDownCart','charCodeAt','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','name','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','SDK','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','keyup.qd_ddc_closeFn','keyCode','qd-bb-lightBoxProdAdd','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','scrollCart','.qd-ddc-scrollDown','val','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','cartIsEmpty','mouseleave.qd_ddc_hover','texts','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','shippingForm','.qd-ddc-emptyCart\x20p','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalShipping','.qd-ddc-infoAllTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','Este\x20método\x20esta\x20descontinuado!','qd-ddc-noItems','empty','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','qd-ddc-','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','.qd-ddc-quantity','.qd-ddc-remove','appendTo','address','postalCode','actionButtons','lastSku','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time','qd-ddc-cart-rendered','qd-ddc-cart-empty','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','.qd-ddc-quantityMore','qd-loading','.qd-ddc-quantityMinus','focusout.qd_ddc_change','keyup.qd_ddc_change','.qd-ddc-prodRow','removeProduct','stop','slideUp','$1-$2$3','qdDdcLastPostalCode','calculateShipping','BRA','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['];(function(_0x51020b,_0x38c2c7){var _0x371e47=function(_0x2a538f){while(--_0x2a538f){_0x51020b['push'](_0x51020b['shift']());}};_0x371e47(++_0x38c2c7);}(_0xd404,0x15b));var _0x4d40=function(_0xaa336e,_0x2febee){_0xaa336e=_0xaa336e-0x0;var _0x53f378=_0xd404[_0xaa336e];return _0x53f378;};(function(_0xb8f317){_0xb8f317['fn'][_0x4d40('0x0')]=_0xb8f317['fn']['closest'];}(jQuery));function qd_number_format(_0xb6576c,_0x2322e5,_0x502a67,_0x3e9bbc){_0xb6576c=(_0xb6576c+'')[_0x4d40('0x1')](/[^0-9+\-Ee.]/g,'');_0xb6576c=isFinite(+_0xb6576c)?+_0xb6576c:0x0;_0x2322e5=isFinite(+_0x2322e5)?Math[_0x4d40('0x2')](_0x2322e5):0x0;_0x3e9bbc=_0x4d40('0x3')===typeof _0x3e9bbc?',':_0x3e9bbc;_0x502a67=_0x4d40('0x3')===typeof _0x502a67?'.':_0x502a67;var _0x24a237='',_0x24a237=function(_0x2e4bd8,_0x4a635e){var _0x2322e5=Math[_0x4d40('0x4')](0xa,_0x4a635e);return''+(Math['round'](_0x2e4bd8*_0x2322e5)/_0x2322e5)[_0x4d40('0x5')](_0x4a635e);},_0x24a237=(_0x2322e5?_0x24a237(_0xb6576c,_0x2322e5):''+Math['round'](_0xb6576c))['split']('.');0x3<_0x24a237[0x0][_0x4d40('0x6')]&&(_0x24a237[0x0]=_0x24a237[0x0][_0x4d40('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x3e9bbc));(_0x24a237[0x1]||'')[_0x4d40('0x6')]<_0x2322e5&&(_0x24a237[0x1]=_0x24a237[0x1]||'',_0x24a237[0x1]+=Array(_0x2322e5-_0x24a237[0x1][_0x4d40('0x6')]+0x1)[_0x4d40('0x7')]('0'));return _0x24a237[_0x4d40('0x7')](_0x502a67);};_0x4d40('0x8')!==typeof String[_0x4d40('0x9')][_0x4d40('0xa')]&&(String[_0x4d40('0x9')][_0x4d40('0xa')]=function(){return this[_0x4d40('0x1')](/^\s+|\s+$/g,'');});_0x4d40('0x8')!=typeof String[_0x4d40('0x9')]['capitalize']&&(String[_0x4d40('0x9')][_0x4d40('0xb')]=function(){return this[_0x4d40('0xc')](0x0)[_0x4d40('0xd')]()+this[_0x4d40('0xe')](0x1)['toLowerCase']();});(function(_0x23de7b){if(_0x4d40('0x8')!==typeof _0x23de7b[_0x4d40('0xf')]){var _0xcee25a={};_0x23de7b[_0x4d40('0x10')]=_0xcee25a;0x96>parseInt((_0x23de7b['fn'][_0x4d40('0x11')][_0x4d40('0x1')](/[^0-9]+/g,'')+_0x4d40('0x12'))[_0x4d40('0xe')](0x0,0x3),0xa)&&console&&'function'==typeof console['error']&&console[_0x4d40('0x13')]();_0x23de7b[_0x4d40('0xf')]=function(_0x4e505f){try{var _0x23b8fd=_0x23de7b[_0x4d40('0x14')]({},{'url':'','type':'GET','data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x4e505f);var _0x36d031='object'===typeof _0x23b8fd[_0x4d40('0x15')]?JSON[_0x4d40('0x16')](_0x23b8fd['data']):_0x23b8fd['data'][_0x4d40('0x17')]();var _0x569190=encodeURIComponent(_0x23b8fd['url']+'|'+_0x23b8fd[_0x4d40('0x18')]+'|'+_0x36d031);_0xcee25a[_0x569190]=_0xcee25a[_0x569190]||{};_0x4d40('0x3')==typeof _0xcee25a[_0x569190][_0x4d40('0x19')]?_0xcee25a[_0x569190]['jqXHR']=_0x23de7b[_0x4d40('0x1a')](_0x23b8fd):(_0xcee25a[_0x569190][_0x4d40('0x19')][_0x4d40('0x1b')](_0x23b8fd['success']),_0xcee25a[_0x569190]['jqXHR'][_0x4d40('0x1c')](_0x23b8fd[_0x4d40('0x13')]),_0xcee25a[_0x569190][_0x4d40('0x19')][_0x4d40('0x1d')](_0x23b8fd[_0x4d40('0x1e')]));_0xcee25a[_0x569190]['jqXHR'][_0x4d40('0x1d')](function(){isNaN(parseInt(_0x23b8fd[_0x4d40('0x1f')]))||setTimeout(function(){_0xcee25a[_0x569190]['jqXHR']=void 0x0;},_0x23b8fd['clearQueueDelay']);});return _0xcee25a[_0x569190][_0x4d40('0x19')];}catch(_0x2a0c82){_0x4d40('0x3')!==typeof console&&_0x4d40('0x8')===typeof console[_0x4d40('0x13')]&&console[_0x4d40('0x13')](_0x4d40('0x20')+_0x2a0c82[_0x4d40('0x21')]);}};_0x23de7b[_0x4d40('0xf')][_0x4d40('0x22')]=_0x4d40('0x23');}}(jQuery));(function(_0x4ca431){_0x4ca431['fn']['getParent']=_0x4ca431['fn']['closest'];}(jQuery));(function(){var _0x158a86=jQuery;if(_0x4d40('0x8')!==typeof _0x158a86['fn'][_0x4d40('0x24')]){_0x158a86(function(){var _0x18f18f=vtexjs['checkout'][_0x4d40('0x25')];vtexjs[_0x4d40('0x26')][_0x4d40('0x25')]=function(){return _0x18f18f['call']();};});try{window[_0x4d40('0x27')]=window[_0x4d40('0x27')]||{};window[_0x4d40('0x27')][_0x4d40('0x28')]=!0x1;_0x158a86['fn'][_0x4d40('0x24')]=function(_0x4a3b1c,_0x2f4b22,_0x4ae4ce){var _0x263d0a=function(_0x41dfde,_0x3cd439){if(_0x4d40('0x29')===typeof console){var _0x50f0d0='object'===typeof _0x41dfde;_0x4d40('0x3')!==typeof _0x3cd439&&_0x4d40('0x2a')===_0x3cd439[_0x4d40('0x2b')]()?_0x50f0d0?console[_0x4d40('0x2c')]('[Simple\x20Cart]\x0a',_0x41dfde[0x0],_0x41dfde[0x1],_0x41dfde[0x2],_0x41dfde[0x3],_0x41dfde[0x4],_0x41dfde[0x5],_0x41dfde[0x6],_0x41dfde[0x7]):console[_0x4d40('0x2c')]('[Simple\x20Cart]\x0a'+_0x41dfde):_0x4d40('0x3')!==typeof _0x3cd439&&_0x4d40('0x2d')===_0x3cd439[_0x4d40('0x2b')]()?_0x50f0d0?console[_0x4d40('0x2d')](_0x4d40('0x2e'),_0x41dfde[0x0],_0x41dfde[0x1],_0x41dfde[0x2],_0x41dfde[0x3],_0x41dfde[0x4],_0x41dfde[0x5],_0x41dfde[0x6],_0x41dfde[0x7]):console[_0x4d40('0x2d')](_0x4d40('0x2e')+_0x41dfde):_0x50f0d0?console[_0x4d40('0x13')](_0x4d40('0x2e'),_0x41dfde[0x0],_0x41dfde[0x1],_0x41dfde[0x2],_0x41dfde[0x3],_0x41dfde[0x4],_0x41dfde[0x5],_0x41dfde[0x6],_0x41dfde[0x7]):console[_0x4d40('0x13')]('[Simple\x20Cart]\x0a'+_0x41dfde);}};var _0x139f59=_0x158a86(this);_0x4d40('0x29')===typeof _0x4a3b1c?_0x2f4b22=_0x4a3b1c:(_0x4a3b1c=_0x4a3b1c||!0x1,_0x139f59=_0x139f59['add'](_0x158a86['QD_simpleCart']['elements']));if(!_0x139f59[_0x4d40('0x6')])return _0x139f59;_0x158a86[_0x4d40('0x2f')]['elements']=_0x158a86[_0x4d40('0x2f')][_0x4d40('0x30')][_0x4d40('0x31')](_0x139f59);_0x4ae4ce=_0x4d40('0x3')===typeof _0x4ae4ce?!0x1:_0x4ae4ce;var _0x25bf3b={'cartQtt':'.qd_cart_qtt','cartTotal':_0x4d40('0x32'),'itemsText':_0x4d40('0x33'),'currencySymbol':(_0x158a86('meta[name=currency]')['attr'](_0x4d40('0x34'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x11ed1a=_0x158a86['extend']({},_0x25bf3b,_0x2f4b22);var _0x3410c2=_0x158a86('');_0x139f59[_0x4d40('0x35')](function(){var _0x4ab819=_0x158a86(this);_0x4ab819[_0x4d40('0x15')](_0x4d40('0x36'))||_0x4ab819['data'](_0x4d40('0x36'),_0x11ed1a);});var _0xc72635=function(_0x4841ac){window[_0x4d40('0x37')]=window['_QuatroDigital_CartData']||{};for(var _0x4a3b1c=0x0,_0x26a23f=0x0,_0x536127=0x0;_0x536127<_0x4841ac[_0x4d40('0x38')][_0x4d40('0x6')];_0x536127++)_0x4d40('0x39')==_0x4841ac[_0x4d40('0x38')][_0x536127]['id']&&(_0x26a23f+=_0x4841ac[_0x4d40('0x38')][_0x536127][_0x4d40('0x3a')]),_0x4a3b1c+=_0x4841ac['totalizers'][_0x536127][_0x4d40('0x3a')];window[_0x4d40('0x37')][_0x4d40('0x3b')]=_0x11ed1a[_0x4d40('0x3c')]+qd_number_format(_0x4a3b1c/0x64,0x2,',','.');window[_0x4d40('0x37')]['shipping']=_0x11ed1a[_0x4d40('0x3c')]+qd_number_format(_0x26a23f/0x64,0x2,',','.');window['_QuatroDigital_CartData'][_0x4d40('0x3d')]=_0x11ed1a[_0x4d40('0x3c')]+qd_number_format((_0x4a3b1c+_0x26a23f)/0x64,0x2,',','.');window[_0x4d40('0x37')][_0x4d40('0x3e')]=0x0;if(_0x11ed1a['showQuantityByItems'])for(_0x536127=0x0;_0x536127<_0x4841ac[_0x4d40('0x3f')][_0x4d40('0x6')];_0x536127++)window['_QuatroDigital_CartData'][_0x4d40('0x3e')]+=_0x4841ac['items'][_0x536127][_0x4d40('0x40')];else window[_0x4d40('0x37')][_0x4d40('0x3e')]=_0x4841ac[_0x4d40('0x3f')]['length']||0x0;try{window[_0x4d40('0x37')]['callback']&&window[_0x4d40('0x37')][_0x4d40('0x41')][_0x4d40('0x42')]&&window[_0x4d40('0x37')]['callback'][_0x4d40('0x42')]();}catch(_0x325e73){_0x263d0a(_0x4d40('0x43'));}_0x4604e7(_0x3410c2);};var _0x363fcc=function(_0x4990f9,_0x8933ee){0x1===_0x4990f9?_0x8933ee[_0x4d40('0x44')]()['filter'](_0x4d40('0x45'))['show']():_0x8933ee[_0x4d40('0x44')]()[_0x4d40('0x46')](_0x4d40('0x47'))[_0x4d40('0x48')]();};var _0x26a28f=function(_0x351900){0x1>_0x351900?_0x139f59[_0x4d40('0x49')](_0x4d40('0x4a')):_0x139f59[_0x4d40('0x4b')]('qd-emptyCart');};var _0x532fde=function(_0x1bac2d,_0x1314a6){var _0x126abe=parseInt(window[_0x4d40('0x37')]['qtt'],0xa);_0x1314a6[_0x4d40('0x4c')][_0x4d40('0x48')]();isNaN(_0x126abe)&&(_0x263d0a('O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.',_0x4d40('0x2a')),_0x126abe=0x0);_0x1314a6['cartTotalE'][_0x4d40('0x4d')](window[_0x4d40('0x37')][_0x4d40('0x3b')]);_0x1314a6['cartQttE'][_0x4d40('0x4d')](_0x126abe);_0x363fcc(_0x126abe,_0x1314a6[_0x4d40('0x4e')]);_0x26a28f(_0x126abe);};var _0x4604e7=function(_0x55df43){_0x139f59[_0x4d40('0x35')](function(){var _0x52861d={};var _0x3191a2=_0x158a86(this);_0x4a3b1c&&_0x3191a2[_0x4d40('0x15')]('qd_simpleCartOpts')&&_0x158a86[_0x4d40('0x14')](_0x11ed1a,_0x3191a2['data'](_0x4d40('0x36')));_0x52861d['$this']=_0x3191a2;_0x52861d[_0x4d40('0x4f')]=_0x3191a2[_0x4d40('0x50')](_0x11ed1a['cartQtt'])||_0x3410c2;_0x52861d[_0x4d40('0x51')]=_0x3191a2[_0x4d40('0x50')](_0x11ed1a[_0x4d40('0x52')])||_0x3410c2;_0x52861d[_0x4d40('0x4e')]=_0x3191a2[_0x4d40('0x50')](_0x11ed1a[_0x4d40('0x53')])||_0x3410c2;_0x52861d[_0x4d40('0x54')]=_0x3191a2[_0x4d40('0x50')](_0x11ed1a[_0x4d40('0x55')])||_0x3410c2;_0x532fde(_0x55df43,_0x52861d);_0x3191a2[_0x4d40('0x49')](_0x4d40('0x56'));});};(function(){if(_0x11ed1a[_0x4d40('0x57')]){window[_0x4d40('0x58')]=window[_0x4d40('0x58')]||{};if(_0x4d40('0x3')!==typeof window[_0x4d40('0x58')][_0x4d40('0x25')]&&(_0x4ae4ce||!_0x4a3b1c))return _0xc72635(window[_0x4d40('0x58')][_0x4d40('0x25')]);if('object'!==typeof window[_0x4d40('0x59')]||_0x4d40('0x3')===typeof window['vtexjs']['checkout'])if(_0x4d40('0x29')===typeof vtex&&_0x4d40('0x29')===typeof vtex['checkout']&&'undefined'!==typeof vtex[_0x4d40('0x26')]['SDK'])new vtex[(_0x4d40('0x26'))]['SDK']();else return _0x263d0a(_0x4d40('0x5a'));_0x158a86[_0x4d40('0x5b')]([_0x4d40('0x3f'),_0x4d40('0x38'),_0x4d40('0x5c')],{'done':function(_0x4a6e3e){_0xc72635(_0x4a6e3e);window['_QuatroDigital_DropDown']['getOrderForm']=_0x4a6e3e;},'fail':function(_0x259f9d){_0x263d0a([_0x4d40('0x5d'),_0x259f9d]);}});}else alert(_0x4d40('0x5e'));}());_0x11ed1a[_0x4d40('0x41')]();_0x158a86(window)[_0x4d40('0x5f')]('simpleCartCallback.quatro_digital');return _0x139f59;};_0x158a86[_0x4d40('0x2f')]={'elements':_0x158a86('')};_0x158a86(function(){var _0x5b6a54;_0x4d40('0x8')===typeof window[_0x4d40('0x60')]&&(_0x5b6a54=window[_0x4d40('0x60')],window[_0x4d40('0x60')]=function(_0x3df411,_0x172fb9,_0x5ec61c,_0x564208,_0xdabcda){_0x5b6a54[_0x4d40('0x61')](this,_0x3df411,_0x172fb9,_0x5ec61c,_0x564208,function(){_0x4d40('0x8')===typeof _0xdabcda&&_0xdabcda();_0x158a86[_0x4d40('0x2f')][_0x4d40('0x30')][_0x4d40('0x35')](function(){var _0x132543=_0x158a86(this);_0x132543[_0x4d40('0x24')](_0x132543['data'](_0x4d40('0x36')));});});});});var _0x50917a=window['ReloadItemsCart']||void 0x0;window['ReloadItemsCart']=function(_0x37e643){_0x158a86['fn'][_0x4d40('0x24')](!0x0);_0x4d40('0x8')===typeof _0x50917a?_0x50917a[_0x4d40('0x61')](this,_0x37e643):alert(_0x37e643);};_0x158a86(function(){var _0x4d0af5=_0x158a86(_0x4d40('0x62'));_0x4d0af5[_0x4d40('0x6')]&&_0x4d0af5[_0x4d40('0x24')]();});_0x158a86(function(){_0x158a86(window)[_0x4d40('0x63')](_0x4d40('0x64'),function(){_0x158a86['fn']['simpleCart'](!0x0);});});}catch(_0x5f4ef0){_0x4d40('0x3')!==typeof console&&'function'===typeof console[_0x4d40('0x13')]&&console[_0x4d40('0x13')](_0x4d40('0x65'),_0x5f4ef0);}}}());(function(){var _0x5233f6=function(_0x3fca1a,_0x5e165e){if(_0x4d40('0x29')===typeof console){var _0x35b6c6=_0x4d40('0x29')===typeof _0x3fca1a;_0x4d40('0x3')!==typeof _0x5e165e&&_0x4d40('0x2a')===_0x5e165e[_0x4d40('0x2b')]()?_0x35b6c6?console['warn']('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x3fca1a[0x0],_0x3fca1a[0x1],_0x3fca1a[0x2],_0x3fca1a[0x3],_0x3fca1a[0x4],_0x3fca1a[0x5],_0x3fca1a[0x6],_0x3fca1a[0x7]):console['warn'](_0x4d40('0x66')+_0x3fca1a):_0x4d40('0x3')!==typeof _0x5e165e&&_0x4d40('0x2d')===_0x5e165e['toLowerCase']()?_0x35b6c6?console[_0x4d40('0x2d')](_0x4d40('0x66'),_0x3fca1a[0x0],_0x3fca1a[0x1],_0x3fca1a[0x2],_0x3fca1a[0x3],_0x3fca1a[0x4],_0x3fca1a[0x5],_0x3fca1a[0x6],_0x3fca1a[0x7]):console['info']('[QD\x20VTEX\x20Checkout\x20Queue]\x0a'+_0x3fca1a):_0x35b6c6?console[_0x4d40('0x13')](_0x4d40('0x66'),_0x3fca1a[0x0],_0x3fca1a[0x1],_0x3fca1a[0x2],_0x3fca1a[0x3],_0x3fca1a[0x4],_0x3fca1a[0x5],_0x3fca1a[0x6],_0x3fca1a[0x7]):console['error'](_0x4d40('0x66')+_0x3fca1a);}},_0x5601b7=null,_0x3ede3b={},_0x506ac3={},_0x19b92c={};$[_0x4d40('0x5b')]=function(_0x128f5e,_0x25258e){if(null===_0x5601b7)if(_0x4d40('0x29')===typeof window[_0x4d40('0x59')]&&'undefined'!==typeof window[_0x4d40('0x59')]['checkout'])_0x5601b7=window[_0x4d40('0x59')][_0x4d40('0x26')];else return _0x5233f6('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js');var _0x507812=$[_0x4d40('0x14')]({'done':function(){},'fail':function(){}},_0x25258e),_0x326941=_0x128f5e[_0x4d40('0x7')](';'),_0x583897=function(){_0x3ede3b[_0x326941]['add'](_0x507812[_0x4d40('0x1b')]);_0x506ac3[_0x326941][_0x4d40('0x31')](_0x507812[_0x4d40('0x1c')]);};_0x19b92c[_0x326941]?_0x583897():(_0x3ede3b[_0x326941]=$[_0x4d40('0x67')](),_0x506ac3[_0x326941]=$[_0x4d40('0x67')](),_0x583897(),_0x19b92c[_0x326941]=!0x0,_0x5601b7['getOrderForm'](_0x128f5e)[_0x4d40('0x1b')](function(_0x3221d4){_0x19b92c[_0x326941]=!0x1;_0x3ede3b[_0x326941][_0x4d40('0x42')](_0x3221d4);})[_0x4d40('0x1c')](function(_0x3be5eb){_0x19b92c[_0x326941]=!0x1;_0x506ac3[_0x326941][_0x4d40('0x42')](_0x3be5eb);}));};}());(function(_0x521e5a){try{var _0x36abf9=jQuery,_0x5923aa,_0x2856c4=_0x36abf9({}),_0x412bd3=function(_0x11077,_0x1aabd4){if('object'===typeof console&&_0x4d40('0x3')!==typeof console[_0x4d40('0x13')]&&_0x4d40('0x3')!==typeof console[_0x4d40('0x2d')]&&'undefined'!==typeof console[_0x4d40('0x2c')]){var _0x1112ed;_0x4d40('0x29')===typeof _0x11077?(_0x11077[_0x4d40('0x68')]('[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a'),_0x1112ed=_0x11077):_0x1112ed=[_0x4d40('0x69')+_0x11077];if('undefined'===typeof _0x1aabd4||_0x4d40('0x2a')!==_0x1aabd4[_0x4d40('0x2b')]()&&_0x4d40('0x6a')!==_0x1aabd4[_0x4d40('0x2b')]())if('undefined'!==typeof _0x1aabd4&&'info'===_0x1aabd4[_0x4d40('0x2b')]())try{console[_0x4d40('0x2d')]['apply'](console,_0x1112ed);}catch(_0xe7b35c){try{console[_0x4d40('0x2d')](_0x1112ed[_0x4d40('0x7')]('\x0a'));}catch(_0x13ccf1){}}else try{console[_0x4d40('0x13')]['apply'](console,_0x1112ed);}catch(_0x2daa58){try{console[_0x4d40('0x13')](_0x1112ed[_0x4d40('0x7')]('\x0a'));}catch(_0x2de676){}}else try{console[_0x4d40('0x2c')][_0x4d40('0x6b')](console,_0x1112ed);}catch(_0x262fce){try{console[_0x4d40('0x2c')](_0x1112ed[_0x4d40('0x7')]('\x0a'));}catch(_0x27085b){}}}},_0xfa06af={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0x4d40('0x6c'),'buyQtt':'input.buy-in-page-quantity','selectSkuMsg':_0x4d40('0x6d'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x288d01,_0x599727,_0xbb9020){_0x36abf9(_0x4d40('0x6e'))['is']('.productQuickView')&&('success'===_0x599727?alert(_0x4d40('0x6f')):(alert(_0x4d40('0x70')),('object'===typeof parent?parent:document)[_0x4d40('0x71')][_0x4d40('0x72')]=_0xbb9020));},'isProductPage':function(){return _0x36abf9('body')['is'](_0x4d40('0x73'));},'execDefaultAction':function(_0x14f591){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x36abf9['QD_buyButton']=function(_0x51ad48,_0x50d012){function _0x5e5004(_0xc7ec7d){_0x5923aa['isSmartCheckout']?_0xc7ec7d['data'](_0x4d40('0x74'))||(_0xc7ec7d[_0x4d40('0x15')](_0x4d40('0x74'),0x1),_0xc7ec7d['on'](_0x4d40('0x75'),function(_0xf11b95){if(!_0x5923aa[_0x4d40('0x76')]())return!0x0;if(!0x0!==_0x53aa78[_0x4d40('0x77')]['call'](this))return _0xf11b95[_0x4d40('0x78')](),!0x1;})):alert(_0x4d40('0x79'));}function _0x3141dd(_0x167b72){_0x167b72=_0x167b72||_0x36abf9(_0x5923aa[_0x4d40('0x7a')]);_0x167b72[_0x4d40('0x35')](function(){var _0x167b72=_0x36abf9(this);_0x167b72['is'](_0x4d40('0x7b'))||(_0x167b72['addClass']('qd-sbb-on'),_0x167b72['is'](_0x4d40('0x7c'))&&!_0x167b72['is'](_0x4d40('0x7d'))||_0x167b72[_0x4d40('0x15')](_0x4d40('0x7e'))||(_0x167b72[_0x4d40('0x15')](_0x4d40('0x7e'),0x1),_0x167b72['children'](_0x4d40('0x7f'))[_0x4d40('0x6')]||_0x167b72['append'](_0x4d40('0x80')),_0x167b72['is']('.buy-in-page-button')&&_0x5923aa['isProductPage']()&&_0xa35575['call'](_0x167b72),_0x5e5004(_0x167b72)));});_0x5923aa[_0x4d40('0x81')]()&&!_0x167b72[_0x4d40('0x6')]&&_0x412bd3(_0x4d40('0x82')+_0x167b72[_0x4d40('0x83')]+'\x27.','info');}var _0x3989b5=_0x36abf9(_0x51ad48);var _0x53aa78=this;window[_0x4d40('0x84')]=window[_0x4d40('0x84')]||{};window[_0x4d40('0x37')]=window[_0x4d40('0x37')]||{};_0x53aa78[_0x4d40('0x85')]=function(_0x3c33fb,_0x49e182){_0x3989b5[_0x4d40('0x49')](_0x4d40('0x86'));_0x36abf9('body')['addClass'](_0x4d40('0x87'));var _0x37e1ae=_0x36abf9(_0x5923aa[_0x4d40('0x7a')])[_0x4d40('0x46')](_0x4d40('0x88')+(_0x3c33fb['attr'](_0x4d40('0x72'))||_0x4d40('0x89'))+'\x27]')[_0x4d40('0x31')](_0x3c33fb);_0x37e1ae['addClass'](_0x4d40('0x8a'));setTimeout(function(){_0x3989b5['removeClass'](_0x4d40('0x8b'));_0x37e1ae[_0x4d40('0x4b')](_0x4d40('0x8a'));},_0x5923aa['timeRemoveNewItemClass']);window[_0x4d40('0x84')][_0x4d40('0x25')]=void 0x0;if('undefined'!==typeof _0x50d012&&_0x4d40('0x8')===typeof _0x50d012[_0x4d40('0x8c')])return _0x5923aa[_0x4d40('0x8d')]||(_0x412bd3(_0x4d40('0x8e')),_0x50d012['getCartInfoByUrl']()),window[_0x4d40('0x58')]['getOrderForm']=void 0x0,_0x50d012[_0x4d40('0x8c')](function(_0x16373c){window['_Quatro_Digital_dropDown'][_0x4d40('0x25')]=_0x16373c;_0x36abf9['fn']['simpleCart'](!0x0,void 0x0,!0x0);},{'lastSku':_0x49e182});window['_Quatro_Digital_dropDown'][_0x4d40('0x8f')]=!0x0;_0x36abf9['fn']['simpleCart'](!0x0);};(function(){if(_0x5923aa[_0x4d40('0x8d')]&&_0x5923aa[_0x4d40('0x90')]){var _0x284c95=_0x36abf9(_0x4d40('0x7c'));_0x284c95[_0x4d40('0x6')]&&_0x3141dd(_0x284c95);}}());var _0xa35575=function(){var _0x3fbfc4=_0x36abf9(this);'undefined'!==typeof _0x3fbfc4[_0x4d40('0x15')]('buyButton')?(_0x3fbfc4[_0x4d40('0x91')]('click'),_0x5e5004(_0x3fbfc4)):(_0x3fbfc4['bind']('mouseenter.qd_bb_buy_sc',function(_0x4d1a52){_0x3fbfc4[_0x4d40('0x91')](_0x4d40('0x92'));_0x5e5004(_0x3fbfc4);_0x36abf9(this)[_0x4d40('0x91')](_0x4d1a52);}),_0x36abf9(window)[_0x4d40('0x93')](function(){_0x3fbfc4[_0x4d40('0x91')](_0x4d40('0x92'));_0x5e5004(_0x3fbfc4);_0x3fbfc4[_0x4d40('0x91')]('mouseenter.qd_bb_buy_sc');}));};_0x53aa78[_0x4d40('0x77')]=function(){var _0x7f96d0=_0x36abf9(this),_0x51ad48=_0x7f96d0[_0x4d40('0x94')](_0x4d40('0x72'))||'';if(-0x1<_0x51ad48[_0x4d40('0x95')](_0x5923aa['selectSkuMsg']))return!0x0;_0x51ad48=_0x51ad48[_0x4d40('0x1')](/redirect\=(false|true)/gi,'')[_0x4d40('0x1')]('?',_0x4d40('0x96'))[_0x4d40('0x1')](/\&\&/gi,'&');if(_0x5923aa['execDefaultAction'](_0x7f96d0))return _0x7f96d0[_0x4d40('0x94')](_0x4d40('0x72'),_0x51ad48[_0x4d40('0x1')](_0x4d40('0x97'),_0x4d40('0x98'))),!0x0;_0x51ad48=_0x51ad48[_0x4d40('0x1')](/http.?:/i,'');_0x2856c4[_0x4d40('0x99')](function(_0x474dc7){if(!_0x5923aa[_0x4d40('0x9a')]&&!/(&|\?)qty\=[1-9][0-9]*/gi['test'](_0x51ad48))return _0x474dc7();var _0x2802f5=function(_0x415ead,_0x111363){var _0x3141dd=_0x51ad48[_0x4d40('0x9b')](/sku\=([0-9]+)/gi),_0x26d3ae=[];if(_0x4d40('0x29')===typeof _0x3141dd&&null!==_0x3141dd)for(var _0x575454=_0x3141dd['length']-0x1;0x0<=_0x575454;_0x575454--){var _0x45644f=parseInt(_0x3141dd[_0x575454][_0x4d40('0x1')](/sku\=/gi,''));isNaN(_0x45644f)||_0x26d3ae[_0x4d40('0x9c')](_0x45644f);}_0x5923aa[_0x4d40('0x9d')][_0x4d40('0x61')](this,_0x415ead,_0x111363,_0x51ad48);_0x53aa78[_0x4d40('0x9e')][_0x4d40('0x61')](this,_0x415ead,_0x111363,_0x51ad48,_0x26d3ae);_0x53aa78[_0x4d40('0x85')](_0x7f96d0,_0x51ad48[_0x4d40('0x9f')](_0x4d40('0xa0'))[_0x4d40('0xa1')]()[_0x4d40('0x9f')]('&')[_0x4d40('0xa2')]());_0x4d40('0x8')===typeof _0x5923aa[_0x4d40('0xa3')]&&_0x5923aa[_0x4d40('0xa3')][_0x4d40('0x61')](this);_0x36abf9(window)[_0x4d40('0x5f')](_0x4d40('0xa4'));_0x36abf9(window)['trigger']('cartProductAdded.vtex');};_0x5923aa[_0x4d40('0xa5')]?(_0x2802f5(null,_0x4d40('0xa6')),_0x474dc7()):_0x36abf9[_0x4d40('0x1a')]({'url':_0x51ad48,'complete':_0x2802f5})['always'](function(){_0x474dc7();});});};_0x53aa78[_0x4d40('0x9e')]=function(_0x32f434,_0xc5fd06,_0xdbe336,_0x358452){try{_0x4d40('0xa6')===_0xc5fd06&&_0x4d40('0x29')===typeof window[_0x4d40('0xa7')]&&_0x4d40('0x8')===typeof window[_0x4d40('0xa7')]['_QuatroDigital_prodBuyCallback']&&window['parent'][_0x4d40('0xa8')](_0x32f434,_0xc5fd06,_0xdbe336,_0x358452);}catch(_0x52b4e7){_0x412bd3('Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.');}};_0x3141dd();'function'===typeof _0x5923aa[_0x4d40('0x41')]?_0x5923aa[_0x4d40('0x41')][_0x4d40('0x61')](this):_0x412bd3(_0x4d40('0xa9'));};var _0x267d64=_0x36abf9['Callbacks']();_0x36abf9['fn'][_0x4d40('0xaa')]=function(_0x5077f5,_0x4a266a){var _0x521e5a=_0x36abf9(this);_0x4d40('0x3')!==typeof _0x4a266a||'object'!==typeof _0x5077f5||_0x5077f5 instanceof _0x36abf9||(_0x4a266a=_0x5077f5,_0x5077f5=void 0x0);_0x5923aa=_0x36abf9[_0x4d40('0x14')]({},_0xfa06af,_0x4a266a);var _0x44456e;_0x267d64[_0x4d40('0x31')](function(){_0x521e5a['children'](_0x4d40('0xab'))['length']||_0x521e5a[_0x4d40('0xac')](_0x4d40('0xad'));_0x44456e=new _0x36abf9[(_0x4d40('0xaa'))](_0x521e5a,_0x5077f5);});_0x267d64[_0x4d40('0x42')]();_0x36abf9(window)['on']('QuatroDigital.qd_bb_prod_add',function(_0x2a5aa7,_0x16035d,_0x2066b0){_0x44456e[_0x4d40('0x85')](_0x16035d,_0x2066b0);});return _0x36abf9[_0x4d40('0x14')](_0x521e5a,_0x44456e);};var _0x1a87dc=0x0;_0x36abf9(document)[_0x4d40('0xae')](function(_0xf7216a,_0x5cbb0c,_0x14741d){-0x1<_0x14741d['url'][_0x4d40('0x2b')]()[_0x4d40('0x95')](_0x4d40('0xaf'))&&(_0x1a87dc=(_0x14741d[_0x4d40('0xb0')][_0x4d40('0x9b')](/sku\=([0-9]+)/i)||[''])[_0x4d40('0xa1')]());});_0x36abf9(window)[_0x4d40('0x63')](_0x4d40('0xb1'),function(){_0x36abf9(window)['trigger'](_0x4d40('0xb2'),[new _0x36abf9(),_0x1a87dc]);});_0x36abf9(document)[_0x4d40('0xb3')](function(){_0x267d64[_0x4d40('0x42')]();});}catch(_0x3e569b){_0x4d40('0x3')!==typeof console&&'function'===typeof console[_0x4d40('0x13')]&&console[_0x4d40('0x13')](_0x4d40('0x65'),_0x3e569b);}}(this));function qd_number_format(_0x5f827b,_0x13590f,_0x2d92b2,_0x30f88f){_0x5f827b=(_0x5f827b+'')[_0x4d40('0x1')](/[^0-9+\-Ee.]/g,'');_0x5f827b=isFinite(+_0x5f827b)?+_0x5f827b:0x0;_0x13590f=isFinite(+_0x13590f)?Math[_0x4d40('0x2')](_0x13590f):0x0;_0x30f88f=_0x4d40('0x3')===typeof _0x30f88f?',':_0x30f88f;_0x2d92b2='undefined'===typeof _0x2d92b2?'.':_0x2d92b2;var _0x2d308e='',_0x2d308e=function(_0x284f96,_0x161272){var _0x42e167=Math['pow'](0xa,_0x161272);return''+(Math['round'](_0x284f96*_0x42e167)/_0x42e167)['toFixed'](_0x161272);},_0x2d308e=(_0x13590f?_0x2d308e(_0x5f827b,_0x13590f):''+Math[_0x4d40('0xb4')](_0x5f827b))[_0x4d40('0x9f')]('.');0x3<_0x2d308e[0x0][_0x4d40('0x6')]&&(_0x2d308e[0x0]=_0x2d308e[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x30f88f));(_0x2d308e[0x1]||'')[_0x4d40('0x6')]<_0x13590f&&(_0x2d308e[0x1]=_0x2d308e[0x1]||'',_0x2d308e[0x1]+=Array(_0x13590f-_0x2d308e[0x1][_0x4d40('0x6')]+0x1)[_0x4d40('0x7')]('0'));return _0x2d308e['join'](_0x2d92b2);}(function(){try{window[_0x4d40('0x37')]=window['_QuatroDigital_CartData']||{},window[_0x4d40('0x37')][_0x4d40('0x41')]=window[_0x4d40('0x37')][_0x4d40('0x41')]||$['Callbacks']();}catch(_0x411a4c){'undefined'!==typeof console&&_0x4d40('0x8')===typeof console[_0x4d40('0x13')]&&console[_0x4d40('0x13')](_0x4d40('0x65'),_0x411a4c['message']);}}());(function(_0x44bced){try{var _0x3a59d3=jQuery,_0x5141c6=function(_0x32b93f,_0xd16073){if(_0x4d40('0x29')===typeof console&&_0x4d40('0x3')!==typeof console['error']&&_0x4d40('0x3')!==typeof console[_0x4d40('0x2d')]&&_0x4d40('0x3')!==typeof console[_0x4d40('0x2c')]){var _0x300149;_0x4d40('0x29')===typeof _0x32b93f?(_0x32b93f['unshift'](_0x4d40('0xb5')),_0x300149=_0x32b93f):_0x300149=[_0x4d40('0xb5')+_0x32b93f];if(_0x4d40('0x3')===typeof _0xd16073||'alerta'!==_0xd16073[_0x4d40('0x2b')]()&&_0x4d40('0x6a')!==_0xd16073['toLowerCase']())if(_0x4d40('0x3')!==typeof _0xd16073&&_0x4d40('0x2d')===_0xd16073[_0x4d40('0x2b')]())try{console[_0x4d40('0x2d')][_0x4d40('0x6b')](console,_0x300149);}catch(_0x3781bb){try{console[_0x4d40('0x2d')](_0x300149[_0x4d40('0x7')]('\x0a'));}catch(_0x4001af){}}else try{console[_0x4d40('0x13')]['apply'](console,_0x300149);}catch(_0x4d9995){try{console['error'](_0x300149[_0x4d40('0x7')]('\x0a'));}catch(_0x3f0d3a){}}else try{console[_0x4d40('0x2c')]['apply'](console,_0x300149);}catch(_0x51909a){try{console[_0x4d40('0x2c')](_0x300149[_0x4d40('0x7')]('\x0a'));}catch(_0x58466e){}}}};window[_0x4d40('0x58')]=window['_QuatroDigital_DropDown']||{};window[_0x4d40('0x58')][_0x4d40('0x8f')]=!0x0;_0x3a59d3[_0x4d40('0xb6')]=function(){};_0x3a59d3['fn']['QD_dropDownCart']=function(){return{'fn':new _0x3a59d3()};};var _0x262fc0=function(_0x11264e){var _0x21b3e0={'t':'nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x11150f){var _0x2f64cb=function(_0x39b6ed){return _0x39b6ed;};var _0x598d0d=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x11150f=_0x11150f['d'+_0x598d0d[0x10]+'c'+_0x598d0d[0x11]+'m'+_0x2f64cb(_0x598d0d[0x1])+'n'+_0x598d0d[0xd]]['l'+_0x598d0d[0x12]+'c'+_0x598d0d[0x0]+'ti'+_0x2f64cb('o')+'n'];var _0x3fb128=function(_0x5291e4){return escape(encodeURIComponent(_0x5291e4[_0x4d40('0x1')](/\./g,'¨')[_0x4d40('0x1')](/[a-zA-Z]/g,function(_0x4f18f4){return String['fromCharCode'](('Z'>=_0x4f18f4?0x5a:0x7a)>=(_0x4f18f4=_0x4f18f4[_0x4d40('0xb7')](0x0)+0xd)?_0x4f18f4:_0x4f18f4-0x1a);})));};var _0x44bced=_0x3fb128(_0x11150f[[_0x598d0d[0x9],_0x2f64cb('o'),_0x598d0d[0xc],_0x598d0d[_0x2f64cb(0xd)]]['join']('')]);_0x3fb128=_0x3fb128((window[['js',_0x2f64cb('no'),'m',_0x598d0d[0x1],_0x598d0d[0x4]['toUpperCase'](),'ite'][_0x4d40('0x7')]('')]||_0x4d40('0x89'))+['.v',_0x598d0d[0xd],'e',_0x2f64cb('x'),'co',_0x2f64cb('mm'),'erc',_0x598d0d[0x1],'.c',_0x2f64cb('o'),'m.',_0x598d0d[0x13],'r'][_0x4d40('0x7')](''));for(var _0x511360 in _0x21b3e0){if(_0x3fb128===_0x511360+_0x21b3e0[_0x511360]||_0x44bced===_0x511360+_0x21b3e0[_0x511360]){var _0x4c16d1='tr'+_0x598d0d[0x11]+'e';break;}_0x4c16d1='f'+_0x598d0d[0x0]+'ls'+_0x2f64cb(_0x598d0d[0x1])+'';}_0x2f64cb=!0x1;-0x1<_0x11150f[[_0x598d0d[0xc],'e',_0x598d0d[0x0],'rc',_0x598d0d[0x9]][_0x4d40('0x7')]('')][_0x4d40('0x95')](_0x4d40('0xb8'))&&(_0x2f64cb=!0x0);return[_0x4c16d1,_0x2f64cb];}(_0x11264e);}(window);if(!eval(_0x262fc0[0x0]))return _0x262fc0[0x1]?_0x5141c6(_0x4d40('0xb9')):!0x1;_0x3a59d3[_0x4d40('0xb6')]=function(_0xc930e7,_0x1bf3cb){var _0xfbc788=_0x3a59d3(_0xc930e7);if(!_0xfbc788[_0x4d40('0x6')])return _0xfbc788;var _0x2589de=_0x3a59d3[_0x4d40('0x14')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x4d40('0xba'),'linkCheckout':'Finalizar\x20Compra','cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':_0x4d40('0xbb'),'continueShopping':'Continuar\x20Comprando','shippingForm':_0x4d40('0xbc')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x372dba){return _0x372dba[_0x4d40('0xbd')]||_0x372dba[_0x4d40('0xbe')];},'callback':function(){},'callbackProductsList':function(){}},_0x1bf3cb);_0x3a59d3('');var _0xa3297d=this;if(_0x2589de[_0x4d40('0x57')]){var _0x2e2b5a=!0x1;_0x4d40('0x3')===typeof window[_0x4d40('0x59')]&&(_0x5141c6(_0x4d40('0xbf')),_0x3a59d3['ajax']({'url':_0x4d40('0xc0'),'async':!0x1,'dataType':_0x4d40('0xc1'),'error':function(){_0x5141c6(_0x4d40('0xc2'));_0x2e2b5a=!0x0;}}));if(_0x2e2b5a)return _0x5141c6(_0x4d40('0xc3'));}if(_0x4d40('0x29')===typeof window[_0x4d40('0x59')]&&_0x4d40('0x3')!==typeof window['vtexjs'][_0x4d40('0x26')])var _0x23f387=window[_0x4d40('0x59')][_0x4d40('0x26')];else if(_0x4d40('0x29')===typeof vtex&&'object'===typeof vtex['checkout']&&_0x4d40('0x3')!==typeof vtex[_0x4d40('0x26')][_0x4d40('0xc4')])_0x23f387=new vtex[(_0x4d40('0x26'))][(_0x4d40('0xc4'))]();else return _0x5141c6(_0x4d40('0x5a'));_0xa3297d[_0x4d40('0xc5')]=_0x4d40('0xc6');var _0x32dcda=function(_0x177109){_0x3a59d3(this)[_0x4d40('0xc7')](_0x177109);_0x177109['find'](_0x4d40('0xc8'))[_0x4d40('0x31')](_0x3a59d3(_0x4d40('0xc9')))['on'](_0x4d40('0xca'),function(){_0xfbc788[_0x4d40('0x4b')]('qd-bb-lightBoxProdAdd');_0x3a59d3(document[_0x4d40('0x6e')])[_0x4d40('0x4b')]('qd-bb-lightBoxBodyProdAdd');});_0x3a59d3(document)['off'](_0x4d40('0xcb'))['on'](_0x4d40('0xcb'),function(_0x1dfc17){0x1b==_0x1dfc17[_0x4d40('0xcc')]&&(_0xfbc788['removeClass'](_0x4d40('0xcd')),_0x3a59d3(document[_0x4d40('0x6e')])[_0x4d40('0x4b')](_0x4d40('0x87')));});var _0x577eab=_0x177109[_0x4d40('0x50')](_0x4d40('0xce'));_0x177109[_0x4d40('0x50')](_0x4d40('0xcf'))['on']('click.qd_ddc_scrollUp',function(){_0xa3297d[_0x4d40('0xd0')]('-',void 0x0,void 0x0,_0x577eab);return!0x1;});_0x177109[_0x4d40('0x50')](_0x4d40('0xd1'))['on']('click.qd_ddc_scrollDown',function(){_0xa3297d[_0x4d40('0xd0')](void 0x0,void 0x0,void 0x0,_0x577eab);return!0x1;});_0x177109[_0x4d40('0x50')]('.qd-ddc-shipping\x20input')[_0x4d40('0xd2')]('')['on']('keyup.qd_ddc_cep',function(){_0xa3297d[_0x4d40('0xd3')](_0x3a59d3(this));});if(_0x2589de[_0x4d40('0xd4')]){var _0x1bf3cb=0x0;_0x3a59d3(this)['on'](_0x4d40('0xd5'),function(){var _0x177109=function(){window[_0x4d40('0x58')][_0x4d40('0x8f')]&&(_0xa3297d[_0x4d40('0x8c')](),window['_QuatroDigital_DropDown'][_0x4d40('0x8f')]=!0x1,_0x3a59d3['fn'][_0x4d40('0x24')](!0x0),_0xa3297d[_0x4d40('0xd6')]());};_0x1bf3cb=setInterval(function(){_0x177109();},0x258);_0x177109();});_0x3a59d3(this)['on'](_0x4d40('0xd7'),function(){clearInterval(_0x1bf3cb);});}};var _0x179057=function(_0x31b261){_0x31b261=_0x3a59d3(_0x31b261);_0x2589de[_0x4d40('0xd8')][_0x4d40('0x52')]=_0x2589de[_0x4d40('0xd8')]['cartTotal'][_0x4d40('0x1')](_0x4d40('0xd9'),_0x4d40('0xda'));_0x2589de[_0x4d40('0xd8')][_0x4d40('0x52')]=_0x2589de[_0x4d40('0xd8')][_0x4d40('0x52')][_0x4d40('0x1')]('#items',_0x4d40('0xdb'));_0x2589de[_0x4d40('0xd8')][_0x4d40('0x52')]=_0x2589de[_0x4d40('0xd8')]['cartTotal'][_0x4d40('0x1')](_0x4d40('0xdc'),_0x4d40('0xdd'));_0x2589de['texts'][_0x4d40('0x52')]=_0x2589de[_0x4d40('0xd8')][_0x4d40('0x52')][_0x4d40('0x1')]('#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0x31b261[_0x4d40('0x50')]('.qd-ddc-viewCart')['html'](_0x2589de[_0x4d40('0xd8')][_0x4d40('0xde')]);_0x31b261[_0x4d40('0x50')](_0x4d40('0xdf'))[_0x4d40('0x4d')](_0x2589de[_0x4d40('0xd8')][_0x4d40('0xe0')]);_0x31b261[_0x4d40('0x50')](_0x4d40('0xe1'))[_0x4d40('0x4d')](_0x2589de[_0x4d40('0xd8')][_0x4d40('0xe2')]);_0x31b261['find'](_0x4d40('0xe3'))[_0x4d40('0x4d')](_0x2589de[_0x4d40('0xd8')]['cartTotal']);_0x31b261[_0x4d40('0x50')]('.qd-ddc-shipping')['html'](_0x2589de['texts'][_0x4d40('0xe4')]);_0x31b261[_0x4d40('0x50')](_0x4d40('0xe5'))[_0x4d40('0x4d')](_0x2589de['texts']['emptyCart']);return _0x31b261;}(this[_0x4d40('0xc5')]);var _0x17a1a6=0x0;_0xfbc788[_0x4d40('0x35')](function(){0x0<_0x17a1a6?_0x32dcda[_0x4d40('0x61')](this,_0x179057[_0x4d40('0xe6')]()):_0x32dcda['call'](this,_0x179057);_0x17a1a6++;});window[_0x4d40('0x37')]['callback'][_0x4d40('0x31')](function(){_0x3a59d3(_0x4d40('0xe7'))[_0x4d40('0x4d')](window[_0x4d40('0x37')][_0x4d40('0x3b')]||'--');_0x3a59d3('.qd-ddc-infoTotalItems')['html'](window[_0x4d40('0x37')][_0x4d40('0x3e')]||'0');_0x3a59d3(_0x4d40('0xe8'))['html'](window[_0x4d40('0x37')]['shipping']||'--');_0x3a59d3(_0x4d40('0xe9'))[_0x4d40('0x4d')](window['_QuatroDigital_CartData'][_0x4d40('0x3d')]||'--');});var _0x460a96=function(_0x52c575,_0x4a2361){if(_0x4d40('0x3')===typeof _0x52c575[_0x4d40('0x3f')])return _0x5141c6(_0x4d40('0xea'));_0xa3297d[_0x4d40('0xeb')][_0x4d40('0x61')](this,_0x4a2361);};_0xa3297d['getCartInfoByUrl']=function(_0x465da3,_0x17bd5a){_0x4d40('0x3')!=typeof _0x17bd5a?window[_0x4d40('0x58')][_0x4d40('0xec')]=_0x17bd5a:window['_QuatroDigital_DropDown'][_0x4d40('0xec')]&&(_0x17bd5a=window[_0x4d40('0x58')][_0x4d40('0xec')]);setTimeout(function(){window[_0x4d40('0x58')][_0x4d40('0xec')]=void 0x0;},_0x2589de[_0x4d40('0xed')]);_0x3a59d3(_0x4d40('0xee'))[_0x4d40('0x4b')](_0x4d40('0xef'));if(_0x2589de[_0x4d40('0x57')]){var _0x1bf3cb=function(_0x31b0f7){window['_QuatroDigital_DropDown'][_0x4d40('0x25')]=_0x31b0f7;_0x460a96(_0x31b0f7,_0x17bd5a);_0x4d40('0x3')!==typeof window[_0x4d40('0xf0')]&&_0x4d40('0x8')===typeof window[_0x4d40('0xf0')][_0x4d40('0xf1')]&&window[_0x4d40('0xf0')][_0x4d40('0xf1')][_0x4d40('0x61')](this);_0x3a59d3(_0x4d40('0xee'))[_0x4d40('0x49')](_0x4d40('0xef'));};_0x4d40('0x3')!==typeof window[_0x4d40('0x58')][_0x4d40('0x25')]?(_0x1bf3cb(window[_0x4d40('0x58')][_0x4d40('0x25')]),_0x4d40('0x8')===typeof _0x465da3&&_0x465da3(window[_0x4d40('0x58')]['getOrderForm'])):_0x3a59d3[_0x4d40('0x5b')](['items',_0x4d40('0x38'),_0x4d40('0x5c')],{'done':function(_0x5c64e3){_0x1bf3cb[_0x4d40('0x61')](this,_0x5c64e3);_0x4d40('0x8')===typeof _0x465da3&&_0x465da3(_0x5c64e3);},'fail':function(_0x194f48){_0x5141c6(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0x194f48]);}});}else alert(_0x4d40('0xf2'));};_0xa3297d['cartIsEmpty']=function(){var _0x2b6cfd=_0x3a59d3('.qd-ddc-wrapper');_0x2b6cfd[_0x4d40('0x50')]('.qd-ddc-prodRow')[_0x4d40('0x6')]?_0x2b6cfd['removeClass']('qd-ddc-noItems'):_0x2b6cfd[_0x4d40('0x49')](_0x4d40('0xf3'));};_0xa3297d[_0x4d40('0xeb')]=function(_0x4afdf5){var _0x1bf3cb=_0x3a59d3('.qd-ddc-prodWrapper2');_0x1bf3cb[_0x4d40('0xf4')]();_0x1bf3cb[_0x4d40('0x35')](function(){var _0x1bf3cb=_0x3a59d3(this),_0xc930e7,_0x226287,_0x41733b=_0x3a59d3(''),_0x2f8b38;for(_0x2f8b38 in window[_0x4d40('0x58')][_0x4d40('0x25')]['items'])if(_0x4d40('0x29')===typeof window[_0x4d40('0x58')][_0x4d40('0x25')][_0x4d40('0x3f')][_0x2f8b38]){var _0x1e568e=window['_QuatroDigital_DropDown'][_0x4d40('0x25')][_0x4d40('0x3f')][_0x2f8b38];var _0x2ba5f4=_0x1e568e[_0x4d40('0xf5')][_0x4d40('0x1')](/^\/|\/$/g,'')[_0x4d40('0x9f')]('/');var _0x3c22e2=_0x3a59d3(_0x4d40('0xf6'));_0x3c22e2['attr']({'data-sku':_0x1e568e['id'],'data-sku-index':_0x2f8b38,'data-qd-departament':_0x2ba5f4[0x0],'data-qd-category':_0x2ba5f4[_0x2ba5f4[_0x4d40('0x6')]-0x1]});_0x3c22e2[_0x4d40('0x49')](_0x4d40('0xf7')+_0x1e568e['availability']);_0x3c22e2[_0x4d40('0x50')](_0x4d40('0xf8'))['append'](_0x2589de[_0x4d40('0xbd')](_0x1e568e));_0x3c22e2['find'](_0x4d40('0xf9'))['append'](isNaN(_0x1e568e[_0x4d40('0xfa')])?_0x1e568e['sellingPrice']:0x0==_0x1e568e[_0x4d40('0xfa')]?_0x4d40('0xfb'):(_0x3a59d3(_0x4d40('0xfc'))[_0x4d40('0x94')](_0x4d40('0x34'))||'R$')+'\x20'+qd_number_format(_0x1e568e[_0x4d40('0xfa')]/0x64,0x2,',','.'));_0x3c22e2[_0x4d40('0x50')](_0x4d40('0xfd'))[_0x4d40('0x94')]({'data-sku':_0x1e568e['id'],'data-sku-index':_0x2f8b38})[_0x4d40('0xd2')](_0x1e568e['quantity']);_0x3c22e2[_0x4d40('0x50')](_0x4d40('0xfe'))[_0x4d40('0x94')]({'data-sku':_0x1e568e['id'],'data-sku-index':_0x2f8b38});_0xa3297d['insertProdImg'](_0x1e568e['id'],_0x3c22e2[_0x4d40('0x50')]('.qd-ddc-image'),_0x1e568e['imageUrl']);_0x3c22e2[_0x4d40('0x50')]('.qd-ddc-quantityMore,.qd-ddc-quantityMinus')[_0x4d40('0x94')]({'data-sku':_0x1e568e['id'],'data-sku-index':_0x2f8b38});_0x3c22e2[_0x4d40('0xff')](_0x1bf3cb);_0x41733b=_0x41733b['add'](_0x3c22e2);}try{var _0x3dd3a0=_0x1bf3cb['getParent']('.qd-ddc-wrapper')['find']('.qd-ddc-shipping\x20input');_0x3dd3a0[_0x4d40('0x6')]&&''==_0x3dd3a0[_0x4d40('0xd2')]()&&window[_0x4d40('0x58')][_0x4d40('0x25')][_0x4d40('0x5c')][_0x4d40('0x100')]&&_0x3dd3a0[_0x4d40('0xd2')](window[_0x4d40('0x58')][_0x4d40('0x25')]['shippingData'][_0x4d40('0x100')][_0x4d40('0x101')]);}catch(_0x166c03){_0x5141c6('Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20'+_0x166c03['message'],_0x4d40('0x6a'));}_0xa3297d[_0x4d40('0x102')](_0x1bf3cb);_0xa3297d[_0x4d40('0xd6')]();_0x4afdf5&&_0x4afdf5[_0x4d40('0x103')]&&function(){_0x226287=_0x41733b['filter']('[data-sku=\x27'+_0x4afdf5[_0x4d40('0x103')]+'\x27]');_0x226287[_0x4d40('0x6')]&&(_0xc930e7=0x0,_0x41733b[_0x4d40('0x35')](function(){var _0x4afdf5=_0x3a59d3(this);if(_0x4afdf5['is'](_0x226287))return!0x1;_0xc930e7+=_0x4afdf5[_0x4d40('0x104')]();}),_0xa3297d[_0x4d40('0xd0')](void 0x0,void 0x0,_0xc930e7,_0x1bf3cb[_0x4d40('0x31')](_0x1bf3cb['parent']())),_0x41733b[_0x4d40('0x4b')](_0x4d40('0x105')),function(_0x5d130d){_0x5d130d[_0x4d40('0x49')](_0x4d40('0x106'));_0x5d130d[_0x4d40('0x49')](_0x4d40('0x105'));setTimeout(function(){_0x5d130d[_0x4d40('0x4b')]('qd-ddc-lastAdded');},_0x2589de[_0x4d40('0xed')]);}(_0x226287));}();});(function(){_QuatroDigital_DropDown[_0x4d40('0x25')][_0x4d40('0x3f')]['length']?(_0x3a59d3('body')[_0x4d40('0x4b')]('qd-ddc-cart-empty')[_0x4d40('0x49')]('qd-ddc-cart-rendered\x20qd-ddc-product-add-time'),setTimeout(function(){_0x3a59d3(_0x4d40('0x6e'))[_0x4d40('0x4b')](_0x4d40('0x107'));},_0x2589de[_0x4d40('0xed')])):_0x3a59d3(_0x4d40('0x6e'))['removeClass'](_0x4d40('0x108'))[_0x4d40('0x49')](_0x4d40('0x109'));}());'function'===typeof _0x2589de[_0x4d40('0x10a')]?_0x2589de['callbackProductsList']['call'](this):_0x5141c6(_0x4d40('0x10b'));};_0xa3297d['insertProdImg']=function(_0x2246a4,_0x13081c,_0x16f045){function _0x37d5b1(){_0x13081c[_0x4d40('0x4b')](_0x4d40('0x10c'))[_0x4d40('0x93')](function(){_0x3a59d3(this)[_0x4d40('0x49')](_0x4d40('0x10c'));})[_0x4d40('0x94')]('src',_0x16f045);}_0x16f045?_0x37d5b1():isNaN(_0x2246a4)?_0x5141c6(_0x4d40('0x10d'),_0x4d40('0x2a')):alert(_0x4d40('0x10e'));};_0xa3297d['actionButtons']=function(_0x1a5d55){var _0x47ebba=function(_0x56acd8,_0x5e9666){var _0x1bf3cb=_0x3a59d3(_0x56acd8);var _0x22cdd2=_0x1bf3cb[_0x4d40('0x94')](_0x4d40('0x10f'));var _0xc930e7=_0x1bf3cb[_0x4d40('0x94')](_0x4d40('0x110'));if(_0x22cdd2){var _0x134624=parseInt(_0x1bf3cb[_0x4d40('0xd2')]())||0x1;_0xa3297d[_0x4d40('0x111')]([_0x22cdd2,_0xc930e7],_0x134624,_0x134624+0x1,function(_0x25b33b){_0x1bf3cb[_0x4d40('0xd2')](_0x25b33b);_0x4d40('0x8')===typeof _0x5e9666&&_0x5e9666();});}};var _0x1bf3cb=function(_0x5107a7,_0x159ee4){var _0x1bf3cb=_0x3a59d3(_0x5107a7);var _0x24d53b=_0x1bf3cb[_0x4d40('0x94')](_0x4d40('0x10f'));var _0xc930e7=_0x1bf3cb[_0x4d40('0x94')](_0x4d40('0x110'));if(_0x24d53b){var _0x3ee02f=parseInt(_0x1bf3cb[_0x4d40('0xd2')]())||0x2;_0xa3297d[_0x4d40('0x111')]([_0x24d53b,_0xc930e7],_0x3ee02f,_0x3ee02f-0x1,function(_0x1a8443){_0x1bf3cb[_0x4d40('0xd2')](_0x1a8443);_0x4d40('0x8')===typeof _0x159ee4&&_0x159ee4();});}};var _0xd96395=function(_0x467ca9,_0x56ceec){var _0x1bf3cb=_0x3a59d3(_0x467ca9);var _0x48ec4e=_0x1bf3cb[_0x4d40('0x94')](_0x4d40('0x10f'));var _0xc930e7=_0x1bf3cb['attr'](_0x4d40('0x110'));if(_0x48ec4e){var _0x3d16ad=parseInt(_0x1bf3cb[_0x4d40('0xd2')]())||0x1;_0xa3297d[_0x4d40('0x111')]([_0x48ec4e,_0xc930e7],0x1,_0x3d16ad,function(_0x22439a){_0x1bf3cb[_0x4d40('0xd2')](_0x22439a);_0x4d40('0x8')===typeof _0x56ceec&&_0x56ceec();});}};var _0xc930e7=_0x1a5d55['find'](_0x4d40('0x112'));_0xc930e7[_0x4d40('0x49')]('qd_on')['each'](function(){var _0x1a5d55=_0x3a59d3(this);_0x1a5d55[_0x4d40('0x50')](_0x4d40('0x113'))['on']('click.qd_ddc_more',function(_0x19783a){_0x19783a[_0x4d40('0x78')]();_0xc930e7['addClass'](_0x4d40('0x114'));_0x47ebba(_0x1a5d55[_0x4d40('0x50')](_0x4d40('0xfd')),function(){_0xc930e7[_0x4d40('0x4b')](_0x4d40('0x114'));});});_0x1a5d55[_0x4d40('0x50')](_0x4d40('0x115'))['on']('click.qd_ddc_minus',function(_0x1b078d){_0x1b078d[_0x4d40('0x78')]();_0xc930e7[_0x4d40('0x49')](_0x4d40('0x114'));_0x1bf3cb(_0x1a5d55[_0x4d40('0x50')]('.qd-ddc-quantity'),function(){_0xc930e7[_0x4d40('0x4b')](_0x4d40('0x114'));});});_0x1a5d55[_0x4d40('0x50')](_0x4d40('0xfd'))['on'](_0x4d40('0x116'),function(){_0xc930e7[_0x4d40('0x49')](_0x4d40('0x114'));_0xd96395(this,function(){_0xc930e7[_0x4d40('0x4b')](_0x4d40('0x114'));});});_0x1a5d55[_0x4d40('0x50')](_0x4d40('0xfd'))['on'](_0x4d40('0x117'),function(_0x45a29b){0xd==_0x45a29b[_0x4d40('0xcc')]&&(_0xc930e7[_0x4d40('0x49')](_0x4d40('0x114')),_0xd96395(this,function(){_0xc930e7[_0x4d40('0x4b')](_0x4d40('0x114'));}));});});_0x1a5d55[_0x4d40('0x50')](_0x4d40('0x118'))['each'](function(){var _0x1a5d55=_0x3a59d3(this);_0x1a5d55[_0x4d40('0x50')](_0x4d40('0xfe'))['on']('click.qd_ddc_remove',function(){_0x1a5d55[_0x4d40('0x49')]('qd-loading');_0xa3297d[_0x4d40('0x119')](_0x3a59d3(this),function(_0x1823ff){_0x1823ff?_0x1a5d55[_0x4d40('0x11a')](!0x0)[_0x4d40('0x11b')](function(){_0x1a5d55['remove']();_0xa3297d[_0x4d40('0xd6')]();}):_0x1a5d55[_0x4d40('0x4b')](_0x4d40('0x114'));});return!0x1;});});};_0xa3297d[_0x4d40('0xd3')]=function(_0x524a37){var _0x2e432a=_0x524a37[_0x4d40('0xd2')](),_0x2e432a=_0x2e432a['replace'](/[^0-9\-]/g,''),_0x2e432a=_0x2e432a[_0x4d40('0x1')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x4d40('0x11c')),_0x2e432a=_0x2e432a['replace'](/(.{9}).*/g,'$1');_0x524a37[_0x4d40('0xd2')](_0x2e432a);0x9<=_0x2e432a[_0x4d40('0x6')]&&(_0x524a37[_0x4d40('0x15')](_0x4d40('0x11d'))!=_0x2e432a&&_0x23f387[_0x4d40('0x11e')]({'postalCode':_0x2e432a,'country':_0x4d40('0x11f')})[_0x4d40('0x1b')](function(_0x3fd0d6){window[_0x4d40('0x58')][_0x4d40('0x25')]=_0x3fd0d6;_0xa3297d[_0x4d40('0x8c')]();})[_0x4d40('0x1c')](function(_0x16f6c2){_0x5141c6([_0x4d40('0x120'),_0x16f6c2]);updateCartData();}),_0x524a37['data'](_0x4d40('0x11d'),_0x2e432a));};_0xa3297d['changeQantity']=function(_0x5e02e2,_0x1d2b8a,_0x1cd3a9,_0x4c1b48){function _0xae0a06(_0x481aa8){_0x481aa8=_0x4d40('0x121')!==typeof _0x481aa8?!0x1:_0x481aa8;_0xa3297d[_0x4d40('0x8c')]();window[_0x4d40('0x58')][_0x4d40('0x8f')]=!0x1;_0xa3297d[_0x4d40('0xd6')]();_0x4d40('0x3')!==typeof window[_0x4d40('0xf0')]&&'function'===typeof window[_0x4d40('0xf0')][_0x4d40('0xf1')]&&window[_0x4d40('0xf0')]['exec']['call'](this);'function'===typeof adminCart&&adminCart();_0x3a59d3['fn'][_0x4d40('0x24')](!0x0,void 0x0,_0x481aa8);_0x4d40('0x8')===typeof _0x4c1b48&&_0x4c1b48(_0x1d2b8a);}_0x1cd3a9=_0x1cd3a9||0x1;if(0x1>_0x1cd3a9)return _0x1d2b8a;if(_0x2589de[_0x4d40('0x57')]){if(_0x4d40('0x3')===typeof window['_QuatroDigital_DropDown']['getOrderForm'][_0x4d40('0x3f')][_0x5e02e2[0x1]])return _0x5141c6(_0x4d40('0x122')+_0x5e02e2[0x1]+']'),_0x1d2b8a;window[_0x4d40('0x58')]['getOrderForm'][_0x4d40('0x3f')][_0x5e02e2[0x1]][_0x4d40('0x40')]=_0x1cd3a9;window[_0x4d40('0x58')][_0x4d40('0x25')][_0x4d40('0x3f')][_0x5e02e2[0x1]]['index']=_0x5e02e2[0x1];_0x23f387['updateItems']([window[_0x4d40('0x58')][_0x4d40('0x25')][_0x4d40('0x3f')][_0x5e02e2[0x1]]],['items',_0x4d40('0x38'),_0x4d40('0x5c')])['done'](function(_0x260924){window[_0x4d40('0x58')][_0x4d40('0x25')]=_0x260924;_0xae0a06(!0x0);})['fail'](function(_0x3c8e14){_0x5141c6([_0x4d40('0x123'),_0x3c8e14]);_0xae0a06();});}else _0x5141c6(_0x4d40('0x124'));};_0xa3297d[_0x4d40('0x119')]=function(_0x270bbf,_0x11c517){function _0x36c640(_0x38a2aa){_0x38a2aa=_0x4d40('0x121')!==typeof _0x38a2aa?!0x1:_0x38a2aa;_0x4d40('0x3')!==typeof window['_QuatroDigital_AmountProduct']&&_0x4d40('0x8')===typeof window['_QuatroDigital_AmountProduct'][_0x4d40('0xf1')]&&window['_QuatroDigital_AmountProduct'][_0x4d40('0xf1')][_0x4d40('0x61')](this);'function'===typeof adminCart&&adminCart();_0x3a59d3['fn'][_0x4d40('0x24')](!0x0,void 0x0,_0x38a2aa);_0x4d40('0x8')===typeof _0x11c517&&_0x11c517(_0xc930e7);}var _0xc930e7=!0x1,_0x47c554=_0x3a59d3(_0x270bbf)[_0x4d40('0x94')](_0x4d40('0x110'));if(_0x2589de[_0x4d40('0x57')]){if(_0x4d40('0x3')===typeof window['_QuatroDigital_DropDown'][_0x4d40('0x25')][_0x4d40('0x3f')][_0x47c554])return _0x5141c6(_0x4d40('0x122')+_0x47c554+']'),_0xc930e7;window[_0x4d40('0x58')][_0x4d40('0x25')][_0x4d40('0x3f')][_0x47c554]['index']=_0x47c554;_0x23f387[_0x4d40('0x125')]([window[_0x4d40('0x58')][_0x4d40('0x25')][_0x4d40('0x3f')][_0x47c554]],[_0x4d40('0x3f'),_0x4d40('0x38'),_0x4d40('0x5c')])[_0x4d40('0x1b')](function(_0x3d5877){_0xc930e7=!0x0;window[_0x4d40('0x58')][_0x4d40('0x25')]=_0x3d5877;_0x460a96(_0x3d5877);_0x36c640(!0x0);})[_0x4d40('0x1c')](function(_0x42456f){_0x5141c6([_0x4d40('0x126'),_0x42456f]);_0x36c640();});}else alert(_0x4d40('0x127'));};_0xa3297d['scrollCart']=function(_0x59f7c9,_0x53b786,_0x131c12,_0x1343cf){_0x1343cf=_0x1343cf||_0x3a59d3(_0x4d40('0x128'));_0x59f7c9=_0x59f7c9||'+';_0x53b786=_0x53b786||0.9*_0x1343cf[_0x4d40('0x129')]();_0x1343cf[_0x4d40('0x11a')](!0x0,!0x0)[_0x4d40('0x12a')]({'scrollTop':isNaN(_0x131c12)?_0x59f7c9+'='+_0x53b786+'px':_0x131c12});};_0x2589de[_0x4d40('0xd4')]||(_0xa3297d[_0x4d40('0x8c')](),_0x3a59d3['fn']['simpleCart'](!0x0));_0x3a59d3(window)['on'](_0x4d40('0x12b'),function(){try{window['_QuatroDigital_DropDown'][_0x4d40('0x25')]=void 0x0,_0xa3297d[_0x4d40('0x8c')]();}catch(_0x49f9c2){_0x5141c6(_0x4d40('0x12c')+_0x49f9c2[_0x4d40('0x21')],_0x4d40('0x12d'));}});'function'===typeof _0x2589de[_0x4d40('0x41')]?_0x2589de[_0x4d40('0x41')]['call'](this):_0x5141c6(_0x4d40('0xa9'));};_0x3a59d3['fn'][_0x4d40('0xb6')]=function(_0x5d61ff){var _0x290154=_0x3a59d3(this);_0x290154['fn']=new _0x3a59d3[(_0x4d40('0xb6'))](this,_0x5d61ff);return _0x290154;};}catch(_0x175e73){_0x4d40('0x3')!==typeof console&&'function'===typeof console['error']&&console[_0x4d40('0x13')](_0x4d40('0x65'),_0x175e73);}}(this));(function(_0xa56e49){try{var _0x1a4f91=jQuery;window[_0x4d40('0xf0')]=window[_0x4d40('0xf0')]||{};window[_0x4d40('0xf0')][_0x4d40('0x3f')]={};window[_0x4d40('0xf0')][_0x4d40('0x12e')]=!0x1;window[_0x4d40('0xf0')][_0x4d40('0x12f')]=!0x1;window[_0x4d40('0xf0')][_0x4d40('0x130')]=!0x1;var _0x37717f=function(){if(window[_0x4d40('0xf0')]['allowRecalculate']){var _0x1758df=!0x1;var _0xa56e49={};window[_0x4d40('0xf0')][_0x4d40('0x3f')]={};for(_0x37c097 in window[_0x4d40('0x58')][_0x4d40('0x25')][_0x4d40('0x3f')])if(_0x4d40('0x29')===typeof window[_0x4d40('0x58')][_0x4d40('0x25')][_0x4d40('0x3f')][_0x37c097]){var _0x42271d=window[_0x4d40('0x58')][_0x4d40('0x25')][_0x4d40('0x3f')][_0x37c097];_0x4d40('0x3')!==typeof _0x42271d[_0x4d40('0x131')]&&null!==_0x42271d[_0x4d40('0x131')]&&''!==_0x42271d[_0x4d40('0x131')]&&(window['_QuatroDigital_AmountProduct'][_0x4d40('0x3f')]['prod_'+_0x42271d['productId']]=window[_0x4d40('0xf0')][_0x4d40('0x3f')][_0x4d40('0x132')+_0x42271d['productId']]||{},window[_0x4d40('0xf0')][_0x4d40('0x3f')]['prod_'+_0x42271d['productId']]['prodId']=_0x42271d[_0x4d40('0x131')],_0xa56e49[_0x4d40('0x132')+_0x42271d[_0x4d40('0x131')]]||(window[_0x4d40('0xf0')][_0x4d40('0x3f')][_0x4d40('0x132')+_0x42271d[_0x4d40('0x131')]][_0x4d40('0x3e')]=0x0),window['_QuatroDigital_AmountProduct']['items'][_0x4d40('0x132')+_0x42271d[_0x4d40('0x131')]][_0x4d40('0x3e')]+=_0x42271d[_0x4d40('0x40')],_0x1758df=!0x0,_0xa56e49[_0x4d40('0x132')+_0x42271d[_0x4d40('0x131')]]=!0x0);}var _0x37c097=_0x1758df;}else _0x37c097=void 0x0;window[_0x4d40('0xf0')][_0x4d40('0x12e')]&&(_0x1a4f91(_0x4d40('0x133'))[_0x4d40('0x134')](),_0x1a4f91(_0x4d40('0x135'))['removeClass'](_0x4d40('0x136')));for(var _0x41496a in window[_0x4d40('0xf0')][_0x4d40('0x3f')]){_0x42271d=window[_0x4d40('0xf0')][_0x4d40('0x3f')][_0x41496a];if('object'!==typeof _0x42271d)return;_0xa56e49=_0x1a4f91(_0x4d40('0x137')+_0x42271d[_0x4d40('0x138')]+']')[_0x4d40('0x0')]('li');if(window[_0x4d40('0xf0')][_0x4d40('0x12e')]||!_0xa56e49[_0x4d40('0x50')](_0x4d40('0x133'))[_0x4d40('0x6')])_0x1758df=_0x1a4f91(_0x4d40('0x139')),_0x1758df[_0x4d40('0x50')](_0x4d40('0x13a'))[_0x4d40('0x4d')](_0x42271d['qtt']),_0x42271d=_0xa56e49[_0x4d40('0x50')](_0x4d40('0x13b')),_0x42271d[_0x4d40('0x6')]?_0x42271d[_0x4d40('0xac')](_0x1758df)[_0x4d40('0x49')](_0x4d40('0x136')):_0xa56e49[_0x4d40('0xac')](_0x1758df);}_0x37c097&&(window['_QuatroDigital_AmountProduct'][_0x4d40('0x12e')]=!0x1);};window['_QuatroDigital_AmountProduct'][_0x4d40('0xf1')]=function(){window[_0x4d40('0xf0')][_0x4d40('0x12e')]=!0x0;_0x37717f[_0x4d40('0x61')](this);};_0x1a4f91(document)[_0x4d40('0xb3')](function(){_0x37717f['call'](this);});}catch(_0x878cdd){_0x4d40('0x3')!==typeof console&&_0x4d40('0x8')===typeof console[_0x4d40('0x13')]&&console[_0x4d40('0x13')](_0x4d40('0x65'),_0x878cdd);}}(this));(function(){try{var _0x37e237=jQuery,_0x931480,_0x3de2ba={'selector':'.qdDdcContainer','dropDown':{},'buyButton':{}};_0x37e237[_0x4d40('0x13c')]=function(_0x5cd06c){var _0x5e1713={};_0x931480=_0x37e237[_0x4d40('0x14')](!0x0,{},_0x3de2ba,_0x5cd06c);_0x5cd06c=_0x37e237(_0x931480[_0x4d40('0x83')])[_0x4d40('0xb6')](_0x931480[_0x4d40('0x13d')]);_0x5e1713[_0x4d40('0x7a')]='undefined'!==typeof _0x931480['dropDown']['updateOnlyHover']&&!0x1===_0x931480['dropDown'][_0x4d40('0xd4')]?_0x37e237(_0x931480[_0x4d40('0x83')])[_0x4d40('0xaa')](_0x5cd06c['fn'],_0x931480['buyButton']):_0x37e237(_0x931480[_0x4d40('0x83')])[_0x4d40('0xaa')](_0x931480['buyButton']);_0x5e1713['dropDown']=_0x5cd06c;return _0x5e1713;};_0x37e237['fn'][_0x4d40('0x13e')]=function(){_0x4d40('0x29')===typeof console&&'function'===typeof console[_0x4d40('0x2d')]&&console[_0x4d40('0x2d')]('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x37e237[_0x4d40('0x13e')]=_0x37e237['fn'][_0x4d40('0x13e')];}catch(_0x2c5ae7){_0x4d40('0x3')!==typeof console&&_0x4d40('0x8')===typeof console[_0x4d40('0x13')]&&console[_0x4d40('0x13')](_0x4d40('0x65'),_0x2c5ae7);}}());

/* Quatro Digital - Product Thumbs // Carlos Vinicius // Todos os direitos reservados. */
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs();a.trigger("QuatroDigital.pt_callback",[a])}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return a.length?$.extend({},a,new b(a)):a},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0xeb54=['fadeTo','body','addClass','add','animate','find','a:not(\x27.qd-videoLink\x27)','bind','removeAttr','style','removeClass','.qd-videoItem','string','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','click.playVideo','.ON','.qd-playerWrapper\x20iframe','call','contentWindow','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','attr','rel','controlVideo','a:not(.qd-videoLink)','click','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','insertThumbsIn','appendTo','trigger','QuatroDigital.pv_video_added','load','ImageControl','.qd-videoLink','.produto','alerta','toLowerCase','warn','[Video\x20in\x20product]\x20','undefined','info','error','qdVideoInProduct','extend','start','td.value-field.Videos:first','ul.thumbs','replace','length','youtube','push','split','youtu.be','be/','pop','shift','<div\x20class=\x22qd-playerWrapper\x22></div>','prependTo','#include','wrap','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','join','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','<iframe\x20src=\x22','?wmode=transparent&rel=0&enablejsapi=1\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>','data','height','stop'];(function(_0x513aa5,_0x1fba79){var _0x1a1a7c=function(_0x240e3f){while(--_0x240e3f){_0x513aa5['push'](_0x513aa5['shift']());}};_0x1a1a7c(++_0x1fba79);}(_0xeb54,0xfa));var _0x4eb5=function(_0x482e69,_0x45d988){_0x482e69=_0x482e69-0x0;var _0x3587bb=_0xeb54[_0x482e69];return _0x3587bb;};(function(_0x73e636){$(function(){if($(document['body'])['is'](_0x4eb5('0x0'))){var _0x3601f8=[];var _0x2689d0=function(_0x32a168,_0x52ede7){'object'===typeof console&&('undefined'!==typeof _0x52ede7&&_0x4eb5('0x1')===_0x52ede7[_0x4eb5('0x2')]()?console[_0x4eb5('0x3')](_0x4eb5('0x4')+_0x32a168):_0x4eb5('0x5')!==typeof _0x52ede7&&'info'===_0x52ede7[_0x4eb5('0x2')]()?console[_0x4eb5('0x6')](_0x4eb5('0x4')+_0x32a168):console[_0x4eb5('0x7')](_0x4eb5('0x4')+_0x32a168));};window[_0x4eb5('0x8')]=window[_0x4eb5('0x8')]||{};var _0x840b93=$[_0x4eb5('0x9')](!0x0,{'insertThumbsIn':_0x4eb5('0xa'),'videoFieldSelector':_0x4eb5('0xb'),'controlVideo':!0x0,'urlProtocol':'http'},window[_0x4eb5('0x8')]);var _0x1a7bc3=$(_0x4eb5('0xc'));var _0x4f2115=$('div#image');var _0x182a2a=$(_0x840b93['videoFieldSelector'])['text']()[_0x4eb5('0xd')](/\;\s*/,';')['split'](';');for(var _0x567009=0x0;_0x567009<_0x182a2a[_0x4eb5('0xe')];_0x567009++)-0x1<_0x182a2a[_0x567009]['indexOf'](_0x4eb5('0xf'))?_0x3601f8[_0x4eb5('0x10')](_0x182a2a[_0x567009][_0x4eb5('0x11')]('v=')['pop']()[_0x4eb5('0x11')](/[&#]/)['shift']()):-0x1<_0x182a2a[_0x567009]['indexOf'](_0x4eb5('0x12'))&&_0x3601f8[_0x4eb5('0x10')](_0x182a2a[_0x567009][_0x4eb5('0x11')](_0x4eb5('0x13'))[_0x4eb5('0x14')]()[_0x4eb5('0x11')](/[\?&#]/)[_0x4eb5('0x15')]());var _0x350bed=$(_0x4eb5('0x16'));_0x350bed[_0x4eb5('0x17')](_0x4eb5('0x18'));_0x350bed[_0x4eb5('0x19')]('<div\x20class=\x22qd-playerContainer\x22></div>');_0x182a2a=function(_0x1567ab){var _0x2fdf0d={'t':_0x4eb5('0x1a')};return function(_0x1668b7){var _0x7a0bbe=function(_0x18b1b0){return _0x18b1b0;};var _0x417754=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x1668b7=_0x1668b7['d'+_0x417754[0x10]+'c'+_0x417754[0x11]+'m'+_0x7a0bbe(_0x417754[0x1])+'n'+_0x417754[0xd]]['l'+_0x417754[0x12]+'c'+_0x417754[0x0]+'ti'+_0x7a0bbe('o')+'n'];var _0x57804c=function(_0x41c3d9){return escape(encodeURIComponent(_0x41c3d9[_0x4eb5('0xd')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x31a163){return String['fromCharCode'](('Z'>=_0x31a163?0x5a:0x7a)>=(_0x31a163=_0x31a163[_0x4eb5('0x1b')](0x0)+0xd)?_0x31a163:_0x31a163-0x1a);})));};var _0x15a95a=_0x57804c(_0x1668b7[[_0x417754[0x9],_0x7a0bbe('o'),_0x417754[0xc],_0x417754[_0x7a0bbe(0xd)]][_0x4eb5('0x1c')]('')]);_0x57804c=_0x57804c((window[['js',_0x7a0bbe('no'),'m',_0x417754[0x1],_0x417754[0x4]['toUpperCase'](),_0x4eb5('0x1d')][_0x4eb5('0x1c')]('')]||_0x4eb5('0x1e'))+['.v',_0x417754[0xd],'e',_0x7a0bbe('x'),'co',_0x7a0bbe('mm'),_0x4eb5('0x1f'),_0x417754[0x1],'.c',_0x7a0bbe('o'),'m.',_0x417754[0x13],'r'][_0x4eb5('0x1c')](''));for(var _0x19fdad in _0x2fdf0d){if(_0x57804c===_0x19fdad+_0x2fdf0d[_0x19fdad]||_0x15a95a===_0x19fdad+_0x2fdf0d[_0x19fdad]){var _0x3da548='tr'+_0x417754[0x11]+'e';break;}_0x3da548='f'+_0x417754[0x0]+'ls'+_0x7a0bbe(_0x417754[0x1])+'';}_0x7a0bbe=!0x1;-0x1<_0x1668b7[[_0x417754[0xc],'e',_0x417754[0x0],'rc',_0x417754[0x9]][_0x4eb5('0x1c')]('')]['indexOf'](_0x4eb5('0x20'))&&(_0x7a0bbe=!0x0);return[_0x3da548,_0x7a0bbe];}(_0x1567ab);}(window);if(!eval(_0x182a2a[0x0]))return _0x182a2a[0x1]?_0x2689d0('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x196734=function(_0x3dfc6e,_0x276475){_0x4eb5('0xf')===_0x276475&&_0x350bed['html'](_0x4eb5('0x21')+_0x840b93['urlProtocol']+'://www.youtube.com/embed/'+_0x3dfc6e+_0x4eb5('0x22'));_0x4f2115[_0x4eb5('0x23')](_0x4eb5('0x24'),_0x4f2115[_0x4eb5('0x23')](_0x4eb5('0x24'))||_0x4f2115[_0x4eb5('0x24')]());_0x4f2115[_0x4eb5('0x25')](!0x0,!0x0)[_0x4eb5('0x26')](0x1f4,0x0,function(){$(_0x4eb5('0x27'))[_0x4eb5('0x28')]('qdpv-video-on');});_0x350bed[_0x4eb5('0x25')](!0x0,!0x0)[_0x4eb5('0x26')](0x1f4,0x1,function(){_0x4f2115[_0x4eb5('0x29')](_0x350bed)[_0x4eb5('0x2a')]({'height':_0x350bed[_0x4eb5('0x2b')]('iframe')['height']()},0x2bc);});};removePlayer=function(){_0x1a7bc3[_0x4eb5('0x2b')](_0x4eb5('0x2c'))[_0x4eb5('0x2d')]('click.removeVideo',function(){_0x350bed['stop'](!0x0,!0x0)['fadeTo'](0x1f4,0x0,function(){$(this)['hide']()[_0x4eb5('0x2e')](_0x4eb5('0x2f'));$(_0x4eb5('0x27'))[_0x4eb5('0x30')]('qdpv-video-on');});_0x4f2115['stop'](!0x0,!0x0)[_0x4eb5('0x26')](0x1f4,0x1,function(){var _0x4e1e5a=_0x4f2115[_0x4eb5('0x23')](_0x4eb5('0x24'));_0x4e1e5a&&_0x4f2115[_0x4eb5('0x2a')]({'height':_0x4e1e5a},0x2bc);});});};var _0x17f30c=function(){if(!_0x1a7bc3[_0x4eb5('0x2b')](_0x4eb5('0x31'))[_0x4eb5('0xe')])for(vId in removePlayer['call'](this),_0x3601f8)if(_0x4eb5('0x32')===typeof _0x3601f8[vId]&&''!==_0x3601f8[vId]){var _0x3b8963=$(_0x4eb5('0x33')+_0x3601f8[vId]+'/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27'+_0x3601f8[vId]+'\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/'+_0x3601f8[vId]+'/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>');_0x3b8963[_0x4eb5('0x2b')]('a')[_0x4eb5('0x2d')](_0x4eb5('0x34'),function(){var _0x38734e=$(this);_0x1a7bc3['find'](_0x4eb5('0x35'))['removeClass']('ON');_0x38734e[_0x4eb5('0x28')]('ON');0x1==_0x840b93['controlVideo']?$(_0x4eb5('0x36'))['length']?(_0x196734[_0x4eb5('0x37')](this,'',''),$('.qd-playerWrapper\x20iframe')[0x0][_0x4eb5('0x38')]['postMessage'](_0x4eb5('0x39'),'*')):_0x196734['call'](this,_0x38734e[_0x4eb5('0x3a')](_0x4eb5('0x3b')),_0x4eb5('0xf')):_0x196734['call'](this,_0x38734e[_0x4eb5('0x3a')]('rel'),_0x4eb5('0xf'));return!0x1;});0x1==_0x840b93[_0x4eb5('0x3c')]&&_0x1a7bc3['find'](_0x4eb5('0x3d'))[_0x4eb5('0x3e')](function(_0x5c273b){$('.qd-playerWrapper\x20iframe')[_0x4eb5('0xe')]&&$('.qd-playerWrapper\x20iframe')[0x0][_0x4eb5('0x38')][_0x4eb5('0x3f')](_0x4eb5('0x40'),'*');});_0x4eb5('0xa')===_0x840b93[_0x4eb5('0x41')]?_0x3b8963[_0x4eb5('0x17')](_0x1a7bc3):_0x3b8963[_0x4eb5('0x42')](_0x1a7bc3);_0x3b8963[_0x4eb5('0x43')](_0x4eb5('0x44'),[_0x3601f8[vId],_0x3b8963]);}};$(document)['ajaxStop'](_0x17f30c);$(window)[_0x4eb5('0x45')](_0x17f30c);(function(){var _0x156b07=this;var _0x90660d=window[_0x4eb5('0x46')]||function(){};window['ImageControl']=function(_0x184b8f,_0x20e98a){$(_0x184b8f||'')['is'](_0x4eb5('0x47'))||(_0x90660d[_0x4eb5('0x37')](this,_0x184b8f,_0x20e98a),_0x17f30c[_0x4eb5('0x37')](_0x156b07));};}());}});}(this));

/* Quatro Digital - Mosaic Banners // Carlos Vinicius // Todos os direitos reservados */
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

