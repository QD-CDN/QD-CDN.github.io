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
			Common.bodyDataQDScrollT();
			Common.showHideMenuFloat();
		},
		ajaxStop: function() {
			Common.appendSkuPopUpCloseBtn();
			// Common.applySmartPrice();
		},
		windowOnload: function() {
			Common.facebookLikebox();
			Common.saveAmountFix();
		},
		showHideMenuFloat: function(){
			$('.header-qd-v1-float-menu-trigger').click(function(){
				console.log("asdkjl");
				$('.header-qd-v1-amazing-menu-wrapper.float-bar').toggleClass('qd-nav-float-on');
			});
		},
		bodyDataQDScrollT: function() {
			$(document.body).attr('data-qd-scroll-limit', '145');
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
			Search.hideExtendedMenu();
			Search.openFiltersMenu();
			Search.shelfLineFix();			
		},
		ajaxStop: function() {
			Search.shelfLineFix();						
		},
		windowOnload: function() {
			Search.shelfLineFix();						
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
var _0x1b3d=['.qd_sp_display_installments','.qd_sp_display_installmentValue','.qd_sp_installments','.qd_saveAmount','prepend','changeNativeSaveAmount','each','skuSelected.vtex','qd_sp_processedItem','startedByWrapper','flagElement','call','forcePromotion','string','.qd_productPrice:not(.qd_sp_processedItem)','style','append','after','extend','function','trim','prototype','replace','abs','undefined','toFixed','split','length','join','QD_SmartPrice','Smart\x20Price','object','error','info','warn','alerta','toLowerCase','aviso','apply','text','.flag','auto','label.skuBestInstallmentNumber','label.skuBestInstallmentValue','strong.skuPrice','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','erc','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','productPage','isProductPage','wrapperElement','closest','filterFlagBy','find','addClass','qd-active','qd-sp-active','.qd_sp_on,\x20.qd_sp_ignored','skuBestPrice','.qd_active','removeClass','oneFlagByItem','siblings','.qd_sp_on','qd_sp_ignored','qd_sp_on','isDiscountFlag','div[skuCorrente]:first','attr','skus','sku','available','bestPrice','qd-sp-product-unavailable','.qd_productPrice','val','Por\x20alguma\x20razão\x20não\x20consegui\x20obter\x20o\x20preço\x20deste\x20produto\x20:(','appliedDiscount','listPrice','.qd_displayPrice','skuPrice','.qd-sp-display-discount','html','installments','installmentValue'];(function(_0x3dd15e,_0x1f0015){var _0x231fd0=function(_0x4f680a){while(--_0x4f680a){_0x3dd15e['push'](_0x3dd15e['shift']());}};_0x231fd0(++_0x1f0015);}(_0x1b3d,0xc5));var _0xd1b3=function(_0x4d963c,_0x4f58b1){_0x4d963c=_0x4d963c-0x0;var _0x421604=_0x1b3d[_0x4d963c];return _0x421604;};_0xd1b3('0x0')!==typeof String['prototype'][_0xd1b3('0x1')]&&(String[_0xd1b3('0x2')][_0xd1b3('0x1')]=function(){return this[_0xd1b3('0x3')](/^\s+|\s+$/g,'');});function qd_number_format(_0x3c5abd,_0x66e5ee,_0x44fb03,_0x4edb16){_0x3c5abd=(_0x3c5abd+'')[_0xd1b3('0x3')](/[^0-9+\-Ee.]/g,'');_0x3c5abd=isFinite(+_0x3c5abd)?+_0x3c5abd:0x0;_0x66e5ee=isFinite(+_0x66e5ee)?Math[_0xd1b3('0x4')](_0x66e5ee):0x0;_0x4edb16=_0xd1b3('0x5')===typeof _0x4edb16?',':_0x4edb16;_0x44fb03=_0xd1b3('0x5')===typeof _0x44fb03?'.':_0x44fb03;var _0x57298d='',_0x57298d=function(_0x358004,_0x78f290){var _0x66e5ee=Math['pow'](0xa,_0x78f290);return''+(Math['round'](_0x358004*_0x66e5ee)/_0x66e5ee)[_0xd1b3('0x6')](_0x78f290);},_0x57298d=(_0x66e5ee?_0x57298d(_0x3c5abd,_0x66e5ee):''+Math['round'](_0x3c5abd))[_0xd1b3('0x7')]('.');0x3<_0x57298d[0x0]['length']&&(_0x57298d[0x0]=_0x57298d[0x0][_0xd1b3('0x3')](/\B(?=(?:\d{3})+(?!\d))/g,_0x4edb16));(_0x57298d[0x1]||'')['length']<_0x66e5ee&&(_0x57298d[0x1]=_0x57298d[0x1]||'',_0x57298d[0x1]+=Array(_0x66e5ee-_0x57298d[0x1][_0xd1b3('0x8')]+0x1)[_0xd1b3('0x9')]('0'));return _0x57298d['join'](_0x44fb03);};(function(_0x42c3ea){'use strict';var _0x28634a=jQuery;if(typeof _0x28634a['fn'][_0xd1b3('0xa')]==='function')return;var _0x1d4b55=_0xd1b3('0xb');var _0xf146f6=function(_0x2da388,_0x24a3c1){if(_0xd1b3('0xc')===typeof console&&'function'===typeof console[_0xd1b3('0xd')]&&'function'===typeof console[_0xd1b3('0xe')]&&_0xd1b3('0x0')===typeof console[_0xd1b3('0xf')]){var _0x1c3c47;'object'===typeof _0x2da388?(_0x2da388['unshift']('['+_0x1d4b55+']\x0a'),_0x1c3c47=_0x2da388):_0x1c3c47=['['+_0x1d4b55+']\x0a'+_0x2da388];if('undefined'===typeof _0x24a3c1||_0xd1b3('0x10')!==_0x24a3c1[_0xd1b3('0x11')]()&&_0xd1b3('0x12')!==_0x24a3c1[_0xd1b3('0x11')]())if('undefined'!==typeof _0x24a3c1&&_0xd1b3('0xe')===_0x24a3c1['toLowerCase']())try{console[_0xd1b3('0xe')][_0xd1b3('0x13')](console,_0x1c3c47);}catch(_0x2eef38){console[_0xd1b3('0xe')](_0x1c3c47['join']('\x0a'));}else try{console['error'][_0xd1b3('0x13')](console,_0x1c3c47);}catch(_0x1f3f00){console['error'](_0x1c3c47[_0xd1b3('0x9')]('\x0a'));}else try{console[_0xd1b3('0xf')][_0xd1b3('0x13')](console,_0x1c3c47);}catch(_0xfc778d){console[_0xd1b3('0xf')](_0x1c3c47['join']('\x0a'));}}};var _0x345a22=/[0-9]+\%/i;var _0x111d1b=/[0-9\.]+(?=\%)/i;var _0x33b230={'isDiscountFlag':function(_0x3f4cc3){if(_0x3f4cc3[_0xd1b3('0x14')]()['search'](_0x345a22)>-0x1)return!![];return![];},'getDiscountValue':function(_0x1aea6b){return _0x1aea6b[_0xd1b3('0x14')]()['match'](_0x111d1b);},'startedByWrapper':![],'flagElement':_0xd1b3('0x15'),'wrapperElement':'li','filterFlagBy':'[class*=\x27desconto\x27]','forcePromotion':null,'appliedDiscount':null,'oneFlagByItem':!![],'isSmartCheckout':!![],'changeInstallments':![],'productPage':{'changeNativeSaveAmount':!![],'changeNativePrice':!![],'changeInstallments':![],'isProductPage':_0xd1b3('0x16'),'wrapperElement':'.productRightColumn','skuBestPrice':'strong.skuBestPrice','installments':_0xd1b3('0x17'),'installmentValue':_0xd1b3('0x18'),'skuPrice':_0xd1b3('0x19')}};_0x28634a['fn'][_0xd1b3('0xa')]=function(){};var _0x5a91b2=function(_0x1863d0){var _0x45ed1f={'t':_0xd1b3('0x1a')};return function(_0x2ebd7a){var _0x242dfb,_0xd7255f,_0x13ae06,_0x176427;_0xd7255f=function(_0x3439b1){return _0x3439b1;};_0x13ae06=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2ebd7a=_0x2ebd7a['d'+_0x13ae06[0x10]+'c'+_0x13ae06[0x11]+'m'+_0xd7255f(_0x13ae06[0x1])+'n'+_0x13ae06[0xd]]['l'+_0x13ae06[0x12]+'c'+_0x13ae06[0x0]+'ti'+_0xd7255f('o')+'n'];_0x242dfb=function(_0x27f9ef){return escape(encodeURIComponent(_0x27f9ef['replace'](/\./g,'¨')[_0xd1b3('0x3')](/[a-zA-Z]/g,function(_0x44a606){return String[_0xd1b3('0x1b')](('Z'>=_0x44a606?0x5a:0x7a)>=(_0x44a606=_0x44a606[_0xd1b3('0x1c')](0x0)+0xd)?_0x44a606:_0x44a606-0x1a);})));};var _0x1d9254=_0x242dfb(_0x2ebd7a[[_0x13ae06[0x9],_0xd7255f('o'),_0x13ae06[0xc],_0x13ae06[_0xd7255f(0xd)]][_0xd1b3('0x9')]('')]);_0x242dfb=_0x242dfb((window[['js',_0xd7255f('no'),'m',_0x13ae06[0x1],_0x13ae06[0x4][_0xd1b3('0x1d')](),_0xd1b3('0x1e')][_0xd1b3('0x9')]('')]||'---')+['.v',_0x13ae06[0xd],'e',_0xd7255f('x'),'co',_0xd7255f('mm'),_0xd1b3('0x1f'),_0x13ae06[0x1],'.c',_0xd7255f('o'),'m.',_0x13ae06[0x13],'r']['join'](''));for(var _0x1d2d12 in _0x45ed1f){if(_0x242dfb===_0x1d2d12+_0x45ed1f[_0x1d2d12]||_0x1d9254===_0x1d2d12+_0x45ed1f[_0x1d2d12]){_0x176427='tr'+_0x13ae06[0x11]+'e';break;}_0x176427='f'+_0x13ae06[0x0]+'ls'+_0xd7255f(_0x13ae06[0x1])+'';}_0xd7255f=!0x1;-0x1<_0x2ebd7a[[_0x13ae06[0xc],'e',_0x13ae06[0x0],'rc',_0x13ae06[0x9]][_0xd1b3('0x9')]('')]['indexOf']('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0xd7255f=!0x0);return[_0x176427,_0xd7255f];}(_0x1863d0);}(window);if(!eval(_0x5a91b2[0x0]))return _0x5a91b2[0x1]?_0xf146f6(_0xd1b3('0x20')):!0x1;var _0x510da8=function(_0x419db5,_0x5b5632){'use strict';var _0x50255b=function(_0x4782d2){'use strict';var _0x295106,_0x11a659,_0x167a2a,_0x443952,_0x2280d5,_0x1eb0b4,_0x5b2285,_0x36a58f,_0x141995,_0x497a2c,_0xb5f793,_0x2a5447,_0xe87c9f,_0x25dc50,_0x304885,_0x281e94,_0x32b26b,_0x10fac3,_0xa6eec3;var _0x467b5f=_0x28634a(this);_0x4782d2=typeof _0x4782d2===_0xd1b3('0x5')?![]:_0x4782d2;if(_0x5b5632[_0xd1b3('0x21')][_0xd1b3('0x22')])var _0x421f5b=_0x467b5f['closest'](_0x5b5632[_0xd1b3('0x21')][_0xd1b3('0x23')]);else var _0x421f5b=_0x467b5f[_0xd1b3('0x24')](_0x5b5632[_0xd1b3('0x23')]);if(!_0x4782d2&&!_0x467b5f['is'](_0x5b5632[_0xd1b3('0x25')])){if(_0x5b5632['productPage']['isProductPage']&&_0x421f5b['is'](_0x5b5632[_0xd1b3('0x21')][_0xd1b3('0x23')])){_0x421f5b[_0xd1b3('0x26')](_0x5b5632[_0xd1b3('0x21')]['skuBestPrice'])[_0xd1b3('0x27')](_0xd1b3('0x28'));_0x421f5b[_0xd1b3('0x27')](_0xd1b3('0x29'));}return;}var _0x5248c0=_0x5b5632[_0xd1b3('0x21')][_0xd1b3('0x22')];if(_0x467b5f['is'](_0xd1b3('0x2a'))&&!_0x5248c0)return;if(_0x5248c0){_0x36a58f=_0x421f5b['find'](_0x5b5632[_0xd1b3('0x21')][_0xd1b3('0x2b')]);if(_0x36a58f[_0xd1b3('0x26')](_0xd1b3('0x2c'))[_0xd1b3('0x8')])return;_0x36a58f[_0xd1b3('0x2d')]('qd-active');_0x421f5b['removeClass'](_0xd1b3('0x29'));}if(_0x5b5632[_0xd1b3('0x2e')]&&_0x467b5f[_0xd1b3('0x2f')](_0xd1b3('0x30'))[_0xd1b3('0x8')]){_0x467b5f[_0xd1b3('0x27')](_0xd1b3('0x31'));return;}_0x467b5f[_0xd1b3('0x27')](_0xd1b3('0x32'));if(!_0x5b5632[_0xd1b3('0x33')](_0x467b5f))return;if(_0x5248c0){_0x167a2a={};var _0x2a9e70=parseInt(_0x28634a(_0xd1b3('0x34'))[_0xd1b3('0x35')]('skuCorrente'),0xa);if(_0x2a9e70){for(var _0x5b5efa=0x0;_0x5b5efa<skuJson[_0xd1b3('0x36')]['length'];_0x5b5efa++){if(skuJson[_0xd1b3('0x36')][_0x5b5efa][_0xd1b3('0x37')]==_0x2a9e70){_0x167a2a=skuJson[_0xd1b3('0x36')][_0x5b5efa];break;}}}else{var _0x4d6964=0x5af3107a3fff;for(var _0x19eb79 in skuJson[_0xd1b3('0x36')]){if(typeof skuJson['skus'][_0x19eb79]===_0xd1b3('0x0'))continue;if(!skuJson['skus'][_0x19eb79][_0xd1b3('0x38')])continue;if(skuJson[_0xd1b3('0x36')][_0x19eb79]['bestPrice']<_0x4d6964){_0x4d6964=skuJson[_0xd1b3('0x36')][_0x19eb79][_0xd1b3('0x39')];_0x167a2a=skuJson['skus'][_0x19eb79];}}}}_0x281e94=!![];_0x32b26b=0x0;if(_0x5b5632['isSmartCheckout']&&_0x10fac3){_0x281e94=skuJson[_0xd1b3('0x38')];if(!_0x281e94)return _0x421f5b[_0xd1b3('0x27')](_0xd1b3('0x3a'));}_0x11a659=_0x5b5632['getDiscountValue'](_0x467b5f);_0x295106=parseFloat(_0x11a659,0xa);if(isNaN(_0x295106))return _0xf146f6(['O\x20valor\x20informado\x20p/\x20o\x20desconto\x20não\x20é\x20um\x20número.',_0x467b5f],'alerta');var _0x30fa7b=function(_0x560009){if(_0x5248c0)_0x443952=(_0x560009[_0xd1b3('0x39')]||0x0)/0x64;else{_0xe87c9f=_0x421f5b[_0xd1b3('0x26')](_0xd1b3('0x3b'));_0x443952=parseFloat((_0xe87c9f[_0xd1b3('0x3c')]()||'')[_0xd1b3('0x3')](/[^0-9\.\,]+/i,'')['replace']('.','')[_0xd1b3('0x3')](',','.'),0xa);}if(isNaN(_0x443952))return _0xf146f6([_0xd1b3('0x3d'),_0x467b5f,_0x421f5b]);if(_0x5b5632[_0xd1b3('0x3e')]!==null){_0x25dc50=0x0;if(!isNaN(_0x5b5632[_0xd1b3('0x3e')]))_0x25dc50=_0x5b5632[_0xd1b3('0x3e')];else{_0x304885=_0x421f5b[_0xd1b3('0x26')](_0x5b5632[_0xd1b3('0x3e')]);if(_0x304885['length'])_0x25dc50=_0x5b5632['getDiscountValue'](_0x304885);}_0x25dc50=parseFloat(_0x25dc50,0xa);if(isNaN(_0x25dc50))_0x25dc50=0x0;if(_0x25dc50!==0x0)_0x443952=_0x443952*0x64/(0x64-_0x25dc50);}if(_0x5248c0)_0x2280d5=(_0x560009[_0xd1b3('0x3f')]||0x0)/0x64;else _0x2280d5=parseFloat((_0x421f5b[_0xd1b3('0x26')]('.qd_productOldPrice')[_0xd1b3('0x3c')]()||'')[_0xd1b3('0x3')](/[^0-9\.\,]+/i,'')['replace']('.','')[_0xd1b3('0x3')](',','.'),0xa);if(isNaN(_0x2280d5))_0x2280d5=0.001;_0x1eb0b4=_0x443952*((0x64-_0x295106)/0x64);if(_0x5248c0&&_0x5b5632['productPage']['changeNativePrice']){_0x36a58f[_0xd1b3('0x14')](_0x36a58f['text']()[_0xd1b3('0x1')]()['replace'](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x1eb0b4,0x2,',','.')))['addClass']('qd-active');_0x421f5b[_0xd1b3('0x27')](_0xd1b3('0x29'));}else{_0xa6eec3=_0x421f5b[_0xd1b3('0x26')](_0xd1b3('0x40'));_0xa6eec3[_0xd1b3('0x14')](_0xa6eec3[_0xd1b3('0x14')]()['replace'](/[0-9\.]+,[0-9]+/i,'')+qd_number_format(_0x1eb0b4,0x2,',','.'));}if(_0x5248c0){_0x5b2285=_0x421f5b['find'](_0x5b5632[_0xd1b3('0x21')][_0xd1b3('0x41')]);if(_0x5b2285[_0xd1b3('0x8')])_0x5b2285[_0xd1b3('0x14')](_0x5b2285[_0xd1b3('0x14')]()['trim']()[_0xd1b3('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x1eb0b4,0x2,',','.')));}var _0xbfdb78=_0x421f5b['find'](_0xd1b3('0x42'));_0xbfdb78[_0xd1b3('0x14')](_0xbfdb78[_0xd1b3('0x14')]()[_0xd1b3('0x3')](/[0-9]+\%/i,_0x295106+'%'));var _0x3cf0f0=function(_0x5a31d,_0x15d9c2,_0x5866cf){var _0xda3fe1=_0x421f5b['find'](_0x5a31d);if(_0xda3fe1[_0xd1b3('0x8')])_0xda3fe1['html'](_0xda3fe1[_0xd1b3('0x43')]()['trim']()[_0xd1b3('0x3')](/[0-9]{1,2}/,_0x5866cf?_0x5866cf:_0x560009['installments']||0x0));var _0x4f043f=_0x421f5b[_0xd1b3('0x26')](_0x15d9c2);if(_0x4f043f[_0xd1b3('0x8')])_0x4f043f[_0xd1b3('0x43')](_0x4f043f[_0xd1b3('0x43')]()[_0xd1b3('0x1')]()[_0xd1b3('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x1eb0b4/(_0x5866cf?_0x5866cf:_0x560009[_0xd1b3('0x44')]||0x1),0x2,',','.')));};if(_0x5248c0&&_0x5b5632[_0xd1b3('0x21')]['changeInstallments'])_0x3cf0f0(_0x5b5632['productPage']['installments'],_0x5b5632['productPage'][_0xd1b3('0x45')]);else if(_0x5b5632['changeInstallments'])_0x3cf0f0(_0xd1b3('0x46'),_0xd1b3('0x47'),parseInt(_0x421f5b[_0xd1b3('0x26')](_0xd1b3('0x48'))[_0xd1b3('0x3c')]()||0x1)||0x1);_0x421f5b[_0xd1b3('0x26')](_0xd1b3('0x49'))['append'](qd_number_format(_0x2280d5-_0x1eb0b4,0x2,',','.'));_0x421f5b['find']('.qd_saveAmountPercent')[_0xd1b3('0x4a')](qd_number_format((_0x2280d5-_0x1eb0b4)*0x64/_0x2280d5,0x2,',','.'));if(_0x5248c0&&_0x5b5632[_0xd1b3('0x21')][_0xd1b3('0x4b')]){_0x28634a('em.economia-de')[_0xd1b3('0x4c')](function(){_0xb5f793=_0x28634a(this);_0xb5f793[_0xd1b3('0x14')](_0xb5f793['text']()['trim']()[_0xd1b3('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x2280d5-_0x1eb0b4,0x2,',','.')));_0xb5f793['addClass'](_0xd1b3('0x28'));});}};_0x30fa7b(_0x167a2a);if(_0x5248c0)_0x28634a(window)['on'](_0xd1b3('0x4d'),function(_0x14d924,_0x5a7ec1,_0x1670d2){_0x30fa7b(_0x1670d2);});_0x421f5b['addClass'](_0xd1b3('0x4e'));if(!_0x5248c0)_0xe87c9f[_0xd1b3('0x27')]('qd_sp_processedItem');};(_0x5b5632[_0xd1b3('0x4f')]?_0x419db5[_0xd1b3('0x26')](_0x5b5632[_0xd1b3('0x50')]):_0x419db5)[_0xd1b3('0x4c')](function(){_0x50255b[_0xd1b3('0x51')](this,![]);});if(typeof _0x5b5632[_0xd1b3('0x52')]==_0xd1b3('0x53')){var _0x1d2758=_0x5b5632[_0xd1b3('0x4f')]?_0x419db5:_0x419db5['closest'](_0x5b5632[_0xd1b3('0x23')]);if(_0x5b5632[_0xd1b3('0x21')][_0xd1b3('0x22')])_0x1d2758=_0x1d2758[_0xd1b3('0x24')](_0x5b5632[_0xd1b3('0x21')][_0xd1b3('0x23')])['not']('.qd_sp_processedItem');else _0x1d2758=_0x1d2758[_0xd1b3('0x26')](_0xd1b3('0x54'));_0x1d2758[_0xd1b3('0x4c')](function(){var _0x2d16dd=_0x28634a(_0x5b5632[_0xd1b3('0x52')]);_0x2d16dd[_0xd1b3('0x35')](_0xd1b3('0x55'),'display:none\x20!important;');if(_0x5b5632['productPage'][_0xd1b3('0x22')])_0x28634a(this)[_0xd1b3('0x56')](_0x2d16dd);else _0x28634a(this)[_0xd1b3('0x57')](_0x2d16dd);_0x50255b[_0xd1b3('0x51')](_0x2d16dd,!![]);});}};_0x28634a['fn'][_0xd1b3('0xa')]=function(_0x5630ff){var _0x4f2c1c=_0x28634a(this);if(!_0x4f2c1c[_0xd1b3('0x8')])return _0x4f2c1c;var _0x2140b7=_0x28634a[_0xd1b3('0x58')](!![],{},_0x33b230,_0x5630ff);if(typeof _0x2140b7['productPage'][_0xd1b3('0x22')]!='boolean')_0x2140b7['productPage'][_0xd1b3('0x22')]=_0x28634a(document['body'])['is']('.produto');_0x510da8(_0x4f2c1c,_0x2140b7);return _0x4f2c1c;};}(this));
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
var _0xe74a=['qd-am-collection-wrapper','qdAjax','url','html','img[alt=\x27','data-qdam-value','clone','qd-am-content-loaded','text','trim','attr','[class*=\x27colunas\x27]','insertBefore','\x27\x20falho.','ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','children','qd-am-elem-','>li','qd-amazing-menu','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','add','qd-am-','-li','callback','extend','exec','.qd_amazing_menu_auto','getParent','function','QD_amazingMenu','/qd-amazing-menu','undefined','error','info','warn','object','alerta','toLowerCase','aviso','apply','join','qdAmAddNdx','each','first','addClass','last','qd-am-last','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','.qd-am-banner','filter','.qd-am-collection','length','parent'];(function(_0x37bd26,_0x5ad346){var _0xe83dc4=function(_0x1ac229){while(--_0x1ac229){_0x37bd26['push'](_0x37bd26['shift']());}};_0xe83dc4(++_0x5ad346);}(_0xe74a,0xb9));var _0xae74=function(_0x1bf611,_0x5a169b){_0x1bf611=_0x1bf611-0x0;var _0x46c450=_0xe74a[_0x1bf611];return _0x46c450;};(function(_0x1f2569){_0x1f2569['fn'][_0xae74('0x0')]=_0x1f2569['fn']['closest'];}(jQuery));(function(_0x13d7b8){var _0x1cdaff;var _0x8d70d8=jQuery;if(_0xae74('0x1')!==typeof _0x8d70d8['fn'][_0xae74('0x2')]){var _0x52bb8d={'url':_0xae74('0x3'),'callback':function(){},'ajaxCallback':function(){}};var _0x2f20b5=function(_0x37491e,_0x4a90f2){if('object'===typeof console&&_0xae74('0x4')!==typeof console[_0xae74('0x5')]&&_0xae74('0x4')!==typeof console[_0xae74('0x6')]&&_0xae74('0x4')!==typeof console[_0xae74('0x7')]){var _0x1ab104;_0xae74('0x8')===typeof _0x37491e?(_0x37491e['unshift']('[QD\x20Amazing\x20Menu]\x0a'),_0x1ab104=_0x37491e):_0x1ab104=['[QD\x20Amazing\x20Menu]\x0a'+_0x37491e];if(_0xae74('0x4')===typeof _0x4a90f2||_0xae74('0x9')!==_0x4a90f2[_0xae74('0xa')]()&&_0xae74('0xb')!==_0x4a90f2[_0xae74('0xa')]())if(_0xae74('0x4')!==typeof _0x4a90f2&&'info'===_0x4a90f2[_0xae74('0xa')]())try{console[_0xae74('0x6')][_0xae74('0xc')](console,_0x1ab104);}catch(_0x165371){try{console[_0xae74('0x6')](_0x1ab104[_0xae74('0xd')]('\x0a'));}catch(_0x9b1dcf){}}else try{console[_0xae74('0x5')]['apply'](console,_0x1ab104);}catch(_0x554a8b){try{console[_0xae74('0x5')](_0x1ab104[_0xae74('0xd')]('\x0a'));}catch(_0xdc37fe){}}else try{console[_0xae74('0x7')]['apply'](console,_0x1ab104);}catch(_0x16b469){try{console[_0xae74('0x7')](_0x1ab104['join']('\x0a'));}catch(_0x352322){}}}};_0x8d70d8['fn'][_0xae74('0xe')]=function(){var _0x592073=_0x8d70d8(this);_0x592073[_0xae74('0xf')](function(_0x1f91e4){_0x8d70d8(this)['addClass']('qd-am-li-'+_0x1f91e4);});_0x592073[_0xae74('0x10')]()[_0xae74('0x11')]('qd-am-first');_0x592073[_0xae74('0x12')]()[_0xae74('0x11')](_0xae74('0x13'));return _0x592073;};_0x8d70d8['fn'][_0xae74('0x2')]=function(){};_0x13d7b8=function(_0x21642d){var _0x2c2e34={'t':_0xae74('0x14')};return function(_0x5bd3f9){var _0x455b2e=function(_0x4bad71){return _0x4bad71;};var _0x23acb8=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5bd3f9=_0x5bd3f9['d'+_0x23acb8[0x10]+'c'+_0x23acb8[0x11]+'m'+_0x455b2e(_0x23acb8[0x1])+'n'+_0x23acb8[0xd]]['l'+_0x23acb8[0x12]+'c'+_0x23acb8[0x0]+'ti'+_0x455b2e('o')+'n'];var _0x1d8b84=function(_0x4db510){return escape(encodeURIComponent(_0x4db510[_0xae74('0x15')](/\./g,'¨')[_0xae74('0x15')](/[a-zA-Z]/g,function(_0x22f1dc){return String[_0xae74('0x16')](('Z'>=_0x22f1dc?0x5a:0x7a)>=(_0x22f1dc=_0x22f1dc[_0xae74('0x17')](0x0)+0xd)?_0x22f1dc:_0x22f1dc-0x1a);})));};var _0x2341fe=_0x1d8b84(_0x5bd3f9[[_0x23acb8[0x9],_0x455b2e('o'),_0x23acb8[0xc],_0x23acb8[_0x455b2e(0xd)]]['join']('')]);_0x1d8b84=_0x1d8b84((window[['js',_0x455b2e('no'),'m',_0x23acb8[0x1],_0x23acb8[0x4]['toUpperCase'](),_0xae74('0x18')][_0xae74('0xd')]('')]||_0xae74('0x19'))+['.v',_0x23acb8[0xd],'e',_0x455b2e('x'),'co',_0x455b2e('mm'),_0xae74('0x1a'),_0x23acb8[0x1],'.c',_0x455b2e('o'),'m.',_0x23acb8[0x13],'r'][_0xae74('0xd')](''));for(var _0x28d409 in _0x2c2e34){if(_0x1d8b84===_0x28d409+_0x2c2e34[_0x28d409]||_0x2341fe===_0x28d409+_0x2c2e34[_0x28d409]){var _0x29a1bc='tr'+_0x23acb8[0x11]+'e';break;}_0x29a1bc='f'+_0x23acb8[0x0]+'ls'+_0x455b2e(_0x23acb8[0x1])+'';}_0x455b2e=!0x1;-0x1<_0x5bd3f9[[_0x23acb8[0xc],'e',_0x23acb8[0x0],'rc',_0x23acb8[0x9]][_0xae74('0xd')]('')][_0xae74('0x1b')](_0xae74('0x1c'))&&(_0x455b2e=!0x0);return[_0x29a1bc,_0x455b2e];}(_0x21642d);}(window);if(!eval(_0x13d7b8[0x0]))return _0x13d7b8[0x1]?_0x2f20b5(_0xae74('0x1d')):!0x1;var _0x162c1c=function(_0x1cc397){var _0x5de828=_0x1cc397[_0xae74('0x1e')](_0xae74('0x1f'));var _0x49f48e=_0x5de828['filter'](_0xae74('0x20'));var _0x1938fe=_0x5de828[_0xae74('0x21')](_0xae74('0x22'));if(_0x49f48e[_0xae74('0x23')]||_0x1938fe[_0xae74('0x23')])_0x49f48e[_0xae74('0x24')]()['addClass']('qd-am-banner-wrapper'),_0x1938fe[_0xae74('0x24')]()[_0xae74('0x11')](_0xae74('0x25')),_0x8d70d8[_0xae74('0x26')]({'url':_0x1cdaff[_0xae74('0x27')],'dataType':_0xae74('0x28'),'success':function(_0x2ca90c){var _0x2de3c9=_0x8d70d8(_0x2ca90c);_0x49f48e[_0xae74('0xf')](function(){var _0x2ca90c=_0x8d70d8(this);var _0x476940=_0x2de3c9[_0xae74('0x1e')](_0xae74('0x29')+_0x2ca90c['attr'](_0xae74('0x2a'))+'\x27]');_0x476940[_0xae74('0x23')]&&(_0x476940['each'](function(){_0x8d70d8(this)['getParent']('.box-banner')[_0xae74('0x2b')]()['insertBefore'](_0x2ca90c);}),_0x2ca90c['hide']());})['addClass'](_0xae74('0x2c'));_0x1938fe[_0xae74('0xf')](function(){var _0x2ca90c={};var _0x460f80=_0x8d70d8(this);_0x2de3c9[_0xae74('0x1e')]('h2')[_0xae74('0xf')](function(){if(_0x8d70d8(this)[_0xae74('0x2d')]()[_0xae74('0x2e')]()[_0xae74('0xa')]()==_0x460f80[_0xae74('0x2f')](_0xae74('0x2a'))[_0xae74('0x2e')]()[_0xae74('0xa')]())return _0x2ca90c=_0x8d70d8(this),!0x1;});_0x2ca90c['length']&&(_0x2ca90c[_0xae74('0xf')](function(){_0x8d70d8(this)['getParent'](_0xae74('0x30'))[_0xae74('0x2b')]()[_0xae74('0x31')](_0x460f80);}),_0x460f80['hide']());})['addClass'](_0xae74('0x2c'));},'error':function(){_0x2f20b5('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27'+_0x1cdaff[_0xae74('0x27')]+_0xae74('0x32'));},'complete':function(){_0x1cdaff[_0xae74('0x33')][_0xae74('0x34')](this);_0x8d70d8(window)[_0xae74('0x35')](_0xae74('0x36'),_0x1cc397);},'clearQueueDelay':0xbb8});};_0x8d70d8[_0xae74('0x2')]=function(_0x3b6d2e){var _0x10f20a=_0x3b6d2e['find']('ul[itemscope]')['each'](function(){var _0x259aea=_0x8d70d8(this);if(!_0x259aea[_0xae74('0x23')])return _0x2f20b5([_0xae74('0x37'),_0x3b6d2e],_0xae74('0x9'));_0x259aea[_0xae74('0x1e')](_0xae74('0x38'))[_0xae74('0x24')]()[_0xae74('0x11')](_0xae74('0x39'));_0x259aea['find']('li')[_0xae74('0xf')](function(){var _0x170b13=_0x8d70d8(this);var _0x24ce44=_0x170b13[_0xae74('0x3a')](':not(ul)');_0x24ce44['length']&&_0x170b13['addClass'](_0xae74('0x3b')+_0x24ce44[_0xae74('0x10')]()[_0xae74('0x2d')]()[_0xae74('0x2e')]()['replaceSpecialChars']()[_0xae74('0x15')](/\./g,'')[_0xae74('0x15')](/\s/g,'-')[_0xae74('0xa')]());});var _0x316934=_0x259aea[_0xae74('0x1e')](_0xae74('0x3c'))[_0xae74('0xe')]();_0x259aea['addClass'](_0xae74('0x3d'));_0x316934=_0x316934[_0xae74('0x1e')](_0xae74('0x3e'));_0x316934[_0xae74('0xf')](function(){var _0x186552=_0x8d70d8(this);_0x186552[_0xae74('0x1e')](_0xae74('0x3c'))[_0xae74('0xe')]()[_0xae74('0x11')](_0xae74('0x3f'));_0x186552[_0xae74('0x11')](_0xae74('0x40'));_0x186552['parent']()[_0xae74('0x11')](_0xae74('0x41'));});_0x316934[_0xae74('0x11')](_0xae74('0x41'));var _0x20543d=0x0,_0x13d7b8=function(_0x45faa9){_0x20543d+=0x1;_0x45faa9=_0x45faa9['children']('li')[_0xae74('0x3a')]('*');_0x45faa9[_0xae74('0x23')]&&(_0x45faa9[_0xae74('0x11')](_0xae74('0x42')+_0x20543d),_0x13d7b8(_0x45faa9));};_0x13d7b8(_0x259aea);_0x259aea[_0xae74('0x43')](_0x259aea['find']('ul'))['each'](function(){var _0x49071b=_0x8d70d8(this);_0x49071b[_0xae74('0x11')](_0xae74('0x44')+_0x49071b[_0xae74('0x3a')]('li')[_0xae74('0x23')]+_0xae74('0x45'));});});_0x162c1c(_0x10f20a);_0x1cdaff[_0xae74('0x46')][_0xae74('0x34')](this);_0x8d70d8(window)[_0xae74('0x35')]('QuatroDigital.am.callback',_0x3b6d2e);};_0x8d70d8['fn'][_0xae74('0x2')]=function(_0x55dd9e){var _0xf4cf5d=_0x8d70d8(this);if(!_0xf4cf5d[_0xae74('0x23')])return _0xf4cf5d;_0x1cdaff=_0x8d70d8[_0xae74('0x47')]({},_0x52bb8d,_0x55dd9e);_0xf4cf5d[_0xae74('0x48')]=new _0x8d70d8[(_0xae74('0x2'))](_0x8d70d8(this));return _0xf4cf5d;};_0x8d70d8(function(){_0x8d70d8(_0xae74('0x49'))['QD_amazingMenu']();});}}(this));

