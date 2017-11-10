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
			Common.smartQuantityShelf();
		},
		ajaxStop: function() {
			Common.appendSkuPopUpCloseBtn();
			Common.applySmartPrice();
		},
		windowOnload: function() {
			Common.facebookLikebox();
			Common.saveAmountFix();
		},
		showHideMenuFloat: function(){
			$('.header-qd-v1-float-menu-trigger').click(function(){
				$('.header-qd-v1-amazing-menu-wrapper.float-bar').toggleClass('qd-nav-float-on');
			});
		},
		bodyDataQDScrollT: function() {
			$(document.body).attr('data-qd-scroll-limit', '145');
		},

		smartQuantityShelf: function() {
            $(".shelf-qd-v1-buy-button:not(.qd-on)").addClass('qd-on').QD_smartQuantity({
                buyButton: ".btn-add-buy-button-asynchronous"
            });
		},
		
		applySmartCart: function() {
			$('.header-qd-v1-actions-wrapper').append('<div class="smart-cart-qd-v1-wrapper"><div class="qd-sc-wrapper"></div></div>');

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
			$(".footer-qd-v1-facebook-likebox").html('<div class="fb-page" data-href="https://www.facebook.com/gasometromadeiras/" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="false"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/gasometromadeiras/"></a></blockquote></div></div>');
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
				// if(wrapper.closest('.product-qd-v1-sku-selection-box').length)
					// return { slidesToShow: 2 };
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
			// ATENÇÃO CHAMAR ESSA FUNÇÃO TBM NO AJAX STOP
			var wrapper = $("li[layout]");

			$('<div class="shelf-qd-v1-smart-price component-qd-v1-smart-price"> <div class="row"> <div class="col-xs-2"> <div class="shelf-qd-v1-sp-icon"> <i class="fa fa-barcode" aria-hidden="true"></i> </div> </div> <div class="col-xs-10"> <span class="qd_displayPrice shelf-qd-v1-sp-best-price">R$ </span> <span class="qd-sp-display-discount shelf-qd-v1-sp-discount">0% de desconto no boleto</span> </div> </div> </div>').insertBefore(".shelf-qd-v1-price:not(.qd-on)");

			$(".shelf-qd-v1-price").addClass('qd-on');

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

			wrapper.has('h2').each(function () {
				var $t = $(this);
				$t.find('h2').insertBefore($t);
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
				autoplay: true,
				draggable: false
			});
			
			var mobileDotsWrapper = $('.slider-qd-v1-full-mobile .slick-dots, .slider-qd-v1-full-hotsite-mobile .slick-dots ');
			mobileDotsWrapper.on('init', function(event, slick){
				$(this).find('.slick-current').addClass('slick-active');
			});	

			mobileDotsWrapper.slick({
				asNavFor: '.slider-qd-v1-full-mobile, .slider-qd-v1-full-hotsite-mobile',
				arrows: false,
				autoplay: true,
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
			var closedHeight = $('.home-qd-v1-special-links, .hotsite-qd-v1-special-links').outerHeight();
			var maxheight = $('.home-qd-v1-special-links >ul, .hotsite-qd-v1-special-links >ul').height();

			$('.home-qd-v1-special-links, .hotsite-qd-v1-special-links').click(function() {
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
			var wrapper = $('.home-qd-v1-special-carousel-banner, .hotsite-qd-v1-special-carousel-banner');

			if (!wrapper.length)
				return false;

			var hasBanner = wrapper.find('.box-banner, .home-qd-v1-special-links ul[itemscope="itemscope"], .hotsite-qd-v1-special-links ul[itemscope="itemscope"]').length;
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
			Product.accessoriesFix();
			Product.accessoriesApplyCarousel();
			Product.openShipping();
			Product.qdClickTableMeasures();
			Product.qdCallThumbVideo();
			Product.forceImageZoom();
			Product.selectSku();
			Product.scrollToDescription();
			Product.applySmartPrice();
			Product.doublePrice();
			Product.applyTipBarProductCarousel();			
			Product.scrollToBuyButton();
			Product.showFloatingBuyBar();

			// Apenas para tela de KIT
			if( $(document.body).is(".product-kit")){
				Product.kitShowItem();
				Product.kitShowSpecification();
				Product.kitItemSelected();
				Product.kitItemSkuSelect();
				Product.kitDustRenderCallback();
				Product.kitUnavailableCheck();
				Product.kitShowDescription();
				Product.kitShowImage();
				Product.kitBuyAllItemsButton();
				Product.updateKitTotalPrice();
			}
			else{
				Product.saveAmountFlag();
				Product.setAvailableBodyClass();	
			}

			// Roda slick das thumbs quando volta para estado inicial
			$(window).on('skuSelectable.vtex', function() {
				Product.applyCarouselThumb();
			});
		},
		ajaxStop: function() {
			Product.applyCarouselThumb();
		},
		windowOnload: function() {},
		skuListSelection:function(){
			if (!$(".product-qd-v1-sku-selection .imageSku, .product-qd-v2-sku-selection .imageSku").length > 0)
				return;

			$(document.body).addClass('sku-in-list');

			var wrapper = $(".product-qd-v1-sku-selection, .product-qd-v2-sku-selection");

			wrapper.find(".skuList").each(function(){
				$(this).addClass("product-qd-v1-sku-in-list");

				if ($(window).width() >= 500){
					$(this).addClass('no-xs');
				}
			});

			wrapper.find(".buy-button").each(function(){
				$(this).wrap('<div class="qd-v1-buy-button-content"></div>');
			});

			wrapper.find(".portal-notify-me-ref").each(function() {
				var $t = $(this);

				$t.find(".notifyme").addClass("qd-notifyme-hide");
				$t.getParent(".skuList").addClass("qd-sku-unavaliable");

				var btn = $('<div class="notifyme-btn-wrap"><button class="btn btn-xs notifyme-btn">Avise-me</button></div>');
				btn.find("button").click(function() {
					btn.siblings(".notifyme").removeClass("qd-notifyme-hide");
					btn.addClass("qd-notifyme-hide");
				});
				$t.prepend(btn);
			});

			wrapper.find(".qd-v1-buy-button-content").prepend('<div class="qd-v1-smart-qtt"> <input type="tel" class="qd-sq-quantity" /> <div class="btns-wrapper"> <span class="qd-sq-more"></span> <span class="qd-sq-minus"></span> </div> </div>');
		},
		doublePrice: function () {
			var row = $('.product-qd-v1-box-quantity').clone().addClass('product-qd-v1-double-size qd-show');
			row.find('script').remove();
			// row.insertBefore($('.product-floating-bar-smart-qtt'));

			Product.applySmartQuantity();
		},
		applyTipBarProductCarousel: function() {
			var wrapper = $('.tip-bar-qd-v1-carousel-product');

			if (!wrapper.length)
				return;

			var options = {
				arrows: false,
				autoplay: true,
				slidesToShow: 2,
				slidesToScroll: 2,
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
				// if(wrapper.closest('.product-qd-v1-sku-selection-box').length)
					// return { slidesToShow: 2 };
				return {};
			})()));
		},
		scrollToBuyButton: function() {
			$('.product-qd-v1-buy-button-float').click(function(e) {
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $('.product-qd-v1-price').offset().top -100
				}, 900, 'swing');
			});
		},
		showFloatingBuyBar: function () {
			var targetOffset = $(".product-qd-v1-buy-button").offset().top - 20;
			var elem = $(".product-floating-bar-buy");

			var $w = $(window).scroll(function () {

				if ($w.scrollTop() > targetOffset) {
					elem.addClass("active");
				}
				else {
					elem.removeClass("active");
				}

			});
		},
		applySmartQuantity: function () {
			$('.product-qd-v1-sku-selection-box, .product-floating-bar-buy').QD_smartQuantity();

			$(window).on("skuSelected.vtex", function (e, id, data) {
				$('.qd-sq-more, .qd-sq-minus').click();
			});

			var skuList = $(".skuList");
			skuList.QD_smartQuantity();

			skuList.on('QuatroDigital.sq_change', function(){
				var skuId = ( ($(this).find('a.buy-button').attr('href') || '').match(/sku\=([0-9]+)/i) || [''] ).pop();
				var qtt   = parseInt($(this).find('.qd-sq-quantity').val() || '1');
				for (var i in skuJson.skus) {
					if(typeof skuJson.skus[i] != "function" && skuJson.skus[i].sku == skuId) {
						$(this).find('.valor-de strong').text('R$ ' + qd_number_format((skuJson.skus[i].listPrice * qtt) / 100, 2, ",", "."));
						$(this).find('.valor-por strong').text('R$ ' + qd_number_format((skuJson.skus[i].bestPrice * qtt) / 100, 2, ",", "."));
						break;
					}
				}
			});

			var skuRadio = $(".product-qd-v1-price-wrapper");
			skuRadio.QD_smartQuantity();

			skuRadio.on('QuatroDigital.sq_change', function(){
				var skuId = ( ($(this).find('a.buy-button').attr('href') || '').match(/sku\=([0-9]+)/i) || [''] ).pop();
				var qtt   = parseInt($(this).find('.qd-sq-quantity').val() || '1');
				console.log("skuid="+skuId);
				console.log("qtt="+qtt);
				for (var i in skuJson.skus) {	
					if (typeof skuJson.skus[i] != "function" && skuJson.skus[i].sku == skuId) {	
						console.log("skuJson.skus.listPrice="+skuJson.skus[i].listPrice);
						console.log("skuJson.skus.bestPrice="+skuJson.skus[i].bestPrice);
						$(this).find('.valor-de strong').text('R$ ' + qd_number_format((skuJson.skus[i].listPrice * qtt) / 100, 2, ",", "."));
						$(this).find('.valor-por strong').text('R$ ' + qd_number_format((skuJson.skus[i].bestPrice * qtt) / 100, 2, ",", "."));
					}
				}
			});
		},
		accessoriesFix: function () {
			$('fieldset >.buy-product-checkbox').parent().each(function () {
				var $t = $(this);
				$t.add($t.prev('ul')).wrapAll('<div class="accessories-qd-v1-item col-xs-12 col-sm-6 col-md-3"/>');
			});
		},
		accessoriesApplyCarousel: function () {
			var item = $('.accessories-qd-v1-item');

			if (!item.length)
				return;

			item.wrapAll('<div class="accessories-qd-v1-carousel"></div>');

			$('.accessories-qd-v1-carousel').slick({
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
						breakpoint: 600,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
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
			if($('.product-qd-v1-stamps-highlight .flag[class*="boleto"]').length){
				$(".product-qd-v1-price").prepend('<div class="product-qd-v1-bank-slip"> <div class="row"> <div class="col-xs-2"> <div class="shelf-qd-v1-sp-icon"> <i class="fa fa-barcode" aria-hidden="true"></i> </div> </div> <div class="col-xs-10"> <p class="qd-sp-best-price"><span class="qd_displayPrice">R$ </span></p> <p class="qd-sp-best-discount"><span class="qd-sp-display-discount">0%  de desconto no boleto</span></p> </div> </div> </div>');
	
				$(".product-qd-v1-stamps .flag").QD_SmartPrice({
					filterFlagBy: "[class*='boleto']",
					productPage:{
						wrapperElement: ".product-qd-v1-wrapper",
						changeNativePrice: false,
						isProductPage: true
					}
				});            
			}
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
					'scrollTop': $('.product-qd-v1-specification').offset().top -100
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
		kitShowItem: function () {
			$(".product-qd-v1-kit-item-row").each(function () {
				if ($(this).find("#image-main").length) {
					$(this).show();
				}
			});
		},
		kitShowSpecification: function () {
			$(".specification-row").each(function () {
				if ($(this).find(".productName").length) {
					$(this).show();
				}
			});
		},
		kitItemSelected: function () {
			$(".kit-item-selects").bind("click", function () {
				$(this).parents(".product-qd-v1-kit-item-row").toggleClass("qd-state-not-selected");
				Product.updateKitTotalPrice();
			});
		},
		kitBuyAllItemsButton: function() {
			$(".product-qd-v1-buy-button a").attr('href', '#').click(function(e){
				
				var url = Product.setBuyUrl();
				if(url)
					$(this).attr('href', url);
				else{
					e.preventDefault();
					alert('Por favor, selecione o modelo desejado.');
				}
			});
		},
		setBuyUrl: function(){
			var btns = $(".product-qd-v1-kit-item-row:not('.qd-state-not-selected, .qd-item-unavailable') .buy-in-page-button");
			var uri = [];
			btns.each(function(){
				var href = this.href || "";
				
				if( href == "" || href.indexOf("javascript:alert(") > -1 ){
					uri = [];
					
					var elem = $(this).closest('.product-qd-v1-kit-item-row').addClass('qd-state-not-chosen');
					$("html, body").animate({ scrollTop: elem.offset().top - 150 });
					setTimeout(function() {
						elem.removeClass('qd-state-not-chosen');
					}, 700);

					return false;
				}

				var param = (this.search || '').replace('?','').split("&");
				var itemUri = [];
				for( var k = 0; k < param.length; k++ ){
					if( param[k].search(/^(sku|qty|seller)/i) != 0)
						continue;
					itemUri.push( param[k] );
				}
				uri.push( itemUri.join("&") );

			});

			if(uri.length)
				return "/checkout/cart/add?" + uri.join("&") + "&sc=" + jssalesChannel;
		},
		kitDustRenderCallback: function () {
			var orig = window.dust.render;

			window.dust.render = function () {
				orig.apply(this, arguments);

				Product.kitUnavailableCheck();
			}
		},
		kitUnavailableCheck: function () {
			$(".product-qd-v1-kit-item-row").each(function () {
				var $t = $(this);
				if ($t.find(".sku-notifyme:visible").length)
					$t.addClass("qd-item-unavailable");
				else
					$t.removeClass("qd-item-unavailable");
			});
		},
		kitShowDescription: function () {
			var wrapper = $('.product-qd-v1-specification');

			$(".product-qd-v1-kit-details a").click(function (e) {
				e.preventDefault();				

				var pId = $(this).closest('.product-qd-v1-kit-item-row').find('.product-qd-v1-name #___rc-p-id').val();
				var elem = wrapper.find('#___rc-p-id[value=' + pId + ']').closest('.specification-row').addClass('qd-specification-hightlight');
				$("html, body").animate({ scrollTop: elem.offset().top - 150 });
				setTimeout(function() {
					elem.removeClass('qd-specification-hightlight');
				}, 1500);
				
				return false;
			})
		},
		kitShowImage: function () {
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
		kitItemSkuSelect: function () {
			$(".product-kit-sku-selection .sku-selector").bind("change", function () {
				if($(this)[0].value)
					Product.updateKitTotalPrice();
			});
		},
		updateKitTotalPrice: function () {
			var installment = 1;
			var totalPrice = 0;
			var items = $(".product-qd-v1-kit-item-row:not('.qd-state-not-selected, .qd-item-unavailable') a.buy-in-page-button");
			
			for(var i = 0; i < items.length; i++){
				var sku = '';
				var url = items[i].href;
				if(url.indexOf('sku=') >= 0){
					sku = items[i].href.split('?')[1].match(/sku=(\s*\d+)/i)[1];
				}

				var skuData = Product.getKitItemPrice($(items[i]).attr('productindex'), sku);
				
				installment = Math.min(installment, skuData['installment']);
				totalPrice += skuData['price'];
			}
			
			
			$('.product-qd-v1-price-wrapper .skuBestInstallmentNumber').html(installment + "<span class='x'>x</span>");
			$('.product-qd-v1-price-wrapper .skuBestInstallmentValue').text('R$ ' + (totalPrice / (installment*100)).toFixed(2).toString().replace('.',','));
			$('.product-qd-v1-price-wrapper .skuBestPrice').text('R$ ' + (totalPrice / 100).toFixed(2).toString().replace('.',','));
		},
		getKitItemPrice: function(productindex, sku) {
			var skuData = [];
			var selectedSku = '';
			var productJson = window['skuJson_' + productindex];
			if(sku){
				for(var k = 0; k < productJson.skus.length; k++) {
					if(productJson.skus[k].sku == sku)
						selectedSku = productJson.skus[k];
				}
			}
			else {
				for(var k = 0; k < productJson.skus.length; k++) {
					if(!selectedSku || productJson.skus[k].bestPrice < selectedSku.bestPrice)
						selectedSku = productJson.skus[k];
				}
			}
			skuData['price'] = selectedSku.bestPrice * selectedSku.unitMultiplier;
			skuData['installment'] = selectedSku.installments;
			return skuData;
		},
		saveAmountFlag: function () {
			var flag = $('.product-qd-v1-stamps-highlight-discount');

			$(window).on('skuSelected.vtex', function (e, sku, data) {
				if (!flag.length)
					flag = $('<div class="product-qd-v1-stamps-highlight-discount"></div>').prependTo('.product-qd-v1-stamps');

				if (data.listPrice > data.bestPrice)
					flag.text(parseInt(100 - data.bestPrice / data.listPrice * 100) + "%").show();
				else
					flag.hide();
			});

			if (skuJson.skus.length >= 1) {
				if (!flag.length)
					flag = $('<div class="product-qd-v1-stamps-highlight-discount"></div>').prependTo('.product-qd-v1-stamps');

				if (skuJson.skus[0].listPrice > skuJson.skus[0].bestPrice)
					flag.text(parseInt(100 - skuJson.skus[0].bestPrice / skuJson.skus[0].listPrice * 100) + "%").show();
			}
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
			Home.applySpecialShelfCarousel();
			Home.homeSpecialLinksToggle();			
			Institutional.sidemenuToggle();
			Search.shelfLineFix();			
		},
		ajaxStop: function() {
		},
		windowOnload: function() {
		},
		sidemenuToggle:function() {
			// Amazing Menu Responsivo
			$('.institucional-qd-v1-menu-toggle').click(function(evt) {
				evt.preventDefault();
				$(document.body).addClass('qd-sn-on');
			});
			$('.institucional-qd-v1-side-menu-wrap-close').click(function() {
				$(document.body).removeClass('qd-sn-on');
			});
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
var _0x26dc=['qd_sp_on','isDiscountFlag','div[skuCorrente]:first','attr','skuCorrente','skus','sku','available','bestPrice','qd-sp-product-unavailable','getDiscountValue','O\x20valor\x20informado\x20p/\x20o\x20desconto\x20não\x20é\x20um\x20número.','alerta','.qd_productPrice','val','Por\x20alguma\x20razão\x20não\x20consegui\x20obter\x20o\x20preço\x20deste\x20produto\x20:(','appliedDiscount','changeNativePrice','skuPrice','html','installments','installmentValue','changeInstallments','.qd_sp_display_installments','.qd_sp_display_installmentValue','.qd_sp_installments','append','changeNativeSaveAmount','em.economia-de','each','skuSelected.vtex','qd_sp_processedItem','startedByWrapper','flagElement','call','forcePromotion','string','not','.qd_sp_processedItem','.qd_productPrice:not(.qd_sp_processedItem)','style','display:none\x20!important;','extend','boolean','function','prototype','trim','replace','abs','undefined','pow','round','toFixed','length','join','QD_SmartPrice','Smart\x20Price','object','error','info','warn','aviso','toLowerCase','apply','text','search','match','.flag','[class*=\x27desconto\x27]','.productRightColumn','strong.skuBestPrice','label.skuBestInstallmentNumber','label.skuBestInstallmentValue','strong.skuPrice','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','ite','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','productPage','closest','wrapperElement','filterFlagBy','isProductPage','find','addClass','qd-active','.qd_sp_on,\x20.qd_sp_ignored','skuBestPrice','.qd_active','removeClass','qd-sp-active','oneFlagByItem','siblings','qd_sp_ignored'];(function(_0x155bbf,_0x1bca34){var _0x1cb0ac=function(_0x101c7c){while(--_0x101c7c){_0x155bbf['push'](_0x155bbf['shift']());}};_0x1cb0ac(++_0x1bca34);}(_0x26dc,0x1ac));var _0xc26d=function(_0x347be9,_0x150f49){_0x347be9=_0x347be9-0x0;var _0x1dd5a8=_0x26dc[_0x347be9];return _0x1dd5a8;};_0xc26d('0x0')!==typeof String[_0xc26d('0x1')][_0xc26d('0x2')]&&(String[_0xc26d('0x1')][_0xc26d('0x2')]=function(){return this[_0xc26d('0x3')](/^\s+|\s+$/g,'');});function qd_number_format(_0x45221f,_0xaa1a8e,_0x57fe9d,_0x5825ea){_0x45221f=(_0x45221f+'')[_0xc26d('0x3')](/[^0-9+\-Ee.]/g,'');_0x45221f=isFinite(+_0x45221f)?+_0x45221f:0x0;_0xaa1a8e=isFinite(+_0xaa1a8e)?Math[_0xc26d('0x4')](_0xaa1a8e):0x0;_0x5825ea=_0xc26d('0x5')===typeof _0x5825ea?',':_0x5825ea;_0x57fe9d=_0xc26d('0x5')===typeof _0x57fe9d?'.':_0x57fe9d;var _0x13b6c1='',_0x13b6c1=function(_0x57a298,_0x446c90){var _0xaa1a8e=Math[_0xc26d('0x6')](0xa,_0x446c90);return''+(Math[_0xc26d('0x7')](_0x57a298*_0xaa1a8e)/_0xaa1a8e)[_0xc26d('0x8')](_0x446c90);},_0x13b6c1=(_0xaa1a8e?_0x13b6c1(_0x45221f,_0xaa1a8e):''+Math['round'](_0x45221f))['split']('.');0x3<_0x13b6c1[0x0][_0xc26d('0x9')]&&(_0x13b6c1[0x0]=_0x13b6c1[0x0][_0xc26d('0x3')](/\B(?=(?:\d{3})+(?!\d))/g,_0x5825ea));(_0x13b6c1[0x1]||'')[_0xc26d('0x9')]<_0xaa1a8e&&(_0x13b6c1[0x1]=_0x13b6c1[0x1]||'',_0x13b6c1[0x1]+=Array(_0xaa1a8e-_0x13b6c1[0x1][_0xc26d('0x9')]+0x1)[_0xc26d('0xa')]('0'));return _0x13b6c1['join'](_0x57fe9d);};(function(_0x427cf2){'use strict';var _0x1f9ac2=jQuery;if(typeof _0x1f9ac2['fn'][_0xc26d('0xb')]===_0xc26d('0x0'))return;var _0x390652=_0xc26d('0xc');var _0x25b072=function(_0x44fe56,_0x236cb7){if(_0xc26d('0xd')===typeof console&&_0xc26d('0x0')===typeof console[_0xc26d('0xe')]&&_0xc26d('0x0')===typeof console[_0xc26d('0xf')]&&_0xc26d('0x0')===typeof console[_0xc26d('0x10')]){var _0x57c3d4;_0xc26d('0xd')===typeof _0x44fe56?(_0x44fe56['unshift']('['+_0x390652+']\x0a'),_0x57c3d4=_0x44fe56):_0x57c3d4=['['+_0x390652+']\x0a'+_0x44fe56];if(_0xc26d('0x5')===typeof _0x236cb7||'alerta'!==_0x236cb7['toLowerCase']()&&_0xc26d('0x11')!==_0x236cb7['toLowerCase']())if(_0xc26d('0x5')!==typeof _0x236cb7&&'info'===_0x236cb7[_0xc26d('0x12')]())try{console[_0xc26d('0xf')][_0xc26d('0x13')](console,_0x57c3d4);}catch(_0x2222e7){console[_0xc26d('0xf')](_0x57c3d4[_0xc26d('0xa')]('\x0a'));}else try{console[_0xc26d('0xe')][_0xc26d('0x13')](console,_0x57c3d4);}catch(_0x11425d){console[_0xc26d('0xe')](_0x57c3d4[_0xc26d('0xa')]('\x0a'));}else try{console[_0xc26d('0x10')][_0xc26d('0x13')](console,_0x57c3d4);}catch(_0x34eb05){console[_0xc26d('0x10')](_0x57c3d4['join']('\x0a'));}}};var _0x3a73d1=/[0-9]+\%/i;var _0xb390c=/[0-9\.]+(?=\%)/i;var _0x13c84d={'isDiscountFlag':function(_0x3e4d03){if(_0x3e4d03[_0xc26d('0x14')]()[_0xc26d('0x15')](_0x3a73d1)>-0x1)return!![];return![];},'getDiscountValue':function(_0x2b9d97){return _0x2b9d97['text']()[_0xc26d('0x16')](_0xb390c);},'startedByWrapper':![],'flagElement':_0xc26d('0x17'),'wrapperElement':'li','filterFlagBy':_0xc26d('0x18'),'forcePromotion':null,'appliedDiscount':null,'oneFlagByItem':!![],'isSmartCheckout':!![],'changeInstallments':![],'productPage':{'changeNativeSaveAmount':!![],'changeNativePrice':!![],'changeInstallments':![],'isProductPage':'auto','wrapperElement':_0xc26d('0x19'),'skuBestPrice':_0xc26d('0x1a'),'installments':_0xc26d('0x1b'),'installmentValue':_0xc26d('0x1c'),'skuPrice':_0xc26d('0x1d')}};_0x1f9ac2['fn'][_0xc26d('0xb')]=function(){};var _0x202dcb=function(_0x341347){var _0x523c7f={'t':_0xc26d('0x1e')};return function(_0x4043f1){var _0xf10ee,_0x38f091,_0x27c74c,_0x2f294c;_0x38f091=function(_0xd931b5){return _0xd931b5;};_0x27c74c=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4043f1=_0x4043f1['d'+_0x27c74c[0x10]+'c'+_0x27c74c[0x11]+'m'+_0x38f091(_0x27c74c[0x1])+'n'+_0x27c74c[0xd]]['l'+_0x27c74c[0x12]+'c'+_0x27c74c[0x0]+'ti'+_0x38f091('o')+'n'];_0xf10ee=function(_0x37d341){return escape(encodeURIComponent(_0x37d341[_0xc26d('0x3')](/\./g,'¨')[_0xc26d('0x3')](/[a-zA-Z]/g,function(_0x11ab37){return String[_0xc26d('0x1f')](('Z'>=_0x11ab37?0x5a:0x7a)>=(_0x11ab37=_0x11ab37[_0xc26d('0x20')](0x0)+0xd)?_0x11ab37:_0x11ab37-0x1a);})));};var _0x195381=_0xf10ee(_0x4043f1[[_0x27c74c[0x9],_0x38f091('o'),_0x27c74c[0xc],_0x27c74c[_0x38f091(0xd)]][_0xc26d('0xa')]('')]);_0xf10ee=_0xf10ee((window[['js',_0x38f091('no'),'m',_0x27c74c[0x1],_0x27c74c[0x4]['toUpperCase'](),_0xc26d('0x21')][_0xc26d('0xa')]('')]||'---')+['.v',_0x27c74c[0xd],'e',_0x38f091('x'),'co',_0x38f091('mm'),'erc',_0x27c74c[0x1],'.c',_0x38f091('o'),'m.',_0x27c74c[0x13],'r'][_0xc26d('0xa')](''));for(var _0xcd68f9 in _0x523c7f){if(_0xf10ee===_0xcd68f9+_0x523c7f[_0xcd68f9]||_0x195381===_0xcd68f9+_0x523c7f[_0xcd68f9]){_0x2f294c='tr'+_0x27c74c[0x11]+'e';break;}_0x2f294c='f'+_0x27c74c[0x0]+'ls'+_0x38f091(_0x27c74c[0x1])+'';}_0x38f091=!0x1;-0x1<_0x4043f1[[_0x27c74c[0xc],'e',_0x27c74c[0x0],'rc',_0x27c74c[0x9]][_0xc26d('0xa')]('')][_0xc26d('0x22')](_0xc26d('0x23'))&&(_0x38f091=!0x0);return[_0x2f294c,_0x38f091];}(_0x341347);}(window);if(!eval(_0x202dcb[0x0]))return _0x202dcb[0x1]?_0x25b072('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x7c7e75=function(_0x18d5a7,_0x2dfe68){'use strict';var _0x1c672e=function(_0x530e18){'use strict';var _0x501536,_0x152e91,_0xb37dd4,_0x288d54,_0x260560,_0x5c7667,_0x3622ed,_0x30fdb7,_0x525e6a,_0x514731,_0x2161b4,_0x1b97fb,_0x425740,_0x309e83,_0x3a9859,_0x48bea0,_0x2f738d,_0x51e4b3,_0x3ecc3e;var _0x1d6111=_0x1f9ac2(this);_0x530e18=typeof _0x530e18===_0xc26d('0x5')?![]:_0x530e18;if(_0x2dfe68[_0xc26d('0x24')]['isProductPage'])var _0x597db1=_0x1d6111[_0xc26d('0x25')](_0x2dfe68[_0xc26d('0x24')][_0xc26d('0x26')]);else var _0x597db1=_0x1d6111['closest'](_0x2dfe68[_0xc26d('0x26')]);if(!_0x530e18&&!_0x1d6111['is'](_0x2dfe68[_0xc26d('0x27')])){if(_0x2dfe68[_0xc26d('0x24')][_0xc26d('0x28')]&&_0x597db1['is'](_0x2dfe68[_0xc26d('0x24')][_0xc26d('0x26')])){_0x597db1[_0xc26d('0x29')](_0x2dfe68[_0xc26d('0x24')]['skuBestPrice'])[_0xc26d('0x2a')](_0xc26d('0x2b'));_0x597db1[_0xc26d('0x2a')]('qd-sp-active');}return;}var _0x29a2f0=_0x2dfe68['productPage'][_0xc26d('0x28')];if(_0x1d6111['is'](_0xc26d('0x2c'))&&!_0x29a2f0)return;if(_0x29a2f0){_0x30fdb7=_0x597db1[_0xc26d('0x29')](_0x2dfe68[_0xc26d('0x24')][_0xc26d('0x2d')]);if(_0x30fdb7['find'](_0xc26d('0x2e'))['length'])return;_0x30fdb7[_0xc26d('0x2f')](_0xc26d('0x2b'));_0x597db1['removeClass'](_0xc26d('0x30'));}if(_0x2dfe68[_0xc26d('0x31')]&&_0x1d6111[_0xc26d('0x32')]('.qd_sp_on')[_0xc26d('0x9')]){_0x1d6111[_0xc26d('0x2a')](_0xc26d('0x33'));return;}_0x1d6111[_0xc26d('0x2a')](_0xc26d('0x34'));if(!_0x2dfe68[_0xc26d('0x35')](_0x1d6111))return;if(_0x29a2f0){_0xb37dd4={};var _0x32cda5=parseInt(_0x1f9ac2(_0xc26d('0x36'))[_0xc26d('0x37')](_0xc26d('0x38')),0xa);if(_0x32cda5){for(var _0x324805=0x0;_0x324805<skuJson['skus'][_0xc26d('0x9')];_0x324805++){if(skuJson[_0xc26d('0x39')][_0x324805][_0xc26d('0x3a')]==_0x32cda5){_0xb37dd4=skuJson[_0xc26d('0x39')][_0x324805];break;}}}else{var _0x6c5f00=0x5af3107a3fff;for(var _0xf590f in skuJson[_0xc26d('0x39')]){if(typeof skuJson['skus'][_0xf590f]===_0xc26d('0x0'))continue;if(!skuJson[_0xc26d('0x39')][_0xf590f][_0xc26d('0x3b')])continue;if(skuJson[_0xc26d('0x39')][_0xf590f][_0xc26d('0x3c')]<_0x6c5f00){_0x6c5f00=skuJson['skus'][_0xf590f][_0xc26d('0x3c')];_0xb37dd4=skuJson[_0xc26d('0x39')][_0xf590f];}}}}_0x48bea0=!![];_0x2f738d=0x0;if(_0x2dfe68['isSmartCheckout']&&_0x51e4b3){_0x48bea0=skuJson['available'];if(!_0x48bea0)return _0x597db1[_0xc26d('0x2a')](_0xc26d('0x3d'));}_0x152e91=_0x2dfe68[_0xc26d('0x3e')](_0x1d6111);_0x501536=parseFloat(_0x152e91,0xa);if(isNaN(_0x501536))return _0x25b072([_0xc26d('0x3f'),_0x1d6111],_0xc26d('0x40'));var _0x1bab88=function(_0x1ab77e){if(_0x29a2f0)_0x288d54=(_0x1ab77e[_0xc26d('0x3c')]||0x0)/0x64;else{_0x425740=_0x597db1[_0xc26d('0x29')](_0xc26d('0x41'));_0x288d54=parseFloat((_0x425740[_0xc26d('0x42')]()||'')['replace'](/[^0-9\.\,]+/i,'')['replace']('.','')[_0xc26d('0x3')](',','.'),0xa);}if(isNaN(_0x288d54))return _0x25b072([_0xc26d('0x43'),_0x1d6111,_0x597db1]);if(_0x2dfe68[_0xc26d('0x44')]!==null){_0x309e83=0x0;if(!isNaN(_0x2dfe68[_0xc26d('0x44')]))_0x309e83=_0x2dfe68[_0xc26d('0x44')];else{_0x3a9859=_0x597db1[_0xc26d('0x29')](_0x2dfe68[_0xc26d('0x44')]);if(_0x3a9859[_0xc26d('0x9')])_0x309e83=_0x2dfe68[_0xc26d('0x3e')](_0x3a9859);}_0x309e83=parseFloat(_0x309e83,0xa);if(isNaN(_0x309e83))_0x309e83=0x0;if(_0x309e83!==0x0)_0x288d54=_0x288d54*0x64/(0x64-_0x309e83);}if(_0x29a2f0)_0x260560=(_0x1ab77e['listPrice']||0x0)/0x64;else _0x260560=parseFloat((_0x597db1[_0xc26d('0x29')]('.qd_productOldPrice')[_0xc26d('0x42')]()||'')[_0xc26d('0x3')](/[^0-9\.\,]+/i,'')[_0xc26d('0x3')]('.','')[_0xc26d('0x3')](',','.'),0xa);if(isNaN(_0x260560))_0x260560=0.001;_0x5c7667=_0x288d54*((0x64-_0x501536)/0x64);if(_0x29a2f0&&_0x2dfe68[_0xc26d('0x24')][_0xc26d('0x45')]){_0x30fdb7['text'](_0x30fdb7['text']()[_0xc26d('0x2')]()[_0xc26d('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x5c7667,0x2,',','.')))[_0xc26d('0x2a')](_0xc26d('0x2b'));_0x597db1[_0xc26d('0x2a')]('qd-sp-active');}else{_0x3ecc3e=_0x597db1[_0xc26d('0x29')]('.qd_displayPrice');_0x3ecc3e['text'](_0x3ecc3e['text']()[_0xc26d('0x3')](/[0-9\.]+,[0-9]+/i,'')+qd_number_format(_0x5c7667,0x2,',','.'));}if(_0x29a2f0){_0x3622ed=_0x597db1[_0xc26d('0x29')](_0x2dfe68['productPage'][_0xc26d('0x46')]);if(_0x3622ed[_0xc26d('0x9')])_0x3622ed[_0xc26d('0x14')](_0x3622ed[_0xc26d('0x14')]()['trim']()[_0xc26d('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x5c7667,0x2,',','.')));}var _0x15c722=_0x597db1[_0xc26d('0x29')]('.qd-sp-display-discount');_0x15c722[_0xc26d('0x14')](_0x15c722[_0xc26d('0x14')]()[_0xc26d('0x3')](/[0-9]+\%/i,_0x501536+'%'));var _0x6c6cd8=function(_0x1dab3c,_0x33a5ac,_0x208117){var _0xb27b83=_0x597db1['find'](_0x1dab3c);if(_0xb27b83[_0xc26d('0x9')])_0xb27b83[_0xc26d('0x47')](_0xb27b83['html']()[_0xc26d('0x2')]()['replace'](/[0-9]{1,2}/,_0x208117?_0x208117:_0x1ab77e[_0xc26d('0x48')]||0x0));var _0x13b689=_0x597db1[_0xc26d('0x29')](_0x33a5ac);if(_0x13b689['length'])_0x13b689[_0xc26d('0x47')](_0x13b689['html']()[_0xc26d('0x2')]()[_0xc26d('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x5c7667/(_0x208117?_0x208117:_0x1ab77e[_0xc26d('0x48')]||0x1),0x2,',','.')));};if(_0x29a2f0&&_0x2dfe68[_0xc26d('0x24')]['changeInstallments'])_0x6c6cd8(_0x2dfe68[_0xc26d('0x24')]['installments'],_0x2dfe68[_0xc26d('0x24')][_0xc26d('0x49')]);else if(_0x2dfe68[_0xc26d('0x4a')])_0x6c6cd8(_0xc26d('0x4b'),_0xc26d('0x4c'),parseInt(_0x597db1[_0xc26d('0x29')](_0xc26d('0x4d'))['val']()||0x1)||0x1);_0x597db1[_0xc26d('0x29')]('.qd_saveAmount')[_0xc26d('0x4e')](qd_number_format(_0x260560-_0x5c7667,0x2,',','.'));_0x597db1[_0xc26d('0x29')]('.qd_saveAmountPercent')['prepend'](qd_number_format((_0x260560-_0x5c7667)*0x64/_0x260560,0x2,',','.'));if(_0x29a2f0&&_0x2dfe68[_0xc26d('0x24')][_0xc26d('0x4f')]){_0x1f9ac2(_0xc26d('0x50'))[_0xc26d('0x51')](function(){_0x2161b4=_0x1f9ac2(this);_0x2161b4[_0xc26d('0x14')](_0x2161b4[_0xc26d('0x14')]()[_0xc26d('0x2')]()[_0xc26d('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x260560-_0x5c7667,0x2,',','.')));_0x2161b4[_0xc26d('0x2a')](_0xc26d('0x2b'));});}};_0x1bab88(_0xb37dd4);if(_0x29a2f0)_0x1f9ac2(window)['on'](_0xc26d('0x52'),function(_0x4759b0,_0x5518b8,_0x40f375){_0x1bab88(_0x40f375);});_0x597db1[_0xc26d('0x2a')]('qd_sp_processedItem');if(!_0x29a2f0)_0x425740['addClass'](_0xc26d('0x53'));};(_0x2dfe68[_0xc26d('0x54')]?_0x18d5a7['find'](_0x2dfe68[_0xc26d('0x55')]):_0x18d5a7)[_0xc26d('0x51')](function(){_0x1c672e[_0xc26d('0x56')](this,![]);});if(typeof _0x2dfe68[_0xc26d('0x57')]==_0xc26d('0x58')){var _0x4f363e=_0x2dfe68[_0xc26d('0x54')]?_0x18d5a7:_0x18d5a7[_0xc26d('0x25')](_0x2dfe68['wrapperElement']);if(_0x2dfe68['productPage'][_0xc26d('0x28')])_0x4f363e=_0x4f363e[_0xc26d('0x25')](_0x2dfe68[_0xc26d('0x24')][_0xc26d('0x26')])[_0xc26d('0x59')](_0xc26d('0x5a'));else _0x4f363e=_0x4f363e['find'](_0xc26d('0x5b'));_0x4f363e[_0xc26d('0x51')](function(){var _0x54b584=_0x1f9ac2(_0x2dfe68[_0xc26d('0x57')]);_0x54b584[_0xc26d('0x37')](_0xc26d('0x5c'),_0xc26d('0x5d'));if(_0x2dfe68[_0xc26d('0x24')][_0xc26d('0x28')])_0x1f9ac2(this)[_0xc26d('0x4e')](_0x54b584);else _0x1f9ac2(this)['after'](_0x54b584);_0x1c672e[_0xc26d('0x56')](_0x54b584,!![]);});}};_0x1f9ac2['fn']['QD_SmartPrice']=function(_0x12853a){var _0x5d2172=_0x1f9ac2(this);if(!_0x5d2172[_0xc26d('0x9')])return _0x5d2172;var _0x3fa8ad=_0x1f9ac2[_0xc26d('0x5e')](!![],{},_0x13c84d,_0x12853a);if(typeof _0x3fa8ad['productPage'][_0xc26d('0x28')]!=_0xc26d('0x5f'))_0x3fa8ad[_0xc26d('0x24')][_0xc26d('0x28')]=_0x1f9ac2(document['body'])['is']('.produto');_0x7c7e75(_0x5d2172,_0x3fa8ad);return _0x5d2172;};}(this));
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
var _0x2de2=['qd-am-collection-wrapper','url','html','each','img[alt=\x27','attr','data-qdam-value','.box-banner','clone','insertBefore','hide','qd-am-content-loaded','trim','[class*=\x27colunas\x27]','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','find','qd-am-has-ul','children',':not(ul)','first','text','replaceSpecialChars','>li','qd-amazing-menu','>ul','qd-am-column','qd-am-dropdown','qd-am-level-','add','qd-am-','callback','extend','exec','.qd_amazing_menu_auto','getParent','closest','QD_amazingMenu','/qd-amazing-menu','object','error','undefined','info','warn','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','apply','join','qdAmAddNdx','addClass','qd-am-li-','qd-am-first','last','qd-am-last','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','toUpperCase','ite','---','erc','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','filter','.qd-am-collection','length','parent','qd-am-banner-wrapper'];(function(_0x115d8d,_0xacde78){var _0x250c76=function(_0x5a5236){while(--_0x5a5236){_0x115d8d['push'](_0x115d8d['shift']());}};_0x250c76(++_0xacde78);}(_0x2de2,0x100));var _0x22de=function(_0x38170b,_0x4ba2a6){_0x38170b=_0x38170b-0x0;var _0x1cc32f=_0x2de2[_0x38170b];return _0x1cc32f;};(function(_0x599da5){_0x599da5['fn'][_0x22de('0x0')]=_0x599da5['fn'][_0x22de('0x1')];}(jQuery));(function(_0x46057b){var _0x3c91ac;var _0x397f80=jQuery;if('function'!==typeof _0x397f80['fn'][_0x22de('0x2')]){var _0x409958={'url':_0x22de('0x3'),'callback':function(){},'ajaxCallback':function(){}};var _0x21ae49=function(_0x3a434b,_0x306ac8){if(_0x22de('0x4')===typeof console&&'undefined'!==typeof console[_0x22de('0x5')]&&_0x22de('0x6')!==typeof console[_0x22de('0x7')]&&_0x22de('0x6')!==typeof console[_0x22de('0x8')]){var _0x5ec9cb;_0x22de('0x4')===typeof _0x3a434b?(_0x3a434b['unshift']('[QD\x20Amazing\x20Menu]\x0a'),_0x5ec9cb=_0x3a434b):_0x5ec9cb=[_0x22de('0x9')+_0x3a434b];if('undefined'===typeof _0x306ac8||_0x22de('0xa')!==_0x306ac8[_0x22de('0xb')]()&&'aviso'!==_0x306ac8[_0x22de('0xb')]())if('undefined'!==typeof _0x306ac8&&_0x22de('0x7')===_0x306ac8[_0x22de('0xb')]())try{console['info'][_0x22de('0xc')](console,_0x5ec9cb);}catch(_0x264188){try{console[_0x22de('0x7')](_0x5ec9cb[_0x22de('0xd')]('\x0a'));}catch(_0x360c80){}}else try{console['error'][_0x22de('0xc')](console,_0x5ec9cb);}catch(_0x1fdd55){try{console[_0x22de('0x5')](_0x5ec9cb[_0x22de('0xd')]('\x0a'));}catch(_0x3813a5){}}else try{console[_0x22de('0x8')][_0x22de('0xc')](console,_0x5ec9cb);}catch(_0x14d478){try{console[_0x22de('0x8')](_0x5ec9cb[_0x22de('0xd')]('\x0a'));}catch(_0x3c67d0){}}}};_0x397f80['fn'][_0x22de('0xe')]=function(){var _0x414303=_0x397f80(this);_0x414303['each'](function(_0xc03e6e){_0x397f80(this)[_0x22de('0xf')](_0x22de('0x10')+_0xc03e6e);});_0x414303['first']()[_0x22de('0xf')](_0x22de('0x11'));_0x414303[_0x22de('0x12')]()[_0x22de('0xf')](_0x22de('0x13'));return _0x414303;};_0x397f80['fn'][_0x22de('0x2')]=function(){};_0x46057b=function(_0xce0a8c){var _0x9fa044={'t':_0x22de('0x14')};return function(_0x280f02){var _0x1d077d=function(_0x28e889){return _0x28e889;};var _0x2ad2de=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x280f02=_0x280f02['d'+_0x2ad2de[0x10]+'c'+_0x2ad2de[0x11]+'m'+_0x1d077d(_0x2ad2de[0x1])+'n'+_0x2ad2de[0xd]]['l'+_0x2ad2de[0x12]+'c'+_0x2ad2de[0x0]+'ti'+_0x1d077d('o')+'n'];var _0x4edb2c=function(_0x4ed850){return escape(encodeURIComponent(_0x4ed850[_0x22de('0x15')](/\./g,'¨')[_0x22de('0x15')](/[a-zA-Z]/g,function(_0xe9566d){return String['fromCharCode'](('Z'>=_0xe9566d?0x5a:0x7a)>=(_0xe9566d=_0xe9566d['charCodeAt'](0x0)+0xd)?_0xe9566d:_0xe9566d-0x1a);})));};var _0x21c425=_0x4edb2c(_0x280f02[[_0x2ad2de[0x9],_0x1d077d('o'),_0x2ad2de[0xc],_0x2ad2de[_0x1d077d(0xd)]][_0x22de('0xd')]('')]);_0x4edb2c=_0x4edb2c((window[['js',_0x1d077d('no'),'m',_0x2ad2de[0x1],_0x2ad2de[0x4][_0x22de('0x16')](),_0x22de('0x17')][_0x22de('0xd')]('')]||_0x22de('0x18'))+['.v',_0x2ad2de[0xd],'e',_0x1d077d('x'),'co',_0x1d077d('mm'),_0x22de('0x19'),_0x2ad2de[0x1],'.c',_0x1d077d('o'),'m.',_0x2ad2de[0x13],'r']['join'](''));for(var _0x365251 in _0x9fa044){if(_0x4edb2c===_0x365251+_0x9fa044[_0x365251]||_0x21c425===_0x365251+_0x9fa044[_0x365251]){var _0x51f170='tr'+_0x2ad2de[0x11]+'e';break;}_0x51f170='f'+_0x2ad2de[0x0]+'ls'+_0x1d077d(_0x2ad2de[0x1])+'';}_0x1d077d=!0x1;-0x1<_0x280f02[[_0x2ad2de[0xc],'e',_0x2ad2de[0x0],'rc',_0x2ad2de[0x9]][_0x22de('0xd')]('')]['indexOf']('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x1d077d=!0x0);return[_0x51f170,_0x1d077d];}(_0xce0a8c);}(window);if(!eval(_0x46057b[0x0]))return _0x46057b[0x1]?_0x21ae49(_0x22de('0x1a')):!0x1;var _0x25df62=function(_0x33480d){var _0x2fff47=_0x33480d['find']('.qd_am_code');var _0x295b72=_0x2fff47[_0x22de('0x1b')]('.qd-am-banner');var _0x241f15=_0x2fff47[_0x22de('0x1b')](_0x22de('0x1c'));if(_0x295b72[_0x22de('0x1d')]||_0x241f15['length'])_0x295b72[_0x22de('0x1e')]()[_0x22de('0xf')](_0x22de('0x1f')),_0x241f15[_0x22de('0x1e')]()['addClass'](_0x22de('0x20')),_0x397f80['qdAjax']({'url':_0x3c91ac[_0x22de('0x21')],'dataType':_0x22de('0x22'),'success':function(_0x1bb53b){var _0x24639f=_0x397f80(_0x1bb53b);_0x295b72[_0x22de('0x23')](function(){var _0x1bb53b=_0x397f80(this);var _0xee47d4=_0x24639f['find'](_0x22de('0x24')+_0x1bb53b[_0x22de('0x25')](_0x22de('0x26'))+'\x27]');_0xee47d4['length']&&(_0xee47d4[_0x22de('0x23')](function(){_0x397f80(this)[_0x22de('0x0')](_0x22de('0x27'))[_0x22de('0x28')]()[_0x22de('0x29')](_0x1bb53b);}),_0x1bb53b[_0x22de('0x2a')]());})[_0x22de('0xf')](_0x22de('0x2b'));_0x241f15[_0x22de('0x23')](function(){var _0x1bb53b={};var _0x4dc943=_0x397f80(this);_0x24639f['find']('h2')['each'](function(){if(_0x397f80(this)['text']()[_0x22de('0x2c')]()[_0x22de('0xb')]()==_0x4dc943['attr'](_0x22de('0x26'))[_0x22de('0x2c')]()[_0x22de('0xb')]())return _0x1bb53b=_0x397f80(this),!0x1;});_0x1bb53b['length']&&(_0x1bb53b[_0x22de('0x23')](function(){_0x397f80(this)[_0x22de('0x0')](_0x22de('0x2d'))[_0x22de('0x28')]()[_0x22de('0x29')](_0x4dc943);}),_0x4dc943[_0x22de('0x2a')]());})[_0x22de('0xf')](_0x22de('0x2b'));},'error':function(){_0x21ae49(_0x22de('0x2e')+_0x3c91ac['url']+'\x27\x20falho.');},'complete':function(){_0x3c91ac[_0x22de('0x2f')][_0x22de('0x30')](this);_0x397f80(window)[_0x22de('0x31')](_0x22de('0x32'),_0x33480d);},'clearQueueDelay':0xbb8});};_0x397f80[_0x22de('0x2')]=function(_0x34636a){var _0x14473d=_0x34636a['find'](_0x22de('0x33'))[_0x22de('0x23')](function(){var _0x2a9ad5=_0x397f80(this);if(!_0x2a9ad5[_0x22de('0x1d')])return _0x21ae49([_0x22de('0x34'),_0x34636a],_0x22de('0xa'));_0x2a9ad5[_0x22de('0x35')]('li\x20>ul')[_0x22de('0x1e')]()['addClass'](_0x22de('0x36'));_0x2a9ad5[_0x22de('0x35')]('li')['each'](function(){var _0x3f53f5=_0x397f80(this);var _0x38f1d8=_0x3f53f5[_0x22de('0x37')](_0x22de('0x38'));_0x38f1d8[_0x22de('0x1d')]&&_0x3f53f5[_0x22de('0xf')]('qd-am-elem-'+_0x38f1d8[_0x22de('0x39')]()[_0x22de('0x3a')]()[_0x22de('0x2c')]()[_0x22de('0x3b')]()[_0x22de('0x15')](/\./g,'')['replace'](/\s/g,'-')['toLowerCase']());});var _0x6fa573=_0x2a9ad5[_0x22de('0x35')](_0x22de('0x3c'))[_0x22de('0xe')]();_0x2a9ad5[_0x22de('0xf')](_0x22de('0x3d'));_0x6fa573=_0x6fa573['find'](_0x22de('0x3e'));_0x6fa573[_0x22de('0x23')](function(){var _0x5591f7=_0x397f80(this);_0x5591f7['find'](_0x22de('0x3c'))[_0x22de('0xe')]()['addClass'](_0x22de('0x3f'));_0x5591f7[_0x22de('0xf')]('qd-am-dropdown-menu');_0x5591f7[_0x22de('0x1e')]()[_0x22de('0xf')]('qd-am-dropdown');});_0x6fa573[_0x22de('0xf')](_0x22de('0x40'));var _0x251b3b=0x0,_0x46057b=function(_0x25b382){_0x251b3b+=0x1;_0x25b382=_0x25b382[_0x22de('0x37')]('li')[_0x22de('0x37')]('*');_0x25b382['length']&&(_0x25b382[_0x22de('0xf')](_0x22de('0x41')+_0x251b3b),_0x46057b(_0x25b382));};_0x46057b(_0x2a9ad5);_0x2a9ad5[_0x22de('0x42')](_0x2a9ad5[_0x22de('0x35')]('ul'))[_0x22de('0x23')](function(){var _0x2d18cf=_0x397f80(this);_0x2d18cf[_0x22de('0xf')](_0x22de('0x43')+_0x2d18cf[_0x22de('0x37')]('li')[_0x22de('0x1d')]+'-li');});});_0x25df62(_0x14473d);_0x3c91ac[_0x22de('0x44')][_0x22de('0x30')](this);_0x397f80(window)['trigger']('QuatroDigital.am.callback',_0x34636a);};_0x397f80['fn'][_0x22de('0x2')]=function(_0x5af784){var _0x3e0593=_0x397f80(this);if(!_0x3e0593['length'])return _0x3e0593;_0x3c91ac=_0x397f80[_0x22de('0x45')]({},_0x409958,_0x5af784);_0x3e0593[_0x22de('0x46')]=new _0x397f80['QD_amazingMenu'](_0x397f80(this));return _0x3e0593;};_0x397f80(function(){_0x397f80(_0x22de('0x47'))[_0x22de('0x2')]();});}}(this));

/* Quatro Digital Smart Cart */
var _0x61c7=['getCartInfoByUrl','cartIsEmpty','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','html','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','emptyCart','each','call','add','.qd-ddc-infoTotalValue','total','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','allTotal','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','getOrderForm','_QuatroDigital_AmountProduct','function','exec','addClass','qd-ddc-prodLoaded','QD_checkoutQueue','items','totalizers','shippingData','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','attr','qd-ddc-','availability','.qd-ddc-prodPrice','sellingPrice','meta[name=currency]','content','quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','getParent','address','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','message','lastSku','filter','[data-sku=\x27','outerHeight','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','load','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','actionButtons','data-sku-index','changeQantity','data-sku','.qd-ddc-prodQttWrapper:not(.qd_on)','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','.qd-ddc-quantity','keyup.qd_ddc_change','stop','slideUp','remove','shippingCalculate','$1-$2$3','data','qdDdcLastPostalCode','calculateShipping','BRA','done','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','removeProduct','simpleCart','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','Oooops!\x20','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','prodId','qtt','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','prepend','ajaxStop','.qdDdcContainer','QD_smartCart','extend','dropDown','buyButton','selector','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','closest','replace','abs','undefined','pow','toFixed','round','split','length','join','_QuatroDigital_CartData','callback','Callbacks','error','object','info','warn','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','toLowerCase','aviso','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','name','smartCheckout','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','find','click.qd_ddc_closeFn','removeClass','qd-bb-lightBoxProdAdd','body','off','keyup.qd_ddc_closeFn','keyCode','qd-bb-lightBoxBodyProdAdd','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20input','val','keyup.qd_ddc_cep','updateOnlyHover'];(function(_0x82129b,_0x484ae9){var _0x2ae5dc=function(_0x299e34){while(--_0x299e34){_0x82129b['push'](_0x82129b['shift']());}};_0x2ae5dc(++_0x484ae9);}(_0x61c7,0x176));var _0x761c=function(_0xe30eb8,_0x3c0963){_0xe30eb8=_0xe30eb8-0x0;var _0x1674e8=_0x61c7[_0xe30eb8];return _0x1674e8;};(function(_0x53cb68){_0x53cb68['fn']['getParent']=_0x53cb68['fn'][_0x761c('0x0')];}(jQuery));function qd_number_format(_0x959420,_0x490e55,_0x342f6b,_0x43e9cb){_0x959420=(_0x959420+'')[_0x761c('0x1')](/[^0-9+\-Ee.]/g,'');_0x959420=isFinite(+_0x959420)?+_0x959420:0x0;_0x490e55=isFinite(+_0x490e55)?Math[_0x761c('0x2')](_0x490e55):0x0;_0x43e9cb=_0x761c('0x3')===typeof _0x43e9cb?',':_0x43e9cb;_0x342f6b=_0x761c('0x3')===typeof _0x342f6b?'.':_0x342f6b;var _0x5db19a='',_0x5db19a=function(_0x3dcd65,_0x9ab40a){var _0x490e55=Math[_0x761c('0x4')](0xa,_0x9ab40a);return''+(Math['round'](_0x3dcd65*_0x490e55)/_0x490e55)[_0x761c('0x5')](_0x9ab40a);},_0x5db19a=(_0x490e55?_0x5db19a(_0x959420,_0x490e55):''+Math[_0x761c('0x6')](_0x959420))[_0x761c('0x7')]('.');0x3<_0x5db19a[0x0]['length']&&(_0x5db19a[0x0]=_0x5db19a[0x0][_0x761c('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x43e9cb));(_0x5db19a[0x1]||'')[_0x761c('0x8')]<_0x490e55&&(_0x5db19a[0x1]=_0x5db19a[0x1]||'',_0x5db19a[0x1]+=Array(_0x490e55-_0x5db19a[0x1][_0x761c('0x8')]+0x1)['join']('0'));return _0x5db19a[_0x761c('0x9')](_0x342f6b);};(function(){try{window['_QuatroDigital_CartData']=window[_0x761c('0xa')]||{},window[_0x761c('0xa')][_0x761c('0xb')]=window[_0x761c('0xa')]['callback']||$[_0x761c('0xc')]();}catch(_0x11789a){_0x761c('0x3')!==typeof console&&'function'===typeof console['error']&&console[_0x761c('0xd')]('Oooops!\x20',_0x11789a['message']);}}());(function(_0x57ff7f){try{var _0x49cfe1=jQuery,_0x23822a=function(_0xff4464,_0x3a0443){if(_0x761c('0xe')===typeof console&&_0x761c('0x3')!==typeof console[_0x761c('0xd')]&&_0x761c('0x3')!==typeof console[_0x761c('0xf')]&&_0x761c('0x3')!==typeof console[_0x761c('0x10')]){var _0x90084c;_0x761c('0xe')===typeof _0xff4464?(_0xff4464['unshift'](_0x761c('0x11')),_0x90084c=_0xff4464):_0x90084c=[_0x761c('0x11')+_0xff4464];if(_0x761c('0x3')===typeof _0x3a0443||_0x761c('0x12')!==_0x3a0443[_0x761c('0x13')]()&&_0x761c('0x14')!==_0x3a0443[_0x761c('0x13')]())if(_0x761c('0x3')!==typeof _0x3a0443&&_0x761c('0xf')===_0x3a0443[_0x761c('0x13')]())try{console['info'][_0x761c('0x15')](console,_0x90084c);}catch(_0x5567fe){try{console[_0x761c('0xf')](_0x90084c['join']('\x0a'));}catch(_0x2aea5c){}}else try{console[_0x761c('0xd')]['apply'](console,_0x90084c);}catch(_0x489e5c){try{console[_0x761c('0xd')](_0x90084c[_0x761c('0x9')]('\x0a'));}catch(_0x5cebe7){}}else try{console[_0x761c('0x10')]['apply'](console,_0x90084c);}catch(_0x2f482d){try{console[_0x761c('0x10')](_0x90084c['join']('\x0a'));}catch(_0x1ecdf2){}}}};window['_QuatroDigital_DropDown']=window[_0x761c('0x16')]||{};window[_0x761c('0x16')][_0x761c('0x17')]=!0x0;_0x49cfe1[_0x761c('0x18')]=function(){};_0x49cfe1['fn'][_0x761c('0x18')]=function(){return{'fn':new _0x49cfe1()};};var _0x431e86=function(_0x1975ab){var _0xe7664b={'t':_0x761c('0x19')};return function(_0x1ada14){var _0xa7fcb8=function(_0x218a75){return _0x218a75;};var _0x5d6ba2=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x1ada14=_0x1ada14['d'+_0x5d6ba2[0x10]+'c'+_0x5d6ba2[0x11]+'m'+_0xa7fcb8(_0x5d6ba2[0x1])+'n'+_0x5d6ba2[0xd]]['l'+_0x5d6ba2[0x12]+'c'+_0x5d6ba2[0x0]+'ti'+_0xa7fcb8('o')+'n'];var _0x28554f=function(_0x9d9bd7){return escape(encodeURIComponent(_0x9d9bd7[_0x761c('0x1')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x32f51f){return String[_0x761c('0x1a')](('Z'>=_0x32f51f?0x5a:0x7a)>=(_0x32f51f=_0x32f51f['charCodeAt'](0x0)+0xd)?_0x32f51f:_0x32f51f-0x1a);})));};var _0x374453=_0x28554f(_0x1ada14[[_0x5d6ba2[0x9],_0xa7fcb8('o'),_0x5d6ba2[0xc],_0x5d6ba2[_0xa7fcb8(0xd)]][_0x761c('0x9')]('')]);_0x28554f=_0x28554f((window[['js',_0xa7fcb8('no'),'m',_0x5d6ba2[0x1],_0x5d6ba2[0x4]['toUpperCase'](),_0x761c('0x1b')][_0x761c('0x9')]('')]||_0x761c('0x1c'))+['.v',_0x5d6ba2[0xd],'e',_0xa7fcb8('x'),'co',_0xa7fcb8('mm'),_0x761c('0x1d'),_0x5d6ba2[0x1],'.c',_0xa7fcb8('o'),'m.',_0x5d6ba2[0x13],'r'][_0x761c('0x9')](''));for(var _0x5ab361 in _0xe7664b){if(_0x28554f===_0x5ab361+_0xe7664b[_0x5ab361]||_0x374453===_0x5ab361+_0xe7664b[_0x5ab361]){var _0x472fad='tr'+_0x5d6ba2[0x11]+'e';break;}_0x472fad='f'+_0x5d6ba2[0x0]+'ls'+_0xa7fcb8(_0x5d6ba2[0x1])+'';}_0xa7fcb8=!0x1;-0x1<_0x1ada14[[_0x5d6ba2[0xc],'e',_0x5d6ba2[0x0],'rc',_0x5d6ba2[0x9]][_0x761c('0x9')]('')][_0x761c('0x1e')](_0x761c('0x1f'))&&(_0xa7fcb8=!0x0);return[_0x472fad,_0xa7fcb8];}(_0x1975ab);}(window);if(!eval(_0x431e86[0x0]))return _0x431e86[0x1]?_0x23822a(_0x761c('0x20')):!0x1;_0x49cfe1[_0x761c('0x18')]=function(_0xb6c248,_0x1a1d5a){var _0x9f662e=_0x49cfe1(_0xb6c248);if(!_0x9f662e['length'])return _0x9f662e;var _0x5cf2de=_0x49cfe1['extend'](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x761c('0x21'),'linkCheckout':_0x761c('0x22'),'cartTotal':_0x761c('0x23'),'emptyCart':_0x761c('0x24'),'continueShopping':_0x761c('0x25'),'shippingForm':_0x761c('0x26')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x2fba20){return _0x2fba20[_0x761c('0x27')]||_0x2fba20[_0x761c('0x28')];},'callback':function(){},'callbackProductsList':function(){}},_0x1a1d5a);_0x49cfe1('');var _0x5040c3=this;if(_0x5cf2de[_0x761c('0x29')]){var _0x464e9d=!0x1;_0x761c('0x3')===typeof window[_0x761c('0x2a')]&&(_0x23822a(_0x761c('0x2b')),_0x49cfe1[_0x761c('0x2c')]({'url':_0x761c('0x2d'),'async':!0x1,'dataType':_0x761c('0x2e'),'error':function(){_0x23822a(_0x761c('0x2f'));_0x464e9d=!0x0;}}));if(_0x464e9d)return _0x23822a(_0x761c('0x30'));}if(_0x761c('0xe')===typeof window[_0x761c('0x2a')]&&_0x761c('0x3')!==typeof window[_0x761c('0x2a')][_0x761c('0x31')])var _0x57ff7f=window[_0x761c('0x2a')][_0x761c('0x31')];else if(_0x761c('0xe')===typeof vtex&&_0x761c('0xe')===typeof vtex[_0x761c('0x31')]&&_0x761c('0x3')!==typeof vtex['checkout'][_0x761c('0x32')])_0x57ff7f=new vtex[(_0x761c('0x31'))][(_0x761c('0x32'))]();else return _0x23822a(_0x761c('0x33'));_0x5040c3[_0x761c('0x34')]=_0x761c('0x35');var _0x38925d=function(_0x373d6e){_0x49cfe1(this)[_0x761c('0x36')](_0x373d6e);_0x373d6e[_0x761c('0x37')]('.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose')['add'](_0x49cfe1('.qd_ddc_lightBoxOverlay'))['on'](_0x761c('0x38'),function(){_0x9f662e[_0x761c('0x39')](_0x761c('0x3a'));_0x49cfe1(document[_0x761c('0x3b')])[_0x761c('0x39')]('qd-bb-lightBoxBodyProdAdd');});_0x49cfe1(document)[_0x761c('0x3c')](_0x761c('0x3d'))['on']('keyup.qd_ddc_closeFn',function(_0x298cce){0x1b==_0x298cce[_0x761c('0x3e')]&&(_0x9f662e[_0x761c('0x39')](_0x761c('0x3a')),_0x49cfe1(document[_0x761c('0x3b')])[_0x761c('0x39')](_0x761c('0x3f')));});var _0x4faf1d=_0x373d6e['find'](_0x761c('0x40'));_0x373d6e[_0x761c('0x37')](_0x761c('0x41'))['on'](_0x761c('0x42'),function(){_0x5040c3[_0x761c('0x43')]('-',void 0x0,void 0x0,_0x4faf1d);return!0x1;});_0x373d6e[_0x761c('0x37')](_0x761c('0x44'))['on'](_0x761c('0x45'),function(){_0x5040c3[_0x761c('0x43')](void 0x0,void 0x0,void 0x0,_0x4faf1d);return!0x1;});_0x373d6e['find'](_0x761c('0x46'))[_0x761c('0x47')]('')['on'](_0x761c('0x48'),function(){_0x5040c3['shippingCalculate'](_0x49cfe1(this));});if(_0x5cf2de[_0x761c('0x49')]){var _0x1a1d5a=0x0;_0x49cfe1(this)['on']('mouseenter.qd_ddc_hover',function(){var _0x373d6e=function(){window[_0x761c('0x16')][_0x761c('0x17')]&&(_0x5040c3[_0x761c('0x4a')](),window[_0x761c('0x16')]['allowUpdate']=!0x1,_0x49cfe1['fn']['simpleCart'](!0x0),_0x5040c3[_0x761c('0x4b')]());};_0x1a1d5a=setInterval(function(){_0x373d6e();},0x258);_0x373d6e();});_0x49cfe1(this)['on']('mouseleave.qd_ddc_hover',function(){clearInterval(_0x1a1d5a);});}};var _0x5c7ece=function(_0x45d97b){_0x45d97b=_0x49cfe1(_0x45d97b);_0x5cf2de[_0x761c('0x4c')]['cartTotal']=_0x5cf2de['texts'][_0x761c('0x4d')][_0x761c('0x1')](_0x761c('0x4e'),_0x761c('0x4f'));_0x5cf2de[_0x761c('0x4c')][_0x761c('0x4d')]=_0x5cf2de['texts']['cartTotal']['replace'](_0x761c('0x50'),'<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>');_0x5cf2de[_0x761c('0x4c')][_0x761c('0x4d')]=_0x5cf2de[_0x761c('0x4c')]['cartTotal'][_0x761c('0x1')](_0x761c('0x51'),_0x761c('0x52'));_0x5cf2de[_0x761c('0x4c')][_0x761c('0x4d')]=_0x5cf2de[_0x761c('0x4c')]['cartTotal'][_0x761c('0x1')]('#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0x45d97b[_0x761c('0x37')]('.qd-ddc-viewCart')[_0x761c('0x53')](_0x5cf2de[_0x761c('0x4c')][_0x761c('0x54')]);_0x45d97b[_0x761c('0x37')](_0x761c('0x55'))[_0x761c('0x53')](_0x5cf2de['texts'][_0x761c('0x56')]);_0x45d97b['find'](_0x761c('0x57'))['html'](_0x5cf2de[_0x761c('0x4c')][_0x761c('0x58')]);_0x45d97b[_0x761c('0x37')](_0x761c('0x59'))[_0x761c('0x53')](_0x5cf2de['texts']['cartTotal']);_0x45d97b['find'](_0x761c('0x5a'))[_0x761c('0x53')](_0x5cf2de[_0x761c('0x4c')][_0x761c('0x5b')]);_0x45d97b['find'](_0x761c('0x5c'))[_0x761c('0x53')](_0x5cf2de['texts'][_0x761c('0x5d')]);return _0x45d97b;}(this['cartContainer']);var _0x46bb81=0x0;_0x9f662e[_0x761c('0x5e')](function(){0x0<_0x46bb81?_0x38925d[_0x761c('0x5f')](this,_0x5c7ece['clone']()):_0x38925d[_0x761c('0x5f')](this,_0x5c7ece);_0x46bb81++;});window[_0x761c('0xa')]['callback'][_0x761c('0x60')](function(){_0x49cfe1(_0x761c('0x61'))['html'](window[_0x761c('0xa')][_0x761c('0x62')]||'--');_0x49cfe1(_0x761c('0x63'))['html'](window[_0x761c('0xa')]['qtt']||'0');_0x49cfe1(_0x761c('0x64'))['html'](window[_0x761c('0xa')][_0x761c('0x65')]||'--');_0x49cfe1(_0x761c('0x66'))[_0x761c('0x53')](window[_0x761c('0xa')][_0x761c('0x67')]||'--');});var _0x23dbb8=function(_0x372e62,_0x18e27c){if(_0x761c('0x3')===typeof _0x372e62['items'])return _0x23822a('Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição');_0x5040c3[_0x761c('0x68')]['call'](this,_0x18e27c);};_0x5040c3[_0x761c('0x4a')]=function(_0x57080e,_0x274a9e){_0x761c('0x3')!=typeof _0x274a9e?window['_QuatroDigital_DropDown'][_0x761c('0x69')]=_0x274a9e:window[_0x761c('0x16')][_0x761c('0x69')]&&(_0x274a9e=window['_QuatroDigital_DropDown'][_0x761c('0x69')]);setTimeout(function(){window[_0x761c('0x16')][_0x761c('0x69')]=void 0x0;},_0x5cf2de[_0x761c('0x6a')]);_0x49cfe1(_0x761c('0x6b'))[_0x761c('0x39')]('qd-ddc-prodLoaded');if(_0x5cf2de[_0x761c('0x29')]){var _0x1a1d5a=function(_0x3f083c){window['_QuatroDigital_DropDown'][_0x761c('0x6c')]=_0x3f083c;_0x23dbb8(_0x3f083c,_0x274a9e);'undefined'!==typeof window[_0x761c('0x6d')]&&_0x761c('0x6e')===typeof window[_0x761c('0x6d')][_0x761c('0x6f')]&&window[_0x761c('0x6d')][_0x761c('0x6f')][_0x761c('0x5f')](this);_0x49cfe1(_0x761c('0x6b'))[_0x761c('0x70')](_0x761c('0x71'));};_0x761c('0x3')!==typeof window[_0x761c('0x16')][_0x761c('0x6c')]?(_0x1a1d5a(window['_QuatroDigital_DropDown'][_0x761c('0x6c')]),_0x761c('0x6e')===typeof _0x57080e&&_0x57080e(window['_QuatroDigital_DropDown'][_0x761c('0x6c')])):_0x49cfe1[_0x761c('0x72')]([_0x761c('0x73'),_0x761c('0x74'),_0x761c('0x75')],{'done':function(_0x5d6849){_0x1a1d5a[_0x761c('0x5f')](this,_0x5d6849);_0x761c('0x6e')===typeof _0x57080e&&_0x57080e(_0x5d6849);},'fail':function(_0x4c262a){_0x23822a(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0x4c262a]);}});}else alert('Este\x20método\x20esta\x20descontinuado!');};_0x5040c3['cartIsEmpty']=function(){var _0x20b372=_0x49cfe1('.qd-ddc-wrapper');_0x20b372[_0x761c('0x37')](_0x761c('0x76'))[_0x761c('0x8')]?_0x20b372['removeClass'](_0x761c('0x77')):_0x20b372[_0x761c('0x70')](_0x761c('0x77'));};_0x5040c3['renderProductsList']=function(_0x53408c){var _0x1a1d5a=_0x49cfe1(_0x761c('0x78'));_0x1a1d5a[_0x761c('0x79')]();_0x1a1d5a[_0x761c('0x5e')](function(){var _0x1a1d5a=_0x49cfe1(this),_0x48da76,_0xb6c248,_0x2c03c3=_0x49cfe1(''),_0x4ce753;for(_0x4ce753 in window[_0x761c('0x16')][_0x761c('0x6c')]['items'])if(_0x761c('0xe')===typeof window[_0x761c('0x16')][_0x761c('0x6c')][_0x761c('0x73')][_0x4ce753]){var _0x362f14=window[_0x761c('0x16')][_0x761c('0x6c')][_0x761c('0x73')][_0x4ce753];var _0x1ef6b7=_0x362f14[_0x761c('0x7a')][_0x761c('0x1')](/^\/|\/$/g,'')[_0x761c('0x7')]('/');var _0x2e6099=_0x49cfe1(_0x761c('0x7b'));_0x2e6099[_0x761c('0x7c')]({'data-sku':_0x362f14['id'],'data-sku-index':_0x4ce753,'data-qd-departament':_0x1ef6b7[0x0],'data-qd-category':_0x1ef6b7[_0x1ef6b7[_0x761c('0x8')]-0x1]});_0x2e6099[_0x761c('0x70')](_0x761c('0x7d')+_0x362f14[_0x761c('0x7e')]);_0x2e6099[_0x761c('0x37')]('.qd-ddc-prodName')['append'](_0x5cf2de[_0x761c('0x27')](_0x362f14));_0x2e6099['find'](_0x761c('0x7f'))['append'](isNaN(_0x362f14['sellingPrice'])?_0x362f14[_0x761c('0x80')]:0x0==_0x362f14[_0x761c('0x80')]?'Grátis':(_0x49cfe1(_0x761c('0x81'))[_0x761c('0x7c')](_0x761c('0x82'))||'R$')+'\x20'+qd_number_format(_0x362f14[_0x761c('0x80')]/0x64,0x2,',','.'));_0x2e6099[_0x761c('0x37')]('.qd-ddc-quantity')[_0x761c('0x7c')]({'data-sku':_0x362f14['id'],'data-sku-index':_0x4ce753})[_0x761c('0x47')](_0x362f14[_0x761c('0x83')]);_0x2e6099[_0x761c('0x37')](_0x761c('0x84'))[_0x761c('0x7c')]({'data-sku':_0x362f14['id'],'data-sku-index':_0x4ce753});_0x5040c3[_0x761c('0x85')](_0x362f14['id'],_0x2e6099[_0x761c('0x37')](_0x761c('0x86')),_0x362f14[_0x761c('0x87')]);_0x2e6099['find'](_0x761c('0x88'))[_0x761c('0x7c')]({'data-sku':_0x362f14['id'],'data-sku-index':_0x4ce753});_0x2e6099[_0x761c('0x89')](_0x1a1d5a);_0x2c03c3=_0x2c03c3[_0x761c('0x60')](_0x2e6099);}try{var _0x57ff7f=_0x1a1d5a[_0x761c('0x8a')](_0x761c('0x6b'))[_0x761c('0x37')]('.qd-ddc-shipping\x20input');_0x57ff7f[_0x761c('0x8')]&&''==_0x57ff7f[_0x761c('0x47')]()&&window['_QuatroDigital_DropDown'][_0x761c('0x6c')][_0x761c('0x75')]['address']&&_0x57ff7f[_0x761c('0x47')](window[_0x761c('0x16')][_0x761c('0x6c')][_0x761c('0x75')][_0x761c('0x8b')]['postalCode']);}catch(_0x376358){_0x23822a(_0x761c('0x8c')+_0x376358[_0x761c('0x8d')],_0x761c('0x14'));}_0x5040c3['actionButtons'](_0x1a1d5a);_0x5040c3[_0x761c('0x4b')]();_0x53408c&&_0x53408c[_0x761c('0x8e')]&&function(){_0xb6c248=_0x2c03c3[_0x761c('0x8f')](_0x761c('0x90')+_0x53408c[_0x761c('0x8e')]+'\x27]');_0xb6c248[_0x761c('0x8')]&&(_0x48da76=0x0,_0x2c03c3['each'](function(){var _0x53408c=_0x49cfe1(this);if(_0x53408c['is'](_0xb6c248))return!0x1;_0x48da76+=_0x53408c[_0x761c('0x91')]();}),_0x5040c3[_0x761c('0x43')](void 0x0,void 0x0,_0x48da76,_0x1a1d5a[_0x761c('0x60')](_0x1a1d5a[_0x761c('0x92')]())),_0x2c03c3[_0x761c('0x39')](_0x761c('0x93')),function(_0x5cd17e){_0x5cd17e[_0x761c('0x70')](_0x761c('0x94'));_0x5cd17e['addClass'](_0x761c('0x93'));setTimeout(function(){_0x5cd17e[_0x761c('0x39')]('qd-ddc-lastAdded');},_0x5cf2de[_0x761c('0x6a')]);}(_0xb6c248),_0x49cfe1(document[_0x761c('0x3b')])['addClass'](_0x761c('0x95')),setTimeout(function(){_0x49cfe1(document[_0x761c('0x3b')])['removeClass']('qd-ddc-product-add-time-v2');},_0x5cf2de[_0x761c('0x6a')]));}();});(function(){_QuatroDigital_DropDown[_0x761c('0x6c')][_0x761c('0x73')][_0x761c('0x8')]?(_0x49cfe1(_0x761c('0x3b'))[_0x761c('0x39')](_0x761c('0x96'))[_0x761c('0x70')](_0x761c('0x97')),setTimeout(function(){_0x49cfe1(_0x761c('0x3b'))[_0x761c('0x39')]('qd-ddc-product-add-time');},_0x5cf2de[_0x761c('0x6a')])):_0x49cfe1(_0x761c('0x3b'))['removeClass'](_0x761c('0x98'))[_0x761c('0x70')]('qd-ddc-cart-empty');}());_0x761c('0x6e')===typeof _0x5cf2de[_0x761c('0x99')]?_0x5cf2de[_0x761c('0x99')][_0x761c('0x5f')](this):_0x23822a(_0x761c('0x9a'));};_0x5040c3[_0x761c('0x85')]=function(_0x594b8b,_0x3bc8f7,_0xc695d1){function _0x3781a4(){_0x3bc8f7['removeClass'](_0x761c('0x9b'))[_0x761c('0x9c')](function(){_0x49cfe1(this)['addClass'](_0x761c('0x9b'));})[_0x761c('0x7c')](_0x761c('0x9d'),_0xc695d1);}_0xc695d1?_0x3781a4():isNaN(_0x594b8b)?_0x23822a(_0x761c('0x9e'),_0x761c('0x12')):alert('Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.');};_0x5040c3[_0x761c('0x9f')]=function(_0x13be98){var _0x1a1d5a=function(_0x1ba2b8,_0x264693){var _0x49d660=_0x49cfe1(_0x1ba2b8);var _0x5da95e=_0x49d660['attr']('data-sku');var _0xb6c248=_0x49d660[_0x761c('0x7c')](_0x761c('0xa0'));if(_0x5da95e){var _0x2cb8e1=parseInt(_0x49d660[_0x761c('0x47')]())||0x1;_0x5040c3[_0x761c('0xa1')]([_0x5da95e,_0xb6c248],_0x2cb8e1,_0x2cb8e1+0x1,function(_0x19a0f1){_0x49d660[_0x761c('0x47')](_0x19a0f1);_0x761c('0x6e')===typeof _0x264693&&_0x264693();});}};var _0x2da690=function(_0x146d6c,_0x10a79e){var _0x5b8cbe=_0x49cfe1(_0x146d6c);var _0xb6c248=_0x5b8cbe[_0x761c('0x7c')](_0x761c('0xa2'));var _0x1b2d1a=_0x5b8cbe[_0x761c('0x7c')](_0x761c('0xa0'));if(_0xb6c248){var _0x2bb4b9=parseInt(_0x5b8cbe['val']())||0x2;_0x5040c3[_0x761c('0xa1')]([_0xb6c248,_0x1b2d1a],_0x2bb4b9,_0x2bb4b9-0x1,function(_0x29e4b6){_0x5b8cbe[_0x761c('0x47')](_0x29e4b6);_0x761c('0x6e')===typeof _0x10a79e&&_0x10a79e();});}};var _0x4abdc3=function(_0x4c8d8d,_0x28d323){var _0x1a1d5a=_0x49cfe1(_0x4c8d8d);var _0xb6c248=_0x1a1d5a[_0x761c('0x7c')](_0x761c('0xa2'));var _0x25a409=_0x1a1d5a[_0x761c('0x7c')](_0x761c('0xa0'));if(_0xb6c248){var _0x12c4e8=parseInt(_0x1a1d5a[_0x761c('0x47')]())||0x1;_0x5040c3[_0x761c('0xa1')]([_0xb6c248,_0x25a409],0x1,_0x12c4e8,function(_0x3a49b5){_0x1a1d5a[_0x761c('0x47')](_0x3a49b5);_0x761c('0x6e')===typeof _0x28d323&&_0x28d323();});}};var _0xb6c248=_0x13be98['find'](_0x761c('0xa3'));_0xb6c248['addClass']('qd_on')[_0x761c('0x5e')](function(){var _0x13be98=_0x49cfe1(this);_0x13be98[_0x761c('0x37')](_0x761c('0xa4'))['on'](_0x761c('0xa5'),function(_0x37a8a0){_0x37a8a0['preventDefault']();_0xb6c248['addClass']('qd-loading');_0x1a1d5a(_0x13be98['find']('.qd-ddc-quantity'),function(){_0xb6c248[_0x761c('0x39')](_0x761c('0xa6'));});});_0x13be98['find'](_0x761c('0xa7'))['on'](_0x761c('0xa8'),function(_0x40cfd1){_0x40cfd1['preventDefault']();_0xb6c248['addClass']('qd-loading');_0x2da690(_0x13be98[_0x761c('0x37')]('.qd-ddc-quantity'),function(){_0xb6c248['removeClass'](_0x761c('0xa6'));});});_0x13be98['find']('.qd-ddc-quantity')['on'](_0x761c('0xa9'),function(){_0xb6c248[_0x761c('0x70')](_0x761c('0xa6'));_0x4abdc3(this,function(){_0xb6c248[_0x761c('0x39')](_0x761c('0xa6'));});});_0x13be98['find'](_0x761c('0xaa'))['on'](_0x761c('0xab'),function(_0x4e51c7){0xd==_0x4e51c7[_0x761c('0x3e')]&&(_0xb6c248[_0x761c('0x70')](_0x761c('0xa6')),_0x4abdc3(this,function(){_0xb6c248[_0x761c('0x39')](_0x761c('0xa6'));}));});});_0x13be98[_0x761c('0x37')](_0x761c('0x76'))[_0x761c('0x5e')](function(){var _0x13be98=_0x49cfe1(this);_0x13be98[_0x761c('0x37')](_0x761c('0x84'))['on']('click.qd_ddc_remove',function(){_0x13be98['addClass'](_0x761c('0xa6'));_0x5040c3['removeProduct'](_0x49cfe1(this),function(_0x47d77a){_0x47d77a?_0x13be98[_0x761c('0xac')](!0x0)[_0x761c('0xad')](function(){_0x13be98[_0x761c('0xae')]();_0x5040c3[_0x761c('0x4b')]();}):_0x13be98[_0x761c('0x39')](_0x761c('0xa6'));});return!0x1;});});};_0x5040c3[_0x761c('0xaf')]=function(_0x3d0204){var _0x54e2c7=_0x3d0204[_0x761c('0x47')]();_0x54e2c7=_0x54e2c7[_0x761c('0x1')](/[^0-9\-]/g,'');_0x54e2c7=_0x54e2c7[_0x761c('0x1')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x761c('0xb0'));_0x54e2c7=_0x54e2c7[_0x761c('0x1')](/(.{9}).*/g,'$1');_0x3d0204[_0x761c('0x47')](_0x54e2c7);0x9<=_0x54e2c7[_0x761c('0x8')]&&(_0x3d0204[_0x761c('0xb1')](_0x761c('0xb2'))!=_0x54e2c7&&_0x57ff7f[_0x761c('0xb3')]({'postalCode':_0x54e2c7,'country':_0x761c('0xb4')})[_0x761c('0xb5')](function(_0x1426f3){window['_QuatroDigital_DropDown'][_0x761c('0x6c')]=_0x1426f3;_0x5040c3['getCartInfoByUrl']();})[_0x761c('0xb6')](function(_0x1ee68e){_0x23822a([_0x761c('0xb7'),_0x1ee68e]);updateCartData();}),_0x3d0204[_0x761c('0xb1')](_0x761c('0xb2'),_0x54e2c7));};_0x5040c3[_0x761c('0xa1')]=function(_0x2145e0,_0x298b22,_0xca7940,_0x31bd42){function _0x23bcfc(_0x138ff0){_0x138ff0=_0x761c('0xb8')!==typeof _0x138ff0?!0x1:_0x138ff0;_0x5040c3[_0x761c('0x4a')]();window[_0x761c('0x16')][_0x761c('0x17')]=!0x1;_0x5040c3[_0x761c('0x4b')]();_0x761c('0x3')!==typeof window[_0x761c('0x6d')]&&_0x761c('0x6e')===typeof window[_0x761c('0x6d')]['exec']&&window[_0x761c('0x6d')][_0x761c('0x6f')][_0x761c('0x5f')](this);'function'===typeof adminCart&&adminCart();_0x49cfe1['fn']['simpleCart'](!0x0,void 0x0,_0x138ff0);_0x761c('0x6e')===typeof _0x31bd42&&_0x31bd42(_0x298b22);}_0xca7940=_0xca7940||0x1;if(0x1>_0xca7940)return _0x298b22;if(_0x5cf2de['smartCheckout']){if(_0x761c('0x3')===typeof window[_0x761c('0x16')][_0x761c('0x6c')][_0x761c('0x73')][_0x2145e0[0x1]])return _0x23822a(_0x761c('0xb9')+_0x2145e0[0x1]+']'),_0x298b22;window[_0x761c('0x16')][_0x761c('0x6c')][_0x761c('0x73')][_0x2145e0[0x1]][_0x761c('0x83')]=_0xca7940;window['_QuatroDigital_DropDown'][_0x761c('0x6c')][_0x761c('0x73')][_0x2145e0[0x1]][_0x761c('0xba')]=_0x2145e0[0x1];_0x57ff7f[_0x761c('0xbb')]([window[_0x761c('0x16')][_0x761c('0x6c')]['items'][_0x2145e0[0x1]]],[_0x761c('0x73'),_0x761c('0x74'),_0x761c('0x75')])[_0x761c('0xb5')](function(_0xb325d2){window[_0x761c('0x16')]['getOrderForm']=_0xb325d2;_0x23bcfc(!0x0);})[_0x761c('0xb6')](function(_0x563f15){_0x23822a([_0x761c('0xbc'),_0x563f15]);_0x23bcfc();});}else _0x23822a(_0x761c('0xbd'));};_0x5040c3[_0x761c('0xbe')]=function(_0x2bf05c,_0xfe46ef){function _0x2c9713(_0x2609b0){_0x2609b0=_0x761c('0xb8')!==typeof _0x2609b0?!0x1:_0x2609b0;_0x761c('0x3')!==typeof window['_QuatroDigital_AmountProduct']&&_0x761c('0x6e')===typeof window[_0x761c('0x6d')][_0x761c('0x6f')]&&window['_QuatroDigital_AmountProduct'][_0x761c('0x6f')][_0x761c('0x5f')](this);_0x761c('0x6e')===typeof adminCart&&adminCart();_0x49cfe1['fn'][_0x761c('0xbf')](!0x0,void 0x0,_0x2609b0);_0x761c('0x6e')===typeof _0xfe46ef&&_0xfe46ef(_0xb6c248);}var _0xb6c248=!0x1,_0x54e69a=_0x49cfe1(_0x2bf05c)[_0x761c('0x7c')](_0x761c('0xa0'));if(_0x5cf2de['smartCheckout']){if(_0x761c('0x3')===typeof window[_0x761c('0x16')][_0x761c('0x6c')][_0x761c('0x73')][_0x54e69a])return _0x23822a('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x54e69a+']'),_0xb6c248;window['_QuatroDigital_DropDown'][_0x761c('0x6c')][_0x761c('0x73')][_0x54e69a][_0x761c('0xba')]=_0x54e69a;_0x57ff7f[_0x761c('0xc0')]([window[_0x761c('0x16')][_0x761c('0x6c')][_0x761c('0x73')][_0x54e69a]],['items',_0x761c('0x74'),_0x761c('0x75')])[_0x761c('0xb5')](function(_0x4cca0d){_0xb6c248=!0x0;window[_0x761c('0x16')][_0x761c('0x6c')]=_0x4cca0d;_0x23dbb8(_0x4cca0d);_0x2c9713(!0x0);})['fail'](function(_0x37d998){_0x23822a([_0x761c('0xc1'),_0x37d998]);_0x2c9713();});}else alert('Atenção,\x20este\x20método\x20esta\x20descontinuado.');};_0x5040c3[_0x761c('0x43')]=function(_0x14b40d,_0x4eca89,_0x3636a9,_0x52ed5f){_0x52ed5f=_0x52ed5f||_0x49cfe1(_0x761c('0xc2'));_0x14b40d=_0x14b40d||'+';_0x4eca89=_0x4eca89||0.9*_0x52ed5f[_0x761c('0xc3')]();_0x52ed5f[_0x761c('0xac')](!0x0,!0x0)[_0x761c('0xc4')]({'scrollTop':isNaN(_0x3636a9)?_0x14b40d+'='+_0x4eca89+'px':_0x3636a9});};_0x5cf2de[_0x761c('0x49')]||(_0x5040c3[_0x761c('0x4a')](),_0x49cfe1['fn']['simpleCart'](!0x0));_0x49cfe1(window)['on']('productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex',function(){try{window[_0x761c('0x16')][_0x761c('0x6c')]=void 0x0,_0x5040c3[_0x761c('0x4a')]();}catch(_0x1be748){_0x23822a(_0x761c('0xc5')+_0x1be748[_0x761c('0x8d')],_0x761c('0xc6'));}});_0x761c('0x6e')===typeof _0x5cf2de['callback']?_0x5cf2de[_0x761c('0xb')]['call'](this):_0x23822a(_0x761c('0xc7'));};_0x49cfe1['fn'][_0x761c('0x18')]=function(_0x52e842){var _0x3984ef=_0x49cfe1(this);_0x3984ef['fn']=new _0x49cfe1[(_0x761c('0x18'))](this,_0x52e842);return _0x3984ef;};}catch(_0x4c43b1){'undefined'!==typeof console&&_0x761c('0x6e')===typeof console[_0x761c('0xd')]&&console[_0x761c('0xd')](_0x761c('0xc8'),_0x4c43b1);}}(this));(function(_0x4e7f0d){try{var _0x5ab99d=jQuery;window[_0x761c('0x6d')]=window[_0x761c('0x6d')]||{};window[_0x761c('0x6d')][_0x761c('0x73')]={};window[_0x761c('0x6d')][_0x761c('0xc9')]=!0x1;window['_QuatroDigital_AmountProduct'][_0x761c('0xca')]=!0x1;window[_0x761c('0x6d')][_0x761c('0xcb')]=!0x1;var _0x1cd059=function(){if(window[_0x761c('0x6d')][_0x761c('0xc9')]){var _0x118eff=!0x1;var _0x1a4cf1={};window[_0x761c('0x6d')]['items']={};for(_0x3bc312 in window[_0x761c('0x16')][_0x761c('0x6c')][_0x761c('0x73')])if(_0x761c('0xe')===typeof window[_0x761c('0x16')]['getOrderForm'][_0x761c('0x73')][_0x3bc312]){var _0x5342f8=window['_QuatroDigital_DropDown'][_0x761c('0x6c')]['items'][_0x3bc312];'undefined'!==typeof _0x5342f8[_0x761c('0xcc')]&&null!==_0x5342f8['productId']&&''!==_0x5342f8[_0x761c('0xcc')]&&(window[_0x761c('0x6d')]['items']['prod_'+_0x5342f8[_0x761c('0xcc')]]=window[_0x761c('0x6d')][_0x761c('0x73')][_0x761c('0xcd')+_0x5342f8['productId']]||{},window[_0x761c('0x6d')][_0x761c('0x73')][_0x761c('0xcd')+_0x5342f8[_0x761c('0xcc')]][_0x761c('0xce')]=_0x5342f8[_0x761c('0xcc')],_0x1a4cf1[_0x761c('0xcd')+_0x5342f8['productId']]||(window['_QuatroDigital_AmountProduct'][_0x761c('0x73')][_0x761c('0xcd')+_0x5342f8[_0x761c('0xcc')]][_0x761c('0xcf')]=0x0),window[_0x761c('0x6d')][_0x761c('0x73')][_0x761c('0xcd')+_0x5342f8[_0x761c('0xcc')]][_0x761c('0xcf')]+=_0x5342f8[_0x761c('0x83')],_0x118eff=!0x0,_0x1a4cf1[_0x761c('0xcd')+_0x5342f8['productId']]=!0x0);}var _0x3bc312=_0x118eff;}else _0x3bc312=void 0x0;window['_QuatroDigital_AmountProduct']['allowRecalculate']&&(_0x5ab99d(_0x761c('0xd0'))[_0x761c('0xae')](),_0x5ab99d(_0x761c('0xd1'))[_0x761c('0x39')](_0x761c('0xd2')));for(var _0x577518 in window[_0x761c('0x6d')][_0x761c('0x73')]){_0x5342f8=window['_QuatroDigital_AmountProduct'][_0x761c('0x73')][_0x577518];if('object'!==typeof _0x5342f8)return;_0x1a4cf1=_0x5ab99d(_0x761c('0xd3')+_0x5342f8[_0x761c('0xce')]+']')[_0x761c('0x8a')]('li');if(window[_0x761c('0x6d')][_0x761c('0xc9')]||!_0x1a4cf1['find'](_0x761c('0xd0'))[_0x761c('0x8')])_0x118eff=_0x5ab99d(_0x761c('0xd4')),_0x118eff[_0x761c('0x37')](_0x761c('0xd5'))['html'](_0x5342f8['qtt']),_0x5342f8=_0x1a4cf1[_0x761c('0x37')]('.qd_bap_wrapper_content'),_0x5342f8['length']?_0x5342f8[_0x761c('0xd6')](_0x118eff)[_0x761c('0x70')]('qd-bap-item-added'):_0x1a4cf1['prepend'](_0x118eff);}_0x3bc312&&(window[_0x761c('0x6d')]['allowRecalculate']=!0x1);};window[_0x761c('0x6d')][_0x761c('0x6f')]=function(){window[_0x761c('0x6d')][_0x761c('0xc9')]=!0x0;_0x1cd059[_0x761c('0x5f')](this);};_0x5ab99d(document)[_0x761c('0xd7')](function(){_0x1cd059[_0x761c('0x5f')](this);});}catch(_0x49890b){_0x761c('0x3')!==typeof console&&_0x761c('0x6e')===typeof console[_0x761c('0xd')]&&console[_0x761c('0xd')](_0x761c('0xc8'),_0x49890b);}}(this));(function(){try{var _0x49ce59=jQuery,_0x4bf2a2,_0x4bf58b={'selector':_0x761c('0xd8'),'dropDown':{},'buyButton':{}};_0x49ce59[_0x761c('0xd9')]=function(_0x5cb578){var _0xca9c5a={};_0x4bf2a2=_0x49ce59[_0x761c('0xda')](!0x0,{},_0x4bf58b,_0x5cb578);_0x5cb578=_0x49ce59(_0x4bf2a2['selector'])[_0x761c('0x18')](_0x4bf2a2[_0x761c('0xdb')]);_0xca9c5a[_0x761c('0xdc')]='undefined'!==typeof _0x4bf2a2[_0x761c('0xdb')]['updateOnlyHover']&&!0x1===_0x4bf2a2[_0x761c('0xdb')][_0x761c('0x49')]?_0x49ce59(_0x4bf2a2['selector'])['QD_buyButton'](_0x5cb578['fn'],_0x4bf2a2[_0x761c('0xdc')]):_0x49ce59(_0x4bf2a2[_0x761c('0xdd')])['QD_buyButton'](_0x4bf2a2[_0x761c('0xdc')]);_0xca9c5a['dropDown']=_0x5cb578;return _0xca9c5a;};_0x49ce59['fn'][_0x761c('0xde')]=function(){'object'===typeof console&&_0x761c('0x6e')===typeof console[_0x761c('0xf')]&&console[_0x761c('0xf')](_0x761c('0xdf'));};_0x49ce59[_0x761c('0xde')]=_0x49ce59['fn'][_0x761c('0xde')];}catch(_0x326a3c){'undefined'!==typeof console&&_0x761c('0x6e')===typeof console[_0x761c('0xd')]&&console[_0x761c('0xd')](_0x761c('0xc8'),_0x326a3c);}}());

/* Quatro Digital - Product Thumbs // Carlos Vinicius // Todos os direitos reservados. */
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs();a.trigger("QuatroDigital.pt_callback",[a])}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return a.length?$.extend({},a,new b(a)):a},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0x0d86=['.produto','object','alerta','toLowerCase','undefined','info','[Video\x20in\x20product]\x20','error','qdVideoInProduct','extend','start','td.value-field.Videos:first','http','div#image','text','replace','indexOf','youtube','push','split','pop','shift','<div\x20class=\x22qd-playerWrapper\x22></div>','wrap','<div\x20class=\x22qd-playerContainer\x22></div>','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','erc','join','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','html','<iframe\x20src=\x22','urlProtocol','://www.youtube.com/embed/','?wmode=transparent&rel=0&enablejsapi=1\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>','data','height','fadeTo','qdpv-video-on','stop','add','animate','find','iframe','a:not(\x27.qd-videoLink\x27)','bind','hide','removeAttr','style','removeClass','.qd-videoItem','length','call','string','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27','\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','.ON','addClass','.qd-playerWrapper\x20iframe','contentWindow','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','attr','rel','controlVideo','a:not(.qd-videoLink)','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','prependTo','trigger','QuatroDigital.pv_video_added','ajaxStop','ImageControl','.qd-videoLink','body'];(function(_0x2de4c5,_0x36528b){var _0x30dcfc=function(_0x4bdcfd){while(--_0x4bdcfd){_0x2de4c5['push'](_0x2de4c5['shift']());}};_0x30dcfc(++_0x36528b);}(_0x0d86,0x18f));var _0x60d8=function(_0x290923,_0x2aa482){_0x290923=_0x290923-0x0;var _0x344db7=_0x0d86[_0x290923];return _0x344db7;};(function(_0x5a65a0){$(function(){if($(document[_0x60d8('0x0')])['is'](_0x60d8('0x1'))){var _0x24e245=[];var _0x30255f=function(_0x1c8231,_0x2e2c5a){_0x60d8('0x2')===typeof console&&('undefined'!==typeof _0x2e2c5a&&_0x60d8('0x3')===_0x2e2c5a[_0x60d8('0x4')]()?console['warn']('[Video\x20in\x20product]\x20'+_0x1c8231):_0x60d8('0x5')!==typeof _0x2e2c5a&&_0x60d8('0x6')===_0x2e2c5a[_0x60d8('0x4')]()?console[_0x60d8('0x6')](_0x60d8('0x7')+_0x1c8231):console[_0x60d8('0x8')]('[Video\x20in\x20product]\x20'+_0x1c8231));};window['qdVideoInProduct']=window[_0x60d8('0x9')]||{};var _0xc07362=$[_0x60d8('0xa')](!0x0,{'insertThumbsIn':_0x60d8('0xb'),'videoFieldSelector':_0x60d8('0xc'),'controlVideo':!0x0,'urlProtocol':_0x60d8('0xd')},window[_0x60d8('0x9')]);var _0x940e6a=$('ul.thumbs');var _0x175108=$(_0x60d8('0xe'));var _0x39bd86=$(_0xc07362['videoFieldSelector'])[_0x60d8('0xf')]()[_0x60d8('0x10')](/\;\s*/,';')['split'](';');for(var _0x153dc0=0x0;_0x153dc0<_0x39bd86['length'];_0x153dc0++)-0x1<_0x39bd86[_0x153dc0][_0x60d8('0x11')](_0x60d8('0x12'))?_0x24e245[_0x60d8('0x13')](_0x39bd86[_0x153dc0][_0x60d8('0x14')]('v=')[_0x60d8('0x15')]()[_0x60d8('0x14')](/[&#]/)[_0x60d8('0x16')]()):-0x1<_0x39bd86[_0x153dc0]['indexOf']('youtu.be')&&_0x24e245[_0x60d8('0x13')](_0x39bd86[_0x153dc0]['split']('be/')[_0x60d8('0x15')]()[_0x60d8('0x14')](/[\?&#]/)['shift']());var _0x1c3185=$(_0x60d8('0x17'));_0x1c3185['prependTo']('#include');_0x1c3185[_0x60d8('0x18')](_0x60d8('0x19'));_0x39bd86=function(_0x43680c){var _0x27290d={'t':_0x60d8('0x1a')};return function(_0x30ae2d){var _0x5567a8=function(_0x3b4f3e){return _0x3b4f3e;};var _0x1d534f=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x30ae2d=_0x30ae2d['d'+_0x1d534f[0x10]+'c'+_0x1d534f[0x11]+'m'+_0x5567a8(_0x1d534f[0x1])+'n'+_0x1d534f[0xd]]['l'+_0x1d534f[0x12]+'c'+_0x1d534f[0x0]+'ti'+_0x5567a8('o')+'n'];var _0x2db074=function(_0x3ad0ac){return escape(encodeURIComponent(_0x3ad0ac['replace'](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x5a06b3){return String[_0x60d8('0x1b')](('Z'>=_0x5a06b3?0x5a:0x7a)>=(_0x5a06b3=_0x5a06b3[_0x60d8('0x1c')](0x0)+0xd)?_0x5a06b3:_0x5a06b3-0x1a);})));};var _0x1c9b43=_0x2db074(_0x30ae2d[[_0x1d534f[0x9],_0x5567a8('o'),_0x1d534f[0xc],_0x1d534f[_0x5567a8(0xd)]]['join']('')]);_0x2db074=_0x2db074((window[['js',_0x5567a8('no'),'m',_0x1d534f[0x1],_0x1d534f[0x4][_0x60d8('0x1d')](),_0x60d8('0x1e')]['join']('')]||'---')+['.v',_0x1d534f[0xd],'e',_0x5567a8('x'),'co',_0x5567a8('mm'),_0x60d8('0x1f'),_0x1d534f[0x1],'.c',_0x5567a8('o'),'m.',_0x1d534f[0x13],'r'][_0x60d8('0x20')](''));for(var _0x4e2f80 in _0x27290d){if(_0x2db074===_0x4e2f80+_0x27290d[_0x4e2f80]||_0x1c9b43===_0x4e2f80+_0x27290d[_0x4e2f80]){var _0x1a520b='tr'+_0x1d534f[0x11]+'e';break;}_0x1a520b='f'+_0x1d534f[0x0]+'ls'+_0x5567a8(_0x1d534f[0x1])+'';}_0x5567a8=!0x1;-0x1<_0x30ae2d[[_0x1d534f[0xc],'e',_0x1d534f[0x0],'rc',_0x1d534f[0x9]][_0x60d8('0x20')]('')][_0x60d8('0x11')](_0x60d8('0x21'))&&(_0x5567a8=!0x0);return[_0x1a520b,_0x5567a8];}(_0x43680c);}(window);if(!eval(_0x39bd86[0x0]))return _0x39bd86[0x1]?_0x30255f(_0x60d8('0x22')):!0x1;var _0x137129=function(_0x2ac577,_0x35ad11){_0x60d8('0x12')===_0x35ad11&&_0x1c3185[_0x60d8('0x23')](_0x60d8('0x24')+_0xc07362[_0x60d8('0x25')]+_0x60d8('0x26')+_0x2ac577+_0x60d8('0x27'));_0x175108[_0x60d8('0x28')]('height',_0x175108[_0x60d8('0x28')]('height')||_0x175108[_0x60d8('0x29')]());_0x175108['stop'](!0x0,!0x0)[_0x60d8('0x2a')](0x1f4,0x0,function(){$(_0x60d8('0x0'))['addClass'](_0x60d8('0x2b'));});_0x1c3185[_0x60d8('0x2c')](!0x0,!0x0)['fadeTo'](0x1f4,0x1,function(){_0x175108[_0x60d8('0x2d')](_0x1c3185)[_0x60d8('0x2e')]({'height':_0x1c3185[_0x60d8('0x2f')](_0x60d8('0x30'))[_0x60d8('0x29')]()},0x2bc);});};removePlayer=function(){_0x940e6a['find'](_0x60d8('0x31'))[_0x60d8('0x32')]('click.removeVideo',function(){_0x1c3185[_0x60d8('0x2c')](!0x0,!0x0)['fadeTo'](0x1f4,0x0,function(){$(this)[_0x60d8('0x33')]()[_0x60d8('0x34')](_0x60d8('0x35'));$(_0x60d8('0x0'))[_0x60d8('0x36')](_0x60d8('0x2b'));});_0x175108['stop'](!0x0,!0x0)['fadeTo'](0x1f4,0x1,function(){var _0x3447ff=_0x175108[_0x60d8('0x28')](_0x60d8('0x29'));_0x3447ff&&_0x175108[_0x60d8('0x2e')]({'height':_0x3447ff},0x2bc);});});};var _0x52ce13=function(){if(!_0x940e6a[_0x60d8('0x2f')](_0x60d8('0x37'))[_0x60d8('0x38')])for(vId in removePlayer[_0x60d8('0x39')](this),_0x24e245)if(_0x60d8('0x3a')===typeof _0x24e245[vId]&&''!==_0x24e245[vId]){var _0x372231=$(_0x60d8('0x3b')+_0x24e245[vId]+_0x60d8('0x3c')+_0x24e245[vId]+_0x60d8('0x3d')+_0x24e245[vId]+_0x60d8('0x3e'));_0x372231[_0x60d8('0x2f')]('a')[_0x60d8('0x32')]('click.playVideo',function(){var _0x105cbd=$(this);_0x940e6a[_0x60d8('0x2f')](_0x60d8('0x3f'))[_0x60d8('0x36')]('ON');_0x105cbd[_0x60d8('0x40')]('ON');0x1==_0xc07362['controlVideo']?$(_0x60d8('0x41'))[_0x60d8('0x38')]?(_0x137129[_0x60d8('0x39')](this,'',''),$('.qd-playerWrapper\x20iframe')[0x0][_0x60d8('0x42')][_0x60d8('0x43')](_0x60d8('0x44'),'*')):_0x137129[_0x60d8('0x39')](this,_0x105cbd[_0x60d8('0x45')](_0x60d8('0x46')),_0x60d8('0x12')):_0x137129[_0x60d8('0x39')](this,_0x105cbd['attr'](_0x60d8('0x46')),_0x60d8('0x12'));return!0x1;});0x1==_0xc07362[_0x60d8('0x47')]&&_0x940e6a['find'](_0x60d8('0x48'))['click'](function(_0x4c455a){$(_0x60d8('0x41'))[_0x60d8('0x38')]&&$(_0x60d8('0x41'))[0x0][_0x60d8('0x42')][_0x60d8('0x43')](_0x60d8('0x49'),'*');});_0x60d8('0xb')===_0xc07362['insertThumbsIn']?_0x372231[_0x60d8('0x4a')](_0x940e6a):_0x372231['appendTo'](_0x940e6a);_0x372231[_0x60d8('0x4b')](_0x60d8('0x4c'),[_0x24e245[vId],_0x372231]);}};$(document)[_0x60d8('0x4d')](_0x52ce13);$(window)['load'](_0x52ce13);(function(){var _0x1f3993=this;var _0x112b22=window['ImageControl']||function(){};window[_0x60d8('0x4e')]=function(_0x448eff,_0x58e2c7){$(_0x448eff||'')['is'](_0x60d8('0x4f'))||(_0x112b22['call'](this,_0x448eff,_0x58e2c7),_0x52ce13[_0x60d8('0x39')](_0x1f3993));};}());}});}(this));

/* Quatro Digital - Mosaic Banners // Carlos Vinicius // Todos os direitos reservados */
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

/* Quatro Digital - Smart Quantity // Carlos Vinicius // Todos os direitos reservados */
/* Quatro Digital - Smart Quantity // 1.12 // Carlos Vinicius // Todos os direitos reservados */
(function(v){var d=jQuery;if("function"!==typeof d.fn.QD_smartQuantity){var g=function(d,a){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var f;"object"===typeof d?(d.unshift("[Quatro Digital - Smart Quantity]\n"),f=d):f=["[Quatro Digital - Smart Quantity]\n"+d];if("undefined"===typeof a||"alerta"!==a.toLowerCase()&&"aviso"!==a.toLowerCase())if("undefined"!==typeof a&&"info"===a.toLowerCase())try{console.info.apply(console,
f)}catch(k){console.info(f.join("\n"))}else try{console.error.apply(console,f)}catch(k){console.error(f.join("\n"))}else try{console.warn.apply(console,f)}catch(k){console.warn(f.join("\n"))}}},m={buyButton:".buy-button",qttInput:".qd-sq-quantity",btnMore:".qd-sq-more",btnMinus:".qd-sq-minus",initialValue:1,minimumValue:1,setQuantityByUrl:!0},n=function(h,a){function f(c,e,b){a.setQuantityByUrl?c.val(((location.search||"").match(q)||[a.initialValue]).pop()):c.val(a.initialValue);c.change(function(c,
b){try{if("qd_ssl_trigger"!=b){var e=d(this),f=parseInt(e.val().replace(n,""));!isNaN(f)&&f>a.minimumValue?e.val(f):e.val(a.minimumValue);e.trigger("QuatroDigital.sq_change",this)}}catch(t){g(t.message)}});c.focusin(function(){d(this).trigger("QuatroDigital.sq_focusin",this)});e.click(function(b){b.preventDefault();c.val((parseInt(c.val())||a.minimumValue)+1).change()});b.click(function(b){b.preventDefault();c.val((parseInt(c.val())||a.minimumValue+1)-1).change()});c.change()}function k(c,e,b){c.on("QuatroDigital.sq_change",
function(){(d(this).val()||0)<=a.minimumValue?(b.addClass("qd-sq-inactive"),e.removeClass("qd-sq-inactive")):(e.addClass("qd-sq-inactive"),b.removeClass("qd-sq-inactive"))})}function m(c,e){c.on("QuatroDigital.sq_change",function(){try{if(!(e[0].hostname||"").length)return g("A quantidade n\u00e3o foi inserida no bt comprar pois o mesmo n\u00e3o possui uma URL","info");var b=e[0].search||"";-1<b.toLowerCase().indexOf("qty=")?e[0].search=b.replace(p,"qty="+(parseInt(c.val())||("number"==typeof a.minimumValue?
a.minimumValue:1))+"&"):e[0].search="qty="+(parseInt(c.val())||("number"==typeof a.minimumValue?a.minimumValue:1))+"&"+(e[0].search||"").replace(p,"");e.not(":first").each(function(){this.href=e[0].href});var d=((e.first().attr("href")||"").match(u)||[""]).pop()+"";c.attr("data-sku-id",d);if(d.length&&"object"===typeof skuJson&&!c.attr("data-sku-price"))for(b=0;b<skuJson.skus.length;b++)skuJson.skus[b].sku==d&&c.attr("data-sku-price",skuJson.skus[b].bestPrice)}catch(l){g(l.message)}})}var n=/[^0-9-]/gi,
q=/qty\=([0-9]+)/i,u=/sku\=([0-9]+)/i,p=/qty\=[0-9]+\&?/ig;h.each(function(){try{var c=d(this),e=c.find(a.buyButton),b=c.find(a.qttInput),h=c.find(a.btnMore),l=c.find(a.btnMinus);if(!e.length&&null!==a.buyButton||!b.length)return g("O plugin parou por aqui! N\u00e3o foram encontrados o bot\u00e3o comprar e o campo de quantidade","alerta");if(b.is(".qd-sq-on"))return g(["Execu\u00e7\u00e3o ignorada pois este input j\u00e1 possui o plugin aplicado. Input: ",b],"info");b.addClass("qd-sq-on");k(b,h,l);
null!==a.buyButton&&m(b,e);f(b,h,l);d(window).on("vtex.sku.selected",function(){b.change()})}catch(r){g(r.message)}})};d.fn.QD_smartQuantity=function(g){var a=d(this);a.qdPlugin=new n(a,d.extend({},m,g));d(window).trigger("QuatroDigital.sq_callback");return a};d(function(){d(".qd_auto_smart_quantity").QD_smartQuantity()})}})(this);    

