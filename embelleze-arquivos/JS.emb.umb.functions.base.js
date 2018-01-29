/**
* Funções base
*/
String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")});
"function"!=typeof String.prototype.capitalize&&(String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1).toLowerCase()});
"function"!==typeof String.prototype.replaceSpecialChars&&(String.prototype.replaceSpecialChars=function(){var b={"\u00e7":"c","\u00e6":"ae","\u0153":"oe","\u00e1":"a","\u00e9":"e","\u00ed":"i","\u00f3":"o","\u00fa":"u","\u00e0":"a","\u00e8":"e","\u00ec":"i","\u00f2":"o","\u00f9":"u","\u00e4":"a","\u00eb":"e","\u00ef":"i","\u00f6":"o","\u00fc":"u","\u00ff":"y","\u00e2":"a","\u00ea":"e","\u00ee":"i","\u00f4":"o","\u00fb":"u","\u00e5":"a","\u00e3":"a","\u00f8":"o","\u00f5":"o",u:"u","\u00c1":"A","\u00c9":"E", "\u00cd":"I","\u00d3":"O","\u00da":"U","\u00ca":"E","\u00d4":"O","\u00dc":"U","\u00c3":"A","\u00d5":"O","\u00c0":"A","\u00c7":"C"};return this.replace(/[\u00e0-\u00fa]/ig,function(a){return"undefined"!=typeof b[a]?b[a]:a})});
Array.prototype.indexOf||(Array.prototype.indexOf=function(d,e){var a;if(null==this)throw new TypeError('"this" is null or not defined');var c=Object(this),b=c.length>>>0;if(0===b)return-1;a=+e||0;Infinity===Math.abs(a)&&(a=0);if(a>=b)return-1;for(a=Math.max(0<=a?a:b-Math.abs(a),0);a<b;){if(a in c&&c[a]===d)return a;a++}return-1});

/* QD Blog Integration - functions.base add-on // 1.0 */
(function(){
	try{
		if(!window.QD_blogIntegrationBlockRedirect && window.top.location != window.location)
			window.top.location = window.location;
	}
	catch(e){
		if (typeof console !== "undefined" && typeof console.info === "function")
			console.info("Erro ao verificar se o site esta em um iframe. ", e.message);
	}
})();

