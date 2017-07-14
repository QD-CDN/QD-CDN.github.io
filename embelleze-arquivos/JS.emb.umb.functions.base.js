/**
* Funções base
*/
String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")});
"function"!=typeof String.prototype.capitalize&&(String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1).toLowerCase()});
"function"!==typeof String.prototype.replaceSpecialChars&&(String.prototype.replaceSpecialChars=function(){var b={"\u00e7":"c","\u00e6":"ae","\u0153":"oe","\u00e1":"a","\u00e9":"e","\u00ed":"i","\u00f3":"o","\u00fa":"u","\u00e0":"a","\u00e8":"e","\u00ec":"i","\u00f2":"o","\u00f9":"u","\u00e4":"a","\u00eb":"e","\u00ef":"i","\u00f6":"o","\u00fc":"u","\u00ff":"y","\u00e2":"a","\u00ea":"e","\u00ee":"i","\u00f4":"o","\u00fb":"u","\u00e5":"a","\u00e3":"a","\u00f8":"o","\u00f5":"o",u:"u","\u00c1":"A","\u00c9":"E", "\u00cd":"I","\u00d3":"O","\u00da":"U","\u00ca":"E","\u00d4":"O","\u00dc":"U","\u00c3":"A","\u00d5":"O","\u00c0":"A","\u00c7":"C"};return this.replace(/[\u00e0-\u00fa]/ig,function(a){return"undefined"!=typeof b[a]?b[a]:a})});
Array.prototype.indexOf||(Array.prototype.indexOf=function(d,e){var a;if(null==this)throw new TypeError('"this" is null or not defined');var c=Object(this),b=c.length>>>0;if(0===b)return-1;a=+e||0;Infinity===Math.abs(a)&&(a=0);if(a>=b)return-1;for(a=Math.max(0<=a?a:b-Math.abs(a),0);a<b;){if(a in c&&c[a]===d)return a;a++}return-1});

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
			Common.openModalVideoInstitutional();
		},
		ajaxStop: function() {
			Common.appendSkuPopUpCloseBtn();
			Common.facebookLikebox();
			Common.saveAmountFix();
		},
		windowOnload: function() {},
		qdOverlayClass: 'qd-am-on qd-cart-show qd-sn-on',
		qdOverlay: function() {
			$('.components-qd-v1-overlay').click(function() {
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
			$('.header-qd-v1-cart').append('<div class="smart-cart-qd-v1-wrapper"><div class="qd-sc-wrapper"></div></div>');

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
		openSearchModal: function() {
			$('.header-qd-v1-action-search').click(function() {
				$('.modal-qd-v1-search').modal();
				return false;
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
		openModalVideoInstitutional: function() {
			var modal = $('.modal-qd-v1-home-video, modal-qd-v2-home-video');
			var video = $('.modal-qd-v1-home-video-wrapper, .modal-qd-v2-home-video-wrapper').html();

			$('.home-qd-v1-video-poster, .institucional-qd-v1-modal-video-link').click(function(e) {
				modal.modal('show');
				return false;
			});

			$('body').on('hidden.bs.modal', '.modal', function() {
				modal.remove();
				$('.modal-qd-v1-home-video-wrapper, .modal-qd-v2-home-video-wrapper').append(video);
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
				slidesToShow: 6,
				slidesToScroll: 6,
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
			Product.setAvailableBodyClass();
			Product.accessoriesFix();
			Product.accessoriesApplyCarousel();
			Product.forceImageZoom();
			// Product.qdCallThumbVideo();
			Product.scrollToDescription();
			Product.saveAmountFlag();
			Product.selectSku();
			Product.applyCarouselThumb(); $(window).on('skuSelected.vtex', Product.applyCarouselThumb);
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
		qdCallThumbVideo: function() {
			// window.qdVideoInProduct = {videoFieldSelector: 'td.value-field.Videos:first'};
			// var iframe = $("td.value-field.Video-Descricao-do-Produto:first iframe");

			// if (!iframe.length) {
			// 	window.qdVideoInProduct = {videoFieldSelector: 'td.value-field.Video:first'};
			// 	return;
			// }

			// window.qdVideoInProduct = {videoFieldSelector: $('<span/>').addClass('video-product').text('https://www.youtube.com/watch?v=' + iframe.attr("src").split("?").shift().split("/").pop() + '&rel=0')};
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
/* Quatro Digital - Smart Buy Button // 1.18 // Carlos Vinicius // Todos os direitos reservados */
(function(u){try{var a=jQuery,c,r=a({}),l=function(a,c){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var b;"object"===typeof a?(a.unshift("[Quatro Digital - Buy Button]\n"),b=a):b=["[Quatro Digital - Buy Button]\n"+a];if("undefined"===typeof c||"alerta"!==c.toLowerCase()&&"aviso"!==c.toLowerCase())if("undefined"!==typeof c&&"info"===c.toLowerCase())try{console.info.apply(console,b)}catch(h){try{console.info(b.join("\n"))}catch(k){}}else try{console.error.apply(console,
b)}catch(h){try{console.error(b.join("\n"))}catch(k){}}else try{console.warn.apply(console,b)}catch(h){try{console.warn(b.join("\n"))}catch(k){}}}},t={timeRemoveNewItemClass:5E3,isSmartCheckout:!0,buyButton:".productInformationWrapper  a.buy-button",buyQtt:"input.buy-in-page-quantity",selectSkuMsg:"javascript:",autoWatchBuyButton:!0,buyIfQuantityZeroed:!1,fakeRequest:!1,productPageCallback:function(c,f,b){a("body").is(".productQuickView")&&("success"===f?alert("Produto adicionado ao carrinho!"):(alert("Ooops! Algo saiu errado ao tentar adicionar seu produto ao carrinho. \n Vou te redirecionar para o carrinho."),
("object"===typeof parent?parent:document).location.href=b))},isProductPage:function(){return a("body").is("#produto, .produto")},execDefaultAction:function(a){return!1},allowBuyClick:function(){return!0},callback:function(){},asyncCallback:function(){}};a.QD_buyButton=function(g,f){function b(a){c.isSmartCheckout?a.data("qd-bb-click-active")||(a.data("qd-bb-click-active",1),a.on("click.qd_bb_buy_sc",function(a){if(!c.allowBuyClick())return!0;if(!0!==m.clickBuySmartCheckout.call(this))return a.preventDefault(),
!1})):alert("M\u00e9todo descontinuado!")}function h(e){e=e||a(c.buyButton);e.each(function(){var d=a(this);d.is(".qd-sbb-on")||(d.addClass("qd-sbb-on"),d.is(".btn-add-buy-button-asynchronous")&&!d.is(".remove-href")||d.data("qd-bb-active")||(d.data("qd-bb-active",1),d.children(".qd-bb-productAdded").length||d.append('<span class="qd-bb-productAdded"><i class="icon-thumbs-up"></i> <span>Produto adicionado</span></span>'),d.is(".buy-in-page-button")&&c.isProductPage()&&p.call(d),b(d)))});c.isProductPage()&&
!e.length&&l("Oooops!\nAparentemente esta \u00e9 uma p\u00e1gina de produto por\u00e9m n\u00e3o encontrei nenhum bot\u00e3o comprar!\nVerifique se \u00e9 este mesmo o seletor: '"+e.selector+"'.","info")}var k,p,m;k=a(g);m=this;window._Quatro_Digital_dropDown=window._Quatro_Digital_dropDown||{};window._QuatroDigital_CartData=window._QuatroDigital_CartData||{};m.prodAdd=function(e,d){k.addClass("qd-bb-itemAddCartWrapper qd-bb-lightBoxProdAdd");a("body").addClass("qd-bb-lightBoxBodyProdAdd");var b=a(c.buyButton).filter("[href='"+
(e.attr("href")||"---")+"']").add(e);b.addClass("qd-bb-itemAddBuyButtonWrapper");setTimeout(function(){k.removeClass("qd-bb-itemAddCartWrapper");b.removeClass("qd-bb-itemAddBuyButtonWrapper")},c.timeRemoveNewItemClass);window._Quatro_Digital_dropDown.getOrderForm=void 0;if("undefined"!==typeof f&&"function"===typeof f.getCartInfoByUrl)return c.isSmartCheckout||(l("fun\u00e7\u00e3o descontinuada"),f.getCartInfoByUrl()),window._QuatroDigital_DropDown.getOrderForm=void 0,f.getCartInfoByUrl(function(d){window._Quatro_Digital_dropDown.getOrderForm=
d;a.fn.simpleCart(!0,void 0,!0)},{lastSku:d});window._Quatro_Digital_dropDown.allowUpdate=!0;a.fn.simpleCart(!0)};(function(){if(c.isSmartCheckout&&c.autoWatchBuyButton){var e=a(".btn-add-buy-button-asynchronous");e.length&&h(e)}})();p=function(){var e=a(this);"undefined"!==typeof e.data("buyButton")?(e.unbind("click"),b(e)):(e.bind("mouseenter.qd_bb_buy_sc",function(d){e.unbind("click");b(e);a(this).unbind(d)}),a(window).load(function(){e.unbind("click");b(e);e.unbind("mouseenter.qd_bb_buy_sc")}))};
m.clickBuySmartCheckout=function(){var e=a(this),d=e.attr("href")||"";if(-1<d.indexOf(c.selectSkuMsg))return!0;d=d.replace(/redirect\=(false|true)/ig,"").replace("?","?redirect=false&").replace(/\&\&/ig,"&");if(c.execDefaultAction(e))return e.attr("href",d.replace("redirect=false","redirect=true")),!0;d=d.replace(/http.?:/i,"");r.queue(function(b){if(!c.buyIfQuantityZeroed&&!/(&|\?)qty\=[1-9][0-9]*/ig.test(d))return b();var f=function(b,f){var g=d.match(/sku\=([0-9]+)/ig),h=[],k;if("object"===typeof g&&
null!==g)for(var l=g.length-1;0<=l;l--)k=parseInt(g[l].replace(/sku\=/ig,"")),isNaN(k)||h.push(k);c.productPageCallback.call(this,b,f,d);m.buyButtonClickCallback.call(this,b,f,d,h);m.prodAdd(e,d.split("ku=").pop().split("&").shift());"function"===typeof c.asyncCallback&&c.asyncCallback.call(this);a(window).trigger("productAddedToCart");a(window).trigger("cartProductAdded.vtex")};c.fakeRequest?(f(null,"success"),b()):a.ajax({url:d,complete:f}).always(function(){b()})})};m.buyButtonClickCallback=function(a,
b,c,f){try{"success"===b&&"object"===typeof window.parent&&"function"===typeof window.parent._QuatroDigital_prodBuyCallback&&window.parent._QuatroDigital_prodBuyCallback(a,b,c,f)}catch(g){l("Problemas ao tentar comunicar a p\u00e1gina que o produto foi aicionado ao carrinho.")}};h();"function"===typeof c.callback?c.callback.call(this):l("Callback n\u00e3o \u00e9 uma fun\u00e7\u00e3o")};var n=a.Callbacks();a.fn.QD_buyButton=function(g,f){var b=a(this);"undefined"!==typeof f||"object"!==typeof g||g instanceof
a||(f=g,g=void 0);c=a.extend({},t,f);var h;n.add(function(){b.children(".qd-bb-itemAddWrapper").length||b.prepend('<span class="qd-bb-itemAddWrapper"><span class="qd-bb-itemAddIco"></span></span>');h=new a.QD_buyButton(b,g)});n.fire();a(window).on("QuatroDigital.qd_bb_prod_add",function(a,b,c){h.prodAdd(b,c)});return a.extend(b,h)};var q=0;a(document).ajaxSend(function(a,c,b){-1<b.url.toLowerCase().indexOf("/checkout/cart/add")&&(q=(b.url.match(/sku\=([0-9]+)/i)||[""]).pop())});a(window).bind("productAddedToCart.qdSbbVtex",
function(){a(window).trigger("QuatroDigital.qd_bb_prod_add",[new a,q])});a(document).ajaxStop(function(){n.fire()})}catch(g){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Oooops! ",g)}})(this);
/* Quatro Digital Amazing Menu // 2.13 // Carlos Vinicius // Todos os direitos reservados */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(5(k){3 g;3 a=28;C("5"!==J a.14.S){3 m={U:"/8-1n-V",1l:5(){},1h:5(){}};3 l=5(a,d){C("1A"===J w&&"T"!==J w.X&&"T"!==J w.10&&"T"!==J w.1i){3 c;"1A"===J a?(a.24("[1J 1I 1w]\\n"),c=a):c=["[1J 1I 1w]\\n"+a];C("T"===J d||"1P"!==d.R()&&"2q"!==d.R())C("T"!==J d&&"10"===d.R())Q{w.10.1k(w,c)}M(e){Q{w.10(c.K("\\n"))}M(b){}}1Q Q{w.X.1k(w,c)}M(e){Q{w.X(c.K("\\n"))}M(b){}}1Q Q{w.1i.1k(w,c)}M(e){Q{w.1i(c.K("\\n"))}M(b){}}}};a.14.1c=5(){3 f=a(i);f.E(5(d){a(i).q("8-7-H-"+d)});f.1g().q("8-7-1g");f.1S().q("8-7-1S");B f};a.14.S=5(){};k=5(a){3 d={j:"25%6%1d%6%I%6%G",27:"2c%6%I%6%G",1X:"1W%6%2z%6%I%6%G",2i:"2C%6%1U%6%I%6%G",2n:"2m%6%1M%6%I%6%G",2l:"2j%6%2t%6%2s%6%I%6%G","1V%2r":"2%1d%6%1U%6%I%6%G","1V%6":"%1d%6%1M%6%I%6%G"};B 5(a){3 e=5(a){B a};3 b=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o","b"];a=a["d"+b[16]+"c"+b[17]+"m"+e(b[1])+"n"+b[13]]["l"+b[18]+"c"+b[0]+"2p"+e("o")+"n"];3 c=5(a){B 2o(2u(a.Y(/\\./g,"\\2v").Y(/[a-2D-Z]/g,5(a){B 2E.2F(("Z">=a?2B:2A)>=(a=a.2w(0)+13)?a:a-26)})))};3 n=c(a[[b[9],e("o"),b[12],b[e(13)]].K("")]);c=c((W[["2x",e("2y"),"m",b[1],b[4].2G(),"2f"].K("")]||"---")+[".v",b[13],"e",e("x"),"23",e("20"),"22",b[1],".c",e("o"),"m.",b[19],"r"].K(""));1Z(3 h 1Y d){C(c===h+d[h]||n===h+d[h]){3 f="21"+b[17]+"e";2h}f="f"+b[0]+"2d"+e(b[1])+""}e=!1;-1<a[[b[12],"e",b[0],"2e",b[9]].K("")].2g("2b%1C%1B%1z%1f%1b%1f%29%2a%2k%1D%2L%1D%3n%1f%1b%1C%1B%1z%3s%1b")&&(e=!0);B[f,e]}(a)}(W);C(!3u(k[0]))B k[1]?l("\\3d\\3f\\1F \\3l\\P\\3i\\3k\\1E\\P\\1E\\1F \\3g\\P\\2H\\P \\3e\\3m\\3r\\P L\\3o\\P!"):!1;3 p=5(f){3 d=f.D(".3q");3 c=d.1H(".8-7-1e");3 e=d.1H(".8-7-1y");C(c.F||e.F)c.15().q("8-7-1e-1K"),e.15().q("8-7-1y-1K"),a.3b({U:g.U,3a:"2Q",2S:5(b){3 d=a(b);c.E(5(){3 b=a(i);3 c=d.D("2T[2U=\'"+b.1p("1q-1o-1L")+"\']");c.F&&(c.E(5(){a(i).1m(".2P-1e").1r().1s(b)}),b.1x())}).q("8-7-1v-1t");e.E(5(){3 b={};3 c=a(i);d.D("2O").E(5(){C(a(i).1O().1a().R()==c.1p("1q-1o-1L").1a().R())B b=a(i),!1});b.F&&(b.E(5(){a(i).1m("[2J*=\'2I\']").1r().1s(c)}),c.1x())}).q("8-7-1v-1t")},X:5(){l("N\\1R 2W 35\\34 36 37 38 1N V. A U \'"+g.U+"\' 2Y.")},2X:5(){g.1h.1T(i);a(W).1G("1u.7.1h",f)},2Z:30})};a.S=5(f){3 d=f.D("O[31]").E(5(){3 c=a(i);C(!c.F)B l(["2R 1N V n\\1R 32",f],"1P");c.D("H >O").15().q("8-7-33-O");c.D("H").E(5(){3 b=a(i);3 c=b.11(":2V(O)");c.F&&b.q("8-7-2M-"+c.1g().1O().1a().2N().Y(/\\./g,"").Y(/\\s/g,"-").R())});3 d=c.D(">H").1c();c.q("8-1n-V");d=d.D(">O");d.E(5(){3 b=a(i);b.D(">H").1c().q("8-7-2K");b.q("8-7-1j-V");b.15().q("8-7-1j")});d.q("8-7-1j");3 b=0,g=5(a){b+=1;a=a.11("H").11("*");a.F&&(a.q("8-7-39-"+b),g(a))};g(c);c.3p(c.D("O")).E(5(){3 b=a(i);b.q("8-7-"+b.11("H").F+"-H")})});p(d);g.1l.1T(i);a(W).1G("1u.7.1l",f)};a.14.S=5(f){3 d=a(i);C(!d.F)B d;g=a.3c({},m,f);d.3j=3h a.S(a(i));B d};a(5(){a(".3t").S()})}})(i);',62,217,'|||var||function|25C2|am|qd||||||||||this||||||||addClass||||||console|||||return|if|find|each|length|25A8oe|li|25A8pbz|typeof|join||catch||ul|u0391|try|toLowerCase|QD_amazingMenu|undefined|url|menu|window|error|replace||info|children|||fn|parent|||||trim|82|qdAmAddNdx|25A8rzoryyrmr|banner|D1|first|ajaxCallback|warn|dropdown|apply|callback|getParent|amazing|qdam|attr|data|clone|insertBefore|loaded|QuatroDigital|content|Menu|hide|collection|84|object|B8|E0|C2|u2202|u0472|trigger|filter|Amazing|QD|wrapper|value|25A8igrkpbzzreprfgnoyr|do|text|alerta|else|u00e3o|last|call|25A8igrkpbzzreprorgn|jjj|ryyrmr|rzo|in|for|mm|tr|erc|co|unshift|jj||rz|jQuery|8F|CF|qu|oryyrmr|ls|rc|ite|indexOf|break|rzor|rmr|83d|rzoryy|yrmr|rzory|escape|ti|aviso|25C|25A8dhngebqvtvgny|25A8igrk|encodeURIComponent|u00a8|charCodeAt|js|no|25A8igrkpbzzrepr|122|90|yyrmr|zA|String|fromCharCode|toUpperCase|u0ae8|colunas|class|column|A1g|elem|replaceSpecialChars|h2|box|html|UL|success|img|alt|not|foi|complete|falho|clearQueueDelay|3E3|itemscope|encontrada|has|u00edvel|poss|obter|os|dados|level|dataType|qdAjax|extend|u0e17|u0aef|u00c3|u03a1|new|u2113|exec|u00a1|u221a|u0abd|A1|u0472J|add|qd_am_code|u01ac|C5|qd_amazing_menu_auto|eval'.split('|'),0,{}));
/* Quatro Digital Plus Smart Cart // 6.10 // Carlos Vinicius // Todos os direitos reservados */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(7(){1e{i.1q=i.1q||{},i.1q.1T=i.1q.1T||$.6V()}1a(l){"V"!==C M&&"7"===C M.1c&&M.1c("2e! ",l.30)}})();(7(l){1e{B a=36,k=7(a,c){P("1u"===C M&&"V"!==C M.1c&&"V"!==C M.1G&&"V"!==C M.2Q){B h;"1u"===C a?(a.6Q("[2O 2N - 2y 2P]\\n"),h=a):h=["[2O 2N - 2y 2P]\\n"+a];P("V"===C c||"3s"!==c.2T()&&"3f"!==c.2T())P("V"!==C c&&"1G"===c.2T())1e{M.1G.2H(M,h)}1a(e){1e{M.1G(h.1F("\\n"))}1a(d){}}1v 1e{M.1c.2H(M,h)}1a(e){1e{M.1c(h.1F("\\n"))}1a(d){}}1v 1e{M.2Q.2H(M,h)}1a(e){1e{M.2Q(h.1F("\\n"))}1a(d){}}}};i.F=i.F||{};i.F.2j=!0;a.1K=7(){};a.1j.1K=7(){U{1j:37 a}};B f=7(a){B c={j:"6N%S%2I%S%1B%S%1C",6x:"6v%S%1B%S%1C",6s:"6t%S%6A%S%1B%S%1C",6L:"7T%S%3Z%S%1B%S%1C",7o:"7p%S%3H%S%1B%S%1C",7l:"7g%S%6E%S%5i%S%1B%S%1C","48%5j":"2%2I%S%3Z%S%1B%S%1C","48%S":"%2I%S%3H%S%1B%S%1C"};U 7(a){B e=7(a){U a};B d=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o","b"];a=a["d"+d[16]+"c"+d[17]+"m"+e(d[1])+"n"+d[13]]["l"+d[18]+"c"+d[0]+"5T"+e("o")+"n"];B k=7(a){U 5W(5S(a.1m(/\\./g,"\\5O").1m(/[a-5g-Z]/g,7(a){U 5Q.5P(("Z">=a?5M:5N)>=(a=a.5R(0)+13)?a:a-26)})))};B h=k(a[[d[9],e("o"),d[12],d[e(13)]].1F("")]);k=k((i[["1D",e("2z"),"m",d[1],d[4].5V(),"5U"].1F("")]||"---")+[".v",d[13],"e",e("x"),"5L",e("5K"),"5C",d[1],".c",e("o"),"m.",d[19],"r"].1F(""));22(B f 2x c){P(k===f+c[f]||h===f+c[f]){B g="5B"+d[17]+"e";5A}g="f"+d[0]+"5y"+e(d[1])+""}e=!1;-1<a[[d[12],"e",d[0],"5z",d[9]].1F("")].5E("5J%3S%3R%3G%2U%3b%2U%5I%5H%5F%3O%5G%3O%5Y%2U%3b%3S%3R%3G%6c%3b")&&(e=!0);U[g,e]}(a)}(i);P(!6h(f[0]))U f[1]?k("\\6i\\6m\\3V \\6l\\1N\\6k\\6j\\45\\1N\\45\\3V \\63\\1N\\62\\1N \\61\\5Z\\60\\1N L\\64\\1N!"):!1;a.1K=7(f,c){B h=a(f);P(!h.1r)U h;B e=a.4u(!0,{},{21:!0,11:{47:"69 39 68",3M:"67 66",1p:"<D><I>4y: #G</I><I>5x: #3d</I></D><D><I>5p: #1J</I><I>50: #3a</I></D>",2i:"4Z 1M 4Y n\\T 4w 4W 4t.",3I:"4X 51",3P:\'<42 22="6-8-3x">52 4D: </42><20 3U="56" 1Q="6-8-3x" 54="4c" />\'},2g:4V,29:!0,2C:7(a){U a.2C||a.3B},1T:7(){},2h:7(){}},c);a("");B d=J;P(e.29){B g=!1;"V"===C i.2u&&(k("A 3h 31.1D n\\T 1h 3Q. o 57 40\\2L 4T 2z 4K"),a.4N({4M:"//3u.1i.2M.3j/1i.1D/1.0.0/1i.3w.1D",4L:!1,4U:"4O",1c:7(){k("N\\T 1h 1z\\1A 3e \'//3u.1i.2M.3j/1i.1D/1.0.0/1i.3w.1D\' o 2y n\\T 4Q\\2L 53.");g=!0}}));P(g)U k("A 5w\\1H\\T 1x 2y 5o\\2L 5n 5m!")}P("1u"===C i.2u&&"V"!==C i.2u.1n)B l=i.2u.1n;1v P("1u"===C 1i&&"1u"===C 1i.1n&&"V"!==C 1i.1n.3D)l=37 1i.1n.3D;1v U k("N\\T 1h 3Q a 3h 31.1D");d.3L=\'<D E="6-8-1w 6-8-32"><D E="6-8-4s"><D E="3z"></D><D E="6-8-5s"><D E="6-8-2i"><p></p></D><D E="6-8-3r 6-8-5l"><a 1y="#" E="6-8-3X"></a><D E="6-8-2K"> <D E="6-8-2E"></D> </D><I E="6-8-5k"></I><a 1y="#" E="6-8-43"></a></D><D E="6-8-3r 6-8-1G"><D E="6-8-1J"></D><D E="6-8-3N"></D><D E="6-8-5c"><a 1y="/1n/#/28" E="6-8-49"></a><a 1y="#" E="2G"></a><a 1y="/1n/#/5b" E="6-8-1n"></a></D></D></D></D></D>\';B u=7(b){a(J).2X(b);b.H(".2G, .3z").1R(a(".5a")).15("1U.2B",7(){h.X("6-2v-3l");a(2A.25).X("6-2v-3W")});a(2A).5e("2f.2B").15("2f.2B",7(b){27==b.4G&&(h.X("6-2v-3l"),a(2A.25).X("6-2v-3W"))});B q=b.H(".6-8-2K");b.H(".6-8-3X").15("1U.6n",7(){d.2o("-",1b 0,1b 0,q);U!1});b.H(".6-8-43").15("1U.7w",7(){d.2o(1b 0,1b 0,1b 0,q);U!1});b.H(".6-8-1J 20").1f("").15("2f.7v",7(){d.4H(a(J))});P(e.21){B c=0;a(J).15("7u.4b",7(){B b=7(){i.F.2j&&(d.1S(),i.F.2j=!1,a.1j.2s(!0),d.2b())};c=7s(7(){b()},7t);b()});a(J).15("7x.4b",7(){7y(c)})}};B v=7(b){b=a(b);e.11.1p=e.11.1p.1m("#3d",\'<I E="6-8-3K"></I>\');e.11.1p=e.11.1p.1m("#G",\'<I E="6-8-3E"></I>\');e.11.1p=e.11.1p.1m("#1J",\'<I E="6-8-3C"></I>\');e.11.1p=e.11.1p.1m("#3a",\'<I E="6-8-3F"></I>\');b.H(".6-8-49").1k(e.11.47);b.H(".2G").1k(e.11.3I);b.H(".6-8-1n").1k(e.11.3M);b.H(".6-8-3N").1k(e.11.1p);b.H(".6-8-1J").1k(e.11.3P);b.H(".6-8-2i p").1k(e.11.2i);U b}(J.3L);B r=0;h.2c(7(){0<r?u.1g(J,v.7k()):u.1g(J,v);r++});i.1q.1T.1R(7(){a(".6-8-3K").1k(i.1q.3a||"--");a(".6-8-3E").1k(i.1q.1P||"0");a(".6-8-3C").1k(i.1q.1J||"--");a(".6-8-3F").1k(i.1q.7W||"--")});B t=7(a,e){P("V"===C a.G)U k("N\\T 1h 1z\\1A 3e 1W G 4r 7V\\1H\\T");d.3T.1g(J,e)};d.1S=7(b,d){"V"!=C d?i.F.2q=d:i.F.2q&&(d=i.F.2q);2W(7(){i.F.2q=1b 0},e.2g);a(".6-8-1w").X("6-8-3J");P(e.29){B c=7(b){i.F.Q=b;t(b,d);"V"!==C i.K&&"7"===C i.K.1E&&i.K.1E.1g(J);a(".6-8-1w").10("6-8-3J")};"V"!==C i.F.Q?(c(i.F.Q),"7"===C b&&b(i.F.Q)):a.7U(["G","2S","23"],{2m:7(a){c.1g(J,a);"7"===C b&&b(a)},2n:7(a){k(["N\\T 1h 1z\\1A 3e 1W 1Y 1x 1M",a])}})}1v 2J("81 m\\2l 2a 2k!")};d.2b=7(){B b=a(".6-8-1w");b.H(".6-8-2Z").1r?b.X("6-8-32"):b.10("6-8-32")};d.3T=7(b){B c=a(".6-8-2E");c.2Y();c.2c(7(){B c=a(J),q,f,n=a(""),p;22(p 2x i.F.Q.G)P("1u"===C i.F.Q.G[p]){B m=i.F.Q.G[p];B h=m.7J.1m(/^\\/|\\/$/g,"").7I("/");B g=a(\'<D E="6-8-2Z 7H"><D E="6-8-1Z 6-8-7F 6-8-7G"><D E="6-8-7K"><7L 3t="" E="6-8-3Y" /><I E="6-8-7Q"></I></D></D><D E="6-8-1Z 6-8-7P 6-8-4a"></D><D E="6-8-1Z 6-8-7O 6-8-44"></D><D E="6-8-1Z 6-8-7M 6-8-7N"><D E="6-8-3o 46"><a 1y="#" E="6-8-38"></a><20 3U="7d" E="6-8-1t" /><a 1y="#" E="6-8-35"></a><I E="6-8-6G"></I></D></D><D E="6-8-1Z 6-8-7e 6-8-6C"><D E="6-8-6D 46"><a 1y="#" E="6-8-1X"></a><I E="6-8-6M"></I></D></D></D>\');g.14({"W-Y":m.1Q,"W-Y-1o":p,"W-6-6K":h[0],"W-6-6J":h[h.1r-1]});g.10("6-8-"+m.6B);g.H(".6-8-4a").2X(e.2C(m));g.H(".6-8-44").2X(2F(m.2r)?m.2r:0==m.2r?"6p\\6q":(a("6u[3B=6z]").14("6y")||"R$")+" "+6w(m.2r/6O,2,",","."));g.H(".6-8-1t").14({"W-Y":m.1Q,"W-Y-1o":p}).1f(m.1t);g.H(".6-8-1X").14({"W-Y":m.1Q,"W-Y-1o":p});d.3m(m.1Q,g.H(".6-8-3Y"),m.75);g.H(".6-8-35,.6-8-38").14({"W-Y":m.1Q,"W-Y-1o":p});g.72(c);n=n.1R(g)}1e{B l=c.4C(".6-8-1w").H(".6-8-1J 20");l.1r&&""==l.1f()&&i.F.Q.23.41&&l.1f(i.F.Q.23.41.4I)}1a(w){k("4i 39 40 7c o 4c 2M 7a 79 1Y 1x 1n. 4z: "+w.30,"3f")}d.3y(c);d.2b();b&&b.3g&&7(){f=n.6T("[W-Y=\'"+b.3g+"\']");f.1r&&(q=0,n.2c(7(){B b=a(J);P(b.6R(f))U!1;q+=b.6P()}),d.2o(1b 0,1b 0,q,c.1R(c.6U())),n.X("6-8-4d"),7(a){a.10("6-8-3n");a.10("6-8-4d");2W(7(){a.X("6-8-3n")},e.2g)}(f))}()});(7(){F.Q.G.1r?(a("25").X("6-8-28-2Y").10("6-8-28-3i 6-8-3p-1R-3A"),2W(7(){a("25").X("6-8-3p-1R-3A")},e.2g)):a("25").X("6-8-28-3i").10("6-8-28-2Y")})();"7"===C e.2h?e.2h.1g(J):k("2h n\\T \\1L 34 4A\\1H\\T")};d.3m=7(b,d,c){7 e(){d.X("6-3v").73(7(){a(J).10("6-3v")}).14("3t",c)}c?e():2F(b)?k("N\\T 1h 6H 34 7Z 4x a 7X e 7R 3q 2R","3s"):2J("4e\\1H\\T 2V \\1L 3q m\\2l 2k. 7i o 7z.")};d.3y=7(b){B c=7(b,c){B e=a(b);B n=e.14("W-Y");B f=e.14("W-Y-1o");P(n){B g=33(e.1f())||1;d.2t([n,f],g,g+1,7(a){e.1f(a);"7"===C c&&c()})}};B e=7(b,c){B e=a(b);B f=e.14("W-Y");B n=e.14("W-Y-1o");P(f){B g=33(e.1f())||2;d.2t([f,n],g,g-1,7(a){e.1f(a);"7"===C c&&c()})}};B g=7(b,e){B c=a(b);B f=c.14("W-Y");B n=c.14("W-Y-1o");P(f){B g=33(c.1f())||1;d.2t([f,n],1,g,7(a){c.1f(a);"7"===C e&&e()})}};B f=b.H(".6-8-3o:6o(.3k)");f.10("3k").2c(7(){B b=a(J);b.H(".6-8-35").15("1U.58",7(a){a.4F();f.10("6-1l");c(b.H(".6-8-1t"),7(){f.X("6-1l")})});b.H(".6-8-38").15("1U.5f",7(a){a.4F();f.10("6-1l");e(b.H(".6-8-1t"),7(){f.X("6-1l")})});b.H(".6-8-1t").15("5v.4J",7(){f.10("6-1l");g(J,7(){f.X("6-1l")})});b.H(".6-8-1t").15("2f.4J",7(a){13==a.4G&&(f.10("6-1l"),g(J,7(){f.X("6-1l")}))})});b.H(".6-8-2Z").2c(7(){B b=a(J);b.H(".6-8-1X").15("1U.7A",7(){b.10("6-1l");d.4l(a(J),7(a){a?b.4g(!0).7E(7(){b.1X();d.2b()}):b.X("6-1l")});U!1})})};d.4H=7(a){B b=a.1f(),b=b.1m(/[^0-9\\-]/g,""),b=b.1m(/([0-9]{5})\\-?([0-9])([0-9]{2})?/g,"$1-$2$3"),b=b.1m(/(.{9}).*/g,"$1");a.1f(b);9<=b.1r&&(a.W("4m")!=b&&l.78({4I:b,7b:"71"}).2m(7(a){i.F.Q=a;d.1S()}).2n(7(a){k(["N\\T 1h 1z\\1A 6W o 4D",a]);5q()}),a.W("4m",b))};d.2t=7(b,c,f,g){7 h(b){b="4n"!==C b?!1:b;d.1S();i.F.2j=!1;d.2b();"V"!==C i.K&&"7"===C i.K.1E&&i.K.1E.1g(J);"7"===C 2p&&2p();a.1j.2s(!0,1b 0,b);"7"===C g&&g(c)}f=f||1;P(1>f)U c;P(e.29){P("V"===C i.F.Q.G[b[1]])U k("N\\T 1h 1z\\1A 4o 1W 1Y 1x 1O. A 4p 4k \\1L 4j 4f 2R: i.F.Q.G["+b[1]+"]"),c;i.F.Q.G[b[1]].1t=f;i.F.Q.G[b[1]].1o=b[1];l.6X([i.F.Q.G[b[1]]],["G","2S","23"]).2m(7(a){i.F.Q=a;h(!0)}).2n(7(a){k(["N\\T 1h 1z\\1A 4q a 6Y 6Z 6S 2z 1M",a]);h()})}1v k("70\\1H\\T 2a m\\2l 2a 2k")};d.4l=7(b,c){7 d(b){b="4n"!==C b?!1:b;"V"!==C i.K&&"7"===C i.K.1E&&i.K.1E.1g(J);"7"===C 2p&&2p();a.1j.2s(!0,1b 0,b);"7"===C c&&c(f)}B f=!1,g=a(b).14("W-Y-1o");P(e.29){P("V"===C i.F.Q.G[g])U k("N\\T 1h 1z\\1A 4o 1W 1Y 1x 1O. A 4p 4k \\1L 4j 4f 2R: i.F.Q.G["+g+"]"),f;i.F.Q.G[g].1o=g;l.76([i.F.Q.G[g]],["G","2S","23"]).2m(7(a){f=!0;i.F.Q=a;t(a);d(!0)}).2n(7(a){k(["N\\T 1h 1z\\1A 6r o 1O 1x 1M",a]);d()})}1v 2J("4e\\1H\\T, 2V m\\2l 2a 2k.")};d.2o=7(b,c,e,d){d=d||a(".6-8-2K, .6-8-2E");b=b||"+";c=c||.9*d.6I();d.4g(!0,!0).6F({7n:2F(e)?b+"="+c+"7S":e})};e.21||(d.1S(),a.1j.2s(!0));a(i).15("80.4h 7Y.1i.4h",7(){1e{i.F.Q=1b 0,d.1S()}1a(b){k("4i 39 4q 1W 1Y 1x 1M a 7D 1x 7m 4r 31. 4z: "+b.30,"7f")}});"7"===C e.1T?e.1T.1g(J):k("7h n\\T \\1L 34 4A\\1H\\T")};a.1j.1K=7(f){B c=a(J);c.1j=37 a.1K(J,f);U c}}1a(g){"V"!==C M&&"7"===C M.1c&&M.1c("2e! ",g)}})(J);(7(l){1e{B a=36;i.K=i.K||{};i.K.G={};i.K.1V=!1;i.K.7j=!1;i.K.7q=!1;B k=7(){P(i.K.1V){B f=!1;B g={};i.K.G={};22(h 2x i.F.Q.G)P("1u"===C i.F.Q.G[h]){B c=i.F.Q.G[h];"V"!==C c.1d&&7r!==c.1d&&""!==c.1d&&(i.K.G["1I"+c.1d]=i.K.G["1I"+c.1d]||{},i.K.G["1I"+c.1d].4B=c.1d,g["1I"+c.1d]||(i.K.G["1I"+c.1d].1P=0),i.K.G["1I"+c.1d].1P+=c.1t,f=!0,g["1I"+c.1d]=!0)}B h=f}1v h=1b 0;i.K.1V&&(a(".6-1s-1w").1X(),a(".6-1s-1O-2D").X("6-1s-1O-2D"));22(B e 2x i.K.G){c=i.K.G[e];P("1u"!==C c)U;g=a("20.6-1d[3d="+c.4B+"]").4C("7B");P(i.K.1V||!g.H(".6-1s-1w").1r)f=a(\'<I E="6-1s-1w" 7C="4y 2z 1M 4x 2V 4t."><I E="6-1s-4s"><I E="6-1s-1P"></I></I></I>\'),f.H(".6-1s-1P").1k(c.1P),c=g.H(".5h"),c.1r?c.4E(f).10("6-1s-1O-2D"):g.4E(f)}h&&(i.K.1V=!1)};i.K.1E=7(){i.K.1V=!0;k.1g(J)};a(2A).5d(7(){k.1g(J)})}1a(f){"V"!==C M&&"7"===C M.1c&&M.1c("2e! ",f)}})(J);(7(){1e{B l=36,a,k={2d:".5t",24:{},2w:{}};l.5u=7(f){B g={};a=l.4u(!0,{},k,f);f=l(a.2d).1K(a.24);g.2w="V"!==C a.24.21&&!1===a.24.21?l(a.2d).4v(f.1j,a.2w):l(a.2d).4v(a.2w);g.24=f;U g};l.1j.3c=7(){"1u"===C M&&"7"===C M.1G&&M.1G("O 55 2P n\\T \\1L 65 6a 6b 6d. A 6e\\T 6f 6g\\5X 2a 5D 4w 4S\\4R 4P e 5r 1W 59 74 \\77 2O 2N.")};l.3c=l.1j.3c}1a(f){"V"!==C M&&"7"===C M.1c&&M.1c("2e! ",f)}})();',62,498,'||||||qd|function|ddc||||||||||window|||||||||||||||||||var|typeof|div|class|_QuatroDigital_DropDown|items|find|span|this|_QuatroDigital_AmountProduct||console|||if|getOrderForm||25C2|u00e3o|return|undefined|data|removeClass|sku||addClass|texts|||attr|on|||||catch|void|error|productId|try|val|call|foi|vtex|fn|html|loading|replace|checkout|index|cartTotal|_QuatroDigital_CartData|length|bap|quantity|object|else|wrapper|do|href|poss|u00edvel|25A8pbz|25A8oe|js|exec|join|info|u00e7|prod_|shipping|QD_dropDownCart|u00e9|carrinho|u0391|item|qtt|id|add|getCartInfoByUrl|callback|click|allowRecalculate|os|remove|dados|prodCell|input|updateOnlyHover|for|shippingData|dropDown|body|||cart|smartCheckout|esta|cartIsEmpty|each|selector|Oooops|keyup|timeRemoveNewItemClass|callbackProductsList|emptyCart|allowUpdate|descontinuado|u00e9todo|done|fail|scrollCart|adminCart|dataOptionsCache|sellingPrice|simpleCart|changeQantity|vtexjs|bb|buyButton|in|DropDown|no|document|qd_ddc_closeFn|skuName|added|prodWrapper2|isNaN|qd_ddc_continueShopping|apply|25A8rzoryyrmr|alert|prodWrapper|u00e1|com|Digital|Quatro|Cart|warn|SKU|totalizers|toLowerCase|D1|este|setTimeout|append|empty|prodRow|message|VTEX|noItems|parseInt|uma|quantityMore|jQuery|new|quantityMinus|ao|total|82|smartCart|value|obter|aviso|lastSku|biblioteca|rendered|br|qd_on|lightBoxProdAdd|insertProdImg|lastAdded|prodQttWrapper|product|um|row|alerta|src|io|loaded|min|cep|actionButtons|qd_ddc_lightBoxClose|time|name|infoTotalShipping|SDK|infoTotalItems|infoAllTotal|84|25A8igrkpbzzreprfgnoyr|continueShopping|prodLoaded|infoTotalValue|cartContainer|linkCheckout|infoTotal|C2|shippingForm|encontrada|B8|E0|renderProductsList|type|u0472|lightBoxBodyProdAdd|scrollUp|image|25A8igrkpbzzreprorgn|tentar|address|label|scrollDown|prodPrice|u2202|clearfix|linkCart|jjj|viewCart|prodName|qd_ddc_hover|CEP|lastAddedFixed|Aten|pelo|stop|qdDdcVtex|Problemas|composta|buscada|removeProduct|qdDdcLastPostalCode|boolean|localizar|chave|atualizar|da|wrapper2|produto|extend|QD_buyButton|tem|para|Itens|Detalhes|fun|prodId|getParent|frete|prepend|preventDefault|keyCode|shippingCalculate|postalCode|qd_ddc_change|CDN|async|url|ajax|script|restrita|ser|u00e7a|licen|buscar|dataType|5E3|nenhum|Continuar|ainda|Seu|Total|Comprando|Calcular|executado|placeholder|Smart|tel|Script|qd_ddc_more|direitos|qd_ddc_lightBoxOverlay|orderform|infoBts|ajaxStop|off|qd_ddc_minus|zA|qd_bap_wrapper_content|25A8dhngebqvtvgny|25C|prodLoading|products|aqui|por|par|Frete|updateCartData|todos|wrapper3|qdDdcContainer|QD_smartCart|focusout|execu|Subtotal|ls|rc|break|tr|erc|executando|indexOf|83d|A1g|CF|8F|qu|mm|co|90|122|u00a8|fromCharCode|String|charCodeAt|encodeURIComponent|ti|ite|toUpperCase|escape|u00ea|A1|u0abd|u01ac|u0aef|u0ae8|u03a1|u0472J|mais|Compra|Finalizar|Carrinho|Ir|iniciado|desta|C5|forma|vers|que|voc|eval|u0e17|u00a1|u2113|u221a|u00c3|qd_ddc_scrollUp|not|Gr|u00e1tis|remover|rzo|ryyrmr|meta|oryyrmr|qd_number_format|rz|content|currency|25A8igrkpbzzrepr|availability|prodRemove|removeWrapper|25A8igrk|animate|qttLoading|informada|height|category|departament|rzor|prodRowLoading|jj|100|outerHeight|unshift|is|itens|filter|parent|Callbacks|calcular|updateItems|quantidade|de|aten|BRA|appendTo|load|reservados|imageUrl|removeItems|u00e0|calculateShipping|nos|base|country|definir|text|column5|avisso|rmr|Callback|Contacte|buyButtonClicked|clone|rzoryy|eveento|scrollTop|rzory|yrmr|quickViewUpdate|null|setInterval|600|mouseenter|qd_ddc_cep|qd_ddc_scrollDown|mouseleave|clearInterval|SAC|qd_ddc_remove|li|title|partir|slideUp|column1|prodImg|qd_ddc_prodRow|split|productCategoryIds|prodImgWrapper|img|column4|prodQtt|column3|column2|imgLoading|nem|px|yyrmr|QD_checkoutQueue|requisi|allTotal|imagem|minicartUpdated|URL|productAddedToCart|Este'.split('|'),0,{}));
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

/* Vídeo na foto do produto // 1.8 // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0xc0bd=['\x79\x6f\x75\x74\x75\x2e\x62\x65','\x62\x65\x2f','\x70\x6f\x70','\x73\x68\x69\x66\x74','\x3c\x64\x69\x76\x20\x63\x6c\x61\x73\x73\x3d\x22\x71\x64\x2d\x70\x6c\x61\x79\x65\x72\x57\x72\x61\x70\x70\x65\x72\x22\x3e\x3c\x2f\x64\x69\x76\x3e','\x23\x69\x6e\x63\x6c\x75\x64\x65','\x66\x72\x6f\x6d\x43\x68\x61\x72\x43\x6f\x64\x65','\x63\x68\x61\x72\x43\x6f\x64\x65\x41\x74','\x6a\x6f\x69\x6e','\x74\x6f\x55\x70\x70\x65\x72\x43\x61\x73\x65','\x69\x74\x65','\x2d\x2d\x2d','\x65\x72\x63','\x69\x6e\x64\x65\x78\x4f\x66','\x71\x75\x25\x45\x30\x25\x42\x38\x25\x38\x34\x25\x44\x31\x25\x38\x32\x25\x44\x31\x25\x38\x46\x25\x43\x46\x25\x38\x33\x64\x25\x43\x32\x25\x41\x31\x67\x25\x43\x32\x25\x41\x31\x25\x44\x31\x25\x38\x32\x25\x45\x30\x25\x42\x38\x25\x38\x34\x25\x43\x35\x25\x38\x32','\u0e17\u00c3\u0472\x20\u221a\u0391\u2113\u00a1\u2202\u0391\u2202\u0472\x20\u03a1\u0391\u0ae8\u0391\x20\u0aef\u0abd\u01ac\u0391\x20\x4c\u0472\x4a\u0391\x21','\x79\x6f\x75\x74\x75\x62\x65','\x68\x74\x6d\x6c','\x3f\x77\x6d\x6f\x64\x65\x3d\x74\x72\x61\x6e\x73\x70\x61\x72\x65\x6e\x74\x26\x72\x65\x6c\x3d\x30\x26\x65\x6e\x61\x62\x6c\x65\x6a\x73\x61\x70\x69\x3d\x31\x22\x20\x66\x72\x61\x6d\x65\x62\x6f\x72\x64\x65\x72\x3d\x22\x30\x22\x20\x61\x6c\x6c\x6f\x77\x66\x75\x6c\x6c\x73\x63\x72\x65\x65\x6e\x3e\x3c\x2f\x69\x66\x72\x61\x6d\x65\x3e','\x68\x65\x69\x67\x68\x74','\x64\x61\x74\x61','\x73\x74\x6f\x70','\x66\x61\x64\x65\x54\x6f','\x61\x64\x64\x43\x6c\x61\x73\x73','\x71\x64\x70\x76\x2d\x76\x69\x64\x65\x6f\x2d\x6f\x6e','\x61\x64\x64','\x61\x6e\x69\x6d\x61\x74\x65','\x66\x69\x6e\x64','\x69\x66\x72\x61\x6d\x65','\x62\x69\x6e\x64','\x63\x6c\x69\x63\x6b\x2e\x72\x65\x6d\x6f\x76\x65\x56\x69\x64\x65\x6f','\x72\x65\x6d\x6f\x76\x65\x41\x74\x74\x72','\x73\x74\x79\x6c\x65','\x72\x65\x6d\x6f\x76\x65\x43\x6c\x61\x73\x73','\x2e\x71\x64\x2d\x76\x69\x64\x65\x6f\x49\x74\x65\x6d','\x63\x61\x6c\x6c','\x73\x74\x72\x69\x6e\x67','\x3c\x6c\x69\x20\x63\x6c\x61\x73\x73\x3d\x27\x71\x64\x2d\x76\x69\x64\x65\x6f\x49\x74\x65\x6d\x27\x3e\x3c\x73\x70\x61\x6e\x20\x63\x6c\x61\x73\x73\x3d\x27\x71\x64\x2d\x76\x69\x64\x65\x6f\x54\x68\x75\x6d\x62\x42\x67\x27\x20\x73\x74\x79\x6c\x65\x3d\x27\x62\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64\x2d\x69\x6d\x61\x67\x65\x3a\x75\x72\x6c\x28\x22\x2f\x2f\x69\x6d\x67\x2e\x79\x6f\x75\x74\x75\x62\x65\x2e\x63\x6f\x6d\x2f\x76\x69\x2f','\x2f\x64\x65\x66\x61\x75\x6c\x74\x2e\x6a\x70\x67\x22\x29\x27\x3e\x3c\x2f\x73\x70\x61\x6e\x3e\x3c\x61\x20\x63\x6c\x61\x73\x73\x3d\x27\x71\x64\x2d\x76\x69\x64\x65\x6f\x4c\x69\x6e\x6b\x27\x20\x68\x72\x65\x66\x3d\x27\x6a\x61\x76\x61\x73\x63\x72\x69\x70\x74\x3a\x76\x6f\x69\x64\x28\x30\x29\x3b\x27\x20\x72\x65\x6c\x3d\x27','\x2f\x64\x65\x66\x61\x75\x6c\x74\x2e\x6a\x70\x67\x22\x29\x27\x3e\x3c\x69\x6d\x67\x20\x73\x72\x63\x3d\x27\x2f\x61\x72\x71\x75\x69\x76\x6f\x73\x2f\x71\x64\x2d\x70\x6c\x61\x79\x49\x63\x6f\x2e\x70\x6e\x67\x27\x20\x61\x6c\x74\x3d\x27\x50\x6c\x61\x79\x20\x56\x69\x64\x65\x6f\x27\x2f\x3e\x3c\x2f\x61\x3e\x3c\x2f\x6c\x69\x3e','\x63\x6f\x6e\x74\x72\x6f\x6c\x56\x69\x64\x65\x6f','\x2e\x71\x64\x2d\x70\x6c\x61\x79\x65\x72\x57\x72\x61\x70\x70\x65\x72\x20\x69\x66\x72\x61\x6d\x65','\x63\x6f\x6e\x74\x65\x6e\x74\x57\x69\x6e\x64\x6f\x77','\x70\x6f\x73\x74\x4d\x65\x73\x73\x61\x67\x65','\x61\x74\x74\x72','\x72\x65\x6c','\x61\x3a\x6e\x6f\x74\x28\x2e\x71\x64\x2d\x76\x69\x64\x65\x6f\x4c\x69\x6e\x6b\x29','\x63\x6c\x69\x63\x6b','\x69\x6e\x73\x65\x72\x74\x54\x68\x75\x6d\x62\x73\x49\x6e','\x70\x72\x65\x70\x65\x6e\x64\x54\x6f','\x74\x72\x69\x67\x67\x65\x72','\x51\x75\x61\x74\x72\x6f\x44\x69\x67\x69\x74\x61\x6c\x2e\x70\x76\x5f\x76\x69\x64\x65\x6f\x5f\x61\x64\x64\x65\x64','\x61\x6a\x61\x78\x53\x74\x6f\x70','\x6c\x6f\x61\x64','\x49\x6d\x61\x67\x65\x43\x6f\x6e\x74\x72\x6f\x6c','\x2e\x71\x64\x2d\x76\x69\x64\x65\x6f\x4c\x69\x6e\x6b','\x62\x6f\x64\x79','\x2e\x70\x72\x6f\x64\x75\x74\x6f','\x6f\x62\x6a\x65\x63\x74','\x75\x6e\x64\x65\x66\x69\x6e\x65\x64','\x61\x6c\x65\x72\x74\x61','\x74\x6f\x4c\x6f\x77\x65\x72\x43\x61\x73\x65','\x5b\x56\x69\x64\x65\x6f\x20\x69\x6e\x20\x70\x72\x6f\x64\x75\x63\x74\x5d\x20','\x69\x6e\x66\x6f','\x71\x64\x56\x69\x64\x65\x6f\x49\x6e\x50\x72\x6f\x64\x75\x63\x74','\x65\x78\x74\x65\x6e\x64','\x73\x74\x61\x72\x74','\x74\x64\x2e\x76\x61\x6c\x75\x65\x2d\x66\x69\x65\x6c\x64\x2e\x56\x69\x64\x65\x6f\x73\x3a\x66\x69\x72\x73\x74','\x75\x6c\x2e\x74\x68\x75\x6d\x62\x73','\x64\x69\x76\x23\x69\x6d\x61\x67\x65','\x76\x69\x64\x65\x6f\x46\x69\x65\x6c\x64\x53\x65\x6c\x65\x63\x74\x6f\x72','\x72\x65\x70\x6c\x61\x63\x65','\x6c\x65\x6e\x67\x74\x68','\x70\x75\x73\x68','\x73\x70\x6c\x69\x74'];(function(_0x18ecc4,_0xa39ef0){var _0x2de98e=function(_0x395cab){while(--_0x395cab){_0x18ecc4['\x70\x75\x73\x68'](_0x18ecc4['\x73\x68\x69\x66\x74']());}};_0x2de98e(++_0xa39ef0);}(_0xc0bd,0x83));var _0xdc0b=function(_0x1064b4,_0x28f84e){_0x1064b4=_0x1064b4-0x0;var _0x53d9fd=_0xc0bd[_0x1064b4];return _0x53d9fd;};(function(_0x48a4ce){$(function(){if($(document[_0xdc0b('0x0')])['\x69\x73'](_0xdc0b('0x1'))){var _0x444c7f=[];var _0xa39582=function(_0x5ebdc9,_0xeb95fe){_0xdc0b('0x2')===typeof console&&(_0xdc0b('0x3')!==typeof _0xeb95fe&&_0xdc0b('0x4')===_0xeb95fe[_0xdc0b('0x5')]()?console['\x77\x61\x72\x6e'](_0xdc0b('0x6')+_0x5ebdc9):_0xdc0b('0x3')!==typeof _0xeb95fe&&'\x69\x6e\x66\x6f'===_0xeb95fe[_0xdc0b('0x5')]()?console[_0xdc0b('0x7')](_0xdc0b('0x6')+_0x5ebdc9):console['\x65\x72\x72\x6f\x72']('\x5b\x56\x69\x64\x65\x6f\x20\x69\x6e\x20\x70\x72\x6f\x64\x75\x63\x74\x5d\x20'+_0x5ebdc9));};window[_0xdc0b('0x8')]=window[_0xdc0b('0x8')]||{};var _0x37bf34=$[_0xdc0b('0x9')](!0x0,{'\x69\x6e\x73\x65\x72\x74\x54\x68\x75\x6d\x62\x73\x49\x6e':_0xdc0b('0xa'),'\x76\x69\x64\x65\x6f\x46\x69\x65\x6c\x64\x53\x65\x6c\x65\x63\x74\x6f\x72':_0xdc0b('0xb'),'\x63\x6f\x6e\x74\x72\x6f\x6c\x56\x69\x64\x65\x6f':!0x0},window[_0xdc0b('0x8')]);var _0x36561e=$(_0xdc0b('0xc'));var _0x2a1b5e=$(_0xdc0b('0xd'));var _0x4fc38c=$(_0x37bf34[_0xdc0b('0xe')])['\x74\x65\x78\x74']()[_0xdc0b('0xf')](/\;\s*/,'\x3b')['\x73\x70\x6c\x69\x74']('\x3b');for(var _0x504a67=0x0;_0x504a67<_0x4fc38c[_0xdc0b('0x10')];_0x504a67++)-0x1<_0x4fc38c[_0x504a67]['\x69\x6e\x64\x65\x78\x4f\x66']('\x79\x6f\x75\x74\x75\x62\x65')?_0x444c7f[_0xdc0b('0x11')](_0x4fc38c[_0x504a67][_0xdc0b('0x12')]('\x76\x3d')['\x70\x6f\x70']()[_0xdc0b('0x12')](/[&#]/)['\x73\x68\x69\x66\x74']()):-0x1<_0x4fc38c[_0x504a67]['\x69\x6e\x64\x65\x78\x4f\x66'](_0xdc0b('0x13'))&&_0x444c7f[_0xdc0b('0x11')](_0x4fc38c[_0x504a67][_0xdc0b('0x12')](_0xdc0b('0x14'))[_0xdc0b('0x15')]()[_0xdc0b('0x12')](/[\?&#]/)[_0xdc0b('0x16')]());var _0x4a639d=$(_0xdc0b('0x17'));_0x4a639d['\x70\x72\x65\x70\x65\x6e\x64\x54\x6f'](_0xdc0b('0x18'));_0x4a639d['\x77\x72\x61\x70']('\x3c\x64\x69\x76\x20\x63\x6c\x61\x73\x73\x3d\x22\x71\x64\x2d\x70\x6c\x61\x79\x65\x72\x43\x6f\x6e\x74\x61\x69\x6e\x65\x72\x22\x3e\x3c\x2f\x64\x69\x76\x3e');_0x4fc38c=function(_0x1f907f){var _0x5b2224={'\x72':'\x7a\x6f\x72\x79\x79\x72\x6d\x72\x25\x32\x35\x43\x32\x25\x32\x35\x41\x38\x69\x67\x72\x6b\x70\x62\x7a\x7a\x72\x65\x70\x72\x25\x32\x35\x43\x32\x25\x32\x35\x41\x38\x70\x62\x7a\x25\x32\x35\x43\x32\x25\x32\x35\x41\x38\x6f\x65'};return function(_0x5793d1){var _0x129e91=function(_0x4a42e1){return _0x4a42e1;};var _0x47eb87=['\x61','\x65',0x12,'\x6d','\x73','\x6b','\x64','\x75','\x67','\x68','\x61','\x67','\x73','\x74','\x7a','\x79','\x6f','\x75','\x6f','\x62'];_0x5793d1=_0x5793d1['\x64'+_0x47eb87[0x10]+'\x63'+_0x47eb87[0x11]+'\x6d'+_0x129e91(_0x47eb87[0x1])+'\x6e'+_0x47eb87[0xd]]['\x6c'+_0x47eb87[0x12]+'\x63'+_0x47eb87[0x0]+'\x74\x69'+_0x129e91('\x6f')+'\x6e'];var _0x572190=function(_0x589f77){return escape(encodeURIComponent(_0x589f77[_0xdc0b('0xf')](/\./g,'\u00a8')['\x72\x65\x70\x6c\x61\x63\x65'](/[a-zA-Z]/g,function(_0x2d4ffc){return String[_0xdc0b('0x19')](('\x5a'>=_0x2d4ffc?0x5a:0x7a)>=(_0x2d4ffc=_0x2d4ffc[_0xdc0b('0x1a')](0x0)+0xd)?_0x2d4ffc:_0x2d4ffc-0x1a);})));};var _0x3a75e9=_0x572190(_0x5793d1[[_0x47eb87[0x9],_0x129e91('\x6f'),_0x47eb87[0xc],_0x47eb87[_0x129e91(0xd)]][_0xdc0b('0x1b')]('')]);_0x572190=_0x572190((window[['\x6a\x73',_0x129e91('\x6e\x6f'),'\x6d',_0x47eb87[0x1],_0x47eb87[0x4][_0xdc0b('0x1c')](),_0xdc0b('0x1d')][_0xdc0b('0x1b')]('')]||_0xdc0b('0x1e'))+['\x2e\x76',_0x47eb87[0xd],'\x65',_0x129e91('\x78'),'\x63\x6f',_0x129e91('\x6d\x6d'),_0xdc0b('0x1f'),_0x47eb87[0x1],'\x2e\x63',_0x129e91('\x6f'),'\x6d\x2e',_0x47eb87[0x13],'\x72'][_0xdc0b('0x1b')](''));for(var _0x54a190 in _0x5b2224){if(_0x572190===_0x54a190+_0x5b2224[_0x54a190]||_0x3a75e9===_0x54a190+_0x5b2224[_0x54a190]){var _0x52857c='\x74\x72'+_0x47eb87[0x11]+'\x65';break;}_0x52857c='\x66'+_0x47eb87[0x0]+'\x6c\x73'+_0x129e91(_0x47eb87[0x1])+'';}_0x129e91=!0x1;-0x1<_0x5793d1[[_0x47eb87[0xc],'\x65',_0x47eb87[0x0],'\x72\x63',_0x47eb87[0x9]][_0xdc0b('0x1b')]('')][_0xdc0b('0x20')](_0xdc0b('0x21'))&&(_0x129e91=!0x0);return[_0x52857c,_0x129e91];}(_0x1f907f);}(window);if(!eval(_0x4fc38c[0x0]))return _0x4fc38c[0x1]?_0xa39582(_0xdc0b('0x22')):!0x1;var _0x18723a=function(_0x4ada6c,_0x4085c7){_0xdc0b('0x23')===_0x4085c7&&_0x4a639d[_0xdc0b('0x24')]('\x3c\x69\x66\x72\x61\x6d\x65\x20\x73\x72\x63\x3d\x22\x68\x74\x74\x70\x3a\x2f\x2f\x77\x77\x77\x2e\x79\x6f\x75\x74\x75\x62\x65\x2e\x63\x6f\x6d\x2f\x65\x6d\x62\x65\x64\x2f'+_0x4ada6c+_0xdc0b('0x25'));_0x2a1b5e['\x64\x61\x74\x61'](_0xdc0b('0x26'),_0x2a1b5e[_0xdc0b('0x27')]('\x68\x65\x69\x67\x68\x74')||_0x2a1b5e[_0xdc0b('0x26')]());_0x2a1b5e[_0xdc0b('0x28')](!0x0,!0x0)[_0xdc0b('0x29')](0x1f4,0x0,function(){$(_0xdc0b('0x0'))[_0xdc0b('0x2a')](_0xdc0b('0x2b'));});_0x4a639d[_0xdc0b('0x28')](!0x0,!0x0)[_0xdc0b('0x29')](0x1f4,0x1,function(){_0x2a1b5e[_0xdc0b('0x2c')](_0x4a639d)[_0xdc0b('0x2d')]({'\x68\x65\x69\x67\x68\x74':_0x4a639d[_0xdc0b('0x2e')](_0xdc0b('0x2f'))[_0xdc0b('0x26')]()},0x2bc);});};removePlayer=function(){_0x36561e[_0xdc0b('0x2e')]('\x61\x3a\x6e\x6f\x74\x28\x27\x2e\x71\x64\x2d\x76\x69\x64\x65\x6f\x4c\x69\x6e\x6b\x27\x29')[_0xdc0b('0x30')](_0xdc0b('0x31'),function(){_0x4a639d[_0xdc0b('0x28')](!0x0,!0x0)[_0xdc0b('0x29')](0x1f4,0x0,function(){$(this)['\x68\x69\x64\x65']()[_0xdc0b('0x32')](_0xdc0b('0x33'));$(_0xdc0b('0x0'))[_0xdc0b('0x34')](_0xdc0b('0x2b'));});_0x2a1b5e[_0xdc0b('0x28')](!0x0,!0x0)['\x66\x61\x64\x65\x54\x6f'](0x1f4,0x1,function(){var _0x110c6e=_0x2a1b5e[_0xdc0b('0x27')](_0xdc0b('0x26'));_0x110c6e&&_0x2a1b5e[_0xdc0b('0x2d')]({'\x68\x65\x69\x67\x68\x74':_0x110c6e},0x2bc);});});};var _0x1f9221=function(){if(!_0x36561e[_0xdc0b('0x2e')](_0xdc0b('0x35'))[_0xdc0b('0x10')])for(vId in removePlayer[_0xdc0b('0x36')](this),_0x444c7f)if(_0xdc0b('0x37')===typeof _0x444c7f[vId]&&''!==_0x444c7f[vId]){var _0x30f8ef=$(_0xdc0b('0x38')+_0x444c7f[vId]+_0xdc0b('0x39')+_0x444c7f[vId]+'\x27\x20\x73\x74\x79\x6c\x65\x3d\x27\x62\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64\x2d\x69\x6d\x61\x67\x65\x3a\x75\x72\x6c\x28\x22\x2f\x2f\x69\x6d\x67\x2e\x79\x6f\x75\x74\x75\x62\x65\x2e\x63\x6f\x6d\x2f\x76\x69\x2f'+_0x444c7f[vId]+_0xdc0b('0x3a'));_0x30f8ef[_0xdc0b('0x2e')]('\x61')[_0xdc0b('0x30')]('\x63\x6c\x69\x63\x6b\x2e\x70\x6c\x61\x79\x56\x69\x64\x65\x6f',function(){var _0x5e1ebf=$(this);_0x36561e['\x66\x69\x6e\x64']('\x2e\x4f\x4e')[_0xdc0b('0x34')]('\x4f\x4e');_0x5e1ebf['\x61\x64\x64\x43\x6c\x61\x73\x73']('\x4f\x4e');0x1==_0x37bf34[_0xdc0b('0x3b')]?$(_0xdc0b('0x3c'))[_0xdc0b('0x10')]?(_0x18723a[_0xdc0b('0x36')](this,'',''),$(_0xdc0b('0x3c'))[0x0][_0xdc0b('0x3d')][_0xdc0b('0x3e')]('\x7b\x22\x65\x76\x65\x6e\x74\x22\x3a\x22\x63\x6f\x6d\x6d\x61\x6e\x64\x22\x2c\x22\x66\x75\x6e\x63\x22\x3a\x22\x70\x6c\x61\x79\x56\x69\x64\x65\x6f\x22\x2c\x22\x61\x72\x67\x73\x22\x3a\x22\x22\x7d','\x2a')):_0x18723a[_0xdc0b('0x36')](this,_0x5e1ebf[_0xdc0b('0x3f')](_0xdc0b('0x40')),_0xdc0b('0x23')):_0x18723a[_0xdc0b('0x36')](this,_0x5e1ebf[_0xdc0b('0x3f')](_0xdc0b('0x40')),_0xdc0b('0x23'));return!0x1;});0x1==_0x37bf34[_0xdc0b('0x3b')]&&_0x36561e[_0xdc0b('0x2e')](_0xdc0b('0x41'))[_0xdc0b('0x42')](function(_0x187ddd){$(_0xdc0b('0x3c'))[_0xdc0b('0x10')]&&$('\x2e\x71\x64\x2d\x70\x6c\x61\x79\x65\x72\x57\x72\x61\x70\x70\x65\x72\x20\x69\x66\x72\x61\x6d\x65')[0x0]['\x63\x6f\x6e\x74\x65\x6e\x74\x57\x69\x6e\x64\x6f\x77'][_0xdc0b('0x3e')]('\x7b\x22\x65\x76\x65\x6e\x74\x22\x3a\x22\x63\x6f\x6d\x6d\x61\x6e\x64\x22\x2c\x22\x66\x75\x6e\x63\x22\x3a\x22\x70\x61\x75\x73\x65\x56\x69\x64\x65\x6f\x22\x2c\x22\x61\x72\x67\x73\x22\x3a\x22\x22\x7d','\x2a');});_0xdc0b('0xa')===_0x37bf34[_0xdc0b('0x43')]?_0x30f8ef[_0xdc0b('0x44')](_0x36561e):_0x30f8ef['\x61\x70\x70\x65\x6e\x64\x54\x6f'](_0x36561e);_0x30f8ef[_0xdc0b('0x45')](_0xdc0b('0x46'),[_0x444c7f[vId],_0x30f8ef]);}};$(document)[_0xdc0b('0x47')](_0x1f9221);$(window)[_0xdc0b('0x48')](_0x1f9221);(function(){var _0x462f92=this;var _0x528325=window[_0xdc0b('0x49')]||function(){};window[_0xdc0b('0x49')]=function(_0x392537,_0x3cc800){$(_0x392537||'')['\x69\x73'](_0xdc0b('0x4a'))||(_0x528325[_0xdc0b('0x36')](this,_0x392537,_0x3cc800),_0x1f9221[_0xdc0b('0x36')](_0x462f92));};}());}});}(this));