/* Quatro Digital Smart Cart */
var _0x5178=['callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','keyup.qd_ddc_change','.qd-ddc-prodRow','.qd-ddc-remove','click.qd_ddc_remove','removeProduct','stop','remove','$1-$2$3','qdDdcLastPostalCode','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','animate','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','.qd_bap_wrapper_content','prepend','QD_smartCart','dropDown','smartCart','getParent','closest','abs','undefined','pow','toFixed','length','replace','join','function','prototype','trim','capitalize','toUpperCase','slice','toLowerCase','qdAjax','qdAjaxQueue','jquery','000','error','extend','GET','object','data','toString','url','type','jqXHR','ajax','done','success','complete','always','message','version','4.0','simpleCart','checkout','getOrderForm','call','QuatroDigital_simpleCart','ajaxStopOn','alerta','[Simple\x20Cart]\x0a','warn','info','add','QD_simpleCart','elements','.qd_cart_total','.qd_items_text','meta[name=currency]','attr','content','each','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','value','total','shipping','currencySymbol','allTotal','qtt','showQuantityByItems','items','callback','fire','.singular','show','filter','addClass','qd-emptyCart','$this','O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','html','cartQttE','itemsTextE','find','cartQtt','cartTotalE','cartTotal','itemsText','emptyElem','qd-sc-populated','smartCheckout','_QuatroDigital_DropDown','vtexjs','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','QD_checkoutQueue','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','trigger','simpleCartCallback.quatro_digital','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','.qd_cart_auto','bind','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','Oooops!\x20','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','fail','Callbacks','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','apply','.productInformationWrapper\x20\x20a.buy-button','input.buy-in-page-quantity','body','.productQuickView','Produto\x20adicionado\x20ao\x20carrinho!','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','location','href','#produto,\x20.produto','QD_buyButton','isSmartCheckout','qd-bb-click-active','click.qd_bb_buy_sc','allowBuyClick','clickBuySmartCheckout','preventDefault','buyButton','.qd-sbb-on','qd-sbb-on','.btn-add-buy-button-asynchronous','.remove-href','qd-bb-active','children','.qd-bb-productAdded','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','prodAdd','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','[href=\x27','removeClass','qd-bb-itemAddCartWrapper','getCartInfoByUrl','função\x20descontinuada','autoWatchBuyButton','unbind','click','mouseenter.qd_bb_buy_sc','load','indexOf','selectSkuMsg','?redirect=false&','queue','buyIfQuantityZeroed','test','productPageCallback','pop','asyncCallback','cartProductAdded.vtex','fakeRequest','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','Callback\x20não\x20é\x20uma\x20função','.qd-bb-itemAddWrapper','QuatroDigital.qd_bb_prod_add','ajaxSend','/checkout/cart/add','match','ajaxStop','round','split','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','aviso','allowUpdate','QD_dropDownCart','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','name','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','qd-bb-lightBoxProdAdd','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollDown','scrollCart','.qd-ddc-shipping\x20input','val','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','mouseleave.qd_ddc_hover','texts','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','emptyCart','cartContainer','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','.qd-ddc-infoAllTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','cartIsEmpty','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','productCategoryIds','availability','.qd-ddc-prodPrice','sellingPrice','Grátis','.qd-ddc-quantity','quantity','insertProdImg','.qd-ddc-image','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','[data-sku=\x27','outerHeight','qd-ddc-lastAdded','qd-ddc-lastAddedFixed','qd-ddc-cart-empty','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList'];(function(_0x1e91cb,_0x209e6f){var _0x442a01=function(_0x309d84){while(--_0x309d84){_0x1e91cb['push'](_0x1e91cb['shift']());}};_0x442a01(++_0x209e6f);}(_0x5178,0x171));var _0x8517=function(_0x6131cd,_0x4c26a1){_0x6131cd=_0x6131cd-0x0;var _0x47e916=_0x5178[_0x6131cd];return _0x47e916;};(function(_0x5dd6d6){_0x5dd6d6['fn'][_0x8517('0x0')]=_0x5dd6d6['fn'][_0x8517('0x1')];}(jQuery));function qd_number_format(_0x27662b,_0x2dc28f,_0x38d5b3,_0x5e0a44){_0x27662b=(_0x27662b+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x27662b=isFinite(+_0x27662b)?+_0x27662b:0x0;_0x2dc28f=isFinite(+_0x2dc28f)?Math[_0x8517('0x2')](_0x2dc28f):0x0;_0x5e0a44=_0x8517('0x3')===typeof _0x5e0a44?',':_0x5e0a44;_0x38d5b3='undefined'===typeof _0x38d5b3?'.':_0x38d5b3;var _0x13ba05='',_0x13ba05=function(_0x45498e,_0x3615b2){var _0x2dc28f=Math[_0x8517('0x4')](0xa,_0x3615b2);return''+(Math['round'](_0x45498e*_0x2dc28f)/_0x2dc28f)[_0x8517('0x5')](_0x3615b2);},_0x13ba05=(_0x2dc28f?_0x13ba05(_0x27662b,_0x2dc28f):''+Math['round'](_0x27662b))['split']('.');0x3<_0x13ba05[0x0][_0x8517('0x6')]&&(_0x13ba05[0x0]=_0x13ba05[0x0][_0x8517('0x7')](/\B(?=(?:\d{3})+(?!\d))/g,_0x5e0a44));(_0x13ba05[0x1]||'')['length']<_0x2dc28f&&(_0x13ba05[0x1]=_0x13ba05[0x1]||'',_0x13ba05[0x1]+=Array(_0x2dc28f-_0x13ba05[0x1][_0x8517('0x6')]+0x1)[_0x8517('0x8')]('0'));return _0x13ba05[_0x8517('0x8')](_0x38d5b3);};_0x8517('0x9')!==typeof String[_0x8517('0xa')][_0x8517('0xb')]&&(String[_0x8517('0xa')][_0x8517('0xb')]=function(){return this['replace'](/^\s+|\s+$/g,'');});_0x8517('0x9')!=typeof String[_0x8517('0xa')][_0x8517('0xc')]&&(String[_0x8517('0xa')][_0x8517('0xc')]=function(){return this['charAt'](0x0)[_0x8517('0xd')]()+this[_0x8517('0xe')](0x1)[_0x8517('0xf')]();});(function(_0x100280){if(_0x8517('0x9')!==typeof _0x100280[_0x8517('0x10')]){var _0x260a15={};_0x100280[_0x8517('0x11')]=_0x260a15;0x96>parseInt((_0x100280['fn'][_0x8517('0x12')][_0x8517('0x7')](/[^0-9]+/g,'')+_0x8517('0x13'))[_0x8517('0xe')](0x0,0x3),0xa)&&console&&'function'==typeof console[_0x8517('0x14')]&&console[_0x8517('0x14')]();_0x100280[_0x8517('0x10')]=function(_0xf1b53b){try{var _0x64875e=_0x100280[_0x8517('0x15')]({},{'url':'','type':_0x8517('0x16'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0xf1b53b);var _0x5b5408=_0x8517('0x17')===typeof _0x64875e['data']?JSON['stringify'](_0x64875e[_0x8517('0x18')]):_0x64875e[_0x8517('0x18')][_0x8517('0x19')]();var _0x180d8d=encodeURIComponent(_0x64875e[_0x8517('0x1a')]+'|'+_0x64875e[_0x8517('0x1b')]+'|'+_0x5b5408);_0x260a15[_0x180d8d]=_0x260a15[_0x180d8d]||{};'undefined'==typeof _0x260a15[_0x180d8d]['jqXHR']?_0x260a15[_0x180d8d][_0x8517('0x1c')]=_0x100280[_0x8517('0x1d')](_0x64875e):(_0x260a15[_0x180d8d][_0x8517('0x1c')][_0x8517('0x1e')](_0x64875e[_0x8517('0x1f')]),_0x260a15[_0x180d8d][_0x8517('0x1c')]['fail'](_0x64875e[_0x8517('0x14')]),_0x260a15[_0x180d8d][_0x8517('0x1c')]['always'](_0x64875e[_0x8517('0x20')]));_0x260a15[_0x180d8d][_0x8517('0x1c')][_0x8517('0x21')](function(){isNaN(parseInt(_0x64875e['clearQueueDelay']))||setTimeout(function(){_0x260a15[_0x180d8d][_0x8517('0x1c')]=void 0x0;},_0x64875e['clearQueueDelay']);});return _0x260a15[_0x180d8d][_0x8517('0x1c')];}catch(_0x2a2b7e){_0x8517('0x3')!==typeof console&&_0x8517('0x9')===typeof console[_0x8517('0x14')]&&console[_0x8517('0x14')]('Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20'+_0x2a2b7e[_0x8517('0x22')]);}};_0x100280['qdAjax'][_0x8517('0x23')]=_0x8517('0x24');}}(jQuery));(function(_0x243fda){_0x243fda['fn'][_0x8517('0x0')]=_0x243fda['fn'][_0x8517('0x1')];}(jQuery));(function(){var _0x1b2423=jQuery;if('function'!==typeof _0x1b2423['fn'][_0x8517('0x25')]){_0x1b2423(function(){var _0x53bed9=vtexjs[_0x8517('0x26')][_0x8517('0x27')];vtexjs[_0x8517('0x26')][_0x8517('0x27')]=function(){return _0x53bed9[_0x8517('0x28')]();};});try{window[_0x8517('0x29')]=window[_0x8517('0x29')]||{};window[_0x8517('0x29')][_0x8517('0x2a')]=!0x1;_0x1b2423['fn']['simpleCart']=function(_0x3e8f81,_0x1031b3,_0x773e3c){var _0x53c009=function(_0x5db173,_0x5cb78c){if(_0x8517('0x17')===typeof console){var _0x4102b4=_0x8517('0x17')===typeof _0x5db173;_0x8517('0x3')!==typeof _0x5cb78c&&_0x8517('0x2b')===_0x5cb78c[_0x8517('0xf')]()?_0x4102b4?console['warn'](_0x8517('0x2c'),_0x5db173[0x0],_0x5db173[0x1],_0x5db173[0x2],_0x5db173[0x3],_0x5db173[0x4],_0x5db173[0x5],_0x5db173[0x6],_0x5db173[0x7]):console[_0x8517('0x2d')](_0x8517('0x2c')+_0x5db173):'undefined'!==typeof _0x5cb78c&&_0x8517('0x2e')===_0x5cb78c['toLowerCase']()?_0x4102b4?console[_0x8517('0x2e')](_0x8517('0x2c'),_0x5db173[0x0],_0x5db173[0x1],_0x5db173[0x2],_0x5db173[0x3],_0x5db173[0x4],_0x5db173[0x5],_0x5db173[0x6],_0x5db173[0x7]):console['info']('[Simple\x20Cart]\x0a'+_0x5db173):_0x4102b4?console[_0x8517('0x14')](_0x8517('0x2c'),_0x5db173[0x0],_0x5db173[0x1],_0x5db173[0x2],_0x5db173[0x3],_0x5db173[0x4],_0x5db173[0x5],_0x5db173[0x6],_0x5db173[0x7]):console[_0x8517('0x14')](_0x8517('0x2c')+_0x5db173);}};var _0x4f93bd=_0x1b2423(this);'object'===typeof _0x3e8f81?_0x1031b3=_0x3e8f81:(_0x3e8f81=_0x3e8f81||!0x1,_0x4f93bd=_0x4f93bd[_0x8517('0x2f')](_0x1b2423[_0x8517('0x30')][_0x8517('0x31')]));if(!_0x4f93bd['length'])return _0x4f93bd;_0x1b2423[_0x8517('0x30')][_0x8517('0x31')]=_0x1b2423['QD_simpleCart'][_0x8517('0x31')][_0x8517('0x2f')](_0x4f93bd);_0x773e3c=_0x8517('0x3')===typeof _0x773e3c?!0x1:_0x773e3c;var _0x29fa73={'cartQtt':'.qd_cart_qtt','cartTotal':_0x8517('0x32'),'itemsText':_0x8517('0x33'),'currencySymbol':(_0x1b2423(_0x8517('0x34'))[_0x8517('0x35')](_0x8517('0x36'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x22592a=_0x1b2423[_0x8517('0x15')]({},_0x29fa73,_0x1031b3);var _0x136d67=_0x1b2423('');_0x4f93bd[_0x8517('0x37')](function(){var _0x183310=_0x1b2423(this);_0x183310[_0x8517('0x18')](_0x8517('0x38'))||_0x183310[_0x8517('0x18')]('qd_simpleCartOpts',_0x22592a);});var _0x51c54e=function(_0x3f1219){window[_0x8517('0x39')]=window[_0x8517('0x39')]||{};for(var _0x3e8f81=0x0,_0x1d1f28=0x0,_0x4ddd77=0x0;_0x4ddd77<_0x3f1219[_0x8517('0x3a')][_0x8517('0x6')];_0x4ddd77++)'Shipping'==_0x3f1219[_0x8517('0x3a')][_0x4ddd77]['id']&&(_0x1d1f28+=_0x3f1219[_0x8517('0x3a')][_0x4ddd77][_0x8517('0x3b')]),_0x3e8f81+=_0x3f1219[_0x8517('0x3a')][_0x4ddd77]['value'];window[_0x8517('0x39')][_0x8517('0x3c')]=_0x22592a['currencySymbol']+qd_number_format(_0x3e8f81/0x64,0x2,',','.');window[_0x8517('0x39')][_0x8517('0x3d')]=_0x22592a[_0x8517('0x3e')]+qd_number_format(_0x1d1f28/0x64,0x2,',','.');window['_QuatroDigital_CartData'][_0x8517('0x3f')]=_0x22592a[_0x8517('0x3e')]+qd_number_format((_0x3e8f81+_0x1d1f28)/0x64,0x2,',','.');window[_0x8517('0x39')][_0x8517('0x40')]=0x0;if(_0x22592a[_0x8517('0x41')])for(_0x4ddd77=0x0;_0x4ddd77<_0x3f1219[_0x8517('0x42')][_0x8517('0x6')];_0x4ddd77++)window['_QuatroDigital_CartData'][_0x8517('0x40')]+=_0x3f1219[_0x8517('0x42')][_0x4ddd77]['quantity'];else window[_0x8517('0x39')][_0x8517('0x40')]=_0x3f1219[_0x8517('0x42')][_0x8517('0x6')]||0x0;try{window[_0x8517('0x39')][_0x8517('0x43')]&&window['_QuatroDigital_CartData'][_0x8517('0x43')][_0x8517('0x44')]&&window[_0x8517('0x39')]['callback'][_0x8517('0x44')]();}catch(_0x197480){_0x53c009('Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart');}_0x2d604f(_0x136d67);};var _0x10ed6a=function(_0x1d81c1,_0x4c7815){0x1===_0x1d81c1?_0x4c7815['hide']()['filter'](_0x8517('0x45'))[_0x8517('0x46')]():_0x4c7815['hide']()[_0x8517('0x47')]('.plural')['show']();};var _0x691afe=function(_0x2eae3f){0x1>_0x2eae3f?_0x4f93bd[_0x8517('0x48')](_0x8517('0x49')):_0x4f93bd['removeClass'](_0x8517('0x49'));};var _0x10eae9=function(_0x1048a6,_0x5a6812){var _0x15102f=parseInt(window[_0x8517('0x39')][_0x8517('0x40')],0xa);_0x5a6812[_0x8517('0x4a')][_0x8517('0x46')]();isNaN(_0x15102f)&&(_0x53c009(_0x8517('0x4b'),_0x8517('0x2b')),_0x15102f=0x0);_0x5a6812['cartTotalE'][_0x8517('0x4c')](window['_QuatroDigital_CartData']['total']);_0x5a6812[_0x8517('0x4d')][_0x8517('0x4c')](_0x15102f);_0x10ed6a(_0x15102f,_0x5a6812[_0x8517('0x4e')]);_0x691afe(_0x15102f);};var _0x2d604f=function(_0x56e27e){_0x4f93bd[_0x8517('0x37')](function(){var _0x2da857={};var _0x4c1703=_0x1b2423(this);_0x3e8f81&&_0x4c1703['data'](_0x8517('0x38'))&&_0x1b2423[_0x8517('0x15')](_0x22592a,_0x4c1703[_0x8517('0x18')]('qd_simpleCartOpts'));_0x2da857[_0x8517('0x4a')]=_0x4c1703;_0x2da857['cartQttE']=_0x4c1703[_0x8517('0x4f')](_0x22592a[_0x8517('0x50')])||_0x136d67;_0x2da857[_0x8517('0x51')]=_0x4c1703[_0x8517('0x4f')](_0x22592a[_0x8517('0x52')])||_0x136d67;_0x2da857[_0x8517('0x4e')]=_0x4c1703[_0x8517('0x4f')](_0x22592a[_0x8517('0x53')])||_0x136d67;_0x2da857[_0x8517('0x54')]=_0x4c1703['find'](_0x22592a['emptyCart'])||_0x136d67;_0x10eae9(_0x56e27e,_0x2da857);_0x4c1703[_0x8517('0x48')](_0x8517('0x55'));});};(function(){if(_0x22592a[_0x8517('0x56')]){window['_QuatroDigital_DropDown']=window[_0x8517('0x57')]||{};if(_0x8517('0x3')!==typeof window[_0x8517('0x57')]['getOrderForm']&&(_0x773e3c||!_0x3e8f81))return _0x51c54e(window['_QuatroDigital_DropDown'][_0x8517('0x27')]);if(_0x8517('0x17')!==typeof window[_0x8517('0x58')]||_0x8517('0x3')===typeof window[_0x8517('0x58')][_0x8517('0x26')])if(_0x8517('0x17')===typeof vtex&&_0x8517('0x17')===typeof vtex[_0x8517('0x26')]&&_0x8517('0x3')!==typeof vtex[_0x8517('0x26')][_0x8517('0x59')])new vtex[(_0x8517('0x26'))][(_0x8517('0x59'))]();else return _0x53c009(_0x8517('0x5a'));_0x1b2423[_0x8517('0x5b')](['items',_0x8517('0x3a'),_0x8517('0x5c')],{'done':function(_0x190995){_0x51c54e(_0x190995);window[_0x8517('0x57')][_0x8517('0x27')]=_0x190995;},'fail':function(_0x2ed642){_0x53c009([_0x8517('0x5d'),_0x2ed642]);}});}else alert('Esta\x20é\x20uma\x20função\x20descontinuada\x20=/');}());_0x22592a[_0x8517('0x43')]();_0x1b2423(window)[_0x8517('0x5e')](_0x8517('0x5f'));return _0x4f93bd;};_0x1b2423[_0x8517('0x30')]={'elements':_0x1b2423('')};_0x1b2423(function(){var _0x4240d0;'function'===typeof window[_0x8517('0x60')]&&(_0x4240d0=window['ajaxRequestbuyButtonAsynchronous'],window[_0x8517('0x60')]=function(_0x2305dd,_0x4147cf,_0x320dc4,_0x2351a9,_0x56b659){_0x4240d0[_0x8517('0x28')](this,_0x2305dd,_0x4147cf,_0x320dc4,_0x2351a9,function(){_0x8517('0x9')===typeof _0x56b659&&_0x56b659();_0x1b2423[_0x8517('0x30')][_0x8517('0x31')]['each'](function(){var _0x4f4b32=_0x1b2423(this);_0x4f4b32[_0x8517('0x25')](_0x4f4b32['data'](_0x8517('0x38')));});});});});var _0x1c604c=window['ReloadItemsCart']||void 0x0;window[_0x8517('0x61')]=function(_0x3e9374){_0x1b2423['fn']['simpleCart'](!0x0);_0x8517('0x9')===typeof _0x1c604c?_0x1c604c[_0x8517('0x28')](this,_0x3e9374):alert(_0x3e9374);};_0x1b2423(function(){var _0x2b4ae1=_0x1b2423(_0x8517('0x62'));_0x2b4ae1[_0x8517('0x6')]&&_0x2b4ae1[_0x8517('0x25')]();});_0x1b2423(function(){_0x1b2423(window)[_0x8517('0x63')](_0x8517('0x64'),function(){_0x1b2423['fn']['simpleCart'](!0x0);});});}catch(_0x2f0156){_0x8517('0x3')!==typeof console&&_0x8517('0x9')===typeof console[_0x8517('0x14')]&&console['error'](_0x8517('0x65'),_0x2f0156);}}}());(function(){var _0x4793fe=function(_0x52af58,_0x56d267){if(_0x8517('0x17')===typeof console){var _0x1f1984=_0x8517('0x17')===typeof _0x52af58;_0x8517('0x3')!==typeof _0x56d267&&'alerta'===_0x56d267[_0x8517('0xf')]()?_0x1f1984?console[_0x8517('0x2d')](_0x8517('0x66'),_0x52af58[0x0],_0x52af58[0x1],_0x52af58[0x2],_0x52af58[0x3],_0x52af58[0x4],_0x52af58[0x5],_0x52af58[0x6],_0x52af58[0x7]):console[_0x8517('0x2d')](_0x8517('0x66')+_0x52af58):_0x8517('0x3')!==typeof _0x56d267&&_0x8517('0x2e')===_0x56d267[_0x8517('0xf')]()?_0x1f1984?console[_0x8517('0x2e')](_0x8517('0x66'),_0x52af58[0x0],_0x52af58[0x1],_0x52af58[0x2],_0x52af58[0x3],_0x52af58[0x4],_0x52af58[0x5],_0x52af58[0x6],_0x52af58[0x7]):console['info'](_0x8517('0x66')+_0x52af58):_0x1f1984?console[_0x8517('0x14')](_0x8517('0x66'),_0x52af58[0x0],_0x52af58[0x1],_0x52af58[0x2],_0x52af58[0x3],_0x52af58[0x4],_0x52af58[0x5],_0x52af58[0x6],_0x52af58[0x7]):console['error'](_0x8517('0x66')+_0x52af58);}},_0x485a9d=null,_0x2734a1={},_0x3fc207={},_0x67bd47={};$['QD_checkoutQueue']=function(_0x2a3d87,_0xe42153){if(null===_0x485a9d)if('object'===typeof window[_0x8517('0x58')]&&_0x8517('0x3')!==typeof window[_0x8517('0x58')][_0x8517('0x26')])_0x485a9d=window[_0x8517('0x58')][_0x8517('0x26')];else return _0x4793fe('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js');var _0x258280=$[_0x8517('0x15')]({'done':function(){},'fail':function(){}},_0xe42153),_0x527836=_0x2a3d87[_0x8517('0x8')](';'),_0x31e40e=function(){_0x2734a1[_0x527836][_0x8517('0x2f')](_0x258280['done']);_0x3fc207[_0x527836][_0x8517('0x2f')](_0x258280[_0x8517('0x67')]);};_0x67bd47[_0x527836]?_0x31e40e():(_0x2734a1[_0x527836]=$[_0x8517('0x68')](),_0x3fc207[_0x527836]=$['Callbacks'](),_0x31e40e(),_0x67bd47[_0x527836]=!0x0,_0x485a9d[_0x8517('0x27')](_0x2a3d87)[_0x8517('0x1e')](function(_0x15c96f){_0x67bd47[_0x527836]=!0x1;_0x2734a1[_0x527836][_0x8517('0x44')](_0x15c96f);})[_0x8517('0x67')](function(_0x13de00){_0x67bd47[_0x527836]=!0x1;_0x3fc207[_0x527836][_0x8517('0x44')](_0x13de00);}));};}());(function(_0x495a38){try{var _0x402b34=jQuery,_0x533f23,_0x5179ae=_0x402b34({}),_0x3d5687=function(_0x1b565f,_0x56ccb8){if(_0x8517('0x17')===typeof console&&_0x8517('0x3')!==typeof console['error']&&_0x8517('0x3')!==typeof console['info']&&'undefined'!==typeof console[_0x8517('0x2d')]){var _0x1bc34c;_0x8517('0x17')===typeof _0x1b565f?(_0x1b565f[_0x8517('0x69')](_0x8517('0x6a')),_0x1bc34c=_0x1b565f):_0x1bc34c=['[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a'+_0x1b565f];if(_0x8517('0x3')===typeof _0x56ccb8||_0x8517('0x2b')!==_0x56ccb8['toLowerCase']()&&'aviso'!==_0x56ccb8[_0x8517('0xf')]())if(_0x8517('0x3')!==typeof _0x56ccb8&&_0x8517('0x2e')===_0x56ccb8[_0x8517('0xf')]())try{console[_0x8517('0x2e')][_0x8517('0x6b')](console,_0x1bc34c);}catch(_0x5eabfe){try{console['info'](_0x1bc34c[_0x8517('0x8')]('\x0a'));}catch(_0x1c0cfc){}}else try{console['error'][_0x8517('0x6b')](console,_0x1bc34c);}catch(_0x111b70){try{console['error'](_0x1bc34c[_0x8517('0x8')]('\x0a'));}catch(_0x3304ee){}}else try{console[_0x8517('0x2d')]['apply'](console,_0x1bc34c);}catch(_0x5195a2){try{console[_0x8517('0x2d')](_0x1bc34c[_0x8517('0x8')]('\x0a'));}catch(_0x206fea){}}}},_0x426bfa={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0x8517('0x6c'),'buyQtt':_0x8517('0x6d'),'selectSkuMsg':'javascript:','autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x782f1d,_0x1c7d18,_0x5ad88c){_0x402b34(_0x8517('0x6e'))['is'](_0x8517('0x6f'))&&(_0x8517('0x1f')===_0x1c7d18?alert(_0x8517('0x70')):(alert(_0x8517('0x71')),(_0x8517('0x17')===typeof parent?parent:document)[_0x8517('0x72')][_0x8517('0x73')]=_0x5ad88c));},'isProductPage':function(){return _0x402b34(_0x8517('0x6e'))['is'](_0x8517('0x74'));},'execDefaultAction':function(_0x3f9823){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x402b34[_0x8517('0x75')]=function(_0x32ab66,_0x39f023){function _0x42d6e9(_0x227077){_0x533f23[_0x8517('0x76')]?_0x227077[_0x8517('0x18')](_0x8517('0x77'))||(_0x227077['data'](_0x8517('0x77'),0x1),_0x227077['on'](_0x8517('0x78'),function(_0x41b3ea){if(!_0x533f23[_0x8517('0x79')]())return!0x0;if(!0x0!==_0x3e9bc8[_0x8517('0x7a')][_0x8517('0x28')](this))return _0x41b3ea[_0x8517('0x7b')](),!0x1;})):alert('Método\x20descontinuado!');}function _0x2d53f8(_0x4c5b29){_0x4c5b29=_0x4c5b29||_0x402b34(_0x533f23[_0x8517('0x7c')]);_0x4c5b29[_0x8517('0x37')](function(){var _0x4c5b29=_0x402b34(this);_0x4c5b29['is'](_0x8517('0x7d'))||(_0x4c5b29['addClass'](_0x8517('0x7e')),_0x4c5b29['is'](_0x8517('0x7f'))&&!_0x4c5b29['is'](_0x8517('0x80'))||_0x4c5b29[_0x8517('0x18')](_0x8517('0x81'))||(_0x4c5b29['data'](_0x8517('0x81'),0x1),_0x4c5b29[_0x8517('0x82')](_0x8517('0x83'))[_0x8517('0x6')]||_0x4c5b29['append'](_0x8517('0x84')),_0x4c5b29['is']('.buy-in-page-button')&&_0x533f23[_0x8517('0x85')]()&&_0x50896b[_0x8517('0x28')](_0x4c5b29),_0x42d6e9(_0x4c5b29)));});_0x533f23[_0x8517('0x85')]()&&!_0x4c5b29[_0x8517('0x6')]&&_0x3d5687(_0x8517('0x86')+_0x4c5b29[_0x8517('0x87')]+'\x27.',_0x8517('0x2e'));}var _0x1cad5e=_0x402b34(_0x32ab66);var _0x3e9bc8=this;window['_Quatro_Digital_dropDown']=window[_0x8517('0x88')]||{};window[_0x8517('0x39')]=window[_0x8517('0x39')]||{};_0x3e9bc8[_0x8517('0x89')]=function(_0x52f85a,_0xdc2ad2){_0x1cad5e[_0x8517('0x48')](_0x8517('0x8a'));_0x402b34(_0x8517('0x6e'))[_0x8517('0x48')](_0x8517('0x8b'));var _0x275b0f=_0x402b34(_0x533f23[_0x8517('0x7c')])[_0x8517('0x47')](_0x8517('0x8c')+(_0x52f85a[_0x8517('0x35')](_0x8517('0x73'))||'---')+'\x27]')[_0x8517('0x2f')](_0x52f85a);_0x275b0f[_0x8517('0x48')]('qd-bb-itemAddBuyButtonWrapper');setTimeout(function(){_0x1cad5e[_0x8517('0x8d')](_0x8517('0x8e'));_0x275b0f['removeClass']('qd-bb-itemAddBuyButtonWrapper');},_0x533f23['timeRemoveNewItemClass']);window[_0x8517('0x88')]['getOrderForm']=void 0x0;if(_0x8517('0x3')!==typeof _0x39f023&&'function'===typeof _0x39f023[_0x8517('0x8f')])return _0x533f23['isSmartCheckout']||(_0x3d5687(_0x8517('0x90')),_0x39f023['getCartInfoByUrl']()),window[_0x8517('0x57')][_0x8517('0x27')]=void 0x0,_0x39f023['getCartInfoByUrl'](function(_0x353a65){window[_0x8517('0x88')][_0x8517('0x27')]=_0x353a65;_0x402b34['fn'][_0x8517('0x25')](!0x0,void 0x0,!0x0);},{'lastSku':_0xdc2ad2});window[_0x8517('0x88')]['allowUpdate']=!0x0;_0x402b34['fn']['simpleCart'](!0x0);};(function(){if(_0x533f23['isSmartCheckout']&&_0x533f23[_0x8517('0x91')]){var _0x915a15=_0x402b34(_0x8517('0x7f'));_0x915a15[_0x8517('0x6')]&&_0x2d53f8(_0x915a15);}}());var _0x50896b=function(){var _0x5e76ee=_0x402b34(this);_0x8517('0x3')!==typeof _0x5e76ee[_0x8517('0x18')]('buyButton')?(_0x5e76ee[_0x8517('0x92')](_0x8517('0x93')),_0x42d6e9(_0x5e76ee)):(_0x5e76ee[_0x8517('0x63')](_0x8517('0x94'),function(_0x47c21f){_0x5e76ee[_0x8517('0x92')](_0x8517('0x93'));_0x42d6e9(_0x5e76ee);_0x402b34(this)[_0x8517('0x92')](_0x47c21f);}),_0x402b34(window)[_0x8517('0x95')](function(){_0x5e76ee[_0x8517('0x92')](_0x8517('0x93'));_0x42d6e9(_0x5e76ee);_0x5e76ee['unbind'](_0x8517('0x94'));}));};_0x3e9bc8[_0x8517('0x7a')]=function(){var _0x124a4b=_0x402b34(this),_0x32ab66=_0x124a4b[_0x8517('0x35')]('href')||'';if(-0x1<_0x32ab66[_0x8517('0x96')](_0x533f23[_0x8517('0x97')]))return!0x0;_0x32ab66=_0x32ab66['replace'](/redirect\=(false|true)/gi,'')[_0x8517('0x7')]('?',_0x8517('0x98'))[_0x8517('0x7')](/\&\&/gi,'&');if(_0x533f23['execDefaultAction'](_0x124a4b))return _0x124a4b[_0x8517('0x35')]('href',_0x32ab66[_0x8517('0x7')]('redirect=false','redirect=true')),!0x0;_0x32ab66=_0x32ab66[_0x8517('0x7')](/http.?:/i,'');_0x5179ae[_0x8517('0x99')](function(_0x284b1b){if(!_0x533f23[_0x8517('0x9a')]&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0x8517('0x9b')](_0x32ab66))return _0x284b1b();var _0x4c5b63=function(_0x3f0b27,_0x232472){var _0x2d53f8=_0x32ab66['match'](/sku\=([0-9]+)/gi),_0x255ec5=[];if('object'===typeof _0x2d53f8&&null!==_0x2d53f8)for(var _0x4850dd=_0x2d53f8[_0x8517('0x6')]-0x1;0x0<=_0x4850dd;_0x4850dd--){var _0x1a60aa=parseInt(_0x2d53f8[_0x4850dd][_0x8517('0x7')](/sku\=/gi,''));isNaN(_0x1a60aa)||_0x255ec5['push'](_0x1a60aa);}_0x533f23[_0x8517('0x9c')][_0x8517('0x28')](this,_0x3f0b27,_0x232472,_0x32ab66);_0x3e9bc8['buyButtonClickCallback'][_0x8517('0x28')](this,_0x3f0b27,_0x232472,_0x32ab66,_0x255ec5);_0x3e9bc8[_0x8517('0x89')](_0x124a4b,_0x32ab66['split']('ku=')[_0x8517('0x9d')]()['split']('&')['shift']());_0x8517('0x9')===typeof _0x533f23[_0x8517('0x9e')]&&_0x533f23['asyncCallback']['call'](this);_0x402b34(window)['trigger']('productAddedToCart');_0x402b34(window)['trigger'](_0x8517('0x9f'));};_0x533f23[_0x8517('0xa0')]?(_0x4c5b63(null,_0x8517('0x1f')),_0x284b1b()):_0x402b34[_0x8517('0x1d')]({'url':_0x32ab66,'complete':_0x4c5b63})[_0x8517('0x21')](function(){_0x284b1b();});});};_0x3e9bc8['buyButtonClickCallback']=function(_0x4eb62c,_0x284d6d,_0x376f47,_0x33d132){try{_0x8517('0x1f')===_0x284d6d&&_0x8517('0x17')===typeof window[_0x8517('0xa1')]&&_0x8517('0x9')===typeof window[_0x8517('0xa1')][_0x8517('0xa2')]&&window[_0x8517('0xa1')][_0x8517('0xa2')](_0x4eb62c,_0x284d6d,_0x376f47,_0x33d132);}catch(_0x1c5d83){_0x3d5687(_0x8517('0xa3'));}};_0x2d53f8();_0x8517('0x9')===typeof _0x533f23[_0x8517('0x43')]?_0x533f23[_0x8517('0x43')][_0x8517('0x28')](this):_0x3d5687(_0x8517('0xa4'));};var _0x5035b1=_0x402b34['Callbacks']();_0x402b34['fn'][_0x8517('0x75')]=function(_0x44cb07,_0x5184fe){var _0x495a38=_0x402b34(this);_0x8517('0x3')!==typeof _0x5184fe||_0x8517('0x17')!==typeof _0x44cb07||_0x44cb07 instanceof _0x402b34||(_0x5184fe=_0x44cb07,_0x44cb07=void 0x0);_0x533f23=_0x402b34['extend']({},_0x426bfa,_0x5184fe);var _0x788c71;_0x5035b1['add'](function(){_0x495a38['children'](_0x8517('0xa5'))['length']||_0x495a38['prepend']('<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>');_0x788c71=new _0x402b34[(_0x8517('0x75'))](_0x495a38,_0x44cb07);});_0x5035b1[_0x8517('0x44')]();_0x402b34(window)['on'](_0x8517('0xa6'),function(_0x4600b7,_0x15e11e,_0x4a1f6c){_0x788c71['prodAdd'](_0x15e11e,_0x4a1f6c);});return _0x402b34[_0x8517('0x15')](_0x495a38,_0x788c71);};var _0x25c45d=0x0;_0x402b34(document)[_0x8517('0xa7')](function(_0x2aa2ca,_0x373967,_0x536937){-0x1<_0x536937[_0x8517('0x1a')][_0x8517('0xf')]()[_0x8517('0x96')](_0x8517('0xa8'))&&(_0x25c45d=(_0x536937['url'][_0x8517('0xa9')](/sku\=([0-9]+)/i)||[''])[_0x8517('0x9d')]());});_0x402b34(window)[_0x8517('0x63')]('productAddedToCart.qdSbbVtex',function(){_0x402b34(window)['trigger']('QuatroDigital.qd_bb_prod_add',[new _0x402b34(),_0x25c45d]);});_0x402b34(document)[_0x8517('0xaa')](function(){_0x5035b1[_0x8517('0x44')]();});}catch(_0x38ba90){'undefined'!==typeof console&&'function'===typeof console['error']&&console['error'](_0x8517('0x65'),_0x38ba90);}}(this));function qd_number_format(_0x260c2f,_0x1db1ef,_0x1d8801,_0x430d49){_0x260c2f=(_0x260c2f+'')[_0x8517('0x7')](/[^0-9+\-Ee.]/g,'');_0x260c2f=isFinite(+_0x260c2f)?+_0x260c2f:0x0;_0x1db1ef=isFinite(+_0x1db1ef)?Math[_0x8517('0x2')](_0x1db1ef):0x0;_0x430d49=_0x8517('0x3')===typeof _0x430d49?',':_0x430d49;_0x1d8801='undefined'===typeof _0x1d8801?'.':_0x1d8801;var _0x3f8aa1='',_0x3f8aa1=function(_0x5f1da0,_0x3150fd){var _0x36597e=Math['pow'](0xa,_0x3150fd);return''+(Math[_0x8517('0xab')](_0x5f1da0*_0x36597e)/_0x36597e)[_0x8517('0x5')](_0x3150fd);},_0x3f8aa1=(_0x1db1ef?_0x3f8aa1(_0x260c2f,_0x1db1ef):''+Math[_0x8517('0xab')](_0x260c2f))[_0x8517('0xac')]('.');0x3<_0x3f8aa1[0x0][_0x8517('0x6')]&&(_0x3f8aa1[0x0]=_0x3f8aa1[0x0][_0x8517('0x7')](/\B(?=(?:\d{3})+(?!\d))/g,_0x430d49));(_0x3f8aa1[0x1]||'')[_0x8517('0x6')]<_0x1db1ef&&(_0x3f8aa1[0x1]=_0x3f8aa1[0x1]||'',_0x3f8aa1[0x1]+=Array(_0x1db1ef-_0x3f8aa1[0x1][_0x8517('0x6')]+0x1)[_0x8517('0x8')]('0'));return _0x3f8aa1[_0x8517('0x8')](_0x1d8801);}(function(){try{window[_0x8517('0x39')]=window[_0x8517('0x39')]||{},window[_0x8517('0x39')][_0x8517('0x43')]=window[_0x8517('0x39')]['callback']||$[_0x8517('0x68')]();}catch(_0x499dab){_0x8517('0x3')!==typeof console&&_0x8517('0x9')===typeof console[_0x8517('0x14')]&&console[_0x8517('0x14')](_0x8517('0x65'),_0x499dab[_0x8517('0x22')]);}}());(function(_0x4289e2){try{var _0x419292=jQuery,_0x38d35e=function(_0x57912c,_0x5b591e){if('object'===typeof console&&_0x8517('0x3')!==typeof console[_0x8517('0x14')]&&_0x8517('0x3')!==typeof console[_0x8517('0x2e')]&&_0x8517('0x3')!==typeof console[_0x8517('0x2d')]){var _0x48f028;_0x8517('0x17')===typeof _0x57912c?(_0x57912c['unshift'](_0x8517('0xad')),_0x48f028=_0x57912c):_0x48f028=['[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'+_0x57912c];if('undefined'===typeof _0x5b591e||_0x8517('0x2b')!==_0x5b591e[_0x8517('0xf')]()&&_0x8517('0xae')!==_0x5b591e['toLowerCase']())if(_0x8517('0x3')!==typeof _0x5b591e&&'info'===_0x5b591e[_0x8517('0xf')]())try{console['info'][_0x8517('0x6b')](console,_0x48f028);}catch(_0x2dd5e4){try{console['info'](_0x48f028['join']('\x0a'));}catch(_0x5dabb0){}}else try{console[_0x8517('0x14')]['apply'](console,_0x48f028);}catch(_0x312779){try{console[_0x8517('0x14')](_0x48f028[_0x8517('0x8')]('\x0a'));}catch(_0x1fbd27){}}else try{console[_0x8517('0x2d')][_0x8517('0x6b')](console,_0x48f028);}catch(_0x5a4389){try{console[_0x8517('0x2d')](_0x48f028[_0x8517('0x8')]('\x0a'));}catch(_0x3a4266){}}}};window['_QuatroDigital_DropDown']=window[_0x8517('0x57')]||{};window[_0x8517('0x57')][_0x8517('0xaf')]=!0x0;_0x419292[_0x8517('0xb0')]=function(){};_0x419292['fn']['QD_dropDownCart']=function(){return{'fn':new _0x419292()};};var _0x2f139b=function(_0x212273){var _0xaec151={'t':_0x8517('0xb1')};return function(_0x303da2){var _0x5a3b39=function(_0x561fc8){return _0x561fc8;};var _0x2d8ca5=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x303da2=_0x303da2['d'+_0x2d8ca5[0x10]+'c'+_0x2d8ca5[0x11]+'m'+_0x5a3b39(_0x2d8ca5[0x1])+'n'+_0x2d8ca5[0xd]]['l'+_0x2d8ca5[0x12]+'c'+_0x2d8ca5[0x0]+'ti'+_0x5a3b39('o')+'n'];var _0x4c8f54=function(_0x1a2be5){return escape(encodeURIComponent(_0x1a2be5[_0x8517('0x7')](/\./g,'¨')[_0x8517('0x7')](/[a-zA-Z]/g,function(_0x5a5bf5){return String[_0x8517('0xb2')](('Z'>=_0x5a5bf5?0x5a:0x7a)>=(_0x5a5bf5=_0x5a5bf5[_0x8517('0xb3')](0x0)+0xd)?_0x5a5bf5:_0x5a5bf5-0x1a);})));};var _0x4289e2=_0x4c8f54(_0x303da2[[_0x2d8ca5[0x9],_0x5a3b39('o'),_0x2d8ca5[0xc],_0x2d8ca5[_0x5a3b39(0xd)]][_0x8517('0x8')]('')]);_0x4c8f54=_0x4c8f54((window[['js',_0x5a3b39('no'),'m',_0x2d8ca5[0x1],_0x2d8ca5[0x4][_0x8517('0xd')](),_0x8517('0xb4')]['join']('')]||_0x8517('0xb5'))+['.v',_0x2d8ca5[0xd],'e',_0x5a3b39('x'),'co',_0x5a3b39('mm'),_0x8517('0xb6'),_0x2d8ca5[0x1],'.c',_0x5a3b39('o'),'m.',_0x2d8ca5[0x13],'r']['join'](''));for(var _0x47a74 in _0xaec151){if(_0x4c8f54===_0x47a74+_0xaec151[_0x47a74]||_0x4289e2===_0x47a74+_0xaec151[_0x47a74]){var _0x38b00a='tr'+_0x2d8ca5[0x11]+'e';break;}_0x38b00a='f'+_0x2d8ca5[0x0]+'ls'+_0x5a3b39(_0x2d8ca5[0x1])+'';}_0x5a3b39=!0x1;-0x1<_0x303da2[[_0x2d8ca5[0xc],'e',_0x2d8ca5[0x0],'rc',_0x2d8ca5[0x9]]['join']('')]['indexOf'](_0x8517('0xb7'))&&(_0x5a3b39=!0x0);return[_0x38b00a,_0x5a3b39];}(_0x212273);}(window);if(!eval(_0x2f139b[0x0]))return _0x2f139b[0x1]?_0x38d35e(_0x8517('0xb8')):!0x1;_0x419292['QD_dropDownCart']=function(_0x44395a,_0xa21a56){var _0x1d5f5e=_0x419292(_0x44395a);if(!_0x1d5f5e[_0x8517('0x6')])return _0x1d5f5e;var _0xa8f870=_0x419292[_0x8517('0x15')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x8517('0xb9'),'linkCheckout':'Finalizar\x20Compra','cartTotal':_0x8517('0xba'),'emptyCart':_0x8517('0xbb'),'continueShopping':'Continuar\x20Comprando','shippingForm':_0x8517('0xbc')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x26c00a){return _0x26c00a[_0x8517('0xbd')]||_0x26c00a[_0x8517('0xbe')];},'callback':function(){},'callbackProductsList':function(){}},_0xa21a56);_0x419292('');var _0x227ccb=this;if(_0xa8f870[_0x8517('0x56')]){var _0x109da6=!0x1;_0x8517('0x3')===typeof window[_0x8517('0x58')]&&(_0x38d35e(_0x8517('0xbf')),_0x419292[_0x8517('0x1d')]({'url':_0x8517('0xc0'),'async':!0x1,'dataType':'script','error':function(){_0x38d35e('Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.');_0x109da6=!0x0;}}));if(_0x109da6)return _0x38d35e(_0x8517('0xc1'));}if(_0x8517('0x17')===typeof window[_0x8517('0x58')]&&_0x8517('0x3')!==typeof window[_0x8517('0x58')][_0x8517('0x26')])var _0xb74d22=window['vtexjs']['checkout'];else if(_0x8517('0x17')===typeof vtex&&_0x8517('0x17')===typeof vtex[_0x8517('0x26')]&&_0x8517('0x3')!==typeof vtex['checkout']['SDK'])_0xb74d22=new vtex[(_0x8517('0x26'))][(_0x8517('0x59'))]();else return _0x38d35e(_0x8517('0x5a'));_0x227ccb['cartContainer']=_0x8517('0xc2');var _0x1a7d79=function(_0x3ec0a5){_0x419292(this)[_0x8517('0xc3')](_0x3ec0a5);_0x3ec0a5[_0x8517('0x4f')](_0x8517('0xc4'))['add'](_0x419292('.qd_ddc_lightBoxOverlay'))['on']('click.qd_ddc_closeFn',function(){_0x1d5f5e[_0x8517('0x8d')](_0x8517('0xc5'));_0x419292(document[_0x8517('0x6e')])[_0x8517('0x8d')]('qd-bb-lightBoxBodyProdAdd');});_0x419292(document)[_0x8517('0xc6')](_0x8517('0xc7'))['on'](_0x8517('0xc7'),function(_0x5e86cc){0x1b==_0x5e86cc[_0x8517('0xc8')]&&(_0x1d5f5e[_0x8517('0x8d')](_0x8517('0xc5')),_0x419292(document[_0x8517('0x6e')])['removeClass']('qd-bb-lightBoxBodyProdAdd'));});var _0x584638=_0x3ec0a5['find'](_0x8517('0xc9'));_0x3ec0a5['find'](_0x8517('0xca'))['on']('click.qd_ddc_scrollUp',function(){_0x227ccb['scrollCart']('-',void 0x0,void 0x0,_0x584638);return!0x1;});_0x3ec0a5['find']('.qd-ddc-scrollDown')['on'](_0x8517('0xcb'),function(){_0x227ccb[_0x8517('0xcc')](void 0x0,void 0x0,void 0x0,_0x584638);return!0x1;});_0x3ec0a5[_0x8517('0x4f')](_0x8517('0xcd'))[_0x8517('0xce')]('')['on']('keyup.qd_ddc_cep',function(){_0x227ccb[_0x8517('0xcf')](_0x419292(this));});if(_0xa8f870[_0x8517('0xd0')]){var _0xa21a56=0x0;_0x419292(this)['on'](_0x8517('0xd1'),function(){var _0x3ec0a5=function(){window[_0x8517('0x57')][_0x8517('0xaf')]&&(_0x227ccb[_0x8517('0x8f')](),window[_0x8517('0x57')][_0x8517('0xaf')]=!0x1,_0x419292['fn'][_0x8517('0x25')](!0x0),_0x227ccb['cartIsEmpty']());};_0xa21a56=setInterval(function(){_0x3ec0a5();},0x258);_0x3ec0a5();});_0x419292(this)['on'](_0x8517('0xd2'),function(){clearInterval(_0xa21a56);});}};var _0x1380f9=function(_0x1033ae){_0x1033ae=_0x419292(_0x1033ae);_0xa8f870[_0x8517('0xd3')][_0x8517('0x52')]=_0xa8f870[_0x8517('0xd3')][_0x8517('0x52')][_0x8517('0x7')](_0x8517('0xd4'),_0x8517('0xd5'));_0xa8f870[_0x8517('0xd3')][_0x8517('0x52')]=_0xa8f870[_0x8517('0xd3')][_0x8517('0x52')]['replace'](_0x8517('0xd6'),_0x8517('0xd7'));_0xa8f870[_0x8517('0xd3')][_0x8517('0x52')]=_0xa8f870['texts']['cartTotal'][_0x8517('0x7')](_0x8517('0xd8'),'<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>');_0xa8f870[_0x8517('0xd3')][_0x8517('0x52')]=_0xa8f870['texts'][_0x8517('0x52')]['replace']('#total',_0x8517('0xd9'));_0x1033ae[_0x8517('0x4f')](_0x8517('0xda'))['html'](_0xa8f870[_0x8517('0xd3')][_0x8517('0xdb')]);_0x1033ae[_0x8517('0x4f')](_0x8517('0xdc'))[_0x8517('0x4c')](_0xa8f870[_0x8517('0xd3')][_0x8517('0xdd')]);_0x1033ae[_0x8517('0x4f')](_0x8517('0xde'))[_0x8517('0x4c')](_0xa8f870[_0x8517('0xd3')]['linkCheckout']);_0x1033ae['find']('.qd-ddc-infoTotal')['html'](_0xa8f870['texts']['cartTotal']);_0x1033ae[_0x8517('0x4f')](_0x8517('0xdf'))[_0x8517('0x4c')](_0xa8f870[_0x8517('0xd3')][_0x8517('0xe0')]);_0x1033ae[_0x8517('0x4f')](_0x8517('0xe1'))['html'](_0xa8f870[_0x8517('0xd3')][_0x8517('0xe2')]);return _0x1033ae;}(this[_0x8517('0xe3')]);var _0x18759b=0x0;_0x1d5f5e[_0x8517('0x37')](function(){0x0<_0x18759b?_0x1a7d79[_0x8517('0x28')](this,_0x1380f9[_0x8517('0xe4')]()):_0x1a7d79[_0x8517('0x28')](this,_0x1380f9);_0x18759b++;});window[_0x8517('0x39')][_0x8517('0x43')]['add'](function(){_0x419292(_0x8517('0xe5'))['html'](window['_QuatroDigital_CartData'][_0x8517('0x3c')]||'--');_0x419292(_0x8517('0xe6'))['html'](window[_0x8517('0x39')]['qtt']||'0');_0x419292('.qd-ddc-infoTotalShipping')[_0x8517('0x4c')](window[_0x8517('0x39')][_0x8517('0x3d')]||'--');_0x419292(_0x8517('0xe7'))[_0x8517('0x4c')](window['_QuatroDigital_CartData'][_0x8517('0x3f')]||'--');});var _0x2221a7=function(_0xfeab98,_0x36450e){if(_0x8517('0x3')===typeof _0xfeab98[_0x8517('0x42')])return _0x38d35e(_0x8517('0xe8'));_0x227ccb[_0x8517('0xe9')][_0x8517('0x28')](this,_0x36450e);};_0x227ccb[_0x8517('0x8f')]=function(_0x5f34d7,_0x121e8d){'undefined'!=typeof _0x121e8d?window[_0x8517('0x57')][_0x8517('0xea')]=_0x121e8d:window['_QuatroDigital_DropDown'][_0x8517('0xea')]&&(_0x121e8d=window[_0x8517('0x57')][_0x8517('0xea')]);setTimeout(function(){window[_0x8517('0x57')][_0x8517('0xea')]=void 0x0;},_0xa8f870[_0x8517('0xeb')]);_0x419292(_0x8517('0xec'))[_0x8517('0x8d')](_0x8517('0xed'));if(_0xa8f870[_0x8517('0x56')]){var _0xa21a56=function(_0x240181){window[_0x8517('0x57')][_0x8517('0x27')]=_0x240181;_0x2221a7(_0x240181,_0x121e8d);_0x8517('0x3')!==typeof window[_0x8517('0xee')]&&_0x8517('0x9')===typeof window[_0x8517('0xee')][_0x8517('0xef')]&&window[_0x8517('0xee')]['exec'][_0x8517('0x28')](this);_0x419292(_0x8517('0xec'))[_0x8517('0x48')](_0x8517('0xed'));};_0x8517('0x3')!==typeof window['_QuatroDigital_DropDown'][_0x8517('0x27')]?(_0xa21a56(window[_0x8517('0x57')][_0x8517('0x27')]),_0x8517('0x9')===typeof _0x5f34d7&&_0x5f34d7(window[_0x8517('0x57')][_0x8517('0x27')])):_0x419292[_0x8517('0x5b')]([_0x8517('0x42'),_0x8517('0x3a'),'shippingData'],{'done':function(_0x34972b){_0xa21a56[_0x8517('0x28')](this,_0x34972b);_0x8517('0x9')===typeof _0x5f34d7&&_0x5f34d7(_0x34972b);},'fail':function(_0x11f69e){_0x38d35e([_0x8517('0xf0'),_0x11f69e]);}});}else alert('Este\x20método\x20esta\x20descontinuado!');};_0x227ccb[_0x8517('0xf1')]=function(){var _0x4d0039=_0x419292(_0x8517('0xec'));_0x4d0039[_0x8517('0x4f')]('.qd-ddc-prodRow')[_0x8517('0x6')]?_0x4d0039[_0x8517('0x8d')](_0x8517('0xf2')):_0x4d0039['addClass'](_0x8517('0xf2'));};_0x227ccb[_0x8517('0xe9')]=function(_0x3dfdbc){var _0xa21a56=_0x419292(_0x8517('0xf3'));_0xa21a56[_0x8517('0xf4')]();_0xa21a56['each'](function(){var _0xa21a56=_0x419292(this),_0x44395a,_0x10f401,_0xeb9817=_0x419292(''),_0x311497;for(_0x311497 in window[_0x8517('0x57')][_0x8517('0x27')][_0x8517('0x42')])if('object'===typeof window['_QuatroDigital_DropDown']['getOrderForm'][_0x8517('0x42')][_0x311497]){var _0x47bd94=window[_0x8517('0x57')][_0x8517('0x27')][_0x8517('0x42')][_0x311497];var _0x408937=_0x47bd94[_0x8517('0xf5')][_0x8517('0x7')](/^\/|\/$/g,'')[_0x8517('0xac')]('/');var _0x52dbfc=_0x419292('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0x52dbfc[_0x8517('0x35')]({'data-sku':_0x47bd94['id'],'data-sku-index':_0x311497,'data-qd-departament':_0x408937[0x0],'data-qd-category':_0x408937[_0x408937['length']-0x1]});_0x52dbfc['addClass']('qd-ddc-'+_0x47bd94[_0x8517('0xf6')]);_0x52dbfc[_0x8517('0x4f')]('.qd-ddc-prodName')['append'](_0xa8f870[_0x8517('0xbd')](_0x47bd94));_0x52dbfc['find'](_0x8517('0xf7'))[_0x8517('0xc3')](isNaN(_0x47bd94[_0x8517('0xf8')])?_0x47bd94[_0x8517('0xf8')]:0x0==_0x47bd94[_0x8517('0xf8')]?_0x8517('0xf9'):(_0x419292(_0x8517('0x34'))[_0x8517('0x35')](_0x8517('0x36'))||'R$')+'\x20'+qd_number_format(_0x47bd94[_0x8517('0xf8')]/0x64,0x2,',','.'));_0x52dbfc[_0x8517('0x4f')](_0x8517('0xfa'))[_0x8517('0x35')]({'data-sku':_0x47bd94['id'],'data-sku-index':_0x311497})['val'](_0x47bd94[_0x8517('0xfb')]);_0x52dbfc[_0x8517('0x4f')]('.qd-ddc-remove')['attr']({'data-sku':_0x47bd94['id'],'data-sku-index':_0x311497});_0x227ccb[_0x8517('0xfc')](_0x47bd94['id'],_0x52dbfc['find'](_0x8517('0xfd')),_0x47bd94['imageUrl']);_0x52dbfc[_0x8517('0x4f')](_0x8517('0xfe'))[_0x8517('0x35')]({'data-sku':_0x47bd94['id'],'data-sku-index':_0x311497});_0x52dbfc[_0x8517('0xff')](_0xa21a56);_0xeb9817=_0xeb9817['add'](_0x52dbfc);}try{var _0x4f8d9e=_0xa21a56[_0x8517('0x0')]('.qd-ddc-wrapper')['find'](_0x8517('0xcd'));_0x4f8d9e[_0x8517('0x6')]&&''==_0x4f8d9e['val']()&&window[_0x8517('0x57')][_0x8517('0x27')]['shippingData'][_0x8517('0x100')]&&_0x4f8d9e[_0x8517('0xce')](window['_QuatroDigital_DropDown'][_0x8517('0x27')]['shippingData'][_0x8517('0x100')][_0x8517('0x101')]);}catch(_0x48f8fd){_0x38d35e(_0x8517('0x102')+_0x48f8fd[_0x8517('0x22')],_0x8517('0xae'));}_0x227ccb[_0x8517('0x103')](_0xa21a56);_0x227ccb[_0x8517('0xf1')]();_0x3dfdbc&&_0x3dfdbc[_0x8517('0x104')]&&function(){_0x10f401=_0xeb9817[_0x8517('0x47')](_0x8517('0x105')+_0x3dfdbc[_0x8517('0x104')]+'\x27]');_0x10f401['length']&&(_0x44395a=0x0,_0xeb9817[_0x8517('0x37')](function(){var _0x3dfdbc=_0x419292(this);if(_0x3dfdbc['is'](_0x10f401))return!0x1;_0x44395a+=_0x3dfdbc[_0x8517('0x106')]();}),_0x227ccb[_0x8517('0xcc')](void 0x0,void 0x0,_0x44395a,_0xa21a56[_0x8517('0x2f')](_0xa21a56['parent']())),_0xeb9817['removeClass']('qd-ddc-lastAddedFixed'),function(_0x3086e3){_0x3086e3[_0x8517('0x48')](_0x8517('0x107'));_0x3086e3[_0x8517('0x48')](_0x8517('0x108'));setTimeout(function(){_0x3086e3[_0x8517('0x8d')](_0x8517('0x107'));},_0xa8f870[_0x8517('0xeb')]);}(_0x10f401));}();});(function(){_QuatroDigital_DropDown[_0x8517('0x27')]['items'][_0x8517('0x6')]?(_0x419292(_0x8517('0x6e'))[_0x8517('0x8d')](_0x8517('0x109'))[_0x8517('0x48')]('qd-ddc-cart-rendered\x20qd-ddc-product-add-time'),setTimeout(function(){_0x419292(_0x8517('0x6e'))[_0x8517('0x8d')](_0x8517('0x10a'));},_0xa8f870['timeRemoveNewItemClass'])):_0x419292(_0x8517('0x6e'))[_0x8517('0x8d')](_0x8517('0x10b'))['addClass'](_0x8517('0x109'));}());_0x8517('0x9')===typeof _0xa8f870[_0x8517('0x10c')]?_0xa8f870['callbackProductsList']['call'](this):_0x38d35e(_0x8517('0x10d'));};_0x227ccb[_0x8517('0xfc')]=function(_0x5d5e06,_0x3a67d8,_0x176601){function _0x23104a(){_0x3a67d8[_0x8517('0x8d')](_0x8517('0x10e'))['load'](function(){_0x419292(this)[_0x8517('0x48')](_0x8517('0x10e'));})[_0x8517('0x35')]('src',_0x176601);}_0x176601?_0x23104a():isNaN(_0x5d5e06)?_0x38d35e(_0x8517('0x10f'),'alerta'):alert(_0x8517('0x110'));};_0x227ccb[_0x8517('0x103')]=function(_0x2d315a){var _0x3d5ae9=function(_0x5b57a9,_0x30d5ae){var _0xa21a56=_0x419292(_0x5b57a9);var _0x22073a=_0xa21a56['attr'](_0x8517('0x111'));var _0x44395a=_0xa21a56[_0x8517('0x35')](_0x8517('0x112'));if(_0x22073a){var _0xd75b06=parseInt(_0xa21a56['val']())||0x1;_0x227ccb[_0x8517('0x113')]([_0x22073a,_0x44395a],_0xd75b06,_0xd75b06+0x1,function(_0x5d4692){_0xa21a56['val'](_0x5d4692);_0x8517('0x9')===typeof _0x30d5ae&&_0x30d5ae();});}};var _0xa21a56=function(_0x285416,_0x41db04){var _0xa21a56=_0x419292(_0x285416);var _0x27e6ce=_0xa21a56[_0x8517('0x35')](_0x8517('0x111'));var _0x44395a=_0xa21a56['attr']('data-sku-index');if(_0x27e6ce){var _0x394f9b=parseInt(_0xa21a56['val']())||0x2;_0x227ccb['changeQantity']([_0x27e6ce,_0x44395a],_0x394f9b,_0x394f9b-0x1,function(_0x110752){_0xa21a56[_0x8517('0xce')](_0x110752);_0x8517('0x9')===typeof _0x41db04&&_0x41db04();});}};var _0x5717b2=function(_0x23031f,_0x24bf80){var _0xa21a56=_0x419292(_0x23031f);var _0x3741ee=_0xa21a56[_0x8517('0x35')](_0x8517('0x111'));var _0x44395a=_0xa21a56[_0x8517('0x35')]('data-sku-index');if(_0x3741ee){var _0x3b13b3=parseInt(_0xa21a56['val']())||0x1;_0x227ccb[_0x8517('0x113')]([_0x3741ee,_0x44395a],0x1,_0x3b13b3,function(_0x349071){_0xa21a56[_0x8517('0xce')](_0x349071);_0x8517('0x9')===typeof _0x24bf80&&_0x24bf80();});}};var _0x44395a=_0x2d315a[_0x8517('0x4f')](_0x8517('0x114'));_0x44395a[_0x8517('0x48')](_0x8517('0x115'))[_0x8517('0x37')](function(){var _0x2d315a=_0x419292(this);_0x2d315a[_0x8517('0x4f')](_0x8517('0x116'))['on'](_0x8517('0x117'),function(_0x3da04a){_0x3da04a['preventDefault']();_0x44395a['addClass'](_0x8517('0x118'));_0x3d5ae9(_0x2d315a[_0x8517('0x4f')]('.qd-ddc-quantity'),function(){_0x44395a[_0x8517('0x8d')]('qd-loading');});});_0x2d315a[_0x8517('0x4f')](_0x8517('0x119'))['on'](_0x8517('0x11a'),function(_0x5625b9){_0x5625b9[_0x8517('0x7b')]();_0x44395a[_0x8517('0x48')](_0x8517('0x118'));_0xa21a56(_0x2d315a[_0x8517('0x4f')](_0x8517('0xfa')),function(){_0x44395a[_0x8517('0x8d')]('qd-loading');});});_0x2d315a[_0x8517('0x4f')](_0x8517('0xfa'))['on']('focusout.qd_ddc_change',function(){_0x44395a[_0x8517('0x48')](_0x8517('0x118'));_0x5717b2(this,function(){_0x44395a[_0x8517('0x8d')](_0x8517('0x118'));});});_0x2d315a[_0x8517('0x4f')](_0x8517('0xfa'))['on'](_0x8517('0x11b'),function(_0x10aa5b){0xd==_0x10aa5b['keyCode']&&(_0x44395a[_0x8517('0x48')](_0x8517('0x118')),_0x5717b2(this,function(){_0x44395a[_0x8517('0x8d')](_0x8517('0x118'));}));});});_0x2d315a[_0x8517('0x4f')](_0x8517('0x11c'))['each'](function(){var _0x2d315a=_0x419292(this);_0x2d315a[_0x8517('0x4f')](_0x8517('0x11d'))['on'](_0x8517('0x11e'),function(){_0x2d315a[_0x8517('0x48')]('qd-loading');_0x227ccb[_0x8517('0x11f')](_0x419292(this),function(_0x473a3f){_0x473a3f?_0x2d315a[_0x8517('0x120')](!0x0)['slideUp'](function(){_0x2d315a[_0x8517('0x121')]();_0x227ccb[_0x8517('0xf1')]();}):_0x2d315a['removeClass'](_0x8517('0x118'));});return!0x1;});});};_0x227ccb['shippingCalculate']=function(_0x6f7a61){var _0x52fdf7=_0x6f7a61[_0x8517('0xce')](),_0x52fdf7=_0x52fdf7[_0x8517('0x7')](/[^0-9\-]/g,''),_0x52fdf7=_0x52fdf7[_0x8517('0x7')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x8517('0x122')),_0x52fdf7=_0x52fdf7[_0x8517('0x7')](/(.{9}).*/g,'$1');_0x6f7a61[_0x8517('0xce')](_0x52fdf7);0x9<=_0x52fdf7[_0x8517('0x6')]&&(_0x6f7a61[_0x8517('0x18')](_0x8517('0x123'))!=_0x52fdf7&&_0xb74d22['calculateShipping']({'postalCode':_0x52fdf7,'country':'BRA'})[_0x8517('0x1e')](function(_0x106fc8){window[_0x8517('0x57')][_0x8517('0x27')]=_0x106fc8;_0x227ccb[_0x8517('0x8f')]();})[_0x8517('0x67')](function(_0x50bf97){_0x38d35e(['Não\x20foi\x20possível\x20calcular\x20o\x20frete',_0x50bf97]);updateCartData();}),_0x6f7a61[_0x8517('0x18')]('qdDdcLastPostalCode',_0x52fdf7));};_0x227ccb[_0x8517('0x113')]=function(_0x39f0e3,_0x1e9b2c,_0x3100f8,_0x2a3546){function _0x6888ba(_0x184a7b){_0x184a7b='boolean'!==typeof _0x184a7b?!0x1:_0x184a7b;_0x227ccb[_0x8517('0x8f')]();window[_0x8517('0x57')]['allowUpdate']=!0x1;_0x227ccb['cartIsEmpty']();_0x8517('0x3')!==typeof window[_0x8517('0xee')]&&'function'===typeof window[_0x8517('0xee')][_0x8517('0xef')]&&window[_0x8517('0xee')][_0x8517('0xef')][_0x8517('0x28')](this);'function'===typeof adminCart&&adminCart();_0x419292['fn'][_0x8517('0x25')](!0x0,void 0x0,_0x184a7b);_0x8517('0x9')===typeof _0x2a3546&&_0x2a3546(_0x1e9b2c);}_0x3100f8=_0x3100f8||0x1;if(0x1>_0x3100f8)return _0x1e9b2c;if(_0xa8f870[_0x8517('0x56')]){if(_0x8517('0x3')===typeof window[_0x8517('0x57')][_0x8517('0x27')]['items'][_0x39f0e3[0x1]])return _0x38d35e('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x39f0e3[0x1]+']'),_0x1e9b2c;window[_0x8517('0x57')][_0x8517('0x27')][_0x8517('0x42')][_0x39f0e3[0x1]][_0x8517('0xfb')]=_0x3100f8;window['_QuatroDigital_DropDown'][_0x8517('0x27')][_0x8517('0x42')][_0x39f0e3[0x1]][_0x8517('0x124')]=_0x39f0e3[0x1];_0xb74d22[_0x8517('0x125')]([window['_QuatroDigital_DropDown']['getOrderForm'][_0x8517('0x42')][_0x39f0e3[0x1]]],[_0x8517('0x42'),'totalizers',_0x8517('0x5c')])['done'](function(_0x357e00){window[_0x8517('0x57')][_0x8517('0x27')]=_0x357e00;_0x6888ba(!0x0);})[_0x8517('0x67')](function(_0x4f7b9f){_0x38d35e([_0x8517('0x126'),_0x4f7b9f]);_0x6888ba();});}else _0x38d35e(_0x8517('0x127'));};_0x227ccb[_0x8517('0x11f')]=function(_0x2b4eac,_0xd51523){function _0xeaa3a7(_0x4167a2){_0x4167a2=_0x8517('0x128')!==typeof _0x4167a2?!0x1:_0x4167a2;_0x8517('0x3')!==typeof window[_0x8517('0xee')]&&_0x8517('0x9')===typeof window['_QuatroDigital_AmountProduct'][_0x8517('0xef')]&&window[_0x8517('0xee')][_0x8517('0xef')][_0x8517('0x28')](this);_0x8517('0x9')===typeof adminCart&&adminCart();_0x419292['fn'][_0x8517('0x25')](!0x0,void 0x0,_0x4167a2);_0x8517('0x9')===typeof _0xd51523&&_0xd51523(_0x44395a);}var _0x44395a=!0x1,_0x5d5fe1=_0x419292(_0x2b4eac)[_0x8517('0x35')](_0x8517('0x112'));if(_0xa8f870['smartCheckout']){if(_0x8517('0x3')===typeof window[_0x8517('0x57')][_0x8517('0x27')]['items'][_0x5d5fe1])return _0x38d35e(_0x8517('0x129')+_0x5d5fe1+']'),_0x44395a;window['_QuatroDigital_DropDown'][_0x8517('0x27')]['items'][_0x5d5fe1]['index']=_0x5d5fe1;_0xb74d22[_0x8517('0x12a')]([window[_0x8517('0x57')][_0x8517('0x27')][_0x8517('0x42')][_0x5d5fe1]],[_0x8517('0x42'),_0x8517('0x3a'),_0x8517('0x5c')])[_0x8517('0x1e')](function(_0x3a6d02){_0x44395a=!0x0;window['_QuatroDigital_DropDown'][_0x8517('0x27')]=_0x3a6d02;_0x2221a7(_0x3a6d02);_0xeaa3a7(!0x0);})[_0x8517('0x67')](function(_0xd6b818){_0x38d35e([_0x8517('0x12b'),_0xd6b818]);_0xeaa3a7();});}else alert(_0x8517('0x12c'));};_0x227ccb[_0x8517('0xcc')]=function(_0x4b9f54,_0x599747,_0x526316,_0x4d3088){_0x4d3088=_0x4d3088||_0x419292(_0x8517('0x12d'));_0x4b9f54=_0x4b9f54||'+';_0x599747=_0x599747||0.9*_0x4d3088['height']();_0x4d3088['stop'](!0x0,!0x0)[_0x8517('0x12e')]({'scrollTop':isNaN(_0x526316)?_0x4b9f54+'='+_0x599747+'px':_0x526316});};_0xa8f870[_0x8517('0xd0')]||(_0x227ccb[_0x8517('0x8f')](),_0x419292['fn'][_0x8517('0x25')](!0x0));_0x419292(window)['on']('productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex',function(){try{window[_0x8517('0x57')][_0x8517('0x27')]=void 0x0,_0x227ccb[_0x8517('0x8f')]();}catch(_0x2ed2ec){_0x38d35e(_0x8517('0x12f')+_0x2ed2ec['message'],_0x8517('0x130'));}});'function'===typeof _0xa8f870[_0x8517('0x43')]?_0xa8f870['callback'][_0x8517('0x28')](this):_0x38d35e(_0x8517('0xa4'));};_0x419292['fn'][_0x8517('0xb0')]=function(_0x5aa82a){var _0x6005d6=_0x419292(this);_0x6005d6['fn']=new _0x419292['QD_dropDownCart'](this,_0x5aa82a);return _0x6005d6;};}catch(_0x37394e){_0x8517('0x3')!==typeof console&&_0x8517('0x9')===typeof console['error']&&console[_0x8517('0x14')]('Oooops!\x20',_0x37394e);}}(this));(function(_0x34ad47){try{var _0x33fd2b=jQuery;window[_0x8517('0xee')]=window[_0x8517('0xee')]||{};window['_QuatroDigital_AmountProduct']['items']={};window[_0x8517('0xee')][_0x8517('0x131')]=!0x1;window['_QuatroDigital_AmountProduct'][_0x8517('0x132')]=!0x1;window[_0x8517('0xee')][_0x8517('0x133')]=!0x1;var _0x3976ab=function(){if(window['_QuatroDigital_AmountProduct'][_0x8517('0x131')]){var _0x364ec6=!0x1;var _0x34ad47={};window['_QuatroDigital_AmountProduct'][_0x8517('0x42')]={};for(_0x34cd2c in window[_0x8517('0x57')][_0x8517('0x27')][_0x8517('0x42')])if('object'===typeof window['_QuatroDigital_DropDown'][_0x8517('0x27')]['items'][_0x34cd2c]){var _0x4d4947=window[_0x8517('0x57')][_0x8517('0x27')][_0x8517('0x42')][_0x34cd2c];_0x8517('0x3')!==typeof _0x4d4947[_0x8517('0x134')]&&null!==_0x4d4947[_0x8517('0x134')]&&''!==_0x4d4947[_0x8517('0x134')]&&(window[_0x8517('0xee')][_0x8517('0x42')][_0x8517('0x135')+_0x4d4947[_0x8517('0x134')]]=window['_QuatroDigital_AmountProduct']['items'][_0x8517('0x135')+_0x4d4947[_0x8517('0x134')]]||{},window['_QuatroDigital_AmountProduct'][_0x8517('0x42')][_0x8517('0x135')+_0x4d4947[_0x8517('0x134')]]['prodId']=_0x4d4947[_0x8517('0x134')],_0x34ad47[_0x8517('0x135')+_0x4d4947[_0x8517('0x134')]]||(window['_QuatroDigital_AmountProduct']['items']['prod_'+_0x4d4947['productId']]['qtt']=0x0),window['_QuatroDigital_AmountProduct'][_0x8517('0x42')]['prod_'+_0x4d4947[_0x8517('0x134')]][_0x8517('0x40')]+=_0x4d4947[_0x8517('0xfb')],_0x364ec6=!0x0,_0x34ad47[_0x8517('0x135')+_0x4d4947['productId']]=!0x0);}var _0x34cd2c=_0x364ec6;}else _0x34cd2c=void 0x0;window[_0x8517('0xee')][_0x8517('0x131')]&&(_0x33fd2b(_0x8517('0x136'))[_0x8517('0x121')](),_0x33fd2b(_0x8517('0x137'))[_0x8517('0x8d')](_0x8517('0x138')));for(var _0x26094a in window[_0x8517('0xee')]['items']){_0x4d4947=window[_0x8517('0xee')][_0x8517('0x42')][_0x26094a];if(_0x8517('0x17')!==typeof _0x4d4947)return;_0x34ad47=_0x33fd2b(_0x8517('0x139')+_0x4d4947['prodId']+']')[_0x8517('0x0')]('li');if(window[_0x8517('0xee')]['allowRecalculate']||!_0x34ad47['find']('.qd-bap-wrapper')[_0x8517('0x6')])_0x364ec6=_0x33fd2b('<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>'),_0x364ec6[_0x8517('0x4f')]('.qd-bap-qtt')[_0x8517('0x4c')](_0x4d4947[_0x8517('0x40')]),_0x4d4947=_0x34ad47['find'](_0x8517('0x13a')),_0x4d4947[_0x8517('0x6')]?_0x4d4947[_0x8517('0x13b')](_0x364ec6)[_0x8517('0x48')](_0x8517('0x138')):_0x34ad47[_0x8517('0x13b')](_0x364ec6);}_0x34cd2c&&(window[_0x8517('0xee')][_0x8517('0x131')]=!0x1);};window[_0x8517('0xee')][_0x8517('0xef')]=function(){window[_0x8517('0xee')][_0x8517('0x131')]=!0x0;_0x3976ab[_0x8517('0x28')](this);};_0x33fd2b(document)[_0x8517('0xaa')](function(){_0x3976ab[_0x8517('0x28')](this);});}catch(_0x450baf){_0x8517('0x3')!==typeof console&&_0x8517('0x9')===typeof console[_0x8517('0x14')]&&console[_0x8517('0x14')](_0x8517('0x65'),_0x450baf);}}(this));(function(){try{var _0x175a71=jQuery,_0x4ff258,_0x4181dd={'selector':'.qdDdcContainer','dropDown':{},'buyButton':{}};_0x175a71[_0x8517('0x13c')]=function(_0x267caf){var _0x143883={};_0x4ff258=_0x175a71[_0x8517('0x15')](!0x0,{},_0x4181dd,_0x267caf);_0x267caf=_0x175a71(_0x4ff258[_0x8517('0x87')])[_0x8517('0xb0')](_0x4ff258[_0x8517('0x13d')]);_0x143883[_0x8517('0x7c')]=_0x8517('0x3')!==typeof _0x4ff258[_0x8517('0x13d')][_0x8517('0xd0')]&&!0x1===_0x4ff258[_0x8517('0x13d')][_0x8517('0xd0')]?_0x175a71(_0x4ff258[_0x8517('0x87')])['QD_buyButton'](_0x267caf['fn'],_0x4ff258[_0x8517('0x7c')]):_0x175a71(_0x4ff258['selector'])[_0x8517('0x75')](_0x4ff258['buyButton']);_0x143883[_0x8517('0x13d')]=_0x267caf;return _0x143883;};_0x175a71['fn']['smartCart']=function(){_0x8517('0x17')===typeof console&&'function'===typeof console[_0x8517('0x2e')]&&console['info']('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x175a71[_0x8517('0x13e')]=_0x175a71['fn']['smartCart'];}catch(_0x4d3556){_0x8517('0x3')!==typeof console&&'function'===typeof console[_0x8517('0x14')]&&console['error'](_0x8517('0x65'),_0x4d3556);}}());

/* Quatro Digital - Product Thumbs // Carlos Vinicius // Todos os direitos reservados. */
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs();a.trigger("QuatroDigital.pt_callback",[a])}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return a.length?$.extend({},a,new b(a)):a},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0x2bca=['[Video\x20in\x20product]\x20','info','error','qdVideoInProduct','extend','start','td.value-field.Videos:first','ul.thumbs','div#image','text','replace','split','length','indexOf','youtube','push','pop','shift','youtu.be','<div\x20class=\x22qd-playerWrapper\x22></div>','prependTo','wrap','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','join','toUpperCase','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','html','?wmode=transparent&rel=0&enablejsapi=1\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>','data','height','fadeTo','addClass','qdpv-video-on','stop','add','animate','find','iframe','removeAttr','style','.qd-videoItem','call','string','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27','\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','click.playVideo','controlVideo','.qd-playerWrapper\x20iframe','contentWindow','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','rel','attr','a:not(.qd-videoLink)','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','appendTo','ajaxStop','ImageControl','.qd-videoLink','body','.produto','object','undefined','alerta','warn'];(function(_0x28ddb2,_0x323602){var _0x5e3c8d=function(_0x5ee188){while(--_0x5ee188){_0x28ddb2['push'](_0x28ddb2['shift']());}};_0x5e3c8d(++_0x323602);}(_0x2bca,0xc6));var _0xa2bc=function(_0x300aa2,_0x27347b){_0x300aa2=_0x300aa2-0x0;var _0xc3d020=_0x2bca[_0x300aa2];return _0xc3d020;};(function(_0x2d367f){$(function(){if($(document[_0xa2bc('0x0')])['is'](_0xa2bc('0x1'))){var _0x399909=[];var _0xb935dc=function(_0x293f07,_0x20a79e){_0xa2bc('0x2')===typeof console&&(_0xa2bc('0x3')!==typeof _0x20a79e&&_0xa2bc('0x4')===_0x20a79e['toLowerCase']()?console[_0xa2bc('0x5')](_0xa2bc('0x6')+_0x293f07):_0xa2bc('0x3')!==typeof _0x20a79e&&_0xa2bc('0x7')===_0x20a79e['toLowerCase']()?console[_0xa2bc('0x7')](_0xa2bc('0x6')+_0x293f07):console[_0xa2bc('0x8')](_0xa2bc('0x6')+_0x293f07));};window[_0xa2bc('0x9')]=window[_0xa2bc('0x9')]||{};var _0x10697c=$[_0xa2bc('0xa')](!0x0,{'insertThumbsIn':_0xa2bc('0xb'),'videoFieldSelector':_0xa2bc('0xc'),'controlVideo':!0x0,'urlProtocol':'http'},window[_0xa2bc('0x9')]);var _0x947e17=$(_0xa2bc('0xd'));var _0x519487=$(_0xa2bc('0xe'));var _0x368abe=$(_0x10697c['videoFieldSelector'])[_0xa2bc('0xf')]()[_0xa2bc('0x10')](/\;\s*/,';')[_0xa2bc('0x11')](';');for(var _0x19aacb=0x0;_0x19aacb<_0x368abe[_0xa2bc('0x12')];_0x19aacb++)-0x1<_0x368abe[_0x19aacb][_0xa2bc('0x13')](_0xa2bc('0x14'))?_0x399909[_0xa2bc('0x15')](_0x368abe[_0x19aacb][_0xa2bc('0x11')]('v=')[_0xa2bc('0x16')]()[_0xa2bc('0x11')](/[&#]/)[_0xa2bc('0x17')]()):-0x1<_0x368abe[_0x19aacb][_0xa2bc('0x13')](_0xa2bc('0x18'))&&_0x399909[_0xa2bc('0x15')](_0x368abe[_0x19aacb][_0xa2bc('0x11')]('be/')[_0xa2bc('0x16')]()[_0xa2bc('0x11')](/[\?&#]/)[_0xa2bc('0x17')]());var _0x4e719a=$(_0xa2bc('0x19'));_0x4e719a[_0xa2bc('0x1a')]('#include');_0x4e719a[_0xa2bc('0x1b')]('<div\x20class=\x22qd-playerContainer\x22></div>');_0x368abe=function(_0x2784b4){var _0xb4b322={'t':_0xa2bc('0x1c')};return function(_0x25ef5b){var _0x3447fe=function(_0x18dde0){return _0x18dde0;};var _0xd4fc01=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x25ef5b=_0x25ef5b['d'+_0xd4fc01[0x10]+'c'+_0xd4fc01[0x11]+'m'+_0x3447fe(_0xd4fc01[0x1])+'n'+_0xd4fc01[0xd]]['l'+_0xd4fc01[0x12]+'c'+_0xd4fc01[0x0]+'ti'+_0x3447fe('o')+'n'];var _0xf548b3=function(_0x1114e3){return escape(encodeURIComponent(_0x1114e3[_0xa2bc('0x10')](/\./g,'¨')[_0xa2bc('0x10')](/[a-zA-Z]/g,function(_0x512b44){return String['fromCharCode'](('Z'>=_0x512b44?0x5a:0x7a)>=(_0x512b44=_0x512b44[_0xa2bc('0x1d')](0x0)+0xd)?_0x512b44:_0x512b44-0x1a);})));};var _0x54c2eb=_0xf548b3(_0x25ef5b[[_0xd4fc01[0x9],_0x3447fe('o'),_0xd4fc01[0xc],_0xd4fc01[_0x3447fe(0xd)]][_0xa2bc('0x1e')]('')]);_0xf548b3=_0xf548b3((window[['js',_0x3447fe('no'),'m',_0xd4fc01[0x1],_0xd4fc01[0x4][_0xa2bc('0x1f')](),'ite'][_0xa2bc('0x1e')]('')]||'---')+['.v',_0xd4fc01[0xd],'e',_0x3447fe('x'),'co',_0x3447fe('mm'),'erc',_0xd4fc01[0x1],'.c',_0x3447fe('o'),'m.',_0xd4fc01[0x13],'r'][_0xa2bc('0x1e')](''));for(var _0x168c15 in _0xb4b322){if(_0xf548b3===_0x168c15+_0xb4b322[_0x168c15]||_0x54c2eb===_0x168c15+_0xb4b322[_0x168c15]){var _0x457b41='tr'+_0xd4fc01[0x11]+'e';break;}_0x457b41='f'+_0xd4fc01[0x0]+'ls'+_0x3447fe(_0xd4fc01[0x1])+'';}_0x3447fe=!0x1;-0x1<_0x25ef5b[[_0xd4fc01[0xc],'e',_0xd4fc01[0x0],'rc',_0xd4fc01[0x9]][_0xa2bc('0x1e')]('')][_0xa2bc('0x13')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x3447fe=!0x0);return[_0x457b41,_0x3447fe];}(_0x2784b4);}(window);if(!eval(_0x368abe[0x0]))return _0x368abe[0x1]?_0xb935dc(_0xa2bc('0x20')):!0x1;var _0x5d8843=function(_0x21940f,_0x339aed){_0xa2bc('0x14')===_0x339aed&&_0x4e719a[_0xa2bc('0x21')]('<iframe\x20src=\x22'+_0x10697c['urlProtocol']+'://www.youtube.com/embed/'+_0x21940f+_0xa2bc('0x22'));_0x519487[_0xa2bc('0x23')](_0xa2bc('0x24'),_0x519487[_0xa2bc('0x23')](_0xa2bc('0x24'))||_0x519487['height']());_0x519487['stop'](!0x0,!0x0)[_0xa2bc('0x25')](0x1f4,0x0,function(){$(_0xa2bc('0x0'))[_0xa2bc('0x26')](_0xa2bc('0x27'));});_0x4e719a[_0xa2bc('0x28')](!0x0,!0x0)['fadeTo'](0x1f4,0x1,function(){_0x519487[_0xa2bc('0x29')](_0x4e719a)[_0xa2bc('0x2a')]({'height':_0x4e719a[_0xa2bc('0x2b')](_0xa2bc('0x2c'))[_0xa2bc('0x24')]()},0x2bc);});};removePlayer=function(){_0x947e17['find']('a:not(\x27.qd-videoLink\x27)')['bind']('click.removeVideo',function(){_0x4e719a[_0xa2bc('0x28')](!0x0,!0x0)[_0xa2bc('0x25')](0x1f4,0x0,function(){$(this)['hide']()[_0xa2bc('0x2d')](_0xa2bc('0x2e'));$('body')['removeClass'](_0xa2bc('0x27'));});_0x519487[_0xa2bc('0x28')](!0x0,!0x0)[_0xa2bc('0x25')](0x1f4,0x1,function(){var _0x2dd05f=_0x519487[_0xa2bc('0x23')](_0xa2bc('0x24'));_0x2dd05f&&_0x519487[_0xa2bc('0x2a')]({'height':_0x2dd05f},0x2bc);});});};var _0x49e229=function(){if(!_0x947e17[_0xa2bc('0x2b')](_0xa2bc('0x2f'))[_0xa2bc('0x12')])for(vId in removePlayer[_0xa2bc('0x30')](this),_0x399909)if(_0xa2bc('0x31')===typeof _0x399909[vId]&&''!==_0x399909[vId]){var _0x5b327e=$(_0xa2bc('0x32')+_0x399909[vId]+_0xa2bc('0x33')+_0x399909[vId]+_0xa2bc('0x34')+_0x399909[vId]+_0xa2bc('0x35'));_0x5b327e['find']('a')['bind'](_0xa2bc('0x36'),function(){var _0x2bf389=$(this);_0x947e17[_0xa2bc('0x2b')]('.ON')['removeClass']('ON');_0x2bf389[_0xa2bc('0x26')]('ON');0x1==_0x10697c[_0xa2bc('0x37')]?$(_0xa2bc('0x38'))['length']?(_0x5d8843[_0xa2bc('0x30')](this,'',''),$('.qd-playerWrapper\x20iframe')[0x0][_0xa2bc('0x39')]['postMessage'](_0xa2bc('0x3a'),'*')):_0x5d8843['call'](this,_0x2bf389['attr'](_0xa2bc('0x3b')),_0xa2bc('0x14')):_0x5d8843[_0xa2bc('0x30')](this,_0x2bf389[_0xa2bc('0x3c')](_0xa2bc('0x3b')),_0xa2bc('0x14'));return!0x1;});0x1==_0x10697c[_0xa2bc('0x37')]&&_0x947e17[_0xa2bc('0x2b')](_0xa2bc('0x3d'))['click'](function(_0x3de601){$('.qd-playerWrapper\x20iframe')[_0xa2bc('0x12')]&&$(_0xa2bc('0x38'))[0x0]['contentWindow'][_0xa2bc('0x3e')](_0xa2bc('0x3f'),'*');});'start'===_0x10697c['insertThumbsIn']?_0x5b327e['prependTo'](_0x947e17):_0x5b327e[_0xa2bc('0x40')](_0x947e17);_0x5b327e['trigger']('QuatroDigital.pv_video_added',[_0x399909[vId],_0x5b327e]);}};$(document)[_0xa2bc('0x41')](_0x49e229);$(window)['load'](_0x49e229);(function(){var _0x944e6c=this;var _0x2d8ba1=window[_0xa2bc('0x42')]||function(){};window[_0xa2bc('0x42')]=function(_0x23ad8f,_0x55e907){$(_0x23ad8f||'')['is'](_0xa2bc('0x43'))||(_0x2d8ba1['call'](this,_0x23ad8f,_0x55e907),_0x49e229[_0xa2bc('0x30')](_0x944e6c));};}());}});}(this));

/* Quatro Digital - Mosaic Banners // Carlos Vinicius // Todos os direitos reservados */
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

