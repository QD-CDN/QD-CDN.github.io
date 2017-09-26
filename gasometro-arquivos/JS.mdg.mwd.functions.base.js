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
var _0x22c7=['.qd_productPrice:not(.qd_sp_processedItem)','forcePromotion','style','display:none\x20!important;','after','call','extend','boolean','body','.produto','trim','abs','undefined','pow','toFixed','round','split','replace','length','join','QD_SmartPrice','object','error','function','info','warn','unshift','alerta','toLowerCase','aviso','apply','text','search','.flag','.productRightColumn','strong.skuBestPrice','label.skuBestInstallmentNumber','strong.skuPrice','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','isProductPage','closest','wrapperElement','filterFlagBy','productPage','find','addClass','qd-active','qd-sp-active','.qd_sp_on,\x20.qd_sp_ignored','.qd_active','removeClass','oneFlagByItem','siblings','.qd_sp_on','qd_sp_on','isDiscountFlag','skuCorrente','skus','available','bestPrice','isSmartCheckout','qd-sp-product-unavailable','getDiscountValue','O\x20valor\x20informado\x20p/\x20o\x20desconto\x20não\x20é\x20um\x20número.','.qd_productPrice','val','Por\x20alguma\x20razão\x20não\x20consegui\x20obter\x20o\x20preço\x20deste\x20produto\x20:(','appliedDiscount','listPrice','.qd_productOldPrice','changeNativePrice','.qd-sp-display-discount','html','installments','changeInstallments','installmentValue','.qd_sp_display_installments','.qd_sp_installments','append','.qd_saveAmountPercent','prepend','changeNativeSaveAmount','skuSelected.vtex','qd_sp_processedItem','startedByWrapper','flagElement','each','not','.qd_sp_processedItem'];(function(_0x376b45,_0x5964fb){var _0x2341b3=function(_0x5a7f01){while(--_0x5a7f01){_0x376b45['push'](_0x376b45['shift']());}};_0x2341b3(++_0x5964fb);}(_0x22c7,0x6a));var _0x722c=function(_0x491ee5,_0x24dc28){_0x491ee5=_0x491ee5-0x0;var _0xf88adc=_0x22c7[_0x491ee5];return _0xf88adc;};'function'!==typeof String['prototype'][_0x722c('0x0')]&&(String['prototype'][_0x722c('0x0')]=function(){return this['replace'](/^\s+|\s+$/g,'');});function qd_number_format(_0x5be1d4,_0x1590e7,_0x7f2a21,_0x1c92b1){_0x5be1d4=(_0x5be1d4+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x5be1d4=isFinite(+_0x5be1d4)?+_0x5be1d4:0x0;_0x1590e7=isFinite(+_0x1590e7)?Math[_0x722c('0x1')](_0x1590e7):0x0;_0x1c92b1=_0x722c('0x2')===typeof _0x1c92b1?',':_0x1c92b1;_0x7f2a21=_0x722c('0x2')===typeof _0x7f2a21?'.':_0x7f2a21;var _0x1e8118='',_0x1e8118=function(_0x1502fa,_0x526b11){var _0x1590e7=Math[_0x722c('0x3')](0xa,_0x526b11);return''+(Math['round'](_0x1502fa*_0x1590e7)/_0x1590e7)[_0x722c('0x4')](_0x526b11);},_0x1e8118=(_0x1590e7?_0x1e8118(_0x5be1d4,_0x1590e7):''+Math[_0x722c('0x5')](_0x5be1d4))[_0x722c('0x6')]('.');0x3<_0x1e8118[0x0]['length']&&(_0x1e8118[0x0]=_0x1e8118[0x0][_0x722c('0x7')](/\B(?=(?:\d{3})+(?!\d))/g,_0x1c92b1));(_0x1e8118[0x1]||'')[_0x722c('0x8')]<_0x1590e7&&(_0x1e8118[0x1]=_0x1e8118[0x1]||'',_0x1e8118[0x1]+=Array(_0x1590e7-_0x1e8118[0x1]['length']+0x1)[_0x722c('0x9')]('0'));return _0x1e8118['join'](_0x7f2a21);};(function(_0x18f215){'use strict';var _0x30cddc=jQuery;if(typeof _0x30cddc['fn'][_0x722c('0xa')]==='function')return;var _0xce1942='Smart\x20Price';var _0x400254=function(_0x1dfd68,_0x1266db){if(_0x722c('0xb')===typeof console&&'function'===typeof console[_0x722c('0xc')]&&_0x722c('0xd')===typeof console[_0x722c('0xe')]&&'function'===typeof console[_0x722c('0xf')]){var _0x48f024;_0x722c('0xb')===typeof _0x1dfd68?(_0x1dfd68[_0x722c('0x10')]('['+_0xce1942+']\x0a'),_0x48f024=_0x1dfd68):_0x48f024=['['+_0xce1942+']\x0a'+_0x1dfd68];if(_0x722c('0x2')===typeof _0x1266db||_0x722c('0x11')!==_0x1266db[_0x722c('0x12')]()&&_0x722c('0x13')!==_0x1266db[_0x722c('0x12')]())if(_0x722c('0x2')!==typeof _0x1266db&&_0x722c('0xe')===_0x1266db[_0x722c('0x12')]())try{console['info'][_0x722c('0x14')](console,_0x48f024);}catch(_0x2076b1){console[_0x722c('0xe')](_0x48f024[_0x722c('0x9')]('\x0a'));}else try{console[_0x722c('0xc')]['apply'](console,_0x48f024);}catch(_0x53f486){console[_0x722c('0xc')](_0x48f024[_0x722c('0x9')]('\x0a'));}else try{console[_0x722c('0xf')][_0x722c('0x14')](console,_0x48f024);}catch(_0x2897e6){console['warn'](_0x48f024[_0x722c('0x9')]('\x0a'));}}};var _0x4e0ed9=/[0-9]+\%/i;var _0x3d3d=/[0-9\.]+(?=\%)/i;var _0x11caf9={'isDiscountFlag':function(_0x44e726){if(_0x44e726[_0x722c('0x15')]()[_0x722c('0x16')](_0x4e0ed9)>-0x1)return!![];return![];},'getDiscountValue':function(_0x468fcf){return _0x468fcf[_0x722c('0x15')]()['match'](_0x3d3d);},'startedByWrapper':![],'flagElement':_0x722c('0x17'),'wrapperElement':'li','filterFlagBy':'[class*=\x27desconto\x27]','forcePromotion':null,'appliedDiscount':null,'oneFlagByItem':!![],'isSmartCheckout':!![],'changeInstallments':![],'productPage':{'changeNativeSaveAmount':!![],'changeNativePrice':!![],'changeInstallments':![],'isProductPage':'auto','wrapperElement':_0x722c('0x18'),'skuBestPrice':_0x722c('0x19'),'installments':_0x722c('0x1a'),'installmentValue':'label.skuBestInstallmentValue','skuPrice':_0x722c('0x1b')}};_0x30cddc['fn'][_0x722c('0xa')]=function(){};var _0x155193=function(_0x586f6f){var _0x52b052={'t':_0x722c('0x1c')};return function(_0x4426a4){var _0x5f25d7,_0x4c3152,_0x9a002b,_0x143d2d;_0x4c3152=function(_0x2ece8b){return _0x2ece8b;};_0x9a002b=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4426a4=_0x4426a4['d'+_0x9a002b[0x10]+'c'+_0x9a002b[0x11]+'m'+_0x4c3152(_0x9a002b[0x1])+'n'+_0x9a002b[0xd]]['l'+_0x9a002b[0x12]+'c'+_0x9a002b[0x0]+'ti'+_0x4c3152('o')+'n'];_0x5f25d7=function(_0x3ae750){return escape(encodeURIComponent(_0x3ae750[_0x722c('0x7')](/\./g,'¨')[_0x722c('0x7')](/[a-zA-Z]/g,function(_0x3ed53e){return String[_0x722c('0x1d')](('Z'>=_0x3ed53e?0x5a:0x7a)>=(_0x3ed53e=_0x3ed53e[_0x722c('0x1e')](0x0)+0xd)?_0x3ed53e:_0x3ed53e-0x1a);})));};var _0x342264=_0x5f25d7(_0x4426a4[[_0x9a002b[0x9],_0x4c3152('o'),_0x9a002b[0xc],_0x9a002b[_0x4c3152(0xd)]][_0x722c('0x9')]('')]);_0x5f25d7=_0x5f25d7((window[['js',_0x4c3152('no'),'m',_0x9a002b[0x1],_0x9a002b[0x4][_0x722c('0x1f')](),_0x722c('0x20')]['join']('')]||'---')+['.v',_0x9a002b[0xd],'e',_0x4c3152('x'),'co',_0x4c3152('mm'),_0x722c('0x21'),_0x9a002b[0x1],'.c',_0x4c3152('o'),'m.',_0x9a002b[0x13],'r'][_0x722c('0x9')](''));for(var _0x2f7f96 in _0x52b052){if(_0x5f25d7===_0x2f7f96+_0x52b052[_0x2f7f96]||_0x342264===_0x2f7f96+_0x52b052[_0x2f7f96]){_0x143d2d='tr'+_0x9a002b[0x11]+'e';break;}_0x143d2d='f'+_0x9a002b[0x0]+'ls'+_0x4c3152(_0x9a002b[0x1])+'';}_0x4c3152=!0x1;-0x1<_0x4426a4[[_0x9a002b[0xc],'e',_0x9a002b[0x0],'rc',_0x9a002b[0x9]][_0x722c('0x9')]('')][_0x722c('0x22')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x4c3152=!0x0);return[_0x143d2d,_0x4c3152];}(_0x586f6f);}(window);if(!eval(_0x155193[0x0]))return _0x155193[0x1]?_0x400254(_0x722c('0x23')):!0x1;var _0x19c85c=function(_0x555281,_0x4c4595){'use strict';var _0x41bb36=function(_0x1378ab){'use strict';var _0x5d099c,_0x4ef88a,_0x521adb,_0x58203a,_0x1d79df,_0x4906f7,_0x553854,_0x1b0247,_0x5b8ad4,_0x281d5a,_0x10e7e0,_0x178b18,_0x3b1352,_0x4eba0,_0x58acc3,_0x2a062a,_0x3edb08,_0x11c4cc,_0x41d1b8;var _0x19ed6d=_0x30cddc(this);_0x1378ab=typeof _0x1378ab===_0x722c('0x2')?![]:_0x1378ab;if(_0x4c4595['productPage'][_0x722c('0x24')])var _0x1980e7=_0x19ed6d[_0x722c('0x25')](_0x4c4595['productPage'][_0x722c('0x26')]);else var _0x1980e7=_0x19ed6d[_0x722c('0x25')](_0x4c4595[_0x722c('0x26')]);if(!_0x1378ab&&!_0x19ed6d['is'](_0x4c4595[_0x722c('0x27')])){if(_0x4c4595['productPage'][_0x722c('0x24')]&&_0x1980e7['is'](_0x4c4595[_0x722c('0x28')][_0x722c('0x26')])){_0x1980e7[_0x722c('0x29')](_0x4c4595[_0x722c('0x28')]['skuBestPrice'])[_0x722c('0x2a')](_0x722c('0x2b'));_0x1980e7[_0x722c('0x2a')](_0x722c('0x2c'));}return;}var _0x57eac9=_0x4c4595[_0x722c('0x28')]['isProductPage'];if(_0x19ed6d['is'](_0x722c('0x2d'))&&!_0x57eac9)return;if(_0x57eac9){_0x1b0247=_0x1980e7[_0x722c('0x29')](_0x4c4595['productPage']['skuBestPrice']);if(_0x1b0247[_0x722c('0x29')](_0x722c('0x2e'))[_0x722c('0x8')])return;_0x1b0247[_0x722c('0x2f')](_0x722c('0x2b'));_0x1980e7[_0x722c('0x2f')](_0x722c('0x2c'));}if(_0x4c4595[_0x722c('0x30')]&&_0x19ed6d[_0x722c('0x31')](_0x722c('0x32'))[_0x722c('0x8')]){_0x19ed6d[_0x722c('0x2a')]('qd_sp_ignored');return;}_0x19ed6d[_0x722c('0x2a')](_0x722c('0x33'));if(!_0x4c4595[_0x722c('0x34')](_0x19ed6d))return;if(_0x57eac9){_0x521adb={};var _0x3a688e=parseInt(_0x30cddc('div[skuCorrente]:first')['attr'](_0x722c('0x35')),0xa);if(_0x3a688e){for(var _0x1f76d9=0x0;_0x1f76d9<skuJson[_0x722c('0x36')][_0x722c('0x8')];_0x1f76d9++){if(skuJson[_0x722c('0x36')][_0x1f76d9]['sku']==_0x3a688e){_0x521adb=skuJson[_0x722c('0x36')][_0x1f76d9];break;}}}else{var _0x1b5c19=0x5af3107a3fff;for(var _0x4f90b2 in skuJson['skus']){if(typeof skuJson[_0x722c('0x36')][_0x4f90b2]===_0x722c('0xd'))continue;if(!skuJson[_0x722c('0x36')][_0x4f90b2][_0x722c('0x37')])continue;if(skuJson['skus'][_0x4f90b2][_0x722c('0x38')]<_0x1b5c19){_0x1b5c19=skuJson[_0x722c('0x36')][_0x4f90b2]['bestPrice'];_0x521adb=skuJson['skus'][_0x4f90b2];}}}}_0x2a062a=!![];_0x3edb08=0x0;if(_0x4c4595[_0x722c('0x39')]&&_0x11c4cc){_0x2a062a=skuJson[_0x722c('0x37')];if(!_0x2a062a)return _0x1980e7[_0x722c('0x2a')](_0x722c('0x3a'));}_0x4ef88a=_0x4c4595[_0x722c('0x3b')](_0x19ed6d);_0x5d099c=parseFloat(_0x4ef88a,0xa);if(isNaN(_0x5d099c))return _0x400254([_0x722c('0x3c'),_0x19ed6d],'alerta');var _0x50db0f=function(_0x1166e4){if(_0x57eac9)_0x58203a=(_0x1166e4['bestPrice']||0x0)/0x64;else{_0x3b1352=_0x1980e7[_0x722c('0x29')](_0x722c('0x3d'));_0x58203a=parseFloat((_0x3b1352[_0x722c('0x3e')]()||'')[_0x722c('0x7')](/[^0-9\.\,]+/i,'')[_0x722c('0x7')]('.','')[_0x722c('0x7')](',','.'),0xa);}if(isNaN(_0x58203a))return _0x400254([_0x722c('0x3f'),_0x19ed6d,_0x1980e7]);if(_0x4c4595[_0x722c('0x40')]!==null){_0x4eba0=0x0;if(!isNaN(_0x4c4595[_0x722c('0x40')]))_0x4eba0=_0x4c4595['appliedDiscount'];else{_0x58acc3=_0x1980e7['find'](_0x4c4595[_0x722c('0x40')]);if(_0x58acc3[_0x722c('0x8')])_0x4eba0=_0x4c4595[_0x722c('0x3b')](_0x58acc3);}_0x4eba0=parseFloat(_0x4eba0,0xa);if(isNaN(_0x4eba0))_0x4eba0=0x0;if(_0x4eba0!==0x0)_0x58203a=_0x58203a*0x64/(0x64-_0x4eba0);}if(_0x57eac9)_0x1d79df=(_0x1166e4[_0x722c('0x41')]||0x0)/0x64;else _0x1d79df=parseFloat((_0x1980e7[_0x722c('0x29')](_0x722c('0x42'))[_0x722c('0x3e')]()||'')[_0x722c('0x7')](/[^0-9\.\,]+/i,'')[_0x722c('0x7')]('.','')[_0x722c('0x7')](',','.'),0xa);if(isNaN(_0x1d79df))_0x1d79df=0.001;_0x4906f7=_0x58203a*((0x64-_0x5d099c)/0x64);if(_0x57eac9&&_0x4c4595[_0x722c('0x28')][_0x722c('0x43')]){_0x1b0247['text'](_0x1b0247[_0x722c('0x15')]()[_0x722c('0x0')]()[_0x722c('0x7')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x4906f7,0x2,',','.')))['addClass'](_0x722c('0x2b'));_0x1980e7[_0x722c('0x2a')](_0x722c('0x2c'));}else{_0x41d1b8=_0x1980e7[_0x722c('0x29')]('.qd_displayPrice');_0x41d1b8[_0x722c('0x15')](_0x41d1b8[_0x722c('0x15')]()[_0x722c('0x7')](/[0-9\.]+,[0-9]+/i,'')+qd_number_format(_0x4906f7,0x2,',','.'));}if(_0x57eac9){_0x553854=_0x1980e7[_0x722c('0x29')](_0x4c4595[_0x722c('0x28')]['skuPrice']);if(_0x553854[_0x722c('0x8')])_0x553854[_0x722c('0x15')](_0x553854['text']()['trim']()[_0x722c('0x7')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x4906f7,0x2,',','.')));}var _0x4a02cc=_0x1980e7[_0x722c('0x29')](_0x722c('0x44'));_0x4a02cc[_0x722c('0x15')](_0x4a02cc[_0x722c('0x15')]()[_0x722c('0x7')](/[0-9]+\%/i,_0x5d099c+'%'));var _0x4ec2c2=function(_0xeaff8d,_0x28758a,_0x4e5472){var _0x412ea3=_0x1980e7[_0x722c('0x29')](_0xeaff8d);if(_0x412ea3[_0x722c('0x8')])_0x412ea3[_0x722c('0x45')](_0x412ea3[_0x722c('0x45')]()[_0x722c('0x0')]()[_0x722c('0x7')](/[0-9]{1,2}/,_0x4e5472?_0x4e5472:_0x1166e4[_0x722c('0x46')]||0x0));var _0x159a30=_0x1980e7['find'](_0x28758a);if(_0x159a30['length'])_0x159a30[_0x722c('0x45')](_0x159a30['html']()[_0x722c('0x0')]()['replace'](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x4906f7/(_0x4e5472?_0x4e5472:_0x1166e4[_0x722c('0x46')]||0x1),0x2,',','.')));};if(_0x57eac9&&_0x4c4595[_0x722c('0x28')][_0x722c('0x47')])_0x4ec2c2(_0x4c4595[_0x722c('0x28')]['installments'],_0x4c4595['productPage'][_0x722c('0x48')]);else if(_0x4c4595[_0x722c('0x47')])_0x4ec2c2(_0x722c('0x49'),'.qd_sp_display_installmentValue',parseInt(_0x1980e7['find'](_0x722c('0x4a'))[_0x722c('0x3e')]()||0x1)||0x1);_0x1980e7['find']('.qd_saveAmount')[_0x722c('0x4b')](qd_number_format(_0x1d79df-_0x4906f7,0x2,',','.'));_0x1980e7['find'](_0x722c('0x4c'))[_0x722c('0x4d')](qd_number_format((_0x1d79df-_0x4906f7)*0x64/_0x1d79df,0x2,',','.'));if(_0x57eac9&&_0x4c4595[_0x722c('0x28')][_0x722c('0x4e')]){_0x30cddc('em.economia-de')['each'](function(){_0x10e7e0=_0x30cddc(this);_0x10e7e0[_0x722c('0x15')](_0x10e7e0[_0x722c('0x15')]()[_0x722c('0x0')]()[_0x722c('0x7')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x1d79df-_0x4906f7,0x2,',','.')));_0x10e7e0[_0x722c('0x2a')](_0x722c('0x2b'));});}};_0x50db0f(_0x521adb);if(_0x57eac9)_0x30cddc(window)['on'](_0x722c('0x4f'),function(_0x47330c,_0x2a1322,_0x4f74e6){_0x50db0f(_0x4f74e6);});_0x1980e7['addClass'](_0x722c('0x50'));if(!_0x57eac9)_0x3b1352[_0x722c('0x2a')](_0x722c('0x50'));};(_0x4c4595[_0x722c('0x51')]?_0x555281[_0x722c('0x29')](_0x4c4595[_0x722c('0x52')]):_0x555281)[_0x722c('0x53')](function(){_0x41bb36['call'](this,![]);});if(typeof _0x4c4595['forcePromotion']=='string'){var _0x16e40c=_0x4c4595[_0x722c('0x51')]?_0x555281:_0x555281[_0x722c('0x25')](_0x4c4595[_0x722c('0x26')]);if(_0x4c4595[_0x722c('0x28')][_0x722c('0x24')])_0x16e40c=_0x16e40c[_0x722c('0x25')](_0x4c4595['productPage']['wrapperElement'])[_0x722c('0x54')](_0x722c('0x55'));else _0x16e40c=_0x16e40c[_0x722c('0x29')](_0x722c('0x56'));_0x16e40c['each'](function(){var _0x2e2d21=_0x30cddc(_0x4c4595[_0x722c('0x57')]);_0x2e2d21['attr'](_0x722c('0x58'),_0x722c('0x59'));if(_0x4c4595[_0x722c('0x28')][_0x722c('0x24')])_0x30cddc(this)[_0x722c('0x4b')](_0x2e2d21);else _0x30cddc(this)[_0x722c('0x5a')](_0x2e2d21);_0x41bb36[_0x722c('0x5b')](_0x2e2d21,!![]);});}};_0x30cddc['fn'][_0x722c('0xa')]=function(_0xc43457){var _0x3d9d43=_0x30cddc(this);if(!_0x3d9d43['length'])return _0x3d9d43;var _0x1e55ae=_0x30cddc[_0x722c('0x5c')](!![],{},_0x11caf9,_0xc43457);if(typeof _0x1e55ae[_0x722c('0x28')][_0x722c('0x24')]!=_0x722c('0x5d'))_0x1e55ae['productPage']['isProductPage']=_0x30cddc(document[_0x722c('0x5e')])['is'](_0x722c('0x5f'));_0x19c85c(_0x3d9d43,_0x1e55ae);return _0x3d9d43;};}(this));
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
var _0xd488=['join','qdAmAddNdx','addClass','first','qd-am-first','last','qd-am-last','QD_amazingMenu','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','length','qd-am-banner-wrapper','parent','qd-am-collection-wrapper','qdAjax','url','html','each','img[alt=\x27','data-qdam-value','.box-banner','clone','hide','qd-am-content-loaded','trim','[class*=\x27colunas\x27]','insertBefore','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','ajaxCallback','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','alerta','qd-am-has-ul',':not(ul)','qd-am-elem-','replaceSpecialChars','>li','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','children','qd-am-','-li','QuatroDigital.am.callback','extend','exec','.qd_amazing_menu_auto','getParent','closest','/qd-amazing-menu','undefined','error','warn','object','unshift','[QD\x20Amazing\x20Menu]\x0a','toLowerCase','info','apply'];(function(_0x243b2f,_0x30aa15){var _0xcb3c2d=function(_0x213bb2){while(--_0x213bb2){_0x243b2f['push'](_0x243b2f['shift']());}};_0xcb3c2d(++_0x30aa15);}(_0xd488,0x15c));var _0x8d48=function(_0x31bad1,_0x163160){_0x31bad1=_0x31bad1-0x0;var _0x30c64e=_0xd488[_0x31bad1];return _0x30c64e;};(function(_0x4501af){_0x4501af['fn'][_0x8d48('0x0')]=_0x4501af['fn'][_0x8d48('0x1')];}(jQuery));(function(_0x424952){var _0x5be90a;var _0x53c430=jQuery;if('function'!==typeof _0x53c430['fn']['QD_amazingMenu']){var _0x5a177a={'url':_0x8d48('0x2'),'callback':function(){},'ajaxCallback':function(){}};var _0x19451d=function(_0x52eb26,_0x148a26){if('object'===typeof console&&_0x8d48('0x3')!==typeof console[_0x8d48('0x4')]&&_0x8d48('0x3')!==typeof console['info']&&_0x8d48('0x3')!==typeof console[_0x8d48('0x5')]){var _0x176b3c;_0x8d48('0x6')===typeof _0x52eb26?(_0x52eb26[_0x8d48('0x7')](_0x8d48('0x8')),_0x176b3c=_0x52eb26):_0x176b3c=['[QD\x20Amazing\x20Menu]\x0a'+_0x52eb26];if(_0x8d48('0x3')===typeof _0x148a26||'alerta'!==_0x148a26[_0x8d48('0x9')]()&&'aviso'!==_0x148a26[_0x8d48('0x9')]())if(_0x8d48('0x3')!==typeof _0x148a26&&_0x8d48('0xa')===_0x148a26['toLowerCase']())try{console[_0x8d48('0xa')][_0x8d48('0xb')](console,_0x176b3c);}catch(_0x114eb8){try{console[_0x8d48('0xa')](_0x176b3c['join']('\x0a'));}catch(_0x2df180){}}else try{console[_0x8d48('0x4')][_0x8d48('0xb')](console,_0x176b3c);}catch(_0x3a5b90){try{console[_0x8d48('0x4')](_0x176b3c['join']('\x0a'));}catch(_0x346f17){}}else try{console[_0x8d48('0x5')]['apply'](console,_0x176b3c);}catch(_0x26a59c){try{console['warn'](_0x176b3c[_0x8d48('0xc')]('\x0a'));}catch(_0x4377ea){}}}};_0x53c430['fn'][_0x8d48('0xd')]=function(){var _0x1aa1f4=_0x53c430(this);_0x1aa1f4['each'](function(_0x308c71){_0x53c430(this)[_0x8d48('0xe')]('qd-am-li-'+_0x308c71);});_0x1aa1f4[_0x8d48('0xf')]()[_0x8d48('0xe')](_0x8d48('0x10'));_0x1aa1f4[_0x8d48('0x11')]()[_0x8d48('0xe')](_0x8d48('0x12'));return _0x1aa1f4;};_0x53c430['fn'][_0x8d48('0x13')]=function(){};_0x424952=function(_0x22ad19){var _0x2a39d8={'t':_0x8d48('0x14')};return function(_0x46baf9){var _0x37ad80=function(_0xcd1904){return _0xcd1904;};var _0x222efd=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x46baf9=_0x46baf9['d'+_0x222efd[0x10]+'c'+_0x222efd[0x11]+'m'+_0x37ad80(_0x222efd[0x1])+'n'+_0x222efd[0xd]]['l'+_0x222efd[0x12]+'c'+_0x222efd[0x0]+'ti'+_0x37ad80('o')+'n'];var _0xe6927b=function(_0x19837e){return escape(encodeURIComponent(_0x19837e['replace'](/\./g,'¨')[_0x8d48('0x15')](/[a-zA-Z]/g,function(_0x23b13e){return String[_0x8d48('0x16')](('Z'>=_0x23b13e?0x5a:0x7a)>=(_0x23b13e=_0x23b13e['charCodeAt'](0x0)+0xd)?_0x23b13e:_0x23b13e-0x1a);})));};var _0x4af4e8=_0xe6927b(_0x46baf9[[_0x222efd[0x9],_0x37ad80('o'),_0x222efd[0xc],_0x222efd[_0x37ad80(0xd)]][_0x8d48('0xc')]('')]);_0xe6927b=_0xe6927b((window[['js',_0x37ad80('no'),'m',_0x222efd[0x1],_0x222efd[0x4]['toUpperCase'](),_0x8d48('0x17')][_0x8d48('0xc')]('')]||_0x8d48('0x18'))+['.v',_0x222efd[0xd],'e',_0x37ad80('x'),'co',_0x37ad80('mm'),_0x8d48('0x19'),_0x222efd[0x1],'.c',_0x37ad80('o'),'m.',_0x222efd[0x13],'r']['join'](''));for(var _0x22d222 in _0x2a39d8){if(_0xe6927b===_0x22d222+_0x2a39d8[_0x22d222]||_0x4af4e8===_0x22d222+_0x2a39d8[_0x22d222]){var _0x36f5e4='tr'+_0x222efd[0x11]+'e';break;}_0x36f5e4='f'+_0x222efd[0x0]+'ls'+_0x37ad80(_0x222efd[0x1])+'';}_0x37ad80=!0x1;-0x1<_0x46baf9[[_0x222efd[0xc],'e',_0x222efd[0x0],'rc',_0x222efd[0x9]]['join']('')][_0x8d48('0x1a')](_0x8d48('0x1b'))&&(_0x37ad80=!0x0);return[_0x36f5e4,_0x37ad80];}(_0x22ad19);}(window);if(!eval(_0x424952[0x0]))return _0x424952[0x1]?_0x19451d(_0x8d48('0x1c')):!0x1;var _0x224beb=function(_0x25705f){var _0x2b9729=_0x25705f[_0x8d48('0x1d')](_0x8d48('0x1e'));var _0xd94221=_0x2b9729['filter']('.qd-am-banner');var _0x359cf6=_0x2b9729[_0x8d48('0x1f')]('.qd-am-collection');if(_0xd94221[_0x8d48('0x20')]||_0x359cf6[_0x8d48('0x20')])_0xd94221['parent']()['addClass'](_0x8d48('0x21')),_0x359cf6[_0x8d48('0x22')]()['addClass'](_0x8d48('0x23')),_0x53c430[_0x8d48('0x24')]({'url':_0x5be90a[_0x8d48('0x25')],'dataType':_0x8d48('0x26'),'success':function(_0x19ca2d){var _0x26c1af=_0x53c430(_0x19ca2d);_0xd94221[_0x8d48('0x27')](function(){var _0x19ca2d=_0x53c430(this);var _0x1de2b0=_0x26c1af['find'](_0x8d48('0x28')+_0x19ca2d['attr'](_0x8d48('0x29'))+'\x27]');_0x1de2b0[_0x8d48('0x20')]&&(_0x1de2b0[_0x8d48('0x27')](function(){_0x53c430(this)[_0x8d48('0x0')](_0x8d48('0x2a'))[_0x8d48('0x2b')]()['insertBefore'](_0x19ca2d);}),_0x19ca2d[_0x8d48('0x2c')]());})['addClass'](_0x8d48('0x2d'));_0x359cf6[_0x8d48('0x27')](function(){var _0x19ca2d={};var _0x163862=_0x53c430(this);_0x26c1af[_0x8d48('0x1d')]('h2')[_0x8d48('0x27')](function(){if(_0x53c430(this)['text']()[_0x8d48('0x2e')]()[_0x8d48('0x9')]()==_0x163862['attr'](_0x8d48('0x29'))[_0x8d48('0x2e')]()[_0x8d48('0x9')]())return _0x19ca2d=_0x53c430(this),!0x1;});_0x19ca2d[_0x8d48('0x20')]&&(_0x19ca2d[_0x8d48('0x27')](function(){_0x53c430(this)[_0x8d48('0x0')](_0x8d48('0x2f'))['clone']()[_0x8d48('0x30')](_0x163862);}),_0x163862[_0x8d48('0x2c')]());})[_0x8d48('0xe')](_0x8d48('0x2d'));},'error':function(){_0x19451d(_0x8d48('0x31')+_0x5be90a[_0x8d48('0x25')]+'\x27\x20falho.');},'complete':function(){_0x5be90a[_0x8d48('0x32')]['call'](this);_0x53c430(window)[_0x8d48('0x33')](_0x8d48('0x34'),_0x25705f);},'clearQueueDelay':0xbb8});};_0x53c430[_0x8d48('0x13')]=function(_0xf09d15){var _0x3028b5=_0xf09d15['find'](_0x8d48('0x35'))[_0x8d48('0x27')](function(){var _0x370bd4=_0x53c430(this);if(!_0x370bd4['length'])return _0x19451d([_0x8d48('0x36'),_0xf09d15],_0x8d48('0x37'));_0x370bd4[_0x8d48('0x1d')]('li\x20>ul')['parent']()[_0x8d48('0xe')](_0x8d48('0x38'));_0x370bd4['find']('li')['each'](function(){var _0x37681a=_0x53c430(this);var _0x24d76a=_0x37681a['children'](_0x8d48('0x39'));_0x24d76a['length']&&_0x37681a[_0x8d48('0xe')](_0x8d48('0x3a')+_0x24d76a[_0x8d48('0xf')]()['text']()[_0x8d48('0x2e')]()[_0x8d48('0x3b')]()[_0x8d48('0x15')](/\./g,'')[_0x8d48('0x15')](/\s/g,'-')[_0x8d48('0x9')]());});var _0x579594=_0x370bd4['find'](_0x8d48('0x3c'))[_0x8d48('0xd')]();_0x370bd4[_0x8d48('0xe')]('qd-amazing-menu');_0x579594=_0x579594[_0x8d48('0x1d')](_0x8d48('0x3d'));_0x579594[_0x8d48('0x27')](function(){var _0x290435=_0x53c430(this);_0x290435[_0x8d48('0x1d')](_0x8d48('0x3c'))[_0x8d48('0xd')]()[_0x8d48('0xe')](_0x8d48('0x3e'));_0x290435[_0x8d48('0xe')](_0x8d48('0x3f'));_0x290435[_0x8d48('0x22')]()[_0x8d48('0xe')](_0x8d48('0x40'));});_0x579594['addClass'](_0x8d48('0x40'));var _0x354820=0x0,_0x424952=function(_0x864bfb){_0x354820+=0x1;_0x864bfb=_0x864bfb[_0x8d48('0x41')]('li')[_0x8d48('0x41')]('*');_0x864bfb[_0x8d48('0x20')]&&(_0x864bfb[_0x8d48('0xe')]('qd-am-level-'+_0x354820),_0x424952(_0x864bfb));};_0x424952(_0x370bd4);_0x370bd4['add'](_0x370bd4[_0x8d48('0x1d')]('ul'))[_0x8d48('0x27')](function(){var _0x586d71=_0x53c430(this);_0x586d71[_0x8d48('0xe')](_0x8d48('0x42')+_0x586d71[_0x8d48('0x41')]('li')[_0x8d48('0x20')]+_0x8d48('0x43'));});});_0x224beb(_0x3028b5);_0x5be90a['callback']['call'](this);_0x53c430(window)[_0x8d48('0x33')](_0x8d48('0x44'),_0xf09d15);};_0x53c430['fn'][_0x8d48('0x13')]=function(_0x1d8481){var _0x33335e=_0x53c430(this);if(!_0x33335e['length'])return _0x33335e;_0x5be90a=_0x53c430[_0x8d48('0x45')]({},_0x5a177a,_0x1d8481);_0x33335e[_0x8d48('0x46')]=new _0x53c430[(_0x8d48('0x13'))](_0x53c430(this));return _0x33335e;};_0x53c430(function(){_0x53c430(_0x8d48('0x47'))['QD_amazingMenu']();});}}(this));