try {
	var Common = {
		run: function() {},
		init: function() {
			Common.qdOverlay();
			Common.applyAmazingMenu();
			Common.applyAmazingMenuMobile();
			Common.applyCarouselShelf();
			Common.applySmartCart();
			Common.applyMosaicBanners();
			Common.openSearchModal();
			Common.setDataScrollToggle();
			Common.vtexBindQuickViewDestroy();
			Common.applyTipBarCarousel();
			Common.saveAmountFix();
			Common.headerBannerTop();
			Common.openModalVideoInstitutional();
			// Common.smartQuantity();
			
		},
		ajaxStop: function() {
			Common.appendSkuPopUpCloseBtn();
			Common.facebookLikebox();
			Common.saveAmountFix();
			// Common.smartQuantity();
		},
		windowOnload: function() {},
		qdOverlayClass: 'qd-am-on qd-cart-show qd-sn-on',
		headerBannerTop: function() {
			var bannerTop = $('.header-qd-v1-top-banner').find('img').length;

			if (bannerTop >= 1) {
				$('body').addClass('umber-bannerTop');
			}
		},
		qdOverlay: function() {
			$('.components-qd-v1-overlay').click(function() {
				$(document.body).removeClass(Common.qdOverlayClass);
				Common.blogAdjustBodyHeight();
			});
		},
		smartQuantity: function() {
			$(".shelf-qd-v2:not(.qd-on)").addClass('qd-on').QD_smartQuantity({
                buyButton: ".buy-button",
				setQuantityByUrl: false
			});			

			positionSmartQtt();
			$(window).resize(function(){
				positionSmartQtt();
			});

			function positionSmartQtt() {
				var shelf = $('.shelf-qd-v2');
				var shelfWidth = shelf.width();

				shelf.each(function(){
					if (shelfWidth < 395) {
						$(this).find('.qtt-col').removeClass('col-md-5');
						$(this).find('.btn-col').removeClass('col-md-7');
					}
					else {
						$(this).find('.qtt-col').addClass('col-md-5');
						$(this).find('.btn-col').addClass('col-md-7');
					}
				});
			}
		},
		appendSkuPopUpCloseBtn: function() {
			var wrapper = $('.boxPopUp2 .selectSkuTitle:not(.qd-on)');
			wrapper.addClass('qd-on').append($('<span class="modal-qd-v1-box-popup-close">Fechar</span>').click(function() {
				$(window).trigger('vtex.modal.hide');
				wrapper.removeClass('.qd-on');
				return false;
			}));
		},
		applyCarouselShelf: function() {
			var wrapper = $('.carousel-qd-v1-shelf .prateleira');

			if (!wrapper.length)
				return false;

			wrapper.each(function() {
				var $t = $(this);
				$t.find('h2').prependTo($t.parent());
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
		applyAmazingMenu: function() {
			$('.header-qd-v1-amazing-menu, .footer-qd-v1-menu-list').QD_amazingMenu({
				url: window.location.origin+"/qd-amazing-menu"
			});

			$('.header-qd-v1-floating-amazing-menu').click(function(e) {
				$('.header-qd-v1-amazing-menu-wrapper').toggleClass('qd-is-active');
				e.preventDefault();
			});
		},
		applyAmazingMenuMobile: function() {
			var wrapper = $('.header-qd-v1-amazing-menu-mobile');
			wrapper.find('>ul >li >ul').prepend(function(){return $(this).prev().clone().wrap('<li></li>').parent()});
			wrapper.QD_amazingMenu({
				url: "/qd-amazing-menu",
				callback: function() {
					$('<span class="qd-am-dropdown-trigger"><i class="fa fa-angle-right"></i></span>').appendTo(wrapper.find('.qd-am-has-ul')).click(function() {
						var $t = $(this);
						$t.parent().add($t.closest('ul')).toggleClass('qd-am-is-active');
						$t.filter(function(){return !$(this).closest('ul').is('.qd-amazing-menu');}).siblings('ul').stop(true, true).slideToggle();
					});

					wrapper.find('>ul >li >.qd-am-dropdown-trigger').click(function() {
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
				Common.blogAdjustBodyHeight();
			});

			$('.header-qd-v1-amazing-menu-mobile-wrapper .header-qd-v1-user-message').on('click', 'a#login', function() {
				$(document.body).removeClass('qd-am-on');
				Common.blogAdjustBodyHeight();
			});

		},
		blogAdjustBodyHeight: function() {
			if($(document.body).is('.qd-am-on')){
				var menuHeight = $('.header-qd-v1-amazing-menu-mobile-wrapper >.row').height();
				$(document.body).css('min-height', menuHeight);
			}
			else
				$(document.body).css('min-height', '');

		},
		facebookLikebox: function() {
			$(".footer-qd-v1-facebook-likebox").html('<div class="fb-page" data-href="https://www.facebook.com/embelleze" data-width="185" data-small-header="true" data-adapt-container-width="false" data-hide-cover="true" data-show-facepile="false"><blockquote cite="https://www.facebook.com/embelleze" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/embelleze">Embelleze</a></blockquote></div>');
		},
		applyMosaicBanners: function() {
			$('.mosaic-qd-v1-wrapper > .box-banner').QD_mosaicBanners({
				bannerColSecurityMargin: -30,
				containerWidth: 1326
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
					forceImageHTTPS: true,
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
				// Desabilita modal no blog
				if($(document.body).is('.qd-blog-page')) 
					return;

				evt.preventDefault();
				$(document.body).toggleClass('qd-cart-show');

				wrapper.height($(window).height());
				wrapper.find(".qd-ddc-prodWrapper").css('max-height', $(window).height() - 193);
			});

			$('.qd_ddc_lightBoxClose').click(function(evt){
				$(document.body).removeClass(Common.qdOverlayClass);
				Common.blogAdjustBodyHeight();
			});
		},
		openSearchModal: function() {
			// Mostra busca no blog mobile
			$('.modal-qd-v1-search').on('show.bs.modal', function(){
				$(document.body).css('min-height', '200px');
			}).on('hidden.bs.modal', function(){
				$(document.body).css('min-height', '');
			});
			
			$('.header-qd-v1-action-search').click(function(e) {
				e.preventDefault();
				$('.modal-qd-v1-search').modal();
			});
		},
		setDataScrollToggle: function() {
			$(document.body).attr('data-qd-scroll-limit', '100');
		},
		vtexBindQuickViewDestroy: function() {
			window.bindQuickView = function() {};
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
				infinite: true,
				draggable: false,
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
					return { slidesToShow: 2, slidesToScroll: 2 };
				return {};
			})()));
		},
		saveAmountFix: function() {
			$('.shelf-qd-v1-highlight-discount-percentage:not(.qd-on)').addClass('qd-on').each(function() {
				var $t = $(this);
				$t.text(($t.text().trim().match(/[0-9]+/) || [""]).pop() + '%');
			});
		},
		openModalVideoInstitutional: function() {
			var videoRegex = /(youtu\.be\/|\?v=)([^&]+)/i;

			$('.box-banner a').filter('[href*="youtube.com/"], [href*="youtu.be/"]').click(function(e) {
				e.preventDefault();
				var modal = $('.modal-qd-v1-home-video-wrapper .modal').clone().appendTo(document.body);
				var $t = $(this);
				var videoId = ($t.attr('href').match(videoRegex) || ['']).pop();

				modal.find('.embed-responsive *').remove();

				modal.find('.modal-header').append('<h2 class="modal-title">' + $t.find('img').attr('alt') + '</h2>');
				$('<iframe src="' + 'https://www.youtube.com/embed/' + videoId + '?wmode=transparent&rel=0" frameborder="0"></iframe>').appendTo(modal.find('.embed-responsive'));
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
			Home.applyBrandCarousel();
			Home.applyMosaicCategorieBanners();
			Home.applySpecialShelfCarousel();
			Home.instagramPhotoFeed();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		sliderFull: function() {
			var wrapper = $('.slider-qd-v1-full');

			wrapper.slick({
				autoplay: true,
				dots: true,
				fade: true,
				cssEase: 'linear',
				infinite: true,
				speed: 500,
				draggable: false
			});

			wrapper.each(function() {
				$(this).find('.slick-arrow').wrapAll('<div class="slick-nav" />');
			});
		},
		applyBrandCarousel: function() {
			var wrapper = $('.brand-carousel-qd-v1-carousel');

			wrapper.slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: 5,
				slidesToScroll: 5,
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
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},

					{
						breakpoint: 380,
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
				bannerColSecurityMargin: -30,
				containerWidth: 1326,
				classFourColumn: "col-xs-12 col-sm-6 col-md-3"
			});
		},
		applySpecialShelfCarousel: function() {
			var wrapper = $('.home-qd-v1-special-carousel-banner');

			if (!wrapper.length)
				return false;

			var hasBanner = wrapper.find('.box-banner').length;
			if (!hasBanner)
				wrapper.find('[class*="col-md-"]').removeClass().addClass('col-xs-12');

			wrapper.each(function() {
				var $t = $(this);
				$t.find('h2').prependTo($t.children('.container'));
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
						breakpoint: 900,
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
		instagramPhotoFeed: function() {
			$('.home-qd-v1-instagram-photos').QD_socialPhotos('47323401.1677ed0.c5b37a7060214ad39e3ff2bbbede307a', {
				socialType: 'instagram',
				user: 'embelleze',
				photosQtty: 12
			});
		}
	};

	var Search = {
		init: function() {
			Search.openFiltersMenu();
			Search.shelfLineFix();
		},
		ajaxStop: function() {
			Search.shelfLineFix();
		},
		windowOnload: function() {
			Search.shelfLineFix();
		},
		openFiltersMenu: function() {
			$('.search-qd-v1-navigator-trigger').click(function(e) {
				e.preventDefault();
				$(document.body).toggleClass('qd-sn-on');
			});
		},
		shelfLineFix: function() {
			try {
				var exec = function() {
					var curTop;
					var wrapper = $("div[id*='ResultItems_'] >.prateleira:not('.qd-fi-on')").addClass('qd-fi-on');

					var shelf = wrapper.children("ul").removeClass('qd-first-line');
					shelf.first().addClass("qd-first-line");

					var setFirst = function() {
						shelf.each(function(){
							var $t = $(this);

							if($t.is(".qd-first-line")){
								curTop = $t.offset().top;
								shelf = shelf.not($t);
								return;
							}

							var offsetTop = $t.offset().top;
							if (offsetTop >= curTop - 10 && offsetTop <= curTop + 10)
								shelf = shelf.not($t);
							else{
								$t.addClass("qd-first-line");
								return false;
							}
						});

						if(shelf.length)
							setFirst();
					};
					setFirst();
				};
				exec();

				// Olhando para o Smart Research
				if(!window.qd_shelf_line_fix_){
					$(window).on("QuatroDigital.sr_shelfCallback", exec);
					window.qd_shelf_line_fix_ = true;
				}

				// Olhando para o evento window resize
				var resize = $._data(window).events.resize;
				var allowResize = true;
				if(resize)
					for(var i = 0; i < resize.length; i++){
						if(resize[i].namespace == "qd"){
							allowResize = false;
							break;
						}
					}
				if(allowResize){
					var timeOut = 0;
					$(window).on("resize.qd", function(){
						clearTimeout(timeOut);
						timeOut = setTimeout(function() {
							$(".qd-first-line").removeClass(".qd-first-line");
							exec();
						}, 20);
					});
				}
			}
			catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: " + e.message)); }
		}
	};

	var Product = {
		run: function() {},
		init: function() {
			// Product.forceImageZoom();
			// Product.openShipping();
			// Product.openShipping();
			Product.accessoriesFix();
			Product.accessoriesApplyCarousel();
			Product.forceImageZoom();
			Product.smartQuantity();
			// Product.qdCallThumbVideo();
			Product.scrollToDescription();
			Product.selectSku();
			Product.videoForceHttps();
			Product.applyCarouselThumb(); $(window).on('skuSelected.vtex', Product.applyCarouselThumb);
			// Apenas para tela de KIT
			if ($(document.body).has(".product-kit")) {
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
			else {
				// Product.saveAmountFlag();
				// Product.setAvailableBodyClass();
			}
		},
		ajaxStop: function() {},
		windowOnload: function() {
			// $('.product-qd-v1-image-thumbs').children().clone().appendTo($('.product-qd-v1-image-thumbs'))
			Product.setCEPPlaceholder();
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
		smartQuantity: function() {
			$('.product-qd-v1-sku-selection .skulist').each(function(){
				$(this).find('.nomeSku, .preco').wrap('<div class="qd-sku-info-wrapper">');
			});
		},
		qdCallThumbVideo: function() {
			// window.qdVideoInProduct = {videoFieldSelector: 'td.value-field.Videos:first'};
			// var iframe = $("td.value-field.Video-Descricao-do-Produto:first iframe");

			// if (!iframe.length) {
			// 	window.qdVideoInProduct = {
			// 		videoFieldSelector: 'td.value-field.Video:first',
			// 		urlProtocol: 'https'
			// 	};
			// 	return;
			// }

			// window.qdVideoInProduct = {
			// 	videoFieldSelector: $('<span/>').addClass('video-product').text('https://www.youtube.com/watch?v=' + iframe.attr("src").split("?").shift().split("/").pop() + '&rel=0'),
			// 	urlProtocol: 'https'
			// };
		},
		videoForceHttps: function() {
			qdVideoInProduct={
				urlProtocol: 'https'
			};
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
		applyCarouselThumb: function() {
			var thumbsSliderWrapper = $('.product-qd-v1-image-thumbs-mobile'); // Wrapper onde foi inserido as thumbs

			thumbsSliderWrapper.slick({
  				slidesToShow: 5,
  				arrows: false,
  				infinite: false,
  				dots: false,
  				responsive: [
  					{
  						breakpoint: 600,
  						settings: {
  							slidesToShow: 3
  						}
  					}
  				]
			});
		},
		openShipping: function() {
			if( typeof window.ShippingValue === "function" )
				window.ShippingValue();
		},
		saveAmountFlag: function() {
			var flag = $('.product-qd-v1-stamps-highlight-discount');

			$(window).on('skuSelected.vtex', function(e, sku, data) {
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
		},
		scrollToDescription: function() {
			$('.product-qd-v1-link-description').click(function(e) {
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $('.product-qd-v1-description').offset().top -100
				}, 900, 'swing');
			});
		},
		setCEPPlaceholder: function(){
			$('.freight-zip-box').attr('placeholder', 'Digite seu Cep');
		},
		accessoriesFix: function() {
			$('fieldset >.buy-product-checkbox').parent().each(function() {
				var $t  = $(this);
				$t.add($t.prev('ul')).wrapAll('<div class="accessories-qd-v1-item col-xs-12 col-sm-6 col-md-3"/>');
			});
		},
		accessoriesApplyCarousel: function() {
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
		// Scripts para página de kit
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
		kitBuyAllItemsButton: function () {
			$(".product-qd-v1-buy-button a").attr('href', '#').click(function (e) {

				var url = Product.setBuyUrl();
				if (url)
					$(this).attr('href', url);
				else {
					e.preventDefault();
					alert('Por favor, selecione o modelo desejado.');
				}
			});
		},
		setBuyUrl: function () {
			var btns = $(".product-qd-v1-kit-item-row:not('.qd-state-not-selected, .qd-item-unavailable') .buy-in-page-button");
			var uri = [];
			btns.each(function () {
				var href = this.href || "";

				if (href == "" || href.indexOf("javascript:alert(") > -1) {
					uri = [];

					var elem = $(this).closest('.product-qd-v1-kit-item-row').addClass('qd-state-not-chosen');
					$("html, body").animate({ scrollTop: elem.offset().top - 150 });
					setTimeout(function () {
						elem.removeClass('qd-state-not-chosen');
					}, 700);

					return false;
				}

				var param = (this.search || '').replace('?', '').split("&");
				var itemUri = [];
				for (var k = 0; k < param.length; k++) {
					if (param[k].search(/^(sku|qty|seller)/i) != 0)
						continue;
					itemUri.push(param[k]);
				}
				uri.push(itemUri.join("&"));

			});

			if (uri.length)
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
				setTimeout(function () {
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
				if ($(this)[0].value)
					Product.updateKitTotalPrice();
			});
		},
		updateKitTotalPrice: function () {
			var installment = 1;
			var totalPrice = 0;
			var items = $(".product-qd-v1-kit-item-row:not('.qd-state-not-selected, .qd-item-unavailable') a.buy-in-page-button");

			for (var i = 0; i < items.length; i++) {
				var sku = '';
				var url = items[i].href;
				if (url.indexOf('sku=') >= 0) {
					sku = items[i].href.split('?')[1].match(/sku=(\s*\d+)/i)[1];
				}

				var skuData = Product.getKitItemPrice($(items[i]).attr('productindex'), sku);

				installment = Math.min(installment, skuData['installment']);
				totalPrice += skuData['price'];
			}


			$('.product-qd-v1-price-wrapper .skuBestInstallmentNumber').html(installment + "<span class='x'>x</span>");
			$('.product-qd-v1-price-wrapper .skuBestInstallmentValue').text('R$ ' + (totalPrice / (installment * 100)).toFixed(2).toString().replace('.', ','));
			$('.product-qd-v1-price-wrapper .skuBestPrice').text('R$ ' + (totalPrice / 100).toFixed(2).toString().replace('.', ','));
		},
		getKitItemPrice: function (productindex, sku) {
			var skuData = [];
			var selectedSku = '';
			var productJson = window['skuJson_' + productindex];
			if (sku) {
				for (var k = 0; k < productJson.skus.length; k++) {
					if (productJson.skus[k].sku == sku)
						selectedSku = productJson.skus[k];
				}
			}
			else {
				for (var k = 0; k < productJson.skus.length; k++) {
					if (!selectedSku || productJson.skus[k].bestPrice < selectedSku.bestPrice)
						selectedSku = productJson.skus[k];
				}
			}
			skuData['price'] = selectedSku.bestPrice * selectedSku.unitMultiplier;
			skuData['installment'] = selectedSku.installments;
			return skuData;
		}
		// Scripts para página de kit
	};

	var List = {
		run: function() {},
		init: function() {},
		ajaxStop: function() {},
		windowOnload: function() {}
	};

	var Institutional = {
		init: function() {
			Institutional.sidemenuToggle();

			if($(document.body).is(".blog")) {
				Institutional.initiateRouter();
				Institutional.blogRoutes();
				Institutional.getPostsTitleList();
				Institutional.loadInitialPost();
			}
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		sidemenuToggle:function() {
			// Amazing Menu Responsivo
			$('.institucional-qd-v1-menu-toggle').click(function(evt) {
				evt.preventDefault();
				$(document.body).addClass('qd-sn-on');
			});
			$('.institucional-qd-v1-side-menu-wrap-close').click(function() {
				$(document.body).removeClass('qd-sn-on');
			});
		},
		blogConfig: {
			blog: '//web.embelleze.com/blog',
			per_page: 2,
			disqus: 'embelleze'
		},
		initiateRouter: function() {
			Institutional.router = new Navigo(null, true, '#!');

			Institutional.router.hooks({
				before: Institutional.loading.start
			});

			Institutional.router.notFound(Institutional.showNotFound);
		},
		showNotFound: function() {
			$('.blog-qd-content').addClass('hide');
			$('.blog-qd-not-foud').removeClass('hide');
			Institutional.loading.finish();
		},
		loading: {
			start: function(done) {
				console.log('Loading started')
				$(document.body).addClass("qd-route-loading");
				done();
			},
			finish: function() {
				console.log('Loading finished')
				$(document.body).removeClass("qd-route-loading");
			}
		},
		blogRoutes: function() {
			var blogContent = $('.blog-qd-content');

			var disqusScriptEl;

			Institutional.router.on({
				':slug': function(params) {
					$.ajax({
						url: Institutional.blogConfig.blog + '/wp-json/wp/v2/posts/',
						data: {
							fields: 'id,date,status,title,content,_links.author',
							slug: params.slug
						},
						success: function(d) {
							if(!d.length) return Institutional.showNotFound();
							d = d.pop();

							$.ajax({
								url: d._links.author.pop().href,
								data: {
									fields: 'name,avatar_urls.48'
								},
								success: function(author) {
									blogContent.find('.qd-title').html(d.title.rendered);
									blogContent.find('.qd-author').html(author.name);

									d.date = (new Date(d.date));
									d.date = (d.date.getDate() < 10 ? '0' + (d.date.getDate()) : (d.date.getDate())) + '/' + (d.date.getMonth() < 10 ? '0' + (d.date.getMonth() + 1) : (d.date.getMonth() + 1))  + '/' + (d.date.getYear() + 1900);
									blogContent.find('.qd-date').html(d.date);

									blogContent.find('.qd-content').html(d.content.rendered);
									blogContent.find('.qd-author-image').html('<img src="' + author.avatar_urls["48"] + '" />');

									if(!blogContent.find('#disqus_thread').removeClass('hide').length)
										blogContent.append('<div id="disqus_thread"></div>');

									blogContent.removeClass('hide');
									$('.blog-qd-not-foud').add($('.blog-qd-home')).addClass('hide');

									if(!disqusScriptEl) {
										window.disqus_config = function() {
											this.page.identifier = d.id;
											this.page.url = window.location.href.replace(/\#[\s\S]+/g, '') + "#!/" + params.slug;
											this.page.title = d.title.rendered;
											this.language = 'pt-br';
										};

										disqusScriptEl = document.createElement('script');
										disqusScriptEl.src = 'https://' + Institutional.blogConfig.disqus + '.disqus.com/embed.js';
										disqusScriptEl.setAttribute('data-timestamp', +new Date());
										(document.head || document.body).appendChild(disqusScriptEl)
									} else {
										(DISQUS.reset || function(){})({
											reload: true,
											config: function () {
												this.page.identifier = params.slug;
												this.page.url = "http://127.0.0.1:8887/demo/blog/#!/" + params.slug;
												this.page.title = d.title.rendered;
												this.language = 'pt-br';
											}
										});
									}

									Institutional.loading.finish();
								},
								error: Institutional.showNotFound
							});

						},
						error: Institutional.showNotFound
					});
				},
				'*': function() {
					Institutional.callPostList();
				},
				'category/:id': function(params) {
					Institutional.callPostList({
						categories: params.id
					});
				}
			});
		},
		getPostsTitleList: function() {
			var lastPostsQtd = 10;

			var blogList = $('.blog-qd-post-list > ul');

			var loadMore = function() {
				$.ajax({
					// url: Institutional.blogConfig.blog + '/wp-json/wp/v2/posts',
					url: Institutional.blogConfig.blog + '/wp-json/wp/v2/categories',
					data: {
						// fields: 'slug,title,date',
						// orderby: 'date',
						// order: 'desc',
						fields: 'id,name',
						orderby: 'name',
						order: 'asc',
						per_page: lastPostsQtd,
						page: 1
					},
					success: function(data) {
						// Últimos posts
						// for(var i = 0, row; row = data[i]; i++){
						// 	row.date = (new Date(row.date));
						// 	row.date = (row.date.getDate() < 10 ? '0' + (row.date.getDate()) : (row.date.getDate())) + '/' + (row.date.getMonth() < 10 ? '0' + (row.date.getMonth() + 1) : (row.date.getMonth() + 1))  + '/' + (row.date.getYear() + 1900);
						// 	blogList.append('<li> <span>' + row.date + '</span> <a href="#!/' + row.slug + '"> ' + row.title.rendered + ' </a> </li>');
						// }

						for(var i = 0, row; row = data[i]; i++){
							blogList.append('<li> <a href="#!/category/' + row.id + '"> ' + row.name + ' </a> </li>');
						}

					}
				});
			};

			loadMore();
		},
		loadInitialPost: function() {
			var hash = window.location.hash.replace(/#|\!/g, '').replace(/^\/+/g, '').toString();
			window.location.hash = '';
			Institutional.router.navigate('/' + hash);
		},
		callPostList: function(data) {
			var blogContent = $('.blog-qd-content');

			var homePostsList = $('.blog-qd-home .blog-qd-posts');
			Institutional.postModel = Institutional.postModel || homePostsList.find('.blog-qd-post-item').detach().first();
			homePostsList.empty();
			var maxContentLength = 200;

			var page = 1;
			var per_page = 10;

			var sendData = $.extend({}, {
				fields: 'slug,title,date,content,better_featured_image.source_url',
				orderby: 'date',
				order: 'desc',
				per_page: per_page,
				page: page
			}, data);

			page = sendData.page;
			per_page = sendData.per_page;

			loadMoreBtn = $('<a class="blog-qd-v1-load-more"> Carregar mais itens </a>').appendTo(homePostsList).click(function(e) {
				e.preventDefault();

				return $.ajax({
					url: Institutional.blogConfig.blog + '/wp-json/wp/v2/posts',
					data: sendData,
					success: function(data) {
						var posts = new $;
						for(var i = 0, row; row = data[i]; i++) {
							var postItem = Institutional.postModel.clone();

							// Adiciona imagem de destaque
							if(row.better_featured_image)
								postItem.find('.qd-featured-image').html('<img src="' + row.better_featured_image.source_url + '" alt="' + row.title.rendered + '" />');
							else
								postItem.addClass('qd-no-featured-image');

							// Adiciona título
							postItem.find('.qd-title').html(row.title.rendered);

							// Adiciona data
							row.date = (new Date(row.date));
							row.date = (row.date.getDate() < 10 ? '0' + (row.date.getDate()) : (row.date.getDate())) + '/' + (row.date.getMonth() < 10 ? '0' + (row.date.getMonth() + 1) : (row.date.getMonth() + 1))  + '/' + (row.date.getYear() + 1900);
							postItem.find('.qd-date').html(row.date);

							// Adiciona conteúdo e link
							postItem.find('.qd-content').html((row.content.rendered.length > maxContentLength ? row.content.rendered.substr(0, maxContentLength) + '...' : row.content.rendered));
							postItem.find('a.qd-link').attr('href', '#!/' + row.slug);

							posts = posts.add(postItem);
						}

						loadMoreBtn.before(posts);

						if(!posts.length)
							loadMoreBtn.before($('<p> Não existem posts pra essa pesquisa </p>'));

						sendData.page++;

						if(posts.length < per_page)
							loadMoreBtn.remove();

						blogContent.add($('.blog-qd-not-foud')).addClass('hide');
						$('.blog-qd-home').removeClass('hide');
						Institutional.loading.finish();
					},
					error: function(){
						loadMoreBtn.remove();
						Institutional.loading.finish();
					}
				});
			}).click();
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

/* Quatro Digital - jQuery Ajax Queue // 4.0 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT <http://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT> */
(function(d){if("function"!==typeof d.qdAjax){var a={};d.qdAjaxQueue=a;150>parseInt((d.fn.jquery.replace(/[^0-9]+/g,"")+"000").slice(0,3),10)&&console&&"function"==typeof console.error&&console.error();d.qdAjax=function(f){try{var b=d.extend({},{url:"",type:"GET",data:"",success:function(){},error:function(){},complete:function(){},clearQueueDelay:5},f),e;e="object"===typeof b.data?JSON.stringify(b.data):b.data.toString();var c=encodeURIComponent(b.url+"|"+b.type+"|"+e);a[c]=a[c]||{};"undefined"==
typeof a[c].jqXHR?a[c].jqXHR=d.ajax(b):(a[c].jqXHR.done(b.success),a[c].jqXHR.fail(b.error),a[c].jqXHR.always(b.complete));a[c].jqXHR.always(function(){isNaN(parseInt(b.clearQueueDelay))||setTimeout(function(){a[c].jqXHR=void 0},b.clearQueueDelay)});return a[c].jqXHR}catch(g){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Problemas no $.qdAjax :( . Detalhes: "+g.message)}};d.qdAjax.version="4.0"}})(jQuery);
/* Quatro Digital - VTEX Checkout Queue // 1.1 //  Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
(function(){var l=function(a,c){if("object"===typeof console){var d="object"===typeof a;"undefined"!==typeof c&&"alerta"===c.toLowerCase()?d?console.warn("[QD VTEX Checkout Queue]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.warn("[QD VTEX Checkout Queue]\n"+a):"undefined"!==typeof c&&"info"===c.toLowerCase()?d?console.info("[QD VTEX Checkout Queue]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.info("[QD VTEX Checkout Queue]\n"+a):d?console.error("[QD VTEX Checkout Queue]\n",a[0],a[1],
a[2],a[3],a[4],a[5],a[6],a[7]):console.error("[QD VTEX Checkout Queue]\n"+a)}},f=null,g={},h={},e={};$.QD_checkoutQueue=function(a,c){if(null===f)if("object"===typeof window.vtexjs&&"undefined"!==typeof window.vtexjs.checkout)f=window.vtexjs.checkout;else return l("N\u00e3o foi encontrada a biblioteca VTEX.js. Este componente para por aqui, a for\u00e7a n\u00e3o esta mais contigo neste jornada! Para resolver isto inclua a biblioteca VTEX.js");var d=$.extend({done:function(){},fail:function(){}},c),
b=a.join(";"),k=function(){g[b].add(d.done);h[b].add(d.fail)};e[b]?k():(g[b]=$.Callbacks(),h[b]=$.Callbacks(),k(),e[b]=!0,f.getOrderForm(a).done(function(a){e[b]=!1;g[b].fire(a)}).fail(function(a){e[b]=!1;h[b].fire(a)}))}})();
/* Quatro Digital - Scroll Toggle // 1.4 // Carlos Vinicius // Todos os direitos reservados */
(function(){var c=jQuery,e=function(a,d){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var b;"object"===typeof a?(a.unshift("[QD Scroll Toggle]\n"),b=a):b=["[QD Scroll Toggle]\n"+a];if("undefined"===typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===d.toLowerCase())try{console.info.apply(console,b)}catch(c){try{console.info(b.join("\n"))}catch(e){}}else try{console.error.apply(console,
b)}catch(h){try{console.error(b.join("\n"))}catch(k){}}else try{console.warn.apply(console,b)}catch(l){try{console.warn(b.join("\n"))}catch(m){}}}};"function"!==typeof c.QD_scrollToggle&&(c.QD_scrollToggle=function(a){var d=[];if("string"!==typeof a&&"number"!==typeof a||"auto"===a)if("auto"===a)d.push(c(window).height());else return e("N\u00e3o foi informado o limite de scroll necess\u00e1rio para adicionar o atributo.");else{var b=a.split(","),f;for(f in b)"function"!==typeof b[f]&&(a=parseInt(b[f].trim()),
isNaN(a)||d.push(a))}if(!d.length)return e("Aaeeeeeeee irm\u00e3o! N\u00e3o consegui encontrar nenhum valor para calcular o scroll");if(!document||!document.body||"undefined"===typeof document.body.setAttribute)return e('"document.body.setAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!document||!document.body||"undefined"===typeof document.body.removeAttribute)return e('"document.body.removeAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!document||!document.body||"undefined"===
typeof document.body.getAttribute)return e('"document.body.getAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!c(window).scrollTop||isNaN(parseInt(c(window).scrollTop())))return e('"$(window).scrollTop" n\u00e3o esta retornando um n\u00famero inteiro :(');try{document.body.setAttribute("data-qd-scroll",1),document.body.getAttribute("data-qd-scroll"),document.body.removeAttribute("data-qd-scroll"),document.body.getAttribute("data-qd-scroll")}catch(g){e("N\u00e3o foi poss\u00edvel fazer o passo a passo de consultar, adicionar e remover um atributo",
g.message)}c(window).scroll(function(){for(var a=0;a<d.length;a++)c(window).scrollTop()>d[a]?document.body.getAttribute("data-qd-scroll-"+a)||document.body.setAttribute("data-qd-scroll-"+a,1):document.body.getAttribute("data-qd-scroll-"+a)&&document.body.removeAttribute("data-qd-scroll-"+a)})},c(function(){var a=c("body[data-qd-scroll-limit]");a.length&&c.QD_scrollToggle(a.attr("data-qd-scroll-limit"))}))})();
/* jQuery Cookie Plugin v1.4.1 // https://github.com/carhartl/jquery-cookie // Copyright 2013 Klaus Hartl // Released under the MIT license */
(function(){"function"!==typeof $.cookie&&function(c){"function"===typeof define&&define.amd?define(["jquery"],c):"object"===typeof exports?c(require("jquery")):c(jQuery)}(function(c){function p(a){a=e.json?JSON.stringify(a):String(a);return e.raw?a:encodeURIComponent(a)}function n(a,g){var b;if(e.raw)b=a;else a:{var d=a;0===d.indexOf('"')&&(d=d.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{d=decodeURIComponent(d.replace(l," "));b=e.json?JSON.parse(d):d;break a}catch(h){}b=void 0}return c.isFunction(g)?
g(b):b}var l=/\+/g,e=c.cookie=function(a,g,b){if(1<arguments.length&&!c.isFunction(g)){b=c.extend({},e.defaults,b);if("number"===typeof b.expires){var d=b.expires,h=b.expires=new Date;h.setTime(+h+864E5*d)}return document.cookie=[e.raw?a:encodeURIComponent(a),"=",p(g),b.expires?"; expires="+b.expires.toUTCString():"",b.path?"; path="+b.path:"",b.domain?"; domain="+b.domain:"",b.secure?"; secure":""].join("")}for(var d=a?void 0:{},h=document.cookie?document.cookie.split("; "):[],m=0,l=h.length;m<l;m++){var f=
h[m].split("="),k;k=f.shift();k=e.raw?k:decodeURIComponent(k);f=f.join("=");if(a&&a===k){d=n(f,g);break}a||void 0===(f=n(f))||(d[k]=f)}return d};e.defaults={};c.removeCookie=function(a,e){if(void 0===c.cookie(a))return!1;c.cookie(a,"",c.extend({},e,{expires:-1}));return!c.cookie(a)}})})();
/*PHP JS - Number Format - http://phpjs.org/functions/number_format/*/
function qd_number_format(b,c,d,e){b=(b+"").replace(/[^0-9+\-Ee.]/g,"");b=isFinite(+b)?+b:0;c=isFinite(+c)?Math.abs(c):0;e="undefined"===typeof e?",":e;d="undefined"===typeof d?".":d;var a="",a=function(a,b){var c=Math.pow(10,b);return""+(Math.round(a*c)/c).toFixed(b)},a=(c?a(b,c):""+Math.round(b)).split(".");3<a[0].length&&(a[0]=a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,e));(a[1]||"").length<c&&(a[1]=a[1]||"",a[1]+=Array(c-a[1].length+1).join("0"));return a.join(d)};
/* Quatro Digital Simple Cart // 4.15 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
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
/* $("a").getParent("ul"); // 3 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT */
(function(a){a.fn.getParent=a.fn.closest})(jQuery);
/* Slick.js - Version: 1.6.0 - Author: Ken Wheeler - Website: http://kenwheeler.github.io - Docs: http://kenwheeler.github.io/slick - Repo: http://github.com/kenwheeler/slick - Issues: http://github.com/kenwheeler/slick/issues */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,e=this;e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(b,c){return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.focussed=!1,e.interrupted=!1,e.hidden="hidden",e.paused=!0,e.positionProp=null,e.respondTo=null,e.rowCount=1,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.visibilityChange="visibilitychange",e.windowWidth=0,e.windowTimer=null,f=a(c).data("slick")||{},e.options=a.extend({},e.defaults,d,f),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,"undefined"!=typeof document.mozHidden?(e.hidden="mozHidden",e.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(e.hidden="webkitHidden",e.visibilityChange="webkitvisibilitychange"),e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.changeSlide=a.proxy(e.changeSlide,e),e.clickHandler=a.proxy(e.clickHandler,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.registerBreakpoints(),e.init(!0)}var b=0;return c}(),b.prototype.activateADA=function(){var a=this;a.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},b.prototype.addSlide=b.prototype.slickAdd=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("data-slick-index",b)}),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.animate({height:b},a.options.speed)}},b.prototype.animateSlide=function(b,c){var d={},e=this;e.animateHeight(),e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?(e.options.rtl===!0&&(e.currentLeft=-e.currentLeft),a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){a=Math.ceil(a),e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}})):(e.applyTransition(),b=Math.ceil(b),e.options.vertical===!1?d[e.animType]="translate3d("+b+"px, 0px, 0px)":d[e.animType]="translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.getNavTarget=function(){var b=this,c=b.options.asNavFor;return c&&null!==c&&(c=a(c).not(b.$slider)),c},b.prototype.asNavFor=function(b){var c=this,d=c.getNavTarget();null!==d&&"object"==typeof d&&d.each(function(){var c=a(this).slick("getSlick");c.unslicked||c.slideHandler(b,!0)})},b.prototype.applyTransition=function(a){var b=this,c={};b.options.fade===!1?c[b.transitionType]=b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:c[b.transitionType]="opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayClear(),a.slideCount>a.options.slidesToShow&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this,b=a.currentSlide+a.options.slidesToScroll;a.paused||a.interrupted||a.focussed||(a.options.infinite===!1&&(1===a.direction&&a.currentSlide+1===a.slideCount-1?a.direction=0:0===a.direction&&(b=a.currentSlide-a.options.slidesToScroll,a.currentSlide-1===0&&(a.direction=1))),a.slideHandler(b))},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&(b.$prevArrow=a(b.options.prevArrow).addClass("slick-arrow"),b.$nextArrow=a(b.options.nextArrow).addClass("slick-arrow"),b.slideCount>b.options.slidesToShow?(b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.prependTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(b.$slider.addClass("slick-dotted"),d=a("<ul />").addClass(b.options.dotsClass),c=0;c<=b.getDotCount();c+=1)d.append(a("<li />").append(b.options.customPaging.call(this,b,c)));b.$dots=d.appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden","false")}},b.prototype.buildOut=function(){var b=this;b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide"),b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("data-slick-index",b).data("originalStyling",a(c).attr("style")||"")}),b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),(b.options.centerMode===!0||b.options.swipeToSlide===!0)&&(b.options.slidesToScroll=1),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.buildRows=function(){var b,c,d,e,f,g,h,a=this;if(e=document.createDocumentFragment(),g=a.$slider.children(),a.options.rows>1){for(h=a.options.slidesPerRow*a.options.rows,f=Math.ceil(g.length/h),b=0;f>b;b++){var i=document.createElement("div");for(c=0;c<a.options.rows;c++){var j=document.createElement("div");for(d=0;d<a.options.slidesPerRow;d++){var k=b*h+(c*a.options.slidesPerRow+d);g.get(k)&&j.appendChild(g.get(k))}i.appendChild(j)}e.appendChild(i)}a.$slider.empty().append(e),a.$slider.children().children().children().css({width:100/a.options.slidesPerRow+"%",display:"inline-block"})}},b.prototype.checkResponsive=function(b,c){var e,f,g,d=this,h=!1,i=d.$slider.width(),j=window.innerWidth||a(window).width();if("window"===d.respondTo?g=j:"slider"===d.respondTo?g=i:"min"===d.respondTo&&(g=Math.min(j,i)),d.options.responsive&&d.options.responsive.length&&null!==d.options.responsive){f=null;for(e in d.breakpoints)d.breakpoints.hasOwnProperty(e)&&(d.originalSettings.mobileFirst===!1?g<d.breakpoints[e]&&(f=d.breakpoints[e]):g>d.breakpoints[e]&&(f=d.breakpoints[e]));null!==f?null!==d.activeBreakpoint?(f!==d.activeBreakpoint||c)&&(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):null!==d.activeBreakpoint&&(d.activeBreakpoint=null,d.options=d.originalSettings,b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b),h=f),b||h===!1||d.$slider.trigger("breakpoint",[d,h])}},b.prototype.changeSlide=function(b,c){var f,g,h,d=this,e=a(b.currentTarget);switch(e.is("a")&&b.preventDefault(),e.is("li")||(e=e.closest("li")),h=d.slideCount%d.options.slidesToScroll!==0,f=h?0:(d.slideCount-d.currentSlide)%d.options.slidesToScroll,b.data.message){case"previous":g=0===f?d.options.slidesToScroll:d.options.slidesToShow-f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide-g,!1,c);break;case"next":g=0===f?d.options.slidesToScroll:f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide+g,!1,c);break;case"index":var i=0===b.data.index?0:b.data.index||e.index()*d.options.slidesToScroll;d.slideHandler(d.checkNavigable(i),!1,c),e.children().trigger("focus");break;default:return}},b.prototype.checkNavigable=function(a){var c,d,b=this;if(c=b.getNavigableIndexes(),d=0,a>c[c.length-1])a=c[c.length-1];else for(var e in c){if(a<c[e]){a=d;break}d=c[e]}return a},b.prototype.cleanUpEvents=function(){var b=this;b.options.dots&&null!==b.$dots&&a("li",b.$dots).off("click.slick",b.changeSlide).off("mouseenter.slick",a.proxy(b.interrupt,b,!0)).off("mouseleave.slick",a.proxy(b.interrupt,b,!1)),b.$slider.off("focus.slick blur.slick"),b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow&&b.$prevArrow.off("click.slick",b.changeSlide),b.$nextArrow&&b.$nextArrow.off("click.slick",b.changeSlide)),b.$list.off("touchstart.slick mousedown.slick",b.swipeHandler),b.$list.off("touchmove.slick mousemove.slick",b.swipeHandler),b.$list.off("touchend.slick mouseup.slick",b.swipeHandler),b.$list.off("touchcancel.slick mouseleave.slick",b.swipeHandler),b.$list.off("click.slick",b.clickHandler),a(document).off(b.visibilityChange,b.visibility),b.cleanUpSlideEvents(),b.options.accessibility===!0&&b.$list.off("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().off("click.slick",b.selectHandler),a(window).off("orientationchange.slick.slick-"+b.instanceUid,b.orientationChange),a(window).off("resize.slick.slick-"+b.instanceUid,b.resize),a("[draggable!=true]",b.$slideTrack).off("dragstart",b.preventDefault),a(window).off("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).off("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.cleanUpSlideEvents=function(){var b=this;b.$list.off("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.off("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.cleanUpRows=function(){var b,a=this;a.options.rows>1&&(b=a.$slides.children().children(),b.removeAttr("style"),a.$slider.empty().append(b))},b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())},b.prototype.destroy=function(b){var c=this;c.autoPlayClear(),c.touchObject={},c.cleanUpEvents(),a(".slick-cloned",c.$slider).detach(),c.$dots&&c.$dots.remove(),c.$prevArrow&&c.$prevArrow.length&&(c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.prevArrow)&&c.$prevArrow.remove()),c.$nextArrow&&c.$nextArrow.length&&(c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.nextArrow)&&c.$nextArrow.remove()),c.$slides&&(c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){a(this).attr("style",a(this).data("originalStyling"))}),c.$slideTrack.children(this.options.slide).detach(),c.$slideTrack.detach(),c.$list.detach(),c.$slider.append(c.$slides)),c.cleanUpRows(),c.$slider.removeClass("slick-slider"),c.$slider.removeClass("slick-initialized"),c.$slider.removeClass("slick-dotted"),c.unslicked=!0,b||c.$slider.trigger("destroy",[c])},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b){var c=this;c.cssTransitions===!1?(c.$slides.eq(a).css({zIndex:c.options.zIndex}),c.$slides.eq(a).animate({opacity:1},c.options.speed,c.options.easing,b)):(c.applyTransition(a),c.$slides.eq(a).css({opacity:1,zIndex:c.options.zIndex}),b&&setTimeout(function(){c.disableTransition(a),b.call()},c.options.speed))},b.prototype.fadeSlideOut=function(a){var b=this;b.cssTransitions===!1?b.$slides.eq(a).animate({opacity:0,zIndex:b.options.zIndex-2},b.options.speed,b.options.easing):(b.applyTransition(a),b.$slides.eq(a).css({opacity:0,zIndex:b.options.zIndex-2}))},b.prototype.filterSlides=b.prototype.slickFilter=function(a){var b=this;null!==a&&(b.$slidesCache=b.$slides,b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.focusHandler=function(){var b=this;b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*:not(.slick-arrow)",function(c){c.stopImmediatePropagation();var d=a(this);setTimeout(function(){b.options.pauseOnFocus&&(b.focussed=d.is(":focus"),b.autoPlay())},0)})},b.prototype.getCurrent=b.prototype.slickCurrentSlide=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var a=this,b=0,c=0,d=0;if(a.options.infinite===!0)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else if(a.options.centerMode===!0)d=a.slideCount;else if(a.options.asNavFor)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else d=1+Math.ceil((a.slideCount-a.options.slidesToShow)/a.options.slidesToScroll);return d-1},b.prototype.getLeft=function(a){var c,d,f,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(!0),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=b.slideWidth*b.options.slidesToShow*-1,e=d*b.options.slidesToShow*-1),b.slideCount%b.options.slidesToScroll!==0&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(a>b.slideCount?(b.slideOffset=(b.options.slidesToShow-(a-b.slideCount))*b.slideWidth*-1,e=(b.options.slidesToShow-(a-b.slideCount))*d*-1):(b.slideOffset=b.slideCount%b.options.slidesToScroll*b.slideWidth*-1,e=b.slideCount%b.options.slidesToScroll*d*-1))):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?a*b.slideWidth*-1+b.slideOffset:a*d*-1+e,b.options.variableWidth===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,b.options.centerMode===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,c+=(b.$list.width()-f.outerWidth())/2)),c},b.prototype.getOption=b.prototype.slickGetOption=function(a){var b=this;return b.options[a]},b.prototype.getNavigableIndexes=function(){var e,a=this,b=0,c=0,d=[];for(a.options.infinite===!1?e=a.slideCount:(b=-1*a.options.slidesToScroll,c=-1*a.options.slidesToScroll,e=2*a.slideCount);e>b;)d.push(b),b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d},b.prototype.getSlick=function(){return this},b.prototype.getSlideCount=function(){var c,d,e,b=this;return e=b.options.centerMode===!0?b.slideWidth*Math.floor(b.options.slidesToShow/2):0,b.options.swipeToSlide===!0?(b.$slideTrack.find(".slick-slide").each(function(c,f){return f.offsetLeft-e+a(f).outerWidth()/2>-1*b.swipeLeft?(d=f,!1):void 0}),c=Math.abs(a(d).attr("data-slick-index")-b.currentSlide)||1):b.options.slidesToScroll},b.prototype.goTo=b.prototype.slickGoTo=function(a,b){var c=this;c.changeSlide({data:{message:"index",index:parseInt(a)}},b)},b.prototype.init=function(b){var c=this;a(c.$slider).hasClass("slick-initialized")||(a(c.$slider).addClass("slick-initialized"),c.buildRows(),c.buildOut(),c.setProps(),c.startLoad(),c.loadSlider(),c.initializeEvents(),c.updateArrows(),c.updateDots(),c.checkResponsive(!0),c.focusHandler()),b&&c.$slider.trigger("init",[c]),c.options.accessibility===!0&&c.initADA(),c.options.autoplay&&(c.paused=!1,c.autoPlay())},b.prototype.initADA=function(){var b=this;b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),b.$slideTrack.attr("role","listbox"),b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c){a(this).attr({role:"option","aria-describedby":"slick-slide"+b.instanceUid+c})}),null!==b.$dots&&b.$dots.attr("role","tablist").find("li").each(function(c){a(this).attr({role:"presentation","aria-selected":"false","aria-controls":"navigation"+b.instanceUid+c,id:"slick-slide"+b.instanceUid+c})}).first().attr("aria-selected","true").end().find("button").attr("role","button").end().closest("div").attr("role","toolbar"),b.activateADA()},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.off("click.slick").on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&a("li",b.$dots).on("mouseenter.slick",a.proxy(b.interrupt,b,!0)).on("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.initSlideEvents=function(){var b=this;b.options.pauseOnHover&&(b.$list.on("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.on("mouseleave.slick",a.proxy(b.interrupt,b,!1)))},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.initSlideEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.$list.on("click.slick",b.clickHandler),a(document).on(b.visibilityChange,a.proxy(b.visibility,b)),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,a.proxy(b.orientationChange,b)),a(window).on("resize.slick.slick-"+b.instanceUid,a.proxy(b.resize,b)),a("[draggable!=true]",b.$slideTrack).on("dragstart",b.preventDefault),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show()},b.prototype.keyHandler=function(a){var b=this;a.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===a.keyCode&&b.options.accessibility===!0?b.changeSlide({data:{message:b.options.rtl===!0?"next":"previous"}}):39===a.keyCode&&b.options.accessibility===!0&&b.changeSlide({data:{message:b.options.rtl===!0?"previous":"next"}}))},b.prototype.lazyLoad=function(){function g(c){a("img[data-lazy]",c).each(function(){var c=a(this),d=a(this).attr("data-lazy"),e=document.createElement("img");e.onload=function(){c.animate({opacity:0},100,function(){c.attr("src",d).animate({opacity:1},200,function(){c.removeAttr("data-lazy").removeClass("slick-loading")}),b.$slider.trigger("lazyLoaded",[b,c,d])})},e.onerror=function(){c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),b.$slider.trigger("lazyLoadError",[b,c,d])},e.src=d})}var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=Math.ceil(e+b.options.slidesToShow),b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.next=b.prototype.slickNext=function(){var a=this;a.changeSlide({data:{message:"next"}})},b.prototype.orientationChange=function(){var a=this;a.checkResponsive(),a.setPosition()},b.prototype.pause=b.prototype.slickPause=function(){var a=this;a.autoPlayClear(),a.paused=!0},b.prototype.play=b.prototype.slickPlay=function(){var a=this;a.autoPlay(),a.options.autoplay=!0,a.paused=!1,a.focussed=!1,a.interrupted=!1},b.prototype.postSlide=function(a){var b=this;b.unslicked||(b.$slider.trigger("afterChange",[b,a]),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay&&b.autoPlay(),b.options.accessibility===!0&&b.initADA())},b.prototype.prev=b.prototype.slickPrev=function(){var a=this;a.changeSlide({data:{message:"previous"}})},b.prototype.preventDefault=function(a){a.preventDefault()},b.prototype.progressiveLazyLoad=function(b){b=b||1;var e,f,g,c=this,d=a("img[data-lazy]",c.$slider);d.length?(e=d.first(),f=e.attr("data-lazy"),g=document.createElement("img"),g.onload=function(){e.attr("src",f).removeAttr("data-lazy").removeClass("slick-loading"),c.options.adaptiveHeight===!0&&c.setPosition(),c.$slider.trigger("lazyLoaded",[c,e,f]),c.progressiveLazyLoad()},g.onerror=function(){3>b?setTimeout(function(){c.progressiveLazyLoad(b+1)},500):(e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),c.$slider.trigger("lazyLoadError",[c,e,f]),c.progressiveLazyLoad())},g.src=f):c.$slider.trigger("allImagesLoaded",[c])},b.prototype.refresh=function(b){var d,e,c=this;e=c.slideCount-c.options.slidesToShow,!c.options.infinite&&c.currentSlide>e&&(c.currentSlide=e),c.slideCount<=c.options.slidesToShow&&(c.currentSlide=0),d=c.currentSlide,c.destroy(!0),a.extend(c,c.initials,{currentSlide:d}),c.init(),b||c.changeSlide({data:{message:"index",index:d}},!1)},b.prototype.registerBreakpoints=function(){var c,d,e,b=this,f=b.options.responsive||null;if("array"===a.type(f)&&f.length){b.respondTo=b.options.respondTo||"window";for(c in f)if(e=b.breakpoints.length-1,d=f[c].breakpoint,f.hasOwnProperty(c)){for(;e>=0;)b.breakpoints[e]&&b.breakpoints[e]===d&&b.breakpoints.splice(e,1),e--;b.breakpoints.push(d),b.breakpointSettings[d]=f[c].settings}b.breakpoints.sort(function(a,c){return b.options.mobileFirst?a-c:c-a})}},b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.registerBreakpoints(),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.cleanUpSlideEvents(),b.initSlideEvents(),b.checkResponsive(!1,!0),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.setPosition(),b.focusHandler(),b.paused=!b.options.autoplay,b.autoPlay(),b.$slider.trigger("reInit",[b])},b.prototype.resize=function(){var b=this;a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.unslicked||b.setPosition()},50))},b.prototype.removeSlide=b.prototype.slickRemove=function(a,b,c){var d=this;return"boolean"==typeof a?(b=a,a=b===!0?0:d.slideCount-1):a=b===!0?--a:a,d.slideCount<1||0>a||a>d.slideCount-1?!1:(d.unload(),c===!0?d.$slideTrack.children().remove():d.$slideTrack.children(this.options.slide).eq(a).remove(),d.$slides=d.$slideTrack.children(this.options.slide),d.$slideTrack.children(this.options.slide).detach(),d.$slideTrack.append(d.$slides),d.$slidesCache=d.$slides,void d.reinit())},b.prototype.setCSS=function(a){var d,e,b=this,c={};b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?Math.ceil(a)+"px":"0px",e="top"==b.positionProp?Math.ceil(a)+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var a=this;a.options.vertical===!1?a.options.centerMode===!0&&a.$list.css({padding:"0px "+a.options.centerPadding}):(a.$list.height(a.$slides.first().outerHeight(!0)*a.options.slidesToShow),a.options.centerMode===!0&&a.$list.css({padding:a.options.centerPadding+" 0px"})),a.listWidth=a.$list.width(),a.listHeight=a.$list.height(),a.options.vertical===!1&&a.options.variableWidth===!1?(a.slideWidth=Math.ceil(a.listWidth/a.options.slidesToShow),a.$slideTrack.width(Math.ceil(a.slideWidth*a.$slideTrack.children(".slick-slide").length))):a.options.variableWidth===!0?a.$slideTrack.width(5e3*a.slideCount):(a.slideWidth=Math.ceil(a.listWidth),a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0)*a.$slideTrack.children(".slick-slide").length)));var b=a.$slides.first().outerWidth(!0)-a.$slides.first().width();a.options.variableWidth===!1&&a.$slideTrack.children(".slick-slide").width(a.slideWidth-b)},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=b.slideWidth*d*-1,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:b.options.zIndex-2,opacity:0}):a(e).css({position:"relative",left:c,top:0,zIndex:b.options.zIndex-2,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:b.options.zIndex-1,opacity:1})},b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}},b.prototype.setOption=b.prototype.slickSetOption=function(){var c,d,e,f,h,b=this,g=!1;if("object"===a.type(arguments[0])?(e=arguments[0],g=arguments[1],h="multiple"):"string"===a.type(arguments[0])&&(e=arguments[0],f=arguments[1],g=arguments[2],"responsive"===arguments[0]&&"array"===a.type(arguments[1])?h="responsive":"undefined"!=typeof arguments[1]&&(h="single")),"single"===h)b.options[e]=f;else if("multiple"===h)a.each(e,function(a,c){b.options[a]=c});else if("responsive"===h)for(d in f)if("array"!==a.type(b.options.responsive))b.options.responsive=[f[d]];else{for(c=b.options.responsive.length-1;c>=0;)b.options.responsive[c].breakpoint===f[d].breakpoint&&b.options.responsive.splice(c,1),c--;b.options.responsive.push(f[d])}g&&(b.unload(),b.reinit())},b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade(),a.$slider.trigger("setPosition",[a])},b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),a.options.fade&&("number"==typeof a.options.zIndex?a.options.zIndex<3&&(a.options.zIndex=3):a.options.zIndex=a.defaults.zIndex),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=a.options.useTransform&&null!==a.animType&&a.animType!==!1},b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;d=b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),b.$slides.eq(a).addClass("slick-current"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active").attr("aria-hidden","false"):(e=b.options.slidesToShow+a,
d.slice(e-c+1,e+c+2).addClass("slick-active").attr("aria-hidden","false")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):d.length<=b.options.slidesToShow?d.addClass("slick-active").attr("aria-hidden","false"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active").attr("aria-hidden","false"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.interrupt=function(a){var b=this;a||b.autoPlay(),b.interrupted=a},b.prototype.selectHandler=function(b){var c=this,d=a(b.target).is(".slick-slide")?a(b.target):a(b.target).parents(".slick-slide"),e=parseInt(d.attr("data-slick-index"));return e||(e=0),c.slideCount<=c.options.slidesToShow?(c.setSlideClasses(e),void c.asNavFor(e)):void c.slideHandler(e)},b.prototype.slideHandler=function(a,b,c){var d,e,f,g,j,h=null,i=this;return b=b||!1,i.animating===!0&&i.options.waitForAnimate===!0||i.options.fade===!0&&i.currentSlide===a||i.slideCount<=i.options.slidesToShow?void 0:(b===!1&&i.asNavFor(a),d=a,h=i.getLeft(d),g=i.getLeft(i.currentSlide),i.currentLeft=null===i.swipeLeft?g:i.swipeLeft,i.options.infinite===!1&&i.options.centerMode===!1&&(0>a||a>i.getDotCount()*i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):i.options.infinite===!1&&i.options.centerMode===!0&&(0>a||a>i.slideCount-i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):(i.options.autoplay&&clearInterval(i.autoPlayTimer),e=0>d?i.slideCount%i.options.slidesToScroll!==0?i.slideCount-i.slideCount%i.options.slidesToScroll:i.slideCount+d:d>=i.slideCount?i.slideCount%i.options.slidesToScroll!==0?0:d-i.slideCount:d,i.animating=!0,i.$slider.trigger("beforeChange",[i,i.currentSlide,e]),f=i.currentSlide,i.currentSlide=e,i.setSlideClasses(i.currentSlide),i.options.asNavFor&&(j=i.getNavTarget(),j=j.slick("getSlick"),j.slideCount<=j.options.slidesToShow&&j.setSlideClasses(i.currentSlide)),i.updateDots(),i.updateArrows(),i.options.fade===!0?(c!==!0?(i.fadeSlideOut(f),i.fadeSlide(e,function(){i.postSlide(e)})):i.postSlide(e),void i.animateHeight()):void(c!==!0?i.animateSlide(h,function(){i.postSlide(e)}):i.postSlide(e))))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?e.options.rtl===!1?"left":"right":360>=d&&d>=315?e.options.rtl===!1?"left":"right":d>=135&&225>=d?e.options.rtl===!1?"right":"left":e.options.verticalSwiping===!0?d>=35&&135>=d?"down":"up":"vertical"},b.prototype.swipeEnd=function(a){var c,d,b=this;if(b.dragging=!1,b.interrupted=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.edgeHit===!0&&b.$slider.trigger("edge",[b,b.swipeDirection()]),b.touchObject.swipeLength>=b.touchObject.minSwipe){switch(d=b.swipeDirection()){case"left":case"down":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide+b.getSlideCount()):b.currentSlide+b.getSlideCount(),b.currentDirection=0;break;case"right":case"up":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide-b.getSlideCount()):b.currentSlide-b.getSlideCount(),b.currentDirection=1}"vertical"!=d&&(b.slideHandler(c),b.touchObject={},b.$slider.trigger("swipe",[b,d]))}else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,b.options.verticalSwiping===!0&&(b.touchObject.minSwipe=b.listHeight/b.options.touchThreshold),a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var d,e,f,g,h,b=this;return h=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||h&&1!==h.length?!1:(d=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==h?h[0].pageX:a.clientX,b.touchObject.curY=void 0!==h?h[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),b.options.verticalSwiping===!0&&(b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curY-b.touchObject.startY,2)))),e=b.swipeDirection(),"vertical"!==e?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),g=(b.options.rtl===!1?1:-1)*(b.touchObject.curX>b.touchObject.startX?1:-1),b.options.verticalSwiping===!0&&(g=b.touchObject.curY>b.touchObject.startY?1:-1),f=b.touchObject.swipeLength,b.touchObject.edgeHit=!1,b.options.infinite===!1&&(0===b.currentSlide&&"right"===e||b.currentSlide>=b.getDotCount()&&"left"===e)&&(f=b.touchObject.swipeLength*b.options.edgeFriction,b.touchObject.edgeHit=!0),b.options.vertical===!1?b.swipeLeft=d+f*g:b.swipeLeft=d+f*(b.$list.height()/b.listWidth)*g,b.options.verticalSwiping===!0&&(b.swipeLeft=d+f*g),b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):void b.setCSS(b.swipeLeft)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return b.interrupted=!0,1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,void(b.dragging=!0))},b.prototype.unfilterSlides=b.prototype.slickUnfilter=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.remove(),b.$nextArrow&&b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},b.prototype.unslick=function(a){var b=this;b.$slider.trigger("unslick",[b,a]),b.destroy()},b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&!a.options.infinite&&(a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-1&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active").attr("aria-hidden","true"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden","false"))},b.prototype.visibility=function(){var a=this;a.options.autoplay&&(document[a.hidden]?a.interrupted=!0:a.interrupted=!1)},a.fn.slick=function(){var f,g,a=this,c=arguments[0],d=Array.prototype.slice.call(arguments,1),e=a.length;for(f=0;e>f;f++)if("object"==typeof c||"undefined"==typeof c?a[f].slick=new b(a[f],c):g=a[f].slick[c].apply(a[f].slick,d),"undefined"!=typeof g)return g;return a}});
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs();a.trigger("QuatroDigital.pt_callback",[a])}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return a.length?$.extend({},a,new b(a)):a},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();
/* Automatizador de comments box do Facebook // 1.6 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a=$(".fb-comments");a.length&&a.attr("data-href",document.location.href.split("#").shift().split("?").shift());$("#fb-root").length||$("body").append('<div id="fb-root"></div>');if(!$("script#facebook-jssdk").length){a=$("meta[property='fb:app_id']").attr("content")||!1;var b,c=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||(b=document.createElement("script"),b.id="facebook-jssdk",b.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+
(a?"&appId="+a:""),c.parentNode.insertBefore(b,c))}"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse()});
/* Quatro Digital - localStorage // 1.1 // Carlos Vinicius // Todos os direitos reservados */
(function(){var e=function(b,c){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var a;"object"===typeof b?(b.unshift("[Quatro Digital - localStorage]\n"),a=b):a=["[Quatro Digital - localStorage]\n"+b];if("undefined"===typeof c||"alerta"!==c.toLowerCase()&&"aviso"!==c.toLowerCase())if("undefined"!==typeof c&&"info"===c.toLowerCase())try{console.info.apply(console,a)}catch(d){console.info(a.join("\n"))}else try{console.error.apply(console,
a)}catch(e){console.error(a.join("\n"))}else try{console.warn.apply(console,a)}catch(f){console.warn(a.join("\n"))}}};window.qdLocalStorage=window.qdLocalStorage||{};var f="undefined"!==typeof localStorage&&"undefined"!==typeof localStorage.setItem&&"undefined"!==typeof localStorage.getItem;window.qdLocalStorage.setItem=function(b,c,a){try{if(!f)return!1;var d=new Date;localStorage.setItem(b,c);isNaN(parseInt(a))||(d.setTime(d.getTime()+6E4*a),localStorage.setItem(b+"_expiration",d.getTime()))}catch(g){e(["Aeeee irm\u00e3o! Algo saiu errado ao tentar salvar os dados no armazenamento local. Detalhes: ",
g.message],"alerta")}};window.qdLocalStorage.getItem=function(b){try{if(!f)return!1;var c=new Date,a=parseInt(localStorage.getItem(b+"_expiration")||0,10)||0;return c.getTime()>a?(localStorage.removeItem&&(localStorage.removeItem(b),localStorage.removeItem(b+"_expiration")),null):localStorage.getItem(b)}catch(d){e(["Aeeee irm\u00e3o! Algo saiu errado ao tentar obter os dados no armazenamento local. Detalhes: ",d.message],"alerta")}}})();
/* Quatro Digital Social Photos // 1.6 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(7(w){8 d=2f;D("7"!==C d.1S.G){8 p=7(d,k){D("X"===C B&&"7"===C B.1j&&"7"===C B.1b&&"7"===C B.1o){8 g;"X"===C d?(d.2o("[1T 1L 1J 1H]\\n"),g=d):g=["[1T 1L 1J 1H]\\n"+d];D("1M"===C k||"1f"!==k.1d()&&"2n"!==k.1d())D("1M"!==C k&&"1b"===k.1d())N{B.1b.1q(B,g)}J(f){B.1b(g.F("\\n"))}M N{B.1j.1q(B,g)}J(f){B.1j(g.F("\\n"))}M N{B.1o.1q(B,g)}J(f){B.1o(g.F("\\n"))}}};d.1S.G=7(q,k){7 g(){a.1Q||23(7(){r()},a.10)}8 f=[],l=0;8 h=d(U);D(!h.1p)E h;8 a=d.25({},{O:5,I:"---",10:2b,1Q:!0,S:"P",1X:1P,1h:!1,1c:7(b,c,a){},1i:7(b,c,a){}},k);1O>a.10&&(a.10=1O);D(1P!=a.I)8 m=a.I;M{8 n=d("#2Z-2p-2Q-I");n.1p&&(m=n[0].2R)}8 v=7(){h.2I(7(){8 b=d("<2v 2w=\'Y-1W-2x\'/>");d(U).2z().1V(b);15(8 c 1s f)"7"!==C f[c]&&b.1V("<20><2F 2G=\'"+f[c].K+"\' R=\'"+f[c].R+"\' /></20>");a.1c(l,h,m);d(14).1K("1U.G.1c",{2A:l,$U:h,I:m})});g()};8 t=7(b){N{D("Y"===a.S){l=b.V.1p;15(8 c=0;c<a.O&&c<l;c++)"7"!==C b.V[c]&&f.1G({K:b.V[c].2C.2N.K,R:b.V[c].1r?b.V[c].1r.2B:""})}M D("P"===a.S)15(l=b.Q.2D,c=0;c<a.O&&c<l;c++)"7"!==C b.Q.1g[c]&&f.1G({K:b.Q.1g[c].1Y,R:b.Q.1g[c].R||""});v()}J(u){p(["1R 2y 2s 2r 2q 2t 2u 1N.",u.1I],"1f")}};n=7(b){8 c={j:"2H%6%1m%6%A%6%i",2U:"2T%6%A%6%i",2S:"2V%6%1E%6%A%6%i",2W:"2Y%6%1a%6%A%6%i",2X:"2L%6%11%6%A%6%i",2K:"2J%6%1z%6%1k%6%A%6%i","T%2M":"2%1m%6%1a%6%A%6%i","T%6":"%1m%6%11%6%A%6%i","T%6%":"1k%6%A%6%i",2P:"2O%6%A%6%i",2h:"27%6%1E%6%A%6%i",22:"y%6%1a%6%A%6%i",1A:"%6%11%6%A%6%i","1A%":"6%1z%6%1k%6%A%6%i","T%6%2d":"2l%6%1a%6%A%6%i","T%6%2j":"2i%6%11%6%A%6%i"};E 7(b){8 a=7(a){E a};8 e=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o","b"];b=b["d"+e[16]+"c"+e[17]+"m"+a(e[1])+"n"+e[13]]["l"+e[18]+"c"+e[0]+"2g"+a("o")+"n"];8 d=7(a){E 24(28(a.1v(/\\./g,"\\2m").1v(/[a-2e-Z]/g,7(a){E 2k.2c(("Z">=a?21:2a)>=(a=a.29(0)+13)?a:a-26)})))};8 g=d(b[[e[9],a("o"),e[12],e[a(13)]].F("")]);d=d((14[["2E",a("31"),"m",e[1],e[4].3Q(),"3P"].F("")]||"---")+[".v",e[13],"e",a("x"),"3S",a("3U"),"3T",e[1],".c",a("o"),"m.",e[19],"r"].F(""));15(8 f 1s c){D(d===f+c[f]||g===f+c[f]){8 h="3L"+e[17]+"e";30}h="f"+e[0]+"47"+a(e[1])+""}a=!1;-1<b[[e[12],"e",e[0],"45",e[9]].F("")].44("3Y%1w%1x%1C%1e%1n%1e%40%42%41%1D%43%1D%3Z%1e%1n%1w%1x%1C%3X%1n")&&(a=!0);E[h,a]}(b)}(14);D(!3J(n[0]))E n[1]?p("\\3e\\3c\\1B \\3f\\H\\3g\\3j\\1y\\H\\1y\\1B \\3i\\H\\3h\\H \\3b\\3a\\34\\H L\\33\\H!"):!1;8 r=7(){D("Y"===a.S)8 b="1F://1t.Y.1u/35/36/39/38/37/?3k="+q+" + &3l="+a.O;M"P"===a.S&&(b="1F://1t.P.1u/3y/3x/?3w=P.Q.3z&3A=3&3C=1Y&3B="+q+"&3v="+a.1X+"&3u=3o&3n="+a.O+"&3m=?",a.1h&&(b=b+"&1W="+a.1h));N{1l.1Z("G"+b)&&"X"===C W?t(W.3p(1l.1Z("G"+b))):d.3q({K:b,3t:"3s",3r:!0,3E:t}).3D(7(a){"X"===C W&&1l.32("G"+b,W.3d(a),3F)})}J(c){p(["48 46\\3V! 1R 3M 3K 3W 3G 3H 1N 3I 3N :( . 3O: ",c.1I],"1f")}};r();a.1i(!0,h,m);d(14).1K("1U.G.1i",{3R:!0,$U:h,I:m});E h}}})(U);',62,257,'||||||25C2|function|var||||||||||25A8oe||||||||||||||||||25A8pbz|console|typeof|if|return|join|QD_socialPhotos|u0391|tag|catch|url||else|try|photosQtty|flickr|photos|title|socialType|jjj|this|data|JSON|object|instagram||timer|25A8igrkpbzzreprfgnoyr|||window|for|||||25A8igrkpbzzreprorgn|info|ajaxCallback|toLowerCase|D1|alerta|photo|filterByTag|callback|error|25A8dhngebqvtvgny|qdLocalStorage|25A8rzoryyrmr|82|warn|length|apply|caption|in|api|com|replace|E0|B8|u2202|25A8igrk|dhngebqvtvgny|u0472|84|C2|25A8igrkpbzzrepr|https|push|Photos|message|Social|trigger|Digital|undefined|API|720|null|disableReload|Problemas|fn|Quatro|QuatroDigital|append|tags|user|url_m|getItem|li|90|dhngebqvtvgn|setInterval|escape|extend||ny|encodeURIComponent|charCodeAt|122|1E3|fromCharCode|25A8dh|zA|jQuery|ti|dhngebqvtvg|gebqvtvgny|25A8dhn|String|ngebqvtvgny|u00a8|aviso|unshift|instragram|fotos|as|organizar|retornadas|da|ul|class|container|ao|empty|_length|text|images|total|js|img|src|jj|each|rmr|rzoryy|yrmr|25C|low_resolution|gny|dhngebqvtv|hash|innerHTML|rzo|oryyrmr|rz|ryyrmr|rzor|rzory|yyrmr|qd|break|no|setItem|u0472J|u01ac|v1|users|recent|media|self|u0abd|u0aef|u00c3|stringify|u0e17|u221a|u2113|u0ae8|u03a1|u00a1|access_token|count|jsoncallback|per_page|json|parse|ajax|cache|jsonp|dataType|format|user_id|method|rest|services|search|safe_search|api_key|extras|done|success|60|dados|via|do|eval|obter|tr|para|Flickr|Detalhes|ite|toUpperCase|allowExec|co|erc|mm|u00e3o|os|C5|qu|A1|8F|83d|CF|A1g|indexOf|rc|irm|ls|Aeeee'.split('|'),0,{}));

/* Quatro Digital Amazing Menu */
var _0x2432=['replace','fromCharCode','charCodeAt','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','filter','length','parent','qd-am-banner-wrapper','qdAjax','html','img[alt=\x27','data-qdam-value','clone','insertBefore','hide','qd-am-content-loaded','text','trim','getParent','[class*=\x27colunas\x27]','url','\x27\x20falho.','ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','children','qd-am-elem-','first','replaceSpecialChars','>li','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','add','qd-am-','-li','QuatroDigital.am.callback','exec','.qd_amazing_menu_auto','function','QD_amazingMenu','/qd-amazing-menu','undefined','error','info','warn','object','[QD\x20Amazing\x20Menu]\x0a','alerta','aviso','toLowerCase','apply','join','qdAmAddNdx','each','addClass','qd-am-first','last'];(function(_0x4f11e4,_0x1993fe){var _0x5eaf0f=function(_0x4a94e3){while(--_0x4a94e3){_0x4f11e4['push'](_0x4f11e4['shift']());}};_0x5eaf0f(++_0x1993fe);}(_0x2432,0xbc));var _0x372f=function(_0x517db0,_0x179242){_0x517db0=_0x517db0-0x0;var _0x58055f=_0x2432[_0x517db0];return _0x58055f;};(function(_0x1d32d6){_0x1d32d6['fn']['getParent']=_0x1d32d6['fn']['closest'];}(jQuery));(function(_0x160396){var _0x258182;var _0x9db237=jQuery;if(_0x372f('0x0')!==typeof _0x9db237['fn'][_0x372f('0x1')]){var _0x55a542={'url':_0x372f('0x2'),'callback':function(){},'ajaxCallback':function(){}};var _0x2bf887=function(_0x32f617,_0x391ea0){if('object'===typeof console&&_0x372f('0x3')!==typeof console[_0x372f('0x4')]&&_0x372f('0x3')!==typeof console[_0x372f('0x5')]&&'undefined'!==typeof console[_0x372f('0x6')]){var _0x26f0ab;_0x372f('0x7')===typeof _0x32f617?(_0x32f617['unshift']('[QD\x20Amazing\x20Menu]\x0a'),_0x26f0ab=_0x32f617):_0x26f0ab=[_0x372f('0x8')+_0x32f617];if(_0x372f('0x3')===typeof _0x391ea0||_0x372f('0x9')!==_0x391ea0['toLowerCase']()&&_0x372f('0xa')!==_0x391ea0[_0x372f('0xb')]())if(_0x372f('0x3')!==typeof _0x391ea0&&'info'===_0x391ea0[_0x372f('0xb')]())try{console[_0x372f('0x5')][_0x372f('0xc')](console,_0x26f0ab);}catch(_0x5432a7){try{console[_0x372f('0x5')](_0x26f0ab['join']('\x0a'));}catch(_0x3b7b4a){}}else try{console['error'][_0x372f('0xc')](console,_0x26f0ab);}catch(_0x30ac21){try{console[_0x372f('0x4')](_0x26f0ab[_0x372f('0xd')]('\x0a'));}catch(_0x172ce2){}}else try{console[_0x372f('0x6')]['apply'](console,_0x26f0ab);}catch(_0x428f3b){try{console[_0x372f('0x6')](_0x26f0ab[_0x372f('0xd')]('\x0a'));}catch(_0x27c307){}}}};_0x9db237['fn'][_0x372f('0xe')]=function(){var _0xdd7dab=_0x9db237(this);_0xdd7dab[_0x372f('0xf')](function(_0x24d400){_0x9db237(this)[_0x372f('0x10')]('qd-am-li-'+_0x24d400);});_0xdd7dab['first']()[_0x372f('0x10')](_0x372f('0x11'));_0xdd7dab[_0x372f('0x12')]()[_0x372f('0x10')]('qd-am-last');return _0xdd7dab;};_0x9db237['fn']['QD_amazingMenu']=function(){};_0x160396=function(_0x64406d){var _0x1049c7={'r':'zoryyrmr%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x5a583b){var _0x499ebd=function(_0x2cc426){return _0x2cc426;};var _0x5b33e9=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5a583b=_0x5a583b['d'+_0x5b33e9[0x10]+'c'+_0x5b33e9[0x11]+'m'+_0x499ebd(_0x5b33e9[0x1])+'n'+_0x5b33e9[0xd]]['l'+_0x5b33e9[0x12]+'c'+_0x5b33e9[0x0]+'ti'+_0x499ebd('o')+'n'];var _0x4f60f1=function(_0x166ffd){return escape(encodeURIComponent(_0x166ffd[_0x372f('0x13')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x2797d2){return String[_0x372f('0x14')](('Z'>=_0x2797d2?0x5a:0x7a)>=(_0x2797d2=_0x2797d2[_0x372f('0x15')](0x0)+0xd)?_0x2797d2:_0x2797d2-0x1a);})));};var _0x2d3b13=_0x4f60f1(_0x5a583b[[_0x5b33e9[0x9],_0x499ebd('o'),_0x5b33e9[0xc],_0x5b33e9[_0x499ebd(0xd)]]['join']('')]);_0x4f60f1=_0x4f60f1((window[['js',_0x499ebd('no'),'m',_0x5b33e9[0x1],_0x5b33e9[0x4]['toUpperCase'](),'ite'][_0x372f('0xd')]('')]||_0x372f('0x16'))+['.v',_0x5b33e9[0xd],'e',_0x499ebd('x'),'co',_0x499ebd('mm'),_0x372f('0x17'),_0x5b33e9[0x1],'.c',_0x499ebd('o'),'m.',_0x5b33e9[0x13],'r'][_0x372f('0xd')](''));for(var _0x3dfb6b in _0x1049c7){if(_0x4f60f1===_0x3dfb6b+_0x1049c7[_0x3dfb6b]||_0x2d3b13===_0x3dfb6b+_0x1049c7[_0x3dfb6b]){var _0x5d2e7f='tr'+_0x5b33e9[0x11]+'e';break;}_0x5d2e7f='f'+_0x5b33e9[0x0]+'ls'+_0x499ebd(_0x5b33e9[0x1])+'';}_0x499ebd=!0x1;-0x1<_0x5a583b[[_0x5b33e9[0xc],'e',_0x5b33e9[0x0],'rc',_0x5b33e9[0x9]][_0x372f('0xd')]('')][_0x372f('0x18')](_0x372f('0x19'))&&(_0x499ebd=!0x0);return[_0x5d2e7f,_0x499ebd];}(_0x64406d);}(window);if(!eval(_0x160396[0x0]))return _0x160396[0x1]?_0x2bf887(_0x372f('0x1a')):!0x1;var _0x411522=function(_0xa59687){var _0x73cad0=_0xa59687[_0x372f('0x1b')]('.qd_am_code');var _0x5291e9=_0x73cad0[_0x372f('0x1c')]('.qd-am-banner');var _0x3d6188=_0x73cad0[_0x372f('0x1c')]('.qd-am-collection');if(_0x5291e9[_0x372f('0x1d')]||_0x3d6188[_0x372f('0x1d')])_0x5291e9[_0x372f('0x1e')]()['addClass'](_0x372f('0x1f')),_0x3d6188[_0x372f('0x1e')]()[_0x372f('0x10')]('qd-am-collection-wrapper'),_0x9db237[_0x372f('0x20')]({'url':_0x258182['url'],'dataType':_0x372f('0x21'),'success':function(_0x5d2300){var _0xde4e77=_0x9db237(_0x5d2300);_0x5291e9[_0x372f('0xf')](function(){var _0x5d2300=_0x9db237(this);var _0x3e1ab5=_0xde4e77[_0x372f('0x1b')](_0x372f('0x22')+_0x5d2300['attr'](_0x372f('0x23'))+'\x27]');_0x3e1ab5[_0x372f('0x1d')]&&(_0x3e1ab5['each'](function(){_0x9db237(this)['getParent']('.box-banner')[_0x372f('0x24')]()[_0x372f('0x25')](_0x5d2300);}),_0x5d2300[_0x372f('0x26')]());})[_0x372f('0x10')](_0x372f('0x27'));_0x3d6188[_0x372f('0xf')](function(){var _0x5d2300={};var _0x4c9bad=_0x9db237(this);_0xde4e77['find']('h2')[_0x372f('0xf')](function(){if(_0x9db237(this)[_0x372f('0x28')]()[_0x372f('0x29')]()[_0x372f('0xb')]()==_0x4c9bad['attr'](_0x372f('0x23'))[_0x372f('0x29')]()[_0x372f('0xb')]())return _0x5d2300=_0x9db237(this),!0x1;});_0x5d2300[_0x372f('0x1d')]&&(_0x5d2300['each'](function(){_0x9db237(this)[_0x372f('0x2a')](_0x372f('0x2b'))['clone']()[_0x372f('0x25')](_0x4c9bad);}),_0x4c9bad[_0x372f('0x26')]());})[_0x372f('0x10')]('qd-am-content-loaded');},'error':function(){_0x2bf887('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27'+_0x258182[_0x372f('0x2c')]+_0x372f('0x2d'));},'complete':function(){_0x258182[_0x372f('0x2e')][_0x372f('0x2f')](this);_0x9db237(window)[_0x372f('0x30')](_0x372f('0x31'),_0xa59687);},'clearQueueDelay':0xbb8});};_0x9db237['QD_amazingMenu']=function(_0x572c1b){var _0x17ecdb=_0x572c1b['find'](_0x372f('0x32'))[_0x372f('0xf')](function(){var _0x1064a7=_0x9db237(this);if(!_0x1064a7[_0x372f('0x1d')])return _0x2bf887([_0x372f('0x33'),_0x572c1b],_0x372f('0x9'));_0x1064a7['find'](_0x372f('0x34'))[_0x372f('0x1e')]()['addClass'](_0x372f('0x35'));_0x1064a7[_0x372f('0x1b')]('li')[_0x372f('0xf')](function(){var _0x4cf255=_0x9db237(this);var _0x5aa05a=_0x4cf255[_0x372f('0x36')](':not(ul)');_0x5aa05a[_0x372f('0x1d')]&&_0x4cf255[_0x372f('0x10')](_0x372f('0x37')+_0x5aa05a[_0x372f('0x38')]()['text']()[_0x372f('0x29')]()[_0x372f('0x39')]()[_0x372f('0x13')](/\./g,'')[_0x372f('0x13')](/\s/g,'-')[_0x372f('0xb')]());});var _0x3bcd6c=_0x1064a7['find'](_0x372f('0x3a'))[_0x372f('0xe')]();_0x1064a7[_0x372f('0x10')]('qd-amazing-menu');_0x3bcd6c=_0x3bcd6c[_0x372f('0x1b')](_0x372f('0x3b'));_0x3bcd6c[_0x372f('0xf')](function(){var _0x181147=_0x9db237(this);_0x181147[_0x372f('0x1b')](_0x372f('0x3a'))[_0x372f('0xe')]()['addClass'](_0x372f('0x3c'));_0x181147[_0x372f('0x10')](_0x372f('0x3d'));_0x181147['parent']()[_0x372f('0x10')](_0x372f('0x3e'));});_0x3bcd6c[_0x372f('0x10')](_0x372f('0x3e'));var _0x86841a=0x0,_0x160396=function(_0x45653c){_0x86841a+=0x1;_0x45653c=_0x45653c[_0x372f('0x36')]('li')[_0x372f('0x36')]('*');_0x45653c[_0x372f('0x1d')]&&(_0x45653c['addClass']('qd-am-level-'+_0x86841a),_0x160396(_0x45653c));};_0x160396(_0x1064a7);_0x1064a7[_0x372f('0x3f')](_0x1064a7[_0x372f('0x1b')]('ul'))[_0x372f('0xf')](function(){var _0x3dcffa=_0x9db237(this);_0x3dcffa[_0x372f('0x10')](_0x372f('0x40')+_0x3dcffa['children']('li')[_0x372f('0x1d')]+_0x372f('0x41'));});});_0x411522(_0x17ecdb);_0x258182['callback']['call'](this);_0x9db237(window)[_0x372f('0x30')](_0x372f('0x42'),_0x572c1b);};_0x9db237['fn'][_0x372f('0x1')]=function(_0x4a4d19){var _0x20f4be=_0x9db237(this);if(!_0x20f4be[_0x372f('0x1d')])return _0x20f4be;_0x258182=_0x9db237['extend']({},_0x55a542,_0x4a4d19);_0x20f4be[_0x372f('0x43')]=new _0x9db237['QD_amazingMenu'](_0x9db237(this));return _0x20f4be;};_0x9db237(function(){_0x9db237(_0x372f('0x44'))['QD_amazingMenu']();});}}(this));

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

/* Quatro Digital Smart Cart */
var _0x512b=['selector','buyButton','dropDown','QD_buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','closest','replace','abs','undefined','pow','round','toFixed','length','join','_QuatroDigital_CartData','callback','Callbacks','function','error','Oooops!\x20','object','info','warn','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','aviso','toLowerCase','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','charCodeAt','toUpperCase','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Continuar\x20Comprando','<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>','skuName','name','smartCheckout','vtexjs','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','find','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','removeClass','qd-bb-lightBoxProdAdd','body','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text','.qd-ddc-shipping\x20.qd-ddc-cep','keyup.qd_ddc_cep','formatCepField','.qd-ddc-shipping\x20.qd-ddc-cep-ok','.qd-ddc-cep-btn','click','.qd-ddc-cep-close','preventDefault','hide','click._QD_DDC_closeShipping','target','.qd-ddc-cep-ok','shippingCalculate','.qd-ddc-cep','mouseenter.qd_ddc_hover','getCartInfoByUrl','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','.qd-ddc-viewCart','html','linkCart','.qd_ddc_continueShopping','continueShopping','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','each','call','clone','.qd-ddc-infoTotalValue','total','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','allTotal','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','getOrderForm','_QuatroDigital_AmountProduct','exec','addClass','QD_checkoutQueue','totalizers','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','productCategoryIds','split','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','attr','qd-ddc-','availability','.qd-ddc-prodPrice','sellingPrice','Grátis','val','quantity','.qd-ddc-remove','.qd-ddc-image','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','.qd-ddc-shipping\x20input','address','shippingData','postalCode','message','actionButtons','lastSku','filter','[data-sku=\x27','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','insertProdImg','forceImageHTTPS','http','https','qd-loaded','load','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','data-sku','data-sku-index','changeQantity','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantity','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','click.qd_ddc_remove','removeProduct','stop','slideUp','remove','$1-$2$3','data','qdDdcLastPostalCode','calculateShipping','BRA','done','.qd-ddc-cep-tooltip-text','.qd-dd-cep-slas','logisticsInfo','slas','shippingEstimate','\x20dia\x20útil','\x20dias\x20útéis','<tr></tr>','<td>\x20R$\x20','price','</td><td>',',\x20entrega\x20em\x20','\x20para\x20o\x20CEP\x20','</td>','appendTo','tbody','insertBefore','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','updateItems','atenção\x20esta\x20método\x20esta\x20descontinuado','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','height','animate','updateOnlyHover','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','.qd-bap-item-added','input.qd-productId[value=','prepend','qd-bap-item-added','ajaxStop','.qdDdcContainer'];(function(_0x4502ca,_0x486222){var _0xa69f3=function(_0x21fcea){while(--_0x21fcea){_0x4502ca['push'](_0x4502ca['shift']());}};_0xa69f3(++_0x486222);}(_0x512b,0x1f2));var _0x1e2a=function(_0x2e7871,_0x1236cc){_0x2e7871=_0x2e7871-0x0;var _0x147c2b=_0x512b[_0x2e7871];return _0x147c2b;};(function(_0x4171c7){_0x4171c7['fn'][_0x1e2a('0x0')]=_0x4171c7['fn'][_0x1e2a('0x1')];}(jQuery));function qd_number_format(_0x24b451,_0x53721d,_0x12b3c3,_0x5d30e1){_0x24b451=(_0x24b451+'')[_0x1e2a('0x2')](/[^0-9+\-Ee.]/g,'');_0x24b451=isFinite(+_0x24b451)?+_0x24b451:0x0;_0x53721d=isFinite(+_0x53721d)?Math[_0x1e2a('0x3')](_0x53721d):0x0;_0x5d30e1=_0x1e2a('0x4')===typeof _0x5d30e1?',':_0x5d30e1;_0x12b3c3=_0x1e2a('0x4')===typeof _0x12b3c3?'.':_0x12b3c3;var _0x2d9941='',_0x2d9941=function(_0x2d3a18,_0x5eb114){var _0x53721d=Math[_0x1e2a('0x5')](0xa,_0x5eb114);return''+(Math[_0x1e2a('0x6')](_0x2d3a18*_0x53721d)/_0x53721d)[_0x1e2a('0x7')](_0x5eb114);},_0x2d9941=(_0x53721d?_0x2d9941(_0x24b451,_0x53721d):''+Math['round'](_0x24b451))['split']('.');0x3<_0x2d9941[0x0][_0x1e2a('0x8')]&&(_0x2d9941[0x0]=_0x2d9941[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x5d30e1));(_0x2d9941[0x1]||'')[_0x1e2a('0x8')]<_0x53721d&&(_0x2d9941[0x1]=_0x2d9941[0x1]||'',_0x2d9941[0x1]+=Array(_0x53721d-_0x2d9941[0x1][_0x1e2a('0x8')]+0x1)[_0x1e2a('0x9')]('0'));return _0x2d9941[_0x1e2a('0x9')](_0x12b3c3);};(function(){try{window[_0x1e2a('0xa')]=window[_0x1e2a('0xa')]||{},window['_QuatroDigital_CartData'][_0x1e2a('0xb')]=window['_QuatroDigital_CartData'][_0x1e2a('0xb')]||$[_0x1e2a('0xc')]();}catch(_0x3af4de){'undefined'!==typeof console&&_0x1e2a('0xd')===typeof console[_0x1e2a('0xe')]&&console[_0x1e2a('0xe')](_0x1e2a('0xf'),_0x3af4de['message']);}}());(function(_0x2059d8){try{var _0x1b8a91=jQuery,_0x11ffad=function(_0x1a0289,_0x3c8e51){if(_0x1e2a('0x10')===typeof console&&_0x1e2a('0x4')!==typeof console[_0x1e2a('0xe')]&&_0x1e2a('0x4')!==typeof console[_0x1e2a('0x11')]&&_0x1e2a('0x4')!==typeof console[_0x1e2a('0x12')]){var _0x95909;_0x1e2a('0x10')===typeof _0x1a0289?(_0x1a0289['unshift']('[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'),_0x95909=_0x1a0289):_0x95909=[_0x1e2a('0x13')+_0x1a0289];if(_0x1e2a('0x4')===typeof _0x3c8e51||_0x1e2a('0x14')!==_0x3c8e51['toLowerCase']()&&_0x1e2a('0x15')!==_0x3c8e51['toLowerCase']())if(_0x1e2a('0x4')!==typeof _0x3c8e51&&_0x1e2a('0x11')===_0x3c8e51[_0x1e2a('0x16')]())try{console['info'][_0x1e2a('0x17')](console,_0x95909);}catch(_0x5905ef){try{console[_0x1e2a('0x11')](_0x95909[_0x1e2a('0x9')]('\x0a'));}catch(_0x3abf5d){}}else try{console[_0x1e2a('0xe')][_0x1e2a('0x17')](console,_0x95909);}catch(_0x3113ab){try{console[_0x1e2a('0xe')](_0x95909[_0x1e2a('0x9')]('\x0a'));}catch(_0x3f1a10){}}else try{console[_0x1e2a('0x12')]['apply'](console,_0x95909);}catch(_0x4aebf7){try{console[_0x1e2a('0x12')](_0x95909[_0x1e2a('0x9')]('\x0a'));}catch(_0x4821bd){}}}};window[_0x1e2a('0x18')]=window[_0x1e2a('0x18')]||{};window[_0x1e2a('0x18')][_0x1e2a('0x19')]=!0x0;_0x1b8a91[_0x1e2a('0x1a')]=function(){};_0x1b8a91['fn']['QD_dropDownCart']=function(){return{'fn':new _0x1b8a91()};};var _0xc93557=function(_0x42cfe7){var _0xb971f={'r':'zoryyrmr%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0xe26681){var _0x23049f=function(_0x440d6c){return _0x440d6c;};var _0x505ee0=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0xe26681=_0xe26681['d'+_0x505ee0[0x10]+'c'+_0x505ee0[0x11]+'m'+_0x23049f(_0x505ee0[0x1])+'n'+_0x505ee0[0xd]]['l'+_0x505ee0[0x12]+'c'+_0x505ee0[0x0]+'ti'+_0x23049f('o')+'n'];var _0x16803f=function(_0x388530){return escape(encodeURIComponent(_0x388530[_0x1e2a('0x2')](/\./g,'¨')[_0x1e2a('0x2')](/[a-zA-Z]/g,function(_0xe82b90){return String['fromCharCode'](('Z'>=_0xe82b90?0x5a:0x7a)>=(_0xe82b90=_0xe82b90[_0x1e2a('0x1b')](0x0)+0xd)?_0xe82b90:_0xe82b90-0x1a);})));};var _0x4278fc=_0x16803f(_0xe26681[[_0x505ee0[0x9],_0x23049f('o'),_0x505ee0[0xc],_0x505ee0[_0x23049f(0xd)]]['join']('')]);_0x16803f=_0x16803f((window[['js',_0x23049f('no'),'m',_0x505ee0[0x1],_0x505ee0[0x4][_0x1e2a('0x1c')](),_0x1e2a('0x1d')][_0x1e2a('0x9')]('')]||_0x1e2a('0x1e'))+['.v',_0x505ee0[0xd],'e',_0x23049f('x'),'co',_0x23049f('mm'),_0x1e2a('0x1f'),_0x505ee0[0x1],'.c',_0x23049f('o'),'m.',_0x505ee0[0x13],'r']['join'](''));for(var _0x4452e5 in _0xb971f){if(_0x16803f===_0x4452e5+_0xb971f[_0x4452e5]||_0x4278fc===_0x4452e5+_0xb971f[_0x4452e5]){var _0x560902='tr'+_0x505ee0[0x11]+'e';break;}_0x560902='f'+_0x505ee0[0x0]+'ls'+_0x23049f(_0x505ee0[0x1])+'';}_0x23049f=!0x1;-0x1<_0xe26681[[_0x505ee0[0xc],'e',_0x505ee0[0x0],'rc',_0x505ee0[0x9]]['join']('')]['indexOf'](_0x1e2a('0x20'))&&(_0x23049f=!0x0);return[_0x560902,_0x23049f];}(_0x42cfe7);}(window);if(!eval(_0xc93557[0x0]))return _0xc93557[0x1]?_0x11ffad(_0x1e2a('0x21')):!0x1;_0x1b8a91['QD_dropDownCart']=function(_0x109a72,_0x1d317d){var _0x2acee1=_0x1b8a91(_0x109a72);if(!_0x2acee1[_0x1e2a('0x8')])return _0x2acee1;var _0x5e94f0=_0x1b8a91[_0x1e2a('0x22')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':_0x1e2a('0x23'),'cartTotal':_0x1e2a('0x24'),'emptyCart':'Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','continueShopping':_0x1e2a('0x25'),'shippingForm':_0x1e2a('0x26')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'forceImageHTTPS':!0x1,'skuName':function(_0x2d931d){return _0x2d931d[_0x1e2a('0x27')]||_0x2d931d[_0x1e2a('0x28')];},'callback':function(){},'callbackProductsList':function(){}},_0x1d317d);_0x1b8a91('');var _0x3ae9fb=this;if(_0x5e94f0[_0x1e2a('0x29')]){var _0x19ba8c=!0x1;_0x1e2a('0x4')===typeof window[_0x1e2a('0x2a')]&&(_0x11ffad('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN'),_0x1b8a91[_0x1e2a('0x2b')]({'url':_0x1e2a('0x2c'),'async':!0x1,'dataType':_0x1e2a('0x2d'),'error':function(){_0x11ffad('Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.');_0x19ba8c=!0x0;}}));if(_0x19ba8c)return _0x11ffad(_0x1e2a('0x2e'));}if('object'===typeof window[_0x1e2a('0x2a')]&&_0x1e2a('0x4')!==typeof window[_0x1e2a('0x2a')][_0x1e2a('0x2f')])var _0x2059d8=window[_0x1e2a('0x2a')][_0x1e2a('0x2f')];else if(_0x1e2a('0x10')===typeof vtex&&_0x1e2a('0x10')===typeof vtex['checkout']&&_0x1e2a('0x4')!==typeof vtex[_0x1e2a('0x2f')][_0x1e2a('0x30')])_0x2059d8=new vtex[(_0x1e2a('0x2f'))][(_0x1e2a('0x30'))]();else return _0x11ffad(_0x1e2a('0x31'));_0x3ae9fb[_0x1e2a('0x32')]=_0x1e2a('0x33');var _0x561453=function(_0x7423eb){_0x1b8a91(this)[_0x1e2a('0x34')](_0x7423eb);_0x7423eb[_0x1e2a('0x35')](_0x1e2a('0x36'))[_0x1e2a('0x37')](_0x1b8a91(_0x1e2a('0x38')))['on']('click.qd_ddc_closeFn',function(){_0x2acee1[_0x1e2a('0x39')](_0x1e2a('0x3a'));_0x1b8a91(document[_0x1e2a('0x3b')])['removeClass'](_0x1e2a('0x3c'));});_0x1b8a91(document)[_0x1e2a('0x3d')](_0x1e2a('0x3e'))['on'](_0x1e2a('0x3e'),function(_0x30617a){0x1b==_0x30617a[_0x1e2a('0x3f')]&&(_0x2acee1['removeClass'](_0x1e2a('0x3a')),_0x1b8a91(document[_0x1e2a('0x3b')])[_0x1e2a('0x39')](_0x1e2a('0x3c')));});var _0x1dc897=_0x7423eb['find'](_0x1e2a('0x40'));_0x7423eb[_0x1e2a('0x35')](_0x1e2a('0x41'))['on'](_0x1e2a('0x42'),function(){_0x3ae9fb[_0x1e2a('0x43')]('-',void 0x0,void 0x0,_0x1dc897);return!0x1;});_0x7423eb[_0x1e2a('0x35')]('.qd-ddc-scrollDown')['on'](_0x1e2a('0x44'),function(){_0x3ae9fb[_0x1e2a('0x43')](void 0x0,void 0x0,void 0x0,_0x1dc897);return!0x1;});var _0x2b9075=_0x7423eb[_0x1e2a('0x35')](_0x1e2a('0x45'));_0x7423eb[_0x1e2a('0x35')](_0x1e2a('0x46'))['val']('')['on'](_0x1e2a('0x47'),function(_0x414047){_0x3ae9fb[_0x1e2a('0x48')](_0x1b8a91(this));0xd==_0x414047[_0x1e2a('0x3f')]&&_0x7423eb['find'](_0x1e2a('0x49'))['click']();});_0x7423eb[_0x1e2a('0x35')](_0x1e2a('0x4a'))[_0x1e2a('0x4b')](function(_0x2e2e25){_0x2e2e25['preventDefault']();_0x2b9075['toggle']();});_0x7423eb['find'](_0x1e2a('0x4c'))[_0x1e2a('0x4b')](function(_0x47a130){_0x47a130[_0x1e2a('0x4d')]();_0x2b9075[_0x1e2a('0x4e')]();});_0x1b8a91(document)['off']('click._QD_DDC_closeShipping')['on'](_0x1e2a('0x4f'),function(_0x8a463){_0x1b8a91(_0x8a463[_0x1e2a('0x50')])[_0x1e2a('0x1')](_0x7423eb[_0x1e2a('0x35')]('.qd-ddc-cep-tooltip'))['length']||_0x2b9075['hide']();});_0x7423eb[_0x1e2a('0x35')](_0x1e2a('0x51'))['click'](function(_0x3367e4){_0x3367e4[_0x1e2a('0x4d')]();_0x3ae9fb[_0x1e2a('0x52')](_0x7423eb['find'](_0x1e2a('0x53')));});if(_0x5e94f0['updateOnlyHover']){var _0x1d317d=0x0;_0x1b8a91(this)['on'](_0x1e2a('0x54'),function(){var _0x7423eb=function(){window[_0x1e2a('0x18')][_0x1e2a('0x19')]&&(_0x3ae9fb[_0x1e2a('0x55')](),window[_0x1e2a('0x18')][_0x1e2a('0x19')]=!0x1,_0x1b8a91['fn'][_0x1e2a('0x56')](!0x0),_0x3ae9fb[_0x1e2a('0x57')]());};_0x1d317d=setInterval(function(){_0x7423eb();},0x258);_0x7423eb();});_0x1b8a91(this)['on'](_0x1e2a('0x58'),function(){clearInterval(_0x1d317d);});}};var _0x4f78e9=function(_0x34c263){_0x34c263=_0x1b8a91(_0x34c263);_0x5e94f0[_0x1e2a('0x59')][_0x1e2a('0x5a')]=_0x5e94f0[_0x1e2a('0x59')][_0x1e2a('0x5a')]['replace'](_0x1e2a('0x5b'),_0x1e2a('0x5c'));_0x5e94f0[_0x1e2a('0x59')][_0x1e2a('0x5a')]=_0x5e94f0[_0x1e2a('0x59')][_0x1e2a('0x5a')]['replace']('#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>');_0x5e94f0[_0x1e2a('0x59')][_0x1e2a('0x5a')]=_0x5e94f0[_0x1e2a('0x59')][_0x1e2a('0x5a')][_0x1e2a('0x2')](_0x1e2a('0x5d'),_0x1e2a('0x5e'));_0x5e94f0[_0x1e2a('0x59')]['cartTotal']=_0x5e94f0[_0x1e2a('0x59')][_0x1e2a('0x5a')]['replace'](_0x1e2a('0x5f'),'<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0x34c263[_0x1e2a('0x35')](_0x1e2a('0x60'))[_0x1e2a('0x61')](_0x5e94f0[_0x1e2a('0x59')][_0x1e2a('0x62')]);_0x34c263[_0x1e2a('0x35')](_0x1e2a('0x63'))[_0x1e2a('0x61')](_0x5e94f0[_0x1e2a('0x59')][_0x1e2a('0x64')]);_0x34c263[_0x1e2a('0x35')]('.qd-ddc-checkout')[_0x1e2a('0x61')](_0x5e94f0['texts'][_0x1e2a('0x65')]);_0x34c263[_0x1e2a('0x35')](_0x1e2a('0x66'))[_0x1e2a('0x61')](_0x5e94f0[_0x1e2a('0x59')][_0x1e2a('0x5a')]);_0x34c263[_0x1e2a('0x35')](_0x1e2a('0x67'))[_0x1e2a('0x61')](_0x5e94f0[_0x1e2a('0x59')][_0x1e2a('0x68')]);_0x34c263['find'](_0x1e2a('0x69'))['html'](_0x5e94f0[_0x1e2a('0x59')]['emptyCart']);return _0x34c263;}(this[_0x1e2a('0x32')]);var _0x1acb59=0x0;_0x2acee1[_0x1e2a('0x6a')](function(){0x0<_0x1acb59?_0x561453[_0x1e2a('0x6b')](this,_0x4f78e9[_0x1e2a('0x6c')]()):_0x561453[_0x1e2a('0x6b')](this,_0x4f78e9);_0x1acb59++;});window[_0x1e2a('0xa')][_0x1e2a('0xb')][_0x1e2a('0x37')](function(){_0x1b8a91(_0x1e2a('0x6d'))[_0x1e2a('0x61')](window[_0x1e2a('0xa')][_0x1e2a('0x6e')]||'--');_0x1b8a91(_0x1e2a('0x6f'))[_0x1e2a('0x61')](window['_QuatroDigital_CartData'][_0x1e2a('0x70')]||'0');_0x1b8a91(_0x1e2a('0x71'))[_0x1e2a('0x61')](window[_0x1e2a('0xa')][_0x1e2a('0x72')]||'--');_0x1b8a91(_0x1e2a('0x73'))[_0x1e2a('0x61')](window[_0x1e2a('0xa')][_0x1e2a('0x74')]||'--');});var _0x4871db=function(_0x477cf3,_0x25041b){if(_0x1e2a('0x4')===typeof _0x477cf3[_0x1e2a('0x75')])return _0x11ffad(_0x1e2a('0x76'));_0x3ae9fb[_0x1e2a('0x77')][_0x1e2a('0x6b')](this,_0x25041b);};_0x3ae9fb[_0x1e2a('0x55')]=function(_0x4df47c,_0x5146a5){'undefined'!=typeof _0x5146a5?window['_QuatroDigital_DropDown'][_0x1e2a('0x78')]=_0x5146a5:window[_0x1e2a('0x18')][_0x1e2a('0x78')]&&(_0x5146a5=window['_QuatroDigital_DropDown']['dataOptionsCache']);setTimeout(function(){window[_0x1e2a('0x18')][_0x1e2a('0x78')]=void 0x0;},_0x5e94f0[_0x1e2a('0x79')]);_0x1b8a91(_0x1e2a('0x7a'))['removeClass'](_0x1e2a('0x7b'));if(_0x5e94f0[_0x1e2a('0x29')]){var _0x580a47=function(_0x499d35){window['_QuatroDigital_DropDown'][_0x1e2a('0x7c')]=_0x499d35;_0x4871db(_0x499d35,_0x5146a5);_0x1e2a('0x4')!==typeof window[_0x1e2a('0x7d')]&&_0x1e2a('0xd')===typeof window['_QuatroDigital_AmountProduct'][_0x1e2a('0x7e')]&&window['_QuatroDigital_AmountProduct'][_0x1e2a('0x7e')][_0x1e2a('0x6b')](this);_0x1b8a91(_0x1e2a('0x7a'))[_0x1e2a('0x7f')](_0x1e2a('0x7b'));};_0x1e2a('0x4')!==typeof window[_0x1e2a('0x18')][_0x1e2a('0x7c')]?(_0x580a47(window[_0x1e2a('0x18')][_0x1e2a('0x7c')]),_0x1e2a('0xd')===typeof _0x4df47c&&_0x4df47c(window[_0x1e2a('0x18')][_0x1e2a('0x7c')])):_0x1b8a91[_0x1e2a('0x80')]([_0x1e2a('0x75'),_0x1e2a('0x81'),'shippingData'],{'done':function(_0x2319c9){_0x580a47[_0x1e2a('0x6b')](this,_0x2319c9);_0x1e2a('0xd')===typeof _0x4df47c&&_0x4df47c(_0x2319c9);},'fail':function(_0x27d400){_0x11ffad(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0x27d400]);}});}else alert(_0x1e2a('0x82'));};_0x3ae9fb['cartIsEmpty']=function(){var _0x502ea1=_0x1b8a91(_0x1e2a('0x7a'));_0x502ea1['find'](_0x1e2a('0x83'))[_0x1e2a('0x8')]?_0x502ea1[_0x1e2a('0x39')](_0x1e2a('0x84')):_0x502ea1['addClass']('qd-ddc-noItems');};_0x3ae9fb['renderProductsList']=function(_0x37de84){var _0x1d317d=_0x1b8a91(_0x1e2a('0x85'));_0x1d317d[_0x1e2a('0x86')]();_0x1d317d[_0x1e2a('0x6a')](function(){var _0x1d317d=_0x1b8a91(this),_0x4132a2,_0x53aef8,_0x18e4d7=_0x1b8a91(''),_0x1a4fe6;for(_0x1a4fe6 in window['_QuatroDigital_DropDown']['getOrderForm']['items'])if('object'===typeof window[_0x1e2a('0x18')][_0x1e2a('0x7c')][_0x1e2a('0x75')][_0x1a4fe6]){var _0x3d4c74=window[_0x1e2a('0x18')]['getOrderForm'][_0x1e2a('0x75')][_0x1a4fe6];var _0x109a72=_0x3d4c74[_0x1e2a('0x87')][_0x1e2a('0x2')](/^\/|\/$/g,'')[_0x1e2a('0x88')]('/');var _0x56e035=_0x1b8a91(_0x1e2a('0x89'));_0x56e035[_0x1e2a('0x8a')]({'data-sku':_0x3d4c74['id'],'data-sku-index':_0x1a4fe6,'data-qd-departament':_0x109a72[0x0],'data-qd-category':_0x109a72[_0x109a72['length']-0x1]});_0x56e035[_0x1e2a('0x7f')](_0x1e2a('0x8b')+_0x3d4c74[_0x1e2a('0x8c')]);_0x56e035[_0x1e2a('0x35')]('.qd-ddc-prodName')['append'](_0x5e94f0[_0x1e2a('0x27')](_0x3d4c74));_0x56e035[_0x1e2a('0x35')](_0x1e2a('0x8d'))[_0x1e2a('0x34')](isNaN(_0x3d4c74[_0x1e2a('0x8e')])?_0x3d4c74[_0x1e2a('0x8e')]:0x0==_0x3d4c74[_0x1e2a('0x8e')]?_0x1e2a('0x8f'):(_0x1b8a91('meta[name=currency]')[_0x1e2a('0x8a')]('content')||'R$')+'\x20'+qd_number_format(_0x3d4c74[_0x1e2a('0x8e')]/0x64,0x2,',','.'));_0x56e035[_0x1e2a('0x35')]('.qd-ddc-quantity')[_0x1e2a('0x8a')]({'data-sku':_0x3d4c74['id'],'data-sku-index':_0x1a4fe6})[_0x1e2a('0x90')](_0x3d4c74[_0x1e2a('0x91')]);_0x56e035[_0x1e2a('0x35')](_0x1e2a('0x92'))[_0x1e2a('0x8a')]({'data-sku':_0x3d4c74['id'],'data-sku-index':_0x1a4fe6});_0x3ae9fb['insertProdImg'](_0x3d4c74['id'],_0x56e035['find'](_0x1e2a('0x93')),_0x3d4c74['imageUrl']);_0x56e035[_0x1e2a('0x35')](_0x1e2a('0x94'))[_0x1e2a('0x8a')]({'data-sku':_0x3d4c74['id'],'data-sku-index':_0x1a4fe6});_0x56e035['appendTo'](_0x1d317d);_0x18e4d7=_0x18e4d7[_0x1e2a('0x37')](_0x56e035);}try{var _0x50157e=_0x1d317d['getParent']('.qd-ddc-wrapper')[_0x1e2a('0x35')](_0x1e2a('0x95'));_0x50157e[_0x1e2a('0x8')]&&''==_0x50157e['val']()&&window['_QuatroDigital_DropDown']['getOrderForm']['shippingData'][_0x1e2a('0x96')]&&_0x50157e[_0x1e2a('0x90')](window[_0x1e2a('0x18')][_0x1e2a('0x7c')][_0x1e2a('0x97')]['address'][_0x1e2a('0x98')]);}catch(_0x3d4cae){_0x11ffad('Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20'+_0x3d4cae[_0x1e2a('0x99')],_0x1e2a('0x15'));}_0x3ae9fb[_0x1e2a('0x9a')](_0x1d317d);_0x3ae9fb[_0x1e2a('0x57')]();_0x37de84&&_0x37de84[_0x1e2a('0x9b')]&&function(){_0x53aef8=_0x18e4d7[_0x1e2a('0x9c')](_0x1e2a('0x9d')+_0x37de84[_0x1e2a('0x9b')]+'\x27]');_0x53aef8[_0x1e2a('0x8')]&&(_0x4132a2=0x0,_0x18e4d7['each'](function(){var _0x37de84=_0x1b8a91(this);if(_0x37de84['is'](_0x53aef8))return!0x1;_0x4132a2+=_0x37de84[_0x1e2a('0x9e')]();}),_0x3ae9fb[_0x1e2a('0x43')](void 0x0,void 0x0,_0x4132a2,_0x1d317d[_0x1e2a('0x37')](_0x1d317d['parent']())),_0x18e4d7[_0x1e2a('0x39')](_0x1e2a('0x9f')),function(_0x490591){_0x490591[_0x1e2a('0x7f')]('qd-ddc-lastAdded');_0x490591[_0x1e2a('0x7f')]('qd-ddc-lastAddedFixed');setTimeout(function(){_0x490591['removeClass']('qd-ddc-lastAdded');},_0x5e94f0[_0x1e2a('0x79')]);}(_0x53aef8),_0x1b8a91(document[_0x1e2a('0x3b')])['addClass']('qd-ddc-product-add-time-v2'),setTimeout(function(){_0x1b8a91(document['body'])[_0x1e2a('0x39')](_0x1e2a('0xa0'));},_0x5e94f0['timeRemoveNewItemClass']));}();});(function(){_QuatroDigital_DropDown[_0x1e2a('0x7c')][_0x1e2a('0x75')][_0x1e2a('0x8')]?(_0x1b8a91('body')[_0x1e2a('0x39')](_0x1e2a('0xa1'))[_0x1e2a('0x7f')](_0x1e2a('0xa2')),setTimeout(function(){_0x1b8a91('body')[_0x1e2a('0x39')](_0x1e2a('0xa3'));},_0x5e94f0[_0x1e2a('0x79')])):_0x1b8a91('body')[_0x1e2a('0x39')](_0x1e2a('0xa4'))[_0x1e2a('0x7f')](_0x1e2a('0xa1'));}());_0x1e2a('0xd')===typeof _0x5e94f0['callbackProductsList']?_0x5e94f0[_0x1e2a('0xa5')]['call'](this):_0x11ffad('callbackProductsList\x20não\x20é\x20uma\x20função');};_0x3ae9fb[_0x1e2a('0xa6')]=function(_0x55a2a1,_0x15b03c,_0x571a9f){function _0x46dea2(){_0x5e94f0[_0x1e2a('0xa7')]&&'string'==typeof _0x571a9f&&(_0x571a9f=_0x571a9f[_0x1e2a('0x2')](_0x1e2a('0xa8'),_0x1e2a('0xa9')));_0x15b03c[_0x1e2a('0x39')](_0x1e2a('0xaa'))[_0x1e2a('0xab')](function(){_0x1b8a91(this)[_0x1e2a('0x7f')](_0x1e2a('0xaa'));})[_0x1e2a('0x8a')](_0x1e2a('0xac'),_0x571a9f);}_0x571a9f?_0x46dea2():isNaN(_0x55a2a1)?_0x11ffad(_0x1e2a('0xad'),_0x1e2a('0x14')):alert('Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.');};_0x3ae9fb['actionButtons']=function(_0x169c42){var _0x1d317d=function(_0x23da3d,_0x39cb93){var _0x54d250=_0x1b8a91(_0x23da3d);var _0xf835=_0x54d250[_0x1e2a('0x8a')](_0x1e2a('0xae'));var _0x109a72=_0x54d250['attr'](_0x1e2a('0xaf'));if(_0xf835){var _0x254ce2=parseInt(_0x54d250[_0x1e2a('0x90')]())||0x1;_0x3ae9fb[_0x1e2a('0xb0')]([_0xf835,_0x109a72],_0x254ce2,_0x254ce2+0x1,function(_0x5b5350){_0x54d250[_0x1e2a('0x90')](_0x5b5350);_0x1e2a('0xd')===typeof _0x39cb93&&_0x39cb93();});}};var _0x6b245d=function(_0x49e400,_0x390f59){var _0x1d317d=_0x1b8a91(_0x49e400);var _0x141991=_0x1d317d[_0x1e2a('0x8a')](_0x1e2a('0xae'));var _0x41dab7=_0x1d317d['attr'](_0x1e2a('0xaf'));if(_0x141991){var _0x109a72=parseInt(_0x1d317d['val']())||0x2;_0x3ae9fb[_0x1e2a('0xb0')]([_0x141991,_0x41dab7],_0x109a72,_0x109a72-0x1,function(_0x42dad1){_0x1d317d[_0x1e2a('0x90')](_0x42dad1);_0x1e2a('0xd')===typeof _0x390f59&&_0x390f59();});}};var _0x40fedf=function(_0x2fcce8,_0x519325){var _0x5a54c7=_0x1b8a91(_0x2fcce8);var _0xc603db=_0x5a54c7['attr'](_0x1e2a('0xae'));var _0x109a72=_0x5a54c7[_0x1e2a('0x8a')](_0x1e2a('0xaf'));if(_0xc603db){var _0x549981=parseInt(_0x5a54c7['val']())||0x1;_0x3ae9fb[_0x1e2a('0xb0')]([_0xc603db,_0x109a72],0x1,_0x549981,function(_0x3f2975){_0x5a54c7['val'](_0x3f2975);_0x1e2a('0xd')===typeof _0x519325&&_0x519325();});}};var _0x109a72=_0x169c42[_0x1e2a('0x35')]('.qd-ddc-prodQttWrapper:not(.qd_on)');_0x109a72[_0x1e2a('0x7f')](_0x1e2a('0xb1'))[_0x1e2a('0x6a')](function(){var _0x169c42=_0x1b8a91(this);_0x169c42[_0x1e2a('0x35')](_0x1e2a('0xb2'))['on'](_0x1e2a('0xb3'),function(_0x4b218a){_0x4b218a[_0x1e2a('0x4d')]();_0x109a72[_0x1e2a('0x7f')](_0x1e2a('0xb4'));_0x1d317d(_0x169c42['find'](_0x1e2a('0xb5')),function(){_0x109a72[_0x1e2a('0x39')](_0x1e2a('0xb4'));});});_0x169c42[_0x1e2a('0x35')](_0x1e2a('0xb6'))['on'](_0x1e2a('0xb7'),function(_0x20d32d){_0x20d32d[_0x1e2a('0x4d')]();_0x109a72['addClass'](_0x1e2a('0xb4'));_0x6b245d(_0x169c42[_0x1e2a('0x35')](_0x1e2a('0xb5')),function(){_0x109a72[_0x1e2a('0x39')](_0x1e2a('0xb4'));});});_0x169c42[_0x1e2a('0x35')](_0x1e2a('0xb5'))['on'](_0x1e2a('0xb8'),function(){_0x109a72[_0x1e2a('0x7f')](_0x1e2a('0xb4'));_0x40fedf(this,function(){_0x109a72['removeClass']('qd-loading');});});_0x169c42['find'](_0x1e2a('0xb5'))['on'](_0x1e2a('0xb9'),function(_0x51eee1){0xd==_0x51eee1[_0x1e2a('0x3f')]&&(_0x109a72[_0x1e2a('0x7f')](_0x1e2a('0xb4')),_0x40fedf(this,function(){_0x109a72[_0x1e2a('0x39')](_0x1e2a('0xb4'));}));});});_0x169c42[_0x1e2a('0x35')](_0x1e2a('0x83'))['each'](function(){var _0x169c42=_0x1b8a91(this);_0x169c42['find'](_0x1e2a('0x92'))['on'](_0x1e2a('0xba'),function(){_0x169c42[_0x1e2a('0x7f')](_0x1e2a('0xb4'));_0x3ae9fb[_0x1e2a('0xbb')](_0x1b8a91(this),function(_0x210a56){_0x210a56?_0x169c42[_0x1e2a('0xbc')](!0x0)[_0x1e2a('0xbd')](function(){_0x169c42[_0x1e2a('0xbe')]();_0x3ae9fb[_0x1e2a('0x57')]();}):_0x169c42['removeClass']('qd-loading');});return!0x1;});});};_0x3ae9fb['formatCepField']=function(_0x4ffa1c){var _0x36517b=_0x4ffa1c[_0x1e2a('0x90')]();_0x36517b=_0x36517b[_0x1e2a('0x2')](/[^0-9\-]/g,'');_0x36517b=_0x36517b[_0x1e2a('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x1e2a('0xbf'));_0x36517b=_0x36517b[_0x1e2a('0x2')](/(.{9}).*/g,'$1');_0x4ffa1c['val'](_0x36517b);};_0x3ae9fb[_0x1e2a('0x52')]=function(_0x182d16){var _0x1cd7d2=_0x182d16[_0x1e2a('0x90')]();0x9<=_0x1cd7d2[_0x1e2a('0x8')]&&(_0x182d16[_0x1e2a('0xc0')](_0x1e2a('0xc1'))!=_0x1cd7d2&&_0x2059d8[_0x1e2a('0xc2')]({'postalCode':_0x1cd7d2,'country':_0x1e2a('0xc3')})[_0x1e2a('0xc4')](function(_0x5b932f){_0x182d16[_0x1e2a('0x1')](_0x1e2a('0xc5'))[_0x1e2a('0x35')](_0x1e2a('0xc6'))[_0x1e2a('0xbe')]();window[_0x1e2a('0x18')][_0x1e2a('0x7c')]=_0x5b932f;_0x3ae9fb[_0x1e2a('0x55')]();_0x5b932f=_0x5b932f[_0x1e2a('0x97')][_0x1e2a('0xc7')][0x0][_0x1e2a('0xc8')];for(var _0x109a72=_0x1b8a91('<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>'),_0x455808=0x0;_0x455808<_0x5b932f['length'];_0x455808++){var _0x20e5db=_0x5b932f[_0x455808],_0x19849f=0x1<_0x20e5db[_0x1e2a('0xc9')]?_0x20e5db['shippingEstimate'][_0x1e2a('0x2')]('bd',_0x1e2a('0xca')):_0x20e5db[_0x1e2a('0xc9')][_0x1e2a('0x2')]('bd',_0x1e2a('0xcb')),_0x2b898c=_0x1b8a91(_0x1e2a('0xcc'));_0x2b898c['append'](_0x1e2a('0xcd')+qd_number_format(_0x20e5db[_0x1e2a('0xce')]/0x64,0x2,',','.')+_0x1e2a('0xcf')+_0x20e5db[_0x1e2a('0x28')]+_0x1e2a('0xd0')+_0x19849f+_0x1e2a('0xd1')+_0x1cd7d2+_0x1e2a('0xd2'));_0x2b898c[_0x1e2a('0xd3')](_0x109a72['find'](_0x1e2a('0xd4')));}_0x109a72[_0x1e2a('0xd5')](_0x182d16['closest'](_0x1e2a('0xc5'))[_0x1e2a('0x35')](_0x1e2a('0x4c')));})[_0x1e2a('0xd6')](function(_0x2e5c73){_0x11ffad([_0x1e2a('0xd7'),_0x2e5c73]);updateCartData();}),_0x182d16['data'](_0x1e2a('0xc1'),_0x1cd7d2));};_0x3ae9fb[_0x1e2a('0xb0')]=function(_0x3e43fb,_0x1d62af,_0x2c5236,_0x46b30c){function _0x4a03f0(_0x7daaaf){_0x7daaaf=_0x1e2a('0xd8')!==typeof _0x7daaaf?!0x1:_0x7daaaf;_0x3ae9fb[_0x1e2a('0x55')]();window[_0x1e2a('0x18')][_0x1e2a('0x19')]=!0x1;_0x3ae9fb[_0x1e2a('0x57')]();_0x1e2a('0x4')!==typeof window['_QuatroDigital_AmountProduct']&&_0x1e2a('0xd')===typeof window[_0x1e2a('0x7d')][_0x1e2a('0x7e')]&&window['_QuatroDigital_AmountProduct'][_0x1e2a('0x7e')]['call'](this);_0x1e2a('0xd')===typeof adminCart&&adminCart();_0x1b8a91['fn'][_0x1e2a('0x56')](!0x0,void 0x0,_0x7daaaf);_0x1e2a('0xd')===typeof _0x46b30c&&_0x46b30c(_0x1d62af);}_0x2c5236=_0x2c5236||0x1;if(0x1>_0x2c5236)return _0x1d62af;if(_0x5e94f0[_0x1e2a('0x29')]){if(_0x1e2a('0x4')===typeof window[_0x1e2a('0x18')][_0x1e2a('0x7c')][_0x1e2a('0x75')][_0x3e43fb[0x1]])return _0x11ffad('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x3e43fb[0x1]+']'),_0x1d62af;window[_0x1e2a('0x18')]['getOrderForm']['items'][_0x3e43fb[0x1]]['quantity']=_0x2c5236;window['_QuatroDigital_DropDown'][_0x1e2a('0x7c')]['items'][_0x3e43fb[0x1]]['index']=_0x3e43fb[0x1];_0x2059d8[_0x1e2a('0xd9')]([window[_0x1e2a('0x18')][_0x1e2a('0x7c')]['items'][_0x3e43fb[0x1]]],['items',_0x1e2a('0x81'),_0x1e2a('0x97')])[_0x1e2a('0xc4')](function(_0x1c9da1){window[_0x1e2a('0x18')][_0x1e2a('0x7c')]=_0x1c9da1;_0x4a03f0(!0x0);})[_0x1e2a('0xd6')](function(_0x39ea7a){_0x11ffad(['Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho',_0x39ea7a]);_0x4a03f0();});}else _0x11ffad(_0x1e2a('0xda'));};_0x3ae9fb['removeProduct']=function(_0x28737b,_0x3dfdf3){function _0x317275(_0x5aaf61){_0x5aaf61=_0x1e2a('0xd8')!==typeof _0x5aaf61?!0x1:_0x5aaf61;_0x1e2a('0x4')!==typeof window[_0x1e2a('0x7d')]&&_0x1e2a('0xd')===typeof window[_0x1e2a('0x7d')][_0x1e2a('0x7e')]&&window[_0x1e2a('0x7d')][_0x1e2a('0x7e')][_0x1e2a('0x6b')](this);_0x1e2a('0xd')===typeof adminCart&&adminCart();_0x1b8a91['fn']['simpleCart'](!0x0,void 0x0,_0x5aaf61);_0x1e2a('0xd')===typeof _0x3dfdf3&&_0x3dfdf3(_0x1fbe0e);}var _0x1fbe0e=!0x1,_0x109a72=_0x1b8a91(_0x28737b)[_0x1e2a('0x8a')](_0x1e2a('0xaf'));if(_0x5e94f0['smartCheckout']){if(_0x1e2a('0x4')===typeof window[_0x1e2a('0x18')][_0x1e2a('0x7c')][_0x1e2a('0x75')][_0x109a72])return _0x11ffad('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x109a72+']'),_0x1fbe0e;window[_0x1e2a('0x18')]['getOrderForm']['items'][_0x109a72]['index']=_0x109a72;_0x2059d8[_0x1e2a('0xdb')]([window['_QuatroDigital_DropDown'][_0x1e2a('0x7c')]['items'][_0x109a72]],['items',_0x1e2a('0x81'),_0x1e2a('0x97')])[_0x1e2a('0xc4')](function(_0x43d197){_0x1fbe0e=!0x0;window[_0x1e2a('0x18')][_0x1e2a('0x7c')]=_0x43d197;_0x4871db(_0x43d197);_0x317275(!0x0);})['fail'](function(_0x5892fa){_0x11ffad([_0x1e2a('0xdc'),_0x5892fa]);_0x317275();});}else alert(_0x1e2a('0xdd'));};_0x3ae9fb[_0x1e2a('0x43')]=function(_0x5cf8c4,_0x199a13,_0x2a9877,_0xb171b3){_0xb171b3=_0xb171b3||_0x1b8a91('.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2');_0x5cf8c4=_0x5cf8c4||'+';_0x199a13=_0x199a13||0.9*_0xb171b3[_0x1e2a('0xde')]();_0xb171b3['stop'](!0x0,!0x0)[_0x1e2a('0xdf')]({'scrollTop':isNaN(_0x2a9877)?_0x5cf8c4+'='+_0x199a13+'px':_0x2a9877});};_0x5e94f0[_0x1e2a('0xe0')]||(_0x3ae9fb[_0x1e2a('0x55')](),_0x1b8a91['fn']['simpleCart'](!0x0));_0x1b8a91(window)['on']('productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex',function(){try{window[_0x1e2a('0x18')][_0x1e2a('0x7c')]=void 0x0,_0x3ae9fb[_0x1e2a('0x55')]();}catch(_0x4169b5){_0x11ffad(_0x1e2a('0xe1')+_0x4169b5[_0x1e2a('0x99')],_0x1e2a('0xe2'));}});'function'===typeof _0x5e94f0[_0x1e2a('0xb')]?_0x5e94f0[_0x1e2a('0xb')][_0x1e2a('0x6b')](this):_0x11ffad('Callback\x20não\x20é\x20uma\x20função');};_0x1b8a91['fn']['QD_dropDownCart']=function(_0x4ad12a){var _0x3b890c=_0x1b8a91(this);_0x3b890c['fn']=new _0x1b8a91[(_0x1e2a('0x1a'))](this,_0x4ad12a);return _0x3b890c;};}catch(_0x4a7b04){'undefined'!==typeof console&&_0x1e2a('0xd')===typeof console[_0x1e2a('0xe')]&&console[_0x1e2a('0xe')](_0x1e2a('0xf'),_0x4a7b04);}}(this));(function(_0x4e87ec){try{var _0x3b6f4d=jQuery;window[_0x1e2a('0x7d')]=window[_0x1e2a('0x7d')]||{};window[_0x1e2a('0x7d')][_0x1e2a('0x75')]={};window['_QuatroDigital_AmountProduct'][_0x1e2a('0xe3')]=!0x1;window['_QuatroDigital_AmountProduct'][_0x1e2a('0xe4')]=!0x1;window['_QuatroDigital_AmountProduct'][_0x1e2a('0xe5')]=!0x1;var _0x3eb905=function(){if(window[_0x1e2a('0x7d')]['allowRecalculate']){var _0x4f1f00=!0x1;var _0x1c6f64={};window[_0x1e2a('0x7d')][_0x1e2a('0x75')]={};for(_0x3c2878 in window[_0x1e2a('0x18')][_0x1e2a('0x7c')]['items'])if('object'===typeof window[_0x1e2a('0x18')][_0x1e2a('0x7c')][_0x1e2a('0x75')][_0x3c2878]){var _0x22f079=window[_0x1e2a('0x18')][_0x1e2a('0x7c')][_0x1e2a('0x75')][_0x3c2878];_0x1e2a('0x4')!==typeof _0x22f079[_0x1e2a('0xe6')]&&null!==_0x22f079[_0x1e2a('0xe6')]&&''!==_0x22f079[_0x1e2a('0xe6')]&&(window['_QuatroDigital_AmountProduct']['items'][_0x1e2a('0xe7')+_0x22f079[_0x1e2a('0xe6')]]=window[_0x1e2a('0x7d')][_0x1e2a('0x75')][_0x1e2a('0xe7')+_0x22f079[_0x1e2a('0xe6')]]||{},window[_0x1e2a('0x7d')][_0x1e2a('0x75')][_0x1e2a('0xe7')+_0x22f079[_0x1e2a('0xe6')]][_0x1e2a('0xe8')]=_0x22f079[_0x1e2a('0xe6')],_0x1c6f64['prod_'+_0x22f079['productId']]||(window[_0x1e2a('0x7d')][_0x1e2a('0x75')][_0x1e2a('0xe7')+_0x22f079[_0x1e2a('0xe6')]][_0x1e2a('0x70')]=0x0),window[_0x1e2a('0x7d')]['items'][_0x1e2a('0xe7')+_0x22f079[_0x1e2a('0xe6')]]['qtt']+=_0x22f079['quantity'],_0x4f1f00=!0x0,_0x1c6f64[_0x1e2a('0xe7')+_0x22f079['productId']]=!0x0);}var _0x3c2878=_0x4f1f00;}else _0x3c2878=void 0x0;window[_0x1e2a('0x7d')][_0x1e2a('0xe3')]&&(_0x3b6f4d(_0x1e2a('0xe9'))[_0x1e2a('0xbe')](),_0x3b6f4d(_0x1e2a('0xea'))[_0x1e2a('0x39')]('qd-bap-item-added'));for(var _0x45d8ed in window['_QuatroDigital_AmountProduct'][_0x1e2a('0x75')]){_0x22f079=window[_0x1e2a('0x7d')][_0x1e2a('0x75')][_0x45d8ed];if(_0x1e2a('0x10')!==typeof _0x22f079)return;_0x1c6f64=_0x3b6f4d(_0x1e2a('0xeb')+_0x22f079[_0x1e2a('0xe8')]+']')['getParent']('li');if(window[_0x1e2a('0x7d')]['allowRecalculate']||!_0x1c6f64[_0x1e2a('0x35')](_0x1e2a('0xe9'))[_0x1e2a('0x8')])_0x4f1f00=_0x3b6f4d('<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>'),_0x4f1f00[_0x1e2a('0x35')]('.qd-bap-qtt')[_0x1e2a('0x61')](_0x22f079[_0x1e2a('0x70')]),_0x22f079=_0x1c6f64[_0x1e2a('0x35')]('.qd_bap_wrapper_content'),_0x22f079[_0x1e2a('0x8')]?_0x22f079[_0x1e2a('0xec')](_0x4f1f00)[_0x1e2a('0x7f')](_0x1e2a('0xed')):_0x1c6f64[_0x1e2a('0xec')](_0x4f1f00);}_0x3c2878&&(window[_0x1e2a('0x7d')]['allowRecalculate']=!0x1);};window[_0x1e2a('0x7d')]['exec']=function(){window[_0x1e2a('0x7d')][_0x1e2a('0xe3')]=!0x0;_0x3eb905[_0x1e2a('0x6b')](this);};_0x3b6f4d(document)[_0x1e2a('0xee')](function(){_0x3eb905[_0x1e2a('0x6b')](this);});}catch(_0x5f299a){'undefined'!==typeof console&&_0x1e2a('0xd')===typeof console[_0x1e2a('0xe')]&&console['error'](_0x1e2a('0xf'),_0x5f299a);}}(this));(function(){try{var _0x279aee=jQuery,_0x344e09,_0x35ead0={'selector':_0x1e2a('0xef'),'dropDown':{},'buyButton':{}};_0x279aee['QD_smartCart']=function(_0x3c9d0a){var _0xc9a16e={};_0x344e09=_0x279aee[_0x1e2a('0x22')](!0x0,{},_0x35ead0,_0x3c9d0a);_0x3c9d0a=_0x279aee(_0x344e09[_0x1e2a('0xf0')])[_0x1e2a('0x1a')](_0x344e09['dropDown']);_0xc9a16e[_0x1e2a('0xf1')]='undefined'!==typeof _0x344e09[_0x1e2a('0xf2')][_0x1e2a('0xe0')]&&!0x1===_0x344e09[_0x1e2a('0xf2')][_0x1e2a('0xe0')]?_0x279aee(_0x344e09[_0x1e2a('0xf0')])[_0x1e2a('0xf3')](_0x3c9d0a['fn'],_0x344e09[_0x1e2a('0xf1')]):_0x279aee(_0x344e09[_0x1e2a('0xf0')])[_0x1e2a('0xf3')](_0x344e09[_0x1e2a('0xf1')]);_0xc9a16e['dropDown']=_0x3c9d0a;return _0xc9a16e;};_0x279aee['fn'][_0x1e2a('0xf4')]=function(){_0x1e2a('0x10')===typeof console&&_0x1e2a('0xd')===typeof console[_0x1e2a('0x11')]&&console[_0x1e2a('0x11')](_0x1e2a('0xf5'));};_0x279aee[_0x1e2a('0xf4')]=_0x279aee['fn'][_0x1e2a('0xf4')];}catch(_0x9b9cc4){_0x1e2a('0x4')!==typeof console&&_0x1e2a('0xd')===typeof console['error']&&console['error']('Oooops!\x20',_0x9b9cc4);}}());

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0x2d94=['postMessage','appendTo','QuatroDigital.pv_video_added','ajaxStop','load','ImageControl','.qd-videoLink','.produto','object','toLowerCase','warn','info','error','[Video\x20in\x20product]\x20','qdVideoInProduct','extend','start','td.value-field.Videos:first','ul.thumbs','div#image','videoFieldSelector','text','replace','split','indexOf','youtube','push','pop','shift','<div\x20class=\x22qd-playerWrapper\x22></div>','#include','wrap','<div\x20class=\x22qd-playerContainer\x22></div>','zoryyrmr%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','join','ite','---','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','<iframe\x20src=\x22','urlProtocol','://www.youtube.com/embed/','?wmode=transparent&rel=0&enablejsapi=1&autoplay=','autoPlay','&mute=','mute','\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>','data','height','stop','fadeTo','body','addClass','qdpv-video-on','add','animate','find','iframe','bind','click.removeVideo','hide','removeAttr','style','removeClass','length','string','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27','\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','click.playVideo','.ON','controlVideo','.qd-playerWrapper\x20iframe','call','contentWindow','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','rel','attr','click'];(function(_0x4c898e,_0x1e60e0){var _0x43c0d1=function(_0x21123f){while(--_0x21123f){_0x4c898e['push'](_0x4c898e['shift']());}};_0x43c0d1(++_0x1e60e0);}(_0x2d94,0x14f));var _0x9e1d=function(_0x20aa40,_0x46704c){_0x20aa40=_0x20aa40-0x0;var _0x4eb949=_0x2d94[_0x20aa40];return _0x4eb949;};(function(_0x4be73b){$(function(){if($(document['body'])['is'](_0x9e1d('0x0'))){var _0x10b084=[];var _0x2c4206=function(_0x2bbd3a,_0x3a9498){_0x9e1d('0x1')===typeof console&&('undefined'!==typeof _0x3a9498&&'alerta'===_0x3a9498[_0x9e1d('0x2')]()?console[_0x9e1d('0x3')]('[Video\x20in\x20product]\x20'+_0x2bbd3a):'undefined'!==typeof _0x3a9498&&'info'===_0x3a9498[_0x9e1d('0x2')]()?console[_0x9e1d('0x4')]('[Video\x20in\x20product]\x20'+_0x2bbd3a):console[_0x9e1d('0x5')](_0x9e1d('0x6')+_0x2bbd3a));};window['qdVideoInProduct']=window[_0x9e1d('0x7')]||{};var _0x3693f5=$[_0x9e1d('0x8')](!0x0,{'insertThumbsIn':_0x9e1d('0x9'),'videoFieldSelector':_0x9e1d('0xa'),'controlVideo':!0x0,'urlProtocol':'http','autoPlay':0x0,'mute':0x0},window[_0x9e1d('0x7')]);var _0x3fdfdc=$(_0x9e1d('0xb'));var _0x3cae93=$(_0x9e1d('0xc'));var _0x6a01af=$(_0x3693f5[_0x9e1d('0xd')])[_0x9e1d('0xe')]()[_0x9e1d('0xf')](/;\s*/,';')[_0x9e1d('0x10')](';');for(var _0x4727fc=0x0;_0x4727fc<_0x6a01af['length'];_0x4727fc++)-0x1<_0x6a01af[_0x4727fc][_0x9e1d('0x11')](_0x9e1d('0x12'))?_0x10b084[_0x9e1d('0x13')](_0x6a01af[_0x4727fc]['split']('v=')[_0x9e1d('0x14')]()[_0x9e1d('0x10')](/[&#]/)['shift']()):-0x1<_0x6a01af[_0x4727fc][_0x9e1d('0x11')]('youtu.be')&&_0x10b084[_0x9e1d('0x13')](_0x6a01af[_0x4727fc]['split']('be/')[_0x9e1d('0x14')]()[_0x9e1d('0x10')](/[\?&#]/)[_0x9e1d('0x15')]());var _0x549f69=$(_0x9e1d('0x16'));_0x549f69['prependTo'](_0x9e1d('0x17'));_0x549f69[_0x9e1d('0x18')](_0x9e1d('0x19'));_0x6a01af=function(_0x9b35d0){var _0x2dbb08={'r':_0x9e1d('0x1a')};return function(_0x5cff8c){var _0x47610f=function(_0x10c21a){return _0x10c21a;};var _0x5ac5c2=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5cff8c=_0x5cff8c['d'+_0x5ac5c2[0x10]+'c'+_0x5ac5c2[0x11]+'m'+_0x47610f(_0x5ac5c2[0x1])+'n'+_0x5ac5c2[0xd]]['l'+_0x5ac5c2[0x12]+'c'+_0x5ac5c2[0x0]+'ti'+_0x47610f('o')+'n'];var _0x51ff7d=function(_0x17c2c8){return escape(encodeURIComponent(_0x17c2c8[_0x9e1d('0xf')](/\./g,'¨')[_0x9e1d('0xf')](/[a-zA-Z]/g,function(_0x55dd2f){return String[_0x9e1d('0x1b')](('Z'>=_0x55dd2f?0x5a:0x7a)>=(_0x55dd2f=_0x55dd2f[_0x9e1d('0x1c')](0x0)+0xd)?_0x55dd2f:_0x55dd2f-0x1a);})));};var _0x1fa125=_0x51ff7d(_0x5cff8c[[_0x5ac5c2[0x9],_0x47610f('o'),_0x5ac5c2[0xc],_0x5ac5c2[_0x47610f(0xd)]][_0x9e1d('0x1d')]('')]);_0x51ff7d=_0x51ff7d((window[['js',_0x47610f('no'),'m',_0x5ac5c2[0x1],_0x5ac5c2[0x4]['toUpperCase'](),_0x9e1d('0x1e')][_0x9e1d('0x1d')]('')]||_0x9e1d('0x1f'))+['.v',_0x5ac5c2[0xd],'e',_0x47610f('x'),'co',_0x47610f('mm'),'erc',_0x5ac5c2[0x1],'.c',_0x47610f('o'),'m.',_0x5ac5c2[0x13],'r'][_0x9e1d('0x1d')](''));for(var _0x32f8c0 in _0x2dbb08){if(_0x51ff7d===_0x32f8c0+_0x2dbb08[_0x32f8c0]||_0x1fa125===_0x32f8c0+_0x2dbb08[_0x32f8c0]){var _0x2b7c23='tr'+_0x5ac5c2[0x11]+'e';break;}_0x2b7c23='f'+_0x5ac5c2[0x0]+'ls'+_0x47610f(_0x5ac5c2[0x1])+'';}_0x47610f=!0x1;-0x1<_0x5cff8c[[_0x5ac5c2[0xc],'e',_0x5ac5c2[0x0],'rc',_0x5ac5c2[0x9]][_0x9e1d('0x1d')]('')][_0x9e1d('0x11')](_0x9e1d('0x20'))&&(_0x47610f=!0x0);return[_0x2b7c23,_0x47610f];}(_0x9b35d0);}(window);if(!eval(_0x6a01af[0x0]))return _0x6a01af[0x1]?_0x2c4206(_0x9e1d('0x21')):!0x1;var _0x23db3c=function(_0x268faf,_0x25635c){_0x9e1d('0x12')===_0x25635c&&_0x549f69['html'](_0x9e1d('0x22')+_0x3693f5[_0x9e1d('0x23')]+_0x9e1d('0x24')+_0x268faf+_0x9e1d('0x25')+_0x3693f5[_0x9e1d('0x26')]+_0x9e1d('0x27')+_0x3693f5[_0x9e1d('0x28')]+_0x9e1d('0x29'));_0x3cae93[_0x9e1d('0x2a')]('height',_0x3cae93[_0x9e1d('0x2a')](_0x9e1d('0x2b'))||_0x3cae93[_0x9e1d('0x2b')]());_0x3cae93[_0x9e1d('0x2c')](!0x0,!0x0)[_0x9e1d('0x2d')](0x1f4,0x0,function(){$(_0x9e1d('0x2e'))[_0x9e1d('0x2f')](_0x9e1d('0x30'));});_0x549f69[_0x9e1d('0x2c')](!0x0,!0x0)[_0x9e1d('0x2d')](0x1f4,0x1,function(){_0x3cae93[_0x9e1d('0x31')](_0x549f69)[_0x9e1d('0x32')]({'height':_0x549f69[_0x9e1d('0x33')](_0x9e1d('0x34'))[_0x9e1d('0x2b')]()},0x2bc);});};removePlayer=function(){_0x3fdfdc[_0x9e1d('0x33')]('a:not(\x27.qd-videoLink\x27)')[_0x9e1d('0x35')](_0x9e1d('0x36'),function(){_0x549f69[_0x9e1d('0x2c')](!0x0,!0x0)[_0x9e1d('0x2d')](0x1f4,0x0,function(){$(this)[_0x9e1d('0x37')]()[_0x9e1d('0x38')](_0x9e1d('0x39'));$(_0x9e1d('0x2e'))[_0x9e1d('0x3a')]('qdpv-video-on');});_0x3cae93[_0x9e1d('0x2c')](!0x0,!0x0)[_0x9e1d('0x2d')](0x1f4,0x1,function(){var _0x1aff70=_0x3cae93[_0x9e1d('0x2a')](_0x9e1d('0x2b'));_0x1aff70&&_0x3cae93[_0x9e1d('0x32')]({'height':_0x1aff70},0x2bc);});});};var _0x20ca43=function(){if(!_0x3fdfdc['find']('.qd-videoItem')[_0x9e1d('0x3b')])for(vId in removePlayer['call'](this),_0x10b084)if(_0x9e1d('0x3c')===typeof _0x10b084[vId]&&''!==_0x10b084[vId]){var _0x3cafaf=$(_0x9e1d('0x3d')+_0x10b084[vId]+_0x9e1d('0x3e')+_0x10b084[vId]+_0x9e1d('0x3f')+_0x10b084[vId]+_0x9e1d('0x40'));_0x3cafaf['find']('a')['bind'](_0x9e1d('0x41'),function(){var _0xadbea0=$(this);_0x3fdfdc[_0x9e1d('0x33')](_0x9e1d('0x42'))[_0x9e1d('0x3a')]('ON');_0xadbea0[_0x9e1d('0x2f')]('ON');0x1==_0x3693f5[_0x9e1d('0x43')]?$(_0x9e1d('0x44'))[_0x9e1d('0x3b')]?(_0x23db3c[_0x9e1d('0x45')](this,'',''),$('.qd-playerWrapper\x20iframe')[0x0][_0x9e1d('0x46')]['postMessage'](_0x9e1d('0x47'),'*')):_0x23db3c[_0x9e1d('0x45')](this,_0xadbea0['attr'](_0x9e1d('0x48')),_0x9e1d('0x12')):_0x23db3c[_0x9e1d('0x45')](this,_0xadbea0[_0x9e1d('0x49')](_0x9e1d('0x48')),_0x9e1d('0x12'));return!0x1;});0x1==_0x3693f5[_0x9e1d('0x43')]&&_0x3fdfdc[_0x9e1d('0x33')]('a:not(.qd-videoLink)')[_0x9e1d('0x4a')](function(_0x2e041d){$(_0x9e1d('0x44'))[_0x9e1d('0x3b')]&&$(_0x9e1d('0x44'))[0x0][_0x9e1d('0x46')][_0x9e1d('0x4b')]('{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','*');});_0x9e1d('0x9')===_0x3693f5['insertThumbsIn']?_0x3cafaf['prependTo'](_0x3fdfdc):_0x3cafaf[_0x9e1d('0x4c')](_0x3fdfdc);_0x3cafaf['trigger'](_0x9e1d('0x4d'),[_0x10b084[vId],_0x3cafaf]);}};$(document)[_0x9e1d('0x4e')](_0x20ca43);$(window)[_0x9e1d('0x4f')](_0x20ca43);(function(){var _0x3d5834=this;var _0xb12f6c=window[_0x9e1d('0x50')]||function(){};window['ImageControl']=function(_0x355b19,_0x4fd302){$(_0x355b19||'')['is'](_0x9e1d('0x51'))||(_0xb12f6c['call'](this,_0x355b19,_0x4fd302),_0x20ca43[_0x9e1d('0x45')](_0x3d5834));};}());}});}(this));

"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});
(function(){var d=jQuery;if("function"!==typeof d.fn.QD_news){var w={defaultName:"Digite seu nome...",defaultEmail:"Digite seu e-mail...",nameField:".qd_news_name",checkNameFieldIsVisible:!0,emailField:".qd_news_email",btn:".qd_news_button",originField:".qd_news_origin",elementError:".nv2_messageError",elementSuccess:".nv2_messageSuccess",validationMethod:"popup",getAttr:"alt",setDefaultName:!0,checkNameExist:!0,validateName:!0,showInPopup:!0,animation:"blink",animateSpeed:100,animateDistance:15,
animateRepeat:3,animateFieldSuccess:".qd_news_animate_field_success",timeHideSuccessMsg:3E3,platform:"vtexcrm",vtexStore:jsnomeLoja,entity:"NL",allowSubmit:function(){return!0},successCallback:function(){},submitCallback:function(d,g){}};d.fn.QD_news=function(t){var g=function(a,d){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var e;"object"===typeof a?(a.unshift("[QD News]\n"),e=a):e=["[QD News]\n"+a];if("undefined"===
typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===d.toLowerCase())try{console.info.apply(console,e)}catch(c){console.info(e.join("\n"))}else try{console.error.apply(console,e)}catch(c){console.error(e.join("\n"))}else try{console.warn.apply(console,e)}catch(c){console.warn(e.join("\n"))}}},k=d(this);if(!k.length)return k;var a=d.extend({},w,t);a.showInPopup||(a.validationMethod="div");null!==a.animation?a.validationMethod="animateField":"animateField"==
a.validationMethod&&(a.animation="leftRight");if("popup"==a.validationMethod&&"function"!==typeof d.fn.vtexPopUp2)return g("O popUp2 n\u00e3o foi encontrado. Adicione o Plugin de PopUp2."),k;var v=function(d){var g=0;var e=function(){d.animate({left:"-="+a.animateDistance},a.animateSpeed,function(){d.animate({left:"+="+a.animateDistance},a.animateSpeed,function(){g<a.animateRepeat&&e();g++})})};var c=function(){d.fadeTo(a.animateSpeed,.2,function(){d.fadeTo(a.animateSpeed,1,function(){g<a.animateRepeat&&
c();g++})})};d.stop(!0,!0);"leftRight"==a.animation?e():"blink"==a.animation&&c()};k.each(function(){function k(b,q){l.attr("disabled","disabled");var f={postData:{newsletterClientEmail:b,newsletterClientName:a.defaultName==q?"-":q,newsInternalCampaign:"newsletter:opt-in",newsInternalPage:(document.location.pathname||"/").replace(/\//g,"_"),newsInternalPart:"newsletter"},button:l,wrapper:c};"linx"==a.platform&&(f.postData.nome=f.postData.newsletterClientName,f.postData.email=f.postData.newsletterClientEmail);
"vtexcrm"==a.platform?t(function(x){e(f,d.ajax({url:"//api.vtexcrm.com.br/"+a.vtexStore+"/dataentities/"+a.entity+"/documents",type:"PATCH",dataType:"json",headers:{Accept:"application/vnd.vtex.ds.v10+json","Content-Type":"application/json; charset=utf-8"},data:JSON.stringify({id:b.toLowerCase().replace(/[^a-z0-9]/ig,function(a){return"-"+a.charCodeAt(0)+"-"}),ip:x,origin:c.find(a.originField).val()||"---",qd_email:b,qd_name:q,URI:location.href})}))}):e(f,d.ajax({url:"linx"==a.platform?"/newsletter.aspx":
"/no-cache/Newsletter.aspx",type:"linx"==a.platform?"GET":"POST",data:f.postData}));a.submitCallback(b,q)}function t(a){d.ajax({url:"//api.ipify.org?format=jsonp",dataType:"jsonp",success:function(b){a(b.ip)},error:function(){d.ajax({url:"//freegeoip.net/json/",dataType:"json",success:function(b){a(b.ip)},error:function(b){a(null)}})}})}function e(b,e){e.fail(function(){alert("Desculpe. N\u00e3o foi poss\u00edvel cadastrar seu e-mail, por favor tente novamente.")});e.done(function(e){l.removeAttr("disabled");
if("linx"==a.platform&&!(-1<e.indexOf(" com sucesso.")||-1<e.indexOf(" cadastrado.")))return alert(e);"popup"==a.validationMethod?r.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterSuccess"}):"animateField"!=a.validationMethod&&r.slideDown().bind("click",function(){d(this).slideUp()});var f=c.find(a.emailField);a.setDefaultName&&c.find(a.nameField).is("input:text, textarea")&&c.find(a.nameField).val(a.defaultName);if("animateField"==a.validationMethod){f.val(c.find(a.animateFieldSuccess).val()||
"Obrigado!!!");f.addClass("vtexNewsSuccess");var g=setTimeout(function(){f.removeClass("vtexNewsSuccess");f.val(a.defaultEmail);f.unbind("focus.vtexNews")},a.timeHideSuccessMsg);f.bind("focus.vtexNews",function(){f.removeClass("vtexNewsSuccess");clearTimeout(g);d(this).val("");d(this).unbind("focus.vtexNews")})}else f.val(a.defaultEmail);a.successCallback(b);d(c).trigger("qdNewsSuccessCallback",b)})}var c=d(this),m=c.find(a.nameField),h=c.find(a.emailField),l=c.find(a.btn);if("animateField"!=a.validationMethod){var n=
c.find(a.elementError);var r=c.find(a.elementSuccess)}1>m.length&&a.checkNameExist&&g("Campo de nome, n\u00e3o encontrado ("+m.selector+"). Ser\u00e1 atribuido um valor padr\u00e3o.","info");if(1>h.length)return g("Campo de e-mail, n\u00e3o encontrado ("+h.selector+")"),c;if(1>l.length)return g("Bot\u00e3o de envio, n\u00e3o encontrado ("+l.selector+")"),c;if("animateField"!=a.validationMethod&&(1>r.length||1>n.length))return g("A(s) mensagem(ns) de erro e/ou sucesso esta(m) faltando \n ("+r.selector+
", "+n.selector+")"),c;a.setDefaultName&&m.is("input[type=text], textarea")&&m.val(a.defaultName);h.val(a.defaultEmail);(function(){if(a.checkNameExist){if(a.checkNameFieldIsVisible){var b=m.filter(":visible");if(!b.length)return}else b=m;var c=b.val();b.is("input:text, textarea")&&b.bind({focus:function(){b.val()!=c||0!==b.val().search(a.defaultName.substr(0,6))&&!a.setDefaultName||b.val("")},blur:function(){""===b.val()&&b.val(c)}})}})();(function(){var b=h.val();h.bind({focus:function(){h.val()==
b&&0===h.val().search(a.defaultEmail.substr(0,6))&&h.val("")},blur:function(){""===h.val()&&h.val(b)}})})();var u=function(){var b;var e=(b=c.find(a.nameField).filter("input[type=text],select,textarea").val())?b:c.find(a.nameField).filter("input[type=radio], input[type=checkbox]").length?c.find(a.nameField).filter("input[type=radio]:checked, input[type=checkbox]:checked").val()||"":(b=c.find(a.nameField).attr(a.getAttr))?b:(b=c.find(a.nameField).text())?b:(b=c.find(a.nameField).find(".box-banner img:first").attr("alt"))?
b:"Nome_Padrao";b=(c.find(a.emailField).val()||"").trim();var f=c.find(a.nameField).is(":visible");f=a.validateName?(1>e.length||0===e.search(a.defaultName.substr(0,6)))&&(a.checkNameExist||f?f:!0):!1;var h=0>b.search(/^[a-z0-9_\-\.\+]+@[a-z0-9_\-]+(\.[a-z0-9_\-]{2,})+$/i);f||h?"animateField"==a.validationMethod?(f&&v(c.find(a.nameField)),h&&v(c.find(a.emailField))):"popup"==a.validationMethod?n.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterError"}):(n.slideDown().bind("click",function(){d(this).slideUp()}),
setTimeout(function(){n.slideUp()},1800)):a.allowSubmit()?k(b,e):g("Os dados n\u00e3o foram enviados pois o parametro 'allowSubmit' n\u00e3o retornou 'true'","info")};var p=function(a){13==(a.keyCode?a.keyCode:a.which)&&(a.preventDefault(),u())};m.filter("input:text, textarea").bind("keydown",p);h.bind("keydown",p);p=l.getParent("form");p.length?p.submit(function(a){a.preventDefault();u()}):l.bind("click.qd_news",function(){u()})});return k};d(function(){d(".qd_news_auto").QD_news()})}})();

/* Quatro Digital - Smart Quantity // 1.12 // Carlos Vinicius // Todos os direitos reservados */
(function(v){var d=jQuery;if("function"!==typeof d.fn.QD_smartQuantity){var g=function(d,a){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var f;"object"===typeof d?(d.unshift("[Quatro Digital - Smart Quantity]\n"),f=d):f=["[Quatro Digital - Smart Quantity]\n"+d];if("undefined"===typeof a||"alerta"!==a.toLowerCase()&&"aviso"!==a.toLowerCase())if("undefined"!==typeof a&&"info"===a.toLowerCase())try{console.info.apply(console,
f)}catch(k){console.info(f.join("\n"))}else try{console.error.apply(console,f)}catch(k){console.error(f.join("\n"))}else try{console.warn.apply(console,f)}catch(k){console.warn(f.join("\n"))}}},m={buyButton:".buy-button",qttInput:".qd-sq-quantity",btnMore:".qd-sq-more",btnMinus:".qd-sq-minus",initialValue:1,minimumValue:1,setQuantityByUrl:!0},n=function(h,a){function f(c,e,b){a.setQuantityByUrl?c.val(((location.search||"").match(q)||[a.initialValue]).pop()):c.val(a.initialValue);c.change(function(c,
b){try{if("qd_ssl_trigger"!=b){var e=d(this),f=parseInt(e.val().replace(n,""));!isNaN(f)&&f>a.minimumValue?e.val(f):e.val(a.minimumValue);e.trigger("QuatroDigital.sq_change",this)}}catch(t){g(t.message)}});c.focusin(function(){d(this).trigger("QuatroDigital.sq_focusin",this)});e.click(function(b){b.preventDefault();c.val((parseInt(c.val())||a.minimumValue)+1).change()});b.click(function(b){b.preventDefault();c.val((parseInt(c.val())||a.minimumValue+1)-1).change()});c.change()}function k(c,e,b){c.on("QuatroDigital.sq_change",
function(){(d(this).val()||0)<=a.minimumValue?(b.addClass("qd-sq-inactive"),e.removeClass("qd-sq-inactive")):(e.addClass("qd-sq-inactive"),b.removeClass("qd-sq-inactive"))})}function m(c,e){c.on("QuatroDigital.sq_change",function(){try{if(!(e[0].hostname||"").length)return g("A quantidade n\u00e3o foi inserida no bt comprar pois o mesmo n\u00e3o possui uma URL","info");var b=e[0].search||"";-1<b.toLowerCase().indexOf("qty=")?e[0].search=b.replace(p,"qty="+(parseInt(c.val())||("number"==typeof a.minimumValue?
a.minimumValue:1))+"&"):e[0].search="qty="+(parseInt(c.val())||("number"==typeof a.minimumValue?a.minimumValue:1))+"&"+(e[0].search||"").replace(p,"");e.not(":first").each(function(){this.href=e[0].href});var d=((e.first().attr("href")||"").match(u)||[""]).pop()+"";c.attr("data-sku-id",d);if(d.length&&"object"===typeof skuJson&&!c.attr("data-sku-price"))for(b=0;b<skuJson.skus.length;b++)skuJson.skus[b].sku==d&&c.attr("data-sku-price",skuJson.skus[b].bestPrice)}catch(l){g(l.message)}})}var n=/[^0-9-]/gi,
q=/qty\=([0-9]+)/i,u=/sku\=([0-9]+)/i,p=/qty\=[0-9]+\&?/ig;h.each(function(){try{var c=d(this),e=c.find(a.buyButton),b=c.find(a.qttInput),h=c.find(a.btnMore),l=c.find(a.btnMinus);if(!e.length&&null!==a.buyButton||!b.length)return g("O plugin parou por aqui! N\u00e3o foram encontrados o bot\u00e3o comprar e o campo de quantidade","alerta");if(b.is(".qd-sq-on"))return g(["Execu\u00e7\u00e3o ignorada pois este input j\u00e1 possui o plugin aplicado. Input: ",b],"info");b.addClass("qd-sq-on");k(b,h,l);
null!==a.buyButton&&m(b,e);f(b,h,l);d(window).on("vtex.sku.selected",function(){b.change()})}catch(r){g(r.message)}})};d.fn.QD_smartQuantity=function(g){var a=d(this);a.qdPlugin=new n(a,d.extend({},m,g));d(window).trigger("QuatroDigital.sq_callback");return a};d(function(){d(".qd_auto_smart_quantity").QD_smartQuantity()})}})(this);    