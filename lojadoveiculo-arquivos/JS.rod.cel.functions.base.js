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
			$(".footer-qd-v1-facebook-likebox").html('<div class="fb-page" data-href="https://www.facebook.com/" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/">Loja do Veículo</a></blockquote></div></div>');
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
		smartyQuantity: function() {
			$(".shelf-qd-v1-buy-button").QD_smartQuantity({
				buyButton: ".btn-add-buy-button-asynchronous"
			});
			// $(".shelf-qd-v1-buy-button .btn-add-buy-button-asynchronous").QD_smartQuantity();
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

				// setTimeout(function() {
				// 	modal.modal('hide');
				// }, 3000);
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
/* Quatro Digital Amazing Menu // 2.13 // Carlos Vinicius // Todos os direitos reservados */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(5(k){8 a,n,h,p;a=2w;H("5"!==J a.1b.P){n={U:"/6-1E-V",1j:5(){},1e:5(){}};8 l=5(a,b){H("1M"===J D&&"W"!==J D.Y&&"W"!==J D.1d&&"W"!==J D.1l){8 c;"1M"===J a?(a.2v("[1N 1O 1P]\\n"),c=a):c=["[1N 1O 1P]\\n"+a];H("W"===J b||"1W"!==b.S()&&"2x"!==b.S())H("W"!==J b&&"1d"===b.S())R{D.1d.1p(D,c)}O(g){R{D.1d(c.M("\\n"))}O(e){}}1F R{D.Y.1p(D,c)}O(g){R{D.Y(c.M("\\n"))}O(e){}}1F R{D.1l.1p(D,c)}O(g){R{D.1l(c.M("\\n"))}O(e){}}}};a.1b.1k=5(){8 f=a(i);f.G(5(b){a(i).w("6-7-K-"+b)});f.1f().w("6-7-1f");f.1H().w("6-7-1H");E f};a.1b.P=5(){};k=5(a){8 b={j:"2y%3%1m%3%B%3%C",2A:"2z%3%B%3%C",2u:"2t%3%1q%3%B%3%C",2o:"2n%3%1a%3%B%3%C",2p:"2q%3%10%3%B%3%C",2s:"2r%3%1z%3%1s%3%B%3%C","X%2B":"2%1m%3%1a%3%B%3%C","X%3":"%1m%3%10%3%B%3%C","X%3%":"2C%3%B%3%C",2M:"2m%3%B%3%C",2N:"2O%3%1q%3%B%3%C",2P:"2K%3%1a%3%B%3%C",2J:"2E%3%10%3%B%3%C",2D:"2F%3%1z%3%1s%3%B%3%C","X%3%2G":"2I%3%1a%3%B%3%C","X%3%2H":"2Q%3%10%3%B%3%C"};E 5(a){8 c,e,d,m;e=5(a){E a};d=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o","b"];a=a["d"+d[16]+"c"+d[17]+"m"+e(d[1])+"n"+d[13]]["l"+d[18]+"c"+d[0]+"27"+e("o")+"n"];c=5(a){E 22(20(a.14(/\\./g,"\\21").14(/[a-2l-Z]/g,5(a){E 2g.2f(("Z">=a?2e:2h)>=(a=a.2i(0)+13)?a:a-26)})))};8 q=c(a[[d[9],e("o"),d[12],d[e(13)]].M("")]);c=c((1c[["2k",e("2j"),"m",d[1],d[4].2d(),"2c"].M("")]||"---")+[".v",d[13],"e",e("x"),"23",e("25"),"24",d[1],".c",e("o"),"m.",d[19],"r"].M(""));28(8 f 29 b){H(c===f+b[f]||q===f+b[f]){m="2b"+d[17]+"e";2a}m="f"+d[0]+"2L"+e(d[1])+""}e=!1;-1<a[[d[12],"e",d[0],"3K",d[9]].M("")].3t("3D%1Z%1V%1S%1h%1i%1h%3A%3B%3C%1Y%3z%1Y%3y%1h%1i%1Z%1V%1S%3u%1i")&&(e=!0);E[m,e]}(a)}(1c);H(!3v(k[0]))E k[1]?l("\\2R\\3F\\1r \\3w\\Q\\3x\\3E\\1y\\Q\\1y\\1r \\3H\\Q\\3J\\Q \\3I\\3G\\3r\\Q L\\34\\Q!"):!1;p=5(f){8 b,c,g;g=f.F(".33");b=g.1J(".6-7-1n");c=g.1J(".6-7-1R");H(b.I||c.I)b.11().w("6-7-1n-1X"),c.11().w("6-7-1R-1X"),a.32({U:h.U,35:"36",38:5(e){8 d=a(e);b.G(5(){8 c,b;b=a(i);c=d.F("3s[37=\'"+b.1I("1x-1w-1v")+"\']");c.I&&(c.G(5(){a(i).1u(".31-1n").1C().1t(b)}),b.1B())}).w("6-7-1A-1D");c.G(5(){8 c={},b;b=a(i);d.F("30").G(5(){H(a(i).1Q().1g().S()==b.1I("1x-1w-1v").1g().S())E c=a(i),!1});c.I&&(c.G(5(){a(i).1u("[2U*=\'2T\']").1C().1t(b)}),b.1B())}).w("6-7-1A-1D")},Y:5(){l("N\\1T 2S 2V\\2W 2Z 2Y 2X 1U V. A U \'"+h.U+"\' 39.")},3a:5(){h.1e.1G(i);a(1c).1K("1L.7.1e",f)},3m:3l})};a.P=5(f){8 b=f.F("T[3k]").G(5(){8 c,b;c=a(i);H(!c.I)E l(["3n 1U V n\\1T 3o",f],"1W");c.F("K >T").11().w("6-7-3q-T");c.F("K").G(5(){8 b=a(i),c;c=b.15(":3p(T)");c.I&&b.w("6-7-3j-"+c.1f().1Q().1g().3i().14(/\\./g,"").14(/\\s/g,"-").S())});b=c.F(">K").1k();c.w("6-1E-V");b=b.F(">T");b.G(5(){8 b=a(i);b.F(">K").1k().w("6-7-3d");b.w("6-7-1o-V");b.11().w("6-7-1o")});b.w("6-7-1o");8 e=0,d=5(a){e+=1;a=a.15("K").15("*");a.I&&(a.w("6-7-3c-"+e),d(a))};d(c);c.3b(c.F("T")).G(5(){8 b=a(i);b.w("6-7-"+b.15("K").I+"-K")})});p(b);h.1j.1G(i);a(1c).1K("1L.7.1j",f)};a.1b.P=5(f){8 b=a(i);H(!b.I)E b;h=a.3e({},n,f);b.3f=3h a.P(a(i));E b};a(5(){a(".3g").P()})}})(i);',62,233,'|||25C2||function|qd|am|var||||||||||this||||||||||||||addClass|||||25A8pbz|25A8oe|console|return|find|each|if|length|typeof|li||join||catch|QD_amazingMenu|u0391|try|toLowerCase|ul|url|menu|undefined|jjj|error||25A8igrkpbzzreprfgnoyr|parent|||replace|children|||||25A8igrkpbzzreprorgn|fn|window|info|ajaxCallback|first|trim|D1|82|callback|qdAmAddNdx|warn|25A8yvienevnpevfgn|banner|dropdown|apply|25A8igrkpbzzrepr|u0472|25A8dhngebqvtvgny|insertBefore|getParent|value|qdam|data|u2202|25A8igrk|content|hide|clone|loaded|amazing|else|call|last|attr|filter|trigger|QuatroDigital|object|QD|Amazing|Menu|text|collection|84|u00e3o|do|B8|alerta|wrapper|C2|E0|encodeURIComponent|u00a8|escape|co|erc|mm||ti|for|in|break|tr|ite|toUpperCase|90|fromCharCode|String|122|charCodeAt|no|js|zA|npevfgn|nevnpevfgn|yvie|yvien|evnpevfgn|vnpevfgn|yviene|enevnpevfgn|yvi|unshift|jQuery|aviso|jj|ienevnpevfgn|yv|25C|25A8qriyvienevnpevfgn|qriyvienevnpev|vfgn|fgn|25A8qr|25A8qri|iyvienevnpevfgn|qriyvienevnpe|evfgn|ls|qriyvienev|qriyvienevn|pevfgn|qriyvienevnp|yvienevnpevfgn|u0e17|foi|colunas|class|poss|u00edvel|dados|os|obter|h2|box|qdAjax|qd_am_code|u0472J|dataType|html|alt|success|falho|complete|add|level|column|extend|exec|qd_amazing_menu_auto|new|replaceSpecialChars|elem|itemscope|3E3|clearQueueDelay|UL|encontrada|not|has|u01ac|img|indexOf|C5|eval|u221a|u2113|A1|A1g|8F|CF|83d|qu|u00a1|u00c3|u0abd|u03a1|u0aef|u0ae8|rc'.split('|'),0,{}));
/* * jQuery BBQ: Back Button & Query Library - v1.2.1 - 2/17/2010 * http://benalman.com/projects/jquery-bbq-plugin/ * * Copyright (c) 2010 "Cowboy" Ben Alman * Dual licensed under the MIT and GPL licenses. * http://benalman.com/about/license/ */
(function($,p){var i,m=Array.prototype.slice,r=decodeURIComponent,a=$.param,c,l,v,b=$.bbq=$.bbq||{},q,u,j,e=$.event.special,d="hashchange",A="querystring",D="fragment",y="elemUrlAttr",g="location",k="href",t="src",x=/^.*\?|#.*$/g,w=/^.*\#/,h,C={};function E(F){return typeof F==="string"}function B(G){var F=m.call(arguments,1);return function(){return G.apply(this,F.concat(m.call(arguments)))}}function n(F){return F.replace(/^[^#]*#?(.*)$/,"$1")}function o(F){return F.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/,"$1")}function f(H,M,F,I,G){var O,L,K,N,J;if(I!==i){K=F.match(H?/^([^#]*)\#?(.*)$/:/^([^#?]*)\??([^#]*)(#?.*)/);J=K[3]||"";if(G===2&&E(I)){L=I.replace(H?w:x,"")}else{N=l(K[2]);I=E(I)?l[H?D:A](I):I;L=G===2?I:G===1?$.extend({},I,N):$.extend({},N,I);L=a(L);if(H){L=L.replace(h,r)}}O=K[1]+(H?"#":L||!K[1]?"?":"")+L+J}else{O=M(F!==i?F:p[g][k])}return O}a[A]=B(f,0,o);a[D]=c=B(f,1,n);c.noEscape=function(G){G=G||"";var F=$.map(G.split(""),encodeURIComponent);h=new RegExp(F.join("|"),"g")};c.noEscape(",/");$.deparam=l=function(I,F){var H={},G={"true":!0,"false":!1,"null":null};$.each(I.replace(/\+/g," ").split("&"),function(L,Q){var K=Q.split("="),P=r(K[0]),J,O=H,M=0,R=P.split("]["),N=R.length-1;if(/\[/.test(R[0])&&/\]$/.test(R[N])){R[N]=R[N].replace(/\]$/,"");R=R.shift().split("[").concat(R);N=R.length-1}else{N=0}if(K.length===2){J=r(K[1]);if(F){J=J&&!isNaN(J)?+J:J==="undefined"?i:G[J]!==i?G[J]:J}if(N){for(;M<=N;M++){P=R[M]===""?O.length:R[M];O=O[P]=M<N?O[P]||(R[M+1]&&isNaN(R[M+1])?{}:[]):J}}else{if($.isArray(H[P])){H[P].push(J)}else{if(H[P]!==i){H[P]=[H[P],J]}else{H[P]=J}}}}else{if(P){H[P]=F?i:""}}});return H};function z(H,F,G){if(F===i||typeof F==="boolean"){G=F;F=a[H?D:A]()}else{F=E(F)?F.replace(H?w:x,""):F}return l(F,G)}l[A]=B(z,0);l[D]=v=B(z,1);$[y]||($[y]=function(F){return $.extend(C,F)})({a:k,base:k,iframe:t,img:t,input:t,form:"action",link:k,script:t});j=$[y];function s(I,G,H,F){if(!E(H)&&typeof H!=="object"){F=H;H=G;G=i}return this.each(function(){var L=$(this),J=G||j()[(this.nodeName||"").toLowerCase()]||"",K=J&&L.attr(J)||"";L.attr(J,a[I](K,H,F))})}$.fn[A]=B(s,A);$.fn[D]=B(s,D);b.pushState=q=function(I,F){if(E(I)&&/^#/.test(I)&&F===i){F=2}var H=I!==i,G=c(p[g][k],H?I:{},H?F:2);p[g][k]=G+(/#/.test(G)?"":"#")};b.getState=u=function(F,G){return F===i||typeof F==="boolean"?v(F):v(G)[F]};b.removeState=function(F){var G={};if(F!==i){G=u();$.each($.isArray(F)?F:arguments,function(I,H){delete G[H]})}q(G,2)};e[d]=$.extend(e[d],{add:function(F){var H;function G(J){var I=J[D]=c();J.getState=function(K,L){return K===i||typeof K==="boolean"?l(I,K):l(I,L)[K]};H.apply(this,arguments)}if($.isFunction(F)){H=F;return G}else{H=F.handler;F.handler=G}}})})(jQuery,this);
/* jQuery Cookie Plugin v1.4.1 // https://github.com/carhartl/jquery-cookie // Copyright 2013 Klaus Hartl // Released under the MIT license */
(function(c){"function"===typeof define&&define.amd?define(["jquery"],c):"object"===typeof exports?c(require("jquery")):c(jQuery)})(function(c){function n(b){b=f.json?JSON.stringify(b):String(b);return f.raw?b:encodeURIComponent(b)}function m(b,e){var a;if(f.raw)a=b;else a:{var d=b;0===d.indexOf('"')&&(d=d.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{d=decodeURIComponent(d.replace(l," "));a=f.json?JSON.parse(d):d;break a}catch(g){}a=void 0}return c.isFunction(e)?e(a):a}var l=/\+/g,f=
c.cookie=function(b,e,a){if(void 0!==e&&!c.isFunction(e)){a=c.extend({},f.defaults,a);if("number"===typeof a.expires){var d=a.expires,g=a.expires=new Date;g.setTime(+g+864E5*d)}return document.cookie=[f.raw?b:encodeURIComponent(b),"=",n(e),a.expires?"; expires="+a.expires.toUTCString():"",a.path?"; path="+a.path:"",a.domain?"; domain="+a.domain:"",a.secure?"; secure":""].join("")}a=b?void 0:{};for(var d=document.cookie?document.cookie.split("; "):[],g=0,l=d.length;g<l;g++){var h=d[g].split("="),k;
k=h.shift();k=f.raw?k:decodeURIComponent(k);h=h.join("=");if(b&&b===k){a=m(h,e);break}b||void 0===(h=m(h))||(a[k]=h)}return a};f.defaults={};c.removeCookie=function(b,e){if(void 0===c.cookie(b))return!1;c.cookie(b,"",c.extend({},e,{expires:-1}));return!c.cookie(b)}});
/* Quatro Digital - Smart Quantity // 1.9 // Carlos Vinicius // Todos os direitos reservados */
(function(t){var d=jQuery;if("function"!==typeof d.fn.QD_smartQuantity){var f=function(d,b){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var e;"object"===typeof d?(d.unshift("[Quatro Digital - Smart Quantity]\n"),e=d):e=["[Quatro Digital - Smart Quantity]\n"+d];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
e)}catch(f){console.info(e.join("\n"))}else try{console.error.apply(console,e)}catch(f){console.error(e.join("\n"))}else try{console.warn.apply(console,e)}catch(f){console.warn(e.join("\n"))}}},m={buyButton:".buy-button",qttInput:".qd-sq-quantity",btnMore:".qd-sq-more",btnMinus:".qd-sq-minus",initialValue:1,setQuantityByUrl:!0},n=function(h,b){function e(c,g,a){b.setQuantityByUrl?c.val(((location.search||"").match(p)||[b.initialValue]).pop()):c.val(b.initialValue);c.change(function(){try{var c=d(this),
a=parseInt(c.val().replace(q,""));!isNaN(a)&&a>b.initialValue?c.val(a):c.val(b.initialValue);c.trigger("QuatroDigital.sq_change",this)}catch(g){f(g.message)}});c.focusin(function(){d(this).trigger("QuatroDigital.sq_focusin",this)});g.click(function(a){a.preventDefault();c.val((parseInt(c.val())||b.initialValue)+1).change()});a.click(function(a){a.preventDefault();c.val((parseInt(c.val())||b.initialValue+1)-1).change()});c.change()}function m(c,g,a){c.on("QuatroDigital.sq_change",function(){(d(this).val()||
0)<=b.initialValue?(a.addClass("qd-sq-inactive"),g.removeClass("qd-sq-inactive")):(g.addClass("qd-sq-inactive"),a.removeClass("qd-sq-inactive"))})}function n(c,d){c.on("QuatroDigital.sq_change",function(){try{if(!(d[0].hostname||"").length)return f("A quantidade n\u00e3o foi inserida no bt comprar pois o mesmo n\u00e3o possui uma URL","info");var a=d[0].search||"";-1<a.toLowerCase().indexOf("qty=")?d[0].search=a.replace(l,"qty="+(parseInt(c.val())||("number"==typeof b.initialValue?b.initialValue:
1))+"&"):d[0].search="qty="+(parseInt(c.val())||("number"==typeof b.initialValue?b.initialValue:1))+"&"+(d[0].search||"").replace(l,"");var e=((d.attr("href")||"").match(r)||[""]).pop()+"";c.attr("data-sku-id",e);if(e.length&&"object"===typeof skuJson&&!c.attr("data-sku-price"))for(a=0;a<skuJson.skus.length;a++)skuJson.skus[a].sku==e&&c.attr("data-sku-price",skuJson.skus[a].bestPrice)}catch(k){f(k.message)}})}var q=/[^0-9-]/gi,p=/qty\=([0-9]+)/i,r=/sku\=([0-9]+)/i,l=/qty\=[0-9]+\&?/ig;h.each(function(){try{var c=
d(this),g=c.find(b.buyButton),a=c.find(b.qttInput),h=c.find(b.btnMore),k=c.find(b.btnMinus);if(!g.length&&null!==b.buyButton||!a.length)return f("O plugin parou por aqui! N\u00e3o foram encontrados o bot\u00e3o comprar e o campo de quantidade","alerta");if(a.is(".qd-sq-on"))return f(["Execu\u00e7\u00e3o ignorada pois este input j\u00e1 possui o plugin aplicado. Input: ",a],"info");a.addClass("qd-sq-on");m(a,h,k);null!==b.buyButton&&n(a,g);e(a,h,k);d(window).on("vtex.sku.selected",function(){a.change()})}catch(l){f(l.message)}})};
d.fn.QD_smartQuantity=function(f){var b=d(this);b.qdPlugin=new n(b,d.extend({},m,f));d(window).trigger("QuatroDigital.sq_callback");return b};d(function(){d(".qd_auto_smart_quantity").QD_smartQuantity()})}})(this);
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
/* Quatro Digital Plus Smart Cart // 6.7 // Carlos Vinicius // Todos os direitos reservados */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(8(){1g{i.1r=i.1r||{},i.1r.1W=i.1r.1W||$.5f()}1b(n){"U"!==B P&&"8"===B P.1c&&P.1c("2B! ",n.3e)}})();(8(n){1g{F a=35,d=8(a,b){V("1t"===B P&&"U"!==B P.1c&&"U"!==B P.1J&&"U"!==B P.2J){F c;"1t"===B a?(a.5g("[2L 36 - 2g 2U]\\n"),c=a):c=["[2L 36 - 2g 2U]\\n"+a];V("U"===B b||"3n"!==b.2F()&&"3P"!==b.2F())V("U"!==B b&&"1J"===b.2F())1g{P.1J.2D(P,c)}1b(v){1g{P.1J(c.1C("\\n"))}1b(w){}}1H 1g{P.1c.2D(P,c)}1b(v){1g{P.1c(c.1C("\\n"))}1b(w){}}1H 1g{P.2J.2D(P,c)}1b(v){1g{P.2J(c.1C("\\n"))}1b(w){}}}};i.H=i.H||{};i.H.2m=!0;a.1R=8(){};a.1i.1R=8(){T{1i:3d a}};F b=8(a){F b={j:"5c%C%33%C%Y%C%10",5b:"57%C%Y%C%10",56:"5a%C%4q%C%Y%C%10",5i:"5j%C%2i%C%Y%C%10",5r:"5s%C%2q%C%Y%C%10",5t:"5q%C%4t%C%4u%C%Y%C%10","22%5p":"2%33%C%2i%C%Y%C%10","22%C":"%33%C%2q%C%Y%C%10","22%C%":"5l%C%Y%C%10",5k:"5m%C%Y%C%10",5n:"55%C%4q%C%Y%C%10",50:"4M%C%2i%C%Y%C%10",4P:"4L%C%2q%C%Y%C%10",4K:"4J%C%4t%C%4u%C%Y%C%10","22%C%4X":"4T%C%2i%C%Y%C%10","22%C%69":"60%C%2q%C%Y%C%10"};T 8(a){F c,d,f,g;d=8(a){T a};f=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o","b"];a=a["d"+f[16]+"c"+f[17]+"m"+d(f[1])+"n"+f[13]]["l"+f[18]+"c"+f[0]+"6k"+d("o")+"n"];c=8(a){T 6l(6d(a.1u(/\\./g,"\\6e").1u(/[a-6g-Z]/g,8(a){T 5E.5H(("Z">=a?5I:5z)>=(a=a.5B(0)+13)?a:a-26)})))};F l=c(a[[f[9],d("o"),f[12],f[d(13)]].1C("")]);c=c((i[["1I",d("2A"),"m",f[1],f[4].5J(),"5T"].1C("")]||"---")+[".v",f[13],"e",d("x"),"5U",d("5V"),"5R",f[1],".c",d("o"),"m.",f[19],"r"].1C(""));21(F m 2s b){V(c===m+b[m]||l===m+b[m]){g="66"+f[17]+"e";5P}g="f"+f[0]+"5N"+d(f[1])+""}d=!1;-1<a[[f[12],"e",f[0],"5L",f[9]].1C("")].6j("6b%4C%3C%84%2T%82%2T%5Y%65%51%4F%4R%4F%4O%2T%82%4C%3C%84%5v%82")&&(d=!0);T[g,d]}(a)}(i);V(!4I(b[0]))T b[1]?d("\\54\\53\\3k \\4S\\1N\\61\\62\\3j\\1N\\3j\\3k \\5y\\1N\\5Q\\1N \\5M\\5O\\5S\\1N L\\5K\\1N!"):!1;a.1R=8(b,m){F c,l,n,f,g,r,u;r=a(b);V(!r.1z)T r;c=a.4o(!0,{},{2a:!0,15:{3B:"5A 38 5x",3y:"5C 5D",1o:"<D><I>4v: #G</I><I>5G: #2X</I></D><D><I>5F: #1E</I><I>5W: #3c</I></D>",2f:"5X 1O 6f n\\S 4s 6c 4y.",3z:"6h 6i",3M:\'<3u 21="6-7-41">6m 4H: </3u><29 3v="6a" 1L="6-7-41" 5Z="3R" />\'},2C:63,24:!0,39:8(a){T a.39||a.64},1W:8(){},2h:8(){}},m);a("");g=K;V(c.24){F x=!1;"U"===B i.2n&&(d("A 42 3b.1I n\\S 1k 3Z. o 68 3X\\2V 67 2A 5w"),a.6n({5o:"//3w.1h.2K.3x/1h.1I/1.0.0/1h.3E.1I",4W:!1,4V:"4U",1c:8(){d("N\\S 1k 1y\\1x 2Y \'//3w.1h.2K.3x/1h.1I/1.0.0/1h.3E.1I\' o 2g n\\S 4Y\\2V 52.");x=!0}}));V(x)T d("A 4Z\\1G\\S 1A 2g 4Q\\2V 4N 5u!")}F t;V("1t"===B i.2n&&"U"!==B i.2n.1p)t=i.2n.1p;1H V("1t"===B 1h&&"1t"===B 1h.1p&&"U"!==B 1h.1p.40)t=3d 1h.1p.40;1H T d("N\\S 1k 3Z a 42 3b.1I");g.3J=\'<D E="6-7-1B 6-7-3a"><D E="6-7-4z"><D E="4h"></D><D E="6-7-59"><D E="6-7-2f"><p></p></D><D E="6-7-3p 6-7-58"><a 1w="#" E="6-7-3Y"></a><D E="6-7-2M"> <D E="6-7-2O"></D> </D><I E="6-7-5h"></I><a 1w="#" E="6-7-45"></a></D><D E="6-7-3p 6-7-1J"><D E="6-7-1E"></D><D E="6-7-3D"></D><D E="6-7-5d"><a 1w="/1p/#/1Z" E="6-7-3A"></a><a 1w="#" E="2W"></a><a 1w="/1p/#/5e" E="6-7-1p"></a></D></D></D></D></D>\';l=8(e){a(K).2G(e);e.J(".2W, .4h").1Q(a(".6M")).1f("1V.2H",8(){r.W("6-2x-3T");a(2l.2c).W("6-2x-3Q")});a(2l).7J("2v.2H").7K("2v.2H",8(e){27==e.4b&&(r.W("6-2x-3T"),a(2l.2c).W("6-2x-3Q"))});F b=e.J(".6-7-2M");e.J(".6-7-3Y").1f("1V.7I",8(){g.2z("-",1l 0,1l 0,b);T!1});e.J(".6-7-45").1f("1V.7H",8(){g.2z(1l 0,1l 0,1l 0,b);T!1});e.J(".6-7-1E 29").1d("").1f("2v.7E",8(){g.4G(a(K))});V(c.2a){F d=0;a(K).1f("7F.3O",8(){F e=8(){i.H.2m&&(g.1T(),i.H.2m=!1,a.1i.2k(!0),g.23())};d=7G(8(){e()},7L);e()});a(K).1f("7M.3O",8(){7R(d)})}};n=8(e){e=a(e);c.15.1o=c.15.1o.1u("#2X",\'<I E="6-7-3I"></I>\');c.15.1o=c.15.1o.1u("#G",\'<I E="6-7-3H"></I>\');c.15.1o=c.15.1o.1u("#1E",\'<I E="6-7-3G"></I>\');c.15.1o=c.15.1o.1u("#3c",\'<I E="6-7-3F"></I>\');e.J(".6-7-3A").1m(c.15.3B);e.J(".2W").1m(c.15.3z);e.J(".6-7-1p").1m(c.15.3y);e.J(".6-7-3D").1m(c.15.1o);e.J(".6-7-1E").1m(c.15.3M);e.J(".6-7-2f p").1m(c.15.2f);T e}(K.3J);f=0;r.2b(8(){0<f?l.1j(K,n.7S()):l.1j(K,n);f++});i.1r.1W.1Q(8(){a(".6-7-3I").1m(i.1r.3c||"--");a(".6-7-3H").1m(i.1r.1K||"0");a(".6-7-3G").1m(i.1r.1E||"--");a(".6-7-3F").1m(i.1r.7Q||"--")});u=8(a,c){V("U"===B a.G)T d("N\\S 1k 1y\\1x 2Y 1P G 4e 7P\\1G\\S");g.3K.1j(K,c)};g.1T=8(e,b){F p;a(".6-7-1B").W("6-7-3L");c.24?(p=8(e){i.H.Q=e;u(e,b);"U"!==B i.M&&"8"===B i.M.1F&&i.M.1F.1j(K);a(".6-7-1B").14("6-7-3L")},"U"!==B i.H.Q?(p(i.H.Q),"8"===B e&&e(i.H.Q)):a.7N(["G","2P","2e"],{2d:8(a){p.1j(K,a);"8"===B e&&e(a)},2y:8(a){d(["N\\S 1k 1y\\1x 2Y 1P 1Y 1A 1O",a])}})):2E("7O m\\2w 20 2u!")};g.23=8(){F e=a(".6-7-1B");e.J(".6-7-37").1z?e.W("6-7-3a"):e.14("6-7-3a")};g.3K=8(e){F b=a(".6-7-2O");b.2N();b.2b(8(){F b=a(K),p,h,k,f,l=a(""),q;21(q 2s i.H.Q.G)"1t"===B i.H.Q.G[q]&&(k=i.H.Q.G[q],h=a(\'<D E="6-7-37 7D"><D E="6-7-28 6-7-7C 6-7-7r"><D E="6-7-7s"><7q 3m="" E="6-7-44" /><I E="6-7-7p"></I></D></D><D E="6-7-28 6-7-7m 6-7-43"></D><D E="6-7-28 6-7-7n 6-7-46"></D><D E="6-7-28 6-7-7o 6-7-7t"><D E="6-7-3i 3N"><a 1w="#" E="6-7-30"></a><29 3v="7u" E="6-7-1s" /><a 1w="#" E="6-7-31"></a><I E="6-7-7A"></I></D></D><D E="6-7-28 6-7-7U 6-7-7z"><D E="6-7-7y 3N"><a 1w="#" E="6-7-25"></a><I E="6-7-7v"></I></D></D></D>\'),h.1e({"X-11":k.1L,"X-11-1q":q}),h.14(".6-7-"+k.7w),h.J(".6-7-43").2G(c.39(k)),h.J(".6-7-46").2G(2Q(k.2p)?k.2p:0==k.2p?"7x\\7T":"R$ "+88(k.2p/7Z,2,",",".")),h.J(".6-7-1s").1e({"X-11":k.1L,"X-11-1q":q}).1d(k.1s),h.J(".6-7-25").1e({"X-11":k.1L,"X-11-1q":q}),g.3l(k.1L,h.J(".6-7-44"),k.7Y),h.J(".6-7-31,.6-7-30").1e({"X-11":k.1L,"X-11-1q":q}),h.7X(b),l=l.1Q(h));1g{F m=b.4w(".6-7-1B").J(".6-7-1E 29");m.1z&&""==m.1d()&&m.1d(i.H.Q.2e.7V.4D)}1b(y){d("4B 38 3X 7W o 3R 2K 80 89 1Y 1A 1p. 4d: "+y.3e,"3P")}g.3s();g.23();e&&e.3S&&8(){f=l.81("[X-11=\'"+e.3S+"\']");f.1z&&(p=0,l.2b(8(){F e=a(K);V(e.87(f))T!1;p+=e.6o()}),g.2z(1l 0,1l 0,p,b.1Q(b.86())),l.W("6-7-3W"),8(a){a.14("6-7-3V");a.14("6-7-3W");3U(8(){a.W("6-7-3V")},c.2C)}(f))}()});(8(){H.Q.G.1z?(a("2c").W("6-7-1Z-2N").14("6-7-1Z-3h 6-7-47-1Q-3g"),3U(8(){a("2c").W("6-7-47-1Q-3g")},c.2C)):a("2c").W("6-7-1Z-3h").14("6-7-1Z-2N")})();"8"===B c.2h?c.2h.1j(K):d("2h n\\S \\1M 2R 4m\\1G\\S")};g.3l=8(e,b,c){8 p(){b.W("6-3r").85(8(){a(K).14("6-3r")}).1e("3m",c)}c?p():2Q(e)?d("N\\S 1k 83 2R 7B 4x a 7k e 6I 3o 2I","3n"):2E("4f\\1G\\S 2Z \\1M 3o m\\2w 2u. 6J o 6H.")};g.3s=8(){F e,b,c,d;e=8(b,e){F c,k,d,h;d=a(b);c=d.1e("X-11");h=d.1e("X-11-1q");c&&(k=2S(d.1d())||1,g.2j([c,h],k,k+1,8(a){d.1d(a);"8"===B e&&e()}))};c=8(b,e){F c,d,k,h;k=a(b);c=k.1e("X-11");h=k.1e("X-11-1q");c&&(d=2S(k.1d())||2,g.2j([c,h],d,d-1,8(a){k.1d(a);"8"===B e&&e()}))};d=8(b,e){F c,d,k,h;k=a(b);c=k.1e("X-11");h=k.1e("X-11-1q");c&&(d=2S(k.1d())||1,g.2j([c,h],1,d,8(a){k.1d(a);"8"===B e&&e()}))};b=a(".6-7-3i:6G(.3q)");b.14("3q").2b(8(){F h=a(K);h.J(".6-7-31").1f("1V.6E",8(a){a.3t();b.14("6-1n");e(h.J(".6-7-1s"),8(){b.W("6-1n")})});h.J(".6-7-30").1f("1V.6F",8(a){a.3t();b.14("6-1n");c(h.J(".6-7-1s"),8(){b.W("6-1n")})});h.J(".6-7-1s").1f("6K.3f",8(){b.14("6-1n");d(K,8(){b.W("6-1n")})});h.J(".6-7-1s").1f("2v.3f",8(a){13==a.4b&&(b.14("6-1n"),d(K,8(){b.W("6-1n")}))})});a(".6-7-37").2b(8(){F b=a(K);b.J(".6-7-25").1f("1V.6L",8(){b.14("6-1n");g.4A(a(K),8(a){a?b.4a(!0).6Q(8(){b.25();g.23()}):b.W("6-1n")});T!1})})};g.4G=8(a){F b=a.1d(),b=b.1u(/[^0-9\\-]/g,""),b=b.1u(/([0-9]{5})\\-?([0-9])([0-9]{2})?/g,"$1-$2$3"),b=b.1u(/(.{9}).*/g,"$1");a.1d(b);9<=b.1z&&(a.X("4E")!=b&&t.6P({4D:b,6O:"7l"}).2d(8(a){i.H.Q=a;g.1T()}).2y(8(a){d(["N\\S 1k 1y\\1x 6N o 4H",a]);6D()}),a.X("4E",b))};g.2j=8(b,f,l,m){8 e(b){b="4i"!==B b?!1:b;g.1T();i.H.2m=!1;g.23();"U"!==B i.M&&"8"===B i.M.1F&&i.M.1F.1j(K);"8"===B 2r&&2r();a.1i.2k(!0,1l 0,b);"8"===B m&&m(f)}l=l||1;V(1>l)T f;V(c.24){V("U"===B i.H.Q.G[b[1]])T d("N\\S 1k 1y\\1x 48 1P 1Y 1A 1U. A 4j 4k \\1M 4l 4g 2I: i.H.Q.G["+b[1]+"]"),f;i.H.Q.G[b[1]].1s=l;i.H.Q.G[b[1]].1q=b[1];t.6C([i.H.Q.G[b[1]]],["G","2P","2e"]).2d(8(a){i.H.Q=a;e(!0)}).2y(8(a){d(["N\\S 1k 1y\\1x 4c a 6t 6u 6s 2A 1O",a]);e()})}1H d("6r\\1G\\S 20 m\\2w 20 2u")};g.4A=8(b,g){8 e(b){b="4i"!==B b?!1:b;"U"!==B i.M&&"8"===B i.M.1F&&i.M.1F.1j(K);"8"===B 2r&&2r();a.1i.2k(!0,1l 0,b);"8"===B g&&g(f)}F f=!1,h=a(b).1e("X-11-1q");V(c.24){V("U"===B i.H.Q.G[h])T d("N\\S 1k 1y\\1x 48 1P 1Y 1A 1U. A 4j 4k \\1M 4l 4g 2I: i.H.Q.G["+h+"]"),f;i.H.Q.G[h].1q=h;t.6p([i.H.Q.G[h]],["G","2P","2e"]).2d(8(a){f=!0;i.H.Q=a;u(a);e(!0)}).2y(8(a){d(["N\\S 1k 1y\\1x 6q o 1U 1A 1O",a]);e()})}1H 2E("4f\\1G\\S, 2Z m\\2w 20 2u.")};g.2z=8(b,c,d,f){f=f||a(".6-7-2M, .6-7-2O");b=b||"+";c=c||.9*f.6v();f.4a(!0,!0).6w({6B:2Q(d)?b+"="+c+"6A":d})};c.2a||(g.1T(),a.1i.2k(!0));a(i).1f("6z.49 6x.1h.49",8(){1g{i.H.Q=1l 0,g.1T()}1b(e){d("4B 38 4c 1P 1Y 1A 1O a 6y 1A 6R 4e 3b. 4d: "+e.3e,"6S")}});"8"===B c.1W?c.1W.1j(K):d("7c n\\S \\1M 2R 4m\\1G\\S")};a.1i.1R=8(b){F d;d=a(K);d.1i=3d a.1R(K,b);T d}}1b(l){"U"!==B P&&"8"===B P.1c&&P.1c("2B! ",l)}})(K);(8(n){1g{F a=35;i.M=i.M||{};i.M.G={};i.M.1S=!1;i.M.7b=!1;i.M.7a=!1;F d=8(){F b,d,m,c;V(i.M.1S){d=!1;m={};i.M.G={};21(c 2s i.H.Q.G)"1t"===B i.H.Q.G[c]&&(b=i.H.Q.G[c],"U"!==B b.1a&&78!==b.1a&&""!==b.1a&&(i.M.G["1D"+b.1a]=i.M.G["1D"+b.1a]||{},i.M.G["1D"+b.1a].4n=b.1a,m["1D"+b.1a]||(i.M.G["1D"+b.1a].1K=0),i.M.G["1D"+b.1a].1K+=b.1s,d=!0,m["1D"+b.1a]=!0));c=d}1H c=1l 0;i.M.1S&&(a(".6-1v-1B").25(),a(".6-1v-1U-34").W("6-1v-1U-34"));21(F n 2s i.M.G){b=i.M.G[n];V("1t"!==B b)T;m=a("29.6-1a[2X="+b.4n+"]").4w("79");V(i.M.1S||!m.J(".6-1v-1B").1z)d=a(\'<I E="6-1v-1B" 7d="4v 2A 1O 4x 2Z 4y."><I E="6-1v-4z"><I E="6-1v-1K"></I></I></I>\'),d.J(".6-1v-1K").1m(b.1K),b=m.J(".7e"),b.1z?b.4p(d).14("6-1v-1U-34"):m.4p(d)}c&&(i.M.1S=!1)};i.M.1F=8(){i.M.1S=!0;d.1j(K)};a(2l).7j(8(){d.1j(K)})}1b(b){"U"!==B P&&"8"===B P.1c&&P.1c("2B! ",b)}})(K);(8(){1g{F n=35,a,d={2o:".7i",1X:{},2t:{}};n.7h=8(b){F l={};a=n.4o(!0,{},d,b);b=n(a.2o).1R(a.1X);l.2t="U"!==B a.1X.2a&&!1===a.1X.2a?n(a.2o).4r(b.1i,a.2t):n(a.2o).4r(a.2t);l.1X=b;T l};n.1i.32=8(){"1t"===B P&&"8"===B P.1J&&P.1J("O 7f 2U n\\S \\1M 7g 77 76 6X. A 6Y\\S 6W 6V\\6T 20 6U 4s 6Z\\70 75 e 74 1P 73 71 \\72 2L 36.")};n.32=n.1i.32}1b(b){"U"!==B P&&"8"===B P.1c&&P.1c("2B! ",b)}})();',62,506,'||||||qd|ddc|function||||||||||window|||||||||||||||||||typeof|25C2|div|class|var|items|_QuatroDigital_DropDown|span|find|this||_QuatroDigital_AmountProduct|||console|getOrderForm||u00e3o|return|undefined|if|removeClass|data|25A8pbz||25A8oe|sku|||addClass|texts|||||productId|catch|error|val|attr|bind|try|vtex|fn|call|foi|void|html|loading|cartTotal|checkout|index|_QuatroDigital_CartData|quantity|object|replace|bap|href|u00edvel|poss|length|do|wrapper|join|prod_|shipping|exec|u00e7|else|js|info|qtt|id|u00e9|u0391|carrinho|os|add|QD_dropDownCart|allowRecalculate|getCartInfoByUrl|item|click|callback|dropDown|dados|cart|esta|for|jjj|cartIsEmpty|smartCheckout|remove|||prodCell|input|updateOnlyHover|each|body|done|shippingData|emptyCart|DropDown|callbackProductsList|25A8igrkpbzzreprorgn|changeQantity|simpleCart|document|allowUpdate|vtexjs|selector|sellingPrice|25A8igrkpbzzreprfgnoyr|adminCart|in|buyButton|descontinuado|keyup|u00e9todo|bb|fail|scrollCart|no|Oooops|timeRemoveNewItemClass|apply|alert|toLowerCase|append|qd_ddc_closeFn|SKU|warn|com|Quatro|prodWrapper|empty|prodWrapper2|totalizers|isNaN|uma|parseInt|D1|Cart|u00e1|qd_ddc_continueShopping|value|obter|este|quantityMinus|quantityMore|smartCart|25A8yvienevnpevfgn|added|jQuery|Digital|prodRow|ao|skuName|noItems|VTEX|total|new|message|qd_ddc_change|time|rendered|prodQttWrapper|u2202|u0472|insertProdImg|src|alerta|um|row|qd_on|loaded|actionButtons|preventDefault|label|type|io|br|linkCheckout|continueShopping|viewCart|linkCart|B8|infoTotal|min|infoAllTotal|infoTotalShipping|infoTotalItems|infoTotalValue|cartContainer|renderProductsList|prodLoaded|shippingForm|clearfix|qd_ddc_hover|aviso|lightBoxBodyProdAdd|CEP|lastSku|lightBoxProdAdd|setTimeout|lastAdded|lastAddedFixed|tentar|scrollUp|encontrada|SDK|cep|biblioteca|prodName|image|scrollDown|prodPrice|product|localizar|qdDdcVtex|stop|keyCode|atualizar|Detalhes|da|Aten|pelo|qd_ddc_lightBoxClose|boolean|chave|buscada|composta|fun|prodId|extend|prepend|25A8igrkpbzzrepr|QD_buyButton|tem|25A8igrk|25A8dhngebqvtvgny|Itens|getParent|para|produto|wrapper2|removeProduct|Problemas|E0|postalCode|qdDdcLastPostalCode|C2|shippingCalculate|frete|eval|fgn|qriyvienevnpev|vfgn|evfgn|por|A1|qriyvienevnpe|par|A1g|u221a|iyvienevnpevfgn|script|dataType|async|25A8qr|ser|execu|qriyvienevnp|83d|executado|u00c3|u0e17|pevfgn|yvi|ienevnpevfgn|products|wrapper3|enevnpevfgn|yv|jj|infoBts|orderform|Callbacks|unshift|prodLoading|yvie|nevnpevfgn|qriyvienev|25A8qriyvienevnpevfgn|npevfgn|qriyvienevn|url|25C|vnpevfgn|yvien|evnpevfgn|yviene|aqui|C5|CDN|Carrinho|u03a1|122|Ir|charCodeAt|Finalizar|Compra|String|Frete|Subtotal|fromCharCode|90|toUpperCase|u0472J|rc|u0aef|ls|u0abd|break|u0ae8|erc|u01ac|ite|co|mm|Total|Seu|8F|placeholder|yvienevnpevfgn|u2113|u00a1|5E3|name|CF|tr|buscar|Script|25A8qri|tel|qu|nenhum|encodeURIComponent|u00a8|ainda|zA|Continuar|Comprando|indexOf|ti|escape|Calcular|ajax|outerHeight|removeItems|remover|aten|itens|quantidade|de|height|animate|minicartUpdated|partir|productAddedToCart|px|scrollTop|updateItems|updateCartData|qd_ddc_more|qd_ddc_minus|not|SAC|nem|Contacte|focusout|qd_ddc_remove|qd_ddc_lightBoxOverlay|calcular|country|calculateShipping|slideUp|eveento|avisso|u00ea|executando|voc|que|forma|vers|licen|u00e7a|reservados|u00e0|direitos|todos|restrita|desta|iniciado|null|li|quickViewUpdate|buyButtonClicked|Callback|title|qd_bap_wrapper_content|Smart|mais|QD_smartCart|qdDdcContainer|ajaxStop|imagem|BRA|column2|column3|column4|imgLoading|img|prodImg|prodImgWrapper|prodQtt|text|prodRowLoading|availability|Gr|removeWrapper|prodRemove|qttLoading|URL|column1|qd_ddc_prodRow|qd_ddc_cep|mouseenter|setInterval|qd_ddc_scrollDown|qd_ddc_scrollUp|off|on|600|mouseleave|QD_checkoutQueue|Este|requisi|allTotal|clearInterval|clone|u00e1tis|column5|address|definir|appendTo|imageUrl|100|base|filter||informada||load|parent|is|qd_number_format|nos'.split('|'),0,{}));