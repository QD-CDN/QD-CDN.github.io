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
			Common.smartQuantityShelf();
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
		amazingMenu: function () {
			$('.header-qd-v1-main-amazing-menu').QD_amazingMenu();

			// Amazing Menu Responsivo
			$(".header-qd-v1-amazing-menu-toggle").click(function () {
				$("body").toggleClass('qd-am-on');
			});

			$(".qd-am-overlay").click(function () {
				$("body").removeClass('qd-am-on');
			});

			$(".floating-qd-v1-call-amazing-menu").click(function () {
				$("body").toggleClass('qd-am-toggle');
			});

			var wrapperMobile = $(".header-qd-v1-main-amazing-menu-mobile-wrapper");

			wrapperMobile.QD_amazingMenu();

			wrapperMobile.find('> ul > li.qd-am-has-ul a[href="#"]').click(function (evt) {
				evt.preventDefault();
				$(this).parent().toggleClass('qd-am-dropdown-active');
			});

			wrapperMobile.after('<span class="btn-close-mobile"><i class="fa fa-times-circle"></i></span>');

			$(".btn-close-mobile").click(function () {
				$("body").removeClass('qd-am-on');
			});
		},
		facebookLikebox: function() {
			$(".footer-qd-v1-facebook-likebox").html('<div class="fb-page" data-href="https://www.facebook.com/www.bramamateriais.com.br/" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/">Brama Materiais para Construções</a></blockquote></div></div>');
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
		smartQuantityShelf: function () {
			$(".shelf-qd-v1-buy-button:not(.qd-on)").addClass('qd-on').QD_smartQuantity({
				buyButton: ".btn-add-buy-button-asynchronous"
			});
		},
		smartCart: function() {
			var wrapper = $(".qd-sc-wrapper");
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
			Home.bannerSlider();
			Home.brandCarousel();
			Home.shelfCarouselHome();
			Home.organizeSideMenuCollection();
			Home.mosaicSetCol();
			Home.selectSmartResearch2();			
			Home.openModalVideoInstitutional();			
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		openModalVideoInstitutional: function() {
			var videoRegex = /(youtu\.be\/|\?v=)([^&]+)/i;

			$('.box-banner a').filter('[href*="youtube.com/"], [href*="youtu.be/"]').click(function(e) {
				e.preventDefault();
				var modal = $('.qd-v1-modal').clone().appendTo(document.body).addClass('hotsite-information-qd-v1-modal');
				var $t = $(this);
				var videoId = ($t.attr('href').match(videoRegex) || ['']).pop();

				modal.find('.modal-header').append('<h2 class="modal-title">' + $t.find('img').attr('alt') + '</h2>');
				$('<iframe src="' + 'https://www.youtube.com/embed/' + videoId + '?wmode=transparent&rel=0" frameborder="0"></iframe>').appendTo(modal.find('.modal-body'));
				modal.modal();
				
				modal.on('hidden.bs.modal', function() {
					modal.remove();
				});
			});
		},
		bannerSlider: function() {
			$('.slider-qd-v1-full, .hotsite-qd-v1-banner-slider, .mobile-slider-qd-v1-wrapper').slick({
				prevArrow: '<button type="button" class="slick-prev" title="Anterior"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next" title="Próximo"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>',
				dots: true,
				adaptiveHeight: true,
				fade: true,
				autoplay: true,
				autoplaySpeed: 7000,
				cssEase: 'linear'
			});
		},		
		selectSmartResearch2: function () {
			var htmlClassRegex = /[^a-z0-9]/ig;
			var values = [];

			$(".departmentNavigator").first().find("h3 a").each(function () {
				var $t = $(this);
				values.push([$t.text().trim(), $t.attr("href") || ""])
			});

			$(".qd-search-filters-wrapper").QD_SelectSmartResearch2({
				options: [values, "lid=00875d56-4446-45d5-b43c-272048ae206d", "lid=00875d56-4446-45d5-b43c-272048ae206d"],
				optionsPlaceHolder: ["Departamento", "Linha", "Material"],
				getAjaxOptions: function (requestData, $select) {
					var values = [];
					console.log($select);
					if ($select.is('#qd-ssr2-select-10'))
						var elems = $(requestData).find('h4 a');
					else if ($select.is('#qd-ssr2-select-20'))
						var elems = $(requestData).find('h4 + ul li a');
					else
						var elems = $(requestData).find(".search-single-navigator ul." + $select.attr("data-qdssr-title")).find("a");

					elems.each(function () {
						var $t = $(this);
						values.push([$t.text().trim(), $t.attr("href") || ""]);
					});
					return values;
				},
				optionIsChecked: function (optionPlaceHolder) {
					if (typeof optionPlaceHolder === "undefined")
						return null;

					var value = optionPlaceHolder === "Departamento" ? $(".search-single-navigator h3:first").text().trim() : $("h5." + optionPlaceHolder.replace(htmlClassRegex, "-") + " +ul .filtro-ativo:first").text().trim();
					return value.length ? value : null;
				}
			});
		},
		mosaicSetCol: function() {
			$(".banner-qd-v1-responsive .box-banner").QD_mosaicBanners();
			$(".banner-qd-v2-responsive .box-banner").QD_mosaicBanners({
				containerWidth: 1140
			});
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
			Product.accessoriesFix();
			Product.accessoriesApplyCarousel();
			Product.qdNotifymeShow();
			Product.doublePrice();
			Product.boxQuantity();
		},
		ajaxStop: function () {
			Product.addCloseBtnFreightTable();
		},
		windowOnload: function () {},
		qdNotifymeShow: function() {
			var notifyWrapper = $(".portal-notify-me-ref");

			var checkVisibleNotify = function(data) {
				if (data.availability || data.available){
					notifyWrapper.parent().parent().removeClass('col-xs-12').attr('class', "col-xs-12 col-lg-12");
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
		applySmartQuantity: function () {
			$('.product-qd-v1-sku-selection-box, .product-floating-bar-buy').QD_smartQuantity();

			$(window).on("skuSelected.vtex", function (e, id, data) {
				$('.qd-sq-more, .qd-sq-minus').click();
			});

			var skuList = $(".skuList");
			skuList.QD_smartQuantity();

			skuList.on('QuatroDigital.sq_change', function () {
				var skuId = (($(this).find('a.buy-button').attr('href') || '').match(/sku\=([0-9]+)/i) || ['']).pop();
				var qtt = parseInt($(this).find('.qd-sq-quantity').val() || '1');
				for (var i in skuJson.skus) {
					if (typeof skuJson.skus[i] != "function" && skuJson.skus[i].sku == skuId) {
						$(this).find('.valor-de strong').text('R$ ' + qd_number_format((skuJson.skus[i].listPrice * qtt) / 100, 2, ",", "."));
						$(this).find('.valor-por strong').text('R$ ' + qd_number_format((skuJson.skus[i].bestPrice * qtt) / 100, 2, ",", "."));
						break;
					}
				}
			});

			var skuRadio = $(".product-qd-v1-price-wrapper");
			skuRadio.QD_smartQuantity();

			skuRadio.on('QuatroDigital.sq_change', function () {
				var skuId = (($(this).find('a.buy-button').attr('href') || '').match(/sku\=([0-9]+)/i) || ['']).pop();
				var qtt = parseInt($(this).find('.qd-sq-quantity').val() || '1');
				console.log("skuid=" + skuId);
				console.log("qtt=" + qtt);
				for (var i in skuJson.skus) {
					if (typeof skuJson.skus[i] != "function" && skuJson.skus[i].sku == skuId) {
						console.log("skuJson.skus.listPrice=" + skuJson.skus[i].listPrice);
						console.log("skuJson.skus.bestPrice=" + skuJson.skus[i].bestPrice);
						$(this).find('.valor-de strong').text('R$ ' + qd_number_format((skuJson.skus[i].listPrice * qtt) / 100, 2, ",", "."));
						$(this).find('.valor-por strong').text('R$ ' + qd_number_format((skuJson.skus[i].bestPrice * qtt) / 100, 2, ",", "."));
					}
				}
			});
		},
		doublePrice: function () {
			var row = $('.product-qd-v1-box-quantity').clone().addClass('product-qd-v1-double-size qd-show');
			row.find('script').remove();
			// row.insertBefore($('.product-floating-bar-smart-qtt'));

			Product.applySmartQuantity();
		},
		boxQuantity: function () {

			// Verifica se produto possui a caracteristica
			var spec = $('.value-field.Metragem');
			if (!spec.length)
				return;

			// Oculta caracteristica e tabela se necessário
			spec.closest('tr').hide();
			var table = spec.closest('table');
			if (!table.find('tr:visible').length)
				table.add(table.prev('h4')).hide();

			var initialValue = (spec.text().match(/([\d|,|\.]+)/i) || ['']).pop();
			initialValue = parseFloat(initialValue.replace(',', '.')).toFixed(2);

			// Monta componente
			var row = $('<div>').insertAfter($('.product-qd-v1-description-curt').closest('.row')).addClass('row product-qd-v1-boxes');
			var wrapper = $('<div>').addClass('col-xs-12').appendTo(row);
			wrapper.append($('<span>').text('CALCULE A METRAGEM'));
			wrapper.append('<div class="product-qd-v1-boxes-qtt"><span class="product-qd-v1-smart-qtt-btn qd-sq-minus qd-sq-inactive"><i class="fa fa-minus-circle"></i></span><input class="product-qd-v1-boxes-input qd-sq-quantity" type="text" value="1"><span class="product-qd-v1-smart-qtt-btn qd-sq-more"><i class="fa fa-plus-circle"></i></span></div>');
			wrapper.append($('.product-qd-v1-boxes-qtt').append("<div class='product-qd-v1-boxes-results'>1 caixa necessária</div>"));

			// Aplica máscara
			var maskOptions = { suffixUnit: 'm²', delimiter: '.', separator: ',' };
			var inputMeters = $('.product-qd-v1-boxes-input').val(initialValue);
			VMasker(inputMeters).maskMoney(maskOptions);

			var numRegex = /([^\d]+)/g;
			// Calcula número de caixas
			inputMeters.on("QuatroDigital.qd-sq-boxes keyup", function () {
				let itemQtt = parseInt($(this).val().replace(numRegex, ''));
				let boxNum = Math.ceil(itemQtt / (initialValue * 100));
				console.log(boxNum);

				if (boxNum > 1)
					$('.product-qd-v1-boxes-results').text(boxNum + ' caixas necessárias');
				else
					$('.product-qd-v1-boxes-results').text('1 caixa necessária');
			});

			// Ativa botões + e -
			$('.qd-sq-more, .qd-sq-minus', '.product-qd-v1-boxes-qtt').on("click", function () {
				let metersValue = parseInt(inputMeters.val().replace(numRegex, ''));
				if ($(this).is('.qd-sq-minus')) {
					if (metersValue > 100)
						metersValue -= 100;
				}
				else
					metersValue += 100;

				VMasker(inputMeters.val(metersValue)).maskMoney(maskOptions);
				inputMeters.trigger('QuatroDigital.qd-sq-boxes');
			});

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

			// wrapper.find(".qd-v1-buy-button-content").prepend('<div class="qd-v1-smart-qtt"> <input type="tel" class="qd-sq-quantity" /> <div class="btns-wrapper"> <span class="qd-sq-more"></span> <span class="qd-sq-minus"></span> </div> </div>');
		},
		accessoriesFix: function () {
			$('fieldset >.buy-product-checkbox').parent().each(function () {
				var $t = $(this);
				$t.add($t.prev('ul')).wrapAll('<div class="accessories-qd-v1-item col-xs-12 col-sm-6 col-md-3"/>');
			});
		},
		accessoriesApplyCarousel: function () {
			var item = $('.accessories-qd-v1-item');

			if (!item.length)
				return;

			item.wrapAll('<div class="accessories-qd-v1-carousel"></div>');

			$(".accessories-qd-v1-carousel").find('.prateleira').each(function () {
				var $this = $(this);

				$this.find("h2").addClass('heading-2').insertBefore($this);

				$this.owlCarousel({
					items: 2,
					navigation: true,
					pagination: false
				});
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
// Owl Carousel
"function"!==typeof Object.create&&(Object.create=function(f){function g(){}g.prototype=f;return new g}); (function(f,g,k){var l={init:function(a,b){this.$elem=f(b);this.options=f.extend({},f.fn.owlCarousel.options,this.$elem.data(),a);this.userOptions=a;this.loadContent()},loadContent:function(){function a(a){var d,e="";if("function"===typeof b.options.jsonSuccess)b.options.jsonSuccess.apply(this,[a]);else{for(d in a.owl)a.owl.hasOwnProperty(d)&&(e+=a.owl[d].item);b.$elem.html(e)}b.logIn()}var b=this,e;"function"===typeof b.options.beforeInit&&b.options.beforeInit.apply(this,[b.$elem]);"string"===typeof b.options.jsonPath? (e=b.options.jsonPath,f.getJSON(e,a)):b.logIn()},logIn:function(){this.$elem.data("owl-originalStyles",this.$elem.attr("style"));this.$elem.data("owl-originalClasses",this.$elem.attr("class"));this.$elem.css({opacity:0});this.orignalItems=this.options.items;this.checkBrowser();this.wrapperWidth=0;this.checkVisible=null;this.setVars()},setVars:function(){if(0===this.$elem.children().length)return!1;this.baseClass();this.eventTypes();this.$userItems=this.$elem.children();this.itemsAmount=this.$userItems.length; this.wrapItems();this.$owlItems=this.$elem.find(".owl-item");this.$owlWrapper=this.$elem.find(".owl-wrapper");this.playDirection="next";this.prevItem=0;this.prevArr=[0];this.currentItem=0;this.customEvents();this.onStartup()},onStartup:function(){this.updateItems();this.calculateAll();this.buildControls();this.updateControls();this.response();this.moveEvents();this.stopOnHover();this.owlStatus();!1!==this.options.transitionStyle&&this.transitionTypes(this.options.transitionStyle);!0===this.options.autoPlay&& (this.options.autoPlay=5E3);this.play();this.$elem.find(".owl-wrapper").css("display","block");this.$elem.is(":visible")?this.$elem.css("opacity",1):this.watchVisibility();this.onstartup=!1;this.eachMoveUpdate();"function"===typeof this.options.afterInit&&this.options.afterInit.apply(this,[this.$elem])},eachMoveUpdate:function(){!0===this.options.lazyLoad&&this.lazyLoad();!0===this.options.autoHeight&&this.autoHeight();this.onVisibleItems();"function"===typeof this.options.afterAction&&this.options.afterAction.apply(this, [this.$elem])},updateVars:function(){"function"===typeof this.options.beforeUpdate&&this.options.beforeUpdate.apply(this,[this.$elem]);this.watchVisibility();this.updateItems();this.calculateAll();this.updatePosition();this.updateControls();this.eachMoveUpdate();"function"===typeof this.options.afterUpdate&&this.options.afterUpdate.apply(this,[this.$elem])},reload:function(){var a=this;g.setTimeout(function(){a.updateVars()},0)},watchVisibility:function(){var a=this;if(!1===a.$elem.is(":visible"))a.$elem.css({opacity:0}), g.clearInterval(a.autoPlayInterval),g.clearInterval(a.checkVisible);else return!1;a.checkVisible=g.setInterval(function(){a.$elem.is(":visible")&&(a.reload(),a.$elem.animate({opacity:1},200),g.clearInterval(a.checkVisible))},500)},wrapItems:function(){this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>');this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">');this.wrapperOuter=this.$elem.find(".owl-wrapper-outer");this.$elem.css("display","block")}, baseClass:function(){var a=this.$elem.hasClass(this.options.baseClass),b=this.$elem.hasClass(this.options.theme);a||this.$elem.addClass(this.options.baseClass);b||this.$elem.addClass(this.options.theme)},updateItems:function(){var a,b;if(!1===this.options.responsive)return!1;if(!0===this.options.singleItem)return this.options.items=this.orignalItems=1,this.options.itemsCustom=!1,this.options.itemsDesktop=!1,this.options.itemsDesktopSmall=!1,this.options.itemsTablet=!1,this.options.itemsTabletSmall= !1,this.options.itemsMobile=!1;a=f(this.options.responsiveBaseWidth).width();a>(this.options.itemsDesktop[0]||this.orignalItems)&&(this.options.items=this.orignalItems);if(!1!==this.options.itemsCustom)for(this.options.itemsCustom.sort(function(a,b){return a[0]-b[0]}),b=0;b<this.options.itemsCustom.length;b+=1)this.options.itemsCustom[b][0]<=a&&(this.options.items=this.options.itemsCustom[b][1]);else a<=this.options.itemsDesktop[0]&&!1!==this.options.itemsDesktop&&(this.options.items=this.options.itemsDesktop[1]), a<=this.options.itemsDesktopSmall[0]&&!1!==this.options.itemsDesktopSmall&&(this.options.items=this.options.itemsDesktopSmall[1]),a<=this.options.itemsTablet[0]&&!1!==this.options.itemsTablet&&(this.options.items=this.options.itemsTablet[1]),a<=this.options.itemsTabletSmall[0]&&!1!==this.options.itemsTabletSmall&&(this.options.items=this.options.itemsTabletSmall[1]),a<=this.options.itemsMobile[0]&&!1!==this.options.itemsMobile&&(this.options.items=this.options.itemsMobile[1]);this.options.items>this.itemsAmount&& !0===this.options.itemsScaleUp&&(this.options.items=this.itemsAmount)},response:function(){var a=this,b,e;if(!0!==a.options.responsive)return!1;e=f(g).width();a.resizer=function(){f(g).width()!==e&&(!1!==a.options.autoPlay&&g.clearInterval(a.autoPlayInterval),g.clearTimeout(b),b=g.setTimeout(function(){e=f(g).width();a.updateVars()},a.options.responsiveRefreshRate))};f(g).resize(a.resizer)},updatePosition:function(){this.jumpTo(this.currentItem);!1!==this.options.autoPlay&&this.checkAp()},appendItemsSizes:function(){var a= this,b=0,e=a.itemsAmount-a.options.items;a.$owlItems.each(function(c){var d=f(this);d.css({width:a.itemWidth}).data("owl-item",Number(c));if(0===c%a.options.items||c===e)c>e||(b+=1);d.data("owl-roundPages",b)})},appendWrapperSizes:function(){this.$owlWrapper.css({width:this.$owlItems.length*this.itemWidth*2,left:0});this.appendItemsSizes()},calculateAll:function(){this.calculateWidth();this.appendWrapperSizes();this.loops();this.max()},calculateWidth:function(){this.itemWidth=Math.round(this.$elem.width()/ this.options.items)},max:function(){var a=-1*(this.itemsAmount*this.itemWidth-this.options.items*this.itemWidth);this.options.items>this.itemsAmount?this.maximumPixels=a=this.maximumItem=0:(this.maximumItem=this.itemsAmount-this.options.items,this.maximumPixels=a);return a},min:function(){return 0},loops:function(){var a=0,b=0,e,c;this.positionsInArray=[0];this.pagesInArray=[];for(e=0;e<this.itemsAmount;e+=1)b+=this.itemWidth,this.positionsInArray.push(-b),!0===this.options.scrollPerPage&&(c=f(this.$owlItems[e]), c=c.data("owl-roundPages"),c!==a&&(this.pagesInArray[a]=this.positionsInArray[e],a=c))},buildControls:function(){if(!0===this.options.navigation||!0===this.options.pagination)this.owlControls=f('<div class="owl-controls"/>').toggleClass("clickable",!this.browser.isTouch).appendTo(this.$elem);!0===this.options.pagination&&this.buildPagination();!0===this.options.navigation&&this.buildButtons()},buildButtons:function(){var a=this,b=f('<div class="owl-buttons"/>');a.owlControls.append(b);a.buttonPrev= f("<div/>",{"class":"owl-prev",html:a.options.navigationText[0]||""});a.buttonNext=f("<div/>",{"class":"owl-next",html:a.options.navigationText[1]||""});b.append(a.buttonPrev).append(a.buttonNext);b.on("touchstart.owlControls mousedown.owlControls",'div[class^="owl"]',function(a){a.preventDefault()});b.on("touchend.owlControls mouseup.owlControls",'div[class^="owl"]',function(b){b.preventDefault();f(this).hasClass("owl-next")?a.next():a.prev()})},buildPagination:function(){var a=this;a.paginationWrapper= f('<div class="owl-pagination"/>');a.owlControls.append(a.paginationWrapper);a.paginationWrapper.on("touchend.owlControls mouseup.owlControls",".owl-page",function(b){b.preventDefault();Number(f(this).data("owl-page"))!==a.currentItem&&a.goTo(Number(f(this).data("owl-page")),!0)})},updatePagination:function(){var a,b,e,c,d,g;if(!1===this.options.pagination)return!1;this.paginationWrapper.html("");a=0;b=this.itemsAmount-this.itemsAmount%this.options.items;for(c=0;c<this.itemsAmount;c+=1)0===c%this.options.items&& (a+=1,b===c&&(e=this.itemsAmount-this.options.items),d=f("<div/>",{"class":"owl-page"}),g=f("<span></span>",{text:!0===this.options.paginationNumbers?a:"","class":!0===this.options.paginationNumbers?"owl-numbers":""}),d.append(g),d.data("owl-page",b===c?e:c),d.data("owl-roundPages",a),this.paginationWrapper.append(d));this.checkPagination()},checkPagination:function(){var a=this;if(!1===a.options.pagination)return!1;a.paginationWrapper.find(".owl-page").each(function(){f(this).data("owl-roundPages")=== f(a.$owlItems[a.currentItem]).data("owl-roundPages")&&(a.paginationWrapper.find(".owl-page").removeClass("active"),f(this).addClass("active"))})},checkNavigation:function(){if(!1===this.options.navigation)return!1;!1===this.options.rewindNav&&(0===this.currentItem&&0===this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.addClass("disabled")):0===this.currentItem&&0!==this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.removeClass("disabled")):this.currentItem=== this.maximumItem?(this.buttonPrev.removeClass("disabled"),this.buttonNext.addClass("disabled")):0!==this.currentItem&&this.currentItem!==this.maximumItem&&(this.buttonPrev.removeClass("disabled"),this.buttonNext.removeClass("disabled")))},updateControls:function(){this.updatePagination();this.checkNavigation();this.owlControls&&(this.options.items>=this.itemsAmount?this.owlControls.hide():this.owlControls.show())},destroyControls:function(){this.owlControls&&this.owlControls.remove()},next:function(a){if(this.isTransition)return!1; this.currentItem+=!0===this.options.scrollPerPage?this.options.items:1;if(this.currentItem>this.maximumItem+(!0===this.options.scrollPerPage?this.options.items-1:0))if(!0===this.options.rewindNav)this.currentItem=0,a="rewind";else return this.currentItem=this.maximumItem,!1;this.goTo(this.currentItem,a)},prev:function(a){if(this.isTransition)return!1;this.currentItem=!0===this.options.scrollPerPage&&0<this.currentItem&&this.currentItem<this.options.items?0:this.currentItem-(!0===this.options.scrollPerPage? this.options.items:1);if(0>this.currentItem)if(!0===this.options.rewindNav)this.currentItem=this.maximumItem,a="rewind";else return this.currentItem=0,!1;this.goTo(this.currentItem,a)},goTo:function(a,b,e){var c=this;if(c.isTransition)return!1;"function"===typeof c.options.beforeMove&&c.options.beforeMove.apply(this,[c.$elem]);a>=c.maximumItem?a=c.maximumItem:0>=a&&(a=0);c.currentItem=c.owl.currentItem=a;if(!1!==c.options.transitionStyle&&"drag"!==e&&1===c.options.items&&!0===c.browser.support3d)return c.swapSpeed(0), !0===c.browser.support3d?c.transition3d(c.positionsInArray[a]):c.css2slide(c.positionsInArray[a],1),c.afterGo(),c.singleItemTransition(),!1;a=c.positionsInArray[a];!0===c.browser.support3d?(c.isCss3Finish=!1,!0===b?(c.swapSpeed("paginationSpeed"),g.setTimeout(function(){c.isCss3Finish=!0},c.options.paginationSpeed)):"rewind"===b?(c.swapSpeed(c.options.rewindSpeed),g.setTimeout(function(){c.isCss3Finish=!0},c.options.rewindSpeed)):(c.swapSpeed("slideSpeed"),g.setTimeout(function(){c.isCss3Finish=!0}, c.options.slideSpeed)),c.transition3d(a)):!0===b?c.css2slide(a,c.options.paginationSpeed):"rewind"===b?c.css2slide(a,c.options.rewindSpeed):c.css2slide(a,c.options.slideSpeed);c.afterGo()},jumpTo:function(a){"function"===typeof this.options.beforeMove&&this.options.beforeMove.apply(this,[this.$elem]);a>=this.maximumItem||-1===a?a=this.maximumItem:0>=a&&(a=0);this.swapSpeed(0);!0===this.browser.support3d?this.transition3d(this.positionsInArray[a]):this.css2slide(this.positionsInArray[a],1);this.currentItem= this.owl.currentItem=a;this.afterGo()},afterGo:function(){this.prevArr.push(this.currentItem);this.prevItem=this.owl.prevItem=this.prevArr[this.prevArr.length-2];this.prevArr.shift(0);this.prevItem!==this.currentItem&&(this.checkPagination(),this.checkNavigation(),this.eachMoveUpdate(),!1!==this.options.autoPlay&&this.checkAp());"function"===typeof this.options.afterMove&&this.prevItem!==this.currentItem&&this.options.afterMove.apply(this,[this.$elem])},stop:function(){this.apStatus="stop";g.clearInterval(this.autoPlayInterval)}, checkAp:function(){"stop"!==this.apStatus&&this.play()},play:function(){var a=this;a.apStatus="play";if(!1===a.options.autoPlay)return!1;g.clearInterval(a.autoPlayInterval);a.autoPlayInterval=g.setInterval(function(){a.next(!0)},a.options.autoPlay)},swapSpeed:function(a){"slideSpeed"===a?this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)):"paginationSpeed"===a?this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)):"string"!==typeof a&&this.$owlWrapper.css(this.addCssSpeed(a))}, addCssSpeed:function(a){return{"-webkit-transition":"all "+a+"ms ease","-moz-transition":"all "+a+"ms ease","-o-transition":"all "+a+"ms ease",transition:"all "+a+"ms ease"}},removeTransition:function(){return{"-webkit-transition":"","-moz-transition":"","-o-transition":"",transition:""}},doTranslate:function(a){return{"-webkit-transform":"translate3d("+a+"px, 0px, 0px)","-moz-transform":"translate3d("+a+"px, 0px, 0px)","-o-transform":"translate3d("+a+"px, 0px, 0px)","-ms-transform":"translate3d("+ a+"px, 0px, 0px)",transform:"translate3d("+a+"px, 0px,0px)"}},transition3d:function(a){this.$owlWrapper.css(this.doTranslate(a))},css2move:function(a){this.$owlWrapper.css({left:a})},css2slide:function(a,b){var e=this;e.isCssFinish=!1;e.$owlWrapper.stop(!0,!0).animate({left:a},{duration:b||e.options.slideSpeed,complete:function(){e.isCssFinish=!0}})},checkBrowser:function(){var a=k.createElement("div");a.style.cssText="  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)"; a=a.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g);this.browser={support3d:null!==a&&1===a.length,isTouch:"ontouchstart"in g||g.navigator.msMaxTouchPoints}},moveEvents:function(){if(!1!==this.options.mouseDrag||!1!==this.options.touchDrag)this.gestures(),this.disabledEvents()},eventTypes:function(){var a=["s","e","x"];this.ev_types={};!0===this.options.mouseDrag&&!0===this.options.touchDrag?a=["touchstart.owl mousedown.owl","touchmove.owl mousemove.owl","touchend.owl touchcancel.owl mouseup.owl"]: !1===this.options.mouseDrag&&!0===this.options.touchDrag?a=["touchstart.owl","touchmove.owl","touchend.owl touchcancel.owl"]:!0===this.options.mouseDrag&&!1===this.options.touchDrag&&(a=["mousedown.owl","mousemove.owl","mouseup.owl"]);this.ev_types.start=a[0];this.ev_types.move=a[1];this.ev_types.end=a[2]},disabledEvents:function(){this.$elem.on("dragstart.owl",function(a){a.preventDefault()});this.$elem.on("mousedown.disableTextSelect",function(a){return f(a.target).is("input, textarea, select, option")})}, gestures:function(){function a(a){if(void 0!==a.touches)return{x:a.touches[0].pageX,y:a.touches[0].pageY};if(void 0===a.touches){if(void 0!==a.pageX)return{x:a.pageX,y:a.pageY};if(void 0===a.pageX)return{x:a.clientX,y:a.clientY}}}function b(a){"on"===a?(f(k).on(d.ev_types.move,e),f(k).on(d.ev_types.end,c)):"off"===a&&(f(k).off(d.ev_types.move),f(k).off(d.ev_types.end))}function e(b){b=b.originalEvent||b||g.event;d.newPosX=a(b).x-h.offsetX;d.newPosY=a(b).y-h.offsetY;d.newRelativeX=d.newPosX-h.relativePos; "function"===typeof d.options.startDragging&&!0!==h.dragging&&0!==d.newRelativeX&&(h.dragging=!0,d.options.startDragging.apply(d,[d.$elem]));(8<d.newRelativeX||-8>d.newRelativeX)&&!0===d.browser.isTouch&&(void 0!==b.preventDefault?b.preventDefault():b.returnValue=!1,h.sliding=!0);(10<d.newPosY||-10>d.newPosY)&&!1===h.sliding&&f(k).off("touchmove.owl");d.newPosX=Math.max(Math.min(d.newPosX,d.newRelativeX/5),d.maximumPixels+d.newRelativeX/5);!0===d.browser.support3d?d.transition3d(d.newPosX):d.css2move(d.newPosX)} function c(a){a=a.originalEvent||a||g.event;var c;a.target=a.target||a.srcElement;h.dragging=!1;!0!==d.browser.isTouch&&d.$owlWrapper.removeClass("grabbing");d.dragDirection=0>d.newRelativeX?d.owl.dragDirection="left":d.owl.dragDirection="right";0!==d.newRelativeX&&(c=d.getNewPosition(),d.goTo(c,!1,"drag"),h.targetElement===a.target&&!0!==d.browser.isTouch&&(f(a.target).on("click.disable",function(a){a.stopImmediatePropagation();a.stopPropagation();a.preventDefault();f(a.target).off("click.disable")}), a=f._data(a.target,"events").click,c=a.pop(),a.splice(0,0,c)));b("off")}var d=this,h={offsetX:0,offsetY:0,baseElWidth:0,relativePos:0,position:null,minSwipe:null,maxSwipe:null,sliding:null,dargging:null,targetElement:null};d.isCssFinish=!0;d.$elem.on(d.ev_types.start,".owl-wrapper",function(c){c=c.originalEvent||c||g.event;var e;if(3===c.which)return!1;if(!(d.itemsAmount<=d.options.items)){if(!1===d.isCssFinish&&!d.options.dragBeforeAnimFinish||!1===d.isCss3Finish&&!d.options.dragBeforeAnimFinish)return!1; !1!==d.options.autoPlay&&g.clearInterval(d.autoPlayInterval);!0===d.browser.isTouch||d.$owlWrapper.hasClass("grabbing")||d.$owlWrapper.addClass("grabbing");d.newPosX=0;d.newRelativeX=0;f(this).css(d.removeTransition());e=f(this).position();h.relativePos=e.left;h.offsetX=a(c).x-e.left;h.offsetY=a(c).y-e.top;b("on");h.sliding=!1;h.targetElement=c.target||c.srcElement}})},getNewPosition:function(){var a=this.closestItem();a>this.maximumItem?a=this.currentItem=this.maximumItem:0<=this.newPosX&&(this.currentItem= a=0);return a},closestItem:function(){var a=this,b=!0===a.options.scrollPerPage?a.pagesInArray:a.positionsInArray,e=a.newPosX,c=null;f.each(b,function(d,g){e-a.itemWidth/20>b[d+1]&&e-a.itemWidth/20<g&&"left"===a.moveDirection()?(c=g,a.currentItem=!0===a.options.scrollPerPage?f.inArray(c,a.positionsInArray):d):e+a.itemWidth/20<g&&e+a.itemWidth/20>(b[d+1]||b[d]-a.itemWidth)&&"right"===a.moveDirection()&&(!0===a.options.scrollPerPage?(c=b[d+1]||b[b.length-1],a.currentItem=f.inArray(c,a.positionsInArray)): (c=b[d+1],a.currentItem=d+1))});return a.currentItem},moveDirection:function(){var a;0>this.newRelativeX?(a="right",this.playDirection="next"):(a="left",this.playDirection="prev");return a},customEvents:function(){var a=this;a.$elem.on("owl.next",function(){a.next()});a.$elem.on("owl.prev",function(){a.prev()});a.$elem.on("owl.play",function(b,e){a.options.autoPlay=e;a.play();a.hoverStatus="play"});a.$elem.on("owl.stop",function(){a.stop();a.hoverStatus="stop"});a.$elem.on("owl.goTo",function(b,e){a.goTo(e)}); a.$elem.on("owl.jumpTo",function(b,e){a.jumpTo(e)})},stopOnHover:function(){var a=this;!0===a.options.stopOnHover&&!0!==a.browser.isTouch&&!1!==a.options.autoPlay&&(a.$elem.on("mouseover",function(){a.stop()}),a.$elem.on("mouseout",function(){"stop"!==a.hoverStatus&&a.play()}))},lazyLoad:function(){var a,b,e,c,d;if(!1===this.options.lazyLoad)return!1;for(a=0;a<this.itemsAmount;a+=1)b=f(this.$owlItems[a]),"loaded"!==b.data("owl-loaded")&&(e=b.data("owl-item"),c=b.find(".lazyOwl"),"string"!==typeof c.data("src")? b.data("owl-loaded","loaded"):(void 0===b.data("owl-loaded")&&(c.hide(),b.addClass("loading").data("owl-loaded","checked")),(d=!0===this.options.lazyFollow?e>=this.currentItem:!0)&&e<this.currentItem+this.options.items&&c.length&&this.lazyPreload(b,c)))},lazyPreload:function(a,b){function e(){a.data("owl-loaded","loaded").removeClass("loading");b.removeAttr("data-src");"fade"===d.options.lazyEffect?b.fadeIn(400):b.show();"function"===typeof d.options.afterLazyLoad&&d.options.afterLazyLoad.apply(this, [d.$elem])}function c(){f+=1;d.completeImg(b.get(0))||!0===k?e():100>=f?g.setTimeout(c,100):e()}var d=this,f=0,k;"DIV"===b.prop("tagName")?(b.css("background-image","url("+b.data("src")+")"),k=!0):b[0].src=b.data("src");c()},autoHeight:function(){function a(){var a=f(e.$owlItems[e.currentItem]).height();e.wrapperOuter.css("height",a+"px");e.wrapperOuter.hasClass("autoHeight")||g.setTimeout(function(){e.wrapperOuter.addClass("autoHeight")},0)}function b(){d+=1;e.completeImg(c.get(0))?a():100>=d?g.setTimeout(b, 100):e.wrapperOuter.css("height","")}var e=this,c=f(e.$owlItems[e.currentItem]).find("img"),d;void 0!==c.get(0)?(d=0,b()):a()},completeImg:function(a){return!a.complete||"undefined"!==typeof a.naturalWidth&&0===a.naturalWidth?!1:!0},onVisibleItems:function(){var a;!0===this.options.addClassActive&&this.$owlItems.removeClass("active");this.visibleItems=[];for(a=this.currentItem;a<this.currentItem+this.options.items;a+=1)this.visibleItems.push(a),!0===this.options.addClassActive&&f(this.$owlItems[a]).addClass("active"); this.owl.visibleItems=this.visibleItems},transitionTypes:function(a){this.outClass="owl-"+a+"-out";this.inClass="owl-"+a+"-in"},singleItemTransition:function(){var a=this,b=a.outClass,e=a.inClass,c=a.$owlItems.eq(a.currentItem),d=a.$owlItems.eq(a.prevItem),f=Math.abs(a.positionsInArray[a.currentItem])+a.positionsInArray[a.prevItem],g=Math.abs(a.positionsInArray[a.currentItem])+a.itemWidth/2;a.isTransition=!0;a.$owlWrapper.addClass("owl-origin").css({"-webkit-transform-origin":g+"px","-moz-perspective-origin":g+ "px","perspective-origin":g+"px"});d.css({position:"relative",left:f+"px"}).addClass(b).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){a.endPrev=!0;d.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");a.clearTransStyle(d,b)});c.addClass(e).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){a.endCurrent=!0;c.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");a.clearTransStyle(c,e)})},clearTransStyle:function(a, b){a.css({position:"",left:""}).removeClass(b);this.endPrev&&this.endCurrent&&(this.$owlWrapper.removeClass("owl-origin"),this.isTransition=this.endCurrent=this.endPrev=!1)},owlStatus:function(){this.owl={userOptions:this.userOptions,baseElement:this.$elem,userItems:this.$userItems,owlItems:this.$owlItems,currentItem:this.currentItem,prevItem:this.prevItem,visibleItems:this.visibleItems,isTouch:this.browser.isTouch,browser:this.browser,dragDirection:this.dragDirection}},clearEvents:function(){this.$elem.off(".owl owl mousedown.disableTextSelect"); f(k).off(".owl owl");f(g).off("resize",this.resizer)},unWrap:function(){0!==this.$elem.children().length&&(this.$owlWrapper.unwrap(),this.$userItems.unwrap().unwrap(),this.owlControls&&this.owlControls.remove());this.clearEvents();this.$elem.attr("style",this.$elem.data("owl-originalStyles")||"").attr("class",this.$elem.data("owl-originalClasses"))},destroy:function(){this.stop();g.clearInterval(this.checkVisible);this.unWrap();this.$elem.removeData()},reinit:function(a){a=f.extend({},this.userOptions, a);this.unWrap();this.init(a,this.$elem)},addItem:function(a,b){var e;if(!a)return!1;if(0===this.$elem.children().length)return this.$elem.append(a),this.setVars(),!1;this.unWrap();e=void 0===b||-1===b?-1:b;e>=this.$userItems.length||-1===e?this.$userItems.eq(-1).after(a):this.$userItems.eq(e).before(a);this.setVars()},removeItem:function(a){if(0===this.$elem.children().length)return!1;a=void 0===a||-1===a?-1:a;this.unWrap();this.$userItems.eq(a).remove();this.setVars()}};f.fn.owlCarousel=function(a){return this.each(function(){if(!0=== f(this).data("owl-init"))return!1;f(this).data("owl-init",!0);var b=Object.create(l);b.init(a,this);f.data(this,"owlCarousel",b)})};f.fn.owlCarousel.options={items:5,itemsCustom:!1,itemsDesktop:[1199,4],itemsDesktopSmall:[979,3],itemsTablet:[768,2],itemsTabletSmall:!1,itemsMobile:[479,1],singleItem:!1,itemsScaleUp:!1,slideSpeed:200,paginationSpeed:800,rewindSpeed:1E3,autoPlay:!1,stopOnHover:!1,navigation:!1,navigationText:["prev","next"],rewindNav:!0,scrollPerPage:!1,pagination:!0,paginationNumbers:!1, responsive:!0,responsiveRefreshRate:200,responsiveBaseWidth:g,baseClass:"owl-carousel",theme:"owl-theme",lazyLoad:!1,lazyFollow:!0,lazyEffect:"fade",autoHeight:!1,jsonPath:!1,jsonSuccess:!1,dragBeforeAnimFinish:!0,mouseDrag:!0,touchDrag:!0,addClassActive:!1,transitionStyle:!1,beforeUpdate:!1,afterUpdate:!1,beforeInit:!1,afterInit:!1,beforeMove:!1,afterMove:!1,afterAction:!1,startDragging:!1,afterLazyLoad:!1}})(jQuery,window,document);

