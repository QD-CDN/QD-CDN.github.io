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
			setTimeout(function () {
				$('.slider-qd-v1-full, .hotsite-qd-v1-banner-slider').slick({
					prevArrow: '<button type="button" class="slick-prev" title="Anterior"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>',
					nextArrow: '<button type="button" class="slick-next" title="Próximo"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>',
					dots: true,
					adaptiveHeight: true,
					fade: true,
					speed: 400,
					cssEase: 'linear'
				});
		   },500);
		},		
		bannerSliderMobile: function () {
			setTimeout(function () {
				$('.mobile-slider-qd-v1-wrapper').slick({
					prevArrow: '<button type="button" class="slick-prev" title="Anterior"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>',
					nextArrow: '<button type="button" class="slick-next" title="Próximo"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>',
					adaptiveHeight: true,
					fade: true,
					speed: 400,
					dots: true,
					cssEase: 'linear'
				});
			}, 500);
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

var _0xb967=['length','extend','Não\x20foi\x20localizado\x20o\x20Bootstrap\x20Tooltip,\x20por\x20favor\x20chame\x20a\x20biblioteca\x20JS\x20do\x20Bootstrap.','.portal-notify-me-ref','addClass','hide','button','attr','data-placement','data-sku','find','val','qdAjax','/no-cache/profileSystem/getProfile','json','qd-snm-ready','tooltip','destroy','title','Email','click.qd_snm','qd-snm-loading','Insira\x20seu\x20e-mail','test','post','/no-cache/AviseMe.aspx','qd-snm-sent','removeClass','Desculpe,\x20não\x20foi\x20possível\x20enviar\x20seu\x20pedido.\x20Por\x20favor\x20entre\x20em\x20contato\x20com\x20a\x20Central\x20de\x20Atendimento.','Erro\x20:-(.\x20Por\x20favor,\x20fale\x20com\x20o\x20SAC!','add','skuId','replace','fromCharCode','ite','erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','each','skus','available','qd-smn-all-sku-unavailable','Problemas\x20ao\x20verificar\x20se\x20o\x20produto\x20esta\x20indisponível.\x20Detalhes:\x20','message','skuSelected.vtex','fire','sku','Problemas\x20nos\x20eventos\x20VTEX.\x20Detalhes:\x20','<div\x20class=\x22qd-snm-auto-include\x22></div>','QD_smartNotifyMe','object','function','error','info','warn','undefined','alerta','toLowerCase','aviso','join','apply','top','Callbacks'];(function(_0x321bb2,_0x202794){var _0x9c12ed=function(_0x263dd3){while(--_0x263dd3){_0x321bb2['push'](_0x321bb2['shift']());}};_0x9c12ed(++_0x202794);}(_0xb967,0xee));var _0x7b96=function(_0x1d7a48,_0x51490b){_0x1d7a48=_0x1d7a48-0x0;var _0xc0efea=_0xb967[_0x1d7a48];return _0xc0efea;};(function(_0xc783c6){'use strict';var _0x3cb8dc=jQuery;if(typeof _0x3cb8dc['fn'][_0x7b96('0x0')]==='function')return;_0x3cb8dc['fn']['QD_smartNotifyMe']=function(){};var _0x3fd6b1='Quatro\x20Digital\x20-\x20Smart\x20Notify\x20Me';var _0x31cb74=function(_0x56dbb2,_0x3dffd7){if(_0x7b96('0x1')===typeof console&&_0x7b96('0x2')===typeof console[_0x7b96('0x3')]&&_0x7b96('0x2')===typeof console[_0x7b96('0x4')]&&_0x7b96('0x2')===typeof console[_0x7b96('0x5')]){var _0x116626;'object'===typeof _0x56dbb2?(_0x56dbb2['unshift']('['+_0x3fd6b1+']\x0a'),_0x116626=_0x56dbb2):_0x116626=['['+_0x3fd6b1+']\x0a'+_0x56dbb2];if(_0x7b96('0x6')===typeof _0x3dffd7||_0x7b96('0x7')!==_0x3dffd7[_0x7b96('0x8')]()&&_0x7b96('0x9')!==_0x3dffd7[_0x7b96('0x8')]())if(_0x7b96('0x6')!==typeof _0x3dffd7&&'info'===_0x3dffd7[_0x7b96('0x8')]())try{console[_0x7b96('0x4')]['apply'](console,_0x116626);}catch(_0x17c477){console[_0x7b96('0x4')](_0x116626[_0x7b96('0xa')]('\x0a'));}else try{console[_0x7b96('0x3')][_0x7b96('0xb')](console,_0x116626);}catch(_0x98d92f){console['error'](_0x116626[_0x7b96('0xa')]('\x0a'));}else try{console[_0x7b96('0x5')][_0x7b96('0xb')](console,_0x116626);}catch(_0x3e399e){console[_0x7b96('0x5')](_0x116626['join']('\x0a'));}}};var _0x311580={'button':'<button\x20title=\x22Carregando\x20...\x22><i\x20class=\x22fa\x20fa-envelope\x22></i>\x20Avise-me</button>','placement':_0x7b96('0xc'),'skuId':null};var _0x502149=_0x3cb8dc[_0x7b96('0xd')]('memory');var _0xa350d2=function(_0x2d15c7,_0xaf52b7){'use strict';var _0x2cc98d=_0x3cb8dc(_0xaf52b7);if(!_0x2cc98d[_0x7b96('0xe')])return;var _0x4061fa=_0x3cb8dc[_0x7b96('0xf')]({},_0x311580,_0x2d15c7);if(typeof _0x3cb8dc['fn']['tooltip']!==_0x7b96('0x2'))return _0x31cb74(_0x7b96('0x10'));var _0x22fb46=_0x2cc98d['getParent'](_0x7b96('0x11'));_0x2cc98d[_0x7b96('0x12')](_0x7b96('0x13'));var _0x1c6a50=_0x3cb8dc(_0x4061fa[_0x7b96('0x14')]);_0x1c6a50['prependTo'](_0x2cc98d);_0x1c6a50[_0x7b96('0x15')](_0x7b96('0x16'),_0x4061fa['placement']);if(_0x4061fa['skuId'])_0x1c6a50['attr'](_0x7b96('0x17'),_0x4061fa['skuId']);else{var _0x45ca60=(_0x22fb46[_0x7b96('0x18')]('.notifyme-skuid')[_0x7b96('0x19')]()||'')+'';if(_0x45ca60[_0x7b96('0xe')])_0x1c6a50[_0x7b96('0x15')]('data-sku',_0x45ca60);}_0x3cb8dc[_0x7b96('0x1a')]({'url':_0x7b96('0x1b'),'dataType':_0x7b96('0x1c'),'clearQueueDelay':null,'success':function(_0x2b1d61){_0x2cc98d['addClass'](_0x7b96('0x1d'));_0x1c6a50[_0x7b96('0x1e')](_0x7b96('0x1f'));_0x1c6a50[_0x7b96('0x15')](_0x7b96('0x20'),_0x2b1d61[_0x7b96('0x21')])[_0x7b96('0x1e')]();_0x1c6a50['on'](_0x7b96('0x22'),function(){try{_0x2cc98d[_0x7b96('0x12')](_0x7b96('0x23'));_0x1c6a50[_0x7b96('0x1e')](_0x7b96('0x1f'));_0x1c6a50[_0x7b96('0x15')](_0x7b96('0x20'),'Carregando\x20...')[_0x7b96('0x1e')]('show');var _0x378aa0;if(_0x2b1d61['Email'])_0x378aa0=_0x2b1d61[_0x7b96('0x21')];else{var _0x564b88=function(){_0x378aa0=prompt(_0x7b96('0x24'));if(_0x378aa0!==null&&!/([\d\w\.]+)\+?([\.\w\d]+)?@([\w\d]+[\.\w\d]+)/i[_0x7b96('0x25')](_0x378aa0))_0x564b88();};_0x564b88();}if(_0x378aa0){_0x3cb8dc[_0x7b96('0x26')](_0x7b96('0x27'),{'notifymeClientEmail':_0x378aa0,'notifymeClientName':_0x2b1d61['FirstName']||_0x2b1d61[_0x7b96('0x21')]||_0x378aa0,'notifymeIdSku':_0x3cb8dc(this)['attr']('data-sku')},function(){_0x2cc98d[_0x7b96('0x12')](_0x7b96('0x28'));_0x2cc98d[_0x7b96('0x29')](_0x7b96('0x23'));_0x1c6a50[_0x7b96('0x1e')]('destroy');_0x1c6a50['attr'](_0x7b96('0x20'),'Solicitação\x20enviada.\x20Obrigado!')['tooltip']('show');})['fail'](function(){throw'';});}}catch(_0x4247e5){alert(_0x7b96('0x2a'));}});},'error':function(){_0x1c6a50[_0x7b96('0x1e')](_0x7b96('0x1f'));_0x1c6a50[_0x7b96('0x15')](_0x7b96('0x20'),_0x7b96('0x2b'))[_0x7b96('0x1e')]();}});_0x1c6a50[_0x7b96('0x1e')]();_0x502149[_0x7b96('0x2c')](function(_0x55dbf1){_0x2cc98d[_0x7b96('0x29')]('hide');if(!_0x4061fa[_0x7b96('0x2d')])_0x1c6a50[_0x7b96('0x15')](_0x7b96('0x17'),_0x55dbf1);});};var _0x476a51=function(_0x3e4915){var _0x42b621={'p':'neynoretnznfx%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x476dc9){var _0x1df001,_0x40e79c,_0x49e98a,_0x25e72c;_0x40e79c=function(_0x5b20a7){return _0x5b20a7;};_0x49e98a=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x476dc9=_0x476dc9['d'+_0x49e98a[0x10]+'c'+_0x49e98a[0x11]+'m'+_0x40e79c(_0x49e98a[0x1])+'n'+_0x49e98a[0xd]]['l'+_0x49e98a[0x12]+'c'+_0x49e98a[0x0]+'ti'+_0x40e79c('o')+'n'];_0x1df001=function(_0x4025a3){return escape(encodeURIComponent(_0x4025a3[_0x7b96('0x2e')](/\./g,'¨')[_0x7b96('0x2e')](/[a-zA-Z]/g,function(_0x27d80c){return String[_0x7b96('0x2f')](('Z'>=_0x27d80c?0x5a:0x7a)>=(_0x27d80c=_0x27d80c['charCodeAt'](0x0)+0xd)?_0x27d80c:_0x27d80c-0x1a);})));};var _0x62620d=_0x1df001(_0x476dc9[[_0x49e98a[0x9],_0x40e79c('o'),_0x49e98a[0xc],_0x49e98a[_0x40e79c(0xd)]][_0x7b96('0xa')]('')]);_0x1df001=_0x1df001((window[['js',_0x40e79c('no'),'m',_0x49e98a[0x1],_0x49e98a[0x4]['toUpperCase'](),_0x7b96('0x30')][_0x7b96('0xa')]('')]||'---')+['.v',_0x49e98a[0xd],'e',_0x40e79c('x'),'co',_0x40e79c('mm'),_0x7b96('0x31'),_0x49e98a[0x1],'.c',_0x40e79c('o'),'m.',_0x49e98a[0x13],'r'][_0x7b96('0xa')](''));for(var _0x5140bf in _0x42b621){if(_0x1df001===_0x5140bf+_0x42b621[_0x5140bf]||_0x62620d===_0x5140bf+_0x42b621[_0x5140bf]){_0x25e72c='tr'+_0x49e98a[0x11]+'e';break;}_0x25e72c='f'+_0x49e98a[0x0]+'ls'+_0x40e79c(_0x49e98a[0x1])+'';}_0x40e79c=!0x1;-0x1<_0x476dc9[[_0x49e98a[0xc],'e',_0x49e98a[0x0],'rc',_0x49e98a[0x9]][_0x7b96('0xa')]('')][_0x7b96('0x32')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x40e79c=!0x0);return[_0x25e72c,_0x40e79c];}(_0x3e4915);}(window);if(!eval(_0x476a51[0x0]))return _0x476a51[0x1]?_0x31cb74(_0x7b96('0x33')):!0x1;_0x3cb8dc['fn']['QD_smartNotifyMe']=function(_0x242be9){var _0x3041ab=_0x3cb8dc(this);_0x3041ab[_0x7b96('0x34')](function(){_0xa350d2(_0x242be9,_0x3cb8dc(this));});return _0x3041ab;};_0x3cb8dc(function(){try{if(typeof skuJson!=='object')return;var _0x2795be=!![];for(var _0x4665ba=0x0;_0x4665ba<skuJson['skus'][_0x7b96('0xe')];_0x4665ba++){if(skuJson[_0x7b96('0x35')][_0x4665ba][_0x7b96('0x36')]){_0x2795be=![];break;}}if(_0x2795be)_0x3cb8dc('body')[_0x7b96('0x12')](_0x7b96('0x37'));}catch(_0x2d5388){_0x31cb74(_0x7b96('0x38')+_0x2d5388[_0x7b96('0x39')]);}});_0x3cb8dc(window)['on'](_0x7b96('0x3a'),function(_0x271704,_0x2d7024,_0x377624){try{if(!_0x377624['available'])_0x502149[_0x7b96('0x3b')](_0x377624[_0x7b96('0x3c')]);}catch(_0xcdc387){_0x31cb74(_0x7b96('0x3d')+_0xcdc387['message']);}});_0x3cb8dc(function(){_0x3cb8dc('.qd_auto_smart_notify_me')[_0x7b96('0x0')]();});_0x3cb8dc(function(){if(typeof skuJson!==_0x7b96('0x1'))return;_0x3cb8dc(_0x7b96('0x3e'))['appendTo'](_0x7b96('0x11'))[_0x7b96('0x0')]();});}(this));
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
var _0x88ff=['qd-am-li-','first','qd-am-first','last','neynoretnznfx%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','ite','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','filter','.qd-am-banner','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','url','img[alt=\x27','attr','data-qdam-value','clone','insertBefore','qd-am-content-loaded','trim','[class*=\x27colunas\x27]','\x27\x20falho.','ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','alerta','li\x20>ul','qd-am-has-ul','children',':not(ul)','qd-am-elem-','text','replaceSpecialChars','>li','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','-li','callback','extend','exec','.qd_amazing_menu_auto','getParent','closest','QD_amazingMenu','function','/qd-amazing-menu','QD\x20Amazing\x20Menu','error','undefined','info','warn','object','unshift','toLowerCase','aviso','join','apply','qdAmAddNdx','each','addClass'];(function(_0x598bc1,_0x909fbe){var _0x4ed933=function(_0x468826){while(--_0x468826){_0x598bc1['push'](_0x598bc1['shift']());}};_0x4ed933(++_0x909fbe);}(_0x88ff,0x1af));var _0xf88f=function(_0x81daa5,_0x25c9d4){_0x81daa5=_0x81daa5-0x0;var _0x2644df=_0x88ff[_0x81daa5];return _0x2644df;};(function(_0x3e4dff){_0x3e4dff['fn'][_0xf88f('0x0')]=_0x3e4dff['fn'][_0xf88f('0x1')];}(jQuery));(function(_0x5cf11a){'use strict';var _0x5e09c0,_0x215953,_0x22b964,_0x4e6b31;_0x5e09c0=jQuery;if(typeof _0x5e09c0['fn'][_0xf88f('0x2')]===_0xf88f('0x3'))return;_0x215953={'url':_0xf88f('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0x33fc68=_0xf88f('0x5');var _0x599c45=function(_0x26d818,_0x3f78be){if('object'===typeof console&&'undefined'!==typeof console[_0xf88f('0x6')]&&_0xf88f('0x7')!==typeof console[_0xf88f('0x8')]&&_0xf88f('0x7')!==typeof console[_0xf88f('0x9')]){var _0x48c5de;_0xf88f('0xa')===typeof _0x26d818?(_0x26d818[_0xf88f('0xb')]('['+_0x33fc68+']\x0a'),_0x48c5de=_0x26d818):_0x48c5de=['['+_0x33fc68+']\x0a'+_0x26d818];if(_0xf88f('0x7')===typeof _0x3f78be||'alerta'!==_0x3f78be[_0xf88f('0xc')]()&&_0xf88f('0xd')!==_0x3f78be['toLowerCase']())if(_0xf88f('0x7')!==typeof _0x3f78be&&'info'===_0x3f78be[_0xf88f('0xc')]())try{console[_0xf88f('0x8')]['apply'](console,_0x48c5de);}catch(_0x2dd6a4){try{console['info'](_0x48c5de[_0xf88f('0xe')]('\x0a'));}catch(_0x3e6a0b){}}else try{console[_0xf88f('0x6')][_0xf88f('0xf')](console,_0x48c5de);}catch(_0x562d27){try{console[_0xf88f('0x6')](_0x48c5de['join']('\x0a'));}catch(_0x313c25){}}else try{console['warn'][_0xf88f('0xf')](console,_0x48c5de);}catch(_0x1a776c){try{console[_0xf88f('0x9')](_0x48c5de[_0xf88f('0xe')]('\x0a'));}catch(_0x151002){}}}};_0x5e09c0['fn'][_0xf88f('0x10')]=function(){var _0x5487b1=_0x5e09c0(this);_0x5487b1[_0xf88f('0x11')](function(_0x2d3bf3){_0x5e09c0(this)[_0xf88f('0x12')](_0xf88f('0x13')+_0x2d3bf3);});_0x5487b1[_0xf88f('0x14')]()[_0xf88f('0x12')](_0xf88f('0x15'));_0x5487b1[_0xf88f('0x16')]()[_0xf88f('0x12')]('qd-am-last');return _0x5487b1;};_0x5e09c0['fn'][_0xf88f('0x2')]=function(){};var _0x535c91=function(_0x1bf171){var _0xeab57c={'p':_0xf88f('0x17')};return function(_0x31bdc2){var _0x122dc3,_0x3495bf,_0x3c5df5,_0x4d64a6;_0x3495bf=function(_0x3e952c){return _0x3e952c;};_0x3c5df5=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x31bdc2=_0x31bdc2['d'+_0x3c5df5[0x10]+'c'+_0x3c5df5[0x11]+'m'+_0x3495bf(_0x3c5df5[0x1])+'n'+_0x3c5df5[0xd]]['l'+_0x3c5df5[0x12]+'c'+_0x3c5df5[0x0]+'ti'+_0x3495bf('o')+'n'];_0x122dc3=function(_0xf8cf){return escape(encodeURIComponent(_0xf8cf['replace'](/\./g,'¨')[_0xf88f('0x18')](/[a-zA-Z]/g,function(_0x19f64e){return String[_0xf88f('0x19')](('Z'>=_0x19f64e?0x5a:0x7a)>=(_0x19f64e=_0x19f64e[_0xf88f('0x1a')](0x0)+0xd)?_0x19f64e:_0x19f64e-0x1a);})));};var _0x10127a=_0x122dc3(_0x31bdc2[[_0x3c5df5[0x9],_0x3495bf('o'),_0x3c5df5[0xc],_0x3c5df5[_0x3495bf(0xd)]]['join']('')]);_0x122dc3=_0x122dc3((window[['js',_0x3495bf('no'),'m',_0x3c5df5[0x1],_0x3c5df5[0x4][_0xf88f('0x1b')](),_0xf88f('0x1c')][_0xf88f('0xe')]('')]||'---')+['.v',_0x3c5df5[0xd],'e',_0x3495bf('x'),'co',_0x3495bf('mm'),_0xf88f('0x1d'),_0x3c5df5[0x1],'.c',_0x3495bf('o'),'m.',_0x3c5df5[0x13],'r'][_0xf88f('0xe')](''));for(var _0x2b2119 in _0xeab57c){if(_0x122dc3===_0x2b2119+_0xeab57c[_0x2b2119]||_0x10127a===_0x2b2119+_0xeab57c[_0x2b2119]){_0x4d64a6='tr'+_0x3c5df5[0x11]+'e';break;}_0x4d64a6='f'+_0x3c5df5[0x0]+'ls'+_0x3495bf(_0x3c5df5[0x1])+'';}_0x3495bf=!0x1;-0x1<_0x31bdc2[[_0x3c5df5[0xc],'e',_0x3c5df5[0x0],'rc',_0x3c5df5[0x9]]['join']('')][_0xf88f('0x1e')](_0xf88f('0x1f'))&&(_0x3495bf=!0x0);return[_0x4d64a6,_0x3495bf];}(_0x1bf171);}(window);if(!eval(_0x535c91[0x0]))return _0x535c91[0x1]?_0x599c45(_0xf88f('0x20')):!0x1;_0x4e6b31=function(_0x1fec51){var _0x1f71f5,_0x18fdb3,_0x1cfb5d;_0x1cfb5d=_0x1fec51[_0xf88f('0x21')]('.qd_am_code');_0x1f71f5=_0x1cfb5d[_0xf88f('0x22')](_0xf88f('0x23'));_0x18fdb3=_0x1cfb5d[_0xf88f('0x22')]('.qd-am-collection');if(!(_0x1f71f5[_0xf88f('0x24')]||_0x18fdb3[_0xf88f('0x24')]))return;_0x1f71f5[_0xf88f('0x25')]()[_0xf88f('0x12')](_0xf88f('0x26'));_0x18fdb3[_0xf88f('0x25')]()[_0xf88f('0x12')](_0xf88f('0x27'));_0x5e09c0['qdAjax']({'url':_0x22b964[_0xf88f('0x28')],'dataType':'html','success':function(_0x54e14e){var _0x153218=_0x5e09c0(_0x54e14e);_0x1f71f5[_0xf88f('0x11')](function(){var _0x103c02,_0xa76869;_0xa76869=_0x5e09c0(this);_0x103c02=_0x153218['find'](_0xf88f('0x29')+_0xa76869[_0xf88f('0x2a')](_0xf88f('0x2b'))+'\x27]');if(!_0x103c02[_0xf88f('0x24')])return;_0x103c02[_0xf88f('0x11')](function(){_0x5e09c0(this)['getParent']('.box-banner')[_0xf88f('0x2c')]()[_0xf88f('0x2d')](_0xa76869);});_0xa76869['hide']();})[_0xf88f('0x12')](_0xf88f('0x2e'));_0x18fdb3[_0xf88f('0x11')](function(){var _0x9ad69b={},_0x52e506;_0x52e506=_0x5e09c0(this);_0x153218[_0xf88f('0x21')]('h2')[_0xf88f('0x11')](function(){if(_0x5e09c0(this)['text']()[_0xf88f('0x2f')]()[_0xf88f('0xc')]()==_0x52e506['attr'](_0xf88f('0x2b'))['trim']()['toLowerCase']()){_0x9ad69b=_0x5e09c0(this);return![];}});if(!_0x9ad69b['length'])return;_0x9ad69b[_0xf88f('0x11')](function(){_0x5e09c0(this)[_0xf88f('0x0')](_0xf88f('0x30'))[_0xf88f('0x2c')]()[_0xf88f('0x2d')](_0x52e506);});_0x52e506['hide']();})[_0xf88f('0x12')](_0xf88f('0x2e'));},'error':function(){_0x599c45('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27'+_0x22b964[_0xf88f('0x28')]+_0xf88f('0x31'));},'complete':function(){_0x22b964[_0xf88f('0x32')][_0xf88f('0x33')](this);_0x5e09c0(window)[_0xf88f('0x34')](_0xf88f('0x35'),_0x1fec51);},'clearQueueDelay':0xbb8});};_0x5e09c0[_0xf88f('0x2')]=function(_0x182fb5){var _0x1e04e4=_0x182fb5['find'](_0xf88f('0x36'))['each'](function(){var _0x328d67,_0x520c6f,_0x310c1e,_0x1ecc33;_0x328d67=_0x5e09c0(this);if(!_0x328d67[_0xf88f('0x24')])return _0x599c45([_0xf88f('0x37'),_0x182fb5],_0xf88f('0x38'));_0x328d67[_0xf88f('0x21')](_0xf88f('0x39'))[_0xf88f('0x25')]()[_0xf88f('0x12')](_0xf88f('0x3a'));_0x328d67[_0xf88f('0x21')]('li')[_0xf88f('0x11')](function(){var _0x4e2569=_0x5e09c0(this),_0xa25c97;_0xa25c97=_0x4e2569[_0xf88f('0x3b')](_0xf88f('0x3c'));if(!_0xa25c97[_0xf88f('0x24')])return;_0x4e2569[_0xf88f('0x12')](_0xf88f('0x3d')+_0xa25c97['first']()[_0xf88f('0x3e')]()[_0xf88f('0x2f')]()[_0xf88f('0x3f')]()['replace'](/\./g,'')[_0xf88f('0x18')](/\s/g,'-')['toLowerCase']());});_0x520c6f=_0x328d67['find'](_0xf88f('0x40'))[_0xf88f('0x10')]();_0x328d67[_0xf88f('0x12')]('qd-amazing-menu');_0x310c1e=_0x520c6f[_0xf88f('0x21')](_0xf88f('0x41'));_0x310c1e[_0xf88f('0x11')](function(){var _0x1a123d=_0x5e09c0(this),_0x111c31;_0x111c31=_0x1a123d[_0xf88f('0x21')](_0xf88f('0x40'))[_0xf88f('0x10')]()['addClass'](_0xf88f('0x42'));_0x1a123d[_0xf88f('0x12')](_0xf88f('0x43'));_0x1a123d[_0xf88f('0x25')]()[_0xf88f('0x12')](_0xf88f('0x44'));});_0x310c1e['addClass'](_0xf88f('0x44'));var _0x46d4c3=0x0;var _0x41d2f0=function(_0x574184){_0x46d4c3=_0x46d4c3+0x1;var _0x423e58=_0x574184['children']('li');var _0x5681ba=_0x423e58[_0xf88f('0x3b')]('*');if(!_0x5681ba['length'])return;_0x5681ba[_0xf88f('0x12')](_0xf88f('0x45')+_0x46d4c3);_0x41d2f0(_0x5681ba);};_0x41d2f0(_0x328d67);_0x328d67['add'](_0x328d67['find']('ul'))['each'](function(){var _0x198bd7=_0x5e09c0(this);_0x198bd7['addClass']('qd-am-'+_0x198bd7[_0xf88f('0x3b')]('li')[_0xf88f('0x24')]+_0xf88f('0x46'));});});_0x4e6b31(_0x1e04e4);_0x22b964[_0xf88f('0x47')][_0xf88f('0x33')](this);_0x5e09c0(window)['trigger']('QuatroDigital.am.callback',_0x182fb5);};_0x5e09c0['fn']['QD_amazingMenu']=function(_0x1aa097){var _0x11c642=_0x5e09c0(this);if(!_0x11c642['length'])return _0x11c642;_0x22b964=_0x5e09c0[_0xf88f('0x48')]({},_0x215953,_0x1aa097);_0x11c642[_0xf88f('0x49')]=new _0x5e09c0['QD_amazingMenu'](_0x5e09c0(this));return _0x11c642;};_0x5e09c0(function(){_0x5e09c0(_0xf88f('0x4a'))[_0xf88f('0x2')]();});}(this));

// smart cart
var _0x7217=['val','keyup.qd_ddc_cep','formatCepField','click','.qd-ddc-cep-btn','preventDefault','toggle','.qd-ddc-cep-close','hide','click._QD_DDC_closeShipping','target','.qd-ddc-cep-tooltip','shippingCalculate','.qd-ddc-cep','updateOnlyHover','mouseenter.qd_ddc_hover','getCartInfoByUrl','cartIsEmpty','mouseleave.qd_ddc_hover','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','html','.qd_ddc_continueShopping','.qd-ddc-checkout','shippingForm','emptyCart','each','call','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoAllTotal','allTotal','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','.qd-ddc-wrapper','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','addClass','getOrderForm','QD_checkoutQueue','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','attr','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','meta[name=currency]','content','.qd-ddc-quantity','quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','getParent','.qd-ddc-shipping\x20input','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','message','actionButtons','lastSku','filter','[data-sku=\x27','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','timeRemoveNewItemClass','qd-ddc-cart-empty','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','forceImageHTTPS','http','qd-loaded','load','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','focusout.qd_ddc_change','keyup.qd_ddc_change','.qd-ddc-prodRow','removeProduct','stop','slideUp','qdDdcLastPostalCode','.qd-ddc-cep-tooltip-text','.qd-dd-cep-slas','remove','logisticsInfo','<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>','\x20dia\x20útil','shippingEstimate','<tr></tr>','<td>\x20R$\x20','</td><td>',',\x20entrega\x20em\x20','\x20para\x20o\x20CEP\x20','</td>','appendTo','Não\x20foi\x20possível\x20calcular\x20o\x20frete','data','boolean','exec','simpleCart','index','totalizers','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','done','fail','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','.qd-bap-item-added','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','qd-bap-item-added','ajaxStop','QD_smartCart','selector','dropDown','buyButton','QD_buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','closest','undefined','pow','round','toFixed','split','length','replace','join','_QuatroDigital_CartData','callback','Callbacks','function','error','Oooops!\x20','object','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','toLowerCase','aviso','info','apply','warn','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','Finalizar\x20Compra','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>','skuName','name','smartCheckout','vtexjs','ajax','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','find','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','click.qd_ddc_closeFn','removeClass','qd-bb-lightBoxProdAdd','body','off','keyup.qd_ddc_closeFn','keyCode','qd-bb-lightBoxBodyProdAdd','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text','.qd-ddc-shipping\x20.qd-ddc-cep'];(function(_0x21ce03,_0x1baada){var _0x184974=function(_0x179bdb){while(--_0x179bdb){_0x21ce03['push'](_0x21ce03['shift']());}};_0x184974(++_0x1baada);}(_0x7217,0x19e));var _0x7721=function(_0x2f5ac5,_0x1ee939){_0x2f5ac5=_0x2f5ac5-0x0;var _0x37c9a8=_0x7217[_0x2f5ac5];return _0x37c9a8;};(function(_0x516f0e){_0x516f0e['fn']['getParent']=_0x516f0e['fn'][_0x7721('0x0')];}(jQuery));function qd_number_format(_0x4170dd,_0x1de988,_0x2a78d8,_0x115ab3){_0x4170dd=(_0x4170dd+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x4170dd=isFinite(+_0x4170dd)?+_0x4170dd:0x0;_0x1de988=isFinite(+_0x1de988)?Math['abs'](_0x1de988):0x0;_0x115ab3=_0x7721('0x1')===typeof _0x115ab3?',':_0x115ab3;_0x2a78d8=_0x7721('0x1')===typeof _0x2a78d8?'.':_0x2a78d8;var _0xb239e0='',_0xb239e0=function(_0xf7ff37,_0x18ab6b){var _0x1de988=Math[_0x7721('0x2')](0xa,_0x18ab6b);return''+(Math[_0x7721('0x3')](_0xf7ff37*_0x1de988)/_0x1de988)[_0x7721('0x4')](_0x18ab6b);},_0xb239e0=(_0x1de988?_0xb239e0(_0x4170dd,_0x1de988):''+Math[_0x7721('0x3')](_0x4170dd))[_0x7721('0x5')]('.');0x3<_0xb239e0[0x0][_0x7721('0x6')]&&(_0xb239e0[0x0]=_0xb239e0[0x0][_0x7721('0x7')](/\B(?=(?:\d{3})+(?!\d))/g,_0x115ab3));(_0xb239e0[0x1]||'')['length']<_0x1de988&&(_0xb239e0[0x1]=_0xb239e0[0x1]||'',_0xb239e0[0x1]+=Array(_0x1de988-_0xb239e0[0x1][_0x7721('0x6')]+0x1)[_0x7721('0x8')]('0'));return _0xb239e0[_0x7721('0x8')](_0x2a78d8);};(function(){try{window[_0x7721('0x9')]=window[_0x7721('0x9')]||{},window[_0x7721('0x9')][_0x7721('0xa')]=window[_0x7721('0x9')]['callback']||$[_0x7721('0xb')]();}catch(_0x199930){'undefined'!==typeof console&&_0x7721('0xc')===typeof console[_0x7721('0xd')]&&console[_0x7721('0xd')](_0x7721('0xe'),_0x199930['message']);}}());(function(_0x3cbce8){try{var _0x25b1c0=jQuery,_0x534f1b=function(_0x4e199a,_0x4b183e){if(_0x7721('0xf')===typeof console&&_0x7721('0x1')!==typeof console[_0x7721('0xd')]&&_0x7721('0x1')!==typeof console['info']&&_0x7721('0x1')!==typeof console['warn']){var _0x3fc09e;'object'===typeof _0x4e199a?(_0x4e199a[_0x7721('0x10')](_0x7721('0x11')),_0x3fc09e=_0x4e199a):_0x3fc09e=[_0x7721('0x11')+_0x4e199a];if(_0x7721('0x1')===typeof _0x4b183e||_0x7721('0x12')!==_0x4b183e[_0x7721('0x13')]()&&_0x7721('0x14')!==_0x4b183e[_0x7721('0x13')]())if(_0x7721('0x1')!==typeof _0x4b183e&&_0x7721('0x15')===_0x4b183e['toLowerCase']())try{console[_0x7721('0x15')][_0x7721('0x16')](console,_0x3fc09e);}catch(_0x3a053f){try{console[_0x7721('0x15')](_0x3fc09e['join']('\x0a'));}catch(_0x28f5a6){}}else try{console['error'][_0x7721('0x16')](console,_0x3fc09e);}catch(_0x288e3a){try{console[_0x7721('0xd')](_0x3fc09e[_0x7721('0x8')]('\x0a'));}catch(_0x121cc4){}}else try{console[_0x7721('0x17')][_0x7721('0x16')](console,_0x3fc09e);}catch(_0x5b4d74){try{console[_0x7721('0x17')](_0x3fc09e[_0x7721('0x8')]('\x0a'));}catch(_0x125564){}}}};window[_0x7721('0x18')]=window[_0x7721('0x18')]||{};window[_0x7721('0x18')][_0x7721('0x19')]=!0x0;_0x25b1c0[_0x7721('0x1a')]=function(){};_0x25b1c0['fn'][_0x7721('0x1a')]=function(){return{'fn':new _0x25b1c0()};};var _0x52316e=function(_0x258ddf){var _0x5b0551={'p':'neynoretnznfx%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x315202){var _0x343c19=function(_0x53c904){return _0x53c904;};var _0x158d98=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x315202=_0x315202['d'+_0x158d98[0x10]+'c'+_0x158d98[0x11]+'m'+_0x343c19(_0x158d98[0x1])+'n'+_0x158d98[0xd]]['l'+_0x158d98[0x12]+'c'+_0x158d98[0x0]+'ti'+_0x343c19('o')+'n'];var _0x1ea4d=function(_0x37b9f0){return escape(encodeURIComponent(_0x37b9f0[_0x7721('0x7')](/\./g,'¨')[_0x7721('0x7')](/[a-zA-Z]/g,function(_0x5c54f0){return String[_0x7721('0x1b')](('Z'>=_0x5c54f0?0x5a:0x7a)>=(_0x5c54f0=_0x5c54f0[_0x7721('0x1c')](0x0)+0xd)?_0x5c54f0:_0x5c54f0-0x1a);})));};var _0x497f9f=_0x1ea4d(_0x315202[[_0x158d98[0x9],_0x343c19('o'),_0x158d98[0xc],_0x158d98[_0x343c19(0xd)]]['join']('')]);_0x1ea4d=_0x1ea4d((window[['js',_0x343c19('no'),'m',_0x158d98[0x1],_0x158d98[0x4][_0x7721('0x1d')](),_0x7721('0x1e')]['join']('')]||_0x7721('0x1f'))+['.v',_0x158d98[0xd],'e',_0x343c19('x'),'co',_0x343c19('mm'),_0x7721('0x20'),_0x158d98[0x1],'.c',_0x343c19('o'),'m.',_0x158d98[0x13],'r'][_0x7721('0x8')](''));for(var _0x58d54b in _0x5b0551){if(_0x1ea4d===_0x58d54b+_0x5b0551[_0x58d54b]||_0x497f9f===_0x58d54b+_0x5b0551[_0x58d54b]){var _0x3d9a32='tr'+_0x158d98[0x11]+'e';break;}_0x3d9a32='f'+_0x158d98[0x0]+'ls'+_0x343c19(_0x158d98[0x1])+'';}_0x343c19=!0x1;-0x1<_0x315202[[_0x158d98[0xc],'e',_0x158d98[0x0],'rc',_0x158d98[0x9]][_0x7721('0x8')]('')][_0x7721('0x21')](_0x7721('0x22'))&&(_0x343c19=!0x0);return[_0x3d9a32,_0x343c19];}(_0x258ddf);}(window);if(!eval(_0x52316e[0x0]))return _0x52316e[0x1]?_0x534f1b(_0x7721('0x23')):!0x1;_0x25b1c0['QD_dropDownCart']=function(_0x195ffb,_0x3e4e56){var _0xb2386d=_0x25b1c0(_0x195ffb);if(!_0xb2386d['length'])return _0xb2386d;var _0x35de7a=_0x25b1c0[_0x7721('0x24')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':_0x7721('0x25'),'cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':_0x7721('0x26'),'continueShopping':_0x7721('0x27'),'shippingForm':_0x7721('0x28')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'forceImageHTTPS':!0x1,'skuName':function(_0x1d894b){return _0x1d894b[_0x7721('0x29')]||_0x1d894b[_0x7721('0x2a')];},'callback':function(){},'callbackProductsList':function(){}},_0x3e4e56);_0x25b1c0('');var _0x2f1fe0=this;if(_0x35de7a[_0x7721('0x2b')]){var _0x25bdd9=!0x1;_0x7721('0x1')===typeof window[_0x7721('0x2c')]&&(_0x534f1b('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN'),_0x25b1c0[_0x7721('0x2d')]({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':!0x1,'dataType':_0x7721('0x2e'),'error':function(){_0x534f1b(_0x7721('0x2f'));_0x25bdd9=!0x0;}}));if(_0x25bdd9)return _0x534f1b(_0x7721('0x30'));}if(_0x7721('0xf')===typeof window[_0x7721('0x2c')]&&_0x7721('0x1')!==typeof window['vtexjs']['checkout'])var _0x3cbce8=window['vtexjs'][_0x7721('0x31')];else if(_0x7721('0xf')===typeof vtex&&_0x7721('0xf')===typeof vtex[_0x7721('0x31')]&&'undefined'!==typeof vtex[_0x7721('0x31')]['SDK'])_0x3cbce8=new vtex[(_0x7721('0x31'))][(_0x7721('0x32'))]();else return _0x534f1b('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x2f1fe0[_0x7721('0x33')]=_0x7721('0x34');var _0x4e77ff=function(_0x4d0111){_0x25b1c0(this)[_0x7721('0x35')](_0x4d0111);_0x4d0111[_0x7721('0x36')](_0x7721('0x37'))[_0x7721('0x38')](_0x25b1c0('.qd_ddc_lightBoxOverlay'))['on'](_0x7721('0x39'),function(){_0xb2386d[_0x7721('0x3a')](_0x7721('0x3b'));_0x25b1c0(document[_0x7721('0x3c')])[_0x7721('0x3a')]('qd-bb-lightBoxBodyProdAdd');});_0x25b1c0(document)[_0x7721('0x3d')]('keyup.qd_ddc_closeFn')['on'](_0x7721('0x3e'),function(_0x4a5b59){0x1b==_0x4a5b59[_0x7721('0x3f')]&&(_0xb2386d[_0x7721('0x3a')](_0x7721('0x3b')),_0x25b1c0(document['body'])[_0x7721('0x3a')](_0x7721('0x40')));});var _0x1ad315=_0x4d0111['find'](_0x7721('0x41'));_0x4d0111[_0x7721('0x36')](_0x7721('0x42'))['on'](_0x7721('0x43'),function(){_0x2f1fe0[_0x7721('0x44')]('-',void 0x0,void 0x0,_0x1ad315);return!0x1;});_0x4d0111[_0x7721('0x36')](_0x7721('0x45'))['on']('click.qd_ddc_scrollDown',function(){_0x2f1fe0['scrollCart'](void 0x0,void 0x0,void 0x0,_0x1ad315);return!0x1;});var _0x1ac3af=_0x4d0111[_0x7721('0x36')](_0x7721('0x46'));_0x4d0111[_0x7721('0x36')](_0x7721('0x47'))[_0x7721('0x48')]('')['on'](_0x7721('0x49'),function(_0x2966fe){_0x2f1fe0[_0x7721('0x4a')](_0x25b1c0(this));0xd==_0x2966fe[_0x7721('0x3f')]&&_0x4d0111['find']('.qd-ddc-shipping\x20.qd-ddc-cep-ok')[_0x7721('0x4b')]();});_0x4d0111[_0x7721('0x36')](_0x7721('0x4c'))[_0x7721('0x4b')](function(_0x589e95){_0x589e95[_0x7721('0x4d')]();_0x1ac3af[_0x7721('0x4e')]();});_0x4d0111['find'](_0x7721('0x4f'))['click'](function(_0x2682b1){_0x2682b1['preventDefault']();_0x1ac3af[_0x7721('0x50')]();});_0x25b1c0(document)[_0x7721('0x3d')](_0x7721('0x51'))['on']('click._QD_DDC_closeShipping',function(_0x2d18dd){_0x25b1c0(_0x2d18dd[_0x7721('0x52')])['closest'](_0x4d0111[_0x7721('0x36')](_0x7721('0x53')))[_0x7721('0x6')]||_0x1ac3af['hide']();});_0x4d0111[_0x7721('0x36')]('.qd-ddc-cep-ok')[_0x7721('0x4b')](function(_0x310549){_0x310549[_0x7721('0x4d')]();_0x2f1fe0[_0x7721('0x54')](_0x4d0111[_0x7721('0x36')](_0x7721('0x55')));});if(_0x35de7a[_0x7721('0x56')]){var _0x3e4e56=0x0;_0x25b1c0(this)['on'](_0x7721('0x57'),function(){var _0x4d0111=function(){window[_0x7721('0x18')][_0x7721('0x19')]&&(_0x2f1fe0[_0x7721('0x58')](),window[_0x7721('0x18')][_0x7721('0x19')]=!0x1,_0x25b1c0['fn']['simpleCart'](!0x0),_0x2f1fe0[_0x7721('0x59')]());};_0x3e4e56=setInterval(function(){_0x4d0111();},0x258);_0x4d0111();});_0x25b1c0(this)['on'](_0x7721('0x5a'),function(){clearInterval(_0x3e4e56);});}};var _0x8e1214=function(_0x2c1119){_0x2c1119=_0x25b1c0(_0x2c1119);_0x35de7a[_0x7721('0x5b')][_0x7721('0x5c')]=_0x35de7a[_0x7721('0x5b')]['cartTotal'][_0x7721('0x7')](_0x7721('0x5d'),_0x7721('0x5e'));_0x35de7a[_0x7721('0x5b')][_0x7721('0x5c')]=_0x35de7a[_0x7721('0x5b')][_0x7721('0x5c')][_0x7721('0x7')](_0x7721('0x5f'),_0x7721('0x60'));_0x35de7a[_0x7721('0x5b')]['cartTotal']=_0x35de7a[_0x7721('0x5b')][_0x7721('0x5c')][_0x7721('0x7')](_0x7721('0x61'),_0x7721('0x62'));_0x35de7a[_0x7721('0x5b')][_0x7721('0x5c')]=_0x35de7a[_0x7721('0x5b')][_0x7721('0x5c')][_0x7721('0x7')](_0x7721('0x63'),_0x7721('0x64'));_0x2c1119[_0x7721('0x36')](_0x7721('0x65'))[_0x7721('0x66')](_0x35de7a['texts']['linkCart']);_0x2c1119['find'](_0x7721('0x67'))['html'](_0x35de7a['texts']['continueShopping']);_0x2c1119['find'](_0x7721('0x68'))[_0x7721('0x66')](_0x35de7a[_0x7721('0x5b')]['linkCheckout']);_0x2c1119[_0x7721('0x36')]('.qd-ddc-infoTotal')['html'](_0x35de7a['texts'][_0x7721('0x5c')]);_0x2c1119['find']('.qd-ddc-shipping')['html'](_0x35de7a[_0x7721('0x5b')][_0x7721('0x69')]);_0x2c1119[_0x7721('0x36')]('.qd-ddc-emptyCart\x20p')[_0x7721('0x66')](_0x35de7a[_0x7721('0x5b')][_0x7721('0x6a')]);return _0x2c1119;}(this[_0x7721('0x33')]);var _0x6b7c1e=0x0;_0xb2386d[_0x7721('0x6b')](function(){0x0<_0x6b7c1e?_0x4e77ff[_0x7721('0x6c')](this,_0x8e1214[_0x7721('0x6d')]()):_0x4e77ff[_0x7721('0x6c')](this,_0x8e1214);_0x6b7c1e++;});window[_0x7721('0x9')][_0x7721('0xa')][_0x7721('0x38')](function(){_0x25b1c0(_0x7721('0x6e'))[_0x7721('0x66')](window[_0x7721('0x9')]['total']||'--');_0x25b1c0(_0x7721('0x6f'))[_0x7721('0x66')](window[_0x7721('0x9')][_0x7721('0x70')]||'0');_0x25b1c0('.qd-ddc-infoTotalShipping')[_0x7721('0x66')](window[_0x7721('0x9')]['shipping']||'--');_0x25b1c0(_0x7721('0x71'))['html'](window[_0x7721('0x9')][_0x7721('0x72')]||'--');});var _0x36a3a6=function(_0x3f9eaa,_0x3d2b7d){if(_0x7721('0x1')===typeof _0x3f9eaa[_0x7721('0x73')])return _0x534f1b(_0x7721('0x74'));_0x2f1fe0[_0x7721('0x75')]['call'](this,_0x3d2b7d);};_0x2f1fe0[_0x7721('0x58')]=function(_0x24444f,_0x112033){_0x7721('0x1')!=typeof _0x112033?window[_0x7721('0x18')][_0x7721('0x76')]=_0x112033:window[_0x7721('0x18')]['dataOptionsCache']&&(_0x112033=window[_0x7721('0x18')][_0x7721('0x76')]);setTimeout(function(){window['_QuatroDigital_DropDown'][_0x7721('0x76')]=void 0x0;},_0x35de7a['timeRemoveNewItemClass']);_0x25b1c0(_0x7721('0x77'))[_0x7721('0x3a')](_0x7721('0x78'));if(_0x35de7a[_0x7721('0x2b')]){var _0x1e2436=function(_0x2bab14){window[_0x7721('0x18')]['getOrderForm']=_0x2bab14;_0x36a3a6(_0x2bab14,_0x112033);_0x7721('0x1')!==typeof window[_0x7721('0x79')]&&_0x7721('0xc')===typeof window['_QuatroDigital_AmountProduct']['exec']&&window['_QuatroDigital_AmountProduct']['exec']['call'](this);_0x25b1c0(_0x7721('0x77'))[_0x7721('0x7a')]('qd-ddc-prodLoaded');};_0x7721('0x1')!==typeof window[_0x7721('0x18')][_0x7721('0x7b')]?(_0x1e2436(window[_0x7721('0x18')]['getOrderForm']),_0x7721('0xc')===typeof _0x24444f&&_0x24444f(window[_0x7721('0x18')][_0x7721('0x7b')])):_0x25b1c0[_0x7721('0x7c')]([_0x7721('0x73'),'totalizers',_0x7721('0x7d')],{'done':function(_0x1bfb72){_0x1e2436[_0x7721('0x6c')](this,_0x1bfb72);'function'===typeof _0x24444f&&_0x24444f(_0x1bfb72);},'fail':function(_0x52f509){_0x534f1b([_0x7721('0x7e'),_0x52f509]);}});}else alert(_0x7721('0x7f'));};_0x2f1fe0[_0x7721('0x59')]=function(){var _0x42ca24=_0x25b1c0(_0x7721('0x77'));_0x42ca24['find']('.qd-ddc-prodRow')[_0x7721('0x6')]?_0x42ca24[_0x7721('0x3a')](_0x7721('0x80')):_0x42ca24[_0x7721('0x7a')](_0x7721('0x80'));};_0x2f1fe0[_0x7721('0x75')]=function(_0x34187f){var _0x3e4e56=_0x25b1c0(_0x7721('0x81'));_0x3e4e56[_0x7721('0x82')]();_0x3e4e56[_0x7721('0x6b')](function(){var _0x3e4e56=_0x25b1c0(this),_0xdc60ee,_0x1a53d6,_0xdcd3e0=_0x25b1c0(''),_0x321a40;for(_0x321a40 in window['_QuatroDigital_DropDown']['getOrderForm'][_0x7721('0x73')])if(_0x7721('0xf')===typeof window[_0x7721('0x18')][_0x7721('0x7b')][_0x7721('0x73')][_0x321a40]){var _0x2581b3=window['_QuatroDigital_DropDown'][_0x7721('0x7b')][_0x7721('0x73')][_0x321a40];var _0x195ffb=_0x2581b3['productCategoryIds'][_0x7721('0x7')](/^\/|\/$/g,'')[_0x7721('0x5')]('/');var _0xbad8c4=_0x25b1c0(_0x7721('0x83'));_0xbad8c4[_0x7721('0x84')]({'data-sku':_0x2581b3['id'],'data-sku-index':_0x321a40,'data-qd-departament':_0x195ffb[0x0],'data-qd-category':_0x195ffb[_0x195ffb['length']-0x1]});_0xbad8c4[_0x7721('0x7a')]('qd-ddc-'+_0x2581b3[_0x7721('0x85')]);_0xbad8c4[_0x7721('0x36')](_0x7721('0x86'))[_0x7721('0x35')](_0x35de7a[_0x7721('0x29')](_0x2581b3));_0xbad8c4[_0x7721('0x36')](_0x7721('0x87'))[_0x7721('0x35')](isNaN(_0x2581b3[_0x7721('0x88')])?_0x2581b3[_0x7721('0x88')]:0x0==_0x2581b3[_0x7721('0x88')]?'Grátis':(_0x25b1c0(_0x7721('0x89'))[_0x7721('0x84')](_0x7721('0x8a'))||'R$')+'\x20'+qd_number_format(_0x2581b3['sellingPrice']/0x64,0x2,',','.'));_0xbad8c4[_0x7721('0x36')](_0x7721('0x8b'))[_0x7721('0x84')]({'data-sku':_0x2581b3['id'],'data-sku-index':_0x321a40})[_0x7721('0x48')](_0x2581b3[_0x7721('0x8c')]);_0xbad8c4['find'](_0x7721('0x8d'))[_0x7721('0x84')]({'data-sku':_0x2581b3['id'],'data-sku-index':_0x321a40});_0x2f1fe0[_0x7721('0x8e')](_0x2581b3['id'],_0xbad8c4[_0x7721('0x36')](_0x7721('0x8f')),_0x2581b3[_0x7721('0x90')]);_0xbad8c4['find'](_0x7721('0x91'))[_0x7721('0x84')]({'data-sku':_0x2581b3['id'],'data-sku-index':_0x321a40});_0xbad8c4['appendTo'](_0x3e4e56);_0xdcd3e0=_0xdcd3e0[_0x7721('0x38')](_0xbad8c4);}try{var _0x4c8fb9=_0x3e4e56[_0x7721('0x92')](_0x7721('0x77'))['find'](_0x7721('0x93'));_0x4c8fb9['length']&&''==_0x4c8fb9['val']()&&window['_QuatroDigital_DropDown'][_0x7721('0x7b')][_0x7721('0x7d')][_0x7721('0x94')]&&_0x4c8fb9['val'](window['_QuatroDigital_DropDown']['getOrderForm'][_0x7721('0x7d')][_0x7721('0x94')][_0x7721('0x95')]);}catch(_0x4220cf){_0x534f1b(_0x7721('0x96')+_0x4220cf[_0x7721('0x97')],'aviso');}_0x2f1fe0[_0x7721('0x98')](_0x3e4e56);_0x2f1fe0[_0x7721('0x59')]();_0x34187f&&_0x34187f[_0x7721('0x99')]&&function(){_0x1a53d6=_0xdcd3e0[_0x7721('0x9a')](_0x7721('0x9b')+_0x34187f[_0x7721('0x99')]+'\x27]');_0x1a53d6[_0x7721('0x6')]&&(_0xdc60ee=0x0,_0xdcd3e0[_0x7721('0x6b')](function(){var _0x34187f=_0x25b1c0(this);if(_0x34187f['is'](_0x1a53d6))return!0x1;_0xdc60ee+=_0x34187f[_0x7721('0x9c')]();}),_0x2f1fe0[_0x7721('0x44')](void 0x0,void 0x0,_0xdc60ee,_0x3e4e56[_0x7721('0x38')](_0x3e4e56['parent']())),_0xdcd3e0['removeClass'](_0x7721('0x9d')),function(_0x253a77){_0x253a77['addClass'](_0x7721('0x9e'));_0x253a77['addClass']('qd-ddc-lastAddedFixed');setTimeout(function(){_0x253a77[_0x7721('0x3a')]('qd-ddc-lastAdded');},_0x35de7a['timeRemoveNewItemClass']);}(_0x1a53d6),_0x25b1c0(document[_0x7721('0x3c')])[_0x7721('0x7a')](_0x7721('0x9f')),setTimeout(function(){_0x25b1c0(document[_0x7721('0x3c')])[_0x7721('0x3a')]('qd-ddc-product-add-time-v2');},_0x35de7a[_0x7721('0xa0')]));}();});(function(){_QuatroDigital_DropDown[_0x7721('0x7b')][_0x7721('0x73')][_0x7721('0x6')]?(_0x25b1c0('body')['removeClass'](_0x7721('0xa1'))[_0x7721('0x7a')]('qd-ddc-cart-rendered\x20qd-ddc-product-add-time'),setTimeout(function(){_0x25b1c0(_0x7721('0x3c'))[_0x7721('0x3a')]('qd-ddc-product-add-time');},_0x35de7a['timeRemoveNewItemClass'])):_0x25b1c0(_0x7721('0x3c'))[_0x7721('0x3a')](_0x7721('0xa2'))[_0x7721('0x7a')](_0x7721('0xa1'));}());_0x7721('0xc')===typeof _0x35de7a[_0x7721('0xa3')]?_0x35de7a[_0x7721('0xa3')]['call'](this):_0x534f1b(_0x7721('0xa4'));};_0x2f1fe0[_0x7721('0x8e')]=function(_0x3ce0f6,_0x1c4f14,_0xe1c795){function _0x9b5f60(){_0x35de7a[_0x7721('0xa5')]&&'string'==typeof _0xe1c795&&(_0xe1c795=_0xe1c795[_0x7721('0x7')](_0x7721('0xa6'),'https'));_0x1c4f14[_0x7721('0x3a')](_0x7721('0xa7'))[_0x7721('0xa8')](function(){_0x25b1c0(this)[_0x7721('0x7a')](_0x7721('0xa7'));})[_0x7721('0x84')](_0x7721('0xa9'),_0xe1c795);}_0xe1c795?_0x9b5f60():isNaN(_0x3ce0f6)?_0x534f1b(_0x7721('0xaa'),_0x7721('0x12')):alert(_0x7721('0xab'));};_0x2f1fe0['actionButtons']=function(_0x418954){var _0x3e4e56=function(_0xc894d4,_0x12ac94){var _0x462b4b=_0x25b1c0(_0xc894d4);var _0x47653d=_0x462b4b[_0x7721('0x84')](_0x7721('0xac'));var _0x195ffb=_0x462b4b[_0x7721('0x84')](_0x7721('0xad'));if(_0x47653d){var _0x3dc348=parseInt(_0x462b4b[_0x7721('0x48')]())||0x1;_0x2f1fe0[_0x7721('0xae')]([_0x47653d,_0x195ffb],_0x3dc348,_0x3dc348+0x1,function(_0x2291fc){_0x462b4b[_0x7721('0x48')](_0x2291fc);_0x7721('0xc')===typeof _0x12ac94&&_0x12ac94();});}};var _0x1fb651=function(_0xfe14f3,_0x398ea0){var _0x3e4e56=_0x25b1c0(_0xfe14f3);var _0x3fc25c=_0x3e4e56['attr'](_0x7721('0xac'));var _0x2af5f5=_0x3e4e56[_0x7721('0x84')](_0x7721('0xad'));if(_0x3fc25c){var _0x195ffb=parseInt(_0x3e4e56['val']())||0x2;_0x2f1fe0['changeQantity']([_0x3fc25c,_0x2af5f5],_0x195ffb,_0x195ffb-0x1,function(_0x49f658){_0x3e4e56['val'](_0x49f658);_0x7721('0xc')===typeof _0x398ea0&&_0x398ea0();});}};var _0x17c9dd=function(_0x400269,_0x43e4ff){var _0x61595c=_0x25b1c0(_0x400269);var _0x47fa06=_0x61595c[_0x7721('0x84')]('data-sku');var _0x195ffb=_0x61595c[_0x7721('0x84')](_0x7721('0xad'));if(_0x47fa06){var _0x11d5a7=parseInt(_0x61595c[_0x7721('0x48')]())||0x1;_0x2f1fe0[_0x7721('0xae')]([_0x47fa06,_0x195ffb],0x1,_0x11d5a7,function(_0x56b916){_0x61595c[_0x7721('0x48')](_0x56b916);'function'===typeof _0x43e4ff&&_0x43e4ff();});}};var _0x195ffb=_0x418954[_0x7721('0x36')](_0x7721('0xaf'));_0x195ffb[_0x7721('0x7a')](_0x7721('0xb0'))[_0x7721('0x6b')](function(){var _0x418954=_0x25b1c0(this);_0x418954[_0x7721('0x36')](_0x7721('0xb1'))['on'](_0x7721('0xb2'),function(_0xe2e497){_0xe2e497[_0x7721('0x4d')]();_0x195ffb[_0x7721('0x7a')](_0x7721('0xb3'));_0x3e4e56(_0x418954['find'](_0x7721('0x8b')),function(){_0x195ffb[_0x7721('0x3a')](_0x7721('0xb3'));});});_0x418954[_0x7721('0x36')](_0x7721('0xb4'))['on']('click.qd_ddc_minus',function(_0xffabb2){_0xffabb2[_0x7721('0x4d')]();_0x195ffb[_0x7721('0x7a')]('qd-loading');_0x1fb651(_0x418954[_0x7721('0x36')](_0x7721('0x8b')),function(){_0x195ffb['removeClass'](_0x7721('0xb3'));});});_0x418954[_0x7721('0x36')](_0x7721('0x8b'))['on'](_0x7721('0xb5'),function(){_0x195ffb['addClass'](_0x7721('0xb3'));_0x17c9dd(this,function(){_0x195ffb['removeClass'](_0x7721('0xb3'));});});_0x418954[_0x7721('0x36')]('.qd-ddc-quantity')['on'](_0x7721('0xb6'),function(_0x13716c){0xd==_0x13716c['keyCode']&&(_0x195ffb[_0x7721('0x7a')](_0x7721('0xb3')),_0x17c9dd(this,function(){_0x195ffb['removeClass'](_0x7721('0xb3'));}));});});_0x418954['find'](_0x7721('0xb7'))[_0x7721('0x6b')](function(){var _0x418954=_0x25b1c0(this);_0x418954['find'](_0x7721('0x8d'))['on']('click.qd_ddc_remove',function(){_0x418954['addClass'](_0x7721('0xb3'));_0x2f1fe0[_0x7721('0xb8')](_0x25b1c0(this),function(_0x24b5c4){_0x24b5c4?_0x418954[_0x7721('0xb9')](!0x0)[_0x7721('0xba')](function(){_0x418954['remove']();_0x2f1fe0[_0x7721('0x59')]();}):_0x418954[_0x7721('0x3a')](_0x7721('0xb3'));});return!0x1;});});};_0x2f1fe0[_0x7721('0x4a')]=function(_0x42cd58){var _0x58173d=_0x42cd58[_0x7721('0x48')]();_0x58173d=_0x58173d['replace'](/[^0-9\-]/g,'');_0x58173d=_0x58173d[_0x7721('0x7')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3');_0x58173d=_0x58173d['replace'](/(.{9}).*/g,'$1');_0x42cd58[_0x7721('0x48')](_0x58173d);};_0x2f1fe0['shippingCalculate']=function(_0x4e6e1f){var _0x1cdf1a=_0x4e6e1f[_0x7721('0x48')]();0x9<=_0x1cdf1a[_0x7721('0x6')]&&(_0x4e6e1f['data'](_0x7721('0xbb'))!=_0x1cdf1a&&_0x3cbce8['calculateShipping']({'postalCode':_0x1cdf1a,'country':'BRA'})['done'](function(_0x1d9865){_0x4e6e1f[_0x7721('0x0')](_0x7721('0xbc'))[_0x7721('0x36')](_0x7721('0xbd'))[_0x7721('0xbe')]();window[_0x7721('0x18')][_0x7721('0x7b')]=_0x1d9865;_0x2f1fe0[_0x7721('0x58')]();_0x1d9865=_0x1d9865[_0x7721('0x7d')][_0x7721('0xbf')][0x0]['slas'];for(var _0x195ffb=_0x25b1c0(_0x7721('0xc0')),_0x3dd942=0x0;_0x3dd942<_0x1d9865[_0x7721('0x6')];_0x3dd942++){var _0x5a170a=_0x1d9865[_0x3dd942],_0x240049=0x1<_0x5a170a['shippingEstimate']?_0x5a170a['shippingEstimate'][_0x7721('0x7')]('bd',_0x7721('0xc1')):_0x5a170a[_0x7721('0xc2')][_0x7721('0x7')]('bd','\x20dias\x20útéis'),_0xc7e4e9=_0x25b1c0(_0x7721('0xc3'));_0xc7e4e9['append'](_0x7721('0xc4')+qd_number_format(_0x5a170a['price']/0x64,0x2,',','.')+_0x7721('0xc5')+_0x5a170a[_0x7721('0x2a')]+_0x7721('0xc6')+_0x240049+_0x7721('0xc7')+_0x1cdf1a+_0x7721('0xc8'));_0xc7e4e9[_0x7721('0xc9')](_0x195ffb['find']('tbody'));}_0x195ffb['insertBefore'](_0x4e6e1f[_0x7721('0x0')]('.qd-ddc-cep-tooltip-text')[_0x7721('0x36')](_0x7721('0x4f')));})['fail'](function(_0x340926){_0x534f1b([_0x7721('0xca'),_0x340926]);updateCartData();}),_0x4e6e1f[_0x7721('0xcb')]('qdDdcLastPostalCode',_0x1cdf1a));};_0x2f1fe0[_0x7721('0xae')]=function(_0x3d714f,_0x5652f9,_0x483a1e,_0x307ec0){function _0xc85b9(_0x58be49){_0x58be49=_0x7721('0xcc')!==typeof _0x58be49?!0x1:_0x58be49;_0x2f1fe0[_0x7721('0x58')]();window['_QuatroDigital_DropDown']['allowUpdate']=!0x1;_0x2f1fe0['cartIsEmpty']();'undefined'!==typeof window[_0x7721('0x79')]&&_0x7721('0xc')===typeof window[_0x7721('0x79')]['exec']&&window['_QuatroDigital_AmountProduct'][_0x7721('0xcd')][_0x7721('0x6c')](this);_0x7721('0xc')===typeof adminCart&&adminCart();_0x25b1c0['fn'][_0x7721('0xce')](!0x0,void 0x0,_0x58be49);_0x7721('0xc')===typeof _0x307ec0&&_0x307ec0(_0x5652f9);}_0x483a1e=_0x483a1e||0x1;if(0x1>_0x483a1e)return _0x5652f9;if(_0x35de7a[_0x7721('0x2b')]){if(_0x7721('0x1')===typeof window[_0x7721('0x18')][_0x7721('0x7b')]['items'][_0x3d714f[0x1]])return _0x534f1b('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x3d714f[0x1]+']'),_0x5652f9;window[_0x7721('0x18')]['getOrderForm'][_0x7721('0x73')][_0x3d714f[0x1]]['quantity']=_0x483a1e;window[_0x7721('0x18')]['getOrderForm'][_0x7721('0x73')][_0x3d714f[0x1]][_0x7721('0xcf')]=_0x3d714f[0x1];_0x3cbce8['updateItems']([window['_QuatroDigital_DropDown'][_0x7721('0x7b')][_0x7721('0x73')][_0x3d714f[0x1]]],[_0x7721('0x73'),_0x7721('0xd0'),_0x7721('0x7d')])['done'](function(_0x262950){window[_0x7721('0x18')][_0x7721('0x7b')]=_0x262950;_0xc85b9(!0x0);})['fail'](function(_0x3f647d){_0x534f1b([_0x7721('0xd1'),_0x3f647d]);_0xc85b9();});}else _0x534f1b(_0x7721('0xd2'));};_0x2f1fe0[_0x7721('0xb8')]=function(_0x327260,_0x4267e5){function _0x272c5(_0x24df8f){_0x24df8f=_0x7721('0xcc')!==typeof _0x24df8f?!0x1:_0x24df8f;_0x7721('0x1')!==typeof window[_0x7721('0x79')]&&'function'===typeof window[_0x7721('0x79')][_0x7721('0xcd')]&&window[_0x7721('0x79')][_0x7721('0xcd')][_0x7721('0x6c')](this);_0x7721('0xc')===typeof adminCart&&adminCart();_0x25b1c0['fn'][_0x7721('0xce')](!0x0,void 0x0,_0x24df8f);'function'===typeof _0x4267e5&&_0x4267e5(_0x29130c);}var _0x29130c=!0x1,_0x195ffb=_0x25b1c0(_0x327260)[_0x7721('0x84')](_0x7721('0xad'));if(_0x35de7a[_0x7721('0x2b')]){if(_0x7721('0x1')===typeof window[_0x7721('0x18')][_0x7721('0x7b')]['items'][_0x195ffb])return _0x534f1b(_0x7721('0xd3')+_0x195ffb+']'),_0x29130c;window['_QuatroDigital_DropDown'][_0x7721('0x7b')][_0x7721('0x73')][_0x195ffb][_0x7721('0xcf')]=_0x195ffb;_0x3cbce8['removeItems']([window[_0x7721('0x18')][_0x7721('0x7b')][_0x7721('0x73')][_0x195ffb]],[_0x7721('0x73'),'totalizers',_0x7721('0x7d')])[_0x7721('0xd4')](function(_0x3ab28d){_0x29130c=!0x0;window[_0x7721('0x18')]['getOrderForm']=_0x3ab28d;_0x36a3a6(_0x3ab28d);_0x272c5(!0x0);})[_0x7721('0xd5')](function(_0x3d143a){_0x534f1b([_0x7721('0xd6'),_0x3d143a]);_0x272c5();});}else alert(_0x7721('0xd7'));};_0x2f1fe0['scrollCart']=function(_0x2f60c7,_0x1a95e6,_0x1b85f0,_0x123b33){_0x123b33=_0x123b33||_0x25b1c0(_0x7721('0xd8'));_0x2f60c7=_0x2f60c7||'+';_0x1a95e6=_0x1a95e6||0.9*_0x123b33[_0x7721('0xd9')]();_0x123b33[_0x7721('0xb9')](!0x0,!0x0)[_0x7721('0xda')]({'scrollTop':isNaN(_0x1b85f0)?_0x2f60c7+'='+_0x1a95e6+'px':_0x1b85f0});};_0x35de7a[_0x7721('0x56')]||(_0x2f1fe0['getCartInfoByUrl'](),_0x25b1c0['fn'][_0x7721('0xce')](!0x0));_0x25b1c0(window)['on'](_0x7721('0xdb'),function(){try{window[_0x7721('0x18')][_0x7721('0x7b')]=void 0x0,_0x2f1fe0[_0x7721('0x58')]();}catch(_0x31447d){_0x534f1b(_0x7721('0xdc')+_0x31447d[_0x7721('0x97')],_0x7721('0xdd'));}});_0x7721('0xc')===typeof _0x35de7a[_0x7721('0xa')]?_0x35de7a[_0x7721('0xa')][_0x7721('0x6c')](this):_0x534f1b(_0x7721('0xde'));};_0x25b1c0['fn'][_0x7721('0x1a')]=function(_0xe9e913){var _0x50b25b=_0x25b1c0(this);_0x50b25b['fn']=new _0x25b1c0[(_0x7721('0x1a'))](this,_0xe9e913);return _0x50b25b;};}catch(_0x3cec29){_0x7721('0x1')!==typeof console&&_0x7721('0xc')===typeof console[_0x7721('0xd')]&&console[_0x7721('0xd')](_0x7721('0xe'),_0x3cec29);}}(this));(function(_0xdd0e7a){try{var _0x38766a=jQuery;window[_0x7721('0x79')]=window[_0x7721('0x79')]||{};window[_0x7721('0x79')]['items']={};window['_QuatroDigital_AmountProduct'][_0x7721('0xdf')]=!0x1;window[_0x7721('0x79')][_0x7721('0xe0')]=!0x1;window[_0x7721('0x79')][_0x7721('0xe1')]=!0x1;var _0x5d9123=function(){if(window[_0x7721('0x79')][_0x7721('0xdf')]){var _0x23b8f9=!0x1;var _0x117446={};window[_0x7721('0x79')][_0x7721('0x73')]={};for(_0x38860c in window[_0x7721('0x18')][_0x7721('0x7b')][_0x7721('0x73')])if(_0x7721('0xf')===typeof window[_0x7721('0x18')][_0x7721('0x7b')]['items'][_0x38860c]){var _0x5d0bde=window[_0x7721('0x18')][_0x7721('0x7b')]['items'][_0x38860c];_0x7721('0x1')!==typeof _0x5d0bde[_0x7721('0xe2')]&&null!==_0x5d0bde[_0x7721('0xe2')]&&''!==_0x5d0bde['productId']&&(window[_0x7721('0x79')]['items']['prod_'+_0x5d0bde[_0x7721('0xe2')]]=window[_0x7721('0x79')][_0x7721('0x73')][_0x7721('0xe3')+_0x5d0bde['productId']]||{},window[_0x7721('0x79')][_0x7721('0x73')][_0x7721('0xe3')+_0x5d0bde[_0x7721('0xe2')]][_0x7721('0xe4')]=_0x5d0bde['productId'],_0x117446[_0x7721('0xe3')+_0x5d0bde[_0x7721('0xe2')]]||(window[_0x7721('0x79')][_0x7721('0x73')][_0x7721('0xe3')+_0x5d0bde[_0x7721('0xe2')]][_0x7721('0x70')]=0x0),window[_0x7721('0x79')][_0x7721('0x73')][_0x7721('0xe3')+_0x5d0bde[_0x7721('0xe2')]][_0x7721('0x70')]+=_0x5d0bde[_0x7721('0x8c')],_0x23b8f9=!0x0,_0x117446[_0x7721('0xe3')+_0x5d0bde[_0x7721('0xe2')]]=!0x0);}var _0x38860c=_0x23b8f9;}else _0x38860c=void 0x0;window[_0x7721('0x79')][_0x7721('0xdf')]&&(_0x38766a(_0x7721('0xe5'))[_0x7721('0xbe')](),_0x38766a(_0x7721('0xe6'))[_0x7721('0x3a')]('qd-bap-item-added'));for(var _0x9c796a in window['_QuatroDigital_AmountProduct'][_0x7721('0x73')]){_0x5d0bde=window[_0x7721('0x79')][_0x7721('0x73')][_0x9c796a];if(_0x7721('0xf')!==typeof _0x5d0bde)return;_0x117446=_0x38766a('input.qd-productId[value='+_0x5d0bde[_0x7721('0xe4')]+']')[_0x7721('0x92')]('li');if(window['_QuatroDigital_AmountProduct'][_0x7721('0xdf')]||!_0x117446[_0x7721('0x36')]('.qd-bap-wrapper')[_0x7721('0x6')])_0x23b8f9=_0x38766a(_0x7721('0xe7')),_0x23b8f9[_0x7721('0x36')](_0x7721('0xe8'))[_0x7721('0x66')](_0x5d0bde['qtt']),_0x5d0bde=_0x117446['find'](_0x7721('0xe9')),_0x5d0bde[_0x7721('0x6')]?_0x5d0bde['prepend'](_0x23b8f9)['addClass'](_0x7721('0xea')):_0x117446['prepend'](_0x23b8f9);}_0x38860c&&(window[_0x7721('0x79')][_0x7721('0xdf')]=!0x1);};window[_0x7721('0x79')]['exec']=function(){window[_0x7721('0x79')][_0x7721('0xdf')]=!0x0;_0x5d9123[_0x7721('0x6c')](this);};_0x38766a(document)[_0x7721('0xeb')](function(){_0x5d9123[_0x7721('0x6c')](this);});}catch(_0x3a8d59){_0x7721('0x1')!==typeof console&&_0x7721('0xc')===typeof console['error']&&console[_0x7721('0xd')](_0x7721('0xe'),_0x3a8d59);}}(this));(function(){try{var _0x3c3c7e=jQuery,_0x2d2124,_0x1f51d4={'selector':'.qdDdcContainer','dropDown':{},'buyButton':{}};_0x3c3c7e[_0x7721('0xec')]=function(_0x220c95){var _0x216faa={};_0x2d2124=_0x3c3c7e[_0x7721('0x24')](!0x0,{},_0x1f51d4,_0x220c95);_0x220c95=_0x3c3c7e(_0x2d2124[_0x7721('0xed')])[_0x7721('0x1a')](_0x2d2124[_0x7721('0xee')]);_0x216faa[_0x7721('0xef')]=_0x7721('0x1')!==typeof _0x2d2124[_0x7721('0xee')][_0x7721('0x56')]&&!0x1===_0x2d2124['dropDown'][_0x7721('0x56')]?_0x3c3c7e(_0x2d2124[_0x7721('0xed')])[_0x7721('0xf0')](_0x220c95['fn'],_0x2d2124[_0x7721('0xef')]):_0x3c3c7e(_0x2d2124[_0x7721('0xed')])[_0x7721('0xf0')](_0x2d2124[_0x7721('0xef')]);_0x216faa[_0x7721('0xee')]=_0x220c95;return _0x216faa;};_0x3c3c7e['fn'][_0x7721('0xf1')]=function(){_0x7721('0xf')===typeof console&&_0x7721('0xc')===typeof console[_0x7721('0x15')]&&console[_0x7721('0x15')](_0x7721('0xf2'));};_0x3c3c7e[_0x7721('0xf1')]=_0x3c3c7e['fn']['smartCart'];}catch(_0x116024){'undefined'!==typeof console&&'function'===typeof console[_0x7721('0xd')]&&console['error'](_0x7721('0xe'),_0x116024);}}());

// vtex url parse
/* Quatro Digital - VTEX URL Parse // 1.4 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
var _0x8349=["\x6C\x69\x6E\x6B","\x3C\x61\x20\x68\x72\x65\x66\x3D\x22","\x22\x3E\x3C\x2F\x61\x3E","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\x66\x75\x6E\x63\x74\x69\x6F\x6E","\x65\x72\x72\x6F\x72","\x50\x72\x6F\x62\x6C\x65\x6D\x61\x73\x20\x3A\x28\x20\x2E\x20\x44\x65\x74\x61\x6C\x68\x65\x73\x3A\x20","\x2F","\x73\x70\x6C\x69\x74","","\x72\x65\x70\x6C\x61\x63\x65","\x70\x61\x74\x68\x6E\x61\x6D\x65","\x2C","\x70\x6F\x70","\x6D\x61\x74\x63\x68","\x73\x65\x61\x72\x63\x68","\x6C\x65\x6E\x67\x74\x68","\x6F\x62\x6A\x65\x63\x74","\x70\x75\x73\x68","\x63","\x6D\x61\x70","\x73\x68\x69\x66\x74","\x6F\x74\x68\x65\x72\x5F\x70\x61\x74\x68","\x6F\x74\x68\x65\x72\x5F\x73\x65\x61\x72\x63\x68","\x26","\x6F\x75\x74","\x67\x65\x74\x4D\x61\x70","\x70\x72\x6F\x74\x6F\x74\x79\x70\x65","\x6D\x65\x72\x67\x65\x55\x72\x6C","\x63\x61\x6C\x6C","\x65\x78\x74\x65\x6E\x64","\x67\x65\x74\x55\x72\x6C","\x6D\x61\x70\x3D","\x6A\x6F\x69\x6E","\x3F","\x51\x44\x5F\x56\x74\x65\x78\x55\x72\x6C\x50\x61\x72\x73\x65"];(function(){function _0x6ac7x1(_0x6ac7x2){try{this[_0x8349[0]]=$(_0x8349[1]+_0x6ac7x2+_0x8349[2])[0]}catch(c){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],c)}}function _0x6ac7x3(_0x6ac7x2){try{_0x6ac7x2=_0x6ac7x2||this[_0x8349[0]];var _0x6ac7x4=_0x6ac7x2[_0x8349[11]][_0x8349[10]](/\/\//g,_0x8349[7])[_0x8349[10]](/(^\/|\/$)/g,_0x8349[9])[_0x8349[8]](_0x8349[7]),_0x6ac7x5=((_0x6ac7x2[_0x8349[15]]||_0x8349[9])[_0x8349[14]](/map\=([^&]+)/i)||[_0x8349[9]])[_0x8349[13]]()[_0x8349[8]](_0x8349[12]);if(1==_0x6ac7x5[_0x8349[16]]&&0==_0x6ac7x5[0][_0x8349[16]]){if(_0x8349[17]== typeof defaultMap){_0x6ac7x5=defaultMap}else {for(var _0x6ac7x6=0;_0x6ac7x6<_0x6ac7x4[_0x8349[16]];_0x6ac7x6++){_0x6ac7x4[_0x6ac7x6][_0x8349[16]]&&_0x8349[7]!=_0x6ac7x4[_0x6ac7x6]&&_0x6ac7x5[_0x8349[18]](defaultMap)}}};for(var _0x6ac7x6={map:{},other_path:_0x8349[9]},_0x6ac7x7=0;_0x6ac7x7<_0x6ac7x5[_0x8349[16]];_0x6ac7x7++){_0x6ac7x5[_0x6ac7x7][_0x8349[16]]&&(_0x8349[19]==_0x6ac7x5[_0x6ac7x7]?(_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]=_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]||[],_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]][_0x8349[18]]((_0x6ac7x4||[_0x8349[9]])[_0x8349[21]]())):_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]=(_0x6ac7x4||[_0x8349[9]])[_0x8349[21]]())};_0x6ac7x6[_0x8349[22]]=_0x6ac7x4;_0x6ac7x6[_0x8349[23]]=(_0x6ac7x2[_0x8349[15]]||_0x8349[9])[_0x8349[10]](/map\=([^&]+)/ig,_0x8349[9])[_0x8349[10]](/\&\&+/ig,_0x8349[24])[_0x8349[10]](/\?/g,_0x8349[9]);return this[_0x8349[25]]=_0x6ac7x6}catch(g){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],g)}}_0x6ac7x1[_0x8349[27]][_0x8349[26]]=_0x6ac7x3;_0x6ac7x1[_0x8349[27]][_0x8349[28]]=function(_0x6ac7x2,_0x6ac7x4){try{var _0x6ac7x5=_0x6ac7x3[_0x8349[29]](this,this[_0x8349[0]]),_0x6ac7x6=_0x6ac7x3[_0x8349[29]](this,$(_0x8349[1]+_0x6ac7x2+_0x8349[2])[0]);_0x6ac7x5[_0x8349[22]][_0x8349[16]]||(_0x6ac7x5[_0x8349[22]]=void(0));_0x6ac7x5[_0x8349[23]][_0x8349[16]]||(_0x6ac7x5[_0x8349[23]]=void(0));var _0x6ac7x7=$[_0x8349[30]](!0,{},_0x6ac7x6,_0x6ac7x5);if(_0x8349[17]== typeof _0x6ac7x4){for(_0x6ac7x6=0;_0x6ac7x6<_0x6ac7x4[_0x8349[16]];_0x6ac7x6++){_0x6ac7x7[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]]&&(_0x6ac7x7[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]]=_0x6ac7x5[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]])}};return this[_0x8349[25]]=_0x6ac7x7}catch(g){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],g)}};_0x6ac7x1[_0x8349[27]][_0x8349[31]]=function(_0x6ac7x2){try{var _0x6ac7x4=[],_0x6ac7x5=[];_0x6ac7x2=_0x6ac7x2||{};for(var _0x6ac7x6 in this[_0x8349[25]][_0x8349[20]]){if(!_0x6ac7x2[_0x6ac7x6]){if(_0x8349[19]==_0x6ac7x6){for(var _0x6ac7x7=0;_0x6ac7x7<this[_0x8349[25]][_0x8349[20]][_0x6ac7x6][_0x8349[16]];_0x6ac7x7++){_0x6ac7x4[_0x8349[18]](this[_0x8349[25]][_0x8349[20]][_0x6ac7x6][_0x6ac7x7]),_0x6ac7x5[_0x8349[18]](_0x6ac7x6)}}else {_0x6ac7x4[_0x8349[18]](this[_0x8349[25]][_0x8349[20]][_0x6ac7x6]),_0x6ac7x5[_0x8349[18]](_0x6ac7x6)}}};var _0x6ac7x8=_0x6ac7x5[_0x8349[16]]?_0x8349[32]+_0x6ac7x5[_0x8349[33]](_0x8349[12])+_0x8349[24]:_0x8349[9];return _0x8349[7]+_0x6ac7x4[_0x8349[33]](_0x8349[7])+(this[_0x8349[25]][_0x8349[22]][_0x8349[16]]?_0x8349[7]+this[_0x8349[25]][_0x8349[22]][_0x8349[33]](_0x8349[7]):_0x8349[9])+_0x8349[34]+(_0x6ac7x8+this[_0x8349[25]][_0x8349[23]])[_0x8349[10]](/\&\&+/g,_0x8349[24])}catch(_0x6ac7x1){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],_0x6ac7x1)}};window[_0x8349[35]]=_0x6ac7x1})()

/* Quatro Digital - QD Select Smart Research 2 // Carlos Vinicius // Todos os direitos reservados */
var _0x5f2f=['qd-ssr-reloading','redirect','split','shift','data-qdssr-str','qd-ssr-loading','qd-ssr2-loading','html','removeAttr','disabled','getAjaxOptions','data-qdssr-title','ajaxError','removeClass','Problemas\x20:(\x20.\x20Detalhes:\x20','val','</option>','getCategory','cache','script:not([src])','innerHTML','buscapagina','match','pop','push','qdPlugin','function','QD_SelectSmartResearch2','undefined','error','info','warn','object','unshift','[Quatro\x20Digital\x20-\x20QD\x20Select\x20Smart\x20Research\x202]\x0a','alerta','toLowerCase','join','apply','Selecione\x20o\x20anterior','Selecione\x20o(a)\x20','location','href','.search-single-navigator\x20ul.','attr','each','text','trim','\x20+ul\x20.filtro-ativo:first','length','Desculpe,\x20não\x20foi\x20possível\x20executar\x20sua\x20solicitação.\x20Por\x20favor\x20entre\x20em\x20contato\x20com\x20o\x20SAC.','neynoretnznfx%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','ite','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','QuatroDigital.ssrSelectAjaxPopulated','data-qdssr-ndx','Problemas\x20ao\x20definir\x20a\x20opção\x20selecionada.\x20Detalhes:\x20','addClass','qd-ssr2-loaded','Problemas\x20ao\x20tentar\x20verificar\x20as\x20opções\x20selecionadas.\x20Detalhes:\x20','message','options','index','<label\x20for=\x22qd-ssr2-select-','labelMessage','optionsPlaceHolder','</label>','<select\x20data-qdssr-ndx=\x22','\x22\x20id=\x22qd-ssr2-select-','disabledMessage','</select></div>','appendTo','select','add','select2','pt-BR','bind','change','find','select[data-qdssr-ndx=','trigger','body'];(function(_0x5711da,_0x11b53){var _0x29e6d8=function(_0x12b47a){while(--_0x12b47a){_0x5711da['push'](_0x5711da['shift']());}};_0x29e6d8(++_0x11b53);}(_0x5f2f,0x73));var _0xf5f2=function(_0x316a7c,_0xd61091){_0x316a7c=_0x316a7c-0x0;var _0x4c803a=_0x5f2f[_0x316a7c];return _0x4c803a;};(function(_0x7c86d8){var _0x3d73c4=jQuery;if(_0xf5f2('0x0')!==typeof _0x3d73c4['fn'][_0xf5f2('0x1')]){_0x3d73c4['fn'][_0xf5f2('0x1')]=function(){};var _0x174bc7=function(_0x107cf,_0x501fbd){if('object'===typeof console&&_0xf5f2('0x2')!==typeof console[_0xf5f2('0x3')]&&_0xf5f2('0x2')!==typeof console[_0xf5f2('0x4')]&&_0xf5f2('0x2')!==typeof console[_0xf5f2('0x5')]){var _0x5907aa;_0xf5f2('0x6')===typeof _0x107cf?(_0x107cf[_0xf5f2('0x7')](_0xf5f2('0x8')),_0x5907aa=_0x107cf):_0x5907aa=['[Quatro\x20Digital\x20-\x20QD\x20Select\x20Smart\x20Research\x202]\x0a'+_0x107cf];if(_0xf5f2('0x2')===typeof _0x501fbd||_0xf5f2('0x9')!==_0x501fbd[_0xf5f2('0xa')]()&&'aviso'!==_0x501fbd[_0xf5f2('0xa')]())if('undefined'!==typeof _0x501fbd&&'info'===_0x501fbd[_0xf5f2('0xa')]())try{console[_0xf5f2('0x4')]['apply'](console,_0x5907aa);}catch(_0x336f6b){try{console[_0xf5f2('0x4')](_0x5907aa[_0xf5f2('0xb')]('\x0a'));}catch(_0x3f2997){}}else try{console[_0xf5f2('0x3')][_0xf5f2('0xc')](console,_0x5907aa);}catch(_0x5c01b8){try{console[_0xf5f2('0x3')](_0x5907aa[_0xf5f2('0xb')]('\x0a'));}catch(_0x269909){}}else try{console[_0xf5f2('0x5')][_0xf5f2('0xc')](console,_0x5907aa);}catch(_0x4d97fc){try{console[_0xf5f2('0x5')](_0x5907aa[_0xf5f2('0xb')]('\x0a'));}catch(_0x17d656){}}}},_0x3c72ee={'options':[],'optionsPlaceHolder':[],'disabledMessage':function(_0x1b6dd2,_0x23e23a,_0x3a9dbb){return _0xf5f2('0xd');},'labelMessage':function(_0x395a5a,_0x11f702,_0x228ace){return _0xf5f2('0xe')+_0x228ace[_0x395a5a];},'redirect':function(_0x28e097){window[_0xf5f2('0xf')][_0xf5f2('0x10')]=_0x28e097;},'getAjaxOptions':function(_0x3cf5ea,_0x626999){var _0x1bf655=[];_0x3d73c4(_0x3cf5ea)['find'](_0xf5f2('0x11')+_0x626999[_0xf5f2('0x12')]('data-qdssr-title'))['find']('a')[_0xf5f2('0x13')](function(){var _0x626999=_0x3d73c4(this);_0x1bf655['push']([_0x626999[_0xf5f2('0x14')]()[_0xf5f2('0x15')](),_0x626999[_0xf5f2('0x12')](_0xf5f2('0x10'))||'']);});return _0x1bf655;},'optionIsChecked':function(_0x36f1cb){_0x36f1cb=_0x3d73c4('h5.'+_0x36f1cb+_0xf5f2('0x16'))[_0xf5f2('0x14')]()[_0xf5f2('0x15')]();return _0x36f1cb[_0xf5f2('0x17')]?_0x36f1cb:null;},'ajaxError':function(){_0x174bc7(_0xf5f2('0x18'));}};_0x7c86d8=function(_0x5bdf4a){var _0x529f07={'p':_0xf5f2('0x19')};return function(_0x3f79d5){var _0x13da6f=function(_0x1a5bb3){return _0x1a5bb3;};var _0xf6c58d=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3f79d5=_0x3f79d5['d'+_0xf6c58d[0x10]+'c'+_0xf6c58d[0x11]+'m'+_0x13da6f(_0xf6c58d[0x1])+'n'+_0xf6c58d[0xd]]['l'+_0xf6c58d[0x12]+'c'+_0xf6c58d[0x0]+'ti'+_0x13da6f('o')+'n'];var _0x788a8d=function(_0x13a3be){return escape(encodeURIComponent(_0x13a3be[_0xf5f2('0x1a')](/\./g,'¨')[_0xf5f2('0x1a')](/[a-zA-Z]/g,function(_0x4ab014){return String[_0xf5f2('0x1b')](('Z'>=_0x4ab014?0x5a:0x7a)>=(_0x4ab014=_0x4ab014[_0xf5f2('0x1c')](0x0)+0xd)?_0x4ab014:_0x4ab014-0x1a);})));};var _0x375ca8=_0x788a8d(_0x3f79d5[[_0xf6c58d[0x9],_0x13da6f('o'),_0xf6c58d[0xc],_0xf6c58d[_0x13da6f(0xd)]][_0xf5f2('0xb')]('')]);_0x788a8d=_0x788a8d((window[['js',_0x13da6f('no'),'m',_0xf6c58d[0x1],_0xf6c58d[0x4][_0xf5f2('0x1d')](),_0xf5f2('0x1e')]['join']('')]||'---')+['.v',_0xf6c58d[0xd],'e',_0x13da6f('x'),'co',_0x13da6f('mm'),_0xf5f2('0x1f'),_0xf6c58d[0x1],'.c',_0x13da6f('o'),'m.',_0xf6c58d[0x13],'r'][_0xf5f2('0xb')](''));for(var _0x11c771 in _0x529f07){if(_0x788a8d===_0x11c771+_0x529f07[_0x11c771]||_0x375ca8===_0x11c771+_0x529f07[_0x11c771]){var _0x5027ab='tr'+_0xf6c58d[0x11]+'e';break;}_0x5027ab='f'+_0xf6c58d[0x0]+'ls'+_0x13da6f(_0xf6c58d[0x1])+'';}_0x13da6f=!0x1;-0x1<_0x3f79d5[[_0xf6c58d[0xc],'e',_0xf6c58d[0x0],'rc',_0xf6c58d[0x9]]['join']('')][_0xf5f2('0x20')](_0xf5f2('0x21'))&&(_0x13da6f=!0x0);return[_0x5027ab,_0x13da6f];}(_0x5bdf4a);}(window);if(!eval(_0x7c86d8[0x0]))return _0x7c86d8[0x1]?_0x174bc7(_0xf5f2('0x22')):!0x1;_0x3d73c4[_0xf5f2('0x1')]=function(_0x1b381e,_0x54c0c8){if(!_0x54c0c8['options'][_0xf5f2('0x17')])return _0x174bc7('Nenhuma\x20opção\x20foi\x20enviada,\x20é\x20esperado\x20um\x20array\x20com\x20sub\x20arrays\x20contendo\x20o\x20conjunto\x20chave/valor.');_0x1b381e[_0xf5f2('0x13')](function(){try{var _0x58a4df=_0x3d73c4(this),_0x45b643=_0x27c0e7(_0x58a4df,_0x54c0c8,_0x1b381e);_0x297c0c(_0x58a4df,_0x54c0c8,0x0);_0x45b643['on'](_0xf5f2('0x23'),function(_0x7b6817,_0x428770){try{_0x297c0c(_0x58a4df,_0x54c0c8,_0x428770[_0xf5f2('0x12')](_0xf5f2('0x24')));}catch(_0x2ac089){_0x174bc7(_0xf5f2('0x25')+_0x2ac089['message']);}});_0x58a4df[_0xf5f2('0x26')](_0xf5f2('0x27'));}catch(_0x4590ec){_0x174bc7(_0xf5f2('0x28')+_0x4590ec[_0xf5f2('0x29')]);}});};var _0x27c0e7=function(_0x144646,_0xf503e8,_0x55989d){try{for(var _0x3fc168='',_0x4b8c42,_0x7c86d8=!0x0,_0x3930fb=new _0x3d73c4(),_0x2a2c31=!0x1,_0x2e3cca=0x0,_0x59a6dd=0x0;_0x59a6dd<_0xf503e8['options'][_0xf5f2('0x17')];_0x59a6dd++){_0xf5f2('0x6')!==typeof _0xf503e8[_0xf5f2('0x2a')][_0x59a6dd]&&(_0x7c86d8=!0x1);var _0x4ec8fb=_0xf503e8['optionsPlaceHolder'][_0x59a6dd]||'',_0x41447f=_0x55989d[_0xf5f2('0x2b')](_0x144646);_0x3fc168='<div\x20class=\x22qd-ssr2-option-wrapper\x22>';_0x3fc168+=_0xf5f2('0x2c')+_0x59a6dd+_0x41447f+'\x22>'+_0xf503e8[_0xf5f2('0x2d')](_0x59a6dd,_0xf503e8['options'],_0xf503e8[_0xf5f2('0x2e')])+_0xf5f2('0x2f');_0x3fc168+=_0xf5f2('0x30')+_0x59a6dd+_0xf5f2('0x31')+_0x59a6dd+_0x41447f+'\x22\x20data-qdssr-title=\x22'+_0x4ec8fb+'\x22>';_0x3fc168+='<option\x20value=\x22\x22></option>';_0x7c86d8?_0x3fc168+=_0x48d64d(_0xf503e8[_0xf5f2('0x2a')][_0x59a6dd]):_0x4ec8fb=_0xf503e8[_0xf5f2('0x32')](_0x59a6dd,_0xf503e8[_0xf5f2('0x2a')],_0xf503e8[_0xf5f2('0x2e')]);_0x3fc168+=_0xf5f2('0x33');_0x4b8c42=_0x3d73c4(_0x3fc168);_0x4b8c42[_0xf5f2('0x34')](_0x144646);var _0x2bc20e=_0x4b8c42['find'](_0xf5f2('0x35'));_0x3930fb=_0x3930fb[_0xf5f2('0x36')](_0x2bc20e);_0x7c86d8||_0x2bc20e['attr']({'disabled':!0x0,'data-qdssr-str':_0xf503e8[_0xf5f2('0x2a')][_0x59a6dd]});_0x2bc20e[_0xf5f2('0x37')]({'placeholder':_0x4ec8fb,'language':_0xf5f2('0x38')});_0x2bc20e[_0xf5f2('0x39')](_0xf5f2('0x3a'),function(_0x3b6372,_0x462ea3){var _0x2083b3=_0x3d73c4(this),_0x574f24=_0x144646[_0xf5f2('0x3b')](_0xf5f2('0x3c')+(parseInt(_0x2083b3['attr']('data-qdssr-ndx')||0x0,0xa)+0x1)+']'),_0x7c86d8=(_0x2083b3['val']()||'')[_0xf5f2('0x15')]();_0x462ea3||(_0x2a2c31=!0x0);_0x3d73c4(window)[_0xf5f2('0x3d')]('QuatroDigital.ssrChange',[_0x574f24,_0x2a2c31]);!_0x574f24[_0xf5f2('0x17')]&&(!_0x462ea3||_0x2a2c31&&_0x7c86d8[_0xf5f2('0x17')])&&(_0x3d73c4(document[_0xf5f2('0x3e')])[_0xf5f2('0x26')](_0xf5f2('0x3f')),_0xf503e8[_0xf5f2('0x40')](_0x7c86d8));_0x7c86d8=_0x7c86d8[_0xf5f2('0x41')]('#')[_0xf5f2('0x42')]()[_0xf5f2('0x41')]('?');_0x7c86d8[0x1]=(_0x574f24[_0xf5f2('0x12')](_0xf5f2('0x43'))||'')+'&'+(_0x7c86d8[0x1]||'');_0x3d73c4(document[_0xf5f2('0x3e')])[_0xf5f2('0x26')](_0xf5f2('0x44'));_0x4b8c42['addClass'](_0xf5f2('0x45'));_0x2e3cca+=0x1;_0x3d73c4['qdAjax']({'url':_0x7c86d8[_0xf5f2('0xb')]('?'),'dataType':_0xf5f2('0x46'),'success':function(_0x218def){_0x574f24[_0xf5f2('0x47')](_0xf5f2('0x48'));_0x574f24[_0xf5f2('0x46')]('<option\x20value=\x22\x22></option>'+_0x48d64d(_0xf503e8[_0xf5f2('0x49')](_0x218def,_0x574f24)));_0x574f24[_0xf5f2('0x37')]({'placeholder':_0x574f24[_0xf5f2('0x12')](_0xf5f2('0x4a'))});_0x2083b3[_0xf5f2('0x3d')](_0xf5f2('0x23'),[_0x574f24]);},'error':function(){_0xf503e8[_0xf5f2('0x4b')][_0xf5f2('0xc')](this,arguments);},'complete':function(){_0x4b8c42['removeClass'](_0xf5f2('0x45'));--_0x2e3cca;0x0==_0x2e3cca&&_0x3d73c4(document[_0xf5f2('0x3e')])[_0xf5f2('0x4c')]('qd-ssr-loading');},'clearQueueDelay':null});});}return _0x3930fb;}catch(_0x1177ba){_0x174bc7(_0xf5f2('0x4d')+_0x1177ba[_0xf5f2('0x29')]);}},_0x297c0c=function(_0x5e761c,_0x57a7cb,_0x7bb942,_0x27c472){_0x57a7cb=_0x57a7cb['optionIsChecked'](_0x57a7cb[_0xf5f2('0x2e')][_0x7bb942]);null!==_0x57a7cb&&(_0x27c472=_0x27c472||_0x5e761c['find'](_0xf5f2('0x3c')+_0x7bb942+']'),_0x27c472['val'](_0x27c472[_0xf5f2('0x3b')]('option[data-qdssr-text=\x27'+_0x57a7cb+'\x27]')[_0xf5f2('0x4e')]())[_0xf5f2('0x3d')](_0xf5f2('0x3a'),!0x0));},_0x48d64d=function(_0x11a083){for(var _0x4fa738='',_0x3154c1=0x0;_0x3154c1<_0x11a083[_0xf5f2('0x17')];_0x3154c1++)_0x4fa738+='<option\x20value=\x22'+(_0x11a083[_0x3154c1][0x1]||'')+'\x22\x20data-qdssr-text=\x22'+(_0x11a083[_0x3154c1][0x0]||'')[_0xf5f2('0x1a')](/\s\([0-9]+\)/,'')+'\x22>'+(_0x11a083[_0x3154c1][0x0]||'')+_0xf5f2('0x4f');return _0x4fa738;};_0x3d73c4['QD_SelectSmartResearch2'][_0xf5f2('0x50')]=function(){if(_0x3d73c4[_0xf5f2('0x1')][_0xf5f2('0x50')][_0xf5f2('0x51')])return _0x3d73c4['QD_SelectSmartResearch2']['getCategory'][_0xf5f2('0x51')];var _0xa3cc67=[],_0x4b62fc=[];_0x3d73c4(_0xf5f2('0x52'))[_0xf5f2('0x13')](function(){var _0x255125=_0x3d73c4(this)[0x0][_0xf5f2('0x53')];if(-0x1<_0x255125[_0xf5f2('0x20')](_0xf5f2('0x54')))return _0xa3cc67=(decodeURIComponent((_0x255125[_0xf5f2('0x55')](/\/buscapagina([^\'\"]+)/i)||[''])['pop']())['match'](/fq=c:[^\&]+/i)||[''])[_0xf5f2('0x56')]()[_0xf5f2('0x41')](':')[_0xf5f2('0x56')]()[_0xf5f2('0x1a')](/(^\/|\/$)/g,'')[_0xf5f2('0x41')]('/'),!0x1;});for(var _0x5a861d=0x0;_0x5a861d<_0xa3cc67[_0xf5f2('0x17')];_0x5a861d++)_0xa3cc67[_0x5a861d][_0xf5f2('0x17')]&&_0x4b62fc[_0xf5f2('0x57')](_0xa3cc67[_0x5a861d]);return _0x3d73c4['QD_SelectSmartResearch2'][_0xf5f2('0x50')]['cache']=_0x4b62fc;};_0x3d73c4[_0xf5f2('0x1')][_0xf5f2('0x50')][_0xf5f2('0x51')]=null;_0x3d73c4['fn'][_0xf5f2('0x1')]=function(_0x4afa4d){var _0x5a5338=_0x3d73c4(this);if(!_0x5a5338[_0xf5f2('0x17')])return _0x5a5338;_0x4afa4d=_0x3d73c4['extend']({},_0x3c72ee,_0x4afa4d);_0x5a5338[_0xf5f2('0x58')]=new _0x3d73c4[(_0xf5f2('0x1'))](_0x5a5338,_0x4afa4d);return _0x5a5338;};_0x3d73c4(function(){_0x3d73c4('.qd_auto_select_smart_research_2')[_0xf5f2('0x1')]();});}}(this));

/* Quatro Digital - QD Smart SKU Grid // Carlos Vinicius // Todos os direitos reservados */
var _0xf970=['not','.qd-ssg-processed-row','qd-ssg-loaded','hide','click','siblings','skuSelected.vtex','QuatroDigital.sq_change','QD_smartQuantity','qttMore','qttMinus','buyButton','href','[data-sku-id]','QuatroDigital.ssg_change','each','push','data-sku-id','seller=','data-sku-seller','VTEXSC','sc=1','/checkout/cart/add?','neynoretnznfx%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Atenção!\x20Cara\x20na\x20boa,\x20este\x20plugin\x20não\x20suporta\x20mais\x20de\x20um\x20gride,\x20por\x20favor\x20se\x20precisa\x20renderizar\x20outros\x20na\x20tela,\x20utilize\x20o\x20$().each','Atenção!\x20Para\x20que\x20o\x20avise-me\x20funcione\x20você\x20precisa\x20adicionar\x20o\x20plugin\x20\x27QD_smartNotifyMe\x27\x20😠.','QD_smartSkuTotalizer','trigger','function','amd','jquery','object','json','stringify','raw','indexOf','replace','parse','isFunction','cookie','length','extend','defaults','number','expires','setTime',';\x20expires=','toUTCString','path',';\x20path=','domain','secure',';\x20secure','join','split','shift','removeCookie','abs','undefined','pow','toFixed','round','QD_smartSkuGrid','Quatro\x20Digital\x20-\x20Smart\x20SKU\x20Grid','info','warn','unshift','alerta','aviso','toLowerCase','error','apply','.qd-sku-row-head\x20.qd-sku-col-title','.qd-sku-row-body','.qd-sku-qtt-wrap','.qd-sku-name','.qd-sku-qtt-price','.qd-sku-img','<span\x20class=\x22qd-snm-auto-include\x22></span>','left','input','.qd-sku-qtt-remove','.qd-ssg-buy-button','javascript:alert(\x27Por\x20favor,\x20selecione\x20a\x20quantidade\x20desejada.\x27);','.qd-selected-sku-total','Não\x20foi\x20possível\x20obter\x20seus\x20dados\x20de\x20acesso,\x20por\x20favor\x20tente\x20mais\x20tarde\x20ou\x20entre\x20em\x20contato\x20com\x20o\x20Atendimento\x20ao\x20Cliente!','.qd-ssg-login','.qd-sku-title-z','attr','data-qd-smart-sku-grid','Especificação\x20SKU\x20padrão\x20é\x20inválida.\x20A\x20execução\x20para\x20por\x20aqui\x20😞.\x20Valor\x20obtido:\x20','Este\x20plugin\x20suporta\x20apenas\x20produtos\x20com\x20apenas\x20duas\x20ou\x20três\x20variações\x20de\x20SKU,\x20o\x20que\x20não\x20é\x20o\x20caso\x20desse!\x20A\x20execução\x20para\x20por\x20aqui\x20😞','dimensions','string','A\x203ª\x20especificação\x20SKU\x20é\x20inválida\x20(eixo\x20z).\x20A\x20execução\x20para\x20por\x20aqui\x20😞.\x20Valor\x20obtido:\x20','dimensionsMap','clone','insertBefore','append','add','message','find','headItem','remove','bodyRow','bodyPrice','data-qd-ssg-primary-dim','rowName','data-qd-ssg-secundary-dim','addClass','skus','filter','rowImage','html','<img\x20src=\x22','image','rowImageSize','\x22\x20alt=\x22','skuname','\x22\x20/>','[data-qd-ssg-primary-dim=\x27','removeClass','qd-ssg-sku-not-found','inputQtt','sku','sellerId','bestPrice','available','listPrice','rowPrice','<span\x20class=\x22qd-sku-old-price\x22>','listPriceFormated','</span>','<span\x20class=\x22qd-sku-new-price\x22>','bestPriceFormated','qd-ssg-unavailable','disabled','appendTo','QD_smartNotifyMe'];(function(_0x1e7b16,_0x4607a1){var _0x37fadc=function(_0x1fc9ce){while(--_0x1fc9ce){_0x1e7b16['push'](_0x1e7b16['shift']());}};_0x37fadc(++_0x4607a1);}(_0xf970,0x1d9));var _0x0f97=function(_0x14add3,_0x13ce8d){_0x14add3=_0x14add3-0x0;var _0x4a174f=_0xf970[_0x14add3];return _0x4a174f;};(function(){_0x0f97('0x0')!==typeof $['cookie']&&function(_0x374ccb){_0x0f97('0x0')===typeof define&&define[_0x0f97('0x1')]?define([_0x0f97('0x2')],_0x374ccb):_0x0f97('0x3')===typeof exports?_0x374ccb(require(_0x0f97('0x2'))):_0x374ccb(jQuery);}(function(_0x439149){function _0x4ab74d(_0xc822e8){_0xc822e8=_0x334de8[_0x0f97('0x4')]?JSON[_0x0f97('0x5')](_0xc822e8):String(_0xc822e8);return _0x334de8[_0x0f97('0x6')]?_0xc822e8:encodeURIComponent(_0xc822e8);}function _0x2e3515(_0x3244a6,_0x12fbb3){var _0x374083;if(_0x334de8[_0x0f97('0x6')])_0x374083=_0x3244a6;else _0x5598eb:{var _0x52d08e=_0x3244a6;0x0===_0x52d08e[_0x0f97('0x7')]('\x22')&&(_0x52d08e=_0x52d08e['slice'](0x1,-0x1)[_0x0f97('0x8')](/\\"/g,'\x22')[_0x0f97('0x8')](/\\\\/g,'\x5c'));try{_0x52d08e=decodeURIComponent(_0x52d08e[_0x0f97('0x8')](_0x192160,'\x20'));_0x374083=_0x334de8['json']?JSON[_0x0f97('0x9')](_0x52d08e):_0x52d08e;break _0x5598eb;}catch(_0x56e5ec){}_0x374083=void 0x0;}return _0x439149[_0x0f97('0xa')](_0x12fbb3)?_0x12fbb3(_0x374083):_0x374083;}var _0x192160=/\+/g,_0x334de8=_0x439149[_0x0f97('0xb')]=function(_0x38ae73,_0x4934af,_0x56d310){if(0x1<arguments[_0x0f97('0xc')]&&!_0x439149[_0x0f97('0xa')](_0x4934af)){_0x56d310=_0x439149[_0x0f97('0xd')]({},_0x334de8[_0x0f97('0xe')],_0x56d310);if(_0x0f97('0xf')===typeof _0x56d310[_0x0f97('0x10')]){var _0x54f205=_0x56d310[_0x0f97('0x10')],_0x4c34fc=_0x56d310[_0x0f97('0x10')]=new Date();_0x4c34fc[_0x0f97('0x11')](+_0x4c34fc+0x5265c00*_0x54f205);}return document[_0x0f97('0xb')]=[_0x334de8['raw']?_0x38ae73:encodeURIComponent(_0x38ae73),'=',_0x4ab74d(_0x4934af),_0x56d310['expires']?_0x0f97('0x12')+_0x56d310[_0x0f97('0x10')][_0x0f97('0x13')]():'',_0x56d310[_0x0f97('0x14')]?_0x0f97('0x15')+_0x56d310[_0x0f97('0x14')]:'',_0x56d310['domain']?';\x20domain='+_0x56d310[_0x0f97('0x16')]:'',_0x56d310[_0x0f97('0x17')]?_0x0f97('0x18'):''][_0x0f97('0x19')]('');}for(var _0x54f205=_0x38ae73?void 0x0:{},_0x4c34fc=document[_0x0f97('0xb')]?document[_0x0f97('0xb')][_0x0f97('0x1a')](';\x20'):[],_0x4a50a8=0x0,_0x27b771=_0x4c34fc[_0x0f97('0xc')];_0x4a50a8<_0x27b771;_0x4a50a8++){var _0x316e84=_0x4c34fc[_0x4a50a8]['split']('='),_0x21784d;_0x21784d=_0x316e84[_0x0f97('0x1b')]();_0x21784d=_0x334de8[_0x0f97('0x6')]?_0x21784d:decodeURIComponent(_0x21784d);_0x316e84=_0x316e84[_0x0f97('0x19')]('=');if(_0x38ae73&&_0x38ae73===_0x21784d){_0x54f205=_0x2e3515(_0x316e84,_0x4934af);break;}_0x38ae73||void 0x0===(_0x316e84=_0x2e3515(_0x316e84))||(_0x54f205[_0x21784d]=_0x316e84);}return _0x54f205;};_0x334de8['defaults']={};_0x439149[_0x0f97('0x1c')]=function(_0x25d1ef,_0x4ec6d0){if(void 0x0===_0x439149[_0x0f97('0xb')](_0x25d1ef))return!0x1;_0x439149[_0x0f97('0xb')](_0x25d1ef,'',_0x439149['extend']({},_0x4ec6d0,{'expires':-0x1}));return!_0x439149['cookie'](_0x25d1ef);};});}());function qd_number_format(_0x51aa82,_0x406e24,_0x22eb53,_0x5247ad){_0x51aa82=(_0x51aa82+'')[_0x0f97('0x8')](/[^0-9+\-Ee.]/g,'');_0x51aa82=isFinite(+_0x51aa82)?+_0x51aa82:0x0;_0x406e24=isFinite(+_0x406e24)?Math[_0x0f97('0x1d')](_0x406e24):0x0;_0x5247ad=_0x0f97('0x1e')===typeof _0x5247ad?',':_0x5247ad;_0x22eb53=_0x0f97('0x1e')===typeof _0x22eb53?'.':_0x22eb53;var _0x51a376='',_0x51a376=function(_0x164ad6,_0x1e688d){var _0x406e24=Math[_0x0f97('0x1f')](0xa,_0x1e688d);return''+(Math['round'](_0x164ad6*_0x406e24)/_0x406e24)[_0x0f97('0x20')](_0x1e688d);},_0x51a376=(_0x406e24?_0x51a376(_0x51aa82,_0x406e24):''+Math[_0x0f97('0x21')](_0x51aa82))[_0x0f97('0x1a')]('.');0x3<_0x51a376[0x0][_0x0f97('0xc')]&&(_0x51a376[0x0]=_0x51a376[0x0][_0x0f97('0x8')](/\B(?=(?:\d{3})+(?!\d))/g,_0x5247ad));(_0x51a376[0x1]||'')[_0x0f97('0xc')]<_0x406e24&&(_0x51a376[0x1]=_0x51a376[0x1]||'',_0x51a376[0x1]+=Array(_0x406e24-_0x51a376[0x1][_0x0f97('0xc')]+0x1)[_0x0f97('0x19')]('0'));return _0x51a376['join'](_0x22eb53);};(function(_0x481654){'use strict';var _0x2a8acf=jQuery;if(typeof _0x2a8acf['fn'][_0x0f97('0x22')]===_0x0f97('0x0'))return;_0x2a8acf['fn'][_0x0f97('0x22')]=function(){};var _0x25bd0e=_0x0f97('0x23');var _0x17f244=function(_0x46e0b4,_0x139c8a){if(_0x0f97('0x3')===typeof console&&_0x0f97('0x0')===typeof console['error']&&_0x0f97('0x0')===typeof console[_0x0f97('0x24')]&&_0x0f97('0x0')===typeof console[_0x0f97('0x25')]){var _0x258af4;'object'===typeof _0x46e0b4?(_0x46e0b4[_0x0f97('0x26')]('['+_0x25bd0e+']\x0a'),_0x258af4=_0x46e0b4):_0x258af4=['['+_0x25bd0e+']\x0a'+_0x46e0b4];if('undefined'===typeof _0x139c8a||_0x0f97('0x27')!==_0x139c8a['toLowerCase']()&&_0x0f97('0x28')!==_0x139c8a[_0x0f97('0x29')]())if(_0x0f97('0x1e')!==typeof _0x139c8a&&_0x0f97('0x24')===_0x139c8a[_0x0f97('0x29')]())try{console['info']['apply'](console,_0x258af4);}catch(_0x133f74){console[_0x0f97('0x24')](_0x258af4['join']('\x0a'));}else try{console[_0x0f97('0x2a')][_0x0f97('0x2b')](console,_0x258af4);}catch(_0x1e8530){console[_0x0f97('0x2a')](_0x258af4['join']('\x0a'));}else try{console[_0x0f97('0x25')][_0x0f97('0x2b')](console,_0x258af4);}catch(_0xef999d){console[_0x0f97('0x25')](_0x258af4[_0x0f97('0x19')]('\x0a'));}}};var _0x507a90={'headItem':_0x0f97('0x2c'),'bodyRow':_0x0f97('0x2d'),'bodyPrice':_0x0f97('0x2e'),'rowName':_0x0f97('0x2f'),'rowPrice':_0x0f97('0x30'),'rowImage':_0x0f97('0x31'),'rowImageSize':'50-50','unavailableHtml':'<span\x20class=\x22qd-no-stock\x22>ESGOTADO</span>','QD_smartNotifyMeHtml':_0x0f97('0x32'),'QD_smartNotifyMeOptions':{'placement':_0x0f97('0x33')},'inputQtt':_0x0f97('0x34'),'qttMore':'.qd-sku-qtt-add','qttMinus':_0x0f97('0x35'),'buyButton':_0x0f97('0x36'),'selectSkuMsg':_0x0f97('0x37'),'qttSkus':'.qd-selected-qtt-sku','valueSkus':_0x0f97('0x38'),'checkLoginErrorMsg':_0x0f97('0x39'),'userLoginWrapper':_0x0f97('0x3a'),'titleZ':_0x0f97('0x3b')};var _0x3c84f7=function(_0x1dc76d,_0xf4ed1a){'use strict';try{if(!_0x1dc76d[_0x0f97('0xc')])return _0x1dc76d;var _0x227f8e=_0x1dc76d[_0x0f97('0x3c')](_0x0f97('0x3d'));if(!(typeof _0x227f8e==='string'&&_0x227f8e[_0x0f97('0xc')]))return _0x17f244([_0x0f97('0x3e'),_0x227f8e]);if(skuJson['dimensions'][_0x0f97('0xc')]!==0x2&&skuJson['dimensions'][_0x0f97('0xc')]!==0x3)return _0x17f244([_0x0f97('0x3f')]);var _0x3e14b1=_0x1dc76d['attr']('data-qd-smart-sku-grid-z');if(skuJson[_0x0f97('0x40')][_0x0f97('0xc')]===0x3&&!(typeof _0x3e14b1===_0x0f97('0x41')&&_0x3e14b1[_0x0f97('0xc')]))return _0x17f244([_0x0f97('0x42'),_0x3e14b1]);}catch(_0x5ad169){_0x17f244(_0x5ad169['message']);}try{var _0x5c5e86;for(var _0x401286=0x0;_0x401286<skuJson[_0x0f97('0x40')][_0x0f97('0xc')];_0x401286++){if(skuJson[_0x0f97('0x40')][_0x401286]!==_0x227f8e&&(_0x3e14b1?skuJson[_0x0f97('0x40')][_0x401286]!==_0x3e14b1:!![])){_0x5c5e86=skuJson[_0x0f97('0x40')][_0x401286];break;}}var _0xd9f44b=new _0x2a8acf();if(_0x3e14b1){var _0x14b827;for(var _0x4a08f6=0x0;_0x4a08f6<skuJson[_0x0f97('0x43')][_0x3e14b1]['length'];_0x4a08f6++){_0x14b827=_0x1dc76d[_0x0f97('0x44')]()[_0x0f97('0x45')](_0x1dc76d);_0x3cdbee(_0x14b827,_0xf4ed1a,_0x227f8e,_0x5c5e86,_0x3e14b1,skuJson[_0x0f97('0x43')][_0x3e14b1][_0x4a08f6]);_0x14b827['find'](_0xf4ed1a['titleZ'])[_0x0f97('0x46')](skuJson[_0x0f97('0x43')][_0x3e14b1][_0x4a08f6]);_0xd9f44b=_0xd9f44b[_0x0f97('0x47')](_0x14b827);}_0x1dc76d['remove']();}else{_0x3cdbee(_0x1dc76d,_0xf4ed1a,_0x227f8e,_0x5c5e86,![]);_0xd9f44b=_0xd9f44b['add'](_0x1dc76d);}return _0xd9f44b;}catch(_0x546aac){_0x17f244(_0x546aac[_0x0f97('0x48')]);}};var _0x3cdbee=function(_0x1871b6,_0xf95e68,_0x13e08c,_0xdfe372,_0xe87bfc,_0x248189){try{var _0x1c342d=_0x1871b6[_0x0f97('0x49')](_0xf95e68[_0x0f97('0x4a')]);for(var _0xcf9bfc=0x0;_0xcf9bfc<skuJson[_0x0f97('0x43')][_0x13e08c]['length'];_0xcf9bfc++){_0x1c342d['clone']()[_0x0f97('0x46')](skuJson['dimensionsMap'][_0x13e08c][_0xcf9bfc])[_0x0f97('0x45')](_0x1c342d);}_0x1c342d[_0x0f97('0x4b')]();var _0x31929a=_0x1871b6[_0x0f97('0x49')](_0xf95e68[_0x0f97('0x4c')]);var _0x5d31ff=_0x31929a['find'](_0xf95e68[_0x0f97('0x4d')]);for(var _0xcf9bfc=0x0;_0xcf9bfc<skuJson['dimensionsMap'][_0x13e08c][_0x0f97('0xc')];_0xcf9bfc++){_0x5d31ff[_0x0f97('0x44')]()[_0x0f97('0x3c')](_0x0f97('0x4e'),skuJson['dimensionsMap'][_0x13e08c][_0xcf9bfc])[_0x0f97('0x45')](_0x5d31ff);}_0x5d31ff[_0x0f97('0x4b')]();var _0x376880;for(var _0xcf9bfc=0x0;_0xcf9bfc<skuJson[_0x0f97('0x43')][_0xdfe372][_0x0f97('0xc')];_0xcf9bfc++){_0x376880=_0x31929a[_0x0f97('0x44')]();_0x376880[_0x0f97('0x49')](_0xf95e68[_0x0f97('0x4f')])[_0x0f97('0x46')](skuJson[_0x0f97('0x43')][_0xdfe372][_0xcf9bfc]);_0x376880[_0x0f97('0x3c')](_0x0f97('0x50'),skuJson[_0x0f97('0x43')][_0xdfe372][_0xcf9bfc]);_0x376880['insertBefore'](_0x31929a);}_0x31929a[_0x0f97('0x4b')]();var _0x5ce464=_0x1871b6[_0x0f97('0x49')](_0xf95e68[_0x0f97('0x4c')]);var _0x19484d;var _0x5716c5;_0x5ce464[_0x0f97('0x49')](_0xf95e68[_0x0f97('0x4d')])[_0x0f97('0x51')]('qd-ssg-sku-not-found');for(var _0x57b52c=0x0;_0x57b52c<skuJson['skus']['length'];_0x57b52c++){if(_0xe87bfc&&skuJson[_0x0f97('0x52')][_0x57b52c][_0x0f97('0x40')][_0xe87bfc]!==_0x248189)continue;_0x19484d=_0x5ce464[_0x0f97('0x53')]('[data-qd-ssg-secundary-dim=\x27'+skuJson[_0x0f97('0x52')][_0x57b52c]['dimensions'][_0xdfe372]+'\x27]');_0x19484d[_0x0f97('0x49')](_0xf95e68[_0x0f97('0x54')])[_0x0f97('0x55')](_0x0f97('0x56')+skuJson[_0x0f97('0x52')][_0x57b52c][_0x0f97('0x57')][_0x0f97('0x8')](/(ids\/[0-9]+-)[0-9]+-[0-9]+\//i,'$1'+_0xf95e68[_0x0f97('0x58')]+'/')+_0x0f97('0x59')+skuJson['skus'][_0x57b52c][_0x0f97('0x5a')]+_0x0f97('0x5b'));_0x5716c5=_0x19484d[_0x0f97('0x49')](_0xf95e68[_0x0f97('0x4d')])[_0x0f97('0x53')](_0x0f97('0x5c')+skuJson[_0x0f97('0x52')][_0x57b52c][_0x0f97('0x40')][_0x13e08c]+'\x27]');if(_0x5716c5['length']){_0x5716c5[_0x0f97('0x3c')]('id',skuJson[_0x0f97('0x52')][_0x57b52c]['sku']);_0x5716c5[_0x0f97('0x5d')](_0x0f97('0x5e'));_0x5716c5[_0x0f97('0x49')](_0xf95e68[_0x0f97('0x5f')])['attr']({'data-sku-id':skuJson[_0x0f97('0x52')][_0x57b52c][_0x0f97('0x60')],'data-sku-seller':skuJson[_0x0f97('0x52')][_0x57b52c][_0x0f97('0x61')],'data-sku-price':skuJson[_0x0f97('0x52')][_0x57b52c][_0x0f97('0x62')]});if(skuJson[_0x0f97('0x52')][_0x57b52c][_0x0f97('0x63')]){if(skuJson[_0x0f97('0x52')][_0x57b52c][_0x0f97('0x64')])_0x5716c5[_0x0f97('0x49')](_0xf95e68[_0x0f97('0x65')])[_0x0f97('0x46')](_0x0f97('0x66')+skuJson['skus'][_0x57b52c][_0x0f97('0x67')]+_0x0f97('0x68'));_0x5716c5[_0x0f97('0x49')](_0xf95e68['rowPrice'])['append'](_0x0f97('0x69')+skuJson['skus'][_0x57b52c][_0x0f97('0x6a')]+'</span>');}else{_0x5716c5[_0x0f97('0x49')](_0xf95e68['rowPrice'])[_0x0f97('0x46')](_0xf95e68['unavailableHtml']);_0x5716c5[_0x0f97('0x51')](_0x0f97('0x6b'));_0x5716c5[_0x0f97('0x49')](_0xf95e68[_0x0f97('0x5f')])[_0x0f97('0x3c')](_0x0f97('0x6c'),'disabled');if(_0x3240f1)_0x2a8acf(_0xf95e68['QD_smartNotifyMeHtml'])[_0x0f97('0x6d')](_0x5716c5['find'](_0xf95e68[_0x0f97('0x65')]))[_0x0f97('0x6e')](_0x2a8acf[_0x0f97('0xd')]({},_0xf95e68['QD_smartNotifyMeOptions'],{'skuId':skuJson['skus'][_0x57b52c][_0x0f97('0x60')]}));}}_0x19484d[_0x0f97('0x51')]('qd-ssg-processed-row');}_0x5ce464[_0x0f97('0x6f')](_0x0f97('0x70'))[_0x0f97('0x4b')]();_0x1871b6[_0x0f97('0x51')](_0x0f97('0x71'));_0x1871b6[_0x0f97('0x5d')](_0x0f97('0x72'));}catch(_0x1e0547){_0x17f244(_0x1e0547[_0x0f97('0x48')]);}};var _0x5837ed=function(_0x568116,_0x5d4de8){_0x568116[_0x0f97('0x49')](_0x5d4de8['rowName'])[_0x0f97('0x47')](_0x5d4de8[_0x0f97('0x54')])[_0x0f97('0x73')](function(){try{var _0x361504=_0x2a8acf(this)[_0x0f97('0x74')]('.qd-sku-qtt-wrap[id]:first')[_0x0f97('0x3c')]('id');var _0x4a278c;for(var _0x447c50=0x0;_0x447c50<skuJson['skus']['length'];_0x447c50++){if(skuJson[_0x0f97('0x52')][_0x447c50][_0x0f97('0x60')]==_0x361504){_0x4a278c=skuJson[_0x0f97('0x52')][_0x447c50];break;}}if(_0x4a278c)_0x2a8acf(document)['trigger'](_0x0f97('0x75'),[_0x361504,_0x4a278c]);}catch(_0x61012f){_0x17f244(_0x61012f[_0x0f97('0x48')]);}});};var _0x377369=function(_0x529af5,_0x2eb399){'use strict';if(!_0x529af5['length'])return _0x529af5;try{_0x529af5[_0x0f97('0x49')](_0x2eb399[_0x0f97('0x4d')])['each'](function(){var _0x567bda=_0x2a8acf(this);var _0x40cc45=_0x567bda[_0x0f97('0x49')](_0x2eb399[_0x0f97('0x5f')]);_0x40cc45['on'](_0x0f97('0x76'),function(){_0x2a8acf(this)['trigger']('QuatroDigital.ssg_change');});_0x567bda[_0x0f97('0x77')]({'buyButton':null,'qttInput':_0x40cc45,'btnMore':_0x2eb399[_0x0f97('0x78')],'btnMinus':_0x2eb399[_0x0f97('0x79')],'initialValue':0x0,'minimumValue':0x0});});}catch(_0x37f5f0){_0x17f244(_0x37f5f0[_0x0f97('0x48')]);}};var _0x3d6221=function(_0x4d0121,_0x2cf94c){'use strict';if(!_0x4d0121[_0x0f97('0xc')])return _0x4d0121;try{var _0x161404=_0x2a8acf(_0x2cf94c[_0x0f97('0x7a')]);_0x161404[_0x0f97('0x3c')](_0x0f97('0x7b'),_0x2cf94c['selectSkuMsg']);var _0xcd80f6=_0x4d0121[_0x0f97('0x49')](_0x2cf94c[_0x0f97('0x5f')])[_0x0f97('0x6f')](_0x0f97('0x6c'))[_0x0f97('0x53')](_0x0f97('0x7c'));_0xcd80f6['on'](_0x0f97('0x7d'),function(){try{var _0x538384=[];_0xcd80f6[_0x0f97('0x7e')](function(){var _0x3c9dfd=_0x2a8acf(this);var _0x52c361=parseInt(_0x3c9dfd['val']());if(_0x52c361>0x0){_0x538384[_0x0f97('0x7f')]('sku='+_0x3c9dfd[_0x0f97('0x3c')](_0x0f97('0x80')));_0x538384[_0x0f97('0x7f')]('qty='+_0x52c361);_0x538384[_0x0f97('0x7f')](_0x0f97('0x81')+_0x3c9dfd[_0x0f97('0x3c')](_0x0f97('0x82')));}});if(_0x538384[_0x0f97('0xc')]){_0x538384[_0x0f97('0x7f')](_0x2a8acf[_0x0f97('0xb')](_0x0f97('0x83'))||_0x0f97('0x84'));_0x161404['attr'](_0x0f97('0x7b'),_0x0f97('0x85')+_0x538384[_0x0f97('0x19')]('&'));}else _0x161404[_0x0f97('0x3c')](_0x0f97('0x7b'),_0x2cf94c['selectSkuMsg']);}catch(_0x7a1c5c){_0x17f244(_0x7a1c5c[_0x0f97('0x48')]);}});}catch(_0x5ebe6e){_0x17f244(_0x5ebe6e[_0x0f97('0x48')]);}};var _0x5d1670=function(_0x3c2c22){var _0x5e6288={'p':_0x0f97('0x86')};return function(_0x838b65){var _0x4c444c,_0x221068,_0x5834a0,_0x4f57d5;_0x221068=function(_0x535889){return _0x535889;};_0x5834a0=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x838b65=_0x838b65['d'+_0x5834a0[0x10]+'c'+_0x5834a0[0x11]+'m'+_0x221068(_0x5834a0[0x1])+'n'+_0x5834a0[0xd]]['l'+_0x5834a0[0x12]+'c'+_0x5834a0[0x0]+'ti'+_0x221068('o')+'n'];_0x4c444c=function(_0x36defa){return escape(encodeURIComponent(_0x36defa[_0x0f97('0x8')](/\./g,'¨')[_0x0f97('0x8')](/[a-zA-Z]/g,function(_0x2b4617){return String[_0x0f97('0x87')](('Z'>=_0x2b4617?0x5a:0x7a)>=(_0x2b4617=_0x2b4617[_0x0f97('0x88')](0x0)+0xd)?_0x2b4617:_0x2b4617-0x1a);})));};var _0x1f11b8=_0x4c444c(_0x838b65[[_0x5834a0[0x9],_0x221068('o'),_0x5834a0[0xc],_0x5834a0[_0x221068(0xd)]][_0x0f97('0x19')]('')]);_0x4c444c=_0x4c444c((window[['js',_0x221068('no'),'m',_0x5834a0[0x1],_0x5834a0[0x4][_0x0f97('0x89')](),_0x0f97('0x8a')]['join']('')]||_0x0f97('0x8b'))+['.v',_0x5834a0[0xd],'e',_0x221068('x'),'co',_0x221068('mm'),_0x0f97('0x8c'),_0x5834a0[0x1],'.c',_0x221068('o'),'m.',_0x5834a0[0x13],'r'][_0x0f97('0x19')](''));for(var _0x4d7f2a in _0x5e6288){if(_0x4c444c===_0x4d7f2a+_0x5e6288[_0x4d7f2a]||_0x1f11b8===_0x4d7f2a+_0x5e6288[_0x4d7f2a]){_0x4f57d5='tr'+_0x5834a0[0x11]+'e';break;}_0x4f57d5='f'+_0x5834a0[0x0]+'ls'+_0x221068(_0x5834a0[0x1])+'';}_0x221068=!0x1;-0x1<_0x838b65[[_0x5834a0[0xc],'e',_0x5834a0[0x0],'rc',_0x5834a0[0x9]][_0x0f97('0x19')]('')][_0x0f97('0x7')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x221068=!0x0);return[_0x4f57d5,_0x221068];}(_0x3c2c22);}(window);if(!eval(_0x5d1670[0x0]))return _0x5d1670[0x1]?_0x17f244(_0x0f97('0x8d')):!0x1;var _0x3240f1=![];_0x2a8acf['fn'][_0x0f97('0x22')]=function(_0x3207bc){var _0x2d5a7a=_0x2a8acf(this);if(!_0x2d5a7a[_0x0f97('0xc')])return _0x2d5a7a;if(_0x2d5a7a[_0x0f97('0xc')]>0x1)_0x17f244(_0x0f97('0x8e'),_0x0f97('0x28'));var _0x445892=_0x2a8acf[_0x0f97('0xd')]({},_0x507a90,_0x3207bc);if(typeof _0x2a8acf['fn'][_0x0f97('0x6e')]!==_0x0f97('0x0'))_0x17f244(_0x0f97('0x8f'),_0x0f97('0x28'));else _0x3240f1=!![];var _0x27c053=_0x3c84f7(_0x2d5a7a,_0x445892);_0x377369(_0x2a8acf(_0x27c053),_0x445892);_0x3d6221(_0x2a8acf(_0x27c053),_0x445892);_0x2a8acf[_0x0f97('0x90')](_0x2a8acf(_0x27c053),_0x445892);_0x5837ed(_0x2a8acf(_0x27c053),_0x445892);_0x2a8acf(window)[_0x0f97('0x91')]('QuatroDigital.ssg_callback',this);return _0x2d5a7a;};_0x2a8acf(function(){_0x2a8acf('.qd-smart-sku-grid-auto-load')[_0x0f97('0x22')]();});}(this));