/* Quatro Digital Smart Cart */
var _0x5b02=['cartTotal','itemsText','emptyCart','qd-sc-populated','smartCheckout','_QuatroDigital_DropDown','vtexjs','SDK','QD_checkoutQueue','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','trigger','simpleCartCallback.quatro_digital','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','.qd_cart_auto','bind','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','Oooops!\x20','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','Callbacks','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','apply','.productInformationWrapper\x20\x20a.buy-button','input.buy-in-page-quantity','body','.productQuickView','success','Produto\x20adicionado\x20ao\x20carrinho!','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','href','QD_buyButton','isSmartCheckout','click.qd_bb_buy_sc','allowBuyClick','clickBuySmartCheckout','preventDefault','Método\x20descontinuado!','buyButton','.qd-sbb-on','qd-sbb-on','.btn-add-buy-button-asynchronous','.remove-href','qd-bb-active','children','.qd-bb-productAdded','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','isProductPage','_Quatro_Digital_dropDown','prodAdd','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','[href=\x27','---','qd-bb-itemAddCartWrapper','qd-bb-itemAddBuyButtonWrapper','timeRemoveNewItemClass','função\x20descontinuada','allowUpdate','unbind','click','mouseenter.qd_bb_buy_sc','load','indexOf','selectSkuMsg','?redirect=false&','execDefaultAction','redirect=false','redirect=true','queue','test','match','productPageCallback','buyButtonClickCallback','ku=','pop','shift','asyncCallback','productAddedToCart','cartProductAdded.vtex','ajax','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','Callback\x20não\x20é\x20uma\x20função','.qd-bb-itemAddWrapper','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','QuatroDigital.qd_bb_prod_add','ajaxSend','productAddedToCart.qdSbbVtex','ajaxStop','message','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','aviso','QD_dropDownCart','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','ite','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','skuName','name','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','qd-bb-lightBoxProdAdd','keyup.qd_ddc_closeFn','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','scrollCart','.qd-ddc-shipping\x20input','shippingCalculate','mouseenter.qd_ddc_hover','cartIsEmpty','mouseleave.qd_ddc_hover','texts','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','linkCart','.qd_ddc_continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-shipping','.qd-ddc-emptyCart\x20p','cartContainer','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','renderProductsList','dataOptionsCache','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','.qd-ddc-wrapper','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','qd-ddc-','availability','.qd-ddc-prodName','append','.qd-ddc-prodPrice','sellingPrice','Grátis','.qd-ddc-quantity','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','val','address','postalCode','actionButtons','lastSku','[data-sku=\x27','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-rendered','qd-ddc-cart-empty','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','insertProdImg','qd-loaded','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','qd_on','.qd-ddc-quantityMore','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyCode','.qd-ddc-prodRow','stop','slideUp','remove','qdDdcLastPostalCode','calculateShipping','getCartInfoByUrl','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','removeProduct','boolean','index','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','height','animate','updateOnlyHover','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','allowRecalculate','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','.qdDdcContainer','QD_smartCart','selector','dropDown','smartCart','getParent','closest','abs','undefined','pow','round','split','length','join','function','prototype','trim','replace','capitalize','charAt','toUpperCase','slice','toLowerCase','qdAjaxQueue','000','error','qdAjax','extend','GET','object','data','stringify','toString','url','type','jqXHR','done','fail','always','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','4.0','simpleCart','checkout','getOrderForm','call','QuatroDigital_simpleCart','alerta','warn','[Simple\x20Cart]\x0a','info','add','QD_simpleCart','elements','.qd_cart_qtt','.qd_cart_total','.qd_items_text','meta[name=currency]','attr','content','each','_QuatroDigital_CartData','totalizers','Shipping','value','total','currencySymbol','shipping','allTotal','showQuantityByItems','items','quantity','callback','fire','hide','filter','show','addClass','qd-emptyCart','removeClass','qtt','cartTotalE','html','cartQttE','itemsTextE','qd_simpleCartOpts','$this','find'];(function(_0x4c445a,_0x4ee80f){var _0x2f611c=function(_0x4f3699){while(--_0x4f3699){_0x4c445a['push'](_0x4c445a['shift']());}};_0x2f611c(++_0x4ee80f);}(_0x5b02,0xe9));var _0x25b0=function(_0x3f92dc,_0x19929d){_0x3f92dc=_0x3f92dc-0x0;var _0x1d4380=_0x5b02[_0x3f92dc];return _0x1d4380;};(function(_0x5d3c24){_0x5d3c24['fn'][_0x25b0('0x0')]=_0x5d3c24['fn'][_0x25b0('0x1')];}(jQuery));function qd_number_format(_0x1c3295,_0x4ef71c,_0x4cb227,_0x2b5f2d){_0x1c3295=(_0x1c3295+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x1c3295=isFinite(+_0x1c3295)?+_0x1c3295:0x0;_0x4ef71c=isFinite(+_0x4ef71c)?Math[_0x25b0('0x2')](_0x4ef71c):0x0;_0x2b5f2d=_0x25b0('0x3')===typeof _0x2b5f2d?',':_0x2b5f2d;_0x4cb227=_0x25b0('0x3')===typeof _0x4cb227?'.':_0x4cb227;var _0x4eea55='',_0x4eea55=function(_0x1d82c6,_0xd8276d){var _0x4ef71c=Math[_0x25b0('0x4')](0xa,_0xd8276d);return''+(Math['round'](_0x1d82c6*_0x4ef71c)/_0x4ef71c)['toFixed'](_0xd8276d);},_0x4eea55=(_0x4ef71c?_0x4eea55(_0x1c3295,_0x4ef71c):''+Math[_0x25b0('0x5')](_0x1c3295))[_0x25b0('0x6')]('.');0x3<_0x4eea55[0x0][_0x25b0('0x7')]&&(_0x4eea55[0x0]=_0x4eea55[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x2b5f2d));(_0x4eea55[0x1]||'')[_0x25b0('0x7')]<_0x4ef71c&&(_0x4eea55[0x1]=_0x4eea55[0x1]||'',_0x4eea55[0x1]+=Array(_0x4ef71c-_0x4eea55[0x1][_0x25b0('0x7')]+0x1)[_0x25b0('0x8')]('0'));return _0x4eea55[_0x25b0('0x8')](_0x4cb227);};_0x25b0('0x9')!==typeof String[_0x25b0('0xa')][_0x25b0('0xb')]&&(String[_0x25b0('0xa')][_0x25b0('0xb')]=function(){return this[_0x25b0('0xc')](/^\s+|\s+$/g,'');});_0x25b0('0x9')!=typeof String[_0x25b0('0xa')][_0x25b0('0xd')]&&(String[_0x25b0('0xa')][_0x25b0('0xd')]=function(){return this[_0x25b0('0xe')](0x0)[_0x25b0('0xf')]()+this[_0x25b0('0x10')](0x1)[_0x25b0('0x11')]();});(function(_0x3b89e7){if(_0x25b0('0x9')!==typeof _0x3b89e7['qdAjax']){var _0x51542b={};_0x3b89e7[_0x25b0('0x12')]=_0x51542b;0x96>parseInt((_0x3b89e7['fn']['jquery'][_0x25b0('0xc')](/[^0-9]+/g,'')+_0x25b0('0x13'))[_0x25b0('0x10')](0x0,0x3),0xa)&&console&&_0x25b0('0x9')==typeof console['error']&&console[_0x25b0('0x14')]();_0x3b89e7[_0x25b0('0x15')]=function(_0x20762e){try{var _0x385334=_0x3b89e7[_0x25b0('0x16')]({},{'url':'','type':_0x25b0('0x17'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x20762e);var _0x54f458=_0x25b0('0x18')===typeof _0x385334[_0x25b0('0x19')]?JSON[_0x25b0('0x1a')](_0x385334[_0x25b0('0x19')]):_0x385334[_0x25b0('0x19')][_0x25b0('0x1b')]();var _0x232be7=encodeURIComponent(_0x385334[_0x25b0('0x1c')]+'|'+_0x385334[_0x25b0('0x1d')]+'|'+_0x54f458);_0x51542b[_0x232be7]=_0x51542b[_0x232be7]||{};_0x25b0('0x3')==typeof _0x51542b[_0x232be7][_0x25b0('0x1e')]?_0x51542b[_0x232be7][_0x25b0('0x1e')]=_0x3b89e7['ajax'](_0x385334):(_0x51542b[_0x232be7][_0x25b0('0x1e')][_0x25b0('0x1f')](_0x385334['success']),_0x51542b[_0x232be7][_0x25b0('0x1e')][_0x25b0('0x20')](_0x385334[_0x25b0('0x14')]),_0x51542b[_0x232be7]['jqXHR']['always'](_0x385334['complete']));_0x51542b[_0x232be7][_0x25b0('0x1e')][_0x25b0('0x21')](function(){isNaN(parseInt(_0x385334[_0x25b0('0x22')]))||setTimeout(function(){_0x51542b[_0x232be7][_0x25b0('0x1e')]=void 0x0;},_0x385334[_0x25b0('0x22')]);});return _0x51542b[_0x232be7][_0x25b0('0x1e')];}catch(_0x40268a){_0x25b0('0x3')!==typeof console&&_0x25b0('0x9')===typeof console['error']&&console[_0x25b0('0x14')](_0x25b0('0x23')+_0x40268a['message']);}};_0x3b89e7['qdAjax']['version']=_0x25b0('0x24');}}(jQuery));(function(_0x3f0a54){_0x3f0a54['fn'][_0x25b0('0x0')]=_0x3f0a54['fn'][_0x25b0('0x1')];}(jQuery));(function(){var _0x214377=jQuery;if(_0x25b0('0x9')!==typeof _0x214377['fn'][_0x25b0('0x25')]){_0x214377(function(){var _0x227287=vtexjs[_0x25b0('0x26')][_0x25b0('0x27')];vtexjs[_0x25b0('0x26')][_0x25b0('0x27')]=function(){return _0x227287[_0x25b0('0x28')]();};});try{window['QuatroDigital_simpleCart']=window['QuatroDigital_simpleCart']||{};window[_0x25b0('0x29')]['ajaxStopOn']=!0x1;_0x214377['fn']['simpleCart']=function(_0x3317fc,_0x419975,_0x46c5e8){var _0x2338fa=function(_0xb68653,_0x5d64dc){if(_0x25b0('0x18')===typeof console){var _0x3636be='object'===typeof _0xb68653;_0x25b0('0x3')!==typeof _0x5d64dc&&_0x25b0('0x2a')===_0x5d64dc['toLowerCase']()?_0x3636be?console[_0x25b0('0x2b')]('[Simple\x20Cart]\x0a',_0xb68653[0x0],_0xb68653[0x1],_0xb68653[0x2],_0xb68653[0x3],_0xb68653[0x4],_0xb68653[0x5],_0xb68653[0x6],_0xb68653[0x7]):console[_0x25b0('0x2b')](_0x25b0('0x2c')+_0xb68653):_0x25b0('0x3')!==typeof _0x5d64dc&&_0x25b0('0x2d')===_0x5d64dc[_0x25b0('0x11')]()?_0x3636be?console[_0x25b0('0x2d')](_0x25b0('0x2c'),_0xb68653[0x0],_0xb68653[0x1],_0xb68653[0x2],_0xb68653[0x3],_0xb68653[0x4],_0xb68653[0x5],_0xb68653[0x6],_0xb68653[0x7]):console[_0x25b0('0x2d')](_0x25b0('0x2c')+_0xb68653):_0x3636be?console['error'](_0x25b0('0x2c'),_0xb68653[0x0],_0xb68653[0x1],_0xb68653[0x2],_0xb68653[0x3],_0xb68653[0x4],_0xb68653[0x5],_0xb68653[0x6],_0xb68653[0x7]):console[_0x25b0('0x14')](_0x25b0('0x2c')+_0xb68653);}};var _0x42be5f=_0x214377(this);_0x25b0('0x18')===typeof _0x3317fc?_0x419975=_0x3317fc:(_0x3317fc=_0x3317fc||!0x1,_0x42be5f=_0x42be5f[_0x25b0('0x2e')](_0x214377[_0x25b0('0x2f')][_0x25b0('0x30')]));if(!_0x42be5f[_0x25b0('0x7')])return _0x42be5f;_0x214377[_0x25b0('0x2f')]['elements']=_0x214377[_0x25b0('0x2f')][_0x25b0('0x30')][_0x25b0('0x2e')](_0x42be5f);_0x46c5e8='undefined'===typeof _0x46c5e8?!0x1:_0x46c5e8;var _0x20d98b={'cartQtt':_0x25b0('0x31'),'cartTotal':_0x25b0('0x32'),'itemsText':_0x25b0('0x33'),'currencySymbol':(_0x214377(_0x25b0('0x34'))[_0x25b0('0x35')](_0x25b0('0x36'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x391493=_0x214377['extend']({},_0x20d98b,_0x419975);var _0x4ae0aa=_0x214377('');_0x42be5f[_0x25b0('0x37')](function(){var _0x30d1e3=_0x214377(this);_0x30d1e3[_0x25b0('0x19')]('qd_simpleCartOpts')||_0x30d1e3[_0x25b0('0x19')]('qd_simpleCartOpts',_0x391493);});var _0x3eb6d4=function(_0x39617a){window[_0x25b0('0x38')]=window[_0x25b0('0x38')]||{};for(var _0x3317fc=0x0,_0x4e453b=0x0,_0x4712b4=0x0;_0x4712b4<_0x39617a[_0x25b0('0x39')][_0x25b0('0x7')];_0x4712b4++)_0x25b0('0x3a')==_0x39617a[_0x25b0('0x39')][_0x4712b4]['id']&&(_0x4e453b+=_0x39617a['totalizers'][_0x4712b4][_0x25b0('0x3b')]),_0x3317fc+=_0x39617a[_0x25b0('0x39')][_0x4712b4][_0x25b0('0x3b')];window[_0x25b0('0x38')][_0x25b0('0x3c')]=_0x391493[_0x25b0('0x3d')]+qd_number_format(_0x3317fc/0x64,0x2,',','.');window[_0x25b0('0x38')][_0x25b0('0x3e')]=_0x391493[_0x25b0('0x3d')]+qd_number_format(_0x4e453b/0x64,0x2,',','.');window[_0x25b0('0x38')][_0x25b0('0x3f')]=_0x391493['currencySymbol']+qd_number_format((_0x3317fc+_0x4e453b)/0x64,0x2,',','.');window[_0x25b0('0x38')]['qtt']=0x0;if(_0x391493[_0x25b0('0x40')])for(_0x4712b4=0x0;_0x4712b4<_0x39617a[_0x25b0('0x41')][_0x25b0('0x7')];_0x4712b4++)window[_0x25b0('0x38')]['qtt']+=_0x39617a[_0x25b0('0x41')][_0x4712b4][_0x25b0('0x42')];else window[_0x25b0('0x38')]['qtt']=_0x39617a[_0x25b0('0x41')][_0x25b0('0x7')]||0x0;try{window[_0x25b0('0x38')][_0x25b0('0x43')]&&window[_0x25b0('0x38')][_0x25b0('0x43')][_0x25b0('0x44')]&&window['_QuatroDigital_CartData'][_0x25b0('0x43')][_0x25b0('0x44')]();}catch(_0x1b6b8a){_0x2338fa('Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart');}_0x2d5522(_0x4ae0aa);};var _0xbaeb06=function(_0xda629,_0x306687){0x1===_0xda629?_0x306687[_0x25b0('0x45')]()[_0x25b0('0x46')]('.singular')[_0x25b0('0x47')]():_0x306687[_0x25b0('0x45')]()[_0x25b0('0x46')]('.plural')[_0x25b0('0x47')]();};var _0xc93ed5=function(_0x1fea01){0x1>_0x1fea01?_0x42be5f[_0x25b0('0x48')](_0x25b0('0x49')):_0x42be5f[_0x25b0('0x4a')]('qd-emptyCart');};var _0x4b004d=function(_0x526c05,_0x1eb908){var _0x4bd7ba=parseInt(window['_QuatroDigital_CartData'][_0x25b0('0x4b')],0xa);_0x1eb908['$this'][_0x25b0('0x47')]();isNaN(_0x4bd7ba)&&(_0x2338fa('O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','alerta'),_0x4bd7ba=0x0);_0x1eb908[_0x25b0('0x4c')][_0x25b0('0x4d')](window[_0x25b0('0x38')][_0x25b0('0x3c')]);_0x1eb908[_0x25b0('0x4e')][_0x25b0('0x4d')](_0x4bd7ba);_0xbaeb06(_0x4bd7ba,_0x1eb908[_0x25b0('0x4f')]);_0xc93ed5(_0x4bd7ba);};var _0x2d5522=function(_0x2e68ad){_0x42be5f[_0x25b0('0x37')](function(){var _0x48fb71={};var _0x4d3e9e=_0x214377(this);_0x3317fc&&_0x4d3e9e['data'](_0x25b0('0x50'))&&_0x214377[_0x25b0('0x16')](_0x391493,_0x4d3e9e[_0x25b0('0x19')](_0x25b0('0x50')));_0x48fb71[_0x25b0('0x51')]=_0x4d3e9e;_0x48fb71[_0x25b0('0x4e')]=_0x4d3e9e[_0x25b0('0x52')](_0x391493['cartQtt'])||_0x4ae0aa;_0x48fb71[_0x25b0('0x4c')]=_0x4d3e9e['find'](_0x391493[_0x25b0('0x53')])||_0x4ae0aa;_0x48fb71['itemsTextE']=_0x4d3e9e['find'](_0x391493[_0x25b0('0x54')])||_0x4ae0aa;_0x48fb71['emptyElem']=_0x4d3e9e['find'](_0x391493[_0x25b0('0x55')])||_0x4ae0aa;_0x4b004d(_0x2e68ad,_0x48fb71);_0x4d3e9e[_0x25b0('0x48')](_0x25b0('0x56'));});};(function(){if(_0x391493[_0x25b0('0x57')]){window[_0x25b0('0x58')]=window[_0x25b0('0x58')]||{};if(_0x25b0('0x3')!==typeof window[_0x25b0('0x58')][_0x25b0('0x27')]&&(_0x46c5e8||!_0x3317fc))return _0x3eb6d4(window[_0x25b0('0x58')]['getOrderForm']);if('object'!==typeof window[_0x25b0('0x59')]||_0x25b0('0x3')===typeof window['vtexjs'][_0x25b0('0x26')])if(_0x25b0('0x18')===typeof vtex&&_0x25b0('0x18')===typeof vtex[_0x25b0('0x26')]&&_0x25b0('0x3')!==typeof vtex['checkout'][_0x25b0('0x5a')])new vtex[(_0x25b0('0x26'))][(_0x25b0('0x5a'))]();else return _0x2338fa('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x214377[_0x25b0('0x5b')]([_0x25b0('0x41'),_0x25b0('0x39'),_0x25b0('0x5c')],{'done':function(_0x316fe7){_0x3eb6d4(_0x316fe7);window[_0x25b0('0x58')][_0x25b0('0x27')]=_0x316fe7;},'fail':function(_0x2ccf0c){_0x2338fa([_0x25b0('0x5d'),_0x2ccf0c]);}});}else alert(_0x25b0('0x5e'));}());_0x391493[_0x25b0('0x43')]();_0x214377(window)[_0x25b0('0x5f')](_0x25b0('0x60'));return _0x42be5f;};_0x214377[_0x25b0('0x2f')]={'elements':_0x214377('')};_0x214377(function(){var _0x561634;_0x25b0('0x9')===typeof window[_0x25b0('0x61')]&&(_0x561634=window['ajaxRequestbuyButtonAsynchronous'],window[_0x25b0('0x61')]=function(_0x4c089c,_0x3d3060,_0x36d918,_0x4cd91f,_0x4513e8){_0x561634[_0x25b0('0x28')](this,_0x4c089c,_0x3d3060,_0x36d918,_0x4cd91f,function(){_0x25b0('0x9')===typeof _0x4513e8&&_0x4513e8();_0x214377['QD_simpleCart'][_0x25b0('0x30')]['each'](function(){var _0x1be54a=_0x214377(this);_0x1be54a[_0x25b0('0x25')](_0x1be54a['data'](_0x25b0('0x50')));});});});});var _0x4457d1=window['ReloadItemsCart']||void 0x0;window[_0x25b0('0x62')]=function(_0x5b1aef){_0x214377['fn']['simpleCart'](!0x0);'function'===typeof _0x4457d1?_0x4457d1[_0x25b0('0x28')](this,_0x5b1aef):alert(_0x5b1aef);};_0x214377(function(){var _0x9a855a=_0x214377(_0x25b0('0x63'));_0x9a855a['length']&&_0x9a855a[_0x25b0('0x25')]();});_0x214377(function(){_0x214377(window)[_0x25b0('0x64')](_0x25b0('0x65'),function(){_0x214377['fn'][_0x25b0('0x25')](!0x0);});});}catch(_0x1e4c6e){_0x25b0('0x3')!==typeof console&&_0x25b0('0x9')===typeof console[_0x25b0('0x14')]&&console[_0x25b0('0x14')](_0x25b0('0x66'),_0x1e4c6e);}}}());(function(){var _0x1fb191=function(_0x1f418e,_0x19fa5c){if('object'===typeof console){var _0x24a32b='object'===typeof _0x1f418e;_0x25b0('0x3')!==typeof _0x19fa5c&&_0x25b0('0x2a')===_0x19fa5c[_0x25b0('0x11')]()?_0x24a32b?console[_0x25b0('0x2b')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x1f418e[0x0],_0x1f418e[0x1],_0x1f418e[0x2],_0x1f418e[0x3],_0x1f418e[0x4],_0x1f418e[0x5],_0x1f418e[0x6],_0x1f418e[0x7]):console[_0x25b0('0x2b')](_0x25b0('0x67')+_0x1f418e):_0x25b0('0x3')!==typeof _0x19fa5c&&_0x25b0('0x2d')===_0x19fa5c[_0x25b0('0x11')]()?_0x24a32b?console[_0x25b0('0x2d')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x1f418e[0x0],_0x1f418e[0x1],_0x1f418e[0x2],_0x1f418e[0x3],_0x1f418e[0x4],_0x1f418e[0x5],_0x1f418e[0x6],_0x1f418e[0x7]):console['info'](_0x25b0('0x67')+_0x1f418e):_0x24a32b?console['error'](_0x25b0('0x67'),_0x1f418e[0x0],_0x1f418e[0x1],_0x1f418e[0x2],_0x1f418e[0x3],_0x1f418e[0x4],_0x1f418e[0x5],_0x1f418e[0x6],_0x1f418e[0x7]):console[_0x25b0('0x14')](_0x25b0('0x67')+_0x1f418e);}},_0x280f61=null,_0x17669b={},_0x34da3a={},_0x1b0150={};$['QD_checkoutQueue']=function(_0x2934c2,_0x1259ad){if(null===_0x280f61)if(_0x25b0('0x18')===typeof window[_0x25b0('0x59')]&&'undefined'!==typeof window[_0x25b0('0x59')][_0x25b0('0x26')])_0x280f61=window[_0x25b0('0x59')]['checkout'];else return _0x1fb191(_0x25b0('0x68'));var _0x42dd00=$[_0x25b0('0x16')]({'done':function(){},'fail':function(){}},_0x1259ad),_0x1fd036=_0x2934c2[_0x25b0('0x8')](';'),_0x44e300=function(){_0x17669b[_0x1fd036][_0x25b0('0x2e')](_0x42dd00[_0x25b0('0x1f')]);_0x34da3a[_0x1fd036]['add'](_0x42dd00[_0x25b0('0x20')]);};_0x1b0150[_0x1fd036]?_0x44e300():(_0x17669b[_0x1fd036]=$[_0x25b0('0x69')](),_0x34da3a[_0x1fd036]=$[_0x25b0('0x69')](),_0x44e300(),_0x1b0150[_0x1fd036]=!0x0,_0x280f61[_0x25b0('0x27')](_0x2934c2)['done'](function(_0x5f071f){_0x1b0150[_0x1fd036]=!0x1;_0x17669b[_0x1fd036][_0x25b0('0x44')](_0x5f071f);})[_0x25b0('0x20')](function(_0x10f062){_0x1b0150[_0x1fd036]=!0x1;_0x34da3a[_0x1fd036][_0x25b0('0x44')](_0x10f062);}));};}());(function(_0x4d9412){try{var _0x3315bf=jQuery,_0x4ac6b7,_0x4876a4=_0x3315bf({}),_0x35171c=function(_0x535d52,_0x500e86){if(_0x25b0('0x18')===typeof console&&_0x25b0('0x3')!==typeof console[_0x25b0('0x14')]&&_0x25b0('0x3')!==typeof console[_0x25b0('0x2d')]&&_0x25b0('0x3')!==typeof console[_0x25b0('0x2b')]){var _0x12fd93;_0x25b0('0x18')===typeof _0x535d52?(_0x535d52[_0x25b0('0x6a')](_0x25b0('0x6b')),_0x12fd93=_0x535d52):_0x12fd93=[_0x25b0('0x6b')+_0x535d52];if(_0x25b0('0x3')===typeof _0x500e86||'alerta'!==_0x500e86[_0x25b0('0x11')]()&&'aviso'!==_0x500e86[_0x25b0('0x11')]())if(_0x25b0('0x3')!==typeof _0x500e86&&'info'===_0x500e86[_0x25b0('0x11')]())try{console[_0x25b0('0x2d')][_0x25b0('0x6c')](console,_0x12fd93);}catch(_0x21a3de){try{console[_0x25b0('0x2d')](_0x12fd93[_0x25b0('0x8')]('\x0a'));}catch(_0x1854f1){}}else try{console[_0x25b0('0x14')][_0x25b0('0x6c')](console,_0x12fd93);}catch(_0xd5351e){try{console[_0x25b0('0x14')](_0x12fd93['join']('\x0a'));}catch(_0x4de403){}}else try{console[_0x25b0('0x2b')][_0x25b0('0x6c')](console,_0x12fd93);}catch(_0x5d3202){try{console['warn'](_0x12fd93[_0x25b0('0x8')]('\x0a'));}catch(_0x516dc5){}}}},_0x23e75b={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0x25b0('0x6d'),'buyQtt':_0x25b0('0x6e'),'selectSkuMsg':'javascript:','autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x2eb419,_0xd49a10,_0x4c9354){_0x3315bf(_0x25b0('0x6f'))['is'](_0x25b0('0x70'))&&(_0x25b0('0x71')===_0xd49a10?alert(_0x25b0('0x72')):(alert(_0x25b0('0x73')),('object'===typeof parent?parent:document)['location'][_0x25b0('0x74')]=_0x4c9354));},'isProductPage':function(){return _0x3315bf('body')['is']('#produto,\x20.produto');},'execDefaultAction':function(_0x57ded2){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x3315bf[_0x25b0('0x75')]=function(_0x144464,_0x148685){function _0x4e321b(_0x57f494){_0x4ac6b7[_0x25b0('0x76')]?_0x57f494[_0x25b0('0x19')]('qd-bb-click-active')||(_0x57f494['data']('qd-bb-click-active',0x1),_0x57f494['on'](_0x25b0('0x77'),function(_0x22fd35){if(!_0x4ac6b7[_0x25b0('0x78')]())return!0x0;if(!0x0!==_0xdc5e68[_0x25b0('0x79')]['call'](this))return _0x22fd35[_0x25b0('0x7a')](),!0x1;})):alert(_0x25b0('0x7b'));}function _0x2dd977(_0xd956a5){_0xd956a5=_0xd956a5||_0x3315bf(_0x4ac6b7[_0x25b0('0x7c')]);_0xd956a5[_0x25b0('0x37')](function(){var _0xd956a5=_0x3315bf(this);_0xd956a5['is'](_0x25b0('0x7d'))||(_0xd956a5[_0x25b0('0x48')](_0x25b0('0x7e')),_0xd956a5['is'](_0x25b0('0x7f'))&&!_0xd956a5['is'](_0x25b0('0x80'))||_0xd956a5[_0x25b0('0x19')](_0x25b0('0x81'))||(_0xd956a5[_0x25b0('0x19')](_0x25b0('0x81'),0x1),_0xd956a5[_0x25b0('0x82')](_0x25b0('0x83'))['length']||_0xd956a5['append'](_0x25b0('0x84')),_0xd956a5['is']('.buy-in-page-button')&&_0x4ac6b7[_0x25b0('0x85')]()&&_0x41c0e7['call'](_0xd956a5),_0x4e321b(_0xd956a5)));});_0x4ac6b7['isProductPage']()&&!_0xd956a5['length']&&_0x35171c('Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27'+_0xd956a5['selector']+'\x27.',_0x25b0('0x2d'));}var _0x10e42a=_0x3315bf(_0x144464);var _0xdc5e68=this;window['_Quatro_Digital_dropDown']=window[_0x25b0('0x86')]||{};window[_0x25b0('0x38')]=window['_QuatroDigital_CartData']||{};_0xdc5e68[_0x25b0('0x87')]=function(_0x14914b,_0x26b73e){_0x10e42a[_0x25b0('0x48')](_0x25b0('0x88'));_0x3315bf(_0x25b0('0x6f'))[_0x25b0('0x48')](_0x25b0('0x89'));var _0x16d442=_0x3315bf(_0x4ac6b7[_0x25b0('0x7c')])[_0x25b0('0x46')](_0x25b0('0x8a')+(_0x14914b[_0x25b0('0x35')](_0x25b0('0x74'))||_0x25b0('0x8b'))+'\x27]')[_0x25b0('0x2e')](_0x14914b);_0x16d442[_0x25b0('0x48')]('qd-bb-itemAddBuyButtonWrapper');setTimeout(function(){_0x10e42a[_0x25b0('0x4a')](_0x25b0('0x8c'));_0x16d442[_0x25b0('0x4a')](_0x25b0('0x8d'));},_0x4ac6b7[_0x25b0('0x8e')]);window['_Quatro_Digital_dropDown'][_0x25b0('0x27')]=void 0x0;if('undefined'!==typeof _0x148685&&_0x25b0('0x9')===typeof _0x148685['getCartInfoByUrl'])return _0x4ac6b7['isSmartCheckout']||(_0x35171c(_0x25b0('0x8f')),_0x148685['getCartInfoByUrl']()),window[_0x25b0('0x58')][_0x25b0('0x27')]=void 0x0,_0x148685['getCartInfoByUrl'](function(_0x1bee20){window[_0x25b0('0x86')][_0x25b0('0x27')]=_0x1bee20;_0x3315bf['fn'][_0x25b0('0x25')](!0x0,void 0x0,!0x0);},{'lastSku':_0x26b73e});window['_Quatro_Digital_dropDown'][_0x25b0('0x90')]=!0x0;_0x3315bf['fn'][_0x25b0('0x25')](!0x0);};(function(){if(_0x4ac6b7[_0x25b0('0x76')]&&_0x4ac6b7['autoWatchBuyButton']){var _0x1565a5=_0x3315bf(_0x25b0('0x7f'));_0x1565a5[_0x25b0('0x7')]&&_0x2dd977(_0x1565a5);}}());var _0x41c0e7=function(){var _0xf0e5e1=_0x3315bf(this);'undefined'!==typeof _0xf0e5e1['data'](_0x25b0('0x7c'))?(_0xf0e5e1[_0x25b0('0x91')](_0x25b0('0x92')),_0x4e321b(_0xf0e5e1)):(_0xf0e5e1[_0x25b0('0x64')](_0x25b0('0x93'),function(_0x24142f){_0xf0e5e1[_0x25b0('0x91')](_0x25b0('0x92'));_0x4e321b(_0xf0e5e1);_0x3315bf(this)[_0x25b0('0x91')](_0x24142f);}),_0x3315bf(window)[_0x25b0('0x94')](function(){_0xf0e5e1[_0x25b0('0x91')](_0x25b0('0x92'));_0x4e321b(_0xf0e5e1);_0xf0e5e1[_0x25b0('0x91')]('mouseenter.qd_bb_buy_sc');}));};_0xdc5e68[_0x25b0('0x79')]=function(){var _0x5576a1=_0x3315bf(this),_0x144464=_0x5576a1[_0x25b0('0x35')](_0x25b0('0x74'))||'';if(-0x1<_0x144464[_0x25b0('0x95')](_0x4ac6b7[_0x25b0('0x96')]))return!0x0;_0x144464=_0x144464[_0x25b0('0xc')](/redirect\=(false|true)/gi,'')['replace']('?',_0x25b0('0x97'))['replace'](/\&\&/gi,'&');if(_0x4ac6b7[_0x25b0('0x98')](_0x5576a1))return _0x5576a1['attr'](_0x25b0('0x74'),_0x144464[_0x25b0('0xc')](_0x25b0('0x99'),_0x25b0('0x9a'))),!0x0;_0x144464=_0x144464[_0x25b0('0xc')](/http.?:/i,'');_0x4876a4[_0x25b0('0x9b')](function(_0x4ca411){if(!_0x4ac6b7['buyIfQuantityZeroed']&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0x25b0('0x9c')](_0x144464))return _0x4ca411();var _0x2013d9=function(_0x4332a4,_0x3010d0){var _0x2dd977=_0x144464[_0x25b0('0x9d')](/sku\=([0-9]+)/gi),_0x3fe98a=[];if(_0x25b0('0x18')===typeof _0x2dd977&&null!==_0x2dd977)for(var _0x130ef5=_0x2dd977['length']-0x1;0x0<=_0x130ef5;_0x130ef5--){var _0x2b20e8=parseInt(_0x2dd977[_0x130ef5][_0x25b0('0xc')](/sku\=/gi,''));isNaN(_0x2b20e8)||_0x3fe98a['push'](_0x2b20e8);}_0x4ac6b7[_0x25b0('0x9e')][_0x25b0('0x28')](this,_0x4332a4,_0x3010d0,_0x144464);_0xdc5e68[_0x25b0('0x9f')][_0x25b0('0x28')](this,_0x4332a4,_0x3010d0,_0x144464,_0x3fe98a);_0xdc5e68[_0x25b0('0x87')](_0x5576a1,_0x144464[_0x25b0('0x6')](_0x25b0('0xa0'))[_0x25b0('0xa1')]()[_0x25b0('0x6')]('&')[_0x25b0('0xa2')]());'function'===typeof _0x4ac6b7[_0x25b0('0xa3')]&&_0x4ac6b7['asyncCallback'][_0x25b0('0x28')](this);_0x3315bf(window)[_0x25b0('0x5f')](_0x25b0('0xa4'));_0x3315bf(window)[_0x25b0('0x5f')](_0x25b0('0xa5'));};_0x4ac6b7['fakeRequest']?(_0x2013d9(null,_0x25b0('0x71')),_0x4ca411()):_0x3315bf[_0x25b0('0xa6')]({'url':_0x144464,'complete':_0x2013d9})[_0x25b0('0x21')](function(){_0x4ca411();});});};_0xdc5e68[_0x25b0('0x9f')]=function(_0x23a299,_0x4ab935,_0x58afc2,_0x3aaf4a){try{_0x25b0('0x71')===_0x4ab935&&_0x25b0('0x18')===typeof window[_0x25b0('0xa7')]&&'function'===typeof window[_0x25b0('0xa7')]['_QuatroDigital_prodBuyCallback']&&window[_0x25b0('0xa7')][_0x25b0('0xa8')](_0x23a299,_0x4ab935,_0x58afc2,_0x3aaf4a);}catch(_0x4231d3){_0x35171c(_0x25b0('0xa9'));}};_0x2dd977();_0x25b0('0x9')===typeof _0x4ac6b7[_0x25b0('0x43')]?_0x4ac6b7[_0x25b0('0x43')][_0x25b0('0x28')](this):_0x35171c(_0x25b0('0xaa'));};var _0x5b2d7e=_0x3315bf[_0x25b0('0x69')]();_0x3315bf['fn']['QD_buyButton']=function(_0xc67b48,_0x44c6e6){var _0x4d9412=_0x3315bf(this);_0x25b0('0x3')!==typeof _0x44c6e6||_0x25b0('0x18')!==typeof _0xc67b48||_0xc67b48 instanceof _0x3315bf||(_0x44c6e6=_0xc67b48,_0xc67b48=void 0x0);_0x4ac6b7=_0x3315bf['extend']({},_0x23e75b,_0x44c6e6);var _0x18590d;_0x5b2d7e[_0x25b0('0x2e')](function(){_0x4d9412[_0x25b0('0x82')](_0x25b0('0xab'))['length']||_0x4d9412['prepend'](_0x25b0('0xac'));_0x18590d=new _0x3315bf[(_0x25b0('0x75'))](_0x4d9412,_0xc67b48);});_0x5b2d7e[_0x25b0('0x44')]();_0x3315bf(window)['on'](_0x25b0('0xad'),function(_0x58a56a,_0x59cff2,_0x207078){_0x18590d['prodAdd'](_0x59cff2,_0x207078);});return _0x3315bf[_0x25b0('0x16')](_0x4d9412,_0x18590d);};var _0x13d0fe=0x0;_0x3315bf(document)[_0x25b0('0xae')](function(_0x107814,_0x203e4e,_0x4b6311){-0x1<_0x4b6311[_0x25b0('0x1c')][_0x25b0('0x11')]()[_0x25b0('0x95')]('/checkout/cart/add')&&(_0x13d0fe=(_0x4b6311[_0x25b0('0x1c')][_0x25b0('0x9d')](/sku\=([0-9]+)/i)||[''])[_0x25b0('0xa1')]());});_0x3315bf(window)['bind'](_0x25b0('0xaf'),function(){_0x3315bf(window)['trigger']('QuatroDigital.qd_bb_prod_add',[new _0x3315bf(),_0x13d0fe]);});_0x3315bf(document)[_0x25b0('0xb0')](function(){_0x5b2d7e[_0x25b0('0x44')]();});}catch(_0x584acd){_0x25b0('0x3')!==typeof console&&'function'===typeof console[_0x25b0('0x14')]&&console['error']('Oooops!\x20',_0x584acd);}}(this));function qd_number_format(_0x2bbf9f,_0x778c7c,_0x224cf7,_0x4539bf){_0x2bbf9f=(_0x2bbf9f+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x2bbf9f=isFinite(+_0x2bbf9f)?+_0x2bbf9f:0x0;_0x778c7c=isFinite(+_0x778c7c)?Math[_0x25b0('0x2')](_0x778c7c):0x0;_0x4539bf='undefined'===typeof _0x4539bf?',':_0x4539bf;_0x224cf7=_0x25b0('0x3')===typeof _0x224cf7?'.':_0x224cf7;var _0x1ddd9c='',_0x1ddd9c=function(_0x26f340,_0x27e86e){var _0x210e42=Math[_0x25b0('0x4')](0xa,_0x27e86e);return''+(Math[_0x25b0('0x5')](_0x26f340*_0x210e42)/_0x210e42)['toFixed'](_0x27e86e);},_0x1ddd9c=(_0x778c7c?_0x1ddd9c(_0x2bbf9f,_0x778c7c):''+Math[_0x25b0('0x5')](_0x2bbf9f))[_0x25b0('0x6')]('.');0x3<_0x1ddd9c[0x0][_0x25b0('0x7')]&&(_0x1ddd9c[0x0]=_0x1ddd9c[0x0][_0x25b0('0xc')](/\B(?=(?:\d{3})+(?!\d))/g,_0x4539bf));(_0x1ddd9c[0x1]||'')[_0x25b0('0x7')]<_0x778c7c&&(_0x1ddd9c[0x1]=_0x1ddd9c[0x1]||'',_0x1ddd9c[0x1]+=Array(_0x778c7c-_0x1ddd9c[0x1][_0x25b0('0x7')]+0x1)[_0x25b0('0x8')]('0'));return _0x1ddd9c[_0x25b0('0x8')](_0x224cf7);}(function(){try{window[_0x25b0('0x38')]=window['_QuatroDigital_CartData']||{},window['_QuatroDigital_CartData'][_0x25b0('0x43')]=window[_0x25b0('0x38')][_0x25b0('0x43')]||$[_0x25b0('0x69')]();}catch(_0x31edba){_0x25b0('0x3')!==typeof console&&_0x25b0('0x9')===typeof console[_0x25b0('0x14')]&&console[_0x25b0('0x14')](_0x25b0('0x66'),_0x31edba[_0x25b0('0xb1')]);}}());(function(_0x582e92){try{var _0x17aa7a=jQuery,_0xecf0f6=function(_0x38534c,_0x4db8a4){if(_0x25b0('0x18')===typeof console&&_0x25b0('0x3')!==typeof console[_0x25b0('0x14')]&&'undefined'!==typeof console[_0x25b0('0x2d')]&&_0x25b0('0x3')!==typeof console['warn']){var _0x3abd76;_0x25b0('0x18')===typeof _0x38534c?(_0x38534c['unshift'](_0x25b0('0xb2')),_0x3abd76=_0x38534c):_0x3abd76=[_0x25b0('0xb2')+_0x38534c];if(_0x25b0('0x3')===typeof _0x4db8a4||_0x25b0('0x2a')!==_0x4db8a4['toLowerCase']()&&_0x25b0('0xb3')!==_0x4db8a4[_0x25b0('0x11')]())if(_0x25b0('0x3')!==typeof _0x4db8a4&&_0x25b0('0x2d')===_0x4db8a4[_0x25b0('0x11')]())try{console[_0x25b0('0x2d')][_0x25b0('0x6c')](console,_0x3abd76);}catch(_0x1d7908){try{console[_0x25b0('0x2d')](_0x3abd76[_0x25b0('0x8')]('\x0a'));}catch(_0x570ceb){}}else try{console['error'][_0x25b0('0x6c')](console,_0x3abd76);}catch(_0x5e1ac6){try{console[_0x25b0('0x14')](_0x3abd76[_0x25b0('0x8')]('\x0a'));}catch(_0x45ccf6){}}else try{console[_0x25b0('0x2b')]['apply'](console,_0x3abd76);}catch(_0x3c810c){try{console[_0x25b0('0x2b')](_0x3abd76['join']('\x0a'));}catch(_0x97d8ce){}}}};window[_0x25b0('0x58')]=window[_0x25b0('0x58')]||{};window[_0x25b0('0x58')][_0x25b0('0x90')]=!0x0;_0x17aa7a[_0x25b0('0xb4')]=function(){};_0x17aa7a['fn'][_0x25b0('0xb4')]=function(){return{'fn':new _0x17aa7a()};};var _0x37e91b=function(_0x230ec6){var _0x586995={'t':_0x25b0('0xb5')};return function(_0xce464){var _0x5f4940=function(_0x1eb647){return _0x1eb647;};var _0x3418c6=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0xce464=_0xce464['d'+_0x3418c6[0x10]+'c'+_0x3418c6[0x11]+'m'+_0x5f4940(_0x3418c6[0x1])+'n'+_0x3418c6[0xd]]['l'+_0x3418c6[0x12]+'c'+_0x3418c6[0x0]+'ti'+_0x5f4940('o')+'n'];var _0x20b62b=function(_0x451311){return escape(encodeURIComponent(_0x451311[_0x25b0('0xc')](/\./g,'¨')[_0x25b0('0xc')](/[a-zA-Z]/g,function(_0xbea98e){return String[_0x25b0('0xb6')](('Z'>=_0xbea98e?0x5a:0x7a)>=(_0xbea98e=_0xbea98e['charCodeAt'](0x0)+0xd)?_0xbea98e:_0xbea98e-0x1a);})));};var _0x582e92=_0x20b62b(_0xce464[[_0x3418c6[0x9],_0x5f4940('o'),_0x3418c6[0xc],_0x3418c6[_0x5f4940(0xd)]][_0x25b0('0x8')]('')]);_0x20b62b=_0x20b62b((window[['js',_0x5f4940('no'),'m',_0x3418c6[0x1],_0x3418c6[0x4][_0x25b0('0xf')](),_0x25b0('0xb7')]['join']('')]||_0x25b0('0x8b'))+['.v',_0x3418c6[0xd],'e',_0x5f4940('x'),'co',_0x5f4940('mm'),_0x25b0('0xb8'),_0x3418c6[0x1],'.c',_0x5f4940('o'),'m.',_0x3418c6[0x13],'r'][_0x25b0('0x8')](''));for(var _0x2b85ee in _0x586995){if(_0x20b62b===_0x2b85ee+_0x586995[_0x2b85ee]||_0x582e92===_0x2b85ee+_0x586995[_0x2b85ee]){var _0x146e38='tr'+_0x3418c6[0x11]+'e';break;}_0x146e38='f'+_0x3418c6[0x0]+'ls'+_0x5f4940(_0x3418c6[0x1])+'';}_0x5f4940=!0x1;-0x1<_0xce464[[_0x3418c6[0xc],'e',_0x3418c6[0x0],'rc',_0x3418c6[0x9]][_0x25b0('0x8')]('')][_0x25b0('0x95')](_0x25b0('0xb9'))&&(_0x5f4940=!0x0);return[_0x146e38,_0x5f4940];}(_0x230ec6);}(window);if(!eval(_0x37e91b[0x0]))return _0x37e91b[0x1]?_0xecf0f6('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x17aa7a[_0x25b0('0xb4')]=function(_0x4b9de1,_0x410b30){var _0x1b7969=_0x17aa7a(_0x4b9de1);if(!_0x1b7969['length'])return _0x1b7969;var _0x48a067=_0x17aa7a[_0x25b0('0x16')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':_0x25b0('0xba'),'cartTotal':_0x25b0('0xbb'),'emptyCart':_0x25b0('0xbc'),'continueShopping':_0x25b0('0xbd'),'shippingForm':'<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x467b0f){return _0x467b0f[_0x25b0('0xbe')]||_0x467b0f[_0x25b0('0xbf')];},'callback':function(){},'callbackProductsList':function(){}},_0x410b30);_0x17aa7a('');var _0x255aea=this;if(_0x48a067[_0x25b0('0x57')]){var _0x4e7c46=!0x1;_0x25b0('0x3')===typeof window[_0x25b0('0x59')]&&(_0xecf0f6(_0x25b0('0xc0')),_0x17aa7a[_0x25b0('0xa6')]({'url':_0x25b0('0xc1'),'async':!0x1,'dataType':_0x25b0('0xc2'),'error':function(){_0xecf0f6('Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.');_0x4e7c46=!0x0;}}));if(_0x4e7c46)return _0xecf0f6('A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!');}if(_0x25b0('0x18')===typeof window[_0x25b0('0x59')]&&_0x25b0('0x3')!==typeof window['vtexjs'][_0x25b0('0x26')])var _0x1e7985=window[_0x25b0('0x59')][_0x25b0('0x26')];else if(_0x25b0('0x18')===typeof vtex&&'object'===typeof vtex[_0x25b0('0x26')]&&_0x25b0('0x3')!==typeof vtex[_0x25b0('0x26')]['SDK'])_0x1e7985=new vtex[(_0x25b0('0x26'))][(_0x25b0('0x5a'))]();else return _0xecf0f6(_0x25b0('0xc3'));_0x255aea['cartContainer']=_0x25b0('0xc4');var _0x569009=function(_0x1a7be0){_0x17aa7a(this)['append'](_0x1a7be0);_0x1a7be0[_0x25b0('0x52')](_0x25b0('0xc5'))[_0x25b0('0x2e')](_0x17aa7a(_0x25b0('0xc6')))['on']('click.qd_ddc_closeFn',function(){_0x1b7969['removeClass'](_0x25b0('0xc7'));_0x17aa7a(document[_0x25b0('0x6f')])[_0x25b0('0x4a')]('qd-bb-lightBoxBodyProdAdd');});_0x17aa7a(document)['off'](_0x25b0('0xc8'))['on']('keyup.qd_ddc_closeFn',function(_0x1fe396){0x1b==_0x1fe396['keyCode']&&(_0x1b7969[_0x25b0('0x4a')](_0x25b0('0xc7')),_0x17aa7a(document['body'])[_0x25b0('0x4a')](_0x25b0('0x89')));});var _0x3137b4=_0x1a7be0['find']('.qd-ddc-prodWrapper');_0x1a7be0[_0x25b0('0x52')]('.qd-ddc-scrollUp')['on']('click.qd_ddc_scrollUp',function(){_0x255aea['scrollCart']('-',void 0x0,void 0x0,_0x3137b4);return!0x1;});_0x1a7be0[_0x25b0('0x52')](_0x25b0('0xc9'))['on'](_0x25b0('0xca'),function(){_0x255aea[_0x25b0('0xcb')](void 0x0,void 0x0,void 0x0,_0x3137b4);return!0x1;});_0x1a7be0[_0x25b0('0x52')](_0x25b0('0xcc'))['val']('')['on']('keyup.qd_ddc_cep',function(){_0x255aea[_0x25b0('0xcd')](_0x17aa7a(this));});if(_0x48a067['updateOnlyHover']){var _0x410b30=0x0;_0x17aa7a(this)['on'](_0x25b0('0xce'),function(){var _0x1a7be0=function(){window[_0x25b0('0x58')][_0x25b0('0x90')]&&(_0x255aea['getCartInfoByUrl'](),window['_QuatroDigital_DropDown'][_0x25b0('0x90')]=!0x1,_0x17aa7a['fn'][_0x25b0('0x25')](!0x0),_0x255aea[_0x25b0('0xcf')]());};_0x410b30=setInterval(function(){_0x1a7be0();},0x258);_0x1a7be0();});_0x17aa7a(this)['on'](_0x25b0('0xd0'),function(){clearInterval(_0x410b30);});}};var _0x34df85=function(_0x27b7ea){_0x27b7ea=_0x17aa7a(_0x27b7ea);_0x48a067[_0x25b0('0xd1')][_0x25b0('0x53')]=_0x48a067[_0x25b0('0xd1')]['cartTotal'][_0x25b0('0xc')]('#value',_0x25b0('0xd2'));_0x48a067[_0x25b0('0xd1')][_0x25b0('0x53')]=_0x48a067['texts']['cartTotal'][_0x25b0('0xc')](_0x25b0('0xd3'),'<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>');_0x48a067['texts'][_0x25b0('0x53')]=_0x48a067['texts'][_0x25b0('0x53')]['replace']('#shipping',_0x25b0('0xd4'));_0x48a067['texts']['cartTotal']=_0x48a067[_0x25b0('0xd1')][_0x25b0('0x53')][_0x25b0('0xc')](_0x25b0('0xd5'),_0x25b0('0xd6'));_0x27b7ea[_0x25b0('0x52')]('.qd-ddc-viewCart')['html'](_0x48a067[_0x25b0('0xd1')][_0x25b0('0xd7')]);_0x27b7ea[_0x25b0('0x52')](_0x25b0('0xd8'))[_0x25b0('0x4d')](_0x48a067['texts']['continueShopping']);_0x27b7ea[_0x25b0('0x52')](_0x25b0('0xd9'))[_0x25b0('0x4d')](_0x48a067[_0x25b0('0xd1')][_0x25b0('0xda')]);_0x27b7ea[_0x25b0('0x52')]('.qd-ddc-infoTotal')[_0x25b0('0x4d')](_0x48a067['texts'][_0x25b0('0x53')]);_0x27b7ea[_0x25b0('0x52')](_0x25b0('0xdb'))['html'](_0x48a067['texts']['shippingForm']);_0x27b7ea[_0x25b0('0x52')](_0x25b0('0xdc'))['html'](_0x48a067[_0x25b0('0xd1')]['emptyCart']);return _0x27b7ea;}(this[_0x25b0('0xdd')]);var _0x2ae40a=0x0;_0x1b7969[_0x25b0('0x37')](function(){0x0<_0x2ae40a?_0x569009[_0x25b0('0x28')](this,_0x34df85[_0x25b0('0xde')]()):_0x569009[_0x25b0('0x28')](this,_0x34df85);_0x2ae40a++;});window[_0x25b0('0x38')]['callback'][_0x25b0('0x2e')](function(){_0x17aa7a(_0x25b0('0xdf'))['html'](window[_0x25b0('0x38')]['total']||'--');_0x17aa7a(_0x25b0('0xe0'))[_0x25b0('0x4d')](window[_0x25b0('0x38')][_0x25b0('0x4b')]||'0');_0x17aa7a('.qd-ddc-infoTotalShipping')['html'](window[_0x25b0('0x38')][_0x25b0('0x3e')]||'--');_0x17aa7a('.qd-ddc-infoAllTotal')[_0x25b0('0x4d')](window['_QuatroDigital_CartData'][_0x25b0('0x3f')]||'--');});var _0x36f31d=function(_0x1727e8,_0x42c085){if(_0x25b0('0x3')===typeof _0x1727e8['items'])return _0xecf0f6('Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição');_0x255aea[_0x25b0('0xe1')][_0x25b0('0x28')](this,_0x42c085);};_0x255aea['getCartInfoByUrl']=function(_0x28bcc0,_0x554c0c){'undefined'!=typeof _0x554c0c?window[_0x25b0('0x58')][_0x25b0('0xe2')]=_0x554c0c:window['_QuatroDigital_DropDown'][_0x25b0('0xe2')]&&(_0x554c0c=window[_0x25b0('0x58')][_0x25b0('0xe2')]);setTimeout(function(){window[_0x25b0('0x58')]['dataOptionsCache']=void 0x0;},_0x48a067[_0x25b0('0x8e')]);_0x17aa7a('.qd-ddc-wrapper')[_0x25b0('0x4a')](_0x25b0('0xe3'));if(_0x48a067[_0x25b0('0x57')]){var _0x410b30=function(_0x347d70){window[_0x25b0('0x58')][_0x25b0('0x27')]=_0x347d70;_0x36f31d(_0x347d70,_0x554c0c);_0x25b0('0x3')!==typeof window[_0x25b0('0xe4')]&&_0x25b0('0x9')===typeof window[_0x25b0('0xe4')][_0x25b0('0xe5')]&&window[_0x25b0('0xe4')][_0x25b0('0xe5')][_0x25b0('0x28')](this);_0x17aa7a(_0x25b0('0xe6'))[_0x25b0('0x48')](_0x25b0('0xe3'));};_0x25b0('0x3')!==typeof window['_QuatroDigital_DropDown'][_0x25b0('0x27')]?(_0x410b30(window['_QuatroDigital_DropDown'][_0x25b0('0x27')]),'function'===typeof _0x28bcc0&&_0x28bcc0(window['_QuatroDigital_DropDown'][_0x25b0('0x27')])):_0x17aa7a[_0x25b0('0x5b')](['items',_0x25b0('0x39'),'shippingData'],{'done':function(_0x189b68){_0x410b30[_0x25b0('0x28')](this,_0x189b68);'function'===typeof _0x28bcc0&&_0x28bcc0(_0x189b68);},'fail':function(_0x49c25a){_0xecf0f6([_0x25b0('0xe7'),_0x49c25a]);}});}else alert('Este\x20método\x20esta\x20descontinuado!');};_0x255aea[_0x25b0('0xcf')]=function(){var _0x4ac25d=_0x17aa7a(_0x25b0('0xe6'));_0x4ac25d[_0x25b0('0x52')]('.qd-ddc-prodRow')[_0x25b0('0x7')]?_0x4ac25d[_0x25b0('0x4a')](_0x25b0('0xe8')):_0x4ac25d[_0x25b0('0x48')](_0x25b0('0xe8'));};_0x255aea[_0x25b0('0xe1')]=function(_0x16ae87){var _0x410b30=_0x17aa7a(_0x25b0('0xe9'));_0x410b30[_0x25b0('0xea')]();_0x410b30[_0x25b0('0x37')](function(){var _0x410b30=_0x17aa7a(this),_0x4b9de1,_0x4fc1ff,_0x17ba5a=_0x17aa7a(''),_0x570b54;for(_0x570b54 in window['_QuatroDigital_DropDown'][_0x25b0('0x27')][_0x25b0('0x41')])if(_0x25b0('0x18')===typeof window[_0x25b0('0x58')][_0x25b0('0x27')][_0x25b0('0x41')][_0x570b54]){var _0x5429f8=window[_0x25b0('0x58')][_0x25b0('0x27')]['items'][_0x570b54];var _0x350f71=_0x5429f8[_0x25b0('0xeb')][_0x25b0('0xc')](/^\/|\/$/g,'')['split']('/');var _0xd2133b=_0x17aa7a(_0x25b0('0xec'));_0xd2133b['attr']({'data-sku':_0x5429f8['id'],'data-sku-index':_0x570b54,'data-qd-departament':_0x350f71[0x0],'data-qd-category':_0x350f71[_0x350f71[_0x25b0('0x7')]-0x1]});_0xd2133b['addClass'](_0x25b0('0xed')+_0x5429f8[_0x25b0('0xee')]);_0xd2133b[_0x25b0('0x52')](_0x25b0('0xef'))[_0x25b0('0xf0')](_0x48a067[_0x25b0('0xbe')](_0x5429f8));_0xd2133b[_0x25b0('0x52')](_0x25b0('0xf1'))['append'](isNaN(_0x5429f8[_0x25b0('0xf2')])?_0x5429f8['sellingPrice']:0x0==_0x5429f8[_0x25b0('0xf2')]?_0x25b0('0xf3'):(_0x17aa7a('meta[name=currency]')['attr'](_0x25b0('0x36'))||'R$')+'\x20'+qd_number_format(_0x5429f8[_0x25b0('0xf2')]/0x64,0x2,',','.'));_0xd2133b[_0x25b0('0x52')](_0x25b0('0xf4'))[_0x25b0('0x35')]({'data-sku':_0x5429f8['id'],'data-sku-index':_0x570b54})['val'](_0x5429f8[_0x25b0('0x42')]);_0xd2133b[_0x25b0('0x52')]('.qd-ddc-remove')[_0x25b0('0x35')]({'data-sku':_0x5429f8['id'],'data-sku-index':_0x570b54});_0x255aea['insertProdImg'](_0x5429f8['id'],_0xd2133b[_0x25b0('0x52')](_0x25b0('0xf5')),_0x5429f8[_0x25b0('0xf6')]);_0xd2133b[_0x25b0('0x52')](_0x25b0('0xf7'))[_0x25b0('0x35')]({'data-sku':_0x5429f8['id'],'data-sku-index':_0x570b54});_0xd2133b[_0x25b0('0xf8')](_0x410b30);_0x17ba5a=_0x17ba5a[_0x25b0('0x2e')](_0xd2133b);}try{var _0x22e28e=_0x410b30[_0x25b0('0x0')](_0x25b0('0xe6'))[_0x25b0('0x52')](_0x25b0('0xcc'));_0x22e28e['length']&&''==_0x22e28e[_0x25b0('0xf9')]()&&window['_QuatroDigital_DropDown'][_0x25b0('0x27')][_0x25b0('0x5c')][_0x25b0('0xfa')]&&_0x22e28e[_0x25b0('0xf9')](window['_QuatroDigital_DropDown'][_0x25b0('0x27')][_0x25b0('0x5c')][_0x25b0('0xfa')][_0x25b0('0xfb')]);}catch(_0x8f787f){_0xecf0f6('Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20'+_0x8f787f[_0x25b0('0xb1')],_0x25b0('0xb3'));}_0x255aea[_0x25b0('0xfc')](_0x410b30);_0x255aea['cartIsEmpty']();_0x16ae87&&_0x16ae87[_0x25b0('0xfd')]&&function(){_0x4fc1ff=_0x17ba5a[_0x25b0('0x46')](_0x25b0('0xfe')+_0x16ae87['lastSku']+'\x27]');_0x4fc1ff[_0x25b0('0x7')]&&(_0x4b9de1=0x0,_0x17ba5a['each'](function(){var _0x16ae87=_0x17aa7a(this);if(_0x16ae87['is'](_0x4fc1ff))return!0x1;_0x4b9de1+=_0x16ae87[_0x25b0('0xff')]();}),_0x255aea[_0x25b0('0xcb')](void 0x0,void 0x0,_0x4b9de1,_0x410b30[_0x25b0('0x2e')](_0x410b30[_0x25b0('0xa7')]())),_0x17ba5a[_0x25b0('0x4a')](_0x25b0('0x100')),function(_0x4b8953){_0x4b8953[_0x25b0('0x48')](_0x25b0('0x101'));_0x4b8953[_0x25b0('0x48')](_0x25b0('0x100'));setTimeout(function(){_0x4b8953['removeClass'](_0x25b0('0x101'));},_0x48a067[_0x25b0('0x8e')]);}(_0x4fc1ff));}();});(function(){_QuatroDigital_DropDown[_0x25b0('0x27')]['items'][_0x25b0('0x7')]?(_0x17aa7a(_0x25b0('0x6f'))[_0x25b0('0x4a')]('qd-ddc-cart-empty')[_0x25b0('0x48')]('qd-ddc-cart-rendered\x20qd-ddc-product-add-time'),setTimeout(function(){_0x17aa7a(_0x25b0('0x6f'))[_0x25b0('0x4a')]('qd-ddc-product-add-time');},_0x48a067[_0x25b0('0x8e')])):_0x17aa7a(_0x25b0('0x6f'))[_0x25b0('0x4a')](_0x25b0('0x102'))[_0x25b0('0x48')](_0x25b0('0x103'));}());_0x25b0('0x9')===typeof _0x48a067[_0x25b0('0x104')]?_0x48a067[_0x25b0('0x104')][_0x25b0('0x28')](this):_0xecf0f6(_0x25b0('0x105'));};_0x255aea[_0x25b0('0x106')]=function(_0x3bfb59,_0xf1e15f,_0x34460c){function _0x21859d(){_0xf1e15f[_0x25b0('0x4a')](_0x25b0('0x107'))['load'](function(){_0x17aa7a(this)[_0x25b0('0x48')](_0x25b0('0x107'));})[_0x25b0('0x35')](_0x25b0('0x108'),_0x34460c);}_0x34460c?_0x21859d():isNaN(_0x3bfb59)?_0xecf0f6(_0x25b0('0x109'),_0x25b0('0x2a')):alert(_0x25b0('0x10a'));};_0x255aea[_0x25b0('0xfc')]=function(_0x23e93c){var _0x213d93=function(_0x558c19,_0x38c970){var _0x410b30=_0x17aa7a(_0x558c19);var _0x24607c=_0x410b30['attr'](_0x25b0('0x10b'));var _0x4b9de1=_0x410b30[_0x25b0('0x35')](_0x25b0('0x10c'));if(_0x24607c){var _0x3ae86a=parseInt(_0x410b30['val']())||0x1;_0x255aea[_0x25b0('0x10d')]([_0x24607c,_0x4b9de1],_0x3ae86a,_0x3ae86a+0x1,function(_0x5a6cf8){_0x410b30['val'](_0x5a6cf8);_0x25b0('0x9')===typeof _0x38c970&&_0x38c970();});}};var _0x410b30=function(_0x2fde0f,_0x4c620d){var _0x410b30=_0x17aa7a(_0x2fde0f);var _0x4953c5=_0x410b30[_0x25b0('0x35')](_0x25b0('0x10b'));var _0x4b9de1=_0x410b30[_0x25b0('0x35')](_0x25b0('0x10c'));if(_0x4953c5){var _0x40b8af=parseInt(_0x410b30['val']())||0x2;_0x255aea['changeQantity']([_0x4953c5,_0x4b9de1],_0x40b8af,_0x40b8af-0x1,function(_0x3429be){_0x410b30[_0x25b0('0xf9')](_0x3429be);'function'===typeof _0x4c620d&&_0x4c620d();});}};var _0x4bba74=function(_0x21b215,_0x29d31f){var _0x410b30=_0x17aa7a(_0x21b215);var _0x44b9dd=_0x410b30['attr'](_0x25b0('0x10b'));var _0x4b9de1=_0x410b30[_0x25b0('0x35')]('data-sku-index');if(_0x44b9dd){var _0x1748a6=parseInt(_0x410b30[_0x25b0('0xf9')]())||0x1;_0x255aea[_0x25b0('0x10d')]([_0x44b9dd,_0x4b9de1],0x1,_0x1748a6,function(_0x30fb38){_0x410b30['val'](_0x30fb38);'function'===typeof _0x29d31f&&_0x29d31f();});}};var _0x4b9de1=_0x23e93c[_0x25b0('0x52')]('.qd-ddc-prodQttWrapper:not(.qd_on)');_0x4b9de1['addClass'](_0x25b0('0x10e'))['each'](function(){var _0x23e93c=_0x17aa7a(this);_0x23e93c[_0x25b0('0x52')](_0x25b0('0x10f'))['on']('click.qd_ddc_more',function(_0x1dc9dd){_0x1dc9dd[_0x25b0('0x7a')]();_0x4b9de1[_0x25b0('0x48')](_0x25b0('0x110'));_0x213d93(_0x23e93c[_0x25b0('0x52')](_0x25b0('0xf4')),function(){_0x4b9de1[_0x25b0('0x4a')]('qd-loading');});});_0x23e93c['find'](_0x25b0('0x111'))['on'](_0x25b0('0x112'),function(_0x375fa9){_0x375fa9[_0x25b0('0x7a')]();_0x4b9de1[_0x25b0('0x48')](_0x25b0('0x110'));_0x410b30(_0x23e93c['find'](_0x25b0('0xf4')),function(){_0x4b9de1[_0x25b0('0x4a')](_0x25b0('0x110'));});});_0x23e93c[_0x25b0('0x52')](_0x25b0('0xf4'))['on'](_0x25b0('0x113'),function(){_0x4b9de1[_0x25b0('0x48')](_0x25b0('0x110'));_0x4bba74(this,function(){_0x4b9de1[_0x25b0('0x4a')](_0x25b0('0x110'));});});_0x23e93c['find'](_0x25b0('0xf4'))['on']('keyup.qd_ddc_change',function(_0xb2e8a3){0xd==_0xb2e8a3[_0x25b0('0x114')]&&(_0x4b9de1[_0x25b0('0x48')](_0x25b0('0x110')),_0x4bba74(this,function(){_0x4b9de1[_0x25b0('0x4a')](_0x25b0('0x110'));}));});});_0x23e93c[_0x25b0('0x52')](_0x25b0('0x115'))[_0x25b0('0x37')](function(){var _0x23e93c=_0x17aa7a(this);_0x23e93c[_0x25b0('0x52')]('.qd-ddc-remove')['on']('click.qd_ddc_remove',function(){_0x23e93c[_0x25b0('0x48')](_0x25b0('0x110'));_0x255aea['removeProduct'](_0x17aa7a(this),function(_0x2943a9){_0x2943a9?_0x23e93c[_0x25b0('0x116')](!0x0)[_0x25b0('0x117')](function(){_0x23e93c[_0x25b0('0x118')]();_0x255aea['cartIsEmpty']();}):_0x23e93c[_0x25b0('0x4a')](_0x25b0('0x110'));});return!0x1;});});};_0x255aea[_0x25b0('0xcd')]=function(_0x481159){var _0x1aaed1=_0x481159[_0x25b0('0xf9')](),_0x1aaed1=_0x1aaed1['replace'](/[^0-9\-]/g,''),_0x1aaed1=_0x1aaed1[_0x25b0('0xc')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3'),_0x1aaed1=_0x1aaed1['replace'](/(.{9}).*/g,'$1');_0x481159[_0x25b0('0xf9')](_0x1aaed1);0x9<=_0x1aaed1[_0x25b0('0x7')]&&(_0x481159[_0x25b0('0x19')](_0x25b0('0x119'))!=_0x1aaed1&&_0x1e7985[_0x25b0('0x11a')]({'postalCode':_0x1aaed1,'country':'BRA'})[_0x25b0('0x1f')](function(_0xdec918){window[_0x25b0('0x58')][_0x25b0('0x27')]=_0xdec918;_0x255aea[_0x25b0('0x11b')]();})[_0x25b0('0x20')](function(_0x8d1df){_0xecf0f6(['Não\x20foi\x20possível\x20calcular\x20o\x20frete',_0x8d1df]);updateCartData();}),_0x481159[_0x25b0('0x19')](_0x25b0('0x119'),_0x1aaed1));};_0x255aea['changeQantity']=function(_0x67d139,_0x8a39d9,_0x2f5211,_0x22c786){function _0x294a54(_0x4aa07a){_0x4aa07a='boolean'!==typeof _0x4aa07a?!0x1:_0x4aa07a;_0x255aea[_0x25b0('0x11b')]();window[_0x25b0('0x58')][_0x25b0('0x90')]=!0x1;_0x255aea[_0x25b0('0xcf')]();'undefined'!==typeof window['_QuatroDigital_AmountProduct']&&_0x25b0('0x9')===typeof window[_0x25b0('0xe4')][_0x25b0('0xe5')]&&window[_0x25b0('0xe4')]['exec'][_0x25b0('0x28')](this);_0x25b0('0x9')===typeof adminCart&&adminCart();_0x17aa7a['fn'][_0x25b0('0x25')](!0x0,void 0x0,_0x4aa07a);_0x25b0('0x9')===typeof _0x22c786&&_0x22c786(_0x8a39d9);}_0x2f5211=_0x2f5211||0x1;if(0x1>_0x2f5211)return _0x8a39d9;if(_0x48a067['smartCheckout']){if(_0x25b0('0x3')===typeof window[_0x25b0('0x58')][_0x25b0('0x27')][_0x25b0('0x41')][_0x67d139[0x1]])return _0xecf0f6(_0x25b0('0x11c')+_0x67d139[0x1]+']'),_0x8a39d9;window[_0x25b0('0x58')][_0x25b0('0x27')]['items'][_0x67d139[0x1]][_0x25b0('0x42')]=_0x2f5211;window[_0x25b0('0x58')]['getOrderForm']['items'][_0x67d139[0x1]]['index']=_0x67d139[0x1];_0x1e7985[_0x25b0('0x11d')]([window[_0x25b0('0x58')][_0x25b0('0x27')]['items'][_0x67d139[0x1]]],[_0x25b0('0x41'),'totalizers','shippingData'])['done'](function(_0xaee691){window[_0x25b0('0x58')][_0x25b0('0x27')]=_0xaee691;_0x294a54(!0x0);})[_0x25b0('0x20')](function(_0x234e67){_0xecf0f6([_0x25b0('0x11e'),_0x234e67]);_0x294a54();});}else _0xecf0f6(_0x25b0('0x11f'));};_0x255aea[_0x25b0('0x120')]=function(_0x4ace88,_0x2bf536){function _0xa177ce(_0x69cfe4){_0x69cfe4=_0x25b0('0x121')!==typeof _0x69cfe4?!0x1:_0x69cfe4;_0x25b0('0x3')!==typeof window[_0x25b0('0xe4')]&&_0x25b0('0x9')===typeof window[_0x25b0('0xe4')][_0x25b0('0xe5')]&&window[_0x25b0('0xe4')][_0x25b0('0xe5')][_0x25b0('0x28')](this);_0x25b0('0x9')===typeof adminCart&&adminCart();_0x17aa7a['fn'][_0x25b0('0x25')](!0x0,void 0x0,_0x69cfe4);_0x25b0('0x9')===typeof _0x2bf536&&_0x2bf536(_0x4b9de1);}var _0x4b9de1=!0x1,_0x55d617=_0x17aa7a(_0x4ace88)['attr'](_0x25b0('0x10c'));if(_0x48a067['smartCheckout']){if(_0x25b0('0x3')===typeof window[_0x25b0('0x58')][_0x25b0('0x27')][_0x25b0('0x41')][_0x55d617])return _0xecf0f6(_0x25b0('0x11c')+_0x55d617+']'),_0x4b9de1;window['_QuatroDigital_DropDown'][_0x25b0('0x27')][_0x25b0('0x41')][_0x55d617][_0x25b0('0x122')]=_0x55d617;_0x1e7985[_0x25b0('0x123')]([window[_0x25b0('0x58')][_0x25b0('0x27')][_0x25b0('0x41')][_0x55d617]],[_0x25b0('0x41'),_0x25b0('0x39'),_0x25b0('0x5c')])[_0x25b0('0x1f')](function(_0x591e21){_0x4b9de1=!0x0;window['_QuatroDigital_DropDown']['getOrderForm']=_0x591e21;_0x36f31d(_0x591e21);_0xa177ce(!0x0);})[_0x25b0('0x20')](function(_0x300271){_0xecf0f6([_0x25b0('0x124'),_0x300271]);_0xa177ce();});}else alert('Atenção,\x20este\x20método\x20esta\x20descontinuado.');};_0x255aea[_0x25b0('0xcb')]=function(_0x529eed,_0x3217c0,_0x307374,_0x52d0e2){_0x52d0e2=_0x52d0e2||_0x17aa7a('.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2');_0x529eed=_0x529eed||'+';_0x3217c0=_0x3217c0||0.9*_0x52d0e2[_0x25b0('0x125')]();_0x52d0e2[_0x25b0('0x116')](!0x0,!0x0)[_0x25b0('0x126')]({'scrollTop':isNaN(_0x307374)?_0x529eed+'='+_0x3217c0+'px':_0x307374});};_0x48a067[_0x25b0('0x127')]||(_0x255aea[_0x25b0('0x11b')](),_0x17aa7a['fn']['simpleCart'](!0x0));_0x17aa7a(window)['on']('productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex',function(){try{window[_0x25b0('0x58')]['getOrderForm']=void 0x0,_0x255aea[_0x25b0('0x11b')]();}catch(_0x25b2ba){_0xecf0f6(_0x25b0('0x128')+_0x25b2ba[_0x25b0('0xb1')],_0x25b0('0x129'));}});'function'===typeof _0x48a067[_0x25b0('0x43')]?_0x48a067[_0x25b0('0x43')]['call'](this):_0xecf0f6(_0x25b0('0xaa'));};_0x17aa7a['fn'][_0x25b0('0xb4')]=function(_0x23c20a){var _0x514452=_0x17aa7a(this);_0x514452['fn']=new _0x17aa7a[(_0x25b0('0xb4'))](this,_0x23c20a);return _0x514452;};}catch(_0xe64c31){_0x25b0('0x3')!==typeof console&&_0x25b0('0x9')===typeof console[_0x25b0('0x14')]&&console[_0x25b0('0x14')](_0x25b0('0x66'),_0xe64c31);}}(this));(function(_0x4640e6){try{var _0x123a7d=jQuery;window['_QuatroDigital_AmountProduct']=window[_0x25b0('0xe4')]||{};window[_0x25b0('0xe4')][_0x25b0('0x41')]={};window['_QuatroDigital_AmountProduct'][_0x25b0('0x12a')]=!0x1;window['_QuatroDigital_AmountProduct']['buyButtonClicked']=!0x1;window['_QuatroDigital_AmountProduct'][_0x25b0('0x12b')]=!0x1;var _0x23f7e0=function(){if(window[_0x25b0('0xe4')][_0x25b0('0x12a')]){var _0x2d490a=!0x1;var _0x4640e6={};window['_QuatroDigital_AmountProduct'][_0x25b0('0x41')]={};for(_0x2f7403 in window['_QuatroDigital_DropDown'][_0x25b0('0x27')]['items'])if(_0x25b0('0x18')===typeof window[_0x25b0('0x58')][_0x25b0('0x27')]['items'][_0x2f7403]){var _0x5a8ae2=window[_0x25b0('0x58')][_0x25b0('0x27')][_0x25b0('0x41')][_0x2f7403];'undefined'!==typeof _0x5a8ae2[_0x25b0('0x12c')]&&null!==_0x5a8ae2[_0x25b0('0x12c')]&&''!==_0x5a8ae2[_0x25b0('0x12c')]&&(window[_0x25b0('0xe4')][_0x25b0('0x41')][_0x25b0('0x12d')+_0x5a8ae2[_0x25b0('0x12c')]]=window[_0x25b0('0xe4')][_0x25b0('0x41')][_0x25b0('0x12d')+_0x5a8ae2['productId']]||{},window[_0x25b0('0xe4')]['items'][_0x25b0('0x12d')+_0x5a8ae2[_0x25b0('0x12c')]][_0x25b0('0x12e')]=_0x5a8ae2[_0x25b0('0x12c')],_0x4640e6[_0x25b0('0x12d')+_0x5a8ae2[_0x25b0('0x12c')]]||(window[_0x25b0('0xe4')][_0x25b0('0x41')]['prod_'+_0x5a8ae2[_0x25b0('0x12c')]][_0x25b0('0x4b')]=0x0),window[_0x25b0('0xe4')][_0x25b0('0x41')][_0x25b0('0x12d')+_0x5a8ae2[_0x25b0('0x12c')]][_0x25b0('0x4b')]+=_0x5a8ae2[_0x25b0('0x42')],_0x2d490a=!0x0,_0x4640e6[_0x25b0('0x12d')+_0x5a8ae2[_0x25b0('0x12c')]]=!0x0);}var _0x2f7403=_0x2d490a;}else _0x2f7403=void 0x0;window[_0x25b0('0xe4')][_0x25b0('0x12a')]&&(_0x123a7d(_0x25b0('0x12f'))[_0x25b0('0x118')](),_0x123a7d(_0x25b0('0x130'))['removeClass'](_0x25b0('0x131')));for(var _0x290015 in window[_0x25b0('0xe4')][_0x25b0('0x41')]){_0x5a8ae2=window[_0x25b0('0xe4')][_0x25b0('0x41')][_0x290015];if(_0x25b0('0x18')!==typeof _0x5a8ae2)return;_0x4640e6=_0x123a7d(_0x25b0('0x132')+_0x5a8ae2[_0x25b0('0x12e')]+']')[_0x25b0('0x0')]('li');if(window[_0x25b0('0xe4')]['allowRecalculate']||!_0x4640e6['find'](_0x25b0('0x12f'))[_0x25b0('0x7')])_0x2d490a=_0x123a7d(_0x25b0('0x133')),_0x2d490a[_0x25b0('0x52')](_0x25b0('0x134'))['html'](_0x5a8ae2[_0x25b0('0x4b')]),_0x5a8ae2=_0x4640e6[_0x25b0('0x52')](_0x25b0('0x135')),_0x5a8ae2[_0x25b0('0x7')]?_0x5a8ae2[_0x25b0('0x136')](_0x2d490a)[_0x25b0('0x48')](_0x25b0('0x131')):_0x4640e6[_0x25b0('0x136')](_0x2d490a);}_0x2f7403&&(window[_0x25b0('0xe4')][_0x25b0('0x12a')]=!0x1);};window[_0x25b0('0xe4')][_0x25b0('0xe5')]=function(){window[_0x25b0('0xe4')][_0x25b0('0x12a')]=!0x0;_0x23f7e0[_0x25b0('0x28')](this);};_0x123a7d(document)[_0x25b0('0xb0')](function(){_0x23f7e0[_0x25b0('0x28')](this);});}catch(_0x513bdd){_0x25b0('0x3')!==typeof console&&_0x25b0('0x9')===typeof console[_0x25b0('0x14')]&&console[_0x25b0('0x14')](_0x25b0('0x66'),_0x513bdd);}}(this));(function(){try{var _0xccb562=jQuery,_0x6ee053,_0x587758={'selector':_0x25b0('0x137'),'dropDown':{},'buyButton':{}};_0xccb562[_0x25b0('0x138')]=function(_0x48e826){var _0x1d718e={};_0x6ee053=_0xccb562[_0x25b0('0x16')](!0x0,{},_0x587758,_0x48e826);_0x48e826=_0xccb562(_0x6ee053[_0x25b0('0x139')])['QD_dropDownCart'](_0x6ee053[_0x25b0('0x13a')]);_0x1d718e[_0x25b0('0x7c')]=_0x25b0('0x3')!==typeof _0x6ee053[_0x25b0('0x13a')][_0x25b0('0x127')]&&!0x1===_0x6ee053[_0x25b0('0x13a')]['updateOnlyHover']?_0xccb562(_0x6ee053[_0x25b0('0x139')])[_0x25b0('0x75')](_0x48e826['fn'],_0x6ee053['buyButton']):_0xccb562(_0x6ee053['selector'])[_0x25b0('0x75')](_0x6ee053[_0x25b0('0x7c')]);_0x1d718e[_0x25b0('0x13a')]=_0x48e826;return _0x1d718e;};_0xccb562['fn'][_0x25b0('0x13b')]=function(){_0x25b0('0x18')===typeof console&&_0x25b0('0x9')===typeof console[_0x25b0('0x2d')]&&console[_0x25b0('0x2d')]('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0xccb562[_0x25b0('0x13b')]=_0xccb562['fn'][_0x25b0('0x13b')];}catch(_0x4ec6e2){_0x25b0('0x3')!==typeof console&&'function'===typeof console[_0x25b0('0x14')]&&console[_0x25b0('0x14')](_0x25b0('0x66'),_0x4ec6e2);}}());

/* Quatro Digital - Product Thumbs // Carlos Vinicius // Todos os direitos reservados. */
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs();a.trigger("QuatroDigital.pt_callback",[a])}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return a.length?$.extend({},a,new b(a)):a},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0xed5a=['/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27','\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','removeClass','controlVideo','.qd-playerWrapper\x20iframe','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','attr','rel','youtube','a:not(.qd-videoLink)','click','contentWindow','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','start','QuatroDigital.pv_video_added','ajaxStop','load','.qd-videoLink','body','.produto','object','undefined','alerta','toLowerCase','warn','info','[Video\x20in\x20product]\x20','error','qdVideoInProduct','extend','td.value-field.Videos:first','http','div#image','text','length','indexOf','split','pop','shift','youtu.be','push','be/','prependTo','#include','wrap','<div\x20class=\x22qd-playerContainer\x22></div>','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','charCodeAt','join','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','html','<iframe\x20src=\x22','urlProtocol','?wmode=transparent&rel=0&enablejsapi=1\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>','data','height','stop','fadeTo','addClass','qdpv-video-on','add','animate','find','iframe','a:not(\x27.qd-videoLink\x27)','bind','click.removeVideo','hide','removeAttr','style','.qd-videoItem','call','string','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/'];(function(_0x2933ee,_0x247b82){var _0x34e284=function(_0x26bcb1){while(--_0x26bcb1){_0x2933ee['push'](_0x2933ee['shift']());}};_0x34e284(++_0x247b82);}(_0xed5a,0xb6));var _0xaed5=function(_0x15b380,_0x1a3c5f){_0x15b380=_0x15b380-0x0;var _0x232c5c=_0xed5a[_0x15b380];return _0x232c5c;};(function(_0x463d97){$(function(){if($(document[_0xaed5('0x0')])['is'](_0xaed5('0x1'))){var _0x6363f7=[];var _0x3e5c5b=function(_0x77527c,_0x1eb7cf){_0xaed5('0x2')===typeof console&&(_0xaed5('0x3')!==typeof _0x1eb7cf&&_0xaed5('0x4')===_0x1eb7cf[_0xaed5('0x5')]()?console[_0xaed5('0x6')]('[Video\x20in\x20product]\x20'+_0x77527c):_0xaed5('0x3')!==typeof _0x1eb7cf&&'info'===_0x1eb7cf['toLowerCase']()?console[_0xaed5('0x7')](_0xaed5('0x8')+_0x77527c):console[_0xaed5('0x9')]('[Video\x20in\x20product]\x20'+_0x77527c));};window[_0xaed5('0xa')]=window[_0xaed5('0xa')]||{};var _0x2b889d=$[_0xaed5('0xb')](!0x0,{'insertThumbsIn':'start','videoFieldSelector':_0xaed5('0xc'),'controlVideo':!0x0,'urlProtocol':_0xaed5('0xd')},window['qdVideoInProduct']);var _0x2a34a2=$('ul.thumbs');var _0x2f5909=$(_0xaed5('0xe'));var _0x3ce872=$(_0x2b889d['videoFieldSelector'])[_0xaed5('0xf')]()['replace'](/\;\s*/,';')['split'](';');for(var _0xc80c34=0x0;_0xc80c34<_0x3ce872[_0xaed5('0x10')];_0xc80c34++)-0x1<_0x3ce872[_0xc80c34][_0xaed5('0x11')]('youtube')?_0x6363f7['push'](_0x3ce872[_0xc80c34][_0xaed5('0x12')]('v=')[_0xaed5('0x13')]()['split'](/[&#]/)[_0xaed5('0x14')]()):-0x1<_0x3ce872[_0xc80c34][_0xaed5('0x11')](_0xaed5('0x15'))&&_0x6363f7[_0xaed5('0x16')](_0x3ce872[_0xc80c34][_0xaed5('0x12')](_0xaed5('0x17'))['pop']()[_0xaed5('0x12')](/[\?&#]/)[_0xaed5('0x14')]());var _0x208b76=$('<div\x20class=\x22qd-playerWrapper\x22></div>');_0x208b76[_0xaed5('0x18')](_0xaed5('0x19'));_0x208b76[_0xaed5('0x1a')](_0xaed5('0x1b'));_0x3ce872=function(_0x4f8dd6){var _0x5a481a={'t':_0xaed5('0x1c')};return function(_0x4eef7c){var _0x21dc5c=function(_0x56a530){return _0x56a530;};var _0x326888=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4eef7c=_0x4eef7c['d'+_0x326888[0x10]+'c'+_0x326888[0x11]+'m'+_0x21dc5c(_0x326888[0x1])+'n'+_0x326888[0xd]]['l'+_0x326888[0x12]+'c'+_0x326888[0x0]+'ti'+_0x21dc5c('o')+'n'];var _0x53512b=function(_0x423ca7){return escape(encodeURIComponent(_0x423ca7[_0xaed5('0x1d')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x3dd005){return String['fromCharCode'](('Z'>=_0x3dd005?0x5a:0x7a)>=(_0x3dd005=_0x3dd005[_0xaed5('0x1e')](0x0)+0xd)?_0x3dd005:_0x3dd005-0x1a);})));};var _0x90544c=_0x53512b(_0x4eef7c[[_0x326888[0x9],_0x21dc5c('o'),_0x326888[0xc],_0x326888[_0x21dc5c(0xd)]][_0xaed5('0x1f')]('')]);_0x53512b=_0x53512b((window[['js',_0x21dc5c('no'),'m',_0x326888[0x1],_0x326888[0x4]['toUpperCase'](),_0xaed5('0x20')]['join']('')]||_0xaed5('0x21'))+['.v',_0x326888[0xd],'e',_0x21dc5c('x'),'co',_0x21dc5c('mm'),_0xaed5('0x22'),_0x326888[0x1],'.c',_0x21dc5c('o'),'m.',_0x326888[0x13],'r'][_0xaed5('0x1f')](''));for(var _0x28d599 in _0x5a481a){if(_0x53512b===_0x28d599+_0x5a481a[_0x28d599]||_0x90544c===_0x28d599+_0x5a481a[_0x28d599]){var _0x4a90ad='tr'+_0x326888[0x11]+'e';break;}_0x4a90ad='f'+_0x326888[0x0]+'ls'+_0x21dc5c(_0x326888[0x1])+'';}_0x21dc5c=!0x1;-0x1<_0x4eef7c[[_0x326888[0xc],'e',_0x326888[0x0],'rc',_0x326888[0x9]]['join']('')]['indexOf'](_0xaed5('0x23'))&&(_0x21dc5c=!0x0);return[_0x4a90ad,_0x21dc5c];}(_0x4f8dd6);}(window);if(!eval(_0x3ce872[0x0]))return _0x3ce872[0x1]?_0x3e5c5b(_0xaed5('0x24')):!0x1;var _0x1755ae=function(_0x2c1ccb,_0x1bfc62){'youtube'===_0x1bfc62&&_0x208b76[_0xaed5('0x25')](_0xaed5('0x26')+_0x2b889d[_0xaed5('0x27')]+'://www.youtube.com/embed/'+_0x2c1ccb+_0xaed5('0x28'));_0x2f5909[_0xaed5('0x29')]('height',_0x2f5909[_0xaed5('0x29')](_0xaed5('0x2a'))||_0x2f5909[_0xaed5('0x2a')]());_0x2f5909[_0xaed5('0x2b')](!0x0,!0x0)[_0xaed5('0x2c')](0x1f4,0x0,function(){$(_0xaed5('0x0'))[_0xaed5('0x2d')](_0xaed5('0x2e'));});_0x208b76['stop'](!0x0,!0x0)[_0xaed5('0x2c')](0x1f4,0x1,function(){_0x2f5909[_0xaed5('0x2f')](_0x208b76)[_0xaed5('0x30')]({'height':_0x208b76[_0xaed5('0x31')](_0xaed5('0x32'))[_0xaed5('0x2a')]()},0x2bc);});};removePlayer=function(){_0x2a34a2[_0xaed5('0x31')](_0xaed5('0x33'))[_0xaed5('0x34')](_0xaed5('0x35'),function(){_0x208b76[_0xaed5('0x2b')](!0x0,!0x0)[_0xaed5('0x2c')](0x1f4,0x0,function(){$(this)[_0xaed5('0x36')]()[_0xaed5('0x37')](_0xaed5('0x38'));$(_0xaed5('0x0'))['removeClass'](_0xaed5('0x2e'));});_0x2f5909[_0xaed5('0x2b')](!0x0,!0x0)[_0xaed5('0x2c')](0x1f4,0x1,function(){var _0x26055a=_0x2f5909[_0xaed5('0x29')]('height');_0x26055a&&_0x2f5909[_0xaed5('0x30')]({'height':_0x26055a},0x2bc);});});};var _0x453d63=function(){if(!_0x2a34a2[_0xaed5('0x31')](_0xaed5('0x39'))['length'])for(vId in removePlayer[_0xaed5('0x3a')](this),_0x6363f7)if(_0xaed5('0x3b')===typeof _0x6363f7[vId]&&''!==_0x6363f7[vId]){var _0x4b5363=$(_0xaed5('0x3c')+_0x6363f7[vId]+_0xaed5('0x3d')+_0x6363f7[vId]+_0xaed5('0x3e')+_0x6363f7[vId]+_0xaed5('0x3f'));_0x4b5363[_0xaed5('0x31')]('a')[_0xaed5('0x34')]('click.playVideo',function(){var _0x5462ab=$(this);_0x2a34a2[_0xaed5('0x31')]('.ON')[_0xaed5('0x40')]('ON');_0x5462ab['addClass']('ON');0x1==_0x2b889d[_0xaed5('0x41')]?$(_0xaed5('0x42'))[_0xaed5('0x10')]?(_0x1755ae[_0xaed5('0x3a')](this,'',''),$('.qd-playerWrapper\x20iframe')[0x0]['contentWindow'][_0xaed5('0x43')](_0xaed5('0x44'),'*')):_0x1755ae[_0xaed5('0x3a')](this,_0x5462ab[_0xaed5('0x45')](_0xaed5('0x46')),_0xaed5('0x47')):_0x1755ae['call'](this,_0x5462ab['attr'](_0xaed5('0x46')),_0xaed5('0x47'));return!0x1;});0x1==_0x2b889d[_0xaed5('0x41')]&&_0x2a34a2['find'](_0xaed5('0x48'))[_0xaed5('0x49')](function(_0xad88ee){$(_0xaed5('0x42'))['length']&&$(_0xaed5('0x42'))[0x0][_0xaed5('0x4a')][_0xaed5('0x43')](_0xaed5('0x4b'),'*');});_0xaed5('0x4c')===_0x2b889d['insertThumbsIn']?_0x4b5363[_0xaed5('0x18')](_0x2a34a2):_0x4b5363['appendTo'](_0x2a34a2);_0x4b5363['trigger'](_0xaed5('0x4d'),[_0x6363f7[vId],_0x4b5363]);}};$(document)[_0xaed5('0x4e')](_0x453d63);$(window)[_0xaed5('0x4f')](_0x453d63);(function(){var _0x2f046e=this;var _0x5b7b2e=window['ImageControl']||function(){};window['ImageControl']=function(_0xda05db,_0x530a6d){$(_0xda05db||'')['is'](_0xaed5('0x50'))||(_0x5b7b2e[_0xaed5('0x3a')](this,_0xda05db,_0x530a6d),_0x453d63['call'](_0x2f046e));};}());}});}(this));

/* Quatro Digital - Mosaic Banners // Carlos Vinicius // Todos os direitos reservados */
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

