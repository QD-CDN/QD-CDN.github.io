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
			$('.header-qd-v1').append('<div class="smart-cart-qd-v1-wrapper"><div class="qd-sc-wrapper"></div></div>');

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
var _0x4560=['bestPrice','.qd_productPrice','val','appliedDiscount','listPrice','qd-active','qd-sp-active','.qd_displayPrice','skuPrice','.qd-sp-display-discount','html','installments','changeInstallments','installmentValue','.qd_sp_display_installments','.qd_sp_display_installmentValue','.qd_sp_installments','append','.qd_saveAmountPercent','prepend','changeNativeSaveAmount','em.economia-de','each','qd_sp_processedItem','flagElement','call','forcePromotion','string','startedByWrapper','closest','.qd_sp_processedItem','.qd_productPrice:not(.qd_sp_processedItem)','display:none\x20!important;','after','extend','body','.produto','function','prototype','trim','replace','undefined','pow','round','split','length','join','Smart\x20Price','object','error','info','warn','alerta','toLowerCase','apply','text','search','match','.flag','[class*=\x27desconto\x27]','auto','strong.skuBestPrice','label.skuBestInstallmentNumber','label.skuBestInstallmentValue','strong.skuPrice','QD_SmartPrice','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','toUpperCase','ite','---','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','productPage','wrapperElement','filterFlagBy','isProductPage','find','addClass','skuBestPrice','removeClass','qd_sp_on','isDiscountFlag','attr','skus','sku','available','isSmartCheckout','qd-sp-product-unavailable','getDiscountValue','O\x20valor\x20informado\x20p/\x20o\x20desconto\x20não\x20é\x20um\x20número.'];(function(_0x19e35c,_0x29cd1e){var _0x3e1fe8=function(_0x17258b){while(--_0x17258b){_0x19e35c['push'](_0x19e35c['shift']());}};_0x3e1fe8(++_0x29cd1e);}(_0x4560,0x195));var _0x0456=function(_0x5b3573,_0x23ed06){_0x5b3573=_0x5b3573-0x0;var _0x26571e=_0x4560[_0x5b3573];return _0x26571e;};_0x0456('0x0')!==typeof String[_0x0456('0x1')][_0x0456('0x2')]&&(String['prototype'][_0x0456('0x2')]=function(){return this[_0x0456('0x3')](/^\s+|\s+$/g,'');});function qd_number_format(_0xcda95a,_0x41f558,_0x220e02,_0x1fc7ab){_0xcda95a=(_0xcda95a+'')['replace'](/[^0-9+\-Ee.]/g,'');_0xcda95a=isFinite(+_0xcda95a)?+_0xcda95a:0x0;_0x41f558=isFinite(+_0x41f558)?Math['abs'](_0x41f558):0x0;_0x1fc7ab=_0x0456('0x4')===typeof _0x1fc7ab?',':_0x1fc7ab;_0x220e02='undefined'===typeof _0x220e02?'.':_0x220e02;var _0x3381c2='',_0x3381c2=function(_0x1cccf7,_0x5a11e7){var _0x41f558=Math[_0x0456('0x5')](0xa,_0x5a11e7);return''+(Math[_0x0456('0x6')](_0x1cccf7*_0x41f558)/_0x41f558)['toFixed'](_0x5a11e7);},_0x3381c2=(_0x41f558?_0x3381c2(_0xcda95a,_0x41f558):''+Math[_0x0456('0x6')](_0xcda95a))[_0x0456('0x7')]('.');0x3<_0x3381c2[0x0][_0x0456('0x8')]&&(_0x3381c2[0x0]=_0x3381c2[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x1fc7ab));(_0x3381c2[0x1]||'')[_0x0456('0x8')]<_0x41f558&&(_0x3381c2[0x1]=_0x3381c2[0x1]||'',_0x3381c2[0x1]+=Array(_0x41f558-_0x3381c2[0x1]['length']+0x1)[_0x0456('0x9')]('0'));return _0x3381c2[_0x0456('0x9')](_0x220e02);};(function(_0x2b875f){'use strict';var _0x3849a6=jQuery;if(typeof _0x3849a6['fn']['QD_SmartPrice']===_0x0456('0x0'))return;var _0x3ece31=_0x0456('0xa');var _0x593ba4=function(_0x476f0c,_0x2afe52){if(_0x0456('0xb')===typeof console&&_0x0456('0x0')===typeof console[_0x0456('0xc')]&&_0x0456('0x0')===typeof console[_0x0456('0xd')]&&_0x0456('0x0')===typeof console[_0x0456('0xe')]){var _0x3d145e;_0x0456('0xb')===typeof _0x476f0c?(_0x476f0c['unshift']('['+_0x3ece31+']\x0a'),_0x3d145e=_0x476f0c):_0x3d145e=['['+_0x3ece31+']\x0a'+_0x476f0c];if(_0x0456('0x4')===typeof _0x2afe52||_0x0456('0xf')!==_0x2afe52['toLowerCase']()&&'aviso'!==_0x2afe52['toLowerCase']())if('undefined'!==typeof _0x2afe52&&_0x0456('0xd')===_0x2afe52[_0x0456('0x10')]())try{console[_0x0456('0xd')][_0x0456('0x11')](console,_0x3d145e);}catch(_0x3b808f){console[_0x0456('0xd')](_0x3d145e[_0x0456('0x9')]('\x0a'));}else try{console['error'][_0x0456('0x11')](console,_0x3d145e);}catch(_0x363b4e){console[_0x0456('0xc')](_0x3d145e[_0x0456('0x9')]('\x0a'));}else try{console['warn'][_0x0456('0x11')](console,_0x3d145e);}catch(_0x4b52cd){console['warn'](_0x3d145e[_0x0456('0x9')]('\x0a'));}}};var _0xbb4bfc=/[0-9]+\%/i;var _0x4b1f84=/[0-9\.]+(?=\%)/i;var _0x5a00e0={'isDiscountFlag':function(_0x2fe3ed){if(_0x2fe3ed[_0x0456('0x12')]()[_0x0456('0x13')](_0xbb4bfc)>-0x1)return!![];return![];},'getDiscountValue':function(_0x370b8d){return _0x370b8d[_0x0456('0x12')]()[_0x0456('0x14')](_0x4b1f84);},'startedByWrapper':![],'flagElement':_0x0456('0x15'),'wrapperElement':'li','filterFlagBy':_0x0456('0x16'),'forcePromotion':null,'appliedDiscount':null,'oneFlagByItem':!![],'isSmartCheckout':!![],'changeInstallments':![],'productPage':{'changeNativeSaveAmount':!![],'changeNativePrice':!![],'changeInstallments':![],'isProductPage':_0x0456('0x17'),'wrapperElement':'.productRightColumn','skuBestPrice':_0x0456('0x18'),'installments':_0x0456('0x19'),'installmentValue':_0x0456('0x1a'),'skuPrice':_0x0456('0x1b')}};_0x3849a6['fn'][_0x0456('0x1c')]=function(){};var _0x14a8d2=function(_0x4e62d1){var _0xe11ac4={'t':_0x0456('0x1d')};return function(_0x1383c9){var _0x1cd231,_0x153627,_0x3a2d7e,_0x2880ca;_0x153627=function(_0x2e1420){return _0x2e1420;};_0x3a2d7e=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x1383c9=_0x1383c9['d'+_0x3a2d7e[0x10]+'c'+_0x3a2d7e[0x11]+'m'+_0x153627(_0x3a2d7e[0x1])+'n'+_0x3a2d7e[0xd]]['l'+_0x3a2d7e[0x12]+'c'+_0x3a2d7e[0x0]+'ti'+_0x153627('o')+'n'];_0x1cd231=function(_0x1d7979){return escape(encodeURIComponent(_0x1d7979['replace'](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x274353){return String[_0x0456('0x1e')](('Z'>=_0x274353?0x5a:0x7a)>=(_0x274353=_0x274353['charCodeAt'](0x0)+0xd)?_0x274353:_0x274353-0x1a);})));};var _0x37562a=_0x1cd231(_0x1383c9[[_0x3a2d7e[0x9],_0x153627('o'),_0x3a2d7e[0xc],_0x3a2d7e[_0x153627(0xd)]]['join']('')]);_0x1cd231=_0x1cd231((window[['js',_0x153627('no'),'m',_0x3a2d7e[0x1],_0x3a2d7e[0x4][_0x0456('0x1f')](),_0x0456('0x20')]['join']('')]||_0x0456('0x21'))+['.v',_0x3a2d7e[0xd],'e',_0x153627('x'),'co',_0x153627('mm'),'erc',_0x3a2d7e[0x1],'.c',_0x153627('o'),'m.',_0x3a2d7e[0x13],'r'][_0x0456('0x9')](''));for(var _0x9e9b32 in _0xe11ac4){if(_0x1cd231===_0x9e9b32+_0xe11ac4[_0x9e9b32]||_0x37562a===_0x9e9b32+_0xe11ac4[_0x9e9b32]){_0x2880ca='tr'+_0x3a2d7e[0x11]+'e';break;}_0x2880ca='f'+_0x3a2d7e[0x0]+'ls'+_0x153627(_0x3a2d7e[0x1])+'';}_0x153627=!0x1;-0x1<_0x1383c9[[_0x3a2d7e[0xc],'e',_0x3a2d7e[0x0],'rc',_0x3a2d7e[0x9]]['join']('')][_0x0456('0x22')](_0x0456('0x23'))&&(_0x153627=!0x0);return[_0x2880ca,_0x153627];}(_0x4e62d1);}(window);if(!eval(_0x14a8d2[0x0]))return _0x14a8d2[0x1]?_0x593ba4(_0x0456('0x24')):!0x1;var _0x250863=function(_0x7a3ea9,_0x368693){'use strict';var _0x2c09bf=function(_0xb83a64){'use strict';var _0x47d2b3,_0x167408,_0x2d3bef,_0x10a7ec,_0x198f3f,_0x5f3d96,_0x1c68e6,_0x172200,_0x21bca2,_0x143272,_0x1753fb,_0x43aef7,_0x11c716,_0x543177,_0x48639b,_0x181ac9,_0x16018b,_0x2915f2,_0xf9ae58;var _0x494cd8=_0x3849a6(this);_0xb83a64=typeof _0xb83a64==='undefined'?![]:_0xb83a64;if(_0x368693[_0x0456('0x25')]['isProductPage'])var _0x307289=_0x494cd8['closest'](_0x368693['productPage']['wrapperElement']);else var _0x307289=_0x494cd8['closest'](_0x368693[_0x0456('0x26')]);if(!_0xb83a64&&!_0x494cd8['is'](_0x368693[_0x0456('0x27')])){if(_0x368693[_0x0456('0x25')][_0x0456('0x28')]&&_0x307289['is'](_0x368693[_0x0456('0x25')][_0x0456('0x26')])){_0x307289[_0x0456('0x29')](_0x368693[_0x0456('0x25')]['skuBestPrice'])[_0x0456('0x2a')]('qd-active');_0x307289[_0x0456('0x2a')]('qd-sp-active');}return;}var _0x20b1d0=_0x368693['productPage'][_0x0456('0x28')];if(_0x494cd8['is']('.qd_sp_on,\x20.qd_sp_ignored')&&!_0x20b1d0)return;if(_0x20b1d0){_0x172200=_0x307289[_0x0456('0x29')](_0x368693['productPage'][_0x0456('0x2b')]);if(_0x172200[_0x0456('0x29')]('.qd_active')[_0x0456('0x8')])return;_0x172200[_0x0456('0x2c')]('qd-active');_0x307289[_0x0456('0x2c')]('qd-sp-active');}if(_0x368693['oneFlagByItem']&&_0x494cd8['siblings']('.qd_sp_on')[_0x0456('0x8')]){_0x494cd8[_0x0456('0x2a')]('qd_sp_ignored');return;}_0x494cd8[_0x0456('0x2a')](_0x0456('0x2d'));if(!_0x368693[_0x0456('0x2e')](_0x494cd8))return;if(_0x20b1d0){_0x2d3bef={};var _0x38b263=parseInt(_0x3849a6('div[skuCorrente]:first')[_0x0456('0x2f')]('skuCorrente'),0xa);if(_0x38b263){for(var _0x577e6f=0x0;_0x577e6f<skuJson[_0x0456('0x30')][_0x0456('0x8')];_0x577e6f++){if(skuJson['skus'][_0x577e6f][_0x0456('0x31')]==_0x38b263){_0x2d3bef=skuJson[_0x0456('0x30')][_0x577e6f];break;}}}else{var _0x41065e=0x5af3107a3fff;for(var _0x774d0 in skuJson[_0x0456('0x30')]){if(typeof skuJson['skus'][_0x774d0]===_0x0456('0x0'))continue;if(!skuJson[_0x0456('0x30')][_0x774d0][_0x0456('0x32')])continue;if(skuJson[_0x0456('0x30')][_0x774d0]['bestPrice']<_0x41065e){_0x41065e=skuJson[_0x0456('0x30')][_0x774d0]['bestPrice'];_0x2d3bef=skuJson[_0x0456('0x30')][_0x774d0];}}}}_0x181ac9=!![];_0x16018b=0x0;if(_0x368693[_0x0456('0x33')]&&_0x2915f2){_0x181ac9=skuJson['available'];if(!_0x181ac9)return _0x307289[_0x0456('0x2a')](_0x0456('0x34'));}_0x167408=_0x368693[_0x0456('0x35')](_0x494cd8);_0x47d2b3=parseFloat(_0x167408,0xa);if(isNaN(_0x47d2b3))return _0x593ba4([_0x0456('0x36'),_0x494cd8],_0x0456('0xf'));var _0x208238=function(_0x320790){if(_0x20b1d0)_0x10a7ec=(_0x320790[_0x0456('0x37')]||0x0)/0x64;else{_0x11c716=_0x307289[_0x0456('0x29')](_0x0456('0x38'));_0x10a7ec=parseFloat((_0x11c716[_0x0456('0x39')]()||'')[_0x0456('0x3')](/[^0-9\.\,]+/i,'')['replace']('.','')[_0x0456('0x3')](',','.'),0xa);}if(isNaN(_0x10a7ec))return _0x593ba4(['Por\x20alguma\x20razão\x20não\x20consegui\x20obter\x20o\x20preço\x20deste\x20produto\x20:(',_0x494cd8,_0x307289]);if(_0x368693[_0x0456('0x3a')]!==null){_0x543177=0x0;if(!isNaN(_0x368693['appliedDiscount']))_0x543177=_0x368693[_0x0456('0x3a')];else{_0x48639b=_0x307289[_0x0456('0x29')](_0x368693[_0x0456('0x3a')]);if(_0x48639b[_0x0456('0x8')])_0x543177=_0x368693[_0x0456('0x35')](_0x48639b);}_0x543177=parseFloat(_0x543177,0xa);if(isNaN(_0x543177))_0x543177=0x0;if(_0x543177!==0x0)_0x10a7ec=_0x10a7ec*0x64/(0x64-_0x543177);}if(_0x20b1d0)_0x198f3f=(_0x320790[_0x0456('0x3b')]||0x0)/0x64;else _0x198f3f=parseFloat((_0x307289[_0x0456('0x29')]('.qd_productOldPrice')[_0x0456('0x39')]()||'')[_0x0456('0x3')](/[^0-9\.\,]+/i,'')[_0x0456('0x3')]('.','')['replace'](',','.'),0xa);if(isNaN(_0x198f3f))_0x198f3f=0.001;_0x5f3d96=_0x10a7ec*((0x64-_0x47d2b3)/0x64);if(_0x20b1d0&&_0x368693[_0x0456('0x25')]['changeNativePrice']){_0x172200[_0x0456('0x12')](_0x172200[_0x0456('0x12')]()[_0x0456('0x2')]()['replace'](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x5f3d96,0x2,',','.')))[_0x0456('0x2a')](_0x0456('0x3c'));_0x307289[_0x0456('0x2a')](_0x0456('0x3d'));}else{_0xf9ae58=_0x307289[_0x0456('0x29')](_0x0456('0x3e'));_0xf9ae58[_0x0456('0x12')](_0xf9ae58['text']()[_0x0456('0x3')](/[0-9\.]+,[0-9]+/i,'')+qd_number_format(_0x5f3d96,0x2,',','.'));}if(_0x20b1d0){_0x1c68e6=_0x307289[_0x0456('0x29')](_0x368693['productPage'][_0x0456('0x3f')]);if(_0x1c68e6[_0x0456('0x8')])_0x1c68e6[_0x0456('0x12')](_0x1c68e6[_0x0456('0x12')]()[_0x0456('0x2')]()[_0x0456('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x5f3d96,0x2,',','.')));}var _0x3f21ec=_0x307289['find'](_0x0456('0x40'));_0x3f21ec['text'](_0x3f21ec[_0x0456('0x12')]()[_0x0456('0x3')](/[0-9]+\%/i,_0x47d2b3+'%'));var _0x2bebd0=function(_0x534daa,_0x38746e,_0x2a13c5){var _0x19e09e=_0x307289[_0x0456('0x29')](_0x534daa);if(_0x19e09e[_0x0456('0x8')])_0x19e09e[_0x0456('0x41')](_0x19e09e[_0x0456('0x41')]()['trim']()['replace'](/[0-9]{1,2}/,_0x2a13c5?_0x2a13c5:_0x320790[_0x0456('0x42')]||0x0));var _0x3616a7=_0x307289[_0x0456('0x29')](_0x38746e);if(_0x3616a7[_0x0456('0x8')])_0x3616a7['html'](_0x3616a7['html']()['trim']()['replace'](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x5f3d96/(_0x2a13c5?_0x2a13c5:_0x320790[_0x0456('0x42')]||0x1),0x2,',','.')));};if(_0x20b1d0&&_0x368693['productPage'][_0x0456('0x43')])_0x2bebd0(_0x368693[_0x0456('0x25')][_0x0456('0x42')],_0x368693[_0x0456('0x25')][_0x0456('0x44')]);else if(_0x368693['changeInstallments'])_0x2bebd0(_0x0456('0x45'),_0x0456('0x46'),parseInt(_0x307289[_0x0456('0x29')](_0x0456('0x47'))[_0x0456('0x39')]()||0x1)||0x1);_0x307289[_0x0456('0x29')]('.qd_saveAmount')[_0x0456('0x48')](qd_number_format(_0x198f3f-_0x5f3d96,0x2,',','.'));_0x307289[_0x0456('0x29')](_0x0456('0x49'))[_0x0456('0x4a')](qd_number_format((_0x198f3f-_0x5f3d96)*0x64/_0x198f3f,0x2,',','.'));if(_0x20b1d0&&_0x368693[_0x0456('0x25')][_0x0456('0x4b')]){_0x3849a6(_0x0456('0x4c'))[_0x0456('0x4d')](function(){_0x1753fb=_0x3849a6(this);_0x1753fb[_0x0456('0x12')](_0x1753fb[_0x0456('0x12')]()[_0x0456('0x2')]()[_0x0456('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x198f3f-_0x5f3d96,0x2,',','.')));_0x1753fb[_0x0456('0x2a')](_0x0456('0x3c'));});}};_0x208238(_0x2d3bef);if(_0x20b1d0)_0x3849a6(window)['on']('skuSelected.vtex',function(_0x5b2174,_0x57df45,_0x5681fd){_0x208238(_0x5681fd);});_0x307289[_0x0456('0x2a')](_0x0456('0x4e'));if(!_0x20b1d0)_0x11c716['addClass']('qd_sp_processedItem');};(_0x368693['startedByWrapper']?_0x7a3ea9[_0x0456('0x29')](_0x368693[_0x0456('0x4f')]):_0x7a3ea9)['each'](function(){_0x2c09bf[_0x0456('0x50')](this,![]);});if(typeof _0x368693[_0x0456('0x51')]==_0x0456('0x52')){var _0x2612a7=_0x368693[_0x0456('0x53')]?_0x7a3ea9:_0x7a3ea9['closest'](_0x368693[_0x0456('0x26')]);if(_0x368693[_0x0456('0x25')][_0x0456('0x28')])_0x2612a7=_0x2612a7[_0x0456('0x54')](_0x368693[_0x0456('0x25')][_0x0456('0x26')])['not'](_0x0456('0x55'));else _0x2612a7=_0x2612a7[_0x0456('0x29')](_0x0456('0x56'));_0x2612a7[_0x0456('0x4d')](function(){var _0x595dc5=_0x3849a6(_0x368693[_0x0456('0x51')]);_0x595dc5[_0x0456('0x2f')]('style',_0x0456('0x57'));if(_0x368693['productPage'][_0x0456('0x28')])_0x3849a6(this)[_0x0456('0x48')](_0x595dc5);else _0x3849a6(this)[_0x0456('0x58')](_0x595dc5);_0x2c09bf[_0x0456('0x50')](_0x595dc5,!![]);});}};_0x3849a6['fn'][_0x0456('0x1c')]=function(_0x1decde){var _0x529800=_0x3849a6(this);if(!_0x529800['length'])return _0x529800;var _0x559a63=_0x3849a6[_0x0456('0x59')](!![],{},_0x5a00e0,_0x1decde);if(typeof _0x559a63['productPage'][_0x0456('0x28')]!='boolean')_0x559a63[_0x0456('0x25')][_0x0456('0x28')]=_0x3849a6(document[_0x0456('0x5a')])['is'](_0x0456('0x5b'));_0x250863(_0x529800,_0x559a63);return _0x529800;};}(this));
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
var _0xf450=['qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','qd-am-','callback','QuatroDigital.am.callback','extend','exec','.qd_amazing_menu_auto','getParent','closest','function','QD_amazingMenu','/qd-amazing-menu','object','undefined','unshift','[QD\x20Amazing\x20Menu]\x0a','aviso','toLowerCase','info','join','error','apply','warn','qdAmAddNdx','each','addClass','qd-am-li-','first','last','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','charCodeAt','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','find','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-collection-wrapper','qdAjax','url','html','img[alt=\x27','data-qdam-value','.box-banner','clone','insertBefore','hide','qd-am-content-loaded','text','attr','trim','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','UL\x20do\x20menu\x20não\x20encontrada','alerta','li\x20>ul','qd-am-has-ul','children',':not(ul)','replaceSpecialChars','qd-amazing-menu','>li'];(function(_0x5f09c5,_0x2bfca0){var _0x426ad9=function(_0x18fe5f){while(--_0x18fe5f){_0x5f09c5['push'](_0x5f09c5['shift']());}};_0x426ad9(++_0x2bfca0);}(_0xf450,0x9d));var _0x0f45=function(_0x2dafbe,_0x5d04de){_0x2dafbe=_0x2dafbe-0x0;var _0x58a45a=_0xf450[_0x2dafbe];return _0x58a45a;};(function(_0x2783d8){_0x2783d8['fn'][_0x0f45('0x0')]=_0x2783d8['fn'][_0x0f45('0x1')];}(jQuery));(function(_0x1ea483){var _0x55fafa;var _0x170416=jQuery;if(_0x0f45('0x2')!==typeof _0x170416['fn'][_0x0f45('0x3')]){var _0x1aa494={'url':_0x0f45('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0x227324=function(_0x5d4b35,_0x80dca1){if(_0x0f45('0x5')===typeof console&&_0x0f45('0x6')!==typeof console['error']&&_0x0f45('0x6')!==typeof console['info']&&_0x0f45('0x6')!==typeof console['warn']){var _0x1bafb0;_0x0f45('0x5')===typeof _0x5d4b35?(_0x5d4b35[_0x0f45('0x7')](_0x0f45('0x8')),_0x1bafb0=_0x5d4b35):_0x1bafb0=[_0x0f45('0x8')+_0x5d4b35];if(_0x0f45('0x6')===typeof _0x80dca1||'alerta'!==_0x80dca1['toLowerCase']()&&_0x0f45('0x9')!==_0x80dca1[_0x0f45('0xa')]())if(_0x0f45('0x6')!==typeof _0x80dca1&&_0x0f45('0xb')===_0x80dca1[_0x0f45('0xa')]())try{console[_0x0f45('0xb')]['apply'](console,_0x1bafb0);}catch(_0x5f2c09){try{console[_0x0f45('0xb')](_0x1bafb0[_0x0f45('0xc')]('\x0a'));}catch(_0xa60cf8){}}else try{console[_0x0f45('0xd')][_0x0f45('0xe')](console,_0x1bafb0);}catch(_0x100b61){try{console[_0x0f45('0xd')](_0x1bafb0[_0x0f45('0xc')]('\x0a'));}catch(_0x286d3d){}}else try{console[_0x0f45('0xf')][_0x0f45('0xe')](console,_0x1bafb0);}catch(_0x579caa){try{console[_0x0f45('0xf')](_0x1bafb0[_0x0f45('0xc')]('\x0a'));}catch(_0x18dc3f){}}}};_0x170416['fn'][_0x0f45('0x10')]=function(){var _0x4d56e3=_0x170416(this);_0x4d56e3[_0x0f45('0x11')](function(_0x11eb64){_0x170416(this)[_0x0f45('0x12')](_0x0f45('0x13')+_0x11eb64);});_0x4d56e3[_0x0f45('0x14')]()[_0x0f45('0x12')]('qd-am-first');_0x4d56e3[_0x0f45('0x15')]()[_0x0f45('0x12')]('qd-am-last');return _0x4d56e3;};_0x170416['fn'][_0x0f45('0x3')]=function(){};_0x1ea483=function(_0x4561bf){var _0x1f1558={'t':_0x0f45('0x16')};return function(_0x1ae5e1){var _0x12a3e5=function(_0x9d5cf8){return _0x9d5cf8;};var _0x5b96bc=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x1ae5e1=_0x1ae5e1['d'+_0x5b96bc[0x10]+'c'+_0x5b96bc[0x11]+'m'+_0x12a3e5(_0x5b96bc[0x1])+'n'+_0x5b96bc[0xd]]['l'+_0x5b96bc[0x12]+'c'+_0x5b96bc[0x0]+'ti'+_0x12a3e5('o')+'n'];var _0x21446d=function(_0x2111c4){return escape(encodeURIComponent(_0x2111c4['replace'](/\./g,'¨')[_0x0f45('0x17')](/[a-zA-Z]/g,function(_0x3b1bd1){return String['fromCharCode'](('Z'>=_0x3b1bd1?0x5a:0x7a)>=(_0x3b1bd1=_0x3b1bd1[_0x0f45('0x18')](0x0)+0xd)?_0x3b1bd1:_0x3b1bd1-0x1a);})));};var _0x5180ee=_0x21446d(_0x1ae5e1[[_0x5b96bc[0x9],_0x12a3e5('o'),_0x5b96bc[0xc],_0x5b96bc[_0x12a3e5(0xd)]][_0x0f45('0xc')]('')]);_0x21446d=_0x21446d((window[['js',_0x12a3e5('no'),'m',_0x5b96bc[0x1],_0x5b96bc[0x4]['toUpperCase'](),'ite'][_0x0f45('0xc')]('')]||_0x0f45('0x19'))+['.v',_0x5b96bc[0xd],'e',_0x12a3e5('x'),'co',_0x12a3e5('mm'),_0x0f45('0x1a'),_0x5b96bc[0x1],'.c',_0x12a3e5('o'),'m.',_0x5b96bc[0x13],'r'][_0x0f45('0xc')](''));for(var _0x535600 in _0x1f1558){if(_0x21446d===_0x535600+_0x1f1558[_0x535600]||_0x5180ee===_0x535600+_0x1f1558[_0x535600]){var _0x27cfb2='tr'+_0x5b96bc[0x11]+'e';break;}_0x27cfb2='f'+_0x5b96bc[0x0]+'ls'+_0x12a3e5(_0x5b96bc[0x1])+'';}_0x12a3e5=!0x1;-0x1<_0x1ae5e1[[_0x5b96bc[0xc],'e',_0x5b96bc[0x0],'rc',_0x5b96bc[0x9]][_0x0f45('0xc')]('')][_0x0f45('0x1b')](_0x0f45('0x1c'))&&(_0x12a3e5=!0x0);return[_0x27cfb2,_0x12a3e5];}(_0x4561bf);}(window);if(!eval(_0x1ea483[0x0]))return _0x1ea483[0x1]?_0x227324('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x54631b=function(_0x1219f9){var _0x2544ff=_0x1219f9[_0x0f45('0x1d')](_0x0f45('0x1e'));var _0x4e69a1=_0x2544ff[_0x0f45('0x1f')](_0x0f45('0x20'));var _0x52cecf=_0x2544ff[_0x0f45('0x1f')](_0x0f45('0x21'));if(_0x4e69a1[_0x0f45('0x22')]||_0x52cecf[_0x0f45('0x22')])_0x4e69a1['parent']()['addClass']('qd-am-banner-wrapper'),_0x52cecf[_0x0f45('0x23')]()['addClass'](_0x0f45('0x24')),_0x170416[_0x0f45('0x25')]({'url':_0x55fafa[_0x0f45('0x26')],'dataType':_0x0f45('0x27'),'success':function(_0xfb8f47){var _0x2af283=_0x170416(_0xfb8f47);_0x4e69a1[_0x0f45('0x11')](function(){var _0xfb8f47=_0x170416(this);var _0x2339bb=_0x2af283[_0x0f45('0x1d')](_0x0f45('0x28')+_0xfb8f47['attr'](_0x0f45('0x29'))+'\x27]');_0x2339bb['length']&&(_0x2339bb['each'](function(){_0x170416(this)[_0x0f45('0x0')](_0x0f45('0x2a'))[_0x0f45('0x2b')]()[_0x0f45('0x2c')](_0xfb8f47);}),_0xfb8f47[_0x0f45('0x2d')]());})['addClass'](_0x0f45('0x2e'));_0x52cecf[_0x0f45('0x11')](function(){var _0xfb8f47={};var _0x21c853=_0x170416(this);_0x2af283[_0x0f45('0x1d')]('h2')[_0x0f45('0x11')](function(){if(_0x170416(this)[_0x0f45('0x2f')]()['trim']()[_0x0f45('0xa')]()==_0x21c853[_0x0f45('0x30')]('data-qdam-value')[_0x0f45('0x31')]()[_0x0f45('0xa')]())return _0xfb8f47=_0x170416(this),!0x1;});_0xfb8f47[_0x0f45('0x22')]&&(_0xfb8f47[_0x0f45('0x11')](function(){_0x170416(this)[_0x0f45('0x0')]('[class*=\x27colunas\x27]')[_0x0f45('0x2b')]()[_0x0f45('0x2c')](_0x21c853);}),_0x21c853['hide']());})[_0x0f45('0x12')](_0x0f45('0x2e'));},'error':function(){_0x227324(_0x0f45('0x32')+_0x55fafa[_0x0f45('0x26')]+_0x0f45('0x33'));},'complete':function(){_0x55fafa[_0x0f45('0x34')][_0x0f45('0x35')](this);_0x170416(window)[_0x0f45('0x36')](_0x0f45('0x37'),_0x1219f9);},'clearQueueDelay':0xbb8});};_0x170416[_0x0f45('0x3')]=function(_0x313249){var _0x3d8bee=_0x313249[_0x0f45('0x1d')]('ul[itemscope]')[_0x0f45('0x11')](function(){var _0xf158d5=_0x170416(this);if(!_0xf158d5['length'])return _0x227324([_0x0f45('0x38'),_0x313249],_0x0f45('0x39'));_0xf158d5[_0x0f45('0x1d')](_0x0f45('0x3a'))[_0x0f45('0x23')]()[_0x0f45('0x12')](_0x0f45('0x3b'));_0xf158d5[_0x0f45('0x1d')]('li')['each'](function(){var _0x1be638=_0x170416(this);var _0x4450cf=_0x1be638[_0x0f45('0x3c')](_0x0f45('0x3d'));_0x4450cf[_0x0f45('0x22')]&&_0x1be638[_0x0f45('0x12')]('qd-am-elem-'+_0x4450cf['first']()[_0x0f45('0x2f')]()[_0x0f45('0x31')]()[_0x0f45('0x3e')]()['replace'](/\./g,'')[_0x0f45('0x17')](/\s/g,'-')[_0x0f45('0xa')]());});var _0x418db7=_0xf158d5[_0x0f45('0x1d')]('>li')[_0x0f45('0x10')]();_0xf158d5[_0x0f45('0x12')](_0x0f45('0x3f'));_0x418db7=_0x418db7[_0x0f45('0x1d')]('>ul');_0x418db7[_0x0f45('0x11')](function(){var _0x3231f9=_0x170416(this);_0x3231f9[_0x0f45('0x1d')](_0x0f45('0x40'))['qdAmAddNdx']()[_0x0f45('0x12')]('qd-am-column');_0x3231f9[_0x0f45('0x12')](_0x0f45('0x41'));_0x3231f9[_0x0f45('0x23')]()[_0x0f45('0x12')]('qd-am-dropdown');});_0x418db7[_0x0f45('0x12')](_0x0f45('0x42'));var _0x5e5fc2=0x0,_0x1ea483=function(_0x210621){_0x5e5fc2+=0x1;_0x210621=_0x210621['children']('li')[_0x0f45('0x3c')]('*');_0x210621['length']&&(_0x210621['addClass'](_0x0f45('0x43')+_0x5e5fc2),_0x1ea483(_0x210621));};_0x1ea483(_0xf158d5);_0xf158d5['add'](_0xf158d5[_0x0f45('0x1d')]('ul'))['each'](function(){var _0x5c51cc=_0x170416(this);_0x5c51cc[_0x0f45('0x12')](_0x0f45('0x44')+_0x5c51cc['children']('li')[_0x0f45('0x22')]+'-li');});});_0x54631b(_0x3d8bee);_0x55fafa[_0x0f45('0x45')]['call'](this);_0x170416(window)[_0x0f45('0x36')](_0x0f45('0x46'),_0x313249);};_0x170416['fn'][_0x0f45('0x3')]=function(_0x41e124){var _0x32a047=_0x170416(this);if(!_0x32a047[_0x0f45('0x22')])return _0x32a047;_0x55fafa=_0x170416[_0x0f45('0x47')]({},_0x1aa494,_0x41e124);_0x32a047[_0x0f45('0x48')]=new _0x170416[(_0x0f45('0x3'))](_0x170416(this));return _0x32a047;};_0x170416(function(){_0x170416(_0x0f45('0x49'))[_0x0f45('0x3')]();});}}(this));

/* Quatro Digital Smart Cart */
var _0xc874=['.qd-bap-wrapper','remove','.qd-bap-item-added','input.qd-productId[value=','.qd-bap-qtt','.qd_bap_wrapper_content','qd-bap-item-added','QD_smartCart','dropDown','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','smartCart','closest','replace','abs','undefined','pow','toFixed','split','length','join','function','trim','prototype','capitalize','charAt','toUpperCase','slice','toLowerCase','qdAjax','qdAjaxQueue','jquery','error','extend','GET','data','stringify','toString','url','type','jqXHR','done','fail','complete','always','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','message','version','4.0','getParent','simpleCart','checkout','getOrderForm','call','QuatroDigital_simpleCart','ajaxStopOn','object','alerta','warn','[Simple\x20Cart]\x0a','info','add','QD_simpleCart','elements','.qd_cart_qtt','.qd_cart_total','meta[name=currency]','each','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','total','currencySymbol','shipping','allTotal','qtt','showQuantityByItems','items','callback','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','hide','filter','.singular','show','.plural','addClass','qd-emptyCart','removeClass','$this','cartTotalE','html','cartQttE','find','cartTotal','itemsTextE','itemsText','emptyElem','emptyCart','_QuatroDigital_DropDown','vtexjs','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','QD_checkoutQueue','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','trigger','simpleCartCallback.quatro_digital','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','.qd_cart_auto','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','Oooops!\x20','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Callbacks','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','.productInformationWrapper\x20\x20a.buy-button','input.buy-in-page-quantity','javascript:','.productQuickView','success','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','href','body','#produto,\x20.produto','isSmartCheckout','qd-bb-click-active','click.qd_bb_buy_sc','clickBuySmartCheckout','preventDefault','Método\x20descontinuado!','buyButton','.qd-sbb-on','qd-sbb-on','.btn-add-buy-button-asynchronous','qd-bb-active','children','.qd-bb-productAdded','append','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','[href=\x27','---','qd-bb-itemAddBuyButtonWrapper','qd-bb-itemAddCartWrapper','getCartInfoByUrl','função\x20descontinuada','allowUpdate','autoWatchBuyButton','unbind','click','bind','mouseenter.qd_bb_buy_sc','load','attr','indexOf','selectSkuMsg','?redirect=false&','execDefaultAction','redirect=false','queue','push','prodAdd','ku=','pop','shift','asyncCallback','productAddedToCart','cartProductAdded.vtex','fakeRequest','ajax','buyButtonClickCallback','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','QD_buyButton','prepend','QuatroDigital.qd_bb_prod_add','ajaxSend','match','ajaxStop','round','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','QD_dropDownCart','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','name','smartCheckout','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','.qd-ddc-shipping\x20input','val','keyup.qd_ddc_cep','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','cartIsEmpty','mouseleave.qd_ddc_hover','texts','#value','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','.qd-ddc-infoAllTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','.qd-ddc-prodPrice','sellingPrice','content','.qd-ddc-quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','lastSku','[data-sku=\x27','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','actionButtons','data-sku','data-sku-index','changeQantity','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','click.qd_ddc_remove','stop','slideUp','$1-$2$3','qdDdcLastPostalCode','calculateShipping','BRA','Não\x20foi\x20possível\x20calcular\x20o\x20frete','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','removeProduct','boolean','removeItems','Atenção,\x20este\x20método\x20esta\x20descontinuado.','animate','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','prodId','quantity'];(function(_0x2400f5,_0x276d6e){var _0x10f576=function(_0x512b3e){while(--_0x512b3e){_0x2400f5['push'](_0x2400f5['shift']());}};_0x10f576(++_0x276d6e);}(_0xc874,0x154));var _0x4c87=function(_0x5a7e3c,_0xdc9219){_0x5a7e3c=_0x5a7e3c-0x0;var _0x59252b=_0xc874[_0x5a7e3c];return _0x59252b;};(function(_0x319b1a){_0x319b1a['fn']['getParent']=_0x319b1a['fn'][_0x4c87('0x0')];}(jQuery));function qd_number_format(_0x271480,_0x505440,_0x5e6d61,_0xfc1b9f){_0x271480=(_0x271480+'')[_0x4c87('0x1')](/[^0-9+\-Ee.]/g,'');_0x271480=isFinite(+_0x271480)?+_0x271480:0x0;_0x505440=isFinite(+_0x505440)?Math[_0x4c87('0x2')](_0x505440):0x0;_0xfc1b9f='undefined'===typeof _0xfc1b9f?',':_0xfc1b9f;_0x5e6d61=_0x4c87('0x3')===typeof _0x5e6d61?'.':_0x5e6d61;var _0x46e0f5='',_0x46e0f5=function(_0x3dafe0,_0x30c939){var _0x505440=Math[_0x4c87('0x4')](0xa,_0x30c939);return''+(Math['round'](_0x3dafe0*_0x505440)/_0x505440)[_0x4c87('0x5')](_0x30c939);},_0x46e0f5=(_0x505440?_0x46e0f5(_0x271480,_0x505440):''+Math['round'](_0x271480))[_0x4c87('0x6')]('.');0x3<_0x46e0f5[0x0][_0x4c87('0x7')]&&(_0x46e0f5[0x0]=_0x46e0f5[0x0][_0x4c87('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0xfc1b9f));(_0x46e0f5[0x1]||'')[_0x4c87('0x7')]<_0x505440&&(_0x46e0f5[0x1]=_0x46e0f5[0x1]||'',_0x46e0f5[0x1]+=Array(_0x505440-_0x46e0f5[0x1][_0x4c87('0x7')]+0x1)['join']('0'));return _0x46e0f5[_0x4c87('0x8')](_0x5e6d61);};_0x4c87('0x9')!==typeof String['prototype'][_0x4c87('0xa')]&&(String[_0x4c87('0xb')][_0x4c87('0xa')]=function(){return this[_0x4c87('0x1')](/^\s+|\s+$/g,'');});_0x4c87('0x9')!=typeof String['prototype']['capitalize']&&(String['prototype'][_0x4c87('0xc')]=function(){return this[_0x4c87('0xd')](0x0)[_0x4c87('0xe')]()+this[_0x4c87('0xf')](0x1)[_0x4c87('0x10')]();});(function(_0x453274){if(_0x4c87('0x9')!==typeof _0x453274[_0x4c87('0x11')]){var _0x532a63={};_0x453274[_0x4c87('0x12')]=_0x532a63;0x96>parseInt((_0x453274['fn'][_0x4c87('0x13')]['replace'](/[^0-9]+/g,'')+'000')[_0x4c87('0xf')](0x0,0x3),0xa)&&console&&_0x4c87('0x9')==typeof console[_0x4c87('0x14')]&&console['error']();_0x453274[_0x4c87('0x11')]=function(_0x561441){try{var _0x9bc75f=_0x453274[_0x4c87('0x15')]({},{'url':'','type':_0x4c87('0x16'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x561441);var _0x22f775='object'===typeof _0x9bc75f[_0x4c87('0x17')]?JSON[_0x4c87('0x18')](_0x9bc75f[_0x4c87('0x17')]):_0x9bc75f[_0x4c87('0x17')][_0x4c87('0x19')]();var _0x22fac7=encodeURIComponent(_0x9bc75f[_0x4c87('0x1a')]+'|'+_0x9bc75f[_0x4c87('0x1b')]+'|'+_0x22f775);_0x532a63[_0x22fac7]=_0x532a63[_0x22fac7]||{};'undefined'==typeof _0x532a63[_0x22fac7][_0x4c87('0x1c')]?_0x532a63[_0x22fac7][_0x4c87('0x1c')]=_0x453274['ajax'](_0x9bc75f):(_0x532a63[_0x22fac7][_0x4c87('0x1c')][_0x4c87('0x1d')](_0x9bc75f['success']),_0x532a63[_0x22fac7][_0x4c87('0x1c')][_0x4c87('0x1e')](_0x9bc75f[_0x4c87('0x14')]),_0x532a63[_0x22fac7][_0x4c87('0x1c')]['always'](_0x9bc75f[_0x4c87('0x1f')]));_0x532a63[_0x22fac7][_0x4c87('0x1c')][_0x4c87('0x20')](function(){isNaN(parseInt(_0x9bc75f[_0x4c87('0x21')]))||setTimeout(function(){_0x532a63[_0x22fac7][_0x4c87('0x1c')]=void 0x0;},_0x9bc75f[_0x4c87('0x21')]);});return _0x532a63[_0x22fac7][_0x4c87('0x1c')];}catch(_0x1c82d6){'undefined'!==typeof console&&_0x4c87('0x9')===typeof console['error']&&console[_0x4c87('0x14')](_0x4c87('0x22')+_0x1c82d6[_0x4c87('0x23')]);}};_0x453274[_0x4c87('0x11')][_0x4c87('0x24')]=_0x4c87('0x25');}}(jQuery));(function(_0x5c264d){_0x5c264d['fn'][_0x4c87('0x26')]=_0x5c264d['fn'][_0x4c87('0x0')];}(jQuery));(function(){var _0x2e3549=jQuery;if(_0x4c87('0x9')!==typeof _0x2e3549['fn'][_0x4c87('0x27')]){_0x2e3549(function(){var _0x45f4cd=vtexjs[_0x4c87('0x28')][_0x4c87('0x29')];vtexjs[_0x4c87('0x28')][_0x4c87('0x29')]=function(){return _0x45f4cd[_0x4c87('0x2a')]();};});try{window[_0x4c87('0x2b')]=window[_0x4c87('0x2b')]||{};window[_0x4c87('0x2b')][_0x4c87('0x2c')]=!0x1;_0x2e3549['fn'][_0x4c87('0x27')]=function(_0x5c7b1c,_0xd4a2af,_0x588ce0){var _0x110b84=function(_0x57de17,_0x2c9fa1){if(_0x4c87('0x2d')===typeof console){var _0x380636=_0x4c87('0x2d')===typeof _0x57de17;'undefined'!==typeof _0x2c9fa1&&_0x4c87('0x2e')===_0x2c9fa1[_0x4c87('0x10')]()?_0x380636?console[_0x4c87('0x2f')](_0x4c87('0x30'),_0x57de17[0x0],_0x57de17[0x1],_0x57de17[0x2],_0x57de17[0x3],_0x57de17[0x4],_0x57de17[0x5],_0x57de17[0x6],_0x57de17[0x7]):console['warn'](_0x4c87('0x30')+_0x57de17):_0x4c87('0x3')!==typeof _0x2c9fa1&&_0x4c87('0x31')===_0x2c9fa1[_0x4c87('0x10')]()?_0x380636?console['info'](_0x4c87('0x30'),_0x57de17[0x0],_0x57de17[0x1],_0x57de17[0x2],_0x57de17[0x3],_0x57de17[0x4],_0x57de17[0x5],_0x57de17[0x6],_0x57de17[0x7]):console[_0x4c87('0x31')](_0x4c87('0x30')+_0x57de17):_0x380636?console[_0x4c87('0x14')]('[Simple\x20Cart]\x0a',_0x57de17[0x0],_0x57de17[0x1],_0x57de17[0x2],_0x57de17[0x3],_0x57de17[0x4],_0x57de17[0x5],_0x57de17[0x6],_0x57de17[0x7]):console['error'](_0x4c87('0x30')+_0x57de17);}};var _0x4d77b2=_0x2e3549(this);_0x4c87('0x2d')===typeof _0x5c7b1c?_0xd4a2af=_0x5c7b1c:(_0x5c7b1c=_0x5c7b1c||!0x1,_0x4d77b2=_0x4d77b2[_0x4c87('0x32')](_0x2e3549[_0x4c87('0x33')][_0x4c87('0x34')]));if(!_0x4d77b2[_0x4c87('0x7')])return _0x4d77b2;_0x2e3549['QD_simpleCart'][_0x4c87('0x34')]=_0x2e3549[_0x4c87('0x33')][_0x4c87('0x34')]['add'](_0x4d77b2);_0x588ce0='undefined'===typeof _0x588ce0?!0x1:_0x588ce0;var _0x39d4e8={'cartQtt':_0x4c87('0x35'),'cartTotal':_0x4c87('0x36'),'itemsText':'.qd_items_text','currencySymbol':(_0x2e3549(_0x4c87('0x37'))['attr']('content')||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x5bbd35=_0x2e3549[_0x4c87('0x15')]({},_0x39d4e8,_0xd4a2af);var _0x1ceedc=_0x2e3549('');_0x4d77b2[_0x4c87('0x38')](function(){var _0x5c1831=_0x2e3549(this);_0x5c1831[_0x4c87('0x17')](_0x4c87('0x39'))||_0x5c1831['data'](_0x4c87('0x39'),_0x5bbd35);});var _0x4d50e9=function(_0x56c938){window[_0x4c87('0x3a')]=window['_QuatroDigital_CartData']||{};for(var _0x5c7b1c=0x0,_0x343ef8=0x0,_0x4899f5=0x0;_0x4899f5<_0x56c938[_0x4c87('0x3b')][_0x4c87('0x7')];_0x4899f5++)'Shipping'==_0x56c938[_0x4c87('0x3b')][_0x4899f5]['id']&&(_0x343ef8+=_0x56c938['totalizers'][_0x4899f5]['value']),_0x5c7b1c+=_0x56c938[_0x4c87('0x3b')][_0x4899f5]['value'];window['_QuatroDigital_CartData'][_0x4c87('0x3c')]=_0x5bbd35[_0x4c87('0x3d')]+qd_number_format(_0x5c7b1c/0x64,0x2,',','.');window['_QuatroDigital_CartData'][_0x4c87('0x3e')]=_0x5bbd35[_0x4c87('0x3d')]+qd_number_format(_0x343ef8/0x64,0x2,',','.');window[_0x4c87('0x3a')][_0x4c87('0x3f')]=_0x5bbd35['currencySymbol']+qd_number_format((_0x5c7b1c+_0x343ef8)/0x64,0x2,',','.');window[_0x4c87('0x3a')][_0x4c87('0x40')]=0x0;if(_0x5bbd35[_0x4c87('0x41')])for(_0x4899f5=0x0;_0x4899f5<_0x56c938[_0x4c87('0x42')]['length'];_0x4899f5++)window[_0x4c87('0x3a')][_0x4c87('0x40')]+=_0x56c938[_0x4c87('0x42')][_0x4899f5]['quantity'];else window[_0x4c87('0x3a')][_0x4c87('0x40')]=_0x56c938[_0x4c87('0x42')][_0x4c87('0x7')]||0x0;try{window['_QuatroDigital_CartData'][_0x4c87('0x43')]&&window[_0x4c87('0x3a')][_0x4c87('0x43')]['fire']&&window['_QuatroDigital_CartData'][_0x4c87('0x43')][_0x4c87('0x44')]();}catch(_0x1696ad){_0x110b84(_0x4c87('0x45'));}_0x263c8b(_0x1ceedc);};var _0x52bac1=function(_0x5e18d0,_0x4ac45a){0x1===_0x5e18d0?_0x4ac45a[_0x4c87('0x46')]()[_0x4c87('0x47')](_0x4c87('0x48'))[_0x4c87('0x49')]():_0x4ac45a[_0x4c87('0x46')]()[_0x4c87('0x47')](_0x4c87('0x4a'))[_0x4c87('0x49')]();};var _0x13b463=function(_0x532c76){0x1>_0x532c76?_0x4d77b2[_0x4c87('0x4b')](_0x4c87('0x4c')):_0x4d77b2[_0x4c87('0x4d')](_0x4c87('0x4c'));};var _0x4a6be8=function(_0x42c0eb,_0x152e70){var _0x27d82e=parseInt(window['_QuatroDigital_CartData'][_0x4c87('0x40')],0xa);_0x152e70[_0x4c87('0x4e')][_0x4c87('0x49')]();isNaN(_0x27d82e)&&(_0x110b84('O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.',_0x4c87('0x2e')),_0x27d82e=0x0);_0x152e70[_0x4c87('0x4f')][_0x4c87('0x50')](window['_QuatroDigital_CartData']['total']);_0x152e70['cartQttE']['html'](_0x27d82e);_0x52bac1(_0x27d82e,_0x152e70['itemsTextE']);_0x13b463(_0x27d82e);};var _0x263c8b=function(_0x67dce1){_0x4d77b2['each'](function(){var _0x59545c={};var _0x1d1cbe=_0x2e3549(this);_0x5c7b1c&&_0x1d1cbe[_0x4c87('0x17')](_0x4c87('0x39'))&&_0x2e3549[_0x4c87('0x15')](_0x5bbd35,_0x1d1cbe[_0x4c87('0x17')](_0x4c87('0x39')));_0x59545c[_0x4c87('0x4e')]=_0x1d1cbe;_0x59545c[_0x4c87('0x51')]=_0x1d1cbe['find'](_0x5bbd35['cartQtt'])||_0x1ceedc;_0x59545c[_0x4c87('0x4f')]=_0x1d1cbe[_0x4c87('0x52')](_0x5bbd35[_0x4c87('0x53')])||_0x1ceedc;_0x59545c[_0x4c87('0x54')]=_0x1d1cbe[_0x4c87('0x52')](_0x5bbd35[_0x4c87('0x55')])||_0x1ceedc;_0x59545c[_0x4c87('0x56')]=_0x1d1cbe[_0x4c87('0x52')](_0x5bbd35[_0x4c87('0x57')])||_0x1ceedc;_0x4a6be8(_0x67dce1,_0x59545c);_0x1d1cbe[_0x4c87('0x4b')]('qd-sc-populated');});};(function(){if(_0x5bbd35['smartCheckout']){window[_0x4c87('0x58')]=window['_QuatroDigital_DropDown']||{};if(_0x4c87('0x3')!==typeof window[_0x4c87('0x58')][_0x4c87('0x29')]&&(_0x588ce0||!_0x5c7b1c))return _0x4d50e9(window['_QuatroDigital_DropDown'][_0x4c87('0x29')]);if(_0x4c87('0x2d')!==typeof window[_0x4c87('0x59')]||_0x4c87('0x3')===typeof window[_0x4c87('0x59')][_0x4c87('0x28')])if(_0x4c87('0x2d')===typeof vtex&&'object'===typeof vtex['checkout']&&_0x4c87('0x3')!==typeof vtex[_0x4c87('0x28')][_0x4c87('0x5a')])new vtex[(_0x4c87('0x28'))][(_0x4c87('0x5a'))]();else return _0x110b84(_0x4c87('0x5b'));_0x2e3549[_0x4c87('0x5c')]([_0x4c87('0x42'),_0x4c87('0x3b'),_0x4c87('0x5d')],{'done':function(_0x3a1c10){_0x4d50e9(_0x3a1c10);window[_0x4c87('0x58')][_0x4c87('0x29')]=_0x3a1c10;},'fail':function(_0x5bf919){_0x110b84([_0x4c87('0x5e'),_0x5bf919]);}});}else alert(_0x4c87('0x5f'));}());_0x5bbd35[_0x4c87('0x43')]();_0x2e3549(window)[_0x4c87('0x60')](_0x4c87('0x61'));return _0x4d77b2;};_0x2e3549[_0x4c87('0x33')]={'elements':_0x2e3549('')};_0x2e3549(function(){var _0x1e27a8;'function'===typeof window['ajaxRequestbuyButtonAsynchronous']&&(_0x1e27a8=window[_0x4c87('0x62')],window['ajaxRequestbuyButtonAsynchronous']=function(_0x53e6ba,_0x5122f8,_0x19f4d3,_0x43a2b4,_0x20c0b6){_0x1e27a8[_0x4c87('0x2a')](this,_0x53e6ba,_0x5122f8,_0x19f4d3,_0x43a2b4,function(){_0x4c87('0x9')===typeof _0x20c0b6&&_0x20c0b6();_0x2e3549['QD_simpleCart']['elements'][_0x4c87('0x38')](function(){var _0x5e99cc=_0x2e3549(this);_0x5e99cc['simpleCart'](_0x5e99cc['data'](_0x4c87('0x39')));});});});});var _0x3e0439=window[_0x4c87('0x63')]||void 0x0;window[_0x4c87('0x63')]=function(_0x44a2c7){_0x2e3549['fn']['simpleCart'](!0x0);'function'===typeof _0x3e0439?_0x3e0439[_0x4c87('0x2a')](this,_0x44a2c7):alert(_0x44a2c7);};_0x2e3549(function(){var _0x4371a1=_0x2e3549(_0x4c87('0x64'));_0x4371a1[_0x4c87('0x7')]&&_0x4371a1['simpleCart']();});_0x2e3549(function(){_0x2e3549(window)['bind'](_0x4c87('0x65'),function(){_0x2e3549['fn']['simpleCart'](!0x0);});});}catch(_0x30773f){_0x4c87('0x3')!==typeof console&&'function'===typeof console[_0x4c87('0x14')]&&console['error'](_0x4c87('0x66'),_0x30773f);}}}());(function(){var _0x38dfad=function(_0xd7f5fb,_0x3cd78f){if(_0x4c87('0x2d')===typeof console){var _0x2e9676=_0x4c87('0x2d')===typeof _0xd7f5fb;'undefined'!==typeof _0x3cd78f&&'alerta'===_0x3cd78f[_0x4c87('0x10')]()?_0x2e9676?console[_0x4c87('0x2f')](_0x4c87('0x67'),_0xd7f5fb[0x0],_0xd7f5fb[0x1],_0xd7f5fb[0x2],_0xd7f5fb[0x3],_0xd7f5fb[0x4],_0xd7f5fb[0x5],_0xd7f5fb[0x6],_0xd7f5fb[0x7]):console['warn'](_0x4c87('0x67')+_0xd7f5fb):_0x4c87('0x3')!==typeof _0x3cd78f&&_0x4c87('0x31')===_0x3cd78f['toLowerCase']()?_0x2e9676?console[_0x4c87('0x31')](_0x4c87('0x67'),_0xd7f5fb[0x0],_0xd7f5fb[0x1],_0xd7f5fb[0x2],_0xd7f5fb[0x3],_0xd7f5fb[0x4],_0xd7f5fb[0x5],_0xd7f5fb[0x6],_0xd7f5fb[0x7]):console[_0x4c87('0x31')](_0x4c87('0x67')+_0xd7f5fb):_0x2e9676?console[_0x4c87('0x14')](_0x4c87('0x67'),_0xd7f5fb[0x0],_0xd7f5fb[0x1],_0xd7f5fb[0x2],_0xd7f5fb[0x3],_0xd7f5fb[0x4],_0xd7f5fb[0x5],_0xd7f5fb[0x6],_0xd7f5fb[0x7]):console[_0x4c87('0x14')](_0x4c87('0x67')+_0xd7f5fb);}},_0x55200d=null,_0xd09637={},_0x4fa9ff={},_0x44a493={};$[_0x4c87('0x5c')]=function(_0x25724e,_0x4a793e){if(null===_0x55200d)if('object'===typeof window[_0x4c87('0x59')]&&_0x4c87('0x3')!==typeof window[_0x4c87('0x59')]['checkout'])_0x55200d=window[_0x4c87('0x59')][_0x4c87('0x28')];else return _0x38dfad('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js');var _0x20ffa3=$[_0x4c87('0x15')]({'done':function(){},'fail':function(){}},_0x4a793e),_0x5a220c=_0x25724e[_0x4c87('0x8')](';'),_0x10fc16=function(){_0xd09637[_0x5a220c][_0x4c87('0x32')](_0x20ffa3[_0x4c87('0x1d')]);_0x4fa9ff[_0x5a220c][_0x4c87('0x32')](_0x20ffa3['fail']);};_0x44a493[_0x5a220c]?_0x10fc16():(_0xd09637[_0x5a220c]=$[_0x4c87('0x68')](),_0x4fa9ff[_0x5a220c]=$['Callbacks'](),_0x10fc16(),_0x44a493[_0x5a220c]=!0x0,_0x55200d[_0x4c87('0x29')](_0x25724e)[_0x4c87('0x1d')](function(_0x3e8e70){_0x44a493[_0x5a220c]=!0x1;_0xd09637[_0x5a220c][_0x4c87('0x44')](_0x3e8e70);})[_0x4c87('0x1e')](function(_0x1c7aec){_0x44a493[_0x5a220c]=!0x1;_0x4fa9ff[_0x5a220c]['fire'](_0x1c7aec);}));};}());(function(_0x456531){try{var _0x5a7d63=jQuery,_0x10d3ba,_0x35c64b=_0x5a7d63({}),_0xa214a=function(_0x48d463,_0x513173){if(_0x4c87('0x2d')===typeof console&&_0x4c87('0x3')!==typeof console[_0x4c87('0x14')]&&'undefined'!==typeof console[_0x4c87('0x31')]&&_0x4c87('0x3')!==typeof console[_0x4c87('0x2f')]){var _0x4a9ba3;_0x4c87('0x2d')===typeof _0x48d463?(_0x48d463[_0x4c87('0x69')](_0x4c87('0x6a')),_0x4a9ba3=_0x48d463):_0x4a9ba3=['[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a'+_0x48d463];if(_0x4c87('0x3')===typeof _0x513173||_0x4c87('0x2e')!==_0x513173[_0x4c87('0x10')]()&&_0x4c87('0x6b')!==_0x513173['toLowerCase']())if('undefined'!==typeof _0x513173&&_0x4c87('0x31')===_0x513173[_0x4c87('0x10')]())try{console[_0x4c87('0x31')][_0x4c87('0x6c')](console,_0x4a9ba3);}catch(_0x3fbae3){try{console[_0x4c87('0x31')](_0x4a9ba3['join']('\x0a'));}catch(_0x1a09ca){}}else try{console[_0x4c87('0x14')][_0x4c87('0x6c')](console,_0x4a9ba3);}catch(_0x49ffc2){try{console[_0x4c87('0x14')](_0x4a9ba3[_0x4c87('0x8')]('\x0a'));}catch(_0x220c5d){}}else try{console[_0x4c87('0x2f')][_0x4c87('0x6c')](console,_0x4a9ba3);}catch(_0x216bfd){try{console[_0x4c87('0x2f')](_0x4a9ba3[_0x4c87('0x8')]('\x0a'));}catch(_0x3c42b7){}}}},_0x1f26ca={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0x4c87('0x6d'),'buyQtt':_0x4c87('0x6e'),'selectSkuMsg':_0x4c87('0x6f'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x3a37e8,_0x5a859f,_0x286ea3){_0x5a7d63('body')['is'](_0x4c87('0x70'))&&(_0x4c87('0x71')===_0x5a859f?alert('Produto\x20adicionado\x20ao\x20carrinho!'):(alert(_0x4c87('0x72')),(_0x4c87('0x2d')===typeof parent?parent:document)['location'][_0x4c87('0x73')]=_0x286ea3));},'isProductPage':function(){return _0x5a7d63(_0x4c87('0x74'))['is'](_0x4c87('0x75'));},'execDefaultAction':function(_0x54561d){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x5a7d63['QD_buyButton']=function(_0x2a23f7,_0x3c01fc){function _0x2e32db(_0x505668){_0x10d3ba[_0x4c87('0x76')]?_0x505668['data'](_0x4c87('0x77'))||(_0x505668[_0x4c87('0x17')](_0x4c87('0x77'),0x1),_0x505668['on'](_0x4c87('0x78'),function(_0x535037){if(!_0x10d3ba['allowBuyClick']())return!0x0;if(!0x0!==_0x3327d0[_0x4c87('0x79')][_0x4c87('0x2a')](this))return _0x535037[_0x4c87('0x7a')](),!0x1;})):alert(_0x4c87('0x7b'));}function _0x5790cd(_0xb22cfa){_0xb22cfa=_0xb22cfa||_0x5a7d63(_0x10d3ba[_0x4c87('0x7c')]);_0xb22cfa[_0x4c87('0x38')](function(){var _0xb22cfa=_0x5a7d63(this);_0xb22cfa['is'](_0x4c87('0x7d'))||(_0xb22cfa[_0x4c87('0x4b')](_0x4c87('0x7e')),_0xb22cfa['is'](_0x4c87('0x7f'))&&!_0xb22cfa['is']('.remove-href')||_0xb22cfa[_0x4c87('0x17')](_0x4c87('0x80'))||(_0xb22cfa[_0x4c87('0x17')](_0x4c87('0x80'),0x1),_0xb22cfa[_0x4c87('0x81')](_0x4c87('0x82'))[_0x4c87('0x7')]||_0xb22cfa[_0x4c87('0x83')](_0x4c87('0x84')),_0xb22cfa['is']('.buy-in-page-button')&&_0x10d3ba[_0x4c87('0x85')]()&&_0x434bde['call'](_0xb22cfa),_0x2e32db(_0xb22cfa)));});_0x10d3ba[_0x4c87('0x85')]()&&!_0xb22cfa[_0x4c87('0x7')]&&_0xa214a(_0x4c87('0x86')+_0xb22cfa[_0x4c87('0x87')]+'\x27.',_0x4c87('0x31'));}var _0x1391ef=_0x5a7d63(_0x2a23f7);var _0x3327d0=this;window['_Quatro_Digital_dropDown']=window[_0x4c87('0x88')]||{};window[_0x4c87('0x3a')]=window[_0x4c87('0x3a')]||{};_0x3327d0['prodAdd']=function(_0x333095,_0x9ef94e){_0x1391ef['addClass'](_0x4c87('0x89'));_0x5a7d63(_0x4c87('0x74'))[_0x4c87('0x4b')](_0x4c87('0x8a'));var _0x398f03=_0x5a7d63(_0x10d3ba[_0x4c87('0x7c')])[_0x4c87('0x47')](_0x4c87('0x8b')+(_0x333095['attr'](_0x4c87('0x73'))||_0x4c87('0x8c'))+'\x27]')['add'](_0x333095);_0x398f03[_0x4c87('0x4b')](_0x4c87('0x8d'));setTimeout(function(){_0x1391ef[_0x4c87('0x4d')](_0x4c87('0x8e'));_0x398f03['removeClass'](_0x4c87('0x8d'));},_0x10d3ba['timeRemoveNewItemClass']);window['_Quatro_Digital_dropDown'][_0x4c87('0x29')]=void 0x0;if(_0x4c87('0x3')!==typeof _0x3c01fc&&'function'===typeof _0x3c01fc[_0x4c87('0x8f')])return _0x10d3ba[_0x4c87('0x76')]||(_0xa214a(_0x4c87('0x90')),_0x3c01fc[_0x4c87('0x8f')]()),window[_0x4c87('0x58')][_0x4c87('0x29')]=void 0x0,_0x3c01fc[_0x4c87('0x8f')](function(_0x18ce19){window[_0x4c87('0x88')][_0x4c87('0x29')]=_0x18ce19;_0x5a7d63['fn'][_0x4c87('0x27')](!0x0,void 0x0,!0x0);},{'lastSku':_0x9ef94e});window['_Quatro_Digital_dropDown'][_0x4c87('0x91')]=!0x0;_0x5a7d63['fn'][_0x4c87('0x27')](!0x0);};(function(){if(_0x10d3ba[_0x4c87('0x76')]&&_0x10d3ba[_0x4c87('0x92')]){var _0xbebe71=_0x5a7d63(_0x4c87('0x7f'));_0xbebe71[_0x4c87('0x7')]&&_0x5790cd(_0xbebe71);}}());var _0x434bde=function(){var _0x96453d=_0x5a7d63(this);_0x4c87('0x3')!==typeof _0x96453d[_0x4c87('0x17')](_0x4c87('0x7c'))?(_0x96453d[_0x4c87('0x93')](_0x4c87('0x94')),_0x2e32db(_0x96453d)):(_0x96453d[_0x4c87('0x95')](_0x4c87('0x96'),function(_0x3bd6f2){_0x96453d[_0x4c87('0x93')](_0x4c87('0x94'));_0x2e32db(_0x96453d);_0x5a7d63(this)[_0x4c87('0x93')](_0x3bd6f2);}),_0x5a7d63(window)[_0x4c87('0x97')](function(){_0x96453d['unbind'](_0x4c87('0x94'));_0x2e32db(_0x96453d);_0x96453d[_0x4c87('0x93')](_0x4c87('0x96'));}));};_0x3327d0['clickBuySmartCheckout']=function(){var _0x25f347=_0x5a7d63(this),_0x2a23f7=_0x25f347[_0x4c87('0x98')](_0x4c87('0x73'))||'';if(-0x1<_0x2a23f7[_0x4c87('0x99')](_0x10d3ba[_0x4c87('0x9a')]))return!0x0;_0x2a23f7=_0x2a23f7[_0x4c87('0x1')](/redirect\=(false|true)/gi,'')['replace']('?',_0x4c87('0x9b'))['replace'](/\&\&/gi,'&');if(_0x10d3ba[_0x4c87('0x9c')](_0x25f347))return _0x25f347[_0x4c87('0x98')](_0x4c87('0x73'),_0x2a23f7['replace'](_0x4c87('0x9d'),'redirect=true')),!0x0;_0x2a23f7=_0x2a23f7[_0x4c87('0x1')](/http.?:/i,'');_0x35c64b[_0x4c87('0x9e')](function(_0x1ea437){if(!_0x10d3ba['buyIfQuantityZeroed']&&!/(&|\?)qty\=[1-9][0-9]*/gi['test'](_0x2a23f7))return _0x1ea437();var _0x1a66cf=function(_0x4e46ef,_0x320dd2){var _0x5790cd=_0x2a23f7['match'](/sku\=([0-9]+)/gi),_0x38f946=[];if(_0x4c87('0x2d')===typeof _0x5790cd&&null!==_0x5790cd)for(var _0x394ea4=_0x5790cd['length']-0x1;0x0<=_0x394ea4;_0x394ea4--){var _0x5ccad1=parseInt(_0x5790cd[_0x394ea4][_0x4c87('0x1')](/sku\=/gi,''));isNaN(_0x5ccad1)||_0x38f946[_0x4c87('0x9f')](_0x5ccad1);}_0x10d3ba['productPageCallback'][_0x4c87('0x2a')](this,_0x4e46ef,_0x320dd2,_0x2a23f7);_0x3327d0['buyButtonClickCallback'][_0x4c87('0x2a')](this,_0x4e46ef,_0x320dd2,_0x2a23f7,_0x38f946);_0x3327d0[_0x4c87('0xa0')](_0x25f347,_0x2a23f7[_0x4c87('0x6')](_0x4c87('0xa1'))[_0x4c87('0xa2')]()[_0x4c87('0x6')]('&')[_0x4c87('0xa3')]());_0x4c87('0x9')===typeof _0x10d3ba[_0x4c87('0xa4')]&&_0x10d3ba[_0x4c87('0xa4')][_0x4c87('0x2a')](this);_0x5a7d63(window)['trigger'](_0x4c87('0xa5'));_0x5a7d63(window)['trigger'](_0x4c87('0xa6'));};_0x10d3ba[_0x4c87('0xa7')]?(_0x1a66cf(null,_0x4c87('0x71')),_0x1ea437()):_0x5a7d63[_0x4c87('0xa8')]({'url':_0x2a23f7,'complete':_0x1a66cf})['always'](function(){_0x1ea437();});});};_0x3327d0[_0x4c87('0xa9')]=function(_0x4a1450,_0x4e31fc,_0x42b84e,_0x2253f4){try{_0x4c87('0x71')===_0x4e31fc&&_0x4c87('0x2d')===typeof window[_0x4c87('0xaa')]&&'function'===typeof window[_0x4c87('0xaa')][_0x4c87('0xab')]&&window[_0x4c87('0xaa')]['_QuatroDigital_prodBuyCallback'](_0x4a1450,_0x4e31fc,_0x42b84e,_0x2253f4);}catch(_0x18fd52){_0xa214a(_0x4c87('0xac'));}};_0x5790cd();'function'===typeof _0x10d3ba[_0x4c87('0x43')]?_0x10d3ba[_0x4c87('0x43')]['call'](this):_0xa214a('Callback\x20não\x20é\x20uma\x20função');};var _0x34d5aa=_0x5a7d63['Callbacks']();_0x5a7d63['fn'][_0x4c87('0xad')]=function(_0x1f047a,_0x2f3af5){var _0x456531=_0x5a7d63(this);'undefined'!==typeof _0x2f3af5||_0x4c87('0x2d')!==typeof _0x1f047a||_0x1f047a instanceof _0x5a7d63||(_0x2f3af5=_0x1f047a,_0x1f047a=void 0x0);_0x10d3ba=_0x5a7d63[_0x4c87('0x15')]({},_0x1f26ca,_0x2f3af5);var _0x1edb6d;_0x34d5aa[_0x4c87('0x32')](function(){_0x456531[_0x4c87('0x81')]('.qd-bb-itemAddWrapper')[_0x4c87('0x7')]||_0x456531[_0x4c87('0xae')]('<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>');_0x1edb6d=new _0x5a7d63[(_0x4c87('0xad'))](_0x456531,_0x1f047a);});_0x34d5aa[_0x4c87('0x44')]();_0x5a7d63(window)['on'](_0x4c87('0xaf'),function(_0x11e891,_0x3bd6d1,_0x98f9d9){_0x1edb6d[_0x4c87('0xa0')](_0x3bd6d1,_0x98f9d9);});return _0x5a7d63[_0x4c87('0x15')](_0x456531,_0x1edb6d);};var _0x6e3f1=0x0;_0x5a7d63(document)[_0x4c87('0xb0')](function(_0x44d425,_0x21feb6,_0x4fefd5){-0x1<_0x4fefd5['url']['toLowerCase']()[_0x4c87('0x99')]('/checkout/cart/add')&&(_0x6e3f1=(_0x4fefd5[_0x4c87('0x1a')][_0x4c87('0xb1')](/sku\=([0-9]+)/i)||[''])[_0x4c87('0xa2')]());});_0x5a7d63(window)[_0x4c87('0x95')]('productAddedToCart.qdSbbVtex',function(){_0x5a7d63(window)['trigger'](_0x4c87('0xaf'),[new _0x5a7d63(),_0x6e3f1]);});_0x5a7d63(document)[_0x4c87('0xb2')](function(){_0x34d5aa[_0x4c87('0x44')]();});}catch(_0x56c52f){'undefined'!==typeof console&&_0x4c87('0x9')===typeof console[_0x4c87('0x14')]&&console[_0x4c87('0x14')](_0x4c87('0x66'),_0x56c52f);}}(this));function qd_number_format(_0x5650d1,_0x42f18c,_0x4d44f4,_0x4d0ca8){_0x5650d1=(_0x5650d1+'')[_0x4c87('0x1')](/[^0-9+\-Ee.]/g,'');_0x5650d1=isFinite(+_0x5650d1)?+_0x5650d1:0x0;_0x42f18c=isFinite(+_0x42f18c)?Math[_0x4c87('0x2')](_0x42f18c):0x0;_0x4d0ca8='undefined'===typeof _0x4d0ca8?',':_0x4d0ca8;_0x4d44f4=_0x4c87('0x3')===typeof _0x4d44f4?'.':_0x4d44f4;var _0x18d50a='',_0x18d50a=function(_0x51e7cb,_0x40d669){var _0x59691b=Math[_0x4c87('0x4')](0xa,_0x40d669);return''+(Math['round'](_0x51e7cb*_0x59691b)/_0x59691b)[_0x4c87('0x5')](_0x40d669);},_0x18d50a=(_0x42f18c?_0x18d50a(_0x5650d1,_0x42f18c):''+Math[_0x4c87('0xb3')](_0x5650d1))[_0x4c87('0x6')]('.');0x3<_0x18d50a[0x0][_0x4c87('0x7')]&&(_0x18d50a[0x0]=_0x18d50a[0x0][_0x4c87('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x4d0ca8));(_0x18d50a[0x1]||'')[_0x4c87('0x7')]<_0x42f18c&&(_0x18d50a[0x1]=_0x18d50a[0x1]||'',_0x18d50a[0x1]+=Array(_0x42f18c-_0x18d50a[0x1][_0x4c87('0x7')]+0x1)[_0x4c87('0x8')]('0'));return _0x18d50a[_0x4c87('0x8')](_0x4d44f4);}(function(){try{window[_0x4c87('0x3a')]=window[_0x4c87('0x3a')]||{},window['_QuatroDigital_CartData']['callback']=window[_0x4c87('0x3a')][_0x4c87('0x43')]||$[_0x4c87('0x68')]();}catch(_0x2568a3){_0x4c87('0x3')!==typeof console&&_0x4c87('0x9')===typeof console['error']&&console[_0x4c87('0x14')](_0x4c87('0x66'),_0x2568a3[_0x4c87('0x23')]);}}());(function(_0x398f33){try{var _0x1cc01d=jQuery,_0x38527f=function(_0x427977,_0xc6783d){if('object'===typeof console&&_0x4c87('0x3')!==typeof console[_0x4c87('0x14')]&&_0x4c87('0x3')!==typeof console[_0x4c87('0x31')]&&_0x4c87('0x3')!==typeof console['warn']){var _0x3f0d65;'object'===typeof _0x427977?(_0x427977[_0x4c87('0x69')](_0x4c87('0xb4')),_0x3f0d65=_0x427977):_0x3f0d65=[_0x4c87('0xb4')+_0x427977];if(_0x4c87('0x3')===typeof _0xc6783d||_0x4c87('0x2e')!==_0xc6783d[_0x4c87('0x10')]()&&_0x4c87('0x6b')!==_0xc6783d[_0x4c87('0x10')]())if('undefined'!==typeof _0xc6783d&&'info'===_0xc6783d[_0x4c87('0x10')]())try{console[_0x4c87('0x31')][_0x4c87('0x6c')](console,_0x3f0d65);}catch(_0x4ab9f0){try{console[_0x4c87('0x31')](_0x3f0d65[_0x4c87('0x8')]('\x0a'));}catch(_0x1aac67){}}else try{console['error']['apply'](console,_0x3f0d65);}catch(_0x433cc5){try{console[_0x4c87('0x14')](_0x3f0d65[_0x4c87('0x8')]('\x0a'));}catch(_0x2b91d7){}}else try{console[_0x4c87('0x2f')][_0x4c87('0x6c')](console,_0x3f0d65);}catch(_0x2793de){try{console[_0x4c87('0x2f')](_0x3f0d65[_0x4c87('0x8')]('\x0a'));}catch(_0x1cee43){}}}};window[_0x4c87('0x58')]=window[_0x4c87('0x58')]||{};window[_0x4c87('0x58')][_0x4c87('0x91')]=!0x0;_0x1cc01d[_0x4c87('0xb5')]=function(){};_0x1cc01d['fn']['QD_dropDownCart']=function(){return{'fn':new _0x1cc01d()};};var _0x5b1514=function(_0x41dc98){var _0x204f22={'t':_0x4c87('0xb6')};return function(_0x180978){var _0x2c89d7=function(_0x55ba7d){return _0x55ba7d;};var _0x4b0ee7=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x180978=_0x180978['d'+_0x4b0ee7[0x10]+'c'+_0x4b0ee7[0x11]+'m'+_0x2c89d7(_0x4b0ee7[0x1])+'n'+_0x4b0ee7[0xd]]['l'+_0x4b0ee7[0x12]+'c'+_0x4b0ee7[0x0]+'ti'+_0x2c89d7('o')+'n'];var _0x215b6a=function(_0x309763){return escape(encodeURIComponent(_0x309763[_0x4c87('0x1')](/\./g,'¨')[_0x4c87('0x1')](/[a-zA-Z]/g,function(_0x5ab5ba){return String[_0x4c87('0xb7')](('Z'>=_0x5ab5ba?0x5a:0x7a)>=(_0x5ab5ba=_0x5ab5ba['charCodeAt'](0x0)+0xd)?_0x5ab5ba:_0x5ab5ba-0x1a);})));};var _0x398f33=_0x215b6a(_0x180978[[_0x4b0ee7[0x9],_0x2c89d7('o'),_0x4b0ee7[0xc],_0x4b0ee7[_0x2c89d7(0xd)]]['join']('')]);_0x215b6a=_0x215b6a((window[['js',_0x2c89d7('no'),'m',_0x4b0ee7[0x1],_0x4b0ee7[0x4][_0x4c87('0xe')](),'ite']['join']('')]||_0x4c87('0x8c'))+['.v',_0x4b0ee7[0xd],'e',_0x2c89d7('x'),'co',_0x2c89d7('mm'),'erc',_0x4b0ee7[0x1],'.c',_0x2c89d7('o'),'m.',_0x4b0ee7[0x13],'r'][_0x4c87('0x8')](''));for(var _0x49b7c5 in _0x204f22){if(_0x215b6a===_0x49b7c5+_0x204f22[_0x49b7c5]||_0x398f33===_0x49b7c5+_0x204f22[_0x49b7c5]){var _0x2cec4c='tr'+_0x4b0ee7[0x11]+'e';break;}_0x2cec4c='f'+_0x4b0ee7[0x0]+'ls'+_0x2c89d7(_0x4b0ee7[0x1])+'';}_0x2c89d7=!0x1;-0x1<_0x180978[[_0x4b0ee7[0xc],'e',_0x4b0ee7[0x0],'rc',_0x4b0ee7[0x9]][_0x4c87('0x8')]('')]['indexOf']('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x2c89d7=!0x0);return[_0x2cec4c,_0x2c89d7];}(_0x41dc98);}(window);if(!eval(_0x5b1514[0x0]))return _0x5b1514[0x1]?_0x38527f('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x1cc01d[_0x4c87('0xb5')]=function(_0x14885a,_0x42bd02){var _0x1fbdfc=_0x1cc01d(_0x14885a);if(!_0x1fbdfc[_0x4c87('0x7')])return _0x1fbdfc;var _0x243b54=_0x1cc01d['extend'](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x4c87('0xb8'),'linkCheckout':_0x4c87('0xb9'),'cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':'Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','continueShopping':'Continuar\x20Comprando','shippingForm':_0x4c87('0xba')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x5d60f8){return _0x5d60f8[_0x4c87('0xbb')]||_0x5d60f8[_0x4c87('0xbc')];},'callback':function(){},'callbackProductsList':function(){}},_0x42bd02);_0x1cc01d('');var _0x10c511=this;if(_0x243b54[_0x4c87('0xbd')]){var _0x981201=!0x1;_0x4c87('0x3')===typeof window[_0x4c87('0x59')]&&(_0x38527f(_0x4c87('0xbe')),_0x1cc01d[_0x4c87('0xa8')]({'url':_0x4c87('0xbf'),'async':!0x1,'dataType':_0x4c87('0xc0'),'error':function(){_0x38527f(_0x4c87('0xc1'));_0x981201=!0x0;}}));if(_0x981201)return _0x38527f('A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!');}if(_0x4c87('0x2d')===typeof window[_0x4c87('0x59')]&&_0x4c87('0x3')!==typeof window['vtexjs'][_0x4c87('0x28')])var _0x5ad965=window['vtexjs']['checkout'];else if('object'===typeof vtex&&_0x4c87('0x2d')===typeof vtex[_0x4c87('0x28')]&&'undefined'!==typeof vtex['checkout'][_0x4c87('0x5a')])_0x5ad965=new vtex[(_0x4c87('0x28'))][(_0x4c87('0x5a'))]();else return _0x38527f(_0x4c87('0x5b'));_0x10c511[_0x4c87('0xc2')]=_0x4c87('0xc3');var _0x3683d8=function(_0x4b3c18){_0x1cc01d(this)[_0x4c87('0x83')](_0x4b3c18);_0x4b3c18['find'](_0x4c87('0xc4'))['add'](_0x1cc01d(_0x4c87('0xc5')))['on'](_0x4c87('0xc6'),function(){_0x1fbdfc['removeClass'](_0x4c87('0xc7'));_0x1cc01d(document[_0x4c87('0x74')])[_0x4c87('0x4d')](_0x4c87('0x8a'));});_0x1cc01d(document)[_0x4c87('0xc8')](_0x4c87('0xc9'))['on']('keyup.qd_ddc_closeFn',function(_0x374069){0x1b==_0x374069[_0x4c87('0xca')]&&(_0x1fbdfc[_0x4c87('0x4d')](_0x4c87('0xc7')),_0x1cc01d(document[_0x4c87('0x74')])['removeClass']('qd-bb-lightBoxBodyProdAdd'));});var _0x1191e0=_0x4b3c18['find'](_0x4c87('0xcb'));_0x4b3c18[_0x4c87('0x52')](_0x4c87('0xcc'))['on'](_0x4c87('0xcd'),function(){_0x10c511[_0x4c87('0xce')]('-',void 0x0,void 0x0,_0x1191e0);return!0x1;});_0x4b3c18[_0x4c87('0x52')](_0x4c87('0xcf'))['on']('click.qd_ddc_scrollDown',function(){_0x10c511[_0x4c87('0xce')](void 0x0,void 0x0,void 0x0,_0x1191e0);return!0x1;});_0x4b3c18['find'](_0x4c87('0xd0'))[_0x4c87('0xd1')]('')['on'](_0x4c87('0xd2'),function(){_0x10c511[_0x4c87('0xd3')](_0x1cc01d(this));});if(_0x243b54[_0x4c87('0xd4')]){var _0x42bd02=0x0;_0x1cc01d(this)['on'](_0x4c87('0xd5'),function(){var _0x4b3c18=function(){window[_0x4c87('0x58')]['allowUpdate']&&(_0x10c511[_0x4c87('0x8f')](),window[_0x4c87('0x58')][_0x4c87('0x91')]=!0x1,_0x1cc01d['fn']['simpleCart'](!0x0),_0x10c511[_0x4c87('0xd6')]());};_0x42bd02=setInterval(function(){_0x4b3c18();},0x258);_0x4b3c18();});_0x1cc01d(this)['on'](_0x4c87('0xd7'),function(){clearInterval(_0x42bd02);});}};var _0x244ff2=function(_0x5c61d5){_0x5c61d5=_0x1cc01d(_0x5c61d5);_0x243b54['texts'][_0x4c87('0x53')]=_0x243b54[_0x4c87('0xd8')][_0x4c87('0x53')][_0x4c87('0x1')](_0x4c87('0xd9'),'<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>');_0x243b54['texts']['cartTotal']=_0x243b54[_0x4c87('0xd8')]['cartTotal']['replace'](_0x4c87('0xda'),_0x4c87('0xdb'));_0x243b54[_0x4c87('0xd8')]['cartTotal']=_0x243b54[_0x4c87('0xd8')][_0x4c87('0x53')][_0x4c87('0x1')](_0x4c87('0xdc'),_0x4c87('0xdd'));_0x243b54[_0x4c87('0xd8')][_0x4c87('0x53')]=_0x243b54[_0x4c87('0xd8')][_0x4c87('0x53')][_0x4c87('0x1')](_0x4c87('0xde'),_0x4c87('0xdf'));_0x5c61d5[_0x4c87('0x52')]('.qd-ddc-viewCart')[_0x4c87('0x50')](_0x243b54[_0x4c87('0xd8')][_0x4c87('0xe0')]);_0x5c61d5['find'](_0x4c87('0xe1'))[_0x4c87('0x50')](_0x243b54[_0x4c87('0xd8')][_0x4c87('0xe2')]);_0x5c61d5[_0x4c87('0x52')](_0x4c87('0xe3'))['html'](_0x243b54[_0x4c87('0xd8')][_0x4c87('0xe4')]);_0x5c61d5[_0x4c87('0x52')](_0x4c87('0xe5'))[_0x4c87('0x50')](_0x243b54['texts'][_0x4c87('0x53')]);_0x5c61d5[_0x4c87('0x52')](_0x4c87('0xe6'))[_0x4c87('0x50')](_0x243b54[_0x4c87('0xd8')][_0x4c87('0xe7')]);_0x5c61d5['find'](_0x4c87('0xe8'))['html'](_0x243b54[_0x4c87('0xd8')][_0x4c87('0x57')]);return _0x5c61d5;}(this[_0x4c87('0xc2')]);var _0x1e2b82=0x0;_0x1fbdfc[_0x4c87('0x38')](function(){0x0<_0x1e2b82?_0x3683d8[_0x4c87('0x2a')](this,_0x244ff2[_0x4c87('0xe9')]()):_0x3683d8[_0x4c87('0x2a')](this,_0x244ff2);_0x1e2b82++;});window[_0x4c87('0x3a')]['callback'][_0x4c87('0x32')](function(){_0x1cc01d(_0x4c87('0xea'))[_0x4c87('0x50')](window['_QuatroDigital_CartData'][_0x4c87('0x3c')]||'--');_0x1cc01d(_0x4c87('0xeb'))[_0x4c87('0x50')](window[_0x4c87('0x3a')]['qtt']||'0');_0x1cc01d(_0x4c87('0xec'))[_0x4c87('0x50')](window['_QuatroDigital_CartData'][_0x4c87('0x3e')]||'--');_0x1cc01d(_0x4c87('0xed'))[_0x4c87('0x50')](window['_QuatroDigital_CartData'][_0x4c87('0x3f')]||'--');});var _0x345901=function(_0x27a6d4,_0x45b68d){if(_0x4c87('0x3')===typeof _0x27a6d4['items'])return _0x38527f(_0x4c87('0xee'));_0x10c511[_0x4c87('0xef')][_0x4c87('0x2a')](this,_0x45b68d);};_0x10c511[_0x4c87('0x8f')]=function(_0x2a9e61,_0x4f16e9){_0x4c87('0x3')!=typeof _0x4f16e9?window[_0x4c87('0x58')][_0x4c87('0xf0')]=_0x4f16e9:window[_0x4c87('0x58')][_0x4c87('0xf0')]&&(_0x4f16e9=window[_0x4c87('0x58')]['dataOptionsCache']);setTimeout(function(){window[_0x4c87('0x58')][_0x4c87('0xf0')]=void 0x0;},_0x243b54[_0x4c87('0xf1')]);_0x1cc01d(_0x4c87('0xf2'))[_0x4c87('0x4d')](_0x4c87('0xf3'));if(_0x243b54[_0x4c87('0xbd')]){var _0x42bd02=function(_0x5782fc){window['_QuatroDigital_DropDown'][_0x4c87('0x29')]=_0x5782fc;_0x345901(_0x5782fc,_0x4f16e9);'undefined'!==typeof window['_QuatroDigital_AmountProduct']&&_0x4c87('0x9')===typeof window[_0x4c87('0xf4')][_0x4c87('0xf5')]&&window[_0x4c87('0xf4')][_0x4c87('0xf5')][_0x4c87('0x2a')](this);_0x1cc01d(_0x4c87('0xf2'))[_0x4c87('0x4b')](_0x4c87('0xf3'));};_0x4c87('0x3')!==typeof window['_QuatroDigital_DropDown'][_0x4c87('0x29')]?(_0x42bd02(window[_0x4c87('0x58')]['getOrderForm']),_0x4c87('0x9')===typeof _0x2a9e61&&_0x2a9e61(window[_0x4c87('0x58')]['getOrderForm'])):_0x1cc01d[_0x4c87('0x5c')]([_0x4c87('0x42'),_0x4c87('0x3b'),_0x4c87('0x5d')],{'done':function(_0x1a503d){_0x42bd02[_0x4c87('0x2a')](this,_0x1a503d);_0x4c87('0x9')===typeof _0x2a9e61&&_0x2a9e61(_0x1a503d);},'fail':function(_0x2a3d1c){_0x38527f(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0x2a3d1c]);}});}else alert(_0x4c87('0xf6'));};_0x10c511[_0x4c87('0xd6')]=function(){var _0x195207=_0x1cc01d(_0x4c87('0xf2'));_0x195207[_0x4c87('0x52')](_0x4c87('0xf7'))[_0x4c87('0x7')]?_0x195207[_0x4c87('0x4d')](_0x4c87('0xf8')):_0x195207[_0x4c87('0x4b')](_0x4c87('0xf8'));};_0x10c511[_0x4c87('0xef')]=function(_0x333c5f){var _0x42bd02=_0x1cc01d(_0x4c87('0xf9'));_0x42bd02[_0x4c87('0xfa')]();_0x42bd02[_0x4c87('0x38')](function(){var _0x42bd02=_0x1cc01d(this),_0x14885a,_0x29074f,_0x249d4f=_0x1cc01d(''),_0x3926f6;for(_0x3926f6 in window[_0x4c87('0x58')][_0x4c87('0x29')][_0x4c87('0x42')])if(_0x4c87('0x2d')===typeof window[_0x4c87('0x58')]['getOrderForm']['items'][_0x3926f6]){var _0x2e8920=window[_0x4c87('0x58')][_0x4c87('0x29')]['items'][_0x3926f6];var _0x2e5bf7=_0x2e8920[_0x4c87('0xfb')][_0x4c87('0x1')](/^\/|\/$/g,'')[_0x4c87('0x6')]('/');var _0x7fa712=_0x1cc01d(_0x4c87('0xfc'));_0x7fa712[_0x4c87('0x98')]({'data-sku':_0x2e8920['id'],'data-sku-index':_0x3926f6,'data-qd-departament':_0x2e5bf7[0x0],'data-qd-category':_0x2e5bf7[_0x2e5bf7[_0x4c87('0x7')]-0x1]});_0x7fa712[_0x4c87('0x4b')]('qd-ddc-'+_0x2e8920['availability']);_0x7fa712[_0x4c87('0x52')]('.qd-ddc-prodName')[_0x4c87('0x83')](_0x243b54[_0x4c87('0xbb')](_0x2e8920));_0x7fa712['find'](_0x4c87('0xfd'))[_0x4c87('0x83')](isNaN(_0x2e8920[_0x4c87('0xfe')])?_0x2e8920[_0x4c87('0xfe')]:0x0==_0x2e8920[_0x4c87('0xfe')]?'Grátis':(_0x1cc01d('meta[name=currency]')[_0x4c87('0x98')](_0x4c87('0xff'))||'R$')+'\x20'+qd_number_format(_0x2e8920[_0x4c87('0xfe')]/0x64,0x2,',','.'));_0x7fa712[_0x4c87('0x52')](_0x4c87('0x100'))[_0x4c87('0x98')]({'data-sku':_0x2e8920['id'],'data-sku-index':_0x3926f6})[_0x4c87('0xd1')](_0x2e8920['quantity']);_0x7fa712[_0x4c87('0x52')](_0x4c87('0x101'))[_0x4c87('0x98')]({'data-sku':_0x2e8920['id'],'data-sku-index':_0x3926f6});_0x10c511[_0x4c87('0x102')](_0x2e8920['id'],_0x7fa712[_0x4c87('0x52')](_0x4c87('0x103')),_0x2e8920[_0x4c87('0x104')]);_0x7fa712['find'](_0x4c87('0x105'))[_0x4c87('0x98')]({'data-sku':_0x2e8920['id'],'data-sku-index':_0x3926f6});_0x7fa712[_0x4c87('0x106')](_0x42bd02);_0x249d4f=_0x249d4f[_0x4c87('0x32')](_0x7fa712);}try{var _0x346655=_0x42bd02[_0x4c87('0x26')](_0x4c87('0xf2'))[_0x4c87('0x52')](_0x4c87('0xd0'));_0x346655[_0x4c87('0x7')]&&''==_0x346655[_0x4c87('0xd1')]()&&window['_QuatroDigital_DropDown']['getOrderForm'][_0x4c87('0x5d')][_0x4c87('0x107')]&&_0x346655[_0x4c87('0xd1')](window[_0x4c87('0x58')][_0x4c87('0x29')][_0x4c87('0x5d')][_0x4c87('0x107')][_0x4c87('0x108')]);}catch(_0x643229){_0x38527f(_0x4c87('0x109')+_0x643229[_0x4c87('0x23')],_0x4c87('0x6b'));}_0x10c511['actionButtons'](_0x42bd02);_0x10c511[_0x4c87('0xd6')]();_0x333c5f&&_0x333c5f[_0x4c87('0x10a')]&&function(){_0x29074f=_0x249d4f[_0x4c87('0x47')](_0x4c87('0x10b')+_0x333c5f[_0x4c87('0x10a')]+'\x27]');_0x29074f[_0x4c87('0x7')]&&(_0x14885a=0x0,_0x249d4f[_0x4c87('0x38')](function(){var _0x333c5f=_0x1cc01d(this);if(_0x333c5f['is'](_0x29074f))return!0x1;_0x14885a+=_0x333c5f[_0x4c87('0x10c')]();}),_0x10c511['scrollCart'](void 0x0,void 0x0,_0x14885a,_0x42bd02[_0x4c87('0x32')](_0x42bd02[_0x4c87('0xaa')]())),_0x249d4f['removeClass'](_0x4c87('0x10d')),function(_0x365fbc){_0x365fbc[_0x4c87('0x4b')](_0x4c87('0x10e'));_0x365fbc['addClass']('qd-ddc-lastAddedFixed');setTimeout(function(){_0x365fbc[_0x4c87('0x4d')]('qd-ddc-lastAdded');},_0x243b54[_0x4c87('0xf1')]);}(_0x29074f));}();});(function(){_QuatroDigital_DropDown['getOrderForm']['items']['length']?(_0x1cc01d(_0x4c87('0x74'))[_0x4c87('0x4d')](_0x4c87('0x10f'))[_0x4c87('0x4b')](_0x4c87('0x110')),setTimeout(function(){_0x1cc01d(_0x4c87('0x74'))['removeClass'](_0x4c87('0x111'));},_0x243b54['timeRemoveNewItemClass'])):_0x1cc01d('body')['removeClass'](_0x4c87('0x112'))[_0x4c87('0x4b')]('qd-ddc-cart-empty');}());_0x4c87('0x9')===typeof _0x243b54[_0x4c87('0x113')]?_0x243b54['callbackProductsList'][_0x4c87('0x2a')](this):_0x38527f('callbackProductsList\x20não\x20é\x20uma\x20função');};_0x10c511[_0x4c87('0x102')]=function(_0x179c0a,_0x2c41a3,_0x11385b){function _0x4fc92c(){_0x2c41a3[_0x4c87('0x4d')]('qd-loaded')[_0x4c87('0x97')](function(){_0x1cc01d(this)[_0x4c87('0x4b')]('qd-loaded');})[_0x4c87('0x98')](_0x4c87('0x114'),_0x11385b);}_0x11385b?_0x4fc92c():isNaN(_0x179c0a)?_0x38527f(_0x4c87('0x115'),_0x4c87('0x2e')):alert(_0x4c87('0x116'));};_0x10c511[_0x4c87('0x117')]=function(_0x239818){var _0x4c4363=function(_0x519db7,_0x10a93){var _0x42bd02=_0x1cc01d(_0x519db7);var _0x50bcfe=_0x42bd02[_0x4c87('0x98')](_0x4c87('0x118'));var _0x14885a=_0x42bd02['attr'](_0x4c87('0x119'));if(_0x50bcfe){var _0x652892=parseInt(_0x42bd02[_0x4c87('0xd1')]())||0x1;_0x10c511['changeQantity']([_0x50bcfe,_0x14885a],_0x652892,_0x652892+0x1,function(_0x3f8d51){_0x42bd02[_0x4c87('0xd1')](_0x3f8d51);'function'===typeof _0x10a93&&_0x10a93();});}};var _0x42bd02=function(_0x58806b,_0x33fc1e){var _0x42bd02=_0x1cc01d(_0x58806b);var _0x158100=_0x42bd02[_0x4c87('0x98')](_0x4c87('0x118'));var _0x14885a=_0x42bd02[_0x4c87('0x98')]('data-sku-index');if(_0x158100){var _0x16cd1c=parseInt(_0x42bd02[_0x4c87('0xd1')]())||0x2;_0x10c511[_0x4c87('0x11a')]([_0x158100,_0x14885a],_0x16cd1c,_0x16cd1c-0x1,function(_0x45949e){_0x42bd02[_0x4c87('0xd1')](_0x45949e);_0x4c87('0x9')===typeof _0x33fc1e&&_0x33fc1e();});}};var _0x8da676=function(_0x5af5a3,_0x4e2a5f){var _0x42bd02=_0x1cc01d(_0x5af5a3);var _0x515444=_0x42bd02[_0x4c87('0x98')](_0x4c87('0x118'));var _0x14885a=_0x42bd02[_0x4c87('0x98')](_0x4c87('0x119'));if(_0x515444){var _0x43f4e2=parseInt(_0x42bd02['val']())||0x1;_0x10c511[_0x4c87('0x11a')]([_0x515444,_0x14885a],0x1,_0x43f4e2,function(_0xe6c7f2){_0x42bd02[_0x4c87('0xd1')](_0xe6c7f2);_0x4c87('0x9')===typeof _0x4e2a5f&&_0x4e2a5f();});}};var _0x14885a=_0x239818[_0x4c87('0x52')]('.qd-ddc-prodQttWrapper:not(.qd_on)');_0x14885a['addClass'](_0x4c87('0x11b'))[_0x4c87('0x38')](function(){var _0x239818=_0x1cc01d(this);_0x239818[_0x4c87('0x52')](_0x4c87('0x11c'))['on'](_0x4c87('0x11d'),function(_0x1e1c00){_0x1e1c00[_0x4c87('0x7a')]();_0x14885a[_0x4c87('0x4b')](_0x4c87('0x11e'));_0x4c4363(_0x239818['find'](_0x4c87('0x100')),function(){_0x14885a[_0x4c87('0x4d')](_0x4c87('0x11e'));});});_0x239818[_0x4c87('0x52')](_0x4c87('0x11f'))['on'](_0x4c87('0x120'),function(_0x444997){_0x444997[_0x4c87('0x7a')]();_0x14885a[_0x4c87('0x4b')](_0x4c87('0x11e'));_0x42bd02(_0x239818[_0x4c87('0x52')](_0x4c87('0x100')),function(){_0x14885a[_0x4c87('0x4d')](_0x4c87('0x11e'));});});_0x239818[_0x4c87('0x52')](_0x4c87('0x100'))['on'](_0x4c87('0x121'),function(){_0x14885a['addClass'](_0x4c87('0x11e'));_0x8da676(this,function(){_0x14885a[_0x4c87('0x4d')](_0x4c87('0x11e'));});});_0x239818['find'](_0x4c87('0x100'))['on']('keyup.qd_ddc_change',function(_0x1377a4){0xd==_0x1377a4[_0x4c87('0xca')]&&(_0x14885a[_0x4c87('0x4b')](_0x4c87('0x11e')),_0x8da676(this,function(){_0x14885a[_0x4c87('0x4d')](_0x4c87('0x11e'));}));});});_0x239818[_0x4c87('0x52')]('.qd-ddc-prodRow')[_0x4c87('0x38')](function(){var _0x239818=_0x1cc01d(this);_0x239818[_0x4c87('0x52')](_0x4c87('0x101'))['on'](_0x4c87('0x122'),function(){_0x239818[_0x4c87('0x4b')](_0x4c87('0x11e'));_0x10c511['removeProduct'](_0x1cc01d(this),function(_0x33d6f2){_0x33d6f2?_0x239818[_0x4c87('0x123')](!0x0)[_0x4c87('0x124')](function(){_0x239818['remove']();_0x10c511[_0x4c87('0xd6')]();}):_0x239818[_0x4c87('0x4d')](_0x4c87('0x11e'));});return!0x1;});});};_0x10c511[_0x4c87('0xd3')]=function(_0x3d8254){var _0x5c11ed=_0x3d8254[_0x4c87('0xd1')](),_0x5c11ed=_0x5c11ed[_0x4c87('0x1')](/[^0-9\-]/g,''),_0x5c11ed=_0x5c11ed[_0x4c87('0x1')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x4c87('0x125')),_0x5c11ed=_0x5c11ed['replace'](/(.{9}).*/g,'$1');_0x3d8254[_0x4c87('0xd1')](_0x5c11ed);0x9<=_0x5c11ed[_0x4c87('0x7')]&&(_0x3d8254[_0x4c87('0x17')](_0x4c87('0x126'))!=_0x5c11ed&&_0x5ad965[_0x4c87('0x127')]({'postalCode':_0x5c11ed,'country':_0x4c87('0x128')})[_0x4c87('0x1d')](function(_0x20cf85){window[_0x4c87('0x58')][_0x4c87('0x29')]=_0x20cf85;_0x10c511[_0x4c87('0x8f')]();})['fail'](function(_0x2de2b9){_0x38527f([_0x4c87('0x129'),_0x2de2b9]);updateCartData();}),_0x3d8254[_0x4c87('0x17')](_0x4c87('0x126'),_0x5c11ed));};_0x10c511[_0x4c87('0x11a')]=function(_0x167a15,_0xc01ab,_0x4fa611,_0x26bf0a){function _0x4bc768(_0x443508){_0x443508='boolean'!==typeof _0x443508?!0x1:_0x443508;_0x10c511['getCartInfoByUrl']();window[_0x4c87('0x58')][_0x4c87('0x91')]=!0x1;_0x10c511[_0x4c87('0xd6')]();'undefined'!==typeof window[_0x4c87('0xf4')]&&_0x4c87('0x9')===typeof window['_QuatroDigital_AmountProduct'][_0x4c87('0xf5')]&&window[_0x4c87('0xf4')][_0x4c87('0xf5')]['call'](this);'function'===typeof adminCart&&adminCart();_0x1cc01d['fn'][_0x4c87('0x27')](!0x0,void 0x0,_0x443508);'function'===typeof _0x26bf0a&&_0x26bf0a(_0xc01ab);}_0x4fa611=_0x4fa611||0x1;if(0x1>_0x4fa611)return _0xc01ab;if(_0x243b54['smartCheckout']){if(_0x4c87('0x3')===typeof window[_0x4c87('0x58')][_0x4c87('0x29')][_0x4c87('0x42')][_0x167a15[0x1]])return _0x38527f(_0x4c87('0x12a')+_0x167a15[0x1]+']'),_0xc01ab;window[_0x4c87('0x58')][_0x4c87('0x29')]['items'][_0x167a15[0x1]]['quantity']=_0x4fa611;window['_QuatroDigital_DropDown'][_0x4c87('0x29')][_0x4c87('0x42')][_0x167a15[0x1]][_0x4c87('0x12b')]=_0x167a15[0x1];_0x5ad965[_0x4c87('0x12c')]([window[_0x4c87('0x58')][_0x4c87('0x29')][_0x4c87('0x42')][_0x167a15[0x1]]],[_0x4c87('0x42'),_0x4c87('0x3b'),'shippingData'])['done'](function(_0x4db3cd){window[_0x4c87('0x58')][_0x4c87('0x29')]=_0x4db3cd;_0x4bc768(!0x0);})[_0x4c87('0x1e')](function(_0x4901e4){_0x38527f([_0x4c87('0x12d'),_0x4901e4]);_0x4bc768();});}else _0x38527f(_0x4c87('0x12e'));};_0x10c511[_0x4c87('0x12f')]=function(_0x357721,_0x376f1a){function _0xfbc1d8(_0x5811be){_0x5811be=_0x4c87('0x130')!==typeof _0x5811be?!0x1:_0x5811be;'undefined'!==typeof window[_0x4c87('0xf4')]&&'function'===typeof window[_0x4c87('0xf4')][_0x4c87('0xf5')]&&window[_0x4c87('0xf4')][_0x4c87('0xf5')][_0x4c87('0x2a')](this);_0x4c87('0x9')===typeof adminCart&&adminCart();_0x1cc01d['fn'][_0x4c87('0x27')](!0x0,void 0x0,_0x5811be);_0x4c87('0x9')===typeof _0x376f1a&&_0x376f1a(_0x14885a);}var _0x14885a=!0x1,_0x17c97e=_0x1cc01d(_0x357721)[_0x4c87('0x98')](_0x4c87('0x119'));if(_0x243b54[_0x4c87('0xbd')]){if(_0x4c87('0x3')===typeof window[_0x4c87('0x58')][_0x4c87('0x29')]['items'][_0x17c97e])return _0x38527f(_0x4c87('0x12a')+_0x17c97e+']'),_0x14885a;window[_0x4c87('0x58')][_0x4c87('0x29')][_0x4c87('0x42')][_0x17c97e][_0x4c87('0x12b')]=_0x17c97e;_0x5ad965[_0x4c87('0x131')]([window[_0x4c87('0x58')]['getOrderForm'][_0x4c87('0x42')][_0x17c97e]],[_0x4c87('0x42'),_0x4c87('0x3b'),_0x4c87('0x5d')])[_0x4c87('0x1d')](function(_0x3e83b6){_0x14885a=!0x0;window[_0x4c87('0x58')]['getOrderForm']=_0x3e83b6;_0x345901(_0x3e83b6);_0xfbc1d8(!0x0);})['fail'](function(_0x539b64){_0x38527f(['Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho',_0x539b64]);_0xfbc1d8();});}else alert(_0x4c87('0x132'));};_0x10c511['scrollCart']=function(_0x2257b9,_0x640d8a,_0x34087c,_0x3e4cde){_0x3e4cde=_0x3e4cde||_0x1cc01d('.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2');_0x2257b9=_0x2257b9||'+';_0x640d8a=_0x640d8a||0.9*_0x3e4cde['height']();_0x3e4cde[_0x4c87('0x123')](!0x0,!0x0)[_0x4c87('0x133')]({'scrollTop':isNaN(_0x34087c)?_0x2257b9+'='+_0x640d8a+'px':_0x34087c});};_0x243b54['updateOnlyHover']||(_0x10c511['getCartInfoByUrl'](),_0x1cc01d['fn'][_0x4c87('0x27')](!0x0));_0x1cc01d(window)['on']('productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex',function(){try{window[_0x4c87('0x58')][_0x4c87('0x29')]=void 0x0,_0x10c511['getCartInfoByUrl']();}catch(_0x3dabfe){_0x38527f(_0x4c87('0x134')+_0x3dabfe['message'],_0x4c87('0x135'));}});_0x4c87('0x9')===typeof _0x243b54['callback']?_0x243b54['callback'][_0x4c87('0x2a')](this):_0x38527f(_0x4c87('0x136'));};_0x1cc01d['fn']['QD_dropDownCart']=function(_0x90274b){var _0x23d176=_0x1cc01d(this);_0x23d176['fn']=new _0x1cc01d[(_0x4c87('0xb5'))](this,_0x90274b);return _0x23d176;};}catch(_0x1d7333){_0x4c87('0x3')!==typeof console&&'function'===typeof console[_0x4c87('0x14')]&&console[_0x4c87('0x14')]('Oooops!\x20',_0x1d7333);}}(this));(function(_0x51cdf9){try{var _0x4977d9=jQuery;window[_0x4c87('0xf4')]=window[_0x4c87('0xf4')]||{};window[_0x4c87('0xf4')][_0x4c87('0x42')]={};window[_0x4c87('0xf4')][_0x4c87('0x137')]=!0x1;window['_QuatroDigital_AmountProduct'][_0x4c87('0x138')]=!0x1;window['_QuatroDigital_AmountProduct'][_0x4c87('0x139')]=!0x1;var _0x5147fa=function(){if(window[_0x4c87('0xf4')][_0x4c87('0x137')]){var _0x453c2=!0x1;var _0x51cdf9={};window[_0x4c87('0xf4')][_0x4c87('0x42')]={};for(_0x1a3f70 in window[_0x4c87('0x58')]['getOrderForm'][_0x4c87('0x42')])if('object'===typeof window[_0x4c87('0x58')][_0x4c87('0x29')][_0x4c87('0x42')][_0x1a3f70]){var _0x29245a=window[_0x4c87('0x58')][_0x4c87('0x29')]['items'][_0x1a3f70];'undefined'!==typeof _0x29245a[_0x4c87('0x13a')]&&null!==_0x29245a[_0x4c87('0x13a')]&&''!==_0x29245a[_0x4c87('0x13a')]&&(window['_QuatroDigital_AmountProduct'][_0x4c87('0x42')][_0x4c87('0x13b')+_0x29245a['productId']]=window[_0x4c87('0xf4')][_0x4c87('0x42')]['prod_'+_0x29245a[_0x4c87('0x13a')]]||{},window[_0x4c87('0xf4')]['items']['prod_'+_0x29245a[_0x4c87('0x13a')]][_0x4c87('0x13c')]=_0x29245a[_0x4c87('0x13a')],_0x51cdf9[_0x4c87('0x13b')+_0x29245a[_0x4c87('0x13a')]]||(window['_QuatroDigital_AmountProduct'][_0x4c87('0x42')][_0x4c87('0x13b')+_0x29245a['productId']][_0x4c87('0x40')]=0x0),window['_QuatroDigital_AmountProduct'][_0x4c87('0x42')]['prod_'+_0x29245a[_0x4c87('0x13a')]]['qtt']+=_0x29245a[_0x4c87('0x13d')],_0x453c2=!0x0,_0x51cdf9[_0x4c87('0x13b')+_0x29245a['productId']]=!0x0);}var _0x1a3f70=_0x453c2;}else _0x1a3f70=void 0x0;window[_0x4c87('0xf4')][_0x4c87('0x137')]&&(_0x4977d9(_0x4c87('0x13e'))[_0x4c87('0x13f')](),_0x4977d9(_0x4c87('0x140'))[_0x4c87('0x4d')]('qd-bap-item-added'));for(var _0x1e5767 in window['_QuatroDigital_AmountProduct'][_0x4c87('0x42')]){_0x29245a=window['_QuatroDigital_AmountProduct']['items'][_0x1e5767];if('object'!==typeof _0x29245a)return;_0x51cdf9=_0x4977d9(_0x4c87('0x141')+_0x29245a[_0x4c87('0x13c')]+']')[_0x4c87('0x26')]('li');if(window[_0x4c87('0xf4')]['allowRecalculate']||!_0x51cdf9[_0x4c87('0x52')](_0x4c87('0x13e'))[_0x4c87('0x7')])_0x453c2=_0x4977d9('<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>'),_0x453c2[_0x4c87('0x52')](_0x4c87('0x142'))[_0x4c87('0x50')](_0x29245a[_0x4c87('0x40')]),_0x29245a=_0x51cdf9[_0x4c87('0x52')](_0x4c87('0x143')),_0x29245a[_0x4c87('0x7')]?_0x29245a[_0x4c87('0xae')](_0x453c2)[_0x4c87('0x4b')](_0x4c87('0x144')):_0x51cdf9[_0x4c87('0xae')](_0x453c2);}_0x1a3f70&&(window[_0x4c87('0xf4')]['allowRecalculate']=!0x1);};window['_QuatroDigital_AmountProduct'][_0x4c87('0xf5')]=function(){window[_0x4c87('0xf4')][_0x4c87('0x137')]=!0x0;_0x5147fa['call'](this);};_0x4977d9(document)['ajaxStop'](function(){_0x5147fa[_0x4c87('0x2a')](this);});}catch(_0x2b69b7){_0x4c87('0x3')!==typeof console&&'function'===typeof console['error']&&console[_0x4c87('0x14')](_0x4c87('0x66'),_0x2b69b7);}}(this));(function(){try{var _0x5b3a8b=jQuery,_0x2da3d1,_0x5c9c19={'selector':'.qdDdcContainer','dropDown':{},'buyButton':{}};_0x5b3a8b[_0x4c87('0x145')]=function(_0x192940){var _0x40588c={};_0x2da3d1=_0x5b3a8b[_0x4c87('0x15')](!0x0,{},_0x5c9c19,_0x192940);_0x192940=_0x5b3a8b(_0x2da3d1[_0x4c87('0x87')])[_0x4c87('0xb5')](_0x2da3d1['dropDown']);_0x40588c[_0x4c87('0x7c')]=_0x4c87('0x3')!==typeof _0x2da3d1[_0x4c87('0x146')][_0x4c87('0xd4')]&&!0x1===_0x2da3d1[_0x4c87('0x146')]['updateOnlyHover']?_0x5b3a8b(_0x2da3d1[_0x4c87('0x87')])[_0x4c87('0xad')](_0x192940['fn'],_0x2da3d1[_0x4c87('0x7c')]):_0x5b3a8b(_0x2da3d1[_0x4c87('0x87')])[_0x4c87('0xad')](_0x2da3d1[_0x4c87('0x7c')]);_0x40588c['dropDown']=_0x192940;return _0x40588c;};_0x5b3a8b['fn']['smartCart']=function(){'object'===typeof console&&_0x4c87('0x9')===typeof console[_0x4c87('0x31')]&&console[_0x4c87('0x31')](_0x4c87('0x147'));};_0x5b3a8b[_0x4c87('0x148')]=_0x5b3a8b['fn'][_0x4c87('0x148')];}catch(_0x39eb2c){_0x4c87('0x3')!==typeof console&&'function'===typeof console['error']&&console[_0x4c87('0x14')]('Oooops!\x20',_0x39eb2c);}}());

/* Quatro Digital - Product Thumbs // Carlos Vinicius // Todos os direitos reservados. */
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs();a.trigger("QuatroDigital.pt_callback",[a])}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return a.length?$.extend({},a,new b(a)):a},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0xb524=['prependTo','#include','wrap','<div\x20class=\x22qd-playerContainer\x22></div>','replace','fromCharCode','join','toUpperCase','ite','---','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','youtube','html','<iframe\x20src=\x22','urlProtocol','://www.youtube.com/embed/','data','height','stop','fadeTo','addClass','qdpv-video-on','add','animate','find','iframe','a:not(\x27.qd-videoLink\x27)','bind','removeAttr','style','removeClass','call','string','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27','\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','click.playVideo','controlVideo','.qd-playerWrapper\x20iframe','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','attr','rel','insertThumbsIn','appendTo','trigger','QuatroDigital.pv_video_added','ajaxStop','load','ImageControl','.qd-videoLink','body','.produto','undefined','alerta','warn','toLowerCase','info','[Video\x20in\x20product]\x20','qdVideoInProduct','extend','td.value-field.Videos:first','http','div#image','videoFieldSelector','text','length','indexOf','split','pop','shift','push','be/','<div\x20class=\x22qd-playerWrapper\x22></div>'];(function(_0x14f056,_0x149764){var _0x417159=function(_0x10bd21){while(--_0x10bd21){_0x14f056['push'](_0x14f056['shift']());}};_0x417159(++_0x149764);}(_0xb524,0xcd));var _0x4b52=function(_0x1c44fe,_0x321c92){_0x1c44fe=_0x1c44fe-0x0;var _0x4e4605=_0xb524[_0x1c44fe];return _0x4e4605;};(function(_0x1ab149){$(function(){if($(document[_0x4b52('0x0')])['is'](_0x4b52('0x1'))){var _0x83322d=[];var _0x5c3989=function(_0x4f70df,_0x4870ee){'object'===typeof console&&(_0x4b52('0x2')!==typeof _0x4870ee&&_0x4b52('0x3')===_0x4870ee['toLowerCase']()?console[_0x4b52('0x4')]('[Video\x20in\x20product]\x20'+_0x4f70df):'undefined'!==typeof _0x4870ee&&'info'===_0x4870ee[_0x4b52('0x5')]()?console[_0x4b52('0x6')](_0x4b52('0x7')+_0x4f70df):console['error']('[Video\x20in\x20product]\x20'+_0x4f70df));};window['qdVideoInProduct']=window[_0x4b52('0x8')]||{};var _0x5112fd=$[_0x4b52('0x9')](!0x0,{'insertThumbsIn':'start','videoFieldSelector':_0x4b52('0xa'),'controlVideo':!0x0,'urlProtocol':_0x4b52('0xb')},window[_0x4b52('0x8')]);var _0x59390f=$('ul.thumbs');var _0x492453=$(_0x4b52('0xc'));var _0x5d19e7=$(_0x5112fd[_0x4b52('0xd')])[_0x4b52('0xe')]()['replace'](/\;\s*/,';')['split'](';');for(var _0x41d632=0x0;_0x41d632<_0x5d19e7[_0x4b52('0xf')];_0x41d632++)-0x1<_0x5d19e7[_0x41d632][_0x4b52('0x10')]('youtube')?_0x83322d['push'](_0x5d19e7[_0x41d632][_0x4b52('0x11')]('v=')[_0x4b52('0x12')]()['split'](/[&#]/)[_0x4b52('0x13')]()):-0x1<_0x5d19e7[_0x41d632]['indexOf']('youtu.be')&&_0x83322d[_0x4b52('0x14')](_0x5d19e7[_0x41d632][_0x4b52('0x11')](_0x4b52('0x15'))[_0x4b52('0x12')]()[_0x4b52('0x11')](/[\?&#]/)['shift']());var _0x48ca15=$(_0x4b52('0x16'));_0x48ca15[_0x4b52('0x17')](_0x4b52('0x18'));_0x48ca15[_0x4b52('0x19')](_0x4b52('0x1a'));_0x5d19e7=function(_0xc2d069){var _0x24dd6f={'t':'nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x2f6583){var _0x57557a=function(_0x5e1412){return _0x5e1412;};var _0x55771e=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2f6583=_0x2f6583['d'+_0x55771e[0x10]+'c'+_0x55771e[0x11]+'m'+_0x57557a(_0x55771e[0x1])+'n'+_0x55771e[0xd]]['l'+_0x55771e[0x12]+'c'+_0x55771e[0x0]+'ti'+_0x57557a('o')+'n'];var _0x20621b=function(_0x233121){return escape(encodeURIComponent(_0x233121[_0x4b52('0x1b')](/\./g,'¨')[_0x4b52('0x1b')](/[a-zA-Z]/g,function(_0x5c1c9c){return String[_0x4b52('0x1c')](('Z'>=_0x5c1c9c?0x5a:0x7a)>=(_0x5c1c9c=_0x5c1c9c['charCodeAt'](0x0)+0xd)?_0x5c1c9c:_0x5c1c9c-0x1a);})));};var _0x43f6b7=_0x20621b(_0x2f6583[[_0x55771e[0x9],_0x57557a('o'),_0x55771e[0xc],_0x55771e[_0x57557a(0xd)]][_0x4b52('0x1d')]('')]);_0x20621b=_0x20621b((window[['js',_0x57557a('no'),'m',_0x55771e[0x1],_0x55771e[0x4][_0x4b52('0x1e')](),_0x4b52('0x1f')][_0x4b52('0x1d')]('')]||_0x4b52('0x20'))+['.v',_0x55771e[0xd],'e',_0x57557a('x'),'co',_0x57557a('mm'),'erc',_0x55771e[0x1],'.c',_0x57557a('o'),'m.',_0x55771e[0x13],'r'][_0x4b52('0x1d')](''));for(var _0x3784c5 in _0x24dd6f){if(_0x20621b===_0x3784c5+_0x24dd6f[_0x3784c5]||_0x43f6b7===_0x3784c5+_0x24dd6f[_0x3784c5]){var _0x2cafa3='tr'+_0x55771e[0x11]+'e';break;}_0x2cafa3='f'+_0x55771e[0x0]+'ls'+_0x57557a(_0x55771e[0x1])+'';}_0x57557a=!0x1;-0x1<_0x2f6583[[_0x55771e[0xc],'e',_0x55771e[0x0],'rc',_0x55771e[0x9]][_0x4b52('0x1d')]('')][_0x4b52('0x10')](_0x4b52('0x21'))&&(_0x57557a=!0x0);return[_0x2cafa3,_0x57557a];}(_0xc2d069);}(window);if(!eval(_0x5d19e7[0x0]))return _0x5d19e7[0x1]?_0x5c3989(_0x4b52('0x22')):!0x1;var _0x5920fe=function(_0x2b1a4a,_0x5421df){_0x4b52('0x23')===_0x5421df&&_0x48ca15[_0x4b52('0x24')](_0x4b52('0x25')+_0x5112fd[_0x4b52('0x26')]+_0x4b52('0x27')+_0x2b1a4a+'?wmode=transparent&rel=0&enablejsapi=1\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>');_0x492453[_0x4b52('0x28')](_0x4b52('0x29'),_0x492453[_0x4b52('0x28')](_0x4b52('0x29'))||_0x492453[_0x4b52('0x29')]());_0x492453[_0x4b52('0x2a')](!0x0,!0x0)[_0x4b52('0x2b')](0x1f4,0x0,function(){$(_0x4b52('0x0'))[_0x4b52('0x2c')](_0x4b52('0x2d'));});_0x48ca15['stop'](!0x0,!0x0)[_0x4b52('0x2b')](0x1f4,0x1,function(){_0x492453[_0x4b52('0x2e')](_0x48ca15)[_0x4b52('0x2f')]({'height':_0x48ca15[_0x4b52('0x30')](_0x4b52('0x31'))[_0x4b52('0x29')]()},0x2bc);});};removePlayer=function(){_0x59390f['find'](_0x4b52('0x32'))[_0x4b52('0x33')]('click.removeVideo',function(){_0x48ca15[_0x4b52('0x2a')](!0x0,!0x0)[_0x4b52('0x2b')](0x1f4,0x0,function(){$(this)['hide']()[_0x4b52('0x34')](_0x4b52('0x35'));$(_0x4b52('0x0'))[_0x4b52('0x36')]('qdpv-video-on');});_0x492453['stop'](!0x0,!0x0)[_0x4b52('0x2b')](0x1f4,0x1,function(){var _0x1cd3c1=_0x492453[_0x4b52('0x28')]('height');_0x1cd3c1&&_0x492453[_0x4b52('0x2f')]({'height':_0x1cd3c1},0x2bc);});});};var _0x4d548d=function(){if(!_0x59390f[_0x4b52('0x30')]('.qd-videoItem')[_0x4b52('0xf')])for(vId in removePlayer[_0x4b52('0x37')](this),_0x83322d)if(_0x4b52('0x38')===typeof _0x83322d[vId]&&''!==_0x83322d[vId]){var _0x5d226e=$(_0x4b52('0x39')+_0x83322d[vId]+_0x4b52('0x3a')+_0x83322d[vId]+_0x4b52('0x3b')+_0x83322d[vId]+_0x4b52('0x3c'));_0x5d226e[_0x4b52('0x30')]('a')[_0x4b52('0x33')](_0x4b52('0x3d'),function(){var _0x3747f3=$(this);_0x59390f['find']('.ON')[_0x4b52('0x36')]('ON');_0x3747f3['addClass']('ON');0x1==_0x5112fd[_0x4b52('0x3e')]?$(_0x4b52('0x3f'))['length']?(_0x5920fe['call'](this,'',''),$(_0x4b52('0x3f'))[0x0]['contentWindow'][_0x4b52('0x40')](_0x4b52('0x41'),'*')):_0x5920fe[_0x4b52('0x37')](this,_0x3747f3[_0x4b52('0x42')](_0x4b52('0x43')),_0x4b52('0x23')):_0x5920fe['call'](this,_0x3747f3[_0x4b52('0x42')](_0x4b52('0x43')),_0x4b52('0x23'));return!0x1;});0x1==_0x5112fd[_0x4b52('0x3e')]&&_0x59390f[_0x4b52('0x30')]('a:not(.qd-videoLink)')['click'](function(_0x7dbd6e){$(_0x4b52('0x3f'))[_0x4b52('0xf')]&&$(_0x4b52('0x3f'))[0x0]['contentWindow']['postMessage']('{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','*');});'start'===_0x5112fd[_0x4b52('0x44')]?_0x5d226e['prependTo'](_0x59390f):_0x5d226e[_0x4b52('0x45')](_0x59390f);_0x5d226e[_0x4b52('0x46')](_0x4b52('0x47'),[_0x83322d[vId],_0x5d226e]);}};$(document)[_0x4b52('0x48')](_0x4d548d);$(window)[_0x4b52('0x49')](_0x4d548d);(function(){var _0x76d9be=this;var _0x1319cc=window['ImageControl']||function(){};window[_0x4b52('0x4a')]=function(_0xa4a105,_0x59b71d){$(_0xa4a105||'')['is'](_0x4b52('0x4b'))||(_0x1319cc[_0x4b52('0x37')](this,_0xa4a105,_0x59b71d),_0x4d548d[_0x4b52('0x37')](_0x76d9be));};}());}});}(this));

/* Quatro Digital - Mosaic Banners // Carlos Vinicius // Todos os direitos reservados */
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

