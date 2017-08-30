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
var _0x051c=['[class*=\x27desconto\x27]','auto','.productRightColumn','strong.skuBestPrice','label.skuBestInstallmentNumber','label.skuBestInstallmentValue','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','productPage','closest','wrapperElement','filterFlagBy','find','addClass','qd-active','isProductPage','skuBestPrice','.qd_active','removeClass','qd-sp-active','oneFlagByItem','siblings','.qd_sp_on','qd_sp_ignored','isDiscountFlag','div[skuCorrente]:first','attr','skuCorrente','skus','sku','bestPrice','qd-sp-product-unavailable','val','Por\x20alguma\x20razão\x20não\x20consegui\x20obter\x20o\x20preço\x20deste\x20produto\x20:(','appliedDiscount','getDiscountValue','listPrice','.qd_productOldPrice','.qd_displayPrice','skuPrice','html','installments','installmentValue','changeInstallments','.qd_sp_display_installments','.qd_sp_display_installmentValue','.qd_sp_installments','append','.qd_saveAmountPercent','changeNativeSaveAmount','em.economia-de','each','skuSelected.vtex','qd_sp_processedItem','startedByWrapper','flagElement','.qd_sp_processedItem','.qd_productPrice:not(.qd_sp_processedItem)','forcePromotion','style','after','call','boolean','body','.produto','function','trim','abs','undefined','pow','round','toFixed','split','length','replace','join','QD_SmartPrice','Smart\x20Price','object','error','info','warn','unshift','alerta','toLowerCase','aviso','apply','text','search','match','.flag'];(function(_0x468678,_0x48d846){var _0x3d2f03=function(_0x1a5d73){while(--_0x1a5d73){_0x468678['push'](_0x468678['shift']());}};_0x3d2f03(++_0x48d846);}(_0x051c,0x16e));var _0xc051=function(_0xed67ef,_0x345937){_0xed67ef=_0xed67ef-0x0;var _0x424682=_0x051c[_0xed67ef];return _0x424682;};_0xc051('0x0')!==typeof String['prototype'][_0xc051('0x1')]&&(String['prototype'][_0xc051('0x1')]=function(){return this['replace'](/^\s+|\s+$/g,'');});function qd_number_format(_0x2dff93,_0x165b0c,_0x517392,_0x39c14d){_0x2dff93=(_0x2dff93+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x2dff93=isFinite(+_0x2dff93)?+_0x2dff93:0x0;_0x165b0c=isFinite(+_0x165b0c)?Math[_0xc051('0x2')](_0x165b0c):0x0;_0x39c14d=_0xc051('0x3')===typeof _0x39c14d?',':_0x39c14d;_0x517392=_0xc051('0x3')===typeof _0x517392?'.':_0x517392;var _0x59effb='',_0x59effb=function(_0x15796e,_0x214b94){var _0x165b0c=Math[_0xc051('0x4')](0xa,_0x214b94);return''+(Math[_0xc051('0x5')](_0x15796e*_0x165b0c)/_0x165b0c)[_0xc051('0x6')](_0x214b94);},_0x59effb=(_0x165b0c?_0x59effb(_0x2dff93,_0x165b0c):''+Math[_0xc051('0x5')](_0x2dff93))[_0xc051('0x7')]('.');0x3<_0x59effb[0x0][_0xc051('0x8')]&&(_0x59effb[0x0]=_0x59effb[0x0][_0xc051('0x9')](/\B(?=(?:\d{3})+(?!\d))/g,_0x39c14d));(_0x59effb[0x1]||'')['length']<_0x165b0c&&(_0x59effb[0x1]=_0x59effb[0x1]||'',_0x59effb[0x1]+=Array(_0x165b0c-_0x59effb[0x1][_0xc051('0x8')]+0x1)[_0xc051('0xa')]('0'));return _0x59effb[_0xc051('0xa')](_0x517392);};(function(_0x3937bd){'use strict';var _0x4a63b7=jQuery;if(typeof _0x4a63b7['fn'][_0xc051('0xb')]===_0xc051('0x0'))return;var _0x544ec5=_0xc051('0xc');var _0x56cea4=function(_0x105321,_0x2ecc2f){if(_0xc051('0xd')===typeof console&&_0xc051('0x0')===typeof console[_0xc051('0xe')]&&_0xc051('0x0')===typeof console[_0xc051('0xf')]&&_0xc051('0x0')===typeof console[_0xc051('0x10')]){var _0x4d4f63;'object'===typeof _0x105321?(_0x105321[_0xc051('0x11')]('['+_0x544ec5+']\x0a'),_0x4d4f63=_0x105321):_0x4d4f63=['['+_0x544ec5+']\x0a'+_0x105321];if(_0xc051('0x3')===typeof _0x2ecc2f||_0xc051('0x12')!==_0x2ecc2f[_0xc051('0x13')]()&&_0xc051('0x14')!==_0x2ecc2f[_0xc051('0x13')]())if('undefined'!==typeof _0x2ecc2f&&_0xc051('0xf')===_0x2ecc2f[_0xc051('0x13')]())try{console[_0xc051('0xf')]['apply'](console,_0x4d4f63);}catch(_0x31323a){console[_0xc051('0xf')](_0x4d4f63['join']('\x0a'));}else try{console[_0xc051('0xe')]['apply'](console,_0x4d4f63);}catch(_0xd79f30){console[_0xc051('0xe')](_0x4d4f63[_0xc051('0xa')]('\x0a'));}else try{console[_0xc051('0x10')][_0xc051('0x15')](console,_0x4d4f63);}catch(_0x441820){console['warn'](_0x4d4f63[_0xc051('0xa')]('\x0a'));}}};var _0x2f3c8b=/[0-9]+\%/i;var _0x54ef2d=/[0-9\.]+(?=\%)/i;var _0x5e1e0f={'isDiscountFlag':function(_0x44ed9b){if(_0x44ed9b[_0xc051('0x16')]()[_0xc051('0x17')](_0x2f3c8b)>-0x1)return!![];return![];},'getDiscountValue':function(_0x1e2052){return _0x1e2052[_0xc051('0x16')]()[_0xc051('0x18')](_0x54ef2d);},'startedByWrapper':![],'flagElement':_0xc051('0x19'),'wrapperElement':'li','filterFlagBy':_0xc051('0x1a'),'forcePromotion':null,'appliedDiscount':null,'oneFlagByItem':!![],'isSmartCheckout':!![],'changeInstallments':![],'productPage':{'changeNativeSaveAmount':!![],'changeNativePrice':!![],'changeInstallments':![],'isProductPage':_0xc051('0x1b'),'wrapperElement':_0xc051('0x1c'),'skuBestPrice':_0xc051('0x1d'),'installments':_0xc051('0x1e'),'installmentValue':_0xc051('0x1f'),'skuPrice':'strong.skuPrice'}};_0x4a63b7['fn'][_0xc051('0xb')]=function(){};var _0x5b17be=function(_0x5b693e){var _0x458ec0={'t':_0xc051('0x20')};return function(_0x47343a){var _0x5e51c1,_0x47a4ec,_0x22b8d9,_0xa5e226;_0x47a4ec=function(_0x57fc41){return _0x57fc41;};_0x22b8d9=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x47343a=_0x47343a['d'+_0x22b8d9[0x10]+'c'+_0x22b8d9[0x11]+'m'+_0x47a4ec(_0x22b8d9[0x1])+'n'+_0x22b8d9[0xd]]['l'+_0x22b8d9[0x12]+'c'+_0x22b8d9[0x0]+'ti'+_0x47a4ec('o')+'n'];_0x5e51c1=function(_0x5d5414){return escape(encodeURIComponent(_0x5d5414[_0xc051('0x9')](/\./g,'¨')[_0xc051('0x9')](/[a-zA-Z]/g,function(_0xc85cf6){return String[_0xc051('0x21')](('Z'>=_0xc85cf6?0x5a:0x7a)>=(_0xc85cf6=_0xc85cf6[_0xc051('0x22')](0x0)+0xd)?_0xc85cf6:_0xc85cf6-0x1a);})));};var _0x1bb36c=_0x5e51c1(_0x47343a[[_0x22b8d9[0x9],_0x47a4ec('o'),_0x22b8d9[0xc],_0x22b8d9[_0x47a4ec(0xd)]][_0xc051('0xa')]('')]);_0x5e51c1=_0x5e51c1((window[['js',_0x47a4ec('no'),'m',_0x22b8d9[0x1],_0x22b8d9[0x4][_0xc051('0x23')](),_0xc051('0x24')]['join']('')]||_0xc051('0x25'))+['.v',_0x22b8d9[0xd],'e',_0x47a4ec('x'),'co',_0x47a4ec('mm'),_0xc051('0x26'),_0x22b8d9[0x1],'.c',_0x47a4ec('o'),'m.',_0x22b8d9[0x13],'r']['join'](''));for(var _0x5121b9 in _0x458ec0){if(_0x5e51c1===_0x5121b9+_0x458ec0[_0x5121b9]||_0x1bb36c===_0x5121b9+_0x458ec0[_0x5121b9]){_0xa5e226='tr'+_0x22b8d9[0x11]+'e';break;}_0xa5e226='f'+_0x22b8d9[0x0]+'ls'+_0x47a4ec(_0x22b8d9[0x1])+'';}_0x47a4ec=!0x1;-0x1<_0x47343a[[_0x22b8d9[0xc],'e',_0x22b8d9[0x0],'rc',_0x22b8d9[0x9]][_0xc051('0xa')]('')][_0xc051('0x27')](_0xc051('0x28'))&&(_0x47a4ec=!0x0);return[_0xa5e226,_0x47a4ec];}(_0x5b693e);}(window);if(!eval(_0x5b17be[0x0]))return _0x5b17be[0x1]?_0x56cea4('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x57bdbd=function(_0x47cd65,_0x1a3244){'use strict';var _0x5ba98b=function(_0x1913a5){'use strict';var _0x573542,_0xd8b668,_0x31cbb2,_0x45bf08,_0x3b0036,_0x57c8a7,_0x404897,_0x2d4b81,_0x4b1ac6,_0x222716,_0x37af40,_0xe89da1,_0x289f7f,_0x17f85d,_0x42aaac,_0x597ccb,_0x4edd9d,_0x5878f8,_0x405c75;var _0x3ea86a=_0x4a63b7(this);_0x1913a5=typeof _0x1913a5===_0xc051('0x3')?![]:_0x1913a5;if(_0x1a3244[_0xc051('0x29')]['isProductPage'])var _0x539c40=_0x3ea86a[_0xc051('0x2a')](_0x1a3244[_0xc051('0x29')][_0xc051('0x2b')]);else var _0x539c40=_0x3ea86a[_0xc051('0x2a')](_0x1a3244['wrapperElement']);if(!_0x1913a5&&!_0x3ea86a['is'](_0x1a3244[_0xc051('0x2c')])){if(_0x1a3244[_0xc051('0x29')]['isProductPage']&&_0x539c40['is'](_0x1a3244[_0xc051('0x29')][_0xc051('0x2b')])){_0x539c40[_0xc051('0x2d')](_0x1a3244[_0xc051('0x29')]['skuBestPrice'])[_0xc051('0x2e')](_0xc051('0x2f'));_0x539c40[_0xc051('0x2e')]('qd-sp-active');}return;}var _0x2ab538=_0x1a3244[_0xc051('0x29')][_0xc051('0x30')];if(_0x3ea86a['is']('.qd_sp_on,\x20.qd_sp_ignored')&&!_0x2ab538)return;if(_0x2ab538){_0x2d4b81=_0x539c40[_0xc051('0x2d')](_0x1a3244[_0xc051('0x29')][_0xc051('0x31')]);if(_0x2d4b81[_0xc051('0x2d')](_0xc051('0x32'))['length'])return;_0x2d4b81[_0xc051('0x33')](_0xc051('0x2f'));_0x539c40[_0xc051('0x33')](_0xc051('0x34'));}if(_0x1a3244[_0xc051('0x35')]&&_0x3ea86a[_0xc051('0x36')](_0xc051('0x37'))[_0xc051('0x8')]){_0x3ea86a[_0xc051('0x2e')](_0xc051('0x38'));return;}_0x3ea86a[_0xc051('0x2e')]('qd_sp_on');if(!_0x1a3244[_0xc051('0x39')](_0x3ea86a))return;if(_0x2ab538){_0x31cbb2={};var _0x4fc6d7=parseInt(_0x4a63b7(_0xc051('0x3a'))[_0xc051('0x3b')](_0xc051('0x3c')),0xa);if(_0x4fc6d7){for(var _0x41c75b=0x0;_0x41c75b<skuJson[_0xc051('0x3d')][_0xc051('0x8')];_0x41c75b++){if(skuJson['skus'][_0x41c75b][_0xc051('0x3e')]==_0x4fc6d7){_0x31cbb2=skuJson[_0xc051('0x3d')][_0x41c75b];break;}}}else{var _0x5d019e=0x5af3107a3fff;for(var _0x40b878 in skuJson[_0xc051('0x3d')]){if(typeof skuJson[_0xc051('0x3d')][_0x40b878]==='function')continue;if(!skuJson['skus'][_0x40b878]['available'])continue;if(skuJson['skus'][_0x40b878][_0xc051('0x3f')]<_0x5d019e){_0x5d019e=skuJson['skus'][_0x40b878]['bestPrice'];_0x31cbb2=skuJson[_0xc051('0x3d')][_0x40b878];}}}}_0x597ccb=!![];_0x4edd9d=0x0;if(_0x1a3244['isSmartCheckout']&&_0x5878f8){_0x597ccb=skuJson['available'];if(!_0x597ccb)return _0x539c40[_0xc051('0x2e')](_0xc051('0x40'));}_0xd8b668=_0x1a3244['getDiscountValue'](_0x3ea86a);_0x573542=parseFloat(_0xd8b668,0xa);if(isNaN(_0x573542))return _0x56cea4(['O\x20valor\x20informado\x20p/\x20o\x20desconto\x20não\x20é\x20um\x20número.',_0x3ea86a],'alerta');var _0x51f623=function(_0x2aee93){if(_0x2ab538)_0x45bf08=(_0x2aee93[_0xc051('0x3f')]||0x0)/0x64;else{_0x289f7f=_0x539c40[_0xc051('0x2d')]('.qd_productPrice');_0x45bf08=parseFloat((_0x289f7f[_0xc051('0x41')]()||'')['replace'](/[^0-9\.\,]+/i,'')[_0xc051('0x9')]('.','')[_0xc051('0x9')](',','.'),0xa);}if(isNaN(_0x45bf08))return _0x56cea4([_0xc051('0x42'),_0x3ea86a,_0x539c40]);if(_0x1a3244['appliedDiscount']!==null){_0x17f85d=0x0;if(!isNaN(_0x1a3244[_0xc051('0x43')]))_0x17f85d=_0x1a3244[_0xc051('0x43')];else{_0x42aaac=_0x539c40[_0xc051('0x2d')](_0x1a3244[_0xc051('0x43')]);if(_0x42aaac['length'])_0x17f85d=_0x1a3244[_0xc051('0x44')](_0x42aaac);}_0x17f85d=parseFloat(_0x17f85d,0xa);if(isNaN(_0x17f85d))_0x17f85d=0x0;if(_0x17f85d!==0x0)_0x45bf08=_0x45bf08*0x64/(0x64-_0x17f85d);}if(_0x2ab538)_0x3b0036=(_0x2aee93[_0xc051('0x45')]||0x0)/0x64;else _0x3b0036=parseFloat((_0x539c40['find'](_0xc051('0x46'))['val']()||'')['replace'](/[^0-9\.\,]+/i,'')[_0xc051('0x9')]('.','')[_0xc051('0x9')](',','.'),0xa);if(isNaN(_0x3b0036))_0x3b0036=0.001;_0x57c8a7=_0x45bf08*((0x64-_0x573542)/0x64);if(_0x2ab538&&_0x1a3244[_0xc051('0x29')]['changeNativePrice']){_0x2d4b81[_0xc051('0x16')](_0x2d4b81[_0xc051('0x16')]()[_0xc051('0x1')]()[_0xc051('0x9')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x57c8a7,0x2,',','.')))['addClass'](_0xc051('0x2f'));_0x539c40[_0xc051('0x2e')](_0xc051('0x34'));}else{_0x405c75=_0x539c40[_0xc051('0x2d')](_0xc051('0x47'));_0x405c75['text'](_0x405c75['text']()[_0xc051('0x9')](/[0-9\.]+,[0-9]+/i,'')+qd_number_format(_0x57c8a7,0x2,',','.'));}if(_0x2ab538){_0x404897=_0x539c40[_0xc051('0x2d')](_0x1a3244[_0xc051('0x29')][_0xc051('0x48')]);if(_0x404897[_0xc051('0x8')])_0x404897[_0xc051('0x16')](_0x404897[_0xc051('0x16')]()[_0xc051('0x1')]()[_0xc051('0x9')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x57c8a7,0x2,',','.')));}var _0x4bee41=_0x539c40['find']('.qd-sp-display-discount');_0x4bee41[_0xc051('0x16')](_0x4bee41['text']()[_0xc051('0x9')](/[0-9]+\%/i,_0x573542+'%'));var _0x445332=function(_0x5d2fae,_0x40a725,_0x45656a){var _0x3966b9=_0x539c40['find'](_0x5d2fae);if(_0x3966b9[_0xc051('0x8')])_0x3966b9[_0xc051('0x49')](_0x3966b9[_0xc051('0x49')]()['trim']()[_0xc051('0x9')](/[0-9]{1,2}/,_0x45656a?_0x45656a:_0x2aee93['installments']||0x0));var _0x35728d=_0x539c40[_0xc051('0x2d')](_0x40a725);if(_0x35728d['length'])_0x35728d['html'](_0x35728d[_0xc051('0x49')]()[_0xc051('0x1')]()['replace'](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x57c8a7/(_0x45656a?_0x45656a:_0x2aee93[_0xc051('0x4a')]||0x1),0x2,',','.')));};if(_0x2ab538&&_0x1a3244[_0xc051('0x29')]['changeInstallments'])_0x445332(_0x1a3244['productPage'][_0xc051('0x4a')],_0x1a3244[_0xc051('0x29')][_0xc051('0x4b')]);else if(_0x1a3244[_0xc051('0x4c')])_0x445332(_0xc051('0x4d'),_0xc051('0x4e'),parseInt(_0x539c40[_0xc051('0x2d')](_0xc051('0x4f'))[_0xc051('0x41')]()||0x1)||0x1);_0x539c40[_0xc051('0x2d')]('.qd_saveAmount')[_0xc051('0x50')](qd_number_format(_0x3b0036-_0x57c8a7,0x2,',','.'));_0x539c40[_0xc051('0x2d')](_0xc051('0x51'))['prepend'](qd_number_format((_0x3b0036-_0x57c8a7)*0x64/_0x3b0036,0x2,',','.'));if(_0x2ab538&&_0x1a3244[_0xc051('0x29')][_0xc051('0x52')]){_0x4a63b7(_0xc051('0x53'))[_0xc051('0x54')](function(){_0x37af40=_0x4a63b7(this);_0x37af40[_0xc051('0x16')](_0x37af40['text']()['trim']()['replace'](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x3b0036-_0x57c8a7,0x2,',','.')));_0x37af40['addClass']('qd-active');});}};_0x51f623(_0x31cbb2);if(_0x2ab538)_0x4a63b7(window)['on'](_0xc051('0x55'),function(_0x285b91,_0x46d979,_0x51700f){_0x51f623(_0x51700f);});_0x539c40[_0xc051('0x2e')](_0xc051('0x56'));if(!_0x2ab538)_0x289f7f['addClass'](_0xc051('0x56'));};(_0x1a3244[_0xc051('0x57')]?_0x47cd65[_0xc051('0x2d')](_0x1a3244[_0xc051('0x58')]):_0x47cd65)[_0xc051('0x54')](function(){_0x5ba98b['call'](this,![]);});if(typeof _0x1a3244['forcePromotion']=='string'){var _0x4bb841=_0x1a3244[_0xc051('0x57')]?_0x47cd65:_0x47cd65['closest'](_0x1a3244[_0xc051('0x2b')]);if(_0x1a3244[_0xc051('0x29')][_0xc051('0x30')])_0x4bb841=_0x4bb841[_0xc051('0x2a')](_0x1a3244[_0xc051('0x29')][_0xc051('0x2b')])['not'](_0xc051('0x59'));else _0x4bb841=_0x4bb841['find'](_0xc051('0x5a'));_0x4bb841[_0xc051('0x54')](function(){var _0x5d4b57=_0x4a63b7(_0x1a3244[_0xc051('0x5b')]);_0x5d4b57[_0xc051('0x3b')](_0xc051('0x5c'),'display:none\x20!important;');if(_0x1a3244[_0xc051('0x29')][_0xc051('0x30')])_0x4a63b7(this)['append'](_0x5d4b57);else _0x4a63b7(this)[_0xc051('0x5d')](_0x5d4b57);_0x5ba98b[_0xc051('0x5e')](_0x5d4b57,!![]);});}};_0x4a63b7['fn'][_0xc051('0xb')]=function(_0x2b8909){var _0x494450=_0x4a63b7(this);if(!_0x494450[_0xc051('0x8')])return _0x494450;var _0x1e113d=_0x4a63b7['extend'](!![],{},_0x5e1e0f,_0x2b8909);if(typeof _0x1e113d[_0xc051('0x29')][_0xc051('0x30')]!=_0xc051('0x5f'))_0x1e113d[_0xc051('0x29')][_0xc051('0x30')]=_0x4a63b7(document[_0xc051('0x60')])['is'](_0xc051('0x61'));_0x57bdbd(_0x494450,_0x1e113d);return _0x494450;};}(this));
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
var _0x767c=['qd-am-dropdown-menu','qd-am-dropdown','children','qd-am-level-','add','qd-am-','callback','call','QuatroDigital.am.callback','extend','exec','.qd_amazing_menu_auto','getParent','closest','object','undefined','error','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','info','join','apply','warn','each','addClass','qd-am-li-','first','qd-am-first','qd-am-last','QD_amazingMenu','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','charCodeAt','toUpperCase','---','erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','.qd_am_code','.qd-am-banner','filter','length','parent','qd-am-collection-wrapper','qdAjax','url','html','find','img[alt=\x27','data-qdam-value','.box-banner','clone','insertBefore','hide','text','trim','[class*=\x27colunas\x27]','qd-am-content-loaded','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','trigger','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul',':not(ul)','qd-am-elem-','replaceSpecialChars','qdAmAddNdx','qd-amazing-menu','>ul','>li','qd-am-column'];(function(_0x587fb5,_0x59cb3b){var _0x551105=function(_0x5bbef4){while(--_0x5bbef4){_0x587fb5['push'](_0x587fb5['shift']());}};_0x551105(++_0x59cb3b);}(_0x767c,0xa4));var _0xc767=function(_0x220563,_0x5c4462){_0x220563=_0x220563-0x0;var _0x367a94=_0x767c[_0x220563];return _0x367a94;};(function(_0x1da7e9){_0x1da7e9['fn'][_0xc767('0x0')]=_0x1da7e9['fn'][_0xc767('0x1')];}(jQuery));(function(_0x5ddd98){var _0x1d1bee;var _0xd5493f=jQuery;if('function'!==typeof _0xd5493f['fn']['QD_amazingMenu']){var _0x46c7da={'url':'/qd-amazing-menu','callback':function(){},'ajaxCallback':function(){}};var _0x322cea=function(_0x1a3152,_0x5dbb92){if(_0xc767('0x2')===typeof console&&_0xc767('0x3')!==typeof console[_0xc767('0x4')]&&_0xc767('0x3')!==typeof console['info']&&_0xc767('0x3')!==typeof console['warn']){var _0x47268e;_0xc767('0x2')===typeof _0x1a3152?(_0x1a3152[_0xc767('0x5')]('[QD\x20Amazing\x20Menu]\x0a'),_0x47268e=_0x1a3152):_0x47268e=[_0xc767('0x6')+_0x1a3152];if(_0xc767('0x3')===typeof _0x5dbb92||_0xc767('0x7')!==_0x5dbb92[_0xc767('0x8')]()&&_0xc767('0x9')!==_0x5dbb92['toLowerCase']())if(_0xc767('0x3')!==typeof _0x5dbb92&&_0xc767('0xa')===_0x5dbb92[_0xc767('0x8')]())try{console[_0xc767('0xa')]['apply'](console,_0x47268e);}catch(_0x4f5f8d){try{console['info'](_0x47268e[_0xc767('0xb')]('\x0a'));}catch(_0x52b7fa){}}else try{console[_0xc767('0x4')][_0xc767('0xc')](console,_0x47268e);}catch(_0x32d7ba){try{console['error'](_0x47268e['join']('\x0a'));}catch(_0x2204d6){}}else try{console[_0xc767('0xd')]['apply'](console,_0x47268e);}catch(_0xd7df22){try{console['warn'](_0x47268e['join']('\x0a'));}catch(_0x465a52){}}}};_0xd5493f['fn']['qdAmAddNdx']=function(){var _0x5a5caa=_0xd5493f(this);_0x5a5caa[_0xc767('0xe')](function(_0x1156e8){_0xd5493f(this)[_0xc767('0xf')](_0xc767('0x10')+_0x1156e8);});_0x5a5caa[_0xc767('0x11')]()[_0xc767('0xf')](_0xc767('0x12'));_0x5a5caa['last']()[_0xc767('0xf')](_0xc767('0x13'));return _0x5a5caa;};_0xd5493f['fn'][_0xc767('0x14')]=function(){};_0x5ddd98=function(_0x52eeeb){var _0x33799e={'t':_0xc767('0x15')};return function(_0xa4284c){var _0x38af63=function(_0x3bb333){return _0x3bb333;};var _0x28efcd=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0xa4284c=_0xa4284c['d'+_0x28efcd[0x10]+'c'+_0x28efcd[0x11]+'m'+_0x38af63(_0x28efcd[0x1])+'n'+_0x28efcd[0xd]]['l'+_0x28efcd[0x12]+'c'+_0x28efcd[0x0]+'ti'+_0x38af63('o')+'n'];var _0x52b836=function(_0x533abb){return escape(encodeURIComponent(_0x533abb[_0xc767('0x16')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x1a4c58){return String['fromCharCode'](('Z'>=_0x1a4c58?0x5a:0x7a)>=(_0x1a4c58=_0x1a4c58[_0xc767('0x17')](0x0)+0xd)?_0x1a4c58:_0x1a4c58-0x1a);})));};var _0x4d14b1=_0x52b836(_0xa4284c[[_0x28efcd[0x9],_0x38af63('o'),_0x28efcd[0xc],_0x28efcd[_0x38af63(0xd)]][_0xc767('0xb')]('')]);_0x52b836=_0x52b836((window[['js',_0x38af63('no'),'m',_0x28efcd[0x1],_0x28efcd[0x4][_0xc767('0x18')](),'ite']['join']('')]||_0xc767('0x19'))+['.v',_0x28efcd[0xd],'e',_0x38af63('x'),'co',_0x38af63('mm'),_0xc767('0x1a'),_0x28efcd[0x1],'.c',_0x38af63('o'),'m.',_0x28efcd[0x13],'r'][_0xc767('0xb')](''));for(var _0x2817c5 in _0x33799e){if(_0x52b836===_0x2817c5+_0x33799e[_0x2817c5]||_0x4d14b1===_0x2817c5+_0x33799e[_0x2817c5]){var _0x8c98cb='tr'+_0x28efcd[0x11]+'e';break;}_0x8c98cb='f'+_0x28efcd[0x0]+'ls'+_0x38af63(_0x28efcd[0x1])+'';}_0x38af63=!0x1;-0x1<_0xa4284c[[_0x28efcd[0xc],'e',_0x28efcd[0x0],'rc',_0x28efcd[0x9]][_0xc767('0xb')]('')][_0xc767('0x1b')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x38af63=!0x0);return[_0x8c98cb,_0x38af63];}(_0x52eeeb);}(window);if(!eval(_0x5ddd98[0x0]))return _0x5ddd98[0x1]?_0x322cea(_0xc767('0x1c')):!0x1;var _0x3a8322=function(_0x11d820){var _0x208903=_0x11d820['find'](_0xc767('0x1d'));var _0x320f1f=_0x208903['filter'](_0xc767('0x1e'));var _0x529a4d=_0x208903[_0xc767('0x1f')]('.qd-am-collection');if(_0x320f1f[_0xc767('0x20')]||_0x529a4d['length'])_0x320f1f[_0xc767('0x21')]()['addClass']('qd-am-banner-wrapper'),_0x529a4d[_0xc767('0x21')]()[_0xc767('0xf')](_0xc767('0x22')),_0xd5493f[_0xc767('0x23')]({'url':_0x1d1bee[_0xc767('0x24')],'dataType':_0xc767('0x25'),'success':function(_0x2ddbd2){var _0x3874ac=_0xd5493f(_0x2ddbd2);_0x320f1f[_0xc767('0xe')](function(){var _0x2ddbd2=_0xd5493f(this);var _0x3a1098=_0x3874ac[_0xc767('0x26')](_0xc767('0x27')+_0x2ddbd2['attr'](_0xc767('0x28'))+'\x27]');_0x3a1098[_0xc767('0x20')]&&(_0x3a1098[_0xc767('0xe')](function(){_0xd5493f(this)[_0xc767('0x0')](_0xc767('0x29'))[_0xc767('0x2a')]()[_0xc767('0x2b')](_0x2ddbd2);}),_0x2ddbd2[_0xc767('0x2c')]());})[_0xc767('0xf')]('qd-am-content-loaded');_0x529a4d[_0xc767('0xe')](function(){var _0x2ddbd2={};var _0x1a594d=_0xd5493f(this);_0x3874ac[_0xc767('0x26')]('h2')['each'](function(){if(_0xd5493f(this)[_0xc767('0x2d')]()[_0xc767('0x2e')]()[_0xc767('0x8')]()==_0x1a594d['attr']('data-qdam-value')[_0xc767('0x2e')]()[_0xc767('0x8')]())return _0x2ddbd2=_0xd5493f(this),!0x1;});_0x2ddbd2['length']&&(_0x2ddbd2[_0xc767('0xe')](function(){_0xd5493f(this)[_0xc767('0x0')](_0xc767('0x2f'))[_0xc767('0x2a')]()[_0xc767('0x2b')](_0x1a594d);}),_0x1a594d[_0xc767('0x2c')]());})[_0xc767('0xf')](_0xc767('0x30'));},'error':function(){_0x322cea(_0xc767('0x31')+_0x1d1bee[_0xc767('0x24')]+_0xc767('0x32'));},'complete':function(){_0x1d1bee[_0xc767('0x33')]['call'](this);_0xd5493f(window)[_0xc767('0x34')]('QuatroDigital.am.ajaxCallback',_0x11d820);},'clearQueueDelay':0xbb8});};_0xd5493f[_0xc767('0x14')]=function(_0x439a27){var _0x5e8f5f=_0x439a27[_0xc767('0x26')]('ul[itemscope]')['each'](function(){var _0xb9afa5=_0xd5493f(this);if(!_0xb9afa5[_0xc767('0x20')])return _0x322cea([_0xc767('0x35'),_0x439a27],_0xc767('0x7'));_0xb9afa5['find'](_0xc767('0x36'))[_0xc767('0x21')]()[_0xc767('0xf')](_0xc767('0x37'));_0xb9afa5[_0xc767('0x26')]('li')[_0xc767('0xe')](function(){var _0x5e9afd=_0xd5493f(this);var _0x354059=_0x5e9afd['children'](_0xc767('0x38'));_0x354059[_0xc767('0x20')]&&_0x5e9afd[_0xc767('0xf')](_0xc767('0x39')+_0x354059['first']()['text']()['trim']()[_0xc767('0x3a')]()[_0xc767('0x16')](/\./g,'')[_0xc767('0x16')](/\s/g,'-')[_0xc767('0x8')]());});var _0x3a2693=_0xb9afa5[_0xc767('0x26')]('>li')[_0xc767('0x3b')]();_0xb9afa5[_0xc767('0xf')](_0xc767('0x3c'));_0x3a2693=_0x3a2693['find'](_0xc767('0x3d'));_0x3a2693[_0xc767('0xe')](function(){var _0x3608b8=_0xd5493f(this);_0x3608b8[_0xc767('0x26')](_0xc767('0x3e'))[_0xc767('0x3b')]()[_0xc767('0xf')](_0xc767('0x3f'));_0x3608b8[_0xc767('0xf')](_0xc767('0x40'));_0x3608b8[_0xc767('0x21')]()[_0xc767('0xf')]('qd-am-dropdown');});_0x3a2693[_0xc767('0xf')](_0xc767('0x41'));var _0x168eb5=0x0,_0x5ddd98=function(_0x479db2){_0x168eb5+=0x1;_0x479db2=_0x479db2['children']('li')[_0xc767('0x42')]('*');_0x479db2[_0xc767('0x20')]&&(_0x479db2[_0xc767('0xf')](_0xc767('0x43')+_0x168eb5),_0x5ddd98(_0x479db2));};_0x5ddd98(_0xb9afa5);_0xb9afa5[_0xc767('0x44')](_0xb9afa5['find']('ul'))[_0xc767('0xe')](function(){var _0x25a0f1=_0xd5493f(this);_0x25a0f1[_0xc767('0xf')](_0xc767('0x45')+_0x25a0f1[_0xc767('0x42')]('li')[_0xc767('0x20')]+'-li');});});_0x3a8322(_0x5e8f5f);_0x1d1bee[_0xc767('0x46')][_0xc767('0x47')](this);_0xd5493f(window)[_0xc767('0x34')](_0xc767('0x48'),_0x439a27);};_0xd5493f['fn'][_0xc767('0x14')]=function(_0x49db99){var _0x56a74d=_0xd5493f(this);if(!_0x56a74d[_0xc767('0x20')])return _0x56a74d;_0x1d1bee=_0xd5493f[_0xc767('0x49')]({},_0x46c7da,_0x49db99);_0x56a74d[_0xc767('0x4a')]=new _0xd5493f[(_0xc767('0x14'))](_0xd5493f(this));return _0x56a74d;};_0xd5493f(function(){_0xd5493f(_0xc767('0x4b'))[_0xc767('0x14')]();});}}(this));

/* Quatro Digital Smart Cart */
var _0x2bc6=['removeProduct','stop','slideUp','remove','shippingCalculate','qdDdcLastPostalCode','calculateShipping','BRA','index','atenção\x20esta\x20método\x20esta\x20descontinuado','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','height','animate','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','Callback\x20não\x20é\x20uma\x20função','buyButtonClicked','allowRecalculate','productId','prod_','prodId','.qd-bap-item-added','input.qd-productId[value=','.qd-bap-wrapper','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','qd-bap-item-added','ajaxStop','QD_smartCart','selector','dropDown','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','closest','replace','undefined','pow','toFixed','round','split','length','join','function','prototype','trim','capitalize','charAt','toUpperCase','slice','qdAjaxQueue','jquery','000','error','qdAjax','extend','object','data','stringify','url','type','jqXHR','ajax','done','success','fail','always','complete','clearQueueDelay','version','4.0','getOrderForm','checkout','call','QuatroDigital_simpleCart','ajaxStopOn','simpleCart','warn','info','toLowerCase','[Simple\x20Cart]\x0a','QD_simpleCart','elements','.qd_cart_qtt','.qd_cart_total','meta[name=currency]','content','qd_simpleCartOpts','_QuatroDigital_CartData','Shipping','totalizers','value','currencySymbol','allTotal','qtt','showQuantityByItems','items','quantity','callback','hide','filter','show','.plural','addClass','qd-emptyCart','removeClass','O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','cartTotalE','html','cartQttE','itemsTextE','each','$this','find','cartTotal','itemsText','emptyElem','emptyCart','qd-sc-populated','smartCheckout','_QuatroDigital_DropDown','vtexjs','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','shippingData','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','trigger','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','.qd_cart_auto','bind','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','Oooops!\x20','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','QD_checkoutQueue','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','add','Callbacks','fire','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','alerta','aviso','apply','.productInformationWrapper\x20\x20a.buy-button','javascript:','body','Produto\x20adicionado\x20ao\x20carrinho!','location','QD_buyButton','qd-bb-click-active','click.qd_bb_buy_sc','allowBuyClick','clickBuySmartCheckout','preventDefault','Método\x20descontinuado!','buyButton','.qd-sbb-on','qd-sbb-on','.btn-add-buy-button-asynchronous','.remove-href','qd-bb-active','.qd-bb-productAdded','append','isProductPage','_Quatro_Digital_dropDown','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','[href=\x27','href','---','qd-bb-itemAddBuyButtonWrapper','qd-bb-itemAddCartWrapper','timeRemoveNewItemClass','função\x20descontinuada','getCartInfoByUrl','isSmartCheckout','autoWatchBuyButton','unbind','click','mouseenter.qd_bb_buy_sc','load','attr','indexOf','selectSkuMsg','?redirect=false&','execDefaultAction','redirect=false','redirect=true','queue','buyIfQuantityZeroed','test','match','push','productPageCallback','buyButtonClickCallback','prodAdd','ku=','pop','asyncCallback','productAddedToCart','cartProductAdded.vtex','fakeRequest','parent','_QuatroDigital_prodBuyCallback','prepend','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','QuatroDigital.qd_bb_prod_add','ajaxSend','/checkout/cart/add','abs','message','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','allowUpdate','QD_dropDownCart','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','ite','erc','Ir\x20ao\x20Carrinho','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','name','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20input','updateOnlyHover','cartIsEmpty','mouseleave.qd_ddc_hover','texts','#value','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','cartContainer','clone','total','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','shipping','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','dataOptionsCache','.qd-ddc-wrapper','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','renderProductsList','.qd-ddc-prodWrapper2','empty','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','qd-ddc-','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','val','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku-index','changeQantity','data-sku','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','.qd-ddc-quantity','click.qd_ddc_minus','qd-loading','focusout.qd_ddc_change','.qd-ddc-remove'];(function(_0x556c8b,_0x28fb99){var _0x346fd1=function(_0x132e97){while(--_0x132e97){_0x556c8b['push'](_0x556c8b['shift']());}};_0x346fd1(++_0x28fb99);}(_0x2bc6,0x163));var _0x62bc=function(_0x48daff,_0x56e965){_0x48daff=_0x48daff-0x0;var _0x29ca98=_0x2bc6[_0x48daff];return _0x29ca98;};(function(_0xd701e6){_0xd701e6['fn'][_0x62bc('0x0')]=_0xd701e6['fn'][_0x62bc('0x1')];}(jQuery));function qd_number_format(_0x56939b,_0x4b4e73,_0x5a2676,_0x5c5a2a){_0x56939b=(_0x56939b+'')[_0x62bc('0x2')](/[^0-9+\-Ee.]/g,'');_0x56939b=isFinite(+_0x56939b)?+_0x56939b:0x0;_0x4b4e73=isFinite(+_0x4b4e73)?Math['abs'](_0x4b4e73):0x0;_0x5c5a2a=_0x62bc('0x3')===typeof _0x5c5a2a?',':_0x5c5a2a;_0x5a2676=_0x62bc('0x3')===typeof _0x5a2676?'.':_0x5a2676;var _0x450cb6='',_0x450cb6=function(_0x40af10,_0x3f3dc9){var _0x4b4e73=Math[_0x62bc('0x4')](0xa,_0x3f3dc9);return''+(Math['round'](_0x40af10*_0x4b4e73)/_0x4b4e73)[_0x62bc('0x5')](_0x3f3dc9);},_0x450cb6=(_0x4b4e73?_0x450cb6(_0x56939b,_0x4b4e73):''+Math[_0x62bc('0x6')](_0x56939b))[_0x62bc('0x7')]('.');0x3<_0x450cb6[0x0][_0x62bc('0x8')]&&(_0x450cb6[0x0]=_0x450cb6[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x5c5a2a));(_0x450cb6[0x1]||'')[_0x62bc('0x8')]<_0x4b4e73&&(_0x450cb6[0x1]=_0x450cb6[0x1]||'',_0x450cb6[0x1]+=Array(_0x4b4e73-_0x450cb6[0x1][_0x62bc('0x8')]+0x1)[_0x62bc('0x9')]('0'));return _0x450cb6['join'](_0x5a2676);};_0x62bc('0xa')!==typeof String[_0x62bc('0xb')][_0x62bc('0xc')]&&(String[_0x62bc('0xb')][_0x62bc('0xc')]=function(){return this[_0x62bc('0x2')](/^\s+|\s+$/g,'');});_0x62bc('0xa')!=typeof String['prototype'][_0x62bc('0xd')]&&(String[_0x62bc('0xb')]['capitalize']=function(){return this[_0x62bc('0xe')](0x0)[_0x62bc('0xf')]()+this[_0x62bc('0x10')](0x1)['toLowerCase']();});(function(_0x263424){if(_0x62bc('0xa')!==typeof _0x263424['qdAjax']){var _0x515c80={};_0x263424[_0x62bc('0x11')]=_0x515c80;0x96>parseInt((_0x263424['fn'][_0x62bc('0x12')]['replace'](/[^0-9]+/g,'')+_0x62bc('0x13'))[_0x62bc('0x10')](0x0,0x3),0xa)&&console&&_0x62bc('0xa')==typeof console[_0x62bc('0x14')]&&console[_0x62bc('0x14')]();_0x263424[_0x62bc('0x15')]=function(_0x1d3d8f){try{var _0x3111ab=_0x263424[_0x62bc('0x16')]({},{'url':'','type':'GET','data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x1d3d8f);var _0x5dd6f0=_0x62bc('0x17')===typeof _0x3111ab[_0x62bc('0x18')]?JSON[_0x62bc('0x19')](_0x3111ab['data']):_0x3111ab[_0x62bc('0x18')]['toString']();var _0x30e7d9=encodeURIComponent(_0x3111ab[_0x62bc('0x1a')]+'|'+_0x3111ab[_0x62bc('0x1b')]+'|'+_0x5dd6f0);_0x515c80[_0x30e7d9]=_0x515c80[_0x30e7d9]||{};'undefined'==typeof _0x515c80[_0x30e7d9][_0x62bc('0x1c')]?_0x515c80[_0x30e7d9][_0x62bc('0x1c')]=_0x263424[_0x62bc('0x1d')](_0x3111ab):(_0x515c80[_0x30e7d9][_0x62bc('0x1c')][_0x62bc('0x1e')](_0x3111ab[_0x62bc('0x1f')]),_0x515c80[_0x30e7d9]['jqXHR'][_0x62bc('0x20')](_0x3111ab[_0x62bc('0x14')]),_0x515c80[_0x30e7d9][_0x62bc('0x1c')][_0x62bc('0x21')](_0x3111ab[_0x62bc('0x22')]));_0x515c80[_0x30e7d9]['jqXHR']['always'](function(){isNaN(parseInt(_0x3111ab[_0x62bc('0x23')]))||setTimeout(function(){_0x515c80[_0x30e7d9]['jqXHR']=void 0x0;},_0x3111ab[_0x62bc('0x23')]);});return _0x515c80[_0x30e7d9][_0x62bc('0x1c')];}catch(_0x1e046d){'undefined'!==typeof console&&_0x62bc('0xa')===typeof console[_0x62bc('0x14')]&&console[_0x62bc('0x14')]('Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20'+_0x1e046d['message']);}};_0x263424[_0x62bc('0x15')][_0x62bc('0x24')]=_0x62bc('0x25');}}(jQuery));(function(_0x4df640){_0x4df640['fn'][_0x62bc('0x0')]=_0x4df640['fn'][_0x62bc('0x1')];}(jQuery));(function(){var _0x44600f=jQuery;if(_0x62bc('0xa')!==typeof _0x44600f['fn']['simpleCart']){_0x44600f(function(){var _0x4522ef=vtexjs['checkout'][_0x62bc('0x26')];vtexjs[_0x62bc('0x27')][_0x62bc('0x26')]=function(){return _0x4522ef[_0x62bc('0x28')]();};});try{window[_0x62bc('0x29')]=window[_0x62bc('0x29')]||{};window[_0x62bc('0x29')][_0x62bc('0x2a')]=!0x1;_0x44600f['fn'][_0x62bc('0x2b')]=function(_0x3d0fb7,_0x156f95,_0xc3f193){var _0x1668ab=function(_0x115883,_0xe5d748){if(_0x62bc('0x17')===typeof console){var _0x1baec5='object'===typeof _0x115883;_0x62bc('0x3')!==typeof _0xe5d748&&'alerta'===_0xe5d748['toLowerCase']()?_0x1baec5?console[_0x62bc('0x2c')]('[Simple\x20Cart]\x0a',_0x115883[0x0],_0x115883[0x1],_0x115883[0x2],_0x115883[0x3],_0x115883[0x4],_0x115883[0x5],_0x115883[0x6],_0x115883[0x7]):console['warn']('[Simple\x20Cart]\x0a'+_0x115883):_0x62bc('0x3')!==typeof _0xe5d748&&_0x62bc('0x2d')===_0xe5d748[_0x62bc('0x2e')]()?_0x1baec5?console['info']('[Simple\x20Cart]\x0a',_0x115883[0x0],_0x115883[0x1],_0x115883[0x2],_0x115883[0x3],_0x115883[0x4],_0x115883[0x5],_0x115883[0x6],_0x115883[0x7]):console['info'](_0x62bc('0x2f')+_0x115883):_0x1baec5?console[_0x62bc('0x14')]('[Simple\x20Cart]\x0a',_0x115883[0x0],_0x115883[0x1],_0x115883[0x2],_0x115883[0x3],_0x115883[0x4],_0x115883[0x5],_0x115883[0x6],_0x115883[0x7]):console['error'](_0x62bc('0x2f')+_0x115883);}};var _0x10f3cc=_0x44600f(this);_0x62bc('0x17')===typeof _0x3d0fb7?_0x156f95=_0x3d0fb7:(_0x3d0fb7=_0x3d0fb7||!0x1,_0x10f3cc=_0x10f3cc['add'](_0x44600f[_0x62bc('0x30')][_0x62bc('0x31')]));if(!_0x10f3cc[_0x62bc('0x8')])return _0x10f3cc;_0x44600f[_0x62bc('0x30')]['elements']=_0x44600f[_0x62bc('0x30')][_0x62bc('0x31')]['add'](_0x10f3cc);_0xc3f193=_0x62bc('0x3')===typeof _0xc3f193?!0x1:_0xc3f193;var _0x475319={'cartQtt':_0x62bc('0x32'),'cartTotal':_0x62bc('0x33'),'itemsText':'.qd_items_text','currencySymbol':(_0x44600f(_0x62bc('0x34'))['attr'](_0x62bc('0x35'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x19a6e2=_0x44600f[_0x62bc('0x16')]({},_0x475319,_0x156f95);var _0x226bcd=_0x44600f('');_0x10f3cc['each'](function(){var _0x1488f8=_0x44600f(this);_0x1488f8[_0x62bc('0x18')](_0x62bc('0x36'))||_0x1488f8[_0x62bc('0x18')](_0x62bc('0x36'),_0x19a6e2);});var _0x41951e=function(_0x9011f2){window[_0x62bc('0x37')]=window[_0x62bc('0x37')]||{};for(var _0x3d0fb7=0x0,_0x17b0a3=0x0,_0x507fda=0x0;_0x507fda<_0x9011f2['totalizers'][_0x62bc('0x8')];_0x507fda++)_0x62bc('0x38')==_0x9011f2['totalizers'][_0x507fda]['id']&&(_0x17b0a3+=_0x9011f2[_0x62bc('0x39')][_0x507fda][_0x62bc('0x3a')]),_0x3d0fb7+=_0x9011f2[_0x62bc('0x39')][_0x507fda][_0x62bc('0x3a')];window[_0x62bc('0x37')]['total']=_0x19a6e2[_0x62bc('0x3b')]+qd_number_format(_0x3d0fb7/0x64,0x2,',','.');window[_0x62bc('0x37')]['shipping']=_0x19a6e2['currencySymbol']+qd_number_format(_0x17b0a3/0x64,0x2,',','.');window[_0x62bc('0x37')][_0x62bc('0x3c')]=_0x19a6e2[_0x62bc('0x3b')]+qd_number_format((_0x3d0fb7+_0x17b0a3)/0x64,0x2,',','.');window['_QuatroDigital_CartData'][_0x62bc('0x3d')]=0x0;if(_0x19a6e2[_0x62bc('0x3e')])for(_0x507fda=0x0;_0x507fda<_0x9011f2[_0x62bc('0x3f')][_0x62bc('0x8')];_0x507fda++)window[_0x62bc('0x37')][_0x62bc('0x3d')]+=_0x9011f2['items'][_0x507fda][_0x62bc('0x40')];else window['_QuatroDigital_CartData'][_0x62bc('0x3d')]=_0x9011f2[_0x62bc('0x3f')][_0x62bc('0x8')]||0x0;try{window['_QuatroDigital_CartData']['callback']&&window['_QuatroDigital_CartData'][_0x62bc('0x41')]['fire']&&window[_0x62bc('0x37')][_0x62bc('0x41')]['fire']();}catch(_0x59b918){_0x1668ab('Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart');}_0x3e131f(_0x226bcd);};var _0x4ce5fa=function(_0x40f0be,_0x22c76d){0x1===_0x40f0be?_0x22c76d[_0x62bc('0x42')]()[_0x62bc('0x43')]('.singular')[_0x62bc('0x44')]():_0x22c76d[_0x62bc('0x42')]()['filter'](_0x62bc('0x45'))['show']();};var _0x1aae68=function(_0x11b6b5){0x1>_0x11b6b5?_0x10f3cc[_0x62bc('0x46')](_0x62bc('0x47')):_0x10f3cc[_0x62bc('0x48')](_0x62bc('0x47'));};var _0x2fdcd6=function(_0x481562,_0x26d002){var _0x29916a=parseInt(window['_QuatroDigital_CartData'][_0x62bc('0x3d')],0xa);_0x26d002['$this'][_0x62bc('0x44')]();isNaN(_0x29916a)&&(_0x1668ab(_0x62bc('0x49'),'alerta'),_0x29916a=0x0);_0x26d002[_0x62bc('0x4a')][_0x62bc('0x4b')](window[_0x62bc('0x37')]['total']);_0x26d002[_0x62bc('0x4c')][_0x62bc('0x4b')](_0x29916a);_0x4ce5fa(_0x29916a,_0x26d002[_0x62bc('0x4d')]);_0x1aae68(_0x29916a);};var _0x3e131f=function(_0x24b107){_0x10f3cc[_0x62bc('0x4e')](function(){var _0xe9ea36={};var _0x446160=_0x44600f(this);_0x3d0fb7&&_0x446160[_0x62bc('0x18')](_0x62bc('0x36'))&&_0x44600f[_0x62bc('0x16')](_0x19a6e2,_0x446160[_0x62bc('0x18')](_0x62bc('0x36')));_0xe9ea36[_0x62bc('0x4f')]=_0x446160;_0xe9ea36[_0x62bc('0x4c')]=_0x446160[_0x62bc('0x50')](_0x19a6e2['cartQtt'])||_0x226bcd;_0xe9ea36[_0x62bc('0x4a')]=_0x446160[_0x62bc('0x50')](_0x19a6e2[_0x62bc('0x51')])||_0x226bcd;_0xe9ea36[_0x62bc('0x4d')]=_0x446160[_0x62bc('0x50')](_0x19a6e2[_0x62bc('0x52')])||_0x226bcd;_0xe9ea36[_0x62bc('0x53')]=_0x446160[_0x62bc('0x50')](_0x19a6e2[_0x62bc('0x54')])||_0x226bcd;_0x2fdcd6(_0x24b107,_0xe9ea36);_0x446160[_0x62bc('0x46')](_0x62bc('0x55'));});};(function(){if(_0x19a6e2[_0x62bc('0x56')]){window['_QuatroDigital_DropDown']=window[_0x62bc('0x57')]||{};if('undefined'!==typeof window[_0x62bc('0x57')][_0x62bc('0x26')]&&(_0xc3f193||!_0x3d0fb7))return _0x41951e(window[_0x62bc('0x57')][_0x62bc('0x26')]);if(_0x62bc('0x17')!==typeof window[_0x62bc('0x58')]||_0x62bc('0x3')===typeof window[_0x62bc('0x58')]['checkout'])if('object'===typeof vtex&&_0x62bc('0x17')===typeof vtex[_0x62bc('0x27')]&&_0x62bc('0x3')!==typeof vtex['checkout'][_0x62bc('0x59')])new vtex[(_0x62bc('0x27'))][(_0x62bc('0x59'))]();else return _0x1668ab(_0x62bc('0x5a'));_0x44600f['QD_checkoutQueue']([_0x62bc('0x3f'),_0x62bc('0x39'),_0x62bc('0x5b')],{'done':function(_0x424033){_0x41951e(_0x424033);window[_0x62bc('0x57')][_0x62bc('0x26')]=_0x424033;},'fail':function(_0x223f56){_0x1668ab(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.',_0x223f56]);}});}else alert(_0x62bc('0x5c'));}());_0x19a6e2[_0x62bc('0x41')]();_0x44600f(window)[_0x62bc('0x5d')]('simpleCartCallback.quatro_digital');return _0x10f3cc;};_0x44600f['QD_simpleCart']={'elements':_0x44600f('')};_0x44600f(function(){var _0xc8de85;_0x62bc('0xa')===typeof window[_0x62bc('0x5e')]&&(_0xc8de85=window['ajaxRequestbuyButtonAsynchronous'],window[_0x62bc('0x5e')]=function(_0x579c0c,_0x332b8f,_0x15741c,_0x4b593a,_0x3884b0){_0xc8de85['call'](this,_0x579c0c,_0x332b8f,_0x15741c,_0x4b593a,function(){_0x62bc('0xa')===typeof _0x3884b0&&_0x3884b0();_0x44600f['QD_simpleCart'][_0x62bc('0x31')][_0x62bc('0x4e')](function(){var _0x3f00f4=_0x44600f(this);_0x3f00f4[_0x62bc('0x2b')](_0x3f00f4[_0x62bc('0x18')](_0x62bc('0x36')));});});});});var _0x5a28f4=window[_0x62bc('0x5f')]||void 0x0;window[_0x62bc('0x5f')]=function(_0x2e28e4){_0x44600f['fn']['simpleCart'](!0x0);_0x62bc('0xa')===typeof _0x5a28f4?_0x5a28f4[_0x62bc('0x28')](this,_0x2e28e4):alert(_0x2e28e4);};_0x44600f(function(){var _0x304bdc=_0x44600f(_0x62bc('0x60'));_0x304bdc['length']&&_0x304bdc[_0x62bc('0x2b')]();});_0x44600f(function(){_0x44600f(window)[_0x62bc('0x61')](_0x62bc('0x62'),function(){_0x44600f['fn'][_0x62bc('0x2b')](!0x0);});});}catch(_0x31d5f0){'undefined'!==typeof console&&'function'===typeof console[_0x62bc('0x14')]&&console['error'](_0x62bc('0x63'),_0x31d5f0);}}}());(function(){var _0x18779a=function(_0x549fb4,_0x468f58){if('object'===typeof console){var _0xfd3d8d=_0x62bc('0x17')===typeof _0x549fb4;_0x62bc('0x3')!==typeof _0x468f58&&'alerta'===_0x468f58[_0x62bc('0x2e')]()?_0xfd3d8d?console[_0x62bc('0x2c')](_0x62bc('0x64'),_0x549fb4[0x0],_0x549fb4[0x1],_0x549fb4[0x2],_0x549fb4[0x3],_0x549fb4[0x4],_0x549fb4[0x5],_0x549fb4[0x6],_0x549fb4[0x7]):console[_0x62bc('0x2c')](_0x62bc('0x64')+_0x549fb4):'undefined'!==typeof _0x468f58&&_0x62bc('0x2d')===_0x468f58[_0x62bc('0x2e')]()?_0xfd3d8d?console[_0x62bc('0x2d')](_0x62bc('0x64'),_0x549fb4[0x0],_0x549fb4[0x1],_0x549fb4[0x2],_0x549fb4[0x3],_0x549fb4[0x4],_0x549fb4[0x5],_0x549fb4[0x6],_0x549fb4[0x7]):console[_0x62bc('0x2d')](_0x62bc('0x64')+_0x549fb4):_0xfd3d8d?console[_0x62bc('0x14')](_0x62bc('0x64'),_0x549fb4[0x0],_0x549fb4[0x1],_0x549fb4[0x2],_0x549fb4[0x3],_0x549fb4[0x4],_0x549fb4[0x5],_0x549fb4[0x6],_0x549fb4[0x7]):console[_0x62bc('0x14')](_0x62bc('0x64')+_0x549fb4);}},_0x4dc4c8=null,_0x166ee3={},_0x585ae0={},_0x2a3599={};$[_0x62bc('0x65')]=function(_0x500f11,_0x31abe4){if(null===_0x4dc4c8)if(_0x62bc('0x17')===typeof window[_0x62bc('0x58')]&&_0x62bc('0x3')!==typeof window['vtexjs'][_0x62bc('0x27')])_0x4dc4c8=window[_0x62bc('0x58')][_0x62bc('0x27')];else return _0x18779a(_0x62bc('0x66'));var _0x105128=$[_0x62bc('0x16')]({'done':function(){},'fail':function(){}},_0x31abe4),_0x14b501=_0x500f11['join'](';'),_0x29f50a=function(){_0x166ee3[_0x14b501][_0x62bc('0x67')](_0x105128[_0x62bc('0x1e')]);_0x585ae0[_0x14b501][_0x62bc('0x67')](_0x105128[_0x62bc('0x20')]);};_0x2a3599[_0x14b501]?_0x29f50a():(_0x166ee3[_0x14b501]=$[_0x62bc('0x68')](),_0x585ae0[_0x14b501]=$[_0x62bc('0x68')](),_0x29f50a(),_0x2a3599[_0x14b501]=!0x0,_0x4dc4c8[_0x62bc('0x26')](_0x500f11)[_0x62bc('0x1e')](function(_0x39fe0f){_0x2a3599[_0x14b501]=!0x1;_0x166ee3[_0x14b501][_0x62bc('0x69')](_0x39fe0f);})[_0x62bc('0x20')](function(_0x52550f){_0x2a3599[_0x14b501]=!0x1;_0x585ae0[_0x14b501]['fire'](_0x52550f);}));};}());(function(_0x3a1bdb){try{var _0x20264e=jQuery,_0x5bbf59,_0x44dc67=_0x20264e({}),_0x4a2fd4=function(_0x36bb61,_0x57933d){if(_0x62bc('0x17')===typeof console&&'undefined'!==typeof console[_0x62bc('0x14')]&&'undefined'!==typeof console[_0x62bc('0x2d')]&&'undefined'!==typeof console[_0x62bc('0x2c')]){var _0x118669;_0x62bc('0x17')===typeof _0x36bb61?(_0x36bb61[_0x62bc('0x6a')](_0x62bc('0x6b')),_0x118669=_0x36bb61):_0x118669=[_0x62bc('0x6b')+_0x36bb61];if('undefined'===typeof _0x57933d||_0x62bc('0x6c')!==_0x57933d[_0x62bc('0x2e')]()&&_0x62bc('0x6d')!==_0x57933d[_0x62bc('0x2e')]())if(_0x62bc('0x3')!==typeof _0x57933d&&_0x62bc('0x2d')===_0x57933d[_0x62bc('0x2e')]())try{console[_0x62bc('0x2d')][_0x62bc('0x6e')](console,_0x118669);}catch(_0x19235f){try{console[_0x62bc('0x2d')](_0x118669[_0x62bc('0x9')]('\x0a'));}catch(_0x166f90){}}else try{console['error']['apply'](console,_0x118669);}catch(_0x5e28a9){try{console[_0x62bc('0x14')](_0x118669['join']('\x0a'));}catch(_0x3241f8){}}else try{console[_0x62bc('0x2c')][_0x62bc('0x6e')](console,_0x118669);}catch(_0x2844a6){try{console[_0x62bc('0x2c')](_0x118669[_0x62bc('0x9')]('\x0a'));}catch(_0x3a7a73){}}}},_0x3452d0={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0x62bc('0x6f'),'buyQtt':'input.buy-in-page-quantity','selectSkuMsg':_0x62bc('0x70'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0xd7507b,_0x2570f2,_0x4a74e9){_0x20264e(_0x62bc('0x71'))['is']('.productQuickView')&&(_0x62bc('0x1f')===_0x2570f2?alert(_0x62bc('0x72')):(alert('Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.'),(_0x62bc('0x17')===typeof parent?parent:document)[_0x62bc('0x73')]['href']=_0x4a74e9));},'isProductPage':function(){return _0x20264e('body')['is']('#produto,\x20.produto');},'execDefaultAction':function(_0x5f3c36){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x20264e[_0x62bc('0x74')]=function(_0x5d8047,_0xcaafd4){function _0x397270(_0x3aac90){_0x5bbf59['isSmartCheckout']?_0x3aac90[_0x62bc('0x18')](_0x62bc('0x75'))||(_0x3aac90[_0x62bc('0x18')](_0x62bc('0x75'),0x1),_0x3aac90['on'](_0x62bc('0x76'),function(_0x19100f){if(!_0x5bbf59[_0x62bc('0x77')]())return!0x0;if(!0x0!==_0x457f42[_0x62bc('0x78')][_0x62bc('0x28')](this))return _0x19100f[_0x62bc('0x79')](),!0x1;})):alert(_0x62bc('0x7a'));}function _0x3575e7(_0x2df1a6){_0x2df1a6=_0x2df1a6||_0x20264e(_0x5bbf59[_0x62bc('0x7b')]);_0x2df1a6['each'](function(){var _0x2df1a6=_0x20264e(this);_0x2df1a6['is'](_0x62bc('0x7c'))||(_0x2df1a6['addClass'](_0x62bc('0x7d')),_0x2df1a6['is'](_0x62bc('0x7e'))&&!_0x2df1a6['is'](_0x62bc('0x7f'))||_0x2df1a6[_0x62bc('0x18')]('qd-bb-active')||(_0x2df1a6[_0x62bc('0x18')](_0x62bc('0x80'),0x1),_0x2df1a6['children'](_0x62bc('0x81'))[_0x62bc('0x8')]||_0x2df1a6[_0x62bc('0x82')]('<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>'),_0x2df1a6['is']('.buy-in-page-button')&&_0x5bbf59[_0x62bc('0x83')]()&&_0x15b35b['call'](_0x2df1a6),_0x397270(_0x2df1a6)));});_0x5bbf59[_0x62bc('0x83')]()&&!_0x2df1a6[_0x62bc('0x8')]&&_0x4a2fd4('Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27'+_0x2df1a6['selector']+'\x27.',_0x62bc('0x2d'));}var _0x36c8b3=_0x20264e(_0x5d8047);var _0x457f42=this;window[_0x62bc('0x84')]=window[_0x62bc('0x84')]||{};window[_0x62bc('0x37')]=window[_0x62bc('0x37')]||{};_0x457f42['prodAdd']=function(_0x3c8c68,_0x4dfeb7){_0x36c8b3[_0x62bc('0x46')](_0x62bc('0x85'));_0x20264e(_0x62bc('0x71'))['addClass'](_0x62bc('0x86'));var _0x3cfddb=_0x20264e(_0x5bbf59[_0x62bc('0x7b')])[_0x62bc('0x43')](_0x62bc('0x87')+(_0x3c8c68['attr'](_0x62bc('0x88'))||_0x62bc('0x89'))+'\x27]')[_0x62bc('0x67')](_0x3c8c68);_0x3cfddb[_0x62bc('0x46')](_0x62bc('0x8a'));setTimeout(function(){_0x36c8b3[_0x62bc('0x48')](_0x62bc('0x8b'));_0x3cfddb[_0x62bc('0x48')](_0x62bc('0x8a'));},_0x5bbf59[_0x62bc('0x8c')]);window['_Quatro_Digital_dropDown'][_0x62bc('0x26')]=void 0x0;if(_0x62bc('0x3')!==typeof _0xcaafd4&&'function'===typeof _0xcaafd4['getCartInfoByUrl'])return _0x5bbf59['isSmartCheckout']||(_0x4a2fd4(_0x62bc('0x8d')),_0xcaafd4[_0x62bc('0x8e')]()),window['_QuatroDigital_DropDown'][_0x62bc('0x26')]=void 0x0,_0xcaafd4[_0x62bc('0x8e')](function(_0x51c7fa){window[_0x62bc('0x84')][_0x62bc('0x26')]=_0x51c7fa;_0x20264e['fn']['simpleCart'](!0x0,void 0x0,!0x0);},{'lastSku':_0x4dfeb7});window[_0x62bc('0x84')]['allowUpdate']=!0x0;_0x20264e['fn'][_0x62bc('0x2b')](!0x0);};(function(){if(_0x5bbf59[_0x62bc('0x8f')]&&_0x5bbf59[_0x62bc('0x90')]){var _0x5539e3=_0x20264e(_0x62bc('0x7e'));_0x5539e3['length']&&_0x3575e7(_0x5539e3);}}());var _0x15b35b=function(){var _0x6037be=_0x20264e(this);_0x62bc('0x3')!==typeof _0x6037be[_0x62bc('0x18')]('buyButton')?(_0x6037be[_0x62bc('0x91')](_0x62bc('0x92')),_0x397270(_0x6037be)):(_0x6037be['bind'](_0x62bc('0x93'),function(_0x28c7be){_0x6037be[_0x62bc('0x91')](_0x62bc('0x92'));_0x397270(_0x6037be);_0x20264e(this)[_0x62bc('0x91')](_0x28c7be);}),_0x20264e(window)[_0x62bc('0x94')](function(){_0x6037be[_0x62bc('0x91')](_0x62bc('0x92'));_0x397270(_0x6037be);_0x6037be[_0x62bc('0x91')](_0x62bc('0x93'));}));};_0x457f42['clickBuySmartCheckout']=function(){var _0x436f0d=_0x20264e(this),_0x5d8047=_0x436f0d[_0x62bc('0x95')](_0x62bc('0x88'))||'';if(-0x1<_0x5d8047[_0x62bc('0x96')](_0x5bbf59[_0x62bc('0x97')]))return!0x0;_0x5d8047=_0x5d8047['replace'](/redirect\=(false|true)/gi,'')[_0x62bc('0x2')]('?',_0x62bc('0x98'))[_0x62bc('0x2')](/\&\&/gi,'&');if(_0x5bbf59[_0x62bc('0x99')](_0x436f0d))return _0x436f0d[_0x62bc('0x95')](_0x62bc('0x88'),_0x5d8047[_0x62bc('0x2')](_0x62bc('0x9a'),_0x62bc('0x9b'))),!0x0;_0x5d8047=_0x5d8047['replace'](/http.?:/i,'');_0x44dc67[_0x62bc('0x9c')](function(_0x1cdc40){if(!_0x5bbf59[_0x62bc('0x9d')]&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0x62bc('0x9e')](_0x5d8047))return _0x1cdc40();var _0x2b2320=function(_0x424050,_0x1abe36){var _0x3575e7=_0x5d8047[_0x62bc('0x9f')](/sku\=([0-9]+)/gi),_0x139be6=[];if(_0x62bc('0x17')===typeof _0x3575e7&&null!==_0x3575e7)for(var _0x428388=_0x3575e7['length']-0x1;0x0<=_0x428388;_0x428388--){var _0x8269c=parseInt(_0x3575e7[_0x428388][_0x62bc('0x2')](/sku\=/gi,''));isNaN(_0x8269c)||_0x139be6[_0x62bc('0xa0')](_0x8269c);}_0x5bbf59[_0x62bc('0xa1')][_0x62bc('0x28')](this,_0x424050,_0x1abe36,_0x5d8047);_0x457f42[_0x62bc('0xa2')][_0x62bc('0x28')](this,_0x424050,_0x1abe36,_0x5d8047,_0x139be6);_0x457f42[_0x62bc('0xa3')](_0x436f0d,_0x5d8047[_0x62bc('0x7')](_0x62bc('0xa4'))[_0x62bc('0xa5')]()[_0x62bc('0x7')]('&')['shift']());'function'===typeof _0x5bbf59[_0x62bc('0xa6')]&&_0x5bbf59[_0x62bc('0xa6')][_0x62bc('0x28')](this);_0x20264e(window)[_0x62bc('0x5d')](_0x62bc('0xa7'));_0x20264e(window)[_0x62bc('0x5d')](_0x62bc('0xa8'));};_0x5bbf59[_0x62bc('0xa9')]?(_0x2b2320(null,_0x62bc('0x1f')),_0x1cdc40()):_0x20264e['ajax']({'url':_0x5d8047,'complete':_0x2b2320})[_0x62bc('0x21')](function(){_0x1cdc40();});});};_0x457f42[_0x62bc('0xa2')]=function(_0x3c3b2c,_0x4f9948,_0x207bf4,_0x4e582b){try{_0x62bc('0x1f')===_0x4f9948&&_0x62bc('0x17')===typeof window[_0x62bc('0xaa')]&&'function'===typeof window['parent'][_0x62bc('0xab')]&&window[_0x62bc('0xaa')][_0x62bc('0xab')](_0x3c3b2c,_0x4f9948,_0x207bf4,_0x4e582b);}catch(_0x8de807){_0x4a2fd4('Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.');}};_0x3575e7();_0x62bc('0xa')===typeof _0x5bbf59['callback']?_0x5bbf59[_0x62bc('0x41')]['call'](this):_0x4a2fd4('Callback\x20não\x20é\x20uma\x20função');};var _0xec705f=_0x20264e[_0x62bc('0x68')]();_0x20264e['fn']['QD_buyButton']=function(_0x285844,_0x5ea88e){var _0x3a1bdb=_0x20264e(this);_0x62bc('0x3')!==typeof _0x5ea88e||_0x62bc('0x17')!==typeof _0x285844||_0x285844 instanceof _0x20264e||(_0x5ea88e=_0x285844,_0x285844=void 0x0);_0x5bbf59=_0x20264e['extend']({},_0x3452d0,_0x5ea88e);var _0x2b82f5;_0xec705f[_0x62bc('0x67')](function(){_0x3a1bdb['children']('.qd-bb-itemAddWrapper')['length']||_0x3a1bdb[_0x62bc('0xac')](_0x62bc('0xad'));_0x2b82f5=new _0x20264e[(_0x62bc('0x74'))](_0x3a1bdb,_0x285844);});_0xec705f['fire']();_0x20264e(window)['on'](_0x62bc('0xae'),function(_0x2aa07f,_0x2a5c90,_0x3ef4ba){_0x2b82f5['prodAdd'](_0x2a5c90,_0x3ef4ba);});return _0x20264e[_0x62bc('0x16')](_0x3a1bdb,_0x2b82f5);};var _0x57d1be=0x0;_0x20264e(document)[_0x62bc('0xaf')](function(_0x48c430,_0x2c2203,_0x31b6e0){-0x1<_0x31b6e0[_0x62bc('0x1a')][_0x62bc('0x2e')]()[_0x62bc('0x96')](_0x62bc('0xb0'))&&(_0x57d1be=(_0x31b6e0[_0x62bc('0x1a')][_0x62bc('0x9f')](/sku\=([0-9]+)/i)||[''])['pop']());});_0x20264e(window)[_0x62bc('0x61')]('productAddedToCart.qdSbbVtex',function(){_0x20264e(window)[_0x62bc('0x5d')]('QuatroDigital.qd_bb_prod_add',[new _0x20264e(),_0x57d1be]);});_0x20264e(document)['ajaxStop'](function(){_0xec705f[_0x62bc('0x69')]();});}catch(_0x1cdec6){_0x62bc('0x3')!==typeof console&&_0x62bc('0xa')===typeof console[_0x62bc('0x14')]&&console['error']('Oooops!\x20',_0x1cdec6);}}(this));function qd_number_format(_0xf0fb03,_0x44c021,_0x2e6d51,_0x2daf3c){_0xf0fb03=(_0xf0fb03+'')['replace'](/[^0-9+\-Ee.]/g,'');_0xf0fb03=isFinite(+_0xf0fb03)?+_0xf0fb03:0x0;_0x44c021=isFinite(+_0x44c021)?Math[_0x62bc('0xb1')](_0x44c021):0x0;_0x2daf3c=_0x62bc('0x3')===typeof _0x2daf3c?',':_0x2daf3c;_0x2e6d51=_0x62bc('0x3')===typeof _0x2e6d51?'.':_0x2e6d51;var _0x3795ae='',_0x3795ae=function(_0x568c06,_0x36f05a){var _0x46e41a=Math['pow'](0xa,_0x36f05a);return''+(Math[_0x62bc('0x6')](_0x568c06*_0x46e41a)/_0x46e41a)[_0x62bc('0x5')](_0x36f05a);},_0x3795ae=(_0x44c021?_0x3795ae(_0xf0fb03,_0x44c021):''+Math[_0x62bc('0x6')](_0xf0fb03))[_0x62bc('0x7')]('.');0x3<_0x3795ae[0x0][_0x62bc('0x8')]&&(_0x3795ae[0x0]=_0x3795ae[0x0][_0x62bc('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x2daf3c));(_0x3795ae[0x1]||'')[_0x62bc('0x8')]<_0x44c021&&(_0x3795ae[0x1]=_0x3795ae[0x1]||'',_0x3795ae[0x1]+=Array(_0x44c021-_0x3795ae[0x1][_0x62bc('0x8')]+0x1)[_0x62bc('0x9')]('0'));return _0x3795ae[_0x62bc('0x9')](_0x2e6d51);}(function(){try{window[_0x62bc('0x37')]=window[_0x62bc('0x37')]||{},window[_0x62bc('0x37')]['callback']=window[_0x62bc('0x37')]['callback']||$[_0x62bc('0x68')]();}catch(_0x42824){_0x62bc('0x3')!==typeof console&&_0x62bc('0xa')===typeof console[_0x62bc('0x14')]&&console['error'](_0x62bc('0x63'),_0x42824[_0x62bc('0xb2')]);}}());(function(_0x8505dc){try{var _0xa61c39=jQuery,_0x425e64=function(_0x371897,_0x431280){if(_0x62bc('0x17')===typeof console&&'undefined'!==typeof console[_0x62bc('0x14')]&&_0x62bc('0x3')!==typeof console[_0x62bc('0x2d')]&&_0x62bc('0x3')!==typeof console['warn']){var _0x1a6f86;_0x62bc('0x17')===typeof _0x371897?(_0x371897[_0x62bc('0x6a')](_0x62bc('0xb3')),_0x1a6f86=_0x371897):_0x1a6f86=['[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'+_0x371897];if('undefined'===typeof _0x431280||_0x62bc('0x6c')!==_0x431280[_0x62bc('0x2e')]()&&_0x62bc('0x6d')!==_0x431280[_0x62bc('0x2e')]())if(_0x62bc('0x3')!==typeof _0x431280&&'info'===_0x431280[_0x62bc('0x2e')]())try{console[_0x62bc('0x2d')][_0x62bc('0x6e')](console,_0x1a6f86);}catch(_0x129ae2){try{console[_0x62bc('0x2d')](_0x1a6f86['join']('\x0a'));}catch(_0x154a74){}}else try{console[_0x62bc('0x14')]['apply'](console,_0x1a6f86);}catch(_0x16ee17){try{console[_0x62bc('0x14')](_0x1a6f86[_0x62bc('0x9')]('\x0a'));}catch(_0x5702eb){}}else try{console[_0x62bc('0x2c')][_0x62bc('0x6e')](console,_0x1a6f86);}catch(_0x138dab){try{console[_0x62bc('0x2c')](_0x1a6f86[_0x62bc('0x9')]('\x0a'));}catch(_0x343e58){}}}};window['_QuatroDigital_DropDown']=window[_0x62bc('0x57')]||{};window[_0x62bc('0x57')][_0x62bc('0xb4')]=!0x0;_0xa61c39[_0x62bc('0xb5')]=function(){};_0xa61c39['fn']['QD_dropDownCart']=function(){return{'fn':new _0xa61c39()};};var _0x543891=function(_0x5967f8){var _0x52fdc4={'t':_0x62bc('0xb6')};return function(_0x158ee0){var _0x2dbb9a=function(_0xd9f719){return _0xd9f719;};var _0xe67f14=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x158ee0=_0x158ee0['d'+_0xe67f14[0x10]+'c'+_0xe67f14[0x11]+'m'+_0x2dbb9a(_0xe67f14[0x1])+'n'+_0xe67f14[0xd]]['l'+_0xe67f14[0x12]+'c'+_0xe67f14[0x0]+'ti'+_0x2dbb9a('o')+'n'];var _0x42e9af=function(_0x3befba){return escape(encodeURIComponent(_0x3befba[_0x62bc('0x2')](/\./g,'¨')[_0x62bc('0x2')](/[a-zA-Z]/g,function(_0x1c7f7b){return String['fromCharCode'](('Z'>=_0x1c7f7b?0x5a:0x7a)>=(_0x1c7f7b=_0x1c7f7b[_0x62bc('0xb7')](0x0)+0xd)?_0x1c7f7b:_0x1c7f7b-0x1a);})));};var _0x8505dc=_0x42e9af(_0x158ee0[[_0xe67f14[0x9],_0x2dbb9a('o'),_0xe67f14[0xc],_0xe67f14[_0x2dbb9a(0xd)]][_0x62bc('0x9')]('')]);_0x42e9af=_0x42e9af((window[['js',_0x2dbb9a('no'),'m',_0xe67f14[0x1],_0xe67f14[0x4][_0x62bc('0xf')](),_0x62bc('0xb8')][_0x62bc('0x9')]('')]||'---')+['.v',_0xe67f14[0xd],'e',_0x2dbb9a('x'),'co',_0x2dbb9a('mm'),_0x62bc('0xb9'),_0xe67f14[0x1],'.c',_0x2dbb9a('o'),'m.',_0xe67f14[0x13],'r'][_0x62bc('0x9')](''));for(var _0x1f7f20 in _0x52fdc4){if(_0x42e9af===_0x1f7f20+_0x52fdc4[_0x1f7f20]||_0x8505dc===_0x1f7f20+_0x52fdc4[_0x1f7f20]){var _0x34841b='tr'+_0xe67f14[0x11]+'e';break;}_0x34841b='f'+_0xe67f14[0x0]+'ls'+_0x2dbb9a(_0xe67f14[0x1])+'';}_0x2dbb9a=!0x1;-0x1<_0x158ee0[[_0xe67f14[0xc],'e',_0xe67f14[0x0],'rc',_0xe67f14[0x9]]['join']('')][_0x62bc('0x96')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x2dbb9a=!0x0);return[_0x34841b,_0x2dbb9a];}(_0x5967f8);}(window);if(!eval(_0x543891[0x0]))return _0x543891[0x1]?_0x425e64('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0xa61c39['QD_dropDownCart']=function(_0x383fd5,_0x1a3db0){var _0x48522a=_0xa61c39(_0x383fd5);if(!_0x48522a[_0x62bc('0x8')])return _0x48522a;var _0x4c6f1f=_0xa61c39[_0x62bc('0x16')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x62bc('0xba'),'linkCheckout':'Finalizar\x20Compra','cartTotal':_0x62bc('0xbb'),'emptyCart':'Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','continueShopping':_0x62bc('0xbc'),'shippingForm':_0x62bc('0xbd')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x51bea5){return _0x51bea5[_0x62bc('0xbe')]||_0x51bea5[_0x62bc('0xbf')];},'callback':function(){},'callbackProductsList':function(){}},_0x1a3db0);_0xa61c39('');var _0x1243ab=this;if(_0x4c6f1f[_0x62bc('0x56')]){var _0x5608b3=!0x1;_0x62bc('0x3')===typeof window[_0x62bc('0x58')]&&(_0x425e64('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN'),_0xa61c39[_0x62bc('0x1d')]({'url':_0x62bc('0xc0'),'async':!0x1,'dataType':_0x62bc('0xc1'),'error':function(){_0x425e64('Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.');_0x5608b3=!0x0;}}));if(_0x5608b3)return _0x425e64(_0x62bc('0xc2'));}if('object'===typeof window[_0x62bc('0x58')]&&_0x62bc('0x3')!==typeof window[_0x62bc('0x58')][_0x62bc('0x27')])var _0x503d48=window[_0x62bc('0x58')][_0x62bc('0x27')];else if(_0x62bc('0x17')===typeof vtex&&'object'===typeof vtex[_0x62bc('0x27')]&&'undefined'!==typeof vtex[_0x62bc('0x27')][_0x62bc('0x59')])_0x503d48=new vtex['checkout'][(_0x62bc('0x59'))]();else return _0x425e64('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x1243ab['cartContainer']=_0x62bc('0xc3');var _0x5318f9=function(_0x2bcb3e){_0xa61c39(this)[_0x62bc('0x82')](_0x2bcb3e);_0x2bcb3e[_0x62bc('0x50')](_0x62bc('0xc4'))[_0x62bc('0x67')](_0xa61c39(_0x62bc('0xc5')))['on'](_0x62bc('0xc6'),function(){_0x48522a['removeClass'](_0x62bc('0xc7'));_0xa61c39(document[_0x62bc('0x71')])[_0x62bc('0x48')](_0x62bc('0x86'));});_0xa61c39(document)[_0x62bc('0xc8')](_0x62bc('0xc9'))['on']('keyup.qd_ddc_closeFn',function(_0x39235c){0x1b==_0x39235c[_0x62bc('0xca')]&&(_0x48522a[_0x62bc('0x48')](_0x62bc('0xc7')),_0xa61c39(document[_0x62bc('0x71')])[_0x62bc('0x48')]('qd-bb-lightBoxBodyProdAdd'));});var _0x4aeac6=_0x2bcb3e[_0x62bc('0x50')](_0x62bc('0xcb'));_0x2bcb3e[_0x62bc('0x50')]('.qd-ddc-scrollUp')['on'](_0x62bc('0xcc'),function(){_0x1243ab[_0x62bc('0xcd')]('-',void 0x0,void 0x0,_0x4aeac6);return!0x1;});_0x2bcb3e[_0x62bc('0x50')](_0x62bc('0xce'))['on'](_0x62bc('0xcf'),function(){_0x1243ab['scrollCart'](void 0x0,void 0x0,void 0x0,_0x4aeac6);return!0x1;});_0x2bcb3e[_0x62bc('0x50')](_0x62bc('0xd0'))['val']('')['on']('keyup.qd_ddc_cep',function(){_0x1243ab['shippingCalculate'](_0xa61c39(this));});if(_0x4c6f1f[_0x62bc('0xd1')]){var _0x1a3db0=0x0;_0xa61c39(this)['on']('mouseenter.qd_ddc_hover',function(){var _0x2bcb3e=function(){window[_0x62bc('0x57')][_0x62bc('0xb4')]&&(_0x1243ab['getCartInfoByUrl'](),window[_0x62bc('0x57')][_0x62bc('0xb4')]=!0x1,_0xa61c39['fn'][_0x62bc('0x2b')](!0x0),_0x1243ab[_0x62bc('0xd2')]());};_0x1a3db0=setInterval(function(){_0x2bcb3e();},0x258);_0x2bcb3e();});_0xa61c39(this)['on'](_0x62bc('0xd3'),function(){clearInterval(_0x1a3db0);});}};var _0x33191f=function(_0x1290e9){_0x1290e9=_0xa61c39(_0x1290e9);_0x4c6f1f['texts'][_0x62bc('0x51')]=_0x4c6f1f[_0x62bc('0xd4')][_0x62bc('0x51')]['replace'](_0x62bc('0xd5'),'<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>');_0x4c6f1f['texts']['cartTotal']=_0x4c6f1f[_0x62bc('0xd4')][_0x62bc('0x51')][_0x62bc('0x2')](_0x62bc('0xd6'),_0x62bc('0xd7'));_0x4c6f1f['texts'][_0x62bc('0x51')]=_0x4c6f1f[_0x62bc('0xd4')][_0x62bc('0x51')][_0x62bc('0x2')]('#shipping',_0x62bc('0xd8'));_0x4c6f1f['texts'][_0x62bc('0x51')]=_0x4c6f1f[_0x62bc('0xd4')][_0x62bc('0x51')][_0x62bc('0x2')](_0x62bc('0xd9'),_0x62bc('0xda'));_0x1290e9['find']('.qd-ddc-viewCart')[_0x62bc('0x4b')](_0x4c6f1f[_0x62bc('0xd4')][_0x62bc('0xdb')]);_0x1290e9[_0x62bc('0x50')](_0x62bc('0xdc'))[_0x62bc('0x4b')](_0x4c6f1f[_0x62bc('0xd4')][_0x62bc('0xdd')]);_0x1290e9[_0x62bc('0x50')](_0x62bc('0xde'))['html'](_0x4c6f1f[_0x62bc('0xd4')][_0x62bc('0xdf')]);_0x1290e9[_0x62bc('0x50')](_0x62bc('0xe0'))[_0x62bc('0x4b')](_0x4c6f1f['texts'][_0x62bc('0x51')]);_0x1290e9[_0x62bc('0x50')](_0x62bc('0xe1'))[_0x62bc('0x4b')](_0x4c6f1f['texts']['shippingForm']);_0x1290e9[_0x62bc('0x50')]('.qd-ddc-emptyCart\x20p')[_0x62bc('0x4b')](_0x4c6f1f[_0x62bc('0xd4')][_0x62bc('0x54')]);return _0x1290e9;}(this[_0x62bc('0xe2')]);var _0x50ff6b=0x0;_0x48522a[_0x62bc('0x4e')](function(){0x0<_0x50ff6b?_0x5318f9[_0x62bc('0x28')](this,_0x33191f[_0x62bc('0xe3')]()):_0x5318f9[_0x62bc('0x28')](this,_0x33191f);_0x50ff6b++;});window[_0x62bc('0x37')][_0x62bc('0x41')]['add'](function(){_0xa61c39('.qd-ddc-infoTotalValue')['html'](window['_QuatroDigital_CartData'][_0x62bc('0xe4')]||'--');_0xa61c39(_0x62bc('0xe5'))[_0x62bc('0x4b')](window[_0x62bc('0x37')]['qtt']||'0');_0xa61c39(_0x62bc('0xe6'))[_0x62bc('0x4b')](window[_0x62bc('0x37')][_0x62bc('0xe7')]||'--');_0xa61c39('.qd-ddc-infoAllTotal')[_0x62bc('0x4b')](window['_QuatroDigital_CartData'][_0x62bc('0x3c')]||'--');});var _0x2a0d60=function(_0x4f1001,_0x1d7f69){if('undefined'===typeof _0x4f1001['items'])return _0x425e64(_0x62bc('0xe8'));_0x1243ab['renderProductsList'][_0x62bc('0x28')](this,_0x1d7f69);};_0x1243ab[_0x62bc('0x8e')]=function(_0x54c536,_0x45cde5){_0x62bc('0x3')!=typeof _0x45cde5?window[_0x62bc('0x57')][_0x62bc('0xe9')]=_0x45cde5:window[_0x62bc('0x57')]['dataOptionsCache']&&(_0x45cde5=window[_0x62bc('0x57')][_0x62bc('0xe9')]);setTimeout(function(){window[_0x62bc('0x57')][_0x62bc('0xe9')]=void 0x0;},_0x4c6f1f['timeRemoveNewItemClass']);_0xa61c39(_0x62bc('0xea'))[_0x62bc('0x48')](_0x62bc('0xeb'));if(_0x4c6f1f['smartCheckout']){var _0x1a3db0=function(_0xccd745){window[_0x62bc('0x57')][_0x62bc('0x26')]=_0xccd745;_0x2a0d60(_0xccd745,_0x45cde5);'undefined'!==typeof window[_0x62bc('0xec')]&&_0x62bc('0xa')===typeof window[_0x62bc('0xec')][_0x62bc('0xed')]&&window['_QuatroDigital_AmountProduct'][_0x62bc('0xed')][_0x62bc('0x28')](this);_0xa61c39('.qd-ddc-wrapper')[_0x62bc('0x46')](_0x62bc('0xeb'));};'undefined'!==typeof window[_0x62bc('0x57')]['getOrderForm']?(_0x1a3db0(window['_QuatroDigital_DropDown'][_0x62bc('0x26')]),_0x62bc('0xa')===typeof _0x54c536&&_0x54c536(window[_0x62bc('0x57')][_0x62bc('0x26')])):_0xa61c39[_0x62bc('0x65')](['items','totalizers',_0x62bc('0x5b')],{'done':function(_0x2f63cd){_0x1a3db0[_0x62bc('0x28')](this,_0x2f63cd);'function'===typeof _0x54c536&&_0x54c536(_0x2f63cd);},'fail':function(_0x10d5c0){_0x425e64([_0x62bc('0xee'),_0x10d5c0]);}});}else alert(_0x62bc('0xef'));};_0x1243ab[_0x62bc('0xd2')]=function(){var _0x3b6a9b=_0xa61c39('.qd-ddc-wrapper');_0x3b6a9b['find'](_0x62bc('0xf0'))[_0x62bc('0x8')]?_0x3b6a9b['removeClass'](_0x62bc('0xf1')):_0x3b6a9b[_0x62bc('0x46')](_0x62bc('0xf1'));};_0x1243ab[_0x62bc('0xf2')]=function(_0x26709b){var _0x1a3db0=_0xa61c39(_0x62bc('0xf3'));_0x1a3db0[_0x62bc('0xf4')]();_0x1a3db0['each'](function(){var _0x1a3db0=_0xa61c39(this),_0x383fd5,_0x37a2f0,_0x5823cb=_0xa61c39(''),_0x4d63e1;for(_0x4d63e1 in window[_0x62bc('0x57')]['getOrderForm'][_0x62bc('0x3f')])if('object'===typeof window[_0x62bc('0x57')]['getOrderForm'][_0x62bc('0x3f')][_0x4d63e1]){var _0x285ea0=window[_0x62bc('0x57')]['getOrderForm']['items'][_0x4d63e1];var _0x34b5da=_0x285ea0[_0x62bc('0xf5')][_0x62bc('0x2')](/^\/|\/$/g,'')['split']('/');var _0x28ca61=_0xa61c39(_0x62bc('0xf6'));_0x28ca61[_0x62bc('0x95')]({'data-sku':_0x285ea0['id'],'data-sku-index':_0x4d63e1,'data-qd-departament':_0x34b5da[0x0],'data-qd-category':_0x34b5da[_0x34b5da['length']-0x1]});_0x28ca61[_0x62bc('0x46')](_0x62bc('0xf7')+_0x285ea0[_0x62bc('0xf8')]);_0x28ca61[_0x62bc('0x50')](_0x62bc('0xf9'))[_0x62bc('0x82')](_0x4c6f1f[_0x62bc('0xbe')](_0x285ea0));_0x28ca61[_0x62bc('0x50')](_0x62bc('0xfa'))['append'](isNaN(_0x285ea0['sellingPrice'])?_0x285ea0['sellingPrice']:0x0==_0x285ea0[_0x62bc('0xfb')]?'Grátis':(_0xa61c39(_0x62bc('0x34'))[_0x62bc('0x95')](_0x62bc('0x35'))||'R$')+'\x20'+qd_number_format(_0x285ea0[_0x62bc('0xfb')]/0x64,0x2,',','.'));_0x28ca61[_0x62bc('0x50')]('.qd-ddc-quantity')[_0x62bc('0x95')]({'data-sku':_0x285ea0['id'],'data-sku-index':_0x4d63e1})[_0x62bc('0xfc')](_0x285ea0[_0x62bc('0x40')]);_0x28ca61[_0x62bc('0x50')]('.qd-ddc-remove')[_0x62bc('0x95')]({'data-sku':_0x285ea0['id'],'data-sku-index':_0x4d63e1});_0x1243ab[_0x62bc('0xfd')](_0x285ea0['id'],_0x28ca61[_0x62bc('0x50')](_0x62bc('0xfe')),_0x285ea0[_0x62bc('0xff')]);_0x28ca61[_0x62bc('0x50')](_0x62bc('0x100'))[_0x62bc('0x95')]({'data-sku':_0x285ea0['id'],'data-sku-index':_0x4d63e1});_0x28ca61[_0x62bc('0x101')](_0x1a3db0);_0x5823cb=_0x5823cb[_0x62bc('0x67')](_0x28ca61);}try{var _0x129f07=_0x1a3db0[_0x62bc('0x0')]('.qd-ddc-wrapper')[_0x62bc('0x50')](_0x62bc('0xd0'));_0x129f07['length']&&''==_0x129f07[_0x62bc('0xfc')]()&&window['_QuatroDigital_DropDown'][_0x62bc('0x26')][_0x62bc('0x5b')]['address']&&_0x129f07[_0x62bc('0xfc')](window[_0x62bc('0x57')][_0x62bc('0x26')][_0x62bc('0x5b')]['address'][_0x62bc('0x102')]);}catch(_0x8e3195){_0x425e64(_0x62bc('0x103')+_0x8e3195['message'],'aviso');}_0x1243ab[_0x62bc('0x104')](_0x1a3db0);_0x1243ab['cartIsEmpty']();_0x26709b&&_0x26709b[_0x62bc('0x105')]&&function(){_0x37a2f0=_0x5823cb[_0x62bc('0x43')]('[data-sku=\x27'+_0x26709b[_0x62bc('0x105')]+'\x27]');_0x37a2f0[_0x62bc('0x8')]&&(_0x383fd5=0x0,_0x5823cb[_0x62bc('0x4e')](function(){var _0x26709b=_0xa61c39(this);if(_0x26709b['is'](_0x37a2f0))return!0x1;_0x383fd5+=_0x26709b['outerHeight']();}),_0x1243ab['scrollCart'](void 0x0,void 0x0,_0x383fd5,_0x1a3db0['add'](_0x1a3db0[_0x62bc('0xaa')]())),_0x5823cb[_0x62bc('0x48')](_0x62bc('0x106')),function(_0x2b1607){_0x2b1607['addClass'](_0x62bc('0x107'));_0x2b1607[_0x62bc('0x46')](_0x62bc('0x106'));setTimeout(function(){_0x2b1607[_0x62bc('0x48')](_0x62bc('0x107'));},_0x4c6f1f['timeRemoveNewItemClass']);}(_0x37a2f0));}();});(function(){_QuatroDigital_DropDown['getOrderForm'][_0x62bc('0x3f')][_0x62bc('0x8')]?(_0xa61c39(_0x62bc('0x71'))[_0x62bc('0x48')](_0x62bc('0x108'))[_0x62bc('0x46')](_0x62bc('0x109')),setTimeout(function(){_0xa61c39(_0x62bc('0x71'))[_0x62bc('0x48')](_0x62bc('0x10a'));},_0x4c6f1f[_0x62bc('0x8c')])):_0xa61c39(_0x62bc('0x71'))[_0x62bc('0x48')](_0x62bc('0x10b'))[_0x62bc('0x46')](_0x62bc('0x108'));}());_0x62bc('0xa')===typeof _0x4c6f1f[_0x62bc('0x10c')]?_0x4c6f1f[_0x62bc('0x10c')][_0x62bc('0x28')](this):_0x425e64(_0x62bc('0x10d'));};_0x1243ab[_0x62bc('0xfd')]=function(_0xd08d99,_0x4cb1bc,_0x241758){function _0x56171a(){_0x4cb1bc[_0x62bc('0x48')](_0x62bc('0x10e'))['load'](function(){_0xa61c39(this)[_0x62bc('0x46')](_0x62bc('0x10e'));})[_0x62bc('0x95')]('src',_0x241758);}_0x241758?_0x56171a():isNaN(_0xd08d99)?_0x425e64(_0x62bc('0x10f'),_0x62bc('0x6c')):alert(_0x62bc('0x110'));};_0x1243ab[_0x62bc('0x104')]=function(_0x7008d9){var _0x233c71=function(_0x31da12,_0x291cd7){var _0x1a3db0=_0xa61c39(_0x31da12);var _0x4b3c98=_0x1a3db0[_0x62bc('0x95')]('data-sku');var _0x383fd5=_0x1a3db0[_0x62bc('0x95')](_0x62bc('0x111'));if(_0x4b3c98){var _0x2538e4=parseInt(_0x1a3db0[_0x62bc('0xfc')]())||0x1;_0x1243ab[_0x62bc('0x112')]([_0x4b3c98,_0x383fd5],_0x2538e4,_0x2538e4+0x1,function(_0x5d2fea){_0x1a3db0[_0x62bc('0xfc')](_0x5d2fea);'function'===typeof _0x291cd7&&_0x291cd7();});}};var _0x1a3db0=function(_0x3d5153,_0x5e9af0){var _0x1a3db0=_0xa61c39(_0x3d5153);var _0x1f9fca=_0x1a3db0['attr'](_0x62bc('0x113'));var _0x383fd5=_0x1a3db0[_0x62bc('0x95')](_0x62bc('0x111'));if(_0x1f9fca){var _0xff650b=parseInt(_0x1a3db0[_0x62bc('0xfc')]())||0x2;_0x1243ab[_0x62bc('0x112')]([_0x1f9fca,_0x383fd5],_0xff650b,_0xff650b-0x1,function(_0x247c0a){_0x1a3db0['val'](_0x247c0a);'function'===typeof _0x5e9af0&&_0x5e9af0();});}};var _0x1852ff=function(_0x4ef9d1,_0x2329a6){var _0x1a3db0=_0xa61c39(_0x4ef9d1);var _0x17357e=_0x1a3db0[_0x62bc('0x95')](_0x62bc('0x113'));var _0x383fd5=_0x1a3db0[_0x62bc('0x95')](_0x62bc('0x111'));if(_0x17357e){var _0x34798d=parseInt(_0x1a3db0[_0x62bc('0xfc')]())||0x1;_0x1243ab['changeQantity']([_0x17357e,_0x383fd5],0x1,_0x34798d,function(_0x12d984){_0x1a3db0[_0x62bc('0xfc')](_0x12d984);_0x62bc('0xa')===typeof _0x2329a6&&_0x2329a6();});}};var _0x383fd5=_0x7008d9[_0x62bc('0x50')](_0x62bc('0x114'));_0x383fd5[_0x62bc('0x46')](_0x62bc('0x115'))[_0x62bc('0x4e')](function(){var _0x7008d9=_0xa61c39(this);_0x7008d9[_0x62bc('0x50')](_0x62bc('0x116'))['on'](_0x62bc('0x117'),function(_0x59dc95){_0x59dc95[_0x62bc('0x79')]();_0x383fd5[_0x62bc('0x46')]('qd-loading');_0x233c71(_0x7008d9[_0x62bc('0x50')](_0x62bc('0x118')),function(){_0x383fd5['removeClass']('qd-loading');});});_0x7008d9['find']('.qd-ddc-quantityMinus')['on'](_0x62bc('0x119'),function(_0x45020e){_0x45020e['preventDefault']();_0x383fd5[_0x62bc('0x46')](_0x62bc('0x11a'));_0x1a3db0(_0x7008d9[_0x62bc('0x50')](_0x62bc('0x118')),function(){_0x383fd5['removeClass'](_0x62bc('0x11a'));});});_0x7008d9['find'](_0x62bc('0x118'))['on'](_0x62bc('0x11b'),function(){_0x383fd5[_0x62bc('0x46')](_0x62bc('0x11a'));_0x1852ff(this,function(){_0x383fd5[_0x62bc('0x48')]('qd-loading');});});_0x7008d9[_0x62bc('0x50')](_0x62bc('0x118'))['on']('keyup.qd_ddc_change',function(_0x268912){0xd==_0x268912[_0x62bc('0xca')]&&(_0x383fd5['addClass'](_0x62bc('0x11a')),_0x1852ff(this,function(){_0x383fd5[_0x62bc('0x48')](_0x62bc('0x11a'));}));});});_0x7008d9[_0x62bc('0x50')](_0x62bc('0xf0'))[_0x62bc('0x4e')](function(){var _0x7008d9=_0xa61c39(this);_0x7008d9['find'](_0x62bc('0x11c'))['on']('click.qd_ddc_remove',function(){_0x7008d9[_0x62bc('0x46')](_0x62bc('0x11a'));_0x1243ab[_0x62bc('0x11d')](_0xa61c39(this),function(_0x2bc6f3){_0x2bc6f3?_0x7008d9[_0x62bc('0x11e')](!0x0)[_0x62bc('0x11f')](function(){_0x7008d9[_0x62bc('0x120')]();_0x1243ab['cartIsEmpty']();}):_0x7008d9[_0x62bc('0x48')](_0x62bc('0x11a'));});return!0x1;});});};_0x1243ab[_0x62bc('0x121')]=function(_0x214965){var _0x4bd12e=_0x214965[_0x62bc('0xfc')](),_0x4bd12e=_0x4bd12e[_0x62bc('0x2')](/[^0-9\-]/g,''),_0x4bd12e=_0x4bd12e[_0x62bc('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3'),_0x4bd12e=_0x4bd12e['replace'](/(.{9}).*/g,'$1');_0x214965[_0x62bc('0xfc')](_0x4bd12e);0x9<=_0x4bd12e[_0x62bc('0x8')]&&(_0x214965[_0x62bc('0x18')](_0x62bc('0x122'))!=_0x4bd12e&&_0x503d48[_0x62bc('0x123')]({'postalCode':_0x4bd12e,'country':_0x62bc('0x124')})[_0x62bc('0x1e')](function(_0x13e42f){window['_QuatroDigital_DropDown'][_0x62bc('0x26')]=_0x13e42f;_0x1243ab[_0x62bc('0x8e')]();})[_0x62bc('0x20')](function(_0x8791b7){_0x425e64(['Não\x20foi\x20possível\x20calcular\x20o\x20frete',_0x8791b7]);updateCartData();}),_0x214965[_0x62bc('0x18')](_0x62bc('0x122'),_0x4bd12e));};_0x1243ab[_0x62bc('0x112')]=function(_0xe26fdc,_0x5e0564,_0x447110,_0x89b46a){function _0xba038c(_0x4e325c){_0x4e325c='boolean'!==typeof _0x4e325c?!0x1:_0x4e325c;_0x1243ab[_0x62bc('0x8e')]();window[_0x62bc('0x57')][_0x62bc('0xb4')]=!0x1;_0x1243ab['cartIsEmpty']();'undefined'!==typeof window[_0x62bc('0xec')]&&_0x62bc('0xa')===typeof window[_0x62bc('0xec')][_0x62bc('0xed')]&&window[_0x62bc('0xec')]['exec']['call'](this);_0x62bc('0xa')===typeof adminCart&&adminCart();_0xa61c39['fn'][_0x62bc('0x2b')](!0x0,void 0x0,_0x4e325c);_0x62bc('0xa')===typeof _0x89b46a&&_0x89b46a(_0x5e0564);}_0x447110=_0x447110||0x1;if(0x1>_0x447110)return _0x5e0564;if(_0x4c6f1f[_0x62bc('0x56')]){if(_0x62bc('0x3')===typeof window[_0x62bc('0x57')]['getOrderForm'][_0x62bc('0x3f')][_0xe26fdc[0x1]])return _0x425e64('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0xe26fdc[0x1]+']'),_0x5e0564;window['_QuatroDigital_DropDown'][_0x62bc('0x26')][_0x62bc('0x3f')][_0xe26fdc[0x1]]['quantity']=_0x447110;window[_0x62bc('0x57')][_0x62bc('0x26')][_0x62bc('0x3f')][_0xe26fdc[0x1]][_0x62bc('0x125')]=_0xe26fdc[0x1];_0x503d48['updateItems']([window[_0x62bc('0x57')][_0x62bc('0x26')]['items'][_0xe26fdc[0x1]]],[_0x62bc('0x3f'),_0x62bc('0x39'),_0x62bc('0x5b')])[_0x62bc('0x1e')](function(_0x19c121){window[_0x62bc('0x57')]['getOrderForm']=_0x19c121;_0xba038c(!0x0);})[_0x62bc('0x20')](function(_0x271b72){_0x425e64(['Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho',_0x271b72]);_0xba038c();});}else _0x425e64(_0x62bc('0x126'));};_0x1243ab['removeProduct']=function(_0x42d201,_0x3a0e4f){function _0x1411b8(_0x198ad5){_0x198ad5='boolean'!==typeof _0x198ad5?!0x1:_0x198ad5;'undefined'!==typeof window[_0x62bc('0xec')]&&'function'===typeof window[_0x62bc('0xec')][_0x62bc('0xed')]&&window[_0x62bc('0xec')]['exec'][_0x62bc('0x28')](this);'function'===typeof adminCart&&adminCart();_0xa61c39['fn'][_0x62bc('0x2b')](!0x0,void 0x0,_0x198ad5);'function'===typeof _0x3a0e4f&&_0x3a0e4f(_0x383fd5);}var _0x383fd5=!0x1,_0x3b6929=_0xa61c39(_0x42d201)[_0x62bc('0x95')](_0x62bc('0x111'));if(_0x4c6f1f[_0x62bc('0x56')]){if(_0x62bc('0x3')===typeof window[_0x62bc('0x57')]['getOrderForm'][_0x62bc('0x3f')][_0x3b6929])return _0x425e64(_0x62bc('0x127')+_0x3b6929+']'),_0x383fd5;window[_0x62bc('0x57')]['getOrderForm'][_0x62bc('0x3f')][_0x3b6929]['index']=_0x3b6929;_0x503d48['removeItems']([window['_QuatroDigital_DropDown'][_0x62bc('0x26')][_0x62bc('0x3f')][_0x3b6929]],['items',_0x62bc('0x39'),_0x62bc('0x5b')])['done'](function(_0x29ab08){_0x383fd5=!0x0;window[_0x62bc('0x57')][_0x62bc('0x26')]=_0x29ab08;_0x2a0d60(_0x29ab08);_0x1411b8(!0x0);})[_0x62bc('0x20')](function(_0x3f5d84){_0x425e64([_0x62bc('0x128'),_0x3f5d84]);_0x1411b8();});}else alert(_0x62bc('0x129'));};_0x1243ab[_0x62bc('0xcd')]=function(_0x5d3da3,_0x195bdb,_0x565e4d,_0x3b03a8){_0x3b03a8=_0x3b03a8||_0xa61c39('.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2');_0x5d3da3=_0x5d3da3||'+';_0x195bdb=_0x195bdb||0.9*_0x3b03a8[_0x62bc('0x12a')]();_0x3b03a8['stop'](!0x0,!0x0)[_0x62bc('0x12b')]({'scrollTop':isNaN(_0x565e4d)?_0x5d3da3+'='+_0x195bdb+'px':_0x565e4d});};_0x4c6f1f['updateOnlyHover']||(_0x1243ab[_0x62bc('0x8e')](),_0xa61c39['fn'][_0x62bc('0x2b')](!0x0));_0xa61c39(window)['on']('productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex',function(){try{window['_QuatroDigital_DropDown'][_0x62bc('0x26')]=void 0x0,_0x1243ab[_0x62bc('0x8e')]();}catch(_0x5d67c6){_0x425e64(_0x62bc('0x12c')+_0x5d67c6[_0x62bc('0xb2')],'avisso');}});_0x62bc('0xa')===typeof _0x4c6f1f['callback']?_0x4c6f1f[_0x62bc('0x41')][_0x62bc('0x28')](this):_0x425e64(_0x62bc('0x12d'));};_0xa61c39['fn']['QD_dropDownCart']=function(_0x4078b4){var _0x469f4e=_0xa61c39(this);_0x469f4e['fn']=new _0xa61c39['QD_dropDownCart'](this,_0x4078b4);return _0x469f4e;};}catch(_0xdec289){_0x62bc('0x3')!==typeof console&&_0x62bc('0xa')===typeof console[_0x62bc('0x14')]&&console[_0x62bc('0x14')](_0x62bc('0x63'),_0xdec289);}}(this));(function(_0x2871dd){try{var _0x4fe09d=jQuery;window[_0x62bc('0xec')]=window[_0x62bc('0xec')]||{};window[_0x62bc('0xec')]['items']={};window['_QuatroDigital_AmountProduct']['allowRecalculate']=!0x1;window[_0x62bc('0xec')][_0x62bc('0x12e')]=!0x1;window[_0x62bc('0xec')]['quickViewUpdate']=!0x1;var _0x2ccfec=function(){if(window['_QuatroDigital_AmountProduct'][_0x62bc('0x12f')]){var _0x174afb=!0x1;var _0x2871dd={};window['_QuatroDigital_AmountProduct'][_0x62bc('0x3f')]={};for(_0x4dab9b in window[_0x62bc('0x57')][_0x62bc('0x26')][_0x62bc('0x3f')])if(_0x62bc('0x17')===typeof window[_0x62bc('0x57')][_0x62bc('0x26')][_0x62bc('0x3f')][_0x4dab9b]){var _0x4d213c=window[_0x62bc('0x57')]['getOrderForm'][_0x62bc('0x3f')][_0x4dab9b];_0x62bc('0x3')!==typeof _0x4d213c[_0x62bc('0x130')]&&null!==_0x4d213c[_0x62bc('0x130')]&&''!==_0x4d213c['productId']&&(window[_0x62bc('0xec')]['items'][_0x62bc('0x131')+_0x4d213c[_0x62bc('0x130')]]=window[_0x62bc('0xec')][_0x62bc('0x3f')][_0x62bc('0x131')+_0x4d213c[_0x62bc('0x130')]]||{},window['_QuatroDigital_AmountProduct'][_0x62bc('0x3f')][_0x62bc('0x131')+_0x4d213c[_0x62bc('0x130')]][_0x62bc('0x132')]=_0x4d213c[_0x62bc('0x130')],_0x2871dd[_0x62bc('0x131')+_0x4d213c[_0x62bc('0x130')]]||(window[_0x62bc('0xec')][_0x62bc('0x3f')][_0x62bc('0x131')+_0x4d213c[_0x62bc('0x130')]][_0x62bc('0x3d')]=0x0),window['_QuatroDigital_AmountProduct'][_0x62bc('0x3f')]['prod_'+_0x4d213c[_0x62bc('0x130')]][_0x62bc('0x3d')]+=_0x4d213c[_0x62bc('0x40')],_0x174afb=!0x0,_0x2871dd[_0x62bc('0x131')+_0x4d213c['productId']]=!0x0);}var _0x4dab9b=_0x174afb;}else _0x4dab9b=void 0x0;window['_QuatroDigital_AmountProduct'][_0x62bc('0x12f')]&&(_0x4fe09d('.qd-bap-wrapper')[_0x62bc('0x120')](),_0x4fe09d(_0x62bc('0x133'))[_0x62bc('0x48')]('qd-bap-item-added'));for(var _0x2c0a6a in window['_QuatroDigital_AmountProduct'][_0x62bc('0x3f')]){_0x4d213c=window[_0x62bc('0xec')][_0x62bc('0x3f')][_0x2c0a6a];if(_0x62bc('0x17')!==typeof _0x4d213c)return;_0x2871dd=_0x4fe09d(_0x62bc('0x134')+_0x4d213c[_0x62bc('0x132')]+']')[_0x62bc('0x0')]('li');if(window[_0x62bc('0xec')][_0x62bc('0x12f')]||!_0x2871dd[_0x62bc('0x50')](_0x62bc('0x135'))['length'])_0x174afb=_0x4fe09d(_0x62bc('0x136')),_0x174afb[_0x62bc('0x50')](_0x62bc('0x137'))[_0x62bc('0x4b')](_0x4d213c[_0x62bc('0x3d')]),_0x4d213c=_0x2871dd[_0x62bc('0x50')](_0x62bc('0x138')),_0x4d213c['length']?_0x4d213c[_0x62bc('0xac')](_0x174afb)[_0x62bc('0x46')](_0x62bc('0x139')):_0x2871dd[_0x62bc('0xac')](_0x174afb);}_0x4dab9b&&(window['_QuatroDigital_AmountProduct'][_0x62bc('0x12f')]=!0x1);};window[_0x62bc('0xec')][_0x62bc('0xed')]=function(){window[_0x62bc('0xec')][_0x62bc('0x12f')]=!0x0;_0x2ccfec['call'](this);};_0x4fe09d(document)[_0x62bc('0x13a')](function(){_0x2ccfec[_0x62bc('0x28')](this);});}catch(_0x16a00f){_0x62bc('0x3')!==typeof console&&_0x62bc('0xa')===typeof console[_0x62bc('0x14')]&&console[_0x62bc('0x14')]('Oooops!\x20',_0x16a00f);}}(this));(function(){try{var _0x5f2903=jQuery,_0x1b26ff,_0x38d248={'selector':'.qdDdcContainer','dropDown':{},'buyButton':{}};_0x5f2903[_0x62bc('0x13b')]=function(_0x562b2f){var _0x3d5cac={};_0x1b26ff=_0x5f2903[_0x62bc('0x16')](!0x0,{},_0x38d248,_0x562b2f);_0x562b2f=_0x5f2903(_0x1b26ff[_0x62bc('0x13c')])[_0x62bc('0xb5')](_0x1b26ff[_0x62bc('0x13d')]);_0x3d5cac[_0x62bc('0x7b')]=_0x62bc('0x3')!==typeof _0x1b26ff[_0x62bc('0x13d')][_0x62bc('0xd1')]&&!0x1===_0x1b26ff[_0x62bc('0x13d')]['updateOnlyHover']?_0x5f2903(_0x1b26ff[_0x62bc('0x13c')])[_0x62bc('0x74')](_0x562b2f['fn'],_0x1b26ff[_0x62bc('0x7b')]):_0x5f2903(_0x1b26ff['selector'])[_0x62bc('0x74')](_0x1b26ff['buyButton']);_0x3d5cac[_0x62bc('0x13d')]=_0x562b2f;return _0x3d5cac;};_0x5f2903['fn'][_0x62bc('0x13e')]=function(){_0x62bc('0x17')===typeof console&&_0x62bc('0xa')===typeof console[_0x62bc('0x2d')]&&console[_0x62bc('0x2d')](_0x62bc('0x13f'));};_0x5f2903[_0x62bc('0x13e')]=_0x5f2903['fn'][_0x62bc('0x13e')];}catch(_0x18f296){_0x62bc('0x3')!==typeof console&&'function'===typeof console[_0x62bc('0x14')]&&console[_0x62bc('0x14')](_0x62bc('0x63'),_0x18f296);}}());

/* Quatro Digital - Product Thumbs // Carlos Vinicius // Todos os direitos reservados. */
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs();a.trigger("QuatroDigital.pt_callback",[a])}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return a.length?$.extend({},a,new b(a)):a},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0x23bd=['animate','find','iframe','bind','click.removeVideo','removeAttr','removeClass','.qd-videoItem','call','/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27','\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','click.playVideo','.ON','controlVideo','.qd-playerWrapper\x20iframe','contentWindow','postMessage','attr','rel','a:not(.qd-videoLink)','click','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','insertThumbsIn','prependTo','appendTo','trigger','ajaxStop','load','ImageControl','.qd-videoLink','body','.produto','object','undefined','alerta','toLowerCase','warn','error','qdVideoInProduct','extend','start','http','ul.thumbs','div#image','videoFieldSelector','text','replace','split','length','indexOf','youtube','pop','shift','youtu.be','push','be/','<div\x20class=\x22qd-playerWrapper\x22></div>','#include','<div\x20class=\x22qd-playerContainer\x22></div>','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','join','toUpperCase','ite','---','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','html','<iframe\x20src=\x22','urlProtocol','data','height','fadeTo','addClass','qdpv-video-on','stop','add'];(function(_0x2f45ea,_0x15c656){var _0x485a84=function(_0x4a1fe3){while(--_0x4a1fe3){_0x2f45ea['push'](_0x2f45ea['shift']());}};_0x485a84(++_0x15c656);}(_0x23bd,0x19f));var _0xd23b=function(_0x51272f,_0x40b67c){_0x51272f=_0x51272f-0x0;var _0x3ce31b=_0x23bd[_0x51272f];return _0x3ce31b;};(function(_0x1387b7){$(function(){if($(document[_0xd23b('0x0')])['is'](_0xd23b('0x1'))){var _0x39344c=[];var _0x52970d=function(_0x43b62c,_0x2c2a58){_0xd23b('0x2')===typeof console&&(_0xd23b('0x3')!==typeof _0x2c2a58&&_0xd23b('0x4')===_0x2c2a58[_0xd23b('0x5')]()?console[_0xd23b('0x6')]('[Video\x20in\x20product]\x20'+_0x43b62c):'undefined'!==typeof _0x2c2a58&&'info'===_0x2c2a58[_0xd23b('0x5')]()?console['info']('[Video\x20in\x20product]\x20'+_0x43b62c):console[_0xd23b('0x7')]('[Video\x20in\x20product]\x20'+_0x43b62c));};window[_0xd23b('0x8')]=window['qdVideoInProduct']||{};var _0x2129e0=$[_0xd23b('0x9')](!0x0,{'insertThumbsIn':_0xd23b('0xa'),'videoFieldSelector':'td.value-field.Videos:first','controlVideo':!0x0,'urlProtocol':_0xd23b('0xb')},window['qdVideoInProduct']);var _0xc5dfcd=$(_0xd23b('0xc'));var _0x467805=$(_0xd23b('0xd'));var _0x409a1c=$(_0x2129e0[_0xd23b('0xe')])[_0xd23b('0xf')]()[_0xd23b('0x10')](/\;\s*/,';')[_0xd23b('0x11')](';');for(var _0x410bc0=0x0;_0x410bc0<_0x409a1c[_0xd23b('0x12')];_0x410bc0++)-0x1<_0x409a1c[_0x410bc0][_0xd23b('0x13')](_0xd23b('0x14'))?_0x39344c['push'](_0x409a1c[_0x410bc0][_0xd23b('0x11')]('v=')[_0xd23b('0x15')]()['split'](/[&#]/)[_0xd23b('0x16')]()):-0x1<_0x409a1c[_0x410bc0][_0xd23b('0x13')](_0xd23b('0x17'))&&_0x39344c[_0xd23b('0x18')](_0x409a1c[_0x410bc0][_0xd23b('0x11')](_0xd23b('0x19'))['pop']()[_0xd23b('0x11')](/[\?&#]/)[_0xd23b('0x16')]());var _0x53c985=$(_0xd23b('0x1a'));_0x53c985['prependTo'](_0xd23b('0x1b'));_0x53c985['wrap'](_0xd23b('0x1c'));_0x409a1c=function(_0x4056e3){var _0x334392={'t':_0xd23b('0x1d')};return function(_0x14f354){var _0x15a080=function(_0x4d8fb7){return _0x4d8fb7;};var _0x820b1d=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x14f354=_0x14f354['d'+_0x820b1d[0x10]+'c'+_0x820b1d[0x11]+'m'+_0x15a080(_0x820b1d[0x1])+'n'+_0x820b1d[0xd]]['l'+_0x820b1d[0x12]+'c'+_0x820b1d[0x0]+'ti'+_0x15a080('o')+'n'];var _0xbbe407=function(_0x57a5a8){return escape(encodeURIComponent(_0x57a5a8[_0xd23b('0x10')](/\./g,'¨')[_0xd23b('0x10')](/[a-zA-Z]/g,function(_0x4650a3){return String['fromCharCode'](('Z'>=_0x4650a3?0x5a:0x7a)>=(_0x4650a3=_0x4650a3[_0xd23b('0x1e')](0x0)+0xd)?_0x4650a3:_0x4650a3-0x1a);})));};var _0x5475b5=_0xbbe407(_0x14f354[[_0x820b1d[0x9],_0x15a080('o'),_0x820b1d[0xc],_0x820b1d[_0x15a080(0xd)]][_0xd23b('0x1f')]('')]);_0xbbe407=_0xbbe407((window[['js',_0x15a080('no'),'m',_0x820b1d[0x1],_0x820b1d[0x4][_0xd23b('0x20')](),_0xd23b('0x21')][_0xd23b('0x1f')]('')]||_0xd23b('0x22'))+['.v',_0x820b1d[0xd],'e',_0x15a080('x'),'co',_0x15a080('mm'),'erc',_0x820b1d[0x1],'.c',_0x15a080('o'),'m.',_0x820b1d[0x13],'r'][_0xd23b('0x1f')](''));for(var _0x2165ed in _0x334392){if(_0xbbe407===_0x2165ed+_0x334392[_0x2165ed]||_0x5475b5===_0x2165ed+_0x334392[_0x2165ed]){var _0x3b00cf='tr'+_0x820b1d[0x11]+'e';break;}_0x3b00cf='f'+_0x820b1d[0x0]+'ls'+_0x15a080(_0x820b1d[0x1])+'';}_0x15a080=!0x1;-0x1<_0x14f354[[_0x820b1d[0xc],'e',_0x820b1d[0x0],'rc',_0x820b1d[0x9]][_0xd23b('0x1f')]('')]['indexOf'](_0xd23b('0x23'))&&(_0x15a080=!0x0);return[_0x3b00cf,_0x15a080];}(_0x4056e3);}(window);if(!eval(_0x409a1c[0x0]))return _0x409a1c[0x1]?_0x52970d(_0xd23b('0x24')):!0x1;var _0xc99c4e=function(_0x488a67,_0xe38973){_0xd23b('0x14')===_0xe38973&&_0x53c985[_0xd23b('0x25')](_0xd23b('0x26')+_0x2129e0[_0xd23b('0x27')]+'://www.youtube.com/embed/'+_0x488a67+'?wmode=transparent&rel=0&enablejsapi=1\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>');_0x467805['data']('height',_0x467805[_0xd23b('0x28')](_0xd23b('0x29'))||_0x467805[_0xd23b('0x29')]());_0x467805['stop'](!0x0,!0x0)[_0xd23b('0x2a')](0x1f4,0x0,function(){$('body')[_0xd23b('0x2b')](_0xd23b('0x2c'));});_0x53c985[_0xd23b('0x2d')](!0x0,!0x0)['fadeTo'](0x1f4,0x1,function(){_0x467805[_0xd23b('0x2e')](_0x53c985)[_0xd23b('0x2f')]({'height':_0x53c985[_0xd23b('0x30')](_0xd23b('0x31'))[_0xd23b('0x29')]()},0x2bc);});};removePlayer=function(){_0xc5dfcd[_0xd23b('0x30')]('a:not(\x27.qd-videoLink\x27)')[_0xd23b('0x32')](_0xd23b('0x33'),function(){_0x53c985['stop'](!0x0,!0x0)[_0xd23b('0x2a')](0x1f4,0x0,function(){$(this)['hide']()[_0xd23b('0x34')]('style');$(_0xd23b('0x0'))[_0xd23b('0x35')](_0xd23b('0x2c'));});_0x467805['stop'](!0x0,!0x0)[_0xd23b('0x2a')](0x1f4,0x1,function(){var _0x152f38=_0x467805['data'](_0xd23b('0x29'));_0x152f38&&_0x467805['animate']({'height':_0x152f38},0x2bc);});});};var _0xb385a7=function(){if(!_0xc5dfcd[_0xd23b('0x30')](_0xd23b('0x36'))[_0xd23b('0x12')])for(vId in removePlayer[_0xd23b('0x37')](this),_0x39344c)if('string'===typeof _0x39344c[vId]&&''!==_0x39344c[vId]){var _0x46e477=$('<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/'+_0x39344c[vId]+_0xd23b('0x38')+_0x39344c[vId]+_0xd23b('0x39')+_0x39344c[vId]+'/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>');_0x46e477[_0xd23b('0x30')]('a')[_0xd23b('0x32')](_0xd23b('0x3a'),function(){var _0x4a5dd5=$(this);_0xc5dfcd[_0xd23b('0x30')](_0xd23b('0x3b'))[_0xd23b('0x35')]('ON');_0x4a5dd5[_0xd23b('0x2b')]('ON');0x1==_0x2129e0[_0xd23b('0x3c')]?$(_0xd23b('0x3d'))['length']?(_0xc99c4e[_0xd23b('0x37')](this,'',''),$(_0xd23b('0x3d'))[0x0][_0xd23b('0x3e')][_0xd23b('0x3f')]('{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','*')):_0xc99c4e[_0xd23b('0x37')](this,_0x4a5dd5[_0xd23b('0x40')](_0xd23b('0x41')),_0xd23b('0x14')):_0xc99c4e[_0xd23b('0x37')](this,_0x4a5dd5[_0xd23b('0x40')](_0xd23b('0x41')),_0xd23b('0x14'));return!0x1;});0x1==_0x2129e0[_0xd23b('0x3c')]&&_0xc5dfcd[_0xd23b('0x30')](_0xd23b('0x42'))[_0xd23b('0x43')](function(_0x1c36a8){$('.qd-playerWrapper\x20iframe')['length']&&$(_0xd23b('0x3d'))[0x0]['contentWindow']['postMessage'](_0xd23b('0x44'),'*');});_0xd23b('0xa')===_0x2129e0[_0xd23b('0x45')]?_0x46e477[_0xd23b('0x46')](_0xc5dfcd):_0x46e477[_0xd23b('0x47')](_0xc5dfcd);_0x46e477[_0xd23b('0x48')]('QuatroDigital.pv_video_added',[_0x39344c[vId],_0x46e477]);}};$(document)[_0xd23b('0x49')](_0xb385a7);$(window)[_0xd23b('0x4a')](_0xb385a7);(function(){var _0x1ff4bc=this;var _0x3588b1=window[_0xd23b('0x4b')]||function(){};window[_0xd23b('0x4b')]=function(_0x3b2c2a,_0x183e20){$(_0x3b2c2a||'')['is'](_0xd23b('0x4c'))||(_0x3588b1[_0xd23b('0x37')](this,_0x3b2c2a,_0x183e20),_0xb385a7['call'](_0x1ff4bc));};}());}});}(this));

/* Quatro Digital - Mosaic Banners // Carlos Vinicius // Todos os direitos reservados */
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

