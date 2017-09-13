/**
* Funções base
*/
String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")});
"function"!==typeof String.prototype.replaceSpecialChars&&(String.prototype.replaceSpecialChars=function(){var b={"\u00e7":"c","\u00e6":"ae","\u0153":"oe","\u00e1":"a","\u00e9":"e","\u00ed":"i","\u00f3":"o","\u00fa":"u","\u00e0":"a","\u00e8":"e","\u00ec":"i","\u00f2":"o","\u00f9":"u","\u00e4":"a","\u00eb":"e","\u00ef":"i","\u00f6":"o","\u00fc":"u","\u00ff":"y","\u00e2":"a","\u00ea":"e","\u00ee":"i","\u00f4":"o","\u00fb":"u","\u00e5":"a","\u00e3":"a","\u00f8":"o","\u00f5":"o",u:"u","\u00c1":"A","\u00c9":"E", "\u00cd":"I","\u00d3":"O","\u00da":"U","\u00ca":"E","\u00d4":"O","\u00dc":"U","\u00c3":"A","\u00d5":"O","\u00c0":"A","\u00c7":"C"};return this.replace(/[\u00e0-\u00fa]/ig,function(a){return"undefined"!=typeof b[a]?b[a]:a})});
Array.prototype.indexOf||(Array.prototype.indexOf=function(d,e){var a;if(null==this)throw new TypeError('"this" is null or not defined');var c=Object(this),b=c.length>>>0;if(0===b)return-1;a=+e||0;Infinity===Math.abs(a)&&(a=0);if(a>=b)return-1;for(a=Math.max(0<=a?a:b-Math.abs(a),0);a<b;){if(a in c&&c[a]===d)return a;a++}return-1});

