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
			var closedHeight = $('.home-qd-v1-special-links').outerHeight();
			var maxheight = $('.home-qd-v1-special-links >ul').height();

			$('.home-qd-v1-special-links ul[itemscope="itemscope"] >li:first-child').click(function() {
				var $t = $('.home-qd-v1-special-links');

				if ($t.outerHeight() == closedHeight) {
					$t.animate({
						height: maxheight
					});
				}
				else {
					$t.animate({
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
		setBuyUrl : function(){
			var btns = $(".kit-item-row:not('.qd-state-not-selected, .qd-item-unavailable') .buy-in-page-button");
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
				$(".product-buy-button a").attr( "href", "/checkout/cart/add?" + uri.join("&") + "&" + ( btns.first().attr("href").match(/sc=[0-9]+/i) || [""] )[0] );
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
var _0x2462=['listPrice','.qd_productOldPrice','trim','qd-active','qd-sp-active','.qd_displayPrice','.qd-sp-display-discount','html','installments','changeInstallments','.qd_sp_display_installments','.qd_sp_display_installmentValue','.qd_sp_installments','.qd_saveAmount','append','.qd_saveAmountPercent','each','skuSelected.vtex','qd_sp_processedItem','call','string','.qd_sp_processedItem','.qd_productPrice:not(.qd_sp_processedItem)','forcePromotion','style','boolean','body','.produto','prototype','replace','abs','undefined','round','toFixed','split','length','join','QD_SmartPrice','Smart\x20Price','object','function','error','info','warn','unshift','toLowerCase','apply','search','text','.flag','auto','.productRightColumn','strong.skuBestPrice','label.skuBestInstallmentNumber','label.skuBestInstallmentValue','strong.skuPrice','fromCharCode','charCodeAt','toUpperCase','ite','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','productPage','isProductPage','closest','wrapperElement','skuBestPrice','addClass','.qd_sp_on,\x20.qd_sp_ignored','find','.qd_active','removeClass','oneFlagByItem','siblings','.qd_sp_on','qd_sp_ignored','isDiscountFlag','div[skuCorrente]:first','attr','skuCorrente','skus','bestPrice','isSmartCheckout','available','getDiscountValue','O\x20valor\x20informado\x20p/\x20o\x20desconto\x20não\x20é\x20um\x20número.','alerta','.qd_productPrice','val','appliedDiscount'];(function(_0x5b7788,_0x309ae5){var _0x573871=function(_0x5c79fd){while(--_0x5c79fd){_0x5b7788['push'](_0x5b7788['shift']());}};_0x573871(++_0x309ae5);}(_0x2462,0x77));var _0x2246=function(_0x290b51,_0x56a6e5){_0x290b51=_0x290b51-0x0;var _0x1084c4=_0x2462[_0x290b51];return _0x1084c4;};'function'!==typeof String[_0x2246('0x0')]['trim']&&(String[_0x2246('0x0')]['trim']=function(){return this[_0x2246('0x1')](/^\s+|\s+$/g,'');});function qd_number_format(_0x1f7a6f,_0x16273c,_0x59be50,_0x25e945){_0x1f7a6f=(_0x1f7a6f+'')[_0x2246('0x1')](/[^0-9+\-Ee.]/g,'');_0x1f7a6f=isFinite(+_0x1f7a6f)?+_0x1f7a6f:0x0;_0x16273c=isFinite(+_0x16273c)?Math[_0x2246('0x2')](_0x16273c):0x0;_0x25e945=_0x2246('0x3')===typeof _0x25e945?',':_0x25e945;_0x59be50='undefined'===typeof _0x59be50?'.':_0x59be50;var _0x1998cf='',_0x1998cf=function(_0xf902eb,_0xc72fc5){var _0x16273c=Math['pow'](0xa,_0xc72fc5);return''+(Math[_0x2246('0x4')](_0xf902eb*_0x16273c)/_0x16273c)[_0x2246('0x5')](_0xc72fc5);},_0x1998cf=(_0x16273c?_0x1998cf(_0x1f7a6f,_0x16273c):''+Math[_0x2246('0x4')](_0x1f7a6f))[_0x2246('0x6')]('.');0x3<_0x1998cf[0x0]['length']&&(_0x1998cf[0x0]=_0x1998cf[0x0][_0x2246('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x25e945));(_0x1998cf[0x1]||'')['length']<_0x16273c&&(_0x1998cf[0x1]=_0x1998cf[0x1]||'',_0x1998cf[0x1]+=Array(_0x16273c-_0x1998cf[0x1][_0x2246('0x7')]+0x1)[_0x2246('0x8')]('0'));return _0x1998cf[_0x2246('0x8')](_0x59be50);};(function(_0x36f701){'use strict';var _0x2061fa=jQuery;if(typeof _0x2061fa['fn'][_0x2246('0x9')]==='function')return;var _0x29d4a9=_0x2246('0xa');var _0x3b3c7e=function(_0x1dce48,_0x52edef){if(_0x2246('0xb')===typeof console&&_0x2246('0xc')===typeof console[_0x2246('0xd')]&&_0x2246('0xc')===typeof console[_0x2246('0xe')]&&'function'===typeof console[_0x2246('0xf')]){var _0xddc4a8;'object'===typeof _0x1dce48?(_0x1dce48[_0x2246('0x10')]('['+_0x29d4a9+']\x0a'),_0xddc4a8=_0x1dce48):_0xddc4a8=['['+_0x29d4a9+']\x0a'+_0x1dce48];if('undefined'===typeof _0x52edef||'alerta'!==_0x52edef[_0x2246('0x11')]()&&'aviso'!==_0x52edef[_0x2246('0x11')]())if(_0x2246('0x3')!==typeof _0x52edef&&'info'===_0x52edef['toLowerCase']())try{console[_0x2246('0xe')][_0x2246('0x12')](console,_0xddc4a8);}catch(_0x435e1c){console[_0x2246('0xe')](_0xddc4a8[_0x2246('0x8')]('\x0a'));}else try{console[_0x2246('0xd')][_0x2246('0x12')](console,_0xddc4a8);}catch(_0x370000){console[_0x2246('0xd')](_0xddc4a8[_0x2246('0x8')]('\x0a'));}else try{console['warn'][_0x2246('0x12')](console,_0xddc4a8);}catch(_0x54d939){console['warn'](_0xddc4a8[_0x2246('0x8')]('\x0a'));}}};var _0x214ff2=/[0-9]+\%/i;var _0x34de0d=/[0-9\.]+(?=\%)/i;var _0x35a90c={'isDiscountFlag':function(_0x44bf6f){if(_0x44bf6f['text']()[_0x2246('0x13')](_0x214ff2)>-0x1)return!![];return![];},'getDiscountValue':function(_0xc92128){return _0xc92128[_0x2246('0x14')]()['match'](_0x34de0d);},'startedByWrapper':![],'flagElement':_0x2246('0x15'),'wrapperElement':'li','filterFlagBy':'[class*=\x27desconto\x27]','forcePromotion':null,'appliedDiscount':null,'oneFlagByItem':!![],'isSmartCheckout':!![],'changeInstallments':![],'productPage':{'changeNativeSaveAmount':!![],'changeNativePrice':!![],'changeInstallments':![],'isProductPage':_0x2246('0x16'),'wrapperElement':_0x2246('0x17'),'skuBestPrice':_0x2246('0x18'),'installments':_0x2246('0x19'),'installmentValue':_0x2246('0x1a'),'skuPrice':_0x2246('0x1b')}};_0x2061fa['fn'][_0x2246('0x9')]=function(){};var _0x1f6fdf=function(_0xc6b604){var _0x77a27d={'t':'nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x49427f){var _0x23e294,_0x23083f,_0x13072f,_0x4d941c;_0x23083f=function(_0x2ead15){return _0x2ead15;};_0x13072f=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x49427f=_0x49427f['d'+_0x13072f[0x10]+'c'+_0x13072f[0x11]+'m'+_0x23083f(_0x13072f[0x1])+'n'+_0x13072f[0xd]]['l'+_0x13072f[0x12]+'c'+_0x13072f[0x0]+'ti'+_0x23083f('o')+'n'];_0x23e294=function(_0x3b3d73){return escape(encodeURIComponent(_0x3b3d73[_0x2246('0x1')](/\./g,'¨')[_0x2246('0x1')](/[a-zA-Z]/g,function(_0x339b68){return String[_0x2246('0x1c')](('Z'>=_0x339b68?0x5a:0x7a)>=(_0x339b68=_0x339b68[_0x2246('0x1d')](0x0)+0xd)?_0x339b68:_0x339b68-0x1a);})));};var _0x81f65b=_0x23e294(_0x49427f[[_0x13072f[0x9],_0x23083f('o'),_0x13072f[0xc],_0x13072f[_0x23083f(0xd)]]['join']('')]);_0x23e294=_0x23e294((window[['js',_0x23083f('no'),'m',_0x13072f[0x1],_0x13072f[0x4][_0x2246('0x1e')](),_0x2246('0x1f')][_0x2246('0x8')]('')]||'---')+['.v',_0x13072f[0xd],'e',_0x23083f('x'),'co',_0x23083f('mm'),'erc',_0x13072f[0x1],'.c',_0x23083f('o'),'m.',_0x13072f[0x13],'r']['join'](''));for(var _0x439556 in _0x77a27d){if(_0x23e294===_0x439556+_0x77a27d[_0x439556]||_0x81f65b===_0x439556+_0x77a27d[_0x439556]){_0x4d941c='tr'+_0x13072f[0x11]+'e';break;}_0x4d941c='f'+_0x13072f[0x0]+'ls'+_0x23083f(_0x13072f[0x1])+'';}_0x23083f=!0x1;-0x1<_0x49427f[[_0x13072f[0xc],'e',_0x13072f[0x0],'rc',_0x13072f[0x9]][_0x2246('0x8')]('')][_0x2246('0x20')](_0x2246('0x21'))&&(_0x23083f=!0x0);return[_0x4d941c,_0x23083f];}(_0xc6b604);}(window);if(!eval(_0x1f6fdf[0x0]))return _0x1f6fdf[0x1]?_0x3b3c7e(_0x2246('0x22')):!0x1;var _0x36dbf8=function(_0x1d3ccf,_0x18ad7e){'use strict';var _0x5ba609=function(_0x578094){'use strict';var _0x17d6f6,_0x3e4f7d,_0x29bb37,_0x137f4d,_0x147c08,_0x29f81c,_0x24c0b4,_0x45d191,_0x69aa45,_0x31131f,_0x57415a,_0x788cff,_0x19e3f6,_0x3aa946,_0x57d68f,_0xb7b8aa,_0x3d34cc,_0x1edc91,_0x29576f;var _0x109363=_0x2061fa(this);_0x578094=typeof _0x578094===_0x2246('0x3')?![]:_0x578094;if(_0x18ad7e[_0x2246('0x23')][_0x2246('0x24')])var _0x22fdb3=_0x109363[_0x2246('0x25')](_0x18ad7e[_0x2246('0x23')][_0x2246('0x26')]);else var _0x22fdb3=_0x109363[_0x2246('0x25')](_0x18ad7e[_0x2246('0x26')]);if(!_0x578094&&!_0x109363['is'](_0x18ad7e['filterFlagBy'])){if(_0x18ad7e[_0x2246('0x23')][_0x2246('0x24')]&&_0x22fdb3['is'](_0x18ad7e['productPage'][_0x2246('0x26')])){_0x22fdb3['find'](_0x18ad7e[_0x2246('0x23')][_0x2246('0x27')])[_0x2246('0x28')]('qd-active');_0x22fdb3[_0x2246('0x28')]('qd-sp-active');}return;}var _0x27d57e=_0x18ad7e[_0x2246('0x23')][_0x2246('0x24')];if(_0x109363['is'](_0x2246('0x29'))&&!_0x27d57e)return;if(_0x27d57e){_0x45d191=_0x22fdb3['find'](_0x18ad7e[_0x2246('0x23')][_0x2246('0x27')]);if(_0x45d191[_0x2246('0x2a')](_0x2246('0x2b'))[_0x2246('0x7')])return;_0x45d191[_0x2246('0x2c')]('qd-active');_0x22fdb3[_0x2246('0x2c')]('qd-sp-active');}if(_0x18ad7e[_0x2246('0x2d')]&&_0x109363[_0x2246('0x2e')](_0x2246('0x2f'))[_0x2246('0x7')]){_0x109363['addClass'](_0x2246('0x30'));return;}_0x109363[_0x2246('0x28')]('qd_sp_on');if(!_0x18ad7e[_0x2246('0x31')](_0x109363))return;if(_0x27d57e){_0x29bb37={};var _0x2e5cf5=parseInt(_0x2061fa(_0x2246('0x32'))[_0x2246('0x33')](_0x2246('0x34')),0xa);if(_0x2e5cf5){for(var _0x4de35e=0x0;_0x4de35e<skuJson[_0x2246('0x35')][_0x2246('0x7')];_0x4de35e++){if(skuJson['skus'][_0x4de35e]['sku']==_0x2e5cf5){_0x29bb37=skuJson[_0x2246('0x35')][_0x4de35e];break;}}}else{var _0x31681b=0x5af3107a3fff;for(var _0x22fab3 in skuJson[_0x2246('0x35')]){if(typeof skuJson[_0x2246('0x35')][_0x22fab3]===_0x2246('0xc'))continue;if(!skuJson[_0x2246('0x35')][_0x22fab3]['available'])continue;if(skuJson[_0x2246('0x35')][_0x22fab3][_0x2246('0x36')]<_0x31681b){_0x31681b=skuJson[_0x2246('0x35')][_0x22fab3][_0x2246('0x36')];_0x29bb37=skuJson[_0x2246('0x35')][_0x22fab3];}}}}_0xb7b8aa=!![];_0x3d34cc=0x0;if(_0x18ad7e[_0x2246('0x37')]&&_0x1edc91){_0xb7b8aa=skuJson[_0x2246('0x38')];if(!_0xb7b8aa)return _0x22fdb3[_0x2246('0x28')]('qd-sp-product-unavailable');}_0x3e4f7d=_0x18ad7e[_0x2246('0x39')](_0x109363);_0x17d6f6=parseFloat(_0x3e4f7d,0xa);if(isNaN(_0x17d6f6))return _0x3b3c7e([_0x2246('0x3a'),_0x109363],_0x2246('0x3b'));var _0x2ec61a=function(_0x46b10d){if(_0x27d57e)_0x137f4d=(_0x46b10d[_0x2246('0x36')]||0x0)/0x64;else{_0x19e3f6=_0x22fdb3['find'](_0x2246('0x3c'));_0x137f4d=parseFloat((_0x19e3f6[_0x2246('0x3d')]()||'')[_0x2246('0x1')](/[^0-9\.\,]+/i,'')[_0x2246('0x1')]('.','')[_0x2246('0x1')](',','.'),0xa);}if(isNaN(_0x137f4d))return _0x3b3c7e(['Por\x20alguma\x20razão\x20não\x20consegui\x20obter\x20o\x20preço\x20deste\x20produto\x20:(',_0x109363,_0x22fdb3]);if(_0x18ad7e[_0x2246('0x3e')]!==null){_0x3aa946=0x0;if(!isNaN(_0x18ad7e[_0x2246('0x3e')]))_0x3aa946=_0x18ad7e[_0x2246('0x3e')];else{_0x57d68f=_0x22fdb3['find'](_0x18ad7e[_0x2246('0x3e')]);if(_0x57d68f['length'])_0x3aa946=_0x18ad7e['getDiscountValue'](_0x57d68f);}_0x3aa946=parseFloat(_0x3aa946,0xa);if(isNaN(_0x3aa946))_0x3aa946=0x0;if(_0x3aa946!==0x0)_0x137f4d=_0x137f4d*0x64/(0x64-_0x3aa946);}if(_0x27d57e)_0x147c08=(_0x46b10d[_0x2246('0x3f')]||0x0)/0x64;else _0x147c08=parseFloat((_0x22fdb3[_0x2246('0x2a')](_0x2246('0x40'))[_0x2246('0x3d')]()||'')[_0x2246('0x1')](/[^0-9\.\,]+/i,'')['replace']('.','')['replace'](',','.'),0xa);if(isNaN(_0x147c08))_0x147c08=0.001;_0x29f81c=_0x137f4d*((0x64-_0x17d6f6)/0x64);if(_0x27d57e&&_0x18ad7e[_0x2246('0x23')]['changeNativePrice']){_0x45d191[_0x2246('0x14')](_0x45d191['text']()[_0x2246('0x41')]()[_0x2246('0x1')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x29f81c,0x2,',','.')))['addClass'](_0x2246('0x42'));_0x22fdb3[_0x2246('0x28')](_0x2246('0x43'));}else{_0x29576f=_0x22fdb3['find'](_0x2246('0x44'));_0x29576f[_0x2246('0x14')](_0x29576f[_0x2246('0x14')]()[_0x2246('0x1')](/[0-9\.]+,[0-9]+/i,'')+qd_number_format(_0x29f81c,0x2,',','.'));}if(_0x27d57e){_0x24c0b4=_0x22fdb3[_0x2246('0x2a')](_0x18ad7e[_0x2246('0x23')]['skuPrice']);if(_0x24c0b4[_0x2246('0x7')])_0x24c0b4[_0x2246('0x14')](_0x24c0b4[_0x2246('0x14')]()[_0x2246('0x41')]()[_0x2246('0x1')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x29f81c,0x2,',','.')));}var _0x563b37=_0x22fdb3[_0x2246('0x2a')](_0x2246('0x45'));_0x563b37[_0x2246('0x14')](_0x563b37[_0x2246('0x14')]()[_0x2246('0x1')](/[0-9]+\%/i,_0x17d6f6+'%'));var _0xfe0d32=function(_0x4ac0d6,_0x468ec8,_0x59b63b){var _0x175765=_0x22fdb3[_0x2246('0x2a')](_0x4ac0d6);if(_0x175765['length'])_0x175765[_0x2246('0x46')](_0x175765['html']()[_0x2246('0x41')]()[_0x2246('0x1')](/[0-9]{1,2}/,_0x59b63b?_0x59b63b:_0x46b10d[_0x2246('0x47')]||0x0));var _0x30c970=_0x22fdb3['find'](_0x468ec8);if(_0x30c970[_0x2246('0x7')])_0x30c970[_0x2246('0x46')](_0x30c970[_0x2246('0x46')]()[_0x2246('0x41')]()[_0x2246('0x1')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x29f81c/(_0x59b63b?_0x59b63b:_0x46b10d[_0x2246('0x47')]||0x1),0x2,',','.')));};if(_0x27d57e&&_0x18ad7e[_0x2246('0x23')][_0x2246('0x48')])_0xfe0d32(_0x18ad7e[_0x2246('0x23')][_0x2246('0x47')],_0x18ad7e[_0x2246('0x23')]['installmentValue']);else if(_0x18ad7e[_0x2246('0x48')])_0xfe0d32(_0x2246('0x49'),_0x2246('0x4a'),parseInt(_0x22fdb3[_0x2246('0x2a')](_0x2246('0x4b'))[_0x2246('0x3d')]()||0x1)||0x1);_0x22fdb3[_0x2246('0x2a')](_0x2246('0x4c'))[_0x2246('0x4d')](qd_number_format(_0x147c08-_0x29f81c,0x2,',','.'));_0x22fdb3[_0x2246('0x2a')](_0x2246('0x4e'))['prepend'](qd_number_format((_0x147c08-_0x29f81c)*0x64/_0x147c08,0x2,',','.'));if(_0x27d57e&&_0x18ad7e[_0x2246('0x23')]['changeNativeSaveAmount']){_0x2061fa('em.economia-de')[_0x2246('0x4f')](function(){_0x57415a=_0x2061fa(this);_0x57415a[_0x2246('0x14')](_0x57415a[_0x2246('0x14')]()[_0x2246('0x41')]()[_0x2246('0x1')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x147c08-_0x29f81c,0x2,',','.')));_0x57415a[_0x2246('0x28')](_0x2246('0x42'));});}};_0x2ec61a(_0x29bb37);if(_0x27d57e)_0x2061fa(window)['on'](_0x2246('0x50'),function(_0x1046b8,_0x645e78,_0x366e2f){_0x2ec61a(_0x366e2f);});_0x22fdb3[_0x2246('0x28')]('qd_sp_processedItem');if(!_0x27d57e)_0x19e3f6['addClass'](_0x2246('0x51'));};(_0x18ad7e['startedByWrapper']?_0x1d3ccf[_0x2246('0x2a')](_0x18ad7e['flagElement']):_0x1d3ccf)['each'](function(){_0x5ba609[_0x2246('0x52')](this,![]);});if(typeof _0x18ad7e['forcePromotion']==_0x2246('0x53')){var _0x3c5c44=_0x18ad7e['startedByWrapper']?_0x1d3ccf:_0x1d3ccf['closest'](_0x18ad7e[_0x2246('0x26')]);if(_0x18ad7e[_0x2246('0x23')][_0x2246('0x24')])_0x3c5c44=_0x3c5c44[_0x2246('0x25')](_0x18ad7e[_0x2246('0x23')][_0x2246('0x26')])['not'](_0x2246('0x54'));else _0x3c5c44=_0x3c5c44[_0x2246('0x2a')](_0x2246('0x55'));_0x3c5c44[_0x2246('0x4f')](function(){var _0xcf048=_0x2061fa(_0x18ad7e[_0x2246('0x56')]);_0xcf048[_0x2246('0x33')](_0x2246('0x57'),'display:none\x20!important;');if(_0x18ad7e[_0x2246('0x23')][_0x2246('0x24')])_0x2061fa(this)[_0x2246('0x4d')](_0xcf048);else _0x2061fa(this)['after'](_0xcf048);_0x5ba609['call'](_0xcf048,!![]);});}};_0x2061fa['fn']['QD_SmartPrice']=function(_0x287bd1){var _0x2f853b=_0x2061fa(this);if(!_0x2f853b[_0x2246('0x7')])return _0x2f853b;var _0x4bcf67=_0x2061fa['extend'](!![],{},_0x35a90c,_0x287bd1);if(typeof _0x4bcf67[_0x2246('0x23')][_0x2246('0x24')]!=_0x2246('0x58'))_0x4bcf67['productPage'][_0x2246('0x24')]=_0x2061fa(document[_0x2246('0x59')])['is'](_0x2246('0x5a'));_0x36dbf8(_0x2f853b,_0x4bcf67);return _0x2f853b;};}(this));
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
var _0x6db8=['qdAmAddNdx','addClass','qd-am-li-','first','qd-am-first','qd-am-last','QD_amazingMenu','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','qd-am-banner-wrapper','parent','qd-am-collection-wrapper','qdAjax','url','attr','data-qdam-value','.box-banner','insertBefore','hide','qd-am-content-loaded','each','text','trim','[class*=\x27colunas\x27]','clone','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','call','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul',':not(ul)','qd-am-elem-','replaceSpecialChars','>li','qd-amazing-menu','>ul','qd-am-dropdown-menu','qd-am-dropdown','children','qd-am-level-','-li','callback','QuatroDigital.am.callback','exec','.qd_amazing_menu_auto','getParent','closest','/qd-amazing-menu','object','undefined','unshift','[QD\x20Amazing\x20Menu]\x0a','toLowerCase','info','apply','error','join'];(function(_0x53b0f8,_0x459130){var _0x133415=function(_0x37a4a5){while(--_0x37a4a5){_0x53b0f8['push'](_0x53b0f8['shift']());}};_0x133415(++_0x459130);}(_0x6db8,0x1aa));var _0x86db=function(_0x301c34,_0x15701e){_0x301c34=_0x301c34-0x0;var _0x1a8c5a=_0x6db8[_0x301c34];return _0x1a8c5a;};(function(_0x478377){_0x478377['fn'][_0x86db('0x0')]=_0x478377['fn'][_0x86db('0x1')];}(jQuery));(function(_0x2a2755){var _0x411c03;var _0x3e57ed=jQuery;if('function'!==typeof _0x3e57ed['fn']['QD_amazingMenu']){var _0x3c90c0={'url':_0x86db('0x2'),'callback':function(){},'ajaxCallback':function(){}};var _0x5a94b6=function(_0x3af84f,_0x1cd9c8){if(_0x86db('0x3')===typeof console&&_0x86db('0x4')!==typeof console['error']&&_0x86db('0x4')!==typeof console['info']&&_0x86db('0x4')!==typeof console['warn']){var _0x18d275;_0x86db('0x3')===typeof _0x3af84f?(_0x3af84f[_0x86db('0x5')](_0x86db('0x6')),_0x18d275=_0x3af84f):_0x18d275=[_0x86db('0x6')+_0x3af84f];if(_0x86db('0x4')===typeof _0x1cd9c8||'alerta'!==_0x1cd9c8['toLowerCase']()&&'aviso'!==_0x1cd9c8[_0x86db('0x7')]())if('undefined'!==typeof _0x1cd9c8&&_0x86db('0x8')===_0x1cd9c8[_0x86db('0x7')]())try{console[_0x86db('0x8')][_0x86db('0x9')](console,_0x18d275);}catch(_0x330941){try{console[_0x86db('0x8')](_0x18d275['join']('\x0a'));}catch(_0x23b0f0){}}else try{console[_0x86db('0xa')]['apply'](console,_0x18d275);}catch(_0x7e053b){try{console['error'](_0x18d275[_0x86db('0xb')]('\x0a'));}catch(_0x275464){}}else try{console['warn'][_0x86db('0x9')](console,_0x18d275);}catch(_0x1ac7c2){try{console['warn'](_0x18d275['join']('\x0a'));}catch(_0xe78903){}}}};_0x3e57ed['fn'][_0x86db('0xc')]=function(){var _0x48f6b9=_0x3e57ed(this);_0x48f6b9['each'](function(_0x162359){_0x3e57ed(this)[_0x86db('0xd')](_0x86db('0xe')+_0x162359);});_0x48f6b9[_0x86db('0xf')]()[_0x86db('0xd')](_0x86db('0x10'));_0x48f6b9['last']()[_0x86db('0xd')](_0x86db('0x11'));return _0x48f6b9;};_0x3e57ed['fn'][_0x86db('0x12')]=function(){};_0x2a2755=function(_0x1cc8bb){var _0x2d00b1={'t':_0x86db('0x13')};return function(_0x4df2ba){var _0x3dac4b=function(_0x1d165e){return _0x1d165e;};var _0x52ecab=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4df2ba=_0x4df2ba['d'+_0x52ecab[0x10]+'c'+_0x52ecab[0x11]+'m'+_0x3dac4b(_0x52ecab[0x1])+'n'+_0x52ecab[0xd]]['l'+_0x52ecab[0x12]+'c'+_0x52ecab[0x0]+'ti'+_0x3dac4b('o')+'n'];var _0x41c93a=function(_0x23e496){return escape(encodeURIComponent(_0x23e496['replace'](/\./g,'¨')[_0x86db('0x14')](/[a-zA-Z]/g,function(_0x45f0f9){return String[_0x86db('0x15')](('Z'>=_0x45f0f9?0x5a:0x7a)>=(_0x45f0f9=_0x45f0f9[_0x86db('0x16')](0x0)+0xd)?_0x45f0f9:_0x45f0f9-0x1a);})));};var _0x17c438=_0x41c93a(_0x4df2ba[[_0x52ecab[0x9],_0x3dac4b('o'),_0x52ecab[0xc],_0x52ecab[_0x3dac4b(0xd)]][_0x86db('0xb')]('')]);_0x41c93a=_0x41c93a((window[['js',_0x3dac4b('no'),'m',_0x52ecab[0x1],_0x52ecab[0x4]['toUpperCase'](),_0x86db('0x17')][_0x86db('0xb')]('')]||_0x86db('0x18'))+['.v',_0x52ecab[0xd],'e',_0x3dac4b('x'),'co',_0x3dac4b('mm'),_0x86db('0x19'),_0x52ecab[0x1],'.c',_0x3dac4b('o'),'m.',_0x52ecab[0x13],'r']['join'](''));for(var _0x53a95d in _0x2d00b1){if(_0x41c93a===_0x53a95d+_0x2d00b1[_0x53a95d]||_0x17c438===_0x53a95d+_0x2d00b1[_0x53a95d]){var _0x3d98c3='tr'+_0x52ecab[0x11]+'e';break;}_0x3d98c3='f'+_0x52ecab[0x0]+'ls'+_0x3dac4b(_0x52ecab[0x1])+'';}_0x3dac4b=!0x1;-0x1<_0x4df2ba[[_0x52ecab[0xc],'e',_0x52ecab[0x0],'rc',_0x52ecab[0x9]][_0x86db('0xb')]('')]['indexOf'](_0x86db('0x1a'))&&(_0x3dac4b=!0x0);return[_0x3d98c3,_0x3dac4b];}(_0x1cc8bb);}(window);if(!eval(_0x2a2755[0x0]))return _0x2a2755[0x1]?_0x5a94b6(_0x86db('0x1b')):!0x1;var _0x364f8a=function(_0x401a2a){var _0x1609d4=_0x401a2a[_0x86db('0x1c')](_0x86db('0x1d'));var _0x46346c=_0x1609d4[_0x86db('0x1e')](_0x86db('0x1f'));var _0x2a92cb=_0x1609d4['filter'](_0x86db('0x20'));if(_0x46346c[_0x86db('0x21')]||_0x2a92cb['length'])_0x46346c['parent']()[_0x86db('0xd')](_0x86db('0x22')),_0x2a92cb[_0x86db('0x23')]()[_0x86db('0xd')](_0x86db('0x24')),_0x3e57ed[_0x86db('0x25')]({'url':_0x411c03[_0x86db('0x26')],'dataType':'html','success':function(_0x178d0f){var _0x430431=_0x3e57ed(_0x178d0f);_0x46346c['each'](function(){var _0x178d0f=_0x3e57ed(this);var _0x313c9d=_0x430431['find']('img[alt=\x27'+_0x178d0f[_0x86db('0x27')](_0x86db('0x28'))+'\x27]');_0x313c9d[_0x86db('0x21')]&&(_0x313c9d['each'](function(){_0x3e57ed(this)[_0x86db('0x0')](_0x86db('0x29'))['clone']()[_0x86db('0x2a')](_0x178d0f);}),_0x178d0f[_0x86db('0x2b')]());})['addClass'](_0x86db('0x2c'));_0x2a92cb[_0x86db('0x2d')](function(){var _0x178d0f={};var _0x5c6960=_0x3e57ed(this);_0x430431['find']('h2')['each'](function(){if(_0x3e57ed(this)[_0x86db('0x2e')]()[_0x86db('0x2f')]()[_0x86db('0x7')]()==_0x5c6960[_0x86db('0x27')](_0x86db('0x28'))['trim']()[_0x86db('0x7')]())return _0x178d0f=_0x3e57ed(this),!0x1;});_0x178d0f[_0x86db('0x21')]&&(_0x178d0f[_0x86db('0x2d')](function(){_0x3e57ed(this)[_0x86db('0x0')](_0x86db('0x30'))[_0x86db('0x31')]()[_0x86db('0x2a')](_0x5c6960);}),_0x5c6960['hide']());})[_0x86db('0xd')](_0x86db('0x2c'));},'error':function(){_0x5a94b6(_0x86db('0x32')+_0x411c03[_0x86db('0x26')]+_0x86db('0x33'));},'complete':function(){_0x411c03['ajaxCallback'][_0x86db('0x34')](this);_0x3e57ed(window)[_0x86db('0x35')](_0x86db('0x36'),_0x401a2a);},'clearQueueDelay':0xbb8});};_0x3e57ed[_0x86db('0x12')]=function(_0x521159){var _0xaaef59=_0x521159[_0x86db('0x1c')](_0x86db('0x37'))[_0x86db('0x2d')](function(){var _0x339cf5=_0x3e57ed(this);if(!_0x339cf5[_0x86db('0x21')])return _0x5a94b6([_0x86db('0x38'),_0x521159],'alerta');_0x339cf5[_0x86db('0x1c')](_0x86db('0x39'))[_0x86db('0x23')]()['addClass']('qd-am-has-ul');_0x339cf5['find']('li')['each'](function(){var _0x52daa2=_0x3e57ed(this);var _0x2f89b8=_0x52daa2['children'](_0x86db('0x3a'));_0x2f89b8[_0x86db('0x21')]&&_0x52daa2['addClass'](_0x86db('0x3b')+_0x2f89b8['first']()[_0x86db('0x2e')]()[_0x86db('0x2f')]()[_0x86db('0x3c')]()[_0x86db('0x14')](/\./g,'')[_0x86db('0x14')](/\s/g,'-')[_0x86db('0x7')]());});var _0x33d4d2=_0x339cf5[_0x86db('0x1c')](_0x86db('0x3d'))[_0x86db('0xc')]();_0x339cf5[_0x86db('0xd')](_0x86db('0x3e'));_0x33d4d2=_0x33d4d2[_0x86db('0x1c')](_0x86db('0x3f'));_0x33d4d2[_0x86db('0x2d')](function(){var _0x37033e=_0x3e57ed(this);_0x37033e[_0x86db('0x1c')](_0x86db('0x3d'))[_0x86db('0xc')]()[_0x86db('0xd')]('qd-am-column');_0x37033e['addClass'](_0x86db('0x40'));_0x37033e[_0x86db('0x23')]()['addClass'](_0x86db('0x41'));});_0x33d4d2[_0x86db('0xd')](_0x86db('0x41'));var _0x1c1c71=0x0,_0x2a2755=function(_0x3daf41){_0x1c1c71+=0x1;_0x3daf41=_0x3daf41[_0x86db('0x42')]('li')[_0x86db('0x42')]('*');_0x3daf41[_0x86db('0x21')]&&(_0x3daf41['addClass'](_0x86db('0x43')+_0x1c1c71),_0x2a2755(_0x3daf41));};_0x2a2755(_0x339cf5);_0x339cf5['add'](_0x339cf5[_0x86db('0x1c')]('ul'))[_0x86db('0x2d')](function(){var _0x4bb78c=_0x3e57ed(this);_0x4bb78c['addClass']('qd-am-'+_0x4bb78c['children']('li')[_0x86db('0x21')]+_0x86db('0x44'));});});_0x364f8a(_0xaaef59);_0x411c03[_0x86db('0x45')]['call'](this);_0x3e57ed(window)['trigger'](_0x86db('0x46'),_0x521159);};_0x3e57ed['fn'][_0x86db('0x12')]=function(_0x3a5be8){var _0x3b5040=_0x3e57ed(this);if(!_0x3b5040[_0x86db('0x21')])return _0x3b5040;_0x411c03=_0x3e57ed['extend']({},_0x3c90c0,_0x3a5be8);_0x3b5040[_0x86db('0x47')]=new _0x3e57ed[(_0x86db('0x12'))](_0x3e57ed(this));return _0x3b5040;};_0x3e57ed(function(){_0x3e57ed(_0x86db('0x48'))[_0x86db('0x12')]();});}}(this));

/* Quatro Digital Smart Cart */
var _0x0b78=['texts','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','linkCart','.qd_ddc_continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','shippingForm','.qd-ddc-emptyCart\x20p','cartContainer','.qd-ddc-infoTotalItems','.qd-ddc-infoAllTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','qd-ddc-','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','val','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','[data-sku=\x27','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantity','.qd-ddc-quantityMinus','click.qd_ddc_minus','click.qd_ddc_remove','stop','remove','$1-$2$3','qdDdcLastPostalCode','BRA','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','removeProduct','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','prodId','qd-bap-item-added','input.qd-productId[value=','.qd-bap-wrapper','.qd-bap-qtt','.qd_bap_wrapper_content','.qdDdcContainer','dropDown','smartCart','getParent','abs','undefined','pow','round','split','length','join','function','prototype','trim','replace','capitalize','charAt','slice','toLowerCase','qdAjax','qdAjaxQueue','jquery','000','error','extend','object','data','stringify','url','type','jqXHR','done','success','fail','always','complete','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','message','4.0','closest','simpleCart','checkout','getOrderForm','call','QuatroDigital_simpleCart','ajaxStopOn','alerta','[Simple\x20Cart]\x0a','warn','info','add','QD_simpleCart','elements','.qd_cart_qtt','.qd_cart_total','meta[name=currency]','content','each','qd_simpleCartOpts','totalizers','Shipping','value','total','_QuatroDigital_CartData','shipping','currencySymbol','allTotal','qtt','showQuantityByItems','items','quantity','callback','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','hide','filter','.plural','show','addClass','qd-emptyCart','removeClass','$this','O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','html','itemsTextE','cartQtt','cartTotalE','find','itemsText','emptyElem','emptyCart','qd-sc-populated','smartCheckout','_QuatroDigital_DropDown','vtexjs','SDK','QD_checkoutQueue','shippingData','simpleCartCallback.quatro_digital','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','.qd_cart_auto','bind','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','Callbacks','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','input.buy-in-page-quantity','javascript:','body','.productQuickView','Produto\x20adicionado\x20ao\x20carrinho!','location','href','#produto,\x20.produto','QD_buyButton','isSmartCheckout','qd-bb-click-active','click.qd_bb_buy_sc','allowBuyClick','clickBuySmartCheckout','preventDefault','Método\x20descontinuado!','.qd-sbb-on','.btn-add-buy-button-asynchronous','.remove-href','qd-bb-active','append','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','prodAdd','qd-bb-lightBoxBodyProdAdd','[href=\x27','---','qd-bb-itemAddCartWrapper','qd-bb-itemAddBuyButtonWrapper','função\x20descontinuada','allowUpdate','autoWatchBuyButton','buyButton','unbind','click','mouseenter.qd_bb_buy_sc','load','attr','indexOf','selectSkuMsg','?redirect=false&','execDefaultAction','redirect=false','redirect=true','queue','test','match','pop','shift','asyncCallback','productAddedToCart','trigger','cartProductAdded.vtex','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','Callback\x20não\x20é\x20uma\x20função','prepend','ajaxSend','/checkout/cart/add','productAddedToCart.qdSbbVtex','QuatroDigital.qd_bb_prod_add','ajaxStop','toFixed','Oooops!\x20','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','QD_dropDownCart','charCodeAt','ite','erc','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','name','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','script','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','qd-bb-lightBoxProdAdd','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20input','keyup.qd_ddc_cep','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','getCartInfoByUrl','cartIsEmpty','mouseleave.qd_ddc_hover','cartTotal'];(function(_0x285b48,_0x41b4c6){var _0x5020e9=function(_0x537f18){while(--_0x537f18){_0x285b48['push'](_0x285b48['shift']());}};_0x5020e9(++_0x41b4c6);}(_0x0b78,0x1ad));var _0x80b7=function(_0x57b54c,_0x54ce0d){_0x57b54c=_0x57b54c-0x0;var _0x59cc19=_0x0b78[_0x57b54c];return _0x59cc19;};(function(_0xd812db){_0xd812db['fn'][_0x80b7('0x0')]=_0xd812db['fn']['closest'];}(jQuery));function qd_number_format(_0x10e644,_0x4f55ab,_0x4bffac,_0x261012){_0x10e644=(_0x10e644+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x10e644=isFinite(+_0x10e644)?+_0x10e644:0x0;_0x4f55ab=isFinite(+_0x4f55ab)?Math[_0x80b7('0x1')](_0x4f55ab):0x0;_0x261012=_0x80b7('0x2')===typeof _0x261012?',':_0x261012;_0x4bffac=_0x80b7('0x2')===typeof _0x4bffac?'.':_0x4bffac;var _0x167ddd='',_0x167ddd=function(_0x584401,_0x5e19ef){var _0x4f55ab=Math[_0x80b7('0x3')](0xa,_0x5e19ef);return''+(Math[_0x80b7('0x4')](_0x584401*_0x4f55ab)/_0x4f55ab)['toFixed'](_0x5e19ef);},_0x167ddd=(_0x4f55ab?_0x167ddd(_0x10e644,_0x4f55ab):''+Math[_0x80b7('0x4')](_0x10e644))[_0x80b7('0x5')]('.');0x3<_0x167ddd[0x0][_0x80b7('0x6')]&&(_0x167ddd[0x0]=_0x167ddd[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x261012));(_0x167ddd[0x1]||'')[_0x80b7('0x6')]<_0x4f55ab&&(_0x167ddd[0x1]=_0x167ddd[0x1]||'',_0x167ddd[0x1]+=Array(_0x4f55ab-_0x167ddd[0x1]['length']+0x1)[_0x80b7('0x7')]('0'));return _0x167ddd[_0x80b7('0x7')](_0x4bffac);};_0x80b7('0x8')!==typeof String[_0x80b7('0x9')][_0x80b7('0xa')]&&(String[_0x80b7('0x9')][_0x80b7('0xa')]=function(){return this[_0x80b7('0xb')](/^\s+|\s+$/g,'');});_0x80b7('0x8')!=typeof String[_0x80b7('0x9')][_0x80b7('0xc')]&&(String['prototype'][_0x80b7('0xc')]=function(){return this[_0x80b7('0xd')](0x0)['toUpperCase']()+this[_0x80b7('0xe')](0x1)[_0x80b7('0xf')]();});(function(_0x4aaa02){if(_0x80b7('0x8')!==typeof _0x4aaa02[_0x80b7('0x10')]){var _0x21ea65={};_0x4aaa02[_0x80b7('0x11')]=_0x21ea65;0x96>parseInt((_0x4aaa02['fn'][_0x80b7('0x12')][_0x80b7('0xb')](/[^0-9]+/g,'')+_0x80b7('0x13'))[_0x80b7('0xe')](0x0,0x3),0xa)&&console&&_0x80b7('0x8')==typeof console[_0x80b7('0x14')]&&console['error']();_0x4aaa02[_0x80b7('0x10')]=function(_0x1d62ed){try{var _0x205457=_0x4aaa02[_0x80b7('0x15')]({},{'url':'','type':'GET','data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x1d62ed);var _0x48c356=_0x80b7('0x16')===typeof _0x205457[_0x80b7('0x17')]?JSON[_0x80b7('0x18')](_0x205457[_0x80b7('0x17')]):_0x205457['data']['toString']();var _0x2aebe3=encodeURIComponent(_0x205457[_0x80b7('0x19')]+'|'+_0x205457[_0x80b7('0x1a')]+'|'+_0x48c356);_0x21ea65[_0x2aebe3]=_0x21ea65[_0x2aebe3]||{};_0x80b7('0x2')==typeof _0x21ea65[_0x2aebe3]['jqXHR']?_0x21ea65[_0x2aebe3][_0x80b7('0x1b')]=_0x4aaa02['ajax'](_0x205457):(_0x21ea65[_0x2aebe3]['jqXHR'][_0x80b7('0x1c')](_0x205457[_0x80b7('0x1d')]),_0x21ea65[_0x2aebe3][_0x80b7('0x1b')][_0x80b7('0x1e')](_0x205457[_0x80b7('0x14')]),_0x21ea65[_0x2aebe3][_0x80b7('0x1b')][_0x80b7('0x1f')](_0x205457[_0x80b7('0x20')]));_0x21ea65[_0x2aebe3][_0x80b7('0x1b')][_0x80b7('0x1f')](function(){isNaN(parseInt(_0x205457[_0x80b7('0x21')]))||setTimeout(function(){_0x21ea65[_0x2aebe3][_0x80b7('0x1b')]=void 0x0;},_0x205457[_0x80b7('0x21')]);});return _0x21ea65[_0x2aebe3][_0x80b7('0x1b')];}catch(_0x3995b5){'undefined'!==typeof console&&_0x80b7('0x8')===typeof console[_0x80b7('0x14')]&&console['error'](_0x80b7('0x22')+_0x3995b5[_0x80b7('0x23')]);}};_0x4aaa02[_0x80b7('0x10')]['version']=_0x80b7('0x24');}}(jQuery));(function(_0x48995a){_0x48995a['fn'][_0x80b7('0x0')]=_0x48995a['fn'][_0x80b7('0x25')];}(jQuery));(function(){var _0x1c4607=jQuery;if(_0x80b7('0x8')!==typeof _0x1c4607['fn'][_0x80b7('0x26')]){_0x1c4607(function(){var _0x44f03e=vtexjs[_0x80b7('0x27')][_0x80b7('0x28')];vtexjs[_0x80b7('0x27')][_0x80b7('0x28')]=function(){return _0x44f03e[_0x80b7('0x29')]();};});try{window['QuatroDigital_simpleCart']=window['QuatroDigital_simpleCart']||{};window[_0x80b7('0x2a')][_0x80b7('0x2b')]=!0x1;_0x1c4607['fn']['simpleCart']=function(_0x4e8557,_0x106921,_0x1c95ea){var _0x1cbe71=function(_0x171fe2,_0x38fd9c){if(_0x80b7('0x16')===typeof console){var _0x51a4fb=_0x80b7('0x16')===typeof _0x171fe2;_0x80b7('0x2')!==typeof _0x38fd9c&&_0x80b7('0x2c')===_0x38fd9c[_0x80b7('0xf')]()?_0x51a4fb?console['warn'](_0x80b7('0x2d'),_0x171fe2[0x0],_0x171fe2[0x1],_0x171fe2[0x2],_0x171fe2[0x3],_0x171fe2[0x4],_0x171fe2[0x5],_0x171fe2[0x6],_0x171fe2[0x7]):console[_0x80b7('0x2e')]('[Simple\x20Cart]\x0a'+_0x171fe2):_0x80b7('0x2')!==typeof _0x38fd9c&&_0x80b7('0x2f')===_0x38fd9c[_0x80b7('0xf')]()?_0x51a4fb?console[_0x80b7('0x2f')](_0x80b7('0x2d'),_0x171fe2[0x0],_0x171fe2[0x1],_0x171fe2[0x2],_0x171fe2[0x3],_0x171fe2[0x4],_0x171fe2[0x5],_0x171fe2[0x6],_0x171fe2[0x7]):console[_0x80b7('0x2f')](_0x80b7('0x2d')+_0x171fe2):_0x51a4fb?console[_0x80b7('0x14')]('[Simple\x20Cart]\x0a',_0x171fe2[0x0],_0x171fe2[0x1],_0x171fe2[0x2],_0x171fe2[0x3],_0x171fe2[0x4],_0x171fe2[0x5],_0x171fe2[0x6],_0x171fe2[0x7]):console['error']('[Simple\x20Cart]\x0a'+_0x171fe2);}};var _0x34f479=_0x1c4607(this);_0x80b7('0x16')===typeof _0x4e8557?_0x106921=_0x4e8557:(_0x4e8557=_0x4e8557||!0x1,_0x34f479=_0x34f479[_0x80b7('0x30')](_0x1c4607[_0x80b7('0x31')][_0x80b7('0x32')]));if(!_0x34f479[_0x80b7('0x6')])return _0x34f479;_0x1c4607[_0x80b7('0x31')][_0x80b7('0x32')]=_0x1c4607['QD_simpleCart'][_0x80b7('0x32')][_0x80b7('0x30')](_0x34f479);_0x1c95ea=_0x80b7('0x2')===typeof _0x1c95ea?!0x1:_0x1c95ea;var _0x44acf2={'cartQtt':_0x80b7('0x33'),'cartTotal':_0x80b7('0x34'),'itemsText':'.qd_items_text','currencySymbol':(_0x1c4607(_0x80b7('0x35'))['attr'](_0x80b7('0x36'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x1a6e69=_0x1c4607['extend']({},_0x44acf2,_0x106921);var _0x5566f9=_0x1c4607('');_0x34f479[_0x80b7('0x37')](function(){var _0x5e21eb=_0x1c4607(this);_0x5e21eb['data'](_0x80b7('0x38'))||_0x5e21eb[_0x80b7('0x17')]('qd_simpleCartOpts',_0x1a6e69);});var _0xfc8504=function(_0x196f48){window['_QuatroDigital_CartData']=window['_QuatroDigital_CartData']||{};for(var _0x4e8557=0x0,_0x3a3b62=0x0,_0x3b89b4=0x0;_0x3b89b4<_0x196f48[_0x80b7('0x39')][_0x80b7('0x6')];_0x3b89b4++)_0x80b7('0x3a')==_0x196f48['totalizers'][_0x3b89b4]['id']&&(_0x3a3b62+=_0x196f48[_0x80b7('0x39')][_0x3b89b4][_0x80b7('0x3b')]),_0x4e8557+=_0x196f48[_0x80b7('0x39')][_0x3b89b4][_0x80b7('0x3b')];window['_QuatroDigital_CartData'][_0x80b7('0x3c')]=_0x1a6e69['currencySymbol']+qd_number_format(_0x4e8557/0x64,0x2,',','.');window[_0x80b7('0x3d')][_0x80b7('0x3e')]=_0x1a6e69[_0x80b7('0x3f')]+qd_number_format(_0x3a3b62/0x64,0x2,',','.');window[_0x80b7('0x3d')][_0x80b7('0x40')]=_0x1a6e69[_0x80b7('0x3f')]+qd_number_format((_0x4e8557+_0x3a3b62)/0x64,0x2,',','.');window[_0x80b7('0x3d')][_0x80b7('0x41')]=0x0;if(_0x1a6e69[_0x80b7('0x42')])for(_0x3b89b4=0x0;_0x3b89b4<_0x196f48[_0x80b7('0x43')][_0x80b7('0x6')];_0x3b89b4++)window[_0x80b7('0x3d')][_0x80b7('0x41')]+=_0x196f48['items'][_0x3b89b4][_0x80b7('0x44')];else window[_0x80b7('0x3d')]['qtt']=_0x196f48[_0x80b7('0x43')]['length']||0x0;try{window['_QuatroDigital_CartData'][_0x80b7('0x45')]&&window['_QuatroDigital_CartData']['callback'][_0x80b7('0x46')]&&window[_0x80b7('0x3d')]['callback'][_0x80b7('0x46')]();}catch(_0x3aae51){_0x1cbe71(_0x80b7('0x47'));}_0x66202(_0x5566f9);};var _0x5455a5=function(_0x385e84,_0x2bef08){0x1===_0x385e84?_0x2bef08[_0x80b7('0x48')]()[_0x80b7('0x49')]('.singular')['show']():_0x2bef08['hide']()[_0x80b7('0x49')](_0x80b7('0x4a'))[_0x80b7('0x4b')]();};var _0x1b29f9=function(_0x23a975){0x1>_0x23a975?_0x34f479[_0x80b7('0x4c')](_0x80b7('0x4d')):_0x34f479[_0x80b7('0x4e')]('qd-emptyCart');};var _0x588bab=function(_0x25afd7,_0x13ebaa){var _0x3d01c6=parseInt(window[_0x80b7('0x3d')][_0x80b7('0x41')],0xa);_0x13ebaa[_0x80b7('0x4f')]['show']();isNaN(_0x3d01c6)&&(_0x1cbe71(_0x80b7('0x50'),_0x80b7('0x2c')),_0x3d01c6=0x0);_0x13ebaa['cartTotalE'][_0x80b7('0x51')](window[_0x80b7('0x3d')][_0x80b7('0x3c')]);_0x13ebaa['cartQttE']['html'](_0x3d01c6);_0x5455a5(_0x3d01c6,_0x13ebaa[_0x80b7('0x52')]);_0x1b29f9(_0x3d01c6);};var _0x66202=function(_0xbc9686){_0x34f479[_0x80b7('0x37')](function(){var _0x1b544d={};var _0x2689ab=_0x1c4607(this);_0x4e8557&&_0x2689ab['data'](_0x80b7('0x38'))&&_0x1c4607[_0x80b7('0x15')](_0x1a6e69,_0x2689ab[_0x80b7('0x17')](_0x80b7('0x38')));_0x1b544d[_0x80b7('0x4f')]=_0x2689ab;_0x1b544d['cartQttE']=_0x2689ab['find'](_0x1a6e69[_0x80b7('0x53')])||_0x5566f9;_0x1b544d[_0x80b7('0x54')]=_0x2689ab[_0x80b7('0x55')](_0x1a6e69['cartTotal'])||_0x5566f9;_0x1b544d[_0x80b7('0x52')]=_0x2689ab['find'](_0x1a6e69[_0x80b7('0x56')])||_0x5566f9;_0x1b544d[_0x80b7('0x57')]=_0x2689ab[_0x80b7('0x55')](_0x1a6e69[_0x80b7('0x58')])||_0x5566f9;_0x588bab(_0xbc9686,_0x1b544d);_0x2689ab[_0x80b7('0x4c')](_0x80b7('0x59'));});};(function(){if(_0x1a6e69[_0x80b7('0x5a')]){window[_0x80b7('0x5b')]=window[_0x80b7('0x5b')]||{};if(_0x80b7('0x2')!==typeof window[_0x80b7('0x5b')][_0x80b7('0x28')]&&(_0x1c95ea||!_0x4e8557))return _0xfc8504(window[_0x80b7('0x5b')][_0x80b7('0x28')]);if('object'!==typeof window[_0x80b7('0x5c')]||_0x80b7('0x2')===typeof window[_0x80b7('0x5c')][_0x80b7('0x27')])if(_0x80b7('0x16')===typeof vtex&&_0x80b7('0x16')===typeof vtex[_0x80b7('0x27')]&&'undefined'!==typeof vtex[_0x80b7('0x27')][_0x80b7('0x5d')])new vtex[(_0x80b7('0x27'))][(_0x80b7('0x5d'))]();else return _0x1cbe71('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x1c4607[_0x80b7('0x5e')]([_0x80b7('0x43'),'totalizers',_0x80b7('0x5f')],{'done':function(_0x220114){_0xfc8504(_0x220114);window['_QuatroDigital_DropDown'][_0x80b7('0x28')]=_0x220114;},'fail':function(_0x359801){_0x1cbe71(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.',_0x359801]);}});}else alert('Esta\x20é\x20uma\x20função\x20descontinuada\x20=/');}());_0x1a6e69[_0x80b7('0x45')]();_0x1c4607(window)['trigger'](_0x80b7('0x60'));return _0x34f479;};_0x1c4607[_0x80b7('0x31')]={'elements':_0x1c4607('')};_0x1c4607(function(){var _0x57d361;_0x80b7('0x8')===typeof window[_0x80b7('0x61')]&&(_0x57d361=window['ajaxRequestbuyButtonAsynchronous'],window[_0x80b7('0x61')]=function(_0x18fe00,_0xb36861,_0x2e49dc,_0x1a6bd0,_0x1b0aba){_0x57d361[_0x80b7('0x29')](this,_0x18fe00,_0xb36861,_0x2e49dc,_0x1a6bd0,function(){_0x80b7('0x8')===typeof _0x1b0aba&&_0x1b0aba();_0x1c4607[_0x80b7('0x31')]['elements']['each'](function(){var _0x6d7c1e=_0x1c4607(this);_0x6d7c1e['simpleCart'](_0x6d7c1e[_0x80b7('0x17')](_0x80b7('0x38')));});});});});var _0x25fc84=window['ReloadItemsCart']||void 0x0;window[_0x80b7('0x62')]=function(_0x80bf4f){_0x1c4607['fn']['simpleCart'](!0x0);_0x80b7('0x8')===typeof _0x25fc84?_0x25fc84[_0x80b7('0x29')](this,_0x80bf4f):alert(_0x80bf4f);};_0x1c4607(function(){var _0x4370b8=_0x1c4607(_0x80b7('0x63'));_0x4370b8['length']&&_0x4370b8['simpleCart']();});_0x1c4607(function(){_0x1c4607(window)[_0x80b7('0x64')](_0x80b7('0x65'),function(){_0x1c4607['fn'][_0x80b7('0x26')](!0x0);});});}catch(_0x54ec05){'undefined'!==typeof console&&_0x80b7('0x8')===typeof console[_0x80b7('0x14')]&&console[_0x80b7('0x14')]('Oooops!\x20',_0x54ec05);}}}());(function(){var _0x33b76f=function(_0x5c0d97,_0x32257f){if(_0x80b7('0x16')===typeof console){var _0x5a3bb8='object'===typeof _0x5c0d97;'undefined'!==typeof _0x32257f&&'alerta'===_0x32257f[_0x80b7('0xf')]()?_0x5a3bb8?console['warn']('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x5c0d97[0x0],_0x5c0d97[0x1],_0x5c0d97[0x2],_0x5c0d97[0x3],_0x5c0d97[0x4],_0x5c0d97[0x5],_0x5c0d97[0x6],_0x5c0d97[0x7]):console[_0x80b7('0x2e')](_0x80b7('0x66')+_0x5c0d97):_0x80b7('0x2')!==typeof _0x32257f&&_0x80b7('0x2f')===_0x32257f[_0x80b7('0xf')]()?_0x5a3bb8?console[_0x80b7('0x2f')](_0x80b7('0x66'),_0x5c0d97[0x0],_0x5c0d97[0x1],_0x5c0d97[0x2],_0x5c0d97[0x3],_0x5c0d97[0x4],_0x5c0d97[0x5],_0x5c0d97[0x6],_0x5c0d97[0x7]):console[_0x80b7('0x2f')](_0x80b7('0x66')+_0x5c0d97):_0x5a3bb8?console['error']('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x5c0d97[0x0],_0x5c0d97[0x1],_0x5c0d97[0x2],_0x5c0d97[0x3],_0x5c0d97[0x4],_0x5c0d97[0x5],_0x5c0d97[0x6],_0x5c0d97[0x7]):console['error'](_0x80b7('0x66')+_0x5c0d97);}},_0x12ce35=null,_0x866507={},_0x75b085={},_0x55eba7={};$[_0x80b7('0x5e')]=function(_0x1a2c0b,_0x401247){if(null===_0x12ce35)if('object'===typeof window[_0x80b7('0x5c')]&&_0x80b7('0x2')!==typeof window['vtexjs']['checkout'])_0x12ce35=window['vtexjs'][_0x80b7('0x27')];else return _0x33b76f(_0x80b7('0x67'));var _0x52b20a=$['extend']({'done':function(){},'fail':function(){}},_0x401247),_0x397fe7=_0x1a2c0b['join'](';'),_0x4bf950=function(){_0x866507[_0x397fe7]['add'](_0x52b20a['done']);_0x75b085[_0x397fe7]['add'](_0x52b20a['fail']);};_0x55eba7[_0x397fe7]?_0x4bf950():(_0x866507[_0x397fe7]=$[_0x80b7('0x68')](),_0x75b085[_0x397fe7]=$['Callbacks'](),_0x4bf950(),_0x55eba7[_0x397fe7]=!0x0,_0x12ce35[_0x80b7('0x28')](_0x1a2c0b)['done'](function(_0x2fd411){_0x55eba7[_0x397fe7]=!0x1;_0x866507[_0x397fe7][_0x80b7('0x46')](_0x2fd411);})[_0x80b7('0x1e')](function(_0x485b5e){_0x55eba7[_0x397fe7]=!0x1;_0x75b085[_0x397fe7][_0x80b7('0x46')](_0x485b5e);}));};}());(function(_0x37e1c8){try{var _0x482cfc=jQuery,_0x190c5a,_0xb28732=_0x482cfc({}),_0x5ac51b=function(_0x2292b7,_0x476880){if('object'===typeof console&&_0x80b7('0x2')!==typeof console['error']&&'undefined'!==typeof console['info']&&_0x80b7('0x2')!==typeof console['warn']){var _0x59f99e;_0x80b7('0x16')===typeof _0x2292b7?(_0x2292b7[_0x80b7('0x69')](_0x80b7('0x6a')),_0x59f99e=_0x2292b7):_0x59f99e=[_0x80b7('0x6a')+_0x2292b7];if(_0x80b7('0x2')===typeof _0x476880||_0x80b7('0x2c')!==_0x476880[_0x80b7('0xf')]()&&_0x80b7('0x6b')!==_0x476880[_0x80b7('0xf')]())if(_0x80b7('0x2')!==typeof _0x476880&&_0x80b7('0x2f')===_0x476880[_0x80b7('0xf')]())try{console['info'][_0x80b7('0x6c')](console,_0x59f99e);}catch(_0x21d289){try{console[_0x80b7('0x2f')](_0x59f99e['join']('\x0a'));}catch(_0x36f2f2){}}else try{console[_0x80b7('0x14')][_0x80b7('0x6c')](console,_0x59f99e);}catch(_0x1a55ca){try{console[_0x80b7('0x14')](_0x59f99e[_0x80b7('0x7')]('\x0a'));}catch(_0x3c94e6){}}else try{console[_0x80b7('0x2e')]['apply'](console,_0x59f99e);}catch(_0x224806){try{console[_0x80b7('0x2e')](_0x59f99e[_0x80b7('0x7')]('\x0a'));}catch(_0x5e7846){}}}},_0x188fc5={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':'.productInformationWrapper\x20\x20a.buy-button','buyQtt':_0x80b7('0x6d'),'selectSkuMsg':_0x80b7('0x6e'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x438f29,_0x2d27c7,_0x56d823){_0x482cfc(_0x80b7('0x6f'))['is'](_0x80b7('0x70'))&&(_0x80b7('0x1d')===_0x2d27c7?alert(_0x80b7('0x71')):(alert('Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.'),(_0x80b7('0x16')===typeof parent?parent:document)[_0x80b7('0x72')][_0x80b7('0x73')]=_0x56d823));},'isProductPage':function(){return _0x482cfc('body')['is'](_0x80b7('0x74'));},'execDefaultAction':function(_0x396b82){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x482cfc[_0x80b7('0x75')]=function(_0x726e15,_0x126aad){function _0x11023c(_0x4938db){_0x190c5a[_0x80b7('0x76')]?_0x4938db[_0x80b7('0x17')](_0x80b7('0x77'))||(_0x4938db['data'](_0x80b7('0x77'),0x1),_0x4938db['on'](_0x80b7('0x78'),function(_0x130acc){if(!_0x190c5a[_0x80b7('0x79')]())return!0x0;if(!0x0!==_0x314544[_0x80b7('0x7a')]['call'](this))return _0x130acc[_0x80b7('0x7b')](),!0x1;})):alert(_0x80b7('0x7c'));}function _0x50b229(_0x265a0c){_0x265a0c=_0x265a0c||_0x482cfc(_0x190c5a['buyButton']);_0x265a0c[_0x80b7('0x37')](function(){var _0x265a0c=_0x482cfc(this);_0x265a0c['is'](_0x80b7('0x7d'))||(_0x265a0c[_0x80b7('0x4c')]('qd-sbb-on'),_0x265a0c['is'](_0x80b7('0x7e'))&&!_0x265a0c['is'](_0x80b7('0x7f'))||_0x265a0c[_0x80b7('0x17')](_0x80b7('0x80'))||(_0x265a0c[_0x80b7('0x17')]('qd-bb-active',0x1),_0x265a0c['children']('.qd-bb-productAdded')[_0x80b7('0x6')]||_0x265a0c[_0x80b7('0x81')]('<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>'),_0x265a0c['is']('.buy-in-page-button')&&_0x190c5a[_0x80b7('0x82')]()&&_0x49563[_0x80b7('0x29')](_0x265a0c),_0x11023c(_0x265a0c)));});_0x190c5a[_0x80b7('0x82')]()&&!_0x265a0c[_0x80b7('0x6')]&&_0x5ac51b(_0x80b7('0x83')+_0x265a0c[_0x80b7('0x84')]+'\x27.',_0x80b7('0x2f'));}var _0x512b1c=_0x482cfc(_0x726e15);var _0x314544=this;window[_0x80b7('0x85')]=window[_0x80b7('0x85')]||{};window[_0x80b7('0x3d')]=window[_0x80b7('0x3d')]||{};_0x314544[_0x80b7('0x86')]=function(_0x200ec7,_0x1d9c53){_0x512b1c[_0x80b7('0x4c')]('qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd');_0x482cfc(_0x80b7('0x6f'))[_0x80b7('0x4c')](_0x80b7('0x87'));var _0x3530a4=_0x482cfc(_0x190c5a['buyButton'])[_0x80b7('0x49')](_0x80b7('0x88')+(_0x200ec7['attr'](_0x80b7('0x73'))||_0x80b7('0x89'))+'\x27]')[_0x80b7('0x30')](_0x200ec7);_0x3530a4[_0x80b7('0x4c')]('qd-bb-itemAddBuyButtonWrapper');setTimeout(function(){_0x512b1c[_0x80b7('0x4e')](_0x80b7('0x8a'));_0x3530a4[_0x80b7('0x4e')](_0x80b7('0x8b'));},_0x190c5a['timeRemoveNewItemClass']);window[_0x80b7('0x85')]['getOrderForm']=void 0x0;if(_0x80b7('0x2')!==typeof _0x126aad&&_0x80b7('0x8')===typeof _0x126aad['getCartInfoByUrl'])return _0x190c5a[_0x80b7('0x76')]||(_0x5ac51b(_0x80b7('0x8c')),_0x126aad['getCartInfoByUrl']()),window[_0x80b7('0x5b')][_0x80b7('0x28')]=void 0x0,_0x126aad['getCartInfoByUrl'](function(_0x3cf396){window[_0x80b7('0x85')][_0x80b7('0x28')]=_0x3cf396;_0x482cfc['fn']['simpleCart'](!0x0,void 0x0,!0x0);},{'lastSku':_0x1d9c53});window[_0x80b7('0x85')][_0x80b7('0x8d')]=!0x0;_0x482cfc['fn'][_0x80b7('0x26')](!0x0);};(function(){if(_0x190c5a[_0x80b7('0x76')]&&_0x190c5a[_0x80b7('0x8e')]){var _0x3f1252=_0x482cfc(_0x80b7('0x7e'));_0x3f1252[_0x80b7('0x6')]&&_0x50b229(_0x3f1252);}}());var _0x49563=function(){var _0xbcbf4f=_0x482cfc(this);'undefined'!==typeof _0xbcbf4f['data'](_0x80b7('0x8f'))?(_0xbcbf4f[_0x80b7('0x90')](_0x80b7('0x91')),_0x11023c(_0xbcbf4f)):(_0xbcbf4f[_0x80b7('0x64')](_0x80b7('0x92'),function(_0x51f246){_0xbcbf4f[_0x80b7('0x90')](_0x80b7('0x91'));_0x11023c(_0xbcbf4f);_0x482cfc(this)[_0x80b7('0x90')](_0x51f246);}),_0x482cfc(window)[_0x80b7('0x93')](function(){_0xbcbf4f['unbind']('click');_0x11023c(_0xbcbf4f);_0xbcbf4f['unbind'](_0x80b7('0x92'));}));};_0x314544['clickBuySmartCheckout']=function(){var _0x5ba717=_0x482cfc(this),_0x726e15=_0x5ba717[_0x80b7('0x94')](_0x80b7('0x73'))||'';if(-0x1<_0x726e15[_0x80b7('0x95')](_0x190c5a[_0x80b7('0x96')]))return!0x0;_0x726e15=_0x726e15['replace'](/redirect\=(false|true)/gi,'')[_0x80b7('0xb')]('?',_0x80b7('0x97'))[_0x80b7('0xb')](/\&\&/gi,'&');if(_0x190c5a[_0x80b7('0x98')](_0x5ba717))return _0x5ba717[_0x80b7('0x94')](_0x80b7('0x73'),_0x726e15['replace'](_0x80b7('0x99'),_0x80b7('0x9a'))),!0x0;_0x726e15=_0x726e15[_0x80b7('0xb')](/http.?:/i,'');_0xb28732[_0x80b7('0x9b')](function(_0x2e853a){if(!_0x190c5a['buyIfQuantityZeroed']&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0x80b7('0x9c')](_0x726e15))return _0x2e853a();var _0x13d090=function(_0x48af9b,_0x749a76){var _0x50b229=_0x726e15[_0x80b7('0x9d')](/sku\=([0-9]+)/gi),_0x59e878=[];if(_0x80b7('0x16')===typeof _0x50b229&&null!==_0x50b229)for(var _0x2f6b81=_0x50b229[_0x80b7('0x6')]-0x1;0x0<=_0x2f6b81;_0x2f6b81--){var _0x28b26f=parseInt(_0x50b229[_0x2f6b81][_0x80b7('0xb')](/sku\=/gi,''));isNaN(_0x28b26f)||_0x59e878['push'](_0x28b26f);}_0x190c5a['productPageCallback'][_0x80b7('0x29')](this,_0x48af9b,_0x749a76,_0x726e15);_0x314544['buyButtonClickCallback'][_0x80b7('0x29')](this,_0x48af9b,_0x749a76,_0x726e15,_0x59e878);_0x314544[_0x80b7('0x86')](_0x5ba717,_0x726e15[_0x80b7('0x5')]('ku=')[_0x80b7('0x9e')]()[_0x80b7('0x5')]('&')[_0x80b7('0x9f')]());_0x80b7('0x8')===typeof _0x190c5a[_0x80b7('0xa0')]&&_0x190c5a[_0x80b7('0xa0')][_0x80b7('0x29')](this);_0x482cfc(window)['trigger'](_0x80b7('0xa1'));_0x482cfc(window)[_0x80b7('0xa2')](_0x80b7('0xa3'));};_0x190c5a['fakeRequest']?(_0x13d090(null,_0x80b7('0x1d')),_0x2e853a()):_0x482cfc['ajax']({'url':_0x726e15,'complete':_0x13d090})[_0x80b7('0x1f')](function(){_0x2e853a();});});};_0x314544['buyButtonClickCallback']=function(_0x59266f,_0x34b7ce,_0x19702c,_0x26979c){try{_0x80b7('0x1d')===_0x34b7ce&&_0x80b7('0x16')===typeof window[_0x80b7('0xa4')]&&'function'===typeof window[_0x80b7('0xa4')][_0x80b7('0xa5')]&&window[_0x80b7('0xa4')][_0x80b7('0xa5')](_0x59266f,_0x34b7ce,_0x19702c,_0x26979c);}catch(_0x549e2e){_0x5ac51b(_0x80b7('0xa6'));}};_0x50b229();_0x80b7('0x8')===typeof _0x190c5a[_0x80b7('0x45')]?_0x190c5a[_0x80b7('0x45')]['call'](this):_0x5ac51b(_0x80b7('0xa7'));};var _0x398265=_0x482cfc[_0x80b7('0x68')]();_0x482cfc['fn'][_0x80b7('0x75')]=function(_0x5c938d,_0x18ec9e){var _0x37e1c8=_0x482cfc(this);_0x80b7('0x2')!==typeof _0x18ec9e||_0x80b7('0x16')!==typeof _0x5c938d||_0x5c938d instanceof _0x482cfc||(_0x18ec9e=_0x5c938d,_0x5c938d=void 0x0);_0x190c5a=_0x482cfc[_0x80b7('0x15')]({},_0x188fc5,_0x18ec9e);var _0x5cfafd;_0x398265[_0x80b7('0x30')](function(){_0x37e1c8['children']('.qd-bb-itemAddWrapper')[_0x80b7('0x6')]||_0x37e1c8[_0x80b7('0xa8')]('<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>');_0x5cfafd=new _0x482cfc[(_0x80b7('0x75'))](_0x37e1c8,_0x5c938d);});_0x398265[_0x80b7('0x46')]();_0x482cfc(window)['on']('QuatroDigital.qd_bb_prod_add',function(_0x10f143,_0x2470f6,_0x429354){_0x5cfafd[_0x80b7('0x86')](_0x2470f6,_0x429354);});return _0x482cfc[_0x80b7('0x15')](_0x37e1c8,_0x5cfafd);};var _0x27a28e=0x0;_0x482cfc(document)[_0x80b7('0xa9')](function(_0xe5993a,_0x450af6,_0x499f32){-0x1<_0x499f32[_0x80b7('0x19')][_0x80b7('0xf')]()['indexOf'](_0x80b7('0xaa'))&&(_0x27a28e=(_0x499f32[_0x80b7('0x19')][_0x80b7('0x9d')](/sku\=([0-9]+)/i)||[''])[_0x80b7('0x9e')]());});_0x482cfc(window)[_0x80b7('0x64')](_0x80b7('0xab'),function(){_0x482cfc(window)[_0x80b7('0xa2')](_0x80b7('0xac'),[new _0x482cfc(),_0x27a28e]);});_0x482cfc(document)[_0x80b7('0xad')](function(){_0x398265['fire']();});}catch(_0xb3ed82){_0x80b7('0x2')!==typeof console&&_0x80b7('0x8')===typeof console[_0x80b7('0x14')]&&console[_0x80b7('0x14')]('Oooops!\x20',_0xb3ed82);}}(this));function qd_number_format(_0x46328a,_0x37962a,_0x4af5d7,_0x5afae9){_0x46328a=(_0x46328a+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x46328a=isFinite(+_0x46328a)?+_0x46328a:0x0;_0x37962a=isFinite(+_0x37962a)?Math['abs'](_0x37962a):0x0;_0x5afae9=_0x80b7('0x2')===typeof _0x5afae9?',':_0x5afae9;_0x4af5d7=_0x80b7('0x2')===typeof _0x4af5d7?'.':_0x4af5d7;var _0x5bbf55='',_0x5bbf55=function(_0x902b77,_0x271989){var _0x3c9478=Math[_0x80b7('0x3')](0xa,_0x271989);return''+(Math['round'](_0x902b77*_0x3c9478)/_0x3c9478)[_0x80b7('0xae')](_0x271989);},_0x5bbf55=(_0x37962a?_0x5bbf55(_0x46328a,_0x37962a):''+Math['round'](_0x46328a))[_0x80b7('0x5')]('.');0x3<_0x5bbf55[0x0]['length']&&(_0x5bbf55[0x0]=_0x5bbf55[0x0][_0x80b7('0xb')](/\B(?=(?:\d{3})+(?!\d))/g,_0x5afae9));(_0x5bbf55[0x1]||'')[_0x80b7('0x6')]<_0x37962a&&(_0x5bbf55[0x1]=_0x5bbf55[0x1]||'',_0x5bbf55[0x1]+=Array(_0x37962a-_0x5bbf55[0x1][_0x80b7('0x6')]+0x1)[_0x80b7('0x7')]('0'));return _0x5bbf55[_0x80b7('0x7')](_0x4af5d7);}(function(){try{window[_0x80b7('0x3d')]=window[_0x80b7('0x3d')]||{},window[_0x80b7('0x3d')][_0x80b7('0x45')]=window[_0x80b7('0x3d')][_0x80b7('0x45')]||$[_0x80b7('0x68')]();}catch(_0xbc9cd2){_0x80b7('0x2')!==typeof console&&_0x80b7('0x8')===typeof console[_0x80b7('0x14')]&&console[_0x80b7('0x14')](_0x80b7('0xaf'),_0xbc9cd2[_0x80b7('0x23')]);}}());(function(_0x3a8b2b){try{var _0x9ecbe1=jQuery,_0x2c2fef=function(_0x3fe56b,_0x3c7880){if(_0x80b7('0x16')===typeof console&&'undefined'!==typeof console[_0x80b7('0x14')]&&_0x80b7('0x2')!==typeof console[_0x80b7('0x2f')]&&_0x80b7('0x2')!==typeof console['warn']){var _0x174179;'object'===typeof _0x3fe56b?(_0x3fe56b[_0x80b7('0x69')](_0x80b7('0xb0')),_0x174179=_0x3fe56b):_0x174179=[_0x80b7('0xb0')+_0x3fe56b];if('undefined'===typeof _0x3c7880||_0x80b7('0x2c')!==_0x3c7880[_0x80b7('0xf')]()&&_0x80b7('0x6b')!==_0x3c7880['toLowerCase']())if(_0x80b7('0x2')!==typeof _0x3c7880&&_0x80b7('0x2f')===_0x3c7880[_0x80b7('0xf')]())try{console['info']['apply'](console,_0x174179);}catch(_0x1fd930){try{console[_0x80b7('0x2f')](_0x174179[_0x80b7('0x7')]('\x0a'));}catch(_0x309188){}}else try{console['error'][_0x80b7('0x6c')](console,_0x174179);}catch(_0x5db007){try{console['error'](_0x174179[_0x80b7('0x7')]('\x0a'));}catch(_0x41aaa8){}}else try{console[_0x80b7('0x2e')][_0x80b7('0x6c')](console,_0x174179);}catch(_0x306752){try{console['warn'](_0x174179['join']('\x0a'));}catch(_0xccf93e){}}}};window[_0x80b7('0x5b')]=window['_QuatroDigital_DropDown']||{};window[_0x80b7('0x5b')]['allowUpdate']=!0x0;_0x9ecbe1[_0x80b7('0xb1')]=function(){};_0x9ecbe1['fn'][_0x80b7('0xb1')]=function(){return{'fn':new _0x9ecbe1()};};var _0x2aa2c1=function(_0x10c502){var _0x4e8d9b={'t':'nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x3d82ac){var _0x51a0a8=function(_0x55fbfa){return _0x55fbfa;};var _0x52f38f=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3d82ac=_0x3d82ac['d'+_0x52f38f[0x10]+'c'+_0x52f38f[0x11]+'m'+_0x51a0a8(_0x52f38f[0x1])+'n'+_0x52f38f[0xd]]['l'+_0x52f38f[0x12]+'c'+_0x52f38f[0x0]+'ti'+_0x51a0a8('o')+'n'];var _0x292943=function(_0x3b9bb3){return escape(encodeURIComponent(_0x3b9bb3[_0x80b7('0xb')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x495f03){return String['fromCharCode'](('Z'>=_0x495f03?0x5a:0x7a)>=(_0x495f03=_0x495f03[_0x80b7('0xb2')](0x0)+0xd)?_0x495f03:_0x495f03-0x1a);})));};var _0x3a8b2b=_0x292943(_0x3d82ac[[_0x52f38f[0x9],_0x51a0a8('o'),_0x52f38f[0xc],_0x52f38f[_0x51a0a8(0xd)]][_0x80b7('0x7')]('')]);_0x292943=_0x292943((window[['js',_0x51a0a8('no'),'m',_0x52f38f[0x1],_0x52f38f[0x4]['toUpperCase'](),_0x80b7('0xb3')][_0x80b7('0x7')]('')]||_0x80b7('0x89'))+['.v',_0x52f38f[0xd],'e',_0x51a0a8('x'),'co',_0x51a0a8('mm'),_0x80b7('0xb4'),_0x52f38f[0x1],'.c',_0x51a0a8('o'),'m.',_0x52f38f[0x13],'r'][_0x80b7('0x7')](''));for(var _0x391dd9 in _0x4e8d9b){if(_0x292943===_0x391dd9+_0x4e8d9b[_0x391dd9]||_0x3a8b2b===_0x391dd9+_0x4e8d9b[_0x391dd9]){var _0x14ab46='tr'+_0x52f38f[0x11]+'e';break;}_0x14ab46='f'+_0x52f38f[0x0]+'ls'+_0x51a0a8(_0x52f38f[0x1])+'';}_0x51a0a8=!0x1;-0x1<_0x3d82ac[[_0x52f38f[0xc],'e',_0x52f38f[0x0],'rc',_0x52f38f[0x9]][_0x80b7('0x7')]('')][_0x80b7('0x95')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x51a0a8=!0x0);return[_0x14ab46,_0x51a0a8];}(_0x10c502);}(window);if(!eval(_0x2aa2c1[0x0]))return _0x2aa2c1[0x1]?_0x2c2fef(_0x80b7('0xb5')):!0x1;_0x9ecbe1[_0x80b7('0xb1')]=function(_0x4513f1,_0x36298c){var _0x38e029=_0x9ecbe1(_0x4513f1);if(!_0x38e029[_0x80b7('0x6')])return _0x38e029;var _0x551ab0=_0x9ecbe1[_0x80b7('0x15')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':_0x80b7('0xb6'),'cartTotal':_0x80b7('0xb7'),'emptyCart':_0x80b7('0xb8'),'continueShopping':_0x80b7('0xb9'),'shippingForm':_0x80b7('0xba')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x3d5e8e){return _0x3d5e8e['skuName']||_0x3d5e8e[_0x80b7('0xbb')];},'callback':function(){},'callbackProductsList':function(){}},_0x36298c);_0x9ecbe1('');var _0x38d8da=this;if(_0x551ab0[_0x80b7('0x5a')]){var _0x4720c7=!0x1;_0x80b7('0x2')===typeof window[_0x80b7('0x5c')]&&(_0x2c2fef(_0x80b7('0xbc')),_0x9ecbe1[_0x80b7('0xbd')]({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':!0x1,'dataType':_0x80b7('0xbe'),'error':function(){_0x2c2fef('Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.');_0x4720c7=!0x0;}}));if(_0x4720c7)return _0x2c2fef(_0x80b7('0xbf'));}if(_0x80b7('0x16')===typeof window[_0x80b7('0x5c')]&&_0x80b7('0x2')!==typeof window[_0x80b7('0x5c')][_0x80b7('0x27')])var _0x5ff52=window['vtexjs']['checkout'];else if('object'===typeof vtex&&_0x80b7('0x16')===typeof vtex[_0x80b7('0x27')]&&_0x80b7('0x2')!==typeof vtex[_0x80b7('0x27')][_0x80b7('0x5d')])_0x5ff52=new vtex[(_0x80b7('0x27'))]['SDK']();else return _0x2c2fef('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x38d8da['cartContainer']=_0x80b7('0xc0');var _0x55fc57=function(_0x4f6399){_0x9ecbe1(this)[_0x80b7('0x81')](_0x4f6399);_0x4f6399['find'](_0x80b7('0xc1'))[_0x80b7('0x30')](_0x9ecbe1(_0x80b7('0xc2')))['on']('click.qd_ddc_closeFn',function(){_0x38e029['removeClass'](_0x80b7('0xc3'));_0x9ecbe1(document[_0x80b7('0x6f')])[_0x80b7('0x4e')](_0x80b7('0x87'));});_0x9ecbe1(document)[_0x80b7('0xc4')](_0x80b7('0xc5'))['on'](_0x80b7('0xc5'),function(_0x1865b4){0x1b==_0x1865b4[_0x80b7('0xc6')]&&(_0x38e029[_0x80b7('0x4e')]('qd-bb-lightBoxProdAdd'),_0x9ecbe1(document[_0x80b7('0x6f')])[_0x80b7('0x4e')](_0x80b7('0x87')));});var _0x54541e=_0x4f6399[_0x80b7('0x55')]('.qd-ddc-prodWrapper');_0x4f6399['find'](_0x80b7('0xc7'))['on'](_0x80b7('0xc8'),function(){_0x38d8da[_0x80b7('0xc9')]('-',void 0x0,void 0x0,_0x54541e);return!0x1;});_0x4f6399[_0x80b7('0x55')](_0x80b7('0xca'))['on'](_0x80b7('0xcb'),function(){_0x38d8da['scrollCart'](void 0x0,void 0x0,void 0x0,_0x54541e);return!0x1;});_0x4f6399[_0x80b7('0x55')](_0x80b7('0xcc'))['val']('')['on'](_0x80b7('0xcd'),function(){_0x38d8da[_0x80b7('0xce')](_0x9ecbe1(this));});if(_0x551ab0[_0x80b7('0xcf')]){var _0x36298c=0x0;_0x9ecbe1(this)['on'](_0x80b7('0xd0'),function(){var _0x4f6399=function(){window['_QuatroDigital_DropDown'][_0x80b7('0x8d')]&&(_0x38d8da[_0x80b7('0xd1')](),window[_0x80b7('0x5b')][_0x80b7('0x8d')]=!0x1,_0x9ecbe1['fn'][_0x80b7('0x26')](!0x0),_0x38d8da[_0x80b7('0xd2')]());};_0x36298c=setInterval(function(){_0x4f6399();},0x258);_0x4f6399();});_0x9ecbe1(this)['on'](_0x80b7('0xd3'),function(){clearInterval(_0x36298c);});}};var _0x1c6d8f=function(_0x32be73){_0x32be73=_0x9ecbe1(_0x32be73);_0x551ab0['texts'][_0x80b7('0xd4')]=_0x551ab0[_0x80b7('0xd5')]['cartTotal']['replace']('#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>');_0x551ab0[_0x80b7('0xd5')][_0x80b7('0xd4')]=_0x551ab0[_0x80b7('0xd5')][_0x80b7('0xd4')][_0x80b7('0xb')](_0x80b7('0xd6'),_0x80b7('0xd7'));_0x551ab0[_0x80b7('0xd5')][_0x80b7('0xd4')]=_0x551ab0[_0x80b7('0xd5')][_0x80b7('0xd4')][_0x80b7('0xb')]('#shipping',_0x80b7('0xd8'));_0x551ab0[_0x80b7('0xd5')]['cartTotal']=_0x551ab0[_0x80b7('0xd5')][_0x80b7('0xd4')][_0x80b7('0xb')](_0x80b7('0xd9'),_0x80b7('0xda'));_0x32be73[_0x80b7('0x55')](_0x80b7('0xdb'))[_0x80b7('0x51')](_0x551ab0[_0x80b7('0xd5')][_0x80b7('0xdc')]);_0x32be73[_0x80b7('0x55')](_0x80b7('0xdd'))[_0x80b7('0x51')](_0x551ab0['texts']['continueShopping']);_0x32be73[_0x80b7('0x55')](_0x80b7('0xde'))[_0x80b7('0x51')](_0x551ab0['texts'][_0x80b7('0xdf')]);_0x32be73[_0x80b7('0x55')](_0x80b7('0xe0'))[_0x80b7('0x51')](_0x551ab0[_0x80b7('0xd5')][_0x80b7('0xd4')]);_0x32be73[_0x80b7('0x55')]('.qd-ddc-shipping')[_0x80b7('0x51')](_0x551ab0[_0x80b7('0xd5')][_0x80b7('0xe1')]);_0x32be73[_0x80b7('0x55')](_0x80b7('0xe2'))[_0x80b7('0x51')](_0x551ab0[_0x80b7('0xd5')][_0x80b7('0x58')]);return _0x32be73;}(this[_0x80b7('0xe3')]);var _0x432136=0x0;_0x38e029[_0x80b7('0x37')](function(){0x0<_0x432136?_0x55fc57[_0x80b7('0x29')](this,_0x1c6d8f['clone']()):_0x55fc57[_0x80b7('0x29')](this,_0x1c6d8f);_0x432136++;});window[_0x80b7('0x3d')][_0x80b7('0x45')][_0x80b7('0x30')](function(){_0x9ecbe1('.qd-ddc-infoTotalValue')[_0x80b7('0x51')](window[_0x80b7('0x3d')][_0x80b7('0x3c')]||'--');_0x9ecbe1(_0x80b7('0xe4'))['html'](window[_0x80b7('0x3d')][_0x80b7('0x41')]||'0');_0x9ecbe1('.qd-ddc-infoTotalShipping')[_0x80b7('0x51')](window[_0x80b7('0x3d')][_0x80b7('0x3e')]||'--');_0x9ecbe1(_0x80b7('0xe5'))['html'](window[_0x80b7('0x3d')]['allTotal']||'--');});var _0x2c9743=function(_0x3bbc8b,_0x423c57){if(_0x80b7('0x2')===typeof _0x3bbc8b['items'])return _0x2c2fef(_0x80b7('0xe6'));_0x38d8da[_0x80b7('0xe7')][_0x80b7('0x29')](this,_0x423c57);};_0x38d8da[_0x80b7('0xd1')]=function(_0x24cfbd,_0x4b55c7){_0x80b7('0x2')!=typeof _0x4b55c7?window[_0x80b7('0x5b')][_0x80b7('0xe8')]=_0x4b55c7:window[_0x80b7('0x5b')][_0x80b7('0xe8')]&&(_0x4b55c7=window[_0x80b7('0x5b')][_0x80b7('0xe8')]);setTimeout(function(){window[_0x80b7('0x5b')][_0x80b7('0xe8')]=void 0x0;},_0x551ab0[_0x80b7('0xe9')]);_0x9ecbe1(_0x80b7('0xea'))[_0x80b7('0x4e')](_0x80b7('0xeb'));if(_0x551ab0[_0x80b7('0x5a')]){var _0x36298c=function(_0x3a2481){window[_0x80b7('0x5b')][_0x80b7('0x28')]=_0x3a2481;_0x2c9743(_0x3a2481,_0x4b55c7);_0x80b7('0x2')!==typeof window['_QuatroDigital_AmountProduct']&&_0x80b7('0x8')===typeof window[_0x80b7('0xec')][_0x80b7('0xed')]&&window[_0x80b7('0xec')][_0x80b7('0xed')][_0x80b7('0x29')](this);_0x9ecbe1(_0x80b7('0xea'))[_0x80b7('0x4c')](_0x80b7('0xeb'));};_0x80b7('0x2')!==typeof window[_0x80b7('0x5b')]['getOrderForm']?(_0x36298c(window[_0x80b7('0x5b')][_0x80b7('0x28')]),_0x80b7('0x8')===typeof _0x24cfbd&&_0x24cfbd(window[_0x80b7('0x5b')][_0x80b7('0x28')])):_0x9ecbe1['QD_checkoutQueue']([_0x80b7('0x43'),_0x80b7('0x39'),_0x80b7('0x5f')],{'done':function(_0x466842){_0x36298c[_0x80b7('0x29')](this,_0x466842);'function'===typeof _0x24cfbd&&_0x24cfbd(_0x466842);},'fail':function(_0x5a815c){_0x2c2fef([_0x80b7('0xee'),_0x5a815c]);}});}else alert(_0x80b7('0xef'));};_0x38d8da[_0x80b7('0xd2')]=function(){var _0x58dcbe=_0x9ecbe1('.qd-ddc-wrapper');_0x58dcbe['find'](_0x80b7('0xf0'))[_0x80b7('0x6')]?_0x58dcbe[_0x80b7('0x4e')](_0x80b7('0xf1')):_0x58dcbe[_0x80b7('0x4c')](_0x80b7('0xf1'));};_0x38d8da[_0x80b7('0xe7')]=function(_0x222267){var _0x36298c=_0x9ecbe1(_0x80b7('0xf2'));_0x36298c[_0x80b7('0xf3')]();_0x36298c[_0x80b7('0x37')](function(){var _0x36298c=_0x9ecbe1(this),_0x4513f1,_0x56d776,_0x21cb13=_0x9ecbe1(''),_0x14ecde;for(_0x14ecde in window['_QuatroDigital_DropDown'][_0x80b7('0x28')][_0x80b7('0x43')])if('object'===typeof window[_0x80b7('0x5b')][_0x80b7('0x28')][_0x80b7('0x43')][_0x14ecde]){var _0x4ebe2f=window[_0x80b7('0x5b')][_0x80b7('0x28')][_0x80b7('0x43')][_0x14ecde];var _0x467bb8=_0x4ebe2f[_0x80b7('0xf4')][_0x80b7('0xb')](/^\/|\/$/g,'')['split']('/');var _0xf8d0f4=_0x9ecbe1(_0x80b7('0xf5'));_0xf8d0f4['attr']({'data-sku':_0x4ebe2f['id'],'data-sku-index':_0x14ecde,'data-qd-departament':_0x467bb8[0x0],'data-qd-category':_0x467bb8[_0x467bb8[_0x80b7('0x6')]-0x1]});_0xf8d0f4[_0x80b7('0x4c')](_0x80b7('0xf6')+_0x4ebe2f['availability']);_0xf8d0f4[_0x80b7('0x55')](_0x80b7('0xf7'))[_0x80b7('0x81')](_0x551ab0['skuName'](_0x4ebe2f));_0xf8d0f4[_0x80b7('0x55')](_0x80b7('0xf8'))[_0x80b7('0x81')](isNaN(_0x4ebe2f[_0x80b7('0xf9')])?_0x4ebe2f[_0x80b7('0xf9')]:0x0==_0x4ebe2f[_0x80b7('0xf9')]?_0x80b7('0xfa'):(_0x9ecbe1(_0x80b7('0x35'))[_0x80b7('0x94')](_0x80b7('0x36'))||'R$')+'\x20'+qd_number_format(_0x4ebe2f[_0x80b7('0xf9')]/0x64,0x2,',','.'));_0xf8d0f4[_0x80b7('0x55')]('.qd-ddc-quantity')[_0x80b7('0x94')]({'data-sku':_0x4ebe2f['id'],'data-sku-index':_0x14ecde})[_0x80b7('0xfb')](_0x4ebe2f[_0x80b7('0x44')]);_0xf8d0f4[_0x80b7('0x55')](_0x80b7('0xfc'))[_0x80b7('0x94')]({'data-sku':_0x4ebe2f['id'],'data-sku-index':_0x14ecde});_0x38d8da[_0x80b7('0xfd')](_0x4ebe2f['id'],_0xf8d0f4[_0x80b7('0x55')](_0x80b7('0xfe')),_0x4ebe2f[_0x80b7('0xff')]);_0xf8d0f4[_0x80b7('0x55')](_0x80b7('0x100'))[_0x80b7('0x94')]({'data-sku':_0x4ebe2f['id'],'data-sku-index':_0x14ecde});_0xf8d0f4[_0x80b7('0x101')](_0x36298c);_0x21cb13=_0x21cb13['add'](_0xf8d0f4);}try{var _0x854791=_0x36298c['getParent']('.qd-ddc-wrapper')[_0x80b7('0x55')](_0x80b7('0xcc'));_0x854791['length']&&''==_0x854791['val']()&&window[_0x80b7('0x5b')][_0x80b7('0x28')][_0x80b7('0x5f')][_0x80b7('0x102')]&&_0x854791['val'](window[_0x80b7('0x5b')][_0x80b7('0x28')]['shippingData'][_0x80b7('0x102')][_0x80b7('0x103')]);}catch(_0x621d04){_0x2c2fef(_0x80b7('0x104')+_0x621d04[_0x80b7('0x23')],_0x80b7('0x6b'));}_0x38d8da[_0x80b7('0x105')](_0x36298c);_0x38d8da[_0x80b7('0xd2')]();_0x222267&&_0x222267[_0x80b7('0x106')]&&function(){_0x56d776=_0x21cb13[_0x80b7('0x49')](_0x80b7('0x107')+_0x222267[_0x80b7('0x106')]+'\x27]');_0x56d776[_0x80b7('0x6')]&&(_0x4513f1=0x0,_0x21cb13[_0x80b7('0x37')](function(){var _0x222267=_0x9ecbe1(this);if(_0x222267['is'](_0x56d776))return!0x1;_0x4513f1+=_0x222267[_0x80b7('0x108')]();}),_0x38d8da['scrollCart'](void 0x0,void 0x0,_0x4513f1,_0x36298c[_0x80b7('0x30')](_0x36298c[_0x80b7('0xa4')]())),_0x21cb13[_0x80b7('0x4e')](_0x80b7('0x109')),function(_0x3c0c88){_0x3c0c88[_0x80b7('0x4c')](_0x80b7('0x10a'));_0x3c0c88[_0x80b7('0x4c')](_0x80b7('0x109'));setTimeout(function(){_0x3c0c88['removeClass'](_0x80b7('0x10a'));},_0x551ab0[_0x80b7('0xe9')]);}(_0x56d776));}();});(function(){_QuatroDigital_DropDown[_0x80b7('0x28')][_0x80b7('0x43')][_0x80b7('0x6')]?(_0x9ecbe1(_0x80b7('0x6f'))[_0x80b7('0x4e')](_0x80b7('0x10b'))[_0x80b7('0x4c')](_0x80b7('0x10c')),setTimeout(function(){_0x9ecbe1(_0x80b7('0x6f'))[_0x80b7('0x4e')](_0x80b7('0x10d'));},_0x551ab0[_0x80b7('0xe9')])):_0x9ecbe1('body')['removeClass'](_0x80b7('0x10e'))[_0x80b7('0x4c')](_0x80b7('0x10b'));}());_0x80b7('0x8')===typeof _0x551ab0[_0x80b7('0x10f')]?_0x551ab0['callbackProductsList'][_0x80b7('0x29')](this):_0x2c2fef(_0x80b7('0x110'));};_0x38d8da[_0x80b7('0xfd')]=function(_0x3c72af,_0x34ca05,_0x1e1a2e){function _0x5eb293(){_0x34ca05[_0x80b7('0x4e')]('qd-loaded')[_0x80b7('0x93')](function(){_0x9ecbe1(this)[_0x80b7('0x4c')](_0x80b7('0x111'));})[_0x80b7('0x94')](_0x80b7('0x112'),_0x1e1a2e);}_0x1e1a2e?_0x5eb293():isNaN(_0x3c72af)?_0x2c2fef(_0x80b7('0x113'),'alerta'):alert('Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.');};_0x38d8da[_0x80b7('0x105')]=function(_0x1a0f28){var _0x3b59e4=function(_0x9da36d,_0x1767ef){var _0x36298c=_0x9ecbe1(_0x9da36d);var _0x21bf8f=_0x36298c[_0x80b7('0x94')](_0x80b7('0x114'));var _0x4513f1=_0x36298c['attr'](_0x80b7('0x115'));if(_0x21bf8f){var _0xc50f46=parseInt(_0x36298c[_0x80b7('0xfb')]())||0x1;_0x38d8da[_0x80b7('0x116')]([_0x21bf8f,_0x4513f1],_0xc50f46,_0xc50f46+0x1,function(_0x373a0d){_0x36298c['val'](_0x373a0d);_0x80b7('0x8')===typeof _0x1767ef&&_0x1767ef();});}};var _0x36298c=function(_0x2dff74,_0x223128){var _0x36298c=_0x9ecbe1(_0x2dff74);var _0x2806d3=_0x36298c[_0x80b7('0x94')](_0x80b7('0x114'));var _0x4513f1=_0x36298c[_0x80b7('0x94')](_0x80b7('0x115'));if(_0x2806d3){var _0x422399=parseInt(_0x36298c['val']())||0x2;_0x38d8da[_0x80b7('0x116')]([_0x2806d3,_0x4513f1],_0x422399,_0x422399-0x1,function(_0x2973a2){_0x36298c[_0x80b7('0xfb')](_0x2973a2);_0x80b7('0x8')===typeof _0x223128&&_0x223128();});}};var _0x18b89c=function(_0x483bf8,_0x485dcc){var _0x36298c=_0x9ecbe1(_0x483bf8);var _0x1a495d=_0x36298c[_0x80b7('0x94')](_0x80b7('0x114'));var _0x4513f1=_0x36298c[_0x80b7('0x94')]('data-sku-index');if(_0x1a495d){var _0x398550=parseInt(_0x36298c[_0x80b7('0xfb')]())||0x1;_0x38d8da[_0x80b7('0x116')]([_0x1a495d,_0x4513f1],0x1,_0x398550,function(_0x527226){_0x36298c['val'](_0x527226);_0x80b7('0x8')===typeof _0x485dcc&&_0x485dcc();});}};var _0x4513f1=_0x1a0f28[_0x80b7('0x55')](_0x80b7('0x117'));_0x4513f1[_0x80b7('0x4c')](_0x80b7('0x118'))[_0x80b7('0x37')](function(){var _0x1a0f28=_0x9ecbe1(this);_0x1a0f28[_0x80b7('0x55')](_0x80b7('0x119'))['on'](_0x80b7('0x11a'),function(_0x46b9f6){_0x46b9f6['preventDefault']();_0x4513f1[_0x80b7('0x4c')](_0x80b7('0x11b'));_0x3b59e4(_0x1a0f28[_0x80b7('0x55')](_0x80b7('0x11c')),function(){_0x4513f1[_0x80b7('0x4e')](_0x80b7('0x11b'));});});_0x1a0f28[_0x80b7('0x55')](_0x80b7('0x11d'))['on'](_0x80b7('0x11e'),function(_0x5b2922){_0x5b2922[_0x80b7('0x7b')]();_0x4513f1['addClass'](_0x80b7('0x11b'));_0x36298c(_0x1a0f28[_0x80b7('0x55')](_0x80b7('0x11c')),function(){_0x4513f1['removeClass']('qd-loading');});});_0x1a0f28[_0x80b7('0x55')]('.qd-ddc-quantity')['on']('focusout.qd_ddc_change',function(){_0x4513f1['addClass']('qd-loading');_0x18b89c(this,function(){_0x4513f1[_0x80b7('0x4e')](_0x80b7('0x11b'));});});_0x1a0f28[_0x80b7('0x55')](_0x80b7('0x11c'))['on']('keyup.qd_ddc_change',function(_0x51cb13){0xd==_0x51cb13['keyCode']&&(_0x4513f1[_0x80b7('0x4c')](_0x80b7('0x11b')),_0x18b89c(this,function(){_0x4513f1[_0x80b7('0x4e')](_0x80b7('0x11b'));}));});});_0x1a0f28[_0x80b7('0x55')](_0x80b7('0xf0'))['each'](function(){var _0x1a0f28=_0x9ecbe1(this);_0x1a0f28[_0x80b7('0x55')](_0x80b7('0xfc'))['on'](_0x80b7('0x11f'),function(){_0x1a0f28['addClass'](_0x80b7('0x11b'));_0x38d8da['removeProduct'](_0x9ecbe1(this),function(_0x41e253){_0x41e253?_0x1a0f28[_0x80b7('0x120')](!0x0)['slideUp'](function(){_0x1a0f28[_0x80b7('0x121')]();_0x38d8da[_0x80b7('0xd2')]();}):_0x1a0f28[_0x80b7('0x4e')](_0x80b7('0x11b'));});return!0x1;});});};_0x38d8da[_0x80b7('0xce')]=function(_0x31509e){var _0x5cc415=_0x31509e['val'](),_0x5cc415=_0x5cc415['replace'](/[^0-9\-]/g,''),_0x5cc415=_0x5cc415['replace'](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x80b7('0x122')),_0x5cc415=_0x5cc415[_0x80b7('0xb')](/(.{9}).*/g,'$1');_0x31509e[_0x80b7('0xfb')](_0x5cc415);0x9<=_0x5cc415[_0x80b7('0x6')]&&(_0x31509e['data'](_0x80b7('0x123'))!=_0x5cc415&&_0x5ff52['calculateShipping']({'postalCode':_0x5cc415,'country':_0x80b7('0x124')})[_0x80b7('0x1c')](function(_0xaafa95){window[_0x80b7('0x5b')][_0x80b7('0x28')]=_0xaafa95;_0x38d8da['getCartInfoByUrl']();})[_0x80b7('0x1e')](function(_0x457381){_0x2c2fef([_0x80b7('0x125'),_0x457381]);updateCartData();}),_0x31509e[_0x80b7('0x17')](_0x80b7('0x123'),_0x5cc415));};_0x38d8da[_0x80b7('0x116')]=function(_0xce5eac,_0x4fb5fd,_0x345ee3,_0x255635){function _0x422916(_0x4d774c){_0x4d774c=_0x80b7('0x126')!==typeof _0x4d774c?!0x1:_0x4d774c;_0x38d8da[_0x80b7('0xd1')]();window['_QuatroDigital_DropDown'][_0x80b7('0x8d')]=!0x1;_0x38d8da['cartIsEmpty']();_0x80b7('0x2')!==typeof window[_0x80b7('0xec')]&&_0x80b7('0x8')===typeof window[_0x80b7('0xec')]['exec']&&window[_0x80b7('0xec')]['exec']['call'](this);_0x80b7('0x8')===typeof adminCart&&adminCart();_0x9ecbe1['fn'][_0x80b7('0x26')](!0x0,void 0x0,_0x4d774c);'function'===typeof _0x255635&&_0x255635(_0x4fb5fd);}_0x345ee3=_0x345ee3||0x1;if(0x1>_0x345ee3)return _0x4fb5fd;if(_0x551ab0[_0x80b7('0x5a')]){if(_0x80b7('0x2')===typeof window['_QuatroDigital_DropDown']['getOrderForm'][_0x80b7('0x43')][_0xce5eac[0x1]])return _0x2c2fef(_0x80b7('0x127')+_0xce5eac[0x1]+']'),_0x4fb5fd;window['_QuatroDigital_DropDown'][_0x80b7('0x28')]['items'][_0xce5eac[0x1]][_0x80b7('0x44')]=_0x345ee3;window['_QuatroDigital_DropDown']['getOrderForm'][_0x80b7('0x43')][_0xce5eac[0x1]][_0x80b7('0x128')]=_0xce5eac[0x1];_0x5ff52[_0x80b7('0x129')]([window[_0x80b7('0x5b')][_0x80b7('0x28')][_0x80b7('0x43')][_0xce5eac[0x1]]],[_0x80b7('0x43'),_0x80b7('0x39'),'shippingData'])[_0x80b7('0x1c')](function(_0x292dfa){window[_0x80b7('0x5b')]['getOrderForm']=_0x292dfa;_0x422916(!0x0);})[_0x80b7('0x1e')](function(_0x2fc067){_0x2c2fef([_0x80b7('0x12a'),_0x2fc067]);_0x422916();});}else _0x2c2fef(_0x80b7('0x12b'));};_0x38d8da[_0x80b7('0x12c')]=function(_0x50911b,_0x21169e){function _0xc60eec(_0x361fad){_0x361fad=_0x80b7('0x126')!==typeof _0x361fad?!0x1:_0x361fad;_0x80b7('0x2')!==typeof window[_0x80b7('0xec')]&&_0x80b7('0x8')===typeof window[_0x80b7('0xec')][_0x80b7('0xed')]&&window[_0x80b7('0xec')][_0x80b7('0xed')]['call'](this);'function'===typeof adminCart&&adminCart();_0x9ecbe1['fn']['simpleCart'](!0x0,void 0x0,_0x361fad);_0x80b7('0x8')===typeof _0x21169e&&_0x21169e(_0x4513f1);}var _0x4513f1=!0x1,_0x6c19cd=_0x9ecbe1(_0x50911b)[_0x80b7('0x94')](_0x80b7('0x115'));if(_0x551ab0[_0x80b7('0x5a')]){if(_0x80b7('0x2')===typeof window[_0x80b7('0x5b')][_0x80b7('0x28')][_0x80b7('0x43')][_0x6c19cd])return _0x2c2fef(_0x80b7('0x127')+_0x6c19cd+']'),_0x4513f1;window[_0x80b7('0x5b')][_0x80b7('0x28')][_0x80b7('0x43')][_0x6c19cd]['index']=_0x6c19cd;_0x5ff52['removeItems']([window[_0x80b7('0x5b')]['getOrderForm']['items'][_0x6c19cd]],[_0x80b7('0x43'),_0x80b7('0x39'),_0x80b7('0x5f')])[_0x80b7('0x1c')](function(_0x4c5c88){_0x4513f1=!0x0;window['_QuatroDigital_DropDown']['getOrderForm']=_0x4c5c88;_0x2c9743(_0x4c5c88);_0xc60eec(!0x0);})[_0x80b7('0x1e')](function(_0x4dc651){_0x2c2fef(['Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho',_0x4dc651]);_0xc60eec();});}else alert('Atenção,\x20este\x20método\x20esta\x20descontinuado.');};_0x38d8da[_0x80b7('0xc9')]=function(_0x1aaef2,_0x5789aa,_0x92bab0,_0x1e2825){_0x1e2825=_0x1e2825||_0x9ecbe1(_0x80b7('0x12d'));_0x1aaef2=_0x1aaef2||'+';_0x5789aa=_0x5789aa||0.9*_0x1e2825[_0x80b7('0x12e')]();_0x1e2825[_0x80b7('0x120')](!0x0,!0x0)[_0x80b7('0x12f')]({'scrollTop':isNaN(_0x92bab0)?_0x1aaef2+'='+_0x5789aa+'px':_0x92bab0});};_0x551ab0[_0x80b7('0xcf')]||(_0x38d8da[_0x80b7('0xd1')](),_0x9ecbe1['fn'][_0x80b7('0x26')](!0x0));_0x9ecbe1(window)['on'](_0x80b7('0x130'),function(){try{window[_0x80b7('0x5b')][_0x80b7('0x28')]=void 0x0,_0x38d8da['getCartInfoByUrl']();}catch(_0x5e5d36){_0x2c2fef(_0x80b7('0x131')+_0x5e5d36[_0x80b7('0x23')],_0x80b7('0x132'));}});'function'===typeof _0x551ab0[_0x80b7('0x45')]?_0x551ab0[_0x80b7('0x45')][_0x80b7('0x29')](this):_0x2c2fef(_0x80b7('0xa7'));};_0x9ecbe1['fn'][_0x80b7('0xb1')]=function(_0x1accb6){var _0x221c4a=_0x9ecbe1(this);_0x221c4a['fn']=new _0x9ecbe1['QD_dropDownCart'](this,_0x1accb6);return _0x221c4a;};}catch(_0x3794c0){'undefined'!==typeof console&&'function'===typeof console[_0x80b7('0x14')]&&console[_0x80b7('0x14')](_0x80b7('0xaf'),_0x3794c0);}}(this));(function(_0xca9d6e){try{var _0x3a3d9d=jQuery;window[_0x80b7('0xec')]=window[_0x80b7('0xec')]||{};window[_0x80b7('0xec')][_0x80b7('0x43')]={};window[_0x80b7('0xec')][_0x80b7('0x133')]=!0x1;window[_0x80b7('0xec')][_0x80b7('0x134')]=!0x1;window[_0x80b7('0xec')][_0x80b7('0x135')]=!0x1;var _0x9df78b=function(){if(window['_QuatroDigital_AmountProduct'][_0x80b7('0x133')]){var _0xe0263d=!0x1;var _0xca9d6e={};window[_0x80b7('0xec')]['items']={};for(_0x4ae21f in window['_QuatroDigital_DropDown'][_0x80b7('0x28')][_0x80b7('0x43')])if(_0x80b7('0x16')===typeof window['_QuatroDigital_DropDown']['getOrderForm'][_0x80b7('0x43')][_0x4ae21f]){var _0x164931=window[_0x80b7('0x5b')][_0x80b7('0x28')][_0x80b7('0x43')][_0x4ae21f];_0x80b7('0x2')!==typeof _0x164931['productId']&&null!==_0x164931['productId']&&''!==_0x164931[_0x80b7('0x136')]&&(window[_0x80b7('0xec')][_0x80b7('0x43')]['prod_'+_0x164931['productId']]=window['_QuatroDigital_AmountProduct'][_0x80b7('0x43')][_0x80b7('0x137')+_0x164931[_0x80b7('0x136')]]||{},window['_QuatroDigital_AmountProduct'][_0x80b7('0x43')][_0x80b7('0x137')+_0x164931[_0x80b7('0x136')]][_0x80b7('0x138')]=_0x164931['productId'],_0xca9d6e[_0x80b7('0x137')+_0x164931['productId']]||(window[_0x80b7('0xec')]['items'][_0x80b7('0x137')+_0x164931['productId']][_0x80b7('0x41')]=0x0),window['_QuatroDigital_AmountProduct'][_0x80b7('0x43')]['prod_'+_0x164931[_0x80b7('0x136')]][_0x80b7('0x41')]+=_0x164931['quantity'],_0xe0263d=!0x0,_0xca9d6e[_0x80b7('0x137')+_0x164931['productId']]=!0x0);}var _0x4ae21f=_0xe0263d;}else _0x4ae21f=void 0x0;window[_0x80b7('0xec')]['allowRecalculate']&&(_0x3a3d9d('.qd-bap-wrapper')['remove'](),_0x3a3d9d('.qd-bap-item-added')[_0x80b7('0x4e')](_0x80b7('0x139')));for(var _0x66c149 in window[_0x80b7('0xec')][_0x80b7('0x43')]){_0x164931=window[_0x80b7('0xec')]['items'][_0x66c149];if(_0x80b7('0x16')!==typeof _0x164931)return;_0xca9d6e=_0x3a3d9d(_0x80b7('0x13a')+_0x164931[_0x80b7('0x138')]+']')[_0x80b7('0x0')]('li');if(window[_0x80b7('0xec')][_0x80b7('0x133')]||!_0xca9d6e[_0x80b7('0x55')](_0x80b7('0x13b'))[_0x80b7('0x6')])_0xe0263d=_0x3a3d9d('<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>'),_0xe0263d[_0x80b7('0x55')](_0x80b7('0x13c'))[_0x80b7('0x51')](_0x164931[_0x80b7('0x41')]),_0x164931=_0xca9d6e[_0x80b7('0x55')](_0x80b7('0x13d')),_0x164931[_0x80b7('0x6')]?_0x164931[_0x80b7('0xa8')](_0xe0263d)[_0x80b7('0x4c')]('qd-bap-item-added'):_0xca9d6e[_0x80b7('0xa8')](_0xe0263d);}_0x4ae21f&&(window[_0x80b7('0xec')][_0x80b7('0x133')]=!0x1);};window[_0x80b7('0xec')]['exec']=function(){window[_0x80b7('0xec')][_0x80b7('0x133')]=!0x0;_0x9df78b[_0x80b7('0x29')](this);};_0x3a3d9d(document)[_0x80b7('0xad')](function(){_0x9df78b[_0x80b7('0x29')](this);});}catch(_0x1b0034){_0x80b7('0x2')!==typeof console&&_0x80b7('0x8')===typeof console[_0x80b7('0x14')]&&console[_0x80b7('0x14')](_0x80b7('0xaf'),_0x1b0034);}}(this));(function(){try{var _0x41f3ef=jQuery,_0x20362f,_0x15b4b2={'selector':_0x80b7('0x13e'),'dropDown':{},'buyButton':{}};_0x41f3ef['QD_smartCart']=function(_0x358211){var _0x5eb69c={};_0x20362f=_0x41f3ef['extend'](!0x0,{},_0x15b4b2,_0x358211);_0x358211=_0x41f3ef(_0x20362f[_0x80b7('0x84')])[_0x80b7('0xb1')](_0x20362f[_0x80b7('0x13f')]);_0x5eb69c[_0x80b7('0x8f')]=_0x80b7('0x2')!==typeof _0x20362f['dropDown'][_0x80b7('0xcf')]&&!0x1===_0x20362f[_0x80b7('0x13f')][_0x80b7('0xcf')]?_0x41f3ef(_0x20362f[_0x80b7('0x84')])[_0x80b7('0x75')](_0x358211['fn'],_0x20362f[_0x80b7('0x8f')]):_0x41f3ef(_0x20362f[_0x80b7('0x84')])[_0x80b7('0x75')](_0x20362f[_0x80b7('0x8f')]);_0x5eb69c[_0x80b7('0x13f')]=_0x358211;return _0x5eb69c;};_0x41f3ef['fn'][_0x80b7('0x140')]=function(){'object'===typeof console&&'function'===typeof console[_0x80b7('0x2f')]&&console[_0x80b7('0x2f')]('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x41f3ef[_0x80b7('0x140')]=_0x41f3ef['fn'][_0x80b7('0x140')];}catch(_0xeb973a){_0x80b7('0x2')!==typeof console&&_0x80b7('0x8')===typeof console['error']&&console['error']('Oooops!\x20',_0xeb973a);}}());

/* Quatro Digital - Product Thumbs // Carlos Vinicius // Todos os direitos reservados. */
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs();a.trigger("QuatroDigital.pt_callback",[a])}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return a.length?$.extend({},a,new b(a)):a},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0x31d7=['length','indexOf','youtube','push','pop','shift','<div\x20class=\x22qd-playerWrapper\x22></div>','prependTo','#include','wrap','<div\x20class=\x22qd-playerContainer\x22></div>','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','join','toUpperCase','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','html','<iframe\x20src=\x22','urlProtocol','?wmode=transparent&rel=0&enablejsapi=1\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>','data','height','stop','fadeTo','addClass','qdpv-video-on','add','animate','find','iframe','a:not(\x27.qd-videoLink\x27)','bind','click.removeVideo','hide','removeAttr','removeClass','.qd-videoItem','call','string','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','.ON','controlVideo','.qd-playerWrapper\x20iframe','contentWindow','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','attr','rel','a:not(.qd-videoLink)','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','appendTo','trigger','QuatroDigital.pv_video_added','ImageControl','.qd-videoLink','body','.produto','undefined','alerta','toLowerCase','[Video\x20in\x20product]\x20','info','error','qdVideoInProduct','extend','start','td.value-field.Videos:first','http','ul.thumbs','div#image','videoFieldSelector','replace','split'];(function(_0x11bc89,_0x36ec22){var _0x3703a3=function(_0x7fba0b){while(--_0x7fba0b){_0x11bc89['push'](_0x11bc89['shift']());}};_0x3703a3(++_0x36ec22);}(_0x31d7,0x160));var _0x731d=function(_0xe2b070,_0x1afe0a){_0xe2b070=_0xe2b070-0x0;var _0x40bb38=_0x31d7[_0xe2b070];return _0x40bb38;};(function(_0x31cb3b){$(function(){if($(document[_0x731d('0x0')])['is'](_0x731d('0x1'))){var _0x13d23a=[];var _0x5ac512=function(_0x5609fb,_0x49c580){'object'===typeof console&&(_0x731d('0x2')!==typeof _0x49c580&&_0x731d('0x3')===_0x49c580[_0x731d('0x4')]()?console['warn'](_0x731d('0x5')+_0x5609fb):'undefined'!==typeof _0x49c580&&_0x731d('0x6')===_0x49c580[_0x731d('0x4')]()?console['info']('[Video\x20in\x20product]\x20'+_0x5609fb):console[_0x731d('0x7')](_0x731d('0x5')+_0x5609fb));};window[_0x731d('0x8')]=window[_0x731d('0x8')]||{};var _0x4602df=$[_0x731d('0x9')](!0x0,{'insertThumbsIn':_0x731d('0xa'),'videoFieldSelector':_0x731d('0xb'),'controlVideo':!0x0,'urlProtocol':_0x731d('0xc')},window[_0x731d('0x8')]);var _0x377493=$(_0x731d('0xd'));var _0x11aa45=$(_0x731d('0xe'));var _0x2f6124=$(_0x4602df[_0x731d('0xf')])['text']()[_0x731d('0x10')](/\;\s*/,';')[_0x731d('0x11')](';');for(var _0x94ba79=0x0;_0x94ba79<_0x2f6124[_0x731d('0x12')];_0x94ba79++)-0x1<_0x2f6124[_0x94ba79][_0x731d('0x13')](_0x731d('0x14'))?_0x13d23a[_0x731d('0x15')](_0x2f6124[_0x94ba79][_0x731d('0x11')]('v=')[_0x731d('0x16')]()[_0x731d('0x11')](/[&#]/)[_0x731d('0x17')]()):-0x1<_0x2f6124[_0x94ba79]['indexOf']('youtu.be')&&_0x13d23a[_0x731d('0x15')](_0x2f6124[_0x94ba79]['split']('be/')['pop']()[_0x731d('0x11')](/[\?&#]/)[_0x731d('0x17')]());var _0x3775ea=$(_0x731d('0x18'));_0x3775ea[_0x731d('0x19')](_0x731d('0x1a'));_0x3775ea[_0x731d('0x1b')](_0x731d('0x1c'));_0x2f6124=function(_0x3b6607){var _0x3f38b0={'t':_0x731d('0x1d')};return function(_0x263b83){var _0x25e0bb=function(_0x742994){return _0x742994;};var _0x1b82f1=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x263b83=_0x263b83['d'+_0x1b82f1[0x10]+'c'+_0x1b82f1[0x11]+'m'+_0x25e0bb(_0x1b82f1[0x1])+'n'+_0x1b82f1[0xd]]['l'+_0x1b82f1[0x12]+'c'+_0x1b82f1[0x0]+'ti'+_0x25e0bb('o')+'n'];var _0x37f8fc=function(_0x4fac7d){return escape(encodeURIComponent(_0x4fac7d[_0x731d('0x10')](/\./g,'¨')[_0x731d('0x10')](/[a-zA-Z]/g,function(_0x22a2d9){return String[_0x731d('0x1e')](('Z'>=_0x22a2d9?0x5a:0x7a)>=(_0x22a2d9=_0x22a2d9['charCodeAt'](0x0)+0xd)?_0x22a2d9:_0x22a2d9-0x1a);})));};var _0x37144e=_0x37f8fc(_0x263b83[[_0x1b82f1[0x9],_0x25e0bb('o'),_0x1b82f1[0xc],_0x1b82f1[_0x25e0bb(0xd)]][_0x731d('0x1f')]('')]);_0x37f8fc=_0x37f8fc((window[['js',_0x25e0bb('no'),'m',_0x1b82f1[0x1],_0x1b82f1[0x4][_0x731d('0x20')](),'ite'][_0x731d('0x1f')]('')]||'---')+['.v',_0x1b82f1[0xd],'e',_0x25e0bb('x'),'co',_0x25e0bb('mm'),'erc',_0x1b82f1[0x1],'.c',_0x25e0bb('o'),'m.',_0x1b82f1[0x13],'r']['join'](''));for(var _0x43e662 in _0x3f38b0){if(_0x37f8fc===_0x43e662+_0x3f38b0[_0x43e662]||_0x37144e===_0x43e662+_0x3f38b0[_0x43e662]){var _0x2177e6='tr'+_0x1b82f1[0x11]+'e';break;}_0x2177e6='f'+_0x1b82f1[0x0]+'ls'+_0x25e0bb(_0x1b82f1[0x1])+'';}_0x25e0bb=!0x1;-0x1<_0x263b83[[_0x1b82f1[0xc],'e',_0x1b82f1[0x0],'rc',_0x1b82f1[0x9]]['join']('')]['indexOf'](_0x731d('0x21'))&&(_0x25e0bb=!0x0);return[_0x2177e6,_0x25e0bb];}(_0x3b6607);}(window);if(!eval(_0x2f6124[0x0]))return _0x2f6124[0x1]?_0x5ac512('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x5dce9d=function(_0x519ee6,_0x328fee){_0x731d('0x14')===_0x328fee&&_0x3775ea[_0x731d('0x22')](_0x731d('0x23')+_0x4602df[_0x731d('0x24')]+'://www.youtube.com/embed/'+_0x519ee6+_0x731d('0x25'));_0x11aa45[_0x731d('0x26')](_0x731d('0x27'),_0x11aa45[_0x731d('0x26')]('height')||_0x11aa45['height']());_0x11aa45[_0x731d('0x28')](!0x0,!0x0)[_0x731d('0x29')](0x1f4,0x0,function(){$(_0x731d('0x0'))[_0x731d('0x2a')](_0x731d('0x2b'));});_0x3775ea['stop'](!0x0,!0x0)[_0x731d('0x29')](0x1f4,0x1,function(){_0x11aa45[_0x731d('0x2c')](_0x3775ea)[_0x731d('0x2d')]({'height':_0x3775ea[_0x731d('0x2e')](_0x731d('0x2f'))[_0x731d('0x27')]()},0x2bc);});};removePlayer=function(){_0x377493[_0x731d('0x2e')](_0x731d('0x30'))[_0x731d('0x31')](_0x731d('0x32'),function(){_0x3775ea[_0x731d('0x28')](!0x0,!0x0)[_0x731d('0x29')](0x1f4,0x0,function(){$(this)[_0x731d('0x33')]()[_0x731d('0x34')]('style');$(_0x731d('0x0'))[_0x731d('0x35')](_0x731d('0x2b'));});_0x11aa45['stop'](!0x0,!0x0)[_0x731d('0x29')](0x1f4,0x1,function(){var _0x2d5707=_0x11aa45[_0x731d('0x26')](_0x731d('0x27'));_0x2d5707&&_0x11aa45[_0x731d('0x2d')]({'height':_0x2d5707},0x2bc);});});};var _0x5512fa=function(){if(!_0x377493[_0x731d('0x2e')](_0x731d('0x36'))[_0x731d('0x12')])for(vId in removePlayer[_0x731d('0x37')](this),_0x13d23a)if(_0x731d('0x38')===typeof _0x13d23a[vId]&&''!==_0x13d23a[vId]){var _0x572199=$(_0x731d('0x39')+_0x13d23a[vId]+'/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27'+_0x13d23a[vId]+'\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/'+_0x13d23a[vId]+_0x731d('0x3a'));_0x572199[_0x731d('0x2e')]('a')[_0x731d('0x31')]('click.playVideo',function(){var _0x5e1218=$(this);_0x377493['find'](_0x731d('0x3b'))[_0x731d('0x35')]('ON');_0x5e1218[_0x731d('0x2a')]('ON');0x1==_0x4602df[_0x731d('0x3c')]?$('.qd-playerWrapper\x20iframe')['length']?(_0x5dce9d[_0x731d('0x37')](this,'',''),$(_0x731d('0x3d'))[0x0][_0x731d('0x3e')][_0x731d('0x3f')](_0x731d('0x40'),'*')):_0x5dce9d[_0x731d('0x37')](this,_0x5e1218['attr']('rel'),'youtube'):_0x5dce9d[_0x731d('0x37')](this,_0x5e1218[_0x731d('0x41')](_0x731d('0x42')),_0x731d('0x14'));return!0x1;});0x1==_0x4602df['controlVideo']&&_0x377493['find'](_0x731d('0x43'))['click'](function(_0x416fa3){$(_0x731d('0x3d'))[_0x731d('0x12')]&&$(_0x731d('0x3d'))[0x0][_0x731d('0x3e')][_0x731d('0x3f')](_0x731d('0x44'),'*');});'start'===_0x4602df['insertThumbsIn']?_0x572199['prependTo'](_0x377493):_0x572199[_0x731d('0x45')](_0x377493);_0x572199[_0x731d('0x46')](_0x731d('0x47'),[_0x13d23a[vId],_0x572199]);}};$(document)['ajaxStop'](_0x5512fa);$(window)['load'](_0x5512fa);(function(){var _0x2852cd=this;var _0x9eca6e=window[_0x731d('0x48')]||function(){};window[_0x731d('0x48')]=function(_0x4259f9,_0x386886){$(_0x4259f9||'')['is'](_0x731d('0x49'))||(_0x9eca6e[_0x731d('0x37')](this,_0x4259f9,_0x386886),_0x5512fa['call'](_0x2852cd));};}());}});}(this));

/* Quatro Digital - Mosaic Banners // Carlos Vinicius // Todos os direitos reservados */
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

