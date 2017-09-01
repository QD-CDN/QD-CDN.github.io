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
			var videoRegex = /(youtu\.be\/|\?v=)([^&]+)/i;

			$('.box-banner a').filter('[href*="youtube.com/"], [href*="youtu.be/"]').click(function(e) {
				e.preventDefault();
				var modal = $('.qd-v1-modal').clone().appendTo(document.body).addClass('hotsite-information-qd-v1-modal');
				var $t = $(this);
				var videoId = ($t.attr('href').match(videoRegex) || ['']).pop();

				modal.find('.modal-header').append('<h2 class="modal-title">' + $t.find('img').attr('alt') + '</h2>');
				$('<iframe src="' + 'https://www.youtube.com/embed/' + videoId + '?wmode=transparent&rel=0" frameborder="0"></iframe>').appendTo(modal.find('.modal-body'));
				modal.modal();
				
				modal.on('hidden.bs.modal', function() {
					modal.remove();
				});
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
var _0x1942=['.produto','function','prototype','trim','replace','abs','undefined','round','toFixed','split','length','join','QD_SmartPrice','Smart\x20Price','object','error','info','warn','unshift','alerta','toLowerCase','aviso','apply','text','search','match','.flag','[class*=\x27desconto\x27]','.productRightColumn','label.skuBestInstallmentNumber','label.skuBestInstallmentValue','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','ite','---','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','isProductPage','productPage','wrapperElement','filterFlagBy','addClass','qd-active','qd-sp-active','.qd_sp_on,\x20.qd_sp_ignored','find','removeClass','siblings','qd_sp_ignored','isDiscountFlag','div[skuCorrente]:first','skuCorrente','skus','available','bestPrice','isSmartCheckout','qd-sp-product-unavailable','getDiscountValue','O\x20valor\x20informado\x20p/\x20o\x20desconto\x20não\x20é\x20um\x20número.','.qd_productPrice','val','appliedDiscount','.qd_productOldPrice','skuPrice','html','changeInstallments','.qd_sp_display_installments','.qd_sp_display_installmentValue','.qd_sp_installments','.qd_saveAmount','append','.qd_saveAmountPercent','prepend','changeNativeSaveAmount','em.economia-de','each','skuSelected.vtex','qd_sp_processedItem','startedByWrapper','flagElement','call','forcePromotion','string','closest','.qd_sp_processedItem','attr','style','display:none\x20!important;','extend','boolean','body'];(function(_0x9faf4b,_0x544772){var _0x110ce1=function(_0x59bc56){while(--_0x59bc56){_0x9faf4b['push'](_0x9faf4b['shift']());}};_0x110ce1(++_0x544772);}(_0x1942,0x16d));var _0x2194=function(_0x544247,_0x1bf7de){_0x544247=_0x544247-0x0;var _0x170c77=_0x1942[_0x544247];return _0x170c77;};_0x2194('0x0')!==typeof String[_0x2194('0x1')]['trim']&&(String[_0x2194('0x1')][_0x2194('0x2')]=function(){return this[_0x2194('0x3')](/^\s+|\s+$/g,'');});function qd_number_format(_0x5b775c,_0x340687,_0x20fb0e,_0x3ab13f){_0x5b775c=(_0x5b775c+'')[_0x2194('0x3')](/[^0-9+\-Ee.]/g,'');_0x5b775c=isFinite(+_0x5b775c)?+_0x5b775c:0x0;_0x340687=isFinite(+_0x340687)?Math[_0x2194('0x4')](_0x340687):0x0;_0x3ab13f=_0x2194('0x5')===typeof _0x3ab13f?',':_0x3ab13f;_0x20fb0e=_0x2194('0x5')===typeof _0x20fb0e?'.':_0x20fb0e;var _0x51c965='',_0x51c965=function(_0xe17d18,_0x36d585){var _0x340687=Math['pow'](0xa,_0x36d585);return''+(Math[_0x2194('0x6')](_0xe17d18*_0x340687)/_0x340687)[_0x2194('0x7')](_0x36d585);},_0x51c965=(_0x340687?_0x51c965(_0x5b775c,_0x340687):''+Math[_0x2194('0x6')](_0x5b775c))[_0x2194('0x8')]('.');0x3<_0x51c965[0x0][_0x2194('0x9')]&&(_0x51c965[0x0]=_0x51c965[0x0][_0x2194('0x3')](/\B(?=(?:\d{3})+(?!\d))/g,_0x3ab13f));(_0x51c965[0x1]||'')[_0x2194('0x9')]<_0x340687&&(_0x51c965[0x1]=_0x51c965[0x1]||'',_0x51c965[0x1]+=Array(_0x340687-_0x51c965[0x1][_0x2194('0x9')]+0x1)[_0x2194('0xa')]('0'));return _0x51c965['join'](_0x20fb0e);};(function(_0x1ce7cb){'use strict';var _0x3b7145=jQuery;if(typeof _0x3b7145['fn'][_0x2194('0xb')]===_0x2194('0x0'))return;var _0x5728bc=_0x2194('0xc');var _0x1f6fb4=function(_0x45e0ef,_0x451d56){if(_0x2194('0xd')===typeof console&&'function'===typeof console[_0x2194('0xe')]&&_0x2194('0x0')===typeof console[_0x2194('0xf')]&&_0x2194('0x0')===typeof console[_0x2194('0x10')]){var _0x9b8c19;_0x2194('0xd')===typeof _0x45e0ef?(_0x45e0ef[_0x2194('0x11')]('['+_0x5728bc+']\x0a'),_0x9b8c19=_0x45e0ef):_0x9b8c19=['['+_0x5728bc+']\x0a'+_0x45e0ef];if(_0x2194('0x5')===typeof _0x451d56||_0x2194('0x12')!==_0x451d56[_0x2194('0x13')]()&&_0x2194('0x14')!==_0x451d56[_0x2194('0x13')]())if(_0x2194('0x5')!==typeof _0x451d56&&_0x2194('0xf')===_0x451d56[_0x2194('0x13')]())try{console[_0x2194('0xf')][_0x2194('0x15')](console,_0x9b8c19);}catch(_0x597636){console[_0x2194('0xf')](_0x9b8c19['join']('\x0a'));}else try{console[_0x2194('0xe')]['apply'](console,_0x9b8c19);}catch(_0x5e957a){console[_0x2194('0xe')](_0x9b8c19['join']('\x0a'));}else try{console[_0x2194('0x10')]['apply'](console,_0x9b8c19);}catch(_0x57b04f){console[_0x2194('0x10')](_0x9b8c19[_0x2194('0xa')]('\x0a'));}}};var _0x186038=/[0-9]+\%/i;var _0x25b079=/[0-9\.]+(?=\%)/i;var _0x4aa0e9={'isDiscountFlag':function(_0x5d760b){if(_0x5d760b[_0x2194('0x16')]()[_0x2194('0x17')](_0x186038)>-0x1)return!![];return![];},'getDiscountValue':function(_0x1dc42e){return _0x1dc42e[_0x2194('0x16')]()[_0x2194('0x18')](_0x25b079);},'startedByWrapper':![],'flagElement':_0x2194('0x19'),'wrapperElement':'li','filterFlagBy':_0x2194('0x1a'),'forcePromotion':null,'appliedDiscount':null,'oneFlagByItem':!![],'isSmartCheckout':!![],'changeInstallments':![],'productPage':{'changeNativeSaveAmount':!![],'changeNativePrice':!![],'changeInstallments':![],'isProductPage':'auto','wrapperElement':_0x2194('0x1b'),'skuBestPrice':'strong.skuBestPrice','installments':_0x2194('0x1c'),'installmentValue':_0x2194('0x1d'),'skuPrice':'strong.skuPrice'}};_0x3b7145['fn'][_0x2194('0xb')]=function(){};var _0x40941b=function(_0x511e04){var _0x2e0aa6={'t':_0x2194('0x1e')};return function(_0x5c8821){var _0x345092,_0x2508ca,_0x147564,_0x431f5a;_0x2508ca=function(_0x361bec){return _0x361bec;};_0x147564=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5c8821=_0x5c8821['d'+_0x147564[0x10]+'c'+_0x147564[0x11]+'m'+_0x2508ca(_0x147564[0x1])+'n'+_0x147564[0xd]]['l'+_0x147564[0x12]+'c'+_0x147564[0x0]+'ti'+_0x2508ca('o')+'n'];_0x345092=function(_0x41667d){return escape(encodeURIComponent(_0x41667d[_0x2194('0x3')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x134aca){return String[_0x2194('0x1f')](('Z'>=_0x134aca?0x5a:0x7a)>=(_0x134aca=_0x134aca['charCodeAt'](0x0)+0xd)?_0x134aca:_0x134aca-0x1a);})));};var _0x23d119=_0x345092(_0x5c8821[[_0x147564[0x9],_0x2508ca('o'),_0x147564[0xc],_0x147564[_0x2508ca(0xd)]][_0x2194('0xa')]('')]);_0x345092=_0x345092((window[['js',_0x2508ca('no'),'m',_0x147564[0x1],_0x147564[0x4]['toUpperCase'](),_0x2194('0x20')][_0x2194('0xa')]('')]||_0x2194('0x21'))+['.v',_0x147564[0xd],'e',_0x2508ca('x'),'co',_0x2508ca('mm'),'erc',_0x147564[0x1],'.c',_0x2508ca('o'),'m.',_0x147564[0x13],'r'][_0x2194('0xa')](''));for(var _0x1a1d23 in _0x2e0aa6){if(_0x345092===_0x1a1d23+_0x2e0aa6[_0x1a1d23]||_0x23d119===_0x1a1d23+_0x2e0aa6[_0x1a1d23]){_0x431f5a='tr'+_0x147564[0x11]+'e';break;}_0x431f5a='f'+_0x147564[0x0]+'ls'+_0x2508ca(_0x147564[0x1])+'';}_0x2508ca=!0x1;-0x1<_0x5c8821[[_0x147564[0xc],'e',_0x147564[0x0],'rc',_0x147564[0x9]][_0x2194('0xa')]('')]['indexOf'](_0x2194('0x22'))&&(_0x2508ca=!0x0);return[_0x431f5a,_0x2508ca];}(_0x511e04);}(window);if(!eval(_0x40941b[0x0]))return _0x40941b[0x1]?_0x1f6fb4(_0x2194('0x23')):!0x1;var _0x326f1c=function(_0x5a9f24,_0x45e8f3){'use strict';var _0x57b222=function(_0x39165e){'use strict';var _0x3c7135,_0x3c03ae,_0x116eb6,_0x82a07a,_0x4ff9f3,_0x1a50f6,_0x24317f,_0x18fb0e,_0x34fade,_0x5afc7f,_0x447d64,_0x395e71,_0x2a1384,_0x13056,_0x2038cc,_0x1e80bc,_0x3cb32f,_0xf49438,_0x8cfa52;var _0x37477c=_0x3b7145(this);_0x39165e=typeof _0x39165e===_0x2194('0x5')?![]:_0x39165e;if(_0x45e8f3['productPage'][_0x2194('0x24')])var _0x1994b1=_0x37477c['closest'](_0x45e8f3[_0x2194('0x25')][_0x2194('0x26')]);else var _0x1994b1=_0x37477c['closest'](_0x45e8f3['wrapperElement']);if(!_0x39165e&&!_0x37477c['is'](_0x45e8f3[_0x2194('0x27')])){if(_0x45e8f3['productPage']['isProductPage']&&_0x1994b1['is'](_0x45e8f3[_0x2194('0x25')][_0x2194('0x26')])){_0x1994b1['find'](_0x45e8f3[_0x2194('0x25')]['skuBestPrice'])[_0x2194('0x28')](_0x2194('0x29'));_0x1994b1[_0x2194('0x28')](_0x2194('0x2a'));}return;}var _0x9d8950=_0x45e8f3[_0x2194('0x25')][_0x2194('0x24')];if(_0x37477c['is'](_0x2194('0x2b'))&&!_0x9d8950)return;if(_0x9d8950){_0x18fb0e=_0x1994b1[_0x2194('0x2c')](_0x45e8f3[_0x2194('0x25')]['skuBestPrice']);if(_0x18fb0e[_0x2194('0x2c')]('.qd_active')[_0x2194('0x9')])return;_0x18fb0e[_0x2194('0x2d')](_0x2194('0x29'));_0x1994b1['removeClass'](_0x2194('0x2a'));}if(_0x45e8f3['oneFlagByItem']&&_0x37477c[_0x2194('0x2e')]('.qd_sp_on')[_0x2194('0x9')]){_0x37477c[_0x2194('0x28')](_0x2194('0x2f'));return;}_0x37477c[_0x2194('0x28')]('qd_sp_on');if(!_0x45e8f3[_0x2194('0x30')](_0x37477c))return;if(_0x9d8950){_0x116eb6={};var _0x12b720=parseInt(_0x3b7145(_0x2194('0x31'))['attr'](_0x2194('0x32')),0xa);if(_0x12b720){for(var _0x41491b=0x0;_0x41491b<skuJson['skus'][_0x2194('0x9')];_0x41491b++){if(skuJson['skus'][_0x41491b]['sku']==_0x12b720){_0x116eb6=skuJson['skus'][_0x41491b];break;}}}else{var _0x2ee6b5=0x5af3107a3fff;for(var _0x2dc0db in skuJson[_0x2194('0x33')]){if(typeof skuJson[_0x2194('0x33')][_0x2dc0db]===_0x2194('0x0'))continue;if(!skuJson[_0x2194('0x33')][_0x2dc0db][_0x2194('0x34')])continue;if(skuJson[_0x2194('0x33')][_0x2dc0db][_0x2194('0x35')]<_0x2ee6b5){_0x2ee6b5=skuJson[_0x2194('0x33')][_0x2dc0db][_0x2194('0x35')];_0x116eb6=skuJson[_0x2194('0x33')][_0x2dc0db];}}}}_0x1e80bc=!![];_0x3cb32f=0x0;if(_0x45e8f3[_0x2194('0x36')]&&_0xf49438){_0x1e80bc=skuJson[_0x2194('0x34')];if(!_0x1e80bc)return _0x1994b1[_0x2194('0x28')](_0x2194('0x37'));}_0x3c03ae=_0x45e8f3[_0x2194('0x38')](_0x37477c);_0x3c7135=parseFloat(_0x3c03ae,0xa);if(isNaN(_0x3c7135))return _0x1f6fb4([_0x2194('0x39'),_0x37477c],_0x2194('0x12'));var _0x3fa5e3=function(_0x57db51){if(_0x9d8950)_0x82a07a=(_0x57db51[_0x2194('0x35')]||0x0)/0x64;else{_0x2a1384=_0x1994b1['find'](_0x2194('0x3a'));_0x82a07a=parseFloat((_0x2a1384[_0x2194('0x3b')]()||'')[_0x2194('0x3')](/[^0-9\.\,]+/i,'')['replace']('.','')['replace'](',','.'),0xa);}if(isNaN(_0x82a07a))return _0x1f6fb4(['Por\x20alguma\x20razão\x20não\x20consegui\x20obter\x20o\x20preço\x20deste\x20produto\x20:(',_0x37477c,_0x1994b1]);if(_0x45e8f3['appliedDiscount']!==null){_0x13056=0x0;if(!isNaN(_0x45e8f3[_0x2194('0x3c')]))_0x13056=_0x45e8f3[_0x2194('0x3c')];else{_0x2038cc=_0x1994b1[_0x2194('0x2c')](_0x45e8f3[_0x2194('0x3c')]);if(_0x2038cc[_0x2194('0x9')])_0x13056=_0x45e8f3['getDiscountValue'](_0x2038cc);}_0x13056=parseFloat(_0x13056,0xa);if(isNaN(_0x13056))_0x13056=0x0;if(_0x13056!==0x0)_0x82a07a=_0x82a07a*0x64/(0x64-_0x13056);}if(_0x9d8950)_0x4ff9f3=(_0x57db51['listPrice']||0x0)/0x64;else _0x4ff9f3=parseFloat((_0x1994b1[_0x2194('0x2c')](_0x2194('0x3d'))['val']()||'')[_0x2194('0x3')](/[^0-9\.\,]+/i,'')[_0x2194('0x3')]('.','')[_0x2194('0x3')](',','.'),0xa);if(isNaN(_0x4ff9f3))_0x4ff9f3=0.001;_0x1a50f6=_0x82a07a*((0x64-_0x3c7135)/0x64);if(_0x9d8950&&_0x45e8f3[_0x2194('0x25')]['changeNativePrice']){_0x18fb0e[_0x2194('0x16')](_0x18fb0e[_0x2194('0x16')]()['trim']()[_0x2194('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x1a50f6,0x2,',','.')))[_0x2194('0x28')](_0x2194('0x29'));_0x1994b1[_0x2194('0x28')](_0x2194('0x2a'));}else{_0x8cfa52=_0x1994b1[_0x2194('0x2c')]('.qd_displayPrice');_0x8cfa52[_0x2194('0x16')](_0x8cfa52['text']()[_0x2194('0x3')](/[0-9\.]+,[0-9]+/i,'')+qd_number_format(_0x1a50f6,0x2,',','.'));}if(_0x9d8950){_0x24317f=_0x1994b1['find'](_0x45e8f3[_0x2194('0x25')][_0x2194('0x3e')]);if(_0x24317f[_0x2194('0x9')])_0x24317f[_0x2194('0x16')](_0x24317f[_0x2194('0x16')]()[_0x2194('0x2')]()[_0x2194('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x1a50f6,0x2,',','.')));}var _0xcfdc54=_0x1994b1[_0x2194('0x2c')]('.qd-sp-display-discount');_0xcfdc54[_0x2194('0x16')](_0xcfdc54[_0x2194('0x16')]()[_0x2194('0x3')](/[0-9]+\%/i,_0x3c7135+'%'));var _0x2e4ef4=function(_0x49454b,_0x2a1bce,_0x174b62){var _0x2c1de5=_0x1994b1[_0x2194('0x2c')](_0x49454b);if(_0x2c1de5[_0x2194('0x9')])_0x2c1de5['html'](_0x2c1de5['html']()[_0x2194('0x2')]()[_0x2194('0x3')](/[0-9]{1,2}/,_0x174b62?_0x174b62:_0x57db51['installments']||0x0));var _0x4aaf1f=_0x1994b1[_0x2194('0x2c')](_0x2a1bce);if(_0x4aaf1f[_0x2194('0x9')])_0x4aaf1f['html'](_0x4aaf1f[_0x2194('0x3f')]()[_0x2194('0x2')]()[_0x2194('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x1a50f6/(_0x174b62?_0x174b62:_0x57db51['installments']||0x1),0x2,',','.')));};if(_0x9d8950&&_0x45e8f3[_0x2194('0x25')][_0x2194('0x40')])_0x2e4ef4(_0x45e8f3[_0x2194('0x25')]['installments'],_0x45e8f3[_0x2194('0x25')]['installmentValue']);else if(_0x45e8f3['changeInstallments'])_0x2e4ef4(_0x2194('0x41'),_0x2194('0x42'),parseInt(_0x1994b1['find'](_0x2194('0x43'))[_0x2194('0x3b')]()||0x1)||0x1);_0x1994b1[_0x2194('0x2c')](_0x2194('0x44'))[_0x2194('0x45')](qd_number_format(_0x4ff9f3-_0x1a50f6,0x2,',','.'));_0x1994b1[_0x2194('0x2c')](_0x2194('0x46'))[_0x2194('0x47')](qd_number_format((_0x4ff9f3-_0x1a50f6)*0x64/_0x4ff9f3,0x2,',','.'));if(_0x9d8950&&_0x45e8f3['productPage'][_0x2194('0x48')]){_0x3b7145(_0x2194('0x49'))[_0x2194('0x4a')](function(){_0x447d64=_0x3b7145(this);_0x447d64['text'](_0x447d64[_0x2194('0x16')]()[_0x2194('0x2')]()[_0x2194('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x4ff9f3-_0x1a50f6,0x2,',','.')));_0x447d64[_0x2194('0x28')](_0x2194('0x29'));});}};_0x3fa5e3(_0x116eb6);if(_0x9d8950)_0x3b7145(window)['on'](_0x2194('0x4b'),function(_0x3a6c51,_0x224196,_0xf6d994){_0x3fa5e3(_0xf6d994);});_0x1994b1[_0x2194('0x28')](_0x2194('0x4c'));if(!_0x9d8950)_0x2a1384[_0x2194('0x28')]('qd_sp_processedItem');};(_0x45e8f3[_0x2194('0x4d')]?_0x5a9f24['find'](_0x45e8f3[_0x2194('0x4e')]):_0x5a9f24)[_0x2194('0x4a')](function(){_0x57b222[_0x2194('0x4f')](this,![]);});if(typeof _0x45e8f3[_0x2194('0x50')]==_0x2194('0x51')){var _0x14fcdb=_0x45e8f3[_0x2194('0x4d')]?_0x5a9f24:_0x5a9f24[_0x2194('0x52')](_0x45e8f3[_0x2194('0x26')]);if(_0x45e8f3[_0x2194('0x25')]['isProductPage'])_0x14fcdb=_0x14fcdb[_0x2194('0x52')](_0x45e8f3[_0x2194('0x25')][_0x2194('0x26')])['not'](_0x2194('0x53'));else _0x14fcdb=_0x14fcdb[_0x2194('0x2c')]('.qd_productPrice:not(.qd_sp_processedItem)');_0x14fcdb['each'](function(){var _0x286749=_0x3b7145(_0x45e8f3['forcePromotion']);_0x286749[_0x2194('0x54')](_0x2194('0x55'),_0x2194('0x56'));if(_0x45e8f3[_0x2194('0x25')][_0x2194('0x24')])_0x3b7145(this)[_0x2194('0x45')](_0x286749);else _0x3b7145(this)['after'](_0x286749);_0x57b222[_0x2194('0x4f')](_0x286749,!![]);});}};_0x3b7145['fn']['QD_SmartPrice']=function(_0x4018b4){var _0x5837a2=_0x3b7145(this);if(!_0x5837a2['length'])return _0x5837a2;var _0x1e70e5=_0x3b7145[_0x2194('0x57')](!![],{},_0x4aa0e9,_0x4018b4);if(typeof _0x1e70e5[_0x2194('0x25')]['isProductPage']!=_0x2194('0x58'))_0x1e70e5['productPage']['isProductPage']=_0x3b7145(document[_0x2194('0x59')])['is'](_0x2194('0x5a'));_0x326f1c(_0x5837a2,_0x1e70e5);return _0x5837a2;};}(this));
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
var _0xa223=['addClass','qd-am-li-','qd-am-first','last','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','toUpperCase','ite','---','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','.qd-am-banner','length','parent','qd-am-collection-wrapper','qdAjax','url','each','img[alt=\x27','attr','data-qdam-value','.box-banner','insertBefore','qd-am-content-loaded','text','trim','[class*=\x27colunas\x27]','clone','hide','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','trigger','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','children','first','>li','qd-amazing-menu','>ul','qd-am-dropdown','qd-am-level-','add','qd-am-','-li','callback','QuatroDigital.am.callback','extend','.qd_amazing_menu_auto','getParent','closest','QD_amazingMenu','/qd-amazing-menu','object','error','undefined','info','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','apply','join','qdAmAddNdx'];(function(_0x243c99,_0x1fa5cc){var _0x13efac=function(_0x475b56){while(--_0x475b56){_0x243c99['push'](_0x243c99['shift']());}};_0x13efac(++_0x1fa5cc);}(_0xa223,0xc2));var _0x3a22=function(_0x38371f,_0x42dbe3){_0x38371f=_0x38371f-0x0;var _0x447517=_0xa223[_0x38371f];return _0x447517;};(function(_0x34fffa){_0x34fffa['fn'][_0x3a22('0x0')]=_0x34fffa['fn'][_0x3a22('0x1')];}(jQuery));(function(_0x5bb37c){var _0x40a0b5;var _0x4c0417=jQuery;if('function'!==typeof _0x4c0417['fn'][_0x3a22('0x2')]){var _0x1bb711={'url':_0x3a22('0x3'),'callback':function(){},'ajaxCallback':function(){}};var _0x5ccaa8=function(_0x3c4d1a,_0x44e1ed){if(_0x3a22('0x4')===typeof console&&'undefined'!==typeof console[_0x3a22('0x5')]&&_0x3a22('0x6')!==typeof console[_0x3a22('0x7')]&&'undefined'!==typeof console[_0x3a22('0x8')]){var _0x19f7ec;_0x3a22('0x4')===typeof _0x3c4d1a?(_0x3c4d1a[_0x3a22('0x9')]('[QD\x20Amazing\x20Menu]\x0a'),_0x19f7ec=_0x3c4d1a):_0x19f7ec=[_0x3a22('0xa')+_0x3c4d1a];if(_0x3a22('0x6')===typeof _0x44e1ed||_0x3a22('0xb')!==_0x44e1ed['toLowerCase']()&&'aviso'!==_0x44e1ed[_0x3a22('0xc')]())if(_0x3a22('0x6')!==typeof _0x44e1ed&&_0x3a22('0x7')===_0x44e1ed[_0x3a22('0xc')]())try{console[_0x3a22('0x7')][_0x3a22('0xd')](console,_0x19f7ec);}catch(_0x5b907a){try{console['info'](_0x19f7ec[_0x3a22('0xe')]('\x0a'));}catch(_0x212891){}}else try{console[_0x3a22('0x5')][_0x3a22('0xd')](console,_0x19f7ec);}catch(_0xcd6c8a){try{console[_0x3a22('0x5')](_0x19f7ec['join']('\x0a'));}catch(_0x30eeff){}}else try{console[_0x3a22('0x8')]['apply'](console,_0x19f7ec);}catch(_0xe85f9e){try{console[_0x3a22('0x8')](_0x19f7ec[_0x3a22('0xe')]('\x0a'));}catch(_0x256ff){}}}};_0x4c0417['fn'][_0x3a22('0xf')]=function(){var _0x4b582a=_0x4c0417(this);_0x4b582a['each'](function(_0x27a484){_0x4c0417(this)[_0x3a22('0x10')](_0x3a22('0x11')+_0x27a484);});_0x4b582a['first']()[_0x3a22('0x10')](_0x3a22('0x12'));_0x4b582a[_0x3a22('0x13')]()['addClass']('qd-am-last');return _0x4b582a;};_0x4c0417['fn'][_0x3a22('0x2')]=function(){};_0x5bb37c=function(_0x38db30){var _0x67ac5f={'t':_0x3a22('0x14')};return function(_0x58c881){var _0x31ff0d=function(_0x39f548){return _0x39f548;};var _0xc745bf=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x58c881=_0x58c881['d'+_0xc745bf[0x10]+'c'+_0xc745bf[0x11]+'m'+_0x31ff0d(_0xc745bf[0x1])+'n'+_0xc745bf[0xd]]['l'+_0xc745bf[0x12]+'c'+_0xc745bf[0x0]+'ti'+_0x31ff0d('o')+'n'];var _0x3d4fb4=function(_0x13e710){return escape(encodeURIComponent(_0x13e710[_0x3a22('0x15')](/\./g,'¨')[_0x3a22('0x15')](/[a-zA-Z]/g,function(_0x45a96e){return String['fromCharCode'](('Z'>=_0x45a96e?0x5a:0x7a)>=(_0x45a96e=_0x45a96e['charCodeAt'](0x0)+0xd)?_0x45a96e:_0x45a96e-0x1a);})));};var _0x1efe03=_0x3d4fb4(_0x58c881[[_0xc745bf[0x9],_0x31ff0d('o'),_0xc745bf[0xc],_0xc745bf[_0x31ff0d(0xd)]][_0x3a22('0xe')]('')]);_0x3d4fb4=_0x3d4fb4((window[['js',_0x31ff0d('no'),'m',_0xc745bf[0x1],_0xc745bf[0x4][_0x3a22('0x16')](),_0x3a22('0x17')][_0x3a22('0xe')]('')]||_0x3a22('0x18'))+['.v',_0xc745bf[0xd],'e',_0x31ff0d('x'),'co',_0x31ff0d('mm'),'erc',_0xc745bf[0x1],'.c',_0x31ff0d('o'),'m.',_0xc745bf[0x13],'r'][_0x3a22('0xe')](''));for(var _0x55830f in _0x67ac5f){if(_0x3d4fb4===_0x55830f+_0x67ac5f[_0x55830f]||_0x1efe03===_0x55830f+_0x67ac5f[_0x55830f]){var _0x161e82='tr'+_0xc745bf[0x11]+'e';break;}_0x161e82='f'+_0xc745bf[0x0]+'ls'+_0x31ff0d(_0xc745bf[0x1])+'';}_0x31ff0d=!0x1;-0x1<_0x58c881[[_0xc745bf[0xc],'e',_0xc745bf[0x0],'rc',_0xc745bf[0x9]][_0x3a22('0xe')]('')][_0x3a22('0x19')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x31ff0d=!0x0);return[_0x161e82,_0x31ff0d];}(_0x38db30);}(window);if(!eval(_0x5bb37c[0x0]))return _0x5bb37c[0x1]?_0x5ccaa8(_0x3a22('0x1a')):!0x1;var _0x53906f=function(_0x52e771){var _0x5d8caf=_0x52e771[_0x3a22('0x1b')](_0x3a22('0x1c'));var _0x503f9a=_0x5d8caf[_0x3a22('0x1d')](_0x3a22('0x1e'));var _0x24378e=_0x5d8caf[_0x3a22('0x1d')]('.qd-am-collection');if(_0x503f9a[_0x3a22('0x1f')]||_0x24378e[_0x3a22('0x1f')])_0x503f9a[_0x3a22('0x20')]()[_0x3a22('0x10')]('qd-am-banner-wrapper'),_0x24378e[_0x3a22('0x20')]()['addClass'](_0x3a22('0x21')),_0x4c0417[_0x3a22('0x22')]({'url':_0x40a0b5[_0x3a22('0x23')],'dataType':'html','success':function(_0x7cf24a){var _0x2c5b86=_0x4c0417(_0x7cf24a);_0x503f9a[_0x3a22('0x24')](function(){var _0x7cf24a=_0x4c0417(this);var _0x98a63c=_0x2c5b86[_0x3a22('0x1b')](_0x3a22('0x25')+_0x7cf24a[_0x3a22('0x26')](_0x3a22('0x27'))+'\x27]');_0x98a63c[_0x3a22('0x1f')]&&(_0x98a63c[_0x3a22('0x24')](function(){_0x4c0417(this)[_0x3a22('0x0')](_0x3a22('0x28'))['clone']()[_0x3a22('0x29')](_0x7cf24a);}),_0x7cf24a['hide']());})[_0x3a22('0x10')](_0x3a22('0x2a'));_0x24378e['each'](function(){var _0x7cf24a={};var _0x3a445c=_0x4c0417(this);_0x2c5b86[_0x3a22('0x1b')]('h2')[_0x3a22('0x24')](function(){if(_0x4c0417(this)[_0x3a22('0x2b')]()[_0x3a22('0x2c')]()[_0x3a22('0xc')]()==_0x3a445c['attr'](_0x3a22('0x27'))[_0x3a22('0x2c')]()['toLowerCase']())return _0x7cf24a=_0x4c0417(this),!0x1;});_0x7cf24a[_0x3a22('0x1f')]&&(_0x7cf24a[_0x3a22('0x24')](function(){_0x4c0417(this)[_0x3a22('0x0')](_0x3a22('0x2d'))[_0x3a22('0x2e')]()[_0x3a22('0x29')](_0x3a445c);}),_0x3a445c[_0x3a22('0x2f')]());})[_0x3a22('0x10')](_0x3a22('0x2a'));},'error':function(){_0x5ccaa8(_0x3a22('0x30')+_0x40a0b5[_0x3a22('0x23')]+_0x3a22('0x31'));},'complete':function(){_0x40a0b5[_0x3a22('0x32')][_0x3a22('0x33')](this);_0x4c0417(window)[_0x3a22('0x34')]('QuatroDigital.am.ajaxCallback',_0x52e771);},'clearQueueDelay':0xbb8});};_0x4c0417['QD_amazingMenu']=function(_0x6db517){var _0x27b99b=_0x6db517[_0x3a22('0x1b')](_0x3a22('0x35'))[_0x3a22('0x24')](function(){var _0xe9cd54=_0x4c0417(this);if(!_0xe9cd54[_0x3a22('0x1f')])return _0x5ccaa8([_0x3a22('0x36'),_0x6db517],_0x3a22('0xb'));_0xe9cd54[_0x3a22('0x1b')](_0x3a22('0x37'))[_0x3a22('0x20')]()[_0x3a22('0x10')]('qd-am-has-ul');_0xe9cd54[_0x3a22('0x1b')]('li')[_0x3a22('0x24')](function(){var _0x53bcaf=_0x4c0417(this);var _0x490979=_0x53bcaf[_0x3a22('0x38')](':not(ul)');_0x490979['length']&&_0x53bcaf[_0x3a22('0x10')]('qd-am-elem-'+_0x490979[_0x3a22('0x39')]()['text']()[_0x3a22('0x2c')]()['replaceSpecialChars']()['replace'](/\./g,'')['replace'](/\s/g,'-')[_0x3a22('0xc')]());});var _0x1c961e=_0xe9cd54[_0x3a22('0x1b')](_0x3a22('0x3a'))['qdAmAddNdx']();_0xe9cd54[_0x3a22('0x10')](_0x3a22('0x3b'));_0x1c961e=_0x1c961e['find'](_0x3a22('0x3c'));_0x1c961e[_0x3a22('0x24')](function(){var _0x3554c1=_0x4c0417(this);_0x3554c1['find'](_0x3a22('0x3a'))[_0x3a22('0xf')]()[_0x3a22('0x10')]('qd-am-column');_0x3554c1[_0x3a22('0x10')]('qd-am-dropdown-menu');_0x3554c1['parent']()[_0x3a22('0x10')]('qd-am-dropdown');});_0x1c961e[_0x3a22('0x10')](_0x3a22('0x3d'));var _0x5f538a=0x0,_0x5bb37c=function(_0x5e76ce){_0x5f538a+=0x1;_0x5e76ce=_0x5e76ce[_0x3a22('0x38')]('li')[_0x3a22('0x38')]('*');_0x5e76ce[_0x3a22('0x1f')]&&(_0x5e76ce['addClass'](_0x3a22('0x3e')+_0x5f538a),_0x5bb37c(_0x5e76ce));};_0x5bb37c(_0xe9cd54);_0xe9cd54[_0x3a22('0x3f')](_0xe9cd54[_0x3a22('0x1b')]('ul'))[_0x3a22('0x24')](function(){var _0x4a928c=_0x4c0417(this);_0x4a928c[_0x3a22('0x10')](_0x3a22('0x40')+_0x4a928c[_0x3a22('0x38')]('li')['length']+_0x3a22('0x41'));});});_0x53906f(_0x27b99b);_0x40a0b5[_0x3a22('0x42')][_0x3a22('0x33')](this);_0x4c0417(window)[_0x3a22('0x34')](_0x3a22('0x43'),_0x6db517);};_0x4c0417['fn'][_0x3a22('0x2')]=function(_0x56d16d){var _0x291606=_0x4c0417(this);if(!_0x291606[_0x3a22('0x1f')])return _0x291606;_0x40a0b5=_0x4c0417[_0x3a22('0x44')]({},_0x1bb711,_0x56d16d);_0x291606['exec']=new _0x4c0417['QD_amazingMenu'](_0x4c0417(this));return _0x291606;};_0x4c0417(function(){_0x4c0417(_0x3a22('0x45'))['QD_amazingMenu']();});}}(this));