/* Quatro Digital - Smart Quantity // Carlos Vinicius // Todos os direitos reservados */
/* Quatro Digital - Smart Quantity // 1.12 // Carlos Vinicius // Todos os direitos reservados */
(function(v){var d=jQuery;if("function"!==typeof d.fn.QD_smartQuantity){var g=function(d,a){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var f;"object"===typeof d?(d.unshift("[Quatro Digital - Smart Quantity]\n"),f=d):f=["[Quatro Digital - Smart Quantity]\n"+d];if("undefined"===typeof a||"alerta"!==a.toLowerCase()&&"aviso"!==a.toLowerCase())if("undefined"!==typeof a&&"info"===a.toLowerCase())try{console.info.apply(console,
f)}catch(k){console.info(f.join("\n"))}else try{console.error.apply(console,f)}catch(k){console.error(f.join("\n"))}else try{console.warn.apply(console,f)}catch(k){console.warn(f.join("\n"))}}},m={buyButton:".buy-button",qttInput:".qd-sq-quantity",btnMore:".qd-sq-more",btnMinus:".qd-sq-minus",initialValue:1,minimumValue:1,setQuantityByUrl:!0},n=function(h,a){function f(c,e,b){a.setQuantityByUrl?c.val(((location.search||"").match(q)||[a.initialValue]).pop()):c.val(a.initialValue);c.change(function(c,
b){try{if("qd_ssl_trigger"!=b){var e=d(this),f=parseInt(e.val().replace(n,""));!isNaN(f)&&f>a.minimumValue?e.val(f):e.val(a.minimumValue);e.trigger("QuatroDigital.sq_change",this)}}catch(t){g(t.message)}});c.focusin(function(){d(this).trigger("QuatroDigital.sq_focusin",this)});e.click(function(b){b.preventDefault();c.val((parseInt(c.val())||a.minimumValue)+1).change()});b.click(function(b){b.preventDefault();c.val((parseInt(c.val())||a.minimumValue+1)-1).change()});c.change()}function k(c,e,b){c.on("QuatroDigital.sq_change",
function(){(d(this).val()||0)<=a.minimumValue?(b.addClass("qd-sq-inactive"),e.removeClass("qd-sq-inactive")):(e.addClass("qd-sq-inactive"),b.removeClass("qd-sq-inactive"))})}function m(c,e){c.on("QuatroDigital.sq_change",function(){try{if(!(e[0].hostname||"").length)return g("A quantidade n\u00e3o foi inserida no bt comprar pois o mesmo n\u00e3o possui uma URL","info");var b=e[0].search||"";-1<b.toLowerCase().indexOf("qty=")?e[0].search=b.replace(p,"qty="+(parseInt(c.val())||("number"==typeof a.minimumValue?
a.minimumValue:1))+"&"):e[0].search="qty="+(parseInt(c.val())||("number"==typeof a.minimumValue?a.minimumValue:1))+"&"+(e[0].search||"").replace(p,"");e.not(":first").each(function(){this.href=e[0].href});var d=((e.first().attr("href")||"").match(u)||[""]).pop()+"";c.attr("data-sku-id",d);if(d.length&&"object"===typeof skuJson&&!c.attr("data-sku-price"))for(b=0;b<skuJson.skus.length;b++)skuJson.skus[b].sku==d&&c.attr("data-sku-price",skuJson.skus[b].bestPrice)}catch(l){g(l.message)}})}var n=/[^0-9-]/gi,
q=/qty\=([0-9]+)/i,u=/sku\=([0-9]+)/i,p=/qty\=[0-9]+\&?/ig;h.each(function(){try{var c=d(this),e=c.find(a.buyButton),b=c.find(a.qttInput),h=c.find(a.btnMore),l=c.find(a.btnMinus);if(!e.length&&null!==a.buyButton||!b.length)return g("O plugin parou por aqui! N\u00e3o foram encontrados o bot\u00e3o comprar e o campo de quantidade","alerta");if(b.is(".qd-sq-on"))return g(["Execu\u00e7\u00e3o ignorada pois este input j\u00e1 possui o plugin aplicado. Input: ",b],"info");b.addClass("qd-sq-on");k(b,h,l);
null!==a.buyButton&&m(b,e);f(b,h,l);d(window).on("vtex.sku.selected",function(){b.change()})}catch(r){g(r.message)}})};d.fn.QD_smartQuantity=function(g){var a=d(this);a.qdPlugin=new n(a,d.extend({},m,g));d(window).trigger("QuatroDigital.sq_callback");return a};d(function(){d(".qd_auto_smart_quantity").QD_smartQuantity()})}})(this);    

