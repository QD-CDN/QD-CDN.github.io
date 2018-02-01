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
			Common.applyCarouselShelf();
			Common.applySmartCart();
			Common.openModalVideoInstitutional();
			Common.smartQuantityShelf();
		},
		ajaxStop: function() {
		},
		windowOnload: function() {
			Common.facebookLikebox();
		},
		buyInShelf: function () {
			var fn = function () {
				$(".shelf-qd-v1-buy-button .btn-add-buy-button-asynchronous:not('.remove-href')").not('.qd-on-bb').addClass("show qd-on-bb").click(function (e) {
					e.preventDefault();
					var $t = $(this);

					Common.buyInShelfOpenModal($t.getParent(".wrapper-buy-button-asynchronous").find("input[class*='buy-button-asynchronous-product-url']" || "").attr("class").replace(/[^0-9]+/gi, ""), $t.getParent(".shelf-qd-v1-buy-button").find(".qd-sq-quantity").val() || 1);
				});
			};
			fn();

			// Ações
			$(".qd-v1-modal").on("hidden.bs.modal", function () {
				$(this).removeClass("shelf-qd-v1-buy-button-modal");
			});

			// No callback do infinity scroll
			$(window).on("QuatroDigital.is_Callback", function () {
				fn();
			});
		},
		floatBarMiniCart: function() {
			var miniCart = $(".show-minicart-on-hover");
			$(".floating-qd-v1-content .header-qd-v1-cart-link").mouseenter(function() {
				miniCart.not(this).mouseover();
			});
		},
		applyCarouselShelf: function () {
			var wrapper = $('.carousel-qd-v1-shelf .prateleira');

			if (!wrapper.length)
				return false;

			wrapper.each(function () {
				var $t = $(this);

				$t.find('h2').prependTo($t.parent());
			});

			var slides = 4;
			if (wrapper.parent().hasClass('side-carousel-qd-v1-shelf'))
				slides = 3

			wrapper.slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: slides,
				slidesToScroll: slides,
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
						breakpoint: 600,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
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

			wrapperMobile.find('> ul > li >a').click(function (evt) {
				evt.preventDefault();
				$(this).parent().toggleClass('qd-am-dropdown-active');
			});

			wrapperMobile.after('<span class="btn-close-mobile"><i class="fa fa-times-circle"></i></span>');

			$(".btn-close-mobile").click(function () {
				$("body").removeClass('qd-am-on');
			});
		},
		bannerResponsive: function () {
			$(".banner-qd-v1-responsive .box-banner a, .qd-placeholder .box-banner a").each(function () {
				var $t = $(this);
				var cols = [];

				var href = $t.attr("href") || "";
				if (!href.length)
					return;

				$t.attr("href", href.replace(/(col-)?(xs|sm|md|lg|hidden-xs|hidden-sm|hidden-md|hidden-lg)(-([0-9]{1,2}))?,?/ig, function (match) {
					var str = match.replace(",", "").toLowerCase();
					cols.push(str.substr(0, 4) === "col-" ? str : str);
					return "";
				}));

				$t.parent().addClass(cols.length ? cols.join(" ") : "col-xs-12 col-sm-12");
			});
		},
		facebookLikebox: function() {
			$(".footer-qd-v1-facebook-likebox").html('<div class="fb-page" data-href="https://www.facebook.com/carlabergamask" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/">Carla Bergamask</a></blockquote></div></div>');
		},
		callCartLinkShow: function () {
			if ($(window).width() < 750) {
				$(".header-qd-v1-cart-link").click(function (evt) {
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
		bannersCount: function() {
			$(".box-banner").parent().each(function() {
				var $t = $(this);
				$t.addClass("qdBannerCount-" + $t.find(".box-banner").length);
			});
		},
		smartQuantityShelf: function () {
			$(".shelf-qd-v1-buy-button:not(.qd-on)").addClass('qd-on').QD_smartQuantity({
				buyButton: ".btn-add-buy-button-asynchronous",
				setQuantityByUrl: false
			});
		},
		applySmartCart: function() {
			$('.header-qd-v1-cart-link').append('<div class="smart-cart-qd-v1-wrapper"><div class="qd-sc-wrapper"></div></div>');

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
					},
					buyButton: {
						buyButton: "body .prateleira .buy-button"
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
				evt.preventDefault();
				$(document.body).toggleClass('qd-cart-show');

				wrapper.height($(window).height());
				wrapper.find(".qd-ddc-prodWrapper").css('max-height', $(window).height() - 193);
			});

			$(".components-qd-v1-overlay, .qd_ddc_lightBoxClose").click(function(evt){
				$(document.body).removeClass('qd-cart-show');
			});
		},
		openModalVideoInstitutional: function () {
			var videoRegex = /(youtu\.be\/|\?v=)([^&]+)/i;

			$('.box-banner a').filter('[href*="youtube.com/"], [href*="youtu.be/"]').click(function (e) {
				e.preventDefault();
				var modal = $('.qd-v1-modal').clone().appendTo(document.body).addClass('hotsite-information-qd-v1-modal');
				var $t = $(this);
				var videoId = ($t.attr('href').match(videoRegex) || ['']).pop();

				modal.find('.modal-header').append('<h2 class="modal-title">' + $t.find('img').attr('alt') + '</h2>');
				$('<iframe src="' + 'https://www.youtube.com/embed/' + videoId + '?wmode=transparent&rel=0" frameborder="0"></iframe>').appendTo(modal.find('.modal-body'));
				modal.modal();

				modal.on('hidden.bs.modal', function () {
					modal.remove();
				});
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
			// Home.selectSmartResearch2();			
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		bannerSliderDesktop: function() {
			$('.slider-qd-v1-full, .hotsite-qd-v1-banner-slider').slick({
				prevArrow: '<button type="button" class="slick-prev" title="Anterior"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next" title="Próximo"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>',
				dots: true,
				adaptiveHeight: true,
				fade: true,
				speed: 400,
				cssEase: 'linear'
			});
		},		
		bannerSliderMobile: function () {
			$('.mobile-slider-qd-v1-wrapper').slick({
				prevArrow: '<button type="button" class="slick-prev" title="Anterior"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next" title="Próximo"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>',
				adaptiveHeight: true,
				fade: true,
				speed: 400,
				dots: true,
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
				options: [values, "lid=5636e1ca-fccb-4cd7-bc5c-4358bc3ae4bc", "lid=5636e1ca-fccb-4cd7-bc5c-4358bc3ae4bc"],
				optionsPlaceHolder: ["Departamento", "Linha", "Material"],
				getAjaxOptions: function (requestData, $select) {
					var values = [];
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
			Product.qdClickTableMeasures();
			Product.seeDescription();
			Product.skuListSelection();
			Product.accessoriesFix();
			Product.accessoriesApplyCarousel();
			Product.qdNotifymeShow();
			Product.doublePrice();
			Product.setAvailableBodyClass();
			// Common.smartQuantityShelf();
			
			// Product.skuGridChangeImage();
			Product.applySmartSkuGrid();
		},
		ajaxStop: function () {
			Product.addCloseBtnFreightTable();
		},
		windowOnload: function () {},

		skuGridChangeImage: function(){
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
		},

		applySmartSkuGrid:function(){
			$(".qd-smart-sku-grid").QD_smartSkuGrid();

			var wrapper = $(".qd_cart_auto");

			if (!wrapper.length)
				wrapper = $(document.body);

			wrapper.QD_buyButton({
				buyButton: '.buy-button'
			});
		},
		qdNotifymeShow: function() {
			var notifyWrapper = $(".portal-notify-me-ref");

			var checkVisibleNotify = function(data) {
				if (data.availability || data.available){
					notifyWrapper.parent().parent().removeClass('col-xs-12').attr('class', "col-xs-8 col-md-9");
					$(document.body).removeClass('notify-active');
				}
				else {
					notifyWrapper.parent().parent().removeClass('col-xs-12').attr('class', "col-xs-8 col-md-9");
					$(document.body).addClass('notify-active');
				}
			}

			$(document).on("skuSelected.vtex", function(e, sku) {
				checkVisibleNotify(sku);
			});

			checkVisibleNotify(skuJson);
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

				$this.find("h2").addClass('heading-3').insertBefore($this);

				$this.owlCarousel({
					items: 2,
					navigation: true,
					pagination: false
				});
			});
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
				for (var i in skuJson.skus) {
					if (typeof skuJson.skus[i] != "function" && skuJson.skus[i].sku == skuId) {
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
		setAvailableBodyClass: function () {
			function checkVisibleNotify(available) {
				if (available)
					$(document.body).addClass('qd-product-available').removeClass('qd-product-unavailable');
				else
					$(document.body).addClass('qd-product-unavailable').removeClass('qd-product-available');
			}

			$(document).on("skuSelected.vtex", function (e, id, sku) {
				checkVisibleNotify(sku.available);
			});

			checkVisibleNotify(skuJson.available);
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
		qdClickTableMeasures: function () {
			var wrapper = $(".product-qd-v1-sku-selection .specification");
			var imgTable = $('.measure-table-qd-v1').clone();
			var modal = $(".qd-v1-modal").clone().appendTo(document.body).addClass('qd-v1-modal-table-measures');

			if (imgTable.find('.box-banner').length < 1)
				return;

			wrapper.append('<span class="product-qd-v1-table-measures">Tabela de Medidas</span>');

			$(".product-qd-v1-table-measures").click(function () {
				modal.find('.modal-body').append(imgTable);
				modal.find(imgTable).removeClass('hide');
				modal.modal();

				modal.on('hidden.bs.modal', function () {
					modal.remove();
				});
			});
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
			Institutional.sendAccessForm();
			Institutional.sidemenuToggle();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		formCadastreMask: function () {
			var form = $(".form-qd-v1");

			if (!form.length || typeof $.fn.mask !== "function")
				return;

			form.find('[name=qd_form_cpnj]').mask('00.000.000/0000-00');
			form.find('[name=qd_form_cpf]').mask('000.000.000-00');
			form.find('[name=qd_form_phone]').mask('(00) 0000-00009');
			form.find('[name=qd_form_celphone]').mask('(00) 0000-00009');
			form.find('[name=qd_form_zipcode]').mask('00000-000');
			form.find('[name=qd_form_ie]').mask('###.###.###.###.###');
			form.find('[name=qd_form_birthdate]').mask('00/00/0000');
		},
		checkEmailExist: function (email) {
			window.QD_checkEmailExist_request = window.QD_checkEmailExist_request || $.ajax({
				url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/CL/search",
				data: { "_fields": "id", "email": email },
				type: "GET",
				dataType: "json",
				headers: { Accept: "application/vnd.vtex.ds.v10+json" },
				success: function (data) {
					if (data.length)
						alert("Este e-mail já existe em nosso cadastro. Para maiores informações por favor entre em contato com o Atendimento ao Cliente.");
				},
				complete: function () {
					window.QD_checkEmailExist_request = undefined;
				}
			});

			return window.QD_checkEmailExist_request;
		},
		checkCnpjExist: function (cnpj) {
			window.QD_checkCnpjExist_request = window.QD_checkCnpjExist_request || $.ajax({
				url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/CL/search",
				data: { "_fields": "id", "corporateDocument": cnpj.replace(/[^0-9]/ig, "") },
				type: "GET",
				dataType: "json",
				headers: { Accept: "application/vnd.vtex.ds.v10+json" },
				success: function (data) {
					if (data.length)
						alert("Este CNPJ já existe em nosso cadastro. Para maiores informações por favor entre em contato com o Atendimento ao Cliente.");
				},
				complete: function () {
					window.QD_checkCnpjExist_request = undefined;
				}
			});

			return window.QD_checkCnpjExist_request;
		},
		sendAccessForm: function () {
			Institutional.formCadastreMask();

			var $form = $(".form-qd-v1");
			var loading = $('form-qd-v1-loading').hide();
			// $form.find(".form-qd-v1-submit").after(loading);

			var cnpj = $form.find("[name='qd_form_cpnj']");
			cnpj.keyup(function (e) {
				if ((cnpj.val() || "").length > 17)
					Institutional.checkCnpjExist(cnpj.val() || "");
			});

			var email = $form.find("[name='qd_form_email']");
			email.focusout(function (e) {
				if ((email.val() || "").length > 0)
					Institutional.checkEmailExist(email.val() || "");
			});

			// Preenchendo o endereço a partir do CEP
			var cepInputs = $form.find("input[name=qd_form_street], input[name=qd_form_complement], input[name=qd_form_neighboor], input[name=qd_form_city], input[name=qd_form_state]").attr("disabled", "disabled");
			var cep = $form.find("input[name=qd_form_zipcode]");
			cep.keyup(function (e) {
				if ((cep.val() || "").length < 9)
					return;

				// $form.find(".btn-continue").slideUp();
				loading.slideDown();

				$.ajax({
					url: "/api/checkout/pub/postal-code/BRA/" + cep.val(),
					dataType: "json",
					success: function (data) {
						// $form.find(".btn-continue").slideUp();
						loading.slideDown();
						$form.find("input[name=qd_form_street]").val(data.street || "");
						$form.find("input[name=qd_form_neighboor]").val(data.neighborhood || "");
						$form.find("input[name=qd_form_city]").val(data.city || "");
						$form.find("input[name=qd_form_state]").val(data.state || "");
					},
					complete: function () {
						cepInputs.removeAttr('disabled');
						loading.slideUp();
						// $form.find(".form-qd-v1-submit").slideDown();
					}
				});
			});

			if (typeof $.fn.validate !== "function")
				return;

			$form.validate({
				rules: {
					email: {
						email: true
					}
				},
				submitHandler: function (form) {
					var $form = $(form);
					var idRegister = '';

					if (!$form.valid())
						return;

					loading.slideDown();
					var inputs = $form.find("input, textarea");

					Institutional.checkEmailExist(inputs.filter("[name='qd_form_email']").val() || "").always(function () {
						loading.slideUp();
					}).done(function (data) {
						if (data.length)
							return;

						loading.slideDown();
						Institutional.checkCnpjExist(inputs.filter("[name='qd_form_cpnj']").val() || "").always(function () {
							loading.slideUp();
						}).done(function (data) {
							if (data.length)
								return;

							loading.slideDown();

							var stateRegistration = (inputs.filter("[name='qd_form_ie']").val() || "Isento").trim();
							stateRegistration = stateRegistration.length ? stateRegistration : "Isento";
							stateRegistration = stateRegistration.replace(/i.+ento/g, "Isento");

							$.ajax({
								url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/CL/documents",
								type: "PATCH",
								dataType: "json",
								headers: { "Accept": "application/vnd.vtex.ds.v10+json", "Content-Type": "application/json; charset=utf-8" },
								data: JSON.stringify({
									firstName: inputs.filter("[name='qd_form_name']").val() || "",
									lastName: inputs.filter("[name='qd_form_lastname']").val() || "",
									email: inputs.filter("[name='qd_form_email']").val() || "",
									birthDate: (inputs.filter("[name='qd_form_birthdate']").val() || '').split('/').reverse().join('-'),
									gender: inputs.filter("[name='qd_form_sex']:checked").val() || "",
									documentType: "cpf",
									"document": (inputs.filter("[name='qd_form_cpf']").val() || "").replace(/[^0-9]/ig, ""),
									homePhone: "+55" + (inputs.filter("[name='qd_form_phone']").val() || "").replace(/[^0-9]/ig, ""),
									cellPhone: "+55" + (inputs.filter("[name='qd_form_celphone']").val() || "").replace(/[^0-9]/ig, ""),
									isSMSNewsletterOptIn: false,
									tradeName: inputs.filter("[name='qd_form_trading_name']").val() || "",
									corporateName: inputs.filter("[name='qd_form_company_name']").val() || "",
									corporateDocument: (inputs.filter("[name='qd_form_cpnj']").val() || "").replace(/[^0-9]/ig, ""),
									stateRegistration: stateRegistration,
									site: inputs.filter("[name='qd_form_site']").val() || "",
									facebook: inputs.filter("[name='qd_form_facebook']").val() || "",
									instagram: inputs.filter("[name='qd_form_instagram']").val() || "",
									workingBrands: inputs.filter("[name='qd_form_working_brands']").val() || "",
									interestingBrands: inputs.filter("[name='qd_form_interesting_brands']").val() || "",
									isCorporate: true,
									localeDefault: "pt-BR"
								}),
								success: function (data) {
									$.ajax({
										url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/AD/documents",
										type: "PATCH",
										dataType: "json",
										headers: { "Accept": "application/vnd.vtex.ds.v10+json", "Content-Type": "application/json; charset=utf-8" },
										data: JSON.stringify({
											addressName: "Principal",
											userId: (data.Id || "").replace(/^[a-z]{2}\-/i, ""),
											street: inputs.filter("[name='qd_form_street']").val() || "",
											number: inputs.filter("[name='qd_form_number']").val() || "",
											complement: inputs.filter("[name='qd_form_complement']").val() || "",
											neighborhood: inputs.filter("[name='qd_form_neighboor']").val() || "",
											city: inputs.filter("[name='qd_form_city']").val() || "",
											state: inputs.filter("[name='qd_form_state']").val() || "",
											postalCode: inputs.filter("[name='qd_form_zipcode']").val() || "",
											addressType: "residential",
											receiverName: inputs.filter("[name='qd_form_name']").val() || "",
											geoCoordinate: []
										}),
										success: function () {
											$('.form-qd-v1-sucess').removeClass('hide');
											$('.register-content-qd-v1').addClass('hide');
											$(document).scrollTop(0);
										},
										error: function (data) {
											alert("Não foi possível enviar seu formulário, por favor tente novamente ou entre em contato por telefone.");
										},
										complete: function () {
											loading.slideUp(function () { $(this).remove(); });
										}
									});
								},
								error: function () {
									alert("Não foi possível enviar seu formulário, por favor tente novamente ou entre em contato por telefone.");
									loading.slideUp(function () { $(this).remove(); });
								}
							});
						});
					});
				},
				errorPlacement: function (error, element) { }
			});
		},
		sidemenuToggle:function(){
			// Amazing Menu Responsivo
			$(".institucional-qd-v1-menu-toggle").click(function(){
				$("body").toggleClass('qd-sn-on');
			});

			$(".qd-am-overlay").click(function(){
				$("body").removeClass('qd-sn-on');
			});
		}
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
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-12 col-sm-4"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);
// Owl Carousel
"function"!==typeof Object.create&&(Object.create=function(f){function g(){}g.prototype=f;return new g}); (function(f,g,k){var l={init:function(a,b){this.$elem=f(b);this.options=f.extend({},f.fn.owlCarousel.options,this.$elem.data(),a);this.userOptions=a;this.loadContent()},loadContent:function(){function a(a){var d,e="";if("function"===typeof b.options.jsonSuccess)b.options.jsonSuccess.apply(this,[a]);else{for(d in a.owl)a.owl.hasOwnProperty(d)&&(e+=a.owl[d].item);b.$elem.html(e)}b.logIn()}var b=this,e;"function"===typeof b.options.beforeInit&&b.options.beforeInit.apply(this,[b.$elem]);"string"===typeof b.options.jsonPath? (e=b.options.jsonPath,f.getJSON(e,a)):b.logIn()},logIn:function(){this.$elem.data("owl-originalStyles",this.$elem.attr("style"));this.$elem.data("owl-originalClasses",this.$elem.attr("class"));this.$elem.css({opacity:0});this.orignalItems=this.options.items;this.checkBrowser();this.wrapperWidth=0;this.checkVisible=null;this.setVars()},setVars:function(){if(0===this.$elem.children().length)return!1;this.baseClass();this.eventTypes();this.$userItems=this.$elem.children();this.itemsAmount=this.$userItems.length; this.wrapItems();this.$owlItems=this.$elem.find(".owl-item");this.$owlWrapper=this.$elem.find(".owl-wrapper");this.playDirection="next";this.prevItem=0;this.prevArr=[0];this.currentItem=0;this.customEvents();this.onStartup()},onStartup:function(){this.updateItems();this.calculateAll();this.buildControls();this.updateControls();this.response();this.moveEvents();this.stopOnHover();this.owlStatus();!1!==this.options.transitionStyle&&this.transitionTypes(this.options.transitionStyle);!0===this.options.autoPlay&& (this.options.autoPlay=5E3);this.play();this.$elem.find(".owl-wrapper").css("display","block");this.$elem.is(":visible")?this.$elem.css("opacity",1):this.watchVisibility();this.onstartup=!1;this.eachMoveUpdate();"function"===typeof this.options.afterInit&&this.options.afterInit.apply(this,[this.$elem])},eachMoveUpdate:function(){!0===this.options.lazyLoad&&this.lazyLoad();!0===this.options.autoHeight&&this.autoHeight();this.onVisibleItems();"function"===typeof this.options.afterAction&&this.options.afterAction.apply(this, [this.$elem])},updateVars:function(){"function"===typeof this.options.beforeUpdate&&this.options.beforeUpdate.apply(this,[this.$elem]);this.watchVisibility();this.updateItems();this.calculateAll();this.updatePosition();this.updateControls();this.eachMoveUpdate();"function"===typeof this.options.afterUpdate&&this.options.afterUpdate.apply(this,[this.$elem])},reload:function(){var a=this;g.setTimeout(function(){a.updateVars()},0)},watchVisibility:function(){var a=this;if(!1===a.$elem.is(":visible"))a.$elem.css({opacity:0}), g.clearInterval(a.autoPlayInterval),g.clearInterval(a.checkVisible);else return!1;a.checkVisible=g.setInterval(function(){a.$elem.is(":visible")&&(a.reload(),a.$elem.animate({opacity:1},200),g.clearInterval(a.checkVisible))},500)},wrapItems:function(){this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>');this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">');this.wrapperOuter=this.$elem.find(".owl-wrapper-outer");this.$elem.css("display","block")}, baseClass:function(){var a=this.$elem.hasClass(this.options.baseClass),b=this.$elem.hasClass(this.options.theme);a||this.$elem.addClass(this.options.baseClass);b||this.$elem.addClass(this.options.theme)},updateItems:function(){var a,b;if(!1===this.options.responsive)return!1;if(!0===this.options.singleItem)return this.options.items=this.orignalItems=1,this.options.itemsCustom=!1,this.options.itemsDesktop=!1,this.options.itemsDesktopSmall=!1,this.options.itemsTablet=!1,this.options.itemsTabletSmall= !1,this.options.itemsMobile=!1;a=f(this.options.responsiveBaseWidth).width();a>(this.options.itemsDesktop[0]||this.orignalItems)&&(this.options.items=this.orignalItems);if(!1!==this.options.itemsCustom)for(this.options.itemsCustom.sort(function(a,b){return a[0]-b[0]}),b=0;b<this.options.itemsCustom.length;b+=1)this.options.itemsCustom[b][0]<=a&&(this.options.items=this.options.itemsCustom[b][1]);else a<=this.options.itemsDesktop[0]&&!1!==this.options.itemsDesktop&&(this.options.items=this.options.itemsDesktop[1]), a<=this.options.itemsDesktopSmall[0]&&!1!==this.options.itemsDesktopSmall&&(this.options.items=this.options.itemsDesktopSmall[1]),a<=this.options.itemsTablet[0]&&!1!==this.options.itemsTablet&&(this.options.items=this.options.itemsTablet[1]),a<=this.options.itemsTabletSmall[0]&&!1!==this.options.itemsTabletSmall&&(this.options.items=this.options.itemsTabletSmall[1]),a<=this.options.itemsMobile[0]&&!1!==this.options.itemsMobile&&(this.options.items=this.options.itemsMobile[1]);this.options.items>this.itemsAmount&& !0===this.options.itemsScaleUp&&(this.options.items=this.itemsAmount)},response:function(){var a=this,b,e;if(!0!==a.options.responsive)return!1;e=f(g).width();a.resizer=function(){f(g).width()!==e&&(!1!==a.options.autoPlay&&g.clearInterval(a.autoPlayInterval),g.clearTimeout(b),b=g.setTimeout(function(){e=f(g).width();a.updateVars()},a.options.responsiveRefreshRate))};f(g).resize(a.resizer)},updatePosition:function(){this.jumpTo(this.currentItem);!1!==this.options.autoPlay&&this.checkAp()},appendItemsSizes:function(){var a= this,b=0,e=a.itemsAmount-a.options.items;a.$owlItems.each(function(c){var d=f(this);d.css({width:a.itemWidth}).data("owl-item",Number(c));if(0===c%a.options.items||c===e)c>e||(b+=1);d.data("owl-roundPages",b)})},appendWrapperSizes:function(){this.$owlWrapper.css({width:this.$owlItems.length*this.itemWidth*2,left:0});this.appendItemsSizes()},calculateAll:function(){this.calculateWidth();this.appendWrapperSizes();this.loops();this.max()},calculateWidth:function(){this.itemWidth=Math.round(this.$elem.width()/ this.options.items)},max:function(){var a=-1*(this.itemsAmount*this.itemWidth-this.options.items*this.itemWidth);this.options.items>this.itemsAmount?this.maximumPixels=a=this.maximumItem=0:(this.maximumItem=this.itemsAmount-this.options.items,this.maximumPixels=a);return a},min:function(){return 0},loops:function(){var a=0,b=0,e,c;this.positionsInArray=[0];this.pagesInArray=[];for(e=0;e<this.itemsAmount;e+=1)b+=this.itemWidth,this.positionsInArray.push(-b),!0===this.options.scrollPerPage&&(c=f(this.$owlItems[e]), c=c.data("owl-roundPages"),c!==a&&(this.pagesInArray[a]=this.positionsInArray[e],a=c))},buildControls:function(){if(!0===this.options.navigation||!0===this.options.pagination)this.owlControls=f('<div class="owl-controls"/>').toggleClass("clickable",!this.browser.isTouch).appendTo(this.$elem);!0===this.options.pagination&&this.buildPagination();!0===this.options.navigation&&this.buildButtons()},buildButtons:function(){var a=this,b=f('<div class="owl-buttons"/>');a.owlControls.append(b);a.buttonPrev= f("<div/>",{"class":"owl-prev",html:a.options.navigationText[0]||""});a.buttonNext=f("<div/>",{"class":"owl-next",html:a.options.navigationText[1]||""});b.append(a.buttonPrev).append(a.buttonNext);b.on("touchstart.owlControls mousedown.owlControls",'div[class^="owl"]',function(a){a.preventDefault()});b.on("touchend.owlControls mouseup.owlControls",'div[class^="owl"]',function(b){b.preventDefault();f(this).hasClass("owl-next")?a.next():a.prev()})},buildPagination:function(){var a=this;a.paginationWrapper= f('<div class="owl-pagination"/>');a.owlControls.append(a.paginationWrapper);a.paginationWrapper.on("touchend.owlControls mouseup.owlControls",".owl-page",function(b){b.preventDefault();Number(f(this).data("owl-page"))!==a.currentItem&&a.goTo(Number(f(this).data("owl-page")),!0)})},updatePagination:function(){var a,b,e,c,d,g;if(!1===this.options.pagination)return!1;this.paginationWrapper.html("");a=0;b=this.itemsAmount-this.itemsAmount%this.options.items;for(c=0;c<this.itemsAmount;c+=1)0===c%this.options.items&& (a+=1,b===c&&(e=this.itemsAmount-this.options.items),d=f("<div/>",{"class":"owl-page"}),g=f("<span></span>",{text:!0===this.options.paginationNumbers?a:"","class":!0===this.options.paginationNumbers?"owl-numbers":""}),d.append(g),d.data("owl-page",b===c?e:c),d.data("owl-roundPages",a),this.paginationWrapper.append(d));this.checkPagination()},checkPagination:function(){var a=this;if(!1===a.options.pagination)return!1;a.paginationWrapper.find(".owl-page").each(function(){f(this).data("owl-roundPages")=== f(a.$owlItems[a.currentItem]).data("owl-roundPages")&&(a.paginationWrapper.find(".owl-page").removeClass("active"),f(this).addClass("active"))})},checkNavigation:function(){if(!1===this.options.navigation)return!1;!1===this.options.rewindNav&&(0===this.currentItem&&0===this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.addClass("disabled")):0===this.currentItem&&0!==this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.removeClass("disabled")):this.currentItem=== this.maximumItem?(this.buttonPrev.removeClass("disabled"),this.buttonNext.addClass("disabled")):0!==this.currentItem&&this.currentItem!==this.maximumItem&&(this.buttonPrev.removeClass("disabled"),this.buttonNext.removeClass("disabled")))},updateControls:function(){this.updatePagination();this.checkNavigation();this.owlControls&&(this.options.items>=this.itemsAmount?this.owlControls.hide():this.owlControls.show())},destroyControls:function(){this.owlControls&&this.owlControls.remove()},next:function(a){if(this.isTransition)return!1; this.currentItem+=!0===this.options.scrollPerPage?this.options.items:1;if(this.currentItem>this.maximumItem+(!0===this.options.scrollPerPage?this.options.items-1:0))if(!0===this.options.rewindNav)this.currentItem=0,a="rewind";else return this.currentItem=this.maximumItem,!1;this.goTo(this.currentItem,a)},prev:function(a){if(this.isTransition)return!1;this.currentItem=!0===this.options.scrollPerPage&&0<this.currentItem&&this.currentItem<this.options.items?0:this.currentItem-(!0===this.options.scrollPerPage? this.options.items:1);if(0>this.currentItem)if(!0===this.options.rewindNav)this.currentItem=this.maximumItem,a="rewind";else return this.currentItem=0,!1;this.goTo(this.currentItem,a)},goTo:function(a,b,e){var c=this;if(c.isTransition)return!1;"function"===typeof c.options.beforeMove&&c.options.beforeMove.apply(this,[c.$elem]);a>=c.maximumItem?a=c.maximumItem:0>=a&&(a=0);c.currentItem=c.owl.currentItem=a;if(!1!==c.options.transitionStyle&&"drag"!==e&&1===c.options.items&&!0===c.browser.support3d)return c.swapSpeed(0), !0===c.browser.support3d?c.transition3d(c.positionsInArray[a]):c.css2slide(c.positionsInArray[a],1),c.afterGo(),c.singleItemTransition(),!1;a=c.positionsInArray[a];!0===c.browser.support3d?(c.isCss3Finish=!1,!0===b?(c.swapSpeed("paginationSpeed"),g.setTimeout(function(){c.isCss3Finish=!0},c.options.paginationSpeed)):"rewind"===b?(c.swapSpeed(c.options.rewindSpeed),g.setTimeout(function(){c.isCss3Finish=!0},c.options.rewindSpeed)):(c.swapSpeed("slideSpeed"),g.setTimeout(function(){c.isCss3Finish=!0}, c.options.slideSpeed)),c.transition3d(a)):!0===b?c.css2slide(a,c.options.paginationSpeed):"rewind"===b?c.css2slide(a,c.options.rewindSpeed):c.css2slide(a,c.options.slideSpeed);c.afterGo()},jumpTo:function(a){"function"===typeof this.options.beforeMove&&this.options.beforeMove.apply(this,[this.$elem]);a>=this.maximumItem||-1===a?a=this.maximumItem:0>=a&&(a=0);this.swapSpeed(0);!0===this.browser.support3d?this.transition3d(this.positionsInArray[a]):this.css2slide(this.positionsInArray[a],1);this.currentItem= this.owl.currentItem=a;this.afterGo()},afterGo:function(){this.prevArr.push(this.currentItem);this.prevItem=this.owl.prevItem=this.prevArr[this.prevArr.length-2];this.prevArr.shift(0);this.prevItem!==this.currentItem&&(this.checkPagination(),this.checkNavigation(),this.eachMoveUpdate(),!1!==this.options.autoPlay&&this.checkAp());"function"===typeof this.options.afterMove&&this.prevItem!==this.currentItem&&this.options.afterMove.apply(this,[this.$elem])},stop:function(){this.apStatus="stop";g.clearInterval(this.autoPlayInterval)}, checkAp:function(){"stop"!==this.apStatus&&this.play()},play:function(){var a=this;a.apStatus="play";if(!1===a.options.autoPlay)return!1;g.clearInterval(a.autoPlayInterval);a.autoPlayInterval=g.setInterval(function(){a.next(!0)},a.options.autoPlay)},swapSpeed:function(a){"slideSpeed"===a?this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)):"paginationSpeed"===a?this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)):"string"!==typeof a&&this.$owlWrapper.css(this.addCssSpeed(a))}, addCssSpeed:function(a){return{"-webkit-transition":"all "+a+"ms ease","-moz-transition":"all "+a+"ms ease","-o-transition":"all "+a+"ms ease",transition:"all "+a+"ms ease"}},removeTransition:function(){return{"-webkit-transition":"","-moz-transition":"","-o-transition":"",transition:""}},doTranslate:function(a){return{"-webkit-transform":"translate3d("+a+"px, 0px, 0px)","-moz-transform":"translate3d("+a+"px, 0px, 0px)","-o-transform":"translate3d("+a+"px, 0px, 0px)","-ms-transform":"translate3d("+ a+"px, 0px, 0px)",transform:"translate3d("+a+"px, 0px,0px)"}},transition3d:function(a){this.$owlWrapper.css(this.doTranslate(a))},css2move:function(a){this.$owlWrapper.css({left:a})},css2slide:function(a,b){var e=this;e.isCssFinish=!1;e.$owlWrapper.stop(!0,!0).animate({left:a},{duration:b||e.options.slideSpeed,complete:function(){e.isCssFinish=!0}})},checkBrowser:function(){var a=k.createElement("div");a.style.cssText="  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)"; a=a.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g);this.browser={support3d:null!==a&&1===a.length,isTouch:"ontouchstart"in g||g.navigator.msMaxTouchPoints}},moveEvents:function(){if(!1!==this.options.mouseDrag||!1!==this.options.touchDrag)this.gestures(),this.disabledEvents()},eventTypes:function(){var a=["s","e","x"];this.ev_types={};!0===this.options.mouseDrag&&!0===this.options.touchDrag?a=["touchstart.owl mousedown.owl","touchmove.owl mousemove.owl","touchend.owl touchcancel.owl mouseup.owl"]: !1===this.options.mouseDrag&&!0===this.options.touchDrag?a=["touchstart.owl","touchmove.owl","touchend.owl touchcancel.owl"]:!0===this.options.mouseDrag&&!1===this.options.touchDrag&&(a=["mousedown.owl","mousemove.owl","mouseup.owl"]);this.ev_types.start=a[0];this.ev_types.move=a[1];this.ev_types.end=a[2]},disabledEvents:function(){this.$elem.on("dragstart.owl",function(a){a.preventDefault()});this.$elem.on("mousedown.disableTextSelect",function(a){return f(a.target).is("input, textarea, select, option")})}, gestures:function(){function a(a){if(void 0!==a.touches)return{x:a.touches[0].pageX,y:a.touches[0].pageY};if(void 0===a.touches){if(void 0!==a.pageX)return{x:a.pageX,y:a.pageY};if(void 0===a.pageX)return{x:a.clientX,y:a.clientY}}}function b(a){"on"===a?(f(k).on(d.ev_types.move,e),f(k).on(d.ev_types.end,c)):"off"===a&&(f(k).off(d.ev_types.move),f(k).off(d.ev_types.end))}function e(b){b=b.originalEvent||b||g.event;d.newPosX=a(b).x-h.offsetX;d.newPosY=a(b).y-h.offsetY;d.newRelativeX=d.newPosX-h.relativePos; "function"===typeof d.options.startDragging&&!0!==h.dragging&&0!==d.newRelativeX&&(h.dragging=!0,d.options.startDragging.apply(d,[d.$elem]));(8<d.newRelativeX||-8>d.newRelativeX)&&!0===d.browser.isTouch&&(void 0!==b.preventDefault?b.preventDefault():b.returnValue=!1,h.sliding=!0);(10<d.newPosY||-10>d.newPosY)&&!1===h.sliding&&f(k).off("touchmove.owl");d.newPosX=Math.max(Math.min(d.newPosX,d.newRelativeX/5),d.maximumPixels+d.newRelativeX/5);!0===d.browser.support3d?d.transition3d(d.newPosX):d.css2move(d.newPosX)} function c(a){a=a.originalEvent||a||g.event;var c;a.target=a.target||a.srcElement;h.dragging=!1;!0!==d.browser.isTouch&&d.$owlWrapper.removeClass("grabbing");d.dragDirection=0>d.newRelativeX?d.owl.dragDirection="left":d.owl.dragDirection="right";0!==d.newRelativeX&&(c=d.getNewPosition(),d.goTo(c,!1,"drag"),h.targetElement===a.target&&!0!==d.browser.isTouch&&(f(a.target).on("click.disable",function(a){a.stopImmediatePropagation();a.stopPropagation();a.preventDefault();f(a.target).off("click.disable")}), a=f._data(a.target,"events").click,c=a.pop(),a.splice(0,0,c)));b("off")}var d=this,h={offsetX:0,offsetY:0,baseElWidth:0,relativePos:0,position:null,minSwipe:null,maxSwipe:null,sliding:null,dargging:null,targetElement:null};d.isCssFinish=!0;d.$elem.on(d.ev_types.start,".owl-wrapper",function(c){c=c.originalEvent||c||g.event;var e;if(3===c.which)return!1;if(!(d.itemsAmount<=d.options.items)){if(!1===d.isCssFinish&&!d.options.dragBeforeAnimFinish||!1===d.isCss3Finish&&!d.options.dragBeforeAnimFinish)return!1; !1!==d.options.autoPlay&&g.clearInterval(d.autoPlayInterval);!0===d.browser.isTouch||d.$owlWrapper.hasClass("grabbing")||d.$owlWrapper.addClass("grabbing");d.newPosX=0;d.newRelativeX=0;f(this).css(d.removeTransition());e=f(this).position();h.relativePos=e.left;h.offsetX=a(c).x-e.left;h.offsetY=a(c).y-e.top;b("on");h.sliding=!1;h.targetElement=c.target||c.srcElement}})},getNewPosition:function(){var a=this.closestItem();a>this.maximumItem?a=this.currentItem=this.maximumItem:0<=this.newPosX&&(this.currentItem= a=0);return a},closestItem:function(){var a=this,b=!0===a.options.scrollPerPage?a.pagesInArray:a.positionsInArray,e=a.newPosX,c=null;f.each(b,function(d,g){e-a.itemWidth/20>b[d+1]&&e-a.itemWidth/20<g&&"left"===a.moveDirection()?(c=g,a.currentItem=!0===a.options.scrollPerPage?f.inArray(c,a.positionsInArray):d):e+a.itemWidth/20<g&&e+a.itemWidth/20>(b[d+1]||b[d]-a.itemWidth)&&"right"===a.moveDirection()&&(!0===a.options.scrollPerPage?(c=b[d+1]||b[b.length-1],a.currentItem=f.inArray(c,a.positionsInArray)): (c=b[d+1],a.currentItem=d+1))});return a.currentItem},moveDirection:function(){var a;0>this.newRelativeX?(a="right",this.playDirection="next"):(a="left",this.playDirection="prev");return a},customEvents:function(){var a=this;a.$elem.on("owl.next",function(){a.next()});a.$elem.on("owl.prev",function(){a.prev()});a.$elem.on("owl.play",function(b,e){a.options.autoPlay=e;a.play();a.hoverStatus="play"});a.$elem.on("owl.stop",function(){a.stop();a.hoverStatus="stop"});a.$elem.on("owl.goTo",function(b,e){a.goTo(e)}); a.$elem.on("owl.jumpTo",function(b,e){a.jumpTo(e)})},stopOnHover:function(){var a=this;!0===a.options.stopOnHover&&!0!==a.browser.isTouch&&!1!==a.options.autoPlay&&(a.$elem.on("mouseover",function(){a.stop()}),a.$elem.on("mouseout",function(){"stop"!==a.hoverStatus&&a.play()}))},lazyLoad:function(){var a,b,e,c,d;if(!1===this.options.lazyLoad)return!1;for(a=0;a<this.itemsAmount;a+=1)b=f(this.$owlItems[a]),"loaded"!==b.data("owl-loaded")&&(e=b.data("owl-item"),c=b.find(".lazyOwl"),"string"!==typeof c.data("src")? b.data("owl-loaded","loaded"):(void 0===b.data("owl-loaded")&&(c.hide(),b.addClass("loading").data("owl-loaded","checked")),(d=!0===this.options.lazyFollow?e>=this.currentItem:!0)&&e<this.currentItem+this.options.items&&c.length&&this.lazyPreload(b,c)))},lazyPreload:function(a,b){function e(){a.data("owl-loaded","loaded").removeClass("loading");b.removeAttr("data-src");"fade"===d.options.lazyEffect?b.fadeIn(400):b.show();"function"===typeof d.options.afterLazyLoad&&d.options.afterLazyLoad.apply(this, [d.$elem])}function c(){f+=1;d.completeImg(b.get(0))||!0===k?e():100>=f?g.setTimeout(c,100):e()}var d=this,f=0,k;"DIV"===b.prop("tagName")?(b.css("background-image","url("+b.data("src")+")"),k=!0):b[0].src=b.data("src");c()},autoHeight:function(){function a(){var a=f(e.$owlItems[e.currentItem]).height();e.wrapperOuter.css("height",a+"px");e.wrapperOuter.hasClass("autoHeight")||g.setTimeout(function(){e.wrapperOuter.addClass("autoHeight")},0)}function b(){d+=1;e.completeImg(c.get(0))?a():100>=d?g.setTimeout(b, 100):e.wrapperOuter.css("height","")}var e=this,c=f(e.$owlItems[e.currentItem]).find("img"),d;void 0!==c.get(0)?(d=0,b()):a()},completeImg:function(a){return!a.complete||"undefined"!==typeof a.naturalWidth&&0===a.naturalWidth?!1:!0},onVisibleItems:function(){var a;!0===this.options.addClassActive&&this.$owlItems.removeClass("active");this.visibleItems=[];for(a=this.currentItem;a<this.currentItem+this.options.items;a+=1)this.visibleItems.push(a),!0===this.options.addClassActive&&f(this.$owlItems[a]).addClass("active"); this.owl.visibleItems=this.visibleItems},transitionTypes:function(a){this.outClass="owl-"+a+"-out";this.inClass="owl-"+a+"-in"},singleItemTransition:function(){var a=this,b=a.outClass,e=a.inClass,c=a.$owlItems.eq(a.currentItem),d=a.$owlItems.eq(a.prevItem),f=Math.abs(a.positionsInArray[a.currentItem])+a.positionsInArray[a.prevItem],g=Math.abs(a.positionsInArray[a.currentItem])+a.itemWidth/2;a.isTransition=!0;a.$owlWrapper.addClass("owl-origin").css({"-webkit-transform-origin":g+"px","-moz-perspective-origin":g+ "px","perspective-origin":g+"px"});d.css({position:"relative",left:f+"px"}).addClass(b).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){a.endPrev=!0;d.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");a.clearTransStyle(d,b)});c.addClass(e).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){a.endCurrent=!0;c.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");a.clearTransStyle(c,e)})},clearTransStyle:function(a, b){a.css({position:"",left:""}).removeClass(b);this.endPrev&&this.endCurrent&&(this.$owlWrapper.removeClass("owl-origin"),this.isTransition=this.endCurrent=this.endPrev=!1)},owlStatus:function(){this.owl={userOptions:this.userOptions,baseElement:this.$elem,userItems:this.$userItems,owlItems:this.$owlItems,currentItem:this.currentItem,prevItem:this.prevItem,visibleItems:this.visibleItems,isTouch:this.browser.isTouch,browser:this.browser,dragDirection:this.dragDirection}},clearEvents:function(){this.$elem.off(".owl owl mousedown.disableTextSelect"); f(k).off(".owl owl");f(g).off("resize",this.resizer)},unWrap:function(){0!==this.$elem.children().length&&(this.$owlWrapper.unwrap(),this.$userItems.unwrap().unwrap(),this.owlControls&&this.owlControls.remove());this.clearEvents();this.$elem.attr("style",this.$elem.data("owl-originalStyles")||"").attr("class",this.$elem.data("owl-originalClasses"))},destroy:function(){this.stop();g.clearInterval(this.checkVisible);this.unWrap();this.$elem.removeData()},reinit:function(a){a=f.extend({},this.userOptions, a);this.unWrap();this.init(a,this.$elem)},addItem:function(a,b){var e;if(!a)return!1;if(0===this.$elem.children().length)return this.$elem.append(a),this.setVars(),!1;this.unWrap();e=void 0===b||-1===b?-1:b;e>=this.$userItems.length||-1===e?this.$userItems.eq(-1).after(a):this.$userItems.eq(e).before(a);this.setVars()},removeItem:function(a){if(0===this.$elem.children().length)return!1;a=void 0===a||-1===a?-1:a;this.unWrap();this.$userItems.eq(a).remove();this.setVars()}};f.fn.owlCarousel=function(a){return this.each(function(){if(!0=== f(this).data("owl-init"))return!1;f(this).data("owl-init",!0);var b=Object.create(l);b.init(a,this);f.data(this,"owlCarousel",b)})};f.fn.owlCarousel.options={items:5,itemsCustom:!1,itemsDesktop:[1199,4],itemsDesktopSmall:[979,3],itemsTablet:[768,2],itemsTabletSmall:!1,itemsMobile:[479,1],singleItem:!1,itemsScaleUp:!1,slideSpeed:200,paginationSpeed:800,rewindSpeed:1E3,autoPlay:!1,stopOnHover:!1,navigation:!1,navigationText:["prev","next"],rewindNav:!0,scrollPerPage:!1,pagination:!0,paginationNumbers:!1, responsive:!0,responsiveRefreshRate:200,responsiveBaseWidth:g,baseClass:"owl-carousel",theme:"owl-theme",lazyLoad:!1,lazyFollow:!0,lazyEffect:"fade",autoHeight:!1,jsonPath:!1,jsonSuccess:!1,dragBeforeAnimFinish:!0,mouseDrag:!0,touchDrag:!0,addClassActive:!1,transitionStyle:!1,beforeUpdate:!1,afterUpdate:!1,beforeInit:!1,afterInit:!1,beforeMove:!1,afterMove:!1,afterAction:!1,startDragging:!1,afterLazyLoad:!1}})(jQuery,window,document);