/* Quatro Digital Smart Cart */
var _0xd3d1=['changeQantity','qd_on','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','keyup.qd_ddc_change','keyCode','.qd-ddc-remove','click.qd_ddc_remove','removeProduct','stop','remove','cartIsEmpty','qdDdcLastPostalCode','calculateShipping','BRA','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','index','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','.qdDdcContainer','QD_smartCart','selector','dropDown','smartCart','getParent','replace','abs','undefined','pow','round','toFixed','length','join','function','prototype','trim','capitalize','charAt','toUpperCase','toLowerCase','qdAjax','qdAjaxQueue','jquery','000','error','extend','GET','object','stringify','toString','url','type','jqXHR','ajax','done','success','fail','always','clearQueueDelay','message','version','4.0','closest','checkout','call','QuatroDigital_simpleCart','ajaxStopOn','simpleCart','alerta','[Simple\x20Cart]\x0a','warn','info','add','QD_simpleCart','elements','.qd_cart_qtt','.qd_cart_total','attr','each','qd_simpleCartOpts','data','_QuatroDigital_CartData','totalizers','value','total','currencySymbol','shipping','allTotal','qtt','showQuantityByItems','items','quantity','callback','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','hide','.singular','show','filter','.plural','qd-emptyCart','cartTotalE','html','cartQttE','itemsTextE','$this','cartQtt','cartTotal','itemsText','emptyElem','emptyCart','addClass','qd-sc-populated','smartCheckout','_QuatroDigital_DropDown','getOrderForm','SDK','QD_checkoutQueue','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','trigger','simpleCartCallback.quatro_digital','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','.qd_cart_auto','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','vtexjs','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','Callbacks','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','.productInformationWrapper\x20\x20a.buy-button','javascript:','body','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','location','href','#produto,\x20.produto','isSmartCheckout','qd-bb-click-active','click.qd_bb_buy_sc','allowBuyClick','clickBuySmartCheckout','preventDefault','Método\x20descontinuado!','buyButton','.qd-sbb-on','qd-sbb-on','.btn-add-buy-button-asynchronous','.remove-href','qd-bb-active','children','append','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','.buy-in-page-button','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','_Quatro_Digital_dropDown','prodAdd','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','removeClass','getCartInfoByUrl','função\x20descontinuada','allowUpdate','click','bind','unbind','load','mouseenter.qd_bb_buy_sc','selectSkuMsg','execDefaultAction','redirect=false','redirect=true','queue','buyIfQuantityZeroed','match','push','productPageCallback','split','ku=','asyncCallback','productAddedToCart','fakeRequest','buyButtonClickCallback','parent','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','QD_buyButton','.qd-bb-itemAddWrapper','prepend','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','QuatroDigital.qd_bb_prod_add','ajaxSend','indexOf','/checkout/cart/add','productAddedToCart.qdSbbVtex','ajaxStop','Oooops!\x20','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','QD_dropDownCart','charCodeAt','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','Ir\x20ao\x20Carrinho','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','skuName','name','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','find','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','off','keyup.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','scrollCart','val','keyup.qd_ddc_cep','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','mouseleave.qd_ddc_hover','texts','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','linkCart','.qd_ddc_continueShopping','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','cartContainer','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','.qd-ddc-infoAllTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','_QuatroDigital_AmountProduct','exec','qd-ddc-prodLoaded','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','qd-ddc-','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','content','.qd-ddc-quantity','insertProdImg','.qd-ddc-image','imageUrl','appendTo','address','actionButtons','lastSku','[data-sku=\x27','outerHeight','qd-ddc-lastAdded','qd-ddc-product-add-time','qd-ddc-cart-empty','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','data-sku','data-sku-index'];(function(_0x459335,_0x2e95dd){var _0x50f00b=function(_0x5ccdaf){while(--_0x5ccdaf){_0x459335['push'](_0x459335['shift']());}};_0x50f00b(++_0x2e95dd);}(_0xd3d1,0x172));var _0x1d3d=function(_0x2c7618,_0x26be9c){_0x2c7618=_0x2c7618-0x0;var _0x5ce3f0=_0xd3d1[_0x2c7618];return _0x5ce3f0;};(function(_0x534a48){_0x534a48['fn'][_0x1d3d('0x0')]=_0x534a48['fn']['closest'];}(jQuery));function qd_number_format(_0x56f01c,_0x2d0605,_0x12bffe,_0x1b8ea2){_0x56f01c=(_0x56f01c+'')[_0x1d3d('0x1')](/[^0-9+\-Ee.]/g,'');_0x56f01c=isFinite(+_0x56f01c)?+_0x56f01c:0x0;_0x2d0605=isFinite(+_0x2d0605)?Math[_0x1d3d('0x2')](_0x2d0605):0x0;_0x1b8ea2=_0x1d3d('0x3')===typeof _0x1b8ea2?',':_0x1b8ea2;_0x12bffe=_0x1d3d('0x3')===typeof _0x12bffe?'.':_0x12bffe;var _0x449475='',_0x449475=function(_0x3831ce,_0xb1b3c6){var _0x2d0605=Math[_0x1d3d('0x4')](0xa,_0xb1b3c6);return''+(Math[_0x1d3d('0x5')](_0x3831ce*_0x2d0605)/_0x2d0605)[_0x1d3d('0x6')](_0xb1b3c6);},_0x449475=(_0x2d0605?_0x449475(_0x56f01c,_0x2d0605):''+Math[_0x1d3d('0x5')](_0x56f01c))['split']('.');0x3<_0x449475[0x0][_0x1d3d('0x7')]&&(_0x449475[0x0]=_0x449475[0x0][_0x1d3d('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x1b8ea2));(_0x449475[0x1]||'')[_0x1d3d('0x7')]<_0x2d0605&&(_0x449475[0x1]=_0x449475[0x1]||'',_0x449475[0x1]+=Array(_0x2d0605-_0x449475[0x1][_0x1d3d('0x7')]+0x1)[_0x1d3d('0x8')]('0'));return _0x449475[_0x1d3d('0x8')](_0x12bffe);};_0x1d3d('0x9')!==typeof String[_0x1d3d('0xa')][_0x1d3d('0xb')]&&(String[_0x1d3d('0xa')][_0x1d3d('0xb')]=function(){return this['replace'](/^\s+|\s+$/g,'');});_0x1d3d('0x9')!=typeof String[_0x1d3d('0xa')]['capitalize']&&(String['prototype'][_0x1d3d('0xc')]=function(){return this[_0x1d3d('0xd')](0x0)[_0x1d3d('0xe')]()+this['slice'](0x1)[_0x1d3d('0xf')]();});(function(_0x4dcc22){if(_0x1d3d('0x9')!==typeof _0x4dcc22[_0x1d3d('0x10')]){var _0x3491e4={};_0x4dcc22[_0x1d3d('0x11')]=_0x3491e4;0x96>parseInt((_0x4dcc22['fn'][_0x1d3d('0x12')][_0x1d3d('0x1')](/[^0-9]+/g,'')+_0x1d3d('0x13'))['slice'](0x0,0x3),0xa)&&console&&'function'==typeof console[_0x1d3d('0x14')]&&console[_0x1d3d('0x14')]();_0x4dcc22['qdAjax']=function(_0x3b9174){try{var _0x57d6de=_0x4dcc22[_0x1d3d('0x15')]({},{'url':'','type':_0x1d3d('0x16'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x3b9174);var _0x2cd430=_0x1d3d('0x17')===typeof _0x57d6de['data']?JSON[_0x1d3d('0x18')](_0x57d6de['data']):_0x57d6de['data'][_0x1d3d('0x19')]();var _0x2bfac3=encodeURIComponent(_0x57d6de[_0x1d3d('0x1a')]+'|'+_0x57d6de[_0x1d3d('0x1b')]+'|'+_0x2cd430);_0x3491e4[_0x2bfac3]=_0x3491e4[_0x2bfac3]||{};_0x1d3d('0x3')==typeof _0x3491e4[_0x2bfac3][_0x1d3d('0x1c')]?_0x3491e4[_0x2bfac3][_0x1d3d('0x1c')]=_0x4dcc22[_0x1d3d('0x1d')](_0x57d6de):(_0x3491e4[_0x2bfac3][_0x1d3d('0x1c')][_0x1d3d('0x1e')](_0x57d6de[_0x1d3d('0x1f')]),_0x3491e4[_0x2bfac3]['jqXHR'][_0x1d3d('0x20')](_0x57d6de[_0x1d3d('0x14')]),_0x3491e4[_0x2bfac3]['jqXHR'][_0x1d3d('0x21')](_0x57d6de['complete']));_0x3491e4[_0x2bfac3][_0x1d3d('0x1c')][_0x1d3d('0x21')](function(){isNaN(parseInt(_0x57d6de[_0x1d3d('0x22')]))||setTimeout(function(){_0x3491e4[_0x2bfac3][_0x1d3d('0x1c')]=void 0x0;},_0x57d6de[_0x1d3d('0x22')]);});return _0x3491e4[_0x2bfac3][_0x1d3d('0x1c')];}catch(_0x2b8074){_0x1d3d('0x3')!==typeof console&&_0x1d3d('0x9')===typeof console[_0x1d3d('0x14')]&&console[_0x1d3d('0x14')]('Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20'+_0x2b8074[_0x1d3d('0x23')]);}};_0x4dcc22['qdAjax'][_0x1d3d('0x24')]=_0x1d3d('0x25');}}(jQuery));(function(_0x55c935){_0x55c935['fn'][_0x1d3d('0x0')]=_0x55c935['fn'][_0x1d3d('0x26')];}(jQuery));(function(){var _0x3cb011=jQuery;if(_0x1d3d('0x9')!==typeof _0x3cb011['fn']['simpleCart']){_0x3cb011(function(){var _0x2d46c2=vtexjs[_0x1d3d('0x27')]['getOrderForm'];vtexjs[_0x1d3d('0x27')]['getOrderForm']=function(){return _0x2d46c2[_0x1d3d('0x28')]();};});try{window[_0x1d3d('0x29')]=window['QuatroDigital_simpleCart']||{};window[_0x1d3d('0x29')][_0x1d3d('0x2a')]=!0x1;_0x3cb011['fn'][_0x1d3d('0x2b')]=function(_0x250b03,_0x3a4c01,_0x462628){var _0x4fc03a=function(_0x11448a,_0x2c2201){if('object'===typeof console){var _0x2146c3=_0x1d3d('0x17')===typeof _0x11448a;_0x1d3d('0x3')!==typeof _0x2c2201&&_0x1d3d('0x2c')===_0x2c2201['toLowerCase']()?_0x2146c3?console['warn'](_0x1d3d('0x2d'),_0x11448a[0x0],_0x11448a[0x1],_0x11448a[0x2],_0x11448a[0x3],_0x11448a[0x4],_0x11448a[0x5],_0x11448a[0x6],_0x11448a[0x7]):console[_0x1d3d('0x2e')]('[Simple\x20Cart]\x0a'+_0x11448a):_0x1d3d('0x3')!==typeof _0x2c2201&&_0x1d3d('0x2f')===_0x2c2201[_0x1d3d('0xf')]()?_0x2146c3?console[_0x1d3d('0x2f')]('[Simple\x20Cart]\x0a',_0x11448a[0x0],_0x11448a[0x1],_0x11448a[0x2],_0x11448a[0x3],_0x11448a[0x4],_0x11448a[0x5],_0x11448a[0x6],_0x11448a[0x7]):console['info'](_0x1d3d('0x2d')+_0x11448a):_0x2146c3?console['error'](_0x1d3d('0x2d'),_0x11448a[0x0],_0x11448a[0x1],_0x11448a[0x2],_0x11448a[0x3],_0x11448a[0x4],_0x11448a[0x5],_0x11448a[0x6],_0x11448a[0x7]):console[_0x1d3d('0x14')](_0x1d3d('0x2d')+_0x11448a);}};var _0x318dd3=_0x3cb011(this);_0x1d3d('0x17')===typeof _0x250b03?_0x3a4c01=_0x250b03:(_0x250b03=_0x250b03||!0x1,_0x318dd3=_0x318dd3[_0x1d3d('0x30')](_0x3cb011[_0x1d3d('0x31')][_0x1d3d('0x32')]));if(!_0x318dd3['length'])return _0x318dd3;_0x3cb011[_0x1d3d('0x31')]['elements']=_0x3cb011[_0x1d3d('0x31')][_0x1d3d('0x32')]['add'](_0x318dd3);_0x462628=_0x1d3d('0x3')===typeof _0x462628?!0x1:_0x462628;var _0x2319af={'cartQtt':_0x1d3d('0x33'),'cartTotal':_0x1d3d('0x34'),'itemsText':'.qd_items_text','currencySymbol':(_0x3cb011('meta[name=currency]')[_0x1d3d('0x35')]('content')||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x290853=_0x3cb011[_0x1d3d('0x15')]({},_0x2319af,_0x3a4c01);var _0x5ba0cd=_0x3cb011('');_0x318dd3[_0x1d3d('0x36')](function(){var _0x175028=_0x3cb011(this);_0x175028['data'](_0x1d3d('0x37'))||_0x175028[_0x1d3d('0x38')](_0x1d3d('0x37'),_0x290853);});var _0x45c1b2=function(_0x1fec46){window[_0x1d3d('0x39')]=window['_QuatroDigital_CartData']||{};for(var _0x250b03=0x0,_0x363288=0x0,_0x1c9e17=0x0;_0x1c9e17<_0x1fec46[_0x1d3d('0x3a')][_0x1d3d('0x7')];_0x1c9e17++)'Shipping'==_0x1fec46[_0x1d3d('0x3a')][_0x1c9e17]['id']&&(_0x363288+=_0x1fec46[_0x1d3d('0x3a')][_0x1c9e17][_0x1d3d('0x3b')]),_0x250b03+=_0x1fec46[_0x1d3d('0x3a')][_0x1c9e17]['value'];window[_0x1d3d('0x39')][_0x1d3d('0x3c')]=_0x290853[_0x1d3d('0x3d')]+qd_number_format(_0x250b03/0x64,0x2,',','.');window[_0x1d3d('0x39')][_0x1d3d('0x3e')]=_0x290853['currencySymbol']+qd_number_format(_0x363288/0x64,0x2,',','.');window['_QuatroDigital_CartData'][_0x1d3d('0x3f')]=_0x290853[_0x1d3d('0x3d')]+qd_number_format((_0x250b03+_0x363288)/0x64,0x2,',','.');window[_0x1d3d('0x39')][_0x1d3d('0x40')]=0x0;if(_0x290853[_0x1d3d('0x41')])for(_0x1c9e17=0x0;_0x1c9e17<_0x1fec46['items'][_0x1d3d('0x7')];_0x1c9e17++)window['_QuatroDigital_CartData'][_0x1d3d('0x40')]+=_0x1fec46[_0x1d3d('0x42')][_0x1c9e17][_0x1d3d('0x43')];else window[_0x1d3d('0x39')]['qtt']=_0x1fec46[_0x1d3d('0x42')][_0x1d3d('0x7')]||0x0;try{window[_0x1d3d('0x39')][_0x1d3d('0x44')]&&window[_0x1d3d('0x39')][_0x1d3d('0x44')][_0x1d3d('0x45')]&&window['_QuatroDigital_CartData'][_0x1d3d('0x44')]['fire']();}catch(_0x160f88){_0x4fc03a(_0x1d3d('0x46'));}_0x3792ab(_0x5ba0cd);};var _0x5e8ec0=function(_0x35be41,_0x5a921c){0x1===_0x35be41?_0x5a921c[_0x1d3d('0x47')]()['filter'](_0x1d3d('0x48'))[_0x1d3d('0x49')]():_0x5a921c[_0x1d3d('0x47')]()[_0x1d3d('0x4a')](_0x1d3d('0x4b'))[_0x1d3d('0x49')]();};var _0x148d7e=function(_0x1b3573){0x1>_0x1b3573?_0x318dd3['addClass']('qd-emptyCart'):_0x318dd3['removeClass'](_0x1d3d('0x4c'));};var _0x473c1d=function(_0x1d0073,_0x3856d5){var _0x438c61=parseInt(window[_0x1d3d('0x39')]['qtt'],0xa);_0x3856d5['$this']['show']();isNaN(_0x438c61)&&(_0x4fc03a('O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.',_0x1d3d('0x2c')),_0x438c61=0x0);_0x3856d5[_0x1d3d('0x4d')][_0x1d3d('0x4e')](window[_0x1d3d('0x39')][_0x1d3d('0x3c')]);_0x3856d5[_0x1d3d('0x4f')][_0x1d3d('0x4e')](_0x438c61);_0x5e8ec0(_0x438c61,_0x3856d5[_0x1d3d('0x50')]);_0x148d7e(_0x438c61);};var _0x3792ab=function(_0x445cb0){_0x318dd3[_0x1d3d('0x36')](function(){var _0xb88d59={};var _0x3e6431=_0x3cb011(this);_0x250b03&&_0x3e6431[_0x1d3d('0x38')](_0x1d3d('0x37'))&&_0x3cb011['extend'](_0x290853,_0x3e6431[_0x1d3d('0x38')](_0x1d3d('0x37')));_0xb88d59[_0x1d3d('0x51')]=_0x3e6431;_0xb88d59[_0x1d3d('0x4f')]=_0x3e6431['find'](_0x290853[_0x1d3d('0x52')])||_0x5ba0cd;_0xb88d59['cartTotalE']=_0x3e6431['find'](_0x290853[_0x1d3d('0x53')])||_0x5ba0cd;_0xb88d59[_0x1d3d('0x50')]=_0x3e6431['find'](_0x290853[_0x1d3d('0x54')])||_0x5ba0cd;_0xb88d59[_0x1d3d('0x55')]=_0x3e6431['find'](_0x290853[_0x1d3d('0x56')])||_0x5ba0cd;_0x473c1d(_0x445cb0,_0xb88d59);_0x3e6431[_0x1d3d('0x57')](_0x1d3d('0x58'));});};(function(){if(_0x290853[_0x1d3d('0x59')]){window[_0x1d3d('0x5a')]=window[_0x1d3d('0x5a')]||{};if(_0x1d3d('0x3')!==typeof window[_0x1d3d('0x5a')][_0x1d3d('0x5b')]&&(_0x462628||!_0x250b03))return _0x45c1b2(window['_QuatroDigital_DropDown'][_0x1d3d('0x5b')]);if('object'!==typeof window['vtexjs']||'undefined'===typeof window['vtexjs'][_0x1d3d('0x27')])if(_0x1d3d('0x17')===typeof vtex&&_0x1d3d('0x17')===typeof vtex[_0x1d3d('0x27')]&&'undefined'!==typeof vtex[_0x1d3d('0x27')]['SDK'])new vtex[(_0x1d3d('0x27'))][(_0x1d3d('0x5c'))]();else return _0x4fc03a('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x3cb011[_0x1d3d('0x5d')]([_0x1d3d('0x42'),'totalizers',_0x1d3d('0x5e')],{'done':function(_0x4318ed){_0x45c1b2(_0x4318ed);window[_0x1d3d('0x5a')][_0x1d3d('0x5b')]=_0x4318ed;},'fail':function(_0x3bac7f){_0x4fc03a([_0x1d3d('0x5f'),_0x3bac7f]);}});}else alert('Esta\x20é\x20uma\x20função\x20descontinuada\x20=/');}());_0x290853[_0x1d3d('0x44')]();_0x3cb011(window)[_0x1d3d('0x60')](_0x1d3d('0x61'));return _0x318dd3;};_0x3cb011[_0x1d3d('0x31')]={'elements':_0x3cb011('')};_0x3cb011(function(){var _0x35e53e;'function'===typeof window[_0x1d3d('0x62')]&&(_0x35e53e=window['ajaxRequestbuyButtonAsynchronous'],window[_0x1d3d('0x62')]=function(_0x5dcad1,_0x45a89f,_0x20e464,_0x2ecfeb,_0x1711ee){_0x35e53e[_0x1d3d('0x28')](this,_0x5dcad1,_0x45a89f,_0x20e464,_0x2ecfeb,function(){_0x1d3d('0x9')===typeof _0x1711ee&&_0x1711ee();_0x3cb011[_0x1d3d('0x31')]['elements'][_0x1d3d('0x36')](function(){var _0x3b30cb=_0x3cb011(this);_0x3b30cb[_0x1d3d('0x2b')](_0x3b30cb[_0x1d3d('0x38')](_0x1d3d('0x37')));});});});});var _0x44243d=window['ReloadItemsCart']||void 0x0;window[_0x1d3d('0x63')]=function(_0x2ca216){_0x3cb011['fn'][_0x1d3d('0x2b')](!0x0);_0x1d3d('0x9')===typeof _0x44243d?_0x44243d[_0x1d3d('0x28')](this,_0x2ca216):alert(_0x2ca216);};_0x3cb011(function(){var _0x4bff04=_0x3cb011(_0x1d3d('0x64'));_0x4bff04[_0x1d3d('0x7')]&&_0x4bff04[_0x1d3d('0x2b')]();});_0x3cb011(function(){_0x3cb011(window)['bind'](_0x1d3d('0x65'),function(){_0x3cb011['fn']['simpleCart'](!0x0);});});}catch(_0x2ee6ca){'undefined'!==typeof console&&_0x1d3d('0x9')===typeof console[_0x1d3d('0x14')]&&console[_0x1d3d('0x14')]('Oooops!\x20',_0x2ee6ca);}}}());(function(){var _0x389330=function(_0x311d81,_0x1755ce){if('object'===typeof console){var _0x336263=_0x1d3d('0x17')===typeof _0x311d81;_0x1d3d('0x3')!==typeof _0x1755ce&&_0x1d3d('0x2c')===_0x1755ce[_0x1d3d('0xf')]()?_0x336263?console['warn'](_0x1d3d('0x66'),_0x311d81[0x0],_0x311d81[0x1],_0x311d81[0x2],_0x311d81[0x3],_0x311d81[0x4],_0x311d81[0x5],_0x311d81[0x6],_0x311d81[0x7]):console[_0x1d3d('0x2e')](_0x1d3d('0x66')+_0x311d81):'undefined'!==typeof _0x1755ce&&_0x1d3d('0x2f')===_0x1755ce[_0x1d3d('0xf')]()?_0x336263?console[_0x1d3d('0x2f')](_0x1d3d('0x66'),_0x311d81[0x0],_0x311d81[0x1],_0x311d81[0x2],_0x311d81[0x3],_0x311d81[0x4],_0x311d81[0x5],_0x311d81[0x6],_0x311d81[0x7]):console[_0x1d3d('0x2f')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a'+_0x311d81):_0x336263?console[_0x1d3d('0x14')](_0x1d3d('0x66'),_0x311d81[0x0],_0x311d81[0x1],_0x311d81[0x2],_0x311d81[0x3],_0x311d81[0x4],_0x311d81[0x5],_0x311d81[0x6],_0x311d81[0x7]):console['error'](_0x1d3d('0x66')+_0x311d81);}},_0x15de4f=null,_0xfafb77={},_0x5ad698={},_0x19a126={};$[_0x1d3d('0x5d')]=function(_0x51f4fd,_0x3416ec){if(null===_0x15de4f)if(_0x1d3d('0x17')===typeof window[_0x1d3d('0x67')]&&_0x1d3d('0x3')!==typeof window['vtexjs'][_0x1d3d('0x27')])_0x15de4f=window[_0x1d3d('0x67')][_0x1d3d('0x27')];else return _0x389330(_0x1d3d('0x68'));var _0x5af94a=$[_0x1d3d('0x15')]({'done':function(){},'fail':function(){}},_0x3416ec),_0x5decc4=_0x51f4fd[_0x1d3d('0x8')](';'),_0x462994=function(){_0xfafb77[_0x5decc4][_0x1d3d('0x30')](_0x5af94a[_0x1d3d('0x1e')]);_0x5ad698[_0x5decc4][_0x1d3d('0x30')](_0x5af94a[_0x1d3d('0x20')]);};_0x19a126[_0x5decc4]?_0x462994():(_0xfafb77[_0x5decc4]=$['Callbacks'](),_0x5ad698[_0x5decc4]=$[_0x1d3d('0x69')](),_0x462994(),_0x19a126[_0x5decc4]=!0x0,_0x15de4f[_0x1d3d('0x5b')](_0x51f4fd)['done'](function(_0x164b5d){_0x19a126[_0x5decc4]=!0x1;_0xfafb77[_0x5decc4][_0x1d3d('0x45')](_0x164b5d);})[_0x1d3d('0x20')](function(_0x5d951f){_0x19a126[_0x5decc4]=!0x1;_0x5ad698[_0x5decc4][_0x1d3d('0x45')](_0x5d951f);}));};}());(function(_0x328032){try{var _0x29033a=jQuery,_0x4ae421,_0x5b909b=_0x29033a({}),_0x328693=function(_0x233c5e,_0x63489){if('object'===typeof console&&_0x1d3d('0x3')!==typeof console[_0x1d3d('0x14')]&&_0x1d3d('0x3')!==typeof console['info']&&_0x1d3d('0x3')!==typeof console[_0x1d3d('0x2e')]){var _0x4d3d48;_0x1d3d('0x17')===typeof _0x233c5e?(_0x233c5e['unshift'](_0x1d3d('0x6a')),_0x4d3d48=_0x233c5e):_0x4d3d48=[_0x1d3d('0x6a')+_0x233c5e];if('undefined'===typeof _0x63489||'alerta'!==_0x63489[_0x1d3d('0xf')]()&&_0x1d3d('0x6b')!==_0x63489['toLowerCase']())if(_0x1d3d('0x3')!==typeof _0x63489&&_0x1d3d('0x2f')===_0x63489[_0x1d3d('0xf')]())try{console[_0x1d3d('0x2f')]['apply'](console,_0x4d3d48);}catch(_0x30b484){try{console[_0x1d3d('0x2f')](_0x4d3d48[_0x1d3d('0x8')]('\x0a'));}catch(_0x5b75df){}}else try{console[_0x1d3d('0x14')][_0x1d3d('0x6c')](console,_0x4d3d48);}catch(_0x3a6655){try{console['error'](_0x4d3d48[_0x1d3d('0x8')]('\x0a'));}catch(_0x434d65){}}else try{console[_0x1d3d('0x2e')][_0x1d3d('0x6c')](console,_0x4d3d48);}catch(_0x1f9d7e){try{console[_0x1d3d('0x2e')](_0x4d3d48['join']('\x0a'));}catch(_0x1dd488){}}}},_0x300ce9={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0x1d3d('0x6d'),'buyQtt':'input.buy-in-page-quantity','selectSkuMsg':_0x1d3d('0x6e'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x405f99,_0xd5f504,_0x4f2057){_0x29033a(_0x1d3d('0x6f'))['is']('.productQuickView')&&('success'===_0xd5f504?alert('Produto\x20adicionado\x20ao\x20carrinho!'):(alert(_0x1d3d('0x70')),('object'===typeof parent?parent:document)[_0x1d3d('0x71')][_0x1d3d('0x72')]=_0x4f2057));},'isProductPage':function(){return _0x29033a(_0x1d3d('0x6f'))['is'](_0x1d3d('0x73'));},'execDefaultAction':function(_0x4f2e0e){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x29033a['QD_buyButton']=function(_0x2abd7e,_0x40397e){function _0x5dc159(_0x11688f){_0x4ae421[_0x1d3d('0x74')]?_0x11688f['data'](_0x1d3d('0x75'))||(_0x11688f[_0x1d3d('0x38')]('qd-bb-click-active',0x1),_0x11688f['on'](_0x1d3d('0x76'),function(_0x59054d){if(!_0x4ae421[_0x1d3d('0x77')]())return!0x0;if(!0x0!==_0x3901e5[_0x1d3d('0x78')][_0x1d3d('0x28')](this))return _0x59054d[_0x1d3d('0x79')](),!0x1;})):alert(_0x1d3d('0x7a'));}function _0x47fef2(_0x40f1ef){_0x40f1ef=_0x40f1ef||_0x29033a(_0x4ae421[_0x1d3d('0x7b')]);_0x40f1ef[_0x1d3d('0x36')](function(){var _0x40f1ef=_0x29033a(this);_0x40f1ef['is'](_0x1d3d('0x7c'))||(_0x40f1ef[_0x1d3d('0x57')](_0x1d3d('0x7d')),_0x40f1ef['is'](_0x1d3d('0x7e'))&&!_0x40f1ef['is'](_0x1d3d('0x7f'))||_0x40f1ef[_0x1d3d('0x38')](_0x1d3d('0x80'))||(_0x40f1ef[_0x1d3d('0x38')]('qd-bb-active',0x1),_0x40f1ef[_0x1d3d('0x81')]('.qd-bb-productAdded')[_0x1d3d('0x7')]||_0x40f1ef[_0x1d3d('0x82')](_0x1d3d('0x83')),_0x40f1ef['is'](_0x1d3d('0x84'))&&_0x4ae421[_0x1d3d('0x85')]()&&_0x4c9a4b[_0x1d3d('0x28')](_0x40f1ef),_0x5dc159(_0x40f1ef)));});_0x4ae421[_0x1d3d('0x85')]()&&!_0x40f1ef[_0x1d3d('0x7')]&&_0x328693(_0x1d3d('0x86')+_0x40f1ef['selector']+'\x27.','info');}var _0x50ebf3=_0x29033a(_0x2abd7e);var _0x3901e5=this;window['_Quatro_Digital_dropDown']=window[_0x1d3d('0x87')]||{};window['_QuatroDigital_CartData']=window[_0x1d3d('0x39')]||{};_0x3901e5[_0x1d3d('0x88')]=function(_0x376dc9,_0x3657ce){_0x50ebf3['addClass'](_0x1d3d('0x89'));_0x29033a(_0x1d3d('0x6f'))[_0x1d3d('0x57')](_0x1d3d('0x8a'));var _0x4ad846=_0x29033a(_0x4ae421[_0x1d3d('0x7b')])[_0x1d3d('0x4a')]('[href=\x27'+(_0x376dc9[_0x1d3d('0x35')](_0x1d3d('0x72'))||'---')+'\x27]')['add'](_0x376dc9);_0x4ad846['addClass']('qd-bb-itemAddBuyButtonWrapper');setTimeout(function(){_0x50ebf3[_0x1d3d('0x8b')]('qd-bb-itemAddCartWrapper');_0x4ad846[_0x1d3d('0x8b')]('qd-bb-itemAddBuyButtonWrapper');},_0x4ae421['timeRemoveNewItemClass']);window['_Quatro_Digital_dropDown']['getOrderForm']=void 0x0;if('undefined'!==typeof _0x40397e&&'function'===typeof _0x40397e[_0x1d3d('0x8c')])return _0x4ae421['isSmartCheckout']||(_0x328693(_0x1d3d('0x8d')),_0x40397e[_0x1d3d('0x8c')]()),window[_0x1d3d('0x5a')][_0x1d3d('0x5b')]=void 0x0,_0x40397e[_0x1d3d('0x8c')](function(_0x50581b){window[_0x1d3d('0x87')][_0x1d3d('0x5b')]=_0x50581b;_0x29033a['fn'][_0x1d3d('0x2b')](!0x0,void 0x0,!0x0);},{'lastSku':_0x3657ce});window[_0x1d3d('0x87')][_0x1d3d('0x8e')]=!0x0;_0x29033a['fn'][_0x1d3d('0x2b')](!0x0);};(function(){if(_0x4ae421['isSmartCheckout']&&_0x4ae421['autoWatchBuyButton']){var _0x492928=_0x29033a(_0x1d3d('0x7e'));_0x492928['length']&&_0x47fef2(_0x492928);}}());var _0x4c9a4b=function(){var _0x39c5d5=_0x29033a(this);_0x1d3d('0x3')!==typeof _0x39c5d5[_0x1d3d('0x38')](_0x1d3d('0x7b'))?(_0x39c5d5['unbind'](_0x1d3d('0x8f')),_0x5dc159(_0x39c5d5)):(_0x39c5d5[_0x1d3d('0x90')]('mouseenter.qd_bb_buy_sc',function(_0x5d9eb6){_0x39c5d5[_0x1d3d('0x91')]('click');_0x5dc159(_0x39c5d5);_0x29033a(this)[_0x1d3d('0x91')](_0x5d9eb6);}),_0x29033a(window)[_0x1d3d('0x92')](function(){_0x39c5d5['unbind'](_0x1d3d('0x8f'));_0x5dc159(_0x39c5d5);_0x39c5d5[_0x1d3d('0x91')](_0x1d3d('0x93'));}));};_0x3901e5[_0x1d3d('0x78')]=function(){var _0x48562a=_0x29033a(this),_0x2abd7e=_0x48562a['attr'](_0x1d3d('0x72'))||'';if(-0x1<_0x2abd7e['indexOf'](_0x4ae421[_0x1d3d('0x94')]))return!0x0;_0x2abd7e=_0x2abd7e[_0x1d3d('0x1')](/redirect\=(false|true)/gi,'')[_0x1d3d('0x1')]('?','?redirect=false&')['replace'](/\&\&/gi,'&');if(_0x4ae421[_0x1d3d('0x95')](_0x48562a))return _0x48562a[_0x1d3d('0x35')](_0x1d3d('0x72'),_0x2abd7e[_0x1d3d('0x1')](_0x1d3d('0x96'),_0x1d3d('0x97'))),!0x0;_0x2abd7e=_0x2abd7e['replace'](/http.?:/i,'');_0x5b909b[_0x1d3d('0x98')](function(_0x384c0a){if(!_0x4ae421[_0x1d3d('0x99')]&&!/(&|\?)qty\=[1-9][0-9]*/gi['test'](_0x2abd7e))return _0x384c0a();var _0x42a567=function(_0x11856d,_0x37c18a){var _0x47fef2=_0x2abd7e[_0x1d3d('0x9a')](/sku\=([0-9]+)/gi),_0x553f42=[];if(_0x1d3d('0x17')===typeof _0x47fef2&&null!==_0x47fef2)for(var _0x15f279=_0x47fef2['length']-0x1;0x0<=_0x15f279;_0x15f279--){var _0x512ffb=parseInt(_0x47fef2[_0x15f279][_0x1d3d('0x1')](/sku\=/gi,''));isNaN(_0x512ffb)||_0x553f42[_0x1d3d('0x9b')](_0x512ffb);}_0x4ae421[_0x1d3d('0x9c')][_0x1d3d('0x28')](this,_0x11856d,_0x37c18a,_0x2abd7e);_0x3901e5['buyButtonClickCallback'][_0x1d3d('0x28')](this,_0x11856d,_0x37c18a,_0x2abd7e,_0x553f42);_0x3901e5[_0x1d3d('0x88')](_0x48562a,_0x2abd7e[_0x1d3d('0x9d')](_0x1d3d('0x9e'))['pop']()[_0x1d3d('0x9d')]('&')['shift']());_0x1d3d('0x9')===typeof _0x4ae421[_0x1d3d('0x9f')]&&_0x4ae421[_0x1d3d('0x9f')]['call'](this);_0x29033a(window)[_0x1d3d('0x60')](_0x1d3d('0xa0'));_0x29033a(window)[_0x1d3d('0x60')]('cartProductAdded.vtex');};_0x4ae421[_0x1d3d('0xa1')]?(_0x42a567(null,_0x1d3d('0x1f')),_0x384c0a()):_0x29033a['ajax']({'url':_0x2abd7e,'complete':_0x42a567})[_0x1d3d('0x21')](function(){_0x384c0a();});});};_0x3901e5[_0x1d3d('0xa2')]=function(_0xeaa0c3,_0x4080a4,_0x459d7,_0x138898){try{'success'===_0x4080a4&&_0x1d3d('0x17')===typeof window['parent']&&'function'===typeof window[_0x1d3d('0xa3')]['_QuatroDigital_prodBuyCallback']&&window['parent']['_QuatroDigital_prodBuyCallback'](_0xeaa0c3,_0x4080a4,_0x459d7,_0x138898);}catch(_0x1c8ad2){_0x328693(_0x1d3d('0xa4'));}};_0x47fef2();'function'===typeof _0x4ae421[_0x1d3d('0x44')]?_0x4ae421[_0x1d3d('0x44')][_0x1d3d('0x28')](this):_0x328693('Callback\x20não\x20é\x20uma\x20função');};var _0xb52fd1=_0x29033a[_0x1d3d('0x69')]();_0x29033a['fn'][_0x1d3d('0xa5')]=function(_0xb0143,_0x30d6e7){var _0x328032=_0x29033a(this);_0x1d3d('0x3')!==typeof _0x30d6e7||'object'!==typeof _0xb0143||_0xb0143 instanceof _0x29033a||(_0x30d6e7=_0xb0143,_0xb0143=void 0x0);_0x4ae421=_0x29033a[_0x1d3d('0x15')]({},_0x300ce9,_0x30d6e7);var _0x317bc9;_0xb52fd1[_0x1d3d('0x30')](function(){_0x328032[_0x1d3d('0x81')](_0x1d3d('0xa6'))[_0x1d3d('0x7')]||_0x328032[_0x1d3d('0xa7')](_0x1d3d('0xa8'));_0x317bc9=new _0x29033a[(_0x1d3d('0xa5'))](_0x328032,_0xb0143);});_0xb52fd1['fire']();_0x29033a(window)['on'](_0x1d3d('0xa9'),function(_0x38ee45,_0x21ae7c,_0x111088){_0x317bc9[_0x1d3d('0x88')](_0x21ae7c,_0x111088);});return _0x29033a['extend'](_0x328032,_0x317bc9);};var _0x5c97a7=0x0;_0x29033a(document)[_0x1d3d('0xaa')](function(_0x6b51c4,_0x3fde9e,_0x531000){-0x1<_0x531000['url'][_0x1d3d('0xf')]()[_0x1d3d('0xab')](_0x1d3d('0xac'))&&(_0x5c97a7=(_0x531000[_0x1d3d('0x1a')]['match'](/sku\=([0-9]+)/i)||[''])['pop']());});_0x29033a(window)[_0x1d3d('0x90')](_0x1d3d('0xad'),function(){_0x29033a(window)[_0x1d3d('0x60')](_0x1d3d('0xa9'),[new _0x29033a(),_0x5c97a7]);});_0x29033a(document)[_0x1d3d('0xae')](function(){_0xb52fd1[_0x1d3d('0x45')]();});}catch(_0x26e1e7){_0x1d3d('0x3')!==typeof console&&_0x1d3d('0x9')===typeof console[_0x1d3d('0x14')]&&console[_0x1d3d('0x14')](_0x1d3d('0xaf'),_0x26e1e7);}}(this));function qd_number_format(_0x289842,_0x4e0b5c,_0x466fd9,_0x4ab3a1){_0x289842=(_0x289842+'')[_0x1d3d('0x1')](/[^0-9+\-Ee.]/g,'');_0x289842=isFinite(+_0x289842)?+_0x289842:0x0;_0x4e0b5c=isFinite(+_0x4e0b5c)?Math[_0x1d3d('0x2')](_0x4e0b5c):0x0;_0x4ab3a1=_0x1d3d('0x3')===typeof _0x4ab3a1?',':_0x4ab3a1;_0x466fd9=_0x1d3d('0x3')===typeof _0x466fd9?'.':_0x466fd9;var _0xace0d5='',_0xace0d5=function(_0x19567b,_0xe9e6b4){var _0x3fafc4=Math['pow'](0xa,_0xe9e6b4);return''+(Math[_0x1d3d('0x5')](_0x19567b*_0x3fafc4)/_0x3fafc4)[_0x1d3d('0x6')](_0xe9e6b4);},_0xace0d5=(_0x4e0b5c?_0xace0d5(_0x289842,_0x4e0b5c):''+Math[_0x1d3d('0x5')](_0x289842))[_0x1d3d('0x9d')]('.');0x3<_0xace0d5[0x0][_0x1d3d('0x7')]&&(_0xace0d5[0x0]=_0xace0d5[0x0][_0x1d3d('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x4ab3a1));(_0xace0d5[0x1]||'')[_0x1d3d('0x7')]<_0x4e0b5c&&(_0xace0d5[0x1]=_0xace0d5[0x1]||'',_0xace0d5[0x1]+=Array(_0x4e0b5c-_0xace0d5[0x1][_0x1d3d('0x7')]+0x1)[_0x1d3d('0x8')]('0'));return _0xace0d5[_0x1d3d('0x8')](_0x466fd9);}(function(){try{window[_0x1d3d('0x39')]=window[_0x1d3d('0x39')]||{},window['_QuatroDigital_CartData']['callback']=window[_0x1d3d('0x39')]['callback']||$[_0x1d3d('0x69')]();}catch(_0x24eb8e){_0x1d3d('0x3')!==typeof console&&'function'===typeof console['error']&&console[_0x1d3d('0x14')]('Oooops!\x20',_0x24eb8e[_0x1d3d('0x23')]);}}());(function(_0x43d8f9){try{var _0x131c70=jQuery,_0x142ac1=function(_0x381fb4,_0x56dbaa){if(_0x1d3d('0x17')===typeof console&&'undefined'!==typeof console[_0x1d3d('0x14')]&&_0x1d3d('0x3')!==typeof console[_0x1d3d('0x2f')]&&_0x1d3d('0x3')!==typeof console[_0x1d3d('0x2e')]){var _0x498691;_0x1d3d('0x17')===typeof _0x381fb4?(_0x381fb4[_0x1d3d('0xb0')](_0x1d3d('0xb1')),_0x498691=_0x381fb4):_0x498691=['[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'+_0x381fb4];if(_0x1d3d('0x3')===typeof _0x56dbaa||_0x1d3d('0x2c')!==_0x56dbaa[_0x1d3d('0xf')]()&&'aviso'!==_0x56dbaa[_0x1d3d('0xf')]())if(_0x1d3d('0x3')!==typeof _0x56dbaa&&_0x1d3d('0x2f')===_0x56dbaa[_0x1d3d('0xf')]())try{console[_0x1d3d('0x2f')][_0x1d3d('0x6c')](console,_0x498691);}catch(_0x50efc7){try{console['info'](_0x498691[_0x1d3d('0x8')]('\x0a'));}catch(_0x537a4d){}}else try{console[_0x1d3d('0x14')][_0x1d3d('0x6c')](console,_0x498691);}catch(_0x548a3e){try{console[_0x1d3d('0x14')](_0x498691[_0x1d3d('0x8')]('\x0a'));}catch(_0x4f0b45){}}else try{console[_0x1d3d('0x2e')]['apply'](console,_0x498691);}catch(_0x4bb499){try{console[_0x1d3d('0x2e')](_0x498691[_0x1d3d('0x8')]('\x0a'));}catch(_0x4dc7b4){}}}};window[_0x1d3d('0x5a')]=window[_0x1d3d('0x5a')]||{};window[_0x1d3d('0x5a')][_0x1d3d('0x8e')]=!0x0;_0x131c70['QD_dropDownCart']=function(){};_0x131c70['fn'][_0x1d3d('0xb2')]=function(){return{'fn':new _0x131c70()};};var _0x387651=function(_0x142bb3){var _0x41c2be={'t':'nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x52b407){var _0x5ec3dd=function(_0x277e96){return _0x277e96;};var _0x1437cf=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x52b407=_0x52b407['d'+_0x1437cf[0x10]+'c'+_0x1437cf[0x11]+'m'+_0x5ec3dd(_0x1437cf[0x1])+'n'+_0x1437cf[0xd]]['l'+_0x1437cf[0x12]+'c'+_0x1437cf[0x0]+'ti'+_0x5ec3dd('o')+'n'];var _0x4d3b3d=function(_0x1e26a8){return escape(encodeURIComponent(_0x1e26a8[_0x1d3d('0x1')](/\./g,'¨')[_0x1d3d('0x1')](/[a-zA-Z]/g,function(_0x346445){return String['fromCharCode'](('Z'>=_0x346445?0x5a:0x7a)>=(_0x346445=_0x346445[_0x1d3d('0xb3')](0x0)+0xd)?_0x346445:_0x346445-0x1a);})));};var _0x43d8f9=_0x4d3b3d(_0x52b407[[_0x1437cf[0x9],_0x5ec3dd('o'),_0x1437cf[0xc],_0x1437cf[_0x5ec3dd(0xd)]][_0x1d3d('0x8')]('')]);_0x4d3b3d=_0x4d3b3d((window[['js',_0x5ec3dd('no'),'m',_0x1437cf[0x1],_0x1437cf[0x4][_0x1d3d('0xe')](),_0x1d3d('0xb4')][_0x1d3d('0x8')]('')]||_0x1d3d('0xb5'))+['.v',_0x1437cf[0xd],'e',_0x5ec3dd('x'),'co',_0x5ec3dd('mm'),_0x1d3d('0xb6'),_0x1437cf[0x1],'.c',_0x5ec3dd('o'),'m.',_0x1437cf[0x13],'r'][_0x1d3d('0x8')](''));for(var _0x2a3e5c in _0x41c2be){if(_0x4d3b3d===_0x2a3e5c+_0x41c2be[_0x2a3e5c]||_0x43d8f9===_0x2a3e5c+_0x41c2be[_0x2a3e5c]){var _0x354902='tr'+_0x1437cf[0x11]+'e';break;}_0x354902='f'+_0x1437cf[0x0]+'ls'+_0x5ec3dd(_0x1437cf[0x1])+'';}_0x5ec3dd=!0x1;-0x1<_0x52b407[[_0x1437cf[0xc],'e',_0x1437cf[0x0],'rc',_0x1437cf[0x9]][_0x1d3d('0x8')]('')][_0x1d3d('0xab')](_0x1d3d('0xb7'))&&(_0x5ec3dd=!0x0);return[_0x354902,_0x5ec3dd];}(_0x142bb3);}(window);if(!eval(_0x387651[0x0]))return _0x387651[0x1]?_0x142ac1('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x131c70[_0x1d3d('0xb2')]=function(_0xdfaa13,_0x101c59){var _0x15e0d9=_0x131c70(_0xdfaa13);if(!_0x15e0d9[_0x1d3d('0x7')])return _0x15e0d9;var _0xfb80e9=_0x131c70['extend'](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x1d3d('0xb8'),'linkCheckout':'Finalizar\x20Compra','cartTotal':_0x1d3d('0xb9'),'emptyCart':_0x1d3d('0xba'),'continueShopping':'Continuar\x20Comprando','shippingForm':'<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x500678){return _0x500678[_0x1d3d('0xbb')]||_0x500678[_0x1d3d('0xbc')];},'callback':function(){},'callbackProductsList':function(){}},_0x101c59);_0x131c70('');var _0x242dd0=this;if(_0xfb80e9[_0x1d3d('0x59')]){var _0x5707ca=!0x1;_0x1d3d('0x3')===typeof window[_0x1d3d('0x67')]&&(_0x142ac1('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN'),_0x131c70[_0x1d3d('0x1d')]({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':!0x1,'dataType':'script','error':function(){_0x142ac1(_0x1d3d('0xbd'));_0x5707ca=!0x0;}}));if(_0x5707ca)return _0x142ac1(_0x1d3d('0xbe'));}if('object'===typeof window['vtexjs']&&'undefined'!==typeof window[_0x1d3d('0x67')][_0x1d3d('0x27')])var _0x1a5657=window[_0x1d3d('0x67')][_0x1d3d('0x27')];else if(_0x1d3d('0x17')===typeof vtex&&_0x1d3d('0x17')===typeof vtex[_0x1d3d('0x27')]&&'undefined'!==typeof vtex[_0x1d3d('0x27')][_0x1d3d('0x5c')])_0x1a5657=new vtex['checkout'][(_0x1d3d('0x5c'))]();else return _0x142ac1(_0x1d3d('0xbf'));_0x242dd0['cartContainer']=_0x1d3d('0xc0');var _0x4a8618=function(_0x5f1e78){_0x131c70(this)[_0x1d3d('0x82')](_0x5f1e78);_0x5f1e78[_0x1d3d('0xc1')]('.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose')['add'](_0x131c70(_0x1d3d('0xc2')))['on'](_0x1d3d('0xc3'),function(){_0x15e0d9[_0x1d3d('0x8b')]('qd-bb-lightBoxProdAdd');_0x131c70(document[_0x1d3d('0x6f')])['removeClass']('qd-bb-lightBoxBodyProdAdd');});_0x131c70(document)[_0x1d3d('0xc4')](_0x1d3d('0xc5'))['on'](_0x1d3d('0xc5'),function(_0x1f9039){0x1b==_0x1f9039['keyCode']&&(_0x15e0d9[_0x1d3d('0x8b')](_0x1d3d('0xc6')),_0x131c70(document[_0x1d3d('0x6f')])[_0x1d3d('0x8b')](_0x1d3d('0x8a')));});var _0x8b6130=_0x5f1e78['find']('.qd-ddc-prodWrapper');_0x5f1e78[_0x1d3d('0xc1')](_0x1d3d('0xc7'))['on'](_0x1d3d('0xc8'),function(){_0x242dd0['scrollCart']('-',void 0x0,void 0x0,_0x8b6130);return!0x1;});_0x5f1e78[_0x1d3d('0xc1')](_0x1d3d('0xc9'))['on'](_0x1d3d('0xca'),function(){_0x242dd0[_0x1d3d('0xcb')](void 0x0,void 0x0,void 0x0,_0x8b6130);return!0x1;});_0x5f1e78[_0x1d3d('0xc1')]('.qd-ddc-shipping\x20input')[_0x1d3d('0xcc')]('')['on'](_0x1d3d('0xcd'),function(){_0x242dd0[_0x1d3d('0xce')](_0x131c70(this));});if(_0xfb80e9[_0x1d3d('0xcf')]){var _0x101c59=0x0;_0x131c70(this)['on'](_0x1d3d('0xd0'),function(){var _0x5f1e78=function(){window['_QuatroDigital_DropDown'][_0x1d3d('0x8e')]&&(_0x242dd0[_0x1d3d('0x8c')](),window[_0x1d3d('0x5a')]['allowUpdate']=!0x1,_0x131c70['fn'][_0x1d3d('0x2b')](!0x0),_0x242dd0['cartIsEmpty']());};_0x101c59=setInterval(function(){_0x5f1e78();},0x258);_0x5f1e78();});_0x131c70(this)['on'](_0x1d3d('0xd1'),function(){clearInterval(_0x101c59);});}};var _0x219b6f=function(_0x3c1713){_0x3c1713=_0x131c70(_0x3c1713);_0xfb80e9[_0x1d3d('0xd2')][_0x1d3d('0x53')]=_0xfb80e9[_0x1d3d('0xd2')][_0x1d3d('0x53')][_0x1d3d('0x1')]('#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>');_0xfb80e9[_0x1d3d('0xd2')][_0x1d3d('0x53')]=_0xfb80e9[_0x1d3d('0xd2')][_0x1d3d('0x53')][_0x1d3d('0x1')](_0x1d3d('0xd3'),_0x1d3d('0xd4'));_0xfb80e9['texts']['cartTotal']=_0xfb80e9['texts'][_0x1d3d('0x53')][_0x1d3d('0x1')](_0x1d3d('0xd5'),_0x1d3d('0xd6'));_0xfb80e9['texts']['cartTotal']=_0xfb80e9[_0x1d3d('0xd2')]['cartTotal'][_0x1d3d('0x1')](_0x1d3d('0xd7'),_0x1d3d('0xd8'));_0x3c1713[_0x1d3d('0xc1')](_0x1d3d('0xd9'))[_0x1d3d('0x4e')](_0xfb80e9[_0x1d3d('0xd2')][_0x1d3d('0xda')]);_0x3c1713[_0x1d3d('0xc1')](_0x1d3d('0xdb'))[_0x1d3d('0x4e')](_0xfb80e9[_0x1d3d('0xd2')]['continueShopping']);_0x3c1713[_0x1d3d('0xc1')]('.qd-ddc-checkout')['html'](_0xfb80e9[_0x1d3d('0xd2')][_0x1d3d('0xdc')]);_0x3c1713['find'](_0x1d3d('0xdd'))[_0x1d3d('0x4e')](_0xfb80e9[_0x1d3d('0xd2')][_0x1d3d('0x53')]);_0x3c1713[_0x1d3d('0xc1')](_0x1d3d('0xde'))['html'](_0xfb80e9[_0x1d3d('0xd2')][_0x1d3d('0xdf')]);_0x3c1713['find'](_0x1d3d('0xe0'))['html'](_0xfb80e9[_0x1d3d('0xd2')][_0x1d3d('0x56')]);return _0x3c1713;}(this[_0x1d3d('0xe1')]);var _0x5eb900=0x0;_0x15e0d9[_0x1d3d('0x36')](function(){0x0<_0x5eb900?_0x4a8618['call'](this,_0x219b6f[_0x1d3d('0xe2')]()):_0x4a8618[_0x1d3d('0x28')](this,_0x219b6f);_0x5eb900++;});window['_QuatroDigital_CartData'][_0x1d3d('0x44')][_0x1d3d('0x30')](function(){_0x131c70(_0x1d3d('0xe3'))['html'](window[_0x1d3d('0x39')][_0x1d3d('0x3c')]||'--');_0x131c70(_0x1d3d('0xe4'))[_0x1d3d('0x4e')](window[_0x1d3d('0x39')][_0x1d3d('0x40')]||'0');_0x131c70(_0x1d3d('0xe5'))[_0x1d3d('0x4e')](window[_0x1d3d('0x39')][_0x1d3d('0x3e')]||'--');_0x131c70(_0x1d3d('0xe6'))[_0x1d3d('0x4e')](window[_0x1d3d('0x39')][_0x1d3d('0x3f')]||'--');});var _0x1c2375=function(_0x766655,_0x88de2e){if(_0x1d3d('0x3')===typeof _0x766655['items'])return _0x142ac1(_0x1d3d('0xe7'));_0x242dd0[_0x1d3d('0xe8')][_0x1d3d('0x28')](this,_0x88de2e);};_0x242dd0[_0x1d3d('0x8c')]=function(_0x43d10f,_0x1cbed9){_0x1d3d('0x3')!=typeof _0x1cbed9?window[_0x1d3d('0x5a')][_0x1d3d('0xe9')]=_0x1cbed9:window[_0x1d3d('0x5a')][_0x1d3d('0xe9')]&&(_0x1cbed9=window[_0x1d3d('0x5a')]['dataOptionsCache']);setTimeout(function(){window[_0x1d3d('0x5a')][_0x1d3d('0xe9')]=void 0x0;},_0xfb80e9[_0x1d3d('0xea')]);_0x131c70(_0x1d3d('0xeb'))[_0x1d3d('0x8b')]('qd-ddc-prodLoaded');if(_0xfb80e9['smartCheckout']){var _0x101c59=function(_0x5ef55d){window[_0x1d3d('0x5a')][_0x1d3d('0x5b')]=_0x5ef55d;_0x1c2375(_0x5ef55d,_0x1cbed9);_0x1d3d('0x3')!==typeof window[_0x1d3d('0xec')]&&_0x1d3d('0x9')===typeof window[_0x1d3d('0xec')][_0x1d3d('0xed')]&&window[_0x1d3d('0xec')][_0x1d3d('0xed')][_0x1d3d('0x28')](this);_0x131c70(_0x1d3d('0xeb'))['addClass'](_0x1d3d('0xee'));};'undefined'!==typeof window['_QuatroDigital_DropDown'][_0x1d3d('0x5b')]?(_0x101c59(window[_0x1d3d('0x5a')]['getOrderForm']),_0x1d3d('0x9')===typeof _0x43d10f&&_0x43d10f(window[_0x1d3d('0x5a')][_0x1d3d('0x5b')])):_0x131c70['QD_checkoutQueue']([_0x1d3d('0x42'),_0x1d3d('0x3a'),'shippingData'],{'done':function(_0x45ca7b){_0x101c59['call'](this,_0x45ca7b);'function'===typeof _0x43d10f&&_0x43d10f(_0x45ca7b);},'fail':function(_0x15c3fe){_0x142ac1(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0x15c3fe]);}});}else alert(_0x1d3d('0xef'));};_0x242dd0['cartIsEmpty']=function(){var _0x5e020c=_0x131c70(_0x1d3d('0xeb'));_0x5e020c['find'](_0x1d3d('0xf0'))['length']?_0x5e020c['removeClass'](_0x1d3d('0xf1')):_0x5e020c['addClass'](_0x1d3d('0xf1'));};_0x242dd0['renderProductsList']=function(_0x3e9bcc){var _0x101c59=_0x131c70(_0x1d3d('0xf2'));_0x101c59[_0x1d3d('0xf3')]();_0x101c59['each'](function(){var _0x101c59=_0x131c70(this),_0xdfaa13,_0x168f34,_0x19fa54=_0x131c70(''),_0x788e77;for(_0x788e77 in window[_0x1d3d('0x5a')][_0x1d3d('0x5b')][_0x1d3d('0x42')])if(_0x1d3d('0x17')===typeof window[_0x1d3d('0x5a')][_0x1d3d('0x5b')][_0x1d3d('0x42')][_0x788e77]){var _0x595051=window[_0x1d3d('0x5a')][_0x1d3d('0x5b')][_0x1d3d('0x42')][_0x788e77];var _0x416817=_0x595051[_0x1d3d('0xf4')][_0x1d3d('0x1')](/^\/|\/$/g,'')[_0x1d3d('0x9d')]('/');var _0x4c14d2=_0x131c70(_0x1d3d('0xf5'));_0x4c14d2['attr']({'data-sku':_0x595051['id'],'data-sku-index':_0x788e77,'data-qd-departament':_0x416817[0x0],'data-qd-category':_0x416817[_0x416817[_0x1d3d('0x7')]-0x1]});_0x4c14d2['addClass'](_0x1d3d('0xf6')+_0x595051[_0x1d3d('0xf7')]);_0x4c14d2[_0x1d3d('0xc1')](_0x1d3d('0xf8'))['append'](_0xfb80e9[_0x1d3d('0xbb')](_0x595051));_0x4c14d2[_0x1d3d('0xc1')](_0x1d3d('0xf9'))[_0x1d3d('0x82')](isNaN(_0x595051['sellingPrice'])?_0x595051[_0x1d3d('0xfa')]:0x0==_0x595051[_0x1d3d('0xfa')]?_0x1d3d('0xfb'):(_0x131c70(_0x1d3d('0xfc'))[_0x1d3d('0x35')](_0x1d3d('0xfd'))||'R$')+'\x20'+qd_number_format(_0x595051[_0x1d3d('0xfa')]/0x64,0x2,',','.'));_0x4c14d2['find'](_0x1d3d('0xfe'))[_0x1d3d('0x35')]({'data-sku':_0x595051['id'],'data-sku-index':_0x788e77})[_0x1d3d('0xcc')](_0x595051[_0x1d3d('0x43')]);_0x4c14d2[_0x1d3d('0xc1')]('.qd-ddc-remove')[_0x1d3d('0x35')]({'data-sku':_0x595051['id'],'data-sku-index':_0x788e77});_0x242dd0[_0x1d3d('0xff')](_0x595051['id'],_0x4c14d2[_0x1d3d('0xc1')](_0x1d3d('0x100')),_0x595051[_0x1d3d('0x101')]);_0x4c14d2[_0x1d3d('0xc1')]('.qd-ddc-quantityMore,.qd-ddc-quantityMinus')[_0x1d3d('0x35')]({'data-sku':_0x595051['id'],'data-sku-index':_0x788e77});_0x4c14d2[_0x1d3d('0x102')](_0x101c59);_0x19fa54=_0x19fa54[_0x1d3d('0x30')](_0x4c14d2);}try{var _0x7fe349=_0x101c59['getParent'](_0x1d3d('0xeb'))['find']('.qd-ddc-shipping\x20input');_0x7fe349['length']&&''==_0x7fe349['val']()&&window['_QuatroDigital_DropDown'][_0x1d3d('0x5b')]['shippingData'][_0x1d3d('0x103')]&&_0x7fe349[_0x1d3d('0xcc')](window[_0x1d3d('0x5a')][_0x1d3d('0x5b')][_0x1d3d('0x5e')][_0x1d3d('0x103')]['postalCode']);}catch(_0x36c17e){_0x142ac1('Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20'+_0x36c17e[_0x1d3d('0x23')],_0x1d3d('0x6b'));}_0x242dd0[_0x1d3d('0x104')](_0x101c59);_0x242dd0['cartIsEmpty']();_0x3e9bcc&&_0x3e9bcc[_0x1d3d('0x105')]&&function(){_0x168f34=_0x19fa54['filter'](_0x1d3d('0x106')+_0x3e9bcc[_0x1d3d('0x105')]+'\x27]');_0x168f34[_0x1d3d('0x7')]&&(_0xdfaa13=0x0,_0x19fa54[_0x1d3d('0x36')](function(){var _0x3e9bcc=_0x131c70(this);if(_0x3e9bcc['is'](_0x168f34))return!0x1;_0xdfaa13+=_0x3e9bcc[_0x1d3d('0x107')]();}),_0x242dd0[_0x1d3d('0xcb')](void 0x0,void 0x0,_0xdfaa13,_0x101c59['add'](_0x101c59['parent']())),_0x19fa54['removeClass']('qd-ddc-lastAddedFixed'),function(_0x10eb55){_0x10eb55['addClass'](_0x1d3d('0x108'));_0x10eb55[_0x1d3d('0x57')]('qd-ddc-lastAddedFixed');setTimeout(function(){_0x10eb55[_0x1d3d('0x8b')]('qd-ddc-lastAdded');},_0xfb80e9[_0x1d3d('0xea')]);}(_0x168f34));}();});(function(){_QuatroDigital_DropDown[_0x1d3d('0x5b')][_0x1d3d('0x42')][_0x1d3d('0x7')]?(_0x131c70(_0x1d3d('0x6f'))['removeClass']('qd-ddc-cart-empty')[_0x1d3d('0x57')]('qd-ddc-cart-rendered\x20qd-ddc-product-add-time'),setTimeout(function(){_0x131c70(_0x1d3d('0x6f'))[_0x1d3d('0x8b')](_0x1d3d('0x109'));},_0xfb80e9[_0x1d3d('0xea')])):_0x131c70(_0x1d3d('0x6f'))['removeClass']('qd-ddc-cart-rendered')['addClass'](_0x1d3d('0x10a'));}());_0x1d3d('0x9')===typeof _0xfb80e9[_0x1d3d('0x10b')]?_0xfb80e9[_0x1d3d('0x10b')][_0x1d3d('0x28')](this):_0x142ac1(_0x1d3d('0x10c'));};_0x242dd0[_0x1d3d('0xff')]=function(_0x1019f6,_0x1a5bf5,_0x395672){function _0x37fb62(){_0x1a5bf5[_0x1d3d('0x8b')](_0x1d3d('0x10d'))['load'](function(){_0x131c70(this)['addClass'](_0x1d3d('0x10d'));})[_0x1d3d('0x35')](_0x1d3d('0x10e'),_0x395672);}_0x395672?_0x37fb62():isNaN(_0x1019f6)?_0x142ac1(_0x1d3d('0x10f'),'alerta'):alert('Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.');};_0x242dd0['actionButtons']=function(_0x200588){var _0x3e4900=function(_0x135b6b,_0x3316df){var _0x101c59=_0x131c70(_0x135b6b);var _0x47642e=_0x101c59[_0x1d3d('0x35')](_0x1d3d('0x110'));var _0xdfaa13=_0x101c59[_0x1d3d('0x35')](_0x1d3d('0x111'));if(_0x47642e){var _0x13fd81=parseInt(_0x101c59['val']())||0x1;_0x242dd0[_0x1d3d('0x112')]([_0x47642e,_0xdfaa13],_0x13fd81,_0x13fd81+0x1,function(_0x1ca93c){_0x101c59[_0x1d3d('0xcc')](_0x1ca93c);_0x1d3d('0x9')===typeof _0x3316df&&_0x3316df();});}};var _0x101c59=function(_0x279cff,_0x1d9545){var _0x101c59=_0x131c70(_0x279cff);var _0x418c68=_0x101c59[_0x1d3d('0x35')](_0x1d3d('0x110'));var _0xdfaa13=_0x101c59[_0x1d3d('0x35')](_0x1d3d('0x111'));if(_0x418c68){var _0x1e6dc1=parseInt(_0x101c59[_0x1d3d('0xcc')]())||0x2;_0x242dd0[_0x1d3d('0x112')]([_0x418c68,_0xdfaa13],_0x1e6dc1,_0x1e6dc1-0x1,function(_0x5c31f7){_0x101c59['val'](_0x5c31f7);_0x1d3d('0x9')===typeof _0x1d9545&&_0x1d9545();});}};var _0x31070e=function(_0x232c3f,_0x268335){var _0x101c59=_0x131c70(_0x232c3f);var _0x1e409c=_0x101c59[_0x1d3d('0x35')](_0x1d3d('0x110'));var _0xdfaa13=_0x101c59[_0x1d3d('0x35')](_0x1d3d('0x111'));if(_0x1e409c){var _0x355238=parseInt(_0x101c59['val']())||0x1;_0x242dd0[_0x1d3d('0x112')]([_0x1e409c,_0xdfaa13],0x1,_0x355238,function(_0xef1b9d){_0x101c59[_0x1d3d('0xcc')](_0xef1b9d);_0x1d3d('0x9')===typeof _0x268335&&_0x268335();});}};var _0xdfaa13=_0x200588['find']('.qd-ddc-prodQttWrapper:not(.qd_on)');_0xdfaa13[_0x1d3d('0x57')](_0x1d3d('0x113'))[_0x1d3d('0x36')](function(){var _0x200588=_0x131c70(this);_0x200588[_0x1d3d('0xc1')]('.qd-ddc-quantityMore')['on'](_0x1d3d('0x114'),function(_0x56c7f8){_0x56c7f8[_0x1d3d('0x79')]();_0xdfaa13[_0x1d3d('0x57')](_0x1d3d('0x115'));_0x3e4900(_0x200588[_0x1d3d('0xc1')](_0x1d3d('0xfe')),function(){_0xdfaa13[_0x1d3d('0x8b')](_0x1d3d('0x115'));});});_0x200588[_0x1d3d('0xc1')](_0x1d3d('0x116'))['on'](_0x1d3d('0x117'),function(_0x1f8c25){_0x1f8c25['preventDefault']();_0xdfaa13[_0x1d3d('0x57')](_0x1d3d('0x115'));_0x101c59(_0x200588[_0x1d3d('0xc1')](_0x1d3d('0xfe')),function(){_0xdfaa13[_0x1d3d('0x8b')]('qd-loading');});});_0x200588[_0x1d3d('0xc1')](_0x1d3d('0xfe'))['on']('focusout.qd_ddc_change',function(){_0xdfaa13[_0x1d3d('0x57')](_0x1d3d('0x115'));_0x31070e(this,function(){_0xdfaa13[_0x1d3d('0x8b')]('qd-loading');});});_0x200588[_0x1d3d('0xc1')](_0x1d3d('0xfe'))['on'](_0x1d3d('0x118'),function(_0x33b942){0xd==_0x33b942[_0x1d3d('0x119')]&&(_0xdfaa13[_0x1d3d('0x57')](_0x1d3d('0x115')),_0x31070e(this,function(){_0xdfaa13[_0x1d3d('0x8b')](_0x1d3d('0x115'));}));});});_0x200588[_0x1d3d('0xc1')](_0x1d3d('0xf0'))[_0x1d3d('0x36')](function(){var _0x200588=_0x131c70(this);_0x200588['find'](_0x1d3d('0x11a'))['on'](_0x1d3d('0x11b'),function(){_0x200588[_0x1d3d('0x57')]('qd-loading');_0x242dd0[_0x1d3d('0x11c')](_0x131c70(this),function(_0x273cb1){_0x273cb1?_0x200588[_0x1d3d('0x11d')](!0x0)['slideUp'](function(){_0x200588[_0x1d3d('0x11e')]();_0x242dd0[_0x1d3d('0x11f')]();}):_0x200588[_0x1d3d('0x8b')](_0x1d3d('0x115'));});return!0x1;});});};_0x242dd0[_0x1d3d('0xce')]=function(_0x166a08){var _0x13077f=_0x166a08[_0x1d3d('0xcc')](),_0x13077f=_0x13077f[_0x1d3d('0x1')](/[^0-9\-]/g,''),_0x13077f=_0x13077f[_0x1d3d('0x1')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3'),_0x13077f=_0x13077f[_0x1d3d('0x1')](/(.{9}).*/g,'$1');_0x166a08[_0x1d3d('0xcc')](_0x13077f);0x9<=_0x13077f[_0x1d3d('0x7')]&&(_0x166a08['data'](_0x1d3d('0x120'))!=_0x13077f&&_0x1a5657[_0x1d3d('0x121')]({'postalCode':_0x13077f,'country':_0x1d3d('0x122')})[_0x1d3d('0x1e')](function(_0x32417b){window[_0x1d3d('0x5a')][_0x1d3d('0x5b')]=_0x32417b;_0x242dd0[_0x1d3d('0x8c')]();})[_0x1d3d('0x20')](function(_0x6ebc2a){_0x142ac1([_0x1d3d('0x123'),_0x6ebc2a]);updateCartData();}),_0x166a08[_0x1d3d('0x38')](_0x1d3d('0x120'),_0x13077f));};_0x242dd0['changeQantity']=function(_0xbe520a,_0x2306c4,_0xa81f8b,_0x2b608e){function _0x5911bd(_0x3e7b20){_0x3e7b20=_0x1d3d('0x124')!==typeof _0x3e7b20?!0x1:_0x3e7b20;_0x242dd0[_0x1d3d('0x8c')]();window[_0x1d3d('0x5a')][_0x1d3d('0x8e')]=!0x1;_0x242dd0[_0x1d3d('0x11f')]();_0x1d3d('0x3')!==typeof window[_0x1d3d('0xec')]&&_0x1d3d('0x9')===typeof window[_0x1d3d('0xec')][_0x1d3d('0xed')]&&window[_0x1d3d('0xec')][_0x1d3d('0xed')][_0x1d3d('0x28')](this);_0x1d3d('0x9')===typeof adminCart&&adminCart();_0x131c70['fn'][_0x1d3d('0x2b')](!0x0,void 0x0,_0x3e7b20);_0x1d3d('0x9')===typeof _0x2b608e&&_0x2b608e(_0x2306c4);}_0xa81f8b=_0xa81f8b||0x1;if(0x1>_0xa81f8b)return _0x2306c4;if(_0xfb80e9[_0x1d3d('0x59')]){if(_0x1d3d('0x3')===typeof window[_0x1d3d('0x5a')][_0x1d3d('0x5b')][_0x1d3d('0x42')][_0xbe520a[0x1]])return _0x142ac1(_0x1d3d('0x125')+_0xbe520a[0x1]+']'),_0x2306c4;window['_QuatroDigital_DropDown'][_0x1d3d('0x5b')][_0x1d3d('0x42')][_0xbe520a[0x1]][_0x1d3d('0x43')]=_0xa81f8b;window[_0x1d3d('0x5a')][_0x1d3d('0x5b')][_0x1d3d('0x42')][_0xbe520a[0x1]]['index']=_0xbe520a[0x1];_0x1a5657[_0x1d3d('0x126')]([window[_0x1d3d('0x5a')][_0x1d3d('0x5b')][_0x1d3d('0x42')][_0xbe520a[0x1]]],[_0x1d3d('0x42'),_0x1d3d('0x3a'),_0x1d3d('0x5e')])[_0x1d3d('0x1e')](function(_0x198cb6){window[_0x1d3d('0x5a')][_0x1d3d('0x5b')]=_0x198cb6;_0x5911bd(!0x0);})[_0x1d3d('0x20')](function(_0x9c84ea){_0x142ac1([_0x1d3d('0x127'),_0x9c84ea]);_0x5911bd();});}else _0x142ac1(_0x1d3d('0x128'));};_0x242dd0[_0x1d3d('0x11c')]=function(_0x34a704,_0x5e8fec){function _0x435e19(_0x33e73c){_0x33e73c=_0x1d3d('0x124')!==typeof _0x33e73c?!0x1:_0x33e73c;'undefined'!==typeof window[_0x1d3d('0xec')]&&_0x1d3d('0x9')===typeof window[_0x1d3d('0xec')]['exec']&&window[_0x1d3d('0xec')][_0x1d3d('0xed')]['call'](this);_0x1d3d('0x9')===typeof adminCart&&adminCart();_0x131c70['fn']['simpleCart'](!0x0,void 0x0,_0x33e73c);_0x1d3d('0x9')===typeof _0x5e8fec&&_0x5e8fec(_0xdfaa13);}var _0xdfaa13=!0x1,_0x350d53=_0x131c70(_0x34a704)[_0x1d3d('0x35')](_0x1d3d('0x111'));if(_0xfb80e9['smartCheckout']){if('undefined'===typeof window['_QuatroDigital_DropDown'][_0x1d3d('0x5b')]['items'][_0x350d53])return _0x142ac1(_0x1d3d('0x125')+_0x350d53+']'),_0xdfaa13;window[_0x1d3d('0x5a')]['getOrderForm'][_0x1d3d('0x42')][_0x350d53][_0x1d3d('0x129')]=_0x350d53;_0x1a5657[_0x1d3d('0x12a')]([window['_QuatroDigital_DropDown'][_0x1d3d('0x5b')]['items'][_0x350d53]],[_0x1d3d('0x42'),_0x1d3d('0x3a'),_0x1d3d('0x5e')])[_0x1d3d('0x1e')](function(_0x2ed1f5){_0xdfaa13=!0x0;window[_0x1d3d('0x5a')][_0x1d3d('0x5b')]=_0x2ed1f5;_0x1c2375(_0x2ed1f5);_0x435e19(!0x0);})['fail'](function(_0x4f02d8){_0x142ac1([_0x1d3d('0x12b'),_0x4f02d8]);_0x435e19();});}else alert(_0x1d3d('0x12c'));};_0x242dd0[_0x1d3d('0xcb')]=function(_0x2580d4,_0x631250,_0x274aed,_0x1dd12b){_0x1dd12b=_0x1dd12b||_0x131c70('.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2');_0x2580d4=_0x2580d4||'+';_0x631250=_0x631250||0.9*_0x1dd12b[_0x1d3d('0x12d')]();_0x1dd12b[_0x1d3d('0x11d')](!0x0,!0x0)[_0x1d3d('0x12e')]({'scrollTop':isNaN(_0x274aed)?_0x2580d4+'='+_0x631250+'px':_0x274aed});};_0xfb80e9[_0x1d3d('0xcf')]||(_0x242dd0[_0x1d3d('0x8c')](),_0x131c70['fn'][_0x1d3d('0x2b')](!0x0));_0x131c70(window)['on'](_0x1d3d('0x12f'),function(){try{window[_0x1d3d('0x5a')][_0x1d3d('0x5b')]=void 0x0,_0x242dd0[_0x1d3d('0x8c')]();}catch(_0x52c2f8){_0x142ac1(_0x1d3d('0x130')+_0x52c2f8[_0x1d3d('0x23')],'avisso');}});_0x1d3d('0x9')===typeof _0xfb80e9[_0x1d3d('0x44')]?_0xfb80e9[_0x1d3d('0x44')]['call'](this):_0x142ac1(_0x1d3d('0x131'));};_0x131c70['fn']['QD_dropDownCart']=function(_0x179b9d){var _0x44e2ea=_0x131c70(this);_0x44e2ea['fn']=new _0x131c70[(_0x1d3d('0xb2'))](this,_0x179b9d);return _0x44e2ea;};}catch(_0x2c5f94){_0x1d3d('0x3')!==typeof console&&'function'===typeof console[_0x1d3d('0x14')]&&console['error'](_0x1d3d('0xaf'),_0x2c5f94);}}(this));(function(_0x7f2ef1){try{var _0x15feaa=jQuery;window[_0x1d3d('0xec')]=window['_QuatroDigital_AmountProduct']||{};window[_0x1d3d('0xec')][_0x1d3d('0x42')]={};window[_0x1d3d('0xec')][_0x1d3d('0x132')]=!0x1;window[_0x1d3d('0xec')]['buyButtonClicked']=!0x1;window[_0x1d3d('0xec')][_0x1d3d('0x133')]=!0x1;var _0x31f6c1=function(){if(window[_0x1d3d('0xec')][_0x1d3d('0x132')]){var _0x66bbab=!0x1;var _0x7f2ef1={};window[_0x1d3d('0xec')]['items']={};for(_0x3c3b35 in window[_0x1d3d('0x5a')]['getOrderForm'][_0x1d3d('0x42')])if(_0x1d3d('0x17')===typeof window[_0x1d3d('0x5a')][_0x1d3d('0x5b')]['items'][_0x3c3b35]){var _0x26aebc=window['_QuatroDigital_DropDown'][_0x1d3d('0x5b')][_0x1d3d('0x42')][_0x3c3b35];_0x1d3d('0x3')!==typeof _0x26aebc[_0x1d3d('0x134')]&&null!==_0x26aebc[_0x1d3d('0x134')]&&''!==_0x26aebc[_0x1d3d('0x134')]&&(window[_0x1d3d('0xec')][_0x1d3d('0x42')]['prod_'+_0x26aebc[_0x1d3d('0x134')]]=window[_0x1d3d('0xec')][_0x1d3d('0x42')][_0x1d3d('0x135')+_0x26aebc[_0x1d3d('0x134')]]||{},window['_QuatroDigital_AmountProduct'][_0x1d3d('0x42')][_0x1d3d('0x135')+_0x26aebc[_0x1d3d('0x134')]][_0x1d3d('0x136')]=_0x26aebc[_0x1d3d('0x134')],_0x7f2ef1[_0x1d3d('0x135')+_0x26aebc[_0x1d3d('0x134')]]||(window['_QuatroDigital_AmountProduct'][_0x1d3d('0x42')][_0x1d3d('0x135')+_0x26aebc[_0x1d3d('0x134')]][_0x1d3d('0x40')]=0x0),window[_0x1d3d('0xec')]['items']['prod_'+_0x26aebc['productId']][_0x1d3d('0x40')]+=_0x26aebc[_0x1d3d('0x43')],_0x66bbab=!0x0,_0x7f2ef1[_0x1d3d('0x135')+_0x26aebc[_0x1d3d('0x134')]]=!0x0);}var _0x3c3b35=_0x66bbab;}else _0x3c3b35=void 0x0;window[_0x1d3d('0xec')][_0x1d3d('0x132')]&&(_0x15feaa(_0x1d3d('0x137'))[_0x1d3d('0x11e')](),_0x15feaa('.qd-bap-item-added')[_0x1d3d('0x8b')](_0x1d3d('0x138')));for(var _0xc8de52 in window['_QuatroDigital_AmountProduct']['items']){_0x26aebc=window[_0x1d3d('0xec')][_0x1d3d('0x42')][_0xc8de52];if(_0x1d3d('0x17')!==typeof _0x26aebc)return;_0x7f2ef1=_0x15feaa(_0x1d3d('0x139')+_0x26aebc[_0x1d3d('0x136')]+']')['getParent']('li');if(window['_QuatroDigital_AmountProduct']['allowRecalculate']||!_0x7f2ef1[_0x1d3d('0xc1')](_0x1d3d('0x137'))[_0x1d3d('0x7')])_0x66bbab=_0x15feaa(_0x1d3d('0x13a')),_0x66bbab[_0x1d3d('0xc1')](_0x1d3d('0x13b'))[_0x1d3d('0x4e')](_0x26aebc[_0x1d3d('0x40')]),_0x26aebc=_0x7f2ef1[_0x1d3d('0xc1')](_0x1d3d('0x13c')),_0x26aebc[_0x1d3d('0x7')]?_0x26aebc[_0x1d3d('0xa7')](_0x66bbab)[_0x1d3d('0x57')](_0x1d3d('0x138')):_0x7f2ef1['prepend'](_0x66bbab);}_0x3c3b35&&(window[_0x1d3d('0xec')][_0x1d3d('0x132')]=!0x1);};window['_QuatroDigital_AmountProduct'][_0x1d3d('0xed')]=function(){window[_0x1d3d('0xec')][_0x1d3d('0x132')]=!0x0;_0x31f6c1[_0x1d3d('0x28')](this);};_0x15feaa(document)['ajaxStop'](function(){_0x31f6c1[_0x1d3d('0x28')](this);});}catch(_0x4490e0){_0x1d3d('0x3')!==typeof console&&_0x1d3d('0x9')===typeof console['error']&&console[_0x1d3d('0x14')](_0x1d3d('0xaf'),_0x4490e0);}}(this));(function(){try{var _0x5d9d81=jQuery,_0xfc7c78,_0x28bdbc={'selector':_0x1d3d('0x13d'),'dropDown':{},'buyButton':{}};_0x5d9d81[_0x1d3d('0x13e')]=function(_0x5e0665){var _0x23543d={};_0xfc7c78=_0x5d9d81[_0x1d3d('0x15')](!0x0,{},_0x28bdbc,_0x5e0665);_0x5e0665=_0x5d9d81(_0xfc7c78[_0x1d3d('0x13f')])[_0x1d3d('0xb2')](_0xfc7c78[_0x1d3d('0x140')]);_0x23543d[_0x1d3d('0x7b')]='undefined'!==typeof _0xfc7c78[_0x1d3d('0x140')][_0x1d3d('0xcf')]&&!0x1===_0xfc7c78['dropDown'][_0x1d3d('0xcf')]?_0x5d9d81(_0xfc7c78[_0x1d3d('0x13f')])[_0x1d3d('0xa5')](_0x5e0665['fn'],_0xfc7c78[_0x1d3d('0x7b')]):_0x5d9d81(_0xfc7c78[_0x1d3d('0x13f')])['QD_buyButton'](_0xfc7c78[_0x1d3d('0x7b')]);_0x23543d[_0x1d3d('0x140')]=_0x5e0665;return _0x23543d;};_0x5d9d81['fn'][_0x1d3d('0x141')]=function(){_0x1d3d('0x17')===typeof console&&_0x1d3d('0x9')===typeof console['info']&&console['info']('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x5d9d81['smartCart']=_0x5d9d81['fn'][_0x1d3d('0x141')];}catch(_0x3c0cac){_0x1d3d('0x3')!==typeof console&&'function'===typeof console['error']&&console[_0x1d3d('0x14')](_0x1d3d('0xaf'),_0x3c0cac);}}());

