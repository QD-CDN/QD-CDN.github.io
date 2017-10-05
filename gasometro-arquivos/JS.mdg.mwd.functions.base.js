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

			// Apenas para tela de KIT
			if( $(document.body).is(".product-kit")){
				Product.kitShowItem();
				Product.kitShowSpecification();
				Product.kitItemSelected();
				Product.kitDustRenderCallback();
				Product.kitUnavailableCheck();
				Product.kitShowDescription();
				Product.kitShowImage();
				Product.kitBuyAllItemsButton();
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
			var i = 0;
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

				i++;
			});

			if( i == btns.length )
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
var _0x29bd=['QD_SmartPrice','Smart\x20Price','object','info','unshift','toLowerCase','apply','error','warn','text','search','match','.flag','[class*=\x27desconto\x27]','auto','.productRightColumn','strong.skuBestPrice','label.skuBestInstallmentNumber','label.skuBestInstallmentValue','strong.skuPrice','fromCharCode','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','productPage','closest','wrapperElement','filterFlagBy','isProductPage','find','skuBestPrice','qd-active','addClass','qd-sp-active','.qd_active','removeClass','oneFlagByItem','.qd_sp_on','qd_sp_ignored','qd_sp_on','isDiscountFlag','attr','skuCorrente','skus','available','bestPrice','qd-sp-product-unavailable','O\x20valor\x20informado\x20p/\x20o\x20desconto\x20não\x20é\x20um\x20número.','alerta','.qd_productPrice','val','appliedDiscount','listPrice','.qd_displayPrice','skuPrice','.qd-sp-display-discount','html','installments','changeInstallments','installmentValue','.qd_sp_display_installments','.qd_sp_display_installmentValue','.qd_sp_installments','.qd_saveAmount','append','.qd_saveAmountPercent','prepend','changeNativeSaveAmount','em.economia-de','each','qd_sp_processedItem','startedByWrapper','call','string','.qd_productPrice:not(.qd_sp_processedItem)','forcePromotion','style','extend','boolean','body','.produto','function','prototype','trim','replace','abs','undefined','pow','toFixed','round','split','length','join'];(function(_0x4ef9b6,_0x2d2d1e){var _0x1b6d9d=function(_0x508ac1){while(--_0x508ac1){_0x4ef9b6['push'](_0x4ef9b6['shift']());}};_0x1b6d9d(++_0x2d2d1e);}(_0x29bd,0x178));var _0xd29b=function(_0x5c4fb6,_0x1dd382){_0x5c4fb6=_0x5c4fb6-0x0;var _0x4670b5=_0x29bd[_0x5c4fb6];return _0x4670b5;};_0xd29b('0x0')!==typeof String[_0xd29b('0x1')][_0xd29b('0x2')]&&(String[_0xd29b('0x1')][_0xd29b('0x2')]=function(){return this['replace'](/^\s+|\s+$/g,'');});function qd_number_format(_0x44fa6d,_0x4730ef,_0x232751,_0x111349){_0x44fa6d=(_0x44fa6d+'')[_0xd29b('0x3')](/[^0-9+\-Ee.]/g,'');_0x44fa6d=isFinite(+_0x44fa6d)?+_0x44fa6d:0x0;_0x4730ef=isFinite(+_0x4730ef)?Math[_0xd29b('0x4')](_0x4730ef):0x0;_0x111349='undefined'===typeof _0x111349?',':_0x111349;_0x232751=_0xd29b('0x5')===typeof _0x232751?'.':_0x232751;var _0x49fece='',_0x49fece=function(_0x2f15c5,_0x5ea48c){var _0x4730ef=Math[_0xd29b('0x6')](0xa,_0x5ea48c);return''+(Math['round'](_0x2f15c5*_0x4730ef)/_0x4730ef)[_0xd29b('0x7')](_0x5ea48c);},_0x49fece=(_0x4730ef?_0x49fece(_0x44fa6d,_0x4730ef):''+Math[_0xd29b('0x8')](_0x44fa6d))[_0xd29b('0x9')]('.');0x3<_0x49fece[0x0]['length']&&(_0x49fece[0x0]=_0x49fece[0x0][_0xd29b('0x3')](/\B(?=(?:\d{3})+(?!\d))/g,_0x111349));(_0x49fece[0x1]||'')['length']<_0x4730ef&&(_0x49fece[0x1]=_0x49fece[0x1]||'',_0x49fece[0x1]+=Array(_0x4730ef-_0x49fece[0x1][_0xd29b('0xa')]+0x1)[_0xd29b('0xb')]('0'));return _0x49fece[_0xd29b('0xb')](_0x232751);};(function(_0x417a35){'use strict';var _0x40cbac=jQuery;if(typeof _0x40cbac['fn'][_0xd29b('0xc')]===_0xd29b('0x0'))return;var _0x54ae83=_0xd29b('0xd');var _0x1dcaa0=function(_0x38210e,_0x49cf6c){if(_0xd29b('0xe')===typeof console&&_0xd29b('0x0')===typeof console['error']&&_0xd29b('0x0')===typeof console[_0xd29b('0xf')]&&_0xd29b('0x0')===typeof console['warn']){var _0x196d8c;_0xd29b('0xe')===typeof _0x38210e?(_0x38210e[_0xd29b('0x10')]('['+_0x54ae83+']\x0a'),_0x196d8c=_0x38210e):_0x196d8c=['['+_0x54ae83+']\x0a'+_0x38210e];if(_0xd29b('0x5')===typeof _0x49cf6c||'alerta'!==_0x49cf6c[_0xd29b('0x11')]()&&'aviso'!==_0x49cf6c[_0xd29b('0x11')]())if(_0xd29b('0x5')!==typeof _0x49cf6c&&_0xd29b('0xf')===_0x49cf6c[_0xd29b('0x11')]())try{console[_0xd29b('0xf')]['apply'](console,_0x196d8c);}catch(_0x418522){console['info'](_0x196d8c['join']('\x0a'));}else try{console['error'][_0xd29b('0x12')](console,_0x196d8c);}catch(_0x10148b){console[_0xd29b('0x13')](_0x196d8c[_0xd29b('0xb')]('\x0a'));}else try{console[_0xd29b('0x14')][_0xd29b('0x12')](console,_0x196d8c);}catch(_0x1aa725){console['warn'](_0x196d8c[_0xd29b('0xb')]('\x0a'));}}};var _0x134147=/[0-9]+\%/i;var _0x4bbdc3=/[0-9\.]+(?=\%)/i;var _0x4ed1f0={'isDiscountFlag':function(_0x5a429e){if(_0x5a429e[_0xd29b('0x15')]()[_0xd29b('0x16')](_0x134147)>-0x1)return!![];return![];},'getDiscountValue':function(_0x3a2eee){return _0x3a2eee['text']()[_0xd29b('0x17')](_0x4bbdc3);},'startedByWrapper':![],'flagElement':_0xd29b('0x18'),'wrapperElement':'li','filterFlagBy':_0xd29b('0x19'),'forcePromotion':null,'appliedDiscount':null,'oneFlagByItem':!![],'isSmartCheckout':!![],'changeInstallments':![],'productPage':{'changeNativeSaveAmount':!![],'changeNativePrice':!![],'changeInstallments':![],'isProductPage':_0xd29b('0x1a'),'wrapperElement':_0xd29b('0x1b'),'skuBestPrice':_0xd29b('0x1c'),'installments':_0xd29b('0x1d'),'installmentValue':_0xd29b('0x1e'),'skuPrice':_0xd29b('0x1f')}};_0x40cbac['fn'][_0xd29b('0xc')]=function(){};var _0x2c0456=function(_0x34fbd2){var _0x48e0c1={'t':'nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x48e6bd){var _0x13a117,_0x22f70c,_0x9fd25e,_0x3cd100;_0x22f70c=function(_0xeeab08){return _0xeeab08;};_0x9fd25e=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x48e6bd=_0x48e6bd['d'+_0x9fd25e[0x10]+'c'+_0x9fd25e[0x11]+'m'+_0x22f70c(_0x9fd25e[0x1])+'n'+_0x9fd25e[0xd]]['l'+_0x9fd25e[0x12]+'c'+_0x9fd25e[0x0]+'ti'+_0x22f70c('o')+'n'];_0x13a117=function(_0x551814){return escape(encodeURIComponent(_0x551814[_0xd29b('0x3')](/\./g,'¨')[_0xd29b('0x3')](/[a-zA-Z]/g,function(_0x1b74d6){return String[_0xd29b('0x20')](('Z'>=_0x1b74d6?0x5a:0x7a)>=(_0x1b74d6=_0x1b74d6['charCodeAt'](0x0)+0xd)?_0x1b74d6:_0x1b74d6-0x1a);})));};var _0x2bc49d=_0x13a117(_0x48e6bd[[_0x9fd25e[0x9],_0x22f70c('o'),_0x9fd25e[0xc],_0x9fd25e[_0x22f70c(0xd)]][_0xd29b('0xb')]('')]);_0x13a117=_0x13a117((window[['js',_0x22f70c('no'),'m',_0x9fd25e[0x1],_0x9fd25e[0x4][_0xd29b('0x21')](),_0xd29b('0x22')][_0xd29b('0xb')]('')]||_0xd29b('0x23'))+['.v',_0x9fd25e[0xd],'e',_0x22f70c('x'),'co',_0x22f70c('mm'),_0xd29b('0x24'),_0x9fd25e[0x1],'.c',_0x22f70c('o'),'m.',_0x9fd25e[0x13],'r']['join'](''));for(var _0x49d4c8 in _0x48e0c1){if(_0x13a117===_0x49d4c8+_0x48e0c1[_0x49d4c8]||_0x2bc49d===_0x49d4c8+_0x48e0c1[_0x49d4c8]){_0x3cd100='tr'+_0x9fd25e[0x11]+'e';break;}_0x3cd100='f'+_0x9fd25e[0x0]+'ls'+_0x22f70c(_0x9fd25e[0x1])+'';}_0x22f70c=!0x1;-0x1<_0x48e6bd[[_0x9fd25e[0xc],'e',_0x9fd25e[0x0],'rc',_0x9fd25e[0x9]]['join']('')][_0xd29b('0x25')](_0xd29b('0x26'))&&(_0x22f70c=!0x0);return[_0x3cd100,_0x22f70c];}(_0x34fbd2);}(window);if(!eval(_0x2c0456[0x0]))return _0x2c0456[0x1]?_0x1dcaa0(_0xd29b('0x27')):!0x1;var _0x507221=function(_0x2ea871,_0x486d0f){'use strict';var _0x1ddbbe=function(_0x3b2dfd){'use strict';var _0x41746a,_0x11c5fe,_0x467f3c,_0x4f0699,_0x520091,_0x220296,_0x126449,_0x4d3822,_0x5afd3f,_0x3d5abb,_0x4598d3,_0x2b6051,_0x4f0db2,_0x21da63,_0x578796,_0x5bb5d8,_0x17cea0,_0x3653e9,_0x6d08d4;var _0x5770dc=_0x40cbac(this);_0x3b2dfd=typeof _0x3b2dfd===_0xd29b('0x5')?![]:_0x3b2dfd;if(_0x486d0f[_0xd29b('0x28')]['isProductPage'])var _0x4f0076=_0x5770dc[_0xd29b('0x29')](_0x486d0f[_0xd29b('0x28')][_0xd29b('0x2a')]);else var _0x4f0076=_0x5770dc[_0xd29b('0x29')](_0x486d0f[_0xd29b('0x2a')]);if(!_0x3b2dfd&&!_0x5770dc['is'](_0x486d0f[_0xd29b('0x2b')])){if(_0x486d0f['productPage'][_0xd29b('0x2c')]&&_0x4f0076['is'](_0x486d0f['productPage'][_0xd29b('0x2a')])){_0x4f0076[_0xd29b('0x2d')](_0x486d0f[_0xd29b('0x28')][_0xd29b('0x2e')])['addClass'](_0xd29b('0x2f'));_0x4f0076[_0xd29b('0x30')](_0xd29b('0x31'));}return;}var _0x315fd4=_0x486d0f['productPage'][_0xd29b('0x2c')];if(_0x5770dc['is']('.qd_sp_on,\x20.qd_sp_ignored')&&!_0x315fd4)return;if(_0x315fd4){_0x4d3822=_0x4f0076[_0xd29b('0x2d')](_0x486d0f[_0xd29b('0x28')][_0xd29b('0x2e')]);if(_0x4d3822[_0xd29b('0x2d')](_0xd29b('0x32'))[_0xd29b('0xa')])return;_0x4d3822['removeClass'](_0xd29b('0x2f'));_0x4f0076[_0xd29b('0x33')](_0xd29b('0x31'));}if(_0x486d0f[_0xd29b('0x34')]&&_0x5770dc['siblings'](_0xd29b('0x35'))[_0xd29b('0xa')]){_0x5770dc[_0xd29b('0x30')](_0xd29b('0x36'));return;}_0x5770dc[_0xd29b('0x30')](_0xd29b('0x37'));if(!_0x486d0f[_0xd29b('0x38')](_0x5770dc))return;if(_0x315fd4){_0x467f3c={};var _0x30d2b8=parseInt(_0x40cbac('div[skuCorrente]:first')[_0xd29b('0x39')](_0xd29b('0x3a')),0xa);if(_0x30d2b8){for(var _0x178700=0x0;_0x178700<skuJson[_0xd29b('0x3b')][_0xd29b('0xa')];_0x178700++){if(skuJson[_0xd29b('0x3b')][_0x178700]['sku']==_0x30d2b8){_0x467f3c=skuJson[_0xd29b('0x3b')][_0x178700];break;}}}else{var _0xa7f33c=0x5af3107a3fff;for(var _0x4d8bed in skuJson[_0xd29b('0x3b')]){if(typeof skuJson[_0xd29b('0x3b')][_0x4d8bed]===_0xd29b('0x0'))continue;if(!skuJson['skus'][_0x4d8bed][_0xd29b('0x3c')])continue;if(skuJson['skus'][_0x4d8bed][_0xd29b('0x3d')]<_0xa7f33c){_0xa7f33c=skuJson[_0xd29b('0x3b')][_0x4d8bed]['bestPrice'];_0x467f3c=skuJson[_0xd29b('0x3b')][_0x4d8bed];}}}}_0x5bb5d8=!![];_0x17cea0=0x0;if(_0x486d0f['isSmartCheckout']&&_0x3653e9){_0x5bb5d8=skuJson[_0xd29b('0x3c')];if(!_0x5bb5d8)return _0x4f0076[_0xd29b('0x30')](_0xd29b('0x3e'));}_0x11c5fe=_0x486d0f['getDiscountValue'](_0x5770dc);_0x41746a=parseFloat(_0x11c5fe,0xa);if(isNaN(_0x41746a))return _0x1dcaa0([_0xd29b('0x3f'),_0x5770dc],_0xd29b('0x40'));var _0xeb3b52=function(_0x442209){if(_0x315fd4)_0x4f0699=(_0x442209[_0xd29b('0x3d')]||0x0)/0x64;else{_0x4f0db2=_0x4f0076[_0xd29b('0x2d')](_0xd29b('0x41'));_0x4f0699=parseFloat((_0x4f0db2[_0xd29b('0x42')]()||'')[_0xd29b('0x3')](/[^0-9\.\,]+/i,'')[_0xd29b('0x3')]('.','')[_0xd29b('0x3')](',','.'),0xa);}if(isNaN(_0x4f0699))return _0x1dcaa0(['Por\x20alguma\x20razão\x20não\x20consegui\x20obter\x20o\x20preço\x20deste\x20produto\x20:(',_0x5770dc,_0x4f0076]);if(_0x486d0f[_0xd29b('0x43')]!==null){_0x21da63=0x0;if(!isNaN(_0x486d0f[_0xd29b('0x43')]))_0x21da63=_0x486d0f['appliedDiscount'];else{_0x578796=_0x4f0076[_0xd29b('0x2d')](_0x486d0f[_0xd29b('0x43')]);if(_0x578796['length'])_0x21da63=_0x486d0f['getDiscountValue'](_0x578796);}_0x21da63=parseFloat(_0x21da63,0xa);if(isNaN(_0x21da63))_0x21da63=0x0;if(_0x21da63!==0x0)_0x4f0699=_0x4f0699*0x64/(0x64-_0x21da63);}if(_0x315fd4)_0x520091=(_0x442209[_0xd29b('0x44')]||0x0)/0x64;else _0x520091=parseFloat((_0x4f0076['find']('.qd_productOldPrice')[_0xd29b('0x42')]()||'')[_0xd29b('0x3')](/[^0-9\.\,]+/i,'')[_0xd29b('0x3')]('.','')[_0xd29b('0x3')](',','.'),0xa);if(isNaN(_0x520091))_0x520091=0.001;_0x220296=_0x4f0699*((0x64-_0x41746a)/0x64);if(_0x315fd4&&_0x486d0f[_0xd29b('0x28')]['changeNativePrice']){_0x4d3822[_0xd29b('0x15')](_0x4d3822[_0xd29b('0x15')]()[_0xd29b('0x2')]()[_0xd29b('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x220296,0x2,',','.')))[_0xd29b('0x30')](_0xd29b('0x2f'));_0x4f0076[_0xd29b('0x30')](_0xd29b('0x31'));}else{_0x6d08d4=_0x4f0076['find'](_0xd29b('0x45'));_0x6d08d4['text'](_0x6d08d4[_0xd29b('0x15')]()[_0xd29b('0x3')](/[0-9\.]+,[0-9]+/i,'')+qd_number_format(_0x220296,0x2,',','.'));}if(_0x315fd4){_0x126449=_0x4f0076[_0xd29b('0x2d')](_0x486d0f[_0xd29b('0x28')][_0xd29b('0x46')]);if(_0x126449[_0xd29b('0xa')])_0x126449['text'](_0x126449[_0xd29b('0x15')]()[_0xd29b('0x2')]()[_0xd29b('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x220296,0x2,',','.')));}var _0x29cfe9=_0x4f0076[_0xd29b('0x2d')](_0xd29b('0x47'));_0x29cfe9[_0xd29b('0x15')](_0x29cfe9[_0xd29b('0x15')]()[_0xd29b('0x3')](/[0-9]+\%/i,_0x41746a+'%'));var _0x497276=function(_0x251ef8,_0x100fec,_0x33f3ad){var _0x5ee95e=_0x4f0076[_0xd29b('0x2d')](_0x251ef8);if(_0x5ee95e[_0xd29b('0xa')])_0x5ee95e['html'](_0x5ee95e[_0xd29b('0x48')]()[_0xd29b('0x2')]()[_0xd29b('0x3')](/[0-9]{1,2}/,_0x33f3ad?_0x33f3ad:_0x442209[_0xd29b('0x49')]||0x0));var _0x5b6949=_0x4f0076[_0xd29b('0x2d')](_0x100fec);if(_0x5b6949['length'])_0x5b6949[_0xd29b('0x48')](_0x5b6949['html']()[_0xd29b('0x2')]()['replace'](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x220296/(_0x33f3ad?_0x33f3ad:_0x442209[_0xd29b('0x49')]||0x1),0x2,',','.')));};if(_0x315fd4&&_0x486d0f[_0xd29b('0x28')][_0xd29b('0x4a')])_0x497276(_0x486d0f[_0xd29b('0x28')]['installments'],_0x486d0f[_0xd29b('0x28')][_0xd29b('0x4b')]);else if(_0x486d0f[_0xd29b('0x4a')])_0x497276(_0xd29b('0x4c'),_0xd29b('0x4d'),parseInt(_0x4f0076[_0xd29b('0x2d')](_0xd29b('0x4e'))[_0xd29b('0x42')]()||0x1)||0x1);_0x4f0076[_0xd29b('0x2d')](_0xd29b('0x4f'))[_0xd29b('0x50')](qd_number_format(_0x520091-_0x220296,0x2,',','.'));_0x4f0076['find'](_0xd29b('0x51'))[_0xd29b('0x52')](qd_number_format((_0x520091-_0x220296)*0x64/_0x520091,0x2,',','.'));if(_0x315fd4&&_0x486d0f[_0xd29b('0x28')][_0xd29b('0x53')]){_0x40cbac(_0xd29b('0x54'))[_0xd29b('0x55')](function(){_0x4598d3=_0x40cbac(this);_0x4598d3[_0xd29b('0x15')](_0x4598d3[_0xd29b('0x15')]()[_0xd29b('0x2')]()['replace'](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x520091-_0x220296,0x2,',','.')));_0x4598d3[_0xd29b('0x30')](_0xd29b('0x2f'));});}};_0xeb3b52(_0x467f3c);if(_0x315fd4)_0x40cbac(window)['on']('skuSelected.vtex',function(_0xbb1586,_0x60910a,_0xb05dbf){_0xeb3b52(_0xb05dbf);});_0x4f0076[_0xd29b('0x30')](_0xd29b('0x56'));if(!_0x315fd4)_0x4f0db2['addClass']('qd_sp_processedItem');};(_0x486d0f[_0xd29b('0x57')]?_0x2ea871[_0xd29b('0x2d')](_0x486d0f['flagElement']):_0x2ea871)[_0xd29b('0x55')](function(){_0x1ddbbe[_0xd29b('0x58')](this,![]);});if(typeof _0x486d0f['forcePromotion']==_0xd29b('0x59')){var _0x3f5e1d=_0x486d0f[_0xd29b('0x57')]?_0x2ea871:_0x2ea871['closest'](_0x486d0f[_0xd29b('0x2a')]);if(_0x486d0f[_0xd29b('0x28')]['isProductPage'])_0x3f5e1d=_0x3f5e1d[_0xd29b('0x29')](_0x486d0f[_0xd29b('0x28')][_0xd29b('0x2a')])['not']('.qd_sp_processedItem');else _0x3f5e1d=_0x3f5e1d[_0xd29b('0x2d')](_0xd29b('0x5a'));_0x3f5e1d[_0xd29b('0x55')](function(){var _0x291faa=_0x40cbac(_0x486d0f[_0xd29b('0x5b')]);_0x291faa[_0xd29b('0x39')](_0xd29b('0x5c'),'display:none\x20!important;');if(_0x486d0f[_0xd29b('0x28')][_0xd29b('0x2c')])_0x40cbac(this)[_0xd29b('0x50')](_0x291faa);else _0x40cbac(this)['after'](_0x291faa);_0x1ddbbe[_0xd29b('0x58')](_0x291faa,!![]);});}};_0x40cbac['fn'][_0xd29b('0xc')]=function(_0x222298){var _0x3ba85b=_0x40cbac(this);if(!_0x3ba85b[_0xd29b('0xa')])return _0x3ba85b;var _0x55136f=_0x40cbac[_0xd29b('0x5d')](!![],{},_0x4ed1f0,_0x222298);if(typeof _0x55136f[_0xd29b('0x28')]['isProductPage']!=_0xd29b('0x5e'))_0x55136f['productPage'][_0xd29b('0x2c')]=_0x40cbac(document[_0xd29b('0x5f')])['is'](_0xd29b('0x60'));_0x507221(_0x3ba85b,_0x55136f);return _0x3ba85b;};}(this));
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
var _0x8d5e=['last','qd-am-last','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','join','toUpperCase','ite','---','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','parent','url','html','attr','.box-banner','insertBefore','hide','qd-am-content-loaded','trim','[class*=\x27colunas\x27]','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','trigger','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','children',':not(ul)','qd-am-elem-','text','replaceSpecialChars','replace','>li','qdAmAddNdx','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','add','qd-am-','-li','callback','QuatroDigital.am.callback','extend','exec','.qd_amazing_menu_auto','getParent','function','QD_amazingMenu','/qd-amazing-menu','object','undefined','info','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','apply','error','each','addClass','qd-am-li-','first','qd-am-first'];(function(_0x12f688,_0x585c25){var _0x59c3de=function(_0x4ac301){while(--_0x4ac301){_0x12f688['push'](_0x12f688['shift']());}};_0x59c3de(++_0x585c25);}(_0x8d5e,0x80));var _0xe8d5=function(_0x13b8f3,_0x442821){_0x13b8f3=_0x13b8f3-0x0;var _0x1a6d06=_0x8d5e[_0x13b8f3];return _0x1a6d06;};(function(_0x39e7e2){_0x39e7e2['fn'][_0xe8d5('0x0')]=_0x39e7e2['fn']['closest'];}(jQuery));(function(_0x5b21c4){var _0x19cbee;var _0x19c5f8=jQuery;if(_0xe8d5('0x1')!==typeof _0x19c5f8['fn'][_0xe8d5('0x2')]){var _0xcd44ed={'url':_0xe8d5('0x3'),'callback':function(){},'ajaxCallback':function(){}};var _0x1c3fb9=function(_0x34ccc2,_0x3d2835){if(_0xe8d5('0x4')===typeof console&&_0xe8d5('0x5')!==typeof console['error']&&_0xe8d5('0x5')!==typeof console[_0xe8d5('0x6')]&&'undefined'!==typeof console[_0xe8d5('0x7')]){var _0x22b5c8;_0xe8d5('0x4')===typeof _0x34ccc2?(_0x34ccc2[_0xe8d5('0x8')](_0xe8d5('0x9')),_0x22b5c8=_0x34ccc2):_0x22b5c8=['[QD\x20Amazing\x20Menu]\x0a'+_0x34ccc2];if(_0xe8d5('0x5')===typeof _0x3d2835||_0xe8d5('0xa')!==_0x3d2835[_0xe8d5('0xb')]()&&_0xe8d5('0xc')!==_0x3d2835['toLowerCase']())if(_0xe8d5('0x5')!==typeof _0x3d2835&&_0xe8d5('0x6')===_0x3d2835[_0xe8d5('0xb')]())try{console['info'][_0xe8d5('0xd')](console,_0x22b5c8);}catch(_0x3cc9d7){try{console[_0xe8d5('0x6')](_0x22b5c8['join']('\x0a'));}catch(_0x33ed75){}}else try{console['error'][_0xe8d5('0xd')](console,_0x22b5c8);}catch(_0x336d22){try{console[_0xe8d5('0xe')](_0x22b5c8['join']('\x0a'));}catch(_0x55fe97){}}else try{console[_0xe8d5('0x7')][_0xe8d5('0xd')](console,_0x22b5c8);}catch(_0x3bb58e){try{console[_0xe8d5('0x7')](_0x22b5c8['join']('\x0a'));}catch(_0x1d82c4){}}}};_0x19c5f8['fn']['qdAmAddNdx']=function(){var _0x3e6350=_0x19c5f8(this);_0x3e6350[_0xe8d5('0xf')](function(_0x5c9169){_0x19c5f8(this)[_0xe8d5('0x10')](_0xe8d5('0x11')+_0x5c9169);});_0x3e6350[_0xe8d5('0x12')]()[_0xe8d5('0x10')](_0xe8d5('0x13'));_0x3e6350[_0xe8d5('0x14')]()['addClass'](_0xe8d5('0x15'));return _0x3e6350;};_0x19c5f8['fn']['QD_amazingMenu']=function(){};_0x5b21c4=function(_0x38084e){var _0x35cfc8={'t':_0xe8d5('0x16')};return function(_0x3ea215){var _0xa041e3=function(_0x3d066d){return _0x3d066d;};var _0x90da63=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3ea215=_0x3ea215['d'+_0x90da63[0x10]+'c'+_0x90da63[0x11]+'m'+_0xa041e3(_0x90da63[0x1])+'n'+_0x90da63[0xd]]['l'+_0x90da63[0x12]+'c'+_0x90da63[0x0]+'ti'+_0xa041e3('o')+'n'];var _0x4ea548=function(_0x453aa5){return escape(encodeURIComponent(_0x453aa5['replace'](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x1802cb){return String['fromCharCode'](('Z'>=_0x1802cb?0x5a:0x7a)>=(_0x1802cb=_0x1802cb[_0xe8d5('0x17')](0x0)+0xd)?_0x1802cb:_0x1802cb-0x1a);})));};var _0x2ac9d7=_0x4ea548(_0x3ea215[[_0x90da63[0x9],_0xa041e3('o'),_0x90da63[0xc],_0x90da63[_0xa041e3(0xd)]][_0xe8d5('0x18')]('')]);_0x4ea548=_0x4ea548((window[['js',_0xa041e3('no'),'m',_0x90da63[0x1],_0x90da63[0x4][_0xe8d5('0x19')](),_0xe8d5('0x1a')][_0xe8d5('0x18')]('')]||_0xe8d5('0x1b'))+['.v',_0x90da63[0xd],'e',_0xa041e3('x'),'co',_0xa041e3('mm'),'erc',_0x90da63[0x1],'.c',_0xa041e3('o'),'m.',_0x90da63[0x13],'r']['join'](''));for(var _0x272cb2 in _0x35cfc8){if(_0x4ea548===_0x272cb2+_0x35cfc8[_0x272cb2]||_0x2ac9d7===_0x272cb2+_0x35cfc8[_0x272cb2]){var _0x1db697='tr'+_0x90da63[0x11]+'e';break;}_0x1db697='f'+_0x90da63[0x0]+'ls'+_0xa041e3(_0x90da63[0x1])+'';}_0xa041e3=!0x1;-0x1<_0x3ea215[[_0x90da63[0xc],'e',_0x90da63[0x0],'rc',_0x90da63[0x9]][_0xe8d5('0x18')]('')][_0xe8d5('0x1c')](_0xe8d5('0x1d'))&&(_0xa041e3=!0x0);return[_0x1db697,_0xa041e3];}(_0x38084e);}(window);if(!eval(_0x5b21c4[0x0]))return _0x5b21c4[0x1]?_0x1c3fb9(_0xe8d5('0x1e')):!0x1;var _0x3b8a45=function(_0x2f5393){var _0x51a719=_0x2f5393[_0xe8d5('0x1f')](_0xe8d5('0x20'));var _0x3b356e=_0x51a719[_0xe8d5('0x21')](_0xe8d5('0x22'));var _0x57dfdb=_0x51a719[_0xe8d5('0x21')](_0xe8d5('0x23'));if(_0x3b356e[_0xe8d5('0x24')]||_0x57dfdb[_0xe8d5('0x24')])_0x3b356e[_0xe8d5('0x25')]()['addClass']('qd-am-banner-wrapper'),_0x57dfdb['parent']()['addClass']('qd-am-collection-wrapper'),_0x19c5f8['qdAjax']({'url':_0x19cbee[_0xe8d5('0x26')],'dataType':_0xe8d5('0x27'),'success':function(_0x3faa1b){var _0x5b0ed8=_0x19c5f8(_0x3faa1b);_0x3b356e['each'](function(){var _0x3faa1b=_0x19c5f8(this);var _0x6e0d66=_0x5b0ed8['find']('img[alt=\x27'+_0x3faa1b[_0xe8d5('0x28')]('data-qdam-value')+'\x27]');_0x6e0d66[_0xe8d5('0x24')]&&(_0x6e0d66[_0xe8d5('0xf')](function(){_0x19c5f8(this)[_0xe8d5('0x0')](_0xe8d5('0x29'))['clone']()[_0xe8d5('0x2a')](_0x3faa1b);}),_0x3faa1b[_0xe8d5('0x2b')]());})[_0xe8d5('0x10')](_0xe8d5('0x2c'));_0x57dfdb[_0xe8d5('0xf')](function(){var _0x3faa1b={};var _0x48406e=_0x19c5f8(this);_0x5b0ed8[_0xe8d5('0x1f')]('h2')[_0xe8d5('0xf')](function(){if(_0x19c5f8(this)['text']()['trim']()[_0xe8d5('0xb')]()==_0x48406e[_0xe8d5('0x28')]('data-qdam-value')[_0xe8d5('0x2d')]()[_0xe8d5('0xb')]())return _0x3faa1b=_0x19c5f8(this),!0x1;});_0x3faa1b[_0xe8d5('0x24')]&&(_0x3faa1b[_0xe8d5('0xf')](function(){_0x19c5f8(this)['getParent'](_0xe8d5('0x2e'))['clone']()[_0xe8d5('0x2a')](_0x48406e);}),_0x48406e['hide']());})['addClass'](_0xe8d5('0x2c'));},'error':function(){_0x1c3fb9(_0xe8d5('0x2f')+_0x19cbee[_0xe8d5('0x26')]+_0xe8d5('0x30'));},'complete':function(){_0x19cbee[_0xe8d5('0x31')][_0xe8d5('0x32')](this);_0x19c5f8(window)[_0xe8d5('0x33')]('QuatroDigital.am.ajaxCallback',_0x2f5393);},'clearQueueDelay':0xbb8});};_0x19c5f8['QD_amazingMenu']=function(_0x2b4d01){var _0x149470=_0x2b4d01[_0xe8d5('0x1f')](_0xe8d5('0x34'))['each'](function(){var _0x1596a3=_0x19c5f8(this);if(!_0x1596a3[_0xe8d5('0x24')])return _0x1c3fb9([_0xe8d5('0x35'),_0x2b4d01],_0xe8d5('0xa'));_0x1596a3[_0xe8d5('0x1f')]('li\x20>ul')[_0xe8d5('0x25')]()['addClass']('qd-am-has-ul');_0x1596a3[_0xe8d5('0x1f')]('li')[_0xe8d5('0xf')](function(){var _0x316db5=_0x19c5f8(this);var _0x1cdaa2=_0x316db5[_0xe8d5('0x36')](_0xe8d5('0x37'));_0x1cdaa2[_0xe8d5('0x24')]&&_0x316db5[_0xe8d5('0x10')](_0xe8d5('0x38')+_0x1cdaa2[_0xe8d5('0x12')]()[_0xe8d5('0x39')]()[_0xe8d5('0x2d')]()[_0xe8d5('0x3a')]()[_0xe8d5('0x3b')](/\./g,'')[_0xe8d5('0x3b')](/\s/g,'-')[_0xe8d5('0xb')]());});var _0x5ef51b=_0x1596a3['find'](_0xe8d5('0x3c'))[_0xe8d5('0x3d')]();_0x1596a3['addClass']('qd-amazing-menu');_0x5ef51b=_0x5ef51b[_0xe8d5('0x1f')]('>ul');_0x5ef51b[_0xe8d5('0xf')](function(){var _0x395f2f=_0x19c5f8(this);_0x395f2f['find'](_0xe8d5('0x3c'))[_0xe8d5('0x3d')]()['addClass'](_0xe8d5('0x3e'));_0x395f2f[_0xe8d5('0x10')](_0xe8d5('0x3f'));_0x395f2f[_0xe8d5('0x25')]()[_0xe8d5('0x10')]('qd-am-dropdown');});_0x5ef51b[_0xe8d5('0x10')](_0xe8d5('0x40'));var _0x16be13=0x0,_0x5b21c4=function(_0x871d14){_0x16be13+=0x1;_0x871d14=_0x871d14[_0xe8d5('0x36')]('li')[_0xe8d5('0x36')]('*');_0x871d14[_0xe8d5('0x24')]&&(_0x871d14[_0xe8d5('0x10')](_0xe8d5('0x41')+_0x16be13),_0x5b21c4(_0x871d14));};_0x5b21c4(_0x1596a3);_0x1596a3[_0xe8d5('0x42')](_0x1596a3[_0xe8d5('0x1f')]('ul'))[_0xe8d5('0xf')](function(){var _0x8e2ad=_0x19c5f8(this);_0x8e2ad[_0xe8d5('0x10')](_0xe8d5('0x43')+_0x8e2ad[_0xe8d5('0x36')]('li')['length']+_0xe8d5('0x44'));});});_0x3b8a45(_0x149470);_0x19cbee[_0xe8d5('0x45')][_0xe8d5('0x32')](this);_0x19c5f8(window)[_0xe8d5('0x33')](_0xe8d5('0x46'),_0x2b4d01);};_0x19c5f8['fn'][_0xe8d5('0x2')]=function(_0x4cca1f){var _0x302b90=_0x19c5f8(this);if(!_0x302b90[_0xe8d5('0x24')])return _0x302b90;_0x19cbee=_0x19c5f8[_0xe8d5('0x47')]({},_0xcd44ed,_0x4cca1f);_0x302b90[_0xe8d5('0x48')]=new _0x19c5f8[(_0xe8d5('0x2'))](_0x19c5f8(this));return _0x302b90;};_0x19c5f8(function(){_0x19c5f8(_0xe8d5('0x49'))['QD_amazingMenu']();});}}(this));

/* Quatro Digital Smart Cart */
var _0x9f62=['qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','.qdDdcContainer','QD_smartCart','dropDown','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','abs','undefined','pow','length','replace','join','prototype','trim','capitalize','charAt','toUpperCase','slice','toLowerCase','function','qdAjax','qdAjaxQueue','jquery','000','error','extend','GET','object','data','stringify','toString','url','jqXHR','ajax','success','fail','always','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','message','version','4.0','closest','simpleCart','checkout','getOrderForm','call','QuatroDigital_simpleCart','alerta','warn','[Simple\x20Cart]\x0a','info','add','elements','QD_simpleCart','.qd_items_text','attr','each','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','Shipping','value','total','currencySymbol','shipping','allTotal','qtt','showQuantityByItems','items','callback','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','filter','.singular','hide','.plural','show','addClass','qd-emptyCart','removeClass','$this','cartQttE','html','itemsTextE','find','cartQtt','cartTotalE','cartTotal','itemsText','emptyElem','emptyCart','qd-sc-populated','smartCheckout','_QuatroDigital_DropDown','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','QD_checkoutQueue','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','trigger','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','.qd_cart_auto','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','Oooops!\x20','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','vtexjs','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','done','Callbacks','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','.productInformationWrapper\x20\x20a.buy-button','input.buy-in-page-quantity','javascript:','body','Produto\x20adicionado\x20ao\x20carrinho!','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','location','href','#produto,\x20.produto','QD_buyButton','isSmartCheckout','qd-bb-click-active','click.qd_bb_buy_sc','allowBuyClick','clickBuySmartCheckout','preventDefault','buyButton','.qd-sbb-on','qd-sbb-on','.btn-add-buy-button-asynchronous','.remove-href','qd-bb-active','children','append','.buy-in-page-button','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','prodAdd','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','---','qd-bb-itemAddCartWrapper','getCartInfoByUrl','função\x20descontinuada','allowUpdate','autoWatchBuyButton','unbind','click','bind','load','mouseenter.qd_bb_buy_sc','indexOf','execDefaultAction','redirect=false','redirect=true','queue','buyIfQuantityZeroed','test','push','productPageCallback','buyButtonClickCallback','split','ku=','pop','shift','asyncCallback','productAddedToCart','fakeRequest','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','Callback\x20não\x20é\x20uma\x20função','.qd-bb-itemAddWrapper','prepend','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','QuatroDigital.qd_bb_prod_add','ajaxSend','match','productAddedToCart.qdSbbVtex','ajaxStop','toFixed','round','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','QD_dropDownCart','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','ite','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','skuName','name','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','qd-bb-lightBoxProdAdd','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-shipping\x20input','val','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','cartIsEmpty','mouseleave.qd_ddc_hover','texts','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','.qd_ddc_continueShopping','continueShopping','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','cartContainer','clone','.qd-ddc-infoTotalItems','.qd-ddc-infoAllTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','.qd-ddc-prodRow','qd-ddc-noItems','renderProductsList','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','meta[name=currency]','content','quantity','.qd-ddc-remove','insertProdImg','imageUrl','appendTo','address','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','[data-sku=\x27','outerHeight','qd-ddc-lastAdded','qd-ddc-lastAddedFixed','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','qd-ddc-cart-empty','qd-loaded','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','click.qd_ddc_more','.qd-ddc-quantityMinus','click.qd_ddc_minus','qd-loading','.qd-ddc-quantity','focusout.qd_ddc_change','keyup.qd_ddc_change','removeProduct','calculateShipping','BRA','Não\x20foi\x20possível\x20calcular\x20o\x20frete','qdDdcLastPostalCode','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','removeItems','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','stop','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','remove','.qd-bap-item-added'];(function(_0x509b2a,_0xf91802){var _0x59ff9e=function(_0x5af97a){while(--_0x5af97a){_0x509b2a['push'](_0x509b2a['shift']());}};_0x59ff9e(++_0xf91802);}(_0x9f62,0x154));var _0x29f6=function(_0x5afdba,_0x4a75d6){_0x5afdba=_0x5afdba-0x0;var _0x1b09bd=_0x9f62[_0x5afdba];return _0x1b09bd;};(function(_0x5c9988){_0x5c9988['fn'][_0x29f6('0x0')]=_0x5c9988['fn']['closest'];}(jQuery));function qd_number_format(_0xab9c60,_0x254ab3,_0x548050,_0x5618b7){_0xab9c60=(_0xab9c60+'')['replace'](/[^0-9+\-Ee.]/g,'');_0xab9c60=isFinite(+_0xab9c60)?+_0xab9c60:0x0;_0x254ab3=isFinite(+_0x254ab3)?Math[_0x29f6('0x1')](_0x254ab3):0x0;_0x5618b7=_0x29f6('0x2')===typeof _0x5618b7?',':_0x5618b7;_0x548050=_0x29f6('0x2')===typeof _0x548050?'.':_0x548050;var _0xf66137='',_0xf66137=function(_0x272876,_0x9a43fe){var _0x254ab3=Math[_0x29f6('0x3')](0xa,_0x9a43fe);return''+(Math['round'](_0x272876*_0x254ab3)/_0x254ab3)['toFixed'](_0x9a43fe);},_0xf66137=(_0x254ab3?_0xf66137(_0xab9c60,_0x254ab3):''+Math['round'](_0xab9c60))['split']('.');0x3<_0xf66137[0x0][_0x29f6('0x4')]&&(_0xf66137[0x0]=_0xf66137[0x0][_0x29f6('0x5')](/\B(?=(?:\d{3})+(?!\d))/g,_0x5618b7));(_0xf66137[0x1]||'')['length']<_0x254ab3&&(_0xf66137[0x1]=_0xf66137[0x1]||'',_0xf66137[0x1]+=Array(_0x254ab3-_0xf66137[0x1]['length']+0x1)[_0x29f6('0x6')]('0'));return _0xf66137[_0x29f6('0x6')](_0x548050);};'function'!==typeof String[_0x29f6('0x7')][_0x29f6('0x8')]&&(String['prototype']['trim']=function(){return this['replace'](/^\s+|\s+$/g,'');});'function'!=typeof String[_0x29f6('0x7')][_0x29f6('0x9')]&&(String[_0x29f6('0x7')][_0x29f6('0x9')]=function(){return this[_0x29f6('0xa')](0x0)[_0x29f6('0xb')]()+this[_0x29f6('0xc')](0x1)[_0x29f6('0xd')]();});(function(_0x1ae582){if(_0x29f6('0xe')!==typeof _0x1ae582[_0x29f6('0xf')]){var _0x370484={};_0x1ae582[_0x29f6('0x10')]=_0x370484;0x96>parseInt((_0x1ae582['fn'][_0x29f6('0x11')][_0x29f6('0x5')](/[^0-9]+/g,'')+_0x29f6('0x12'))[_0x29f6('0xc')](0x0,0x3),0xa)&&console&&'function'==typeof console['error']&&console[_0x29f6('0x13')]();_0x1ae582[_0x29f6('0xf')]=function(_0xb31436){try{var _0x5c8246=_0x1ae582[_0x29f6('0x14')]({},{'url':'','type':_0x29f6('0x15'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0xb31436);var _0x49252f=_0x29f6('0x16')===typeof _0x5c8246[_0x29f6('0x17')]?JSON[_0x29f6('0x18')](_0x5c8246[_0x29f6('0x17')]):_0x5c8246[_0x29f6('0x17')][_0x29f6('0x19')]();var _0x5673c8=encodeURIComponent(_0x5c8246[_0x29f6('0x1a')]+'|'+_0x5c8246['type']+'|'+_0x49252f);_0x370484[_0x5673c8]=_0x370484[_0x5673c8]||{};'undefined'==typeof _0x370484[_0x5673c8][_0x29f6('0x1b')]?_0x370484[_0x5673c8][_0x29f6('0x1b')]=_0x1ae582[_0x29f6('0x1c')](_0x5c8246):(_0x370484[_0x5673c8][_0x29f6('0x1b')]['done'](_0x5c8246[_0x29f6('0x1d')]),_0x370484[_0x5673c8]['jqXHR'][_0x29f6('0x1e')](_0x5c8246[_0x29f6('0x13')]),_0x370484[_0x5673c8][_0x29f6('0x1b')][_0x29f6('0x1f')](_0x5c8246['complete']));_0x370484[_0x5673c8][_0x29f6('0x1b')][_0x29f6('0x1f')](function(){isNaN(parseInt(_0x5c8246['clearQueueDelay']))||setTimeout(function(){_0x370484[_0x5673c8][_0x29f6('0x1b')]=void 0x0;},_0x5c8246[_0x29f6('0x20')]);});return _0x370484[_0x5673c8][_0x29f6('0x1b')];}catch(_0x342038){_0x29f6('0x2')!==typeof console&&_0x29f6('0xe')===typeof console[_0x29f6('0x13')]&&console['error'](_0x29f6('0x21')+_0x342038[_0x29f6('0x22')]);}};_0x1ae582[_0x29f6('0xf')][_0x29f6('0x23')]=_0x29f6('0x24');}}(jQuery));(function(_0x16a6ad){_0x16a6ad['fn'][_0x29f6('0x0')]=_0x16a6ad['fn'][_0x29f6('0x25')];}(jQuery));(function(){var _0x3d88db=jQuery;if(_0x29f6('0xe')!==typeof _0x3d88db['fn'][_0x29f6('0x26')]){_0x3d88db(function(){var _0x1c3f0b=vtexjs[_0x29f6('0x27')][_0x29f6('0x28')];vtexjs[_0x29f6('0x27')][_0x29f6('0x28')]=function(){return _0x1c3f0b[_0x29f6('0x29')]();};});try{window['QuatroDigital_simpleCart']=window['QuatroDigital_simpleCart']||{};window[_0x29f6('0x2a')]['ajaxStopOn']=!0x1;_0x3d88db['fn'][_0x29f6('0x26')]=function(_0xc8d2c5,_0x1e1bb6,_0x46f162){var _0x5e5d89=function(_0x53e11f,_0x1bde69){if(_0x29f6('0x16')===typeof console){var _0x2edc2e=_0x29f6('0x16')===typeof _0x53e11f;_0x29f6('0x2')!==typeof _0x1bde69&&_0x29f6('0x2b')===_0x1bde69[_0x29f6('0xd')]()?_0x2edc2e?console[_0x29f6('0x2c')](_0x29f6('0x2d'),_0x53e11f[0x0],_0x53e11f[0x1],_0x53e11f[0x2],_0x53e11f[0x3],_0x53e11f[0x4],_0x53e11f[0x5],_0x53e11f[0x6],_0x53e11f[0x7]):console[_0x29f6('0x2c')](_0x29f6('0x2d')+_0x53e11f):_0x29f6('0x2')!==typeof _0x1bde69&&_0x29f6('0x2e')===_0x1bde69[_0x29f6('0xd')]()?_0x2edc2e?console['info']('[Simple\x20Cart]\x0a',_0x53e11f[0x0],_0x53e11f[0x1],_0x53e11f[0x2],_0x53e11f[0x3],_0x53e11f[0x4],_0x53e11f[0x5],_0x53e11f[0x6],_0x53e11f[0x7]):console[_0x29f6('0x2e')](_0x29f6('0x2d')+_0x53e11f):_0x2edc2e?console[_0x29f6('0x13')]('[Simple\x20Cart]\x0a',_0x53e11f[0x0],_0x53e11f[0x1],_0x53e11f[0x2],_0x53e11f[0x3],_0x53e11f[0x4],_0x53e11f[0x5],_0x53e11f[0x6],_0x53e11f[0x7]):console[_0x29f6('0x13')](_0x29f6('0x2d')+_0x53e11f);}};var _0xe3b91f=_0x3d88db(this);_0x29f6('0x16')===typeof _0xc8d2c5?_0x1e1bb6=_0xc8d2c5:(_0xc8d2c5=_0xc8d2c5||!0x1,_0xe3b91f=_0xe3b91f[_0x29f6('0x2f')](_0x3d88db['QD_simpleCart'][_0x29f6('0x30')]));if(!_0xe3b91f[_0x29f6('0x4')])return _0xe3b91f;_0x3d88db[_0x29f6('0x31')][_0x29f6('0x30')]=_0x3d88db['QD_simpleCart'][_0x29f6('0x30')][_0x29f6('0x2f')](_0xe3b91f);_0x46f162=_0x29f6('0x2')===typeof _0x46f162?!0x1:_0x46f162;var _0x105557={'cartQtt':'.qd_cart_qtt','cartTotal':'.qd_cart_total','itemsText':_0x29f6('0x32'),'currencySymbol':(_0x3d88db('meta[name=currency]')[_0x29f6('0x33')]('content')||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x3a1a75=_0x3d88db['extend']({},_0x105557,_0x1e1bb6);var _0x34b1ea=_0x3d88db('');_0xe3b91f[_0x29f6('0x34')](function(){var _0x5448c4=_0x3d88db(this);_0x5448c4[_0x29f6('0x17')]('qd_simpleCartOpts')||_0x5448c4[_0x29f6('0x17')](_0x29f6('0x35'),_0x3a1a75);});var _0x4aea11=function(_0xf9c531){window[_0x29f6('0x36')]=window[_0x29f6('0x36')]||{};for(var _0xc8d2c5=0x0,_0x47afbf=0x0,_0x43da1a=0x0;_0x43da1a<_0xf9c531[_0x29f6('0x37')][_0x29f6('0x4')];_0x43da1a++)_0x29f6('0x38')==_0xf9c531[_0x29f6('0x37')][_0x43da1a]['id']&&(_0x47afbf+=_0xf9c531['totalizers'][_0x43da1a][_0x29f6('0x39')]),_0xc8d2c5+=_0xf9c531['totalizers'][_0x43da1a][_0x29f6('0x39')];window['_QuatroDigital_CartData'][_0x29f6('0x3a')]=_0x3a1a75[_0x29f6('0x3b')]+qd_number_format(_0xc8d2c5/0x64,0x2,',','.');window['_QuatroDigital_CartData'][_0x29f6('0x3c')]=_0x3a1a75[_0x29f6('0x3b')]+qd_number_format(_0x47afbf/0x64,0x2,',','.');window[_0x29f6('0x36')][_0x29f6('0x3d')]=_0x3a1a75['currencySymbol']+qd_number_format((_0xc8d2c5+_0x47afbf)/0x64,0x2,',','.');window[_0x29f6('0x36')][_0x29f6('0x3e')]=0x0;if(_0x3a1a75[_0x29f6('0x3f')])for(_0x43da1a=0x0;_0x43da1a<_0xf9c531['items'][_0x29f6('0x4')];_0x43da1a++)window['_QuatroDigital_CartData'][_0x29f6('0x3e')]+=_0xf9c531['items'][_0x43da1a]['quantity'];else window['_QuatroDigital_CartData'][_0x29f6('0x3e')]=_0xf9c531[_0x29f6('0x40')][_0x29f6('0x4')]||0x0;try{window[_0x29f6('0x36')][_0x29f6('0x41')]&&window[_0x29f6('0x36')][_0x29f6('0x41')][_0x29f6('0x42')]&&window[_0x29f6('0x36')][_0x29f6('0x41')]['fire']();}catch(_0x562f70){_0x5e5d89(_0x29f6('0x43'));}_0x509caf(_0x34b1ea);};var _0x450e76=function(_0x7a65c0,_0x1e14a1){0x1===_0x7a65c0?_0x1e14a1['hide']()[_0x29f6('0x44')](_0x29f6('0x45'))['show']():_0x1e14a1[_0x29f6('0x46')]()[_0x29f6('0x44')](_0x29f6('0x47'))[_0x29f6('0x48')]();};var _0x1ab004=function(_0x461208){0x1>_0x461208?_0xe3b91f[_0x29f6('0x49')](_0x29f6('0x4a')):_0xe3b91f[_0x29f6('0x4b')](_0x29f6('0x4a'));};var _0x204a6e=function(_0xb9694,_0x58ea69){var _0x416c24=parseInt(window[_0x29f6('0x36')][_0x29f6('0x3e')],0xa);_0x58ea69[_0x29f6('0x4c')][_0x29f6('0x48')]();isNaN(_0x416c24)&&(_0x5e5d89('O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.',_0x29f6('0x2b')),_0x416c24=0x0);_0x58ea69['cartTotalE']['html'](window[_0x29f6('0x36')][_0x29f6('0x3a')]);_0x58ea69[_0x29f6('0x4d')][_0x29f6('0x4e')](_0x416c24);_0x450e76(_0x416c24,_0x58ea69[_0x29f6('0x4f')]);_0x1ab004(_0x416c24);};var _0x509caf=function(_0x167976){_0xe3b91f[_0x29f6('0x34')](function(){var _0x5f42f3={};var _0x3bf079=_0x3d88db(this);_0xc8d2c5&&_0x3bf079['data'](_0x29f6('0x35'))&&_0x3d88db[_0x29f6('0x14')](_0x3a1a75,_0x3bf079[_0x29f6('0x17')](_0x29f6('0x35')));_0x5f42f3['$this']=_0x3bf079;_0x5f42f3[_0x29f6('0x4d')]=_0x3bf079[_0x29f6('0x50')](_0x3a1a75[_0x29f6('0x51')])||_0x34b1ea;_0x5f42f3[_0x29f6('0x52')]=_0x3bf079[_0x29f6('0x50')](_0x3a1a75[_0x29f6('0x53')])||_0x34b1ea;_0x5f42f3[_0x29f6('0x4f')]=_0x3bf079['find'](_0x3a1a75[_0x29f6('0x54')])||_0x34b1ea;_0x5f42f3[_0x29f6('0x55')]=_0x3bf079[_0x29f6('0x50')](_0x3a1a75[_0x29f6('0x56')])||_0x34b1ea;_0x204a6e(_0x167976,_0x5f42f3);_0x3bf079[_0x29f6('0x49')](_0x29f6('0x57'));});};(function(){if(_0x3a1a75[_0x29f6('0x58')]){window[_0x29f6('0x59')]=window[_0x29f6('0x59')]||{};if(_0x29f6('0x2')!==typeof window['_QuatroDigital_DropDown']['getOrderForm']&&(_0x46f162||!_0xc8d2c5))return _0x4aea11(window[_0x29f6('0x59')][_0x29f6('0x28')]);if(_0x29f6('0x16')!==typeof window['vtexjs']||_0x29f6('0x2')===typeof window['vtexjs']['checkout'])if(_0x29f6('0x16')===typeof vtex&&_0x29f6('0x16')===typeof vtex['checkout']&&'undefined'!==typeof vtex[_0x29f6('0x27')][_0x29f6('0x5a')])new vtex[(_0x29f6('0x27'))]['SDK']();else return _0x5e5d89(_0x29f6('0x5b'));_0x3d88db[_0x29f6('0x5c')]([_0x29f6('0x40'),_0x29f6('0x37'),_0x29f6('0x5d')],{'done':function(_0x398cc6){_0x4aea11(_0x398cc6);window[_0x29f6('0x59')][_0x29f6('0x28')]=_0x398cc6;},'fail':function(_0x2fb6f8){_0x5e5d89([_0x29f6('0x5e'),_0x2fb6f8]);}});}else alert(_0x29f6('0x5f'));}());_0x3a1a75[_0x29f6('0x41')]();_0x3d88db(window)[_0x29f6('0x60')]('simpleCartCallback.quatro_digital');return _0xe3b91f;};_0x3d88db['QD_simpleCart']={'elements':_0x3d88db('')};_0x3d88db(function(){var _0x2bd7d9;'function'===typeof window[_0x29f6('0x61')]&&(_0x2bd7d9=window[_0x29f6('0x61')],window[_0x29f6('0x61')]=function(_0x40b4d7,_0x2f757b,_0x503068,_0x56c442,_0x38d684){_0x2bd7d9[_0x29f6('0x29')](this,_0x40b4d7,_0x2f757b,_0x503068,_0x56c442,function(){_0x29f6('0xe')===typeof _0x38d684&&_0x38d684();_0x3d88db[_0x29f6('0x31')]['elements'][_0x29f6('0x34')](function(){var _0x5accac=_0x3d88db(this);_0x5accac['simpleCart'](_0x5accac[_0x29f6('0x17')](_0x29f6('0x35')));});});});});var _0x5526b6=window[_0x29f6('0x62')]||void 0x0;window[_0x29f6('0x62')]=function(_0x58bdf4){_0x3d88db['fn'][_0x29f6('0x26')](!0x0);_0x29f6('0xe')===typeof _0x5526b6?_0x5526b6[_0x29f6('0x29')](this,_0x58bdf4):alert(_0x58bdf4);};_0x3d88db(function(){var _0x2f54eb=_0x3d88db(_0x29f6('0x63'));_0x2f54eb[_0x29f6('0x4')]&&_0x2f54eb[_0x29f6('0x26')]();});_0x3d88db(function(){_0x3d88db(window)['bind'](_0x29f6('0x64'),function(){_0x3d88db['fn']['simpleCart'](!0x0);});});}catch(_0x37162d){'undefined'!==typeof console&&'function'===typeof console[_0x29f6('0x13')]&&console[_0x29f6('0x13')](_0x29f6('0x65'),_0x37162d);}}}());(function(){var _0x536b0c=function(_0x728094,_0x35623a){if(_0x29f6('0x16')===typeof console){var _0xc50331=_0x29f6('0x16')===typeof _0x728094;_0x29f6('0x2')!==typeof _0x35623a&&_0x29f6('0x2b')===_0x35623a[_0x29f6('0xd')]()?_0xc50331?console['warn'](_0x29f6('0x66'),_0x728094[0x0],_0x728094[0x1],_0x728094[0x2],_0x728094[0x3],_0x728094[0x4],_0x728094[0x5],_0x728094[0x6],_0x728094[0x7]):console[_0x29f6('0x2c')](_0x29f6('0x66')+_0x728094):_0x29f6('0x2')!==typeof _0x35623a&&_0x29f6('0x2e')===_0x35623a[_0x29f6('0xd')]()?_0xc50331?console[_0x29f6('0x2e')](_0x29f6('0x66'),_0x728094[0x0],_0x728094[0x1],_0x728094[0x2],_0x728094[0x3],_0x728094[0x4],_0x728094[0x5],_0x728094[0x6],_0x728094[0x7]):console['info'](_0x29f6('0x66')+_0x728094):_0xc50331?console[_0x29f6('0x13')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x728094[0x0],_0x728094[0x1],_0x728094[0x2],_0x728094[0x3],_0x728094[0x4],_0x728094[0x5],_0x728094[0x6],_0x728094[0x7]):console[_0x29f6('0x13')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a'+_0x728094);}},_0x6ae738=null,_0x373cf6={},_0x3e600b={},_0x5625b1={};$[_0x29f6('0x5c')]=function(_0x5a383f,_0x5bde9f){if(null===_0x6ae738)if(_0x29f6('0x16')===typeof window[_0x29f6('0x67')]&&'undefined'!==typeof window['vtexjs']['checkout'])_0x6ae738=window[_0x29f6('0x67')][_0x29f6('0x27')];else return _0x536b0c(_0x29f6('0x68'));var _0x3125af=$[_0x29f6('0x14')]({'done':function(){},'fail':function(){}},_0x5bde9f),_0x291663=_0x5a383f['join'](';'),_0x35fdb5=function(){_0x373cf6[_0x291663][_0x29f6('0x2f')](_0x3125af[_0x29f6('0x69')]);_0x3e600b[_0x291663][_0x29f6('0x2f')](_0x3125af[_0x29f6('0x1e')]);};_0x5625b1[_0x291663]?_0x35fdb5():(_0x373cf6[_0x291663]=$['Callbacks'](),_0x3e600b[_0x291663]=$[_0x29f6('0x6a')](),_0x35fdb5(),_0x5625b1[_0x291663]=!0x0,_0x6ae738[_0x29f6('0x28')](_0x5a383f)[_0x29f6('0x69')](function(_0x34094c){_0x5625b1[_0x291663]=!0x1;_0x373cf6[_0x291663][_0x29f6('0x42')](_0x34094c);})['fail'](function(_0x1c2e56){_0x5625b1[_0x291663]=!0x1;_0x3e600b[_0x291663][_0x29f6('0x42')](_0x1c2e56);}));};}());(function(_0x1d4e73){try{var _0x1f401c=jQuery,_0x4273a3,_0x1fe06b=_0x1f401c({}),_0x482807=function(_0x4e3a86,_0x531c0e){if('object'===typeof console&&_0x29f6('0x2')!==typeof console['error']&&_0x29f6('0x2')!==typeof console[_0x29f6('0x2e')]&&_0x29f6('0x2')!==typeof console[_0x29f6('0x2c')]){var _0x8a5e58;_0x29f6('0x16')===typeof _0x4e3a86?(_0x4e3a86[_0x29f6('0x6b')]('[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a'),_0x8a5e58=_0x4e3a86):_0x8a5e58=[_0x29f6('0x6c')+_0x4e3a86];if('undefined'===typeof _0x531c0e||_0x29f6('0x2b')!==_0x531c0e[_0x29f6('0xd')]()&&_0x29f6('0x6d')!==_0x531c0e[_0x29f6('0xd')]())if(_0x29f6('0x2')!==typeof _0x531c0e&&_0x29f6('0x2e')===_0x531c0e[_0x29f6('0xd')]())try{console[_0x29f6('0x2e')][_0x29f6('0x6e')](console,_0x8a5e58);}catch(_0xe14459){try{console[_0x29f6('0x2e')](_0x8a5e58[_0x29f6('0x6')]('\x0a'));}catch(_0x565c20){}}else try{console['error']['apply'](console,_0x8a5e58);}catch(_0xa31c7d){try{console[_0x29f6('0x13')](_0x8a5e58['join']('\x0a'));}catch(_0xf18d73){}}else try{console['warn'][_0x29f6('0x6e')](console,_0x8a5e58);}catch(_0x2a1577){try{console[_0x29f6('0x2c')](_0x8a5e58[_0x29f6('0x6')]('\x0a'));}catch(_0x45b42c){}}}},_0x2d4931={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0x29f6('0x6f'),'buyQtt':_0x29f6('0x70'),'selectSkuMsg':_0x29f6('0x71'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x43c051,_0xa2ab9e,_0x57228f){_0x1f401c(_0x29f6('0x72'))['is']('.productQuickView')&&(_0x29f6('0x1d')===_0xa2ab9e?alert(_0x29f6('0x73')):(alert(_0x29f6('0x74')),(_0x29f6('0x16')===typeof parent?parent:document)[_0x29f6('0x75')][_0x29f6('0x76')]=_0x57228f));},'isProductPage':function(){return _0x1f401c(_0x29f6('0x72'))['is'](_0x29f6('0x77'));},'execDefaultAction':function(_0x546e14){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x1f401c[_0x29f6('0x78')]=function(_0x1df9db,_0x4e185f){function _0x4bb53f(_0x216f51){_0x4273a3[_0x29f6('0x79')]?_0x216f51[_0x29f6('0x17')](_0x29f6('0x7a'))||(_0x216f51[_0x29f6('0x17')](_0x29f6('0x7a'),0x1),_0x216f51['on'](_0x29f6('0x7b'),function(_0x28ad3a){if(!_0x4273a3[_0x29f6('0x7c')]())return!0x0;if(!0x0!==_0x344a5d[_0x29f6('0x7d')][_0x29f6('0x29')](this))return _0x28ad3a[_0x29f6('0x7e')](),!0x1;})):alert('Método\x20descontinuado!');}function _0x4b9631(_0x2e2f16){_0x2e2f16=_0x2e2f16||_0x1f401c(_0x4273a3[_0x29f6('0x7f')]);_0x2e2f16['each'](function(){var _0x2e2f16=_0x1f401c(this);_0x2e2f16['is'](_0x29f6('0x80'))||(_0x2e2f16[_0x29f6('0x49')](_0x29f6('0x81')),_0x2e2f16['is'](_0x29f6('0x82'))&&!_0x2e2f16['is'](_0x29f6('0x83'))||_0x2e2f16[_0x29f6('0x17')]('qd-bb-active')||(_0x2e2f16[_0x29f6('0x17')](_0x29f6('0x84'),0x1),_0x2e2f16[_0x29f6('0x85')]('.qd-bb-productAdded')[_0x29f6('0x4')]||_0x2e2f16[_0x29f6('0x86')]('<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>'),_0x2e2f16['is'](_0x29f6('0x87'))&&_0x4273a3[_0x29f6('0x88')]()&&_0x109a61['call'](_0x2e2f16),_0x4bb53f(_0x2e2f16)));});_0x4273a3[_0x29f6('0x88')]()&&!_0x2e2f16['length']&&_0x482807(_0x29f6('0x89')+_0x2e2f16[_0x29f6('0x8a')]+'\x27.',_0x29f6('0x2e'));}var _0x3a7064=_0x1f401c(_0x1df9db);var _0x344a5d=this;window[_0x29f6('0x8b')]=window['_Quatro_Digital_dropDown']||{};window['_QuatroDigital_CartData']=window[_0x29f6('0x36')]||{};_0x344a5d[_0x29f6('0x8c')]=function(_0x4f279a,_0x3025df){_0x3a7064['addClass'](_0x29f6('0x8d'));_0x1f401c(_0x29f6('0x72'))[_0x29f6('0x49')](_0x29f6('0x8e'));var _0x13d7b7=_0x1f401c(_0x4273a3[_0x29f6('0x7f')])[_0x29f6('0x44')]('[href=\x27'+(_0x4f279a[_0x29f6('0x33')](_0x29f6('0x76'))||_0x29f6('0x8f'))+'\x27]')['add'](_0x4f279a);_0x13d7b7['addClass']('qd-bb-itemAddBuyButtonWrapper');setTimeout(function(){_0x3a7064['removeClass'](_0x29f6('0x90'));_0x13d7b7['removeClass']('qd-bb-itemAddBuyButtonWrapper');},_0x4273a3['timeRemoveNewItemClass']);window[_0x29f6('0x8b')][_0x29f6('0x28')]=void 0x0;if(_0x29f6('0x2')!==typeof _0x4e185f&&_0x29f6('0xe')===typeof _0x4e185f[_0x29f6('0x91')])return _0x4273a3['isSmartCheckout']||(_0x482807(_0x29f6('0x92')),_0x4e185f['getCartInfoByUrl']()),window[_0x29f6('0x59')][_0x29f6('0x28')]=void 0x0,_0x4e185f[_0x29f6('0x91')](function(_0x13a81b){window['_Quatro_Digital_dropDown']['getOrderForm']=_0x13a81b;_0x1f401c['fn'][_0x29f6('0x26')](!0x0,void 0x0,!0x0);},{'lastSku':_0x3025df});window[_0x29f6('0x8b')][_0x29f6('0x93')]=!0x0;_0x1f401c['fn']['simpleCart'](!0x0);};(function(){if(_0x4273a3[_0x29f6('0x79')]&&_0x4273a3[_0x29f6('0x94')]){var _0x4b1827=_0x1f401c(_0x29f6('0x82'));_0x4b1827[_0x29f6('0x4')]&&_0x4b9631(_0x4b1827);}}());var _0x109a61=function(){var _0x30f4ad=_0x1f401c(this);_0x29f6('0x2')!==typeof _0x30f4ad[_0x29f6('0x17')](_0x29f6('0x7f'))?(_0x30f4ad[_0x29f6('0x95')](_0x29f6('0x96')),_0x4bb53f(_0x30f4ad)):(_0x30f4ad[_0x29f6('0x97')]('mouseenter.qd_bb_buy_sc',function(_0xd6a753){_0x30f4ad['unbind']('click');_0x4bb53f(_0x30f4ad);_0x1f401c(this)['unbind'](_0xd6a753);}),_0x1f401c(window)[_0x29f6('0x98')](function(){_0x30f4ad[_0x29f6('0x95')]('click');_0x4bb53f(_0x30f4ad);_0x30f4ad['unbind'](_0x29f6('0x99'));}));};_0x344a5d[_0x29f6('0x7d')]=function(){var _0x588422=_0x1f401c(this),_0x1df9db=_0x588422['attr']('href')||'';if(-0x1<_0x1df9db[_0x29f6('0x9a')](_0x4273a3['selectSkuMsg']))return!0x0;_0x1df9db=_0x1df9db[_0x29f6('0x5')](/redirect\=(false|true)/gi,'')[_0x29f6('0x5')]('?','?redirect=false&')[_0x29f6('0x5')](/\&\&/gi,'&');if(_0x4273a3[_0x29f6('0x9b')](_0x588422))return _0x588422['attr'](_0x29f6('0x76'),_0x1df9db[_0x29f6('0x5')](_0x29f6('0x9c'),_0x29f6('0x9d'))),!0x0;_0x1df9db=_0x1df9db[_0x29f6('0x5')](/http.?:/i,'');_0x1fe06b[_0x29f6('0x9e')](function(_0x36bb0d){if(!_0x4273a3[_0x29f6('0x9f')]&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0x29f6('0xa0')](_0x1df9db))return _0x36bb0d();var _0xf8d1de=function(_0x3bcf4a,_0x111a15){var _0x4b9631=_0x1df9db['match'](/sku\=([0-9]+)/gi),_0x3c2282=[];if(_0x29f6('0x16')===typeof _0x4b9631&&null!==_0x4b9631)for(var _0x252bab=_0x4b9631[_0x29f6('0x4')]-0x1;0x0<=_0x252bab;_0x252bab--){var _0x264617=parseInt(_0x4b9631[_0x252bab][_0x29f6('0x5')](/sku\=/gi,''));isNaN(_0x264617)||_0x3c2282[_0x29f6('0xa1')](_0x264617);}_0x4273a3[_0x29f6('0xa2')]['call'](this,_0x3bcf4a,_0x111a15,_0x1df9db);_0x344a5d[_0x29f6('0xa3')]['call'](this,_0x3bcf4a,_0x111a15,_0x1df9db,_0x3c2282);_0x344a5d[_0x29f6('0x8c')](_0x588422,_0x1df9db[_0x29f6('0xa4')](_0x29f6('0xa5'))[_0x29f6('0xa6')]()[_0x29f6('0xa4')]('&')[_0x29f6('0xa7')]());_0x29f6('0xe')===typeof _0x4273a3[_0x29f6('0xa8')]&&_0x4273a3[_0x29f6('0xa8')]['call'](this);_0x1f401c(window)[_0x29f6('0x60')](_0x29f6('0xa9'));_0x1f401c(window)['trigger']('cartProductAdded.vtex');};_0x4273a3[_0x29f6('0xaa')]?(_0xf8d1de(null,_0x29f6('0x1d')),_0x36bb0d()):_0x1f401c[_0x29f6('0x1c')]({'url':_0x1df9db,'complete':_0xf8d1de})[_0x29f6('0x1f')](function(){_0x36bb0d();});});};_0x344a5d['buyButtonClickCallback']=function(_0x246144,_0x2fd65b,_0x4dfb51,_0x3d8d44){try{_0x29f6('0x1d')===_0x2fd65b&&_0x29f6('0x16')===typeof window[_0x29f6('0xab')]&&_0x29f6('0xe')===typeof window[_0x29f6('0xab')][_0x29f6('0xac')]&&window[_0x29f6('0xab')][_0x29f6('0xac')](_0x246144,_0x2fd65b,_0x4dfb51,_0x3d8d44);}catch(_0x1aa5a7){_0x482807(_0x29f6('0xad'));}};_0x4b9631();_0x29f6('0xe')===typeof _0x4273a3[_0x29f6('0x41')]?_0x4273a3['callback'][_0x29f6('0x29')](this):_0x482807(_0x29f6('0xae'));};var _0x16ec76=_0x1f401c[_0x29f6('0x6a')]();_0x1f401c['fn']['QD_buyButton']=function(_0x29f5de,_0x2ffad1){var _0x1d4e73=_0x1f401c(this);'undefined'!==typeof _0x2ffad1||_0x29f6('0x16')!==typeof _0x29f5de||_0x29f5de instanceof _0x1f401c||(_0x2ffad1=_0x29f5de,_0x29f5de=void 0x0);_0x4273a3=_0x1f401c[_0x29f6('0x14')]({},_0x2d4931,_0x2ffad1);var _0x4d02ae;_0x16ec76[_0x29f6('0x2f')](function(){_0x1d4e73[_0x29f6('0x85')](_0x29f6('0xaf'))[_0x29f6('0x4')]||_0x1d4e73[_0x29f6('0xb0')](_0x29f6('0xb1'));_0x4d02ae=new _0x1f401c[(_0x29f6('0x78'))](_0x1d4e73,_0x29f5de);});_0x16ec76[_0x29f6('0x42')]();_0x1f401c(window)['on'](_0x29f6('0xb2'),function(_0x303732,_0x1dfd8a,_0x5bc6df){_0x4d02ae['prodAdd'](_0x1dfd8a,_0x5bc6df);});return _0x1f401c[_0x29f6('0x14')](_0x1d4e73,_0x4d02ae);};var _0x201d43=0x0;_0x1f401c(document)[_0x29f6('0xb3')](function(_0x1f0e72,_0xf0949d,_0xc9107e){-0x1<_0xc9107e[_0x29f6('0x1a')][_0x29f6('0xd')]()['indexOf']('/checkout/cart/add')&&(_0x201d43=(_0xc9107e['url'][_0x29f6('0xb4')](/sku\=([0-9]+)/i)||[''])[_0x29f6('0xa6')]());});_0x1f401c(window)[_0x29f6('0x97')](_0x29f6('0xb5'),function(){_0x1f401c(window)['trigger'](_0x29f6('0xb2'),[new _0x1f401c(),_0x201d43]);});_0x1f401c(document)[_0x29f6('0xb6')](function(){_0x16ec76['fire']();});}catch(_0x1ef540){'undefined'!==typeof console&&_0x29f6('0xe')===typeof console[_0x29f6('0x13')]&&console[_0x29f6('0x13')](_0x29f6('0x65'),_0x1ef540);}}(this));function qd_number_format(_0x5a0e89,_0x15312a,_0x47bb32,_0x47785a){_0x5a0e89=(_0x5a0e89+'')[_0x29f6('0x5')](/[^0-9+\-Ee.]/g,'');_0x5a0e89=isFinite(+_0x5a0e89)?+_0x5a0e89:0x0;_0x15312a=isFinite(+_0x15312a)?Math[_0x29f6('0x1')](_0x15312a):0x0;_0x47785a=_0x29f6('0x2')===typeof _0x47785a?',':_0x47785a;_0x47bb32=_0x29f6('0x2')===typeof _0x47bb32?'.':_0x47bb32;var _0x5a295b='',_0x5a295b=function(_0x255770,_0x5c8c5f){var _0x5db958=Math[_0x29f6('0x3')](0xa,_0x5c8c5f);return''+(Math['round'](_0x255770*_0x5db958)/_0x5db958)[_0x29f6('0xb7')](_0x5c8c5f);},_0x5a295b=(_0x15312a?_0x5a295b(_0x5a0e89,_0x15312a):''+Math[_0x29f6('0xb8')](_0x5a0e89))[_0x29f6('0xa4')]('.');0x3<_0x5a295b[0x0][_0x29f6('0x4')]&&(_0x5a295b[0x0]=_0x5a295b[0x0][_0x29f6('0x5')](/\B(?=(?:\d{3})+(?!\d))/g,_0x47785a));(_0x5a295b[0x1]||'')[_0x29f6('0x4')]<_0x15312a&&(_0x5a295b[0x1]=_0x5a295b[0x1]||'',_0x5a295b[0x1]+=Array(_0x15312a-_0x5a295b[0x1]['length']+0x1)[_0x29f6('0x6')]('0'));return _0x5a295b[_0x29f6('0x6')](_0x47bb32);}(function(){try{window[_0x29f6('0x36')]=window[_0x29f6('0x36')]||{},window[_0x29f6('0x36')][_0x29f6('0x41')]=window[_0x29f6('0x36')][_0x29f6('0x41')]||$[_0x29f6('0x6a')]();}catch(_0x23299b){_0x29f6('0x2')!==typeof console&&'function'===typeof console[_0x29f6('0x13')]&&console[_0x29f6('0x13')]('Oooops!\x20',_0x23299b[_0x29f6('0x22')]);}}());(function(_0x41854a){try{var _0x21cd96=jQuery,_0x50d48d=function(_0x5f1781,_0x1413a5){if(_0x29f6('0x16')===typeof console&&_0x29f6('0x2')!==typeof console[_0x29f6('0x13')]&&_0x29f6('0x2')!==typeof console[_0x29f6('0x2e')]&&'undefined'!==typeof console[_0x29f6('0x2c')]){var _0x140d21;'object'===typeof _0x5f1781?(_0x5f1781['unshift']('[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'),_0x140d21=_0x5f1781):_0x140d21=[_0x29f6('0xb9')+_0x5f1781];if('undefined'===typeof _0x1413a5||_0x29f6('0x2b')!==_0x1413a5['toLowerCase']()&&_0x29f6('0x6d')!==_0x1413a5[_0x29f6('0xd')]())if(_0x29f6('0x2')!==typeof _0x1413a5&&_0x29f6('0x2e')===_0x1413a5[_0x29f6('0xd')]())try{console['info'][_0x29f6('0x6e')](console,_0x140d21);}catch(_0x593374){try{console[_0x29f6('0x2e')](_0x140d21[_0x29f6('0x6')]('\x0a'));}catch(_0x46147d){}}else try{console[_0x29f6('0x13')][_0x29f6('0x6e')](console,_0x140d21);}catch(_0x2e00ed){try{console[_0x29f6('0x13')](_0x140d21[_0x29f6('0x6')]('\x0a'));}catch(_0x4acb9e){}}else try{console[_0x29f6('0x2c')]['apply'](console,_0x140d21);}catch(_0x1f9fdb){try{console[_0x29f6('0x2c')](_0x140d21['join']('\x0a'));}catch(_0x3bc31d){}}}};window['_QuatroDigital_DropDown']=window[_0x29f6('0x59')]||{};window[_0x29f6('0x59')]['allowUpdate']=!0x0;_0x21cd96[_0x29f6('0xba')]=function(){};_0x21cd96['fn'][_0x29f6('0xba')]=function(){return{'fn':new _0x21cd96()};};var _0x4ef377=function(_0x3d6aaf){var _0x22a012={'t':_0x29f6('0xbb')};return function(_0x39b911){var _0x352a07=function(_0x261546){return _0x261546;};var _0x41ec6a=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x39b911=_0x39b911['d'+_0x41ec6a[0x10]+'c'+_0x41ec6a[0x11]+'m'+_0x352a07(_0x41ec6a[0x1])+'n'+_0x41ec6a[0xd]]['l'+_0x41ec6a[0x12]+'c'+_0x41ec6a[0x0]+'ti'+_0x352a07('o')+'n'];var _0x160412=function(_0x5ce5a2){return escape(encodeURIComponent(_0x5ce5a2[_0x29f6('0x5')](/\./g,'¨')[_0x29f6('0x5')](/[a-zA-Z]/g,function(_0x2c0bf3){return String[_0x29f6('0xbc')](('Z'>=_0x2c0bf3?0x5a:0x7a)>=(_0x2c0bf3=_0x2c0bf3['charCodeAt'](0x0)+0xd)?_0x2c0bf3:_0x2c0bf3-0x1a);})));};var _0x41854a=_0x160412(_0x39b911[[_0x41ec6a[0x9],_0x352a07('o'),_0x41ec6a[0xc],_0x41ec6a[_0x352a07(0xd)]][_0x29f6('0x6')]('')]);_0x160412=_0x160412((window[['js',_0x352a07('no'),'m',_0x41ec6a[0x1],_0x41ec6a[0x4][_0x29f6('0xb')](),_0x29f6('0xbd')][_0x29f6('0x6')]('')]||'---')+['.v',_0x41ec6a[0xd],'e',_0x352a07('x'),'co',_0x352a07('mm'),'erc',_0x41ec6a[0x1],'.c',_0x352a07('o'),'m.',_0x41ec6a[0x13],'r'][_0x29f6('0x6')](''));for(var _0x1b3b27 in _0x22a012){if(_0x160412===_0x1b3b27+_0x22a012[_0x1b3b27]||_0x41854a===_0x1b3b27+_0x22a012[_0x1b3b27]){var _0x4b33bd='tr'+_0x41ec6a[0x11]+'e';break;}_0x4b33bd='f'+_0x41ec6a[0x0]+'ls'+_0x352a07(_0x41ec6a[0x1])+'';}_0x352a07=!0x1;-0x1<_0x39b911[[_0x41ec6a[0xc],'e',_0x41ec6a[0x0],'rc',_0x41ec6a[0x9]][_0x29f6('0x6')]('')]['indexOf']('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x352a07=!0x0);return[_0x4b33bd,_0x352a07];}(_0x3d6aaf);}(window);if(!eval(_0x4ef377[0x0]))return _0x4ef377[0x1]?_0x50d48d(_0x29f6('0xbe')):!0x1;_0x21cd96['QD_dropDownCart']=function(_0x26015a,_0x24a7fb){var _0x454c4c=_0x21cd96(_0x26015a);if(!_0x454c4c[_0x29f6('0x4')])return _0x454c4c;var _0x5af496=_0x21cd96[_0x29f6('0x14')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x29f6('0xbf'),'linkCheckout':_0x29f6('0xc0'),'cartTotal':_0x29f6('0xc1'),'emptyCart':_0x29f6('0xc2'),'continueShopping':_0x29f6('0xc3'),'shippingForm':'<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x5b0395){return _0x5b0395[_0x29f6('0xc4')]||_0x5b0395[_0x29f6('0xc5')];},'callback':function(){},'callbackProductsList':function(){}},_0x24a7fb);_0x21cd96('');var _0xc45192=this;if(_0x5af496[_0x29f6('0x58')]){var _0xcbe24=!0x1;_0x29f6('0x2')===typeof window[_0x29f6('0x67')]&&(_0x50d48d(_0x29f6('0xc6')),_0x21cd96[_0x29f6('0x1c')]({'url':_0x29f6('0xc7'),'async':!0x1,'dataType':_0x29f6('0xc8'),'error':function(){_0x50d48d(_0x29f6('0xc9'));_0xcbe24=!0x0;}}));if(_0xcbe24)return _0x50d48d(_0x29f6('0xca'));}if(_0x29f6('0x16')===typeof window[_0x29f6('0x67')]&&'undefined'!==typeof window[_0x29f6('0x67')][_0x29f6('0x27')])var _0x11bd65=window[_0x29f6('0x67')][_0x29f6('0x27')];else if('object'===typeof vtex&&_0x29f6('0x16')===typeof vtex[_0x29f6('0x27')]&&_0x29f6('0x2')!==typeof vtex['checkout'][_0x29f6('0x5a')])_0x11bd65=new vtex[(_0x29f6('0x27'))][(_0x29f6('0x5a'))]();else return _0x50d48d(_0x29f6('0x5b'));_0xc45192['cartContainer']=_0x29f6('0xcb');var _0x4f9bf9=function(_0xc451ff){_0x21cd96(this)['append'](_0xc451ff);_0xc451ff[_0x29f6('0x50')](_0x29f6('0xcc'))[_0x29f6('0x2f')](_0x21cd96(_0x29f6('0xcd')))['on']('click.qd_ddc_closeFn',function(){_0x454c4c[_0x29f6('0x4b')](_0x29f6('0xce'));_0x21cd96(document[_0x29f6('0x72')])[_0x29f6('0x4b')](_0x29f6('0x8e'));});_0x21cd96(document)[_0x29f6('0xcf')](_0x29f6('0xd0'))['on'](_0x29f6('0xd0'),function(_0x2c15ad){0x1b==_0x2c15ad[_0x29f6('0xd1')]&&(_0x454c4c[_0x29f6('0x4b')](_0x29f6('0xce')),_0x21cd96(document['body'])[_0x29f6('0x4b')](_0x29f6('0x8e')));});var _0x24937f=_0xc451ff[_0x29f6('0x50')](_0x29f6('0xd2'));_0xc451ff[_0x29f6('0x50')](_0x29f6('0xd3'))['on'](_0x29f6('0xd4'),function(){_0xc45192['scrollCart']('-',void 0x0,void 0x0,_0x24937f);return!0x1;});_0xc451ff[_0x29f6('0x50')]('.qd-ddc-scrollDown')['on']('click.qd_ddc_scrollDown',function(){_0xc45192[_0x29f6('0xd5')](void 0x0,void 0x0,void 0x0,_0x24937f);return!0x1;});_0xc451ff['find'](_0x29f6('0xd6'))[_0x29f6('0xd7')]('')['on']('keyup.qd_ddc_cep',function(){_0xc45192[_0x29f6('0xd8')](_0x21cd96(this));});if(_0x5af496[_0x29f6('0xd9')]){var _0x24a7fb=0x0;_0x21cd96(this)['on'](_0x29f6('0xda'),function(){var _0xc451ff=function(){window[_0x29f6('0x59')][_0x29f6('0x93')]&&(_0xc45192['getCartInfoByUrl'](),window[_0x29f6('0x59')][_0x29f6('0x93')]=!0x1,_0x21cd96['fn'][_0x29f6('0x26')](!0x0),_0xc45192[_0x29f6('0xdb')]());};_0x24a7fb=setInterval(function(){_0xc451ff();},0x258);_0xc451ff();});_0x21cd96(this)['on'](_0x29f6('0xdc'),function(){clearInterval(_0x24a7fb);});}};var _0x18d748=function(_0x589b9a){_0x589b9a=_0x21cd96(_0x589b9a);_0x5af496[_0x29f6('0xdd')][_0x29f6('0x53')]=_0x5af496['texts'][_0x29f6('0x53')][_0x29f6('0x5')]('#value',_0x29f6('0xde'));_0x5af496[_0x29f6('0xdd')]['cartTotal']=_0x5af496[_0x29f6('0xdd')]['cartTotal']['replace'](_0x29f6('0xdf'),_0x29f6('0xe0'));_0x5af496[_0x29f6('0xdd')][_0x29f6('0x53')]=_0x5af496['texts']['cartTotal'][_0x29f6('0x5')](_0x29f6('0xe1'),_0x29f6('0xe2'));_0x5af496[_0x29f6('0xdd')][_0x29f6('0x53')]=_0x5af496[_0x29f6('0xdd')][_0x29f6('0x53')][_0x29f6('0x5')](_0x29f6('0xe3'),_0x29f6('0xe4'));_0x589b9a[_0x29f6('0x50')](_0x29f6('0xe5'))[_0x29f6('0x4e')](_0x5af496['texts']['linkCart']);_0x589b9a[_0x29f6('0x50')](_0x29f6('0xe6'))['html'](_0x5af496[_0x29f6('0xdd')][_0x29f6('0xe7')]);_0x589b9a['find']('.qd-ddc-checkout')['html'](_0x5af496[_0x29f6('0xdd')][_0x29f6('0xe8')]);_0x589b9a[_0x29f6('0x50')](_0x29f6('0xe9'))['html'](_0x5af496[_0x29f6('0xdd')][_0x29f6('0x53')]);_0x589b9a[_0x29f6('0x50')](_0x29f6('0xea'))[_0x29f6('0x4e')](_0x5af496[_0x29f6('0xdd')][_0x29f6('0xeb')]);_0x589b9a[_0x29f6('0x50')](_0x29f6('0xec'))['html'](_0x5af496[_0x29f6('0xdd')][_0x29f6('0x56')]);return _0x589b9a;}(this[_0x29f6('0xed')]);var _0x1c3da9=0x0;_0x454c4c['each'](function(){0x0<_0x1c3da9?_0x4f9bf9['call'](this,_0x18d748[_0x29f6('0xee')]()):_0x4f9bf9[_0x29f6('0x29')](this,_0x18d748);_0x1c3da9++;});window[_0x29f6('0x36')][_0x29f6('0x41')][_0x29f6('0x2f')](function(){_0x21cd96('.qd-ddc-infoTotalValue')[_0x29f6('0x4e')](window[_0x29f6('0x36')][_0x29f6('0x3a')]||'--');_0x21cd96(_0x29f6('0xef'))[_0x29f6('0x4e')](window[_0x29f6('0x36')][_0x29f6('0x3e')]||'0');_0x21cd96('.qd-ddc-infoTotalShipping')[_0x29f6('0x4e')](window[_0x29f6('0x36')][_0x29f6('0x3c')]||'--');_0x21cd96(_0x29f6('0xf0'))['html'](window[_0x29f6('0x36')][_0x29f6('0x3d')]||'--');});var _0x127852=function(_0x2df557,_0x589222){if(_0x29f6('0x2')===typeof _0x2df557[_0x29f6('0x40')])return _0x50d48d(_0x29f6('0xf1'));_0xc45192['renderProductsList'][_0x29f6('0x29')](this,_0x589222);};_0xc45192[_0x29f6('0x91')]=function(_0x138c46,_0x3c0069){'undefined'!=typeof _0x3c0069?window[_0x29f6('0x59')][_0x29f6('0xf2')]=_0x3c0069:window['_QuatroDigital_DropDown']['dataOptionsCache']&&(_0x3c0069=window['_QuatroDigital_DropDown'][_0x29f6('0xf2')]);setTimeout(function(){window[_0x29f6('0x59')]['dataOptionsCache']=void 0x0;},_0x5af496[_0x29f6('0xf3')]);_0x21cd96(_0x29f6('0xf4'))[_0x29f6('0x4b')](_0x29f6('0xf5'));if(_0x5af496[_0x29f6('0x58')]){var _0x24a7fb=function(_0x3dc5ec){window[_0x29f6('0x59')][_0x29f6('0x28')]=_0x3dc5ec;_0x127852(_0x3dc5ec,_0x3c0069);_0x29f6('0x2')!==typeof window[_0x29f6('0xf6')]&&_0x29f6('0xe')===typeof window[_0x29f6('0xf6')][_0x29f6('0xf7')]&&window[_0x29f6('0xf6')][_0x29f6('0xf7')]['call'](this);_0x21cd96(_0x29f6('0xf4'))[_0x29f6('0x49')]('qd-ddc-prodLoaded');};_0x29f6('0x2')!==typeof window[_0x29f6('0x59')][_0x29f6('0x28')]?(_0x24a7fb(window[_0x29f6('0x59')][_0x29f6('0x28')]),'function'===typeof _0x138c46&&_0x138c46(window[_0x29f6('0x59')][_0x29f6('0x28')])):_0x21cd96[_0x29f6('0x5c')](['items','totalizers',_0x29f6('0x5d')],{'done':function(_0xacc654){_0x24a7fb[_0x29f6('0x29')](this,_0xacc654);_0x29f6('0xe')===typeof _0x138c46&&_0x138c46(_0xacc654);},'fail':function(_0x11b245){_0x50d48d([_0x29f6('0xf8'),_0x11b245]);}});}else alert('Este\x20método\x20esta\x20descontinuado!');};_0xc45192['cartIsEmpty']=function(){var _0x41f603=_0x21cd96(_0x29f6('0xf4'));_0x41f603[_0x29f6('0x50')](_0x29f6('0xf9'))[_0x29f6('0x4')]?_0x41f603[_0x29f6('0x4b')]('qd-ddc-noItems'):_0x41f603['addClass'](_0x29f6('0xfa'));};_0xc45192[_0x29f6('0xfb')]=function(_0x27c8e1){var _0x24a7fb=_0x21cd96('.qd-ddc-prodWrapper2');_0x24a7fb['empty']();_0x24a7fb[_0x29f6('0x34')](function(){var _0x24a7fb=_0x21cd96(this),_0x26015a,_0x5acbea,_0x3ccbe7=_0x21cd96(''),_0x185984;for(_0x185984 in window[_0x29f6('0x59')][_0x29f6('0x28')][_0x29f6('0x40')])if(_0x29f6('0x16')===typeof window[_0x29f6('0x59')]['getOrderForm'][_0x29f6('0x40')][_0x185984]){var _0x173977=window['_QuatroDigital_DropDown'][_0x29f6('0x28')][_0x29f6('0x40')][_0x185984];var _0x43acdc=_0x173977[_0x29f6('0xfc')]['replace'](/^\/|\/$/g,'')['split']('/');var _0x128fa0=_0x21cd96(_0x29f6('0xfd'));_0x128fa0[_0x29f6('0x33')]({'data-sku':_0x173977['id'],'data-sku-index':_0x185984,'data-qd-departament':_0x43acdc[0x0],'data-qd-category':_0x43acdc[_0x43acdc[_0x29f6('0x4')]-0x1]});_0x128fa0[_0x29f6('0x49')]('qd-ddc-'+_0x173977['availability']);_0x128fa0[_0x29f6('0x50')](_0x29f6('0xfe'))['append'](_0x5af496['skuName'](_0x173977));_0x128fa0['find'](_0x29f6('0xff'))[_0x29f6('0x86')](isNaN(_0x173977[_0x29f6('0x100')])?_0x173977[_0x29f6('0x100')]:0x0==_0x173977[_0x29f6('0x100')]?'Grátis':(_0x21cd96(_0x29f6('0x101'))[_0x29f6('0x33')](_0x29f6('0x102'))||'R$')+'\x20'+qd_number_format(_0x173977[_0x29f6('0x100')]/0x64,0x2,',','.'));_0x128fa0[_0x29f6('0x50')]('.qd-ddc-quantity')[_0x29f6('0x33')]({'data-sku':_0x173977['id'],'data-sku-index':_0x185984})[_0x29f6('0xd7')](_0x173977[_0x29f6('0x103')]);_0x128fa0[_0x29f6('0x50')](_0x29f6('0x104'))[_0x29f6('0x33')]({'data-sku':_0x173977['id'],'data-sku-index':_0x185984});_0xc45192[_0x29f6('0x105')](_0x173977['id'],_0x128fa0[_0x29f6('0x50')]('.qd-ddc-image'),_0x173977[_0x29f6('0x106')]);_0x128fa0[_0x29f6('0x50')]('.qd-ddc-quantityMore,.qd-ddc-quantityMinus')[_0x29f6('0x33')]({'data-sku':_0x173977['id'],'data-sku-index':_0x185984});_0x128fa0[_0x29f6('0x107')](_0x24a7fb);_0x3ccbe7=_0x3ccbe7[_0x29f6('0x2f')](_0x128fa0);}try{var _0x5f1de1=_0x24a7fb['getParent']('.qd-ddc-wrapper')['find'](_0x29f6('0xd6'));_0x5f1de1[_0x29f6('0x4')]&&''==_0x5f1de1[_0x29f6('0xd7')]()&&window[_0x29f6('0x59')][_0x29f6('0x28')][_0x29f6('0x5d')][_0x29f6('0x108')]&&_0x5f1de1[_0x29f6('0xd7')](window[_0x29f6('0x59')][_0x29f6('0x28')]['shippingData'][_0x29f6('0x108')]['postalCode']);}catch(_0x338ecf){_0x50d48d(_0x29f6('0x109')+_0x338ecf[_0x29f6('0x22')],_0x29f6('0x6d'));}_0xc45192[_0x29f6('0x10a')](_0x24a7fb);_0xc45192[_0x29f6('0xdb')]();_0x27c8e1&&_0x27c8e1[_0x29f6('0x10b')]&&function(){_0x5acbea=_0x3ccbe7[_0x29f6('0x44')](_0x29f6('0x10c')+_0x27c8e1['lastSku']+'\x27]');_0x5acbea['length']&&(_0x26015a=0x0,_0x3ccbe7[_0x29f6('0x34')](function(){var _0x27c8e1=_0x21cd96(this);if(_0x27c8e1['is'](_0x5acbea))return!0x1;_0x26015a+=_0x27c8e1[_0x29f6('0x10d')]();}),_0xc45192[_0x29f6('0xd5')](void 0x0,void 0x0,_0x26015a,_0x24a7fb[_0x29f6('0x2f')](_0x24a7fb[_0x29f6('0xab')]())),_0x3ccbe7[_0x29f6('0x4b')]('qd-ddc-lastAddedFixed'),function(_0x1f3144){_0x1f3144[_0x29f6('0x49')](_0x29f6('0x10e'));_0x1f3144[_0x29f6('0x49')](_0x29f6('0x10f'));setTimeout(function(){_0x1f3144[_0x29f6('0x4b')](_0x29f6('0x10e'));},_0x5af496[_0x29f6('0xf3')]);}(_0x5acbea));}();});(function(){_QuatroDigital_DropDown[_0x29f6('0x28')][_0x29f6('0x40')][_0x29f6('0x4')]?(_0x21cd96('body')[_0x29f6('0x4b')]('qd-ddc-cart-empty')[_0x29f6('0x49')](_0x29f6('0x110')),setTimeout(function(){_0x21cd96('body')['removeClass'](_0x29f6('0x111'));},_0x5af496[_0x29f6('0xf3')])):_0x21cd96('body')[_0x29f6('0x4b')](_0x29f6('0x112'))[_0x29f6('0x49')](_0x29f6('0x113'));}());_0x29f6('0xe')===typeof _0x5af496['callbackProductsList']?_0x5af496['callbackProductsList'][_0x29f6('0x29')](this):_0x50d48d('callbackProductsList\x20não\x20é\x20uma\x20função');};_0xc45192[_0x29f6('0x105')]=function(_0x354dba,_0x50a9f8,_0x380dcc){function _0x25dd91(){_0x50a9f8['removeClass'](_0x29f6('0x114'))[_0x29f6('0x98')](function(){_0x21cd96(this)['addClass']('qd-loaded');})[_0x29f6('0x33')](_0x29f6('0x115'),_0x380dcc);}_0x380dcc?_0x25dd91():isNaN(_0x354dba)?_0x50d48d(_0x29f6('0x116'),_0x29f6('0x2b')):alert(_0x29f6('0x117'));};_0xc45192[_0x29f6('0x10a')]=function(_0x7a0ebf){var _0x252d6e=function(_0x1491ea,_0x476339){var _0x24a7fb=_0x21cd96(_0x1491ea);var _0x2a25e2=_0x24a7fb[_0x29f6('0x33')](_0x29f6('0x118'));var _0x26015a=_0x24a7fb[_0x29f6('0x33')](_0x29f6('0x119'));if(_0x2a25e2){var _0x360342=parseInt(_0x24a7fb[_0x29f6('0xd7')]())||0x1;_0xc45192[_0x29f6('0x11a')]([_0x2a25e2,_0x26015a],_0x360342,_0x360342+0x1,function(_0x326fc5){_0x24a7fb['val'](_0x326fc5);_0x29f6('0xe')===typeof _0x476339&&_0x476339();});}};var _0x24a7fb=function(_0x550a90,_0x294d42){var _0x24a7fb=_0x21cd96(_0x550a90);var _0x5248ba=_0x24a7fb[_0x29f6('0x33')](_0x29f6('0x118'));var _0x26015a=_0x24a7fb['attr'](_0x29f6('0x119'));if(_0x5248ba){var _0x3fd597=parseInt(_0x24a7fb[_0x29f6('0xd7')]())||0x2;_0xc45192[_0x29f6('0x11a')]([_0x5248ba,_0x26015a],_0x3fd597,_0x3fd597-0x1,function(_0x410ab5){_0x24a7fb[_0x29f6('0xd7')](_0x410ab5);_0x29f6('0xe')===typeof _0x294d42&&_0x294d42();});}};var _0x1c6ffa=function(_0x5508ae,_0x244c4e){var _0x24a7fb=_0x21cd96(_0x5508ae);var _0x1eaa48=_0x24a7fb[_0x29f6('0x33')]('data-sku');var _0x26015a=_0x24a7fb[_0x29f6('0x33')]('data-sku-index');if(_0x1eaa48){var _0x5250bc=parseInt(_0x24a7fb[_0x29f6('0xd7')]())||0x1;_0xc45192[_0x29f6('0x11a')]([_0x1eaa48,_0x26015a],0x1,_0x5250bc,function(_0x256fae){_0x24a7fb[_0x29f6('0xd7')](_0x256fae);'function'===typeof _0x244c4e&&_0x244c4e();});}};var _0x26015a=_0x7a0ebf[_0x29f6('0x50')](_0x29f6('0x11b'));_0x26015a['addClass'](_0x29f6('0x11c'))['each'](function(){var _0x7a0ebf=_0x21cd96(this);_0x7a0ebf['find']('.qd-ddc-quantityMore')['on'](_0x29f6('0x11d'),function(_0x694deb){_0x694deb[_0x29f6('0x7e')]();_0x26015a[_0x29f6('0x49')]('qd-loading');_0x252d6e(_0x7a0ebf['find']('.qd-ddc-quantity'),function(){_0x26015a[_0x29f6('0x4b')]('qd-loading');});});_0x7a0ebf[_0x29f6('0x50')](_0x29f6('0x11e'))['on'](_0x29f6('0x11f'),function(_0x510c6a){_0x510c6a['preventDefault']();_0x26015a['addClass'](_0x29f6('0x120'));_0x24a7fb(_0x7a0ebf[_0x29f6('0x50')](_0x29f6('0x121')),function(){_0x26015a[_0x29f6('0x4b')](_0x29f6('0x120'));});});_0x7a0ebf['find'](_0x29f6('0x121'))['on'](_0x29f6('0x122'),function(){_0x26015a['addClass'](_0x29f6('0x120'));_0x1c6ffa(this,function(){_0x26015a[_0x29f6('0x4b')](_0x29f6('0x120'));});});_0x7a0ebf['find']('.qd-ddc-quantity')['on'](_0x29f6('0x123'),function(_0x4fe121){0xd==_0x4fe121[_0x29f6('0xd1')]&&(_0x26015a[_0x29f6('0x49')]('qd-loading'),_0x1c6ffa(this,function(){_0x26015a['removeClass'](_0x29f6('0x120'));}));});});_0x7a0ebf[_0x29f6('0x50')](_0x29f6('0xf9'))['each'](function(){var _0x7a0ebf=_0x21cd96(this);_0x7a0ebf[_0x29f6('0x50')](_0x29f6('0x104'))['on']('click.qd_ddc_remove',function(){_0x7a0ebf[_0x29f6('0x49')]('qd-loading');_0xc45192[_0x29f6('0x124')](_0x21cd96(this),function(_0x4ad41d){_0x4ad41d?_0x7a0ebf['stop'](!0x0)['slideUp'](function(){_0x7a0ebf['remove']();_0xc45192['cartIsEmpty']();}):_0x7a0ebf[_0x29f6('0x4b')]('qd-loading');});return!0x1;});});};_0xc45192[_0x29f6('0xd8')]=function(_0x25d6ca){var _0x55d2fc=_0x25d6ca[_0x29f6('0xd7')](),_0x55d2fc=_0x55d2fc[_0x29f6('0x5')](/[^0-9\-]/g,''),_0x55d2fc=_0x55d2fc[_0x29f6('0x5')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3'),_0x55d2fc=_0x55d2fc[_0x29f6('0x5')](/(.{9}).*/g,'$1');_0x25d6ca[_0x29f6('0xd7')](_0x55d2fc);0x9<=_0x55d2fc['length']&&(_0x25d6ca[_0x29f6('0x17')]('qdDdcLastPostalCode')!=_0x55d2fc&&_0x11bd65[_0x29f6('0x125')]({'postalCode':_0x55d2fc,'country':_0x29f6('0x126')})[_0x29f6('0x69')](function(_0x2c283e){window[_0x29f6('0x59')][_0x29f6('0x28')]=_0x2c283e;_0xc45192[_0x29f6('0x91')]();})[_0x29f6('0x1e')](function(_0x3aba4a){_0x50d48d([_0x29f6('0x127'),_0x3aba4a]);updateCartData();}),_0x25d6ca[_0x29f6('0x17')](_0x29f6('0x128'),_0x55d2fc));};_0xc45192['changeQantity']=function(_0x49c5f6,_0x47639a,_0x222215,_0x2099dc){function _0x25d99e(_0x867efc){_0x867efc=_0x29f6('0x129')!==typeof _0x867efc?!0x1:_0x867efc;_0xc45192[_0x29f6('0x91')]();window[_0x29f6('0x59')][_0x29f6('0x93')]=!0x1;_0xc45192[_0x29f6('0xdb')]();_0x29f6('0x2')!==typeof window[_0x29f6('0xf6')]&&_0x29f6('0xe')===typeof window[_0x29f6('0xf6')][_0x29f6('0xf7')]&&window[_0x29f6('0xf6')][_0x29f6('0xf7')][_0x29f6('0x29')](this);'function'===typeof adminCart&&adminCart();_0x21cd96['fn'][_0x29f6('0x26')](!0x0,void 0x0,_0x867efc);_0x29f6('0xe')===typeof _0x2099dc&&_0x2099dc(_0x47639a);}_0x222215=_0x222215||0x1;if(0x1>_0x222215)return _0x47639a;if(_0x5af496['smartCheckout']){if('undefined'===typeof window[_0x29f6('0x59')][_0x29f6('0x28')][_0x29f6('0x40')][_0x49c5f6[0x1]])return _0x50d48d(_0x29f6('0x12a')+_0x49c5f6[0x1]+']'),_0x47639a;window[_0x29f6('0x59')][_0x29f6('0x28')][_0x29f6('0x40')][_0x49c5f6[0x1]]['quantity']=_0x222215;window['_QuatroDigital_DropDown']['getOrderForm'][_0x29f6('0x40')][_0x49c5f6[0x1]][_0x29f6('0x12b')]=_0x49c5f6[0x1];_0x11bd65[_0x29f6('0x12c')]([window[_0x29f6('0x59')][_0x29f6('0x28')][_0x29f6('0x40')][_0x49c5f6[0x1]]],['items','totalizers',_0x29f6('0x5d')])[_0x29f6('0x69')](function(_0x3307a1){window['_QuatroDigital_DropDown'][_0x29f6('0x28')]=_0x3307a1;_0x25d99e(!0x0);})['fail'](function(_0xcb45d8){_0x50d48d([_0x29f6('0x12d'),_0xcb45d8]);_0x25d99e();});}else _0x50d48d('atenção\x20esta\x20método\x20esta\x20descontinuado');};_0xc45192['removeProduct']=function(_0xb3e9c9,_0x4c7b46){function _0x41d45f(_0x1f1679){_0x1f1679=_0x29f6('0x129')!==typeof _0x1f1679?!0x1:_0x1f1679;_0x29f6('0x2')!==typeof window['_QuatroDigital_AmountProduct']&&_0x29f6('0xe')===typeof window[_0x29f6('0xf6')]['exec']&&window[_0x29f6('0xf6')][_0x29f6('0xf7')][_0x29f6('0x29')](this);_0x29f6('0xe')===typeof adminCart&&adminCart();_0x21cd96['fn']['simpleCart'](!0x0,void 0x0,_0x1f1679);_0x29f6('0xe')===typeof _0x4c7b46&&_0x4c7b46(_0x26015a);}var _0x26015a=!0x1,_0x420dce=_0x21cd96(_0xb3e9c9)[_0x29f6('0x33')](_0x29f6('0x119'));if(_0x5af496['smartCheckout']){if(_0x29f6('0x2')===typeof window[_0x29f6('0x59')][_0x29f6('0x28')][_0x29f6('0x40')][_0x420dce])return _0x50d48d(_0x29f6('0x12a')+_0x420dce+']'),_0x26015a;window[_0x29f6('0x59')][_0x29f6('0x28')][_0x29f6('0x40')][_0x420dce][_0x29f6('0x12b')]=_0x420dce;_0x11bd65[_0x29f6('0x12e')]([window[_0x29f6('0x59')][_0x29f6('0x28')][_0x29f6('0x40')][_0x420dce]],[_0x29f6('0x40'),_0x29f6('0x37'),_0x29f6('0x5d')])[_0x29f6('0x69')](function(_0x201552){_0x26015a=!0x0;window[_0x29f6('0x59')][_0x29f6('0x28')]=_0x201552;_0x127852(_0x201552);_0x41d45f(!0x0);})['fail'](function(_0x3b22f8){_0x50d48d(['Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho',_0x3b22f8]);_0x41d45f();});}else alert(_0x29f6('0x12f'));};_0xc45192[_0x29f6('0xd5')]=function(_0x3a5eb8,_0x2cc34a,_0xd0afb8,_0x4d5e45){_0x4d5e45=_0x4d5e45||_0x21cd96(_0x29f6('0x130'));_0x3a5eb8=_0x3a5eb8||'+';_0x2cc34a=_0x2cc34a||0.9*_0x4d5e45[_0x29f6('0x131')]();_0x4d5e45[_0x29f6('0x132')](!0x0,!0x0)[_0x29f6('0x133')]({'scrollTop':isNaN(_0xd0afb8)?_0x3a5eb8+'='+_0x2cc34a+'px':_0xd0afb8});};_0x5af496[_0x29f6('0xd9')]||(_0xc45192[_0x29f6('0x91')](),_0x21cd96['fn'][_0x29f6('0x26')](!0x0));_0x21cd96(window)['on'](_0x29f6('0x134'),function(){try{window[_0x29f6('0x59')][_0x29f6('0x28')]=void 0x0,_0xc45192[_0x29f6('0x91')]();}catch(_0x5d51ea){_0x50d48d(_0x29f6('0x135')+_0x5d51ea[_0x29f6('0x22')],_0x29f6('0x136'));}});'function'===typeof _0x5af496[_0x29f6('0x41')]?_0x5af496[_0x29f6('0x41')][_0x29f6('0x29')](this):_0x50d48d(_0x29f6('0xae'));};_0x21cd96['fn'][_0x29f6('0xba')]=function(_0x59d8aa){var _0x1d392a=_0x21cd96(this);_0x1d392a['fn']=new _0x21cd96[(_0x29f6('0xba'))](this,_0x59d8aa);return _0x1d392a;};}catch(_0x1477b6){_0x29f6('0x2')!==typeof console&&'function'===typeof console['error']&&console['error'](_0x29f6('0x65'),_0x1477b6);}}(this));(function(_0x5812eb){try{var _0x33ef4c=jQuery;window[_0x29f6('0xf6')]=window[_0x29f6('0xf6')]||{};window[_0x29f6('0xf6')][_0x29f6('0x40')]={};window[_0x29f6('0xf6')][_0x29f6('0x137')]=!0x1;window[_0x29f6('0xf6')][_0x29f6('0x138')]=!0x1;window[_0x29f6('0xf6')][_0x29f6('0x139')]=!0x1;var _0x3ffa11=function(){if(window[_0x29f6('0xf6')][_0x29f6('0x137')]){var _0x3f7f77=!0x1;var _0x5812eb={};window[_0x29f6('0xf6')][_0x29f6('0x40')]={};for(_0x5877b5 in window[_0x29f6('0x59')]['getOrderForm']['items'])if(_0x29f6('0x16')===typeof window[_0x29f6('0x59')][_0x29f6('0x28')][_0x29f6('0x40')][_0x5877b5]){var _0x578e3e=window['_QuatroDigital_DropDown'][_0x29f6('0x28')][_0x29f6('0x40')][_0x5877b5];'undefined'!==typeof _0x578e3e[_0x29f6('0x13a')]&&null!==_0x578e3e['productId']&&''!==_0x578e3e[_0x29f6('0x13a')]&&(window['_QuatroDigital_AmountProduct']['items'][_0x29f6('0x13b')+_0x578e3e['productId']]=window['_QuatroDigital_AmountProduct'][_0x29f6('0x40')][_0x29f6('0x13b')+_0x578e3e[_0x29f6('0x13a')]]||{},window[_0x29f6('0xf6')][_0x29f6('0x40')][_0x29f6('0x13b')+_0x578e3e[_0x29f6('0x13a')]][_0x29f6('0x13c')]=_0x578e3e['productId'],_0x5812eb[_0x29f6('0x13b')+_0x578e3e[_0x29f6('0x13a')]]||(window[_0x29f6('0xf6')]['items'][_0x29f6('0x13b')+_0x578e3e[_0x29f6('0x13a')]][_0x29f6('0x3e')]=0x0),window[_0x29f6('0xf6')][_0x29f6('0x40')][_0x29f6('0x13b')+_0x578e3e[_0x29f6('0x13a')]][_0x29f6('0x3e')]+=_0x578e3e[_0x29f6('0x103')],_0x3f7f77=!0x0,_0x5812eb[_0x29f6('0x13b')+_0x578e3e[_0x29f6('0x13a')]]=!0x0);}var _0x5877b5=_0x3f7f77;}else _0x5877b5=void 0x0;window[_0x29f6('0xf6')][_0x29f6('0x137')]&&(_0x33ef4c(_0x29f6('0x13d'))[_0x29f6('0x13e')](),_0x33ef4c(_0x29f6('0x13f'))['removeClass'](_0x29f6('0x140')));for(var _0x38c194 in window[_0x29f6('0xf6')][_0x29f6('0x40')]){_0x578e3e=window[_0x29f6('0xf6')]['items'][_0x38c194];if(_0x29f6('0x16')!==typeof _0x578e3e)return;_0x5812eb=_0x33ef4c(_0x29f6('0x141')+_0x578e3e[_0x29f6('0x13c')]+']')[_0x29f6('0x0')]('li');if(window[_0x29f6('0xf6')]['allowRecalculate']||!_0x5812eb[_0x29f6('0x50')](_0x29f6('0x13d'))[_0x29f6('0x4')])_0x3f7f77=_0x33ef4c(_0x29f6('0x142')),_0x3f7f77['find'](_0x29f6('0x143'))['html'](_0x578e3e[_0x29f6('0x3e')]),_0x578e3e=_0x5812eb[_0x29f6('0x50')](_0x29f6('0x144')),_0x578e3e[_0x29f6('0x4')]?_0x578e3e['prepend'](_0x3f7f77)[_0x29f6('0x49')]('qd-bap-item-added'):_0x5812eb[_0x29f6('0xb0')](_0x3f7f77);}_0x5877b5&&(window['_QuatroDigital_AmountProduct'][_0x29f6('0x137')]=!0x1);};window[_0x29f6('0xf6')][_0x29f6('0xf7')]=function(){window['_QuatroDigital_AmountProduct'][_0x29f6('0x137')]=!0x0;_0x3ffa11[_0x29f6('0x29')](this);};_0x33ef4c(document)[_0x29f6('0xb6')](function(){_0x3ffa11['call'](this);});}catch(_0x3b30f5){_0x29f6('0x2')!==typeof console&&_0x29f6('0xe')===typeof console[_0x29f6('0x13')]&&console['error'](_0x29f6('0x65'),_0x3b30f5);}}(this));(function(){try{var _0x31fb62=jQuery,_0x37d0c2,_0x8936ae={'selector':_0x29f6('0x145'),'dropDown':{},'buyButton':{}};_0x31fb62[_0x29f6('0x146')]=function(_0x590aad){var _0x553e33={};_0x37d0c2=_0x31fb62[_0x29f6('0x14')](!0x0,{},_0x8936ae,_0x590aad);_0x590aad=_0x31fb62(_0x37d0c2[_0x29f6('0x8a')])[_0x29f6('0xba')](_0x37d0c2['dropDown']);_0x553e33[_0x29f6('0x7f')]=_0x29f6('0x2')!==typeof _0x37d0c2[_0x29f6('0x147')][_0x29f6('0xd9')]&&!0x1===_0x37d0c2[_0x29f6('0x147')]['updateOnlyHover']?_0x31fb62(_0x37d0c2[_0x29f6('0x8a')])['QD_buyButton'](_0x590aad['fn'],_0x37d0c2['buyButton']):_0x31fb62(_0x37d0c2[_0x29f6('0x8a')])[_0x29f6('0x78')](_0x37d0c2[_0x29f6('0x7f')]);_0x553e33[_0x29f6('0x147')]=_0x590aad;return _0x553e33;};_0x31fb62['fn'][_0x29f6('0x148')]=function(){'object'===typeof console&&_0x29f6('0xe')===typeof console[_0x29f6('0x2e')]&&console['info'](_0x29f6('0x149'));};_0x31fb62[_0x29f6('0x148')]=_0x31fb62['fn'][_0x29f6('0x148')];}catch(_0x34c3ce){_0x29f6('0x2')!==typeof console&&_0x29f6('0xe')===typeof console[_0x29f6('0x13')]&&console[_0x29f6('0x13')]('Oooops!\x20',_0x34c3ce);}}());

/* Quatro Digital - Product Thumbs // Carlos Vinicius // Todos os direitos reservados. */
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs();a.trigger("QuatroDigital.pt_callback",[a])}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return a.length?$.extend({},a,new b(a)):a},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0x2eaf=['erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','youtube','html','<iframe\x20src=\x22','urlProtocol','?wmode=transparent&rel=0&enablejsapi=1\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>','height','fadeTo','addClass','qdpv-video-on','stop','add','find','iframe','a:not(\x27.qd-videoLink\x27)','bind','click.removeVideo','hide','style','body','data','call','string','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27','\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','click.playVideo','.ON','controlVideo','.qd-playerWrapper\x20iframe','contentWindow','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','attr','rel','a:not(.qd-videoLink)','click','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','insertThumbsIn','appendTo','trigger','QuatroDigital.pv_video_added','load','ImageControl','.qd-videoLink','.produto','object','undefined','toLowerCase','[Video\x20in\x20product]\x20','info','error','extend','start','td.value-field.Videos:first','http','qdVideoInProduct','videoFieldSelector','replace','length','indexOf','pop','shift','push','be/','split','<div\x20class=\x22qd-playerWrapper\x22></div>','prependTo','#include','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','join','ite','---'];(function(_0x6f4d39,_0x4a1bf3){var _0x1b2049=function(_0x484f9d){while(--_0x484f9d){_0x6f4d39['push'](_0x6f4d39['shift']());}};_0x1b2049(++_0x4a1bf3);}(_0x2eaf,0x1b6));var _0xf2ea=function(_0x5c1936,_0x1bca63){_0x5c1936=_0x5c1936-0x0;var _0x288796=_0x2eaf[_0x5c1936];return _0x288796;};(function(_0x464468){$(function(){if($(document['body'])['is'](_0xf2ea('0x0'))){var _0x249e95=[];var _0x55749f=function(_0x19367f,_0x3d06c9){_0xf2ea('0x1')===typeof console&&(_0xf2ea('0x2')!==typeof _0x3d06c9&&'alerta'===_0x3d06c9[_0xf2ea('0x3')]()?console['warn'](_0xf2ea('0x4')+_0x19367f):'undefined'!==typeof _0x3d06c9&&_0xf2ea('0x5')===_0x3d06c9[_0xf2ea('0x3')]()?console[_0xf2ea('0x5')](_0xf2ea('0x4')+_0x19367f):console[_0xf2ea('0x6')](_0xf2ea('0x4')+_0x19367f));};window['qdVideoInProduct']=window['qdVideoInProduct']||{};var _0x361f60=$[_0xf2ea('0x7')](!0x0,{'insertThumbsIn':_0xf2ea('0x8'),'videoFieldSelector':_0xf2ea('0x9'),'controlVideo':!0x0,'urlProtocol':_0xf2ea('0xa')},window[_0xf2ea('0xb')]);var _0x512b86=$('ul.thumbs');var _0x2cb2fd=$('div#image');var _0x264021=$(_0x361f60[_0xf2ea('0xc')])['text']()[_0xf2ea('0xd')](/\;\s*/,';')['split'](';');for(var _0x20095a=0x0;_0x20095a<_0x264021[_0xf2ea('0xe')];_0x20095a++)-0x1<_0x264021[_0x20095a][_0xf2ea('0xf')]('youtube')?_0x249e95['push'](_0x264021[_0x20095a]['split']('v=')[_0xf2ea('0x10')]()['split'](/[&#]/)[_0xf2ea('0x11')]()):-0x1<_0x264021[_0x20095a][_0xf2ea('0xf')]('youtu.be')&&_0x249e95[_0xf2ea('0x12')](_0x264021[_0x20095a]['split'](_0xf2ea('0x13'))[_0xf2ea('0x10')]()[_0xf2ea('0x14')](/[\?&#]/)[_0xf2ea('0x11')]());var _0x34009e=$(_0xf2ea('0x15'));_0x34009e[_0xf2ea('0x16')](_0xf2ea('0x17'));_0x34009e['wrap']('<div\x20class=\x22qd-playerContainer\x22></div>');_0x264021=function(_0x754056){var _0x4ab526={'t':_0xf2ea('0x18')};return function(_0x28938f){var _0x29610e=function(_0x56dae0){return _0x56dae0;};var _0x590cce=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x28938f=_0x28938f['d'+_0x590cce[0x10]+'c'+_0x590cce[0x11]+'m'+_0x29610e(_0x590cce[0x1])+'n'+_0x590cce[0xd]]['l'+_0x590cce[0x12]+'c'+_0x590cce[0x0]+'ti'+_0x29610e('o')+'n'];var _0x6eec66=function(_0x55a1e9){return escape(encodeURIComponent(_0x55a1e9[_0xf2ea('0xd')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x4b11bd){return String[_0xf2ea('0x19')](('Z'>=_0x4b11bd?0x5a:0x7a)>=(_0x4b11bd=_0x4b11bd[_0xf2ea('0x1a')](0x0)+0xd)?_0x4b11bd:_0x4b11bd-0x1a);})));};var _0x28fd8c=_0x6eec66(_0x28938f[[_0x590cce[0x9],_0x29610e('o'),_0x590cce[0xc],_0x590cce[_0x29610e(0xd)]][_0xf2ea('0x1b')]('')]);_0x6eec66=_0x6eec66((window[['js',_0x29610e('no'),'m',_0x590cce[0x1],_0x590cce[0x4]['toUpperCase'](),_0xf2ea('0x1c')][_0xf2ea('0x1b')]('')]||_0xf2ea('0x1d'))+['.v',_0x590cce[0xd],'e',_0x29610e('x'),'co',_0x29610e('mm'),_0xf2ea('0x1e'),_0x590cce[0x1],'.c',_0x29610e('o'),'m.',_0x590cce[0x13],'r'][_0xf2ea('0x1b')](''));for(var _0x33f3a7 in _0x4ab526){if(_0x6eec66===_0x33f3a7+_0x4ab526[_0x33f3a7]||_0x28fd8c===_0x33f3a7+_0x4ab526[_0x33f3a7]){var _0x2b7d44='tr'+_0x590cce[0x11]+'e';break;}_0x2b7d44='f'+_0x590cce[0x0]+'ls'+_0x29610e(_0x590cce[0x1])+'';}_0x29610e=!0x1;-0x1<_0x28938f[[_0x590cce[0xc],'e',_0x590cce[0x0],'rc',_0x590cce[0x9]][_0xf2ea('0x1b')]('')][_0xf2ea('0xf')](_0xf2ea('0x1f'))&&(_0x29610e=!0x0);return[_0x2b7d44,_0x29610e];}(_0x754056);}(window);if(!eval(_0x264021[0x0]))return _0x264021[0x1]?_0x55749f(_0xf2ea('0x20')):!0x1;var _0x2fad48=function(_0x1c6a86,_0x34f0f8){_0xf2ea('0x21')===_0x34f0f8&&_0x34009e[_0xf2ea('0x22')](_0xf2ea('0x23')+_0x361f60[_0xf2ea('0x24')]+'://www.youtube.com/embed/'+_0x1c6a86+_0xf2ea('0x25'));_0x2cb2fd['data']('height',_0x2cb2fd['data'](_0xf2ea('0x26'))||_0x2cb2fd[_0xf2ea('0x26')]());_0x2cb2fd['stop'](!0x0,!0x0)[_0xf2ea('0x27')](0x1f4,0x0,function(){$('body')[_0xf2ea('0x28')](_0xf2ea('0x29'));});_0x34009e[_0xf2ea('0x2a')](!0x0,!0x0)[_0xf2ea('0x27')](0x1f4,0x1,function(){_0x2cb2fd[_0xf2ea('0x2b')](_0x34009e)['animate']({'height':_0x34009e[_0xf2ea('0x2c')](_0xf2ea('0x2d'))[_0xf2ea('0x26')]()},0x2bc);});};removePlayer=function(){_0x512b86['find'](_0xf2ea('0x2e'))[_0xf2ea('0x2f')](_0xf2ea('0x30'),function(){_0x34009e[_0xf2ea('0x2a')](!0x0,!0x0)[_0xf2ea('0x27')](0x1f4,0x0,function(){$(this)[_0xf2ea('0x31')]()['removeAttr'](_0xf2ea('0x32'));$(_0xf2ea('0x33'))['removeClass'](_0xf2ea('0x29'));});_0x2cb2fd[_0xf2ea('0x2a')](!0x0,!0x0)[_0xf2ea('0x27')](0x1f4,0x1,function(){var _0xd91a7c=_0x2cb2fd[_0xf2ea('0x34')]('height');_0xd91a7c&&_0x2cb2fd['animate']({'height':_0xd91a7c},0x2bc);});});};var _0xd062b9=function(){if(!_0x512b86[_0xf2ea('0x2c')]('.qd-videoItem')[_0xf2ea('0xe')])for(vId in removePlayer[_0xf2ea('0x35')](this),_0x249e95)if(_0xf2ea('0x36')===typeof _0x249e95[vId]&&''!==_0x249e95[vId]){var _0x2a21e9=$(_0xf2ea('0x37')+_0x249e95[vId]+_0xf2ea('0x38')+_0x249e95[vId]+_0xf2ea('0x39')+_0x249e95[vId]+_0xf2ea('0x3a'));_0x2a21e9[_0xf2ea('0x2c')]('a')[_0xf2ea('0x2f')](_0xf2ea('0x3b'),function(){var _0xd6e636=$(this);_0x512b86['find'](_0xf2ea('0x3c'))['removeClass']('ON');_0xd6e636[_0xf2ea('0x28')]('ON');0x1==_0x361f60[_0xf2ea('0x3d')]?$(_0xf2ea('0x3e'))[_0xf2ea('0xe')]?(_0x2fad48[_0xf2ea('0x35')](this,'',''),$(_0xf2ea('0x3e'))[0x0][_0xf2ea('0x3f')][_0xf2ea('0x40')](_0xf2ea('0x41'),'*')):_0x2fad48['call'](this,_0xd6e636[_0xf2ea('0x42')]('rel'),'youtube'):_0x2fad48['call'](this,_0xd6e636[_0xf2ea('0x42')](_0xf2ea('0x43')),_0xf2ea('0x21'));return!0x1;});0x1==_0x361f60[_0xf2ea('0x3d')]&&_0x512b86[_0xf2ea('0x2c')](_0xf2ea('0x44'))[_0xf2ea('0x45')](function(_0x3ba692){$(_0xf2ea('0x3e'))[_0xf2ea('0xe')]&&$(_0xf2ea('0x3e'))[0x0]['contentWindow'][_0xf2ea('0x40')](_0xf2ea('0x46'),'*');});_0xf2ea('0x8')===_0x361f60[_0xf2ea('0x47')]?_0x2a21e9[_0xf2ea('0x16')](_0x512b86):_0x2a21e9[_0xf2ea('0x48')](_0x512b86);_0x2a21e9[_0xf2ea('0x49')](_0xf2ea('0x4a'),[_0x249e95[vId],_0x2a21e9]);}};$(document)['ajaxStop'](_0xd062b9);$(window)[_0xf2ea('0x4b')](_0xd062b9);(function(){var _0x4b9abb=this;var _0x4a5d20=window[_0xf2ea('0x4c')]||function(){};window[_0xf2ea('0x4c')]=function(_0x551356,_0x54d2ec){$(_0x551356||'')['is'](_0xf2ea('0x4d'))||(_0x4a5d20[_0xf2ea('0x35')](this,_0x551356,_0x54d2ec),_0xd062b9['call'](_0x4b9abb));};}());}});}(this));

/* Quatro Digital - Mosaic Banners // Carlos Vinicius // Todos os direitos reservados */
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

