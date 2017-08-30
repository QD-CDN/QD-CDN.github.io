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
				autoplay: false,
				autoplaySpeed: 8000,
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
			var wrapper = $('.brand-carousel-qd-v1-carousel, .hotsite-videos-carousel-qd-v1-carousel');

			var slideShow = 6;
			var slideShowM = 2;

			if($("body").is(".hotsite")) {
				slideShow = 4;
				slideShowM = 1;
			} 

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
							slidesToScroll: slideShowM
						}
					},

					{
						breakpoint: 380,
						settings: {
							slidesToShow: slideShowM,
							slidesToScroll: slideShowM
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
				classFourColumn: "col-xs-12 col-sm-6 col-md-2"
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
		init: function() {
			Home.sliderFull();
			Home.applyBrandCarousel();
			Home.applyMosaicCategorieBanners();			
		},
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
var _0x8a87=['html','installments','installmentValue','changeInstallments','.qd_sp_display_installments','.qd_sp_display_installmentValue','.qd_sp_installments','.qd_saveAmount','.qd_saveAmountPercent','changeNativeSaveAmount','em.economia-de','each','skuSelected.vtex','startedByWrapper','call','forcePromotion','not','.qd_sp_processedItem','style','display:none\x20!important;','append','after','extend','.produto','function','prototype','trim','replace','undefined','pow','round','toFixed','split','length','join','QD_SmartPrice','Smart\x20Price','object','error','info','alerta','toLowerCase','apply','warn','text','search','[class*=\x27desconto\x27]','auto','strong.skuBestPrice','label.skuBestInstallmentNumber','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','productPage','isProductPage','closest','wrapperElement','filterFlagBy','find','skuBestPrice','qd-active','qd-sp-active','.qd_sp_on,\x20.qd_sp_ignored','.qd_active','removeClass','siblings','.qd_sp_on','addClass','qd_sp_ignored','qd_sp_on','isDiscountFlag','div[skuCorrente]:first','attr','skus','sku','available','bestPrice','isSmartCheckout','qd-sp-product-unavailable','.qd_productPrice','val','Por\x20alguma\x20razão\x20não\x20consegui\x20obter\x20o\x20preço\x20deste\x20produto\x20:(','appliedDiscount','getDiscountValue','listPrice','.qd_productOldPrice','changeNativePrice','skuPrice'];(function(_0x358841,_0x14cacd){var _0x1b3269=function(_0x8107bc){while(--_0x8107bc){_0x358841['push'](_0x358841['shift']());}};_0x1b3269(++_0x14cacd);}(_0x8a87,0x1e9));var _0x78a8=function(_0x67b075,_0x43557d){_0x67b075=_0x67b075-0x0;var _0x39d030=_0x8a87[_0x67b075];return _0x39d030;};_0x78a8('0x0')!==typeof String[_0x78a8('0x1')][_0x78a8('0x2')]&&(String[_0x78a8('0x1')][_0x78a8('0x2')]=function(){return this[_0x78a8('0x3')](/^\s+|\s+$/g,'');});function qd_number_format(_0x3fe093,_0x354c44,_0x2f4e73,_0x4d288f){_0x3fe093=(_0x3fe093+'')[_0x78a8('0x3')](/[^0-9+\-Ee.]/g,'');_0x3fe093=isFinite(+_0x3fe093)?+_0x3fe093:0x0;_0x354c44=isFinite(+_0x354c44)?Math['abs'](_0x354c44):0x0;_0x4d288f=_0x78a8('0x4')===typeof _0x4d288f?',':_0x4d288f;_0x2f4e73=_0x78a8('0x4')===typeof _0x2f4e73?'.':_0x2f4e73;var _0x1f81cd='',_0x1f81cd=function(_0x231ac7,_0x37fd0c){var _0x354c44=Math[_0x78a8('0x5')](0xa,_0x37fd0c);return''+(Math[_0x78a8('0x6')](_0x231ac7*_0x354c44)/_0x354c44)[_0x78a8('0x7')](_0x37fd0c);},_0x1f81cd=(_0x354c44?_0x1f81cd(_0x3fe093,_0x354c44):''+Math['round'](_0x3fe093))[_0x78a8('0x8')]('.');0x3<_0x1f81cd[0x0]['length']&&(_0x1f81cd[0x0]=_0x1f81cd[0x0][_0x78a8('0x3')](/\B(?=(?:\d{3})+(?!\d))/g,_0x4d288f));(_0x1f81cd[0x1]||'')[_0x78a8('0x9')]<_0x354c44&&(_0x1f81cd[0x1]=_0x1f81cd[0x1]||'',_0x1f81cd[0x1]+=Array(_0x354c44-_0x1f81cd[0x1]['length']+0x1)[_0x78a8('0xa')]('0'));return _0x1f81cd['join'](_0x2f4e73);};(function(_0x5c82ef){'use strict';var _0x177c8e=jQuery;if(typeof _0x177c8e['fn'][_0x78a8('0xb')]===_0x78a8('0x0'))return;var _0x51747f=_0x78a8('0xc');var _0x3cac82=function(_0x27e83e,_0x5b0493){if(_0x78a8('0xd')===typeof console&&_0x78a8('0x0')===typeof console[_0x78a8('0xe')]&&_0x78a8('0x0')===typeof console[_0x78a8('0xf')]&&_0x78a8('0x0')===typeof console['warn']){var _0x27aa88;_0x78a8('0xd')===typeof _0x27e83e?(_0x27e83e['unshift']('['+_0x51747f+']\x0a'),_0x27aa88=_0x27e83e):_0x27aa88=['['+_0x51747f+']\x0a'+_0x27e83e];if(_0x78a8('0x4')===typeof _0x5b0493||_0x78a8('0x10')!==_0x5b0493[_0x78a8('0x11')]()&&'aviso'!==_0x5b0493[_0x78a8('0x11')]())if(_0x78a8('0x4')!==typeof _0x5b0493&&_0x78a8('0xf')===_0x5b0493[_0x78a8('0x11')]())try{console[_0x78a8('0xf')]['apply'](console,_0x27aa88);}catch(_0x3212b6){console['info'](_0x27aa88[_0x78a8('0xa')]('\x0a'));}else try{console['error'][_0x78a8('0x12')](console,_0x27aa88);}catch(_0xf83b45){console[_0x78a8('0xe')](_0x27aa88[_0x78a8('0xa')]('\x0a'));}else try{console['warn'][_0x78a8('0x12')](console,_0x27aa88);}catch(_0x266625){console[_0x78a8('0x13')](_0x27aa88[_0x78a8('0xa')]('\x0a'));}}};var _0x1e2807=/[0-9]+\%/i;var _0x4a0e61=/[0-9\.]+(?=\%)/i;var _0x4c8b35={'isDiscountFlag':function(_0x2171a4){if(_0x2171a4[_0x78a8('0x14')]()[_0x78a8('0x15')](_0x1e2807)>-0x1)return!![];return![];},'getDiscountValue':function(_0x41a440){return _0x41a440['text']()['match'](_0x4a0e61);},'startedByWrapper':![],'flagElement':'.flag','wrapperElement':'li','filterFlagBy':_0x78a8('0x16'),'forcePromotion':null,'appliedDiscount':null,'oneFlagByItem':!![],'isSmartCheckout':!![],'changeInstallments':![],'productPage':{'changeNativeSaveAmount':!![],'changeNativePrice':!![],'changeInstallments':![],'isProductPage':_0x78a8('0x17'),'wrapperElement':'.productRightColumn','skuBestPrice':_0x78a8('0x18'),'installments':_0x78a8('0x19'),'installmentValue':'label.skuBestInstallmentValue','skuPrice':'strong.skuPrice'}};_0x177c8e['fn'][_0x78a8('0xb')]=function(){};var _0x5170ac=function(_0x255d78){var _0x2c25ad={'t':_0x78a8('0x1a')};return function(_0x46ffc9){var _0x2be069,_0x1c3d81,_0x310659,_0x17e0e3;_0x1c3d81=function(_0x1c98e1){return _0x1c98e1;};_0x310659=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x46ffc9=_0x46ffc9['d'+_0x310659[0x10]+'c'+_0x310659[0x11]+'m'+_0x1c3d81(_0x310659[0x1])+'n'+_0x310659[0xd]]['l'+_0x310659[0x12]+'c'+_0x310659[0x0]+'ti'+_0x1c3d81('o')+'n'];_0x2be069=function(_0x4de076){return escape(encodeURIComponent(_0x4de076[_0x78a8('0x3')](/\./g,'¨')[_0x78a8('0x3')](/[a-zA-Z]/g,function(_0x25de72){return String['fromCharCode'](('Z'>=_0x25de72?0x5a:0x7a)>=(_0x25de72=_0x25de72[_0x78a8('0x1b')](0x0)+0xd)?_0x25de72:_0x25de72-0x1a);})));};var _0x54617b=_0x2be069(_0x46ffc9[[_0x310659[0x9],_0x1c3d81('o'),_0x310659[0xc],_0x310659[_0x1c3d81(0xd)]][_0x78a8('0xa')]('')]);_0x2be069=_0x2be069((window[['js',_0x1c3d81('no'),'m',_0x310659[0x1],_0x310659[0x4][_0x78a8('0x1c')](),_0x78a8('0x1d')]['join']('')]||_0x78a8('0x1e'))+['.v',_0x310659[0xd],'e',_0x1c3d81('x'),'co',_0x1c3d81('mm'),_0x78a8('0x1f'),_0x310659[0x1],'.c',_0x1c3d81('o'),'m.',_0x310659[0x13],'r'][_0x78a8('0xa')](''));for(var _0x28afe3 in _0x2c25ad){if(_0x2be069===_0x28afe3+_0x2c25ad[_0x28afe3]||_0x54617b===_0x28afe3+_0x2c25ad[_0x28afe3]){_0x17e0e3='tr'+_0x310659[0x11]+'e';break;}_0x17e0e3='f'+_0x310659[0x0]+'ls'+_0x1c3d81(_0x310659[0x1])+'';}_0x1c3d81=!0x1;-0x1<_0x46ffc9[[_0x310659[0xc],'e',_0x310659[0x0],'rc',_0x310659[0x9]][_0x78a8('0xa')]('')][_0x78a8('0x20')](_0x78a8('0x21'))&&(_0x1c3d81=!0x0);return[_0x17e0e3,_0x1c3d81];}(_0x255d78);}(window);if(!eval(_0x5170ac[0x0]))return _0x5170ac[0x1]?_0x3cac82('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x465994=function(_0x5d3c29,_0x2c8e92){'use strict';var _0x288665=function(_0x5b4084){'use strict';var _0x2bad7f,_0x96492f,_0x489b98,_0x878fba,_0x5bc6a0,_0x5d4581,_0x5dce3c,_0x2e5d45,_0x4d18bb,_0x4aec10,_0x472fbe,_0x591878,_0x1638bf,_0xf42fc,_0xb0c89a,_0x249170,_0x6c0743,_0x1a5bf8,_0x505e4f;var _0x2c45e0=_0x177c8e(this);_0x5b4084=typeof _0x5b4084==='undefined'?![]:_0x5b4084;if(_0x2c8e92[_0x78a8('0x22')][_0x78a8('0x23')])var _0x502db9=_0x2c45e0[_0x78a8('0x24')](_0x2c8e92[_0x78a8('0x22')][_0x78a8('0x25')]);else var _0x502db9=_0x2c45e0['closest'](_0x2c8e92[_0x78a8('0x25')]);if(!_0x5b4084&&!_0x2c45e0['is'](_0x2c8e92[_0x78a8('0x26')])){if(_0x2c8e92[_0x78a8('0x22')][_0x78a8('0x23')]&&_0x502db9['is'](_0x2c8e92[_0x78a8('0x22')][_0x78a8('0x25')])){_0x502db9[_0x78a8('0x27')](_0x2c8e92[_0x78a8('0x22')][_0x78a8('0x28')])['addClass'](_0x78a8('0x29'));_0x502db9['addClass'](_0x78a8('0x2a'));}return;}var _0x319a39=_0x2c8e92[_0x78a8('0x22')][_0x78a8('0x23')];if(_0x2c45e0['is'](_0x78a8('0x2b'))&&!_0x319a39)return;if(_0x319a39){_0x2e5d45=_0x502db9[_0x78a8('0x27')](_0x2c8e92[_0x78a8('0x22')][_0x78a8('0x28')]);if(_0x2e5d45[_0x78a8('0x27')](_0x78a8('0x2c'))[_0x78a8('0x9')])return;_0x2e5d45[_0x78a8('0x2d')](_0x78a8('0x29'));_0x502db9[_0x78a8('0x2d')](_0x78a8('0x2a'));}if(_0x2c8e92['oneFlagByItem']&&_0x2c45e0[_0x78a8('0x2e')](_0x78a8('0x2f'))['length']){_0x2c45e0[_0x78a8('0x30')](_0x78a8('0x31'));return;}_0x2c45e0['addClass'](_0x78a8('0x32'));if(!_0x2c8e92[_0x78a8('0x33')](_0x2c45e0))return;if(_0x319a39){_0x489b98={};var _0x440bca=parseInt(_0x177c8e(_0x78a8('0x34'))[_0x78a8('0x35')]('skuCorrente'),0xa);if(_0x440bca){for(var _0xcab843=0x0;_0xcab843<skuJson[_0x78a8('0x36')][_0x78a8('0x9')];_0xcab843++){if(skuJson[_0x78a8('0x36')][_0xcab843][_0x78a8('0x37')]==_0x440bca){_0x489b98=skuJson[_0x78a8('0x36')][_0xcab843];break;}}}else{var _0x5803df=0x5af3107a3fff;for(var _0x443087 in skuJson['skus']){if(typeof skuJson[_0x78a8('0x36')][_0x443087]===_0x78a8('0x0'))continue;if(!skuJson[_0x78a8('0x36')][_0x443087][_0x78a8('0x38')])continue;if(skuJson[_0x78a8('0x36')][_0x443087][_0x78a8('0x39')]<_0x5803df){_0x5803df=skuJson[_0x78a8('0x36')][_0x443087][_0x78a8('0x39')];_0x489b98=skuJson[_0x78a8('0x36')][_0x443087];}}}}_0x249170=!![];_0x6c0743=0x0;if(_0x2c8e92[_0x78a8('0x3a')]&&_0x1a5bf8){_0x249170=skuJson['available'];if(!_0x249170)return _0x502db9[_0x78a8('0x30')](_0x78a8('0x3b'));}_0x96492f=_0x2c8e92['getDiscountValue'](_0x2c45e0);_0x2bad7f=parseFloat(_0x96492f,0xa);if(isNaN(_0x2bad7f))return _0x3cac82(['O\x20valor\x20informado\x20p/\x20o\x20desconto\x20não\x20é\x20um\x20número.',_0x2c45e0],_0x78a8('0x10'));var _0x44aa8e=function(_0xcc387f){if(_0x319a39)_0x878fba=(_0xcc387f['bestPrice']||0x0)/0x64;else{_0x1638bf=_0x502db9[_0x78a8('0x27')](_0x78a8('0x3c'));_0x878fba=parseFloat((_0x1638bf[_0x78a8('0x3d')]()||'')[_0x78a8('0x3')](/[^0-9\.\,]+/i,'')[_0x78a8('0x3')]('.','')[_0x78a8('0x3')](',','.'),0xa);}if(isNaN(_0x878fba))return _0x3cac82([_0x78a8('0x3e'),_0x2c45e0,_0x502db9]);if(_0x2c8e92['appliedDiscount']!==null){_0xf42fc=0x0;if(!isNaN(_0x2c8e92['appliedDiscount']))_0xf42fc=_0x2c8e92[_0x78a8('0x3f')];else{_0xb0c89a=_0x502db9[_0x78a8('0x27')](_0x2c8e92[_0x78a8('0x3f')]);if(_0xb0c89a['length'])_0xf42fc=_0x2c8e92[_0x78a8('0x40')](_0xb0c89a);}_0xf42fc=parseFloat(_0xf42fc,0xa);if(isNaN(_0xf42fc))_0xf42fc=0x0;if(_0xf42fc!==0x0)_0x878fba=_0x878fba*0x64/(0x64-_0xf42fc);}if(_0x319a39)_0x5bc6a0=(_0xcc387f[_0x78a8('0x41')]||0x0)/0x64;else _0x5bc6a0=parseFloat((_0x502db9[_0x78a8('0x27')](_0x78a8('0x42'))[_0x78a8('0x3d')]()||'')[_0x78a8('0x3')](/[^0-9\.\,]+/i,'')[_0x78a8('0x3')]('.','')[_0x78a8('0x3')](',','.'),0xa);if(isNaN(_0x5bc6a0))_0x5bc6a0=0.001;_0x5d4581=_0x878fba*((0x64-_0x2bad7f)/0x64);if(_0x319a39&&_0x2c8e92[_0x78a8('0x22')][_0x78a8('0x43')]){_0x2e5d45['text'](_0x2e5d45['text']()[_0x78a8('0x2')]()['replace'](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x5d4581,0x2,',','.')))[_0x78a8('0x30')]('qd-active');_0x502db9[_0x78a8('0x30')]('qd-sp-active');}else{_0x505e4f=_0x502db9[_0x78a8('0x27')]('.qd_displayPrice');_0x505e4f[_0x78a8('0x14')](_0x505e4f[_0x78a8('0x14')]()[_0x78a8('0x3')](/[0-9\.]+,[0-9]+/i,'')+qd_number_format(_0x5d4581,0x2,',','.'));}if(_0x319a39){_0x5dce3c=_0x502db9['find'](_0x2c8e92['productPage'][_0x78a8('0x44')]);if(_0x5dce3c[_0x78a8('0x9')])_0x5dce3c[_0x78a8('0x14')](_0x5dce3c[_0x78a8('0x14')]()['trim']()[_0x78a8('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x5d4581,0x2,',','.')));}var _0xb6d27d=_0x502db9[_0x78a8('0x27')]('.qd-sp-display-discount');_0xb6d27d[_0x78a8('0x14')](_0xb6d27d[_0x78a8('0x14')]()[_0x78a8('0x3')](/[0-9]+\%/i,_0x2bad7f+'%'));var _0x2e44ce=function(_0x4999b2,_0x302231,_0x3de86a){var _0xd4698f=_0x502db9[_0x78a8('0x27')](_0x4999b2);if(_0xd4698f['length'])_0xd4698f['html'](_0xd4698f[_0x78a8('0x45')]()['trim']()[_0x78a8('0x3')](/[0-9]{1,2}/,_0x3de86a?_0x3de86a:_0xcc387f[_0x78a8('0x46')]||0x0));var _0x4fd7c2=_0x502db9[_0x78a8('0x27')](_0x302231);if(_0x4fd7c2[_0x78a8('0x9')])_0x4fd7c2[_0x78a8('0x45')](_0x4fd7c2['html']()['trim']()[_0x78a8('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x5d4581/(_0x3de86a?_0x3de86a:_0xcc387f[_0x78a8('0x46')]||0x1),0x2,',','.')));};if(_0x319a39&&_0x2c8e92[_0x78a8('0x22')]['changeInstallments'])_0x2e44ce(_0x2c8e92[_0x78a8('0x22')]['installments'],_0x2c8e92['productPage'][_0x78a8('0x47')]);else if(_0x2c8e92[_0x78a8('0x48')])_0x2e44ce(_0x78a8('0x49'),_0x78a8('0x4a'),parseInt(_0x502db9['find'](_0x78a8('0x4b'))[_0x78a8('0x3d')]()||0x1)||0x1);_0x502db9['find'](_0x78a8('0x4c'))['append'](qd_number_format(_0x5bc6a0-_0x5d4581,0x2,',','.'));_0x502db9[_0x78a8('0x27')](_0x78a8('0x4d'))['prepend'](qd_number_format((_0x5bc6a0-_0x5d4581)*0x64/_0x5bc6a0,0x2,',','.'));if(_0x319a39&&_0x2c8e92[_0x78a8('0x22')][_0x78a8('0x4e')]){_0x177c8e(_0x78a8('0x4f'))[_0x78a8('0x50')](function(){_0x472fbe=_0x177c8e(this);_0x472fbe[_0x78a8('0x14')](_0x472fbe['text']()[_0x78a8('0x2')]()['replace'](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x5bc6a0-_0x5d4581,0x2,',','.')));_0x472fbe[_0x78a8('0x30')](_0x78a8('0x29'));});}};_0x44aa8e(_0x489b98);if(_0x319a39)_0x177c8e(window)['on'](_0x78a8('0x51'),function(_0x503117,_0x1fa7ba,_0x486e18){_0x44aa8e(_0x486e18);});_0x502db9['addClass']('qd_sp_processedItem');if(!_0x319a39)_0x1638bf[_0x78a8('0x30')]('qd_sp_processedItem');};(_0x2c8e92[_0x78a8('0x52')]?_0x5d3c29[_0x78a8('0x27')](_0x2c8e92['flagElement']):_0x5d3c29)[_0x78a8('0x50')](function(){_0x288665[_0x78a8('0x53')](this,![]);});if(typeof _0x2c8e92[_0x78a8('0x54')]=='string'){var _0x3a07ea=_0x2c8e92[_0x78a8('0x52')]?_0x5d3c29:_0x5d3c29[_0x78a8('0x24')](_0x2c8e92[_0x78a8('0x25')]);if(_0x2c8e92[_0x78a8('0x22')][_0x78a8('0x23')])_0x3a07ea=_0x3a07ea['closest'](_0x2c8e92[_0x78a8('0x22')][_0x78a8('0x25')])[_0x78a8('0x55')](_0x78a8('0x56'));else _0x3a07ea=_0x3a07ea[_0x78a8('0x27')]('.qd_productPrice:not(.qd_sp_processedItem)');_0x3a07ea[_0x78a8('0x50')](function(){var _0x342bfd=_0x177c8e(_0x2c8e92[_0x78a8('0x54')]);_0x342bfd['attr'](_0x78a8('0x57'),_0x78a8('0x58'));if(_0x2c8e92[_0x78a8('0x22')][_0x78a8('0x23')])_0x177c8e(this)[_0x78a8('0x59')](_0x342bfd);else _0x177c8e(this)[_0x78a8('0x5a')](_0x342bfd);_0x288665[_0x78a8('0x53')](_0x342bfd,!![]);});}};_0x177c8e['fn'][_0x78a8('0xb')]=function(_0x42684c){var _0xd580b0=_0x177c8e(this);if(!_0xd580b0[_0x78a8('0x9')])return _0xd580b0;var _0x25a1c3=_0x177c8e[_0x78a8('0x5b')](!![],{},_0x4c8b35,_0x42684c);if(typeof _0x25a1c3['productPage'][_0x78a8('0x23')]!='boolean')_0x25a1c3[_0x78a8('0x22')][_0x78a8('0x23')]=_0x177c8e(document['body'])['is'](_0x78a8('0x5c'));_0x465994(_0xd580b0,_0x25a1c3);return _0xd580b0;};}(this));
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
var _0xb2a0=['find','img[alt=\x27','attr','data-qdam-value','.box-banner','insertBefore','hide','qd-am-content-loaded','text','trim','[class*=\x27colunas\x27]','clone','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','ajaxCallback','call','QuatroDigital.am.ajaxCallback','UL\x20do\x20menu\x20não\x20encontrada','alerta','parent','qd-am-has-ul','children',':not(ul)','qd-am-elem-','replaceSpecialChars','>li','qd-amazing-menu','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','add','qd-am-','callback','getParent','function','QD_amazingMenu','/qd-amazing-menu','object','undefined','error','info','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','aviso','toLowerCase','join','apply','qdAmAddNdx','each','addClass','qd-am-li-','first','qd-am-last','replace','fromCharCode','charCodeAt','ite','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','.qd_am_code','.qd-am-banner','filter','.qd-am-collection','length','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','url'];(function(_0x245da2,_0x4daff3){var _0x25d2b0=function(_0x26f52a){while(--_0x26f52a){_0x245da2['push'](_0x245da2['shift']());}};_0x25d2b0(++_0x4daff3);}(_0xb2a0,0x69));var _0x0b2a=function(_0x270df7,_0x5e8bed){_0x270df7=_0x270df7-0x0;var _0x229d48=_0xb2a0[_0x270df7];return _0x229d48;};(function(_0x9dd341){_0x9dd341['fn'][_0x0b2a('0x0')]=_0x9dd341['fn']['closest'];}(jQuery));(function(_0x10f527){var _0x21e437;var _0x4306b0=jQuery;if(_0x0b2a('0x1')!==typeof _0x4306b0['fn'][_0x0b2a('0x2')]){var _0xf1b170={'url':_0x0b2a('0x3'),'callback':function(){},'ajaxCallback':function(){}};var _0x137424=function(_0x1f1915,_0x415eca){if(_0x0b2a('0x4')===typeof console&&_0x0b2a('0x5')!==typeof console[_0x0b2a('0x6')]&&'undefined'!==typeof console[_0x0b2a('0x7')]&&_0x0b2a('0x5')!==typeof console[_0x0b2a('0x8')]){var _0x28e4dd;'object'===typeof _0x1f1915?(_0x1f1915[_0x0b2a('0x9')](_0x0b2a('0xa')),_0x28e4dd=_0x1f1915):_0x28e4dd=['[QD\x20Amazing\x20Menu]\x0a'+_0x1f1915];if(_0x0b2a('0x5')===typeof _0x415eca||'alerta'!==_0x415eca['toLowerCase']()&&_0x0b2a('0xb')!==_0x415eca[_0x0b2a('0xc')]())if(_0x0b2a('0x5')!==typeof _0x415eca&&_0x0b2a('0x7')===_0x415eca[_0x0b2a('0xc')]())try{console[_0x0b2a('0x7')]['apply'](console,_0x28e4dd);}catch(_0x1bae53){try{console[_0x0b2a('0x7')](_0x28e4dd[_0x0b2a('0xd')]('\x0a'));}catch(_0x35b248){}}else try{console['error'][_0x0b2a('0xe')](console,_0x28e4dd);}catch(_0x129869){try{console[_0x0b2a('0x6')](_0x28e4dd[_0x0b2a('0xd')]('\x0a'));}catch(_0x5df8d4){}}else try{console[_0x0b2a('0x8')][_0x0b2a('0xe')](console,_0x28e4dd);}catch(_0x548881){try{console[_0x0b2a('0x8')](_0x28e4dd[_0x0b2a('0xd')]('\x0a'));}catch(_0x342c69){}}}};_0x4306b0['fn'][_0x0b2a('0xf')]=function(){var _0x31b146=_0x4306b0(this);_0x31b146[_0x0b2a('0x10')](function(_0x5b66d3){_0x4306b0(this)[_0x0b2a('0x11')](_0x0b2a('0x12')+_0x5b66d3);});_0x31b146[_0x0b2a('0x13')]()[_0x0b2a('0x11')]('qd-am-first');_0x31b146['last']()[_0x0b2a('0x11')](_0x0b2a('0x14'));return _0x31b146;};_0x4306b0['fn'][_0x0b2a('0x2')]=function(){};_0x10f527=function(_0x4c8b34){var _0x5bbfd0={'t':'nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x3b1517){var _0x1bddf5=function(_0x98488e){return _0x98488e;};var _0x38b5d7=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3b1517=_0x3b1517['d'+_0x38b5d7[0x10]+'c'+_0x38b5d7[0x11]+'m'+_0x1bddf5(_0x38b5d7[0x1])+'n'+_0x38b5d7[0xd]]['l'+_0x38b5d7[0x12]+'c'+_0x38b5d7[0x0]+'ti'+_0x1bddf5('o')+'n'];var _0x22556b=function(_0x8d8f6a){return escape(encodeURIComponent(_0x8d8f6a[_0x0b2a('0x15')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x304ddf){return String[_0x0b2a('0x16')](('Z'>=_0x304ddf?0x5a:0x7a)>=(_0x304ddf=_0x304ddf[_0x0b2a('0x17')](0x0)+0xd)?_0x304ddf:_0x304ddf-0x1a);})));};var _0x529b26=_0x22556b(_0x3b1517[[_0x38b5d7[0x9],_0x1bddf5('o'),_0x38b5d7[0xc],_0x38b5d7[_0x1bddf5(0xd)]][_0x0b2a('0xd')]('')]);_0x22556b=_0x22556b((window[['js',_0x1bddf5('no'),'m',_0x38b5d7[0x1],_0x38b5d7[0x4]['toUpperCase'](),_0x0b2a('0x18')]['join']('')]||'---')+['.v',_0x38b5d7[0xd],'e',_0x1bddf5('x'),'co',_0x1bddf5('mm'),'erc',_0x38b5d7[0x1],'.c',_0x1bddf5('o'),'m.',_0x38b5d7[0x13],'r'][_0x0b2a('0xd')](''));for(var _0x6d81e in _0x5bbfd0){if(_0x22556b===_0x6d81e+_0x5bbfd0[_0x6d81e]||_0x529b26===_0x6d81e+_0x5bbfd0[_0x6d81e]){var _0x333290='tr'+_0x38b5d7[0x11]+'e';break;}_0x333290='f'+_0x38b5d7[0x0]+'ls'+_0x1bddf5(_0x38b5d7[0x1])+'';}_0x1bddf5=!0x1;-0x1<_0x3b1517[[_0x38b5d7[0xc],'e',_0x38b5d7[0x0],'rc',_0x38b5d7[0x9]][_0x0b2a('0xd')]('')][_0x0b2a('0x19')](_0x0b2a('0x1a'))&&(_0x1bddf5=!0x0);return[_0x333290,_0x1bddf5];}(_0x4c8b34);}(window);if(!eval(_0x10f527[0x0]))return _0x10f527[0x1]?_0x137424(_0x0b2a('0x1b')):!0x1;var _0x2d3fad=function(_0x2a29a3){var _0xa0848c=_0x2a29a3['find'](_0x0b2a('0x1c'));var _0x3d4563=_0xa0848c['filter'](_0x0b2a('0x1d'));var _0x5c1db0=_0xa0848c[_0x0b2a('0x1e')](_0x0b2a('0x1f'));if(_0x3d4563[_0x0b2a('0x20')]||_0x5c1db0[_0x0b2a('0x20')])_0x3d4563['parent']()['addClass'](_0x0b2a('0x21')),_0x5c1db0['parent']()[_0x0b2a('0x11')](_0x0b2a('0x22')),_0x4306b0[_0x0b2a('0x23')]({'url':_0x21e437[_0x0b2a('0x24')],'dataType':'html','success':function(_0x2b8673){var _0x19b6a1=_0x4306b0(_0x2b8673);_0x3d4563[_0x0b2a('0x10')](function(){var _0x2b8673=_0x4306b0(this);var _0x807d7c=_0x19b6a1[_0x0b2a('0x25')](_0x0b2a('0x26')+_0x2b8673[_0x0b2a('0x27')](_0x0b2a('0x28'))+'\x27]');_0x807d7c[_0x0b2a('0x20')]&&(_0x807d7c[_0x0b2a('0x10')](function(){_0x4306b0(this)[_0x0b2a('0x0')](_0x0b2a('0x29'))['clone']()[_0x0b2a('0x2a')](_0x2b8673);}),_0x2b8673[_0x0b2a('0x2b')]());})[_0x0b2a('0x11')](_0x0b2a('0x2c'));_0x5c1db0['each'](function(){var _0x2b8673={};var _0x1c4caa=_0x4306b0(this);_0x19b6a1[_0x0b2a('0x25')]('h2')['each'](function(){if(_0x4306b0(this)[_0x0b2a('0x2d')]()['trim']()[_0x0b2a('0xc')]()==_0x1c4caa[_0x0b2a('0x27')](_0x0b2a('0x28'))[_0x0b2a('0x2e')]()[_0x0b2a('0xc')]())return _0x2b8673=_0x4306b0(this),!0x1;});_0x2b8673[_0x0b2a('0x20')]&&(_0x2b8673[_0x0b2a('0x10')](function(){_0x4306b0(this)[_0x0b2a('0x0')](_0x0b2a('0x2f'))[_0x0b2a('0x30')]()[_0x0b2a('0x2a')](_0x1c4caa);}),_0x1c4caa[_0x0b2a('0x2b')]());})[_0x0b2a('0x11')](_0x0b2a('0x2c'));},'error':function(){_0x137424(_0x0b2a('0x31')+_0x21e437[_0x0b2a('0x24')]+'\x27\x20falho.');},'complete':function(){_0x21e437[_0x0b2a('0x32')][_0x0b2a('0x33')](this);_0x4306b0(window)['trigger'](_0x0b2a('0x34'),_0x2a29a3);},'clearQueueDelay':0xbb8});};_0x4306b0[_0x0b2a('0x2')]=function(_0x77ffad){var _0x49d063=_0x77ffad['find']('ul[itemscope]')[_0x0b2a('0x10')](function(){var _0x4f5970=_0x4306b0(this);if(!_0x4f5970['length'])return _0x137424([_0x0b2a('0x35'),_0x77ffad],_0x0b2a('0x36'));_0x4f5970[_0x0b2a('0x25')]('li\x20>ul')[_0x0b2a('0x37')]()['addClass'](_0x0b2a('0x38'));_0x4f5970['find']('li')[_0x0b2a('0x10')](function(){var _0x122b21=_0x4306b0(this);var _0x361843=_0x122b21[_0x0b2a('0x39')](_0x0b2a('0x3a'));_0x361843[_0x0b2a('0x20')]&&_0x122b21[_0x0b2a('0x11')](_0x0b2a('0x3b')+_0x361843[_0x0b2a('0x13')]()[_0x0b2a('0x2d')]()['trim']()[_0x0b2a('0x3c')]()[_0x0b2a('0x15')](/\./g,'')[_0x0b2a('0x15')](/\s/g,'-')['toLowerCase']());});var _0x547cc8=_0x4f5970[_0x0b2a('0x25')](_0x0b2a('0x3d'))[_0x0b2a('0xf')]();_0x4f5970['addClass'](_0x0b2a('0x3e'));_0x547cc8=_0x547cc8[_0x0b2a('0x25')](_0x0b2a('0x3f'));_0x547cc8[_0x0b2a('0x10')](function(){var _0x11e935=_0x4306b0(this);_0x11e935[_0x0b2a('0x25')](_0x0b2a('0x3d'))[_0x0b2a('0xf')]()['addClass'](_0x0b2a('0x40'));_0x11e935['addClass'](_0x0b2a('0x41'));_0x11e935['parent']()[_0x0b2a('0x11')](_0x0b2a('0x42'));});_0x547cc8[_0x0b2a('0x11')]('qd-am-dropdown');var _0x3d433d=0x0,_0x10f527=function(_0x58947d){_0x3d433d+=0x1;_0x58947d=_0x58947d['children']('li')[_0x0b2a('0x39')]('*');_0x58947d['length']&&(_0x58947d[_0x0b2a('0x11')](_0x0b2a('0x43')+_0x3d433d),_0x10f527(_0x58947d));};_0x10f527(_0x4f5970);_0x4f5970[_0x0b2a('0x44')](_0x4f5970[_0x0b2a('0x25')]('ul'))[_0x0b2a('0x10')](function(){var _0x180b15=_0x4306b0(this);_0x180b15[_0x0b2a('0x11')](_0x0b2a('0x45')+_0x180b15[_0x0b2a('0x39')]('li')['length']+'-li');});});_0x2d3fad(_0x49d063);_0x21e437[_0x0b2a('0x46')][_0x0b2a('0x33')](this);_0x4306b0(window)['trigger']('QuatroDigital.am.callback',_0x77ffad);};_0x4306b0['fn'][_0x0b2a('0x2')]=function(_0x3039b1){var _0x12c3c8=_0x4306b0(this);if(!_0x12c3c8['length'])return _0x12c3c8;_0x21e437=_0x4306b0['extend']({},_0xf1b170,_0x3039b1);_0x12c3c8['exec']=new _0x4306b0[(_0x0b2a('0x2'))](_0x4306b0(this));return _0x12c3c8;};_0x4306b0(function(){_0x4306b0('.qd_amazing_menu_auto')[_0x0b2a('0x2')]();});}}(this));

/* Quatro Digital Smart Cart */
var _0x99e9=['timeRemoveNewItemClass','getCartInfoByUrl','isSmartCheckout','função\x20descontinuada','autoWatchBuyButton','click','mouseenter.qd_bb_buy_sc','unbind','load','selectSkuMsg','?redirect=false&','redirect=false','redirect=true','buyIfQuantityZeroed','test','match','push','productPageCallback','buyButtonClickCallback','ku=','shift','asyncCallback','productAddedToCart','fakeRequest','parent','_QuatroDigital_prodBuyCallback','.qd-bb-itemAddWrapper','prepend','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','ajaxSend','pop','productAddedToCart.qdSbbVtex','QuatroDigital.qd_bb_prod_add','ajaxStop','message','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','allowUpdate','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','toUpperCase','ite','erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','QD_dropDownCart','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','name','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','scrollCart','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20input','val','keyup.qd_ddc_cep','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','mouseleave.qd_ddc_hover','texts','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-infoTotal','.qd-ddc-shipping','.qd-ddc-emptyCart\x20p','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','.qd-ddc-wrapper','_QuatroDigital_AmountProduct','exec','qd-ddc-prodLoaded','cartIsEmpty','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','qd-ddc-','availability','skuName','.qd-ddc-prodPrice','sellingPrice','.qd-ddc-quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','appendTo','address','postalCode','lastSku','[data-sku=\x27','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-empty','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','actionButtons','data-sku','changeQantity','data-sku-index','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','preventDefault','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','.qd-ddc-prodRow','click.qd_ddc_remove','removeProduct','stop','slideUp','remove','$1-$2$3','calculateShipping','BRA','Não\x20foi\x20possível\x20calcular\x20o\x20frete','qdDdcLastPostalCode','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','boolean','removeItems','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Oooops!\x20','buyButtonClicked','quickViewUpdate','allowRecalculate','productId','prod_','prodId','.qd-bap-wrapper','qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qdDdcContainer','QD_smartCart','dropDown','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','closest','replace','abs','undefined','pow','round','toFixed','split','length','join','function','prototype','trim','capitalize','charAt','slice','qdAjaxQueue','jquery','000','qdAjax','extend','GET','stringify','data','url','type','jqXHR','ajax','success','error','always','complete','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','version','4.0','simpleCart','checkout','getOrderForm','call','QuatroDigital_simpleCart','ajaxStopOn','object','alerta','warn','[Simple\x20Cart]\x0a','toLowerCase','info','add','elements','.qd_items_text','meta[name=currency]','attr','content','each','qd_simpleCartOpts','_QuatroDigital_CartData','Shipping','totalizers','value','total','currencySymbol','shipping','allTotal','qtt','showQuantityByItems','items','quantity','callback','fire','hide','filter','qd-emptyCart','removeClass','$this','cartQttE','html','itemsTextE','find','cartQtt','cartTotalE','cartTotal','itemsText','emptyCart','addClass','qd-sc-populated','smartCheckout','_QuatroDigital_DropDown','vtexjs','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','QD_checkoutQueue','shippingData','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','trigger','simpleCartCallback.quatro_digital','QD_simpleCart','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','.qd_cart_auto','bind','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','done','fail','Callbacks','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','.productInformationWrapper\x20\x20a.buy-button','input.buy-in-page-quantity','javascript:','body','Produto\x20adicionado\x20ao\x20carrinho!','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','href','#produto,\x20.produto','QD_buyButton','qd-bb-click-active','click.qd_bb_buy_sc','allowBuyClick','clickBuySmartCheckout','Método\x20descontinuado!','buyButton','.qd-sbb-on','qd-sbb-on','.btn-add-buy-button-asynchronous','.remove-href','qd-bb-active','children','.qd-bb-productAdded','append','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','.buy-in-page-button','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','prodAdd','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','---','qd-bb-itemAddBuyButtonWrapper','qd-bb-itemAddCartWrapper'];(function(_0x5b7a91,_0x49df7f){var _0x175c7b=function(_0x5c0174){while(--_0x5c0174){_0x5b7a91['push'](_0x5b7a91['shift']());}};_0x175c7b(++_0x49df7f);}(_0x99e9,0xb4));var _0x999e=function(_0x5c6244,_0x112ab8){_0x5c6244=_0x5c6244-0x0;var _0x5800ce=_0x99e9[_0x5c6244];return _0x5800ce;};(function(_0x11956a){_0x11956a['fn'][_0x999e('0x0')]=_0x11956a['fn'][_0x999e('0x1')];}(jQuery));function qd_number_format(_0x36812b,_0x1c6fa0,_0x4aaeb4,_0x19a818){_0x36812b=(_0x36812b+'')[_0x999e('0x2')](/[^0-9+\-Ee.]/g,'');_0x36812b=isFinite(+_0x36812b)?+_0x36812b:0x0;_0x1c6fa0=isFinite(+_0x1c6fa0)?Math[_0x999e('0x3')](_0x1c6fa0):0x0;_0x19a818='undefined'===typeof _0x19a818?',':_0x19a818;_0x4aaeb4=_0x999e('0x4')===typeof _0x4aaeb4?'.':_0x4aaeb4;var _0x1bda0a='',_0x1bda0a=function(_0x100330,_0x18f337){var _0x1c6fa0=Math[_0x999e('0x5')](0xa,_0x18f337);return''+(Math[_0x999e('0x6')](_0x100330*_0x1c6fa0)/_0x1c6fa0)[_0x999e('0x7')](_0x18f337);},_0x1bda0a=(_0x1c6fa0?_0x1bda0a(_0x36812b,_0x1c6fa0):''+Math[_0x999e('0x6')](_0x36812b))[_0x999e('0x8')]('.');0x3<_0x1bda0a[0x0][_0x999e('0x9')]&&(_0x1bda0a[0x0]=_0x1bda0a[0x0][_0x999e('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x19a818));(_0x1bda0a[0x1]||'')[_0x999e('0x9')]<_0x1c6fa0&&(_0x1bda0a[0x1]=_0x1bda0a[0x1]||'',_0x1bda0a[0x1]+=Array(_0x1c6fa0-_0x1bda0a[0x1][_0x999e('0x9')]+0x1)[_0x999e('0xa')]('0'));return _0x1bda0a[_0x999e('0xa')](_0x4aaeb4);};_0x999e('0xb')!==typeof String[_0x999e('0xc')][_0x999e('0xd')]&&(String[_0x999e('0xc')][_0x999e('0xd')]=function(){return this[_0x999e('0x2')](/^\s+|\s+$/g,'');});'function'!=typeof String[_0x999e('0xc')]['capitalize']&&(String[_0x999e('0xc')][_0x999e('0xe')]=function(){return this[_0x999e('0xf')](0x0)['toUpperCase']()+this[_0x999e('0x10')](0x1)['toLowerCase']();});(function(_0xa44e4c){if('function'!==typeof _0xa44e4c['qdAjax']){var _0x1eee64={};_0xa44e4c[_0x999e('0x11')]=_0x1eee64;0x96>parseInt((_0xa44e4c['fn'][_0x999e('0x12')][_0x999e('0x2')](/[^0-9]+/g,'')+_0x999e('0x13'))[_0x999e('0x10')](0x0,0x3),0xa)&&console&&'function'==typeof console['error']&&console['error']();_0xa44e4c[_0x999e('0x14')]=function(_0x43b09e){try{var _0xc4ef74=_0xa44e4c[_0x999e('0x15')]({},{'url':'','type':_0x999e('0x16'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x43b09e);var _0x3ece5e='object'===typeof _0xc4ef74['data']?JSON[_0x999e('0x17')](_0xc4ef74[_0x999e('0x18')]):_0xc4ef74[_0x999e('0x18')]['toString']();var _0x351dd7=encodeURIComponent(_0xc4ef74[_0x999e('0x19')]+'|'+_0xc4ef74[_0x999e('0x1a')]+'|'+_0x3ece5e);_0x1eee64[_0x351dd7]=_0x1eee64[_0x351dd7]||{};_0x999e('0x4')==typeof _0x1eee64[_0x351dd7][_0x999e('0x1b')]?_0x1eee64[_0x351dd7][_0x999e('0x1b')]=_0xa44e4c[_0x999e('0x1c')](_0xc4ef74):(_0x1eee64[_0x351dd7]['jqXHR']['done'](_0xc4ef74[_0x999e('0x1d')]),_0x1eee64[_0x351dd7][_0x999e('0x1b')]['fail'](_0xc4ef74[_0x999e('0x1e')]),_0x1eee64[_0x351dd7][_0x999e('0x1b')][_0x999e('0x1f')](_0xc4ef74[_0x999e('0x20')]));_0x1eee64[_0x351dd7][_0x999e('0x1b')][_0x999e('0x1f')](function(){isNaN(parseInt(_0xc4ef74['clearQueueDelay']))||setTimeout(function(){_0x1eee64[_0x351dd7][_0x999e('0x1b')]=void 0x0;},_0xc4ef74[_0x999e('0x21')]);});return _0x1eee64[_0x351dd7][_0x999e('0x1b')];}catch(_0x12b9ad){_0x999e('0x4')!==typeof console&&_0x999e('0xb')===typeof console[_0x999e('0x1e')]&&console['error'](_0x999e('0x22')+_0x12b9ad['message']);}};_0xa44e4c['qdAjax'][_0x999e('0x23')]=_0x999e('0x24');}}(jQuery));(function(_0x1f89f2){_0x1f89f2['fn']['getParent']=_0x1f89f2['fn'][_0x999e('0x1')];}(jQuery));(function(){var _0x28f7ba=jQuery;if(_0x999e('0xb')!==typeof _0x28f7ba['fn'][_0x999e('0x25')]){_0x28f7ba(function(){var _0x15dca1=vtexjs[_0x999e('0x26')][_0x999e('0x27')];vtexjs[_0x999e('0x26')][_0x999e('0x27')]=function(){return _0x15dca1[_0x999e('0x28')]();};});try{window['QuatroDigital_simpleCart']=window[_0x999e('0x29')]||{};window[_0x999e('0x29')][_0x999e('0x2a')]=!0x1;_0x28f7ba['fn']['simpleCart']=function(_0x2ca5b8,_0x5af72c,_0x5dce40){var _0x28a228=function(_0x332195,_0x5aa206){if('object'===typeof console){var _0x5def61=_0x999e('0x2b')===typeof _0x332195;_0x999e('0x4')!==typeof _0x5aa206&&_0x999e('0x2c')===_0x5aa206['toLowerCase']()?_0x5def61?console[_0x999e('0x2d')](_0x999e('0x2e'),_0x332195[0x0],_0x332195[0x1],_0x332195[0x2],_0x332195[0x3],_0x332195[0x4],_0x332195[0x5],_0x332195[0x6],_0x332195[0x7]):console[_0x999e('0x2d')](_0x999e('0x2e')+_0x332195):'undefined'!==typeof _0x5aa206&&'info'===_0x5aa206[_0x999e('0x2f')]()?_0x5def61?console['info'](_0x999e('0x2e'),_0x332195[0x0],_0x332195[0x1],_0x332195[0x2],_0x332195[0x3],_0x332195[0x4],_0x332195[0x5],_0x332195[0x6],_0x332195[0x7]):console[_0x999e('0x30')](_0x999e('0x2e')+_0x332195):_0x5def61?console[_0x999e('0x1e')]('[Simple\x20Cart]\x0a',_0x332195[0x0],_0x332195[0x1],_0x332195[0x2],_0x332195[0x3],_0x332195[0x4],_0x332195[0x5],_0x332195[0x6],_0x332195[0x7]):console[_0x999e('0x1e')](_0x999e('0x2e')+_0x332195);}};var _0x5bd468=_0x28f7ba(this);'object'===typeof _0x2ca5b8?_0x5af72c=_0x2ca5b8:(_0x2ca5b8=_0x2ca5b8||!0x1,_0x5bd468=_0x5bd468[_0x999e('0x31')](_0x28f7ba['QD_simpleCart'][_0x999e('0x32')]));if(!_0x5bd468['length'])return _0x5bd468;_0x28f7ba['QD_simpleCart']['elements']=_0x28f7ba['QD_simpleCart'][_0x999e('0x32')]['add'](_0x5bd468);_0x5dce40=_0x999e('0x4')===typeof _0x5dce40?!0x1:_0x5dce40;var _0x5240a7={'cartQtt':'.qd_cart_qtt','cartTotal':'.qd_cart_total','itemsText':_0x999e('0x33'),'currencySymbol':(_0x28f7ba(_0x999e('0x34'))[_0x999e('0x35')](_0x999e('0x36'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x379064=_0x28f7ba[_0x999e('0x15')]({},_0x5240a7,_0x5af72c);var _0x32e494=_0x28f7ba('');_0x5bd468[_0x999e('0x37')](function(){var _0x54866a=_0x28f7ba(this);_0x54866a[_0x999e('0x18')](_0x999e('0x38'))||_0x54866a[_0x999e('0x18')](_0x999e('0x38'),_0x379064);});var _0x5dd3db=function(_0x141358){window['_QuatroDigital_CartData']=window[_0x999e('0x39')]||{};for(var _0x2ca5b8=0x0,_0x2c19b2=0x0,_0x327c7b=0x0;_0x327c7b<_0x141358['totalizers'][_0x999e('0x9')];_0x327c7b++)_0x999e('0x3a')==_0x141358[_0x999e('0x3b')][_0x327c7b]['id']&&(_0x2c19b2+=_0x141358['totalizers'][_0x327c7b]['value']),_0x2ca5b8+=_0x141358[_0x999e('0x3b')][_0x327c7b][_0x999e('0x3c')];window[_0x999e('0x39')][_0x999e('0x3d')]=_0x379064[_0x999e('0x3e')]+qd_number_format(_0x2ca5b8/0x64,0x2,',','.');window[_0x999e('0x39')][_0x999e('0x3f')]=_0x379064[_0x999e('0x3e')]+qd_number_format(_0x2c19b2/0x64,0x2,',','.');window[_0x999e('0x39')][_0x999e('0x40')]=_0x379064['currencySymbol']+qd_number_format((_0x2ca5b8+_0x2c19b2)/0x64,0x2,',','.');window['_QuatroDigital_CartData'][_0x999e('0x41')]=0x0;if(_0x379064[_0x999e('0x42')])for(_0x327c7b=0x0;_0x327c7b<_0x141358[_0x999e('0x43')][_0x999e('0x9')];_0x327c7b++)window[_0x999e('0x39')][_0x999e('0x41')]+=_0x141358['items'][_0x327c7b][_0x999e('0x44')];else window['_QuatroDigital_CartData']['qtt']=_0x141358[_0x999e('0x43')]['length']||0x0;try{window['_QuatroDigital_CartData']['callback']&&window['_QuatroDigital_CartData'][_0x999e('0x45')][_0x999e('0x46')]&&window['_QuatroDigital_CartData'][_0x999e('0x45')][_0x999e('0x46')]();}catch(_0x2aa9ca){_0x28a228('Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart');}_0x37c3ff(_0x32e494);};var _0x4b230d=function(_0x415d4f,_0x2ebafe){0x1===_0x415d4f?_0x2ebafe[_0x999e('0x47')]()['filter']('.singular')['show']():_0x2ebafe['hide']()[_0x999e('0x48')]('.plural')['show']();};var _0x45e2c2=function(_0x29a27f){0x1>_0x29a27f?_0x5bd468['addClass'](_0x999e('0x49')):_0x5bd468[_0x999e('0x4a')]('qd-emptyCart');};var _0x2aa072=function(_0x58be33,_0x9322ca){var _0x42dfea=parseInt(window['_QuatroDigital_CartData'][_0x999e('0x41')],0xa);_0x9322ca[_0x999e('0x4b')]['show']();isNaN(_0x42dfea)&&(_0x28a228('O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.',_0x999e('0x2c')),_0x42dfea=0x0);_0x9322ca['cartTotalE']['html'](window['_QuatroDigital_CartData'][_0x999e('0x3d')]);_0x9322ca[_0x999e('0x4c')][_0x999e('0x4d')](_0x42dfea);_0x4b230d(_0x42dfea,_0x9322ca[_0x999e('0x4e')]);_0x45e2c2(_0x42dfea);};var _0x37c3ff=function(_0x14c01c){_0x5bd468['each'](function(){var _0x14f8de={};var _0x2317c5=_0x28f7ba(this);_0x2ca5b8&&_0x2317c5['data'](_0x999e('0x38'))&&_0x28f7ba[_0x999e('0x15')](_0x379064,_0x2317c5[_0x999e('0x18')](_0x999e('0x38')));_0x14f8de[_0x999e('0x4b')]=_0x2317c5;_0x14f8de[_0x999e('0x4c')]=_0x2317c5[_0x999e('0x4f')](_0x379064[_0x999e('0x50')])||_0x32e494;_0x14f8de[_0x999e('0x51')]=_0x2317c5['find'](_0x379064[_0x999e('0x52')])||_0x32e494;_0x14f8de[_0x999e('0x4e')]=_0x2317c5[_0x999e('0x4f')](_0x379064[_0x999e('0x53')])||_0x32e494;_0x14f8de['emptyElem']=_0x2317c5[_0x999e('0x4f')](_0x379064[_0x999e('0x54')])||_0x32e494;_0x2aa072(_0x14c01c,_0x14f8de);_0x2317c5[_0x999e('0x55')](_0x999e('0x56'));});};(function(){if(_0x379064[_0x999e('0x57')]){window[_0x999e('0x58')]=window[_0x999e('0x58')]||{};if(_0x999e('0x4')!==typeof window['_QuatroDigital_DropDown']['getOrderForm']&&(_0x5dce40||!_0x2ca5b8))return _0x5dd3db(window[_0x999e('0x58')][_0x999e('0x27')]);if(_0x999e('0x2b')!==typeof window[_0x999e('0x59')]||_0x999e('0x4')===typeof window[_0x999e('0x59')][_0x999e('0x26')])if('object'===typeof vtex&&'object'===typeof vtex[_0x999e('0x26')]&&_0x999e('0x4')!==typeof vtex[_0x999e('0x26')][_0x999e('0x5a')])new vtex[(_0x999e('0x26'))]['SDK']();else return _0x28a228(_0x999e('0x5b'));_0x28f7ba[_0x999e('0x5c')]([_0x999e('0x43'),_0x999e('0x3b'),_0x999e('0x5d')],{'done':function(_0x434e13){_0x5dd3db(_0x434e13);window[_0x999e('0x58')]['getOrderForm']=_0x434e13;},'fail':function(_0x30edde){_0x28a228(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.',_0x30edde]);}});}else alert(_0x999e('0x5e'));}());_0x379064[_0x999e('0x45')]();_0x28f7ba(window)[_0x999e('0x5f')](_0x999e('0x60'));return _0x5bd468;};_0x28f7ba[_0x999e('0x61')]={'elements':_0x28f7ba('')};_0x28f7ba(function(){var _0x53cfbc;'function'===typeof window[_0x999e('0x62')]&&(_0x53cfbc=window[_0x999e('0x62')],window[_0x999e('0x62')]=function(_0xe39e00,_0x470e51,_0x121110,_0x23fd58,_0x3d398c){_0x53cfbc[_0x999e('0x28')](this,_0xe39e00,_0x470e51,_0x121110,_0x23fd58,function(){_0x999e('0xb')===typeof _0x3d398c&&_0x3d398c();_0x28f7ba[_0x999e('0x61')][_0x999e('0x32')][_0x999e('0x37')](function(){var _0x268716=_0x28f7ba(this);_0x268716[_0x999e('0x25')](_0x268716['data'](_0x999e('0x38')));});});});});var _0x157c1f=window[_0x999e('0x63')]||void 0x0;window[_0x999e('0x63')]=function(_0x4e5e6e){_0x28f7ba['fn']['simpleCart'](!0x0);_0x999e('0xb')===typeof _0x157c1f?_0x157c1f[_0x999e('0x28')](this,_0x4e5e6e):alert(_0x4e5e6e);};_0x28f7ba(function(){var _0x67267d=_0x28f7ba(_0x999e('0x64'));_0x67267d[_0x999e('0x9')]&&_0x67267d[_0x999e('0x25')]();});_0x28f7ba(function(){_0x28f7ba(window)[_0x999e('0x65')](_0x999e('0x66'),function(){_0x28f7ba['fn'][_0x999e('0x25')](!0x0);});});}catch(_0x5d4f50){_0x999e('0x4')!==typeof console&&'function'===typeof console[_0x999e('0x1e')]&&console[_0x999e('0x1e')]('Oooops!\x20',_0x5d4f50);}}}());(function(){var _0x61ba8=function(_0x4ba9cd,_0x1807b7){if(_0x999e('0x2b')===typeof console){var _0x56bc8c='object'===typeof _0x4ba9cd;'undefined'!==typeof _0x1807b7&&_0x999e('0x2c')===_0x1807b7[_0x999e('0x2f')]()?_0x56bc8c?console[_0x999e('0x2d')](_0x999e('0x67'),_0x4ba9cd[0x0],_0x4ba9cd[0x1],_0x4ba9cd[0x2],_0x4ba9cd[0x3],_0x4ba9cd[0x4],_0x4ba9cd[0x5],_0x4ba9cd[0x6],_0x4ba9cd[0x7]):console[_0x999e('0x2d')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a'+_0x4ba9cd):'undefined'!==typeof _0x1807b7&&'info'===_0x1807b7[_0x999e('0x2f')]()?_0x56bc8c?console['info']('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x4ba9cd[0x0],_0x4ba9cd[0x1],_0x4ba9cd[0x2],_0x4ba9cd[0x3],_0x4ba9cd[0x4],_0x4ba9cd[0x5],_0x4ba9cd[0x6],_0x4ba9cd[0x7]):console[_0x999e('0x30')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a'+_0x4ba9cd):_0x56bc8c?console[_0x999e('0x1e')](_0x999e('0x67'),_0x4ba9cd[0x0],_0x4ba9cd[0x1],_0x4ba9cd[0x2],_0x4ba9cd[0x3],_0x4ba9cd[0x4],_0x4ba9cd[0x5],_0x4ba9cd[0x6],_0x4ba9cd[0x7]):console[_0x999e('0x1e')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a'+_0x4ba9cd);}},_0x175904=null,_0x35fbf6={},_0xcbe77a={},_0x17beed={};$[_0x999e('0x5c')]=function(_0x3c2bce,_0x2ddf00){if(null===_0x175904)if(_0x999e('0x2b')===typeof window[_0x999e('0x59')]&&_0x999e('0x4')!==typeof window[_0x999e('0x59')]['checkout'])_0x175904=window[_0x999e('0x59')][_0x999e('0x26')];else return _0x61ba8(_0x999e('0x68'));var _0x5781d2=$['extend']({'done':function(){},'fail':function(){}},_0x2ddf00),_0x2a7150=_0x3c2bce[_0x999e('0xa')](';'),_0x12d040=function(){_0x35fbf6[_0x2a7150][_0x999e('0x31')](_0x5781d2[_0x999e('0x69')]);_0xcbe77a[_0x2a7150][_0x999e('0x31')](_0x5781d2[_0x999e('0x6a')]);};_0x17beed[_0x2a7150]?_0x12d040():(_0x35fbf6[_0x2a7150]=$[_0x999e('0x6b')](),_0xcbe77a[_0x2a7150]=$[_0x999e('0x6b')](),_0x12d040(),_0x17beed[_0x2a7150]=!0x0,_0x175904[_0x999e('0x27')](_0x3c2bce)[_0x999e('0x69')](function(_0x58fb9e){_0x17beed[_0x2a7150]=!0x1;_0x35fbf6[_0x2a7150][_0x999e('0x46')](_0x58fb9e);})[_0x999e('0x6a')](function(_0x3ec467){_0x17beed[_0x2a7150]=!0x1;_0xcbe77a[_0x2a7150]['fire'](_0x3ec467);}));};}());(function(_0x46365a){try{var _0x48e0ca=jQuery,_0x14f13a,_0x115be6=_0x48e0ca({}),_0x3a7596=function(_0x43377d,_0xbde93c){if(_0x999e('0x2b')===typeof console&&_0x999e('0x4')!==typeof console[_0x999e('0x1e')]&&_0x999e('0x4')!==typeof console['info']&&_0x999e('0x4')!==typeof console['warn']){var _0x34f25c;'object'===typeof _0x43377d?(_0x43377d['unshift'](_0x999e('0x6c')),_0x34f25c=_0x43377d):_0x34f25c=['[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a'+_0x43377d];if(_0x999e('0x4')===typeof _0xbde93c||_0x999e('0x2c')!==_0xbde93c['toLowerCase']()&&_0x999e('0x6d')!==_0xbde93c[_0x999e('0x2f')]())if('undefined'!==typeof _0xbde93c&&_0x999e('0x30')===_0xbde93c[_0x999e('0x2f')]())try{console[_0x999e('0x30')][_0x999e('0x6e')](console,_0x34f25c);}catch(_0x382c65){try{console[_0x999e('0x30')](_0x34f25c[_0x999e('0xa')]('\x0a'));}catch(_0x25b243){}}else try{console['error']['apply'](console,_0x34f25c);}catch(_0x34541f){try{console[_0x999e('0x1e')](_0x34f25c[_0x999e('0xa')]('\x0a'));}catch(_0x1fad9f){}}else try{console[_0x999e('0x2d')][_0x999e('0x6e')](console,_0x34f25c);}catch(_0x56dcc0){try{console[_0x999e('0x2d')](_0x34f25c[_0x999e('0xa')]('\x0a'));}catch(_0x5c9439){}}}},_0x4e6c30={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0x999e('0x6f'),'buyQtt':_0x999e('0x70'),'selectSkuMsg':_0x999e('0x71'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x54742b,_0x389520,_0x1a53c9){_0x48e0ca(_0x999e('0x72'))['is']('.productQuickView')&&(_0x999e('0x1d')===_0x389520?alert(_0x999e('0x73')):(alert(_0x999e('0x74')),('object'===typeof parent?parent:document)['location'][_0x999e('0x75')]=_0x1a53c9));},'isProductPage':function(){return _0x48e0ca('body')['is'](_0x999e('0x76'));},'execDefaultAction':function(_0x86e553){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x48e0ca[_0x999e('0x77')]=function(_0x2203f7,_0x1a88e8){function _0x26e81c(_0x43043a){_0x14f13a['isSmartCheckout']?_0x43043a[_0x999e('0x18')]('qd-bb-click-active')||(_0x43043a['data'](_0x999e('0x78'),0x1),_0x43043a['on'](_0x999e('0x79'),function(_0xa0a5de){if(!_0x14f13a[_0x999e('0x7a')]())return!0x0;if(!0x0!==_0x305648[_0x999e('0x7b')][_0x999e('0x28')](this))return _0xa0a5de['preventDefault'](),!0x1;})):alert(_0x999e('0x7c'));}function _0x58106b(_0x302161){_0x302161=_0x302161||_0x48e0ca(_0x14f13a[_0x999e('0x7d')]);_0x302161[_0x999e('0x37')](function(){var _0x302161=_0x48e0ca(this);_0x302161['is'](_0x999e('0x7e'))||(_0x302161['addClass'](_0x999e('0x7f')),_0x302161['is'](_0x999e('0x80'))&&!_0x302161['is'](_0x999e('0x81'))||_0x302161[_0x999e('0x18')](_0x999e('0x82'))||(_0x302161['data']('qd-bb-active',0x1),_0x302161[_0x999e('0x83')](_0x999e('0x84'))[_0x999e('0x9')]||_0x302161[_0x999e('0x85')](_0x999e('0x86')),_0x302161['is'](_0x999e('0x87'))&&_0x14f13a[_0x999e('0x88')]()&&_0x10437c[_0x999e('0x28')](_0x302161),_0x26e81c(_0x302161)));});_0x14f13a['isProductPage']()&&!_0x302161[_0x999e('0x9')]&&_0x3a7596(_0x999e('0x89')+_0x302161[_0x999e('0x8a')]+'\x27.',_0x999e('0x30'));}var _0xfa465c=_0x48e0ca(_0x2203f7);var _0x305648=this;window[_0x999e('0x8b')]=window[_0x999e('0x8b')]||{};window['_QuatroDigital_CartData']=window[_0x999e('0x39')]||{};_0x305648[_0x999e('0x8c')]=function(_0xd8ad2e,_0xd49ad8){_0xfa465c[_0x999e('0x55')](_0x999e('0x8d'));_0x48e0ca(_0x999e('0x72'))[_0x999e('0x55')]('qd-bb-lightBoxBodyProdAdd');var _0x46ef41=_0x48e0ca(_0x14f13a[_0x999e('0x7d')])[_0x999e('0x48')]('[href=\x27'+(_0xd8ad2e[_0x999e('0x35')](_0x999e('0x75'))||_0x999e('0x8e'))+'\x27]')[_0x999e('0x31')](_0xd8ad2e);_0x46ef41[_0x999e('0x55')](_0x999e('0x8f'));setTimeout(function(){_0xfa465c[_0x999e('0x4a')](_0x999e('0x90'));_0x46ef41[_0x999e('0x4a')]('qd-bb-itemAddBuyButtonWrapper');},_0x14f13a[_0x999e('0x91')]);window[_0x999e('0x8b')][_0x999e('0x27')]=void 0x0;if('undefined'!==typeof _0x1a88e8&&'function'===typeof _0x1a88e8[_0x999e('0x92')])return _0x14f13a[_0x999e('0x93')]||(_0x3a7596(_0x999e('0x94')),_0x1a88e8['getCartInfoByUrl']()),window[_0x999e('0x58')][_0x999e('0x27')]=void 0x0,_0x1a88e8[_0x999e('0x92')](function(_0x47fbb8){window[_0x999e('0x8b')][_0x999e('0x27')]=_0x47fbb8;_0x48e0ca['fn']['simpleCart'](!0x0,void 0x0,!0x0);},{'lastSku':_0xd49ad8});window[_0x999e('0x8b')]['allowUpdate']=!0x0;_0x48e0ca['fn']['simpleCart'](!0x0);};(function(){if(_0x14f13a[_0x999e('0x93')]&&_0x14f13a[_0x999e('0x95')]){var _0x1ee576=_0x48e0ca(_0x999e('0x80'));_0x1ee576['length']&&_0x58106b(_0x1ee576);}}());var _0x10437c=function(){var _0x351c85=_0x48e0ca(this);_0x999e('0x4')!==typeof _0x351c85[_0x999e('0x18')](_0x999e('0x7d'))?(_0x351c85['unbind'](_0x999e('0x96')),_0x26e81c(_0x351c85)):(_0x351c85[_0x999e('0x65')](_0x999e('0x97'),function(_0x513bee){_0x351c85[_0x999e('0x98')](_0x999e('0x96'));_0x26e81c(_0x351c85);_0x48e0ca(this)[_0x999e('0x98')](_0x513bee);}),_0x48e0ca(window)[_0x999e('0x99')](function(){_0x351c85[_0x999e('0x98')](_0x999e('0x96'));_0x26e81c(_0x351c85);_0x351c85[_0x999e('0x98')](_0x999e('0x97'));}));};_0x305648['clickBuySmartCheckout']=function(){var _0x220e00=_0x48e0ca(this),_0x2203f7=_0x220e00[_0x999e('0x35')](_0x999e('0x75'))||'';if(-0x1<_0x2203f7['indexOf'](_0x14f13a[_0x999e('0x9a')]))return!0x0;_0x2203f7=_0x2203f7[_0x999e('0x2')](/redirect\=(false|true)/gi,'')[_0x999e('0x2')]('?',_0x999e('0x9b'))[_0x999e('0x2')](/\&\&/gi,'&');if(_0x14f13a['execDefaultAction'](_0x220e00))return _0x220e00[_0x999e('0x35')](_0x999e('0x75'),_0x2203f7[_0x999e('0x2')](_0x999e('0x9c'),_0x999e('0x9d'))),!0x0;_0x2203f7=_0x2203f7[_0x999e('0x2')](/http.?:/i,'');_0x115be6['queue'](function(_0x57e123){if(!_0x14f13a[_0x999e('0x9e')]&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0x999e('0x9f')](_0x2203f7))return _0x57e123();var _0x57a547=function(_0x28b647,_0x346afc){var _0x58106b=_0x2203f7[_0x999e('0xa0')](/sku\=([0-9]+)/gi),_0x413c81=[];if(_0x999e('0x2b')===typeof _0x58106b&&null!==_0x58106b)for(var _0x1c170a=_0x58106b[_0x999e('0x9')]-0x1;0x0<=_0x1c170a;_0x1c170a--){var _0x5e2f44=parseInt(_0x58106b[_0x1c170a][_0x999e('0x2')](/sku\=/gi,''));isNaN(_0x5e2f44)||_0x413c81[_0x999e('0xa1')](_0x5e2f44);}_0x14f13a[_0x999e('0xa2')][_0x999e('0x28')](this,_0x28b647,_0x346afc,_0x2203f7);_0x305648[_0x999e('0xa3')][_0x999e('0x28')](this,_0x28b647,_0x346afc,_0x2203f7,_0x413c81);_0x305648[_0x999e('0x8c')](_0x220e00,_0x2203f7['split'](_0x999e('0xa4'))['pop']()[_0x999e('0x8')]('&')[_0x999e('0xa5')]());_0x999e('0xb')===typeof _0x14f13a[_0x999e('0xa6')]&&_0x14f13a[_0x999e('0xa6')][_0x999e('0x28')](this);_0x48e0ca(window)[_0x999e('0x5f')](_0x999e('0xa7'));_0x48e0ca(window)[_0x999e('0x5f')]('cartProductAdded.vtex');};_0x14f13a[_0x999e('0xa8')]?(_0x57a547(null,'success'),_0x57e123()):_0x48e0ca[_0x999e('0x1c')]({'url':_0x2203f7,'complete':_0x57a547})['always'](function(){_0x57e123();});});};_0x305648[_0x999e('0xa3')]=function(_0x4bd5d3,_0x578c6b,_0x11bc38,_0x178df4){try{'success'===_0x578c6b&&'object'===typeof window[_0x999e('0xa9')]&&_0x999e('0xb')===typeof window[_0x999e('0xa9')][_0x999e('0xaa')]&&window[_0x999e('0xa9')]['_QuatroDigital_prodBuyCallback'](_0x4bd5d3,_0x578c6b,_0x11bc38,_0x178df4);}catch(_0x40d209){_0x3a7596('Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.');}};_0x58106b();_0x999e('0xb')===typeof _0x14f13a[_0x999e('0x45')]?_0x14f13a[_0x999e('0x45')][_0x999e('0x28')](this):_0x3a7596('Callback\x20não\x20é\x20uma\x20função');};var _0x121a36=_0x48e0ca[_0x999e('0x6b')]();_0x48e0ca['fn'][_0x999e('0x77')]=function(_0x44ad79,_0xf51d13){var _0x46365a=_0x48e0ca(this);_0x999e('0x4')!==typeof _0xf51d13||_0x999e('0x2b')!==typeof _0x44ad79||_0x44ad79 instanceof _0x48e0ca||(_0xf51d13=_0x44ad79,_0x44ad79=void 0x0);_0x14f13a=_0x48e0ca[_0x999e('0x15')]({},_0x4e6c30,_0xf51d13);var _0x590cd2;_0x121a36[_0x999e('0x31')](function(){_0x46365a[_0x999e('0x83')](_0x999e('0xab'))[_0x999e('0x9')]||_0x46365a[_0x999e('0xac')](_0x999e('0xad'));_0x590cd2=new _0x48e0ca[(_0x999e('0x77'))](_0x46365a,_0x44ad79);});_0x121a36[_0x999e('0x46')]();_0x48e0ca(window)['on']('QuatroDigital.qd_bb_prod_add',function(_0x8d658d,_0x493eae,_0x2edf92){_0x590cd2[_0x999e('0x8c')](_0x493eae,_0x2edf92);});return _0x48e0ca['extend'](_0x46365a,_0x590cd2);};var _0x42953e=0x0;_0x48e0ca(document)[_0x999e('0xae')](function(_0x27c5d9,_0x19d925,_0x49b759){-0x1<_0x49b759['url'][_0x999e('0x2f')]()['indexOf']('/checkout/cart/add')&&(_0x42953e=(_0x49b759[_0x999e('0x19')][_0x999e('0xa0')](/sku\=([0-9]+)/i)||[''])[_0x999e('0xaf')]());});_0x48e0ca(window)['bind'](_0x999e('0xb0'),function(){_0x48e0ca(window)[_0x999e('0x5f')](_0x999e('0xb1'),[new _0x48e0ca(),_0x42953e]);});_0x48e0ca(document)[_0x999e('0xb2')](function(){_0x121a36[_0x999e('0x46')]();});}catch(_0x191506){_0x999e('0x4')!==typeof console&&'function'===typeof console[_0x999e('0x1e')]&&console[_0x999e('0x1e')]('Oooops!\x20',_0x191506);}}(this));function qd_number_format(_0x63f467,_0x482947,_0x3d9af0,_0xc1a8ce){_0x63f467=(_0x63f467+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x63f467=isFinite(+_0x63f467)?+_0x63f467:0x0;_0x482947=isFinite(+_0x482947)?Math['abs'](_0x482947):0x0;_0xc1a8ce='undefined'===typeof _0xc1a8ce?',':_0xc1a8ce;_0x3d9af0='undefined'===typeof _0x3d9af0?'.':_0x3d9af0;var _0x3a94aa='',_0x3a94aa=function(_0x1d9d4e,_0x20d88a){var _0x1b1716=Math[_0x999e('0x5')](0xa,_0x20d88a);return''+(Math[_0x999e('0x6')](_0x1d9d4e*_0x1b1716)/_0x1b1716)[_0x999e('0x7')](_0x20d88a);},_0x3a94aa=(_0x482947?_0x3a94aa(_0x63f467,_0x482947):''+Math[_0x999e('0x6')](_0x63f467))[_0x999e('0x8')]('.');0x3<_0x3a94aa[0x0][_0x999e('0x9')]&&(_0x3a94aa[0x0]=_0x3a94aa[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0xc1a8ce));(_0x3a94aa[0x1]||'')[_0x999e('0x9')]<_0x482947&&(_0x3a94aa[0x1]=_0x3a94aa[0x1]||'',_0x3a94aa[0x1]+=Array(_0x482947-_0x3a94aa[0x1][_0x999e('0x9')]+0x1)[_0x999e('0xa')]('0'));return _0x3a94aa[_0x999e('0xa')](_0x3d9af0);}(function(){try{window[_0x999e('0x39')]=window[_0x999e('0x39')]||{},window[_0x999e('0x39')][_0x999e('0x45')]=window[_0x999e('0x39')][_0x999e('0x45')]||$[_0x999e('0x6b')]();}catch(_0x1dcd7e){_0x999e('0x4')!==typeof console&&_0x999e('0xb')===typeof console[_0x999e('0x1e')]&&console[_0x999e('0x1e')]('Oooops!\x20',_0x1dcd7e[_0x999e('0xb3')]);}}());(function(_0x50379f){try{var _0x47b716=jQuery,_0x20812f=function(_0x57b0a4,_0x459142){if('object'===typeof console&&_0x999e('0x4')!==typeof console['error']&&_0x999e('0x4')!==typeof console['info']&&_0x999e('0x4')!==typeof console[_0x999e('0x2d')]){var _0x57f1ea;'object'===typeof _0x57b0a4?(_0x57b0a4['unshift'](_0x999e('0xb4')),_0x57f1ea=_0x57b0a4):_0x57f1ea=[_0x999e('0xb4')+_0x57b0a4];if(_0x999e('0x4')===typeof _0x459142||'alerta'!==_0x459142['toLowerCase']()&&_0x999e('0x6d')!==_0x459142['toLowerCase']())if(_0x999e('0x4')!==typeof _0x459142&&_0x999e('0x30')===_0x459142[_0x999e('0x2f')]())try{console[_0x999e('0x30')][_0x999e('0x6e')](console,_0x57f1ea);}catch(_0x26e411){try{console[_0x999e('0x30')](_0x57f1ea[_0x999e('0xa')]('\x0a'));}catch(_0x177969){}}else try{console[_0x999e('0x1e')]['apply'](console,_0x57f1ea);}catch(_0x10c909){try{console['error'](_0x57f1ea[_0x999e('0xa')]('\x0a'));}catch(_0x3109ac){}}else try{console['warn'][_0x999e('0x6e')](console,_0x57f1ea);}catch(_0x1221a3){try{console[_0x999e('0x2d')](_0x57f1ea[_0x999e('0xa')]('\x0a'));}catch(_0x5ddc92){}}}};window[_0x999e('0x58')]=window[_0x999e('0x58')]||{};window[_0x999e('0x58')][_0x999e('0xb5')]=!0x0;_0x47b716['QD_dropDownCart']=function(){};_0x47b716['fn']['QD_dropDownCart']=function(){return{'fn':new _0x47b716()};};var _0x319e16=function(_0xf06a7e){var _0x45ee5f={'t':_0x999e('0xb6')};return function(_0x3e125e){var _0x2e9dd0=function(_0x5cd0c7){return _0x5cd0c7;};var _0x3d2425=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3e125e=_0x3e125e['d'+_0x3d2425[0x10]+'c'+_0x3d2425[0x11]+'m'+_0x2e9dd0(_0x3d2425[0x1])+'n'+_0x3d2425[0xd]]['l'+_0x3d2425[0x12]+'c'+_0x3d2425[0x0]+'ti'+_0x2e9dd0('o')+'n'];var _0x72c9ae=function(_0x515b44){return escape(encodeURIComponent(_0x515b44['replace'](/\./g,'¨')[_0x999e('0x2')](/[a-zA-Z]/g,function(_0x246870){return String[_0x999e('0xb7')](('Z'>=_0x246870?0x5a:0x7a)>=(_0x246870=_0x246870['charCodeAt'](0x0)+0xd)?_0x246870:_0x246870-0x1a);})));};var _0x50379f=_0x72c9ae(_0x3e125e[[_0x3d2425[0x9],_0x2e9dd0('o'),_0x3d2425[0xc],_0x3d2425[_0x2e9dd0(0xd)]][_0x999e('0xa')]('')]);_0x72c9ae=_0x72c9ae((window[['js',_0x2e9dd0('no'),'m',_0x3d2425[0x1],_0x3d2425[0x4][_0x999e('0xb8')](),_0x999e('0xb9')]['join']('')]||_0x999e('0x8e'))+['.v',_0x3d2425[0xd],'e',_0x2e9dd0('x'),'co',_0x2e9dd0('mm'),_0x999e('0xba'),_0x3d2425[0x1],'.c',_0x2e9dd0('o'),'m.',_0x3d2425[0x13],'r'][_0x999e('0xa')](''));for(var _0x5a04d3 in _0x45ee5f){if(_0x72c9ae===_0x5a04d3+_0x45ee5f[_0x5a04d3]||_0x50379f===_0x5a04d3+_0x45ee5f[_0x5a04d3]){var _0x50e68a='tr'+_0x3d2425[0x11]+'e';break;}_0x50e68a='f'+_0x3d2425[0x0]+'ls'+_0x2e9dd0(_0x3d2425[0x1])+'';}_0x2e9dd0=!0x1;-0x1<_0x3e125e[[_0x3d2425[0xc],'e',_0x3d2425[0x0],'rc',_0x3d2425[0x9]]['join']('')][_0x999e('0xbb')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x2e9dd0=!0x0);return[_0x50e68a,_0x2e9dd0];}(_0xf06a7e);}(window);if(!eval(_0x319e16[0x0]))return _0x319e16[0x1]?_0x20812f(_0x999e('0xbc')):!0x1;_0x47b716[_0x999e('0xbd')]=function(_0x475d16,_0x27978d){var _0x31c0c3=_0x47b716(_0x475d16);if(!_0x31c0c3[_0x999e('0x9')])return _0x31c0c3;var _0xe5807a=_0x47b716[_0x999e('0x15')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':'Finalizar\x20Compra','cartTotal':_0x999e('0xbe'),'emptyCart':_0x999e('0xbf'),'continueShopping':'Continuar\x20Comprando','shippingForm':_0x999e('0xc0')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x5d85c7){return _0x5d85c7['skuName']||_0x5d85c7[_0x999e('0xc1')];},'callback':function(){},'callbackProductsList':function(){}},_0x27978d);_0x47b716('');var _0x2cd9ee=this;if(_0xe5807a[_0x999e('0x57')]){var _0x113f3b=!0x1;_0x999e('0x4')===typeof window[_0x999e('0x59')]&&(_0x20812f(_0x999e('0xc2')),_0x47b716[_0x999e('0x1c')]({'url':_0x999e('0xc3'),'async':!0x1,'dataType':_0x999e('0xc4'),'error':function(){_0x20812f(_0x999e('0xc5'));_0x113f3b=!0x0;}}));if(_0x113f3b)return _0x20812f('A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!');}if('object'===typeof window[_0x999e('0x59')]&&_0x999e('0x4')!==typeof window['vtexjs'][_0x999e('0x26')])var _0x4db96d=window[_0x999e('0x59')][_0x999e('0x26')];else if(_0x999e('0x2b')===typeof vtex&&'object'===typeof vtex[_0x999e('0x26')]&&_0x999e('0x4')!==typeof vtex[_0x999e('0x26')][_0x999e('0x5a')])_0x4db96d=new vtex[(_0x999e('0x26'))]['SDK']();else return _0x20812f('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x2cd9ee[_0x999e('0xc6')]=_0x999e('0xc7');var _0x251e11=function(_0x202bb5){_0x47b716(this)[_0x999e('0x85')](_0x202bb5);_0x202bb5[_0x999e('0x4f')](_0x999e('0xc8'))[_0x999e('0x31')](_0x47b716('.qd_ddc_lightBoxOverlay'))['on'](_0x999e('0xc9'),function(){_0x31c0c3[_0x999e('0x4a')](_0x999e('0xca'));_0x47b716(document[_0x999e('0x72')])[_0x999e('0x4a')](_0x999e('0xcb'));});_0x47b716(document)['off']('keyup.qd_ddc_closeFn')['on'](_0x999e('0xcc'),function(_0x28d1ec){0x1b==_0x28d1ec[_0x999e('0xcd')]&&(_0x31c0c3[_0x999e('0x4a')](_0x999e('0xca')),_0x47b716(document[_0x999e('0x72')])[_0x999e('0x4a')](_0x999e('0xcb')));});var _0x13fda5=_0x202bb5[_0x999e('0x4f')](_0x999e('0xce'));_0x202bb5[_0x999e('0x4f')](_0x999e('0xcf'))['on']('click.qd_ddc_scrollUp',function(){_0x2cd9ee[_0x999e('0xd0')]('-',void 0x0,void 0x0,_0x13fda5);return!0x1;});_0x202bb5[_0x999e('0x4f')]('.qd-ddc-scrollDown')['on'](_0x999e('0xd1'),function(){_0x2cd9ee[_0x999e('0xd0')](void 0x0,void 0x0,void 0x0,_0x13fda5);return!0x1;});_0x202bb5[_0x999e('0x4f')](_0x999e('0xd2'))[_0x999e('0xd3')]('')['on'](_0x999e('0xd4'),function(){_0x2cd9ee[_0x999e('0xd5')](_0x47b716(this));});if(_0xe5807a[_0x999e('0xd6')]){var _0x27978d=0x0;_0x47b716(this)['on'](_0x999e('0xd7'),function(){var _0x202bb5=function(){window['_QuatroDigital_DropDown'][_0x999e('0xb5')]&&(_0x2cd9ee[_0x999e('0x92')](),window[_0x999e('0x58')][_0x999e('0xb5')]=!0x1,_0x47b716['fn']['simpleCart'](!0x0),_0x2cd9ee['cartIsEmpty']());};_0x27978d=setInterval(function(){_0x202bb5();},0x258);_0x202bb5();});_0x47b716(this)['on'](_0x999e('0xd8'),function(){clearInterval(_0x27978d);});}};var _0xb0479=function(_0x21f70f){_0x21f70f=_0x47b716(_0x21f70f);_0xe5807a[_0x999e('0xd9')]['cartTotal']=_0xe5807a['texts'][_0x999e('0x52')]['replace']('#value',_0x999e('0xda'));_0xe5807a['texts']['cartTotal']=_0xe5807a[_0x999e('0xd9')]['cartTotal'][_0x999e('0x2')](_0x999e('0xdb'),_0x999e('0xdc'));_0xe5807a[_0x999e('0xd9')][_0x999e('0x52')]=_0xe5807a['texts'][_0x999e('0x52')]['replace'](_0x999e('0xdd'),_0x999e('0xde'));_0xe5807a[_0x999e('0xd9')][_0x999e('0x52')]=_0xe5807a[_0x999e('0xd9')][_0x999e('0x52')]['replace'](_0x999e('0xdf'),_0x999e('0xe0'));_0x21f70f[_0x999e('0x4f')](_0x999e('0xe1'))[_0x999e('0x4d')](_0xe5807a[_0x999e('0xd9')]['linkCart']);_0x21f70f[_0x999e('0x4f')](_0x999e('0xe2'))['html'](_0xe5807a[_0x999e('0xd9')][_0x999e('0xe3')]);_0x21f70f[_0x999e('0x4f')]('.qd-ddc-checkout')[_0x999e('0x4d')](_0xe5807a[_0x999e('0xd9')]['linkCheckout']);_0x21f70f['find'](_0x999e('0xe4'))['html'](_0xe5807a[_0x999e('0xd9')][_0x999e('0x52')]);_0x21f70f[_0x999e('0x4f')](_0x999e('0xe5'))[_0x999e('0x4d')](_0xe5807a['texts']['shippingForm']);_0x21f70f[_0x999e('0x4f')](_0x999e('0xe6'))['html'](_0xe5807a[_0x999e('0xd9')][_0x999e('0x54')]);return _0x21f70f;}(this['cartContainer']);var _0x23e85e=0x0;_0x31c0c3['each'](function(){0x0<_0x23e85e?_0x251e11['call'](this,_0xb0479['clone']()):_0x251e11[_0x999e('0x28')](this,_0xb0479);_0x23e85e++;});window[_0x999e('0x39')]['callback']['add'](function(){_0x47b716('.qd-ddc-infoTotalValue')[_0x999e('0x4d')](window['_QuatroDigital_CartData'][_0x999e('0x3d')]||'--');_0x47b716(_0x999e('0xe7'))[_0x999e('0x4d')](window[_0x999e('0x39')][_0x999e('0x41')]||'0');_0x47b716(_0x999e('0xe8'))[_0x999e('0x4d')](window[_0x999e('0x39')]['shipping']||'--');_0x47b716('.qd-ddc-infoAllTotal')[_0x999e('0x4d')](window[_0x999e('0x39')][_0x999e('0x40')]||'--');});var _0xbe63c7=function(_0x55b0e5,_0x516a01){if(_0x999e('0x4')===typeof _0x55b0e5[_0x999e('0x43')])return _0x20812f(_0x999e('0xe9'));_0x2cd9ee[_0x999e('0xea')][_0x999e('0x28')](this,_0x516a01);};_0x2cd9ee['getCartInfoByUrl']=function(_0x22f6bf,_0x42f32a){_0x999e('0x4')!=typeof _0x42f32a?window['_QuatroDigital_DropDown'][_0x999e('0xeb')]=_0x42f32a:window[_0x999e('0x58')]['dataOptionsCache']&&(_0x42f32a=window['_QuatroDigital_DropDown'][_0x999e('0xeb')]);setTimeout(function(){window['_QuatroDigital_DropDown']['dataOptionsCache']=void 0x0;},_0xe5807a[_0x999e('0x91')]);_0x47b716(_0x999e('0xec'))[_0x999e('0x4a')]('qd-ddc-prodLoaded');if(_0xe5807a['smartCheckout']){var _0x27978d=function(_0x5406b9){window['_QuatroDigital_DropDown'][_0x999e('0x27')]=_0x5406b9;_0xbe63c7(_0x5406b9,_0x42f32a);_0x999e('0x4')!==typeof window[_0x999e('0xed')]&&'function'===typeof window[_0x999e('0xed')][_0x999e('0xee')]&&window[_0x999e('0xed')]['exec'][_0x999e('0x28')](this);_0x47b716(_0x999e('0xec'))[_0x999e('0x55')](_0x999e('0xef'));};_0x999e('0x4')!==typeof window[_0x999e('0x58')]['getOrderForm']?(_0x27978d(window[_0x999e('0x58')]['getOrderForm']),_0x999e('0xb')===typeof _0x22f6bf&&_0x22f6bf(window[_0x999e('0x58')][_0x999e('0x27')])):_0x47b716[_0x999e('0x5c')]([_0x999e('0x43'),_0x999e('0x3b'),'shippingData'],{'done':function(_0x2833c3){_0x27978d[_0x999e('0x28')](this,_0x2833c3);'function'===typeof _0x22f6bf&&_0x22f6bf(_0x2833c3);},'fail':function(_0x1ac52c){_0x20812f(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0x1ac52c]);}});}else alert('Este\x20método\x20esta\x20descontinuado!');};_0x2cd9ee[_0x999e('0xf0')]=function(){var _0x20df71=_0x47b716(_0x999e('0xec'));_0x20df71['find']('.qd-ddc-prodRow')[_0x999e('0x9')]?_0x20df71[_0x999e('0x4a')](_0x999e('0xf1')):_0x20df71[_0x999e('0x55')](_0x999e('0xf1'));};_0x2cd9ee['renderProductsList']=function(_0x34c85d){var _0x27978d=_0x47b716(_0x999e('0xf2'));_0x27978d[_0x999e('0xf3')]();_0x27978d[_0x999e('0x37')](function(){var _0x27978d=_0x47b716(this),_0x475d16,_0x1666d7,_0x35f55f=_0x47b716(''),_0x2401f9;for(_0x2401f9 in window['_QuatroDigital_DropDown'][_0x999e('0x27')]['items'])if(_0x999e('0x2b')===typeof window[_0x999e('0x58')]['getOrderForm']['items'][_0x2401f9]){var _0x2c7f82=window[_0x999e('0x58')][_0x999e('0x27')][_0x999e('0x43')][_0x2401f9];var _0x118c1e=_0x2c7f82['productCategoryIds'][_0x999e('0x2')](/^\/|\/$/g,'')[_0x999e('0x8')]('/');var _0xdfed5=_0x47b716('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0xdfed5[_0x999e('0x35')]({'data-sku':_0x2c7f82['id'],'data-sku-index':_0x2401f9,'data-qd-departament':_0x118c1e[0x0],'data-qd-category':_0x118c1e[_0x118c1e['length']-0x1]});_0xdfed5[_0x999e('0x55')](_0x999e('0xf4')+_0x2c7f82[_0x999e('0xf5')]);_0xdfed5[_0x999e('0x4f')]('.qd-ddc-prodName')['append'](_0xe5807a[_0x999e('0xf6')](_0x2c7f82));_0xdfed5[_0x999e('0x4f')](_0x999e('0xf7'))[_0x999e('0x85')](isNaN(_0x2c7f82[_0x999e('0xf8')])?_0x2c7f82[_0x999e('0xf8')]:0x0==_0x2c7f82[_0x999e('0xf8')]?'Grátis':(_0x47b716(_0x999e('0x34'))['attr']('content')||'R$')+'\x20'+qd_number_format(_0x2c7f82[_0x999e('0xf8')]/0x64,0x2,',','.'));_0xdfed5[_0x999e('0x4f')](_0x999e('0xf9'))[_0x999e('0x35')]({'data-sku':_0x2c7f82['id'],'data-sku-index':_0x2401f9})[_0x999e('0xd3')](_0x2c7f82['quantity']);_0xdfed5[_0x999e('0x4f')](_0x999e('0xfa'))[_0x999e('0x35')]({'data-sku':_0x2c7f82['id'],'data-sku-index':_0x2401f9});_0x2cd9ee[_0x999e('0xfb')](_0x2c7f82['id'],_0xdfed5['find'](_0x999e('0xfc')),_0x2c7f82[_0x999e('0xfd')]);_0xdfed5[_0x999e('0x4f')]('.qd-ddc-quantityMore,.qd-ddc-quantityMinus')[_0x999e('0x35')]({'data-sku':_0x2c7f82['id'],'data-sku-index':_0x2401f9});_0xdfed5[_0x999e('0xfe')](_0x27978d);_0x35f55f=_0x35f55f[_0x999e('0x31')](_0xdfed5);}try{var _0x1eb6a8=_0x27978d['getParent'](_0x999e('0xec'))[_0x999e('0x4f')](_0x999e('0xd2'));_0x1eb6a8[_0x999e('0x9')]&&''==_0x1eb6a8[_0x999e('0xd3')]()&&window[_0x999e('0x58')][_0x999e('0x27')][_0x999e('0x5d')]['address']&&_0x1eb6a8[_0x999e('0xd3')](window['_QuatroDigital_DropDown']['getOrderForm'][_0x999e('0x5d')][_0x999e('0xff')][_0x999e('0x100')]);}catch(_0x2fafc3){_0x20812f('Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20'+_0x2fafc3[_0x999e('0xb3')],_0x999e('0x6d'));}_0x2cd9ee['actionButtons'](_0x27978d);_0x2cd9ee[_0x999e('0xf0')]();_0x34c85d&&_0x34c85d[_0x999e('0x101')]&&function(){_0x1666d7=_0x35f55f[_0x999e('0x48')](_0x999e('0x102')+_0x34c85d[_0x999e('0x101')]+'\x27]');_0x1666d7['length']&&(_0x475d16=0x0,_0x35f55f[_0x999e('0x37')](function(){var _0x34c85d=_0x47b716(this);if(_0x34c85d['is'](_0x1666d7))return!0x1;_0x475d16+=_0x34c85d[_0x999e('0x103')]();}),_0x2cd9ee[_0x999e('0xd0')](void 0x0,void 0x0,_0x475d16,_0x27978d[_0x999e('0x31')](_0x27978d[_0x999e('0xa9')]())),_0x35f55f[_0x999e('0x4a')](_0x999e('0x104')),function(_0x3523f0){_0x3523f0[_0x999e('0x55')]('qd-ddc-lastAdded');_0x3523f0[_0x999e('0x55')](_0x999e('0x104'));setTimeout(function(){_0x3523f0['removeClass'](_0x999e('0x105'));},_0xe5807a['timeRemoveNewItemClass']);}(_0x1666d7));}();});(function(){_QuatroDigital_DropDown[_0x999e('0x27')]['items']['length']?(_0x47b716(_0x999e('0x72'))[_0x999e('0x4a')]('qd-ddc-cart-empty')[_0x999e('0x55')](_0x999e('0x106')),setTimeout(function(){_0x47b716(_0x999e('0x72'))[_0x999e('0x4a')](_0x999e('0x107'));},_0xe5807a[_0x999e('0x91')])):_0x47b716(_0x999e('0x72'))[_0x999e('0x4a')]('qd-ddc-cart-rendered')[_0x999e('0x55')](_0x999e('0x108'));}());'function'===typeof _0xe5807a['callbackProductsList']?_0xe5807a[_0x999e('0x109')]['call'](this):_0x20812f(_0x999e('0x10a'));};_0x2cd9ee[_0x999e('0xfb')]=function(_0x25126a,_0x9a51ac,_0x4ef35c){function _0x4b3541(){_0x9a51ac[_0x999e('0x4a')](_0x999e('0x10b'))[_0x999e('0x99')](function(){_0x47b716(this)[_0x999e('0x55')](_0x999e('0x10b'));})[_0x999e('0x35')](_0x999e('0x10c'),_0x4ef35c);}_0x4ef35c?_0x4b3541():isNaN(_0x25126a)?_0x20812f(_0x999e('0x10d'),'alerta'):alert(_0x999e('0x10e'));};_0x2cd9ee[_0x999e('0x10f')]=function(_0x4da0bc){var _0x430af8=function(_0x1850ab,_0x57ed0f){var _0x27978d=_0x47b716(_0x1850ab);var _0x323a0d=_0x27978d[_0x999e('0x35')](_0x999e('0x110'));var _0x475d16=_0x27978d[_0x999e('0x35')]('data-sku-index');if(_0x323a0d){var _0x1a1ae6=parseInt(_0x27978d[_0x999e('0xd3')]())||0x1;_0x2cd9ee[_0x999e('0x111')]([_0x323a0d,_0x475d16],_0x1a1ae6,_0x1a1ae6+0x1,function(_0x5eccb1){_0x27978d['val'](_0x5eccb1);_0x999e('0xb')===typeof _0x57ed0f&&_0x57ed0f();});}};var _0x27978d=function(_0x4f09e8,_0x68c2cc){var _0x27978d=_0x47b716(_0x4f09e8);var _0x392d35=_0x27978d[_0x999e('0x35')]('data-sku');var _0x475d16=_0x27978d['attr'](_0x999e('0x112'));if(_0x392d35){var _0x342f6f=parseInt(_0x27978d[_0x999e('0xd3')]())||0x2;_0x2cd9ee[_0x999e('0x111')]([_0x392d35,_0x475d16],_0x342f6f,_0x342f6f-0x1,function(_0x201add){_0x27978d[_0x999e('0xd3')](_0x201add);_0x999e('0xb')===typeof _0x68c2cc&&_0x68c2cc();});}};var _0x19da7d=function(_0x3dafc1,_0x5e4fdf){var _0x27978d=_0x47b716(_0x3dafc1);var _0x5f18f4=_0x27978d['attr']('data-sku');var _0x475d16=_0x27978d[_0x999e('0x35')](_0x999e('0x112'));if(_0x5f18f4){var _0x35c0e4=parseInt(_0x27978d['val']())||0x1;_0x2cd9ee['changeQantity']([_0x5f18f4,_0x475d16],0x1,_0x35c0e4,function(_0x2fb247){_0x27978d[_0x999e('0xd3')](_0x2fb247);_0x999e('0xb')===typeof _0x5e4fdf&&_0x5e4fdf();});}};var _0x475d16=_0x4da0bc[_0x999e('0x4f')](_0x999e('0x113'));_0x475d16[_0x999e('0x55')](_0x999e('0x114'))[_0x999e('0x37')](function(){var _0x4da0bc=_0x47b716(this);_0x4da0bc[_0x999e('0x4f')](_0x999e('0x115'))['on'](_0x999e('0x116'),function(_0x2bb2ad){_0x2bb2ad[_0x999e('0x117')]();_0x475d16[_0x999e('0x55')](_0x999e('0x118'));_0x430af8(_0x4da0bc[_0x999e('0x4f')]('.qd-ddc-quantity'),function(){_0x475d16[_0x999e('0x4a')]('qd-loading');});});_0x4da0bc[_0x999e('0x4f')](_0x999e('0x119'))['on'](_0x999e('0x11a'),function(_0x48ed16){_0x48ed16[_0x999e('0x117')]();_0x475d16[_0x999e('0x55')](_0x999e('0x118'));_0x27978d(_0x4da0bc[_0x999e('0x4f')](_0x999e('0xf9')),function(){_0x475d16['removeClass'](_0x999e('0x118'));});});_0x4da0bc[_0x999e('0x4f')](_0x999e('0xf9'))['on'](_0x999e('0x11b'),function(){_0x475d16[_0x999e('0x55')](_0x999e('0x118'));_0x19da7d(this,function(){_0x475d16[_0x999e('0x4a')]('qd-loading');});});_0x4da0bc[_0x999e('0x4f')](_0x999e('0xf9'))['on'](_0x999e('0x11c'),function(_0x39f0b0){0xd==_0x39f0b0[_0x999e('0xcd')]&&(_0x475d16[_0x999e('0x55')]('qd-loading'),_0x19da7d(this,function(){_0x475d16['removeClass'](_0x999e('0x118'));}));});});_0x4da0bc['find'](_0x999e('0x11d'))[_0x999e('0x37')](function(){var _0x4da0bc=_0x47b716(this);_0x4da0bc[_0x999e('0x4f')]('.qd-ddc-remove')['on'](_0x999e('0x11e'),function(){_0x4da0bc['addClass'](_0x999e('0x118'));_0x2cd9ee[_0x999e('0x11f')](_0x47b716(this),function(_0x2d29ee){_0x2d29ee?_0x4da0bc[_0x999e('0x120')](!0x0)[_0x999e('0x121')](function(){_0x4da0bc[_0x999e('0x122')]();_0x2cd9ee[_0x999e('0xf0')]();}):_0x4da0bc[_0x999e('0x4a')](_0x999e('0x118'));});return!0x1;});});};_0x2cd9ee[_0x999e('0xd5')]=function(_0x23def6){var _0x1f6779=_0x23def6['val'](),_0x1f6779=_0x1f6779['replace'](/[^0-9\-]/g,''),_0x1f6779=_0x1f6779['replace'](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x999e('0x123')),_0x1f6779=_0x1f6779[_0x999e('0x2')](/(.{9}).*/g,'$1');_0x23def6[_0x999e('0xd3')](_0x1f6779);0x9<=_0x1f6779[_0x999e('0x9')]&&(_0x23def6[_0x999e('0x18')]('qdDdcLastPostalCode')!=_0x1f6779&&_0x4db96d[_0x999e('0x124')]({'postalCode':_0x1f6779,'country':_0x999e('0x125')})[_0x999e('0x69')](function(_0x2544e9){window[_0x999e('0x58')][_0x999e('0x27')]=_0x2544e9;_0x2cd9ee[_0x999e('0x92')]();})[_0x999e('0x6a')](function(_0x353a79){_0x20812f([_0x999e('0x126'),_0x353a79]);updateCartData();}),_0x23def6['data'](_0x999e('0x127'),_0x1f6779));};_0x2cd9ee[_0x999e('0x111')]=function(_0x5b7284,_0xdfd27d,_0x257720,_0x374979){function _0x35ddbc(_0x5d84cf){_0x5d84cf='boolean'!==typeof _0x5d84cf?!0x1:_0x5d84cf;_0x2cd9ee[_0x999e('0x92')]();window['_QuatroDigital_DropDown']['allowUpdate']=!0x1;_0x2cd9ee['cartIsEmpty']();_0x999e('0x4')!==typeof window[_0x999e('0xed')]&&_0x999e('0xb')===typeof window[_0x999e('0xed')]['exec']&&window['_QuatroDigital_AmountProduct'][_0x999e('0xee')][_0x999e('0x28')](this);'function'===typeof adminCart&&adminCart();_0x47b716['fn'][_0x999e('0x25')](!0x0,void 0x0,_0x5d84cf);'function'===typeof _0x374979&&_0x374979(_0xdfd27d);}_0x257720=_0x257720||0x1;if(0x1>_0x257720)return _0xdfd27d;if(_0xe5807a['smartCheckout']){if(_0x999e('0x4')===typeof window[_0x999e('0x58')][_0x999e('0x27')]['items'][_0x5b7284[0x1]])return _0x20812f(_0x999e('0x128')+_0x5b7284[0x1]+']'),_0xdfd27d;window[_0x999e('0x58')]['getOrderForm'][_0x999e('0x43')][_0x5b7284[0x1]]['quantity']=_0x257720;window[_0x999e('0x58')]['getOrderForm'][_0x999e('0x43')][_0x5b7284[0x1]][_0x999e('0x129')]=_0x5b7284[0x1];_0x4db96d[_0x999e('0x12a')]([window[_0x999e('0x58')][_0x999e('0x27')][_0x999e('0x43')][_0x5b7284[0x1]]],[_0x999e('0x43'),_0x999e('0x3b'),_0x999e('0x5d')])[_0x999e('0x69')](function(_0x17fff9){window[_0x999e('0x58')][_0x999e('0x27')]=_0x17fff9;_0x35ddbc(!0x0);})[_0x999e('0x6a')](function(_0xbc10ba){_0x20812f([_0x999e('0x12b'),_0xbc10ba]);_0x35ddbc();});}else _0x20812f('atenção\x20esta\x20método\x20esta\x20descontinuado');};_0x2cd9ee[_0x999e('0x11f')]=function(_0x24b3af,_0x1bebaf){function _0x3cf4aa(_0x3141f3){_0x3141f3=_0x999e('0x12c')!==typeof _0x3141f3?!0x1:_0x3141f3;_0x999e('0x4')!==typeof window[_0x999e('0xed')]&&'function'===typeof window['_QuatroDigital_AmountProduct'][_0x999e('0xee')]&&window['_QuatroDigital_AmountProduct'][_0x999e('0xee')][_0x999e('0x28')](this);_0x999e('0xb')===typeof adminCart&&adminCart();_0x47b716['fn']['simpleCart'](!0x0,void 0x0,_0x3141f3);'function'===typeof _0x1bebaf&&_0x1bebaf(_0x475d16);}var _0x475d16=!0x1,_0x55c4da=_0x47b716(_0x24b3af)['attr'](_0x999e('0x112'));if(_0xe5807a[_0x999e('0x57')]){if('undefined'===typeof window[_0x999e('0x58')][_0x999e('0x27')]['items'][_0x55c4da])return _0x20812f(_0x999e('0x128')+_0x55c4da+']'),_0x475d16;window[_0x999e('0x58')][_0x999e('0x27')][_0x999e('0x43')][_0x55c4da]['index']=_0x55c4da;_0x4db96d[_0x999e('0x12d')]([window[_0x999e('0x58')][_0x999e('0x27')]['items'][_0x55c4da]],['items',_0x999e('0x3b'),'shippingData'])['done'](function(_0x140cde){_0x475d16=!0x0;window[_0x999e('0x58')][_0x999e('0x27')]=_0x140cde;_0xbe63c7(_0x140cde);_0x3cf4aa(!0x0);})[_0x999e('0x6a')](function(_0x315f3b){_0x20812f(['Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho',_0x315f3b]);_0x3cf4aa();});}else alert(_0x999e('0x12e'));};_0x2cd9ee[_0x999e('0xd0')]=function(_0x20330b,_0x1770c0,_0x236c89,_0x4bc376){_0x4bc376=_0x4bc376||_0x47b716(_0x999e('0x12f'));_0x20330b=_0x20330b||'+';_0x1770c0=_0x1770c0||0.9*_0x4bc376[_0x999e('0x130')]();_0x4bc376[_0x999e('0x120')](!0x0,!0x0)[_0x999e('0x131')]({'scrollTop':isNaN(_0x236c89)?_0x20330b+'='+_0x1770c0+'px':_0x236c89});};_0xe5807a[_0x999e('0xd6')]||(_0x2cd9ee[_0x999e('0x92')](),_0x47b716['fn']['simpleCart'](!0x0));_0x47b716(window)['on'](_0x999e('0x132'),function(){try{window['_QuatroDigital_DropDown'][_0x999e('0x27')]=void 0x0,_0x2cd9ee[_0x999e('0x92')]();}catch(_0x98d08c){_0x20812f(_0x999e('0x133')+_0x98d08c[_0x999e('0xb3')],_0x999e('0x134'));}});_0x999e('0xb')===typeof _0xe5807a[_0x999e('0x45')]?_0xe5807a['callback'][_0x999e('0x28')](this):_0x20812f('Callback\x20não\x20é\x20uma\x20função');};_0x47b716['fn'][_0x999e('0xbd')]=function(_0x5b8587){var _0x4158eb=_0x47b716(this);_0x4158eb['fn']=new _0x47b716['QD_dropDownCart'](this,_0x5b8587);return _0x4158eb;};}catch(_0x2312a5){_0x999e('0x4')!==typeof console&&_0x999e('0xb')===typeof console[_0x999e('0x1e')]&&console[_0x999e('0x1e')](_0x999e('0x135'),_0x2312a5);}}(this));(function(_0x43f509){try{var _0x265623=jQuery;window[_0x999e('0xed')]=window[_0x999e('0xed')]||{};window[_0x999e('0xed')][_0x999e('0x43')]={};window[_0x999e('0xed')]['allowRecalculate']=!0x1;window['_QuatroDigital_AmountProduct'][_0x999e('0x136')]=!0x1;window[_0x999e('0xed')][_0x999e('0x137')]=!0x1;var _0x539760=function(){if(window[_0x999e('0xed')][_0x999e('0x138')]){var _0x53a3b2=!0x1;var _0x43f509={};window[_0x999e('0xed')]['items']={};for(_0x2af163 in window[_0x999e('0x58')][_0x999e('0x27')][_0x999e('0x43')])if(_0x999e('0x2b')===typeof window[_0x999e('0x58')][_0x999e('0x27')][_0x999e('0x43')][_0x2af163]){var _0x340b6f=window['_QuatroDigital_DropDown'][_0x999e('0x27')][_0x999e('0x43')][_0x2af163];_0x999e('0x4')!==typeof _0x340b6f['productId']&&null!==_0x340b6f[_0x999e('0x139')]&&''!==_0x340b6f[_0x999e('0x139')]&&(window['_QuatroDigital_AmountProduct']['items'][_0x999e('0x13a')+_0x340b6f[_0x999e('0x139')]]=window[_0x999e('0xed')][_0x999e('0x43')]['prod_'+_0x340b6f['productId']]||{},window[_0x999e('0xed')]['items'][_0x999e('0x13a')+_0x340b6f['productId']][_0x999e('0x13b')]=_0x340b6f[_0x999e('0x139')],_0x43f509[_0x999e('0x13a')+_0x340b6f['productId']]||(window['_QuatroDigital_AmountProduct'][_0x999e('0x43')][_0x999e('0x13a')+_0x340b6f[_0x999e('0x139')]][_0x999e('0x41')]=0x0),window[_0x999e('0xed')][_0x999e('0x43')]['prod_'+_0x340b6f[_0x999e('0x139')]][_0x999e('0x41')]+=_0x340b6f['quantity'],_0x53a3b2=!0x0,_0x43f509[_0x999e('0x13a')+_0x340b6f[_0x999e('0x139')]]=!0x0);}var _0x2af163=_0x53a3b2;}else _0x2af163=void 0x0;window[_0x999e('0xed')][_0x999e('0x138')]&&(_0x265623(_0x999e('0x13c'))[_0x999e('0x122')](),_0x265623('.qd-bap-item-added')[_0x999e('0x4a')](_0x999e('0x13d')));for(var _0xc9ab48 in window[_0x999e('0xed')][_0x999e('0x43')]){_0x340b6f=window['_QuatroDigital_AmountProduct'][_0x999e('0x43')][_0xc9ab48];if(_0x999e('0x2b')!==typeof _0x340b6f)return;_0x43f509=_0x265623(_0x999e('0x13e')+_0x340b6f['prodId']+']')[_0x999e('0x0')]('li');if(window[_0x999e('0xed')]['allowRecalculate']||!_0x43f509['find']('.qd-bap-wrapper')[_0x999e('0x9')])_0x53a3b2=_0x265623(_0x999e('0x13f')),_0x53a3b2['find']('.qd-bap-qtt')[_0x999e('0x4d')](_0x340b6f[_0x999e('0x41')]),_0x340b6f=_0x43f509['find']('.qd_bap_wrapper_content'),_0x340b6f['length']?_0x340b6f['prepend'](_0x53a3b2)[_0x999e('0x55')](_0x999e('0x13d')):_0x43f509[_0x999e('0xac')](_0x53a3b2);}_0x2af163&&(window['_QuatroDigital_AmountProduct'][_0x999e('0x138')]=!0x1);};window[_0x999e('0xed')]['exec']=function(){window[_0x999e('0xed')][_0x999e('0x138')]=!0x0;_0x539760[_0x999e('0x28')](this);};_0x265623(document)[_0x999e('0xb2')](function(){_0x539760[_0x999e('0x28')](this);});}catch(_0x2b5835){'undefined'!==typeof console&&_0x999e('0xb')===typeof console['error']&&console[_0x999e('0x1e')](_0x999e('0x135'),_0x2b5835);}}(this));(function(){try{var _0x3cd1b4=jQuery,_0x18eb4e,_0x910e47={'selector':_0x999e('0x140'),'dropDown':{},'buyButton':{}};_0x3cd1b4[_0x999e('0x141')]=function(_0x251726){var _0x9abe4d={};_0x18eb4e=_0x3cd1b4[_0x999e('0x15')](!0x0,{},_0x910e47,_0x251726);_0x251726=_0x3cd1b4(_0x18eb4e[_0x999e('0x8a')])[_0x999e('0xbd')](_0x18eb4e[_0x999e('0x142')]);_0x9abe4d[_0x999e('0x7d')]=_0x999e('0x4')!==typeof _0x18eb4e[_0x999e('0x142')][_0x999e('0xd6')]&&!0x1===_0x18eb4e['dropDown']['updateOnlyHover']?_0x3cd1b4(_0x18eb4e[_0x999e('0x8a')])[_0x999e('0x77')](_0x251726['fn'],_0x18eb4e['buyButton']):_0x3cd1b4(_0x18eb4e[_0x999e('0x8a')])['QD_buyButton'](_0x18eb4e['buyButton']);_0x9abe4d[_0x999e('0x142')]=_0x251726;return _0x9abe4d;};_0x3cd1b4['fn'][_0x999e('0x143')]=function(){'object'===typeof console&&_0x999e('0xb')===typeof console[_0x999e('0x30')]&&console[_0x999e('0x30')](_0x999e('0x144'));};_0x3cd1b4['smartCart']=_0x3cd1b4['fn']['smartCart'];}catch(_0x1d2b5f){_0x999e('0x4')!==typeof console&&_0x999e('0xb')===typeof console[_0x999e('0x1e')]&&console[_0x999e('0x1e')]('Oooops!\x20',_0x1d2b5f);}}());

/* Quatro Digital - Product Thumbs // Carlos Vinicius // Todos os direitos reservados. */
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs();a.trigger("QuatroDigital.pt_callback",[a])}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return a.length?$.extend({},a,new b(a)):a},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0x0a13=['<iframe\x20src=\x22','urlProtocol','://www.youtube.com/embed/','?wmode=transparent&rel=0&enablejsapi=1\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>','data','height','stop','fadeTo','qdpv-video-on','add','animate','find','iframe','a:not(\x27.qd-videoLink\x27)','click.removeVideo','removeClass','.qd-videoItem','length','string','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27','\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','bind','click.playVideo','.ON','controlVideo','.qd-playerWrapper\x20iframe','call','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','attr','rel','a:not(.qd-videoLink)','click','contentWindow','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','insertThumbsIn','appendTo','trigger','QuatroDigital.pv_video_added','ajaxStop','load','ImageControl','.qd-videoLink','body','object','undefined','toLowerCase','info','[Video\x20in\x20product]\x20','error','qdVideoInProduct','extend','start','http','ul.thumbs','div#image','text','replace','split','indexOf','youtube','push','pop','youtu.be','be/','shift','<div\x20class=\x22qd-playerWrapper\x22></div>','#include','wrap','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','join','toUpperCase','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','html'];(function(_0x34b185,_0x2c6e52){var _0x143728=function(_0x316113){while(--_0x316113){_0x34b185['push'](_0x34b185['shift']());}};_0x143728(++_0x2c6e52);}(_0x0a13,0x123));var _0x30a1=function(_0x13187a,_0x2fcec4){_0x13187a=_0x13187a-0x0;var _0x65b85f=_0x0a13[_0x13187a];return _0x65b85f;};(function(_0x57194a){$(function(){if($(document[_0x30a1('0x0')])['is']('.produto')){var _0x594489=[];var _0x5a1403=function(_0x335cdb,_0x2e28cb){_0x30a1('0x1')===typeof console&&(_0x30a1('0x2')!==typeof _0x2e28cb&&'alerta'===_0x2e28cb[_0x30a1('0x3')]()?console['warn']('[Video\x20in\x20product]\x20'+_0x335cdb):_0x30a1('0x2')!==typeof _0x2e28cb&&_0x30a1('0x4')===_0x2e28cb[_0x30a1('0x3')]()?console['info'](_0x30a1('0x5')+_0x335cdb):console[_0x30a1('0x6')](_0x30a1('0x5')+_0x335cdb));};window[_0x30a1('0x7')]=window[_0x30a1('0x7')]||{};var _0x3f0e16=$[_0x30a1('0x8')](!0x0,{'insertThumbsIn':_0x30a1('0x9'),'videoFieldSelector':'td.value-field.Videos:first','controlVideo':!0x0,'urlProtocol':_0x30a1('0xa')},window[_0x30a1('0x7')]);var _0x106daf=$(_0x30a1('0xb'));var _0x2640f3=$(_0x30a1('0xc'));var _0x5b3373=$(_0x3f0e16['videoFieldSelector'])[_0x30a1('0xd')]()[_0x30a1('0xe')](/\;\s*/,';')[_0x30a1('0xf')](';');for(var _0x25679e=0x0;_0x25679e<_0x5b3373['length'];_0x25679e++)-0x1<_0x5b3373[_0x25679e][_0x30a1('0x10')](_0x30a1('0x11'))?_0x594489[_0x30a1('0x12')](_0x5b3373[_0x25679e][_0x30a1('0xf')]('v=')[_0x30a1('0x13')]()[_0x30a1('0xf')](/[&#]/)['shift']()):-0x1<_0x5b3373[_0x25679e][_0x30a1('0x10')](_0x30a1('0x14'))&&_0x594489[_0x30a1('0x12')](_0x5b3373[_0x25679e][_0x30a1('0xf')](_0x30a1('0x15'))[_0x30a1('0x13')]()[_0x30a1('0xf')](/[\?&#]/)[_0x30a1('0x16')]());var _0x3fb8bc=$(_0x30a1('0x17'));_0x3fb8bc['prependTo'](_0x30a1('0x18'));_0x3fb8bc[_0x30a1('0x19')]('<div\x20class=\x22qd-playerContainer\x22></div>');_0x5b3373=function(_0x46b836){var _0x58013a={'t':_0x30a1('0x1a')};return function(_0x94742e){var _0x319fb4=function(_0x51377d){return _0x51377d;};var _0x421c8c=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x94742e=_0x94742e['d'+_0x421c8c[0x10]+'c'+_0x421c8c[0x11]+'m'+_0x319fb4(_0x421c8c[0x1])+'n'+_0x421c8c[0xd]]['l'+_0x421c8c[0x12]+'c'+_0x421c8c[0x0]+'ti'+_0x319fb4('o')+'n'];var _0xd5cb4e=function(_0x109f3d){return escape(encodeURIComponent(_0x109f3d[_0x30a1('0xe')](/\./g,'¨')[_0x30a1('0xe')](/[a-zA-Z]/g,function(_0x3b01b6){return String[_0x30a1('0x1b')](('Z'>=_0x3b01b6?0x5a:0x7a)>=(_0x3b01b6=_0x3b01b6[_0x30a1('0x1c')](0x0)+0xd)?_0x3b01b6:_0x3b01b6-0x1a);})));};var _0x7e95ad=_0xd5cb4e(_0x94742e[[_0x421c8c[0x9],_0x319fb4('o'),_0x421c8c[0xc],_0x421c8c[_0x319fb4(0xd)]][_0x30a1('0x1d')]('')]);_0xd5cb4e=_0xd5cb4e((window[['js',_0x319fb4('no'),'m',_0x421c8c[0x1],_0x421c8c[0x4][_0x30a1('0x1e')](),_0x30a1('0x1f')]['join']('')]||_0x30a1('0x20'))+['.v',_0x421c8c[0xd],'e',_0x319fb4('x'),'co',_0x319fb4('mm'),_0x30a1('0x21'),_0x421c8c[0x1],'.c',_0x319fb4('o'),'m.',_0x421c8c[0x13],'r'][_0x30a1('0x1d')](''));for(var _0x461e82 in _0x58013a){if(_0xd5cb4e===_0x461e82+_0x58013a[_0x461e82]||_0x7e95ad===_0x461e82+_0x58013a[_0x461e82]){var _0x58bc37='tr'+_0x421c8c[0x11]+'e';break;}_0x58bc37='f'+_0x421c8c[0x0]+'ls'+_0x319fb4(_0x421c8c[0x1])+'';}_0x319fb4=!0x1;-0x1<_0x94742e[[_0x421c8c[0xc],'e',_0x421c8c[0x0],'rc',_0x421c8c[0x9]]['join']('')][_0x30a1('0x10')](_0x30a1('0x22'))&&(_0x319fb4=!0x0);return[_0x58bc37,_0x319fb4];}(_0x46b836);}(window);if(!eval(_0x5b3373[0x0]))return _0x5b3373[0x1]?_0x5a1403(_0x30a1('0x23')):!0x1;var _0x3fe8ab=function(_0x338552,_0x17a1a4){_0x30a1('0x11')===_0x17a1a4&&_0x3fb8bc[_0x30a1('0x24')](_0x30a1('0x25')+_0x3f0e16[_0x30a1('0x26')]+_0x30a1('0x27')+_0x338552+_0x30a1('0x28'));_0x2640f3[_0x30a1('0x29')](_0x30a1('0x2a'),_0x2640f3[_0x30a1('0x29')](_0x30a1('0x2a'))||_0x2640f3[_0x30a1('0x2a')]());_0x2640f3[_0x30a1('0x2b')](!0x0,!0x0)[_0x30a1('0x2c')](0x1f4,0x0,function(){$(_0x30a1('0x0'))['addClass'](_0x30a1('0x2d'));});_0x3fb8bc[_0x30a1('0x2b')](!0x0,!0x0)['fadeTo'](0x1f4,0x1,function(){_0x2640f3[_0x30a1('0x2e')](_0x3fb8bc)[_0x30a1('0x2f')]({'height':_0x3fb8bc[_0x30a1('0x30')](_0x30a1('0x31'))[_0x30a1('0x2a')]()},0x2bc);});};removePlayer=function(){_0x106daf[_0x30a1('0x30')](_0x30a1('0x32'))['bind'](_0x30a1('0x33'),function(){_0x3fb8bc[_0x30a1('0x2b')](!0x0,!0x0)[_0x30a1('0x2c')](0x1f4,0x0,function(){$(this)['hide']()['removeAttr']('style');$(_0x30a1('0x0'))[_0x30a1('0x34')](_0x30a1('0x2d'));});_0x2640f3['stop'](!0x0,!0x0)[_0x30a1('0x2c')](0x1f4,0x1,function(){var _0x3e5b47=_0x2640f3[_0x30a1('0x29')](_0x30a1('0x2a'));_0x3e5b47&&_0x2640f3[_0x30a1('0x2f')]({'height':_0x3e5b47},0x2bc);});});};var _0x485cb8=function(){if(!_0x106daf[_0x30a1('0x30')](_0x30a1('0x35'))[_0x30a1('0x36')])for(vId in removePlayer['call'](this),_0x594489)if(_0x30a1('0x37')===typeof _0x594489[vId]&&''!==_0x594489[vId]){var _0x4b1ea1=$(_0x30a1('0x38')+_0x594489[vId]+_0x30a1('0x39')+_0x594489[vId]+_0x30a1('0x3a')+_0x594489[vId]+_0x30a1('0x3b'));_0x4b1ea1[_0x30a1('0x30')]('a')[_0x30a1('0x3c')](_0x30a1('0x3d'),function(){var _0x565d4c=$(this);_0x106daf[_0x30a1('0x30')](_0x30a1('0x3e'))[_0x30a1('0x34')]('ON');_0x565d4c['addClass']('ON');0x1==_0x3f0e16[_0x30a1('0x3f')]?$(_0x30a1('0x40'))['length']?(_0x3fe8ab[_0x30a1('0x41')](this,'',''),$(_0x30a1('0x40'))[0x0]['contentWindow'][_0x30a1('0x42')](_0x30a1('0x43'),'*')):_0x3fe8ab[_0x30a1('0x41')](this,_0x565d4c[_0x30a1('0x44')](_0x30a1('0x45')),_0x30a1('0x11')):_0x3fe8ab[_0x30a1('0x41')](this,_0x565d4c[_0x30a1('0x44')](_0x30a1('0x45')),_0x30a1('0x11'));return!0x1;});0x1==_0x3f0e16[_0x30a1('0x3f')]&&_0x106daf[_0x30a1('0x30')](_0x30a1('0x46'))[_0x30a1('0x47')](function(_0x3a8a04){$(_0x30a1('0x40'))[_0x30a1('0x36')]&&$(_0x30a1('0x40'))[0x0][_0x30a1('0x48')]['postMessage'](_0x30a1('0x49'),'*');});_0x30a1('0x9')===_0x3f0e16[_0x30a1('0x4a')]?_0x4b1ea1['prependTo'](_0x106daf):_0x4b1ea1[_0x30a1('0x4b')](_0x106daf);_0x4b1ea1[_0x30a1('0x4c')](_0x30a1('0x4d'),[_0x594489[vId],_0x4b1ea1]);}};$(document)[_0x30a1('0x4e')](_0x485cb8);$(window)[_0x30a1('0x4f')](_0x485cb8);(function(){var _0x183a7d=this;var _0x1df55e=window[_0x30a1('0x50')]||function(){};window[_0x30a1('0x50')]=function(_0x5ad87a,_0x4fbe0b){$(_0x5ad87a||'')['is'](_0x30a1('0x51'))||(_0x1df55e[_0x30a1('0x41')](this,_0x5ad87a,_0x4fbe0b),_0x485cb8[_0x30a1('0x41')](_0x183a7d));};}());}});}(this));

/* Quatro Digital - Mosaic Banners // Carlos Vinicius // Todos os direitos reservados */
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

