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
var _0xf3d8=['startedByWrapper','not','.qd_sp_processedItem','.qd_productPrice:not(.qd_sp_processedItem)','display:none\x20!important;','append','after','extend','body','.produto','function','prototype','trim','replace','abs','undefined','pow','round','length','join','QD_SmartPrice','Smart\x20Price','object','error','info','warn','aviso','toLowerCase','apply','text','match','auto','.productRightColumn','strong.skuBestPrice','label.skuBestInstallmentNumber','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','toUpperCase','ite','---','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','isProductPage','closest','productPage','wrapperElement','find','skuBestPrice','qd-active','qd-sp-active','.qd_sp_on,\x20.qd_sp_ignored','.qd_active','removeClass','oneFlagByItem','addClass','qd_sp_on','div[skuCorrente]:first','attr','skuCorrente','skus','sku','available','bestPrice','isSmartCheckout','qd-sp-product-unavailable','getDiscountValue','O\x20valor\x20informado\x20p/\x20o\x20desconto\x20não\x20é\x20um\x20número.','alerta','.qd_productPrice','val','appliedDiscount','listPrice','.qd_productOldPrice','.qd-sp-display-discount','html','installments','changeInstallments','installmentValue','.qd_sp_display_installments','.qd_sp_display_installmentValue','.qd_sp_installments','.qd_saveAmount','.qd_saveAmountPercent','prepend','changeNativeSaveAmount','em.economia-de','each','skuSelected.vtex','qd_sp_processedItem','flagElement','forcePromotion','string'];(function(_0xbd8662,_0x165daf){var _0x5ce453=function(_0x113cd3){while(--_0x113cd3){_0xbd8662['push'](_0xbd8662['shift']());}};_0x5ce453(++_0x165daf);}(_0xf3d8,0xc2));var _0x8f3d=function(_0x3cfb0d,_0x4df584){_0x3cfb0d=_0x3cfb0d-0x0;var _0x3486b4=_0xf3d8[_0x3cfb0d];return _0x3486b4;};_0x8f3d('0x0')!==typeof String[_0x8f3d('0x1')][_0x8f3d('0x2')]&&(String[_0x8f3d('0x1')][_0x8f3d('0x2')]=function(){return this[_0x8f3d('0x3')](/^\s+|\s+$/g,'');});function qd_number_format(_0x5bc478,_0x591060,_0x214af0,_0x4bf564){_0x5bc478=(_0x5bc478+'')[_0x8f3d('0x3')](/[^0-9+\-Ee.]/g,'');_0x5bc478=isFinite(+_0x5bc478)?+_0x5bc478:0x0;_0x591060=isFinite(+_0x591060)?Math[_0x8f3d('0x4')](_0x591060):0x0;_0x4bf564=_0x8f3d('0x5')===typeof _0x4bf564?',':_0x4bf564;_0x214af0=_0x8f3d('0x5')===typeof _0x214af0?'.':_0x214af0;var _0x40f022='',_0x40f022=function(_0x452dc0,_0x5a3b4e){var _0x591060=Math[_0x8f3d('0x6')](0xa,_0x5a3b4e);return''+(Math['round'](_0x452dc0*_0x591060)/_0x591060)['toFixed'](_0x5a3b4e);},_0x40f022=(_0x591060?_0x40f022(_0x5bc478,_0x591060):''+Math[_0x8f3d('0x7')](_0x5bc478))['split']('.');0x3<_0x40f022[0x0][_0x8f3d('0x8')]&&(_0x40f022[0x0]=_0x40f022[0x0][_0x8f3d('0x3')](/\B(?=(?:\d{3})+(?!\d))/g,_0x4bf564));(_0x40f022[0x1]||'')[_0x8f3d('0x8')]<_0x591060&&(_0x40f022[0x1]=_0x40f022[0x1]||'',_0x40f022[0x1]+=Array(_0x591060-_0x40f022[0x1][_0x8f3d('0x8')]+0x1)[_0x8f3d('0x9')]('0'));return _0x40f022[_0x8f3d('0x9')](_0x214af0);};(function(_0x51d4c8){'use strict';var _0x523ba6=jQuery;if(typeof _0x523ba6['fn'][_0x8f3d('0xa')]===_0x8f3d('0x0'))return;var _0x7d13a6=_0x8f3d('0xb');var _0x2f8f8c=function(_0x1e190d,_0x2b8f73){if(_0x8f3d('0xc')===typeof console&&_0x8f3d('0x0')===typeof console[_0x8f3d('0xd')]&&_0x8f3d('0x0')===typeof console[_0x8f3d('0xe')]&&_0x8f3d('0x0')===typeof console[_0x8f3d('0xf')]){var _0x4ef30a;_0x8f3d('0xc')===typeof _0x1e190d?(_0x1e190d['unshift']('['+_0x7d13a6+']\x0a'),_0x4ef30a=_0x1e190d):_0x4ef30a=['['+_0x7d13a6+']\x0a'+_0x1e190d];if(_0x8f3d('0x5')===typeof _0x2b8f73||'alerta'!==_0x2b8f73['toLowerCase']()&&_0x8f3d('0x10')!==_0x2b8f73['toLowerCase']())if(_0x8f3d('0x5')!==typeof _0x2b8f73&&_0x8f3d('0xe')===_0x2b8f73[_0x8f3d('0x11')]())try{console[_0x8f3d('0xe')]['apply'](console,_0x4ef30a);}catch(_0xfd0e5f){console['info'](_0x4ef30a[_0x8f3d('0x9')]('\x0a'));}else try{console[_0x8f3d('0xd')][_0x8f3d('0x12')](console,_0x4ef30a);}catch(_0x8cb118){console[_0x8f3d('0xd')](_0x4ef30a[_0x8f3d('0x9')]('\x0a'));}else try{console[_0x8f3d('0xf')][_0x8f3d('0x12')](console,_0x4ef30a);}catch(_0x35d339){console['warn'](_0x4ef30a[_0x8f3d('0x9')]('\x0a'));}}};var _0x13b0ba=/[0-9]+\%/i;var _0x5679d7=/[0-9\.]+(?=\%)/i;var _0x4dd34f={'isDiscountFlag':function(_0x2c4ada){if(_0x2c4ada['text']()['search'](_0x13b0ba)>-0x1)return!![];return![];},'getDiscountValue':function(_0x31d9b2){return _0x31d9b2[_0x8f3d('0x13')]()[_0x8f3d('0x14')](_0x5679d7);},'startedByWrapper':![],'flagElement':'.flag','wrapperElement':'li','filterFlagBy':'[class*=\x27desconto\x27]','forcePromotion':null,'appliedDiscount':null,'oneFlagByItem':!![],'isSmartCheckout':!![],'changeInstallments':![],'productPage':{'changeNativeSaveAmount':!![],'changeNativePrice':!![],'changeInstallments':![],'isProductPage':_0x8f3d('0x15'),'wrapperElement':_0x8f3d('0x16'),'skuBestPrice':_0x8f3d('0x17'),'installments':_0x8f3d('0x18'),'installmentValue':'label.skuBestInstallmentValue','skuPrice':'strong.skuPrice'}};_0x523ba6['fn'][_0x8f3d('0xa')]=function(){};var _0x45b733=function(_0x26ccb9){var _0x14569b={'t':_0x8f3d('0x19')};return function(_0x1304d1){var _0xf95065,_0xf914f7,_0x425452,_0x2c2677;_0xf914f7=function(_0x4d535c){return _0x4d535c;};_0x425452=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x1304d1=_0x1304d1['d'+_0x425452[0x10]+'c'+_0x425452[0x11]+'m'+_0xf914f7(_0x425452[0x1])+'n'+_0x425452[0xd]]['l'+_0x425452[0x12]+'c'+_0x425452[0x0]+'ti'+_0xf914f7('o')+'n'];_0xf95065=function(_0x33b489){return escape(encodeURIComponent(_0x33b489[_0x8f3d('0x3')](/\./g,'¨')[_0x8f3d('0x3')](/[a-zA-Z]/g,function(_0x125678){return String[_0x8f3d('0x1a')](('Z'>=_0x125678?0x5a:0x7a)>=(_0x125678=_0x125678['charCodeAt'](0x0)+0xd)?_0x125678:_0x125678-0x1a);})));};var _0x229c86=_0xf95065(_0x1304d1[[_0x425452[0x9],_0xf914f7('o'),_0x425452[0xc],_0x425452[_0xf914f7(0xd)]]['join']('')]);_0xf95065=_0xf95065((window[['js',_0xf914f7('no'),'m',_0x425452[0x1],_0x425452[0x4][_0x8f3d('0x1b')](),_0x8f3d('0x1c')][_0x8f3d('0x9')]('')]||_0x8f3d('0x1d'))+['.v',_0x425452[0xd],'e',_0xf914f7('x'),'co',_0xf914f7('mm'),'erc',_0x425452[0x1],'.c',_0xf914f7('o'),'m.',_0x425452[0x13],'r'][_0x8f3d('0x9')](''));for(var _0x5277a2 in _0x14569b){if(_0xf95065===_0x5277a2+_0x14569b[_0x5277a2]||_0x229c86===_0x5277a2+_0x14569b[_0x5277a2]){_0x2c2677='tr'+_0x425452[0x11]+'e';break;}_0x2c2677='f'+_0x425452[0x0]+'ls'+_0xf914f7(_0x425452[0x1])+'';}_0xf914f7=!0x1;-0x1<_0x1304d1[[_0x425452[0xc],'e',_0x425452[0x0],'rc',_0x425452[0x9]][_0x8f3d('0x9')]('')][_0x8f3d('0x1e')](_0x8f3d('0x1f'))&&(_0xf914f7=!0x0);return[_0x2c2677,_0xf914f7];}(_0x26ccb9);}(window);if(!eval(_0x45b733[0x0]))return _0x45b733[0x1]?_0x2f8f8c('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x2332e8=function(_0x5dd0cb,_0x3fe9a4){'use strict';var _0x2f56e9=function(_0x4d0843){'use strict';var _0x49bc2a,_0x555427,_0x3c78f1,_0x1a1716,_0x5d7239,_0x2b5eae,_0x139dcc,_0x30d8ca,_0x322860,_0x404fe4,_0x3d3165,_0x1db6b7,_0x256b7f,_0x21d877,_0x38969a,_0x18e7a6,_0x5be097,_0x5333a1,_0xb6110;var _0x440d9f=_0x523ba6(this);_0x4d0843=typeof _0x4d0843===_0x8f3d('0x5')?![]:_0x4d0843;if(_0x3fe9a4['productPage'][_0x8f3d('0x20')])var _0x5b165f=_0x440d9f[_0x8f3d('0x21')](_0x3fe9a4[_0x8f3d('0x22')][_0x8f3d('0x23')]);else var _0x5b165f=_0x440d9f[_0x8f3d('0x21')](_0x3fe9a4[_0x8f3d('0x23')]);if(!_0x4d0843&&!_0x440d9f['is'](_0x3fe9a4['filterFlagBy'])){if(_0x3fe9a4[_0x8f3d('0x22')]['isProductPage']&&_0x5b165f['is'](_0x3fe9a4['productPage'][_0x8f3d('0x23')])){_0x5b165f[_0x8f3d('0x24')](_0x3fe9a4[_0x8f3d('0x22')][_0x8f3d('0x25')])['addClass'](_0x8f3d('0x26'));_0x5b165f['addClass'](_0x8f3d('0x27'));}return;}var _0x46cadf=_0x3fe9a4[_0x8f3d('0x22')][_0x8f3d('0x20')];if(_0x440d9f['is'](_0x8f3d('0x28'))&&!_0x46cadf)return;if(_0x46cadf){_0x30d8ca=_0x5b165f['find'](_0x3fe9a4[_0x8f3d('0x22')][_0x8f3d('0x25')]);if(_0x30d8ca[_0x8f3d('0x24')](_0x8f3d('0x29'))[_0x8f3d('0x8')])return;_0x30d8ca[_0x8f3d('0x2a')]('qd-active');_0x5b165f[_0x8f3d('0x2a')](_0x8f3d('0x27'));}if(_0x3fe9a4[_0x8f3d('0x2b')]&&_0x440d9f['siblings']('.qd_sp_on')[_0x8f3d('0x8')]){_0x440d9f[_0x8f3d('0x2c')]('qd_sp_ignored');return;}_0x440d9f['addClass'](_0x8f3d('0x2d'));if(!_0x3fe9a4['isDiscountFlag'](_0x440d9f))return;if(_0x46cadf){_0x3c78f1={};var _0x5e5d25=parseInt(_0x523ba6(_0x8f3d('0x2e'))[_0x8f3d('0x2f')](_0x8f3d('0x30')),0xa);if(_0x5e5d25){for(var _0x4a56e2=0x0;_0x4a56e2<skuJson[_0x8f3d('0x31')]['length'];_0x4a56e2++){if(skuJson['skus'][_0x4a56e2][_0x8f3d('0x32')]==_0x5e5d25){_0x3c78f1=skuJson['skus'][_0x4a56e2];break;}}}else{var _0x4b7dc2=0x5af3107a3fff;for(var _0x15659e in skuJson[_0x8f3d('0x31')]){if(typeof skuJson['skus'][_0x15659e]===_0x8f3d('0x0'))continue;if(!skuJson[_0x8f3d('0x31')][_0x15659e][_0x8f3d('0x33')])continue;if(skuJson[_0x8f3d('0x31')][_0x15659e][_0x8f3d('0x34')]<_0x4b7dc2){_0x4b7dc2=skuJson[_0x8f3d('0x31')][_0x15659e][_0x8f3d('0x34')];_0x3c78f1=skuJson[_0x8f3d('0x31')][_0x15659e];}}}}_0x18e7a6=!![];_0x5be097=0x0;if(_0x3fe9a4[_0x8f3d('0x35')]&&_0x5333a1){_0x18e7a6=skuJson[_0x8f3d('0x33')];if(!_0x18e7a6)return _0x5b165f[_0x8f3d('0x2c')](_0x8f3d('0x36'));}_0x555427=_0x3fe9a4[_0x8f3d('0x37')](_0x440d9f);_0x49bc2a=parseFloat(_0x555427,0xa);if(isNaN(_0x49bc2a))return _0x2f8f8c([_0x8f3d('0x38'),_0x440d9f],_0x8f3d('0x39'));var _0x201304=function(_0xc7a793){if(_0x46cadf)_0x1a1716=(_0xc7a793[_0x8f3d('0x34')]||0x0)/0x64;else{_0x256b7f=_0x5b165f[_0x8f3d('0x24')](_0x8f3d('0x3a'));_0x1a1716=parseFloat((_0x256b7f[_0x8f3d('0x3b')]()||'')[_0x8f3d('0x3')](/[^0-9\.\,]+/i,'')[_0x8f3d('0x3')]('.','')['replace'](',','.'),0xa);}if(isNaN(_0x1a1716))return _0x2f8f8c(['Por\x20alguma\x20razão\x20não\x20consegui\x20obter\x20o\x20preço\x20deste\x20produto\x20:(',_0x440d9f,_0x5b165f]);if(_0x3fe9a4[_0x8f3d('0x3c')]!==null){_0x21d877=0x0;if(!isNaN(_0x3fe9a4[_0x8f3d('0x3c')]))_0x21d877=_0x3fe9a4[_0x8f3d('0x3c')];else{_0x38969a=_0x5b165f['find'](_0x3fe9a4[_0x8f3d('0x3c')]);if(_0x38969a[_0x8f3d('0x8')])_0x21d877=_0x3fe9a4[_0x8f3d('0x37')](_0x38969a);}_0x21d877=parseFloat(_0x21d877,0xa);if(isNaN(_0x21d877))_0x21d877=0x0;if(_0x21d877!==0x0)_0x1a1716=_0x1a1716*0x64/(0x64-_0x21d877);}if(_0x46cadf)_0x5d7239=(_0xc7a793[_0x8f3d('0x3d')]||0x0)/0x64;else _0x5d7239=parseFloat((_0x5b165f[_0x8f3d('0x24')](_0x8f3d('0x3e'))[_0x8f3d('0x3b')]()||'')[_0x8f3d('0x3')](/[^0-9\.\,]+/i,'')['replace']('.','')[_0x8f3d('0x3')](',','.'),0xa);if(isNaN(_0x5d7239))_0x5d7239=0.001;_0x2b5eae=_0x1a1716*((0x64-_0x49bc2a)/0x64);if(_0x46cadf&&_0x3fe9a4[_0x8f3d('0x22')]['changeNativePrice']){_0x30d8ca[_0x8f3d('0x13')](_0x30d8ca[_0x8f3d('0x13')]()[_0x8f3d('0x2')]()['replace'](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x2b5eae,0x2,',','.')))[_0x8f3d('0x2c')](_0x8f3d('0x26'));_0x5b165f[_0x8f3d('0x2c')](_0x8f3d('0x27'));}else{_0xb6110=_0x5b165f[_0x8f3d('0x24')]('.qd_displayPrice');_0xb6110['text'](_0xb6110[_0x8f3d('0x13')]()[_0x8f3d('0x3')](/[0-9\.]+,[0-9]+/i,'')+qd_number_format(_0x2b5eae,0x2,',','.'));}if(_0x46cadf){_0x139dcc=_0x5b165f['find'](_0x3fe9a4[_0x8f3d('0x22')]['skuPrice']);if(_0x139dcc[_0x8f3d('0x8')])_0x139dcc[_0x8f3d('0x13')](_0x139dcc['text']()[_0x8f3d('0x2')]()[_0x8f3d('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x2b5eae,0x2,',','.')));}var _0x1f7026=_0x5b165f[_0x8f3d('0x24')](_0x8f3d('0x3f'));_0x1f7026[_0x8f3d('0x13')](_0x1f7026[_0x8f3d('0x13')]()['replace'](/[0-9]+\%/i,_0x49bc2a+'%'));var _0x58a43f=function(_0x5c347e,_0x1125d1,_0x47fae2){var _0x241996=_0x5b165f['find'](_0x5c347e);if(_0x241996[_0x8f3d('0x8')])_0x241996[_0x8f3d('0x40')](_0x241996[_0x8f3d('0x40')]()[_0x8f3d('0x2')]()[_0x8f3d('0x3')](/[0-9]{1,2}/,_0x47fae2?_0x47fae2:_0xc7a793[_0x8f3d('0x41')]||0x0));var _0x1d22f1=_0x5b165f['find'](_0x1125d1);if(_0x1d22f1['length'])_0x1d22f1[_0x8f3d('0x40')](_0x1d22f1['html']()['trim']()[_0x8f3d('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x2b5eae/(_0x47fae2?_0x47fae2:_0xc7a793[_0x8f3d('0x41')]||0x1),0x2,',','.')));};if(_0x46cadf&&_0x3fe9a4['productPage'][_0x8f3d('0x42')])_0x58a43f(_0x3fe9a4[_0x8f3d('0x22')][_0x8f3d('0x41')],_0x3fe9a4['productPage'][_0x8f3d('0x43')]);else if(_0x3fe9a4['changeInstallments'])_0x58a43f(_0x8f3d('0x44'),_0x8f3d('0x45'),parseInt(_0x5b165f[_0x8f3d('0x24')](_0x8f3d('0x46'))['val']()||0x1)||0x1);_0x5b165f[_0x8f3d('0x24')](_0x8f3d('0x47'))['append'](qd_number_format(_0x5d7239-_0x2b5eae,0x2,',','.'));_0x5b165f['find'](_0x8f3d('0x48'))[_0x8f3d('0x49')](qd_number_format((_0x5d7239-_0x2b5eae)*0x64/_0x5d7239,0x2,',','.'));if(_0x46cadf&&_0x3fe9a4[_0x8f3d('0x22')][_0x8f3d('0x4a')]){_0x523ba6(_0x8f3d('0x4b'))[_0x8f3d('0x4c')](function(){_0x3d3165=_0x523ba6(this);_0x3d3165['text'](_0x3d3165[_0x8f3d('0x13')]()[_0x8f3d('0x2')]()[_0x8f3d('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x5d7239-_0x2b5eae,0x2,',','.')));_0x3d3165[_0x8f3d('0x2c')](_0x8f3d('0x26'));});}};_0x201304(_0x3c78f1);if(_0x46cadf)_0x523ba6(window)['on'](_0x8f3d('0x4d'),function(_0x26e8fe,_0x47955f,_0x57ff5e){_0x201304(_0x57ff5e);});_0x5b165f[_0x8f3d('0x2c')](_0x8f3d('0x4e'));if(!_0x46cadf)_0x256b7f[_0x8f3d('0x2c')](_0x8f3d('0x4e'));};(_0x3fe9a4['startedByWrapper']?_0x5dd0cb[_0x8f3d('0x24')](_0x3fe9a4[_0x8f3d('0x4f')]):_0x5dd0cb)[_0x8f3d('0x4c')](function(){_0x2f56e9['call'](this,![]);});if(typeof _0x3fe9a4[_0x8f3d('0x50')]==_0x8f3d('0x51')){var _0x22f426=_0x3fe9a4[_0x8f3d('0x52')]?_0x5dd0cb:_0x5dd0cb['closest'](_0x3fe9a4[_0x8f3d('0x23')]);if(_0x3fe9a4[_0x8f3d('0x22')]['isProductPage'])_0x22f426=_0x22f426[_0x8f3d('0x21')](_0x3fe9a4[_0x8f3d('0x22')][_0x8f3d('0x23')])[_0x8f3d('0x53')](_0x8f3d('0x54'));else _0x22f426=_0x22f426[_0x8f3d('0x24')](_0x8f3d('0x55'));_0x22f426[_0x8f3d('0x4c')](function(){var _0x246a4d=_0x523ba6(_0x3fe9a4[_0x8f3d('0x50')]);_0x246a4d['attr']('style',_0x8f3d('0x56'));if(_0x3fe9a4[_0x8f3d('0x22')][_0x8f3d('0x20')])_0x523ba6(this)[_0x8f3d('0x57')](_0x246a4d);else _0x523ba6(this)[_0x8f3d('0x58')](_0x246a4d);_0x2f56e9['call'](_0x246a4d,!![]);});}};_0x523ba6['fn'][_0x8f3d('0xa')]=function(_0x193ab6){var _0x389e23=_0x523ba6(this);if(!_0x389e23[_0x8f3d('0x8')])return _0x389e23;var _0x5ae9be=_0x523ba6[_0x8f3d('0x59')](!![],{},_0x4dd34f,_0x193ab6);if(typeof _0x5ae9be[_0x8f3d('0x22')]['isProductPage']!='boolean')_0x5ae9be['productPage']['isProductPage']=_0x523ba6(document[_0x8f3d('0x5a')])['is'](_0x8f3d('0x5b'));_0x2332e8(_0x389e23,_0x5ae9be);return _0x389e23;};}(this));
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
var _0xc234=['getParent','closest','function','QD_amazingMenu','/qd-amazing-menu','info','undefined','warn','object','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','join','error','apply','qdAmAddNdx','each','addClass','qd-am-li-','qd-am-first','qd-am-last','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','url','html','attr','data-qdam-value','.box-banner','hide','qd-am-content-loaded','text','trim','insertBefore','ajaxCallback','QuatroDigital.am.ajaxCallback','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','children',':not(ul)','qd-am-elem-','first','replaceSpecialChars','>li','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','add','qd-am-','-li','callback','call','trigger','extend','exec','.qd_amazing_menu_auto'];(function(_0x55ea99,_0xdc5e20){var _0x4d2f7c=function(_0x1cee1a){while(--_0x1cee1a){_0x55ea99['push'](_0x55ea99['shift']());}};_0x4d2f7c(++_0xdc5e20);}(_0xc234,0x92));var _0x4c23=function(_0x26852d,_0x204a44){_0x26852d=_0x26852d-0x0;var _0x1b1384=_0xc234[_0x26852d];return _0x1b1384;};(function(_0x2cc6ce){_0x2cc6ce['fn'][_0x4c23('0x0')]=_0x2cc6ce['fn'][_0x4c23('0x1')];}(jQuery));(function(_0x59b04d){var _0x485583;var _0xaefb34=jQuery;if(_0x4c23('0x2')!==typeof _0xaefb34['fn'][_0x4c23('0x3')]){var _0x4d1b1a={'url':_0x4c23('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0xf5c745=function(_0x462162,_0x193955){if('object'===typeof console&&'undefined'!==typeof console['error']&&'undefined'!==typeof console[_0x4c23('0x5')]&&_0x4c23('0x6')!==typeof console[_0x4c23('0x7')]){var _0x3853f2;_0x4c23('0x8')===typeof _0x462162?(_0x462162['unshift'](_0x4c23('0x9')),_0x3853f2=_0x462162):_0x3853f2=['[QD\x20Amazing\x20Menu]\x0a'+_0x462162];if('undefined'===typeof _0x193955||_0x4c23('0xa')!==_0x193955[_0x4c23('0xb')]()&&_0x4c23('0xc')!==_0x193955['toLowerCase']())if('undefined'!==typeof _0x193955&&_0x4c23('0x5')===_0x193955['toLowerCase']())try{console[_0x4c23('0x5')]['apply'](console,_0x3853f2);}catch(_0x132346){try{console['info'](_0x3853f2[_0x4c23('0xd')]('\x0a'));}catch(_0x1c449a){}}else try{console[_0x4c23('0xe')][_0x4c23('0xf')](console,_0x3853f2);}catch(_0x21234d){try{console[_0x4c23('0xe')](_0x3853f2['join']('\x0a'));}catch(_0x3e9c5f){}}else try{console[_0x4c23('0x7')][_0x4c23('0xf')](console,_0x3853f2);}catch(_0x542267){try{console['warn'](_0x3853f2[_0x4c23('0xd')]('\x0a'));}catch(_0x15c752){}}}};_0xaefb34['fn'][_0x4c23('0x10')]=function(){var _0x25f710=_0xaefb34(this);_0x25f710[_0x4c23('0x11')](function(_0x4db59d){_0xaefb34(this)[_0x4c23('0x12')](_0x4c23('0x13')+_0x4db59d);});_0x25f710['first']()['addClass'](_0x4c23('0x14'));_0x25f710['last']()[_0x4c23('0x12')](_0x4c23('0x15'));return _0x25f710;};_0xaefb34['fn'][_0x4c23('0x3')]=function(){};_0x59b04d=function(_0x510a3b){var _0x5639de={'t':_0x4c23('0x16')};return function(_0x58c336){var _0x46073b=function(_0x43bd20){return _0x43bd20;};var _0x5b881c=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x58c336=_0x58c336['d'+_0x5b881c[0x10]+'c'+_0x5b881c[0x11]+'m'+_0x46073b(_0x5b881c[0x1])+'n'+_0x5b881c[0xd]]['l'+_0x5b881c[0x12]+'c'+_0x5b881c[0x0]+'ti'+_0x46073b('o')+'n'];var _0x1e252d=function(_0x1ffdf1){return escape(encodeURIComponent(_0x1ffdf1['replace'](/\./g,'¨')[_0x4c23('0x17')](/[a-zA-Z]/g,function(_0x416da4){return String[_0x4c23('0x18')](('Z'>=_0x416da4?0x5a:0x7a)>=(_0x416da4=_0x416da4[_0x4c23('0x19')](0x0)+0xd)?_0x416da4:_0x416da4-0x1a);})));};var _0x1621f2=_0x1e252d(_0x58c336[[_0x5b881c[0x9],_0x46073b('o'),_0x5b881c[0xc],_0x5b881c[_0x46073b(0xd)]][_0x4c23('0xd')]('')]);_0x1e252d=_0x1e252d((window[['js',_0x46073b('no'),'m',_0x5b881c[0x1],_0x5b881c[0x4][_0x4c23('0x1a')](),'ite'][_0x4c23('0xd')]('')]||_0x4c23('0x1b'))+['.v',_0x5b881c[0xd],'e',_0x46073b('x'),'co',_0x46073b('mm'),_0x4c23('0x1c'),_0x5b881c[0x1],'.c',_0x46073b('o'),'m.',_0x5b881c[0x13],'r'][_0x4c23('0xd')](''));for(var _0x158e5e in _0x5639de){if(_0x1e252d===_0x158e5e+_0x5639de[_0x158e5e]||_0x1621f2===_0x158e5e+_0x5639de[_0x158e5e]){var _0x2bc3f8='tr'+_0x5b881c[0x11]+'e';break;}_0x2bc3f8='f'+_0x5b881c[0x0]+'ls'+_0x46073b(_0x5b881c[0x1])+'';}_0x46073b=!0x1;-0x1<_0x58c336[[_0x5b881c[0xc],'e',_0x5b881c[0x0],'rc',_0x5b881c[0x9]][_0x4c23('0xd')]('')][_0x4c23('0x1d')](_0x4c23('0x1e'))&&(_0x46073b=!0x0);return[_0x2bc3f8,_0x46073b];}(_0x510a3b);}(window);if(!eval(_0x59b04d[0x0]))return _0x59b04d[0x1]?_0xf5c745(_0x4c23('0x1f')):!0x1;var _0x38b212=function(_0x50e1e0){var _0x142e6b=_0x50e1e0[_0x4c23('0x20')]('.qd_am_code');var _0x291e63=_0x142e6b[_0x4c23('0x21')](_0x4c23('0x22'));var _0xefa10=_0x142e6b[_0x4c23('0x21')](_0x4c23('0x23'));if(_0x291e63[_0x4c23('0x24')]||_0xefa10['length'])_0x291e63[_0x4c23('0x25')]()['addClass'](_0x4c23('0x26')),_0xefa10[_0x4c23('0x25')]()[_0x4c23('0x12')](_0x4c23('0x27')),_0xaefb34['qdAjax']({'url':_0x485583[_0x4c23('0x28')],'dataType':_0x4c23('0x29'),'success':function(_0x3067f6){var _0x5a2978=_0xaefb34(_0x3067f6);_0x291e63[_0x4c23('0x11')](function(){var _0x3067f6=_0xaefb34(this);var _0x1ed52f=_0x5a2978['find']('img[alt=\x27'+_0x3067f6[_0x4c23('0x2a')](_0x4c23('0x2b'))+'\x27]');_0x1ed52f['length']&&(_0x1ed52f[_0x4c23('0x11')](function(){_0xaefb34(this)[_0x4c23('0x0')](_0x4c23('0x2c'))['clone']()['insertBefore'](_0x3067f6);}),_0x3067f6[_0x4c23('0x2d')]());})['addClass'](_0x4c23('0x2e'));_0xefa10[_0x4c23('0x11')](function(){var _0x3067f6={};var _0x6efe48=_0xaefb34(this);_0x5a2978['find']('h2')[_0x4c23('0x11')](function(){if(_0xaefb34(this)[_0x4c23('0x2f')]()[_0x4c23('0x30')]()[_0x4c23('0xb')]()==_0x6efe48['attr']('data-qdam-value')[_0x4c23('0x30')]()[_0x4c23('0xb')]())return _0x3067f6=_0xaefb34(this),!0x1;});_0x3067f6['length']&&(_0x3067f6['each'](function(){_0xaefb34(this)[_0x4c23('0x0')]('[class*=\x27colunas\x27]')['clone']()[_0x4c23('0x31')](_0x6efe48);}),_0x6efe48['hide']());})[_0x4c23('0x12')](_0x4c23('0x2e'));},'error':function(){_0xf5c745('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27'+_0x485583[_0x4c23('0x28')]+'\x27\x20falho.');},'complete':function(){_0x485583[_0x4c23('0x32')]['call'](this);_0xaefb34(window)['trigger'](_0x4c23('0x33'),_0x50e1e0);},'clearQueueDelay':0xbb8});};_0xaefb34[_0x4c23('0x3')]=function(_0x9c9162){var _0x51eb24=_0x9c9162['find']('ul[itemscope]')[_0x4c23('0x11')](function(){var _0x75029=_0xaefb34(this);if(!_0x75029['length'])return _0xf5c745([_0x4c23('0x34'),_0x9c9162],_0x4c23('0xa'));_0x75029[_0x4c23('0x20')](_0x4c23('0x35'))[_0x4c23('0x25')]()[_0x4c23('0x12')](_0x4c23('0x36'));_0x75029[_0x4c23('0x20')]('li')[_0x4c23('0x11')](function(){var _0x241941=_0xaefb34(this);var _0xa758b8=_0x241941[_0x4c23('0x37')](_0x4c23('0x38'));_0xa758b8[_0x4c23('0x24')]&&_0x241941['addClass'](_0x4c23('0x39')+_0xa758b8[_0x4c23('0x3a')]()[_0x4c23('0x2f')]()['trim']()[_0x4c23('0x3b')]()[_0x4c23('0x17')](/\./g,'')[_0x4c23('0x17')](/\s/g,'-')[_0x4c23('0xb')]());});var _0xc724d5=_0x75029[_0x4c23('0x20')](_0x4c23('0x3c'))['qdAmAddNdx']();_0x75029['addClass']('qd-amazing-menu');_0xc724d5=_0xc724d5[_0x4c23('0x20')]('>ul');_0xc724d5['each'](function(){var _0x5bb07b=_0xaefb34(this);_0x5bb07b[_0x4c23('0x20')](_0x4c23('0x3c'))[_0x4c23('0x10')]()[_0x4c23('0x12')](_0x4c23('0x3d'));_0x5bb07b[_0x4c23('0x12')](_0x4c23('0x3e'));_0x5bb07b[_0x4c23('0x25')]()[_0x4c23('0x12')](_0x4c23('0x3f'));});_0xc724d5['addClass']('qd-am-dropdown');var _0x13ccb9=0x0,_0x59b04d=function(_0x447913){_0x13ccb9+=0x1;_0x447913=_0x447913[_0x4c23('0x37')]('li')[_0x4c23('0x37')]('*');_0x447913['length']&&(_0x447913[_0x4c23('0x12')]('qd-am-level-'+_0x13ccb9),_0x59b04d(_0x447913));};_0x59b04d(_0x75029);_0x75029[_0x4c23('0x40')](_0x75029['find']('ul'))[_0x4c23('0x11')](function(){var _0x146d93=_0xaefb34(this);_0x146d93['addClass'](_0x4c23('0x41')+_0x146d93[_0x4c23('0x37')]('li')[_0x4c23('0x24')]+_0x4c23('0x42'));});});_0x38b212(_0x51eb24);_0x485583[_0x4c23('0x43')][_0x4c23('0x44')](this);_0xaefb34(window)[_0x4c23('0x45')]('QuatroDigital.am.callback',_0x9c9162);};_0xaefb34['fn'][_0x4c23('0x3')]=function(_0x37133a){var _0x50a3b0=_0xaefb34(this);if(!_0x50a3b0['length'])return _0x50a3b0;_0x485583=_0xaefb34[_0x4c23('0x46')]({},_0x4d1b1a,_0x37133a);_0x50a3b0[_0x4c23('0x47')]=new _0xaefb34[(_0x4c23('0x3'))](_0xaefb34(this));return _0x50a3b0;};_0xaefb34(function(){_0xaefb34(_0x4c23('0x48'))[_0x4c23('0x3')]();});}}(this));

/* Quatro Digital Smart Cart */
var _0xb43b=['qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','skuName','name','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','qd-bb-lightBoxBodyProdAdd','keyup.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','.qd-ddc-scrollUp','scrollCart','.qd-ddc-shipping\x20input','keyup.qd_ddc_cep','updateOnlyHover','mouseenter.qd_ddc_hover','mouseleave.qd_ddc_hover','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','texts','#items','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','.qd-ddc-viewCart','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','shippingForm','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','allTotal','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','smartCheckout','_QuatroDigital_AmountProduct','exec','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','cartIsEmpty','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','qd-ddc-','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','val','.qd-ddc-remove','insertProdImg','.qd-ddc-image','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','address','postalCode','actionButtons','lastSku','[data-sku=\x27','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-cart-rendered','qd-ddc-cart-empty','callbackProductsList','qd-loaded','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','changeQantity','data-sku','data-sku-index','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','.qd-ddc-quantity','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','keyup.qd_ddc_change','stop','shippingCalculate','$1-$2$3','BRA','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','removeProduct','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','allowRecalculate','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','remove','qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qdDdcContainer','dropDown','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','replace','abs','undefined','pow','round','toFixed','split','length','join','function','prototype','trim','capitalize','toUpperCase','slice','qdAjax','error','extend','GET','data','stringify','type','jqXHR','ajax','success','fail','always','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','message','version','4.0','simpleCart','checkout','getOrderForm','QuatroDigital_simpleCart','object','alerta','warn','[Simple\x20Cart]\x0a','info','toLowerCase','add','QD_simpleCart','elements','.qd_items_text','meta[name=currency]','attr','content','each','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','Shipping','value','total','currencySymbol','shipping','qtt','showQuantityByItems','items','quantity','callback','filter','.singular','show','addClass','qd-emptyCart','removeClass','$this','O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','html','itemsTextE','cartQttE','find','cartQtt','cartTotalE','cartTotal','itemsText','emptyElem','emptyCart','_QuatroDigital_DropDown','vtexjs','SDK','QD_checkoutQueue','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','trigger','simpleCartCallback.quatro_digital','ajaxRequestbuyButtonAsynchronous','call','ReloadItemsCart','.qd_cart_auto','bind','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','Oooops!\x20','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','done','Callbacks','fire','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','.productInformationWrapper\x20\x20a.buy-button','javascript:','body','Produto\x20adicionado\x20ao\x20carrinho!','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','location','href','#produto,\x20.produto','QD_buyButton','isSmartCheckout','qd-bb-click-active','click.qd_bb_buy_sc','clickBuySmartCheckout','preventDefault','Método\x20descontinuado!','buyButton','qd-sbb-on','.btn-add-buy-button-asynchronous','.remove-href','qd-bb-active','.qd-bb-productAdded','append','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','prodAdd','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','[href=\x27','---','qd-bb-itemAddBuyButtonWrapper','qd-bb-itemAddCartWrapper','getCartInfoByUrl','função\x20descontinuada','allowUpdate','autoWatchBuyButton','unbind','click','mouseenter.qd_bb_buy_sc','load','?redirect=false&','execDefaultAction','redirect=false','redirect=true','queue','test','match','push','productPageCallback','buyButtonClickCallback','pop','shift','asyncCallback','cartProductAdded.vtex','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','.qd-bb-itemAddWrapper','prepend','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','QuatroDigital.qd_bb_prod_add','ajaxSend','url','indexOf','/checkout/cart/add','productAddedToCart.qdSbbVtex','ajaxStop','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','QD_dropDownCart','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','ite'];(function(_0x2641f9,_0x26715f){var _0x585741=function(_0x2d1462){while(--_0x2d1462){_0x2641f9['push'](_0x2641f9['shift']());}};_0x585741(++_0x26715f);}(_0xb43b,0x1b2));var _0xbb43=function(_0x576807,_0x3cea9f){_0x576807=_0x576807-0x0;var _0x369512=_0xb43b[_0x576807];return _0x369512;};(function(_0x2ee678){_0x2ee678['fn'][_0xbb43('0x0')]=_0x2ee678['fn']['closest'];}(jQuery));function qd_number_format(_0x1bdcfc,_0x1995f8,_0x22bc86,_0x4cf605){_0x1bdcfc=(_0x1bdcfc+'')[_0xbb43('0x1')](/[^0-9+\-Ee.]/g,'');_0x1bdcfc=isFinite(+_0x1bdcfc)?+_0x1bdcfc:0x0;_0x1995f8=isFinite(+_0x1995f8)?Math[_0xbb43('0x2')](_0x1995f8):0x0;_0x4cf605=_0xbb43('0x3')===typeof _0x4cf605?',':_0x4cf605;_0x22bc86=_0xbb43('0x3')===typeof _0x22bc86?'.':_0x22bc86;var _0x378df5='',_0x378df5=function(_0x553520,_0x80fe61){var _0x1995f8=Math[_0xbb43('0x4')](0xa,_0x80fe61);return''+(Math[_0xbb43('0x5')](_0x553520*_0x1995f8)/_0x1995f8)[_0xbb43('0x6')](_0x80fe61);},_0x378df5=(_0x1995f8?_0x378df5(_0x1bdcfc,_0x1995f8):''+Math['round'](_0x1bdcfc))[_0xbb43('0x7')]('.');0x3<_0x378df5[0x0][_0xbb43('0x8')]&&(_0x378df5[0x0]=_0x378df5[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x4cf605));(_0x378df5[0x1]||'')[_0xbb43('0x8')]<_0x1995f8&&(_0x378df5[0x1]=_0x378df5[0x1]||'',_0x378df5[0x1]+=Array(_0x1995f8-_0x378df5[0x1][_0xbb43('0x8')]+0x1)[_0xbb43('0x9')]('0'));return _0x378df5[_0xbb43('0x9')](_0x22bc86);};_0xbb43('0xa')!==typeof String[_0xbb43('0xb')]['trim']&&(String[_0xbb43('0xb')][_0xbb43('0xc')]=function(){return this['replace'](/^\s+|\s+$/g,'');});'function'!=typeof String[_0xbb43('0xb')]['capitalize']&&(String['prototype'][_0xbb43('0xd')]=function(){return this['charAt'](0x0)[_0xbb43('0xe')]()+this[_0xbb43('0xf')](0x1)['toLowerCase']();});(function(_0x4a6e18){if('function'!==typeof _0x4a6e18[_0xbb43('0x10')]){var _0x2abce0={};_0x4a6e18['qdAjaxQueue']=_0x2abce0;0x96>parseInt((_0x4a6e18['fn']['jquery'][_0xbb43('0x1')](/[^0-9]+/g,'')+'000')['slice'](0x0,0x3),0xa)&&console&&_0xbb43('0xa')==typeof console[_0xbb43('0x11')]&&console[_0xbb43('0x11')]();_0x4a6e18['qdAjax']=function(_0x1c16d7){try{var _0x4f28b8=_0x4a6e18[_0xbb43('0x12')]({},{'url':'','type':_0xbb43('0x13'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x1c16d7);var _0x4dfc54='object'===typeof _0x4f28b8[_0xbb43('0x14')]?JSON[_0xbb43('0x15')](_0x4f28b8[_0xbb43('0x14')]):_0x4f28b8[_0xbb43('0x14')]['toString']();var _0x40a650=encodeURIComponent(_0x4f28b8['url']+'|'+_0x4f28b8[_0xbb43('0x16')]+'|'+_0x4dfc54);_0x2abce0[_0x40a650]=_0x2abce0[_0x40a650]||{};'undefined'==typeof _0x2abce0[_0x40a650][_0xbb43('0x17')]?_0x2abce0[_0x40a650]['jqXHR']=_0x4a6e18[_0xbb43('0x18')](_0x4f28b8):(_0x2abce0[_0x40a650][_0xbb43('0x17')]['done'](_0x4f28b8[_0xbb43('0x19')]),_0x2abce0[_0x40a650]['jqXHR'][_0xbb43('0x1a')](_0x4f28b8[_0xbb43('0x11')]),_0x2abce0[_0x40a650][_0xbb43('0x17')]['always'](_0x4f28b8['complete']));_0x2abce0[_0x40a650]['jqXHR'][_0xbb43('0x1b')](function(){isNaN(parseInt(_0x4f28b8[_0xbb43('0x1c')]))||setTimeout(function(){_0x2abce0[_0x40a650]['jqXHR']=void 0x0;},_0x4f28b8[_0xbb43('0x1c')]);});return _0x2abce0[_0x40a650][_0xbb43('0x17')];}catch(_0x226827){_0xbb43('0x3')!==typeof console&&'function'===typeof console['error']&&console[_0xbb43('0x11')](_0xbb43('0x1d')+_0x226827[_0xbb43('0x1e')]);}};_0x4a6e18[_0xbb43('0x10')][_0xbb43('0x1f')]=_0xbb43('0x20');}}(jQuery));(function(_0x21d386){_0x21d386['fn'][_0xbb43('0x0')]=_0x21d386['fn']['closest'];}(jQuery));(function(){var _0x2ad6da=jQuery;if('function'!==typeof _0x2ad6da['fn'][_0xbb43('0x21')]){_0x2ad6da(function(){var _0x436fd5=vtexjs[_0xbb43('0x22')][_0xbb43('0x23')];vtexjs['checkout'][_0xbb43('0x23')]=function(){return _0x436fd5['call']();};});try{window['QuatroDigital_simpleCart']=window['QuatroDigital_simpleCart']||{};window[_0xbb43('0x24')]['ajaxStopOn']=!0x1;_0x2ad6da['fn'][_0xbb43('0x21')]=function(_0x4511d9,_0xc577ac,_0x596a62){var _0x205011=function(_0x1bdf91,_0x46650c){if(_0xbb43('0x25')===typeof console){var _0xb16ff6=_0xbb43('0x25')===typeof _0x1bdf91;_0xbb43('0x3')!==typeof _0x46650c&&_0xbb43('0x26')===_0x46650c['toLowerCase']()?_0xb16ff6?console[_0xbb43('0x27')](_0xbb43('0x28'),_0x1bdf91[0x0],_0x1bdf91[0x1],_0x1bdf91[0x2],_0x1bdf91[0x3],_0x1bdf91[0x4],_0x1bdf91[0x5],_0x1bdf91[0x6],_0x1bdf91[0x7]):console[_0xbb43('0x27')](_0xbb43('0x28')+_0x1bdf91):_0xbb43('0x3')!==typeof _0x46650c&&_0xbb43('0x29')===_0x46650c[_0xbb43('0x2a')]()?_0xb16ff6?console[_0xbb43('0x29')](_0xbb43('0x28'),_0x1bdf91[0x0],_0x1bdf91[0x1],_0x1bdf91[0x2],_0x1bdf91[0x3],_0x1bdf91[0x4],_0x1bdf91[0x5],_0x1bdf91[0x6],_0x1bdf91[0x7]):console[_0xbb43('0x29')](_0xbb43('0x28')+_0x1bdf91):_0xb16ff6?console[_0xbb43('0x11')](_0xbb43('0x28'),_0x1bdf91[0x0],_0x1bdf91[0x1],_0x1bdf91[0x2],_0x1bdf91[0x3],_0x1bdf91[0x4],_0x1bdf91[0x5],_0x1bdf91[0x6],_0x1bdf91[0x7]):console[_0xbb43('0x11')](_0xbb43('0x28')+_0x1bdf91);}};var _0x405f36=_0x2ad6da(this);'object'===typeof _0x4511d9?_0xc577ac=_0x4511d9:(_0x4511d9=_0x4511d9||!0x1,_0x405f36=_0x405f36[_0xbb43('0x2b')](_0x2ad6da[_0xbb43('0x2c')]['elements']));if(!_0x405f36[_0xbb43('0x8')])return _0x405f36;_0x2ad6da[_0xbb43('0x2c')][_0xbb43('0x2d')]=_0x2ad6da['QD_simpleCart']['elements']['add'](_0x405f36);_0x596a62=_0xbb43('0x3')===typeof _0x596a62?!0x1:_0x596a62;var _0x26915a={'cartQtt':'.qd_cart_qtt','cartTotal':'.qd_cart_total','itemsText':_0xbb43('0x2e'),'currencySymbol':(_0x2ad6da(_0xbb43('0x2f'))[_0xbb43('0x30')](_0xbb43('0x31'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x3f9e7f=_0x2ad6da['extend']({},_0x26915a,_0xc577ac);var _0x249b6a=_0x2ad6da('');_0x405f36[_0xbb43('0x32')](function(){var _0x2cd8b8=_0x2ad6da(this);_0x2cd8b8[_0xbb43('0x14')](_0xbb43('0x33'))||_0x2cd8b8['data'](_0xbb43('0x33'),_0x3f9e7f);});var _0x4f0f13=function(_0x1c076f){window[_0xbb43('0x34')]=window['_QuatroDigital_CartData']||{};for(var _0x4511d9=0x0,_0x5e854b=0x0,_0x1fcf64=0x0;_0x1fcf64<_0x1c076f[_0xbb43('0x35')][_0xbb43('0x8')];_0x1fcf64++)_0xbb43('0x36')==_0x1c076f['totalizers'][_0x1fcf64]['id']&&(_0x5e854b+=_0x1c076f[_0xbb43('0x35')][_0x1fcf64][_0xbb43('0x37')]),_0x4511d9+=_0x1c076f['totalizers'][_0x1fcf64][_0xbb43('0x37')];window['_QuatroDigital_CartData'][_0xbb43('0x38')]=_0x3f9e7f[_0xbb43('0x39')]+qd_number_format(_0x4511d9/0x64,0x2,',','.');window[_0xbb43('0x34')][_0xbb43('0x3a')]=_0x3f9e7f[_0xbb43('0x39')]+qd_number_format(_0x5e854b/0x64,0x2,',','.');window[_0xbb43('0x34')]['allTotal']=_0x3f9e7f[_0xbb43('0x39')]+qd_number_format((_0x4511d9+_0x5e854b)/0x64,0x2,',','.');window['_QuatroDigital_CartData'][_0xbb43('0x3b')]=0x0;if(_0x3f9e7f[_0xbb43('0x3c')])for(_0x1fcf64=0x0;_0x1fcf64<_0x1c076f[_0xbb43('0x3d')][_0xbb43('0x8')];_0x1fcf64++)window['_QuatroDigital_CartData'][_0xbb43('0x3b')]+=_0x1c076f[_0xbb43('0x3d')][_0x1fcf64][_0xbb43('0x3e')];else window[_0xbb43('0x34')][_0xbb43('0x3b')]=_0x1c076f[_0xbb43('0x3d')][_0xbb43('0x8')]||0x0;try{window[_0xbb43('0x34')]['callback']&&window[_0xbb43('0x34')][_0xbb43('0x3f')]['fire']&&window[_0xbb43('0x34')]['callback']['fire']();}catch(_0x4d7034){_0x205011('Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart');}_0x73d4ce(_0x249b6a);};var _0x1c3482=function(_0x5a649b,_0x19c451){0x1===_0x5a649b?_0x19c451['hide']()[_0xbb43('0x40')](_0xbb43('0x41'))[_0xbb43('0x42')]():_0x19c451['hide']()[_0xbb43('0x40')]('.plural')[_0xbb43('0x42')]();};var _0x2518bf=function(_0xd43d24){0x1>_0xd43d24?_0x405f36[_0xbb43('0x43')](_0xbb43('0x44')):_0x405f36[_0xbb43('0x45')](_0xbb43('0x44'));};var _0x5ee191=function(_0x93f6e7,_0x26ea59){var _0x202059=parseInt(window[_0xbb43('0x34')]['qtt'],0xa);_0x26ea59[_0xbb43('0x46')][_0xbb43('0x42')]();isNaN(_0x202059)&&(_0x205011(_0xbb43('0x47'),_0xbb43('0x26')),_0x202059=0x0);_0x26ea59['cartTotalE'][_0xbb43('0x48')](window[_0xbb43('0x34')][_0xbb43('0x38')]);_0x26ea59['cartQttE'][_0xbb43('0x48')](_0x202059);_0x1c3482(_0x202059,_0x26ea59[_0xbb43('0x49')]);_0x2518bf(_0x202059);};var _0x73d4ce=function(_0x1dc40a){_0x405f36[_0xbb43('0x32')](function(){var _0x59c805={};var _0x4cd4cd=_0x2ad6da(this);_0x4511d9&&_0x4cd4cd[_0xbb43('0x14')]('qd_simpleCartOpts')&&_0x2ad6da[_0xbb43('0x12')](_0x3f9e7f,_0x4cd4cd[_0xbb43('0x14')]('qd_simpleCartOpts'));_0x59c805[_0xbb43('0x46')]=_0x4cd4cd;_0x59c805[_0xbb43('0x4a')]=_0x4cd4cd[_0xbb43('0x4b')](_0x3f9e7f[_0xbb43('0x4c')])||_0x249b6a;_0x59c805[_0xbb43('0x4d')]=_0x4cd4cd['find'](_0x3f9e7f[_0xbb43('0x4e')])||_0x249b6a;_0x59c805['itemsTextE']=_0x4cd4cd['find'](_0x3f9e7f[_0xbb43('0x4f')])||_0x249b6a;_0x59c805[_0xbb43('0x50')]=_0x4cd4cd[_0xbb43('0x4b')](_0x3f9e7f[_0xbb43('0x51')])||_0x249b6a;_0x5ee191(_0x1dc40a,_0x59c805);_0x4cd4cd[_0xbb43('0x43')]('qd-sc-populated');});};(function(){if(_0x3f9e7f['smartCheckout']){window[_0xbb43('0x52')]=window[_0xbb43('0x52')]||{};if(_0xbb43('0x3')!==typeof window[_0xbb43('0x52')][_0xbb43('0x23')]&&(_0x596a62||!_0x4511d9))return _0x4f0f13(window[_0xbb43('0x52')][_0xbb43('0x23')]);if(_0xbb43('0x25')!==typeof window[_0xbb43('0x53')]||'undefined'===typeof window[_0xbb43('0x53')][_0xbb43('0x22')])if(_0xbb43('0x25')===typeof vtex&&_0xbb43('0x25')===typeof vtex[_0xbb43('0x22')]&&_0xbb43('0x3')!==typeof vtex[_0xbb43('0x22')][_0xbb43('0x54')])new vtex[(_0xbb43('0x22'))]['SDK']();else return _0x205011('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x2ad6da[_0xbb43('0x55')]([_0xbb43('0x3d'),_0xbb43('0x35'),_0xbb43('0x56')],{'done':function(_0x38814a){_0x4f0f13(_0x38814a);window[_0xbb43('0x52')][_0xbb43('0x23')]=_0x38814a;},'fail':function(_0x51d702){_0x205011([_0xbb43('0x57'),_0x51d702]);}});}else alert('Esta\x20é\x20uma\x20função\x20descontinuada\x20=/');}());_0x3f9e7f['callback']();_0x2ad6da(window)[_0xbb43('0x58')](_0xbb43('0x59'));return _0x405f36;};_0x2ad6da[_0xbb43('0x2c')]={'elements':_0x2ad6da('')};_0x2ad6da(function(){var _0x22ce17;_0xbb43('0xa')===typeof window[_0xbb43('0x5a')]&&(_0x22ce17=window[_0xbb43('0x5a')],window[_0xbb43('0x5a')]=function(_0x51b076,_0x4f2631,_0x21a94e,_0x2b96b8,_0x137e75){_0x22ce17[_0xbb43('0x5b')](this,_0x51b076,_0x4f2631,_0x21a94e,_0x2b96b8,function(){_0xbb43('0xa')===typeof _0x137e75&&_0x137e75();_0x2ad6da[_0xbb43('0x2c')][_0xbb43('0x2d')][_0xbb43('0x32')](function(){var _0x3ca6ad=_0x2ad6da(this);_0x3ca6ad['simpleCart'](_0x3ca6ad[_0xbb43('0x14')](_0xbb43('0x33')));});});});});var _0x234bc7=window[_0xbb43('0x5c')]||void 0x0;window[_0xbb43('0x5c')]=function(_0x33a4db){_0x2ad6da['fn']['simpleCart'](!0x0);_0xbb43('0xa')===typeof _0x234bc7?_0x234bc7[_0xbb43('0x5b')](this,_0x33a4db):alert(_0x33a4db);};_0x2ad6da(function(){var _0x42e437=_0x2ad6da(_0xbb43('0x5d'));_0x42e437[_0xbb43('0x8')]&&_0x42e437['simpleCart']();});_0x2ad6da(function(){_0x2ad6da(window)[_0xbb43('0x5e')](_0xbb43('0x5f'),function(){_0x2ad6da['fn'][_0xbb43('0x21')](!0x0);});});}catch(_0x231b11){_0xbb43('0x3')!==typeof console&&_0xbb43('0xa')===typeof console[_0xbb43('0x11')]&&console[_0xbb43('0x11')](_0xbb43('0x60'),_0x231b11);}}}());(function(){var _0x3ab906=function(_0x2478fb,_0x37d6d7){if(_0xbb43('0x25')===typeof console){var _0x352482='object'===typeof _0x2478fb;'undefined'!==typeof _0x37d6d7&&_0xbb43('0x26')===_0x37d6d7[_0xbb43('0x2a')]()?_0x352482?console['warn'](_0xbb43('0x61'),_0x2478fb[0x0],_0x2478fb[0x1],_0x2478fb[0x2],_0x2478fb[0x3],_0x2478fb[0x4],_0x2478fb[0x5],_0x2478fb[0x6],_0x2478fb[0x7]):console[_0xbb43('0x27')](_0xbb43('0x61')+_0x2478fb):_0xbb43('0x3')!==typeof _0x37d6d7&&_0xbb43('0x29')===_0x37d6d7[_0xbb43('0x2a')]()?_0x352482?console[_0xbb43('0x29')](_0xbb43('0x61'),_0x2478fb[0x0],_0x2478fb[0x1],_0x2478fb[0x2],_0x2478fb[0x3],_0x2478fb[0x4],_0x2478fb[0x5],_0x2478fb[0x6],_0x2478fb[0x7]):console[_0xbb43('0x29')](_0xbb43('0x61')+_0x2478fb):_0x352482?console[_0xbb43('0x11')](_0xbb43('0x61'),_0x2478fb[0x0],_0x2478fb[0x1],_0x2478fb[0x2],_0x2478fb[0x3],_0x2478fb[0x4],_0x2478fb[0x5],_0x2478fb[0x6],_0x2478fb[0x7]):console[_0xbb43('0x11')](_0xbb43('0x61')+_0x2478fb);}},_0x580e75=null,_0xa5e4bc={},_0x58b618={},_0x2b9e5d={};$['QD_checkoutQueue']=function(_0x504a1f,_0x21d610){if(null===_0x580e75)if(_0xbb43('0x25')===typeof window[_0xbb43('0x53')]&&'undefined'!==typeof window[_0xbb43('0x53')][_0xbb43('0x22')])_0x580e75=window[_0xbb43('0x53')][_0xbb43('0x22')];else return _0x3ab906(_0xbb43('0x62'));var _0x4923c0=$[_0xbb43('0x12')]({'done':function(){},'fail':function(){}},_0x21d610),_0x3925f9=_0x504a1f['join'](';'),_0x3086b2=function(){_0xa5e4bc[_0x3925f9][_0xbb43('0x2b')](_0x4923c0[_0xbb43('0x63')]);_0x58b618[_0x3925f9][_0xbb43('0x2b')](_0x4923c0[_0xbb43('0x1a')]);};_0x2b9e5d[_0x3925f9]?_0x3086b2():(_0xa5e4bc[_0x3925f9]=$[_0xbb43('0x64')](),_0x58b618[_0x3925f9]=$[_0xbb43('0x64')](),_0x3086b2(),_0x2b9e5d[_0x3925f9]=!0x0,_0x580e75[_0xbb43('0x23')](_0x504a1f)[_0xbb43('0x63')](function(_0x14a8d8){_0x2b9e5d[_0x3925f9]=!0x1;_0xa5e4bc[_0x3925f9][_0xbb43('0x65')](_0x14a8d8);})[_0xbb43('0x1a')](function(_0x5f3f5c){_0x2b9e5d[_0x3925f9]=!0x1;_0x58b618[_0x3925f9][_0xbb43('0x65')](_0x5f3f5c);}));};}());(function(_0x29abcd){try{var _0x2d439f=jQuery,_0x461a2a,_0x34c1cd=_0x2d439f({}),_0x4ce918=function(_0x53ef20,_0x915a0a){if(_0xbb43('0x25')===typeof console&&_0xbb43('0x3')!==typeof console[_0xbb43('0x11')]&&_0xbb43('0x3')!==typeof console[_0xbb43('0x29')]&&_0xbb43('0x3')!==typeof console['warn']){var _0x3a5d49;_0xbb43('0x25')===typeof _0x53ef20?(_0x53ef20[_0xbb43('0x66')]('[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a'),_0x3a5d49=_0x53ef20):_0x3a5d49=[_0xbb43('0x67')+_0x53ef20];if('undefined'===typeof _0x915a0a||_0xbb43('0x26')!==_0x915a0a['toLowerCase']()&&_0xbb43('0x68')!==_0x915a0a[_0xbb43('0x2a')]())if(_0xbb43('0x3')!==typeof _0x915a0a&&_0xbb43('0x29')===_0x915a0a[_0xbb43('0x2a')]())try{console[_0xbb43('0x29')][_0xbb43('0x69')](console,_0x3a5d49);}catch(_0x2a2e7d){try{console['info'](_0x3a5d49[_0xbb43('0x9')]('\x0a'));}catch(_0x337c9a){}}else try{console['error'][_0xbb43('0x69')](console,_0x3a5d49);}catch(_0x5cd482){try{console[_0xbb43('0x11')](_0x3a5d49['join']('\x0a'));}catch(_0x16e7ca){}}else try{console[_0xbb43('0x27')][_0xbb43('0x69')](console,_0x3a5d49);}catch(_0x416e28){try{console[_0xbb43('0x27')](_0x3a5d49[_0xbb43('0x9')]('\x0a'));}catch(_0x4f356d){}}}},_0x49c0e2={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0xbb43('0x6a'),'buyQtt':'input.buy-in-page-quantity','selectSkuMsg':_0xbb43('0x6b'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0xf58a07,_0x4b2a47,_0x3e2e84){_0x2d439f(_0xbb43('0x6c'))['is']('.productQuickView')&&('success'===_0x4b2a47?alert(_0xbb43('0x6d')):(alert(_0xbb43('0x6e')),(_0xbb43('0x25')===typeof parent?parent:document)[_0xbb43('0x6f')][_0xbb43('0x70')]=_0x3e2e84));},'isProductPage':function(){return _0x2d439f(_0xbb43('0x6c'))['is'](_0xbb43('0x71'));},'execDefaultAction':function(_0x3551fa){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x2d439f[_0xbb43('0x72')]=function(_0xe568a3,_0x5ce941){function _0x180a2a(_0x104ce3){_0x461a2a[_0xbb43('0x73')]?_0x104ce3['data']('qd-bb-click-active')||(_0x104ce3[_0xbb43('0x14')](_0xbb43('0x74'),0x1),_0x104ce3['on'](_0xbb43('0x75'),function(_0x3c1e5a){if(!_0x461a2a['allowBuyClick']())return!0x0;if(!0x0!==_0x4ef475[_0xbb43('0x76')]['call'](this))return _0x3c1e5a[_0xbb43('0x77')](),!0x1;})):alert(_0xbb43('0x78'));}function _0x1bbf59(_0x5d606f){_0x5d606f=_0x5d606f||_0x2d439f(_0x461a2a[_0xbb43('0x79')]);_0x5d606f[_0xbb43('0x32')](function(){var _0x5d606f=_0x2d439f(this);_0x5d606f['is']('.qd-sbb-on')||(_0x5d606f[_0xbb43('0x43')](_0xbb43('0x7a')),_0x5d606f['is'](_0xbb43('0x7b'))&&!_0x5d606f['is'](_0xbb43('0x7c'))||_0x5d606f[_0xbb43('0x14')](_0xbb43('0x7d'))||(_0x5d606f[_0xbb43('0x14')](_0xbb43('0x7d'),0x1),_0x5d606f['children'](_0xbb43('0x7e'))[_0xbb43('0x8')]||_0x5d606f[_0xbb43('0x7f')](_0xbb43('0x80')),_0x5d606f['is']('.buy-in-page-button')&&_0x461a2a[_0xbb43('0x81')]()&&_0x828dc['call'](_0x5d606f),_0x180a2a(_0x5d606f)));});_0x461a2a['isProductPage']()&&!_0x5d606f[_0xbb43('0x8')]&&_0x4ce918(_0xbb43('0x82')+_0x5d606f[_0xbb43('0x83')]+'\x27.','info');}var _0x4f754a=_0x2d439f(_0xe568a3);var _0x4ef475=this;window[_0xbb43('0x84')]=window[_0xbb43('0x84')]||{};window[_0xbb43('0x34')]=window[_0xbb43('0x34')]||{};_0x4ef475[_0xbb43('0x85')]=function(_0x559b9b,_0x3ef85f){_0x4f754a['addClass'](_0xbb43('0x86'));_0x2d439f('body')['addClass']('qd-bb-lightBoxBodyProdAdd');var _0x5c78e0=_0x2d439f(_0x461a2a[_0xbb43('0x79')])['filter'](_0xbb43('0x87')+(_0x559b9b[_0xbb43('0x30')](_0xbb43('0x70'))||_0xbb43('0x88'))+'\x27]')[_0xbb43('0x2b')](_0x559b9b);_0x5c78e0[_0xbb43('0x43')](_0xbb43('0x89'));setTimeout(function(){_0x4f754a[_0xbb43('0x45')](_0xbb43('0x8a'));_0x5c78e0[_0xbb43('0x45')](_0xbb43('0x89'));},_0x461a2a['timeRemoveNewItemClass']);window[_0xbb43('0x84')][_0xbb43('0x23')]=void 0x0;if(_0xbb43('0x3')!==typeof _0x5ce941&&_0xbb43('0xa')===typeof _0x5ce941[_0xbb43('0x8b')])return _0x461a2a[_0xbb43('0x73')]||(_0x4ce918(_0xbb43('0x8c')),_0x5ce941[_0xbb43('0x8b')]()),window[_0xbb43('0x52')][_0xbb43('0x23')]=void 0x0,_0x5ce941[_0xbb43('0x8b')](function(_0x502b36){window['_Quatro_Digital_dropDown'][_0xbb43('0x23')]=_0x502b36;_0x2d439f['fn'][_0xbb43('0x21')](!0x0,void 0x0,!0x0);},{'lastSku':_0x3ef85f});window['_Quatro_Digital_dropDown'][_0xbb43('0x8d')]=!0x0;_0x2d439f['fn']['simpleCart'](!0x0);};(function(){if(_0x461a2a[_0xbb43('0x73')]&&_0x461a2a[_0xbb43('0x8e')]){var _0x436b48=_0x2d439f(_0xbb43('0x7b'));_0x436b48[_0xbb43('0x8')]&&_0x1bbf59(_0x436b48);}}());var _0x828dc=function(){var _0x51f16a=_0x2d439f(this);_0xbb43('0x3')!==typeof _0x51f16a[_0xbb43('0x14')](_0xbb43('0x79'))?(_0x51f16a[_0xbb43('0x8f')](_0xbb43('0x90')),_0x180a2a(_0x51f16a)):(_0x51f16a[_0xbb43('0x5e')](_0xbb43('0x91'),function(_0x23e216){_0x51f16a[_0xbb43('0x8f')](_0xbb43('0x90'));_0x180a2a(_0x51f16a);_0x2d439f(this)[_0xbb43('0x8f')](_0x23e216);}),_0x2d439f(window)[_0xbb43('0x92')](function(){_0x51f16a[_0xbb43('0x8f')](_0xbb43('0x90'));_0x180a2a(_0x51f16a);_0x51f16a[_0xbb43('0x8f')]('mouseenter.qd_bb_buy_sc');}));};_0x4ef475[_0xbb43('0x76')]=function(){var _0x3cf923=_0x2d439f(this),_0xe568a3=_0x3cf923['attr'](_0xbb43('0x70'))||'';if(-0x1<_0xe568a3['indexOf'](_0x461a2a['selectSkuMsg']))return!0x0;_0xe568a3=_0xe568a3[_0xbb43('0x1')](/redirect\=(false|true)/gi,'')['replace']('?',_0xbb43('0x93'))[_0xbb43('0x1')](/\&\&/gi,'&');if(_0x461a2a[_0xbb43('0x94')](_0x3cf923))return _0x3cf923[_0xbb43('0x30')]('href',_0xe568a3[_0xbb43('0x1')](_0xbb43('0x95'),_0xbb43('0x96'))),!0x0;_0xe568a3=_0xe568a3['replace'](/http.?:/i,'');_0x34c1cd[_0xbb43('0x97')](function(_0x2a9ba7){if(!_0x461a2a['buyIfQuantityZeroed']&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0xbb43('0x98')](_0xe568a3))return _0x2a9ba7();var _0x54317a=function(_0x339304,_0x3ae5aa){var _0x1bbf59=_0xe568a3[_0xbb43('0x99')](/sku\=([0-9]+)/gi),_0x43a596=[];if(_0xbb43('0x25')===typeof _0x1bbf59&&null!==_0x1bbf59)for(var _0x146fa4=_0x1bbf59[_0xbb43('0x8')]-0x1;0x0<=_0x146fa4;_0x146fa4--){var _0xda0e5d=parseInt(_0x1bbf59[_0x146fa4][_0xbb43('0x1')](/sku\=/gi,''));isNaN(_0xda0e5d)||_0x43a596[_0xbb43('0x9a')](_0xda0e5d);}_0x461a2a[_0xbb43('0x9b')]['call'](this,_0x339304,_0x3ae5aa,_0xe568a3);_0x4ef475[_0xbb43('0x9c')][_0xbb43('0x5b')](this,_0x339304,_0x3ae5aa,_0xe568a3,_0x43a596);_0x4ef475[_0xbb43('0x85')](_0x3cf923,_0xe568a3[_0xbb43('0x7')]('ku=')[_0xbb43('0x9d')]()[_0xbb43('0x7')]('&')[_0xbb43('0x9e')]());_0xbb43('0xa')===typeof _0x461a2a[_0xbb43('0x9f')]&&_0x461a2a['asyncCallback'][_0xbb43('0x5b')](this);_0x2d439f(window)[_0xbb43('0x58')]('productAddedToCart');_0x2d439f(window)[_0xbb43('0x58')](_0xbb43('0xa0'));};_0x461a2a['fakeRequest']?(_0x54317a(null,_0xbb43('0x19')),_0x2a9ba7()):_0x2d439f[_0xbb43('0x18')]({'url':_0xe568a3,'complete':_0x54317a})[_0xbb43('0x1b')](function(){_0x2a9ba7();});});};_0x4ef475[_0xbb43('0x9c')]=function(_0x34aa53,_0x594b73,_0x20cfc9,_0xd88f2f){try{_0xbb43('0x19')===_0x594b73&&_0xbb43('0x25')===typeof window[_0xbb43('0xa1')]&&'function'===typeof window[_0xbb43('0xa1')]['_QuatroDigital_prodBuyCallback']&&window['parent'][_0xbb43('0xa2')](_0x34aa53,_0x594b73,_0x20cfc9,_0xd88f2f);}catch(_0x54fd3b){_0x4ce918(_0xbb43('0xa3'));}};_0x1bbf59();_0xbb43('0xa')===typeof _0x461a2a[_0xbb43('0x3f')]?_0x461a2a[_0xbb43('0x3f')]['call'](this):_0x4ce918('Callback\x20não\x20é\x20uma\x20função');};var _0x51eece=_0x2d439f[_0xbb43('0x64')]();_0x2d439f['fn'][_0xbb43('0x72')]=function(_0x3c2082,_0x3b7b8e){var _0x29abcd=_0x2d439f(this);_0xbb43('0x3')!==typeof _0x3b7b8e||_0xbb43('0x25')!==typeof _0x3c2082||_0x3c2082 instanceof _0x2d439f||(_0x3b7b8e=_0x3c2082,_0x3c2082=void 0x0);_0x461a2a=_0x2d439f[_0xbb43('0x12')]({},_0x49c0e2,_0x3b7b8e);var _0x4d2c51;_0x51eece[_0xbb43('0x2b')](function(){_0x29abcd['children'](_0xbb43('0xa4'))[_0xbb43('0x8')]||_0x29abcd[_0xbb43('0xa5')](_0xbb43('0xa6'));_0x4d2c51=new _0x2d439f[(_0xbb43('0x72'))](_0x29abcd,_0x3c2082);});_0x51eece[_0xbb43('0x65')]();_0x2d439f(window)['on'](_0xbb43('0xa7'),function(_0x3b1d17,_0x1be5c1,_0x55b883){_0x4d2c51[_0xbb43('0x85')](_0x1be5c1,_0x55b883);});return _0x2d439f[_0xbb43('0x12')](_0x29abcd,_0x4d2c51);};var _0xc1f2c=0x0;_0x2d439f(document)[_0xbb43('0xa8')](function(_0x53549d,_0xf9973e,_0x5455be){-0x1<_0x5455be[_0xbb43('0xa9')][_0xbb43('0x2a')]()[_0xbb43('0xaa')](_0xbb43('0xab'))&&(_0xc1f2c=(_0x5455be[_0xbb43('0xa9')][_0xbb43('0x99')](/sku\=([0-9]+)/i)||[''])[_0xbb43('0x9d')]());});_0x2d439f(window)[_0xbb43('0x5e')](_0xbb43('0xac'),function(){_0x2d439f(window)['trigger'](_0xbb43('0xa7'),[new _0x2d439f(),_0xc1f2c]);});_0x2d439f(document)[_0xbb43('0xad')](function(){_0x51eece[_0xbb43('0x65')]();});}catch(_0x4933f7){_0xbb43('0x3')!==typeof console&&'function'===typeof console['error']&&console[_0xbb43('0x11')](_0xbb43('0x60'),_0x4933f7);}}(this));function qd_number_format(_0x524085,_0x15ce03,_0x48d864,_0x2d1b62){_0x524085=(_0x524085+'')[_0xbb43('0x1')](/[^0-9+\-Ee.]/g,'');_0x524085=isFinite(+_0x524085)?+_0x524085:0x0;_0x15ce03=isFinite(+_0x15ce03)?Math[_0xbb43('0x2')](_0x15ce03):0x0;_0x2d1b62='undefined'===typeof _0x2d1b62?',':_0x2d1b62;_0x48d864='undefined'===typeof _0x48d864?'.':_0x48d864;var _0x421626='',_0x421626=function(_0x3c7f41,_0x16c235){var _0x13dfba=Math['pow'](0xa,_0x16c235);return''+(Math[_0xbb43('0x5')](_0x3c7f41*_0x13dfba)/_0x13dfba)[_0xbb43('0x6')](_0x16c235);},_0x421626=(_0x15ce03?_0x421626(_0x524085,_0x15ce03):''+Math[_0xbb43('0x5')](_0x524085))[_0xbb43('0x7')]('.');0x3<_0x421626[0x0][_0xbb43('0x8')]&&(_0x421626[0x0]=_0x421626[0x0][_0xbb43('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x2d1b62));(_0x421626[0x1]||'')['length']<_0x15ce03&&(_0x421626[0x1]=_0x421626[0x1]||'',_0x421626[0x1]+=Array(_0x15ce03-_0x421626[0x1]['length']+0x1)[_0xbb43('0x9')]('0'));return _0x421626[_0xbb43('0x9')](_0x48d864);}(function(){try{window['_QuatroDigital_CartData']=window['_QuatroDigital_CartData']||{},window[_0xbb43('0x34')]['callback']=window[_0xbb43('0x34')][_0xbb43('0x3f')]||$[_0xbb43('0x64')]();}catch(_0x45798b){'undefined'!==typeof console&&_0xbb43('0xa')===typeof console[_0xbb43('0x11')]&&console[_0xbb43('0x11')](_0xbb43('0x60'),_0x45798b[_0xbb43('0x1e')]);}}());(function(_0x1b9091){try{var _0x49729d=jQuery,_0x493308=function(_0x764581,_0x3a8237){if(_0xbb43('0x25')===typeof console&&_0xbb43('0x3')!==typeof console[_0xbb43('0x11')]&&'undefined'!==typeof console['info']&&_0xbb43('0x3')!==typeof console[_0xbb43('0x27')]){var _0x45d0a4;'object'===typeof _0x764581?(_0x764581[_0xbb43('0x66')](_0xbb43('0xae')),_0x45d0a4=_0x764581):_0x45d0a4=[_0xbb43('0xae')+_0x764581];if('undefined'===typeof _0x3a8237||_0xbb43('0x26')!==_0x3a8237['toLowerCase']()&&_0xbb43('0x68')!==_0x3a8237[_0xbb43('0x2a')]())if(_0xbb43('0x3')!==typeof _0x3a8237&&'info'===_0x3a8237[_0xbb43('0x2a')]())try{console[_0xbb43('0x29')][_0xbb43('0x69')](console,_0x45d0a4);}catch(_0x284693){try{console[_0xbb43('0x29')](_0x45d0a4[_0xbb43('0x9')]('\x0a'));}catch(_0x339b30){}}else try{console[_0xbb43('0x11')][_0xbb43('0x69')](console,_0x45d0a4);}catch(_0x38f5a6){try{console[_0xbb43('0x11')](_0x45d0a4[_0xbb43('0x9')]('\x0a'));}catch(_0x3795b5){}}else try{console[_0xbb43('0x27')]['apply'](console,_0x45d0a4);}catch(_0x406dba){try{console[_0xbb43('0x27')](_0x45d0a4[_0xbb43('0x9')]('\x0a'));}catch(_0x2069d1){}}}};window[_0xbb43('0x52')]=window[_0xbb43('0x52')]||{};window[_0xbb43('0x52')][_0xbb43('0x8d')]=!0x0;_0x49729d[_0xbb43('0xaf')]=function(){};_0x49729d['fn'][_0xbb43('0xaf')]=function(){return{'fn':new _0x49729d()};};var _0x2dd161=function(_0x2d2127){var _0x3c537a={'t':_0xbb43('0xb0')};return function(_0x199b58){var _0x357e45=function(_0x2ad2ca){return _0x2ad2ca;};var _0x4bbc5c=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x199b58=_0x199b58['d'+_0x4bbc5c[0x10]+'c'+_0x4bbc5c[0x11]+'m'+_0x357e45(_0x4bbc5c[0x1])+'n'+_0x4bbc5c[0xd]]['l'+_0x4bbc5c[0x12]+'c'+_0x4bbc5c[0x0]+'ti'+_0x357e45('o')+'n'];var _0x3034fa=function(_0x50fb39){return escape(encodeURIComponent(_0x50fb39['replace'](/\./g,'¨')[_0xbb43('0x1')](/[a-zA-Z]/g,function(_0x1be4de){return String['fromCharCode'](('Z'>=_0x1be4de?0x5a:0x7a)>=(_0x1be4de=_0x1be4de['charCodeAt'](0x0)+0xd)?_0x1be4de:_0x1be4de-0x1a);})));};var _0x1b9091=_0x3034fa(_0x199b58[[_0x4bbc5c[0x9],_0x357e45('o'),_0x4bbc5c[0xc],_0x4bbc5c[_0x357e45(0xd)]][_0xbb43('0x9')]('')]);_0x3034fa=_0x3034fa((window[['js',_0x357e45('no'),'m',_0x4bbc5c[0x1],_0x4bbc5c[0x4]['toUpperCase'](),_0xbb43('0xb1')]['join']('')]||_0xbb43('0x88'))+['.v',_0x4bbc5c[0xd],'e',_0x357e45('x'),'co',_0x357e45('mm'),'erc',_0x4bbc5c[0x1],'.c',_0x357e45('o'),'m.',_0x4bbc5c[0x13],'r'][_0xbb43('0x9')](''));for(var _0x5fdbcd in _0x3c537a){if(_0x3034fa===_0x5fdbcd+_0x3c537a[_0x5fdbcd]||_0x1b9091===_0x5fdbcd+_0x3c537a[_0x5fdbcd]){var _0x591ffe='tr'+_0x4bbc5c[0x11]+'e';break;}_0x591ffe='f'+_0x4bbc5c[0x0]+'ls'+_0x357e45(_0x4bbc5c[0x1])+'';}_0x357e45=!0x1;-0x1<_0x199b58[[_0x4bbc5c[0xc],'e',_0x4bbc5c[0x0],'rc',_0x4bbc5c[0x9]][_0xbb43('0x9')]('')][_0xbb43('0xaa')](_0xbb43('0xb2'))&&(_0x357e45=!0x0);return[_0x591ffe,_0x357e45];}(_0x2d2127);}(window);if(!eval(_0x2dd161[0x0]))return _0x2dd161[0x1]?_0x493308(_0xbb43('0xb3')):!0x1;_0x49729d[_0xbb43('0xaf')]=function(_0x582793,_0x6b0dd){var _0x240d76=_0x49729d(_0x582793);if(!_0x240d76[_0xbb43('0x8')])return _0x240d76;var _0x29be83=_0x49729d[_0xbb43('0x12')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':_0xbb43('0xb4'),'cartTotal':_0xbb43('0xb5'),'emptyCart':_0xbb43('0xb6'),'continueShopping':'Continuar\x20Comprando','shippingForm':'<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x28a9a0){return _0x28a9a0[_0xbb43('0xb7')]||_0x28a9a0[_0xbb43('0xb8')];},'callback':function(){},'callbackProductsList':function(){}},_0x6b0dd);_0x49729d('');var _0x51df86=this;if(_0x29be83['smartCheckout']){var _0x43d2da=!0x1;_0xbb43('0x3')===typeof window[_0xbb43('0x53')]&&(_0x493308(_0xbb43('0xb9')),_0x49729d[_0xbb43('0x18')]({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':!0x1,'dataType':_0xbb43('0xba'),'error':function(){_0x493308(_0xbb43('0xbb'));_0x43d2da=!0x0;}}));if(_0x43d2da)return _0x493308(_0xbb43('0xbc'));}if(_0xbb43('0x25')===typeof window[_0xbb43('0x53')]&&_0xbb43('0x3')!==typeof window['vtexjs'][_0xbb43('0x22')])var _0x6802e0=window[_0xbb43('0x53')]['checkout'];else if(_0xbb43('0x25')===typeof vtex&&'object'===typeof vtex[_0xbb43('0x22')]&&_0xbb43('0x3')!==typeof vtex[_0xbb43('0x22')][_0xbb43('0x54')])_0x6802e0=new vtex['checkout'][(_0xbb43('0x54'))]();else return _0x493308('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x51df86[_0xbb43('0xbd')]=_0xbb43('0xbe');var _0x10962e=function(_0x1d3095){_0x49729d(this)[_0xbb43('0x7f')](_0x1d3095);_0x1d3095['find'](_0xbb43('0xbf'))[_0xbb43('0x2b')](_0x49729d(_0xbb43('0xc0')))['on'](_0xbb43('0xc1'),function(){_0x240d76[_0xbb43('0x45')]('qd-bb-lightBoxProdAdd');_0x49729d(document[_0xbb43('0x6c')])[_0xbb43('0x45')](_0xbb43('0xc2'));});_0x49729d(document)['off'](_0xbb43('0xc3'))['on']('keyup.qd_ddc_closeFn',function(_0x49c89f){0x1b==_0x49c89f['keyCode']&&(_0x240d76['removeClass'](_0xbb43('0xc4')),_0x49729d(document['body'])[_0xbb43('0x45')](_0xbb43('0xc2')));});var _0x20be22=_0x1d3095[_0xbb43('0x4b')]('.qd-ddc-prodWrapper');_0x1d3095[_0xbb43('0x4b')](_0xbb43('0xc5'))['on']('click.qd_ddc_scrollUp',function(){_0x51df86[_0xbb43('0xc6')]('-',void 0x0,void 0x0,_0x20be22);return!0x1;});_0x1d3095[_0xbb43('0x4b')]('.qd-ddc-scrollDown')['on']('click.qd_ddc_scrollDown',function(){_0x51df86[_0xbb43('0xc6')](void 0x0,void 0x0,void 0x0,_0x20be22);return!0x1;});_0x1d3095[_0xbb43('0x4b')](_0xbb43('0xc7'))['val']('')['on'](_0xbb43('0xc8'),function(){_0x51df86['shippingCalculate'](_0x49729d(this));});if(_0x29be83[_0xbb43('0xc9')]){var _0x6b0dd=0x0;_0x49729d(this)['on'](_0xbb43('0xca'),function(){var _0x1d3095=function(){window['_QuatroDigital_DropDown'][_0xbb43('0x8d')]&&(_0x51df86[_0xbb43('0x8b')](),window[_0xbb43('0x52')][_0xbb43('0x8d')]=!0x1,_0x49729d['fn'][_0xbb43('0x21')](!0x0),_0x51df86['cartIsEmpty']());};_0x6b0dd=setInterval(function(){_0x1d3095();},0x258);_0x1d3095();});_0x49729d(this)['on'](_0xbb43('0xcb'),function(){clearInterval(_0x6b0dd);});}};var _0x26eed7=function(_0x4e070e){_0x4e070e=_0x49729d(_0x4e070e);_0x29be83['texts'][_0xbb43('0x4e')]=_0x29be83['texts'][_0xbb43('0x4e')][_0xbb43('0x1')](_0xbb43('0xcc'),_0xbb43('0xcd'));_0x29be83[_0xbb43('0xce')][_0xbb43('0x4e')]=_0x29be83[_0xbb43('0xce')][_0xbb43('0x4e')][_0xbb43('0x1')](_0xbb43('0xcf'),'<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>');_0x29be83[_0xbb43('0xce')][_0xbb43('0x4e')]=_0x29be83[_0xbb43('0xce')]['cartTotal'][_0xbb43('0x1')](_0xbb43('0xd0'),_0xbb43('0xd1'));_0x29be83[_0xbb43('0xce')][_0xbb43('0x4e')]=_0x29be83['texts'][_0xbb43('0x4e')]['replace']('#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0x4e070e['find'](_0xbb43('0xd2'))[_0xbb43('0x48')](_0x29be83[_0xbb43('0xce')][_0xbb43('0xd3')]);_0x4e070e[_0xbb43('0x4b')](_0xbb43('0xd4'))[_0xbb43('0x48')](_0x29be83['texts'][_0xbb43('0xd5')]);_0x4e070e[_0xbb43('0x4b')](_0xbb43('0xd6'))[_0xbb43('0x48')](_0x29be83[_0xbb43('0xce')][_0xbb43('0xd7')]);_0x4e070e[_0xbb43('0x4b')](_0xbb43('0xd8'))[_0xbb43('0x48')](_0x29be83[_0xbb43('0xce')][_0xbb43('0x4e')]);_0x4e070e['find']('.qd-ddc-shipping')[_0xbb43('0x48')](_0x29be83[_0xbb43('0xce')][_0xbb43('0xd9')]);_0x4e070e[_0xbb43('0x4b')]('.qd-ddc-emptyCart\x20p')[_0xbb43('0x48')](_0x29be83[_0xbb43('0xce')][_0xbb43('0x51')]);return _0x4e070e;}(this[_0xbb43('0xbd')]);var _0x54f2b1=0x0;_0x240d76['each'](function(){0x0<_0x54f2b1?_0x10962e[_0xbb43('0x5b')](this,_0x26eed7['clone']()):_0x10962e['call'](this,_0x26eed7);_0x54f2b1++;});window[_0xbb43('0x34')][_0xbb43('0x3f')][_0xbb43('0x2b')](function(){_0x49729d(_0xbb43('0xda'))['html'](window[_0xbb43('0x34')][_0xbb43('0x38')]||'--');_0x49729d(_0xbb43('0xdb'))['html'](window[_0xbb43('0x34')][_0xbb43('0x3b')]||'0');_0x49729d(_0xbb43('0xdc'))[_0xbb43('0x48')](window[_0xbb43('0x34')][_0xbb43('0x3a')]||'--');_0x49729d('.qd-ddc-infoAllTotal')[_0xbb43('0x48')](window['_QuatroDigital_CartData'][_0xbb43('0xdd')]||'--');});var _0x1ec000=function(_0x36a180,_0x30b80a){if(_0xbb43('0x3')===typeof _0x36a180[_0xbb43('0x3d')])return _0x493308('Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição');_0x51df86[_0xbb43('0xde')][_0xbb43('0x5b')](this,_0x30b80a);};_0x51df86['getCartInfoByUrl']=function(_0x41dff1,_0x94f837){_0xbb43('0x3')!=typeof _0x94f837?window[_0xbb43('0x52')][_0xbb43('0xdf')]=_0x94f837:window[_0xbb43('0x52')][_0xbb43('0xdf')]&&(_0x94f837=window[_0xbb43('0x52')]['dataOptionsCache']);setTimeout(function(){window[_0xbb43('0x52')][_0xbb43('0xdf')]=void 0x0;},_0x29be83[_0xbb43('0xe0')]);_0x49729d(_0xbb43('0xe1'))['removeClass'](_0xbb43('0xe2'));if(_0x29be83[_0xbb43('0xe3')]){var _0x6b0dd=function(_0x994450){window[_0xbb43('0x52')][_0xbb43('0x23')]=_0x994450;_0x1ec000(_0x994450,_0x94f837);_0xbb43('0x3')!==typeof window[_0xbb43('0xe4')]&&_0xbb43('0xa')===typeof window[_0xbb43('0xe4')]['exec']&&window[_0xbb43('0xe4')][_0xbb43('0xe5')][_0xbb43('0x5b')](this);_0x49729d('.qd-ddc-wrapper')[_0xbb43('0x43')](_0xbb43('0xe2'));};_0xbb43('0x3')!==typeof window[_0xbb43('0x52')][_0xbb43('0x23')]?(_0x6b0dd(window['_QuatroDigital_DropDown'][_0xbb43('0x23')]),_0xbb43('0xa')===typeof _0x41dff1&&_0x41dff1(window[_0xbb43('0x52')][_0xbb43('0x23')])):_0x49729d[_0xbb43('0x55')]([_0xbb43('0x3d'),'totalizers',_0xbb43('0x56')],{'done':function(_0x243a0f){_0x6b0dd[_0xbb43('0x5b')](this,_0x243a0f);_0xbb43('0xa')===typeof _0x41dff1&&_0x41dff1(_0x243a0f);},'fail':function(_0x342dd0){_0x493308([_0xbb43('0xe6'),_0x342dd0]);}});}else alert(_0xbb43('0xe7'));};_0x51df86[_0xbb43('0xe8')]=function(){var _0x29e63f=_0x49729d(_0xbb43('0xe1'));_0x29e63f[_0xbb43('0x4b')](_0xbb43('0xe9'))[_0xbb43('0x8')]?_0x29e63f[_0xbb43('0x45')]('qd-ddc-noItems'):_0x29e63f[_0xbb43('0x43')](_0xbb43('0xea'));};_0x51df86[_0xbb43('0xde')]=function(_0x32722e){var _0x6b0dd=_0x49729d(_0xbb43('0xeb'));_0x6b0dd['empty']();_0x6b0dd[_0xbb43('0x32')](function(){var _0x6b0dd=_0x49729d(this),_0x582793,_0x2e5543,_0x2c9c9c=_0x49729d(''),_0xed629c;for(_0xed629c in window[_0xbb43('0x52')][_0xbb43('0x23')][_0xbb43('0x3d')])if('object'===typeof window[_0xbb43('0x52')][_0xbb43('0x23')][_0xbb43('0x3d')][_0xed629c]){var _0x435691=window[_0xbb43('0x52')]['getOrderForm'][_0xbb43('0x3d')][_0xed629c];var _0x58ac0d=_0x435691['productCategoryIds']['replace'](/^\/|\/$/g,'')[_0xbb43('0x7')]('/');var _0x340adb=_0x49729d('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0x340adb['attr']({'data-sku':_0x435691['id'],'data-sku-index':_0xed629c,'data-qd-departament':_0x58ac0d[0x0],'data-qd-category':_0x58ac0d[_0x58ac0d[_0xbb43('0x8')]-0x1]});_0x340adb['addClass'](_0xbb43('0xec')+_0x435691[_0xbb43('0xed')]);_0x340adb[_0xbb43('0x4b')](_0xbb43('0xee'))[_0xbb43('0x7f')](_0x29be83['skuName'](_0x435691));_0x340adb[_0xbb43('0x4b')](_0xbb43('0xef'))[_0xbb43('0x7f')](isNaN(_0x435691[_0xbb43('0xf0')])?_0x435691[_0xbb43('0xf0')]:0x0==_0x435691[_0xbb43('0xf0')]?'Grátis':(_0x49729d(_0xbb43('0x2f'))[_0xbb43('0x30')](_0xbb43('0x31'))||'R$')+'\x20'+qd_number_format(_0x435691[_0xbb43('0xf0')]/0x64,0x2,',','.'));_0x340adb[_0xbb43('0x4b')]('.qd-ddc-quantity')[_0xbb43('0x30')]({'data-sku':_0x435691['id'],'data-sku-index':_0xed629c})[_0xbb43('0xf1')](_0x435691[_0xbb43('0x3e')]);_0x340adb[_0xbb43('0x4b')](_0xbb43('0xf2'))[_0xbb43('0x30')]({'data-sku':_0x435691['id'],'data-sku-index':_0xed629c});_0x51df86[_0xbb43('0xf3')](_0x435691['id'],_0x340adb[_0xbb43('0x4b')](_0xbb43('0xf4')),_0x435691['imageUrl']);_0x340adb[_0xbb43('0x4b')](_0xbb43('0xf5'))[_0xbb43('0x30')]({'data-sku':_0x435691['id'],'data-sku-index':_0xed629c});_0x340adb[_0xbb43('0xf6')](_0x6b0dd);_0x2c9c9c=_0x2c9c9c[_0xbb43('0x2b')](_0x340adb);}try{var _0x23f7f9=_0x6b0dd[_0xbb43('0x0')]('.qd-ddc-wrapper')[_0xbb43('0x4b')]('.qd-ddc-shipping\x20input');_0x23f7f9[_0xbb43('0x8')]&&''==_0x23f7f9['val']()&&window[_0xbb43('0x52')][_0xbb43('0x23')][_0xbb43('0x56')][_0xbb43('0xf7')]&&_0x23f7f9[_0xbb43('0xf1')](window['_QuatroDigital_DropDown']['getOrderForm']['shippingData'][_0xbb43('0xf7')][_0xbb43('0xf8')]);}catch(_0x4ef366){_0x493308('Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20'+_0x4ef366[_0xbb43('0x1e')],_0xbb43('0x68'));}_0x51df86[_0xbb43('0xf9')](_0x6b0dd);_0x51df86[_0xbb43('0xe8')]();_0x32722e&&_0x32722e[_0xbb43('0xfa')]&&function(){_0x2e5543=_0x2c9c9c['filter'](_0xbb43('0xfb')+_0x32722e[_0xbb43('0xfa')]+'\x27]');_0x2e5543['length']&&(_0x582793=0x0,_0x2c9c9c['each'](function(){var _0x32722e=_0x49729d(this);if(_0x32722e['is'](_0x2e5543))return!0x1;_0x582793+=_0x32722e[_0xbb43('0xfc')]();}),_0x51df86[_0xbb43('0xc6')](void 0x0,void 0x0,_0x582793,_0x6b0dd['add'](_0x6b0dd[_0xbb43('0xa1')]())),_0x2c9c9c['removeClass'](_0xbb43('0xfd')),function(_0x21d8fd){_0x21d8fd[_0xbb43('0x43')](_0xbb43('0xfe'));_0x21d8fd[_0xbb43('0x43')]('qd-ddc-lastAddedFixed');setTimeout(function(){_0x21d8fd[_0xbb43('0x45')](_0xbb43('0xfe'));},_0x29be83[_0xbb43('0xe0')]);}(_0x2e5543));}();});(function(){_QuatroDigital_DropDown[_0xbb43('0x23')][_0xbb43('0x3d')]['length']?(_0x49729d(_0xbb43('0x6c'))[_0xbb43('0x45')]('qd-ddc-cart-empty')['addClass'](_0xbb43('0xff')),setTimeout(function(){_0x49729d(_0xbb43('0x6c'))['removeClass']('qd-ddc-product-add-time');},_0x29be83[_0xbb43('0xe0')])):_0x49729d(_0xbb43('0x6c'))[_0xbb43('0x45')](_0xbb43('0x100'))['addClass'](_0xbb43('0x101'));}());'function'===typeof _0x29be83[_0xbb43('0x102')]?_0x29be83[_0xbb43('0x102')][_0xbb43('0x5b')](this):_0x493308('callbackProductsList\x20não\x20é\x20uma\x20função');};_0x51df86[_0xbb43('0xf3')]=function(_0x584f8a,_0x3272a2,_0x3cddb6){function _0x639a3(){_0x3272a2[_0xbb43('0x45')](_0xbb43('0x103'))['load'](function(){_0x49729d(this)[_0xbb43('0x43')]('qd-loaded');})[_0xbb43('0x30')](_0xbb43('0x104'),_0x3cddb6);}_0x3cddb6?_0x639a3():isNaN(_0x584f8a)?_0x493308(_0xbb43('0x105'),_0xbb43('0x26')):alert('Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.');};_0x51df86[_0xbb43('0xf9')]=function(_0x2ec383){var _0x4d3d11=function(_0x120e18,_0x4fd70a){var _0x6b0dd=_0x49729d(_0x120e18);var _0x68f023=_0x6b0dd[_0xbb43('0x30')]('data-sku');var _0x582793=_0x6b0dd[_0xbb43('0x30')]('data-sku-index');if(_0x68f023){var _0x20c7ad=parseInt(_0x6b0dd['val']())||0x1;_0x51df86[_0xbb43('0x106')]([_0x68f023,_0x582793],_0x20c7ad,_0x20c7ad+0x1,function(_0x1f1eb4){_0x6b0dd[_0xbb43('0xf1')](_0x1f1eb4);_0xbb43('0xa')===typeof _0x4fd70a&&_0x4fd70a();});}};var _0x6b0dd=function(_0x25189f,_0xa1e9ba){var _0x6b0dd=_0x49729d(_0x25189f);var _0x58d41d=_0x6b0dd[_0xbb43('0x30')](_0xbb43('0x107'));var _0x582793=_0x6b0dd[_0xbb43('0x30')]('data-sku-index');if(_0x58d41d){var _0x2df568=parseInt(_0x6b0dd[_0xbb43('0xf1')]())||0x2;_0x51df86[_0xbb43('0x106')]([_0x58d41d,_0x582793],_0x2df568,_0x2df568-0x1,function(_0x360eb5){_0x6b0dd[_0xbb43('0xf1')](_0x360eb5);_0xbb43('0xa')===typeof _0xa1e9ba&&_0xa1e9ba();});}};var _0x5651c9=function(_0x570b2d,_0x49e4c8){var _0x6b0dd=_0x49729d(_0x570b2d);var _0x5389d9=_0x6b0dd[_0xbb43('0x30')](_0xbb43('0x107'));var _0x582793=_0x6b0dd[_0xbb43('0x30')](_0xbb43('0x108'));if(_0x5389d9){var _0xea8659=parseInt(_0x6b0dd[_0xbb43('0xf1')]())||0x1;_0x51df86[_0xbb43('0x106')]([_0x5389d9,_0x582793],0x1,_0xea8659,function(_0x5c795b){_0x6b0dd[_0xbb43('0xf1')](_0x5c795b);_0xbb43('0xa')===typeof _0x49e4c8&&_0x49e4c8();});}};var _0x582793=_0x2ec383['find'](_0xbb43('0x109'));_0x582793['addClass'](_0xbb43('0x10a'))[_0xbb43('0x32')](function(){var _0x2ec383=_0x49729d(this);_0x2ec383[_0xbb43('0x4b')](_0xbb43('0x10b'))['on']('click.qd_ddc_more',function(_0x28d38c){_0x28d38c['preventDefault']();_0x582793['addClass']('qd-loading');_0x4d3d11(_0x2ec383['find'](_0xbb43('0x10c')),function(){_0x582793[_0xbb43('0x45')](_0xbb43('0x10d'));});});_0x2ec383[_0xbb43('0x4b')](_0xbb43('0x10e'))['on'](_0xbb43('0x10f'),function(_0x240bf5){_0x240bf5[_0xbb43('0x77')]();_0x582793['addClass'](_0xbb43('0x10d'));_0x6b0dd(_0x2ec383[_0xbb43('0x4b')](_0xbb43('0x10c')),function(){_0x582793[_0xbb43('0x45')](_0xbb43('0x10d'));});});_0x2ec383[_0xbb43('0x4b')]('.qd-ddc-quantity')['on']('focusout.qd_ddc_change',function(){_0x582793[_0xbb43('0x43')](_0xbb43('0x10d'));_0x5651c9(this,function(){_0x582793[_0xbb43('0x45')]('qd-loading');});});_0x2ec383[_0xbb43('0x4b')](_0xbb43('0x10c'))['on'](_0xbb43('0x110'),function(_0x410100){0xd==_0x410100['keyCode']&&(_0x582793[_0xbb43('0x43')]('qd-loading'),_0x5651c9(this,function(){_0x582793[_0xbb43('0x45')](_0xbb43('0x10d'));}));});});_0x2ec383[_0xbb43('0x4b')]('.qd-ddc-prodRow')[_0xbb43('0x32')](function(){var _0x2ec383=_0x49729d(this);_0x2ec383[_0xbb43('0x4b')]('.qd-ddc-remove')['on']('click.qd_ddc_remove',function(){_0x2ec383[_0xbb43('0x43')](_0xbb43('0x10d'));_0x51df86['removeProduct'](_0x49729d(this),function(_0x312c22){_0x312c22?_0x2ec383[_0xbb43('0x111')](!0x0)['slideUp'](function(){_0x2ec383['remove']();_0x51df86['cartIsEmpty']();}):_0x2ec383[_0xbb43('0x45')]('qd-loading');});return!0x1;});});};_0x51df86[_0xbb43('0x112')]=function(_0xeeac0a){var _0x4d40dc=_0xeeac0a[_0xbb43('0xf1')](),_0x4d40dc=_0x4d40dc[_0xbb43('0x1')](/[^0-9\-]/g,''),_0x4d40dc=_0x4d40dc[_0xbb43('0x1')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0xbb43('0x113')),_0x4d40dc=_0x4d40dc[_0xbb43('0x1')](/(.{9}).*/g,'$1');_0xeeac0a[_0xbb43('0xf1')](_0x4d40dc);0x9<=_0x4d40dc[_0xbb43('0x8')]&&(_0xeeac0a['data']('qdDdcLastPostalCode')!=_0x4d40dc&&_0x6802e0['calculateShipping']({'postalCode':_0x4d40dc,'country':_0xbb43('0x114')})[_0xbb43('0x63')](function(_0x582f65){window['_QuatroDigital_DropDown']['getOrderForm']=_0x582f65;_0x51df86[_0xbb43('0x8b')]();})[_0xbb43('0x1a')](function(_0x486dda){_0x493308([_0xbb43('0x115'),_0x486dda]);updateCartData();}),_0xeeac0a[_0xbb43('0x14')]('qdDdcLastPostalCode',_0x4d40dc));};_0x51df86[_0xbb43('0x106')]=function(_0x24790f,_0x4b5596,_0x7fc21c,_0x4fe4b7){function _0x572a83(_0x17d827){_0x17d827=_0xbb43('0x116')!==typeof _0x17d827?!0x1:_0x17d827;_0x51df86[_0xbb43('0x8b')]();window[_0xbb43('0x52')][_0xbb43('0x8d')]=!0x1;_0x51df86[_0xbb43('0xe8')]();_0xbb43('0x3')!==typeof window['_QuatroDigital_AmountProduct']&&_0xbb43('0xa')===typeof window[_0xbb43('0xe4')]['exec']&&window[_0xbb43('0xe4')][_0xbb43('0xe5')][_0xbb43('0x5b')](this);'function'===typeof adminCart&&adminCart();_0x49729d['fn'][_0xbb43('0x21')](!0x0,void 0x0,_0x17d827);_0xbb43('0xa')===typeof _0x4fe4b7&&_0x4fe4b7(_0x4b5596);}_0x7fc21c=_0x7fc21c||0x1;if(0x1>_0x7fc21c)return _0x4b5596;if(_0x29be83[_0xbb43('0xe3')]){if(_0xbb43('0x3')===typeof window[_0xbb43('0x52')]['getOrderForm'][_0xbb43('0x3d')][_0x24790f[0x1]])return _0x493308(_0xbb43('0x117')+_0x24790f[0x1]+']'),_0x4b5596;window['_QuatroDigital_DropDown'][_0xbb43('0x23')][_0xbb43('0x3d')][_0x24790f[0x1]][_0xbb43('0x3e')]=_0x7fc21c;window[_0xbb43('0x52')][_0xbb43('0x23')][_0xbb43('0x3d')][_0x24790f[0x1]][_0xbb43('0x118')]=_0x24790f[0x1];_0x6802e0[_0xbb43('0x119')]([window[_0xbb43('0x52')][_0xbb43('0x23')]['items'][_0x24790f[0x1]]],[_0xbb43('0x3d'),_0xbb43('0x35'),_0xbb43('0x56')])[_0xbb43('0x63')](function(_0x5cce0f){window['_QuatroDigital_DropDown'][_0xbb43('0x23')]=_0x5cce0f;_0x572a83(!0x0);})[_0xbb43('0x1a')](function(_0x415866){_0x493308([_0xbb43('0x11a'),_0x415866]);_0x572a83();});}else _0x493308(_0xbb43('0x11b'));};_0x51df86[_0xbb43('0x11c')]=function(_0x353f95,_0x574325){function _0x3f800d(_0x262099){_0x262099=_0xbb43('0x116')!==typeof _0x262099?!0x1:_0x262099;_0xbb43('0x3')!==typeof window[_0xbb43('0xe4')]&&_0xbb43('0xa')===typeof window[_0xbb43('0xe4')][_0xbb43('0xe5')]&&window[_0xbb43('0xe4')][_0xbb43('0xe5')]['call'](this);'function'===typeof adminCart&&adminCart();_0x49729d['fn'][_0xbb43('0x21')](!0x0,void 0x0,_0x262099);'function'===typeof _0x574325&&_0x574325(_0x582793);}var _0x582793=!0x1,_0x1562a7=_0x49729d(_0x353f95)[_0xbb43('0x30')]('data-sku-index');if(_0x29be83[_0xbb43('0xe3')]){if(_0xbb43('0x3')===typeof window[_0xbb43('0x52')][_0xbb43('0x23')][_0xbb43('0x3d')][_0x1562a7])return _0x493308(_0xbb43('0x117')+_0x1562a7+']'),_0x582793;window[_0xbb43('0x52')]['getOrderForm'][_0xbb43('0x3d')][_0x1562a7]['index']=_0x1562a7;_0x6802e0[_0xbb43('0x11d')]([window['_QuatroDigital_DropDown'][_0xbb43('0x23')][_0xbb43('0x3d')][_0x1562a7]],[_0xbb43('0x3d'),_0xbb43('0x35'),_0xbb43('0x56')])[_0xbb43('0x63')](function(_0x4b9dbc){_0x582793=!0x0;window[_0xbb43('0x52')]['getOrderForm']=_0x4b9dbc;_0x1ec000(_0x4b9dbc);_0x3f800d(!0x0);})['fail'](function(_0x533465){_0x493308([_0xbb43('0x11e'),_0x533465]);_0x3f800d();});}else alert(_0xbb43('0x11f'));};_0x51df86[_0xbb43('0xc6')]=function(_0x1e3640,_0xd587e7,_0x13c848,_0x34357e){_0x34357e=_0x34357e||_0x49729d(_0xbb43('0x120'));_0x1e3640=_0x1e3640||'+';_0xd587e7=_0xd587e7||0.9*_0x34357e[_0xbb43('0x121')]();_0x34357e[_0xbb43('0x111')](!0x0,!0x0)['animate']({'scrollTop':isNaN(_0x13c848)?_0x1e3640+'='+_0xd587e7+'px':_0x13c848});};_0x29be83[_0xbb43('0xc9')]||(_0x51df86[_0xbb43('0x8b')](),_0x49729d['fn'][_0xbb43('0x21')](!0x0));_0x49729d(window)['on']('productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex',function(){try{window[_0xbb43('0x52')]['getOrderForm']=void 0x0,_0x51df86['getCartInfoByUrl']();}catch(_0x390dc9){_0x493308(_0xbb43('0x122')+_0x390dc9['message'],'avisso');}});_0xbb43('0xa')===typeof _0x29be83[_0xbb43('0x3f')]?_0x29be83['callback']['call'](this):_0x493308('Callback\x20não\x20é\x20uma\x20função');};_0x49729d['fn']['QD_dropDownCart']=function(_0x333051){var _0x7fd200=_0x49729d(this);_0x7fd200['fn']=new _0x49729d[(_0xbb43('0xaf'))](this,_0x333051);return _0x7fd200;};}catch(_0x587c30){_0xbb43('0x3')!==typeof console&&_0xbb43('0xa')===typeof console['error']&&console['error'](_0xbb43('0x60'),_0x587c30);}}(this));(function(_0x5d03c9){try{var _0x3b3c66=jQuery;window[_0xbb43('0xe4')]=window[_0xbb43('0xe4')]||{};window['_QuatroDigital_AmountProduct'][_0xbb43('0x3d')]={};window[_0xbb43('0xe4')][_0xbb43('0x123')]=!0x1;window[_0xbb43('0xe4')]['buyButtonClicked']=!0x1;window[_0xbb43('0xe4')][_0xbb43('0x124')]=!0x1;var _0x42118a=function(){if(window[_0xbb43('0xe4')][_0xbb43('0x123')]){var _0x4f1962=!0x1;var _0x5d03c9={};window[_0xbb43('0xe4')][_0xbb43('0x3d')]={};for(_0x239445 in window[_0xbb43('0x52')][_0xbb43('0x23')][_0xbb43('0x3d')])if(_0xbb43('0x25')===typeof window[_0xbb43('0x52')][_0xbb43('0x23')]['items'][_0x239445]){var _0x51c2a3=window[_0xbb43('0x52')][_0xbb43('0x23')][_0xbb43('0x3d')][_0x239445];_0xbb43('0x3')!==typeof _0x51c2a3[_0xbb43('0x125')]&&null!==_0x51c2a3[_0xbb43('0x125')]&&''!==_0x51c2a3[_0xbb43('0x125')]&&(window[_0xbb43('0xe4')]['items']['prod_'+_0x51c2a3[_0xbb43('0x125')]]=window[_0xbb43('0xe4')][_0xbb43('0x3d')][_0xbb43('0x126')+_0x51c2a3[_0xbb43('0x125')]]||{},window[_0xbb43('0xe4')][_0xbb43('0x3d')]['prod_'+_0x51c2a3[_0xbb43('0x125')]][_0xbb43('0x127')]=_0x51c2a3['productId'],_0x5d03c9[_0xbb43('0x126')+_0x51c2a3[_0xbb43('0x125')]]||(window[_0xbb43('0xe4')]['items']['prod_'+_0x51c2a3[_0xbb43('0x125')]][_0xbb43('0x3b')]=0x0),window['_QuatroDigital_AmountProduct']['items']['prod_'+_0x51c2a3[_0xbb43('0x125')]][_0xbb43('0x3b')]+=_0x51c2a3[_0xbb43('0x3e')],_0x4f1962=!0x0,_0x5d03c9['prod_'+_0x51c2a3[_0xbb43('0x125')]]=!0x0);}var _0x239445=_0x4f1962;}else _0x239445=void 0x0;window['_QuatroDigital_AmountProduct']['allowRecalculate']&&(_0x3b3c66(_0xbb43('0x128'))[_0xbb43('0x129')](),_0x3b3c66('.qd-bap-item-added')[_0xbb43('0x45')](_0xbb43('0x12a')));for(var _0x34db98 in window[_0xbb43('0xe4')][_0xbb43('0x3d')]){_0x51c2a3=window['_QuatroDigital_AmountProduct'][_0xbb43('0x3d')][_0x34db98];if('object'!==typeof _0x51c2a3)return;_0x5d03c9=_0x3b3c66(_0xbb43('0x12b')+_0x51c2a3[_0xbb43('0x127')]+']')[_0xbb43('0x0')]('li');if(window['_QuatroDigital_AmountProduct'][_0xbb43('0x123')]||!_0x5d03c9[_0xbb43('0x4b')](_0xbb43('0x128'))[_0xbb43('0x8')])_0x4f1962=_0x3b3c66(_0xbb43('0x12c')),_0x4f1962[_0xbb43('0x4b')](_0xbb43('0x12d'))[_0xbb43('0x48')](_0x51c2a3[_0xbb43('0x3b')]),_0x51c2a3=_0x5d03c9[_0xbb43('0x4b')]('.qd_bap_wrapper_content'),_0x51c2a3[_0xbb43('0x8')]?_0x51c2a3[_0xbb43('0xa5')](_0x4f1962)[_0xbb43('0x43')](_0xbb43('0x12a')):_0x5d03c9['prepend'](_0x4f1962);}_0x239445&&(window['_QuatroDigital_AmountProduct'][_0xbb43('0x123')]=!0x1);};window[_0xbb43('0xe4')][_0xbb43('0xe5')]=function(){window['_QuatroDigital_AmountProduct'][_0xbb43('0x123')]=!0x0;_0x42118a['call'](this);};_0x3b3c66(document)[_0xbb43('0xad')](function(){_0x42118a[_0xbb43('0x5b')](this);});}catch(_0x4dc62f){_0xbb43('0x3')!==typeof console&&'function'===typeof console['error']&&console[_0xbb43('0x11')](_0xbb43('0x60'),_0x4dc62f);}}(this));(function(){try{var _0x397908=jQuery,_0x17e59a,_0x1174fe={'selector':_0xbb43('0x12e'),'dropDown':{},'buyButton':{}};_0x397908['QD_smartCart']=function(_0x57a95e){var _0x132390={};_0x17e59a=_0x397908[_0xbb43('0x12')](!0x0,{},_0x1174fe,_0x57a95e);_0x57a95e=_0x397908(_0x17e59a[_0xbb43('0x83')])[_0xbb43('0xaf')](_0x17e59a[_0xbb43('0x12f')]);_0x132390[_0xbb43('0x79')]=_0xbb43('0x3')!==typeof _0x17e59a[_0xbb43('0x12f')][_0xbb43('0xc9')]&&!0x1===_0x17e59a['dropDown']['updateOnlyHover']?_0x397908(_0x17e59a[_0xbb43('0x83')])['QD_buyButton'](_0x57a95e['fn'],_0x17e59a['buyButton']):_0x397908(_0x17e59a[_0xbb43('0x83')])[_0xbb43('0x72')](_0x17e59a[_0xbb43('0x79')]);_0x132390['dropDown']=_0x57a95e;return _0x132390;};_0x397908['fn'][_0xbb43('0x130')]=function(){_0xbb43('0x25')===typeof console&&_0xbb43('0xa')===typeof console[_0xbb43('0x29')]&&console[_0xbb43('0x29')](_0xbb43('0x131'));};_0x397908[_0xbb43('0x130')]=_0x397908['fn']['smartCart'];}catch(_0x38d6e5){'undefined'!==typeof console&&'function'===typeof console[_0xbb43('0x11')]&&console[_0xbb43('0x11')](_0xbb43('0x60'),_0x38d6e5);}}());

/* Quatro Digital - Product Thumbs // Carlos Vinicius // Todos os direitos reservados. */
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs();a.trigger("QuatroDigital.pt_callback",[a])}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return a.length?$.extend({},a,new b(a)):a},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0x4b09=['.produto','object','alerta','toLowerCase','warn','[Video\x20in\x20product]\x20','undefined','info','qdVideoInProduct','extend','http','ul.thumbs','div#image','videoFieldSelector','replace','split','length','indexOf','youtube','shift','push','be/','pop','<div\x20class=\x22qd-playerWrapper\x22></div>','prependTo','#include','wrap','<div\x20class=\x22qd-playerContainer\x22></div>','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','join','toUpperCase','ite','---','erc','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','html','<iframe\x20src=\x22','://www.youtube.com/embed/','?wmode=transparent&rel=0&enablejsapi=1\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>','data','height','stop','fadeTo','addClass','qdpv-video-on','add','animate','iframe','find','a:not(\x27.qd-videoLink\x27)','bind','click.removeVideo','hide','removeAttr','style','.qd-videoItem','call','string','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','click.playVideo','.ON','controlVideo','.qd-playerWrapper\x20iframe','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','attr','rel','a:not(.qd-videoLink)','click','contentWindow','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','start','insertThumbsIn','appendTo','trigger','load','ImageControl','body'];(function(_0x4116e3,_0x14eb3d){var _0x4376f8=function(_0x59f36c){while(--_0x59f36c){_0x4116e3['push'](_0x4116e3['shift']());}};_0x4376f8(++_0x14eb3d);}(_0x4b09,0xa3));var _0x94b0=function(_0x10f6e8,_0x351db6){_0x10f6e8=_0x10f6e8-0x0;var _0x35bb3c=_0x4b09[_0x10f6e8];return _0x35bb3c;};(function(_0x1e7534){$(function(){if($(document[_0x94b0('0x0')])['is'](_0x94b0('0x1'))){var _0x287631=[];var _0x28ac1d=function(_0x362486,_0x5601eb){_0x94b0('0x2')===typeof console&&('undefined'!==typeof _0x5601eb&&_0x94b0('0x3')===_0x5601eb[_0x94b0('0x4')]()?console[_0x94b0('0x5')](_0x94b0('0x6')+_0x362486):_0x94b0('0x7')!==typeof _0x5601eb&&_0x94b0('0x8')===_0x5601eb[_0x94b0('0x4')]()?console[_0x94b0('0x8')](_0x94b0('0x6')+_0x362486):console['error'](_0x94b0('0x6')+_0x362486));};window[_0x94b0('0x9')]=window[_0x94b0('0x9')]||{};var _0x3d0d15=$[_0x94b0('0xa')](!0x0,{'insertThumbsIn':'start','videoFieldSelector':'td.value-field.Videos:first','controlVideo':!0x0,'urlProtocol':_0x94b0('0xb')},window[_0x94b0('0x9')]);var _0x2807b6=$(_0x94b0('0xc'));var _0x5b31e9=$(_0x94b0('0xd'));var _0x48f68e=$(_0x3d0d15[_0x94b0('0xe')])['text']()[_0x94b0('0xf')](/\;\s*/,';')[_0x94b0('0x10')](';');for(var _0x29e3b8=0x0;_0x29e3b8<_0x48f68e[_0x94b0('0x11')];_0x29e3b8++)-0x1<_0x48f68e[_0x29e3b8][_0x94b0('0x12')](_0x94b0('0x13'))?_0x287631['push'](_0x48f68e[_0x29e3b8][_0x94b0('0x10')]('v=')['pop']()[_0x94b0('0x10')](/[&#]/)[_0x94b0('0x14')]()):-0x1<_0x48f68e[_0x29e3b8][_0x94b0('0x12')]('youtu.be')&&_0x287631[_0x94b0('0x15')](_0x48f68e[_0x29e3b8][_0x94b0('0x10')](_0x94b0('0x16'))[_0x94b0('0x17')]()[_0x94b0('0x10')](/[\?&#]/)['shift']());var _0x36e361=$(_0x94b0('0x18'));_0x36e361[_0x94b0('0x19')](_0x94b0('0x1a'));_0x36e361[_0x94b0('0x1b')](_0x94b0('0x1c'));_0x48f68e=function(_0x4fb8c0){var _0x343794={'t':_0x94b0('0x1d')};return function(_0x4268b5){var _0x35e694=function(_0x5624a0){return _0x5624a0;};var _0x172baf=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4268b5=_0x4268b5['d'+_0x172baf[0x10]+'c'+_0x172baf[0x11]+'m'+_0x35e694(_0x172baf[0x1])+'n'+_0x172baf[0xd]]['l'+_0x172baf[0x12]+'c'+_0x172baf[0x0]+'ti'+_0x35e694('o')+'n'];var _0x1d34bf=function(_0x4927dd){return escape(encodeURIComponent(_0x4927dd['replace'](/\./g,'¨')[_0x94b0('0xf')](/[a-zA-Z]/g,function(_0x2edd0b){return String[_0x94b0('0x1e')](('Z'>=_0x2edd0b?0x5a:0x7a)>=(_0x2edd0b=_0x2edd0b[_0x94b0('0x1f')](0x0)+0xd)?_0x2edd0b:_0x2edd0b-0x1a);})));};var _0x10eb25=_0x1d34bf(_0x4268b5[[_0x172baf[0x9],_0x35e694('o'),_0x172baf[0xc],_0x172baf[_0x35e694(0xd)]][_0x94b0('0x20')]('')]);_0x1d34bf=_0x1d34bf((window[['js',_0x35e694('no'),'m',_0x172baf[0x1],_0x172baf[0x4][_0x94b0('0x21')](),_0x94b0('0x22')][_0x94b0('0x20')]('')]||_0x94b0('0x23'))+['.v',_0x172baf[0xd],'e',_0x35e694('x'),'co',_0x35e694('mm'),_0x94b0('0x24'),_0x172baf[0x1],'.c',_0x35e694('o'),'m.',_0x172baf[0x13],'r']['join'](''));for(var _0x1db96c in _0x343794){if(_0x1d34bf===_0x1db96c+_0x343794[_0x1db96c]||_0x10eb25===_0x1db96c+_0x343794[_0x1db96c]){var _0x21015e='tr'+_0x172baf[0x11]+'e';break;}_0x21015e='f'+_0x172baf[0x0]+'ls'+_0x35e694(_0x172baf[0x1])+'';}_0x35e694=!0x1;-0x1<_0x4268b5[[_0x172baf[0xc],'e',_0x172baf[0x0],'rc',_0x172baf[0x9]][_0x94b0('0x20')]('')]['indexOf']('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x35e694=!0x0);return[_0x21015e,_0x35e694];}(_0x4fb8c0);}(window);if(!eval(_0x48f68e[0x0]))return _0x48f68e[0x1]?_0x28ac1d(_0x94b0('0x25')):!0x1;var _0x255608=function(_0xf72efb,_0x57104a){'youtube'===_0x57104a&&_0x36e361[_0x94b0('0x26')](_0x94b0('0x27')+_0x3d0d15['urlProtocol']+_0x94b0('0x28')+_0xf72efb+_0x94b0('0x29'));_0x5b31e9[_0x94b0('0x2a')](_0x94b0('0x2b'),_0x5b31e9[_0x94b0('0x2a')](_0x94b0('0x2b'))||_0x5b31e9[_0x94b0('0x2b')]());_0x5b31e9[_0x94b0('0x2c')](!0x0,!0x0)[_0x94b0('0x2d')](0x1f4,0x0,function(){$(_0x94b0('0x0'))[_0x94b0('0x2e')](_0x94b0('0x2f'));});_0x36e361[_0x94b0('0x2c')](!0x0,!0x0)[_0x94b0('0x2d')](0x1f4,0x1,function(){_0x5b31e9[_0x94b0('0x30')](_0x36e361)[_0x94b0('0x31')]({'height':_0x36e361['find'](_0x94b0('0x32'))[_0x94b0('0x2b')]()},0x2bc);});};removePlayer=function(){_0x2807b6[_0x94b0('0x33')](_0x94b0('0x34'))[_0x94b0('0x35')](_0x94b0('0x36'),function(){_0x36e361[_0x94b0('0x2c')](!0x0,!0x0)['fadeTo'](0x1f4,0x0,function(){$(this)[_0x94b0('0x37')]()[_0x94b0('0x38')](_0x94b0('0x39'));$(_0x94b0('0x0'))['removeClass']('qdpv-video-on');});_0x5b31e9['stop'](!0x0,!0x0)['fadeTo'](0x1f4,0x1,function(){var _0x4a0682=_0x5b31e9[_0x94b0('0x2a')](_0x94b0('0x2b'));_0x4a0682&&_0x5b31e9[_0x94b0('0x31')]({'height':_0x4a0682},0x2bc);});});};var _0x19821f=function(){if(!_0x2807b6[_0x94b0('0x33')](_0x94b0('0x3a'))[_0x94b0('0x11')])for(vId in removePlayer[_0x94b0('0x3b')](this),_0x287631)if(_0x94b0('0x3c')===typeof _0x287631[vId]&&''!==_0x287631[vId]){var _0x21a171=$(_0x94b0('0x3d')+_0x287631[vId]+'/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27'+_0x287631[vId]+_0x94b0('0x3e')+_0x287631[vId]+_0x94b0('0x3f'));_0x21a171[_0x94b0('0x33')]('a')[_0x94b0('0x35')](_0x94b0('0x40'),function(){var _0x245c36=$(this);_0x2807b6[_0x94b0('0x33')](_0x94b0('0x41'))['removeClass']('ON');_0x245c36['addClass']('ON');0x1==_0x3d0d15[_0x94b0('0x42')]?$('.qd-playerWrapper\x20iframe')['length']?(_0x255608['call'](this,'',''),$(_0x94b0('0x43'))[0x0]['contentWindow'][_0x94b0('0x44')](_0x94b0('0x45'),'*')):_0x255608[_0x94b0('0x3b')](this,_0x245c36[_0x94b0('0x46')](_0x94b0('0x47')),_0x94b0('0x13')):_0x255608[_0x94b0('0x3b')](this,_0x245c36['attr']('rel'),_0x94b0('0x13'));return!0x1;});0x1==_0x3d0d15[_0x94b0('0x42')]&&_0x2807b6[_0x94b0('0x33')](_0x94b0('0x48'))[_0x94b0('0x49')](function(_0xbdef08){$(_0x94b0('0x43'))[_0x94b0('0x11')]&&$(_0x94b0('0x43'))[0x0][_0x94b0('0x4a')][_0x94b0('0x44')](_0x94b0('0x4b'),'*');});_0x94b0('0x4c')===_0x3d0d15[_0x94b0('0x4d')]?_0x21a171[_0x94b0('0x19')](_0x2807b6):_0x21a171[_0x94b0('0x4e')](_0x2807b6);_0x21a171[_0x94b0('0x4f')]('QuatroDigital.pv_video_added',[_0x287631[vId],_0x21a171]);}};$(document)['ajaxStop'](_0x19821f);$(window)[_0x94b0('0x50')](_0x19821f);(function(){var _0x29ed2c=this;var _0x4629a8=window[_0x94b0('0x51')]||function(){};window[_0x94b0('0x51')]=function(_0x5e8f0b,_0x2ef88b){$(_0x5e8f0b||'')['is']('.qd-videoLink')||(_0x4629a8[_0x94b0('0x3b')](this,_0x5e8f0b,_0x2ef88b),_0x19821f[_0x94b0('0x3b')](_0x29ed2c));};}());}});}(this));

/* Quatro Digital - Mosaic Banners // Carlos Vinicius // Todos os direitos reservados */
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