// amazing menu
var _0xdba3=['QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','children','qd-am-elem-','replaceSpecialChars','replace','>li','>ul','qdAmAddNdx','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','add','qd-am-','-li','callback','QuatroDigital.am.callback','getParent','closest','QD_amazingMenu','/qd-amazing-menu','QD\x20Amazing\x20Menu','object','undefined','info','alerta','toLowerCase','aviso','apply','error','join','addClass','qd-am-li-','first','qd-am-first','fromCharCode','toUpperCase','---','erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','url','each','img[alt=\x27','attr','.box-banner','clone','hide','qd-am-content-loaded','text','trim','data-qdam-value','[class*=\x27colunas\x27]','insertBefore','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','trigger'];(function(_0x45cad1,_0x5619b3){var _0x338c69=function(_0x2aa8bb){while(--_0x2aa8bb){_0x45cad1['push'](_0x45cad1['shift']());}};_0x338c69(++_0x5619b3);}(_0xdba3,0x171));var _0x3dba=function(_0x1ff010,_0x431d07){_0x1ff010=_0x1ff010-0x0;var _0x414ae4=_0xdba3[_0x1ff010];return _0x414ae4;};(function(_0x5a07bb){_0x5a07bb['fn'][_0x3dba('0x0')]=_0x5a07bb['fn'][_0x3dba('0x1')];}(jQuery));(function(_0x19490d){'use strict';var _0x2a7760,_0x3e018a,_0x3878cc,_0x15b491;_0x2a7760=jQuery;if(typeof _0x2a7760['fn'][_0x3dba('0x2')]==='function')return;_0x3e018a={'url':_0x3dba('0x3'),'callback':function(){},'ajaxCallback':function(){}};var _0x3b040a=_0x3dba('0x4');var _0x5c1f2a=function(_0x4b33d8,_0x56e4ed){if(_0x3dba('0x5')===typeof console&&_0x3dba('0x6')!==typeof console['error']&&_0x3dba('0x6')!==typeof console[_0x3dba('0x7')]&&_0x3dba('0x6')!==typeof console['warn']){var _0x5e5b81;_0x3dba('0x5')===typeof _0x4b33d8?(_0x4b33d8['unshift']('['+_0x3b040a+']\x0a'),_0x5e5b81=_0x4b33d8):_0x5e5b81=['['+_0x3b040a+']\x0a'+_0x4b33d8];if(_0x3dba('0x6')===typeof _0x56e4ed||_0x3dba('0x8')!==_0x56e4ed[_0x3dba('0x9')]()&&_0x3dba('0xa')!==_0x56e4ed['toLowerCase']())if('undefined'!==typeof _0x56e4ed&&_0x3dba('0x7')===_0x56e4ed[_0x3dba('0x9')]())try{console['info'][_0x3dba('0xb')](console,_0x5e5b81);}catch(_0x4f0cad){try{console[_0x3dba('0x7')](_0x5e5b81['join']('\x0a'));}catch(_0x13c681){}}else try{console[_0x3dba('0xc')]['apply'](console,_0x5e5b81);}catch(_0x5559ad){try{console[_0x3dba('0xc')](_0x5e5b81['join']('\x0a'));}catch(_0x773934){}}else try{console['warn'][_0x3dba('0xb')](console,_0x5e5b81);}catch(_0x106cfd){try{console['warn'](_0x5e5b81[_0x3dba('0xd')]('\x0a'));}catch(_0x5574c1){}}}};_0x2a7760['fn']['qdAmAddNdx']=function(){var _0x4d76cc=_0x2a7760(this);_0x4d76cc['each'](function(_0x338ae8){_0x2a7760(this)[_0x3dba('0xe')](_0x3dba('0xf')+_0x338ae8);});_0x4d76cc[_0x3dba('0x10')]()[_0x3dba('0xe')](_0x3dba('0x11'));_0x4d76cc['last']()[_0x3dba('0xe')]('qd-am-last');return _0x4d76cc;};_0x2a7760['fn']['QD_amazingMenu']=function(){};var _0x6c98b6=function(_0x255e27){var _0x441f50={'o':'enznzngrevnvf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x15c195){var _0x4c8ea0,_0x85cf,_0x57f903,_0x5ae807;_0x85cf=function(_0x3d3229){return _0x3d3229;};_0x57f903=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x15c195=_0x15c195['d'+_0x57f903[0x10]+'c'+_0x57f903[0x11]+'m'+_0x85cf(_0x57f903[0x1])+'n'+_0x57f903[0xd]]['l'+_0x57f903[0x12]+'c'+_0x57f903[0x0]+'ti'+_0x85cf('o')+'n'];_0x4c8ea0=function(_0x15821c){return escape(encodeURIComponent(_0x15821c['replace'](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0xad0682){return String[_0x3dba('0x12')](('Z'>=_0xad0682?0x5a:0x7a)>=(_0xad0682=_0xad0682['charCodeAt'](0x0)+0xd)?_0xad0682:_0xad0682-0x1a);})));};var _0x5225f5=_0x4c8ea0(_0x15c195[[_0x57f903[0x9],_0x85cf('o'),_0x57f903[0xc],_0x57f903[_0x85cf(0xd)]][_0x3dba('0xd')]('')]);_0x4c8ea0=_0x4c8ea0((window[['js',_0x85cf('no'),'m',_0x57f903[0x1],_0x57f903[0x4][_0x3dba('0x13')](),'ite'][_0x3dba('0xd')]('')]||_0x3dba('0x14'))+['.v',_0x57f903[0xd],'e',_0x85cf('x'),'co',_0x85cf('mm'),_0x3dba('0x15'),_0x57f903[0x1],'.c',_0x85cf('o'),'m.',_0x57f903[0x13],'r'][_0x3dba('0xd')](''));for(var _0x2b918c in _0x441f50){if(_0x4c8ea0===_0x2b918c+_0x441f50[_0x2b918c]||_0x5225f5===_0x2b918c+_0x441f50[_0x2b918c]){_0x5ae807='tr'+_0x57f903[0x11]+'e';break;}_0x5ae807='f'+_0x57f903[0x0]+'ls'+_0x85cf(_0x57f903[0x1])+'';}_0x85cf=!0x1;-0x1<_0x15c195[[_0x57f903[0xc],'e',_0x57f903[0x0],'rc',_0x57f903[0x9]][_0x3dba('0xd')]('')][_0x3dba('0x16')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x85cf=!0x0);return[_0x5ae807,_0x85cf];}(_0x255e27);}(window);if(!eval(_0x6c98b6[0x0]))return _0x6c98b6[0x1]?_0x5c1f2a(_0x3dba('0x17')):!0x1;_0x15b491=function(_0x1af267){var _0x3876a3,_0x5a2b63,_0x28d11c;_0x28d11c=_0x1af267[_0x3dba('0x18')]('.qd_am_code');_0x3876a3=_0x28d11c[_0x3dba('0x19')](_0x3dba('0x1a'));_0x5a2b63=_0x28d11c[_0x3dba('0x19')](_0x3dba('0x1b'));if(!(_0x3876a3[_0x3dba('0x1c')]||_0x5a2b63['length']))return;_0x3876a3[_0x3dba('0x1d')]()[_0x3dba('0xe')](_0x3dba('0x1e'));_0x5a2b63[_0x3dba('0x1d')]()[_0x3dba('0xe')](_0x3dba('0x1f'));_0x2a7760[_0x3dba('0x20')]({'url':_0x3878cc[_0x3dba('0x21')],'dataType':'html','success':function(_0x555475){var _0x27c28e=_0x2a7760(_0x555475);_0x3876a3[_0x3dba('0x22')](function(){var _0x127731,_0x157bca;_0x157bca=_0x2a7760(this);_0x127731=_0x27c28e[_0x3dba('0x18')](_0x3dba('0x23')+_0x157bca[_0x3dba('0x24')]('data-qdam-value')+'\x27]');if(!_0x127731[_0x3dba('0x1c')])return;_0x127731['each'](function(){_0x2a7760(this)[_0x3dba('0x0')](_0x3dba('0x25'))[_0x3dba('0x26')]()['insertBefore'](_0x157bca);});_0x157bca[_0x3dba('0x27')]();})[_0x3dba('0xe')](_0x3dba('0x28'));_0x5a2b63[_0x3dba('0x22')](function(){var _0x373d85={},_0x3f5809;_0x3f5809=_0x2a7760(this);_0x27c28e[_0x3dba('0x18')]('h2')[_0x3dba('0x22')](function(){if(_0x2a7760(this)[_0x3dba('0x29')]()[_0x3dba('0x2a')]()['toLowerCase']()==_0x3f5809[_0x3dba('0x24')](_0x3dba('0x2b'))[_0x3dba('0x2a')]()['toLowerCase']()){_0x373d85=_0x2a7760(this);return![];}});if(!_0x373d85[_0x3dba('0x1c')])return;_0x373d85[_0x3dba('0x22')](function(){_0x2a7760(this)[_0x3dba('0x0')](_0x3dba('0x2c'))[_0x3dba('0x26')]()[_0x3dba('0x2d')](_0x3f5809);});_0x3f5809[_0x3dba('0x27')]();})[_0x3dba('0xe')]('qd-am-content-loaded');},'error':function(){_0x5c1f2a(_0x3dba('0x2e')+_0x3878cc[_0x3dba('0x21')]+_0x3dba('0x2f'));},'complete':function(){_0x3878cc[_0x3dba('0x30')][_0x3dba('0x31')](this);_0x2a7760(window)[_0x3dba('0x32')](_0x3dba('0x33'),_0x1af267);},'clearQueueDelay':0xbb8});};_0x2a7760[_0x3dba('0x2')]=function(_0x589754){var _0xd7aa7b=_0x589754[_0x3dba('0x18')](_0x3dba('0x34'))[_0x3dba('0x22')](function(){var _0x118b5b,_0x3d8d89,_0x3cc476,_0x4c3947;_0x118b5b=_0x2a7760(this);if(!_0x118b5b[_0x3dba('0x1c')])return _0x5c1f2a([_0x3dba('0x35'),_0x589754],_0x3dba('0x8'));_0x118b5b['find'](_0x3dba('0x36'))[_0x3dba('0x1d')]()[_0x3dba('0xe')]('qd-am-has-ul');_0x118b5b[_0x3dba('0x18')]('li')[_0x3dba('0x22')](function(){var _0x42dcfc=_0x2a7760(this),_0x1b7566;_0x1b7566=_0x42dcfc[_0x3dba('0x37')](':not(ul)');if(!_0x1b7566['length'])return;_0x42dcfc[_0x3dba('0xe')](_0x3dba('0x38')+_0x1b7566[_0x3dba('0x10')]()[_0x3dba('0x29')]()[_0x3dba('0x2a')]()[_0x3dba('0x39')]()[_0x3dba('0x3a')](/\./g,'')[_0x3dba('0x3a')](/\s/g,'-')[_0x3dba('0x9')]());});_0x3d8d89=_0x118b5b[_0x3dba('0x18')](_0x3dba('0x3b'))['qdAmAddNdx']();_0x118b5b['addClass']('qd-amazing-menu');_0x3cc476=_0x3d8d89[_0x3dba('0x18')](_0x3dba('0x3c'));_0x3cc476[_0x3dba('0x22')](function(){var _0x34ae20=_0x2a7760(this),_0x42dbaa;_0x42dbaa=_0x34ae20['find'](_0x3dba('0x3b'))[_0x3dba('0x3d')]()[_0x3dba('0xe')](_0x3dba('0x3e'));_0x34ae20[_0x3dba('0xe')](_0x3dba('0x3f'));_0x34ae20[_0x3dba('0x1d')]()[_0x3dba('0xe')](_0x3dba('0x40'));});_0x3cc476[_0x3dba('0xe')](_0x3dba('0x40'));var _0x3b89c3=0x0;var _0x57f31b=function(_0x187c91){_0x3b89c3=_0x3b89c3+0x1;var _0x1849e9=_0x187c91[_0x3dba('0x37')]('li');var _0x20442a=_0x1849e9[_0x3dba('0x37')]('*');if(!_0x20442a[_0x3dba('0x1c')])return;_0x20442a['addClass']('qd-am-level-'+_0x3b89c3);_0x57f31b(_0x20442a);};_0x57f31b(_0x118b5b);_0x118b5b[_0x3dba('0x41')](_0x118b5b[_0x3dba('0x18')]('ul'))[_0x3dba('0x22')](function(){var _0x2115e6=_0x2a7760(this);_0x2115e6[_0x3dba('0xe')](_0x3dba('0x42')+_0x2115e6[_0x3dba('0x37')]('li')['length']+_0x3dba('0x43'));});});_0x15b491(_0xd7aa7b);_0x3878cc[_0x3dba('0x44')][_0x3dba('0x31')](this);_0x2a7760(window)[_0x3dba('0x32')](_0x3dba('0x45'),_0x589754);};_0x2a7760['fn']['QD_amazingMenu']=function(_0x204166){var _0x4b86c2=_0x2a7760(this);if(!_0x4b86c2[_0x3dba('0x1c')])return _0x4b86c2;_0x3878cc=_0x2a7760['extend']({},_0x3e018a,_0x204166);_0x4b86c2['exec']=new _0x2a7760[(_0x3dba('0x2'))](_0x2a7760(this));return _0x4b86c2;};_0x2a7760(function(){_0x2a7760('.qd_amazing_menu_auto')[_0x3dba('0x2')]();});}(this));

// smart cart
var _0x2cd5=['Callbacks','function','error','Oooops!\x20','message','object','info','warn','unshift','alerta','aviso','toLowerCase','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','enznzngrevnvf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>','skuName','name','vtexjs','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22>','<div\x20class=\x22qd-ddc-wrapper2\x22>','<div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div>','<div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div>','<div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22>','<div\x20class=\x22qd-ddc-shipping\x22></div>','<div\x20class=\x22qd-ddc-infoTotal\x22></div>','<div\x20class=\x22qd-ddc-infoBts\x22>','<a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a>','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','find','.qd-ddc-viewCart','linkCart','.qd_ddc_continueShopping','html','continueShopping','.qd-ddc-checkout','linkCheckout','shippingForm','emptyCart','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','removeClass','body','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20.qd-ddc-cep','val','formatCepField','.qd-ddc-shipping\x20.qd-ddc-cep-ok','click','.qd-ddc-cep-btn','preventDefault','toggle','.qd-ddc-cep-close','click._QD_DDC_closeShipping','target','.qd-ddc-cep-tooltip','hide','.qd-ddc-cep-ok','.qd-ddc-cep','updateOnlyHover','mouseenter.qd_ddc_hover','getCartInfoByUrl','simpleCart','cartIsEmpty','cartContainer','each','total','.qd-ddc-infoTotalItems','qtt','shipping','allTotal','Atenção,\x20você\x20esta\x20utilizando\x20um\x20método\x20descontinuado','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','call','dataOptionsCache','timeRemoveNewItemClass','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','addClass','getOrderForm','QD_checkoutQueue','totalizers','shippingData','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-wrapper','.qd-ddc-prodRow','qd-ddc-noItems','renderProductsList','.qd-ddc-prodWrapper2','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22>','<img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/>','</div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a>','<input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a>','<span\x20class=\x22qd-ddc-qttLoading\x22></span>','<div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a>','empty','attr','qd-ddc-','availability','.qd-ddc-prodName','append','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','.qd-ddc-quantity','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','.qd-ddc-shipping\x20input','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','lastSku','[data-sku=\x27','outerHeight','parent','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','https','qd-loaded','load','src','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','actionButtons','data-sku','data-sku-index','changeQantity','click.qd_ddc_more','qd-loading','focusout.qd_ddc_change','keyup.qd_ddc_change','.qd-ddc-remove','slideUp','remove','$1-$2$3','shippingCalculate','calculateShipping','BRA','.qd-dd-cep-slas','logisticsInfo','slas','<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>','shippingEstimate','\x20dia\x20útil','\x20dias\x20útéis','<tr></tr>','<td>\x20R$\x20','price','</td><td>',',\x20entrega\x20em\x20','\x20para\x20o\x20CEP\x20','insertBefore','.qd-ddc-cep-tooltip-text','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','data','qdDdcLastPostalCode','smartCheckout','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','quantity','index','updateItems','done','atenção\x20esta\x20método\x20esta\x20descontinuado','boolean','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','stop','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','Quatro\x20Digital\x20-\x20Box\x20Amount\x20Cart','quickViewUpdate','allowRecalculate','.qd-bap-wrapper','qd-bap-item-added','input.qd-productId[value=','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','productId','prod_','prodId','ajaxStop','.qdDdcContainer','QD_smartCart','extend','selector','dropDown','buyButton','QD_buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','closest','abs','undefined','pow','toFixed','round','split','length','replace','join','_QuatroDigital_CartData','callback'];(function(_0x34cf82,_0x278dc8){var _0x2493b1=function(_0x3f4c9f){while(--_0x3f4c9f){_0x34cf82['push'](_0x34cf82['shift']());}};_0x2493b1(++_0x278dc8);}(_0x2cd5,0xfa));var _0x52cd=function(_0x1e6568,_0x8dc132){_0x1e6568=_0x1e6568-0x0;var _0x32e176=_0x2cd5[_0x1e6568];return _0x32e176;};(function(_0xce5734){_0xce5734['fn'][_0x52cd('0x0')]=_0xce5734['fn'][_0x52cd('0x1')];}(jQuery));function qd_number_format(_0x57c123,_0xad313a,_0x2469ed,_0x2556b6){_0x57c123=(_0x57c123+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x57c123=isFinite(+_0x57c123)?+_0x57c123:0x0;_0xad313a=isFinite(+_0xad313a)?Math[_0x52cd('0x2')](_0xad313a):0x0;_0x2556b6=_0x52cd('0x3')===typeof _0x2556b6?',':_0x2556b6;_0x2469ed='undefined'===typeof _0x2469ed?'.':_0x2469ed;var _0x18f775='',_0x18f775=function(_0x20b8c9,_0x31a9b4){var _0xad313a=Math[_0x52cd('0x4')](0xa,_0x31a9b4);return''+(Math['round'](_0x20b8c9*_0xad313a)/_0xad313a)[_0x52cd('0x5')](_0x31a9b4);},_0x18f775=(_0xad313a?_0x18f775(_0x57c123,_0xad313a):''+Math[_0x52cd('0x6')](_0x57c123))[_0x52cd('0x7')]('.');0x3<_0x18f775[0x0][_0x52cd('0x8')]&&(_0x18f775[0x0]=_0x18f775[0x0][_0x52cd('0x9')](/\B(?=(?:\d{3})+(?!\d))/g,_0x2556b6));(_0x18f775[0x1]||'')['length']<_0xad313a&&(_0x18f775[0x1]=_0x18f775[0x1]||'',_0x18f775[0x1]+=Array(_0xad313a-_0x18f775[0x1][_0x52cd('0x8')]+0x1)[_0x52cd('0xa')]('0'));return _0x18f775[_0x52cd('0xa')](_0x2469ed);};(function(){'use strict';try{window[_0x52cd('0xb')]=window[_0x52cd('0xb')]||{};window[_0x52cd('0xb')][_0x52cd('0xc')]=window[_0x52cd('0xb')][_0x52cd('0xc')]||$[_0x52cd('0xd')]();}catch(_0x3b40b2){if(typeof console!==_0x52cd('0x3')&&typeof console['error']===_0x52cd('0xe'))console[_0x52cd('0xf')](_0x52cd('0x10'),_0x3b40b2[_0x52cd('0x11')]);}}());(function(_0x24687b){'use strict';try{var _0x5d9a09=jQuery;var _0x39c0c9='Quatro\x20Digital\x20-\x20DropDown\x20Cart';var _0x32ce48=function(_0x56bb87,_0xcd481f){if(_0x52cd('0x12')===typeof console&&_0x52cd('0x3')!==typeof console[_0x52cd('0xf')]&&_0x52cd('0x3')!==typeof console[_0x52cd('0x13')]&&_0x52cd('0x3')!==typeof console[_0x52cd('0x14')]){var _0x2720e8;'object'===typeof _0x56bb87?(_0x56bb87[_0x52cd('0x15')]('['+_0x39c0c9+']\x0a'),_0x2720e8=_0x56bb87):_0x2720e8=['['+_0x39c0c9+']\x0a'+_0x56bb87];if(_0x52cd('0x3')===typeof _0xcd481f||_0x52cd('0x16')!==_0xcd481f['toLowerCase']()&&_0x52cd('0x17')!==_0xcd481f['toLowerCase']())if(_0x52cd('0x3')!==typeof _0xcd481f&&_0x52cd('0x13')===_0xcd481f[_0x52cd('0x18')]())try{console[_0x52cd('0x13')]['apply'](console,_0x2720e8);}catch(_0xadab72){try{console[_0x52cd('0x13')](_0x2720e8[_0x52cd('0xa')]('\x0a'));}catch(_0x9438bb){}}else try{console[_0x52cd('0xf')][_0x52cd('0x19')](console,_0x2720e8);}catch(_0x554d44){try{console[_0x52cd('0xf')](_0x2720e8[_0x52cd('0xa')]('\x0a'));}catch(_0x5530e9){}}else try{console[_0x52cd('0x14')][_0x52cd('0x19')](console,_0x2720e8);}catch(_0x39786b){try{console[_0x52cd('0x14')](_0x2720e8['join']('\x0a'));}catch(_0x5dfa6d){}}}};window['_QuatroDigital_DropDown']=window[_0x52cd('0x1a')]||{};window[_0x52cd('0x1a')][_0x52cd('0x1b')]=!![];_0x5d9a09[_0x52cd('0x1c')]=function(){};_0x5d9a09['fn']['QD_dropDownCart']=function(){return{'fn':new _0x5d9a09()};};var _0x3334c3=function(_0x2be074){var _0x1da9c2={'o':_0x52cd('0x1d')};return function(_0x1e4088){var _0x3373b3,_0x5624c2,_0x3993b0,_0x410a0b;_0x5624c2=function(_0x2a2797){return _0x2a2797;};_0x3993b0=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x1e4088=_0x1e4088['d'+_0x3993b0[0x10]+'c'+_0x3993b0[0x11]+'m'+_0x5624c2(_0x3993b0[0x1])+'n'+_0x3993b0[0xd]]['l'+_0x3993b0[0x12]+'c'+_0x3993b0[0x0]+'ti'+_0x5624c2('o')+'n'];_0x3373b3=function(_0x49f3c6){return escape(encodeURIComponent(_0x49f3c6['replace'](/\./g,'¨')[_0x52cd('0x9')](/[a-zA-Z]/g,function(_0x1eec75){return String[_0x52cd('0x1e')](('Z'>=_0x1eec75?0x5a:0x7a)>=(_0x1eec75=_0x1eec75[_0x52cd('0x1f')](0x0)+0xd)?_0x1eec75:_0x1eec75-0x1a);})));};var _0x576022=_0x3373b3(_0x1e4088[[_0x3993b0[0x9],_0x5624c2('o'),_0x3993b0[0xc],_0x3993b0[_0x5624c2(0xd)]][_0x52cd('0xa')]('')]);_0x3373b3=_0x3373b3((window[['js',_0x5624c2('no'),'m',_0x3993b0[0x1],_0x3993b0[0x4][_0x52cd('0x20')](),_0x52cd('0x21')]['join']('')]||_0x52cd('0x22'))+['.v',_0x3993b0[0xd],'e',_0x5624c2('x'),'co',_0x5624c2('mm'),_0x52cd('0x23'),_0x3993b0[0x1],'.c',_0x5624c2('o'),'m.',_0x3993b0[0x13],'r'][_0x52cd('0xa')](''));for(var _0x556a32 in _0x1da9c2){if(_0x3373b3===_0x556a32+_0x1da9c2[_0x556a32]||_0x576022===_0x556a32+_0x1da9c2[_0x556a32]){_0x410a0b='tr'+_0x3993b0[0x11]+'e';break;}_0x410a0b='f'+_0x3993b0[0x0]+'ls'+_0x5624c2(_0x3993b0[0x1])+'';}_0x5624c2=!0x1;-0x1<_0x1e4088[[_0x3993b0[0xc],'e',_0x3993b0[0x0],'rc',_0x3993b0[0x9]][_0x52cd('0xa')]('')][_0x52cd('0x24')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x5624c2=!0x0);return[_0x410a0b,_0x5624c2];}(_0x2be074);}(window);if(!eval(_0x3334c3[0x0]))return _0x3334c3[0x1]?_0x32ce48(_0x52cd('0x25')):!0x1;_0x5d9a09[_0x52cd('0x1c')]=function(_0x1692fd,_0x336443){var _0x5003a7,_0xbf93bd,_0x3e5f3f,_0x3b5e42,_0x193a68,_0x83029e,_0x48b0ef,_0x4f915c,_0x31a346,_0x4b663c,_0x286d4b,_0x4b664e;_0x286d4b=_0x5d9a09(_0x1692fd);if(!_0x286d4b[_0x52cd('0x8')])return _0x286d4b;_0x5003a7={'updateOnlyHover':!![],'texts':{'linkCart':_0x52cd('0x26'),'linkCheckout':'Finalizar\x20Compra','cartTotal':_0x52cd('0x27'),'emptyCart':_0x52cd('0x28'),'continueShopping':_0x52cd('0x29'),'shippingForm':_0x52cd('0x2a')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!![],'forceImageHTTPS':![],'skuName':function(_0x16f52a){return _0x16f52a[_0x52cd('0x2b')]||_0x16f52a[_0x52cd('0x2c')];},'callback':function(){},'callbackProductsList':function(){}};_0xbf93bd=_0x5d9a09['extend'](!![],{},_0x5003a7,_0x336443);_0x3e5f3f=_0x5d9a09('');_0x4b663c=this;if(_0xbf93bd['smartCheckout']){var _0xc2eaa1=![];if(typeof window[_0x52cd('0x2d')]===_0x52cd('0x3')){_0x32ce48('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN');_0x5d9a09[_0x52cd('0x2e')]({'url':_0x52cd('0x2f'),'async':![],'dataType':_0x52cd('0x30'),'error':function(){_0x32ce48(_0x52cd('0x31'));_0xc2eaa1=!![];}});}if(_0xc2eaa1)return _0x32ce48(_0x52cd('0x32'));}var _0x566995;if(typeof window[_0x52cd('0x2d')]==='object'&&typeof window[_0x52cd('0x2d')]['checkout']!=='undefined')_0x566995=window[_0x52cd('0x2d')][_0x52cd('0x33')];else if(typeof vtex===_0x52cd('0x12')&&typeof vtex[_0x52cd('0x33')]===_0x52cd('0x12')&&typeof vtex[_0x52cd('0x33')]['SDK']!==_0x52cd('0x3'))_0x566995=new vtex[(_0x52cd('0x33'))][(_0x52cd('0x34'))]();else return _0x32ce48(_0x52cd('0x35'));_0x4b663c['cartContainer']=_0x52cd('0x36')+_0x52cd('0x37')+'<div\x20class=\x22qd_ddc_lightBoxClose\x22></div>'+'<div\x20class=\x22qd-ddc-wrapper3\x22>'+_0x52cd('0x38')+_0x52cd('0x39')+'<span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div>'+_0x52cd('0x3a')+_0x52cd('0x3b')+_0x52cd('0x3c')+_0x52cd('0x3d')+_0x52cd('0x3e')+'</div></div></div></div></div>';_0x83029e=function(_0x3af6a8){var _0x56c975=_0x5d9a09(_0x3af6a8);_0xbf93bd[_0x52cd('0x3f')][_0x52cd('0x40')]=_0xbf93bd[_0x52cd('0x3f')][_0x52cd('0x40')][_0x52cd('0x9')](_0x52cd('0x41'),_0x52cd('0x42'));_0xbf93bd[_0x52cd('0x3f')]['cartTotal']=_0xbf93bd[_0x52cd('0x3f')][_0x52cd('0x40')][_0x52cd('0x9')](_0x52cd('0x43'),_0x52cd('0x44'));_0xbf93bd[_0x52cd('0x3f')][_0x52cd('0x40')]=_0xbf93bd[_0x52cd('0x3f')]['cartTotal'][_0x52cd('0x9')]('#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>');_0xbf93bd['texts']['cartTotal']=_0xbf93bd[_0x52cd('0x3f')][_0x52cd('0x40')][_0x52cd('0x9')](_0x52cd('0x45'),_0x52cd('0x46'));_0x56c975[_0x52cd('0x47')](_0x52cd('0x48'))['html'](_0xbf93bd[_0x52cd('0x3f')][_0x52cd('0x49')]);_0x56c975[_0x52cd('0x47')](_0x52cd('0x4a'))[_0x52cd('0x4b')](_0xbf93bd[_0x52cd('0x3f')][_0x52cd('0x4c')]);_0x56c975['find'](_0x52cd('0x4d'))['html'](_0xbf93bd[_0x52cd('0x3f')][_0x52cd('0x4e')]);_0x56c975[_0x52cd('0x47')]('.qd-ddc-infoTotal')[_0x52cd('0x4b')](_0xbf93bd[_0x52cd('0x3f')][_0x52cd('0x40')]);_0x56c975[_0x52cd('0x47')]('.qd-ddc-shipping')[_0x52cd('0x4b')](_0xbf93bd['texts'][_0x52cd('0x4f')]);_0x56c975[_0x52cd('0x47')]('.qd-ddc-emptyCart\x20p')[_0x52cd('0x4b')](_0xbf93bd[_0x52cd('0x3f')][_0x52cd('0x50')]);return _0x56c975;};_0x193a68=function(_0x5e89c3){_0x5d9a09(this)['append'](_0x5e89c3);_0x5e89c3['find'](_0x52cd('0x51'))[_0x52cd('0x52')](_0x5d9a09(_0x52cd('0x53')))['on'](_0x52cd('0x54'),function(){_0x286d4b[_0x52cd('0x55')]('qd-bb-lightBoxProdAdd');_0x5d9a09(document[_0x52cd('0x56')])[_0x52cd('0x55')]('qd-bb-lightBoxBodyProdAdd');});_0x5d9a09(document)[_0x52cd('0x57')]('keyup.qd_ddc_closeFn')['on'](_0x52cd('0x58'),function(_0x4170fd){if(_0x4170fd[_0x52cd('0x59')]==0x1b){_0x286d4b['removeClass']('qd-bb-lightBoxProdAdd');_0x5d9a09(document[_0x52cd('0x56')])['removeClass']('qd-bb-lightBoxBodyProdAdd');}});var _0x305c5a=_0x5e89c3['find'](_0x52cd('0x5a'));_0x5e89c3['find'](_0x52cd('0x5b'))['on'](_0x52cd('0x5c'),function(){_0x4b663c[_0x52cd('0x5d')]('-',undefined,undefined,_0x305c5a);return![];});_0x5e89c3[_0x52cd('0x47')](_0x52cd('0x5e'))['on'](_0x52cd('0x5f'),function(){_0x4b663c[_0x52cd('0x5d')](undefined,undefined,undefined,_0x305c5a);return![];});var _0x7e7f34=_0x5e89c3[_0x52cd('0x47')]('.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text');_0x5e89c3['find'](_0x52cd('0x60'))[_0x52cd('0x61')]('')['on']('keyup.qd_ddc_cep',function(_0x7acaa0){_0x4b663c[_0x52cd('0x62')](_0x5d9a09(this));if(_0x7acaa0['keyCode']==0xd)_0x5e89c3[_0x52cd('0x47')](_0x52cd('0x63'))[_0x52cd('0x64')]();});_0x5e89c3[_0x52cd('0x47')](_0x52cd('0x65'))[_0x52cd('0x64')](function(_0x311765){_0x311765[_0x52cd('0x66')]();_0x7e7f34[_0x52cd('0x67')]();});_0x5e89c3[_0x52cd('0x47')](_0x52cd('0x68'))[_0x52cd('0x64')](function(_0x20db18){_0x20db18[_0x52cd('0x66')]();_0x7e7f34['hide']();});_0x5d9a09(document)[_0x52cd('0x57')](_0x52cd('0x69'))['on'](_0x52cd('0x69'),function(_0x3f0cfa){if(_0x5d9a09(_0x3f0cfa[_0x52cd('0x6a')])[_0x52cd('0x1')](_0x5e89c3[_0x52cd('0x47')](_0x52cd('0x6b')))['length'])return;_0x7e7f34[_0x52cd('0x6c')]();});_0x5e89c3[_0x52cd('0x47')](_0x52cd('0x6d'))[_0x52cd('0x64')](function(_0x565a2f){_0x565a2f['preventDefault']();_0x4b663c['shippingCalculate'](_0x5e89c3[_0x52cd('0x47')](_0x52cd('0x6e')));});if(_0xbf93bd[_0x52cd('0x6f')]){var _0x3b7fb5=0x0;_0x5d9a09(this)['on'](_0x52cd('0x70'),function(){var _0x27b316=function(){if(!window['_QuatroDigital_DropDown']['allowUpdate'])return;_0x4b663c[_0x52cd('0x71')]();window[_0x52cd('0x1a')][_0x52cd('0x1b')]=![];_0x5d9a09['fn'][_0x52cd('0x72')](!![]);_0x4b663c[_0x52cd('0x73')]();};_0x3b7fb5=setInterval(function(){_0x27b316();},0x258);_0x27b316();});_0x5d9a09(this)['on']('mouseleave.qd_ddc_hover',function(){clearInterval(_0x3b7fb5);});}};_0x48b0ef=_0x83029e(this[_0x52cd('0x74')]);_0x4f915c=0x0;_0x286d4b[_0x52cd('0x75')](function(){if(_0x4f915c>0x0)_0x193a68['call'](this,_0x48b0ef['clone']());else _0x193a68['call'](this,_0x48b0ef);_0x4f915c++;});window[_0x52cd('0xb')]['callback'][_0x52cd('0x52')](function(){_0x5d9a09('.qd-ddc-infoTotalValue')['html'](window[_0x52cd('0xb')][_0x52cd('0x76')]||'--');_0x5d9a09(_0x52cd('0x77'))[_0x52cd('0x4b')](window['_QuatroDigital_CartData'][_0x52cd('0x78')]||'0');_0x5d9a09('.qd-ddc-infoTotalShipping')[_0x52cd('0x4b')](window[_0x52cd('0xb')][_0x52cd('0x79')]||'--');_0x5d9a09('.qd-ddc-infoAllTotal')[_0x52cd('0x4b')](window[_0x52cd('0xb')][_0x52cd('0x7a')]||'--');});_0x31a346=function(_0x5ed287){_0x32ce48(_0x52cd('0x7b'));};_0x4b664e=function(_0x19aab2,_0x47c7a3){if(typeof _0x19aab2[_0x52cd('0x7c')]==='undefined')return _0x32ce48(_0x52cd('0x7d'));_0x4b663c['renderProductsList'][_0x52cd('0x7e')](this,_0x47c7a3);};_0x4b663c[_0x52cd('0x71')]=function(_0x4e148e,_0xe8cf56){var _0x5cddc0;if(typeof _0xe8cf56!='undefined')window[_0x52cd('0x1a')][_0x52cd('0x7f')]=_0xe8cf56;else if(window['_QuatroDigital_DropDown'][_0x52cd('0x7f')])_0xe8cf56=window[_0x52cd('0x1a')][_0x52cd('0x7f')];setTimeout(function(){window[_0x52cd('0x1a')][_0x52cd('0x7f')]=undefined;},_0xbf93bd[_0x52cd('0x80')]);_0x5d9a09('.qd-ddc-wrapper')[_0x52cd('0x55')](_0x52cd('0x81'));if(_0xbf93bd['smartCheckout']){_0x5cddc0=function(_0x5bc9a){window[_0x52cd('0x1a')]['getOrderForm']=_0x5bc9a;_0x4b664e(_0x5bc9a,_0xe8cf56);if(typeof window[_0x52cd('0x82')]!==_0x52cd('0x3')&&typeof window[_0x52cd('0x82')][_0x52cd('0x83')]===_0x52cd('0xe'))window[_0x52cd('0x82')][_0x52cd('0x83')][_0x52cd('0x7e')](this);_0x5d9a09('.qd-ddc-wrapper')[_0x52cd('0x84')](_0x52cd('0x81'));};if(typeof window[_0x52cd('0x1a')]['getOrderForm']!==_0x52cd('0x3')){_0x5cddc0(window[_0x52cd('0x1a')][_0x52cd('0x85')]);if(typeof _0x4e148e===_0x52cd('0xe'))_0x4e148e(window[_0x52cd('0x1a')][_0x52cd('0x85')]);return;}_0x5d9a09[_0x52cd('0x86')](['items',_0x52cd('0x87'),_0x52cd('0x88')],{'done':function(_0x57910b){_0x5cddc0['call'](this,_0x57910b);if(typeof _0x4e148e===_0x52cd('0xe'))_0x4e148e(_0x57910b);},'fail':function(_0x21cb6a){_0x32ce48(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0x21cb6a]);}});}else{alert(_0x52cd('0x89'));}};_0x4b663c['cartIsEmpty']=function(){var _0x2ece85=_0x5d9a09(_0x52cd('0x8a'));if(_0x2ece85[_0x52cd('0x47')](_0x52cd('0x8b'))[_0x52cd('0x8')])_0x2ece85[_0x52cd('0x55')](_0x52cd('0x8c'));else _0x2ece85[_0x52cd('0x84')](_0x52cd('0x8c'));};_0x4b663c[_0x52cd('0x8d')]=function(_0x45ff19){var _0x358998=_0x5d9a09(_0x52cd('0x8e'));var _0x1ea940=_0x52cd('0x8f')+_0x52cd('0x90')+'<div\x20class=\x22qd-ddc-prodImgWrapper\x22>'+_0x52cd('0x91')+'<span\x20class=\x22qd-ddc-imgLoading\x22></span>'+_0x52cd('0x92')+_0x52cd('0x92')+_0x52cd('0x93')+_0x52cd('0x94')+_0x52cd('0x95')+'<div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22>'+_0x52cd('0x96')+_0x52cd('0x97')+_0x52cd('0x98')+_0x52cd('0x99')+'</div>'+_0x52cd('0x92')+'<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22>'+_0x52cd('0x9a')+_0x52cd('0x9b')+'<span\x20class=\x22qd-ddc-prodRowLoading\x22></span>'+_0x52cd('0x92')+_0x52cd('0x92')+_0x52cd('0x92');_0x358998[_0x52cd('0x9c')]();_0x358998[_0x52cd('0x75')](function(){var _0x304d5e=_0x5d9a09(this);var _0x33901a,_0x117e28,_0x461df7,_0x4a3a90;var _0x2a2cea=_0x5d9a09('');var _0x593d15;for(var _0x4f576d in window[_0x52cd('0x1a')]['getOrderForm'][_0x52cd('0x7c')]){if(typeof window[_0x52cd('0x1a')][_0x52cd('0x85')][_0x52cd('0x7c')][_0x4f576d]!=='object')continue;_0x461df7=window[_0x52cd('0x1a')][_0x52cd('0x85')][_0x52cd('0x7c')][_0x4f576d];_0x593d15=_0x461df7['productCategoryIds']['replace'](/^\/|\/$/g,'')[_0x52cd('0x7')]('/');_0x117e28=_0x5d9a09(_0x1ea940);_0x117e28[_0x52cd('0x9d')]({'data-sku':_0x461df7['id'],'data-sku-index':_0x4f576d,'data-qd-departament':_0x593d15[0x0],'data-qd-category':_0x593d15[_0x593d15[_0x52cd('0x8')]-0x1]});_0x117e28[_0x52cd('0x84')](_0x52cd('0x9e')+_0x461df7[_0x52cd('0x9f')]);_0x117e28[_0x52cd('0x47')](_0x52cd('0xa0'))[_0x52cd('0xa1')](_0xbf93bd[_0x52cd('0x2b')](_0x461df7));_0x117e28[_0x52cd('0x47')](_0x52cd('0xa2'))[_0x52cd('0xa1')](isNaN(_0x461df7['sellingPrice'])?_0x461df7[_0x52cd('0xa3')]:_0x461df7[_0x52cd('0xa3')]==0x0?_0x52cd('0xa4'):(_0x5d9a09(_0x52cd('0xa5'))[_0x52cd('0x9d')]('content')||'R$')+'\x20'+qd_number_format(_0x461df7[_0x52cd('0xa3')]/0x64,0x2,',','.'));_0x117e28[_0x52cd('0x47')](_0x52cd('0xa6'))[_0x52cd('0x9d')]({'data-sku':_0x461df7['id'],'data-sku-index':_0x4f576d})[_0x52cd('0x61')](_0x461df7['quantity']);_0x117e28['find']('.qd-ddc-remove')['attr']({'data-sku':_0x461df7['id'],'data-sku-index':_0x4f576d});_0x4b663c[_0x52cd('0xa7')](_0x461df7['id'],_0x117e28[_0x52cd('0x47')](_0x52cd('0xa8')),_0x461df7[_0x52cd('0xa9')]);_0x117e28[_0x52cd('0x47')](_0x52cd('0xaa'))[_0x52cd('0x9d')]({'data-sku':_0x461df7['id'],'data-sku-index':_0x4f576d});_0x117e28['appendTo'](_0x304d5e);_0x2a2cea=_0x2a2cea[_0x52cd('0x52')](_0x117e28);}try{var _0x35eb0f=_0x304d5e[_0x52cd('0x0')](_0x52cd('0x8a'))[_0x52cd('0x47')](_0x52cd('0xab'));if(_0x35eb0f[_0x52cd('0x8')]&&_0x35eb0f[_0x52cd('0x61')]()==''&&window['_QuatroDigital_DropDown'][_0x52cd('0x85')][_0x52cd('0x88')]['address'])_0x35eb0f[_0x52cd('0x61')](window[_0x52cd('0x1a')]['getOrderForm'][_0x52cd('0x88')]['address'][_0x52cd('0xac')]);}catch(_0x447920){_0x32ce48(_0x52cd('0xad')+_0x447920[_0x52cd('0x11')],'aviso');}_0x4b663c['actionButtons'](_0x304d5e);_0x4b663c[_0x52cd('0x73')]();if(_0x45ff19&&_0x45ff19[_0x52cd('0xae')]){(function(){_0x4a3a90=_0x2a2cea['filter'](_0x52cd('0xaf')+_0x45ff19[_0x52cd('0xae')]+'\x27]');if(!_0x4a3a90[_0x52cd('0x8')])return;_0x33901a=0x0;_0x2a2cea[_0x52cd('0x75')](function(){var _0xd1d746=_0x5d9a09(this);if(_0xd1d746['is'](_0x4a3a90))return![];_0x33901a+=_0xd1d746[_0x52cd('0xb0')]();});_0x4b663c['scrollCart'](undefined,undefined,_0x33901a,_0x304d5e[_0x52cd('0x52')](_0x304d5e[_0x52cd('0xb1')]()));_0x2a2cea[_0x52cd('0x55')]('qd-ddc-lastAddedFixed');(function(_0x53e263){_0x53e263[_0x52cd('0x84')](_0x52cd('0xb2'));_0x53e263[_0x52cd('0x84')]('qd-ddc-lastAddedFixed');setTimeout(function(){_0x53e263[_0x52cd('0x55')](_0x52cd('0xb2'));},_0xbf93bd['timeRemoveNewItemClass']);}(_0x4a3a90));_0x5d9a09(document[_0x52cd('0x56')])['addClass']('qd-ddc-product-add-time-v2');setTimeout(function(){_0x5d9a09(document['body'])[_0x52cd('0x55')](_0x52cd('0xb3'));},_0xbf93bd[_0x52cd('0x80')]);}());}});(function(){if(_QuatroDigital_DropDown['getOrderForm']['items'][_0x52cd('0x8')]){_0x5d9a09(_0x52cd('0x56'))[_0x52cd('0x55')](_0x52cd('0xb4'))['addClass'](_0x52cd('0xb5'));setTimeout(function(){_0x5d9a09('body')[_0x52cd('0x55')](_0x52cd('0xb6'));},_0xbf93bd[_0x52cd('0x80')]);}else _0x5d9a09(_0x52cd('0x56'))[_0x52cd('0x55')](_0x52cd('0xb7'))[_0x52cd('0x84')](_0x52cd('0xb4'));}());if(typeof _0xbf93bd[_0x52cd('0xb8')]===_0x52cd('0xe'))_0xbf93bd['callbackProductsList'][_0x52cd('0x7e')](this);else _0x32ce48(_0x52cd('0xb9'));};_0x4b663c['insertProdImg']=function(_0x40bc9b,_0x42e9ef,_0x4a731c){var _0x15ca78=!![];function _0x19740a(){if(_0xbf93bd['forceImageHTTPS']&&typeof _0x4a731c=='string')_0x4a731c=_0x4a731c[_0x52cd('0x9')]('http',_0x52cd('0xba'));_0x42e9ef[_0x52cd('0x55')](_0x52cd('0xbb'))[_0x52cd('0xbc')](function(){_0x5d9a09(this)['addClass']('qd-loaded');})[_0x52cd('0x9d')](_0x52cd('0xbd'),_0x4a731c);};if(_0x4a731c)_0x19740a();else if(!isNaN(_0x40bc9b)){alert(_0x52cd('0xbe'));}else _0x32ce48(_0x52cd('0xbf'),_0x52cd('0x16'));};_0x4b663c[_0x52cd('0xc0')]=function(_0x3075fe){var _0xcf1675,_0x2bf588,_0x421bad,_0x1d02a5;_0xcf1675=function(_0x190848,_0x3f7e02){var _0x11f459,_0x57939e,_0x122719,_0x3f9cc3,_0x1d1664;_0x122719=_0x5d9a09(_0x190848);_0x11f459=_0x122719[_0x52cd('0x9d')](_0x52cd('0xc1'));_0x1d1664=_0x122719[_0x52cd('0x9d')](_0x52cd('0xc2'));if(!_0x11f459)return;_0x57939e=parseInt(_0x122719[_0x52cd('0x61')]())||0x1;_0x4b663c[_0x52cd('0xc3')]([_0x11f459,_0x1d1664],_0x57939e,_0x57939e+0x1,function(_0x3f01c5){_0x122719[_0x52cd('0x61')](_0x3f01c5);if(typeof _0x3f7e02===_0x52cd('0xe'))_0x3f7e02();});};_0x421bad=function(_0x23ac4f,_0x5e5b6d){var _0x283abe,_0x27ce3c,_0x554e6c,_0xa487ad,_0x149440;_0x554e6c=_0x5d9a09(_0x23ac4f);_0x283abe=_0x554e6c['attr'](_0x52cd('0xc1'));_0x149440=_0x554e6c[_0x52cd('0x9d')](_0x52cd('0xc2'));if(!_0x283abe)return;_0x27ce3c=parseInt(_0x554e6c[_0x52cd('0x61')]())||0x2;_0xa487ad=_0x4b663c[_0x52cd('0xc3')]([_0x283abe,_0x149440],_0x27ce3c,_0x27ce3c-0x1,function(_0x4df7ec){_0x554e6c[_0x52cd('0x61')](_0x4df7ec);if(typeof _0x5e5b6d==='function')_0x5e5b6d();});};_0x1d02a5=function(_0x2d6325,_0x521c53){var _0x3dd7a4,_0x3e3fcd,_0x1bbd93,_0x4043d7,_0x21bcc8;_0x1bbd93=_0x5d9a09(_0x2d6325);_0x3dd7a4=_0x1bbd93[_0x52cd('0x9d')]('data-sku');_0x21bcc8=_0x1bbd93[_0x52cd('0x9d')](_0x52cd('0xc2'));if(!_0x3dd7a4)return;_0x3e3fcd=parseInt(_0x1bbd93[_0x52cd('0x61')]())||0x1;_0x4043d7=_0x4b663c[_0x52cd('0xc3')]([_0x3dd7a4,_0x21bcc8],0x1,_0x3e3fcd,function(_0x274d60){_0x1bbd93[_0x52cd('0x61')](_0x274d60);if(typeof _0x521c53===_0x52cd('0xe'))_0x521c53();});};_0x2bf588=_0x3075fe[_0x52cd('0x47')]('.qd-ddc-prodQttWrapper:not(.qd_on)');_0x2bf588['addClass']('qd_on')[_0x52cd('0x75')](function(){var _0x286a24=_0x5d9a09(this);_0x286a24[_0x52cd('0x47')]('.qd-ddc-quantityMore')['on'](_0x52cd('0xc4'),function(_0x57dce1){_0x57dce1['preventDefault']();_0x2bf588['addClass'](_0x52cd('0xc5'));_0xcf1675(_0x286a24[_0x52cd('0x47')]('.qd-ddc-quantity'),function(){_0x2bf588[_0x52cd('0x55')](_0x52cd('0xc5'));});});_0x286a24['find']('.qd-ddc-quantityMinus')['on']('click.qd_ddc_minus',function(_0x118ecb){_0x118ecb[_0x52cd('0x66')]();_0x2bf588[_0x52cd('0x84')](_0x52cd('0xc5'));_0x421bad(_0x286a24[_0x52cd('0x47')]('.qd-ddc-quantity'),function(){_0x2bf588[_0x52cd('0x55')](_0x52cd('0xc5'));});});_0x286a24[_0x52cd('0x47')]('.qd-ddc-quantity')['on'](_0x52cd('0xc6'),function(){_0x2bf588[_0x52cd('0x84')](_0x52cd('0xc5'));_0x1d02a5(this,function(){_0x2bf588[_0x52cd('0x55')]('qd-loading');});});_0x286a24[_0x52cd('0x47')]('.qd-ddc-quantity')['on'](_0x52cd('0xc7'),function(_0x2910a1){if(_0x2910a1[_0x52cd('0x59')]!=0xd)return;_0x2bf588[_0x52cd('0x84')]('qd-loading');_0x1d02a5(this,function(){_0x2bf588[_0x52cd('0x55')](_0x52cd('0xc5'));});});});_0x3075fe[_0x52cd('0x47')](_0x52cd('0x8b'))[_0x52cd('0x75')](function(){var _0x25bb5c=_0x5d9a09(this);_0x25bb5c[_0x52cd('0x47')](_0x52cd('0xc8'))['on']('click.qd_ddc_remove',function(){var _0x5ae346;_0x25bb5c['addClass']('qd-loading');_0x4b663c['removeProduct'](_0x5d9a09(this),function(_0x120f02){if(_0x120f02)_0x25bb5c['stop'](!![])[_0x52cd('0xc9')](function(){_0x25bb5c[_0x52cd('0xca')]();_0x4b663c[_0x52cd('0x73')]();});else _0x25bb5c[_0x52cd('0x55')](_0x52cd('0xc5'));});return![];});});};_0x4b663c[_0x52cd('0x62')]=function(_0x32bf76){var _0x2894ea=_0x32bf76[_0x52cd('0x61')]();_0x2894ea=_0x2894ea[_0x52cd('0x9')](/[^0-9\-]/g,'');_0x2894ea=_0x2894ea['replace'](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x52cd('0xcb'));_0x2894ea=_0x2894ea[_0x52cd('0x9')](/(.{9}).*/g,'$1');_0x32bf76['val'](_0x2894ea);};_0x4b663c[_0x52cd('0xcc')]=function(_0x5499cf){var _0x25548d=_0x5499cf[_0x52cd('0x61')]();if(_0x25548d['length']>=0x9){if(_0x5499cf['data']('qdDdcLastPostalCode')!=_0x25548d){_0x566995[_0x52cd('0xcd')]({'postalCode':_0x25548d,'country':_0x52cd('0xce')})['done'](function(_0x5f1a8a){_0x5499cf[_0x52cd('0x1')]('.qd-ddc-cep-tooltip-text')[_0x52cd('0x47')](_0x52cd('0xcf'))['remove']();window['_QuatroDigital_DropDown'][_0x52cd('0x85')]=_0x5f1a8a;_0x4b663c[_0x52cd('0x71')]();var _0x5b0a69=_0x5f1a8a[_0x52cd('0x88')][_0x52cd('0xd0')][0x0][_0x52cd('0xd1')];var _0x535c8f=_0x5d9a09(_0x52cd('0xd2'));for(var _0x2fa239=0x0;_0x2fa239<_0x5b0a69[_0x52cd('0x8')];_0x2fa239++){var _0x182f50=_0x5b0a69[_0x2fa239];var _0x278eb9=_0x182f50[_0x52cd('0xd3')]>0x1?_0x182f50[_0x52cd('0xd3')][_0x52cd('0x9')]('bd',_0x52cd('0xd4')):_0x182f50[_0x52cd('0xd3')][_0x52cd('0x9')]('bd',_0x52cd('0xd5'));var _0x401aef=_0x5d9a09(_0x52cd('0xd6'));_0x401aef[_0x52cd('0xa1')](_0x52cd('0xd7')+qd_number_format(_0x182f50[_0x52cd('0xd8')]/0x64,0x2,',','.')+_0x52cd('0xd9')+_0x182f50[_0x52cd('0x2c')]+_0x52cd('0xda')+_0x278eb9+_0x52cd('0xdb')+_0x25548d+'</td>');_0x401aef['appendTo'](_0x535c8f[_0x52cd('0x47')]('tbody'));}_0x535c8f[_0x52cd('0xdc')](_0x5499cf['closest'](_0x52cd('0xdd'))[_0x52cd('0x47')]('.qd-ddc-cep-close'));})[_0x52cd('0xde')](function(_0x370b34){_0x32ce48([_0x52cd('0xdf'),_0x370b34]);updateCartData();});}_0x5499cf[_0x52cd('0xe0')](_0x52cd('0xe1'),_0x25548d);}};_0x4b663c[_0x52cd('0xc3')]=function(_0x5cf540,_0x2d5771,_0x197cac,_0x25953b){var _0x17ca1d=_0x197cac||0x1;if(_0x17ca1d<0x1)return _0x2d5771;if(_0xbf93bd[_0x52cd('0xe2')]){if(typeof window[_0x52cd('0x1a')][_0x52cd('0x85')]['items'][_0x5cf540[0x1]]===_0x52cd('0x3')){_0x32ce48(_0x52cd('0xe3')+_0x5cf540[0x1]+']');return _0x2d5771;}window['_QuatroDigital_DropDown']['getOrderForm'][_0x52cd('0x7c')][_0x5cf540[0x1]][_0x52cd('0xe4')]=_0x17ca1d;window[_0x52cd('0x1a')][_0x52cd('0x85')]['items'][_0x5cf540[0x1]][_0x52cd('0xe5')]=_0x5cf540[0x1];_0x566995[_0x52cd('0xe6')]([window[_0x52cd('0x1a')]['getOrderForm'][_0x52cd('0x7c')][_0x5cf540[0x1]]],[_0x52cd('0x7c'),_0x52cd('0x87'),_0x52cd('0x88')])[_0x52cd('0xe7')](function(_0x136543){window[_0x52cd('0x1a')]['getOrderForm']=_0x136543;_0x3750e8(!![]);})[_0x52cd('0xde')](function(_0x48bc8d){_0x32ce48(['Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho',_0x48bc8d]);_0x3750e8();});}else{_0x32ce48(_0x52cd('0xe8'));}function _0x3750e8(_0x10c508){_0x10c508=typeof _0x10c508!==_0x52cd('0xe9')?![]:_0x10c508;_0x4b663c[_0x52cd('0x71')]();window[_0x52cd('0x1a')]['allowUpdate']=![];_0x4b663c[_0x52cd('0x73')]();if(typeof window['_QuatroDigital_AmountProduct']!==_0x52cd('0x3')&&typeof window[_0x52cd('0x82')][_0x52cd('0x83')]===_0x52cd('0xe'))window[_0x52cd('0x82')]['exec'][_0x52cd('0x7e')](this);if(typeof adminCart===_0x52cd('0xe'))adminCart();_0x5d9a09['fn'][_0x52cd('0x72')](!![],undefined,_0x10c508);if(typeof _0x25953b===_0x52cd('0xe'))_0x25953b(_0x2d5771);};};_0x4b663c['removeProduct']=function(_0x56aeaf,_0x56bba4){var _0xf74f5d=![];var _0xdf194d=_0x5d9a09(_0x56aeaf);var _0x4d0799=_0xdf194d[_0x52cd('0x9d')](_0x52cd('0xc2'));if(_0xbf93bd['smartCheckout']){if(typeof window[_0x52cd('0x1a')][_0x52cd('0x85')]['items'][_0x4d0799]==='undefined'){_0x32ce48(_0x52cd('0xe3')+_0x4d0799+']');return _0xf74f5d;}window[_0x52cd('0x1a')]['getOrderForm'][_0x52cd('0x7c')][_0x4d0799]['index']=_0x4d0799;_0x566995['removeItems']([window[_0x52cd('0x1a')][_0x52cd('0x85')][_0x52cd('0x7c')][_0x4d0799]],['items',_0x52cd('0x87'),'shippingData'])[_0x52cd('0xe7')](function(_0x47f32f){_0xf74f5d=!![];window[_0x52cd('0x1a')]['getOrderForm']=_0x47f32f;_0x4b664e(_0x47f32f);_0x2af512(!![]);})[_0x52cd('0xde')](function(_0xd389f9){_0x32ce48(['Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho',_0xd389f9]);_0x2af512();});}else{alert(_0x52cd('0xea'));}function _0x2af512(_0x1202b6){_0x1202b6=typeof _0x1202b6!=='boolean'?![]:_0x1202b6;if(typeof window[_0x52cd('0x82')]!=='undefined'&&typeof window[_0x52cd('0x82')]['exec']===_0x52cd('0xe'))window[_0x52cd('0x82')][_0x52cd('0x83')]['call'](this);if(typeof adminCart===_0x52cd('0xe'))adminCart();_0x5d9a09['fn'][_0x52cd('0x72')](!![],undefined,_0x1202b6);if(typeof _0x56bba4===_0x52cd('0xe'))_0x56bba4(_0xf74f5d);};};_0x4b663c['scrollCart']=function(_0x1c6e48,_0x4d8be8,_0x15e17d,_0x590679){var _0x2b1184=_0x590679||_0x5d9a09(_0x52cd('0xeb'));var _0x20cf40=_0x1c6e48||'+';var _0xb69c97=_0x4d8be8||_0x2b1184[_0x52cd('0xec')]()*0.9;_0x2b1184[_0x52cd('0xed')](!![],!![])[_0x52cd('0xee')]({'scrollTop':isNaN(_0x15e17d)?_0x20cf40+'='+_0xb69c97+'px':_0x15e17d});};if(!_0xbf93bd[_0x52cd('0x6f')]){_0x4b663c[_0x52cd('0x71')]();_0x5d9a09['fn'][_0x52cd('0x72')](!![]);}_0x5d9a09(window)['on'](_0x52cd('0xef'),function(){try{window[_0x52cd('0x1a')]['getOrderForm']=undefined;_0x4b663c[_0x52cd('0x71')]();}catch(_0x71eeb0){_0x32ce48(_0x52cd('0xf0')+_0x71eeb0[_0x52cd('0x11')],'avisso');}});if(typeof _0xbf93bd[_0x52cd('0xc')]===_0x52cd('0xe'))_0xbf93bd[_0x52cd('0xc')][_0x52cd('0x7e')](this);else _0x32ce48('Callback\x20não\x20é\x20uma\x20função');};_0x5d9a09['fn'][_0x52cd('0x1c')]=function(_0x3b3d54){var _0x44ac46;_0x44ac46=_0x5d9a09(this);_0x44ac46['fn']=new _0x5d9a09[(_0x52cd('0x1c'))](this,_0x3b3d54);return _0x44ac46;};}catch(_0x3c7a7d){if(typeof console!==_0x52cd('0x3')&&typeof console[_0x52cd('0xf')]===_0x52cd('0xe'))console[_0x52cd('0xf')]('Oooops!\x20',_0x3c7a7d);}}(this));(function(_0x3b65ef){'use strict';try{var _0x48a4bb=jQuery;var _0x5e2498=_0x52cd('0xf1');var _0x3e0e26=function(_0x4ba098,_0x314a60){if(_0x52cd('0x12')===typeof console&&_0x52cd('0x3')!==typeof console[_0x52cd('0xf')]&&_0x52cd('0x3')!==typeof console['info']&&_0x52cd('0x3')!==typeof console[_0x52cd('0x14')]){var _0x355a4c;_0x52cd('0x12')===typeof _0x4ba098?(_0x4ba098['unshift']('['+_0x5e2498+']\x0a'),_0x355a4c=_0x4ba098):_0x355a4c=['['+_0x5e2498+']\x0a'+_0x4ba098];if('undefined'===typeof _0x314a60||_0x52cd('0x16')!==_0x314a60[_0x52cd('0x18')]()&&_0x52cd('0x17')!==_0x314a60['toLowerCase']())if(_0x52cd('0x3')!==typeof _0x314a60&&'info'===_0x314a60[_0x52cd('0x18')]())try{console[_0x52cd('0x13')][_0x52cd('0x19')](console,_0x355a4c);}catch(_0x1238a0){try{console[_0x52cd('0x13')](_0x355a4c[_0x52cd('0xa')]('\x0a'));}catch(_0x5a00cf){}}else try{console[_0x52cd('0xf')][_0x52cd('0x19')](console,_0x355a4c);}catch(_0x3e376e){try{console[_0x52cd('0xf')](_0x355a4c[_0x52cd('0xa')]('\x0a'));}catch(_0x366f89){}}else try{console[_0x52cd('0x14')][_0x52cd('0x19')](console,_0x355a4c);}catch(_0x14a346){try{console[_0x52cd('0x14')](_0x355a4c['join']('\x0a'));}catch(_0x527752){}}}};window[_0x52cd('0x82')]=window[_0x52cd('0x82')]||{};window[_0x52cd('0x82')][_0x52cd('0x7c')]={};window['_QuatroDigital_AmountProduct']['allowRecalculate']=![];window[_0x52cd('0x82')]['buyButtonClicked']=![];window[_0x52cd('0x82')][_0x52cd('0xf2')]=![];var _0xc79ffc='<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>';var _0x3f1980=function(){var _0x4a2410,_0x34c6df,_0xdb62c7,_0x2a8876;_0x2a8876=_0x1484ec();if(window[_0x52cd('0x82')][_0x52cd('0xf3')]){_0x48a4bb(_0x52cd('0xf4'))[_0x52cd('0xca')]();_0x48a4bb('.qd-bap-item-added')[_0x52cd('0x55')](_0x52cd('0xf5'));}for(var _0x114d5f in window['_QuatroDigital_AmountProduct'][_0x52cd('0x7c')]){_0x4a2410=window[_0x52cd('0x82')][_0x52cd('0x7c')][_0x114d5f];if(typeof _0x4a2410!==_0x52cd('0x12'))return;_0xdb62c7=_0x48a4bb(_0x52cd('0xf6')+_0x4a2410['prodId']+']')[_0x52cd('0x0')]('li');if(!window['_QuatroDigital_AmountProduct'][_0x52cd('0xf3')]&&_0xdb62c7[_0x52cd('0x47')]('.qd-bap-wrapper')[_0x52cd('0x8')])continue;_0x34c6df=_0x48a4bb(_0xc79ffc);_0x34c6df[_0x52cd('0x47')](_0x52cd('0xf7'))[_0x52cd('0x4b')](_0x4a2410[_0x52cd('0x78')]);var _0x2eb946=_0xdb62c7[_0x52cd('0x47')](_0x52cd('0xf8'));if(_0x2eb946[_0x52cd('0x8')])_0x2eb946['prepend'](_0x34c6df)[_0x52cd('0x84')](_0x52cd('0xf5'));else _0xdb62c7[_0x52cd('0xf9')](_0x34c6df);}if(_0x2a8876)window[_0x52cd('0x82')][_0x52cd('0xf3')]=![];};var _0x1484ec=function(){if(!window['_QuatroDigital_AmountProduct'][_0x52cd('0xf3')])return;var _0x528e95=![],_0x139e8b={};window[_0x52cd('0x82')][_0x52cd('0x7c')]={};for(var _0x1dff61 in window[_0x52cd('0x1a')][_0x52cd('0x85')][_0x52cd('0x7c')]){if(typeof window['_QuatroDigital_DropDown'][_0x52cd('0x85')][_0x52cd('0x7c')][_0x1dff61]!==_0x52cd('0x12'))continue;var _0x403cc2=window[_0x52cd('0x1a')][_0x52cd('0x85')][_0x52cd('0x7c')][_0x1dff61];if(typeof _0x403cc2[_0x52cd('0xfa')]===_0x52cd('0x3')||_0x403cc2[_0x52cd('0xfa')]===null||_0x403cc2[_0x52cd('0xfa')]==='')continue;window['_QuatroDigital_AmountProduct']['items'][_0x52cd('0xfb')+_0x403cc2[_0x52cd('0xfa')]]=window['_QuatroDigital_AmountProduct'][_0x52cd('0x7c')][_0x52cd('0xfb')+_0x403cc2[_0x52cd('0xfa')]]||{};window['_QuatroDigital_AmountProduct']['items'][_0x52cd('0xfb')+_0x403cc2[_0x52cd('0xfa')]][_0x52cd('0xfc')]=_0x403cc2['productId'];if(!_0x139e8b['prod_'+_0x403cc2[_0x52cd('0xfa')]])window['_QuatroDigital_AmountProduct'][_0x52cd('0x7c')][_0x52cd('0xfb')+_0x403cc2[_0x52cd('0xfa')]][_0x52cd('0x78')]=0x0;window[_0x52cd('0x82')][_0x52cd('0x7c')][_0x52cd('0xfb')+_0x403cc2[_0x52cd('0xfa')]]['qtt']=window[_0x52cd('0x82')]['items'][_0x52cd('0xfb')+_0x403cc2[_0x52cd('0xfa')]][_0x52cd('0x78')]+_0x403cc2[_0x52cd('0xe4')];_0x528e95=!![];_0x139e8b[_0x52cd('0xfb')+_0x403cc2[_0x52cd('0xfa')]]=!![];}return _0x528e95;};window['_QuatroDigital_AmountProduct'][_0x52cd('0x83')]=function(){window[_0x52cd('0x82')]['allowRecalculate']=!![];_0x3f1980[_0x52cd('0x7e')](this);};_0x48a4bb(document)[_0x52cd('0xfd')](function(){_0x3f1980[_0x52cd('0x7e')](this);});}catch(_0x2b4ef7){if(typeof console!==_0x52cd('0x3')&&typeof console['error']===_0x52cd('0xe'))console[_0x52cd('0xf')](_0x52cd('0x10'),_0x2b4ef7);}}(this));(function(){'use strict';try{var _0x10fa91=jQuery,_0x3daf4b;var _0x27c758='Quatro\x20Digital\x20-\x20Plus\x20Smart\x20Cart';var _0x2352a2=function(_0x5f51a7,_0x453c99){if(_0x52cd('0x12')===typeof console&&_0x52cd('0x3')!==typeof console[_0x52cd('0xf')]&&_0x52cd('0x3')!==typeof console['info']&&_0x52cd('0x3')!==typeof console[_0x52cd('0x14')]){var _0x15bdd0;_0x52cd('0x12')===typeof _0x5f51a7?(_0x5f51a7[_0x52cd('0x15')]('['+_0x27c758+']\x0a'),_0x15bdd0=_0x5f51a7):_0x15bdd0=['['+_0x27c758+']\x0a'+_0x5f51a7];if(_0x52cd('0x3')===typeof _0x453c99||_0x52cd('0x16')!==_0x453c99[_0x52cd('0x18')]()&&_0x52cd('0x17')!==_0x453c99[_0x52cd('0x18')]())if(_0x52cd('0x3')!==typeof _0x453c99&&_0x52cd('0x13')===_0x453c99['toLowerCase']())try{console[_0x52cd('0x13')]['apply'](console,_0x15bdd0);}catch(_0x4fe911){try{console['info'](_0x15bdd0['join']('\x0a'));}catch(_0x216b9d){}}else try{console[_0x52cd('0xf')][_0x52cd('0x19')](console,_0x15bdd0);}catch(_0x27a362){try{console[_0x52cd('0xf')](_0x15bdd0[_0x52cd('0xa')]('\x0a'));}catch(_0x53e77){}}else try{console[_0x52cd('0x14')][_0x52cd('0x19')](console,_0x15bdd0);}catch(_0x63533c){try{console[_0x52cd('0x14')](_0x15bdd0[_0x52cd('0xa')]('\x0a'));}catch(_0x2bda02){}}}};var _0x48b64e={'selector':_0x52cd('0xfe'),'dropDown':{},'buyButton':{}};_0x10fa91[_0x52cd('0xff')]=function(_0x262592){var _0x151f8a,_0x3e4d8d={};_0x3daf4b=_0x10fa91[_0x52cd('0x100')](!![],{},_0x48b64e,_0x262592);_0x151f8a=_0x10fa91(_0x3daf4b[_0x52cd('0x101')])['QD_dropDownCart'](_0x3daf4b[_0x52cd('0x102')]);if(typeof _0x3daf4b[_0x52cd('0x102')][_0x52cd('0x6f')]!==_0x52cd('0x3')&&_0x3daf4b[_0x52cd('0x102')][_0x52cd('0x6f')]===![])_0x3e4d8d[_0x52cd('0x103')]=_0x10fa91(_0x3daf4b['selector'])[_0x52cd('0x104')](_0x151f8a['fn'],_0x3daf4b[_0x52cd('0x103')]);else _0x3e4d8d[_0x52cd('0x103')]=_0x10fa91(_0x3daf4b[_0x52cd('0x101')])['QD_buyButton'](_0x3daf4b[_0x52cd('0x103')]);_0x3e4d8d['dropDown']=_0x151f8a;return _0x3e4d8d;};_0x10fa91['fn'][_0x52cd('0x105')]=function(){if(typeof console===_0x52cd('0x12')&&typeof console['info']===_0x52cd('0xe'))console['info'](_0x52cd('0x106'));};_0x10fa91[_0x52cd('0x105')]=_0x10fa91['fn'][_0x52cd('0x105')];}catch(_0x30c72f){if(typeof console!=='undefined'&&typeof console[_0x52cd('0xf')]===_0x52cd('0xe'))console[_0x52cd('0xf')](_0x52cd('0x10'),_0x30c72f);}}());

// vtex url parse
/* Quatro Digital - VTEX URL Parse // 1.4 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
var _0x8349=["\x6C\x69\x6E\x6B","\x3C\x61\x20\x68\x72\x65\x66\x3D\x22","\x22\x3E\x3C\x2F\x61\x3E","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\x66\x75\x6E\x63\x74\x69\x6F\x6E","\x65\x72\x72\x6F\x72","\x50\x72\x6F\x62\x6C\x65\x6D\x61\x73\x20\x3A\x28\x20\x2E\x20\x44\x65\x74\x61\x6C\x68\x65\x73\x3A\x20","\x2F","\x73\x70\x6C\x69\x74","","\x72\x65\x70\x6C\x61\x63\x65","\x70\x61\x74\x68\x6E\x61\x6D\x65","\x2C","\x70\x6F\x70","\x6D\x61\x74\x63\x68","\x73\x65\x61\x72\x63\x68","\x6C\x65\x6E\x67\x74\x68","\x6F\x62\x6A\x65\x63\x74","\x70\x75\x73\x68","\x63","\x6D\x61\x70","\x73\x68\x69\x66\x74","\x6F\x74\x68\x65\x72\x5F\x70\x61\x74\x68","\x6F\x74\x68\x65\x72\x5F\x73\x65\x61\x72\x63\x68","\x26","\x6F\x75\x74","\x67\x65\x74\x4D\x61\x70","\x70\x72\x6F\x74\x6F\x74\x79\x70\x65","\x6D\x65\x72\x67\x65\x55\x72\x6C","\x63\x61\x6C\x6C","\x65\x78\x74\x65\x6E\x64","\x67\x65\x74\x55\x72\x6C","\x6D\x61\x70\x3D","\x6A\x6F\x69\x6E","\x3F","\x51\x44\x5F\x56\x74\x65\x78\x55\x72\x6C\x50\x61\x72\x73\x65"];(function(){function _0x6ac7x1(_0x6ac7x2){try{this[_0x8349[0]]=$(_0x8349[1]+_0x6ac7x2+_0x8349[2])[0]}catch(c){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],c)}}function _0x6ac7x3(_0x6ac7x2){try{_0x6ac7x2=_0x6ac7x2||this[_0x8349[0]];var _0x6ac7x4=_0x6ac7x2[_0x8349[11]][_0x8349[10]](/\/\//g,_0x8349[7])[_0x8349[10]](/(^\/|\/$)/g,_0x8349[9])[_0x8349[8]](_0x8349[7]),_0x6ac7x5=((_0x6ac7x2[_0x8349[15]]||_0x8349[9])[_0x8349[14]](/map\=([^&]+)/i)||[_0x8349[9]])[_0x8349[13]]()[_0x8349[8]](_0x8349[12]);if(1==_0x6ac7x5[_0x8349[16]]&&0==_0x6ac7x5[0][_0x8349[16]]){if(_0x8349[17]== typeof defaultMap){_0x6ac7x5=defaultMap}else {for(var _0x6ac7x6=0;_0x6ac7x6<_0x6ac7x4[_0x8349[16]];_0x6ac7x6++){_0x6ac7x4[_0x6ac7x6][_0x8349[16]]&&_0x8349[7]!=_0x6ac7x4[_0x6ac7x6]&&_0x6ac7x5[_0x8349[18]](defaultMap)}}};for(var _0x6ac7x6={map:{},other_path:_0x8349[9]},_0x6ac7x7=0;_0x6ac7x7<_0x6ac7x5[_0x8349[16]];_0x6ac7x7++){_0x6ac7x5[_0x6ac7x7][_0x8349[16]]&&(_0x8349[19]==_0x6ac7x5[_0x6ac7x7]?(_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]=_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]||[],_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]][_0x8349[18]]((_0x6ac7x4||[_0x8349[9]])[_0x8349[21]]())):_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]=(_0x6ac7x4||[_0x8349[9]])[_0x8349[21]]())};_0x6ac7x6[_0x8349[22]]=_0x6ac7x4;_0x6ac7x6[_0x8349[23]]=(_0x6ac7x2[_0x8349[15]]||_0x8349[9])[_0x8349[10]](/map\=([^&]+)/ig,_0x8349[9])[_0x8349[10]](/\&\&+/ig,_0x8349[24])[_0x8349[10]](/\?/g,_0x8349[9]);return this[_0x8349[25]]=_0x6ac7x6}catch(g){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],g)}}_0x6ac7x1[_0x8349[27]][_0x8349[26]]=_0x6ac7x3;_0x6ac7x1[_0x8349[27]][_0x8349[28]]=function(_0x6ac7x2,_0x6ac7x4){try{var _0x6ac7x5=_0x6ac7x3[_0x8349[29]](this,this[_0x8349[0]]),_0x6ac7x6=_0x6ac7x3[_0x8349[29]](this,$(_0x8349[1]+_0x6ac7x2+_0x8349[2])[0]);_0x6ac7x5[_0x8349[22]][_0x8349[16]]||(_0x6ac7x5[_0x8349[22]]=void(0));_0x6ac7x5[_0x8349[23]][_0x8349[16]]||(_0x6ac7x5[_0x8349[23]]=void(0));var _0x6ac7x7=$[_0x8349[30]](!0,{},_0x6ac7x6,_0x6ac7x5);if(_0x8349[17]== typeof _0x6ac7x4){for(_0x6ac7x6=0;_0x6ac7x6<_0x6ac7x4[_0x8349[16]];_0x6ac7x6++){_0x6ac7x7[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]]&&(_0x6ac7x7[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]]=_0x6ac7x5[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]])}};return this[_0x8349[25]]=_0x6ac7x7}catch(g){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],g)}};_0x6ac7x1[_0x8349[27]][_0x8349[31]]=function(_0x6ac7x2){try{var _0x6ac7x4=[],_0x6ac7x5=[];_0x6ac7x2=_0x6ac7x2||{};for(var _0x6ac7x6 in this[_0x8349[25]][_0x8349[20]]){if(!_0x6ac7x2[_0x6ac7x6]){if(_0x8349[19]==_0x6ac7x6){for(var _0x6ac7x7=0;_0x6ac7x7<this[_0x8349[25]][_0x8349[20]][_0x6ac7x6][_0x8349[16]];_0x6ac7x7++){_0x6ac7x4[_0x8349[18]](this[_0x8349[25]][_0x8349[20]][_0x6ac7x6][_0x6ac7x7]),_0x6ac7x5[_0x8349[18]](_0x6ac7x6)}}else {_0x6ac7x4[_0x8349[18]](this[_0x8349[25]][_0x8349[20]][_0x6ac7x6]),_0x6ac7x5[_0x8349[18]](_0x6ac7x6)}}};var _0x6ac7x8=_0x6ac7x5[_0x8349[16]]?_0x8349[32]+_0x6ac7x5[_0x8349[33]](_0x8349[12])+_0x8349[24]:_0x8349[9];return _0x8349[7]+_0x6ac7x4[_0x8349[33]](_0x8349[7])+(this[_0x8349[25]][_0x8349[22]][_0x8349[16]]?_0x8349[7]+this[_0x8349[25]][_0x8349[22]][_0x8349[33]](_0x8349[7]):_0x8349[9])+_0x8349[34]+(_0x6ac7x8+this[_0x8349[25]][_0x8349[23]])[_0x8349[10]](/\&\&+/g,_0x8349[24])}catch(_0x6ac7x1){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],_0x6ac7x1)}};window[_0x8349[35]]=_0x6ac7x1})()

/* Quatro Digital - QD Select Smart Research 2 // Carlos Vinicius // Todos os direitos reservados */
var _0xda82=['ajaxError','removeClass','qd-ssr2-loading','Problemas\x20:(\x20.\x20Detalhes:\x20','optionIsChecked','option[data-qdssr-text=\x27','change','\x22\x20data-qdssr-text=\x22','</option>','getCategory','cache','script:not([src])','innerHTML','pop','match','split','extend','function','QD_SelectSmartResearch2','error','undefined','unshift','alerta','toLowerCase','aviso','info','apply','join','warn','Selecione\x20o\x20anterior','location','href','find','attr','data-qdssr-title','each','push','text','trim','h5.','Desculpe,\x20não\x20foi\x20possível\x20executar\x20sua\x20solicitação.\x20Por\x20favor\x20entre\x20em\x20contato\x20com\x20o\x20SAC.','enznzngrevnvf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','---','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','options','length','Nenhuma\x20opção\x20foi\x20enviada,\x20é\x20esperado\x20um\x20array\x20com\x20sub\x20arrays\x20contendo\x20o\x20conjunto\x20chave/valor.','QuatroDigital.ssrSelectAjaxPopulated','data-qdssr-ndx','addClass','Problemas\x20ao\x20tentar\x20verificar\x20as\x20opções\x20selecionadas.\x20Detalhes:\x20','object','optionsPlaceHolder','index','<div\x20class=\x22qd-ssr2-option-wrapper\x22>','<label\x20for=\x22qd-ssr2-select-','labelMessage','</label>','<select\x20data-qdssr-ndx=\x22','\x22\x20data-qdssr-title=\x22','disabledMessage','</select></div>','add','select2','pt-BR','select[data-qdssr-ndx=','val','trigger','body','redirect','data-qdssr-str','qd-ssr-loading','qdAjax','removeAttr','disabled','html','getAjaxOptions'];(function(_0x1e5d52,_0xb36d3d){var _0x4de44b=function(_0x19ca97){while(--_0x19ca97){_0x1e5d52['push'](_0x1e5d52['shift']());}};_0x4de44b(++_0xb36d3d);}(_0xda82,0xb7));var _0x2da8=function(_0x1efb0b,_0x1317e6){_0x1efb0b=_0x1efb0b-0x0;var _0x293d80=_0xda82[_0x1efb0b];return _0x293d80;};(function(_0x210019){var _0x2c13dd=jQuery;if(_0x2da8('0x0')!==typeof _0x2c13dd['fn'][_0x2da8('0x1')]){_0x2c13dd['fn'][_0x2da8('0x1')]=function(){};var _0x36eedd=function(_0x43650d,_0x32db3a){if('object'===typeof console&&'undefined'!==typeof console[_0x2da8('0x2')]&&'undefined'!==typeof console['info']&&_0x2da8('0x3')!==typeof console['warn']){var _0x191de8;'object'===typeof _0x43650d?(_0x43650d[_0x2da8('0x4')]('[Quatro\x20Digital\x20-\x20QD\x20Select\x20Smart\x20Research\x202]\x0a'),_0x191de8=_0x43650d):_0x191de8=['[Quatro\x20Digital\x20-\x20QD\x20Select\x20Smart\x20Research\x202]\x0a'+_0x43650d];if(_0x2da8('0x3')===typeof _0x32db3a||_0x2da8('0x5')!==_0x32db3a[_0x2da8('0x6')]()&&_0x2da8('0x7')!==_0x32db3a['toLowerCase']())if(_0x2da8('0x3')!==typeof _0x32db3a&&_0x2da8('0x8')===_0x32db3a['toLowerCase']())try{console['info'][_0x2da8('0x9')](console,_0x191de8);}catch(_0x43b304){try{console[_0x2da8('0x8')](_0x191de8[_0x2da8('0xa')]('\x0a'));}catch(_0x261017){}}else try{console['error'][_0x2da8('0x9')](console,_0x191de8);}catch(_0x3e8910){try{console[_0x2da8('0x2')](_0x191de8['join']('\x0a'));}catch(_0x21bf43){}}else try{console[_0x2da8('0xb')][_0x2da8('0x9')](console,_0x191de8);}catch(_0x5255ed){try{console[_0x2da8('0xb')](_0x191de8[_0x2da8('0xa')]('\x0a'));}catch(_0xba4e5b){}}}},_0x3ef204={'options':[],'optionsPlaceHolder':[],'disabledMessage':function(_0x2febee,_0x2c3f45,_0x124185){return _0x2da8('0xc');},'labelMessage':function(_0x5043c8,_0x483d20,_0x40537c){return'Selecione\x20o(a)\x20'+_0x40537c[_0x5043c8];},'redirect':function(_0xe5f9c5){window[_0x2da8('0xd')][_0x2da8('0xe')]=_0xe5f9c5;},'getAjaxOptions':function(_0xaa78fd,_0xd70535){var _0x568add=[];_0x2c13dd(_0xaa78fd)[_0x2da8('0xf')]('.search-single-navigator\x20ul.'+_0xd70535[_0x2da8('0x10')](_0x2da8('0x11')))['find']('a')[_0x2da8('0x12')](function(){var _0xd70535=_0x2c13dd(this);_0x568add[_0x2da8('0x13')]([_0xd70535[_0x2da8('0x14')]()[_0x2da8('0x15')](),_0xd70535[_0x2da8('0x10')](_0x2da8('0xe'))||'']);});return _0x568add;},'optionIsChecked':function(_0x5573d6){_0x5573d6=_0x2c13dd(_0x2da8('0x16')+_0x5573d6+'\x20+ul\x20.filtro-ativo:first')['text']()[_0x2da8('0x15')]();return _0x5573d6['length']?_0x5573d6:null;},'ajaxError':function(){_0x36eedd(_0x2da8('0x17'));}};_0x210019=function(_0x22e84c){var _0x1b4178={'o':_0x2da8('0x18')};return function(_0xe01d13){var _0x1cd1ad=function(_0x49308e){return _0x49308e;};var _0x5df4da=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0xe01d13=_0xe01d13['d'+_0x5df4da[0x10]+'c'+_0x5df4da[0x11]+'m'+_0x1cd1ad(_0x5df4da[0x1])+'n'+_0x5df4da[0xd]]['l'+_0x5df4da[0x12]+'c'+_0x5df4da[0x0]+'ti'+_0x1cd1ad('o')+'n'];var _0x85744d=function(_0x36b7c5){return escape(encodeURIComponent(_0x36b7c5[_0x2da8('0x19')](/\./g,'¨')[_0x2da8('0x19')](/[a-zA-Z]/g,function(_0x40aa75){return String[_0x2da8('0x1a')](('Z'>=_0x40aa75?0x5a:0x7a)>=(_0x40aa75=_0x40aa75[_0x2da8('0x1b')](0x0)+0xd)?_0x40aa75:_0x40aa75-0x1a);})));};var _0x256c70=_0x85744d(_0xe01d13[[_0x5df4da[0x9],_0x1cd1ad('o'),_0x5df4da[0xc],_0x5df4da[_0x1cd1ad(0xd)]][_0x2da8('0xa')]('')]);_0x85744d=_0x85744d((window[['js',_0x1cd1ad('no'),'m',_0x5df4da[0x1],_0x5df4da[0x4][_0x2da8('0x1c')](),'ite']['join']('')]||_0x2da8('0x1d'))+['.v',_0x5df4da[0xd],'e',_0x1cd1ad('x'),'co',_0x1cd1ad('mm'),'erc',_0x5df4da[0x1],'.c',_0x1cd1ad('o'),'m.',_0x5df4da[0x13],'r'][_0x2da8('0xa')](''));for(var _0xde2ea2 in _0x1b4178){if(_0x85744d===_0xde2ea2+_0x1b4178[_0xde2ea2]||_0x256c70===_0xde2ea2+_0x1b4178[_0xde2ea2]){var _0x26ece4='tr'+_0x5df4da[0x11]+'e';break;}_0x26ece4='f'+_0x5df4da[0x0]+'ls'+_0x1cd1ad(_0x5df4da[0x1])+'';}_0x1cd1ad=!0x1;-0x1<_0xe01d13[[_0x5df4da[0xc],'e',_0x5df4da[0x0],'rc',_0x5df4da[0x9]][_0x2da8('0xa')]('')][_0x2da8('0x1e')](_0x2da8('0x1f'))&&(_0x1cd1ad=!0x0);return[_0x26ece4,_0x1cd1ad];}(_0x22e84c);}(window);if(!eval(_0x210019[0x0]))return _0x210019[0x1]?_0x36eedd(_0x2da8('0x20')):!0x1;_0x2c13dd['QD_SelectSmartResearch2']=function(_0x4fda5d,_0x4c5874){if(!_0x4c5874[_0x2da8('0x21')][_0x2da8('0x22')])return _0x36eedd(_0x2da8('0x23'));_0x4fda5d['each'](function(){try{var _0x10c94c=_0x2c13dd(this),_0x1cd810=_0x1ff56(_0x10c94c,_0x4c5874,_0x4fda5d);_0x2372b4(_0x10c94c,_0x4c5874,0x0);_0x1cd810['on'](_0x2da8('0x24'),function(_0x3be5ae,_0x4beff7){try{_0x2372b4(_0x10c94c,_0x4c5874,_0x4beff7['attr'](_0x2da8('0x25')));}catch(_0x89d3e4){_0x36eedd('Problemas\x20ao\x20definir\x20a\x20opção\x20selecionada.\x20Detalhes:\x20'+_0x89d3e4['message']);}});_0x10c94c[_0x2da8('0x26')]('qd-ssr2-loaded');}catch(_0x27921d){_0x36eedd(_0x2da8('0x27')+_0x27921d['message']);}});};var _0x1ff56=function(_0x2e0871,_0x120214,_0x21834a){try{for(var _0x2e311a='',_0xfb048a,_0x210019=!0x0,_0x2763ab=new _0x2c13dd(),_0x24bf94=!0x1,_0x36ac8c=0x0,_0x746f29=0x0;_0x746f29<_0x120214[_0x2da8('0x21')][_0x2da8('0x22')];_0x746f29++){_0x2da8('0x28')!==typeof _0x120214['options'][_0x746f29]&&(_0x210019=!0x1);var _0x180b0f=_0x120214[_0x2da8('0x29')][_0x746f29]||'',_0x45f589=_0x21834a[_0x2da8('0x2a')](_0x2e0871);_0x2e311a=_0x2da8('0x2b');_0x2e311a+=_0x2da8('0x2c')+_0x746f29+_0x45f589+'\x22>'+_0x120214[_0x2da8('0x2d')](_0x746f29,_0x120214[_0x2da8('0x21')],_0x120214[_0x2da8('0x29')])+_0x2da8('0x2e');_0x2e311a+=_0x2da8('0x2f')+_0x746f29+'\x22\x20id=\x22qd-ssr2-select-'+_0x746f29+_0x45f589+_0x2da8('0x30')+_0x180b0f+'\x22>';_0x2e311a+='<option\x20value=\x22\x22></option>';_0x210019?_0x2e311a+=_0x4a5948(_0x120214[_0x2da8('0x21')][_0x746f29]):_0x180b0f=_0x120214[_0x2da8('0x31')](_0x746f29,_0x120214[_0x2da8('0x21')],_0x120214['optionsPlaceHolder']);_0x2e311a+=_0x2da8('0x32');_0xfb048a=_0x2c13dd(_0x2e311a);_0xfb048a['appendTo'](_0x2e0871);var _0x102c81=_0xfb048a['find']('select');_0x2763ab=_0x2763ab[_0x2da8('0x33')](_0x102c81);_0x210019||_0x102c81[_0x2da8('0x10')]({'disabled':!0x0,'data-qdssr-str':_0x120214[_0x2da8('0x21')][_0x746f29]});_0x102c81[_0x2da8('0x34')]({'placeholder':_0x180b0f,'language':_0x2da8('0x35')});_0x102c81['bind']('change',function(_0x11d397,_0x5b98af){var _0x1cb4ca=_0x2c13dd(this),_0x36273a=_0x2e0871[_0x2da8('0xf')](_0x2da8('0x36')+(parseInt(_0x1cb4ca[_0x2da8('0x10')](_0x2da8('0x25'))||0x0,0xa)+0x1)+']'),_0x210019=(_0x1cb4ca[_0x2da8('0x37')]()||'')[_0x2da8('0x15')]();_0x5b98af||(_0x24bf94=!0x0);_0x2c13dd(window)[_0x2da8('0x38')]('QuatroDigital.ssrChange',[_0x36273a,_0x24bf94]);!_0x36273a['length']&&(!_0x5b98af||_0x24bf94&&_0x210019[_0x2da8('0x22')])&&(_0x2c13dd(document[_0x2da8('0x39')])[_0x2da8('0x26')]('qd-ssr-reloading'),_0x120214[_0x2da8('0x3a')](_0x210019));_0x210019=_0x210019['split']('#')['shift']()['split']('?');_0x210019[0x1]=(_0x36273a[_0x2da8('0x10')](_0x2da8('0x3b'))||'')+'&'+(_0x210019[0x1]||'');_0x2c13dd(document['body'])[_0x2da8('0x26')](_0x2da8('0x3c'));_0xfb048a[_0x2da8('0x26')]('qd-ssr2-loading');_0x36ac8c+=0x1;_0x2c13dd[_0x2da8('0x3d')]({'url':_0x210019[_0x2da8('0xa')]('?'),'dataType':'html','success':function(_0x487058){_0x36273a[_0x2da8('0x3e')](_0x2da8('0x3f'));_0x36273a[_0x2da8('0x40')]('<option\x20value=\x22\x22></option>'+_0x4a5948(_0x120214[_0x2da8('0x41')](_0x487058,_0x36273a)));_0x36273a[_0x2da8('0x34')]({'placeholder':_0x36273a[_0x2da8('0x10')](_0x2da8('0x11'))});_0x1cb4ca[_0x2da8('0x38')](_0x2da8('0x24'),[_0x36273a]);},'error':function(){_0x120214[_0x2da8('0x42')][_0x2da8('0x9')](this,arguments);},'complete':function(){_0xfb048a[_0x2da8('0x43')](_0x2da8('0x44'));--_0x36ac8c;0x0==_0x36ac8c&&_0x2c13dd(document[_0x2da8('0x39')])['removeClass']('qd-ssr-loading');},'clearQueueDelay':null});});}return _0x2763ab;}catch(_0x2640be){_0x36eedd(_0x2da8('0x45')+_0x2640be['message']);}},_0x2372b4=function(_0x23f471,_0x29e465,_0x4fa188,_0x4fa988){_0x29e465=_0x29e465[_0x2da8('0x46')](_0x29e465[_0x2da8('0x29')][_0x4fa188]);null!==_0x29e465&&(_0x4fa988=_0x4fa988||_0x23f471[_0x2da8('0xf')](_0x2da8('0x36')+_0x4fa188+']'),_0x4fa988['val'](_0x4fa988[_0x2da8('0xf')](_0x2da8('0x47')+_0x29e465+'\x27]')[_0x2da8('0x37')]())['trigger'](_0x2da8('0x48'),!0x0));},_0x4a5948=function(_0x38a9d7){for(var _0x2a9ed5='',_0x4482b6=0x0;_0x4482b6<_0x38a9d7[_0x2da8('0x22')];_0x4482b6++)_0x2a9ed5+='<option\x20value=\x22'+(_0x38a9d7[_0x4482b6][0x1]||'')+_0x2da8('0x49')+(_0x38a9d7[_0x4482b6][0x0]||'')[_0x2da8('0x19')](/\s\([0-9]+\)/,'')+'\x22>'+(_0x38a9d7[_0x4482b6][0x0]||'')+_0x2da8('0x4a');return _0x2a9ed5;};_0x2c13dd[_0x2da8('0x1')][_0x2da8('0x4b')]=function(){if(_0x2c13dd['QD_SelectSmartResearch2']['getCategory'][_0x2da8('0x4c')])return _0x2c13dd[_0x2da8('0x1')][_0x2da8('0x4b')][_0x2da8('0x4c')];var _0x22b4c5=[],_0x2a1330=[];_0x2c13dd(_0x2da8('0x4d'))[_0x2da8('0x12')](function(){var _0x3b7781=_0x2c13dd(this)[0x0][_0x2da8('0x4e')];if(-0x1<_0x3b7781[_0x2da8('0x1e')]('buscapagina'))return _0x22b4c5=(decodeURIComponent((_0x3b7781['match'](/\/buscapagina([^\'\"]+)/i)||[''])[_0x2da8('0x4f')]())[_0x2da8('0x50')](/fq=c:[^\&]+/i)||[''])[_0x2da8('0x4f')]()[_0x2da8('0x51')](':')[_0x2da8('0x4f')]()[_0x2da8('0x19')](/(^\/|\/$)/g,'')[_0x2da8('0x51')]('/'),!0x1;});for(var _0x1f24d0=0x0;_0x1f24d0<_0x22b4c5[_0x2da8('0x22')];_0x1f24d0++)_0x22b4c5[_0x1f24d0]['length']&&_0x2a1330[_0x2da8('0x13')](_0x22b4c5[_0x1f24d0]);return _0x2c13dd[_0x2da8('0x1')][_0x2da8('0x4b')]['cache']=_0x2a1330;};_0x2c13dd[_0x2da8('0x1')]['getCategory'][_0x2da8('0x4c')]=null;_0x2c13dd['fn']['QD_SelectSmartResearch2']=function(_0x2b4351){var _0x4acad9=_0x2c13dd(this);if(!_0x4acad9[_0x2da8('0x22')])return _0x4acad9;_0x2b4351=_0x2c13dd[_0x2da8('0x52')]({},_0x3ef204,_0x2b4351);_0x4acad9['qdPlugin']=new _0x2c13dd[(_0x2da8('0x1'))](_0x4acad9,_0x2b4351);return _0x4acad9;};_0x2c13dd(function(){_0x2c13dd('.qd_auto_select_smart_research_2')[_0x2da8('0x1')]();});}}(this));