try {
	var Common = {
		run: function() {},
		init: function() {
			Common.checkLogin();
			Common.applyAmazingMenuReseller();
			Common.applyFooterLinksAmazingMenu();
			Common.applyMainAmazingMenu()
			Common.applyModalSearch();
			Common.applyHistoryBack();
			Common.callSmartCart();
			Common.callSmartPrice();
			Common.expressPurchase();
			Common.qdOverlay();
			Common.startTooltips();
			Common.showMiniCart();
			Common.vtexBindQuickViewDestroy();
			Common.reloadMobileBackPage();
			Common.productBuildCaroussel();
			Common.productOwlCarousel();
		},
		ajaxStop: function() {
			Common.callSmartPrice();
		},
		windowOnload: function() {},
		productOwlCarousel:function(){
			if (!$.fn.owlCarousel || $(document.body).is(".black-friday"))
				return;

			$(".qd-shelf-carousel .prateleira").each(function() {
				$(this).owlCarousel({
					items: 4,
					navigation: true,
					pagination: false
				});
			});
		},
		productBuildCaroussel: function(){
			$(".qd-shelf-carousel .prateleira").each(function(){
				var wrap = $(this);

				wrap.find("h2").addClass('heading-1').insertBefore(wrap);
				wrap.find(".prateleira >ul").addClass("item");
			});
		},
		loginDealer: function() {
			var modal = $('<div class="modal modal-qd-v1-login fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button></div><div class="modal-body"><div class="login-qd-v1-step"><img src="/arquivos/milon.all.logo.png" alt="" /><div class="login-qd-v1-step-1"><form novalidate="1"><p>Para continuar, informe seu e-mail abaixo.</p><div class="form-row"><input type="text" name="qd_email" class="qd_email form-control required" placeholder="Ex:jose@email.com" /></div><button class="login-qd-v1-btn-submit">CONFIRMAR</button></form></div><div class="login-qd-v1-step-2"><p>Olá! Identificamos que você possui acesso à área de revendedor. O que você gostaria de fazer agora ?</p><div class="link-row"><span class="login-qd-v1-btn-wholesale" data-qd-sc="2">Acessar preços em atacado</span><span class="login-qd-v1-btn-retail" data-qd-sc="1">Acessar preços em varejo</span></div><span class="login-qd-v1-btn-back">Voltar</span></div></div></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>').appendTo(document.body);
			var step1 = modal.find('.login-qd-v1-step-1');
			var step2 = modal.find('.login-qd-v1-step-2');

			$('.header-qd-v1-reseller-login-link').click(function(evt) {
				evt.preventDefault();

				$(document.body).removeClass(Common.qdOverlayClass);
				modal.modal({backdrop: 'static'});
				$(document.body).addClass('qd-v1-login');
			});

			modal.on('hidden.bs.modal', function (e) {
				$(document.body).removeClass('qd-v1-login');
			});

			var form = modal.find('form');

			form.validate({
				rules: {
					email: {
						email: true
					}
				},
				submitHandler: function(form){
					var $form = $(form);
					var email = $form.find('.qd_email').val();

					if(!$form.valid())
						return;

					$.ajax({
						url: "//api.vtexcrm.com.br/" + jsnomeSite + "/dataentities/CL/search",
						data: {"_fields": "id,approvedDealer", "email": email},
						type: "GET",
						dataType: "json",
						headers: {Accept: "application/vnd.vtex.ds.v10+json"},
						success: function(data) {
							if(data.length && data[0].approvedDealer && data[0].approvedDealer == true) {
								step1.removeClass('active-l').addClass('inative');
								step2.removeClass('inative').addClass('active');
							} else {
								modal.modal('hide');
								vtexid.setEmail(email);
								vtexid.start();
							}

							step2.find('.login-qd-v1-btn-wholesale, .login-qd-v1-btn-retail').click(function() {
								var code = $(this).attr('data-qd-sc');
								var a = $('<a></a>');
								a[0].href= (vtexid.getReturnUrl() || '');
								a[0].search += '&sc=' + code;

								vtexid.start({
									email: email,
									returnUrl: a[0].href.replace('?&', '?')
								});

								modal.modal('hide');
							});
						}
					});
				},
				errorPlacement: function(error, element) {}
			});

			step2.find('.login-qd-v1-btn-back').click(function() {
				step1.removeClass('inative').addClass('active-l');
				step2.addClass('inative');
			});
		},
		checkLogin: function() {
			$.qdAjax({
				url: "/no-cache/profileSystem/getProfile",
				dataType: "json",
				clearQueueDelay: null,
				success: function(data){
					try{
						if(data.IsUserDefined) {
							$(".header-qd-v1-reseller-welcome-message").append('Olá! ' + data.FirstName + '. <a href="/no-cache/user/logout">Sair</a>');
							$(document.body).removeClass('not-logged-user');
							$('.qd-am-elem-sair').show();
						} else {
							$('.header-qd-v1-reseller-welcome-message').append('<a class="header-qd-v1-reseller-login-link" href="/revendedor-sex-shop">Olá! Faça seu login</a>');
							$(document.body).addClass('not-logged-user');
							$('.qd-am-elem-sair').hide();
							Common.loginDealer();
						}
					}
					catch (e) {if (typeof console !== "undefined" && typeof console.info === "function") console.info("Ops, algo saiu errado com o login.", e.message); }
				}
			});
		},
		reloadMobileBackPage: function() {
			$(window).bind("pageshow", function(event) {
				if (event.originalEvent.persisted) {
					$.fn.simpleCart(true);
				}
			});
		},
		qdOverlayClass: 'qd-am-on qd-cart-show qd-sn-on qd-rs-on',
		qdOverlay: function() {
			$('.components-qd-v1-overlay').click(function() {
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		},
		vtexBindQuickViewDestroy: function() {
			window.bindQuickView = function() {};
		},
		applyAmazingMenuReseller: function() {
			var wrapper = $('.header-qd-v1-reseller-menu');
			wrapper.QD_amazingMenu({
				callback: function() {
					$('<span class="qd-am-dropdown-trigger"><i class="fa fa-chevron-down"></i></span>').appendTo(wrapper.find('.qd-am-has-ul.qd-am-dropdown')).click(function() {
						var $t = $(this);

						$t.siblings('ul').stop(true, true).slideToggle(function(){
							$(this).parent().toggleClass('qd-am-is-active');
						});
					});
				}
			});

			$('.header-qd-v1-reseller-menu-trigger').click(function() {
				$(document.body).addClass('qd-rs-on');
				return false;
			});
		},
		applyFooterLinksAmazingMenu: function() {
			var wrapper = $('.footer-qd-v1-nav-links');

			wrapper.QD_amazingMenu({
				callback: function() {
					$('.qd-am-has-ul.qd-am-dropdown > .qd_am_text').click(function() {
						var $t = $(this);

						$t.siblings('ul').stop(true, true).slideToggle(function(){
							$(this).parent().toggleClass('qd-am-is-active');
						});
					});
				}
			});

		},
		applyHistoryBack: function(){
			var wrapper = $('.header-qd-v1 .container-fluid .row .col-xs-12 .row'),
				trigger = $('<div class="col-xs-2 header-qd-v1-history-back"><a href="javascript:history.back()"><i class="fa fa-chevron-left"></i></a></div>');
			trigger.appendTo(wrapper);
		},
		applyMainAmazingMenu: function() {
			var wrapper = $('.header-qd-v1-amazing-menu');
			wrapper.QD_amazingMenu({
				callback: function() {
					$('<span class="qd-am-dropdown-trigger"><i class="fa fa-chevron-down"></i></span>').appendTo(wrapper.find('.qd-am-has-ul.qd-am-dropdown')).click(function() {
						var $t = $(this);

						$t.siblings('ul').stop(true, true).slideToggle(function(){
							$(this).parent().toggleClass('qd-am-is-active');
						});
					});
				}
			});

			$('.fixed-buttons-qd-v1-menu-trigger').click(function() {
				$(document.body).addClass('qd-am-on');
				return false;
			});
		},
		applyModalSearch: function() {
			$('.fixed-buttons-qd-v1-search-trigger').click(function() {
				$('.modal-qd-v1-search').modal();
				return false;
			});
		},
		callSmartCart: function() {
			var wrapper = $('.qd-sc-wrapper');

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
						$(".qd-ddc-wrapper3").prepend('<div class="qd-cartTitle"><h3>Carrinho</h3></div>');
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
					buyButton: "body.qd-modal-sku .buy-button"
				}
			});

			// Callback do Quick View
			window._QuatroDigital_prodBuyCallback = function(jqXHR, textStatus, prodLink, skus){
				$.fn.simpleCart(true);
				$(".shelf-qd-v1-buy-button-modal").modal("hide");
				$(window).trigger("QuatroDigital.qd_bb_prod_add", [new $, skus[0] || 0]);
			};
		},
		callSmartPrice: function() {
			var wrapper = $("li[layout]:not(.qd-on-1)").addClass("qd-on-1");

			if (!wrapper.length)
				return;

			wrapper.find(".flag").QD_SmartPrice({
				filterFlagBy: "[class*='desconto']",
				wrapperElement: wrapper,
				productPage: {
					isProductPage: false
				}
			});
		},
		expressPurchase: function() {
			if (!$(document.body).is('.compra-express'))
				return;

			var table = $('.qd-products-table .table-body');
			var textarea = $('.express-purchase-qd-v1-search-field');
			var purchaseShelf = $('.express-purchase-qd-v1-shelf');
			var purchaseContent = $('.express-purchase-qd-v1-content');

			purchaseShelf.find('.buy-all').click(function() {
				table.find('.buy-button').click();
				return false;
			});

			$('.btn-search-product').click(function() {
				var value = (textarea.val() || "").trim();
				var lines = value.split("\n");
				var line;
				table.empty();

				for(var i = 0; i < lines.length; i++){
					line = lines[i].match(/([^\,\;\s\t]+)([\,\;\s\t]+)?([0-9]+)?/i) || [];
					if(line[1])
						getItem(line[1], line[3] || 1);
				}
			});

			var request = 0;
			var requestComplete = 0;
			function getItem(id, qty){
				request++;

				purchaseContent.addClass('qd-loading');

				$.ajax({
					url: '/api/catalog_system/pub/products/search/' + id,
					dataType: 'json',
					headers: {'REST-Range': 'resources=0-99'},
					success: function(data) {
						var html, $html;

						if(!data.length)
							return table.append('<div class="qd-item-not-found"><div>' + id + '</div><div class="not-found-item-table" colspan="4"><div class="shelf-not-found-item"><p>Item não encontrado</p></div></div></div>');

						for(var i = 0; i < data.length; i++)
							for(var l = 0; l < data[i].items.length; l++) {
								if (purchaseShelf.find('#qd-sku-' + data[i].items[l].itemId).length)
									continue;

								html = '<div class="table-item" id="qd-sku-' + data[i].items[l].itemId + '">';
								html += '<div class="id-table">' + id + '</div>';
								html += '<div class="image-table shelf-image"><img src="' + data[i].items[l].images[0].imageUrl.replace(/(ids\/[0-9]+)(\-[0-9]+\-[0-9]+)?/i, "$1-60-60") + '" /></div>';
								html += '<div class="product-name-table">';
								html += '<h3 class="shelf-product-name"><a href="' + data[i].link + '" target="_blank">' + data[i].items[l].nameComplete + '</a></h3>';
								html += '</div>';
								if(data[i].items[l].sellers[0].commertialOffer.AvailableQuantity){
									html += '<div class="table-item-buy-content">';
									html += '<div class="price-table">';
									html += '<div class="shelf-price-best-price"><span class="best-price">R$ ' + qd_number_format(data[i].items[l].sellers[0].commertialOffer.Price, 2, ",", ".") + '</span></div>';
									html += '</div>';
									html += '<div class="buy-table shelf-common-buy-button" data-qd-qty="' + qty + '">';
									html += '<a class="qd-sq-quantity-control qd-sq-minus" href="#"><i class="fa fa-minus"></i></a>';
									html += '<input type="text" class="quant qd-sq-quantity">';
									html += '<a class="qd-sq-quantity-control qd-sq-more" href="#"><i class="fa fa-plus"></i></a>';
									html += '<a href="' + data[i].items[l].sellers[0].addToCartLink + '" class="buy-button qd-buy-button btn-add-buy-button-asynchronous remove-href">Comprar</a>';
									html += '</div>';
									html += '</div>';
								}
								else
									html += '<div class="no-stock-table found-item-table"> <div class="shelf-no-stock"> <p>indisponível</p> </div> </div>';
								html += '</div>';
								$html = $(html);
								table.append($html);
							}

						purchaseShelf.show();
					},
					error: function() {
						var html = $('<div class="qd-request-error"><div>' + id + '</div><div>Desculpe, houve um erro ao tentar buscar este item. Refaça sua busca ou <a href="#">clique aqui para buscar novamente este item.</a></div></div>');
						html.appendTo(table);
						html.find("a").click(function() {
							getItem(id, qty);
							html.slideUp();
							return false;
						});
					},
					complete: function() {
						requestComplete++;

						if (!(requestComplete >= request))
							return;

						var items = purchaseShelf.find('.table-item').sort(function(f, s){
							var a = $(f).find('.shelf-product-name a').text();
							var b = $(s).find('.shelf-product-name a').text();

							if(a < b)
								return -1;
							else if (a > b)
								return 1;
							return 0;
						});

						purchaseShelf.find('.shelf-common-buy-button').each(function() {
							var $t = $(this);
							$t.QD_smartQuantity({initialValue: $t.attr('data-qd-qty')});
						});

						$('.qd_cart_auto').QD_buyButton();

						purchaseContent.removeClass('qd-loading');
						purchaseShelf.find('.table-body').append(items);
					}
				});
			};
		},
		startTooltips: function() {
			$('[data-toggle="tooltip"]').tooltip();
		},
		showMiniCart: function() {
			var wrapper = $('.qd-sc-wrapper');

			$('.fixed-buttons-qd-v1-cart-trigger').click(function() {
				$(document.body).toggleClass('qd-cart-show');

				wrapper.find('.qd-ddc-prodWrapper').css('max-height', $(window).height() - 193);
				return false;
			});

			$('.qd_ddc_lightBoxClose').click(function(evt){
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		}
	};

	var Home = {
		init: function() {
			Home.apllyBrandsCarousel();
			Home.applyCategoriesAmazingMenu();
			Home.applySliderFull();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		apllyBrandsCarousel: function() {
			$('.brands-qd-v1-carousel').slick({
				prevArrow: '<button type="button" class="slick-prev" title="Anterior"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next" title="Próximo"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>',
				mobileFirst: true,
				speed: 400,
				slidesToShow: 4,
				slidesToScroll: 4,
				responsive: [
					{
						breakpoint: 0,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},

					{
						breakpoint: 400,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},

					{
						breakpoint: 600,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3
						}
					},

					{
						breakpoint: 767,
						settings: {
							slidesToShow: 4,
							slidesToScroll: 4
						}
					},

					{
						breakpoint: 991,
						settings: {
							slidesToShow: 5,
							slidesToScroll: 5
						}
					},

					{
						breakpoint: 1024,
						settings: {
							slidesToShow: 5,
							slidesToScroll: 5
						}
					},

					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 6,
							slidesToScroll: 6
						}
					}
				]
			});
		},
		applyCategoriesAmazingMenu: function() {
			$('.categories-qd-v1-amazing-menu').QD_amazingMenu();
		},
		applySliderFull: function() {
			$('.slider-qd-v1-full').slick({
				arrows: false,
				adaptiveHeight: true,
				dots: true,
				speed: 400,
				autoplay: true,
				autoplaySpeed: 8000
			});
		}
	};

	var Search = {
		init: function() {
			Search.callInfinityScroll();
			Search.openSearchNavigator();
			Search.wrapSearchResults();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		callInfinityScroll: function() {
			$('.prateleira[id*=ResultItems]').QD_infinityScroll();
		},
		openSearchNavigator: function() {
			$('.search-qd-v1-navigator-toggle').click(function() {
				$(document.body).addClass('qd-sn-on');
				return false;
			});
		},
		wrapSearchResults: function() {
			$('.search-qd-v1-result').find('.searchResultsTime:first-child').appendTo('.search-qd-v1-result-header');
		}
	};

	var Product = {
		run: function() {},
		init: function() {
			Product.qdImageSliderCall();
			Product.applyBuyButton();
			Product.applyRelatedProductsCarousel();
			Product.callSmartQuantity();
			Product.callProductSmartPrice();
			Product.forceImageZoom();
			Product.setAvailableBodyClass();
			Product.singleSkuNotifyMe();
			Product.skuGridChangeImage();
			Product.setSkuExibition();
			Product.descriptionShort();
			Product.callSmartQuantity();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		qdImageSliderCall: function() {
			var ImageControl = window.ImageControl;
			window.ImageControl = function() {
				ImageControl.apply(this, arguments);

				Product.qdImageSliderSetClass();
			};

			$(window).on('QuatroDigital.pt_callback', function() {
				Product.qdImageSlider();
				Product.qdImageSliderSetClass();
			});

			$(window).on('skuSelected.vtex', function() {
				var owl = $('.product-qd-v1-image-carrousel').empty().data('owlCarousel');
				if(owl)
					owl.destroy();

				Product.qdImageSlider();
				Product.qdImageSliderSetClass();
			});
		},
		qdImageSliderSetClass: function() {
			var thumb = $(".product-qd-v1-image-thumbs a");

			thumb.removeClass('ON');
			$('.product-qd-v1-image-carrousel').find('.owl-item').each(function(index) {
				if ($(this).is('.active')){
					thumb.filter('[data-qd-active-slide-image=' + index + ']').addClass('ON');
				}
			});
		},
		qdImageSlider: function() {
			var thumb = $(".product-qd-v1-image-thumbs a");
			var imageCarrousel = $('.product-qd-v1-image-carrousel');

			var owl = imageCarrousel.data('owlCarousel');
			if(owl)
				return;

			thumb.each(function(index) {
				var $t = $(this);
				var img = $t.attr('rel') || "";

				$t.attr('data-qd-active-slide-image', index);
				$('<a href="' + img.replace('-450-450/','-1000-1000/') + '" title=""><img src="' + img + '" alt="" title="" /></a>').appendTo(imageCarrousel).jqzoom();
			});

			if (imageCarrousel.find('> a').length <= 1)
				return;

			imageCarrousel.owlCarousel({
				items: 1,
				navigation: true,
				pagination: false,
				addClassActive: true,
				afterMove: function() {
					Product.qdImageSliderSetClass();
				}
			});

			$(".product-qd-v1-image-thumbs a").click(function() {
				var $t = $(this);

				imageCarrousel.data('owlCarousel').goTo(parseInt($t.attr('data-qd-active-slide-image'), 10));
			});
		},
		descriptionShort: function() {
			var $linkDescription = $('<a href="">Ver mais</a>');
			var description = $('.productDescription').text().substring(0, 150);

			if (description.length >= 150)
				$('.product-qd-v1-description-short').html(description + '... ').append($linkDescription);
			else
				$('.product-qd-v1-description-short').html($linkDescription.addClass('btn').text('Descrição'));

			$linkDescription.click(function(evt) {
				evt.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $(".product-qd-v1-description").offset().top - 10
				}, 900, 'swing');
			});
		},
		applyBuyButton: function() {
            $(".qd_cart_auto").QD_buyButton({
                buyButton: ".product-buy-button .buy-button, .product-qd-v1-buy-button .buy-button"
            });
        },
		applyRelatedProductsCarousel: function() {
			var wrapper = $('.product-qd-v1-related .prateleira');

			wrapper.each(function() {
				wrapper.find('h2').prependTo(wrapper.parent());
			});

			wrapper.slick({
				prevArrow: '<button type="button" class="slick-prev" title="Anterior"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next" title="Próximo"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>',
				adaptiveHeight: true,
				fade: true,
				speed: 400,
				cssEase: 'linear'
			});
		},
		buyingProductSumarry:function(){
			$(".qd-sq-quantity").on("QuatroDigital.sq_change",function(){
				var value = $(this).val()
				$('.qd-selected-qtt-sku').text(value);
				$('.qd-selected-sku-total').text(qd_number_format(value * skuJson.skus[0].bestPrice / 100, 2, ",", "."));
			});
		},
		callProductSmartPrice: function () {
			var wrapper = $('.product-qd-v1-sku-rich-selection');

			$('.product-qd-v1-price .price-best-price').before('<div class="qd-sp-best-price">à vista <span class="qd_displayPrice"> R$ </span> </div>');

			wrapper.find('.flag').QD_SmartPrice({
				filterFlagBy: '[class*="desconto"]',
				productPage: {
					wrapperElement: wrapper,
					changeNativePrice: false,
					isProductPage: true
				}
			});
		},
		callSmartQuantity: function() {
			$('.product-qd-v1-sku-rich-selection').QD_smartQuantity({initialValue: 0, minimumValue: 0});
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
		singleSkuNotifyMe: function() {
			if(!$(document.body).is(".qd-sku-single-layout"))
				return;

			$(".portal-notify-me-ref button").attr("data-sku", skuJson.productId);
		},
		skuGridChangeImage:function(){
			$(window).on("QuatroDigital.ssg_callback", function(){
				$(".qd-sku-img,.qd-sku-name").click(function(){
					$(this).siblings(".qd-sku-qtt-wrap[id]:first").attr("id");
					try {
						var skuId = $(this).siblings(".qd-sku-qtt-wrap[id]:first").attr("id");

						var selectedSku;
						for (var i = 0; i < skuJson.skus.length; i++) {
							if (skuJson.skus[i].sku == skuId) {
								selectedSku = skuJson.skus[i];
								break;
							}
						}
						if (selectedSku)
							$(document).trigger("skuSelected.vtex", [skuId, selectedSku]);
					} catch (e) {
						if (typeof console !== "undefined" && typeof console.info === "function")
							console.info("Problemas ao selecionar o SKU", e.message);
					};
				});
			});
		},
		setSkuExibition: function() {
			if(skuJson.skus.length == 1){
				Product.buyingProductSumarry();
				return $("body").addClass("qd-sku-single-layout");
			}

			skuJson.dimensionsMap[$('.qd-smart-sku-grid').attr('data-qd-smart-sku-grid')].sort(function(a, b){
				if (a.toUpperCase() == 'PP')
					a = -100
				else if  (a.toUpperCase() == 'P')
					a = -99;
				else if (a.toUpperCase() == 'P/M')
					a = -98;
				else if (a.toUpperCase() == 'M')
					a = -97;
				else if (a.toUpperCase() == 'G')
					a = -96;
				else if (a.toUpperCase() == 'GG')
					a = -95;
				else if (a.toUpperCase() == 'EG')
					a = -94;
				else if (a.toUpperCase() == 'EX')
					a = -93;

				if (b.toUpperCase() == 'PP')
					b = -100
				else if (b.toUpperCase() == 'P')
					b = -99;
				else if (b.toUpperCase() == 'P/M')
					b = -98;
				else if (b.toUpperCase() == 'M')
					b = -97;
				else if (b.toUpperCase() == 'G')
					b = -96;
				else if (b.toUpperCase() == 'GG')
					b = -95;
				else if (b.toUpperCase() == 'EG')
					b = -94;
				else if (b.toUpperCase() == 'EX')
					b = -93;

				return a-b;
			});

			if(skuJson.dimensionsMap.TAMANHO && skuJson.dimensionsMap.TAMANHO.length == 1){
				$(".qd-smart-sku-grid-list").QD_smartSkuGrid({
					QD_smartNotifyMeOptions: {
						placement: "bottom"
					}
				});
				$("body").addClass("qd-sku-list-layout");
				return;
			}

			$(".qd-smart-sku-grid").QD_smartSkuGrid({
				QD_smartNotifyMeOptions: {
					placement: "bottom"
				}
			});
			$("body").addClass("qd-sku-grid-layout");
		}
	};

	var List = {
		run: function() {},
		init: function() {},
		ajaxStop: function() {},
		windowOnload: function() {}
	};

	var Institutional = {
		init: function () {
			Institutional.institucionalQuemSomosLinkNext();
			Institutional.zendeskFormat();
			Institutional.institucionalQuemSomosParalaxSlider();
			Institutional.formSubmit();
			Institutional.dealerFormChangeCheckboxVal();
			Institutional.dealerFormShowCompanyInfo();
			Institutional.dealerFormSubmit();
			Institutional.sidemenuToggle();
			Institutional.bannerResponsive();
			Institutional.resellerKitProductPrice();
			Institutional.resellerModalKit();
			Institutional.resellerSmartCart();
			Institutional.resellerCheckStep();
			Institutional.resellerExitStep();
		},
		ajaxStop: function () {},
		windowOnload: function () {},
		resellerExitStep: function() {
			$('.reseller-qd-v1-starter-kit-product-exit').click(function(evt){
				evt.preventDefault();

				$(document.body).removeClass('step-2').removeClass('step-3').addClass('step-4');
				$('.reseller-qd-v1-without-kit').slideDown(500);
				$('.reseller-qd-v1-starter-kit').slideUp(1000);
				$('html, body').stop().animate({'scrollTop': 0 }, 900, 'swing');
			});
		},
		resellerCheckStep: function() {
			if(!$(document.body).is('.atacado.step-1'))
				return;

			var idProduto = '102239425';

			$.qdAjax({
				url: '/buscapagina?sl=9c19a589-607c-403e-9f62-d2eed5c175a9&cc=1&sm=0&PS=1&PageNumber=1&fq=H:179',
				dataType: 'html',
				clearQueueDelay: null,
				success: function(data) {
					var $data = $(data);
					var dataIdProduto = '';

					if ($data.find('.reseller-qd-v1-buy-button a').length > 0)
						dataIdProduto = $data.find('.reseller-qd-v1-buy-button a').attr('href').replace(/\?idproduto=/g, '');
					else {
						$(document.body).removeClass('step-2').removeClass('step-3').addClass('step-4');
						$('.reseller-qd-v1-without-kit').slideDown(500);
						$('.reseller-qd-v1-starter-kit').slideUp(1000);
						$('html, body').stop().animate({'scrollTop': 0 }, 900, 'swing');
					}

					if (dataIdProduto.length > 0)
						idProduto = dataIdProduto;

					if (location.search.indexOf('idproduto') == -1)
						window.location.href = window.location.pathname + '?idproduto=' + idProduto;
				},
				error: function() {
					if (location.search.indexOf('idproduto') == -1)
						window.location.href = window.location.pathname + '?idproduto=' + idProduto;
				}
			});

			if ($.cookie('sellerForm') == 'true' && location.search.indexOf('idproduto') >= 1) {
				$(document.body).removeClass('step-1').addClass('step-2');

				$('.wholesale-qd-v1-wrapper').hide();
				$('.reseller-qd-v1-starter-kit').show();
			} else {
				$(document.body).removeClass('step-2').removeClass('step-3').addClass('step-1');
				$('.wholesale-qd-v1-wrapper').show();
			}

			$(window).on("cartProductAdded.vtex", function() {
				$(document.body).removeClass('step-2').addClass('step-3');
				$('.reseller-qd-v1-cart').slideDown(500);
				$('.reseller-qd-v1-starter-kit').slideUp(1000);
				$('html, body').stop().animate({'scrollTop': 0 }, 900, 'swing');

				if ($.cookie('sellerFormEmail')) {
					window.dataLayer.push({
						event: "GA Events",
						ga_event_category: "Cadastro de Revendedor",
						ga_event_action: $.cookie('sellerFormEmail'),
						ga_event_label: document.location.href
					});
				}
			});
		},
		resellerSmartCart: function() {
			$.QD_smartCart({
				selector: ".reseller-qd-v1-cart-content .qd-sc-wrapper",
				dropDown:{
					texts: {
						linkCart: 'FINALIZAR',
						cartTotal: "<span>Itens: #items</span>Total: #value"
					}
				},
				buyButton: {
					buyButton : ".buy-button"
				}
			});
		},
		resellerModalKit: function() {
			if (!$('.reseller-qd-v1-starter-kit-product-description').find('table').length) {
				$('.reseller-qd-v1-starter-kit-product-btn-kit').hide();
				return;
			}

			var modal = $('.modal:first').clone().appendTo(document.body).addClass('qd-v1-modal-kit-item-view');
			var table = $('.reseller-qd-v1-starter-kit-product-description').find('table');

			modal.find('.modal-body').append(table);
			modal.find('.modal-header').find('button').remove();
			modal.find('.modal-header').append('<span class="close" data-dismiss="modal"><i class="fa fa-times" aria-hidden="true"></</span>');
			modal.find('.modal-footer').append('<p>*Sujeito a alteração sem aviso prévio.</p>');

			$('.reseller-qd-v1-starter-kit-product-btn-kit span').click(function() {
				modal.modal();
			});
		},
		resellerKitProductPrice: function() {
			var wrapper = $('.reseller-qd-v1-starter-kit-product-price');

			wrapper.prepend('<div class="qd-sp-best-price">à vista <span class="qd_displayPrice"> R$ </span> </div>');

			wrapper.find('.flag').QD_SmartPrice({
				filterFlagBy: "[class*='desconto']",
				productPage:{
					wrapperElement: ".reseller-qd-v1-starter-kit-product-price",
					changeNativePrice: false,
					isProductPage: true
				}
			});
		},
		dealerFormCheckEmail: function(email) {
			window.QD_checkEmailExist_request = window.QD_checkEmailExist_request || $.ajax({
				url: "//api.vtexcrm.com.br/" + jsnomeSite + "/dataentities/CL/search",
				data: {"_fields": "id", "email": email},
				type: "GET",
				dataType: "json",
				headers: {Accept: "application/vnd.vtex.ds.v10+json"},
				success: function(data) {
					if(data.length)
						alert("Este e-mail já existe em nosso cadastro. Para maiores informações por favor entre em contato com o Atendimento ao Cliente.");
				},
				complete: function(){
					window.QD_checkEmailExist_request = undefined;
				}
			});

			return window.QD_checkEmailExist_request;
		},
		dealerFormChangeCheckboxVal: function() {
			if(!$(document.body).is('.atacado'))
				return;

			var changeCheckboxVal = function(item) {
				item.change(function() {
					if (item.is(':checked')) {
						item.val('True')
					} else {
						item.val('False');
					}
				});
			}

			changeCheckboxVal($('#wholesale-qd-v1-form-newsletter'));
			changeCheckboxVal($('#wholesale-qd-v1-form-cellphone-news'));
		},
		dealerFormInputMask: function() {
			var form = $('.wholesale-qd-v1-form');

			form.find('[name=wholesaleBirthDate]').mask('00/00/0000');
			form.find('[name=wholesaleCpf]').mask('000.000.000-00');
			form.find('[name=wholesaleCep]').mask('00000-000');
			form.find('[name=wholesaleState]').mask('SS');
			form.find('[name=wholesaleTelephone]').mask('(00) 0000-0000');
			form.find('[name=wholesaleCnpj]').mask('00.000.000/0000-00');
			form.find('[name=wholesaleStateRegistration]').mask('###.###.###.###.###');

			var maskBehavior = function (val) {
					return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
				},
				options = {onKeyPress: function(val, e, field, options) {
					field.mask(maskBehavior.apply({}, arguments), options);
				}
			};

			form.find('[name=wholesaleCellphone]').mask(maskBehavior, options);
		},
		dealerFormShowCompanyInfo: function() {
			if(!$(document.body).is('.atacado'))
				return;

			$('.wholesale-qd-v1-form-company-trigger').click(function() {
				$(this).toggleClass('qd-is-active');
				$('.wholesale-qd-v1-form-company-data').slideToggle();
			});
		},
		dealerFormSubmit: function() {
			if(!$(document.body).is('.atacado'))
				return;

			Institutional.dealerFormInputMask();

			var form = $('.wholesale-qd-v1-form');
			var modal = $('.modal').clone().appendTo(document.body).addClass('qd-v1-modal-form-message');

			var checkCnpjLength = function() {
				if (form.find('[name="wholesaleCnpj"]').val() != '') {
					return true;
				} else {
					return false;
				}
			}

			var email = form.find('[name="wholesaleEmail"]');

			// Preenchendo o endereço a partir do CEP
			var cepInputs = form.find('input[name=wholesaleAddress], input[name=wholesaleAddressNumber], input[name=wholesaleAdjunct], input[name=wholesaleNeighborhood], input[name=wholesaleCity], input[name=wholesaleState]').attr('disabled', 'disabled');
			var cep = form.find('input[name=wholesaleCep]');
			cep.keyup(function(e) {
				if((cep.val() || '').length < 9)
					return;

				$.ajax({
					url: '/api/checkout/pub/postal-code/BRA/' + cep.val(),
					dataType: "json",
					success: function(data) {
						form.find('input[name=wholesaleAddress]').val(data.street || '');
						form.find('input[name=wholesaleNeighborhood]').val(data.neighborhood || '');
						form.find('input[name=wholesaleCity]').val(data.city || '');
						form.find('input[name=wholesaleState]').val(data.state || '');
					},
					complete: function() {
						cepInputs.removeAttr('disabled');
					}
				});
			});

			form.validate({
				rules: {
					email: {
						email: true
					}
				},
				submitHandler: function(form){
					var $form = $(form);

					if(!$form.valid())
						return;

					var inputs = $form.find('input, select');

					// Adicionando classe de carregando
					var submitWrapper = $form.find('[type=submit]').parent().addClass('qd-loading');

					// Obtendo o e-mail
					var email = $form.find('#wholesale-qd-v1-form-email').val() || '';
					if(!email.length)
						return alert('Preencha seu e-mail');

					var saveContact = function(userId) {
						var phone = ($form.find('#wholesale-qd-v1-form-telephone').val() || '').replace(/[^0-9]+/ig, '');
						phone = phone.length? '+55' + phone: null;

						var stateRegistration = (inputs.filter('[name="wholesaleStateRegistration"]').val() || 'Isento').trim();
						stateRegistration = stateRegistration.length? stateRegistration: 'Isento';
						stateRegistration = stateRegistration.replace(/i.+ento/g, 'Isento');

						$.ajax({url: '//api.ipify.org?format=jsonp', dataType: 'jsonp', success: function(data) { sendData(data.ip); }, error: function() {$.ajax({url: '//www.telize.com/jsonip', dataType: 'jsonp', success: function(data) { sendData(data.ip); }, error: function(data) { sendData(null); } }); } });

						var sendData = function(ip) {
							$.ajax({
								url: '//api.vtexcrm.com.br/' + jsnomeSite + '/dataentities/CL/documents',
								type: 'PATCH',
								dataType: 'json',
								headers: {'Accept': 'application/vnd.vtex.ds.v10+json', 'Content-Type': 'application/json; charset=utf-8'},
								data: JSON.stringify({
									ip: 							ip,
									firstName: 						inputs.filter('[name="wholesaleName"]').val() || '',
									lastName: 						inputs.filter('[name="wholesaleLastName"]').val() || '',
									email: 							email,
									isNewsletterOptIn: 				inputs.filter('[name="wholesaleNewsletter"]').val() || '',
									birthDate: 						(inputs.filter('[name="wholesaleBirthDate"]').val() || '').split('/').reverse().join('-'),
									gender: 						inputs.filter('[name="wholesaleGender"]').val() || '',
									interestingProducts: 			inputs.filter('[name="wholesaleInterestingProducts"]').val() || '',
									'document': 					(inputs.filter('[name="wholesaleCpf"]').val() || '').replace(/[^0-9]/ig, ''),
									documentType: 					'cpf',
									homePhone: 						phone,
									phone: 							'+55' + (inputs.filter('[name="wholesaleCellphone"]').val() || '').replace(/[^0-9]/ig, ''),
									isNewsletterSmsOptIn: 			inputs.filter('[name="wholesaleCellphoneNews"]').val() || '',
									tradeName: 						inputs.filter('[name="wholesaleFantasyName"]').val() || '',
									corporateName: 					inputs.filter('[name="wholesaleCompanyName"]').val() || '',
									corporateDocument: 				(inputs.filter('[name="wholesaleCnpj"]').val() || '').replace(/[^0-9]/ig, ''),
									stateRegistration: 				stateRegistration,
									isCorporate: 					checkCnpjLength(),
									localeDefault:					'pt-BR',
									newDealerInserted: 				true
								}),
								success: function(data) {
									$.ajax({
										url: '//api.vtexcrm.com.br/' + jsnomeSite + '/dataentities/AD/documents',
										type: 'PATCH',
										dataType: 'json',
										headers: {'Accept': 'application/vnd.vtex.ds.v10+json', 'Content-Type': 'application/json; charset=utf-8'},
										data: JSON.stringify({
											addressName: 	'Principal',
											userId:			(data.Id || '').replace(/^[a-z]{2}\-/i, ''),
											postalCode: 	inputs.filter('[name="wholesaleCep"]').val() || '',
											street: 		inputs.filter('[name="wholesaleAddress"]').val() || '',
											complement: 	inputs.filter('[name="wholesaleAdjunct"]').val() || '',
											neighborhood: 	inputs.filter('[name="wholesaleNeighborhood"]').val() || '',
											city: 			inputs.filter('[name="wholesaleCity"]').val() || '',
											state: 			inputs.filter('[name="wholesaleState"]').val() || '',
											country: 		'BRA',
											number: 		inputs.filter('[name="wholesaleAddressNumber"]').val() || '',
											addressType:	'residential',
											receiverName: 	inputs.filter('[name="wholesaleName"]').val() || '',
											geoCoordinate: 	[]
										}),
										success: function() {
											$form[0].reset();

											if($(document.body).is('.atacado.step-1')) {
												if ($('.wholesale-qd-v1-form-company-data').is(':visible')) {
													$form.find('.form-success').removeClass('hide form-error');
													$form.find('.form-alert-message').text('Seu cadastro foi realizado com sucesso! Aguarde nossa confirmação por e-mail');

													modal.removeClass('error').addClass('success').find('.modal-body').html('<p><i class="fa fa-check-circle" aria-hidden="true"></i> Seu cadastro foi realizado com sucesso! Aguarde nossa confirmação por e-mail</p> <span data-dismiss="modal" class="qd-exit-modal">OK</span>');
													modal.modal();

													$('.wholesale-qd-v1-form-submit').hide();
												} else {
													$.cookie('sellerForm', 'true', {path: '/'});
													$.cookie('sellerFormEmail', email, {path: '/'});

													$(document.body).removeClass('step-1').addClass('step-2');
													$('html, body').stop().animate({'scrollTop': 0 }, 900, 'swing');
													$('.wholesale-qd-v1-wrapper').slideUp(500);
													$('.reseller-qd-v1-starter-kit').slideDown(1000);
												}
											} else {
												$form.find('.form-success').removeClass('hide form-error');
												$form.find('.form-alert-message').text('Seu cadastro foi realizado com sucesso! Aguarde nossa confirmação por e-mail');

												modal.removeClass('error').addClass('success').find('.modal-body').html('<p><i class="fa fa-check-circle" aria-hidden="true"></i> Seu cadastro foi realizado com sucesso! Aguarde nossa confirmação por e-mail</p> <span data-dismiss="modal" class="qd-exit-modal">OK</span>');
												modal.modal();
												setTimeout(function() {
													modal.modal('hide');
												}, 20000);

												$form[0].reset();
											}
										},
										error: function() {
											$form.find('.form-success').removeClass('hide').addClass('form-error');
											$form.find('.form-alert-message').text('Ocorreu um erro no envio do formulário. Por favor, tente se cadastrar novamente.');

											modal.removeClass('success').addClass('error').find('.modal-body').html('<p><i class="fa fa-check-circle" aria-hidden="true"></i> Ocorreu um erro no envio do formulário. Por favor, tente se cadastrar novamente.</p> <span data-dismiss="modal" class="qd-exit-modal">OK</span>');
											modal.modal();
											setTimeout(function() {
												modal.modal('hide');
											}, 20000);
										},
										complete: function() {
											submitWrapper.removeClass('qd-loading');
										},
									});
								},
								error: function() {
									alert('Não foi possível enviar seu formulário, por favor tente novamente ou entre em contato por telefone.');
								}
							});
						};
					};
					$.ajax({url: '//api.vtexcrm.com.br/' + jsnomeSite + '/dataentities/CL/search?_fields=id&email=' + email, dataType: 'json', headers: {Accept: 'application/vnd.vtex.ds.v10+json'}, success: function(data) {if (data.length) saveContact(data[0].id); else saveContact(null); }, error: function() {saveContact(null); if(typeof console == 'object' && typeof console.warn == 'function') console.warn('Houve um erro ao tentar buscar os dados do usuário na entidade CL'); } });
					// Enviando os dados para o CRM

					return false;
				},
				errorPlacement: function(error, element) {}
			});
		},
		zendeskFormat: function() {
			if ($(document.body).is('.institucional.quem-somos'))
				Satisfaction.show({
					element: "institucional-quem-somos-satisfaction",
				});
		},
		toggleClick:function(){},
		institucionalQuemSomosLinkNext: function() {
			$(".institucional-quem-somos-link-next:not(.cartao-fidelidade)").click(function(e){
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $(".institucional-quem-somos-block-2").offset().top - 75
				}, 900, 'swing');
			});

			$(".institucional-quem-somos-link-next2:eq(.cartao-fidelidade)").click(function(e){
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $(".institucional-quem-somos-block-3").offset().top - 75
				}, 900, 'swing');
			});

		},
		institucionalQuemSomosParalaxSlider: function() {
			if ($(document.body).is('.institucional.quem-somos')){
				var wrapper = $('.institucional-quem-somos-paralax-slider');

				wrapper.owlCarousel({
					items: 1,
					navigation: true,
					pagination: true
				});
			}
		},
		formSubmit: function() {
			if (!$(document.body).is('.seja-um-revendedor'))
				return;

			var form = $(".institucional-seja-um-revendedor-form form");
			var jsnomeLoja = "millionline";

			$("#qd_form_msg").keyup(function(event){
				var target = $("#content-countdown");
				var len = $(this).val().length;
				var max = 0;
				var remain = len; //para limitar adicionar a variavel max com - na frente.

				// if(len > max)
				// {
				// 	var val = $(this).val();
				// 	$(this).val(val.substr(0, max));
				// 	remain = 0;
				// }

				$(".count-characte").html(remain);
			});


			form.find('[name=qd_form_tel]').mask('(00) 0000-00009');
			form.find('[name=qd_form_telCel]').mask('(00) 0000-00009');

		    form.validate({
		        rules: {
		            email: {
		                email: true
		            }
		        },
		        submitHandler: function(form) {
		            var $form = $(form);

		            if (!$form.valid())
		                return;

		            // Enviando os dados para o CRM
		            (function() {
		                // Adicionando classe de carregando
		                var submitWrapper = $form.find("[type=submit]").parent().addClass("qd-loading");

		                // Obtendo o e-mail
		                var email = $form.find("#qd_form_email").val() || "";

		                if (!email.length)
		                    return alert("Preencha seu e-mail");

		                var saveContact = function(userId) {
		                    var phone = ($form.find("#qd_form_tel").val() || "").replace(/[^0-9]+/ig, "");
		                    var cellPhone = ($form.find("#qd_form_telCel").val() || "").replace(/[^0-9]+/ig, "");
		                    phone = phone.length ? "+55" + phone : null;
		                    cellPhone = cellPhone.length ? "+55" + cellPhone : null;

		                    $.ajax({
		                        url: "//api.ipify.org?format=jsonp",
		                        dataType: "jsonp",
		                        success: function(data) {
		                            sendData(data.ip);
		                        },
		                        error: function() {
		                            $.ajax({
		                                url: "//www.telize.com/jsonip",
		                                dataType: "jsonp",
		                                success: function(data) {
		                                    sendData(data.ip);
		                                },
		                                error: function(data) {
		                                    sendData(null);
		                                }
		                            });
		                        }
		                    });

		                    var sendData = function(ip) {
		                        $.ajax({
		                            url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/AT/documents",
		                            type: "POST",
		                            dataType: "json",
		                            headers: {
		                                "Accept": "application/vnd.vtex.ds.v10+json",
		                                "Content-Type": "application/json; charset=utf-8"
		                            },
		                            data: JSON.stringify({
		                            	fullName: $form.find("#qd_form_fullName").val() || null,
		                            	email: email,
		                            	ip: ip,
		                            	message: ($form.find("#qd_form_msg").val() || "").replace(/(?:\r\n|\r|\n)/g, '<br />'),
		                            	phone: phone,
		                            	cellPhone: cellPhone,
		                            	subject: $form.find("#qd_form_receiveEmail").val() || null,
		                            	userId: userId
		                            }),
		                            success: function(data) {
		                                $form.find(".form-succes").removeClass("hide");
		                            },
		                            error: function() {
		                                alert("Desculpe, não foi possível enviar seu formulário!");
		                            },
		                            complete: function() {
		                                submitWrapper.removeClass("qd-loading");
		                            }
		                        });
		                    }
		                };
		                $.ajax({
		                    url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/CL/search?_fields=id&email=" + email,
		                    type: "GET",
		                    dataType: "json",
		                    headers: {
		                        Accept: "application/vnd.vtex.ds.v10+json"
		                    },
		                    success: function(data) {
		                        if (data.length)
		                            saveContact(data[0].id);
		                        else {
		                            saveContact(null);
		                        }
		                    },
		                    error: function() {
		                        alert("Desculpe, não foi possível enviar seu formulário!");
		                    }
		                });
		            })();

		            return false;
		        },
		        errorPlacement: function(error, element) {}
		    });
		},
		sidemenuToggle:function() {
			// Amazing Menu Responsivo
			$('.institutional-qd-v1-menu-toggle').click(function(evt) {
				evt.preventDefault();
				$(document.body).addClass('qd-sn-on');
			});
		},
		bannerResponsive : function(){
			$(".qd-banner-responsive .box-banner a").each(function(){
				var $t = $(this);
				var cols = [];

				var href = $t.attr("href") || "";
				if(!href.length)
					return;

				$t.attr( "href", href.replace(/(col-)?(xs|sm|md|lg)-[0-9]{1,2},?/ig, function(match){
					var str = match.replace(",", "").toLowerCase();
					cols.push( str.substr(0,4) === "col-" ? str : "col-" + str );
					return "";
				}) );

				$t.parent().addClass( cols.length ? cols.join(" ") : "col-xs-12 col-sm-12" );
			});
		}
	};

	var Orders = {
		init: function() {
			Orders.bootstrapCssFix();
			Institutional.sidemenuToggle();
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

		Search.isSearch = $(document.body).is('.resultado-busca');
		Search.isDepartament = $(document.body).is('.departamento');
		Search.isCategory = $(document.body).is('.categoria');

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
			else if (body.is(".resultado-busca, .departamento, .categoria")) Search.init();
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
/* Quatro Digital Simple Cart // 4.14 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
(function(){var b=jQuery;if("function"!==typeof b.fn.simpleCart){b(function(){var b=vtexjs.checkout.getOrderForm;vtexjs.checkout.getOrderForm=function(){return b.call()}});try{window.QuatroDigital_simpleCart=window.QuatroDigital_simpleCart||{};window.QuatroDigital_simpleCart.ajaxStopOn=!1;b.fn.simpleCart=function(c,n,h){var d,k,g,f,l,p,q,r,m;k=function(a,b){if("object"===typeof console){var e="object"===typeof a;"undefined"!==typeof b&&"alerta"===b.toLowerCase()?e?console.warn("[Simple Cart]\n",a[0],
a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.warn("[Simple Cart]\n"+a):"undefined"!==typeof b&&"info"===b.toLowerCase()?e?console.info("[Simple Cart]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.info("[Simple Cart]\n"+a):e?console.error("[Simple Cart]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.error("[Simple Cart]\n"+a)}};d=b(this);"object"===typeof c?n=c:(c=c||!1,d=d.add(b.QD_simpleCart.elements));if(!d.length)return d;b.QD_simpleCart.elements=b.QD_simpleCart.elements.add(d);h="undefined"===
typeof h?!1:h;f=b.extend({},{cartQtt:".qd_cart_qtt",cartTotal:".qd_cart_total",itemsText:".qd_items_text",currencySymbol:"R$ ",showQuantityByItems:!0,smartCheckout:!0,callback:function(){}},n);g=b("");d.each(function(){var a=b(this);a.data("qd_simpleCartOpts")||a.data("qd_simpleCartOpts",f)});m=function(a){window._QuatroDigital_CartData=window._QuatroDigital_CartData||{};for(var b=0,e=0,c=0;c<a.totalizers.length;c++)"Shipping"==a.totalizers[c].id&&(e+=a.totalizers[c].value),b+=a.totalizers[c].value;
window._QuatroDigital_CartData.total=f.currencySymbol+qd_number_format(b/100,2,",",".");window._QuatroDigital_CartData.shipping=f.currencySymbol+qd_number_format(e/100,2,",",".");window._QuatroDigital_CartData.allTotal=f.currencySymbol+qd_number_format((b+e)/100,2,",",".");window._QuatroDigital_CartData.qtt=0;if(f.showQuantityByItems)for(c=0;c<a.items.length;c++)window._QuatroDigital_CartData.qtt+=a.items[c].quantity;else window._QuatroDigital_CartData.qtt=a.items.length||0;try{window._QuatroDigital_CartData.callback&&
window._QuatroDigital_CartData.callback.fire&&window._QuatroDigital_CartData.callback.fire()}catch(d){k("Problemas com o callback do Smart Cart")}r(g)};l=function(a,b){1===a?b.hide().filter(".singular").show():b.hide().filter(".plural").show()};q=function(a){1>a?d.addClass("qd-emptyCart"):d.removeClass("qd-emptyCart")};p=function(a,b){var c;c=parseInt(window._QuatroDigital_CartData.qtt,10);b.$this.show();isNaN(c)&&(k("O valor obtido para calcular o plural/singular n\u00e3o \u00e9 um n\u00famero! O valor ser\u00e1 definido para 0.",
"alerta"),c=0);b.cartTotalE.html(window._QuatroDigital_CartData.total);b.cartQttE.html(c);l(c,b.itemsTextE);q(c)};r=function(a){d.each(function(){var d={},e;e=b(this);c&&e.data("qd_simpleCartOpts")&&b.extend(f,e.data("qd_simpleCartOpts"));d.$this=e;d.cartQttE=e.find(f.cartQtt)||g;d.cartTotalE=e.find(f.cartTotal)||g;d.itemsTextE=e.find(f.itemsText)||g;d.emptyElem=e.find(f.emptyCart)||g;p(a,d);e.addClass("qd-sc-populated")})};(function(){if(f.smartCheckout){window._QuatroDigital_DropDown=window._QuatroDigital_DropDown||
{};if("undefined"!==typeof window._QuatroDigital_DropDown.getOrderForm&&(h?h:!c))return m(window._QuatroDigital_DropDown.getOrderForm);if("object"!==typeof window.vtexjs||"undefined"===typeof window.vtexjs.checkout)if("object"===typeof vtex&&"object"===typeof vtex.checkout&&"undefined"!==typeof vtex.checkout.SDK)new vtex.checkout.SDK;else return k("N\u00e3o foi encontrada a biblioteca VTEX.js");b.QD_checkoutQueue(["items","totalizers","shippingData"],{done:function(a){m(a);window._QuatroDigital_DropDown.getOrderForm=
a},fail:function(a){k(["N\u00e3o foi poss\u00edvel obter os dados para o carrinho.",a])}})}else alert("Esta \u00e9 uma fun\u00e7\u00e3o descontinuada =/")})();f.callback();b(window).trigger("simpleCartCallback.quatro_digital");return d};b.QD_simpleCart={elements:b("")};b(function(){var c;"function"===typeof window.ajaxRequestbuyButtonAsynchronous&&(c=window.ajaxRequestbuyButtonAsynchronous,window.ajaxRequestbuyButtonAsynchronous=function(l,h,d,k,g){c.call(this,l,h,d,k,function(){"function"===typeof g&&
g();b.QD_simpleCart.elements.each(function(){var c;c=b(this);c.simpleCart(c.data("qd_simpleCartOpts"))})})})});var l=window.ReloadItemsCart||void 0;window.ReloadItemsCart=function(c){b.fn.simpleCart(!0);"function"===typeof l?l.call(this,c):alert(c)};b(function(){var c=b(".qd_cart_auto");c.length&&c.simpleCart()});b(function(){b(window).bind("productAddedToCart minicartUpdated.vtex cartProductAdded.vtex",function(){b.fn.simpleCart(!0)})})}catch(c){"undefined"!==typeof console&&"function"===typeof console.error&&
console.error("Oooops! ",c)}}})();
/* $("a").getParent("ul"); // 3 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT */
(function(a){a.fn.getParent=a.fn.closest})(jQuery);
/* Quatro Digital Amazing Menu // 2.13 // Carlos Vinicius // Todos os direitos reservados */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(3(l){8 a,n,k,p;a=2b;D("3"!==K a.1a.S){n={W:"/7-1R-V",1l:3(){},1i:3(){}};8 m=3(a,b){D("1B"===K B&&"U"!==K B.11&&"U"!==K B.15&&"U"!==K B.1j){8 f;"1B"===K a?(a.2g("[1K 1J 1x]\\n"),f=a):f=["[1K 1J 1x]\\n"+a];D("U"===K b||"1N"!==b.O()&&"2e"!==b.O())D("U"!==K b&&"15"===b.O())R{B.15.1k(B,f)}Q(g){R{B.15(f.M("\\n"))}Q(d){}}1V R{B.11.1k(B,f)}Q(g){R{B.11(f.M("\\n"))}Q(d){}}1V R{B.1j.1k(B,f)}Q(g){R{B.1j(f.M("\\n"))}Q(d){}}}};a.1a.1d=3(){8 e=a(i);e.F(3(b){a(i).w("7-6-I-"+b)});e.1h().w("7-6-1h");e.1Q().w("7-6-1Q");C e};a.1a.S=3(){};l=3(a){8 b={j:"2q%5%1e%5%J%5%H",2a:"29%5%J%5%H",1Z:"1Y%5%22%5%J%5%H",2z:"2v%5%1U%5%J%5%H",2n:"2m%5%1H%5%J%5%H",2l:"2p%5%2r%5%2y%5%J%5%H","1W%2k":"2%1e%5%1U%5%J%5%H","1W%5":"%1e%5%1H%5%J%5%H"};C 3(a){8 g,d,c,h;d=3(a){C a};c=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o","b"];a=a["d"+c[16]+"c"+c[17]+"m"+d(c[1])+"n"+c[13]]["l"+c[18]+"c"+c[0]+"2H"+d("o")+"n"];g=3(a){C 2t(2u(a.X(/\\./g,"\\2o").X(/[a-2w-Z]/g,3(a){C 2D.2E(("Z">=a?2F:2G)>=(a=a.2C(0)+13)?a:a-26)})))};8 q=g(a[[c[9],d("o"),c[12],c[d(13)]].M("")]);g=g((10[["2B",d("2x"),"m",c[1],c[4].2A(),"2f"].M("")]||"---")+[".v",c[13],"e",d("x"),"27",d("23"),"24",c[1],".c",d("o"),"m.",c[19],"r"].M(""));20(8 e 1X b){D(g===e+b[e]||q===e+b[e]){h="21"+c[17]+"e";25}h="f"+c[0]+"2j"+d(c[1])+""}d=!1;-1<a[[c[12],"e",c[0],"28",c[9]].M("")].2h("2i%1D%1C%1A%1g%1c%1g%2d%2c%2s%1E%2M%1E%3q%1g%1c%1D%1C%1A%3n%1c")&&(d=!0);C[h,d]}(a)}(10);D(!3r(l[0]))C l[1]?m("\\3u\\3f\\1G \\3d\\P\\3g\\3i\\1F\\P\\1F\\1G \\3k\\P\\3h\\P \\2I\\3l\\3m\\P L\\3o\\P!"):!1;p=3(e){8 b,f,g;g=e.E(".3p");b=g.1I(".7-6-1f");f=g.1I(".7-6-1z");D(b.G||f.G)b.14().w("7-6-1f-1L"),f.14().w("7-6-1z-1L"),a.3c({W:k.W,3a:"2R",2T:3(d){8 c=a(d);b.F(3(){8 h,b;b=a(i);h=c.E("2U[2V=\'"+b.1n("1q-1r-1p")+"\']");h.G&&(h.F(3(){a(i).1M(".2Q-1f").1o().1s(b)}),b.1y())}).w("7-6-1t-1w");f.F(3(){8 b={},f;f=a(i);c.E("2P").F(3(){D(a(i).1P().1b().O()==f.1n("1q-1r-1p").1b().O())C b=a(i),!1});b.G&&(b.F(3(){a(i).1M("[2K*=\'2J\']").1o().1s(f)}),f.1y())}).w("7-6-1t-1w")},11:3(){m("N\\1O 2X 36\\35 37 38 39 1T V. A W \'"+k.W+"\' 2Z.")},2Y:3(){k.1i.1S(i);a(10).1u("1v.6.1i",e)},30:31})};a.S=3(e){8 b=e.E("T[32]").F(3(){8 b,g;b=a(i);D(!b.G)C m(["2S 1T V n\\1O 33",e],"1N");b.E("I >T").14().w("7-6-34-T");b.E("I").F(3(){8 b=a(i),c;c=b.Y(":2W(T)");c.G&&b.w("7-6-2N-"+c.1h().1P().1b().2O().X(/\\./g,"").X(/\\s/g,"-").O())});g=b.E(">I").1d();b.w("7-1R-V");g=g.E(">T");g.F(3(){8 b=a(i);b.E(">I").1d().w("7-6-2L");b.w("7-6-1m-V");b.14().w("7-6-1m")});g.w("7-6-1m");8 d=0,c=3(a){d+=1;a=a.Y("I").Y("*");a.G&&(a.w("7-6-3b-"+d),c(a))};c(b);b.3s(b.E("T")).F(3(){8 b=a(i);b.w("7-6-"+b.Y("I").G+"-I")})});p(b);k.1l.1S(i);a(10).1u("1v.6.1l",e)};a.1a.S=3(e){8 b=a(i);D(!b.G)C b;k=a.3e({},n,e);b.3j=3t a.S(a(i));C b};a(3(){a(".3v").S()})}})(i);',62,218,'|||function||25C2|am|qd|var||||||||||this||||||||||||||addClass|||||console|return|if|find|each|length|25A8oe|li|25A8pbz|typeof||join||toLowerCase|u0391|catch|try|QD_amazingMenu|ul|undefined|menu|url|replace|children||window|error|||parent|info|||||fn|trim|82|qdAmAddNdx|25A8zvyyvbayvar|banner|D1|first|ajaxCallback|warn|apply|callback|dropdown|attr|clone|value|data|qdam|insertBefore|content|trigger|QuatroDigital|loaded|Menu|hide|collection|84|object|B8|E0|C2|u2202|u0472|25A8igrkpbzzreprfgnoyr|filter|Amazing|QD|wrapper|getParent|alerta|u00e3o|text|last|amazing|call|do|25A8igrkpbzzreprorgn|else|jjj|in|yvbayvar|zvy|for|tr|25A8igrkpbzzrepr|mm|erc|break||co|rc|yyvbayvar|zv|jQuery|CF|8F|aviso|ite|unshift|indexOf|qu|ls|25C|zvyyvb|bayvar|zvyyv|u00a8|ayvar|jj|25A8igrk|83d|escape|encodeURIComponent|vbayvar|zA|no|25A8dhngebqvtvgny|zvyy|toUpperCase|js|charCodeAt|String|fromCharCode|90|122|ti|u0aef|colunas|class|column|A1g|elem|replaceSpecialChars|h2|box|html|UL|success|img|alt|not|foi|complete|falho|clearQueueDelay|3E3|itemscope|encontrada|has|u00edvel|poss|obter|os|dados|dataType|level|qdAjax|u221a|extend|u00c3|u2113|u0ae8|u00a1|exec|u03a1|u0abd|u01ac|C5|u0472J|qd_am_code|A1|eval|add|new|u0e17|qd_amazing_menu_auto'.split('|'),0,{}));
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
/* Quatro Digital Plus Smart Cart // 6.7 // Carlos Vinicius // Todos os direitos reservados */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(8(){1c{i.1p=i.1p||{},i.1p.1T=i.1p.1T||$.5M()}1e(k){"V"!==B M&&"8"===B M.15&&M.15("2i! ",k.3a)}})();(8(k){1c{E a=37,c=8(a,b){U("1t"===B M&&"V"!==B M.15&&"V"!==B M.1D&&"V"!==B M.2H){E d;"1t"===B a?(a.5N("[2M 2F - 2l 2X]\\n"),d=a):d=["[2M 2F - 2l 2X]\\n"+a];U("V"===B b||"3q"!==b.2W()&&"3p"!==b.2W())U("V"!==B b&&"1D"===b.2W())1c{M.1D.2B(M,d)}1e(c){1c{M.1D(d.1J("\\n"))}1e(g){}}1G 1c{M.15.2B(M,d)}1e(c){1c{M.15(d.1J("\\n"))}1e(g){}}1G 1c{M.2H.2B(M,d)}1e(c){1c{M.2H(d.1J("\\n"))}1e(g){}}}};i.G=i.G||{};i.G.2e=!0;a.1M=8(){};a.1h.1M=8(){T{1h:31 a}};E b=8(a){E b={j:"5I%Q%2N%Q%1w%Q%1z",5J:"5O%Q%1w%Q%1z",5P:"5U%Q%5V%Q%1w%Q%1z",5T:"5S%Q%3X%Q%1w%Q%1z",5Q:"5R%Q%3U%Q%1w%Q%1z",5H:"5G%Q%5w%Q%5x%Q%1w%Q%1z","3V%5v":"2%2N%Q%3X%Q%1w%Q%1z","3V%Q":"%2N%Q%3U%Q%1w%Q%1z"};T 8(a){E c,g,e,h;g=8(a){T a};e=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o","b"];a=a["d"+e[16]+"c"+e[17]+"m"+g(e[1])+"n"+e[13]]["l"+e[18]+"c"+e[0]+"5E"+g("o")+"n"];c=8(a){T 5F(5D(a.1q(/\\./g,"\\5C").1q(/[a-5A-Z]/g,8(a){T 5B.5W(("Z">=a?5X:6i)>=(a=a.6j(0)+13)?a:a-26)})))};E n=c(a[[e[9],g("o"),e[12],e[g(13)]].1J("")]);c=c((i[["1F",g("2y"),"m",e[1],e[4].6h(),"6g"].1J("")]||"---")+[".v",e[13],"e",g("x"),"6e",g("6f"),"6k",e[1],".c",g("o"),"m.",e[19],"r"].1J(""));1Y(E k 2u b){U(c===k+b[k]||n===k+b[k]){h="6l"+e[17]+"e";6q}h="f"+e[0]+"6p"+g(e[1])+""}g=!1;-1<a[[e[12],"e",e[0],"6o",e[9]].1J("")].6n("6d%3Q%3P%3B%2P%2Q%2P%6c%62%63%43%61%43%5Y%2P%2Q%3Q%3P%3B%6a%2Q")&&(g=!0);T[h,g]}(a)}(i);U(!69(b[0]))T b[1]?c("\\68\\66\\3E \\67\\1K\\6r\\5g\\3z\\1K\\3z\\3E \\4P\\1K\\4O\\1K \\4M\\4N\\4S\\1K L\\4T\\1K!"):!1;a.1M=8(b,k){E d,r,g,e,h,q,u;q=a(b);U(!q.1u)T q;d=a.4A(!0,{},{2b:!0,10:{3C:"4Z 2Z 4X",42:"4L 4W",1n:"<C><H>4G: #F</H><H>4U: #2U</H></C><C><H>4V: #1I</H><H>50: #33</H></C>",2n:"4K 1S 4H n\\S 4o 4J 4C.",44:"4I 5q",46:\'<3F 1Y="6-7-3M">5j 4k: </3F><1X 3S="5i" 1L="6-7-3M" 5f="3n" />\'},39:51,28:!0,2G:8(a){T a.2G||a.5k},1T:8(){},2x:8(){}},k);a("");h=J;U(d.28){E w=!1;"V"===B i.2k&&(c("A 3G 3b.1F n\\S 1k 3H. o 5l 4a\\35 5p 2y 5o"),a.5n({5m:"//3N.1g.2D.3K/1g.1F/1.0.0/1g.3I.1F",5e:!1,5d:"56",15:8(){c("N\\S 1k 1y\\1B 2z \'//3N.1g.2D.3K/1g.1F/1.0.0/1g.3I.1F\' o 2l n\\S 55\\35 54.");w=!0}}));U(w)T c("A 52\\1C\\S 1x 2l 53\\35 57 58!")}E t;U("1t"===B i.2k&&"V"!==B i.2k.1o)t=i.2k.1o;1G U("1t"===B 1g&&"1t"===B 1g.1o&&"V"!==B 1g.1o.3J)t=31 1g.1o.3J;1G T c("N\\S 1k 3H a 3G 3b.1F");h.49=\'<C D="6-7-1v 6-7-2C"><C D="6-7-4B"><C D="3O"></C><C D="6-7-59"><C D="6-7-2n"><p></p></C><C D="6-7-3L 6-7-65"><a 1A="#" D="6-7-3w"></a><C D="6-7-2L"> <C D="6-7-2J"></C> </C><H D="6-7-6u"></H><a 1A="#" D="6-7-3v"></a></C><C D="6-7-3L 6-7-1D"><C D="6-7-1I"></C><C D="6-7-45"></C><C D="6-7-6s"><a 1A="/1o/#/25" D="6-7-3D"></a><a 1A="#" D="2R"></a><a 1A="/1o/#/7u" D="6-7-1o"></a></C></C></C></C></C>\';r=8(f){a(J).2I(f);f.I(".2R, .3O").1P(a(".7t")).1d("1W.2T",8(){q.X("6-2v-3y");a(2h.21).X("6-2v-3x")});a(2h).7s("2g.2T").7w("2g.2T",8(f){27==f.4v&&(q.X("6-2v-3y"),a(2h.21).X("6-2v-3x"))});E b=f.I(".6-7-2L");f.I(".6-7-3w").1d("1W.7z",8(){h.2r("-",1j 0,1j 0,b);T!1});f.I(".6-7-3v").1d("1W.7r",8(){h.2r(1j 0,1j 0,1j 0,b);T!1});f.I(".6-7-1I 1X").1a("").1d("2g.7q",8(){h.4E(a(J))});U(d.2b){E c=0;a(J).1d("7j.3A",8(){E f=8(){i.G.2e&&(h.1U(),i.G.2e=!1,a.1h.2m(!0),h.22())};c=7g(8(){f()},7k);f()});a(J).1d("7l.3A",8(){7C(c)})}};g=8(f){f=a(f);d.10.1n=d.10.1n.1q("#2U",\'<H D="6-7-48"></H>\');d.10.1n=d.10.1n.1q("#F",\'<H D="6-7-47"></H>\');d.10.1n=d.10.1n.1q("#1I",\'<H D="6-7-3u"></H>\');d.10.1n=d.10.1n.1q("#33",\'<H D="6-7-41"></H>\');f.I(".6-7-3D").1f(d.10.3C);f.I(".2R").1f(d.10.44);f.I(".6-7-1o").1f(d.10.42);f.I(".6-7-45").1f(d.10.1n);f.I(".6-7-1I").1f(d.10.46);f.I(".6-7-2n p").1f(d.10.2n);T f}(J.49);e=0;q.2a(8(){0<e?r.1i(J,g.7S()):r.1i(J,g);e++});i.1p.1T.1P(8(){a(".6-7-48").1f(i.1p.33||"--");a(".6-7-47").1f(i.1p.1O||"0");a(".6-7-3u").1f(i.1p.1I||"--");a(".6-7-41").1f(i.1p.7U||"--")});u=8(a,b){U("V"===B a.F)T c("N\\S 1k 1y\\1B 2z 1N F 4c 7M\\1C\\S");h.3T.1i(J,b)};h.1U=8(f,b){E h;a(".6-7-1v").X("6-7-40");d.28?(h=8(f){i.G.P=f;u(f,b);"V"!==B i.K&&"8"===B i.K.1H&&i.K.1H.1i(J);a(".6-7-1v").11("6-7-40")},"V"!==B i.G.P?(h(i.G.P),"8"===B f&&f(i.G.P)):a.7N(["F","2O","2d"],{2c:8(a){h.1i(J,a);"8"===B f&&f(a)},2w:8(a){c(["N\\S 1k 1y\\1B 2z 1N 1Z 1x 1S",a])}})):2K("7D m\\2s 24 2t!")};h.22=8(){E f=a(".6-7-1v");f.I(".6-7-36").1u?f.X("6-7-2C"):f.11("6-7-2C")};h.3T=8(f){E b=a(".6-7-2J");b.2S();b.2a(8(){E b=a(J),v,l,m,e,g=a(""),p;1Y(p 2u i.G.P.F)"1t"===B i.G.P.F[p]&&(m=i.G.P.F[p],l=a(\'<C D="6-7-36 7L"><C D="6-7-23 6-7-7K 6-7-7J"><C D="6-7-7o"><6J 3r="" D="6-7-3Y" /><H D="6-7-6I"></H></C></C><C D="6-7-23 6-7-7f 6-7-3W"></C><C D="6-7-23 6-7-6H 6-7-3Z"></C><C D="6-7-23 6-7-6G 6-7-6K"><C D="6-7-3g 3R"><a 1A="#" D="6-7-32"></a><1X 3S="6P" D="6-7-1s" /><a 1A="#" D="6-7-30"></a><H D="6-7-6O"></H></C></C><C D="6-7-23 6-7-6N 6-7-6M"><C D="6-7-6F 3R"><a 1A="#" D="6-7-20"></a><H D="6-7-6w"></H></C></C></C>\'),l.1b({"W-Y":m.1L,"W-Y-1l":p}),l.11(".6-7-"+m.6t),l.I(".6-7-3W").2I(d.2G(m)),l.I(".6-7-3Z").2I(2E(m.2p)?m.2p:0==m.2p?"6D\\6C":"R$ "+6A(m.2p/6R,2,",",".")),l.I(".6-7-1s").1b({"W-Y":m.1L,"W-Y-1l":p}).1a(m.1s),l.I(".6-7-20").1b({"W-Y":m.1L,"W-Y-1l":p}),h.3s(m.1L,l.I(".6-7-3Y"),m.76),l.I(".6-7-30,.6-7-32").1b({"W-Y":m.1L,"W-Y-1l":p}),l.7d(b),g=g.1P(l));1c{E k=b.4q(".6-7-1v").I(".6-7-1I 1X");k.1u&&""==k.1a()&&k.1a(i.G.P.2d.7b.4f)}1e(n){c("4u 2Z 4a 7a o 3n 2D 72 6V 1Z 1x 1o. 4e: "+n.3a,"3p")}h.3f();h.22();f&&f.3j&&8(){e=g.6S("[W-Y=\'"+f.3j+"\']");e.1u&&(v=0,g.2a(8(){E f=a(J);U(f.6W(e))T!1;v+=f.6X()}),h.2r(1j 0,1j 0,v,b.1P(b.71())),g.X("6-7-3k"),8(a){a.11("6-7-3m");a.11("6-7-3k");3l(8(){a.X("6-7-3m")},d.39)}(e))}()});(8(){G.P.F.1u?(a("21").X("6-7-25-2S").11("6-7-25-3o 6-7-3i-1P-4b"),3l(8(){a("21").X("6-7-3i-1P-4b")},d.39)):a("21").X("6-7-25-3o").11("6-7-25-2S")})();"8"===B d.2x?d.2x.1i(J):c("2x n\\S \\1Q 38 4l\\1C\\S")};h.3s=8(f,b,d){8 h(){b.X("6-3h").78(8(){a(J).11("6-3h")}).1b("3r",d)}d?h():2E(f)?c("N\\S 1k 77 38 6Q 4D a 6B e 6z 3t 2A","3q"):2K("4i\\1C\\S 2Y \\1Q 3t m\\2s 2t. 6x o 7e.")};h.3f=8(){E f,b,d,c;f=8(b,f){E d,c,e,g;e=a(b);d=e.1b("W-Y");g=e.1b("W-Y-1l");d&&(c=34(e.1a())||1,h.2q([d,g],c,c+1,8(a){e.1a(a);"8"===B f&&f()}))};d=8(b,f){E d,c,e,g;e=a(b);d=e.1b("W-Y");g=e.1b("W-Y-1l");d&&(c=34(e.1a())||2,h.2q([d,g],c,c-1,8(a){e.1a(a);"8"===B f&&f()}))};c=8(b,f){E d,c,e,g;e=a(b);d=e.1b("W-Y");g=e.1b("W-Y-1l");d&&(c=34(e.1a())||1,h.2q([d,g],1,c,8(a){e.1a(a);"8"===B f&&f()}))};b=a(".6-7-3g:7O(.3d)");b.11("3d").2a(8(){E e=a(J);e.I(".6-7-30").1d("1W.7i",8(a){a.3e();b.11("6-1m");f(e.I(".6-7-1s"),8(){b.X("6-1m")})});e.I(".6-7-32").1d("1W.7A",8(a){a.3e();b.11("6-1m");d(e.I(".6-7-1s"),8(){b.X("6-1m")})});e.I(".6-7-1s").1d("7v.4y",8(){b.11("6-1m");c(J,8(){b.X("6-1m")})});e.I(".6-7-1s").1d("2g.4y",8(a){13==a.4v&&(b.11("6-1m"),c(J,8(){b.X("6-1m")}))})});a(".6-7-36").2a(8(){E b=a(J);b.I(".6-7-20").1d("1W.7h",8(){b.11("6-1m");h.4m(a(J),8(a){a?b.4x(!0).7n(8(){b.20();h.22()}):b.X("6-1m")});T!1})})};h.4E=8(a){E b=a.1a(),b=b.1q(/[^0-9\\-]/g,""),b=b.1q(/([0-9]{5})\\-?([0-9])([0-9]{2})?/g,"$1-$2$3"),b=b.1q(/(.{9}).*/g,"$1");a.1a(b);9<=b.1u&&(a.W("4p")!=b&&t.6v({4f:b,75:"79"}).2c(8(a){i.G.P=a;h.1U()}).2w(8(a){c(["N\\S 1k 1y\\1B 7c o 4k",a]);73()}),a.W("4p",b))};h.2q=8(b,e,g,k){8 l(b){b="4d"!==B b?!1:b;h.1U();i.G.2e=!1;h.22();"V"!==B i.K&&"8"===B i.K.1H&&i.K.1H.1i(J);"8"===B 2j&&2j();a.1h.2m(!0,1j 0,b);"8"===B k&&k(e)}g=g||1;U(1>g)T e;U(d.28){U("V"===B i.G.P.F[b[1]])T c("N\\S 1k 1y\\1B 4h 1N 1Z 1x 1R. A 4s 4F \\1Q 4z 4w 2A: i.G.P.F["+b[1]+"]"),e;i.G.P.F[b[1]].1s=g;i.G.P.F[b[1]].1l=b[1];t.6U([i.G.P.F[b[1]]],["F","2O","2d"]).2c(8(a){i.G.P=a;l(!0)}).2w(8(a){c(["N\\S 1k 1y\\1B 4j a 6T 6Y 6Z 2y 1S",a]);l()})}1G c("70\\1C\\S 24 m\\2s 24 2t")};h.4m=8(b,e){8 h(b){b="4d"!==B b?!1:b;"V"!==B i.K&&"8"===B i.K.1H&&i.K.1H.1i(J);"8"===B 2j&&2j();a.1h.2m(!0,1j 0,b);"8"===B e&&e(g)}E g=!1,k=a(b).1b("W-Y-1l");U(d.28){U("V"===B i.G.P.F[k])T c("N\\S 1k 1y\\1B 4h 1N 1Z 1x 1R. A 4s 4F \\1Q 4z 4w 2A: i.G.P.F["+k+"]"),g;i.G.P.F[k].1l=k;t.74([i.G.P.F[k]],["F","2O","2d"]).2c(8(a){g=!0;i.G.P=a;u(a);h(!0)}).2w(8(a){c(["N\\S 1k 1y\\1B 6y o 1R 1x 1S",a]);h()})}1G 2K("4i\\1C\\S, 2Y m\\2s 24 2t.")};h.2r=8(b,d,e,c){c=c||a(".6-7-2L, .6-7-2J");b=b||"+";d=d||.9*c.6E();c.4x(!0,!0).6L({7I:2E(e)?b+"="+d+"7H":e})};d.2b||(h.1U(),a.1h.2m(!0));a(i).1d("7E.4r 7G.1g.4r",8(){1c{i.G.P=1j 0,h.1U()}1e(a){c("4u 2Z 4j 1N 1Z 1x 1S a 7Q 1x 7P 4c 3b. 4e: "+a.3a,"7T")}});"8"===B d.1T?d.1T.1i(J):c("7R n\\S \\1Q 38 4l\\1C\\S")};a.1h.1M=8(b){E c;c=a(J);c.1h=31 a.1M(J,b);T c}}1e(n){"V"!==B M&&"8"===B M.15&&M.15("2i! ",n)}})(J);(8(k){1c{E a=37;i.K=i.K||{};i.K.F={};i.K.1V=!1;i.K.7F=!1;i.K.7B=!1;E c=8(){E b,c,k,d;U(i.K.1V){c=!1;k={};i.K.F={};1Y(d 2u i.G.P.F)"1t"===B i.G.P.F[d]&&(b=i.G.P.F[d],"V"!==B b.14&&7m!==b.14&&""!==b.14&&(i.K.F["1E"+b.14]=i.K.F["1E"+b.14]||{},i.K.F["1E"+b.14].4n=b.14,k["1E"+b.14]||(i.K.F["1E"+b.14].1O=0),i.K.F["1E"+b.14].1O+=b.1s,c=!0,k["1E"+b.14]=!0));d=c}1G d=1j 0;i.K.1V&&(a(".6-1r-1v").20(),a(".6-1r-1R-2V").X("6-1r-1R-2V"));1Y(E r 2u i.K.F){b=i.K.F[r];U("1t"!==B b)T;k=a("1X.6-14[2U="+b.4n+"]").4q("7p");U(i.K.1V||!k.I(".6-1r-1v").1u)c=a(\'<H D="6-1r-1v" 7y="4G 2y 1S 4D 2Y 4C."><H D="6-1r-4B"><H D="6-1r-1O"></H></H></H>\'),c.I(".6-1r-1O").1f(b.1O),b=k.I(".7x"),b.1u?b.4t(c).11("6-1r-1R-2V"):k.4t(c)}d&&(i.K.1V=!1)};i.K.1H=8(){i.K.1V=!0;c.1i(J)};a(2h).5a(8(){c.1i(J)})}1e(b){"V"!==B M&&"8"===B M.15&&M.15("2i! ",b)}})(J);(8(){1c{E k=37,a,c={2f:".5b",29:{},2o:{}};k.5c=8(b){E n={};a=k.4A(!0,{},c,b);b=k(a.2f).1M(a.29);n.2o="V"!==B a.29.2b&&!1===a.29.2b?k(a.2f).4g(b.1h,a.2o):k(a.2f).4g(a.2o);n.29=b;T n};k.1h.3c=8(){"1t"===B M&&"8"===B M.1D&&M.1D("O 5h 2X n\\S \\1Q 4Y 4R 4Q 6b. A 5r\\S 64 5Z\\60 24 6m 4o 5z\\5y 5t e 5s 1N 5u 5K \\5L 2M 2F.")};k.3c=k.1h.3c}1e(b){"V"!==B M&&"8"===B M.15&&M.15("2i! ",b)}})();',62,491,'||||||qd|ddc|function||||||||||window|||||||||||||||||||typeof|div|class|var|items|_QuatroDigital_DropDown|span|find|this|_QuatroDigital_AmountProduct||console|||getOrderForm|25C2||u00e3o|return|if|undefined|data|removeClass|sku||texts|addClass|||productId|error|||||val|attr|try|bind|catch|html|vtex|fn|call|void|foi|index|loading|cartTotal|checkout|_QuatroDigital_CartData|replace|bap|quantity|object|length|wrapper|25A8pbz|do|poss|25A8oe|href|u00edvel|u00e7|info|prod_|js|else|exec|shipping|join|u0391|id|QD_dropDownCart|os|qtt|add|u00e9|item|carrinho|callback|getCartInfoByUrl|allowRecalculate|click|input|for|dados|remove|body|cartIsEmpty|prodCell|esta|cart|||smartCheckout|dropDown|each|updateOnlyHover|done|shippingData|allowUpdate|selector|keyup|document|Oooops|adminCart|vtexjs|DropDown|simpleCart|emptyCart|buyButton|sellingPrice|changeQantity|scrollCart|u00e9todo|descontinuado|in|bb|fail|callbackProductsList|no|obter|SKU|apply|noItems|com|isNaN|Digital|skuName|warn|append|prodWrapper2|alert|prodWrapper|Quatro|25A8zvyyvbayvar|totalizers|D1|82|qd_ddc_continueShopping|empty|qd_ddc_closeFn|value|added|toLowerCase|Cart|este|ao|quantityMore|new|quantityMinus|total|parseInt|u00e1|prodRow|jQuery|uma|timeRemoveNewItemClass|message|VTEX|smartCart|qd_on|preventDefault|actionButtons|prodQttWrapper|loaded|product|lastSku|lastAddedFixed|setTimeout|lastAdded|CEP|rendered|aviso|alerta|src|insertProdImg|um|infoTotalShipping|scrollDown|scrollUp|lightBoxBodyProdAdd|lightBoxProdAdd|u2202|qd_ddc_hover|84|linkCart|viewCart|u0472|label|biblioteca|encontrada|min|SDK|br|row|cep|io|qd_ddc_lightBoxClose|B8|E0|clearfix|type|renderProductsList|25A8igrkpbzzreprfgnoyr|jjj|prodName|25A8igrkpbzzreprorgn|image|prodPrice|prodLoaded|infoAllTotal|linkCheckout|C2|continueShopping|infoTotal|shippingForm|infoTotalItems|infoTotalValue|cartContainer|tentar|time|da|boolean|Detalhes|postalCode|QD_buyButton|localizar|Aten|atualizar|frete|fun|removeProduct|prodId|tem|qdDdcLastPostalCode|getParent|qdDdcVtex|chave|prepend|Problemas|keyCode|pelo|stop|qd_ddc_change|composta|extend|wrapper2|produto|para|shippingCalculate|buscada|Itens|ainda|Continuar|nenhum|Seu|Finalizar|u0aef|u0abd|u0ae8|u03a1|desta|iniciado|u01ac|u0472J|Subtotal|Frete|Compra|Carrinho|mais|Ir|Total|5E3|execu|par|executado|ser|script|por|aqui|wrapper3|ajaxStop|qdDdcContainer|QD_smartCart|dataType|async|placeholder|u00a1|Smart|tel|Calcular|name|Script|url|ajax|CDN|buscar|Comprando|vers|todos|restrita|direitos|25C|25A8igrk|25A8dhngebqvtvgny|u00e7a|licen|zA|String|u00a8|encodeURIComponent|ti|escape|ayvar|zvyyvb|jj|zv|reservados|u00e0|Callbacks|unshift|yyvbayvar|zvy|zvyyv|bayvar|vbayvar|zvyy|yvbayvar|25A8igrkpbzzrepr|fromCharCode|90|A1|voc|u00ea|A1g|CF|83d|que|products|u00c3|u221a|u0e17|eval|C5|forma|8F|qu|co|mm|ite|toUpperCase|122|charCodeAt|erc|tr|executando|indexOf|rc|ls|break|u2113|infoBts|availability|prodLoading|calculateShipping|prodRowLoading|Contacte|remover|nem|qd_number_format|imagem|u00e1tis|Gr|height|removeWrapper|column4|column3|imgLoading|img|prodQtt|animate|prodRemove|column5|qttLoading|text|URL|100|filter|quantidade|updateItems|nos|is|outerHeight|de|itens|aten|parent|base|updateCartData|removeItems|country|imageUrl|informada|load|BRA|definir|address|calcular|appendTo|SAC|column2|setInterval|qd_ddc_remove|qd_ddc_more|mouseenter|600|mouseleave|null|slideUp|prodImgWrapper|li|qd_ddc_cep|qd_ddc_scrollDown|off|qd_ddc_lightBoxOverlay|orderform|focusout|on|qd_bap_wrapper_content|title|qd_ddc_scrollUp|qd_ddc_minus|quickViewUpdate|clearInterval|Este|productAddedToCart|buyButtonClicked|minicartUpdated|px|scrollTop|prodImg|column1|qd_ddc_prodRow|requisi|QD_checkoutQueue|not|eveento|partir|Callback|clone|avisso|allTotal'.split('|'),0,{}));
/*http://phpjs.org/functions/md5/*/
if("function"!==typeof qd_md5)var qd_md5=function(p){var h=function(b,a){var d,c,f,e,g;f=b&2147483648;e=a&2147483648;d=b&1073741824;c=a&1073741824;g=(b&1073741823)+(a&1073741823);return d&c?g^2147483648^f^e:d|c?g&1073741824?g^3221225472^f^e:g^1073741824^f^e:g^f^e},k=function(b,a,d,c,f,e,g){b=h(b,h(h(a&d|~a&c,f),g));return h(b<<e|b>>>32-e,a)},l=function(b,a,d,c,f,e,g){b=h(b,h(h(a&c|d&~c,f),g));return h(b<<e|b>>>32-e,a)},m=function(b,a,c,d,e,f,g){b=h(b,h(h(a^c^d,e),g));return h(b<<f|b>>>32-f,a)},n=
function(b,a,c,d,f,e,g){b=h(b,h(h(c^(a|~d),f),g));return h(b<<e|b>>>32-e,a)},q=function(b){var a="",c="",d;for(d=0;3>=d;d++)c=b>>>8*d&255,c="0"+c.toString(16),a+=c.substr(c.length-2,2);return a},e=[],f,r,t,u,v,b,a,d,c;p=this.utf8_encode(p);e=function(b){var a,c=b.length;a=c+8;for(var d=16*((a-a%64)/64+1),e=Array(d-1),f=0,g=0;g<c;)a=(g-g%4)/4,f=g%4*8,e[a]|=b.charCodeAt(g)<<f,g++;a=(g-g%4)/4;e[a]|=128<<g%4*8;e[d-2]=c<<3;e[d-1]=c>>>29;return e}(p);b=1732584193;a=4023233417;d=2562383102;c=271733878;p=
e.length;for(f=0;f<p;f+=16)r=b,t=a,u=d,v=c,b=k(b,a,d,c,e[f+0],7,3614090360),c=k(c,b,a,d,e[f+1],12,3905402710),d=k(d,c,b,a,e[f+2],17,606105819),a=k(a,d,c,b,e[f+3],22,3250441966),b=k(b,a,d,c,e[f+4],7,4118548399),c=k(c,b,a,d,e[f+5],12,1200080426),d=k(d,c,b,a,e[f+6],17,2821735955),a=k(a,d,c,b,e[f+7],22,4249261313),b=k(b,a,d,c,e[f+8],7,1770035416),c=k(c,b,a,d,e[f+9],12,2336552879),d=k(d,c,b,a,e[f+10],17,4294925233),a=k(a,d,c,b,e[f+11],22,2304563134),b=k(b,a,d,c,e[f+12],7,1804603682),c=k(c,b,a,d,e[f+13],
12,4254626195),d=k(d,c,b,a,e[f+14],17,2792965006),a=k(a,d,c,b,e[f+15],22,1236535329),b=l(b,a,d,c,e[f+1],5,4129170786),c=l(c,b,a,d,e[f+6],9,3225465664),d=l(d,c,b,a,e[f+11],14,643717713),a=l(a,d,c,b,e[f+0],20,3921069994),b=l(b,a,d,c,e[f+5],5,3593408605),c=l(c,b,a,d,e[f+10],9,38016083),d=l(d,c,b,a,e[f+15],14,3634488961),a=l(a,d,c,b,e[f+4],20,3889429448),b=l(b,a,d,c,e[f+9],5,568446438),c=l(c,b,a,d,e[f+14],9,3275163606),d=l(d,c,b,a,e[f+3],14,4107603335),a=l(a,d,c,b,e[f+8],20,1163531501),b=l(b,a,d,c,e[f+
13],5,2850285829),c=l(c,b,a,d,e[f+2],9,4243563512),d=l(d,c,b,a,e[f+7],14,1735328473),a=l(a,d,c,b,e[f+12],20,2368359562),b=m(b,a,d,c,e[f+5],4,4294588738),c=m(c,b,a,d,e[f+8],11,2272392833),d=m(d,c,b,a,e[f+11],16,1839030562),a=m(a,d,c,b,e[f+14],23,4259657740),b=m(b,a,d,c,e[f+1],4,2763975236),c=m(c,b,a,d,e[f+4],11,1272893353),d=m(d,c,b,a,e[f+7],16,4139469664),a=m(a,d,c,b,e[f+10],23,3200236656),b=m(b,a,d,c,e[f+13],4,681279174),c=m(c,b,a,d,e[f+0],11,3936430074),d=m(d,c,b,a,e[f+3],16,3572445317),a=m(a,d,
c,b,e[f+6],23,76029189),b=m(b,a,d,c,e[f+9],4,3654602809),c=m(c,b,a,d,e[f+12],11,3873151461),d=m(d,c,b,a,e[f+15],16,530742520),a=m(a,d,c,b,e[f+2],23,3299628645),b=n(b,a,d,c,e[f+0],6,4096336452),c=n(c,b,a,d,e[f+7],10,1126891415),d=n(d,c,b,a,e[f+14],15,2878612391),a=n(a,d,c,b,e[f+5],21,4237533241),b=n(b,a,d,c,e[f+12],6,1700485571),c=n(c,b,a,d,e[f+3],10,2399980690),d=n(d,c,b,a,e[f+10],15,4293915773),a=n(a,d,c,b,e[f+1],21,2240044497),b=n(b,a,d,c,e[f+8],6,1873313359),c=n(c,b,a,d,e[f+15],10,4264355552),
d=n(d,c,b,a,e[f+6],15,2734768916),a=n(a,d,c,b,e[f+13],21,1309151649),b=n(b,a,d,c,e[f+4],6,4149444226),c=n(c,b,a,d,e[f+11],10,3174756917),d=n(d,c,b,a,e[f+2],15,718787259),a=n(a,d,c,b,e[f+9],21,3951481745),b=h(b,r),a=h(a,t),d=h(d,u),c=h(c,v);return(q(b)+q(a)+q(d)+q(c)).toLowerCase()};
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs();a.trigger("QuatroDigital.pt_callback",[a])}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return a.length?$.extend({},a,new b(a)):a},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();
/* Quatro Digital - Smart Price // 3.0 // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(5(r){8 e=31;6("5"!==J e.1I.1J){8 w=5(b,a){6("1L"===J G&&"5"===J G.1u&&"5"===J G.1l&&"5"===J G.1q){8 g;"1L"===J b?(b.30("[1Q 1O]\\n"),g=b):g=["[1Q 1O]\\n"+b];6("1p"===J a||"1N"!==a.1G()&&"33"!==a.1G())6("1p"!==J a&&"1l"===a.1G())1x{G.1l.1t(G,g)}1z(k){G.1l(g.Y("\\n"))}15 1x{G.1u.1t(G,g)}1z(k){G.1u(g.Y("\\n"))}15 1x{G.1q.1t(G,g)}1z(k){G.1q(g.Y("\\n"))}}},A=/[0-9]+\\%/i,B=/[0-9\\.]+(?=\\%)/i,C={23:5(b){H-1<b.I().2X(A)?!0:!1},1H:5(b){H b.I().2S(B)},1C:!1,2k:".2R",X:"2Q",28:"[2T*=\'1R\']",1E:1y,1b:1y,1S:!0,2U:!0,1h:!1,7:{2l:!0,1M:!0,1h:!1,P:"2W",X:".2V",1k:"1W.1k",1f:"1U.36",2d:"1U.37",1K:"1W.1K"}};e.1I.1J=5(){};r=5(b){8 a={j:"3h%3%1B%3%S%3%T",3j:"3k%3%S%3%T",3m:"3l%3%3g%3%S%3%T",3f:"3a%3%1X%3%S%3%T",39:"38%3%24%3%S%3%T",3b:"3c%3%2P%3%3d%3%S%3%T","1Y%3n":"2%1B%3%1X%3%S%3%T","1Y%3":"%1B%3%24%3%S%3%T"};H 5(b){8 e,d,c,h;d=5(a){H a};c=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o","b"];b=b["d"+c[16]+"c"+c[17]+"m"+d(c[1])+"n"+c[13]]["l"+c[18]+"c"+c[0]+"2t"+d("o")+"n"];e=5(a){H 2q(2w(a.F(/\\./g,"\\2v").F(/[a-2x-Z]/g,5(a){H 2m.2n(("Z">=a?2o:2p)>=(a=a.2u(0)+13)?a:a-26)})))};8 g=e(b[[c[9],d("o"),c[12],c[d(13)]].Y("")]);e=e((1o[["2O",d("2J"),"m",c[1],c[4].2y(),"2I"].Y("")]||"---")+[".v",c[13],"e",d("x"),"2K",d("2L"),"2N",c[1],".c",d("o"),"m.",c[19],"r"].Y(""));1v(8 l 1P a){6(e===l+a[l]||g===l+a[l]){h="2M"+c[17]+"e";29}h="f"+c[0]+"2H"+d(c[1])+""}d=!1;-1<b[[c[12],"e",c[0],"2G",c[9]].Y("")].2B("2A%1T%1V%20%1F%1A%1F%2z%3o%2C%1Z%2D%1Z%2F%1F%1A%1T%1V%20%3e%1A")&&(d=!0);H[h,d]}(b)}(1o);6(!48(r[0]))H r[1]?w("\\3Z\\41\\27 \\47\\14\\45\\44\\21\\14\\21\\27 \\46\\14\\42\\14 \\3X\\3W\\3Y\\14 L\\49\\14!"):!1;8 D=5(b,a){8 g=5(d){8 b,h,g,l,k,q,u,t,v,r,p,x,y,m=e(U);d="1p"===J d?!1:d;8 f=a.7.P?m.1e(a.7.X):m.1e(a.X);6(d||m.1j(a.28)){8 n=a.7.P;6(!m.1j(".1w, .22")||n){6(n){t=f.E(a.7.1k);6(t.E(".4b").R)H;t.25("Q-W");f.25("Q-1i-W")}6(a.1S&&m.3U(".1w").R)m.M("22");15 6(m.M("1w"),a.23(m)){6(n)6(g={},d=2i(e("3y[2a]:3A").2e("2a"),10))1v(h=0;h<N.K.R;h++){6(N.K[h].3B==d){g=N.K[h];29}}15 1v(h 1P d=3V,N.K)"5"!==J N.K[h]&&N.K[h].3x&&N.K[h].1n<d&&(d=N.K[h].1n,g=N.K[h]);h=a.1H(m);b=1g(h,10);6(1c(b))H w(["O 3r 3q p/ o 1R n\\1r \\3s 3t n\\3v.",m],"1N");8 z=5(d){n?l=(d.1n||0)/V:(r=f.E(".2j"),l=1g((r.1s()||"").F(/[^0-9\\.\\,]+/i,"").F(".","").F(",","."),10));6(1c(l))H w(["3F 3P 3O\\1r n\\1r 3Q 3R o 3T\\3S 3N 2b :(",m,f]);1y!==a.1b&&(p=0,1c(a.1b)?(x=f.E(a.1b),x.R&&(p=a.1H(x))):p=a.1b,p=1g(p,10),1c(p)&&(p=0),0!==p&&(l=V*l/(V-p)));k=n?(d.3G||0)/V:1g((f.E(".3I").1s()||"").F(/[^0-9\\.\\,]+/i,"").F(".","").F(",","."),10);1c(k)&&(k=.3J);q=(V-b)/V*l;n&&a.7.1M?(t.I(t.I().1a().F(/[0-9\\.]+\\,[0-9]+/,11(q,2,",","."))).M("Q-W"),f.M("Q-1i-W")):(y=f.E(".3K"),y.I(y.I().F(/[0-9\\.]+,[0-9]+/i,"")+11(q,2,",",".")));n&&(u=f.E(a.7.1K),u.R&&u.I(u.I().1a().F(/[0-9\\.]+\\,[0-9]+/,11(q,2,",","."))));8 c=f.E(".Q-1i-2g-3L");c.I(c.I().F(/[0-9]+\\%/i,b+"%"));c=5(a,b,c){a=f.E(a);a.R&&a.1d(a.1d().1a().F(/[0-9]{1,2}/,c?c:d.1f||0));b=f.E(b);b.R&&b.1d(b.1d().1a().F(/[0-9\\.]+\\,[0-9]+/,11(q/(c?c:d.1f||1),2,",",".")))};n&&a.7.1h?c(a.7.1f,a.7.2d):a.1h&&c(".3H",".3M",2i(f.E(".3E").1s()||1)||1);f.E(".3u").2c(11(k-q,2,",","."));f.E(".3p").3w(11(V*(k-q)/k,2,",","."));n&&a.7.2l&&e("3C.3D-3z").1D(5(){v=e(U);v.I(v.I().1a().F(/[0-9\\.]+\\,[0-9]+/,11(k-q,2,",",".")));v.M("Q-W")})};z(g);6(n)e(1o).4a("40.43",5(a,b,d){z(d)});f.M("1m");n||r.M("1m")}}}15 a.7.P&&f.1j(a.7.X)&&(f.E(a.7.1k).M("Q-W"),f.M("Q-1i-W"))};(a.1C?b.E(a.2k):b).1D(5(){g.2f(U,!1)});6("2r"==J a.1E){8 k=a.1C?b:b.1e(a.X),k=a.7.P?k.1e(a.7.X).2h(".1m"):k.E(".2j:2h(.1m)");k.1D(5(){8 b=e(a.1E);b.2e("3i","2g:2Y !34;");a.7.P?e(U).2c(b):e(U).35(b);g.2f(b,!0)})}};e.1I.1J=5(b){8 a=e(U);6(!a.R)H a;b=e.2Z(!0,{},C,b);"32"!=J b.7.P&&(b.7.P=e(2s.2E).1j(".2b"));D(a,b);H a}}})(U);',62,260,'|||25C2||function|if|productPage|var||||||||||||||||||||||||||||||||find|replace|console|return|text|typeof|skus||addClass|skuJson||isProductPage|qd|length|25A8pbz|25A8oe|this|100|active|wrapperElement|join|||qd_number_format|||u0391|else|||||trim|appliedDiscount|isNaN|html|closest|installments|parseFloat|changeInstallments|sp|is|skuBestPrice|info|qd_sp_processedItem|bestPrice|window|undefined|warn|u00e3o|val|apply|error|for|qd_sp_on|try|null|catch|82|25A8zvyyvbayvar|startedByWrapper|each|forcePromotion|D1|toLowerCase|getDiscountValue|fn|QD_SmartPrice|skuPrice|object|changeNativePrice|alerta|Price|in|Smart|desconto|oneFlagByItem|E0|label|B8|strong|25A8igrkpbzzreprorgn|jjj|C2|84|u2202|qd_sp_ignored|isDiscountFlag|25A8igrkpbzzreprfgnoyr|removeClass||u0472|filterFlagBy|break|skuCorrente|produto|append|installmentValue|attr|call|display|not|parseInt|qd_productPrice|flagElement|changeNativeSaveAmount|String|fromCharCode|90|122|escape|string|document|ti|charCodeAt|u00a8|encodeURIComponent|zA|toUpperCase|8F|qu|indexOf|83d|A1g|body|A1|rc|ls|ite|no|co|mm|tr|erc|js|25A8igrk|li|flag|match|class|isSmartCheckout|productRightColumn|auto|search|none|extend|unshift|jQuery|boolean|aviso|important|after|skuBestInstallmentNumber|skuBestInstallmentValue|bayvar|zvyyv|vbayvar|zvyyvb|ayvar|25A8dhngebqvtvgny|C5|zvyy|25A8igrkpbzzrepr|jj|style|zv|yyvbayvar|yvbayvar|zvy|25C|CF|qd_saveAmountPercent|informado|valor|u00e9|um|qd_saveAmount|u00famero|prepend|available|div|de|first|sku|em|economia|qd_sp_installments|Por|listPrice|qd_sp_display_installments|qd_productOldPrice|001|qd_displayPrice|discount|qd_sp_display_installmentValue|deste|raz|alguma|consegui|obter|u00e7o|pre|siblings|99999999999999|u0abd|u0aef|u01ac|u0e17|skuSelected|u00c3|u0ae8|vtex|u00a1|u2113|u03a1|u221a|eval|u0472J|on|qd_active'.split('|'),0,{}));
/*! jQuery Validation Plugin - v1.12.0 - 4/1/2014
 * http://jqueryvalidation.org/
 * Copyright (c) 2014 Jörn Zaefferer; Licensed MIT */
!function(a){a.extend(a.fn,{validate:function(b){if(!this.length)return void(b&&b.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.validateDelegate(":submit","click",function(b){c.settings.submitHandler&&(c.submitButton=b.target),a(b.target).hasClass("cancel")&&(c.cancelSubmit=!0),void 0!==a(b.target).attr("formnovalidate")&&(c.cancelSubmit=!0)}),this.submit(function(b){function d(){var d;return c.settings.submitHandler?(c.submitButton&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),c.settings.submitHandler.call(c,c.currentForm,b),c.submitButton&&d.remove(),!1):!0}return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)})),c)},valid:function(){var b,c;return a(this[0]).is("form")?b=this.validate().form():(b=!0,c=a(this[0].form).validate(),this.each(function(){b=c.element(this)&&b})),b},removeAttrs:function(b){var c={},d=this;return a.each(b.split(/\s/),function(a,b){c[b]=d.attr(b),d.removeAttr(b)}),c},rules:function(b,c){var d,e,f,g,h,i,j=this[0];if(b)switch(d=a.data(j.form,"validator").settings,e=d.rules,f=a.validator.staticRules(j),b){case"add":a.extend(f,a.validator.normalizeRule(c)),delete f.messages,e[j.name]=f,c.messages&&(d.messages[j.name]=a.extend(d.messages[j.name],c.messages));break;case"remove":return c?(i={},a.each(c.split(/\s/),function(b,c){i[c]=f[c],delete f[c],"required"===c&&a(j).removeAttr("aria-required")}),i):(delete e[j.name],f)}return g=a.validator.normalizeRules(a.extend({},a.validator.classRules(j),a.validator.attributeRules(j),a.validator.dataRules(j),a.validator.staticRules(j)),j),g.required&&(h=g.required,delete g.required,g=a.extend({required:h},g),a(j).attr("aria-required","true")),g.remote&&(h=g.remote,delete g.remote,g=a.extend(g,{remote:h})),g}}),a.extend(a.expr[":"],{blank:function(b){return!a.trim(""+a(b).val())},filled:function(b){return!!a.trim(""+a(b).val())},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(b,c){return 1===arguments.length?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(new RegExp("\\{"+a+"\\}","g"),function(){return c})}),b)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&!this.blockFocusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.addWrapper(this.errorsFor(a)).hide())},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(a,b){(9!==b.which||""!==this.elementValue(a))&&(a.name in this.submitted||a===this.lastElement)&&this.element(a)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){function b(b){var c=a.data(this[0].form,"validator"),d="on"+b.type.replace(/^validate/,""),e=c.settings;e[d]&&!this.is(e.ignore)&&e[d].call(c,this[0],b)}this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var c,d=this.groups={};a.each(this.settings.groups,function(b,c){"string"==typeof c&&(c=c.split(/\s/)),a.each(c,function(a,c){d[c]=b})}),c=this.settings.rules,a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)}),a(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ","focusin focusout keyup",b).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",b),this.settings.invalidHandler&&a(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler),a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){var c=this.clean(b),d=this.validationTargetFor(c),e=!0;return this.lastElement=d,void 0===d?delete this.invalid[c.name]:(this.prepareElement(d),this.currentElements=a(d),e=this.check(d)!==!1,e?delete this.invalid[d.name]:this.invalid[d.name]=!0),a(b).attr("aria-invalid",!e),this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),e},showErrors:function(b){if(b){a.extend(this.errorMap,b),this.errorList=[];for(var c in b)this.errorList.push({message:b[c],element:this.findByName(c)[0]});this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,this.prepareForm(),this.hideErrors(),this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b,c=0;for(b in a)c++;return c},hideErrors:function(){this.addWrapper(this.toHide).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(b){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){return!this.name&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.name in c||!b.objectLength(a(this).rules())?!1:(c[this.name]=!0,!0)})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement+"."+b,this.errorContext)},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([]),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(b){var c,d=a(b),e=d.attr("type");return"radio"===e||"checkbox"===e?a("input[name='"+d.attr("name")+"']:checked").val():(c=d.val(),"string"==typeof c?c.replace(/\r/g,""):c)},check:function(b){b=this.validationTargetFor(this.clean(b));var c,d,e,f=a(b).rules(),g=a.map(f,function(a,b){return b}).length,h=!1,i=this.elementValue(b);for(d in f){e={method:d,parameters:f[d]};try{if(c=a.validator.methods[d].call(this,i,b,e.parameters),"dependency-mismatch"===c&&1===g){h=!0;continue}if(h=!1,"pending"===c)return void(this.toHide=this.toHide.not(this.errorsFor(b)));if(!c)return this.formatAndAdd(b,e),!1}catch(j){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+e.method+"' method.",j),j}}if(!h)return this.objectLength(f)&&this.successList.push(b),!0},customDataMessage:function(b,c){return a(b).data("msg"+c[0].toUpperCase()+c.substring(1).toLowerCase())||a(b).data("msg")},customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a];return void 0},defaultMessage:function(b,c){return this.findDefined(this.customMessage(b.name,c),this.customDataMessage(b,c),!this.settings.ignoreTitle&&b.title||void 0,a.validator.messages[c],"<strong>Warning: No message defined for "+b.name+"</strong>")},formatAndAdd:function(b,c){var d=this.defaultMessage(b,c.method),e=/\$?\{(\d+)\}/g;"function"==typeof d?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}"),c.parameters)),this.errorList.push({message:d,element:b,method:c.method}),this.errorMap[b.name]=d,this.submitted[b.name]=d},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,b,c;for(a=0;this.errorList[a];a++)c=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d=this.errorsFor(b);d.length?(d.removeClass(this.settings.validClass).addClass(this.settings.errorClass),d.html(c)):(d=a("<"+this.settings.errorElement+">").attr("for",this.idOrName(b)).addClass(this.settings.errorClass).html(c||""),this.settings.wrapper&&(d=d.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.append(d).length||(this.settings.errorPlacement?this.settings.errorPlacement(d,a(b)):d.insertAfter(b))),!c&&this.settings.success&&(d.text(""),"string"==typeof this.settings.success?d.addClass(this.settings.success):this.settings.success(d,b)),this.toShow=this.toShow.add(d)},errorsFor:function(b){var c=this.idOrName(b);return this.errors().filter(function(){return a(this).attr("for")===c})},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(a){return this.checkable(a)&&(a=this.findByName(a.name).not(this.settings.ignore)[0]),a},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+b+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}return b.length},depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,b):!0},dependTypes:{"boolean":function(a){return a},string:function(b,c){return!!a(b,c.form).length},"function":function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(a){this.pending[a.name]||(this.pendingRequest++,this.pending[a.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],c&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(b){return a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,"remote")})}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={},d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}),c},attributeRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)"required"===c?(d=b.getAttribute(c),""===d&&(d=!0),d=!!d):d=f.attr(c),/min|max/.test(c)&&(null===g||/number|range|text/.test(g))&&(d=Number(d)),d||0===d?e[c]=d:g===c&&"range"!==g&&(e[c]=!0);return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},dataRules:function(b){var c,d,e={},f=a(b);for(c in a.validator.methods)d=f.data("rule"+c[0].toUpperCase()+c.substring(1).toLowerCase()),void 0!==d&&(e[c]=d);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1)return void delete b[d];if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}f?b[d]=void 0!==e.param?e.param:!0:delete b[d]}}),a.each(b,function(d,e){b[d]=a.isFunction(e)?e(c):e}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var c;b[this]&&(a.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(c=b[this].split(/[\s,]+/),b[this]=[Number(c[0]),Number(c[1])]))}),a.validator.autoCreateRanges&&(b.min&&b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),b.minlength&&b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if("select"===c.nodeName.toLowerCase()){var e=a(c).val();return e&&e.length>0}return this.checkable(c)?this.getLength(b,c)>0:a.trim(b).length>0},email:function(a,b){return this.optional(b)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)},url:function(a,b){return this.optional(b)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)},date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a).toString())},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(a)},number:function(a,b){return this.optional(b)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},creditcard:function(a,b){if(this.optional(b))return"dependency-mismatch";if(/[^0-9 \-]+/.test(a))return!1;var c,d,e=0,f=0,g=!1;if(a=a.replace(/\D/g,""),a.length<13||a.length>19)return!1;for(c=a.length-1;c>=0;c--)d=a.charAt(c),f=parseInt(d,10),g&&(f*=2)>9&&(f-=9),e+=f,g=!g;return e%10===0},minlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(a.trim(b),c);return this.optional(c)||e>=d},maxlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(a.trim(b),c);return this.optional(c)||d>=e},rangelength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(a.trim(b),c);return this.optional(c)||e>=d[0]&&e<=d[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||c>=a},range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){a(c).valid()}),b===e.val()},remote:function(b,c,d){if(this.optional(c))return"dependency-mismatch";var e,f,g=this.previousValue(c);return this.settings.messages[c.name]||(this.settings.messages[c.name]={}),g.originalMessage=this.settings.messages[c.name].remote,this.settings.messages[c.name].remote=g.message,d="string"==typeof d&&{url:d}||d,g.old===b?g.valid:(g.old=b,e=this,this.startRequest(c),f={},f[c.name]=b,a.ajax(a.extend(!0,{url:d,mode:"abort",port:"validate"+c.name,dataType:"json",data:f,context:e.currentForm,success:function(d){var f,h,i,j=d===!0||"true"===d;e.settings.messages[c.name].remote=g.originalMessage,j?(i=e.formSubmitted,e.prepareElement(c),e.formSubmitted=i,e.successList.push(c),delete e.invalid[c.name],e.showErrors()):(f={},h=d||e.defaultMessage(c,"remote"),f[c.name]=g.message=a.isFunction(h)?h(b):h,e.invalid[c.name]=!0,e.showErrors(f)),g.valid=j,e.stopRequest(c,j)}},d)),"pending")}}}),a.format=function(){throw"$.format has been deprecated. Please use $.validator.format instead."}}(jQuery),function(a){var b,c={};a.ajaxPrefilter?a.ajaxPrefilter(function(a,b,d){var e=a.port;"abort"===a.mode&&(c[e]&&c[e].abort(),c[e]=d)}):(b=a.ajax,a.ajax=function(d){var e=("mode"in d?d:a.ajaxSettings).mode,f=("port"in d?d:a.ajaxSettings).port;return"abort"===e?(c[f]&&c[f].abort(),c[f]=b.apply(this,arguments),c[f]):b.apply(this,arguments)})}(jQuery),function(a){a.extend(a.fn,{validateDelegate:function(b,c,d){return this.bind(c,function(c){var e=a(c.target);return e.is(b)?d.apply(e,arguments):void 0})}})}(jQuery);
/* Quatro Digital - Smart Quantity // 1.11 // Carlos Vinicius // Todos os direitos reservados */
(function(v){var d=jQuery;if("function"!==typeof d.fn.QD_smartQuantity){var g=function(d,a){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var f;"object"===typeof d?(d.unshift("[Quatro Digital - Smart Quantity]\n"),f=d):f=["[Quatro Digital - Smart Quantity]\n"+d];if("undefined"===typeof a||"alerta"!==a.toLowerCase()&&"aviso"!==a.toLowerCase())if("undefined"!==typeof a&&"info"===a.toLowerCase())try{console.info.apply(console,
f)}catch(k){console.info(f.join("\n"))}else try{console.error.apply(console,f)}catch(k){console.error(f.join("\n"))}else try{console.warn.apply(console,f)}catch(k){console.warn(f.join("\n"))}}},m={buyButton:".buy-button",qttInput:".qd-sq-quantity",btnMore:".qd-sq-more",btnMinus:".qd-sq-minus",initialValue:0,minimumValue:0,setQuantityByUrl:!0},n=function(h,a){function f(c,e,b){a.setQuantityByUrl?c.val(((location.search||"").match(q)||[a.initialValue]).pop()):c.val(a.initialValue);c.change(function(c,
b){try{if("qd_ssl_trigger"!=b){var e=d(this),f=parseInt(e.val().replace(n,""));!isNaN(f)&&f>a.minimumValue?e.val(f):e.val(a.minimumValue);e.trigger("QuatroDigital.sq_change",this)}}catch(t){g(t.message)}});c.focusin(function(){d(this).trigger("QuatroDigital.sq_focusin",this)});e.click(function(b){b.preventDefault();c.val((parseInt(c.val())||a.minimumValue)+1).change()});b.click(function(b){b.preventDefault();c.val((parseInt(c.val())||a.minimumValue+1)-1).change()});c.change()}function k(c,e,b){c.on("QuatroDigital.sq_change",
function(){(d(this).val()||0)<=a.minimumValue?(b.addClass("qd-sq-inactive"),e.removeClass("qd-sq-inactive")):(e.addClass("qd-sq-inactive"),b.removeClass("qd-sq-inactive"))})}function m(c,e){c.on("QuatroDigital.sq_change",function(){try{if(!(e[0].hostname||"").length)return g("A quantidade n\u00e3o foi inserida no bt comprar pois o mesmo n\u00e3o possui uma URL","info");var b=e[0].search||"";-1<b.toLowerCase().indexOf("qty=")?e[0].search=b.replace(p,"qty="+(parseInt(c.val())||("number"==typeof a.minimumValue?
a.minimumValue:1))+"&"):e[0].search="qty="+(parseInt(c.val())||("number"==typeof a.minimumValue?a.minimumValue:1))+"&"+(e[0].search||"").replace(p,"");var d=((e.attr("href")||"").match(u)||[""]).pop()+"";c.attr("data-sku-id",d);if(d.length&&"object"===typeof skuJson&&!c.attr("data-sku-price"))for(b=0;b<skuJson.skus.length;b++)skuJson.skus[b].sku==d&&c.attr("data-sku-price",skuJson.skus[b].bestPrice)}catch(l){g(l.message)}})}var n=/[^0-9-]/gi,q=/qty\=([0-9]+)/i,u=/sku\=([0-9]+)/i,p=/qty\=[0-9]+\&?/ig;
h.each(function(){try{var c=d(this),e=c.find(a.buyButton),b=c.find(a.qttInput),h=c.find(a.btnMore),l=c.find(a.btnMinus);if(!e.length&&null!==a.buyButton||!b.length)return g("O plugin parou por aqui! N\u00e3o foram encontrados o bot\u00e3o comprar e o campo de quantidade","alerta");if(b.is(".qd-sq-on"))return g(["Execu\u00e7\u00e3o ignorada pois este input j\u00e1 possui o plugin aplicado. Input: ",b],"info");b.addClass("qd-sq-on");k(b,h,l);null!==a.buyButton&&m(b,e);f(b,h,l);d(window).on("vtex.sku.selected",
function(){b.change()})}catch(r){g(r.message)}})};d.fn.QD_smartQuantity=function(g){var a=d(this);a.qdPlugin=new n(a,d.extend({},m,g));d(window).trigger("QuatroDigital.sq_callback");return a};d(function(){d(".qd_auto_smart_quantity").QD_smartQuantity()})}})(this);