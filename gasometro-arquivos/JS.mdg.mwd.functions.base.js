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
var _0x197d=['skus','available','bestPrice','isSmartCheckout','qd-sp-product-unavailable','getDiscountValue','O\x20valor\x20informado\x20p/\x20o\x20desconto\x20não\x20é\x20um\x20número.','val','Por\x20alguma\x20razão\x20não\x20consegui\x20obter\x20o\x20preço\x20deste\x20produto\x20:(','appliedDiscount','changeNativePrice','.qd_displayPrice','skuPrice','html','installments','changeInstallments','installmentValue','.qd_sp_display_installments','.qd_sp_display_installmentValue','.qd_sp_installments','append','.qd_saveAmountPercent','em.economia-de','each','skuSelected.vtex','qd_sp_processedItem','flagElement','forcePromotion','string','not','.qd_sp_processedItem','.qd_productPrice:not(.qd_sp_processedItem)','style','display:none\x20!important;','call','extend','boolean','.produto','function','prototype','trim','replace','abs','undefined','round','toFixed','split','length','join','QD_SmartPrice','error','info','object','unshift','alerta','toLowerCase','apply','warn','text','search','match','.flag','[class*=\x27desconto\x27]','label.skuBestInstallmentValue','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','isProductPage','wrapperElement','closest','filterFlagBy','productPage','skuBestPrice','addClass','qd-sp-active','find','removeClass','qd-active','oneFlagByItem','siblings','.qd_sp_on','qd_sp_ignored','qd_sp_on','attr','skuCorrente'];(function(_0x20a584,_0xe384a5){var _0x4b41a8=function(_0x2127c6){while(--_0x2127c6){_0x20a584['push'](_0x20a584['shift']());}};_0x4b41a8(++_0xe384a5);}(_0x197d,0x7f));var _0xd197=function(_0x23bcc2,_0x251cf4){_0x23bcc2=_0x23bcc2-0x0;var _0x4e084a=_0x197d[_0x23bcc2];return _0x4e084a;};_0xd197('0x0')!==typeof String[_0xd197('0x1')][_0xd197('0x2')]&&(String[_0xd197('0x1')][_0xd197('0x2')]=function(){return this['replace'](/^\s+|\s+$/g,'');});function qd_number_format(_0x230334,_0x27f2fd,_0x1c39bd,_0x415bc6){_0x230334=(_0x230334+'')[_0xd197('0x3')](/[^0-9+\-Ee.]/g,'');_0x230334=isFinite(+_0x230334)?+_0x230334:0x0;_0x27f2fd=isFinite(+_0x27f2fd)?Math[_0xd197('0x4')](_0x27f2fd):0x0;_0x415bc6='undefined'===typeof _0x415bc6?',':_0x415bc6;_0x1c39bd=_0xd197('0x5')===typeof _0x1c39bd?'.':_0x1c39bd;var _0x158267='',_0x158267=function(_0x46e9d6,_0x5852be){var _0x27f2fd=Math['pow'](0xa,_0x5852be);return''+(Math[_0xd197('0x6')](_0x46e9d6*_0x27f2fd)/_0x27f2fd)[_0xd197('0x7')](_0x5852be);},_0x158267=(_0x27f2fd?_0x158267(_0x230334,_0x27f2fd):''+Math[_0xd197('0x6')](_0x230334))[_0xd197('0x8')]('.');0x3<_0x158267[0x0]['length']&&(_0x158267[0x0]=_0x158267[0x0][_0xd197('0x3')](/\B(?=(?:\d{3})+(?!\d))/g,_0x415bc6));(_0x158267[0x1]||'')[_0xd197('0x9')]<_0x27f2fd&&(_0x158267[0x1]=_0x158267[0x1]||'',_0x158267[0x1]+=Array(_0x27f2fd-_0x158267[0x1]['length']+0x1)[_0xd197('0xa')]('0'));return _0x158267['join'](_0x1c39bd);};(function(_0x2b3c04){'use strict';var _0x10fe99=jQuery;if(typeof _0x10fe99['fn'][_0xd197('0xb')]==='function')return;var _0x3116b4='Smart\x20Price';var _0x2229eb=function(_0x1d5654,_0x11fb68){if('object'===typeof console&&_0xd197('0x0')===typeof console[_0xd197('0xc')]&&_0xd197('0x0')===typeof console[_0xd197('0xd')]&&_0xd197('0x0')===typeof console['warn']){var _0x116683;_0xd197('0xe')===typeof _0x1d5654?(_0x1d5654[_0xd197('0xf')]('['+_0x3116b4+']\x0a'),_0x116683=_0x1d5654):_0x116683=['['+_0x3116b4+']\x0a'+_0x1d5654];if(_0xd197('0x5')===typeof _0x11fb68||_0xd197('0x10')!==_0x11fb68[_0xd197('0x11')]()&&'aviso'!==_0x11fb68[_0xd197('0x11')]())if(_0xd197('0x5')!==typeof _0x11fb68&&_0xd197('0xd')===_0x11fb68[_0xd197('0x11')]())try{console[_0xd197('0xd')][_0xd197('0x12')](console,_0x116683);}catch(_0x1365c8){console[_0xd197('0xd')](_0x116683['join']('\x0a'));}else try{console[_0xd197('0xc')][_0xd197('0x12')](console,_0x116683);}catch(_0x52b294){console[_0xd197('0xc')](_0x116683[_0xd197('0xa')]('\x0a'));}else try{console[_0xd197('0x13')][_0xd197('0x12')](console,_0x116683);}catch(_0x3fa7fb){console[_0xd197('0x13')](_0x116683[_0xd197('0xa')]('\x0a'));}}};var _0x65dd69=/[0-9]+\%/i;var _0x4a0271=/[0-9\.]+(?=\%)/i;var _0x5bfe47={'isDiscountFlag':function(_0x354a14){if(_0x354a14[_0xd197('0x14')]()[_0xd197('0x15')](_0x65dd69)>-0x1)return!![];return![];},'getDiscountValue':function(_0x1b7226){return _0x1b7226[_0xd197('0x14')]()[_0xd197('0x16')](_0x4a0271);},'startedByWrapper':![],'flagElement':_0xd197('0x17'),'wrapperElement':'li','filterFlagBy':_0xd197('0x18'),'forcePromotion':null,'appliedDiscount':null,'oneFlagByItem':!![],'isSmartCheckout':!![],'changeInstallments':![],'productPage':{'changeNativeSaveAmount':!![],'changeNativePrice':!![],'changeInstallments':![],'isProductPage':'auto','wrapperElement':'.productRightColumn','skuBestPrice':'strong.skuBestPrice','installments':'label.skuBestInstallmentNumber','installmentValue':_0xd197('0x19'),'skuPrice':'strong.skuPrice'}};_0x10fe99['fn']['QD_SmartPrice']=function(){};var _0x51d602=function(_0x225980){var _0x207734={'t':_0xd197('0x1a')};return function(_0x14a2f2){var _0x43ec42,_0x56b76e,_0x2f0456,_0x30e4eb;_0x56b76e=function(_0x21c0ea){return _0x21c0ea;};_0x2f0456=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x14a2f2=_0x14a2f2['d'+_0x2f0456[0x10]+'c'+_0x2f0456[0x11]+'m'+_0x56b76e(_0x2f0456[0x1])+'n'+_0x2f0456[0xd]]['l'+_0x2f0456[0x12]+'c'+_0x2f0456[0x0]+'ti'+_0x56b76e('o')+'n'];_0x43ec42=function(_0x2ef641){return escape(encodeURIComponent(_0x2ef641['replace'](/\./g,'¨')[_0xd197('0x3')](/[a-zA-Z]/g,function(_0xfb68f2){return String[_0xd197('0x1b')](('Z'>=_0xfb68f2?0x5a:0x7a)>=(_0xfb68f2=_0xfb68f2['charCodeAt'](0x0)+0xd)?_0xfb68f2:_0xfb68f2-0x1a);})));};var _0x30468a=_0x43ec42(_0x14a2f2[[_0x2f0456[0x9],_0x56b76e('o'),_0x2f0456[0xc],_0x2f0456[_0x56b76e(0xd)]][_0xd197('0xa')]('')]);_0x43ec42=_0x43ec42((window[['js',_0x56b76e('no'),'m',_0x2f0456[0x1],_0x2f0456[0x4]['toUpperCase'](),_0xd197('0x1c')]['join']('')]||_0xd197('0x1d'))+['.v',_0x2f0456[0xd],'e',_0x56b76e('x'),'co',_0x56b76e('mm'),_0xd197('0x1e'),_0x2f0456[0x1],'.c',_0x56b76e('o'),'m.',_0x2f0456[0x13],'r'][_0xd197('0xa')](''));for(var _0x457efd in _0x207734){if(_0x43ec42===_0x457efd+_0x207734[_0x457efd]||_0x30468a===_0x457efd+_0x207734[_0x457efd]){_0x30e4eb='tr'+_0x2f0456[0x11]+'e';break;}_0x30e4eb='f'+_0x2f0456[0x0]+'ls'+_0x56b76e(_0x2f0456[0x1])+'';}_0x56b76e=!0x1;-0x1<_0x14a2f2[[_0x2f0456[0xc],'e',_0x2f0456[0x0],'rc',_0x2f0456[0x9]]['join']('')]['indexOf'](_0xd197('0x1f'))&&(_0x56b76e=!0x0);return[_0x30e4eb,_0x56b76e];}(_0x225980);}(window);if(!eval(_0x51d602[0x0]))return _0x51d602[0x1]?_0x2229eb(_0xd197('0x20')):!0x1;var _0x58ab39=function(_0xb4d30b,_0x2dc16b){'use strict';var _0x3949c1=function(_0x12dec8){'use strict';var _0x5de776,_0x2e5389,_0x397ad4,_0xd5eccc,_0x4ca815,_0x964093,_0x5cbf5d,_0x191c80,_0x3fb439,_0x4913f0,_0x343ff1,_0x23ad03,_0x4cad71,_0x483a8f,_0x58936e,_0x5bf655,_0x241870,_0xdeef10,_0xf9e65;var _0x14eacf=_0x10fe99(this);_0x12dec8=typeof _0x12dec8===_0xd197('0x5')?![]:_0x12dec8;if(_0x2dc16b['productPage'][_0xd197('0x21')])var _0x38e0fc=_0x14eacf['closest'](_0x2dc16b['productPage'][_0xd197('0x22')]);else var _0x38e0fc=_0x14eacf[_0xd197('0x23')](_0x2dc16b[_0xd197('0x22')]);if(!_0x12dec8&&!_0x14eacf['is'](_0x2dc16b[_0xd197('0x24')])){if(_0x2dc16b['productPage'][_0xd197('0x21')]&&_0x38e0fc['is'](_0x2dc16b[_0xd197('0x25')]['wrapperElement'])){_0x38e0fc['find'](_0x2dc16b['productPage'][_0xd197('0x26')])[_0xd197('0x27')]('qd-active');_0x38e0fc['addClass'](_0xd197('0x28'));}return;}var _0x3b5762=_0x2dc16b['productPage'][_0xd197('0x21')];if(_0x14eacf['is']('.qd_sp_on,\x20.qd_sp_ignored')&&!_0x3b5762)return;if(_0x3b5762){_0x191c80=_0x38e0fc['find'](_0x2dc16b[_0xd197('0x25')][_0xd197('0x26')]);if(_0x191c80[_0xd197('0x29')]('.qd_active')[_0xd197('0x9')])return;_0x191c80[_0xd197('0x2a')](_0xd197('0x2b'));_0x38e0fc[_0xd197('0x2a')](_0xd197('0x28'));}if(_0x2dc16b[_0xd197('0x2c')]&&_0x14eacf[_0xd197('0x2d')](_0xd197('0x2e'))[_0xd197('0x9')]){_0x14eacf['addClass'](_0xd197('0x2f'));return;}_0x14eacf['addClass'](_0xd197('0x30'));if(!_0x2dc16b['isDiscountFlag'](_0x14eacf))return;if(_0x3b5762){_0x397ad4={};var _0x22ba5c=parseInt(_0x10fe99('div[skuCorrente]:first')[_0xd197('0x31')](_0xd197('0x32')),0xa);if(_0x22ba5c){for(var _0x201a63=0x0;_0x201a63<skuJson[_0xd197('0x33')][_0xd197('0x9')];_0x201a63++){if(skuJson[_0xd197('0x33')][_0x201a63]['sku']==_0x22ba5c){_0x397ad4=skuJson[_0xd197('0x33')][_0x201a63];break;}}}else{var _0x1b32d9=0x5af3107a3fff;for(var _0x100c01 in skuJson[_0xd197('0x33')]){if(typeof skuJson[_0xd197('0x33')][_0x100c01]===_0xd197('0x0'))continue;if(!skuJson['skus'][_0x100c01][_0xd197('0x34')])continue;if(skuJson[_0xd197('0x33')][_0x100c01][_0xd197('0x35')]<_0x1b32d9){_0x1b32d9=skuJson[_0xd197('0x33')][_0x100c01][_0xd197('0x35')];_0x397ad4=skuJson[_0xd197('0x33')][_0x100c01];}}}}_0x5bf655=!![];_0x241870=0x0;if(_0x2dc16b[_0xd197('0x36')]&&_0xdeef10){_0x5bf655=skuJson[_0xd197('0x34')];if(!_0x5bf655)return _0x38e0fc[_0xd197('0x27')](_0xd197('0x37'));}_0x2e5389=_0x2dc16b[_0xd197('0x38')](_0x14eacf);_0x5de776=parseFloat(_0x2e5389,0xa);if(isNaN(_0x5de776))return _0x2229eb([_0xd197('0x39'),_0x14eacf],_0xd197('0x10'));var _0x2610a5=function(_0x2fe9ac){if(_0x3b5762)_0xd5eccc=(_0x2fe9ac[_0xd197('0x35')]||0x0)/0x64;else{_0x4cad71=_0x38e0fc[_0xd197('0x29')]('.qd_productPrice');_0xd5eccc=parseFloat((_0x4cad71[_0xd197('0x3a')]()||'')[_0xd197('0x3')](/[^0-9\.\,]+/i,'')[_0xd197('0x3')]('.','')[_0xd197('0x3')](',','.'),0xa);}if(isNaN(_0xd5eccc))return _0x2229eb([_0xd197('0x3b'),_0x14eacf,_0x38e0fc]);if(_0x2dc16b[_0xd197('0x3c')]!==null){_0x483a8f=0x0;if(!isNaN(_0x2dc16b[_0xd197('0x3c')]))_0x483a8f=_0x2dc16b[_0xd197('0x3c')];else{_0x58936e=_0x38e0fc[_0xd197('0x29')](_0x2dc16b['appliedDiscount']);if(_0x58936e['length'])_0x483a8f=_0x2dc16b[_0xd197('0x38')](_0x58936e);}_0x483a8f=parseFloat(_0x483a8f,0xa);if(isNaN(_0x483a8f))_0x483a8f=0x0;if(_0x483a8f!==0x0)_0xd5eccc=_0xd5eccc*0x64/(0x64-_0x483a8f);}if(_0x3b5762)_0x4ca815=(_0x2fe9ac['listPrice']||0x0)/0x64;else _0x4ca815=parseFloat((_0x38e0fc['find']('.qd_productOldPrice')[_0xd197('0x3a')]()||'')[_0xd197('0x3')](/[^0-9\.\,]+/i,'')[_0xd197('0x3')]('.','')[_0xd197('0x3')](',','.'),0xa);if(isNaN(_0x4ca815))_0x4ca815=0.001;_0x964093=_0xd5eccc*((0x64-_0x5de776)/0x64);if(_0x3b5762&&_0x2dc16b[_0xd197('0x25')][_0xd197('0x3d')]){_0x191c80[_0xd197('0x14')](_0x191c80[_0xd197('0x14')]()[_0xd197('0x2')]()[_0xd197('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x964093,0x2,',','.')))[_0xd197('0x27')](_0xd197('0x2b'));_0x38e0fc[_0xd197('0x27')]('qd-sp-active');}else{_0xf9e65=_0x38e0fc['find'](_0xd197('0x3e'));_0xf9e65[_0xd197('0x14')](_0xf9e65[_0xd197('0x14')]()['replace'](/[0-9\.]+,[0-9]+/i,'')+qd_number_format(_0x964093,0x2,',','.'));}if(_0x3b5762){_0x5cbf5d=_0x38e0fc[_0xd197('0x29')](_0x2dc16b[_0xd197('0x25')][_0xd197('0x3f')]);if(_0x5cbf5d['length'])_0x5cbf5d[_0xd197('0x14')](_0x5cbf5d[_0xd197('0x14')]()['trim']()[_0xd197('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x964093,0x2,',','.')));}var _0x1a84f1=_0x38e0fc[_0xd197('0x29')]('.qd-sp-display-discount');_0x1a84f1[_0xd197('0x14')](_0x1a84f1[_0xd197('0x14')]()[_0xd197('0x3')](/[0-9]+\%/i,_0x5de776+'%'));var _0x9eeeef=function(_0x1d7933,_0x2d87aa,_0x274bde){var _0x243389=_0x38e0fc[_0xd197('0x29')](_0x1d7933);if(_0x243389['length'])_0x243389[_0xd197('0x40')](_0x243389[_0xd197('0x40')]()['trim']()[_0xd197('0x3')](/[0-9]{1,2}/,_0x274bde?_0x274bde:_0x2fe9ac['installments']||0x0));var _0xf70319=_0x38e0fc[_0xd197('0x29')](_0x2d87aa);if(_0xf70319[_0xd197('0x9')])_0xf70319[_0xd197('0x40')](_0xf70319['html']()[_0xd197('0x2')]()['replace'](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x964093/(_0x274bde?_0x274bde:_0x2fe9ac[_0xd197('0x41')]||0x1),0x2,',','.')));};if(_0x3b5762&&_0x2dc16b[_0xd197('0x25')][_0xd197('0x42')])_0x9eeeef(_0x2dc16b[_0xd197('0x25')]['installments'],_0x2dc16b[_0xd197('0x25')][_0xd197('0x43')]);else if(_0x2dc16b[_0xd197('0x42')])_0x9eeeef(_0xd197('0x44'),_0xd197('0x45'),parseInt(_0x38e0fc[_0xd197('0x29')](_0xd197('0x46'))[_0xd197('0x3a')]()||0x1)||0x1);_0x38e0fc[_0xd197('0x29')]('.qd_saveAmount')[_0xd197('0x47')](qd_number_format(_0x4ca815-_0x964093,0x2,',','.'));_0x38e0fc[_0xd197('0x29')](_0xd197('0x48'))['prepend'](qd_number_format((_0x4ca815-_0x964093)*0x64/_0x4ca815,0x2,',','.'));if(_0x3b5762&&_0x2dc16b[_0xd197('0x25')]['changeNativeSaveAmount']){_0x10fe99(_0xd197('0x49'))[_0xd197('0x4a')](function(){_0x343ff1=_0x10fe99(this);_0x343ff1[_0xd197('0x14')](_0x343ff1[_0xd197('0x14')]()['trim']()[_0xd197('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x4ca815-_0x964093,0x2,',','.')));_0x343ff1[_0xd197('0x27')](_0xd197('0x2b'));});}};_0x2610a5(_0x397ad4);if(_0x3b5762)_0x10fe99(window)['on'](_0xd197('0x4b'),function(_0x26fea2,_0x5b216c,_0x3560f1){_0x2610a5(_0x3560f1);});_0x38e0fc[_0xd197('0x27')](_0xd197('0x4c'));if(!_0x3b5762)_0x4cad71[_0xd197('0x27')](_0xd197('0x4c'));};(_0x2dc16b['startedByWrapper']?_0xb4d30b[_0xd197('0x29')](_0x2dc16b[_0xd197('0x4d')]):_0xb4d30b)[_0xd197('0x4a')](function(){_0x3949c1['call'](this,![]);});if(typeof _0x2dc16b[_0xd197('0x4e')]==_0xd197('0x4f')){var _0x2141ed=_0x2dc16b['startedByWrapper']?_0xb4d30b:_0xb4d30b['closest'](_0x2dc16b[_0xd197('0x22')]);if(_0x2dc16b[_0xd197('0x25')][_0xd197('0x21')])_0x2141ed=_0x2141ed['closest'](_0x2dc16b['productPage'][_0xd197('0x22')])[_0xd197('0x50')](_0xd197('0x51'));else _0x2141ed=_0x2141ed[_0xd197('0x29')](_0xd197('0x52'));_0x2141ed[_0xd197('0x4a')](function(){var _0x105b34=_0x10fe99(_0x2dc16b[_0xd197('0x4e')]);_0x105b34['attr'](_0xd197('0x53'),_0xd197('0x54'));if(_0x2dc16b[_0xd197('0x25')]['isProductPage'])_0x10fe99(this)[_0xd197('0x47')](_0x105b34);else _0x10fe99(this)['after'](_0x105b34);_0x3949c1[_0xd197('0x55')](_0x105b34,!![]);});}};_0x10fe99['fn'][_0xd197('0xb')]=function(_0x47b20a){var _0x28c68e=_0x10fe99(this);if(!_0x28c68e['length'])return _0x28c68e;var _0x456521=_0x10fe99[_0xd197('0x56')](!![],{},_0x5bfe47,_0x47b20a);if(typeof _0x456521[_0xd197('0x25')][_0xd197('0x21')]!=_0xd197('0x57'))_0x456521[_0xd197('0x25')]['isProductPage']=_0x10fe99(document['body'])['is'](_0xd197('0x58'));_0x58ab39(_0x28c68e,_0x456521);return _0x28c68e;};}(this));
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
var _0xaa27=['join','warn','qdAmAddNdx','addClass','first','qd-am-first','last','qd-am-last','replace','fromCharCode','toUpperCase','ite','---','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','length','qd-am-banner-wrapper','parent','qd-am-collection-wrapper','qdAjax','url','each','img[alt=\x27','attr','data-qdam-value','.box-banner','clone','qd-am-content-loaded','text','insertBefore','hide','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','trigger','ul[itemscope]','alerta','li\x20>ul','qd-am-has-ul','children',':not(ul)','trim','replaceSpecialChars','qd-amazing-menu','>ul','>li','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','add','qd-am-','-li','callback','call','QuatroDigital.am.callback','extend','exec','getParent','closest','function','QD_amazingMenu','/qd-amazing-menu','undefined','error','info','object','unshift','[QD\x20Amazing\x20Menu]\x0a','toLowerCase','apply'];(function(_0xbca15c,_0x5ac4cc){var _0x2f2a88=function(_0x1ab4b6){while(--_0x1ab4b6){_0xbca15c['push'](_0xbca15c['shift']());}};_0x2f2a88(++_0x5ac4cc);}(_0xaa27,0x85));var _0x7aa2=function(_0x25bb5f,_0x63fce){_0x25bb5f=_0x25bb5f-0x0;var _0x39edc6=_0xaa27[_0x25bb5f];return _0x39edc6;};(function(_0xe95735){_0xe95735['fn'][_0x7aa2('0x0')]=_0xe95735['fn'][_0x7aa2('0x1')];}(jQuery));(function(_0x56a3c7){var _0x2dfb7e;var _0x57e5f5=jQuery;if(_0x7aa2('0x2')!==typeof _0x57e5f5['fn'][_0x7aa2('0x3')]){var _0x5bba97={'url':_0x7aa2('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0x3ea21a=function(_0x3c34a6,_0x1abbc1){if('object'===typeof console&&_0x7aa2('0x5')!==typeof console[_0x7aa2('0x6')]&&'undefined'!==typeof console[_0x7aa2('0x7')]&&_0x7aa2('0x5')!==typeof console['warn']){var _0x261da7;_0x7aa2('0x8')===typeof _0x3c34a6?(_0x3c34a6[_0x7aa2('0x9')]('[QD\x20Amazing\x20Menu]\x0a'),_0x261da7=_0x3c34a6):_0x261da7=[_0x7aa2('0xa')+_0x3c34a6];if(_0x7aa2('0x5')===typeof _0x1abbc1||'alerta'!==_0x1abbc1['toLowerCase']()&&'aviso'!==_0x1abbc1[_0x7aa2('0xb')]())if(_0x7aa2('0x5')!==typeof _0x1abbc1&&_0x7aa2('0x7')===_0x1abbc1[_0x7aa2('0xb')]())try{console['info'][_0x7aa2('0xc')](console,_0x261da7);}catch(_0x1cae94){try{console[_0x7aa2('0x7')](_0x261da7[_0x7aa2('0xd')]('\x0a'));}catch(_0x55b8dc){}}else try{console[_0x7aa2('0x6')][_0x7aa2('0xc')](console,_0x261da7);}catch(_0x3ea5e2){try{console[_0x7aa2('0x6')](_0x261da7[_0x7aa2('0xd')]('\x0a'));}catch(_0x27e36c){}}else try{console[_0x7aa2('0xe')][_0x7aa2('0xc')](console,_0x261da7);}catch(_0x18ae16){try{console[_0x7aa2('0xe')](_0x261da7[_0x7aa2('0xd')]('\x0a'));}catch(_0x540ac5){}}}};_0x57e5f5['fn'][_0x7aa2('0xf')]=function(){var _0x59a5cb=_0x57e5f5(this);_0x59a5cb['each'](function(_0x1a8915){_0x57e5f5(this)[_0x7aa2('0x10')]('qd-am-li-'+_0x1a8915);});_0x59a5cb[_0x7aa2('0x11')]()[_0x7aa2('0x10')](_0x7aa2('0x12'));_0x59a5cb[_0x7aa2('0x13')]()[_0x7aa2('0x10')](_0x7aa2('0x14'));return _0x59a5cb;};_0x57e5f5['fn'][_0x7aa2('0x3')]=function(){};_0x56a3c7=function(_0x3b629e){var _0x58b3db={'t':'nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x533f23){var _0x11ec85=function(_0x15decd){return _0x15decd;};var _0xce5964=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x533f23=_0x533f23['d'+_0xce5964[0x10]+'c'+_0xce5964[0x11]+'m'+_0x11ec85(_0xce5964[0x1])+'n'+_0xce5964[0xd]]['l'+_0xce5964[0x12]+'c'+_0xce5964[0x0]+'ti'+_0x11ec85('o')+'n'];var _0x15f61f=function(_0x8cbb98){return escape(encodeURIComponent(_0x8cbb98[_0x7aa2('0x15')](/\./g,'¨')[_0x7aa2('0x15')](/[a-zA-Z]/g,function(_0x39edce){return String[_0x7aa2('0x16')](('Z'>=_0x39edce?0x5a:0x7a)>=(_0x39edce=_0x39edce['charCodeAt'](0x0)+0xd)?_0x39edce:_0x39edce-0x1a);})));};var _0x360a42=_0x15f61f(_0x533f23[[_0xce5964[0x9],_0x11ec85('o'),_0xce5964[0xc],_0xce5964[_0x11ec85(0xd)]][_0x7aa2('0xd')]('')]);_0x15f61f=_0x15f61f((window[['js',_0x11ec85('no'),'m',_0xce5964[0x1],_0xce5964[0x4][_0x7aa2('0x17')](),_0x7aa2('0x18')]['join']('')]||_0x7aa2('0x19'))+['.v',_0xce5964[0xd],'e',_0x11ec85('x'),'co',_0x11ec85('mm'),'erc',_0xce5964[0x1],'.c',_0x11ec85('o'),'m.',_0xce5964[0x13],'r'][_0x7aa2('0xd')](''));for(var _0x12fcc5 in _0x58b3db){if(_0x15f61f===_0x12fcc5+_0x58b3db[_0x12fcc5]||_0x360a42===_0x12fcc5+_0x58b3db[_0x12fcc5]){var _0x5b75f9='tr'+_0xce5964[0x11]+'e';break;}_0x5b75f9='f'+_0xce5964[0x0]+'ls'+_0x11ec85(_0xce5964[0x1])+'';}_0x11ec85=!0x1;-0x1<_0x533f23[[_0xce5964[0xc],'e',_0xce5964[0x0],'rc',_0xce5964[0x9]][_0x7aa2('0xd')]('')][_0x7aa2('0x1a')](_0x7aa2('0x1b'))&&(_0x11ec85=!0x0);return[_0x5b75f9,_0x11ec85];}(_0x3b629e);}(window);if(!eval(_0x56a3c7[0x0]))return _0x56a3c7[0x1]?_0x3ea21a(_0x7aa2('0x1c')):!0x1;var _0x8f319c=function(_0x251ff5){var _0x5c7a5a=_0x251ff5[_0x7aa2('0x1d')](_0x7aa2('0x1e'));var _0x563ab9=_0x5c7a5a[_0x7aa2('0x1f')]('.qd-am-banner');var _0x1c2428=_0x5c7a5a[_0x7aa2('0x1f')]('.qd-am-collection');if(_0x563ab9['length']||_0x1c2428[_0x7aa2('0x20')])_0x563ab9['parent']()['addClass'](_0x7aa2('0x21')),_0x1c2428[_0x7aa2('0x22')]()[_0x7aa2('0x10')](_0x7aa2('0x23')),_0x57e5f5[_0x7aa2('0x24')]({'url':_0x2dfb7e[_0x7aa2('0x25')],'dataType':'html','success':function(_0x24aa83){var _0x2fc2d4=_0x57e5f5(_0x24aa83);_0x563ab9[_0x7aa2('0x26')](function(){var _0x24aa83=_0x57e5f5(this);var _0x59133e=_0x2fc2d4['find'](_0x7aa2('0x27')+_0x24aa83[_0x7aa2('0x28')](_0x7aa2('0x29'))+'\x27]');_0x59133e[_0x7aa2('0x20')]&&(_0x59133e['each'](function(){_0x57e5f5(this)['getParent'](_0x7aa2('0x2a'))[_0x7aa2('0x2b')]()['insertBefore'](_0x24aa83);}),_0x24aa83['hide']());})[_0x7aa2('0x10')](_0x7aa2('0x2c'));_0x1c2428[_0x7aa2('0x26')](function(){var _0x24aa83={};var _0x3beccd=_0x57e5f5(this);_0x2fc2d4[_0x7aa2('0x1d')]('h2')['each'](function(){if(_0x57e5f5(this)[_0x7aa2('0x2d')]()['trim']()[_0x7aa2('0xb')]()==_0x3beccd[_0x7aa2('0x28')](_0x7aa2('0x29'))['trim']()[_0x7aa2('0xb')]())return _0x24aa83=_0x57e5f5(this),!0x1;});_0x24aa83['length']&&(_0x24aa83[_0x7aa2('0x26')](function(){_0x57e5f5(this)[_0x7aa2('0x0')]('[class*=\x27colunas\x27]')[_0x7aa2('0x2b')]()[_0x7aa2('0x2e')](_0x3beccd);}),_0x3beccd[_0x7aa2('0x2f')]());})[_0x7aa2('0x10')](_0x7aa2('0x2c'));},'error':function(){_0x3ea21a(_0x7aa2('0x30')+_0x2dfb7e[_0x7aa2('0x25')]+_0x7aa2('0x31'));},'complete':function(){_0x2dfb7e['ajaxCallback']['call'](this);_0x57e5f5(window)[_0x7aa2('0x32')]('QuatroDigital.am.ajaxCallback',_0x251ff5);},'clearQueueDelay':0xbb8});};_0x57e5f5[_0x7aa2('0x3')]=function(_0x20c514){var _0x1fc61e=_0x20c514['find'](_0x7aa2('0x33'))[_0x7aa2('0x26')](function(){var _0x4df3be=_0x57e5f5(this);if(!_0x4df3be[_0x7aa2('0x20')])return _0x3ea21a(['UL\x20do\x20menu\x20não\x20encontrada',_0x20c514],_0x7aa2('0x34'));_0x4df3be[_0x7aa2('0x1d')](_0x7aa2('0x35'))['parent']()['addClass'](_0x7aa2('0x36'));_0x4df3be['find']('li')[_0x7aa2('0x26')](function(){var _0x36a121=_0x57e5f5(this);var _0x4fc89f=_0x36a121[_0x7aa2('0x37')](_0x7aa2('0x38'));_0x4fc89f['length']&&_0x36a121[_0x7aa2('0x10')]('qd-am-elem-'+_0x4fc89f[_0x7aa2('0x11')]()[_0x7aa2('0x2d')]()[_0x7aa2('0x39')]()[_0x7aa2('0x3a')]()[_0x7aa2('0x15')](/\./g,'')[_0x7aa2('0x15')](/\s/g,'-')[_0x7aa2('0xb')]());});var _0x2d51ce=_0x4df3be[_0x7aa2('0x1d')]('>li')[_0x7aa2('0xf')]();_0x4df3be[_0x7aa2('0x10')](_0x7aa2('0x3b'));_0x2d51ce=_0x2d51ce[_0x7aa2('0x1d')](_0x7aa2('0x3c'));_0x2d51ce['each'](function(){var _0x427ab4=_0x57e5f5(this);_0x427ab4['find'](_0x7aa2('0x3d'))[_0x7aa2('0xf')]()['addClass'](_0x7aa2('0x3e'));_0x427ab4[_0x7aa2('0x10')](_0x7aa2('0x3f'));_0x427ab4[_0x7aa2('0x22')]()[_0x7aa2('0x10')](_0x7aa2('0x40'));});_0x2d51ce[_0x7aa2('0x10')]('qd-am-dropdown');var _0xd0b15a=0x0,_0x56a3c7=function(_0x538e3e){_0xd0b15a+=0x1;_0x538e3e=_0x538e3e[_0x7aa2('0x37')]('li')[_0x7aa2('0x37')]('*');_0x538e3e[_0x7aa2('0x20')]&&(_0x538e3e[_0x7aa2('0x10')]('qd-am-level-'+_0xd0b15a),_0x56a3c7(_0x538e3e));};_0x56a3c7(_0x4df3be);_0x4df3be[_0x7aa2('0x41')](_0x4df3be[_0x7aa2('0x1d')]('ul'))[_0x7aa2('0x26')](function(){var _0x15bba2=_0x57e5f5(this);_0x15bba2[_0x7aa2('0x10')](_0x7aa2('0x42')+_0x15bba2[_0x7aa2('0x37')]('li')[_0x7aa2('0x20')]+_0x7aa2('0x43'));});});_0x8f319c(_0x1fc61e);_0x2dfb7e[_0x7aa2('0x44')][_0x7aa2('0x45')](this);_0x57e5f5(window)[_0x7aa2('0x32')](_0x7aa2('0x46'),_0x20c514);};_0x57e5f5['fn']['QD_amazingMenu']=function(_0x41e2e6){var _0x1e00ec=_0x57e5f5(this);if(!_0x1e00ec['length'])return _0x1e00ec;_0x2dfb7e=_0x57e5f5[_0x7aa2('0x47')]({},_0x5bba97,_0x41e2e6);_0x1e00ec[_0x7aa2('0x48')]=new _0x57e5f5[(_0x7aa2('0x3'))](_0x57e5f5(this));return _0x1e00ec;};_0x57e5f5(function(){_0x57e5f5('.qd_amazing_menu_auto')[_0x7aa2('0x3')]();});}}(this));

/* Quatro Digital Smart Cart */
var _0xa9e0=['url','ajax','jqXHR','done','success','fail','always','complete','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','version','4.0','checkout','getOrderForm','call','QuatroDigital_simpleCart','ajaxStopOn','simpleCart','alerta','warn','[Simple\x20Cart]\x0a','info','add','QD_simpleCart','elements','.qd_cart_total','.qd_items_text','meta[name=currency]','content','qd_simpleCartOpts','totalizers','Shipping','value','_QuatroDigital_CartData','total','currencySymbol','shipping','allTotal','qtt','items','quantity','callback','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','hide','.singular','show','.plural','addClass','qd-emptyCart','removeClass','$this','O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','cartTotalE','html','itemsTextE','each','cartQttE','cartQtt','itemsText','find','emptyCart','smartCheckout','_QuatroDigital_DropDown','vtexjs','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','QD_checkoutQueue','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','trigger','simpleCartCallback.quatro_digital','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','.qd_cart_auto','bind','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','Callbacks','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','.productInformationWrapper\x20\x20a.buy-button','input.buy-in-page-quantity','javascript:','body','Produto\x20adicionado\x20ao\x20carrinho!','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','href','qd-bb-click-active','allowBuyClick','preventDefault','buyButton','.qd-sbb-on','qd-sbb-on','.remove-href','qd-bb-active','children','append','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','prodAdd','qd-bb-lightBoxBodyProdAdd','filter','[href=\x27','attr','---','qd-bb-itemAddBuyButtonWrapper','qd-bb-itemAddCartWrapper','timeRemoveNewItemClass','isSmartCheckout','função\x20descontinuada','getCartInfoByUrl','allowUpdate','autoWatchBuyButton','.btn-add-buy-button-asynchronous','unbind','mouseenter.qd_bb_buy_sc','click','load','clickBuySmartCheckout','indexOf','selectSkuMsg','?redirect=false&','execDefaultAction','redirect=false','queue','buyIfQuantityZeroed','test','match','push','buyButtonClickCallback','shift','asyncCallback','productAddedToCart','cartProductAdded.vtex','fakeRequest','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','Callback\x20não\x20é\x20uma\x20função','prepend','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','QD_buyButton','QuatroDigital.qd_bb_prod_add','ajaxSend','productAddedToCart.qdSbbVtex','Oooops!\x20','toFixed','message','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','QD_dropDownCart','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','ite','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','cartContainer','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','val','keyup.qd_ddc_cep','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','cartIsEmpty','mouseleave.qd_ddc_hover','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalShipping','renderProductsList','dataOptionsCache','.qd-ddc-wrapper','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','qd-ddc-','.qd-ddc-prodName','sellingPrice','Grátis','.qd-ddc-quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','.qd-ddc-shipping\x20input','address','actionButtons','lastSku','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-empty','qd-ddc-product-add-time','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','click.qd_ddc_remove','removeProduct','stop','remove','qdDdcLastPostalCode','calculateShipping','BRA','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','removeItems','Atenção,\x20este\x20método\x20esta\x20descontinuado.','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','.qdDdcContainer','QD_smartCart','dropDown','smartCart','getParent','closest','replace','abs','undefined','round','split','length','join','prototype','trim','function','capitalize','charAt','toUpperCase','slice','toLowerCase','qdAjax','qdAjaxQueue','000','error','extend','GET','object','data','stringify'];(function(_0x209941,_0x5c9988){var _0x1e8729=function(_0x51a9b8){while(--_0x51a9b8){_0x209941['push'](_0x209941['shift']());}};_0x1e8729(++_0x5c9988);}(_0xa9e0,0x123));var _0x0a9e=function(_0x25bea7,_0x49ab45){_0x25bea7=_0x25bea7-0x0;var _0x175952=_0xa9e0[_0x25bea7];return _0x175952;};(function(_0x1f0015){_0x1f0015['fn'][_0x0a9e('0x0')]=_0x1f0015['fn'][_0x0a9e('0x1')];}(jQuery));function qd_number_format(_0x5dd881,_0x550fbc,_0x18d5c9,_0x4ce2f1){_0x5dd881=(_0x5dd881+'')[_0x0a9e('0x2')](/[^0-9+\-Ee.]/g,'');_0x5dd881=isFinite(+_0x5dd881)?+_0x5dd881:0x0;_0x550fbc=isFinite(+_0x550fbc)?Math[_0x0a9e('0x3')](_0x550fbc):0x0;_0x4ce2f1=_0x0a9e('0x4')===typeof _0x4ce2f1?',':_0x4ce2f1;_0x18d5c9=_0x0a9e('0x4')===typeof _0x18d5c9?'.':_0x18d5c9;var _0x219af0='',_0x219af0=function(_0x441e3a,_0x2cc193){var _0x550fbc=Math['pow'](0xa,_0x2cc193);return''+(Math[_0x0a9e('0x5')](_0x441e3a*_0x550fbc)/_0x550fbc)['toFixed'](_0x2cc193);},_0x219af0=(_0x550fbc?_0x219af0(_0x5dd881,_0x550fbc):''+Math['round'](_0x5dd881))[_0x0a9e('0x6')]('.');0x3<_0x219af0[0x0][_0x0a9e('0x7')]&&(_0x219af0[0x0]=_0x219af0[0x0][_0x0a9e('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x4ce2f1));(_0x219af0[0x1]||'')[_0x0a9e('0x7')]<_0x550fbc&&(_0x219af0[0x1]=_0x219af0[0x1]||'',_0x219af0[0x1]+=Array(_0x550fbc-_0x219af0[0x1][_0x0a9e('0x7')]+0x1)[_0x0a9e('0x8')]('0'));return _0x219af0['join'](_0x18d5c9);};'function'!==typeof String['prototype']['trim']&&(String[_0x0a9e('0x9')][_0x0a9e('0xa')]=function(){return this[_0x0a9e('0x2')](/^\s+|\s+$/g,'');});_0x0a9e('0xb')!=typeof String[_0x0a9e('0x9')][_0x0a9e('0xc')]&&(String['prototype'][_0x0a9e('0xc')]=function(){return this[_0x0a9e('0xd')](0x0)[_0x0a9e('0xe')]()+this[_0x0a9e('0xf')](0x1)[_0x0a9e('0x10')]();});(function(_0x4d5611){if('function'!==typeof _0x4d5611[_0x0a9e('0x11')]){var _0x5d0880={};_0x4d5611[_0x0a9e('0x12')]=_0x5d0880;0x96>parseInt((_0x4d5611['fn']['jquery'][_0x0a9e('0x2')](/[^0-9]+/g,'')+_0x0a9e('0x13'))['slice'](0x0,0x3),0xa)&&console&&_0x0a9e('0xb')==typeof console['error']&&console[_0x0a9e('0x14')]();_0x4d5611[_0x0a9e('0x11')]=function(_0x106033){try{var _0x205fd6=_0x4d5611[_0x0a9e('0x15')]({},{'url':'','type':_0x0a9e('0x16'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x106033);var _0x530eb7=_0x0a9e('0x17')===typeof _0x205fd6[_0x0a9e('0x18')]?JSON[_0x0a9e('0x19')](_0x205fd6[_0x0a9e('0x18')]):_0x205fd6[_0x0a9e('0x18')]['toString']();var _0x2c3407=encodeURIComponent(_0x205fd6[_0x0a9e('0x1a')]+'|'+_0x205fd6['type']+'|'+_0x530eb7);_0x5d0880[_0x2c3407]=_0x5d0880[_0x2c3407]||{};_0x0a9e('0x4')==typeof _0x5d0880[_0x2c3407]['jqXHR']?_0x5d0880[_0x2c3407]['jqXHR']=_0x4d5611[_0x0a9e('0x1b')](_0x205fd6):(_0x5d0880[_0x2c3407][_0x0a9e('0x1c')][_0x0a9e('0x1d')](_0x205fd6[_0x0a9e('0x1e')]),_0x5d0880[_0x2c3407]['jqXHR'][_0x0a9e('0x1f')](_0x205fd6[_0x0a9e('0x14')]),_0x5d0880[_0x2c3407][_0x0a9e('0x1c')][_0x0a9e('0x20')](_0x205fd6[_0x0a9e('0x21')]));_0x5d0880[_0x2c3407][_0x0a9e('0x1c')][_0x0a9e('0x20')](function(){isNaN(parseInt(_0x205fd6['clearQueueDelay']))||setTimeout(function(){_0x5d0880[_0x2c3407]['jqXHR']=void 0x0;},_0x205fd6[_0x0a9e('0x22')]);});return _0x5d0880[_0x2c3407][_0x0a9e('0x1c')];}catch(_0x40c424){_0x0a9e('0x4')!==typeof console&&'function'===typeof console[_0x0a9e('0x14')]&&console['error'](_0x0a9e('0x23')+_0x40c424['message']);}};_0x4d5611[_0x0a9e('0x11')][_0x0a9e('0x24')]=_0x0a9e('0x25');}}(jQuery));(function(_0x14433c){_0x14433c['fn'][_0x0a9e('0x0')]=_0x14433c['fn'][_0x0a9e('0x1')];}(jQuery));(function(){var _0x11c3b6=jQuery;if(_0x0a9e('0xb')!==typeof _0x11c3b6['fn']['simpleCart']){_0x11c3b6(function(){var _0x3652a7=vtexjs[_0x0a9e('0x26')][_0x0a9e('0x27')];vtexjs[_0x0a9e('0x26')]['getOrderForm']=function(){return _0x3652a7[_0x0a9e('0x28')]();};});try{window[_0x0a9e('0x29')]=window[_0x0a9e('0x29')]||{};window[_0x0a9e('0x29')][_0x0a9e('0x2a')]=!0x1;_0x11c3b6['fn'][_0x0a9e('0x2b')]=function(_0x296f41,_0x2e8759,_0x1dbde2){var _0x540530=function(_0x426950,_0x5d1e0e){if(_0x0a9e('0x17')===typeof console){var _0x3ae878=_0x0a9e('0x17')===typeof _0x426950;_0x0a9e('0x4')!==typeof _0x5d1e0e&&_0x0a9e('0x2c')===_0x5d1e0e['toLowerCase']()?_0x3ae878?console[_0x0a9e('0x2d')](_0x0a9e('0x2e'),_0x426950[0x0],_0x426950[0x1],_0x426950[0x2],_0x426950[0x3],_0x426950[0x4],_0x426950[0x5],_0x426950[0x6],_0x426950[0x7]):console[_0x0a9e('0x2d')](_0x0a9e('0x2e')+_0x426950):_0x0a9e('0x4')!==typeof _0x5d1e0e&&_0x0a9e('0x2f')===_0x5d1e0e[_0x0a9e('0x10')]()?_0x3ae878?console[_0x0a9e('0x2f')]('[Simple\x20Cart]\x0a',_0x426950[0x0],_0x426950[0x1],_0x426950[0x2],_0x426950[0x3],_0x426950[0x4],_0x426950[0x5],_0x426950[0x6],_0x426950[0x7]):console[_0x0a9e('0x2f')]('[Simple\x20Cart]\x0a'+_0x426950):_0x3ae878?console[_0x0a9e('0x14')](_0x0a9e('0x2e'),_0x426950[0x0],_0x426950[0x1],_0x426950[0x2],_0x426950[0x3],_0x426950[0x4],_0x426950[0x5],_0x426950[0x6],_0x426950[0x7]):console[_0x0a9e('0x14')](_0x0a9e('0x2e')+_0x426950);}};var _0x567193=_0x11c3b6(this);_0x0a9e('0x17')===typeof _0x296f41?_0x2e8759=_0x296f41:(_0x296f41=_0x296f41||!0x1,_0x567193=_0x567193[_0x0a9e('0x30')](_0x11c3b6[_0x0a9e('0x31')][_0x0a9e('0x32')]));if(!_0x567193['length'])return _0x567193;_0x11c3b6['QD_simpleCart'][_0x0a9e('0x32')]=_0x11c3b6['QD_simpleCart'][_0x0a9e('0x32')][_0x0a9e('0x30')](_0x567193);_0x1dbde2=_0x0a9e('0x4')===typeof _0x1dbde2?!0x1:_0x1dbde2;var _0x1ef87a={'cartQtt':'.qd_cart_qtt','cartTotal':_0x0a9e('0x33'),'itemsText':_0x0a9e('0x34'),'currencySymbol':(_0x11c3b6(_0x0a9e('0x35'))['attr'](_0x0a9e('0x36'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x1a180b=_0x11c3b6[_0x0a9e('0x15')]({},_0x1ef87a,_0x2e8759);var _0x4c1c0e=_0x11c3b6('');_0x567193['each'](function(){var _0x11b61d=_0x11c3b6(this);_0x11b61d[_0x0a9e('0x18')]('qd_simpleCartOpts')||_0x11b61d[_0x0a9e('0x18')](_0x0a9e('0x37'),_0x1a180b);});var _0x2e1b3a=function(_0x148f55){window['_QuatroDigital_CartData']=window['_QuatroDigital_CartData']||{};for(var _0x296f41=0x0,_0x45b3d0=0x0,_0x53f3ee=0x0;_0x53f3ee<_0x148f55[_0x0a9e('0x38')][_0x0a9e('0x7')];_0x53f3ee++)_0x0a9e('0x39')==_0x148f55['totalizers'][_0x53f3ee]['id']&&(_0x45b3d0+=_0x148f55[_0x0a9e('0x38')][_0x53f3ee][_0x0a9e('0x3a')]),_0x296f41+=_0x148f55[_0x0a9e('0x38')][_0x53f3ee][_0x0a9e('0x3a')];window[_0x0a9e('0x3b')][_0x0a9e('0x3c')]=_0x1a180b[_0x0a9e('0x3d')]+qd_number_format(_0x296f41/0x64,0x2,',','.');window[_0x0a9e('0x3b')][_0x0a9e('0x3e')]=_0x1a180b[_0x0a9e('0x3d')]+qd_number_format(_0x45b3d0/0x64,0x2,',','.');window[_0x0a9e('0x3b')][_0x0a9e('0x3f')]=_0x1a180b[_0x0a9e('0x3d')]+qd_number_format((_0x296f41+_0x45b3d0)/0x64,0x2,',','.');window[_0x0a9e('0x3b')][_0x0a9e('0x40')]=0x0;if(_0x1a180b['showQuantityByItems'])for(_0x53f3ee=0x0;_0x53f3ee<_0x148f55['items'][_0x0a9e('0x7')];_0x53f3ee++)window[_0x0a9e('0x3b')][_0x0a9e('0x40')]+=_0x148f55[_0x0a9e('0x41')][_0x53f3ee][_0x0a9e('0x42')];else window[_0x0a9e('0x3b')][_0x0a9e('0x40')]=_0x148f55[_0x0a9e('0x41')][_0x0a9e('0x7')]||0x0;try{window[_0x0a9e('0x3b')][_0x0a9e('0x43')]&&window[_0x0a9e('0x3b')]['callback'][_0x0a9e('0x44')]&&window[_0x0a9e('0x3b')][_0x0a9e('0x43')][_0x0a9e('0x44')]();}catch(_0x2e8caf){_0x540530(_0x0a9e('0x45'));}_0x37edaa(_0x4c1c0e);};var _0x21eb86=function(_0x44dd99,_0x59afe8){0x1===_0x44dd99?_0x59afe8[_0x0a9e('0x46')]()['filter'](_0x0a9e('0x47'))[_0x0a9e('0x48')]():_0x59afe8[_0x0a9e('0x46')]()['filter'](_0x0a9e('0x49'))[_0x0a9e('0x48')]();};var _0x4774f4=function(_0x34aa5a){0x1>_0x34aa5a?_0x567193[_0x0a9e('0x4a')](_0x0a9e('0x4b')):_0x567193[_0x0a9e('0x4c')]('qd-emptyCart');};var _0x13f44d=function(_0x1bde3c,_0x1b5e80){var _0x16f976=parseInt(window[_0x0a9e('0x3b')][_0x0a9e('0x40')],0xa);_0x1b5e80[_0x0a9e('0x4d')][_0x0a9e('0x48')]();isNaN(_0x16f976)&&(_0x540530(_0x0a9e('0x4e'),'alerta'),_0x16f976=0x0);_0x1b5e80[_0x0a9e('0x4f')][_0x0a9e('0x50')](window['_QuatroDigital_CartData']['total']);_0x1b5e80['cartQttE'][_0x0a9e('0x50')](_0x16f976);_0x21eb86(_0x16f976,_0x1b5e80[_0x0a9e('0x51')]);_0x4774f4(_0x16f976);};var _0x37edaa=function(_0x11545a){_0x567193[_0x0a9e('0x52')](function(){var _0x30decb={};var _0x2e5165=_0x11c3b6(this);_0x296f41&&_0x2e5165[_0x0a9e('0x18')]('qd_simpleCartOpts')&&_0x11c3b6['extend'](_0x1a180b,_0x2e5165['data'](_0x0a9e('0x37')));_0x30decb[_0x0a9e('0x4d')]=_0x2e5165;_0x30decb[_0x0a9e('0x53')]=_0x2e5165['find'](_0x1a180b[_0x0a9e('0x54')])||_0x4c1c0e;_0x30decb[_0x0a9e('0x4f')]=_0x2e5165['find'](_0x1a180b['cartTotal'])||_0x4c1c0e;_0x30decb[_0x0a9e('0x51')]=_0x2e5165['find'](_0x1a180b[_0x0a9e('0x55')])||_0x4c1c0e;_0x30decb['emptyElem']=_0x2e5165[_0x0a9e('0x56')](_0x1a180b[_0x0a9e('0x57')])||_0x4c1c0e;_0x13f44d(_0x11545a,_0x30decb);_0x2e5165[_0x0a9e('0x4a')]('qd-sc-populated');});};(function(){if(_0x1a180b[_0x0a9e('0x58')]){window[_0x0a9e('0x59')]=window['_QuatroDigital_DropDown']||{};if('undefined'!==typeof window[_0x0a9e('0x59')][_0x0a9e('0x27')]&&(_0x1dbde2||!_0x296f41))return _0x2e1b3a(window['_QuatroDigital_DropDown'][_0x0a9e('0x27')]);if('object'!==typeof window[_0x0a9e('0x5a')]||'undefined'===typeof window[_0x0a9e('0x5a')]['checkout'])if('object'===typeof vtex&&'object'===typeof vtex[_0x0a9e('0x26')]&&'undefined'!==typeof vtex[_0x0a9e('0x26')][_0x0a9e('0x5b')])new vtex[(_0x0a9e('0x26'))][(_0x0a9e('0x5b'))]();else return _0x540530(_0x0a9e('0x5c'));_0x11c3b6[_0x0a9e('0x5d')]([_0x0a9e('0x41'),_0x0a9e('0x38'),'shippingData'],{'done':function(_0x1c693e){_0x2e1b3a(_0x1c693e);window[_0x0a9e('0x59')][_0x0a9e('0x27')]=_0x1c693e;},'fail':function(_0x30c491){_0x540530([_0x0a9e('0x5e'),_0x30c491]);}});}else alert(_0x0a9e('0x5f'));}());_0x1a180b['callback']();_0x11c3b6(window)[_0x0a9e('0x60')](_0x0a9e('0x61'));return _0x567193;};_0x11c3b6['QD_simpleCart']={'elements':_0x11c3b6('')};_0x11c3b6(function(){var _0x3649cc;'function'===typeof window[_0x0a9e('0x62')]&&(_0x3649cc=window['ajaxRequestbuyButtonAsynchronous'],window['ajaxRequestbuyButtonAsynchronous']=function(_0x5674ee,_0x273cb5,_0x49d231,_0x2244d6,_0x1fc70e){_0x3649cc[_0x0a9e('0x28')](this,_0x5674ee,_0x273cb5,_0x49d231,_0x2244d6,function(){_0x0a9e('0xb')===typeof _0x1fc70e&&_0x1fc70e();_0x11c3b6[_0x0a9e('0x31')][_0x0a9e('0x32')]['each'](function(){var _0x1627a7=_0x11c3b6(this);_0x1627a7['simpleCart'](_0x1627a7[_0x0a9e('0x18')](_0x0a9e('0x37')));});});});});var _0x51aaf7=window['ReloadItemsCart']||void 0x0;window[_0x0a9e('0x63')]=function(_0x156f1c){_0x11c3b6['fn'][_0x0a9e('0x2b')](!0x0);_0x0a9e('0xb')===typeof _0x51aaf7?_0x51aaf7['call'](this,_0x156f1c):alert(_0x156f1c);};_0x11c3b6(function(){var _0x1d0dc8=_0x11c3b6(_0x0a9e('0x64'));_0x1d0dc8['length']&&_0x1d0dc8[_0x0a9e('0x2b')]();});_0x11c3b6(function(){_0x11c3b6(window)[_0x0a9e('0x65')](_0x0a9e('0x66'),function(){_0x11c3b6['fn'][_0x0a9e('0x2b')](!0x0);});});}catch(_0x401837){'undefined'!==typeof console&&_0x0a9e('0xb')===typeof console[_0x0a9e('0x14')]&&console[_0x0a9e('0x14')]('Oooops!\x20',_0x401837);}}}());(function(){var _0x3528b7=function(_0x9375fb,_0x19c995){if(_0x0a9e('0x17')===typeof console){var _0xc8c264=_0x0a9e('0x17')===typeof _0x9375fb;_0x0a9e('0x4')!==typeof _0x19c995&&_0x0a9e('0x2c')===_0x19c995[_0x0a9e('0x10')]()?_0xc8c264?console[_0x0a9e('0x2d')](_0x0a9e('0x67'),_0x9375fb[0x0],_0x9375fb[0x1],_0x9375fb[0x2],_0x9375fb[0x3],_0x9375fb[0x4],_0x9375fb[0x5],_0x9375fb[0x6],_0x9375fb[0x7]):console[_0x0a9e('0x2d')](_0x0a9e('0x67')+_0x9375fb):_0x0a9e('0x4')!==typeof _0x19c995&&_0x0a9e('0x2f')===_0x19c995[_0x0a9e('0x10')]()?_0xc8c264?console[_0x0a9e('0x2f')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x9375fb[0x0],_0x9375fb[0x1],_0x9375fb[0x2],_0x9375fb[0x3],_0x9375fb[0x4],_0x9375fb[0x5],_0x9375fb[0x6],_0x9375fb[0x7]):console[_0x0a9e('0x2f')](_0x0a9e('0x67')+_0x9375fb):_0xc8c264?console[_0x0a9e('0x14')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x9375fb[0x0],_0x9375fb[0x1],_0x9375fb[0x2],_0x9375fb[0x3],_0x9375fb[0x4],_0x9375fb[0x5],_0x9375fb[0x6],_0x9375fb[0x7]):console[_0x0a9e('0x14')](_0x0a9e('0x67')+_0x9375fb);}},_0x4f1e60=null,_0x5211e3={},_0x242745={},_0x4556c5={};$['QD_checkoutQueue']=function(_0x83f0b2,_0x56e31e){if(null===_0x4f1e60)if(_0x0a9e('0x17')===typeof window[_0x0a9e('0x5a')]&&_0x0a9e('0x4')!==typeof window['vtexjs']['checkout'])_0x4f1e60=window['vtexjs'][_0x0a9e('0x26')];else return _0x3528b7(_0x0a9e('0x68'));var _0x1104ad=$[_0x0a9e('0x15')]({'done':function(){},'fail':function(){}},_0x56e31e),_0x23a7d3=_0x83f0b2[_0x0a9e('0x8')](';'),_0x6abd03=function(){_0x5211e3[_0x23a7d3][_0x0a9e('0x30')](_0x1104ad['done']);_0x242745[_0x23a7d3][_0x0a9e('0x30')](_0x1104ad[_0x0a9e('0x1f')]);};_0x4556c5[_0x23a7d3]?_0x6abd03():(_0x5211e3[_0x23a7d3]=$[_0x0a9e('0x69')](),_0x242745[_0x23a7d3]=$['Callbacks'](),_0x6abd03(),_0x4556c5[_0x23a7d3]=!0x0,_0x4f1e60[_0x0a9e('0x27')](_0x83f0b2)['done'](function(_0x4437ff){_0x4556c5[_0x23a7d3]=!0x1;_0x5211e3[_0x23a7d3][_0x0a9e('0x44')](_0x4437ff);})['fail'](function(_0x2ed01e){_0x4556c5[_0x23a7d3]=!0x1;_0x242745[_0x23a7d3][_0x0a9e('0x44')](_0x2ed01e);}));};}());(function(_0x2cc7a7){try{var _0x317c0c=jQuery,_0x542ece,_0x1d442c=_0x317c0c({}),_0x2e9552=function(_0x278ab4,_0x5b7fc3){if(_0x0a9e('0x17')===typeof console&&_0x0a9e('0x4')!==typeof console[_0x0a9e('0x14')]&&_0x0a9e('0x4')!==typeof console['info']&&_0x0a9e('0x4')!==typeof console[_0x0a9e('0x2d')]){var _0x30a4c7;_0x0a9e('0x17')===typeof _0x278ab4?(_0x278ab4[_0x0a9e('0x6a')](_0x0a9e('0x6b')),_0x30a4c7=_0x278ab4):_0x30a4c7=[_0x0a9e('0x6b')+_0x278ab4];if(_0x0a9e('0x4')===typeof _0x5b7fc3||_0x0a9e('0x2c')!==_0x5b7fc3[_0x0a9e('0x10')]()&&_0x0a9e('0x6c')!==_0x5b7fc3[_0x0a9e('0x10')]())if(_0x0a9e('0x4')!==typeof _0x5b7fc3&&_0x0a9e('0x2f')===_0x5b7fc3['toLowerCase']())try{console[_0x0a9e('0x2f')][_0x0a9e('0x6d')](console,_0x30a4c7);}catch(_0xc599b3){try{console['info'](_0x30a4c7[_0x0a9e('0x8')]('\x0a'));}catch(_0x33dda0){}}else try{console[_0x0a9e('0x14')][_0x0a9e('0x6d')](console,_0x30a4c7);}catch(_0x56d650){try{console['error'](_0x30a4c7[_0x0a9e('0x8')]('\x0a'));}catch(_0x2bbdb5){}}else try{console['warn'][_0x0a9e('0x6d')](console,_0x30a4c7);}catch(_0x53a6a1){try{console[_0x0a9e('0x2d')](_0x30a4c7[_0x0a9e('0x8')]('\x0a'));}catch(_0x5637a1){}}}},_0x371533={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0x0a9e('0x6e'),'buyQtt':_0x0a9e('0x6f'),'selectSkuMsg':_0x0a9e('0x70'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x42b959,_0x3755fe,_0x1f42a0){_0x317c0c(_0x0a9e('0x71'))['is']('.productQuickView')&&(_0x0a9e('0x1e')===_0x3755fe?alert(_0x0a9e('0x72')):(alert(_0x0a9e('0x73')),(_0x0a9e('0x17')===typeof parent?parent:document)['location'][_0x0a9e('0x74')]=_0x1f42a0));},'isProductPage':function(){return _0x317c0c(_0x0a9e('0x71'))['is']('#produto,\x20.produto');},'execDefaultAction':function(_0x1d6834){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x317c0c['QD_buyButton']=function(_0x163710,_0x2bb25a){function _0x3003eb(_0x385d52){_0x542ece['isSmartCheckout']?_0x385d52['data'](_0x0a9e('0x75'))||(_0x385d52[_0x0a9e('0x18')](_0x0a9e('0x75'),0x1),_0x385d52['on']('click.qd_bb_buy_sc',function(_0x3b4a9f){if(!_0x542ece[_0x0a9e('0x76')]())return!0x0;if(!0x0!==_0x509efe['clickBuySmartCheckout']['call'](this))return _0x3b4a9f[_0x0a9e('0x77')](),!0x1;})):alert('Método\x20descontinuado!');}function _0x5ea541(_0x4dc6b3){_0x4dc6b3=_0x4dc6b3||_0x317c0c(_0x542ece[_0x0a9e('0x78')]);_0x4dc6b3[_0x0a9e('0x52')](function(){var _0x4dc6b3=_0x317c0c(this);_0x4dc6b3['is'](_0x0a9e('0x79'))||(_0x4dc6b3[_0x0a9e('0x4a')](_0x0a9e('0x7a')),_0x4dc6b3['is']('.btn-add-buy-button-asynchronous')&&!_0x4dc6b3['is'](_0x0a9e('0x7b'))||_0x4dc6b3['data'](_0x0a9e('0x7c'))||(_0x4dc6b3[_0x0a9e('0x18')](_0x0a9e('0x7c'),0x1),_0x4dc6b3[_0x0a9e('0x7d')]('.qd-bb-productAdded')[_0x0a9e('0x7')]||_0x4dc6b3[_0x0a9e('0x7e')](_0x0a9e('0x7f')),_0x4dc6b3['is']('.buy-in-page-button')&&_0x542ece[_0x0a9e('0x80')]()&&_0x2ec396[_0x0a9e('0x28')](_0x4dc6b3),_0x3003eb(_0x4dc6b3)));});_0x542ece[_0x0a9e('0x80')]()&&!_0x4dc6b3[_0x0a9e('0x7')]&&_0x2e9552(_0x0a9e('0x81')+_0x4dc6b3[_0x0a9e('0x82')]+'\x27.',_0x0a9e('0x2f'));}var _0x11ac43=_0x317c0c(_0x163710);var _0x509efe=this;window[_0x0a9e('0x83')]=window[_0x0a9e('0x83')]||{};window['_QuatroDigital_CartData']=window[_0x0a9e('0x3b')]||{};_0x509efe[_0x0a9e('0x84')]=function(_0x3a1974,_0x5a26c8){_0x11ac43[_0x0a9e('0x4a')]('qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd');_0x317c0c(_0x0a9e('0x71'))[_0x0a9e('0x4a')](_0x0a9e('0x85'));var _0x1f29bd=_0x317c0c(_0x542ece[_0x0a9e('0x78')])[_0x0a9e('0x86')](_0x0a9e('0x87')+(_0x3a1974[_0x0a9e('0x88')]('href')||_0x0a9e('0x89'))+'\x27]')[_0x0a9e('0x30')](_0x3a1974);_0x1f29bd[_0x0a9e('0x4a')](_0x0a9e('0x8a'));setTimeout(function(){_0x11ac43[_0x0a9e('0x4c')](_0x0a9e('0x8b'));_0x1f29bd[_0x0a9e('0x4c')](_0x0a9e('0x8a'));},_0x542ece[_0x0a9e('0x8c')]);window[_0x0a9e('0x83')][_0x0a9e('0x27')]=void 0x0;if(_0x0a9e('0x4')!==typeof _0x2bb25a&&_0x0a9e('0xb')===typeof _0x2bb25a['getCartInfoByUrl'])return _0x542ece[_0x0a9e('0x8d')]||(_0x2e9552(_0x0a9e('0x8e')),_0x2bb25a[_0x0a9e('0x8f')]()),window[_0x0a9e('0x59')][_0x0a9e('0x27')]=void 0x0,_0x2bb25a['getCartInfoByUrl'](function(_0x3afc8c){window[_0x0a9e('0x83')]['getOrderForm']=_0x3afc8c;_0x317c0c['fn'][_0x0a9e('0x2b')](!0x0,void 0x0,!0x0);},{'lastSku':_0x5a26c8});window['_Quatro_Digital_dropDown'][_0x0a9e('0x90')]=!0x0;_0x317c0c['fn'][_0x0a9e('0x2b')](!0x0);};(function(){if(_0x542ece[_0x0a9e('0x8d')]&&_0x542ece[_0x0a9e('0x91')]){var _0x4f4d2d=_0x317c0c(_0x0a9e('0x92'));_0x4f4d2d['length']&&_0x5ea541(_0x4f4d2d);}}());var _0x2ec396=function(){var _0x3d0a77=_0x317c0c(this);'undefined'!==typeof _0x3d0a77[_0x0a9e('0x18')](_0x0a9e('0x78'))?(_0x3d0a77[_0x0a9e('0x93')]('click'),_0x3003eb(_0x3d0a77)):(_0x3d0a77['bind'](_0x0a9e('0x94'),function(_0x6ba2be){_0x3d0a77[_0x0a9e('0x93')](_0x0a9e('0x95'));_0x3003eb(_0x3d0a77);_0x317c0c(this)[_0x0a9e('0x93')](_0x6ba2be);}),_0x317c0c(window)[_0x0a9e('0x96')](function(){_0x3d0a77[_0x0a9e('0x93')](_0x0a9e('0x95'));_0x3003eb(_0x3d0a77);_0x3d0a77[_0x0a9e('0x93')]('mouseenter.qd_bb_buy_sc');}));};_0x509efe[_0x0a9e('0x97')]=function(){var _0x517081=_0x317c0c(this),_0x163710=_0x517081[_0x0a9e('0x88')](_0x0a9e('0x74'))||'';if(-0x1<_0x163710[_0x0a9e('0x98')](_0x542ece[_0x0a9e('0x99')]))return!0x0;_0x163710=_0x163710['replace'](/redirect\=(false|true)/gi,'')[_0x0a9e('0x2')]('?',_0x0a9e('0x9a'))[_0x0a9e('0x2')](/\&\&/gi,'&');if(_0x542ece[_0x0a9e('0x9b')](_0x517081))return _0x517081[_0x0a9e('0x88')]('href',_0x163710['replace'](_0x0a9e('0x9c'),'redirect=true')),!0x0;_0x163710=_0x163710[_0x0a9e('0x2')](/http.?:/i,'');_0x1d442c[_0x0a9e('0x9d')](function(_0x4672e1){if(!_0x542ece[_0x0a9e('0x9e')]&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0x0a9e('0x9f')](_0x163710))return _0x4672e1();var _0x213e5d=function(_0x596312,_0x4db918){var _0x5ea541=_0x163710[_0x0a9e('0xa0')](/sku\=([0-9]+)/gi),_0x5dfbe2=[];if('object'===typeof _0x5ea541&&null!==_0x5ea541)for(var _0x427ccc=_0x5ea541['length']-0x1;0x0<=_0x427ccc;_0x427ccc--){var _0x558d60=parseInt(_0x5ea541[_0x427ccc][_0x0a9e('0x2')](/sku\=/gi,''));isNaN(_0x558d60)||_0x5dfbe2[_0x0a9e('0xa1')](_0x558d60);}_0x542ece['productPageCallback'][_0x0a9e('0x28')](this,_0x596312,_0x4db918,_0x163710);_0x509efe[_0x0a9e('0xa2')][_0x0a9e('0x28')](this,_0x596312,_0x4db918,_0x163710,_0x5dfbe2);_0x509efe[_0x0a9e('0x84')](_0x517081,_0x163710[_0x0a9e('0x6')]('ku=')['pop']()[_0x0a9e('0x6')]('&')[_0x0a9e('0xa3')]());_0x0a9e('0xb')===typeof _0x542ece[_0x0a9e('0xa4')]&&_0x542ece[_0x0a9e('0xa4')]['call'](this);_0x317c0c(window)[_0x0a9e('0x60')](_0x0a9e('0xa5'));_0x317c0c(window)['trigger'](_0x0a9e('0xa6'));};_0x542ece[_0x0a9e('0xa7')]?(_0x213e5d(null,_0x0a9e('0x1e')),_0x4672e1()):_0x317c0c[_0x0a9e('0x1b')]({'url':_0x163710,'complete':_0x213e5d})[_0x0a9e('0x20')](function(){_0x4672e1();});});};_0x509efe[_0x0a9e('0xa2')]=function(_0x1ef1b0,_0x476993,_0x40dd2a,_0x16afb3){try{'success'===_0x476993&&_0x0a9e('0x17')===typeof window[_0x0a9e('0xa8')]&&_0x0a9e('0xb')===typeof window[_0x0a9e('0xa8')][_0x0a9e('0xa9')]&&window['parent']['_QuatroDigital_prodBuyCallback'](_0x1ef1b0,_0x476993,_0x40dd2a,_0x16afb3);}catch(_0x21902c){_0x2e9552(_0x0a9e('0xaa'));}};_0x5ea541();_0x0a9e('0xb')===typeof _0x542ece[_0x0a9e('0x43')]?_0x542ece[_0x0a9e('0x43')]['call'](this):_0x2e9552(_0x0a9e('0xab'));};var _0x3c775a=_0x317c0c[_0x0a9e('0x69')]();_0x317c0c['fn']['QD_buyButton']=function(_0x318fc3,_0x59aa7b){var _0x2cc7a7=_0x317c0c(this);'undefined'!==typeof _0x59aa7b||_0x0a9e('0x17')!==typeof _0x318fc3||_0x318fc3 instanceof _0x317c0c||(_0x59aa7b=_0x318fc3,_0x318fc3=void 0x0);_0x542ece=_0x317c0c[_0x0a9e('0x15')]({},_0x371533,_0x59aa7b);var _0xe339b1;_0x3c775a['add'](function(){_0x2cc7a7[_0x0a9e('0x7d')]('.qd-bb-itemAddWrapper')[_0x0a9e('0x7')]||_0x2cc7a7[_0x0a9e('0xac')](_0x0a9e('0xad'));_0xe339b1=new _0x317c0c[(_0x0a9e('0xae'))](_0x2cc7a7,_0x318fc3);});_0x3c775a[_0x0a9e('0x44')]();_0x317c0c(window)['on'](_0x0a9e('0xaf'),function(_0x4014c7,_0xe89aaa,_0x2aaf07){_0xe339b1[_0x0a9e('0x84')](_0xe89aaa,_0x2aaf07);});return _0x317c0c[_0x0a9e('0x15')](_0x2cc7a7,_0xe339b1);};var _0xc876d4=0x0;_0x317c0c(document)[_0x0a9e('0xb0')](function(_0x399def,_0x98c62c,_0x248368){-0x1<_0x248368['url']['toLowerCase']()[_0x0a9e('0x98')]('/checkout/cart/add')&&(_0xc876d4=(_0x248368[_0x0a9e('0x1a')][_0x0a9e('0xa0')](/sku\=([0-9]+)/i)||[''])['pop']());});_0x317c0c(window)[_0x0a9e('0x65')](_0x0a9e('0xb1'),function(){_0x317c0c(window)[_0x0a9e('0x60')](_0x0a9e('0xaf'),[new _0x317c0c(),_0xc876d4]);});_0x317c0c(document)['ajaxStop'](function(){_0x3c775a[_0x0a9e('0x44')]();});}catch(_0x26cb76){_0x0a9e('0x4')!==typeof console&&_0x0a9e('0xb')===typeof console['error']&&console[_0x0a9e('0x14')](_0x0a9e('0xb2'),_0x26cb76);}}(this));function qd_number_format(_0x2b7092,_0x5c838b,_0x2650eb,_0x270df8){_0x2b7092=(_0x2b7092+'')[_0x0a9e('0x2')](/[^0-9+\-Ee.]/g,'');_0x2b7092=isFinite(+_0x2b7092)?+_0x2b7092:0x0;_0x5c838b=isFinite(+_0x5c838b)?Math['abs'](_0x5c838b):0x0;_0x270df8=_0x0a9e('0x4')===typeof _0x270df8?',':_0x270df8;_0x2650eb=_0x0a9e('0x4')===typeof _0x2650eb?'.':_0x2650eb;var _0x2394d3='',_0x2394d3=function(_0x555780,_0x3211d2){var _0x289e65=Math['pow'](0xa,_0x3211d2);return''+(Math[_0x0a9e('0x5')](_0x555780*_0x289e65)/_0x289e65)[_0x0a9e('0xb3')](_0x3211d2);},_0x2394d3=(_0x5c838b?_0x2394d3(_0x2b7092,_0x5c838b):''+Math[_0x0a9e('0x5')](_0x2b7092))['split']('.');0x3<_0x2394d3[0x0]['length']&&(_0x2394d3[0x0]=_0x2394d3[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x270df8));(_0x2394d3[0x1]||'')[_0x0a9e('0x7')]<_0x5c838b&&(_0x2394d3[0x1]=_0x2394d3[0x1]||'',_0x2394d3[0x1]+=Array(_0x5c838b-_0x2394d3[0x1][_0x0a9e('0x7')]+0x1)['join']('0'));return _0x2394d3[_0x0a9e('0x8')](_0x2650eb);}(function(){try{window[_0x0a9e('0x3b')]=window[_0x0a9e('0x3b')]||{},window['_QuatroDigital_CartData'][_0x0a9e('0x43')]=window[_0x0a9e('0x3b')][_0x0a9e('0x43')]||$[_0x0a9e('0x69')]();}catch(_0x46956b){_0x0a9e('0x4')!==typeof console&&_0x0a9e('0xb')===typeof console[_0x0a9e('0x14')]&&console[_0x0a9e('0x14')]('Oooops!\x20',_0x46956b[_0x0a9e('0xb4')]);}}());(function(_0x5526a7){try{var _0x138cf5=jQuery,_0x4093e6=function(_0x2097d8,_0x3cf222){if(_0x0a9e('0x17')===typeof console&&_0x0a9e('0x4')!==typeof console['error']&&_0x0a9e('0x4')!==typeof console[_0x0a9e('0x2f')]&&_0x0a9e('0x4')!==typeof console[_0x0a9e('0x2d')]){var _0x51aa2f;_0x0a9e('0x17')===typeof _0x2097d8?(_0x2097d8[_0x0a9e('0x6a')](_0x0a9e('0xb5')),_0x51aa2f=_0x2097d8):_0x51aa2f=[_0x0a9e('0xb5')+_0x2097d8];if(_0x0a9e('0x4')===typeof _0x3cf222||_0x0a9e('0x2c')!==_0x3cf222[_0x0a9e('0x10')]()&&_0x0a9e('0x6c')!==_0x3cf222[_0x0a9e('0x10')]())if(_0x0a9e('0x4')!==typeof _0x3cf222&&'info'===_0x3cf222[_0x0a9e('0x10')]())try{console[_0x0a9e('0x2f')][_0x0a9e('0x6d')](console,_0x51aa2f);}catch(_0x26b826){try{console[_0x0a9e('0x2f')](_0x51aa2f[_0x0a9e('0x8')]('\x0a'));}catch(_0x2895c5){}}else try{console[_0x0a9e('0x14')]['apply'](console,_0x51aa2f);}catch(_0x3b581c){try{console[_0x0a9e('0x14')](_0x51aa2f[_0x0a9e('0x8')]('\x0a'));}catch(_0x5c65fc){}}else try{console[_0x0a9e('0x2d')][_0x0a9e('0x6d')](console,_0x51aa2f);}catch(_0xb0af1e){try{console[_0x0a9e('0x2d')](_0x51aa2f[_0x0a9e('0x8')]('\x0a'));}catch(_0x1ba457){}}}};window[_0x0a9e('0x59')]=window[_0x0a9e('0x59')]||{};window[_0x0a9e('0x59')][_0x0a9e('0x90')]=!0x0;_0x138cf5['QD_dropDownCart']=function(){};_0x138cf5['fn'][_0x0a9e('0xb6')]=function(){return{'fn':new _0x138cf5()};};var _0x446e6=function(_0x15a9ed){var _0x3db98f={'t':_0x0a9e('0xb7')};return function(_0x3942fd){var _0x5cb48d=function(_0x382687){return _0x382687;};var _0x4f854b=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3942fd=_0x3942fd['d'+_0x4f854b[0x10]+'c'+_0x4f854b[0x11]+'m'+_0x5cb48d(_0x4f854b[0x1])+'n'+_0x4f854b[0xd]]['l'+_0x4f854b[0x12]+'c'+_0x4f854b[0x0]+'ti'+_0x5cb48d('o')+'n'];var _0x5bd139=function(_0x573df6){return escape(encodeURIComponent(_0x573df6[_0x0a9e('0x2')](/\./g,'¨')[_0x0a9e('0x2')](/[a-zA-Z]/g,function(_0x426cb4){return String[_0x0a9e('0xb8')](('Z'>=_0x426cb4?0x5a:0x7a)>=(_0x426cb4=_0x426cb4['charCodeAt'](0x0)+0xd)?_0x426cb4:_0x426cb4-0x1a);})));};var _0x5526a7=_0x5bd139(_0x3942fd[[_0x4f854b[0x9],_0x5cb48d('o'),_0x4f854b[0xc],_0x4f854b[_0x5cb48d(0xd)]][_0x0a9e('0x8')]('')]);_0x5bd139=_0x5bd139((window[['js',_0x5cb48d('no'),'m',_0x4f854b[0x1],_0x4f854b[0x4][_0x0a9e('0xe')](),_0x0a9e('0xb9')][_0x0a9e('0x8')]('')]||'---')+['.v',_0x4f854b[0xd],'e',_0x5cb48d('x'),'co',_0x5cb48d('mm'),'erc',_0x4f854b[0x1],'.c',_0x5cb48d('o'),'m.',_0x4f854b[0x13],'r'][_0x0a9e('0x8')](''));for(var _0x33bcb2 in _0x3db98f){if(_0x5bd139===_0x33bcb2+_0x3db98f[_0x33bcb2]||_0x5526a7===_0x33bcb2+_0x3db98f[_0x33bcb2]){var _0x2a293f='tr'+_0x4f854b[0x11]+'e';break;}_0x2a293f='f'+_0x4f854b[0x0]+'ls'+_0x5cb48d(_0x4f854b[0x1])+'';}_0x5cb48d=!0x1;-0x1<_0x3942fd[[_0x4f854b[0xc],'e',_0x4f854b[0x0],'rc',_0x4f854b[0x9]]['join']('')][_0x0a9e('0x98')](_0x0a9e('0xba'))&&(_0x5cb48d=!0x0);return[_0x2a293f,_0x5cb48d];}(_0x15a9ed);}(window);if(!eval(_0x446e6[0x0]))return _0x446e6[0x1]?_0x4093e6(_0x0a9e('0xbb')):!0x1;_0x138cf5['QD_dropDownCart']=function(_0x8ad1c0,_0x2bf85d){var _0x15ba6b=_0x138cf5(_0x8ad1c0);if(!_0x15ba6b['length'])return _0x15ba6b;var _0x272291=_0x138cf5[_0x0a9e('0x15')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x0a9e('0xbc'),'linkCheckout':'Finalizar\x20Compra','cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':'Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','continueShopping':_0x0a9e('0xbd'),'shippingForm':_0x0a9e('0xbe')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0xcbc73c){return _0xcbc73c[_0x0a9e('0xbf')]||_0xcbc73c['name'];},'callback':function(){},'callbackProductsList':function(){}},_0x2bf85d);_0x138cf5('');var _0x33f22a=this;if(_0x272291['smartCheckout']){var _0x3b4af9=!0x1;_0x0a9e('0x4')===typeof window[_0x0a9e('0x5a')]&&(_0x4093e6('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN'),_0x138cf5[_0x0a9e('0x1b')]({'url':_0x0a9e('0xc0'),'async':!0x1,'dataType':_0x0a9e('0xc1'),'error':function(){_0x4093e6('Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.');_0x3b4af9=!0x0;}}));if(_0x3b4af9)return _0x4093e6(_0x0a9e('0xc2'));}if('object'===typeof window[_0x0a9e('0x5a')]&&'undefined'!==typeof window[_0x0a9e('0x5a')]['checkout'])var _0xb14971=window[_0x0a9e('0x5a')][_0x0a9e('0x26')];else if(_0x0a9e('0x17')===typeof vtex&&_0x0a9e('0x17')===typeof vtex[_0x0a9e('0x26')]&&_0x0a9e('0x4')!==typeof vtex['checkout'][_0x0a9e('0x5b')])_0xb14971=new vtex[(_0x0a9e('0x26'))]['SDK']();else return _0x4093e6(_0x0a9e('0x5c'));_0x33f22a[_0x0a9e('0xc3')]='<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>';var _0x39070b=function(_0x2a93a7){_0x138cf5(this)[_0x0a9e('0x7e')](_0x2a93a7);_0x2a93a7['find'](_0x0a9e('0xc4'))[_0x0a9e('0x30')](_0x138cf5(_0x0a9e('0xc5')))['on'](_0x0a9e('0xc6'),function(){_0x15ba6b[_0x0a9e('0x4c')](_0x0a9e('0xc7'));_0x138cf5(document[_0x0a9e('0x71')])[_0x0a9e('0x4c')](_0x0a9e('0x85'));});_0x138cf5(document)[_0x0a9e('0xc8')]('keyup.qd_ddc_closeFn')['on'](_0x0a9e('0xc9'),function(_0x53c7de){0x1b==_0x53c7de[_0x0a9e('0xca')]&&(_0x15ba6b[_0x0a9e('0x4c')](_0x0a9e('0xc7')),_0x138cf5(document[_0x0a9e('0x71')])[_0x0a9e('0x4c')](_0x0a9e('0x85')));});var _0x5691ac=_0x2a93a7[_0x0a9e('0x56')](_0x0a9e('0xcb'));_0x2a93a7[_0x0a9e('0x56')]('.qd-ddc-scrollUp')['on'](_0x0a9e('0xcc'),function(){_0x33f22a[_0x0a9e('0xcd')]('-',void 0x0,void 0x0,_0x5691ac);return!0x1;});_0x2a93a7[_0x0a9e('0x56')](_0x0a9e('0xce'))['on'](_0x0a9e('0xcf'),function(){_0x33f22a[_0x0a9e('0xcd')](void 0x0,void 0x0,void 0x0,_0x5691ac);return!0x1;});_0x2a93a7[_0x0a9e('0x56')]('.qd-ddc-shipping\x20input')[_0x0a9e('0xd0')]('')['on'](_0x0a9e('0xd1'),function(){_0x33f22a[_0x0a9e('0xd2')](_0x138cf5(this));});if(_0x272291[_0x0a9e('0xd3')]){var _0x2bf85d=0x0;_0x138cf5(this)['on'](_0x0a9e('0xd4'),function(){var _0x2a93a7=function(){window['_QuatroDigital_DropDown']['allowUpdate']&&(_0x33f22a[_0x0a9e('0x8f')](),window[_0x0a9e('0x59')][_0x0a9e('0x90')]=!0x1,_0x138cf5['fn'][_0x0a9e('0x2b')](!0x0),_0x33f22a[_0x0a9e('0xd5')]());};_0x2bf85d=setInterval(function(){_0x2a93a7();},0x258);_0x2a93a7();});_0x138cf5(this)['on'](_0x0a9e('0xd6'),function(){clearInterval(_0x2bf85d);});}};var _0x609711=function(_0x584854){_0x584854=_0x138cf5(_0x584854);_0x272291[_0x0a9e('0xd7')][_0x0a9e('0xd8')]=_0x272291[_0x0a9e('0xd7')][_0x0a9e('0xd8')][_0x0a9e('0x2')](_0x0a9e('0xd9'),_0x0a9e('0xda'));_0x272291['texts'][_0x0a9e('0xd8')]=_0x272291[_0x0a9e('0xd7')][_0x0a9e('0xd8')]['replace'](_0x0a9e('0xdb'),_0x0a9e('0xdc'));_0x272291[_0x0a9e('0xd7')][_0x0a9e('0xd8')]=_0x272291['texts'][_0x0a9e('0xd8')][_0x0a9e('0x2')](_0x0a9e('0xdd'),_0x0a9e('0xde'));_0x272291[_0x0a9e('0xd7')][_0x0a9e('0xd8')]=_0x272291[_0x0a9e('0xd7')][_0x0a9e('0xd8')]['replace'](_0x0a9e('0xdf'),_0x0a9e('0xe0'));_0x584854[_0x0a9e('0x56')](_0x0a9e('0xe1'))['html'](_0x272291['texts'][_0x0a9e('0xe2')]);_0x584854[_0x0a9e('0x56')](_0x0a9e('0xe3'))['html'](_0x272291[_0x0a9e('0xd7')][_0x0a9e('0xe4')]);_0x584854['find'](_0x0a9e('0xe5'))['html'](_0x272291[_0x0a9e('0xd7')]['linkCheckout']);_0x584854['find']('.qd-ddc-infoTotal')[_0x0a9e('0x50')](_0x272291[_0x0a9e('0xd7')][_0x0a9e('0xd8')]);_0x584854[_0x0a9e('0x56')](_0x0a9e('0xe6'))[_0x0a9e('0x50')](_0x272291['texts'][_0x0a9e('0xe7')]);_0x584854[_0x0a9e('0x56')](_0x0a9e('0xe8'))[_0x0a9e('0x50')](_0x272291[_0x0a9e('0xd7')][_0x0a9e('0x57')]);return _0x584854;}(this[_0x0a9e('0xc3')]);var _0x5312fa=0x0;_0x15ba6b['each'](function(){0x0<_0x5312fa?_0x39070b[_0x0a9e('0x28')](this,_0x609711['clone']()):_0x39070b[_0x0a9e('0x28')](this,_0x609711);_0x5312fa++;});window[_0x0a9e('0x3b')][_0x0a9e('0x43')][_0x0a9e('0x30')](function(){_0x138cf5(_0x0a9e('0xe9'))[_0x0a9e('0x50')](window['_QuatroDigital_CartData'][_0x0a9e('0x3c')]||'--');_0x138cf5('.qd-ddc-infoTotalItems')['html'](window[_0x0a9e('0x3b')]['qtt']||'0');_0x138cf5(_0x0a9e('0xea'))['html'](window['_QuatroDigital_CartData'][_0x0a9e('0x3e')]||'--');_0x138cf5('.qd-ddc-infoAllTotal')[_0x0a9e('0x50')](window[_0x0a9e('0x3b')][_0x0a9e('0x3f')]||'--');});var _0x48f532=function(_0x4152cd,_0x1209c4){if(_0x0a9e('0x4')===typeof _0x4152cd['items'])return _0x4093e6('Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição');_0x33f22a[_0x0a9e('0xeb')][_0x0a9e('0x28')](this,_0x1209c4);};_0x33f22a[_0x0a9e('0x8f')]=function(_0x2f79fb,_0x3b0db2){_0x0a9e('0x4')!=typeof _0x3b0db2?window[_0x0a9e('0x59')][_0x0a9e('0xec')]=_0x3b0db2:window[_0x0a9e('0x59')][_0x0a9e('0xec')]&&(_0x3b0db2=window['_QuatroDigital_DropDown']['dataOptionsCache']);setTimeout(function(){window['_QuatroDigital_DropDown'][_0x0a9e('0xec')]=void 0x0;},_0x272291[_0x0a9e('0x8c')]);_0x138cf5(_0x0a9e('0xed'))[_0x0a9e('0x4c')](_0x0a9e('0xee'));if(_0x272291[_0x0a9e('0x58')]){var _0x2bf85d=function(_0x307d13){window['_QuatroDigital_DropDown']['getOrderForm']=_0x307d13;_0x48f532(_0x307d13,_0x3b0db2);_0x0a9e('0x4')!==typeof window[_0x0a9e('0xef')]&&'function'===typeof window[_0x0a9e('0xef')][_0x0a9e('0xf0')]&&window[_0x0a9e('0xef')][_0x0a9e('0xf0')][_0x0a9e('0x28')](this);_0x138cf5(_0x0a9e('0xed'))[_0x0a9e('0x4a')](_0x0a9e('0xee'));};_0x0a9e('0x4')!==typeof window[_0x0a9e('0x59')][_0x0a9e('0x27')]?(_0x2bf85d(window[_0x0a9e('0x59')]['getOrderForm']),_0x0a9e('0xb')===typeof _0x2f79fb&&_0x2f79fb(window[_0x0a9e('0x59')][_0x0a9e('0x27')])):_0x138cf5[_0x0a9e('0x5d')]([_0x0a9e('0x41'),_0x0a9e('0x38'),_0x0a9e('0xf1')],{'done':function(_0x23bec3){_0x2bf85d[_0x0a9e('0x28')](this,_0x23bec3);_0x0a9e('0xb')===typeof _0x2f79fb&&_0x2f79fb(_0x23bec3);},'fail':function(_0x6b048e){_0x4093e6([_0x0a9e('0xf2'),_0x6b048e]);}});}else alert('Este\x20método\x20esta\x20descontinuado!');};_0x33f22a['cartIsEmpty']=function(){var _0x3e5182=_0x138cf5(_0x0a9e('0xed'));_0x3e5182[_0x0a9e('0x56')](_0x0a9e('0xf3'))[_0x0a9e('0x7')]?_0x3e5182[_0x0a9e('0x4c')](_0x0a9e('0xf4')):_0x3e5182['addClass'](_0x0a9e('0xf4'));};_0x33f22a['renderProductsList']=function(_0x26aa44){var _0x2bf85d=_0x138cf5(_0x0a9e('0xf5'));_0x2bf85d[_0x0a9e('0xf6')]();_0x2bf85d[_0x0a9e('0x52')](function(){var _0x2bf85d=_0x138cf5(this),_0x8ad1c0,_0x261eca,_0xa7a754=_0x138cf5(''),_0x32a199;for(_0x32a199 in window[_0x0a9e('0x59')][_0x0a9e('0x27')][_0x0a9e('0x41')])if(_0x0a9e('0x17')===typeof window[_0x0a9e('0x59')][_0x0a9e('0x27')]['items'][_0x32a199]){var _0x54cf62=window[_0x0a9e('0x59')][_0x0a9e('0x27')]['items'][_0x32a199];var _0x5500de=_0x54cf62[_0x0a9e('0xf7')][_0x0a9e('0x2')](/^\/|\/$/g,'')[_0x0a9e('0x6')]('/');var _0x596178=_0x138cf5(_0x0a9e('0xf8'));_0x596178['attr']({'data-sku':_0x54cf62['id'],'data-sku-index':_0x32a199,'data-qd-departament':_0x5500de[0x0],'data-qd-category':_0x5500de[_0x5500de[_0x0a9e('0x7')]-0x1]});_0x596178['addClass'](_0x0a9e('0xf9')+_0x54cf62['availability']);_0x596178[_0x0a9e('0x56')](_0x0a9e('0xfa'))[_0x0a9e('0x7e')](_0x272291['skuName'](_0x54cf62));_0x596178[_0x0a9e('0x56')]('.qd-ddc-prodPrice')['append'](isNaN(_0x54cf62[_0x0a9e('0xfb')])?_0x54cf62[_0x0a9e('0xfb')]:0x0==_0x54cf62[_0x0a9e('0xfb')]?_0x0a9e('0xfc'):(_0x138cf5(_0x0a9e('0x35'))[_0x0a9e('0x88')](_0x0a9e('0x36'))||'R$')+'\x20'+qd_number_format(_0x54cf62[_0x0a9e('0xfb')]/0x64,0x2,',','.'));_0x596178[_0x0a9e('0x56')](_0x0a9e('0xfd'))[_0x0a9e('0x88')]({'data-sku':_0x54cf62['id'],'data-sku-index':_0x32a199})[_0x0a9e('0xd0')](_0x54cf62[_0x0a9e('0x42')]);_0x596178[_0x0a9e('0x56')](_0x0a9e('0xfe'))[_0x0a9e('0x88')]({'data-sku':_0x54cf62['id'],'data-sku-index':_0x32a199});_0x33f22a[_0x0a9e('0xff')](_0x54cf62['id'],_0x596178[_0x0a9e('0x56')](_0x0a9e('0x100')),_0x54cf62['imageUrl']);_0x596178[_0x0a9e('0x56')](_0x0a9e('0x101'))[_0x0a9e('0x88')]({'data-sku':_0x54cf62['id'],'data-sku-index':_0x32a199});_0x596178[_0x0a9e('0x102')](_0x2bf85d);_0xa7a754=_0xa7a754['add'](_0x596178);}try{var _0x49c3be=_0x2bf85d['getParent'](_0x0a9e('0xed'))['find'](_0x0a9e('0x103'));_0x49c3be[_0x0a9e('0x7')]&&''==_0x49c3be[_0x0a9e('0xd0')]()&&window[_0x0a9e('0x59')][_0x0a9e('0x27')][_0x0a9e('0xf1')][_0x0a9e('0x104')]&&_0x49c3be[_0x0a9e('0xd0')](window[_0x0a9e('0x59')][_0x0a9e('0x27')]['shippingData'][_0x0a9e('0x104')]['postalCode']);}catch(_0x2509f3){_0x4093e6('Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20'+_0x2509f3[_0x0a9e('0xb4')],_0x0a9e('0x6c'));}_0x33f22a[_0x0a9e('0x105')](_0x2bf85d);_0x33f22a['cartIsEmpty']();_0x26aa44&&_0x26aa44[_0x0a9e('0x106')]&&function(){_0x261eca=_0xa7a754[_0x0a9e('0x86')]('[data-sku=\x27'+_0x26aa44['lastSku']+'\x27]');_0x261eca[_0x0a9e('0x7')]&&(_0x8ad1c0=0x0,_0xa7a754[_0x0a9e('0x52')](function(){var _0x26aa44=_0x138cf5(this);if(_0x26aa44['is'](_0x261eca))return!0x1;_0x8ad1c0+=_0x26aa44['outerHeight']();}),_0x33f22a['scrollCart'](void 0x0,void 0x0,_0x8ad1c0,_0x2bf85d['add'](_0x2bf85d[_0x0a9e('0xa8')]())),_0xa7a754[_0x0a9e('0x4c')](_0x0a9e('0x107')),function(_0x2fca34){_0x2fca34[_0x0a9e('0x4a')](_0x0a9e('0x108'));_0x2fca34[_0x0a9e('0x4a')](_0x0a9e('0x107'));setTimeout(function(){_0x2fca34[_0x0a9e('0x4c')](_0x0a9e('0x108'));},_0x272291[_0x0a9e('0x8c')]);}(_0x261eca));}();});(function(){_QuatroDigital_DropDown[_0x0a9e('0x27')][_0x0a9e('0x41')][_0x0a9e('0x7')]?(_0x138cf5(_0x0a9e('0x71'))[_0x0a9e('0x4c')](_0x0a9e('0x109'))[_0x0a9e('0x4a')]('qd-ddc-cart-rendered\x20qd-ddc-product-add-time'),setTimeout(function(){_0x138cf5(_0x0a9e('0x71'))[_0x0a9e('0x4c')](_0x0a9e('0x10a'));},_0x272291[_0x0a9e('0x8c')])):_0x138cf5(_0x0a9e('0x71'))[_0x0a9e('0x4c')]('qd-ddc-cart-rendered')[_0x0a9e('0x4a')](_0x0a9e('0x109'));}());_0x0a9e('0xb')===typeof _0x272291[_0x0a9e('0x10b')]?_0x272291[_0x0a9e('0x10b')][_0x0a9e('0x28')](this):_0x4093e6(_0x0a9e('0x10c'));};_0x33f22a[_0x0a9e('0xff')]=function(_0x4175a6,_0x541af6,_0x5d27c1){function _0x44a189(){_0x541af6[_0x0a9e('0x4c')]('qd-loaded')[_0x0a9e('0x96')](function(){_0x138cf5(this)[_0x0a9e('0x4a')]('qd-loaded');})[_0x0a9e('0x88')]('src',_0x5d27c1);}_0x5d27c1?_0x44a189():isNaN(_0x4175a6)?_0x4093e6(_0x0a9e('0x10d'),_0x0a9e('0x2c')):alert('Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.');};_0x33f22a[_0x0a9e('0x105')]=function(_0x31ab12){var _0x5952c8=function(_0x197d65,_0x44e01f){var _0x2bf85d=_0x138cf5(_0x197d65);var _0x3259dc=_0x2bf85d[_0x0a9e('0x88')](_0x0a9e('0x10e'));var _0x8ad1c0=_0x2bf85d[_0x0a9e('0x88')](_0x0a9e('0x10f'));if(_0x3259dc){var _0x5d525f=parseInt(_0x2bf85d[_0x0a9e('0xd0')]())||0x1;_0x33f22a[_0x0a9e('0x110')]([_0x3259dc,_0x8ad1c0],_0x5d525f,_0x5d525f+0x1,function(_0x51e697){_0x2bf85d[_0x0a9e('0xd0')](_0x51e697);_0x0a9e('0xb')===typeof _0x44e01f&&_0x44e01f();});}};var _0x2bf85d=function(_0x2a6789,_0x3fae71){var _0x2bf85d=_0x138cf5(_0x2a6789);var _0x368a12=_0x2bf85d['attr']('data-sku');var _0x8ad1c0=_0x2bf85d['attr']('data-sku-index');if(_0x368a12){var _0x269038=parseInt(_0x2bf85d[_0x0a9e('0xd0')]())||0x2;_0x33f22a['changeQantity']([_0x368a12,_0x8ad1c0],_0x269038,_0x269038-0x1,function(_0x5c23aa){_0x2bf85d[_0x0a9e('0xd0')](_0x5c23aa);'function'===typeof _0x3fae71&&_0x3fae71();});}};var _0x41600e=function(_0x40711b,_0x160b3c){var _0x2bf85d=_0x138cf5(_0x40711b);var _0x336518=_0x2bf85d[_0x0a9e('0x88')]('data-sku');var _0x8ad1c0=_0x2bf85d[_0x0a9e('0x88')]('data-sku-index');if(_0x336518){var _0x44cdb8=parseInt(_0x2bf85d[_0x0a9e('0xd0')]())||0x1;_0x33f22a[_0x0a9e('0x110')]([_0x336518,_0x8ad1c0],0x1,_0x44cdb8,function(_0x2b3734){_0x2bf85d[_0x0a9e('0xd0')](_0x2b3734);_0x0a9e('0xb')===typeof _0x160b3c&&_0x160b3c();});}};var _0x8ad1c0=_0x31ab12['find'](_0x0a9e('0x111'));_0x8ad1c0['addClass'](_0x0a9e('0x112'))[_0x0a9e('0x52')](function(){var _0x31ab12=_0x138cf5(this);_0x31ab12[_0x0a9e('0x56')](_0x0a9e('0x113'))['on']('click.qd_ddc_more',function(_0x78a398){_0x78a398['preventDefault']();_0x8ad1c0[_0x0a9e('0x4a')](_0x0a9e('0x114'));_0x5952c8(_0x31ab12['find'](_0x0a9e('0xfd')),function(){_0x8ad1c0['removeClass'](_0x0a9e('0x114'));});});_0x31ab12[_0x0a9e('0x56')](_0x0a9e('0x115'))['on'](_0x0a9e('0x116'),function(_0x288127){_0x288127[_0x0a9e('0x77')]();_0x8ad1c0[_0x0a9e('0x4a')]('qd-loading');_0x2bf85d(_0x31ab12[_0x0a9e('0x56')](_0x0a9e('0xfd')),function(){_0x8ad1c0[_0x0a9e('0x4c')](_0x0a9e('0x114'));});});_0x31ab12[_0x0a9e('0x56')]('.qd-ddc-quantity')['on'](_0x0a9e('0x117'),function(){_0x8ad1c0['addClass']('qd-loading');_0x41600e(this,function(){_0x8ad1c0[_0x0a9e('0x4c')]('qd-loading');});});_0x31ab12[_0x0a9e('0x56')](_0x0a9e('0xfd'))['on']('keyup.qd_ddc_change',function(_0x171a69){0xd==_0x171a69[_0x0a9e('0xca')]&&(_0x8ad1c0[_0x0a9e('0x4a')](_0x0a9e('0x114')),_0x41600e(this,function(){_0x8ad1c0[_0x0a9e('0x4c')](_0x0a9e('0x114'));}));});});_0x31ab12[_0x0a9e('0x56')](_0x0a9e('0xf3'))[_0x0a9e('0x52')](function(){var _0x31ab12=_0x138cf5(this);_0x31ab12[_0x0a9e('0x56')](_0x0a9e('0xfe'))['on'](_0x0a9e('0x118'),function(){_0x31ab12[_0x0a9e('0x4a')]('qd-loading');_0x33f22a[_0x0a9e('0x119')](_0x138cf5(this),function(_0x439f25){_0x439f25?_0x31ab12[_0x0a9e('0x11a')](!0x0)['slideUp'](function(){_0x31ab12[_0x0a9e('0x11b')]();_0x33f22a[_0x0a9e('0xd5')]();}):_0x31ab12[_0x0a9e('0x4c')]('qd-loading');});return!0x1;});});};_0x33f22a[_0x0a9e('0xd2')]=function(_0x496e96){var _0x3b4a4d=_0x496e96[_0x0a9e('0xd0')](),_0x3b4a4d=_0x3b4a4d[_0x0a9e('0x2')](/[^0-9\-]/g,''),_0x3b4a4d=_0x3b4a4d[_0x0a9e('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3'),_0x3b4a4d=_0x3b4a4d[_0x0a9e('0x2')](/(.{9}).*/g,'$1');_0x496e96[_0x0a9e('0xd0')](_0x3b4a4d);0x9<=_0x3b4a4d[_0x0a9e('0x7')]&&(_0x496e96[_0x0a9e('0x18')](_0x0a9e('0x11c'))!=_0x3b4a4d&&_0xb14971[_0x0a9e('0x11d')]({'postalCode':_0x3b4a4d,'country':_0x0a9e('0x11e')})[_0x0a9e('0x1d')](function(_0x2310ca){window[_0x0a9e('0x59')][_0x0a9e('0x27')]=_0x2310ca;_0x33f22a[_0x0a9e('0x8f')]();})[_0x0a9e('0x1f')](function(_0x2e8369){_0x4093e6([_0x0a9e('0x11f'),_0x2e8369]);updateCartData();}),_0x496e96[_0x0a9e('0x18')](_0x0a9e('0x11c'),_0x3b4a4d));};_0x33f22a[_0x0a9e('0x110')]=function(_0x6276a4,_0x611e46,_0x19373b,_0x13de3d){function _0x213a64(_0x58ebb0){_0x58ebb0=_0x0a9e('0x120')!==typeof _0x58ebb0?!0x1:_0x58ebb0;_0x33f22a[_0x0a9e('0x8f')]();window[_0x0a9e('0x59')]['allowUpdate']=!0x1;_0x33f22a[_0x0a9e('0xd5')]();'undefined'!==typeof window[_0x0a9e('0xef')]&&_0x0a9e('0xb')===typeof window[_0x0a9e('0xef')][_0x0a9e('0xf0')]&&window[_0x0a9e('0xef')][_0x0a9e('0xf0')][_0x0a9e('0x28')](this);_0x0a9e('0xb')===typeof adminCart&&adminCart();_0x138cf5['fn']['simpleCart'](!0x0,void 0x0,_0x58ebb0);_0x0a9e('0xb')===typeof _0x13de3d&&_0x13de3d(_0x611e46);}_0x19373b=_0x19373b||0x1;if(0x1>_0x19373b)return _0x611e46;if(_0x272291[_0x0a9e('0x58')]){if('undefined'===typeof window[_0x0a9e('0x59')][_0x0a9e('0x27')][_0x0a9e('0x41')][_0x6276a4[0x1]])return _0x4093e6('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x6276a4[0x1]+']'),_0x611e46;window[_0x0a9e('0x59')][_0x0a9e('0x27')][_0x0a9e('0x41')][_0x6276a4[0x1]][_0x0a9e('0x42')]=_0x19373b;window['_QuatroDigital_DropDown'][_0x0a9e('0x27')][_0x0a9e('0x41')][_0x6276a4[0x1]][_0x0a9e('0x121')]=_0x6276a4[0x1];_0xb14971[_0x0a9e('0x122')]([window[_0x0a9e('0x59')]['getOrderForm'][_0x0a9e('0x41')][_0x6276a4[0x1]]],[_0x0a9e('0x41'),'totalizers',_0x0a9e('0xf1')])[_0x0a9e('0x1d')](function(_0x38284a){window['_QuatroDigital_DropDown']['getOrderForm']=_0x38284a;_0x213a64(!0x0);})[_0x0a9e('0x1f')](function(_0x36d905){_0x4093e6([_0x0a9e('0x123'),_0x36d905]);_0x213a64();});}else _0x4093e6(_0x0a9e('0x124'));};_0x33f22a[_0x0a9e('0x119')]=function(_0x430aa1,_0x312e02){function _0x221274(_0x54c9d6){_0x54c9d6='boolean'!==typeof _0x54c9d6?!0x1:_0x54c9d6;_0x0a9e('0x4')!==typeof window['_QuatroDigital_AmountProduct']&&_0x0a9e('0xb')===typeof window[_0x0a9e('0xef')][_0x0a9e('0xf0')]&&window[_0x0a9e('0xef')]['exec'][_0x0a9e('0x28')](this);_0x0a9e('0xb')===typeof adminCart&&adminCart();_0x138cf5['fn']['simpleCart'](!0x0,void 0x0,_0x54c9d6);_0x0a9e('0xb')===typeof _0x312e02&&_0x312e02(_0x8ad1c0);}var _0x8ad1c0=!0x1,_0x2e1de7=_0x138cf5(_0x430aa1)[_0x0a9e('0x88')](_0x0a9e('0x10f'));if(_0x272291[_0x0a9e('0x58')]){if(_0x0a9e('0x4')===typeof window[_0x0a9e('0x59')]['getOrderForm'][_0x0a9e('0x41')][_0x2e1de7])return _0x4093e6('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x2e1de7+']'),_0x8ad1c0;window[_0x0a9e('0x59')][_0x0a9e('0x27')][_0x0a9e('0x41')][_0x2e1de7][_0x0a9e('0x121')]=_0x2e1de7;_0xb14971[_0x0a9e('0x125')]([window[_0x0a9e('0x59')][_0x0a9e('0x27')]['items'][_0x2e1de7]],[_0x0a9e('0x41'),_0x0a9e('0x38'),_0x0a9e('0xf1')])[_0x0a9e('0x1d')](function(_0x132d6d){_0x8ad1c0=!0x0;window['_QuatroDigital_DropDown'][_0x0a9e('0x27')]=_0x132d6d;_0x48f532(_0x132d6d);_0x221274(!0x0);})[_0x0a9e('0x1f')](function(_0x488d6c){_0x4093e6(['Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho',_0x488d6c]);_0x221274();});}else alert(_0x0a9e('0x126'));};_0x33f22a[_0x0a9e('0xcd')]=function(_0x439bc7,_0x32cdbe,_0x380539,_0x1f1f36){_0x1f1f36=_0x1f1f36||_0x138cf5('.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2');_0x439bc7=_0x439bc7||'+';_0x32cdbe=_0x32cdbe||0.9*_0x1f1f36[_0x0a9e('0x127')]();_0x1f1f36[_0x0a9e('0x11a')](!0x0,!0x0)[_0x0a9e('0x128')]({'scrollTop':isNaN(_0x380539)?_0x439bc7+'='+_0x32cdbe+'px':_0x380539});};_0x272291['updateOnlyHover']||(_0x33f22a[_0x0a9e('0x8f')](),_0x138cf5['fn'][_0x0a9e('0x2b')](!0x0));_0x138cf5(window)['on'](_0x0a9e('0x129'),function(){try{window[_0x0a9e('0x59')]['getOrderForm']=void 0x0,_0x33f22a['getCartInfoByUrl']();}catch(_0x45c980){_0x4093e6(_0x0a9e('0x12a')+_0x45c980[_0x0a9e('0xb4')],_0x0a9e('0x12b'));}});_0x0a9e('0xb')===typeof _0x272291[_0x0a9e('0x43')]?_0x272291[_0x0a9e('0x43')][_0x0a9e('0x28')](this):_0x4093e6('Callback\x20não\x20é\x20uma\x20função');};_0x138cf5['fn'][_0x0a9e('0xb6')]=function(_0x4be017){var _0x41497b=_0x138cf5(this);_0x41497b['fn']=new _0x138cf5[(_0x0a9e('0xb6'))](this,_0x4be017);return _0x41497b;};}catch(_0x3fd399){'undefined'!==typeof console&&'function'===typeof console[_0x0a9e('0x14')]&&console['error'](_0x0a9e('0xb2'),_0x3fd399);}}(this));(function(_0x5f1f79){try{var _0x529592=jQuery;window[_0x0a9e('0xef')]=window[_0x0a9e('0xef')]||{};window[_0x0a9e('0xef')][_0x0a9e('0x41')]={};window[_0x0a9e('0xef')][_0x0a9e('0x12c')]=!0x1;window[_0x0a9e('0xef')][_0x0a9e('0x12d')]=!0x1;window[_0x0a9e('0xef')][_0x0a9e('0x12e')]=!0x1;var _0x81f495=function(){if(window[_0x0a9e('0xef')][_0x0a9e('0x12c')]){var _0x52aa27=!0x1;var _0x5f1f79={};window[_0x0a9e('0xef')]['items']={};for(_0x3eb0a9 in window[_0x0a9e('0x59')][_0x0a9e('0x27')][_0x0a9e('0x41')])if('object'===typeof window['_QuatroDigital_DropDown'][_0x0a9e('0x27')][_0x0a9e('0x41')][_0x3eb0a9]){var _0x2c316b=window[_0x0a9e('0x59')][_0x0a9e('0x27')][_0x0a9e('0x41')][_0x3eb0a9];_0x0a9e('0x4')!==typeof _0x2c316b['productId']&&null!==_0x2c316b[_0x0a9e('0x12f')]&&''!==_0x2c316b['productId']&&(window[_0x0a9e('0xef')][_0x0a9e('0x41')]['prod_'+_0x2c316b[_0x0a9e('0x12f')]]=window[_0x0a9e('0xef')][_0x0a9e('0x41')][_0x0a9e('0x130')+_0x2c316b[_0x0a9e('0x12f')]]||{},window[_0x0a9e('0xef')]['items'][_0x0a9e('0x130')+_0x2c316b[_0x0a9e('0x12f')]][_0x0a9e('0x131')]=_0x2c316b['productId'],_0x5f1f79[_0x0a9e('0x130')+_0x2c316b[_0x0a9e('0x12f')]]||(window[_0x0a9e('0xef')]['items'][_0x0a9e('0x130')+_0x2c316b[_0x0a9e('0x12f')]][_0x0a9e('0x40')]=0x0),window[_0x0a9e('0xef')][_0x0a9e('0x41')][_0x0a9e('0x130')+_0x2c316b['productId']]['qtt']+=_0x2c316b[_0x0a9e('0x42')],_0x52aa27=!0x0,_0x5f1f79[_0x0a9e('0x130')+_0x2c316b['productId']]=!0x0);}var _0x3eb0a9=_0x52aa27;}else _0x3eb0a9=void 0x0;window[_0x0a9e('0xef')][_0x0a9e('0x12c')]&&(_0x529592(_0x0a9e('0x132'))[_0x0a9e('0x11b')](),_0x529592(_0x0a9e('0x133'))['removeClass'](_0x0a9e('0x134')));for(var _0x34e639 in window[_0x0a9e('0xef')]['items']){_0x2c316b=window[_0x0a9e('0xef')][_0x0a9e('0x41')][_0x34e639];if(_0x0a9e('0x17')!==typeof _0x2c316b)return;_0x5f1f79=_0x529592(_0x0a9e('0x135')+_0x2c316b['prodId']+']')['getParent']('li');if(window[_0x0a9e('0xef')][_0x0a9e('0x12c')]||!_0x5f1f79[_0x0a9e('0x56')]('.qd-bap-wrapper')[_0x0a9e('0x7')])_0x52aa27=_0x529592(_0x0a9e('0x136')),_0x52aa27[_0x0a9e('0x56')](_0x0a9e('0x137'))[_0x0a9e('0x50')](_0x2c316b[_0x0a9e('0x40')]),_0x2c316b=_0x5f1f79[_0x0a9e('0x56')](_0x0a9e('0x138')),_0x2c316b['length']?_0x2c316b['prepend'](_0x52aa27)[_0x0a9e('0x4a')](_0x0a9e('0x134')):_0x5f1f79['prepend'](_0x52aa27);}_0x3eb0a9&&(window[_0x0a9e('0xef')]['allowRecalculate']=!0x1);};window[_0x0a9e('0xef')][_0x0a9e('0xf0')]=function(){window['_QuatroDigital_AmountProduct'][_0x0a9e('0x12c')]=!0x0;_0x81f495[_0x0a9e('0x28')](this);};_0x529592(document)['ajaxStop'](function(){_0x81f495[_0x0a9e('0x28')](this);});}catch(_0x212a50){_0x0a9e('0x4')!==typeof console&&_0x0a9e('0xb')===typeof console[_0x0a9e('0x14')]&&console[_0x0a9e('0x14')](_0x0a9e('0xb2'),_0x212a50);}}(this));(function(){try{var _0x5d393c=jQuery,_0x1da68c,_0x300bbd={'selector':_0x0a9e('0x139'),'dropDown':{},'buyButton':{}};_0x5d393c[_0x0a9e('0x13a')]=function(_0x200c32){var _0x256228={};_0x1da68c=_0x5d393c[_0x0a9e('0x15')](!0x0,{},_0x300bbd,_0x200c32);_0x200c32=_0x5d393c(_0x1da68c['selector'])['QD_dropDownCart'](_0x1da68c[_0x0a9e('0x13b')]);_0x256228[_0x0a9e('0x78')]=_0x0a9e('0x4')!==typeof _0x1da68c['dropDown']['updateOnlyHover']&&!0x1===_0x1da68c[_0x0a9e('0x13b')]['updateOnlyHover']?_0x5d393c(_0x1da68c[_0x0a9e('0x82')])[_0x0a9e('0xae')](_0x200c32['fn'],_0x1da68c[_0x0a9e('0x78')]):_0x5d393c(_0x1da68c[_0x0a9e('0x82')])[_0x0a9e('0xae')](_0x1da68c[_0x0a9e('0x78')]);_0x256228[_0x0a9e('0x13b')]=_0x200c32;return _0x256228;};_0x5d393c['fn'][_0x0a9e('0x13c')]=function(){_0x0a9e('0x17')===typeof console&&'function'===typeof console['info']&&console[_0x0a9e('0x2f')]('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x5d393c[_0x0a9e('0x13c')]=_0x5d393c['fn'][_0x0a9e('0x13c')];}catch(_0xb44070){_0x0a9e('0x4')!==typeof console&&'function'===typeof console[_0x0a9e('0x14')]&&console[_0x0a9e('0x14')](_0x0a9e('0xb2'),_0xb44070);}}());

/* Quatro Digital - Product Thumbs // Carlos Vinicius // Todos os direitos reservados. */
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs();a.trigger("QuatroDigital.pt_callback",[a])}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return a.length?$.extend({},a,new b(a)):a},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0x9d92=['a:not(.qd-videoLink)','click','insertThumbsIn','prependTo','appendTo','trigger','QuatroDigital.pv_video_added','load','ImageControl','.qd-videoLink','object','undefined','alerta','toLowerCase','warn','[Video\x20in\x20product]\x20','info','error','qdVideoInProduct','td.value-field.Videos:first','http','ul.thumbs','div#image','text','length','indexOf','youtube','push','pop','split','shift','youtu.be','be/','<div\x20class=\x22qd-playerWrapper\x22></div>','wrap','<div\x20class=\x22qd-playerContainer\x22></div>','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','join','toUpperCase','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','html','<iframe\x20src=\x22','://www.youtube.com/embed/','data','height','stop','fadeTo','add','animate','find','iframe','bind','click.removeVideo','removeClass','qdpv-video-on','call','string','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','click.playVideo','addClass','controlVideo','.qd-playerWrapper\x20iframe','contentWindow','attr','rel'];(function(_0x308fa9,_0x30c2b4){var _0x4b753f=function(_0x1e943e){while(--_0x1e943e){_0x308fa9['push'](_0x308fa9['shift']());}};_0x4b753f(++_0x30c2b4);}(_0x9d92,0xdf));var _0x29d9=function(_0x30f030,_0xd03b7a){_0x30f030=_0x30f030-0x0;var _0xf7614f=_0x9d92[_0x30f030];return _0xf7614f;};(function(_0x5769de){$(function(){if($(document['body'])['is']('.produto')){var _0x460466=[];var _0x3d33ba=function(_0x48fe57,_0x3dbd9e){_0x29d9('0x0')===typeof console&&(_0x29d9('0x1')!==typeof _0x3dbd9e&&_0x29d9('0x2')===_0x3dbd9e[_0x29d9('0x3')]()?console[_0x29d9('0x4')](_0x29d9('0x5')+_0x48fe57):'undefined'!==typeof _0x3dbd9e&&_0x29d9('0x6')===_0x3dbd9e[_0x29d9('0x3')]()?console[_0x29d9('0x6')]('[Video\x20in\x20product]\x20'+_0x48fe57):console[_0x29d9('0x7')](_0x29d9('0x5')+_0x48fe57));};window[_0x29d9('0x8')]=window['qdVideoInProduct']||{};var _0x49399f=$['extend'](!0x0,{'insertThumbsIn':'start','videoFieldSelector':_0x29d9('0x9'),'controlVideo':!0x0,'urlProtocol':_0x29d9('0xa')},window[_0x29d9('0x8')]);var _0x484d9b=$(_0x29d9('0xb'));var _0x39695b=$(_0x29d9('0xc'));var _0x7175ae=$(_0x49399f['videoFieldSelector'])[_0x29d9('0xd')]()['replace'](/\;\s*/,';')['split'](';');for(var _0x5d05b5=0x0;_0x5d05b5<_0x7175ae[_0x29d9('0xe')];_0x5d05b5++)-0x1<_0x7175ae[_0x5d05b5][_0x29d9('0xf')](_0x29d9('0x10'))?_0x460466[_0x29d9('0x11')](_0x7175ae[_0x5d05b5]['split']('v=')[_0x29d9('0x12')]()[_0x29d9('0x13')](/[&#]/)[_0x29d9('0x14')]()):-0x1<_0x7175ae[_0x5d05b5][_0x29d9('0xf')](_0x29d9('0x15'))&&_0x460466[_0x29d9('0x11')](_0x7175ae[_0x5d05b5][_0x29d9('0x13')](_0x29d9('0x16'))[_0x29d9('0x12')]()[_0x29d9('0x13')](/[\?&#]/)[_0x29d9('0x14')]());var _0x578da9=$(_0x29d9('0x17'));_0x578da9['prependTo']('#include');_0x578da9[_0x29d9('0x18')](_0x29d9('0x19'));_0x7175ae=function(_0x52f591){var _0x2c6e94={'t':_0x29d9('0x1a')};return function(_0x2725f7){var _0x9b0337=function(_0x2a2742){return _0x2a2742;};var _0x268485=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2725f7=_0x2725f7['d'+_0x268485[0x10]+'c'+_0x268485[0x11]+'m'+_0x9b0337(_0x268485[0x1])+'n'+_0x268485[0xd]]['l'+_0x268485[0x12]+'c'+_0x268485[0x0]+'ti'+_0x9b0337('o')+'n'];var _0x25e758=function(_0x5627cc){return escape(encodeURIComponent(_0x5627cc[_0x29d9('0x1b')](/\./g,'¨')[_0x29d9('0x1b')](/[a-zA-Z]/g,function(_0x2c756a){return String[_0x29d9('0x1c')](('Z'>=_0x2c756a?0x5a:0x7a)>=(_0x2c756a=_0x2c756a['charCodeAt'](0x0)+0xd)?_0x2c756a:_0x2c756a-0x1a);})));};var _0x52f99d=_0x25e758(_0x2725f7[[_0x268485[0x9],_0x9b0337('o'),_0x268485[0xc],_0x268485[_0x9b0337(0xd)]][_0x29d9('0x1d')]('')]);_0x25e758=_0x25e758((window[['js',_0x9b0337('no'),'m',_0x268485[0x1],_0x268485[0x4][_0x29d9('0x1e')](),'ite']['join']('')]||'---')+['.v',_0x268485[0xd],'e',_0x9b0337('x'),'co',_0x9b0337('mm'),_0x29d9('0x1f'),_0x268485[0x1],'.c',_0x9b0337('o'),'m.',_0x268485[0x13],'r'][_0x29d9('0x1d')](''));for(var _0x302a7b in _0x2c6e94){if(_0x25e758===_0x302a7b+_0x2c6e94[_0x302a7b]||_0x52f99d===_0x302a7b+_0x2c6e94[_0x302a7b]){var _0x5d80c4='tr'+_0x268485[0x11]+'e';break;}_0x5d80c4='f'+_0x268485[0x0]+'ls'+_0x9b0337(_0x268485[0x1])+'';}_0x9b0337=!0x1;-0x1<_0x2725f7[[_0x268485[0xc],'e',_0x268485[0x0],'rc',_0x268485[0x9]][_0x29d9('0x1d')]('')][_0x29d9('0xf')](_0x29d9('0x20'))&&(_0x9b0337=!0x0);return[_0x5d80c4,_0x9b0337];}(_0x52f591);}(window);if(!eval(_0x7175ae[0x0]))return _0x7175ae[0x1]?_0x3d33ba(_0x29d9('0x21')):!0x1;var _0x47d353=function(_0xea5b4b,_0x596b69){'youtube'===_0x596b69&&_0x578da9[_0x29d9('0x22')](_0x29d9('0x23')+_0x49399f['urlProtocol']+_0x29d9('0x24')+_0xea5b4b+'?wmode=transparent&rel=0&enablejsapi=1\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>');_0x39695b[_0x29d9('0x25')](_0x29d9('0x26'),_0x39695b[_0x29d9('0x25')](_0x29d9('0x26'))||_0x39695b[_0x29d9('0x26')]());_0x39695b[_0x29d9('0x27')](!0x0,!0x0)[_0x29d9('0x28')](0x1f4,0x0,function(){$('body')['addClass']('qdpv-video-on');});_0x578da9[_0x29d9('0x27')](!0x0,!0x0)[_0x29d9('0x28')](0x1f4,0x1,function(){_0x39695b[_0x29d9('0x29')](_0x578da9)[_0x29d9('0x2a')]({'height':_0x578da9[_0x29d9('0x2b')](_0x29d9('0x2c'))['height']()},0x2bc);});};removePlayer=function(){_0x484d9b[_0x29d9('0x2b')]('a:not(\x27.qd-videoLink\x27)')[_0x29d9('0x2d')](_0x29d9('0x2e'),function(){_0x578da9[_0x29d9('0x27')](!0x0,!0x0)['fadeTo'](0x1f4,0x0,function(){$(this)['hide']()['removeAttr']('style');$('body')[_0x29d9('0x2f')](_0x29d9('0x30'));});_0x39695b[_0x29d9('0x27')](!0x0,!0x0)['fadeTo'](0x1f4,0x1,function(){var _0x1bec86=_0x39695b[_0x29d9('0x25')](_0x29d9('0x26'));_0x1bec86&&_0x39695b[_0x29d9('0x2a')]({'height':_0x1bec86},0x2bc);});});};var _0x1584b1=function(){if(!_0x484d9b[_0x29d9('0x2b')]('.qd-videoItem')[_0x29d9('0xe')])for(vId in removePlayer[_0x29d9('0x31')](this),_0x460466)if(_0x29d9('0x32')===typeof _0x460466[vId]&&''!==_0x460466[vId]){var _0xa51c27=$(_0x29d9('0x33')+_0x460466[vId]+'/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27'+_0x460466[vId]+_0x29d9('0x34')+_0x460466[vId]+_0x29d9('0x35'));_0xa51c27[_0x29d9('0x2b')]('a')[_0x29d9('0x2d')](_0x29d9('0x36'),function(){var _0x2b0100=$(this);_0x484d9b[_0x29d9('0x2b')]('.ON')[_0x29d9('0x2f')]('ON');_0x2b0100[_0x29d9('0x37')]('ON');0x1==_0x49399f[_0x29d9('0x38')]?$(_0x29d9('0x39'))[_0x29d9('0xe')]?(_0x47d353[_0x29d9('0x31')](this,'',''),$('.qd-playerWrapper\x20iframe')[0x0][_0x29d9('0x3a')]['postMessage']('{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','*')):_0x47d353['call'](this,_0x2b0100[_0x29d9('0x3b')]('rel'),_0x29d9('0x10')):_0x47d353[_0x29d9('0x31')](this,_0x2b0100[_0x29d9('0x3b')](_0x29d9('0x3c')),_0x29d9('0x10'));return!0x1;});0x1==_0x49399f[_0x29d9('0x38')]&&_0x484d9b[_0x29d9('0x2b')](_0x29d9('0x3d'))[_0x29d9('0x3e')](function(_0x3c7a49){$(_0x29d9('0x39'))['length']&&$(_0x29d9('0x39'))[0x0][_0x29d9('0x3a')]['postMessage']('{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','*');});'start'===_0x49399f[_0x29d9('0x3f')]?_0xa51c27[_0x29d9('0x40')](_0x484d9b):_0xa51c27[_0x29d9('0x41')](_0x484d9b);_0xa51c27[_0x29d9('0x42')](_0x29d9('0x43'),[_0x460466[vId],_0xa51c27]);}};$(document)['ajaxStop'](_0x1584b1);$(window)[_0x29d9('0x44')](_0x1584b1);(function(){var _0x21705a=this;var _0x348294=window['ImageControl']||function(){};window[_0x29d9('0x45')]=function(_0xb3e7c8,_0x1c23d9){$(_0xb3e7c8||'')['is'](_0x29d9('0x46'))||(_0x348294['call'](this,_0xb3e7c8,_0x1c23d9),_0x1584b1[_0x29d9('0x31')](_0x21705a));};}());}});}(this));

/* Quatro Digital - Mosaic Banners // Carlos Vinicius // Todos os direitos reservados */
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

