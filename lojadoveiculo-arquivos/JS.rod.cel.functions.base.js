/**
* Funções base
*/
"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});
"function"!==typeof String.prototype.replaceSpecialChars&&(String.prototype.replaceSpecialChars=function(){var b={"\u00e7":"c","\u00e6":"ae","\u0153":"oe","\u00e1":"a","\u00e9":"e","\u00ed":"i","\u00f3":"o","\u00fa":"u","\u00e0":"a","\u00e8":"e","\u00ec":"i","\u00f2":"o","\u00f9":"u","\u00e4":"a","\u00eb":"e","\u00ef":"i","\u00f6":"o","\u00fc":"u","\u00ff":"y","\u00e2":"a","\u00ea":"e","\u00ee":"i","\u00f4":"o","\u00fb":"u","\u00e5":"a","\u00e3":"a","\u00f8":"o","\u00f5":"o",u:"u","\u00c1":"A","\u00c9":"E", "\u00cd":"I","\u00d3":"O","\u00da":"U","\u00ca":"E","\u00d4":"O","\u00dc":"U","\u00c3":"A","\u00d5":"O","\u00c0":"A","\u00c7":"C"};return this.replace(/[\u00e0-\u00fa]/ig,function(a){return"undefined"!=typeof b[a]?b[a]:a})});
Array.prototype.indexOf||(Array.prototype.indexOf=function(d,e){var a;if(null==this)throw new TypeError('"this" is null or not defined');var c=Object(this),b=c.length>>>0;if(0===b)return-1;a=+e||0;Infinity===Math.abs(a)&&(a=0);if(a>=b)return-1;for(a=Math.max(0<=a?a:b-Math.abs(a),0);a<b;){if(a in c&&c[a]===d)return a;a++}return-1});

try {
	var Common = {
		run: function() {},
		init: function() {
			Common.amazingMenu();
			Common.bannerResponsive();
			Common.bannersCount();
			Common.callCartLinkShow();
			Common.floatBarMiniCart();
			Common.smartCart();
			Common.cartAddProduct();
		},
		ajaxStop: function() {
		},
		windowOnload: function() {
			Common.facebookLikebox();
		},
		buyInShelf: function() {
			var fn = function(){
				$(".shelf-qd-v1-buy-button .btn-add-buy-button-asynchronous:not('.remove-href')").not('.qd-on-bb').addClass("show qd-on-bb").click(function(e) {
					e.preventDefault();
					var $t = $(this);

					Common.buyInShelfOpenModal($t.getParent(".wrapper-buy-button-asynchronous").find("input[class*='buy-button-asynchronous-product-url']" || "").attr("class").replace(/[^0-9]+/gi, ""), $t.getParent(".shelf-qd-v1-buy-button").find(".qd-sq-quantity").val() || 1);
				});
			};
			fn();

			// Ações
			$(".qd-v1-modal").on("hidden.bs.modal", function(){
				$(this).removeClass("shelf-qd-v1-buy-button-modal");
			});

			// No callback do infinity scroll
			$(window).on("QuatroDigital.is_Callback", function(){
				fn();
			});
		},
		floatBarMiniCart: function() {
			var miniCart = $(".show-minicart-on-hover");
			$(".floating-qd-v1-content .header-qd-v1-cart-link").mouseenter(function() {
				miniCart.not(this).mouseover();
			});
		},
		buyInShelfOpenModal: function(productId, qty){
			var modal = $(".qd-v1-modal");

			modal.addClass("shelf-qd-v1-buy-button-modal");

			// Header
			var header = modal.find(".modal-header");
			var modalContent = header.closest(".modal-content");
			modalContent.addClass("buy-in-shelf-open-modal-custom");
			header.children(":not(.close)").remove();
			header.append('<h3>Escolha a variação do produto</h3>');

			var iframe = $('<iframe src="/modal-sku?idproduto=' + productId + '&qty=' + qty + '" frameborder="0"></iframe>');
			modal.find(".modal-body").empty().append(iframe);
			modal.modal();

			iframe.load(function() {
				try{
					var $t = $(this);
					$t.height($t.contents().find("body").outerHeight(true) + 5);
				}
				catch(e){if (typeof console !== "undefined" && typeof console.error === "function") console.error(e.message); };
			});

			// Callback do Quick View
			window._QuatroDigital_prodBuyCallback = function(jqXHR, textStatus, prodLink, skus){
				modal.modal("hide");
				$(window).trigger("QuatroDigital.qd_bb_prod_add", [new $, skus[0] || 0]);
			};
		},
		amazingMenu:function(){
			$('.header-qd-v1-main-amazing-menu').QD_amazingMenu();

			// Amazing Menu Responsivo
			$(".header-qd-v1-amazing-menu-toggle").click(function(){
				$("body").toggleClass('qd-am-on');
			});

			$(".qd-am-overlay").click(function(){
				$("body").removeClass('qd-am-on');
			});

			$(".floating-qd-v1-call-amazing-menu").click(function() {
				$("body").toggleClass('qd-am-toggle');
			});

			var wrapperMobile = $(".header-qd-v1-main-amazing-menu-mobile-wrapper");

			wrapperMobile.QD_amazingMenu();

			wrapperMobile.find('> ul > li.qd-am-has-ul a[href="#"]').click(function(evt) {
				evt.preventDefault();
				$(this).parent().toggleClass('qd-am-dropdown-active');
			});

			wrapperMobile.after('<span class="btn-close-mobile"><i class="fa fa-times-circle"></i></span>');

			$(".btn-close-mobile").click(function(){
				$("body").removeClass('qd-am-on');
			});
		},
		facebookLikebox: function() {
			$(".footer-qd-v1-facebook-likebox").html('<div class="fb-page" data-href="https://www.facebook.com/lojadoveiculo/" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/">Loja do Veículo</a></blockquote></div></div>');
		},
		bannerResponsive : function(){
			$(".banner-qd-v1-responsive .box-banner a, .qd-placeholder .box-banner a").each(function(){
				var $t = $(this);
				var cols = [];

				var href = $t.attr("href") || "";
				if(!href.length)
					return;

				$t.attr( "href", href.replace(/(col-)?(xs|sm|md|lg|hidden-xs|hidden-sm|hidden-md|hidden-lg)(-([0-9]{1,2}))?,?/ig, function(match){
					var str = match.replace(",", "").toLowerCase();
					cols.push( str.substr(0,4) === "col-" ? str : str );
					return "";
				}) );

				$t.parent().addClass( cols.length ? cols.join(" ") : "col-xs-12 col-sm-12" );
			});
		},
		callCartLinkShow: function() {
			if ($(window).width() < 750){
				$(".header-qd-v1-cart-link").click(function(evt) {
					evt.preventDefault();

					$(".v2-vtexsc-cart").toggleClass('cart-show');
				});
			}
		},
		shelfColors: function() {
			$(".prateleira").QD_coresPrateleira({
				checkDuplicateUri : false,
				groupSkuByDimension : false,
			});
		},
		smartyBuyButton: function() {
			$(".header-qd-v1-cart-link").QD_buyButton({
				buyButton: ".shelf-qd-v1-buy-button .btn-add-buy-button-asynchronous"
			});
		},
		bannersCount: function() {
			$(".box-banner").parent().each(function() {
				var $t = $(this);
				$t.addClass("qdBannerCount-" + $t.find(".box-banner").length);
			});
		},
		smartCart: function() {
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
				},
				buyButton: {
					buyButton: "body .buy-button"
				}
			});

			// Callback do Quick View
			window._QuatroDigital_prodBuyCallback = function(jqXHR, textStatus, prodLink, skus){
				$.fn.simpleCart(true);
				$(".shelf-qd-v1-buy-button-modal").modal("hide");
				$(window).trigger("QuatroDigital.qd_bb_prod_add", [new $, skus[0] || 0]);
			};

			$(".header-qd-v1-cart-link").click(function(evt) {
				console.log("clique do smart cart");
				evt.preventDefault();
				$(document.body).toggleClass('qd-cart-show');

				wrapper.height($(window).height());
				wrapper.find(".qd-ddc-prodWrapper").css('max-height', $(window).height() - 193);
			});

			$(".components-qd-v1-overlay, .qd_ddc_lightBoxClose").click(function(evt){
				$(document.body).removeClass('qd-cart-show');
			});
		},
		cartAddProduct: function() {
			var modal = $('.qd-v1-modal').clone().appendTo(document.body).addClass('qd-v1-modal-add-product-cart').removeClass('qd-v1-modal');

			modal.find('.modal-body').append('<p><i class="fa fa-check-circle" aria-hidden="true"></i> Produto adicionado com sucesso!</p>');

			$(window).on("cartProductAdded.vtex", function() {
				modal.modal();

				setTimeout(function() {
					modal.modal('hide');
				}, 3000);
			});
		}
	};

	var Home = {
		init: function() {
			Home.bannerSliderDesktop();
			Home.bannerSliderMobile();
			Home.brandCarousel();
			Home.shelfCarouselHome();
			Home.organizeSideMenuCollection();
			Home.mosaicSetCol();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		bannerSliderDesktop: function() {
			$('.slider-qd-v1-full').slick({
				prevArrow: '<button type="button" class="slick-prev" title="Anterior"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next" title="Próximo"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>',
				dots: true,
				adaptiveHeight: true,
				fade: true,
				speed: 400,
				cssEase: 'linear'
			});
		},		
		bannerSliderMobile: function() {
			$('.mobile-slider-qd-v1-wrapper').slick({
				adaptiveHeight: true,
				fade: true,
				speed: 400,
				cssEase: 'linear',
				arrows: false
			});
		},
		mosaicSetCol: function() {
			$(".banner-qd-v1-responsive .box-banner").QD_mosaicBanners();
		},
		brandCarousel:function(){
			var wrapper = $('.brand-carousel-qd-v1');

			// Titulo
			wrapper.each(function(){
				var wrap = $(this);
				wrap.find("h2").addClass('heading-1').insertBefore(wrap);
			});

			wrapper.owlCarousel({
				items: 5,
				navigation: true,
				pagination: false
			});
		},
		shelfCarouselHome: function() {
			var wrapper = $('.shelf-qd-v1-carousel, .qd-category-collections');

			// Titulo
			wrapper.find('.prateleira').each(function(){
				var wrap = $(this);

				wrap.find("h2").addClass('heading-1').insertBefore(wrap);
			});

			wrapper.find('.prateleira').owlCarousel({
				items: 4,
				navigation: true,
				pagination: false
			});
		},
		organizeSideMenuCollection: function() {
			var wrapper = $(".qd-category-collections");
			var htmlItem = '<div class="col-xs-12 item"><div class="row"></div></div>';
			var htmlSideMenuWrapper = '<div class="col-xs-12 col-sm-5 col-md-3 htmlSideMenuWrapper"></div>';
			var htmlCollectionWrapper = '<div class="col-xs-12 col-sm-7 col-md-9 htmlCollectionWrapper"></div>';
			var itemSideMenuCollection = '<div class="row itemSideMenuCollection"><div></div></div>';

			wrapper.find('.box-banner:not(".qd-on")').addClass("qd-on").each(function() {
				$t = $(this);

				$t.after(htmlSideMenuWrapper);

				$('.htmlSideMenuWrapper:not(".qd-on")').addClass("qd-on").append(wrapper.find($t));

				var collectionTitle = ($t.getParent(".htmlSideMenuWrapper").find("+ .heading-1")) || "";

				if ($t.getParent(".htmlSideMenuWrapper").find("+ .heading-1 + .prateleira").length > 0)
					var collection = $t.getParent(".htmlSideMenuWrapper").find("+ .heading-1 + .prateleira");
				else
					var collection = $t.getParent(".htmlSideMenuWrapper").find("+ .prateleira");

				$t.getParent('.htmlSideMenuWrapper').after(htmlCollectionWrapper);

				$('.htmlCollectionWrapper:not(".qd-on")').addClass("qd-on").append(collectionTitle, collection);

				$t.getParent(".htmlSideMenuWrapper").find("+ .htmlCollectionWrapper").after(itemSideMenuCollection);

				$('.itemSideMenuCollection:not(".qd-on")').addClass("qd-on").find("> div").append($t.getParent(".htmlSideMenuWrapper"), $t.getParent(".htmlSideMenuWrapper").find("+ .htmlCollectionWrapper"));
			});
		},
	};

	var Departament = {
		init: function() {
			Search.sideMenuFilterAdjust();
			Search.emptySearch();
			Departament.sidemenuToggle();
			Departament.hideExtendedMenu();
			Search.shelfLineFix();
		},
		ajaxStop: function() {
			Search.shelfLineFix();
		},
		windowOnload: function() {},
		sidemenuToggle:function(){
			// Amazing Menu Responsivo
			$(".search-qd-v1-menu-toggle").click(function(){
				$("body").toggleClass('qd-sn-on');
			});

			$(".qd-am-overlay").click(function(){
				$("body").removeClass('qd-sn-on');
			});
		},
		hideExtendedMenu:function(){
			$(".search-qd-v1-navigator ul").each(function(){
				var $t = $(this);
				var li = $t.find(">li:not('.qd-removed')");
				var qtt = 7;

				if(li.length <= qtt)
					return;

				var liHide = li.filter(":gt(" + (qtt - 1) + ")").stop(true, true).hide();
				var linkShowMore=$('<a class="qd-viewMoreMenu">Mostrar mais</a>');
				$t.after(linkShowMore);
				var moreLi = $('<li class="qd-viewMoreWrapper"><a class="qd-viewMoreMenu2">Mostrar mais filtros</a></li>');
				$t.append(moreLi);

				function click(){
					liHide.stop(true, true).slideToggle(function(){
						if(li.filter(":visible").length > qtt){
							linkShowMore.addClass("minus").text("Mostrar menos filtros");
							moreLi.addClass("minus").find("a").text("Mostrar menos filtros");
						}
						else{
							linkShowMore.removeClass("minus").text("Mostrar mais filtros");
							moreLi.removeClass("minus").find("a").text("Mostrar mais filtros");
						}
					});
				};

				moreLi.bind("click.qd_viewMore", click);
				linkShowMore.bind("click.qd_viewMore", click);
			});
		}
	};

	var Search = {
		init: function () {
			Search.sideMenuFilterAdjust();
			Search.emptySearch();
			Departament.sidemenuToggle();
			Departament.hideExtendedMenu();
			Search.organizeSearchV2();
			Search.shelfLineFix();
		},
		ajaxStop: function () {
			Search.shelfLineFix();
		},
		windowOnload: function () {},
		emptySearch:function () {
			if ($('.busca-vazio').length>0) {
				$('.search-qd-v1-no-result').show();
			};

			if ($('body').is(".busca-vazia"))
				$('.search-qd-v1-no-result').show();
		},
		organizeSearchV2: function() {
			var searchQDResult = $(".search-qd-v2-result");
			var wrap = $(".search-qd-v2-result-wrap-content .search-qd-v2-result-wrap");

			// REMOVE ITENS DUPLICADOS
			searchQDResult.find('.resultItemsWrapper + .searchResultsTime, .resultItemsWrapper + .searchResultsTime + .sub').remove();

			// ADICIONAR E ORGANIZA OS ELEMENTOS
			wrap.prepend('<div class="search-qd-v2-result-content row"> <div class="search-qd-v2-result-item-1 col-xs-12 col-sm-3 col-md-3"></div> <div class="search-qd-v2-result-item-2 col-xs-12 col-sm-6 col-md-3"></div> <div class="search-qd-v2-result-item-3 col-xs-12 col-sm-3 col-md-6"></div> </div>');
			$(".search-qd-v2-result-content .search-qd-v2-result-item-1").append(searchQDResult.find(".search-qd-v2-navigator"));
			$(".search-qd-v2-result-content .search-qd-v2-result-item-2").append(searchQDResult.find(".searchResultsTime"));
			$(".search-qd-v2-result-content .search-qd-v2-result-item-3").append(searchQDResult.find(".sub"));

			wrap.find('.search-qd-v2-navigator').prepend('<div class="search-qd-v2-navigator-btn-toggle"></div>');

			// CLICK PARA EXIBIR O MENU
			wrap.find(".search-qd-v2-navigator-btn-toggle").click(function() {
				wrap.find('.search-qd-v2-navigator .navigation').toggle();
			});

			$("body").attr("data-qd-scroll-limit", "200,370");
		},
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
		},
		sideMenuFilterAdjust:function() {
			function getSearchUrl() {
				var url;
				var preg = /\/buscapagina\?.+&PageNumber=/i;

				$("script:not([src])").each(function () {
					var content = this.innerHTML;
					if (content.indexOf("buscapagina") > -1) {
						url = preg.exec(content);
						return false;
					}
				});
				return url;
			};

			var filteredAutomaker = (decodeURIComponent((getSearchUrl() || ['']).pop()).toLocaleLowerCase().match(/specificationfilter_32\:([^&]+)/i) || ['']).pop();

			$('h5.HideModelo-Versao +ul a').each(function() {
				var $t = $(this);
				var txt  = $t.text().split('-');
				var automaker = (txt.shift()).trim().toLowerCase();
				$t.text(txt.join('-'));

				if(automaker != filteredAutomaker)
					$t.closest('li').hide().addClass('qd-removed');
			});
		}
	};

	var Product = {
		run: function() {},
		init: function () {
			Product.zoomFix();
			Product.shelfCarouselProduct();
			Product.openShipping();
			Product.seeDescription();
			Product.skuListSelection();
			Product.qdNotifymeShow();
		},
		ajaxStop: function () {
			Product.addCloseBtnFreightTable();
		},
		windowOnload: function () {},
		qdNotifymeShow: function() {
			var notifyWrapper = $(".portal-notify-me-ref");

			var checkVisibleNotify = function(data) {
				if (data.availability || data.available){
					notifyWrapper.parent().parent().removeClass('col-xs-12').attr('class', "col-xs-12 col-lg-6");
					$(document.body).removeClass('notify-active');
				}
				else {
					notifyWrapper.parent().parent().attr('class', "").addClass('col-xs-12');
					$(document.body).addClass('notify-active');
				}
			}

			$(document).on("skuSelected.vtex", function(e, sku) {
				checkVisibleNotify(sku);
			});

			checkVisibleNotify(skuJson);
		},
		zoomFix: function(){
			var overlay = $("<div class='qdZoomInvisibleOverlay' />");
			$("#image").prepend(overlay).on("mouseout", ".zoomPad", function(){ overlay.hide(); }).on("mouseover", ".zoomPad", function(){ overlay.show(); });
		},
		shelfCarouselProduct: function() {
			var wrapper = $('.qd-collections-wrap ');

			// Titulo
			wrapper.find('.prateleira').each(function(){
				var wrap = $(this);

				wrap.find("h2").addClass('heading-2').insertBefore(wrap);
			});


			wrapper.find('.prateleira').owlCarousel({
				items: 4,
				navigation: true,
				pagination: false
			});
		},
		openShipping: function() {
			ShippingValue();
		},
		hideUniqueSkuOption : function(){
			$(".sku-selector-container [class*='group_']").each(function(){
				var $t = $(this);
				var input =  $t.find("input");

				if(input.length !== 1)
					return;

				input.attr("checked", true).change();
				$t.getParent("ul").hide();
			});
		},
		addCloseBtnFreightTable: function() {
			var elem = $(".freight-values");

			if (!$("#calculoFrete").length) $(".product-shipping").hide();
			else $(".product-shipping").show();

			if (elem.length > 0 && elem.is(":visible"))
				$("<span class='close'/>").bind("click", function() {
					elem.fadeToggle("fast","linear");
				}).appendTo(elem);
		},
		seeDescription: function() {
			$(".product-qd-v1-link-description").click(function(e){
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $(".product-qd-v1-description").offset().top - 100
				}, 900, 'swing');
			});
		},
		skuUrlHash: function() {
			var sku = $.bbq.getState("sku");
			if(sku && !$(".skuList.qd-sku-list-selected-by-click").length){
				var skuList = $("a.buy-button[href*='sku=" + sku + "'], input.sku-notifyme-skuid[value='" + sku + "']").first().getParent(".skuList");
				var src = (skuList.find(".imageSku img:first").attr("src") || "").match(/ids\/[0-9]+/i);
				if(typeof src === "object" && typeof src[0] === "string" && !$(".image-zoom [src*='" + src[0] + "']").length)
					skuList.trigger("selectSku.qd_click");
				else if(!$(".skuList.qd-sku-list-selected").length)
					skuList.trigger("selectSku.qd_click");
			}
		},
		skuListSelection:function(){
			if (!$(".product-qd-v1-sku-selection .imageSku").length > 0)
				return;

			$(document.body).addClass('sku-in-list');

			var wrapper = $(".product-qd-v1-sku-selection");

			wrapper.find(".skuList").each(function(){
				$(this).addClass("product-qd-v1-sku-in-list");

				if ($(window).width() >= 500){
					$(this).addClass('no-xs');
				}
			});

			wrapper.find(".buy-button").each(function(){
				$(this).wrap('<div class="qd-v1-buy-button-content"></div>');
			});

			wrapper.find(".portal-notify-me-ref").each(function() {
				var $t = $(this);

				$t.find(".notifyme").addClass("qd-notifyme-hide");
				$t.getParent(".skuList").addClass("qd-sku-unavaliable");

				var btn = $('<div class="notifyme-btn-wrap"><button class="btn btn-xs notifyme-btn">Avise-me</button></div>');
				btn.find("button").click(function() {
					btn.siblings(".notifyme").removeClass("qd-notifyme-hide");
					btn.addClass("qd-notifyme-hide");
				});
				$(this).prepend(btn);
			});

			wrapper.find(".qd-v1-buy-button-content").prepend('<div class="qd-v1-smart-qtt"> <input type="tel" class="qd-sq-quantity" /> <div class="btns-wrapper"> <span class="qd-sq-more"></span> <span class="qd-sq-minus"></span> </div> </div>');
		},
		smartQuantity: function() {
			$(".product-qd-v1-sku-selection-box").QD_smartQuantity();
		},
		smartyBuyButton: function() {
			$(".header-qd-v1-cart-link").QD_buyButton({
				buyButton: ".product-qd-v1-sku-selection-box .buy-button"
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
		init: function() {
			Institutional.sidemenuToggle();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		sidemenuToggle:function(){
			// Amazing Menu Responsivo
			$(".institucional-qd-v1-menu-toggle").click(function(){
				$("body").toggleClass('qd-sn-on');
			});

			$(".qd-am-overlay").click(function(){
				$("body").removeClass('qd-sn-on');
			});
		},
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
			body = $(document.body);
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
		if (location.pathname.substr(location.pathname.length - 2, 2).toLowerCase() == "/p")
			Product.run();
		else if (location.pathname.search(/^(\/giftlist|\/list\/)/) == 0)
			List.run();
	})();
}
catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && $("body").addClass('jsFullLoaded jsFullLoadedError') && console.error("Houve um erro ao iniciar os objetos. Detalhes: " + e.message)); }

