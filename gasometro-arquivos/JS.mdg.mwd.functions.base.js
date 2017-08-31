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
var _0x77ce=['attr','skus','sku','bestPrice','available','qd-sp-product-unavailable','O\x20valor\x20informado\x20p/\x20o\x20desconto\x20não\x20é\x20um\x20número.','.qd_productPrice','val','Por\x20alguma\x20razão\x20não\x20consegui\x20obter\x20o\x20preço\x20deste\x20produto\x20:(','appliedDiscount','getDiscountValue','listPrice','.qd_productOldPrice','changeNativePrice','skuPrice','.qd-sp-display-discount','html','installments','installmentValue','changeInstallments','.qd_sp_display_installments','.qd_sp_display_installmentValue','.qd_sp_installments','.qd_saveAmount','prepend','em.economia-de','each','skuSelected.vtex','qd_sp_processedItem','startedByWrapper','flagElement','forcePromotion','not','.qd_sp_processedItem','.qd_productPrice:not(.qd_sp_processedItem)','style','display:none\x20!important;','append','after','call','extend','boolean','.produto','function','prototype','trim','replace','abs','undefined','pow','round','toFixed','split','length','join','QD_SmartPrice','Smart\x20Price','error','info','warn','object','unshift','alerta','toLowerCase','aviso','apply','text','match','auto','.productRightColumn','strong.skuBestPrice','label.skuBestInstallmentNumber','strong.skuPrice','fromCharCode','toUpperCase','ite','---','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','closest','productPage','wrapperElement','filterFlagBy','isProductPage','find','skuBestPrice','addClass','qd-active','qd-sp-active','.qd_sp_on,\x20.qd_sp_ignored','.qd_active','removeClass','oneFlagByItem','siblings','.qd_sp_on','qd_sp_ignored','div[skuCorrente]:first'];(function(_0x673722,_0x275d7e){var _0x21249c=function(_0x25b4e7){while(--_0x25b4e7){_0x673722['push'](_0x673722['shift']());}};_0x21249c(++_0x275d7e);}(_0x77ce,0x1b8));var _0xe77c=function(_0x58690a,_0x12605f){_0x58690a=_0x58690a-0x0;var _0x393837=_0x77ce[_0x58690a];return _0x393837;};_0xe77c('0x0')!==typeof String[_0xe77c('0x1')][_0xe77c('0x2')]&&(String[_0xe77c('0x1')][_0xe77c('0x2')]=function(){return this[_0xe77c('0x3')](/^\s+|\s+$/g,'');});function qd_number_format(_0x4c8ddd,_0x763263,_0xd762e7,_0x56e3e3){_0x4c8ddd=(_0x4c8ddd+'')[_0xe77c('0x3')](/[^0-9+\-Ee.]/g,'');_0x4c8ddd=isFinite(+_0x4c8ddd)?+_0x4c8ddd:0x0;_0x763263=isFinite(+_0x763263)?Math[_0xe77c('0x4')](_0x763263):0x0;_0x56e3e3=_0xe77c('0x5')===typeof _0x56e3e3?',':_0x56e3e3;_0xd762e7=_0xe77c('0x5')===typeof _0xd762e7?'.':_0xd762e7;var _0x56d7ef='',_0x56d7ef=function(_0x48545b,_0x37ef86){var _0x763263=Math[_0xe77c('0x6')](0xa,_0x37ef86);return''+(Math[_0xe77c('0x7')](_0x48545b*_0x763263)/_0x763263)[_0xe77c('0x8')](_0x37ef86);},_0x56d7ef=(_0x763263?_0x56d7ef(_0x4c8ddd,_0x763263):''+Math['round'](_0x4c8ddd))[_0xe77c('0x9')]('.');0x3<_0x56d7ef[0x0][_0xe77c('0xa')]&&(_0x56d7ef[0x0]=_0x56d7ef[0x0][_0xe77c('0x3')](/\B(?=(?:\d{3})+(?!\d))/g,_0x56e3e3));(_0x56d7ef[0x1]||'')[_0xe77c('0xa')]<_0x763263&&(_0x56d7ef[0x1]=_0x56d7ef[0x1]||'',_0x56d7ef[0x1]+=Array(_0x763263-_0x56d7ef[0x1][_0xe77c('0xa')]+0x1)[_0xe77c('0xb')]('0'));return _0x56d7ef['join'](_0xd762e7);};(function(_0x43d8b8){'use strict';var _0x2524ea=jQuery;if(typeof _0x2524ea['fn'][_0xe77c('0xc')]===_0xe77c('0x0'))return;var _0x4dcab4=_0xe77c('0xd');var _0x1947e0=function(_0x51f9ff,_0x5efbf8){if('object'===typeof console&&_0xe77c('0x0')===typeof console[_0xe77c('0xe')]&&'function'===typeof console[_0xe77c('0xf')]&&_0xe77c('0x0')===typeof console[_0xe77c('0x10')]){var _0x28f2a3;_0xe77c('0x11')===typeof _0x51f9ff?(_0x51f9ff[_0xe77c('0x12')]('['+_0x4dcab4+']\x0a'),_0x28f2a3=_0x51f9ff):_0x28f2a3=['['+_0x4dcab4+']\x0a'+_0x51f9ff];if('undefined'===typeof _0x5efbf8||_0xe77c('0x13')!==_0x5efbf8[_0xe77c('0x14')]()&&_0xe77c('0x15')!==_0x5efbf8[_0xe77c('0x14')]())if(_0xe77c('0x5')!==typeof _0x5efbf8&&_0xe77c('0xf')===_0x5efbf8[_0xe77c('0x14')]())try{console[_0xe77c('0xf')]['apply'](console,_0x28f2a3);}catch(_0x4ce9f5){console['info'](_0x28f2a3['join']('\x0a'));}else try{console[_0xe77c('0xe')]['apply'](console,_0x28f2a3);}catch(_0x53eec4){console['error'](_0x28f2a3[_0xe77c('0xb')]('\x0a'));}else try{console[_0xe77c('0x10')][_0xe77c('0x16')](console,_0x28f2a3);}catch(_0x3a1c4a){console['warn'](_0x28f2a3[_0xe77c('0xb')]('\x0a'));}}};var _0x157dad=/[0-9]+\%/i;var _0x1173e8=/[0-9\.]+(?=\%)/i;var _0x5e114d={'isDiscountFlag':function(_0x377b9a){if(_0x377b9a['text']()['search'](_0x157dad)>-0x1)return!![];return![];},'getDiscountValue':function(_0x59e2b8){return _0x59e2b8[_0xe77c('0x17')]()[_0xe77c('0x18')](_0x1173e8);},'startedByWrapper':![],'flagElement':'.flag','wrapperElement':'li','filterFlagBy':'[class*=\x27desconto\x27]','forcePromotion':null,'appliedDiscount':null,'oneFlagByItem':!![],'isSmartCheckout':!![],'changeInstallments':![],'productPage':{'changeNativeSaveAmount':!![],'changeNativePrice':!![],'changeInstallments':![],'isProductPage':_0xe77c('0x19'),'wrapperElement':_0xe77c('0x1a'),'skuBestPrice':_0xe77c('0x1b'),'installments':_0xe77c('0x1c'),'installmentValue':'label.skuBestInstallmentValue','skuPrice':_0xe77c('0x1d')}};_0x2524ea['fn']['QD_SmartPrice']=function(){};var _0xf92090=function(_0x42f409){var _0x494173={'t':'nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x314fae){var _0x2bcee3,_0x58b7a1,_0x1cfed8,_0x5a5063;_0x58b7a1=function(_0x38ea07){return _0x38ea07;};_0x1cfed8=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x314fae=_0x314fae['d'+_0x1cfed8[0x10]+'c'+_0x1cfed8[0x11]+'m'+_0x58b7a1(_0x1cfed8[0x1])+'n'+_0x1cfed8[0xd]]['l'+_0x1cfed8[0x12]+'c'+_0x1cfed8[0x0]+'ti'+_0x58b7a1('o')+'n'];_0x2bcee3=function(_0x1105d9){return escape(encodeURIComponent(_0x1105d9['replace'](/\./g,'¨')[_0xe77c('0x3')](/[a-zA-Z]/g,function(_0x433cc2){return String[_0xe77c('0x1e')](('Z'>=_0x433cc2?0x5a:0x7a)>=(_0x433cc2=_0x433cc2['charCodeAt'](0x0)+0xd)?_0x433cc2:_0x433cc2-0x1a);})));};var _0x516a80=_0x2bcee3(_0x314fae[[_0x1cfed8[0x9],_0x58b7a1('o'),_0x1cfed8[0xc],_0x1cfed8[_0x58b7a1(0xd)]][_0xe77c('0xb')]('')]);_0x2bcee3=_0x2bcee3((window[['js',_0x58b7a1('no'),'m',_0x1cfed8[0x1],_0x1cfed8[0x4][_0xe77c('0x1f')](),_0xe77c('0x20')][_0xe77c('0xb')]('')]||_0xe77c('0x21'))+['.v',_0x1cfed8[0xd],'e',_0x58b7a1('x'),'co',_0x58b7a1('mm'),'erc',_0x1cfed8[0x1],'.c',_0x58b7a1('o'),'m.',_0x1cfed8[0x13],'r']['join'](''));for(var _0x249247 in _0x494173){if(_0x2bcee3===_0x249247+_0x494173[_0x249247]||_0x516a80===_0x249247+_0x494173[_0x249247]){_0x5a5063='tr'+_0x1cfed8[0x11]+'e';break;}_0x5a5063='f'+_0x1cfed8[0x0]+'ls'+_0x58b7a1(_0x1cfed8[0x1])+'';}_0x58b7a1=!0x1;-0x1<_0x314fae[[_0x1cfed8[0xc],'e',_0x1cfed8[0x0],'rc',_0x1cfed8[0x9]][_0xe77c('0xb')]('')][_0xe77c('0x22')](_0xe77c('0x23'))&&(_0x58b7a1=!0x0);return[_0x5a5063,_0x58b7a1];}(_0x42f409);}(window);if(!eval(_0xf92090[0x0]))return _0xf92090[0x1]?_0x1947e0(_0xe77c('0x24')):!0x1;var _0x2a93c5=function(_0x550af3,_0x5d20cd){'use strict';var _0x4fd521=function(_0xbcb2e9){'use strict';var _0x22478c,_0x4355ac,_0xc9ab02,_0x234f36,_0x224786,_0x59a6dc,_0xedac90,_0x4c3f69,_0x19e201,_0x381aa4,_0x323f08,_0x3ba5f3,_0x4385e1,_0x2a8941,_0x1928bf,_0x593c7e,_0x401936,_0x198457,_0x513fa1;var _0x5690e0=_0x2524ea(this);_0xbcb2e9=typeof _0xbcb2e9===_0xe77c('0x5')?![]:_0xbcb2e9;if(_0x5d20cd['productPage']['isProductPage'])var _0xb5ebb3=_0x5690e0[_0xe77c('0x25')](_0x5d20cd[_0xe77c('0x26')][_0xe77c('0x27')]);else var _0xb5ebb3=_0x5690e0[_0xe77c('0x25')](_0x5d20cd[_0xe77c('0x27')]);if(!_0xbcb2e9&&!_0x5690e0['is'](_0x5d20cd[_0xe77c('0x28')])){if(_0x5d20cd['productPage'][_0xe77c('0x29')]&&_0xb5ebb3['is'](_0x5d20cd[_0xe77c('0x26')][_0xe77c('0x27')])){_0xb5ebb3[_0xe77c('0x2a')](_0x5d20cd[_0xe77c('0x26')][_0xe77c('0x2b')])[_0xe77c('0x2c')](_0xe77c('0x2d'));_0xb5ebb3[_0xe77c('0x2c')](_0xe77c('0x2e'));}return;}var _0x3afdd8=_0x5d20cd[_0xe77c('0x26')][_0xe77c('0x29')];if(_0x5690e0['is'](_0xe77c('0x2f'))&&!_0x3afdd8)return;if(_0x3afdd8){_0x4c3f69=_0xb5ebb3['find'](_0x5d20cd[_0xe77c('0x26')]['skuBestPrice']);if(_0x4c3f69[_0xe77c('0x2a')](_0xe77c('0x30'))[_0xe77c('0xa')])return;_0x4c3f69['removeClass']('qd-active');_0xb5ebb3[_0xe77c('0x31')](_0xe77c('0x2e'));}if(_0x5d20cd[_0xe77c('0x32')]&&_0x5690e0[_0xe77c('0x33')](_0xe77c('0x34'))[_0xe77c('0xa')]){_0x5690e0[_0xe77c('0x2c')](_0xe77c('0x35'));return;}_0x5690e0[_0xe77c('0x2c')]('qd_sp_on');if(!_0x5d20cd['isDiscountFlag'](_0x5690e0))return;if(_0x3afdd8){_0xc9ab02={};var _0x1f98f0=parseInt(_0x2524ea(_0xe77c('0x36'))[_0xe77c('0x37')]('skuCorrente'),0xa);if(_0x1f98f0){for(var _0x3403dc=0x0;_0x3403dc<skuJson[_0xe77c('0x38')][_0xe77c('0xa')];_0x3403dc++){if(skuJson[_0xe77c('0x38')][_0x3403dc][_0xe77c('0x39')]==_0x1f98f0){_0xc9ab02=skuJson[_0xe77c('0x38')][_0x3403dc];break;}}}else{var _0x39527d=0x5af3107a3fff;for(var _0x34efea in skuJson[_0xe77c('0x38')]){if(typeof skuJson[_0xe77c('0x38')][_0x34efea]===_0xe77c('0x0'))continue;if(!skuJson[_0xe77c('0x38')][_0x34efea]['available'])continue;if(skuJson[_0xe77c('0x38')][_0x34efea]['bestPrice']<_0x39527d){_0x39527d=skuJson[_0xe77c('0x38')][_0x34efea][_0xe77c('0x3a')];_0xc9ab02=skuJson[_0xe77c('0x38')][_0x34efea];}}}}_0x593c7e=!![];_0x401936=0x0;if(_0x5d20cd['isSmartCheckout']&&_0x198457){_0x593c7e=skuJson[_0xe77c('0x3b')];if(!_0x593c7e)return _0xb5ebb3[_0xe77c('0x2c')](_0xe77c('0x3c'));}_0x4355ac=_0x5d20cd['getDiscountValue'](_0x5690e0);_0x22478c=parseFloat(_0x4355ac,0xa);if(isNaN(_0x22478c))return _0x1947e0([_0xe77c('0x3d'),_0x5690e0],_0xe77c('0x13'));var _0x3c8632=function(_0x57f6ad){if(_0x3afdd8)_0x234f36=(_0x57f6ad[_0xe77c('0x3a')]||0x0)/0x64;else{_0x4385e1=_0xb5ebb3['find'](_0xe77c('0x3e'));_0x234f36=parseFloat((_0x4385e1[_0xe77c('0x3f')]()||'')['replace'](/[^0-9\.\,]+/i,'')[_0xe77c('0x3')]('.','')['replace'](',','.'),0xa);}if(isNaN(_0x234f36))return _0x1947e0([_0xe77c('0x40'),_0x5690e0,_0xb5ebb3]);if(_0x5d20cd[_0xe77c('0x41')]!==null){_0x2a8941=0x0;if(!isNaN(_0x5d20cd[_0xe77c('0x41')]))_0x2a8941=_0x5d20cd[_0xe77c('0x41')];else{_0x1928bf=_0xb5ebb3['find'](_0x5d20cd[_0xe77c('0x41')]);if(_0x1928bf[_0xe77c('0xa')])_0x2a8941=_0x5d20cd[_0xe77c('0x42')](_0x1928bf);}_0x2a8941=parseFloat(_0x2a8941,0xa);if(isNaN(_0x2a8941))_0x2a8941=0x0;if(_0x2a8941!==0x0)_0x234f36=_0x234f36*0x64/(0x64-_0x2a8941);}if(_0x3afdd8)_0x224786=(_0x57f6ad[_0xe77c('0x43')]||0x0)/0x64;else _0x224786=parseFloat((_0xb5ebb3[_0xe77c('0x2a')](_0xe77c('0x44'))[_0xe77c('0x3f')]()||'')[_0xe77c('0x3')](/[^0-9\.\,]+/i,'')[_0xe77c('0x3')]('.','')[_0xe77c('0x3')](',','.'),0xa);if(isNaN(_0x224786))_0x224786=0.001;_0x59a6dc=_0x234f36*((0x64-_0x22478c)/0x64);if(_0x3afdd8&&_0x5d20cd['productPage'][_0xe77c('0x45')]){_0x4c3f69['text'](_0x4c3f69[_0xe77c('0x17')]()['trim']()[_0xe77c('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x59a6dc,0x2,',','.')))[_0xe77c('0x2c')](_0xe77c('0x2d'));_0xb5ebb3[_0xe77c('0x2c')](_0xe77c('0x2e'));}else{_0x513fa1=_0xb5ebb3[_0xe77c('0x2a')]('.qd_displayPrice');_0x513fa1[_0xe77c('0x17')](_0x513fa1[_0xe77c('0x17')]()[_0xe77c('0x3')](/[0-9\.]+,[0-9]+/i,'')+qd_number_format(_0x59a6dc,0x2,',','.'));}if(_0x3afdd8){_0xedac90=_0xb5ebb3[_0xe77c('0x2a')](_0x5d20cd[_0xe77c('0x26')][_0xe77c('0x46')]);if(_0xedac90[_0xe77c('0xa')])_0xedac90[_0xe77c('0x17')](_0xedac90[_0xe77c('0x17')]()[_0xe77c('0x2')]()['replace'](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x59a6dc,0x2,',','.')));}var _0x15a8f2=_0xb5ebb3['find'](_0xe77c('0x47'));_0x15a8f2[_0xe77c('0x17')](_0x15a8f2[_0xe77c('0x17')]()['replace'](/[0-9]+\%/i,_0x22478c+'%'));var _0x385989=function(_0x1cb269,_0x3934f8,_0x1fca64){var _0x74dfc1=_0xb5ebb3[_0xe77c('0x2a')](_0x1cb269);if(_0x74dfc1['length'])_0x74dfc1[_0xe77c('0x48')](_0x74dfc1[_0xe77c('0x48')]()['trim']()[_0xe77c('0x3')](/[0-9]{1,2}/,_0x1fca64?_0x1fca64:_0x57f6ad[_0xe77c('0x49')]||0x0));var _0x5d2a8c=_0xb5ebb3[_0xe77c('0x2a')](_0x3934f8);if(_0x5d2a8c[_0xe77c('0xa')])_0x5d2a8c['html'](_0x5d2a8c[_0xe77c('0x48')]()[_0xe77c('0x2')]()[_0xe77c('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x59a6dc/(_0x1fca64?_0x1fca64:_0x57f6ad[_0xe77c('0x49')]||0x1),0x2,',','.')));};if(_0x3afdd8&&_0x5d20cd[_0xe77c('0x26')]['changeInstallments'])_0x385989(_0x5d20cd['productPage'][_0xe77c('0x49')],_0x5d20cd[_0xe77c('0x26')][_0xe77c('0x4a')]);else if(_0x5d20cd[_0xe77c('0x4b')])_0x385989(_0xe77c('0x4c'),_0xe77c('0x4d'),parseInt(_0xb5ebb3['find'](_0xe77c('0x4e'))[_0xe77c('0x3f')]()||0x1)||0x1);_0xb5ebb3[_0xe77c('0x2a')](_0xe77c('0x4f'))['append'](qd_number_format(_0x224786-_0x59a6dc,0x2,',','.'));_0xb5ebb3[_0xe77c('0x2a')]('.qd_saveAmountPercent')[_0xe77c('0x50')](qd_number_format((_0x224786-_0x59a6dc)*0x64/_0x224786,0x2,',','.'));if(_0x3afdd8&&_0x5d20cd[_0xe77c('0x26')]['changeNativeSaveAmount']){_0x2524ea(_0xe77c('0x51'))[_0xe77c('0x52')](function(){_0x323f08=_0x2524ea(this);_0x323f08[_0xe77c('0x17')](_0x323f08[_0xe77c('0x17')]()[_0xe77c('0x2')]()[_0xe77c('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x224786-_0x59a6dc,0x2,',','.')));_0x323f08['addClass']('qd-active');});}};_0x3c8632(_0xc9ab02);if(_0x3afdd8)_0x2524ea(window)['on'](_0xe77c('0x53'),function(_0x161585,_0x116ee2,_0xdccb3e){_0x3c8632(_0xdccb3e);});_0xb5ebb3[_0xe77c('0x2c')](_0xe77c('0x54'));if(!_0x3afdd8)_0x4385e1[_0xe77c('0x2c')]('qd_sp_processedItem');};(_0x5d20cd[_0xe77c('0x55')]?_0x550af3['find'](_0x5d20cd[_0xe77c('0x56')]):_0x550af3)[_0xe77c('0x52')](function(){_0x4fd521['call'](this,![]);});if(typeof _0x5d20cd[_0xe77c('0x57')]=='string'){var _0xce85f5=_0x5d20cd[_0xe77c('0x55')]?_0x550af3:_0x550af3[_0xe77c('0x25')](_0x5d20cd[_0xe77c('0x27')]);if(_0x5d20cd[_0xe77c('0x26')][_0xe77c('0x29')])_0xce85f5=_0xce85f5[_0xe77c('0x25')](_0x5d20cd[_0xe77c('0x26')][_0xe77c('0x27')])[_0xe77c('0x58')](_0xe77c('0x59'));else _0xce85f5=_0xce85f5[_0xe77c('0x2a')](_0xe77c('0x5a'));_0xce85f5[_0xe77c('0x52')](function(){var _0x50ec6c=_0x2524ea(_0x5d20cd['forcePromotion']);_0x50ec6c[_0xe77c('0x37')](_0xe77c('0x5b'),_0xe77c('0x5c'));if(_0x5d20cd[_0xe77c('0x26')]['isProductPage'])_0x2524ea(this)[_0xe77c('0x5d')](_0x50ec6c);else _0x2524ea(this)[_0xe77c('0x5e')](_0x50ec6c);_0x4fd521[_0xe77c('0x5f')](_0x50ec6c,!![]);});}};_0x2524ea['fn'][_0xe77c('0xc')]=function(_0x3d3861){var _0x2604cf=_0x2524ea(this);if(!_0x2604cf[_0xe77c('0xa')])return _0x2604cf;var _0x39c850=_0x2524ea[_0xe77c('0x60')](!![],{},_0x5e114d,_0x3d3861);if(typeof _0x39c850[_0xe77c('0x26')][_0xe77c('0x29')]!=_0xe77c('0x61'))_0x39c850[_0xe77c('0x26')]['isProductPage']=_0x2524ea(document['body'])['is'](_0xe77c('0x62'));_0x2a93c5(_0x2604cf,_0x39c850);return _0x2604cf;};}(this));
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
var _0xa2fc=['qd-am-has-ul','children','qd-am-elem-','replaceSpecialChars','>li','qd-amazing-menu','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','add','qd-am-','-li','QuatroDigital.am.callback','exec','.qd_amazing_menu_auto','getParent','closest','function','QD_amazingMenu','/qd-amazing-menu','object','undefined','error','info','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','toLowerCase','aviso','join','apply','qdAmAddNdx','each','addClass','qd-am-li-','first','last','qd-am-last','replace','fromCharCode','charCodeAt','toUpperCase','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','find','.qd_am_code','filter','.qd-am-collection','length','parent','qd-am-collection-wrapper','qdAjax','url','html','img[alt=\x27','attr','data-qdam-value','clone','hide','qd-am-content-loaded','text','trim','[class*=\x27colunas\x27]','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','alerta','li\x20>ul'];(function(_0x155fcc,_0x54b353){var _0xa5d0ad=function(_0x15821f){while(--_0x15821f){_0x155fcc['push'](_0x155fcc['shift']());}};_0xa5d0ad(++_0x54b353);}(_0xa2fc,0xa8));var _0xca2f=function(_0x879e31,_0x139d02){_0x879e31=_0x879e31-0x0;var _0x3467e8=_0xa2fc[_0x879e31];return _0x3467e8;};(function(_0x422170){_0x422170['fn'][_0xca2f('0x0')]=_0x422170['fn'][_0xca2f('0x1')];}(jQuery));(function(_0x228263){var _0x144a38;var _0x5e59c2=jQuery;if(_0xca2f('0x2')!==typeof _0x5e59c2['fn'][_0xca2f('0x3')]){var _0x1e8010={'url':_0xca2f('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0x206344=function(_0x3e6fc7,_0x1f7478){if(_0xca2f('0x5')===typeof console&&_0xca2f('0x6')!==typeof console[_0xca2f('0x7')]&&_0xca2f('0x6')!==typeof console[_0xca2f('0x8')]&&'undefined'!==typeof console[_0xca2f('0x9')]){var _0x5c4600;_0xca2f('0x5')===typeof _0x3e6fc7?(_0x3e6fc7[_0xca2f('0xa')]('[QD\x20Amazing\x20Menu]\x0a'),_0x5c4600=_0x3e6fc7):_0x5c4600=[_0xca2f('0xb')+_0x3e6fc7];if(_0xca2f('0x6')===typeof _0x1f7478||'alerta'!==_0x1f7478[_0xca2f('0xc')]()&&_0xca2f('0xd')!==_0x1f7478['toLowerCase']())if(_0xca2f('0x6')!==typeof _0x1f7478&&_0xca2f('0x8')===_0x1f7478[_0xca2f('0xc')]())try{console[_0xca2f('0x8')]['apply'](console,_0x5c4600);}catch(_0x42dc03){try{console['info'](_0x5c4600[_0xca2f('0xe')]('\x0a'));}catch(_0x39ae2e){}}else try{console[_0xca2f('0x7')]['apply'](console,_0x5c4600);}catch(_0x2b131d){try{console[_0xca2f('0x7')](_0x5c4600[_0xca2f('0xe')]('\x0a'));}catch(_0xf11986){}}else try{console[_0xca2f('0x9')][_0xca2f('0xf')](console,_0x5c4600);}catch(_0x51f8d7){try{console[_0xca2f('0x9')](_0x5c4600['join']('\x0a'));}catch(_0x1f9ecd){}}}};_0x5e59c2['fn'][_0xca2f('0x10')]=function(){var _0x4efa8c=_0x5e59c2(this);_0x4efa8c[_0xca2f('0x11')](function(_0x310da7){_0x5e59c2(this)[_0xca2f('0x12')](_0xca2f('0x13')+_0x310da7);});_0x4efa8c[_0xca2f('0x14')]()[_0xca2f('0x12')]('qd-am-first');_0x4efa8c[_0xca2f('0x15')]()[_0xca2f('0x12')](_0xca2f('0x16'));return _0x4efa8c;};_0x5e59c2['fn'][_0xca2f('0x3')]=function(){};_0x228263=function(_0x14030f){var _0x48b883={'t':'nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x5c3f37){var _0x448b47=function(_0x26c412){return _0x26c412;};var _0x50fe16=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5c3f37=_0x5c3f37['d'+_0x50fe16[0x10]+'c'+_0x50fe16[0x11]+'m'+_0x448b47(_0x50fe16[0x1])+'n'+_0x50fe16[0xd]]['l'+_0x50fe16[0x12]+'c'+_0x50fe16[0x0]+'ti'+_0x448b47('o')+'n'];var _0x118392=function(_0x572e06){return escape(encodeURIComponent(_0x572e06[_0xca2f('0x17')](/\./g,'¨')[_0xca2f('0x17')](/[a-zA-Z]/g,function(_0x1d6c51){return String[_0xca2f('0x18')](('Z'>=_0x1d6c51?0x5a:0x7a)>=(_0x1d6c51=_0x1d6c51[_0xca2f('0x19')](0x0)+0xd)?_0x1d6c51:_0x1d6c51-0x1a);})));};var _0x5a8647=_0x118392(_0x5c3f37[[_0x50fe16[0x9],_0x448b47('o'),_0x50fe16[0xc],_0x50fe16[_0x448b47(0xd)]][_0xca2f('0xe')]('')]);_0x118392=_0x118392((window[['js',_0x448b47('no'),'m',_0x50fe16[0x1],_0x50fe16[0x4][_0xca2f('0x1a')](),'ite']['join']('')]||_0xca2f('0x1b'))+['.v',_0x50fe16[0xd],'e',_0x448b47('x'),'co',_0x448b47('mm'),_0xca2f('0x1c'),_0x50fe16[0x1],'.c',_0x448b47('o'),'m.',_0x50fe16[0x13],'r'][_0xca2f('0xe')](''));for(var _0x310d33 in _0x48b883){if(_0x118392===_0x310d33+_0x48b883[_0x310d33]||_0x5a8647===_0x310d33+_0x48b883[_0x310d33]){var _0x3c7a9a='tr'+_0x50fe16[0x11]+'e';break;}_0x3c7a9a='f'+_0x50fe16[0x0]+'ls'+_0x448b47(_0x50fe16[0x1])+'';}_0x448b47=!0x1;-0x1<_0x5c3f37[[_0x50fe16[0xc],'e',_0x50fe16[0x0],'rc',_0x50fe16[0x9]][_0xca2f('0xe')]('')][_0xca2f('0x1d')](_0xca2f('0x1e'))&&(_0x448b47=!0x0);return[_0x3c7a9a,_0x448b47];}(_0x14030f);}(window);if(!eval(_0x228263[0x0]))return _0x228263[0x1]?_0x206344('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x5521a1=function(_0x4a2d0f){var _0x3d55da=_0x4a2d0f[_0xca2f('0x1f')](_0xca2f('0x20'));var _0x4f83ac=_0x3d55da[_0xca2f('0x21')]('.qd-am-banner');var _0x396cc3=_0x3d55da[_0xca2f('0x21')](_0xca2f('0x22'));if(_0x4f83ac[_0xca2f('0x23')]||_0x396cc3[_0xca2f('0x23')])_0x4f83ac[_0xca2f('0x24')]()[_0xca2f('0x12')]('qd-am-banner-wrapper'),_0x396cc3['parent']()[_0xca2f('0x12')](_0xca2f('0x25')),_0x5e59c2[_0xca2f('0x26')]({'url':_0x144a38[_0xca2f('0x27')],'dataType':_0xca2f('0x28'),'success':function(_0x350302){var _0x32917e=_0x5e59c2(_0x350302);_0x4f83ac['each'](function(){var _0x350302=_0x5e59c2(this);var _0x200ccd=_0x32917e[_0xca2f('0x1f')](_0xca2f('0x29')+_0x350302[_0xca2f('0x2a')](_0xca2f('0x2b'))+'\x27]');_0x200ccd[_0xca2f('0x23')]&&(_0x200ccd[_0xca2f('0x11')](function(){_0x5e59c2(this)[_0xca2f('0x0')]('.box-banner')[_0xca2f('0x2c')]()['insertBefore'](_0x350302);}),_0x350302[_0xca2f('0x2d')]());})[_0xca2f('0x12')](_0xca2f('0x2e'));_0x396cc3[_0xca2f('0x11')](function(){var _0x350302={};var _0x5c3e79=_0x5e59c2(this);_0x32917e[_0xca2f('0x1f')]('h2')['each'](function(){if(_0x5e59c2(this)[_0xca2f('0x2f')]()[_0xca2f('0x30')]()[_0xca2f('0xc')]()==_0x5c3e79[_0xca2f('0x2a')](_0xca2f('0x2b'))['trim']()[_0xca2f('0xc')]())return _0x350302=_0x5e59c2(this),!0x1;});_0x350302[_0xca2f('0x23')]&&(_0x350302['each'](function(){_0x5e59c2(this)['getParent'](_0xca2f('0x31'))[_0xca2f('0x2c')]()['insertBefore'](_0x5c3e79);}),_0x5c3e79[_0xca2f('0x2d')]());})[_0xca2f('0x12')](_0xca2f('0x2e'));},'error':function(){_0x206344(_0xca2f('0x32')+_0x144a38[_0xca2f('0x27')]+_0xca2f('0x33'));},'complete':function(){_0x144a38[_0xca2f('0x34')][_0xca2f('0x35')](this);_0x5e59c2(window)[_0xca2f('0x36')](_0xca2f('0x37'),_0x4a2d0f);},'clearQueueDelay':0xbb8});};_0x5e59c2['QD_amazingMenu']=function(_0x49e3f5){var _0x2718b8=_0x49e3f5[_0xca2f('0x1f')](_0xca2f('0x38'))['each'](function(){var _0xa07cdc=_0x5e59c2(this);if(!_0xa07cdc[_0xca2f('0x23')])return _0x206344([_0xca2f('0x39'),_0x49e3f5],_0xca2f('0x3a'));_0xa07cdc[_0xca2f('0x1f')](_0xca2f('0x3b'))['parent']()[_0xca2f('0x12')](_0xca2f('0x3c'));_0xa07cdc[_0xca2f('0x1f')]('li')[_0xca2f('0x11')](function(){var _0x19762a=_0x5e59c2(this);var _0x775b83=_0x19762a[_0xca2f('0x3d')](':not(ul)');_0x775b83[_0xca2f('0x23')]&&_0x19762a[_0xca2f('0x12')](_0xca2f('0x3e')+_0x775b83['first']()[_0xca2f('0x2f')]()[_0xca2f('0x30')]()[_0xca2f('0x3f')]()[_0xca2f('0x17')](/\./g,'')[_0xca2f('0x17')](/\s/g,'-')[_0xca2f('0xc')]());});var _0x132bfd=_0xa07cdc[_0xca2f('0x1f')](_0xca2f('0x40'))['qdAmAddNdx']();_0xa07cdc['addClass'](_0xca2f('0x41'));_0x132bfd=_0x132bfd[_0xca2f('0x1f')]('>ul');_0x132bfd[_0xca2f('0x11')](function(){var _0x3a81b9=_0x5e59c2(this);_0x3a81b9['find']('>li')[_0xca2f('0x10')]()[_0xca2f('0x12')](_0xca2f('0x42'));_0x3a81b9['addClass'](_0xca2f('0x43'));_0x3a81b9[_0xca2f('0x24')]()[_0xca2f('0x12')]('qd-am-dropdown');});_0x132bfd[_0xca2f('0x12')](_0xca2f('0x44'));var _0x27010e=0x0,_0x228263=function(_0x4e30b1){_0x27010e+=0x1;_0x4e30b1=_0x4e30b1[_0xca2f('0x3d')]('li')[_0xca2f('0x3d')]('*');_0x4e30b1[_0xca2f('0x23')]&&(_0x4e30b1['addClass'](_0xca2f('0x45')+_0x27010e),_0x228263(_0x4e30b1));};_0x228263(_0xa07cdc);_0xa07cdc[_0xca2f('0x46')](_0xa07cdc['find']('ul'))[_0xca2f('0x11')](function(){var _0x485a3f=_0x5e59c2(this);_0x485a3f['addClass'](_0xca2f('0x47')+_0x485a3f[_0xca2f('0x3d')]('li')['length']+_0xca2f('0x48'));});});_0x5521a1(_0x2718b8);_0x144a38['callback']['call'](this);_0x5e59c2(window)[_0xca2f('0x36')](_0xca2f('0x49'),_0x49e3f5);};_0x5e59c2['fn']['QD_amazingMenu']=function(_0xca2b2){var _0xe268ff=_0x5e59c2(this);if(!_0xe268ff[_0xca2f('0x23')])return _0xe268ff;_0x144a38=_0x5e59c2['extend']({},_0x1e8010,_0xca2b2);_0xe268ff[_0xca2f('0x4a')]=new _0x5e59c2[(_0xca2f('0x3'))](_0x5e59c2(this));return _0xe268ff;};_0x5e59c2(function(){_0x5e59c2(_0xca2f('0x4b'))[_0xca2f('0x3')]();});}}(this));

/* Quatro Digital Smart Cart */
var _0xedd9=['.plural','addClass','removeClass','qd-emptyCart','$this','O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','cartTotalE','html','total','cartQttE','find','cartQtt','itemsTextE','itemsText','smartCheckout','_QuatroDigital_DropDown','vtexjs','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','QD_checkoutQueue','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','trigger','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','Callbacks','fire','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','input.buy-in-page-quantity','javascript:','.productQuickView','Produto\x20adicionado\x20ao\x20carrinho!','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','location','href','body','#produto,\x20.produto','QD_buyButton','isSmartCheckout','qd-bb-click-active','click.qd_bb_buy_sc','clickBuySmartCheckout','preventDefault','each','qd-sbb-on','.btn-add-buy-button-asynchronous','.remove-href','qd-bb-active','children','.qd-bb-productAdded','isProductPage','selector','_Quatro_Digital_dropDown','prodAdd','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','buyButton','---','qd-bb-itemAddBuyButtonWrapper','qd-bb-itemAddCartWrapper','timeRemoveNewItemClass','função\x20descontinuada','getCartInfoByUrl','allowUpdate','autoWatchBuyButton','unbind','bind','mouseenter.qd_bb_buy_sc','click','indexOf','selectSkuMsg','?redirect=false&','execDefaultAction','redirect=false','redirect=true','queue','buyIfQuantityZeroed','test','match','push','productPageCallback','buyButtonClickCallback','split','pop','asyncCallback','cartProductAdded.vtex','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','QuatroDigital.qd_bb_prod_add','ajaxStop','Oooops!\x20','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','QD_dropDownCart','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','off','keyup.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20input','val','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','mouseleave.qd_ddc_hover','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','emptyCart','cartContainer','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','.qd-ddc-infoAllTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','.qd-ddc-wrapper','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','cartIsEmpty','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','qd-ddc-','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','content','quantity','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','address','postalCode','actionButtons','[data-sku=\x27','lastSku','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','insertProdImg','load','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','data-sku','changeQantity','data-sku-index','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantity','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','keyCode','.qd-ddc-remove','click.qd_ddc_remove','removeProduct','stop','slideUp','qdDdcLastPostalCode','calculateShipping','BRA','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','.qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','prepend','qd-bap-item-added','.qdDdcContainer','QD_smartCart','dropDown','smartCart','getParent','closest','replace','abs','undefined','pow','round','toFixed','length','join','function','trim','prototype','capitalize','charAt','toUpperCase','slice','toLowerCase','qdAjax','jquery','000','error','extend','GET','data','url','jqXHR','ajax','done','success','fail','always','complete','clearQueueDelay','message','version','simpleCart','checkout','getOrderForm','call','QuatroDigital_simpleCart','ajaxStopOn','object','alerta','warn','[Simple\x20Cart]\x0a','info','add','elements','QD_simpleCart','.qd_cart_qtt','.qd_items_text','attr','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','Shipping','value','currencySymbol','shipping','allTotal','qtt','showQuantityByItems','items','callback','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','filter','.singular','show'];(function(_0x484e36,_0x4482d8){var _0xafc85d=function(_0xaba9c8){while(--_0xaba9c8){_0x484e36['push'](_0x484e36['shift']());}};_0xafc85d(++_0x4482d8);}(_0xedd9,0xfc));var _0x9edd=function(_0x4911e1,_0x2c4165){_0x4911e1=_0x4911e1-0x0;var _0x430c9a=_0xedd9[_0x4911e1];return _0x430c9a;};(function(_0x265eb8){_0x265eb8['fn'][_0x9edd('0x0')]=_0x265eb8['fn'][_0x9edd('0x1')];}(jQuery));function qd_number_format(_0x2af857,_0x2c16b8,_0x3b51bc,_0x127cbe){_0x2af857=(_0x2af857+'')[_0x9edd('0x2')](/[^0-9+\-Ee.]/g,'');_0x2af857=isFinite(+_0x2af857)?+_0x2af857:0x0;_0x2c16b8=isFinite(+_0x2c16b8)?Math[_0x9edd('0x3')](_0x2c16b8):0x0;_0x127cbe='undefined'===typeof _0x127cbe?',':_0x127cbe;_0x3b51bc=_0x9edd('0x4')===typeof _0x3b51bc?'.':_0x3b51bc;var _0x34c1a7='',_0x34c1a7=function(_0x5319f7,_0xf0b2d8){var _0x2c16b8=Math[_0x9edd('0x5')](0xa,_0xf0b2d8);return''+(Math[_0x9edd('0x6')](_0x5319f7*_0x2c16b8)/_0x2c16b8)[_0x9edd('0x7')](_0xf0b2d8);},_0x34c1a7=(_0x2c16b8?_0x34c1a7(_0x2af857,_0x2c16b8):''+Math[_0x9edd('0x6')](_0x2af857))['split']('.');0x3<_0x34c1a7[0x0][_0x9edd('0x8')]&&(_0x34c1a7[0x0]=_0x34c1a7[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x127cbe));(_0x34c1a7[0x1]||'')[_0x9edd('0x8')]<_0x2c16b8&&(_0x34c1a7[0x1]=_0x34c1a7[0x1]||'',_0x34c1a7[0x1]+=Array(_0x2c16b8-_0x34c1a7[0x1][_0x9edd('0x8')]+0x1)['join']('0'));return _0x34c1a7[_0x9edd('0x9')](_0x3b51bc);};_0x9edd('0xa')!==typeof String['prototype'][_0x9edd('0xb')]&&(String[_0x9edd('0xc')][_0x9edd('0xb')]=function(){return this[_0x9edd('0x2')](/^\s+|\s+$/g,'');});_0x9edd('0xa')!=typeof String[_0x9edd('0xc')][_0x9edd('0xd')]&&(String[_0x9edd('0xc')]['capitalize']=function(){return this[_0x9edd('0xe')](0x0)[_0x9edd('0xf')]()+this[_0x9edd('0x10')](0x1)[_0x9edd('0x11')]();});(function(_0x13b6b6){if(_0x9edd('0xa')!==typeof _0x13b6b6[_0x9edd('0x12')]){var _0x75a4ab={};_0x13b6b6['qdAjaxQueue']=_0x75a4ab;0x96>parseInt((_0x13b6b6['fn'][_0x9edd('0x13')][_0x9edd('0x2')](/[^0-9]+/g,'')+_0x9edd('0x14'))['slice'](0x0,0x3),0xa)&&console&&_0x9edd('0xa')==typeof console[_0x9edd('0x15')]&&console[_0x9edd('0x15')]();_0x13b6b6['qdAjax']=function(_0x43dc70){try{var _0x5d879c=_0x13b6b6[_0x9edd('0x16')]({},{'url':'','type':_0x9edd('0x17'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x43dc70);var _0x4bdb88='object'===typeof _0x5d879c[_0x9edd('0x18')]?JSON['stringify'](_0x5d879c[_0x9edd('0x18')]):_0x5d879c['data']['toString']();var _0x356751=encodeURIComponent(_0x5d879c[_0x9edd('0x19')]+'|'+_0x5d879c['type']+'|'+_0x4bdb88);_0x75a4ab[_0x356751]=_0x75a4ab[_0x356751]||{};'undefined'==typeof _0x75a4ab[_0x356751][_0x9edd('0x1a')]?_0x75a4ab[_0x356751][_0x9edd('0x1a')]=_0x13b6b6[_0x9edd('0x1b')](_0x5d879c):(_0x75a4ab[_0x356751]['jqXHR'][_0x9edd('0x1c')](_0x5d879c[_0x9edd('0x1d')]),_0x75a4ab[_0x356751][_0x9edd('0x1a')][_0x9edd('0x1e')](_0x5d879c[_0x9edd('0x15')]),_0x75a4ab[_0x356751]['jqXHR'][_0x9edd('0x1f')](_0x5d879c[_0x9edd('0x20')]));_0x75a4ab[_0x356751][_0x9edd('0x1a')][_0x9edd('0x1f')](function(){isNaN(parseInt(_0x5d879c[_0x9edd('0x21')]))||setTimeout(function(){_0x75a4ab[_0x356751]['jqXHR']=void 0x0;},_0x5d879c['clearQueueDelay']);});return _0x75a4ab[_0x356751][_0x9edd('0x1a')];}catch(_0xfeca7b){_0x9edd('0x4')!==typeof console&&_0x9edd('0xa')===typeof console[_0x9edd('0x15')]&&console['error']('Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20'+_0xfeca7b[_0x9edd('0x22')]);}};_0x13b6b6[_0x9edd('0x12')][_0x9edd('0x23')]='4.0';}}(jQuery));(function(_0x238b22){_0x238b22['fn'][_0x9edd('0x0')]=_0x238b22['fn'][_0x9edd('0x1')];}(jQuery));(function(){var _0x41af53=jQuery;if('function'!==typeof _0x41af53['fn'][_0x9edd('0x24')]){_0x41af53(function(){var _0x3fb556=vtexjs[_0x9edd('0x25')][_0x9edd('0x26')];vtexjs[_0x9edd('0x25')][_0x9edd('0x26')]=function(){return _0x3fb556[_0x9edd('0x27')]();};});try{window[_0x9edd('0x28')]=window[_0x9edd('0x28')]||{};window[_0x9edd('0x28')][_0x9edd('0x29')]=!0x1;_0x41af53['fn'][_0x9edd('0x24')]=function(_0x6907a5,_0xa55906,_0x1a6c23){var _0x5af178=function(_0x1453d2,_0x259259){if(_0x9edd('0x2a')===typeof console){var _0x5d1707=_0x9edd('0x2a')===typeof _0x1453d2;_0x9edd('0x4')!==typeof _0x259259&&_0x9edd('0x2b')===_0x259259[_0x9edd('0x11')]()?_0x5d1707?console[_0x9edd('0x2c')](_0x9edd('0x2d'),_0x1453d2[0x0],_0x1453d2[0x1],_0x1453d2[0x2],_0x1453d2[0x3],_0x1453d2[0x4],_0x1453d2[0x5],_0x1453d2[0x6],_0x1453d2[0x7]):console[_0x9edd('0x2c')](_0x9edd('0x2d')+_0x1453d2):_0x9edd('0x4')!==typeof _0x259259&&_0x9edd('0x2e')===_0x259259[_0x9edd('0x11')]()?_0x5d1707?console[_0x9edd('0x2e')](_0x9edd('0x2d'),_0x1453d2[0x0],_0x1453d2[0x1],_0x1453d2[0x2],_0x1453d2[0x3],_0x1453d2[0x4],_0x1453d2[0x5],_0x1453d2[0x6],_0x1453d2[0x7]):console[_0x9edd('0x2e')]('[Simple\x20Cart]\x0a'+_0x1453d2):_0x5d1707?console[_0x9edd('0x15')]('[Simple\x20Cart]\x0a',_0x1453d2[0x0],_0x1453d2[0x1],_0x1453d2[0x2],_0x1453d2[0x3],_0x1453d2[0x4],_0x1453d2[0x5],_0x1453d2[0x6],_0x1453d2[0x7]):console[_0x9edd('0x15')](_0x9edd('0x2d')+_0x1453d2);}};var _0x10d6fd=_0x41af53(this);_0x9edd('0x2a')===typeof _0x6907a5?_0xa55906=_0x6907a5:(_0x6907a5=_0x6907a5||!0x1,_0x10d6fd=_0x10d6fd[_0x9edd('0x2f')](_0x41af53['QD_simpleCart'][_0x9edd('0x30')]));if(!_0x10d6fd[_0x9edd('0x8')])return _0x10d6fd;_0x41af53[_0x9edd('0x31')][_0x9edd('0x30')]=_0x41af53[_0x9edd('0x31')][_0x9edd('0x30')][_0x9edd('0x2f')](_0x10d6fd);_0x1a6c23=_0x9edd('0x4')===typeof _0x1a6c23?!0x1:_0x1a6c23;var _0x1ccee8={'cartQtt':_0x9edd('0x32'),'cartTotal':'.qd_cart_total','itemsText':_0x9edd('0x33'),'currencySymbol':(_0x41af53('meta[name=currency]')[_0x9edd('0x34')]('content')||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x30883e=_0x41af53[_0x9edd('0x16')]({},_0x1ccee8,_0xa55906);var _0x34e9d2=_0x41af53('');_0x10d6fd['each'](function(){var _0x2e85aa=_0x41af53(this);_0x2e85aa[_0x9edd('0x18')](_0x9edd('0x35'))||_0x2e85aa['data'](_0x9edd('0x35'),_0x30883e);});var _0x51ad91=function(_0x1fc4fb){window[_0x9edd('0x36')]=window['_QuatroDigital_CartData']||{};for(var _0x6907a5=0x0,_0x40fdfb=0x0,_0x389f51=0x0;_0x389f51<_0x1fc4fb[_0x9edd('0x37')]['length'];_0x389f51++)_0x9edd('0x38')==_0x1fc4fb['totalizers'][_0x389f51]['id']&&(_0x40fdfb+=_0x1fc4fb[_0x9edd('0x37')][_0x389f51][_0x9edd('0x39')]),_0x6907a5+=_0x1fc4fb['totalizers'][_0x389f51][_0x9edd('0x39')];window['_QuatroDigital_CartData']['total']=_0x30883e[_0x9edd('0x3a')]+qd_number_format(_0x6907a5/0x64,0x2,',','.');window[_0x9edd('0x36')][_0x9edd('0x3b')]=_0x30883e[_0x9edd('0x3a')]+qd_number_format(_0x40fdfb/0x64,0x2,',','.');window[_0x9edd('0x36')][_0x9edd('0x3c')]=_0x30883e[_0x9edd('0x3a')]+qd_number_format((_0x6907a5+_0x40fdfb)/0x64,0x2,',','.');window[_0x9edd('0x36')][_0x9edd('0x3d')]=0x0;if(_0x30883e[_0x9edd('0x3e')])for(_0x389f51=0x0;_0x389f51<_0x1fc4fb[_0x9edd('0x3f')][_0x9edd('0x8')];_0x389f51++)window[_0x9edd('0x36')][_0x9edd('0x3d')]+=_0x1fc4fb[_0x9edd('0x3f')][_0x389f51]['quantity'];else window[_0x9edd('0x36')][_0x9edd('0x3d')]=_0x1fc4fb[_0x9edd('0x3f')][_0x9edd('0x8')]||0x0;try{window[_0x9edd('0x36')][_0x9edd('0x40')]&&window[_0x9edd('0x36')]['callback']['fire']&&window['_QuatroDigital_CartData'][_0x9edd('0x40')]['fire']();}catch(_0x8b1fdb){_0x5af178(_0x9edd('0x41'));}_0x16951a(_0x34e9d2);};var _0x2b06d3=function(_0x8db801,_0x367791){0x1===_0x8db801?_0x367791['hide']()[_0x9edd('0x42')](_0x9edd('0x43'))[_0x9edd('0x44')]():_0x367791['hide']()[_0x9edd('0x42')](_0x9edd('0x45'))[_0x9edd('0x44')]();};var _0x293b03=function(_0x1d78c4){0x1>_0x1d78c4?_0x10d6fd[_0x9edd('0x46')]('qd-emptyCart'):_0x10d6fd[_0x9edd('0x47')](_0x9edd('0x48'));};var _0x596b71=function(_0xb93816,_0x8d8701){var _0x4bb324=parseInt(window[_0x9edd('0x36')][_0x9edd('0x3d')],0xa);_0x8d8701[_0x9edd('0x49')]['show']();isNaN(_0x4bb324)&&(_0x5af178(_0x9edd('0x4a'),_0x9edd('0x2b')),_0x4bb324=0x0);_0x8d8701[_0x9edd('0x4b')][_0x9edd('0x4c')](window['_QuatroDigital_CartData'][_0x9edd('0x4d')]);_0x8d8701[_0x9edd('0x4e')][_0x9edd('0x4c')](_0x4bb324);_0x2b06d3(_0x4bb324,_0x8d8701['itemsTextE']);_0x293b03(_0x4bb324);};var _0x16951a=function(_0x21f6ce){_0x10d6fd['each'](function(){var _0x8e59bd={};var _0x4e2aaf=_0x41af53(this);_0x6907a5&&_0x4e2aaf[_0x9edd('0x18')](_0x9edd('0x35'))&&_0x41af53[_0x9edd('0x16')](_0x30883e,_0x4e2aaf[_0x9edd('0x18')](_0x9edd('0x35')));_0x8e59bd[_0x9edd('0x49')]=_0x4e2aaf;_0x8e59bd[_0x9edd('0x4e')]=_0x4e2aaf[_0x9edd('0x4f')](_0x30883e[_0x9edd('0x50')])||_0x34e9d2;_0x8e59bd[_0x9edd('0x4b')]=_0x4e2aaf[_0x9edd('0x4f')](_0x30883e['cartTotal'])||_0x34e9d2;_0x8e59bd[_0x9edd('0x51')]=_0x4e2aaf[_0x9edd('0x4f')](_0x30883e[_0x9edd('0x52')])||_0x34e9d2;_0x8e59bd['emptyElem']=_0x4e2aaf[_0x9edd('0x4f')](_0x30883e['emptyCart'])||_0x34e9d2;_0x596b71(_0x21f6ce,_0x8e59bd);_0x4e2aaf['addClass']('qd-sc-populated');});};(function(){if(_0x30883e[_0x9edd('0x53')]){window[_0x9edd('0x54')]=window[_0x9edd('0x54')]||{};if(_0x9edd('0x4')!==typeof window['_QuatroDigital_DropDown']['getOrderForm']&&(_0x1a6c23||!_0x6907a5))return _0x51ad91(window['_QuatroDigital_DropDown'][_0x9edd('0x26')]);if(_0x9edd('0x2a')!==typeof window[_0x9edd('0x55')]||_0x9edd('0x4')===typeof window[_0x9edd('0x55')][_0x9edd('0x25')])if(_0x9edd('0x2a')===typeof vtex&&_0x9edd('0x2a')===typeof vtex['checkout']&&_0x9edd('0x4')!==typeof vtex['checkout'][_0x9edd('0x56')])new vtex[(_0x9edd('0x25'))]['SDK']();else return _0x5af178(_0x9edd('0x57'));_0x41af53[_0x9edd('0x58')]([_0x9edd('0x3f'),'totalizers',_0x9edd('0x59')],{'done':function(_0x2e1ce3){_0x51ad91(_0x2e1ce3);window[_0x9edd('0x54')][_0x9edd('0x26')]=_0x2e1ce3;},'fail':function(_0x1720b1){_0x5af178([_0x9edd('0x5a'),_0x1720b1]);}});}else alert('Esta\x20é\x20uma\x20função\x20descontinuada\x20=/');}());_0x30883e['callback']();_0x41af53(window)[_0x9edd('0x5b')]('simpleCartCallback.quatro_digital');return _0x10d6fd;};_0x41af53[_0x9edd('0x31')]={'elements':_0x41af53('')};_0x41af53(function(){var _0x3e9a3e;_0x9edd('0xa')===typeof window[_0x9edd('0x5c')]&&(_0x3e9a3e=window['ajaxRequestbuyButtonAsynchronous'],window[_0x9edd('0x5c')]=function(_0x507cce,_0x3e5dca,_0x344692,_0xc6bde6,_0x5ca123){_0x3e9a3e[_0x9edd('0x27')](this,_0x507cce,_0x3e5dca,_0x344692,_0xc6bde6,function(){'function'===typeof _0x5ca123&&_0x5ca123();_0x41af53[_0x9edd('0x31')][_0x9edd('0x30')]['each'](function(){var _0x236b82=_0x41af53(this);_0x236b82['simpleCart'](_0x236b82[_0x9edd('0x18')](_0x9edd('0x35')));});});});});var _0x307a61=window['ReloadItemsCart']||void 0x0;window[_0x9edd('0x5d')]=function(_0x321485){_0x41af53['fn'][_0x9edd('0x24')](!0x0);_0x9edd('0xa')===typeof _0x307a61?_0x307a61[_0x9edd('0x27')](this,_0x321485):alert(_0x321485);};_0x41af53(function(){var _0x4d8fbb=_0x41af53('.qd_cart_auto');_0x4d8fbb[_0x9edd('0x8')]&&_0x4d8fbb[_0x9edd('0x24')]();});_0x41af53(function(){_0x41af53(window)['bind']('productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex',function(){_0x41af53['fn']['simpleCart'](!0x0);});});}catch(_0x1bc89b){'undefined'!==typeof console&&'function'===typeof console[_0x9edd('0x15')]&&console[_0x9edd('0x15')]('Oooops!\x20',_0x1bc89b);}}}());(function(){var _0xb9ebeb=function(_0x57695c,_0x37b018){if(_0x9edd('0x2a')===typeof console){var _0x4c8d06=_0x9edd('0x2a')===typeof _0x57695c;_0x9edd('0x4')!==typeof _0x37b018&&'alerta'===_0x37b018[_0x9edd('0x11')]()?_0x4c8d06?console[_0x9edd('0x2c')](_0x9edd('0x5e'),_0x57695c[0x0],_0x57695c[0x1],_0x57695c[0x2],_0x57695c[0x3],_0x57695c[0x4],_0x57695c[0x5],_0x57695c[0x6],_0x57695c[0x7]):console[_0x9edd('0x2c')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a'+_0x57695c):_0x9edd('0x4')!==typeof _0x37b018&&'info'===_0x37b018[_0x9edd('0x11')]()?_0x4c8d06?console[_0x9edd('0x2e')](_0x9edd('0x5e'),_0x57695c[0x0],_0x57695c[0x1],_0x57695c[0x2],_0x57695c[0x3],_0x57695c[0x4],_0x57695c[0x5],_0x57695c[0x6],_0x57695c[0x7]):console['info'](_0x9edd('0x5e')+_0x57695c):_0x4c8d06?console[_0x9edd('0x15')](_0x9edd('0x5e'),_0x57695c[0x0],_0x57695c[0x1],_0x57695c[0x2],_0x57695c[0x3],_0x57695c[0x4],_0x57695c[0x5],_0x57695c[0x6],_0x57695c[0x7]):console[_0x9edd('0x15')](_0x9edd('0x5e')+_0x57695c);}},_0x11e082=null,_0x34dff5={},_0x5b3758={},_0x34b229={};$[_0x9edd('0x58')]=function(_0x3fa4a9,_0x512d3a){if(null===_0x11e082)if('object'===typeof window[_0x9edd('0x55')]&&_0x9edd('0x4')!==typeof window[_0x9edd('0x55')][_0x9edd('0x25')])_0x11e082=window[_0x9edd('0x55')]['checkout'];else return _0xb9ebeb(_0x9edd('0x5f'));var _0x5d56a=$[_0x9edd('0x16')]({'done':function(){},'fail':function(){}},_0x512d3a),_0x30d180=_0x3fa4a9[_0x9edd('0x9')](';'),_0x544027=function(){_0x34dff5[_0x30d180]['add'](_0x5d56a[_0x9edd('0x1c')]);_0x5b3758[_0x30d180][_0x9edd('0x2f')](_0x5d56a['fail']);};_0x34b229[_0x30d180]?_0x544027():(_0x34dff5[_0x30d180]=$[_0x9edd('0x60')](),_0x5b3758[_0x30d180]=$[_0x9edd('0x60')](),_0x544027(),_0x34b229[_0x30d180]=!0x0,_0x11e082['getOrderForm'](_0x3fa4a9)[_0x9edd('0x1c')](function(_0x4b8cbc){_0x34b229[_0x30d180]=!0x1;_0x34dff5[_0x30d180]['fire'](_0x4b8cbc);})[_0x9edd('0x1e')](function(_0x3959a7){_0x34b229[_0x30d180]=!0x1;_0x5b3758[_0x30d180][_0x9edd('0x61')](_0x3959a7);}));};}());(function(_0x5b56c7){try{var _0x3c7df3=jQuery,_0x286e47,_0x56d1d9=_0x3c7df3({}),_0x1832c0=function(_0xf8da8d,_0x1ad198){if('object'===typeof console&&'undefined'!==typeof console[_0x9edd('0x15')]&&'undefined'!==typeof console[_0x9edd('0x2e')]&&_0x9edd('0x4')!==typeof console[_0x9edd('0x2c')]){var _0x3cfd35;_0x9edd('0x2a')===typeof _0xf8da8d?(_0xf8da8d[_0x9edd('0x62')](_0x9edd('0x63')),_0x3cfd35=_0xf8da8d):_0x3cfd35=[_0x9edd('0x63')+_0xf8da8d];if(_0x9edd('0x4')===typeof _0x1ad198||'alerta'!==_0x1ad198[_0x9edd('0x11')]()&&_0x9edd('0x64')!==_0x1ad198[_0x9edd('0x11')]())if(_0x9edd('0x4')!==typeof _0x1ad198&&_0x9edd('0x2e')===_0x1ad198[_0x9edd('0x11')]())try{console[_0x9edd('0x2e')]['apply'](console,_0x3cfd35);}catch(_0x25e3e7){try{console[_0x9edd('0x2e')](_0x3cfd35['join']('\x0a'));}catch(_0x26c11a){}}else try{console[_0x9edd('0x15')]['apply'](console,_0x3cfd35);}catch(_0x304e56){try{console[_0x9edd('0x15')](_0x3cfd35[_0x9edd('0x9')]('\x0a'));}catch(_0x55d112){}}else try{console[_0x9edd('0x2c')][_0x9edd('0x65')](console,_0x3cfd35);}catch(_0x3f04d3){try{console['warn'](_0x3cfd35['join']('\x0a'));}catch(_0x5378ca){}}}},_0x1f55ea={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':'.productInformationWrapper\x20\x20a.buy-button','buyQtt':_0x9edd('0x66'),'selectSkuMsg':_0x9edd('0x67'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x179b7f,_0x521810,_0x53e141){_0x3c7df3('body')['is'](_0x9edd('0x68'))&&(_0x9edd('0x1d')===_0x521810?alert(_0x9edd('0x69')):(alert(_0x9edd('0x6a')),(_0x9edd('0x2a')===typeof parent?parent:document)[_0x9edd('0x6b')][_0x9edd('0x6c')]=_0x53e141));},'isProductPage':function(){return _0x3c7df3(_0x9edd('0x6d'))['is'](_0x9edd('0x6e'));},'execDefaultAction':function(_0x2f2c34){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x3c7df3[_0x9edd('0x6f')]=function(_0x2670ff,_0x4cfa99){function _0x367fc6(_0x29f3b2){_0x286e47[_0x9edd('0x70')]?_0x29f3b2[_0x9edd('0x18')](_0x9edd('0x71'))||(_0x29f3b2[_0x9edd('0x18')](_0x9edd('0x71'),0x1),_0x29f3b2['on'](_0x9edd('0x72'),function(_0x4a7889){if(!_0x286e47['allowBuyClick']())return!0x0;if(!0x0!==_0x10e427[_0x9edd('0x73')]['call'](this))return _0x4a7889[_0x9edd('0x74')](),!0x1;})):alert('Método\x20descontinuado!');}function _0x21c35f(_0x3f2452){_0x3f2452=_0x3f2452||_0x3c7df3(_0x286e47['buyButton']);_0x3f2452[_0x9edd('0x75')](function(){var _0x3f2452=_0x3c7df3(this);_0x3f2452['is']('.qd-sbb-on')||(_0x3f2452[_0x9edd('0x46')](_0x9edd('0x76')),_0x3f2452['is'](_0x9edd('0x77'))&&!_0x3f2452['is'](_0x9edd('0x78'))||_0x3f2452[_0x9edd('0x18')]('qd-bb-active')||(_0x3f2452[_0x9edd('0x18')](_0x9edd('0x79'),0x1),_0x3f2452[_0x9edd('0x7a')](_0x9edd('0x7b'))[_0x9edd('0x8')]||_0x3f2452['append']('<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>'),_0x3f2452['is']('.buy-in-page-button')&&_0x286e47['isProductPage']()&&_0xa8d944['call'](_0x3f2452),_0x367fc6(_0x3f2452)));});_0x286e47[_0x9edd('0x7c')]()&&!_0x3f2452['length']&&_0x1832c0('Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27'+_0x3f2452[_0x9edd('0x7d')]+'\x27.',_0x9edd('0x2e'));}var _0x10b1ed=_0x3c7df3(_0x2670ff);var _0x10e427=this;window[_0x9edd('0x7e')]=window[_0x9edd('0x7e')]||{};window[_0x9edd('0x36')]=window[_0x9edd('0x36')]||{};_0x10e427[_0x9edd('0x7f')]=function(_0x25a8bd,_0x5b5ae9){_0x10b1ed[_0x9edd('0x46')](_0x9edd('0x80'));_0x3c7df3(_0x9edd('0x6d'))[_0x9edd('0x46')](_0x9edd('0x81'));var _0x23e925=_0x3c7df3(_0x286e47[_0x9edd('0x82')])[_0x9edd('0x42')]('[href=\x27'+(_0x25a8bd['attr'](_0x9edd('0x6c'))||_0x9edd('0x83'))+'\x27]')[_0x9edd('0x2f')](_0x25a8bd);_0x23e925[_0x9edd('0x46')](_0x9edd('0x84'));setTimeout(function(){_0x10b1ed[_0x9edd('0x47')](_0x9edd('0x85'));_0x23e925[_0x9edd('0x47')](_0x9edd('0x84'));},_0x286e47[_0x9edd('0x86')]);window[_0x9edd('0x7e')][_0x9edd('0x26')]=void 0x0;if(_0x9edd('0x4')!==typeof _0x4cfa99&&_0x9edd('0xa')===typeof _0x4cfa99['getCartInfoByUrl'])return _0x286e47[_0x9edd('0x70')]||(_0x1832c0(_0x9edd('0x87')),_0x4cfa99['getCartInfoByUrl']()),window[_0x9edd('0x54')][_0x9edd('0x26')]=void 0x0,_0x4cfa99[_0x9edd('0x88')](function(_0x2b4d4c){window['_Quatro_Digital_dropDown'][_0x9edd('0x26')]=_0x2b4d4c;_0x3c7df3['fn'][_0x9edd('0x24')](!0x0,void 0x0,!0x0);},{'lastSku':_0x5b5ae9});window[_0x9edd('0x7e')][_0x9edd('0x89')]=!0x0;_0x3c7df3['fn'][_0x9edd('0x24')](!0x0);};(function(){if(_0x286e47['isSmartCheckout']&&_0x286e47[_0x9edd('0x8a')]){var _0x1c21d5=_0x3c7df3(_0x9edd('0x77'));_0x1c21d5[_0x9edd('0x8')]&&_0x21c35f(_0x1c21d5);}}());var _0xa8d944=function(){var _0x59927d=_0x3c7df3(this);'undefined'!==typeof _0x59927d[_0x9edd('0x18')]('buyButton')?(_0x59927d[_0x9edd('0x8b')]('click'),_0x367fc6(_0x59927d)):(_0x59927d[_0x9edd('0x8c')](_0x9edd('0x8d'),function(_0x39c037){_0x59927d[_0x9edd('0x8b')](_0x9edd('0x8e'));_0x367fc6(_0x59927d);_0x3c7df3(this)[_0x9edd('0x8b')](_0x39c037);}),_0x3c7df3(window)['load'](function(){_0x59927d[_0x9edd('0x8b')](_0x9edd('0x8e'));_0x367fc6(_0x59927d);_0x59927d[_0x9edd('0x8b')](_0x9edd('0x8d'));}));};_0x10e427[_0x9edd('0x73')]=function(){var _0x114527=_0x3c7df3(this),_0x2670ff=_0x114527[_0x9edd('0x34')]('href')||'';if(-0x1<_0x2670ff[_0x9edd('0x8f')](_0x286e47[_0x9edd('0x90')]))return!0x0;_0x2670ff=_0x2670ff[_0x9edd('0x2')](/redirect\=(false|true)/gi,'')[_0x9edd('0x2')]('?',_0x9edd('0x91'))[_0x9edd('0x2')](/\&\&/gi,'&');if(_0x286e47[_0x9edd('0x92')](_0x114527))return _0x114527[_0x9edd('0x34')](_0x9edd('0x6c'),_0x2670ff[_0x9edd('0x2')](_0x9edd('0x93'),_0x9edd('0x94'))),!0x0;_0x2670ff=_0x2670ff[_0x9edd('0x2')](/http.?:/i,'');_0x56d1d9[_0x9edd('0x95')](function(_0x299c69){if(!_0x286e47[_0x9edd('0x96')]&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0x9edd('0x97')](_0x2670ff))return _0x299c69();var _0x1c1852=function(_0x39c27f,_0x423662){var _0x21c35f=_0x2670ff[_0x9edd('0x98')](/sku\=([0-9]+)/gi),_0x495db0=[];if('object'===typeof _0x21c35f&&null!==_0x21c35f)for(var _0x4ca7e4=_0x21c35f[_0x9edd('0x8')]-0x1;0x0<=_0x4ca7e4;_0x4ca7e4--){var _0x108244=parseInt(_0x21c35f[_0x4ca7e4][_0x9edd('0x2')](/sku\=/gi,''));isNaN(_0x108244)||_0x495db0[_0x9edd('0x99')](_0x108244);}_0x286e47[_0x9edd('0x9a')][_0x9edd('0x27')](this,_0x39c27f,_0x423662,_0x2670ff);_0x10e427[_0x9edd('0x9b')][_0x9edd('0x27')](this,_0x39c27f,_0x423662,_0x2670ff,_0x495db0);_0x10e427[_0x9edd('0x7f')](_0x114527,_0x2670ff[_0x9edd('0x9c')]('ku=')[_0x9edd('0x9d')]()[_0x9edd('0x9c')]('&')['shift']());'function'===typeof _0x286e47[_0x9edd('0x9e')]&&_0x286e47[_0x9edd('0x9e')][_0x9edd('0x27')](this);_0x3c7df3(window)[_0x9edd('0x5b')]('productAddedToCart');_0x3c7df3(window)['trigger'](_0x9edd('0x9f'));};_0x286e47['fakeRequest']?(_0x1c1852(null,_0x9edd('0x1d')),_0x299c69()):_0x3c7df3[_0x9edd('0x1b')]({'url':_0x2670ff,'complete':_0x1c1852})[_0x9edd('0x1f')](function(){_0x299c69();});});};_0x10e427['buyButtonClickCallback']=function(_0x5cb572,_0x518144,_0xcfc45c,_0x1edaf9){try{_0x9edd('0x1d')===_0x518144&&'object'===typeof window[_0x9edd('0xa0')]&&_0x9edd('0xa')===typeof window['parent'][_0x9edd('0xa1')]&&window[_0x9edd('0xa0')]['_QuatroDigital_prodBuyCallback'](_0x5cb572,_0x518144,_0xcfc45c,_0x1edaf9);}catch(_0x5c9b3e){_0x1832c0(_0x9edd('0xa2'));}};_0x21c35f();_0x9edd('0xa')===typeof _0x286e47['callback']?_0x286e47[_0x9edd('0x40')][_0x9edd('0x27')](this):_0x1832c0('Callback\x20não\x20é\x20uma\x20função');};var _0x201d76=_0x3c7df3['Callbacks']();_0x3c7df3['fn'][_0x9edd('0x6f')]=function(_0x293d05,_0x23eb54){var _0x5b56c7=_0x3c7df3(this);_0x9edd('0x4')!==typeof _0x23eb54||_0x9edd('0x2a')!==typeof _0x293d05||_0x293d05 instanceof _0x3c7df3||(_0x23eb54=_0x293d05,_0x293d05=void 0x0);_0x286e47=_0x3c7df3['extend']({},_0x1f55ea,_0x23eb54);var _0x2fe810;_0x201d76[_0x9edd('0x2f')](function(){_0x5b56c7[_0x9edd('0x7a')]('.qd-bb-itemAddWrapper')[_0x9edd('0x8')]||_0x5b56c7['prepend'](_0x9edd('0xa3'));_0x2fe810=new _0x3c7df3[(_0x9edd('0x6f'))](_0x5b56c7,_0x293d05);});_0x201d76[_0x9edd('0x61')]();_0x3c7df3(window)['on'](_0x9edd('0xa4'),function(_0x534b06,_0x517c40,_0x4e9242){_0x2fe810[_0x9edd('0x7f')](_0x517c40,_0x4e9242);});return _0x3c7df3[_0x9edd('0x16')](_0x5b56c7,_0x2fe810);};var _0x314ca4=0x0;_0x3c7df3(document)['ajaxSend'](function(_0x41a761,_0x15da18,_0x2b7d6d){-0x1<_0x2b7d6d[_0x9edd('0x19')][_0x9edd('0x11')]()[_0x9edd('0x8f')]('/checkout/cart/add')&&(_0x314ca4=(_0x2b7d6d['url'][_0x9edd('0x98')](/sku\=([0-9]+)/i)||[''])[_0x9edd('0x9d')]());});_0x3c7df3(window)[_0x9edd('0x8c')]('productAddedToCart.qdSbbVtex',function(){_0x3c7df3(window)[_0x9edd('0x5b')](_0x9edd('0xa4'),[new _0x3c7df3(),_0x314ca4]);});_0x3c7df3(document)[_0x9edd('0xa5')](function(){_0x201d76[_0x9edd('0x61')]();});}catch(_0x524217){_0x9edd('0x4')!==typeof console&&'function'===typeof console[_0x9edd('0x15')]&&console[_0x9edd('0x15')](_0x9edd('0xa6'),_0x524217);}}(this));function qd_number_format(_0x33b798,_0x8f9d01,_0x48c2f2,_0x3e07f1){_0x33b798=(_0x33b798+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x33b798=isFinite(+_0x33b798)?+_0x33b798:0x0;_0x8f9d01=isFinite(+_0x8f9d01)?Math[_0x9edd('0x3')](_0x8f9d01):0x0;_0x3e07f1='undefined'===typeof _0x3e07f1?',':_0x3e07f1;_0x48c2f2=_0x9edd('0x4')===typeof _0x48c2f2?'.':_0x48c2f2;var _0x96e3d7='',_0x96e3d7=function(_0x3bc495,_0x575377){var _0x244dce=Math[_0x9edd('0x5')](0xa,_0x575377);return''+(Math[_0x9edd('0x6')](_0x3bc495*_0x244dce)/_0x244dce)[_0x9edd('0x7')](_0x575377);},_0x96e3d7=(_0x8f9d01?_0x96e3d7(_0x33b798,_0x8f9d01):''+Math[_0x9edd('0x6')](_0x33b798))[_0x9edd('0x9c')]('.');0x3<_0x96e3d7[0x0][_0x9edd('0x8')]&&(_0x96e3d7[0x0]=_0x96e3d7[0x0][_0x9edd('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x3e07f1));(_0x96e3d7[0x1]||'')[_0x9edd('0x8')]<_0x8f9d01&&(_0x96e3d7[0x1]=_0x96e3d7[0x1]||'',_0x96e3d7[0x1]+=Array(_0x8f9d01-_0x96e3d7[0x1][_0x9edd('0x8')]+0x1)[_0x9edd('0x9')]('0'));return _0x96e3d7[_0x9edd('0x9')](_0x48c2f2);}(function(){try{window[_0x9edd('0x36')]=window[_0x9edd('0x36')]||{},window[_0x9edd('0x36')][_0x9edd('0x40')]=window[_0x9edd('0x36')][_0x9edd('0x40')]||$[_0x9edd('0x60')]();}catch(_0x1bba37){_0x9edd('0x4')!==typeof console&&_0x9edd('0xa')===typeof console['error']&&console[_0x9edd('0x15')]('Oooops!\x20',_0x1bba37[_0x9edd('0x22')]);}}());(function(_0x3bc675){try{var _0x336918=jQuery,_0x8ab7e8=function(_0x126034,_0x5465fd){if(_0x9edd('0x2a')===typeof console&&'undefined'!==typeof console[_0x9edd('0x15')]&&_0x9edd('0x4')!==typeof console[_0x9edd('0x2e')]&&_0x9edd('0x4')!==typeof console[_0x9edd('0x2c')]){var _0xe8b842;'object'===typeof _0x126034?(_0x126034[_0x9edd('0x62')](_0x9edd('0xa7')),_0xe8b842=_0x126034):_0xe8b842=['[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'+_0x126034];if('undefined'===typeof _0x5465fd||'alerta'!==_0x5465fd['toLowerCase']()&&_0x9edd('0x64')!==_0x5465fd[_0x9edd('0x11')]())if(_0x9edd('0x4')!==typeof _0x5465fd&&_0x9edd('0x2e')===_0x5465fd[_0x9edd('0x11')]())try{console[_0x9edd('0x2e')][_0x9edd('0x65')](console,_0xe8b842);}catch(_0x337f46){try{console[_0x9edd('0x2e')](_0xe8b842[_0x9edd('0x9')]('\x0a'));}catch(_0x5510a1){}}else try{console[_0x9edd('0x15')]['apply'](console,_0xe8b842);}catch(_0x5b96f6){try{console[_0x9edd('0x15')](_0xe8b842[_0x9edd('0x9')]('\x0a'));}catch(_0x35e9b9){}}else try{console[_0x9edd('0x2c')][_0x9edd('0x65')](console,_0xe8b842);}catch(_0x4c352e){try{console[_0x9edd('0x2c')](_0xe8b842[_0x9edd('0x9')]('\x0a'));}catch(_0x2b2e4d){}}}};window[_0x9edd('0x54')]=window['_QuatroDigital_DropDown']||{};window[_0x9edd('0x54')][_0x9edd('0x89')]=!0x0;_0x336918[_0x9edd('0xa8')]=function(){};_0x336918['fn'][_0x9edd('0xa8')]=function(){return{'fn':new _0x336918()};};var _0x30a1c5=function(_0x29fef9){var _0x55052b={'t':_0x9edd('0xa9')};return function(_0x1eea2f){var _0xa8c1f7=function(_0x3de56e){return _0x3de56e;};var _0x47fa05=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x1eea2f=_0x1eea2f['d'+_0x47fa05[0x10]+'c'+_0x47fa05[0x11]+'m'+_0xa8c1f7(_0x47fa05[0x1])+'n'+_0x47fa05[0xd]]['l'+_0x47fa05[0x12]+'c'+_0x47fa05[0x0]+'ti'+_0xa8c1f7('o')+'n'];var _0x38869a=function(_0x989bb6){return escape(encodeURIComponent(_0x989bb6[_0x9edd('0x2')](/\./g,'¨')[_0x9edd('0x2')](/[a-zA-Z]/g,function(_0x23e1c7){return String[_0x9edd('0xaa')](('Z'>=_0x23e1c7?0x5a:0x7a)>=(_0x23e1c7=_0x23e1c7[_0x9edd('0xab')](0x0)+0xd)?_0x23e1c7:_0x23e1c7-0x1a);})));};var _0x3bc675=_0x38869a(_0x1eea2f[[_0x47fa05[0x9],_0xa8c1f7('o'),_0x47fa05[0xc],_0x47fa05[_0xa8c1f7(0xd)]]['join']('')]);_0x38869a=_0x38869a((window[['js',_0xa8c1f7('no'),'m',_0x47fa05[0x1],_0x47fa05[0x4]['toUpperCase'](),'ite'][_0x9edd('0x9')]('')]||_0x9edd('0x83'))+['.v',_0x47fa05[0xd],'e',_0xa8c1f7('x'),'co',_0xa8c1f7('mm'),_0x9edd('0xac'),_0x47fa05[0x1],'.c',_0xa8c1f7('o'),'m.',_0x47fa05[0x13],'r'][_0x9edd('0x9')](''));for(var _0x223c42 in _0x55052b){if(_0x38869a===_0x223c42+_0x55052b[_0x223c42]||_0x3bc675===_0x223c42+_0x55052b[_0x223c42]){var _0x2e9df8='tr'+_0x47fa05[0x11]+'e';break;}_0x2e9df8='f'+_0x47fa05[0x0]+'ls'+_0xa8c1f7(_0x47fa05[0x1])+'';}_0xa8c1f7=!0x1;-0x1<_0x1eea2f[[_0x47fa05[0xc],'e',_0x47fa05[0x0],'rc',_0x47fa05[0x9]][_0x9edd('0x9')]('')][_0x9edd('0x8f')](_0x9edd('0xad'))&&(_0xa8c1f7=!0x0);return[_0x2e9df8,_0xa8c1f7];}(_0x29fef9);}(window);if(!eval(_0x30a1c5[0x0]))return _0x30a1c5[0x1]?_0x8ab7e8(_0x9edd('0xae')):!0x1;_0x336918['QD_dropDownCart']=function(_0x336900,_0x56dc7e){var _0x4db9fc=_0x336918(_0x336900);if(!_0x4db9fc[_0x9edd('0x8')])return _0x4db9fc;var _0x15ae6=_0x336918[_0x9edd('0x16')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':'Finalizar\x20Compra','cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':'Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','continueShopping':'Continuar\x20Comprando','shippingForm':_0x9edd('0xaf')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x3b683f){return _0x3b683f[_0x9edd('0xb0')]||_0x3b683f['name'];},'callback':function(){},'callbackProductsList':function(){}},_0x56dc7e);_0x336918('');var _0x4bffdc=this;if(_0x15ae6[_0x9edd('0x53')]){var _0x231917=!0x1;'undefined'===typeof window[_0x9edd('0x55')]&&(_0x8ab7e8('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN'),_0x336918[_0x9edd('0x1b')]({'url':_0x9edd('0xb1'),'async':!0x1,'dataType':_0x9edd('0xb2'),'error':function(){_0x8ab7e8(_0x9edd('0xb3'));_0x231917=!0x0;}}));if(_0x231917)return _0x8ab7e8('A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!');}if(_0x9edd('0x2a')===typeof window[_0x9edd('0x55')]&&'undefined'!==typeof window[_0x9edd('0x55')][_0x9edd('0x25')])var _0x136868=window[_0x9edd('0x55')]['checkout'];else if(_0x9edd('0x2a')===typeof vtex&&_0x9edd('0x2a')===typeof vtex[_0x9edd('0x25')]&&_0x9edd('0x4')!==typeof vtex[_0x9edd('0x25')][_0x9edd('0x56')])_0x136868=new vtex[(_0x9edd('0x25'))]['SDK']();else return _0x8ab7e8(_0x9edd('0x57'));_0x4bffdc['cartContainer']=_0x9edd('0xb4');var _0x3a4b3c=function(_0x49cbc7){_0x336918(this)[_0x9edd('0xb5')](_0x49cbc7);_0x49cbc7[_0x9edd('0x4f')](_0x9edd('0xb6'))['add'](_0x336918(_0x9edd('0xb7')))['on'](_0x9edd('0xb8'),function(){_0x4db9fc[_0x9edd('0x47')]('qd-bb-lightBoxProdAdd');_0x336918(document[_0x9edd('0x6d')])['removeClass'](_0x9edd('0x81'));});_0x336918(document)[_0x9edd('0xb9')](_0x9edd('0xba'))['on'](_0x9edd('0xba'),function(_0x4edeed){0x1b==_0x4edeed['keyCode']&&(_0x4db9fc[_0x9edd('0x47')](_0x9edd('0xbb')),_0x336918(document[_0x9edd('0x6d')])[_0x9edd('0x47')](_0x9edd('0x81')));});var _0x4b92fc=_0x49cbc7[_0x9edd('0x4f')](_0x9edd('0xbc'));_0x49cbc7[_0x9edd('0x4f')](_0x9edd('0xbd'))['on'](_0x9edd('0xbe'),function(){_0x4bffdc[_0x9edd('0xbf')]('-',void 0x0,void 0x0,_0x4b92fc);return!0x1;});_0x49cbc7[_0x9edd('0x4f')](_0x9edd('0xc0'))['on'](_0x9edd('0xc1'),function(){_0x4bffdc[_0x9edd('0xbf')](void 0x0,void 0x0,void 0x0,_0x4b92fc);return!0x1;});_0x49cbc7[_0x9edd('0x4f')](_0x9edd('0xc2'))[_0x9edd('0xc3')]('')['on']('keyup.qd_ddc_cep',function(){_0x4bffdc[_0x9edd('0xc4')](_0x336918(this));});if(_0x15ae6[_0x9edd('0xc5')]){var _0x56dc7e=0x0;_0x336918(this)['on'](_0x9edd('0xc6'),function(){var _0x49cbc7=function(){window[_0x9edd('0x54')][_0x9edd('0x89')]&&(_0x4bffdc[_0x9edd('0x88')](),window['_QuatroDigital_DropDown'][_0x9edd('0x89')]=!0x1,_0x336918['fn']['simpleCart'](!0x0),_0x4bffdc['cartIsEmpty']());};_0x56dc7e=setInterval(function(){_0x49cbc7();},0x258);_0x49cbc7();});_0x336918(this)['on'](_0x9edd('0xc7'),function(){clearInterval(_0x56dc7e);});}};var _0x94a989=function(_0xce2f3){_0xce2f3=_0x336918(_0xce2f3);_0x15ae6[_0x9edd('0xc8')]['cartTotal']=_0x15ae6[_0x9edd('0xc8')][_0x9edd('0xc9')][_0x9edd('0x2')](_0x9edd('0xca'),_0x9edd('0xcb'));_0x15ae6[_0x9edd('0xc8')][_0x9edd('0xc9')]=_0x15ae6[_0x9edd('0xc8')][_0x9edd('0xc9')][_0x9edd('0x2')](_0x9edd('0xcc'),_0x9edd('0xcd'));_0x15ae6['texts'][_0x9edd('0xc9')]=_0x15ae6[_0x9edd('0xc8')][_0x9edd('0xc9')][_0x9edd('0x2')](_0x9edd('0xce'),'<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>');_0x15ae6[_0x9edd('0xc8')]['cartTotal']=_0x15ae6[_0x9edd('0xc8')][_0x9edd('0xc9')]['replace']('#total',_0x9edd('0xcf'));_0xce2f3[_0x9edd('0x4f')](_0x9edd('0xd0'))[_0x9edd('0x4c')](_0x15ae6[_0x9edd('0xc8')]['linkCart']);_0xce2f3['find'](_0x9edd('0xd1'))[_0x9edd('0x4c')](_0x15ae6[_0x9edd('0xc8')][_0x9edd('0xd2')]);_0xce2f3['find'](_0x9edd('0xd3'))[_0x9edd('0x4c')](_0x15ae6[_0x9edd('0xc8')][_0x9edd('0xd4')]);_0xce2f3[_0x9edd('0x4f')](_0x9edd('0xd5'))[_0x9edd('0x4c')](_0x15ae6['texts'][_0x9edd('0xc9')]);_0xce2f3[_0x9edd('0x4f')](_0x9edd('0xd6'))[_0x9edd('0x4c')](_0x15ae6[_0x9edd('0xc8')][_0x9edd('0xd7')]);_0xce2f3[_0x9edd('0x4f')](_0x9edd('0xd8'))[_0x9edd('0x4c')](_0x15ae6[_0x9edd('0xc8')][_0x9edd('0xd9')]);return _0xce2f3;}(this[_0x9edd('0xda')]);var _0xd590=0x0;_0x4db9fc['each'](function(){0x0<_0xd590?_0x3a4b3c[_0x9edd('0x27')](this,_0x94a989[_0x9edd('0xdb')]()):_0x3a4b3c[_0x9edd('0x27')](this,_0x94a989);_0xd590++;});window[_0x9edd('0x36')]['callback'][_0x9edd('0x2f')](function(){_0x336918(_0x9edd('0xdc'))[_0x9edd('0x4c')](window[_0x9edd('0x36')][_0x9edd('0x4d')]||'--');_0x336918(_0x9edd('0xdd'))[_0x9edd('0x4c')](window[_0x9edd('0x36')][_0x9edd('0x3d')]||'0');_0x336918(_0x9edd('0xde'))[_0x9edd('0x4c')](window['_QuatroDigital_CartData'][_0x9edd('0x3b')]||'--');_0x336918(_0x9edd('0xdf'))[_0x9edd('0x4c')](window[_0x9edd('0x36')][_0x9edd('0x3c')]||'--');});var _0x3527b9=function(_0x3bdbed,_0x55d08b){if(_0x9edd('0x4')===typeof _0x3bdbed[_0x9edd('0x3f')])return _0x8ab7e8(_0x9edd('0xe0'));_0x4bffdc[_0x9edd('0xe1')][_0x9edd('0x27')](this,_0x55d08b);};_0x4bffdc[_0x9edd('0x88')]=function(_0x28ce67,_0x2cb08b){_0x9edd('0x4')!=typeof _0x2cb08b?window[_0x9edd('0x54')][_0x9edd('0xe2')]=_0x2cb08b:window[_0x9edd('0x54')][_0x9edd('0xe2')]&&(_0x2cb08b=window[_0x9edd('0x54')][_0x9edd('0xe2')]);setTimeout(function(){window[_0x9edd('0x54')][_0x9edd('0xe2')]=void 0x0;},_0x15ae6['timeRemoveNewItemClass']);_0x336918(_0x9edd('0xe3'))[_0x9edd('0x47')](_0x9edd('0xe4'));if(_0x15ae6[_0x9edd('0x53')]){var _0x56dc7e=function(_0x380216){window[_0x9edd('0x54')][_0x9edd('0x26')]=_0x380216;_0x3527b9(_0x380216,_0x2cb08b);_0x9edd('0x4')!==typeof window['_QuatroDigital_AmountProduct']&&_0x9edd('0xa')===typeof window[_0x9edd('0xe5')][_0x9edd('0xe6')]&&window['_QuatroDigital_AmountProduct'][_0x9edd('0xe6')]['call'](this);_0x336918(_0x9edd('0xe3'))['addClass'](_0x9edd('0xe4'));};_0x9edd('0x4')!==typeof window['_QuatroDigital_DropDown'][_0x9edd('0x26')]?(_0x56dc7e(window[_0x9edd('0x54')][_0x9edd('0x26')]),_0x9edd('0xa')===typeof _0x28ce67&&_0x28ce67(window[_0x9edd('0x54')][_0x9edd('0x26')])):_0x336918[_0x9edd('0x58')](['items',_0x9edd('0x37'),_0x9edd('0x59')],{'done':function(_0x536a00){_0x56dc7e[_0x9edd('0x27')](this,_0x536a00);'function'===typeof _0x28ce67&&_0x28ce67(_0x536a00);},'fail':function(_0x33d575){_0x8ab7e8([_0x9edd('0xe7'),_0x33d575]);}});}else alert(_0x9edd('0xe8'));};_0x4bffdc[_0x9edd('0xe9')]=function(){var _0x2054e6=_0x336918(_0x9edd('0xe3'));_0x2054e6[_0x9edd('0x4f')](_0x9edd('0xea'))[_0x9edd('0x8')]?_0x2054e6[_0x9edd('0x47')](_0x9edd('0xeb')):_0x2054e6[_0x9edd('0x46')]('qd-ddc-noItems');};_0x4bffdc['renderProductsList']=function(_0x1ba937){var _0x56dc7e=_0x336918(_0x9edd('0xec'));_0x56dc7e[_0x9edd('0xed')]();_0x56dc7e[_0x9edd('0x75')](function(){var _0x56dc7e=_0x336918(this),_0x336900,_0x2f4462,_0x27c709=_0x336918(''),_0x491905;for(_0x491905 in window[_0x9edd('0x54')]['getOrderForm'][_0x9edd('0x3f')])if(_0x9edd('0x2a')===typeof window[_0x9edd('0x54')][_0x9edd('0x26')][_0x9edd('0x3f')][_0x491905]){var _0x12561b=window[_0x9edd('0x54')][_0x9edd('0x26')][_0x9edd('0x3f')][_0x491905];var _0x3fcbc0=_0x12561b[_0x9edd('0xee')][_0x9edd('0x2')](/^\/|\/$/g,'')[_0x9edd('0x9c')]('/');var _0x1a1254=_0x336918(_0x9edd('0xef'));_0x1a1254[_0x9edd('0x34')]({'data-sku':_0x12561b['id'],'data-sku-index':_0x491905,'data-qd-departament':_0x3fcbc0[0x0],'data-qd-category':_0x3fcbc0[_0x3fcbc0[_0x9edd('0x8')]-0x1]});_0x1a1254[_0x9edd('0x46')](_0x9edd('0xf0')+_0x12561b['availability']);_0x1a1254['find'](_0x9edd('0xf1'))['append'](_0x15ae6[_0x9edd('0xb0')](_0x12561b));_0x1a1254[_0x9edd('0x4f')](_0x9edd('0xf2'))[_0x9edd('0xb5')](isNaN(_0x12561b['sellingPrice'])?_0x12561b['sellingPrice']:0x0==_0x12561b[_0x9edd('0xf3')]?_0x9edd('0xf4'):(_0x336918(_0x9edd('0xf5'))[_0x9edd('0x34')](_0x9edd('0xf6'))||'R$')+'\x20'+qd_number_format(_0x12561b['sellingPrice']/0x64,0x2,',','.'));_0x1a1254[_0x9edd('0x4f')]('.qd-ddc-quantity')[_0x9edd('0x34')]({'data-sku':_0x12561b['id'],'data-sku-index':_0x491905})[_0x9edd('0xc3')](_0x12561b[_0x9edd('0xf7')]);_0x1a1254[_0x9edd('0x4f')]('.qd-ddc-remove')['attr']({'data-sku':_0x12561b['id'],'data-sku-index':_0x491905});_0x4bffdc['insertProdImg'](_0x12561b['id'],_0x1a1254[_0x9edd('0x4f')](_0x9edd('0xf8')),_0x12561b[_0x9edd('0xf9')]);_0x1a1254[_0x9edd('0x4f')](_0x9edd('0xfa'))[_0x9edd('0x34')]({'data-sku':_0x12561b['id'],'data-sku-index':_0x491905});_0x1a1254['appendTo'](_0x56dc7e);_0x27c709=_0x27c709[_0x9edd('0x2f')](_0x1a1254);}try{var _0x2779a8=_0x56dc7e['getParent']('.qd-ddc-wrapper')[_0x9edd('0x4f')](_0x9edd('0xc2'));_0x2779a8[_0x9edd('0x8')]&&''==_0x2779a8['val']()&&window[_0x9edd('0x54')][_0x9edd('0x26')][_0x9edd('0x59')][_0x9edd('0xfb')]&&_0x2779a8['val'](window[_0x9edd('0x54')][_0x9edd('0x26')][_0x9edd('0x59')][_0x9edd('0xfb')][_0x9edd('0xfc')]);}catch(_0x162caa){_0x8ab7e8('Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20'+_0x162caa[_0x9edd('0x22')],_0x9edd('0x64'));}_0x4bffdc[_0x9edd('0xfd')](_0x56dc7e);_0x4bffdc[_0x9edd('0xe9')]();_0x1ba937&&_0x1ba937['lastSku']&&function(){_0x2f4462=_0x27c709['filter'](_0x9edd('0xfe')+_0x1ba937[_0x9edd('0xff')]+'\x27]');_0x2f4462[_0x9edd('0x8')]&&(_0x336900=0x0,_0x27c709[_0x9edd('0x75')](function(){var _0x1ba937=_0x336918(this);if(_0x1ba937['is'](_0x2f4462))return!0x1;_0x336900+=_0x1ba937[_0x9edd('0x100')]();}),_0x4bffdc[_0x9edd('0xbf')](void 0x0,void 0x0,_0x336900,_0x56dc7e[_0x9edd('0x2f')](_0x56dc7e[_0x9edd('0xa0')]())),_0x27c709[_0x9edd('0x47')](_0x9edd('0x101')),function(_0xd42e71){_0xd42e71['addClass']('qd-ddc-lastAdded');_0xd42e71[_0x9edd('0x46')](_0x9edd('0x101'));setTimeout(function(){_0xd42e71[_0x9edd('0x47')](_0x9edd('0x102'));},_0x15ae6[_0x9edd('0x86')]);}(_0x2f4462));}();});(function(){_QuatroDigital_DropDown[_0x9edd('0x26')][_0x9edd('0x3f')][_0x9edd('0x8')]?(_0x336918('body')[_0x9edd('0x47')](_0x9edd('0x103'))[_0x9edd('0x46')](_0x9edd('0x104')),setTimeout(function(){_0x336918(_0x9edd('0x6d'))[_0x9edd('0x47')]('qd-ddc-product-add-time');},_0x15ae6['timeRemoveNewItemClass'])):_0x336918(_0x9edd('0x6d'))[_0x9edd('0x47')](_0x9edd('0x105'))['addClass']('qd-ddc-cart-empty');}());_0x9edd('0xa')===typeof _0x15ae6[_0x9edd('0x106')]?_0x15ae6[_0x9edd('0x106')][_0x9edd('0x27')](this):_0x8ab7e8(_0x9edd('0x107'));};_0x4bffdc[_0x9edd('0x108')]=function(_0x21ef56,_0x1a6fa2,_0x18ea0d){function _0x44f821(){_0x1a6fa2[_0x9edd('0x47')]('qd-loaded')[_0x9edd('0x109')](function(){_0x336918(this)['addClass']('qd-loaded');})['attr'](_0x9edd('0x10a'),_0x18ea0d);}_0x18ea0d?_0x44f821():isNaN(_0x21ef56)?_0x8ab7e8(_0x9edd('0x10b'),'alerta'):alert('Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.');};_0x4bffdc['actionButtons']=function(_0x47d20b){var _0x1aa25c=function(_0x2c4f0f,_0x34eb7f){var _0x56dc7e=_0x336918(_0x2c4f0f);var _0x412c21=_0x56dc7e[_0x9edd('0x34')](_0x9edd('0x10c'));var _0x336900=_0x56dc7e[_0x9edd('0x34')]('data-sku-index');if(_0x412c21){var _0x33b06c=parseInt(_0x56dc7e['val']())||0x1;_0x4bffdc[_0x9edd('0x10d')]([_0x412c21,_0x336900],_0x33b06c,_0x33b06c+0x1,function(_0x51d619){_0x56dc7e[_0x9edd('0xc3')](_0x51d619);_0x9edd('0xa')===typeof _0x34eb7f&&_0x34eb7f();});}};var _0x56dc7e=function(_0x5f37d1,_0x2ef921){var _0x56dc7e=_0x336918(_0x5f37d1);var _0x3e2fc7=_0x56dc7e['attr']('data-sku');var _0x336900=_0x56dc7e[_0x9edd('0x34')](_0x9edd('0x10e'));if(_0x3e2fc7){var _0x2040ad=parseInt(_0x56dc7e[_0x9edd('0xc3')]())||0x2;_0x4bffdc[_0x9edd('0x10d')]([_0x3e2fc7,_0x336900],_0x2040ad,_0x2040ad-0x1,function(_0x4308a2){_0x56dc7e[_0x9edd('0xc3')](_0x4308a2);_0x9edd('0xa')===typeof _0x2ef921&&_0x2ef921();});}};var _0x2ed41c=function(_0x4b98fb,_0xc0f350){var _0x56dc7e=_0x336918(_0x4b98fb);var _0x526eb2=_0x56dc7e['attr'](_0x9edd('0x10c'));var _0x336900=_0x56dc7e[_0x9edd('0x34')](_0x9edd('0x10e'));if(_0x526eb2){var _0x5eec20=parseInt(_0x56dc7e[_0x9edd('0xc3')]())||0x1;_0x4bffdc[_0x9edd('0x10d')]([_0x526eb2,_0x336900],0x1,_0x5eec20,function(_0x134d5b){_0x56dc7e[_0x9edd('0xc3')](_0x134d5b);'function'===typeof _0xc0f350&&_0xc0f350();});}};var _0x336900=_0x47d20b[_0x9edd('0x4f')](_0x9edd('0x10f'));_0x336900['addClass'](_0x9edd('0x110'))[_0x9edd('0x75')](function(){var _0x47d20b=_0x336918(this);_0x47d20b[_0x9edd('0x4f')](_0x9edd('0x111'))['on'](_0x9edd('0x112'),function(_0x452e32){_0x452e32['preventDefault']();_0x336900[_0x9edd('0x46')](_0x9edd('0x113'));_0x1aa25c(_0x47d20b['find'](_0x9edd('0x114')),function(){_0x336900['removeClass']('qd-loading');});});_0x47d20b[_0x9edd('0x4f')](_0x9edd('0x115'))['on'](_0x9edd('0x116'),function(_0x3522dc){_0x3522dc[_0x9edd('0x74')]();_0x336900[_0x9edd('0x46')](_0x9edd('0x113'));_0x56dc7e(_0x47d20b[_0x9edd('0x4f')](_0x9edd('0x114')),function(){_0x336900[_0x9edd('0x47')](_0x9edd('0x113'));});});_0x47d20b['find']('.qd-ddc-quantity')['on'](_0x9edd('0x117'),function(){_0x336900[_0x9edd('0x46')](_0x9edd('0x113'));_0x2ed41c(this,function(){_0x336900[_0x9edd('0x47')](_0x9edd('0x113'));});});_0x47d20b[_0x9edd('0x4f')]('.qd-ddc-quantity')['on'](_0x9edd('0x118'),function(_0x17c02b){0xd==_0x17c02b[_0x9edd('0x119')]&&(_0x336900['addClass'](_0x9edd('0x113')),_0x2ed41c(this,function(){_0x336900['removeClass']('qd-loading');}));});});_0x47d20b['find'](_0x9edd('0xea'))[_0x9edd('0x75')](function(){var _0x47d20b=_0x336918(this);_0x47d20b[_0x9edd('0x4f')](_0x9edd('0x11a'))['on'](_0x9edd('0x11b'),function(){_0x47d20b[_0x9edd('0x46')](_0x9edd('0x113'));_0x4bffdc[_0x9edd('0x11c')](_0x336918(this),function(_0x5033e3){_0x5033e3?_0x47d20b[_0x9edd('0x11d')](!0x0)[_0x9edd('0x11e')](function(){_0x47d20b['remove']();_0x4bffdc['cartIsEmpty']();}):_0x47d20b[_0x9edd('0x47')](_0x9edd('0x113'));});return!0x1;});});};_0x4bffdc['shippingCalculate']=function(_0x17c5a6){var _0x4f292d=_0x17c5a6[_0x9edd('0xc3')](),_0x4f292d=_0x4f292d[_0x9edd('0x2')](/[^0-9\-]/g,''),_0x4f292d=_0x4f292d[_0x9edd('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3'),_0x4f292d=_0x4f292d[_0x9edd('0x2')](/(.{9}).*/g,'$1');_0x17c5a6[_0x9edd('0xc3')](_0x4f292d);0x9<=_0x4f292d[_0x9edd('0x8')]&&(_0x17c5a6[_0x9edd('0x18')](_0x9edd('0x11f'))!=_0x4f292d&&_0x136868[_0x9edd('0x120')]({'postalCode':_0x4f292d,'country':_0x9edd('0x121')})[_0x9edd('0x1c')](function(_0x483dca){window[_0x9edd('0x54')][_0x9edd('0x26')]=_0x483dca;_0x4bffdc[_0x9edd('0x88')]();})[_0x9edd('0x1e')](function(_0x2eb166){_0x8ab7e8([_0x9edd('0x122'),_0x2eb166]);updateCartData();}),_0x17c5a6[_0x9edd('0x18')]('qdDdcLastPostalCode',_0x4f292d));};_0x4bffdc[_0x9edd('0x10d')]=function(_0x55d8e1,_0x498ae0,_0x1ea985,_0x2f56ae){function _0x500bf8(_0x78ae7f){_0x78ae7f=_0x9edd('0x123')!==typeof _0x78ae7f?!0x1:_0x78ae7f;_0x4bffdc[_0x9edd('0x88')]();window['_QuatroDigital_DropDown']['allowUpdate']=!0x1;_0x4bffdc[_0x9edd('0xe9')]();_0x9edd('0x4')!==typeof window['_QuatroDigital_AmountProduct']&&'function'===typeof window[_0x9edd('0xe5')][_0x9edd('0xe6')]&&window[_0x9edd('0xe5')][_0x9edd('0xe6')]['call'](this);'function'===typeof adminCart&&adminCart();_0x336918['fn'][_0x9edd('0x24')](!0x0,void 0x0,_0x78ae7f);_0x9edd('0xa')===typeof _0x2f56ae&&_0x2f56ae(_0x498ae0);}_0x1ea985=_0x1ea985||0x1;if(0x1>_0x1ea985)return _0x498ae0;if(_0x15ae6['smartCheckout']){if(_0x9edd('0x4')===typeof window['_QuatroDigital_DropDown'][_0x9edd('0x26')][_0x9edd('0x3f')][_0x55d8e1[0x1]])return _0x8ab7e8(_0x9edd('0x124')+_0x55d8e1[0x1]+']'),_0x498ae0;window[_0x9edd('0x54')]['getOrderForm'][_0x9edd('0x3f')][_0x55d8e1[0x1]][_0x9edd('0xf7')]=_0x1ea985;window['_QuatroDigital_DropDown'][_0x9edd('0x26')]['items'][_0x55d8e1[0x1]][_0x9edd('0x125')]=_0x55d8e1[0x1];_0x136868[_0x9edd('0x126')]([window[_0x9edd('0x54')][_0x9edd('0x26')][_0x9edd('0x3f')][_0x55d8e1[0x1]]],[_0x9edd('0x3f'),'totalizers',_0x9edd('0x59')])[_0x9edd('0x1c')](function(_0x268088){window[_0x9edd('0x54')][_0x9edd('0x26')]=_0x268088;_0x500bf8(!0x0);})[_0x9edd('0x1e')](function(_0x422fbd){_0x8ab7e8([_0x9edd('0x127'),_0x422fbd]);_0x500bf8();});}else _0x8ab7e8(_0x9edd('0x128'));};_0x4bffdc[_0x9edd('0x11c')]=function(_0x522c06,_0x2b7c53){function _0x62b689(_0x319670){_0x319670=_0x9edd('0x123')!==typeof _0x319670?!0x1:_0x319670;_0x9edd('0x4')!==typeof window[_0x9edd('0xe5')]&&_0x9edd('0xa')===typeof window[_0x9edd('0xe5')][_0x9edd('0xe6')]&&window[_0x9edd('0xe5')][_0x9edd('0xe6')][_0x9edd('0x27')](this);_0x9edd('0xa')===typeof adminCart&&adminCart();_0x336918['fn'][_0x9edd('0x24')](!0x0,void 0x0,_0x319670);_0x9edd('0xa')===typeof _0x2b7c53&&_0x2b7c53(_0x336900);}var _0x336900=!0x1,_0x4211de=_0x336918(_0x522c06)['attr']('data-sku-index');if(_0x15ae6[_0x9edd('0x53')]){if(_0x9edd('0x4')===typeof window[_0x9edd('0x54')]['getOrderForm'][_0x9edd('0x3f')][_0x4211de])return _0x8ab7e8(_0x9edd('0x124')+_0x4211de+']'),_0x336900;window['_QuatroDigital_DropDown']['getOrderForm'][_0x9edd('0x3f')][_0x4211de][_0x9edd('0x125')]=_0x4211de;_0x136868['removeItems']([window[_0x9edd('0x54')][_0x9edd('0x26')]['items'][_0x4211de]],[_0x9edd('0x3f'),_0x9edd('0x37'),_0x9edd('0x59')])[_0x9edd('0x1c')](function(_0x9aa7ab){_0x336900=!0x0;window[_0x9edd('0x54')][_0x9edd('0x26')]=_0x9aa7ab;_0x3527b9(_0x9aa7ab);_0x62b689(!0x0);})[_0x9edd('0x1e')](function(_0x55aae3){_0x8ab7e8([_0x9edd('0x129'),_0x55aae3]);_0x62b689();});}else alert(_0x9edd('0x12a'));};_0x4bffdc[_0x9edd('0xbf')]=function(_0x159472,_0xa8c9f9,_0x2cc70f,_0x55f0a5){_0x55f0a5=_0x55f0a5||_0x336918(_0x9edd('0x12b'));_0x159472=_0x159472||'+';_0xa8c9f9=_0xa8c9f9||0.9*_0x55f0a5[_0x9edd('0x12c')]();_0x55f0a5[_0x9edd('0x11d')](!0x0,!0x0)[_0x9edd('0x12d')]({'scrollTop':isNaN(_0x2cc70f)?_0x159472+'='+_0xa8c9f9+'px':_0x2cc70f});};_0x15ae6[_0x9edd('0xc5')]||(_0x4bffdc[_0x9edd('0x88')](),_0x336918['fn'][_0x9edd('0x24')](!0x0));_0x336918(window)['on']('productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex',function(){try{window[_0x9edd('0x54')][_0x9edd('0x26')]=void 0x0,_0x4bffdc[_0x9edd('0x88')]();}catch(_0x5a0896){_0x8ab7e8(_0x9edd('0x12e')+_0x5a0896[_0x9edd('0x22')],_0x9edd('0x12f'));}});_0x9edd('0xa')===typeof _0x15ae6[_0x9edd('0x40')]?_0x15ae6['callback'][_0x9edd('0x27')](this):_0x8ab7e8(_0x9edd('0x130'));};_0x336918['fn'][_0x9edd('0xa8')]=function(_0xa1deef){var _0x348bd2=_0x336918(this);_0x348bd2['fn']=new _0x336918['QD_dropDownCart'](this,_0xa1deef);return _0x348bd2;};}catch(_0x4f56b6){'undefined'!==typeof console&&_0x9edd('0xa')===typeof console[_0x9edd('0x15')]&&console[_0x9edd('0x15')](_0x9edd('0xa6'),_0x4f56b6);}}(this));(function(_0x3edc98){try{var _0x5db26d=jQuery;window[_0x9edd('0xe5')]=window[_0x9edd('0xe5')]||{};window[_0x9edd('0xe5')][_0x9edd('0x3f')]={};window['_QuatroDigital_AmountProduct'][_0x9edd('0x131')]=!0x1;window[_0x9edd('0xe5')]['buyButtonClicked']=!0x1;window[_0x9edd('0xe5')][_0x9edd('0x132')]=!0x1;var _0x464aac=function(){if(window[_0x9edd('0xe5')][_0x9edd('0x131')]){var _0x45a324=!0x1;var _0x3edc98={};window[_0x9edd('0xe5')][_0x9edd('0x3f')]={};for(_0x24c627 in window[_0x9edd('0x54')][_0x9edd('0x26')]['items'])if(_0x9edd('0x2a')===typeof window[_0x9edd('0x54')]['getOrderForm'][_0x9edd('0x3f')][_0x24c627]){var _0x11002c=window[_0x9edd('0x54')]['getOrderForm'][_0x9edd('0x3f')][_0x24c627];_0x9edd('0x4')!==typeof _0x11002c[_0x9edd('0x133')]&&null!==_0x11002c[_0x9edd('0x133')]&&''!==_0x11002c['productId']&&(window[_0x9edd('0xe5')]['items'][_0x9edd('0x134')+_0x11002c[_0x9edd('0x133')]]=window[_0x9edd('0xe5')][_0x9edd('0x3f')][_0x9edd('0x134')+_0x11002c[_0x9edd('0x133')]]||{},window[_0x9edd('0xe5')][_0x9edd('0x3f')]['prod_'+_0x11002c[_0x9edd('0x133')]][_0x9edd('0x135')]=_0x11002c['productId'],_0x3edc98[_0x9edd('0x134')+_0x11002c[_0x9edd('0x133')]]||(window[_0x9edd('0xe5')]['items'][_0x9edd('0x134')+_0x11002c[_0x9edd('0x133')]][_0x9edd('0x3d')]=0x0),window[_0x9edd('0xe5')]['items'][_0x9edd('0x134')+_0x11002c[_0x9edd('0x133')]][_0x9edd('0x3d')]+=_0x11002c[_0x9edd('0xf7')],_0x45a324=!0x0,_0x3edc98[_0x9edd('0x134')+_0x11002c[_0x9edd('0x133')]]=!0x0);}var _0x24c627=_0x45a324;}else _0x24c627=void 0x0;window[_0x9edd('0xe5')][_0x9edd('0x131')]&&(_0x5db26d(_0x9edd('0x136'))['remove'](),_0x5db26d(_0x9edd('0x137'))[_0x9edd('0x47')]('qd-bap-item-added'));for(var _0x5c4345 in window[_0x9edd('0xe5')][_0x9edd('0x3f')]){_0x11002c=window[_0x9edd('0xe5')][_0x9edd('0x3f')][_0x5c4345];if(_0x9edd('0x2a')!==typeof _0x11002c)return;_0x3edc98=_0x5db26d(_0x9edd('0x138')+_0x11002c['prodId']+']')[_0x9edd('0x0')]('li');if(window[_0x9edd('0xe5')][_0x9edd('0x131')]||!_0x3edc98[_0x9edd('0x4f')](_0x9edd('0x136'))['length'])_0x45a324=_0x5db26d(_0x9edd('0x139')),_0x45a324[_0x9edd('0x4f')](_0x9edd('0x13a'))[_0x9edd('0x4c')](_0x11002c[_0x9edd('0x3d')]),_0x11002c=_0x3edc98['find']('.qd_bap_wrapper_content'),_0x11002c[_0x9edd('0x8')]?_0x11002c[_0x9edd('0x13b')](_0x45a324)[_0x9edd('0x46')](_0x9edd('0x13c')):_0x3edc98[_0x9edd('0x13b')](_0x45a324);}_0x24c627&&(window['_QuatroDigital_AmountProduct'][_0x9edd('0x131')]=!0x1);};window[_0x9edd('0xe5')][_0x9edd('0xe6')]=function(){window[_0x9edd('0xe5')][_0x9edd('0x131')]=!0x0;_0x464aac[_0x9edd('0x27')](this);};_0x5db26d(document)[_0x9edd('0xa5')](function(){_0x464aac['call'](this);});}catch(_0x5e6f1e){_0x9edd('0x4')!==typeof console&&'function'===typeof console['error']&&console[_0x9edd('0x15')](_0x9edd('0xa6'),_0x5e6f1e);}}(this));(function(){try{var _0x5babef=jQuery,_0x4e5794,_0x3dab89={'selector':_0x9edd('0x13d'),'dropDown':{},'buyButton':{}};_0x5babef[_0x9edd('0x13e')]=function(_0x50b66b){var _0x1c5533={};_0x4e5794=_0x5babef[_0x9edd('0x16')](!0x0,{},_0x3dab89,_0x50b66b);_0x50b66b=_0x5babef(_0x4e5794[_0x9edd('0x7d')])['QD_dropDownCart'](_0x4e5794[_0x9edd('0x13f')]);_0x1c5533[_0x9edd('0x82')]='undefined'!==typeof _0x4e5794[_0x9edd('0x13f')][_0x9edd('0xc5')]&&!0x1===_0x4e5794['dropDown'][_0x9edd('0xc5')]?_0x5babef(_0x4e5794[_0x9edd('0x7d')])[_0x9edd('0x6f')](_0x50b66b['fn'],_0x4e5794[_0x9edd('0x82')]):_0x5babef(_0x4e5794[_0x9edd('0x7d')])[_0x9edd('0x6f')](_0x4e5794[_0x9edd('0x82')]);_0x1c5533[_0x9edd('0x13f')]=_0x50b66b;return _0x1c5533;};_0x5babef['fn']['smartCart']=function(){'object'===typeof console&&'function'===typeof console[_0x9edd('0x2e')]&&console[_0x9edd('0x2e')]('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x5babef[_0x9edd('0x140')]=_0x5babef['fn']['smartCart'];}catch(_0x6dbd1b){'undefined'!==typeof console&&_0x9edd('0xa')===typeof console['error']&&console[_0x9edd('0x15')](_0x9edd('0xa6'),_0x6dbd1b);}}());

/* Quatro Digital - Product Thumbs // Carlos Vinicius // Todos os direitos reservados. */
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs();a.trigger("QuatroDigital.pt_callback",[a])}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return a.length?$.extend({},a,new b(a)):a},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0xdb63=['extend','start','td.value-field.Videos:first','ul.thumbs','div#image','videoFieldSelector','text','replace','split','indexOf','youtube','push','pop','shift','be/','prependTo','#include','wrap','<div\x20class=\x22qd-playerContainer\x22></div>','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','ite','---','erc','join','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','html','<iframe\x20src=\x22','://www.youtube.com/embed/','?wmode=transparent&rel=0&enablejsapi=1\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>','data','height','stop','fadeTo','body','addClass','qdpv-video-on','animate','iframe','find','a:not(\x27.qd-videoLink\x27)','bind','click.removeVideo','hide','removeClass','length','call','string','/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','click.playVideo','.ON','controlVideo','.qd-playerWrapper\x20iframe','contentWindow','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','attr','a:not(.qd-videoLink)','click','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','appendTo','trigger','ajaxStop','load','ImageControl','.qd-videoLink','.produto','object','alerta','toLowerCase','[Video\x20in\x20product]\x20','undefined','info','error','qdVideoInProduct'];(function(_0x581ff3,_0x1716b8){var _0x4b77db=function(_0x404d5a){while(--_0x404d5a){_0x581ff3['push'](_0x581ff3['shift']());}};_0x4b77db(++_0x1716b8);}(_0xdb63,0x91));var _0x3db6=function(_0xa1f756,_0x58fe84){_0xa1f756=_0xa1f756-0x0;var _0x4b1714=_0xdb63[_0xa1f756];return _0x4b1714;};(function(_0x397670){$(function(){if($(document['body'])['is'](_0x3db6('0x0'))){var _0x3913ff=[];var _0x5cfe96=function(_0x2fedae,_0x2f2660){_0x3db6('0x1')===typeof console&&('undefined'!==typeof _0x2f2660&&_0x3db6('0x2')===_0x2f2660[_0x3db6('0x3')]()?console['warn'](_0x3db6('0x4')+_0x2fedae):_0x3db6('0x5')!==typeof _0x2f2660&&_0x3db6('0x6')===_0x2f2660[_0x3db6('0x3')]()?console[_0x3db6('0x6')]('[Video\x20in\x20product]\x20'+_0x2fedae):console[_0x3db6('0x7')]('[Video\x20in\x20product]\x20'+_0x2fedae));};window['qdVideoInProduct']=window[_0x3db6('0x8')]||{};var _0x2cab48=$[_0x3db6('0x9')](!0x0,{'insertThumbsIn':_0x3db6('0xa'),'videoFieldSelector':_0x3db6('0xb'),'controlVideo':!0x0,'urlProtocol':'http'},window['qdVideoInProduct']);var _0x589e86=$(_0x3db6('0xc'));var _0x3ed366=$(_0x3db6('0xd'));var _0x2b3a9f=$(_0x2cab48[_0x3db6('0xe')])[_0x3db6('0xf')]()[_0x3db6('0x10')](/\;\s*/,';')[_0x3db6('0x11')](';');for(var _0x437cc3=0x0;_0x437cc3<_0x2b3a9f['length'];_0x437cc3++)-0x1<_0x2b3a9f[_0x437cc3][_0x3db6('0x12')](_0x3db6('0x13'))?_0x3913ff[_0x3db6('0x14')](_0x2b3a9f[_0x437cc3][_0x3db6('0x11')]('v=')[_0x3db6('0x15')]()[_0x3db6('0x11')](/[&#]/)[_0x3db6('0x16')]()):-0x1<_0x2b3a9f[_0x437cc3]['indexOf']('youtu.be')&&_0x3913ff[_0x3db6('0x14')](_0x2b3a9f[_0x437cc3]['split'](_0x3db6('0x17'))[_0x3db6('0x15')]()[_0x3db6('0x11')](/[\?&#]/)[_0x3db6('0x16')]());var _0x5c6623=$('<div\x20class=\x22qd-playerWrapper\x22></div>');_0x5c6623[_0x3db6('0x18')](_0x3db6('0x19'));_0x5c6623[_0x3db6('0x1a')](_0x3db6('0x1b'));_0x2b3a9f=function(_0x46fdf9){var _0x4d168d={'t':_0x3db6('0x1c')};return function(_0xa5931e){var _0x457096=function(_0x19618b){return _0x19618b;};var _0x3a48a2=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0xa5931e=_0xa5931e['d'+_0x3a48a2[0x10]+'c'+_0x3a48a2[0x11]+'m'+_0x457096(_0x3a48a2[0x1])+'n'+_0x3a48a2[0xd]]['l'+_0x3a48a2[0x12]+'c'+_0x3a48a2[0x0]+'ti'+_0x457096('o')+'n'];var _0xca8b89=function(_0x4a0424){return escape(encodeURIComponent(_0x4a0424['replace'](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x1069e5){return String['fromCharCode'](('Z'>=_0x1069e5?0x5a:0x7a)>=(_0x1069e5=_0x1069e5[_0x3db6('0x1d')](0x0)+0xd)?_0x1069e5:_0x1069e5-0x1a);})));};var _0xdc2717=_0xca8b89(_0xa5931e[[_0x3a48a2[0x9],_0x457096('o'),_0x3a48a2[0xc],_0x3a48a2[_0x457096(0xd)]]['join']('')]);_0xca8b89=_0xca8b89((window[['js',_0x457096('no'),'m',_0x3a48a2[0x1],_0x3a48a2[0x4]['toUpperCase'](),_0x3db6('0x1e')]['join']('')]||_0x3db6('0x1f'))+['.v',_0x3a48a2[0xd],'e',_0x457096('x'),'co',_0x457096('mm'),_0x3db6('0x20'),_0x3a48a2[0x1],'.c',_0x457096('o'),'m.',_0x3a48a2[0x13],'r']['join'](''));for(var _0x45115c in _0x4d168d){if(_0xca8b89===_0x45115c+_0x4d168d[_0x45115c]||_0xdc2717===_0x45115c+_0x4d168d[_0x45115c]){var _0x3fe4a1='tr'+_0x3a48a2[0x11]+'e';break;}_0x3fe4a1='f'+_0x3a48a2[0x0]+'ls'+_0x457096(_0x3a48a2[0x1])+'';}_0x457096=!0x1;-0x1<_0xa5931e[[_0x3a48a2[0xc],'e',_0x3a48a2[0x0],'rc',_0x3a48a2[0x9]][_0x3db6('0x21')]('')]['indexOf'](_0x3db6('0x22'))&&(_0x457096=!0x0);return[_0x3fe4a1,_0x457096];}(_0x46fdf9);}(window);if(!eval(_0x2b3a9f[0x0]))return _0x2b3a9f[0x1]?_0x5cfe96(_0x3db6('0x23')):!0x1;var _0xaf5fdf=function(_0x17ff21,_0x2da428){_0x3db6('0x13')===_0x2da428&&_0x5c6623[_0x3db6('0x24')](_0x3db6('0x25')+_0x2cab48['urlProtocol']+_0x3db6('0x26')+_0x17ff21+_0x3db6('0x27'));_0x3ed366[_0x3db6('0x28')](_0x3db6('0x29'),_0x3ed366[_0x3db6('0x28')](_0x3db6('0x29'))||_0x3ed366[_0x3db6('0x29')]());_0x3ed366[_0x3db6('0x2a')](!0x0,!0x0)[_0x3db6('0x2b')](0x1f4,0x0,function(){$(_0x3db6('0x2c'))[_0x3db6('0x2d')](_0x3db6('0x2e'));});_0x5c6623['stop'](!0x0,!0x0)[_0x3db6('0x2b')](0x1f4,0x1,function(){_0x3ed366['add'](_0x5c6623)[_0x3db6('0x2f')]({'height':_0x5c6623['find'](_0x3db6('0x30'))['height']()},0x2bc);});};removePlayer=function(){_0x589e86[_0x3db6('0x31')](_0x3db6('0x32'))[_0x3db6('0x33')](_0x3db6('0x34'),function(){_0x5c6623[_0x3db6('0x2a')](!0x0,!0x0)[_0x3db6('0x2b')](0x1f4,0x0,function(){$(this)[_0x3db6('0x35')]()['removeAttr']('style');$('body')[_0x3db6('0x36')](_0x3db6('0x2e'));});_0x3ed366[_0x3db6('0x2a')](!0x0,!0x0)['fadeTo'](0x1f4,0x1,function(){var _0xc20b9c=_0x3ed366[_0x3db6('0x28')](_0x3db6('0x29'));_0xc20b9c&&_0x3ed366[_0x3db6('0x2f')]({'height':_0xc20b9c},0x2bc);});});};var _0x4c2d66=function(){if(!_0x589e86[_0x3db6('0x31')]('.qd-videoItem')[_0x3db6('0x37')])for(vId in removePlayer[_0x3db6('0x38')](this),_0x3913ff)if(_0x3db6('0x39')===typeof _0x3913ff[vId]&&''!==_0x3913ff[vId]){var _0x4d5b1e=$('<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/'+_0x3913ff[vId]+_0x3db6('0x3a')+_0x3913ff[vId]+'\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/'+_0x3913ff[vId]+_0x3db6('0x3b'));_0x4d5b1e[_0x3db6('0x31')]('a')[_0x3db6('0x33')](_0x3db6('0x3c'),function(){var _0x6db49d=$(this);_0x589e86['find'](_0x3db6('0x3d'))['removeClass']('ON');_0x6db49d[_0x3db6('0x2d')]('ON');0x1==_0x2cab48[_0x3db6('0x3e')]?$('.qd-playerWrapper\x20iframe')[_0x3db6('0x37')]?(_0xaf5fdf[_0x3db6('0x38')](this,'',''),$(_0x3db6('0x3f'))[0x0][_0x3db6('0x40')][_0x3db6('0x41')](_0x3db6('0x42'),'*')):_0xaf5fdf['call'](this,_0x6db49d['attr']('rel'),'youtube'):_0xaf5fdf[_0x3db6('0x38')](this,_0x6db49d[_0x3db6('0x43')]('rel'),_0x3db6('0x13'));return!0x1;});0x1==_0x2cab48['controlVideo']&&_0x589e86['find'](_0x3db6('0x44'))[_0x3db6('0x45')](function(_0x3b3bb8){$('.qd-playerWrapper\x20iframe')['length']&&$('.qd-playerWrapper\x20iframe')[0x0][_0x3db6('0x40')][_0x3db6('0x41')](_0x3db6('0x46'),'*');});'start'===_0x2cab48['insertThumbsIn']?_0x4d5b1e[_0x3db6('0x18')](_0x589e86):_0x4d5b1e[_0x3db6('0x47')](_0x589e86);_0x4d5b1e[_0x3db6('0x48')]('QuatroDigital.pv_video_added',[_0x3913ff[vId],_0x4d5b1e]);}};$(document)[_0x3db6('0x49')](_0x4c2d66);$(window)[_0x3db6('0x4a')](_0x4c2d66);(function(){var _0x2940ec=this;var _0x365e1c=window[_0x3db6('0x4b')]||function(){};window[_0x3db6('0x4b')]=function(_0x2c4e40,_0x33ac3c){$(_0x2c4e40||'')['is'](_0x3db6('0x4c'))||(_0x365e1c[_0x3db6('0x38')](this,_0x2c4e40,_0x33ac3c),_0x4c2d66[_0x3db6('0x38')](_0x2940ec));};}());}});}(this));

/* Quatro Digital - Mosaic Banners // Carlos Vinicius // Todos os direitos reservados */
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

