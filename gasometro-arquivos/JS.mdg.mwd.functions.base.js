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
			Institutional.sidemenuToggle();
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
var _0xba6b=['search','match','[class*=\x27desconto\x27]','auto','.productRightColumn','strong.skuBestPrice','label.skuBestInstallmentNumber','strong.skuPrice','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','ite','---','erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','productPage','isProductPage','closest','wrapperElement','find','skuBestPrice','qd-active','addClass','qd-sp-active','.qd_sp_on,\x20.qd_sp_ignored','.qd_active','removeClass','oneFlagByItem','siblings','.qd_sp_on','qd_sp_on','isDiscountFlag','div[skuCorrente]:first','attr','skuCorrente','skus','sku','available','bestPrice','isSmartCheckout','qd-sp-product-unavailable','getDiscountValue','O\x20valor\x20informado\x20p/\x20o\x20desconto\x20não\x20é\x20um\x20número.','.qd_productPrice','val','Por\x20alguma\x20razão\x20não\x20consegui\x20obter\x20o\x20preço\x20deste\x20produto\x20:(','appliedDiscount','.qd_displayPrice','.qd-sp-display-discount','html','installments','changeInstallments','installmentValue','.qd_sp_display_installmentValue','.qd_saveAmount','append','.qd_saveAmountPercent','prepend','changeNativeSaveAmount','em.economia-de','each','skuSelected.vtex','qd_sp_processedItem','startedByWrapper','flagElement','call','forcePromotion','string','not','style','display:none\x20!important;','after','extend','boolean','.produto','function','prototype','trim','replace','abs','undefined','pow','round','toFixed','length','join','QD_SmartPrice','Smart\x20Price','error','info','warn','object','unshift','alerta','toLowerCase','aviso','apply','text'];(function(_0x5a0ed0,_0x2ae0ec){var _0xa2516b=function(_0x1ca194){while(--_0x1ca194){_0x5a0ed0['push'](_0x5a0ed0['shift']());}};_0xa2516b(++_0x2ae0ec);}(_0xba6b,0x175));var _0xbba6=function(_0x4cf98e,_0xba4b79){_0x4cf98e=_0x4cf98e-0x0;var _0x1623ac=_0xba6b[_0x4cf98e];return _0x1623ac;};_0xbba6('0x0')!==typeof String['prototype']['trim']&&(String[_0xbba6('0x1')][_0xbba6('0x2')]=function(){return this['replace'](/^\s+|\s+$/g,'');});function qd_number_format(_0x5e5037,_0x2afeaa,_0x1b7be3,_0x502ce7){_0x5e5037=(_0x5e5037+'')[_0xbba6('0x3')](/[^0-9+\-Ee.]/g,'');_0x5e5037=isFinite(+_0x5e5037)?+_0x5e5037:0x0;_0x2afeaa=isFinite(+_0x2afeaa)?Math[_0xbba6('0x4')](_0x2afeaa):0x0;_0x502ce7=_0xbba6('0x5')===typeof _0x502ce7?',':_0x502ce7;_0x1b7be3=_0xbba6('0x5')===typeof _0x1b7be3?'.':_0x1b7be3;var _0x919672='',_0x919672=function(_0x784d4d,_0x40f3a2){var _0x2afeaa=Math[_0xbba6('0x6')](0xa,_0x40f3a2);return''+(Math[_0xbba6('0x7')](_0x784d4d*_0x2afeaa)/_0x2afeaa)[_0xbba6('0x8')](_0x40f3a2);},_0x919672=(_0x2afeaa?_0x919672(_0x5e5037,_0x2afeaa):''+Math[_0xbba6('0x7')](_0x5e5037))['split']('.');0x3<_0x919672[0x0][_0xbba6('0x9')]&&(_0x919672[0x0]=_0x919672[0x0][_0xbba6('0x3')](/\B(?=(?:\d{3})+(?!\d))/g,_0x502ce7));(_0x919672[0x1]||'')[_0xbba6('0x9')]<_0x2afeaa&&(_0x919672[0x1]=_0x919672[0x1]||'',_0x919672[0x1]+=Array(_0x2afeaa-_0x919672[0x1][_0xbba6('0x9')]+0x1)[_0xbba6('0xa')]('0'));return _0x919672[_0xbba6('0xa')](_0x1b7be3);};(function(_0x1aa8c4){'use strict';var _0x58f546=jQuery;if(typeof _0x58f546['fn'][_0xbba6('0xb')]===_0xbba6('0x0'))return;var _0x349646=_0xbba6('0xc');var _0xc06d9d=function(_0x5b424a,_0x1f3e7a){if('object'===typeof console&&_0xbba6('0x0')===typeof console[_0xbba6('0xd')]&&_0xbba6('0x0')===typeof console[_0xbba6('0xe')]&&_0xbba6('0x0')===typeof console[_0xbba6('0xf')]){var _0x20ccc3;_0xbba6('0x10')===typeof _0x5b424a?(_0x5b424a[_0xbba6('0x11')]('['+_0x349646+']\x0a'),_0x20ccc3=_0x5b424a):_0x20ccc3=['['+_0x349646+']\x0a'+_0x5b424a];if(_0xbba6('0x5')===typeof _0x1f3e7a||_0xbba6('0x12')!==_0x1f3e7a[_0xbba6('0x13')]()&&_0xbba6('0x14')!==_0x1f3e7a[_0xbba6('0x13')]())if(_0xbba6('0x5')!==typeof _0x1f3e7a&&_0xbba6('0xe')===_0x1f3e7a[_0xbba6('0x13')]())try{console[_0xbba6('0xe')][_0xbba6('0x15')](console,_0x20ccc3);}catch(_0x3c77ea){console[_0xbba6('0xe')](_0x20ccc3[_0xbba6('0xa')]('\x0a'));}else try{console[_0xbba6('0xd')]['apply'](console,_0x20ccc3);}catch(_0x57e371){console[_0xbba6('0xd')](_0x20ccc3['join']('\x0a'));}else try{console[_0xbba6('0xf')][_0xbba6('0x15')](console,_0x20ccc3);}catch(_0xf57758){console[_0xbba6('0xf')](_0x20ccc3[_0xbba6('0xa')]('\x0a'));}}};var _0x443a45=/[0-9]+\%/i;var _0x1fa59a=/[0-9\.]+(?=\%)/i;var _0x3632ff={'isDiscountFlag':function(_0x492eed){if(_0x492eed[_0xbba6('0x16')]()[_0xbba6('0x17')](_0x443a45)>-0x1)return!![];return![];},'getDiscountValue':function(_0x4f5900){return _0x4f5900['text']()[_0xbba6('0x18')](_0x1fa59a);},'startedByWrapper':![],'flagElement':'.flag','wrapperElement':'li','filterFlagBy':_0xbba6('0x19'),'forcePromotion':null,'appliedDiscount':null,'oneFlagByItem':!![],'isSmartCheckout':!![],'changeInstallments':![],'productPage':{'changeNativeSaveAmount':!![],'changeNativePrice':!![],'changeInstallments':![],'isProductPage':_0xbba6('0x1a'),'wrapperElement':_0xbba6('0x1b'),'skuBestPrice':_0xbba6('0x1c'),'installments':_0xbba6('0x1d'),'installmentValue':'label.skuBestInstallmentValue','skuPrice':_0xbba6('0x1e')}};_0x58f546['fn']['QD_SmartPrice']=function(){};var _0x11a1b8=function(_0x5db100){var _0x36f80c={'t':_0xbba6('0x1f')};return function(_0x431438){var _0x151733,_0x3e8feb,_0x53c932,_0x1b9a9c;_0x3e8feb=function(_0x105fbd){return _0x105fbd;};_0x53c932=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x431438=_0x431438['d'+_0x53c932[0x10]+'c'+_0x53c932[0x11]+'m'+_0x3e8feb(_0x53c932[0x1])+'n'+_0x53c932[0xd]]['l'+_0x53c932[0x12]+'c'+_0x53c932[0x0]+'ti'+_0x3e8feb('o')+'n'];_0x151733=function(_0x4463f5){return escape(encodeURIComponent(_0x4463f5['replace'](/\./g,'¨')[_0xbba6('0x3')](/[a-zA-Z]/g,function(_0x5937af){return String[_0xbba6('0x20')](('Z'>=_0x5937af?0x5a:0x7a)>=(_0x5937af=_0x5937af[_0xbba6('0x21')](0x0)+0xd)?_0x5937af:_0x5937af-0x1a);})));};var _0x2aa0b0=_0x151733(_0x431438[[_0x53c932[0x9],_0x3e8feb('o'),_0x53c932[0xc],_0x53c932[_0x3e8feb(0xd)]][_0xbba6('0xa')]('')]);_0x151733=_0x151733((window[['js',_0x3e8feb('no'),'m',_0x53c932[0x1],_0x53c932[0x4]['toUpperCase'](),_0xbba6('0x22')][_0xbba6('0xa')]('')]||_0xbba6('0x23'))+['.v',_0x53c932[0xd],'e',_0x3e8feb('x'),'co',_0x3e8feb('mm'),_0xbba6('0x24'),_0x53c932[0x1],'.c',_0x3e8feb('o'),'m.',_0x53c932[0x13],'r'][_0xbba6('0xa')](''));for(var _0x39078f in _0x36f80c){if(_0x151733===_0x39078f+_0x36f80c[_0x39078f]||_0x2aa0b0===_0x39078f+_0x36f80c[_0x39078f]){_0x1b9a9c='tr'+_0x53c932[0x11]+'e';break;}_0x1b9a9c='f'+_0x53c932[0x0]+'ls'+_0x3e8feb(_0x53c932[0x1])+'';}_0x3e8feb=!0x1;-0x1<_0x431438[[_0x53c932[0xc],'e',_0x53c932[0x0],'rc',_0x53c932[0x9]]['join']('')][_0xbba6('0x25')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x3e8feb=!0x0);return[_0x1b9a9c,_0x3e8feb];}(_0x5db100);}(window);if(!eval(_0x11a1b8[0x0]))return _0x11a1b8[0x1]?_0xc06d9d(_0xbba6('0x26')):!0x1;var _0x3f9a6a=function(_0x315f26,_0x4aceb6){'use strict';var _0x3081b=function(_0x999b4a){'use strict';var _0x3a72a7,_0xd386fe,_0x52e3aa,_0x50f886,_0x501a94,_0x2de30c,_0x3b74d0,_0x4b36ab,_0x2a5d1c,_0x1a6dda,_0xab8bea,_0x4cdda5,_0x8dce6d,_0x23861d,_0x52c5a4,_0x26fc32,_0x4a1550,_0xcc99f3,_0x3a3e19;var _0x25efa9=_0x58f546(this);_0x999b4a=typeof _0x999b4a===_0xbba6('0x5')?![]:_0x999b4a;if(_0x4aceb6[_0xbba6('0x27')][_0xbba6('0x28')])var _0x53935d=_0x25efa9[_0xbba6('0x29')](_0x4aceb6[_0xbba6('0x27')][_0xbba6('0x2a')]);else var _0x53935d=_0x25efa9[_0xbba6('0x29')](_0x4aceb6[_0xbba6('0x2a')]);if(!_0x999b4a&&!_0x25efa9['is'](_0x4aceb6['filterFlagBy'])){if(_0x4aceb6[_0xbba6('0x27')][_0xbba6('0x28')]&&_0x53935d['is'](_0x4aceb6[_0xbba6('0x27')][_0xbba6('0x2a')])){_0x53935d[_0xbba6('0x2b')](_0x4aceb6[_0xbba6('0x27')][_0xbba6('0x2c')])['addClass'](_0xbba6('0x2d'));_0x53935d[_0xbba6('0x2e')](_0xbba6('0x2f'));}return;}var _0x424e37=_0x4aceb6['productPage']['isProductPage'];if(_0x25efa9['is'](_0xbba6('0x30'))&&!_0x424e37)return;if(_0x424e37){_0x4b36ab=_0x53935d[_0xbba6('0x2b')](_0x4aceb6[_0xbba6('0x27')][_0xbba6('0x2c')]);if(_0x4b36ab[_0xbba6('0x2b')](_0xbba6('0x31'))[_0xbba6('0x9')])return;_0x4b36ab[_0xbba6('0x32')](_0xbba6('0x2d'));_0x53935d[_0xbba6('0x32')]('qd-sp-active');}if(_0x4aceb6[_0xbba6('0x33')]&&_0x25efa9[_0xbba6('0x34')](_0xbba6('0x35'))['length']){_0x25efa9[_0xbba6('0x2e')]('qd_sp_ignored');return;}_0x25efa9['addClass'](_0xbba6('0x36'));if(!_0x4aceb6[_0xbba6('0x37')](_0x25efa9))return;if(_0x424e37){_0x52e3aa={};var _0x11b219=parseInt(_0x58f546(_0xbba6('0x38'))[_0xbba6('0x39')](_0xbba6('0x3a')),0xa);if(_0x11b219){for(var _0x3646c1=0x0;_0x3646c1<skuJson['skus'][_0xbba6('0x9')];_0x3646c1++){if(skuJson[_0xbba6('0x3b')][_0x3646c1][_0xbba6('0x3c')]==_0x11b219){_0x52e3aa=skuJson['skus'][_0x3646c1];break;}}}else{var _0x2042c3=0x5af3107a3fff;for(var _0x42ca4c in skuJson[_0xbba6('0x3b')]){if(typeof skuJson[_0xbba6('0x3b')][_0x42ca4c]==='function')continue;if(!skuJson['skus'][_0x42ca4c][_0xbba6('0x3d')])continue;if(skuJson[_0xbba6('0x3b')][_0x42ca4c][_0xbba6('0x3e')]<_0x2042c3){_0x2042c3=skuJson['skus'][_0x42ca4c][_0xbba6('0x3e')];_0x52e3aa=skuJson['skus'][_0x42ca4c];}}}}_0x26fc32=!![];_0x4a1550=0x0;if(_0x4aceb6[_0xbba6('0x3f')]&&_0xcc99f3){_0x26fc32=skuJson[_0xbba6('0x3d')];if(!_0x26fc32)return _0x53935d[_0xbba6('0x2e')](_0xbba6('0x40'));}_0xd386fe=_0x4aceb6[_0xbba6('0x41')](_0x25efa9);_0x3a72a7=parseFloat(_0xd386fe,0xa);if(isNaN(_0x3a72a7))return _0xc06d9d([_0xbba6('0x42'),_0x25efa9],_0xbba6('0x12'));var _0x24c3aa=function(_0x5f1413){if(_0x424e37)_0x50f886=(_0x5f1413['bestPrice']||0x0)/0x64;else{_0x8dce6d=_0x53935d[_0xbba6('0x2b')](_0xbba6('0x43'));_0x50f886=parseFloat((_0x8dce6d[_0xbba6('0x44')]()||'')[_0xbba6('0x3')](/[^0-9\.\,]+/i,'')['replace']('.','')[_0xbba6('0x3')](',','.'),0xa);}if(isNaN(_0x50f886))return _0xc06d9d([_0xbba6('0x45'),_0x25efa9,_0x53935d]);if(_0x4aceb6[_0xbba6('0x46')]!==null){_0x23861d=0x0;if(!isNaN(_0x4aceb6[_0xbba6('0x46')]))_0x23861d=_0x4aceb6[_0xbba6('0x46')];else{_0x52c5a4=_0x53935d[_0xbba6('0x2b')](_0x4aceb6['appliedDiscount']);if(_0x52c5a4['length'])_0x23861d=_0x4aceb6[_0xbba6('0x41')](_0x52c5a4);}_0x23861d=parseFloat(_0x23861d,0xa);if(isNaN(_0x23861d))_0x23861d=0x0;if(_0x23861d!==0x0)_0x50f886=_0x50f886*0x64/(0x64-_0x23861d);}if(_0x424e37)_0x501a94=(_0x5f1413['listPrice']||0x0)/0x64;else _0x501a94=parseFloat((_0x53935d[_0xbba6('0x2b')]('.qd_productOldPrice')[_0xbba6('0x44')]()||'')[_0xbba6('0x3')](/[^0-9\.\,]+/i,'')[_0xbba6('0x3')]('.','')[_0xbba6('0x3')](',','.'),0xa);if(isNaN(_0x501a94))_0x501a94=0.001;_0x2de30c=_0x50f886*((0x64-_0x3a72a7)/0x64);if(_0x424e37&&_0x4aceb6['productPage']['changeNativePrice']){_0x4b36ab['text'](_0x4b36ab[_0xbba6('0x16')]()['trim']()[_0xbba6('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x2de30c,0x2,',','.')))['addClass'](_0xbba6('0x2d'));_0x53935d[_0xbba6('0x2e')]('qd-sp-active');}else{_0x3a3e19=_0x53935d['find'](_0xbba6('0x47'));_0x3a3e19[_0xbba6('0x16')](_0x3a3e19[_0xbba6('0x16')]()[_0xbba6('0x3')](/[0-9\.]+,[0-9]+/i,'')+qd_number_format(_0x2de30c,0x2,',','.'));}if(_0x424e37){_0x3b74d0=_0x53935d['find'](_0x4aceb6[_0xbba6('0x27')]['skuPrice']);if(_0x3b74d0[_0xbba6('0x9')])_0x3b74d0[_0xbba6('0x16')](_0x3b74d0[_0xbba6('0x16')]()[_0xbba6('0x2')]()['replace'](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x2de30c,0x2,',','.')));}var _0x57ad75=_0x53935d['find'](_0xbba6('0x48'));_0x57ad75[_0xbba6('0x16')](_0x57ad75[_0xbba6('0x16')]()[_0xbba6('0x3')](/[0-9]+\%/i,_0x3a72a7+'%'));var _0x1eeea3=function(_0xba9d39,_0x178ae6,_0x517fc5){var _0x2fb952=_0x53935d[_0xbba6('0x2b')](_0xba9d39);if(_0x2fb952[_0xbba6('0x9')])_0x2fb952['html'](_0x2fb952[_0xbba6('0x49')]()[_0xbba6('0x2')]()[_0xbba6('0x3')](/[0-9]{1,2}/,_0x517fc5?_0x517fc5:_0x5f1413[_0xbba6('0x4a')]||0x0));var _0x10e245=_0x53935d['find'](_0x178ae6);if(_0x10e245['length'])_0x10e245['html'](_0x10e245['html']()['trim']()[_0xbba6('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x2de30c/(_0x517fc5?_0x517fc5:_0x5f1413[_0xbba6('0x4a')]||0x1),0x2,',','.')));};if(_0x424e37&&_0x4aceb6['productPage'][_0xbba6('0x4b')])_0x1eeea3(_0x4aceb6[_0xbba6('0x27')][_0xbba6('0x4a')],_0x4aceb6[_0xbba6('0x27')][_0xbba6('0x4c')]);else if(_0x4aceb6[_0xbba6('0x4b')])_0x1eeea3('.qd_sp_display_installments',_0xbba6('0x4d'),parseInt(_0x53935d[_0xbba6('0x2b')]('.qd_sp_installments')[_0xbba6('0x44')]()||0x1)||0x1);_0x53935d[_0xbba6('0x2b')](_0xbba6('0x4e'))[_0xbba6('0x4f')](qd_number_format(_0x501a94-_0x2de30c,0x2,',','.'));_0x53935d[_0xbba6('0x2b')](_0xbba6('0x50'))[_0xbba6('0x51')](qd_number_format((_0x501a94-_0x2de30c)*0x64/_0x501a94,0x2,',','.'));if(_0x424e37&&_0x4aceb6['productPage'][_0xbba6('0x52')]){_0x58f546(_0xbba6('0x53'))[_0xbba6('0x54')](function(){_0xab8bea=_0x58f546(this);_0xab8bea[_0xbba6('0x16')](_0xab8bea[_0xbba6('0x16')]()[_0xbba6('0x2')]()['replace'](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x501a94-_0x2de30c,0x2,',','.')));_0xab8bea[_0xbba6('0x2e')]('qd-active');});}};_0x24c3aa(_0x52e3aa);if(_0x424e37)_0x58f546(window)['on'](_0xbba6('0x55'),function(_0x36464f,_0x31bf7d,_0x5d2df8){_0x24c3aa(_0x5d2df8);});_0x53935d['addClass'](_0xbba6('0x56'));if(!_0x424e37)_0x8dce6d[_0xbba6('0x2e')]('qd_sp_processedItem');};(_0x4aceb6[_0xbba6('0x57')]?_0x315f26[_0xbba6('0x2b')](_0x4aceb6[_0xbba6('0x58')]):_0x315f26)[_0xbba6('0x54')](function(){_0x3081b[_0xbba6('0x59')](this,![]);});if(typeof _0x4aceb6[_0xbba6('0x5a')]==_0xbba6('0x5b')){var _0x13a87d=_0x4aceb6['startedByWrapper']?_0x315f26:_0x315f26[_0xbba6('0x29')](_0x4aceb6[_0xbba6('0x2a')]);if(_0x4aceb6[_0xbba6('0x27')][_0xbba6('0x28')])_0x13a87d=_0x13a87d[_0xbba6('0x29')](_0x4aceb6[_0xbba6('0x27')][_0xbba6('0x2a')])[_0xbba6('0x5c')]('.qd_sp_processedItem');else _0x13a87d=_0x13a87d[_0xbba6('0x2b')]('.qd_productPrice:not(.qd_sp_processedItem)');_0x13a87d[_0xbba6('0x54')](function(){var _0x1be791=_0x58f546(_0x4aceb6[_0xbba6('0x5a')]);_0x1be791['attr'](_0xbba6('0x5d'),_0xbba6('0x5e'));if(_0x4aceb6[_0xbba6('0x27')]['isProductPage'])_0x58f546(this)['append'](_0x1be791);else _0x58f546(this)[_0xbba6('0x5f')](_0x1be791);_0x3081b[_0xbba6('0x59')](_0x1be791,!![]);});}};_0x58f546['fn'][_0xbba6('0xb')]=function(_0x1ba7b7){var _0x4299a8=_0x58f546(this);if(!_0x4299a8[_0xbba6('0x9')])return _0x4299a8;var _0x3ec3b3=_0x58f546[_0xbba6('0x60')](!![],{},_0x3632ff,_0x1ba7b7);if(typeof _0x3ec3b3[_0xbba6('0x27')]['isProductPage']!=_0xbba6('0x61'))_0x3ec3b3[_0xbba6('0x27')][_0xbba6('0x28')]=_0x58f546(document['body'])['is'](_0xbba6('0x62'));_0x3f9a6a(_0x4299a8,_0x3ec3b3);return _0x4299a8;};}(this));
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
var _0x827a=['qd-am-elem-','first','trim','replaceSpecialChars','>li','qd-amazing-menu','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','add','qd-am-','-li','callback','call','extend','exec','.qd_amazing_menu_auto','getParent','closest','function','QD_amazingMenu','/qd-amazing-menu','object','error','undefined','info','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','apply','join','qdAmAddNdx','addClass','qd-am-li-','last','qd-am-last','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','url','each','img[alt=\x27','attr','.box-banner','clone','insertBefore','hide','qd-am-content-loaded','text','data-qdam-value','[class*=\x27colunas\x27]','\x27\x20falho.','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','children'];(function(_0x41e723,_0x5e6494){var _0x5cf973=function(_0x4ce435){while(--_0x4ce435){_0x41e723['push'](_0x41e723['shift']());}};_0x5cf973(++_0x5e6494);}(_0x827a,0xf7));var _0xa827=function(_0x7eea67,_0x3cbc75){_0x7eea67=_0x7eea67-0x0;var _0x429079=_0x827a[_0x7eea67];return _0x429079;};(function(_0x2c7bc9){_0x2c7bc9['fn'][_0xa827('0x0')]=_0x2c7bc9['fn'][_0xa827('0x1')];}(jQuery));(function(_0xae0522){var _0x11dbe9;var _0x4b65ed=jQuery;if(_0xa827('0x2')!==typeof _0x4b65ed['fn'][_0xa827('0x3')]){var _0x583242={'url':_0xa827('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0x4a3983=function(_0x334339,_0x3f226b){if(_0xa827('0x5')===typeof console&&'undefined'!==typeof console[_0xa827('0x6')]&&_0xa827('0x7')!==typeof console[_0xa827('0x8')]&&_0xa827('0x7')!==typeof console[_0xa827('0x9')]){var _0x2041d2;_0xa827('0x5')===typeof _0x334339?(_0x334339[_0xa827('0xa')](_0xa827('0xb')),_0x2041d2=_0x334339):_0x2041d2=[_0xa827('0xb')+_0x334339];if(_0xa827('0x7')===typeof _0x3f226b||_0xa827('0xc')!==_0x3f226b[_0xa827('0xd')]()&&'aviso'!==_0x3f226b[_0xa827('0xd')]())if(_0xa827('0x7')!==typeof _0x3f226b&&_0xa827('0x8')===_0x3f226b['toLowerCase']())try{console[_0xa827('0x8')][_0xa827('0xe')](console,_0x2041d2);}catch(_0x1ed877){try{console[_0xa827('0x8')](_0x2041d2[_0xa827('0xf')]('\x0a'));}catch(_0x283de7){}}else try{console[_0xa827('0x6')][_0xa827('0xe')](console,_0x2041d2);}catch(_0x37b848){try{console[_0xa827('0x6')](_0x2041d2[_0xa827('0xf')]('\x0a'));}catch(_0x25fd1e){}}else try{console[_0xa827('0x9')][_0xa827('0xe')](console,_0x2041d2);}catch(_0x3304bf){try{console[_0xa827('0x9')](_0x2041d2[_0xa827('0xf')]('\x0a'));}catch(_0x5d3d62){}}}};_0x4b65ed['fn'][_0xa827('0x10')]=function(){var _0x1309cd=_0x4b65ed(this);_0x1309cd['each'](function(_0x301390){_0x4b65ed(this)[_0xa827('0x11')](_0xa827('0x12')+_0x301390);});_0x1309cd['first']()[_0xa827('0x11')]('qd-am-first');_0x1309cd[_0xa827('0x13')]()[_0xa827('0x11')](_0xa827('0x14'));return _0x1309cd;};_0x4b65ed['fn'][_0xa827('0x3')]=function(){};_0xae0522=function(_0x164b83){var _0x262bb7={'t':_0xa827('0x15')};return function(_0x1fcef0){var _0x1fcbde=function(_0x1d57c8){return _0x1d57c8;};var _0x5647ac=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x1fcef0=_0x1fcef0['d'+_0x5647ac[0x10]+'c'+_0x5647ac[0x11]+'m'+_0x1fcbde(_0x5647ac[0x1])+'n'+_0x5647ac[0xd]]['l'+_0x5647ac[0x12]+'c'+_0x5647ac[0x0]+'ti'+_0x1fcbde('o')+'n'];var _0x57e274=function(_0xa8a09d){return escape(encodeURIComponent(_0xa8a09d[_0xa827('0x16')](/\./g,'¨')[_0xa827('0x16')](/[a-zA-Z]/g,function(_0x48a19e){return String[_0xa827('0x17')](('Z'>=_0x48a19e?0x5a:0x7a)>=(_0x48a19e=_0x48a19e[_0xa827('0x18')](0x0)+0xd)?_0x48a19e:_0x48a19e-0x1a);})));};var _0x2954e8=_0x57e274(_0x1fcef0[[_0x5647ac[0x9],_0x1fcbde('o'),_0x5647ac[0xc],_0x5647ac[_0x1fcbde(0xd)]]['join']('')]);_0x57e274=_0x57e274((window[['js',_0x1fcbde('no'),'m',_0x5647ac[0x1],_0x5647ac[0x4]['toUpperCase'](),'ite']['join']('')]||_0xa827('0x19'))+['.v',_0x5647ac[0xd],'e',_0x1fcbde('x'),'co',_0x1fcbde('mm'),_0xa827('0x1a'),_0x5647ac[0x1],'.c',_0x1fcbde('o'),'m.',_0x5647ac[0x13],'r']['join'](''));for(var _0x54266d in _0x262bb7){if(_0x57e274===_0x54266d+_0x262bb7[_0x54266d]||_0x2954e8===_0x54266d+_0x262bb7[_0x54266d]){var _0x280ece='tr'+_0x5647ac[0x11]+'e';break;}_0x280ece='f'+_0x5647ac[0x0]+'ls'+_0x1fcbde(_0x5647ac[0x1])+'';}_0x1fcbde=!0x1;-0x1<_0x1fcef0[[_0x5647ac[0xc],'e',_0x5647ac[0x0],'rc',_0x5647ac[0x9]][_0xa827('0xf')]('')][_0xa827('0x1b')](_0xa827('0x1c'))&&(_0x1fcbde=!0x0);return[_0x280ece,_0x1fcbde];}(_0x164b83);}(window);if(!eval(_0xae0522[0x0]))return _0xae0522[0x1]?_0x4a3983(_0xa827('0x1d')):!0x1;var _0x55cfba=function(_0x231525){var _0x89b3bf=_0x231525[_0xa827('0x1e')]('.qd_am_code');var _0x42cd20=_0x89b3bf[_0xa827('0x1f')](_0xa827('0x20'));var _0x1ac5fe=_0x89b3bf[_0xa827('0x1f')](_0xa827('0x21'));if(_0x42cd20[_0xa827('0x22')]||_0x1ac5fe[_0xa827('0x22')])_0x42cd20[_0xa827('0x23')]()[_0xa827('0x11')](_0xa827('0x24')),_0x1ac5fe[_0xa827('0x23')]()[_0xa827('0x11')](_0xa827('0x25')),_0x4b65ed[_0xa827('0x26')]({'url':_0x11dbe9[_0xa827('0x27')],'dataType':'html','success':function(_0x28539f){var _0x346f4b=_0x4b65ed(_0x28539f);_0x42cd20[_0xa827('0x28')](function(){var _0x28539f=_0x4b65ed(this);var _0x5df307=_0x346f4b['find'](_0xa827('0x29')+_0x28539f[_0xa827('0x2a')]('data-qdam-value')+'\x27]');_0x5df307[_0xa827('0x22')]&&(_0x5df307[_0xa827('0x28')](function(){_0x4b65ed(this)[_0xa827('0x0')](_0xa827('0x2b'))[_0xa827('0x2c')]()[_0xa827('0x2d')](_0x28539f);}),_0x28539f[_0xa827('0x2e')]());})[_0xa827('0x11')](_0xa827('0x2f'));_0x1ac5fe[_0xa827('0x28')](function(){var _0x28539f={};var _0x5dc860=_0x4b65ed(this);_0x346f4b[_0xa827('0x1e')]('h2')['each'](function(){if(_0x4b65ed(this)[_0xa827('0x30')]()['trim']()[_0xa827('0xd')]()==_0x5dc860['attr'](_0xa827('0x31'))['trim']()[_0xa827('0xd')]())return _0x28539f=_0x4b65ed(this),!0x1;});_0x28539f[_0xa827('0x22')]&&(_0x28539f[_0xa827('0x28')](function(){_0x4b65ed(this)['getParent'](_0xa827('0x32'))[_0xa827('0x2c')]()[_0xa827('0x2d')](_0x5dc860);}),_0x5dc860[_0xa827('0x2e')]());})[_0xa827('0x11')]('qd-am-content-loaded');},'error':function(){_0x4a3983('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27'+_0x11dbe9[_0xa827('0x27')]+_0xa827('0x33'));},'complete':function(){_0x11dbe9['ajaxCallback']['call'](this);_0x4b65ed(window)[_0xa827('0x34')](_0xa827('0x35'),_0x231525);},'clearQueueDelay':0xbb8});};_0x4b65ed[_0xa827('0x3')]=function(_0x39761c){var _0x483554=_0x39761c[_0xa827('0x1e')](_0xa827('0x36'))[_0xa827('0x28')](function(){var _0x4a9112=_0x4b65ed(this);if(!_0x4a9112[_0xa827('0x22')])return _0x4a3983([_0xa827('0x37'),_0x39761c],_0xa827('0xc'));_0x4a9112[_0xa827('0x1e')]('li\x20>ul')[_0xa827('0x23')]()[_0xa827('0x11')]('qd-am-has-ul');_0x4a9112[_0xa827('0x1e')]('li')['each'](function(){var _0x57077d=_0x4b65ed(this);var _0x3863df=_0x57077d[_0xa827('0x38')](':not(ul)');_0x3863df[_0xa827('0x22')]&&_0x57077d[_0xa827('0x11')](_0xa827('0x39')+_0x3863df[_0xa827('0x3a')]()[_0xa827('0x30')]()[_0xa827('0x3b')]()[_0xa827('0x3c')]()['replace'](/\./g,'')['replace'](/\s/g,'-')[_0xa827('0xd')]());});var _0x5b82e7=_0x4a9112['find'](_0xa827('0x3d'))['qdAmAddNdx']();_0x4a9112[_0xa827('0x11')](_0xa827('0x3e'));_0x5b82e7=_0x5b82e7[_0xa827('0x1e')](_0xa827('0x3f'));_0x5b82e7[_0xa827('0x28')](function(){var _0x4fab50=_0x4b65ed(this);_0x4fab50['find'](_0xa827('0x3d'))[_0xa827('0x10')]()[_0xa827('0x11')](_0xa827('0x40'));_0x4fab50[_0xa827('0x11')](_0xa827('0x41'));_0x4fab50[_0xa827('0x23')]()[_0xa827('0x11')](_0xa827('0x42'));});_0x5b82e7[_0xa827('0x11')]('qd-am-dropdown');var _0x596bdd=0x0,_0xae0522=function(_0x2ade5c){_0x596bdd+=0x1;_0x2ade5c=_0x2ade5c['children']('li')[_0xa827('0x38')]('*');_0x2ade5c['length']&&(_0x2ade5c['addClass'](_0xa827('0x43')+_0x596bdd),_0xae0522(_0x2ade5c));};_0xae0522(_0x4a9112);_0x4a9112[_0xa827('0x44')](_0x4a9112[_0xa827('0x1e')]('ul'))[_0xa827('0x28')](function(){var _0x577624=_0x4b65ed(this);_0x577624[_0xa827('0x11')](_0xa827('0x45')+_0x577624[_0xa827('0x38')]('li')[_0xa827('0x22')]+_0xa827('0x46'));});});_0x55cfba(_0x483554);_0x11dbe9[_0xa827('0x47')][_0xa827('0x48')](this);_0x4b65ed(window)['trigger']('QuatroDigital.am.callback',_0x39761c);};_0x4b65ed['fn']['QD_amazingMenu']=function(_0x5c5524){var _0x4ba7de=_0x4b65ed(this);if(!_0x4ba7de[_0xa827('0x22')])return _0x4ba7de;_0x11dbe9=_0x4b65ed[_0xa827('0x49')]({},_0x583242,_0x5c5524);_0x4ba7de[_0xa827('0x4a')]=new _0x4b65ed['QD_amazingMenu'](_0x4b65ed(this));return _0x4ba7de;};_0x4b65ed(function(){_0x4b65ed(_0xa827('0x4b'))[_0xa827('0x3')]();});}}(this));

/* Quatro Digital Smart Cart */
var _0x34e8=['toLowerCase','qdAjaxQueue','000','error','qdAjax','extend','GET','object','data','stringify','toString','type','jqXHR','done','fail','always','complete','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','message','simpleCart','checkout','getOrderForm','call','QuatroDigital_simpleCart','ajaxStopOn','warn','[Simple\x20Cart]\x0a','info','QD_simpleCart','elements','add','.qd_cart_qtt','.qd_cart_total','meta[name=currency]','each','qd_simpleCartOpts','_QuatroDigital_CartData','Shipping','value','totalizers','total','currencySymbol','allTotal','showQuantityByItems','items','qtt','quantity','callback','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','filter','.singular','show','hide','.plural','addClass','qd-emptyCart','removeClass','$this','O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','alerta','html','cartQttE','itemsTextE','find','cartTotalE','cartTotal','emptyCart','smartCheckout','_QuatroDigital_DropDown','vtexjs','SDK','QD_checkoutQueue','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','trigger','simpleCartCallback.quatro_digital','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','.qd_cart_auto','bind','Oooops!\x20','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Callbacks','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','.productInformationWrapper\x20\x20a.buy-button','input.buy-in-page-quantity','javascript:','body','.productQuickView','Produto\x20adicionado\x20ao\x20carrinho!','location','href','#produto,\x20.produto','isSmartCheckout','qd-bb-click-active','allowBuyClick','Método\x20descontinuado!','buyButton','.qd-sbb-on','.btn-add-buy-button-asynchronous','.remove-href','qd-bb-active','children','.qd-bb-productAdded','append','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','.buy-in-page-button','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','prodAdd','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','[href=\x27','qd-bb-itemAddBuyButtonWrapper','qd-bb-itemAddCartWrapper','timeRemoveNewItemClass','função\x20descontinuada','getCartInfoByUrl','unbind','click','load','mouseenter.qd_bb_buy_sc','attr','indexOf','selectSkuMsg','execDefaultAction','redirect=false','redirect=true','queue','test','match','push','productPageCallback','buyButtonClickCallback','pop','shift','asyncCallback','cartProductAdded.vtex','fakeRequest','success','ajax','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','Callback\x20não\x20é\x20uma\x20função','QD_buyButton','.qd-bb-itemAddWrapper','url','QuatroDigital.qd_bb_prod_add','ajaxStop','allowUpdate','QD_dropDownCart','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','erc','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','name','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20input','val','updateOnlyHover','cartIsEmpty','mouseleave.qd_ddc_hover','texts','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','shipping','dataOptionsCache','.qd-ddc-wrapper','_QuatroDigital_AmountProduct','exec','qd-ddc-prodLoaded','shippingData','Este\x20método\x20esta\x20descontinuado!','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','qd-ddc-','availability','.qd-ddc-prodPrice','sellingPrice','Grátis','content','.qd-ddc-quantity','.qd-ddc-remove','insertProdImg','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','address','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','[data-sku=\x27','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','click.qd_ddc_minus','preventDefault','focusout.qd_ddc_change','click.qd_ddc_remove','removeProduct','stop','slideUp','remove','shippingCalculate','$1-$2$3','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','index','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','qd-bap-item-added','.qd-bap-wrapper','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','.qdDdcContainer','QD_smartCart','dropDown','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','closest','replace','abs','undefined','pow','round','toFixed','split','length','join','function','prototype','trim','capitalize','charAt','slice'];(function(_0x3e478c,_0x152670){var _0x29ef89=function(_0x3d0d77){while(--_0x3d0d77){_0x3e478c['push'](_0x3e478c['shift']());}};_0x29ef89(++_0x152670);}(_0x34e8,0x12c));var _0x834e=function(_0x44e706,_0x4ace37){_0x44e706=_0x44e706-0x0;var _0xdb7e93=_0x34e8[_0x44e706];return _0xdb7e93;};(function(_0x26715f){_0x26715f['fn'][_0x834e('0x0')]=_0x26715f['fn'][_0x834e('0x1')];}(jQuery));function qd_number_format(_0x35e6fb,_0x530939,_0x832422,_0x21e2e0){_0x35e6fb=(_0x35e6fb+'')[_0x834e('0x2')](/[^0-9+\-Ee.]/g,'');_0x35e6fb=isFinite(+_0x35e6fb)?+_0x35e6fb:0x0;_0x530939=isFinite(+_0x530939)?Math[_0x834e('0x3')](_0x530939):0x0;_0x21e2e0=_0x834e('0x4')===typeof _0x21e2e0?',':_0x21e2e0;_0x832422=_0x834e('0x4')===typeof _0x832422?'.':_0x832422;var _0x858aa1='',_0x858aa1=function(_0x52056d,_0x3e16d2){var _0x530939=Math[_0x834e('0x5')](0xa,_0x3e16d2);return''+(Math[_0x834e('0x6')](_0x52056d*_0x530939)/_0x530939)[_0x834e('0x7')](_0x3e16d2);},_0x858aa1=(_0x530939?_0x858aa1(_0x35e6fb,_0x530939):''+Math[_0x834e('0x6')](_0x35e6fb))[_0x834e('0x8')]('.');0x3<_0x858aa1[0x0][_0x834e('0x9')]&&(_0x858aa1[0x0]=_0x858aa1[0x0][_0x834e('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x21e2e0));(_0x858aa1[0x1]||'')[_0x834e('0x9')]<_0x530939&&(_0x858aa1[0x1]=_0x858aa1[0x1]||'',_0x858aa1[0x1]+=Array(_0x530939-_0x858aa1[0x1][_0x834e('0x9')]+0x1)[_0x834e('0xa')]('0'));return _0x858aa1[_0x834e('0xa')](_0x832422);};_0x834e('0xb')!==typeof String[_0x834e('0xc')][_0x834e('0xd')]&&(String[_0x834e('0xc')]['trim']=function(){return this[_0x834e('0x2')](/^\s+|\s+$/g,'');});_0x834e('0xb')!=typeof String['prototype'][_0x834e('0xe')]&&(String[_0x834e('0xc')][_0x834e('0xe')]=function(){return this[_0x834e('0xf')](0x0)['toUpperCase']()+this[_0x834e('0x10')](0x1)[_0x834e('0x11')]();});(function(_0x57274a){if(_0x834e('0xb')!==typeof _0x57274a['qdAjax']){var _0x38a8cd={};_0x57274a[_0x834e('0x12')]=_0x38a8cd;0x96>parseInt((_0x57274a['fn']['jquery'][_0x834e('0x2')](/[^0-9]+/g,'')+_0x834e('0x13'))[_0x834e('0x10')](0x0,0x3),0xa)&&console&&'function'==typeof console[_0x834e('0x14')]&&console[_0x834e('0x14')]();_0x57274a[_0x834e('0x15')]=function(_0xb993a1){try{var _0x237947=_0x57274a[_0x834e('0x16')]({},{'url':'','type':_0x834e('0x17'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0xb993a1);var _0x595515=_0x834e('0x18')===typeof _0x237947[_0x834e('0x19')]?JSON[_0x834e('0x1a')](_0x237947[_0x834e('0x19')]):_0x237947['data'][_0x834e('0x1b')]();var _0x62f8f1=encodeURIComponent(_0x237947['url']+'|'+_0x237947[_0x834e('0x1c')]+'|'+_0x595515);_0x38a8cd[_0x62f8f1]=_0x38a8cd[_0x62f8f1]||{};_0x834e('0x4')==typeof _0x38a8cd[_0x62f8f1][_0x834e('0x1d')]?_0x38a8cd[_0x62f8f1]['jqXHR']=_0x57274a['ajax'](_0x237947):(_0x38a8cd[_0x62f8f1][_0x834e('0x1d')][_0x834e('0x1e')](_0x237947['success']),_0x38a8cd[_0x62f8f1][_0x834e('0x1d')][_0x834e('0x1f')](_0x237947['error']),_0x38a8cd[_0x62f8f1][_0x834e('0x1d')][_0x834e('0x20')](_0x237947[_0x834e('0x21')]));_0x38a8cd[_0x62f8f1]['jqXHR'][_0x834e('0x20')](function(){isNaN(parseInt(_0x237947[_0x834e('0x22')]))||setTimeout(function(){_0x38a8cd[_0x62f8f1]['jqXHR']=void 0x0;},_0x237947['clearQueueDelay']);});return _0x38a8cd[_0x62f8f1][_0x834e('0x1d')];}catch(_0x508a1d){_0x834e('0x4')!==typeof console&&_0x834e('0xb')===typeof console[_0x834e('0x14')]&&console[_0x834e('0x14')](_0x834e('0x23')+_0x508a1d[_0x834e('0x24')]);}};_0x57274a['qdAjax']['version']='4.0';}}(jQuery));(function(_0x58c1d7){_0x58c1d7['fn'][_0x834e('0x0')]=_0x58c1d7['fn'][_0x834e('0x1')];}(jQuery));(function(){var _0x106d6a=jQuery;if('function'!==typeof _0x106d6a['fn'][_0x834e('0x25')]){_0x106d6a(function(){var _0x11f1ce=vtexjs[_0x834e('0x26')][_0x834e('0x27')];vtexjs[_0x834e('0x26')][_0x834e('0x27')]=function(){return _0x11f1ce[_0x834e('0x28')]();};});try{window[_0x834e('0x29')]=window[_0x834e('0x29')]||{};window['QuatroDigital_simpleCart'][_0x834e('0x2a')]=!0x1;_0x106d6a['fn']['simpleCart']=function(_0x2c75c2,_0x3787b0,_0x9ab921){var _0x2b3418=function(_0x444366,_0x4689c2){if(_0x834e('0x18')===typeof console){var _0x38cd29=_0x834e('0x18')===typeof _0x444366;_0x834e('0x4')!==typeof _0x4689c2&&'alerta'===_0x4689c2[_0x834e('0x11')]()?_0x38cd29?console[_0x834e('0x2b')](_0x834e('0x2c'),_0x444366[0x0],_0x444366[0x1],_0x444366[0x2],_0x444366[0x3],_0x444366[0x4],_0x444366[0x5],_0x444366[0x6],_0x444366[0x7]):console[_0x834e('0x2b')]('[Simple\x20Cart]\x0a'+_0x444366):_0x834e('0x4')!==typeof _0x4689c2&&_0x834e('0x2d')===_0x4689c2['toLowerCase']()?_0x38cd29?console['info']('[Simple\x20Cart]\x0a',_0x444366[0x0],_0x444366[0x1],_0x444366[0x2],_0x444366[0x3],_0x444366[0x4],_0x444366[0x5],_0x444366[0x6],_0x444366[0x7]):console[_0x834e('0x2d')](_0x834e('0x2c')+_0x444366):_0x38cd29?console[_0x834e('0x14')](_0x834e('0x2c'),_0x444366[0x0],_0x444366[0x1],_0x444366[0x2],_0x444366[0x3],_0x444366[0x4],_0x444366[0x5],_0x444366[0x6],_0x444366[0x7]):console[_0x834e('0x14')](_0x834e('0x2c')+_0x444366);}};var _0x4c2ef6=_0x106d6a(this);_0x834e('0x18')===typeof _0x2c75c2?_0x3787b0=_0x2c75c2:(_0x2c75c2=_0x2c75c2||!0x1,_0x4c2ef6=_0x4c2ef6['add'](_0x106d6a[_0x834e('0x2e')][_0x834e('0x2f')]));if(!_0x4c2ef6['length'])return _0x4c2ef6;_0x106d6a[_0x834e('0x2e')][_0x834e('0x2f')]=_0x106d6a['QD_simpleCart']['elements'][_0x834e('0x30')](_0x4c2ef6);_0x9ab921=_0x834e('0x4')===typeof _0x9ab921?!0x1:_0x9ab921;var _0x2e9383={'cartQtt':_0x834e('0x31'),'cartTotal':_0x834e('0x32'),'itemsText':'.qd_items_text','currencySymbol':(_0x106d6a(_0x834e('0x33'))['attr']('content')||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x1b2edf=_0x106d6a['extend']({},_0x2e9383,_0x3787b0);var _0x2e5239=_0x106d6a('');_0x4c2ef6[_0x834e('0x34')](function(){var _0x16aea6=_0x106d6a(this);_0x16aea6[_0x834e('0x19')](_0x834e('0x35'))||_0x16aea6['data'](_0x834e('0x35'),_0x1b2edf);});var _0x26b847=function(_0x38f266){window['_QuatroDigital_CartData']=window[_0x834e('0x36')]||{};for(var _0x2c75c2=0x0,_0x57b89a=0x0,_0x1e3e71=0x0;_0x1e3e71<_0x38f266['totalizers'][_0x834e('0x9')];_0x1e3e71++)_0x834e('0x37')==_0x38f266['totalizers'][_0x1e3e71]['id']&&(_0x57b89a+=_0x38f266['totalizers'][_0x1e3e71][_0x834e('0x38')]),_0x2c75c2+=_0x38f266[_0x834e('0x39')][_0x1e3e71][_0x834e('0x38')];window[_0x834e('0x36')][_0x834e('0x3a')]=_0x1b2edf[_0x834e('0x3b')]+qd_number_format(_0x2c75c2/0x64,0x2,',','.');window[_0x834e('0x36')]['shipping']=_0x1b2edf[_0x834e('0x3b')]+qd_number_format(_0x57b89a/0x64,0x2,',','.');window['_QuatroDigital_CartData'][_0x834e('0x3c')]=_0x1b2edf['currencySymbol']+qd_number_format((_0x2c75c2+_0x57b89a)/0x64,0x2,',','.');window[_0x834e('0x36')]['qtt']=0x0;if(_0x1b2edf[_0x834e('0x3d')])for(_0x1e3e71=0x0;_0x1e3e71<_0x38f266[_0x834e('0x3e')]['length'];_0x1e3e71++)window[_0x834e('0x36')][_0x834e('0x3f')]+=_0x38f266[_0x834e('0x3e')][_0x1e3e71][_0x834e('0x40')];else window[_0x834e('0x36')][_0x834e('0x3f')]=_0x38f266[_0x834e('0x3e')][_0x834e('0x9')]||0x0;try{window[_0x834e('0x36')][_0x834e('0x41')]&&window['_QuatroDigital_CartData'][_0x834e('0x41')][_0x834e('0x42')]&&window['_QuatroDigital_CartData'][_0x834e('0x41')][_0x834e('0x42')]();}catch(_0x25b035){_0x2b3418(_0x834e('0x43'));}_0x35636e(_0x2e5239);};var _0x19b5ef=function(_0x4264b8,_0x4eab06){0x1===_0x4264b8?_0x4eab06['hide']()[_0x834e('0x44')](_0x834e('0x45'))[_0x834e('0x46')]():_0x4eab06[_0x834e('0x47')]()[_0x834e('0x44')](_0x834e('0x48'))[_0x834e('0x46')]();};var _0x43f599=function(_0x1419eb){0x1>_0x1419eb?_0x4c2ef6[_0x834e('0x49')](_0x834e('0x4a')):_0x4c2ef6[_0x834e('0x4b')](_0x834e('0x4a'));};var _0x1a3237=function(_0x2aa072,_0x1a3855){var _0x3df078=parseInt(window[_0x834e('0x36')][_0x834e('0x3f')],0xa);_0x1a3855[_0x834e('0x4c')]['show']();isNaN(_0x3df078)&&(_0x2b3418(_0x834e('0x4d'),_0x834e('0x4e')),_0x3df078=0x0);_0x1a3855['cartTotalE'][_0x834e('0x4f')](window[_0x834e('0x36')]['total']);_0x1a3855[_0x834e('0x50')][_0x834e('0x4f')](_0x3df078);_0x19b5ef(_0x3df078,_0x1a3855[_0x834e('0x51')]);_0x43f599(_0x3df078);};var _0x35636e=function(_0x4288e4){_0x4c2ef6[_0x834e('0x34')](function(){var _0x4549ba={};var _0x4a8b32=_0x106d6a(this);_0x2c75c2&&_0x4a8b32[_0x834e('0x19')](_0x834e('0x35'))&&_0x106d6a[_0x834e('0x16')](_0x1b2edf,_0x4a8b32[_0x834e('0x19')](_0x834e('0x35')));_0x4549ba[_0x834e('0x4c')]=_0x4a8b32;_0x4549ba[_0x834e('0x50')]=_0x4a8b32[_0x834e('0x52')](_0x1b2edf['cartQtt'])||_0x2e5239;_0x4549ba[_0x834e('0x53')]=_0x4a8b32['find'](_0x1b2edf[_0x834e('0x54')])||_0x2e5239;_0x4549ba['itemsTextE']=_0x4a8b32[_0x834e('0x52')](_0x1b2edf['itemsText'])||_0x2e5239;_0x4549ba['emptyElem']=_0x4a8b32[_0x834e('0x52')](_0x1b2edf[_0x834e('0x55')])||_0x2e5239;_0x1a3237(_0x4288e4,_0x4549ba);_0x4a8b32['addClass']('qd-sc-populated');});};(function(){if(_0x1b2edf[_0x834e('0x56')]){window[_0x834e('0x57')]=window[_0x834e('0x57')]||{};if(_0x834e('0x4')!==typeof window[_0x834e('0x57')][_0x834e('0x27')]&&(_0x9ab921||!_0x2c75c2))return _0x26b847(window[_0x834e('0x57')][_0x834e('0x27')]);if('object'!==typeof window[_0x834e('0x58')]||_0x834e('0x4')===typeof window['vtexjs'][_0x834e('0x26')])if('object'===typeof vtex&&_0x834e('0x18')===typeof vtex[_0x834e('0x26')]&&'undefined'!==typeof vtex[_0x834e('0x26')][_0x834e('0x59')])new vtex[(_0x834e('0x26'))][(_0x834e('0x59'))]();else return _0x2b3418('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x106d6a[_0x834e('0x5a')]([_0x834e('0x3e'),_0x834e('0x39'),'shippingData'],{'done':function(_0x246b8e){_0x26b847(_0x246b8e);window[_0x834e('0x57')][_0x834e('0x27')]=_0x246b8e;},'fail':function(_0x1a0cd0){_0x2b3418([_0x834e('0x5b'),_0x1a0cd0]);}});}else alert(_0x834e('0x5c'));}());_0x1b2edf[_0x834e('0x41')]();_0x106d6a(window)[_0x834e('0x5d')](_0x834e('0x5e'));return _0x4c2ef6;};_0x106d6a[_0x834e('0x2e')]={'elements':_0x106d6a('')};_0x106d6a(function(){var _0x1e4310;_0x834e('0xb')===typeof window[_0x834e('0x5f')]&&(_0x1e4310=window[_0x834e('0x5f')],window[_0x834e('0x5f')]=function(_0x17b8e3,_0x297cce,_0x14ed83,_0x193a15,_0x3e3467){_0x1e4310[_0x834e('0x28')](this,_0x17b8e3,_0x297cce,_0x14ed83,_0x193a15,function(){_0x834e('0xb')===typeof _0x3e3467&&_0x3e3467();_0x106d6a['QD_simpleCart'][_0x834e('0x2f')][_0x834e('0x34')](function(){var _0x45bcc2=_0x106d6a(this);_0x45bcc2[_0x834e('0x25')](_0x45bcc2['data'](_0x834e('0x35')));});});});});var _0x5a9c70=window['ReloadItemsCart']||void 0x0;window[_0x834e('0x60')]=function(_0x2b1ec7){_0x106d6a['fn'][_0x834e('0x25')](!0x0);_0x834e('0xb')===typeof _0x5a9c70?_0x5a9c70[_0x834e('0x28')](this,_0x2b1ec7):alert(_0x2b1ec7);};_0x106d6a(function(){var _0x3821ad=_0x106d6a(_0x834e('0x61'));_0x3821ad[_0x834e('0x9')]&&_0x3821ad['simpleCart']();});_0x106d6a(function(){_0x106d6a(window)[_0x834e('0x62')]('productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex',function(){_0x106d6a['fn'][_0x834e('0x25')](!0x0);});});}catch(_0xd35dda){'undefined'!==typeof console&&'function'===typeof console[_0x834e('0x14')]&&console[_0x834e('0x14')](_0x834e('0x63'),_0xd35dda);}}}());(function(){var _0x2cca07=function(_0x2df64f,_0x228a60){if(_0x834e('0x18')===typeof console){var _0x28b5c9=_0x834e('0x18')===typeof _0x2df64f;_0x834e('0x4')!==typeof _0x228a60&&_0x834e('0x4e')===_0x228a60[_0x834e('0x11')]()?_0x28b5c9?console['warn'](_0x834e('0x64'),_0x2df64f[0x0],_0x2df64f[0x1],_0x2df64f[0x2],_0x2df64f[0x3],_0x2df64f[0x4],_0x2df64f[0x5],_0x2df64f[0x6],_0x2df64f[0x7]):console[_0x834e('0x2b')](_0x834e('0x64')+_0x2df64f):_0x834e('0x4')!==typeof _0x228a60&&'info'===_0x228a60[_0x834e('0x11')]()?_0x28b5c9?console['info']('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x2df64f[0x0],_0x2df64f[0x1],_0x2df64f[0x2],_0x2df64f[0x3],_0x2df64f[0x4],_0x2df64f[0x5],_0x2df64f[0x6],_0x2df64f[0x7]):console['info'](_0x834e('0x64')+_0x2df64f):_0x28b5c9?console[_0x834e('0x14')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x2df64f[0x0],_0x2df64f[0x1],_0x2df64f[0x2],_0x2df64f[0x3],_0x2df64f[0x4],_0x2df64f[0x5],_0x2df64f[0x6],_0x2df64f[0x7]):console[_0x834e('0x14')](_0x834e('0x64')+_0x2df64f);}},_0x2c41bd=null,_0x5a4854={},_0x2b0d93={},_0x15018f={};$['QD_checkoutQueue']=function(_0x353246,_0x18ccb2){if(null===_0x2c41bd)if('object'===typeof window['vtexjs']&&_0x834e('0x4')!==typeof window[_0x834e('0x58')][_0x834e('0x26')])_0x2c41bd=window[_0x834e('0x58')][_0x834e('0x26')];else return _0x2cca07('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js');var _0x264a6f=$[_0x834e('0x16')]({'done':function(){},'fail':function(){}},_0x18ccb2),_0x520367=_0x353246[_0x834e('0xa')](';'),_0x30d3e1=function(){_0x5a4854[_0x520367]['add'](_0x264a6f[_0x834e('0x1e')]);_0x2b0d93[_0x520367][_0x834e('0x30')](_0x264a6f['fail']);};_0x15018f[_0x520367]?_0x30d3e1():(_0x5a4854[_0x520367]=$[_0x834e('0x65')](),_0x2b0d93[_0x520367]=$[_0x834e('0x65')](),_0x30d3e1(),_0x15018f[_0x520367]=!0x0,_0x2c41bd[_0x834e('0x27')](_0x353246)['done'](function(_0x214014){_0x15018f[_0x520367]=!0x1;_0x5a4854[_0x520367][_0x834e('0x42')](_0x214014);})[_0x834e('0x1f')](function(_0x1ac9a1){_0x15018f[_0x520367]=!0x1;_0x2b0d93[_0x520367][_0x834e('0x42')](_0x1ac9a1);}));};}());(function(_0x29bfd7){try{var _0x1372dd=jQuery,_0x23b5d9,_0xd49002=_0x1372dd({}),_0x1691d5=function(_0x5c3945,_0x4e466e){if(_0x834e('0x18')===typeof console&&_0x834e('0x4')!==typeof console[_0x834e('0x14')]&&_0x834e('0x4')!==typeof console[_0x834e('0x2d')]&&'undefined'!==typeof console['warn']){var _0x4520fc;_0x834e('0x18')===typeof _0x5c3945?(_0x5c3945[_0x834e('0x66')](_0x834e('0x67')),_0x4520fc=_0x5c3945):_0x4520fc=[_0x834e('0x67')+_0x5c3945];if('undefined'===typeof _0x4e466e||_0x834e('0x4e')!==_0x4e466e[_0x834e('0x11')]()&&_0x834e('0x68')!==_0x4e466e['toLowerCase']())if(_0x834e('0x4')!==typeof _0x4e466e&&_0x834e('0x2d')===_0x4e466e[_0x834e('0x11')]())try{console[_0x834e('0x2d')][_0x834e('0x69')](console,_0x4520fc);}catch(_0x585d02){try{console['info'](_0x4520fc[_0x834e('0xa')]('\x0a'));}catch(_0x40a872){}}else try{console['error'][_0x834e('0x69')](console,_0x4520fc);}catch(_0x509427){try{console[_0x834e('0x14')](_0x4520fc[_0x834e('0xa')]('\x0a'));}catch(_0x451a8e){}}else try{console['warn'][_0x834e('0x69')](console,_0x4520fc);}catch(_0x49e721){try{console['warn'](_0x4520fc['join']('\x0a'));}catch(_0x6735e6){}}}},_0x57d898={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0x834e('0x6a'),'buyQtt':_0x834e('0x6b'),'selectSkuMsg':_0x834e('0x6c'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x3b18d0,_0x2dad55,_0x3aa388){_0x1372dd(_0x834e('0x6d'))['is'](_0x834e('0x6e'))&&('success'===_0x2dad55?alert(_0x834e('0x6f')):(alert('Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.'),(_0x834e('0x18')===typeof parent?parent:document)[_0x834e('0x70')][_0x834e('0x71')]=_0x3aa388));},'isProductPage':function(){return _0x1372dd(_0x834e('0x6d'))['is'](_0x834e('0x72'));},'execDefaultAction':function(_0x116830){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x1372dd['QD_buyButton']=function(_0x56d0f8,_0xeb096d){function _0x2a854a(_0x4eff8d){_0x23b5d9[_0x834e('0x73')]?_0x4eff8d[_0x834e('0x19')](_0x834e('0x74'))||(_0x4eff8d[_0x834e('0x19')](_0x834e('0x74'),0x1),_0x4eff8d['on']('click.qd_bb_buy_sc',function(_0x29839d){if(!_0x23b5d9[_0x834e('0x75')]())return!0x0;if(!0x0!==_0x35bb19['clickBuySmartCheckout']['call'](this))return _0x29839d['preventDefault'](),!0x1;})):alert(_0x834e('0x76'));}function _0x1f3e26(_0x4f716d){_0x4f716d=_0x4f716d||_0x1372dd(_0x23b5d9[_0x834e('0x77')]);_0x4f716d[_0x834e('0x34')](function(){var _0x4f716d=_0x1372dd(this);_0x4f716d['is'](_0x834e('0x78'))||(_0x4f716d['addClass']('qd-sbb-on'),_0x4f716d['is'](_0x834e('0x79'))&&!_0x4f716d['is'](_0x834e('0x7a'))||_0x4f716d[_0x834e('0x19')](_0x834e('0x7b'))||(_0x4f716d['data'](_0x834e('0x7b'),0x1),_0x4f716d[_0x834e('0x7c')](_0x834e('0x7d'))[_0x834e('0x9')]||_0x4f716d[_0x834e('0x7e')](_0x834e('0x7f')),_0x4f716d['is'](_0x834e('0x80'))&&_0x23b5d9[_0x834e('0x81')]()&&_0x43a6bf[_0x834e('0x28')](_0x4f716d),_0x2a854a(_0x4f716d)));});_0x23b5d9[_0x834e('0x81')]()&&!_0x4f716d[_0x834e('0x9')]&&_0x1691d5(_0x834e('0x82')+_0x4f716d[_0x834e('0x83')]+'\x27.',_0x834e('0x2d'));}var _0x37ae42=_0x1372dd(_0x56d0f8);var _0x35bb19=this;window[_0x834e('0x84')]=window[_0x834e('0x84')]||{};window[_0x834e('0x36')]=window[_0x834e('0x36')]||{};_0x35bb19[_0x834e('0x85')]=function(_0xdedb54,_0x483815){_0x37ae42[_0x834e('0x49')](_0x834e('0x86'));_0x1372dd(_0x834e('0x6d'))[_0x834e('0x49')](_0x834e('0x87'));var _0x3bcdcd=_0x1372dd(_0x23b5d9[_0x834e('0x77')])[_0x834e('0x44')](_0x834e('0x88')+(_0xdedb54['attr']('href')||'---')+'\x27]')[_0x834e('0x30')](_0xdedb54);_0x3bcdcd['addClass'](_0x834e('0x89'));setTimeout(function(){_0x37ae42[_0x834e('0x4b')](_0x834e('0x8a'));_0x3bcdcd['removeClass'](_0x834e('0x89'));},_0x23b5d9[_0x834e('0x8b')]);window[_0x834e('0x84')][_0x834e('0x27')]=void 0x0;if(_0x834e('0x4')!==typeof _0xeb096d&&_0x834e('0xb')===typeof _0xeb096d['getCartInfoByUrl'])return _0x23b5d9[_0x834e('0x73')]||(_0x1691d5(_0x834e('0x8c')),_0xeb096d[_0x834e('0x8d')]()),window[_0x834e('0x57')][_0x834e('0x27')]=void 0x0,_0xeb096d['getCartInfoByUrl'](function(_0x4ebeba){window['_Quatro_Digital_dropDown']['getOrderForm']=_0x4ebeba;_0x1372dd['fn'][_0x834e('0x25')](!0x0,void 0x0,!0x0);},{'lastSku':_0x483815});window[_0x834e('0x84')]['allowUpdate']=!0x0;_0x1372dd['fn'][_0x834e('0x25')](!0x0);};(function(){if(_0x23b5d9[_0x834e('0x73')]&&_0x23b5d9['autoWatchBuyButton']){var _0x296629=_0x1372dd(_0x834e('0x79'));_0x296629[_0x834e('0x9')]&&_0x1f3e26(_0x296629);}}());var _0x43a6bf=function(){var _0x1d1075=_0x1372dd(this);_0x834e('0x4')!==typeof _0x1d1075['data']('buyButton')?(_0x1d1075[_0x834e('0x8e')](_0x834e('0x8f')),_0x2a854a(_0x1d1075)):(_0x1d1075[_0x834e('0x62')]('mouseenter.qd_bb_buy_sc',function(_0x34fb30){_0x1d1075[_0x834e('0x8e')]('click');_0x2a854a(_0x1d1075);_0x1372dd(this)[_0x834e('0x8e')](_0x34fb30);}),_0x1372dd(window)[_0x834e('0x90')](function(){_0x1d1075[_0x834e('0x8e')](_0x834e('0x8f'));_0x2a854a(_0x1d1075);_0x1d1075['unbind'](_0x834e('0x91'));}));};_0x35bb19['clickBuySmartCheckout']=function(){var _0x59d354=_0x1372dd(this),_0x56d0f8=_0x59d354[_0x834e('0x92')](_0x834e('0x71'))||'';if(-0x1<_0x56d0f8[_0x834e('0x93')](_0x23b5d9[_0x834e('0x94')]))return!0x0;_0x56d0f8=_0x56d0f8[_0x834e('0x2')](/redirect\=(false|true)/gi,'')['replace']('?','?redirect=false&')[_0x834e('0x2')](/\&\&/gi,'&');if(_0x23b5d9[_0x834e('0x95')](_0x59d354))return _0x59d354[_0x834e('0x92')](_0x834e('0x71'),_0x56d0f8[_0x834e('0x2')](_0x834e('0x96'),_0x834e('0x97'))),!0x0;_0x56d0f8=_0x56d0f8['replace'](/http.?:/i,'');_0xd49002[_0x834e('0x98')](function(_0xf25875){if(!_0x23b5d9['buyIfQuantityZeroed']&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0x834e('0x99')](_0x56d0f8))return _0xf25875();var _0x6a507a=function(_0xa0af07,_0x2a3ca4){var _0x1f3e26=_0x56d0f8[_0x834e('0x9a')](/sku\=([0-9]+)/gi),_0x37c5f3=[];if(_0x834e('0x18')===typeof _0x1f3e26&&null!==_0x1f3e26)for(var _0x14e794=_0x1f3e26[_0x834e('0x9')]-0x1;0x0<=_0x14e794;_0x14e794--){var _0x496709=parseInt(_0x1f3e26[_0x14e794][_0x834e('0x2')](/sku\=/gi,''));isNaN(_0x496709)||_0x37c5f3[_0x834e('0x9b')](_0x496709);}_0x23b5d9[_0x834e('0x9c')]['call'](this,_0xa0af07,_0x2a3ca4,_0x56d0f8);_0x35bb19[_0x834e('0x9d')][_0x834e('0x28')](this,_0xa0af07,_0x2a3ca4,_0x56d0f8,_0x37c5f3);_0x35bb19['prodAdd'](_0x59d354,_0x56d0f8[_0x834e('0x8')]('ku=')[_0x834e('0x9e')]()['split']('&')[_0x834e('0x9f')]());'function'===typeof _0x23b5d9[_0x834e('0xa0')]&&_0x23b5d9[_0x834e('0xa0')][_0x834e('0x28')](this);_0x1372dd(window)[_0x834e('0x5d')]('productAddedToCart');_0x1372dd(window)[_0x834e('0x5d')](_0x834e('0xa1'));};_0x23b5d9[_0x834e('0xa2')]?(_0x6a507a(null,_0x834e('0xa3')),_0xf25875()):_0x1372dd[_0x834e('0xa4')]({'url':_0x56d0f8,'complete':_0x6a507a})[_0x834e('0x20')](function(){_0xf25875();});});};_0x35bb19[_0x834e('0x9d')]=function(_0x7dbe25,_0x2aa430,_0x214c73,_0x1c00d9){try{_0x834e('0xa3')===_0x2aa430&&_0x834e('0x18')===typeof window[_0x834e('0xa5')]&&_0x834e('0xb')===typeof window[_0x834e('0xa5')][_0x834e('0xa6')]&&window['parent']['_QuatroDigital_prodBuyCallback'](_0x7dbe25,_0x2aa430,_0x214c73,_0x1c00d9);}catch(_0x2df814){_0x1691d5(_0x834e('0xa7'));}};_0x1f3e26();_0x834e('0xb')===typeof _0x23b5d9[_0x834e('0x41')]?_0x23b5d9[_0x834e('0x41')][_0x834e('0x28')](this):_0x1691d5(_0x834e('0xa8'));};var _0x40fd40=_0x1372dd[_0x834e('0x65')]();_0x1372dd['fn'][_0x834e('0xa9')]=function(_0x25f1f9,_0x32645e){var _0x29bfd7=_0x1372dd(this);_0x834e('0x4')!==typeof _0x32645e||'object'!==typeof _0x25f1f9||_0x25f1f9 instanceof _0x1372dd||(_0x32645e=_0x25f1f9,_0x25f1f9=void 0x0);_0x23b5d9=_0x1372dd[_0x834e('0x16')]({},_0x57d898,_0x32645e);var _0x1beab1;_0x40fd40[_0x834e('0x30')](function(){_0x29bfd7['children'](_0x834e('0xaa'))[_0x834e('0x9')]||_0x29bfd7['prepend']('<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>');_0x1beab1=new _0x1372dd[(_0x834e('0xa9'))](_0x29bfd7,_0x25f1f9);});_0x40fd40[_0x834e('0x42')]();_0x1372dd(window)['on']('QuatroDigital.qd_bb_prod_add',function(_0x2fcfdb,_0x132edd,_0x4643d9){_0x1beab1[_0x834e('0x85')](_0x132edd,_0x4643d9);});return _0x1372dd[_0x834e('0x16')](_0x29bfd7,_0x1beab1);};var _0x5e6fff=0x0;_0x1372dd(document)['ajaxSend'](function(_0x453e58,_0x5dd31e,_0x5922cf){-0x1<_0x5922cf['url'][_0x834e('0x11')]()[_0x834e('0x93')]('/checkout/cart/add')&&(_0x5e6fff=(_0x5922cf[_0x834e('0xab')][_0x834e('0x9a')](/sku\=([0-9]+)/i)||[''])[_0x834e('0x9e')]());});_0x1372dd(window)[_0x834e('0x62')]('productAddedToCart.qdSbbVtex',function(){_0x1372dd(window)[_0x834e('0x5d')](_0x834e('0xac'),[new _0x1372dd(),_0x5e6fff]);});_0x1372dd(document)[_0x834e('0xad')](function(){_0x40fd40['fire']();});}catch(_0x3d8af7){'undefined'!==typeof console&&_0x834e('0xb')===typeof console['error']&&console[_0x834e('0x14')](_0x834e('0x63'),_0x3d8af7);}}(this));function qd_number_format(_0x510023,_0xce4f45,_0xfaaa58,_0x41e7a8){_0x510023=(_0x510023+'')[_0x834e('0x2')](/[^0-9+\-Ee.]/g,'');_0x510023=isFinite(+_0x510023)?+_0x510023:0x0;_0xce4f45=isFinite(+_0xce4f45)?Math[_0x834e('0x3')](_0xce4f45):0x0;_0x41e7a8=_0x834e('0x4')===typeof _0x41e7a8?',':_0x41e7a8;_0xfaaa58='undefined'===typeof _0xfaaa58?'.':_0xfaaa58;var _0x3ab36e='',_0x3ab36e=function(_0x29dce9,_0x306db2){var _0x1b8e67=Math['pow'](0xa,_0x306db2);return''+(Math[_0x834e('0x6')](_0x29dce9*_0x1b8e67)/_0x1b8e67)['toFixed'](_0x306db2);},_0x3ab36e=(_0xce4f45?_0x3ab36e(_0x510023,_0xce4f45):''+Math['round'](_0x510023))[_0x834e('0x8')]('.');0x3<_0x3ab36e[0x0]['length']&&(_0x3ab36e[0x0]=_0x3ab36e[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x41e7a8));(_0x3ab36e[0x1]||'')[_0x834e('0x9')]<_0xce4f45&&(_0x3ab36e[0x1]=_0x3ab36e[0x1]||'',_0x3ab36e[0x1]+=Array(_0xce4f45-_0x3ab36e[0x1][_0x834e('0x9')]+0x1)[_0x834e('0xa')]('0'));return _0x3ab36e[_0x834e('0xa')](_0xfaaa58);}(function(){try{window[_0x834e('0x36')]=window[_0x834e('0x36')]||{},window[_0x834e('0x36')][_0x834e('0x41')]=window[_0x834e('0x36')][_0x834e('0x41')]||$[_0x834e('0x65')]();}catch(_0x7cec1d){_0x834e('0x4')!==typeof console&&_0x834e('0xb')===typeof console['error']&&console[_0x834e('0x14')]('Oooops!\x20',_0x7cec1d[_0x834e('0x24')]);}}());(function(_0x373fe7){try{var _0x284412=jQuery,_0x2cdbe0=function(_0x5ab11f,_0x5f558a){if(_0x834e('0x18')===typeof console&&_0x834e('0x4')!==typeof console['error']&&_0x834e('0x4')!==typeof console[_0x834e('0x2d')]&&'undefined'!==typeof console[_0x834e('0x2b')]){var _0x38d955;_0x834e('0x18')===typeof _0x5ab11f?(_0x5ab11f[_0x834e('0x66')]('[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'),_0x38d955=_0x5ab11f):_0x38d955=['[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'+_0x5ab11f];if('undefined'===typeof _0x5f558a||'alerta'!==_0x5f558a[_0x834e('0x11')]()&&_0x834e('0x68')!==_0x5f558a['toLowerCase']())if(_0x834e('0x4')!==typeof _0x5f558a&&'info'===_0x5f558a[_0x834e('0x11')]())try{console[_0x834e('0x2d')][_0x834e('0x69')](console,_0x38d955);}catch(_0x307539){try{console[_0x834e('0x2d')](_0x38d955[_0x834e('0xa')]('\x0a'));}catch(_0x3c775f){}}else try{console['error'][_0x834e('0x69')](console,_0x38d955);}catch(_0x20d52f){try{console['error'](_0x38d955[_0x834e('0xa')]('\x0a'));}catch(_0x4551cb){}}else try{console['warn']['apply'](console,_0x38d955);}catch(_0x4f2ede){try{console[_0x834e('0x2b')](_0x38d955[_0x834e('0xa')]('\x0a'));}catch(_0x29105a){}}}};window['_QuatroDigital_DropDown']=window[_0x834e('0x57')]||{};window[_0x834e('0x57')][_0x834e('0xae')]=!0x0;_0x284412[_0x834e('0xaf')]=function(){};_0x284412['fn'][_0x834e('0xaf')]=function(){return{'fn':new _0x284412()};};var _0xad7b72=function(_0x19cb0b){var _0x13af70={'t':_0x834e('0xb0')};return function(_0x102640){var _0x48b6c4=function(_0x5d6b66){return _0x5d6b66;};var _0x117e8f=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x102640=_0x102640['d'+_0x117e8f[0x10]+'c'+_0x117e8f[0x11]+'m'+_0x48b6c4(_0x117e8f[0x1])+'n'+_0x117e8f[0xd]]['l'+_0x117e8f[0x12]+'c'+_0x117e8f[0x0]+'ti'+_0x48b6c4('o')+'n'];var _0x290a7b=function(_0xbc7704){return escape(encodeURIComponent(_0xbc7704[_0x834e('0x2')](/\./g,'¨')[_0x834e('0x2')](/[a-zA-Z]/g,function(_0xd22e8f){return String[_0x834e('0xb1')](('Z'>=_0xd22e8f?0x5a:0x7a)>=(_0xd22e8f=_0xd22e8f[_0x834e('0xb2')](0x0)+0xd)?_0xd22e8f:_0xd22e8f-0x1a);})));};var _0x373fe7=_0x290a7b(_0x102640[[_0x117e8f[0x9],_0x48b6c4('o'),_0x117e8f[0xc],_0x117e8f[_0x48b6c4(0xd)]][_0x834e('0xa')]('')]);_0x290a7b=_0x290a7b((window[['js',_0x48b6c4('no'),'m',_0x117e8f[0x1],_0x117e8f[0x4][_0x834e('0xb3')](),_0x834e('0xb4')][_0x834e('0xa')]('')]||'---')+['.v',_0x117e8f[0xd],'e',_0x48b6c4('x'),'co',_0x48b6c4('mm'),_0x834e('0xb5'),_0x117e8f[0x1],'.c',_0x48b6c4('o'),'m.',_0x117e8f[0x13],'r'][_0x834e('0xa')](''));for(var _0x3f5b2e in _0x13af70){if(_0x290a7b===_0x3f5b2e+_0x13af70[_0x3f5b2e]||_0x373fe7===_0x3f5b2e+_0x13af70[_0x3f5b2e]){var _0xdd8f61='tr'+_0x117e8f[0x11]+'e';break;}_0xdd8f61='f'+_0x117e8f[0x0]+'ls'+_0x48b6c4(_0x117e8f[0x1])+'';}_0x48b6c4=!0x1;-0x1<_0x102640[[_0x117e8f[0xc],'e',_0x117e8f[0x0],'rc',_0x117e8f[0x9]]['join']('')]['indexOf']('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x48b6c4=!0x0);return[_0xdd8f61,_0x48b6c4];}(_0x19cb0b);}(window);if(!eval(_0xad7b72[0x0]))return _0xad7b72[0x1]?_0x2cdbe0(_0x834e('0xb6')):!0x1;_0x284412[_0x834e('0xaf')]=function(_0x42fbfe,_0x23d7e6){var _0x181ecd=_0x284412(_0x42fbfe);if(!_0x181ecd[_0x834e('0x9')])return _0x181ecd;var _0x2a1f87=_0x284412[_0x834e('0x16')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':'Finalizar\x20Compra','cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':'Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','continueShopping':_0x834e('0xb7'),'shippingForm':_0x834e('0xb8')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x37defd){return _0x37defd[_0x834e('0xb9')]||_0x37defd[_0x834e('0xba')];},'callback':function(){},'callbackProductsList':function(){}},_0x23d7e6);_0x284412('');var _0x386e10=this;if(_0x2a1f87[_0x834e('0x56')]){var _0x29ef2f=!0x1;_0x834e('0x4')===typeof window['vtexjs']&&(_0x2cdbe0('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN'),_0x284412['ajax']({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':!0x1,'dataType':_0x834e('0xbb'),'error':function(){_0x2cdbe0(_0x834e('0xbc'));_0x29ef2f=!0x0;}}));if(_0x29ef2f)return _0x2cdbe0(_0x834e('0xbd'));}if(_0x834e('0x18')===typeof window[_0x834e('0x58')]&&_0x834e('0x4')!==typeof window[_0x834e('0x58')][_0x834e('0x26')])var _0x86d08c=window[_0x834e('0x58')][_0x834e('0x26')];else if(_0x834e('0x18')===typeof vtex&&_0x834e('0x18')===typeof vtex[_0x834e('0x26')]&&_0x834e('0x4')!==typeof vtex[_0x834e('0x26')]['SDK'])_0x86d08c=new vtex[(_0x834e('0x26'))]['SDK']();else return _0x2cdbe0(_0x834e('0xbe'));_0x386e10[_0x834e('0xbf')]=_0x834e('0xc0');var _0x587f9a=function(_0x1695c5){_0x284412(this)[_0x834e('0x7e')](_0x1695c5);_0x1695c5['find']('.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose')[_0x834e('0x30')](_0x284412(_0x834e('0xc1')))['on'](_0x834e('0xc2'),function(){_0x181ecd[_0x834e('0x4b')](_0x834e('0xc3'));_0x284412(document[_0x834e('0x6d')])[_0x834e('0x4b')](_0x834e('0x87'));});_0x284412(document)['off'](_0x834e('0xc4'))['on'](_0x834e('0xc4'),function(_0x375e40){0x1b==_0x375e40[_0x834e('0xc5')]&&(_0x181ecd[_0x834e('0x4b')](_0x834e('0xc3')),_0x284412(document[_0x834e('0x6d')])['removeClass'](_0x834e('0x87')));});var _0x59e298=_0x1695c5['find'](_0x834e('0xc6'));_0x1695c5[_0x834e('0x52')]('.qd-ddc-scrollUp')['on'](_0x834e('0xc7'),function(){_0x386e10[_0x834e('0xc8')]('-',void 0x0,void 0x0,_0x59e298);return!0x1;});_0x1695c5['find'](_0x834e('0xc9'))['on'](_0x834e('0xca'),function(){_0x386e10['scrollCart'](void 0x0,void 0x0,void 0x0,_0x59e298);return!0x1;});_0x1695c5['find'](_0x834e('0xcb'))[_0x834e('0xcc')]('')['on']('keyup.qd_ddc_cep',function(){_0x386e10['shippingCalculate'](_0x284412(this));});if(_0x2a1f87[_0x834e('0xcd')]){var _0x23d7e6=0x0;_0x284412(this)['on']('mouseenter.qd_ddc_hover',function(){var _0x1695c5=function(){window['_QuatroDigital_DropDown']['allowUpdate']&&(_0x386e10[_0x834e('0x8d')](),window['_QuatroDigital_DropDown'][_0x834e('0xae')]=!0x1,_0x284412['fn']['simpleCart'](!0x0),_0x386e10[_0x834e('0xce')]());};_0x23d7e6=setInterval(function(){_0x1695c5();},0x258);_0x1695c5();});_0x284412(this)['on'](_0x834e('0xcf'),function(){clearInterval(_0x23d7e6);});}};var _0x1f7163=function(_0x3d2569){_0x3d2569=_0x284412(_0x3d2569);_0x2a1f87['texts'][_0x834e('0x54')]=_0x2a1f87[_0x834e('0xd0')][_0x834e('0x54')][_0x834e('0x2')](_0x834e('0xd1'),_0x834e('0xd2'));_0x2a1f87[_0x834e('0xd0')][_0x834e('0x54')]=_0x2a1f87[_0x834e('0xd0')][_0x834e('0x54')]['replace'](_0x834e('0xd3'),'<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>');_0x2a1f87[_0x834e('0xd0')][_0x834e('0x54')]=_0x2a1f87[_0x834e('0xd0')][_0x834e('0x54')][_0x834e('0x2')]('#shipping',_0x834e('0xd4'));_0x2a1f87['texts']['cartTotal']=_0x2a1f87[_0x834e('0xd0')][_0x834e('0x54')][_0x834e('0x2')]('#total',_0x834e('0xd5'));_0x3d2569[_0x834e('0x52')](_0x834e('0xd6'))[_0x834e('0x4f')](_0x2a1f87[_0x834e('0xd0')][_0x834e('0xd7')]);_0x3d2569[_0x834e('0x52')](_0x834e('0xd8'))[_0x834e('0x4f')](_0x2a1f87[_0x834e('0xd0')][_0x834e('0xd9')]);_0x3d2569['find'](_0x834e('0xda'))[_0x834e('0x4f')](_0x2a1f87[_0x834e('0xd0')][_0x834e('0xdb')]);_0x3d2569[_0x834e('0x52')](_0x834e('0xdc'))['html'](_0x2a1f87[_0x834e('0xd0')][_0x834e('0x54')]);_0x3d2569[_0x834e('0x52')](_0x834e('0xdd'))[_0x834e('0x4f')](_0x2a1f87[_0x834e('0xd0')][_0x834e('0xde')]);_0x3d2569[_0x834e('0x52')](_0x834e('0xdf'))[_0x834e('0x4f')](_0x2a1f87['texts']['emptyCart']);return _0x3d2569;}(this[_0x834e('0xbf')]);var _0x4b81a8=0x0;_0x181ecd[_0x834e('0x34')](function(){0x0<_0x4b81a8?_0x587f9a[_0x834e('0x28')](this,_0x1f7163[_0x834e('0xe0')]()):_0x587f9a[_0x834e('0x28')](this,_0x1f7163);_0x4b81a8++;});window[_0x834e('0x36')][_0x834e('0x41')]['add'](function(){_0x284412(_0x834e('0xe1'))['html'](window['_QuatroDigital_CartData']['total']||'--');_0x284412(_0x834e('0xe2'))[_0x834e('0x4f')](window['_QuatroDigital_CartData']['qtt']||'0');_0x284412('.qd-ddc-infoTotalShipping')[_0x834e('0x4f')](window[_0x834e('0x36')][_0x834e('0xe3')]||'--');_0x284412('.qd-ddc-infoAllTotal')[_0x834e('0x4f')](window[_0x834e('0x36')][_0x834e('0x3c')]||'--');});var _0xf24fdd=function(_0xb9635a,_0x3c1a19){if('undefined'===typeof _0xb9635a['items'])return _0x2cdbe0('Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição');_0x386e10['renderProductsList'][_0x834e('0x28')](this,_0x3c1a19);};_0x386e10[_0x834e('0x8d')]=function(_0x15885c,_0xfa95ad){_0x834e('0x4')!=typeof _0xfa95ad?window[_0x834e('0x57')][_0x834e('0xe4')]=_0xfa95ad:window[_0x834e('0x57')][_0x834e('0xe4')]&&(_0xfa95ad=window[_0x834e('0x57')][_0x834e('0xe4')]);setTimeout(function(){window[_0x834e('0x57')][_0x834e('0xe4')]=void 0x0;},_0x2a1f87[_0x834e('0x8b')]);_0x284412(_0x834e('0xe5'))['removeClass']('qd-ddc-prodLoaded');if(_0x2a1f87[_0x834e('0x56')]){var _0x23d7e6=function(_0x44f3c6){window['_QuatroDigital_DropDown'][_0x834e('0x27')]=_0x44f3c6;_0xf24fdd(_0x44f3c6,_0xfa95ad);_0x834e('0x4')!==typeof window[_0x834e('0xe6')]&&_0x834e('0xb')===typeof window[_0x834e('0xe6')][_0x834e('0xe7')]&&window[_0x834e('0xe6')][_0x834e('0xe7')][_0x834e('0x28')](this);_0x284412('.qd-ddc-wrapper')[_0x834e('0x49')](_0x834e('0xe8'));};_0x834e('0x4')!==typeof window[_0x834e('0x57')]['getOrderForm']?(_0x23d7e6(window[_0x834e('0x57')][_0x834e('0x27')]),_0x834e('0xb')===typeof _0x15885c&&_0x15885c(window[_0x834e('0x57')][_0x834e('0x27')])):_0x284412[_0x834e('0x5a')]([_0x834e('0x3e'),_0x834e('0x39'),_0x834e('0xe9')],{'done':function(_0x57ed6b){_0x23d7e6[_0x834e('0x28')](this,_0x57ed6b);'function'===typeof _0x15885c&&_0x15885c(_0x57ed6b);},'fail':function(_0x43d327){_0x2cdbe0(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0x43d327]);}});}else alert(_0x834e('0xea'));};_0x386e10[_0x834e('0xce')]=function(){var _0x3e4d6d=_0x284412(_0x834e('0xe5'));_0x3e4d6d[_0x834e('0x52')]('.qd-ddc-prodRow')[_0x834e('0x9')]?_0x3e4d6d[_0x834e('0x4b')]('qd-ddc-noItems'):_0x3e4d6d['addClass'](_0x834e('0xeb'));};_0x386e10['renderProductsList']=function(_0x4e6a75){var _0x23d7e6=_0x284412(_0x834e('0xec'));_0x23d7e6[_0x834e('0xed')]();_0x23d7e6[_0x834e('0x34')](function(){var _0x23d7e6=_0x284412(this),_0x42fbfe,_0x1e62da,_0x2759d8=_0x284412(''),_0x5ed1d9;for(_0x5ed1d9 in window[_0x834e('0x57')][_0x834e('0x27')]['items'])if('object'===typeof window[_0x834e('0x57')][_0x834e('0x27')]['items'][_0x5ed1d9]){var _0x5920f3=window[_0x834e('0x57')][_0x834e('0x27')][_0x834e('0x3e')][_0x5ed1d9];var _0x599664=_0x5920f3[_0x834e('0xee')][_0x834e('0x2')](/^\/|\/$/g,'')[_0x834e('0x8')]('/');var _0x50df03=_0x284412(_0x834e('0xef'));_0x50df03['attr']({'data-sku':_0x5920f3['id'],'data-sku-index':_0x5ed1d9,'data-qd-departament':_0x599664[0x0],'data-qd-category':_0x599664[_0x599664[_0x834e('0x9')]-0x1]});_0x50df03[_0x834e('0x49')](_0x834e('0xf0')+_0x5920f3[_0x834e('0xf1')]);_0x50df03[_0x834e('0x52')]('.qd-ddc-prodName')[_0x834e('0x7e')](_0x2a1f87[_0x834e('0xb9')](_0x5920f3));_0x50df03[_0x834e('0x52')](_0x834e('0xf2'))[_0x834e('0x7e')](isNaN(_0x5920f3['sellingPrice'])?_0x5920f3['sellingPrice']:0x0==_0x5920f3[_0x834e('0xf3')]?_0x834e('0xf4'):(_0x284412(_0x834e('0x33'))['attr'](_0x834e('0xf5'))||'R$')+'\x20'+qd_number_format(_0x5920f3[_0x834e('0xf3')]/0x64,0x2,',','.'));_0x50df03[_0x834e('0x52')](_0x834e('0xf6'))['attr']({'data-sku':_0x5920f3['id'],'data-sku-index':_0x5ed1d9})[_0x834e('0xcc')](_0x5920f3[_0x834e('0x40')]);_0x50df03['find'](_0x834e('0xf7'))[_0x834e('0x92')]({'data-sku':_0x5920f3['id'],'data-sku-index':_0x5ed1d9});_0x386e10[_0x834e('0xf8')](_0x5920f3['id'],_0x50df03[_0x834e('0x52')]('.qd-ddc-image'),_0x5920f3[_0x834e('0xf9')]);_0x50df03['find'](_0x834e('0xfa'))[_0x834e('0x92')]({'data-sku':_0x5920f3['id'],'data-sku-index':_0x5ed1d9});_0x50df03[_0x834e('0xfb')](_0x23d7e6);_0x2759d8=_0x2759d8[_0x834e('0x30')](_0x50df03);}try{var _0x3698cf=_0x23d7e6[_0x834e('0x0')]('.qd-ddc-wrapper')['find'](_0x834e('0xcb'));_0x3698cf[_0x834e('0x9')]&&''==_0x3698cf['val']()&&window[_0x834e('0x57')]['getOrderForm'][_0x834e('0xe9')][_0x834e('0xfc')]&&_0x3698cf[_0x834e('0xcc')](window[_0x834e('0x57')][_0x834e('0x27')][_0x834e('0xe9')][_0x834e('0xfc')]['postalCode']);}catch(_0x122b03){_0x2cdbe0(_0x834e('0xfd')+_0x122b03[_0x834e('0x24')],_0x834e('0x68'));}_0x386e10[_0x834e('0xfe')](_0x23d7e6);_0x386e10['cartIsEmpty']();_0x4e6a75&&_0x4e6a75[_0x834e('0xff')]&&function(){_0x1e62da=_0x2759d8[_0x834e('0x44')](_0x834e('0x100')+_0x4e6a75['lastSku']+'\x27]');_0x1e62da['length']&&(_0x42fbfe=0x0,_0x2759d8['each'](function(){var _0x4e6a75=_0x284412(this);if(_0x4e6a75['is'](_0x1e62da))return!0x1;_0x42fbfe+=_0x4e6a75[_0x834e('0x101')]();}),_0x386e10[_0x834e('0xc8')](void 0x0,void 0x0,_0x42fbfe,_0x23d7e6[_0x834e('0x30')](_0x23d7e6[_0x834e('0xa5')]())),_0x2759d8[_0x834e('0x4b')](_0x834e('0x102')),function(_0x1299ea){_0x1299ea[_0x834e('0x49')](_0x834e('0x103'));_0x1299ea[_0x834e('0x49')]('qd-ddc-lastAddedFixed');setTimeout(function(){_0x1299ea[_0x834e('0x4b')](_0x834e('0x103'));},_0x2a1f87[_0x834e('0x8b')]);}(_0x1e62da));}();});(function(){_QuatroDigital_DropDown[_0x834e('0x27')][_0x834e('0x3e')][_0x834e('0x9')]?(_0x284412(_0x834e('0x6d'))[_0x834e('0x4b')]('qd-ddc-cart-empty')[_0x834e('0x49')](_0x834e('0x104')),setTimeout(function(){_0x284412('body')[_0x834e('0x4b')](_0x834e('0x105'));},_0x2a1f87[_0x834e('0x8b')])):_0x284412(_0x834e('0x6d'))['removeClass']('qd-ddc-cart-rendered')[_0x834e('0x49')]('qd-ddc-cart-empty');}());_0x834e('0xb')===typeof _0x2a1f87[_0x834e('0x106')]?_0x2a1f87[_0x834e('0x106')][_0x834e('0x28')](this):_0x2cdbe0(_0x834e('0x107'));};_0x386e10['insertProdImg']=function(_0x2f6633,_0x5a4fbf,_0x4ae94e){function _0x3d8b08(){_0x5a4fbf[_0x834e('0x4b')](_0x834e('0x108'))[_0x834e('0x90')](function(){_0x284412(this)[_0x834e('0x49')](_0x834e('0x108'));})['attr'](_0x834e('0x109'),_0x4ae94e);}_0x4ae94e?_0x3d8b08():isNaN(_0x2f6633)?_0x2cdbe0(_0x834e('0x10a'),'alerta'):alert(_0x834e('0x10b'));};_0x386e10[_0x834e('0xfe')]=function(_0x4b070a){var _0x2d4cd7=function(_0x25aa03,_0x47a239){var _0x23d7e6=_0x284412(_0x25aa03);var _0x42cb45=_0x23d7e6[_0x834e('0x92')](_0x834e('0x10c'));var _0x42fbfe=_0x23d7e6[_0x834e('0x92')](_0x834e('0x10d'));if(_0x42cb45){var _0x2808fb=parseInt(_0x23d7e6[_0x834e('0xcc')]())||0x1;_0x386e10[_0x834e('0x10e')]([_0x42cb45,_0x42fbfe],_0x2808fb,_0x2808fb+0x1,function(_0x5944e1){_0x23d7e6[_0x834e('0xcc')](_0x5944e1);_0x834e('0xb')===typeof _0x47a239&&_0x47a239();});}};var _0x23d7e6=function(_0x10f176,_0x371767){var _0x23d7e6=_0x284412(_0x10f176);var _0x2d61c1=_0x23d7e6[_0x834e('0x92')](_0x834e('0x10c'));var _0x42fbfe=_0x23d7e6[_0x834e('0x92')](_0x834e('0x10d'));if(_0x2d61c1){var _0x5af6fc=parseInt(_0x23d7e6[_0x834e('0xcc')]())||0x2;_0x386e10[_0x834e('0x10e')]([_0x2d61c1,_0x42fbfe],_0x5af6fc,_0x5af6fc-0x1,function(_0x49be08){_0x23d7e6['val'](_0x49be08);'function'===typeof _0x371767&&_0x371767();});}};var _0x39afdc=function(_0x305d77,_0x3b74c0){var _0x23d7e6=_0x284412(_0x305d77);var _0x3503bb=_0x23d7e6[_0x834e('0x92')](_0x834e('0x10c'));var _0x42fbfe=_0x23d7e6['attr']('data-sku-index');if(_0x3503bb){var _0x47947b=parseInt(_0x23d7e6[_0x834e('0xcc')]())||0x1;_0x386e10[_0x834e('0x10e')]([_0x3503bb,_0x42fbfe],0x1,_0x47947b,function(_0x230b09){_0x23d7e6['val'](_0x230b09);'function'===typeof _0x3b74c0&&_0x3b74c0();});}};var _0x42fbfe=_0x4b070a[_0x834e('0x52')]('.qd-ddc-prodQttWrapper:not(.qd_on)');_0x42fbfe['addClass'](_0x834e('0x10f'))[_0x834e('0x34')](function(){var _0x4b070a=_0x284412(this);_0x4b070a[_0x834e('0x52')](_0x834e('0x110'))['on'](_0x834e('0x111'),function(_0x2905ba){_0x2905ba['preventDefault']();_0x42fbfe[_0x834e('0x49')](_0x834e('0x112'));_0x2d4cd7(_0x4b070a[_0x834e('0x52')](_0x834e('0xf6')),function(){_0x42fbfe[_0x834e('0x4b')]('qd-loading');});});_0x4b070a[_0x834e('0x52')]('.qd-ddc-quantityMinus')['on'](_0x834e('0x113'),function(_0x13cc01){_0x13cc01[_0x834e('0x114')]();_0x42fbfe['addClass']('qd-loading');_0x23d7e6(_0x4b070a['find']('.qd-ddc-quantity'),function(){_0x42fbfe[_0x834e('0x4b')](_0x834e('0x112'));});});_0x4b070a['find']('.qd-ddc-quantity')['on'](_0x834e('0x115'),function(){_0x42fbfe[_0x834e('0x49')](_0x834e('0x112'));_0x39afdc(this,function(){_0x42fbfe['removeClass'](_0x834e('0x112'));});});_0x4b070a[_0x834e('0x52')](_0x834e('0xf6'))['on']('keyup.qd_ddc_change',function(_0x2e228f){0xd==_0x2e228f[_0x834e('0xc5')]&&(_0x42fbfe[_0x834e('0x49')](_0x834e('0x112')),_0x39afdc(this,function(){_0x42fbfe[_0x834e('0x4b')](_0x834e('0x112'));}));});});_0x4b070a[_0x834e('0x52')]('.qd-ddc-prodRow')[_0x834e('0x34')](function(){var _0x4b070a=_0x284412(this);_0x4b070a[_0x834e('0x52')]('.qd-ddc-remove')['on'](_0x834e('0x116'),function(){_0x4b070a[_0x834e('0x49')](_0x834e('0x112'));_0x386e10[_0x834e('0x117')](_0x284412(this),function(_0x2bbb1a){_0x2bbb1a?_0x4b070a[_0x834e('0x118')](!0x0)[_0x834e('0x119')](function(){_0x4b070a[_0x834e('0x11a')]();_0x386e10[_0x834e('0xce')]();}):_0x4b070a[_0x834e('0x4b')](_0x834e('0x112'));});return!0x1;});});};_0x386e10[_0x834e('0x11b')]=function(_0x4d19d4){var _0x487ff7=_0x4d19d4[_0x834e('0xcc')](),_0x487ff7=_0x487ff7[_0x834e('0x2')](/[^0-9\-]/g,''),_0x487ff7=_0x487ff7[_0x834e('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x834e('0x11c')),_0x487ff7=_0x487ff7[_0x834e('0x2')](/(.{9}).*/g,'$1');_0x4d19d4[_0x834e('0xcc')](_0x487ff7);0x9<=_0x487ff7[_0x834e('0x9')]&&(_0x4d19d4[_0x834e('0x19')]('qdDdcLastPostalCode')!=_0x487ff7&&_0x86d08c['calculateShipping']({'postalCode':_0x487ff7,'country':'BRA'})[_0x834e('0x1e')](function(_0x163312){window[_0x834e('0x57')][_0x834e('0x27')]=_0x163312;_0x386e10[_0x834e('0x8d')]();})[_0x834e('0x1f')](function(_0x3ab1bf){_0x2cdbe0([_0x834e('0x11d'),_0x3ab1bf]);updateCartData();}),_0x4d19d4['data']('qdDdcLastPostalCode',_0x487ff7));};_0x386e10[_0x834e('0x10e')]=function(_0x42e5ee,_0x54d41c,_0x491b10,_0x5ba04c){function _0x9c2b83(_0x56a626){_0x56a626=_0x834e('0x11e')!==typeof _0x56a626?!0x1:_0x56a626;_0x386e10[_0x834e('0x8d')]();window[_0x834e('0x57')]['allowUpdate']=!0x1;_0x386e10[_0x834e('0xce')]();_0x834e('0x4')!==typeof window[_0x834e('0xe6')]&&_0x834e('0xb')===typeof window[_0x834e('0xe6')][_0x834e('0xe7')]&&window[_0x834e('0xe6')]['exec'][_0x834e('0x28')](this);_0x834e('0xb')===typeof adminCart&&adminCart();_0x284412['fn'][_0x834e('0x25')](!0x0,void 0x0,_0x56a626);_0x834e('0xb')===typeof _0x5ba04c&&_0x5ba04c(_0x54d41c);}_0x491b10=_0x491b10||0x1;if(0x1>_0x491b10)return _0x54d41c;if(_0x2a1f87[_0x834e('0x56')]){if(_0x834e('0x4')===typeof window[_0x834e('0x57')]['getOrderForm']['items'][_0x42e5ee[0x1]])return _0x2cdbe0(_0x834e('0x11f')+_0x42e5ee[0x1]+']'),_0x54d41c;window['_QuatroDigital_DropDown']['getOrderForm'][_0x834e('0x3e')][_0x42e5ee[0x1]][_0x834e('0x40')]=_0x491b10;window['_QuatroDigital_DropDown'][_0x834e('0x27')]['items'][_0x42e5ee[0x1]]['index']=_0x42e5ee[0x1];_0x86d08c[_0x834e('0x120')]([window['_QuatroDigital_DropDown'][_0x834e('0x27')][_0x834e('0x3e')][_0x42e5ee[0x1]]],[_0x834e('0x3e'),_0x834e('0x39'),_0x834e('0xe9')])[_0x834e('0x1e')](function(_0x1a48f9){window[_0x834e('0x57')][_0x834e('0x27')]=_0x1a48f9;_0x9c2b83(!0x0);})['fail'](function(_0xf5bd9){_0x2cdbe0([_0x834e('0x121'),_0xf5bd9]);_0x9c2b83();});}else _0x2cdbe0(_0x834e('0x122'));};_0x386e10[_0x834e('0x117')]=function(_0x5ac260,_0x4b1178){function _0x46e533(_0x13a7e1){_0x13a7e1='boolean'!==typeof _0x13a7e1?!0x1:_0x13a7e1;_0x834e('0x4')!==typeof window['_QuatroDigital_AmountProduct']&&_0x834e('0xb')===typeof window[_0x834e('0xe6')][_0x834e('0xe7')]&&window[_0x834e('0xe6')][_0x834e('0xe7')][_0x834e('0x28')](this);'function'===typeof adminCart&&adminCart();_0x284412['fn']['simpleCart'](!0x0,void 0x0,_0x13a7e1);'function'===typeof _0x4b1178&&_0x4b1178(_0x42fbfe);}var _0x42fbfe=!0x1,_0x1d004f=_0x284412(_0x5ac260)[_0x834e('0x92')]('data-sku-index');if(_0x2a1f87['smartCheckout']){if(_0x834e('0x4')===typeof window[_0x834e('0x57')][_0x834e('0x27')][_0x834e('0x3e')][_0x1d004f])return _0x2cdbe0(_0x834e('0x11f')+_0x1d004f+']'),_0x42fbfe;window[_0x834e('0x57')][_0x834e('0x27')][_0x834e('0x3e')][_0x1d004f][_0x834e('0x123')]=_0x1d004f;_0x86d08c[_0x834e('0x124')]([window[_0x834e('0x57')]['getOrderForm'][_0x834e('0x3e')][_0x1d004f]],[_0x834e('0x3e'),'totalizers',_0x834e('0xe9')])[_0x834e('0x1e')](function(_0x112e5a){_0x42fbfe=!0x0;window[_0x834e('0x57')][_0x834e('0x27')]=_0x112e5a;_0xf24fdd(_0x112e5a);_0x46e533(!0x0);})[_0x834e('0x1f')](function(_0x262442){_0x2cdbe0([_0x834e('0x125'),_0x262442]);_0x46e533();});}else alert(_0x834e('0x126'));};_0x386e10[_0x834e('0xc8')]=function(_0x3b477a,_0x3692d3,_0x6921ba,_0x2f0787){_0x2f0787=_0x2f0787||_0x284412(_0x834e('0x127'));_0x3b477a=_0x3b477a||'+';_0x3692d3=_0x3692d3||0.9*_0x2f0787[_0x834e('0x128')]();_0x2f0787[_0x834e('0x118')](!0x0,!0x0)[_0x834e('0x129')]({'scrollTop':isNaN(_0x6921ba)?_0x3b477a+'='+_0x3692d3+'px':_0x6921ba});};_0x2a1f87[_0x834e('0xcd')]||(_0x386e10[_0x834e('0x8d')](),_0x284412['fn'][_0x834e('0x25')](!0x0));_0x284412(window)['on'](_0x834e('0x12a'),function(){try{window[_0x834e('0x57')]['getOrderForm']=void 0x0,_0x386e10[_0x834e('0x8d')]();}catch(_0x2469d2){_0x2cdbe0(_0x834e('0x12b')+_0x2469d2[_0x834e('0x24')],_0x834e('0x12c'));}});_0x834e('0xb')===typeof _0x2a1f87[_0x834e('0x41')]?_0x2a1f87[_0x834e('0x41')][_0x834e('0x28')](this):_0x2cdbe0(_0x834e('0xa8'));};_0x284412['fn'][_0x834e('0xaf')]=function(_0x336e5d){var _0x4f65d8=_0x284412(this);_0x4f65d8['fn']=new _0x284412[(_0x834e('0xaf'))](this,_0x336e5d);return _0x4f65d8;};}catch(_0x2a051d){'undefined'!==typeof console&&_0x834e('0xb')===typeof console[_0x834e('0x14')]&&console['error'](_0x834e('0x63'),_0x2a051d);}}(this));(function(_0x18b8c7){try{var _0x576ece=jQuery;window['_QuatroDigital_AmountProduct']=window['_QuatroDigital_AmountProduct']||{};window[_0x834e('0xe6')][_0x834e('0x3e')]={};window[_0x834e('0xe6')][_0x834e('0x12d')]=!0x1;window['_QuatroDigital_AmountProduct'][_0x834e('0x12e')]=!0x1;window[_0x834e('0xe6')][_0x834e('0x12f')]=!0x1;var _0x581052=function(){if(window[_0x834e('0xe6')][_0x834e('0x12d')]){var _0x276903=!0x1;var _0x18b8c7={};window[_0x834e('0xe6')][_0x834e('0x3e')]={};for(_0x241ed9 in window['_QuatroDigital_DropDown'][_0x834e('0x27')][_0x834e('0x3e')])if('object'===typeof window[_0x834e('0x57')][_0x834e('0x27')][_0x834e('0x3e')][_0x241ed9]){var _0x4b7a1f=window[_0x834e('0x57')]['getOrderForm']['items'][_0x241ed9];_0x834e('0x4')!==typeof _0x4b7a1f[_0x834e('0x130')]&&null!==_0x4b7a1f[_0x834e('0x130')]&&''!==_0x4b7a1f['productId']&&(window[_0x834e('0xe6')][_0x834e('0x3e')][_0x834e('0x131')+_0x4b7a1f[_0x834e('0x130')]]=window[_0x834e('0xe6')][_0x834e('0x3e')]['prod_'+_0x4b7a1f[_0x834e('0x130')]]||{},window[_0x834e('0xe6')][_0x834e('0x3e')][_0x834e('0x131')+_0x4b7a1f[_0x834e('0x130')]]['prodId']=_0x4b7a1f['productId'],_0x18b8c7[_0x834e('0x131')+_0x4b7a1f['productId']]||(window[_0x834e('0xe6')][_0x834e('0x3e')][_0x834e('0x131')+_0x4b7a1f[_0x834e('0x130')]][_0x834e('0x3f')]=0x0),window[_0x834e('0xe6')][_0x834e('0x3e')]['prod_'+_0x4b7a1f[_0x834e('0x130')]][_0x834e('0x3f')]+=_0x4b7a1f['quantity'],_0x276903=!0x0,_0x18b8c7[_0x834e('0x131')+_0x4b7a1f[_0x834e('0x130')]]=!0x0);}var _0x241ed9=_0x276903;}else _0x241ed9=void 0x0;window['_QuatroDigital_AmountProduct'][_0x834e('0x12d')]&&(_0x576ece('.qd-bap-wrapper')[_0x834e('0x11a')](),_0x576ece('.qd-bap-item-added')[_0x834e('0x4b')](_0x834e('0x132')));for(var _0x4c2701 in window[_0x834e('0xe6')]['items']){_0x4b7a1f=window[_0x834e('0xe6')][_0x834e('0x3e')][_0x4c2701];if(_0x834e('0x18')!==typeof _0x4b7a1f)return;_0x18b8c7=_0x576ece('input.qd-productId[value='+_0x4b7a1f['prodId']+']')[_0x834e('0x0')]('li');if(window[_0x834e('0xe6')][_0x834e('0x12d')]||!_0x18b8c7[_0x834e('0x52')](_0x834e('0x133'))[_0x834e('0x9')])_0x276903=_0x576ece(_0x834e('0x134')),_0x276903[_0x834e('0x52')](_0x834e('0x135'))[_0x834e('0x4f')](_0x4b7a1f[_0x834e('0x3f')]),_0x4b7a1f=_0x18b8c7[_0x834e('0x52')](_0x834e('0x136')),_0x4b7a1f[_0x834e('0x9')]?_0x4b7a1f[_0x834e('0x137')](_0x276903)[_0x834e('0x49')](_0x834e('0x132')):_0x18b8c7[_0x834e('0x137')](_0x276903);}_0x241ed9&&(window[_0x834e('0xe6')]['allowRecalculate']=!0x1);};window[_0x834e('0xe6')]['exec']=function(){window[_0x834e('0xe6')][_0x834e('0x12d')]=!0x0;_0x581052[_0x834e('0x28')](this);};_0x576ece(document)[_0x834e('0xad')](function(){_0x581052[_0x834e('0x28')](this);});}catch(_0x4fd77d){_0x834e('0x4')!==typeof console&&_0x834e('0xb')===typeof console[_0x834e('0x14')]&&console[_0x834e('0x14')]('Oooops!\x20',_0x4fd77d);}}(this));(function(){try{var _0x50bacd=jQuery,_0x19416b,_0x1050ed={'selector':_0x834e('0x138'),'dropDown':{},'buyButton':{}};_0x50bacd[_0x834e('0x139')]=function(_0x4bc72c){var _0x52f05d={};_0x19416b=_0x50bacd['extend'](!0x0,{},_0x1050ed,_0x4bc72c);_0x4bc72c=_0x50bacd(_0x19416b['selector'])[_0x834e('0xaf')](_0x19416b['dropDown']);_0x52f05d[_0x834e('0x77')]='undefined'!==typeof _0x19416b[_0x834e('0x13a')][_0x834e('0xcd')]&&!0x1===_0x19416b[_0x834e('0x13a')]['updateOnlyHover']?_0x50bacd(_0x19416b[_0x834e('0x83')])['QD_buyButton'](_0x4bc72c['fn'],_0x19416b[_0x834e('0x77')]):_0x50bacd(_0x19416b['selector'])[_0x834e('0xa9')](_0x19416b['buyButton']);_0x52f05d[_0x834e('0x13a')]=_0x4bc72c;return _0x52f05d;};_0x50bacd['fn'][_0x834e('0x13b')]=function(){'object'===typeof console&&'function'===typeof console['info']&&console['info'](_0x834e('0x13c'));};_0x50bacd[_0x834e('0x13b')]=_0x50bacd['fn']['smartCart'];}catch(_0xc18c1b){_0x834e('0x4')!==typeof console&&_0x834e('0xb')===typeof console['error']&&console['error']('Oooops!\x20',_0xc18c1b);}}());

/* Quatro Digital - Product Thumbs // Carlos Vinicius // Todos os direitos reservados. */
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs();a.trigger("QuatroDigital.pt_callback",[a])}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return a.length?$.extend({},a,new b(a)):a},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0x05de=['.qd-videoLink','body','.produto','object','undefined','alerta','toLowerCase','[Video\x20in\x20product]\x20','info','qdVideoInProduct','extend','start','td.value-field.Videos:first','http','ul.thumbs','videoFieldSelector','text','replace','split','indexOf','push','shift','youtu.be','be/','pop','<div\x20class=\x22qd-playerWrapper\x22></div>','prependTo','#include','wrap','<div\x20class=\x22qd-playerContainer\x22></div>','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','toUpperCase','ite','---','join','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','youtube','<iframe\x20src=\x22','urlProtocol','?wmode=transparent&rel=0&enablejsapi=1\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>','data','fadeTo','addClass','qdpv-video-on','add','animate','height','a:not(\x27.qd-videoLink\x27)','bind','stop','hide','removeAttr','removeClass','find','length','call','string','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27','\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','.ON','controlVideo','.qd-playerWrapper\x20iframe','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','attr','rel','a:not(.qd-videoLink)','click','insertThumbsIn','appendTo','trigger','QuatroDigital.pv_video_added','ImageControl'];(function(_0x26462c,_0xd20a35){var _0x509a42=function(_0x1b22c9){while(--_0x1b22c9){_0x26462c['push'](_0x26462c['shift']());}};_0x509a42(++_0xd20a35);}(_0x05de,0x135));var _0xe05d=function(_0x14add3,_0x13ce8d){_0x14add3=_0x14add3-0x0;var _0x4a174f=_0x05de[_0x14add3];return _0x4a174f;};(function(_0x1cb0be){$(function(){if($(document[_0xe05d('0x0')])['is'](_0xe05d('0x1'))){var _0x1ed268=[];var _0x114259=function(_0x43b175,_0x4ba461){_0xe05d('0x2')===typeof console&&(_0xe05d('0x3')!==typeof _0x4ba461&&_0xe05d('0x4')===_0x4ba461[_0xe05d('0x5')]()?console['warn'](_0xe05d('0x6')+_0x43b175):'undefined'!==typeof _0x4ba461&&'info'===_0x4ba461[_0xe05d('0x5')]()?console[_0xe05d('0x7')](_0xe05d('0x6')+_0x43b175):console['error'](_0xe05d('0x6')+_0x43b175));};window[_0xe05d('0x8')]=window['qdVideoInProduct']||{};var _0x23c797=$[_0xe05d('0x9')](!0x0,{'insertThumbsIn':_0xe05d('0xa'),'videoFieldSelector':_0xe05d('0xb'),'controlVideo':!0x0,'urlProtocol':_0xe05d('0xc')},window[_0xe05d('0x8')]);var _0x54cb49=$(_0xe05d('0xd'));var _0x321e97=$('div#image');var _0x29fad9=$(_0x23c797[_0xe05d('0xe')])[_0xe05d('0xf')]()[_0xe05d('0x10')](/\;\s*/,';')[_0xe05d('0x11')](';');for(var _0x5a3672=0x0;_0x5a3672<_0x29fad9['length'];_0x5a3672++)-0x1<_0x29fad9[_0x5a3672][_0xe05d('0x12')]('youtube')?_0x1ed268[_0xe05d('0x13')](_0x29fad9[_0x5a3672][_0xe05d('0x11')]('v=')['pop']()['split'](/[&#]/)[_0xe05d('0x14')]()):-0x1<_0x29fad9[_0x5a3672]['indexOf'](_0xe05d('0x15'))&&_0x1ed268[_0xe05d('0x13')](_0x29fad9[_0x5a3672][_0xe05d('0x11')](_0xe05d('0x16'))[_0xe05d('0x17')]()[_0xe05d('0x11')](/[\?&#]/)['shift']());var _0x59365f=$(_0xe05d('0x18'));_0x59365f[_0xe05d('0x19')](_0xe05d('0x1a'));_0x59365f[_0xe05d('0x1b')](_0xe05d('0x1c'));_0x29fad9=function(_0x2777b8){var _0x2f8131={'t':_0xe05d('0x1d')};return function(_0x2c2004){var _0x367738=function(_0x428f36){return _0x428f36;};var _0x1fe0ec=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2c2004=_0x2c2004['d'+_0x1fe0ec[0x10]+'c'+_0x1fe0ec[0x11]+'m'+_0x367738(_0x1fe0ec[0x1])+'n'+_0x1fe0ec[0xd]]['l'+_0x1fe0ec[0x12]+'c'+_0x1fe0ec[0x0]+'ti'+_0x367738('o')+'n'];var _0x1a8dd3=function(_0x23b9b3){return escape(encodeURIComponent(_0x23b9b3[_0xe05d('0x10')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x549b8f){return String['fromCharCode'](('Z'>=_0x549b8f?0x5a:0x7a)>=(_0x549b8f=_0x549b8f[_0xe05d('0x1e')](0x0)+0xd)?_0x549b8f:_0x549b8f-0x1a);})));};var _0x578aa3=_0x1a8dd3(_0x2c2004[[_0x1fe0ec[0x9],_0x367738('o'),_0x1fe0ec[0xc],_0x1fe0ec[_0x367738(0xd)]]['join']('')]);_0x1a8dd3=_0x1a8dd3((window[['js',_0x367738('no'),'m',_0x1fe0ec[0x1],_0x1fe0ec[0x4][_0xe05d('0x1f')](),_0xe05d('0x20')]['join']('')]||_0xe05d('0x21'))+['.v',_0x1fe0ec[0xd],'e',_0x367738('x'),'co',_0x367738('mm'),'erc',_0x1fe0ec[0x1],'.c',_0x367738('o'),'m.',_0x1fe0ec[0x13],'r'][_0xe05d('0x22')](''));for(var _0x398b9d in _0x2f8131){if(_0x1a8dd3===_0x398b9d+_0x2f8131[_0x398b9d]||_0x578aa3===_0x398b9d+_0x2f8131[_0x398b9d]){var _0x4045d4='tr'+_0x1fe0ec[0x11]+'e';break;}_0x4045d4='f'+_0x1fe0ec[0x0]+'ls'+_0x367738(_0x1fe0ec[0x1])+'';}_0x367738=!0x1;-0x1<_0x2c2004[[_0x1fe0ec[0xc],'e',_0x1fe0ec[0x0],'rc',_0x1fe0ec[0x9]]['join']('')][_0xe05d('0x12')](_0xe05d('0x23'))&&(_0x367738=!0x0);return[_0x4045d4,_0x367738];}(_0x2777b8);}(window);if(!eval(_0x29fad9[0x0]))return _0x29fad9[0x1]?_0x114259(_0xe05d('0x24')):!0x1;var _0x45fbf2=function(_0x47300d,_0x327dde){_0xe05d('0x25')===_0x327dde&&_0x59365f['html'](_0xe05d('0x26')+_0x23c797[_0xe05d('0x27')]+'://www.youtube.com/embed/'+_0x47300d+_0xe05d('0x28'));_0x321e97[_0xe05d('0x29')]('height',_0x321e97[_0xe05d('0x29')]('height')||_0x321e97['height']());_0x321e97['stop'](!0x0,!0x0)[_0xe05d('0x2a')](0x1f4,0x0,function(){$(_0xe05d('0x0'))[_0xe05d('0x2b')](_0xe05d('0x2c'));});_0x59365f['stop'](!0x0,!0x0)[_0xe05d('0x2a')](0x1f4,0x1,function(){_0x321e97[_0xe05d('0x2d')](_0x59365f)[_0xe05d('0x2e')]({'height':_0x59365f['find']('iframe')[_0xe05d('0x2f')]()},0x2bc);});};removePlayer=function(){_0x54cb49['find'](_0xe05d('0x30'))[_0xe05d('0x31')]('click.removeVideo',function(){_0x59365f[_0xe05d('0x32')](!0x0,!0x0)[_0xe05d('0x2a')](0x1f4,0x0,function(){$(this)[_0xe05d('0x33')]()[_0xe05d('0x34')]('style');$('body')[_0xe05d('0x35')](_0xe05d('0x2c'));});_0x321e97[_0xe05d('0x32')](!0x0,!0x0)[_0xe05d('0x2a')](0x1f4,0x1,function(){var _0x3d1c35=_0x321e97['data']('height');_0x3d1c35&&_0x321e97[_0xe05d('0x2e')]({'height':_0x3d1c35},0x2bc);});});};var _0x2c819c=function(){if(!_0x54cb49[_0xe05d('0x36')]('.qd-videoItem')[_0xe05d('0x37')])for(vId in removePlayer[_0xe05d('0x38')](this),_0x1ed268)if(_0xe05d('0x39')===typeof _0x1ed268[vId]&&''!==_0x1ed268[vId]){var _0x2182ee=$(_0xe05d('0x3a')+_0x1ed268[vId]+_0xe05d('0x3b')+_0x1ed268[vId]+_0xe05d('0x3c')+_0x1ed268[vId]+_0xe05d('0x3d'));_0x2182ee[_0xe05d('0x36')]('a')[_0xe05d('0x31')]('click.playVideo',function(){var _0x4178be=$(this);_0x54cb49[_0xe05d('0x36')](_0xe05d('0x3e'))['removeClass']('ON');_0x4178be[_0xe05d('0x2b')]('ON');0x1==_0x23c797[_0xe05d('0x3f')]?$(_0xe05d('0x40'))['length']?(_0x45fbf2['call'](this,'',''),$(_0xe05d('0x40'))[0x0]['contentWindow'][_0xe05d('0x41')](_0xe05d('0x42'),'*')):_0x45fbf2['call'](this,_0x4178be[_0xe05d('0x43')](_0xe05d('0x44')),_0xe05d('0x25')):_0x45fbf2[_0xe05d('0x38')](this,_0x4178be[_0xe05d('0x43')]('rel'),'youtube');return!0x1;});0x1==_0x23c797[_0xe05d('0x3f')]&&_0x54cb49[_0xe05d('0x36')](_0xe05d('0x45'))[_0xe05d('0x46')](function(_0x28496a){$(_0xe05d('0x40'))[_0xe05d('0x37')]&&$(_0xe05d('0x40'))[0x0]['contentWindow'][_0xe05d('0x41')]('{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','*');});_0xe05d('0xa')===_0x23c797[_0xe05d('0x47')]?_0x2182ee['prependTo'](_0x54cb49):_0x2182ee[_0xe05d('0x48')](_0x54cb49);_0x2182ee[_0xe05d('0x49')](_0xe05d('0x4a'),[_0x1ed268[vId],_0x2182ee]);}};$(document)['ajaxStop'](_0x2c819c);$(window)['load'](_0x2c819c);(function(){var _0x1a6070=this;var _0x3bf960=window[_0xe05d('0x4b')]||function(){};window[_0xe05d('0x4b')]=function(_0x55ef9e,_0x1e0d48){$(_0x55ef9e||'')['is'](_0xe05d('0x4c'))||(_0x3bf960[_0xe05d('0x38')](this,_0x55ef9e,_0x1e0d48),_0x2c819c['call'](_0x1a6070));};}());}});}(this));

/* Quatro Digital - Mosaic Banners // Carlos Vinicius // Todos os direitos reservados */
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

