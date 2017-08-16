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
		},
		ajaxStop: function() {
			Common.appendSkuPopUpCloseBtn();
		},
		windowOnload: function() {
			Common.facebookLikebox();
			Common.saveAmountFix();
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
			var wrapper = $('.slider-qd-v1-full');
			
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
			
			var mobileDotsWrapper = $('.slider-qd-v1-full-mobile .slick-dots');
			mobileDotsWrapper.on('init', function(event, slick){
				$(this).find('.slick-current').addClass('slick-active');
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
							slidesToShow: 2,
							slidesToScroll: 2
						}
					}
				]
			});
		},
		homeSpecialLinksToggle:function() {	
			$('.home-qd-v1-special-links ul[itemscope="itemscope"] >li:first-child').click(function() {
				$(this).toggleClass('qd-special-links-on');				
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
			});
		},		
	};

	var Search = {
		init: function() {
			Search.hideExtendedMenu();
			Search.openFiltersMenu();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
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
			// Roda slick das thumbs quando volta para estado inicial
			$(window).on('skuSelectable.vtex', Product.applyCarouselThumb);

			Product.applySmartPrice();	
			
			// Apenas para tela de KIT
			if( $("body").is(".product-kit") ){
				Product.showKitItem();
				Product.itemSelected();
				Product.setBuyUrl();
				Product.skuItemClick();
				Product.dustRenderCallback();
				Product.unavailableCheck();
				Product.vtexSkuSelected();
				Product.showKitDescription();
				Product.showKitImage();
			};
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

  				slidesToShow: 3,
  				arrows: false,
				infinite: false,
				draggable: false,
				swipeToSlide: true,
				edgeFriction: .1,
				variableWidth: true
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
			window.qdVideoInProduct = {videoFieldSelector: 'td.value-field.Videos:first'};
			var iframe = $("td.value-field.Video-Descricao-do-Produto:first iframe");

			if (!iframe.length) {
				window.qdVideoInProduct = {videoFieldSelector: 'td.value-field.Video:first'};
				return;
			}

			window.qdVideoInProduct = {videoFieldSelector: $('<span/>').addClass('video-product').text('https://www.youtube.com/watch?v=' + iframe.attr("src").split("?").shift().split("/").pop() + '&rel=0')};
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
			$(".kit-item-row").each(function () {
				if ($(this).find("#image-main").length) {
					$(this).show();
				}
			});
		},
		itemSelected: function () {
			$(".kit-item-select").find("p").bind("click", function () {
				$(this).parents(".kit-item-row").toggleClass("qd-state-not-selected");
			});
		},
		setBuyUrl: function () {
			var btns = $(".kit-item-row:not('.qd-state-not-selected, .qd-item-unavailable') .buy-in-page-button");
			var i = 0;
			var uri = [];
			btns.each(function () {
				var href = $(this).attr("href") || "";

				if (href === "" || href.indexOf("lert(") > -1)
					return false;

				var param = href.split("?").pop().split("#").shift().split("&");
				var itemUri = [];
				for (var k in param) {
					if (typeof param[k] === "function" || param[k].search(/^(sku|qty|seller)/i) < 0)
						continue;
					itemUri.push(param[k]);
				}
				uri.push(itemUri.join("&"));

				i++;
			});

			if (i === btns.length)
				$(".product-buy-button a").attr("href", "/checkout/cart/add?" + uri.join("&") + "&" + (btns.first().attr("href").match(/sc=[0-9]+/i) || [""])[0]);
		},
		skuItemClick: function () {
			$(".kit-item-row").bind("click", function () {
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
			$(".kit-item-row").each(function () {
				var $t = $(this);
				if ($t.find(".sku-notifyme:visible").length)
					$t.addClass("qd-item-unavailable");
				else
					$t.removeClass("qd-item-unavailable");
			});
		},
		vtexSkuSelected: function () {
			$(window).bind("skuSelected", function () {
				Product.setBuyUrl();
			});
		},
		showKitDescription: function () {
			$(".product-kit-link a").bind("click", function () {
				$('html, body').animate({
					scrollTop:
					Math.floor($(".product-description-list-wrapper .productName:contains('" +
						$(this).parents(".kit-item-row").find(".productName").text()
						+ "')").offset().top || 0)
				});

				return false;
			})
		},
		showKitImage: function () {
			$(".product-kit-zoom a, .product-kit-image").bind("click", function () {
				if (typeof window.FireSkuChangeImage === "function")
					window.FireSkuChangeImage(($(this).parents(".kit-item-row").find("#___rc-p-sku-ids").val() || "").split(",").shift());

				$('html, body').animate({ scrollTop: Math.floor($(".bread-crumb").offset().top || 0) });

				return false;
			});

			$(".product-picture").bind("click", function () {
				if (typeof window.FireSkuChangeImage === "function")
					window.FireSkuChangeImage(($(".qd-product-name-wrapper #___rc-p-sku-ids").val() || "").split(",").shift());

				$('html, body').animate({ scrollTop: Math.floor($(".bread-crumb").offset().top || 0) });

				return false;
			});
		}
	};

	var List = {
		run: function() {},
		init: function() {},
		ajaxStop: function() {},
		windowOnload: function() {}
	};

	var Institutional = {
		init: function() {},
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
var _0xefca=['.qd_productPrice','val','Por\x20alguma\x20razão\x20não\x20consegui\x20obter\x20o\x20preço\x20deste\x20produto\x20:(','appliedDiscount','listPrice','changeNativePrice','qd-sp-active','.qd_displayPrice','skuPrice','html','installments','installmentValue','.qd_sp_display_installmentValue','.qd_sp_installments','.qd_saveAmount','.qd_saveAmountPercent','prepend','changeNativeSaveAmount','em.economia-de','each','skuSelected.vtex','qd_sp_processedItem','startedByWrapper','flagElement','call','forcePromotion','string','closest','not','.qd_sp_processedItem','style','display:none\x20!important;','append','after','extend','boolean','body','prototype','trim','replace','abs','undefined','pow','round','toFixed','split','length','join','QD_SmartPrice','function','object','info','warn','unshift','alerta','aviso','toLowerCase','apply','error','text','search','match','[class*=\x27desconto\x27]','auto','.productRightColumn','strong.skuBestPrice','label.skuBestInstallmentNumber','label.skuBestInstallmentValue','strong.skuPrice','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','productPage','isProductPage','wrapperElement','filterFlagBy','find','skuBestPrice','addClass','qd-active','.qd_sp_on,\x20.qd_sp_ignored','.qd_active','removeClass','.qd_sp_on','qd_sp_ignored','qd_sp_on','isDiscountFlag','div[skuCorrente]:first','attr','skuCorrente','skus','sku','available','bestPrice','getDiscountValue','O\x20valor\x20informado\x20p/\x20o\x20desconto\x20não\x20é\x20um\x20número.'];(function(_0x3dd15e,_0x1f0015){var _0x231fd0=function(_0x4f680a){while(--_0x4f680a){_0x3dd15e['push'](_0x3dd15e['shift']());}};_0x231fd0(++_0x1f0015);}(_0xefca,0xe7));var _0xaefc=function(_0x22663b,_0xc8c6e3){_0x22663b=_0x22663b-0x0;var _0x310d0a=_0xefca[_0x22663b];return _0x310d0a;};'function'!==typeof String[_0xaefc('0x0')][_0xaefc('0x1')]&&(String[_0xaefc('0x0')]['trim']=function(){return this[_0xaefc('0x2')](/^\s+|\s+$/g,'');});function qd_number_format(_0x910d95,_0x48a573,_0x161968,_0x146239){_0x910d95=(_0x910d95+'')[_0xaefc('0x2')](/[^0-9+\-Ee.]/g,'');_0x910d95=isFinite(+_0x910d95)?+_0x910d95:0x0;_0x48a573=isFinite(+_0x48a573)?Math[_0xaefc('0x3')](_0x48a573):0x0;_0x146239=_0xaefc('0x4')===typeof _0x146239?',':_0x146239;_0x161968='undefined'===typeof _0x161968?'.':_0x161968;var _0x4b0c33='',_0x4b0c33=function(_0x1013cb,_0x50c0fd){var _0x48a573=Math[_0xaefc('0x5')](0xa,_0x50c0fd);return''+(Math[_0xaefc('0x6')](_0x1013cb*_0x48a573)/_0x48a573)[_0xaefc('0x7')](_0x50c0fd);},_0x4b0c33=(_0x48a573?_0x4b0c33(_0x910d95,_0x48a573):''+Math['round'](_0x910d95))[_0xaefc('0x8')]('.');0x3<_0x4b0c33[0x0]['length']&&(_0x4b0c33[0x0]=_0x4b0c33[0x0][_0xaefc('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x146239));(_0x4b0c33[0x1]||'')[_0xaefc('0x9')]<_0x48a573&&(_0x4b0c33[0x1]=_0x4b0c33[0x1]||'',_0x4b0c33[0x1]+=Array(_0x48a573-_0x4b0c33[0x1]['length']+0x1)[_0xaefc('0xa')]('0'));return _0x4b0c33[_0xaefc('0xa')](_0x161968);};(function(_0x2b1a6c){'use strict';var _0x52dbc1=jQuery;if(typeof _0x52dbc1['fn'][_0xaefc('0xb')]===_0xaefc('0xc'))return;var _0x187b41='Smart\x20Price';var _0x17330c=function(_0x5d8321,_0xfc152b){if(_0xaefc('0xd')===typeof console&&_0xaefc('0xc')===typeof console['error']&&'function'===typeof console[_0xaefc('0xe')]&&'function'===typeof console[_0xaefc('0xf')]){var _0x193927;_0xaefc('0xd')===typeof _0x5d8321?(_0x5d8321[_0xaefc('0x10')]('['+_0x187b41+']\x0a'),_0x193927=_0x5d8321):_0x193927=['['+_0x187b41+']\x0a'+_0x5d8321];if(_0xaefc('0x4')===typeof _0xfc152b||_0xaefc('0x11')!==_0xfc152b['toLowerCase']()&&_0xaefc('0x12')!==_0xfc152b[_0xaefc('0x13')]())if(_0xaefc('0x4')!==typeof _0xfc152b&&_0xaefc('0xe')===_0xfc152b[_0xaefc('0x13')]())try{console[_0xaefc('0xe')][_0xaefc('0x14')](console,_0x193927);}catch(_0x40f174){console[_0xaefc('0xe')](_0x193927[_0xaefc('0xa')]('\x0a'));}else try{console[_0xaefc('0x15')][_0xaefc('0x14')](console,_0x193927);}catch(_0x20e539){console[_0xaefc('0x15')](_0x193927['join']('\x0a'));}else try{console[_0xaefc('0xf')][_0xaefc('0x14')](console,_0x193927);}catch(_0x25f14e){console[_0xaefc('0xf')](_0x193927[_0xaefc('0xa')]('\x0a'));}}};var _0x54ea83=/[0-9]+\%/i;var _0x1d31bb=/[0-9\.]+(?=\%)/i;var _0x7f3ebe={'isDiscountFlag':function(_0x1d6216){if(_0x1d6216[_0xaefc('0x16')]()[_0xaefc('0x17')](_0x54ea83)>-0x1)return!![];return![];},'getDiscountValue':function(_0x3b8de8){return _0x3b8de8['text']()[_0xaefc('0x18')](_0x1d31bb);},'startedByWrapper':![],'flagElement':'.flag','wrapperElement':'li','filterFlagBy':_0xaefc('0x19'),'forcePromotion':null,'appliedDiscount':null,'oneFlagByItem':!![],'isSmartCheckout':!![],'changeInstallments':![],'productPage':{'changeNativeSaveAmount':!![],'changeNativePrice':!![],'changeInstallments':![],'isProductPage':_0xaefc('0x1a'),'wrapperElement':_0xaefc('0x1b'),'skuBestPrice':_0xaefc('0x1c'),'installments':_0xaefc('0x1d'),'installmentValue':_0xaefc('0x1e'),'skuPrice':_0xaefc('0x1f')}};_0x52dbc1['fn'][_0xaefc('0xb')]=function(){};var _0x35bbaa=function(_0x3435b2){var _0x48c510={'t':_0xaefc('0x20')};return function(_0x9c9ea){var _0x2d4626,_0x2d914e,_0x355cc7,_0xe58081;_0x2d914e=function(_0x4fa886){return _0x4fa886;};_0x355cc7=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x9c9ea=_0x9c9ea['d'+_0x355cc7[0x10]+'c'+_0x355cc7[0x11]+'m'+_0x2d914e(_0x355cc7[0x1])+'n'+_0x355cc7[0xd]]['l'+_0x355cc7[0x12]+'c'+_0x355cc7[0x0]+'ti'+_0x2d914e('o')+'n'];_0x2d4626=function(_0x15a2d6){return escape(encodeURIComponent(_0x15a2d6[_0xaefc('0x2')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x2df421){return String['fromCharCode'](('Z'>=_0x2df421?0x5a:0x7a)>=(_0x2df421=_0x2df421['charCodeAt'](0x0)+0xd)?_0x2df421:_0x2df421-0x1a);})));};var _0x3c8411=_0x2d4626(_0x9c9ea[[_0x355cc7[0x9],_0x2d914e('o'),_0x355cc7[0xc],_0x355cc7[_0x2d914e(0xd)]][_0xaefc('0xa')]('')]);_0x2d4626=_0x2d4626((window[['js',_0x2d914e('no'),'m',_0x355cc7[0x1],_0x355cc7[0x4]['toUpperCase'](),'ite'][_0xaefc('0xa')]('')]||'---')+['.v',_0x355cc7[0xd],'e',_0x2d914e('x'),'co',_0x2d914e('mm'),'erc',_0x355cc7[0x1],'.c',_0x2d914e('o'),'m.',_0x355cc7[0x13],'r'][_0xaefc('0xa')](''));for(var _0x3afdb1 in _0x48c510){if(_0x2d4626===_0x3afdb1+_0x48c510[_0x3afdb1]||_0x3c8411===_0x3afdb1+_0x48c510[_0x3afdb1]){_0xe58081='tr'+_0x355cc7[0x11]+'e';break;}_0xe58081='f'+_0x355cc7[0x0]+'ls'+_0x2d914e(_0x355cc7[0x1])+'';}_0x2d914e=!0x1;-0x1<_0x9c9ea[[_0x355cc7[0xc],'e',_0x355cc7[0x0],'rc',_0x355cc7[0x9]]['join']('')][_0xaefc('0x21')](_0xaefc('0x22'))&&(_0x2d914e=!0x0);return[_0xe58081,_0x2d914e];}(_0x3435b2);}(window);if(!eval(_0x35bbaa[0x0]))return _0x35bbaa[0x1]?_0x17330c(_0xaefc('0x23')):!0x1;var _0x31fcbf=function(_0x56250a,_0x4b78d6){'use strict';var _0x258507=function(_0x533d31){'use strict';var _0x4107a9,_0x397a52,_0x588794,_0x11ef22,_0x149e4a,_0x2ea3a7,_0x40f691,_0x26cf4c,_0x56fc45,_0x89fcbb,_0x19bc60,_0x27a881,_0x3cece0,_0x398dc1,_0x71b06,_0x496c8b,_0x13f177,_0x300d80,_0x4446b7;var _0x40be26=_0x52dbc1(this);_0x533d31=typeof _0x533d31===_0xaefc('0x4')?![]:_0x533d31;if(_0x4b78d6[_0xaefc('0x24')][_0xaefc('0x25')])var _0x49b6c3=_0x40be26['closest'](_0x4b78d6[_0xaefc('0x24')][_0xaefc('0x26')]);else var _0x49b6c3=_0x40be26['closest'](_0x4b78d6[_0xaefc('0x26')]);if(!_0x533d31&&!_0x40be26['is'](_0x4b78d6[_0xaefc('0x27')])){if(_0x4b78d6[_0xaefc('0x24')][_0xaefc('0x25')]&&_0x49b6c3['is'](_0x4b78d6[_0xaefc('0x24')][_0xaefc('0x26')])){_0x49b6c3[_0xaefc('0x28')](_0x4b78d6['productPage'][_0xaefc('0x29')])[_0xaefc('0x2a')](_0xaefc('0x2b'));_0x49b6c3[_0xaefc('0x2a')]('qd-sp-active');}return;}var _0x1b2d9d=_0x4b78d6[_0xaefc('0x24')][_0xaefc('0x25')];if(_0x40be26['is'](_0xaefc('0x2c'))&&!_0x1b2d9d)return;if(_0x1b2d9d){_0x26cf4c=_0x49b6c3[_0xaefc('0x28')](_0x4b78d6[_0xaefc('0x24')][_0xaefc('0x29')]);if(_0x26cf4c[_0xaefc('0x28')](_0xaefc('0x2d'))[_0xaefc('0x9')])return;_0x26cf4c[_0xaefc('0x2e')](_0xaefc('0x2b'));_0x49b6c3[_0xaefc('0x2e')]('qd-sp-active');}if(_0x4b78d6['oneFlagByItem']&&_0x40be26['siblings'](_0xaefc('0x2f'))[_0xaefc('0x9')]){_0x40be26[_0xaefc('0x2a')](_0xaefc('0x30'));return;}_0x40be26['addClass'](_0xaefc('0x31'));if(!_0x4b78d6[_0xaefc('0x32')](_0x40be26))return;if(_0x1b2d9d){_0x588794={};var _0x4ed101=parseInt(_0x52dbc1(_0xaefc('0x33'))[_0xaefc('0x34')](_0xaefc('0x35')),0xa);if(_0x4ed101){for(var _0x574f9a=0x0;_0x574f9a<skuJson['skus']['length'];_0x574f9a++){if(skuJson[_0xaefc('0x36')][_0x574f9a][_0xaefc('0x37')]==_0x4ed101){_0x588794=skuJson[_0xaefc('0x36')][_0x574f9a];break;}}}else{var _0x2f8fdf=0x5af3107a3fff;for(var _0x53bed8 in skuJson[_0xaefc('0x36')]){if(typeof skuJson[_0xaefc('0x36')][_0x53bed8]===_0xaefc('0xc'))continue;if(!skuJson[_0xaefc('0x36')][_0x53bed8][_0xaefc('0x38')])continue;if(skuJson[_0xaefc('0x36')][_0x53bed8][_0xaefc('0x39')]<_0x2f8fdf){_0x2f8fdf=skuJson[_0xaefc('0x36')][_0x53bed8][_0xaefc('0x39')];_0x588794=skuJson[_0xaefc('0x36')][_0x53bed8];}}}}_0x496c8b=!![];_0x13f177=0x0;if(_0x4b78d6['isSmartCheckout']&&_0x300d80){_0x496c8b=skuJson[_0xaefc('0x38')];if(!_0x496c8b)return _0x49b6c3[_0xaefc('0x2a')]('qd-sp-product-unavailable');}_0x397a52=_0x4b78d6[_0xaefc('0x3a')](_0x40be26);_0x4107a9=parseFloat(_0x397a52,0xa);if(isNaN(_0x4107a9))return _0x17330c([_0xaefc('0x3b'),_0x40be26],_0xaefc('0x11'));var _0x4f7204=function(_0x185995){if(_0x1b2d9d)_0x11ef22=(_0x185995[_0xaefc('0x39')]||0x0)/0x64;else{_0x3cece0=_0x49b6c3[_0xaefc('0x28')](_0xaefc('0x3c'));_0x11ef22=parseFloat((_0x3cece0[_0xaefc('0x3d')]()||'')[_0xaefc('0x2')](/[^0-9\.\,]+/i,'')[_0xaefc('0x2')]('.','')[_0xaefc('0x2')](',','.'),0xa);}if(isNaN(_0x11ef22))return _0x17330c([_0xaefc('0x3e'),_0x40be26,_0x49b6c3]);if(_0x4b78d6[_0xaefc('0x3f')]!==null){_0x398dc1=0x0;if(!isNaN(_0x4b78d6[_0xaefc('0x3f')]))_0x398dc1=_0x4b78d6['appliedDiscount'];else{_0x71b06=_0x49b6c3[_0xaefc('0x28')](_0x4b78d6[_0xaefc('0x3f')]);if(_0x71b06[_0xaefc('0x9')])_0x398dc1=_0x4b78d6['getDiscountValue'](_0x71b06);}_0x398dc1=parseFloat(_0x398dc1,0xa);if(isNaN(_0x398dc1))_0x398dc1=0x0;if(_0x398dc1!==0x0)_0x11ef22=_0x11ef22*0x64/(0x64-_0x398dc1);}if(_0x1b2d9d)_0x149e4a=(_0x185995[_0xaefc('0x40')]||0x0)/0x64;else _0x149e4a=parseFloat((_0x49b6c3[_0xaefc('0x28')]('.qd_productOldPrice')[_0xaefc('0x3d')]()||'')[_0xaefc('0x2')](/[^0-9\.\,]+/i,'')['replace']('.','')[_0xaefc('0x2')](',','.'),0xa);if(isNaN(_0x149e4a))_0x149e4a=0.001;_0x2ea3a7=_0x11ef22*((0x64-_0x4107a9)/0x64);if(_0x1b2d9d&&_0x4b78d6[_0xaefc('0x24')][_0xaefc('0x41')]){_0x26cf4c[_0xaefc('0x16')](_0x26cf4c[_0xaefc('0x16')]()['trim']()[_0xaefc('0x2')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x2ea3a7,0x2,',','.')))[_0xaefc('0x2a')]('qd-active');_0x49b6c3[_0xaefc('0x2a')](_0xaefc('0x42'));}else{_0x4446b7=_0x49b6c3[_0xaefc('0x28')](_0xaefc('0x43'));_0x4446b7[_0xaefc('0x16')](_0x4446b7[_0xaefc('0x16')]()[_0xaefc('0x2')](/[0-9\.]+,[0-9]+/i,'')+qd_number_format(_0x2ea3a7,0x2,',','.'));}if(_0x1b2d9d){_0x40f691=_0x49b6c3['find'](_0x4b78d6[_0xaefc('0x24')][_0xaefc('0x44')]);if(_0x40f691[_0xaefc('0x9')])_0x40f691[_0xaefc('0x16')](_0x40f691[_0xaefc('0x16')]()[_0xaefc('0x1')]()[_0xaefc('0x2')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x2ea3a7,0x2,',','.')));}var _0x24996a=_0x49b6c3[_0xaefc('0x28')]('.qd-sp-display-discount');_0x24996a[_0xaefc('0x16')](_0x24996a['text']()['replace'](/[0-9]+\%/i,_0x4107a9+'%'));var _0x4829bf=function(_0x456579,_0x1d170e,_0x2df0d2){var _0x12c0a5=_0x49b6c3['find'](_0x456579);if(_0x12c0a5[_0xaefc('0x9')])_0x12c0a5['html'](_0x12c0a5[_0xaefc('0x45')]()[_0xaefc('0x1')]()[_0xaefc('0x2')](/[0-9]{1,2}/,_0x2df0d2?_0x2df0d2:_0x185995['installments']||0x0));var _0x17b9e6=_0x49b6c3[_0xaefc('0x28')](_0x1d170e);if(_0x17b9e6[_0xaefc('0x9')])_0x17b9e6[_0xaefc('0x45')](_0x17b9e6[_0xaefc('0x45')]()['trim']()[_0xaefc('0x2')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x2ea3a7/(_0x2df0d2?_0x2df0d2:_0x185995[_0xaefc('0x46')]||0x1),0x2,',','.')));};if(_0x1b2d9d&&_0x4b78d6[_0xaefc('0x24')]['changeInstallments'])_0x4829bf(_0x4b78d6[_0xaefc('0x24')][_0xaefc('0x46')],_0x4b78d6[_0xaefc('0x24')][_0xaefc('0x47')]);else if(_0x4b78d6['changeInstallments'])_0x4829bf('.qd_sp_display_installments',_0xaefc('0x48'),parseInt(_0x49b6c3[_0xaefc('0x28')](_0xaefc('0x49'))[_0xaefc('0x3d')]()||0x1)||0x1);_0x49b6c3[_0xaefc('0x28')](_0xaefc('0x4a'))['append'](qd_number_format(_0x149e4a-_0x2ea3a7,0x2,',','.'));_0x49b6c3[_0xaefc('0x28')](_0xaefc('0x4b'))[_0xaefc('0x4c')](qd_number_format((_0x149e4a-_0x2ea3a7)*0x64/_0x149e4a,0x2,',','.'));if(_0x1b2d9d&&_0x4b78d6[_0xaefc('0x24')][_0xaefc('0x4d')]){_0x52dbc1(_0xaefc('0x4e'))[_0xaefc('0x4f')](function(){_0x19bc60=_0x52dbc1(this);_0x19bc60['text'](_0x19bc60[_0xaefc('0x16')]()[_0xaefc('0x1')]()['replace'](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x149e4a-_0x2ea3a7,0x2,',','.')));_0x19bc60[_0xaefc('0x2a')]('qd-active');});}};_0x4f7204(_0x588794);if(_0x1b2d9d)_0x52dbc1(window)['on'](_0xaefc('0x50'),function(_0x57702a,_0xbe47bf,_0x574d3a){_0x4f7204(_0x574d3a);});_0x49b6c3[_0xaefc('0x2a')](_0xaefc('0x51'));if(!_0x1b2d9d)_0x3cece0['addClass']('qd_sp_processedItem');};(_0x4b78d6[_0xaefc('0x52')]?_0x56250a[_0xaefc('0x28')](_0x4b78d6[_0xaefc('0x53')]):_0x56250a)[_0xaefc('0x4f')](function(){_0x258507[_0xaefc('0x54')](this,![]);});if(typeof _0x4b78d6[_0xaefc('0x55')]==_0xaefc('0x56')){var _0x1a3c5c=_0x4b78d6[_0xaefc('0x52')]?_0x56250a:_0x56250a[_0xaefc('0x57')](_0x4b78d6['wrapperElement']);if(_0x4b78d6['productPage'][_0xaefc('0x25')])_0x1a3c5c=_0x1a3c5c[_0xaefc('0x57')](_0x4b78d6[_0xaefc('0x24')][_0xaefc('0x26')])[_0xaefc('0x58')](_0xaefc('0x59'));else _0x1a3c5c=_0x1a3c5c[_0xaefc('0x28')]('.qd_productPrice:not(.qd_sp_processedItem)');_0x1a3c5c[_0xaefc('0x4f')](function(){var _0x394c2a=_0x52dbc1(_0x4b78d6[_0xaefc('0x55')]);_0x394c2a['attr'](_0xaefc('0x5a'),_0xaefc('0x5b'));if(_0x4b78d6['productPage']['isProductPage'])_0x52dbc1(this)[_0xaefc('0x5c')](_0x394c2a);else _0x52dbc1(this)[_0xaefc('0x5d')](_0x394c2a);_0x258507['call'](_0x394c2a,!![]);});}};_0x52dbc1['fn'][_0xaefc('0xb')]=function(_0xaf549d){var _0x40dec0=_0x52dbc1(this);if(!_0x40dec0['length'])return _0x40dec0;var _0x1c26a8=_0x52dbc1[_0xaefc('0x5e')](!![],{},_0x7f3ebe,_0xaf549d);if(typeof _0x1c26a8['productPage'][_0xaefc('0x25')]!=_0xaefc('0x5f'))_0x1c26a8[_0xaefc('0x24')]['isProductPage']=_0x52dbc1(document[_0xaefc('0x60')])['is']('.produto');_0x31fcbf(_0x40dec0,_0x1c26a8);return _0x40dec0;};}(this));
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
var _0x3fa1=['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','url','\x27\x20falho.','ajaxCallback','call','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','replaceSpecialChars','qd-amazing-menu','>ul','>li','qdAmAddNdx','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','children','qd-am-level-','add','qd-am-','-li','callback','QuatroDigital.am.callback','extend','.qd_amazing_menu_auto','getParent','function','QD_amazingMenu','/qd-amazing-menu','object','undefined','warn','[QD\x20Amazing\x20Menu]\x0a','alerta','aviso','toLowerCase','info','apply','join','error','addClass','first','qd-am-first','last','qd-am-last','replace','charCodeAt','toUpperCase','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','.qd_am_code','filter','.qd-am-banner','length','parent','qd-am-collection-wrapper','qdAjax','html','each','find','img[alt=\x27','data-qdam-value','.box-banner','clone','insertBefore','hide','qd-am-content-loaded','text','attr'];(function(_0x19e35c,_0x29cd1e){var _0x3e1fe8=function(_0x17258b){while(--_0x17258b){_0x19e35c['push'](_0x19e35c['shift']());}};_0x3e1fe8(++_0x29cd1e);}(_0x3fa1,0xf6));var _0x13fa=function(_0x543495,_0x50c78d){_0x543495=_0x543495-0x0;var _0xb772b5=_0x3fa1[_0x543495];return _0xb772b5;};(function(_0xb8934f){_0xb8934f['fn'][_0x13fa('0x0')]=_0xb8934f['fn']['closest'];}(jQuery));(function(_0x4d863c){var _0xffe0ad;var _0x3c7055=jQuery;if(_0x13fa('0x1')!==typeof _0x3c7055['fn'][_0x13fa('0x2')]){var _0x19ef5e={'url':_0x13fa('0x3'),'callback':function(){},'ajaxCallback':function(){}};var _0x55d87b=function(_0xac1e4e,_0x163736){if(_0x13fa('0x4')===typeof console&&_0x13fa('0x5')!==typeof console['error']&&_0x13fa('0x5')!==typeof console['info']&&_0x13fa('0x5')!==typeof console[_0x13fa('0x6')]){var _0x5a2352;_0x13fa('0x4')===typeof _0xac1e4e?(_0xac1e4e['unshift'](_0x13fa('0x7')),_0x5a2352=_0xac1e4e):_0x5a2352=[_0x13fa('0x7')+_0xac1e4e];if(_0x13fa('0x5')===typeof _0x163736||_0x13fa('0x8')!==_0x163736['toLowerCase']()&&_0x13fa('0x9')!==_0x163736[_0x13fa('0xa')]())if(_0x13fa('0x5')!==typeof _0x163736&&_0x13fa('0xb')===_0x163736['toLowerCase']())try{console[_0x13fa('0xb')][_0x13fa('0xc')](console,_0x5a2352);}catch(_0x5a9206){try{console[_0x13fa('0xb')](_0x5a2352[_0x13fa('0xd')]('\x0a'));}catch(_0x5bc925){}}else try{console[_0x13fa('0xe')][_0x13fa('0xc')](console,_0x5a2352);}catch(_0x3fb842){try{console[_0x13fa('0xe')](_0x5a2352['join']('\x0a'));}catch(_0x3a5ca4){}}else try{console[_0x13fa('0x6')][_0x13fa('0xc')](console,_0x5a2352);}catch(_0x3d0c0f){try{console[_0x13fa('0x6')](_0x5a2352[_0x13fa('0xd')]('\x0a'));}catch(_0x54cf8c){}}}};_0x3c7055['fn']['qdAmAddNdx']=function(){var _0x46ffa4=_0x3c7055(this);_0x46ffa4['each'](function(_0x4455f7){_0x3c7055(this)[_0x13fa('0xf')]('qd-am-li-'+_0x4455f7);});_0x46ffa4[_0x13fa('0x10')]()[_0x13fa('0xf')](_0x13fa('0x11'));_0x46ffa4[_0x13fa('0x12')]()[_0x13fa('0xf')](_0x13fa('0x13'));return _0x46ffa4;};_0x3c7055['fn'][_0x13fa('0x2')]=function(){};_0x4d863c=function(_0x5379d1){var _0x22d36f={'t':'nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x29f010){var _0x2f1a46=function(_0x38e832){return _0x38e832;};var _0x381249=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x29f010=_0x29f010['d'+_0x381249[0x10]+'c'+_0x381249[0x11]+'m'+_0x2f1a46(_0x381249[0x1])+'n'+_0x381249[0xd]]['l'+_0x381249[0x12]+'c'+_0x381249[0x0]+'ti'+_0x2f1a46('o')+'n'];var _0x34a46a=function(_0x2d4691){return escape(encodeURIComponent(_0x2d4691['replace'](/\./g,'¨')[_0x13fa('0x14')](/[a-zA-Z]/g,function(_0x29005c){return String['fromCharCode'](('Z'>=_0x29005c?0x5a:0x7a)>=(_0x29005c=_0x29005c[_0x13fa('0x15')](0x0)+0xd)?_0x29005c:_0x29005c-0x1a);})));};var _0x7eb9f=_0x34a46a(_0x29f010[[_0x381249[0x9],_0x2f1a46('o'),_0x381249[0xc],_0x381249[_0x2f1a46(0xd)]]['join']('')]);_0x34a46a=_0x34a46a((window[['js',_0x2f1a46('no'),'m',_0x381249[0x1],_0x381249[0x4][_0x13fa('0x16')](),'ite'][_0x13fa('0xd')]('')]||_0x13fa('0x17'))+['.v',_0x381249[0xd],'e',_0x2f1a46('x'),'co',_0x2f1a46('mm'),_0x13fa('0x18'),_0x381249[0x1],'.c',_0x2f1a46('o'),'m.',_0x381249[0x13],'r']['join'](''));for(var _0x4497ed in _0x22d36f){if(_0x34a46a===_0x4497ed+_0x22d36f[_0x4497ed]||_0x7eb9f===_0x4497ed+_0x22d36f[_0x4497ed]){var _0x565450='tr'+_0x381249[0x11]+'e';break;}_0x565450='f'+_0x381249[0x0]+'ls'+_0x2f1a46(_0x381249[0x1])+'';}_0x2f1a46=!0x1;-0x1<_0x29f010[[_0x381249[0xc],'e',_0x381249[0x0],'rc',_0x381249[0x9]][_0x13fa('0xd')]('')]['indexOf'](_0x13fa('0x19'))&&(_0x2f1a46=!0x0);return[_0x565450,_0x2f1a46];}(_0x5379d1);}(window);if(!eval(_0x4d863c[0x0]))return _0x4d863c[0x1]?_0x55d87b(_0x13fa('0x1a')):!0x1;var _0x1e42c6=function(_0x35bfbf){var _0x519f44=_0x35bfbf['find'](_0x13fa('0x1b'));var _0x3a0f5b=_0x519f44[_0x13fa('0x1c')](_0x13fa('0x1d'));var _0xae6e72=_0x519f44[_0x13fa('0x1c')]('.qd-am-collection');if(_0x3a0f5b[_0x13fa('0x1e')]||_0xae6e72[_0x13fa('0x1e')])_0x3a0f5b['parent']()[_0x13fa('0xf')]('qd-am-banner-wrapper'),_0xae6e72[_0x13fa('0x1f')]()[_0x13fa('0xf')](_0x13fa('0x20')),_0x3c7055[_0x13fa('0x21')]({'url':_0xffe0ad['url'],'dataType':_0x13fa('0x22'),'success':function(_0xd3942d){var _0x438f46=_0x3c7055(_0xd3942d);_0x3a0f5b[_0x13fa('0x23')](function(){var _0xd3942d=_0x3c7055(this);var _0x5a663a=_0x438f46[_0x13fa('0x24')](_0x13fa('0x25')+_0xd3942d['attr'](_0x13fa('0x26'))+'\x27]');_0x5a663a[_0x13fa('0x1e')]&&(_0x5a663a[_0x13fa('0x23')](function(){_0x3c7055(this)[_0x13fa('0x0')](_0x13fa('0x27'))[_0x13fa('0x28')]()[_0x13fa('0x29')](_0xd3942d);}),_0xd3942d[_0x13fa('0x2a')]());})[_0x13fa('0xf')](_0x13fa('0x2b'));_0xae6e72[_0x13fa('0x23')](function(){var _0xd3942d={};var _0x3cb038=_0x3c7055(this);_0x438f46[_0x13fa('0x24')]('h2')[_0x13fa('0x23')](function(){if(_0x3c7055(this)[_0x13fa('0x2c')]()['trim']()[_0x13fa('0xa')]()==_0x3cb038[_0x13fa('0x2d')](_0x13fa('0x26'))['trim']()['toLowerCase']())return _0xd3942d=_0x3c7055(this),!0x1;});_0xd3942d[_0x13fa('0x1e')]&&(_0xd3942d['each'](function(){_0x3c7055(this)[_0x13fa('0x0')]('[class*=\x27colunas\x27]')[_0x13fa('0x28')]()[_0x13fa('0x29')](_0x3cb038);}),_0x3cb038[_0x13fa('0x2a')]());})['addClass'](_0x13fa('0x2b'));},'error':function(){_0x55d87b(_0x13fa('0x2e')+_0xffe0ad[_0x13fa('0x2f')]+_0x13fa('0x30'));},'complete':function(){_0xffe0ad[_0x13fa('0x31')][_0x13fa('0x32')](this);_0x3c7055(window)['trigger'](_0x13fa('0x33'),_0x35bfbf);},'clearQueueDelay':0xbb8});};_0x3c7055[_0x13fa('0x2')]=function(_0x2449bd){var _0x5dec8b=_0x2449bd[_0x13fa('0x24')](_0x13fa('0x34'))[_0x13fa('0x23')](function(){var _0x133067=_0x3c7055(this);if(!_0x133067[_0x13fa('0x1e')])return _0x55d87b([_0x13fa('0x35'),_0x2449bd],'alerta');_0x133067[_0x13fa('0x24')](_0x13fa('0x36'))['parent']()['addClass'](_0x13fa('0x37'));_0x133067['find']('li')[_0x13fa('0x23')](function(){var _0x2a7dbc=_0x3c7055(this);var _0x69bd0e=_0x2a7dbc['children'](':not(ul)');_0x69bd0e[_0x13fa('0x1e')]&&_0x2a7dbc[_0x13fa('0xf')]('qd-am-elem-'+_0x69bd0e['first']()[_0x13fa('0x2c')]()['trim']()[_0x13fa('0x38')]()['replace'](/\./g,'')[_0x13fa('0x14')](/\s/g,'-')[_0x13fa('0xa')]());});var _0x2f2459=_0x133067[_0x13fa('0x24')]('>li')['qdAmAddNdx']();_0x133067[_0x13fa('0xf')](_0x13fa('0x39'));_0x2f2459=_0x2f2459[_0x13fa('0x24')](_0x13fa('0x3a'));_0x2f2459['each'](function(){var _0x334b7e=_0x3c7055(this);_0x334b7e[_0x13fa('0x24')](_0x13fa('0x3b'))[_0x13fa('0x3c')]()['addClass'](_0x13fa('0x3d'));_0x334b7e[_0x13fa('0xf')](_0x13fa('0x3e'));_0x334b7e[_0x13fa('0x1f')]()['addClass']('qd-am-dropdown');});_0x2f2459[_0x13fa('0xf')](_0x13fa('0x3f'));var _0x170cd3=0x0,_0x4d863c=function(_0x2bc170){_0x170cd3+=0x1;_0x2bc170=_0x2bc170[_0x13fa('0x40')]('li')[_0x13fa('0x40')]('*');_0x2bc170[_0x13fa('0x1e')]&&(_0x2bc170[_0x13fa('0xf')](_0x13fa('0x41')+_0x170cd3),_0x4d863c(_0x2bc170));};_0x4d863c(_0x133067);_0x133067[_0x13fa('0x42')](_0x133067[_0x13fa('0x24')]('ul'))[_0x13fa('0x23')](function(){var _0x4b8317=_0x3c7055(this);_0x4b8317[_0x13fa('0xf')](_0x13fa('0x43')+_0x4b8317[_0x13fa('0x40')]('li')['length']+_0x13fa('0x44'));});});_0x1e42c6(_0x5dec8b);_0xffe0ad[_0x13fa('0x45')][_0x13fa('0x32')](this);_0x3c7055(window)['trigger'](_0x13fa('0x46'),_0x2449bd);};_0x3c7055['fn']['QD_amazingMenu']=function(_0x4ca936){var _0x169700=_0x3c7055(this);if(!_0x169700[_0x13fa('0x1e')])return _0x169700;_0xffe0ad=_0x3c7055[_0x13fa('0x47')]({},_0x19ef5e,_0x4ca936);_0x169700['exec']=new _0x3c7055[(_0x13fa('0x2'))](_0x3c7055(this));return _0x169700;};_0x3c7055(function(){_0x3c7055(_0x13fa('0x48'))[_0x13fa('0x2')]();});}}(this));

/* Quatro Digital Smart Cart */
var _0x54ef=['object','warn','[Simple\x20Cart]\x0a','info','add','QD_simpleCart','elements','.qd_cart_qtt','.qd_cart_total','.qd_items_text','attr','content','each','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','value','total','currencySymbol','shipping','allTotal','qtt','showQuantityByItems','items','callback','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','hide','filter','show','.plural','addClass','qd-emptyCart','removeClass','$this','O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','alerta','cartTotalE','html','itemsTextE','cartQttE','find','cartQtt','cartTotal','itemsText','emptyElem','smartCheckout','_QuatroDigital_DropDown','vtexjs','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','QD_checkoutQueue','shippingData','simpleCartCallback.quatro_digital','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','.qd_cart_auto','bind','Oooops!\x20','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','fail','Callbacks','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','.productInformationWrapper\x20\x20a.buy-button','input.buy-in-page-quantity','javascript:','body','Produto\x20adicionado\x20ao\x20carrinho!','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','location','href','#produto,\x20.produto','QD_buyButton','click.qd_bb_buy_sc','preventDefault','Método\x20descontinuado!','.qd-sbb-on','qd-sbb-on','.btn-add-buy-button-asynchronous','.remove-href','qd-bb-active','.qd-bb-productAdded','.buy-in-page-button','isProductPage','selector','_Quatro_Digital_dropDown','prodAdd','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','[href=\x27','---','qd-bb-itemAddBuyButtonWrapper','qd-bb-itemAddCartWrapper','timeRemoveNewItemClass','isSmartCheckout','função\x20descontinuada','getCartInfoByUrl','autoWatchBuyButton','buyButton','unbind','click','load','mouseenter.qd_bb_buy_sc','indexOf','selectSkuMsg','?redirect=false&','redirect=false','queue','buyIfQuantityZeroed','test','push','productPageCallback','buyButtonClickCallback','split','ku=','shift','trigger','productAddedToCart','cartProductAdded.vtex','fakeRequest','success','parent','_QuatroDigital_prodBuyCallback','Callback\x20não\x20é\x20uma\x20função','.qd-bb-itemAddWrapper','prepend','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','QuatroDigital.qd_bb_prod_add','ajaxSend','/checkout/cart/add','match','pop','productAddedToCart.qdSbbVtex','ajaxStop','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','QD_dropDownCart','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','skuName','name','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','.qd_ddc_lightBoxOverlay','qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20input','val','mouseenter.qd_ddc_hover','allowUpdate','cartIsEmpty','mouseleave.qd_ddc_hover','texts','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd_ddc_continueShopping','continueShopping','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','cartContainer','clone','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','.qd-ddc-infoAllTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','dataOptionsCache','.qd-ddc-wrapper','_QuatroDigital_AmountProduct','exec','qd-ddc-prodLoaded','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','renderProductsList','.qd-ddc-prodWrapper2','empty','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','qd-ddc-','availability','append','.qd-ddc-prodPrice','sellingPrice','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','[data-sku=\x27','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','callbackProductsList','qd-loaded','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','changeQantity','data-sku-index','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantity','removeProduct','stop','slideUp','remove','$1-$2$3','BRA','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','quantity','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','index','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','updateOnlyHover','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','buyButtonClicked','quickViewUpdate','allowRecalculate','productId','prod_','prodId','.qd-bap-wrapper','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','qd-bap-item-added','QD_smartCart','dropDown','smartCart','getParent','closest','replace','abs','undefined','pow','toFixed','round','length','join','function','prototype','trim','capitalize','toUpperCase','slice','toLowerCase','qdAjax','qdAjaxQueue','000','error','extend','GET','stringify','data','toString','url','type','jqXHR','ajax','done','always','complete','clearQueueDelay','message','version','4.0','checkout','getOrderForm','call','QuatroDigital_simpleCart','ajaxStopOn','simpleCart'];(function(_0x55a100,_0x2fb448){var _0x168586=function(_0x59a963){while(--_0x59a963){_0x55a100['push'](_0x55a100['shift']());}};_0x168586(++_0x2fb448);}(_0x54ef,0x112));var _0xf54e=function(_0x1fcbaa,_0x567903){_0x1fcbaa=_0x1fcbaa-0x0;var _0x407de0=_0x54ef[_0x1fcbaa];return _0x407de0;};(function(_0x19d4d5){_0x19d4d5['fn'][_0xf54e('0x0')]=_0x19d4d5['fn'][_0xf54e('0x1')];}(jQuery));function qd_number_format(_0x5d180f,_0xd936f7,_0x18b7d6,_0x18b1cf){_0x5d180f=(_0x5d180f+'')[_0xf54e('0x2')](/[^0-9+\-Ee.]/g,'');_0x5d180f=isFinite(+_0x5d180f)?+_0x5d180f:0x0;_0xd936f7=isFinite(+_0xd936f7)?Math[_0xf54e('0x3')](_0xd936f7):0x0;_0x18b1cf=_0xf54e('0x4')===typeof _0x18b1cf?',':_0x18b1cf;_0x18b7d6=_0xf54e('0x4')===typeof _0x18b7d6?'.':_0x18b7d6;var _0x18e84e='',_0x18e84e=function(_0x99cf9,_0x2464ae){var _0xd936f7=Math[_0xf54e('0x5')](0xa,_0x2464ae);return''+(Math['round'](_0x99cf9*_0xd936f7)/_0xd936f7)[_0xf54e('0x6')](_0x2464ae);},_0x18e84e=(_0xd936f7?_0x18e84e(_0x5d180f,_0xd936f7):''+Math[_0xf54e('0x7')](_0x5d180f))['split']('.');0x3<_0x18e84e[0x0][_0xf54e('0x8')]&&(_0x18e84e[0x0]=_0x18e84e[0x0][_0xf54e('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x18b1cf));(_0x18e84e[0x1]||'')[_0xf54e('0x8')]<_0xd936f7&&(_0x18e84e[0x1]=_0x18e84e[0x1]||'',_0x18e84e[0x1]+=Array(_0xd936f7-_0x18e84e[0x1][_0xf54e('0x8')]+0x1)['join']('0'));return _0x18e84e[_0xf54e('0x9')](_0x18b7d6);};_0xf54e('0xa')!==typeof String[_0xf54e('0xb')][_0xf54e('0xc')]&&(String['prototype'][_0xf54e('0xc')]=function(){return this['replace'](/^\s+|\s+$/g,'');});'function'!=typeof String[_0xf54e('0xb')][_0xf54e('0xd')]&&(String[_0xf54e('0xb')][_0xf54e('0xd')]=function(){return this['charAt'](0x0)[_0xf54e('0xe')]()+this[_0xf54e('0xf')](0x1)[_0xf54e('0x10')]();});(function(_0x15f639){if('function'!==typeof _0x15f639[_0xf54e('0x11')]){var _0x389abc={};_0x15f639[_0xf54e('0x12')]=_0x389abc;0x96>parseInt((_0x15f639['fn']['jquery']['replace'](/[^0-9]+/g,'')+_0xf54e('0x13'))[_0xf54e('0xf')](0x0,0x3),0xa)&&console&&_0xf54e('0xa')==typeof console[_0xf54e('0x14')]&&console[_0xf54e('0x14')]();_0x15f639[_0xf54e('0x11')]=function(_0x2e27b6){try{var _0x1ef06e=_0x15f639[_0xf54e('0x15')]({},{'url':'','type':_0xf54e('0x16'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x2e27b6);var _0x226c96='object'===typeof _0x1ef06e['data']?JSON[_0xf54e('0x17')](_0x1ef06e['data']):_0x1ef06e[_0xf54e('0x18')][_0xf54e('0x19')]();var _0x106362=encodeURIComponent(_0x1ef06e[_0xf54e('0x1a')]+'|'+_0x1ef06e[_0xf54e('0x1b')]+'|'+_0x226c96);_0x389abc[_0x106362]=_0x389abc[_0x106362]||{};_0xf54e('0x4')==typeof _0x389abc[_0x106362][_0xf54e('0x1c')]?_0x389abc[_0x106362][_0xf54e('0x1c')]=_0x15f639[_0xf54e('0x1d')](_0x1ef06e):(_0x389abc[_0x106362][_0xf54e('0x1c')][_0xf54e('0x1e')](_0x1ef06e['success']),_0x389abc[_0x106362][_0xf54e('0x1c')]['fail'](_0x1ef06e[_0xf54e('0x14')]),_0x389abc[_0x106362][_0xf54e('0x1c')][_0xf54e('0x1f')](_0x1ef06e[_0xf54e('0x20')]));_0x389abc[_0x106362][_0xf54e('0x1c')][_0xf54e('0x1f')](function(){isNaN(parseInt(_0x1ef06e[_0xf54e('0x21')]))||setTimeout(function(){_0x389abc[_0x106362][_0xf54e('0x1c')]=void 0x0;},_0x1ef06e[_0xf54e('0x21')]);});return _0x389abc[_0x106362][_0xf54e('0x1c')];}catch(_0xf6cdd7){_0xf54e('0x4')!==typeof console&&_0xf54e('0xa')===typeof console['error']&&console[_0xf54e('0x14')]('Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20'+_0xf6cdd7[_0xf54e('0x22')]);}};_0x15f639['qdAjax'][_0xf54e('0x23')]=_0xf54e('0x24');}}(jQuery));(function(_0x21ba00){_0x21ba00['fn'][_0xf54e('0x0')]=_0x21ba00['fn'][_0xf54e('0x1')];}(jQuery));(function(){var _0x3993e4=jQuery;if(_0xf54e('0xa')!==typeof _0x3993e4['fn']['simpleCart']){_0x3993e4(function(){var _0x4b3c73=vtexjs[_0xf54e('0x25')][_0xf54e('0x26')];vtexjs[_0xf54e('0x25')][_0xf54e('0x26')]=function(){return _0x4b3c73[_0xf54e('0x27')]();};});try{window[_0xf54e('0x28')]=window[_0xf54e('0x28')]||{};window[_0xf54e('0x28')][_0xf54e('0x29')]=!0x1;_0x3993e4['fn'][_0xf54e('0x2a')]=function(_0x5ea0cc,_0x5f29d3,_0x324976){var _0x3169dd=function(_0x4d8fdd,_0x3e319c){if(_0xf54e('0x2b')===typeof console){var _0x379110=_0xf54e('0x2b')===typeof _0x4d8fdd;'undefined'!==typeof _0x3e319c&&'alerta'===_0x3e319c['toLowerCase']()?_0x379110?console[_0xf54e('0x2c')](_0xf54e('0x2d'),_0x4d8fdd[0x0],_0x4d8fdd[0x1],_0x4d8fdd[0x2],_0x4d8fdd[0x3],_0x4d8fdd[0x4],_0x4d8fdd[0x5],_0x4d8fdd[0x6],_0x4d8fdd[0x7]):console[_0xf54e('0x2c')](_0xf54e('0x2d')+_0x4d8fdd):_0xf54e('0x4')!==typeof _0x3e319c&&_0xf54e('0x2e')===_0x3e319c['toLowerCase']()?_0x379110?console['info']('[Simple\x20Cart]\x0a',_0x4d8fdd[0x0],_0x4d8fdd[0x1],_0x4d8fdd[0x2],_0x4d8fdd[0x3],_0x4d8fdd[0x4],_0x4d8fdd[0x5],_0x4d8fdd[0x6],_0x4d8fdd[0x7]):console[_0xf54e('0x2e')](_0xf54e('0x2d')+_0x4d8fdd):_0x379110?console['error']('[Simple\x20Cart]\x0a',_0x4d8fdd[0x0],_0x4d8fdd[0x1],_0x4d8fdd[0x2],_0x4d8fdd[0x3],_0x4d8fdd[0x4],_0x4d8fdd[0x5],_0x4d8fdd[0x6],_0x4d8fdd[0x7]):console[_0xf54e('0x14')](_0xf54e('0x2d')+_0x4d8fdd);}};var _0x173e6c=_0x3993e4(this);'object'===typeof _0x5ea0cc?_0x5f29d3=_0x5ea0cc:(_0x5ea0cc=_0x5ea0cc||!0x1,_0x173e6c=_0x173e6c[_0xf54e('0x2f')](_0x3993e4[_0xf54e('0x30')]['elements']));if(!_0x173e6c[_0xf54e('0x8')])return _0x173e6c;_0x3993e4[_0xf54e('0x30')][_0xf54e('0x31')]=_0x3993e4[_0xf54e('0x30')][_0xf54e('0x31')][_0xf54e('0x2f')](_0x173e6c);_0x324976='undefined'===typeof _0x324976?!0x1:_0x324976;var _0x5d45cf={'cartQtt':_0xf54e('0x32'),'cartTotal':_0xf54e('0x33'),'itemsText':_0xf54e('0x34'),'currencySymbol':(_0x3993e4('meta[name=currency]')[_0xf54e('0x35')](_0xf54e('0x36'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x448054=_0x3993e4[_0xf54e('0x15')]({},_0x5d45cf,_0x5f29d3);var _0x361e4c=_0x3993e4('');_0x173e6c[_0xf54e('0x37')](function(){var _0x17c7ec=_0x3993e4(this);_0x17c7ec[_0xf54e('0x18')](_0xf54e('0x38'))||_0x17c7ec[_0xf54e('0x18')](_0xf54e('0x38'),_0x448054);});var _0x30e147=function(_0x3dfd4e){window[_0xf54e('0x39')]=window[_0xf54e('0x39')]||{};for(var _0x5ea0cc=0x0,_0x4f311f=0x0,_0x533423=0x0;_0x533423<_0x3dfd4e[_0xf54e('0x3a')][_0xf54e('0x8')];_0x533423++)'Shipping'==_0x3dfd4e[_0xf54e('0x3a')][_0x533423]['id']&&(_0x4f311f+=_0x3dfd4e[_0xf54e('0x3a')][_0x533423][_0xf54e('0x3b')]),_0x5ea0cc+=_0x3dfd4e['totalizers'][_0x533423][_0xf54e('0x3b')];window[_0xf54e('0x39')][_0xf54e('0x3c')]=_0x448054[_0xf54e('0x3d')]+qd_number_format(_0x5ea0cc/0x64,0x2,',','.');window[_0xf54e('0x39')][_0xf54e('0x3e')]=_0x448054[_0xf54e('0x3d')]+qd_number_format(_0x4f311f/0x64,0x2,',','.');window[_0xf54e('0x39')][_0xf54e('0x3f')]=_0x448054['currencySymbol']+qd_number_format((_0x5ea0cc+_0x4f311f)/0x64,0x2,',','.');window[_0xf54e('0x39')][_0xf54e('0x40')]=0x0;if(_0x448054[_0xf54e('0x41')])for(_0x533423=0x0;_0x533423<_0x3dfd4e[_0xf54e('0x42')][_0xf54e('0x8')];_0x533423++)window[_0xf54e('0x39')]['qtt']+=_0x3dfd4e[_0xf54e('0x42')][_0x533423]['quantity'];else window[_0xf54e('0x39')]['qtt']=_0x3dfd4e[_0xf54e('0x42')][_0xf54e('0x8')]||0x0;try{window[_0xf54e('0x39')]['callback']&&window[_0xf54e('0x39')][_0xf54e('0x43')][_0xf54e('0x44')]&&window[_0xf54e('0x39')][_0xf54e('0x43')]['fire']();}catch(_0x427799){_0x3169dd(_0xf54e('0x45'));}_0x1106bb(_0x361e4c);};var _0x346bb4=function(_0x45592b,_0x5f3438){0x1===_0x45592b?_0x5f3438[_0xf54e('0x46')]()[_0xf54e('0x47')]('.singular')[_0xf54e('0x48')]():_0x5f3438[_0xf54e('0x46')]()[_0xf54e('0x47')](_0xf54e('0x49'))['show']();};var _0x196e68=function(_0x2b645e){0x1>_0x2b645e?_0x173e6c[_0xf54e('0x4a')](_0xf54e('0x4b')):_0x173e6c[_0xf54e('0x4c')](_0xf54e('0x4b'));};var _0x1231d0=function(_0xd7b0c5,_0x15bfef){var _0x21f2f8=parseInt(window[_0xf54e('0x39')][_0xf54e('0x40')],0xa);_0x15bfef[_0xf54e('0x4d')][_0xf54e('0x48')]();isNaN(_0x21f2f8)&&(_0x3169dd(_0xf54e('0x4e'),_0xf54e('0x4f')),_0x21f2f8=0x0);_0x15bfef[_0xf54e('0x50')][_0xf54e('0x51')](window[_0xf54e('0x39')][_0xf54e('0x3c')]);_0x15bfef['cartQttE']['html'](_0x21f2f8);_0x346bb4(_0x21f2f8,_0x15bfef[_0xf54e('0x52')]);_0x196e68(_0x21f2f8);};var _0x1106bb=function(_0x45861b){_0x173e6c[_0xf54e('0x37')](function(){var _0xba297c={};var _0x3b7f40=_0x3993e4(this);_0x5ea0cc&&_0x3b7f40[_0xf54e('0x18')](_0xf54e('0x38'))&&_0x3993e4[_0xf54e('0x15')](_0x448054,_0x3b7f40[_0xf54e('0x18')](_0xf54e('0x38')));_0xba297c['$this']=_0x3b7f40;_0xba297c[_0xf54e('0x53')]=_0x3b7f40[_0xf54e('0x54')](_0x448054[_0xf54e('0x55')])||_0x361e4c;_0xba297c[_0xf54e('0x50')]=_0x3b7f40[_0xf54e('0x54')](_0x448054[_0xf54e('0x56')])||_0x361e4c;_0xba297c[_0xf54e('0x52')]=_0x3b7f40['find'](_0x448054[_0xf54e('0x57')])||_0x361e4c;_0xba297c[_0xf54e('0x58')]=_0x3b7f40[_0xf54e('0x54')](_0x448054['emptyCart'])||_0x361e4c;_0x1231d0(_0x45861b,_0xba297c);_0x3b7f40[_0xf54e('0x4a')]('qd-sc-populated');});};(function(){if(_0x448054[_0xf54e('0x59')]){window[_0xf54e('0x5a')]=window[_0xf54e('0x5a')]||{};if('undefined'!==typeof window[_0xf54e('0x5a')][_0xf54e('0x26')]&&(_0x324976||!_0x5ea0cc))return _0x30e147(window[_0xf54e('0x5a')][_0xf54e('0x26')]);if(_0xf54e('0x2b')!==typeof window[_0xf54e('0x5b')]||_0xf54e('0x4')===typeof window['vtexjs']['checkout'])if(_0xf54e('0x2b')===typeof vtex&&_0xf54e('0x2b')===typeof vtex['checkout']&&_0xf54e('0x4')!==typeof vtex['checkout'][_0xf54e('0x5c')])new vtex['checkout'][(_0xf54e('0x5c'))]();else return _0x3169dd(_0xf54e('0x5d'));_0x3993e4[_0xf54e('0x5e')]([_0xf54e('0x42'),_0xf54e('0x3a'),_0xf54e('0x5f')],{'done':function(_0x556e55){_0x30e147(_0x556e55);window['_QuatroDigital_DropDown'][_0xf54e('0x26')]=_0x556e55;},'fail':function(_0x2b273d){_0x3169dd(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.',_0x2b273d]);}});}else alert('Esta\x20é\x20uma\x20função\x20descontinuada\x20=/');}());_0x448054[_0xf54e('0x43')]();_0x3993e4(window)['trigger'](_0xf54e('0x60'));return _0x173e6c;};_0x3993e4[_0xf54e('0x30')]={'elements':_0x3993e4('')};_0x3993e4(function(){var _0x47596c;_0xf54e('0xa')===typeof window[_0xf54e('0x61')]&&(_0x47596c=window[_0xf54e('0x61')],window[_0xf54e('0x61')]=function(_0x3d706a,_0x11732b,_0x4d8040,_0x1f9dad,_0x2c6d0e){_0x47596c[_0xf54e('0x27')](this,_0x3d706a,_0x11732b,_0x4d8040,_0x1f9dad,function(){_0xf54e('0xa')===typeof _0x2c6d0e&&_0x2c6d0e();_0x3993e4['QD_simpleCart'][_0xf54e('0x31')][_0xf54e('0x37')](function(){var _0xb7ff4d=_0x3993e4(this);_0xb7ff4d[_0xf54e('0x2a')](_0xb7ff4d[_0xf54e('0x18')]('qd_simpleCartOpts'));});});});});var _0xf50b1b=window[_0xf54e('0x62')]||void 0x0;window['ReloadItemsCart']=function(_0x51ec35){_0x3993e4['fn'][_0xf54e('0x2a')](!0x0);'function'===typeof _0xf50b1b?_0xf50b1b[_0xf54e('0x27')](this,_0x51ec35):alert(_0x51ec35);};_0x3993e4(function(){var _0x39c5eb=_0x3993e4(_0xf54e('0x63'));_0x39c5eb[_0xf54e('0x8')]&&_0x39c5eb['simpleCart']();});_0x3993e4(function(){_0x3993e4(window)[_0xf54e('0x64')]('productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex',function(){_0x3993e4['fn'][_0xf54e('0x2a')](!0x0);});});}catch(_0x3759d4){_0xf54e('0x4')!==typeof console&&'function'===typeof console[_0xf54e('0x14')]&&console['error'](_0xf54e('0x65'),_0x3759d4);}}}());(function(){var _0x3e2101=function(_0x2df028,_0x33acd3){if(_0xf54e('0x2b')===typeof console){var _0x21159f='object'===typeof _0x2df028;_0xf54e('0x4')!==typeof _0x33acd3&&_0xf54e('0x4f')===_0x33acd3['toLowerCase']()?_0x21159f?console[_0xf54e('0x2c')](_0xf54e('0x66'),_0x2df028[0x0],_0x2df028[0x1],_0x2df028[0x2],_0x2df028[0x3],_0x2df028[0x4],_0x2df028[0x5],_0x2df028[0x6],_0x2df028[0x7]):console['warn'](_0xf54e('0x66')+_0x2df028):_0xf54e('0x4')!==typeof _0x33acd3&&_0xf54e('0x2e')===_0x33acd3['toLowerCase']()?_0x21159f?console[_0xf54e('0x2e')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x2df028[0x0],_0x2df028[0x1],_0x2df028[0x2],_0x2df028[0x3],_0x2df028[0x4],_0x2df028[0x5],_0x2df028[0x6],_0x2df028[0x7]):console[_0xf54e('0x2e')](_0xf54e('0x66')+_0x2df028):_0x21159f?console['error'](_0xf54e('0x66'),_0x2df028[0x0],_0x2df028[0x1],_0x2df028[0x2],_0x2df028[0x3],_0x2df028[0x4],_0x2df028[0x5],_0x2df028[0x6],_0x2df028[0x7]):console[_0xf54e('0x14')](_0xf54e('0x66')+_0x2df028);}},_0x5500d7=null,_0x380b4f={},_0x59f97f={},_0x3aa7e5={};$[_0xf54e('0x5e')]=function(_0x38bf71,_0xfc1e){if(null===_0x5500d7)if(_0xf54e('0x2b')===typeof window[_0xf54e('0x5b')]&&_0xf54e('0x4')!==typeof window[_0xf54e('0x5b')][_0xf54e('0x25')])_0x5500d7=window['vtexjs'][_0xf54e('0x25')];else return _0x3e2101(_0xf54e('0x67'));var _0x200a51=$[_0xf54e('0x15')]({'done':function(){},'fail':function(){}},_0xfc1e),_0x4905e7=_0x38bf71[_0xf54e('0x9')](';'),_0x3368cb=function(){_0x380b4f[_0x4905e7][_0xf54e('0x2f')](_0x200a51[_0xf54e('0x1e')]);_0x59f97f[_0x4905e7][_0xf54e('0x2f')](_0x200a51[_0xf54e('0x68')]);};_0x3aa7e5[_0x4905e7]?_0x3368cb():(_0x380b4f[_0x4905e7]=$['Callbacks'](),_0x59f97f[_0x4905e7]=$[_0xf54e('0x69')](),_0x3368cb(),_0x3aa7e5[_0x4905e7]=!0x0,_0x5500d7[_0xf54e('0x26')](_0x38bf71)[_0xf54e('0x1e')](function(_0x5016c5){_0x3aa7e5[_0x4905e7]=!0x1;_0x380b4f[_0x4905e7][_0xf54e('0x44')](_0x5016c5);})[_0xf54e('0x68')](function(_0x57601f){_0x3aa7e5[_0x4905e7]=!0x1;_0x59f97f[_0x4905e7][_0xf54e('0x44')](_0x57601f);}));};}());(function(_0x4f584a){try{var _0x4a6dee=jQuery,_0x25d05e,_0x45c5ff=_0x4a6dee({}),_0x192d3b=function(_0x1c49cb,_0x5ae82c){if(_0xf54e('0x2b')===typeof console&&_0xf54e('0x4')!==typeof console[_0xf54e('0x14')]&&_0xf54e('0x4')!==typeof console['info']&&_0xf54e('0x4')!==typeof console[_0xf54e('0x2c')]){var _0x2b026a;_0xf54e('0x2b')===typeof _0x1c49cb?(_0x1c49cb['unshift'](_0xf54e('0x6a')),_0x2b026a=_0x1c49cb):_0x2b026a=[_0xf54e('0x6a')+_0x1c49cb];if(_0xf54e('0x4')===typeof _0x5ae82c||_0xf54e('0x4f')!==_0x5ae82c['toLowerCase']()&&_0xf54e('0x6b')!==_0x5ae82c[_0xf54e('0x10')]())if(_0xf54e('0x4')!==typeof _0x5ae82c&&'info'===_0x5ae82c['toLowerCase']())try{console[_0xf54e('0x2e')][_0xf54e('0x6c')](console,_0x2b026a);}catch(_0x1e2834){try{console[_0xf54e('0x2e')](_0x2b026a[_0xf54e('0x9')]('\x0a'));}catch(_0x14b7fc){}}else try{console[_0xf54e('0x14')][_0xf54e('0x6c')](console,_0x2b026a);}catch(_0x8093bc){try{console['error'](_0x2b026a[_0xf54e('0x9')]('\x0a'));}catch(_0x3edfa0){}}else try{console[_0xf54e('0x2c')][_0xf54e('0x6c')](console,_0x2b026a);}catch(_0x395513){try{console[_0xf54e('0x2c')](_0x2b026a[_0xf54e('0x9')]('\x0a'));}catch(_0x9a8f4f){}}}},_0x2e35a3={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0xf54e('0x6d'),'buyQtt':_0xf54e('0x6e'),'selectSkuMsg':_0xf54e('0x6f'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x418ecc,_0x5b9ff2,_0x151f58){_0x4a6dee(_0xf54e('0x70'))['is']('.productQuickView')&&('success'===_0x5b9ff2?alert(_0xf54e('0x71')):(alert(_0xf54e('0x72')),(_0xf54e('0x2b')===typeof parent?parent:document)[_0xf54e('0x73')][_0xf54e('0x74')]=_0x151f58));},'isProductPage':function(){return _0x4a6dee(_0xf54e('0x70'))['is'](_0xf54e('0x75'));},'execDefaultAction':function(_0x403445){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x4a6dee[_0xf54e('0x76')]=function(_0x570c3a,_0x2bb31f){function _0x3c222a(_0x3c641b){_0x25d05e['isSmartCheckout']?_0x3c641b[_0xf54e('0x18')]('qd-bb-click-active')||(_0x3c641b[_0xf54e('0x18')]('qd-bb-click-active',0x1),_0x3c641b['on'](_0xf54e('0x77'),function(_0x35da10){if(!_0x25d05e['allowBuyClick']())return!0x0;if(!0x0!==_0x20f9e1['clickBuySmartCheckout'][_0xf54e('0x27')](this))return _0x35da10[_0xf54e('0x78')](),!0x1;})):alert(_0xf54e('0x79'));}function _0x406261(_0x389f16){_0x389f16=_0x389f16||_0x4a6dee(_0x25d05e['buyButton']);_0x389f16['each'](function(){var _0x389f16=_0x4a6dee(this);_0x389f16['is'](_0xf54e('0x7a'))||(_0x389f16[_0xf54e('0x4a')](_0xf54e('0x7b')),_0x389f16['is'](_0xf54e('0x7c'))&&!_0x389f16['is'](_0xf54e('0x7d'))||_0x389f16[_0xf54e('0x18')](_0xf54e('0x7e'))||(_0x389f16[_0xf54e('0x18')](_0xf54e('0x7e'),0x1),_0x389f16['children'](_0xf54e('0x7f'))[_0xf54e('0x8')]||_0x389f16['append']('<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>'),_0x389f16['is'](_0xf54e('0x80'))&&_0x25d05e[_0xf54e('0x81')]()&&_0x14e19e[_0xf54e('0x27')](_0x389f16),_0x3c222a(_0x389f16)));});_0x25d05e[_0xf54e('0x81')]()&&!_0x389f16[_0xf54e('0x8')]&&_0x192d3b('Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27'+_0x389f16[_0xf54e('0x82')]+'\x27.',_0xf54e('0x2e'));}var _0xd631af=_0x4a6dee(_0x570c3a);var _0x20f9e1=this;window['_Quatro_Digital_dropDown']=window[_0xf54e('0x83')]||{};window[_0xf54e('0x39')]=window[_0xf54e('0x39')]||{};_0x20f9e1[_0xf54e('0x84')]=function(_0x4c3a6a,_0x289946){_0xd631af[_0xf54e('0x4a')](_0xf54e('0x85'));_0x4a6dee(_0xf54e('0x70'))[_0xf54e('0x4a')]('qd-bb-lightBoxBodyProdAdd');var _0x2cb0cd=_0x4a6dee(_0x25d05e['buyButton'])['filter'](_0xf54e('0x86')+(_0x4c3a6a[_0xf54e('0x35')](_0xf54e('0x74'))||_0xf54e('0x87'))+'\x27]')[_0xf54e('0x2f')](_0x4c3a6a);_0x2cb0cd[_0xf54e('0x4a')](_0xf54e('0x88'));setTimeout(function(){_0xd631af[_0xf54e('0x4c')](_0xf54e('0x89'));_0x2cb0cd['removeClass'](_0xf54e('0x88'));},_0x25d05e[_0xf54e('0x8a')]);window[_0xf54e('0x83')][_0xf54e('0x26')]=void 0x0;if(_0xf54e('0x4')!==typeof _0x2bb31f&&_0xf54e('0xa')===typeof _0x2bb31f['getCartInfoByUrl'])return _0x25d05e[_0xf54e('0x8b')]||(_0x192d3b(_0xf54e('0x8c')),_0x2bb31f[_0xf54e('0x8d')]()),window[_0xf54e('0x5a')][_0xf54e('0x26')]=void 0x0,_0x2bb31f[_0xf54e('0x8d')](function(_0x57553f){window[_0xf54e('0x83')][_0xf54e('0x26')]=_0x57553f;_0x4a6dee['fn'][_0xf54e('0x2a')](!0x0,void 0x0,!0x0);},{'lastSku':_0x289946});window[_0xf54e('0x83')]['allowUpdate']=!0x0;_0x4a6dee['fn']['simpleCart'](!0x0);};(function(){if(_0x25d05e[_0xf54e('0x8b')]&&_0x25d05e[_0xf54e('0x8e')]){var _0x13dec5=_0x4a6dee(_0xf54e('0x7c'));_0x13dec5[_0xf54e('0x8')]&&_0x406261(_0x13dec5);}}());var _0x14e19e=function(){var _0x564bc7=_0x4a6dee(this);_0xf54e('0x4')!==typeof _0x564bc7[_0xf54e('0x18')](_0xf54e('0x8f'))?(_0x564bc7[_0xf54e('0x90')](_0xf54e('0x91')),_0x3c222a(_0x564bc7)):(_0x564bc7[_0xf54e('0x64')]('mouseenter.qd_bb_buy_sc',function(_0x33bed6){_0x564bc7['unbind'](_0xf54e('0x91'));_0x3c222a(_0x564bc7);_0x4a6dee(this)['unbind'](_0x33bed6);}),_0x4a6dee(window)[_0xf54e('0x92')](function(){_0x564bc7[_0xf54e('0x90')](_0xf54e('0x91'));_0x3c222a(_0x564bc7);_0x564bc7[_0xf54e('0x90')](_0xf54e('0x93'));}));};_0x20f9e1['clickBuySmartCheckout']=function(){var _0x22c71b=_0x4a6dee(this),_0x570c3a=_0x22c71b['attr'](_0xf54e('0x74'))||'';if(-0x1<_0x570c3a[_0xf54e('0x94')](_0x25d05e[_0xf54e('0x95')]))return!0x0;_0x570c3a=_0x570c3a[_0xf54e('0x2')](/redirect\=(false|true)/gi,'')['replace']('?',_0xf54e('0x96'))[_0xf54e('0x2')](/\&\&/gi,'&');if(_0x25d05e['execDefaultAction'](_0x22c71b))return _0x22c71b[_0xf54e('0x35')]('href',_0x570c3a['replace'](_0xf54e('0x97'),'redirect=true')),!0x0;_0x570c3a=_0x570c3a[_0xf54e('0x2')](/http.?:/i,'');_0x45c5ff[_0xf54e('0x98')](function(_0xd04d25){if(!_0x25d05e[_0xf54e('0x99')]&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0xf54e('0x9a')](_0x570c3a))return _0xd04d25();var _0x56f125=function(_0x824d0b,_0x351239){var _0x406261=_0x570c3a['match'](/sku\=([0-9]+)/gi),_0x475b5a=[];if(_0xf54e('0x2b')===typeof _0x406261&&null!==_0x406261)for(var _0x52d9fa=_0x406261[_0xf54e('0x8')]-0x1;0x0<=_0x52d9fa;_0x52d9fa--){var _0x1e6414=parseInt(_0x406261[_0x52d9fa]['replace'](/sku\=/gi,''));isNaN(_0x1e6414)||_0x475b5a[_0xf54e('0x9b')](_0x1e6414);}_0x25d05e[_0xf54e('0x9c')][_0xf54e('0x27')](this,_0x824d0b,_0x351239,_0x570c3a);_0x20f9e1[_0xf54e('0x9d')]['call'](this,_0x824d0b,_0x351239,_0x570c3a,_0x475b5a);_0x20f9e1[_0xf54e('0x84')](_0x22c71b,_0x570c3a[_0xf54e('0x9e')](_0xf54e('0x9f'))['pop']()['split']('&')[_0xf54e('0xa0')]());'function'===typeof _0x25d05e['asyncCallback']&&_0x25d05e['asyncCallback'][_0xf54e('0x27')](this);_0x4a6dee(window)[_0xf54e('0xa1')](_0xf54e('0xa2'));_0x4a6dee(window)[_0xf54e('0xa1')](_0xf54e('0xa3'));};_0x25d05e[_0xf54e('0xa4')]?(_0x56f125(null,_0xf54e('0xa5')),_0xd04d25()):_0x4a6dee[_0xf54e('0x1d')]({'url':_0x570c3a,'complete':_0x56f125})[_0xf54e('0x1f')](function(){_0xd04d25();});});};_0x20f9e1['buyButtonClickCallback']=function(_0x11cfc9,_0x523171,_0x7cd726,_0x32e535){try{'success'===_0x523171&&_0xf54e('0x2b')===typeof window['parent']&&_0xf54e('0xa')===typeof window[_0xf54e('0xa6')][_0xf54e('0xa7')]&&window[_0xf54e('0xa6')][_0xf54e('0xa7')](_0x11cfc9,_0x523171,_0x7cd726,_0x32e535);}catch(_0x3c499e){_0x192d3b('Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.');}};_0x406261();'function'===typeof _0x25d05e['callback']?_0x25d05e[_0xf54e('0x43')]['call'](this):_0x192d3b(_0xf54e('0xa8'));};var _0x3e3bc1=_0x4a6dee[_0xf54e('0x69')]();_0x4a6dee['fn'][_0xf54e('0x76')]=function(_0xf92db2,_0x5e5e50){var _0x4f584a=_0x4a6dee(this);_0xf54e('0x4')!==typeof _0x5e5e50||_0xf54e('0x2b')!==typeof _0xf92db2||_0xf92db2 instanceof _0x4a6dee||(_0x5e5e50=_0xf92db2,_0xf92db2=void 0x0);_0x25d05e=_0x4a6dee[_0xf54e('0x15')]({},_0x2e35a3,_0x5e5e50);var _0x232d8c;_0x3e3bc1[_0xf54e('0x2f')](function(){_0x4f584a['children'](_0xf54e('0xa9'))[_0xf54e('0x8')]||_0x4f584a[_0xf54e('0xaa')](_0xf54e('0xab'));_0x232d8c=new _0x4a6dee[(_0xf54e('0x76'))](_0x4f584a,_0xf92db2);});_0x3e3bc1['fire']();_0x4a6dee(window)['on'](_0xf54e('0xac'),function(_0x101508,_0x26631d,_0x322f58){_0x232d8c[_0xf54e('0x84')](_0x26631d,_0x322f58);});return _0x4a6dee[_0xf54e('0x15')](_0x4f584a,_0x232d8c);};var _0x285405=0x0;_0x4a6dee(document)[_0xf54e('0xad')](function(_0x2e42f7,_0x570bba,_0xb94478){-0x1<_0xb94478[_0xf54e('0x1a')]['toLowerCase']()['indexOf'](_0xf54e('0xae'))&&(_0x285405=(_0xb94478['url'][_0xf54e('0xaf')](/sku\=([0-9]+)/i)||[''])[_0xf54e('0xb0')]());});_0x4a6dee(window)[_0xf54e('0x64')](_0xf54e('0xb1'),function(){_0x4a6dee(window)['trigger'](_0xf54e('0xac'),[new _0x4a6dee(),_0x285405]);});_0x4a6dee(document)[_0xf54e('0xb2')](function(){_0x3e3bc1['fire']();});}catch(_0x90ad88){_0xf54e('0x4')!==typeof console&&_0xf54e('0xa')===typeof console[_0xf54e('0x14')]&&console[_0xf54e('0x14')](_0xf54e('0x65'),_0x90ad88);}}(this));function qd_number_format(_0xbc44cc,_0x2179fd,_0x37ffde,_0x3634bc){_0xbc44cc=(_0xbc44cc+'')[_0xf54e('0x2')](/[^0-9+\-Ee.]/g,'');_0xbc44cc=isFinite(+_0xbc44cc)?+_0xbc44cc:0x0;_0x2179fd=isFinite(+_0x2179fd)?Math['abs'](_0x2179fd):0x0;_0x3634bc='undefined'===typeof _0x3634bc?',':_0x3634bc;_0x37ffde=_0xf54e('0x4')===typeof _0x37ffde?'.':_0x37ffde;var _0x961877='',_0x961877=function(_0x27ce38,_0x4e2143){var _0x3b29f4=Math[_0xf54e('0x5')](0xa,_0x4e2143);return''+(Math[_0xf54e('0x7')](_0x27ce38*_0x3b29f4)/_0x3b29f4)[_0xf54e('0x6')](_0x4e2143);},_0x961877=(_0x2179fd?_0x961877(_0xbc44cc,_0x2179fd):''+Math['round'](_0xbc44cc))[_0xf54e('0x9e')]('.');0x3<_0x961877[0x0][_0xf54e('0x8')]&&(_0x961877[0x0]=_0x961877[0x0][_0xf54e('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x3634bc));(_0x961877[0x1]||'')[_0xf54e('0x8')]<_0x2179fd&&(_0x961877[0x1]=_0x961877[0x1]||'',_0x961877[0x1]+=Array(_0x2179fd-_0x961877[0x1][_0xf54e('0x8')]+0x1)[_0xf54e('0x9')]('0'));return _0x961877[_0xf54e('0x9')](_0x37ffde);}(function(){try{window[_0xf54e('0x39')]=window[_0xf54e('0x39')]||{},window[_0xf54e('0x39')][_0xf54e('0x43')]=window[_0xf54e('0x39')][_0xf54e('0x43')]||$[_0xf54e('0x69')]();}catch(_0x4b1fe4){_0xf54e('0x4')!==typeof console&&'function'===typeof console['error']&&console[_0xf54e('0x14')](_0xf54e('0x65'),_0x4b1fe4[_0xf54e('0x22')]);}}());(function(_0x44db56){try{var _0x22d3c1=jQuery,_0x2609ef=function(_0x396f98,_0x113020){if(_0xf54e('0x2b')===typeof console&&_0xf54e('0x4')!==typeof console[_0xf54e('0x14')]&&_0xf54e('0x4')!==typeof console[_0xf54e('0x2e')]&&'undefined'!==typeof console[_0xf54e('0x2c')]){var _0x16da78;_0xf54e('0x2b')===typeof _0x396f98?(_0x396f98[_0xf54e('0xb3')](_0xf54e('0xb4')),_0x16da78=_0x396f98):_0x16da78=['[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'+_0x396f98];if('undefined'===typeof _0x113020||_0xf54e('0x4f')!==_0x113020[_0xf54e('0x10')]()&&'aviso'!==_0x113020['toLowerCase']())if(_0xf54e('0x4')!==typeof _0x113020&&'info'===_0x113020[_0xf54e('0x10')]())try{console[_0xf54e('0x2e')][_0xf54e('0x6c')](console,_0x16da78);}catch(_0x1e0e6b){try{console[_0xf54e('0x2e')](_0x16da78[_0xf54e('0x9')]('\x0a'));}catch(_0x50bff9){}}else try{console[_0xf54e('0x14')][_0xf54e('0x6c')](console,_0x16da78);}catch(_0x5cf1e4){try{console[_0xf54e('0x14')](_0x16da78[_0xf54e('0x9')]('\x0a'));}catch(_0x529f31){}}else try{console[_0xf54e('0x2c')][_0xf54e('0x6c')](console,_0x16da78);}catch(_0x20d530){try{console['warn'](_0x16da78['join']('\x0a'));}catch(_0xc8216d){}}}};window[_0xf54e('0x5a')]=window['_QuatroDigital_DropDown']||{};window['_QuatroDigital_DropDown']['allowUpdate']=!0x0;_0x22d3c1[_0xf54e('0xb5')]=function(){};_0x22d3c1['fn'][_0xf54e('0xb5')]=function(){return{'fn':new _0x22d3c1()};};var _0x11fb0c=function(_0x5072aa){var _0x187b1c={'t':_0xf54e('0xb6')};return function(_0x28d019){var _0x3da354=function(_0x34b978){return _0x34b978;};var _0x545874=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x28d019=_0x28d019['d'+_0x545874[0x10]+'c'+_0x545874[0x11]+'m'+_0x3da354(_0x545874[0x1])+'n'+_0x545874[0xd]]['l'+_0x545874[0x12]+'c'+_0x545874[0x0]+'ti'+_0x3da354('o')+'n'];var _0x5f2608=function(_0x54a86a){return escape(encodeURIComponent(_0x54a86a['replace'](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x3fa435){return String['fromCharCode'](('Z'>=_0x3fa435?0x5a:0x7a)>=(_0x3fa435=_0x3fa435[_0xf54e('0xb7')](0x0)+0xd)?_0x3fa435:_0x3fa435-0x1a);})));};var _0x44db56=_0x5f2608(_0x28d019[[_0x545874[0x9],_0x3da354('o'),_0x545874[0xc],_0x545874[_0x3da354(0xd)]]['join']('')]);_0x5f2608=_0x5f2608((window[['js',_0x3da354('no'),'m',_0x545874[0x1],_0x545874[0x4][_0xf54e('0xe')](),'ite'][_0xf54e('0x9')]('')]||_0xf54e('0x87'))+['.v',_0x545874[0xd],'e',_0x3da354('x'),'co',_0x3da354('mm'),_0xf54e('0xb8'),_0x545874[0x1],'.c',_0x3da354('o'),'m.',_0x545874[0x13],'r'][_0xf54e('0x9')](''));for(var _0x3c0755 in _0x187b1c){if(_0x5f2608===_0x3c0755+_0x187b1c[_0x3c0755]||_0x44db56===_0x3c0755+_0x187b1c[_0x3c0755]){var _0x397530='tr'+_0x545874[0x11]+'e';break;}_0x397530='f'+_0x545874[0x0]+'ls'+_0x3da354(_0x545874[0x1])+'';}_0x3da354=!0x1;-0x1<_0x28d019[[_0x545874[0xc],'e',_0x545874[0x0],'rc',_0x545874[0x9]][_0xf54e('0x9')]('')]['indexOf'](_0xf54e('0xb9'))&&(_0x3da354=!0x0);return[_0x397530,_0x3da354];}(_0x5072aa);}(window);if(!eval(_0x11fb0c[0x0]))return _0x11fb0c[0x1]?_0x2609ef(_0xf54e('0xba')):!0x1;_0x22d3c1[_0xf54e('0xb5')]=function(_0x6d7a6b,_0x3733f5){var _0x4e3ce0=_0x22d3c1(_0x6d7a6b);if(!_0x4e3ce0[_0xf54e('0x8')])return _0x4e3ce0;var _0x11883c=_0x22d3c1[_0xf54e('0x15')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0xf54e('0xbb'),'linkCheckout':_0xf54e('0xbc'),'cartTotal':_0xf54e('0xbd'),'emptyCart':'Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','continueShopping':'Continuar\x20Comprando','shippingForm':'<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x40da4d){return _0x40da4d[_0xf54e('0xbe')]||_0x40da4d[_0xf54e('0xbf')];},'callback':function(){},'callbackProductsList':function(){}},_0x3733f5);_0x22d3c1('');var _0x21cb51=this;if(_0x11883c[_0xf54e('0x59')]){var _0x51be69=!0x1;_0xf54e('0x4')===typeof window[_0xf54e('0x5b')]&&(_0x2609ef('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN'),_0x22d3c1[_0xf54e('0x1d')]({'url':_0xf54e('0xc0'),'async':!0x1,'dataType':_0xf54e('0xc1'),'error':function(){_0x2609ef('Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.');_0x51be69=!0x0;}}));if(_0x51be69)return _0x2609ef(_0xf54e('0xc2'));}if(_0xf54e('0x2b')===typeof window[_0xf54e('0x5b')]&&_0xf54e('0x4')!==typeof window[_0xf54e('0x5b')][_0xf54e('0x25')])var _0x9936ea=window[_0xf54e('0x5b')]['checkout'];else if(_0xf54e('0x2b')===typeof vtex&&'object'===typeof vtex[_0xf54e('0x25')]&&_0xf54e('0x4')!==typeof vtex[_0xf54e('0x25')][_0xf54e('0x5c')])_0x9936ea=new vtex[(_0xf54e('0x25'))][(_0xf54e('0x5c'))]();else return _0x2609ef(_0xf54e('0x5d'));_0x21cb51['cartContainer']='<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>';var _0x5a7e69=function(_0x51b7f5){_0x22d3c1(this)['append'](_0x51b7f5);_0x51b7f5[_0xf54e('0x54')]('.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose')[_0xf54e('0x2f')](_0x22d3c1(_0xf54e('0xc3')))['on']('click.qd_ddc_closeFn',function(){_0x4e3ce0[_0xf54e('0x4c')](_0xf54e('0xc4'));_0x22d3c1(document[_0xf54e('0x70')])[_0xf54e('0x4c')](_0xf54e('0xc5'));});_0x22d3c1(document)[_0xf54e('0xc6')](_0xf54e('0xc7'))['on'](_0xf54e('0xc7'),function(_0x2c37ba){0x1b==_0x2c37ba[_0xf54e('0xc8')]&&(_0x4e3ce0[_0xf54e('0x4c')]('qd-bb-lightBoxProdAdd'),_0x22d3c1(document[_0xf54e('0x70')])[_0xf54e('0x4c')](_0xf54e('0xc5')));});var _0x52226a=_0x51b7f5[_0xf54e('0x54')]('.qd-ddc-prodWrapper');_0x51b7f5[_0xf54e('0x54')](_0xf54e('0xc9'))['on'](_0xf54e('0xca'),function(){_0x21cb51[_0xf54e('0xcb')]('-',void 0x0,void 0x0,_0x52226a);return!0x1;});_0x51b7f5[_0xf54e('0x54')](_0xf54e('0xcc'))['on'](_0xf54e('0xcd'),function(){_0x21cb51[_0xf54e('0xcb')](void 0x0,void 0x0,void 0x0,_0x52226a);return!0x1;});_0x51b7f5[_0xf54e('0x54')](_0xf54e('0xce'))[_0xf54e('0xcf')]('')['on']('keyup.qd_ddc_cep',function(){_0x21cb51['shippingCalculate'](_0x22d3c1(this));});if(_0x11883c['updateOnlyHover']){var _0x3733f5=0x0;_0x22d3c1(this)['on'](_0xf54e('0xd0'),function(){var _0x51b7f5=function(){window['_QuatroDigital_DropDown'][_0xf54e('0xd1')]&&(_0x21cb51[_0xf54e('0x8d')](),window['_QuatroDigital_DropDown'][_0xf54e('0xd1')]=!0x1,_0x22d3c1['fn'][_0xf54e('0x2a')](!0x0),_0x21cb51[_0xf54e('0xd2')]());};_0x3733f5=setInterval(function(){_0x51b7f5();},0x258);_0x51b7f5();});_0x22d3c1(this)['on'](_0xf54e('0xd3'),function(){clearInterval(_0x3733f5);});}};var _0x3bcd0a=function(_0x358d33){_0x358d33=_0x22d3c1(_0x358d33);_0x11883c[_0xf54e('0xd4')]['cartTotal']=_0x11883c['texts'][_0xf54e('0x56')][_0xf54e('0x2')](_0xf54e('0xd5'),_0xf54e('0xd6'));_0x11883c['texts'][_0xf54e('0x56')]=_0x11883c[_0xf54e('0xd4')]['cartTotal'][_0xf54e('0x2')]('#items',_0xf54e('0xd7'));_0x11883c[_0xf54e('0xd4')][_0xf54e('0x56')]=_0x11883c[_0xf54e('0xd4')]['cartTotal'][_0xf54e('0x2')]('#shipping',_0xf54e('0xd8'));_0x11883c[_0xf54e('0xd4')][_0xf54e('0x56')]=_0x11883c[_0xf54e('0xd4')]['cartTotal']['replace'](_0xf54e('0xd9'),_0xf54e('0xda'));_0x358d33[_0xf54e('0x54')]('.qd-ddc-viewCart')[_0xf54e('0x51')](_0x11883c[_0xf54e('0xd4')]['linkCart']);_0x358d33[_0xf54e('0x54')](_0xf54e('0xdb'))[_0xf54e('0x51')](_0x11883c[_0xf54e('0xd4')][_0xf54e('0xdc')]);_0x358d33[_0xf54e('0x54')]('.qd-ddc-checkout')[_0xf54e('0x51')](_0x11883c[_0xf54e('0xd4')][_0xf54e('0xdd')]);_0x358d33[_0xf54e('0x54')](_0xf54e('0xde'))[_0xf54e('0x51')](_0x11883c[_0xf54e('0xd4')][_0xf54e('0x56')]);_0x358d33[_0xf54e('0x54')](_0xf54e('0xdf'))[_0xf54e('0x51')](_0x11883c[_0xf54e('0xd4')][_0xf54e('0xe0')]);_0x358d33[_0xf54e('0x54')](_0xf54e('0xe1'))[_0xf54e('0x51')](_0x11883c[_0xf54e('0xd4')]['emptyCart']);return _0x358d33;}(this[_0xf54e('0xe2')]);var _0x11c957=0x0;_0x4e3ce0[_0xf54e('0x37')](function(){0x0<_0x11c957?_0x5a7e69['call'](this,_0x3bcd0a[_0xf54e('0xe3')]()):_0x5a7e69[_0xf54e('0x27')](this,_0x3bcd0a);_0x11c957++;});window[_0xf54e('0x39')][_0xf54e('0x43')][_0xf54e('0x2f')](function(){_0x22d3c1('.qd-ddc-infoTotalValue')[_0xf54e('0x51')](window['_QuatroDigital_CartData'][_0xf54e('0x3c')]||'--');_0x22d3c1(_0xf54e('0xe4'))['html'](window[_0xf54e('0x39')][_0xf54e('0x40')]||'0');_0x22d3c1(_0xf54e('0xe5'))[_0xf54e('0x51')](window[_0xf54e('0x39')][_0xf54e('0x3e')]||'--');_0x22d3c1(_0xf54e('0xe6'))[_0xf54e('0x51')](window[_0xf54e('0x39')]['allTotal']||'--');});var _0x1befd7=function(_0x5144f6,_0x1591e5){if(_0xf54e('0x4')===typeof _0x5144f6['items'])return _0x2609ef(_0xf54e('0xe7'));_0x21cb51['renderProductsList'][_0xf54e('0x27')](this,_0x1591e5);};_0x21cb51[_0xf54e('0x8d')]=function(_0x4abf73,_0x41f1ae){_0xf54e('0x4')!=typeof _0x41f1ae?window['_QuatroDigital_DropDown']['dataOptionsCache']=_0x41f1ae:window['_QuatroDigital_DropDown'][_0xf54e('0xe8')]&&(_0x41f1ae=window[_0xf54e('0x5a')][_0xf54e('0xe8')]);setTimeout(function(){window[_0xf54e('0x5a')][_0xf54e('0xe8')]=void 0x0;},_0x11883c[_0xf54e('0x8a')]);_0x22d3c1(_0xf54e('0xe9'))[_0xf54e('0x4c')]('qd-ddc-prodLoaded');if(_0x11883c['smartCheckout']){var _0x3733f5=function(_0x26d3be){window[_0xf54e('0x5a')][_0xf54e('0x26')]=_0x26d3be;_0x1befd7(_0x26d3be,_0x41f1ae);_0xf54e('0x4')!==typeof window['_QuatroDigital_AmountProduct']&&_0xf54e('0xa')===typeof window['_QuatroDigital_AmountProduct']['exec']&&window[_0xf54e('0xea')][_0xf54e('0xeb')][_0xf54e('0x27')](this);_0x22d3c1(_0xf54e('0xe9'))[_0xf54e('0x4a')](_0xf54e('0xec'));};_0xf54e('0x4')!==typeof window['_QuatroDigital_DropDown'][_0xf54e('0x26')]?(_0x3733f5(window[_0xf54e('0x5a')][_0xf54e('0x26')]),_0xf54e('0xa')===typeof _0x4abf73&&_0x4abf73(window[_0xf54e('0x5a')]['getOrderForm'])):_0x22d3c1[_0xf54e('0x5e')]([_0xf54e('0x42'),_0xf54e('0x3a'),_0xf54e('0x5f')],{'done':function(_0x405c1a){_0x3733f5['call'](this,_0x405c1a);'function'===typeof _0x4abf73&&_0x4abf73(_0x405c1a);},'fail':function(_0x395bbc){_0x2609ef([_0xf54e('0xed'),_0x395bbc]);}});}else alert(_0xf54e('0xee'));};_0x21cb51['cartIsEmpty']=function(){var _0x332f43=_0x22d3c1(_0xf54e('0xe9'));_0x332f43[_0xf54e('0x54')](_0xf54e('0xef'))['length']?_0x332f43[_0xf54e('0x4c')](_0xf54e('0xf0')):_0x332f43[_0xf54e('0x4a')]('qd-ddc-noItems');};_0x21cb51[_0xf54e('0xf1')]=function(_0x2fe52e){var _0x3733f5=_0x22d3c1(_0xf54e('0xf2'));_0x3733f5[_0xf54e('0xf3')]();_0x3733f5[_0xf54e('0x37')](function(){var _0x3733f5=_0x22d3c1(this),_0x6d7a6b,_0x51b684,_0x1697b9=_0x22d3c1(''),_0x165685;for(_0x165685 in window[_0xf54e('0x5a')][_0xf54e('0x26')]['items'])if('object'===typeof window['_QuatroDigital_DropDown']['getOrderForm'][_0xf54e('0x42')][_0x165685]){var _0x3ff3cc=window[_0xf54e('0x5a')]['getOrderForm']['items'][_0x165685];var _0xd82fad=_0x3ff3cc['productCategoryIds'][_0xf54e('0x2')](/^\/|\/$/g,'')['split']('/');var _0x54d936=_0x22d3c1(_0xf54e('0xf4'));_0x54d936[_0xf54e('0x35')]({'data-sku':_0x3ff3cc['id'],'data-sku-index':_0x165685,'data-qd-departament':_0xd82fad[0x0],'data-qd-category':_0xd82fad[_0xd82fad['length']-0x1]});_0x54d936[_0xf54e('0x4a')](_0xf54e('0xf5')+_0x3ff3cc[_0xf54e('0xf6')]);_0x54d936[_0xf54e('0x54')]('.qd-ddc-prodName')[_0xf54e('0xf7')](_0x11883c[_0xf54e('0xbe')](_0x3ff3cc));_0x54d936[_0xf54e('0x54')](_0xf54e('0xf8'))[_0xf54e('0xf7')](isNaN(_0x3ff3cc[_0xf54e('0xf9')])?_0x3ff3cc['sellingPrice']:0x0==_0x3ff3cc[_0xf54e('0xf9')]?'Grátis':(_0x22d3c1('meta[name=currency]')[_0xf54e('0x35')]('content')||'R$')+'\x20'+qd_number_format(_0x3ff3cc[_0xf54e('0xf9')]/0x64,0x2,',','.'));_0x54d936[_0xf54e('0x54')]('.qd-ddc-quantity')['attr']({'data-sku':_0x3ff3cc['id'],'data-sku-index':_0x165685})[_0xf54e('0xcf')](_0x3ff3cc['quantity']);_0x54d936[_0xf54e('0x54')](_0xf54e('0xfa'))['attr']({'data-sku':_0x3ff3cc['id'],'data-sku-index':_0x165685});_0x21cb51[_0xf54e('0xfb')](_0x3ff3cc['id'],_0x54d936['find'](_0xf54e('0xfc')),_0x3ff3cc[_0xf54e('0xfd')]);_0x54d936['find'](_0xf54e('0xfe'))[_0xf54e('0x35')]({'data-sku':_0x3ff3cc['id'],'data-sku-index':_0x165685});_0x54d936[_0xf54e('0xff')](_0x3733f5);_0x1697b9=_0x1697b9[_0xf54e('0x2f')](_0x54d936);}try{var _0x793480=_0x3733f5[_0xf54e('0x0')](_0xf54e('0xe9'))[_0xf54e('0x54')](_0xf54e('0xce'));_0x793480['length']&&''==_0x793480['val']()&&window[_0xf54e('0x5a')][_0xf54e('0x26')][_0xf54e('0x5f')][_0xf54e('0x100')]&&_0x793480['val'](window[_0xf54e('0x5a')][_0xf54e('0x26')]['shippingData'][_0xf54e('0x100')][_0xf54e('0x101')]);}catch(_0x2ccfcd){_0x2609ef(_0xf54e('0x102')+_0x2ccfcd[_0xf54e('0x22')],_0xf54e('0x6b'));}_0x21cb51[_0xf54e('0x103')](_0x3733f5);_0x21cb51[_0xf54e('0xd2')]();_0x2fe52e&&_0x2fe52e[_0xf54e('0x104')]&&function(){_0x51b684=_0x1697b9[_0xf54e('0x47')](_0xf54e('0x105')+_0x2fe52e['lastSku']+'\x27]');_0x51b684['length']&&(_0x6d7a6b=0x0,_0x1697b9[_0xf54e('0x37')](function(){var _0x2fe52e=_0x22d3c1(this);if(_0x2fe52e['is'](_0x51b684))return!0x1;_0x6d7a6b+=_0x2fe52e[_0xf54e('0x106')]();}),_0x21cb51[_0xf54e('0xcb')](void 0x0,void 0x0,_0x6d7a6b,_0x3733f5[_0xf54e('0x2f')](_0x3733f5[_0xf54e('0xa6')]())),_0x1697b9['removeClass'](_0xf54e('0x107')),function(_0x260591){_0x260591['addClass'](_0xf54e('0x108'));_0x260591[_0xf54e('0x4a')](_0xf54e('0x107'));setTimeout(function(){_0x260591[_0xf54e('0x4c')]('qd-ddc-lastAdded');},_0x11883c['timeRemoveNewItemClass']);}(_0x51b684));}();});(function(){_QuatroDigital_DropDown[_0xf54e('0x26')][_0xf54e('0x42')][_0xf54e('0x8')]?(_0x22d3c1(_0xf54e('0x70'))['removeClass']('qd-ddc-cart-empty')[_0xf54e('0x4a')](_0xf54e('0x109')),setTimeout(function(){_0x22d3c1(_0xf54e('0x70'))['removeClass'](_0xf54e('0x10a'));},_0x11883c[_0xf54e('0x8a')])):_0x22d3c1(_0xf54e('0x70'))[_0xf54e('0x4c')]('qd-ddc-cart-rendered')[_0xf54e('0x4a')]('qd-ddc-cart-empty');}());_0xf54e('0xa')===typeof _0x11883c[_0xf54e('0x10b')]?_0x11883c[_0xf54e('0x10b')][_0xf54e('0x27')](this):_0x2609ef('callbackProductsList\x20não\x20é\x20uma\x20função');};_0x21cb51[_0xf54e('0xfb')]=function(_0x42713d,_0x1a4071,_0x57f2d2){function _0x456916(){_0x1a4071[_0xf54e('0x4c')](_0xf54e('0x10c'))['load'](function(){_0x22d3c1(this)[_0xf54e('0x4a')](_0xf54e('0x10c'));})[_0xf54e('0x35')](_0xf54e('0x10d'),_0x57f2d2);}_0x57f2d2?_0x456916():isNaN(_0x42713d)?_0x2609ef(_0xf54e('0x10e'),_0xf54e('0x4f')):alert(_0xf54e('0x10f'));};_0x21cb51[_0xf54e('0x103')]=function(_0x16d313){var _0x393b69=function(_0x172a96,_0x437570){var _0x3733f5=_0x22d3c1(_0x172a96);var _0xbcbc01=_0x3733f5[_0xf54e('0x35')](_0xf54e('0x110'));var _0x6d7a6b=_0x3733f5[_0xf54e('0x35')]('data-sku-index');if(_0xbcbc01){var _0x16cd4e=parseInt(_0x3733f5[_0xf54e('0xcf')]())||0x1;_0x21cb51[_0xf54e('0x111')]([_0xbcbc01,_0x6d7a6b],_0x16cd4e,_0x16cd4e+0x1,function(_0x116a50){_0x3733f5[_0xf54e('0xcf')](_0x116a50);_0xf54e('0xa')===typeof _0x437570&&_0x437570();});}};var _0x3733f5=function(_0x3b391f,_0x429793){var _0x3733f5=_0x22d3c1(_0x3b391f);var _0x354f69=_0x3733f5[_0xf54e('0x35')](_0xf54e('0x110'));var _0x6d7a6b=_0x3733f5[_0xf54e('0x35')](_0xf54e('0x112'));if(_0x354f69){var _0x4aa001=parseInt(_0x3733f5[_0xf54e('0xcf')]())||0x2;_0x21cb51[_0xf54e('0x111')]([_0x354f69,_0x6d7a6b],_0x4aa001,_0x4aa001-0x1,function(_0x1ea814){_0x3733f5[_0xf54e('0xcf')](_0x1ea814);'function'===typeof _0x429793&&_0x429793();});}};var _0x28cc9c=function(_0x222f39,_0x50ba9d){var _0x3733f5=_0x22d3c1(_0x222f39);var _0x41da36=_0x3733f5[_0xf54e('0x35')](_0xf54e('0x110'));var _0x6d7a6b=_0x3733f5[_0xf54e('0x35')](_0xf54e('0x112'));if(_0x41da36){var _0x22f8ad=parseInt(_0x3733f5[_0xf54e('0xcf')]())||0x1;_0x21cb51[_0xf54e('0x111')]([_0x41da36,_0x6d7a6b],0x1,_0x22f8ad,function(_0x534b14){_0x3733f5[_0xf54e('0xcf')](_0x534b14);_0xf54e('0xa')===typeof _0x50ba9d&&_0x50ba9d();});}};var _0x6d7a6b=_0x16d313[_0xf54e('0x54')](_0xf54e('0x113'));_0x6d7a6b[_0xf54e('0x4a')](_0xf54e('0x114'))['each'](function(){var _0x16d313=_0x22d3c1(this);_0x16d313[_0xf54e('0x54')](_0xf54e('0x115'))['on'](_0xf54e('0x116'),function(_0x250e4a){_0x250e4a[_0xf54e('0x78')]();_0x6d7a6b[_0xf54e('0x4a')](_0xf54e('0x117'));_0x393b69(_0x16d313[_0xf54e('0x54')](_0xf54e('0x118')),function(){_0x6d7a6b['removeClass'](_0xf54e('0x117'));});});_0x16d313[_0xf54e('0x54')]('.qd-ddc-quantityMinus')['on']('click.qd_ddc_minus',function(_0x3406f6){_0x3406f6[_0xf54e('0x78')]();_0x6d7a6b[_0xf54e('0x4a')](_0xf54e('0x117'));_0x3733f5(_0x16d313[_0xf54e('0x54')](_0xf54e('0x118')),function(){_0x6d7a6b[_0xf54e('0x4c')](_0xf54e('0x117'));});});_0x16d313[_0xf54e('0x54')](_0xf54e('0x118'))['on']('focusout.qd_ddc_change',function(){_0x6d7a6b[_0xf54e('0x4a')](_0xf54e('0x117'));_0x28cc9c(this,function(){_0x6d7a6b['removeClass']('qd-loading');});});_0x16d313[_0xf54e('0x54')](_0xf54e('0x118'))['on']('keyup.qd_ddc_change',function(_0x40d8ab){0xd==_0x40d8ab[_0xf54e('0xc8')]&&(_0x6d7a6b[_0xf54e('0x4a')]('qd-loading'),_0x28cc9c(this,function(){_0x6d7a6b['removeClass'](_0xf54e('0x117'));}));});});_0x16d313['find'](_0xf54e('0xef'))[_0xf54e('0x37')](function(){var _0x16d313=_0x22d3c1(this);_0x16d313[_0xf54e('0x54')](_0xf54e('0xfa'))['on']('click.qd_ddc_remove',function(){_0x16d313['addClass'](_0xf54e('0x117'));_0x21cb51[_0xf54e('0x119')](_0x22d3c1(this),function(_0x497414){_0x497414?_0x16d313[_0xf54e('0x11a')](!0x0)[_0xf54e('0x11b')](function(){_0x16d313[_0xf54e('0x11c')]();_0x21cb51[_0xf54e('0xd2')]();}):_0x16d313[_0xf54e('0x4c')]('qd-loading');});return!0x1;});});};_0x21cb51['shippingCalculate']=function(_0x31e342){var _0x2d2593=_0x31e342['val'](),_0x2d2593=_0x2d2593[_0xf54e('0x2')](/[^0-9\-]/g,''),_0x2d2593=_0x2d2593[_0xf54e('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0xf54e('0x11d')),_0x2d2593=_0x2d2593['replace'](/(.{9}).*/g,'$1');_0x31e342['val'](_0x2d2593);0x9<=_0x2d2593['length']&&(_0x31e342['data']('qdDdcLastPostalCode')!=_0x2d2593&&_0x9936ea['calculateShipping']({'postalCode':_0x2d2593,'country':_0xf54e('0x11e')})[_0xf54e('0x1e')](function(_0x57aeaa){window[_0xf54e('0x5a')][_0xf54e('0x26')]=_0x57aeaa;_0x21cb51[_0xf54e('0x8d')]();})[_0xf54e('0x68')](function(_0xc1eba8){_0x2609ef([_0xf54e('0x11f'),_0xc1eba8]);updateCartData();}),_0x31e342[_0xf54e('0x18')]('qdDdcLastPostalCode',_0x2d2593));};_0x21cb51['changeQantity']=function(_0x4d79d6,_0x2a9c44,_0x27230c,_0x49b62d){function _0x14c385(_0x15a081){_0x15a081=_0xf54e('0x120')!==typeof _0x15a081?!0x1:_0x15a081;_0x21cb51['getCartInfoByUrl']();window[_0xf54e('0x5a')][_0xf54e('0xd1')]=!0x1;_0x21cb51[_0xf54e('0xd2')]();'undefined'!==typeof window[_0xf54e('0xea')]&&'function'===typeof window[_0xf54e('0xea')][_0xf54e('0xeb')]&&window[_0xf54e('0xea')][_0xf54e('0xeb')][_0xf54e('0x27')](this);'function'===typeof adminCart&&adminCart();_0x22d3c1['fn'][_0xf54e('0x2a')](!0x0,void 0x0,_0x15a081);_0xf54e('0xa')===typeof _0x49b62d&&_0x49b62d(_0x2a9c44);}_0x27230c=_0x27230c||0x1;if(0x1>_0x27230c)return _0x2a9c44;if(_0x11883c[_0xf54e('0x59')]){if(_0xf54e('0x4')===typeof window[_0xf54e('0x5a')][_0xf54e('0x26')]['items'][_0x4d79d6[0x1]])return _0x2609ef(_0xf54e('0x121')+_0x4d79d6[0x1]+']'),_0x2a9c44;window[_0xf54e('0x5a')][_0xf54e('0x26')][_0xf54e('0x42')][_0x4d79d6[0x1]][_0xf54e('0x122')]=_0x27230c;window[_0xf54e('0x5a')][_0xf54e('0x26')][_0xf54e('0x42')][_0x4d79d6[0x1]]['index']=_0x4d79d6[0x1];_0x9936ea[_0xf54e('0x123')]([window[_0xf54e('0x5a')][_0xf54e('0x26')][_0xf54e('0x42')][_0x4d79d6[0x1]]],[_0xf54e('0x42'),_0xf54e('0x3a'),_0xf54e('0x5f')])[_0xf54e('0x1e')](function(_0x2ea0bf){window[_0xf54e('0x5a')][_0xf54e('0x26')]=_0x2ea0bf;_0x14c385(!0x0);})[_0xf54e('0x68')](function(_0x126d06){_0x2609ef([_0xf54e('0x124'),_0x126d06]);_0x14c385();});}else _0x2609ef(_0xf54e('0x125'));};_0x21cb51[_0xf54e('0x119')]=function(_0x1e387a,_0x5ee371){function _0x2310f0(_0x28df44){_0x28df44=_0xf54e('0x120')!==typeof _0x28df44?!0x1:_0x28df44;_0xf54e('0x4')!==typeof window[_0xf54e('0xea')]&&_0xf54e('0xa')===typeof window[_0xf54e('0xea')][_0xf54e('0xeb')]&&window[_0xf54e('0xea')][_0xf54e('0xeb')]['call'](this);_0xf54e('0xa')===typeof adminCart&&adminCart();_0x22d3c1['fn'][_0xf54e('0x2a')](!0x0,void 0x0,_0x28df44);'function'===typeof _0x5ee371&&_0x5ee371(_0x6d7a6b);}var _0x6d7a6b=!0x1,_0x4e1f44=_0x22d3c1(_0x1e387a)[_0xf54e('0x35')](_0xf54e('0x112'));if(_0x11883c[_0xf54e('0x59')]){if(_0xf54e('0x4')===typeof window[_0xf54e('0x5a')][_0xf54e('0x26')][_0xf54e('0x42')][_0x4e1f44])return _0x2609ef('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x4e1f44+']'),_0x6d7a6b;window[_0xf54e('0x5a')][_0xf54e('0x26')]['items'][_0x4e1f44][_0xf54e('0x126')]=_0x4e1f44;_0x9936ea[_0xf54e('0x127')]([window[_0xf54e('0x5a')][_0xf54e('0x26')][_0xf54e('0x42')][_0x4e1f44]],['items',_0xf54e('0x3a'),_0xf54e('0x5f')])[_0xf54e('0x1e')](function(_0x504839){_0x6d7a6b=!0x0;window[_0xf54e('0x5a')]['getOrderForm']=_0x504839;_0x1befd7(_0x504839);_0x2310f0(!0x0);})[_0xf54e('0x68')](function(_0x4d5728){_0x2609ef([_0xf54e('0x128'),_0x4d5728]);_0x2310f0();});}else alert(_0xf54e('0x129'));};_0x21cb51[_0xf54e('0xcb')]=function(_0x55c61d,_0x52cc65,_0x57005b,_0x3676e8){_0x3676e8=_0x3676e8||_0x22d3c1(_0xf54e('0x12a'));_0x55c61d=_0x55c61d||'+';_0x52cc65=_0x52cc65||0.9*_0x3676e8[_0xf54e('0x12b')]();_0x3676e8['stop'](!0x0,!0x0)['animate']({'scrollTop':isNaN(_0x57005b)?_0x55c61d+'='+_0x52cc65+'px':_0x57005b});};_0x11883c[_0xf54e('0x12c')]||(_0x21cb51['getCartInfoByUrl'](),_0x22d3c1['fn'][_0xf54e('0x2a')](!0x0));_0x22d3c1(window)['on'](_0xf54e('0x12d'),function(){try{window[_0xf54e('0x5a')][_0xf54e('0x26')]=void 0x0,_0x21cb51[_0xf54e('0x8d')]();}catch(_0x105d14){_0x2609ef('Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20'+_0x105d14[_0xf54e('0x22')],'avisso');}});_0xf54e('0xa')===typeof _0x11883c[_0xf54e('0x43')]?_0x11883c[_0xf54e('0x43')][_0xf54e('0x27')](this):_0x2609ef(_0xf54e('0xa8'));};_0x22d3c1['fn']['QD_dropDownCart']=function(_0xf4f72){var _0x4c08f2=_0x22d3c1(this);_0x4c08f2['fn']=new _0x22d3c1[(_0xf54e('0xb5'))](this,_0xf4f72);return _0x4c08f2;};}catch(_0x14afbb){_0xf54e('0x4')!==typeof console&&_0xf54e('0xa')===typeof console['error']&&console[_0xf54e('0x14')](_0xf54e('0x65'),_0x14afbb);}}(this));(function(_0x931112){try{var _0x2e7e95=jQuery;window[_0xf54e('0xea')]=window[_0xf54e('0xea')]||{};window[_0xf54e('0xea')][_0xf54e('0x42')]={};window[_0xf54e('0xea')]['allowRecalculate']=!0x1;window[_0xf54e('0xea')][_0xf54e('0x12e')]=!0x1;window['_QuatroDigital_AmountProduct'][_0xf54e('0x12f')]=!0x1;var _0xea94a=function(){if(window['_QuatroDigital_AmountProduct'][_0xf54e('0x130')]){var _0x354c1e=!0x1;var _0x931112={};window[_0xf54e('0xea')]['items']={};for(_0x50f855 in window[_0xf54e('0x5a')][_0xf54e('0x26')]['items'])if(_0xf54e('0x2b')===typeof window[_0xf54e('0x5a')][_0xf54e('0x26')]['items'][_0x50f855]){var _0x2f2ff9=window[_0xf54e('0x5a')][_0xf54e('0x26')][_0xf54e('0x42')][_0x50f855];_0xf54e('0x4')!==typeof _0x2f2ff9[_0xf54e('0x131')]&&null!==_0x2f2ff9['productId']&&''!==_0x2f2ff9[_0xf54e('0x131')]&&(window['_QuatroDigital_AmountProduct'][_0xf54e('0x42')][_0xf54e('0x132')+_0x2f2ff9['productId']]=window[_0xf54e('0xea')]['items'][_0xf54e('0x132')+_0x2f2ff9[_0xf54e('0x131')]]||{},window[_0xf54e('0xea')]['items'][_0xf54e('0x132')+_0x2f2ff9['productId']][_0xf54e('0x133')]=_0x2f2ff9['productId'],_0x931112[_0xf54e('0x132')+_0x2f2ff9[_0xf54e('0x131')]]||(window[_0xf54e('0xea')][_0xf54e('0x42')][_0xf54e('0x132')+_0x2f2ff9[_0xf54e('0x131')]][_0xf54e('0x40')]=0x0),window['_QuatroDigital_AmountProduct'][_0xf54e('0x42')][_0xf54e('0x132')+_0x2f2ff9[_0xf54e('0x131')]][_0xf54e('0x40')]+=_0x2f2ff9['quantity'],_0x354c1e=!0x0,_0x931112[_0xf54e('0x132')+_0x2f2ff9[_0xf54e('0x131')]]=!0x0);}var _0x50f855=_0x354c1e;}else _0x50f855=void 0x0;window[_0xf54e('0xea')]['allowRecalculate']&&(_0x2e7e95(_0xf54e('0x134'))[_0xf54e('0x11c')](),_0x2e7e95('.qd-bap-item-added')[_0xf54e('0x4c')]('qd-bap-item-added'));for(var _0x12da5a in window[_0xf54e('0xea')]['items']){_0x2f2ff9=window[_0xf54e('0xea')][_0xf54e('0x42')][_0x12da5a];if(_0xf54e('0x2b')!==typeof _0x2f2ff9)return;_0x931112=_0x2e7e95(_0xf54e('0x135')+_0x2f2ff9['prodId']+']')[_0xf54e('0x0')]('li');if(window['_QuatroDigital_AmountProduct']['allowRecalculate']||!_0x931112['find'](_0xf54e('0x134'))[_0xf54e('0x8')])_0x354c1e=_0x2e7e95(_0xf54e('0x136')),_0x354c1e[_0xf54e('0x54')](_0xf54e('0x137'))[_0xf54e('0x51')](_0x2f2ff9[_0xf54e('0x40')]),_0x2f2ff9=_0x931112[_0xf54e('0x54')](_0xf54e('0x138')),_0x2f2ff9['length']?_0x2f2ff9[_0xf54e('0xaa')](_0x354c1e)[_0xf54e('0x4a')](_0xf54e('0x139')):_0x931112[_0xf54e('0xaa')](_0x354c1e);}_0x50f855&&(window[_0xf54e('0xea')]['allowRecalculate']=!0x1);};window[_0xf54e('0xea')]['exec']=function(){window[_0xf54e('0xea')]['allowRecalculate']=!0x0;_0xea94a[_0xf54e('0x27')](this);};_0x2e7e95(document)['ajaxStop'](function(){_0xea94a[_0xf54e('0x27')](this);});}catch(_0x566c73){_0xf54e('0x4')!==typeof console&&_0xf54e('0xa')===typeof console[_0xf54e('0x14')]&&console[_0xf54e('0x14')](_0xf54e('0x65'),_0x566c73);}}(this));(function(){try{var _0x48cfe9=jQuery,_0x32e0cb,_0xf88d47={'selector':'.qdDdcContainer','dropDown':{},'buyButton':{}};_0x48cfe9[_0xf54e('0x13a')]=function(_0x2b6129){var _0xb02787={};_0x32e0cb=_0x48cfe9[_0xf54e('0x15')](!0x0,{},_0xf88d47,_0x2b6129);_0x2b6129=_0x48cfe9(_0x32e0cb['selector'])[_0xf54e('0xb5')](_0x32e0cb[_0xf54e('0x13b')]);_0xb02787[_0xf54e('0x8f')]=_0xf54e('0x4')!==typeof _0x32e0cb[_0xf54e('0x13b')][_0xf54e('0x12c')]&&!0x1===_0x32e0cb[_0xf54e('0x13b')][_0xf54e('0x12c')]?_0x48cfe9(_0x32e0cb[_0xf54e('0x82')])[_0xf54e('0x76')](_0x2b6129['fn'],_0x32e0cb[_0xf54e('0x8f')]):_0x48cfe9(_0x32e0cb['selector'])[_0xf54e('0x76')](_0x32e0cb['buyButton']);_0xb02787['dropDown']=_0x2b6129;return _0xb02787;};_0x48cfe9['fn'][_0xf54e('0x13c')]=function(){'object'===typeof console&&_0xf54e('0xa')===typeof console['info']&&console[_0xf54e('0x2e')]('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x48cfe9['smartCart']=_0x48cfe9['fn'][_0xf54e('0x13c')];}catch(_0x35d8bf){_0xf54e('0x4')!==typeof console&&_0xf54e('0xa')===typeof console['error']&&console[_0xf54e('0x14')]('Oooops!\x20',_0x35d8bf);}}());

/* Quatro Digital - Product Thumbs // Carlos Vinicius // Todos os direitos reservados. */
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs();a.trigger("QuatroDigital.pt_callback",[a])}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return a.length?$.extend({},a,new b(a)):a},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0xcfca=['\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','bind','click.playVideo','.ON','controlVideo','.qd-playerWrapper\x20iframe','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','attr','rel','click','contentWindow','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','insertThumbsIn','appendTo','trigger','QuatroDigital.pv_video_added','ajaxStop','load','ImageControl','.qd-videoLink','body','object','undefined','alerta','toLowerCase','warn','[Video\x20in\x20product]\x20','info','error','qdVideoInProduct','start','http','ul.thumbs','div#image','videoFieldSelector','text','replace','split','length','indexOf','youtube','push','shift','youtu.be','be/','<div\x20class=\x22qd-playerWrapper\x22></div>','prependTo','#include','wrap','<div\x20class=\x22qd-playerContainer\x22></div>','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','join','toUpperCase','ite','---','erc','html','<iframe\x20src=\x22','urlProtocol','://www.youtube.com/embed/','?wmode=transparent&rel=0&enablejsapi=1\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>','data','height','fadeTo','addClass','qdpv-video-on','stop','add','animate','find','a:not(\x27.qd-videoLink\x27)','click.removeVideo','hide','removeAttr','style','removeClass','call','string','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27'];(function(_0x20a584,_0xe384a5){var _0x4b41a8=function(_0x2127c6){while(--_0x2127c6){_0x20a584['push'](_0x20a584['shift']());}};_0x4b41a8(++_0xe384a5);}(_0xcfca,0x6a));var _0xacfc=function(_0x4f3e43,_0x18a005){_0x4f3e43=_0x4f3e43-0x0;var _0x1d7711=_0xcfca[_0x4f3e43];return _0x1d7711;};(function(_0x473872){$(function(){if($(document[_0xacfc('0x0')])['is']('.produto')){var _0x3fc132=[];var _0x338156=function(_0x2a6bb2,_0x3d612b){_0xacfc('0x1')===typeof console&&(_0xacfc('0x2')!==typeof _0x3d612b&&_0xacfc('0x3')===_0x3d612b[_0xacfc('0x4')]()?console[_0xacfc('0x5')](_0xacfc('0x6')+_0x2a6bb2):_0xacfc('0x2')!==typeof _0x3d612b&&_0xacfc('0x7')===_0x3d612b[_0xacfc('0x4')]()?console['info'](_0xacfc('0x6')+_0x2a6bb2):console[_0xacfc('0x8')]('[Video\x20in\x20product]\x20'+_0x2a6bb2));};window[_0xacfc('0x9')]=window['qdVideoInProduct']||{};var _0x43594f=$['extend'](!0x0,{'insertThumbsIn':_0xacfc('0xa'),'videoFieldSelector':'td.value-field.Videos:first','controlVideo':!0x0,'urlProtocol':_0xacfc('0xb')},window['qdVideoInProduct']);var _0x1b242e=$(_0xacfc('0xc'));var _0x36579b=$(_0xacfc('0xd'));var _0x567d0d=$(_0x43594f[_0xacfc('0xe')])[_0xacfc('0xf')]()[_0xacfc('0x10')](/\;\s*/,';')[_0xacfc('0x11')](';');for(var _0x3dd9f4=0x0;_0x3dd9f4<_0x567d0d[_0xacfc('0x12')];_0x3dd9f4++)-0x1<_0x567d0d[_0x3dd9f4][_0xacfc('0x13')](_0xacfc('0x14'))?_0x3fc132[_0xacfc('0x15')](_0x567d0d[_0x3dd9f4][_0xacfc('0x11')]('v=')['pop']()['split'](/[&#]/)[_0xacfc('0x16')]()):-0x1<_0x567d0d[_0x3dd9f4]['indexOf'](_0xacfc('0x17'))&&_0x3fc132[_0xacfc('0x15')](_0x567d0d[_0x3dd9f4][_0xacfc('0x11')](_0xacfc('0x18'))['pop']()[_0xacfc('0x11')](/[\?&#]/)['shift']());var _0x3be89b=$(_0xacfc('0x19'));_0x3be89b[_0xacfc('0x1a')](_0xacfc('0x1b'));_0x3be89b[_0xacfc('0x1c')](_0xacfc('0x1d'));_0x567d0d=function(_0x1ba20a){var _0x32015c={'t':_0xacfc('0x1e')};return function(_0x2fd80f){var _0x3342e5=function(_0x11e680){return _0x11e680;};var _0x560244=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2fd80f=_0x2fd80f['d'+_0x560244[0x10]+'c'+_0x560244[0x11]+'m'+_0x3342e5(_0x560244[0x1])+'n'+_0x560244[0xd]]['l'+_0x560244[0x12]+'c'+_0x560244[0x0]+'ti'+_0x3342e5('o')+'n'];var _0x1f3c99=function(_0x5b872e){return escape(encodeURIComponent(_0x5b872e[_0xacfc('0x10')](/\./g,'¨')[_0xacfc('0x10')](/[a-zA-Z]/g,function(_0x3d4f2a){return String[_0xacfc('0x1f')](('Z'>=_0x3d4f2a?0x5a:0x7a)>=(_0x3d4f2a=_0x3d4f2a[_0xacfc('0x20')](0x0)+0xd)?_0x3d4f2a:_0x3d4f2a-0x1a);})));};var _0x186f92=_0x1f3c99(_0x2fd80f[[_0x560244[0x9],_0x3342e5('o'),_0x560244[0xc],_0x560244[_0x3342e5(0xd)]][_0xacfc('0x21')]('')]);_0x1f3c99=_0x1f3c99((window[['js',_0x3342e5('no'),'m',_0x560244[0x1],_0x560244[0x4][_0xacfc('0x22')](),_0xacfc('0x23')][_0xacfc('0x21')]('')]||_0xacfc('0x24'))+['.v',_0x560244[0xd],'e',_0x3342e5('x'),'co',_0x3342e5('mm'),_0xacfc('0x25'),_0x560244[0x1],'.c',_0x3342e5('o'),'m.',_0x560244[0x13],'r'][_0xacfc('0x21')](''));for(var _0x318a38 in _0x32015c){if(_0x1f3c99===_0x318a38+_0x32015c[_0x318a38]||_0x186f92===_0x318a38+_0x32015c[_0x318a38]){var _0x4429c2='tr'+_0x560244[0x11]+'e';break;}_0x4429c2='f'+_0x560244[0x0]+'ls'+_0x3342e5(_0x560244[0x1])+'';}_0x3342e5=!0x1;-0x1<_0x2fd80f[[_0x560244[0xc],'e',_0x560244[0x0],'rc',_0x560244[0x9]][_0xacfc('0x21')]('')]['indexOf']('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x3342e5=!0x0);return[_0x4429c2,_0x3342e5];}(_0x1ba20a);}(window);if(!eval(_0x567d0d[0x0]))return _0x567d0d[0x1]?_0x338156('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0xa9f7c=function(_0x310fd9,_0x3de904){'youtube'===_0x3de904&&_0x3be89b[_0xacfc('0x26')](_0xacfc('0x27')+_0x43594f[_0xacfc('0x28')]+_0xacfc('0x29')+_0x310fd9+_0xacfc('0x2a'));_0x36579b['data']('height',_0x36579b[_0xacfc('0x2b')](_0xacfc('0x2c'))||_0x36579b['height']());_0x36579b['stop'](!0x0,!0x0)[_0xacfc('0x2d')](0x1f4,0x0,function(){$('body')[_0xacfc('0x2e')](_0xacfc('0x2f'));});_0x3be89b[_0xacfc('0x30')](!0x0,!0x0)['fadeTo'](0x1f4,0x1,function(){_0x36579b[_0xacfc('0x31')](_0x3be89b)[_0xacfc('0x32')]({'height':_0x3be89b[_0xacfc('0x33')]('iframe')[_0xacfc('0x2c')]()},0x2bc);});};removePlayer=function(){_0x1b242e['find'](_0xacfc('0x34'))['bind'](_0xacfc('0x35'),function(){_0x3be89b[_0xacfc('0x30')](!0x0,!0x0)[_0xacfc('0x2d')](0x1f4,0x0,function(){$(this)[_0xacfc('0x36')]()[_0xacfc('0x37')](_0xacfc('0x38'));$(_0xacfc('0x0'))[_0xacfc('0x39')](_0xacfc('0x2f'));});_0x36579b['stop'](!0x0,!0x0)[_0xacfc('0x2d')](0x1f4,0x1,function(){var _0x26bfaa=_0x36579b['data'](_0xacfc('0x2c'));_0x26bfaa&&_0x36579b['animate']({'height':_0x26bfaa},0x2bc);});});};var _0x1f6dc1=function(){if(!_0x1b242e[_0xacfc('0x33')]('.qd-videoItem')[_0xacfc('0x12')])for(vId in removePlayer[_0xacfc('0x3a')](this),_0x3fc132)if(_0xacfc('0x3b')===typeof _0x3fc132[vId]&&''!==_0x3fc132[vId]){var _0x3506e0=$(_0xacfc('0x3c')+_0x3fc132[vId]+_0xacfc('0x3d')+_0x3fc132[vId]+_0xacfc('0x3e')+_0x3fc132[vId]+_0xacfc('0x3f'));_0x3506e0[_0xacfc('0x33')]('a')[_0xacfc('0x40')](_0xacfc('0x41'),function(){var _0x45993b=$(this);_0x1b242e[_0xacfc('0x33')](_0xacfc('0x42'))['removeClass']('ON');_0x45993b[_0xacfc('0x2e')]('ON');0x1==_0x43594f[_0xacfc('0x43')]?$('.qd-playerWrapper\x20iframe')[_0xacfc('0x12')]?(_0xa9f7c[_0xacfc('0x3a')](this,'',''),$(_0xacfc('0x44'))[0x0]['contentWindow'][_0xacfc('0x45')](_0xacfc('0x46'),'*')):_0xa9f7c[_0xacfc('0x3a')](this,_0x45993b[_0xacfc('0x47')](_0xacfc('0x48')),_0xacfc('0x14')):_0xa9f7c['call'](this,_0x45993b[_0xacfc('0x47')]('rel'),'youtube');return!0x1;});0x1==_0x43594f[_0xacfc('0x43')]&&_0x1b242e[_0xacfc('0x33')]('a:not(.qd-videoLink)')[_0xacfc('0x49')](function(_0x53ecf2){$(_0xacfc('0x44'))[_0xacfc('0x12')]&&$('.qd-playerWrapper\x20iframe')[0x0][_0xacfc('0x4a')][_0xacfc('0x45')](_0xacfc('0x4b'),'*');});_0xacfc('0xa')===_0x43594f[_0xacfc('0x4c')]?_0x3506e0[_0xacfc('0x1a')](_0x1b242e):_0x3506e0[_0xacfc('0x4d')](_0x1b242e);_0x3506e0[_0xacfc('0x4e')](_0xacfc('0x4f'),[_0x3fc132[vId],_0x3506e0]);}};$(document)[_0xacfc('0x50')](_0x1f6dc1);$(window)[_0xacfc('0x51')](_0x1f6dc1);(function(){var _0x463321=this;var _0x3e0ec6=window[_0xacfc('0x52')]||function(){};window[_0xacfc('0x52')]=function(_0x1cf338,_0x47da78){$(_0x1cf338||'')['is'](_0xacfc('0x53'))||(_0x3e0ec6[_0xacfc('0x3a')](this,_0x1cf338,_0x47da78),_0x1f6dc1[_0xacfc('0x3a')](_0x463321));};}());}});}(this));

/* Quatro Digital - Mosaic Banners // Carlos Vinicius // Todos os direitos reservados */
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