var _0xec00=['apply','join','<button\x20title=\x22Carregando\x20...\x22><i\x20class=\x22fa\x20fa-envelope\x22></i>\x20Avise-me</button>','top','Callbacks','memory','length','extend','Não\x20foi\x20localizado\x20o\x20Bootstrap\x20Tooltip,\x20por\x20favor\x20chame\x20a\x20biblioteca\x20JS\x20do\x20Bootstrap.','getParent','addClass','hide','button','prependTo','data-placement','placement','data-sku','find','.notifyme-skuid','val','attr','qdAjax','/no-cache/profileSystem/getProfile','qd-snm-ready','tooltip','destroy','Email','click.qd_snm','qd-snm-loading','Carregando\x20...','show','test','post','FirstName','qd-snm-sent','title','Solicitação\x20enviada.\x20Obrigado!','Erro\x20:-(.\x20Por\x20favor,\x20fale\x20com\x20o\x20SAC!','skuId','neynoretnznfx%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','ite','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','each','skus','body','Problemas\x20ao\x20verificar\x20se\x20o\x20produto\x20esta\x20indisponível.\x20Detalhes:\x20','fire','sku','Problemas\x20nos\x20eventos\x20VTEX.\x20Detalhes:\x20','.qd_auto_smart_notify_me','appendTo','.portal-notify-me-ref','QD_smartNotifyMe','Quatro\x20Digital\x20-\x20Smart\x20Notify\x20Me','object','function','error','warn','undefined','toLowerCase','aviso','info'];(function(_0xbc86fc,_0x1bb24d){var _0x549976=function(_0x530436){while(--_0x530436){_0xbc86fc['push'](_0xbc86fc['shift']());}};_0x549976(++_0x1bb24d);}(_0xec00,0xbf));var _0x0ec0=function(_0x3d34da,_0x3abcc1){_0x3d34da=_0x3d34da-0x0;var _0xcf6af8=_0xec00[_0x3d34da];return _0xcf6af8;};(function(_0x4c3133){'use strict';var _0x1e299f=jQuery;if(typeof _0x1e299f['fn'][_0x0ec0('0x0')]==='function')return;_0x1e299f['fn'][_0x0ec0('0x0')]=function(){};var _0x29a55e=_0x0ec0('0x1');var _0x134805=function(_0x3f1564,_0x2abe4e){if(_0x0ec0('0x2')===typeof console&&_0x0ec0('0x3')===typeof console[_0x0ec0('0x4')]&&_0x0ec0('0x3')===typeof console['info']&&'function'===typeof console[_0x0ec0('0x5')]){var _0x2d2667;'object'===typeof _0x3f1564?(_0x3f1564['unshift']('['+_0x29a55e+']\x0a'),_0x2d2667=_0x3f1564):_0x2d2667=['['+_0x29a55e+']\x0a'+_0x3f1564];if(_0x0ec0('0x6')===typeof _0x2abe4e||'alerta'!==_0x2abe4e[_0x0ec0('0x7')]()&&_0x0ec0('0x8')!==_0x2abe4e[_0x0ec0('0x7')]())if(_0x0ec0('0x6')!==typeof _0x2abe4e&&_0x0ec0('0x9')===_0x2abe4e[_0x0ec0('0x7')]())try{console['info'][_0x0ec0('0xa')](console,_0x2d2667);}catch(_0x2e9d2d){console[_0x0ec0('0x9')](_0x2d2667[_0x0ec0('0xb')]('\x0a'));}else try{console[_0x0ec0('0x4')][_0x0ec0('0xa')](console,_0x2d2667);}catch(_0x57304e){console[_0x0ec0('0x4')](_0x2d2667[_0x0ec0('0xb')]('\x0a'));}else try{console[_0x0ec0('0x5')][_0x0ec0('0xa')](console,_0x2d2667);}catch(_0x1d0fe2){console['warn'](_0x2d2667[_0x0ec0('0xb')]('\x0a'));}}};var _0x5af8c3={'button':_0x0ec0('0xc'),'placement':_0x0ec0('0xd'),'skuId':null};var _0x3319ba=_0x1e299f[_0x0ec0('0xe')](_0x0ec0('0xf'));var _0x2eed03=function(_0x55eb69,_0x2df158){'use strict';var _0xc262c=_0x1e299f(_0x2df158);if(!_0xc262c[_0x0ec0('0x10')])return;var _0x1954a5=_0x1e299f[_0x0ec0('0x11')]({},_0x5af8c3,_0x55eb69);if(typeof _0x1e299f['fn']['tooltip']!==_0x0ec0('0x3'))return _0x134805(_0x0ec0('0x12'));var _0x4e1ac6=_0xc262c[_0x0ec0('0x13')]('.portal-notify-me-ref');_0xc262c[_0x0ec0('0x14')](_0x0ec0('0x15'));var _0x1f70ef=_0x1e299f(_0x1954a5[_0x0ec0('0x16')]);_0x1f70ef[_0x0ec0('0x17')](_0xc262c);_0x1f70ef['attr'](_0x0ec0('0x18'),_0x1954a5[_0x0ec0('0x19')]);if(_0x1954a5['skuId'])_0x1f70ef['attr'](_0x0ec0('0x1a'),_0x1954a5['skuId']);else{var _0x1b2a3e=(_0x4e1ac6[_0x0ec0('0x1b')](_0x0ec0('0x1c'))[_0x0ec0('0x1d')]()||'')+'';if(_0x1b2a3e['length'])_0x1f70ef[_0x0ec0('0x1e')]('data-sku',_0x1b2a3e);}_0x1e299f[_0x0ec0('0x1f')]({'url':_0x0ec0('0x20'),'dataType':'json','clearQueueDelay':null,'success':function(_0x315bad){_0xc262c[_0x0ec0('0x14')](_0x0ec0('0x21'));_0x1f70ef[_0x0ec0('0x22')](_0x0ec0('0x23'));_0x1f70ef['attr']('title',_0x315bad[_0x0ec0('0x24')])[_0x0ec0('0x22')]();_0x1f70ef['on'](_0x0ec0('0x25'),function(){try{_0xc262c['addClass'](_0x0ec0('0x26'));_0x1f70ef[_0x0ec0('0x22')]('destroy');_0x1f70ef[_0x0ec0('0x1e')]('title',_0x0ec0('0x27'))[_0x0ec0('0x22')](_0x0ec0('0x28'));var _0x41048b;if(_0x315bad[_0x0ec0('0x24')])_0x41048b=_0x315bad[_0x0ec0('0x24')];else{var _0x4c4653=function(){_0x41048b=prompt('Insira\x20seu\x20e-mail');if(_0x41048b!==null&&!/([\d\w\.]+)\+?([\.\w\d]+)?@([\w\d]+[\.\w\d]+)/i[_0x0ec0('0x29')](_0x41048b))_0x4c4653();};_0x4c4653();}if(_0x41048b){_0x1e299f[_0x0ec0('0x2a')]('/no-cache/AviseMe.aspx',{'notifymeClientEmail':_0x41048b,'notifymeClientName':_0x315bad[_0x0ec0('0x2b')]||_0x315bad[_0x0ec0('0x24')]||_0x41048b,'notifymeIdSku':_0x1e299f(this)[_0x0ec0('0x1e')](_0x0ec0('0x1a'))},function(){_0xc262c[_0x0ec0('0x14')](_0x0ec0('0x2c'));_0xc262c['removeClass']('qd-snm-loading');_0x1f70ef[_0x0ec0('0x22')](_0x0ec0('0x23'));_0x1f70ef[_0x0ec0('0x1e')](_0x0ec0('0x2d'),_0x0ec0('0x2e'))[_0x0ec0('0x22')](_0x0ec0('0x28'));})['fail'](function(){throw'';});}}catch(_0x5e97f4){alert('Desculpe,\x20não\x20foi\x20possível\x20enviar\x20seu\x20pedido.\x20Por\x20favor\x20entre\x20em\x20contato\x20com\x20a\x20Central\x20de\x20Atendimento.');}});},'error':function(){_0x1f70ef[_0x0ec0('0x22')]('destroy');_0x1f70ef[_0x0ec0('0x1e')]('title',_0x0ec0('0x2f'))[_0x0ec0('0x22')]();}});_0x1f70ef[_0x0ec0('0x22')]();_0x3319ba['add'](function(_0x41fdf0){_0xc262c['removeClass'](_0x0ec0('0x15'));if(!_0x1954a5[_0x0ec0('0x30')])_0x1f70ef[_0x0ec0('0x1e')](_0x0ec0('0x1a'),_0x41fdf0);});};var _0x59b5c1=function(_0x725fa5){var _0x5b133f={'p':_0x0ec0('0x31')};return function(_0x3aefb4){var _0x589dec,_0x489b13,_0x1a8e67,_0x3548b4;_0x489b13=function(_0x205818){return _0x205818;};_0x1a8e67=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3aefb4=_0x3aefb4['d'+_0x1a8e67[0x10]+'c'+_0x1a8e67[0x11]+'m'+_0x489b13(_0x1a8e67[0x1])+'n'+_0x1a8e67[0xd]]['l'+_0x1a8e67[0x12]+'c'+_0x1a8e67[0x0]+'ti'+_0x489b13('o')+'n'];_0x589dec=function(_0x35f82c){return escape(encodeURIComponent(_0x35f82c[_0x0ec0('0x32')](/\./g,'¨')[_0x0ec0('0x32')](/[a-zA-Z]/g,function(_0x2738ec){return String[_0x0ec0('0x33')](('Z'>=_0x2738ec?0x5a:0x7a)>=(_0x2738ec=_0x2738ec[_0x0ec0('0x34')](0x0)+0xd)?_0x2738ec:_0x2738ec-0x1a);})));};var _0x1d6e4d=_0x589dec(_0x3aefb4[[_0x1a8e67[0x9],_0x489b13('o'),_0x1a8e67[0xc],_0x1a8e67[_0x489b13(0xd)]]['join']('')]);_0x589dec=_0x589dec((window[['js',_0x489b13('no'),'m',_0x1a8e67[0x1],_0x1a8e67[0x4][_0x0ec0('0x35')](),_0x0ec0('0x36')]['join']('')]||'---')+['.v',_0x1a8e67[0xd],'e',_0x489b13('x'),'co',_0x489b13('mm'),'erc',_0x1a8e67[0x1],'.c',_0x489b13('o'),'m.',_0x1a8e67[0x13],'r'][_0x0ec0('0xb')](''));for(var _0x3384dd in _0x5b133f){if(_0x589dec===_0x3384dd+_0x5b133f[_0x3384dd]||_0x1d6e4d===_0x3384dd+_0x5b133f[_0x3384dd]){_0x3548b4='tr'+_0x1a8e67[0x11]+'e';break;}_0x3548b4='f'+_0x1a8e67[0x0]+'ls'+_0x489b13(_0x1a8e67[0x1])+'';}_0x489b13=!0x1;-0x1<_0x3aefb4[[_0x1a8e67[0xc],'e',_0x1a8e67[0x0],'rc',_0x1a8e67[0x9]][_0x0ec0('0xb')]('')][_0x0ec0('0x37')](_0x0ec0('0x38'))&&(_0x489b13=!0x0);return[_0x3548b4,_0x489b13];}(_0x725fa5);}(window);if(!eval(_0x59b5c1[0x0]))return _0x59b5c1[0x1]?_0x134805('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x1e299f['fn'][_0x0ec0('0x0')]=function(_0x3d8443){var _0x215a82=_0x1e299f(this);_0x215a82[_0x0ec0('0x39')](function(){_0x2eed03(_0x3d8443,_0x1e299f(this));});return _0x215a82;};_0x1e299f(function(){try{if(typeof skuJson!==_0x0ec0('0x2'))return;var _0x27b998=!![];for(var _0x44d2e6=0x0;_0x44d2e6<skuJson[_0x0ec0('0x3a')]['length'];_0x44d2e6++){if(skuJson[_0x0ec0('0x3a')][_0x44d2e6]['available']){_0x27b998=![];break;}}if(_0x27b998)_0x1e299f(_0x0ec0('0x3b'))[_0x0ec0('0x14')]('qd-smn-all-sku-unavailable');}catch(_0x308830){_0x134805(_0x0ec0('0x3c')+_0x308830['message']);}});_0x1e299f(window)['on']('skuSelected.vtex',function(_0x2f336c,_0x47d7b7,_0x910956){try{if(!_0x910956['available'])_0x3319ba[_0x0ec0('0x3d')](_0x910956[_0x0ec0('0x3e')]);}catch(_0x1d8cf6){_0x134805(_0x0ec0('0x3f')+_0x1d8cf6['message']);}});_0x1e299f(function(){_0x1e299f(_0x0ec0('0x40'))['QD_smartNotifyMe']();});_0x1e299f(function(){if(typeof skuJson!==_0x0ec0('0x2'))return;_0x1e299f('<div\x20class=\x22qd-snm-auto-include\x22></div>')[_0x0ec0('0x41')](_0x0ec0('0x42'))[_0x0ec0('0x0')]();});}(this));
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

/* Quatro Digital - Smart Quantity // Carlos Vinicius // Todos os direitos reservados */
/* Quatro Digital - Smart Quantity // 1.12 // Carlos Vinicius // Todos os direitos reservados */
(function(v){var d=jQuery;if("function"!==typeof d.fn.QD_smartQuantity){var g=function(d,a){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var f;"object"===typeof d?(d.unshift("[Quatro Digital - Smart Quantity]\n"),f=d):f=["[Quatro Digital - Smart Quantity]\n"+d];if("undefined"===typeof a||"alerta"!==a.toLowerCase()&&"aviso"!==a.toLowerCase())if("undefined"!==typeof a&&"info"===a.toLowerCase())try{console.info.apply(console,
f)}catch(k){console.info(f.join("\n"))}else try{console.error.apply(console,f)}catch(k){console.error(f.join("\n"))}else try{console.warn.apply(console,f)}catch(k){console.warn(f.join("\n"))}}},m={buyButton:".buy-button",qttInput:".qd-sq-quantity",btnMore:".qd-sq-more",btnMinus:".qd-sq-minus",initialValue:1,minimumValue:1,setQuantityByUrl:!0},n=function(h,a){function f(c,e,b){a.setQuantityByUrl?c.val(((location.search||"").match(q)||[a.initialValue]).pop()):c.val(a.initialValue);c.change(function(c,
b){try{if("qd_ssl_trigger"!=b){var e=d(this),f=parseInt(e.val().replace(n,""));!isNaN(f)&&f>a.minimumValue?e.val(f):e.val(a.minimumValue);e.trigger("QuatroDigital.sq_change",this)}}catch(t){g(t.message)}});c.focusin(function(){d(this).trigger("QuatroDigital.sq_focusin",this)});e.click(function(b){b.preventDefault();c.val((parseInt(c.val())||a.minimumValue)+1).change()});b.click(function(b){b.preventDefault();c.val((parseInt(c.val())||a.minimumValue+1)-1).change()});c.change()}function k(c,e,b){c.on("QuatroDigital.sq_change",
function(){(d(this).val()||0)<=a.minimumValue?(b.addClass("qd-sq-inactive"),e.removeClass("qd-sq-inactive")):(e.addClass("qd-sq-inactive"),b.removeClass("qd-sq-inactive"))})}function m(c,e){c.on("QuatroDigital.sq_change",function(){try{if(!(e[0].hostname||"").length)return g("A quantidade n\u00e3o foi inserida no bt comprar pois o mesmo n\u00e3o possui uma URL","info");var b=e[0].search||"";-1<b.toLowerCase().indexOf("qty=")?e[0].search=b.replace(p,"qty="+(parseInt(c.val())||("number"==typeof a.minimumValue?
a.minimumValue:1))+"&"):e[0].search="qty="+(parseInt(c.val())||("number"==typeof a.minimumValue?a.minimumValue:1))+"&"+(e[0].search||"").replace(p,"");e.not(":first").each(function(){this.href=e[0].href});var d=((e.first().attr("href")||"").match(u)||[""]).pop()+"";c.attr("data-sku-id",d);if(d.length&&"object"===typeof skuJson&&!c.attr("data-sku-price"))for(b=0;b<skuJson.skus.length;b++)skuJson.skus[b].sku==d&&c.attr("data-sku-price",skuJson.skus[b].bestPrice)}catch(l){g(l.message)}})}var n=/[^0-9-]/gi,
q=/qty\=([0-9]+)/i,u=/sku\=([0-9]+)/i,p=/qty\=[0-9]+\&?/ig;h.each(function(){try{var c=d(this),e=c.find(a.buyButton),b=c.find(a.qttInput),h=c.find(a.btnMore),l=c.find(a.btnMinus);if(!e.length&&null!==a.buyButton||!b.length)return g("O plugin parou por aqui! N\u00e3o foram encontrados o bot\u00e3o comprar e o campo de quantidade","alerta");if(b.is(".qd-sq-on"))return g(["Execu\u00e7\u00e3o ignorada pois este input j\u00e1 possui o plugin aplicado. Input: ",b],"info");b.addClass("qd-sq-on");k(b,h,l);
null!==a.buyButton&&m(b,e);f(b,h,l);d(window).on("vtex.sku.selected",function(){b.change()})}catch(r){g(r.message)}})};d.fn.QD_smartQuantity=function(g){var a=d(this);a.qdPlugin=new n(a,d.extend({},m,g));d(window).trigger("QuatroDigital.sq_callback");return a};d(function(){d(".qd_auto_smart_quantity").QD_smartQuantity()})}})(this);    

/* Quatro Digital - Smart SKU Totalizer // 1.0 // Carlos Vinicius // Todos os direitos reservados */
(function(m){var a=jQuery;if("function"!==typeof a.fn.QD_smartSkuTotalizer){var f=function(a,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var c;"object"===typeof a?(a.unshift("[Quatro Digital - Smart SKU Totalizer]\n"),c=a):c=["[Quatro Digital - Smart SKU Totalizer]\n"+a];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
c)}catch(f){try{console.info(c.join("\n"))}catch(k){}}else try{console.error.apply(console,c)}catch(g){try{console.error(c.join("\n"))}catch(e){}}else try{console.warn.apply(console,c)}catch(n){try{console.warn(c.join("\n"))}catch(p){}}}},l={inputQtt:"input",qttSkus:".qd-selected-qtt-sku",valueSkus:".qd-selected-sku-total"};a.QD_smartSkuTotalizer=function(d,b){if(!d.length)return d;try{var c=a(b.qttSkus),h=a(b.valueSkus),k=a("meta[name='currency']").attr("content")||"R$";if(!c.length&&!h.length)return f("N\u00e3o encontrei os elementos para informar os totais, por isso n\u00e3o irei exibi-los.",
"info");var g=d.find(b.inputQtt).not("disabled").filter("[data-sku-id]");g.on("QuatroDigital.sq_change",function(){try{var b=0,d=0;g.each(function(){var c=a(this),e=parseInt(c.val());0<e&&(d+=e,b+=e*(parseInt(c.attr("data-sku-price"))||0))});c.html(d);h.html(k+" "+qd_number_format(b/100,2,",","."))}catch(e){f(e.message)}})}catch(e){f(e.message)}};a.fn.QD_smartSkuTotalizer=function(d){var b=a(this);if(!b.length)return b;var c=a.extend({},l,d);b.each(function(){a.QD_smartSkuTotalizer(a(this),c)});return b};
a(function(){a(".qd_auto_smart_sku_totalizer").QD_smartSkuTotalizer()})}})(this);

