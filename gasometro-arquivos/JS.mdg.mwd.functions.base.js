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
				console.log("asdkjl");
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
			// Product.setAvailableBodyClass(); comentado poq está dando erro na página de kit
			Product.openShipping();
			Product.qdClickTableMeasures();
			Product.qdCallThumbVideo();
			Product.forceImageZoom();
			Product.selectSku();
			Product.scrollToDescription();
			// Roda slick das thumbs quando volta para estado inicial
			$(window).on('skuSelectable.vtex', Product.applyCarouselThumb);
			Product.saveAmountFlag();

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
var _0x0772=['changeNativePrice','text','.qd_displayPrice','skuPrice','.qd-sp-display-discount','html','installments','installmentValue','changeInstallments','.qd_sp_display_installments','.qd_sp_display_installmentValue','.qd_sp_installments','.qd_saveAmount','.qd_saveAmountPercent','changeNativeSaveAmount','em.economia-de','each','qd_sp_processedItem','startedByWrapper','flagElement','call','forcePromotion','string','not','.qd_productPrice:not(.qd_sp_processedItem)','style','append','QD_SmartPrice','extend','boolean','body','.produto','function','prototype','trim','replace','abs','pow','round','toFixed','split','length','join','Smart\x20Price','object','error','undefined','alerta','toLowerCase','aviso','info','apply','warn','match','strong.skuBestPrice','label.skuBestInstallmentNumber','strong.skuPrice','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','productPage','isProductPage','closest','wrapperElement','filterFlagBy','find','addClass','qd-active','.qd_sp_on,\x20.qd_sp_ignored','skuBestPrice','.qd_active','removeClass','qd-sp-active','oneFlagByItem','siblings','.qd_sp_on','qd_sp_ignored','isDiscountFlag','div[skuCorrente]:first','attr','skuCorrente','skus','available','bestPrice','qd-sp-product-unavailable','getDiscountValue','.qd_productPrice','val','Por\x20alguma\x20razão\x20não\x20consegui\x20obter\x20o\x20preço\x20deste\x20produto\x20:(','appliedDiscount'];(function(_0x161410,_0x4ee06f){var _0x1a8c77=function(_0x451d97){while(--_0x451d97){_0x161410['push'](_0x161410['shift']());}};_0x1a8c77(++_0x4ee06f);}(_0x0772,0x7f));var _0x2077=function(_0x2b4411,_0x2625ed){_0x2b4411=_0x2b4411-0x0;var _0x8e41ef=_0x0772[_0x2b4411];return _0x8e41ef;};_0x2077('0x0')!==typeof String[_0x2077('0x1')][_0x2077('0x2')]&&(String[_0x2077('0x1')]['trim']=function(){return this[_0x2077('0x3')](/^\s+|\s+$/g,'');});function qd_number_format(_0x2eae2d,_0x3135e7,_0x1288e0,_0xe856eb){_0x2eae2d=(_0x2eae2d+'')[_0x2077('0x3')](/[^0-9+\-Ee.]/g,'');_0x2eae2d=isFinite(+_0x2eae2d)?+_0x2eae2d:0x0;_0x3135e7=isFinite(+_0x3135e7)?Math[_0x2077('0x4')](_0x3135e7):0x0;_0xe856eb='undefined'===typeof _0xe856eb?',':_0xe856eb;_0x1288e0='undefined'===typeof _0x1288e0?'.':_0x1288e0;var _0x35a40f='',_0x35a40f=function(_0x272a44,_0x25b3f0){var _0x3135e7=Math[_0x2077('0x5')](0xa,_0x25b3f0);return''+(Math[_0x2077('0x6')](_0x272a44*_0x3135e7)/_0x3135e7)[_0x2077('0x7')](_0x25b3f0);},_0x35a40f=(_0x3135e7?_0x35a40f(_0x2eae2d,_0x3135e7):''+Math['round'](_0x2eae2d))[_0x2077('0x8')]('.');0x3<_0x35a40f[0x0][_0x2077('0x9')]&&(_0x35a40f[0x0]=_0x35a40f[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0xe856eb));(_0x35a40f[0x1]||'')[_0x2077('0x9')]<_0x3135e7&&(_0x35a40f[0x1]=_0x35a40f[0x1]||'',_0x35a40f[0x1]+=Array(_0x3135e7-_0x35a40f[0x1][_0x2077('0x9')]+0x1)['join']('0'));return _0x35a40f[_0x2077('0xa')](_0x1288e0);};(function(_0x5d3221){'use strict';var _0x245f55=jQuery;if(typeof _0x245f55['fn']['QD_SmartPrice']===_0x2077('0x0'))return;var _0x26859e=_0x2077('0xb');var _0x33cc66=function(_0x33bfaa,_0x2aa4b0){if(_0x2077('0xc')===typeof console&&_0x2077('0x0')===typeof console[_0x2077('0xd')]&&_0x2077('0x0')===typeof console['info']&&_0x2077('0x0')===typeof console['warn']){var _0x44e30a;_0x2077('0xc')===typeof _0x33bfaa?(_0x33bfaa['unshift']('['+_0x26859e+']\x0a'),_0x44e30a=_0x33bfaa):_0x44e30a=['['+_0x26859e+']\x0a'+_0x33bfaa];if(_0x2077('0xe')===typeof _0x2aa4b0||_0x2077('0xf')!==_0x2aa4b0[_0x2077('0x10')]()&&_0x2077('0x11')!==_0x2aa4b0[_0x2077('0x10')]())if(_0x2077('0xe')!==typeof _0x2aa4b0&&_0x2077('0x12')===_0x2aa4b0[_0x2077('0x10')]())try{console['info'][_0x2077('0x13')](console,_0x44e30a);}catch(_0xf08505){console[_0x2077('0x12')](_0x44e30a[_0x2077('0xa')]('\x0a'));}else try{console['error']['apply'](console,_0x44e30a);}catch(_0x234968){console[_0x2077('0xd')](_0x44e30a[_0x2077('0xa')]('\x0a'));}else try{console['warn'][_0x2077('0x13')](console,_0x44e30a);}catch(_0x409176){console[_0x2077('0x14')](_0x44e30a['join']('\x0a'));}}};var _0x44e8e1=/[0-9]+\%/i;var _0x73a6e8=/[0-9\.]+(?=\%)/i;var _0xf8e5c5={'isDiscountFlag':function(_0x1e1e24){if(_0x1e1e24['text']()['search'](_0x44e8e1)>-0x1)return!![];return![];},'getDiscountValue':function(_0x1e923b){return _0x1e923b['text']()[_0x2077('0x15')](_0x73a6e8);},'startedByWrapper':![],'flagElement':'.flag','wrapperElement':'li','filterFlagBy':'[class*=\x27desconto\x27]','forcePromotion':null,'appliedDiscount':null,'oneFlagByItem':!![],'isSmartCheckout':!![],'changeInstallments':![],'productPage':{'changeNativeSaveAmount':!![],'changeNativePrice':!![],'changeInstallments':![],'isProductPage':'auto','wrapperElement':'.productRightColumn','skuBestPrice':_0x2077('0x16'),'installments':_0x2077('0x17'),'installmentValue':'label.skuBestInstallmentValue','skuPrice':_0x2077('0x18')}};_0x245f55['fn']['QD_SmartPrice']=function(){};var _0x2df239=function(_0x2ba682){var _0x57b630={'t':'nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x2e3212){var _0x576154,_0xa8f207,_0x2f2fb6,_0x560a3a;_0xa8f207=function(_0x1b525a){return _0x1b525a;};_0x2f2fb6=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2e3212=_0x2e3212['d'+_0x2f2fb6[0x10]+'c'+_0x2f2fb6[0x11]+'m'+_0xa8f207(_0x2f2fb6[0x1])+'n'+_0x2f2fb6[0xd]]['l'+_0x2f2fb6[0x12]+'c'+_0x2f2fb6[0x0]+'ti'+_0xa8f207('o')+'n'];_0x576154=function(_0x4266f1){return escape(encodeURIComponent(_0x4266f1['replace'](/\./g,'¨')[_0x2077('0x3')](/[a-zA-Z]/g,function(_0xdb66b7){return String[_0x2077('0x19')](('Z'>=_0xdb66b7?0x5a:0x7a)>=(_0xdb66b7=_0xdb66b7[_0x2077('0x1a')](0x0)+0xd)?_0xdb66b7:_0xdb66b7-0x1a);})));};var _0x5d791c=_0x576154(_0x2e3212[[_0x2f2fb6[0x9],_0xa8f207('o'),_0x2f2fb6[0xc],_0x2f2fb6[_0xa8f207(0xd)]][_0x2077('0xa')]('')]);_0x576154=_0x576154((window[['js',_0xa8f207('no'),'m',_0x2f2fb6[0x1],_0x2f2fb6[0x4][_0x2077('0x1b')](),_0x2077('0x1c')][_0x2077('0xa')]('')]||_0x2077('0x1d'))+['.v',_0x2f2fb6[0xd],'e',_0xa8f207('x'),'co',_0xa8f207('mm'),_0x2077('0x1e'),_0x2f2fb6[0x1],'.c',_0xa8f207('o'),'m.',_0x2f2fb6[0x13],'r'][_0x2077('0xa')](''));for(var _0x19c938 in _0x57b630){if(_0x576154===_0x19c938+_0x57b630[_0x19c938]||_0x5d791c===_0x19c938+_0x57b630[_0x19c938]){_0x560a3a='tr'+_0x2f2fb6[0x11]+'e';break;}_0x560a3a='f'+_0x2f2fb6[0x0]+'ls'+_0xa8f207(_0x2f2fb6[0x1])+'';}_0xa8f207=!0x1;-0x1<_0x2e3212[[_0x2f2fb6[0xc],'e',_0x2f2fb6[0x0],'rc',_0x2f2fb6[0x9]]['join']('')]['indexOf'](_0x2077('0x1f'))&&(_0xa8f207=!0x0);return[_0x560a3a,_0xa8f207];}(_0x2ba682);}(window);if(!eval(_0x2df239[0x0]))return _0x2df239[0x1]?_0x33cc66(_0x2077('0x20')):!0x1;var _0x4461ed=function(_0x2f573b,_0x42dd4d){'use strict';var _0x532256=function(_0x17fdc0){'use strict';var _0x3bf572,_0x211e05,_0xb9bec0,_0x88bb77,_0x3d2430,_0x44d992,_0x39865,_0x49a8be,_0x2cf37c,_0x482cd4,_0x123094,_0xdcebd2,_0x53f126,_0x5b1af7,_0x692a70,_0x357f78,_0x2f2fbe,_0x22b79d,_0x3ea9c0;var _0x46d743=_0x245f55(this);_0x17fdc0=typeof _0x17fdc0===_0x2077('0xe')?![]:_0x17fdc0;if(_0x42dd4d[_0x2077('0x21')][_0x2077('0x22')])var _0x59ab0c=_0x46d743[_0x2077('0x23')](_0x42dd4d[_0x2077('0x21')][_0x2077('0x24')]);else var _0x59ab0c=_0x46d743[_0x2077('0x23')](_0x42dd4d[_0x2077('0x24')]);if(!_0x17fdc0&&!_0x46d743['is'](_0x42dd4d[_0x2077('0x25')])){if(_0x42dd4d[_0x2077('0x21')][_0x2077('0x22')]&&_0x59ab0c['is'](_0x42dd4d[_0x2077('0x21')][_0x2077('0x24')])){_0x59ab0c[_0x2077('0x26')](_0x42dd4d[_0x2077('0x21')]['skuBestPrice'])[_0x2077('0x27')](_0x2077('0x28'));_0x59ab0c[_0x2077('0x27')]('qd-sp-active');}return;}var _0x1862dd=_0x42dd4d[_0x2077('0x21')][_0x2077('0x22')];if(_0x46d743['is'](_0x2077('0x29'))&&!_0x1862dd)return;if(_0x1862dd){_0x49a8be=_0x59ab0c[_0x2077('0x26')](_0x42dd4d[_0x2077('0x21')][_0x2077('0x2a')]);if(_0x49a8be[_0x2077('0x26')](_0x2077('0x2b'))[_0x2077('0x9')])return;_0x49a8be['removeClass'](_0x2077('0x28'));_0x59ab0c[_0x2077('0x2c')](_0x2077('0x2d'));}if(_0x42dd4d[_0x2077('0x2e')]&&_0x46d743[_0x2077('0x2f')](_0x2077('0x30'))['length']){_0x46d743[_0x2077('0x27')](_0x2077('0x31'));return;}_0x46d743[_0x2077('0x27')]('qd_sp_on');if(!_0x42dd4d[_0x2077('0x32')](_0x46d743))return;if(_0x1862dd){_0xb9bec0={};var _0x7f8bce=parseInt(_0x245f55(_0x2077('0x33'))[_0x2077('0x34')](_0x2077('0x35')),0xa);if(_0x7f8bce){for(var _0x240e21=0x0;_0x240e21<skuJson[_0x2077('0x36')]['length'];_0x240e21++){if(skuJson[_0x2077('0x36')][_0x240e21]['sku']==_0x7f8bce){_0xb9bec0=skuJson[_0x2077('0x36')][_0x240e21];break;}}}else{var _0x1454c7=0x5af3107a3fff;for(var _0x2244cc in skuJson[_0x2077('0x36')]){if(typeof skuJson[_0x2077('0x36')][_0x2244cc]===_0x2077('0x0'))continue;if(!skuJson[_0x2077('0x36')][_0x2244cc][_0x2077('0x37')])continue;if(skuJson[_0x2077('0x36')][_0x2244cc][_0x2077('0x38')]<_0x1454c7){_0x1454c7=skuJson['skus'][_0x2244cc][_0x2077('0x38')];_0xb9bec0=skuJson[_0x2077('0x36')][_0x2244cc];}}}}_0x357f78=!![];_0x2f2fbe=0x0;if(_0x42dd4d['isSmartCheckout']&&_0x22b79d){_0x357f78=skuJson[_0x2077('0x37')];if(!_0x357f78)return _0x59ab0c[_0x2077('0x27')](_0x2077('0x39'));}_0x211e05=_0x42dd4d[_0x2077('0x3a')](_0x46d743);_0x3bf572=parseFloat(_0x211e05,0xa);if(isNaN(_0x3bf572))return _0x33cc66(['O\x20valor\x20informado\x20p/\x20o\x20desconto\x20não\x20é\x20um\x20número.',_0x46d743],_0x2077('0xf'));var _0x50c9fb=function(_0x146b1e){if(_0x1862dd)_0x88bb77=(_0x146b1e['bestPrice']||0x0)/0x64;else{_0x53f126=_0x59ab0c['find'](_0x2077('0x3b'));_0x88bb77=parseFloat((_0x53f126[_0x2077('0x3c')]()||'')['replace'](/[^0-9\.\,]+/i,'')[_0x2077('0x3')]('.','')[_0x2077('0x3')](',','.'),0xa);}if(isNaN(_0x88bb77))return _0x33cc66([_0x2077('0x3d'),_0x46d743,_0x59ab0c]);if(_0x42dd4d[_0x2077('0x3e')]!==null){_0x5b1af7=0x0;if(!isNaN(_0x42dd4d['appliedDiscount']))_0x5b1af7=_0x42dd4d[_0x2077('0x3e')];else{_0x692a70=_0x59ab0c[_0x2077('0x26')](_0x42dd4d[_0x2077('0x3e')]);if(_0x692a70[_0x2077('0x9')])_0x5b1af7=_0x42dd4d[_0x2077('0x3a')](_0x692a70);}_0x5b1af7=parseFloat(_0x5b1af7,0xa);if(isNaN(_0x5b1af7))_0x5b1af7=0x0;if(_0x5b1af7!==0x0)_0x88bb77=_0x88bb77*0x64/(0x64-_0x5b1af7);}if(_0x1862dd)_0x3d2430=(_0x146b1e['listPrice']||0x0)/0x64;else _0x3d2430=parseFloat((_0x59ab0c['find']('.qd_productOldPrice')['val']()||'')[_0x2077('0x3')](/[^0-9\.\,]+/i,'')[_0x2077('0x3')]('.','')[_0x2077('0x3')](',','.'),0xa);if(isNaN(_0x3d2430))_0x3d2430=0.001;_0x44d992=_0x88bb77*((0x64-_0x3bf572)/0x64);if(_0x1862dd&&_0x42dd4d[_0x2077('0x21')][_0x2077('0x3f')]){_0x49a8be[_0x2077('0x40')](_0x49a8be['text']()['trim']()[_0x2077('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x44d992,0x2,',','.')))[_0x2077('0x27')](_0x2077('0x28'));_0x59ab0c['addClass']('qd-sp-active');}else{_0x3ea9c0=_0x59ab0c[_0x2077('0x26')](_0x2077('0x41'));_0x3ea9c0[_0x2077('0x40')](_0x3ea9c0['text']()[_0x2077('0x3')](/[0-9\.]+,[0-9]+/i,'')+qd_number_format(_0x44d992,0x2,',','.'));}if(_0x1862dd){_0x39865=_0x59ab0c[_0x2077('0x26')](_0x42dd4d['productPage'][_0x2077('0x42')]);if(_0x39865['length'])_0x39865[_0x2077('0x40')](_0x39865['text']()[_0x2077('0x2')]()[_0x2077('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x44d992,0x2,',','.')));}var _0x3cd0c9=_0x59ab0c['find'](_0x2077('0x43'));_0x3cd0c9[_0x2077('0x40')](_0x3cd0c9['text']()[_0x2077('0x3')](/[0-9]+\%/i,_0x3bf572+'%'));var _0x35add8=function(_0x2ae1cf,_0x57370e,_0x39016c){var _0x555267=_0x59ab0c[_0x2077('0x26')](_0x2ae1cf);if(_0x555267[_0x2077('0x9')])_0x555267[_0x2077('0x44')](_0x555267['html']()['trim']()[_0x2077('0x3')](/[0-9]{1,2}/,_0x39016c?_0x39016c:_0x146b1e[_0x2077('0x45')]||0x0));var _0x56f5a7=_0x59ab0c[_0x2077('0x26')](_0x57370e);if(_0x56f5a7[_0x2077('0x9')])_0x56f5a7[_0x2077('0x44')](_0x56f5a7[_0x2077('0x44')]()[_0x2077('0x2')]()[_0x2077('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x44d992/(_0x39016c?_0x39016c:_0x146b1e[_0x2077('0x45')]||0x1),0x2,',','.')));};if(_0x1862dd&&_0x42dd4d[_0x2077('0x21')]['changeInstallments'])_0x35add8(_0x42dd4d[_0x2077('0x21')]['installments'],_0x42dd4d[_0x2077('0x21')][_0x2077('0x46')]);else if(_0x42dd4d[_0x2077('0x47')])_0x35add8(_0x2077('0x48'),_0x2077('0x49'),parseInt(_0x59ab0c[_0x2077('0x26')](_0x2077('0x4a'))['val']()||0x1)||0x1);_0x59ab0c[_0x2077('0x26')](_0x2077('0x4b'))['append'](qd_number_format(_0x3d2430-_0x44d992,0x2,',','.'));_0x59ab0c[_0x2077('0x26')](_0x2077('0x4c'))['prepend'](qd_number_format((_0x3d2430-_0x44d992)*0x64/_0x3d2430,0x2,',','.'));if(_0x1862dd&&_0x42dd4d[_0x2077('0x21')][_0x2077('0x4d')]){_0x245f55(_0x2077('0x4e'))[_0x2077('0x4f')](function(){_0x123094=_0x245f55(this);_0x123094[_0x2077('0x40')](_0x123094[_0x2077('0x40')]()[_0x2077('0x2')]()['replace'](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x3d2430-_0x44d992,0x2,',','.')));_0x123094[_0x2077('0x27')](_0x2077('0x28'));});}};_0x50c9fb(_0xb9bec0);if(_0x1862dd)_0x245f55(window)['on']('skuSelected.vtex',function(_0xce5264,_0x2013f4,_0x4a413b){_0x50c9fb(_0x4a413b);});_0x59ab0c[_0x2077('0x27')](_0x2077('0x50'));if(!_0x1862dd)_0x53f126[_0x2077('0x27')](_0x2077('0x50'));};(_0x42dd4d[_0x2077('0x51')]?_0x2f573b[_0x2077('0x26')](_0x42dd4d[_0x2077('0x52')]):_0x2f573b)[_0x2077('0x4f')](function(){_0x532256[_0x2077('0x53')](this,![]);});if(typeof _0x42dd4d[_0x2077('0x54')]==_0x2077('0x55')){var _0x19c36=_0x42dd4d['startedByWrapper']?_0x2f573b:_0x2f573b[_0x2077('0x23')](_0x42dd4d[_0x2077('0x24')]);if(_0x42dd4d['productPage'][_0x2077('0x22')])_0x19c36=_0x19c36[_0x2077('0x23')](_0x42dd4d[_0x2077('0x21')][_0x2077('0x24')])[_0x2077('0x56')]('.qd_sp_processedItem');else _0x19c36=_0x19c36[_0x2077('0x26')](_0x2077('0x57'));_0x19c36[_0x2077('0x4f')](function(){var _0x3651fb=_0x245f55(_0x42dd4d['forcePromotion']);_0x3651fb['attr'](_0x2077('0x58'),'display:none\x20!important;');if(_0x42dd4d[_0x2077('0x21')][_0x2077('0x22')])_0x245f55(this)[_0x2077('0x59')](_0x3651fb);else _0x245f55(this)['after'](_0x3651fb);_0x532256[_0x2077('0x53')](_0x3651fb,!![]);});}};_0x245f55['fn'][_0x2077('0x5a')]=function(_0x304167){var _0x3cca6d=_0x245f55(this);if(!_0x3cca6d[_0x2077('0x9')])return _0x3cca6d;var _0x37d658=_0x245f55[_0x2077('0x5b')](!![],{},_0xf8e5c5,_0x304167);if(typeof _0x37d658[_0x2077('0x21')][_0x2077('0x22')]!=_0x2077('0x5c'))_0x37d658[_0x2077('0x21')][_0x2077('0x22')]=_0x245f55(document[_0x2077('0x5d')])['is'](_0x2077('0x5e'));_0x4461ed(_0x3cca6d,_0x37d658);return _0x3cca6d;};}(this));
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
var _0x61ef=['each','addClass','qd-am-li-','first','qd-am-last','replace','fromCharCode','charCodeAt','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','.qd-am-banner','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','url','img[alt=\x27','data-qdam-value','.box-banner','clone','hide','qd-am-content-loaded','trim','attr','insertBefore','\x27\x20falho.','ajaxCallback','call','trigger','QD_amazingMenu','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','qd-am-has-ul','children','qd-am-elem-','text','replaceSpecialChars','>li','qdAmAddNdx','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','add','-li','callback','QuatroDigital.am.callback','extend','exec','.qd_amazing_menu_auto','getParent','error','undefined','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','info','apply','join','warn'];(function(_0x138ed8,_0x394451){var _0xa1b00e=function(_0x217061){while(--_0x217061){_0x138ed8['push'](_0x138ed8['shift']());}};_0xa1b00e(++_0x394451);}(_0x61ef,0xc6));var _0xf61e=function(_0x2070da,_0x45e586){_0x2070da=_0x2070da-0x0;var _0x4f9fe1=_0x61ef[_0x2070da];return _0x4f9fe1;};(function(_0x2bca9a){_0x2bca9a['fn'][_0xf61e('0x0')]=_0x2bca9a['fn']['closest'];}(jQuery));(function(_0x5b1b5d){var _0x31321b;var _0xb0654b=jQuery;if('function'!==typeof _0xb0654b['fn']['QD_amazingMenu']){var _0x49be3d={'url':'/qd-amazing-menu','callback':function(){},'ajaxCallback':function(){}};var _0x33e988=function(_0x24d253,_0x3cb4ef){if('object'===typeof console&&'undefined'!==typeof console[_0xf61e('0x1')]&&'undefined'!==typeof console['info']&&_0xf61e('0x2')!==typeof console['warn']){var _0x23401d;'object'===typeof _0x24d253?(_0x24d253[_0xf61e('0x3')](_0xf61e('0x4')),_0x23401d=_0x24d253):_0x23401d=['[QD\x20Amazing\x20Menu]\x0a'+_0x24d253];if(_0xf61e('0x2')===typeof _0x3cb4ef||_0xf61e('0x5')!==_0x3cb4ef[_0xf61e('0x6')]()&&_0xf61e('0x7')!==_0x3cb4ef[_0xf61e('0x6')]())if(_0xf61e('0x2')!==typeof _0x3cb4ef&&_0xf61e('0x8')===_0x3cb4ef[_0xf61e('0x6')]())try{console[_0xf61e('0x8')][_0xf61e('0x9')](console,_0x23401d);}catch(_0x2e6878){try{console['info'](_0x23401d[_0xf61e('0xa')]('\x0a'));}catch(_0x557b4f){}}else try{console[_0xf61e('0x1')][_0xf61e('0x9')](console,_0x23401d);}catch(_0x329a5b){try{console[_0xf61e('0x1')](_0x23401d[_0xf61e('0xa')]('\x0a'));}catch(_0x5b844e){}}else try{console['warn'][_0xf61e('0x9')](console,_0x23401d);}catch(_0x43b0ac){try{console[_0xf61e('0xb')](_0x23401d[_0xf61e('0xa')]('\x0a'));}catch(_0x4fe5f7){}}}};_0xb0654b['fn']['qdAmAddNdx']=function(){var _0x5edd75=_0xb0654b(this);_0x5edd75[_0xf61e('0xc')](function(_0x45f5a8){_0xb0654b(this)[_0xf61e('0xd')](_0xf61e('0xe')+_0x45f5a8);});_0x5edd75[_0xf61e('0xf')]()[_0xf61e('0xd')]('qd-am-first');_0x5edd75['last']()[_0xf61e('0xd')](_0xf61e('0x10'));return _0x5edd75;};_0xb0654b['fn']['QD_amazingMenu']=function(){};_0x5b1b5d=function(_0x3f924c){var _0x559c44={'t':'nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x3b137b){var _0x4045cf=function(_0x5544a7){return _0x5544a7;};var _0x16e056=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3b137b=_0x3b137b['d'+_0x16e056[0x10]+'c'+_0x16e056[0x11]+'m'+_0x4045cf(_0x16e056[0x1])+'n'+_0x16e056[0xd]]['l'+_0x16e056[0x12]+'c'+_0x16e056[0x0]+'ti'+_0x4045cf('o')+'n'];var _0x260276=function(_0xb958e){return escape(encodeURIComponent(_0xb958e[_0xf61e('0x11')](/\./g,'¨')[_0xf61e('0x11')](/[a-zA-Z]/g,function(_0x18fae0){return String[_0xf61e('0x12')](('Z'>=_0x18fae0?0x5a:0x7a)>=(_0x18fae0=_0x18fae0[_0xf61e('0x13')](0x0)+0xd)?_0x18fae0:_0x18fae0-0x1a);})));};var _0x37ff8c=_0x260276(_0x3b137b[[_0x16e056[0x9],_0x4045cf('o'),_0x16e056[0xc],_0x16e056[_0x4045cf(0xd)]][_0xf61e('0xa')]('')]);_0x260276=_0x260276((window[['js',_0x4045cf('no'),'m',_0x16e056[0x1],_0x16e056[0x4]['toUpperCase'](),'ite'][_0xf61e('0xa')]('')]||_0xf61e('0x14'))+['.v',_0x16e056[0xd],'e',_0x4045cf('x'),'co',_0x4045cf('mm'),_0xf61e('0x15'),_0x16e056[0x1],'.c',_0x4045cf('o'),'m.',_0x16e056[0x13],'r']['join'](''));for(var _0x55faba in _0x559c44){if(_0x260276===_0x55faba+_0x559c44[_0x55faba]||_0x37ff8c===_0x55faba+_0x559c44[_0x55faba]){var _0x79e483='tr'+_0x16e056[0x11]+'e';break;}_0x79e483='f'+_0x16e056[0x0]+'ls'+_0x4045cf(_0x16e056[0x1])+'';}_0x4045cf=!0x1;-0x1<_0x3b137b[[_0x16e056[0xc],'e',_0x16e056[0x0],'rc',_0x16e056[0x9]]['join']('')][_0xf61e('0x16')](_0xf61e('0x17'))&&(_0x4045cf=!0x0);return[_0x79e483,_0x4045cf];}(_0x3f924c);}(window);if(!eval(_0x5b1b5d[0x0]))return _0x5b1b5d[0x1]?_0x33e988(_0xf61e('0x18')):!0x1;var _0x54b4dc=function(_0x48d99b){var _0x17f237=_0x48d99b[_0xf61e('0x19')](_0xf61e('0x1a'));var _0x3b78cd=_0x17f237[_0xf61e('0x1b')](_0xf61e('0x1c'));var _0x440aba=_0x17f237[_0xf61e('0x1b')]('.qd-am-collection');if(_0x3b78cd[_0xf61e('0x1d')]||_0x440aba[_0xf61e('0x1d')])_0x3b78cd[_0xf61e('0x1e')]()['addClass'](_0xf61e('0x1f')),_0x440aba['parent']()['addClass'](_0xf61e('0x20')),_0xb0654b[_0xf61e('0x21')]({'url':_0x31321b[_0xf61e('0x22')],'dataType':'html','success':function(_0xeaab33){var _0x111514=_0xb0654b(_0xeaab33);_0x3b78cd['each'](function(){var _0xeaab33=_0xb0654b(this);var _0x3c6378=_0x111514['find'](_0xf61e('0x23')+_0xeaab33['attr'](_0xf61e('0x24'))+'\x27]');_0x3c6378[_0xf61e('0x1d')]&&(_0x3c6378[_0xf61e('0xc')](function(){_0xb0654b(this)[_0xf61e('0x0')](_0xf61e('0x25'))[_0xf61e('0x26')]()['insertBefore'](_0xeaab33);}),_0xeaab33[_0xf61e('0x27')]());})[_0xf61e('0xd')](_0xf61e('0x28'));_0x440aba[_0xf61e('0xc')](function(){var _0xeaab33={};var _0x9c14d0=_0xb0654b(this);_0x111514[_0xf61e('0x19')]('h2')[_0xf61e('0xc')](function(){if(_0xb0654b(this)['text']()[_0xf61e('0x29')]()[_0xf61e('0x6')]()==_0x9c14d0[_0xf61e('0x2a')](_0xf61e('0x24'))[_0xf61e('0x29')]()[_0xf61e('0x6')]())return _0xeaab33=_0xb0654b(this),!0x1;});_0xeaab33[_0xf61e('0x1d')]&&(_0xeaab33[_0xf61e('0xc')](function(){_0xb0654b(this)[_0xf61e('0x0')]('[class*=\x27colunas\x27]')[_0xf61e('0x26')]()[_0xf61e('0x2b')](_0x9c14d0);}),_0x9c14d0[_0xf61e('0x27')]());})[_0xf61e('0xd')](_0xf61e('0x28'));},'error':function(){_0x33e988('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27'+_0x31321b[_0xf61e('0x22')]+_0xf61e('0x2c'));},'complete':function(){_0x31321b[_0xf61e('0x2d')][_0xf61e('0x2e')](this);_0xb0654b(window)[_0xf61e('0x2f')]('QuatroDigital.am.ajaxCallback',_0x48d99b);},'clearQueueDelay':0xbb8});};_0xb0654b[_0xf61e('0x30')]=function(_0x218e18){var _0x73509b=_0x218e18[_0xf61e('0x19')](_0xf61e('0x31'))[_0xf61e('0xc')](function(){var _0x24ef28=_0xb0654b(this);if(!_0x24ef28[_0xf61e('0x1d')])return _0x33e988([_0xf61e('0x32'),_0x218e18],_0xf61e('0x5'));_0x24ef28[_0xf61e('0x19')]('li\x20>ul')[_0xf61e('0x1e')]()[_0xf61e('0xd')](_0xf61e('0x33'));_0x24ef28['find']('li')[_0xf61e('0xc')](function(){var _0x2419a6=_0xb0654b(this);var _0x384fd5=_0x2419a6[_0xf61e('0x34')](':not(ul)');_0x384fd5[_0xf61e('0x1d')]&&_0x2419a6[_0xf61e('0xd')](_0xf61e('0x35')+_0x384fd5[_0xf61e('0xf')]()[_0xf61e('0x36')]()[_0xf61e('0x29')]()[_0xf61e('0x37')]()['replace'](/\./g,'')[_0xf61e('0x11')](/\s/g,'-')[_0xf61e('0x6')]());});var _0x5ea368=_0x24ef28[_0xf61e('0x19')](_0xf61e('0x38'))[_0xf61e('0x39')]();_0x24ef28['addClass']('qd-amazing-menu');_0x5ea368=_0x5ea368[_0xf61e('0x19')](_0xf61e('0x3a'));_0x5ea368[_0xf61e('0xc')](function(){var _0x4eb757=_0xb0654b(this);_0x4eb757['find'](_0xf61e('0x38'))[_0xf61e('0x39')]()['addClass'](_0xf61e('0x3b'));_0x4eb757[_0xf61e('0xd')](_0xf61e('0x3c'));_0x4eb757[_0xf61e('0x1e')]()[_0xf61e('0xd')]('qd-am-dropdown');});_0x5ea368[_0xf61e('0xd')](_0xf61e('0x3d'));var _0x20d058=0x0,_0x5b1b5d=function(_0xadab9c){_0x20d058+=0x1;_0xadab9c=_0xadab9c[_0xf61e('0x34')]('li')[_0xf61e('0x34')]('*');_0xadab9c['length']&&(_0xadab9c[_0xf61e('0xd')](_0xf61e('0x3e')+_0x20d058),_0x5b1b5d(_0xadab9c));};_0x5b1b5d(_0x24ef28);_0x24ef28[_0xf61e('0x3f')](_0x24ef28[_0xf61e('0x19')]('ul'))[_0xf61e('0xc')](function(){var _0x400d20=_0xb0654b(this);_0x400d20[_0xf61e('0xd')]('qd-am-'+_0x400d20['children']('li')[_0xf61e('0x1d')]+_0xf61e('0x40'));});});_0x54b4dc(_0x73509b);_0x31321b[_0xf61e('0x41')][_0xf61e('0x2e')](this);_0xb0654b(window)[_0xf61e('0x2f')](_0xf61e('0x42'),_0x218e18);};_0xb0654b['fn']['QD_amazingMenu']=function(_0x10d548){var _0x184ec1=_0xb0654b(this);if(!_0x184ec1['length'])return _0x184ec1;_0x31321b=_0xb0654b[_0xf61e('0x43')]({},_0x49be3d,_0x10d548);_0x184ec1[_0xf61e('0x44')]=new _0xb0654b[(_0xf61e('0x30'))](_0xb0654b(this));return _0x184ec1;};_0xb0654b(function(){_0xb0654b(_0xf61e('0x45'))[_0xf61e('0x30')]();});}}(this));

/* Quatro Digital Smart Cart */
var _0x4ded=['attr','each','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','Shipping','value','total','currencySymbol','shipping','qtt','items','quantity','callback','fire','hide','filter','.singular','show','.plural','addClass','removeClass','qd-emptyCart','$this','cartTotalE','html','itemsTextE','cartQttE','find','cartQtt','cartTotal','itemsText','emptyElem','_QuatroDigital_DropDown','getOrderForm','vtexjs','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','QD_checkoutQueue','shippingData','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','trigger','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','.qd_cart_auto','bind','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','Oooops!\x20','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','fail','Callbacks','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','join','apply','input.buy-in-page-quantity','javascript:','body','.productQuickView','Produto\x20adicionado\x20ao\x20carrinho!','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','href','#produto,\x20.produto','QD_buyButton','isSmartCheckout','qd-bb-click-active','click.qd_bb_buy_sc','allowBuyClick','clickBuySmartCheckout','preventDefault','Método\x20descontinuado!','.qd-sbb-on','qd-sbb-on','.remove-href','qd-bb-active','.qd-bb-productAdded','append','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','.buy-in-page-button','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','_Quatro_Digital_dropDown','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','buyButton','[href=\x27','---','qd-bb-itemAddBuyButtonWrapper','timeRemoveNewItemClass','getCartInfoByUrl','função\x20descontinuada','allowUpdate','autoWatchBuyButton','.btn-add-buy-button-asynchronous','unbind','load','mouseenter.qd_bb_buy_sc','selectSkuMsg','?redirect=false&','execDefaultAction','redirect=true','queue','buyIfQuantityZeroed','test','productPageCallback','buyButtonClickCallback','prodAdd','split','ku=','shift','cartProductAdded.vtex','fakeRequest','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','children','.qd-bb-itemAddWrapper','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','QuatroDigital.qd_bb_prod_add','ajaxSend','/checkout/cart/add','match','pop','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','aviso','QD_dropDownCart','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','ite','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','name','smartCheckout','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','cartContainer','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-shipping\x20input','val','keyup.qd_ddc_cep','shippingCalculate','mouseleave.qd_ddc_hover','texts','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','.qd-ddc-emptyCart\x20p','emptyCart','clone','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','.qd-ddc-infoAllTotal','allTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','dataOptionsCache','.qd-ddc-wrapper','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','cartIsEmpty','qd-ddc-noItems','empty','productCategoryIds','qd-ddc-','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','content','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','[data-sku=\x27','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku-index','changeQantity','data-sku','.qd-ddc-prodQttWrapper:not(.qd_on)','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','.qd-ddc-quantity','focusout.qd_ddc_change','keyup.qd_ddc_change','.qd-ddc-prodRow','click.qd_ddc_remove','slideUp','remove','qdDdcLastPostalCode','BRA','Não\x20foi\x20possível\x20calcular\x20o\x20frete','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','removeProduct','boolean','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','updateOnlyHover','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','.qd-bap-wrapper','qd-bap-item-added','input.qd-productId[value=','prodId','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd_bap_wrapper_content','prepend','ajaxStop','.qdDdcContainer','QD_smartCart','selector','dropDown','smartCart','getParent','closest','replace','abs','undefined','pow','round','length','prototype','trim','function','capitalize','charAt','toUpperCase','slice','toLowerCase','qdAjax','qdAjaxQueue','000','error','extend','GET','object','stringify','data','toString','url','type','jqXHR','ajax','done','success','always','complete','clearQueueDelay','message','version','4.0','checkout','call','QuatroDigital_simpleCart','ajaxStopOn','simpleCart','alerta','[Simple\x20Cart]\x0a','warn','info','add','elements','QD_simpleCart','.qd_cart_total','.qd_items_text','meta[name=currency]'];(function(_0x2db12b,_0x30ab1d){var _0x20990b=function(_0x589477){while(--_0x589477){_0x2db12b['push'](_0x2db12b['shift']());}};_0x20990b(++_0x30ab1d);}(_0x4ded,0x116));var _0xd4de=function(_0x47d7e7,_0x1f0db1){_0x47d7e7=_0x47d7e7-0x0;var _0x17d0e8=_0x4ded[_0x47d7e7];return _0x17d0e8;};(function(_0x553862){_0x553862['fn'][_0xd4de('0x0')]=_0x553862['fn'][_0xd4de('0x1')];}(jQuery));function qd_number_format(_0x1fa334,_0x2349f5,_0x377530,_0x1b2252){_0x1fa334=(_0x1fa334+'')[_0xd4de('0x2')](/[^0-9+\-Ee.]/g,'');_0x1fa334=isFinite(+_0x1fa334)?+_0x1fa334:0x0;_0x2349f5=isFinite(+_0x2349f5)?Math[_0xd4de('0x3')](_0x2349f5):0x0;_0x1b2252=_0xd4de('0x4')===typeof _0x1b2252?',':_0x1b2252;_0x377530=_0xd4de('0x4')===typeof _0x377530?'.':_0x377530;var _0x23e5b9='',_0x23e5b9=function(_0x2433b8,_0x15eb91){var _0x2349f5=Math[_0xd4de('0x5')](0xa,_0x15eb91);return''+(Math[_0xd4de('0x6')](_0x2433b8*_0x2349f5)/_0x2349f5)['toFixed'](_0x15eb91);},_0x23e5b9=(_0x2349f5?_0x23e5b9(_0x1fa334,_0x2349f5):''+Math[_0xd4de('0x6')](_0x1fa334))['split']('.');0x3<_0x23e5b9[0x0]['length']&&(_0x23e5b9[0x0]=_0x23e5b9[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x1b2252));(_0x23e5b9[0x1]||'')[_0xd4de('0x7')]<_0x2349f5&&(_0x23e5b9[0x1]=_0x23e5b9[0x1]||'',_0x23e5b9[0x1]+=Array(_0x2349f5-_0x23e5b9[0x1][_0xd4de('0x7')]+0x1)['join']('0'));return _0x23e5b9['join'](_0x377530);};'function'!==typeof String[_0xd4de('0x8')]['trim']&&(String[_0xd4de('0x8')][_0xd4de('0x9')]=function(){return this[_0xd4de('0x2')](/^\s+|\s+$/g,'');});_0xd4de('0xa')!=typeof String[_0xd4de('0x8')][_0xd4de('0xb')]&&(String[_0xd4de('0x8')][_0xd4de('0xb')]=function(){return this[_0xd4de('0xc')](0x0)[_0xd4de('0xd')]()+this[_0xd4de('0xe')](0x1)[_0xd4de('0xf')]();});(function(_0x164ca0){if(_0xd4de('0xa')!==typeof _0x164ca0[_0xd4de('0x10')]){var _0xa7c18b={};_0x164ca0[_0xd4de('0x11')]=_0xa7c18b;0x96>parseInt((_0x164ca0['fn']['jquery']['replace'](/[^0-9]+/g,'')+_0xd4de('0x12'))[_0xd4de('0xe')](0x0,0x3),0xa)&&console&&_0xd4de('0xa')==typeof console[_0xd4de('0x13')]&&console['error']();_0x164ca0['qdAjax']=function(_0x1e91d5){try{var _0x54b757=_0x164ca0[_0xd4de('0x14')]({},{'url':'','type':_0xd4de('0x15'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x1e91d5);var _0x50b9e3=_0xd4de('0x16')===typeof _0x54b757['data']?JSON[_0xd4de('0x17')](_0x54b757[_0xd4de('0x18')]):_0x54b757[_0xd4de('0x18')][_0xd4de('0x19')]();var _0x5368f5=encodeURIComponent(_0x54b757[_0xd4de('0x1a')]+'|'+_0x54b757[_0xd4de('0x1b')]+'|'+_0x50b9e3);_0xa7c18b[_0x5368f5]=_0xa7c18b[_0x5368f5]||{};_0xd4de('0x4')==typeof _0xa7c18b[_0x5368f5][_0xd4de('0x1c')]?_0xa7c18b[_0x5368f5][_0xd4de('0x1c')]=_0x164ca0[_0xd4de('0x1d')](_0x54b757):(_0xa7c18b[_0x5368f5][_0xd4de('0x1c')][_0xd4de('0x1e')](_0x54b757[_0xd4de('0x1f')]),_0xa7c18b[_0x5368f5][_0xd4de('0x1c')]['fail'](_0x54b757[_0xd4de('0x13')]),_0xa7c18b[_0x5368f5][_0xd4de('0x1c')][_0xd4de('0x20')](_0x54b757[_0xd4de('0x21')]));_0xa7c18b[_0x5368f5][_0xd4de('0x1c')][_0xd4de('0x20')](function(){isNaN(parseInt(_0x54b757[_0xd4de('0x22')]))||setTimeout(function(){_0xa7c18b[_0x5368f5][_0xd4de('0x1c')]=void 0x0;},_0x54b757[_0xd4de('0x22')]);});return _0xa7c18b[_0x5368f5][_0xd4de('0x1c')];}catch(_0x2ea712){_0xd4de('0x4')!==typeof console&&'function'===typeof console[_0xd4de('0x13')]&&console[_0xd4de('0x13')]('Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20'+_0x2ea712[_0xd4de('0x23')]);}};_0x164ca0['qdAjax'][_0xd4de('0x24')]=_0xd4de('0x25');}}(jQuery));(function(_0x15d2b7){_0x15d2b7['fn']['getParent']=_0x15d2b7['fn'][_0xd4de('0x1')];}(jQuery));(function(){var _0x36f2f1=jQuery;if(_0xd4de('0xa')!==typeof _0x36f2f1['fn']['simpleCart']){_0x36f2f1(function(){var _0x3615b8=vtexjs[_0xd4de('0x26')]['getOrderForm'];vtexjs['checkout']['getOrderForm']=function(){return _0x3615b8[_0xd4de('0x27')]();};});try{window['QuatroDigital_simpleCart']=window[_0xd4de('0x28')]||{};window[_0xd4de('0x28')][_0xd4de('0x29')]=!0x1;_0x36f2f1['fn'][_0xd4de('0x2a')]=function(_0x4d3380,_0x3fe6c8,_0xcd6312){var _0x4e43a1=function(_0x133a43,_0x1d86fc){if('object'===typeof console){var _0x5d669e=_0xd4de('0x16')===typeof _0x133a43;_0xd4de('0x4')!==typeof _0x1d86fc&&_0xd4de('0x2b')===_0x1d86fc[_0xd4de('0xf')]()?_0x5d669e?console['warn'](_0xd4de('0x2c'),_0x133a43[0x0],_0x133a43[0x1],_0x133a43[0x2],_0x133a43[0x3],_0x133a43[0x4],_0x133a43[0x5],_0x133a43[0x6],_0x133a43[0x7]):console[_0xd4de('0x2d')]('[Simple\x20Cart]\x0a'+_0x133a43):_0xd4de('0x4')!==typeof _0x1d86fc&&_0xd4de('0x2e')===_0x1d86fc[_0xd4de('0xf')]()?_0x5d669e?console[_0xd4de('0x2e')](_0xd4de('0x2c'),_0x133a43[0x0],_0x133a43[0x1],_0x133a43[0x2],_0x133a43[0x3],_0x133a43[0x4],_0x133a43[0x5],_0x133a43[0x6],_0x133a43[0x7]):console[_0xd4de('0x2e')]('[Simple\x20Cart]\x0a'+_0x133a43):_0x5d669e?console['error'](_0xd4de('0x2c'),_0x133a43[0x0],_0x133a43[0x1],_0x133a43[0x2],_0x133a43[0x3],_0x133a43[0x4],_0x133a43[0x5],_0x133a43[0x6],_0x133a43[0x7]):console[_0xd4de('0x13')](_0xd4de('0x2c')+_0x133a43);}};var _0x4d6259=_0x36f2f1(this);_0xd4de('0x16')===typeof _0x4d3380?_0x3fe6c8=_0x4d3380:(_0x4d3380=_0x4d3380||!0x1,_0x4d6259=_0x4d6259[_0xd4de('0x2f')](_0x36f2f1['QD_simpleCart'][_0xd4de('0x30')]));if(!_0x4d6259[_0xd4de('0x7')])return _0x4d6259;_0x36f2f1[_0xd4de('0x31')][_0xd4de('0x30')]=_0x36f2f1['QD_simpleCart']['elements'][_0xd4de('0x2f')](_0x4d6259);_0xcd6312='undefined'===typeof _0xcd6312?!0x1:_0xcd6312;var _0x3e5e34={'cartQtt':'.qd_cart_qtt','cartTotal':_0xd4de('0x32'),'itemsText':_0xd4de('0x33'),'currencySymbol':(_0x36f2f1(_0xd4de('0x34'))[_0xd4de('0x35')]('content')||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x21209d=_0x36f2f1['extend']({},_0x3e5e34,_0x3fe6c8);var _0xbee33=_0x36f2f1('');_0x4d6259[_0xd4de('0x36')](function(){var _0x7f17b9=_0x36f2f1(this);_0x7f17b9[_0xd4de('0x18')](_0xd4de('0x37'))||_0x7f17b9[_0xd4de('0x18')](_0xd4de('0x37'),_0x21209d);});var _0x4ba399=function(_0x2333f6){window[_0xd4de('0x38')]=window[_0xd4de('0x38')]||{};for(var _0x4d3380=0x0,_0x13d673=0x0,_0x567294=0x0;_0x567294<_0x2333f6[_0xd4de('0x39')][_0xd4de('0x7')];_0x567294++)_0xd4de('0x3a')==_0x2333f6['totalizers'][_0x567294]['id']&&(_0x13d673+=_0x2333f6[_0xd4de('0x39')][_0x567294][_0xd4de('0x3b')]),_0x4d3380+=_0x2333f6[_0xd4de('0x39')][_0x567294]['value'];window[_0xd4de('0x38')][_0xd4de('0x3c')]=_0x21209d[_0xd4de('0x3d')]+qd_number_format(_0x4d3380/0x64,0x2,',','.');window[_0xd4de('0x38')][_0xd4de('0x3e')]=_0x21209d[_0xd4de('0x3d')]+qd_number_format(_0x13d673/0x64,0x2,',','.');window[_0xd4de('0x38')]['allTotal']=_0x21209d[_0xd4de('0x3d')]+qd_number_format((_0x4d3380+_0x13d673)/0x64,0x2,',','.');window[_0xd4de('0x38')][_0xd4de('0x3f')]=0x0;if(_0x21209d['showQuantityByItems'])for(_0x567294=0x0;_0x567294<_0x2333f6[_0xd4de('0x40')][_0xd4de('0x7')];_0x567294++)window[_0xd4de('0x38')]['qtt']+=_0x2333f6['items'][_0x567294][_0xd4de('0x41')];else window[_0xd4de('0x38')]['qtt']=_0x2333f6[_0xd4de('0x40')][_0xd4de('0x7')]||0x0;try{window[_0xd4de('0x38')][_0xd4de('0x42')]&&window['_QuatroDigital_CartData'][_0xd4de('0x42')][_0xd4de('0x43')]&&window[_0xd4de('0x38')][_0xd4de('0x42')][_0xd4de('0x43')]();}catch(_0x1cbca6){_0x4e43a1('Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart');}_0x2deedb(_0xbee33);};var _0x2f775c=function(_0x3e49a8,_0x38fc29){0x1===_0x3e49a8?_0x38fc29[_0xd4de('0x44')]()[_0xd4de('0x45')](_0xd4de('0x46'))[_0xd4de('0x47')]():_0x38fc29[_0xd4de('0x44')]()[_0xd4de('0x45')](_0xd4de('0x48'))['show']();};var _0x165a18=function(_0x652ad9){0x1>_0x652ad9?_0x4d6259[_0xd4de('0x49')]('qd-emptyCart'):_0x4d6259[_0xd4de('0x4a')](_0xd4de('0x4b'));};var _0x299bf3=function(_0x1a32cf,_0x42e58e){var _0xa24bb7=parseInt(window[_0xd4de('0x38')][_0xd4de('0x3f')],0xa);_0x42e58e[_0xd4de('0x4c')][_0xd4de('0x47')]();isNaN(_0xa24bb7)&&(_0x4e43a1('O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.',_0xd4de('0x2b')),_0xa24bb7=0x0);_0x42e58e[_0xd4de('0x4d')][_0xd4de('0x4e')](window[_0xd4de('0x38')][_0xd4de('0x3c')]);_0x42e58e['cartQttE']['html'](_0xa24bb7);_0x2f775c(_0xa24bb7,_0x42e58e[_0xd4de('0x4f')]);_0x165a18(_0xa24bb7);};var _0x2deedb=function(_0x4f9b6b){_0x4d6259['each'](function(){var _0x2d8589={};var _0x368081=_0x36f2f1(this);_0x4d3380&&_0x368081[_0xd4de('0x18')](_0xd4de('0x37'))&&_0x36f2f1[_0xd4de('0x14')](_0x21209d,_0x368081[_0xd4de('0x18')](_0xd4de('0x37')));_0x2d8589[_0xd4de('0x4c')]=_0x368081;_0x2d8589[_0xd4de('0x50')]=_0x368081[_0xd4de('0x51')](_0x21209d[_0xd4de('0x52')])||_0xbee33;_0x2d8589[_0xd4de('0x4d')]=_0x368081['find'](_0x21209d[_0xd4de('0x53')])||_0xbee33;_0x2d8589[_0xd4de('0x4f')]=_0x368081[_0xd4de('0x51')](_0x21209d[_0xd4de('0x54')])||_0xbee33;_0x2d8589[_0xd4de('0x55')]=_0x368081[_0xd4de('0x51')](_0x21209d['emptyCart'])||_0xbee33;_0x299bf3(_0x4f9b6b,_0x2d8589);_0x368081[_0xd4de('0x49')]('qd-sc-populated');});};(function(){if(_0x21209d['smartCheckout']){window[_0xd4de('0x56')]=window[_0xd4de('0x56')]||{};if(_0xd4de('0x4')!==typeof window[_0xd4de('0x56')]['getOrderForm']&&(_0xcd6312||!_0x4d3380))return _0x4ba399(window[_0xd4de('0x56')][_0xd4de('0x57')]);if(_0xd4de('0x16')!==typeof window[_0xd4de('0x58')]||_0xd4de('0x4')===typeof window['vtexjs']['checkout'])if('object'===typeof vtex&&_0xd4de('0x16')===typeof vtex[_0xd4de('0x26')]&&_0xd4de('0x4')!==typeof vtex[_0xd4de('0x26')]['SDK'])new vtex[(_0xd4de('0x26'))][(_0xd4de('0x59'))]();else return _0x4e43a1(_0xd4de('0x5a'));_0x36f2f1[_0xd4de('0x5b')](['items',_0xd4de('0x39'),_0xd4de('0x5c')],{'done':function(_0x1d9bf6){_0x4ba399(_0x1d9bf6);window[_0xd4de('0x56')]['getOrderForm']=_0x1d9bf6;},'fail':function(_0x4fd7c2){_0x4e43a1(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.',_0x4fd7c2]);}});}else alert(_0xd4de('0x5d'));}());_0x21209d[_0xd4de('0x42')]();_0x36f2f1(window)[_0xd4de('0x5e')]('simpleCartCallback.quatro_digital');return _0x4d6259;};_0x36f2f1[_0xd4de('0x31')]={'elements':_0x36f2f1('')};_0x36f2f1(function(){var _0x3005c2;_0xd4de('0xa')===typeof window['ajaxRequestbuyButtonAsynchronous']&&(_0x3005c2=window[_0xd4de('0x5f')],window['ajaxRequestbuyButtonAsynchronous']=function(_0x2ee7c1,_0x9b4fc,_0x3e15ce,_0x296570,_0x9b082d){_0x3005c2[_0xd4de('0x27')](this,_0x2ee7c1,_0x9b4fc,_0x3e15ce,_0x296570,function(){_0xd4de('0xa')===typeof _0x9b082d&&_0x9b082d();_0x36f2f1[_0xd4de('0x31')]['elements'][_0xd4de('0x36')](function(){var _0x59f9d9=_0x36f2f1(this);_0x59f9d9[_0xd4de('0x2a')](_0x59f9d9[_0xd4de('0x18')]('qd_simpleCartOpts'));});});});});var _0x29c840=window[_0xd4de('0x60')]||void 0x0;window[_0xd4de('0x60')]=function(_0x4652b9){_0x36f2f1['fn'][_0xd4de('0x2a')](!0x0);_0xd4de('0xa')===typeof _0x29c840?_0x29c840[_0xd4de('0x27')](this,_0x4652b9):alert(_0x4652b9);};_0x36f2f1(function(){var _0x8ab93b=_0x36f2f1(_0xd4de('0x61'));_0x8ab93b[_0xd4de('0x7')]&&_0x8ab93b[_0xd4de('0x2a')]();});_0x36f2f1(function(){_0x36f2f1(window)[_0xd4de('0x62')](_0xd4de('0x63'),function(){_0x36f2f1['fn']['simpleCart'](!0x0);});});}catch(_0x38d703){_0xd4de('0x4')!==typeof console&&_0xd4de('0xa')===typeof console[_0xd4de('0x13')]&&console[_0xd4de('0x13')](_0xd4de('0x64'),_0x38d703);}}}());(function(){var _0x26bf55=function(_0x59b936,_0x5ad8a2){if(_0xd4de('0x16')===typeof console){var _0x41b3ec='object'===typeof _0x59b936;'undefined'!==typeof _0x5ad8a2&&'alerta'===_0x5ad8a2['toLowerCase']()?_0x41b3ec?console[_0xd4de('0x2d')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x59b936[0x0],_0x59b936[0x1],_0x59b936[0x2],_0x59b936[0x3],_0x59b936[0x4],_0x59b936[0x5],_0x59b936[0x6],_0x59b936[0x7]):console[_0xd4de('0x2d')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a'+_0x59b936):_0xd4de('0x4')!==typeof _0x5ad8a2&&_0xd4de('0x2e')===_0x5ad8a2['toLowerCase']()?_0x41b3ec?console['info']('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x59b936[0x0],_0x59b936[0x1],_0x59b936[0x2],_0x59b936[0x3],_0x59b936[0x4],_0x59b936[0x5],_0x59b936[0x6],_0x59b936[0x7]):console['info'](_0xd4de('0x65')+_0x59b936):_0x41b3ec?console[_0xd4de('0x13')](_0xd4de('0x65'),_0x59b936[0x0],_0x59b936[0x1],_0x59b936[0x2],_0x59b936[0x3],_0x59b936[0x4],_0x59b936[0x5],_0x59b936[0x6],_0x59b936[0x7]):console[_0xd4de('0x13')](_0xd4de('0x65')+_0x59b936);}},_0x3fdd63=null,_0x574939={},_0xbe1141={},_0x538d98={};$[_0xd4de('0x5b')]=function(_0x574c46,_0x5c651b){if(null===_0x3fdd63)if('object'===typeof window[_0xd4de('0x58')]&&_0xd4de('0x4')!==typeof window['vtexjs'][_0xd4de('0x26')])_0x3fdd63=window['vtexjs'][_0xd4de('0x26')];else return _0x26bf55('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js');var _0x46b3c2=$[_0xd4de('0x14')]({'done':function(){},'fail':function(){}},_0x5c651b),_0x3f55cb=_0x574c46['join'](';'),_0x573cb3=function(){_0x574939[_0x3f55cb][_0xd4de('0x2f')](_0x46b3c2[_0xd4de('0x1e')]);_0xbe1141[_0x3f55cb][_0xd4de('0x2f')](_0x46b3c2[_0xd4de('0x66')]);};_0x538d98[_0x3f55cb]?_0x573cb3():(_0x574939[_0x3f55cb]=$['Callbacks'](),_0xbe1141[_0x3f55cb]=$[_0xd4de('0x67')](),_0x573cb3(),_0x538d98[_0x3f55cb]=!0x0,_0x3fdd63[_0xd4de('0x57')](_0x574c46)[_0xd4de('0x1e')](function(_0x44c260){_0x538d98[_0x3f55cb]=!0x1;_0x574939[_0x3f55cb][_0xd4de('0x43')](_0x44c260);})[_0xd4de('0x66')](function(_0xb10dbb){_0x538d98[_0x3f55cb]=!0x1;_0xbe1141[_0x3f55cb][_0xd4de('0x43')](_0xb10dbb);}));};}());(function(_0x907138){try{var _0x227c9a=jQuery,_0xc908e9,_0x396f9f=_0x227c9a({}),_0x35192e=function(_0x1c2c25,_0x5d46d3){if('object'===typeof console&&_0xd4de('0x4')!==typeof console[_0xd4de('0x13')]&&'undefined'!==typeof console[_0xd4de('0x2e')]&&_0xd4de('0x4')!==typeof console[_0xd4de('0x2d')]){var _0x286126;'object'===typeof _0x1c2c25?(_0x1c2c25[_0xd4de('0x68')](_0xd4de('0x69')),_0x286126=_0x1c2c25):_0x286126=[_0xd4de('0x69')+_0x1c2c25];if(_0xd4de('0x4')===typeof _0x5d46d3||_0xd4de('0x2b')!==_0x5d46d3['toLowerCase']()&&'aviso'!==_0x5d46d3['toLowerCase']())if('undefined'!==typeof _0x5d46d3&&_0xd4de('0x2e')===_0x5d46d3['toLowerCase']())try{console[_0xd4de('0x2e')]['apply'](console,_0x286126);}catch(_0x2ec967){try{console[_0xd4de('0x2e')](_0x286126[_0xd4de('0x6a')]('\x0a'));}catch(_0x30dca3){}}else try{console[_0xd4de('0x13')][_0xd4de('0x6b')](console,_0x286126);}catch(_0x15f056){try{console[_0xd4de('0x13')](_0x286126['join']('\x0a'));}catch(_0x2c0f32){}}else try{console[_0xd4de('0x2d')][_0xd4de('0x6b')](console,_0x286126);}catch(_0x178ce8){try{console['warn'](_0x286126[_0xd4de('0x6a')]('\x0a'));}catch(_0x32ec68){}}}},_0x573039={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':'.productInformationWrapper\x20\x20a.buy-button','buyQtt':_0xd4de('0x6c'),'selectSkuMsg':_0xd4de('0x6d'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x38d5bc,_0x2b7a9f,_0x1a0ac5){_0x227c9a(_0xd4de('0x6e'))['is'](_0xd4de('0x6f'))&&(_0xd4de('0x1f')===_0x2b7a9f?alert(_0xd4de('0x70')):(alert(_0xd4de('0x71')),(_0xd4de('0x16')===typeof parent?parent:document)['location'][_0xd4de('0x72')]=_0x1a0ac5));},'isProductPage':function(){return _0x227c9a('body')['is'](_0xd4de('0x73'));},'execDefaultAction':function(_0x266d35){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x227c9a[_0xd4de('0x74')]=function(_0x529e8a,_0x2d40b3){function _0x1cab80(_0x4e7c2e){_0xc908e9[_0xd4de('0x75')]?_0x4e7c2e[_0xd4de('0x18')](_0xd4de('0x76'))||(_0x4e7c2e[_0xd4de('0x18')](_0xd4de('0x76'),0x1),_0x4e7c2e['on'](_0xd4de('0x77'),function(_0x51a6dd){if(!_0xc908e9[_0xd4de('0x78')]())return!0x0;if(!0x0!==_0x4f1deb[_0xd4de('0x79')]['call'](this))return _0x51a6dd[_0xd4de('0x7a')](),!0x1;})):alert(_0xd4de('0x7b'));}function _0x44c08e(_0x3c216a){_0x3c216a=_0x3c216a||_0x227c9a(_0xc908e9['buyButton']);_0x3c216a['each'](function(){var _0x3c216a=_0x227c9a(this);_0x3c216a['is'](_0xd4de('0x7c'))||(_0x3c216a[_0xd4de('0x49')](_0xd4de('0x7d')),_0x3c216a['is']('.btn-add-buy-button-asynchronous')&&!_0x3c216a['is'](_0xd4de('0x7e'))||_0x3c216a[_0xd4de('0x18')](_0xd4de('0x7f'))||(_0x3c216a[_0xd4de('0x18')]('qd-bb-active',0x1),_0x3c216a['children'](_0xd4de('0x80'))['length']||_0x3c216a[_0xd4de('0x81')](_0xd4de('0x82')),_0x3c216a['is'](_0xd4de('0x83'))&&_0xc908e9[_0xd4de('0x84')]()&&_0x1e5350['call'](_0x3c216a),_0x1cab80(_0x3c216a)));});_0xc908e9['isProductPage']()&&!_0x3c216a[_0xd4de('0x7')]&&_0x35192e(_0xd4de('0x85')+_0x3c216a['selector']+'\x27.','info');}var _0x2a0a0c=_0x227c9a(_0x529e8a);var _0x4f1deb=this;window[_0xd4de('0x86')]=window['_Quatro_Digital_dropDown']||{};window[_0xd4de('0x38')]=window[_0xd4de('0x38')]||{};_0x4f1deb['prodAdd']=function(_0x882208,_0x5d32bb){_0x2a0a0c[_0xd4de('0x49')](_0xd4de('0x87'));_0x227c9a('body')[_0xd4de('0x49')](_0xd4de('0x88'));var _0x1e2a39=_0x227c9a(_0xc908e9[_0xd4de('0x89')])[_0xd4de('0x45')](_0xd4de('0x8a')+(_0x882208['attr'](_0xd4de('0x72'))||_0xd4de('0x8b'))+'\x27]')[_0xd4de('0x2f')](_0x882208);_0x1e2a39[_0xd4de('0x49')](_0xd4de('0x8c'));setTimeout(function(){_0x2a0a0c[_0xd4de('0x4a')]('qd-bb-itemAddCartWrapper');_0x1e2a39[_0xd4de('0x4a')]('qd-bb-itemAddBuyButtonWrapper');},_0xc908e9[_0xd4de('0x8d')]);window[_0xd4de('0x86')][_0xd4de('0x57')]=void 0x0;if(_0xd4de('0x4')!==typeof _0x2d40b3&&_0xd4de('0xa')===typeof _0x2d40b3[_0xd4de('0x8e')])return _0xc908e9[_0xd4de('0x75')]||(_0x35192e(_0xd4de('0x8f')),_0x2d40b3[_0xd4de('0x8e')]()),window[_0xd4de('0x56')][_0xd4de('0x57')]=void 0x0,_0x2d40b3[_0xd4de('0x8e')](function(_0xb27d81){window[_0xd4de('0x86')]['getOrderForm']=_0xb27d81;_0x227c9a['fn'][_0xd4de('0x2a')](!0x0,void 0x0,!0x0);},{'lastSku':_0x5d32bb});window[_0xd4de('0x86')][_0xd4de('0x90')]=!0x0;_0x227c9a['fn'][_0xd4de('0x2a')](!0x0);};(function(){if(_0xc908e9[_0xd4de('0x75')]&&_0xc908e9[_0xd4de('0x91')]){var _0x4eb28d=_0x227c9a(_0xd4de('0x92'));_0x4eb28d[_0xd4de('0x7')]&&_0x44c08e(_0x4eb28d);}}());var _0x1e5350=function(){var _0x37f086=_0x227c9a(this);'undefined'!==typeof _0x37f086['data'](_0xd4de('0x89'))?(_0x37f086['unbind']('click'),_0x1cab80(_0x37f086)):(_0x37f086['bind']('mouseenter.qd_bb_buy_sc',function(_0x47acfb){_0x37f086['unbind']('click');_0x1cab80(_0x37f086);_0x227c9a(this)[_0xd4de('0x93')](_0x47acfb);}),_0x227c9a(window)[_0xd4de('0x94')](function(){_0x37f086[_0xd4de('0x93')]('click');_0x1cab80(_0x37f086);_0x37f086[_0xd4de('0x93')](_0xd4de('0x95'));}));};_0x4f1deb[_0xd4de('0x79')]=function(){var _0x1e35ba=_0x227c9a(this),_0x529e8a=_0x1e35ba[_0xd4de('0x35')](_0xd4de('0x72'))||'';if(-0x1<_0x529e8a['indexOf'](_0xc908e9[_0xd4de('0x96')]))return!0x0;_0x529e8a=_0x529e8a[_0xd4de('0x2')](/redirect\=(false|true)/gi,'')[_0xd4de('0x2')]('?',_0xd4de('0x97'))[_0xd4de('0x2')](/\&\&/gi,'&');if(_0xc908e9[_0xd4de('0x98')](_0x1e35ba))return _0x1e35ba[_0xd4de('0x35')](_0xd4de('0x72'),_0x529e8a[_0xd4de('0x2')]('redirect=false',_0xd4de('0x99'))),!0x0;_0x529e8a=_0x529e8a[_0xd4de('0x2')](/http.?:/i,'');_0x396f9f[_0xd4de('0x9a')](function(_0x33ea46){if(!_0xc908e9[_0xd4de('0x9b')]&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0xd4de('0x9c')](_0x529e8a))return _0x33ea46();var _0x167bf3=function(_0x2f45af,_0x2dcf97){var _0x44c08e=_0x529e8a['match'](/sku\=([0-9]+)/gi),_0x3b629b=[];if(_0xd4de('0x16')===typeof _0x44c08e&&null!==_0x44c08e)for(var _0x5ca41a=_0x44c08e[_0xd4de('0x7')]-0x1;0x0<=_0x5ca41a;_0x5ca41a--){var _0x5b4c7f=parseInt(_0x44c08e[_0x5ca41a]['replace'](/sku\=/gi,''));isNaN(_0x5b4c7f)||_0x3b629b['push'](_0x5b4c7f);}_0xc908e9[_0xd4de('0x9d')][_0xd4de('0x27')](this,_0x2f45af,_0x2dcf97,_0x529e8a);_0x4f1deb[_0xd4de('0x9e')]['call'](this,_0x2f45af,_0x2dcf97,_0x529e8a,_0x3b629b);_0x4f1deb[_0xd4de('0x9f')](_0x1e35ba,_0x529e8a[_0xd4de('0xa0')](_0xd4de('0xa1'))['pop']()[_0xd4de('0xa0')]('&')[_0xd4de('0xa2')]());_0xd4de('0xa')===typeof _0xc908e9['asyncCallback']&&_0xc908e9['asyncCallback'][_0xd4de('0x27')](this);_0x227c9a(window)['trigger']('productAddedToCart');_0x227c9a(window)[_0xd4de('0x5e')](_0xd4de('0xa3'));};_0xc908e9[_0xd4de('0xa4')]?(_0x167bf3(null,'success'),_0x33ea46()):_0x227c9a['ajax']({'url':_0x529e8a,'complete':_0x167bf3})[_0xd4de('0x20')](function(){_0x33ea46();});});};_0x4f1deb['buyButtonClickCallback']=function(_0x4faaff,_0x3904d7,_0x148e8f,_0xd3edb2){try{_0xd4de('0x1f')===_0x3904d7&&_0xd4de('0x16')===typeof window[_0xd4de('0xa5')]&&_0xd4de('0xa')===typeof window[_0xd4de('0xa5')][_0xd4de('0xa6')]&&window['parent'][_0xd4de('0xa6')](_0x4faaff,_0x3904d7,_0x148e8f,_0xd3edb2);}catch(_0x525bc9){_0x35192e(_0xd4de('0xa7'));}};_0x44c08e();_0xd4de('0xa')===typeof _0xc908e9[_0xd4de('0x42')]?_0xc908e9[_0xd4de('0x42')][_0xd4de('0x27')](this):_0x35192e('Callback\x20não\x20é\x20uma\x20função');};var _0x567abe=_0x227c9a['Callbacks']();_0x227c9a['fn'][_0xd4de('0x74')]=function(_0x51e7f3,_0x532daf){var _0x907138=_0x227c9a(this);'undefined'!==typeof _0x532daf||'object'!==typeof _0x51e7f3||_0x51e7f3 instanceof _0x227c9a||(_0x532daf=_0x51e7f3,_0x51e7f3=void 0x0);_0xc908e9=_0x227c9a[_0xd4de('0x14')]({},_0x573039,_0x532daf);var _0x452df8;_0x567abe[_0xd4de('0x2f')](function(){_0x907138[_0xd4de('0xa8')](_0xd4de('0xa9'))[_0xd4de('0x7')]||_0x907138['prepend'](_0xd4de('0xaa'));_0x452df8=new _0x227c9a[(_0xd4de('0x74'))](_0x907138,_0x51e7f3);});_0x567abe[_0xd4de('0x43')]();_0x227c9a(window)['on'](_0xd4de('0xab'),function(_0x53c55f,_0x42cca3,_0x6cec25){_0x452df8[_0xd4de('0x9f')](_0x42cca3,_0x6cec25);});return _0x227c9a['extend'](_0x907138,_0x452df8);};var _0x4990f2=0x0;_0x227c9a(document)[_0xd4de('0xac')](function(_0x1afd3a,_0xd5044b,_0x400565){-0x1<_0x400565[_0xd4de('0x1a')]['toLowerCase']()['indexOf'](_0xd4de('0xad'))&&(_0x4990f2=(_0x400565['url'][_0xd4de('0xae')](/sku\=([0-9]+)/i)||[''])[_0xd4de('0xaf')]());});_0x227c9a(window)['bind']('productAddedToCart.qdSbbVtex',function(){_0x227c9a(window)[_0xd4de('0x5e')]('QuatroDigital.qd_bb_prod_add',[new _0x227c9a(),_0x4990f2]);});_0x227c9a(document)['ajaxStop'](function(){_0x567abe[_0xd4de('0x43')]();});}catch(_0x2bafbd){_0xd4de('0x4')!==typeof console&&'function'===typeof console[_0xd4de('0x13')]&&console['error'](_0xd4de('0x64'),_0x2bafbd);}}(this));function qd_number_format(_0x5c25be,_0xf9e3f5,_0x4a6d9f,_0x5244bd){_0x5c25be=(_0x5c25be+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x5c25be=isFinite(+_0x5c25be)?+_0x5c25be:0x0;_0xf9e3f5=isFinite(+_0xf9e3f5)?Math['abs'](_0xf9e3f5):0x0;_0x5244bd=_0xd4de('0x4')===typeof _0x5244bd?',':_0x5244bd;_0x4a6d9f='undefined'===typeof _0x4a6d9f?'.':_0x4a6d9f;var _0xe15e5e='',_0xe15e5e=function(_0x284a5f,_0x553e9a){var _0x52eb1b=Math[_0xd4de('0x5')](0xa,_0x553e9a);return''+(Math[_0xd4de('0x6')](_0x284a5f*_0x52eb1b)/_0x52eb1b)['toFixed'](_0x553e9a);},_0xe15e5e=(_0xf9e3f5?_0xe15e5e(_0x5c25be,_0xf9e3f5):''+Math[_0xd4de('0x6')](_0x5c25be))[_0xd4de('0xa0')]('.');0x3<_0xe15e5e[0x0][_0xd4de('0x7')]&&(_0xe15e5e[0x0]=_0xe15e5e[0x0][_0xd4de('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x5244bd));(_0xe15e5e[0x1]||'')['length']<_0xf9e3f5&&(_0xe15e5e[0x1]=_0xe15e5e[0x1]||'',_0xe15e5e[0x1]+=Array(_0xf9e3f5-_0xe15e5e[0x1][_0xd4de('0x7')]+0x1)[_0xd4de('0x6a')]('0'));return _0xe15e5e[_0xd4de('0x6a')](_0x4a6d9f);}(function(){try{window[_0xd4de('0x38')]=window[_0xd4de('0x38')]||{},window[_0xd4de('0x38')][_0xd4de('0x42')]=window[_0xd4de('0x38')][_0xd4de('0x42')]||$[_0xd4de('0x67')]();}catch(_0x2cbfe3){_0xd4de('0x4')!==typeof console&&_0xd4de('0xa')===typeof console['error']&&console[_0xd4de('0x13')](_0xd4de('0x64'),_0x2cbfe3[_0xd4de('0x23')]);}}());(function(_0x3db9d1){try{var _0x4ca2c2=jQuery,_0x349a87=function(_0xa73be7,_0x2fc4e9){if(_0xd4de('0x16')===typeof console&&'undefined'!==typeof console[_0xd4de('0x13')]&&_0xd4de('0x4')!==typeof console[_0xd4de('0x2e')]&&'undefined'!==typeof console[_0xd4de('0x2d')]){var _0x23d884;'object'===typeof _0xa73be7?(_0xa73be7[_0xd4de('0x68')](_0xd4de('0xb0')),_0x23d884=_0xa73be7):_0x23d884=[_0xd4de('0xb0')+_0xa73be7];if('undefined'===typeof _0x2fc4e9||_0xd4de('0x2b')!==_0x2fc4e9[_0xd4de('0xf')]()&&_0xd4de('0xb1')!==_0x2fc4e9[_0xd4de('0xf')]())if(_0xd4de('0x4')!==typeof _0x2fc4e9&&_0xd4de('0x2e')===_0x2fc4e9[_0xd4de('0xf')]())try{console['info'][_0xd4de('0x6b')](console,_0x23d884);}catch(_0x37bcc6){try{console[_0xd4de('0x2e')](_0x23d884[_0xd4de('0x6a')]('\x0a'));}catch(_0x3860b1){}}else try{console['error'][_0xd4de('0x6b')](console,_0x23d884);}catch(_0x880f8f){try{console['error'](_0x23d884[_0xd4de('0x6a')]('\x0a'));}catch(_0x3dd78a){}}else try{console[_0xd4de('0x2d')][_0xd4de('0x6b')](console,_0x23d884);}catch(_0x255eb8){try{console[_0xd4de('0x2d')](_0x23d884[_0xd4de('0x6a')]('\x0a'));}catch(_0x3ee828){}}}};window['_QuatroDigital_DropDown']=window[_0xd4de('0x56')]||{};window[_0xd4de('0x56')]['allowUpdate']=!0x0;_0x4ca2c2[_0xd4de('0xb2')]=function(){};_0x4ca2c2['fn']['QD_dropDownCart']=function(){return{'fn':new _0x4ca2c2()};};var _0x4c7917=function(_0x5018e8){var _0x438581={'t':_0xd4de('0xb3')};return function(_0x5244e0){var _0x4fb980=function(_0xe1a57e){return _0xe1a57e;};var _0x101ff1=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5244e0=_0x5244e0['d'+_0x101ff1[0x10]+'c'+_0x101ff1[0x11]+'m'+_0x4fb980(_0x101ff1[0x1])+'n'+_0x101ff1[0xd]]['l'+_0x101ff1[0x12]+'c'+_0x101ff1[0x0]+'ti'+_0x4fb980('o')+'n'];var _0x53da25=function(_0xb1d05e){return escape(encodeURIComponent(_0xb1d05e[_0xd4de('0x2')](/\./g,'¨')[_0xd4de('0x2')](/[a-zA-Z]/g,function(_0x23aee1){return String[_0xd4de('0xb4')](('Z'>=_0x23aee1?0x5a:0x7a)>=(_0x23aee1=_0x23aee1[_0xd4de('0xb5')](0x0)+0xd)?_0x23aee1:_0x23aee1-0x1a);})));};var _0x3db9d1=_0x53da25(_0x5244e0[[_0x101ff1[0x9],_0x4fb980('o'),_0x101ff1[0xc],_0x101ff1[_0x4fb980(0xd)]][_0xd4de('0x6a')]('')]);_0x53da25=_0x53da25((window[['js',_0x4fb980('no'),'m',_0x101ff1[0x1],_0x101ff1[0x4]['toUpperCase'](),_0xd4de('0xb6')][_0xd4de('0x6a')]('')]||_0xd4de('0x8b'))+['.v',_0x101ff1[0xd],'e',_0x4fb980('x'),'co',_0x4fb980('mm'),'erc',_0x101ff1[0x1],'.c',_0x4fb980('o'),'m.',_0x101ff1[0x13],'r']['join'](''));for(var _0x573b19 in _0x438581){if(_0x53da25===_0x573b19+_0x438581[_0x573b19]||_0x3db9d1===_0x573b19+_0x438581[_0x573b19]){var _0x1e9591='tr'+_0x101ff1[0x11]+'e';break;}_0x1e9591='f'+_0x101ff1[0x0]+'ls'+_0x4fb980(_0x101ff1[0x1])+'';}_0x4fb980=!0x1;-0x1<_0x5244e0[[_0x101ff1[0xc],'e',_0x101ff1[0x0],'rc',_0x101ff1[0x9]]['join']('')][_0xd4de('0xb7')](_0xd4de('0xb8'))&&(_0x4fb980=!0x0);return[_0x1e9591,_0x4fb980];}(_0x5018e8);}(window);if(!eval(_0x4c7917[0x0]))return _0x4c7917[0x1]?_0x349a87('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x4ca2c2['QD_dropDownCart']=function(_0x40de85,_0x55b01f){var _0x42940f=_0x4ca2c2(_0x40de85);if(!_0x42940f[_0xd4de('0x7')])return _0x42940f;var _0x2d76f1=_0x4ca2c2[_0xd4de('0x14')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0xd4de('0xb9'),'linkCheckout':_0xd4de('0xba'),'cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':_0xd4de('0xbb'),'continueShopping':'Continuar\x20Comprando','shippingForm':_0xd4de('0xbc')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x3f922b){return _0x3f922b[_0xd4de('0xbd')]||_0x3f922b[_0xd4de('0xbe')];},'callback':function(){},'callbackProductsList':function(){}},_0x55b01f);_0x4ca2c2('');var _0x474983=this;if(_0x2d76f1[_0xd4de('0xbf')]){var _0x455284=!0x1;_0xd4de('0x4')===typeof window[_0xd4de('0x58')]&&(_0x349a87(_0xd4de('0xc0')),_0x4ca2c2[_0xd4de('0x1d')]({'url':_0xd4de('0xc1'),'async':!0x1,'dataType':_0xd4de('0xc2'),'error':function(){_0x349a87(_0xd4de('0xc3'));_0x455284=!0x0;}}));if(_0x455284)return _0x349a87(_0xd4de('0xc4'));}if(_0xd4de('0x16')===typeof window[_0xd4de('0x58')]&&_0xd4de('0x4')!==typeof window[_0xd4de('0x58')][_0xd4de('0x26')])var _0x335490=window[_0xd4de('0x58')][_0xd4de('0x26')];else if(_0xd4de('0x16')===typeof vtex&&_0xd4de('0x16')===typeof vtex[_0xd4de('0x26')]&&_0xd4de('0x4')!==typeof vtex[_0xd4de('0x26')]['SDK'])_0x335490=new vtex[(_0xd4de('0x26'))][(_0xd4de('0x59'))]();else return _0x349a87(_0xd4de('0x5a'));_0x474983[_0xd4de('0xc5')]='<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>';var _0x2d1b39=function(_0x4eaeec){_0x4ca2c2(this)[_0xd4de('0x81')](_0x4eaeec);_0x4eaeec[_0xd4de('0x51')](_0xd4de('0xc6'))[_0xd4de('0x2f')](_0x4ca2c2(_0xd4de('0xc7')))['on'](_0xd4de('0xc8'),function(){_0x42940f[_0xd4de('0x4a')](_0xd4de('0xc9'));_0x4ca2c2(document[_0xd4de('0x6e')])[_0xd4de('0x4a')](_0xd4de('0x88'));});_0x4ca2c2(document)[_0xd4de('0xca')]('keyup.qd_ddc_closeFn')['on'](_0xd4de('0xcb'),function(_0x47b190){0x1b==_0x47b190[_0xd4de('0xcc')]&&(_0x42940f['removeClass'](_0xd4de('0xc9')),_0x4ca2c2(document[_0xd4de('0x6e')])[_0xd4de('0x4a')](_0xd4de('0x88')));});var _0x53f847=_0x4eaeec['find'](_0xd4de('0xcd'));_0x4eaeec[_0xd4de('0x51')](_0xd4de('0xce'))['on'](_0xd4de('0xcf'),function(){_0x474983[_0xd4de('0xd0')]('-',void 0x0,void 0x0,_0x53f847);return!0x1;});_0x4eaeec['find']('.qd-ddc-scrollDown')['on']('click.qd_ddc_scrollDown',function(){_0x474983[_0xd4de('0xd0')](void 0x0,void 0x0,void 0x0,_0x53f847);return!0x1;});_0x4eaeec[_0xd4de('0x51')](_0xd4de('0xd1'))[_0xd4de('0xd2')]('')['on'](_0xd4de('0xd3'),function(){_0x474983[_0xd4de('0xd4')](_0x4ca2c2(this));});if(_0x2d76f1['updateOnlyHover']){var _0x55b01f=0x0;_0x4ca2c2(this)['on']('mouseenter.qd_ddc_hover',function(){var _0x4eaeec=function(){window[_0xd4de('0x56')]['allowUpdate']&&(_0x474983['getCartInfoByUrl'](),window[_0xd4de('0x56')][_0xd4de('0x90')]=!0x1,_0x4ca2c2['fn']['simpleCart'](!0x0),_0x474983['cartIsEmpty']());};_0x55b01f=setInterval(function(){_0x4eaeec();},0x258);_0x4eaeec();});_0x4ca2c2(this)['on'](_0xd4de('0xd5'),function(){clearInterval(_0x55b01f);});}};var _0x584ab3=function(_0x513112){_0x513112=_0x4ca2c2(_0x513112);_0x2d76f1[_0xd4de('0xd6')][_0xd4de('0x53')]=_0x2d76f1['texts'][_0xd4de('0x53')][_0xd4de('0x2')](_0xd4de('0xd7'),_0xd4de('0xd8'));_0x2d76f1[_0xd4de('0xd6')]['cartTotal']=_0x2d76f1[_0xd4de('0xd6')][_0xd4de('0x53')][_0xd4de('0x2')](_0xd4de('0xd9'),_0xd4de('0xda'));_0x2d76f1[_0xd4de('0xd6')][_0xd4de('0x53')]=_0x2d76f1[_0xd4de('0xd6')]['cartTotal']['replace'](_0xd4de('0xdb'),'<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>');_0x2d76f1['texts'][_0xd4de('0x53')]=_0x2d76f1[_0xd4de('0xd6')][_0xd4de('0x53')][_0xd4de('0x2')](_0xd4de('0xdc'),_0xd4de('0xdd'));_0x513112[_0xd4de('0x51')]('.qd-ddc-viewCart')[_0xd4de('0x4e')](_0x2d76f1[_0xd4de('0xd6')][_0xd4de('0xde')]);_0x513112[_0xd4de('0x51')](_0xd4de('0xdf'))[_0xd4de('0x4e')](_0x2d76f1[_0xd4de('0xd6')][_0xd4de('0xe0')]);_0x513112[_0xd4de('0x51')](_0xd4de('0xe1'))[_0xd4de('0x4e')](_0x2d76f1[_0xd4de('0xd6')][_0xd4de('0xe2')]);_0x513112[_0xd4de('0x51')](_0xd4de('0xe3'))[_0xd4de('0x4e')](_0x2d76f1['texts'][_0xd4de('0x53')]);_0x513112[_0xd4de('0x51')](_0xd4de('0xe4'))[_0xd4de('0x4e')](_0x2d76f1['texts']['shippingForm']);_0x513112['find'](_0xd4de('0xe5'))[_0xd4de('0x4e')](_0x2d76f1[_0xd4de('0xd6')][_0xd4de('0xe6')]);return _0x513112;}(this[_0xd4de('0xc5')]);var _0x4f61a4=0x0;_0x42940f[_0xd4de('0x36')](function(){0x0<_0x4f61a4?_0x2d1b39['call'](this,_0x584ab3[_0xd4de('0xe7')]()):_0x2d1b39[_0xd4de('0x27')](this,_0x584ab3);_0x4f61a4++;});window['_QuatroDigital_CartData']['callback'][_0xd4de('0x2f')](function(){_0x4ca2c2('.qd-ddc-infoTotalValue')[_0xd4de('0x4e')](window[_0xd4de('0x38')][_0xd4de('0x3c')]||'--');_0x4ca2c2(_0xd4de('0xe8'))[_0xd4de('0x4e')](window[_0xd4de('0x38')][_0xd4de('0x3f')]||'0');_0x4ca2c2(_0xd4de('0xe9'))[_0xd4de('0x4e')](window[_0xd4de('0x38')]['shipping']||'--');_0x4ca2c2(_0xd4de('0xea'))[_0xd4de('0x4e')](window['_QuatroDigital_CartData'][_0xd4de('0xeb')]||'--');});var _0x4a237e=function(_0x5b8f34,_0x2b221a){if(_0xd4de('0x4')===typeof _0x5b8f34['items'])return _0x349a87(_0xd4de('0xec'));_0x474983['renderProductsList'][_0xd4de('0x27')](this,_0x2b221a);};_0x474983[_0xd4de('0x8e')]=function(_0x4cc3db,_0x158c8){_0xd4de('0x4')!=typeof _0x158c8?window[_0xd4de('0x56')][_0xd4de('0xed')]=_0x158c8:window[_0xd4de('0x56')]['dataOptionsCache']&&(_0x158c8=window[_0xd4de('0x56')]['dataOptionsCache']);setTimeout(function(){window[_0xd4de('0x56')][_0xd4de('0xed')]=void 0x0;},_0x2d76f1[_0xd4de('0x8d')]);_0x4ca2c2(_0xd4de('0xee'))['removeClass'](_0xd4de('0xef'));if(_0x2d76f1[_0xd4de('0xbf')]){var _0x55b01f=function(_0x591ae6){window['_QuatroDigital_DropDown'][_0xd4de('0x57')]=_0x591ae6;_0x4a237e(_0x591ae6,_0x158c8);_0xd4de('0x4')!==typeof window['_QuatroDigital_AmountProduct']&&_0xd4de('0xa')===typeof window[_0xd4de('0xf0')]['exec']&&window[_0xd4de('0xf0')][_0xd4de('0xf1')]['call'](this);_0x4ca2c2(_0xd4de('0xee'))[_0xd4de('0x49')](_0xd4de('0xef'));};_0xd4de('0x4')!==typeof window['_QuatroDigital_DropDown'][_0xd4de('0x57')]?(_0x55b01f(window[_0xd4de('0x56')]['getOrderForm']),_0xd4de('0xa')===typeof _0x4cc3db&&_0x4cc3db(window[_0xd4de('0x56')]['getOrderForm'])):_0x4ca2c2[_0xd4de('0x5b')]([_0xd4de('0x40'),_0xd4de('0x39'),'shippingData'],{'done':function(_0x27d7a7){_0x55b01f[_0xd4de('0x27')](this,_0x27d7a7);_0xd4de('0xa')===typeof _0x4cc3db&&_0x4cc3db(_0x27d7a7);},'fail':function(_0x16c121){_0x349a87([_0xd4de('0xf2'),_0x16c121]);}});}else alert(_0xd4de('0xf3'));};_0x474983[_0xd4de('0xf4')]=function(){var _0x17131e=_0x4ca2c2(_0xd4de('0xee'));_0x17131e['find']('.qd-ddc-prodRow')['length']?_0x17131e[_0xd4de('0x4a')](_0xd4de('0xf5')):_0x17131e[_0xd4de('0x49')]('qd-ddc-noItems');};_0x474983['renderProductsList']=function(_0x1050e6){var _0x55b01f=_0x4ca2c2('.qd-ddc-prodWrapper2');_0x55b01f[_0xd4de('0xf6')]();_0x55b01f[_0xd4de('0x36')](function(){var _0x55b01f=_0x4ca2c2(this),_0x40de85,_0x2d2984,_0x41deca=_0x4ca2c2(''),_0x2f9eb6;for(_0x2f9eb6 in window[_0xd4de('0x56')][_0xd4de('0x57')]['items'])if(_0xd4de('0x16')===typeof window['_QuatroDigital_DropDown'][_0xd4de('0x57')][_0xd4de('0x40')][_0x2f9eb6]){var _0x89bc93=window[_0xd4de('0x56')][_0xd4de('0x57')][_0xd4de('0x40')][_0x2f9eb6];var _0x44b9c3=_0x89bc93[_0xd4de('0xf7')]['replace'](/^\/|\/$/g,'')['split']('/');var _0x2e95bd=_0x4ca2c2('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0x2e95bd[_0xd4de('0x35')]({'data-sku':_0x89bc93['id'],'data-sku-index':_0x2f9eb6,'data-qd-departament':_0x44b9c3[0x0],'data-qd-category':_0x44b9c3[_0x44b9c3[_0xd4de('0x7')]-0x1]});_0x2e95bd[_0xd4de('0x49')](_0xd4de('0xf8')+_0x89bc93['availability']);_0x2e95bd['find'](_0xd4de('0xf9'))[_0xd4de('0x81')](_0x2d76f1[_0xd4de('0xbd')](_0x89bc93));_0x2e95bd[_0xd4de('0x51')](_0xd4de('0xfa'))['append'](isNaN(_0x89bc93[_0xd4de('0xfb')])?_0x89bc93[_0xd4de('0xfb')]:0x0==_0x89bc93['sellingPrice']?_0xd4de('0xfc'):(_0x4ca2c2(_0xd4de('0x34'))[_0xd4de('0x35')](_0xd4de('0xfd'))||'R$')+'\x20'+qd_number_format(_0x89bc93[_0xd4de('0xfb')]/0x64,0x2,',','.'));_0x2e95bd[_0xd4de('0x51')]('.qd-ddc-quantity')['attr']({'data-sku':_0x89bc93['id'],'data-sku-index':_0x2f9eb6})['val'](_0x89bc93[_0xd4de('0x41')]);_0x2e95bd[_0xd4de('0x51')](_0xd4de('0xfe'))[_0xd4de('0x35')]({'data-sku':_0x89bc93['id'],'data-sku-index':_0x2f9eb6});_0x474983[_0xd4de('0xff')](_0x89bc93['id'],_0x2e95bd[_0xd4de('0x51')](_0xd4de('0x100')),_0x89bc93[_0xd4de('0x101')]);_0x2e95bd[_0xd4de('0x51')](_0xd4de('0x102'))[_0xd4de('0x35')]({'data-sku':_0x89bc93['id'],'data-sku-index':_0x2f9eb6});_0x2e95bd[_0xd4de('0x103')](_0x55b01f);_0x41deca=_0x41deca[_0xd4de('0x2f')](_0x2e95bd);}try{var _0x312f02=_0x55b01f[_0xd4de('0x0')]('.qd-ddc-wrapper')[_0xd4de('0x51')]('.qd-ddc-shipping\x20input');_0x312f02[_0xd4de('0x7')]&&''==_0x312f02[_0xd4de('0xd2')]()&&window[_0xd4de('0x56')][_0xd4de('0x57')]['shippingData'][_0xd4de('0x104')]&&_0x312f02[_0xd4de('0xd2')](window[_0xd4de('0x56')]['getOrderForm'][_0xd4de('0x5c')][_0xd4de('0x104')][_0xd4de('0x105')]);}catch(_0x45cf76){_0x349a87(_0xd4de('0x106')+_0x45cf76[_0xd4de('0x23')],_0xd4de('0xb1'));}_0x474983[_0xd4de('0x107')](_0x55b01f);_0x474983[_0xd4de('0xf4')]();_0x1050e6&&_0x1050e6[_0xd4de('0x108')]&&function(){_0x2d2984=_0x41deca[_0xd4de('0x45')](_0xd4de('0x109')+_0x1050e6[_0xd4de('0x108')]+'\x27]');_0x2d2984[_0xd4de('0x7')]&&(_0x40de85=0x0,_0x41deca[_0xd4de('0x36')](function(){var _0x1050e6=_0x4ca2c2(this);if(_0x1050e6['is'](_0x2d2984))return!0x1;_0x40de85+=_0x1050e6[_0xd4de('0x10a')]();}),_0x474983[_0xd4de('0xd0')](void 0x0,void 0x0,_0x40de85,_0x55b01f[_0xd4de('0x2f')](_0x55b01f[_0xd4de('0xa5')]())),_0x41deca[_0xd4de('0x4a')](_0xd4de('0x10b')),function(_0xb6384e){_0xb6384e[_0xd4de('0x49')]('qd-ddc-lastAdded');_0xb6384e[_0xd4de('0x49')]('qd-ddc-lastAddedFixed');setTimeout(function(){_0xb6384e[_0xd4de('0x4a')](_0xd4de('0x10c'));},_0x2d76f1['timeRemoveNewItemClass']);}(_0x2d2984));}();});(function(){_QuatroDigital_DropDown['getOrderForm'][_0xd4de('0x40')][_0xd4de('0x7')]?(_0x4ca2c2(_0xd4de('0x6e'))['removeClass'](_0xd4de('0x10d'))[_0xd4de('0x49')](_0xd4de('0x10e')),setTimeout(function(){_0x4ca2c2(_0xd4de('0x6e'))['removeClass']('qd-ddc-product-add-time');},_0x2d76f1[_0xd4de('0x8d')])):_0x4ca2c2(_0xd4de('0x6e'))[_0xd4de('0x4a')](_0xd4de('0x10f'))[_0xd4de('0x49')]('qd-ddc-cart-empty');}());_0xd4de('0xa')===typeof _0x2d76f1[_0xd4de('0x110')]?_0x2d76f1[_0xd4de('0x110')][_0xd4de('0x27')](this):_0x349a87(_0xd4de('0x111'));};_0x474983['insertProdImg']=function(_0x5d1fda,_0x558505,_0x4ccac3){function _0x32dd0f(){_0x558505[_0xd4de('0x4a')](_0xd4de('0x112'))[_0xd4de('0x94')](function(){_0x4ca2c2(this)['addClass']('qd-loaded');})['attr'](_0xd4de('0x113'),_0x4ccac3);}_0x4ccac3?_0x32dd0f():isNaN(_0x5d1fda)?_0x349a87(_0xd4de('0x114'),_0xd4de('0x2b')):alert(_0xd4de('0x115'));};_0x474983[_0xd4de('0x107')]=function(_0x2421a6){var _0x1b9349=function(_0x50c3fa,_0x99e7b7){var _0x55b01f=_0x4ca2c2(_0x50c3fa);var _0xc776a5=_0x55b01f[_0xd4de('0x35')]('data-sku');var _0x40de85=_0x55b01f[_0xd4de('0x35')](_0xd4de('0x116'));if(_0xc776a5){var _0x7eb9ee=parseInt(_0x55b01f[_0xd4de('0xd2')]())||0x1;_0x474983[_0xd4de('0x117')]([_0xc776a5,_0x40de85],_0x7eb9ee,_0x7eb9ee+0x1,function(_0x2d411c){_0x55b01f['val'](_0x2d411c);'function'===typeof _0x99e7b7&&_0x99e7b7();});}};var _0x55b01f=function(_0x240704,_0x3caf35){var _0x55b01f=_0x4ca2c2(_0x240704);var _0x291cda=_0x55b01f[_0xd4de('0x35')](_0xd4de('0x118'));var _0x40de85=_0x55b01f['attr'](_0xd4de('0x116'));if(_0x291cda){var _0x18fc19=parseInt(_0x55b01f[_0xd4de('0xd2')]())||0x2;_0x474983[_0xd4de('0x117')]([_0x291cda,_0x40de85],_0x18fc19,_0x18fc19-0x1,function(_0x32b002){_0x55b01f[_0xd4de('0xd2')](_0x32b002);_0xd4de('0xa')===typeof _0x3caf35&&_0x3caf35();});}};var _0x210326=function(_0x38cc39,_0x4b9d06){var _0x55b01f=_0x4ca2c2(_0x38cc39);var _0x104eba=_0x55b01f[_0xd4de('0x35')]('data-sku');var _0x40de85=_0x55b01f['attr'](_0xd4de('0x116'));if(_0x104eba){var _0x5c58de=parseInt(_0x55b01f['val']())||0x1;_0x474983[_0xd4de('0x117')]([_0x104eba,_0x40de85],0x1,_0x5c58de,function(_0x11dba3){_0x55b01f[_0xd4de('0xd2')](_0x11dba3);'function'===typeof _0x4b9d06&&_0x4b9d06();});}};var _0x40de85=_0x2421a6[_0xd4de('0x51')](_0xd4de('0x119'));_0x40de85[_0xd4de('0x49')]('qd_on')[_0xd4de('0x36')](function(){var _0x2421a6=_0x4ca2c2(this);_0x2421a6[_0xd4de('0x51')](_0xd4de('0x11a'))['on'](_0xd4de('0x11b'),function(_0x908e74){_0x908e74['preventDefault']();_0x40de85[_0xd4de('0x49')](_0xd4de('0x11c'));_0x1b9349(_0x2421a6[_0xd4de('0x51')]('.qd-ddc-quantity'),function(){_0x40de85[_0xd4de('0x4a')](_0xd4de('0x11c'));});});_0x2421a6[_0xd4de('0x51')](_0xd4de('0x11d'))['on']('click.qd_ddc_minus',function(_0x1678c4){_0x1678c4['preventDefault']();_0x40de85[_0xd4de('0x49')](_0xd4de('0x11c'));_0x55b01f(_0x2421a6['find'](_0xd4de('0x11e')),function(){_0x40de85[_0xd4de('0x4a')](_0xd4de('0x11c'));});});_0x2421a6[_0xd4de('0x51')](_0xd4de('0x11e'))['on'](_0xd4de('0x11f'),function(){_0x40de85[_0xd4de('0x49')](_0xd4de('0x11c'));_0x210326(this,function(){_0x40de85['removeClass']('qd-loading');});});_0x2421a6[_0xd4de('0x51')](_0xd4de('0x11e'))['on'](_0xd4de('0x120'),function(_0x2a2dcb){0xd==_0x2a2dcb[_0xd4de('0xcc')]&&(_0x40de85[_0xd4de('0x49')](_0xd4de('0x11c')),_0x210326(this,function(){_0x40de85[_0xd4de('0x4a')](_0xd4de('0x11c'));}));});});_0x2421a6[_0xd4de('0x51')](_0xd4de('0x121'))['each'](function(){var _0x2421a6=_0x4ca2c2(this);_0x2421a6[_0xd4de('0x51')](_0xd4de('0xfe'))['on'](_0xd4de('0x122'),function(){_0x2421a6[_0xd4de('0x49')](_0xd4de('0x11c'));_0x474983['removeProduct'](_0x4ca2c2(this),function(_0x45fdf4){_0x45fdf4?_0x2421a6['stop'](!0x0)[_0xd4de('0x123')](function(){_0x2421a6[_0xd4de('0x124')]();_0x474983[_0xd4de('0xf4')]();}):_0x2421a6[_0xd4de('0x4a')]('qd-loading');});return!0x1;});});};_0x474983[_0xd4de('0xd4')]=function(_0x20d618){var _0x5c180f=_0x20d618[_0xd4de('0xd2')](),_0x5c180f=_0x5c180f[_0xd4de('0x2')](/[^0-9\-]/g,''),_0x5c180f=_0x5c180f[_0xd4de('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3'),_0x5c180f=_0x5c180f[_0xd4de('0x2')](/(.{9}).*/g,'$1');_0x20d618['val'](_0x5c180f);0x9<=_0x5c180f[_0xd4de('0x7')]&&(_0x20d618[_0xd4de('0x18')](_0xd4de('0x125'))!=_0x5c180f&&_0x335490['calculateShipping']({'postalCode':_0x5c180f,'country':_0xd4de('0x126')})[_0xd4de('0x1e')](function(_0x222fa6){window['_QuatroDigital_DropDown'][_0xd4de('0x57')]=_0x222fa6;_0x474983[_0xd4de('0x8e')]();})['fail'](function(_0x36a2da){_0x349a87([_0xd4de('0x127'),_0x36a2da]);updateCartData();}),_0x20d618['data'](_0xd4de('0x125'),_0x5c180f));};_0x474983[_0xd4de('0x117')]=function(_0xf67b76,_0x17acd7,_0x411428,_0x3ebf7e){function _0x3a4b51(_0x27f252){_0x27f252='boolean'!==typeof _0x27f252?!0x1:_0x27f252;_0x474983['getCartInfoByUrl']();window[_0xd4de('0x56')][_0xd4de('0x90')]=!0x1;_0x474983[_0xd4de('0xf4')]();_0xd4de('0x4')!==typeof window['_QuatroDigital_AmountProduct']&&_0xd4de('0xa')===typeof window[_0xd4de('0xf0')]['exec']&&window[_0xd4de('0xf0')]['exec']['call'](this);_0xd4de('0xa')===typeof adminCart&&adminCart();_0x4ca2c2['fn'][_0xd4de('0x2a')](!0x0,void 0x0,_0x27f252);_0xd4de('0xa')===typeof _0x3ebf7e&&_0x3ebf7e(_0x17acd7);}_0x411428=_0x411428||0x1;if(0x1>_0x411428)return _0x17acd7;if(_0x2d76f1[_0xd4de('0xbf')]){if(_0xd4de('0x4')===typeof window[_0xd4de('0x56')][_0xd4de('0x57')]['items'][_0xf67b76[0x1]])return _0x349a87(_0xd4de('0x128')+_0xf67b76[0x1]+']'),_0x17acd7;window['_QuatroDigital_DropDown'][_0xd4de('0x57')]['items'][_0xf67b76[0x1]]['quantity']=_0x411428;window['_QuatroDigital_DropDown']['getOrderForm'][_0xd4de('0x40')][_0xf67b76[0x1]][_0xd4de('0x129')]=_0xf67b76[0x1];_0x335490[_0xd4de('0x12a')]([window[_0xd4de('0x56')][_0xd4de('0x57')][_0xd4de('0x40')][_0xf67b76[0x1]]],[_0xd4de('0x40'),_0xd4de('0x39'),_0xd4de('0x5c')])[_0xd4de('0x1e')](function(_0x5a0496){window[_0xd4de('0x56')][_0xd4de('0x57')]=_0x5a0496;_0x3a4b51(!0x0);})[_0xd4de('0x66')](function(_0x3e1fb4){_0x349a87([_0xd4de('0x12b'),_0x3e1fb4]);_0x3a4b51();});}else _0x349a87(_0xd4de('0x12c'));};_0x474983[_0xd4de('0x12d')]=function(_0xbd652b,_0x4411d3){function _0x1c919c(_0x2f6084){_0x2f6084=_0xd4de('0x12e')!==typeof _0x2f6084?!0x1:_0x2f6084;_0xd4de('0x4')!==typeof window[_0xd4de('0xf0')]&&_0xd4de('0xa')===typeof window['_QuatroDigital_AmountProduct'][_0xd4de('0xf1')]&&window[_0xd4de('0xf0')][_0xd4de('0xf1')][_0xd4de('0x27')](this);_0xd4de('0xa')===typeof adminCart&&adminCart();_0x4ca2c2['fn'][_0xd4de('0x2a')](!0x0,void 0x0,_0x2f6084);_0xd4de('0xa')===typeof _0x4411d3&&_0x4411d3(_0x40de85);}var _0x40de85=!0x1,_0x32f7ff=_0x4ca2c2(_0xbd652b)['attr'](_0xd4de('0x116'));if(_0x2d76f1['smartCheckout']){if(_0xd4de('0x4')===typeof window[_0xd4de('0x56')][_0xd4de('0x57')]['items'][_0x32f7ff])return _0x349a87(_0xd4de('0x128')+_0x32f7ff+']'),_0x40de85;window[_0xd4de('0x56')][_0xd4de('0x57')][_0xd4de('0x40')][_0x32f7ff][_0xd4de('0x129')]=_0x32f7ff;_0x335490[_0xd4de('0x12f')]([window[_0xd4de('0x56')][_0xd4de('0x57')][_0xd4de('0x40')][_0x32f7ff]],[_0xd4de('0x40'),'totalizers','shippingData'])['done'](function(_0x556613){_0x40de85=!0x0;window[_0xd4de('0x56')][_0xd4de('0x57')]=_0x556613;_0x4a237e(_0x556613);_0x1c919c(!0x0);})[_0xd4de('0x66')](function(_0xfa0482){_0x349a87([_0xd4de('0x130'),_0xfa0482]);_0x1c919c();});}else alert(_0xd4de('0x131'));};_0x474983[_0xd4de('0xd0')]=function(_0x2fa7a4,_0x325a76,_0x526392,_0x4fd929){_0x4fd929=_0x4fd929||_0x4ca2c2(_0xd4de('0x132'));_0x2fa7a4=_0x2fa7a4||'+';_0x325a76=_0x325a76||0.9*_0x4fd929[_0xd4de('0x133')]();_0x4fd929['stop'](!0x0,!0x0)['animate']({'scrollTop':isNaN(_0x526392)?_0x2fa7a4+'='+_0x325a76+'px':_0x526392});};_0x2d76f1[_0xd4de('0x134')]||(_0x474983[_0xd4de('0x8e')](),_0x4ca2c2['fn']['simpleCart'](!0x0));_0x4ca2c2(window)['on'](_0xd4de('0x135'),function(){try{window[_0xd4de('0x56')][_0xd4de('0x57')]=void 0x0,_0x474983[_0xd4de('0x8e')]();}catch(_0x384428){_0x349a87(_0xd4de('0x136')+_0x384428[_0xd4de('0x23')],_0xd4de('0x137'));}});_0xd4de('0xa')===typeof _0x2d76f1[_0xd4de('0x42')]?_0x2d76f1[_0xd4de('0x42')][_0xd4de('0x27')](this):_0x349a87(_0xd4de('0x138'));};_0x4ca2c2['fn'][_0xd4de('0xb2')]=function(_0x135a01){var _0x221ac7=_0x4ca2c2(this);_0x221ac7['fn']=new _0x4ca2c2[(_0xd4de('0xb2'))](this,_0x135a01);return _0x221ac7;};}catch(_0x5a0d6a){'undefined'!==typeof console&&_0xd4de('0xa')===typeof console['error']&&console[_0xd4de('0x13')](_0xd4de('0x64'),_0x5a0d6a);}}(this));(function(_0x157916){try{var _0x301f52=jQuery;window[_0xd4de('0xf0')]=window['_QuatroDigital_AmountProduct']||{};window[_0xd4de('0xf0')][_0xd4de('0x40')]={};window[_0xd4de('0xf0')][_0xd4de('0x139')]=!0x1;window[_0xd4de('0xf0')][_0xd4de('0x13a')]=!0x1;window[_0xd4de('0xf0')][_0xd4de('0x13b')]=!0x1;var _0x20a76b=function(){if(window[_0xd4de('0xf0')][_0xd4de('0x139')]){var _0x3826c8=!0x1;var _0x157916={};window[_0xd4de('0xf0')][_0xd4de('0x40')]={};for(_0x23e795 in window[_0xd4de('0x56')][_0xd4de('0x57')]['items'])if(_0xd4de('0x16')===typeof window[_0xd4de('0x56')][_0xd4de('0x57')][_0xd4de('0x40')][_0x23e795]){var _0x57d146=window[_0xd4de('0x56')][_0xd4de('0x57')][_0xd4de('0x40')][_0x23e795];_0xd4de('0x4')!==typeof _0x57d146[_0xd4de('0x13c')]&&null!==_0x57d146[_0xd4de('0x13c')]&&''!==_0x57d146[_0xd4de('0x13c')]&&(window[_0xd4de('0xf0')][_0xd4de('0x40')]['prod_'+_0x57d146['productId']]=window[_0xd4de('0xf0')]['items'][_0xd4de('0x13d')+_0x57d146[_0xd4de('0x13c')]]||{},window[_0xd4de('0xf0')][_0xd4de('0x40')]['prod_'+_0x57d146[_0xd4de('0x13c')]]['prodId']=_0x57d146[_0xd4de('0x13c')],_0x157916[_0xd4de('0x13d')+_0x57d146[_0xd4de('0x13c')]]||(window[_0xd4de('0xf0')][_0xd4de('0x40')]['prod_'+_0x57d146[_0xd4de('0x13c')]]['qtt']=0x0),window[_0xd4de('0xf0')][_0xd4de('0x40')][_0xd4de('0x13d')+_0x57d146[_0xd4de('0x13c')]][_0xd4de('0x3f')]+=_0x57d146[_0xd4de('0x41')],_0x3826c8=!0x0,_0x157916[_0xd4de('0x13d')+_0x57d146['productId']]=!0x0);}var _0x23e795=_0x3826c8;}else _0x23e795=void 0x0;window[_0xd4de('0xf0')][_0xd4de('0x139')]&&(_0x301f52(_0xd4de('0x13e'))['remove'](),_0x301f52('.qd-bap-item-added')['removeClass'](_0xd4de('0x13f')));for(var _0x5407cd in window['_QuatroDigital_AmountProduct']['items']){_0x57d146=window[_0xd4de('0xf0')][_0xd4de('0x40')][_0x5407cd];if(_0xd4de('0x16')!==typeof _0x57d146)return;_0x157916=_0x301f52(_0xd4de('0x140')+_0x57d146[_0xd4de('0x141')]+']')[_0xd4de('0x0')]('li');if(window[_0xd4de('0xf0')][_0xd4de('0x139')]||!_0x157916[_0xd4de('0x51')](_0xd4de('0x13e'))[_0xd4de('0x7')])_0x3826c8=_0x301f52(_0xd4de('0x142')),_0x3826c8[_0xd4de('0x51')]('.qd-bap-qtt')[_0xd4de('0x4e')](_0x57d146[_0xd4de('0x3f')]),_0x57d146=_0x157916[_0xd4de('0x51')](_0xd4de('0x143')),_0x57d146[_0xd4de('0x7')]?_0x57d146[_0xd4de('0x144')](_0x3826c8)[_0xd4de('0x49')](_0xd4de('0x13f')):_0x157916[_0xd4de('0x144')](_0x3826c8);}_0x23e795&&(window[_0xd4de('0xf0')]['allowRecalculate']=!0x1);};window[_0xd4de('0xf0')][_0xd4de('0xf1')]=function(){window[_0xd4de('0xf0')]['allowRecalculate']=!0x0;_0x20a76b['call'](this);};_0x301f52(document)[_0xd4de('0x145')](function(){_0x20a76b[_0xd4de('0x27')](this);});}catch(_0x3bcc60){'undefined'!==typeof console&&_0xd4de('0xa')===typeof console['error']&&console[_0xd4de('0x13')](_0xd4de('0x64'),_0x3bcc60);}}(this));(function(){try{var _0x49390d=jQuery,_0x21e2c2,_0x5996a6={'selector':_0xd4de('0x146'),'dropDown':{},'buyButton':{}};_0x49390d[_0xd4de('0x147')]=function(_0x6f4d07){var _0xd76720={};_0x21e2c2=_0x49390d[_0xd4de('0x14')](!0x0,{},_0x5996a6,_0x6f4d07);_0x6f4d07=_0x49390d(_0x21e2c2[_0xd4de('0x148')])[_0xd4de('0xb2')](_0x21e2c2[_0xd4de('0x149')]);_0xd76720[_0xd4de('0x89')]=_0xd4de('0x4')!==typeof _0x21e2c2['dropDown'][_0xd4de('0x134')]&&!0x1===_0x21e2c2[_0xd4de('0x149')][_0xd4de('0x134')]?_0x49390d(_0x21e2c2[_0xd4de('0x148')])[_0xd4de('0x74')](_0x6f4d07['fn'],_0x21e2c2[_0xd4de('0x89')]):_0x49390d(_0x21e2c2[_0xd4de('0x148')])[_0xd4de('0x74')](_0x21e2c2[_0xd4de('0x89')]);_0xd76720['dropDown']=_0x6f4d07;return _0xd76720;};_0x49390d['fn'][_0xd4de('0x14a')]=function(){'object'===typeof console&&_0xd4de('0xa')===typeof console['info']&&console[_0xd4de('0x2e')]('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x49390d[_0xd4de('0x14a')]=_0x49390d['fn']['smartCart'];}catch(_0x1ef242){_0xd4de('0x4')!==typeof console&&'function'===typeof console[_0xd4de('0x13')]&&console[_0xd4de('0x13')](_0xd4de('0x64'),_0x1ef242);}}());

/* Quatro Digital - Product Thumbs // Carlos Vinicius // Todos os direitos reservados. */
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs();a.trigger("QuatroDigital.pt_callback",[a])}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return a.length?$.extend({},a,new b(a)):a},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0x0c6d=['click.playVideo','.ON','controlVideo','.qd-playerWrapper\x20iframe','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','attr','rel','a:not(.qd-videoLink)','click','contentWindow','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','insertThumbsIn','appendTo','trigger','QuatroDigital.pv_video_added','ajaxStop','load','ImageControl','body','.produto','undefined','[Video\x20in\x20product]\x20','info','error','qdVideoInProduct','extend','start','td.value-field.Videos:first','http','div#image','videoFieldSelector','text','replace','split','length','indexOf','youtube','push','pop','shift','youtu.be','be/','<div\x20class=\x22qd-playerWrapper\x22></div>','wrap','<div\x20class=\x22qd-playerContainer\x22></div>','fromCharCode','charCodeAt','join','toUpperCase','ite','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','html','<iframe\x20src=\x22','urlProtocol','://www.youtube.com/embed/','?wmode=transparent&rel=0&enablejsapi=1\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>','data','height','stop','fadeTo','addClass','qdpv-video-on','add','find','a:not(\x27.qd-videoLink\x27)','bind','removeAttr','style','removeClass','animate','call','string','/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27','\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/'];(function(_0x37b9c2,_0x333ffe){var _0x22af3b=function(_0x5ca17a){while(--_0x5ca17a){_0x37b9c2['push'](_0x37b9c2['shift']());}};_0x22af3b(++_0x333ffe);}(_0x0c6d,0xf7));var _0xd0c6=function(_0x58e4c1,_0x22012e){_0x58e4c1=_0x58e4c1-0x0;var _0x4ae19e=_0x0c6d[_0x58e4c1];return _0x4ae19e;};(function(_0x450f9a){$(function(){if($(document[_0xd0c6('0x0')])['is'](_0xd0c6('0x1'))){var _0xa7819f=[];var _0x42a166=function(_0x18ccf3,_0x3d5f2b){'object'===typeof console&&(_0xd0c6('0x2')!==typeof _0x3d5f2b&&'alerta'===_0x3d5f2b['toLowerCase']()?console['warn'](_0xd0c6('0x3')+_0x18ccf3):_0xd0c6('0x2')!==typeof _0x3d5f2b&&_0xd0c6('0x4')===_0x3d5f2b['toLowerCase']()?console[_0xd0c6('0x4')]('[Video\x20in\x20product]\x20'+_0x18ccf3):console[_0xd0c6('0x5')](_0xd0c6('0x3')+_0x18ccf3));};window[_0xd0c6('0x6')]=window[_0xd0c6('0x6')]||{};var _0x2bfaf4=$[_0xd0c6('0x7')](!0x0,{'insertThumbsIn':_0xd0c6('0x8'),'videoFieldSelector':_0xd0c6('0x9'),'controlVideo':!0x0,'urlProtocol':_0xd0c6('0xa')},window['qdVideoInProduct']);var _0x8f70a4=$('ul.thumbs');var _0x534e07=$(_0xd0c6('0xb'));var _0x2f2a15=$(_0x2bfaf4[_0xd0c6('0xc')])[_0xd0c6('0xd')]()[_0xd0c6('0xe')](/\;\s*/,';')[_0xd0c6('0xf')](';');for(var _0x410d58=0x0;_0x410d58<_0x2f2a15[_0xd0c6('0x10')];_0x410d58++)-0x1<_0x2f2a15[_0x410d58][_0xd0c6('0x11')](_0xd0c6('0x12'))?_0xa7819f[_0xd0c6('0x13')](_0x2f2a15[_0x410d58][_0xd0c6('0xf')]('v=')[_0xd0c6('0x14')]()[_0xd0c6('0xf')](/[&#]/)[_0xd0c6('0x15')]()):-0x1<_0x2f2a15[_0x410d58][_0xd0c6('0x11')](_0xd0c6('0x16'))&&_0xa7819f[_0xd0c6('0x13')](_0x2f2a15[_0x410d58][_0xd0c6('0xf')](_0xd0c6('0x17'))[_0xd0c6('0x14')]()[_0xd0c6('0xf')](/[\?&#]/)[_0xd0c6('0x15')]());var _0x941021=$(_0xd0c6('0x18'));_0x941021['prependTo']('#include');_0x941021[_0xd0c6('0x19')](_0xd0c6('0x1a'));_0x2f2a15=function(_0x4a761a){var _0x4cf897={'t':'nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x1f5875){var _0x45d064=function(_0x1ebce8){return _0x1ebce8;};var _0x1571b7=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x1f5875=_0x1f5875['d'+_0x1571b7[0x10]+'c'+_0x1571b7[0x11]+'m'+_0x45d064(_0x1571b7[0x1])+'n'+_0x1571b7[0xd]]['l'+_0x1571b7[0x12]+'c'+_0x1571b7[0x0]+'ti'+_0x45d064('o')+'n'];var _0x1efae9=function(_0x1f664d){return escape(encodeURIComponent(_0x1f664d[_0xd0c6('0xe')](/\./g,'¨')[_0xd0c6('0xe')](/[a-zA-Z]/g,function(_0x5f191a){return String[_0xd0c6('0x1b')](('Z'>=_0x5f191a?0x5a:0x7a)>=(_0x5f191a=_0x5f191a[_0xd0c6('0x1c')](0x0)+0xd)?_0x5f191a:_0x5f191a-0x1a);})));};var _0x56cc8a=_0x1efae9(_0x1f5875[[_0x1571b7[0x9],_0x45d064('o'),_0x1571b7[0xc],_0x1571b7[_0x45d064(0xd)]][_0xd0c6('0x1d')]('')]);_0x1efae9=_0x1efae9((window[['js',_0x45d064('no'),'m',_0x1571b7[0x1],_0x1571b7[0x4][_0xd0c6('0x1e')](),_0xd0c6('0x1f')]['join']('')]||'---')+['.v',_0x1571b7[0xd],'e',_0x45d064('x'),'co',_0x45d064('mm'),_0xd0c6('0x20'),_0x1571b7[0x1],'.c',_0x45d064('o'),'m.',_0x1571b7[0x13],'r'][_0xd0c6('0x1d')](''));for(var _0x50cb93 in _0x4cf897){if(_0x1efae9===_0x50cb93+_0x4cf897[_0x50cb93]||_0x56cc8a===_0x50cb93+_0x4cf897[_0x50cb93]){var _0x1f4716='tr'+_0x1571b7[0x11]+'e';break;}_0x1f4716='f'+_0x1571b7[0x0]+'ls'+_0x45d064(_0x1571b7[0x1])+'';}_0x45d064=!0x1;-0x1<_0x1f5875[[_0x1571b7[0xc],'e',_0x1571b7[0x0],'rc',_0x1571b7[0x9]][_0xd0c6('0x1d')]('')]['indexOf'](_0xd0c6('0x21'))&&(_0x45d064=!0x0);return[_0x1f4716,_0x45d064];}(_0x4a761a);}(window);if(!eval(_0x2f2a15[0x0]))return _0x2f2a15[0x1]?_0x42a166('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x5a3374=function(_0x2d11df,_0x15150d){'youtube'===_0x15150d&&_0x941021[_0xd0c6('0x22')](_0xd0c6('0x23')+_0x2bfaf4[_0xd0c6('0x24')]+_0xd0c6('0x25')+_0x2d11df+_0xd0c6('0x26'));_0x534e07[_0xd0c6('0x27')](_0xd0c6('0x28'),_0x534e07['data'](_0xd0c6('0x28'))||_0x534e07[_0xd0c6('0x28')]());_0x534e07[_0xd0c6('0x29')](!0x0,!0x0)[_0xd0c6('0x2a')](0x1f4,0x0,function(){$(_0xd0c6('0x0'))[_0xd0c6('0x2b')](_0xd0c6('0x2c'));});_0x941021[_0xd0c6('0x29')](!0x0,!0x0)[_0xd0c6('0x2a')](0x1f4,0x1,function(){_0x534e07[_0xd0c6('0x2d')](_0x941021)['animate']({'height':_0x941021[_0xd0c6('0x2e')]('iframe')[_0xd0c6('0x28')]()},0x2bc);});};removePlayer=function(){_0x8f70a4[_0xd0c6('0x2e')](_0xd0c6('0x2f'))[_0xd0c6('0x30')]('click.removeVideo',function(){_0x941021['stop'](!0x0,!0x0)[_0xd0c6('0x2a')](0x1f4,0x0,function(){$(this)['hide']()[_0xd0c6('0x31')](_0xd0c6('0x32'));$(_0xd0c6('0x0'))[_0xd0c6('0x33')]('qdpv-video-on');});_0x534e07[_0xd0c6('0x29')](!0x0,!0x0)[_0xd0c6('0x2a')](0x1f4,0x1,function(){var _0x1860c9=_0x534e07[_0xd0c6('0x27')](_0xd0c6('0x28'));_0x1860c9&&_0x534e07[_0xd0c6('0x34')]({'height':_0x1860c9},0x2bc);});});};var _0x16444a=function(){if(!_0x8f70a4[_0xd0c6('0x2e')]('.qd-videoItem')[_0xd0c6('0x10')])for(vId in removePlayer[_0xd0c6('0x35')](this),_0xa7819f)if(_0xd0c6('0x36')===typeof _0xa7819f[vId]&&''!==_0xa7819f[vId]){var _0x3840c3=$('<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/'+_0xa7819f[vId]+_0xd0c6('0x37')+_0xa7819f[vId]+_0xd0c6('0x38')+_0xa7819f[vId]+'/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>');_0x3840c3['find']('a')['bind'](_0xd0c6('0x39'),function(){var _0x586917=$(this);_0x8f70a4[_0xd0c6('0x2e')](_0xd0c6('0x3a'))[_0xd0c6('0x33')]('ON');_0x586917[_0xd0c6('0x2b')]('ON');0x1==_0x2bfaf4[_0xd0c6('0x3b')]?$(_0xd0c6('0x3c'))[_0xd0c6('0x10')]?(_0x5a3374[_0xd0c6('0x35')](this,'',''),$(_0xd0c6('0x3c'))[0x0]['contentWindow'][_0xd0c6('0x3d')](_0xd0c6('0x3e'),'*')):_0x5a3374[_0xd0c6('0x35')](this,_0x586917[_0xd0c6('0x3f')]('rel'),_0xd0c6('0x12')):_0x5a3374['call'](this,_0x586917[_0xd0c6('0x3f')](_0xd0c6('0x40')),'youtube');return!0x1;});0x1==_0x2bfaf4['controlVideo']&&_0x8f70a4['find'](_0xd0c6('0x41'))[_0xd0c6('0x42')](function(_0x26e2c3){$(_0xd0c6('0x3c'))['length']&&$(_0xd0c6('0x3c'))[0x0][_0xd0c6('0x43')][_0xd0c6('0x3d')](_0xd0c6('0x44'),'*');});'start'===_0x2bfaf4[_0xd0c6('0x45')]?_0x3840c3['prependTo'](_0x8f70a4):_0x3840c3[_0xd0c6('0x46')](_0x8f70a4);_0x3840c3[_0xd0c6('0x47')](_0xd0c6('0x48'),[_0xa7819f[vId],_0x3840c3]);}};$(document)[_0xd0c6('0x49')](_0x16444a);$(window)[_0xd0c6('0x4a')](_0x16444a);(function(){var _0xb1b68c=this;var _0x4a033a=window['ImageControl']||function(){};window[_0xd0c6('0x4b')]=function(_0xb6e643,_0x432996){$(_0xb6e643||'')['is']('.qd-videoLink')||(_0x4a033a[_0xd0c6('0x35')](this,_0xb6e643,_0x432996),_0x16444a[_0xd0c6('0x35')](_0xb1b68c));};}());}});}(this));

/* Quatro Digital - Mosaic Banners // Carlos Vinicius // Todos os direitos reservados */
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

