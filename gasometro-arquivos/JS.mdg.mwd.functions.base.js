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
			Common.openModalVideoInstitutional();
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
		openModalVideoInstitutional: function() {
			var modal = $('.qd-v1-modal').clone().appendTo(document.body);
			modal.addClass('hotsite-information-qd-v1-modal');

			$('.box-banner a').filter('[href*="youtube.com/"], [href*="youtu.be/"]').click(function(e) {
				e.preventDefault();
				var $t = $(this);
				modal.find('.modal-header').append('<h2 class="modal-title">' + $t.find('img').attr('alt') + '</h2>');
				$('<iframe src="' + $t.attr('href') + '" frameborder="0" width="500" height="500"></iframe>').appendTo(modal.find('.modal-body'));
				modal.modal();
			});

			modal.on('hidden.bs.modal', function() {
				modal.find('.modal-body, .modal-title').empty();
				modal.remove();
				console.log('FECHOU!');
			});
		}	
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
var _0x9bf4=['productPage','closest','wrapperElement','filterFlagBy','isProductPage','find','skuBestPrice','addClass','qd-sp-active','.qd_active','qd-active','removeClass','oneFlagByItem','siblings','.qd_sp_on','qd_sp_ignored','qd_sp_on','isDiscountFlag','div[skuCorrente]:first','attr','skus','sku','available','bestPrice','isSmartCheckout','qd-sp-product-unavailable','val','appliedDiscount','getDiscountValue','.qd_productOldPrice','changeNativePrice','.qd_displayPrice','skuPrice','.qd-sp-display-discount','html','installments','changeInstallments','installmentValue','.qd_sp_display_installments','.qd_sp_installments','.qd_saveAmount','append','prepend','each','skuSelected.vtex','qd_sp_processedItem','startedByWrapper','forcePromotion','string','not','.qd_productPrice:not(.qd_sp_processedItem)','style','display:none\x20!important;','after','call','QD_SmartPrice','extend','boolean','body','function','trim','prototype','replace','abs','undefined','pow','toFixed','round','length','join','error','info','warn','object','unshift','alerta','toLowerCase','aviso','apply','text','search','auto','strong.skuBestPrice','label.skuBestInstallmentNumber','fromCharCode','charCodeAt','toUpperCase','ite','erc'];(function(_0x5ae36a,_0x140758){var _0x5f4fcd=function(_0x1094cf){while(--_0x1094cf){_0x5ae36a['push'](_0x5ae36a['shift']());}};_0x5f4fcd(++_0x140758);}(_0x9bf4,0x146));var _0x49bf=function(_0x321bb2,_0x202794){_0x321bb2=_0x321bb2-0x0;var _0x9c12ed=_0x9bf4[_0x321bb2];return _0x9c12ed;};_0x49bf('0x0')!==typeof String['prototype'][_0x49bf('0x1')]&&(String[_0x49bf('0x2')][_0x49bf('0x1')]=function(){return this[_0x49bf('0x3')](/^\s+|\s+$/g,'');});function qd_number_format(_0x19785a,_0x1e2f89,_0x4a9cc4,_0x2b7eae){_0x19785a=(_0x19785a+'')[_0x49bf('0x3')](/[^0-9+\-Ee.]/g,'');_0x19785a=isFinite(+_0x19785a)?+_0x19785a:0x0;_0x1e2f89=isFinite(+_0x1e2f89)?Math[_0x49bf('0x4')](_0x1e2f89):0x0;_0x2b7eae=_0x49bf('0x5')===typeof _0x2b7eae?',':_0x2b7eae;_0x4a9cc4=_0x49bf('0x5')===typeof _0x4a9cc4?'.':_0x4a9cc4;var _0x291751='',_0x291751=function(_0x28cbc0,_0x56ff2d){var _0x1e2f89=Math[_0x49bf('0x6')](0xa,_0x56ff2d);return''+(Math['round'](_0x28cbc0*_0x1e2f89)/_0x1e2f89)[_0x49bf('0x7')](_0x56ff2d);},_0x291751=(_0x1e2f89?_0x291751(_0x19785a,_0x1e2f89):''+Math[_0x49bf('0x8')](_0x19785a))['split']('.');0x3<_0x291751[0x0]['length']&&(_0x291751[0x0]=_0x291751[0x0][_0x49bf('0x3')](/\B(?=(?:\d{3})+(?!\d))/g,_0x2b7eae));(_0x291751[0x1]||'')[_0x49bf('0x9')]<_0x1e2f89&&(_0x291751[0x1]=_0x291751[0x1]||'',_0x291751[0x1]+=Array(_0x1e2f89-_0x291751[0x1][_0x49bf('0x9')]+0x1)[_0x49bf('0xa')]('0'));return _0x291751['join'](_0x4a9cc4);};(function(_0x1e56b7){'use strict';var _0x4f5c84=jQuery;if(typeof _0x4f5c84['fn']['QD_SmartPrice']==='function')return;var _0x2e2a23='Smart\x20Price';var _0x2708d8=function(_0x323bab,_0x3897a9){if('object'===typeof console&&'function'===typeof console[_0x49bf('0xb')]&&_0x49bf('0x0')===typeof console[_0x49bf('0xc')]&&'function'===typeof console[_0x49bf('0xd')]){var _0x3ffdfb;_0x49bf('0xe')===typeof _0x323bab?(_0x323bab[_0x49bf('0xf')]('['+_0x2e2a23+']\x0a'),_0x3ffdfb=_0x323bab):_0x3ffdfb=['['+_0x2e2a23+']\x0a'+_0x323bab];if(_0x49bf('0x5')===typeof _0x3897a9||_0x49bf('0x10')!==_0x3897a9[_0x49bf('0x11')]()&&_0x49bf('0x12')!==_0x3897a9['toLowerCase']())if(_0x49bf('0x5')!==typeof _0x3897a9&&_0x49bf('0xc')===_0x3897a9[_0x49bf('0x11')]())try{console[_0x49bf('0xc')][_0x49bf('0x13')](console,_0x3ffdfb);}catch(_0x1e649f){console[_0x49bf('0xc')](_0x3ffdfb['join']('\x0a'));}else try{console[_0x49bf('0xb')]['apply'](console,_0x3ffdfb);}catch(_0x19b352){console[_0x49bf('0xb')](_0x3ffdfb[_0x49bf('0xa')]('\x0a'));}else try{console[_0x49bf('0xd')]['apply'](console,_0x3ffdfb);}catch(_0x4e8579){console[_0x49bf('0xd')](_0x3ffdfb['join']('\x0a'));}}};var _0x2b5ef6=/[0-9]+\%/i;var _0x7e3461=/[0-9\.]+(?=\%)/i;var _0xe763b8={'isDiscountFlag':function(_0x3dd72e){if(_0x3dd72e[_0x49bf('0x14')]()[_0x49bf('0x15')](_0x2b5ef6)>-0x1)return!![];return![];},'getDiscountValue':function(_0x4c5ad1){return _0x4c5ad1[_0x49bf('0x14')]()['match'](_0x7e3461);},'startedByWrapper':![],'flagElement':'.flag','wrapperElement':'li','filterFlagBy':'[class*=\x27desconto\x27]','forcePromotion':null,'appliedDiscount':null,'oneFlagByItem':!![],'isSmartCheckout':!![],'changeInstallments':![],'productPage':{'changeNativeSaveAmount':!![],'changeNativePrice':!![],'changeInstallments':![],'isProductPage':_0x49bf('0x16'),'wrapperElement':'.productRightColumn','skuBestPrice':_0x49bf('0x17'),'installments':_0x49bf('0x18'),'installmentValue':'label.skuBestInstallmentValue','skuPrice':'strong.skuPrice'}};_0x4f5c84['fn']['QD_SmartPrice']=function(){};var _0xfbfc18=function(_0x446a83){var _0x32b7a5={'t':'nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x3252f3){var _0x2cb72d,_0xc6b031,_0x152e22,_0x153037;_0xc6b031=function(_0x290644){return _0x290644;};_0x152e22=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3252f3=_0x3252f3['d'+_0x152e22[0x10]+'c'+_0x152e22[0x11]+'m'+_0xc6b031(_0x152e22[0x1])+'n'+_0x152e22[0xd]]['l'+_0x152e22[0x12]+'c'+_0x152e22[0x0]+'ti'+_0xc6b031('o')+'n'];_0x2cb72d=function(_0x52afc2){return escape(encodeURIComponent(_0x52afc2['replace'](/\./g,'¨')[_0x49bf('0x3')](/[a-zA-Z]/g,function(_0x553aea){return String[_0x49bf('0x19')](('Z'>=_0x553aea?0x5a:0x7a)>=(_0x553aea=_0x553aea[_0x49bf('0x1a')](0x0)+0xd)?_0x553aea:_0x553aea-0x1a);})));};var _0x561331=_0x2cb72d(_0x3252f3[[_0x152e22[0x9],_0xc6b031('o'),_0x152e22[0xc],_0x152e22[_0xc6b031(0xd)]][_0x49bf('0xa')]('')]);_0x2cb72d=_0x2cb72d((window[['js',_0xc6b031('no'),'m',_0x152e22[0x1],_0x152e22[0x4][_0x49bf('0x1b')](),_0x49bf('0x1c')]['join']('')]||'---')+['.v',_0x152e22[0xd],'e',_0xc6b031('x'),'co',_0xc6b031('mm'),_0x49bf('0x1d'),_0x152e22[0x1],'.c',_0xc6b031('o'),'m.',_0x152e22[0x13],'r']['join'](''));for(var _0xe25ad9 in _0x32b7a5){if(_0x2cb72d===_0xe25ad9+_0x32b7a5[_0xe25ad9]||_0x561331===_0xe25ad9+_0x32b7a5[_0xe25ad9]){_0x153037='tr'+_0x152e22[0x11]+'e';break;}_0x153037='f'+_0x152e22[0x0]+'ls'+_0xc6b031(_0x152e22[0x1])+'';}_0xc6b031=!0x1;-0x1<_0x3252f3[[_0x152e22[0xc],'e',_0x152e22[0x0],'rc',_0x152e22[0x9]]['join']('')]['indexOf']('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0xc6b031=!0x0);return[_0x153037,_0xc6b031];}(_0x446a83);}(window);if(!eval(_0xfbfc18[0x0]))return _0xfbfc18[0x1]?_0x2708d8('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x2bd5c2=function(_0x44dd13,_0x3e8abe){'use strict';var _0x7f1914=function(_0x4ce713){'use strict';var _0x561ed8,_0x52e637,_0x5bbc45,_0x2e3d2c,_0x37d3f1,_0x15ac42,_0x351842,_0x51bd7d,_0x36456d,_0x514ca1,_0x210028,_0x34783d,_0xd6d826,_0xf3cb74,_0x15a1e4,_0x41f9fe,_0x5e8de0,_0xe8e0d6,_0x4693cc;var _0x4e08cc=_0x4f5c84(this);_0x4ce713=typeof _0x4ce713===_0x49bf('0x5')?![]:_0x4ce713;if(_0x3e8abe[_0x49bf('0x1e')]['isProductPage'])var _0x10e77a=_0x4e08cc[_0x49bf('0x1f')](_0x3e8abe[_0x49bf('0x1e')][_0x49bf('0x20')]);else var _0x10e77a=_0x4e08cc[_0x49bf('0x1f')](_0x3e8abe[_0x49bf('0x20')]);if(!_0x4ce713&&!_0x4e08cc['is'](_0x3e8abe[_0x49bf('0x21')])){if(_0x3e8abe[_0x49bf('0x1e')][_0x49bf('0x22')]&&_0x10e77a['is'](_0x3e8abe[_0x49bf('0x1e')]['wrapperElement'])){_0x10e77a[_0x49bf('0x23')](_0x3e8abe[_0x49bf('0x1e')][_0x49bf('0x24')])[_0x49bf('0x25')]('qd-active');_0x10e77a[_0x49bf('0x25')](_0x49bf('0x26'));}return;}var _0x48bd41=_0x3e8abe[_0x49bf('0x1e')][_0x49bf('0x22')];if(_0x4e08cc['is']('.qd_sp_on,\x20.qd_sp_ignored')&&!_0x48bd41)return;if(_0x48bd41){_0x51bd7d=_0x10e77a['find'](_0x3e8abe['productPage'][_0x49bf('0x24')]);if(_0x51bd7d[_0x49bf('0x23')](_0x49bf('0x27'))[_0x49bf('0x9')])return;_0x51bd7d['removeClass'](_0x49bf('0x28'));_0x10e77a[_0x49bf('0x29')](_0x49bf('0x26'));}if(_0x3e8abe[_0x49bf('0x2a')]&&_0x4e08cc[_0x49bf('0x2b')](_0x49bf('0x2c'))[_0x49bf('0x9')]){_0x4e08cc[_0x49bf('0x25')](_0x49bf('0x2d'));return;}_0x4e08cc['addClass'](_0x49bf('0x2e'));if(!_0x3e8abe[_0x49bf('0x2f')](_0x4e08cc))return;if(_0x48bd41){_0x5bbc45={};var _0x57eeab=parseInt(_0x4f5c84(_0x49bf('0x30'))[_0x49bf('0x31')]('skuCorrente'),0xa);if(_0x57eeab){for(var _0xa16689=0x0;_0xa16689<skuJson[_0x49bf('0x32')][_0x49bf('0x9')];_0xa16689++){if(skuJson[_0x49bf('0x32')][_0xa16689][_0x49bf('0x33')]==_0x57eeab){_0x5bbc45=skuJson['skus'][_0xa16689];break;}}}else{var _0x23686b=0x5af3107a3fff;for(var _0x32d798 in skuJson[_0x49bf('0x32')]){if(typeof skuJson[_0x49bf('0x32')][_0x32d798]===_0x49bf('0x0'))continue;if(!skuJson[_0x49bf('0x32')][_0x32d798][_0x49bf('0x34')])continue;if(skuJson[_0x49bf('0x32')][_0x32d798][_0x49bf('0x35')]<_0x23686b){_0x23686b=skuJson['skus'][_0x32d798]['bestPrice'];_0x5bbc45=skuJson[_0x49bf('0x32')][_0x32d798];}}}}_0x41f9fe=!![];_0x5e8de0=0x0;if(_0x3e8abe[_0x49bf('0x36')]&&_0xe8e0d6){_0x41f9fe=skuJson['available'];if(!_0x41f9fe)return _0x10e77a[_0x49bf('0x25')](_0x49bf('0x37'));}_0x52e637=_0x3e8abe['getDiscountValue'](_0x4e08cc);_0x561ed8=parseFloat(_0x52e637,0xa);if(isNaN(_0x561ed8))return _0x2708d8(['O\x20valor\x20informado\x20p/\x20o\x20desconto\x20não\x20é\x20um\x20número.',_0x4e08cc],_0x49bf('0x10'));var _0x191096=function(_0x14ca6c){if(_0x48bd41)_0x2e3d2c=(_0x14ca6c[_0x49bf('0x35')]||0x0)/0x64;else{_0xd6d826=_0x10e77a[_0x49bf('0x23')]('.qd_productPrice');_0x2e3d2c=parseFloat((_0xd6d826[_0x49bf('0x38')]()||'')[_0x49bf('0x3')](/[^0-9\.\,]+/i,'')[_0x49bf('0x3')]('.','')[_0x49bf('0x3')](',','.'),0xa);}if(isNaN(_0x2e3d2c))return _0x2708d8(['Por\x20alguma\x20razão\x20não\x20consegui\x20obter\x20o\x20preço\x20deste\x20produto\x20:(',_0x4e08cc,_0x10e77a]);if(_0x3e8abe[_0x49bf('0x39')]!==null){_0xf3cb74=0x0;if(!isNaN(_0x3e8abe[_0x49bf('0x39')]))_0xf3cb74=_0x3e8abe['appliedDiscount'];else{_0x15a1e4=_0x10e77a['find'](_0x3e8abe[_0x49bf('0x39')]);if(_0x15a1e4[_0x49bf('0x9')])_0xf3cb74=_0x3e8abe[_0x49bf('0x3a')](_0x15a1e4);}_0xf3cb74=parseFloat(_0xf3cb74,0xa);if(isNaN(_0xf3cb74))_0xf3cb74=0x0;if(_0xf3cb74!==0x0)_0x2e3d2c=_0x2e3d2c*0x64/(0x64-_0xf3cb74);}if(_0x48bd41)_0x37d3f1=(_0x14ca6c['listPrice']||0x0)/0x64;else _0x37d3f1=parseFloat((_0x10e77a[_0x49bf('0x23')](_0x49bf('0x3b'))[_0x49bf('0x38')]()||'')[_0x49bf('0x3')](/[^0-9\.\,]+/i,'')['replace']('.','')['replace'](',','.'),0xa);if(isNaN(_0x37d3f1))_0x37d3f1=0.001;_0x15ac42=_0x2e3d2c*((0x64-_0x561ed8)/0x64);if(_0x48bd41&&_0x3e8abe['productPage'][_0x49bf('0x3c')]){_0x51bd7d[_0x49bf('0x14')](_0x51bd7d[_0x49bf('0x14')]()[_0x49bf('0x1')]()[_0x49bf('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x15ac42,0x2,',','.')))['addClass'](_0x49bf('0x28'));_0x10e77a['addClass'](_0x49bf('0x26'));}else{_0x4693cc=_0x10e77a['find'](_0x49bf('0x3d'));_0x4693cc[_0x49bf('0x14')](_0x4693cc['text']()[_0x49bf('0x3')](/[0-9\.]+,[0-9]+/i,'')+qd_number_format(_0x15ac42,0x2,',','.'));}if(_0x48bd41){_0x351842=_0x10e77a[_0x49bf('0x23')](_0x3e8abe['productPage'][_0x49bf('0x3e')]);if(_0x351842['length'])_0x351842[_0x49bf('0x14')](_0x351842[_0x49bf('0x14')]()[_0x49bf('0x1')]()['replace'](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x15ac42,0x2,',','.')));}var _0x527a2d=_0x10e77a[_0x49bf('0x23')](_0x49bf('0x3f'));_0x527a2d[_0x49bf('0x14')](_0x527a2d[_0x49bf('0x14')]()[_0x49bf('0x3')](/[0-9]+\%/i,_0x561ed8+'%'));var _0x4cff65=function(_0x3c565f,_0x351b73,_0x36c2fa){var _0x3521c2=_0x10e77a[_0x49bf('0x23')](_0x3c565f);if(_0x3521c2[_0x49bf('0x9')])_0x3521c2[_0x49bf('0x40')](_0x3521c2['html']()[_0x49bf('0x1')]()['replace'](/[0-9]{1,2}/,_0x36c2fa?_0x36c2fa:_0x14ca6c[_0x49bf('0x41')]||0x0));var _0x36db3c=_0x10e77a[_0x49bf('0x23')](_0x351b73);if(_0x36db3c[_0x49bf('0x9')])_0x36db3c['html'](_0x36db3c[_0x49bf('0x40')]()[_0x49bf('0x1')]()[_0x49bf('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x15ac42/(_0x36c2fa?_0x36c2fa:_0x14ca6c['installments']||0x1),0x2,',','.')));};if(_0x48bd41&&_0x3e8abe[_0x49bf('0x1e')][_0x49bf('0x42')])_0x4cff65(_0x3e8abe[_0x49bf('0x1e')][_0x49bf('0x41')],_0x3e8abe[_0x49bf('0x1e')][_0x49bf('0x43')]);else if(_0x3e8abe[_0x49bf('0x42')])_0x4cff65(_0x49bf('0x44'),'.qd_sp_display_installmentValue',parseInt(_0x10e77a[_0x49bf('0x23')](_0x49bf('0x45'))[_0x49bf('0x38')]()||0x1)||0x1);_0x10e77a['find'](_0x49bf('0x46'))[_0x49bf('0x47')](qd_number_format(_0x37d3f1-_0x15ac42,0x2,',','.'));_0x10e77a[_0x49bf('0x23')]('.qd_saveAmountPercent')[_0x49bf('0x48')](qd_number_format((_0x37d3f1-_0x15ac42)*0x64/_0x37d3f1,0x2,',','.'));if(_0x48bd41&&_0x3e8abe[_0x49bf('0x1e')]['changeNativeSaveAmount']){_0x4f5c84('em.economia-de')[_0x49bf('0x49')](function(){_0x210028=_0x4f5c84(this);_0x210028['text'](_0x210028[_0x49bf('0x14')]()['trim']()[_0x49bf('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x37d3f1-_0x15ac42,0x2,',','.')));_0x210028[_0x49bf('0x25')](_0x49bf('0x28'));});}};_0x191096(_0x5bbc45);if(_0x48bd41)_0x4f5c84(window)['on'](_0x49bf('0x4a'),function(_0x19d6f6,_0x5135ea,_0x3db207){_0x191096(_0x3db207);});_0x10e77a[_0x49bf('0x25')](_0x49bf('0x4b'));if(!_0x48bd41)_0xd6d826['addClass'](_0x49bf('0x4b'));};(_0x3e8abe[_0x49bf('0x4c')]?_0x44dd13[_0x49bf('0x23')](_0x3e8abe['flagElement']):_0x44dd13)['each'](function(){_0x7f1914['call'](this,![]);});if(typeof _0x3e8abe[_0x49bf('0x4d')]==_0x49bf('0x4e')){var _0x11de8e=_0x3e8abe['startedByWrapper']?_0x44dd13:_0x44dd13['closest'](_0x3e8abe[_0x49bf('0x20')]);if(_0x3e8abe[_0x49bf('0x1e')]['isProductPage'])_0x11de8e=_0x11de8e['closest'](_0x3e8abe[_0x49bf('0x1e')][_0x49bf('0x20')])[_0x49bf('0x4f')]('.qd_sp_processedItem');else _0x11de8e=_0x11de8e[_0x49bf('0x23')](_0x49bf('0x50'));_0x11de8e[_0x49bf('0x49')](function(){var _0xa37448=_0x4f5c84(_0x3e8abe[_0x49bf('0x4d')]);_0xa37448[_0x49bf('0x31')](_0x49bf('0x51'),_0x49bf('0x52'));if(_0x3e8abe[_0x49bf('0x1e')][_0x49bf('0x22')])_0x4f5c84(this)['append'](_0xa37448);else _0x4f5c84(this)[_0x49bf('0x53')](_0xa37448);_0x7f1914[_0x49bf('0x54')](_0xa37448,!![]);});}};_0x4f5c84['fn'][_0x49bf('0x55')]=function(_0x5b688d){var _0x192346=_0x4f5c84(this);if(!_0x192346[_0x49bf('0x9')])return _0x192346;var _0x3b507b=_0x4f5c84[_0x49bf('0x56')](!![],{},_0xe763b8,_0x5b688d);if(typeof _0x3b507b[_0x49bf('0x1e')][_0x49bf('0x22')]!=_0x49bf('0x57'))_0x3b507b['productPage']['isProductPage']=_0x4f5c84(document[_0x49bf('0x58')])['is']('.produto');_0x2bd5c2(_0x192346,_0x3b507b);return _0x192346;};}(this));
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
var _0xfcf7=['qd-am-level-','qd-am-','-li','.qd_amazing_menu_auto','getParent','closest','function','QD_amazingMenu','/qd-amazing-menu','undefined','info','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','join','error','apply','warn','qdAmAddNdx','each','addClass','qd-am-li-','first','qd-am-first','qd-am-last','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','toUpperCase','erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','.qd-am-banner','length','qd-am-banner-wrapper','parent','qd-am-collection-wrapper','qdAjax','url','html','attr','.box-banner','clone','insertBefore','hide','qd-am-content-loaded','text','trim','data-qdam-value','[class*=\x27colunas\x27]','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','children',':not(ul)','qd-am-elem-','replaceSpecialChars','replace','qd-amazing-menu','qd-am-dropdown-menu'];(function(_0x15baa4,_0x58b8a8){var _0x3cd2c4=function(_0x3583fc){while(--_0x3583fc){_0x15baa4['push'](_0x15baa4['shift']());}};_0x3cd2c4(++_0x58b8a8);}(_0xfcf7,0x19c));var _0x7fcf=function(_0x3ba4bd,_0x2b1c5d){_0x3ba4bd=_0x3ba4bd-0x0;var _0x7b2aea=_0xfcf7[_0x3ba4bd];return _0x7b2aea;};(function(_0x142336){_0x142336['fn'][_0x7fcf('0x0')]=_0x142336['fn'][_0x7fcf('0x1')];}(jQuery));(function(_0x314f3b){var _0xe63061;var _0x44b5fd=jQuery;if(_0x7fcf('0x2')!==typeof _0x44b5fd['fn'][_0x7fcf('0x3')]){var _0x30330f={'url':_0x7fcf('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0x41e2ef=function(_0x414559,_0x404df7){if('object'===typeof console&&_0x7fcf('0x5')!==typeof console['error']&&_0x7fcf('0x5')!==typeof console[_0x7fcf('0x6')]&&_0x7fcf('0x5')!==typeof console['warn']){var _0x2ce718;'object'===typeof _0x414559?(_0x414559[_0x7fcf('0x7')](_0x7fcf('0x8')),_0x2ce718=_0x414559):_0x2ce718=[_0x7fcf('0x8')+_0x414559];if('undefined'===typeof _0x404df7||_0x7fcf('0x9')!==_0x404df7[_0x7fcf('0xa')]()&&'aviso'!==_0x404df7[_0x7fcf('0xa')]())if(_0x7fcf('0x5')!==typeof _0x404df7&&'info'===_0x404df7[_0x7fcf('0xa')]())try{console['info']['apply'](console,_0x2ce718);}catch(_0xb96762){try{console[_0x7fcf('0x6')](_0x2ce718[_0x7fcf('0xb')]('\x0a'));}catch(_0xff8e45){}}else try{console[_0x7fcf('0xc')][_0x7fcf('0xd')](console,_0x2ce718);}catch(_0x4d1867){try{console[_0x7fcf('0xc')](_0x2ce718[_0x7fcf('0xb')]('\x0a'));}catch(_0xa584b3){}}else try{console[_0x7fcf('0xe')][_0x7fcf('0xd')](console,_0x2ce718);}catch(_0x46abbf){try{console[_0x7fcf('0xe')](_0x2ce718[_0x7fcf('0xb')]('\x0a'));}catch(_0x33b870){}}}};_0x44b5fd['fn'][_0x7fcf('0xf')]=function(){var _0x241b81=_0x44b5fd(this);_0x241b81[_0x7fcf('0x10')](function(_0x43d3e4){_0x44b5fd(this)[_0x7fcf('0x11')](_0x7fcf('0x12')+_0x43d3e4);});_0x241b81[_0x7fcf('0x13')]()[_0x7fcf('0x11')](_0x7fcf('0x14'));_0x241b81['last']()[_0x7fcf('0x11')](_0x7fcf('0x15'));return _0x241b81;};_0x44b5fd['fn'][_0x7fcf('0x3')]=function(){};_0x314f3b=function(_0x293395){var _0x1396db={'t':_0x7fcf('0x16')};return function(_0x104aea){var _0x57c295=function(_0x16069f){return _0x16069f;};var _0x40380b=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x104aea=_0x104aea['d'+_0x40380b[0x10]+'c'+_0x40380b[0x11]+'m'+_0x57c295(_0x40380b[0x1])+'n'+_0x40380b[0xd]]['l'+_0x40380b[0x12]+'c'+_0x40380b[0x0]+'ti'+_0x57c295('o')+'n'];var _0x46c68e=function(_0x210732){return escape(encodeURIComponent(_0x210732['replace'](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x53b0e0){return String['fromCharCode'](('Z'>=_0x53b0e0?0x5a:0x7a)>=(_0x53b0e0=_0x53b0e0['charCodeAt'](0x0)+0xd)?_0x53b0e0:_0x53b0e0-0x1a);})));};var _0x5acaf1=_0x46c68e(_0x104aea[[_0x40380b[0x9],_0x57c295('o'),_0x40380b[0xc],_0x40380b[_0x57c295(0xd)]][_0x7fcf('0xb')]('')]);_0x46c68e=_0x46c68e((window[['js',_0x57c295('no'),'m',_0x40380b[0x1],_0x40380b[0x4][_0x7fcf('0x17')](),'ite']['join']('')]||'---')+['.v',_0x40380b[0xd],'e',_0x57c295('x'),'co',_0x57c295('mm'),_0x7fcf('0x18'),_0x40380b[0x1],'.c',_0x57c295('o'),'m.',_0x40380b[0x13],'r']['join'](''));for(var _0x242a2b in _0x1396db){if(_0x46c68e===_0x242a2b+_0x1396db[_0x242a2b]||_0x5acaf1===_0x242a2b+_0x1396db[_0x242a2b]){var _0x44cdce='tr'+_0x40380b[0x11]+'e';break;}_0x44cdce='f'+_0x40380b[0x0]+'ls'+_0x57c295(_0x40380b[0x1])+'';}_0x57c295=!0x1;-0x1<_0x104aea[[_0x40380b[0xc],'e',_0x40380b[0x0],'rc',_0x40380b[0x9]][_0x7fcf('0xb')]('')][_0x7fcf('0x19')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x57c295=!0x0);return[_0x44cdce,_0x57c295];}(_0x293395);}(window);if(!eval(_0x314f3b[0x0]))return _0x314f3b[0x1]?_0x41e2ef(_0x7fcf('0x1a')):!0x1;var _0x93050c=function(_0x521371){var _0x4c39c1=_0x521371[_0x7fcf('0x1b')](_0x7fcf('0x1c'));var _0x5561b2=_0x4c39c1[_0x7fcf('0x1d')](_0x7fcf('0x1e'));var _0xf73748=_0x4c39c1[_0x7fcf('0x1d')]('.qd-am-collection');if(_0x5561b2[_0x7fcf('0x1f')]||_0xf73748[_0x7fcf('0x1f')])_0x5561b2['parent']()[_0x7fcf('0x11')](_0x7fcf('0x20')),_0xf73748[_0x7fcf('0x21')]()['addClass'](_0x7fcf('0x22')),_0x44b5fd[_0x7fcf('0x23')]({'url':_0xe63061[_0x7fcf('0x24')],'dataType':_0x7fcf('0x25'),'success':function(_0x2902e2){var _0x13c1ab=_0x44b5fd(_0x2902e2);_0x5561b2[_0x7fcf('0x10')](function(){var _0x2902e2=_0x44b5fd(this);var _0x476ff3=_0x13c1ab[_0x7fcf('0x1b')]('img[alt=\x27'+_0x2902e2[_0x7fcf('0x26')]('data-qdam-value')+'\x27]');_0x476ff3['length']&&(_0x476ff3[_0x7fcf('0x10')](function(){_0x44b5fd(this)['getParent'](_0x7fcf('0x27'))[_0x7fcf('0x28')]()[_0x7fcf('0x29')](_0x2902e2);}),_0x2902e2[_0x7fcf('0x2a')]());})[_0x7fcf('0x11')](_0x7fcf('0x2b'));_0xf73748[_0x7fcf('0x10')](function(){var _0x2902e2={};var _0x729546=_0x44b5fd(this);_0x13c1ab[_0x7fcf('0x1b')]('h2')[_0x7fcf('0x10')](function(){if(_0x44b5fd(this)[_0x7fcf('0x2c')]()[_0x7fcf('0x2d')]()[_0x7fcf('0xa')]()==_0x729546[_0x7fcf('0x26')](_0x7fcf('0x2e'))[_0x7fcf('0x2d')]()[_0x7fcf('0xa')]())return _0x2902e2=_0x44b5fd(this),!0x1;});_0x2902e2['length']&&(_0x2902e2[_0x7fcf('0x10')](function(){_0x44b5fd(this)[_0x7fcf('0x0')](_0x7fcf('0x2f'))['clone']()[_0x7fcf('0x29')](_0x729546);}),_0x729546[_0x7fcf('0x2a')]());})[_0x7fcf('0x11')](_0x7fcf('0x2b'));},'error':function(){_0x41e2ef(_0x7fcf('0x30')+_0xe63061[_0x7fcf('0x24')]+'\x27\x20falho.');},'complete':function(){_0xe63061[_0x7fcf('0x31')][_0x7fcf('0x32')](this);_0x44b5fd(window)[_0x7fcf('0x33')](_0x7fcf('0x34'),_0x521371);},'clearQueueDelay':0xbb8});};_0x44b5fd[_0x7fcf('0x3')]=function(_0x1ae02e){var _0x3a2d9f=_0x1ae02e['find'](_0x7fcf('0x35'))[_0x7fcf('0x10')](function(){var _0x3985ce=_0x44b5fd(this);if(!_0x3985ce['length'])return _0x41e2ef([_0x7fcf('0x36'),_0x1ae02e],_0x7fcf('0x9'));_0x3985ce[_0x7fcf('0x1b')](_0x7fcf('0x37'))[_0x7fcf('0x21')]()[_0x7fcf('0x11')](_0x7fcf('0x38'));_0x3985ce[_0x7fcf('0x1b')]('li')[_0x7fcf('0x10')](function(){var _0x35576e=_0x44b5fd(this);var _0x44b588=_0x35576e[_0x7fcf('0x39')](_0x7fcf('0x3a'));_0x44b588[_0x7fcf('0x1f')]&&_0x35576e[_0x7fcf('0x11')](_0x7fcf('0x3b')+_0x44b588[_0x7fcf('0x13')]()[_0x7fcf('0x2c')]()[_0x7fcf('0x2d')]()[_0x7fcf('0x3c')]()['replace'](/\./g,'')[_0x7fcf('0x3d')](/\s/g,'-')[_0x7fcf('0xa')]());});var _0x4448de=_0x3985ce[_0x7fcf('0x1b')]('>li')[_0x7fcf('0xf')]();_0x3985ce[_0x7fcf('0x11')](_0x7fcf('0x3e'));_0x4448de=_0x4448de[_0x7fcf('0x1b')]('>ul');_0x4448de[_0x7fcf('0x10')](function(){var _0x15aec8=_0x44b5fd(this);_0x15aec8['find']('>li')[_0x7fcf('0xf')]()['addClass']('qd-am-column');_0x15aec8['addClass'](_0x7fcf('0x3f'));_0x15aec8[_0x7fcf('0x21')]()[_0x7fcf('0x11')]('qd-am-dropdown');});_0x4448de['addClass']('qd-am-dropdown');var _0x26401e=0x0,_0x314f3b=function(_0x4f8ca1){_0x26401e+=0x1;_0x4f8ca1=_0x4f8ca1[_0x7fcf('0x39')]('li')[_0x7fcf('0x39')]('*');_0x4f8ca1[_0x7fcf('0x1f')]&&(_0x4f8ca1[_0x7fcf('0x11')](_0x7fcf('0x40')+_0x26401e),_0x314f3b(_0x4f8ca1));};_0x314f3b(_0x3985ce);_0x3985ce['add'](_0x3985ce[_0x7fcf('0x1b')]('ul'))[_0x7fcf('0x10')](function(){var _0x5a76b2=_0x44b5fd(this);_0x5a76b2['addClass'](_0x7fcf('0x41')+_0x5a76b2[_0x7fcf('0x39')]('li')[_0x7fcf('0x1f')]+_0x7fcf('0x42'));});});_0x93050c(_0x3a2d9f);_0xe63061['callback'][_0x7fcf('0x32')](this);_0x44b5fd(window)[_0x7fcf('0x33')]('QuatroDigital.am.callback',_0x1ae02e);};_0x44b5fd['fn'][_0x7fcf('0x3')]=function(_0x4ab0dc){var _0x344d35=_0x44b5fd(this);if(!_0x344d35['length'])return _0x344d35;_0xe63061=_0x44b5fd['extend']({},_0x30330f,_0x4ab0dc);_0x344d35['exec']=new _0x44b5fd['QD_amazingMenu'](_0x44b5fd(this));return _0x344d35;};_0x44b5fd(function(){_0x44b5fd(_0x7fcf('0x43'))['QD_amazingMenu']();});}}(this));

/* Quatro Digital Smart Cart */
var _0x5636=['quantity','callback','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','filter','.singular','show','addClass','qd-emptyCart','removeClass','cartTotalE','html','cartQttE','itemsTextE','cartTotal','find','itemsText','emptyElem','emptyCart','qd-sc-populated','smartCheckout','_QuatroDigital_DropDown','vtexjs','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','QD_checkoutQueue','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','trigger','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','bind','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','Oooops!\x20','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','join','Callbacks','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','input.buy-in-page-quantity','javascript:','body','.productQuickView','success','Produto\x20adicionado\x20ao\x20carrinho!','location','href','#produto,\x20.produto','qd-bb-click-active','click.qd_bb_buy_sc','clickBuySmartCheckout','preventDefault','buyButton','.qd-sbb-on','qd-sbb-on','.btn-add-buy-button-asynchronous','qd-bb-active','.qd-bb-productAdded','append','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','.buy-in-page-button','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','prodAdd','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','[href=\x27','qd-bb-itemAddBuyButtonWrapper','qd-bb-itemAddCartWrapper','timeRemoveNewItemClass','isSmartCheckout','função\x20descontinuada','getCartInfoByUrl','allowUpdate','unbind','click','mouseenter.qd_bb_buy_sc','load','indexOf','selectSkuMsg','?redirect=false&','execDefaultAction','redirect=false','redirect=true','buyIfQuantityZeroed','test','match','push','productPageCallback','ku=','pop','shift','asyncCallback','cartProductAdded.vtex','fakeRequest','ajax','buyButtonClickCallback','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','QD_buyButton','children','.qd-bb-itemAddWrapper','prepend','QuatroDigital.qd_bb_prod_add','ajaxSend','/checkout/cart/add','ajaxStop','abs','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','QD_dropDownCart','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','click.qd_ddc_scrollUp','.qd-ddc-scrollDown','scrollCart','.qd-ddc-shipping\x20input','shippingCalculate','mouseenter.qd_ddc_hover','cartIsEmpty','mouseleave.qd_ddc_hover','texts','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','.qd-ddc-viewCart','linkCart','.qd_ddc_continueShopping','continueShopping','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalShipping','.qd-ddc-infoAllTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','.qd-ddc-wrapper','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','qd-ddc-','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','.qd-ddc-quantity','val','.qd-ddc-remove','insertProdImg','.qd-ddc-image','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','address','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-empty','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','qd-loaded','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','click.qd_ddc_remove','removeProduct','stop','slideUp','remove','$1-$2$3','qdDdcLastPostalCode','calculateShipping','BRA','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','index','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','height','animate','updateOnlyHover','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','.qd_bap_wrapper_content','.qdDdcContainer','dropDown','smartCart','getParent','replace','undefined','pow','round','toFixed','split','length','prototype','trim','function','capitalize','charAt','slice','toLowerCase','qdAjaxQueue','jquery','qdAjax','extend','GET','object','data','stringify','toString','url','type','jqXHR','done','fail','always','complete','clearQueueDelay','error','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','version','4.0','closest','checkout','getOrderForm','call','QuatroDigital_simpleCart','ajaxStopOn','simpleCart','alerta','warn','[Simple\x20Cart]\x0a','info','elements','QD_simpleCart','add','.qd_cart_qtt','.qd_cart_total','.qd_items_text','meta[name=currency]','attr','content','each','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','Shipping','value','total','currencySymbol','shipping','allTotal','qtt','showQuantityByItems','items'];(function(_0x1ea3ec,_0x409f63){var _0x2a11fa=function(_0x515b91){while(--_0x515b91){_0x1ea3ec['push'](_0x1ea3ec['shift']());}};_0x2a11fa(++_0x409f63);}(_0x5636,0x102));var _0x6563=function(_0x926608,_0x9894c3){_0x926608=_0x926608-0x0;var _0x375ec3=_0x5636[_0x926608];return _0x375ec3;};(function(_0x4f6f35){_0x4f6f35['fn'][_0x6563('0x0')]=_0x4f6f35['fn']['closest'];}(jQuery));function qd_number_format(_0x4ab349,_0x579d5c,_0x44872c,_0x3a95f7){_0x4ab349=(_0x4ab349+'')[_0x6563('0x1')](/[^0-9+\-Ee.]/g,'');_0x4ab349=isFinite(+_0x4ab349)?+_0x4ab349:0x0;_0x579d5c=isFinite(+_0x579d5c)?Math['abs'](_0x579d5c):0x0;_0x3a95f7=_0x6563('0x2')===typeof _0x3a95f7?',':_0x3a95f7;_0x44872c=_0x6563('0x2')===typeof _0x44872c?'.':_0x44872c;var _0x29f687='',_0x29f687=function(_0x193942,_0x9884a9){var _0x579d5c=Math[_0x6563('0x3')](0xa,_0x9884a9);return''+(Math[_0x6563('0x4')](_0x193942*_0x579d5c)/_0x579d5c)[_0x6563('0x5')](_0x9884a9);},_0x29f687=(_0x579d5c?_0x29f687(_0x4ab349,_0x579d5c):''+Math[_0x6563('0x4')](_0x4ab349))[_0x6563('0x6')]('.');0x3<_0x29f687[0x0]['length']&&(_0x29f687[0x0]=_0x29f687[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x3a95f7));(_0x29f687[0x1]||'')[_0x6563('0x7')]<_0x579d5c&&(_0x29f687[0x1]=_0x29f687[0x1]||'',_0x29f687[0x1]+=Array(_0x579d5c-_0x29f687[0x1][_0x6563('0x7')]+0x1)['join']('0'));return _0x29f687['join'](_0x44872c);};'function'!==typeof String[_0x6563('0x8')][_0x6563('0x9')]&&(String[_0x6563('0x8')][_0x6563('0x9')]=function(){return this[_0x6563('0x1')](/^\s+|\s+$/g,'');});_0x6563('0xa')!=typeof String[_0x6563('0x8')][_0x6563('0xb')]&&(String[_0x6563('0x8')]['capitalize']=function(){return this[_0x6563('0xc')](0x0)['toUpperCase']()+this[_0x6563('0xd')](0x1)[_0x6563('0xe')]();});(function(_0x33f8e4){if(_0x6563('0xa')!==typeof _0x33f8e4['qdAjax']){var _0x26f26e={};_0x33f8e4[_0x6563('0xf')]=_0x26f26e;0x96>parseInt((_0x33f8e4['fn'][_0x6563('0x10')][_0x6563('0x1')](/[^0-9]+/g,'')+'000')[_0x6563('0xd')](0x0,0x3),0xa)&&console&&'function'==typeof console['error']&&console['error']();_0x33f8e4[_0x6563('0x11')]=function(_0x4f5609){try{var _0x54e69c=_0x33f8e4[_0x6563('0x12')]({},{'url':'','type':_0x6563('0x13'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x4f5609);var _0x17a29f=_0x6563('0x14')===typeof _0x54e69c[_0x6563('0x15')]?JSON[_0x6563('0x16')](_0x54e69c[_0x6563('0x15')]):_0x54e69c[_0x6563('0x15')][_0x6563('0x17')]();var _0x5bf608=encodeURIComponent(_0x54e69c[_0x6563('0x18')]+'|'+_0x54e69c[_0x6563('0x19')]+'|'+_0x17a29f);_0x26f26e[_0x5bf608]=_0x26f26e[_0x5bf608]||{};_0x6563('0x2')==typeof _0x26f26e[_0x5bf608]['jqXHR']?_0x26f26e[_0x5bf608][_0x6563('0x1a')]=_0x33f8e4['ajax'](_0x54e69c):(_0x26f26e[_0x5bf608][_0x6563('0x1a')][_0x6563('0x1b')](_0x54e69c['success']),_0x26f26e[_0x5bf608]['jqXHR'][_0x6563('0x1c')](_0x54e69c['error']),_0x26f26e[_0x5bf608][_0x6563('0x1a')][_0x6563('0x1d')](_0x54e69c[_0x6563('0x1e')]));_0x26f26e[_0x5bf608]['jqXHR'][_0x6563('0x1d')](function(){isNaN(parseInt(_0x54e69c['clearQueueDelay']))||setTimeout(function(){_0x26f26e[_0x5bf608][_0x6563('0x1a')]=void 0x0;},_0x54e69c[_0x6563('0x1f')]);});return _0x26f26e[_0x5bf608]['jqXHR'];}catch(_0x365b16){_0x6563('0x2')!==typeof console&&'function'===typeof console[_0x6563('0x20')]&&console['error'](_0x6563('0x21')+_0x365b16['message']);}};_0x33f8e4['qdAjax'][_0x6563('0x22')]=_0x6563('0x23');}}(jQuery));(function(_0x17326c){_0x17326c['fn'][_0x6563('0x0')]=_0x17326c['fn'][_0x6563('0x24')];}(jQuery));(function(){var _0x4b4d3b=jQuery;if(_0x6563('0xa')!==typeof _0x4b4d3b['fn']['simpleCart']){_0x4b4d3b(function(){var _0x5b100b=vtexjs[_0x6563('0x25')][_0x6563('0x26')];vtexjs[_0x6563('0x25')][_0x6563('0x26')]=function(){return _0x5b100b[_0x6563('0x27')]();};});try{window[_0x6563('0x28')]=window[_0x6563('0x28')]||{};window[_0x6563('0x28')][_0x6563('0x29')]=!0x1;_0x4b4d3b['fn'][_0x6563('0x2a')]=function(_0x59b1a6,_0x9b3d86,_0x30b67c){var _0x29fb9d=function(_0x1558fb,_0x29ab06){if(_0x6563('0x14')===typeof console){var _0x1bd58a='object'===typeof _0x1558fb;_0x6563('0x2')!==typeof _0x29ab06&&_0x6563('0x2b')===_0x29ab06[_0x6563('0xe')]()?_0x1bd58a?console[_0x6563('0x2c')](_0x6563('0x2d'),_0x1558fb[0x0],_0x1558fb[0x1],_0x1558fb[0x2],_0x1558fb[0x3],_0x1558fb[0x4],_0x1558fb[0x5],_0x1558fb[0x6],_0x1558fb[0x7]):console[_0x6563('0x2c')]('[Simple\x20Cart]\x0a'+_0x1558fb):_0x6563('0x2')!==typeof _0x29ab06&&_0x6563('0x2e')===_0x29ab06[_0x6563('0xe')]()?_0x1bd58a?console[_0x6563('0x2e')](_0x6563('0x2d'),_0x1558fb[0x0],_0x1558fb[0x1],_0x1558fb[0x2],_0x1558fb[0x3],_0x1558fb[0x4],_0x1558fb[0x5],_0x1558fb[0x6],_0x1558fb[0x7]):console[_0x6563('0x2e')](_0x6563('0x2d')+_0x1558fb):_0x1bd58a?console['error'](_0x6563('0x2d'),_0x1558fb[0x0],_0x1558fb[0x1],_0x1558fb[0x2],_0x1558fb[0x3],_0x1558fb[0x4],_0x1558fb[0x5],_0x1558fb[0x6],_0x1558fb[0x7]):console[_0x6563('0x20')]('[Simple\x20Cart]\x0a'+_0x1558fb);}};var _0xf6b446=_0x4b4d3b(this);_0x6563('0x14')===typeof _0x59b1a6?_0x9b3d86=_0x59b1a6:(_0x59b1a6=_0x59b1a6||!0x1,_0xf6b446=_0xf6b446['add'](_0x4b4d3b['QD_simpleCart'][_0x6563('0x2f')]));if(!_0xf6b446[_0x6563('0x7')])return _0xf6b446;_0x4b4d3b[_0x6563('0x30')][_0x6563('0x2f')]=_0x4b4d3b['QD_simpleCart'][_0x6563('0x2f')][_0x6563('0x31')](_0xf6b446);_0x30b67c='undefined'===typeof _0x30b67c?!0x1:_0x30b67c;var _0x6f31d9={'cartQtt':_0x6563('0x32'),'cartTotal':_0x6563('0x33'),'itemsText':_0x6563('0x34'),'currencySymbol':(_0x4b4d3b(_0x6563('0x35'))[_0x6563('0x36')](_0x6563('0x37'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x15c23e=_0x4b4d3b[_0x6563('0x12')]({},_0x6f31d9,_0x9b3d86);var _0x54b601=_0x4b4d3b('');_0xf6b446[_0x6563('0x38')](function(){var _0x772286=_0x4b4d3b(this);_0x772286[_0x6563('0x15')](_0x6563('0x39'))||_0x772286['data']('qd_simpleCartOpts',_0x15c23e);});var _0x13bbbb=function(_0x11e5a4){window[_0x6563('0x3a')]=window['_QuatroDigital_CartData']||{};for(var _0x59b1a6=0x0,_0x50c3ce=0x0,_0x36d1aa=0x0;_0x36d1aa<_0x11e5a4[_0x6563('0x3b')]['length'];_0x36d1aa++)_0x6563('0x3c')==_0x11e5a4[_0x6563('0x3b')][_0x36d1aa]['id']&&(_0x50c3ce+=_0x11e5a4[_0x6563('0x3b')][_0x36d1aa][_0x6563('0x3d')]),_0x59b1a6+=_0x11e5a4[_0x6563('0x3b')][_0x36d1aa][_0x6563('0x3d')];window[_0x6563('0x3a')][_0x6563('0x3e')]=_0x15c23e[_0x6563('0x3f')]+qd_number_format(_0x59b1a6/0x64,0x2,',','.');window[_0x6563('0x3a')][_0x6563('0x40')]=_0x15c23e['currencySymbol']+qd_number_format(_0x50c3ce/0x64,0x2,',','.');window['_QuatroDigital_CartData'][_0x6563('0x41')]=_0x15c23e[_0x6563('0x3f')]+qd_number_format((_0x59b1a6+_0x50c3ce)/0x64,0x2,',','.');window[_0x6563('0x3a')][_0x6563('0x42')]=0x0;if(_0x15c23e[_0x6563('0x43')])for(_0x36d1aa=0x0;_0x36d1aa<_0x11e5a4[_0x6563('0x44')][_0x6563('0x7')];_0x36d1aa++)window['_QuatroDigital_CartData'][_0x6563('0x42')]+=_0x11e5a4[_0x6563('0x44')][_0x36d1aa][_0x6563('0x45')];else window[_0x6563('0x3a')]['qtt']=_0x11e5a4[_0x6563('0x44')][_0x6563('0x7')]||0x0;try{window[_0x6563('0x3a')][_0x6563('0x46')]&&window[_0x6563('0x3a')]['callback']['fire']&&window[_0x6563('0x3a')][_0x6563('0x46')][_0x6563('0x47')]();}catch(_0x5b0d2c){_0x29fb9d(_0x6563('0x48'));}_0x391d23(_0x54b601);};var _0x120723=function(_0x409f45,_0x3658ac){0x1===_0x409f45?_0x3658ac['hide']()[_0x6563('0x49')](_0x6563('0x4a'))[_0x6563('0x4b')]():_0x3658ac['hide']()[_0x6563('0x49')]('.plural')[_0x6563('0x4b')]();};var _0x4c5048=function(_0x49090b){0x1>_0x49090b?_0xf6b446[_0x6563('0x4c')](_0x6563('0x4d')):_0xf6b446[_0x6563('0x4e')](_0x6563('0x4d'));};var _0x1facb9=function(_0x12f8b5,_0x2eb8ee){var _0x16da30=parseInt(window[_0x6563('0x3a')][_0x6563('0x42')],0xa);_0x2eb8ee['$this'][_0x6563('0x4b')]();isNaN(_0x16da30)&&(_0x29fb9d('O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.',_0x6563('0x2b')),_0x16da30=0x0);_0x2eb8ee[_0x6563('0x4f')][_0x6563('0x50')](window['_QuatroDigital_CartData'][_0x6563('0x3e')]);_0x2eb8ee[_0x6563('0x51')]['html'](_0x16da30);_0x120723(_0x16da30,_0x2eb8ee[_0x6563('0x52')]);_0x4c5048(_0x16da30);};var _0x391d23=function(_0x1c90b1){_0xf6b446[_0x6563('0x38')](function(){var _0xbd920a={};var _0x4f6ed7=_0x4b4d3b(this);_0x59b1a6&&_0x4f6ed7[_0x6563('0x15')]('qd_simpleCartOpts')&&_0x4b4d3b[_0x6563('0x12')](_0x15c23e,_0x4f6ed7['data'](_0x6563('0x39')));_0xbd920a['$this']=_0x4f6ed7;_0xbd920a['cartQttE']=_0x4f6ed7['find'](_0x15c23e['cartQtt'])||_0x54b601;_0xbd920a[_0x6563('0x4f')]=_0x4f6ed7['find'](_0x15c23e[_0x6563('0x53')])||_0x54b601;_0xbd920a['itemsTextE']=_0x4f6ed7[_0x6563('0x54')](_0x15c23e[_0x6563('0x55')])||_0x54b601;_0xbd920a[_0x6563('0x56')]=_0x4f6ed7[_0x6563('0x54')](_0x15c23e[_0x6563('0x57')])||_0x54b601;_0x1facb9(_0x1c90b1,_0xbd920a);_0x4f6ed7[_0x6563('0x4c')](_0x6563('0x58'));});};(function(){if(_0x15c23e[_0x6563('0x59')]){window[_0x6563('0x5a')]=window['_QuatroDigital_DropDown']||{};if(_0x6563('0x2')!==typeof window[_0x6563('0x5a')][_0x6563('0x26')]&&(_0x30b67c||!_0x59b1a6))return _0x13bbbb(window[_0x6563('0x5a')][_0x6563('0x26')]);if(_0x6563('0x14')!==typeof window[_0x6563('0x5b')]||_0x6563('0x2')===typeof window[_0x6563('0x5b')][_0x6563('0x25')])if(_0x6563('0x14')===typeof vtex&&'object'===typeof vtex[_0x6563('0x25')]&&_0x6563('0x2')!==typeof vtex[_0x6563('0x25')][_0x6563('0x5c')])new vtex[(_0x6563('0x25'))][(_0x6563('0x5c'))]();else return _0x29fb9d(_0x6563('0x5d'));_0x4b4d3b[_0x6563('0x5e')](['items',_0x6563('0x3b'),'shippingData'],{'done':function(_0x1f597f){_0x13bbbb(_0x1f597f);window[_0x6563('0x5a')]['getOrderForm']=_0x1f597f;},'fail':function(_0x4f3d5f){_0x29fb9d([_0x6563('0x5f'),_0x4f3d5f]);}});}else alert(_0x6563('0x60'));}());_0x15c23e[_0x6563('0x46')]();_0x4b4d3b(window)[_0x6563('0x61')]('simpleCartCallback.quatro_digital');return _0xf6b446;};_0x4b4d3b[_0x6563('0x30')]={'elements':_0x4b4d3b('')};_0x4b4d3b(function(){var _0x49c1e0;_0x6563('0xa')===typeof window[_0x6563('0x62')]&&(_0x49c1e0=window['ajaxRequestbuyButtonAsynchronous'],window['ajaxRequestbuyButtonAsynchronous']=function(_0x3a3a35,_0x5bae4c,_0x4f1f02,_0x1fa23f,_0x49d6a5){_0x49c1e0[_0x6563('0x27')](this,_0x3a3a35,_0x5bae4c,_0x4f1f02,_0x1fa23f,function(){_0x6563('0xa')===typeof _0x49d6a5&&_0x49d6a5();_0x4b4d3b[_0x6563('0x30')][_0x6563('0x2f')]['each'](function(){var _0x83d5c=_0x4b4d3b(this);_0x83d5c[_0x6563('0x2a')](_0x83d5c[_0x6563('0x15')](_0x6563('0x39')));});});});});var _0x3ffb7f=window[_0x6563('0x63')]||void 0x0;window[_0x6563('0x63')]=function(_0x7d8546){_0x4b4d3b['fn']['simpleCart'](!0x0);'function'===typeof _0x3ffb7f?_0x3ffb7f[_0x6563('0x27')](this,_0x7d8546):alert(_0x7d8546);};_0x4b4d3b(function(){var _0x3a756a=_0x4b4d3b('.qd_cart_auto');_0x3a756a['length']&&_0x3a756a['simpleCart']();});_0x4b4d3b(function(){_0x4b4d3b(window)[_0x6563('0x64')](_0x6563('0x65'),function(){_0x4b4d3b['fn'][_0x6563('0x2a')](!0x0);});});}catch(_0x149b74){'undefined'!==typeof console&&_0x6563('0xa')===typeof console[_0x6563('0x20')]&&console[_0x6563('0x20')](_0x6563('0x66'),_0x149b74);}}}());(function(){var _0xb55389=function(_0x2426cd,_0x5d365e){if(_0x6563('0x14')===typeof console){var _0x5e8a05=_0x6563('0x14')===typeof _0x2426cd;_0x6563('0x2')!==typeof _0x5d365e&&_0x6563('0x2b')===_0x5d365e[_0x6563('0xe')]()?_0x5e8a05?console[_0x6563('0x2c')](_0x6563('0x67'),_0x2426cd[0x0],_0x2426cd[0x1],_0x2426cd[0x2],_0x2426cd[0x3],_0x2426cd[0x4],_0x2426cd[0x5],_0x2426cd[0x6],_0x2426cd[0x7]):console[_0x6563('0x2c')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a'+_0x2426cd):'undefined'!==typeof _0x5d365e&&_0x6563('0x2e')===_0x5d365e[_0x6563('0xe')]()?_0x5e8a05?console[_0x6563('0x2e')](_0x6563('0x67'),_0x2426cd[0x0],_0x2426cd[0x1],_0x2426cd[0x2],_0x2426cd[0x3],_0x2426cd[0x4],_0x2426cd[0x5],_0x2426cd[0x6],_0x2426cd[0x7]):console[_0x6563('0x2e')](_0x6563('0x67')+_0x2426cd):_0x5e8a05?console['error']('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x2426cd[0x0],_0x2426cd[0x1],_0x2426cd[0x2],_0x2426cd[0x3],_0x2426cd[0x4],_0x2426cd[0x5],_0x2426cd[0x6],_0x2426cd[0x7]):console['error'](_0x6563('0x67')+_0x2426cd);}},_0x4e4e6d=null,_0x4fd7fc={},_0x25e2e6={},_0x1d7b5d={};$[_0x6563('0x5e')]=function(_0x2a222e,_0x1d8edb){if(null===_0x4e4e6d)if(_0x6563('0x14')===typeof window['vtexjs']&&_0x6563('0x2')!==typeof window[_0x6563('0x5b')][_0x6563('0x25')])_0x4e4e6d=window[_0x6563('0x5b')]['checkout'];else return _0xb55389(_0x6563('0x68'));var _0xd0ec42=$[_0x6563('0x12')]({'done':function(){},'fail':function(){}},_0x1d8edb),_0x3e4687=_0x2a222e[_0x6563('0x69')](';'),_0x3d5186=function(){_0x4fd7fc[_0x3e4687][_0x6563('0x31')](_0xd0ec42[_0x6563('0x1b')]);_0x25e2e6[_0x3e4687][_0x6563('0x31')](_0xd0ec42[_0x6563('0x1c')]);};_0x1d7b5d[_0x3e4687]?_0x3d5186():(_0x4fd7fc[_0x3e4687]=$[_0x6563('0x6a')](),_0x25e2e6[_0x3e4687]=$[_0x6563('0x6a')](),_0x3d5186(),_0x1d7b5d[_0x3e4687]=!0x0,_0x4e4e6d[_0x6563('0x26')](_0x2a222e)[_0x6563('0x1b')](function(_0x18a214){_0x1d7b5d[_0x3e4687]=!0x1;_0x4fd7fc[_0x3e4687]['fire'](_0x18a214);})[_0x6563('0x1c')](function(_0x3594f7){_0x1d7b5d[_0x3e4687]=!0x1;_0x25e2e6[_0x3e4687][_0x6563('0x47')](_0x3594f7);}));};}());(function(_0x2b8fbc){try{var _0x2b4801=jQuery,_0x339285,_0x3fd214=_0x2b4801({}),_0x23551d=function(_0x18d34d,_0x5d01b7){if(_0x6563('0x14')===typeof console&&_0x6563('0x2')!==typeof console[_0x6563('0x20')]&&_0x6563('0x2')!==typeof console[_0x6563('0x2e')]&&_0x6563('0x2')!==typeof console[_0x6563('0x2c')]){var _0x489c26;_0x6563('0x14')===typeof _0x18d34d?(_0x18d34d[_0x6563('0x6b')](_0x6563('0x6c')),_0x489c26=_0x18d34d):_0x489c26=[_0x6563('0x6c')+_0x18d34d];if(_0x6563('0x2')===typeof _0x5d01b7||_0x6563('0x2b')!==_0x5d01b7['toLowerCase']()&&_0x6563('0x6d')!==_0x5d01b7[_0x6563('0xe')]())if(_0x6563('0x2')!==typeof _0x5d01b7&&'info'===_0x5d01b7[_0x6563('0xe')]())try{console[_0x6563('0x2e')][_0x6563('0x6e')](console,_0x489c26);}catch(_0x4d7664){try{console['info'](_0x489c26['join']('\x0a'));}catch(_0x2712b4){}}else try{console[_0x6563('0x20')][_0x6563('0x6e')](console,_0x489c26);}catch(_0x18e325){try{console['error'](_0x489c26[_0x6563('0x69')]('\x0a'));}catch(_0x2be9d9){}}else try{console['warn']['apply'](console,_0x489c26);}catch(_0x38f690){try{console[_0x6563('0x2c')](_0x489c26[_0x6563('0x69')]('\x0a'));}catch(_0x2fe67b){}}}},_0x1e4f72={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':'.productInformationWrapper\x20\x20a.buy-button','buyQtt':_0x6563('0x6f'),'selectSkuMsg':_0x6563('0x70'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x3e5200,_0x22c981,_0x24d334){_0x2b4801(_0x6563('0x71'))['is'](_0x6563('0x72'))&&(_0x6563('0x73')===_0x22c981?alert(_0x6563('0x74')):(alert('Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.'),(_0x6563('0x14')===typeof parent?parent:document)[_0x6563('0x75')][_0x6563('0x76')]=_0x24d334));},'isProductPage':function(){return _0x2b4801(_0x6563('0x71'))['is'](_0x6563('0x77'));},'execDefaultAction':function(_0x2530b5){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x2b4801['QD_buyButton']=function(_0x7aee61,_0x205351){function _0x223257(_0x5bec95){_0x339285['isSmartCheckout']?_0x5bec95[_0x6563('0x15')](_0x6563('0x78'))||(_0x5bec95[_0x6563('0x15')](_0x6563('0x78'),0x1),_0x5bec95['on'](_0x6563('0x79'),function(_0x4ea209){if(!_0x339285['allowBuyClick']())return!0x0;if(!0x0!==_0x2aa66e[_0x6563('0x7a')]['call'](this))return _0x4ea209[_0x6563('0x7b')](),!0x1;})):alert('Método\x20descontinuado!');}function _0x5bd03d(_0x2014f4){_0x2014f4=_0x2014f4||_0x2b4801(_0x339285[_0x6563('0x7c')]);_0x2014f4[_0x6563('0x38')](function(){var _0x2014f4=_0x2b4801(this);_0x2014f4['is'](_0x6563('0x7d'))||(_0x2014f4[_0x6563('0x4c')](_0x6563('0x7e')),_0x2014f4['is'](_0x6563('0x7f'))&&!_0x2014f4['is']('.remove-href')||_0x2014f4[_0x6563('0x15')](_0x6563('0x80'))||(_0x2014f4[_0x6563('0x15')](_0x6563('0x80'),0x1),_0x2014f4['children'](_0x6563('0x81'))['length']||_0x2014f4[_0x6563('0x82')](_0x6563('0x83')),_0x2014f4['is'](_0x6563('0x84'))&&_0x339285[_0x6563('0x85')]()&&_0x12b602[_0x6563('0x27')](_0x2014f4),_0x223257(_0x2014f4)));});_0x339285[_0x6563('0x85')]()&&!_0x2014f4[_0x6563('0x7')]&&_0x23551d(_0x6563('0x86')+_0x2014f4[_0x6563('0x87')]+'\x27.',_0x6563('0x2e'));}var _0x5ef502=_0x2b4801(_0x7aee61);var _0x2aa66e=this;window['_Quatro_Digital_dropDown']=window[_0x6563('0x88')]||{};window['_QuatroDigital_CartData']=window[_0x6563('0x3a')]||{};_0x2aa66e[_0x6563('0x89')]=function(_0x477094,_0x30b79d){_0x5ef502[_0x6563('0x4c')](_0x6563('0x8a'));_0x2b4801(_0x6563('0x71'))[_0x6563('0x4c')](_0x6563('0x8b'));var _0x2c17eb=_0x2b4801(_0x339285[_0x6563('0x7c')])['filter'](_0x6563('0x8c')+(_0x477094[_0x6563('0x36')](_0x6563('0x76'))||'---')+'\x27]')[_0x6563('0x31')](_0x477094);_0x2c17eb[_0x6563('0x4c')](_0x6563('0x8d'));setTimeout(function(){_0x5ef502[_0x6563('0x4e')](_0x6563('0x8e'));_0x2c17eb[_0x6563('0x4e')]('qd-bb-itemAddBuyButtonWrapper');},_0x339285[_0x6563('0x8f')]);window[_0x6563('0x88')]['getOrderForm']=void 0x0;if(_0x6563('0x2')!==typeof _0x205351&&'function'===typeof _0x205351['getCartInfoByUrl'])return _0x339285[_0x6563('0x90')]||(_0x23551d(_0x6563('0x91')),_0x205351[_0x6563('0x92')]()),window[_0x6563('0x5a')][_0x6563('0x26')]=void 0x0,_0x205351[_0x6563('0x92')](function(_0x1261e5){window[_0x6563('0x88')][_0x6563('0x26')]=_0x1261e5;_0x2b4801['fn'][_0x6563('0x2a')](!0x0,void 0x0,!0x0);},{'lastSku':_0x30b79d});window['_Quatro_Digital_dropDown'][_0x6563('0x93')]=!0x0;_0x2b4801['fn'][_0x6563('0x2a')](!0x0);};(function(){if(_0x339285['isSmartCheckout']&&_0x339285['autoWatchBuyButton']){var _0x39c5f9=_0x2b4801(_0x6563('0x7f'));_0x39c5f9[_0x6563('0x7')]&&_0x5bd03d(_0x39c5f9);}}());var _0x12b602=function(){var _0x537f3c=_0x2b4801(this);_0x6563('0x2')!==typeof _0x537f3c['data'](_0x6563('0x7c'))?(_0x537f3c[_0x6563('0x94')](_0x6563('0x95')),_0x223257(_0x537f3c)):(_0x537f3c[_0x6563('0x64')](_0x6563('0x96'),function(_0xe63ef4){_0x537f3c['unbind']('click');_0x223257(_0x537f3c);_0x2b4801(this)[_0x6563('0x94')](_0xe63ef4);}),_0x2b4801(window)[_0x6563('0x97')](function(){_0x537f3c['unbind'](_0x6563('0x95'));_0x223257(_0x537f3c);_0x537f3c['unbind']('mouseenter.qd_bb_buy_sc');}));};_0x2aa66e[_0x6563('0x7a')]=function(){var _0x24c810=_0x2b4801(this),_0x7aee61=_0x24c810[_0x6563('0x36')]('href')||'';if(-0x1<_0x7aee61[_0x6563('0x98')](_0x339285[_0x6563('0x99')]))return!0x0;_0x7aee61=_0x7aee61[_0x6563('0x1')](/redirect\=(false|true)/gi,'')[_0x6563('0x1')]('?',_0x6563('0x9a'))[_0x6563('0x1')](/\&\&/gi,'&');if(_0x339285[_0x6563('0x9b')](_0x24c810))return _0x24c810['attr'](_0x6563('0x76'),_0x7aee61[_0x6563('0x1')](_0x6563('0x9c'),_0x6563('0x9d'))),!0x0;_0x7aee61=_0x7aee61['replace'](/http.?:/i,'');_0x3fd214['queue'](function(_0x6c9860){if(!_0x339285[_0x6563('0x9e')]&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0x6563('0x9f')](_0x7aee61))return _0x6c9860();var _0x424cf9=function(_0x973c73,_0x18e58c){var _0x5bd03d=_0x7aee61[_0x6563('0xa0')](/sku\=([0-9]+)/gi),_0x194ddb=[];if('object'===typeof _0x5bd03d&&null!==_0x5bd03d)for(var _0x4d1fe0=_0x5bd03d[_0x6563('0x7')]-0x1;0x0<=_0x4d1fe0;_0x4d1fe0--){var _0x822c8=parseInt(_0x5bd03d[_0x4d1fe0][_0x6563('0x1')](/sku\=/gi,''));isNaN(_0x822c8)||_0x194ddb[_0x6563('0xa1')](_0x822c8);}_0x339285[_0x6563('0xa2')][_0x6563('0x27')](this,_0x973c73,_0x18e58c,_0x7aee61);_0x2aa66e['buyButtonClickCallback'][_0x6563('0x27')](this,_0x973c73,_0x18e58c,_0x7aee61,_0x194ddb);_0x2aa66e[_0x6563('0x89')](_0x24c810,_0x7aee61[_0x6563('0x6')](_0x6563('0xa3'))[_0x6563('0xa4')]()[_0x6563('0x6')]('&')[_0x6563('0xa5')]());'function'===typeof _0x339285[_0x6563('0xa6')]&&_0x339285[_0x6563('0xa6')][_0x6563('0x27')](this);_0x2b4801(window)[_0x6563('0x61')]('productAddedToCart');_0x2b4801(window)[_0x6563('0x61')](_0x6563('0xa7'));};_0x339285[_0x6563('0xa8')]?(_0x424cf9(null,_0x6563('0x73')),_0x6c9860()):_0x2b4801[_0x6563('0xa9')]({'url':_0x7aee61,'complete':_0x424cf9})[_0x6563('0x1d')](function(){_0x6c9860();});});};_0x2aa66e[_0x6563('0xaa')]=function(_0x5385db,_0x4d96dd,_0x28e6e3,_0x2ddef6){try{_0x6563('0x73')===_0x4d96dd&&_0x6563('0x14')===typeof window['parent']&&'function'===typeof window[_0x6563('0xab')][_0x6563('0xac')]&&window['parent'][_0x6563('0xac')](_0x5385db,_0x4d96dd,_0x28e6e3,_0x2ddef6);}catch(_0x484c60){_0x23551d(_0x6563('0xad'));}};_0x5bd03d();'function'===typeof _0x339285[_0x6563('0x46')]?_0x339285[_0x6563('0x46')][_0x6563('0x27')](this):_0x23551d('Callback\x20não\x20é\x20uma\x20função');};var _0x39e725=_0x2b4801[_0x6563('0x6a')]();_0x2b4801['fn'][_0x6563('0xae')]=function(_0x364aaf,_0x40a68a){var _0x2b8fbc=_0x2b4801(this);'undefined'!==typeof _0x40a68a||_0x6563('0x14')!==typeof _0x364aaf||_0x364aaf instanceof _0x2b4801||(_0x40a68a=_0x364aaf,_0x364aaf=void 0x0);_0x339285=_0x2b4801[_0x6563('0x12')]({},_0x1e4f72,_0x40a68a);var _0x38b8aa;_0x39e725[_0x6563('0x31')](function(){_0x2b8fbc[_0x6563('0xaf')](_0x6563('0xb0'))[_0x6563('0x7')]||_0x2b8fbc[_0x6563('0xb1')]('<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>');_0x38b8aa=new _0x2b4801[(_0x6563('0xae'))](_0x2b8fbc,_0x364aaf);});_0x39e725['fire']();_0x2b4801(window)['on'](_0x6563('0xb2'),function(_0x448d9e,_0x575d59,_0x1e9d67){_0x38b8aa[_0x6563('0x89')](_0x575d59,_0x1e9d67);});return _0x2b4801[_0x6563('0x12')](_0x2b8fbc,_0x38b8aa);};var _0x3a1c66=0x0;_0x2b4801(document)[_0x6563('0xb3')](function(_0x76476e,_0xbd419d,_0x5eb011){-0x1<_0x5eb011[_0x6563('0x18')][_0x6563('0xe')]()[_0x6563('0x98')](_0x6563('0xb4'))&&(_0x3a1c66=(_0x5eb011[_0x6563('0x18')][_0x6563('0xa0')](/sku\=([0-9]+)/i)||[''])[_0x6563('0xa4')]());});_0x2b4801(window)['bind']('productAddedToCart.qdSbbVtex',function(){_0x2b4801(window)['trigger'](_0x6563('0xb2'),[new _0x2b4801(),_0x3a1c66]);});_0x2b4801(document)[_0x6563('0xb5')](function(){_0x39e725['fire']();});}catch(_0x20e323){_0x6563('0x2')!==typeof console&&_0x6563('0xa')===typeof console[_0x6563('0x20')]&&console[_0x6563('0x20')](_0x6563('0x66'),_0x20e323);}}(this));function qd_number_format(_0x2b4ec3,_0x4a499a,_0x61368a,_0x392dca){_0x2b4ec3=(_0x2b4ec3+'')[_0x6563('0x1')](/[^0-9+\-Ee.]/g,'');_0x2b4ec3=isFinite(+_0x2b4ec3)?+_0x2b4ec3:0x0;_0x4a499a=isFinite(+_0x4a499a)?Math[_0x6563('0xb6')](_0x4a499a):0x0;_0x392dca=_0x6563('0x2')===typeof _0x392dca?',':_0x392dca;_0x61368a=_0x6563('0x2')===typeof _0x61368a?'.':_0x61368a;var _0x47909d='',_0x47909d=function(_0xbdfcc7,_0x53a6cb){var _0xb1e285=Math[_0x6563('0x3')](0xa,_0x53a6cb);return''+(Math[_0x6563('0x4')](_0xbdfcc7*_0xb1e285)/_0xb1e285)[_0x6563('0x5')](_0x53a6cb);},_0x47909d=(_0x4a499a?_0x47909d(_0x2b4ec3,_0x4a499a):''+Math['round'](_0x2b4ec3))[_0x6563('0x6')]('.');0x3<_0x47909d[0x0][_0x6563('0x7')]&&(_0x47909d[0x0]=_0x47909d[0x0][_0x6563('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x392dca));(_0x47909d[0x1]||'')[_0x6563('0x7')]<_0x4a499a&&(_0x47909d[0x1]=_0x47909d[0x1]||'',_0x47909d[0x1]+=Array(_0x4a499a-_0x47909d[0x1][_0x6563('0x7')]+0x1)[_0x6563('0x69')]('0'));return _0x47909d[_0x6563('0x69')](_0x61368a);}(function(){try{window[_0x6563('0x3a')]=window['_QuatroDigital_CartData']||{},window[_0x6563('0x3a')]['callback']=window[_0x6563('0x3a')][_0x6563('0x46')]||$[_0x6563('0x6a')]();}catch(_0x440639){_0x6563('0x2')!==typeof console&&'function'===typeof console['error']&&console['error'](_0x6563('0x66'),_0x440639['message']);}}());(function(_0x25cd9e){try{var _0x49b2cd=jQuery,_0x26e00c=function(_0xad9e42,_0x1e75f7){if(_0x6563('0x14')===typeof console&&_0x6563('0x2')!==typeof console[_0x6563('0x20')]&&'undefined'!==typeof console['info']&&_0x6563('0x2')!==typeof console['warn']){var _0x99219e;_0x6563('0x14')===typeof _0xad9e42?(_0xad9e42['unshift'](_0x6563('0xb7')),_0x99219e=_0xad9e42):_0x99219e=[_0x6563('0xb7')+_0xad9e42];if('undefined'===typeof _0x1e75f7||_0x6563('0x2b')!==_0x1e75f7[_0x6563('0xe')]()&&_0x6563('0x6d')!==_0x1e75f7[_0x6563('0xe')]())if(_0x6563('0x2')!==typeof _0x1e75f7&&'info'===_0x1e75f7[_0x6563('0xe')]())try{console[_0x6563('0x2e')][_0x6563('0x6e')](console,_0x99219e);}catch(_0x1d3a70){try{console[_0x6563('0x2e')](_0x99219e[_0x6563('0x69')]('\x0a'));}catch(_0x117124){}}else try{console[_0x6563('0x20')][_0x6563('0x6e')](console,_0x99219e);}catch(_0x35e2e1){try{console[_0x6563('0x20')](_0x99219e[_0x6563('0x69')]('\x0a'));}catch(_0x3b6ea6){}}else try{console[_0x6563('0x2c')][_0x6563('0x6e')](console,_0x99219e);}catch(_0x41a51c){try{console[_0x6563('0x2c')](_0x99219e[_0x6563('0x69')]('\x0a'));}catch(_0x3f234f){}}}};window['_QuatroDigital_DropDown']=window[_0x6563('0x5a')]||{};window[_0x6563('0x5a')][_0x6563('0x93')]=!0x0;_0x49b2cd[_0x6563('0xb8')]=function(){};_0x49b2cd['fn'][_0x6563('0xb8')]=function(){return{'fn':new _0x49b2cd()};};var _0x37cdc3=function(_0xa39576){var _0x45f43d={'t':_0x6563('0xb9')};return function(_0x565bc6){var _0xdcdeb8=function(_0x5c44b6){return _0x5c44b6;};var _0x1ecc7a=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x565bc6=_0x565bc6['d'+_0x1ecc7a[0x10]+'c'+_0x1ecc7a[0x11]+'m'+_0xdcdeb8(_0x1ecc7a[0x1])+'n'+_0x1ecc7a[0xd]]['l'+_0x1ecc7a[0x12]+'c'+_0x1ecc7a[0x0]+'ti'+_0xdcdeb8('o')+'n'];var _0x2726cf=function(_0x173e06){return escape(encodeURIComponent(_0x173e06['replace'](/\./g,'¨')[_0x6563('0x1')](/[a-zA-Z]/g,function(_0x13baf9){return String['fromCharCode'](('Z'>=_0x13baf9?0x5a:0x7a)>=(_0x13baf9=_0x13baf9[_0x6563('0xba')](0x0)+0xd)?_0x13baf9:_0x13baf9-0x1a);})));};var _0x25cd9e=_0x2726cf(_0x565bc6[[_0x1ecc7a[0x9],_0xdcdeb8('o'),_0x1ecc7a[0xc],_0x1ecc7a[_0xdcdeb8(0xd)]][_0x6563('0x69')]('')]);_0x2726cf=_0x2726cf((window[['js',_0xdcdeb8('no'),'m',_0x1ecc7a[0x1],_0x1ecc7a[0x4]['toUpperCase'](),_0x6563('0xbb')]['join']('')]||_0x6563('0xbc'))+['.v',_0x1ecc7a[0xd],'e',_0xdcdeb8('x'),'co',_0xdcdeb8('mm'),_0x6563('0xbd'),_0x1ecc7a[0x1],'.c',_0xdcdeb8('o'),'m.',_0x1ecc7a[0x13],'r']['join'](''));for(var _0xf16e8 in _0x45f43d){if(_0x2726cf===_0xf16e8+_0x45f43d[_0xf16e8]||_0x25cd9e===_0xf16e8+_0x45f43d[_0xf16e8]){var _0x57121a='tr'+_0x1ecc7a[0x11]+'e';break;}_0x57121a='f'+_0x1ecc7a[0x0]+'ls'+_0xdcdeb8(_0x1ecc7a[0x1])+'';}_0xdcdeb8=!0x1;-0x1<_0x565bc6[[_0x1ecc7a[0xc],'e',_0x1ecc7a[0x0],'rc',_0x1ecc7a[0x9]]['join']('')][_0x6563('0x98')](_0x6563('0xbe'))&&(_0xdcdeb8=!0x0);return[_0x57121a,_0xdcdeb8];}(_0xa39576);}(window);if(!eval(_0x37cdc3[0x0]))return _0x37cdc3[0x1]?_0x26e00c(_0x6563('0xbf')):!0x1;_0x49b2cd[_0x6563('0xb8')]=function(_0x7a1eca,_0x32f037){var _0x32ee06=_0x49b2cd(_0x7a1eca);if(!_0x32ee06[_0x6563('0x7')])return _0x32ee06;var _0x1668e2=_0x49b2cd[_0x6563('0x12')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x6563('0xc0'),'linkCheckout':_0x6563('0xc1'),'cartTotal':_0x6563('0xc2'),'emptyCart':_0x6563('0xc3'),'continueShopping':'Continuar\x20Comprando','shippingForm':_0x6563('0xc4')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x3cecc6){return _0x3cecc6[_0x6563('0xc5')]||_0x3cecc6['name'];},'callback':function(){},'callbackProductsList':function(){}},_0x32f037);_0x49b2cd('');var _0xbd1571=this;if(_0x1668e2['smartCheckout']){var _0x2a4bfd=!0x1;_0x6563('0x2')===typeof window[_0x6563('0x5b')]&&(_0x26e00c('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN'),_0x49b2cd[_0x6563('0xa9')]({'url':_0x6563('0xc6'),'async':!0x1,'dataType':'script','error':function(){_0x26e00c(_0x6563('0xc7'));_0x2a4bfd=!0x0;}}));if(_0x2a4bfd)return _0x26e00c(_0x6563('0xc8'));}if(_0x6563('0x14')===typeof window[_0x6563('0x5b')]&&_0x6563('0x2')!==typeof window['vtexjs'][_0x6563('0x25')])var _0x188276=window['vtexjs'][_0x6563('0x25')];else if('object'===typeof vtex&&'object'===typeof vtex[_0x6563('0x25')]&&_0x6563('0x2')!==typeof vtex[_0x6563('0x25')][_0x6563('0x5c')])_0x188276=new vtex[(_0x6563('0x25'))][(_0x6563('0x5c'))]();else return _0x26e00c(_0x6563('0x5d'));_0xbd1571[_0x6563('0xc9')]=_0x6563('0xca');var _0x2dd813=function(_0x5daf5b){_0x49b2cd(this)[_0x6563('0x82')](_0x5daf5b);_0x5daf5b[_0x6563('0x54')](_0x6563('0xcb'))[_0x6563('0x31')](_0x49b2cd(_0x6563('0xcc')))['on'](_0x6563('0xcd'),function(){_0x32ee06['removeClass'](_0x6563('0xce'));_0x49b2cd(document[_0x6563('0x71')])[_0x6563('0x4e')](_0x6563('0x8b'));});_0x49b2cd(document)[_0x6563('0xcf')](_0x6563('0xd0'))['on'](_0x6563('0xd0'),function(_0xe5ebd5){0x1b==_0xe5ebd5[_0x6563('0xd1')]&&(_0x32ee06[_0x6563('0x4e')]('qd-bb-lightBoxProdAdd'),_0x49b2cd(document['body'])[_0x6563('0x4e')]('qd-bb-lightBoxBodyProdAdd'));});var _0x1aed7a=_0x5daf5b[_0x6563('0x54')](_0x6563('0xd2'));_0x5daf5b['find']('.qd-ddc-scrollUp')['on'](_0x6563('0xd3'),function(){_0xbd1571['scrollCart']('-',void 0x0,void 0x0,_0x1aed7a);return!0x1;});_0x5daf5b['find'](_0x6563('0xd4'))['on']('click.qd_ddc_scrollDown',function(){_0xbd1571[_0x6563('0xd5')](void 0x0,void 0x0,void 0x0,_0x1aed7a);return!0x1;});_0x5daf5b[_0x6563('0x54')](_0x6563('0xd6'))['val']('')['on']('keyup.qd_ddc_cep',function(){_0xbd1571[_0x6563('0xd7')](_0x49b2cd(this));});if(_0x1668e2['updateOnlyHover']){var _0x32f037=0x0;_0x49b2cd(this)['on'](_0x6563('0xd8'),function(){var _0x5daf5b=function(){window[_0x6563('0x5a')][_0x6563('0x93')]&&(_0xbd1571[_0x6563('0x92')](),window[_0x6563('0x5a')][_0x6563('0x93')]=!0x1,_0x49b2cd['fn'][_0x6563('0x2a')](!0x0),_0xbd1571[_0x6563('0xd9')]());};_0x32f037=setInterval(function(){_0x5daf5b();},0x258);_0x5daf5b();});_0x49b2cd(this)['on'](_0x6563('0xda'),function(){clearInterval(_0x32f037);});}};var _0x9f7677=function(_0x1bf772){_0x1bf772=_0x49b2cd(_0x1bf772);_0x1668e2[_0x6563('0xdb')][_0x6563('0x53')]=_0x1668e2[_0x6563('0xdb')][_0x6563('0x53')][_0x6563('0x1')](_0x6563('0xdc'),_0x6563('0xdd'));_0x1668e2[_0x6563('0xdb')][_0x6563('0x53')]=_0x1668e2[_0x6563('0xdb')][_0x6563('0x53')][_0x6563('0x1')]('#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>');_0x1668e2[_0x6563('0xdb')][_0x6563('0x53')]=_0x1668e2['texts'][_0x6563('0x53')][_0x6563('0x1')]('#shipping',_0x6563('0xde'));_0x1668e2[_0x6563('0xdb')][_0x6563('0x53')]=_0x1668e2[_0x6563('0xdb')][_0x6563('0x53')][_0x6563('0x1')]('#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0x1bf772[_0x6563('0x54')](_0x6563('0xdf'))[_0x6563('0x50')](_0x1668e2['texts'][_0x6563('0xe0')]);_0x1bf772[_0x6563('0x54')](_0x6563('0xe1'))[_0x6563('0x50')](_0x1668e2[_0x6563('0xdb')][_0x6563('0xe2')]);_0x1bf772[_0x6563('0x54')]('.qd-ddc-checkout')[_0x6563('0x50')](_0x1668e2[_0x6563('0xdb')][_0x6563('0xe3')]);_0x1bf772['find'](_0x6563('0xe4'))[_0x6563('0x50')](_0x1668e2['texts'][_0x6563('0x53')]);_0x1bf772['find'](_0x6563('0xe5'))[_0x6563('0x50')](_0x1668e2[_0x6563('0xdb')][_0x6563('0xe6')]);_0x1bf772['find'](_0x6563('0xe7'))[_0x6563('0x50')](_0x1668e2[_0x6563('0xdb')][_0x6563('0x57')]);return _0x1bf772;}(this[_0x6563('0xc9')]);var _0x341016=0x0;_0x32ee06[_0x6563('0x38')](function(){0x0<_0x341016?_0x2dd813['call'](this,_0x9f7677[_0x6563('0xe8')]()):_0x2dd813[_0x6563('0x27')](this,_0x9f7677);_0x341016++;});window[_0x6563('0x3a')][_0x6563('0x46')][_0x6563('0x31')](function(){_0x49b2cd(_0x6563('0xe9'))['html'](window[_0x6563('0x3a')][_0x6563('0x3e')]||'--');_0x49b2cd('.qd-ddc-infoTotalItems')['html'](window[_0x6563('0x3a')][_0x6563('0x42')]||'0');_0x49b2cd(_0x6563('0xea'))['html'](window[_0x6563('0x3a')][_0x6563('0x40')]||'--');_0x49b2cd(_0x6563('0xeb'))[_0x6563('0x50')](window['_QuatroDigital_CartData']['allTotal']||'--');});var _0x19ce6b=function(_0x207bc3,_0x572f9f){if(_0x6563('0x2')===typeof _0x207bc3[_0x6563('0x44')])return _0x26e00c(_0x6563('0xec'));_0xbd1571[_0x6563('0xed')][_0x6563('0x27')](this,_0x572f9f);};_0xbd1571[_0x6563('0x92')]=function(_0x10a123,_0x9d4640){'undefined'!=typeof _0x9d4640?window[_0x6563('0x5a')][_0x6563('0xee')]=_0x9d4640:window[_0x6563('0x5a')][_0x6563('0xee')]&&(_0x9d4640=window[_0x6563('0x5a')]['dataOptionsCache']);setTimeout(function(){window[_0x6563('0x5a')][_0x6563('0xee')]=void 0x0;},_0x1668e2[_0x6563('0x8f')]);_0x49b2cd(_0x6563('0xef'))[_0x6563('0x4e')](_0x6563('0xf0'));if(_0x1668e2[_0x6563('0x59')]){var _0x32f037=function(_0x10e27b){window[_0x6563('0x5a')][_0x6563('0x26')]=_0x10e27b;_0x19ce6b(_0x10e27b,_0x9d4640);_0x6563('0x2')!==typeof window[_0x6563('0xf1')]&&_0x6563('0xa')===typeof window[_0x6563('0xf1')][_0x6563('0xf2')]&&window[_0x6563('0xf1')][_0x6563('0xf2')][_0x6563('0x27')](this);_0x49b2cd(_0x6563('0xef'))['addClass']('qd-ddc-prodLoaded');};_0x6563('0x2')!==typeof window[_0x6563('0x5a')]['getOrderForm']?(_0x32f037(window[_0x6563('0x5a')][_0x6563('0x26')]),'function'===typeof _0x10a123&&_0x10a123(window['_QuatroDigital_DropDown']['getOrderForm'])):_0x49b2cd[_0x6563('0x5e')]([_0x6563('0x44'),'totalizers',_0x6563('0xf3')],{'done':function(_0x4c5f65){_0x32f037[_0x6563('0x27')](this,_0x4c5f65);_0x6563('0xa')===typeof _0x10a123&&_0x10a123(_0x4c5f65);},'fail':function(_0x4f4703){_0x26e00c([_0x6563('0xf4'),_0x4f4703]);}});}else alert(_0x6563('0xf5'));};_0xbd1571[_0x6563('0xd9')]=function(){var _0x36b79d=_0x49b2cd(_0x6563('0xef'));_0x36b79d['find'](_0x6563('0xf6'))['length']?_0x36b79d[_0x6563('0x4e')](_0x6563('0xf7')):_0x36b79d[_0x6563('0x4c')]('qd-ddc-noItems');};_0xbd1571[_0x6563('0xed')]=function(_0x4a1419){var _0x32f037=_0x49b2cd(_0x6563('0xf8'));_0x32f037[_0x6563('0xf9')]();_0x32f037[_0x6563('0x38')](function(){var _0x32f037=_0x49b2cd(this),_0x7a1eca,_0x2edfcc,_0x106e22=_0x49b2cd(''),_0x26bc92;for(_0x26bc92 in window[_0x6563('0x5a')][_0x6563('0x26')]['items'])if('object'===typeof window[_0x6563('0x5a')][_0x6563('0x26')]['items'][_0x26bc92]){var _0x4c5265=window[_0x6563('0x5a')][_0x6563('0x26')]['items'][_0x26bc92];var _0x38ae7f=_0x4c5265[_0x6563('0xfa')][_0x6563('0x1')](/^\/|\/$/g,'')[_0x6563('0x6')]('/');var _0x11f32a=_0x49b2cd(_0x6563('0xfb'));_0x11f32a[_0x6563('0x36')]({'data-sku':_0x4c5265['id'],'data-sku-index':_0x26bc92,'data-qd-departament':_0x38ae7f[0x0],'data-qd-category':_0x38ae7f[_0x38ae7f['length']-0x1]});_0x11f32a[_0x6563('0x4c')](_0x6563('0xfc')+_0x4c5265[_0x6563('0xfd')]);_0x11f32a[_0x6563('0x54')](_0x6563('0xfe'))[_0x6563('0x82')](_0x1668e2['skuName'](_0x4c5265));_0x11f32a['find'](_0x6563('0xff'))[_0x6563('0x82')](isNaN(_0x4c5265[_0x6563('0x100')])?_0x4c5265['sellingPrice']:0x0==_0x4c5265[_0x6563('0x100')]?_0x6563('0x101'):(_0x49b2cd('meta[name=currency]')[_0x6563('0x36')](_0x6563('0x37'))||'R$')+'\x20'+qd_number_format(_0x4c5265[_0x6563('0x100')]/0x64,0x2,',','.'));_0x11f32a['find'](_0x6563('0x102'))[_0x6563('0x36')]({'data-sku':_0x4c5265['id'],'data-sku-index':_0x26bc92})[_0x6563('0x103')](_0x4c5265[_0x6563('0x45')]);_0x11f32a[_0x6563('0x54')](_0x6563('0x104'))[_0x6563('0x36')]({'data-sku':_0x4c5265['id'],'data-sku-index':_0x26bc92});_0xbd1571[_0x6563('0x105')](_0x4c5265['id'],_0x11f32a[_0x6563('0x54')](_0x6563('0x106')),_0x4c5265['imageUrl']);_0x11f32a['find'](_0x6563('0x107'))[_0x6563('0x36')]({'data-sku':_0x4c5265['id'],'data-sku-index':_0x26bc92});_0x11f32a['appendTo'](_0x32f037);_0x106e22=_0x106e22['add'](_0x11f32a);}try{var _0x210158=_0x32f037[_0x6563('0x0')](_0x6563('0xef'))[_0x6563('0x54')]('.qd-ddc-shipping\x20input');_0x210158['length']&&''==_0x210158['val']()&&window['_QuatroDigital_DropDown'][_0x6563('0x26')]['shippingData'][_0x6563('0x108')]&&_0x210158[_0x6563('0x103')](window['_QuatroDigital_DropDown'][_0x6563('0x26')]['shippingData']['address']['postalCode']);}catch(_0x387a95){_0x26e00c(_0x6563('0x109')+_0x387a95['message'],'aviso');}_0xbd1571[_0x6563('0x10a')](_0x32f037);_0xbd1571[_0x6563('0xd9')]();_0x4a1419&&_0x4a1419[_0x6563('0x10b')]&&function(){_0x2edfcc=_0x106e22[_0x6563('0x49')]('[data-sku=\x27'+_0x4a1419[_0x6563('0x10b')]+'\x27]');_0x2edfcc['length']&&(_0x7a1eca=0x0,_0x106e22[_0x6563('0x38')](function(){var _0x4a1419=_0x49b2cd(this);if(_0x4a1419['is'](_0x2edfcc))return!0x1;_0x7a1eca+=_0x4a1419[_0x6563('0x10c')]();}),_0xbd1571[_0x6563('0xd5')](void 0x0,void 0x0,_0x7a1eca,_0x32f037[_0x6563('0x31')](_0x32f037['parent']())),_0x106e22['removeClass'](_0x6563('0x10d')),function(_0x46909b){_0x46909b[_0x6563('0x4c')](_0x6563('0x10e'));_0x46909b['addClass']('qd-ddc-lastAddedFixed');setTimeout(function(){_0x46909b['removeClass'](_0x6563('0x10e'));},_0x1668e2[_0x6563('0x8f')]);}(_0x2edfcc));}();});(function(){_QuatroDigital_DropDown[_0x6563('0x26')][_0x6563('0x44')][_0x6563('0x7')]?(_0x49b2cd('body')[_0x6563('0x4e')](_0x6563('0x10f'))[_0x6563('0x4c')]('qd-ddc-cart-rendered\x20qd-ddc-product-add-time'),setTimeout(function(){_0x49b2cd(_0x6563('0x71'))['removeClass'](_0x6563('0x110'));},_0x1668e2[_0x6563('0x8f')])):_0x49b2cd('body')['removeClass'](_0x6563('0x111'))[_0x6563('0x4c')](_0x6563('0x10f'));}());_0x6563('0xa')===typeof _0x1668e2[_0x6563('0x112')]?_0x1668e2['callbackProductsList'][_0x6563('0x27')](this):_0x26e00c('callbackProductsList\x20não\x20é\x20uma\x20função');};_0xbd1571[_0x6563('0x105')]=function(_0x546047,_0x32c097,_0xf809af){function _0x4a5579(){_0x32c097['removeClass'](_0x6563('0x113'))[_0x6563('0x97')](function(){_0x49b2cd(this)[_0x6563('0x4c')](_0x6563('0x113'));})[_0x6563('0x36')](_0x6563('0x114'),_0xf809af);}_0xf809af?_0x4a5579():isNaN(_0x546047)?_0x26e00c(_0x6563('0x115'),_0x6563('0x2b')):alert(_0x6563('0x116'));};_0xbd1571[_0x6563('0x10a')]=function(_0x12681c){var _0x27331f=function(_0x11151e,_0x2a9401){var _0x32f037=_0x49b2cd(_0x11151e);var _0x43d2ad=_0x32f037[_0x6563('0x36')](_0x6563('0x117'));var _0x7a1eca=_0x32f037['attr'](_0x6563('0x118'));if(_0x43d2ad){var _0x5dffb0=parseInt(_0x32f037[_0x6563('0x103')]())||0x1;_0xbd1571['changeQantity']([_0x43d2ad,_0x7a1eca],_0x5dffb0,_0x5dffb0+0x1,function(_0x5b4722){_0x32f037[_0x6563('0x103')](_0x5b4722);_0x6563('0xa')===typeof _0x2a9401&&_0x2a9401();});}};var _0x32f037=function(_0x25955c,_0x488f8d){var _0x32f037=_0x49b2cd(_0x25955c);var _0x1abbd2=_0x32f037[_0x6563('0x36')](_0x6563('0x117'));var _0x7a1eca=_0x32f037[_0x6563('0x36')](_0x6563('0x118'));if(_0x1abbd2){var _0x49d972=parseInt(_0x32f037[_0x6563('0x103')]())||0x2;_0xbd1571['changeQantity']([_0x1abbd2,_0x7a1eca],_0x49d972,_0x49d972-0x1,function(_0x5260ee){_0x32f037[_0x6563('0x103')](_0x5260ee);_0x6563('0xa')===typeof _0x488f8d&&_0x488f8d();});}};var _0x265179=function(_0x53976e,_0xa340){var _0x32f037=_0x49b2cd(_0x53976e);var _0x352c96=_0x32f037['attr'](_0x6563('0x117'));var _0x7a1eca=_0x32f037[_0x6563('0x36')](_0x6563('0x118'));if(_0x352c96){var _0x1e38cb=parseInt(_0x32f037['val']())||0x1;_0xbd1571[_0x6563('0x119')]([_0x352c96,_0x7a1eca],0x1,_0x1e38cb,function(_0x5f073b){_0x32f037[_0x6563('0x103')](_0x5f073b);_0x6563('0xa')===typeof _0xa340&&_0xa340();});}};var _0x7a1eca=_0x12681c[_0x6563('0x54')](_0x6563('0x11a'));_0x7a1eca['addClass'](_0x6563('0x11b'))['each'](function(){var _0x12681c=_0x49b2cd(this);_0x12681c[_0x6563('0x54')]('.qd-ddc-quantityMore')['on'](_0x6563('0x11c'),function(_0x4afd1c){_0x4afd1c[_0x6563('0x7b')]();_0x7a1eca[_0x6563('0x4c')](_0x6563('0x11d'));_0x27331f(_0x12681c['find']('.qd-ddc-quantity'),function(){_0x7a1eca[_0x6563('0x4e')](_0x6563('0x11d'));});});_0x12681c[_0x6563('0x54')](_0x6563('0x11e'))['on'](_0x6563('0x11f'),function(_0x2fda95){_0x2fda95[_0x6563('0x7b')]();_0x7a1eca[_0x6563('0x4c')](_0x6563('0x11d'));_0x32f037(_0x12681c['find'](_0x6563('0x102')),function(){_0x7a1eca[_0x6563('0x4e')](_0x6563('0x11d'));});});_0x12681c['find']('.qd-ddc-quantity')['on'](_0x6563('0x120'),function(){_0x7a1eca['addClass'](_0x6563('0x11d'));_0x265179(this,function(){_0x7a1eca['removeClass']('qd-loading');});});_0x12681c['find'](_0x6563('0x102'))['on'](_0x6563('0x121'),function(_0x32f9f5){0xd==_0x32f9f5[_0x6563('0xd1')]&&(_0x7a1eca[_0x6563('0x4c')](_0x6563('0x11d')),_0x265179(this,function(){_0x7a1eca[_0x6563('0x4e')](_0x6563('0x11d'));}));});});_0x12681c[_0x6563('0x54')](_0x6563('0xf6'))[_0x6563('0x38')](function(){var _0x12681c=_0x49b2cd(this);_0x12681c[_0x6563('0x54')](_0x6563('0x104'))['on'](_0x6563('0x122'),function(){_0x12681c['addClass'](_0x6563('0x11d'));_0xbd1571[_0x6563('0x123')](_0x49b2cd(this),function(_0x10ce72){_0x10ce72?_0x12681c[_0x6563('0x124')](!0x0)[_0x6563('0x125')](function(){_0x12681c[_0x6563('0x126')]();_0xbd1571['cartIsEmpty']();}):_0x12681c[_0x6563('0x4e')]('qd-loading');});return!0x1;});});};_0xbd1571['shippingCalculate']=function(_0x127261){var _0x3a6491=_0x127261[_0x6563('0x103')](),_0x3a6491=_0x3a6491['replace'](/[^0-9\-]/g,''),_0x3a6491=_0x3a6491[_0x6563('0x1')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x6563('0x127')),_0x3a6491=_0x3a6491[_0x6563('0x1')](/(.{9}).*/g,'$1');_0x127261[_0x6563('0x103')](_0x3a6491);0x9<=_0x3a6491[_0x6563('0x7')]&&(_0x127261['data'](_0x6563('0x128'))!=_0x3a6491&&_0x188276[_0x6563('0x129')]({'postalCode':_0x3a6491,'country':_0x6563('0x12a')})['done'](function(_0x4970ff){window[_0x6563('0x5a')][_0x6563('0x26')]=_0x4970ff;_0xbd1571['getCartInfoByUrl']();})[_0x6563('0x1c')](function(_0x38d82d){_0x26e00c([_0x6563('0x12b'),_0x38d82d]);updateCartData();}),_0x127261[_0x6563('0x15')](_0x6563('0x128'),_0x3a6491));};_0xbd1571['changeQantity']=function(_0x109c74,_0x5f1f85,_0x627038,_0x2e4070){function _0x2cd520(_0xded553){_0xded553=_0x6563('0x12c')!==typeof _0xded553?!0x1:_0xded553;_0xbd1571[_0x6563('0x92')]();window[_0x6563('0x5a')][_0x6563('0x93')]=!0x1;_0xbd1571[_0x6563('0xd9')]();_0x6563('0x2')!==typeof window[_0x6563('0xf1')]&&'function'===typeof window[_0x6563('0xf1')]['exec']&&window[_0x6563('0xf1')][_0x6563('0xf2')][_0x6563('0x27')](this);_0x6563('0xa')===typeof adminCart&&adminCart();_0x49b2cd['fn'][_0x6563('0x2a')](!0x0,void 0x0,_0xded553);_0x6563('0xa')===typeof _0x2e4070&&_0x2e4070(_0x5f1f85);}_0x627038=_0x627038||0x1;if(0x1>_0x627038)return _0x5f1f85;if(_0x1668e2[_0x6563('0x59')]){if(_0x6563('0x2')===typeof window[_0x6563('0x5a')][_0x6563('0x26')][_0x6563('0x44')][_0x109c74[0x1]])return _0x26e00c(_0x6563('0x12d')+_0x109c74[0x1]+']'),_0x5f1f85;window['_QuatroDigital_DropDown']['getOrderForm'][_0x6563('0x44')][_0x109c74[0x1]]['quantity']=_0x627038;window[_0x6563('0x5a')][_0x6563('0x26')][_0x6563('0x44')][_0x109c74[0x1]]['index']=_0x109c74[0x1];_0x188276[_0x6563('0x12e')]([window[_0x6563('0x5a')][_0x6563('0x26')][_0x6563('0x44')][_0x109c74[0x1]]],['items',_0x6563('0x3b'),_0x6563('0xf3')])[_0x6563('0x1b')](function(_0x153e78){window[_0x6563('0x5a')]['getOrderForm']=_0x153e78;_0x2cd520(!0x0);})[_0x6563('0x1c')](function(_0x3e281d){_0x26e00c([_0x6563('0x12f'),_0x3e281d]);_0x2cd520();});}else _0x26e00c(_0x6563('0x130'));};_0xbd1571['removeProduct']=function(_0x35b6f0,_0x3b1818){function _0x1c2e23(_0xdf9537){_0xdf9537=_0x6563('0x12c')!==typeof _0xdf9537?!0x1:_0xdf9537;_0x6563('0x2')!==typeof window[_0x6563('0xf1')]&&_0x6563('0xa')===typeof window[_0x6563('0xf1')][_0x6563('0xf2')]&&window['_QuatroDigital_AmountProduct'][_0x6563('0xf2')][_0x6563('0x27')](this);_0x6563('0xa')===typeof adminCart&&adminCart();_0x49b2cd['fn'][_0x6563('0x2a')](!0x0,void 0x0,_0xdf9537);_0x6563('0xa')===typeof _0x3b1818&&_0x3b1818(_0x7a1eca);}var _0x7a1eca=!0x1,_0x10737b=_0x49b2cd(_0x35b6f0)['attr'](_0x6563('0x118'));if(_0x1668e2[_0x6563('0x59')]){if(_0x6563('0x2')===typeof window[_0x6563('0x5a')][_0x6563('0x26')][_0x6563('0x44')][_0x10737b])return _0x26e00c(_0x6563('0x12d')+_0x10737b+']'),_0x7a1eca;window[_0x6563('0x5a')]['getOrderForm'][_0x6563('0x44')][_0x10737b][_0x6563('0x131')]=_0x10737b;_0x188276[_0x6563('0x132')]([window[_0x6563('0x5a')][_0x6563('0x26')][_0x6563('0x44')][_0x10737b]],['items',_0x6563('0x3b'),'shippingData'])[_0x6563('0x1b')](function(_0x486caf){_0x7a1eca=!0x0;window[_0x6563('0x5a')][_0x6563('0x26')]=_0x486caf;_0x19ce6b(_0x486caf);_0x1c2e23(!0x0);})[_0x6563('0x1c')](function(_0x3910ed){_0x26e00c([_0x6563('0x133'),_0x3910ed]);_0x1c2e23();});}else alert(_0x6563('0x134'));};_0xbd1571['scrollCart']=function(_0x50e1d6,_0x83eace,_0x2eb435,_0x22fcbe){_0x22fcbe=_0x22fcbe||_0x49b2cd('.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2');_0x50e1d6=_0x50e1d6||'+';_0x83eace=_0x83eace||0.9*_0x22fcbe[_0x6563('0x135')]();_0x22fcbe[_0x6563('0x124')](!0x0,!0x0)[_0x6563('0x136')]({'scrollTop':isNaN(_0x2eb435)?_0x50e1d6+'='+_0x83eace+'px':_0x2eb435});};_0x1668e2[_0x6563('0x137')]||(_0xbd1571[_0x6563('0x92')](),_0x49b2cd['fn']['simpleCart'](!0x0));_0x49b2cd(window)['on'](_0x6563('0x138'),function(){try{window[_0x6563('0x5a')][_0x6563('0x26')]=void 0x0,_0xbd1571[_0x6563('0x92')]();}catch(_0x541c5f){_0x26e00c(_0x6563('0x139')+_0x541c5f['message'],'avisso');}});_0x6563('0xa')===typeof _0x1668e2[_0x6563('0x46')]?_0x1668e2[_0x6563('0x46')][_0x6563('0x27')](this):_0x26e00c(_0x6563('0x13a'));};_0x49b2cd['fn'][_0x6563('0xb8')]=function(_0x303687){var _0x2989e2=_0x49b2cd(this);_0x2989e2['fn']=new _0x49b2cd[(_0x6563('0xb8'))](this,_0x303687);return _0x2989e2;};}catch(_0x28fdab){'undefined'!==typeof console&&_0x6563('0xa')===typeof console[_0x6563('0x20')]&&console[_0x6563('0x20')]('Oooops!\x20',_0x28fdab);}}(this));(function(_0x1da0df){try{var _0x1b6274=jQuery;window[_0x6563('0xf1')]=window[_0x6563('0xf1')]||{};window[_0x6563('0xf1')][_0x6563('0x44')]={};window['_QuatroDigital_AmountProduct'][_0x6563('0x13b')]=!0x1;window[_0x6563('0xf1')]['buyButtonClicked']=!0x1;window[_0x6563('0xf1')][_0x6563('0x13c')]=!0x1;var _0x464c00=function(){if(window['_QuatroDigital_AmountProduct']['allowRecalculate']){var _0x43f2f8=!0x1;var _0x1da0df={};window[_0x6563('0xf1')]['items']={};for(_0xb643fa in window[_0x6563('0x5a')][_0x6563('0x26')][_0x6563('0x44')])if('object'===typeof window['_QuatroDigital_DropDown'][_0x6563('0x26')][_0x6563('0x44')][_0xb643fa]){var _0x55f294=window[_0x6563('0x5a')][_0x6563('0x26')]['items'][_0xb643fa];_0x6563('0x2')!==typeof _0x55f294['productId']&&null!==_0x55f294[_0x6563('0x13d')]&&''!==_0x55f294[_0x6563('0x13d')]&&(window[_0x6563('0xf1')][_0x6563('0x44')][_0x6563('0x13e')+_0x55f294[_0x6563('0x13d')]]=window[_0x6563('0xf1')][_0x6563('0x44')]['prod_'+_0x55f294[_0x6563('0x13d')]]||{},window[_0x6563('0xf1')][_0x6563('0x44')][_0x6563('0x13e')+_0x55f294[_0x6563('0x13d')]][_0x6563('0x13f')]=_0x55f294[_0x6563('0x13d')],_0x1da0df['prod_'+_0x55f294[_0x6563('0x13d')]]||(window[_0x6563('0xf1')]['items'][_0x6563('0x13e')+_0x55f294['productId']]['qtt']=0x0),window['_QuatroDigital_AmountProduct']['items'][_0x6563('0x13e')+_0x55f294['productId']][_0x6563('0x42')]+=_0x55f294[_0x6563('0x45')],_0x43f2f8=!0x0,_0x1da0df[_0x6563('0x13e')+_0x55f294[_0x6563('0x13d')]]=!0x0);}var _0xb643fa=_0x43f2f8;}else _0xb643fa=void 0x0;window[_0x6563('0xf1')][_0x6563('0x13b')]&&(_0x1b6274(_0x6563('0x140'))[_0x6563('0x126')](),_0x1b6274(_0x6563('0x141'))['removeClass'](_0x6563('0x142')));for(var _0x344d21 in window['_QuatroDigital_AmountProduct']['items']){_0x55f294=window['_QuatroDigital_AmountProduct'][_0x6563('0x44')][_0x344d21];if(_0x6563('0x14')!==typeof _0x55f294)return;_0x1da0df=_0x1b6274('input.qd-productId[value='+_0x55f294[_0x6563('0x13f')]+']')['getParent']('li');if(window[_0x6563('0xf1')][_0x6563('0x13b')]||!_0x1da0df[_0x6563('0x54')](_0x6563('0x140'))['length'])_0x43f2f8=_0x1b6274('<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>'),_0x43f2f8[_0x6563('0x54')]('.qd-bap-qtt')[_0x6563('0x50')](_0x55f294[_0x6563('0x42')]),_0x55f294=_0x1da0df['find'](_0x6563('0x143')),_0x55f294[_0x6563('0x7')]?_0x55f294['prepend'](_0x43f2f8)[_0x6563('0x4c')](_0x6563('0x142')):_0x1da0df[_0x6563('0xb1')](_0x43f2f8);}_0xb643fa&&(window[_0x6563('0xf1')][_0x6563('0x13b')]=!0x1);};window[_0x6563('0xf1')][_0x6563('0xf2')]=function(){window['_QuatroDigital_AmountProduct'][_0x6563('0x13b')]=!0x0;_0x464c00[_0x6563('0x27')](this);};_0x1b6274(document)[_0x6563('0xb5')](function(){_0x464c00[_0x6563('0x27')](this);});}catch(_0x46df3a){_0x6563('0x2')!==typeof console&&_0x6563('0xa')===typeof console[_0x6563('0x20')]&&console[_0x6563('0x20')](_0x6563('0x66'),_0x46df3a);}}(this));(function(){try{var _0x1f1b05=jQuery,_0x5bc468,_0x3af581={'selector':_0x6563('0x144'),'dropDown':{},'buyButton':{}};_0x1f1b05['QD_smartCart']=function(_0x33ab42){var _0x3c92bc={};_0x5bc468=_0x1f1b05[_0x6563('0x12')](!0x0,{},_0x3af581,_0x33ab42);_0x33ab42=_0x1f1b05(_0x5bc468['selector'])[_0x6563('0xb8')](_0x5bc468[_0x6563('0x145')]);_0x3c92bc[_0x6563('0x7c')]=_0x6563('0x2')!==typeof _0x5bc468['dropDown'][_0x6563('0x137')]&&!0x1===_0x5bc468['dropDown'][_0x6563('0x137')]?_0x1f1b05(_0x5bc468[_0x6563('0x87')])['QD_buyButton'](_0x33ab42['fn'],_0x5bc468[_0x6563('0x7c')]):_0x1f1b05(_0x5bc468[_0x6563('0x87')])[_0x6563('0xae')](_0x5bc468[_0x6563('0x7c')]);_0x3c92bc[_0x6563('0x145')]=_0x33ab42;return _0x3c92bc;};_0x1f1b05['fn'][_0x6563('0x146')]=function(){'object'===typeof console&&_0x6563('0xa')===typeof console[_0x6563('0x2e')]&&console[_0x6563('0x2e')]('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x1f1b05[_0x6563('0x146')]=_0x1f1b05['fn']['smartCart'];}catch(_0x3c0efd){'undefined'!==typeof console&&_0x6563('0xa')===typeof console['error']&&console['error']('Oooops!\x20',_0x3c0efd);}}());

/* Quatro Digital - Product Thumbs // Carlos Vinicius // Todos os direitos reservados. */
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs();a.trigger("QuatroDigital.pt_callback",[a])}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return a.length?$.extend({},a,new b(a)):a},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0x6dd1=['<div\x20class=\x22qd-playerWrapper\x22></div>','prependTo','#include','<div\x20class=\x22qd-playerContainer\x22></div>','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','ite','join','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','<iframe\x20src=\x22','urlProtocol','height','data','stop','fadeTo','body','addClass','animate','find','a:not(\x27.qd-videoLink\x27)','click.removeVideo','removeAttr','style','removeClass','qdpv-video-on','.qd-videoItem','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27','\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','bind','click.playVideo','.ON','.qd-playerWrapper\x20iframe','call','attr','youtube','controlVideo','a:not(.qd-videoLink)','click','contentWindow','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','start','appendTo','ajaxStop','load','ImageControl','.qd-videoLink','.produto','object','undefined','alerta','toLowerCase','warn','[Video\x20in\x20product]\x20','error','qdVideoInProduct','extend','td.value-field.Videos:first','ul.thumbs','div#image','videoFieldSelector','replace','split','length','indexOf','shift','youtu.be','push','be/','pop'];(function(_0x36eaaa,_0x326732){var _0x461349=function(_0x4e4180){while(--_0x4e4180){_0x36eaaa['push'](_0x36eaaa['shift']());}};_0x461349(++_0x326732);}(_0x6dd1,0x111));var _0x16dd=function(_0x5854f4,_0x4d72df){_0x5854f4=_0x5854f4-0x0;var _0x4197a7=_0x6dd1[_0x5854f4];return _0x4197a7;};(function(_0x9c01ae){$(function(){if($(document['body'])['is'](_0x16dd('0x0'))){var _0x2ac0c9=[];var _0x5b01ea=function(_0x3dbe50,_0x283f1f){_0x16dd('0x1')===typeof console&&(_0x16dd('0x2')!==typeof _0x283f1f&&_0x16dd('0x3')===_0x283f1f[_0x16dd('0x4')]()?console[_0x16dd('0x5')](_0x16dd('0x6')+_0x3dbe50):_0x16dd('0x2')!==typeof _0x283f1f&&'info'===_0x283f1f['toLowerCase']()?console['info']('[Video\x20in\x20product]\x20'+_0x3dbe50):console[_0x16dd('0x7')](_0x16dd('0x6')+_0x3dbe50));};window[_0x16dd('0x8')]=window[_0x16dd('0x8')]||{};var _0x5e17e5=$[_0x16dd('0x9')](!0x0,{'insertThumbsIn':'start','videoFieldSelector':_0x16dd('0xa'),'controlVideo':!0x0,'urlProtocol':'http'},window['qdVideoInProduct']);var _0x11ecb5=$(_0x16dd('0xb'));var _0x539dcc=$(_0x16dd('0xc'));var _0x3a4916=$(_0x5e17e5[_0x16dd('0xd')])['text']()[_0x16dd('0xe')](/\;\s*/,';')[_0x16dd('0xf')](';');for(var _0x148e7d=0x0;_0x148e7d<_0x3a4916[_0x16dd('0x10')];_0x148e7d++)-0x1<_0x3a4916[_0x148e7d][_0x16dd('0x11')]('youtube')?_0x2ac0c9['push'](_0x3a4916[_0x148e7d][_0x16dd('0xf')]('v=')['pop']()[_0x16dd('0xf')](/[&#]/)[_0x16dd('0x12')]()):-0x1<_0x3a4916[_0x148e7d][_0x16dd('0x11')](_0x16dd('0x13'))&&_0x2ac0c9[_0x16dd('0x14')](_0x3a4916[_0x148e7d][_0x16dd('0xf')](_0x16dd('0x15'))[_0x16dd('0x16')]()['split'](/[\?&#]/)[_0x16dd('0x12')]());var _0x3b660d=$(_0x16dd('0x17'));_0x3b660d[_0x16dd('0x18')](_0x16dd('0x19'));_0x3b660d['wrap'](_0x16dd('0x1a'));_0x3a4916=function(_0x2fb27c){var _0x3f36c0={'t':_0x16dd('0x1b')};return function(_0x124966){var _0x2c0bd8=function(_0x3ac589){return _0x3ac589;};var _0x44464a=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x124966=_0x124966['d'+_0x44464a[0x10]+'c'+_0x44464a[0x11]+'m'+_0x2c0bd8(_0x44464a[0x1])+'n'+_0x44464a[0xd]]['l'+_0x44464a[0x12]+'c'+_0x44464a[0x0]+'ti'+_0x2c0bd8('o')+'n'];var _0x43a6ba=function(_0x40355f){return escape(encodeURIComponent(_0x40355f['replace'](/\./g,'¨')[_0x16dd('0xe')](/[a-zA-Z]/g,function(_0x82fb39){return String[_0x16dd('0x1c')](('Z'>=_0x82fb39?0x5a:0x7a)>=(_0x82fb39=_0x82fb39[_0x16dd('0x1d')](0x0)+0xd)?_0x82fb39:_0x82fb39-0x1a);})));};var _0x96ab00=_0x43a6ba(_0x124966[[_0x44464a[0x9],_0x2c0bd8('o'),_0x44464a[0xc],_0x44464a[_0x2c0bd8(0xd)]]['join']('')]);_0x43a6ba=_0x43a6ba((window[['js',_0x2c0bd8('no'),'m',_0x44464a[0x1],_0x44464a[0x4]['toUpperCase'](),_0x16dd('0x1e')][_0x16dd('0x1f')]('')]||'---')+['.v',_0x44464a[0xd],'e',_0x2c0bd8('x'),'co',_0x2c0bd8('mm'),_0x16dd('0x20'),_0x44464a[0x1],'.c',_0x2c0bd8('o'),'m.',_0x44464a[0x13],'r'][_0x16dd('0x1f')](''));for(var _0x11937c in _0x3f36c0){if(_0x43a6ba===_0x11937c+_0x3f36c0[_0x11937c]||_0x96ab00===_0x11937c+_0x3f36c0[_0x11937c]){var _0x5125fa='tr'+_0x44464a[0x11]+'e';break;}_0x5125fa='f'+_0x44464a[0x0]+'ls'+_0x2c0bd8(_0x44464a[0x1])+'';}_0x2c0bd8=!0x1;-0x1<_0x124966[[_0x44464a[0xc],'e',_0x44464a[0x0],'rc',_0x44464a[0x9]][_0x16dd('0x1f')]('')][_0x16dd('0x11')](_0x16dd('0x21'))&&(_0x2c0bd8=!0x0);return[_0x5125fa,_0x2c0bd8];}(_0x2fb27c);}(window);if(!eval(_0x3a4916[0x0]))return _0x3a4916[0x1]?_0x5b01ea('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x356e4e=function(_0x3625ec,_0x409b83){'youtube'===_0x409b83&&_0x3b660d['html'](_0x16dd('0x22')+_0x5e17e5[_0x16dd('0x23')]+'://www.youtube.com/embed/'+_0x3625ec+'?wmode=transparent&rel=0&enablejsapi=1\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>');_0x539dcc['data'](_0x16dd('0x24'),_0x539dcc[_0x16dd('0x25')](_0x16dd('0x24'))||_0x539dcc['height']());_0x539dcc[_0x16dd('0x26')](!0x0,!0x0)[_0x16dd('0x27')](0x1f4,0x0,function(){$(_0x16dd('0x28'))[_0x16dd('0x29')]('qdpv-video-on');});_0x3b660d[_0x16dd('0x26')](!0x0,!0x0)[_0x16dd('0x27')](0x1f4,0x1,function(){_0x539dcc['add'](_0x3b660d)[_0x16dd('0x2a')]({'height':_0x3b660d[_0x16dd('0x2b')]('iframe')[_0x16dd('0x24')]()},0x2bc);});};removePlayer=function(){_0x11ecb5['find'](_0x16dd('0x2c'))['bind'](_0x16dd('0x2d'),function(){_0x3b660d[_0x16dd('0x26')](!0x0,!0x0)[_0x16dd('0x27')](0x1f4,0x0,function(){$(this)['hide']()[_0x16dd('0x2e')](_0x16dd('0x2f'));$('body')[_0x16dd('0x30')](_0x16dd('0x31'));});_0x539dcc[_0x16dd('0x26')](!0x0,!0x0)[_0x16dd('0x27')](0x1f4,0x1,function(){var _0x51d8fa=_0x539dcc[_0x16dd('0x25')](_0x16dd('0x24'));_0x51d8fa&&_0x539dcc['animate']({'height':_0x51d8fa},0x2bc);});});};var _0x2c9bfa=function(){if(!_0x11ecb5['find'](_0x16dd('0x32'))[_0x16dd('0x10')])for(vId in removePlayer['call'](this),_0x2ac0c9)if('string'===typeof _0x2ac0c9[vId]&&''!==_0x2ac0c9[vId]){var _0x3d7863=$(_0x16dd('0x33')+_0x2ac0c9[vId]+_0x16dd('0x34')+_0x2ac0c9[vId]+_0x16dd('0x35')+_0x2ac0c9[vId]+_0x16dd('0x36'));_0x3d7863[_0x16dd('0x2b')]('a')[_0x16dd('0x37')](_0x16dd('0x38'),function(){var _0x12c14e=$(this);_0x11ecb5['find'](_0x16dd('0x39'))[_0x16dd('0x30')]('ON');_0x12c14e[_0x16dd('0x29')]('ON');0x1==_0x5e17e5['controlVideo']?$(_0x16dd('0x3a'))[_0x16dd('0x10')]?(_0x356e4e[_0x16dd('0x3b')](this,'',''),$(_0x16dd('0x3a'))[0x0]['contentWindow']['postMessage']('{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','*')):_0x356e4e['call'](this,_0x12c14e[_0x16dd('0x3c')]('rel'),_0x16dd('0x3d')):_0x356e4e['call'](this,_0x12c14e[_0x16dd('0x3c')]('rel'),_0x16dd('0x3d'));return!0x1;});0x1==_0x5e17e5[_0x16dd('0x3e')]&&_0x11ecb5[_0x16dd('0x2b')](_0x16dd('0x3f'))[_0x16dd('0x40')](function(_0xb34eda){$('.qd-playerWrapper\x20iframe')[_0x16dd('0x10')]&&$(_0x16dd('0x3a'))[0x0][_0x16dd('0x41')][_0x16dd('0x42')](_0x16dd('0x43'),'*');});_0x16dd('0x44')===_0x5e17e5['insertThumbsIn']?_0x3d7863['prependTo'](_0x11ecb5):_0x3d7863[_0x16dd('0x45')](_0x11ecb5);_0x3d7863['trigger']('QuatroDigital.pv_video_added',[_0x2ac0c9[vId],_0x3d7863]);}};$(document)[_0x16dd('0x46')](_0x2c9bfa);$(window)[_0x16dd('0x47')](_0x2c9bfa);(function(){var _0x1c0d79=this;var _0x491bf0=window[_0x16dd('0x48')]||function(){};window['ImageControl']=function(_0x5e14b7,_0x1346ff){$(_0x5e14b7||'')['is'](_0x16dd('0x49'))||(_0x491bf0[_0x16dd('0x3b')](this,_0x5e14b7,_0x1346ff),_0x2c9bfa[_0x16dd('0x3b')](_0x1c0d79));};}());}});}(this));

/* Quatro Digital - Mosaic Banners // Carlos Vinicius // Todos os direitos reservados */
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