// amazing menu
var _0x124b=['text','trim','\x27\x20falho.','ajaxCallback','trigger','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul',':not(ul)','qd-am-elem-','replaceSpecialChars','>li','qdAmAddNdx','qd-amazing-menu','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','children','qd-am-level-','add','-li','callback','call','QuatroDigital.am.callback','exec','.qd_amazing_menu_auto','getParent','QD_amazingMenu','function','/qd-amazing-menu','QD\x20Amazing\x20Menu','object','undefined','info','warn','alerta','toLowerCase','aviso','apply','join','error','each','addClass','qd-am-li-','first','qd-am-first','last','qd-am-last','neynoretnznfx%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','---','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','url','html','data-qdam-value','.box-banner','clone','insertBefore','hide','qd-am-content-loaded'];(function(_0x5dab9a,_0x432457){var _0x188f27=function(_0x226f7b){while(--_0x226f7b){_0x5dab9a['push'](_0x5dab9a['shift']());}};_0x188f27(++_0x432457);}(_0x124b,0xf9));var _0xb124=function(_0x2b8146,_0xa98dfd){_0x2b8146=_0x2b8146-0x0;var _0x14bb69=_0x124b[_0x2b8146];return _0x14bb69;};(function(_0x2f26fa){_0x2f26fa['fn'][_0xb124('0x0')]=_0x2f26fa['fn']['closest'];}(jQuery));(function(_0x212796){'use strict';var _0x4448a1,_0x4eaded,_0x5ee0d5,_0x56a80c;_0x4448a1=jQuery;if(typeof _0x4448a1['fn'][_0xb124('0x1')]===_0xb124('0x2'))return;_0x4eaded={'url':_0xb124('0x3'),'callback':function(){},'ajaxCallback':function(){}};var _0xea3fb4=_0xb124('0x4');var _0x281920=function(_0x1a3beb,_0x5acf3f){if(_0xb124('0x5')===typeof console&&'undefined'!==typeof console['error']&&_0xb124('0x6')!==typeof console[_0xb124('0x7')]&&_0xb124('0x6')!==typeof console[_0xb124('0x8')]){var _0x30c005;_0xb124('0x5')===typeof _0x1a3beb?(_0x1a3beb['unshift']('['+_0xea3fb4+']\x0a'),_0x30c005=_0x1a3beb):_0x30c005=['['+_0xea3fb4+']\x0a'+_0x1a3beb];if('undefined'===typeof _0x5acf3f||_0xb124('0x9')!==_0x5acf3f[_0xb124('0xa')]()&&_0xb124('0xb')!==_0x5acf3f['toLowerCase']())if(_0xb124('0x6')!==typeof _0x5acf3f&&_0xb124('0x7')===_0x5acf3f[_0xb124('0xa')]())try{console['info'][_0xb124('0xc')](console,_0x30c005);}catch(_0x34d693){try{console[_0xb124('0x7')](_0x30c005[_0xb124('0xd')]('\x0a'));}catch(_0x2bee36){}}else try{console[_0xb124('0xe')][_0xb124('0xc')](console,_0x30c005);}catch(_0x45e6c6){try{console[_0xb124('0xe')](_0x30c005['join']('\x0a'));}catch(_0x358348){}}else try{console[_0xb124('0x8')][_0xb124('0xc')](console,_0x30c005);}catch(_0x255de9){try{console[_0xb124('0x8')](_0x30c005['join']('\x0a'));}catch(_0x40db43){}}}};_0x4448a1['fn']['qdAmAddNdx']=function(){var _0x3ab6b3=_0x4448a1(this);_0x3ab6b3[_0xb124('0xf')](function(_0x2b980c){_0x4448a1(this)[_0xb124('0x10')](_0xb124('0x11')+_0x2b980c);});_0x3ab6b3[_0xb124('0x12')]()[_0xb124('0x10')](_0xb124('0x13'));_0x3ab6b3[_0xb124('0x14')]()[_0xb124('0x10')](_0xb124('0x15'));return _0x3ab6b3;};_0x4448a1['fn'][_0xb124('0x1')]=function(){};var _0x326009=function(_0x2b391c){var _0x332057={'p':_0xb124('0x16')};return function(_0x449d99){var _0x5f1564,_0x22d8ea,_0x5c02b9,_0x36cccb;_0x22d8ea=function(_0x1fc61a){return _0x1fc61a;};_0x5c02b9=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x449d99=_0x449d99['d'+_0x5c02b9[0x10]+'c'+_0x5c02b9[0x11]+'m'+_0x22d8ea(_0x5c02b9[0x1])+'n'+_0x5c02b9[0xd]]['l'+_0x5c02b9[0x12]+'c'+_0x5c02b9[0x0]+'ti'+_0x22d8ea('o')+'n'];_0x5f1564=function(_0x56cb9d){return escape(encodeURIComponent(_0x56cb9d[_0xb124('0x17')](/\./g,'¨')[_0xb124('0x17')](/[a-zA-Z]/g,function(_0x2b9bda){return String[_0xb124('0x18')](('Z'>=_0x2b9bda?0x5a:0x7a)>=(_0x2b9bda=_0x2b9bda[_0xb124('0x19')](0x0)+0xd)?_0x2b9bda:_0x2b9bda-0x1a);})));};var _0x3d9c1b=_0x5f1564(_0x449d99[[_0x5c02b9[0x9],_0x22d8ea('o'),_0x5c02b9[0xc],_0x5c02b9[_0x22d8ea(0xd)]]['join']('')]);_0x5f1564=_0x5f1564((window[['js',_0x22d8ea('no'),'m',_0x5c02b9[0x1],_0x5c02b9[0x4][_0xb124('0x1a')](),'ite'][_0xb124('0xd')]('')]||_0xb124('0x1b'))+['.v',_0x5c02b9[0xd],'e',_0x22d8ea('x'),'co',_0x22d8ea('mm'),'erc',_0x5c02b9[0x1],'.c',_0x22d8ea('o'),'m.',_0x5c02b9[0x13],'r'][_0xb124('0xd')](''));for(var _0x4f1db9 in _0x332057){if(_0x5f1564===_0x4f1db9+_0x332057[_0x4f1db9]||_0x3d9c1b===_0x4f1db9+_0x332057[_0x4f1db9]){_0x36cccb='tr'+_0x5c02b9[0x11]+'e';break;}_0x36cccb='f'+_0x5c02b9[0x0]+'ls'+_0x22d8ea(_0x5c02b9[0x1])+'';}_0x22d8ea=!0x1;-0x1<_0x449d99[[_0x5c02b9[0xc],'e',_0x5c02b9[0x0],'rc',_0x5c02b9[0x9]]['join']('')]['indexOf'](_0xb124('0x1c'))&&(_0x22d8ea=!0x0);return[_0x36cccb,_0x22d8ea];}(_0x2b391c);}(window);if(!eval(_0x326009[0x0]))return _0x326009[0x1]?_0x281920(_0xb124('0x1d')):!0x1;_0x56a80c=function(_0x19a2f5){var _0x388a7c,_0x39a2db,_0x269818;_0x269818=_0x19a2f5[_0xb124('0x1e')](_0xb124('0x1f'));_0x388a7c=_0x269818[_0xb124('0x20')](_0xb124('0x21'));_0x39a2db=_0x269818[_0xb124('0x20')](_0xb124('0x22'));if(!(_0x388a7c[_0xb124('0x23')]||_0x39a2db[_0xb124('0x23')]))return;_0x388a7c[_0xb124('0x24')]()['addClass'](_0xb124('0x25'));_0x39a2db[_0xb124('0x24')]()['addClass'](_0xb124('0x26'));_0x4448a1['qdAjax']({'url':_0x5ee0d5[_0xb124('0x27')],'dataType':_0xb124('0x28'),'success':function(_0xcbb6f4){var _0x55e221=_0x4448a1(_0xcbb6f4);_0x388a7c[_0xb124('0xf')](function(){var _0x1d4303,_0x332ea8;_0x332ea8=_0x4448a1(this);_0x1d4303=_0x55e221[_0xb124('0x1e')]('img[alt=\x27'+_0x332ea8['attr'](_0xb124('0x29'))+'\x27]');if(!_0x1d4303[_0xb124('0x23')])return;_0x1d4303[_0xb124('0xf')](function(){_0x4448a1(this)[_0xb124('0x0')](_0xb124('0x2a'))[_0xb124('0x2b')]()[_0xb124('0x2c')](_0x332ea8);});_0x332ea8[_0xb124('0x2d')]();})[_0xb124('0x10')](_0xb124('0x2e'));_0x39a2db[_0xb124('0xf')](function(){var _0x17d3e2={},_0x1f0033;_0x1f0033=_0x4448a1(this);_0x55e221[_0xb124('0x1e')]('h2')['each'](function(){if(_0x4448a1(this)[_0xb124('0x2f')]()[_0xb124('0x30')]()[_0xb124('0xa')]()==_0x1f0033['attr']('data-qdam-value')[_0xb124('0x30')]()[_0xb124('0xa')]()){_0x17d3e2=_0x4448a1(this);return![];}});if(!_0x17d3e2[_0xb124('0x23')])return;_0x17d3e2[_0xb124('0xf')](function(){_0x4448a1(this)[_0xb124('0x0')]('[class*=\x27colunas\x27]')[_0xb124('0x2b')]()[_0xb124('0x2c')](_0x1f0033);});_0x1f0033[_0xb124('0x2d')]();})['addClass'](_0xb124('0x2e'));},'error':function(){_0x281920('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27'+_0x5ee0d5['url']+_0xb124('0x31'));},'complete':function(){_0x5ee0d5[_0xb124('0x32')]['call'](this);_0x4448a1(window)[_0xb124('0x33')]('QuatroDigital.am.ajaxCallback',_0x19a2f5);},'clearQueueDelay':0xbb8});};_0x4448a1['QD_amazingMenu']=function(_0x488788){var _0x3bb119=_0x488788[_0xb124('0x1e')](_0xb124('0x34'))['each'](function(){var _0x67f143,_0x40304c,_0x154be4,_0x239352;_0x67f143=_0x4448a1(this);if(!_0x67f143[_0xb124('0x23')])return _0x281920([_0xb124('0x35'),_0x488788],'alerta');_0x67f143[_0xb124('0x1e')](_0xb124('0x36'))[_0xb124('0x24')]()['addClass'](_0xb124('0x37'));_0x67f143[_0xb124('0x1e')]('li')[_0xb124('0xf')](function(){var _0x1d1fbe=_0x4448a1(this),_0x9121b7;_0x9121b7=_0x1d1fbe['children'](_0xb124('0x38'));if(!_0x9121b7['length'])return;_0x1d1fbe[_0xb124('0x10')](_0xb124('0x39')+_0x9121b7['first']()[_0xb124('0x2f')]()[_0xb124('0x30')]()[_0xb124('0x3a')]()['replace'](/\./g,'')[_0xb124('0x17')](/\s/g,'-')[_0xb124('0xa')]());});_0x40304c=_0x67f143[_0xb124('0x1e')](_0xb124('0x3b'))[_0xb124('0x3c')]();_0x67f143[_0xb124('0x10')](_0xb124('0x3d'));_0x154be4=_0x40304c[_0xb124('0x1e')]('>ul');_0x154be4[_0xb124('0xf')](function(){var _0x3464dc=_0x4448a1(this),_0xa5f46b;_0xa5f46b=_0x3464dc[_0xb124('0x1e')](_0xb124('0x3b'))[_0xb124('0x3c')]()['addClass'](_0xb124('0x3e'));_0x3464dc['addClass'](_0xb124('0x3f'));_0x3464dc[_0xb124('0x24')]()[_0xb124('0x10')](_0xb124('0x40'));});_0x154be4[_0xb124('0x10')]('qd-am-dropdown');var _0x5261d1=0x0;var _0x45b3ed=function(_0x2f534c){_0x5261d1=_0x5261d1+0x1;var _0x2a2a20=_0x2f534c[_0xb124('0x41')]('li');var _0x50e0c3=_0x2a2a20['children']('*');if(!_0x50e0c3[_0xb124('0x23')])return;_0x50e0c3[_0xb124('0x10')](_0xb124('0x42')+_0x5261d1);_0x45b3ed(_0x50e0c3);};_0x45b3ed(_0x67f143);_0x67f143[_0xb124('0x43')](_0x67f143[_0xb124('0x1e')]('ul'))[_0xb124('0xf')](function(){var _0x54ed4c=_0x4448a1(this);_0x54ed4c[_0xb124('0x10')]('qd-am-'+_0x54ed4c[_0xb124('0x41')]('li')['length']+_0xb124('0x44'));});});_0x56a80c(_0x3bb119);_0x5ee0d5[_0xb124('0x45')][_0xb124('0x46')](this);_0x4448a1(window)[_0xb124('0x33')](_0xb124('0x47'),_0x488788);};_0x4448a1['fn']['QD_amazingMenu']=function(_0x47cd58){var _0x4cd519=_0x4448a1(this);if(!_0x4cd519['length'])return _0x4cd519;_0x5ee0d5=_0x4448a1['extend']({},_0x4eaded,_0x47cd58);_0x4cd519[_0xb124('0x48')]=new _0x4448a1['QD_amazingMenu'](_0x4448a1(this));return _0x4cd519;};_0x4448a1(function(){_0x4448a1(_0xb124('0x49'))['QD_amazingMenu']();});}(this));

