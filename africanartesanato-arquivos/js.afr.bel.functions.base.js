/**
* Funções base
*/
"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});
"function"!==typeof String.prototype.replaceSpecialChars&&(String.prototype.replaceSpecialChars=function(){var b={"\u00e7":"c","\u00e6":"ae","\u0153":"oe","\u00e1":"a","\u00e9":"e","\u00ed":"i","\u00f3":"o","\u00fa":"u","\u00e0":"a","\u00e8":"e","\u00ec":"i","\u00f2":"o","\u00f9":"u","\u00e4":"a","\u00eb":"e","\u00ef":"i","\u00f6":"o","\u00fc":"u","\u00ff":"y","\u00e2":"a","\u00ea":"e","\u00ee":"i","\u00f4":"o","\u00fb":"u","\u00e5":"a","\u00e3":"a","\u00f8":"o","\u00f5":"o",u:"u","\u00c1":"A","\u00c9":"E", "\u00cd":"I","\u00d3":"O","\u00da":"U","\u00ca":"E","\u00d4":"O","\u00dc":"U","\u00c3":"A","\u00d5":"O","\u00c0":"A","\u00c7":"C"};return this.replace(/[\u00e0-\u00fa]/ig,function(a){return"undefined"!=typeof b[a]?b[a]:a})});
// (function(){"undefined"===typeof window.console&&(window.console=window.console||{});"object"===typeof window.console&&"function"!==typeof window.console.error&&(window.console.error=function(){});"object"===typeof window.console&&"function"!==typeof window.console.info&&(window.console.info=function(){});"object"===typeof window.console&&"function"!==typeof window.console.warn&&(window.console.warn=function(){});"object"===typeof window.console&&"function"!==typeof window.console.debug&& (window.console.debug=function(){});"object"===typeof window.console&&"function"!==typeof window.console.log&&(window.console.log=function(){})})();