/* Quatro Digital - Product Thumbs // Carlos Vinicius // Todos os direitos reservados. */
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs();a.trigger("QuatroDigital.pt_callback",[a])}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return a.length?$.extend({},a,new b(a)):a},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0x8262=['join','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','html','?wmode=transparent&rel=0&enablejsapi=1\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>','data','height','stop','fadeTo','addClass','qdpv-video-on','add','animate','find','iframe','a:not(\x27.qd-videoLink\x27)','bind','hide','removeAttr','style','removeClass','.qd-videoItem','call','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','click.playVideo','.ON','controlVideo','.qd-playerWrapper\x20iframe','contentWindow','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','attr','rel','a:not(.qd-videoLink)','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','start','insertThumbsIn','appendTo','load','ImageControl','body','.produto','object','undefined','toLowerCase','warn','[Video\x20in\x20product]\x20','info','error','qdVideoInProduct','extend','td.value-field.Videos:first','http','ul.thumbs','div#image','videoFieldSelector','replace','length','youtube','split','pop','shift','youtu.be','push','be/','<div\x20class=\x22qd-playerWrapper\x22></div>','prependTo','#include','<div\x20class=\x22qd-playerContainer\x22></div>','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt'];(function(_0x4f7097,_0x4f1f93){var _0x9d3a3f=function(_0x4aab9e){while(--_0x4aab9e){_0x4f7097['push'](_0x4f7097['shift']());}};_0x9d3a3f(++_0x4f1f93);}(_0x8262,0xcb));var _0x2826=function(_0x2034ca,_0x21889c){_0x2034ca=_0x2034ca-0x0;var _0x204e33=_0x8262[_0x2034ca];return _0x204e33;};(function(_0x8dae37){$(function(){if($(document[_0x2826('0x0')])['is'](_0x2826('0x1'))){var _0x6c5aae=[];var _0x2f94ab=function(_0x223299,_0x5432c9){_0x2826('0x2')===typeof console&&(_0x2826('0x3')!==typeof _0x5432c9&&'alerta'===_0x5432c9[_0x2826('0x4')]()?console[_0x2826('0x5')](_0x2826('0x6')+_0x223299):_0x2826('0x3')!==typeof _0x5432c9&&_0x2826('0x7')===_0x5432c9[_0x2826('0x4')]()?console[_0x2826('0x7')](_0x2826('0x6')+_0x223299):console[_0x2826('0x8')](_0x2826('0x6')+_0x223299));};window[_0x2826('0x9')]=window[_0x2826('0x9')]||{};var _0x3b5d8a=$[_0x2826('0xa')](!0x0,{'insertThumbsIn':'start','videoFieldSelector':_0x2826('0xb'),'controlVideo':!0x0,'urlProtocol':_0x2826('0xc')},window[_0x2826('0x9')]);var _0xe54940=$(_0x2826('0xd'));var _0x2c7ef8=$(_0x2826('0xe'));var _0x352ce1=$(_0x3b5d8a[_0x2826('0xf')])['text']()[_0x2826('0x10')](/\;\s*/,';')['split'](';');for(var _0x56e5a2=0x0;_0x56e5a2<_0x352ce1[_0x2826('0x11')];_0x56e5a2++)-0x1<_0x352ce1[_0x56e5a2]['indexOf'](_0x2826('0x12'))?_0x6c5aae['push'](_0x352ce1[_0x56e5a2][_0x2826('0x13')]('v=')[_0x2826('0x14')]()['split'](/[&#]/)[_0x2826('0x15')]()):-0x1<_0x352ce1[_0x56e5a2]['indexOf'](_0x2826('0x16'))&&_0x6c5aae[_0x2826('0x17')](_0x352ce1[_0x56e5a2][_0x2826('0x13')](_0x2826('0x18'))[_0x2826('0x14')]()[_0x2826('0x13')](/[\?&#]/)[_0x2826('0x15')]());var _0x1694af=$(_0x2826('0x19'));_0x1694af[_0x2826('0x1a')](_0x2826('0x1b'));_0x1694af['wrap'](_0x2826('0x1c'));_0x352ce1=function(_0x38413e){var _0x3267b6={'t':_0x2826('0x1d')};return function(_0x287a7c){var _0x3de528=function(_0x5e9c13){return _0x5e9c13;};var _0x411a67=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x287a7c=_0x287a7c['d'+_0x411a67[0x10]+'c'+_0x411a67[0x11]+'m'+_0x3de528(_0x411a67[0x1])+'n'+_0x411a67[0xd]]['l'+_0x411a67[0x12]+'c'+_0x411a67[0x0]+'ti'+_0x3de528('o')+'n'];var _0x108876=function(_0x126200){return escape(encodeURIComponent(_0x126200['replace'](/\./g,'¨')[_0x2826('0x10')](/[a-zA-Z]/g,function(_0x4ec612){return String['fromCharCode'](('Z'>=_0x4ec612?0x5a:0x7a)>=(_0x4ec612=_0x4ec612[_0x2826('0x1e')](0x0)+0xd)?_0x4ec612:_0x4ec612-0x1a);})));};var _0x3b7d23=_0x108876(_0x287a7c[[_0x411a67[0x9],_0x3de528('o'),_0x411a67[0xc],_0x411a67[_0x3de528(0xd)]][_0x2826('0x1f')]('')]);_0x108876=_0x108876((window[['js',_0x3de528('no'),'m',_0x411a67[0x1],_0x411a67[0x4][_0x2826('0x20')](),_0x2826('0x21')][_0x2826('0x1f')]('')]||_0x2826('0x22'))+['.v',_0x411a67[0xd],'e',_0x3de528('x'),'co',_0x3de528('mm'),_0x2826('0x23'),_0x411a67[0x1],'.c',_0x3de528('o'),'m.',_0x411a67[0x13],'r']['join'](''));for(var _0x3acf07 in _0x3267b6){if(_0x108876===_0x3acf07+_0x3267b6[_0x3acf07]||_0x3b7d23===_0x3acf07+_0x3267b6[_0x3acf07]){var _0x28a104='tr'+_0x411a67[0x11]+'e';break;}_0x28a104='f'+_0x411a67[0x0]+'ls'+_0x3de528(_0x411a67[0x1])+'';}_0x3de528=!0x1;-0x1<_0x287a7c[[_0x411a67[0xc],'e',_0x411a67[0x0],'rc',_0x411a67[0x9]][_0x2826('0x1f')]('')][_0x2826('0x24')](_0x2826('0x25'))&&(_0x3de528=!0x0);return[_0x28a104,_0x3de528];}(_0x38413e);}(window);if(!eval(_0x352ce1[0x0]))return _0x352ce1[0x1]?_0x2f94ab(_0x2826('0x26')):!0x1;var _0x38a994=function(_0x4448b3,_0x1d9a69){_0x2826('0x12')===_0x1d9a69&&_0x1694af[_0x2826('0x27')]('<iframe\x20src=\x22'+_0x3b5d8a['urlProtocol']+'://www.youtube.com/embed/'+_0x4448b3+_0x2826('0x28'));_0x2c7ef8[_0x2826('0x29')]('height',_0x2c7ef8[_0x2826('0x29')]('height')||_0x2c7ef8[_0x2826('0x2a')]());_0x2c7ef8[_0x2826('0x2b')](!0x0,!0x0)[_0x2826('0x2c')](0x1f4,0x0,function(){$('body')[_0x2826('0x2d')](_0x2826('0x2e'));});_0x1694af['stop'](!0x0,!0x0)[_0x2826('0x2c')](0x1f4,0x1,function(){_0x2c7ef8[_0x2826('0x2f')](_0x1694af)[_0x2826('0x30')]({'height':_0x1694af[_0x2826('0x31')](_0x2826('0x32'))[_0x2826('0x2a')]()},0x2bc);});};removePlayer=function(){_0xe54940[_0x2826('0x31')](_0x2826('0x33'))[_0x2826('0x34')]('click.removeVideo',function(){_0x1694af[_0x2826('0x2b')](!0x0,!0x0)[_0x2826('0x2c')](0x1f4,0x0,function(){$(this)[_0x2826('0x35')]()[_0x2826('0x36')](_0x2826('0x37'));$(_0x2826('0x0'))[_0x2826('0x38')](_0x2826('0x2e'));});_0x2c7ef8[_0x2826('0x2b')](!0x0,!0x0)[_0x2826('0x2c')](0x1f4,0x1,function(){var _0x1adff9=_0x2c7ef8[_0x2826('0x29')](_0x2826('0x2a'));_0x1adff9&&_0x2c7ef8[_0x2826('0x30')]({'height':_0x1adff9},0x2bc);});});};var _0x15f2b5=function(){if(!_0xe54940['find'](_0x2826('0x39'))['length'])for(vId in removePlayer[_0x2826('0x3a')](this),_0x6c5aae)if('string'===typeof _0x6c5aae[vId]&&''!==_0x6c5aae[vId]){var _0x4aa67a=$(_0x2826('0x3b')+_0x6c5aae[vId]+'/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27'+_0x6c5aae[vId]+_0x2826('0x3c')+_0x6c5aae[vId]+_0x2826('0x3d'));_0x4aa67a[_0x2826('0x31')]('a')[_0x2826('0x34')](_0x2826('0x3e'),function(){var _0x799a23=$(this);_0xe54940[_0x2826('0x31')](_0x2826('0x3f'))[_0x2826('0x38')]('ON');_0x799a23[_0x2826('0x2d')]('ON');0x1==_0x3b5d8a[_0x2826('0x40')]?$(_0x2826('0x41'))[_0x2826('0x11')]?(_0x38a994[_0x2826('0x3a')](this,'',''),$(_0x2826('0x41'))[0x0][_0x2826('0x42')][_0x2826('0x43')](_0x2826('0x44'),'*')):_0x38a994[_0x2826('0x3a')](this,_0x799a23[_0x2826('0x45')](_0x2826('0x46')),_0x2826('0x12')):_0x38a994[_0x2826('0x3a')](this,_0x799a23[_0x2826('0x45')](_0x2826('0x46')),_0x2826('0x12'));return!0x1;});0x1==_0x3b5d8a[_0x2826('0x40')]&&_0xe54940['find'](_0x2826('0x47'))['click'](function(_0x387b63){$(_0x2826('0x41'))[_0x2826('0x11')]&&$(_0x2826('0x41'))[0x0][_0x2826('0x42')][_0x2826('0x43')](_0x2826('0x48'),'*');});_0x2826('0x49')===_0x3b5d8a[_0x2826('0x4a')]?_0x4aa67a[_0x2826('0x1a')](_0xe54940):_0x4aa67a[_0x2826('0x4b')](_0xe54940);_0x4aa67a['trigger']('QuatroDigital.pv_video_added',[_0x6c5aae[vId],_0x4aa67a]);}};$(document)['ajaxStop'](_0x15f2b5);$(window)[_0x2826('0x4c')](_0x15f2b5);(function(){var _0xaa0d3b=this;var _0xe5dc07=window['ImageControl']||function(){};window[_0x2826('0x4d')]=function(_0x16fb23,_0x2cf016){$(_0x16fb23||'')['is']('.qd-videoLink')||(_0xe5dc07[_0x2826('0x3a')](this,_0x16fb23,_0x2cf016),_0x15f2b5[_0x2826('0x3a')](_0xaa0d3b));};}());}});}(this));

/* Quatro Digital - Mosaic Banners // Carlos Vinicius // Todos os direitos reservados */
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

