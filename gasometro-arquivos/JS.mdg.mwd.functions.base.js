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
			// Roda slick das thumbs quando volta para estado inicial
			$(window).on('skuSelectable.vtex', Product.applyCarouselThumb);

			Product.applySmartPrice();	
			
			// Apenas para tela de KIT
			if( $("body").is(".product-kit") ){
			Product.showKitItem();
			Product.itemSelected();
			Product.setBuyUrl();
			Product.skuItemClick();
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
			$(".kit-item-row").each(function () {
				if ($(this).find("#image-main").length) {
					$(this).show();
				}
			});
		},
		itemSelected: function () {
			$(".kit-item-select").find("p").bind("click", function () {
				$(this).parents(".kit-item-row").toggleClass("qd-state-not-selected");
			});
		},
		setBuyUrl : function(){
			var btns = $(".kit-item-row:not('.qd-state-not-selected, .qd-item-unavailable') .buy-in-page-button");
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
			$(".kit-item-row").bind("click", function () {
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
			$(".kit-item-row").each(function () {
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
			$(".product-kit-zoom a, .product-kit-image").bind("click", function () {
				if (typeof window.FireSkuChangeImage === "function")
					window.FireSkuChangeImage(($(this).parents(".kit-item-row").find("#___rc-p-sku-ids").val() || "").split(",").shift());

				$('html, body').animate({ scrollTop: Math.floor($(".bread-crumb").offset().top || 0) });

				return false;
			});

			$(".product-picture").bind("click", function () {
				if (typeof window.FireSkuChangeImage === "function")
					window.FireSkuChangeImage(($(".qd-product-name-wrapper #___rc-p-sku-ids").val() || "").split(",").shift());

				$('html, body').animate({ scrollTop: Math.floor($(".bread-crumb").offset().top || 0) });

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
var _0x77f2=['.qd_productOldPrice','val','changeNativePrice','.qd_displayPrice','skuPrice','html','installments','installmentValue','.qd_sp_display_installments','.qd_sp_display_installmentValue','.qd_sp_installments','.qd_saveAmountPercent','prepend','changeNativeSaveAmount','each','skuSelected.vtex','qd_sp_processedItem','startedByWrapper','call','string','not','.qd_sp_processedItem','.qd_productPrice:not(.qd_sp_processedItem)','display:none\x20!important;','append','after','boolean','.produto','prototype','trim','abs','pow','round','toFixed','length','replace','join','QD_SmartPrice','Smart\x20Price','object','function','info','warn','unshift','undefined','toLowerCase','apply','error','text','match','.flag','[class*=\x27desconto\x27]','.productRightColumn','strong.skuBestPrice','label.skuBestInstallmentNumber','label.skuBestInstallmentValue','strong.skuPrice','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','productPage','isProductPage','closest','wrapperElement','find','skuBestPrice','addClass','qd-active','qd-sp-active','.qd_active','removeClass','.qd_sp_on','qd_sp_ignored','qd_sp_on','div[skuCorrente]:first','attr','skus','sku','available','bestPrice','qd-sp-product-unavailable','O\x20valor\x20informado\x20p/\x20o\x20desconto\x20não\x20é\x20um\x20número.','.qd_productPrice','Por\x20alguma\x20razão\x20não\x20consegui\x20obter\x20o\x20preço\x20deste\x20produto\x20:(','appliedDiscount','listPrice'];(function(_0x4dda7b,_0x200113){var _0x237547=function(_0x2f785e){while(--_0x2f785e){_0x4dda7b['push'](_0x4dda7b['shift']());}};_0x237547(++_0x200113);}(_0x77f2,0x188));var _0x277f=function(_0x2601b4,_0x315e78){_0x2601b4=_0x2601b4-0x0;var _0x3e3661=_0x77f2[_0x2601b4];return _0x3e3661;};'function'!==typeof String[_0x277f('0x0')]['trim']&&(String[_0x277f('0x0')][_0x277f('0x1')]=function(){return this['replace'](/^\s+|\s+$/g,'');});function qd_number_format(_0x5147da,_0x50f3f4,_0x148ab0,_0x26bc5b){_0x5147da=(_0x5147da+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x5147da=isFinite(+_0x5147da)?+_0x5147da:0x0;_0x50f3f4=isFinite(+_0x50f3f4)?Math[_0x277f('0x2')](_0x50f3f4):0x0;_0x26bc5b='undefined'===typeof _0x26bc5b?',':_0x26bc5b;_0x148ab0='undefined'===typeof _0x148ab0?'.':_0x148ab0;var _0x24b21a='',_0x24b21a=function(_0x422495,_0x548c80){var _0x50f3f4=Math[_0x277f('0x3')](0xa,_0x548c80);return''+(Math[_0x277f('0x4')](_0x422495*_0x50f3f4)/_0x50f3f4)[_0x277f('0x5')](_0x548c80);},_0x24b21a=(_0x50f3f4?_0x24b21a(_0x5147da,_0x50f3f4):''+Math[_0x277f('0x4')](_0x5147da))['split']('.');0x3<_0x24b21a[0x0][_0x277f('0x6')]&&(_0x24b21a[0x0]=_0x24b21a[0x0][_0x277f('0x7')](/\B(?=(?:\d{3})+(?!\d))/g,_0x26bc5b));(_0x24b21a[0x1]||'')[_0x277f('0x6')]<_0x50f3f4&&(_0x24b21a[0x1]=_0x24b21a[0x1]||'',_0x24b21a[0x1]+=Array(_0x50f3f4-_0x24b21a[0x1][_0x277f('0x6')]+0x1)[_0x277f('0x8')]('0'));return _0x24b21a[_0x277f('0x8')](_0x148ab0);};(function(_0x227936){'use strict';var _0x39d884=jQuery;if(typeof _0x39d884['fn'][_0x277f('0x9')]==='function')return;var _0x22546f=_0x277f('0xa');var _0x1e4a07=function(_0x1c5b75,_0x1b5673){if(_0x277f('0xb')===typeof console&&_0x277f('0xc')===typeof console['error']&&_0x277f('0xc')===typeof console[_0x277f('0xd')]&&'function'===typeof console[_0x277f('0xe')]){var _0xe4e8c5;'object'===typeof _0x1c5b75?(_0x1c5b75[_0x277f('0xf')]('['+_0x22546f+']\x0a'),_0xe4e8c5=_0x1c5b75):_0xe4e8c5=['['+_0x22546f+']\x0a'+_0x1c5b75];if(_0x277f('0x10')===typeof _0x1b5673||'alerta'!==_0x1b5673[_0x277f('0x11')]()&&'aviso'!==_0x1b5673[_0x277f('0x11')]())if(_0x277f('0x10')!==typeof _0x1b5673&&_0x277f('0xd')===_0x1b5673['toLowerCase']())try{console['info'][_0x277f('0x12')](console,_0xe4e8c5);}catch(_0xd3015e){console[_0x277f('0xd')](_0xe4e8c5[_0x277f('0x8')]('\x0a'));}else try{console['error'][_0x277f('0x12')](console,_0xe4e8c5);}catch(_0x76e72f){console[_0x277f('0x13')](_0xe4e8c5[_0x277f('0x8')]('\x0a'));}else try{console['warn'][_0x277f('0x12')](console,_0xe4e8c5);}catch(_0x480584){console['warn'](_0xe4e8c5[_0x277f('0x8')]('\x0a'));}}};var _0x30816b=/[0-9]+\%/i;var _0x320d29=/[0-9\.]+(?=\%)/i;var _0x45cb6c={'isDiscountFlag':function(_0x588369){if(_0x588369[_0x277f('0x14')]()['search'](_0x30816b)>-0x1)return!![];return![];},'getDiscountValue':function(_0x1e7b7a){return _0x1e7b7a[_0x277f('0x14')]()[_0x277f('0x15')](_0x320d29);},'startedByWrapper':![],'flagElement':_0x277f('0x16'),'wrapperElement':'li','filterFlagBy':_0x277f('0x17'),'forcePromotion':null,'appliedDiscount':null,'oneFlagByItem':!![],'isSmartCheckout':!![],'changeInstallments':![],'productPage':{'changeNativeSaveAmount':!![],'changeNativePrice':!![],'changeInstallments':![],'isProductPage':'auto','wrapperElement':_0x277f('0x18'),'skuBestPrice':_0x277f('0x19'),'installments':_0x277f('0x1a'),'installmentValue':_0x277f('0x1b'),'skuPrice':_0x277f('0x1c')}};_0x39d884['fn']['QD_SmartPrice']=function(){};var _0x61b2fb=function(_0x5939c8){var _0x50018f={'t':_0x277f('0x1d')};return function(_0x4f0aea){var _0x31dab4,_0x3a6000,_0x518ff0,_0xea9716;_0x3a6000=function(_0xd14725){return _0xd14725;};_0x518ff0=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4f0aea=_0x4f0aea['d'+_0x518ff0[0x10]+'c'+_0x518ff0[0x11]+'m'+_0x3a6000(_0x518ff0[0x1])+'n'+_0x518ff0[0xd]]['l'+_0x518ff0[0x12]+'c'+_0x518ff0[0x0]+'ti'+_0x3a6000('o')+'n'];_0x31dab4=function(_0x58d702){return escape(encodeURIComponent(_0x58d702[_0x277f('0x7')](/\./g,'¨')[_0x277f('0x7')](/[a-zA-Z]/g,function(_0x6a3117){return String[_0x277f('0x1e')](('Z'>=_0x6a3117?0x5a:0x7a)>=(_0x6a3117=_0x6a3117[_0x277f('0x1f')](0x0)+0xd)?_0x6a3117:_0x6a3117-0x1a);})));};var _0x47e511=_0x31dab4(_0x4f0aea[[_0x518ff0[0x9],_0x3a6000('o'),_0x518ff0[0xc],_0x518ff0[_0x3a6000(0xd)]][_0x277f('0x8')]('')]);_0x31dab4=_0x31dab4((window[['js',_0x3a6000('no'),'m',_0x518ff0[0x1],_0x518ff0[0x4][_0x277f('0x20')](),_0x277f('0x21')]['join']('')]||'---')+['.v',_0x518ff0[0xd],'e',_0x3a6000('x'),'co',_0x3a6000('mm'),_0x277f('0x22'),_0x518ff0[0x1],'.c',_0x3a6000('o'),'m.',_0x518ff0[0x13],'r']['join'](''));for(var _0x2077de in _0x50018f){if(_0x31dab4===_0x2077de+_0x50018f[_0x2077de]||_0x47e511===_0x2077de+_0x50018f[_0x2077de]){_0xea9716='tr'+_0x518ff0[0x11]+'e';break;}_0xea9716='f'+_0x518ff0[0x0]+'ls'+_0x3a6000(_0x518ff0[0x1])+'';}_0x3a6000=!0x1;-0x1<_0x4f0aea[[_0x518ff0[0xc],'e',_0x518ff0[0x0],'rc',_0x518ff0[0x9]][_0x277f('0x8')]('')]['indexOf'](_0x277f('0x23'))&&(_0x3a6000=!0x0);return[_0xea9716,_0x3a6000];}(_0x5939c8);}(window);if(!eval(_0x61b2fb[0x0]))return _0x61b2fb[0x1]?_0x1e4a07(_0x277f('0x24')):!0x1;var _0x4fffa7=function(_0x1a3eca,_0x41f142){'use strict';var _0x31b17c=function(_0x4e3a15){'use strict';var _0x4bbfac,_0x436439,_0x7bcc35,_0xb07c7f,_0x3a90ca,_0x362b57,_0x59e8ee,_0xdb3afb,_0x46b878,_0xf9fd90,_0x2eb395,_0x4f66d7,_0xc914cb,_0x5aa56f,_0x3c5e3f,_0x5d42f1,_0x46226a,_0x1c6448,_0x5376ff;var _0x2abeaa=_0x39d884(this);_0x4e3a15=typeof _0x4e3a15==='undefined'?![]:_0x4e3a15;if(_0x41f142[_0x277f('0x25')][_0x277f('0x26')])var _0x3e2a58=_0x2abeaa[_0x277f('0x27')](_0x41f142[_0x277f('0x25')][_0x277f('0x28')]);else var _0x3e2a58=_0x2abeaa['closest'](_0x41f142['wrapperElement']);if(!_0x4e3a15&&!_0x2abeaa['is'](_0x41f142['filterFlagBy'])){if(_0x41f142[_0x277f('0x25')][_0x277f('0x26')]&&_0x3e2a58['is'](_0x41f142['productPage'][_0x277f('0x28')])){_0x3e2a58[_0x277f('0x29')](_0x41f142[_0x277f('0x25')][_0x277f('0x2a')])[_0x277f('0x2b')](_0x277f('0x2c'));_0x3e2a58['addClass'](_0x277f('0x2d'));}return;}var _0xfeeea6=_0x41f142[_0x277f('0x25')][_0x277f('0x26')];if(_0x2abeaa['is']('.qd_sp_on,\x20.qd_sp_ignored')&&!_0xfeeea6)return;if(_0xfeeea6){_0xdb3afb=_0x3e2a58[_0x277f('0x29')](_0x41f142['productPage'][_0x277f('0x2a')]);if(_0xdb3afb[_0x277f('0x29')](_0x277f('0x2e'))[_0x277f('0x6')])return;_0xdb3afb[_0x277f('0x2f')](_0x277f('0x2c'));_0x3e2a58[_0x277f('0x2f')](_0x277f('0x2d'));}if(_0x41f142['oneFlagByItem']&&_0x2abeaa['siblings'](_0x277f('0x30'))[_0x277f('0x6')]){_0x2abeaa['addClass'](_0x277f('0x31'));return;}_0x2abeaa[_0x277f('0x2b')](_0x277f('0x32'));if(!_0x41f142['isDiscountFlag'](_0x2abeaa))return;if(_0xfeeea6){_0x7bcc35={};var _0x1ee57f=parseInt(_0x39d884(_0x277f('0x33'))[_0x277f('0x34')]('skuCorrente'),0xa);if(_0x1ee57f){for(var _0x55d0a2=0x0;_0x55d0a2<skuJson[_0x277f('0x35')][_0x277f('0x6')];_0x55d0a2++){if(skuJson[_0x277f('0x35')][_0x55d0a2][_0x277f('0x36')]==_0x1ee57f){_0x7bcc35=skuJson[_0x277f('0x35')][_0x55d0a2];break;}}}else{var _0x3b7cab=0x5af3107a3fff;for(var _0x2e1319 in skuJson['skus']){if(typeof skuJson[_0x277f('0x35')][_0x2e1319]==='function')continue;if(!skuJson[_0x277f('0x35')][_0x2e1319][_0x277f('0x37')])continue;if(skuJson['skus'][_0x2e1319][_0x277f('0x38')]<_0x3b7cab){_0x3b7cab=skuJson[_0x277f('0x35')][_0x2e1319][_0x277f('0x38')];_0x7bcc35=skuJson['skus'][_0x2e1319];}}}}_0x5d42f1=!![];_0x46226a=0x0;if(_0x41f142['isSmartCheckout']&&_0x1c6448){_0x5d42f1=skuJson[_0x277f('0x37')];if(!_0x5d42f1)return _0x3e2a58[_0x277f('0x2b')](_0x277f('0x39'));}_0x436439=_0x41f142['getDiscountValue'](_0x2abeaa);_0x4bbfac=parseFloat(_0x436439,0xa);if(isNaN(_0x4bbfac))return _0x1e4a07([_0x277f('0x3a'),_0x2abeaa],'alerta');var _0x3e3735=function(_0x542392){if(_0xfeeea6)_0xb07c7f=(_0x542392[_0x277f('0x38')]||0x0)/0x64;else{_0xc914cb=_0x3e2a58[_0x277f('0x29')](_0x277f('0x3b'));_0xb07c7f=parseFloat((_0xc914cb['val']()||'')[_0x277f('0x7')](/[^0-9\.\,]+/i,'')[_0x277f('0x7')]('.','')['replace'](',','.'),0xa);}if(isNaN(_0xb07c7f))return _0x1e4a07([_0x277f('0x3c'),_0x2abeaa,_0x3e2a58]);if(_0x41f142[_0x277f('0x3d')]!==null){_0x5aa56f=0x0;if(!isNaN(_0x41f142[_0x277f('0x3d')]))_0x5aa56f=_0x41f142[_0x277f('0x3d')];else{_0x3c5e3f=_0x3e2a58[_0x277f('0x29')](_0x41f142[_0x277f('0x3d')]);if(_0x3c5e3f['length'])_0x5aa56f=_0x41f142['getDiscountValue'](_0x3c5e3f);}_0x5aa56f=parseFloat(_0x5aa56f,0xa);if(isNaN(_0x5aa56f))_0x5aa56f=0x0;if(_0x5aa56f!==0x0)_0xb07c7f=_0xb07c7f*0x64/(0x64-_0x5aa56f);}if(_0xfeeea6)_0x3a90ca=(_0x542392[_0x277f('0x3e')]||0x0)/0x64;else _0x3a90ca=parseFloat((_0x3e2a58[_0x277f('0x29')](_0x277f('0x3f'))[_0x277f('0x40')]()||'')['replace'](/[^0-9\.\,]+/i,'')[_0x277f('0x7')]('.','')[_0x277f('0x7')](',','.'),0xa);if(isNaN(_0x3a90ca))_0x3a90ca=0.001;_0x362b57=_0xb07c7f*((0x64-_0x4bbfac)/0x64);if(_0xfeeea6&&_0x41f142[_0x277f('0x25')][_0x277f('0x41')]){_0xdb3afb['text'](_0xdb3afb[_0x277f('0x14')]()['trim']()['replace'](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x362b57,0x2,',','.')))[_0x277f('0x2b')](_0x277f('0x2c'));_0x3e2a58[_0x277f('0x2b')](_0x277f('0x2d'));}else{_0x5376ff=_0x3e2a58['find'](_0x277f('0x42'));_0x5376ff['text'](_0x5376ff[_0x277f('0x14')]()[_0x277f('0x7')](/[0-9\.]+,[0-9]+/i,'')+qd_number_format(_0x362b57,0x2,',','.'));}if(_0xfeeea6){_0x59e8ee=_0x3e2a58[_0x277f('0x29')](_0x41f142[_0x277f('0x25')][_0x277f('0x43')]);if(_0x59e8ee['length'])_0x59e8ee['text'](_0x59e8ee[_0x277f('0x14')]()[_0x277f('0x1')]()[_0x277f('0x7')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x362b57,0x2,',','.')));}var _0x16b801=_0x3e2a58[_0x277f('0x29')]('.qd-sp-display-discount');_0x16b801['text'](_0x16b801[_0x277f('0x14')]()[_0x277f('0x7')](/[0-9]+\%/i,_0x4bbfac+'%'));var _0x233534=function(_0x150bae,_0x5079c1,_0x3f1eb2){var _0x40c038=_0x3e2a58['find'](_0x150bae);if(_0x40c038[_0x277f('0x6')])_0x40c038['html'](_0x40c038[_0x277f('0x44')]()[_0x277f('0x1')]()[_0x277f('0x7')](/[0-9]{1,2}/,_0x3f1eb2?_0x3f1eb2:_0x542392['installments']||0x0));var _0x220bc8=_0x3e2a58[_0x277f('0x29')](_0x5079c1);if(_0x220bc8[_0x277f('0x6')])_0x220bc8[_0x277f('0x44')](_0x220bc8[_0x277f('0x44')]()[_0x277f('0x1')]()['replace'](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x362b57/(_0x3f1eb2?_0x3f1eb2:_0x542392[_0x277f('0x45')]||0x1),0x2,',','.')));};if(_0xfeeea6&&_0x41f142[_0x277f('0x25')]['changeInstallments'])_0x233534(_0x41f142[_0x277f('0x25')][_0x277f('0x45')],_0x41f142['productPage'][_0x277f('0x46')]);else if(_0x41f142['changeInstallments'])_0x233534(_0x277f('0x47'),_0x277f('0x48'),parseInt(_0x3e2a58[_0x277f('0x29')](_0x277f('0x49'))['val']()||0x1)||0x1);_0x3e2a58['find']('.qd_saveAmount')['append'](qd_number_format(_0x3a90ca-_0x362b57,0x2,',','.'));_0x3e2a58[_0x277f('0x29')](_0x277f('0x4a'))[_0x277f('0x4b')](qd_number_format((_0x3a90ca-_0x362b57)*0x64/_0x3a90ca,0x2,',','.'));if(_0xfeeea6&&_0x41f142['productPage'][_0x277f('0x4c')]){_0x39d884('em.economia-de')[_0x277f('0x4d')](function(){_0x2eb395=_0x39d884(this);_0x2eb395[_0x277f('0x14')](_0x2eb395[_0x277f('0x14')]()[_0x277f('0x1')]()['replace'](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x3a90ca-_0x362b57,0x2,',','.')));_0x2eb395['addClass'](_0x277f('0x2c'));});}};_0x3e3735(_0x7bcc35);if(_0xfeeea6)_0x39d884(window)['on'](_0x277f('0x4e'),function(_0x37fd26,_0x4ca16b,_0x2a1885){_0x3e3735(_0x2a1885);});_0x3e2a58[_0x277f('0x2b')]('qd_sp_processedItem');if(!_0xfeeea6)_0xc914cb['addClass'](_0x277f('0x4f'));};(_0x41f142[_0x277f('0x50')]?_0x1a3eca['find'](_0x41f142['flagElement']):_0x1a3eca)[_0x277f('0x4d')](function(){_0x31b17c[_0x277f('0x51')](this,![]);});if(typeof _0x41f142['forcePromotion']==_0x277f('0x52')){var _0x39420c=_0x41f142[_0x277f('0x50')]?_0x1a3eca:_0x1a3eca[_0x277f('0x27')](_0x41f142[_0x277f('0x28')]);if(_0x41f142['productPage'][_0x277f('0x26')])_0x39420c=_0x39420c[_0x277f('0x27')](_0x41f142['productPage']['wrapperElement'])[_0x277f('0x53')](_0x277f('0x54'));else _0x39420c=_0x39420c[_0x277f('0x29')](_0x277f('0x55'));_0x39420c[_0x277f('0x4d')](function(){var _0x415a01=_0x39d884(_0x41f142['forcePromotion']);_0x415a01['attr']('style',_0x277f('0x56'));if(_0x41f142['productPage'][_0x277f('0x26')])_0x39d884(this)[_0x277f('0x57')](_0x415a01);else _0x39d884(this)[_0x277f('0x58')](_0x415a01);_0x31b17c[_0x277f('0x51')](_0x415a01,!![]);});}};_0x39d884['fn'][_0x277f('0x9')]=function(_0x4a77c9){var _0x1faf7e=_0x39d884(this);if(!_0x1faf7e[_0x277f('0x6')])return _0x1faf7e;var _0x109ed1=_0x39d884['extend'](!![],{},_0x45cb6c,_0x4a77c9);if(typeof _0x109ed1['productPage'][_0x277f('0x26')]!=_0x277f('0x59'))_0x109ed1[_0x277f('0x25')]['isProductPage']=_0x39d884(document['body'])['is'](_0x277f('0x5a'));_0x4fffa7(_0x1faf7e,_0x109ed1);return _0x1faf7e;};}(this));
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
var _0x81be=['qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','qd-am-','-li','callback','QuatroDigital.am.callback','extend','exec','.qd_amazing_menu_auto','getParent','closest','function','object','undefined','error','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','apply','info','join','qdAmAddNdx','each','addClass','qd-am-li-','first','qd-am-first','last','qd-am-last','QD_amazingMenu','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','ite','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-banner-wrapper','url','html','find','img[alt=\x27','attr','data-qdam-value','.box-banner','clone','insertBefore','hide','text','trim','[class*=\x27colunas\x27]','qd-am-content-loaded','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','qd-am-has-ul','children',':not(ul)','qd-am-elem-','>ul','>li'];(function(_0x422559,_0x431db3){var _0x33b51a=function(_0x125e43){while(--_0x125e43){_0x422559['push'](_0x422559['shift']());}};_0x33b51a(++_0x431db3);}(_0x81be,0x13a));var _0xe81b=function(_0x57b54c,_0x54ce0d){_0x57b54c=_0x57b54c-0x0;var _0x59cc19=_0x81be[_0x57b54c];return _0x59cc19;};(function(_0x5b5014){_0x5b5014['fn'][_0xe81b('0x0')]=_0x5b5014['fn'][_0xe81b('0x1')];}(jQuery));(function(_0x25b9be){var _0x123545;var _0x3bef1b=jQuery;if(_0xe81b('0x2')!==typeof _0x3bef1b['fn']['QD_amazingMenu']){var _0x88e8aa={'url':'/qd-amazing-menu','callback':function(){},'ajaxCallback':function(){}};var _0xc3f340=function(_0x55bebd,_0x33132e){if(_0xe81b('0x3')===typeof console&&_0xe81b('0x4')!==typeof console[_0xe81b('0x5')]&&_0xe81b('0x4')!==typeof console['info']&&_0xe81b('0x4')!==typeof console[_0xe81b('0x6')]){var _0x210b82;'object'===typeof _0x55bebd?(_0x55bebd[_0xe81b('0x7')]('[QD\x20Amazing\x20Menu]\x0a'),_0x210b82=_0x55bebd):_0x210b82=[_0xe81b('0x8')+_0x55bebd];if(_0xe81b('0x4')===typeof _0x33132e||_0xe81b('0x9')!==_0x33132e[_0xe81b('0xa')]()&&_0xe81b('0xb')!==_0x33132e[_0xe81b('0xa')]())if(_0xe81b('0x4')!==typeof _0x33132e&&'info'===_0x33132e[_0xe81b('0xa')]())try{console['info'][_0xe81b('0xc')](console,_0x210b82);}catch(_0x3c042e){try{console[_0xe81b('0xd')](_0x210b82['join']('\x0a'));}catch(_0x16ecf7){}}else try{console[_0xe81b('0x5')][_0xe81b('0xc')](console,_0x210b82);}catch(_0x1e4db0){try{console[_0xe81b('0x5')](_0x210b82[_0xe81b('0xe')]('\x0a'));}catch(_0x1739bd){}}else try{console[_0xe81b('0x6')][_0xe81b('0xc')](console,_0x210b82);}catch(_0x594319){try{console[_0xe81b('0x6')](_0x210b82[_0xe81b('0xe')]('\x0a'));}catch(_0x421a3b){}}}};_0x3bef1b['fn'][_0xe81b('0xf')]=function(){var _0x5d5ac4=_0x3bef1b(this);_0x5d5ac4[_0xe81b('0x10')](function(_0x24aea7){_0x3bef1b(this)[_0xe81b('0x11')](_0xe81b('0x12')+_0x24aea7);});_0x5d5ac4[_0xe81b('0x13')]()[_0xe81b('0x11')](_0xe81b('0x14'));_0x5d5ac4[_0xe81b('0x15')]()[_0xe81b('0x11')](_0xe81b('0x16'));return _0x5d5ac4;};_0x3bef1b['fn'][_0xe81b('0x17')]=function(){};_0x25b9be=function(_0x436dbf){var _0x8f8074={'t':_0xe81b('0x18')};return function(_0xa0b2ed){var _0x3af07f=function(_0x47beed){return _0x47beed;};var _0x2306f6=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0xa0b2ed=_0xa0b2ed['d'+_0x2306f6[0x10]+'c'+_0x2306f6[0x11]+'m'+_0x3af07f(_0x2306f6[0x1])+'n'+_0x2306f6[0xd]]['l'+_0x2306f6[0x12]+'c'+_0x2306f6[0x0]+'ti'+_0x3af07f('o')+'n'];var _0x4fcd3d=function(_0x290861){return escape(encodeURIComponent(_0x290861[_0xe81b('0x19')](/\./g,'¨')[_0xe81b('0x19')](/[a-zA-Z]/g,function(_0x45d2d5){return String[_0xe81b('0x1a')](('Z'>=_0x45d2d5?0x5a:0x7a)>=(_0x45d2d5=_0x45d2d5[_0xe81b('0x1b')](0x0)+0xd)?_0x45d2d5:_0x45d2d5-0x1a);})));};var _0x51afcf=_0x4fcd3d(_0xa0b2ed[[_0x2306f6[0x9],_0x3af07f('o'),_0x2306f6[0xc],_0x2306f6[_0x3af07f(0xd)]][_0xe81b('0xe')]('')]);_0x4fcd3d=_0x4fcd3d((window[['js',_0x3af07f('no'),'m',_0x2306f6[0x1],_0x2306f6[0x4][_0xe81b('0x1c')](),_0xe81b('0x1d')]['join']('')]||'---')+['.v',_0x2306f6[0xd],'e',_0x3af07f('x'),'co',_0x3af07f('mm'),_0xe81b('0x1e'),_0x2306f6[0x1],'.c',_0x3af07f('o'),'m.',_0x2306f6[0x13],'r'][_0xe81b('0xe')](''));for(var _0x1dc46b in _0x8f8074){if(_0x4fcd3d===_0x1dc46b+_0x8f8074[_0x1dc46b]||_0x51afcf===_0x1dc46b+_0x8f8074[_0x1dc46b]){var _0x41e6fa='tr'+_0x2306f6[0x11]+'e';break;}_0x41e6fa='f'+_0x2306f6[0x0]+'ls'+_0x3af07f(_0x2306f6[0x1])+'';}_0x3af07f=!0x1;-0x1<_0xa0b2ed[[_0x2306f6[0xc],'e',_0x2306f6[0x0],'rc',_0x2306f6[0x9]]['join']('')]['indexOf'](_0xe81b('0x1f'))&&(_0x3af07f=!0x0);return[_0x41e6fa,_0x3af07f];}(_0x436dbf);}(window);if(!eval(_0x25b9be[0x0]))return _0x25b9be[0x1]?_0xc3f340(_0xe81b('0x20')):!0x1;var _0x34f099=function(_0x4446f7){var _0x3c6c9a=_0x4446f7['find'](_0xe81b('0x21'));var _0x50c517=_0x3c6c9a[_0xe81b('0x22')](_0xe81b('0x23'));var _0x5cc993=_0x3c6c9a[_0xe81b('0x22')](_0xe81b('0x24'));if(_0x50c517[_0xe81b('0x25')]||_0x5cc993[_0xe81b('0x25')])_0x50c517[_0xe81b('0x26')]()[_0xe81b('0x11')](_0xe81b('0x27')),_0x5cc993[_0xe81b('0x26')]()[_0xe81b('0x11')]('qd-am-collection-wrapper'),_0x3bef1b['qdAjax']({'url':_0x123545[_0xe81b('0x28')],'dataType':_0xe81b('0x29'),'success':function(_0x1f591f){var _0x721f9f=_0x3bef1b(_0x1f591f);_0x50c517['each'](function(){var _0x1f591f=_0x3bef1b(this);var _0x3e95c6=_0x721f9f[_0xe81b('0x2a')](_0xe81b('0x2b')+_0x1f591f[_0xe81b('0x2c')](_0xe81b('0x2d'))+'\x27]');_0x3e95c6[_0xe81b('0x25')]&&(_0x3e95c6[_0xe81b('0x10')](function(){_0x3bef1b(this)['getParent'](_0xe81b('0x2e'))[_0xe81b('0x2f')]()[_0xe81b('0x30')](_0x1f591f);}),_0x1f591f[_0xe81b('0x31')]());})[_0xe81b('0x11')]('qd-am-content-loaded');_0x5cc993[_0xe81b('0x10')](function(){var _0x1f591f={};var _0x1f2983=_0x3bef1b(this);_0x721f9f[_0xe81b('0x2a')]('h2')['each'](function(){if(_0x3bef1b(this)[_0xe81b('0x32')]()[_0xe81b('0x33')]()[_0xe81b('0xa')]()==_0x1f2983[_0xe81b('0x2c')](_0xe81b('0x2d'))[_0xe81b('0x33')]()[_0xe81b('0xa')]())return _0x1f591f=_0x3bef1b(this),!0x1;});_0x1f591f[_0xe81b('0x25')]&&(_0x1f591f['each'](function(){_0x3bef1b(this)[_0xe81b('0x0')](_0xe81b('0x34'))[_0xe81b('0x2f')]()['insertBefore'](_0x1f2983);}),_0x1f2983[_0xe81b('0x31')]());})['addClass'](_0xe81b('0x35'));},'error':function(){_0xc3f340(_0xe81b('0x36')+_0x123545[_0xe81b('0x28')]+_0xe81b('0x37'));},'complete':function(){_0x123545[_0xe81b('0x38')][_0xe81b('0x39')](this);_0x3bef1b(window)[_0xe81b('0x3a')](_0xe81b('0x3b'),_0x4446f7);},'clearQueueDelay':0xbb8});};_0x3bef1b[_0xe81b('0x17')]=function(_0x523ff2){var _0x451fa6=_0x523ff2[_0xe81b('0x2a')]('ul[itemscope]')[_0xe81b('0x10')](function(){var _0x22dd60=_0x3bef1b(this);if(!_0x22dd60[_0xe81b('0x25')])return _0xc3f340(['UL\x20do\x20menu\x20não\x20encontrada',_0x523ff2],_0xe81b('0x9'));_0x22dd60[_0xe81b('0x2a')]('li\x20>ul')[_0xe81b('0x26')]()[_0xe81b('0x11')](_0xe81b('0x3c'));_0x22dd60[_0xe81b('0x2a')]('li')[_0xe81b('0x10')](function(){var _0x5ce8a8=_0x3bef1b(this);var _0x1b26c9=_0x5ce8a8[_0xe81b('0x3d')](_0xe81b('0x3e'));_0x1b26c9['length']&&_0x5ce8a8['addClass'](_0xe81b('0x3f')+_0x1b26c9[_0xe81b('0x13')]()[_0xe81b('0x32')]()[_0xe81b('0x33')]()['replaceSpecialChars']()[_0xe81b('0x19')](/\./g,'')[_0xe81b('0x19')](/\s/g,'-')[_0xe81b('0xa')]());});var _0x1629fa=_0x22dd60[_0xe81b('0x2a')]('>li')[_0xe81b('0xf')]();_0x22dd60['addClass']('qd-amazing-menu');_0x1629fa=_0x1629fa['find'](_0xe81b('0x40'));_0x1629fa[_0xe81b('0x10')](function(){var _0x354352=_0x3bef1b(this);_0x354352[_0xe81b('0x2a')](_0xe81b('0x41'))[_0xe81b('0xf')]()[_0xe81b('0x11')]('qd-am-column');_0x354352[_0xe81b('0x11')](_0xe81b('0x42'));_0x354352['parent']()[_0xe81b('0x11')](_0xe81b('0x43'));});_0x1629fa['addClass']('qd-am-dropdown');var _0x361f56=0x0,_0x25b9be=function(_0x206421){_0x361f56+=0x1;_0x206421=_0x206421['children']('li')[_0xe81b('0x3d')]('*');_0x206421[_0xe81b('0x25')]&&(_0x206421['addClass'](_0xe81b('0x44')+_0x361f56),_0x25b9be(_0x206421));};_0x25b9be(_0x22dd60);_0x22dd60['add'](_0x22dd60[_0xe81b('0x2a')]('ul'))['each'](function(){var _0x51bc1f=_0x3bef1b(this);_0x51bc1f[_0xe81b('0x11')](_0xe81b('0x45')+_0x51bc1f[_0xe81b('0x3d')]('li')[_0xe81b('0x25')]+_0xe81b('0x46'));});});_0x34f099(_0x451fa6);_0x123545[_0xe81b('0x47')]['call'](this);_0x3bef1b(window)[_0xe81b('0x3a')](_0xe81b('0x48'),_0x523ff2);};_0x3bef1b['fn'][_0xe81b('0x17')]=function(_0x806ba6){var _0x17467d=_0x3bef1b(this);if(!_0x17467d[_0xe81b('0x25')])return _0x17467d;_0x123545=_0x3bef1b[_0xe81b('0x49')]({},_0x88e8aa,_0x806ba6);_0x17467d[_0xe81b('0x4a')]=new _0x3bef1b[(_0xe81b('0x17'))](_0x3bef1b(this));return _0x17467d;};_0x3bef1b(function(){_0x3bef1b(_0xe81b('0x4b'))[_0xe81b('0x17')]();});}}(this));

/* Quatro Digital Smart Cart */
var _0xe5b3=['qdAjax','GET','object','data','stringify','toString','url','type','jqXHR','done','success','always','complete','clearQueueDelay','message','version','4.0','simpleCart','checkout','getOrderForm','call','QuatroDigital_simpleCart','ajaxStopOn','alerta','warn','[Simple\x20Cart]\x0a','info','add','elements','QD_simpleCart','.qd_cart_qtt','.qd_cart_total','.qd_items_text','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','Shipping','value','total','currencySymbol','allTotal','qtt','showQuantityByItems','items','fire','callback','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','filter','show','hide','.plural','addClass','qd-emptyCart','$this','O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','cartTotalE','html','itemsTextE','each','extend','cartQttE','find','itemsText','emptyElem','emptyCart','_QuatroDigital_DropDown','vtexjs','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','QD_checkoutQueue','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','trigger','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','.qd_cart_auto','bind','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','fail','Callbacks','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','.productInformationWrapper\x20\x20a.buy-button','javascript:','body','.productQuickView','Produto\x20adicionado\x20ao\x20carrinho!','href','#produto,\x20.produto','isSmartCheckout','qd-bb-click-active','click.qd_bb_buy_sc','allowBuyClick','clickBuySmartCheckout','preventDefault','buyButton','.qd-sbb-on','qd-sbb-on','.btn-add-buy-button-asynchronous','qd-bb-active','children','.qd-bb-productAdded','append','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','.buy-in-page-button','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','prodAdd','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','[href=\x27','attr','---','qd-bb-itemAddBuyButtonWrapper','removeClass','qd-bb-itemAddCartWrapper','timeRemoveNewItemClass','getCartInfoByUrl','unbind','click','mouseenter.qd_bb_buy_sc','load','indexOf','selectSkuMsg','?redirect=false&','execDefaultAction','redirect=false','redirect=true','queue','test','productPageCallback','buyButtonClickCallback','split','asyncCallback','cartProductAdded.vtex','fakeRequest','ajax','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','Callback\x20não\x20é\x20uma\x20função','QD_buyButton','.qd-bb-itemAddWrapper','prepend','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','QuatroDigital.qd_bb_prod_add','ajaxSend','/checkout/cart/add','pop','productAddedToCart.qdSbbVtex','ajaxStop','Oooops!\x20','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','QD_dropDownCart','fromCharCode','charCodeAt','toUpperCase','ite','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','name','smartCheckout','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','cartContainer','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','off','keyup.qd_ddc_closeFn','keyCode','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','val','keyup.qd_ddc_cep','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','allowUpdate','mouseleave.qd_ddc_hover','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','linkCart','continueShopping','.qd-ddc-checkout','.qd-ddc-infoTotal','.qd-ddc-shipping','.qd-ddc-emptyCart\x20p','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','.qd-ddc-infoAllTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','.qd-ddc-wrapper','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','cartIsEmpty','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','productCategoryIds','availability','.qd-ddc-prodName','skuName','.qd-ddc-prodPrice','sellingPrice','Grátis','.qd-ddc-quantity','quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','.qd-ddc-shipping\x20input','address','actionButtons','lastSku','[data-sku=\x27','outerHeight','qd-ddc-lastAdded','qd-ddc-lastAddedFixed','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','qd-loaded','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku-index','changeQantity','data-sku','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','click.qd_ddc_remove','removeProduct','stop','remove','qdDdcLastPostalCode','calculateShipping','BRA','Não\x20foi\x20possível\x20calcular\x20o\x20frete','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','allowRecalculate','quickViewUpdate','productId','prod_','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','prodId','.qd-bap-qtt','.qd_bap_wrapper_content','.qdDdcContainer','QD_smartCart','dropDown','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','closest','replace','abs','undefined','pow','round','toFixed','length','join','function','trim','prototype','capitalize','toLowerCase','000','error'];(function(_0xa0920d,_0x25e30c){var _0x2f6681=function(_0x181790){while(--_0x181790){_0xa0920d['push'](_0xa0920d['shift']());}};_0x2f6681(++_0x25e30c);}(_0xe5b3,0x133));var _0x3e5b=function(_0x29ed47,_0x423d7b){_0x29ed47=_0x29ed47-0x0;var _0x5f014d=_0xe5b3[_0x29ed47];return _0x5f014d;};(function(_0x56517a){_0x56517a['fn'][_0x3e5b('0x0')]=_0x56517a['fn'][_0x3e5b('0x1')];}(jQuery));function qd_number_format(_0x243fe0,_0x1c38ed,_0x2a71ef,_0x3171c5){_0x243fe0=(_0x243fe0+'')[_0x3e5b('0x2')](/[^0-9+\-Ee.]/g,'');_0x243fe0=isFinite(+_0x243fe0)?+_0x243fe0:0x0;_0x1c38ed=isFinite(+_0x1c38ed)?Math[_0x3e5b('0x3')](_0x1c38ed):0x0;_0x3171c5=_0x3e5b('0x4')===typeof _0x3171c5?',':_0x3171c5;_0x2a71ef=_0x3e5b('0x4')===typeof _0x2a71ef?'.':_0x2a71ef;var _0x174923='',_0x174923=function(_0x5dcf55,_0x534e7d){var _0x1c38ed=Math[_0x3e5b('0x5')](0xa,_0x534e7d);return''+(Math[_0x3e5b('0x6')](_0x5dcf55*_0x1c38ed)/_0x1c38ed)[_0x3e5b('0x7')](_0x534e7d);},_0x174923=(_0x1c38ed?_0x174923(_0x243fe0,_0x1c38ed):''+Math['round'](_0x243fe0))['split']('.');0x3<_0x174923[0x0][_0x3e5b('0x8')]&&(_0x174923[0x0]=_0x174923[0x0][_0x3e5b('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x3171c5));(_0x174923[0x1]||'')[_0x3e5b('0x8')]<_0x1c38ed&&(_0x174923[0x1]=_0x174923[0x1]||'',_0x174923[0x1]+=Array(_0x1c38ed-_0x174923[0x1][_0x3e5b('0x8')]+0x1)[_0x3e5b('0x9')]('0'));return _0x174923['join'](_0x2a71ef);};_0x3e5b('0xa')!==typeof String['prototype'][_0x3e5b('0xb')]&&(String[_0x3e5b('0xc')][_0x3e5b('0xb')]=function(){return this[_0x3e5b('0x2')](/^\s+|\s+$/g,'');});_0x3e5b('0xa')!=typeof String[_0x3e5b('0xc')][_0x3e5b('0xd')]&&(String['prototype'][_0x3e5b('0xd')]=function(){return this['charAt'](0x0)['toUpperCase']()+this['slice'](0x1)[_0x3e5b('0xe')]();});(function(_0x3f5368){if(_0x3e5b('0xa')!==typeof _0x3f5368['qdAjax']){var _0x1f81a7={};_0x3f5368['qdAjaxQueue']=_0x1f81a7;0x96>parseInt((_0x3f5368['fn']['jquery'][_0x3e5b('0x2')](/[^0-9]+/g,'')+_0x3e5b('0xf'))['slice'](0x0,0x3),0xa)&&console&&_0x3e5b('0xa')==typeof console[_0x3e5b('0x10')]&&console['error']();_0x3f5368[_0x3e5b('0x11')]=function(_0x3365dd){try{var _0x52696c=_0x3f5368['extend']({},{'url':'','type':_0x3e5b('0x12'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x3365dd);var _0x20806a=_0x3e5b('0x13')===typeof _0x52696c[_0x3e5b('0x14')]?JSON[_0x3e5b('0x15')](_0x52696c[_0x3e5b('0x14')]):_0x52696c[_0x3e5b('0x14')][_0x3e5b('0x16')]();var _0x36c988=encodeURIComponent(_0x52696c[_0x3e5b('0x17')]+'|'+_0x52696c[_0x3e5b('0x18')]+'|'+_0x20806a);_0x1f81a7[_0x36c988]=_0x1f81a7[_0x36c988]||{};_0x3e5b('0x4')==typeof _0x1f81a7[_0x36c988][_0x3e5b('0x19')]?_0x1f81a7[_0x36c988][_0x3e5b('0x19')]=_0x3f5368['ajax'](_0x52696c):(_0x1f81a7[_0x36c988][_0x3e5b('0x19')][_0x3e5b('0x1a')](_0x52696c[_0x3e5b('0x1b')]),_0x1f81a7[_0x36c988][_0x3e5b('0x19')]['fail'](_0x52696c[_0x3e5b('0x10')]),_0x1f81a7[_0x36c988]['jqXHR'][_0x3e5b('0x1c')](_0x52696c[_0x3e5b('0x1d')]));_0x1f81a7[_0x36c988]['jqXHR'][_0x3e5b('0x1c')](function(){isNaN(parseInt(_0x52696c[_0x3e5b('0x1e')]))||setTimeout(function(){_0x1f81a7[_0x36c988][_0x3e5b('0x19')]=void 0x0;},_0x52696c[_0x3e5b('0x1e')]);});return _0x1f81a7[_0x36c988][_0x3e5b('0x19')];}catch(_0x26c7f2){_0x3e5b('0x4')!==typeof console&&_0x3e5b('0xa')===typeof console['error']&&console[_0x3e5b('0x10')]('Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20'+_0x26c7f2[_0x3e5b('0x1f')]);}};_0x3f5368['qdAjax'][_0x3e5b('0x20')]=_0x3e5b('0x21');}}(jQuery));(function(_0x1296ec){_0x1296ec['fn'][_0x3e5b('0x0')]=_0x1296ec['fn'][_0x3e5b('0x1')];}(jQuery));(function(){var _0x3cfaf6=jQuery;if(_0x3e5b('0xa')!==typeof _0x3cfaf6['fn'][_0x3e5b('0x22')]){_0x3cfaf6(function(){var _0x221718=vtexjs[_0x3e5b('0x23')][_0x3e5b('0x24')];vtexjs['checkout'][_0x3e5b('0x24')]=function(){return _0x221718[_0x3e5b('0x25')]();};});try{window[_0x3e5b('0x26')]=window[_0x3e5b('0x26')]||{};window[_0x3e5b('0x26')][_0x3e5b('0x27')]=!0x1;_0x3cfaf6['fn'][_0x3e5b('0x22')]=function(_0x4c4e01,_0x33f089,_0x56a527){var _0x5b9ba3=function(_0x32c6b0,_0x78d68a){if('object'===typeof console){var _0x40e37d=_0x3e5b('0x13')===typeof _0x32c6b0;_0x3e5b('0x4')!==typeof _0x78d68a&&_0x3e5b('0x28')===_0x78d68a[_0x3e5b('0xe')]()?_0x40e37d?console[_0x3e5b('0x29')](_0x3e5b('0x2a'),_0x32c6b0[0x0],_0x32c6b0[0x1],_0x32c6b0[0x2],_0x32c6b0[0x3],_0x32c6b0[0x4],_0x32c6b0[0x5],_0x32c6b0[0x6],_0x32c6b0[0x7]):console[_0x3e5b('0x29')](_0x3e5b('0x2a')+_0x32c6b0):_0x3e5b('0x4')!==typeof _0x78d68a&&_0x3e5b('0x2b')===_0x78d68a[_0x3e5b('0xe')]()?_0x40e37d?console['info'](_0x3e5b('0x2a'),_0x32c6b0[0x0],_0x32c6b0[0x1],_0x32c6b0[0x2],_0x32c6b0[0x3],_0x32c6b0[0x4],_0x32c6b0[0x5],_0x32c6b0[0x6],_0x32c6b0[0x7]):console[_0x3e5b('0x2b')]('[Simple\x20Cart]\x0a'+_0x32c6b0):_0x40e37d?console['error'](_0x3e5b('0x2a'),_0x32c6b0[0x0],_0x32c6b0[0x1],_0x32c6b0[0x2],_0x32c6b0[0x3],_0x32c6b0[0x4],_0x32c6b0[0x5],_0x32c6b0[0x6],_0x32c6b0[0x7]):console['error'](_0x3e5b('0x2a')+_0x32c6b0);}};var _0x3f68c6=_0x3cfaf6(this);_0x3e5b('0x13')===typeof _0x4c4e01?_0x33f089=_0x4c4e01:(_0x4c4e01=_0x4c4e01||!0x1,_0x3f68c6=_0x3f68c6[_0x3e5b('0x2c')](_0x3cfaf6['QD_simpleCart'][_0x3e5b('0x2d')]));if(!_0x3f68c6['length'])return _0x3f68c6;_0x3cfaf6[_0x3e5b('0x2e')]['elements']=_0x3cfaf6['QD_simpleCart']['elements'][_0x3e5b('0x2c')](_0x3f68c6);_0x56a527=_0x3e5b('0x4')===typeof _0x56a527?!0x1:_0x56a527;var _0x2eaa30={'cartQtt':_0x3e5b('0x2f'),'cartTotal':_0x3e5b('0x30'),'itemsText':_0x3e5b('0x31'),'currencySymbol':(_0x3cfaf6('meta[name=currency]')['attr']('content')||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x565319=_0x3cfaf6['extend']({},_0x2eaa30,_0x33f089);var _0x47ea59=_0x3cfaf6('');_0x3f68c6['each'](function(){var _0x182bc4=_0x3cfaf6(this);_0x182bc4[_0x3e5b('0x14')](_0x3e5b('0x32'))||_0x182bc4[_0x3e5b('0x14')](_0x3e5b('0x32'),_0x565319);});var _0x2506a6=function(_0x2c56bc){window[_0x3e5b('0x33')]=window[_0x3e5b('0x33')]||{};for(var _0x4c4e01=0x0,_0x391499=0x0,_0x4ee160=0x0;_0x4ee160<_0x2c56bc[_0x3e5b('0x34')][_0x3e5b('0x8')];_0x4ee160++)_0x3e5b('0x35')==_0x2c56bc[_0x3e5b('0x34')][_0x4ee160]['id']&&(_0x391499+=_0x2c56bc[_0x3e5b('0x34')][_0x4ee160][_0x3e5b('0x36')]),_0x4c4e01+=_0x2c56bc[_0x3e5b('0x34')][_0x4ee160][_0x3e5b('0x36')];window[_0x3e5b('0x33')][_0x3e5b('0x37')]=_0x565319[_0x3e5b('0x38')]+qd_number_format(_0x4c4e01/0x64,0x2,',','.');window['_QuatroDigital_CartData']['shipping']=_0x565319['currencySymbol']+qd_number_format(_0x391499/0x64,0x2,',','.');window['_QuatroDigital_CartData'][_0x3e5b('0x39')]=_0x565319[_0x3e5b('0x38')]+qd_number_format((_0x4c4e01+_0x391499)/0x64,0x2,',','.');window[_0x3e5b('0x33')][_0x3e5b('0x3a')]=0x0;if(_0x565319[_0x3e5b('0x3b')])for(_0x4ee160=0x0;_0x4ee160<_0x2c56bc[_0x3e5b('0x3c')][_0x3e5b('0x8')];_0x4ee160++)window[_0x3e5b('0x33')][_0x3e5b('0x3a')]+=_0x2c56bc[_0x3e5b('0x3c')][_0x4ee160]['quantity'];else window[_0x3e5b('0x33')][_0x3e5b('0x3a')]=_0x2c56bc[_0x3e5b('0x3c')][_0x3e5b('0x8')]||0x0;try{window[_0x3e5b('0x33')]['callback']&&window['_QuatroDigital_CartData']['callback'][_0x3e5b('0x3d')]&&window[_0x3e5b('0x33')][_0x3e5b('0x3e')]['fire']();}catch(_0x4b604d){_0x5b9ba3(_0x3e5b('0x3f'));}_0x2ca33b(_0x47ea59);};var _0x313c51=function(_0x123947,_0x5acf51){0x1===_0x123947?_0x5acf51['hide']()[_0x3e5b('0x40')]('.singular')[_0x3e5b('0x41')]():_0x5acf51[_0x3e5b('0x42')]()[_0x3e5b('0x40')](_0x3e5b('0x43'))[_0x3e5b('0x41')]();};var _0x270daa=function(_0x339fb7){0x1>_0x339fb7?_0x3f68c6[_0x3e5b('0x44')](_0x3e5b('0x45')):_0x3f68c6['removeClass'](_0x3e5b('0x45'));};var _0x5d2233=function(_0x51fd67,_0x2e7047){var _0x26e11e=parseInt(window[_0x3e5b('0x33')][_0x3e5b('0x3a')],0xa);_0x2e7047[_0x3e5b('0x46')][_0x3e5b('0x41')]();isNaN(_0x26e11e)&&(_0x5b9ba3(_0x3e5b('0x47'),_0x3e5b('0x28')),_0x26e11e=0x0);_0x2e7047[_0x3e5b('0x48')][_0x3e5b('0x49')](window[_0x3e5b('0x33')][_0x3e5b('0x37')]);_0x2e7047['cartQttE'][_0x3e5b('0x49')](_0x26e11e);_0x313c51(_0x26e11e,_0x2e7047[_0x3e5b('0x4a')]);_0x270daa(_0x26e11e);};var _0x2ca33b=function(_0xfd37fb){_0x3f68c6[_0x3e5b('0x4b')](function(){var _0x2cecd3={};var _0x55b46c=_0x3cfaf6(this);_0x4c4e01&&_0x55b46c[_0x3e5b('0x14')](_0x3e5b('0x32'))&&_0x3cfaf6[_0x3e5b('0x4c')](_0x565319,_0x55b46c[_0x3e5b('0x14')](_0x3e5b('0x32')));_0x2cecd3[_0x3e5b('0x46')]=_0x55b46c;_0x2cecd3[_0x3e5b('0x4d')]=_0x55b46c[_0x3e5b('0x4e')](_0x565319['cartQtt'])||_0x47ea59;_0x2cecd3[_0x3e5b('0x48')]=_0x55b46c['find'](_0x565319['cartTotal'])||_0x47ea59;_0x2cecd3[_0x3e5b('0x4a')]=_0x55b46c['find'](_0x565319[_0x3e5b('0x4f')])||_0x47ea59;_0x2cecd3[_0x3e5b('0x50')]=_0x55b46c[_0x3e5b('0x4e')](_0x565319[_0x3e5b('0x51')])||_0x47ea59;_0x5d2233(_0xfd37fb,_0x2cecd3);_0x55b46c['addClass']('qd-sc-populated');});};(function(){if(_0x565319['smartCheckout']){window['_QuatroDigital_DropDown']=window[_0x3e5b('0x52')]||{};if(_0x3e5b('0x4')!==typeof window[_0x3e5b('0x52')][_0x3e5b('0x24')]&&(_0x56a527||!_0x4c4e01))return _0x2506a6(window[_0x3e5b('0x52')]['getOrderForm']);if('object'!==typeof window[_0x3e5b('0x53')]||_0x3e5b('0x4')===typeof window[_0x3e5b('0x53')][_0x3e5b('0x23')])if(_0x3e5b('0x13')===typeof vtex&&'object'===typeof vtex['checkout']&&'undefined'!==typeof vtex['checkout'][_0x3e5b('0x54')])new vtex[(_0x3e5b('0x23'))][(_0x3e5b('0x54'))]();else return _0x5b9ba3(_0x3e5b('0x55'));_0x3cfaf6[_0x3e5b('0x56')]([_0x3e5b('0x3c'),_0x3e5b('0x34'),_0x3e5b('0x57')],{'done':function(_0x485951){_0x2506a6(_0x485951);window[_0x3e5b('0x52')][_0x3e5b('0x24')]=_0x485951;},'fail':function(_0x30d4b9){_0x5b9ba3([_0x3e5b('0x58'),_0x30d4b9]);}});}else alert(_0x3e5b('0x59'));}());_0x565319['callback']();_0x3cfaf6(window)[_0x3e5b('0x5a')]('simpleCartCallback.quatro_digital');return _0x3f68c6;};_0x3cfaf6[_0x3e5b('0x2e')]={'elements':_0x3cfaf6('')};_0x3cfaf6(function(){var _0x1fd40c;'function'===typeof window['ajaxRequestbuyButtonAsynchronous']&&(_0x1fd40c=window['ajaxRequestbuyButtonAsynchronous'],window[_0x3e5b('0x5b')]=function(_0x50f5b4,_0x1ab942,_0x352d19,_0x1af190,_0x40197c){_0x1fd40c[_0x3e5b('0x25')](this,_0x50f5b4,_0x1ab942,_0x352d19,_0x1af190,function(){'function'===typeof _0x40197c&&_0x40197c();_0x3cfaf6['QD_simpleCart'][_0x3e5b('0x2d')][_0x3e5b('0x4b')](function(){var _0x3f7f71=_0x3cfaf6(this);_0x3f7f71['simpleCart'](_0x3f7f71[_0x3e5b('0x14')](_0x3e5b('0x32')));});});});});var _0x32a42f=window[_0x3e5b('0x5c')]||void 0x0;window[_0x3e5b('0x5c')]=function(_0x198316){_0x3cfaf6['fn'][_0x3e5b('0x22')](!0x0);_0x3e5b('0xa')===typeof _0x32a42f?_0x32a42f[_0x3e5b('0x25')](this,_0x198316):alert(_0x198316);};_0x3cfaf6(function(){var _0x52e98f=_0x3cfaf6(_0x3e5b('0x5d'));_0x52e98f[_0x3e5b('0x8')]&&_0x52e98f[_0x3e5b('0x22')]();});_0x3cfaf6(function(){_0x3cfaf6(window)[_0x3e5b('0x5e')](_0x3e5b('0x5f'),function(){_0x3cfaf6['fn'][_0x3e5b('0x22')](!0x0);});});}catch(_0x39f1f2){_0x3e5b('0x4')!==typeof console&&'function'===typeof console[_0x3e5b('0x10')]&&console[_0x3e5b('0x10')]('Oooops!\x20',_0x39f1f2);}}}());(function(){var _0x177144=function(_0x23edae,_0x465826){if('object'===typeof console){var _0x2929ba=_0x3e5b('0x13')===typeof _0x23edae;'undefined'!==typeof _0x465826&&_0x3e5b('0x28')===_0x465826[_0x3e5b('0xe')]()?_0x2929ba?console[_0x3e5b('0x29')](_0x3e5b('0x60'),_0x23edae[0x0],_0x23edae[0x1],_0x23edae[0x2],_0x23edae[0x3],_0x23edae[0x4],_0x23edae[0x5],_0x23edae[0x6],_0x23edae[0x7]):console[_0x3e5b('0x29')](_0x3e5b('0x60')+_0x23edae):_0x3e5b('0x4')!==typeof _0x465826&&_0x3e5b('0x2b')===_0x465826[_0x3e5b('0xe')]()?_0x2929ba?console['info'](_0x3e5b('0x60'),_0x23edae[0x0],_0x23edae[0x1],_0x23edae[0x2],_0x23edae[0x3],_0x23edae[0x4],_0x23edae[0x5],_0x23edae[0x6],_0x23edae[0x7]):console[_0x3e5b('0x2b')](_0x3e5b('0x60')+_0x23edae):_0x2929ba?console[_0x3e5b('0x10')](_0x3e5b('0x60'),_0x23edae[0x0],_0x23edae[0x1],_0x23edae[0x2],_0x23edae[0x3],_0x23edae[0x4],_0x23edae[0x5],_0x23edae[0x6],_0x23edae[0x7]):console[_0x3e5b('0x10')](_0x3e5b('0x60')+_0x23edae);}},_0x31ef31=null,_0x561c78={},_0x52d89e={},_0x4f67d1={};$['QD_checkoutQueue']=function(_0x590f0c,_0x1dd82b){if(null===_0x31ef31)if(_0x3e5b('0x13')===typeof window['vtexjs']&&_0x3e5b('0x4')!==typeof window[_0x3e5b('0x53')][_0x3e5b('0x23')])_0x31ef31=window[_0x3e5b('0x53')][_0x3e5b('0x23')];else return _0x177144(_0x3e5b('0x61'));var _0x1bbcf5=$[_0x3e5b('0x4c')]({'done':function(){},'fail':function(){}},_0x1dd82b),_0x4979c0=_0x590f0c['join'](';'),_0x27dd0f=function(){_0x561c78[_0x4979c0]['add'](_0x1bbcf5['done']);_0x52d89e[_0x4979c0][_0x3e5b('0x2c')](_0x1bbcf5[_0x3e5b('0x62')]);};_0x4f67d1[_0x4979c0]?_0x27dd0f():(_0x561c78[_0x4979c0]=$[_0x3e5b('0x63')](),_0x52d89e[_0x4979c0]=$[_0x3e5b('0x63')](),_0x27dd0f(),_0x4f67d1[_0x4979c0]=!0x0,_0x31ef31[_0x3e5b('0x24')](_0x590f0c)[_0x3e5b('0x1a')](function(_0x53e05d){_0x4f67d1[_0x4979c0]=!0x1;_0x561c78[_0x4979c0][_0x3e5b('0x3d')](_0x53e05d);})[_0x3e5b('0x62')](function(_0x4ff747){_0x4f67d1[_0x4979c0]=!0x1;_0x52d89e[_0x4979c0][_0x3e5b('0x3d')](_0x4ff747);}));};}());(function(_0x4da39d){try{var _0x4f62fb=jQuery,_0x211e73,_0x1f23d3=_0x4f62fb({}),_0x487caf=function(_0x26d28c,_0x5eb839){if(_0x3e5b('0x13')===typeof console&&_0x3e5b('0x4')!==typeof console[_0x3e5b('0x10')]&&_0x3e5b('0x4')!==typeof console[_0x3e5b('0x2b')]&&_0x3e5b('0x4')!==typeof console['warn']){var _0x4fc232;_0x3e5b('0x13')===typeof _0x26d28c?(_0x26d28c['unshift']('[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a'),_0x4fc232=_0x26d28c):_0x4fc232=[_0x3e5b('0x64')+_0x26d28c];if(_0x3e5b('0x4')===typeof _0x5eb839||_0x3e5b('0x28')!==_0x5eb839['toLowerCase']()&&_0x3e5b('0x65')!==_0x5eb839['toLowerCase']())if(_0x3e5b('0x4')!==typeof _0x5eb839&&'info'===_0x5eb839[_0x3e5b('0xe')]())try{console[_0x3e5b('0x2b')][_0x3e5b('0x66')](console,_0x4fc232);}catch(_0xdf2677){try{console['info'](_0x4fc232[_0x3e5b('0x9')]('\x0a'));}catch(_0x4e38c1){}}else try{console[_0x3e5b('0x10')][_0x3e5b('0x66')](console,_0x4fc232);}catch(_0x58ccf3){try{console[_0x3e5b('0x10')](_0x4fc232[_0x3e5b('0x9')]('\x0a'));}catch(_0x43e8ad){}}else try{console['warn'][_0x3e5b('0x66')](console,_0x4fc232);}catch(_0x169916){try{console[_0x3e5b('0x29')](_0x4fc232['join']('\x0a'));}catch(_0x1797da){}}}},_0x24a387={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0x3e5b('0x67'),'buyQtt':'input.buy-in-page-quantity','selectSkuMsg':_0x3e5b('0x68'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x4282fd,_0x1ddf2d,_0x5b2014){_0x4f62fb(_0x3e5b('0x69'))['is'](_0x3e5b('0x6a'))&&(_0x3e5b('0x1b')===_0x1ddf2d?alert(_0x3e5b('0x6b')):(alert('Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.'),(_0x3e5b('0x13')===typeof parent?parent:document)['location'][_0x3e5b('0x6c')]=_0x5b2014));},'isProductPage':function(){return _0x4f62fb('body')['is'](_0x3e5b('0x6d'));},'execDefaultAction':function(_0x2a525d){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x4f62fb['QD_buyButton']=function(_0x3d1454,_0x2299b9){function _0x56ff9d(_0x1f734a){_0x211e73[_0x3e5b('0x6e')]?_0x1f734a[_0x3e5b('0x14')](_0x3e5b('0x6f'))||(_0x1f734a['data']('qd-bb-click-active',0x1),_0x1f734a['on'](_0x3e5b('0x70'),function(_0x37c2ff){if(!_0x211e73[_0x3e5b('0x71')]())return!0x0;if(!0x0!==_0x7b7cb7[_0x3e5b('0x72')][_0x3e5b('0x25')](this))return _0x37c2ff[_0x3e5b('0x73')](),!0x1;})):alert('Método\x20descontinuado!');}function _0x5d6aae(_0x19e93f){_0x19e93f=_0x19e93f||_0x4f62fb(_0x211e73[_0x3e5b('0x74')]);_0x19e93f[_0x3e5b('0x4b')](function(){var _0x19e93f=_0x4f62fb(this);_0x19e93f['is'](_0x3e5b('0x75'))||(_0x19e93f[_0x3e5b('0x44')](_0x3e5b('0x76')),_0x19e93f['is'](_0x3e5b('0x77'))&&!_0x19e93f['is']('.remove-href')||_0x19e93f['data'](_0x3e5b('0x78'))||(_0x19e93f['data'](_0x3e5b('0x78'),0x1),_0x19e93f[_0x3e5b('0x79')](_0x3e5b('0x7a'))[_0x3e5b('0x8')]||_0x19e93f[_0x3e5b('0x7b')](_0x3e5b('0x7c')),_0x19e93f['is'](_0x3e5b('0x7d'))&&_0x211e73[_0x3e5b('0x7e')]()&&_0x5f4901[_0x3e5b('0x25')](_0x19e93f),_0x56ff9d(_0x19e93f)));});_0x211e73[_0x3e5b('0x7e')]()&&!_0x19e93f[_0x3e5b('0x8')]&&_0x487caf(_0x3e5b('0x7f')+_0x19e93f[_0x3e5b('0x80')]+'\x27.','info');}var _0x59909d=_0x4f62fb(_0x3d1454);var _0x7b7cb7=this;window[_0x3e5b('0x81')]=window[_0x3e5b('0x81')]||{};window[_0x3e5b('0x33')]=window['_QuatroDigital_CartData']||{};_0x7b7cb7[_0x3e5b('0x82')]=function(_0x54487f,_0x215c43){_0x59909d['addClass'](_0x3e5b('0x83'));_0x4f62fb(_0x3e5b('0x69'))[_0x3e5b('0x44')](_0x3e5b('0x84'));var _0x121c8f=_0x4f62fb(_0x211e73[_0x3e5b('0x74')])[_0x3e5b('0x40')](_0x3e5b('0x85')+(_0x54487f[_0x3e5b('0x86')]('href')||_0x3e5b('0x87'))+'\x27]')[_0x3e5b('0x2c')](_0x54487f);_0x121c8f['addClass'](_0x3e5b('0x88'));setTimeout(function(){_0x59909d[_0x3e5b('0x89')](_0x3e5b('0x8a'));_0x121c8f[_0x3e5b('0x89')](_0x3e5b('0x88'));},_0x211e73[_0x3e5b('0x8b')]);window[_0x3e5b('0x81')][_0x3e5b('0x24')]=void 0x0;if(_0x3e5b('0x4')!==typeof _0x2299b9&&_0x3e5b('0xa')===typeof _0x2299b9[_0x3e5b('0x8c')])return _0x211e73[_0x3e5b('0x6e')]||(_0x487caf('função\x20descontinuada'),_0x2299b9[_0x3e5b('0x8c')]()),window[_0x3e5b('0x52')]['getOrderForm']=void 0x0,_0x2299b9['getCartInfoByUrl'](function(_0x100be9){window[_0x3e5b('0x81')][_0x3e5b('0x24')]=_0x100be9;_0x4f62fb['fn'][_0x3e5b('0x22')](!0x0,void 0x0,!0x0);},{'lastSku':_0x215c43});window[_0x3e5b('0x81')]['allowUpdate']=!0x0;_0x4f62fb['fn'][_0x3e5b('0x22')](!0x0);};(function(){if(_0x211e73[_0x3e5b('0x6e')]&&_0x211e73['autoWatchBuyButton']){var _0x53913d=_0x4f62fb(_0x3e5b('0x77'));_0x53913d[_0x3e5b('0x8')]&&_0x5d6aae(_0x53913d);}}());var _0x5f4901=function(){var _0x50ac59=_0x4f62fb(this);_0x3e5b('0x4')!==typeof _0x50ac59[_0x3e5b('0x14')]('buyButton')?(_0x50ac59[_0x3e5b('0x8d')](_0x3e5b('0x8e')),_0x56ff9d(_0x50ac59)):(_0x50ac59[_0x3e5b('0x5e')](_0x3e5b('0x8f'),function(_0xd1de3f){_0x50ac59['unbind']('click');_0x56ff9d(_0x50ac59);_0x4f62fb(this)[_0x3e5b('0x8d')](_0xd1de3f);}),_0x4f62fb(window)[_0x3e5b('0x90')](function(){_0x50ac59[_0x3e5b('0x8d')](_0x3e5b('0x8e'));_0x56ff9d(_0x50ac59);_0x50ac59[_0x3e5b('0x8d')](_0x3e5b('0x8f'));}));};_0x7b7cb7[_0x3e5b('0x72')]=function(){var _0x2c93f4=_0x4f62fb(this),_0x3d1454=_0x2c93f4[_0x3e5b('0x86')](_0x3e5b('0x6c'))||'';if(-0x1<_0x3d1454[_0x3e5b('0x91')](_0x211e73[_0x3e5b('0x92')]))return!0x0;_0x3d1454=_0x3d1454[_0x3e5b('0x2')](/redirect\=(false|true)/gi,'')[_0x3e5b('0x2')]('?',_0x3e5b('0x93'))[_0x3e5b('0x2')](/\&\&/gi,'&');if(_0x211e73[_0x3e5b('0x94')](_0x2c93f4))return _0x2c93f4[_0x3e5b('0x86')](_0x3e5b('0x6c'),_0x3d1454[_0x3e5b('0x2')](_0x3e5b('0x95'),_0x3e5b('0x96'))),!0x0;_0x3d1454=_0x3d1454[_0x3e5b('0x2')](/http.?:/i,'');_0x1f23d3[_0x3e5b('0x97')](function(_0x50536f){if(!_0x211e73['buyIfQuantityZeroed']&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0x3e5b('0x98')](_0x3d1454))return _0x50536f();var _0x15577d=function(_0x2f4c8f,_0xc015eb){var _0x5d6aae=_0x3d1454['match'](/sku\=([0-9]+)/gi),_0x17a736=[];if(_0x3e5b('0x13')===typeof _0x5d6aae&&null!==_0x5d6aae)for(var _0x3ffc0f=_0x5d6aae[_0x3e5b('0x8')]-0x1;0x0<=_0x3ffc0f;_0x3ffc0f--){var _0x2c08fd=parseInt(_0x5d6aae[_0x3ffc0f][_0x3e5b('0x2')](/sku\=/gi,''));isNaN(_0x2c08fd)||_0x17a736['push'](_0x2c08fd);}_0x211e73[_0x3e5b('0x99')][_0x3e5b('0x25')](this,_0x2f4c8f,_0xc015eb,_0x3d1454);_0x7b7cb7[_0x3e5b('0x9a')][_0x3e5b('0x25')](this,_0x2f4c8f,_0xc015eb,_0x3d1454,_0x17a736);_0x7b7cb7[_0x3e5b('0x82')](_0x2c93f4,_0x3d1454[_0x3e5b('0x9b')]('ku=')['pop']()[_0x3e5b('0x9b')]('&')['shift']());_0x3e5b('0xa')===typeof _0x211e73[_0x3e5b('0x9c')]&&_0x211e73[_0x3e5b('0x9c')][_0x3e5b('0x25')](this);_0x4f62fb(window)['trigger']('productAddedToCart');_0x4f62fb(window)[_0x3e5b('0x5a')](_0x3e5b('0x9d'));};_0x211e73[_0x3e5b('0x9e')]?(_0x15577d(null,_0x3e5b('0x1b')),_0x50536f()):_0x4f62fb[_0x3e5b('0x9f')]({'url':_0x3d1454,'complete':_0x15577d})[_0x3e5b('0x1c')](function(){_0x50536f();});});};_0x7b7cb7['buyButtonClickCallback']=function(_0x4c6d02,_0x3c274b,_0x29a427,_0x38db0c){try{_0x3e5b('0x1b')===_0x3c274b&&_0x3e5b('0x13')===typeof window[_0x3e5b('0xa0')]&&_0x3e5b('0xa')===typeof window[_0x3e5b('0xa0')][_0x3e5b('0xa1')]&&window[_0x3e5b('0xa0')][_0x3e5b('0xa1')](_0x4c6d02,_0x3c274b,_0x29a427,_0x38db0c);}catch(_0x3e0f6f){_0x487caf(_0x3e5b('0xa2'));}};_0x5d6aae();_0x3e5b('0xa')===typeof _0x211e73[_0x3e5b('0x3e')]?_0x211e73['callback'][_0x3e5b('0x25')](this):_0x487caf(_0x3e5b('0xa3'));};var _0x2ccfb5=_0x4f62fb[_0x3e5b('0x63')]();_0x4f62fb['fn'][_0x3e5b('0xa4')]=function(_0x3c509d,_0x99f91b){var _0x4da39d=_0x4f62fb(this);_0x3e5b('0x4')!==typeof _0x99f91b||_0x3e5b('0x13')!==typeof _0x3c509d||_0x3c509d instanceof _0x4f62fb||(_0x99f91b=_0x3c509d,_0x3c509d=void 0x0);_0x211e73=_0x4f62fb[_0x3e5b('0x4c')]({},_0x24a387,_0x99f91b);var _0x3c72e1;_0x2ccfb5['add'](function(){_0x4da39d[_0x3e5b('0x79')](_0x3e5b('0xa5'))[_0x3e5b('0x8')]||_0x4da39d[_0x3e5b('0xa6')](_0x3e5b('0xa7'));_0x3c72e1=new _0x4f62fb[(_0x3e5b('0xa4'))](_0x4da39d,_0x3c509d);});_0x2ccfb5[_0x3e5b('0x3d')]();_0x4f62fb(window)['on'](_0x3e5b('0xa8'),function(_0x276caa,_0x5a988d,_0x163c14){_0x3c72e1[_0x3e5b('0x82')](_0x5a988d,_0x163c14);});return _0x4f62fb['extend'](_0x4da39d,_0x3c72e1);};var _0x22820d=0x0;_0x4f62fb(document)[_0x3e5b('0xa9')](function(_0x2d0e8a,_0x224bc0,_0x1f12d8){-0x1<_0x1f12d8[_0x3e5b('0x17')][_0x3e5b('0xe')]()[_0x3e5b('0x91')](_0x3e5b('0xaa'))&&(_0x22820d=(_0x1f12d8['url']['match'](/sku\=([0-9]+)/i)||[''])[_0x3e5b('0xab')]());});_0x4f62fb(window)[_0x3e5b('0x5e')](_0x3e5b('0xac'),function(){_0x4f62fb(window)['trigger'](_0x3e5b('0xa8'),[new _0x4f62fb(),_0x22820d]);});_0x4f62fb(document)[_0x3e5b('0xad')](function(){_0x2ccfb5['fire']();});}catch(_0x3f518e){_0x3e5b('0x4')!==typeof console&&_0x3e5b('0xa')===typeof console[_0x3e5b('0x10')]&&console[_0x3e5b('0x10')](_0x3e5b('0xae'),_0x3f518e);}}(this));function qd_number_format(_0x4540d7,_0x28596c,_0x40365f,_0x8c2eb2){_0x4540d7=(_0x4540d7+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x4540d7=isFinite(+_0x4540d7)?+_0x4540d7:0x0;_0x28596c=isFinite(+_0x28596c)?Math[_0x3e5b('0x3')](_0x28596c):0x0;_0x8c2eb2='undefined'===typeof _0x8c2eb2?',':_0x8c2eb2;_0x40365f=_0x3e5b('0x4')===typeof _0x40365f?'.':_0x40365f;var _0x45b212='',_0x45b212=function(_0x272aab,_0x5c8cf2){var _0x169db3=Math[_0x3e5b('0x5')](0xa,_0x5c8cf2);return''+(Math[_0x3e5b('0x6')](_0x272aab*_0x169db3)/_0x169db3)[_0x3e5b('0x7')](_0x5c8cf2);},_0x45b212=(_0x28596c?_0x45b212(_0x4540d7,_0x28596c):''+Math[_0x3e5b('0x6')](_0x4540d7))[_0x3e5b('0x9b')]('.');0x3<_0x45b212[0x0][_0x3e5b('0x8')]&&(_0x45b212[0x0]=_0x45b212[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x8c2eb2));(_0x45b212[0x1]||'')[_0x3e5b('0x8')]<_0x28596c&&(_0x45b212[0x1]=_0x45b212[0x1]||'',_0x45b212[0x1]+=Array(_0x28596c-_0x45b212[0x1][_0x3e5b('0x8')]+0x1)['join']('0'));return _0x45b212[_0x3e5b('0x9')](_0x40365f);}(function(){try{window[_0x3e5b('0x33')]=window['_QuatroDigital_CartData']||{},window['_QuatroDigital_CartData']['callback']=window[_0x3e5b('0x33')][_0x3e5b('0x3e')]||$[_0x3e5b('0x63')]();}catch(_0x54bf44){'undefined'!==typeof console&&_0x3e5b('0xa')===typeof console[_0x3e5b('0x10')]&&console['error']('Oooops!\x20',_0x54bf44[_0x3e5b('0x1f')]);}}());(function(_0x374c7a){try{var _0x1dea78=jQuery,_0x2a86ac=function(_0x21a068,_0x543d09){if(_0x3e5b('0x13')===typeof console&&_0x3e5b('0x4')!==typeof console[_0x3e5b('0x10')]&&'undefined'!==typeof console[_0x3e5b('0x2b')]&&_0x3e5b('0x4')!==typeof console[_0x3e5b('0x29')]){var _0x48d60d;'object'===typeof _0x21a068?(_0x21a068[_0x3e5b('0xaf')](_0x3e5b('0xb0')),_0x48d60d=_0x21a068):_0x48d60d=[_0x3e5b('0xb0')+_0x21a068];if(_0x3e5b('0x4')===typeof _0x543d09||_0x3e5b('0x28')!==_0x543d09['toLowerCase']()&&_0x3e5b('0x65')!==_0x543d09[_0x3e5b('0xe')]())if(_0x3e5b('0x4')!==typeof _0x543d09&&_0x3e5b('0x2b')===_0x543d09[_0x3e5b('0xe')]())try{console[_0x3e5b('0x2b')]['apply'](console,_0x48d60d);}catch(_0x8eb4cd){try{console[_0x3e5b('0x2b')](_0x48d60d[_0x3e5b('0x9')]('\x0a'));}catch(_0x5796ca){}}else try{console[_0x3e5b('0x10')][_0x3e5b('0x66')](console,_0x48d60d);}catch(_0x3fcd5c){try{console[_0x3e5b('0x10')](_0x48d60d[_0x3e5b('0x9')]('\x0a'));}catch(_0x4c1c66){}}else try{console['warn']['apply'](console,_0x48d60d);}catch(_0x55f6c5){try{console['warn'](_0x48d60d[_0x3e5b('0x9')]('\x0a'));}catch(_0x243661){}}}};window[_0x3e5b('0x52')]=window['_QuatroDigital_DropDown']||{};window[_0x3e5b('0x52')]['allowUpdate']=!0x0;_0x1dea78['QD_dropDownCart']=function(){};_0x1dea78['fn'][_0x3e5b('0xb1')]=function(){return{'fn':new _0x1dea78()};};var _0x3fe593=function(_0x587c9c){var _0x24b5d9={'t':'nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x46187f){var _0x59d692=function(_0x3c41fa){return _0x3c41fa;};var _0x463ab1=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x46187f=_0x46187f['d'+_0x463ab1[0x10]+'c'+_0x463ab1[0x11]+'m'+_0x59d692(_0x463ab1[0x1])+'n'+_0x463ab1[0xd]]['l'+_0x463ab1[0x12]+'c'+_0x463ab1[0x0]+'ti'+_0x59d692('o')+'n'];var _0x31cb4f=function(_0x3e1d5d){return escape(encodeURIComponent(_0x3e1d5d['replace'](/\./g,'¨')[_0x3e5b('0x2')](/[a-zA-Z]/g,function(_0x19d7a4){return String[_0x3e5b('0xb2')](('Z'>=_0x19d7a4?0x5a:0x7a)>=(_0x19d7a4=_0x19d7a4[_0x3e5b('0xb3')](0x0)+0xd)?_0x19d7a4:_0x19d7a4-0x1a);})));};var _0x374c7a=_0x31cb4f(_0x46187f[[_0x463ab1[0x9],_0x59d692('o'),_0x463ab1[0xc],_0x463ab1[_0x59d692(0xd)]]['join']('')]);_0x31cb4f=_0x31cb4f((window[['js',_0x59d692('no'),'m',_0x463ab1[0x1],_0x463ab1[0x4][_0x3e5b('0xb4')](),_0x3e5b('0xb5')]['join']('')]||_0x3e5b('0x87'))+['.v',_0x463ab1[0xd],'e',_0x59d692('x'),'co',_0x59d692('mm'),'erc',_0x463ab1[0x1],'.c',_0x59d692('o'),'m.',_0x463ab1[0x13],'r'][_0x3e5b('0x9')](''));for(var _0x3436ad in _0x24b5d9){if(_0x31cb4f===_0x3436ad+_0x24b5d9[_0x3436ad]||_0x374c7a===_0x3436ad+_0x24b5d9[_0x3436ad]){var _0x46409b='tr'+_0x463ab1[0x11]+'e';break;}_0x46409b='f'+_0x463ab1[0x0]+'ls'+_0x59d692(_0x463ab1[0x1])+'';}_0x59d692=!0x1;-0x1<_0x46187f[[_0x463ab1[0xc],'e',_0x463ab1[0x0],'rc',_0x463ab1[0x9]]['join']('')]['indexOf']('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x59d692=!0x0);return[_0x46409b,_0x59d692];}(_0x587c9c);}(window);if(!eval(_0x3fe593[0x0]))return _0x3fe593[0x1]?_0x2a86ac('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x1dea78[_0x3e5b('0xb1')]=function(_0x3b06ea,_0x93aa1b){var _0x5515d0=_0x1dea78(_0x3b06ea);if(!_0x5515d0['length'])return _0x5515d0;var _0x5ce3db=_0x1dea78['extend'](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x3e5b('0xb6'),'linkCheckout':_0x3e5b('0xb7'),'cartTotal':_0x3e5b('0xb8'),'emptyCart':'Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','continueShopping':_0x3e5b('0xb9'),'shippingForm':_0x3e5b('0xba')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x25a910){return _0x25a910['skuName']||_0x25a910[_0x3e5b('0xbb')];},'callback':function(){},'callbackProductsList':function(){}},_0x93aa1b);_0x1dea78('');var _0x5f5a8b=this;if(_0x5ce3db[_0x3e5b('0xbc')]){var _0x55dff5=!0x1;_0x3e5b('0x4')===typeof window[_0x3e5b('0x53')]&&(_0x2a86ac(_0x3e5b('0xbd')),_0x1dea78[_0x3e5b('0x9f')]({'url':_0x3e5b('0xbe'),'async':!0x1,'dataType':_0x3e5b('0xbf'),'error':function(){_0x2a86ac(_0x3e5b('0xc0'));_0x55dff5=!0x0;}}));if(_0x55dff5)return _0x2a86ac('A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!');}if(_0x3e5b('0x13')===typeof window['vtexjs']&&_0x3e5b('0x4')!==typeof window['vtexjs'][_0x3e5b('0x23')])var _0x5ef670=window[_0x3e5b('0x53')][_0x3e5b('0x23')];else if(_0x3e5b('0x13')===typeof vtex&&_0x3e5b('0x13')===typeof vtex[_0x3e5b('0x23')]&&_0x3e5b('0x4')!==typeof vtex[_0x3e5b('0x23')]['SDK'])_0x5ef670=new vtex['checkout'][(_0x3e5b('0x54'))]();else return _0x2a86ac(_0x3e5b('0x55'));_0x5f5a8b[_0x3e5b('0xc1')]='<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>';var _0x4a1cba=function(_0x2bb69d){_0x1dea78(this)['append'](_0x2bb69d);_0x2bb69d[_0x3e5b('0x4e')](_0x3e5b('0xc2'))[_0x3e5b('0x2c')](_0x1dea78(_0x3e5b('0xc3')))['on'](_0x3e5b('0xc4'),function(){_0x5515d0[_0x3e5b('0x89')](_0x3e5b('0xc5'));_0x1dea78(document[_0x3e5b('0x69')])[_0x3e5b('0x89')]('qd-bb-lightBoxBodyProdAdd');});_0x1dea78(document)[_0x3e5b('0xc6')](_0x3e5b('0xc7'))['on']('keyup.qd_ddc_closeFn',function(_0x325a0c){0x1b==_0x325a0c[_0x3e5b('0xc8')]&&(_0x5515d0['removeClass'](_0x3e5b('0xc5')),_0x1dea78(document[_0x3e5b('0x69')])['removeClass'](_0x3e5b('0x84')));});var _0x56dd9f=_0x2bb69d[_0x3e5b('0x4e')]('.qd-ddc-prodWrapper');_0x2bb69d[_0x3e5b('0x4e')]('.qd-ddc-scrollUp')['on'](_0x3e5b('0xc9'),function(){_0x5f5a8b[_0x3e5b('0xca')]('-',void 0x0,void 0x0,_0x56dd9f);return!0x1;});_0x2bb69d[_0x3e5b('0x4e')](_0x3e5b('0xcb'))['on'](_0x3e5b('0xcc'),function(){_0x5f5a8b[_0x3e5b('0xca')](void 0x0,void 0x0,void 0x0,_0x56dd9f);return!0x1;});_0x2bb69d[_0x3e5b('0x4e')]('.qd-ddc-shipping\x20input')[_0x3e5b('0xcd')]('')['on'](_0x3e5b('0xce'),function(){_0x5f5a8b[_0x3e5b('0xcf')](_0x1dea78(this));});if(_0x5ce3db[_0x3e5b('0xd0')]){var _0x93aa1b=0x0;_0x1dea78(this)['on'](_0x3e5b('0xd1'),function(){var _0x2bb69d=function(){window[_0x3e5b('0x52')][_0x3e5b('0xd2')]&&(_0x5f5a8b[_0x3e5b('0x8c')](),window[_0x3e5b('0x52')][_0x3e5b('0xd2')]=!0x1,_0x1dea78['fn'][_0x3e5b('0x22')](!0x0),_0x5f5a8b['cartIsEmpty']());};_0x93aa1b=setInterval(function(){_0x2bb69d();},0x258);_0x2bb69d();});_0x1dea78(this)['on'](_0x3e5b('0xd3'),function(){clearInterval(_0x93aa1b);});}};var _0x240456=function(_0x448e8f){_0x448e8f=_0x1dea78(_0x448e8f);_0x5ce3db[_0x3e5b('0xd4')][_0x3e5b('0xd5')]=_0x5ce3db[_0x3e5b('0xd4')][_0x3e5b('0xd5')][_0x3e5b('0x2')](_0x3e5b('0xd6'),_0x3e5b('0xd7'));_0x5ce3db[_0x3e5b('0xd4')]['cartTotal']=_0x5ce3db['texts']['cartTotal'][_0x3e5b('0x2')](_0x3e5b('0xd8'),_0x3e5b('0xd9'));_0x5ce3db[_0x3e5b('0xd4')][_0x3e5b('0xd5')]=_0x5ce3db[_0x3e5b('0xd4')][_0x3e5b('0xd5')][_0x3e5b('0x2')]('#shipping',_0x3e5b('0xda'));_0x5ce3db[_0x3e5b('0xd4')][_0x3e5b('0xd5')]=_0x5ce3db[_0x3e5b('0xd4')][_0x3e5b('0xd5')][_0x3e5b('0x2')](_0x3e5b('0xdb'),_0x3e5b('0xdc'));_0x448e8f[_0x3e5b('0x4e')](_0x3e5b('0xdd'))[_0x3e5b('0x49')](_0x5ce3db[_0x3e5b('0xd4')][_0x3e5b('0xde')]);_0x448e8f[_0x3e5b('0x4e')]('.qd_ddc_continueShopping')[_0x3e5b('0x49')](_0x5ce3db[_0x3e5b('0xd4')][_0x3e5b('0xdf')]);_0x448e8f[_0x3e5b('0x4e')](_0x3e5b('0xe0'))[_0x3e5b('0x49')](_0x5ce3db[_0x3e5b('0xd4')]['linkCheckout']);_0x448e8f[_0x3e5b('0x4e')](_0x3e5b('0xe1'))['html'](_0x5ce3db['texts'][_0x3e5b('0xd5')]);_0x448e8f[_0x3e5b('0x4e')](_0x3e5b('0xe2'))[_0x3e5b('0x49')](_0x5ce3db[_0x3e5b('0xd4')]['shippingForm']);_0x448e8f[_0x3e5b('0x4e')](_0x3e5b('0xe3'))[_0x3e5b('0x49')](_0x5ce3db['texts']['emptyCart']);return _0x448e8f;}(this[_0x3e5b('0xc1')]);var _0x3afa9f=0x0;_0x5515d0[_0x3e5b('0x4b')](function(){0x0<_0x3afa9f?_0x4a1cba['call'](this,_0x240456[_0x3e5b('0xe4')]()):_0x4a1cba[_0x3e5b('0x25')](this,_0x240456);_0x3afa9f++;});window['_QuatroDigital_CartData'][_0x3e5b('0x3e')][_0x3e5b('0x2c')](function(){_0x1dea78(_0x3e5b('0xe5'))[_0x3e5b('0x49')](window[_0x3e5b('0x33')]['total']||'--');_0x1dea78(_0x3e5b('0xe6'))[_0x3e5b('0x49')](window[_0x3e5b('0x33')]['qtt']||'0');_0x1dea78(_0x3e5b('0xe7'))[_0x3e5b('0x49')](window['_QuatroDigital_CartData']['shipping']||'--');_0x1dea78(_0x3e5b('0xe8'))[_0x3e5b('0x49')](window['_QuatroDigital_CartData'][_0x3e5b('0x39')]||'--');});var _0x489282=function(_0x5b07ce,_0x586935){if(_0x3e5b('0x4')===typeof _0x5b07ce[_0x3e5b('0x3c')])return _0x2a86ac(_0x3e5b('0xe9'));_0x5f5a8b[_0x3e5b('0xea')]['call'](this,_0x586935);};_0x5f5a8b['getCartInfoByUrl']=function(_0x31dd7a,_0x2af831){_0x3e5b('0x4')!=typeof _0x2af831?window[_0x3e5b('0x52')]['dataOptionsCache']=_0x2af831:window[_0x3e5b('0x52')]['dataOptionsCache']&&(_0x2af831=window[_0x3e5b('0x52')]['dataOptionsCache']);setTimeout(function(){window['_QuatroDigital_DropDown'][_0x3e5b('0xeb')]=void 0x0;},_0x5ce3db['timeRemoveNewItemClass']);_0x1dea78(_0x3e5b('0xec'))[_0x3e5b('0x89')](_0x3e5b('0xed'));if(_0x5ce3db['smartCheckout']){var _0x93aa1b=function(_0x4d9d36){window['_QuatroDigital_DropDown']['getOrderForm']=_0x4d9d36;_0x489282(_0x4d9d36,_0x2af831);_0x3e5b('0x4')!==typeof window[_0x3e5b('0xee')]&&_0x3e5b('0xa')===typeof window[_0x3e5b('0xee')]['exec']&&window[_0x3e5b('0xee')][_0x3e5b('0xef')][_0x3e5b('0x25')](this);_0x1dea78(_0x3e5b('0xec'))[_0x3e5b('0x44')](_0x3e5b('0xed'));};'undefined'!==typeof window[_0x3e5b('0x52')][_0x3e5b('0x24')]?(_0x93aa1b(window[_0x3e5b('0x52')][_0x3e5b('0x24')]),_0x3e5b('0xa')===typeof _0x31dd7a&&_0x31dd7a(window['_QuatroDigital_DropDown'][_0x3e5b('0x24')])):_0x1dea78[_0x3e5b('0x56')](['items',_0x3e5b('0x34'),_0x3e5b('0x57')],{'done':function(_0x5868fe){_0x93aa1b[_0x3e5b('0x25')](this,_0x5868fe);'function'===typeof _0x31dd7a&&_0x31dd7a(_0x5868fe);},'fail':function(_0x4d3ddd){_0x2a86ac([_0x3e5b('0xf0'),_0x4d3ddd]);}});}else alert(_0x3e5b('0xf1'));};_0x5f5a8b[_0x3e5b('0xf2')]=function(){var _0x5459ba=_0x1dea78('.qd-ddc-wrapper');_0x5459ba['find'](_0x3e5b('0xf3'))[_0x3e5b('0x8')]?_0x5459ba['removeClass'](_0x3e5b('0xf4')):_0x5459ba['addClass'](_0x3e5b('0xf4'));};_0x5f5a8b[_0x3e5b('0xea')]=function(_0xb323e6){var _0x93aa1b=_0x1dea78(_0x3e5b('0xf5'));_0x93aa1b['empty']();_0x93aa1b['each'](function(){var _0x93aa1b=_0x1dea78(this),_0x3b06ea,_0x3c1350,_0xa7a20e=_0x1dea78(''),_0x3ee5ae;for(_0x3ee5ae in window['_QuatroDigital_DropDown'][_0x3e5b('0x24')][_0x3e5b('0x3c')])if('object'===typeof window['_QuatroDigital_DropDown'][_0x3e5b('0x24')]['items'][_0x3ee5ae]){var _0x592a35=window[_0x3e5b('0x52')][_0x3e5b('0x24')][_0x3e5b('0x3c')][_0x3ee5ae];var _0x26b692=_0x592a35[_0x3e5b('0xf6')][_0x3e5b('0x2')](/^\/|\/$/g,'')[_0x3e5b('0x9b')]('/');var _0x676ea2=_0x1dea78('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0x676ea2['attr']({'data-sku':_0x592a35['id'],'data-sku-index':_0x3ee5ae,'data-qd-departament':_0x26b692[0x0],'data-qd-category':_0x26b692[_0x26b692[_0x3e5b('0x8')]-0x1]});_0x676ea2['addClass']('qd-ddc-'+_0x592a35[_0x3e5b('0xf7')]);_0x676ea2['find'](_0x3e5b('0xf8'))[_0x3e5b('0x7b')](_0x5ce3db[_0x3e5b('0xf9')](_0x592a35));_0x676ea2[_0x3e5b('0x4e')](_0x3e5b('0xfa'))[_0x3e5b('0x7b')](isNaN(_0x592a35[_0x3e5b('0xfb')])?_0x592a35[_0x3e5b('0xfb')]:0x0==_0x592a35[_0x3e5b('0xfb')]?_0x3e5b('0xfc'):(_0x1dea78('meta[name=currency]')[_0x3e5b('0x86')]('content')||'R$')+'\x20'+qd_number_format(_0x592a35['sellingPrice']/0x64,0x2,',','.'));_0x676ea2[_0x3e5b('0x4e')](_0x3e5b('0xfd'))['attr']({'data-sku':_0x592a35['id'],'data-sku-index':_0x3ee5ae})[_0x3e5b('0xcd')](_0x592a35[_0x3e5b('0xfe')]);_0x676ea2[_0x3e5b('0x4e')](_0x3e5b('0xff'))['attr']({'data-sku':_0x592a35['id'],'data-sku-index':_0x3ee5ae});_0x5f5a8b[_0x3e5b('0x100')](_0x592a35['id'],_0x676ea2['find'](_0x3e5b('0x101')),_0x592a35[_0x3e5b('0x102')]);_0x676ea2[_0x3e5b('0x4e')](_0x3e5b('0x103'))['attr']({'data-sku':_0x592a35['id'],'data-sku-index':_0x3ee5ae});_0x676ea2[_0x3e5b('0x104')](_0x93aa1b);_0xa7a20e=_0xa7a20e[_0x3e5b('0x2c')](_0x676ea2);}try{var _0x159885=_0x93aa1b[_0x3e5b('0x0')](_0x3e5b('0xec'))['find'](_0x3e5b('0x105'));_0x159885[_0x3e5b('0x8')]&&''==_0x159885[_0x3e5b('0xcd')]()&&window[_0x3e5b('0x52')]['getOrderForm']['shippingData'][_0x3e5b('0x106')]&&_0x159885[_0x3e5b('0xcd')](window[_0x3e5b('0x52')][_0x3e5b('0x24')]['shippingData'][_0x3e5b('0x106')]['postalCode']);}catch(_0x1bd774){_0x2a86ac('Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20'+_0x1bd774[_0x3e5b('0x1f')],_0x3e5b('0x65'));}_0x5f5a8b[_0x3e5b('0x107')](_0x93aa1b);_0x5f5a8b[_0x3e5b('0xf2')]();_0xb323e6&&_0xb323e6[_0x3e5b('0x108')]&&function(){_0x3c1350=_0xa7a20e[_0x3e5b('0x40')](_0x3e5b('0x109')+_0xb323e6[_0x3e5b('0x108')]+'\x27]');_0x3c1350[_0x3e5b('0x8')]&&(_0x3b06ea=0x0,_0xa7a20e[_0x3e5b('0x4b')](function(){var _0xb323e6=_0x1dea78(this);if(_0xb323e6['is'](_0x3c1350))return!0x1;_0x3b06ea+=_0xb323e6[_0x3e5b('0x10a')]();}),_0x5f5a8b[_0x3e5b('0xca')](void 0x0,void 0x0,_0x3b06ea,_0x93aa1b[_0x3e5b('0x2c')](_0x93aa1b[_0x3e5b('0xa0')]())),_0xa7a20e[_0x3e5b('0x89')]('qd-ddc-lastAddedFixed'),function(_0x53e3c8){_0x53e3c8['addClass'](_0x3e5b('0x10b'));_0x53e3c8[_0x3e5b('0x44')](_0x3e5b('0x10c'));setTimeout(function(){_0x53e3c8['removeClass'](_0x3e5b('0x10b'));},_0x5ce3db[_0x3e5b('0x8b')]);}(_0x3c1350));}();});(function(){_QuatroDigital_DropDown[_0x3e5b('0x24')][_0x3e5b('0x3c')][_0x3e5b('0x8')]?(_0x1dea78(_0x3e5b('0x69'))[_0x3e5b('0x89')](_0x3e5b('0x10d'))[_0x3e5b('0x44')](_0x3e5b('0x10e')),setTimeout(function(){_0x1dea78('body')[_0x3e5b('0x89')](_0x3e5b('0x10f'));},_0x5ce3db['timeRemoveNewItemClass'])):_0x1dea78(_0x3e5b('0x69'))[_0x3e5b('0x89')](_0x3e5b('0x110'))[_0x3e5b('0x44')]('qd-ddc-cart-empty');}());_0x3e5b('0xa')===typeof _0x5ce3db['callbackProductsList']?_0x5ce3db[_0x3e5b('0x111')][_0x3e5b('0x25')](this):_0x2a86ac('callbackProductsList\x20não\x20é\x20uma\x20função');};_0x5f5a8b[_0x3e5b('0x100')]=function(_0x22208f,_0x5044e0,_0x5bc879){function _0x5e1a99(){_0x5044e0[_0x3e5b('0x89')](_0x3e5b('0x112'))[_0x3e5b('0x90')](function(){_0x1dea78(this)[_0x3e5b('0x44')](_0x3e5b('0x112'));})[_0x3e5b('0x86')](_0x3e5b('0x113'),_0x5bc879);}_0x5bc879?_0x5e1a99():isNaN(_0x22208f)?_0x2a86ac(_0x3e5b('0x114'),_0x3e5b('0x28')):alert(_0x3e5b('0x115'));};_0x5f5a8b[_0x3e5b('0x107')]=function(_0x34d441){var _0x13b073=function(_0x4e1767,_0x278478){var _0x93aa1b=_0x1dea78(_0x4e1767);var _0x4b0d75=_0x93aa1b['attr']('data-sku');var _0x3b06ea=_0x93aa1b['attr'](_0x3e5b('0x116'));if(_0x4b0d75){var _0x415843=parseInt(_0x93aa1b[_0x3e5b('0xcd')]())||0x1;_0x5f5a8b[_0x3e5b('0x117')]([_0x4b0d75,_0x3b06ea],_0x415843,_0x415843+0x1,function(_0x4f07eb){_0x93aa1b['val'](_0x4f07eb);_0x3e5b('0xa')===typeof _0x278478&&_0x278478();});}};var _0x93aa1b=function(_0x2608ea,_0x464c92){var _0x93aa1b=_0x1dea78(_0x2608ea);var _0x123d9e=_0x93aa1b['attr']('data-sku');var _0x3b06ea=_0x93aa1b[_0x3e5b('0x86')]('data-sku-index');if(_0x123d9e){var _0x5920bf=parseInt(_0x93aa1b[_0x3e5b('0xcd')]())||0x2;_0x5f5a8b[_0x3e5b('0x117')]([_0x123d9e,_0x3b06ea],_0x5920bf,_0x5920bf-0x1,function(_0x40e4bb){_0x93aa1b[_0x3e5b('0xcd')](_0x40e4bb);'function'===typeof _0x464c92&&_0x464c92();});}};var _0x17a995=function(_0x227f5d,_0x4478ac){var _0x93aa1b=_0x1dea78(_0x227f5d);var _0x8f839b=_0x93aa1b[_0x3e5b('0x86')](_0x3e5b('0x118'));var _0x3b06ea=_0x93aa1b[_0x3e5b('0x86')]('data-sku-index');if(_0x8f839b){var _0x5756f9=parseInt(_0x93aa1b['val']())||0x1;_0x5f5a8b[_0x3e5b('0x117')]([_0x8f839b,_0x3b06ea],0x1,_0x5756f9,function(_0xd01ac6){_0x93aa1b[_0x3e5b('0xcd')](_0xd01ac6);_0x3e5b('0xa')===typeof _0x4478ac&&_0x4478ac();});}};var _0x3b06ea=_0x34d441[_0x3e5b('0x4e')]('.qd-ddc-prodQttWrapper:not(.qd_on)');_0x3b06ea['addClass'](_0x3e5b('0x119'))[_0x3e5b('0x4b')](function(){var _0x34d441=_0x1dea78(this);_0x34d441[_0x3e5b('0x4e')](_0x3e5b('0x11a'))['on'](_0x3e5b('0x11b'),function(_0x537939){_0x537939['preventDefault']();_0x3b06ea[_0x3e5b('0x44')](_0x3e5b('0x11c'));_0x13b073(_0x34d441[_0x3e5b('0x4e')](_0x3e5b('0xfd')),function(){_0x3b06ea[_0x3e5b('0x89')](_0x3e5b('0x11c'));});});_0x34d441[_0x3e5b('0x4e')](_0x3e5b('0x11d'))['on'](_0x3e5b('0x11e'),function(_0x440970){_0x440970[_0x3e5b('0x73')]();_0x3b06ea['addClass'](_0x3e5b('0x11c'));_0x93aa1b(_0x34d441['find']('.qd-ddc-quantity'),function(){_0x3b06ea[_0x3e5b('0x89')](_0x3e5b('0x11c'));});});_0x34d441[_0x3e5b('0x4e')](_0x3e5b('0xfd'))['on'](_0x3e5b('0x11f'),function(){_0x3b06ea['addClass']('qd-loading');_0x17a995(this,function(){_0x3b06ea[_0x3e5b('0x89')](_0x3e5b('0x11c'));});});_0x34d441[_0x3e5b('0x4e')]('.qd-ddc-quantity')['on'](_0x3e5b('0x120'),function(_0x41020c){0xd==_0x41020c[_0x3e5b('0xc8')]&&(_0x3b06ea['addClass'](_0x3e5b('0x11c')),_0x17a995(this,function(){_0x3b06ea[_0x3e5b('0x89')](_0x3e5b('0x11c'));}));});});_0x34d441[_0x3e5b('0x4e')](_0x3e5b('0xf3'))[_0x3e5b('0x4b')](function(){var _0x34d441=_0x1dea78(this);_0x34d441[_0x3e5b('0x4e')](_0x3e5b('0xff'))['on'](_0x3e5b('0x121'),function(){_0x34d441[_0x3e5b('0x44')](_0x3e5b('0x11c'));_0x5f5a8b[_0x3e5b('0x122')](_0x1dea78(this),function(_0x4fc4a4){_0x4fc4a4?_0x34d441[_0x3e5b('0x123')](!0x0)['slideUp'](function(){_0x34d441[_0x3e5b('0x124')]();_0x5f5a8b[_0x3e5b('0xf2')]();}):_0x34d441[_0x3e5b('0x89')](_0x3e5b('0x11c'));});return!0x1;});});};_0x5f5a8b['shippingCalculate']=function(_0x32d89c){var _0x1ddcb8=_0x32d89c[_0x3e5b('0xcd')](),_0x1ddcb8=_0x1ddcb8['replace'](/[^0-9\-]/g,''),_0x1ddcb8=_0x1ddcb8[_0x3e5b('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3'),_0x1ddcb8=_0x1ddcb8[_0x3e5b('0x2')](/(.{9}).*/g,'$1');_0x32d89c[_0x3e5b('0xcd')](_0x1ddcb8);0x9<=_0x1ddcb8[_0x3e5b('0x8')]&&(_0x32d89c[_0x3e5b('0x14')](_0x3e5b('0x125'))!=_0x1ddcb8&&_0x5ef670[_0x3e5b('0x126')]({'postalCode':_0x1ddcb8,'country':_0x3e5b('0x127')})[_0x3e5b('0x1a')](function(_0x3fd595){window['_QuatroDigital_DropDown']['getOrderForm']=_0x3fd595;_0x5f5a8b['getCartInfoByUrl']();})[_0x3e5b('0x62')](function(_0x47ac1d){_0x2a86ac([_0x3e5b('0x128'),_0x47ac1d]);updateCartData();}),_0x32d89c['data'](_0x3e5b('0x125'),_0x1ddcb8));};_0x5f5a8b[_0x3e5b('0x117')]=function(_0x126ec8,_0x9fade,_0x99364b,_0x543ce8){function _0x36f786(_0x522cca){_0x522cca='boolean'!==typeof _0x522cca?!0x1:_0x522cca;_0x5f5a8b[_0x3e5b('0x8c')]();window['_QuatroDigital_DropDown'][_0x3e5b('0xd2')]=!0x1;_0x5f5a8b['cartIsEmpty']();_0x3e5b('0x4')!==typeof window[_0x3e5b('0xee')]&&'function'===typeof window[_0x3e5b('0xee')][_0x3e5b('0xef')]&&window[_0x3e5b('0xee')][_0x3e5b('0xef')][_0x3e5b('0x25')](this);'function'===typeof adminCart&&adminCart();_0x1dea78['fn']['simpleCart'](!0x0,void 0x0,_0x522cca);_0x3e5b('0xa')===typeof _0x543ce8&&_0x543ce8(_0x9fade);}_0x99364b=_0x99364b||0x1;if(0x1>_0x99364b)return _0x9fade;if(_0x5ce3db[_0x3e5b('0xbc')]){if(_0x3e5b('0x4')===typeof window[_0x3e5b('0x52')]['getOrderForm']['items'][_0x126ec8[0x1]])return _0x2a86ac('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x126ec8[0x1]+']'),_0x9fade;window[_0x3e5b('0x52')][_0x3e5b('0x24')][_0x3e5b('0x3c')][_0x126ec8[0x1]][_0x3e5b('0xfe')]=_0x99364b;window[_0x3e5b('0x52')][_0x3e5b('0x24')][_0x3e5b('0x3c')][_0x126ec8[0x1]][_0x3e5b('0x129')]=_0x126ec8[0x1];_0x5ef670[_0x3e5b('0x12a')]([window[_0x3e5b('0x52')][_0x3e5b('0x24')][_0x3e5b('0x3c')][_0x126ec8[0x1]]],['items',_0x3e5b('0x34'),_0x3e5b('0x57')])['done'](function(_0xe34a63){window[_0x3e5b('0x52')]['getOrderForm']=_0xe34a63;_0x36f786(!0x0);})[_0x3e5b('0x62')](function(_0x52ac6b){_0x2a86ac([_0x3e5b('0x12b'),_0x52ac6b]);_0x36f786();});}else _0x2a86ac('atenção\x20esta\x20método\x20esta\x20descontinuado');};_0x5f5a8b[_0x3e5b('0x122')]=function(_0x28a69e,_0x42923b){function _0x433fa3(_0x954e61){_0x954e61=_0x3e5b('0x12c')!==typeof _0x954e61?!0x1:_0x954e61;_0x3e5b('0x4')!==typeof window[_0x3e5b('0xee')]&&_0x3e5b('0xa')===typeof window['_QuatroDigital_AmountProduct'][_0x3e5b('0xef')]&&window[_0x3e5b('0xee')]['exec'][_0x3e5b('0x25')](this);_0x3e5b('0xa')===typeof adminCart&&adminCart();_0x1dea78['fn'][_0x3e5b('0x22')](!0x0,void 0x0,_0x954e61);'function'===typeof _0x42923b&&_0x42923b(_0x3b06ea);}var _0x3b06ea=!0x1,_0x45495b=_0x1dea78(_0x28a69e)[_0x3e5b('0x86')](_0x3e5b('0x116'));if(_0x5ce3db['smartCheckout']){if(_0x3e5b('0x4')===typeof window[_0x3e5b('0x52')]['getOrderForm'][_0x3e5b('0x3c')][_0x45495b])return _0x2a86ac(_0x3e5b('0x12d')+_0x45495b+']'),_0x3b06ea;window['_QuatroDigital_DropDown']['getOrderForm'][_0x3e5b('0x3c')][_0x45495b][_0x3e5b('0x129')]=_0x45495b;_0x5ef670[_0x3e5b('0x12e')]([window[_0x3e5b('0x52')][_0x3e5b('0x24')][_0x3e5b('0x3c')][_0x45495b]],['items','totalizers','shippingData'])[_0x3e5b('0x1a')](function(_0x2ba7c8){_0x3b06ea=!0x0;window['_QuatroDigital_DropDown'][_0x3e5b('0x24')]=_0x2ba7c8;_0x489282(_0x2ba7c8);_0x433fa3(!0x0);})[_0x3e5b('0x62')](function(_0x4377be){_0x2a86ac([_0x3e5b('0x12f'),_0x4377be]);_0x433fa3();});}else alert(_0x3e5b('0x130'));};_0x5f5a8b['scrollCart']=function(_0x13e770,_0x56522f,_0xbb83ed,_0x36cd88){_0x36cd88=_0x36cd88||_0x1dea78(_0x3e5b('0x131'));_0x13e770=_0x13e770||'+';_0x56522f=_0x56522f||0.9*_0x36cd88[_0x3e5b('0x132')]();_0x36cd88[_0x3e5b('0x123')](!0x0,!0x0)['animate']({'scrollTop':isNaN(_0xbb83ed)?_0x13e770+'='+_0x56522f+'px':_0xbb83ed});};_0x5ce3db[_0x3e5b('0xd0')]||(_0x5f5a8b[_0x3e5b('0x8c')](),_0x1dea78['fn'][_0x3e5b('0x22')](!0x0));_0x1dea78(window)['on']('productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex',function(){try{window[_0x3e5b('0x52')][_0x3e5b('0x24')]=void 0x0,_0x5f5a8b[_0x3e5b('0x8c')]();}catch(_0x45d19d){_0x2a86ac(_0x3e5b('0x133')+_0x45d19d[_0x3e5b('0x1f')],_0x3e5b('0x134'));}});_0x3e5b('0xa')===typeof _0x5ce3db[_0x3e5b('0x3e')]?_0x5ce3db[_0x3e5b('0x3e')][_0x3e5b('0x25')](this):_0x2a86ac(_0x3e5b('0xa3'));};_0x1dea78['fn'][_0x3e5b('0xb1')]=function(_0x3a7533){var _0x28b37c=_0x1dea78(this);_0x28b37c['fn']=new _0x1dea78[(_0x3e5b('0xb1'))](this,_0x3a7533);return _0x28b37c;};}catch(_0x22ceca){_0x3e5b('0x4')!==typeof console&&_0x3e5b('0xa')===typeof console['error']&&console[_0x3e5b('0x10')](_0x3e5b('0xae'),_0x22ceca);}}(this));(function(_0x4e186a){try{var _0x20a1bf=jQuery;window[_0x3e5b('0xee')]=window[_0x3e5b('0xee')]||{};window[_0x3e5b('0xee')][_0x3e5b('0x3c')]={};window[_0x3e5b('0xee')][_0x3e5b('0x135')]=!0x1;window[_0x3e5b('0xee')]['buyButtonClicked']=!0x1;window[_0x3e5b('0xee')][_0x3e5b('0x136')]=!0x1;var _0x5a6b89=function(){if(window[_0x3e5b('0xee')][_0x3e5b('0x135')]){var _0x4a3954=!0x1;var _0x4e186a={};window[_0x3e5b('0xee')][_0x3e5b('0x3c')]={};for(_0x44bebe in window['_QuatroDigital_DropDown'][_0x3e5b('0x24')][_0x3e5b('0x3c')])if(_0x3e5b('0x13')===typeof window[_0x3e5b('0x52')][_0x3e5b('0x24')]['items'][_0x44bebe]){var _0x3b21f1=window[_0x3e5b('0x52')][_0x3e5b('0x24')][_0x3e5b('0x3c')][_0x44bebe];_0x3e5b('0x4')!==typeof _0x3b21f1[_0x3e5b('0x137')]&&null!==_0x3b21f1[_0x3e5b('0x137')]&&''!==_0x3b21f1[_0x3e5b('0x137')]&&(window[_0x3e5b('0xee')][_0x3e5b('0x3c')][_0x3e5b('0x138')+_0x3b21f1[_0x3e5b('0x137')]]=window['_QuatroDigital_AmountProduct'][_0x3e5b('0x3c')]['prod_'+_0x3b21f1['productId']]||{},window[_0x3e5b('0xee')]['items'][_0x3e5b('0x138')+_0x3b21f1[_0x3e5b('0x137')]]['prodId']=_0x3b21f1[_0x3e5b('0x137')],_0x4e186a[_0x3e5b('0x138')+_0x3b21f1[_0x3e5b('0x137')]]||(window[_0x3e5b('0xee')]['items'][_0x3e5b('0x138')+_0x3b21f1[_0x3e5b('0x137')]][_0x3e5b('0x3a')]=0x0),window[_0x3e5b('0xee')][_0x3e5b('0x3c')][_0x3e5b('0x138')+_0x3b21f1[_0x3e5b('0x137')]][_0x3e5b('0x3a')]+=_0x3b21f1[_0x3e5b('0xfe')],_0x4a3954=!0x0,_0x4e186a[_0x3e5b('0x138')+_0x3b21f1['productId']]=!0x0);}var _0x44bebe=_0x4a3954;}else _0x44bebe=void 0x0;window[_0x3e5b('0xee')][_0x3e5b('0x135')]&&(_0x20a1bf(_0x3e5b('0x139'))['remove'](),_0x20a1bf(_0x3e5b('0x13a'))[_0x3e5b('0x89')](_0x3e5b('0x13b')));for(var _0x45602f in window[_0x3e5b('0xee')][_0x3e5b('0x3c')]){_0x3b21f1=window[_0x3e5b('0xee')][_0x3e5b('0x3c')][_0x45602f];if(_0x3e5b('0x13')!==typeof _0x3b21f1)return;_0x4e186a=_0x20a1bf('input.qd-productId[value='+_0x3b21f1[_0x3e5b('0x13c')]+']')[_0x3e5b('0x0')]('li');if(window[_0x3e5b('0xee')][_0x3e5b('0x135')]||!_0x4e186a[_0x3e5b('0x4e')](_0x3e5b('0x139'))[_0x3e5b('0x8')])_0x4a3954=_0x20a1bf('<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>'),_0x4a3954[_0x3e5b('0x4e')](_0x3e5b('0x13d'))[_0x3e5b('0x49')](_0x3b21f1[_0x3e5b('0x3a')]),_0x3b21f1=_0x4e186a['find'](_0x3e5b('0x13e')),_0x3b21f1['length']?_0x3b21f1[_0x3e5b('0xa6')](_0x4a3954)['addClass'](_0x3e5b('0x13b')):_0x4e186a[_0x3e5b('0xa6')](_0x4a3954);}_0x44bebe&&(window[_0x3e5b('0xee')]['allowRecalculate']=!0x1);};window['_QuatroDigital_AmountProduct'][_0x3e5b('0xef')]=function(){window['_QuatroDigital_AmountProduct'][_0x3e5b('0x135')]=!0x0;_0x5a6b89[_0x3e5b('0x25')](this);};_0x20a1bf(document)[_0x3e5b('0xad')](function(){_0x5a6b89[_0x3e5b('0x25')](this);});}catch(_0x455ec0){'undefined'!==typeof console&&_0x3e5b('0xa')===typeof console[_0x3e5b('0x10')]&&console['error'](_0x3e5b('0xae'),_0x455ec0);}}(this));(function(){try{var _0x39e7bf=jQuery,_0x31896f,_0x1be5f8={'selector':_0x3e5b('0x13f'),'dropDown':{},'buyButton':{}};_0x39e7bf[_0x3e5b('0x140')]=function(_0x45e9fc){var _0x4b82c9={};_0x31896f=_0x39e7bf[_0x3e5b('0x4c')](!0x0,{},_0x1be5f8,_0x45e9fc);_0x45e9fc=_0x39e7bf(_0x31896f['selector'])[_0x3e5b('0xb1')](_0x31896f[_0x3e5b('0x141')]);_0x4b82c9['buyButton']=_0x3e5b('0x4')!==typeof _0x31896f[_0x3e5b('0x141')][_0x3e5b('0xd0')]&&!0x1===_0x31896f[_0x3e5b('0x141')][_0x3e5b('0xd0')]?_0x39e7bf(_0x31896f[_0x3e5b('0x80')])['QD_buyButton'](_0x45e9fc['fn'],_0x31896f[_0x3e5b('0x74')]):_0x39e7bf(_0x31896f['selector'])[_0x3e5b('0xa4')](_0x31896f[_0x3e5b('0x74')]);_0x4b82c9[_0x3e5b('0x141')]=_0x45e9fc;return _0x4b82c9;};_0x39e7bf['fn'][_0x3e5b('0x142')]=function(){_0x3e5b('0x13')===typeof console&&_0x3e5b('0xa')===typeof console[_0x3e5b('0x2b')]&&console[_0x3e5b('0x2b')](_0x3e5b('0x143'));};_0x39e7bf['smartCart']=_0x39e7bf['fn'][_0x3e5b('0x142')];}catch(_0x42511f){_0x3e5b('0x4')!==typeof console&&_0x3e5b('0xa')===typeof console[_0x3e5b('0x10')]&&console[_0x3e5b('0x10')](_0x3e5b('0xae'),_0x42511f);}}());

/* Quatro Digital - Product Thumbs // Carlos Vinicius // Todos os direitos reservados. */
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs();a.trigger("QuatroDigital.pt_callback",[a])}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return a.length?$.extend({},a,new b(a)):a},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0x64d4=['qdVideoInProduct','start','td.value-field.Videos:first','http','div#image','videoFieldSelector','replace','split','youtube','push','pop','youtu.be','be/','shift','<div\x20class=\x22qd-playerWrapper\x22></div>','prependTo','#include','wrap','<div\x20class=\x22qd-playerContainer\x22></div>','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','join','---','erc','indexOf','html','urlProtocol','://www.youtube.com/embed/','?wmode=transparent&rel=0&enablejsapi=1\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>','data','height','stop','fadeTo','addClass','qdpv-video-on','add','animate','find','iframe','a:not(\x27.qd-videoLink\x27)','hide','removeAttr','style','removeClass','.qd-videoItem','call','string','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27','\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','click.playVideo','.ON','.qd-playerWrapper\x20iframe','length','contentWindow','postMessage','attr','rel','controlVideo','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','insertThumbsIn','appendTo','QuatroDigital.pv_video_added','ajaxStop','ImageControl','.qd-videoLink','body','.produto','object','undefined','alerta','toLowerCase','warn','[Video\x20in\x20product]\x20','info','error'];(function(_0x406189,_0x54be59){var _0x3e04b9=function(_0x3e102b){while(--_0x3e102b){_0x406189['push'](_0x406189['shift']());}};_0x3e04b9(++_0x54be59);}(_0x64d4,0x94));var _0x464d=function(_0x114154,_0x1518da){_0x114154=_0x114154-0x0;var _0x54e5dd=_0x64d4[_0x114154];return _0x54e5dd;};(function(_0x4581ed){$(function(){if($(document[_0x464d('0x0')])['is'](_0x464d('0x1'))){var _0x53a65c=[];var _0x4a40af=function(_0x162696,_0x22dc27){_0x464d('0x2')===typeof console&&(_0x464d('0x3')!==typeof _0x22dc27&&_0x464d('0x4')===_0x22dc27[_0x464d('0x5')]()?console[_0x464d('0x6')](_0x464d('0x7')+_0x162696):_0x464d('0x3')!==typeof _0x22dc27&&_0x464d('0x8')===_0x22dc27[_0x464d('0x5')]()?console[_0x464d('0x8')](_0x464d('0x7')+_0x162696):console[_0x464d('0x9')]('[Video\x20in\x20product]\x20'+_0x162696));};window[_0x464d('0xa')]=window[_0x464d('0xa')]||{};var _0x41229a=$['extend'](!0x0,{'insertThumbsIn':_0x464d('0xb'),'videoFieldSelector':_0x464d('0xc'),'controlVideo':!0x0,'urlProtocol':_0x464d('0xd')},window[_0x464d('0xa')]);var _0x1ed9b5=$('ul.thumbs');var _0x318985=$(_0x464d('0xe'));var _0x4656f4=$(_0x41229a[_0x464d('0xf')])['text']()[_0x464d('0x10')](/\;\s*/,';')[_0x464d('0x11')](';');for(var _0x22352a=0x0;_0x22352a<_0x4656f4['length'];_0x22352a++)-0x1<_0x4656f4[_0x22352a]['indexOf'](_0x464d('0x12'))?_0x53a65c[_0x464d('0x13')](_0x4656f4[_0x22352a][_0x464d('0x11')]('v=')[_0x464d('0x14')]()[_0x464d('0x11')](/[&#]/)['shift']()):-0x1<_0x4656f4[_0x22352a]['indexOf'](_0x464d('0x15'))&&_0x53a65c[_0x464d('0x13')](_0x4656f4[_0x22352a]['split'](_0x464d('0x16'))[_0x464d('0x14')]()['split'](/[\?&#]/)[_0x464d('0x17')]());var _0x27dd65=$(_0x464d('0x18'));_0x27dd65[_0x464d('0x19')](_0x464d('0x1a'));_0x27dd65[_0x464d('0x1b')](_0x464d('0x1c'));_0x4656f4=function(_0x2745f1){var _0x2bffb8={'t':_0x464d('0x1d')};return function(_0x411b10){var _0x3de1d1=function(_0x18f755){return _0x18f755;};var _0x3586bf=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x411b10=_0x411b10['d'+_0x3586bf[0x10]+'c'+_0x3586bf[0x11]+'m'+_0x3de1d1(_0x3586bf[0x1])+'n'+_0x3586bf[0xd]]['l'+_0x3586bf[0x12]+'c'+_0x3586bf[0x0]+'ti'+_0x3de1d1('o')+'n'];var _0x50075f=function(_0x1a5ae7){return escape(encodeURIComponent(_0x1a5ae7[_0x464d('0x10')](/\./g,'¨')[_0x464d('0x10')](/[a-zA-Z]/g,function(_0xdf721d){return String[_0x464d('0x1e')](('Z'>=_0xdf721d?0x5a:0x7a)>=(_0xdf721d=_0xdf721d[_0x464d('0x1f')](0x0)+0xd)?_0xdf721d:_0xdf721d-0x1a);})));};var _0x44c3d8=_0x50075f(_0x411b10[[_0x3586bf[0x9],_0x3de1d1('o'),_0x3586bf[0xc],_0x3586bf[_0x3de1d1(0xd)]]['join']('')]);_0x50075f=_0x50075f((window[['js',_0x3de1d1('no'),'m',_0x3586bf[0x1],_0x3586bf[0x4][_0x464d('0x20')](),_0x464d('0x21')][_0x464d('0x22')]('')]||_0x464d('0x23'))+['.v',_0x3586bf[0xd],'e',_0x3de1d1('x'),'co',_0x3de1d1('mm'),_0x464d('0x24'),_0x3586bf[0x1],'.c',_0x3de1d1('o'),'m.',_0x3586bf[0x13],'r']['join'](''));for(var _0x545d9c in _0x2bffb8){if(_0x50075f===_0x545d9c+_0x2bffb8[_0x545d9c]||_0x44c3d8===_0x545d9c+_0x2bffb8[_0x545d9c]){var _0x1dd6cc='tr'+_0x3586bf[0x11]+'e';break;}_0x1dd6cc='f'+_0x3586bf[0x0]+'ls'+_0x3de1d1(_0x3586bf[0x1])+'';}_0x3de1d1=!0x1;-0x1<_0x411b10[[_0x3586bf[0xc],'e',_0x3586bf[0x0],'rc',_0x3586bf[0x9]][_0x464d('0x22')]('')][_0x464d('0x25')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x3de1d1=!0x0);return[_0x1dd6cc,_0x3de1d1];}(_0x2745f1);}(window);if(!eval(_0x4656f4[0x0]))return _0x4656f4[0x1]?_0x4a40af('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x32f4f3=function(_0x40367d,_0x39f1f7){_0x464d('0x12')===_0x39f1f7&&_0x27dd65[_0x464d('0x26')]('<iframe\x20src=\x22'+_0x41229a[_0x464d('0x27')]+_0x464d('0x28')+_0x40367d+_0x464d('0x29'));_0x318985[_0x464d('0x2a')](_0x464d('0x2b'),_0x318985[_0x464d('0x2a')]('height')||_0x318985[_0x464d('0x2b')]());_0x318985[_0x464d('0x2c')](!0x0,!0x0)[_0x464d('0x2d')](0x1f4,0x0,function(){$(_0x464d('0x0'))[_0x464d('0x2e')](_0x464d('0x2f'));});_0x27dd65[_0x464d('0x2c')](!0x0,!0x0)[_0x464d('0x2d')](0x1f4,0x1,function(){_0x318985[_0x464d('0x30')](_0x27dd65)[_0x464d('0x31')]({'height':_0x27dd65[_0x464d('0x32')](_0x464d('0x33'))[_0x464d('0x2b')]()},0x2bc);});};removePlayer=function(){_0x1ed9b5[_0x464d('0x32')](_0x464d('0x34'))['bind']('click.removeVideo',function(){_0x27dd65[_0x464d('0x2c')](!0x0,!0x0)['fadeTo'](0x1f4,0x0,function(){$(this)[_0x464d('0x35')]()[_0x464d('0x36')](_0x464d('0x37'));$(_0x464d('0x0'))[_0x464d('0x38')](_0x464d('0x2f'));});_0x318985['stop'](!0x0,!0x0)[_0x464d('0x2d')](0x1f4,0x1,function(){var _0xe0a1c=_0x318985[_0x464d('0x2a')](_0x464d('0x2b'));_0xe0a1c&&_0x318985['animate']({'height':_0xe0a1c},0x2bc);});});};var _0x40704e=function(){if(!_0x1ed9b5[_0x464d('0x32')](_0x464d('0x39'))['length'])for(vId in removePlayer[_0x464d('0x3a')](this),_0x53a65c)if(_0x464d('0x3b')===typeof _0x53a65c[vId]&&''!==_0x53a65c[vId]){var _0x4d4690=$(_0x464d('0x3c')+_0x53a65c[vId]+_0x464d('0x3d')+_0x53a65c[vId]+_0x464d('0x3e')+_0x53a65c[vId]+'/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>');_0x4d4690[_0x464d('0x32')]('a')['bind'](_0x464d('0x3f'),function(){var _0x3129e5=$(this);_0x1ed9b5['find'](_0x464d('0x40'))['removeClass']('ON');_0x3129e5['addClass']('ON');0x1==_0x41229a['controlVideo']?$(_0x464d('0x41'))[_0x464d('0x42')]?(_0x32f4f3[_0x464d('0x3a')](this,'',''),$(_0x464d('0x41'))[0x0][_0x464d('0x43')][_0x464d('0x44')]('{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','*')):_0x32f4f3['call'](this,_0x3129e5[_0x464d('0x45')](_0x464d('0x46')),_0x464d('0x12')):_0x32f4f3['call'](this,_0x3129e5[_0x464d('0x45')](_0x464d('0x46')),'youtube');return!0x1;});0x1==_0x41229a[_0x464d('0x47')]&&_0x1ed9b5[_0x464d('0x32')]('a:not(.qd-videoLink)')['click'](function(_0xc875a5){$(_0x464d('0x41'))[_0x464d('0x42')]&&$(_0x464d('0x41'))[0x0]['contentWindow'][_0x464d('0x44')](_0x464d('0x48'),'*');});_0x464d('0xb')===_0x41229a[_0x464d('0x49')]?_0x4d4690[_0x464d('0x19')](_0x1ed9b5):_0x4d4690[_0x464d('0x4a')](_0x1ed9b5);_0x4d4690['trigger'](_0x464d('0x4b'),[_0x53a65c[vId],_0x4d4690]);}};$(document)[_0x464d('0x4c')](_0x40704e);$(window)['load'](_0x40704e);(function(){var _0xb07392=this;var _0x504b9c=window[_0x464d('0x4d')]||function(){};window[_0x464d('0x4d')]=function(_0x1b77f7,_0xdc1e6e){$(_0x1b77f7||'')['is'](_0x464d('0x4e'))||(_0x504b9c[_0x464d('0x3a')](this,_0x1b77f7,_0xdc1e6e),_0x40704e[_0x464d('0x3a')](_0xb07392));};}());}});}(this));

/* Quatro Digital - Mosaic Banners // Carlos Vinicius // Todos os direitos reservados */
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