try {
	var Common = {
		run: function() {},
		init: function() {
			Common.bannersCount();
			Common.userAuth();
			// Common.bannerResponsive();
			Common.productCaroussel();
			Common.productOwlCarousel();
			// Common.modalNewsLetter();
			Common.callSmartCart();
			Common.cartAddProduct();
			Common.amazingMenu();
			Common.applyMosaicBanners();
			Common.quantityForVtexBuyButton();
			Common.quantityForVtexBuyButtonClick();
		},
		ajaxStop: function() {
			Common.quantityForVtexBuyButtonClick();
		},
		windowOnload: function() {},
		cartAddProduct: function() {
			var modal = $('.modal').clone().appendTo(document.body).addClass('qd-v1-modal-add-product-cart');

			modal.find('.modal-body').append('<p><i class="fa fa-check-circle" aria-hidden="true"></i> Produto adicionado com sucesso!</p>');

			$(window).on("cartProductAdded.vtex", function() {
				modal.modal();

				setTimeout(function() {
					modal.modal('hide');
				}, 3000);
			});
		},
		applyMosaicBanners: function() {
			$('.qd-mosaic-banners > .box-banner').QD_mosaicBanners({
				// bannerColSecurityMargin: -30,
				containerWidth: 1142,
				classTwoColumn: "col-xs-24 col-sm-12", // Classe do bootstrap para 2 banner por linha
				classThreeColumn: "col-xs-12 col-sm-8", // Classe do bootstrap para 3 banner por linha
				classFourColumn: "col-xs-12 col-sm-6" // Classe do bootstrap para 4 banner por linha				
			});
		},		
		callSmartCart: function() {
			// Adiciona Carrinho e Backdrop
			$(document.body).append('<div class="components-qd-v1-overlay"></div>');
			$(document.body).append('<div class="smart-cart-qd-v2-wrapper"> <div class="qd-sc-wrapper"></div> </div>');

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
				}
			});

			window._QuatroDigital_prodBuyCallback = function(jqXHR, textStatus, prodLink, skus){
				$.fn.simpleCart(true);
				$(".shelf-qd-v1-buy-button-modal").modal("hide");
				$(window).trigger("QuatroDigital.qd_bb_prod_add", [new $, skus[0] || 0]);
			};

			$(".v2-cart-wrapper a.cartLink").click(function(evt) {
				evt.preventDefault();
				$(document.body).toggleClass('qd-cart-show');

				wrapper.height($(window).height());
				wrapper.find(".qd-ddc-prodWrapper").css('max-height', $(window).height() - 193);
			});

			$(".components-qd-v1-overlay, .qd_ddc_lightBoxClose").click(function(evt){
				$(document.body).removeClass('qd-cart-show');
			});
		},
		bannersCount: function() {
			$(".box-banner").parent().each(function() {
				var $t = $(this);
				$t.addClass("qdBannerCount-" + $t.find(".box-banner").length);
			});
		},
		amazingMenu:function(){
			var amazingMenuMobile = $('.header-qd-v3-amazing-menu-mobile');

			$('[class*=main-amazing-menu]').QD_amazingMenu();

			$('.header-qd-v3-amazing-menu-mobile-content').append('<span class="header-qd-v1-mobile-amazing-menu-close"></span>');

			// Amazing Menu Responsivo
			$(".header-qd-v3-amazing-menu-mobile-btn").click(function(){
				$("body").toggleClass('qd-am-on');
			});

			$(".components-qd-v1-overlay, .header-qd-v1-mobile-amazing-menu-close").click(function(){
				$("body").removeClass('qd-am-on');
			});

			amazingMenuMobile.find('> ul > li > a, > ul > li > p').each(function() {
				var $t = $(this);

				if ($t.find('+ ul').length > 0)
					$t.addClass('link-dropdown');
			});

			amazingMenuMobile.find('.link-dropdown').click(function(evt) {
				evt.preventDefault();
				var $t = $(this);

				$t.find('+ ul').stop(true, true).slideToggle('slow');
				$t.toggleClass('active');
			});
		},
		userAuth:function(){
			$.qdAjax({
				url: "/no-cache/profileSystem/getProfile",
				dataType: "json",
				clearQueueDelay: null,
				success: function(data){
					try{
						if(data.IsUserDefined){
							// logado
							$(".qd-header-auth").text("(Sair)").attr({"href":"/no-cache/user/logout", "title": (data.FirstName ? data.FirstName + " " + (data.LastName || ""): data.Email), "data-placement":"bottom" }).tooltip();
						}
						else{
							// Deslogado
							$(".qd-header-auth").text("(Entrar)").click(function(e) {
								e.preventDefault();
								vtexid.start();
							});
						}
					}catch (e) {
						if (typeof console !== "undefined" && typeof console.info === "function")
							console.info("Ops, algo saiu errado com o login.", e.message);
					}
				}
			});
		},
		bannerResponsive:function(){
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
		},
		productOwlCarousel:function(){
			if (!$.fn.owlCarousel)
				return;

			$('body.produto .prateleira fieldset').parent().addClass('qd-accessories');

			$(".qd-shelf-carousel .prateleira:not(.qd-accessories)").each(function() {
				$(this).owlCarousel({
					items: 4,
					navigation: true,
					pagination: false
				});
			});
		},
		productCaroussel: function(){
			$(".qd-porduct-collections-accessories .prateleira, .qd-shelf-carousel .prateleira, .shelf-qd-v1-carousel .prateleira").each(function(){
				var wrap = $(this);

				wrap.find("> h2").addClass('heading-2').insertBefore(wrap);
				wrap.find(".prateleira >ul").addClass("item");
			});
		},
		modalNewsLetter: function () {
			var modal = $(".modal");
			var html = $('<form novalidate="1"> <div class="row"> <div class="col-xs-15 col-xs-offset-9"> <div class="qd_news"> <div class="row form-row"> <input type="text" name="nome" class="qd_news_name input-type-text-ghost form-control" /> </div> <div class="row form-row"> <input type="email" name="email" class="qd_news_email input-type-text-ghost form-control" /> </div> <div class="row form-row"> <button class="qd_news_button">Gerar cupom</button> </div> </div> <span class="btn-close ico-close" data-dismiss="modal"></span> </div> </div> </form>');
			var inputSuccess = $('<div class="row form-row"><input type="text" name="name" class="qd_success input-type-text-ghost form-control" /><button class="qd_news_button_ok" data-dismiss="modal">OK!</button></div>');

			// Ações
			modal.on("hidden.bs.modal", function(){
				modal.removeClass("newsletter-modal");
				html.trigger("QuatroDigital.cf_close");
			});

			html.QD_cookieFn({
				cookieName: "newsletter",
				close: "",
				expireDays: 31,
				show: function($elem){
					modal.find(".modal-body").empty().append(html);
					modal.addClass("newsletter-modal");
					modal.modal();

					html.QD_news({
						defaultName: "Nome",
						defaultEmail: "E-mail",
						checkNameFieldIsVisible: false,
						successCallback: function () {
							$(".newsletter-modal").addClass("newsletterFinish");
							$(".qd_news").append(inputSuccess);
							$(".newsletter-modal .qd_success").val("PROMO1COMP");
						}
					});
				},
				hide: function($elem){}
			});
		},
		quantityForVtexBuyButton: function () {
			try{
				window._QD_qfvbb_qtt = 1;
				var getAddUrlForSku =  $.skuSelector.getAddUrlForSku;
				
				$.skuSelector.getAddUrlForSku = function() {
					var params = arguments;
					params[2] = window._QD_qfvbb_qtt;
					
					return getAddUrlForSku.apply(this, params);
				};
			} catch (err) {
				if (typeof console !== "undefined" && typeof console.error === "function" && typeof console.info === "function") {
					console.info("[Quatro Digital - Smart Quantity Vitrine]");
					console.error(err.message);
				}
			}
		},
		quantityForVtexBuyButtonClick: function () {
			try{
				$('.wrapper-buy-button-asynchronous:not(.shelf-qd-v1-box-quantity)').prepend("<div class='shelf-qd-v1-smart-qtt'> <input class='shelf-qd-v1-smart-input qd-sq-quantity' type='tel' value='0'> <span class='shelf-qd-v1-smart-qtt-btn qd-sq-more'><i class='fa fa-plus'></i></span> <span class='shelf-qd-v1-smart-qtt-btn qd-sq-minus qd-sq-inactive'><i class='fa fa-minus'></i></span></div>").addClass('shelf-qd-v1-box-quantity');
				$('li[layout]').QD_smartQuantity({
					buyButton: null
				});
			} catch (err) {
				if (typeof console !== "undefined" && typeof console.error === "function" && typeof console.info === "function") {
					console.info("[Quatro Digital - Smart Quantity Vitrine]");
					console.error(err.message);
				}
			}

			$('.shelf-qd-v1-box-quantity .btn-add-buy-button-asynchronous').on("click", function () {
				var qtt = $(this).closest('.wrapper-buy-button-asynchronous').find('.qd-sq-quantity').val();
				window._QD_qfvbb_qtt = parseInt(qtt) || 1;
			});

		}
	};

	var Home = {
		init: function() {
			Home.brandOwlCarousel();
			Home.cycle2();
			Home.cycle2Mobile();
			Home.organizeSideMenuCollection();
			Home.homeSliderFull();
			// Home.mosaicAdjustment();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		brandOwlCarousel:function(){
			var owl = $(".qd-banner-carousel");

			owl.owlCarousel({
				items: 5,
				navigation: true,
				pagination: false,
				navigationText: ["",""]
			});

			// Custom Navigation Events
			$(".owl-next").click(function(){
				owl.trigger('owl.next');
			});
			$(".owl-prev").click(function(){
				owl.trigger('owl.prev');
			});
		},
		cycle2: function() {
			if(typeof $.fn.cycle !== "function")
				return;
			var elem = $(".main-slider");

			elem.cycle({
				slides: ">.box-banner",
				swipe: "true",
				pager: ".responsive-pager",
				prev: ".cycle-prev",
				next: ".cycle-next"
			});
		},
		cycle2Mobile: function() {
			if(typeof $.fn.cycle !== "function")
				return;
			var elem = $(".main-slider-mobile");

			elem.cycle({
				slides: ">.box-banner",
				swipe: "true",
				pager: ".responsive-pager",
				prev: ".cycle-prev",
				next: ".cycle-next"
			});
		},
		organizeSideMenuCollection: function() {
			var wrapper = $(".qd-category-collections");
			var htmlItem = '<div class="col-xs-24 item"><div class="row"></div></div>';
			var htmlSideMenuWrapper = '<div class="col-xs-24 col-sm-24 col-md-6 htmlSideMenuWrapper"></div>';
			var htmlCollectionWrapper = '<div class="col-xs-24 col-sm-24 col-md-18 htmlCollectionWrapper"></div>';
			var itemSideMenuCollection = '<div class="row itemSideMenuCollection"><div></div></div>';

			wrapper.find('[itemscope="itemscope"]:not(".qd-on")').addClass("qd-on").each(function() {
				$t = $(this);

				$t.after(htmlSideMenuWrapper);

				$('.htmlSideMenuWrapper:not(".qd-on")').addClass("qd-on").append(wrapper.find($t));

				var collectionTitle = $t.getParent(".htmlSideMenuWrapper").find("+ .heading-2");
				var collection = $t.getParent(".htmlSideMenuWrapper").find("+ .heading-2 + .prateleira") || $t.getParent(".htmlSideMenuWrapper").find("+ .prateleira");

				$t.getParent('.htmlSideMenuWrapper').after(htmlCollectionWrapper);

				$('.htmlCollectionWrapper:not(".qd-on")').addClass("qd-on").append(collectionTitle, collection);

				$t.getParent(".htmlSideMenuWrapper").find("+ .htmlCollectionWrapper").after(itemSideMenuCollection);

				$('.itemSideMenuCollection:not(".qd-on")').addClass("qd-on").find("> div").append($t.getParent(".htmlSideMenuWrapper"), $t.getParent(".htmlSideMenuWrapper").find("+ .htmlCollectionWrapper"));
			});

			// APLCIANDO CAROUSEL
			if (!$.fn.owlCarousel)
				return;

			$(".shelf-qd-v1-carousel .prateleira").each(function() {
				$(this).owlCarousel({
					items: 3,
					navigation: true,
					pagination: false
				});
			});
		},
		homeSliderFull: function() {
			if(typeof $.fn.cycle !== "function")
				return;
			var elem = $(".home-slider");

			elem.cycle({
				slides: ">.box-banner",
				swipe: "true",
				pager: ".responsive-pager-2",
				prev: ".cycle-prev-home-slider",
				next: ".cycle-next-home-slider"
			});
		},
		mosaicAdjustment: function() {
			mosaicAddRow($(".qd-banner-responsive >div:not(.row)"));

			function mosaicAddRow(wrapper) {
				var firstTop;
				var items = new $;

				if(!wrapper.length)
					return;

				wrapper.each(function(){
					var $t = $(this);
					var offsetTop = $t.offset().top;

					if (!firstTop)
						firstTop = offsetTop;

					if (offsetTop >= firstTop - 10 && offsetTop <= firstTop + 10)
						items = items.add($t);
					else
						return false;
				});

				items.wrapAll('<div class="row"></div>');
				mosaicAddRow($(".qd-banner-responsive > div:not(.row)"));
			}
		}
	};

	var Departament = {
		init: function () {
			Departament.showDisclaimerBanners();
			Departament.sidemenuToggle();
			Departament.hideExtendedMenu();
			Search.shelfLineFix();
		},
		ajaxStop: function () {
			Search.shelfLineFix();
		},
		windowOnload: function () {},
		showDisclaimerBanners: function () {
			if ($(".disclaimer .box-banner").length)
				$(".disclaimer").show();
		},
		sidemenuToggle:function(){
			// Amazing Menu Responsivo
			console.log("fiddler on");
			$(".side-menu-toggle").click(function(){
				$("body").toggleClass('qd-sn-on');
			});
			$(".qd-am-overlay, .search-menu-close, .components-qd-v1-overlay").click(function(){
				$("body").removeClass('qd-sn-on');
			});
		},
		hideExtendedMenu:function(){
			$(".search-navigator ul").each(function(){
				var t,li,qtt,moreLink,moreLi,click,liHide;

				t=$(this);
				li=t.find(">li");
				qtt=5;

				if(li.length<=qtt) return;

				liHide=li.filter(":gt("+(qtt-1)+")").stop(true,true).hide();
				moreLink=$('<a class="qd-viewMoreMenu">Mostrar mais</a>');
				t.after(moreLink);
				moreLi=$('<li class="qd-viewMoreWrapper"><a class="qd-viewMoreMenu2">ver mais</a></li>');
				t.append(moreLi);

				click=function(){
					liHide.stop(true,true).slideToggle(function(){
						if(li.filter(":visible").length>qtt){
							moreLink.addClass("minus").text("ver menos");
							moreLi.addClass("minus").find("a").text("ver menos");
						}
						else{
							moreLink.removeClass("minus").text("ver mais");
							moreLi.removeClass("minus").find("a").text("ver mais");
						}
					});
				};
				moreLi.bind("click.qd_viewMore",click);
				moreLink.bind("click.qd_viewMore",click);
			});
		}
	};

	var Search = {
		init: function () {
			Departament.showDisclaimerBanners();
			Departament.sidemenuToggle();
			Departament.hideExtendedMenu();
			Search.shelfLineFix();
		},
		ajaxStop: function () {
			Search.shelfLineFix();
		},
		windowOnload: function () {},
		shelfLineFix: function() {
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
		}
	};

	var Product = {
		init: function () {
			Product.seeDescription();
			Product.organizeDescription();
			Product.videoIframe();
			Product.accessoriesFix();
			Product.openShipping();
			Product.hideUniqueSkuOption();
			Product.applyBuyButton();
			Product.applySmartQuantity();
			Product.showColorsImages();
			Product.productSkuMerge();
			Product.showColorTable();
		},
		ajaxStop: function () {},
		windowOnload: function () {},
		seeDescription: function() {
			$(".btn-see-description").click(function(e){
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $(".product-description").offset().top - 100
				}, 900, 'swing');
			});
		},
		organizeDescription: function() {
			var wrapper = $('#caracteristicas');

			wrapper.prepend(wrapper.find(".group.Curriculo + table"));
			wrapper.prepend(wrapper.find(".group.Curriculo"));
			wrapper.prepend(wrapper.find(".group.Sinopse + table"));
			wrapper.prepend(wrapper.find(".group.Sinopse"));
		},
		hideUniqueSkuOption: function() {
			$(".sku-selection-box [class*='group_']").each(function(){
				var $t = $(this);
				var input =  $t.find("input");

				if(input.length !== 1)
					return;

				input.attr("checked", true).change();
				$t.getParent("ul").hide();
			});
		},
		videoIframe: function() {
			var wrapper = $('.video-iframe .video-iframe-content');

			wrapper.prepend($(".group.Video + table iframe"));

			if (!$('.group.Video').length > 0)
				return;

			$('.product-image-thumbs').prepend('<li class="thumb-product-video"><a href="#video-iframe"></a></li>');


			$(".thumb-product-video a").click(function(e){
				e.preventDefault();

				var target = this.hash;

				$target = $(target);

				$('html, body').stop().animate({
					'scrollTop': $target.offset().top - 60
				}, 900, 'swing');
			});
		},
		accessoriesFix: function() {
			$("fieldset >.buy-product-checkbox").parent().each(function() {
				var $t  = $(this);
				$t.add($t.prev("ul")).wrapAll('<div class="qd-accessories-wrapper col-xs-24 col-sm-8 col-md-6"/>');
			});
		},
		openShipping: function() {
			ShippingValue();
		},
		applyBuyButton: function() {
			$(".qd_cart_auto").QD_buyButton({
				buyButton: ".product-buy-button .buy-button"
			});
		},
		applySmartQuantity: function () {
			$('.sku-selection-box').QD_smartQuantity({
				buyButton: ".product-buy-button .buy-button"
			});

			$(window).on("skuSelected.vtex", function (e, id, data) {
				$('.qd-sq-more, .qd-sq-minus').click();
			});
		},
		showColorsImages: function() {
			if ($(document.body).is(".product-colors"))
				return;

			try {
				$('.sku-selector-container-0 .Cor').find('.dimension-Cor').each(function() {
					i = 0;
					var cor = $(this).attr('class').split('skuespec_Cor_opcao_')[1].replace(/ /g, '').replace(/-/g, ' ');
					for (var i = 0; i < skuJson.skus.length; i++) {
						if (skuJson.skus[i].dimensions.Cor == cor) {
							$(this).wrapInner('<div class="product-qd-v1-sku-text"></div>').prepend('<div class="product-qd-v1-sku-img"><img class="img-responsive" src="' + skuJson.skus[i].image.replace(/(ids\/[0-9]+)\-[0-9]+\-[0-9]+/, '$1-50-50') + '" /></div>');
							break;
						}
					}
				});
			}
			catch (e) { (typeof console !== "undefined" && typeof console.error === "function" && console.error("Ops, algo saiu errado ao aplicar as imagens das cores :( . Detalhes: " + e.message)); }
		},
		productSkuMerge: function() {
			try {
				if (!$(document.body).is(".product-colors") || !skuJson.skus[0].dimensions['Cor'] || !$('.product-qd-v2-sku-selection-color-similiar').length) 
					return;

				// Ajustando bodyClass e escondendo SKU em lista
				$('.product-sku-selection').hide();

				var wrapper = $('<div class="product-qd-v2-sku-merge"></div>').appendTo('.product-qd-v2-sku-selection-color-similiar');

				var wrapperColors = $('<ul></ul>').appendTo(wrapper);
				var loading = $('<div style="clear: both" class="loading"></div>').hide().appendTo(wrapper);

				var item, iWrapper;
				function renderBubble(pData) {
					for (var i = 0; i < pData.skus.length; i++) {
						item = $('<img alt="' + (pData.skus[i].dimensions['Cor'] || '----') + '"></img>').appendTo(wrapperColors).wrap('<li data-qd-sku="'+pData.skus[i].sku+'"></li>');
						item.addClass('product-qd-v1-color-image');
						item.attr({
							'data-qd-available': pData.skus[i].available ? 'true' : 'false',
							'data-qd-sku': pData.skus[i].sku,
							'src': pData.skus[i].image.replace(/(ids\/[0-9]+)\-[0-9]+\-[0-9]+/, '$1-85-85') || '----'
						});

						iWrapper = item.parent();
						$('<p class="color-name">'+(pData.skus[i].dimensions['Cor'] || '---')+'</p>').appendTo(iWrapper);
						$('<p class="color-price">'+(pData.skus[i].bestPriceFormated || '---')+'</p>').appendTo(iWrapper);
						$('<div class="product-qd-v1-box-quantity"> <div class="product-qd-v1-smart-qtt"> <input class="product-qd-v1-smart-input qd-sq-quantity" type="tel" value="0" /> <span class="product-qd-v1-smart-qtt-btn qd-sq-more"><i class="fa fa-plus"></i></span> <span class="product-qd-v1-smart-qtt-btn qd-sq-minus"><i class="fa fa-minus"></i></span> </div> </div>').appendTo(iWrapper);

						// Indisponível
						if (!pData.skus[i].available) {
							iWrapper.addClass('color-unavailable').after('<span style="display:none">indisponível</span>');
							iWrapper.find(".color-price").text('---');
						} else {
							iWrapper.QD_smartQuantity({
								buyButton: null,
								initialValue: 0,
								minimumValue: 0
							});
						}
					}
				}

				// Renderizando as bolhas
				renderBubble(skuJson);

				function showScrollBar() {
					var windowWidth = $(window).width();
					if (windowWidth < 740 ) {
						$('.product-qd-v2-sku-merge').css('overflow', 'auto');
						var colorListWidth = $('.product-qd-v2-sku-merge li').length * 200;
						$('.product-qd-v2-sku-merge ul').css('width',colorListWidth+'px');
					} else {
						$('.product-qd-v2-sku-merge').css('overflow', 'hidden');
						$('.product-qd-v2-sku-merge ul').css('width', '100%');
					}
				}
				showScrollBar();
				$(window).on("resize", function() { 
					console.log('moedinha');showScrollBar(); });

				$('.product-qd-v2-sku-merge').on('QuatroDigital.sq_change', function(e, input) {
					var $t = $(input);
					var iWrapper = $t.closest('li');

					for (var i = 0; i < skuJson.skus.length; i++) {
						if ($t.val() > 0)
							iWrapper.addClass('sku-selected');
						else
							iWrapper.removeClass('sku-selected');

						if (skuJson.skus[i].sku == iWrapper.attr('data-qd-sku')) {
							$(window).trigger('QuatroDigital.psm_change_v2', [skuJson.skus[i], $t.val()]);
							break;
						}
					}
				});
			}
			catch (e) { (typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: ", e)); }
		},
		showColorTable: function() {
			if (!$('.product-qd-v2-sku-selection-color-similiar').length) 
				return;
				
			var skus = {};
			var shippingItems = [];

			var table = $('<table class="product-qd-v1-skus-table"><thead><th>Cores Selecionadas</th> <th>Qtd.</th><th>Excluir</th></thead><tbody></tbody></table>');
			table.insertAfter($('.sku-selection-box .product-price').closest('.row'));
			table.wrap('<div class="row"></div>');
			table.hide();

			var tbody = table.find('tbody');
			var totalPrice = 0;

			var installWrapper = $('<div class="product-qd-v2-installments-method"></div>');
			installWrapper.append('<a class="installments-method-close"><i class="fa fa-times" aria-hidden="true"></i></a>');
			installWrapper.append('<h5>Opções de Parcelamento:</h5>');
			installWrapper.append('<div class="product-qd-v2-installments-table"></div>');
			installWrapper.insertAfter('.sku-selection-box .product-price');
			installWrapper.hide();

			installWrapper.find(".installments-method-close").click(function() {
				installWrapper.hide();
			});

			var installButton = $('<a class="product-qd-v1-see-installments"><i class="fa fa-credit-card"></i><span>Formas de parcelamento</span></a>');
			installButton.insertAfter('.sku-selection-box .product-price');
			installButton.hide();
			installButton.click(function() {
				installWrapper.toggle();

				if (installWrapper.is(':visible'))
					vtexjs.checkout.simulateShipping(shippingItems, '', 'BRA').done(function(result) {
						var installments = [];
						var wrapper = installWrapper.find('.product-qd-v2-installments-table');
						wrapper.empty();

						for(var i=0; i<result.paymentData.installmentOptions.length; i++)
							if (result.paymentData.installmentOptions[i].installments.length > installments.length)
								installments = result.paymentData.installmentOptions[i].installments;

						for (var i=0; i<installments.length; i++) {
							var count = installments[i].count == 1 ? "à vista" : installments[i].count + "x de";
							wrapper.append('<p>'+count+' <span>R$ ' + qd_number_format(installments[i].value/100, 2, ",", ".")+'</span></p>');
						}
					});
			});

			$('.product-price .skuBestPrice').empty();
			$('.product-buy-button').html('<a class="buy-button buy-button-ref qd-sbb-on" href="#" onClick="alert(\'Selecione o modelo desejado!\')">Comprar<span class="qd-bb-productAdded"><i class="icon-thumbs-up"></i> <span>Produto adicionado</span></span></a>');

			$(window).on("QuatroDigital.psm_change_v2", function(e, sData, qtt) {
				tbody.empty();
				totalPrice = 0;
				shippingItems = [];
				var url = "/checkout/cart/add?";

				if (qtt == 0)
					skus[sData.sku] = null;
				else
					skus[sData.sku] = {"sData" : sData, "qtt" : qtt};

				for (var i in skus) {
					if (!skus[i] || skus[i].qtt == 0)
						continue;
					var tr = $('<tr></tr>');

					var iWrapper = $('<td></td>');
					iWrapper.append('<img class="product-qd-v1-color-image" src="'+(skus[i].sData.image.replace(/(ids\/[0-9]+)\-[0-9]+\-[0-9]+/, '$1-85-85') || '----')+'"></img>');
					iWrapper.append('<p>'+(skus[i].sData.dimensions['Cor'] || '---') + ' <span>' + (skus[i].sData.bestPriceFormated || '---')+'</span></p>');
					tr.append(iWrapper);

					tr.append('<td>'+skus[i].qtt+'</td>');

					var a = $('<a data-qd-sku="'+skus[i].sData.sku+'"><i class="fa fa-times" aria-hidden="true"></i></a>');
					a.click(function() {
						var sSku = $(this).attr('data-qd-sku');
						$('.product-qd-v2-sku-merge').find('li[data-qd-sku="'+sSku+'"] .product-qd-v1-smart-input').val(0).change();
					});
					tr.append(a);
					a.wrap('<td></td>')

					tr.appendTo(tbody);

					totalPrice += ((skus[i].sData.bestPrice/100) * skus[i].qtt);

					$('.sku-selection-box .product-price').show();
					$('.product-price').html('<em class="valor-por price-best-price"><strong class="skuBestPrice">R$ '+qd_number_format(totalPrice, 2, ",", ".")+'</strong></em>');

					url += "&sku=" + skus[i].sData.sku + "&qty=" + skus[i].qtt + "&seller=" + skus[i].sData.sellerId;

					shippingItems.push({
						'id': skus[i].sData.sku,
						'quantity': skus[i].qtt,
						'seller' : skus[i].sData.sellerId
					});
				};

				if (tbody.is(':empty')) {
					table.hide();
					$('.sku-selection-box .product-price').hide();
					$('.product-qd-v1-see-installments').hide();
					$('.product-qd-v1-installments-method').hide();
					$('.product-buy-button').html('<a class="buy-button buy-button-ref qd-sbb-on" href="#" onClick="alert(\'Selecione o modelo desejado!\')">Comprar<span class="qd-bb-productAdded"><i class="icon-thumbs-up"></i> <span>Produto adicionado</span></span></a>');
				} else {
					table.show();
					url += '&sc='+jssalesChannel+'&redirect=true';
					$('.sku-selection-box .product-price').show();
					$('.product-qd-v1-see-installments').show();
					$('.product-buy-button').html('<a class="buy-button buy-button-ref qd-sbb-on" href="'+url+'">Comprar<span class="qd-bb-productAdded"><i class="icon-thumbs-up"></i> <span>Produto adicionado</span></span></a>');
				}
			});
		}
	};

	var List = {
		init: function() {},
		ajaxStop: function() {},
		windowOnload: function() {}
	};

	var Institutional = {
		init: function() {
			Institutional.sidemenuToggle();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		sidemenuToggle:function(){
			// Amazing Menu Responsivo
			$(".side-menu-toggle").click(function(){
				$("body").toggleClass('qd-sn-on');
			});
			$(".qd-am-overlay, .search-menu-close, .components-qd-v1-overlay").click(function(){
				$("body").removeClass('qd-sn-on');
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
} catch (err) {
	if (typeof console !== "undefined" && typeof console.error === "function" && typeof console.info === "function") {
		console.info("Houve um erro nos objetos, informações abaixo.");
		console.error(err.message);
	}
}

try {
	(function() {
		var body, ajaxStop, windowLoad;

		windowLoad = function() {
			Common.windowOnload();
			if (body.is(".home")) Home.windowOnload();
			else if (body.is(".departamento, .categoria")) Departament.windowOnload();
			else if (body.is(".resultado-busca")) Search.windowOnload();
			else if (body.is(".produto")) Product.windowOnload();
			else if (body.is(".listas")) List.windowOnload();
			else if (body.is(".institucional")) Institutional.windowOnload();
			else if (body.is(".orders")) Orders.windowOnload();
		};

		ajaxStop = function() {
			Common.ajaxStop();
			if (body.is(".home")) Home.ajaxStop();
			else if (body.is(".departamento, .categoria")) Departament.ajaxStop();
			else if (body.is(".resultado-busca")) Search.ajaxStop();
			else if (body.is(".produto")) Product.ajaxStop();
			else if (body.is(".listas")) List.ajaxStop();
			else if (body.is(".institucional")) Institutional.ajaxStop();
			else if (body.is(".orders")) Orders.ajaxStop();
		};

		$(function() {
			body = $("body");
			Common.init();
			if (body.is(".home")) Home.init();
			else if (body.is(".departamento, .categoria")) Departament.init();
			else if (body.is(".resultado-busca")) Search.init();
			else if (body.is(".produto")) Product.init();
			else if (body.is(".listas")) List.init();
			else if (body.is(".institucional")) Institutional.init();
			else if (body.is(".orders")) Orders.init();
			$(document).ajaxStop(ajaxStop);
			$(window).load(windowLoad);
			body.addClass('jsFullLoaded');
		});

		Common.run();
	})();
} catch (err) {
	if (typeof console !== "undefined" && typeof console.error === "function" && typeof console.info === "function") {
		$("body").addClass('jsFullLoaded jsFullLoadedError');
		console.info("Houve um erro ao iniciar os objetos, informações abaixo.");
		console.error(err);
	}
}

/* Quatro Digital - jQuery Ajax Queue // 4.0 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT <http://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT> */
(function(d){if("function"!==typeof d.qdAjax){var a={};d.qdAjaxQueue=a;150>parseInt((d.fn.jquery.replace(/[^0-9]+/g,"")+"000").slice(0,3),10)&&console&&"function"==typeof console.error&&console.error();d.qdAjax=function(f){try{var b=d.extend({},{url:"",type:"GET",data:"",success:function(){},error:function(){},complete:function(){},clearQueueDelay:5},f),e;e="object"===typeof b.data?JSON.stringify(b.data):b.data.toString();var c=encodeURIComponent(b.url+"|"+b.type+"|"+e);a[c]=a[c]||{};"undefined"==
typeof a[c].jqXHR?a[c].jqXHR=d.ajax(b):(a[c].jqXHR.done(b.success),a[c].jqXHR.fail(b.error),a[c].jqXHR.always(b.complete));a[c].jqXHR.always(function(){isNaN(parseInt(b.clearQueueDelay))||setTimeout(function(){a[c].jqXHR=void 0},b.clearQueueDelay)});return a[c].jqXHR}catch(g){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Problemas no $.qdAjax :( . Detalhes: "+g.message)}};d.qdAjax.version="4.0"}})(jQuery);
var _0x4380=['Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','allowRecalculate','buyButtonClicked','productId','prod_','prodId','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd_bap_wrapper_content','prepend','.qdDdcContainer','QD_smartCart','selector','dropDown','buyButton','QD_buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','closest','replace','abs','undefined','pow','round','toFixed','length','join','_QuatroDigital_CartData','callback','function','error','Oooops!\x20','message','object','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','toLowerCase','info','apply','warn','_QuatroDigital_DropDown','QD_dropDownCart','sevpnanegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','ite','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','smartCheckout','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','find','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','removeClass','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','keyCode','body','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','.qd-ddc-scrollDown','scrollCart','.qd-ddc-shipping\x20input','keyup.qd_ddc_cep','updateOnlyHover','mouseenter.qd_ddc_hover','getCartInfoByUrl','allowUpdate','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','texts','cartTotal','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','linkCart','html','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','emptyCart','each','call','clone','.qd-ddc-infoTotalValue','total','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','getOrderForm','_QuatroDigital_AmountProduct','exec','addClass','QD_checkoutQueue','items','totalizers','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','productCategoryIds','split','attr','qd-ddc-','.qd-ddc-prodName','.qd-ddc-prodPrice','append','sellingPrice','Grátis','meta[name=currency]','content','.qd-ddc-quantity','val','.qd-ddc-remove','insertProdImg','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','getParent','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','aviso','filter','lastSku','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','load','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','data-sku','data-sku-index','changeQantity','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','preventDefault','qd-loading','.qd-ddc-quantityMinus','removeProduct','stop','remove','$1-$2$3','data','qdDdcLastPostalCode','calculateShipping','BRA','done','fail','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','quantity','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','index','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex'];(function(_0x497b32,_0x57f0d4){var _0x3f4c06=function(_0x490ae6){while(--_0x490ae6){_0x497b32['push'](_0x497b32['shift']());}};_0x3f4c06(++_0x57f0d4);}(_0x4380,0x1b3));var _0x0438=function(_0x191b8b,_0x4f1b92){_0x191b8b=_0x191b8b-0x0;var _0x35dca6=_0x4380[_0x191b8b];return _0x35dca6;};(function(_0x3b1db2){_0x3b1db2['fn']['getParent']=_0x3b1db2['fn'][_0x0438('0x0')];}(jQuery));function qd_number_format(_0x2f170e,_0x326e3e,_0xabcb9c,_0x1794a0){_0x2f170e=(_0x2f170e+'')[_0x0438('0x1')](/[^0-9+\-Ee.]/g,'');_0x2f170e=isFinite(+_0x2f170e)?+_0x2f170e:0x0;_0x326e3e=isFinite(+_0x326e3e)?Math[_0x0438('0x2')](_0x326e3e):0x0;_0x1794a0=_0x0438('0x3')===typeof _0x1794a0?',':_0x1794a0;_0xabcb9c=_0x0438('0x3')===typeof _0xabcb9c?'.':_0xabcb9c;var _0x3eb039='',_0x3eb039=function(_0x4cf946,_0x17d7d3){var _0x326e3e=Math[_0x0438('0x4')](0xa,_0x17d7d3);return''+(Math[_0x0438('0x5')](_0x4cf946*_0x326e3e)/_0x326e3e)[_0x0438('0x6')](_0x17d7d3);},_0x3eb039=(_0x326e3e?_0x3eb039(_0x2f170e,_0x326e3e):''+Math['round'](_0x2f170e))['split']('.');0x3<_0x3eb039[0x0][_0x0438('0x7')]&&(_0x3eb039[0x0]=_0x3eb039[0x0][_0x0438('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x1794a0));(_0x3eb039[0x1]||'')['length']<_0x326e3e&&(_0x3eb039[0x1]=_0x3eb039[0x1]||'',_0x3eb039[0x1]+=Array(_0x326e3e-_0x3eb039[0x1]['length']+0x1)[_0x0438('0x8')]('0'));return _0x3eb039[_0x0438('0x8')](_0xabcb9c);};(function(){try{window['_QuatroDigital_CartData']=window[_0x0438('0x9')]||{},window[_0x0438('0x9')]['callback']=window[_0x0438('0x9')][_0x0438('0xa')]||$['Callbacks']();}catch(_0x373d89){_0x0438('0x3')!==typeof console&&_0x0438('0xb')===typeof console['error']&&console[_0x0438('0xc')](_0x0438('0xd'),_0x373d89[_0x0438('0xe')]);}}());(function(_0x552c69){try{var _0x3de06f=jQuery,_0x192f05=function(_0x4fe2de,_0x1ba119){if(_0x0438('0xf')===typeof console&&_0x0438('0x3')!==typeof console[_0x0438('0xc')]&&'undefined'!==typeof console['info']&&_0x0438('0x3')!==typeof console['warn']){var _0xa873fb;_0x0438('0xf')===typeof _0x4fe2de?(_0x4fe2de[_0x0438('0x10')](_0x0438('0x11')),_0xa873fb=_0x4fe2de):_0xa873fb=[_0x0438('0x11')+_0x4fe2de];if(_0x0438('0x3')===typeof _0x1ba119||_0x0438('0x12')!==_0x1ba119[_0x0438('0x13')]()&&'aviso'!==_0x1ba119[_0x0438('0x13')]())if(_0x0438('0x3')!==typeof _0x1ba119&&'info'===_0x1ba119[_0x0438('0x13')]())try{console[_0x0438('0x14')][_0x0438('0x15')](console,_0xa873fb);}catch(_0x5a30f8){try{console[_0x0438('0x14')](_0xa873fb[_0x0438('0x8')]('\x0a'));}catch(_0x4da959){}}else try{console[_0x0438('0xc')][_0x0438('0x15')](console,_0xa873fb);}catch(_0x1a358b){try{console[_0x0438('0xc')](_0xa873fb['join']('\x0a'));}catch(_0x20cf17){}}else try{console[_0x0438('0x16')][_0x0438('0x15')](console,_0xa873fb);}catch(_0x59db37){try{console['warn'](_0xa873fb[_0x0438('0x8')]('\x0a'));}catch(_0x4b13e4){}}}};window[_0x0438('0x17')]=window['_QuatroDigital_DropDown']||{};window[_0x0438('0x17')]['allowUpdate']=!0x0;_0x3de06f[_0x0438('0x18')]=function(){};_0x3de06f['fn']['QD_dropDownCart']=function(){return{'fn':new _0x3de06f()};};var _0x4e9f2c=function(_0x4d4d25){var _0x570d86={'n':_0x0438('0x19')};return function(_0x242b96){var _0x4f07e8=function(_0x549802){return _0x549802;};var _0x2ec6f6=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x242b96=_0x242b96['d'+_0x2ec6f6[0x10]+'c'+_0x2ec6f6[0x11]+'m'+_0x4f07e8(_0x2ec6f6[0x1])+'n'+_0x2ec6f6[0xd]]['l'+_0x2ec6f6[0x12]+'c'+_0x2ec6f6[0x0]+'ti'+_0x4f07e8('o')+'n'];var _0x51e057=function(_0x4ca956){return escape(encodeURIComponent(_0x4ca956[_0x0438('0x1')](/\./g,'¨')[_0x0438('0x1')](/[a-zA-Z]/g,function(_0x363fc9){return String[_0x0438('0x1a')](('Z'>=_0x363fc9?0x5a:0x7a)>=(_0x363fc9=_0x363fc9['charCodeAt'](0x0)+0xd)?_0x363fc9:_0x363fc9-0x1a);})));};var _0x59ffba=_0x51e057(_0x242b96[[_0x2ec6f6[0x9],_0x4f07e8('o'),_0x2ec6f6[0xc],_0x2ec6f6[_0x4f07e8(0xd)]]['join']('')]);_0x51e057=_0x51e057((window[['js',_0x4f07e8('no'),'m',_0x2ec6f6[0x1],_0x2ec6f6[0x4]['toUpperCase'](),_0x0438('0x1b')][_0x0438('0x8')]('')]||'---')+['.v',_0x2ec6f6[0xd],'e',_0x4f07e8('x'),'co',_0x4f07e8('mm'),_0x0438('0x1c'),_0x2ec6f6[0x1],'.c',_0x4f07e8('o'),'m.',_0x2ec6f6[0x13],'r']['join'](''));for(var _0x10fa0c in _0x570d86){if(_0x51e057===_0x10fa0c+_0x570d86[_0x10fa0c]||_0x59ffba===_0x10fa0c+_0x570d86[_0x10fa0c]){var _0x3daed6='tr'+_0x2ec6f6[0x11]+'e';break;}_0x3daed6='f'+_0x2ec6f6[0x0]+'ls'+_0x4f07e8(_0x2ec6f6[0x1])+'';}_0x4f07e8=!0x1;-0x1<_0x242b96[[_0x2ec6f6[0xc],'e',_0x2ec6f6[0x0],'rc',_0x2ec6f6[0x9]][_0x0438('0x8')]('')]['indexOf'](_0x0438('0x1d'))&&(_0x4f07e8=!0x0);return[_0x3daed6,_0x4f07e8];}(_0x4d4d25);}(window);if(!eval(_0x4e9f2c[0x0]))return _0x4e9f2c[0x1]?_0x192f05(_0x0438('0x1e')):!0x1;_0x3de06f['QD_dropDownCart']=function(_0x4d8afc,_0x4a53e9){var _0x5afc0e=_0x3de06f(_0x4d8afc);if(!_0x5afc0e[_0x0438('0x7')])return _0x5afc0e;var _0x583a9d=_0x3de06f[_0x0438('0x1f')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x0438('0x20'),'linkCheckout':_0x0438('0x21'),'cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':_0x0438('0x22'),'continueShopping':'Continuar\x20Comprando','shippingForm':_0x0438('0x23')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x28fb72){return _0x28fb72[_0x0438('0x24')]||_0x28fb72['name'];},'callback':function(){},'callbackProductsList':function(){}},_0x4a53e9);_0x3de06f('');var _0x8afab0=this;if(_0x583a9d[_0x0438('0x25')]){var _0x40c8bd=!0x1;_0x0438('0x3')===typeof window[_0x0438('0x26')]&&(_0x192f05(_0x0438('0x27')),_0x3de06f[_0x0438('0x28')]({'url':_0x0438('0x29'),'async':!0x1,'dataType':'script','error':function(){_0x192f05(_0x0438('0x2a'));_0x40c8bd=!0x0;}}));if(_0x40c8bd)return _0x192f05('A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!');}if(_0x0438('0xf')===typeof window[_0x0438('0x26')]&&_0x0438('0x3')!==typeof window[_0x0438('0x26')][_0x0438('0x2b')])var _0x552c69=window[_0x0438('0x26')][_0x0438('0x2b')];else if(_0x0438('0xf')===typeof vtex&&'object'===typeof vtex[_0x0438('0x2b')]&&_0x0438('0x3')!==typeof vtex[_0x0438('0x2b')][_0x0438('0x2c')])_0x552c69=new vtex[(_0x0438('0x2b'))]['SDK']();else return _0x192f05(_0x0438('0x2d'));_0x8afab0[_0x0438('0x2e')]='<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>';var _0x139a07=function(_0x253249){_0x3de06f(this)['append'](_0x253249);_0x253249[_0x0438('0x2f')](_0x0438('0x30'))[_0x0438('0x31')](_0x3de06f(_0x0438('0x32')))['on'](_0x0438('0x33'),function(){_0x5afc0e['removeClass'](_0x0438('0x34'));_0x3de06f(document['body'])[_0x0438('0x35')](_0x0438('0x36'));});_0x3de06f(document)[_0x0438('0x37')]('keyup.qd_ddc_closeFn')['on'](_0x0438('0x38'),function(_0x7df996){0x1b==_0x7df996[_0x0438('0x39')]&&(_0x5afc0e['removeClass']('qd-bb-lightBoxProdAdd'),_0x3de06f(document[_0x0438('0x3a')])[_0x0438('0x35')](_0x0438('0x36')));});var _0x44c112=_0x253249[_0x0438('0x2f')](_0x0438('0x3b'));_0x253249['find'](_0x0438('0x3c'))['on'](_0x0438('0x3d'),function(){_0x8afab0['scrollCart']('-',void 0x0,void 0x0,_0x44c112);return!0x1;});_0x253249['find'](_0x0438('0x3e'))['on']('click.qd_ddc_scrollDown',function(){_0x8afab0[_0x0438('0x3f')](void 0x0,void 0x0,void 0x0,_0x44c112);return!0x1;});_0x253249[_0x0438('0x2f')](_0x0438('0x40'))['val']('')['on'](_0x0438('0x41'),function(){_0x8afab0['shippingCalculate'](_0x3de06f(this));});if(_0x583a9d[_0x0438('0x42')]){var _0x4a53e9=0x0;_0x3de06f(this)['on'](_0x0438('0x43'),function(){var _0x253249=function(){window[_0x0438('0x17')]['allowUpdate']&&(_0x8afab0[_0x0438('0x44')](),window[_0x0438('0x17')][_0x0438('0x45')]=!0x1,_0x3de06f['fn'][_0x0438('0x46')](!0x0),_0x8afab0[_0x0438('0x47')]());};_0x4a53e9=setInterval(function(){_0x253249();},0x258);_0x253249();});_0x3de06f(this)['on'](_0x0438('0x48'),function(){clearInterval(_0x4a53e9);});}};var _0x33826e=function(_0x35a2dc){_0x35a2dc=_0x3de06f(_0x35a2dc);_0x583a9d[_0x0438('0x49')][_0x0438('0x4a')]=_0x583a9d[_0x0438('0x49')][_0x0438('0x4a')][_0x0438('0x1')]('#value',_0x0438('0x4b'));_0x583a9d[_0x0438('0x49')][_0x0438('0x4a')]=_0x583a9d[_0x0438('0x49')][_0x0438('0x4a')][_0x0438('0x1')]('#items',_0x0438('0x4c'));_0x583a9d['texts']['cartTotal']=_0x583a9d[_0x0438('0x49')][_0x0438('0x4a')][_0x0438('0x1')]('#shipping',_0x0438('0x4d'));_0x583a9d[_0x0438('0x49')][_0x0438('0x4a')]=_0x583a9d[_0x0438('0x49')]['cartTotal'][_0x0438('0x1')](_0x0438('0x4e'),_0x0438('0x4f'));_0x35a2dc[_0x0438('0x2f')]('.qd-ddc-viewCart')['html'](_0x583a9d['texts'][_0x0438('0x50')]);_0x35a2dc['find']('.qd_ddc_continueShopping')[_0x0438('0x51')](_0x583a9d[_0x0438('0x49')][_0x0438('0x52')]);_0x35a2dc['find'](_0x0438('0x53'))['html'](_0x583a9d['texts'][_0x0438('0x54')]);_0x35a2dc[_0x0438('0x2f')](_0x0438('0x55'))[_0x0438('0x51')](_0x583a9d[_0x0438('0x49')][_0x0438('0x4a')]);_0x35a2dc[_0x0438('0x2f')](_0x0438('0x56'))[_0x0438('0x51')](_0x583a9d[_0x0438('0x49')][_0x0438('0x57')]);_0x35a2dc['find']('.qd-ddc-emptyCart\x20p')['html'](_0x583a9d['texts'][_0x0438('0x58')]);return _0x35a2dc;}(this[_0x0438('0x2e')]);var _0x2fb48a=0x0;_0x5afc0e[_0x0438('0x59')](function(){0x0<_0x2fb48a?_0x139a07[_0x0438('0x5a')](this,_0x33826e[_0x0438('0x5b')]()):_0x139a07[_0x0438('0x5a')](this,_0x33826e);_0x2fb48a++;});window[_0x0438('0x9')][_0x0438('0xa')][_0x0438('0x31')](function(){_0x3de06f(_0x0438('0x5c'))[_0x0438('0x51')](window['_QuatroDigital_CartData'][_0x0438('0x5d')]||'--');_0x3de06f(_0x0438('0x5e'))[_0x0438('0x51')](window[_0x0438('0x9')][_0x0438('0x5f')]||'0');_0x3de06f(_0x0438('0x60'))[_0x0438('0x51')](window[_0x0438('0x9')][_0x0438('0x61')]||'--');_0x3de06f(_0x0438('0x62'))['html'](window[_0x0438('0x9')]['allTotal']||'--');});var _0x1c5d88=function(_0x48d357,_0x4e6491){if(_0x0438('0x3')===typeof _0x48d357['items'])return _0x192f05(_0x0438('0x63'));_0x8afab0[_0x0438('0x64')][_0x0438('0x5a')](this,_0x4e6491);};_0x8afab0[_0x0438('0x44')]=function(_0x525249,_0x4b3c6e){'undefined'!=typeof _0x4b3c6e?window[_0x0438('0x17')]['dataOptionsCache']=_0x4b3c6e:window[_0x0438('0x17')][_0x0438('0x65')]&&(_0x4b3c6e=window[_0x0438('0x17')][_0x0438('0x65')]);setTimeout(function(){window[_0x0438('0x17')][_0x0438('0x65')]=void 0x0;},_0x583a9d[_0x0438('0x66')]);_0x3de06f(_0x0438('0x67'))[_0x0438('0x35')](_0x0438('0x68'));if(_0x583a9d[_0x0438('0x25')]){var _0x4a53e9=function(_0x128c54){window[_0x0438('0x17')][_0x0438('0x69')]=_0x128c54;_0x1c5d88(_0x128c54,_0x4b3c6e);_0x0438('0x3')!==typeof window[_0x0438('0x6a')]&&_0x0438('0xb')===typeof window[_0x0438('0x6a')][_0x0438('0x6b')]&&window['_QuatroDigital_AmountProduct']['exec']['call'](this);_0x3de06f(_0x0438('0x67'))[_0x0438('0x6c')]('qd-ddc-prodLoaded');};_0x0438('0x3')!==typeof window[_0x0438('0x17')][_0x0438('0x69')]?(_0x4a53e9(window[_0x0438('0x17')]['getOrderForm']),'function'===typeof _0x525249&&_0x525249(window['_QuatroDigital_DropDown'][_0x0438('0x69')])):_0x3de06f[_0x0438('0x6d')]([_0x0438('0x6e'),_0x0438('0x6f'),_0x0438('0x70')],{'done':function(_0x445d14){_0x4a53e9['call'](this,_0x445d14);_0x0438('0xb')===typeof _0x525249&&_0x525249(_0x445d14);},'fail':function(_0x46cfe3){_0x192f05([_0x0438('0x71'),_0x46cfe3]);}});}else alert('Este\x20método\x20esta\x20descontinuado!');};_0x8afab0['cartIsEmpty']=function(){var _0xfe2cfe=_0x3de06f(_0x0438('0x67'));_0xfe2cfe[_0x0438('0x2f')](_0x0438('0x72'))[_0x0438('0x7')]?_0xfe2cfe['removeClass'](_0x0438('0x73')):_0xfe2cfe[_0x0438('0x6c')]('qd-ddc-noItems');};_0x8afab0[_0x0438('0x64')]=function(_0xbea631){var _0x4a53e9=_0x3de06f(_0x0438('0x74'));_0x4a53e9['empty']();_0x4a53e9[_0x0438('0x59')](function(){var _0x4a53e9=_0x3de06f(this),_0x3ef53e,_0x4d8afc,_0x1356b2=_0x3de06f(''),_0x56288b;for(_0x56288b in window['_QuatroDigital_DropDown']['getOrderForm'][_0x0438('0x6e')])if(_0x0438('0xf')===typeof window[_0x0438('0x17')][_0x0438('0x69')][_0x0438('0x6e')][_0x56288b]){var _0x494756=window[_0x0438('0x17')][_0x0438('0x69')]['items'][_0x56288b];var _0x4281d0=_0x494756[_0x0438('0x75')][_0x0438('0x1')](/^\/|\/$/g,'')[_0x0438('0x76')]('/');var _0xd49a7=_0x3de06f('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0xd49a7[_0x0438('0x77')]({'data-sku':_0x494756['id'],'data-sku-index':_0x56288b,'data-qd-departament':_0x4281d0[0x0],'data-qd-category':_0x4281d0[_0x4281d0[_0x0438('0x7')]-0x1]});_0xd49a7['addClass'](_0x0438('0x78')+_0x494756['availability']);_0xd49a7['find'](_0x0438('0x79'))['append'](_0x583a9d[_0x0438('0x24')](_0x494756));_0xd49a7[_0x0438('0x2f')](_0x0438('0x7a'))[_0x0438('0x7b')](isNaN(_0x494756[_0x0438('0x7c')])?_0x494756[_0x0438('0x7c')]:0x0==_0x494756[_0x0438('0x7c')]?_0x0438('0x7d'):(_0x3de06f(_0x0438('0x7e'))['attr'](_0x0438('0x7f'))||'R$')+'\x20'+qd_number_format(_0x494756[_0x0438('0x7c')]/0x64,0x2,',','.'));_0xd49a7[_0x0438('0x2f')](_0x0438('0x80'))[_0x0438('0x77')]({'data-sku':_0x494756['id'],'data-sku-index':_0x56288b})[_0x0438('0x81')](_0x494756['quantity']);_0xd49a7[_0x0438('0x2f')](_0x0438('0x82'))[_0x0438('0x77')]({'data-sku':_0x494756['id'],'data-sku-index':_0x56288b});_0x8afab0[_0x0438('0x83')](_0x494756['id'],_0xd49a7[_0x0438('0x2f')]('.qd-ddc-image'),_0x494756[_0x0438('0x84')]);_0xd49a7[_0x0438('0x2f')](_0x0438('0x85'))[_0x0438('0x77')]({'data-sku':_0x494756['id'],'data-sku-index':_0x56288b});_0xd49a7[_0x0438('0x86')](_0x4a53e9);_0x1356b2=_0x1356b2[_0x0438('0x31')](_0xd49a7);}try{var _0x552c69=_0x4a53e9[_0x0438('0x87')]('.qd-ddc-wrapper')[_0x0438('0x2f')]('.qd-ddc-shipping\x20input');_0x552c69['length']&&''==_0x552c69['val']()&&window[_0x0438('0x17')][_0x0438('0x69')][_0x0438('0x70')]['address']&&_0x552c69[_0x0438('0x81')](window[_0x0438('0x17')][_0x0438('0x69')][_0x0438('0x70')]['address'][_0x0438('0x88')]);}catch(_0x3b52a6){_0x192f05(_0x0438('0x89')+_0x3b52a6['message'],_0x0438('0x8a'));}_0x8afab0['actionButtons'](_0x4a53e9);_0x8afab0[_0x0438('0x47')]();_0xbea631&&_0xbea631['lastSku']&&function(){_0x4d8afc=_0x1356b2[_0x0438('0x8b')]('[data-sku=\x27'+_0xbea631[_0x0438('0x8c')]+'\x27]');_0x4d8afc[_0x0438('0x7')]&&(_0x3ef53e=0x0,_0x1356b2[_0x0438('0x59')](function(){var _0xbea631=_0x3de06f(this);if(_0xbea631['is'](_0x4d8afc))return!0x1;_0x3ef53e+=_0xbea631[_0x0438('0x8d')]();}),_0x8afab0[_0x0438('0x3f')](void 0x0,void 0x0,_0x3ef53e,_0x4a53e9[_0x0438('0x31')](_0x4a53e9['parent']())),_0x1356b2[_0x0438('0x35')](_0x0438('0x8e')),function(_0x2e0acf){_0x2e0acf[_0x0438('0x6c')](_0x0438('0x8f'));_0x2e0acf[_0x0438('0x6c')](_0x0438('0x8e'));setTimeout(function(){_0x2e0acf[_0x0438('0x35')]('qd-ddc-lastAdded');},_0x583a9d[_0x0438('0x66')]);}(_0x4d8afc),_0x3de06f(document[_0x0438('0x3a')])[_0x0438('0x6c')](_0x0438('0x90')),setTimeout(function(){_0x3de06f(document[_0x0438('0x3a')])['removeClass'](_0x0438('0x90'));},_0x583a9d[_0x0438('0x66')]));}();});(function(){_QuatroDigital_DropDown['getOrderForm'][_0x0438('0x6e')]['length']?(_0x3de06f(_0x0438('0x3a'))[_0x0438('0x35')](_0x0438('0x91'))['addClass']('qd-ddc-cart-rendered\x20qd-ddc-product-add-time'),setTimeout(function(){_0x3de06f(_0x0438('0x3a'))[_0x0438('0x35')](_0x0438('0x92'));},_0x583a9d['timeRemoveNewItemClass'])):_0x3de06f(_0x0438('0x3a'))[_0x0438('0x35')](_0x0438('0x93'))[_0x0438('0x6c')](_0x0438('0x91'));}());_0x0438('0xb')===typeof _0x583a9d['callbackProductsList']?_0x583a9d[_0x0438('0x94')]['call'](this):_0x192f05(_0x0438('0x95'));};_0x8afab0[_0x0438('0x83')]=function(_0x1ea236,_0xdd6f16,_0xc6072b){function _0x5c4183(){_0xdd6f16[_0x0438('0x35')](_0x0438('0x96'))[_0x0438('0x97')](function(){_0x3de06f(this)[_0x0438('0x6c')](_0x0438('0x96'));})[_0x0438('0x77')](_0x0438('0x98'),_0xc6072b);}_0xc6072b?_0x5c4183():isNaN(_0x1ea236)?_0x192f05(_0x0438('0x99'),_0x0438('0x12')):alert('Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.');};_0x8afab0['actionButtons']=function(_0x185d29){var _0x4a53e9=function(_0x4addb9,_0x5630c7){var _0x57a519=_0x3de06f(_0x4addb9);var _0x3c5249=_0x57a519[_0x0438('0x77')](_0x0438('0x9a'));var _0x4d8afc=_0x57a519[_0x0438('0x77')](_0x0438('0x9b'));if(_0x3c5249){var _0x5a9ff2=parseInt(_0x57a519[_0x0438('0x81')]())||0x1;_0x8afab0[_0x0438('0x9c')]([_0x3c5249,_0x4d8afc],_0x5a9ff2,_0x5a9ff2+0x1,function(_0x2a1a8a){_0x57a519['val'](_0x2a1a8a);_0x0438('0xb')===typeof _0x5630c7&&_0x5630c7();});}};var _0x1cecf8=function(_0x18064c,_0x728052){var _0x340d7f=_0x3de06f(_0x18064c);var _0x4d8afc=_0x340d7f[_0x0438('0x77')]('data-sku');var _0x17bdbb=_0x340d7f[_0x0438('0x77')](_0x0438('0x9b'));if(_0x4d8afc){var _0x50cd6a=parseInt(_0x340d7f[_0x0438('0x81')]())||0x2;_0x8afab0[_0x0438('0x9c')]([_0x4d8afc,_0x17bdbb],_0x50cd6a,_0x50cd6a-0x1,function(_0xf6a3ad){_0x340d7f[_0x0438('0x81')](_0xf6a3ad);_0x0438('0xb')===typeof _0x728052&&_0x728052();});}};var _0x1aa748=function(_0x27490a,_0x29f02a){var _0x4a53e9=_0x3de06f(_0x27490a);var _0x4d8afc=_0x4a53e9[_0x0438('0x77')](_0x0438('0x9a'));var _0x46c476=_0x4a53e9[_0x0438('0x77')](_0x0438('0x9b'));if(_0x4d8afc){var _0x4822ec=parseInt(_0x4a53e9[_0x0438('0x81')]())||0x1;_0x8afab0[_0x0438('0x9c')]([_0x4d8afc,_0x46c476],0x1,_0x4822ec,function(_0x1b355c){_0x4a53e9[_0x0438('0x81')](_0x1b355c);_0x0438('0xb')===typeof _0x29f02a&&_0x29f02a();});}};var _0x4d8afc=_0x185d29[_0x0438('0x2f')]('.qd-ddc-prodQttWrapper:not(.qd_on)');_0x4d8afc[_0x0438('0x6c')](_0x0438('0x9d'))[_0x0438('0x59')](function(){var _0x185d29=_0x3de06f(this);_0x185d29[_0x0438('0x2f')](_0x0438('0x9e'))['on'](_0x0438('0x9f'),function(_0x165f88){_0x165f88[_0x0438('0xa0')]();_0x4d8afc[_0x0438('0x6c')](_0x0438('0xa1'));_0x4a53e9(_0x185d29[_0x0438('0x2f')](_0x0438('0x80')),function(){_0x4d8afc[_0x0438('0x35')](_0x0438('0xa1'));});});_0x185d29[_0x0438('0x2f')](_0x0438('0xa2'))['on']('click.qd_ddc_minus',function(_0x1525e6){_0x1525e6['preventDefault']();_0x4d8afc[_0x0438('0x6c')](_0x0438('0xa1'));_0x1cecf8(_0x185d29['find']('.qd-ddc-quantity'),function(){_0x4d8afc[_0x0438('0x35')](_0x0438('0xa1'));});});_0x185d29['find'](_0x0438('0x80'))['on']('focusout.qd_ddc_change',function(){_0x4d8afc[_0x0438('0x6c')]('qd-loading');_0x1aa748(this,function(){_0x4d8afc['removeClass'](_0x0438('0xa1'));});});_0x185d29[_0x0438('0x2f')](_0x0438('0x80'))['on']('keyup.qd_ddc_change',function(_0x1f2edf){0xd==_0x1f2edf[_0x0438('0x39')]&&(_0x4d8afc[_0x0438('0x6c')](_0x0438('0xa1')),_0x1aa748(this,function(){_0x4d8afc[_0x0438('0x35')](_0x0438('0xa1'));}));});});_0x185d29[_0x0438('0x2f')]('.qd-ddc-prodRow')['each'](function(){var _0x185d29=_0x3de06f(this);_0x185d29[_0x0438('0x2f')]('.qd-ddc-remove')['on']('click.qd_ddc_remove',function(){_0x185d29[_0x0438('0x6c')](_0x0438('0xa1'));_0x8afab0[_0x0438('0xa3')](_0x3de06f(this),function(_0x262655){_0x262655?_0x185d29[_0x0438('0xa4')](!0x0)['slideUp'](function(){_0x185d29[_0x0438('0xa5')]();_0x8afab0[_0x0438('0x47')]();}):_0x185d29['removeClass'](_0x0438('0xa1'));});return!0x1;});});};_0x8afab0['shippingCalculate']=function(_0xb2175e){var _0x4e7364=_0xb2175e[_0x0438('0x81')]();_0x4e7364=_0x4e7364[_0x0438('0x1')](/[^0-9\-]/g,'');_0x4e7364=_0x4e7364[_0x0438('0x1')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x0438('0xa6'));_0x4e7364=_0x4e7364[_0x0438('0x1')](/(.{9}).*/g,'$1');_0xb2175e[_0x0438('0x81')](_0x4e7364);0x9<=_0x4e7364[_0x0438('0x7')]&&(_0xb2175e[_0x0438('0xa7')](_0x0438('0xa8'))!=_0x4e7364&&_0x552c69[_0x0438('0xa9')]({'postalCode':_0x4e7364,'country':_0x0438('0xaa')})[_0x0438('0xab')](function(_0x16fd9a){window[_0x0438('0x17')][_0x0438('0x69')]=_0x16fd9a;_0x8afab0[_0x0438('0x44')]();})[_0x0438('0xac')](function(_0x421725){_0x192f05(['Não\x20foi\x20possível\x20calcular\x20o\x20frete',_0x421725]);updateCartData();}),_0xb2175e[_0x0438('0xa7')](_0x0438('0xa8'),_0x4e7364));};_0x8afab0[_0x0438('0x9c')]=function(_0x5557e0,_0x1d31c2,_0x4374e2,_0x131391){function _0x50e400(_0x5c85a8){_0x5c85a8=_0x0438('0xad')!==typeof _0x5c85a8?!0x1:_0x5c85a8;_0x8afab0['getCartInfoByUrl']();window['_QuatroDigital_DropDown']['allowUpdate']=!0x1;_0x8afab0[_0x0438('0x47')]();_0x0438('0x3')!==typeof window[_0x0438('0x6a')]&&'function'===typeof window[_0x0438('0x6a')]['exec']&&window['_QuatroDigital_AmountProduct'][_0x0438('0x6b')][_0x0438('0x5a')](this);'function'===typeof adminCart&&adminCart();_0x3de06f['fn'][_0x0438('0x46')](!0x0,void 0x0,_0x5c85a8);_0x0438('0xb')===typeof _0x131391&&_0x131391(_0x1d31c2);}_0x4374e2=_0x4374e2||0x1;if(0x1>_0x4374e2)return _0x1d31c2;if(_0x583a9d[_0x0438('0x25')]){if(_0x0438('0x3')===typeof window[_0x0438('0x17')][_0x0438('0x69')][_0x0438('0x6e')][_0x5557e0[0x1]])return _0x192f05(_0x0438('0xae')+_0x5557e0[0x1]+']'),_0x1d31c2;window[_0x0438('0x17')][_0x0438('0x69')][_0x0438('0x6e')][_0x5557e0[0x1]][_0x0438('0xaf')]=_0x4374e2;window[_0x0438('0x17')][_0x0438('0x69')]['items'][_0x5557e0[0x1]]['index']=_0x5557e0[0x1];_0x552c69[_0x0438('0xb0')]([window[_0x0438('0x17')][_0x0438('0x69')][_0x0438('0x6e')][_0x5557e0[0x1]]],[_0x0438('0x6e'),_0x0438('0x6f'),_0x0438('0x70')])[_0x0438('0xab')](function(_0x4506ec){window[_0x0438('0x17')]['getOrderForm']=_0x4506ec;_0x50e400(!0x0);})[_0x0438('0xac')](function(_0x96f66e){_0x192f05([_0x0438('0xb1'),_0x96f66e]);_0x50e400();});}else _0x192f05(_0x0438('0xb2'));};_0x8afab0[_0x0438('0xa3')]=function(_0x180809,_0x59e59d){function _0x2d1d4e(_0x762ce1){_0x762ce1=_0x0438('0xad')!==typeof _0x762ce1?!0x1:_0x762ce1;_0x0438('0x3')!==typeof window['_QuatroDigital_AmountProduct']&&_0x0438('0xb')===typeof window[_0x0438('0x6a')]['exec']&&window[_0x0438('0x6a')][_0x0438('0x6b')]['call'](this);_0x0438('0xb')===typeof adminCart&&adminCart();_0x3de06f['fn']['simpleCart'](!0x0,void 0x0,_0x762ce1);_0x0438('0xb')===typeof _0x59e59d&&_0x59e59d(_0x4d8afc);}var _0x4d8afc=!0x1,_0x3bb5fc=_0x3de06f(_0x180809)[_0x0438('0x77')](_0x0438('0x9b'));if(_0x583a9d[_0x0438('0x25')]){if(_0x0438('0x3')===typeof window['_QuatroDigital_DropDown']['getOrderForm'][_0x0438('0x6e')][_0x3bb5fc])return _0x192f05('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x3bb5fc+']'),_0x4d8afc;window[_0x0438('0x17')][_0x0438('0x69')]['items'][_0x3bb5fc][_0x0438('0xb3')]=_0x3bb5fc;_0x552c69[_0x0438('0xb4')]([window[_0x0438('0x17')][_0x0438('0x69')][_0x0438('0x6e')][_0x3bb5fc]],['items',_0x0438('0x6f'),_0x0438('0x70')])['done'](function(_0x25845f){_0x4d8afc=!0x0;window[_0x0438('0x17')][_0x0438('0x69')]=_0x25845f;_0x1c5d88(_0x25845f);_0x2d1d4e(!0x0);})[_0x0438('0xac')](function(_0x2394a5){_0x192f05([_0x0438('0xb5'),_0x2394a5]);_0x2d1d4e();});}else alert('Atenção,\x20este\x20método\x20esta\x20descontinuado.');};_0x8afab0[_0x0438('0x3f')]=function(_0x1c2e84,_0x7c5f8,_0x11c2ca,_0x21285a){_0x21285a=_0x21285a||_0x3de06f(_0x0438('0xb6'));_0x1c2e84=_0x1c2e84||'+';_0x7c5f8=_0x7c5f8||0.9*_0x21285a[_0x0438('0xb7')]();_0x21285a['stop'](!0x0,!0x0)[_0x0438('0xb8')]({'scrollTop':isNaN(_0x11c2ca)?_0x1c2e84+'='+_0x7c5f8+'px':_0x11c2ca});};_0x583a9d[_0x0438('0x42')]||(_0x8afab0[_0x0438('0x44')](),_0x3de06f['fn'][_0x0438('0x46')](!0x0));_0x3de06f(window)['on'](_0x0438('0xb9'),function(){try{window[_0x0438('0x17')]['getOrderForm']=void 0x0,_0x8afab0[_0x0438('0x44')]();}catch(_0x62c71){_0x192f05(_0x0438('0xba')+_0x62c71['message'],_0x0438('0xbb'));}});_0x0438('0xb')===typeof _0x583a9d[_0x0438('0xa')]?_0x583a9d[_0x0438('0xa')]['call'](this):_0x192f05('Callback\x20não\x20é\x20uma\x20função');};_0x3de06f['fn'][_0x0438('0x18')]=function(_0x5782dd){var _0x56d5ce=_0x3de06f(this);_0x56d5ce['fn']=new _0x3de06f[(_0x0438('0x18'))](this,_0x5782dd);return _0x56d5ce;};}catch(_0x24e99a){_0x0438('0x3')!==typeof console&&'function'===typeof console['error']&&console[_0x0438('0xc')](_0x0438('0xd'),_0x24e99a);}}(this));(function(_0x4cd590){try{var _0x323ed2=jQuery;window['_QuatroDigital_AmountProduct']=window[_0x0438('0x6a')]||{};window[_0x0438('0x6a')][_0x0438('0x6e')]={};window['_QuatroDigital_AmountProduct'][_0x0438('0xbc')]=!0x1;window[_0x0438('0x6a')][_0x0438('0xbd')]=!0x1;window['_QuatroDigital_AmountProduct']['quickViewUpdate']=!0x1;var _0x31b654=function(){if(window[_0x0438('0x6a')][_0x0438('0xbc')]){var _0x50fb89=!0x1;var _0x346c95={};window[_0x0438('0x6a')][_0x0438('0x6e')]={};for(_0x471443 in window[_0x0438('0x17')][_0x0438('0x69')][_0x0438('0x6e')])if(_0x0438('0xf')===typeof window[_0x0438('0x17')][_0x0438('0x69')][_0x0438('0x6e')][_0x471443]){var _0x43aa6b=window['_QuatroDigital_DropDown'][_0x0438('0x69')]['items'][_0x471443];_0x0438('0x3')!==typeof _0x43aa6b[_0x0438('0xbe')]&&null!==_0x43aa6b[_0x0438('0xbe')]&&''!==_0x43aa6b[_0x0438('0xbe')]&&(window[_0x0438('0x6a')]['items'][_0x0438('0xbf')+_0x43aa6b[_0x0438('0xbe')]]=window['_QuatroDigital_AmountProduct'][_0x0438('0x6e')][_0x0438('0xbf')+_0x43aa6b[_0x0438('0xbe')]]||{},window['_QuatroDigital_AmountProduct'][_0x0438('0x6e')][_0x0438('0xbf')+_0x43aa6b[_0x0438('0xbe')]][_0x0438('0xc0')]=_0x43aa6b[_0x0438('0xbe')],_0x346c95[_0x0438('0xbf')+_0x43aa6b['productId']]||(window[_0x0438('0x6a')][_0x0438('0x6e')][_0x0438('0xbf')+_0x43aa6b[_0x0438('0xbe')]]['qtt']=0x0),window[_0x0438('0x6a')][_0x0438('0x6e')][_0x0438('0xbf')+_0x43aa6b[_0x0438('0xbe')]]['qtt']+=_0x43aa6b[_0x0438('0xaf')],_0x50fb89=!0x0,_0x346c95[_0x0438('0xbf')+_0x43aa6b[_0x0438('0xbe')]]=!0x0);}var _0x471443=_0x50fb89;}else _0x471443=void 0x0;window[_0x0438('0x6a')][_0x0438('0xbc')]&&(_0x323ed2(_0x0438('0xc1'))[_0x0438('0xa5')](),_0x323ed2(_0x0438('0xc2'))[_0x0438('0x35')](_0x0438('0xc3')));for(var _0x15f4cd in window[_0x0438('0x6a')][_0x0438('0x6e')]){_0x43aa6b=window[_0x0438('0x6a')]['items'][_0x15f4cd];if(_0x0438('0xf')!==typeof _0x43aa6b)return;_0x346c95=_0x323ed2('input.qd-productId[value='+_0x43aa6b[_0x0438('0xc0')]+']')[_0x0438('0x87')]('li');if(window[_0x0438('0x6a')][_0x0438('0xbc')]||!_0x346c95[_0x0438('0x2f')](_0x0438('0xc1'))[_0x0438('0x7')])_0x50fb89=_0x323ed2(_0x0438('0xc4')),_0x50fb89[_0x0438('0x2f')]('.qd-bap-qtt')[_0x0438('0x51')](_0x43aa6b['qtt']),_0x43aa6b=_0x346c95['find'](_0x0438('0xc5')),_0x43aa6b[_0x0438('0x7')]?_0x43aa6b[_0x0438('0xc6')](_0x50fb89)[_0x0438('0x6c')]('qd-bap-item-added'):_0x346c95[_0x0438('0xc6')](_0x50fb89);}_0x471443&&(window[_0x0438('0x6a')][_0x0438('0xbc')]=!0x1);};window['_QuatroDigital_AmountProduct'][_0x0438('0x6b')]=function(){window['_QuatroDigital_AmountProduct'][_0x0438('0xbc')]=!0x0;_0x31b654[_0x0438('0x5a')](this);};_0x323ed2(document)['ajaxStop'](function(){_0x31b654[_0x0438('0x5a')](this);});}catch(_0x52fab7){_0x0438('0x3')!==typeof console&&_0x0438('0xb')===typeof console['error']&&console['error'](_0x0438('0xd'),_0x52fab7);}}(this));(function(){try{var _0x503dbd=jQuery,_0x39adb8,_0x3ebc9f={'selector':_0x0438('0xc7'),'dropDown':{},'buyButton':{}};_0x503dbd[_0x0438('0xc8')]=function(_0x37379e){var _0x529cec={};_0x39adb8=_0x503dbd[_0x0438('0x1f')](!0x0,{},_0x3ebc9f,_0x37379e);_0x37379e=_0x503dbd(_0x39adb8[_0x0438('0xc9')])[_0x0438('0x18')](_0x39adb8[_0x0438('0xca')]);_0x529cec[_0x0438('0xcb')]='undefined'!==typeof _0x39adb8[_0x0438('0xca')]['updateOnlyHover']&&!0x1===_0x39adb8[_0x0438('0xca')][_0x0438('0x42')]?_0x503dbd(_0x39adb8[_0x0438('0xc9')])['QD_buyButton'](_0x37379e['fn'],_0x39adb8['buyButton']):_0x503dbd(_0x39adb8['selector'])[_0x0438('0xcc')](_0x39adb8[_0x0438('0xcb')]);_0x529cec[_0x0438('0xca')]=_0x37379e;return _0x529cec;};_0x503dbd['fn'][_0x0438('0xcd')]=function(){_0x0438('0xf')===typeof console&&_0x0438('0xb')===typeof console[_0x0438('0x14')]&&console['info'](_0x0438('0xce'));};_0x503dbd['smartCart']=_0x503dbd['fn'][_0x0438('0xcd')];}catch(_0x58085d){_0x0438('0x3')!==typeof console&&_0x0438('0xb')===typeof console['error']&&console['error'](_0x0438('0xd'),_0x58085d);}}());
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
var _0xb145=['each','addClass','qd-am-li-','first','qd-am-last','replace','toUpperCase','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','filter','.qd-am-collection','parent','qd-am-banner-wrapper','qdAjax','url','html','img[alt=\x27','data-qdam-value','length','clone','insertBefore','hide','qd-am-content-loaded','text','trim','[class*=\x27colunas\x27]','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','li\x20>ul','qd-am-has-ul','children',':not(ul)','qd-am-elem-','replaceSpecialChars','>li','qdAmAddNdx','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','add','qd-am-','QuatroDigital.am.callback','exec','getParent','closest','function','QD_amazingMenu','/qd-amazing-menu','object','undefined','error','info','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','aviso','toLowerCase','join','apply','warn'];(function(_0x1f3fbf,_0x1d5d9b){var _0x44e52a=function(_0x3f6172){while(--_0x3f6172){_0x1f3fbf['push'](_0x1f3fbf['shift']());}};_0x44e52a(++_0x1d5d9b);}(_0xb145,0x193));var _0x5b14=function(_0x128682,_0x5cb7dc){_0x128682=_0x128682-0x0;var _0x485a80=_0xb145[_0x128682];return _0x485a80;};(function(_0x3b0839){_0x3b0839['fn'][_0x5b14('0x0')]=_0x3b0839['fn'][_0x5b14('0x1')];}(jQuery));(function(_0x31f6f0){var _0x34b4cd;var _0x5111cd=jQuery;if(_0x5b14('0x2')!==typeof _0x5111cd['fn'][_0x5b14('0x3')]){var _0x392425={'url':_0x5b14('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0x50fd91=function(_0x1d12ed,_0x2a3921){if(_0x5b14('0x5')===typeof console&&_0x5b14('0x6')!==typeof console[_0x5b14('0x7')]&&'undefined'!==typeof console[_0x5b14('0x8')]&&_0x5b14('0x6')!==typeof console['warn']){var _0x1d8b5f;_0x5b14('0x5')===typeof _0x1d12ed?(_0x1d12ed[_0x5b14('0x9')](_0x5b14('0xa')),_0x1d8b5f=_0x1d12ed):_0x1d8b5f=[_0x5b14('0xa')+_0x1d12ed];if('undefined'===typeof _0x2a3921||_0x5b14('0xb')!==_0x2a3921['toLowerCase']()&&_0x5b14('0xc')!==_0x2a3921[_0x5b14('0xd')]())if(_0x5b14('0x6')!==typeof _0x2a3921&&_0x5b14('0x8')===_0x2a3921[_0x5b14('0xd')]())try{console[_0x5b14('0x8')]['apply'](console,_0x1d8b5f);}catch(_0x27b34b){try{console[_0x5b14('0x8')](_0x1d8b5f[_0x5b14('0xe')]('\x0a'));}catch(_0x1dfa26){}}else try{console[_0x5b14('0x7')][_0x5b14('0xf')](console,_0x1d8b5f);}catch(_0x68f695){try{console[_0x5b14('0x7')](_0x1d8b5f[_0x5b14('0xe')]('\x0a'));}catch(_0x287bb7){}}else try{console[_0x5b14('0x10')][_0x5b14('0xf')](console,_0x1d8b5f);}catch(_0x5cce9b){try{console[_0x5b14('0x10')](_0x1d8b5f['join']('\x0a'));}catch(_0x48d395){}}}};_0x5111cd['fn']['qdAmAddNdx']=function(){var _0x3f397d=_0x5111cd(this);_0x3f397d[_0x5b14('0x11')](function(_0x3662a7){_0x5111cd(this)[_0x5b14('0x12')](_0x5b14('0x13')+_0x3662a7);});_0x3f397d[_0x5b14('0x14')]()[_0x5b14('0x12')]('qd-am-first');_0x3f397d['last']()['addClass'](_0x5b14('0x15'));return _0x3f397d;};_0x5111cd['fn'][_0x5b14('0x3')]=function(){};_0x31f6f0=function(_0x9a9495){var _0x1e22a5={'n':'sevpnanegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x1018d9){var _0x1577f7=function(_0x4857c7){return _0x4857c7;};var _0x2d7b38=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x1018d9=_0x1018d9['d'+_0x2d7b38[0x10]+'c'+_0x2d7b38[0x11]+'m'+_0x1577f7(_0x2d7b38[0x1])+'n'+_0x2d7b38[0xd]]['l'+_0x2d7b38[0x12]+'c'+_0x2d7b38[0x0]+'ti'+_0x1577f7('o')+'n'];var _0x30734f=function(_0x50951f){return escape(encodeURIComponent(_0x50951f[_0x5b14('0x16')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x59282c){return String['fromCharCode'](('Z'>=_0x59282c?0x5a:0x7a)>=(_0x59282c=_0x59282c['charCodeAt'](0x0)+0xd)?_0x59282c:_0x59282c-0x1a);})));};var _0x2d62d1=_0x30734f(_0x1018d9[[_0x2d7b38[0x9],_0x1577f7('o'),_0x2d7b38[0xc],_0x2d7b38[_0x1577f7(0xd)]][_0x5b14('0xe')]('')]);_0x30734f=_0x30734f((window[['js',_0x1577f7('no'),'m',_0x2d7b38[0x1],_0x2d7b38[0x4][_0x5b14('0x17')](),'ite'][_0x5b14('0xe')]('')]||_0x5b14('0x18'))+['.v',_0x2d7b38[0xd],'e',_0x1577f7('x'),'co',_0x1577f7('mm'),_0x5b14('0x19'),_0x2d7b38[0x1],'.c',_0x1577f7('o'),'m.',_0x2d7b38[0x13],'r'][_0x5b14('0xe')](''));for(var _0xe6851b in _0x1e22a5){if(_0x30734f===_0xe6851b+_0x1e22a5[_0xe6851b]||_0x2d62d1===_0xe6851b+_0x1e22a5[_0xe6851b]){var _0x1bbbd7='tr'+_0x2d7b38[0x11]+'e';break;}_0x1bbbd7='f'+_0x2d7b38[0x0]+'ls'+_0x1577f7(_0x2d7b38[0x1])+'';}_0x1577f7=!0x1;-0x1<_0x1018d9[[_0x2d7b38[0xc],'e',_0x2d7b38[0x0],'rc',_0x2d7b38[0x9]][_0x5b14('0xe')]('')][_0x5b14('0x1a')](_0x5b14('0x1b'))&&(_0x1577f7=!0x0);return[_0x1bbbd7,_0x1577f7];}(_0x9a9495);}(window);if(!eval(_0x31f6f0[0x0]))return _0x31f6f0[0x1]?_0x50fd91(_0x5b14('0x1c')):!0x1;var _0xbe39bc=function(_0x1ab33f){var _0x1c3c52=_0x1ab33f[_0x5b14('0x1d')]('.qd_am_code');var _0x370fcd=_0x1c3c52[_0x5b14('0x1e')]('.qd-am-banner');var _0x4ecf7c=_0x1c3c52[_0x5b14('0x1e')](_0x5b14('0x1f'));if(_0x370fcd['length']||_0x4ecf7c['length'])_0x370fcd[_0x5b14('0x20')]()['addClass'](_0x5b14('0x21')),_0x4ecf7c[_0x5b14('0x20')]()['addClass']('qd-am-collection-wrapper'),_0x5111cd[_0x5b14('0x22')]({'url':_0x34b4cd[_0x5b14('0x23')],'dataType':_0x5b14('0x24'),'success':function(_0x53f785){var _0x2eac20=_0x5111cd(_0x53f785);_0x370fcd['each'](function(){var _0x53f785=_0x5111cd(this);var _0x291c92=_0x2eac20[_0x5b14('0x1d')](_0x5b14('0x25')+_0x53f785['attr'](_0x5b14('0x26'))+'\x27]');_0x291c92[_0x5b14('0x27')]&&(_0x291c92[_0x5b14('0x11')](function(){_0x5111cd(this)[_0x5b14('0x0')]('.box-banner')[_0x5b14('0x28')]()[_0x5b14('0x29')](_0x53f785);}),_0x53f785[_0x5b14('0x2a')]());})['addClass'](_0x5b14('0x2b'));_0x4ecf7c['each'](function(){var _0x53f785={};var _0x43e53=_0x5111cd(this);_0x2eac20['find']('h2')[_0x5b14('0x11')](function(){if(_0x5111cd(this)[_0x5b14('0x2c')]()['trim']()[_0x5b14('0xd')]()==_0x43e53['attr'](_0x5b14('0x26'))[_0x5b14('0x2d')]()[_0x5b14('0xd')]())return _0x53f785=_0x5111cd(this),!0x1;});_0x53f785[_0x5b14('0x27')]&&(_0x53f785['each'](function(){_0x5111cd(this)[_0x5b14('0x0')](_0x5b14('0x2e'))[_0x5b14('0x28')]()[_0x5b14('0x29')](_0x43e53);}),_0x43e53[_0x5b14('0x2a')]());})[_0x5b14('0x12')](_0x5b14('0x2b'));},'error':function(){_0x50fd91(_0x5b14('0x2f')+_0x34b4cd[_0x5b14('0x23')]+_0x5b14('0x30'));},'complete':function(){_0x34b4cd[_0x5b14('0x31')][_0x5b14('0x32')](this);_0x5111cd(window)[_0x5b14('0x33')](_0x5b14('0x34'),_0x1ab33f);},'clearQueueDelay':0xbb8});};_0x5111cd[_0x5b14('0x3')]=function(_0x1fe8fc){var _0x47bae4=_0x1fe8fc[_0x5b14('0x1d')]('ul[itemscope]')[_0x5b14('0x11')](function(){var _0x2dea7f=_0x5111cd(this);if(!_0x2dea7f['length'])return _0x50fd91(['UL\x20do\x20menu\x20não\x20encontrada',_0x1fe8fc],'alerta');_0x2dea7f[_0x5b14('0x1d')](_0x5b14('0x35'))['parent']()[_0x5b14('0x12')](_0x5b14('0x36'));_0x2dea7f[_0x5b14('0x1d')]('li')[_0x5b14('0x11')](function(){var _0x3b74ad=_0x5111cd(this);var _0x57a2c9=_0x3b74ad[_0x5b14('0x37')](_0x5b14('0x38'));_0x57a2c9['length']&&_0x3b74ad[_0x5b14('0x12')](_0x5b14('0x39')+_0x57a2c9[_0x5b14('0x14')]()[_0x5b14('0x2c')]()['trim']()[_0x5b14('0x3a')]()[_0x5b14('0x16')](/\./g,'')[_0x5b14('0x16')](/\s/g,'-')[_0x5b14('0xd')]());});var _0x5bf279=_0x2dea7f[_0x5b14('0x1d')](_0x5b14('0x3b'))[_0x5b14('0x3c')]();_0x2dea7f[_0x5b14('0x12')]('qd-amazing-menu');_0x5bf279=_0x5bf279['find'](_0x5b14('0x3d'));_0x5bf279[_0x5b14('0x11')](function(){var _0x5ebbbe=_0x5111cd(this);_0x5ebbbe[_0x5b14('0x1d')]('>li')[_0x5b14('0x3c')]()[_0x5b14('0x12')](_0x5b14('0x3e'));_0x5ebbbe[_0x5b14('0x12')](_0x5b14('0x3f'));_0x5ebbbe['parent']()[_0x5b14('0x12')](_0x5b14('0x40'));});_0x5bf279[_0x5b14('0x12')](_0x5b14('0x40'));var _0x46e8ba=0x0,_0x31f6f0=function(_0x591eae){_0x46e8ba+=0x1;_0x591eae=_0x591eae[_0x5b14('0x37')]('li')['children']('*');_0x591eae['length']&&(_0x591eae['addClass'](_0x5b14('0x41')+_0x46e8ba),_0x31f6f0(_0x591eae));};_0x31f6f0(_0x2dea7f);_0x2dea7f[_0x5b14('0x42')](_0x2dea7f[_0x5b14('0x1d')]('ul'))[_0x5b14('0x11')](function(){var _0x3740bb=_0x5111cd(this);_0x3740bb[_0x5b14('0x12')](_0x5b14('0x43')+_0x3740bb['children']('li')['length']+'-li');});});_0xbe39bc(_0x47bae4);_0x34b4cd['callback']['call'](this);_0x5111cd(window)[_0x5b14('0x33')](_0x5b14('0x44'),_0x1fe8fc);};_0x5111cd['fn'][_0x5b14('0x3')]=function(_0x5ad24d){var _0x2547d6=_0x5111cd(this);if(!_0x2547d6['length'])return _0x2547d6;_0x34b4cd=_0x5111cd['extend']({},_0x392425,_0x5ad24d);_0x2547d6[_0x5b14('0x45')]=new _0x5111cd[(_0x5b14('0x3'))](_0x5111cd(this));return _0x2547d6;};_0x5111cd(function(){_0x5111cd('.qd_amazing_menu_auto')[_0x5b14('0x3')]();});}}(this));
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
/* Quatro Digital - Smart Quantity // 1.12 // Carlos Vinicius // Todos os direitos reservados */
(function(v){var d=jQuery;if("function"!==typeof d.fn.QD_smartQuantity){var g=function(d,a){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var f;"object"===typeof d?(d.unshift("[Quatro Digital - Smart Quantity]\n"),f=d):f=["[Quatro Digital - Smart Quantity]\n"+d];if("undefined"===typeof a||"alerta"!==a.toLowerCase()&&"aviso"!==a.toLowerCase())if("undefined"!==typeof a&&"info"===a.toLowerCase())try{console.info.apply(console,
f)}catch(k){console.info(f.join("\n"))}else try{console.error.apply(console,f)}catch(k){console.error(f.join("\n"))}else try{console.warn.apply(console,f)}catch(k){console.warn(f.join("\n"))}}},m={buyButton:".buy-button",qttInput:".qd-sq-quantity",btnMore:".qd-sq-more",btnMinus:".qd-sq-minus",initialValue:1,minimumValue:1,setQuantityByUrl:!0},n=function(h,a){function f(c,e,b){a.setQuantityByUrl?c.val(((location.search||"").match(q)||[a.initialValue]).pop()):c.val(a.initialValue);c.change(function(c,
b){try{if("qd_ssl_trigger"!=b){var e=d(this),f=parseInt(e.val().replace(n,""));!isNaN(f)&&f>a.minimumValue?e.val(f):e.val(a.minimumValue);e.trigger("QuatroDigital.sq_change",this)}}catch(t){g(t.message)}});c.focusin(function(){d(this).trigger("QuatroDigital.sq_focusin",this)});e.click(function(b){b.preventDefault();c.val((parseInt(c.val())||a.minimumValue)+1).change()});b.click(function(b){b.preventDefault();c.val((parseInt(c.val())||a.minimumValue+1)-1).change()});c.change()}function k(c,e,b){c.on("QuatroDigital.sq_change",
function(){(d(this).val()||0)<=a.minimumValue?(b.addClass("qd-sq-inactive"),e.removeClass("qd-sq-inactive")):(e.addClass("qd-sq-inactive"),b.removeClass("qd-sq-inactive"))})}function m(c,e){c.on("QuatroDigital.sq_change",function(){try{if(!(e[0].hostname||"").length)return g("A quantidade n\u00e3o foi inserida no bt comprar pois o mesmo n\u00e3o possui uma URL","info");var b=e[0].search||"";-1<b.toLowerCase().indexOf("qty=")?e[0].search=b.replace(p,"qty="+(parseInt(c.val())||("number"==typeof a.minimumValue?
a.minimumValue:1))+"&"):e[0].search="qty="+(parseInt(c.val())||("number"==typeof a.minimumValue?a.minimumValue:1))+"&"+(e[0].search||"").replace(p,"");e.not(":first").each(function(){this.href=e[0].href});var d=((e.first().attr("href")||"").match(u)||[""]).pop()+"";c.attr("data-sku-id",d);if(d.length&&"object"===typeof skuJson&&!c.attr("data-sku-price"))for(b=0;b<skuJson.skus.length;b++)skuJson.skus[b].sku==d&&c.attr("data-sku-price",skuJson.skus[b].bestPrice)}catch(l){g(l.message)}})}var n=/[^0-9-]/gi,
q=/qty\=([0-9]+)/i,u=/sku\=([0-9]+)/i,p=/qty\=[0-9]+\&?/ig;h.each(function(){try{var c=d(this),e=c.find(a.buyButton),b=c.find(a.qttInput),h=c.find(a.btnMore),l=c.find(a.btnMinus);if(!e.length&&null!==a.buyButton||!b.length)return g("O plugin parou por aqui! N\u00e3o foram encontrados o bot\u00e3o comprar e o campo de quantidade","alerta");if(b.is(".qd-sq-on"))return g(["Execu\u00e7\u00e3o ignorada pois este input j\u00e1 possui o plugin aplicado. Input: ",b],"info");b.addClass("qd-sq-on");k(b,h,l);
null!==a.buyButton&&m(b,e);f(b,h,l);d(window).on("vtex.sku.selected",function(){b.change()})}catch(r){g(r.message)}})};d.fn.QD_smartQuantity=function(g){var a=d(this);a.qdPlugin=new n(a,d.extend({},m,g));d(window).trigger("QuatroDigital.sq_callback");return a};d(function(){d(".qd_auto_smart_quantity").QD_smartQuantity()})}})(this);    
// not qd-include ../qd-product-thumbs/QD_productThumbs.min.js

/* Automatizador de comments box do Facebook // 1.2 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a;a=$(".fb-comments");if(a.length)if($("#fb-root").length||$("body").append('<div id="fb-root"></div>'),a.attr("data-href",document.location.href.split("#").shift().split("?").shift()),$("script[src*='connect.facebook.net']").filter("[src*='all.js']").length)"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse();else{var b=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||(a=document.createElement("script"),a.id="facebook-jssdk",a.src="//connect.facebook.net/pt_BR/all.js#xfbml=1&appId="+($("meta[property='fb:app_id']").attr("content")||""),b.parentNode.insertBefore(a,b))}});
/* $("a").getParent("ul"); // 3 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT */
(function(a){a.fn.getParent=a.fn.closest})(jQuery);
/* jQuery Cookie Plugin v1.4.1 // https://github.com/carhartl/jquery-cookie // Copyright 2013 Klaus Hartl // Released under the MIT license */
(function(){"function"!==typeof $.cookie&&function(c){"function"===typeof define&&define.amd?define(["jquery"],c):"object"===typeof exports?c(require("jquery")):c(jQuery)}(function(c){function p(a){a=e.json?JSON.stringify(a):String(a);return e.raw?a:encodeURIComponent(a)}function n(a,g){var b;if(e.raw)b=a;else a:{var d=a;0===d.indexOf('"')&&(d=d.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{d=decodeURIComponent(d.replace(l," "));b=e.json?JSON.parse(d):d;break a}catch(h){}b=void 0}return c.isFunction(g)?
g(b):b}var l=/\+/g,e=c.cookie=function(a,g,b){if(1<arguments.length&&!c.isFunction(g)){b=c.extend({},e.defaults,b);if("number"===typeof b.expires){var d=b.expires,h=b.expires=new Date;h.setTime(+h+864E5*d)}return document.cookie=[e.raw?a:encodeURIComponent(a),"=",p(g),b.expires?"; expires="+b.expires.toUTCString():"",b.path?"; path="+b.path:"",b.domain?"; domain="+b.domain:"",b.secure?"; secure":""].join("")}for(var d=a?void 0:{},h=document.cookie?document.cookie.split("; "):[],m=0,l=h.length;m<l;m++){var f=
h[m].split("="),k;k=f.shift();k=e.raw?k:decodeURIComponent(k);f=f.join("=");if(a&&a===k){d=n(f,g);break}a||void 0===(f=n(f))||(d[k]=f)}return d};e.defaults={};c.removeCookie=function(a,e){if(void 0===c.cookie(a))return!1;c.cookie(a,"",c.extend({},e,{expires:-1}));return!c.cookie(a)}})})();
/* Quatro Digital Cookie Functions // 1.4 // Carlos Vinicius // Todos os direitos reservados */
(function(){var a,h,g;a=jQuery;g={cookieName:"Nome_Padrao",closeLimit:2,expireDays:365,completeExpireDays:365,path:"/",close:"[class*=close]",show:function(a){a.slideDown()},hide:function(a){a.slideUp()},callback:function(){},exceededLimitCallback:function(){},closeCallback:function(){}};var k=function(a,c){if("object"===typeof console){var e;"object"===typeof a?(a.unshift("[Cookie Functions]\n"),e=a):e=["[Cookie Functions]\n"+a];"undefined"===typeof c||"alerta"!==c.toLowerCase()&&"aviso"!==c.toLowerCase()?
"undefined"!==typeof c&&"info"===c.toLowerCase()?console.info.apply(console,e):console.error.apply(console,e):console.warn.apply(console,e)}};a.QD_cookieFn=function(f){if("function"!==typeof a.cookie)return k("Aeeeee irm\u00e3\u00e3\u00e3ooooo!\nEsta faltando o plugin $.cookie mew. Chama ele na p\u00e1gina, vlw!");var c=function(d,b){var c=a.cookie("qdCookieFn_"+b.cookieName);if("undefined"!==typeof c&&c>=b.closeLimit||a.cookie("qdCookieFn_"+b.cookieName+"_complete"))return b.exceededLimitCallback();
b.show(d);d.trigger("QuatroDigital.cf_show");a(window).on("qdNewsSuccessCallback",function(a,c){d.trigger("QuatroDigital.qdcf_applyComplete");b.show(d);d.trigger("QuatroDigital.cf_hide")});b.callback();d.trigger("QuatroDigital.cf_callback")},e=function(a,b){a.find(b.close).not(".qd-cookie-on").addClass("qd-cookie-on").bind("click",function(){a.trigger("QuatroDigital.cf_close");a.slideUp(function(){b.closeCallback()})})},g=function(c,b){c.bind("QuatroDigital.cf_close",function(){"undefined"===typeof a.cookie("qdCookieFn_"+
b.cookieName)?a.cookie("qdCookieFn_"+b.cookieName,1,{expires:b.expireDays,path:b.path}):a.cookie("qdCookieFn_"+b.cookieName,(parseInt(a.cookie("qdCookieFn_"+b.cookieName),10)||0)+1,{expires:b.expireDays,path:b.path})});c.bind("QuatroDigital.qdcf_applyComplete",function(){a.cookie("qdCookieFn_"+b.cookieName+"_complete",1,{expires:b.completeExpireDays,path:b.path})});c.bind("QuatroDigital.qdcf_applyLimit",function(){a.cookie("qdCookieFn_"+b.cookieName,b.closeLimit,{expires:b.expireDays,path:b.path})})};
f.each(function(){var d=a(this),b;try{if(b=d.attr("data-qd-cookie"))var f=a.parseJSON("{"+b+"}")}catch(l){k(['Aeee irm\u00e3ooo!\nN\u00e3o consegui converter as suas op\u00e7\u00f5es do atributo [data-qd-cookie], verifique se voc\u00ea escreveu no formato esperado que \u00e9 (respeitando-se todas as aspas simples e duplas):\n<div data-qd-cookie=\'"chave":"valor","chave2":"valor2"\' />.',"\n\nDetalhes do erro: "+l.message],"alerta"),f={}}b=a.extend({},h,f);g(d,b);c(d,b);e(d,b)})};a.fn.QD_cookieFn=
function(f){var c=a(this);h=a.extend(!0,{},g,f);c.QD_cookieFn=new a.QD_cookieFn(c);return c};a(function(){a("[data-qd-cookie]").QD_cookieFn()})})();
/* Quatro Digital - Product Thumbs // 1.0 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs()}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return $.extend({},a,new b(a))},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();
/*PHP JS - Number Format - http://phpjs.org/functions/number_format/*/
function qd_number_format(b,c,d,e){b=(b+"").replace(/[^0-9+\-Ee.]/g,"");b=isFinite(+b)?+b:0;c=isFinite(+c)?Math.abs(c):0;e="undefined"===typeof e?",":e;d="undefined"===typeof d?".":d;var a="",a=function(a,b){var c=Math.pow(10,b);return""+(Math.round(a*c)/c).toFixed(b)},a=(c?a(b,c):""+Math.round(b)).split(".");3<a[0].length&&(a[0]=a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,e));(a[1]||"").length<c&&(a[1]=a[1]||"",a[1]+=Array(c-a[1].length+1).join("0"));return a.join(d)};
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);