// smart cart
var _0x7dfd=['smartCheckout','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','vtexjs','checkout','SDK','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','find','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','body','removeClass','qd-bb-lightBoxBodyProdAdd','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text','.qd-ddc-shipping\x20.qd-ddc-cep','val','keyup.qd_ddc_cep','formatCepField','.qd-ddc-shipping\x20.qd-ddc-cep-ok','.qd-ddc-cep-btn','click','preventDefault','hide','off','click._QD_DDC_closeShipping','target','.qd-ddc-cep-tooltip','.qd-ddc-cep-ok','shippingCalculate','.qd-ddc-cep','getCartInfoByUrl','mouseleave.qd_ddc_hover','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','html','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','emptyCart','each','call','clone','add','.qd-ddc-infoTotalValue','total','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','.qd-ddc-wrapper','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','addClass','getOrderForm','QD_checkoutQueue','items','totalizers','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','.qd-ddc-prodWrapper2','empty','productCategoryIds','attr','qd-ddc-','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','content','quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','.qd-ddc-shipping\x20input','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','cartIsEmpty','lastSku','filter','[data-sku=\x27','outerHeight','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','timeRemoveNewItemClass','qd-ddc-product-add-time-v2','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','qd-ddc-cart-empty','callbackProductsList\x20não\x20é\x20uma\x20função','forceImageHTTPS','string','http','https','load','qd-loaded','src','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','.qd-ddc-quantity','keyup.qd_ddc_change','click.qd_ddc_remove','stop','slideUp','remove','$1-$2$3','qdDdcLastPostalCode','.qd-ddc-cep-tooltip-text','.qd-dd-cep-slas','logisticsInfo','slas','<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>','shippingEstimate','\x20dia\x20útil','\x20dias\x20útéis','<tr></tr>','price','</td><td>',',\x20entrega\x20em\x20','\x20para\x20o\x20CEP\x20','.qd-ddc-cep-close','Não\x20foi\x20possível\x20calcular\x20o\x20frete','data','boolean','simpleCart','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','fail','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','removeProduct','index','removeItems','done','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','updateOnlyHover','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','allowRecalculate','productId','prod_','prodId','qd-bap-item-added','input.qd-productId[value=','.qd-bap-wrapper','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','.qdDdcContainer','QD_smartCart','selector','dropDown','buyButton','QD_buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','closest','replace','abs','undefined','round','toFixed','split','length','join','_QuatroDigital_CartData','callback','Callbacks','function','error','Oooops!\x20','message','info','warn','object','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','toLowerCase','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','neynoretnznfx%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','toUpperCase','---','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','extend','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','name'];(function(_0x223461,_0x2bca70){var _0x4dbe0a=function(_0x3c3cb6){while(--_0x3c3cb6){_0x223461['push'](_0x223461['shift']());}};_0x4dbe0a(++_0x2bca70);}(_0x7dfd,0x1c2));var _0xd7df=function(_0x3dd15e,_0x1f0015){_0x3dd15e=_0x3dd15e-0x0;var _0x231fd0=_0x7dfd[_0x3dd15e];return _0x231fd0;};(function(_0x42fed7){_0x42fed7['fn'][_0xd7df('0x0')]=_0x42fed7['fn'][_0xd7df('0x1')];}(jQuery));function qd_number_format(_0x2d48e6,_0x346f5f,_0x28c3c9,_0x176418){_0x2d48e6=(_0x2d48e6+'')[_0xd7df('0x2')](/[^0-9+\-Ee.]/g,'');_0x2d48e6=isFinite(+_0x2d48e6)?+_0x2d48e6:0x0;_0x346f5f=isFinite(+_0x346f5f)?Math[_0xd7df('0x3')](_0x346f5f):0x0;_0x176418=_0xd7df('0x4')===typeof _0x176418?',':_0x176418;_0x28c3c9=_0xd7df('0x4')===typeof _0x28c3c9?'.':_0x28c3c9;var _0x39ce98='',_0x39ce98=function(_0x354ea7,_0x16e50){var _0x346f5f=Math['pow'](0xa,_0x16e50);return''+(Math[_0xd7df('0x5')](_0x354ea7*_0x346f5f)/_0x346f5f)[_0xd7df('0x6')](_0x16e50);},_0x39ce98=(_0x346f5f?_0x39ce98(_0x2d48e6,_0x346f5f):''+Math[_0xd7df('0x5')](_0x2d48e6))[_0xd7df('0x7')]('.');0x3<_0x39ce98[0x0]['length']&&(_0x39ce98[0x0]=_0x39ce98[0x0][_0xd7df('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x176418));(_0x39ce98[0x1]||'')['length']<_0x346f5f&&(_0x39ce98[0x1]=_0x39ce98[0x1]||'',_0x39ce98[0x1]+=Array(_0x346f5f-_0x39ce98[0x1][_0xd7df('0x8')]+0x1)['join']('0'));return _0x39ce98[_0xd7df('0x9')](_0x28c3c9);};(function(){try{window[_0xd7df('0xa')]=window[_0xd7df('0xa')]||{},window[_0xd7df('0xa')][_0xd7df('0xb')]=window[_0xd7df('0xa')][_0xd7df('0xb')]||$[_0xd7df('0xc')]();}catch(_0x7ba3c){_0xd7df('0x4')!==typeof console&&_0xd7df('0xd')===typeof console[_0xd7df('0xe')]&&console[_0xd7df('0xe')](_0xd7df('0xf'),_0x7ba3c[_0xd7df('0x10')]);}}());(function(_0x202833){try{var _0x31f557=jQuery,_0x57b8be=function(_0x4c5cf,_0x23cdbc){if('object'===typeof console&&_0xd7df('0x4')!==typeof console[_0xd7df('0xe')]&&'undefined'!==typeof console[_0xd7df('0x11')]&&_0xd7df('0x4')!==typeof console[_0xd7df('0x12')]){var _0x5210e5;_0xd7df('0x13')===typeof _0x4c5cf?(_0x4c5cf[_0xd7df('0x14')](_0xd7df('0x15')),_0x5210e5=_0x4c5cf):_0x5210e5=['[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'+_0x4c5cf];if(_0xd7df('0x4')===typeof _0x23cdbc||_0xd7df('0x16')!==_0x23cdbc[_0xd7df('0x17')]()&&'aviso'!==_0x23cdbc[_0xd7df('0x17')]())if('undefined'!==typeof _0x23cdbc&&_0xd7df('0x11')===_0x23cdbc['toLowerCase']())try{console[_0xd7df('0x11')][_0xd7df('0x18')](console,_0x5210e5);}catch(_0x4eabb8){try{console['info'](_0x5210e5[_0xd7df('0x9')]('\x0a'));}catch(_0x502ae8){}}else try{console[_0xd7df('0xe')][_0xd7df('0x18')](console,_0x5210e5);}catch(_0x40e7af){try{console[_0xd7df('0xe')](_0x5210e5[_0xd7df('0x9')]('\x0a'));}catch(_0xa80cbf){}}else try{console[_0xd7df('0x12')]['apply'](console,_0x5210e5);}catch(_0x5ec728){try{console[_0xd7df('0x12')](_0x5210e5[_0xd7df('0x9')]('\x0a'));}catch(_0x26047f){}}}};window[_0xd7df('0x19')]=window[_0xd7df('0x19')]||{};window[_0xd7df('0x19')][_0xd7df('0x1a')]=!0x0;_0x31f557[_0xd7df('0x1b')]=function(){};_0x31f557['fn'][_0xd7df('0x1b')]=function(){return{'fn':new _0x31f557()};};var _0x5c4d17=function(_0xe53f53){var _0x132fd1={'p':_0xd7df('0x1c')};return function(_0x29f0e8){var _0x29b812=function(_0x2aa5a8){return _0x2aa5a8;};var _0x3f78fa=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x29f0e8=_0x29f0e8['d'+_0x3f78fa[0x10]+'c'+_0x3f78fa[0x11]+'m'+_0x29b812(_0x3f78fa[0x1])+'n'+_0x3f78fa[0xd]]['l'+_0x3f78fa[0x12]+'c'+_0x3f78fa[0x0]+'ti'+_0x29b812('o')+'n'];var _0x36de76=function(_0x5195cf){return escape(encodeURIComponent(_0x5195cf['replace'](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x58584d){return String['fromCharCode'](('Z'>=_0x58584d?0x5a:0x7a)>=(_0x58584d=_0x58584d[_0xd7df('0x1d')](0x0)+0xd)?_0x58584d:_0x58584d-0x1a);})));};var _0x4e87cd=_0x36de76(_0x29f0e8[[_0x3f78fa[0x9],_0x29b812('o'),_0x3f78fa[0xc],_0x3f78fa[_0x29b812(0xd)]][_0xd7df('0x9')]('')]);_0x36de76=_0x36de76((window[['js',_0x29b812('no'),'m',_0x3f78fa[0x1],_0x3f78fa[0x4][_0xd7df('0x1e')](),'ite'][_0xd7df('0x9')]('')]||_0xd7df('0x1f'))+['.v',_0x3f78fa[0xd],'e',_0x29b812('x'),'co',_0x29b812('mm'),'erc',_0x3f78fa[0x1],'.c',_0x29b812('o'),'m.',_0x3f78fa[0x13],'r'][_0xd7df('0x9')](''));for(var _0x4c01d9 in _0x132fd1){if(_0x36de76===_0x4c01d9+_0x132fd1[_0x4c01d9]||_0x4e87cd===_0x4c01d9+_0x132fd1[_0x4c01d9]){var _0x125e04='tr'+_0x3f78fa[0x11]+'e';break;}_0x125e04='f'+_0x3f78fa[0x0]+'ls'+_0x29b812(_0x3f78fa[0x1])+'';}_0x29b812=!0x1;-0x1<_0x29f0e8[[_0x3f78fa[0xc],'e',_0x3f78fa[0x0],'rc',_0x3f78fa[0x9]][_0xd7df('0x9')]('')][_0xd7df('0x20')](_0xd7df('0x21'))&&(_0x29b812=!0x0);return[_0x125e04,_0x29b812];}(_0xe53f53);}(window);if(!eval(_0x5c4d17[0x0]))return _0x5c4d17[0x1]?_0x57b8be('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x31f557[_0xd7df('0x1b')]=function(_0x149813,_0x1c0e61){var _0x1d81b2=_0x31f557(_0x149813);if(!_0x1d81b2[_0xd7df('0x8')])return _0x1d81b2;var _0x4cecf2=_0x31f557[_0xd7df('0x22')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0xd7df('0x23'),'linkCheckout':_0xd7df('0x24'),'cartTotal':_0xd7df('0x25'),'emptyCart':_0xd7df('0x26'),'continueShopping':'Continuar\x20Comprando','shippingForm':'<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'forceImageHTTPS':!0x1,'skuName':function(_0x4051fb){return _0x4051fb['skuName']||_0x4051fb[_0xd7df('0x27')];},'callback':function(){},'callbackProductsList':function(){}},_0x1c0e61);_0x31f557('');var _0xab3dd8=this;if(_0x4cecf2[_0xd7df('0x28')]){var _0x1417eb=!0x1;'undefined'===typeof window['vtexjs']&&(_0x57b8be('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN'),_0x31f557[_0xd7df('0x29')]({'url':_0xd7df('0x2a'),'async':!0x1,'dataType':'script','error':function(){_0x57b8be(_0xd7df('0x2b'));_0x1417eb=!0x0;}}));if(_0x1417eb)return _0x57b8be(_0xd7df('0x2c'));}if(_0xd7df('0x13')===typeof window[_0xd7df('0x2d')]&&'undefined'!==typeof window[_0xd7df('0x2d')][_0xd7df('0x2e')])var _0x202833=window[_0xd7df('0x2d')]['checkout'];else if(_0xd7df('0x13')===typeof vtex&&_0xd7df('0x13')===typeof vtex[_0xd7df('0x2e')]&&'undefined'!==typeof vtex[_0xd7df('0x2e')][_0xd7df('0x2f')])_0x202833=new vtex[(_0xd7df('0x2e'))][(_0xd7df('0x2f'))]();else return _0x57b8be('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0xab3dd8[_0xd7df('0x30')]=_0xd7df('0x31');var _0x2314e6=function(_0x4f6286){_0x31f557(this)[_0xd7df('0x32')](_0x4f6286);_0x4f6286[_0xd7df('0x33')](_0xd7df('0x34'))['add'](_0x31f557(_0xd7df('0x35')))['on'](_0xd7df('0x36'),function(){_0x1d81b2['removeClass']('qd-bb-lightBoxProdAdd');_0x31f557(document[_0xd7df('0x37')])[_0xd7df('0x38')](_0xd7df('0x39'));});_0x31f557(document)['off']('keyup.qd_ddc_closeFn')['on'](_0xd7df('0x3a'),function(_0x4ebdbe){0x1b==_0x4ebdbe[_0xd7df('0x3b')]&&(_0x1d81b2['removeClass']('qd-bb-lightBoxProdAdd'),_0x31f557(document[_0xd7df('0x37')])['removeClass'](_0xd7df('0x39')));});var _0x5302f4=_0x4f6286[_0xd7df('0x33')](_0xd7df('0x3c'));_0x4f6286[_0xd7df('0x33')](_0xd7df('0x3d'))['on'](_0xd7df('0x3e'),function(){_0xab3dd8[_0xd7df('0x3f')]('-',void 0x0,void 0x0,_0x5302f4);return!0x1;});_0x4f6286[_0xd7df('0x33')]('.qd-ddc-scrollDown')['on'](_0xd7df('0x40'),function(){_0xab3dd8['scrollCart'](void 0x0,void 0x0,void 0x0,_0x5302f4);return!0x1;});var _0x1d2330=_0x4f6286[_0xd7df('0x33')](_0xd7df('0x41'));_0x4f6286[_0xd7df('0x33')](_0xd7df('0x42'))[_0xd7df('0x43')]('')['on'](_0xd7df('0x44'),function(_0x38056b){_0xab3dd8[_0xd7df('0x45')](_0x31f557(this));0xd==_0x38056b['keyCode']&&_0x4f6286[_0xd7df('0x33')](_0xd7df('0x46'))['click']();});_0x4f6286['find'](_0xd7df('0x47'))[_0xd7df('0x48')](function(_0x2e9878){_0x2e9878['preventDefault']();_0x1d2330['toggle']();});_0x4f6286[_0xd7df('0x33')]('.qd-ddc-cep-close')[_0xd7df('0x48')](function(_0x15ba45){_0x15ba45[_0xd7df('0x49')]();_0x1d2330[_0xd7df('0x4a')]();});_0x31f557(document)[_0xd7df('0x4b')](_0xd7df('0x4c'))['on'](_0xd7df('0x4c'),function(_0x384007){_0x31f557(_0x384007[_0xd7df('0x4d')])[_0xd7df('0x1')](_0x4f6286[_0xd7df('0x33')](_0xd7df('0x4e')))['length']||_0x1d2330[_0xd7df('0x4a')]();});_0x4f6286[_0xd7df('0x33')](_0xd7df('0x4f'))[_0xd7df('0x48')](function(_0x215251){_0x215251['preventDefault']();_0xab3dd8[_0xd7df('0x50')](_0x4f6286[_0xd7df('0x33')](_0xd7df('0x51')));});if(_0x4cecf2['updateOnlyHover']){var _0x1c0e61=0x0;_0x31f557(this)['on']('mouseenter.qd_ddc_hover',function(){var _0x4f6286=function(){window[_0xd7df('0x19')][_0xd7df('0x1a')]&&(_0xab3dd8[_0xd7df('0x52')](),window[_0xd7df('0x19')]['allowUpdate']=!0x1,_0x31f557['fn']['simpleCart'](!0x0),_0xab3dd8['cartIsEmpty']());};_0x1c0e61=setInterval(function(){_0x4f6286();},0x258);_0x4f6286();});_0x31f557(this)['on'](_0xd7df('0x53'),function(){clearInterval(_0x1c0e61);});}};var _0x4a6cf5=function(_0x12c2b8){_0x12c2b8=_0x31f557(_0x12c2b8);_0x4cecf2[_0xd7df('0x54')][_0xd7df('0x55')]=_0x4cecf2[_0xd7df('0x54')][_0xd7df('0x55')][_0xd7df('0x2')](_0xd7df('0x56'),_0xd7df('0x57'));_0x4cecf2[_0xd7df('0x54')][_0xd7df('0x55')]=_0x4cecf2[_0xd7df('0x54')][_0xd7df('0x55')][_0xd7df('0x2')](_0xd7df('0x58'),_0xd7df('0x59'));_0x4cecf2[_0xd7df('0x54')]['cartTotal']=_0x4cecf2[_0xd7df('0x54')][_0xd7df('0x55')]['replace']('#shipping',_0xd7df('0x5a'));_0x4cecf2['texts'][_0xd7df('0x55')]=_0x4cecf2['texts'][_0xd7df('0x55')][_0xd7df('0x2')](_0xd7df('0x5b'),'<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0x12c2b8['find']('.qd-ddc-viewCart')[_0xd7df('0x5c')](_0x4cecf2[_0xd7df('0x54')][_0xd7df('0x5d')]);_0x12c2b8[_0xd7df('0x33')](_0xd7df('0x5e'))[_0xd7df('0x5c')](_0x4cecf2['texts'][_0xd7df('0x5f')]);_0x12c2b8[_0xd7df('0x33')](_0xd7df('0x60'))[_0xd7df('0x5c')](_0x4cecf2[_0xd7df('0x54')][_0xd7df('0x61')]);_0x12c2b8[_0xd7df('0x33')](_0xd7df('0x62'))[_0xd7df('0x5c')](_0x4cecf2[_0xd7df('0x54')][_0xd7df('0x55')]);_0x12c2b8[_0xd7df('0x33')](_0xd7df('0x63'))[_0xd7df('0x5c')](_0x4cecf2[_0xd7df('0x54')][_0xd7df('0x64')]);_0x12c2b8[_0xd7df('0x33')](_0xd7df('0x65'))[_0xd7df('0x5c')](_0x4cecf2[_0xd7df('0x54')][_0xd7df('0x66')]);return _0x12c2b8;}(this[_0xd7df('0x30')]);var _0x8d7273=0x0;_0x1d81b2[_0xd7df('0x67')](function(){0x0<_0x8d7273?_0x2314e6[_0xd7df('0x68')](this,_0x4a6cf5[_0xd7df('0x69')]()):_0x2314e6['call'](this,_0x4a6cf5);_0x8d7273++;});window['_QuatroDigital_CartData'][_0xd7df('0xb')][_0xd7df('0x6a')](function(){_0x31f557(_0xd7df('0x6b'))['html'](window[_0xd7df('0xa')][_0xd7df('0x6c')]||'--');_0x31f557(_0xd7df('0x6d'))[_0xd7df('0x5c')](window['_QuatroDigital_CartData'][_0xd7df('0x6e')]||'0');_0x31f557(_0xd7df('0x6f'))[_0xd7df('0x5c')](window[_0xd7df('0xa')][_0xd7df('0x70')]||'--');_0x31f557(_0xd7df('0x71'))[_0xd7df('0x5c')](window[_0xd7df('0xa')]['allTotal']||'--');});var _0x1480cb=function(_0x2c5556,_0x5072fe){if('undefined'===typeof _0x2c5556['items'])return _0x57b8be(_0xd7df('0x72'));_0xab3dd8[_0xd7df('0x73')][_0xd7df('0x68')](this,_0x5072fe);};_0xab3dd8[_0xd7df('0x52')]=function(_0x4d9db8,_0xc4e884){_0xd7df('0x4')!=typeof _0xc4e884?window[_0xd7df('0x19')][_0xd7df('0x74')]=_0xc4e884:window[_0xd7df('0x19')][_0xd7df('0x74')]&&(_0xc4e884=window[_0xd7df('0x19')]['dataOptionsCache']);setTimeout(function(){window['_QuatroDigital_DropDown'][_0xd7df('0x74')]=void 0x0;},_0x4cecf2['timeRemoveNewItemClass']);_0x31f557(_0xd7df('0x75'))[_0xd7df('0x38')](_0xd7df('0x76'));if(_0x4cecf2['smartCheckout']){var _0x4ebe31=function(_0x3e5546){window[_0xd7df('0x19')]['getOrderForm']=_0x3e5546;_0x1480cb(_0x3e5546,_0xc4e884);_0xd7df('0x4')!==typeof window[_0xd7df('0x77')]&&'function'===typeof window[_0xd7df('0x77')][_0xd7df('0x78')]&&window['_QuatroDigital_AmountProduct'][_0xd7df('0x78')][_0xd7df('0x68')](this);_0x31f557(_0xd7df('0x75'))[_0xd7df('0x79')](_0xd7df('0x76'));};_0xd7df('0x4')!==typeof window[_0xd7df('0x19')][_0xd7df('0x7a')]?(_0x4ebe31(window[_0xd7df('0x19')]['getOrderForm']),'function'===typeof _0x4d9db8&&_0x4d9db8(window[_0xd7df('0x19')][_0xd7df('0x7a')])):_0x31f557[_0xd7df('0x7b')]([_0xd7df('0x7c'),_0xd7df('0x7d'),_0xd7df('0x7e')],{'done':function(_0x163813){_0x4ebe31[_0xd7df('0x68')](this,_0x163813);_0xd7df('0xd')===typeof _0x4d9db8&&_0x4d9db8(_0x163813);},'fail':function(_0x48198a){_0x57b8be([_0xd7df('0x7f'),_0x48198a]);}});}else alert(_0xd7df('0x80'));};_0xab3dd8['cartIsEmpty']=function(){var _0xb80762=_0x31f557(_0xd7df('0x75'));_0xb80762[_0xd7df('0x33')](_0xd7df('0x81'))['length']?_0xb80762['removeClass']('qd-ddc-noItems'):_0xb80762[_0xd7df('0x79')]('qd-ddc-noItems');};_0xab3dd8[_0xd7df('0x73')]=function(_0x2b1b30){var _0x1c0e61=_0x31f557(_0xd7df('0x82'));_0x1c0e61[_0xd7df('0x83')]();_0x1c0e61[_0xd7df('0x67')](function(){var _0x1c0e61=_0x31f557(this),_0x11c88c,_0xa5b512,_0x1ea1ed=_0x31f557(''),_0x5d8c37;for(_0x5d8c37 in window[_0xd7df('0x19')][_0xd7df('0x7a')]['items'])if(_0xd7df('0x13')===typeof window[_0xd7df('0x19')][_0xd7df('0x7a')][_0xd7df('0x7c')][_0x5d8c37]){var _0x1d122a=window[_0xd7df('0x19')][_0xd7df('0x7a')]['items'][_0x5d8c37];var _0x149813=_0x1d122a[_0xd7df('0x84')][_0xd7df('0x2')](/^\/|\/$/g,'')[_0xd7df('0x7')]('/');var _0x5a8270=_0x31f557('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0x5a8270[_0xd7df('0x85')]({'data-sku':_0x1d122a['id'],'data-sku-index':_0x5d8c37,'data-qd-departament':_0x149813[0x0],'data-qd-category':_0x149813[_0x149813[_0xd7df('0x8')]-0x1]});_0x5a8270[_0xd7df('0x79')](_0xd7df('0x86')+_0x1d122a[_0xd7df('0x87')]);_0x5a8270['find'](_0xd7df('0x88'))['append'](_0x4cecf2['skuName'](_0x1d122a));_0x5a8270[_0xd7df('0x33')](_0xd7df('0x89'))[_0xd7df('0x32')](isNaN(_0x1d122a[_0xd7df('0x8a')])?_0x1d122a[_0xd7df('0x8a')]:0x0==_0x1d122a[_0xd7df('0x8a')]?'Grátis':(_0x31f557('meta[name=currency]')[_0xd7df('0x85')](_0xd7df('0x8b'))||'R$')+'\x20'+qd_number_format(_0x1d122a[_0xd7df('0x8a')]/0x64,0x2,',','.'));_0x5a8270[_0xd7df('0x33')]('.qd-ddc-quantity')[_0xd7df('0x85')]({'data-sku':_0x1d122a['id'],'data-sku-index':_0x5d8c37})['val'](_0x1d122a[_0xd7df('0x8c')]);_0x5a8270['find'](_0xd7df('0x8d'))[_0xd7df('0x85')]({'data-sku':_0x1d122a['id'],'data-sku-index':_0x5d8c37});_0xab3dd8[_0xd7df('0x8e')](_0x1d122a['id'],_0x5a8270[_0xd7df('0x33')](_0xd7df('0x8f')),_0x1d122a[_0xd7df('0x90')]);_0x5a8270['find'](_0xd7df('0x91'))['attr']({'data-sku':_0x1d122a['id'],'data-sku-index':_0x5d8c37});_0x5a8270[_0xd7df('0x92')](_0x1c0e61);_0x1ea1ed=_0x1ea1ed[_0xd7df('0x6a')](_0x5a8270);}try{var _0x320637=_0x1c0e61[_0xd7df('0x0')]('.qd-ddc-wrapper')[_0xd7df('0x33')](_0xd7df('0x93'));_0x320637[_0xd7df('0x8')]&&''==_0x320637[_0xd7df('0x43')]()&&window[_0xd7df('0x19')][_0xd7df('0x7a')][_0xd7df('0x7e')][_0xd7df('0x94')]&&_0x320637[_0xd7df('0x43')](window[_0xd7df('0x19')][_0xd7df('0x7a')][_0xd7df('0x7e')]['address'][_0xd7df('0x95')]);}catch(_0x3e4e89){_0x57b8be(_0xd7df('0x96')+_0x3e4e89['message'],'aviso');}_0xab3dd8[_0xd7df('0x97')](_0x1c0e61);_0xab3dd8[_0xd7df('0x98')]();_0x2b1b30&&_0x2b1b30[_0xd7df('0x99')]&&function(){_0xa5b512=_0x1ea1ed[_0xd7df('0x9a')](_0xd7df('0x9b')+_0x2b1b30[_0xd7df('0x99')]+'\x27]');_0xa5b512[_0xd7df('0x8')]&&(_0x11c88c=0x0,_0x1ea1ed[_0xd7df('0x67')](function(){var _0x2b1b30=_0x31f557(this);if(_0x2b1b30['is'](_0xa5b512))return!0x1;_0x11c88c+=_0x2b1b30[_0xd7df('0x9c')]();}),_0xab3dd8['scrollCart'](void 0x0,void 0x0,_0x11c88c,_0x1c0e61[_0xd7df('0x6a')](_0x1c0e61[_0xd7df('0x9d')]())),_0x1ea1ed[_0xd7df('0x38')](_0xd7df('0x9e')),function(_0x1c5fdb){_0x1c5fdb[_0xd7df('0x79')]('qd-ddc-lastAdded');_0x1c5fdb['addClass'](_0xd7df('0x9e'));setTimeout(function(){_0x1c5fdb[_0xd7df('0x38')](_0xd7df('0x9f'));},_0x4cecf2[_0xd7df('0xa0')]);}(_0xa5b512),_0x31f557(document[_0xd7df('0x37')])['addClass'](_0xd7df('0xa1')),setTimeout(function(){_0x31f557(document[_0xd7df('0x37')])[_0xd7df('0x38')](_0xd7df('0xa1'));},_0x4cecf2[_0xd7df('0xa0')]));}();});(function(){_QuatroDigital_DropDown[_0xd7df('0x7a')][_0xd7df('0x7c')]['length']?(_0x31f557(_0xd7df('0x37'))['removeClass']('qd-ddc-cart-empty')[_0xd7df('0x79')](_0xd7df('0xa2')),setTimeout(function(){_0x31f557(_0xd7df('0x37'))['removeClass'](_0xd7df('0xa3'));},_0x4cecf2['timeRemoveNewItemClass'])):_0x31f557('body')[_0xd7df('0x38')](_0xd7df('0xa4'))[_0xd7df('0x79')](_0xd7df('0xa5'));}());_0xd7df('0xd')===typeof _0x4cecf2['callbackProductsList']?_0x4cecf2['callbackProductsList'][_0xd7df('0x68')](this):_0x57b8be(_0xd7df('0xa6'));};_0xab3dd8[_0xd7df('0x8e')]=function(_0xe98090,_0xf9c3bc,_0xc447e8){function _0x1f4f41(){_0x4cecf2[_0xd7df('0xa7')]&&_0xd7df('0xa8')==typeof _0xc447e8&&(_0xc447e8=_0xc447e8[_0xd7df('0x2')](_0xd7df('0xa9'),_0xd7df('0xaa')));_0xf9c3bc[_0xd7df('0x38')]('qd-loaded')[_0xd7df('0xab')](function(){_0x31f557(this)[_0xd7df('0x79')](_0xd7df('0xac'));})['attr'](_0xd7df('0xad'),_0xc447e8);}_0xc447e8?_0x1f4f41():isNaN(_0xe98090)?_0x57b8be('Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU',_0xd7df('0x16')):alert(_0xd7df('0xae'));};_0xab3dd8['actionButtons']=function(_0x408f92){var _0x1c0e61=function(_0xe408bc,_0x305989){var _0xb8b023=_0x31f557(_0xe408bc);var _0x493955=_0xb8b023[_0xd7df('0x85')](_0xd7df('0xaf'));var _0x149813=_0xb8b023['attr'](_0xd7df('0xb0'));if(_0x493955){var _0x3ddd4c=parseInt(_0xb8b023['val']())||0x1;_0xab3dd8['changeQantity']([_0x493955,_0x149813],_0x3ddd4c,_0x3ddd4c+0x1,function(_0xb8552a){_0xb8b023[_0xd7df('0x43')](_0xb8552a);_0xd7df('0xd')===typeof _0x305989&&_0x305989();});}};var _0x13f57f=function(_0x3d789b,_0x2938b6){var _0x1c0e61=_0x31f557(_0x3d789b);var _0x513774=_0x1c0e61[_0xd7df('0x85')](_0xd7df('0xaf'));var _0x5568bd=_0x1c0e61[_0xd7df('0x85')]('data-sku-index');if(_0x513774){var _0x149813=parseInt(_0x1c0e61[_0xd7df('0x43')]())||0x2;_0xab3dd8[_0xd7df('0xb1')]([_0x513774,_0x5568bd],_0x149813,_0x149813-0x1,function(_0x4636a7){_0x1c0e61[_0xd7df('0x43')](_0x4636a7);_0xd7df('0xd')===typeof _0x2938b6&&_0x2938b6();});}};var _0x59a29e=function(_0x201cb2,_0x5c69d0){var _0x44125a=_0x31f557(_0x201cb2);var _0x451571=_0x44125a[_0xd7df('0x85')](_0xd7df('0xaf'));var _0x149813=_0x44125a[_0xd7df('0x85')](_0xd7df('0xb0'));if(_0x451571){var _0x34ed5d=parseInt(_0x44125a['val']())||0x1;_0xab3dd8[_0xd7df('0xb1')]([_0x451571,_0x149813],0x1,_0x34ed5d,function(_0x5407b3){_0x44125a[_0xd7df('0x43')](_0x5407b3);_0xd7df('0xd')===typeof _0x5c69d0&&_0x5c69d0();});}};var _0x149813=_0x408f92[_0xd7df('0x33')](_0xd7df('0xb2'));_0x149813[_0xd7df('0x79')](_0xd7df('0xb3'))[_0xd7df('0x67')](function(){var _0x408f92=_0x31f557(this);_0x408f92[_0xd7df('0x33')](_0xd7df('0xb4'))['on'](_0xd7df('0xb5'),function(_0x3d6e4c){_0x3d6e4c['preventDefault']();_0x149813[_0xd7df('0x79')]('qd-loading');_0x1c0e61(_0x408f92['find']('.qd-ddc-quantity'),function(){_0x149813[_0xd7df('0x38')](_0xd7df('0xb6'));});});_0x408f92[_0xd7df('0x33')](_0xd7df('0xb7'))['on'](_0xd7df('0xb8'),function(_0xac457c){_0xac457c['preventDefault']();_0x149813[_0xd7df('0x79')](_0xd7df('0xb6'));_0x13f57f(_0x408f92[_0xd7df('0x33')](_0xd7df('0xb9')),function(){_0x149813[_0xd7df('0x38')](_0xd7df('0xb6'));});});_0x408f92['find'](_0xd7df('0xb9'))['on']('focusout.qd_ddc_change',function(){_0x149813[_0xd7df('0x79')](_0xd7df('0xb6'));_0x59a29e(this,function(){_0x149813['removeClass'](_0xd7df('0xb6'));});});_0x408f92['find'](_0xd7df('0xb9'))['on'](_0xd7df('0xba'),function(_0x1622b4){0xd==_0x1622b4[_0xd7df('0x3b')]&&(_0x149813[_0xd7df('0x79')](_0xd7df('0xb6')),_0x59a29e(this,function(){_0x149813['removeClass'](_0xd7df('0xb6'));}));});});_0x408f92[_0xd7df('0x33')]('.qd-ddc-prodRow')[_0xd7df('0x67')](function(){var _0x408f92=_0x31f557(this);_0x408f92[_0xd7df('0x33')](_0xd7df('0x8d'))['on'](_0xd7df('0xbb'),function(){_0x408f92[_0xd7df('0x79')](_0xd7df('0xb6'));_0xab3dd8['removeProduct'](_0x31f557(this),function(_0x2b5f7c){_0x2b5f7c?_0x408f92[_0xd7df('0xbc')](!0x0)[_0xd7df('0xbd')](function(){_0x408f92[_0xd7df('0xbe')]();_0xab3dd8[_0xd7df('0x98')]();}):_0x408f92[_0xd7df('0x38')](_0xd7df('0xb6'));});return!0x1;});});};_0xab3dd8['formatCepField']=function(_0x3ca4e8){var _0x393439=_0x3ca4e8[_0xd7df('0x43')]();_0x393439=_0x393439['replace'](/[^0-9\-]/g,'');_0x393439=_0x393439['replace'](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0xd7df('0xbf'));_0x393439=_0x393439[_0xd7df('0x2')](/(.{9}).*/g,'$1');_0x3ca4e8[_0xd7df('0x43')](_0x393439);};_0xab3dd8['shippingCalculate']=function(_0x65aecc){var _0x93a426=_0x65aecc[_0xd7df('0x43')]();0x9<=_0x93a426['length']&&(_0x65aecc['data'](_0xd7df('0xc0'))!=_0x93a426&&_0x202833['calculateShipping']({'postalCode':_0x93a426,'country':'BRA'})['done'](function(_0x5c8d67){_0x65aecc[_0xd7df('0x1')](_0xd7df('0xc1'))[_0xd7df('0x33')](_0xd7df('0xc2'))[_0xd7df('0xbe')]();window[_0xd7df('0x19')][_0xd7df('0x7a')]=_0x5c8d67;_0xab3dd8[_0xd7df('0x52')]();_0x5c8d67=_0x5c8d67[_0xd7df('0x7e')][_0xd7df('0xc3')][0x0][_0xd7df('0xc4')];for(var _0x149813=_0x31f557(_0xd7df('0xc5')),_0x115b9e=0x0;_0x115b9e<_0x5c8d67[_0xd7df('0x8')];_0x115b9e++){var _0x1c8e25=_0x5c8d67[_0x115b9e],_0x4d7c02=0x1<_0x1c8e25['shippingEstimate']?_0x1c8e25[_0xd7df('0xc6')][_0xd7df('0x2')]('bd',_0xd7df('0xc7')):_0x1c8e25['shippingEstimate']['replace']('bd',_0xd7df('0xc8')),_0x2c23d0=_0x31f557(_0xd7df('0xc9'));_0x2c23d0[_0xd7df('0x32')]('<td>\x20R$\x20'+qd_number_format(_0x1c8e25[_0xd7df('0xca')]/0x64,0x2,',','.')+_0xd7df('0xcb')+_0x1c8e25['name']+_0xd7df('0xcc')+_0x4d7c02+_0xd7df('0xcd')+_0x93a426+'</td>');_0x2c23d0[_0xd7df('0x92')](_0x149813['find']('tbody'));}_0x149813['insertBefore'](_0x65aecc[_0xd7df('0x1')](_0xd7df('0xc1'))['find'](_0xd7df('0xce')));})['fail'](function(_0x1e6927){_0x57b8be([_0xd7df('0xcf'),_0x1e6927]);updateCartData();}),_0x65aecc[_0xd7df('0xd0')]('qdDdcLastPostalCode',_0x93a426));};_0xab3dd8[_0xd7df('0xb1')]=function(_0xe5924a,_0x40b88b,_0x246b97,_0x45fbb1){function _0x460084(_0xe8bfad){_0xe8bfad=_0xd7df('0xd1')!==typeof _0xe8bfad?!0x1:_0xe8bfad;_0xab3dd8['getCartInfoByUrl']();window['_QuatroDigital_DropDown'][_0xd7df('0x1a')]=!0x1;_0xab3dd8['cartIsEmpty']();'undefined'!==typeof window[_0xd7df('0x77')]&&_0xd7df('0xd')===typeof window[_0xd7df('0x77')][_0xd7df('0x78')]&&window[_0xd7df('0x77')]['exec'][_0xd7df('0x68')](this);_0xd7df('0xd')===typeof adminCart&&adminCart();_0x31f557['fn'][_0xd7df('0xd2')](!0x0,void 0x0,_0xe8bfad);_0xd7df('0xd')===typeof _0x45fbb1&&_0x45fbb1(_0x40b88b);}_0x246b97=_0x246b97||0x1;if(0x1>_0x246b97)return _0x40b88b;if(_0x4cecf2[_0xd7df('0x28')]){if(_0xd7df('0x4')===typeof window[_0xd7df('0x19')][_0xd7df('0x7a')]['items'][_0xe5924a[0x1]])return _0x57b8be(_0xd7df('0xd3')+_0xe5924a[0x1]+']'),_0x40b88b;window[_0xd7df('0x19')][_0xd7df('0x7a')][_0xd7df('0x7c')][_0xe5924a[0x1]]['quantity']=_0x246b97;window['_QuatroDigital_DropDown'][_0xd7df('0x7a')][_0xd7df('0x7c')][_0xe5924a[0x1]]['index']=_0xe5924a[0x1];_0x202833['updateItems']([window[_0xd7df('0x19')]['getOrderForm'][_0xd7df('0x7c')][_0xe5924a[0x1]]],[_0xd7df('0x7c'),'totalizers',_0xd7df('0x7e')])['done'](function(_0x308627){window[_0xd7df('0x19')][_0xd7df('0x7a')]=_0x308627;_0x460084(!0x0);})[_0xd7df('0xd4')](function(_0x2e7068){_0x57b8be([_0xd7df('0xd5'),_0x2e7068]);_0x460084();});}else _0x57b8be(_0xd7df('0xd6'));};_0xab3dd8[_0xd7df('0xd7')]=function(_0x597ed4,_0x4d0242){function _0x7953db(_0x456a96){_0x456a96=_0xd7df('0xd1')!==typeof _0x456a96?!0x1:_0x456a96;'undefined'!==typeof window['_QuatroDigital_AmountProduct']&&_0xd7df('0xd')===typeof window[_0xd7df('0x77')][_0xd7df('0x78')]&&window['_QuatroDigital_AmountProduct'][_0xd7df('0x78')][_0xd7df('0x68')](this);_0xd7df('0xd')===typeof adminCart&&adminCart();_0x31f557['fn']['simpleCart'](!0x0,void 0x0,_0x456a96);_0xd7df('0xd')===typeof _0x4d0242&&_0x4d0242(_0xd34681);}var _0xd34681=!0x1,_0x149813=_0x31f557(_0x597ed4)[_0xd7df('0x85')](_0xd7df('0xb0'));if(_0x4cecf2[_0xd7df('0x28')]){if('undefined'===typeof window['_QuatroDigital_DropDown']['getOrderForm'][_0xd7df('0x7c')][_0x149813])return _0x57b8be(_0xd7df('0xd3')+_0x149813+']'),_0xd34681;window[_0xd7df('0x19')][_0xd7df('0x7a')]['items'][_0x149813][_0xd7df('0xd8')]=_0x149813;_0x202833[_0xd7df('0xd9')]([window['_QuatroDigital_DropDown'][_0xd7df('0x7a')]['items'][_0x149813]],[_0xd7df('0x7c'),_0xd7df('0x7d'),_0xd7df('0x7e')])[_0xd7df('0xda')](function(_0xda7b00){_0xd34681=!0x0;window['_QuatroDigital_DropDown']['getOrderForm']=_0xda7b00;_0x1480cb(_0xda7b00);_0x7953db(!0x0);})[_0xd7df('0xd4')](function(_0x2b17df){_0x57b8be([_0xd7df('0xdb'),_0x2b17df]);_0x7953db();});}else alert('Atenção,\x20este\x20método\x20esta\x20descontinuado.');};_0xab3dd8[_0xd7df('0x3f')]=function(_0x5cacda,_0x1b5bc1,_0x2dddc3,_0x5479dc){_0x5479dc=_0x5479dc||_0x31f557(_0xd7df('0xdc'));_0x5cacda=_0x5cacda||'+';_0x1b5bc1=_0x1b5bc1||0.9*_0x5479dc[_0xd7df('0xdd')]();_0x5479dc['stop'](!0x0,!0x0)[_0xd7df('0xde')]({'scrollTop':isNaN(_0x2dddc3)?_0x5cacda+'='+_0x1b5bc1+'px':_0x2dddc3});};_0x4cecf2[_0xd7df('0xdf')]||(_0xab3dd8['getCartInfoByUrl'](),_0x31f557['fn']['simpleCart'](!0x0));_0x31f557(window)['on']('productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex',function(){try{window[_0xd7df('0x19')][_0xd7df('0x7a')]=void 0x0,_0xab3dd8[_0xd7df('0x52')]();}catch(_0x30a505){_0x57b8be(_0xd7df('0xe0')+_0x30a505[_0xd7df('0x10')],_0xd7df('0xe1'));}});'function'===typeof _0x4cecf2['callback']?_0x4cecf2['callback'][_0xd7df('0x68')](this):_0x57b8be('Callback\x20não\x20é\x20uma\x20função');};_0x31f557['fn'][_0xd7df('0x1b')]=function(_0x30b3d5){var _0x5d5035=_0x31f557(this);_0x5d5035['fn']=new _0x31f557[(_0xd7df('0x1b'))](this,_0x30b3d5);return _0x5d5035;};}catch(_0x6ce055){_0xd7df('0x4')!==typeof console&&_0xd7df('0xd')===typeof console[_0xd7df('0xe')]&&console['error'](_0xd7df('0xf'),_0x6ce055);}}(this));(function(_0x54c13d){try{var _0x5c3b68=jQuery;window[_0xd7df('0x77')]=window['_QuatroDigital_AmountProduct']||{};window['_QuatroDigital_AmountProduct'][_0xd7df('0x7c')]={};window['_QuatroDigital_AmountProduct'][_0xd7df('0xe2')]=!0x1;window['_QuatroDigital_AmountProduct']['buyButtonClicked']=!0x1;window[_0xd7df('0x77')]['quickViewUpdate']=!0x1;var _0x36f7d4=function(){if(window[_0xd7df('0x77')]['allowRecalculate']){var _0x3b8455=!0x1;var _0x21566f={};window[_0xd7df('0x77')][_0xd7df('0x7c')]={};for(_0x5a1549 in window['_QuatroDigital_DropDown'][_0xd7df('0x7a')][_0xd7df('0x7c')])if(_0xd7df('0x13')===typeof window['_QuatroDigital_DropDown']['getOrderForm'][_0xd7df('0x7c')][_0x5a1549]){var _0x5b46e4=window[_0xd7df('0x19')][_0xd7df('0x7a')][_0xd7df('0x7c')][_0x5a1549];'undefined'!==typeof _0x5b46e4[_0xd7df('0xe3')]&&null!==_0x5b46e4[_0xd7df('0xe3')]&&''!==_0x5b46e4[_0xd7df('0xe3')]&&(window[_0xd7df('0x77')]['items'][_0xd7df('0xe4')+_0x5b46e4[_0xd7df('0xe3')]]=window[_0xd7df('0x77')][_0xd7df('0x7c')][_0xd7df('0xe4')+_0x5b46e4[_0xd7df('0xe3')]]||{},window['_QuatroDigital_AmountProduct'][_0xd7df('0x7c')]['prod_'+_0x5b46e4[_0xd7df('0xe3')]][_0xd7df('0xe5')]=_0x5b46e4[_0xd7df('0xe3')],_0x21566f['prod_'+_0x5b46e4[_0xd7df('0xe3')]]||(window[_0xd7df('0x77')]['items'][_0xd7df('0xe4')+_0x5b46e4['productId']][_0xd7df('0x6e')]=0x0),window[_0xd7df('0x77')][_0xd7df('0x7c')][_0xd7df('0xe4')+_0x5b46e4[_0xd7df('0xe3')]][_0xd7df('0x6e')]+=_0x5b46e4[_0xd7df('0x8c')],_0x3b8455=!0x0,_0x21566f[_0xd7df('0xe4')+_0x5b46e4[_0xd7df('0xe3')]]=!0x0);}var _0x5a1549=_0x3b8455;}else _0x5a1549=void 0x0;window[_0xd7df('0x77')]['allowRecalculate']&&(_0x5c3b68('.qd-bap-wrapper')['remove'](),_0x5c3b68('.qd-bap-item-added')[_0xd7df('0x38')](_0xd7df('0xe6')));for(var _0x3b32fa in window[_0xd7df('0x77')][_0xd7df('0x7c')]){_0x5b46e4=window[_0xd7df('0x77')][_0xd7df('0x7c')][_0x3b32fa];if('object'!==typeof _0x5b46e4)return;_0x21566f=_0x5c3b68(_0xd7df('0xe7')+_0x5b46e4[_0xd7df('0xe5')]+']')[_0xd7df('0x0')]('li');if(window[_0xd7df('0x77')][_0xd7df('0xe2')]||!_0x21566f[_0xd7df('0x33')](_0xd7df('0xe8'))['length'])_0x3b8455=_0x5c3b68(_0xd7df('0xe9')),_0x3b8455[_0xd7df('0x33')](_0xd7df('0xea'))['html'](_0x5b46e4[_0xd7df('0x6e')]),_0x5b46e4=_0x21566f[_0xd7df('0x33')](_0xd7df('0xeb')),_0x5b46e4[_0xd7df('0x8')]?_0x5b46e4['prepend'](_0x3b8455)[_0xd7df('0x79')]('qd-bap-item-added'):_0x21566f[_0xd7df('0xec')](_0x3b8455);}_0x5a1549&&(window[_0xd7df('0x77')][_0xd7df('0xe2')]=!0x1);};window['_QuatroDigital_AmountProduct'][_0xd7df('0x78')]=function(){window[_0xd7df('0x77')][_0xd7df('0xe2')]=!0x0;_0x36f7d4[_0xd7df('0x68')](this);};_0x5c3b68(document)['ajaxStop'](function(){_0x36f7d4[_0xd7df('0x68')](this);});}catch(_0x529232){_0xd7df('0x4')!==typeof console&&_0xd7df('0xd')===typeof console[_0xd7df('0xe')]&&console[_0xd7df('0xe')](_0xd7df('0xf'),_0x529232);}}(this));(function(){try{var _0x50bedc=jQuery,_0x26db33,_0x4c0aca={'selector':_0xd7df('0xed'),'dropDown':{},'buyButton':{}};_0x50bedc[_0xd7df('0xee')]=function(_0x1b38e2){var _0x46667f={};_0x26db33=_0x50bedc['extend'](!0x0,{},_0x4c0aca,_0x1b38e2);_0x1b38e2=_0x50bedc(_0x26db33[_0xd7df('0xef')])[_0xd7df('0x1b')](_0x26db33[_0xd7df('0xf0')]);_0x46667f[_0xd7df('0xf1')]='undefined'!==typeof _0x26db33[_0xd7df('0xf0')][_0xd7df('0xdf')]&&!0x1===_0x26db33[_0xd7df('0xf0')][_0xd7df('0xdf')]?_0x50bedc(_0x26db33[_0xd7df('0xef')])[_0xd7df('0xf2')](_0x1b38e2['fn'],_0x26db33[_0xd7df('0xf1')]):_0x50bedc(_0x26db33[_0xd7df('0xef')])[_0xd7df('0xf2')](_0x26db33[_0xd7df('0xf1')]);_0x46667f['dropDown']=_0x1b38e2;return _0x46667f;};_0x50bedc['fn'][_0xd7df('0xf3')]=function(){'object'===typeof console&&_0xd7df('0xd')===typeof console[_0xd7df('0x11')]&&console['info'](_0xd7df('0xf4'));};_0x50bedc[_0xd7df('0xf3')]=_0x50bedc['fn'][_0xd7df('0xf3')];}catch(_0x40a561){_0xd7df('0x4')!==typeof console&&_0xd7df('0xd')===typeof console[_0xd7df('0xe')]&&console[_0xd7df('0xe')](_0xd7df('0xf'),_0x40a561);}}());

// vtex url parse
/* Quatro Digital - VTEX URL Parse // 1.4 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
var _0x8349=["\x6C\x69\x6E\x6B","\x3C\x61\x20\x68\x72\x65\x66\x3D\x22","\x22\x3E\x3C\x2F\x61\x3E","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\x66\x75\x6E\x63\x74\x69\x6F\x6E","\x65\x72\x72\x6F\x72","\x50\x72\x6F\x62\x6C\x65\x6D\x61\x73\x20\x3A\x28\x20\x2E\x20\x44\x65\x74\x61\x6C\x68\x65\x73\x3A\x20","\x2F","\x73\x70\x6C\x69\x74","","\x72\x65\x70\x6C\x61\x63\x65","\x70\x61\x74\x68\x6E\x61\x6D\x65","\x2C","\x70\x6F\x70","\x6D\x61\x74\x63\x68","\x73\x65\x61\x72\x63\x68","\x6C\x65\x6E\x67\x74\x68","\x6F\x62\x6A\x65\x63\x74","\x70\x75\x73\x68","\x63","\x6D\x61\x70","\x73\x68\x69\x66\x74","\x6F\x74\x68\x65\x72\x5F\x70\x61\x74\x68","\x6F\x74\x68\x65\x72\x5F\x73\x65\x61\x72\x63\x68","\x26","\x6F\x75\x74","\x67\x65\x74\x4D\x61\x70","\x70\x72\x6F\x74\x6F\x74\x79\x70\x65","\x6D\x65\x72\x67\x65\x55\x72\x6C","\x63\x61\x6C\x6C","\x65\x78\x74\x65\x6E\x64","\x67\x65\x74\x55\x72\x6C","\x6D\x61\x70\x3D","\x6A\x6F\x69\x6E","\x3F","\x51\x44\x5F\x56\x74\x65\x78\x55\x72\x6C\x50\x61\x72\x73\x65"];(function(){function _0x6ac7x1(_0x6ac7x2){try{this[_0x8349[0]]=$(_0x8349[1]+_0x6ac7x2+_0x8349[2])[0]}catch(c){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],c)}}function _0x6ac7x3(_0x6ac7x2){try{_0x6ac7x2=_0x6ac7x2||this[_0x8349[0]];var _0x6ac7x4=_0x6ac7x2[_0x8349[11]][_0x8349[10]](/\/\//g,_0x8349[7])[_0x8349[10]](/(^\/|\/$)/g,_0x8349[9])[_0x8349[8]](_0x8349[7]),_0x6ac7x5=((_0x6ac7x2[_0x8349[15]]||_0x8349[9])[_0x8349[14]](/map\=([^&]+)/i)||[_0x8349[9]])[_0x8349[13]]()[_0x8349[8]](_0x8349[12]);if(1==_0x6ac7x5[_0x8349[16]]&&0==_0x6ac7x5[0][_0x8349[16]]){if(_0x8349[17]== typeof defaultMap){_0x6ac7x5=defaultMap}else {for(var _0x6ac7x6=0;_0x6ac7x6<_0x6ac7x4[_0x8349[16]];_0x6ac7x6++){_0x6ac7x4[_0x6ac7x6][_0x8349[16]]&&_0x8349[7]!=_0x6ac7x4[_0x6ac7x6]&&_0x6ac7x5[_0x8349[18]](defaultMap)}}};for(var _0x6ac7x6={map:{},other_path:_0x8349[9]},_0x6ac7x7=0;_0x6ac7x7<_0x6ac7x5[_0x8349[16]];_0x6ac7x7++){_0x6ac7x5[_0x6ac7x7][_0x8349[16]]&&(_0x8349[19]==_0x6ac7x5[_0x6ac7x7]?(_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]=_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]||[],_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]][_0x8349[18]]((_0x6ac7x4||[_0x8349[9]])[_0x8349[21]]())):_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]=(_0x6ac7x4||[_0x8349[9]])[_0x8349[21]]())};_0x6ac7x6[_0x8349[22]]=_0x6ac7x4;_0x6ac7x6[_0x8349[23]]=(_0x6ac7x2[_0x8349[15]]||_0x8349[9])[_0x8349[10]](/map\=([^&]+)/ig,_0x8349[9])[_0x8349[10]](/\&\&+/ig,_0x8349[24])[_0x8349[10]](/\?/g,_0x8349[9]);return this[_0x8349[25]]=_0x6ac7x6}catch(g){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],g)}}_0x6ac7x1[_0x8349[27]][_0x8349[26]]=_0x6ac7x3;_0x6ac7x1[_0x8349[27]][_0x8349[28]]=function(_0x6ac7x2,_0x6ac7x4){try{var _0x6ac7x5=_0x6ac7x3[_0x8349[29]](this,this[_0x8349[0]]),_0x6ac7x6=_0x6ac7x3[_0x8349[29]](this,$(_0x8349[1]+_0x6ac7x2+_0x8349[2])[0]);_0x6ac7x5[_0x8349[22]][_0x8349[16]]||(_0x6ac7x5[_0x8349[22]]=void(0));_0x6ac7x5[_0x8349[23]][_0x8349[16]]||(_0x6ac7x5[_0x8349[23]]=void(0));var _0x6ac7x7=$[_0x8349[30]](!0,{},_0x6ac7x6,_0x6ac7x5);if(_0x8349[17]== typeof _0x6ac7x4){for(_0x6ac7x6=0;_0x6ac7x6<_0x6ac7x4[_0x8349[16]];_0x6ac7x6++){_0x6ac7x7[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]]&&(_0x6ac7x7[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]]=_0x6ac7x5[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]])}};return this[_0x8349[25]]=_0x6ac7x7}catch(g){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],g)}};_0x6ac7x1[_0x8349[27]][_0x8349[31]]=function(_0x6ac7x2){try{var _0x6ac7x4=[],_0x6ac7x5=[];_0x6ac7x2=_0x6ac7x2||{};for(var _0x6ac7x6 in this[_0x8349[25]][_0x8349[20]]){if(!_0x6ac7x2[_0x6ac7x6]){if(_0x8349[19]==_0x6ac7x6){for(var _0x6ac7x7=0;_0x6ac7x7<this[_0x8349[25]][_0x8349[20]][_0x6ac7x6][_0x8349[16]];_0x6ac7x7++){_0x6ac7x4[_0x8349[18]](this[_0x8349[25]][_0x8349[20]][_0x6ac7x6][_0x6ac7x7]),_0x6ac7x5[_0x8349[18]](_0x6ac7x6)}}else {_0x6ac7x4[_0x8349[18]](this[_0x8349[25]][_0x8349[20]][_0x6ac7x6]),_0x6ac7x5[_0x8349[18]](_0x6ac7x6)}}};var _0x6ac7x8=_0x6ac7x5[_0x8349[16]]?_0x8349[32]+_0x6ac7x5[_0x8349[33]](_0x8349[12])+_0x8349[24]:_0x8349[9];return _0x8349[7]+_0x6ac7x4[_0x8349[33]](_0x8349[7])+(this[_0x8349[25]][_0x8349[22]][_0x8349[16]]?_0x8349[7]+this[_0x8349[25]][_0x8349[22]][_0x8349[33]](_0x8349[7]):_0x8349[9])+_0x8349[34]+(_0x6ac7x8+this[_0x8349[25]][_0x8349[23]])[_0x8349[10]](/\&\&+/g,_0x8349[24])}catch(_0x6ac7x1){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],_0x6ac7x1)}};window[_0x8349[35]]=_0x6ac7x1})()

/* Quatro Digital - QD Select Smart Research 2 // Carlos Vinicius // Todos os direitos reservados */
var _0xdb28=['.qd_auto_select_smart_research_2','function','QD_SelectSmartResearch2','object','error','undefined','warn','unshift','[Quatro\x20Digital\x20-\x20QD\x20Select\x20Smart\x20Research\x202]\x0a','toLowerCase','aviso','info','apply','join','Selecione\x20o(a)\x20','location','find','.search-single-navigator\x20ul.','data-qdssr-title','each','push','trim','attr','href','h5.','\x20+ul\x20.filtro-ativo:first','text','length','replace','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','indexOf','Problemas\x20ao\x20definir\x20a\x20opção\x20selecionada.\x20Detalhes:\x20','message','addClass','qd-ssr2-loaded','Problemas\x20ao\x20tentar\x20verificar\x20as\x20opções\x20selecionadas.\x20Detalhes:\x20','options','index','<div\x20class=\x22qd-ssr2-option-wrapper\x22>','<label\x20for=\x22qd-ssr2-select-','labelMessage','</label>','<select\x20data-qdssr-ndx=\x22','\x22\x20data-qdssr-title=\x22','<option\x20value=\x22\x22></option>','optionsPlaceHolder','</select></div>','appendTo','select','add','select2','pt-BR','bind','select[data-qdssr-ndx=','data-qdssr-ndx','val','trigger','QuatroDigital.ssrChange','body','qd-ssr-reloading','split','shift','qd-ssr-loading','qd-ssr2-loading','html','removeAttr','disabled','getAjaxOptions','QuatroDigital.ssrSelectAjaxPopulated','ajaxError','removeClass','option[data-qdssr-text=\x27','<option\x20value=\x22','\x22\x20data-qdssr-text=\x22','</option>','getCategory','cache','innerHTML','buscapagina','match','pop','qdPlugin'];(function(_0x22e47a,_0x4ea10c){var _0x15a12a=function(_0x4a097f){while(--_0x4a097f){_0x22e47a['push'](_0x22e47a['shift']());}};_0x15a12a(++_0x4ea10c);}(_0xdb28,0x106));var _0x8db2=function(_0x405aea,_0x59543b){_0x405aea=_0x405aea-0x0;var _0x185ae4=_0xdb28[_0x405aea];return _0x185ae4;};(function(_0x2f1285){var _0x30b7ed=jQuery;if(_0x8db2('0x0')!==typeof _0x30b7ed['fn'][_0x8db2('0x1')]){_0x30b7ed['fn']['QD_SelectSmartResearch2']=function(){};var _0x1f4c45=function(_0xfcf49f,_0x4426fe){if(_0x8db2('0x2')===typeof console&&'undefined'!==typeof console[_0x8db2('0x3')]&&_0x8db2('0x4')!==typeof console['info']&&'undefined'!==typeof console[_0x8db2('0x5')]){var _0x46932f;_0x8db2('0x2')===typeof _0xfcf49f?(_0xfcf49f[_0x8db2('0x6')](_0x8db2('0x7')),_0x46932f=_0xfcf49f):_0x46932f=[_0x8db2('0x7')+_0xfcf49f];if(_0x8db2('0x4')===typeof _0x4426fe||'alerta'!==_0x4426fe[_0x8db2('0x8')]()&&_0x8db2('0x9')!==_0x4426fe[_0x8db2('0x8')]())if('undefined'!==typeof _0x4426fe&&_0x8db2('0xa')===_0x4426fe[_0x8db2('0x8')]())try{console['info'][_0x8db2('0xb')](console,_0x46932f);}catch(_0x3b2faa){try{console[_0x8db2('0xa')](_0x46932f[_0x8db2('0xc')]('\x0a'));}catch(_0x37d017){}}else try{console['error']['apply'](console,_0x46932f);}catch(_0x15070d){try{console[_0x8db2('0x3')](_0x46932f[_0x8db2('0xc')]('\x0a'));}catch(_0x1d6a15){}}else try{console[_0x8db2('0x5')][_0x8db2('0xb')](console,_0x46932f);}catch(_0x2f177a){try{console[_0x8db2('0x5')](_0x46932f[_0x8db2('0xc')]('\x0a'));}catch(_0x16c8c2){}}}},_0x11c26d={'options':[],'optionsPlaceHolder':[],'disabledMessage':function(_0x5489a9,_0x13b0f5,_0x24da1b){return'Selecione\x20o\x20anterior';},'labelMessage':function(_0x2b3f73,_0x44957d,_0x21db8c){return _0x8db2('0xd')+_0x21db8c[_0x2b3f73];},'redirect':function(_0x2efd06){window[_0x8db2('0xe')]['href']=_0x2efd06;},'getAjaxOptions':function(_0x5df464,_0x77789){var _0x104e33=[];_0x30b7ed(_0x5df464)[_0x8db2('0xf')](_0x8db2('0x10')+_0x77789['attr'](_0x8db2('0x11')))[_0x8db2('0xf')]('a')[_0x8db2('0x12')](function(){var _0x77789=_0x30b7ed(this);_0x104e33[_0x8db2('0x13')]([_0x77789['text']()[_0x8db2('0x14')](),_0x77789[_0x8db2('0x15')](_0x8db2('0x16'))||'']);});return _0x104e33;},'optionIsChecked':function(_0x125be2){_0x125be2=_0x30b7ed(_0x8db2('0x17')+_0x125be2+_0x8db2('0x18'))[_0x8db2('0x19')]()['trim']();return _0x125be2[_0x8db2('0x1a')]?_0x125be2:null;},'ajaxError':function(){_0x1f4c45('Desculpe,\x20não\x20foi\x20possível\x20executar\x20sua\x20solicitação.\x20Por\x20favor\x20entre\x20em\x20contato\x20com\x20o\x20SAC.');}};_0x2f1285=function(_0x5725f0){var _0x52a9ca={'p':'neynoretnznfx%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0xec8cd2){var _0x29b5cd=function(_0x3be281){return _0x3be281;};var _0x2baed0=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0xec8cd2=_0xec8cd2['d'+_0x2baed0[0x10]+'c'+_0x2baed0[0x11]+'m'+_0x29b5cd(_0x2baed0[0x1])+'n'+_0x2baed0[0xd]]['l'+_0x2baed0[0x12]+'c'+_0x2baed0[0x0]+'ti'+_0x29b5cd('o')+'n'];var _0x145328=function(_0x8d4f54){return escape(encodeURIComponent(_0x8d4f54['replace'](/\./g,'¨')[_0x8db2('0x1b')](/[a-zA-Z]/g,function(_0x372311){return String[_0x8db2('0x1c')](('Z'>=_0x372311?0x5a:0x7a)>=(_0x372311=_0x372311[_0x8db2('0x1d')](0x0)+0xd)?_0x372311:_0x372311-0x1a);})));};var _0x483aee=_0x145328(_0xec8cd2[[_0x2baed0[0x9],_0x29b5cd('o'),_0x2baed0[0xc],_0x2baed0[_0x29b5cd(0xd)]][_0x8db2('0xc')]('')]);_0x145328=_0x145328((window[['js',_0x29b5cd('no'),'m',_0x2baed0[0x1],_0x2baed0[0x4][_0x8db2('0x1e')](),_0x8db2('0x1f')][_0x8db2('0xc')]('')]||_0x8db2('0x20'))+['.v',_0x2baed0[0xd],'e',_0x29b5cd('x'),'co',_0x29b5cd('mm'),_0x8db2('0x21'),_0x2baed0[0x1],'.c',_0x29b5cd('o'),'m.',_0x2baed0[0x13],'r'][_0x8db2('0xc')](''));for(var _0x3124d5 in _0x52a9ca){if(_0x145328===_0x3124d5+_0x52a9ca[_0x3124d5]||_0x483aee===_0x3124d5+_0x52a9ca[_0x3124d5]){var _0xbc5366='tr'+_0x2baed0[0x11]+'e';break;}_0xbc5366='f'+_0x2baed0[0x0]+'ls'+_0x29b5cd(_0x2baed0[0x1])+'';}_0x29b5cd=!0x1;-0x1<_0xec8cd2[[_0x2baed0[0xc],'e',_0x2baed0[0x0],'rc',_0x2baed0[0x9]]['join']('')][_0x8db2('0x22')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x29b5cd=!0x0);return[_0xbc5366,_0x29b5cd];}(_0x5725f0);}(window);if(!eval(_0x2f1285[0x0]))return _0x2f1285[0x1]?_0x1f4c45('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x30b7ed[_0x8db2('0x1')]=function(_0x25ed2c,_0xcc8a66){if(!_0xcc8a66['options'][_0x8db2('0x1a')])return _0x1f4c45('Nenhuma\x20opção\x20foi\x20enviada,\x20é\x20esperado\x20um\x20array\x20com\x20sub\x20arrays\x20contendo\x20o\x20conjunto\x20chave/valor.');_0x25ed2c[_0x8db2('0x12')](function(){try{var _0x2b653b=_0x30b7ed(this),_0x14bd12=_0xae31b7(_0x2b653b,_0xcc8a66,_0x25ed2c);_0x46e0c8(_0x2b653b,_0xcc8a66,0x0);_0x14bd12['on']('QuatroDigital.ssrSelectAjaxPopulated',function(_0x56e9c1,_0x35d337){try{_0x46e0c8(_0x2b653b,_0xcc8a66,_0x35d337[_0x8db2('0x15')]('data-qdssr-ndx'));}catch(_0x516dcb){_0x1f4c45(_0x8db2('0x23')+_0x516dcb[_0x8db2('0x24')]);}});_0x2b653b[_0x8db2('0x25')](_0x8db2('0x26'));}catch(_0x17ad44){_0x1f4c45(_0x8db2('0x27')+_0x17ad44[_0x8db2('0x24')]);}});};var _0xae31b7=function(_0x502a02,_0x1ab5eb,_0x304a72){try{for(var _0x5d2a5b='',_0x41594c,_0x2f1285=!0x0,_0x5962e6=new _0x30b7ed(),_0x4bf222=!0x1,_0x3c1983=0x0,_0x4a45dd=0x0;_0x4a45dd<_0x1ab5eb[_0x8db2('0x28')][_0x8db2('0x1a')];_0x4a45dd++){_0x8db2('0x2')!==typeof _0x1ab5eb[_0x8db2('0x28')][_0x4a45dd]&&(_0x2f1285=!0x1);var _0x5cc419=_0x1ab5eb['optionsPlaceHolder'][_0x4a45dd]||'',_0x2d3e98=_0x304a72[_0x8db2('0x29')](_0x502a02);_0x5d2a5b=_0x8db2('0x2a');_0x5d2a5b+=_0x8db2('0x2b')+_0x4a45dd+_0x2d3e98+'\x22>'+_0x1ab5eb[_0x8db2('0x2c')](_0x4a45dd,_0x1ab5eb['options'],_0x1ab5eb['optionsPlaceHolder'])+_0x8db2('0x2d');_0x5d2a5b+=_0x8db2('0x2e')+_0x4a45dd+'\x22\x20id=\x22qd-ssr2-select-'+_0x4a45dd+_0x2d3e98+_0x8db2('0x2f')+_0x5cc419+'\x22>';_0x5d2a5b+=_0x8db2('0x30');_0x2f1285?_0x5d2a5b+=_0x451c29(_0x1ab5eb[_0x8db2('0x28')][_0x4a45dd]):_0x5cc419=_0x1ab5eb['disabledMessage'](_0x4a45dd,_0x1ab5eb[_0x8db2('0x28')],_0x1ab5eb[_0x8db2('0x31')]);_0x5d2a5b+=_0x8db2('0x32');_0x41594c=_0x30b7ed(_0x5d2a5b);_0x41594c[_0x8db2('0x33')](_0x502a02);var _0x2e6f0c=_0x41594c[_0x8db2('0xf')](_0x8db2('0x34'));_0x5962e6=_0x5962e6[_0x8db2('0x35')](_0x2e6f0c);_0x2f1285||_0x2e6f0c[_0x8db2('0x15')]({'disabled':!0x0,'data-qdssr-str':_0x1ab5eb[_0x8db2('0x28')][_0x4a45dd]});_0x2e6f0c[_0x8db2('0x36')]({'placeholder':_0x5cc419,'language':_0x8db2('0x37')});_0x2e6f0c[_0x8db2('0x38')]('change',function(_0x3ee510,_0x2b2472){var _0x5e0382=_0x30b7ed(this),_0x49a7ae=_0x502a02['find'](_0x8db2('0x39')+(parseInt(_0x5e0382[_0x8db2('0x15')](_0x8db2('0x3a'))||0x0,0xa)+0x1)+']'),_0x2f1285=(_0x5e0382[_0x8db2('0x3b')]()||'')[_0x8db2('0x14')]();_0x2b2472||(_0x4bf222=!0x0);_0x30b7ed(window)[_0x8db2('0x3c')](_0x8db2('0x3d'),[_0x49a7ae,_0x4bf222]);!_0x49a7ae['length']&&(!_0x2b2472||_0x4bf222&&_0x2f1285[_0x8db2('0x1a')])&&(_0x30b7ed(document[_0x8db2('0x3e')])[_0x8db2('0x25')](_0x8db2('0x3f')),_0x1ab5eb['redirect'](_0x2f1285));_0x2f1285=_0x2f1285[_0x8db2('0x40')]('#')[_0x8db2('0x41')]()[_0x8db2('0x40')]('?');_0x2f1285[0x1]=(_0x49a7ae[_0x8db2('0x15')]('data-qdssr-str')||'')+'&'+(_0x2f1285[0x1]||'');_0x30b7ed(document[_0x8db2('0x3e')])['addClass'](_0x8db2('0x42'));_0x41594c[_0x8db2('0x25')](_0x8db2('0x43'));_0x3c1983+=0x1;_0x30b7ed['qdAjax']({'url':_0x2f1285['join']('?'),'dataType':_0x8db2('0x44'),'success':function(_0x47c556){_0x49a7ae[_0x8db2('0x45')](_0x8db2('0x46'));_0x49a7ae[_0x8db2('0x44')](_0x8db2('0x30')+_0x451c29(_0x1ab5eb[_0x8db2('0x47')](_0x47c556,_0x49a7ae)));_0x49a7ae[_0x8db2('0x36')]({'placeholder':_0x49a7ae[_0x8db2('0x15')](_0x8db2('0x11'))});_0x5e0382[_0x8db2('0x3c')](_0x8db2('0x48'),[_0x49a7ae]);},'error':function(){_0x1ab5eb[_0x8db2('0x49')][_0x8db2('0xb')](this,arguments);},'complete':function(){_0x41594c['removeClass'](_0x8db2('0x43'));--_0x3c1983;0x0==_0x3c1983&&_0x30b7ed(document[_0x8db2('0x3e')])[_0x8db2('0x4a')](_0x8db2('0x42'));},'clearQueueDelay':null});});}return _0x5962e6;}catch(_0x4f5018){_0x1f4c45('Problemas\x20:(\x20.\x20Detalhes:\x20'+_0x4f5018[_0x8db2('0x24')]);}},_0x46e0c8=function(_0x2e46d4,_0x164020,_0x4c66e5,_0x540d90){_0x164020=_0x164020['optionIsChecked'](_0x164020[_0x8db2('0x31')][_0x4c66e5]);null!==_0x164020&&(_0x540d90=_0x540d90||_0x2e46d4[_0x8db2('0xf')](_0x8db2('0x39')+_0x4c66e5+']'),_0x540d90[_0x8db2('0x3b')](_0x540d90[_0x8db2('0xf')](_0x8db2('0x4b')+_0x164020+'\x27]')[_0x8db2('0x3b')]())['trigger']('change',!0x0));},_0x451c29=function(_0x3d29bc){for(var _0x18c6ef='',_0x2908e4=0x0;_0x2908e4<_0x3d29bc[_0x8db2('0x1a')];_0x2908e4++)_0x18c6ef+=_0x8db2('0x4c')+(_0x3d29bc[_0x2908e4][0x1]||'')+_0x8db2('0x4d')+(_0x3d29bc[_0x2908e4][0x0]||'')[_0x8db2('0x1b')](/\s\([0-9]+\)/,'')+'\x22>'+(_0x3d29bc[_0x2908e4][0x0]||'')+_0x8db2('0x4e');return _0x18c6ef;};_0x30b7ed[_0x8db2('0x1')][_0x8db2('0x4f')]=function(){if(_0x30b7ed[_0x8db2('0x1')][_0x8db2('0x4f')][_0x8db2('0x50')])return _0x30b7ed[_0x8db2('0x1')][_0x8db2('0x4f')]['cache'];var _0x2ded23=[],_0xb4b0a=[];_0x30b7ed('script:not([src])')[_0x8db2('0x12')](function(){var _0xd78022=_0x30b7ed(this)[0x0][_0x8db2('0x51')];if(-0x1<_0xd78022['indexOf'](_0x8db2('0x52')))return _0x2ded23=(decodeURIComponent((_0xd78022[_0x8db2('0x53')](/\/buscapagina([^\'\"]+)/i)||[''])[_0x8db2('0x54')]())[_0x8db2('0x53')](/fq=c:[^\&]+/i)||[''])[_0x8db2('0x54')]()['split'](':')[_0x8db2('0x54')]()[_0x8db2('0x1b')](/(^\/|\/$)/g,'')[_0x8db2('0x40')]('/'),!0x1;});for(var _0x58bb60=0x0;_0x58bb60<_0x2ded23[_0x8db2('0x1a')];_0x58bb60++)_0x2ded23[_0x58bb60][_0x8db2('0x1a')]&&_0xb4b0a[_0x8db2('0x13')](_0x2ded23[_0x58bb60]);return _0x30b7ed[_0x8db2('0x1')][_0x8db2('0x4f')][_0x8db2('0x50')]=_0xb4b0a;};_0x30b7ed[_0x8db2('0x1')]['getCategory'][_0x8db2('0x50')]=null;_0x30b7ed['fn'][_0x8db2('0x1')]=function(_0x4d3c19){var _0x1eeafe=_0x30b7ed(this);if(!_0x1eeafe[_0x8db2('0x1a')])return _0x1eeafe;_0x4d3c19=_0x30b7ed['extend']({},_0x11c26d,_0x4d3c19);_0x1eeafe[_0x8db2('0x55')]=new _0x30b7ed[(_0x8db2('0x1'))](_0x1eeafe,_0x4d3c19);return _0x1eeafe;};_0x30b7ed(function(){_0x30b7ed(_0x8db2('0x56'))[_0x8db2('0x1')]();});}}(this));

/* Quatro Digital - QD Smart SKU Grid // Carlos Vinicius // Todos os direitos reservados */
var _0xaa5a=['rowImage','html','<img\x20src=\x22','rowImageSize','\x22\x20alt=\x22','skuname','\x22\x20/>','[data-qd-ssg-primary-dim=\x27','sku','removeClass','inputQtt','sellerId','bestPrice','available','listPrice','listPriceFormated','</span>','<span\x20class=\x22qd-sku-new-price\x22>','rowPrice','addClass','disabled','QD_smartNotifyMeHtml','appendTo','QD_smartNotifyMe','QD_smartNotifyMeOptions','qd-ssg-processed-row','not','.qd-ssg-processed-row','hide','message','click','.qd-sku-qtt-wrap[id]:first','trigger','skuSelected.vtex','QuatroDigital.sq_change','QuatroDigital.ssg_change','QD_smartQuantity','qttMore','buyButton','href','selectSkuMsg','val','data-sku-id','push','qty=','seller=','data-sku-seller','VTEXSC','sc=1','neynoretnznfx%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','toUpperCase','ite','---','erc','Atenção!\x20Cara\x20na\x20boa,\x20este\x20plugin\x20não\x20suporta\x20mais\x20de\x20um\x20gride,\x20por\x20favor\x20se\x20precisa\x20renderizar\x20outros\x20na\x20tela,\x20utilize\x20o\x20$().each','Atenção!\x20Para\x20que\x20o\x20avise-me\x20funcione\x20você\x20precisa\x20adicionar\x20o\x20plugin\x20\x27QD_smartNotifyMe\x27\x20😠.','QD_smartSkuTotalizer','.qd-smart-sku-grid-auto-load','function','cookie','object','jquery','json','stringify','raw','indexOf','slice','replace','parse','isFunction','defaults','number','expires',';\x20expires=','toUTCString','path',';\x20path=','domain',';\x20domain=','secure',';\x20secure','join','split','length','extend','abs','undefined','round','toFixed','QD_smartSkuGrid','Quatro\x20Digital\x20-\x20Smart\x20SKU\x20Grid','info','unshift','alerta','toLowerCase','aviso','apply','error','warn','.qd-sku-row-head\x20.qd-sku-col-title','.qd-sku-qtt-wrap','.qd-sku-qtt-price','.qd-sku-img','50-50','<span\x20class=\x22qd-no-stock\x22>ESGOTADO</span>','<span\x20class=\x22qd-snm-auto-include\x22></span>','left','input','.qd-sku-qtt-add','.qd-ssg-buy-button','javascript:alert(\x27Por\x20favor,\x20selecione\x20a\x20quantidade\x20desejada.\x27);','.qd-ssg-login','attr','data-qd-smart-sku-grid','string','Especificação\x20SKU\x20padrão\x20é\x20inválida.\x20A\x20execução\x20para\x20por\x20aqui\x20😞.\x20Valor\x20obtido:\x20','dimensions','data-qd-smart-sku-grid-z','A\x203ª\x20especificação\x20SKU\x20é\x20inválida\x20(eixo\x20z).\x20A\x20execução\x20para\x20por\x20aqui\x20😞.\x20Valor\x20obtido:\x20','dimensionsMap','clone','insertBefore','find','append','add','remove','bodyPrice','data-qd-ssg-primary-dim','rowName','data-qd-ssg-secundary-dim','bodyRow','qd-ssg-sku-not-found','skus','filter','[data-qd-ssg-secundary-dim=\x27'];(function(_0x363a28,_0x1cf856){var _0x1410b0=function(_0x322258){while(--_0x322258){_0x363a28['push'](_0x363a28['shift']());}};_0x1410b0(++_0x1cf856);}(_0xaa5a,0x1d3));var _0xaaa5=function(_0x3dd15e,_0x1f0015){_0x3dd15e=_0x3dd15e-0x0;var _0x231fd0=_0xaa5a[_0x3dd15e];return _0x231fd0;};(function(){_0xaaa5('0x0')!==typeof $[_0xaaa5('0x1')]&&function(_0x529709){_0xaaa5('0x0')===typeof define&&define['amd']?define(['jquery'],_0x529709):_0xaaa5('0x2')===typeof exports?_0x529709(require(_0xaaa5('0x3'))):_0x529709(jQuery);}(function(_0x344d71){function _0x191b25(_0x1b3960){_0x1b3960=_0x2ae7a3[_0xaaa5('0x4')]?JSON[_0xaaa5('0x5')](_0x1b3960):String(_0x1b3960);return _0x2ae7a3[_0xaaa5('0x6')]?_0x1b3960:encodeURIComponent(_0x1b3960);}function _0x271c8b(_0x2fb6cc,_0x2e3282){var _0x4534b5;if(_0x2ae7a3[_0xaaa5('0x6')])_0x4534b5=_0x2fb6cc;else _0x32546b:{var _0x41596f=_0x2fb6cc;0x0===_0x41596f[_0xaaa5('0x7')]('\x22')&&(_0x41596f=_0x41596f[_0xaaa5('0x8')](0x1,-0x1)[_0xaaa5('0x9')](/\\"/g,'\x22')[_0xaaa5('0x9')](/\\\\/g,'\x5c'));try{_0x41596f=decodeURIComponent(_0x41596f[_0xaaa5('0x9')](_0x1edc3c,'\x20'));_0x4534b5=_0x2ae7a3[_0xaaa5('0x4')]?JSON[_0xaaa5('0xa')](_0x41596f):_0x41596f;break _0x32546b;}catch(_0x39e449){}_0x4534b5=void 0x0;}return _0x344d71[_0xaaa5('0xb')](_0x2e3282)?_0x2e3282(_0x4534b5):_0x4534b5;}var _0x1edc3c=/\+/g,_0x2ae7a3=_0x344d71[_0xaaa5('0x1')]=function(_0x876459,_0x4a7733,_0x32ead6){if(0x1<arguments['length']&&!_0x344d71['isFunction'](_0x4a7733)){_0x32ead6=_0x344d71['extend']({},_0x2ae7a3[_0xaaa5('0xc')],_0x32ead6);if(_0xaaa5('0xd')===typeof _0x32ead6[_0xaaa5('0xe')]){var _0x362353=_0x32ead6[_0xaaa5('0xe')],_0x10a189=_0x32ead6[_0xaaa5('0xe')]=new Date();_0x10a189['setTime'](+_0x10a189+0x5265c00*_0x362353);}return document[_0xaaa5('0x1')]=[_0x2ae7a3[_0xaaa5('0x6')]?_0x876459:encodeURIComponent(_0x876459),'=',_0x191b25(_0x4a7733),_0x32ead6['expires']?_0xaaa5('0xf')+_0x32ead6['expires'][_0xaaa5('0x10')]():'',_0x32ead6[_0xaaa5('0x11')]?_0xaaa5('0x12')+_0x32ead6[_0xaaa5('0x11')]:'',_0x32ead6[_0xaaa5('0x13')]?_0xaaa5('0x14')+_0x32ead6['domain']:'',_0x32ead6[_0xaaa5('0x15')]?_0xaaa5('0x16'):''][_0xaaa5('0x17')]('');}for(var _0x362353=_0x876459?void 0x0:{},_0x10a189=document[_0xaaa5('0x1')]?document[_0xaaa5('0x1')][_0xaaa5('0x18')](';\x20'):[],_0x503627=0x0,_0x488799=_0x10a189[_0xaaa5('0x19')];_0x503627<_0x488799;_0x503627++){var _0x36de1b=_0x10a189[_0x503627][_0xaaa5('0x18')]('='),_0x47de88;_0x47de88=_0x36de1b['shift']();_0x47de88=_0x2ae7a3[_0xaaa5('0x6')]?_0x47de88:decodeURIComponent(_0x47de88);_0x36de1b=_0x36de1b[_0xaaa5('0x17')]('=');if(_0x876459&&_0x876459===_0x47de88){_0x362353=_0x271c8b(_0x36de1b,_0x4a7733);break;}_0x876459||void 0x0===(_0x36de1b=_0x271c8b(_0x36de1b))||(_0x362353[_0x47de88]=_0x36de1b);}return _0x362353;};_0x2ae7a3[_0xaaa5('0xc')]={};_0x344d71['removeCookie']=function(_0xd001c6,_0x12d056){if(void 0x0===_0x344d71['cookie'](_0xd001c6))return!0x1;_0x344d71[_0xaaa5('0x1')](_0xd001c6,'',_0x344d71[_0xaaa5('0x1a')]({},_0x12d056,{'expires':-0x1}));return!_0x344d71[_0xaaa5('0x1')](_0xd001c6);};});}());function qd_number_format(_0x3d79df,_0x1b1e43,_0x5a6f94,_0x96370b){_0x3d79df=(_0x3d79df+'')[_0xaaa5('0x9')](/[^0-9+\-Ee.]/g,'');_0x3d79df=isFinite(+_0x3d79df)?+_0x3d79df:0x0;_0x1b1e43=isFinite(+_0x1b1e43)?Math[_0xaaa5('0x1b')](_0x1b1e43):0x0;_0x96370b=_0xaaa5('0x1c')===typeof _0x96370b?',':_0x96370b;_0x5a6f94=_0xaaa5('0x1c')===typeof _0x5a6f94?'.':_0x5a6f94;var _0x44c831='',_0x44c831=function(_0x1a8917,_0x194d30){var _0x1b1e43=Math['pow'](0xa,_0x194d30);return''+(Math[_0xaaa5('0x1d')](_0x1a8917*_0x1b1e43)/_0x1b1e43)[_0xaaa5('0x1e')](_0x194d30);},_0x44c831=(_0x1b1e43?_0x44c831(_0x3d79df,_0x1b1e43):''+Math['round'](_0x3d79df))[_0xaaa5('0x18')]('.');0x3<_0x44c831[0x0][_0xaaa5('0x19')]&&(_0x44c831[0x0]=_0x44c831[0x0][_0xaaa5('0x9')](/\B(?=(?:\d{3})+(?!\d))/g,_0x96370b));(_0x44c831[0x1]||'')[_0xaaa5('0x19')]<_0x1b1e43&&(_0x44c831[0x1]=_0x44c831[0x1]||'',_0x44c831[0x1]+=Array(_0x1b1e43-_0x44c831[0x1]['length']+0x1)[_0xaaa5('0x17')]('0'));return _0x44c831[_0xaaa5('0x17')](_0x5a6f94);};(function(_0x56f76d){'use strict';var _0x58f190=jQuery;if(typeof _0x58f190['fn'][_0xaaa5('0x1f')]===_0xaaa5('0x0'))return;_0x58f190['fn'][_0xaaa5('0x1f')]=function(){};var _0x3de346=_0xaaa5('0x20');var _0x5eee5c=function(_0x13b5ad,_0x195c79){if(_0xaaa5('0x2')===typeof console&&_0xaaa5('0x0')===typeof console['error']&&_0xaaa5('0x0')===typeof console[_0xaaa5('0x21')]&&_0xaaa5('0x0')===typeof console['warn']){var _0x5e949f;_0xaaa5('0x2')===typeof _0x13b5ad?(_0x13b5ad[_0xaaa5('0x22')]('['+_0x3de346+']\x0a'),_0x5e949f=_0x13b5ad):_0x5e949f=['['+_0x3de346+']\x0a'+_0x13b5ad];if('undefined'===typeof _0x195c79||_0xaaa5('0x23')!==_0x195c79[_0xaaa5('0x24')]()&&_0xaaa5('0x25')!==_0x195c79[_0xaaa5('0x24')]())if('undefined'!==typeof _0x195c79&&_0xaaa5('0x21')===_0x195c79[_0xaaa5('0x24')]())try{console['info'][_0xaaa5('0x26')](console,_0x5e949f);}catch(_0x2f620c){console['info'](_0x5e949f[_0xaaa5('0x17')]('\x0a'));}else try{console[_0xaaa5('0x27')]['apply'](console,_0x5e949f);}catch(_0x3856d2){console[_0xaaa5('0x27')](_0x5e949f[_0xaaa5('0x17')]('\x0a'));}else try{console['warn'][_0xaaa5('0x26')](console,_0x5e949f);}catch(_0x3abc95){console[_0xaaa5('0x28')](_0x5e949f[_0xaaa5('0x17')]('\x0a'));}}};var _0x4d1ca9={'headItem':_0xaaa5('0x29'),'bodyRow':'.qd-sku-row-body','bodyPrice':_0xaaa5('0x2a'),'rowName':'.qd-sku-name','rowPrice':_0xaaa5('0x2b'),'rowImage':_0xaaa5('0x2c'),'rowImageSize':_0xaaa5('0x2d'),'unavailableHtml':_0xaaa5('0x2e'),'QD_smartNotifyMeHtml':_0xaaa5('0x2f'),'QD_smartNotifyMeOptions':{'placement':_0xaaa5('0x30')},'inputQtt':_0xaaa5('0x31'),'qttMore':_0xaaa5('0x32'),'qttMinus':'.qd-sku-qtt-remove','buyButton':_0xaaa5('0x33'),'selectSkuMsg':_0xaaa5('0x34'),'qttSkus':'.qd-selected-qtt-sku','valueSkus':'.qd-selected-sku-total','checkLoginErrorMsg':'Não\x20foi\x20possível\x20obter\x20seus\x20dados\x20de\x20acesso,\x20por\x20favor\x20tente\x20mais\x20tarde\x20ou\x20entre\x20em\x20contato\x20com\x20o\x20Atendimento\x20ao\x20Cliente!','userLoginWrapper':_0xaaa5('0x35'),'titleZ':'.qd-sku-title-z'};var _0x458b33=function(_0x50d205,_0x289a56){'use strict';try{if(!_0x50d205[_0xaaa5('0x19')])return _0x50d205;var _0x4603ee=_0x50d205[_0xaaa5('0x36')](_0xaaa5('0x37'));if(!(typeof _0x4603ee===_0xaaa5('0x38')&&_0x4603ee[_0xaaa5('0x19')]))return _0x5eee5c([_0xaaa5('0x39'),_0x4603ee]);if(skuJson[_0xaaa5('0x3a')][_0xaaa5('0x19')]!==0x2&&skuJson[_0xaaa5('0x3a')]['length']!==0x3)return _0x5eee5c(['Este\x20plugin\x20suporta\x20apenas\x20produtos\x20com\x20apenas\x20duas\x20ou\x20três\x20variações\x20de\x20SKU,\x20o\x20que\x20não\x20é\x20o\x20caso\x20desse!\x20A\x20execução\x20para\x20por\x20aqui\x20😞']);var _0x335f6a=_0x50d205[_0xaaa5('0x36')](_0xaaa5('0x3b'));if(skuJson[_0xaaa5('0x3a')]['length']===0x3&&!(typeof _0x335f6a===_0xaaa5('0x38')&&_0x335f6a['length']))return _0x5eee5c([_0xaaa5('0x3c'),_0x335f6a]);}catch(_0x4095ee){_0x5eee5c(_0x4095ee['message']);}try{var _0x33def4;for(var _0x474585=0x0;_0x474585<skuJson[_0xaaa5('0x3a')][_0xaaa5('0x19')];_0x474585++){if(skuJson[_0xaaa5('0x3a')][_0x474585]!==_0x4603ee&&(_0x335f6a?skuJson['dimensions'][_0x474585]!==_0x335f6a:!![])){_0x33def4=skuJson['dimensions'][_0x474585];break;}}var _0x301ba1=new _0x58f190();if(_0x335f6a){var _0x2ed27b;for(var _0x5274f2=0x0;_0x5274f2<skuJson[_0xaaa5('0x3d')][_0x335f6a][_0xaaa5('0x19')];_0x5274f2++){_0x2ed27b=_0x50d205[_0xaaa5('0x3e')]()[_0xaaa5('0x3f')](_0x50d205);_0x55fdc6(_0x2ed27b,_0x289a56,_0x4603ee,_0x33def4,_0x335f6a,skuJson['dimensionsMap'][_0x335f6a][_0x5274f2]);_0x2ed27b[_0xaaa5('0x40')](_0x289a56['titleZ'])[_0xaaa5('0x41')](skuJson[_0xaaa5('0x3d')][_0x335f6a][_0x5274f2]);_0x301ba1=_0x301ba1[_0xaaa5('0x42')](_0x2ed27b);}_0x50d205['remove']();}else{_0x55fdc6(_0x50d205,_0x289a56,_0x4603ee,_0x33def4,![]);_0x301ba1=_0x301ba1[_0xaaa5('0x42')](_0x50d205);}return _0x301ba1;}catch(_0x5c7a2b){_0x5eee5c(_0x5c7a2b['message']);}};var _0x55fdc6=function(_0x2c8d8,_0x1ebb79,_0x1dd9d0,_0x298cf6,_0x5cb2f5,_0x36e504){try{var _0x360f2b=_0x2c8d8['find'](_0x1ebb79['headItem']);for(var _0xb52346=0x0;_0xb52346<skuJson[_0xaaa5('0x3d')][_0x1dd9d0][_0xaaa5('0x19')];_0xb52346++){_0x360f2b[_0xaaa5('0x3e')]()['append'](skuJson['dimensionsMap'][_0x1dd9d0][_0xb52346])['insertBefore'](_0x360f2b);}_0x360f2b[_0xaaa5('0x43')]();var _0xc4d216=_0x2c8d8['find'](_0x1ebb79['bodyRow']);var _0x53703b=_0xc4d216[_0xaaa5('0x40')](_0x1ebb79[_0xaaa5('0x44')]);for(var _0xb52346=0x0;_0xb52346<skuJson[_0xaaa5('0x3d')][_0x1dd9d0][_0xaaa5('0x19')];_0xb52346++){_0x53703b['clone']()[_0xaaa5('0x36')](_0xaaa5('0x45'),skuJson[_0xaaa5('0x3d')][_0x1dd9d0][_0xb52346])[_0xaaa5('0x3f')](_0x53703b);}_0x53703b[_0xaaa5('0x43')]();var _0x404043;for(var _0xb52346=0x0;_0xb52346<skuJson[_0xaaa5('0x3d')][_0x298cf6][_0xaaa5('0x19')];_0xb52346++){_0x404043=_0xc4d216['clone']();_0x404043['find'](_0x1ebb79[_0xaaa5('0x46')])[_0xaaa5('0x41')](skuJson['dimensionsMap'][_0x298cf6][_0xb52346]);_0x404043[_0xaaa5('0x36')](_0xaaa5('0x47'),skuJson['dimensionsMap'][_0x298cf6][_0xb52346]);_0x404043[_0xaaa5('0x3f')](_0xc4d216);}_0xc4d216[_0xaaa5('0x43')]();var _0x46add7=_0x2c8d8[_0xaaa5('0x40')](_0x1ebb79[_0xaaa5('0x48')]);var _0x52049d;var _0x43cc89;_0x46add7[_0xaaa5('0x40')](_0x1ebb79[_0xaaa5('0x44')])['addClass'](_0xaaa5('0x49'));for(var _0x14c228=0x0;_0x14c228<skuJson[_0xaaa5('0x4a')]['length'];_0x14c228++){if(_0x5cb2f5&&skuJson[_0xaaa5('0x4a')][_0x14c228][_0xaaa5('0x3a')][_0x5cb2f5]!==_0x36e504)continue;_0x52049d=_0x46add7[_0xaaa5('0x4b')](_0xaaa5('0x4c')+skuJson[_0xaaa5('0x4a')][_0x14c228][_0xaaa5('0x3a')][_0x298cf6]+'\x27]');_0x52049d['find'](_0x1ebb79[_0xaaa5('0x4d')])[_0xaaa5('0x4e')](_0xaaa5('0x4f')+skuJson[_0xaaa5('0x4a')][_0x14c228]['image'][_0xaaa5('0x9')](/(ids\/[0-9]+-)[0-9]+-[0-9]+\//i,'$1'+_0x1ebb79[_0xaaa5('0x50')]+'/')+_0xaaa5('0x51')+skuJson[_0xaaa5('0x4a')][_0x14c228][_0xaaa5('0x52')]+_0xaaa5('0x53'));_0x43cc89=_0x52049d[_0xaaa5('0x40')](_0x1ebb79[_0xaaa5('0x44')])[_0xaaa5('0x4b')](_0xaaa5('0x54')+skuJson['skus'][_0x14c228][_0xaaa5('0x3a')][_0x1dd9d0]+'\x27]');if(_0x43cc89['length']){_0x43cc89[_0xaaa5('0x36')]('id',skuJson[_0xaaa5('0x4a')][_0x14c228][_0xaaa5('0x55')]);_0x43cc89[_0xaaa5('0x56')]('qd-ssg-sku-not-found');_0x43cc89[_0xaaa5('0x40')](_0x1ebb79[_0xaaa5('0x57')])['attr']({'data-sku-id':skuJson[_0xaaa5('0x4a')][_0x14c228][_0xaaa5('0x55')],'data-sku-seller':skuJson['skus'][_0x14c228][_0xaaa5('0x58')],'data-sku-price':skuJson[_0xaaa5('0x4a')][_0x14c228][_0xaaa5('0x59')]});if(skuJson[_0xaaa5('0x4a')][_0x14c228][_0xaaa5('0x5a')]){if(skuJson['skus'][_0x14c228][_0xaaa5('0x5b')])_0x43cc89[_0xaaa5('0x40')](_0x1ebb79['rowPrice'])['append']('<span\x20class=\x22qd-sku-old-price\x22>'+skuJson[_0xaaa5('0x4a')][_0x14c228][_0xaaa5('0x5c')]+_0xaaa5('0x5d'));_0x43cc89[_0xaaa5('0x40')](_0x1ebb79['rowPrice'])[_0xaaa5('0x41')](_0xaaa5('0x5e')+skuJson[_0xaaa5('0x4a')][_0x14c228]['bestPriceFormated']+_0xaaa5('0x5d'));}else{_0x43cc89[_0xaaa5('0x40')](_0x1ebb79[_0xaaa5('0x5f')])['append'](_0x1ebb79['unavailableHtml']);_0x43cc89[_0xaaa5('0x60')]('qd-ssg-unavailable');_0x43cc89['find'](_0x1ebb79['inputQtt'])['attr']('disabled',_0xaaa5('0x61'));if(_0x14acc3)_0x58f190(_0x1ebb79[_0xaaa5('0x62')])[_0xaaa5('0x63')](_0x43cc89['find'](_0x1ebb79['rowPrice']))[_0xaaa5('0x64')](_0x58f190[_0xaaa5('0x1a')]({},_0x1ebb79[_0xaaa5('0x65')],{'skuId':skuJson[_0xaaa5('0x4a')][_0x14c228]['sku']}));}}_0x52049d[_0xaaa5('0x60')](_0xaaa5('0x66'));}_0x46add7[_0xaaa5('0x67')](_0xaaa5('0x68'))[_0xaaa5('0x43')]();_0x2c8d8[_0xaaa5('0x60')]('qd-ssg-loaded');_0x2c8d8[_0xaaa5('0x56')](_0xaaa5('0x69'));}catch(_0x2e16fa){_0x5eee5c(_0x2e16fa[_0xaaa5('0x6a')]);}};var _0x446a58=function(_0x5545f3,_0x169f4c){_0x5545f3[_0xaaa5('0x40')](_0x169f4c[_0xaaa5('0x46')])[_0xaaa5('0x42')](_0x169f4c[_0xaaa5('0x4d')])[_0xaaa5('0x6b')](function(){try{var _0x4a1499=_0x58f190(this)['siblings'](_0xaaa5('0x6c'))['attr']('id');var _0x2b3f59;for(var _0x321c53=0x0;_0x321c53<skuJson[_0xaaa5('0x4a')]['length'];_0x321c53++){if(skuJson[_0xaaa5('0x4a')][_0x321c53][_0xaaa5('0x55')]==_0x4a1499){_0x2b3f59=skuJson[_0xaaa5('0x4a')][_0x321c53];break;}}if(_0x2b3f59)_0x58f190(document)[_0xaaa5('0x6d')](_0xaaa5('0x6e'),[_0x4a1499,_0x2b3f59]);}catch(_0x62f5a1){_0x5eee5c(_0x62f5a1[_0xaaa5('0x6a')]);}});};var _0x3f6f1b=function(_0x7ec95e,_0x366b11){'use strict';if(!_0x7ec95e['length'])return _0x7ec95e;try{_0x7ec95e[_0xaaa5('0x40')](_0x366b11[_0xaaa5('0x44')])['each'](function(){var _0x5abb0b=_0x58f190(this);var _0x22c568=_0x5abb0b[_0xaaa5('0x40')](_0x366b11[_0xaaa5('0x57')]);_0x22c568['on'](_0xaaa5('0x6f'),function(){_0x58f190(this)[_0xaaa5('0x6d')](_0xaaa5('0x70'));});_0x5abb0b[_0xaaa5('0x71')]({'buyButton':null,'qttInput':_0x22c568,'btnMore':_0x366b11[_0xaaa5('0x72')],'btnMinus':_0x366b11['qttMinus'],'initialValue':0x0,'minimumValue':0x0});});}catch(_0x1f2410){_0x5eee5c(_0x1f2410['message']);}};var _0x5070a0=function(_0x4e06df,_0x31610f){'use strict';if(!_0x4e06df['length'])return _0x4e06df;try{var _0x39139a=_0x58f190(_0x31610f[_0xaaa5('0x73')]);_0x39139a[_0xaaa5('0x36')](_0xaaa5('0x74'),_0x31610f[_0xaaa5('0x75')]);var _0x2cf06e=_0x4e06df[_0xaaa5('0x40')](_0x31610f[_0xaaa5('0x57')])[_0xaaa5('0x67')](_0xaaa5('0x61'))[_0xaaa5('0x4b')]('[data-sku-id]');_0x2cf06e['on'](_0xaaa5('0x70'),function(){try{var _0x24f71f=[];_0x2cf06e['each'](function(){var _0x6a7539=_0x58f190(this);var _0x1ef08e=parseInt(_0x6a7539[_0xaaa5('0x76')]());if(_0x1ef08e>0x0){_0x24f71f['push']('sku='+_0x6a7539[_0xaaa5('0x36')](_0xaaa5('0x77')));_0x24f71f[_0xaaa5('0x78')](_0xaaa5('0x79')+_0x1ef08e);_0x24f71f[_0xaaa5('0x78')](_0xaaa5('0x7a')+_0x6a7539[_0xaaa5('0x36')](_0xaaa5('0x7b')));}});if(_0x24f71f[_0xaaa5('0x19')]){_0x24f71f['push'](_0x58f190[_0xaaa5('0x1')](_0xaaa5('0x7c'))||_0xaaa5('0x7d'));_0x39139a[_0xaaa5('0x36')](_0xaaa5('0x74'),'/checkout/cart/add?'+_0x24f71f[_0xaaa5('0x17')]('&'));}else _0x39139a['attr'](_0xaaa5('0x74'),_0x31610f[_0xaaa5('0x75')]);}catch(_0x5c79c4){_0x5eee5c(_0x5c79c4[_0xaaa5('0x6a')]);}});}catch(_0x9e090d){_0x5eee5c(_0x9e090d['message']);}};var _0x1b6677=function(_0x2b720e){var _0xb764a8={'p':_0xaaa5('0x7e')};return function(_0x562313){var _0x2d91e2,_0xc0fc93,_0x22635e,_0x2adc15;_0xc0fc93=function(_0x3b7748){return _0x3b7748;};_0x22635e=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x562313=_0x562313['d'+_0x22635e[0x10]+'c'+_0x22635e[0x11]+'m'+_0xc0fc93(_0x22635e[0x1])+'n'+_0x22635e[0xd]]['l'+_0x22635e[0x12]+'c'+_0x22635e[0x0]+'ti'+_0xc0fc93('o')+'n'];_0x2d91e2=function(_0x2ce0de){return escape(encodeURIComponent(_0x2ce0de[_0xaaa5('0x9')](/\./g,'¨')[_0xaaa5('0x9')](/[a-zA-Z]/g,function(_0x299796){return String['fromCharCode'](('Z'>=_0x299796?0x5a:0x7a)>=(_0x299796=_0x299796[_0xaaa5('0x7f')](0x0)+0xd)?_0x299796:_0x299796-0x1a);})));};var _0x2daa0e=_0x2d91e2(_0x562313[[_0x22635e[0x9],_0xc0fc93('o'),_0x22635e[0xc],_0x22635e[_0xc0fc93(0xd)]][_0xaaa5('0x17')]('')]);_0x2d91e2=_0x2d91e2((window[['js',_0xc0fc93('no'),'m',_0x22635e[0x1],_0x22635e[0x4][_0xaaa5('0x80')](),_0xaaa5('0x81')][_0xaaa5('0x17')]('')]||_0xaaa5('0x82'))+['.v',_0x22635e[0xd],'e',_0xc0fc93('x'),'co',_0xc0fc93('mm'),_0xaaa5('0x83'),_0x22635e[0x1],'.c',_0xc0fc93('o'),'m.',_0x22635e[0x13],'r'][_0xaaa5('0x17')](''));for(var _0x26f645 in _0xb764a8){if(_0x2d91e2===_0x26f645+_0xb764a8[_0x26f645]||_0x2daa0e===_0x26f645+_0xb764a8[_0x26f645]){_0x2adc15='tr'+_0x22635e[0x11]+'e';break;}_0x2adc15='f'+_0x22635e[0x0]+'ls'+_0xc0fc93(_0x22635e[0x1])+'';}_0xc0fc93=!0x1;-0x1<_0x562313[[_0x22635e[0xc],'e',_0x22635e[0x0],'rc',_0x22635e[0x9]][_0xaaa5('0x17')]('')][_0xaaa5('0x7')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0xc0fc93=!0x0);return[_0x2adc15,_0xc0fc93];}(_0x2b720e);}(window);if(!eval(_0x1b6677[0x0]))return _0x1b6677[0x1]?_0x5eee5c('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x14acc3=![];_0x58f190['fn'][_0xaaa5('0x1f')]=function(_0x3d5ce6){var _0x448942=_0x58f190(this);if(!_0x448942['length'])return _0x448942;if(_0x448942['length']>0x1)_0x5eee5c(_0xaaa5('0x84'),'aviso');var _0x4e5def=_0x58f190['extend']({},_0x4d1ca9,_0x3d5ce6);if(typeof _0x58f190['fn'][_0xaaa5('0x64')]!==_0xaaa5('0x0'))_0x5eee5c(_0xaaa5('0x85'),_0xaaa5('0x25'));else _0x14acc3=!![];var _0x2fd50a=_0x458b33(_0x448942,_0x4e5def);_0x3f6f1b(_0x58f190(_0x2fd50a),_0x4e5def);_0x5070a0(_0x58f190(_0x2fd50a),_0x4e5def);_0x58f190[_0xaaa5('0x86')](_0x58f190(_0x2fd50a),_0x4e5def);_0x446a58(_0x58f190(_0x2fd50a),_0x4e5def);_0x58f190(window)[_0xaaa5('0x6d')]('QuatroDigital.ssg_callback',this);return _0x448942;};_0x58f190(function(){_0x58f190(_0xaaa5('0x87'))['QD_smartSkuGrid']();});}(this));