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
var _0xc5b1=['changeNativeSaveAmount','em.economia-de','each','skuSelected.vtex','qd_sp_processedItem','startedByWrapper','flagElement','forcePromotion','not','.qd_sp_processedItem','.qd_productPrice:not(.qd_sp_processedItem)','display:none\x20!important;','after','call','boolean','body','.produto','function','prototype','trim','replace','undefined','pow','round','toFixed','length','join','QD_SmartPrice','Smart\x20Price','info','warn','object','unshift','alerta','toLowerCase','aviso','error','apply','text','search','match','.flag','[class*=\x27desconto\x27]','.productRightColumn','strong.skuBestPrice','label.skuBestInstallmentValue','strong.skuPrice','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','toUpperCase','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','productPage','isProductPage','closest','wrapperElement','filterFlagBy','find','addClass','qd-active','skuBestPrice','.qd_active','removeClass','qd-sp-active','oneFlagByItem','siblings','.qd_sp_on','qd_sp_ignored','qd_sp_on','isDiscountFlag','div[skuCorrente]:first','attr','skuCorrente','sku','skus','available','bestPrice','qd-sp-product-unavailable','getDiscountValue','O\x20valor\x20informado\x20p/\x20o\x20desconto\x20não\x20é\x20um\x20número.','.qd_productPrice','val','Por\x20alguma\x20razão\x20não\x20consegui\x20obter\x20o\x20preço\x20deste\x20produto\x20:(','appliedDiscount','listPrice','.qd_productOldPrice','changeNativePrice','.qd_displayPrice','skuPrice','.qd-sp-display-discount','html','installments','changeInstallments','installmentValue','.qd_sp_display_installments','.qd_sp_installments','.qd_saveAmount','append','.qd_saveAmountPercent','prepend'];(function(_0x3842da,_0xa23321){var _0x255239=function(_0x509ba6){while(--_0x509ba6){_0x3842da['push'](_0x3842da['shift']());}};_0x255239(++_0xa23321);}(_0xc5b1,0x77));var _0x1c5b=function(_0x16a4f5,_0x3f2563){_0x16a4f5=_0x16a4f5-0x0;var _0x476b81=_0xc5b1[_0x16a4f5];return _0x476b81;};_0x1c5b('0x0')!==typeof String[_0x1c5b('0x1')][_0x1c5b('0x2')]&&(String[_0x1c5b('0x1')][_0x1c5b('0x2')]=function(){return this[_0x1c5b('0x3')](/^\s+|\s+$/g,'');});function qd_number_format(_0x34dff5,_0x452cb1,_0x3ff73e,_0x4f2479){_0x34dff5=(_0x34dff5+'')[_0x1c5b('0x3')](/[^0-9+\-Ee.]/g,'');_0x34dff5=isFinite(+_0x34dff5)?+_0x34dff5:0x0;_0x452cb1=isFinite(+_0x452cb1)?Math['abs'](_0x452cb1):0x0;_0x4f2479=_0x1c5b('0x4')===typeof _0x4f2479?',':_0x4f2479;_0x3ff73e=_0x1c5b('0x4')===typeof _0x3ff73e?'.':_0x3ff73e;var _0x18c718='',_0x18c718=function(_0x24bbac,_0x5b0780){var _0x452cb1=Math[_0x1c5b('0x5')](0xa,_0x5b0780);return''+(Math[_0x1c5b('0x6')](_0x24bbac*_0x452cb1)/_0x452cb1)[_0x1c5b('0x7')](_0x5b0780);},_0x18c718=(_0x452cb1?_0x18c718(_0x34dff5,_0x452cb1):''+Math[_0x1c5b('0x6')](_0x34dff5))['split']('.');0x3<_0x18c718[0x0][_0x1c5b('0x8')]&&(_0x18c718[0x0]=_0x18c718[0x0][_0x1c5b('0x3')](/\B(?=(?:\d{3})+(?!\d))/g,_0x4f2479));(_0x18c718[0x1]||'')['length']<_0x452cb1&&(_0x18c718[0x1]=_0x18c718[0x1]||'',_0x18c718[0x1]+=Array(_0x452cb1-_0x18c718[0x1][_0x1c5b('0x8')]+0x1)[_0x1c5b('0x9')]('0'));return _0x18c718[_0x1c5b('0x9')](_0x3ff73e);};(function(_0x38c3c8){'use strict';var _0x10badc=jQuery;if(typeof _0x10badc['fn'][_0x1c5b('0xa')]===_0x1c5b('0x0'))return;var _0x28ad9a=_0x1c5b('0xb');var _0x1268a9=function(_0x2b7cc0,_0xb36c19){if('object'===typeof console&&'function'===typeof console['error']&&_0x1c5b('0x0')===typeof console[_0x1c5b('0xc')]&&_0x1c5b('0x0')===typeof console[_0x1c5b('0xd')]){var _0x4dcca6;_0x1c5b('0xe')===typeof _0x2b7cc0?(_0x2b7cc0[_0x1c5b('0xf')]('['+_0x28ad9a+']\x0a'),_0x4dcca6=_0x2b7cc0):_0x4dcca6=['['+_0x28ad9a+']\x0a'+_0x2b7cc0];if(_0x1c5b('0x4')===typeof _0xb36c19||_0x1c5b('0x10')!==_0xb36c19[_0x1c5b('0x11')]()&&_0x1c5b('0x12')!==_0xb36c19['toLowerCase']())if(_0x1c5b('0x4')!==typeof _0xb36c19&&_0x1c5b('0xc')===_0xb36c19[_0x1c5b('0x11')]())try{console[_0x1c5b('0xc')]['apply'](console,_0x4dcca6);}catch(_0x20d64c){console[_0x1c5b('0xc')](_0x4dcca6[_0x1c5b('0x9')]('\x0a'));}else try{console[_0x1c5b('0x13')][_0x1c5b('0x14')](console,_0x4dcca6);}catch(_0xaf353a){console[_0x1c5b('0x13')](_0x4dcca6[_0x1c5b('0x9')]('\x0a'));}else try{console[_0x1c5b('0xd')]['apply'](console,_0x4dcca6);}catch(_0x3e021a){console['warn'](_0x4dcca6[_0x1c5b('0x9')]('\x0a'));}}};var _0xd0e8aa=/[0-9]+\%/i;var _0x3244d6=/[0-9\.]+(?=\%)/i;var _0x5b964d={'isDiscountFlag':function(_0x3cd3a0){if(_0x3cd3a0[_0x1c5b('0x15')]()[_0x1c5b('0x16')](_0xd0e8aa)>-0x1)return!![];return![];},'getDiscountValue':function(_0x4ce2f5){return _0x4ce2f5['text']()[_0x1c5b('0x17')](_0x3244d6);},'startedByWrapper':![],'flagElement':_0x1c5b('0x18'),'wrapperElement':'li','filterFlagBy':_0x1c5b('0x19'),'forcePromotion':null,'appliedDiscount':null,'oneFlagByItem':!![],'isSmartCheckout':!![],'changeInstallments':![],'productPage':{'changeNativeSaveAmount':!![],'changeNativePrice':!![],'changeInstallments':![],'isProductPage':'auto','wrapperElement':_0x1c5b('0x1a'),'skuBestPrice':_0x1c5b('0x1b'),'installments':'label.skuBestInstallmentNumber','installmentValue':_0x1c5b('0x1c'),'skuPrice':_0x1c5b('0x1d')}};_0x10badc['fn']['QD_SmartPrice']=function(){};var _0x1f5f8d=function(_0x713d71){var _0x13e38f={'t':_0x1c5b('0x1e')};return function(_0x135818){var _0x1a8047,_0x8f543b,_0x11d0df,_0xa2a7e8;_0x8f543b=function(_0x4cbd8a){return _0x4cbd8a;};_0x11d0df=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x135818=_0x135818['d'+_0x11d0df[0x10]+'c'+_0x11d0df[0x11]+'m'+_0x8f543b(_0x11d0df[0x1])+'n'+_0x11d0df[0xd]]['l'+_0x11d0df[0x12]+'c'+_0x11d0df[0x0]+'ti'+_0x8f543b('o')+'n'];_0x1a8047=function(_0x3f59a3){return escape(encodeURIComponent(_0x3f59a3[_0x1c5b('0x3')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x255a62){return String['fromCharCode'](('Z'>=_0x255a62?0x5a:0x7a)>=(_0x255a62=_0x255a62['charCodeAt'](0x0)+0xd)?_0x255a62:_0x255a62-0x1a);})));};var _0x511ca9=_0x1a8047(_0x135818[[_0x11d0df[0x9],_0x8f543b('o'),_0x11d0df[0xc],_0x11d0df[_0x8f543b(0xd)]]['join']('')]);_0x1a8047=_0x1a8047((window[['js',_0x8f543b('no'),'m',_0x11d0df[0x1],_0x11d0df[0x4][_0x1c5b('0x1f')](),'ite'][_0x1c5b('0x9')]('')]||_0x1c5b('0x20'))+['.v',_0x11d0df[0xd],'e',_0x8f543b('x'),'co',_0x8f543b('mm'),_0x1c5b('0x21'),_0x11d0df[0x1],'.c',_0x8f543b('o'),'m.',_0x11d0df[0x13],'r'][_0x1c5b('0x9')](''));for(var _0x584e9e in _0x13e38f){if(_0x1a8047===_0x584e9e+_0x13e38f[_0x584e9e]||_0x511ca9===_0x584e9e+_0x13e38f[_0x584e9e]){_0xa2a7e8='tr'+_0x11d0df[0x11]+'e';break;}_0xa2a7e8='f'+_0x11d0df[0x0]+'ls'+_0x8f543b(_0x11d0df[0x1])+'';}_0x8f543b=!0x1;-0x1<_0x135818[[_0x11d0df[0xc],'e',_0x11d0df[0x0],'rc',_0x11d0df[0x9]][_0x1c5b('0x9')]('')][_0x1c5b('0x22')](_0x1c5b('0x23'))&&(_0x8f543b=!0x0);return[_0xa2a7e8,_0x8f543b];}(_0x713d71);}(window);if(!eval(_0x1f5f8d[0x0]))return _0x1f5f8d[0x1]?_0x1268a9(_0x1c5b('0x24')):!0x1;var _0x32779c=function(_0x4e1281,_0x2d0151){'use strict';var _0x1832f2=function(_0x567d1b){'use strict';var _0x4c36d5,_0x2726a7,_0x319356,_0x4da929,_0x429d7f,_0x1f94c6,_0x5ef2fb,_0x107751,_0x269853,_0x42f18f,_0x1b741,_0x327a2b,_0x578756,_0x5d3408,_0x258232,_0x16c1d7,_0x83f3bd,_0x3ea809,_0xef4e1;var _0x3d5e40=_0x10badc(this);_0x567d1b=typeof _0x567d1b==='undefined'?![]:_0x567d1b;if(_0x2d0151[_0x1c5b('0x25')][_0x1c5b('0x26')])var _0x2233d6=_0x3d5e40[_0x1c5b('0x27')](_0x2d0151[_0x1c5b('0x25')][_0x1c5b('0x28')]);else var _0x2233d6=_0x3d5e40[_0x1c5b('0x27')](_0x2d0151['wrapperElement']);if(!_0x567d1b&&!_0x3d5e40['is'](_0x2d0151[_0x1c5b('0x29')])){if(_0x2d0151['productPage'][_0x1c5b('0x26')]&&_0x2233d6['is'](_0x2d0151[_0x1c5b('0x25')][_0x1c5b('0x28')])){_0x2233d6[_0x1c5b('0x2a')](_0x2d0151[_0x1c5b('0x25')]['skuBestPrice'])[_0x1c5b('0x2b')](_0x1c5b('0x2c'));_0x2233d6[_0x1c5b('0x2b')]('qd-sp-active');}return;}var _0x44b842=_0x2d0151[_0x1c5b('0x25')][_0x1c5b('0x26')];if(_0x3d5e40['is']('.qd_sp_on,\x20.qd_sp_ignored')&&!_0x44b842)return;if(_0x44b842){_0x107751=_0x2233d6[_0x1c5b('0x2a')](_0x2d0151[_0x1c5b('0x25')][_0x1c5b('0x2d')]);if(_0x107751['find'](_0x1c5b('0x2e'))[_0x1c5b('0x8')])return;_0x107751[_0x1c5b('0x2f')]('qd-active');_0x2233d6[_0x1c5b('0x2f')](_0x1c5b('0x30'));}if(_0x2d0151[_0x1c5b('0x31')]&&_0x3d5e40[_0x1c5b('0x32')](_0x1c5b('0x33'))[_0x1c5b('0x8')]){_0x3d5e40['addClass'](_0x1c5b('0x34'));return;}_0x3d5e40[_0x1c5b('0x2b')](_0x1c5b('0x35'));if(!_0x2d0151[_0x1c5b('0x36')](_0x3d5e40))return;if(_0x44b842){_0x319356={};var _0x1065e6=parseInt(_0x10badc(_0x1c5b('0x37'))[_0x1c5b('0x38')](_0x1c5b('0x39')),0xa);if(_0x1065e6){for(var _0x4402f2=0x0;_0x4402f2<skuJson['skus']['length'];_0x4402f2++){if(skuJson['skus'][_0x4402f2][_0x1c5b('0x3a')]==_0x1065e6){_0x319356=skuJson['skus'][_0x4402f2];break;}}}else{var _0x5c105f=0x5af3107a3fff;for(var _0xe1b2a2 in skuJson[_0x1c5b('0x3b')]){if(typeof skuJson[_0x1c5b('0x3b')][_0xe1b2a2]===_0x1c5b('0x0'))continue;if(!skuJson['skus'][_0xe1b2a2][_0x1c5b('0x3c')])continue;if(skuJson['skus'][_0xe1b2a2][_0x1c5b('0x3d')]<_0x5c105f){_0x5c105f=skuJson[_0x1c5b('0x3b')][_0xe1b2a2]['bestPrice'];_0x319356=skuJson[_0x1c5b('0x3b')][_0xe1b2a2];}}}}_0x16c1d7=!![];_0x83f3bd=0x0;if(_0x2d0151['isSmartCheckout']&&_0x3ea809){_0x16c1d7=skuJson['available'];if(!_0x16c1d7)return _0x2233d6['addClass'](_0x1c5b('0x3e'));}_0x2726a7=_0x2d0151[_0x1c5b('0x3f')](_0x3d5e40);_0x4c36d5=parseFloat(_0x2726a7,0xa);if(isNaN(_0x4c36d5))return _0x1268a9([_0x1c5b('0x40'),_0x3d5e40],'alerta');var _0x28f6a7=function(_0x4c7431){if(_0x44b842)_0x4da929=(_0x4c7431[_0x1c5b('0x3d')]||0x0)/0x64;else{_0x578756=_0x2233d6['find'](_0x1c5b('0x41'));_0x4da929=parseFloat((_0x578756[_0x1c5b('0x42')]()||'')['replace'](/[^0-9\.\,]+/i,'')[_0x1c5b('0x3')]('.','')[_0x1c5b('0x3')](',','.'),0xa);}if(isNaN(_0x4da929))return _0x1268a9([_0x1c5b('0x43'),_0x3d5e40,_0x2233d6]);if(_0x2d0151[_0x1c5b('0x44')]!==null){_0x5d3408=0x0;if(!isNaN(_0x2d0151[_0x1c5b('0x44')]))_0x5d3408=_0x2d0151[_0x1c5b('0x44')];else{_0x258232=_0x2233d6['find'](_0x2d0151['appliedDiscount']);if(_0x258232['length'])_0x5d3408=_0x2d0151[_0x1c5b('0x3f')](_0x258232);}_0x5d3408=parseFloat(_0x5d3408,0xa);if(isNaN(_0x5d3408))_0x5d3408=0x0;if(_0x5d3408!==0x0)_0x4da929=_0x4da929*0x64/(0x64-_0x5d3408);}if(_0x44b842)_0x429d7f=(_0x4c7431[_0x1c5b('0x45')]||0x0)/0x64;else _0x429d7f=parseFloat((_0x2233d6[_0x1c5b('0x2a')](_0x1c5b('0x46'))[_0x1c5b('0x42')]()||'')[_0x1c5b('0x3')](/[^0-9\.\,]+/i,'')['replace']('.','')['replace'](',','.'),0xa);if(isNaN(_0x429d7f))_0x429d7f=0.001;_0x1f94c6=_0x4da929*((0x64-_0x4c36d5)/0x64);if(_0x44b842&&_0x2d0151[_0x1c5b('0x25')][_0x1c5b('0x47')]){_0x107751[_0x1c5b('0x15')](_0x107751['text']()[_0x1c5b('0x2')]()[_0x1c5b('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x1f94c6,0x2,',','.')))[_0x1c5b('0x2b')](_0x1c5b('0x2c'));_0x2233d6[_0x1c5b('0x2b')]('qd-sp-active');}else{_0xef4e1=_0x2233d6['find'](_0x1c5b('0x48'));_0xef4e1[_0x1c5b('0x15')](_0xef4e1['text']()[_0x1c5b('0x3')](/[0-9\.]+,[0-9]+/i,'')+qd_number_format(_0x1f94c6,0x2,',','.'));}if(_0x44b842){_0x5ef2fb=_0x2233d6[_0x1c5b('0x2a')](_0x2d0151[_0x1c5b('0x25')][_0x1c5b('0x49')]);if(_0x5ef2fb[_0x1c5b('0x8')])_0x5ef2fb[_0x1c5b('0x15')](_0x5ef2fb[_0x1c5b('0x15')]()[_0x1c5b('0x2')]()[_0x1c5b('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x1f94c6,0x2,',','.')));}var _0x23b1e9=_0x2233d6['find'](_0x1c5b('0x4a'));_0x23b1e9[_0x1c5b('0x15')](_0x23b1e9[_0x1c5b('0x15')]()[_0x1c5b('0x3')](/[0-9]+\%/i,_0x4c36d5+'%'));var _0x26a161=function(_0x2cb268,_0x153cd6,_0x37b5d2){var _0x404480=_0x2233d6[_0x1c5b('0x2a')](_0x2cb268);if(_0x404480[_0x1c5b('0x8')])_0x404480[_0x1c5b('0x4b')](_0x404480['html']()[_0x1c5b('0x2')]()[_0x1c5b('0x3')](/[0-9]{1,2}/,_0x37b5d2?_0x37b5d2:_0x4c7431['installments']||0x0));var _0x23ac44=_0x2233d6[_0x1c5b('0x2a')](_0x153cd6);if(_0x23ac44[_0x1c5b('0x8')])_0x23ac44[_0x1c5b('0x4b')](_0x23ac44['html']()[_0x1c5b('0x2')]()['replace'](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x1f94c6/(_0x37b5d2?_0x37b5d2:_0x4c7431[_0x1c5b('0x4c')]||0x1),0x2,',','.')));};if(_0x44b842&&_0x2d0151[_0x1c5b('0x25')][_0x1c5b('0x4d')])_0x26a161(_0x2d0151[_0x1c5b('0x25')]['installments'],_0x2d0151[_0x1c5b('0x25')][_0x1c5b('0x4e')]);else if(_0x2d0151['changeInstallments'])_0x26a161(_0x1c5b('0x4f'),'.qd_sp_display_installmentValue',parseInt(_0x2233d6[_0x1c5b('0x2a')](_0x1c5b('0x50'))['val']()||0x1)||0x1);_0x2233d6[_0x1c5b('0x2a')](_0x1c5b('0x51'))[_0x1c5b('0x52')](qd_number_format(_0x429d7f-_0x1f94c6,0x2,',','.'));_0x2233d6[_0x1c5b('0x2a')](_0x1c5b('0x53'))[_0x1c5b('0x54')](qd_number_format((_0x429d7f-_0x1f94c6)*0x64/_0x429d7f,0x2,',','.'));if(_0x44b842&&_0x2d0151[_0x1c5b('0x25')][_0x1c5b('0x55')]){_0x10badc(_0x1c5b('0x56'))[_0x1c5b('0x57')](function(){_0x1b741=_0x10badc(this);_0x1b741[_0x1c5b('0x15')](_0x1b741[_0x1c5b('0x15')]()[_0x1c5b('0x2')]()[_0x1c5b('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x429d7f-_0x1f94c6,0x2,',','.')));_0x1b741['addClass'](_0x1c5b('0x2c'));});}};_0x28f6a7(_0x319356);if(_0x44b842)_0x10badc(window)['on'](_0x1c5b('0x58'),function(_0x2a4502,_0x2f8d07,_0x9f35c0){_0x28f6a7(_0x9f35c0);});_0x2233d6['addClass'](_0x1c5b('0x59'));if(!_0x44b842)_0x578756['addClass'](_0x1c5b('0x59'));};(_0x2d0151[_0x1c5b('0x5a')]?_0x4e1281['find'](_0x2d0151[_0x1c5b('0x5b')]):_0x4e1281)[_0x1c5b('0x57')](function(){_0x1832f2['call'](this,![]);});if(typeof _0x2d0151[_0x1c5b('0x5c')]=='string'){var _0x283010=_0x2d0151[_0x1c5b('0x5a')]?_0x4e1281:_0x4e1281['closest'](_0x2d0151['wrapperElement']);if(_0x2d0151[_0x1c5b('0x25')][_0x1c5b('0x26')])_0x283010=_0x283010[_0x1c5b('0x27')](_0x2d0151[_0x1c5b('0x25')]['wrapperElement'])[_0x1c5b('0x5d')](_0x1c5b('0x5e'));else _0x283010=_0x283010['find'](_0x1c5b('0x5f'));_0x283010[_0x1c5b('0x57')](function(){var _0x33b8fc=_0x10badc(_0x2d0151[_0x1c5b('0x5c')]);_0x33b8fc[_0x1c5b('0x38')]('style',_0x1c5b('0x60'));if(_0x2d0151['productPage'][_0x1c5b('0x26')])_0x10badc(this)['append'](_0x33b8fc);else _0x10badc(this)[_0x1c5b('0x61')](_0x33b8fc);_0x1832f2[_0x1c5b('0x62')](_0x33b8fc,!![]);});}};_0x10badc['fn'][_0x1c5b('0xa')]=function(_0x24d4e9){var _0x51aa1b=_0x10badc(this);if(!_0x51aa1b[_0x1c5b('0x8')])return _0x51aa1b;var _0x2daffa=_0x10badc['extend'](!![],{},_0x5b964d,_0x24d4e9);if(typeof _0x2daffa['productPage'][_0x1c5b('0x26')]!=_0x1c5b('0x63'))_0x2daffa['productPage'][_0x1c5b('0x26')]=_0x10badc(document[_0x1c5b('0x64')])['is'](_0x1c5b('0x65'));_0x32779c(_0x51aa1b,_0x2daffa);return _0x51aa1b;};}(this));
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
var _0x945c=['qdAjax','url','html','attr','getParent','.box-banner','insertBefore','hide','text','trim','data-qdam-value','[class*=\x27colunas\x27]','clone','qd-am-content-loaded','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','call','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','qd-am-has-ul','children',':not(ul)','qd-am-elem-','first','>li','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','qd-am-','-li','QuatroDigital.am.callback','extend','exec','.qd_amazing_menu_auto','closest','function','QD_amazingMenu','/qd-amazing-menu','object','undefined','info','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','aviso','toLowerCase','apply','join','error','qdAmAddNdx','each','addClass','qd-am-li-','qd-am-first','last','qd-am-last','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','ite','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','find','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-collection-wrapper'];(function(_0x13d341,_0x5dc075){var _0x173425=function(_0x17409f){while(--_0x17409f){_0x13d341['push'](_0x13d341['shift']());}};_0x173425(++_0x5dc075);}(_0x945c,0x72));var _0xc945=function(_0x12adf9,_0x1331c5){_0x12adf9=_0x12adf9-0x0;var _0x1b14da=_0x945c[_0x12adf9];return _0x1b14da;};(function(_0x73f9d6){_0x73f9d6['fn']['getParent']=_0x73f9d6['fn'][_0xc945('0x0')];}(jQuery));(function(_0x4c76db){var _0x328e5a;var _0x4b8353=jQuery;if(_0xc945('0x1')!==typeof _0x4b8353['fn'][_0xc945('0x2')]){var _0x409034={'url':_0xc945('0x3'),'callback':function(){},'ajaxCallback':function(){}};var _0xf08dc7=function(_0x10853b,_0x3fbaa0){if(_0xc945('0x4')===typeof console&&_0xc945('0x5')!==typeof console['error']&&_0xc945('0x5')!==typeof console[_0xc945('0x6')]&&_0xc945('0x5')!==typeof console[_0xc945('0x7')]){var _0x3a331a;_0xc945('0x4')===typeof _0x10853b?(_0x10853b[_0xc945('0x8')](_0xc945('0x9')),_0x3a331a=_0x10853b):_0x3a331a=[_0xc945('0x9')+_0x10853b];if('undefined'===typeof _0x3fbaa0||_0xc945('0xa')!==_0x3fbaa0['toLowerCase']()&&_0xc945('0xb')!==_0x3fbaa0[_0xc945('0xc')]())if(_0xc945('0x5')!==typeof _0x3fbaa0&&_0xc945('0x6')===_0x3fbaa0['toLowerCase']())try{console[_0xc945('0x6')][_0xc945('0xd')](console,_0x3a331a);}catch(_0x494d64){try{console[_0xc945('0x6')](_0x3a331a[_0xc945('0xe')]('\x0a'));}catch(_0xc60255){}}else try{console['error'][_0xc945('0xd')](console,_0x3a331a);}catch(_0x1b23eb){try{console[_0xc945('0xf')](_0x3a331a[_0xc945('0xe')]('\x0a'));}catch(_0x335560){}}else try{console[_0xc945('0x7')][_0xc945('0xd')](console,_0x3a331a);}catch(_0x5e3dce){try{console['warn'](_0x3a331a[_0xc945('0xe')]('\x0a'));}catch(_0x202f7d){}}}};_0x4b8353['fn'][_0xc945('0x10')]=function(){var _0x528172=_0x4b8353(this);_0x528172[_0xc945('0x11')](function(_0x60af2e){_0x4b8353(this)[_0xc945('0x12')](_0xc945('0x13')+_0x60af2e);});_0x528172['first']()[_0xc945('0x12')](_0xc945('0x14'));_0x528172[_0xc945('0x15')]()[_0xc945('0x12')](_0xc945('0x16'));return _0x528172;};_0x4b8353['fn'][_0xc945('0x2')]=function(){};_0x4c76db=function(_0x270640){var _0x505068={'t':_0xc945('0x17')};return function(_0x5e9d5a){var _0x199e37=function(_0x20ba22){return _0x20ba22;};var _0x59bf99=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5e9d5a=_0x5e9d5a['d'+_0x59bf99[0x10]+'c'+_0x59bf99[0x11]+'m'+_0x199e37(_0x59bf99[0x1])+'n'+_0x59bf99[0xd]]['l'+_0x59bf99[0x12]+'c'+_0x59bf99[0x0]+'ti'+_0x199e37('o')+'n'];var _0x8406a5=function(_0xefb628){return escape(encodeURIComponent(_0xefb628['replace'](/\./g,'¨')[_0xc945('0x18')](/[a-zA-Z]/g,function(_0x5ea3e9){return String[_0xc945('0x19')](('Z'>=_0x5ea3e9?0x5a:0x7a)>=(_0x5ea3e9=_0x5ea3e9['charCodeAt'](0x0)+0xd)?_0x5ea3e9:_0x5ea3e9-0x1a);})));};var _0x16281d=_0x8406a5(_0x5e9d5a[[_0x59bf99[0x9],_0x199e37('o'),_0x59bf99[0xc],_0x59bf99[_0x199e37(0xd)]][_0xc945('0xe')]('')]);_0x8406a5=_0x8406a5((window[['js',_0x199e37('no'),'m',_0x59bf99[0x1],_0x59bf99[0x4]['toUpperCase'](),_0xc945('0x1a')][_0xc945('0xe')]('')]||'---')+['.v',_0x59bf99[0xd],'e',_0x199e37('x'),'co',_0x199e37('mm'),_0xc945('0x1b'),_0x59bf99[0x1],'.c',_0x199e37('o'),'m.',_0x59bf99[0x13],'r'][_0xc945('0xe')](''));for(var _0x55b70a in _0x505068){if(_0x8406a5===_0x55b70a+_0x505068[_0x55b70a]||_0x16281d===_0x55b70a+_0x505068[_0x55b70a]){var _0x282ec7='tr'+_0x59bf99[0x11]+'e';break;}_0x282ec7='f'+_0x59bf99[0x0]+'ls'+_0x199e37(_0x59bf99[0x1])+'';}_0x199e37=!0x1;-0x1<_0x5e9d5a[[_0x59bf99[0xc],'e',_0x59bf99[0x0],'rc',_0x59bf99[0x9]][_0xc945('0xe')]('')][_0xc945('0x1c')](_0xc945('0x1d'))&&(_0x199e37=!0x0);return[_0x282ec7,_0x199e37];}(_0x270640);}(window);if(!eval(_0x4c76db[0x0]))return _0x4c76db[0x1]?_0xf08dc7('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x2cc75a=function(_0x56a8e5){var _0xc061a0=_0x56a8e5[_0xc945('0x1e')](_0xc945('0x1f'));var _0x479806=_0xc061a0[_0xc945('0x20')](_0xc945('0x21'));var _0xba8f1a=_0xc061a0['filter'](_0xc945('0x22'));if(_0x479806[_0xc945('0x23')]||_0xba8f1a[_0xc945('0x23')])_0x479806[_0xc945('0x24')]()[_0xc945('0x12')]('qd-am-banner-wrapper'),_0xba8f1a[_0xc945('0x24')]()[_0xc945('0x12')](_0xc945('0x25')),_0x4b8353[_0xc945('0x26')]({'url':_0x328e5a[_0xc945('0x27')],'dataType':_0xc945('0x28'),'success':function(_0x10d492){var _0x3d583e=_0x4b8353(_0x10d492);_0x479806[_0xc945('0x11')](function(){var _0x10d492=_0x4b8353(this);var _0x2d3920=_0x3d583e[_0xc945('0x1e')]('img[alt=\x27'+_0x10d492[_0xc945('0x29')]('data-qdam-value')+'\x27]');_0x2d3920[_0xc945('0x23')]&&(_0x2d3920['each'](function(){_0x4b8353(this)[_0xc945('0x2a')](_0xc945('0x2b'))['clone']()[_0xc945('0x2c')](_0x10d492);}),_0x10d492[_0xc945('0x2d')]());})['addClass']('qd-am-content-loaded');_0xba8f1a[_0xc945('0x11')](function(){var _0x10d492={};var _0x2e16ee=_0x4b8353(this);_0x3d583e[_0xc945('0x1e')]('h2')[_0xc945('0x11')](function(){if(_0x4b8353(this)[_0xc945('0x2e')]()[_0xc945('0x2f')]()['toLowerCase']()==_0x2e16ee[_0xc945('0x29')](_0xc945('0x30'))[_0xc945('0x2f')]()[_0xc945('0xc')]())return _0x10d492=_0x4b8353(this),!0x1;});_0x10d492[_0xc945('0x23')]&&(_0x10d492['each'](function(){_0x4b8353(this)['getParent'](_0xc945('0x31'))[_0xc945('0x32')]()[_0xc945('0x2c')](_0x2e16ee);}),_0x2e16ee['hide']());})[_0xc945('0x12')](_0xc945('0x33'));},'error':function(){_0xf08dc7(_0xc945('0x34')+_0x328e5a['url']+_0xc945('0x35'));},'complete':function(){_0x328e5a['ajaxCallback'][_0xc945('0x36')](this);_0x4b8353(window)[_0xc945('0x37')](_0xc945('0x38'),_0x56a8e5);},'clearQueueDelay':0xbb8});};_0x4b8353[_0xc945('0x2')]=function(_0x1d52b4){var _0x299d3c=_0x1d52b4[_0xc945('0x1e')](_0xc945('0x39'))[_0xc945('0x11')](function(){var _0x47977f=_0x4b8353(this);if(!_0x47977f[_0xc945('0x23')])return _0xf08dc7([_0xc945('0x3a'),_0x1d52b4],_0xc945('0xa'));_0x47977f['find']('li\x20>ul')[_0xc945('0x24')]()[_0xc945('0x12')](_0xc945('0x3b'));_0x47977f[_0xc945('0x1e')]('li')[_0xc945('0x11')](function(){var _0x2e642f=_0x4b8353(this);var _0x5b27fe=_0x2e642f[_0xc945('0x3c')](_0xc945('0x3d'));_0x5b27fe[_0xc945('0x23')]&&_0x2e642f[_0xc945('0x12')](_0xc945('0x3e')+_0x5b27fe[_0xc945('0x3f')]()[_0xc945('0x2e')]()[_0xc945('0x2f')]()['replaceSpecialChars']()[_0xc945('0x18')](/\./g,'')[_0xc945('0x18')](/\s/g,'-')['toLowerCase']());});var _0x2b4761=_0x47977f[_0xc945('0x1e')](_0xc945('0x40'))[_0xc945('0x10')]();_0x47977f[_0xc945('0x12')]('qd-amazing-menu');_0x2b4761=_0x2b4761[_0xc945('0x1e')](_0xc945('0x41'));_0x2b4761[_0xc945('0x11')](function(){var _0x119bd1=_0x4b8353(this);_0x119bd1[_0xc945('0x1e')](_0xc945('0x40'))['qdAmAddNdx']()['addClass'](_0xc945('0x42'));_0x119bd1['addClass'](_0xc945('0x43'));_0x119bd1[_0xc945('0x24')]()[_0xc945('0x12')]('qd-am-dropdown');});_0x2b4761[_0xc945('0x12')](_0xc945('0x44'));var _0xf118a4=0x0,_0x4c76db=function(_0x1629c4){_0xf118a4+=0x1;_0x1629c4=_0x1629c4['children']('li')['children']('*');_0x1629c4['length']&&(_0x1629c4['addClass'](_0xc945('0x45')+_0xf118a4),_0x4c76db(_0x1629c4));};_0x4c76db(_0x47977f);_0x47977f['add'](_0x47977f[_0xc945('0x1e')]('ul'))[_0xc945('0x11')](function(){var _0xfc5d27=_0x4b8353(this);_0xfc5d27[_0xc945('0x12')](_0xc945('0x46')+_0xfc5d27[_0xc945('0x3c')]('li')[_0xc945('0x23')]+_0xc945('0x47'));});});_0x2cc75a(_0x299d3c);_0x328e5a['callback'][_0xc945('0x36')](this);_0x4b8353(window)[_0xc945('0x37')](_0xc945('0x48'),_0x1d52b4);};_0x4b8353['fn']['QD_amazingMenu']=function(_0x13e8c7){var _0x20ff4d=_0x4b8353(this);if(!_0x20ff4d[_0xc945('0x23')])return _0x20ff4d;_0x328e5a=_0x4b8353[_0xc945('0x49')]({},_0x409034,_0x13e8c7);_0x20ff4d[_0xc945('0x4a')]=new _0x4b8353[(_0xc945('0x2'))](_0x4b8353(this));return _0x20ff4d;};_0x4b8353(function(){_0x4b8353(_0xc945('0x4b'))[_0xc945('0x2')]();});}}(this));

/* Quatro Digital Smart Cart */
var _0x4522=['.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalShipping','.qd-ddc-infoAllTotal','renderProductsList','dataOptionsCache','.qd-ddc-wrapper','exec','qd-ddc-prodLoaded','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','.qd-ddc-prodPrice','sellingPrice','.qd-ddc-quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','appendTo','address','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','aviso','actionButtons','cartIsEmpty','lastSku','[data-sku=\x27','outerHeight','qd-ddc-lastAdded','qd-ddc-lastAddedFixed','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','load','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','data-sku-index','changeQantity','data-sku','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','click.qd_ddc_minus','focusout.qd_ddc_change','removeProduct','stop','$1-$2$3','qdDdcLastPostalCode','calculateShipping','BRA','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','_QuatroDigital_AmountProduct','quantity','index','updateItems','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','ajaxStop','.qdDdcContainer','QD_smartCart','dropDown','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','closest','replace','abs','undefined','pow','round','toFixed','split','length','join','function','prototype','trim','capitalize','toUpperCase','toLowerCase','qdAjax','qdAjaxQueue','jquery','000','error','extend','object','data','stringify','toString','jqXHR','ajax','done','success','fail','always','complete','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','message','4.0','getParent','checkout','getOrderForm','call','QuatroDigital_simpleCart','ajaxStopOn','simpleCart','warn','info','[Simple\x20Cart]\x0a','add','QD_simpleCart','elements','.qd_cart_qtt','meta[name=currency]','content','each','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','Shipping','value','total','currencySymbol','shipping','allTotal','qtt','showQuantityByItems','items','callback','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','.singular','show','hide','filter','.plural','addClass','removeClass','qd-emptyCart','O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','alerta','html','cartQttE','$this','find','cartTotalE','cartTotal','itemsTextE','itemsText','emptyElem','emptyCart','qd-sc-populated','smartCheckout','_QuatroDigital_DropDown','vtexjs','SDK','QD_checkoutQueue','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','trigger','simpleCartCallback.quatro_digital','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','bind','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Callbacks','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','apply','.productInformationWrapper\x20\x20a.buy-button','input.buy-in-page-quantity','javascript:','body','.productQuickView','Produto\x20adicionado\x20ao\x20carrinho!','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','location','isSmartCheckout','click.qd_bb_buy_sc','allowBuyClick','clickBuySmartCheckout','preventDefault','Método\x20descontinuado!','buyButton','.qd-sbb-on','qd-sbb-on','.remove-href','qd-bb-active','children','.qd-bb-productAdded','append','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','.buy-in-page-button','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','href','qd-bb-itemAddBuyButtonWrapper','qd-bb-itemAddCartWrapper','timeRemoveNewItemClass','getCartInfoByUrl','allowUpdate','autoWatchBuyButton','unbind','click','attr','indexOf','selectSkuMsg','redirect=false','redirect=true','buyIfQuantityZeroed','match','push','productPageCallback','buyButtonClickCallback','prodAdd','ku=','pop','shift','asyncCallback','productAddedToCart','fakeRequest','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','QD_buyButton','.qd-bb-itemAddWrapper','prepend','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','QuatroDigital.qd_bb_prod_add','ajaxSend','url','/checkout/cart/add','productAddedToCart.qdSbbVtex','Oooops!\x20','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','ite','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','QD_dropDownCart','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','keyup.qd_ddc_closeFn','keyCode','qd-bb-lightBoxProdAdd','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20input','val','keyup.qd_ddc_cep','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','mouseleave.qd_ddc_hover','texts','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','linkCart','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal'];(function(_0x3ea913,_0x255df2){var _0x2b4f28=function(_0x48bb25){while(--_0x48bb25){_0x3ea913['push'](_0x3ea913['shift']());}};_0x2b4f28(++_0x255df2);}(_0x4522,0x1a0));var _0x2452=function(_0x486fe6,_0x24f460){_0x486fe6=_0x486fe6-0x0;var _0x20a614=_0x4522[_0x486fe6];return _0x20a614;};(function(_0x2606f1){_0x2606f1['fn']['getParent']=_0x2606f1['fn'][_0x2452('0x0')];}(jQuery));function qd_number_format(_0xa5f6b7,_0x4a08d4,_0x5080f5,_0x229028){_0xa5f6b7=(_0xa5f6b7+'')[_0x2452('0x1')](/[^0-9+\-Ee.]/g,'');_0xa5f6b7=isFinite(+_0xa5f6b7)?+_0xa5f6b7:0x0;_0x4a08d4=isFinite(+_0x4a08d4)?Math[_0x2452('0x2')](_0x4a08d4):0x0;_0x229028=_0x2452('0x3')===typeof _0x229028?',':_0x229028;_0x5080f5=_0x2452('0x3')===typeof _0x5080f5?'.':_0x5080f5;var _0x226578='',_0x226578=function(_0x2f0139,_0x149807){var _0x4a08d4=Math[_0x2452('0x4')](0xa,_0x149807);return''+(Math[_0x2452('0x5')](_0x2f0139*_0x4a08d4)/_0x4a08d4)[_0x2452('0x6')](_0x149807);},_0x226578=(_0x4a08d4?_0x226578(_0xa5f6b7,_0x4a08d4):''+Math[_0x2452('0x5')](_0xa5f6b7))[_0x2452('0x7')]('.');0x3<_0x226578[0x0]['length']&&(_0x226578[0x0]=_0x226578[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x229028));(_0x226578[0x1]||'')[_0x2452('0x8')]<_0x4a08d4&&(_0x226578[0x1]=_0x226578[0x1]||'',_0x226578[0x1]+=Array(_0x4a08d4-_0x226578[0x1]['length']+0x1)['join']('0'));return _0x226578[_0x2452('0x9')](_0x5080f5);};_0x2452('0xa')!==typeof String[_0x2452('0xb')][_0x2452('0xc')]&&(String[_0x2452('0xb')][_0x2452('0xc')]=function(){return this[_0x2452('0x1')](/^\s+|\s+$/g,'');});_0x2452('0xa')!=typeof String['prototype']['capitalize']&&(String['prototype'][_0x2452('0xd')]=function(){return this['charAt'](0x0)[_0x2452('0xe')]()+this['slice'](0x1)[_0x2452('0xf')]();});(function(_0x42efdf){if('function'!==typeof _0x42efdf[_0x2452('0x10')]){var _0x47930c={};_0x42efdf[_0x2452('0x11')]=_0x47930c;0x96>parseInt((_0x42efdf['fn'][_0x2452('0x12')][_0x2452('0x1')](/[^0-9]+/g,'')+_0x2452('0x13'))['slice'](0x0,0x3),0xa)&&console&&_0x2452('0xa')==typeof console[_0x2452('0x14')]&&console['error']();_0x42efdf['qdAjax']=function(_0x1bfb44){try{var _0x37c6a6=_0x42efdf[_0x2452('0x15')]({},{'url':'','type':'GET','data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x1bfb44);var _0x914d2b=_0x2452('0x16')===typeof _0x37c6a6[_0x2452('0x17')]?JSON[_0x2452('0x18')](_0x37c6a6[_0x2452('0x17')]):_0x37c6a6[_0x2452('0x17')][_0x2452('0x19')]();var _0xea452e=encodeURIComponent(_0x37c6a6['url']+'|'+_0x37c6a6['type']+'|'+_0x914d2b);_0x47930c[_0xea452e]=_0x47930c[_0xea452e]||{};_0x2452('0x3')==typeof _0x47930c[_0xea452e][_0x2452('0x1a')]?_0x47930c[_0xea452e]['jqXHR']=_0x42efdf[_0x2452('0x1b')](_0x37c6a6):(_0x47930c[_0xea452e][_0x2452('0x1a')][_0x2452('0x1c')](_0x37c6a6[_0x2452('0x1d')]),_0x47930c[_0xea452e][_0x2452('0x1a')][_0x2452('0x1e')](_0x37c6a6[_0x2452('0x14')]),_0x47930c[_0xea452e]['jqXHR'][_0x2452('0x1f')](_0x37c6a6[_0x2452('0x20')]));_0x47930c[_0xea452e][_0x2452('0x1a')][_0x2452('0x1f')](function(){isNaN(parseInt(_0x37c6a6[_0x2452('0x21')]))||setTimeout(function(){_0x47930c[_0xea452e]['jqXHR']=void 0x0;},_0x37c6a6['clearQueueDelay']);});return _0x47930c[_0xea452e][_0x2452('0x1a')];}catch(_0x159ba1){_0x2452('0x3')!==typeof console&&_0x2452('0xa')===typeof console[_0x2452('0x14')]&&console['error'](_0x2452('0x22')+_0x159ba1[_0x2452('0x23')]);}};_0x42efdf['qdAjax']['version']=_0x2452('0x24');}}(jQuery));(function(_0xe8d39b){_0xe8d39b['fn'][_0x2452('0x25')]=_0xe8d39b['fn'][_0x2452('0x0')];}(jQuery));(function(){var _0x43fde0=jQuery;if(_0x2452('0xa')!==typeof _0x43fde0['fn']['simpleCart']){_0x43fde0(function(){var _0x5da9aa=vtexjs[_0x2452('0x26')][_0x2452('0x27')];vtexjs[_0x2452('0x26')]['getOrderForm']=function(){return _0x5da9aa[_0x2452('0x28')]();};});try{window[_0x2452('0x29')]=window['QuatroDigital_simpleCart']||{};window[_0x2452('0x29')][_0x2452('0x2a')]=!0x1;_0x43fde0['fn'][_0x2452('0x2b')]=function(_0xe97b1c,_0x334aba,_0x320310){var _0x312f1b=function(_0x115e09,_0x3b96aa){if(_0x2452('0x16')===typeof console){var _0x304ab7=_0x2452('0x16')===typeof _0x115e09;_0x2452('0x3')!==typeof _0x3b96aa&&'alerta'===_0x3b96aa[_0x2452('0xf')]()?_0x304ab7?console[_0x2452('0x2c')]('[Simple\x20Cart]\x0a',_0x115e09[0x0],_0x115e09[0x1],_0x115e09[0x2],_0x115e09[0x3],_0x115e09[0x4],_0x115e09[0x5],_0x115e09[0x6],_0x115e09[0x7]):console[_0x2452('0x2c')]('[Simple\x20Cart]\x0a'+_0x115e09):_0x2452('0x3')!==typeof _0x3b96aa&&_0x2452('0x2d')===_0x3b96aa['toLowerCase']()?_0x304ab7?console[_0x2452('0x2d')](_0x2452('0x2e'),_0x115e09[0x0],_0x115e09[0x1],_0x115e09[0x2],_0x115e09[0x3],_0x115e09[0x4],_0x115e09[0x5],_0x115e09[0x6],_0x115e09[0x7]):console[_0x2452('0x2d')]('[Simple\x20Cart]\x0a'+_0x115e09):_0x304ab7?console[_0x2452('0x14')](_0x2452('0x2e'),_0x115e09[0x0],_0x115e09[0x1],_0x115e09[0x2],_0x115e09[0x3],_0x115e09[0x4],_0x115e09[0x5],_0x115e09[0x6],_0x115e09[0x7]):console['error'](_0x2452('0x2e')+_0x115e09);}};var _0x2e35ce=_0x43fde0(this);_0x2452('0x16')===typeof _0xe97b1c?_0x334aba=_0xe97b1c:(_0xe97b1c=_0xe97b1c||!0x1,_0x2e35ce=_0x2e35ce[_0x2452('0x2f')](_0x43fde0[_0x2452('0x30')]['elements']));if(!_0x2e35ce['length'])return _0x2e35ce;_0x43fde0['QD_simpleCart'][_0x2452('0x31')]=_0x43fde0[_0x2452('0x30')][_0x2452('0x31')][_0x2452('0x2f')](_0x2e35ce);_0x320310=_0x2452('0x3')===typeof _0x320310?!0x1:_0x320310;var _0x4c4c45={'cartQtt':_0x2452('0x32'),'cartTotal':'.qd_cart_total','itemsText':'.qd_items_text','currencySymbol':(_0x43fde0(_0x2452('0x33'))['attr'](_0x2452('0x34'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0xac3b74=_0x43fde0['extend']({},_0x4c4c45,_0x334aba);var _0x30b49f=_0x43fde0('');_0x2e35ce[_0x2452('0x35')](function(){var _0x28ca0f=_0x43fde0(this);_0x28ca0f[_0x2452('0x17')](_0x2452('0x36'))||_0x28ca0f[_0x2452('0x17')](_0x2452('0x36'),_0xac3b74);});var _0x46a561=function(_0x5b864e){window[_0x2452('0x37')]=window['_QuatroDigital_CartData']||{};for(var _0xe97b1c=0x0,_0x2172dc=0x0,_0x56bd34=0x0;_0x56bd34<_0x5b864e[_0x2452('0x38')][_0x2452('0x8')];_0x56bd34++)_0x2452('0x39')==_0x5b864e[_0x2452('0x38')][_0x56bd34]['id']&&(_0x2172dc+=_0x5b864e[_0x2452('0x38')][_0x56bd34]['value']),_0xe97b1c+=_0x5b864e[_0x2452('0x38')][_0x56bd34][_0x2452('0x3a')];window['_QuatroDigital_CartData'][_0x2452('0x3b')]=_0xac3b74[_0x2452('0x3c')]+qd_number_format(_0xe97b1c/0x64,0x2,',','.');window[_0x2452('0x37')][_0x2452('0x3d')]=_0xac3b74['currencySymbol']+qd_number_format(_0x2172dc/0x64,0x2,',','.');window[_0x2452('0x37')][_0x2452('0x3e')]=_0xac3b74[_0x2452('0x3c')]+qd_number_format((_0xe97b1c+_0x2172dc)/0x64,0x2,',','.');window[_0x2452('0x37')][_0x2452('0x3f')]=0x0;if(_0xac3b74[_0x2452('0x40')])for(_0x56bd34=0x0;_0x56bd34<_0x5b864e['items'][_0x2452('0x8')];_0x56bd34++)window['_QuatroDigital_CartData'][_0x2452('0x3f')]+=_0x5b864e[_0x2452('0x41')][_0x56bd34]['quantity'];else window['_QuatroDigital_CartData']['qtt']=_0x5b864e['items'][_0x2452('0x8')]||0x0;try{window['_QuatroDigital_CartData'][_0x2452('0x42')]&&window['_QuatroDigital_CartData'][_0x2452('0x42')][_0x2452('0x43')]&&window['_QuatroDigital_CartData']['callback'][_0x2452('0x43')]();}catch(_0x4d9437){_0x312f1b(_0x2452('0x44'));}_0x43507c(_0x30b49f);};var _0x1cb30a=function(_0x34b735,_0x382ee3){0x1===_0x34b735?_0x382ee3['hide']()['filter'](_0x2452('0x45'))[_0x2452('0x46')]():_0x382ee3[_0x2452('0x47')]()[_0x2452('0x48')](_0x2452('0x49'))['show']();};var _0x382ddb=function(_0x52d935){0x1>_0x52d935?_0x2e35ce[_0x2452('0x4a')]('qd-emptyCart'):_0x2e35ce[_0x2452('0x4b')](_0x2452('0x4c'));};var _0x536536=function(_0x44b7aa,_0x49e542){var _0x252d09=parseInt(window['_QuatroDigital_CartData']['qtt'],0xa);_0x49e542['$this'][_0x2452('0x46')]();isNaN(_0x252d09)&&(_0x312f1b(_0x2452('0x4d'),_0x2452('0x4e')),_0x252d09=0x0);_0x49e542['cartTotalE'][_0x2452('0x4f')](window[_0x2452('0x37')][_0x2452('0x3b')]);_0x49e542[_0x2452('0x50')][_0x2452('0x4f')](_0x252d09);_0x1cb30a(_0x252d09,_0x49e542['itemsTextE']);_0x382ddb(_0x252d09);};var _0x43507c=function(_0x52d286){_0x2e35ce[_0x2452('0x35')](function(){var _0x44a6f={};var _0x1818a9=_0x43fde0(this);_0xe97b1c&&_0x1818a9[_0x2452('0x17')](_0x2452('0x36'))&&_0x43fde0[_0x2452('0x15')](_0xac3b74,_0x1818a9[_0x2452('0x17')](_0x2452('0x36')));_0x44a6f[_0x2452('0x51')]=_0x1818a9;_0x44a6f['cartQttE']=_0x1818a9[_0x2452('0x52')](_0xac3b74['cartQtt'])||_0x30b49f;_0x44a6f[_0x2452('0x53')]=_0x1818a9['find'](_0xac3b74[_0x2452('0x54')])||_0x30b49f;_0x44a6f[_0x2452('0x55')]=_0x1818a9['find'](_0xac3b74[_0x2452('0x56')])||_0x30b49f;_0x44a6f[_0x2452('0x57')]=_0x1818a9[_0x2452('0x52')](_0xac3b74[_0x2452('0x58')])||_0x30b49f;_0x536536(_0x52d286,_0x44a6f);_0x1818a9[_0x2452('0x4a')](_0x2452('0x59'));});};(function(){if(_0xac3b74[_0x2452('0x5a')]){window[_0x2452('0x5b')]=window[_0x2452('0x5b')]||{};if(_0x2452('0x3')!==typeof window[_0x2452('0x5b')]['getOrderForm']&&(_0x320310||!_0xe97b1c))return _0x46a561(window[_0x2452('0x5b')]['getOrderForm']);if(_0x2452('0x16')!==typeof window['vtexjs']||_0x2452('0x3')===typeof window[_0x2452('0x5c')][_0x2452('0x26')])if(_0x2452('0x16')===typeof vtex&&_0x2452('0x16')===typeof vtex[_0x2452('0x26')]&&_0x2452('0x3')!==typeof vtex[_0x2452('0x26')][_0x2452('0x5d')])new vtex[(_0x2452('0x26'))][(_0x2452('0x5d'))]();else return _0x312f1b('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x43fde0[_0x2452('0x5e')]([_0x2452('0x41'),_0x2452('0x38'),_0x2452('0x5f')],{'done':function(_0x12aa96){_0x46a561(_0x12aa96);window[_0x2452('0x5b')]['getOrderForm']=_0x12aa96;},'fail':function(_0x356485){_0x312f1b([_0x2452('0x60'),_0x356485]);}});}else alert('Esta\x20é\x20uma\x20função\x20descontinuada\x20=/');}());_0xac3b74[_0x2452('0x42')]();_0x43fde0(window)[_0x2452('0x61')](_0x2452('0x62'));return _0x2e35ce;};_0x43fde0[_0x2452('0x30')]={'elements':_0x43fde0('')};_0x43fde0(function(){var _0x2f1b16;_0x2452('0xa')===typeof window[_0x2452('0x63')]&&(_0x2f1b16=window[_0x2452('0x63')],window[_0x2452('0x63')]=function(_0x34f31a,_0x243b85,_0x58d25b,_0x5cf96b,_0x288bbc){_0x2f1b16['call'](this,_0x34f31a,_0x243b85,_0x58d25b,_0x5cf96b,function(){_0x2452('0xa')===typeof _0x288bbc&&_0x288bbc();_0x43fde0[_0x2452('0x30')][_0x2452('0x31')][_0x2452('0x35')](function(){var _0x1b3450=_0x43fde0(this);_0x1b3450[_0x2452('0x2b')](_0x1b3450['data']('qd_simpleCartOpts'));});});});});var _0x19d6c7=window['ReloadItemsCart']||void 0x0;window[_0x2452('0x64')]=function(_0x59e9b3){_0x43fde0['fn'][_0x2452('0x2b')](!0x0);_0x2452('0xa')===typeof _0x19d6c7?_0x19d6c7[_0x2452('0x28')](this,_0x59e9b3):alert(_0x59e9b3);};_0x43fde0(function(){var _0x2ecd87=_0x43fde0('.qd_cart_auto');_0x2ecd87['length']&&_0x2ecd87['simpleCart']();});_0x43fde0(function(){_0x43fde0(window)[_0x2452('0x65')](_0x2452('0x66'),function(){_0x43fde0['fn']['simpleCart'](!0x0);});});}catch(_0x4f1891){'undefined'!==typeof console&&'function'===typeof console['error']&&console[_0x2452('0x14')]('Oooops!\x20',_0x4f1891);}}}());(function(){var _0x513815=function(_0x24318a,_0x34121d){if('object'===typeof console){var _0x3f5a32=_0x2452('0x16')===typeof _0x24318a;_0x2452('0x3')!==typeof _0x34121d&&'alerta'===_0x34121d['toLowerCase']()?_0x3f5a32?console[_0x2452('0x2c')](_0x2452('0x67'),_0x24318a[0x0],_0x24318a[0x1],_0x24318a[0x2],_0x24318a[0x3],_0x24318a[0x4],_0x24318a[0x5],_0x24318a[0x6],_0x24318a[0x7]):console[_0x2452('0x2c')](_0x2452('0x67')+_0x24318a):_0x2452('0x3')!==typeof _0x34121d&&_0x2452('0x2d')===_0x34121d[_0x2452('0xf')]()?_0x3f5a32?console[_0x2452('0x2d')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x24318a[0x0],_0x24318a[0x1],_0x24318a[0x2],_0x24318a[0x3],_0x24318a[0x4],_0x24318a[0x5],_0x24318a[0x6],_0x24318a[0x7]):console[_0x2452('0x2d')](_0x2452('0x67')+_0x24318a):_0x3f5a32?console[_0x2452('0x14')](_0x2452('0x67'),_0x24318a[0x0],_0x24318a[0x1],_0x24318a[0x2],_0x24318a[0x3],_0x24318a[0x4],_0x24318a[0x5],_0x24318a[0x6],_0x24318a[0x7]):console['error'](_0x2452('0x67')+_0x24318a);}},_0x31e47b=null,_0x1be7ae={},_0x3ce2e0={},_0x6cf3d0={};$[_0x2452('0x5e')]=function(_0x5d5926,_0x20f796){if(null===_0x31e47b)if(_0x2452('0x16')===typeof window[_0x2452('0x5c')]&&_0x2452('0x3')!==typeof window[_0x2452('0x5c')][_0x2452('0x26')])_0x31e47b=window[_0x2452('0x5c')][_0x2452('0x26')];else return _0x513815('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js');var _0x4f21e7=$[_0x2452('0x15')]({'done':function(){},'fail':function(){}},_0x20f796),_0x2d4bad=_0x5d5926[_0x2452('0x9')](';'),_0x113266=function(){_0x1be7ae[_0x2d4bad]['add'](_0x4f21e7[_0x2452('0x1c')]);_0x3ce2e0[_0x2d4bad][_0x2452('0x2f')](_0x4f21e7[_0x2452('0x1e')]);};_0x6cf3d0[_0x2d4bad]?_0x113266():(_0x1be7ae[_0x2d4bad]=$[_0x2452('0x68')](),_0x3ce2e0[_0x2d4bad]=$['Callbacks'](),_0x113266(),_0x6cf3d0[_0x2d4bad]=!0x0,_0x31e47b[_0x2452('0x27')](_0x5d5926)[_0x2452('0x1c')](function(_0x3f7d21){_0x6cf3d0[_0x2d4bad]=!0x1;_0x1be7ae[_0x2d4bad][_0x2452('0x43')](_0x3f7d21);})['fail'](function(_0x48fe8f){_0x6cf3d0[_0x2d4bad]=!0x1;_0x3ce2e0[_0x2d4bad][_0x2452('0x43')](_0x48fe8f);}));};}());(function(_0x40378e){try{var _0x4c5192=jQuery,_0x388fb8,_0xe02ef1=_0x4c5192({}),_0x3ee8b8=function(_0x11b4da,_0x4110ed){if(_0x2452('0x16')===typeof console&&_0x2452('0x3')!==typeof console[_0x2452('0x14')]&&_0x2452('0x3')!==typeof console[_0x2452('0x2d')]&&_0x2452('0x3')!==typeof console[_0x2452('0x2c')]){var _0x326570;_0x2452('0x16')===typeof _0x11b4da?(_0x11b4da[_0x2452('0x69')]('[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a'),_0x326570=_0x11b4da):_0x326570=[_0x2452('0x6a')+_0x11b4da];if(_0x2452('0x3')===typeof _0x4110ed||_0x2452('0x4e')!==_0x4110ed['toLowerCase']()&&'aviso'!==_0x4110ed['toLowerCase']())if(_0x2452('0x3')!==typeof _0x4110ed&&_0x2452('0x2d')===_0x4110ed[_0x2452('0xf')]())try{console[_0x2452('0x2d')]['apply'](console,_0x326570);}catch(_0x5b5719){try{console['info'](_0x326570[_0x2452('0x9')]('\x0a'));}catch(_0x47a0e9){}}else try{console[_0x2452('0x14')]['apply'](console,_0x326570);}catch(_0x1aa7e4){try{console['error'](_0x326570[_0x2452('0x9')]('\x0a'));}catch(_0x54b831){}}else try{console[_0x2452('0x2c')][_0x2452('0x6b')](console,_0x326570);}catch(_0x20f27b){try{console[_0x2452('0x2c')](_0x326570[_0x2452('0x9')]('\x0a'));}catch(_0x5b364f){}}}},_0x19b52b={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0x2452('0x6c'),'buyQtt':_0x2452('0x6d'),'selectSkuMsg':_0x2452('0x6e'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0xb56b38,_0x285407,_0x46810e){_0x4c5192(_0x2452('0x6f'))['is'](_0x2452('0x70'))&&(_0x2452('0x1d')===_0x285407?alert(_0x2452('0x71')):(alert(_0x2452('0x72')),('object'===typeof parent?parent:document)[_0x2452('0x73')]['href']=_0x46810e));},'isProductPage':function(){return _0x4c5192(_0x2452('0x6f'))['is']('#produto,\x20.produto');},'execDefaultAction':function(_0x57bc06){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x4c5192['QD_buyButton']=function(_0x59119f,_0x5f5c4f){function _0x4f485c(_0x3e372d){_0x388fb8[_0x2452('0x74')]?_0x3e372d[_0x2452('0x17')]('qd-bb-click-active')||(_0x3e372d['data']('qd-bb-click-active',0x1),_0x3e372d['on'](_0x2452('0x75'),function(_0x2167dc){if(!_0x388fb8[_0x2452('0x76')]())return!0x0;if(!0x0!==_0x2dae0b[_0x2452('0x77')][_0x2452('0x28')](this))return _0x2167dc[_0x2452('0x78')](),!0x1;})):alert(_0x2452('0x79'));}function _0x4e861c(_0x4046d9){_0x4046d9=_0x4046d9||_0x4c5192(_0x388fb8[_0x2452('0x7a')]);_0x4046d9['each'](function(){var _0x4046d9=_0x4c5192(this);_0x4046d9['is'](_0x2452('0x7b'))||(_0x4046d9[_0x2452('0x4a')](_0x2452('0x7c')),_0x4046d9['is']('.btn-add-buy-button-asynchronous')&&!_0x4046d9['is'](_0x2452('0x7d'))||_0x4046d9['data'](_0x2452('0x7e'))||(_0x4046d9[_0x2452('0x17')](_0x2452('0x7e'),0x1),_0x4046d9[_0x2452('0x7f')](_0x2452('0x80'))['length']||_0x4046d9[_0x2452('0x81')](_0x2452('0x82')),_0x4046d9['is'](_0x2452('0x83'))&&_0x388fb8[_0x2452('0x84')]()&&_0x42b9ea['call'](_0x4046d9),_0x4f485c(_0x4046d9)));});_0x388fb8[_0x2452('0x84')]()&&!_0x4046d9[_0x2452('0x8')]&&_0x3ee8b8(_0x2452('0x85')+_0x4046d9[_0x2452('0x86')]+'\x27.',_0x2452('0x2d'));}var _0xcdd3dc=_0x4c5192(_0x59119f);var _0x2dae0b=this;window['_Quatro_Digital_dropDown']=window[_0x2452('0x87')]||{};window['_QuatroDigital_CartData']=window['_QuatroDigital_CartData']||{};_0x2dae0b['prodAdd']=function(_0x1b76e7,_0x1361b3){_0xcdd3dc[_0x2452('0x4a')](_0x2452('0x88'));_0x4c5192(_0x2452('0x6f'))[_0x2452('0x4a')](_0x2452('0x89'));var _0x2b3d15=_0x4c5192(_0x388fb8[_0x2452('0x7a')])['filter']('[href=\x27'+(_0x1b76e7['attr'](_0x2452('0x8a'))||'---')+'\x27]')['add'](_0x1b76e7);_0x2b3d15[_0x2452('0x4a')](_0x2452('0x8b'));setTimeout(function(){_0xcdd3dc[_0x2452('0x4b')](_0x2452('0x8c'));_0x2b3d15[_0x2452('0x4b')]('qd-bb-itemAddBuyButtonWrapper');},_0x388fb8[_0x2452('0x8d')]);window[_0x2452('0x87')][_0x2452('0x27')]=void 0x0;if(_0x2452('0x3')!==typeof _0x5f5c4f&&_0x2452('0xa')===typeof _0x5f5c4f['getCartInfoByUrl'])return _0x388fb8[_0x2452('0x74')]||(_0x3ee8b8('função\x20descontinuada'),_0x5f5c4f[_0x2452('0x8e')]()),window[_0x2452('0x5b')][_0x2452('0x27')]=void 0x0,_0x5f5c4f[_0x2452('0x8e')](function(_0x267f50){window[_0x2452('0x87')]['getOrderForm']=_0x267f50;_0x4c5192['fn']['simpleCart'](!0x0,void 0x0,!0x0);},{'lastSku':_0x1361b3});window[_0x2452('0x87')][_0x2452('0x8f')]=!0x0;_0x4c5192['fn'][_0x2452('0x2b')](!0x0);};(function(){if(_0x388fb8[_0x2452('0x74')]&&_0x388fb8[_0x2452('0x90')]){var _0x2e32f7=_0x4c5192('.btn-add-buy-button-asynchronous');_0x2e32f7[_0x2452('0x8')]&&_0x4e861c(_0x2e32f7);}}());var _0x42b9ea=function(){var _0x2a6c59=_0x4c5192(this);_0x2452('0x3')!==typeof _0x2a6c59['data'](_0x2452('0x7a'))?(_0x2a6c59[_0x2452('0x91')](_0x2452('0x92')),_0x4f485c(_0x2a6c59)):(_0x2a6c59[_0x2452('0x65')]('mouseenter.qd_bb_buy_sc',function(_0x4aa370){_0x2a6c59[_0x2452('0x91')](_0x2452('0x92'));_0x4f485c(_0x2a6c59);_0x4c5192(this)[_0x2452('0x91')](_0x4aa370);}),_0x4c5192(window)['load'](function(){_0x2a6c59[_0x2452('0x91')](_0x2452('0x92'));_0x4f485c(_0x2a6c59);_0x2a6c59['unbind']('mouseenter.qd_bb_buy_sc');}));};_0x2dae0b['clickBuySmartCheckout']=function(){var _0x13a901=_0x4c5192(this),_0x59119f=_0x13a901[_0x2452('0x93')]('href')||'';if(-0x1<_0x59119f[_0x2452('0x94')](_0x388fb8[_0x2452('0x95')]))return!0x0;_0x59119f=_0x59119f[_0x2452('0x1')](/redirect\=(false|true)/gi,'')['replace']('?','?redirect=false&')[_0x2452('0x1')](/\&\&/gi,'&');if(_0x388fb8['execDefaultAction'](_0x13a901))return _0x13a901[_0x2452('0x93')](_0x2452('0x8a'),_0x59119f['replace'](_0x2452('0x96'),_0x2452('0x97'))),!0x0;_0x59119f=_0x59119f[_0x2452('0x1')](/http.?:/i,'');_0xe02ef1['queue'](function(_0x247b43){if(!_0x388fb8[_0x2452('0x98')]&&!/(&|\?)qty\=[1-9][0-9]*/gi['test'](_0x59119f))return _0x247b43();var _0x2a8b72=function(_0x22a1f8,_0x3efbbc){var _0x4e861c=_0x59119f[_0x2452('0x99')](/sku\=([0-9]+)/gi),_0x3c9b07=[];if(_0x2452('0x16')===typeof _0x4e861c&&null!==_0x4e861c)for(var _0x4fd58a=_0x4e861c[_0x2452('0x8')]-0x1;0x0<=_0x4fd58a;_0x4fd58a--){var _0x114ffd=parseInt(_0x4e861c[_0x4fd58a][_0x2452('0x1')](/sku\=/gi,''));isNaN(_0x114ffd)||_0x3c9b07[_0x2452('0x9a')](_0x114ffd);}_0x388fb8[_0x2452('0x9b')][_0x2452('0x28')](this,_0x22a1f8,_0x3efbbc,_0x59119f);_0x2dae0b[_0x2452('0x9c')][_0x2452('0x28')](this,_0x22a1f8,_0x3efbbc,_0x59119f,_0x3c9b07);_0x2dae0b[_0x2452('0x9d')](_0x13a901,_0x59119f['split'](_0x2452('0x9e'))[_0x2452('0x9f')]()[_0x2452('0x7')]('&')[_0x2452('0xa0')]());_0x2452('0xa')===typeof _0x388fb8[_0x2452('0xa1')]&&_0x388fb8[_0x2452('0xa1')][_0x2452('0x28')](this);_0x4c5192(window)[_0x2452('0x61')](_0x2452('0xa2'));_0x4c5192(window)[_0x2452('0x61')]('cartProductAdded.vtex');};_0x388fb8[_0x2452('0xa3')]?(_0x2a8b72(null,_0x2452('0x1d')),_0x247b43()):_0x4c5192[_0x2452('0x1b')]({'url':_0x59119f,'complete':_0x2a8b72})['always'](function(){_0x247b43();});});};_0x2dae0b['buyButtonClickCallback']=function(_0x2f3da2,_0x5dafc1,_0x1afcce,_0x160997){try{_0x2452('0x1d')===_0x5dafc1&&_0x2452('0x16')===typeof window['parent']&&_0x2452('0xa')===typeof window[_0x2452('0xa4')][_0x2452('0xa5')]&&window[_0x2452('0xa4')][_0x2452('0xa5')](_0x2f3da2,_0x5dafc1,_0x1afcce,_0x160997);}catch(_0x2f96b8){_0x3ee8b8(_0x2452('0xa6'));}};_0x4e861c();_0x2452('0xa')===typeof _0x388fb8[_0x2452('0x42')]?_0x388fb8[_0x2452('0x42')][_0x2452('0x28')](this):_0x3ee8b8('Callback\x20não\x20é\x20uma\x20função');};var _0x51af5e=_0x4c5192['Callbacks']();_0x4c5192['fn'][_0x2452('0xa7')]=function(_0x364fc0,_0x430133){var _0x40378e=_0x4c5192(this);_0x2452('0x3')!==typeof _0x430133||_0x2452('0x16')!==typeof _0x364fc0||_0x364fc0 instanceof _0x4c5192||(_0x430133=_0x364fc0,_0x364fc0=void 0x0);_0x388fb8=_0x4c5192['extend']({},_0x19b52b,_0x430133);var _0x48cd3f;_0x51af5e[_0x2452('0x2f')](function(){_0x40378e[_0x2452('0x7f')](_0x2452('0xa8'))[_0x2452('0x8')]||_0x40378e[_0x2452('0xa9')](_0x2452('0xaa'));_0x48cd3f=new _0x4c5192[(_0x2452('0xa7'))](_0x40378e,_0x364fc0);});_0x51af5e[_0x2452('0x43')]();_0x4c5192(window)['on'](_0x2452('0xab'),function(_0x470d3b,_0x54f965,_0x35bf4c){_0x48cd3f[_0x2452('0x9d')](_0x54f965,_0x35bf4c);});return _0x4c5192[_0x2452('0x15')](_0x40378e,_0x48cd3f);};var _0x23ed2c=0x0;_0x4c5192(document)[_0x2452('0xac')](function(_0x444447,_0xf485ee,_0x2884b5){-0x1<_0x2884b5[_0x2452('0xad')][_0x2452('0xf')]()[_0x2452('0x94')](_0x2452('0xae'))&&(_0x23ed2c=(_0x2884b5[_0x2452('0xad')][_0x2452('0x99')](/sku\=([0-9]+)/i)||[''])[_0x2452('0x9f')]());});_0x4c5192(window)[_0x2452('0x65')](_0x2452('0xaf'),function(){_0x4c5192(window)[_0x2452('0x61')](_0x2452('0xab'),[new _0x4c5192(),_0x23ed2c]);});_0x4c5192(document)['ajaxStop'](function(){_0x51af5e[_0x2452('0x43')]();});}catch(_0x35365c){_0x2452('0x3')!==typeof console&&_0x2452('0xa')===typeof console[_0x2452('0x14')]&&console[_0x2452('0x14')](_0x2452('0xb0'),_0x35365c);}}(this));function qd_number_format(_0x5d9d31,_0x5cc96c,_0x3878e9,_0x327495){_0x5d9d31=(_0x5d9d31+'')[_0x2452('0x1')](/[^0-9+\-Ee.]/g,'');_0x5d9d31=isFinite(+_0x5d9d31)?+_0x5d9d31:0x0;_0x5cc96c=isFinite(+_0x5cc96c)?Math[_0x2452('0x2')](_0x5cc96c):0x0;_0x327495=_0x2452('0x3')===typeof _0x327495?',':_0x327495;_0x3878e9=_0x2452('0x3')===typeof _0x3878e9?'.':_0x3878e9;var _0x57d7c4='',_0x57d7c4=function(_0x20402d,_0x32f0f5){var _0xe486f7=Math[_0x2452('0x4')](0xa,_0x32f0f5);return''+(Math[_0x2452('0x5')](_0x20402d*_0xe486f7)/_0xe486f7)['toFixed'](_0x32f0f5);},_0x57d7c4=(_0x5cc96c?_0x57d7c4(_0x5d9d31,_0x5cc96c):''+Math[_0x2452('0x5')](_0x5d9d31))['split']('.');0x3<_0x57d7c4[0x0][_0x2452('0x8')]&&(_0x57d7c4[0x0]=_0x57d7c4[0x0][_0x2452('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x327495));(_0x57d7c4[0x1]||'')[_0x2452('0x8')]<_0x5cc96c&&(_0x57d7c4[0x1]=_0x57d7c4[0x1]||'',_0x57d7c4[0x1]+=Array(_0x5cc96c-_0x57d7c4[0x1]['length']+0x1)['join']('0'));return _0x57d7c4[_0x2452('0x9')](_0x3878e9);}(function(){try{window['_QuatroDigital_CartData']=window[_0x2452('0x37')]||{},window[_0x2452('0x37')][_0x2452('0x42')]=window[_0x2452('0x37')][_0x2452('0x42')]||$[_0x2452('0x68')]();}catch(_0x4e197a){'undefined'!==typeof console&&'function'===typeof console['error']&&console[_0x2452('0x14')](_0x2452('0xb0'),_0x4e197a['message']);}}());(function(_0x570709){try{var _0x637d0d=jQuery,_0x3afe7f=function(_0x4b6bc4,_0x3a8e0b){if(_0x2452('0x16')===typeof console&&_0x2452('0x3')!==typeof console[_0x2452('0x14')]&&_0x2452('0x3')!==typeof console[_0x2452('0x2d')]&&'undefined'!==typeof console[_0x2452('0x2c')]){var _0x147fcb;_0x2452('0x16')===typeof _0x4b6bc4?(_0x4b6bc4[_0x2452('0x69')](_0x2452('0xb1')),_0x147fcb=_0x4b6bc4):_0x147fcb=['[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'+_0x4b6bc4];if(_0x2452('0x3')===typeof _0x3a8e0b||_0x2452('0x4e')!==_0x3a8e0b['toLowerCase']()&&'aviso'!==_0x3a8e0b[_0x2452('0xf')]())if(_0x2452('0x3')!==typeof _0x3a8e0b&&_0x2452('0x2d')===_0x3a8e0b[_0x2452('0xf')]())try{console['info'][_0x2452('0x6b')](console,_0x147fcb);}catch(_0xd2fd1d){try{console[_0x2452('0x2d')](_0x147fcb[_0x2452('0x9')]('\x0a'));}catch(_0x36ab85){}}else try{console[_0x2452('0x14')][_0x2452('0x6b')](console,_0x147fcb);}catch(_0x2dae5b){try{console[_0x2452('0x14')](_0x147fcb['join']('\x0a'));}catch(_0x2f807c){}}else try{console['warn']['apply'](console,_0x147fcb);}catch(_0x46e20b){try{console[_0x2452('0x2c')](_0x147fcb[_0x2452('0x9')]('\x0a'));}catch(_0x1aecb1){}}}};window[_0x2452('0x5b')]=window['_QuatroDigital_DropDown']||{};window[_0x2452('0x5b')]['allowUpdate']=!0x0;_0x637d0d['QD_dropDownCart']=function(){};_0x637d0d['fn']['QD_dropDownCart']=function(){return{'fn':new _0x637d0d()};};var _0xedb8f0=function(_0x117391){var _0x199b53={'t':_0x2452('0xb2')};return function(_0x112643){var _0x1e45ff=function(_0x112345){return _0x112345;};var _0x37fa6a=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x112643=_0x112643['d'+_0x37fa6a[0x10]+'c'+_0x37fa6a[0x11]+'m'+_0x1e45ff(_0x37fa6a[0x1])+'n'+_0x37fa6a[0xd]]['l'+_0x37fa6a[0x12]+'c'+_0x37fa6a[0x0]+'ti'+_0x1e45ff('o')+'n'];var _0x33c328=function(_0x2c9ee1){return escape(encodeURIComponent(_0x2c9ee1['replace'](/\./g,'¨')[_0x2452('0x1')](/[a-zA-Z]/g,function(_0x4d1b93){return String['fromCharCode'](('Z'>=_0x4d1b93?0x5a:0x7a)>=(_0x4d1b93=_0x4d1b93[_0x2452('0xb3')](0x0)+0xd)?_0x4d1b93:_0x4d1b93-0x1a);})));};var _0x570709=_0x33c328(_0x112643[[_0x37fa6a[0x9],_0x1e45ff('o'),_0x37fa6a[0xc],_0x37fa6a[_0x1e45ff(0xd)]][_0x2452('0x9')]('')]);_0x33c328=_0x33c328((window[['js',_0x1e45ff('no'),'m',_0x37fa6a[0x1],_0x37fa6a[0x4][_0x2452('0xe')](),_0x2452('0xb4')][_0x2452('0x9')]('')]||'---')+['.v',_0x37fa6a[0xd],'e',_0x1e45ff('x'),'co',_0x1e45ff('mm'),_0x2452('0xb5'),_0x37fa6a[0x1],'.c',_0x1e45ff('o'),'m.',_0x37fa6a[0x13],'r'][_0x2452('0x9')](''));for(var _0x419529 in _0x199b53){if(_0x33c328===_0x419529+_0x199b53[_0x419529]||_0x570709===_0x419529+_0x199b53[_0x419529]){var _0x1a7495='tr'+_0x37fa6a[0x11]+'e';break;}_0x1a7495='f'+_0x37fa6a[0x0]+'ls'+_0x1e45ff(_0x37fa6a[0x1])+'';}_0x1e45ff=!0x1;-0x1<_0x112643[[_0x37fa6a[0xc],'e',_0x37fa6a[0x0],'rc',_0x37fa6a[0x9]][_0x2452('0x9')]('')][_0x2452('0x94')](_0x2452('0xb6'))&&(_0x1e45ff=!0x0);return[_0x1a7495,_0x1e45ff];}(_0x117391);}(window);if(!eval(_0xedb8f0[0x0]))return _0xedb8f0[0x1]?_0x3afe7f(_0x2452('0xb7')):!0x1;_0x637d0d[_0x2452('0xb8')]=function(_0x57043a,_0x26dbe2){var _0x3be01e=_0x637d0d(_0x57043a);if(!_0x3be01e[_0x2452('0x8')])return _0x3be01e;var _0x56d4ad=_0x637d0d[_0x2452('0x15')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':_0x2452('0xb9'),'cartTotal':_0x2452('0xba'),'emptyCart':_0x2452('0xbb'),'continueShopping':_0x2452('0xbc'),'shippingForm':_0x2452('0xbd')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x50cd5a){return _0x50cd5a[_0x2452('0xbe')]||_0x50cd5a['name'];},'callback':function(){},'callbackProductsList':function(){}},_0x26dbe2);_0x637d0d('');var _0x5bbe02=this;if(_0x56d4ad['smartCheckout']){var _0x3e3635=!0x1;'undefined'===typeof window[_0x2452('0x5c')]&&(_0x3afe7f('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN'),_0x637d0d[_0x2452('0x1b')]({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':!0x1,'dataType':_0x2452('0xbf'),'error':function(){_0x3afe7f(_0x2452('0xc0'));_0x3e3635=!0x0;}}));if(_0x3e3635)return _0x3afe7f(_0x2452('0xc1'));}if(_0x2452('0x16')===typeof window[_0x2452('0x5c')]&&_0x2452('0x3')!==typeof window['vtexjs'][_0x2452('0x26')])var _0x5a88f3=window[_0x2452('0x5c')][_0x2452('0x26')];else if(_0x2452('0x16')===typeof vtex&&_0x2452('0x16')===typeof vtex['checkout']&&'undefined'!==typeof vtex[_0x2452('0x26')][_0x2452('0x5d')])_0x5a88f3=new vtex[(_0x2452('0x26'))][(_0x2452('0x5d'))]();else return _0x3afe7f('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x5bbe02[_0x2452('0xc2')]=_0x2452('0xc3');var _0x5e29aa=function(_0x23d089){_0x637d0d(this)[_0x2452('0x81')](_0x23d089);_0x23d089[_0x2452('0x52')](_0x2452('0xc4'))['add'](_0x637d0d(_0x2452('0xc5')))['on'](_0x2452('0xc6'),function(){_0x3be01e['removeClass']('qd-bb-lightBoxProdAdd');_0x637d0d(document['body'])[_0x2452('0x4b')](_0x2452('0x89'));});_0x637d0d(document)['off']('keyup.qd_ddc_closeFn')['on'](_0x2452('0xc7'),function(_0x10001e){0x1b==_0x10001e[_0x2452('0xc8')]&&(_0x3be01e[_0x2452('0x4b')](_0x2452('0xc9')),_0x637d0d(document[_0x2452('0x6f')])[_0x2452('0x4b')](_0x2452('0x89')));});var _0xb8a149=_0x23d089[_0x2452('0x52')](_0x2452('0xca'));_0x23d089['find'](_0x2452('0xcb'))['on']('click.qd_ddc_scrollUp',function(){_0x5bbe02[_0x2452('0xcc')]('-',void 0x0,void 0x0,_0xb8a149);return!0x1;});_0x23d089[_0x2452('0x52')](_0x2452('0xcd'))['on'](_0x2452('0xce'),function(){_0x5bbe02['scrollCart'](void 0x0,void 0x0,void 0x0,_0xb8a149);return!0x1;});_0x23d089[_0x2452('0x52')](_0x2452('0xcf'))[_0x2452('0xd0')]('')['on'](_0x2452('0xd1'),function(){_0x5bbe02[_0x2452('0xd2')](_0x637d0d(this));});if(_0x56d4ad[_0x2452('0xd3')]){var _0x26dbe2=0x0;_0x637d0d(this)['on'](_0x2452('0xd4'),function(){var _0x23d089=function(){window[_0x2452('0x5b')]['allowUpdate']&&(_0x5bbe02['getCartInfoByUrl'](),window[_0x2452('0x5b')]['allowUpdate']=!0x1,_0x637d0d['fn'][_0x2452('0x2b')](!0x0),_0x5bbe02['cartIsEmpty']());};_0x26dbe2=setInterval(function(){_0x23d089();},0x258);_0x23d089();});_0x637d0d(this)['on'](_0x2452('0xd5'),function(){clearInterval(_0x26dbe2);});}};var _0x2286fc=function(_0x1373f0){_0x1373f0=_0x637d0d(_0x1373f0);_0x56d4ad[_0x2452('0xd6')][_0x2452('0x54')]=_0x56d4ad[_0x2452('0xd6')][_0x2452('0x54')][_0x2452('0x1')](_0x2452('0xd7'),_0x2452('0xd8'));_0x56d4ad['texts']['cartTotal']=_0x56d4ad[_0x2452('0xd6')][_0x2452('0x54')][_0x2452('0x1')](_0x2452('0xd9'),_0x2452('0xda'));_0x56d4ad[_0x2452('0xd6')][_0x2452('0x54')]=_0x56d4ad['texts'][_0x2452('0x54')]['replace']('#shipping',_0x2452('0xdb'));_0x56d4ad['texts'][_0x2452('0x54')]=_0x56d4ad['texts'][_0x2452('0x54')][_0x2452('0x1')](_0x2452('0xdc'),_0x2452('0xdd'));_0x1373f0[_0x2452('0x52')](_0x2452('0xde'))[_0x2452('0x4f')](_0x56d4ad[_0x2452('0xd6')][_0x2452('0xdf')]);_0x1373f0[_0x2452('0x52')]('.qd_ddc_continueShopping')[_0x2452('0x4f')](_0x56d4ad[_0x2452('0xd6')][_0x2452('0xe0')]);_0x1373f0[_0x2452('0x52')](_0x2452('0xe1'))[_0x2452('0x4f')](_0x56d4ad['texts'][_0x2452('0xe2')]);_0x1373f0[_0x2452('0x52')](_0x2452('0xe3'))[_0x2452('0x4f')](_0x56d4ad[_0x2452('0xd6')][_0x2452('0x54')]);_0x1373f0['find'](_0x2452('0xe4'))[_0x2452('0x4f')](_0x56d4ad[_0x2452('0xd6')][_0x2452('0xe5')]);_0x1373f0['find'](_0x2452('0xe6'))[_0x2452('0x4f')](_0x56d4ad['texts'][_0x2452('0x58')]);return _0x1373f0;}(this[_0x2452('0xc2')]);var _0x9cf21a=0x0;_0x3be01e[_0x2452('0x35')](function(){0x0<_0x9cf21a?_0x5e29aa[_0x2452('0x28')](this,_0x2286fc[_0x2452('0xe7')]()):_0x5e29aa['call'](this,_0x2286fc);_0x9cf21a++;});window[_0x2452('0x37')]['callback']['add'](function(){_0x637d0d(_0x2452('0xe8'))[_0x2452('0x4f')](window[_0x2452('0x37')]['total']||'--');_0x637d0d('.qd-ddc-infoTotalItems')[_0x2452('0x4f')](window[_0x2452('0x37')][_0x2452('0x3f')]||'0');_0x637d0d(_0x2452('0xe9'))[_0x2452('0x4f')](window[_0x2452('0x37')][_0x2452('0x3d')]||'--');_0x637d0d(_0x2452('0xea'))[_0x2452('0x4f')](window['_QuatroDigital_CartData']['allTotal']||'--');});var _0x48baf0=function(_0x3a79d9,_0xd86a41){if(_0x2452('0x3')===typeof _0x3a79d9[_0x2452('0x41')])return _0x3afe7f('Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição');_0x5bbe02[_0x2452('0xeb')][_0x2452('0x28')](this,_0xd86a41);};_0x5bbe02['getCartInfoByUrl']=function(_0x1bac69,_0x4eea3b){'undefined'!=typeof _0x4eea3b?window[_0x2452('0x5b')][_0x2452('0xec')]=_0x4eea3b:window[_0x2452('0x5b')][_0x2452('0xec')]&&(_0x4eea3b=window[_0x2452('0x5b')]['dataOptionsCache']);setTimeout(function(){window[_0x2452('0x5b')][_0x2452('0xec')]=void 0x0;},_0x56d4ad['timeRemoveNewItemClass']);_0x637d0d(_0x2452('0xed'))['removeClass']('qd-ddc-prodLoaded');if(_0x56d4ad[_0x2452('0x5a')]){var _0x26dbe2=function(_0x97a59f){window[_0x2452('0x5b')]['getOrderForm']=_0x97a59f;_0x48baf0(_0x97a59f,_0x4eea3b);_0x2452('0x3')!==typeof window['_QuatroDigital_AmountProduct']&&'function'===typeof window['_QuatroDigital_AmountProduct'][_0x2452('0xee')]&&window['_QuatroDigital_AmountProduct'][_0x2452('0xee')][_0x2452('0x28')](this);_0x637d0d(_0x2452('0xed'))[_0x2452('0x4a')](_0x2452('0xef'));};_0x2452('0x3')!==typeof window[_0x2452('0x5b')][_0x2452('0x27')]?(_0x26dbe2(window[_0x2452('0x5b')]['getOrderForm']),_0x2452('0xa')===typeof _0x1bac69&&_0x1bac69(window[_0x2452('0x5b')][_0x2452('0x27')])):_0x637d0d[_0x2452('0x5e')]([_0x2452('0x41'),_0x2452('0x38'),'shippingData'],{'done':function(_0x20c420){_0x26dbe2[_0x2452('0x28')](this,_0x20c420);_0x2452('0xa')===typeof _0x1bac69&&_0x1bac69(_0x20c420);},'fail':function(_0x5d062a){_0x3afe7f(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0x5d062a]);}});}else alert(_0x2452('0xf0'));};_0x5bbe02['cartIsEmpty']=function(){var _0x29cf27=_0x637d0d(_0x2452('0xed'));_0x29cf27[_0x2452('0x52')](_0x2452('0xf1'))[_0x2452('0x8')]?_0x29cf27[_0x2452('0x4b')](_0x2452('0xf2')):_0x29cf27['addClass']('qd-ddc-noItems');};_0x5bbe02[_0x2452('0xeb')]=function(_0x444cff){var _0x26dbe2=_0x637d0d(_0x2452('0xf3'));_0x26dbe2[_0x2452('0xf4')]();_0x26dbe2['each'](function(){var _0x26dbe2=_0x637d0d(this),_0x57043a,_0x263289,_0x17c60c=_0x637d0d(''),_0x565f58;for(_0x565f58 in window[_0x2452('0x5b')][_0x2452('0x27')][_0x2452('0x41')])if(_0x2452('0x16')===typeof window[_0x2452('0x5b')]['getOrderForm'][_0x2452('0x41')][_0x565f58]){var _0x4806e4=window[_0x2452('0x5b')]['getOrderForm']['items'][_0x565f58];var _0x519968=_0x4806e4[_0x2452('0xf5')][_0x2452('0x1')](/^\/|\/$/g,'')[_0x2452('0x7')]('/');var _0x291c20=_0x637d0d(_0x2452('0xf6'));_0x291c20[_0x2452('0x93')]({'data-sku':_0x4806e4['id'],'data-sku-index':_0x565f58,'data-qd-departament':_0x519968[0x0],'data-qd-category':_0x519968[_0x519968[_0x2452('0x8')]-0x1]});_0x291c20['addClass']('qd-ddc-'+_0x4806e4['availability']);_0x291c20['find']('.qd-ddc-prodName')['append'](_0x56d4ad[_0x2452('0xbe')](_0x4806e4));_0x291c20['find'](_0x2452('0xf7'))['append'](isNaN(_0x4806e4[_0x2452('0xf8')])?_0x4806e4[_0x2452('0xf8')]:0x0==_0x4806e4[_0x2452('0xf8')]?'Grátis':(_0x637d0d(_0x2452('0x33'))[_0x2452('0x93')](_0x2452('0x34'))||'R$')+'\x20'+qd_number_format(_0x4806e4[_0x2452('0xf8')]/0x64,0x2,',','.'));_0x291c20[_0x2452('0x52')](_0x2452('0xf9'))[_0x2452('0x93')]({'data-sku':_0x4806e4['id'],'data-sku-index':_0x565f58})['val'](_0x4806e4['quantity']);_0x291c20[_0x2452('0x52')](_0x2452('0xfa'))[_0x2452('0x93')]({'data-sku':_0x4806e4['id'],'data-sku-index':_0x565f58});_0x5bbe02[_0x2452('0xfb')](_0x4806e4['id'],_0x291c20['find'](_0x2452('0xfc')),_0x4806e4[_0x2452('0xfd')]);_0x291c20[_0x2452('0x52')]('.qd-ddc-quantityMore,.qd-ddc-quantityMinus')[_0x2452('0x93')]({'data-sku':_0x4806e4['id'],'data-sku-index':_0x565f58});_0x291c20[_0x2452('0xfe')](_0x26dbe2);_0x17c60c=_0x17c60c[_0x2452('0x2f')](_0x291c20);}try{var _0x484a16=_0x26dbe2[_0x2452('0x25')](_0x2452('0xed'))['find']('.qd-ddc-shipping\x20input');_0x484a16['length']&&''==_0x484a16[_0x2452('0xd0')]()&&window[_0x2452('0x5b')][_0x2452('0x27')]['shippingData'][_0x2452('0xff')]&&_0x484a16['val'](window['_QuatroDigital_DropDown'][_0x2452('0x27')][_0x2452('0x5f')][_0x2452('0xff')]['postalCode']);}catch(_0x401004){_0x3afe7f(_0x2452('0x100')+_0x401004[_0x2452('0x23')],_0x2452('0x101'));}_0x5bbe02[_0x2452('0x102')](_0x26dbe2);_0x5bbe02[_0x2452('0x103')]();_0x444cff&&_0x444cff[_0x2452('0x104')]&&function(){_0x263289=_0x17c60c[_0x2452('0x48')](_0x2452('0x105')+_0x444cff[_0x2452('0x104')]+'\x27]');_0x263289[_0x2452('0x8')]&&(_0x57043a=0x0,_0x17c60c[_0x2452('0x35')](function(){var _0x444cff=_0x637d0d(this);if(_0x444cff['is'](_0x263289))return!0x1;_0x57043a+=_0x444cff[_0x2452('0x106')]();}),_0x5bbe02[_0x2452('0xcc')](void 0x0,void 0x0,_0x57043a,_0x26dbe2[_0x2452('0x2f')](_0x26dbe2['parent']())),_0x17c60c[_0x2452('0x4b')]('qd-ddc-lastAddedFixed'),function(_0x56133a){_0x56133a[_0x2452('0x4a')](_0x2452('0x107'));_0x56133a['addClass'](_0x2452('0x108'));setTimeout(function(){_0x56133a['removeClass']('qd-ddc-lastAdded');},_0x56d4ad[_0x2452('0x8d')]);}(_0x263289));}();});(function(){_QuatroDigital_DropDown['getOrderForm'][_0x2452('0x41')][_0x2452('0x8')]?(_0x637d0d(_0x2452('0x6f'))[_0x2452('0x4b')](_0x2452('0x109'))[_0x2452('0x4a')](_0x2452('0x10a')),setTimeout(function(){_0x637d0d(_0x2452('0x6f'))[_0x2452('0x4b')](_0x2452('0x10b'));},_0x56d4ad[_0x2452('0x8d')])):_0x637d0d(_0x2452('0x6f'))[_0x2452('0x4b')](_0x2452('0x10c'))[_0x2452('0x4a')]('qd-ddc-cart-empty');}());_0x2452('0xa')===typeof _0x56d4ad[_0x2452('0x10d')]?_0x56d4ad['callbackProductsList'][_0x2452('0x28')](this):_0x3afe7f(_0x2452('0x10e'));};_0x5bbe02[_0x2452('0xfb')]=function(_0x432891,_0x3de2fa,_0x461852){function _0x5c92bc(){_0x3de2fa[_0x2452('0x4b')](_0x2452('0x10f'))[_0x2452('0x110')](function(){_0x637d0d(this)[_0x2452('0x4a')](_0x2452('0x10f'));})[_0x2452('0x93')](_0x2452('0x111'),_0x461852);}_0x461852?_0x5c92bc():isNaN(_0x432891)?_0x3afe7f(_0x2452('0x112'),_0x2452('0x4e')):alert('Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.');};_0x5bbe02[_0x2452('0x102')]=function(_0x40d4ed){var _0x53b6fc=function(_0x5c7d90,_0x42b19a){var _0x26dbe2=_0x637d0d(_0x5c7d90);var _0x5f083e=_0x26dbe2['attr']('data-sku');var _0x57043a=_0x26dbe2[_0x2452('0x93')](_0x2452('0x113'));if(_0x5f083e){var _0xf9de8b=parseInt(_0x26dbe2['val']())||0x1;_0x5bbe02[_0x2452('0x114')]([_0x5f083e,_0x57043a],_0xf9de8b,_0xf9de8b+0x1,function(_0x26e6e2){_0x26dbe2[_0x2452('0xd0')](_0x26e6e2);'function'===typeof _0x42b19a&&_0x42b19a();});}};var _0x26dbe2=function(_0x2fec98,_0x41bbbc){var _0x26dbe2=_0x637d0d(_0x2fec98);var _0x578cb2=_0x26dbe2['attr'](_0x2452('0x115'));var _0x57043a=_0x26dbe2['attr'](_0x2452('0x113'));if(_0x578cb2){var _0x636262=parseInt(_0x26dbe2['val']())||0x2;_0x5bbe02[_0x2452('0x114')]([_0x578cb2,_0x57043a],_0x636262,_0x636262-0x1,function(_0x12cf38){_0x26dbe2[_0x2452('0xd0')](_0x12cf38);'function'===typeof _0x41bbbc&&_0x41bbbc();});}};var _0x2cd6e1=function(_0x4de471,_0x39af5e){var _0x26dbe2=_0x637d0d(_0x4de471);var _0x1dba5e=_0x26dbe2[_0x2452('0x93')](_0x2452('0x115'));var _0x57043a=_0x26dbe2[_0x2452('0x93')](_0x2452('0x113'));if(_0x1dba5e){var _0xa57faf=parseInt(_0x26dbe2[_0x2452('0xd0')]())||0x1;_0x5bbe02[_0x2452('0x114')]([_0x1dba5e,_0x57043a],0x1,_0xa57faf,function(_0x7e55a5){_0x26dbe2['val'](_0x7e55a5);_0x2452('0xa')===typeof _0x39af5e&&_0x39af5e();});}};var _0x57043a=_0x40d4ed['find'](_0x2452('0x116'));_0x57043a[_0x2452('0x4a')](_0x2452('0x117'))[_0x2452('0x35')](function(){var _0x40d4ed=_0x637d0d(this);_0x40d4ed[_0x2452('0x52')](_0x2452('0x118'))['on'](_0x2452('0x119'),function(_0x2045e9){_0x2045e9['preventDefault']();_0x57043a[_0x2452('0x4a')](_0x2452('0x11a'));_0x53b6fc(_0x40d4ed['find'](_0x2452('0xf9')),function(){_0x57043a[_0x2452('0x4b')](_0x2452('0x11a'));});});_0x40d4ed['find']('.qd-ddc-quantityMinus')['on'](_0x2452('0x11b'),function(_0x45dd44){_0x45dd44[_0x2452('0x78')]();_0x57043a[_0x2452('0x4a')]('qd-loading');_0x26dbe2(_0x40d4ed[_0x2452('0x52')]('.qd-ddc-quantity'),function(){_0x57043a['removeClass'](_0x2452('0x11a'));});});_0x40d4ed[_0x2452('0x52')](_0x2452('0xf9'))['on'](_0x2452('0x11c'),function(){_0x57043a[_0x2452('0x4a')]('qd-loading');_0x2cd6e1(this,function(){_0x57043a['removeClass'](_0x2452('0x11a'));});});_0x40d4ed[_0x2452('0x52')](_0x2452('0xf9'))['on']('keyup.qd_ddc_change',function(_0x174b59){0xd==_0x174b59[_0x2452('0xc8')]&&(_0x57043a[_0x2452('0x4a')](_0x2452('0x11a')),_0x2cd6e1(this,function(){_0x57043a[_0x2452('0x4b')](_0x2452('0x11a'));}));});});_0x40d4ed[_0x2452('0x52')](_0x2452('0xf1'))['each'](function(){var _0x40d4ed=_0x637d0d(this);_0x40d4ed[_0x2452('0x52')](_0x2452('0xfa'))['on']('click.qd_ddc_remove',function(){_0x40d4ed[_0x2452('0x4a')](_0x2452('0x11a'));_0x5bbe02[_0x2452('0x11d')](_0x637d0d(this),function(_0x160781){_0x160781?_0x40d4ed[_0x2452('0x11e')](!0x0)['slideUp'](function(){_0x40d4ed['remove']();_0x5bbe02[_0x2452('0x103')]();}):_0x40d4ed[_0x2452('0x4b')]('qd-loading');});return!0x1;});});};_0x5bbe02[_0x2452('0xd2')]=function(_0x530b6e){var _0x4e362e=_0x530b6e[_0x2452('0xd0')](),_0x4e362e=_0x4e362e['replace'](/[^0-9\-]/g,''),_0x4e362e=_0x4e362e[_0x2452('0x1')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x2452('0x11f')),_0x4e362e=_0x4e362e[_0x2452('0x1')](/(.{9}).*/g,'$1');_0x530b6e[_0x2452('0xd0')](_0x4e362e);0x9<=_0x4e362e[_0x2452('0x8')]&&(_0x530b6e['data'](_0x2452('0x120'))!=_0x4e362e&&_0x5a88f3[_0x2452('0x121')]({'postalCode':_0x4e362e,'country':_0x2452('0x122')})[_0x2452('0x1c')](function(_0x28482e){window[_0x2452('0x5b')]['getOrderForm']=_0x28482e;_0x5bbe02['getCartInfoByUrl']();})[_0x2452('0x1e')](function(_0x1d13f5){_0x3afe7f([_0x2452('0x123'),_0x1d13f5]);updateCartData();}),_0x530b6e[_0x2452('0x17')](_0x2452('0x120'),_0x4e362e));};_0x5bbe02[_0x2452('0x114')]=function(_0x27b007,_0x2286a6,_0x46a54b,_0x5e4b89){function _0xb33ff3(_0x4083c0){_0x4083c0=_0x2452('0x124')!==typeof _0x4083c0?!0x1:_0x4083c0;_0x5bbe02['getCartInfoByUrl']();window[_0x2452('0x5b')]['allowUpdate']=!0x1;_0x5bbe02[_0x2452('0x103')]();'undefined'!==typeof window[_0x2452('0x125')]&&'function'===typeof window['_QuatroDigital_AmountProduct'][_0x2452('0xee')]&&window[_0x2452('0x125')]['exec'][_0x2452('0x28')](this);_0x2452('0xa')===typeof adminCart&&adminCart();_0x637d0d['fn'][_0x2452('0x2b')](!0x0,void 0x0,_0x4083c0);_0x2452('0xa')===typeof _0x5e4b89&&_0x5e4b89(_0x2286a6);}_0x46a54b=_0x46a54b||0x1;if(0x1>_0x46a54b)return _0x2286a6;if(_0x56d4ad[_0x2452('0x5a')]){if(_0x2452('0x3')===typeof window[_0x2452('0x5b')][_0x2452('0x27')][_0x2452('0x41')][_0x27b007[0x1]])return _0x3afe7f('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x27b007[0x1]+']'),_0x2286a6;window[_0x2452('0x5b')][_0x2452('0x27')][_0x2452('0x41')][_0x27b007[0x1]][_0x2452('0x126')]=_0x46a54b;window[_0x2452('0x5b')][_0x2452('0x27')][_0x2452('0x41')][_0x27b007[0x1]][_0x2452('0x127')]=_0x27b007[0x1];_0x5a88f3[_0x2452('0x128')]([window[_0x2452('0x5b')][_0x2452('0x27')][_0x2452('0x41')][_0x27b007[0x1]]],[_0x2452('0x41'),_0x2452('0x38'),_0x2452('0x5f')])['done'](function(_0x388ee5){window[_0x2452('0x5b')][_0x2452('0x27')]=_0x388ee5;_0xb33ff3(!0x0);})['fail'](function(_0xf903f1){_0x3afe7f(['Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho',_0xf903f1]);_0xb33ff3();});}else _0x3afe7f('atenção\x20esta\x20método\x20esta\x20descontinuado');};_0x5bbe02[_0x2452('0x11d')]=function(_0x3f4a95,_0x4685a1){function _0x569219(_0x4aa0c4){_0x4aa0c4=_0x2452('0x124')!==typeof _0x4aa0c4?!0x1:_0x4aa0c4;_0x2452('0x3')!==typeof window['_QuatroDigital_AmountProduct']&&_0x2452('0xa')===typeof window[_0x2452('0x125')]['exec']&&window[_0x2452('0x125')][_0x2452('0xee')][_0x2452('0x28')](this);_0x2452('0xa')===typeof adminCart&&adminCart();_0x637d0d['fn'][_0x2452('0x2b')](!0x0,void 0x0,_0x4aa0c4);_0x2452('0xa')===typeof _0x4685a1&&_0x4685a1(_0x57043a);}var _0x57043a=!0x1,_0x203d39=_0x637d0d(_0x3f4a95)[_0x2452('0x93')](_0x2452('0x113'));if(_0x56d4ad[_0x2452('0x5a')]){if(_0x2452('0x3')===typeof window[_0x2452('0x5b')][_0x2452('0x27')][_0x2452('0x41')][_0x203d39])return _0x3afe7f(_0x2452('0x129')+_0x203d39+']'),_0x57043a;window[_0x2452('0x5b')]['getOrderForm']['items'][_0x203d39][_0x2452('0x127')]=_0x203d39;_0x5a88f3[_0x2452('0x12a')]([window[_0x2452('0x5b')][_0x2452('0x27')]['items'][_0x203d39]],[_0x2452('0x41'),'totalizers','shippingData'])[_0x2452('0x1c')](function(_0xccfc3){_0x57043a=!0x0;window[_0x2452('0x5b')][_0x2452('0x27')]=_0xccfc3;_0x48baf0(_0xccfc3);_0x569219(!0x0);})[_0x2452('0x1e')](function(_0x3fec86){_0x3afe7f([_0x2452('0x12b'),_0x3fec86]);_0x569219();});}else alert(_0x2452('0x12c'));};_0x5bbe02[_0x2452('0xcc')]=function(_0x1b5da1,_0x313d19,_0x5bf512,_0x2f5a11){_0x2f5a11=_0x2f5a11||_0x637d0d('.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2');_0x1b5da1=_0x1b5da1||'+';_0x313d19=_0x313d19||0.9*_0x2f5a11['height']();_0x2f5a11[_0x2452('0x11e')](!0x0,!0x0)[_0x2452('0x12d')]({'scrollTop':isNaN(_0x5bf512)?_0x1b5da1+'='+_0x313d19+'px':_0x5bf512});};_0x56d4ad['updateOnlyHover']||(_0x5bbe02[_0x2452('0x8e')](),_0x637d0d['fn']['simpleCart'](!0x0));_0x637d0d(window)['on'](_0x2452('0x12e'),function(){try{window[_0x2452('0x5b')]['getOrderForm']=void 0x0,_0x5bbe02[_0x2452('0x8e')]();}catch(_0x13e6b7){_0x3afe7f(_0x2452('0x12f')+_0x13e6b7[_0x2452('0x23')],_0x2452('0x130'));}});_0x2452('0xa')===typeof _0x56d4ad[_0x2452('0x42')]?_0x56d4ad['callback'][_0x2452('0x28')](this):_0x3afe7f(_0x2452('0x131'));};_0x637d0d['fn']['QD_dropDownCart']=function(_0x17d996){var _0x433596=_0x637d0d(this);_0x433596['fn']=new _0x637d0d['QD_dropDownCart'](this,_0x17d996);return _0x433596;};}catch(_0x23dbf7){_0x2452('0x3')!==typeof console&&_0x2452('0xa')===typeof console[_0x2452('0x14')]&&console[_0x2452('0x14')](_0x2452('0xb0'),_0x23dbf7);}}(this));(function(_0x5ac41a){try{var _0x11b513=jQuery;window['_QuatroDigital_AmountProduct']=window[_0x2452('0x125')]||{};window['_QuatroDigital_AmountProduct'][_0x2452('0x41')]={};window[_0x2452('0x125')][_0x2452('0x132')]=!0x1;window['_QuatroDigital_AmountProduct']['buyButtonClicked']=!0x1;window[_0x2452('0x125')][_0x2452('0x133')]=!0x1;var _0x2644bc=function(){if(window['_QuatroDigital_AmountProduct'][_0x2452('0x132')]){var _0x1275bf=!0x1;var _0x5ac41a={};window[_0x2452('0x125')]['items']={};for(_0x3edd9f in window[_0x2452('0x5b')]['getOrderForm'][_0x2452('0x41')])if(_0x2452('0x16')===typeof window[_0x2452('0x5b')][_0x2452('0x27')]['items'][_0x3edd9f]){var _0x1d8998=window[_0x2452('0x5b')][_0x2452('0x27')][_0x2452('0x41')][_0x3edd9f];'undefined'!==typeof _0x1d8998[_0x2452('0x134')]&&null!==_0x1d8998['productId']&&''!==_0x1d8998['productId']&&(window[_0x2452('0x125')]['items']['prod_'+_0x1d8998[_0x2452('0x134')]]=window[_0x2452('0x125')][_0x2452('0x41')][_0x2452('0x135')+_0x1d8998[_0x2452('0x134')]]||{},window[_0x2452('0x125')][_0x2452('0x41')][_0x2452('0x135')+_0x1d8998['productId']][_0x2452('0x136')]=_0x1d8998['productId'],_0x5ac41a[_0x2452('0x135')+_0x1d8998[_0x2452('0x134')]]||(window['_QuatroDigital_AmountProduct'][_0x2452('0x41')]['prod_'+_0x1d8998[_0x2452('0x134')]][_0x2452('0x3f')]=0x0),window['_QuatroDigital_AmountProduct']['items'][_0x2452('0x135')+_0x1d8998[_0x2452('0x134')]]['qtt']+=_0x1d8998['quantity'],_0x1275bf=!0x0,_0x5ac41a[_0x2452('0x135')+_0x1d8998[_0x2452('0x134')]]=!0x0);}var _0x3edd9f=_0x1275bf;}else _0x3edd9f=void 0x0;window[_0x2452('0x125')][_0x2452('0x132')]&&(_0x11b513(_0x2452('0x137'))['remove'](),_0x11b513('.qd-bap-item-added')[_0x2452('0x4b')](_0x2452('0x138')));for(var _0x530817 in window['_QuatroDigital_AmountProduct'][_0x2452('0x41')]){_0x1d8998=window['_QuatroDigital_AmountProduct']['items'][_0x530817];if(_0x2452('0x16')!==typeof _0x1d8998)return;_0x5ac41a=_0x11b513(_0x2452('0x139')+_0x1d8998[_0x2452('0x136')]+']')['getParent']('li');if(window[_0x2452('0x125')]['allowRecalculate']||!_0x5ac41a['find']('.qd-bap-wrapper')[_0x2452('0x8')])_0x1275bf=_0x11b513(_0x2452('0x13a')),_0x1275bf[_0x2452('0x52')](_0x2452('0x13b'))[_0x2452('0x4f')](_0x1d8998[_0x2452('0x3f')]),_0x1d8998=_0x5ac41a['find']('.qd_bap_wrapper_content'),_0x1d8998[_0x2452('0x8')]?_0x1d8998['prepend'](_0x1275bf)[_0x2452('0x4a')](_0x2452('0x138')):_0x5ac41a[_0x2452('0xa9')](_0x1275bf);}_0x3edd9f&&(window[_0x2452('0x125')][_0x2452('0x132')]=!0x1);};window[_0x2452('0x125')][_0x2452('0xee')]=function(){window['_QuatroDigital_AmountProduct'][_0x2452('0x132')]=!0x0;_0x2644bc[_0x2452('0x28')](this);};_0x11b513(document)[_0x2452('0x13c')](function(){_0x2644bc['call'](this);});}catch(_0xc2775e){'undefined'!==typeof console&&_0x2452('0xa')===typeof console['error']&&console[_0x2452('0x14')](_0x2452('0xb0'),_0xc2775e);}}(this));(function(){try{var _0x577171=jQuery,_0x179eed,_0x1d29a2={'selector':_0x2452('0x13d'),'dropDown':{},'buyButton':{}};_0x577171[_0x2452('0x13e')]=function(_0x5721dc){var _0x178677={};_0x179eed=_0x577171[_0x2452('0x15')](!0x0,{},_0x1d29a2,_0x5721dc);_0x5721dc=_0x577171(_0x179eed[_0x2452('0x86')])[_0x2452('0xb8')](_0x179eed[_0x2452('0x13f')]);_0x178677['buyButton']=_0x2452('0x3')!==typeof _0x179eed[_0x2452('0x13f')][_0x2452('0xd3')]&&!0x1===_0x179eed['dropDown'][_0x2452('0xd3')]?_0x577171(_0x179eed[_0x2452('0x86')])[_0x2452('0xa7')](_0x5721dc['fn'],_0x179eed[_0x2452('0x7a')]):_0x577171(_0x179eed[_0x2452('0x86')])[_0x2452('0xa7')](_0x179eed[_0x2452('0x7a')]);_0x178677[_0x2452('0x13f')]=_0x5721dc;return _0x178677;};_0x577171['fn'][_0x2452('0x140')]=function(){_0x2452('0x16')===typeof console&&_0x2452('0xa')===typeof console['info']&&console['info'](_0x2452('0x141'));};_0x577171['smartCart']=_0x577171['fn'][_0x2452('0x140')];}catch(_0x2b2116){'undefined'!==typeof console&&_0x2452('0xa')===typeof console['error']&&console['error'](_0x2452('0xb0'),_0x2b2116);}}());

/* Quatro Digital - Product Thumbs // Carlos Vinicius // Todos os direitos reservados. */
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs();a.trigger("QuatroDigital.pt_callback",[a])}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return a.length?$.extend({},a,new b(a)):a},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0x9438=['youtu.be','be/','<div\x20class=\x22qd-playerWrapper\x22></div>','#include','<div\x20class=\x22qd-playerContainer\x22></div>','nfbzrgeb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','join','toUpperCase','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','html','<iframe\x20src=\x22','urlProtocol','://www.youtube.com/embed/','?wmode=transparent&rel=0&enablejsapi=1\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>','data','height','stop','addClass','qdpv-video-on','add','animate','find','iframe','a:not(\x27.qd-videoLink\x27)','bind','fadeTo','hide','removeAttr','style','.qd-videoItem','call','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27','\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','click.playVideo','.ON','controlVideo','.qd-playerWrapper\x20iframe','contentWindow','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','rel','attr','a:not(.qd-videoLink)','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','start','prependTo','trigger','QuatroDigital.pv_video_added','ajaxStop','load','ImageControl','.qd-videoLink','body','object','undefined','alerta','toLowerCase','[Video\x20in\x20product]\x20','info','error','qdVideoInProduct','extend','td.value-field.Videos:first','div#image','videoFieldSelector','replace','length','youtube','push','split','pop','shift','indexOf'];(function(_0x2c6ee1,_0x382195){var _0x39c175=function(_0x132468){while(--_0x132468){_0x2c6ee1['push'](_0x2c6ee1['shift']());}};_0x39c175(++_0x382195);}(_0x9438,0x8d));var _0x8943=function(_0x5bfda5,_0x1becf3){_0x5bfda5=_0x5bfda5-0x0;var _0x198071=_0x9438[_0x5bfda5];return _0x198071;};(function(_0x2e69e7){$(function(){if($(document[_0x8943('0x0')])['is']('.produto')){var _0x3e21d9=[];var _0x2766f1=function(_0x4e1a5d,_0x25b73d){_0x8943('0x1')===typeof console&&(_0x8943('0x2')!==typeof _0x25b73d&&_0x8943('0x3')===_0x25b73d[_0x8943('0x4')]()?console['warn'](_0x8943('0x5')+_0x4e1a5d):_0x8943('0x2')!==typeof _0x25b73d&&_0x8943('0x6')===_0x25b73d['toLowerCase']()?console['info'](_0x8943('0x5')+_0x4e1a5d):console[_0x8943('0x7')](_0x8943('0x5')+_0x4e1a5d));};window[_0x8943('0x8')]=window[_0x8943('0x8')]||{};var _0x8f2345=$[_0x8943('0x9')](!0x0,{'insertThumbsIn':'start','videoFieldSelector':_0x8943('0xa'),'controlVideo':!0x0,'urlProtocol':'http'},window[_0x8943('0x8')]);var _0x8aaf27=$('ul.thumbs');var _0x3d5d9e=$(_0x8943('0xb'));var _0x585dec=$(_0x8f2345[_0x8943('0xc')])['text']()[_0x8943('0xd')](/\;\s*/,';')['split'](';');for(var _0x4dcd23=0x0;_0x4dcd23<_0x585dec[_0x8943('0xe')];_0x4dcd23++)-0x1<_0x585dec[_0x4dcd23]['indexOf'](_0x8943('0xf'))?_0x3e21d9[_0x8943('0x10')](_0x585dec[_0x4dcd23][_0x8943('0x11')]('v=')[_0x8943('0x12')]()['split'](/[&#]/)[_0x8943('0x13')]()):-0x1<_0x585dec[_0x4dcd23][_0x8943('0x14')](_0x8943('0x15'))&&_0x3e21d9[_0x8943('0x10')](_0x585dec[_0x4dcd23][_0x8943('0x11')](_0x8943('0x16'))[_0x8943('0x12')]()[_0x8943('0x11')](/[\?&#]/)['shift']());var _0x1ef624=$(_0x8943('0x17'));_0x1ef624['prependTo'](_0x8943('0x18'));_0x1ef624['wrap'](_0x8943('0x19'));_0x585dec=function(_0x237cc1){var _0x271f45={'t':_0x8943('0x1a')};return function(_0x45fd5f){var _0x43b957=function(_0x57ca0b){return _0x57ca0b;};var _0x22793b=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x45fd5f=_0x45fd5f['d'+_0x22793b[0x10]+'c'+_0x22793b[0x11]+'m'+_0x43b957(_0x22793b[0x1])+'n'+_0x22793b[0xd]]['l'+_0x22793b[0x12]+'c'+_0x22793b[0x0]+'ti'+_0x43b957('o')+'n'];var _0x556b84=function(_0x22d2b1){return escape(encodeURIComponent(_0x22d2b1[_0x8943('0xd')](/\./g,'¨')[_0x8943('0xd')](/[a-zA-Z]/g,function(_0x3ed907){return String[_0x8943('0x1b')](('Z'>=_0x3ed907?0x5a:0x7a)>=(_0x3ed907=_0x3ed907[_0x8943('0x1c')](0x0)+0xd)?_0x3ed907:_0x3ed907-0x1a);})));};var _0x1c3612=_0x556b84(_0x45fd5f[[_0x22793b[0x9],_0x43b957('o'),_0x22793b[0xc],_0x22793b[_0x43b957(0xd)]][_0x8943('0x1d')]('')]);_0x556b84=_0x556b84((window[['js',_0x43b957('no'),'m',_0x22793b[0x1],_0x22793b[0x4][_0x8943('0x1e')](),_0x8943('0x1f')][_0x8943('0x1d')]('')]||_0x8943('0x20'))+['.v',_0x22793b[0xd],'e',_0x43b957('x'),'co',_0x43b957('mm'),_0x8943('0x21'),_0x22793b[0x1],'.c',_0x43b957('o'),'m.',_0x22793b[0x13],'r'][_0x8943('0x1d')](''));for(var _0x3ec561 in _0x271f45){if(_0x556b84===_0x3ec561+_0x271f45[_0x3ec561]||_0x1c3612===_0x3ec561+_0x271f45[_0x3ec561]){var _0x224701='tr'+_0x22793b[0x11]+'e';break;}_0x224701='f'+_0x22793b[0x0]+'ls'+_0x43b957(_0x22793b[0x1])+'';}_0x43b957=!0x1;-0x1<_0x45fd5f[[_0x22793b[0xc],'e',_0x22793b[0x0],'rc',_0x22793b[0x9]]['join']('')]['indexOf'](_0x8943('0x22'))&&(_0x43b957=!0x0);return[_0x224701,_0x43b957];}(_0x237cc1);}(window);if(!eval(_0x585dec[0x0]))return _0x585dec[0x1]?_0x2766f1(_0x8943('0x23')):!0x1;var _0xd66e42=function(_0x356c7,_0x176738){_0x8943('0xf')===_0x176738&&_0x1ef624[_0x8943('0x24')](_0x8943('0x25')+_0x8f2345[_0x8943('0x26')]+_0x8943('0x27')+_0x356c7+_0x8943('0x28'));_0x3d5d9e[_0x8943('0x29')]('height',_0x3d5d9e['data'](_0x8943('0x2a'))||_0x3d5d9e[_0x8943('0x2a')]());_0x3d5d9e[_0x8943('0x2b')](!0x0,!0x0)['fadeTo'](0x1f4,0x0,function(){$(_0x8943('0x0'))[_0x8943('0x2c')](_0x8943('0x2d'));});_0x1ef624[_0x8943('0x2b')](!0x0,!0x0)['fadeTo'](0x1f4,0x1,function(){_0x3d5d9e[_0x8943('0x2e')](_0x1ef624)[_0x8943('0x2f')]({'height':_0x1ef624[_0x8943('0x30')](_0x8943('0x31'))[_0x8943('0x2a')]()},0x2bc);});};removePlayer=function(){_0x8aaf27['find'](_0x8943('0x32'))[_0x8943('0x33')]('click.removeVideo',function(){_0x1ef624['stop'](!0x0,!0x0)[_0x8943('0x34')](0x1f4,0x0,function(){$(this)[_0x8943('0x35')]()[_0x8943('0x36')](_0x8943('0x37'));$(_0x8943('0x0'))['removeClass'](_0x8943('0x2d'));});_0x3d5d9e['stop'](!0x0,!0x0)[_0x8943('0x34')](0x1f4,0x1,function(){var _0x231a7b=_0x3d5d9e['data'](_0x8943('0x2a'));_0x231a7b&&_0x3d5d9e['animate']({'height':_0x231a7b},0x2bc);});});};var _0x283894=function(){if(!_0x8aaf27['find'](_0x8943('0x38'))['length'])for(vId in removePlayer[_0x8943('0x39')](this),_0x3e21d9)if('string'===typeof _0x3e21d9[vId]&&''!==_0x3e21d9[vId]){var _0x3ca7d2=$(_0x8943('0x3a')+_0x3e21d9[vId]+_0x8943('0x3b')+_0x3e21d9[vId]+_0x8943('0x3c')+_0x3e21d9[vId]+_0x8943('0x3d'));_0x3ca7d2[_0x8943('0x30')]('a')[_0x8943('0x33')](_0x8943('0x3e'),function(){var _0x24aad1=$(this);_0x8aaf27[_0x8943('0x30')](_0x8943('0x3f'))['removeClass']('ON');_0x24aad1['addClass']('ON');0x1==_0x8f2345[_0x8943('0x40')]?$(_0x8943('0x41'))[_0x8943('0xe')]?(_0xd66e42[_0x8943('0x39')](this,'',''),$(_0x8943('0x41'))[0x0][_0x8943('0x42')][_0x8943('0x43')](_0x8943('0x44'),'*')):_0xd66e42['call'](this,_0x24aad1['attr'](_0x8943('0x45')),_0x8943('0xf')):_0xd66e42[_0x8943('0x39')](this,_0x24aad1[_0x8943('0x46')]('rel'),_0x8943('0xf'));return!0x1;});0x1==_0x8f2345[_0x8943('0x40')]&&_0x8aaf27[_0x8943('0x30')](_0x8943('0x47'))['click'](function(_0x2ded11){$(_0x8943('0x41'))[_0x8943('0xe')]&&$('.qd-playerWrapper\x20iframe')[0x0][_0x8943('0x42')]['postMessage'](_0x8943('0x48'),'*');});_0x8943('0x49')===_0x8f2345['insertThumbsIn']?_0x3ca7d2[_0x8943('0x4a')](_0x8aaf27):_0x3ca7d2['appendTo'](_0x8aaf27);_0x3ca7d2[_0x8943('0x4b')](_0x8943('0x4c'),[_0x3e21d9[vId],_0x3ca7d2]);}};$(document)[_0x8943('0x4d')](_0x283894);$(window)[_0x8943('0x4e')](_0x283894);(function(){var _0x5f2379=this;var _0x2ed345=window[_0x8943('0x4f')]||function(){};window['ImageControl']=function(_0x488d66,_0x18753d){$(_0x488d66||'')['is'](_0x8943('0x50'))||(_0x2ed345[_0x8943('0x39')](this,_0x488d66,_0x18753d),_0x283894['call'](_0x5f2379));};}());}});}(this));

/* Quatro Digital - Mosaic Banners // Carlos Vinicius // Todos os direitos reservados */
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