/* Quatro Digital Newsletter // 5.0 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os Direitos Reservados */
(function(){var f=jQuery;if("function"!==typeof f.fn.QD_news){var t={defaultName:"Digite seu nome...",defaultEmail:"Digite seu e-mail...",nameField:".qd_news_name",checkNameFieldIsVisible:!0,emailField:".qd_news_email",btn:".qd_news_button",elementError:".nv2_messageError",elementSuccess:".nv2_messageSuccess",validationMethod:"popup",getAttr:"alt",setDefaultName:!0,checkNameExist:!0,validateName:!0,showInPopup:!0,animation:"blink",animateSpeed:100,animateDistance:15,animateRepeat:3,animateFieldSuccess:".qd_news_animate_field_success",
timeHideSuccessMsg:3E3,platform:"VTEX",allowSubmit:function(){return!0},successCallback:function(){},submitCallback:function(f,l){}};f.fn.QD_news=function(r){var l=function(a,d){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var g;"object"===typeof a?(a.unshift("[QD News]\n"),g=a):g=["[QD News]\n"+a];if("undefined"===typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===
d.toLowerCase())try{console.info.apply(console,g)}catch(b){console.info(g.join("\n"))}else try{console.error.apply(console,g)}catch(f){console.error(g.join("\n"))}else try{console.warn.apply(console,g)}catch(e){console.warn(g.join("\n"))}}},h=f(this);if(!h.length)return h;var a=f.extend({},t,r);a.showInPopup||(a.validationMethod="div");null!==a.animation?a.validationMethod="animateField":"animateField"==a.validationMethod&&(a.animation="leftRight");if("popup"==a.validationMethod&&"function"!==typeof f.fn.vtexPopUp2)return l("O popUp2 n\u00e3o foi encontrado. Adicione o Plugin de PopUp2."),
h;var q=function(f){var d,g,b;g=0;d=function(){f.animate({left:"-="+a.animateDistance},a.animateSpeed,function(){f.animate({left:"+="+a.animateDistance},a.animateSpeed,function(){g<a.animateRepeat&&d();g++})})};b=function(){f.fadeTo(a.animateSpeed,.2,function(){f.fadeTo(a.animateSpeed,1,function(){g<a.animateRepeat&&b();g++})})};f.stop(!0,!0);"leftRight"==a.animation?d():"blink"==a.animation&&b()};h.each(function(){var h,d,g,b=f(this),k=b.find(a.nameField),e=b.find(a.emailField),m=b.find(a.btn);"animateField"!=
a.validationMethod&&(d=b.find(a.elementError),g=b.find(a.elementSuccess));1>k.length&&a.checkNameExist&&l("Campo de nome, n\u00e3o encontrado ("+k.selector+"). Ser\u00e1 atribuido um valor padr\u00e3o.","info");if(1>e.length)return l("Campo de e-mail, n\u00e3o encontrado ("+e.selector+")"),b;if(1>m.length)return l("Bot\u00e3o de envio, n\u00e3o encontrado ("+m.selector+")"),b;if("animateField"!=a.validationMethod&&(1>g.length||1>d.length))return l("A(s) mensagem(ns) de erro e/ou sucesso esta(m) faltando \n ("+
g.selector+", "+d.selector+")"),b;a.setDefaultName&&k.is("input[type=text], textarea")&&k.val(a.defaultName);e.val(a.defaultEmail);(function(){if(a.checkNameExist){if(a.checkNameFieldIsVisible){var c=k.filter(":visible");if(!c.length)return}else c=k;var b=c.val();c.is("input:text, textarea")&&c.bind({focus:function(){c.val()!=b||0!==c.val().search(a.defaultName.substr(0,6))&&!a.setDefaultName||c.val("")},blur:function(){""===c.val()&&c.val(b)}})}})();(function(){var c;c=e.val();e.bind({focus:function(){e.val()==
c&&0===e.val().search(a.defaultEmail.substr(0,6))&&e.val("")},blur:function(){""===e.val()&&e.val(c)}})})();h=function(){var c,e,h,k;e=(c=b.find(a.nameField).filter("input[type=text],select,textarea").val())?c:b.find(a.nameField).filter("input[type=radio], input[type=checkbox]").length?b.find(a.nameField).filter("input[type=radio]:checked, input[type=checkbox]:checked").val()||"":(c=b.find(a.nameField).attr(a.getAttr))?c:(c=b.find(a.nameField).text())?c:(c=b.find(a.nameField).find(".box-banner img:first").attr("alt"))?
c:"Nome_Padrao";c=(b.find(a.emailField).val()||"").trim();h=b.find(a.nameField).is(":visible");h=a.validateName?(1>e.length||0===e.search(a.defaultName.substr(0,6)))&&(a.checkNameExist||h?h:!0):!1;k=0>c.search(/^[a-z0-9\_\-\.\+]+@[a-z0-9\_\-]+(\.[a-z0-9\_\-]{2,})+$/i);if(h||k)"animateField"==a.validationMethod?(h&&q(b.find(a.nameField)),k&&q(b.find(a.emailField))):"popup"==a.validationMethod?d.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterError"}):(d.slideDown().bind("click",function(){f(this).slideUp()}),
setTimeout(function(){d.slideUp()},1800));else if(a.allowSubmit()){m.attr("disabled","disabled");var n={postData:{newsletterClientEmail:c,newsletterClientName:a.defaultName==e?"-":e,newsInternalCampaign:"newsletter:opt-in",newsInternalPage:(document.location.pathname||"/").replace(/\//g,"_"),newsInternalPart:"newsletter"},button:m,wrapper:b};"linx"===a.platform&&(n.postData.nome=n.postData.newsletterClientName,n.postData.email=n.postData.newsletterClientEmail);f.ajax({url:"linx"===a.platform?"/newsletter.aspx":
"/no-cache/Newsletter.aspx",type:"linx"===a.platform?"GET":"POST",data:n.postData,success:function(c){var e,h,d;m.removeAttr("disabled");if("linx"===a.platform&&!(-1<c.indexOf(" com sucesso.")||-1<c.indexOf(" cadastrado.")))return alert(c);"popup"==a.validationMethod?g.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterSuccess"}):"animateField"!=a.validationMethod&&g.slideDown().bind("click",function(){f(this).slideUp()});d=b.find(a.emailField);a.setDefaultName&&b.find(a.nameField).is("input:text, textarea")&&
b.find(a.nameField).val(a.defaultName);e=function(){d.val(a.defaultEmail)};"animateField"==a.validationMethod?(d.val(b.find(a.animateFieldSuccess).val()||"Obrigado!!!"),d.addClass("vtexNewsSuccess"),h=setTimeout(function(){d.removeClass("vtexNewsSuccess");e();d.unbind("focus.vtexNews")},a.timeHideSuccessMsg),d.bind("focus.vtexNews",function(){d.removeClass("vtexNewsSuccess");clearTimeout(h);f(this).val("");f(this).unbind("focus.vtexNews")})):e();a.successCallback(n);f(window).trigger("qdNewsSuccessCallback",
n)}});a.submitCallback(c,e)}else l("Os dados n\u00e3o foram enviados pois o parametro 'allowSubmit' n\u00e3o retornou 'true'","info")};var p=function(a){13==(a.keyCode?a.keyCode:a.which)&&(a.preventDefault(),h())};k.filter("input:text, textarea").bind("keydown",p);e.bind("keydown",p);p=m.getParent("form");p.length?p.submit(function(a){a.preventDefault();h()}):m.bind("click.qd_news",function(){h()})});return h};f(function(){f(".qd_news_auto").QD_news()})}})();
/* Quatro Digital - jQuery Ajax Queue // 4.0 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT <http://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT> */
(function(d){if("function"!==typeof d.qdAjax){var a={};d.qdAjaxQueue=a;150>parseInt((d.fn.jquery.replace(/[^0-9]+/g,"")+"000").slice(0,3),10)&&console&&"function"==typeof console.error&&console.error();d.qdAjax=function(f){try{var b=d.extend({},{url:"",type:"GET",data:"",success:function(){},error:function(){},complete:function(){},clearQueueDelay:5},f),e;e="object"===typeof b.data?JSON.stringify(b.data):b.data.toString();var c=encodeURIComponent(b.url+"|"+b.type+"|"+e);a[c]=a[c]||{};"undefined"==
typeof a[c].jqXHR?a[c].jqXHR=d.ajax(b):(a[c].jqXHR.done(b.success),a[c].jqXHR.fail(b.error),a[c].jqXHR.always(b.complete));a[c].jqXHR.always(function(){isNaN(parseInt(b.clearQueueDelay))||setTimeout(function(){a[c].jqXHR=void 0},b.clearQueueDelay)});return a[c].jqXHR}catch(g){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Problemas no $.qdAjax :( . Detalhes: "+g.message)}};d.qdAjax.version="4.0"}})(jQuery);
//* Quatro Digital - VTEX Checkout Queue // 1.1 //  Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
(function(){var l=function(a,c){if("object"===typeof console){var d="object"===typeof a;"undefined"!==typeof c&&"alerta"===c.toLowerCase()?d?console.warn("[QD VTEX Checkout Queue]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.warn("[QD VTEX Checkout Queue]\n"+a):"undefined"!==typeof c&&"info"===c.toLowerCase()?d?console.info("[QD VTEX Checkout Queue]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.info("[QD VTEX Checkout Queue]\n"+a):d?console.error("[QD VTEX Checkout Queue]\n",a[0],a[1],
a[2],a[3],a[4],a[5],a[6],a[7]):console.error("[QD VTEX Checkout Queue]\n"+a)}},f=null,g={},h={},e={};$.QD_checkoutQueue=function(a,c){if(null===f)if("object"===typeof window.vtexjs&&"undefined"!==typeof window.vtexjs.checkout)f=window.vtexjs.checkout;else return l("N\u00e3o foi encontrada a biblioteca VTEX.js. Este componente para por aqui, a for\u00e7a n\u00e3o esta mais contigo neste jornada! Para resolver isto inclua a biblioteca VTEX.js");var d=$.extend({done:function(){},fail:function(){}},c),
b=a.join(";"),k=function(){g[b].add(d.done);h[b].add(d.fail)};e[b]?k():(g[b]=$.Callbacks(),h[b]=$.Callbacks(),k(),e[b]=!0,f.getOrderForm(a).done(function(a){e[b]=!1;g[b].fire(a)}).fail(function(a){e[b]=!1;h[b].fire(a)}))}})();
/* Quatro Digital - Scroll Toggle // 1.4 // Carlos Vinicius // Todos os direitos reservados */
(function(){var c=jQuery,e=function(a,d){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var b;"object"===typeof a?(a.unshift("[QD Scroll Toggle]\n"),b=a):b=["[QD Scroll Toggle]\n"+a];if("undefined"===typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===d.toLowerCase())try{console.info.apply(console,b)}catch(c){try{console.info(b.join("\n"))}catch(e){}}else try{console.error.apply(console,
b)}catch(h){try{console.error(b.join("\n"))}catch(k){}}else try{console.warn.apply(console,b)}catch(l){try{console.warn(b.join("\n"))}catch(m){}}}};"function"!==typeof c.QD_scrollToggle&&(c.QD_scrollToggle=function(a){var d=[];if("string"!==typeof a&&"number"!==typeof a||"auto"===a)if("auto"===a)d.push(c(window).height());else return e("N\u00e3o foi informado o limite de scroll necess\u00e1rio para adicionar o atributo.");else{var b=a.split(","),f;for(f in b)"function"!==typeof b[f]&&(a=parseInt(b[f].trim()),
isNaN(a)||d.push(a))}if(!d.length)return e("Aaeeeeeeee irm\u00e3o! N\u00e3o consegui encontrar nenhum valor para calcular o scroll");if(!document||!document.body||"undefined"===typeof document.body.setAttribute)return e('"document.body.setAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!document||!document.body||"undefined"===typeof document.body.removeAttribute)return e('"document.body.removeAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!document||!document.body||"undefined"===
typeof document.body.getAttribute)return e('"document.body.getAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!c(window).scrollTop||isNaN(parseInt(c(window).scrollTop())))return e('"$(window).scrollTop" n\u00e3o esta retornando um n\u00famero inteiro :(');try{document.body.setAttribute("data-qd-scroll",1),document.body.getAttribute("data-qd-scroll"),document.body.removeAttribute("data-qd-scroll"),document.body.getAttribute("data-qd-scroll")}catch(g){e("N\u00e3o foi poss\u00edvel fazer o passo a passo de consultar, adicionar e remover um atributo",
g.message)}c(window).scroll(function(){for(var a=0;a<d.length;a++)c(window).scrollTop()>d[a]?document.body.getAttribute("data-qd-scroll-"+a)||document.body.setAttribute("data-qd-scroll-"+a,1):document.body.getAttribute("data-qd-scroll-"+a)&&document.body.removeAttribute("data-qd-scroll-"+a)})},c(function(){var a=c("body[data-qd-scroll-limit]");a.length&&c.QD_scrollToggle(a.attr("data-qd-scroll-limit"))}))})();
/* * Javascript Cookie v1.5.1 * https://github.com/js-cookie/js-cookie * * Copyright 2006, 2014 Klaus Hartl * Released under the MIT license */
(function(e){var l;if("function"===typeof define&&define.amd)define(["jquery"],e);else if("object"===typeof exports){try{l=require("jquery")}catch(n){}module.exports=e(l)}else{var m=window.Cookies,h=window.Cookies=e(window.jQuery);h.noConflict=function(){window.Cookies=m;return h}}})(function(e){function l(a){a=c.json?JSON.stringify(a):String(a);return c.raw?a:encodeURIComponent(a)}function n(a,r){var b;if(c.raw)b=a;else a:{var d=a;0===d.indexOf('"')&&(d=d.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g, "\\"));try{d=decodeURIComponent(d.replace(p," "));b=c.json?JSON.parse(d):d;break a}catch(e){}b=void 0}return h(r)?r(b):b}function m(){for(var a,c,b=0,d={};b<arguments.length;b++)for(a in c=arguments[b],c)d[a]=c[a];return d}function h(a){return"[object Function]"===Object.prototype.toString.call(a)}var p=/\+/g,c=function(a,e,b){if(1<arguments.length&&!h(e)){b=m(c.defaults,b);if("number"===typeof b.expires){var d=b.expires,k=b.expires=new Date;k.setMilliseconds(k.getMilliseconds()+864E5*d)}return document.cookie= [c.raw?a:encodeURIComponent(a),"=",l(e),b.expires?"; expires="+b.expires.toUTCString():"",b.path?"; path="+b.path:"",b.domain?"; domain="+b.domain:"",b.secure?"; secure":""].join("")}for(var d=a?void 0:{},k=document.cookie?document.cookie.split("; "):[],q=0,p=k.length;q<p;q++){var f=k[q].split("="),g;g=f.shift();g=c.raw?g:decodeURIComponent(g);f=f.join("=");if(a===g){d=n(f,e);break}a||void 0===(f=n(f))||(d[g]=f)}return d};c.get=c.set=c;c.defaults={};c.remove=function(a,e){c(a,"",m(e,{expires:-1})); return!c(a)};e&&(e.cookie=c,e.removeCookie=c.remove);return c});
var $Cookies = Cookies.noConflict();
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
/* Quatro Digital - Product Thumbs // 1.0 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs()}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return $.extend({},a,new b(a))},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();
/* * jQuery BBQ: Back Button & Query Library - v1.2.1 - 2/17/2010 * http://benalman.com/projects/jquery-bbq-plugin/ * * Copyright (c) 2010 "Cowboy" Ben Alman * Dual licensed under the MIT and GPL licenses. * http://benalman.com/about/license/ */
(function($,p){var i,m=Array.prototype.slice,r=decodeURIComponent,a=$.param,c,l,v,b=$.bbq=$.bbq||{},q,u,j,e=$.event.special,d="hashchange",A="querystring",D="fragment",y="elemUrlAttr",g="location",k="href",t="src",x=/^.*\?|#.*$/g,w=/^.*\#/,h,C={};function E(F){return typeof F==="string"}function B(G){var F=m.call(arguments,1);return function(){return G.apply(this,F.concat(m.call(arguments)))}}function n(F){return F.replace(/^[^#]*#?(.*)$/,"$1")}function o(F){return F.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/,"$1")}function f(H,M,F,I,G){var O,L,K,N,J;if(I!==i){K=F.match(H?/^([^#]*)\#?(.*)$/:/^([^#?]*)\??([^#]*)(#?.*)/);J=K[3]||"";if(G===2&&E(I)){L=I.replace(H?w:x,"")}else{N=l(K[2]);I=E(I)?l[H?D:A](I):I;L=G===2?I:G===1?$.extend({},I,N):$.extend({},N,I);L=a(L);if(H){L=L.replace(h,r)}}O=K[1]+(H?"#":L||!K[1]?"?":"")+L+J}else{O=M(F!==i?F:p[g][k])}return O}a[A]=B(f,0,o);a[D]=c=B(f,1,n);c.noEscape=function(G){G=G||"";var F=$.map(G.split(""),encodeURIComponent);h=new RegExp(F.join("|"),"g")};c.noEscape(",/");$.deparam=l=function(I,F){var H={},G={"true":!0,"false":!1,"null":null};$.each(I.replace(/\+/g," ").split("&"),function(L,Q){var K=Q.split("="),P=r(K[0]),J,O=H,M=0,R=P.split("]["),N=R.length-1;if(/\[/.test(R[0])&&/\]$/.test(R[N])){R[N]=R[N].replace(/\]$/,"");R=R.shift().split("[").concat(R);N=R.length-1}else{N=0}if(K.length===2){J=r(K[1]);if(F){J=J&&!isNaN(J)?+J:J==="undefined"?i:G[J]!==i?G[J]:J}if(N){for(;M<=N;M++){P=R[M]===""?O.length:R[M];O=O[P]=M<N?O[P]||(R[M+1]&&isNaN(R[M+1])?{}:[]):J}}else{if($.isArray(H[P])){H[P].push(J)}else{if(H[P]!==i){H[P]=[H[P],J]}else{H[P]=J}}}}else{if(P){H[P]=F?i:""}}});return H};function z(H,F,G){if(F===i||typeof F==="boolean"){G=F;F=a[H?D:A]()}else{F=E(F)?F.replace(H?w:x,""):F}return l(F,G)}l[A]=B(z,0);l[D]=v=B(z,1);$[y]||($[y]=function(F){return $.extend(C,F)})({a:k,base:k,iframe:t,img:t,input:t,form:"action",link:k,script:t});j=$[y];function s(I,G,H,F){if(!E(H)&&typeof H!=="object"){F=H;H=G;G=i}return this.each(function(){var L=$(this),J=G||j()[(this.nodeName||"").toLowerCase()]||"",K=J&&L.attr(J)||"";L.attr(J,a[I](K,H,F))})}$.fn[A]=B(s,A);$.fn[D]=B(s,D);b.pushState=q=function(I,F){if(E(I)&&/^#/.test(I)&&F===i){F=2}var H=I!==i,G=c(p[g][k],H?I:{},H?F:2);p[g][k]=G+(/#/.test(G)?"":"#")};b.getState=u=function(F,G){return F===i||typeof F==="boolean"?v(F):v(G)[F]};b.removeState=function(F){var G={};if(F!==i){G=u();$.each($.isArray(F)?F:arguments,function(I,H){delete G[H]})}q(G,2)};e[d]=$.extend(e[d],{add:function(F){var H;function G(J){var I=J[D]=c();J.getState=function(K,L){return K===i||typeof K==="boolean"?l(I,K):l(I,L)[K]};H.apply(this,arguments)}if($.isFunction(F)){H=F;return G}else{H=F.handler;F.handler=G}}})})(jQuery,this);
/* jQuery Cookie Plugin v1.4.1 // https://github.com/carhartl/jquery-cookie // Copyright 2013 Klaus Hartl // Released under the MIT license */
(function(c){"function"===typeof define&&define.amd?define(["jquery"],c):"object"===typeof exports?c(require("jquery")):c(jQuery)})(function(c){function n(b){b=f.json?JSON.stringify(b):String(b);return f.raw?b:encodeURIComponent(b)}function m(b,e){var a;if(f.raw)a=b;else a:{var d=b;0===d.indexOf('"')&&(d=d.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{d=decodeURIComponent(d.replace(l," "));a=f.json?JSON.parse(d):d;break a}catch(g){}a=void 0}return c.isFunction(e)?e(a):a}var l=/\+/g,f=
c.cookie=function(b,e,a){if(void 0!==e&&!c.isFunction(e)){a=c.extend({},f.defaults,a);if("number"===typeof a.expires){var d=a.expires,g=a.expires=new Date;g.setTime(+g+864E5*d)}return document.cookie=[f.raw?b:encodeURIComponent(b),"=",n(e),a.expires?"; expires="+a.expires.toUTCString():"",a.path?"; path="+a.path:"",a.domain?"; domain="+a.domain:"",a.secure?"; secure":""].join("")}a=b?void 0:{};for(var d=document.cookie?document.cookie.split("; "):[],g=0,l=d.length;g<l;g++){var h=d[g].split("="),k;
k=h.shift();k=f.raw?k:decodeURIComponent(k);h=h.join("=");if(b&&b===k){a=m(h,e);break}b||void 0===(h=m(h))||(a[k]=h)}return a};f.defaults={};c.removeCookie=function(b,e){if(void 0===c.cookie(b))return!1;c.cookie(b,"",c.extend({},e,{expires:-1}));return!c.cookie(b)}});
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
/* Quatro Digital - sessionStorage // 1.0 // Carlos Vinicius // Todos os direitos reservados */
(function(){var e=function(b,c){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var a;"object"===typeof b?(b.unshift("[Quatro Digital - sessionStorage]\n"),a=b):a=["[Quatro Digital - sessionStorage]\n"+b];if("undefined"===typeof c||"alerta"!==c.toLowerCase()&&"aviso"!==c.toLowerCase())if("undefined"!==typeof c&&"info"===c.toLowerCase())try{console.info.apply(console,a)}catch(d){console.info(a.join("\n"))}else try{console.error.apply(console,
a)}catch(e){console.error(a.join("\n"))}else try{console.warn.apply(console,a)}catch(f){console.warn(a.join("\n"))}}};window.qdSessionStorage=window.qdSessionStorage||{};var f="undefined"!==typeof sessionStorage&&"undefined"!==typeof sessionStorage.setItem&&"undefined"!==typeof sessionStorage.getItem;window.qdSessionStorage.setItem=function(b,c,a){try{if(!f)return!1;var d=new Date;sessionStorage.setItem(b,c);isNaN(parseInt(a))||(d.setTime(d.getTime()+6E4*a),sessionStorage.setItem(b+"_expiration",
d.getTime()))}catch(g){e(["Aeeee irm\u00e3o! Algo saiu errado ao tentar salvar os dados no armazenamento da sess\u00e3o. Detalhes: ",g.message],"alerta")}};window.qdSessionStorage.getItem=function(b){try{if(!f)return!1;var c=new Date,a=parseInt(sessionStorage.getItem(b+"_expiration")||0,10)||0;return c.getTime()>a?(sessionStorage.removeItem&&(sessionStorage.removeItem(b),sessionStorage.removeItem(b+"_expiration")),null):sessionStorage.getItem(b)}catch(d){e(["Aeeee irm\u00e3o! Algo saiu errado ao tentar obter os dados no armazenamento da sess\u00e3o. Detalhes: ",
d.message],"alerta")}}})();
/*http://phpjs.org/functions/utf8_encode/*/
function utf8_encode(b){if(null===b||"undefined"===typeof b)return"";b+="";var d="",f,g,h=0;f=g=0;for(var h=b.length,e=0;e<h;e++){var a=b.charCodeAt(e),c=null;if(128>a)g++;else if(127<a&&2048>a)c=String.fromCharCode(a>>6|192,a&63|128);else if(55296!=(a&63488))c=String.fromCharCode(a>>12|224,a>>6&63|128,a&63|128);else{if(55296!=(a&64512))throw new RangeError("Unmatched trail surrogate at "+e);c=b.charCodeAt(++e);if(56320!=(c&64512))throw new RangeError("Unmatched lead surrogate at "+(e-1));a=((a&1023)<<
10)+(c&1023)+65536;c=String.fromCharCode(a>>18|240,a>>12&63|128,a>>6&63|128,a&63|128)}null!==c&&(g>f&&(d+=b.slice(f,g)),d+=c,f=g=e+1)}g>f&&(d+=b.slice(f,h));return d};
/*http://phpjs.org/functions/md5/*/
if("function"!==typeof qd_md5)var qd_md5=function(p){var h=function(b,a){var d,c,f,e,g;f=b&2147483648;e=a&2147483648;d=b&1073741824;c=a&1073741824;g=(b&1073741823)+(a&1073741823);return d&c?g^2147483648^f^e:d|c?g&1073741824?g^3221225472^f^e:g^1073741824^f^e:g^f^e},k=function(b,a,d,c,f,e,g){b=h(b,h(h(a&d|~a&c,f),g));return h(b<<e|b>>>32-e,a)},l=function(b,a,d,c,f,e,g){b=h(b,h(h(a&c|d&~c,f),g));return h(b<<e|b>>>32-e,a)},m=function(b,a,c,d,e,f,g){b=h(b,h(h(a^c^d,e),g));return h(b<<f|b>>>32-f,a)},n=
function(b,a,c,d,f,e,g){b=h(b,h(h(c^(a|~d),f),g));return h(b<<e|b>>>32-e,a)},q=function(b){var a="",c="",d;for(d=0;3>=d;d++)c=b>>>8*d&255,c="0"+c.toString(16),a+=c.substr(c.length-2,2);return a},e=[],f,r,t,u,v,b,a,d,c;p=this.utf8_encode(p);e=function(b){var a,c=b.length;a=c+8;for(var d=16*((a-a%64)/64+1),e=Array(d-1),f=0,g=0;g<c;)a=(g-g%4)/4,f=g%4*8,e[a]|=b.charCodeAt(g)<<f,g++;a=(g-g%4)/4;e[a]|=128<<g%4*8;e[d-2]=c<<3;e[d-1]=c>>>29;return e}(p);b=1732584193;a=4023233417;d=2562383102;c=271733878;p=
e.length;for(f=0;f<p;f+=16)r=b,t=a,u=d,v=c,b=k(b,a,d,c,e[f+0],7,3614090360),c=k(c,b,a,d,e[f+1],12,3905402710),d=k(d,c,b,a,e[f+2],17,606105819),a=k(a,d,c,b,e[f+3],22,3250441966),b=k(b,a,d,c,e[f+4],7,4118548399),c=k(c,b,a,d,e[f+5],12,1200080426),d=k(d,c,b,a,e[f+6],17,2821735955),a=k(a,d,c,b,e[f+7],22,4249261313),b=k(b,a,d,c,e[f+8],7,1770035416),c=k(c,b,a,d,e[f+9],12,2336552879),d=k(d,c,b,a,e[f+10],17,4294925233),a=k(a,d,c,b,e[f+11],22,2304563134),b=k(b,a,d,c,e[f+12],7,1804603682),c=k(c,b,a,d,e[f+13],
12,4254626195),d=k(d,c,b,a,e[f+14],17,2792965006),a=k(a,d,c,b,e[f+15],22,1236535329),b=l(b,a,d,c,e[f+1],5,4129170786),c=l(c,b,a,d,e[f+6],9,3225465664),d=l(d,c,b,a,e[f+11],14,643717713),a=l(a,d,c,b,e[f+0],20,3921069994),b=l(b,a,d,c,e[f+5],5,3593408605),c=l(c,b,a,d,e[f+10],9,38016083),d=l(d,c,b,a,e[f+15],14,3634488961),a=l(a,d,c,b,e[f+4],20,3889429448),b=l(b,a,d,c,e[f+9],5,568446438),c=l(c,b,a,d,e[f+14],9,3275163606),d=l(d,c,b,a,e[f+3],14,4107603335),a=l(a,d,c,b,e[f+8],20,1163531501),b=l(b,a,d,c,e[f+
13],5,2850285829),c=l(c,b,a,d,e[f+2],9,4243563512),d=l(d,c,b,a,e[f+7],14,1735328473),a=l(a,d,c,b,e[f+12],20,2368359562),b=m(b,a,d,c,e[f+5],4,4294588738),c=m(c,b,a,d,e[f+8],11,2272392833),d=m(d,c,b,a,e[f+11],16,1839030562),a=m(a,d,c,b,e[f+14],23,4259657740),b=m(b,a,d,c,e[f+1],4,2763975236),c=m(c,b,a,d,e[f+4],11,1272893353),d=m(d,c,b,a,e[f+7],16,4139469664),a=m(a,d,c,b,e[f+10],23,3200236656),b=m(b,a,d,c,e[f+13],4,681279174),c=m(c,b,a,d,e[f+0],11,3936430074),d=m(d,c,b,a,e[f+3],16,3572445317),a=m(a,d,
c,b,e[f+6],23,76029189),b=m(b,a,d,c,e[f+9],4,3654602809),c=m(c,b,a,d,e[f+12],11,3873151461),d=m(d,c,b,a,e[f+15],16,530742520),a=m(a,d,c,b,e[f+2],23,3299628645),b=n(b,a,d,c,e[f+0],6,4096336452),c=n(c,b,a,d,e[f+7],10,1126891415),d=n(d,c,b,a,e[f+14],15,2878612391),a=n(a,d,c,b,e[f+5],21,4237533241),b=n(b,a,d,c,e[f+12],6,1700485571),c=n(c,b,a,d,e[f+3],10,2399980690),d=n(d,c,b,a,e[f+10],15,4293915773),a=n(a,d,c,b,e[f+1],21,2240044497),b=n(b,a,d,c,e[f+8],6,1873313359),c=n(c,b,a,d,e[f+15],10,4264355552),
d=n(d,c,b,a,e[f+6],15,2734768916),a=n(a,d,c,b,e[f+13],21,1309151649),b=n(b,a,d,c,e[f+4],6,4149444226),c=n(c,b,a,d,e[f+11],10,3174756917),d=n(d,c,b,a,e[f+2],15,718787259),a=n(a,d,c,b,e[f+9],21,3951481745),b=h(b,r),a=h(a,t),d=h(d,u),c=h(c,v);return(q(b)+q(a)+q(d)+q(c)).toLowerCase()};
/* Automatizador de comments box do Facebook // 1.4 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a=$(".fb-comments");a.length&&a.attr("data-href",document.location.href.split("#").shift().split("?").shift());$("#fb-root").length||$("body").append('<div id="fb-root"></div>');if($("script[src*='connect.facebook.net/pt_BR/sdk.js']").filter("[src*='sdk.js']").length)"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse();else{a=$("meta[property='fb:app_id']").attr("content")||!1;var b,c=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||
(b=document.createElement("script"),b.id="facebook-jssdk",b.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+(a?"&appId="+a:""),c.parentNode.insertBefore(b,c))}});
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

// amazing menu
var _0xf295=['UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','children',':not(ul)','qd-am-elem-','>li','qd-amazing-menu','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','qd-am-','QuatroDigital.am.callback','extend','.qd_amazing_menu_auto','getParent','closest','QD_amazingMenu','function','/qd-amazing-menu','object','undefined','error','info','warn','alerta','toLowerCase','aviso','apply','join','qdAmAddNdx','each','addClass','qd-am-li-','first','qd-am-first','last','bwnqbirvphyb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','charCodeAt','ite','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','.qd-am-banner','filter','.qd-am-collection','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','url','html','find','attr','data-qdam-value','.box-banner','insertBefore','hide','qd-am-content-loaded','text','trim','[class*=\x27colunas\x27]','clone','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','ul[itemscope]'];(function(_0x504a1d,_0x5b9aec){var _0x34ec0f=function(_0x1b751b){while(--_0x1b751b){_0x504a1d['push'](_0x504a1d['shift']());}};_0x34ec0f(++_0x5b9aec);}(_0xf295,0xec));var _0x5f29=function(_0x271a95,_0x4d2a07){_0x271a95=_0x271a95-0x0;var _0x3fa489=_0xf295[_0x271a95];return _0x3fa489;};(function(_0x143ad8){_0x143ad8['fn'][_0x5f29('0x0')]=_0x143ad8['fn'][_0x5f29('0x1')];}(jQuery));(function(_0xdf3365){'use strict';var _0x4123ca,_0x3f07e7,_0x54fd4c,_0x5d5221;_0x4123ca=jQuery;if(typeof _0x4123ca['fn'][_0x5f29('0x2')]===_0x5f29('0x3'))return;_0x3f07e7={'url':_0x5f29('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0x3b6e68='QD\x20Amazing\x20Menu';var _0x44310c=function(_0x24fb41,_0x1ee010){if(_0x5f29('0x5')===typeof console&&_0x5f29('0x6')!==typeof console[_0x5f29('0x7')]&&_0x5f29('0x6')!==typeof console[_0x5f29('0x8')]&&'undefined'!==typeof console[_0x5f29('0x9')]){var _0x34b300;_0x5f29('0x5')===typeof _0x24fb41?(_0x24fb41['unshift']('['+_0x3b6e68+']\x0a'),_0x34b300=_0x24fb41):_0x34b300=['['+_0x3b6e68+']\x0a'+_0x24fb41];if(_0x5f29('0x6')===typeof _0x1ee010||_0x5f29('0xa')!==_0x1ee010[_0x5f29('0xb')]()&&_0x5f29('0xc')!==_0x1ee010[_0x5f29('0xb')]())if(_0x5f29('0x6')!==typeof _0x1ee010&&_0x5f29('0x8')===_0x1ee010['toLowerCase']())try{console[_0x5f29('0x8')][_0x5f29('0xd')](console,_0x34b300);}catch(_0x135658){try{console[_0x5f29('0x8')](_0x34b300[_0x5f29('0xe')]('\x0a'));}catch(_0x18b6ef){}}else try{console[_0x5f29('0x7')][_0x5f29('0xd')](console,_0x34b300);}catch(_0xf7d6d7){try{console['error'](_0x34b300[_0x5f29('0xe')]('\x0a'));}catch(_0x4477df){}}else try{console[_0x5f29('0x9')][_0x5f29('0xd')](console,_0x34b300);}catch(_0x475067){try{console[_0x5f29('0x9')](_0x34b300[_0x5f29('0xe')]('\x0a'));}catch(_0x32689e){}}}};_0x4123ca['fn'][_0x5f29('0xf')]=function(){var _0x2ccb56=_0x4123ca(this);_0x2ccb56[_0x5f29('0x10')](function(_0x104612){_0x4123ca(this)[_0x5f29('0x11')](_0x5f29('0x12')+_0x104612);});_0x2ccb56[_0x5f29('0x13')]()[_0x5f29('0x11')](_0x5f29('0x14'));_0x2ccb56[_0x5f29('0x15')]()['addClass']('qd-am-last');return _0x2ccb56;};_0x4123ca['fn']['QD_amazingMenu']=function(){};var _0x1a716a=function(_0x46fcaf){var _0x487a79={'y':_0x5f29('0x16')};return function(_0x1c4481){var _0x24841a,_0xedd45a,_0x1e244,_0x34c581;_0xedd45a=function(_0x51b64a){return _0x51b64a;};_0x1e244=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x1c4481=_0x1c4481['d'+_0x1e244[0x10]+'c'+_0x1e244[0x11]+'m'+_0xedd45a(_0x1e244[0x1])+'n'+_0x1e244[0xd]]['l'+_0x1e244[0x12]+'c'+_0x1e244[0x0]+'ti'+_0xedd45a('o')+'n'];_0x24841a=function(_0x5e5fb8){return escape(encodeURIComponent(_0x5e5fb8['replace'](/\./g,'¨')[_0x5f29('0x17')](/[a-zA-Z]/g,function(_0x4cfcd6){return String['fromCharCode'](('Z'>=_0x4cfcd6?0x5a:0x7a)>=(_0x4cfcd6=_0x4cfcd6[_0x5f29('0x18')](0x0)+0xd)?_0x4cfcd6:_0x4cfcd6-0x1a);})));};var _0x41f579=_0x24841a(_0x1c4481[[_0x1e244[0x9],_0xedd45a('o'),_0x1e244[0xc],_0x1e244[_0xedd45a(0xd)]]['join']('')]);_0x24841a=_0x24841a((window[['js',_0xedd45a('no'),'m',_0x1e244[0x1],_0x1e244[0x4]['toUpperCase'](),_0x5f29('0x19')][_0x5f29('0xe')]('')]||'---')+['.v',_0x1e244[0xd],'e',_0xedd45a('x'),'co',_0xedd45a('mm'),_0x5f29('0x1a'),_0x1e244[0x1],'.c',_0xedd45a('o'),'m.',_0x1e244[0x13],'r'][_0x5f29('0xe')](''));for(var _0x6c6b4b in _0x487a79){if(_0x24841a===_0x6c6b4b+_0x487a79[_0x6c6b4b]||_0x41f579===_0x6c6b4b+_0x487a79[_0x6c6b4b]){_0x34c581='tr'+_0x1e244[0x11]+'e';break;}_0x34c581='f'+_0x1e244[0x0]+'ls'+_0xedd45a(_0x1e244[0x1])+'';}_0xedd45a=!0x1;-0x1<_0x1c4481[[_0x1e244[0xc],'e',_0x1e244[0x0],'rc',_0x1e244[0x9]]['join']('')][_0x5f29('0x1b')](_0x5f29('0x1c'))&&(_0xedd45a=!0x0);return[_0x34c581,_0xedd45a];}(_0x46fcaf);}(window);if(!eval(_0x1a716a[0x0]))return _0x1a716a[0x1]?_0x44310c(_0x5f29('0x1d')):!0x1;_0x5d5221=function(_0x462c16){var _0x32fa46,_0x388c67,_0x54f353;_0x54f353=_0x462c16['find']('.qd_am_code');_0x32fa46=_0x54f353['filter'](_0x5f29('0x1e'));_0x388c67=_0x54f353[_0x5f29('0x1f')](_0x5f29('0x20'));if(!(_0x32fa46[_0x5f29('0x21')]||_0x388c67[_0x5f29('0x21')]))return;_0x32fa46[_0x5f29('0x22')]()[_0x5f29('0x11')](_0x5f29('0x23'));_0x388c67['parent']()['addClass'](_0x5f29('0x24'));_0x4123ca[_0x5f29('0x25')]({'url':_0x54fd4c[_0x5f29('0x26')],'dataType':_0x5f29('0x27'),'success':function(_0x4fb651){var _0x125ab2=_0x4123ca(_0x4fb651);_0x32fa46['each'](function(){var _0x174975,_0x482ece;_0x482ece=_0x4123ca(this);_0x174975=_0x125ab2[_0x5f29('0x28')]('img[alt=\x27'+_0x482ece[_0x5f29('0x29')](_0x5f29('0x2a'))+'\x27]');if(!_0x174975['length'])return;_0x174975[_0x5f29('0x10')](function(){_0x4123ca(this)[_0x5f29('0x0')](_0x5f29('0x2b'))['clone']()[_0x5f29('0x2c')](_0x482ece);});_0x482ece[_0x5f29('0x2d')]();})['addClass'](_0x5f29('0x2e'));_0x388c67[_0x5f29('0x10')](function(){var _0xc4ef28={},_0x5c9cdb;_0x5c9cdb=_0x4123ca(this);_0x125ab2[_0x5f29('0x28')]('h2')[_0x5f29('0x10')](function(){if(_0x4123ca(this)[_0x5f29('0x2f')]()[_0x5f29('0x30')]()['toLowerCase']()==_0x5c9cdb[_0x5f29('0x29')](_0x5f29('0x2a'))['trim']()[_0x5f29('0xb')]()){_0xc4ef28=_0x4123ca(this);return![];}});if(!_0xc4ef28[_0x5f29('0x21')])return;_0xc4ef28['each'](function(){_0x4123ca(this)['getParent'](_0x5f29('0x31'))[_0x5f29('0x32')]()[_0x5f29('0x2c')](_0x5c9cdb);});_0x5c9cdb[_0x5f29('0x2d')]();})[_0x5f29('0x11')](_0x5f29('0x2e'));},'error':function(){_0x44310c(_0x5f29('0x33')+_0x54fd4c['url']+_0x5f29('0x34'));},'complete':function(){_0x54fd4c[_0x5f29('0x35')][_0x5f29('0x36')](this);_0x4123ca(window)['trigger']('QuatroDigital.am.ajaxCallback',_0x462c16);},'clearQueueDelay':0xbb8});};_0x4123ca[_0x5f29('0x2')]=function(_0x55fc8d){var _0x40f43f=_0x55fc8d[_0x5f29('0x28')](_0x5f29('0x37'))[_0x5f29('0x10')](function(){var _0x42b529,_0x4d3001,_0x19d386,_0x35b2d9;_0x42b529=_0x4123ca(this);if(!_0x42b529[_0x5f29('0x21')])return _0x44310c([_0x5f29('0x38'),_0x55fc8d],_0x5f29('0xa'));_0x42b529[_0x5f29('0x28')](_0x5f29('0x39'))[_0x5f29('0x22')]()[_0x5f29('0x11')](_0x5f29('0x3a'));_0x42b529[_0x5f29('0x28')]('li')[_0x5f29('0x10')](function(){var _0x1163cb=_0x4123ca(this),_0x235558;_0x235558=_0x1163cb[_0x5f29('0x3b')](_0x5f29('0x3c'));if(!_0x235558['length'])return;_0x1163cb[_0x5f29('0x11')](_0x5f29('0x3d')+_0x235558[_0x5f29('0x13')]()[_0x5f29('0x2f')]()[_0x5f29('0x30')]()['replaceSpecialChars']()[_0x5f29('0x17')](/\./g,'')[_0x5f29('0x17')](/\s/g,'-')[_0x5f29('0xb')]());});_0x4d3001=_0x42b529[_0x5f29('0x28')](_0x5f29('0x3e'))[_0x5f29('0xf')]();_0x42b529[_0x5f29('0x11')](_0x5f29('0x3f'));_0x19d386=_0x4d3001['find'](_0x5f29('0x40'));_0x19d386[_0x5f29('0x10')](function(){var _0x3badae=_0x4123ca(this),_0x6e399f;_0x6e399f=_0x3badae['find'](_0x5f29('0x3e'))['qdAmAddNdx']()[_0x5f29('0x11')](_0x5f29('0x41'));_0x3badae[_0x5f29('0x11')](_0x5f29('0x42'));_0x3badae[_0x5f29('0x22')]()[_0x5f29('0x11')](_0x5f29('0x43'));});_0x19d386[_0x5f29('0x11')](_0x5f29('0x43'));var _0x291b31=0x0;var _0x555ef3=function(_0xe4c7bd){_0x291b31=_0x291b31+0x1;var _0x1f0e79=_0xe4c7bd[_0x5f29('0x3b')]('li');var _0x36946e=_0x1f0e79[_0x5f29('0x3b')]('*');if(!_0x36946e[_0x5f29('0x21')])return;_0x36946e[_0x5f29('0x11')](_0x5f29('0x44')+_0x291b31);_0x555ef3(_0x36946e);};_0x555ef3(_0x42b529);_0x42b529['add'](_0x42b529['find']('ul'))['each'](function(){var _0x37a1ed=_0x4123ca(this);_0x37a1ed['addClass'](_0x5f29('0x45')+_0x37a1ed[_0x5f29('0x3b')]('li')[_0x5f29('0x21')]+'-li');});});_0x5d5221(_0x40f43f);_0x54fd4c['callback']['call'](this);_0x4123ca(window)['trigger'](_0x5f29('0x46'),_0x55fc8d);};_0x4123ca['fn'][_0x5f29('0x2')]=function(_0x194271){var _0x255c6a=_0x4123ca(this);if(!_0x255c6a[_0x5f29('0x21')])return _0x255c6a;_0x54fd4c=_0x4123ca[_0x5f29('0x47')]({},_0x3f07e7,_0x194271);_0x255c6a['exec']=new _0x4123ca[(_0x5f29('0x2'))](_0x4123ca(this));return _0x255c6a;};_0x4123ca(function(){_0x4123ca(_0x5f29('0x48'))[_0x5f29('0x2')]();});}(this));

// smart cart
var _0xfdfa=['.qd-ddc-scrollUp','scrollCart','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20input','keyup.qd_ddc_cep','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','getCartInfoByUrl','simpleCart','cartIsEmpty','each','call','.qd-ddc-infoTotalValue','qtt','.qd-ddc-infoTotalShipping','.qd-ddc-infoAllTotal','Atenção,\x20você\x20esta\x20utilizando\x20um\x20método\x20descontinuado','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','dataOptionsCache','timeRemoveNewItemClass','qd-ddc-prodLoaded','getOrderForm','_QuatroDigital_AmountProduct','exec','.qd-ddc-wrapper','QD_checkoutQueue','totalizers','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','.qd-ddc-prodRow','qd-ddc-noItems','addClass','renderProductsList','.qd-ddc-prodWrapper2','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22>','<div\x20class=\x22qd-ddc-prodImgWrapper\x22>','<img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/>','<span\x20class=\x22qd-ddc-imgLoading\x22></span>','</div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div>','<div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a>','<input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a>','<span\x20class=\x22qd-ddc-qttLoading\x22></span>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22>','<div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a>','<span\x20class=\x22qd-ddc-prodRowLoading\x22></span>','empty','split','attr','qd-ddc-','availability','.qd-ddc-prodName','sellingPrice','meta[name=currency]','content','val','quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','filter','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','qd-loaded','load','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','click.qd_ddc_more','preventDefault','qd-loading','.qd-ddc-quantity','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','click.qd_ddc_remove','removeProduct','stop','remove','qdDdcLastPostalCode','BRA','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','index','done','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','boolean','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','quickViewUpdate','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','prodId','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','productId','prod_','.qdDdcContainer','QD_smartCart','selector','dropDown','buyButton','QD_buyButton','smartCart','getParent','closest','replace','abs','undefined','round','length','join','_QuatroDigital_CartData','callback','Callbacks','error','function','Oooops!\x20','message','object','warn','unshift','alerta','toLowerCase','aviso','info','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','bwnqbirvphyb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','name','extend','smartCheckout','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22>','<div\x20class=\x22qd_ddc_lightBoxClose\x22></div>','<div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div>','<div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div>','<span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div>','<div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22>','<div\x20class=\x22qd-ddc-shipping\x22></div>','<div\x20class=\x22qd-ddc-infoTotal\x22></div>','<a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a>','</div></div></div></div></div>','cartTotal','texts','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','find','.qd-ddc-viewCart','html','linkCart','.qd_ddc_continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','.qd-ddc-emptyCart\x20p','emptyCart','append','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','removeClass','qd-bb-lightBoxProdAdd','body','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper'];(function(_0x129b4f,_0x5114af){var _0x2a174a=function(_0xd4890d){while(--_0xd4890d){_0x129b4f['push'](_0x129b4f['shift']());}};_0x2a174a(++_0x5114af);}(_0xfdfa,0x16d));var _0xafdf=function(_0x3fbb91,_0x5ec106){_0x3fbb91=_0x3fbb91-0x0;var _0x3eb213=_0xfdfa[_0x3fbb91];return _0x3eb213;};(function(_0x4751e8){_0x4751e8['fn'][_0xafdf('0x0')]=_0x4751e8['fn'][_0xafdf('0x1')];}(jQuery));function qd_number_format(_0x19bea0,_0x585ba1,_0x3d509a,_0x1b69bf){_0x19bea0=(_0x19bea0+'')[_0xafdf('0x2')](/[^0-9+\-Ee.]/g,'');_0x19bea0=isFinite(+_0x19bea0)?+_0x19bea0:0x0;_0x585ba1=isFinite(+_0x585ba1)?Math[_0xafdf('0x3')](_0x585ba1):0x0;_0x1b69bf=_0xafdf('0x4')===typeof _0x1b69bf?',':_0x1b69bf;_0x3d509a=_0xafdf('0x4')===typeof _0x3d509a?'.':_0x3d509a;var _0x6410cc='',_0x6410cc=function(_0x4a35c5,_0x1157b4){var _0x585ba1=Math['pow'](0xa,_0x1157b4);return''+(Math[_0xafdf('0x5')](_0x4a35c5*_0x585ba1)/_0x585ba1)['toFixed'](_0x1157b4);},_0x6410cc=(_0x585ba1?_0x6410cc(_0x19bea0,_0x585ba1):''+Math[_0xafdf('0x5')](_0x19bea0))['split']('.');0x3<_0x6410cc[0x0][_0xafdf('0x6')]&&(_0x6410cc[0x0]=_0x6410cc[0x0][_0xafdf('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x1b69bf));(_0x6410cc[0x1]||'')['length']<_0x585ba1&&(_0x6410cc[0x1]=_0x6410cc[0x1]||'',_0x6410cc[0x1]+=Array(_0x585ba1-_0x6410cc[0x1][_0xafdf('0x6')]+0x1)[_0xafdf('0x7')]('0'));return _0x6410cc[_0xafdf('0x7')](_0x3d509a);};(function(){'use strict';try{window[_0xafdf('0x8')]=window[_0xafdf('0x8')]||{};window[_0xafdf('0x8')][_0xafdf('0x9')]=window[_0xafdf('0x8')][_0xafdf('0x9')]||$[_0xafdf('0xa')]();}catch(_0x4b6e1e){if(typeof console!==_0xafdf('0x4')&&typeof console[_0xafdf('0xb')]===_0xafdf('0xc'))console['error'](_0xafdf('0xd'),_0x4b6e1e[_0xafdf('0xe')]);}}());(function(_0x542389){'use strict';try{var _0x4ae1d6=jQuery;var _0x1da240='Quatro\x20Digital\x20-\x20DropDown\x20Cart';var _0x117f72=function(_0x3b5222,_0x35f889){if(_0xafdf('0xf')===typeof console&&'undefined'!==typeof console[_0xafdf('0xb')]&&_0xafdf('0x4')!==typeof console['info']&&_0xafdf('0x4')!==typeof console[_0xafdf('0x10')]){var _0x37deab;'object'===typeof _0x3b5222?(_0x3b5222[_0xafdf('0x11')]('['+_0x1da240+']\x0a'),_0x37deab=_0x3b5222):_0x37deab=['['+_0x1da240+']\x0a'+_0x3b5222];if(_0xafdf('0x4')===typeof _0x35f889||_0xafdf('0x12')!==_0x35f889[_0xafdf('0x13')]()&&_0xafdf('0x14')!==_0x35f889[_0xafdf('0x13')]())if('undefined'!==typeof _0x35f889&&_0xafdf('0x15')===_0x35f889[_0xafdf('0x13')]())try{console[_0xafdf('0x15')][_0xafdf('0x16')](console,_0x37deab);}catch(_0x4438ea){try{console['info'](_0x37deab['join']('\x0a'));}catch(_0xa62002){}}else try{console['error']['apply'](console,_0x37deab);}catch(_0x371a1c){try{console[_0xafdf('0xb')](_0x37deab[_0xafdf('0x7')]('\x0a'));}catch(_0x40d30e){}}else try{console[_0xafdf('0x10')][_0xafdf('0x16')](console,_0x37deab);}catch(_0x189b56){try{console[_0xafdf('0x10')](_0x37deab[_0xafdf('0x7')]('\x0a'));}catch(_0x59be5b){}}}};window['_QuatroDigital_DropDown']=window[_0xafdf('0x17')]||{};window[_0xafdf('0x17')][_0xafdf('0x18')]=!![];_0x4ae1d6[_0xafdf('0x19')]=function(){};_0x4ae1d6['fn']['QD_dropDownCart']=function(){return{'fn':new _0x4ae1d6()};};var _0x52bf68=function(_0x252c35){var _0xe2e6f0={'y':_0xafdf('0x1a')};return function(_0x274998){var _0x4ba3b4,_0x4d6789,_0x15eb5b,_0x35a129;_0x4d6789=function(_0x1f0f65){return _0x1f0f65;};_0x15eb5b=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x274998=_0x274998['d'+_0x15eb5b[0x10]+'c'+_0x15eb5b[0x11]+'m'+_0x4d6789(_0x15eb5b[0x1])+'n'+_0x15eb5b[0xd]]['l'+_0x15eb5b[0x12]+'c'+_0x15eb5b[0x0]+'ti'+_0x4d6789('o')+'n'];_0x4ba3b4=function(_0x28e777){return escape(encodeURIComponent(_0x28e777[_0xafdf('0x2')](/\./g,'¨')[_0xafdf('0x2')](/[a-zA-Z]/g,function(_0xd02a6d){return String[_0xafdf('0x1b')](('Z'>=_0xd02a6d?0x5a:0x7a)>=(_0xd02a6d=_0xd02a6d[_0xafdf('0x1c')](0x0)+0xd)?_0xd02a6d:_0xd02a6d-0x1a);})));};var _0x20e234=_0x4ba3b4(_0x274998[[_0x15eb5b[0x9],_0x4d6789('o'),_0x15eb5b[0xc],_0x15eb5b[_0x4d6789(0xd)]]['join']('')]);_0x4ba3b4=_0x4ba3b4((window[['js',_0x4d6789('no'),'m',_0x15eb5b[0x1],_0x15eb5b[0x4][_0xafdf('0x1d')](),_0xafdf('0x1e')][_0xafdf('0x7')]('')]||'---')+['.v',_0x15eb5b[0xd],'e',_0x4d6789('x'),'co',_0x4d6789('mm'),_0xafdf('0x1f'),_0x15eb5b[0x1],'.c',_0x4d6789('o'),'m.',_0x15eb5b[0x13],'r'][_0xafdf('0x7')](''));for(var _0x3e03a8 in _0xe2e6f0){if(_0x4ba3b4===_0x3e03a8+_0xe2e6f0[_0x3e03a8]||_0x20e234===_0x3e03a8+_0xe2e6f0[_0x3e03a8]){_0x35a129='tr'+_0x15eb5b[0x11]+'e';break;}_0x35a129='f'+_0x15eb5b[0x0]+'ls'+_0x4d6789(_0x15eb5b[0x1])+'';}_0x4d6789=!0x1;-0x1<_0x274998[[_0x15eb5b[0xc],'e',_0x15eb5b[0x0],'rc',_0x15eb5b[0x9]][_0xafdf('0x7')]('')][_0xafdf('0x20')](_0xafdf('0x21'))&&(_0x4d6789=!0x0);return[_0x35a129,_0x4d6789];}(_0x252c35);}(window);if(!eval(_0x52bf68[0x0]))return _0x52bf68[0x1]?_0x117f72('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x4ae1d6[_0xafdf('0x19')]=function(_0x2cfdab,_0x3b4d16){var _0x10ac5f,_0x21c59f,_0x440eea,_0x2434cb,_0x8399af,_0x150019,_0x57dae9,_0x481a93,_0x5f5500,_0x325b4c,_0x1578a1,_0x582362;_0x1578a1=_0x4ae1d6(_0x2cfdab);if(!_0x1578a1['length'])return _0x1578a1;_0x10ac5f={'updateOnlyHover':!![],'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':_0xafdf('0x22'),'cartTotal':_0xafdf('0x23'),'emptyCart':_0xafdf('0x24'),'continueShopping':'Continuar\x20Comprando','shippingForm':_0xafdf('0x25')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!![],'skuName':function(_0x528088){return _0x528088[_0xafdf('0x26')]||_0x528088[_0xafdf('0x27')];},'callback':function(){},'callbackProductsList':function(){}};_0x21c59f=_0x4ae1d6[_0xafdf('0x28')](!![],{},_0x10ac5f,_0x3b4d16);_0x440eea=_0x4ae1d6('');_0x325b4c=this;if(_0x21c59f[_0xafdf('0x29')]){var _0x5e4b90=![];if(typeof window[_0xafdf('0x2a')]==='undefined'){_0x117f72(_0xafdf('0x2b'));_0x4ae1d6['ajax']({'url':_0xafdf('0x2c'),'async':![],'dataType':'script','error':function(){_0x117f72('Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.');_0x5e4b90=!![];}});}if(_0x5e4b90)return _0x117f72('A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!');}var _0x1854fb;if(typeof window['vtexjs']==='object'&&typeof window[_0xafdf('0x2a')][_0xafdf('0x2d')]!=='undefined')_0x1854fb=window[_0xafdf('0x2a')]['checkout'];else if(typeof vtex===_0xafdf('0xf')&&typeof vtex[_0xafdf('0x2d')]===_0xafdf('0xf')&&typeof vtex['checkout'][_0xafdf('0x2e')]!==_0xafdf('0x4'))_0x1854fb=new vtex[(_0xafdf('0x2d'))]['SDK']();else return _0x117f72(_0xafdf('0x2f'));_0x325b4c[_0xafdf('0x30')]=_0xafdf('0x31')+'<div\x20class=\x22qd-ddc-wrapper2\x22>'+_0xafdf('0x32')+'<div\x20class=\x22qd-ddc-wrapper3\x22>'+_0xafdf('0x33')+_0xafdf('0x34')+_0xafdf('0x35')+_0xafdf('0x36')+_0xafdf('0x37')+_0xafdf('0x38')+'<div\x20class=\x22qd-ddc-infoBts\x22>'+_0xafdf('0x39')+_0xafdf('0x3a');_0x150019=function(_0x3e0ea9){var _0x37c566=_0x4ae1d6(_0x3e0ea9);_0x21c59f['texts'][_0xafdf('0x3b')]=_0x21c59f[_0xafdf('0x3c')][_0xafdf('0x3b')][_0xafdf('0x2')]('#value',_0xafdf('0x3d'));_0x21c59f[_0xafdf('0x3c')][_0xafdf('0x3b')]=_0x21c59f[_0xafdf('0x3c')][_0xafdf('0x3b')][_0xafdf('0x2')](_0xafdf('0x3e'),_0xafdf('0x3f'));_0x21c59f[_0xafdf('0x3c')][_0xafdf('0x3b')]=_0x21c59f[_0xafdf('0x3c')][_0xafdf('0x3b')]['replace']('#shipping',_0xafdf('0x40'));_0x21c59f[_0xafdf('0x3c')][_0xafdf('0x3b')]=_0x21c59f[_0xafdf('0x3c')][_0xafdf('0x3b')][_0xafdf('0x2')](_0xafdf('0x41'),_0xafdf('0x42'));_0x37c566[_0xafdf('0x43')](_0xafdf('0x44'))[_0xafdf('0x45')](_0x21c59f[_0xafdf('0x3c')][_0xafdf('0x46')]);_0x37c566[_0xafdf('0x43')](_0xafdf('0x47'))['html'](_0x21c59f['texts']['continueShopping']);_0x37c566[_0xafdf('0x43')](_0xafdf('0x48'))['html'](_0x21c59f[_0xafdf('0x3c')][_0xafdf('0x49')]);_0x37c566[_0xafdf('0x43')](_0xafdf('0x4a'))[_0xafdf('0x45')](_0x21c59f['texts']['cartTotal']);_0x37c566[_0xafdf('0x43')](_0xafdf('0x4b'))[_0xafdf('0x45')](_0x21c59f[_0xafdf('0x3c')]['shippingForm']);_0x37c566[_0xafdf('0x43')](_0xafdf('0x4c'))[_0xafdf('0x45')](_0x21c59f[_0xafdf('0x3c')][_0xafdf('0x4d')]);return _0x37c566;};_0x8399af=function(_0x2f8e7c){_0x4ae1d6(this)[_0xafdf('0x4e')](_0x2f8e7c);_0x2f8e7c['find'](_0xafdf('0x4f'))[_0xafdf('0x50')](_0x4ae1d6(_0xafdf('0x51')))['on'](_0xafdf('0x52'),function(){_0x1578a1[_0xafdf('0x53')](_0xafdf('0x54'));_0x4ae1d6(document[_0xafdf('0x55')])[_0xafdf('0x53')](_0xafdf('0x56'));});_0x4ae1d6(document)[_0xafdf('0x57')]('keyup.qd_ddc_closeFn')['on'](_0xafdf('0x58'),function(_0x3792b1){if(_0x3792b1[_0xafdf('0x59')]==0x1b){_0x1578a1[_0xafdf('0x53')](_0xafdf('0x54'));_0x4ae1d6(document[_0xafdf('0x55')])[_0xafdf('0x53')](_0xafdf('0x56'));}});var _0x19293a=_0x2f8e7c[_0xafdf('0x43')](_0xafdf('0x5a'));_0x2f8e7c[_0xafdf('0x43')](_0xafdf('0x5b'))['on']('click.qd_ddc_scrollUp',function(){_0x325b4c[_0xafdf('0x5c')]('-',undefined,undefined,_0x19293a);return![];});_0x2f8e7c[_0xafdf('0x43')]('.qd-ddc-scrollDown')['on'](_0xafdf('0x5d'),function(){_0x325b4c[_0xafdf('0x5c')](undefined,undefined,undefined,_0x19293a);return![];});_0x2f8e7c[_0xafdf('0x43')](_0xafdf('0x5e'))['val']('')['on'](_0xafdf('0x5f'),function(){_0x325b4c[_0xafdf('0x60')](_0x4ae1d6(this));});if(_0x21c59f[_0xafdf('0x61')]){var _0x376301=0x0;_0x4ae1d6(this)['on'](_0xafdf('0x62'),function(){var _0x388d1c=function(){if(!window['_QuatroDigital_DropDown'][_0xafdf('0x18')])return;_0x325b4c[_0xafdf('0x63')]();window[_0xafdf('0x17')][_0xafdf('0x18')]=![];_0x4ae1d6['fn'][_0xafdf('0x64')](!![]);_0x325b4c[_0xafdf('0x65')]();};_0x376301=setInterval(function(){_0x388d1c();},0x258);_0x388d1c();});_0x4ae1d6(this)['on']('mouseleave.qd_ddc_hover',function(){clearInterval(_0x376301);});}};_0x57dae9=_0x150019(this[_0xafdf('0x30')]);_0x481a93=0x0;_0x1578a1[_0xafdf('0x66')](function(){if(_0x481a93>0x0)_0x8399af[_0xafdf('0x67')](this,_0x57dae9['clone']());else _0x8399af['call'](this,_0x57dae9);_0x481a93++;});window['_QuatroDigital_CartData'][_0xafdf('0x9')][_0xafdf('0x50')](function(){_0x4ae1d6(_0xafdf('0x68'))['html'](window['_QuatroDigital_CartData']['total']||'--');_0x4ae1d6('.qd-ddc-infoTotalItems')[_0xafdf('0x45')](window[_0xafdf('0x8')][_0xafdf('0x69')]||'0');_0x4ae1d6(_0xafdf('0x6a'))[_0xafdf('0x45')](window[_0xafdf('0x8')]['shipping']||'--');_0x4ae1d6(_0xafdf('0x6b'))[_0xafdf('0x45')](window[_0xafdf('0x8')]['allTotal']||'--');});_0x5f5500=function(_0x5e7ca3){_0x117f72(_0xafdf('0x6c'));};_0x582362=function(_0x3647eb,_0x42538d){if(typeof _0x3647eb[_0xafdf('0x6d')]===_0xafdf('0x4'))return _0x117f72(_0xafdf('0x6e'));_0x325b4c['renderProductsList'][_0xafdf('0x67')](this,_0x42538d);};_0x325b4c['getCartInfoByUrl']=function(_0x5e1ef2,_0x3599fd){var _0x37a6b4;if(typeof _0x3599fd!=_0xafdf('0x4'))window['_QuatroDigital_DropDown'][_0xafdf('0x6f')]=_0x3599fd;else if(window[_0xafdf('0x17')][_0xafdf('0x6f')])_0x3599fd=window[_0xafdf('0x17')][_0xafdf('0x6f')];setTimeout(function(){window[_0xafdf('0x17')]['dataOptionsCache']=undefined;},_0x21c59f[_0xafdf('0x70')]);_0x4ae1d6('.qd-ddc-wrapper')['removeClass'](_0xafdf('0x71'));if(_0x21c59f[_0xafdf('0x29')]){_0x37a6b4=function(_0x38893a){window[_0xafdf('0x17')][_0xafdf('0x72')]=_0x38893a;_0x582362(_0x38893a,_0x3599fd);if(typeof window[_0xafdf('0x73')]!==_0xafdf('0x4')&&typeof window['_QuatroDigital_AmountProduct'][_0xafdf('0x74')]==='function')window['_QuatroDigital_AmountProduct']['exec'][_0xafdf('0x67')](this);_0x4ae1d6(_0xafdf('0x75'))['addClass'](_0xafdf('0x71'));};if(typeof window['_QuatroDigital_DropDown']['getOrderForm']!==_0xafdf('0x4')){_0x37a6b4(window[_0xafdf('0x17')][_0xafdf('0x72')]);if(typeof _0x5e1ef2===_0xafdf('0xc'))_0x5e1ef2(window[_0xafdf('0x17')][_0xafdf('0x72')]);return;}_0x4ae1d6[_0xafdf('0x76')]([_0xafdf('0x6d'),_0xafdf('0x77'),_0xafdf('0x78')],{'done':function(_0x1f8ec4){_0x37a6b4[_0xafdf('0x67')](this,_0x1f8ec4);if(typeof _0x5e1ef2===_0xafdf('0xc'))_0x5e1ef2(_0x1f8ec4);},'fail':function(_0x57a2d0){_0x117f72([_0xafdf('0x79'),_0x57a2d0]);}});}else{alert('Este\x20método\x20esta\x20descontinuado!');}};_0x325b4c[_0xafdf('0x65')]=function(){var _0x39c507=_0x4ae1d6(_0xafdf('0x75'));if(_0x39c507[_0xafdf('0x43')](_0xafdf('0x7a'))[_0xafdf('0x6')])_0x39c507[_0xafdf('0x53')](_0xafdf('0x7b'));else _0x39c507[_0xafdf('0x7c')]('qd-ddc-noItems');};_0x325b4c[_0xafdf('0x7d')]=function(_0x435c0f){var _0x4d3191=_0x4ae1d6(_0xafdf('0x7e'));var _0x2d61aa='<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22>'+_0xafdf('0x7f')+_0xafdf('0x80')+_0xafdf('0x81')+_0xafdf('0x82')+_0xafdf('0x83')+_0xafdf('0x83')+_0xafdf('0x84')+'<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div>'+'<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22>'+_0xafdf('0x85')+_0xafdf('0x86')+_0xafdf('0x87')+_0xafdf('0x88')+_0xafdf('0x89')+_0xafdf('0x83')+_0xafdf('0x83')+_0xafdf('0x8a')+_0xafdf('0x8b')+_0xafdf('0x8c')+_0xafdf('0x8d')+_0xafdf('0x83')+'</div>'+_0xafdf('0x83');_0x4d3191[_0xafdf('0x8e')]();_0x4d3191[_0xafdf('0x66')](function(){var _0x1fceb2=_0x4ae1d6(this);var _0x2332c4,_0x3a2200,_0x193a14,_0x4ef792;var _0x4fd47e=_0x4ae1d6('');var _0xe97da;for(var _0x476212 in window[_0xafdf('0x17')][_0xafdf('0x72')]['items']){if(typeof window['_QuatroDigital_DropDown'][_0xafdf('0x72')]['items'][_0x476212]!=='object')continue;_0x193a14=window[_0xafdf('0x17')][_0xafdf('0x72')][_0xafdf('0x6d')][_0x476212];_0xe97da=_0x193a14['productCategoryIds'][_0xafdf('0x2')](/^\/|\/$/g,'')[_0xafdf('0x8f')]('/');_0x3a2200=_0x4ae1d6(_0x2d61aa);_0x3a2200[_0xafdf('0x90')]({'data-sku':_0x193a14['id'],'data-sku-index':_0x476212,'data-qd-departament':_0xe97da[0x0],'data-qd-category':_0xe97da[_0xe97da[_0xafdf('0x6')]-0x1]});_0x3a2200[_0xafdf('0x7c')](_0xafdf('0x91')+_0x193a14[_0xafdf('0x92')]);_0x3a2200[_0xafdf('0x43')](_0xafdf('0x93'))[_0xafdf('0x4e')](_0x21c59f['skuName'](_0x193a14));_0x3a2200[_0xafdf('0x43')]('.qd-ddc-prodPrice')[_0xafdf('0x4e')](isNaN(_0x193a14[_0xafdf('0x94')])?_0x193a14['sellingPrice']:_0x193a14[_0xafdf('0x94')]==0x0?'Grátis':(_0x4ae1d6(_0xafdf('0x95'))[_0xafdf('0x90')](_0xafdf('0x96'))||'R$')+'\x20'+qd_number_format(_0x193a14[_0xafdf('0x94')]/0x64,0x2,',','.'));_0x3a2200['find']('.qd-ddc-quantity')[_0xafdf('0x90')]({'data-sku':_0x193a14['id'],'data-sku-index':_0x476212})[_0xafdf('0x97')](_0x193a14[_0xafdf('0x98')]);_0x3a2200[_0xafdf('0x43')](_0xafdf('0x99'))[_0xafdf('0x90')]({'data-sku':_0x193a14['id'],'data-sku-index':_0x476212});_0x325b4c[_0xafdf('0x9a')](_0x193a14['id'],_0x3a2200[_0xafdf('0x43')](_0xafdf('0x9b')),_0x193a14[_0xafdf('0x9c')]);_0x3a2200[_0xafdf('0x43')](_0xafdf('0x9d'))['attr']({'data-sku':_0x193a14['id'],'data-sku-index':_0x476212});_0x3a2200[_0xafdf('0x9e')](_0x1fceb2);_0x4fd47e=_0x4fd47e[_0xafdf('0x50')](_0x3a2200);}try{var _0x58c08c=_0x1fceb2[_0xafdf('0x0')]('.qd-ddc-wrapper')['find']('.qd-ddc-shipping\x20input');if(_0x58c08c[_0xafdf('0x6')]&&_0x58c08c[_0xafdf('0x97')]()==''&&window[_0xafdf('0x17')][_0xafdf('0x72')][_0xafdf('0x78')]['address'])_0x58c08c[_0xafdf('0x97')](window[_0xafdf('0x17')][_0xafdf('0x72')][_0xafdf('0x78')]['address'][_0xafdf('0x9f')]);}catch(_0x1601e5){_0x117f72(_0xafdf('0xa0')+_0x1601e5[_0xafdf('0xe')],_0xafdf('0x14'));}_0x325b4c[_0xafdf('0xa1')](_0x1fceb2);_0x325b4c[_0xafdf('0x65')]();if(_0x435c0f&&_0x435c0f[_0xafdf('0xa2')]){(function(){_0x4ef792=_0x4fd47e[_0xafdf('0xa3')]('[data-sku=\x27'+_0x435c0f[_0xafdf('0xa2')]+'\x27]');if(!_0x4ef792[_0xafdf('0x6')])return;_0x2332c4=0x0;_0x4fd47e['each'](function(){var _0x2b93c7=_0x4ae1d6(this);if(_0x2b93c7['is'](_0x4ef792))return![];_0x2332c4+=_0x2b93c7['outerHeight']();});_0x325b4c[_0xafdf('0x5c')](undefined,undefined,_0x2332c4,_0x1fceb2[_0xafdf('0x50')](_0x1fceb2[_0xafdf('0xa4')]()));_0x4fd47e[_0xafdf('0x53')](_0xafdf('0xa5'));(function(_0x16f030){_0x16f030[_0xafdf('0x7c')](_0xafdf('0xa6'));_0x16f030[_0xafdf('0x7c')](_0xafdf('0xa5'));setTimeout(function(){_0x16f030[_0xafdf('0x53')](_0xafdf('0xa6'));},_0x21c59f['timeRemoveNewItemClass']);}(_0x4ef792));}());}});(function(){if(_QuatroDigital_DropDown[_0xafdf('0x72')][_0xafdf('0x6d')][_0xafdf('0x6')]){_0x4ae1d6(_0xafdf('0x55'))['removeClass'](_0xafdf('0xa7'))[_0xafdf('0x7c')](_0xafdf('0xa8'));setTimeout(function(){_0x4ae1d6('body')['removeClass'](_0xafdf('0xa9'));},_0x21c59f[_0xafdf('0x70')]);}else _0x4ae1d6(_0xafdf('0x55'))[_0xafdf('0x53')](_0xafdf('0xaa'))[_0xafdf('0x7c')](_0xafdf('0xa7'));}());if(typeof _0x21c59f[_0xafdf('0xab')]==='function')_0x21c59f[_0xafdf('0xab')][_0xafdf('0x67')](this);else _0x117f72('callbackProductsList\x20não\x20é\x20uma\x20função');};_0x325b4c[_0xafdf('0x9a')]=function(_0x291d73,_0x5d1bf2,_0x160071){var _0x46db89=!![];function _0x1b2776(){_0x5d1bf2[_0xafdf('0x53')](_0xafdf('0xac'))[_0xafdf('0xad')](function(){_0x4ae1d6(this)['addClass'](_0xafdf('0xac'));})[_0xafdf('0x90')]('src',_0x160071);};if(_0x160071)_0x1b2776();else if(!isNaN(_0x291d73)){alert(_0xafdf('0xae'));}else _0x117f72(_0xafdf('0xaf'),_0xafdf('0x12'));};_0x325b4c[_0xafdf('0xa1')]=function(_0x26a133){var _0x7b96ba,_0x23acf5,_0x5099e4,_0x541210;_0x7b96ba=function(_0x1cba2d,_0x2039d7){var _0x516dc8,_0x53506c,_0x1d6034,_0x5342d9,_0x301acf;_0x1d6034=_0x4ae1d6(_0x1cba2d);_0x516dc8=_0x1d6034['attr'](_0xafdf('0xb0'));_0x301acf=_0x1d6034[_0xafdf('0x90')]('data-sku-index');if(!_0x516dc8)return;_0x53506c=parseInt(_0x1d6034['val']())||0x1;_0x325b4c['changeQantity']([_0x516dc8,_0x301acf],_0x53506c,_0x53506c+0x1,function(_0x48492a){_0x1d6034[_0xafdf('0x97')](_0x48492a);if(typeof _0x2039d7===_0xafdf('0xc'))_0x2039d7();});};_0x5099e4=function(_0x2046b8,_0x858f2c){var _0x12fb44,_0x4bbf2e,_0x3d883a,_0x570ada,_0x4e2bf6;_0x3d883a=_0x4ae1d6(_0x2046b8);_0x12fb44=_0x3d883a[_0xafdf('0x90')](_0xafdf('0xb0'));_0x4e2bf6=_0x3d883a[_0xafdf('0x90')](_0xafdf('0xb1'));if(!_0x12fb44)return;_0x4bbf2e=parseInt(_0x3d883a[_0xafdf('0x97')]())||0x2;_0x570ada=_0x325b4c[_0xafdf('0xb2')]([_0x12fb44,_0x4e2bf6],_0x4bbf2e,_0x4bbf2e-0x1,function(_0x3a1918){_0x3d883a['val'](_0x3a1918);if(typeof _0x858f2c===_0xafdf('0xc'))_0x858f2c();});};_0x541210=function(_0x5410e6,_0x571b5e){var _0x1d9441,_0x486908,_0x34e1c9,_0xdcb1c5,_0x4bf3f8;_0x34e1c9=_0x4ae1d6(_0x5410e6);_0x1d9441=_0x34e1c9[_0xafdf('0x90')](_0xafdf('0xb0'));_0x4bf3f8=_0x34e1c9[_0xafdf('0x90')](_0xafdf('0xb1'));if(!_0x1d9441)return;_0x486908=parseInt(_0x34e1c9['val']())||0x1;_0xdcb1c5=_0x325b4c[_0xafdf('0xb2')]([_0x1d9441,_0x4bf3f8],0x1,_0x486908,function(_0x4f122a){_0x34e1c9[_0xafdf('0x97')](_0x4f122a);if(typeof _0x571b5e==='function')_0x571b5e();});};_0x23acf5=_0x26a133[_0xafdf('0x43')](_0xafdf('0xb3'));_0x23acf5[_0xafdf('0x7c')](_0xafdf('0xb4'))['each'](function(){var _0x1e3e3f=_0x4ae1d6(this);_0x1e3e3f['find']('.qd-ddc-quantityMore')['on'](_0xafdf('0xb5'),function(_0x153b97){_0x153b97[_0xafdf('0xb6')]();_0x23acf5[_0xafdf('0x7c')](_0xafdf('0xb7'));_0x7b96ba(_0x1e3e3f[_0xafdf('0x43')](_0xafdf('0xb8')),function(){_0x23acf5['removeClass'](_0xafdf('0xb7'));});});_0x1e3e3f[_0xafdf('0x43')](_0xafdf('0xb9'))['on'](_0xafdf('0xba'),function(_0x4d1d15){_0x4d1d15[_0xafdf('0xb6')]();_0x23acf5[_0xafdf('0x7c')]('qd-loading');_0x5099e4(_0x1e3e3f[_0xafdf('0x43')](_0xafdf('0xb8')),function(){_0x23acf5['removeClass']('qd-loading');});});_0x1e3e3f['find'](_0xafdf('0xb8'))['on'](_0xafdf('0xbb'),function(){_0x23acf5[_0xafdf('0x7c')](_0xafdf('0xb7'));_0x541210(this,function(){_0x23acf5['removeClass'](_0xafdf('0xb7'));});});_0x1e3e3f[_0xafdf('0x43')](_0xafdf('0xb8'))['on']('keyup.qd_ddc_change',function(_0x4ccdad){if(_0x4ccdad[_0xafdf('0x59')]!=0xd)return;_0x23acf5[_0xafdf('0x7c')](_0xafdf('0xb7'));_0x541210(this,function(){_0x23acf5[_0xafdf('0x53')](_0xafdf('0xb7'));});});});_0x26a133['find'](_0xafdf('0x7a'))[_0xafdf('0x66')](function(){var _0x218505=_0x4ae1d6(this);_0x218505[_0xafdf('0x43')](_0xafdf('0x99'))['on'](_0xafdf('0xbc'),function(){var _0xedc189;_0x218505[_0xafdf('0x7c')](_0xafdf('0xb7'));_0x325b4c[_0xafdf('0xbd')](_0x4ae1d6(this),function(_0xf529db){if(_0xf529db)_0x218505[_0xafdf('0xbe')](!![])['slideUp'](function(){_0x218505[_0xafdf('0xbf')]();_0x325b4c[_0xafdf('0x65')]();});else _0x218505[_0xafdf('0x53')](_0xafdf('0xb7'));});return![];});});};_0x325b4c[_0xafdf('0x60')]=function(_0x4c4ad8){var _0x1a91c9=_0x4c4ad8[_0xafdf('0x97')]();_0x1a91c9=_0x1a91c9[_0xafdf('0x2')](/[^0-9\-]/g,'');_0x1a91c9=_0x1a91c9[_0xafdf('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3');_0x1a91c9=_0x1a91c9[_0xafdf('0x2')](/(.{9}).*/g,'$1');_0x4c4ad8[_0xafdf('0x97')](_0x1a91c9);if(_0x1a91c9['length']>=0x9){if(_0x4c4ad8['data'](_0xafdf('0xc0'))!=_0x1a91c9){_0x1854fb['calculateShipping']({'postalCode':_0x1a91c9,'country':_0xafdf('0xc1')})['done'](function(_0x7ab046){window[_0xafdf('0x17')][_0xafdf('0x72')]=_0x7ab046;_0x325b4c[_0xafdf('0x63')]();})[_0xafdf('0xc2')](function(_0x5deb6a){_0x117f72([_0xafdf('0xc3'),_0x5deb6a]);updateCartData();});}_0x4c4ad8['data'](_0xafdf('0xc0'),_0x1a91c9);}};_0x325b4c['changeQantity']=function(_0x22202c,_0x1a23f0,_0x540131,_0x23635f){var _0x29b505=_0x540131||0x1;if(_0x29b505<0x1)return _0x1a23f0;if(_0x21c59f[_0xafdf('0x29')]){if(typeof window[_0xafdf('0x17')][_0xafdf('0x72')]['items'][_0x22202c[0x1]]===_0xafdf('0x4')){_0x117f72('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x22202c[0x1]+']');return _0x1a23f0;}window['_QuatroDigital_DropDown'][_0xafdf('0x72')][_0xafdf('0x6d')][_0x22202c[0x1]]['quantity']=_0x29b505;window[_0xafdf('0x17')]['getOrderForm'][_0xafdf('0x6d')][_0x22202c[0x1]][_0xafdf('0xc4')]=_0x22202c[0x1];_0x1854fb['updateItems']([window['_QuatroDigital_DropDown'][_0xafdf('0x72')][_0xafdf('0x6d')][_0x22202c[0x1]]],[_0xafdf('0x6d'),_0xafdf('0x77'),_0xafdf('0x78')])[_0xafdf('0xc5')](function(_0x326058){window[_0xafdf('0x17')]['getOrderForm']=_0x326058;_0x1b34a3(!![]);})[_0xafdf('0xc2')](function(_0x2092c0){_0x117f72([_0xafdf('0xc6'),_0x2092c0]);_0x1b34a3();});}else{_0x117f72(_0xafdf('0xc7'));}function _0x1b34a3(_0x296715){_0x296715=typeof _0x296715!==_0xafdf('0xc8')?![]:_0x296715;_0x325b4c[_0xafdf('0x63')]();window['_QuatroDigital_DropDown'][_0xafdf('0x18')]=![];_0x325b4c[_0xafdf('0x65')]();if(typeof window[_0xafdf('0x73')]!==_0xafdf('0x4')&&typeof window[_0xafdf('0x73')][_0xafdf('0x74')]===_0xafdf('0xc'))window[_0xafdf('0x73')][_0xafdf('0x74')][_0xafdf('0x67')](this);if(typeof adminCart===_0xafdf('0xc'))adminCart();_0x4ae1d6['fn']['simpleCart'](!![],undefined,_0x296715);if(typeof _0x23635f===_0xafdf('0xc'))_0x23635f(_0x1a23f0);};};_0x325b4c[_0xafdf('0xbd')]=function(_0x5ada15,_0x35cdeb){var _0x369889=![];var _0x3c75d3=_0x4ae1d6(_0x5ada15);var _0x5a18bd=_0x3c75d3[_0xafdf('0x90')](_0xafdf('0xb1'));if(_0x21c59f[_0xafdf('0x29')]){if(typeof window['_QuatroDigital_DropDown']['getOrderForm'][_0xafdf('0x6d')][_0x5a18bd]===_0xafdf('0x4')){_0x117f72('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x5a18bd+']');return _0x369889;}window[_0xafdf('0x17')][_0xafdf('0x72')]['items'][_0x5a18bd][_0xafdf('0xc4')]=_0x5a18bd;_0x1854fb['removeItems']([window[_0xafdf('0x17')][_0xafdf('0x72')][_0xafdf('0x6d')][_0x5a18bd]],[_0xafdf('0x6d'),_0xafdf('0x77'),_0xafdf('0x78')])[_0xafdf('0xc5')](function(_0x3d6b86){_0x369889=!![];window[_0xafdf('0x17')][_0xafdf('0x72')]=_0x3d6b86;_0x582362(_0x3d6b86);_0x2d1b64(!![]);})[_0xafdf('0xc2')](function(_0x5160a2){_0x117f72([_0xafdf('0xc9'),_0x5160a2]);_0x2d1b64();});}else{alert(_0xafdf('0xca'));}function _0x2d1b64(_0x537470){_0x537470=typeof _0x537470!==_0xafdf('0xc8')?![]:_0x537470;if(typeof window['_QuatroDigital_AmountProduct']!==_0xafdf('0x4')&&typeof window[_0xafdf('0x73')][_0xafdf('0x74')]===_0xafdf('0xc'))window['_QuatroDigital_AmountProduct'][_0xafdf('0x74')][_0xafdf('0x67')](this);if(typeof adminCart===_0xafdf('0xc'))adminCart();_0x4ae1d6['fn'][_0xafdf('0x64')](!![],undefined,_0x537470);if(typeof _0x35cdeb===_0xafdf('0xc'))_0x35cdeb(_0x369889);};};_0x325b4c['scrollCart']=function(_0x4f035a,_0x3f0c06,_0x289bee,_0x5ebac4){var _0x4ba44c=_0x5ebac4||_0x4ae1d6(_0xafdf('0xcb'));var _0x4538fe=_0x4f035a||'+';var _0x1b7979=_0x3f0c06||_0x4ba44c[_0xafdf('0xcc')]()*0.9;_0x4ba44c[_0xafdf('0xbe')](!![],!![])['animate']({'scrollTop':isNaN(_0x289bee)?_0x4538fe+'='+_0x1b7979+'px':_0x289bee});};if(!_0x21c59f[_0xafdf('0x61')]){_0x325b4c[_0xafdf('0x63')]();_0x4ae1d6['fn'][_0xafdf('0x64')](!![]);}_0x4ae1d6(window)['on']('productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex',function(){try{window[_0xafdf('0x17')][_0xafdf('0x72')]=undefined;_0x325b4c[_0xafdf('0x63')]();}catch(_0x5264f1){_0x117f72(_0xafdf('0xcd')+_0x5264f1[_0xafdf('0xe')],_0xafdf('0xce'));}});if(typeof _0x21c59f[_0xafdf('0x9')]===_0xafdf('0xc'))_0x21c59f[_0xafdf('0x9')][_0xafdf('0x67')](this);else _0x117f72(_0xafdf('0xcf'));};_0x4ae1d6['fn'][_0xafdf('0x19')]=function(_0x53be13){var _0x1456af;_0x1456af=_0x4ae1d6(this);_0x1456af['fn']=new _0x4ae1d6[(_0xafdf('0x19'))](this,_0x53be13);return _0x1456af;};}catch(_0x30c9b0){if(typeof console!==_0xafdf('0x4')&&typeof console['error']===_0xafdf('0xc'))console[_0xafdf('0xb')](_0xafdf('0xd'),_0x30c9b0);}}(this));(function(_0x5c76a0){'use strict';try{var _0x187a66=jQuery;var _0x435177='Quatro\x20Digital\x20-\x20Box\x20Amount\x20Cart';var _0x3693b2=function(_0x539f67,_0x598681){if(_0xafdf('0xf')===typeof console&&'undefined'!==typeof console[_0xafdf('0xb')]&&_0xafdf('0x4')!==typeof console[_0xafdf('0x15')]&&_0xafdf('0x4')!==typeof console[_0xafdf('0x10')]){var _0x442b01;_0xafdf('0xf')===typeof _0x539f67?(_0x539f67['unshift']('['+_0x435177+']\x0a'),_0x442b01=_0x539f67):_0x442b01=['['+_0x435177+']\x0a'+_0x539f67];if(_0xafdf('0x4')===typeof _0x598681||_0xafdf('0x12')!==_0x598681[_0xafdf('0x13')]()&&_0xafdf('0x14')!==_0x598681[_0xafdf('0x13')]())if('undefined'!==typeof _0x598681&&_0xafdf('0x15')===_0x598681[_0xafdf('0x13')]())try{console[_0xafdf('0x15')][_0xafdf('0x16')](console,_0x442b01);}catch(_0xcb9ff9){try{console[_0xafdf('0x15')](_0x442b01[_0xafdf('0x7')]('\x0a'));}catch(_0xb299f3){}}else try{console[_0xafdf('0xb')][_0xafdf('0x16')](console,_0x442b01);}catch(_0x54c978){try{console[_0xafdf('0xb')](_0x442b01[_0xafdf('0x7')]('\x0a'));}catch(_0x5c1e23){}}else try{console[_0xafdf('0x10')]['apply'](console,_0x442b01);}catch(_0x5dcd5e){try{console[_0xafdf('0x10')](_0x442b01[_0xafdf('0x7')]('\x0a'));}catch(_0x363f9f){}}}};window[_0xafdf('0x73')]=window['_QuatroDigital_AmountProduct']||{};window[_0xafdf('0x73')]['items']={};window[_0xafdf('0x73')][_0xafdf('0xd0')]=![];window[_0xafdf('0x73')]['buyButtonClicked']=![];window[_0xafdf('0x73')][_0xafdf('0xd1')]=![];var _0x5634ee=_0xafdf('0xd2');var _0x304191=function(){var _0x4aedc0,_0x314351,_0x313361,_0x4e1a9a;_0x4e1a9a=_0x27220b();if(window[_0xafdf('0x73')]['allowRecalculate']){_0x187a66(_0xafdf('0xd3'))['remove']();_0x187a66(_0xafdf('0xd4'))['removeClass'](_0xafdf('0xd5'));}for(var _0x303afc in window[_0xafdf('0x73')][_0xafdf('0x6d')]){_0x4aedc0=window['_QuatroDigital_AmountProduct'][_0xafdf('0x6d')][_0x303afc];if(typeof _0x4aedc0!==_0xafdf('0xf'))return;_0x313361=_0x187a66(_0xafdf('0xd6')+_0x4aedc0[_0xafdf('0xd7')]+']')[_0xafdf('0x0')]('li');if(!window[_0xafdf('0x73')]['allowRecalculate']&&_0x313361[_0xafdf('0x43')](_0xafdf('0xd3'))[_0xafdf('0x6')])continue;_0x314351=_0x187a66(_0x5634ee);_0x314351[_0xafdf('0x43')](_0xafdf('0xd8'))[_0xafdf('0x45')](_0x4aedc0['qtt']);var _0x29e750=_0x313361['find'](_0xafdf('0xd9'));if(_0x29e750[_0xafdf('0x6')])_0x29e750[_0xafdf('0xda')](_0x314351)[_0xafdf('0x7c')](_0xafdf('0xd5'));else _0x313361[_0xafdf('0xda')](_0x314351);}if(_0x4e1a9a)window['_QuatroDigital_AmountProduct'][_0xafdf('0xd0')]=![];};var _0x27220b=function(){if(!window[_0xafdf('0x73')][_0xafdf('0xd0')])return;var _0x4973a7=![],_0x31367a={};window['_QuatroDigital_AmountProduct'][_0xafdf('0x6d')]={};for(var _0x3fb03b in window[_0xafdf('0x17')]['getOrderForm'][_0xafdf('0x6d')]){if(typeof window[_0xafdf('0x17')][_0xafdf('0x72')][_0xafdf('0x6d')][_0x3fb03b]!==_0xafdf('0xf'))continue;var _0x17583f=window[_0xafdf('0x17')][_0xafdf('0x72')][_0xafdf('0x6d')][_0x3fb03b];if(typeof _0x17583f[_0xafdf('0xdb')]==='undefined'||_0x17583f[_0xafdf('0xdb')]===null||_0x17583f[_0xafdf('0xdb')]==='')continue;window[_0xafdf('0x73')][_0xafdf('0x6d')]['prod_'+_0x17583f['productId']]=window['_QuatroDigital_AmountProduct'][_0xafdf('0x6d')][_0xafdf('0xdc')+_0x17583f[_0xafdf('0xdb')]]||{};window[_0xafdf('0x73')]['items']['prod_'+_0x17583f[_0xafdf('0xdb')]][_0xafdf('0xd7')]=_0x17583f[_0xafdf('0xdb')];if(!_0x31367a[_0xafdf('0xdc')+_0x17583f[_0xafdf('0xdb')]])window[_0xafdf('0x73')]['items'][_0xafdf('0xdc')+_0x17583f[_0xafdf('0xdb')]][_0xafdf('0x69')]=0x0;window[_0xafdf('0x73')][_0xafdf('0x6d')]['prod_'+_0x17583f[_0xafdf('0xdb')]][_0xafdf('0x69')]=window[_0xafdf('0x73')]['items']['prod_'+_0x17583f['productId']][_0xafdf('0x69')]+_0x17583f[_0xafdf('0x98')];_0x4973a7=!![];_0x31367a[_0xafdf('0xdc')+_0x17583f[_0xafdf('0xdb')]]=!![];}return _0x4973a7;};window[_0xafdf('0x73')][_0xafdf('0x74')]=function(){window[_0xafdf('0x73')][_0xafdf('0xd0')]=!![];_0x304191[_0xafdf('0x67')](this);};_0x187a66(document)['ajaxStop'](function(){_0x304191[_0xafdf('0x67')](this);});}catch(_0x3e371a){if(typeof console!==_0xafdf('0x4')&&typeof console[_0xafdf('0xb')]==='function')console[_0xafdf('0xb')](_0xafdf('0xd'),_0x3e371a);}}(this));(function(){'use strict';try{var _0xf829=jQuery,_0x4df521;var _0x18a886='Quatro\x20Digital\x20-\x20Plus\x20Smart\x20Cart';var _0x331c6e=function(_0x1d6369,_0x485388){if('object'===typeof console&&_0xafdf('0x4')!==typeof console[_0xafdf('0xb')]&&'undefined'!==typeof console['info']&&'undefined'!==typeof console[_0xafdf('0x10')]){var _0x4b2d4b;_0xafdf('0xf')===typeof _0x1d6369?(_0x1d6369[_0xafdf('0x11')]('['+_0x18a886+']\x0a'),_0x4b2d4b=_0x1d6369):_0x4b2d4b=['['+_0x18a886+']\x0a'+_0x1d6369];if(_0xafdf('0x4')===typeof _0x485388||_0xafdf('0x12')!==_0x485388[_0xafdf('0x13')]()&&_0xafdf('0x14')!==_0x485388[_0xafdf('0x13')]())if(_0xafdf('0x4')!==typeof _0x485388&&_0xafdf('0x15')===_0x485388['toLowerCase']())try{console['info']['apply'](console,_0x4b2d4b);}catch(_0x159399){try{console[_0xafdf('0x15')](_0x4b2d4b[_0xafdf('0x7')]('\x0a'));}catch(_0x4fd81c){}}else try{console[_0xafdf('0xb')][_0xafdf('0x16')](console,_0x4b2d4b);}catch(_0x3fc4e7){try{console[_0xafdf('0xb')](_0x4b2d4b[_0xafdf('0x7')]('\x0a'));}catch(_0x1534c8){}}else try{console['warn'][_0xafdf('0x16')](console,_0x4b2d4b);}catch(_0xb6e2aa){try{console['warn'](_0x4b2d4b[_0xafdf('0x7')]('\x0a'));}catch(_0x3b19ae){}}}};var _0x2ac4d7={'selector':_0xafdf('0xdd'),'dropDown':{},'buyButton':{}};_0xf829[_0xafdf('0xde')]=function(_0x113edd){var _0x49b72c,_0x3f060c={};_0x4df521=_0xf829['extend'](!![],{},_0x2ac4d7,_0x113edd);_0x49b72c=_0xf829(_0x4df521[_0xafdf('0xdf')])['QD_dropDownCart'](_0x4df521[_0xafdf('0xe0')]);if(typeof _0x4df521[_0xafdf('0xe0')][_0xafdf('0x61')]!==_0xafdf('0x4')&&_0x4df521['dropDown'][_0xafdf('0x61')]===![])_0x3f060c[_0xafdf('0xe1')]=_0xf829(_0x4df521['selector'])[_0xafdf('0xe2')](_0x49b72c['fn'],_0x4df521['buyButton']);else _0x3f060c[_0xafdf('0xe1')]=_0xf829(_0x4df521[_0xafdf('0xdf')])['QD_buyButton'](_0x4df521[_0xafdf('0xe1')]);_0x3f060c['dropDown']=_0x49b72c;return _0x3f060c;};_0xf829['fn'][_0xafdf('0xe3')]=function(){if(typeof console==='object'&&typeof console[_0xafdf('0x15')]===_0xafdf('0xc'))console['info']('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0xf829[_0xafdf('0xe3')]=_0xf829['fn'][_0xafdf('0xe3')];}catch(_0x382c17){if(typeof console!==_0xafdf('0x4')&&typeof console['error']===_0xafdf('0xc'))console[_0xafdf('0xb')](_0xafdf('0xd'),_0x382c17);}}());