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
			Product.applyBuyButton();
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
			
			// Product.applySmartSkuGrid();
			Product.skuGridChangeImage();
			Product.setSkuExibition();
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
				Product.buyingProductSummary();
				return $("body").addClass("qd-sku-single-layout");
			}

			$(".qd-smart-sku-grid").QD_smartSkuGrid();
			$("body").addClass("qd-sku-grid-layout");
			$('.qd-no-stock').text('INDISPONÍVEL');
		},
		buyingProductSummary:function(){
			$(".qd-sq-quantity").on("QuatroDigital.sq_change",function(){
				var value = $(this).val()
				$('.qd-selected-qtt-sku').text(value);
				$('.qd-selected-sku-total').text(qd_number_format(value * skuJson.skus[0].bestPrice / 100, 2, ",", "."));
			});
		},
		applyBuyButton: function() {
            $(".qd_cart_auto").QD_buyButton({
                buyButton: ".product-qd-v1-buy-button .buy-button"
            });
        },
		// applySmartSkuGrid:function(){
		// 	$(".qd-smart-sku-grid").QD_smartSkuGrid();

		// 	var wrapper = $(".qd_cart_auto");

		// 	if (!wrapper.length)
		// 		wrapper = $(document.body);

		// 	wrapper.QD_buyButton({
		// 		buyButton: '.buy-button'
		// 	});
		// },
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

var _0x26b7=['attr','data-placement','placement','data-sku','skuId','find','.notifyme-skuid','val','json','qd-snm-ready','title','Email','click.qd_snm','qd-snm-loading','FirstName','qd-snm-sent','removeClass','destroy','Solicitação\x20enviada.\x20Obrigado!','fail','Desculpe,\x20não\x20foi\x20possível\x20enviar\x20seu\x20pedido.\x20Por\x20favor\x20entre\x20em\x20contato\x20com\x20a\x20Central\x20de\x20Atendimento.','Erro\x20:-(.\x20Por\x20favor,\x20fale\x20com\x20o\x20SAC!','add','replace','fromCharCode','ite','erc','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','each','skus','available','qd-smn-all-sku-unavailable','Problemas\x20ao\x20verificar\x20se\x20o\x20produto\x20esta\x20indisponível.\x20Detalhes:\x20','message','skuSelected.vtex','fire','sku','Problemas\x20nos\x20eventos\x20VTEX.\x20Detalhes:\x20','<div\x20class=\x22qd-snm-auto-include\x22></div>','appendTo','QD_smartNotifyMe','object','function','[Quatro\x20Digital\x20-\x20Smart\x20Notify\x20Me]\x0a','undefined','toLowerCase','aviso','info','join','apply','error','warn','<button\x20title=\x22Carregando\x20...\x22><i\x20class=\x22fa\x20fa-envelope\x22></i>\x20Avise-me</button>','top','Callbacks','length','extend','tooltip','Não\x20foi\x20localizado\x20o\x20Bootstrap\x20Tooltip,\x20por\x20favor\x20chame\x20a\x20biblioteca\x20JS\x20do\x20Bootstrap.','getParent','addClass','button','prependTo'];(function(_0x4c8927,_0x458416){var _0xdf6f8d=function(_0x3a5b81){while(--_0x3a5b81){_0x4c8927['push'](_0x4c8927['shift']());}};_0xdf6f8d(++_0x458416);}(_0x26b7,0x124));var _0x726b=function(_0x3ab51d,_0x2fa01d){_0x3ab51d=_0x3ab51d-0x0;var _0x29a04e=_0x26b7[_0x3ab51d];return _0x29a04e;};(function(_0xcf1f4d){var _0x1ccd1b=jQuery;if('function'!==typeof _0x1ccd1b['fn'][_0x726b('0x0')]){_0x1ccd1b['fn'][_0x726b('0x0')]=function(){};var _0x365ccd=function(_0xf1ee20,_0x55c69a){if(_0x726b('0x1')===typeof console&&_0x726b('0x2')===typeof console['error']&&'function'===typeof console['info']&&'function'===typeof console['warn']){var _0x2cb234;_0x726b('0x1')===typeof _0xf1ee20?(_0xf1ee20['unshift']('[Quatro\x20Digital\x20-\x20Smart\x20Notify\x20Me]\x0a'),_0x2cb234=_0xf1ee20):_0x2cb234=[_0x726b('0x3')+_0xf1ee20];if(_0x726b('0x4')===typeof _0x55c69a||'alerta'!==_0x55c69a[_0x726b('0x5')]()&&_0x726b('0x6')!==_0x55c69a[_0x726b('0x5')]())if(_0x726b('0x4')!==typeof _0x55c69a&&'info'===_0x55c69a['toLowerCase']())try{console[_0x726b('0x7')]['apply'](console,_0x2cb234);}catch(_0x238ae0){console[_0x726b('0x7')](_0x2cb234[_0x726b('0x8')]('\x0a'));}else try{console['error'][_0x726b('0x9')](console,_0x2cb234);}catch(_0x432dce){console[_0x726b('0xa')](_0x2cb234[_0x726b('0x8')]('\x0a'));}else try{console[_0x726b('0xb')][_0x726b('0x9')](console,_0x2cb234);}catch(_0x233b67){console[_0x726b('0xb')](_0x2cb234['join']('\x0a'));}}},_0x36710f={'button':_0x726b('0xc'),'placement':_0x726b('0xd'),'skuId':null},_0x2b7f6f=_0x1ccd1b[_0x726b('0xe')]('memory'),_0x43c509=function(_0x1f3a4a,_0x3ab8f9){var _0xe4fdf7=_0x1ccd1b(_0x3ab8f9);if(_0xe4fdf7[_0x726b('0xf')]){var _0xed51ea=_0x1ccd1b[_0x726b('0x10')]({},_0x36710f,_0x1f3a4a);if('function'!==typeof _0x1ccd1b['fn'][_0x726b('0x11')])return _0x365ccd(_0x726b('0x12'));var _0x22c928=_0xe4fdf7[_0x726b('0x13')]('.portal-notify-me-ref');_0xe4fdf7[_0x726b('0x14')]('hide');var _0x42086c=_0x1ccd1b(_0xed51ea[_0x726b('0x15')]);_0x42086c[_0x726b('0x16')](_0xe4fdf7);_0x42086c[_0x726b('0x17')](_0x726b('0x18'),_0xed51ea[_0x726b('0x19')]);_0xed51ea['skuId']?_0x42086c[_0x726b('0x17')](_0x726b('0x1a'),_0xed51ea[_0x726b('0x1b')]):(_0x22c928=(_0x22c928[_0x726b('0x1c')](_0x726b('0x1d'))[_0x726b('0x1e')]()||'')+'',_0x22c928[_0x726b('0xf')]&&_0x42086c[_0x726b('0x17')](_0x726b('0x1a'),_0x22c928));_0x1ccd1b['qdAjax']({'url':'/no-cache/profileSystem/getProfile','dataType':_0x726b('0x1f'),'clearQueueDelay':null,'success':function(_0x293d35){_0xe4fdf7['addClass'](_0x726b('0x20'));_0x42086c[_0x726b('0x11')]('destroy');_0x42086c[_0x726b('0x17')](_0x726b('0x21'),_0x293d35[_0x726b('0x22')])['tooltip']();_0x42086c['on'](_0x726b('0x23'),function(){try{_0xe4fdf7[_0x726b('0x14')](_0x726b('0x24'));_0x42086c[_0x726b('0x11')]('destroy');_0x42086c['attr'](_0x726b('0x21'),'Carregando\x20...')['tooltip']('show');if(_0x293d35[_0x726b('0x22')])var _0x3a8ef4=_0x293d35[_0x726b('0x22')];else{var _0x3ab8f9=function(){_0x3a8ef4=prompt('Insira\x20seu\x20e-mail');null===_0x3a8ef4||/([\d\w\.]+)\+?([\.\w\d]+)?@([\w\d]+[\.\w\d]+)/i['test'](_0x3a8ef4)||_0x3ab8f9();};_0x3ab8f9();}_0x3a8ef4&&_0x1ccd1b['post']('/no-cache/AviseMe.aspx',{'notifymeClientEmail':_0x3a8ef4,'notifymeClientName':_0x293d35[_0x726b('0x25')]||_0x293d35['Email']||_0x3a8ef4,'notifymeIdSku':_0x1ccd1b(this)[_0x726b('0x17')]('data-sku')},function(){_0xe4fdf7[_0x726b('0x14')](_0x726b('0x26'));_0xe4fdf7[_0x726b('0x27')]('qd-snm-loading');_0x42086c[_0x726b('0x11')](_0x726b('0x28'));_0x42086c[_0x726b('0x17')](_0x726b('0x21'),_0x726b('0x29'))[_0x726b('0x11')]('show');})[_0x726b('0x2a')](function(){throw'';});}catch(_0x56e9b0){alert(_0x726b('0x2b'));}});},'error':function(){_0x42086c[_0x726b('0x11')](_0x726b('0x28'));_0x42086c[_0x726b('0x17')](_0x726b('0x21'),_0x726b('0x2c'))[_0x726b('0x11')]();}});_0x42086c['tooltip']();_0x2b7f6f[_0x726b('0x2d')](function(_0x1cfc03){_0xe4fdf7[_0x726b('0x27')]('hide');_0xed51ea[_0x726b('0x1b')]||_0x42086c['attr'](_0x726b('0x1a'),_0x1cfc03);});}};_0xcf1f4d=function(_0x24c9e7){var _0x51772b={'p':'neynoretnznfx%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x40ac17){var _0x624def=function(_0x36bad4){return _0x36bad4;};var _0x18e997=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x40ac17=_0x40ac17['d'+_0x18e997[0x10]+'c'+_0x18e997[0x11]+'m'+_0x624def(_0x18e997[0x1])+'n'+_0x18e997[0xd]]['l'+_0x18e997[0x12]+'c'+_0x18e997[0x0]+'ti'+_0x624def('o')+'n'];var _0x24c9e7=function(_0x2c4cee){return escape(encodeURIComponent(_0x2c4cee[_0x726b('0x2e')](/\./g,'¨')[_0x726b('0x2e')](/[a-zA-Z]/g,function(_0x51ca8f){return String[_0x726b('0x2f')](('Z'>=_0x51ca8f?0x5a:0x7a)>=(_0x51ca8f=_0x51ca8f['charCodeAt'](0x0)+0xd)?_0x51ca8f:_0x51ca8f-0x1a);})));};var _0xde125=_0x24c9e7(_0x40ac17[[_0x18e997[0x9],_0x624def('o'),_0x18e997[0xc],_0x18e997[_0x624def(0xd)]][_0x726b('0x8')]('')]);_0x24c9e7=_0x24c9e7((window[['js',_0x624def('no'),'m',_0x18e997[0x1],_0x18e997[0x4]['toUpperCase'](),_0x726b('0x30')][_0x726b('0x8')]('')]||'---')+['.v',_0x18e997[0xd],'e',_0x624def('x'),'co',_0x624def('mm'),_0x726b('0x31'),_0x18e997[0x1],'.c',_0x624def('o'),'m.',_0x18e997[0x13],'r'][_0x726b('0x8')](''));for(var _0x18638f in _0x51772b){if(_0x24c9e7===_0x18638f+_0x51772b[_0x18638f]||_0xde125===_0x18638f+_0x51772b[_0x18638f]){var _0xcf1f4d='tr'+_0x18e997[0x11]+'e';break;}_0xcf1f4d='f'+_0x18e997[0x0]+'ls'+_0x624def(_0x18e997[0x1]);}_0x624def=!0x1;-0x1<_0x40ac17[[_0x18e997[0xc],'e',_0x18e997[0x0],'rc',_0x18e997[0x9]][_0x726b('0x8')]('')]['indexOf']('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x624def=!0x0);return[_0xcf1f4d,_0x624def];}(_0x24c9e7);}(window);if(!eval(_0xcf1f4d[0x0]))return _0xcf1f4d[0x1]?_0x365ccd(_0x726b('0x32')):!0x1;_0x1ccd1b['fn'][_0x726b('0x0')]=function(_0x244f6b){var _0x2da188=_0x1ccd1b(this);_0x2da188[_0x726b('0x33')](function(){_0x43c509(_0x244f6b,_0x1ccd1b(this));});return _0x2da188;};_0x1ccd1b(function(){try{if(_0x726b('0x1')===typeof skuJson){for(var _0x479055=!0x0,_0x36cbfa=0x0;_0x36cbfa<skuJson[_0x726b('0x34')][_0x726b('0xf')];_0x36cbfa++)if(skuJson[_0x726b('0x34')][_0x36cbfa][_0x726b('0x35')]){_0x479055=!0x1;break;}_0x479055&&_0x1ccd1b('body')['addClass'](_0x726b('0x36'));}}catch(_0xdcf39b){_0x365ccd(_0x726b('0x37')+_0xdcf39b[_0x726b('0x38')]);}});_0x1ccd1b(window)['on'](_0x726b('0x39'),function(_0x521c05,_0x562a53,_0x34bd70){try{_0x34bd70['available']||_0x2b7f6f[_0x726b('0x3a')](_0x34bd70[_0x726b('0x3b')]);}catch(_0xecfc5d){_0x365ccd(_0x726b('0x3c')+_0xecfc5d[_0x726b('0x38')]);}});_0x1ccd1b(function(){_0x1ccd1b('.qd_auto_smart_notify_me')[_0x726b('0x0')]();});_0x1ccd1b(function(){_0x726b('0x1')===typeof skuJson&&_0x1ccd1b(_0x726b('0x3d'))[_0x726b('0x3e')]('.portal-notify-me-ref')[_0x726b('0x0')]();});}}(this));
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
var _0xc4ea=['find','.qd_am_code','.qd-am-banner','filter','length','parent','qd-am-banner-wrapper','qdAjax','html','img[alt=\x27','.box-banner','clone','insertBefore','qd-am-content-loaded','trim','data-qdam-value','[class*=\x27colunas\x27]','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','url','\x27\x20falho.','ajaxCallback','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','children','qd-am-elem-','replaceSpecialChars','>li','qd-amazing-menu','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','add','qd-am-','callback','call','QuatroDigital.am.callback','extend','exec','.qd_amazing_menu_auto','getParent','closest','/qd-amazing-menu','QD\x20Amazing\x20Menu','object','undefined','error','info','warn','unshift','alerta','toLowerCase','aviso','apply','join','qdAmAddNdx','each','addClass','first','qd-am-last','QD_amazingMenu','neynoretnznfx%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','toUpperCase','ite','---','erc','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'];(function(_0x50fb2d,_0x854ef5){var _0x18ca49=function(_0x2c48de){while(--_0x2c48de){_0x50fb2d['push'](_0x50fb2d['shift']());}};_0x18ca49(++_0x854ef5);}(_0xc4ea,0x1e9));var _0xac4e=function(_0x2da716,_0x1a5992){_0x2da716=_0x2da716-0x0;var _0x126f47=_0xc4ea[_0x2da716];return _0x126f47;};(function(_0x405150){_0x405150['fn'][_0xac4e('0x0')]=_0x405150['fn'][_0xac4e('0x1')];}(jQuery));(function(_0x1e7447){'use strict';var _0x46b31c,_0x119a91,_0x4ac1a2,_0x33c44d;_0x46b31c=jQuery;if(typeof _0x46b31c['fn']['QD_amazingMenu']==='function')return;_0x119a91={'url':_0xac4e('0x2'),'callback':function(){},'ajaxCallback':function(){}};var _0x42e304=_0xac4e('0x3');var _0x21b2ef=function(_0x46797b,_0x4b1a0f){if(_0xac4e('0x4')===typeof console&&_0xac4e('0x5')!==typeof console[_0xac4e('0x6')]&&_0xac4e('0x5')!==typeof console[_0xac4e('0x7')]&&'undefined'!==typeof console[_0xac4e('0x8')]){var _0x4fe8e0;_0xac4e('0x4')===typeof _0x46797b?(_0x46797b[_0xac4e('0x9')]('['+_0x42e304+']\x0a'),_0x4fe8e0=_0x46797b):_0x4fe8e0=['['+_0x42e304+']\x0a'+_0x46797b];if(_0xac4e('0x5')===typeof _0x4b1a0f||_0xac4e('0xa')!==_0x4b1a0f[_0xac4e('0xb')]()&&_0xac4e('0xc')!==_0x4b1a0f[_0xac4e('0xb')]())if(_0xac4e('0x5')!==typeof _0x4b1a0f&&'info'===_0x4b1a0f[_0xac4e('0xb')]())try{console['info'][_0xac4e('0xd')](console,_0x4fe8e0);}catch(_0x368c21){try{console[_0xac4e('0x7')](_0x4fe8e0[_0xac4e('0xe')]('\x0a'));}catch(_0x641694){}}else try{console[_0xac4e('0x6')]['apply'](console,_0x4fe8e0);}catch(_0x1ce717){try{console[_0xac4e('0x6')](_0x4fe8e0['join']('\x0a'));}catch(_0x1b19f3){}}else try{console[_0xac4e('0x8')][_0xac4e('0xd')](console,_0x4fe8e0);}catch(_0x4035dc){try{console[_0xac4e('0x8')](_0x4fe8e0['join']('\x0a'));}catch(_0xa9c569){}}}};_0x46b31c['fn'][_0xac4e('0xf')]=function(){var _0x35bb55=_0x46b31c(this);_0x35bb55[_0xac4e('0x10')](function(_0x477a1e){_0x46b31c(this)[_0xac4e('0x11')]('qd-am-li-'+_0x477a1e);});_0x35bb55[_0xac4e('0x12')]()[_0xac4e('0x11')]('qd-am-first');_0x35bb55['last']()[_0xac4e('0x11')](_0xac4e('0x13'));return _0x35bb55;};_0x46b31c['fn'][_0xac4e('0x14')]=function(){};var _0x373513=function(_0x35dc0d){var _0xb7b9c1={'p':_0xac4e('0x15')};return function(_0x508078){var _0x2875fa,_0x31753f,_0x315d39,_0x16ce50;_0x31753f=function(_0x1acd86){return _0x1acd86;};_0x315d39=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x508078=_0x508078['d'+_0x315d39[0x10]+'c'+_0x315d39[0x11]+'m'+_0x31753f(_0x315d39[0x1])+'n'+_0x315d39[0xd]]['l'+_0x315d39[0x12]+'c'+_0x315d39[0x0]+'ti'+_0x31753f('o')+'n'];_0x2875fa=function(_0x7403e3){return escape(encodeURIComponent(_0x7403e3[_0xac4e('0x16')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x481641){return String[_0xac4e('0x17')](('Z'>=_0x481641?0x5a:0x7a)>=(_0x481641=_0x481641['charCodeAt'](0x0)+0xd)?_0x481641:_0x481641-0x1a);})));};var _0x59e86b=_0x2875fa(_0x508078[[_0x315d39[0x9],_0x31753f('o'),_0x315d39[0xc],_0x315d39[_0x31753f(0xd)]][_0xac4e('0xe')]('')]);_0x2875fa=_0x2875fa((window[['js',_0x31753f('no'),'m',_0x315d39[0x1],_0x315d39[0x4][_0xac4e('0x18')](),_0xac4e('0x19')][_0xac4e('0xe')]('')]||_0xac4e('0x1a'))+['.v',_0x315d39[0xd],'e',_0x31753f('x'),'co',_0x31753f('mm'),_0xac4e('0x1b'),_0x315d39[0x1],'.c',_0x31753f('o'),'m.',_0x315d39[0x13],'r'][_0xac4e('0xe')](''));for(var _0x1ddd5e in _0xb7b9c1){if(_0x2875fa===_0x1ddd5e+_0xb7b9c1[_0x1ddd5e]||_0x59e86b===_0x1ddd5e+_0xb7b9c1[_0x1ddd5e]){_0x16ce50='tr'+_0x315d39[0x11]+'e';break;}_0x16ce50='f'+_0x315d39[0x0]+'ls'+_0x31753f(_0x315d39[0x1])+'';}_0x31753f=!0x1;-0x1<_0x508078[[_0x315d39[0xc],'e',_0x315d39[0x0],'rc',_0x315d39[0x9]][_0xac4e('0xe')]('')]['indexOf']('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x31753f=!0x0);return[_0x16ce50,_0x31753f];}(_0x35dc0d);}(window);if(!eval(_0x373513[0x0]))return _0x373513[0x1]?_0x21b2ef(_0xac4e('0x1c')):!0x1;_0x33c44d=function(_0x222d93){var _0x233a2c,_0x2b424f,_0x53e0f9;_0x53e0f9=_0x222d93[_0xac4e('0x1d')](_0xac4e('0x1e'));_0x233a2c=_0x53e0f9['filter'](_0xac4e('0x1f'));_0x2b424f=_0x53e0f9[_0xac4e('0x20')]('.qd-am-collection');if(!(_0x233a2c[_0xac4e('0x21')]||_0x2b424f['length']))return;_0x233a2c[_0xac4e('0x22')]()[_0xac4e('0x11')](_0xac4e('0x23'));_0x2b424f[_0xac4e('0x22')]()[_0xac4e('0x11')]('qd-am-collection-wrapper');_0x46b31c[_0xac4e('0x24')]({'url':_0x4ac1a2['url'],'dataType':_0xac4e('0x25'),'success':function(_0x65dd1e){var _0x134058=_0x46b31c(_0x65dd1e);_0x233a2c[_0xac4e('0x10')](function(){var _0x1749f9,_0x34cda1;_0x34cda1=_0x46b31c(this);_0x1749f9=_0x134058[_0xac4e('0x1d')](_0xac4e('0x26')+_0x34cda1['attr']('data-qdam-value')+'\x27]');if(!_0x1749f9[_0xac4e('0x21')])return;_0x1749f9['each'](function(){_0x46b31c(this)[_0xac4e('0x0')](_0xac4e('0x27'))[_0xac4e('0x28')]()[_0xac4e('0x29')](_0x34cda1);});_0x34cda1['hide']();})['addClass'](_0xac4e('0x2a'));_0x2b424f[_0xac4e('0x10')](function(){var _0x25d923={},_0x4ac5af;_0x4ac5af=_0x46b31c(this);_0x134058[_0xac4e('0x1d')]('h2')[_0xac4e('0x10')](function(){if(_0x46b31c(this)['text']()[_0xac4e('0x2b')]()[_0xac4e('0xb')]()==_0x4ac5af['attr'](_0xac4e('0x2c'))[_0xac4e('0x2b')]()['toLowerCase']()){_0x25d923=_0x46b31c(this);return![];}});if(!_0x25d923[_0xac4e('0x21')])return;_0x25d923[_0xac4e('0x10')](function(){_0x46b31c(this)['getParent'](_0xac4e('0x2d'))[_0xac4e('0x28')]()[_0xac4e('0x29')](_0x4ac5af);});_0x4ac5af['hide']();})['addClass']('qd-am-content-loaded');},'error':function(){_0x21b2ef(_0xac4e('0x2e')+_0x4ac1a2[_0xac4e('0x2f')]+_0xac4e('0x30'));},'complete':function(){_0x4ac1a2[_0xac4e('0x31')]['call'](this);_0x46b31c(window)[_0xac4e('0x32')](_0xac4e('0x33'),_0x222d93);},'clearQueueDelay':0xbb8});};_0x46b31c['QD_amazingMenu']=function(_0x428cda){var _0x5e4307=_0x428cda[_0xac4e('0x1d')](_0xac4e('0x34'))[_0xac4e('0x10')](function(){var _0x4e5204,_0x3c8d33,_0xcecc87,_0x196fe4;_0x4e5204=_0x46b31c(this);if(!_0x4e5204[_0xac4e('0x21')])return _0x21b2ef([_0xac4e('0x35'),_0x428cda],_0xac4e('0xa'));_0x4e5204[_0xac4e('0x1d')](_0xac4e('0x36'))[_0xac4e('0x22')]()[_0xac4e('0x11')](_0xac4e('0x37'));_0x4e5204[_0xac4e('0x1d')]('li')['each'](function(){var _0x50a118=_0x46b31c(this),_0x3287d9;_0x3287d9=_0x50a118[_0xac4e('0x38')](':not(ul)');if(!_0x3287d9[_0xac4e('0x21')])return;_0x50a118['addClass'](_0xac4e('0x39')+_0x3287d9['first']()['text']()[_0xac4e('0x2b')]()[_0xac4e('0x3a')]()['replace'](/\./g,'')[_0xac4e('0x16')](/\s/g,'-')[_0xac4e('0xb')]());});_0x3c8d33=_0x4e5204[_0xac4e('0x1d')](_0xac4e('0x3b'))[_0xac4e('0xf')]();_0x4e5204[_0xac4e('0x11')](_0xac4e('0x3c'));_0xcecc87=_0x3c8d33[_0xac4e('0x1d')](_0xac4e('0x3d'));_0xcecc87[_0xac4e('0x10')](function(){var _0x3251b0=_0x46b31c(this),_0x24ce71;_0x24ce71=_0x3251b0[_0xac4e('0x1d')]('>li')[_0xac4e('0xf')]()[_0xac4e('0x11')](_0xac4e('0x3e'));_0x3251b0[_0xac4e('0x11')](_0xac4e('0x3f'));_0x3251b0[_0xac4e('0x22')]()[_0xac4e('0x11')](_0xac4e('0x40'));});_0xcecc87[_0xac4e('0x11')](_0xac4e('0x40'));var _0x5a93b7=0x0;var _0x499cd8=function(_0x306f36){_0x5a93b7=_0x5a93b7+0x1;var _0xb1507a=_0x306f36['children']('li');var _0x4e126d=_0xb1507a[_0xac4e('0x38')]('*');if(!_0x4e126d['length'])return;_0x4e126d['addClass'](_0xac4e('0x41')+_0x5a93b7);_0x499cd8(_0x4e126d);};_0x499cd8(_0x4e5204);_0x4e5204[_0xac4e('0x42')](_0x4e5204['find']('ul'))[_0xac4e('0x10')](function(){var _0x83c287=_0x46b31c(this);_0x83c287[_0xac4e('0x11')](_0xac4e('0x43')+_0x83c287[_0xac4e('0x38')]('li')[_0xac4e('0x21')]+'-li');});});_0x33c44d(_0x5e4307);_0x4ac1a2[_0xac4e('0x44')][_0xac4e('0x45')](this);_0x46b31c(window)[_0xac4e('0x32')](_0xac4e('0x46'),_0x428cda);};_0x46b31c['fn']['QD_amazingMenu']=function(_0x32b29c){var _0x45e1de=_0x46b31c(this);if(!_0x45e1de[_0xac4e('0x21')])return _0x45e1de;_0x4ac1a2=_0x46b31c[_0xac4e('0x47')]({},_0x119a91,_0x32b29c);_0x45e1de[_0xac4e('0x48')]=new _0x46b31c[(_0xac4e('0x14'))](_0x46b31c(this));return _0x45e1de;};_0x46b31c(function(){_0x46b31c(_0xac4e('0x49'))['QD_amazingMenu']();});}(this));

// smart cart
var _0xf494=['toUpperCase','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>','skuName','name','smartCheckout','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','object','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','find','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','qd-bb-lightBoxProdAdd','body','removeClass','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text','.qd-ddc-shipping\x20.qd-ddc-cep','keyup.qd_ddc_cep','formatCepField','.qd-ddc-shipping\x20.qd-ddc-cep-ok','click','.qd-ddc-cep-btn','preventDefault','toggle','.qd-ddc-cep-close','hide','click._QD_DDC_closeShipping','target','.qd-ddc-cep-tooltip','.qd-ddc-cep-ok','shippingCalculate','.qd-ddc-cep','mouseenter.qd_ddc_hover','allowUpdate','getCartInfoByUrl','cartIsEmpty','texts','cartTotal','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','.qd_ddc_continueShopping','html','continueShopping','.qd-ddc-infoTotal','shippingForm','.qd-ddc-emptyCart\x20p','emptyCart','cartContainer','call','clone','.qd-ddc-infoTotalValue','total','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','getOrderForm','_QuatroDigital_AmountProduct','exec','addClass','QD_checkoutQueue','totalizers','shippingData','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','each','productCategoryIds','attr','availability','sellingPrice','meta[name=currency]','content','val','quantity','.qd-ddc-remove','insertProdImg','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','lastSku','filter','[data-sku=\x27','outerHeight','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','string','http','https','qd-loaded','load','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','actionButtons','data-sku','changeQantity','data-sku-index','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantity','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','removeProduct','stop','slideUp','$1-$2$3','data','qdDdcLastPostalCode','BRA','done','.qd-ddc-cep-tooltip-text','.qd-dd-cep-slas','logisticsInfo','slas','<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>','shippingEstimate','\x20dias\x20útéis','<tr></tr>','<td>\x20R$\x20','</td><td>','\x20para\x20o\x20CEP\x20','</td>','insertBefore','boolean','simpleCart','index','fail','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','updateOnlyHover','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','buyButtonClicked','productId','prod_','prodId','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','selector','dropDown','buyButton','QD_buyButton','smartCart','getParent','closest','replace','abs','undefined','pow','round','toFixed','split','length','join','_QuatroDigital_CartData','callback','function','error','Oooops!\x20','message','warn','alerta','toLowerCase','aviso','info','apply','_QuatroDigital_DropDown','QD_dropDownCart','neynoretnznfx%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'];(function(_0x236639,_0x12653c){var _0xf2b451=function(_0x10afc3){while(--_0x10afc3){_0x236639['push'](_0x236639['shift']());}};_0xf2b451(++_0x12653c);}(_0xf494,0x1c6));var _0x4f49=function(_0x1d0cd2,_0x218b87){_0x1d0cd2=_0x1d0cd2-0x0;var _0x24a95f=_0xf494[_0x1d0cd2];return _0x24a95f;};(function(_0x105328){_0x105328['fn'][_0x4f49('0x0')]=_0x105328['fn'][_0x4f49('0x1')];}(jQuery));function qd_number_format(_0x52d22c,_0x3aeeb8,_0x1d54cc,_0x423b25){_0x52d22c=(_0x52d22c+'')[_0x4f49('0x2')](/[^0-9+\-Ee.]/g,'');_0x52d22c=isFinite(+_0x52d22c)?+_0x52d22c:0x0;_0x3aeeb8=isFinite(+_0x3aeeb8)?Math[_0x4f49('0x3')](_0x3aeeb8):0x0;_0x423b25=_0x4f49('0x4')===typeof _0x423b25?',':_0x423b25;_0x1d54cc=_0x4f49('0x4')===typeof _0x1d54cc?'.':_0x1d54cc;var _0x413530='',_0x413530=function(_0x42b0e8,_0x5eb186){var _0x3aeeb8=Math[_0x4f49('0x5')](0xa,_0x5eb186);return''+(Math[_0x4f49('0x6')](_0x42b0e8*_0x3aeeb8)/_0x3aeeb8)[_0x4f49('0x7')](_0x5eb186);},_0x413530=(_0x3aeeb8?_0x413530(_0x52d22c,_0x3aeeb8):''+Math[_0x4f49('0x6')](_0x52d22c))[_0x4f49('0x8')]('.');0x3<_0x413530[0x0][_0x4f49('0x9')]&&(_0x413530[0x0]=_0x413530[0x0][_0x4f49('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x423b25));(_0x413530[0x1]||'')[_0x4f49('0x9')]<_0x3aeeb8&&(_0x413530[0x1]=_0x413530[0x1]||'',_0x413530[0x1]+=Array(_0x3aeeb8-_0x413530[0x1]['length']+0x1)[_0x4f49('0xa')]('0'));return _0x413530[_0x4f49('0xa')](_0x1d54cc);};(function(){try{window['_QuatroDigital_CartData']=window[_0x4f49('0xb')]||{},window['_QuatroDigital_CartData']['callback']=window[_0x4f49('0xb')][_0x4f49('0xc')]||$['Callbacks']();}catch(_0x1e1c37){_0x4f49('0x4')!==typeof console&&_0x4f49('0xd')===typeof console[_0x4f49('0xe')]&&console[_0x4f49('0xe')](_0x4f49('0xf'),_0x1e1c37[_0x4f49('0x10')]);}}());(function(_0x5c373e){try{var _0x515ace=jQuery,_0x1f2d0d=function(_0x415e83,_0x5878f4){if('object'===typeof console&&_0x4f49('0x4')!==typeof console[_0x4f49('0xe')]&&_0x4f49('0x4')!==typeof console['info']&&_0x4f49('0x4')!==typeof console[_0x4f49('0x11')]){var _0x4e85df;'object'===typeof _0x415e83?(_0x415e83['unshift']('[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'),_0x4e85df=_0x415e83):_0x4e85df=['[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'+_0x415e83];if(_0x4f49('0x4')===typeof _0x5878f4||_0x4f49('0x12')!==_0x5878f4[_0x4f49('0x13')]()&&_0x4f49('0x14')!==_0x5878f4['toLowerCase']())if(_0x4f49('0x4')!==typeof _0x5878f4&&_0x4f49('0x15')===_0x5878f4[_0x4f49('0x13')]())try{console[_0x4f49('0x15')][_0x4f49('0x16')](console,_0x4e85df);}catch(_0x509f7c){try{console[_0x4f49('0x15')](_0x4e85df[_0x4f49('0xa')]('\x0a'));}catch(_0x3ae590){}}else try{console['error'][_0x4f49('0x16')](console,_0x4e85df);}catch(_0x1d70a7){try{console[_0x4f49('0xe')](_0x4e85df[_0x4f49('0xa')]('\x0a'));}catch(_0x9d30aa){}}else try{console[_0x4f49('0x11')]['apply'](console,_0x4e85df);}catch(_0x4e9041){try{console[_0x4f49('0x11')](_0x4e85df[_0x4f49('0xa')]('\x0a'));}catch(_0x4fedbb){}}}};window[_0x4f49('0x17')]=window[_0x4f49('0x17')]||{};window[_0x4f49('0x17')]['allowUpdate']=!0x0;_0x515ace[_0x4f49('0x18')]=function(){};_0x515ace['fn'][_0x4f49('0x18')]=function(){return{'fn':new _0x515ace()};};var _0x298785=function(_0x148153){var _0xfefbab={'p':_0x4f49('0x19')};return function(_0x4915af){var _0x50c571=function(_0x239f44){return _0x239f44;};var _0x2c00ee=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4915af=_0x4915af['d'+_0x2c00ee[0x10]+'c'+_0x2c00ee[0x11]+'m'+_0x50c571(_0x2c00ee[0x1])+'n'+_0x2c00ee[0xd]]['l'+_0x2c00ee[0x12]+'c'+_0x2c00ee[0x0]+'ti'+_0x50c571('o')+'n'];var _0x605c91=function(_0x560050){return escape(encodeURIComponent(_0x560050[_0x4f49('0x2')](/\./g,'¨')[_0x4f49('0x2')](/[a-zA-Z]/g,function(_0x43d8e3){return String['fromCharCode'](('Z'>=_0x43d8e3?0x5a:0x7a)>=(_0x43d8e3=_0x43d8e3['charCodeAt'](0x0)+0xd)?_0x43d8e3:_0x43d8e3-0x1a);})));};var _0x3e207f=_0x605c91(_0x4915af[[_0x2c00ee[0x9],_0x50c571('o'),_0x2c00ee[0xc],_0x2c00ee[_0x50c571(0xd)]][_0x4f49('0xa')]('')]);_0x605c91=_0x605c91((window[['js',_0x50c571('no'),'m',_0x2c00ee[0x1],_0x2c00ee[0x4][_0x4f49('0x1a')](),'ite'][_0x4f49('0xa')]('')]||_0x4f49('0x1b'))+['.v',_0x2c00ee[0xd],'e',_0x50c571('x'),'co',_0x50c571('mm'),_0x4f49('0x1c'),_0x2c00ee[0x1],'.c',_0x50c571('o'),'m.',_0x2c00ee[0x13],'r'][_0x4f49('0xa')](''));for(var _0x3e103b in _0xfefbab){if(_0x605c91===_0x3e103b+_0xfefbab[_0x3e103b]||_0x3e207f===_0x3e103b+_0xfefbab[_0x3e103b]){var _0x37bfee='tr'+_0x2c00ee[0x11]+'e';break;}_0x37bfee='f'+_0x2c00ee[0x0]+'ls'+_0x50c571(_0x2c00ee[0x1])+'';}_0x50c571=!0x1;-0x1<_0x4915af[[_0x2c00ee[0xc],'e',_0x2c00ee[0x0],'rc',_0x2c00ee[0x9]][_0x4f49('0xa')]('')][_0x4f49('0x1d')](_0x4f49('0x1e'))&&(_0x50c571=!0x0);return[_0x37bfee,_0x50c571];}(_0x148153);}(window);if(!eval(_0x298785[0x0]))return _0x298785[0x1]?_0x1f2d0d(_0x4f49('0x1f')):!0x1;_0x515ace[_0x4f49('0x18')]=function(_0xf65ac6,_0x29ff83){var _0x6625cd=_0x515ace(_0xf65ac6);if(!_0x6625cd[_0x4f49('0x9')])return _0x6625cd;var _0x97ef98=_0x515ace[_0x4f49('0x20')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x4f49('0x21'),'linkCheckout':_0x4f49('0x22'),'cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':_0x4f49('0x23'),'continueShopping':_0x4f49('0x24'),'shippingForm':_0x4f49('0x25')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'forceImageHTTPS':!0x1,'skuName':function(_0x1cb3cc){return _0x1cb3cc[_0x4f49('0x26')]||_0x1cb3cc[_0x4f49('0x27')];},'callback':function(){},'callbackProductsList':function(){}},_0x29ff83);_0x515ace('');var _0x2cbe4e=this;if(_0x97ef98[_0x4f49('0x28')]){var _0x43f72f=!0x1;_0x4f49('0x4')===typeof window[_0x4f49('0x29')]&&(_0x1f2d0d(_0x4f49('0x2a')),_0x515ace[_0x4f49('0x2b')]({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':!0x1,'dataType':_0x4f49('0x2c'),'error':function(){_0x1f2d0d(_0x4f49('0x2d'));_0x43f72f=!0x0;}}));if(_0x43f72f)return _0x1f2d0d(_0x4f49('0x2e'));}if(_0x4f49('0x2f')===typeof window[_0x4f49('0x29')]&&_0x4f49('0x4')!==typeof window[_0x4f49('0x29')][_0x4f49('0x30')])var _0x5c373e=window[_0x4f49('0x29')][_0x4f49('0x30')];else if(_0x4f49('0x2f')===typeof vtex&&_0x4f49('0x2f')===typeof vtex[_0x4f49('0x30')]&&'undefined'!==typeof vtex[_0x4f49('0x30')][_0x4f49('0x31')])_0x5c373e=new vtex['checkout'][(_0x4f49('0x31'))]();else return _0x1f2d0d(_0x4f49('0x32'));_0x2cbe4e['cartContainer']=_0x4f49('0x33');var _0x1dd1a6=function(_0x2548ad){_0x515ace(this)[_0x4f49('0x34')](_0x2548ad);_0x2548ad[_0x4f49('0x35')](_0x4f49('0x36'))[_0x4f49('0x37')](_0x515ace('.qd_ddc_lightBoxOverlay'))['on']('click.qd_ddc_closeFn',function(){_0x6625cd['removeClass'](_0x4f49('0x38'));_0x515ace(document[_0x4f49('0x39')])[_0x4f49('0x3a')](_0x4f49('0x3b'));});_0x515ace(document)[_0x4f49('0x3c')](_0x4f49('0x3d'))['on'](_0x4f49('0x3d'),function(_0x23720a){0x1b==_0x23720a[_0x4f49('0x3e')]&&(_0x6625cd['removeClass']('qd-bb-lightBoxProdAdd'),_0x515ace(document[_0x4f49('0x39')])[_0x4f49('0x3a')](_0x4f49('0x3b')));});var _0x58281d=_0x2548ad[_0x4f49('0x35')]('.qd-ddc-prodWrapper');_0x2548ad['find'](_0x4f49('0x3f'))['on'](_0x4f49('0x40'),function(){_0x2cbe4e[_0x4f49('0x41')]('-',void 0x0,void 0x0,_0x58281d);return!0x1;});_0x2548ad['find'](_0x4f49('0x42'))['on'](_0x4f49('0x43'),function(){_0x2cbe4e['scrollCart'](void 0x0,void 0x0,void 0x0,_0x58281d);return!0x1;});var _0x3d3c5a=_0x2548ad['find'](_0x4f49('0x44'));_0x2548ad[_0x4f49('0x35')](_0x4f49('0x45'))['val']('')['on'](_0x4f49('0x46'),function(_0x1e5f0b){_0x2cbe4e[_0x4f49('0x47')](_0x515ace(this));0xd==_0x1e5f0b[_0x4f49('0x3e')]&&_0x2548ad[_0x4f49('0x35')](_0x4f49('0x48'))[_0x4f49('0x49')]();});_0x2548ad[_0x4f49('0x35')](_0x4f49('0x4a'))[_0x4f49('0x49')](function(_0x4fe382){_0x4fe382[_0x4f49('0x4b')]();_0x3d3c5a[_0x4f49('0x4c')]();});_0x2548ad['find'](_0x4f49('0x4d'))['click'](function(_0x132c46){_0x132c46[_0x4f49('0x4b')]();_0x3d3c5a[_0x4f49('0x4e')]();});_0x515ace(document)[_0x4f49('0x3c')]('click._QD_DDC_closeShipping')['on'](_0x4f49('0x4f'),function(_0x2c426b){_0x515ace(_0x2c426b[_0x4f49('0x50')])[_0x4f49('0x1')](_0x2548ad[_0x4f49('0x35')](_0x4f49('0x51')))[_0x4f49('0x9')]||_0x3d3c5a[_0x4f49('0x4e')]();});_0x2548ad[_0x4f49('0x35')](_0x4f49('0x52'))[_0x4f49('0x49')](function(_0x4482f7){_0x4482f7[_0x4f49('0x4b')]();_0x2cbe4e[_0x4f49('0x53')](_0x2548ad[_0x4f49('0x35')](_0x4f49('0x54')));});if(_0x97ef98['updateOnlyHover']){var _0x29ff83=0x0;_0x515ace(this)['on'](_0x4f49('0x55'),function(){var _0x2548ad=function(){window[_0x4f49('0x17')][_0x4f49('0x56')]&&(_0x2cbe4e[_0x4f49('0x57')](),window[_0x4f49('0x17')][_0x4f49('0x56')]=!0x1,_0x515ace['fn']['simpleCart'](!0x0),_0x2cbe4e[_0x4f49('0x58')]());};_0x29ff83=setInterval(function(){_0x2548ad();},0x258);_0x2548ad();});_0x515ace(this)['on']('mouseleave.qd_ddc_hover',function(){clearInterval(_0x29ff83);});}};var _0x468978=function(_0x55d849){_0x55d849=_0x515ace(_0x55d849);_0x97ef98[_0x4f49('0x59')][_0x4f49('0x5a')]=_0x97ef98['texts'][_0x4f49('0x5a')]['replace']('#value',_0x4f49('0x5b'));_0x97ef98[_0x4f49('0x59')][_0x4f49('0x5a')]=_0x97ef98[_0x4f49('0x59')]['cartTotal']['replace'](_0x4f49('0x5c'),_0x4f49('0x5d'));_0x97ef98['texts'][_0x4f49('0x5a')]=_0x97ef98['texts']['cartTotal'][_0x4f49('0x2')]('#shipping',_0x4f49('0x5e'));_0x97ef98['texts'][_0x4f49('0x5a')]=_0x97ef98[_0x4f49('0x59')][_0x4f49('0x5a')][_0x4f49('0x2')](_0x4f49('0x5f'),_0x4f49('0x60'));_0x55d849[_0x4f49('0x35')](_0x4f49('0x61'))['html'](_0x97ef98[_0x4f49('0x59')]['linkCart']);_0x55d849[_0x4f49('0x35')](_0x4f49('0x62'))[_0x4f49('0x63')](_0x97ef98[_0x4f49('0x59')][_0x4f49('0x64')]);_0x55d849[_0x4f49('0x35')]('.qd-ddc-checkout')[_0x4f49('0x63')](_0x97ef98[_0x4f49('0x59')]['linkCheckout']);_0x55d849['find'](_0x4f49('0x65'))[_0x4f49('0x63')](_0x97ef98[_0x4f49('0x59')][_0x4f49('0x5a')]);_0x55d849[_0x4f49('0x35')]('.qd-ddc-shipping')[_0x4f49('0x63')](_0x97ef98['texts'][_0x4f49('0x66')]);_0x55d849[_0x4f49('0x35')](_0x4f49('0x67'))['html'](_0x97ef98[_0x4f49('0x59')][_0x4f49('0x68')]);return _0x55d849;}(this[_0x4f49('0x69')]);var _0x196552=0x0;_0x6625cd['each'](function(){0x0<_0x196552?_0x1dd1a6[_0x4f49('0x6a')](this,_0x468978[_0x4f49('0x6b')]()):_0x1dd1a6['call'](this,_0x468978);_0x196552++;});window[_0x4f49('0xb')][_0x4f49('0xc')][_0x4f49('0x37')](function(){_0x515ace(_0x4f49('0x6c'))[_0x4f49('0x63')](window[_0x4f49('0xb')][_0x4f49('0x6d')]||'--');_0x515ace(_0x4f49('0x6e'))['html'](window[_0x4f49('0xb')][_0x4f49('0x6f')]||'0');_0x515ace(_0x4f49('0x70'))[_0x4f49('0x63')](window[_0x4f49('0xb')][_0x4f49('0x71')]||'--');_0x515ace(_0x4f49('0x72'))['html'](window[_0x4f49('0xb')]['allTotal']||'--');});var _0x1cb2e4=function(_0x2b491c,_0x4714c7){if(_0x4f49('0x4')===typeof _0x2b491c[_0x4f49('0x73')])return _0x1f2d0d(_0x4f49('0x74'));_0x2cbe4e[_0x4f49('0x75')][_0x4f49('0x6a')](this,_0x4714c7);};_0x2cbe4e[_0x4f49('0x57')]=function(_0x176a6a,_0x545552){_0x4f49('0x4')!=typeof _0x545552?window[_0x4f49('0x17')][_0x4f49('0x76')]=_0x545552:window[_0x4f49('0x17')]['dataOptionsCache']&&(_0x545552=window['_QuatroDigital_DropDown'][_0x4f49('0x76')]);setTimeout(function(){window['_QuatroDigital_DropDown'][_0x4f49('0x76')]=void 0x0;},_0x97ef98[_0x4f49('0x77')]);_0x515ace(_0x4f49('0x78'))[_0x4f49('0x3a')](_0x4f49('0x79'));if(_0x97ef98[_0x4f49('0x28')]){var _0x179431=function(_0x275179){window[_0x4f49('0x17')][_0x4f49('0x7a')]=_0x275179;_0x1cb2e4(_0x275179,_0x545552);_0x4f49('0x4')!==typeof window[_0x4f49('0x7b')]&&_0x4f49('0xd')===typeof window[_0x4f49('0x7b')][_0x4f49('0x7c')]&&window[_0x4f49('0x7b')][_0x4f49('0x7c')][_0x4f49('0x6a')](this);_0x515ace(_0x4f49('0x78'))[_0x4f49('0x7d')](_0x4f49('0x79'));};_0x4f49('0x4')!==typeof window[_0x4f49('0x17')][_0x4f49('0x7a')]?(_0x179431(window[_0x4f49('0x17')]['getOrderForm']),_0x4f49('0xd')===typeof _0x176a6a&&_0x176a6a(window['_QuatroDigital_DropDown'][_0x4f49('0x7a')])):_0x515ace[_0x4f49('0x7e')]([_0x4f49('0x73'),_0x4f49('0x7f'),_0x4f49('0x80')],{'done':function(_0x35418d){_0x179431[_0x4f49('0x6a')](this,_0x35418d);_0x4f49('0xd')===typeof _0x176a6a&&_0x176a6a(_0x35418d);},'fail':function(_0x3ee01a){_0x1f2d0d(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0x3ee01a]);}});}else alert('Este\x20método\x20esta\x20descontinuado!');};_0x2cbe4e[_0x4f49('0x58')]=function(){var _0x592c3c=_0x515ace(_0x4f49('0x78'));_0x592c3c[_0x4f49('0x35')](_0x4f49('0x81'))[_0x4f49('0x9')]?_0x592c3c[_0x4f49('0x3a')]('qd-ddc-noItems'):_0x592c3c['addClass'](_0x4f49('0x82'));};_0x2cbe4e[_0x4f49('0x75')]=function(_0x4bdd1b){var _0x29ff83=_0x515ace(_0x4f49('0x83'));_0x29ff83['empty']();_0x29ff83[_0x4f49('0x84')](function(){var _0x29ff83=_0x515ace(this),_0x121972,_0x160cf8,_0x544356=_0x515ace(''),_0x15ed6c;for(_0x15ed6c in window[_0x4f49('0x17')][_0x4f49('0x7a')][_0x4f49('0x73')])if(_0x4f49('0x2f')===typeof window[_0x4f49('0x17')]['getOrderForm'][_0x4f49('0x73')][_0x15ed6c]){var _0x489aaf=window[_0x4f49('0x17')]['getOrderForm'][_0x4f49('0x73')][_0x15ed6c];var _0xf65ac6=_0x489aaf[_0x4f49('0x85')][_0x4f49('0x2')](/^\/|\/$/g,'')[_0x4f49('0x8')]('/');var _0x2dbd0f=_0x515ace('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0x2dbd0f[_0x4f49('0x86')]({'data-sku':_0x489aaf['id'],'data-sku-index':_0x15ed6c,'data-qd-departament':_0xf65ac6[0x0],'data-qd-category':_0xf65ac6[_0xf65ac6['length']-0x1]});_0x2dbd0f[_0x4f49('0x7d')]('qd-ddc-'+_0x489aaf[_0x4f49('0x87')]);_0x2dbd0f['find']('.qd-ddc-prodName')[_0x4f49('0x34')](_0x97ef98[_0x4f49('0x26')](_0x489aaf));_0x2dbd0f[_0x4f49('0x35')]('.qd-ddc-prodPrice')[_0x4f49('0x34')](isNaN(_0x489aaf[_0x4f49('0x88')])?_0x489aaf['sellingPrice']:0x0==_0x489aaf['sellingPrice']?'Grátis':(_0x515ace(_0x4f49('0x89'))[_0x4f49('0x86')](_0x4f49('0x8a'))||'R$')+'\x20'+qd_number_format(_0x489aaf[_0x4f49('0x88')]/0x64,0x2,',','.'));_0x2dbd0f[_0x4f49('0x35')]('.qd-ddc-quantity')[_0x4f49('0x86')]({'data-sku':_0x489aaf['id'],'data-sku-index':_0x15ed6c})[_0x4f49('0x8b')](_0x489aaf[_0x4f49('0x8c')]);_0x2dbd0f['find'](_0x4f49('0x8d'))[_0x4f49('0x86')]({'data-sku':_0x489aaf['id'],'data-sku-index':_0x15ed6c});_0x2cbe4e[_0x4f49('0x8e')](_0x489aaf['id'],_0x2dbd0f[_0x4f49('0x35')]('.qd-ddc-image'),_0x489aaf[_0x4f49('0x8f')]);_0x2dbd0f[_0x4f49('0x35')](_0x4f49('0x90'))[_0x4f49('0x86')]({'data-sku':_0x489aaf['id'],'data-sku-index':_0x15ed6c});_0x2dbd0f[_0x4f49('0x91')](_0x29ff83);_0x544356=_0x544356['add'](_0x2dbd0f);}try{var _0x2409a8=_0x29ff83[_0x4f49('0x0')]('.qd-ddc-wrapper')[_0x4f49('0x35')]('.qd-ddc-shipping\x20input');_0x2409a8[_0x4f49('0x9')]&&''==_0x2409a8['val']()&&window[_0x4f49('0x17')][_0x4f49('0x7a')][_0x4f49('0x80')][_0x4f49('0x92')]&&_0x2409a8[_0x4f49('0x8b')](window['_QuatroDigital_DropDown'][_0x4f49('0x7a')][_0x4f49('0x80')][_0x4f49('0x92')][_0x4f49('0x93')]);}catch(_0x4b7c61){_0x1f2d0d(_0x4f49('0x94')+_0x4b7c61['message'],_0x4f49('0x14'));}_0x2cbe4e['actionButtons'](_0x29ff83);_0x2cbe4e[_0x4f49('0x58')]();_0x4bdd1b&&_0x4bdd1b[_0x4f49('0x95')]&&function(){_0x160cf8=_0x544356[_0x4f49('0x96')](_0x4f49('0x97')+_0x4bdd1b[_0x4f49('0x95')]+'\x27]');_0x160cf8[_0x4f49('0x9')]&&(_0x121972=0x0,_0x544356[_0x4f49('0x84')](function(){var _0x4bdd1b=_0x515ace(this);if(_0x4bdd1b['is'](_0x160cf8))return!0x1;_0x121972+=_0x4bdd1b[_0x4f49('0x98')]();}),_0x2cbe4e[_0x4f49('0x41')](void 0x0,void 0x0,_0x121972,_0x29ff83['add'](_0x29ff83[_0x4f49('0x99')]())),_0x544356[_0x4f49('0x3a')](_0x4f49('0x9a')),function(_0x299849){_0x299849[_0x4f49('0x7d')](_0x4f49('0x9b'));_0x299849['addClass'](_0x4f49('0x9a'));setTimeout(function(){_0x299849[_0x4f49('0x3a')](_0x4f49('0x9b'));},_0x97ef98[_0x4f49('0x77')]);}(_0x160cf8),_0x515ace(document['body'])[_0x4f49('0x7d')]('qd-ddc-product-add-time-v2'),setTimeout(function(){_0x515ace(document[_0x4f49('0x39')])[_0x4f49('0x3a')](_0x4f49('0x9c'));},_0x97ef98[_0x4f49('0x77')]));}();});(function(){_QuatroDigital_DropDown['getOrderForm'][_0x4f49('0x73')][_0x4f49('0x9')]?(_0x515ace(_0x4f49('0x39'))[_0x4f49('0x3a')](_0x4f49('0x9d'))[_0x4f49('0x7d')](_0x4f49('0x9e')),setTimeout(function(){_0x515ace(_0x4f49('0x39'))[_0x4f49('0x3a')](_0x4f49('0x9f'));},_0x97ef98[_0x4f49('0x77')])):_0x515ace(_0x4f49('0x39'))[_0x4f49('0x3a')](_0x4f49('0xa0'))[_0x4f49('0x7d')](_0x4f49('0x9d'));}());_0x4f49('0xd')===typeof _0x97ef98[_0x4f49('0xa1')]?_0x97ef98['callbackProductsList'][_0x4f49('0x6a')](this):_0x1f2d0d(_0x4f49('0xa2'));};_0x2cbe4e[_0x4f49('0x8e')]=function(_0x12c8c8,_0x4bba02,_0x225e63){function _0x3296c8(){_0x97ef98['forceImageHTTPS']&&_0x4f49('0xa3')==typeof _0x225e63&&(_0x225e63=_0x225e63['replace'](_0x4f49('0xa4'),_0x4f49('0xa5')));_0x4bba02[_0x4f49('0x3a')](_0x4f49('0xa6'))[_0x4f49('0xa7')](function(){_0x515ace(this)[_0x4f49('0x7d')](_0x4f49('0xa6'));})[_0x4f49('0x86')](_0x4f49('0xa8'),_0x225e63);}_0x225e63?_0x3296c8():isNaN(_0x12c8c8)?_0x1f2d0d(_0x4f49('0xa9'),'alerta'):alert('Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.');};_0x2cbe4e[_0x4f49('0xaa')]=function(_0x4b3964){var _0x29ff83=function(_0xcbde4a,_0x4b2942){var _0x49dc5d=_0x515ace(_0xcbde4a);var _0x3ad039=_0x49dc5d['attr'](_0x4f49('0xab'));var _0xf65ac6=_0x49dc5d[_0x4f49('0x86')]('data-sku-index');if(_0x3ad039){var _0xcdae95=parseInt(_0x49dc5d['val']())||0x1;_0x2cbe4e[_0x4f49('0xac')]([_0x3ad039,_0xf65ac6],_0xcdae95,_0xcdae95+0x1,function(_0x392f27){_0x49dc5d[_0x4f49('0x8b')](_0x392f27);'function'===typeof _0x4b2942&&_0x4b2942();});}};var _0x3023fc=function(_0x152af3,_0x1ac2b5){var _0x29ff83=_0x515ace(_0x152af3);var _0x479c1e=_0x29ff83[_0x4f49('0x86')]('data-sku');var _0x2bc9df=_0x29ff83[_0x4f49('0x86')](_0x4f49('0xad'));if(_0x479c1e){var _0xf65ac6=parseInt(_0x29ff83[_0x4f49('0x8b')]())||0x2;_0x2cbe4e['changeQantity']([_0x479c1e,_0x2bc9df],_0xf65ac6,_0xf65ac6-0x1,function(_0x173ecb){_0x29ff83[_0x4f49('0x8b')](_0x173ecb);_0x4f49('0xd')===typeof _0x1ac2b5&&_0x1ac2b5();});}};var _0x4b6199=function(_0x21d19a,_0x3e493d){var _0x1a6fb1=_0x515ace(_0x21d19a);var _0xa634d=_0x1a6fb1[_0x4f49('0x86')](_0x4f49('0xab'));var _0xf65ac6=_0x1a6fb1['attr'](_0x4f49('0xad'));if(_0xa634d){var _0x26d8c4=parseInt(_0x1a6fb1[_0x4f49('0x8b')]())||0x1;_0x2cbe4e[_0x4f49('0xac')]([_0xa634d,_0xf65ac6],0x1,_0x26d8c4,function(_0x4054ac){_0x1a6fb1[_0x4f49('0x8b')](_0x4054ac);_0x4f49('0xd')===typeof _0x3e493d&&_0x3e493d();});}};var _0xf65ac6=_0x4b3964[_0x4f49('0x35')]('.qd-ddc-prodQttWrapper:not(.qd_on)');_0xf65ac6[_0x4f49('0x7d')](_0x4f49('0xae'))[_0x4f49('0x84')](function(){var _0x4b3964=_0x515ace(this);_0x4b3964[_0x4f49('0x35')](_0x4f49('0xaf'))['on'](_0x4f49('0xb0'),function(_0x503337){_0x503337[_0x4f49('0x4b')]();_0xf65ac6[_0x4f49('0x7d')](_0x4f49('0xb1'));_0x29ff83(_0x4b3964['find'](_0x4f49('0xb2')),function(){_0xf65ac6[_0x4f49('0x3a')](_0x4f49('0xb1'));});});_0x4b3964['find'](_0x4f49('0xb3'))['on'](_0x4f49('0xb4'),function(_0x20a823){_0x20a823[_0x4f49('0x4b')]();_0xf65ac6[_0x4f49('0x7d')](_0x4f49('0xb1'));_0x3023fc(_0x4b3964['find']('.qd-ddc-quantity'),function(){_0xf65ac6['removeClass'](_0x4f49('0xb1'));});});_0x4b3964[_0x4f49('0x35')]('.qd-ddc-quantity')['on'](_0x4f49('0xb5'),function(){_0xf65ac6[_0x4f49('0x7d')](_0x4f49('0xb1'));_0x4b6199(this,function(){_0xf65ac6['removeClass']('qd-loading');});});_0x4b3964[_0x4f49('0x35')]('.qd-ddc-quantity')['on'](_0x4f49('0xb6'),function(_0x1d8bb2){0xd==_0x1d8bb2[_0x4f49('0x3e')]&&(_0xf65ac6[_0x4f49('0x7d')](_0x4f49('0xb1')),_0x4b6199(this,function(){_0xf65ac6['removeClass'](_0x4f49('0xb1'));}));});});_0x4b3964[_0x4f49('0x35')](_0x4f49('0x81'))[_0x4f49('0x84')](function(){var _0x4b3964=_0x515ace(this);_0x4b3964[_0x4f49('0x35')](_0x4f49('0x8d'))['on']('click.qd_ddc_remove',function(){_0x4b3964[_0x4f49('0x7d')](_0x4f49('0xb1'));_0x2cbe4e[_0x4f49('0xb7')](_0x515ace(this),function(_0x415f11){_0x415f11?_0x4b3964[_0x4f49('0xb8')](!0x0)[_0x4f49('0xb9')](function(){_0x4b3964['remove']();_0x2cbe4e['cartIsEmpty']();}):_0x4b3964[_0x4f49('0x3a')](_0x4f49('0xb1'));});return!0x1;});});};_0x2cbe4e[_0x4f49('0x47')]=function(_0x419219){var _0x374d7a=_0x419219['val']();_0x374d7a=_0x374d7a[_0x4f49('0x2')](/[^0-9\-]/g,'');_0x374d7a=_0x374d7a['replace'](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x4f49('0xba'));_0x374d7a=_0x374d7a['replace'](/(.{9}).*/g,'$1');_0x419219['val'](_0x374d7a);};_0x2cbe4e[_0x4f49('0x53')]=function(_0x68ebf8){var _0x192736=_0x68ebf8[_0x4f49('0x8b')]();0x9<=_0x192736[_0x4f49('0x9')]&&(_0x68ebf8[_0x4f49('0xbb')](_0x4f49('0xbc'))!=_0x192736&&_0x5c373e['calculateShipping']({'postalCode':_0x192736,'country':_0x4f49('0xbd')})[_0x4f49('0xbe')](function(_0x1ae2c9){_0x68ebf8['closest'](_0x4f49('0xbf'))[_0x4f49('0x35')](_0x4f49('0xc0'))['remove']();window[_0x4f49('0x17')][_0x4f49('0x7a')]=_0x1ae2c9;_0x2cbe4e[_0x4f49('0x57')]();_0x1ae2c9=_0x1ae2c9[_0x4f49('0x80')][_0x4f49('0xc1')][0x0][_0x4f49('0xc2')];for(var _0xf65ac6=_0x515ace(_0x4f49('0xc3')),_0x15598b=0x0;_0x15598b<_0x1ae2c9[_0x4f49('0x9')];_0x15598b++){var _0x3e67e5=_0x1ae2c9[_0x15598b],_0x1d0180=0x1<_0x3e67e5[_0x4f49('0xc4')]?_0x3e67e5[_0x4f49('0xc4')]['replace']('bd','\x20dia\x20útil'):_0x3e67e5[_0x4f49('0xc4')][_0x4f49('0x2')]('bd',_0x4f49('0xc5')),_0x404a5a=_0x515ace(_0x4f49('0xc6'));_0x404a5a[_0x4f49('0x34')](_0x4f49('0xc7')+qd_number_format(_0x3e67e5['price']/0x64,0x2,',','.')+_0x4f49('0xc8')+_0x3e67e5[_0x4f49('0x27')]+',\x20entrega\x20em\x20'+_0x1d0180+_0x4f49('0xc9')+_0x192736+_0x4f49('0xca'));_0x404a5a[_0x4f49('0x91')](_0xf65ac6['find']('tbody'));}_0xf65ac6[_0x4f49('0xcb')](_0x68ebf8[_0x4f49('0x1')](_0x4f49('0xbf'))['find'](_0x4f49('0x4d')));})['fail'](function(_0x3856ad){_0x1f2d0d(['Não\x20foi\x20possível\x20calcular\x20o\x20frete',_0x3856ad]);updateCartData();}),_0x68ebf8[_0x4f49('0xbb')](_0x4f49('0xbc'),_0x192736));};_0x2cbe4e['changeQantity']=function(_0x8cd33f,_0x3d6b84,_0x513bc9,_0x937ce1){function _0x47567c(_0x5f1538){_0x5f1538=_0x4f49('0xcc')!==typeof _0x5f1538?!0x1:_0x5f1538;_0x2cbe4e[_0x4f49('0x57')]();window[_0x4f49('0x17')][_0x4f49('0x56')]=!0x1;_0x2cbe4e[_0x4f49('0x58')]();_0x4f49('0x4')!==typeof window['_QuatroDigital_AmountProduct']&&_0x4f49('0xd')===typeof window[_0x4f49('0x7b')][_0x4f49('0x7c')]&&window['_QuatroDigital_AmountProduct'][_0x4f49('0x7c')][_0x4f49('0x6a')](this);_0x4f49('0xd')===typeof adminCart&&adminCart();_0x515ace['fn'][_0x4f49('0xcd')](!0x0,void 0x0,_0x5f1538);_0x4f49('0xd')===typeof _0x937ce1&&_0x937ce1(_0x3d6b84);}_0x513bc9=_0x513bc9||0x1;if(0x1>_0x513bc9)return _0x3d6b84;if(_0x97ef98[_0x4f49('0x28')]){if(_0x4f49('0x4')===typeof window['_QuatroDigital_DropDown'][_0x4f49('0x7a')]['items'][_0x8cd33f[0x1]])return _0x1f2d0d('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x8cd33f[0x1]+']'),_0x3d6b84;window[_0x4f49('0x17')]['getOrderForm'][_0x4f49('0x73')][_0x8cd33f[0x1]][_0x4f49('0x8c')]=_0x513bc9;window[_0x4f49('0x17')][_0x4f49('0x7a')][_0x4f49('0x73')][_0x8cd33f[0x1]][_0x4f49('0xce')]=_0x8cd33f[0x1];_0x5c373e['updateItems']([window[_0x4f49('0x17')][_0x4f49('0x7a')][_0x4f49('0x73')][_0x8cd33f[0x1]]],[_0x4f49('0x73'),_0x4f49('0x7f'),_0x4f49('0x80')])[_0x4f49('0xbe')](function(_0x569efc){window[_0x4f49('0x17')][_0x4f49('0x7a')]=_0x569efc;_0x47567c(!0x0);})[_0x4f49('0xcf')](function(_0x3ccee6){_0x1f2d0d([_0x4f49('0xd0'),_0x3ccee6]);_0x47567c();});}else _0x1f2d0d(_0x4f49('0xd1'));};_0x2cbe4e[_0x4f49('0xb7')]=function(_0x34aa3e,_0x2c4a96){function _0x35c5f6(_0x2316d2){_0x2316d2=_0x4f49('0xcc')!==typeof _0x2316d2?!0x1:_0x2316d2;'undefined'!==typeof window[_0x4f49('0x7b')]&&_0x4f49('0xd')===typeof window['_QuatroDigital_AmountProduct'][_0x4f49('0x7c')]&&window[_0x4f49('0x7b')][_0x4f49('0x7c')][_0x4f49('0x6a')](this);_0x4f49('0xd')===typeof adminCart&&adminCart();_0x515ace['fn'][_0x4f49('0xcd')](!0x0,void 0x0,_0x2316d2);'function'===typeof _0x2c4a96&&_0x2c4a96(_0x4d3872);}var _0x4d3872=!0x1,_0xf65ac6=_0x515ace(_0x34aa3e)['attr'](_0x4f49('0xad'));if(_0x97ef98['smartCheckout']){if(_0x4f49('0x4')===typeof window[_0x4f49('0x17')][_0x4f49('0x7a')][_0x4f49('0x73')][_0xf65ac6])return _0x1f2d0d(_0x4f49('0xd2')+_0xf65ac6+']'),_0x4d3872;window[_0x4f49('0x17')]['getOrderForm'][_0x4f49('0x73')][_0xf65ac6]['index']=_0xf65ac6;_0x5c373e[_0x4f49('0xd3')]([window[_0x4f49('0x17')]['getOrderForm']['items'][_0xf65ac6]],['items','totalizers',_0x4f49('0x80')])[_0x4f49('0xbe')](function(_0x3c92ea){_0x4d3872=!0x0;window[_0x4f49('0x17')][_0x4f49('0x7a')]=_0x3c92ea;_0x1cb2e4(_0x3c92ea);_0x35c5f6(!0x0);})['fail'](function(_0x174789){_0x1f2d0d([_0x4f49('0xd4'),_0x174789]);_0x35c5f6();});}else alert(_0x4f49('0xd5'));};_0x2cbe4e[_0x4f49('0x41')]=function(_0x35666e,_0x1aefdb,_0x2e7a84,_0x8fcb7d){_0x8fcb7d=_0x8fcb7d||_0x515ace(_0x4f49('0xd6'));_0x35666e=_0x35666e||'+';_0x1aefdb=_0x1aefdb||0.9*_0x8fcb7d[_0x4f49('0xd7')]();_0x8fcb7d[_0x4f49('0xb8')](!0x0,!0x0)[_0x4f49('0xd8')]({'scrollTop':isNaN(_0x2e7a84)?_0x35666e+'='+_0x1aefdb+'px':_0x2e7a84});};_0x97ef98[_0x4f49('0xd9')]||(_0x2cbe4e[_0x4f49('0x57')](),_0x515ace['fn'][_0x4f49('0xcd')](!0x0));_0x515ace(window)['on'](_0x4f49('0xda'),function(){try{window['_QuatroDigital_DropDown'][_0x4f49('0x7a')]=void 0x0,_0x2cbe4e[_0x4f49('0x57')]();}catch(_0x42e58e){_0x1f2d0d(_0x4f49('0xdb')+_0x42e58e[_0x4f49('0x10')],_0x4f49('0xdc'));}});_0x4f49('0xd')===typeof _0x97ef98[_0x4f49('0xc')]?_0x97ef98[_0x4f49('0xc')][_0x4f49('0x6a')](this):_0x1f2d0d(_0x4f49('0xdd'));};_0x515ace['fn'][_0x4f49('0x18')]=function(_0x22d50e){var _0x347e51=_0x515ace(this);_0x347e51['fn']=new _0x515ace[(_0x4f49('0x18'))](this,_0x22d50e);return _0x347e51;};}catch(_0x183fbd){_0x4f49('0x4')!==typeof console&&_0x4f49('0xd')===typeof console[_0x4f49('0xe')]&&console[_0x4f49('0xe')]('Oooops!\x20',_0x183fbd);}}(this));(function(_0x2fde35){try{var _0x16cbc6=jQuery;window['_QuatroDigital_AmountProduct']=window[_0x4f49('0x7b')]||{};window[_0x4f49('0x7b')][_0x4f49('0x73')]={};window[_0x4f49('0x7b')][_0x4f49('0xde')]=!0x1;window[_0x4f49('0x7b')][_0x4f49('0xdf')]=!0x1;window[_0x4f49('0x7b')]['quickViewUpdate']=!0x1;var _0x94f657=function(){if(window['_QuatroDigital_AmountProduct'][_0x4f49('0xde')]){var _0x3beb36=!0x1;var _0x560d07={};window['_QuatroDigital_AmountProduct'][_0x4f49('0x73')]={};for(_0x4efc4f in window[_0x4f49('0x17')][_0x4f49('0x7a')][_0x4f49('0x73')])if(_0x4f49('0x2f')===typeof window['_QuatroDigital_DropDown']['getOrderForm'][_0x4f49('0x73')][_0x4efc4f]){var _0x28a6c3=window[_0x4f49('0x17')][_0x4f49('0x7a')][_0x4f49('0x73')][_0x4efc4f];_0x4f49('0x4')!==typeof _0x28a6c3[_0x4f49('0xe0')]&&null!==_0x28a6c3['productId']&&''!==_0x28a6c3['productId']&&(window[_0x4f49('0x7b')][_0x4f49('0x73')][_0x4f49('0xe1')+_0x28a6c3[_0x4f49('0xe0')]]=window[_0x4f49('0x7b')]['items'][_0x4f49('0xe1')+_0x28a6c3[_0x4f49('0xe0')]]||{},window[_0x4f49('0x7b')][_0x4f49('0x73')][_0x4f49('0xe1')+_0x28a6c3[_0x4f49('0xe0')]][_0x4f49('0xe2')]=_0x28a6c3[_0x4f49('0xe0')],_0x560d07[_0x4f49('0xe1')+_0x28a6c3['productId']]||(window[_0x4f49('0x7b')]['items']['prod_'+_0x28a6c3['productId']]['qtt']=0x0),window['_QuatroDigital_AmountProduct']['items'][_0x4f49('0xe1')+_0x28a6c3[_0x4f49('0xe0')]][_0x4f49('0x6f')]+=_0x28a6c3['quantity'],_0x3beb36=!0x0,_0x560d07['prod_'+_0x28a6c3[_0x4f49('0xe0')]]=!0x0);}var _0x4efc4f=_0x3beb36;}else _0x4efc4f=void 0x0;window[_0x4f49('0x7b')][_0x4f49('0xde')]&&(_0x16cbc6(_0x4f49('0xe3'))['remove'](),_0x16cbc6(_0x4f49('0xe4'))[_0x4f49('0x3a')](_0x4f49('0xe5')));for(var _0x3c3996 in window[_0x4f49('0x7b')][_0x4f49('0x73')]){_0x28a6c3=window[_0x4f49('0x7b')][_0x4f49('0x73')][_0x3c3996];if(_0x4f49('0x2f')!==typeof _0x28a6c3)return;_0x560d07=_0x16cbc6(_0x4f49('0xe6')+_0x28a6c3[_0x4f49('0xe2')]+']')[_0x4f49('0x0')]('li');if(window['_QuatroDigital_AmountProduct'][_0x4f49('0xde')]||!_0x560d07[_0x4f49('0x35')]('.qd-bap-wrapper')['length'])_0x3beb36=_0x16cbc6(_0x4f49('0xe7')),_0x3beb36[_0x4f49('0x35')](_0x4f49('0xe8'))[_0x4f49('0x63')](_0x28a6c3[_0x4f49('0x6f')]),_0x28a6c3=_0x560d07[_0x4f49('0x35')](_0x4f49('0xe9')),_0x28a6c3[_0x4f49('0x9')]?_0x28a6c3[_0x4f49('0xea')](_0x3beb36)['addClass']('qd-bap-item-added'):_0x560d07[_0x4f49('0xea')](_0x3beb36);}_0x4efc4f&&(window[_0x4f49('0x7b')][_0x4f49('0xde')]=!0x1);};window[_0x4f49('0x7b')]['exec']=function(){window[_0x4f49('0x7b')]['allowRecalculate']=!0x0;_0x94f657[_0x4f49('0x6a')](this);};_0x16cbc6(document)['ajaxStop'](function(){_0x94f657[_0x4f49('0x6a')](this);});}catch(_0x5f2631){_0x4f49('0x4')!==typeof console&&_0x4f49('0xd')===typeof console[_0x4f49('0xe')]&&console[_0x4f49('0xe')](_0x4f49('0xf'),_0x5f2631);}}(this));(function(){try{var _0x570b22=jQuery,_0x24a109,_0x3c378b={'selector':'.qdDdcContainer','dropDown':{},'buyButton':{}};_0x570b22['QD_smartCart']=function(_0x1fb8cc){var _0x1da987={};_0x24a109=_0x570b22[_0x4f49('0x20')](!0x0,{},_0x3c378b,_0x1fb8cc);_0x1fb8cc=_0x570b22(_0x24a109[_0x4f49('0xeb')])[_0x4f49('0x18')](_0x24a109[_0x4f49('0xec')]);_0x1da987[_0x4f49('0xed')]=_0x4f49('0x4')!==typeof _0x24a109['dropDown'][_0x4f49('0xd9')]&&!0x1===_0x24a109[_0x4f49('0xec')]['updateOnlyHover']?_0x570b22(_0x24a109['selector'])[_0x4f49('0xee')](_0x1fb8cc['fn'],_0x24a109['buyButton']):_0x570b22(_0x24a109['selector'])[_0x4f49('0xee')](_0x24a109[_0x4f49('0xed')]);_0x1da987[_0x4f49('0xec')]=_0x1fb8cc;return _0x1da987;};_0x570b22['fn'][_0x4f49('0xef')]=function(){_0x4f49('0x2f')===typeof console&&_0x4f49('0xd')===typeof console[_0x4f49('0x15')]&&console[_0x4f49('0x15')]('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x570b22[_0x4f49('0xef')]=_0x570b22['fn']['smartCart'];}catch(_0x12b6ed){'undefined'!==typeof console&&'function'===typeof console['error']&&console[_0x4f49('0xe')]('Oooops!\x20',_0x12b6ed);}}());

// vtex url parse
/* Quatro Digital - VTEX URL Parse // 1.4 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
var _0x8349=["\x6C\x69\x6E\x6B","\x3C\x61\x20\x68\x72\x65\x66\x3D\x22","\x22\x3E\x3C\x2F\x61\x3E","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\x66\x75\x6E\x63\x74\x69\x6F\x6E","\x65\x72\x72\x6F\x72","\x50\x72\x6F\x62\x6C\x65\x6D\x61\x73\x20\x3A\x28\x20\x2E\x20\x44\x65\x74\x61\x6C\x68\x65\x73\x3A\x20","\x2F","\x73\x70\x6C\x69\x74","","\x72\x65\x70\x6C\x61\x63\x65","\x70\x61\x74\x68\x6E\x61\x6D\x65","\x2C","\x70\x6F\x70","\x6D\x61\x74\x63\x68","\x73\x65\x61\x72\x63\x68","\x6C\x65\x6E\x67\x74\x68","\x6F\x62\x6A\x65\x63\x74","\x70\x75\x73\x68","\x63","\x6D\x61\x70","\x73\x68\x69\x66\x74","\x6F\x74\x68\x65\x72\x5F\x70\x61\x74\x68","\x6F\x74\x68\x65\x72\x5F\x73\x65\x61\x72\x63\x68","\x26","\x6F\x75\x74","\x67\x65\x74\x4D\x61\x70","\x70\x72\x6F\x74\x6F\x74\x79\x70\x65","\x6D\x65\x72\x67\x65\x55\x72\x6C","\x63\x61\x6C\x6C","\x65\x78\x74\x65\x6E\x64","\x67\x65\x74\x55\x72\x6C","\x6D\x61\x70\x3D","\x6A\x6F\x69\x6E","\x3F","\x51\x44\x5F\x56\x74\x65\x78\x55\x72\x6C\x50\x61\x72\x73\x65"];(function(){function _0x6ac7x1(_0x6ac7x2){try{this[_0x8349[0]]=$(_0x8349[1]+_0x6ac7x2+_0x8349[2])[0]}catch(c){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],c)}}function _0x6ac7x3(_0x6ac7x2){try{_0x6ac7x2=_0x6ac7x2||this[_0x8349[0]];var _0x6ac7x4=_0x6ac7x2[_0x8349[11]][_0x8349[10]](/\/\//g,_0x8349[7])[_0x8349[10]](/(^\/|\/$)/g,_0x8349[9])[_0x8349[8]](_0x8349[7]),_0x6ac7x5=((_0x6ac7x2[_0x8349[15]]||_0x8349[9])[_0x8349[14]](/map\=([^&]+)/i)||[_0x8349[9]])[_0x8349[13]]()[_0x8349[8]](_0x8349[12]);if(1==_0x6ac7x5[_0x8349[16]]&&0==_0x6ac7x5[0][_0x8349[16]]){if(_0x8349[17]== typeof defaultMap){_0x6ac7x5=defaultMap}else {for(var _0x6ac7x6=0;_0x6ac7x6<_0x6ac7x4[_0x8349[16]];_0x6ac7x6++){_0x6ac7x4[_0x6ac7x6][_0x8349[16]]&&_0x8349[7]!=_0x6ac7x4[_0x6ac7x6]&&_0x6ac7x5[_0x8349[18]](defaultMap)}}};for(var _0x6ac7x6={map:{},other_path:_0x8349[9]},_0x6ac7x7=0;_0x6ac7x7<_0x6ac7x5[_0x8349[16]];_0x6ac7x7++){_0x6ac7x5[_0x6ac7x7][_0x8349[16]]&&(_0x8349[19]==_0x6ac7x5[_0x6ac7x7]?(_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]=_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]||[],_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]][_0x8349[18]]((_0x6ac7x4||[_0x8349[9]])[_0x8349[21]]())):_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]=(_0x6ac7x4||[_0x8349[9]])[_0x8349[21]]())};_0x6ac7x6[_0x8349[22]]=_0x6ac7x4;_0x6ac7x6[_0x8349[23]]=(_0x6ac7x2[_0x8349[15]]||_0x8349[9])[_0x8349[10]](/map\=([^&]+)/ig,_0x8349[9])[_0x8349[10]](/\&\&+/ig,_0x8349[24])[_0x8349[10]](/\?/g,_0x8349[9]);return this[_0x8349[25]]=_0x6ac7x6}catch(g){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],g)}}_0x6ac7x1[_0x8349[27]][_0x8349[26]]=_0x6ac7x3;_0x6ac7x1[_0x8349[27]][_0x8349[28]]=function(_0x6ac7x2,_0x6ac7x4){try{var _0x6ac7x5=_0x6ac7x3[_0x8349[29]](this,this[_0x8349[0]]),_0x6ac7x6=_0x6ac7x3[_0x8349[29]](this,$(_0x8349[1]+_0x6ac7x2+_0x8349[2])[0]);_0x6ac7x5[_0x8349[22]][_0x8349[16]]||(_0x6ac7x5[_0x8349[22]]=void(0));_0x6ac7x5[_0x8349[23]][_0x8349[16]]||(_0x6ac7x5[_0x8349[23]]=void(0));var _0x6ac7x7=$[_0x8349[30]](!0,{},_0x6ac7x6,_0x6ac7x5);if(_0x8349[17]== typeof _0x6ac7x4){for(_0x6ac7x6=0;_0x6ac7x6<_0x6ac7x4[_0x8349[16]];_0x6ac7x6++){_0x6ac7x7[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]]&&(_0x6ac7x7[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]]=_0x6ac7x5[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]])}};return this[_0x8349[25]]=_0x6ac7x7}catch(g){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],g)}};_0x6ac7x1[_0x8349[27]][_0x8349[31]]=function(_0x6ac7x2){try{var _0x6ac7x4=[],_0x6ac7x5=[];_0x6ac7x2=_0x6ac7x2||{};for(var _0x6ac7x6 in this[_0x8349[25]][_0x8349[20]]){if(!_0x6ac7x2[_0x6ac7x6]){if(_0x8349[19]==_0x6ac7x6){for(var _0x6ac7x7=0;_0x6ac7x7<this[_0x8349[25]][_0x8349[20]][_0x6ac7x6][_0x8349[16]];_0x6ac7x7++){_0x6ac7x4[_0x8349[18]](this[_0x8349[25]][_0x8349[20]][_0x6ac7x6][_0x6ac7x7]),_0x6ac7x5[_0x8349[18]](_0x6ac7x6)}}else {_0x6ac7x4[_0x8349[18]](this[_0x8349[25]][_0x8349[20]][_0x6ac7x6]),_0x6ac7x5[_0x8349[18]](_0x6ac7x6)}}};var _0x6ac7x8=_0x6ac7x5[_0x8349[16]]?_0x8349[32]+_0x6ac7x5[_0x8349[33]](_0x8349[12])+_0x8349[24]:_0x8349[9];return _0x8349[7]+_0x6ac7x4[_0x8349[33]](_0x8349[7])+(this[_0x8349[25]][_0x8349[22]][_0x8349[16]]?_0x8349[7]+this[_0x8349[25]][_0x8349[22]][_0x8349[33]](_0x8349[7]):_0x8349[9])+_0x8349[34]+(_0x6ac7x8+this[_0x8349[25]][_0x8349[23]])[_0x8349[10]](/\&\&+/g,_0x8349[24])}catch(_0x6ac7x1){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],_0x6ac7x1)}};window[_0x8349[35]]=_0x6ac7x1})()

/* Quatro Digital - QD Select Smart Research 2 // Carlos Vinicius // Todos os direitos reservados */
var _0xdb28=['.qd_auto_select_smart_research_2','function','QD_SelectSmartResearch2','object','error','undefined','warn','unshift','[Quatro\x20Digital\x20-\x20QD\x20Select\x20Smart\x20Research\x202]\x0a','toLowerCase','aviso','info','apply','join','Selecione\x20o(a)\x20','location','find','.search-single-navigator\x20ul.','data-qdssr-title','each','push','trim','attr','href','h5.','\x20+ul\x20.filtro-ativo:first','text','length','replace','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','indexOf','Problemas\x20ao\x20definir\x20a\x20opção\x20selecionada.\x20Detalhes:\x20','message','addClass','qd-ssr2-loaded','Problemas\x20ao\x20tentar\x20verificar\x20as\x20opções\x20selecionadas.\x20Detalhes:\x20','options','index','<div\x20class=\x22qd-ssr2-option-wrapper\x22>','<label\x20for=\x22qd-ssr2-select-','labelMessage','</label>','<select\x20data-qdssr-ndx=\x22','\x22\x20data-qdssr-title=\x22','<option\x20value=\x22\x22></option>','optionsPlaceHolder','</select></div>','appendTo','select','add','select2','pt-BR','bind','select[data-qdssr-ndx=','data-qdssr-ndx','val','trigger','QuatroDigital.ssrChange','body','qd-ssr-reloading','split','shift','qd-ssr-loading','qd-ssr2-loading','html','removeAttr','disabled','getAjaxOptions','QuatroDigital.ssrSelectAjaxPopulated','ajaxError','removeClass','option[data-qdssr-text=\x27','<option\x20value=\x22','\x22\x20data-qdssr-text=\x22','</option>','getCategory','cache','innerHTML','buscapagina','match','pop','qdPlugin'];(function(_0x256b72,_0x340985){var _0x2183e3=function(_0xf7fd37){while(--_0xf7fd37){_0x256b72['push'](_0x256b72['shift']());}};_0x2183e3(++_0x340985);}(_0xdb28,0x106));var _0x8db2=function(_0xffa246,_0x354115){_0xffa246=_0xffa246-0x0;var _0x520ecc=_0xdb28[_0xffa246];return _0x520ecc;};(function(_0x2f1285){var _0x30b7ed=jQuery;if(_0x8db2('0x0')!==typeof _0x30b7ed['fn'][_0x8db2('0x1')]){_0x30b7ed['fn']['QD_SelectSmartResearch2']=function(){};var _0x1f4c45=function(_0xfcf49f,_0x4426fe){if(_0x8db2('0x2')===typeof console&&'undefined'!==typeof console[_0x8db2('0x3')]&&_0x8db2('0x4')!==typeof console['info']&&'undefined'!==typeof console[_0x8db2('0x5')]){var _0x46932f;_0x8db2('0x2')===typeof _0xfcf49f?(_0xfcf49f[_0x8db2('0x6')](_0x8db2('0x7')),_0x46932f=_0xfcf49f):_0x46932f=[_0x8db2('0x7')+_0xfcf49f];if(_0x8db2('0x4')===typeof _0x4426fe||'alerta'!==_0x4426fe[_0x8db2('0x8')]()&&_0x8db2('0x9')!==_0x4426fe[_0x8db2('0x8')]())if('undefined'!==typeof _0x4426fe&&_0x8db2('0xa')===_0x4426fe[_0x8db2('0x8')]())try{console['info'][_0x8db2('0xb')](console,_0x46932f);}catch(_0x3b2faa){try{console[_0x8db2('0xa')](_0x46932f[_0x8db2('0xc')]('\x0a'));}catch(_0x37d017){}}else try{console['error']['apply'](console,_0x46932f);}catch(_0x15070d){try{console[_0x8db2('0x3')](_0x46932f[_0x8db2('0xc')]('\x0a'));}catch(_0x1d6a15){}}else try{console[_0x8db2('0x5')][_0x8db2('0xb')](console,_0x46932f);}catch(_0x2f177a){try{console[_0x8db2('0x5')](_0x46932f[_0x8db2('0xc')]('\x0a'));}catch(_0x16c8c2){}}}},_0x11c26d={'options':[],'optionsPlaceHolder':[],'disabledMessage':function(_0x5489a9,_0x13b0f5,_0x24da1b){return'Selecione\x20o\x20anterior';},'labelMessage':function(_0x2b3f73,_0x44957d,_0x21db8c){return _0x8db2('0xd')+_0x21db8c[_0x2b3f73];},'redirect':function(_0x2efd06){window[_0x8db2('0xe')]['href']=_0x2efd06;},'getAjaxOptions':function(_0x5df464,_0x77789){var _0x104e33=[];_0x30b7ed(_0x5df464)[_0x8db2('0xf')](_0x8db2('0x10')+_0x77789['attr'](_0x8db2('0x11')))[_0x8db2('0xf')]('a')[_0x8db2('0x12')](function(){var _0x77789=_0x30b7ed(this);_0x104e33[_0x8db2('0x13')]([_0x77789['text']()[_0x8db2('0x14')](),_0x77789[_0x8db2('0x15')](_0x8db2('0x16'))||'']);});return _0x104e33;},'optionIsChecked':function(_0x125be2){_0x125be2=_0x30b7ed(_0x8db2('0x17')+_0x125be2+_0x8db2('0x18'))[_0x8db2('0x19')]()['trim']();return _0x125be2[_0x8db2('0x1a')]?_0x125be2:null;},'ajaxError':function(){_0x1f4c45('Desculpe,\x20não\x20foi\x20possível\x20executar\x20sua\x20solicitação.\x20Por\x20favor\x20entre\x20em\x20contato\x20com\x20o\x20SAC.');}};_0x2f1285=function(_0x5725f0){var _0x52a9ca={'p':'neynoretnznfx%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0xec8cd2){var _0x29b5cd=function(_0x3be281){return _0x3be281;};var _0x2baed0=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0xec8cd2=_0xec8cd2['d'+_0x2baed0[0x10]+'c'+_0x2baed0[0x11]+'m'+_0x29b5cd(_0x2baed0[0x1])+'n'+_0x2baed0[0xd]]['l'+_0x2baed0[0x12]+'c'+_0x2baed0[0x0]+'ti'+_0x29b5cd('o')+'n'];var _0x145328=function(_0x8d4f54){return escape(encodeURIComponent(_0x8d4f54['replace'](/\./g,'¨')[_0x8db2('0x1b')](/[a-zA-Z]/g,function(_0x372311){return String[_0x8db2('0x1c')](('Z'>=_0x372311?0x5a:0x7a)>=(_0x372311=_0x372311[_0x8db2('0x1d')](0x0)+0xd)?_0x372311:_0x372311-0x1a);})));};var _0x483aee=_0x145328(_0xec8cd2[[_0x2baed0[0x9],_0x29b5cd('o'),_0x2baed0[0xc],_0x2baed0[_0x29b5cd(0xd)]][_0x8db2('0xc')]('')]);_0x145328=_0x145328((window[['js',_0x29b5cd('no'),'m',_0x2baed0[0x1],_0x2baed0[0x4][_0x8db2('0x1e')](),_0x8db2('0x1f')][_0x8db2('0xc')]('')]||_0x8db2('0x20'))+['.v',_0x2baed0[0xd],'e',_0x29b5cd('x'),'co',_0x29b5cd('mm'),_0x8db2('0x21'),_0x2baed0[0x1],'.c',_0x29b5cd('o'),'m.',_0x2baed0[0x13],'r'][_0x8db2('0xc')](''));for(var _0x3124d5 in _0x52a9ca){if(_0x145328===_0x3124d5+_0x52a9ca[_0x3124d5]||_0x483aee===_0x3124d5+_0x52a9ca[_0x3124d5]){var _0xbc5366='tr'+_0x2baed0[0x11]+'e';break;}_0xbc5366='f'+_0x2baed0[0x0]+'ls'+_0x29b5cd(_0x2baed0[0x1])+'';}_0x29b5cd=!0x1;-0x1<_0xec8cd2[[_0x2baed0[0xc],'e',_0x2baed0[0x0],'rc',_0x2baed0[0x9]]['join']('')][_0x8db2('0x22')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x29b5cd=!0x0);return[_0xbc5366,_0x29b5cd];}(_0x5725f0);}(window);if(!eval(_0x2f1285[0x0]))return _0x2f1285[0x1]?_0x1f4c45('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x30b7ed[_0x8db2('0x1')]=function(_0x25ed2c,_0xcc8a66){if(!_0xcc8a66['options'][_0x8db2('0x1a')])return _0x1f4c45('Nenhuma\x20opção\x20foi\x20enviada,\x20é\x20esperado\x20um\x20array\x20com\x20sub\x20arrays\x20contendo\x20o\x20conjunto\x20chave/valor.');_0x25ed2c[_0x8db2('0x12')](function(){try{var _0x2b653b=_0x30b7ed(this),_0x14bd12=_0xae31b7(_0x2b653b,_0xcc8a66,_0x25ed2c);_0x46e0c8(_0x2b653b,_0xcc8a66,0x0);_0x14bd12['on']('QuatroDigital.ssrSelectAjaxPopulated',function(_0x56e9c1,_0x35d337){try{_0x46e0c8(_0x2b653b,_0xcc8a66,_0x35d337[_0x8db2('0x15')]('data-qdssr-ndx'));}catch(_0x516dcb){_0x1f4c45(_0x8db2('0x23')+_0x516dcb[_0x8db2('0x24')]);}});_0x2b653b[_0x8db2('0x25')](_0x8db2('0x26'));}catch(_0x17ad44){_0x1f4c45(_0x8db2('0x27')+_0x17ad44[_0x8db2('0x24')]);}});};var _0xae31b7=function(_0x502a02,_0x1ab5eb,_0x304a72){try{for(var _0x5d2a5b='',_0x41594c,_0x2f1285=!0x0,_0x5962e6=new _0x30b7ed(),_0x4bf222=!0x1,_0x3c1983=0x0,_0x4a45dd=0x0;_0x4a45dd<_0x1ab5eb[_0x8db2('0x28')][_0x8db2('0x1a')];_0x4a45dd++){_0x8db2('0x2')!==typeof _0x1ab5eb[_0x8db2('0x28')][_0x4a45dd]&&(_0x2f1285=!0x1);var _0x5cc419=_0x1ab5eb['optionsPlaceHolder'][_0x4a45dd]||'',_0x2d3e98=_0x304a72[_0x8db2('0x29')](_0x502a02);_0x5d2a5b=_0x8db2('0x2a');_0x5d2a5b+=_0x8db2('0x2b')+_0x4a45dd+_0x2d3e98+'\x22>'+_0x1ab5eb[_0x8db2('0x2c')](_0x4a45dd,_0x1ab5eb['options'],_0x1ab5eb['optionsPlaceHolder'])+_0x8db2('0x2d');_0x5d2a5b+=_0x8db2('0x2e')+_0x4a45dd+'\x22\x20id=\x22qd-ssr2-select-'+_0x4a45dd+_0x2d3e98+_0x8db2('0x2f')+_0x5cc419+'\x22>';_0x5d2a5b+=_0x8db2('0x30');_0x2f1285?_0x5d2a5b+=_0x451c29(_0x1ab5eb[_0x8db2('0x28')][_0x4a45dd]):_0x5cc419=_0x1ab5eb['disabledMessage'](_0x4a45dd,_0x1ab5eb[_0x8db2('0x28')],_0x1ab5eb[_0x8db2('0x31')]);_0x5d2a5b+=_0x8db2('0x32');_0x41594c=_0x30b7ed(_0x5d2a5b);_0x41594c[_0x8db2('0x33')](_0x502a02);var _0x2e6f0c=_0x41594c[_0x8db2('0xf')](_0x8db2('0x34'));_0x5962e6=_0x5962e6[_0x8db2('0x35')](_0x2e6f0c);_0x2f1285||_0x2e6f0c[_0x8db2('0x15')]({'disabled':!0x0,'data-qdssr-str':_0x1ab5eb[_0x8db2('0x28')][_0x4a45dd]});_0x2e6f0c[_0x8db2('0x36')]({'placeholder':_0x5cc419,'language':_0x8db2('0x37')});_0x2e6f0c[_0x8db2('0x38')]('change',function(_0x3ee510,_0x2b2472){var _0x5e0382=_0x30b7ed(this),_0x49a7ae=_0x502a02['find'](_0x8db2('0x39')+(parseInt(_0x5e0382[_0x8db2('0x15')](_0x8db2('0x3a'))||0x0,0xa)+0x1)+']'),_0x2f1285=(_0x5e0382[_0x8db2('0x3b')]()||'')[_0x8db2('0x14')]();_0x2b2472||(_0x4bf222=!0x0);_0x30b7ed(window)[_0x8db2('0x3c')](_0x8db2('0x3d'),[_0x49a7ae,_0x4bf222]);!_0x49a7ae['length']&&(!_0x2b2472||_0x4bf222&&_0x2f1285[_0x8db2('0x1a')])&&(_0x30b7ed(document[_0x8db2('0x3e')])[_0x8db2('0x25')](_0x8db2('0x3f')),_0x1ab5eb['redirect'](_0x2f1285));_0x2f1285=_0x2f1285[_0x8db2('0x40')]('#')[_0x8db2('0x41')]()[_0x8db2('0x40')]('?');_0x2f1285[0x1]=(_0x49a7ae[_0x8db2('0x15')]('data-qdssr-str')||'')+'&'+(_0x2f1285[0x1]||'');_0x30b7ed(document[_0x8db2('0x3e')])['addClass'](_0x8db2('0x42'));_0x41594c[_0x8db2('0x25')](_0x8db2('0x43'));_0x3c1983+=0x1;_0x30b7ed['qdAjax']({'url':_0x2f1285['join']('?'),'dataType':_0x8db2('0x44'),'success':function(_0x47c556){_0x49a7ae[_0x8db2('0x45')](_0x8db2('0x46'));_0x49a7ae[_0x8db2('0x44')](_0x8db2('0x30')+_0x451c29(_0x1ab5eb[_0x8db2('0x47')](_0x47c556,_0x49a7ae)));_0x49a7ae[_0x8db2('0x36')]({'placeholder':_0x49a7ae[_0x8db2('0x15')](_0x8db2('0x11'))});_0x5e0382[_0x8db2('0x3c')](_0x8db2('0x48'),[_0x49a7ae]);},'error':function(){_0x1ab5eb[_0x8db2('0x49')][_0x8db2('0xb')](this,arguments);},'complete':function(){_0x41594c['removeClass'](_0x8db2('0x43'));--_0x3c1983;0x0==_0x3c1983&&_0x30b7ed(document[_0x8db2('0x3e')])[_0x8db2('0x4a')](_0x8db2('0x42'));},'clearQueueDelay':null});});}return _0x5962e6;}catch(_0x4f5018){_0x1f4c45('Problemas\x20:(\x20.\x20Detalhes:\x20'+_0x4f5018[_0x8db2('0x24')]);}},_0x46e0c8=function(_0x2e46d4,_0x164020,_0x4c66e5,_0x540d90){_0x164020=_0x164020['optionIsChecked'](_0x164020[_0x8db2('0x31')][_0x4c66e5]);null!==_0x164020&&(_0x540d90=_0x540d90||_0x2e46d4[_0x8db2('0xf')](_0x8db2('0x39')+_0x4c66e5+']'),_0x540d90[_0x8db2('0x3b')](_0x540d90[_0x8db2('0xf')](_0x8db2('0x4b')+_0x164020+'\x27]')[_0x8db2('0x3b')]())['trigger']('change',!0x0));},_0x451c29=function(_0x3d29bc){for(var _0x18c6ef='',_0x2908e4=0x0;_0x2908e4<_0x3d29bc[_0x8db2('0x1a')];_0x2908e4++)_0x18c6ef+=_0x8db2('0x4c')+(_0x3d29bc[_0x2908e4][0x1]||'')+_0x8db2('0x4d')+(_0x3d29bc[_0x2908e4][0x0]||'')[_0x8db2('0x1b')](/\s\([0-9]+\)/,'')+'\x22>'+(_0x3d29bc[_0x2908e4][0x0]||'')+_0x8db2('0x4e');return _0x18c6ef;};_0x30b7ed[_0x8db2('0x1')][_0x8db2('0x4f')]=function(){if(_0x30b7ed[_0x8db2('0x1')][_0x8db2('0x4f')][_0x8db2('0x50')])return _0x30b7ed[_0x8db2('0x1')][_0x8db2('0x4f')]['cache'];var _0x2ded23=[],_0xb4b0a=[];_0x30b7ed('script:not([src])')[_0x8db2('0x12')](function(){var _0xd78022=_0x30b7ed(this)[0x0][_0x8db2('0x51')];if(-0x1<_0xd78022['indexOf'](_0x8db2('0x52')))return _0x2ded23=(decodeURIComponent((_0xd78022[_0x8db2('0x53')](/\/buscapagina([^\'\"]+)/i)||[''])[_0x8db2('0x54')]())[_0x8db2('0x53')](/fq=c:[^\&]+/i)||[''])[_0x8db2('0x54')]()['split'](':')[_0x8db2('0x54')]()[_0x8db2('0x1b')](/(^\/|\/$)/g,'')[_0x8db2('0x40')]('/'),!0x1;});for(var _0x58bb60=0x0;_0x58bb60<_0x2ded23[_0x8db2('0x1a')];_0x58bb60++)_0x2ded23[_0x58bb60][_0x8db2('0x1a')]&&_0xb4b0a[_0x8db2('0x13')](_0x2ded23[_0x58bb60]);return _0x30b7ed[_0x8db2('0x1')][_0x8db2('0x4f')][_0x8db2('0x50')]=_0xb4b0a;};_0x30b7ed[_0x8db2('0x1')]['getCategory'][_0x8db2('0x50')]=null;_0x30b7ed['fn'][_0x8db2('0x1')]=function(_0x4d3c19){var _0x1eeafe=_0x30b7ed(this);if(!_0x1eeafe[_0x8db2('0x1a')])return _0x1eeafe;_0x4d3c19=_0x30b7ed['extend']({},_0x11c26d,_0x4d3c19);_0x1eeafe[_0x8db2('0x55')]=new _0x30b7ed[(_0x8db2('0x1'))](_0x1eeafe,_0x4d3c19);return _0x1eeafe;};_0x30b7ed(function(){_0x30b7ed(_0x8db2('0x56'))[_0x8db2('0x1')]();});}}(this));

/* Quatro Digital - QD Smart SKU Grid // Carlos Vinicius // Todos os direitos reservados */
var _0x008c=['domain',';\x20domain=','secure','split','shift','join','removeCookie','replace','abs','undefined','pow','toFixed','round','length','QD_smartSkuGrid','info','warn','unshift','[Quatro\x20Digital\x20-\x20Smart\x20SKU\x20Grid]\x0a','alerta','toLowerCase','aviso','apply','error','.qd-sku-row-head\x20.qd-sku-col-title','.qd-sku-row-body','.qd-sku-qtt-wrap','.qd-sku-name','.qd-sku-qtt-price','.qd-sku-img','50-50','<span\x20class=\x22qd-no-stock\x22>ESGOTADO</span>','<span\x20class=\x22qd-snm-auto-include\x22></span>','left','input','.qd-sku-qtt-add','.qd-sku-qtt-remove','.qd-ssg-buy-button','.qd-selected-qtt-sku','.qd-selected-sku-total','Não\x20foi\x20possível\x20obter\x20seus\x20dados\x20de\x20acesso,\x20por\x20favor\x20tente\x20mais\x20tarde\x20ou\x20entre\x20em\x20contato\x20com\x20o\x20Atendimento\x20ao\x20Cliente!','.qd-ssg-login','attr','string','Especificação\x20SKU\x20padrão\x20é\x20inválida.\x20A\x20execução\x20para\x20por\x20aqui\x20😞.\x20Valor\x20obtido:\x20','dimensions','Este\x20plugin\x20suporta\x20apenas\x20produtos\x20com\x20apenas\x20duas\x20ou\x20três\x20variações\x20de\x20SKU,\x20o\x20que\x20não\x20é\x20o\x20caso\x20desse!\x20A\x20execução\x20para\x20por\x20aqui\x20😞','A\x203ª\x20especificação\x20SKU\x20é\x20inválida\x20(eixo\x20z).\x20A\x20execução\x20para\x20por\x20aqui\x20😞.\x20Valor\x20obtido:\x20','message','dimensionsMap','clone','insertBefore','add','remove','headItem','append','find','data-qd-ssg-primary-dim','rowName','data-qd-ssg-secundary-dim','addClass','qd-ssg-sku-not-found','skus','filter','[data-qd-ssg-secundary-dim=\x27','html','rowImageSize','\x22\x20alt=\x22','skuname','\x22\x20/>','bodyPrice','[data-qd-ssg-primary-dim=\x27','sku','removeClass','inputQtt','sellerId','available','listPrice','rowPrice','listPriceFormated','</span>','<span\x20class=\x22qd-sku-new-price\x22>','bestPriceFormated','unavailableHtml','qd-ssg-unavailable','disabled','QD_smartNotifyMe','QD_smartNotifyMeOptions','qd-ssg-processed-row','not','.qd-ssg-processed-row','qd-ssg-loaded','hide','rowImage','click','.qd-sku-qtt-wrap[id]:first','trigger','each','QuatroDigital.sq_change','QuatroDigital.ssg_change','QD_smartQuantity','qttMore','qttMinus','buyButton','href','selectSkuMsg','[data-sku-id]','val','push','sku=','data-sku-id','seller=','data-sku-seller','/checkout/cart/add?','neynoretnznfx%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','---','Atenção!\x20Para\x20que\x20o\x20avise-me\x20funcione\x20você\x20precisa\x20adicionar\x20o\x20plugin\x20\x27QD_smartNotifyMe\x27\x20😠.','QuatroDigital.ssg_callback','.qd-smart-sku-grid-auto-load','function','cookie','amd','object','jquery','json','stringify','raw','indexOf','slice','parse','isFunction','extend','number','expires',';\x20expires='];(function(_0x58123e,_0x2b57a9){var _0x356bf6=function(_0x1d7108){while(--_0x1d7108){_0x58123e['push'](_0x58123e['shift']());}};_0x356bf6(++_0x2b57a9);}(_0x008c,0x188));var _0xc008=function(_0x174ac2,_0xa91d82){_0x174ac2=_0x174ac2-0x0;var _0x28ca76=_0x008c[_0x174ac2];return _0x28ca76;};(function(){_0xc008('0x0')!==typeof $[_0xc008('0x1')]&&function(_0x15aadc){_0xc008('0x0')===typeof define&&define[_0xc008('0x2')]?define(['jquery'],_0x15aadc):_0xc008('0x3')===typeof exports?_0x15aadc(require(_0xc008('0x4'))):_0x15aadc(jQuery);}(function(_0x10b33c){function _0x163bd9(_0x1cbe76){_0x1cbe76=_0x2ea200[_0xc008('0x5')]?JSON[_0xc008('0x6')](_0x1cbe76):String(_0x1cbe76);return _0x2ea200[_0xc008('0x7')]?_0x1cbe76:encodeURIComponent(_0x1cbe76);}function _0x9c8cb2(_0x4af530,_0x428fa9){var _0x5aa09b;if(_0x2ea200[_0xc008('0x7')])_0x5aa09b=_0x4af530;else _0x5b64f8:{var _0x52041f=_0x4af530;0x0===_0x52041f[_0xc008('0x8')]('\x22')&&(_0x52041f=_0x52041f[_0xc008('0x9')](0x1,-0x1)['replace'](/\\"/g,'\x22')['replace'](/\\\\/g,'\x5c'));try{_0x52041f=decodeURIComponent(_0x52041f['replace'](_0x332fd4,'\x20'));_0x5aa09b=_0x2ea200[_0xc008('0x5')]?JSON[_0xc008('0xa')](_0x52041f):_0x52041f;break _0x5b64f8;}catch(_0x5b2004){}_0x5aa09b=void 0x0;}return _0x10b33c[_0xc008('0xb')](_0x428fa9)?_0x428fa9(_0x5aa09b):_0x5aa09b;}var _0x332fd4=/\+/g,_0x2ea200=_0x10b33c[_0xc008('0x1')]=function(_0x9ffa93,_0x1819c6,_0x69726e){if(0x1<arguments['length']&&!_0x10b33c['isFunction'](_0x1819c6)){_0x69726e=_0x10b33c[_0xc008('0xc')]({},_0x2ea200['defaults'],_0x69726e);if(_0xc008('0xd')===typeof _0x69726e[_0xc008('0xe')]){var _0x2073ef=_0x69726e[_0xc008('0xe')],_0x339ffc=_0x69726e['expires']=new Date();_0x339ffc['setTime'](+_0x339ffc+0x5265c00*_0x2073ef);}return document['cookie']=[_0x2ea200[_0xc008('0x7')]?_0x9ffa93:encodeURIComponent(_0x9ffa93),'=',_0x163bd9(_0x1819c6),_0x69726e[_0xc008('0xe')]?_0xc008('0xf')+_0x69726e[_0xc008('0xe')]['toUTCString']():'',_0x69726e['path']?';\x20path='+_0x69726e['path']:'',_0x69726e[_0xc008('0x10')]?_0xc008('0x11')+_0x69726e['domain']:'',_0x69726e[_0xc008('0x12')]?';\x20secure':'']['join']('');}for(var _0x2073ef=_0x9ffa93?void 0x0:{},_0x339ffc=document['cookie']?document['cookie']['split'](';\x20'):[],_0x5754a0=0x0,_0x4b9726=_0x339ffc['length'];_0x5754a0<_0x4b9726;_0x5754a0++){var _0x13a263=_0x339ffc[_0x5754a0][_0xc008('0x13')]('='),_0x4777a6;_0x4777a6=_0x13a263[_0xc008('0x14')]();_0x4777a6=_0x2ea200[_0xc008('0x7')]?_0x4777a6:decodeURIComponent(_0x4777a6);_0x13a263=_0x13a263[_0xc008('0x15')]('=');if(_0x9ffa93&&_0x9ffa93===_0x4777a6){_0x2073ef=_0x9c8cb2(_0x13a263,_0x1819c6);break;}_0x9ffa93||void 0x0===(_0x13a263=_0x9c8cb2(_0x13a263))||(_0x2073ef[_0x4777a6]=_0x13a263);}return _0x2073ef;};_0x2ea200['defaults']={};_0x10b33c[_0xc008('0x16')]=function(_0x5c85f2,_0x58a6ea){if(void 0x0===_0x10b33c[_0xc008('0x1')](_0x5c85f2))return!0x1;_0x10b33c[_0xc008('0x1')](_0x5c85f2,'',_0x10b33c[_0xc008('0xc')]({},_0x58a6ea,{'expires':-0x1}));return!_0x10b33c[_0xc008('0x1')](_0x5c85f2);};});}());function qd_number_format(_0x5410f5,_0x48582b,_0x5de1e9,_0x3f7b07){_0x5410f5=(_0x5410f5+'')[_0xc008('0x17')](/[^0-9+\-Ee.]/g,'');_0x5410f5=isFinite(+_0x5410f5)?+_0x5410f5:0x0;_0x48582b=isFinite(+_0x48582b)?Math[_0xc008('0x18')](_0x48582b):0x0;_0x3f7b07=_0xc008('0x19')===typeof _0x3f7b07?',':_0x3f7b07;_0x5de1e9='undefined'===typeof _0x5de1e9?'.':_0x5de1e9;var _0x4adbab='',_0x4adbab=function(_0x4caaf4,_0x3865c0){var _0x48582b=Math[_0xc008('0x1a')](0xa,_0x3865c0);return''+(Math['round'](_0x4caaf4*_0x48582b)/_0x48582b)[_0xc008('0x1b')](_0x3865c0);},_0x4adbab=(_0x48582b?_0x4adbab(_0x5410f5,_0x48582b):''+Math[_0xc008('0x1c')](_0x5410f5))[_0xc008('0x13')]('.');0x3<_0x4adbab[0x0][_0xc008('0x1d')]&&(_0x4adbab[0x0]=_0x4adbab[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x3f7b07));(_0x4adbab[0x1]||'')[_0xc008('0x1d')]<_0x48582b&&(_0x4adbab[0x1]=_0x4adbab[0x1]||'',_0x4adbab[0x1]+=Array(_0x48582b-_0x4adbab[0x1][_0xc008('0x1d')]+0x1)['join']('0'));return _0x4adbab['join'](_0x5de1e9);};(function(_0x539766){var _0x1032b2=jQuery;if(_0xc008('0x0')!==typeof _0x1032b2['fn'][_0xc008('0x1e')]){_0x1032b2['fn'][_0xc008('0x1e')]=function(){};var _0x1de04b=function(_0x1ac7c8,_0x596ee8){if(_0xc008('0x3')===typeof console&&_0xc008('0x0')===typeof console['error']&&_0xc008('0x0')===typeof console[_0xc008('0x1f')]&&_0xc008('0x0')===typeof console[_0xc008('0x20')]){var _0xd0e05a;_0xc008('0x3')===typeof _0x1ac7c8?(_0x1ac7c8[_0xc008('0x21')](_0xc008('0x22')),_0xd0e05a=_0x1ac7c8):_0xd0e05a=[_0xc008('0x22')+_0x1ac7c8];if('undefined'===typeof _0x596ee8||_0xc008('0x23')!==_0x596ee8[_0xc008('0x24')]()&&_0xc008('0x25')!==_0x596ee8[_0xc008('0x24')]())if(_0xc008('0x19')!==typeof _0x596ee8&&_0xc008('0x1f')===_0x596ee8[_0xc008('0x24')]())try{console['info'][_0xc008('0x26')](console,_0xd0e05a);}catch(_0x21763f){console['info'](_0xd0e05a[_0xc008('0x15')]('\x0a'));}else try{console[_0xc008('0x27')]['apply'](console,_0xd0e05a);}catch(_0x263473){console[_0xc008('0x27')](_0xd0e05a[_0xc008('0x15')]('\x0a'));}else try{console['warn']['apply'](console,_0xd0e05a);}catch(_0x478810){console[_0xc008('0x20')](_0xd0e05a['join']('\x0a'));}}},_0xceebc3={'headItem':_0xc008('0x28'),'bodyRow':_0xc008('0x29'),'bodyPrice':_0xc008('0x2a'),'rowName':_0xc008('0x2b'),'rowPrice':_0xc008('0x2c'),'rowImage':_0xc008('0x2d'),'rowImageSize':_0xc008('0x2e'),'unavailableHtml':_0xc008('0x2f'),'QD_smartNotifyMeHtml':_0xc008('0x30'),'QD_smartNotifyMeOptions':{'placement':_0xc008('0x31')},'inputQtt':_0xc008('0x32'),'qttMore':_0xc008('0x33'),'qttMinus':_0xc008('0x34'),'buyButton':_0xc008('0x35'),'selectSkuMsg':'javascript:alert(\x27Por\x20favor,\x20selecione\x20a\x20quantidade\x20desejada.\x27);','qttSkus':_0xc008('0x36'),'valueSkus':_0xc008('0x37'),'checkLoginErrorMsg':_0xc008('0x38'),'userLoginWrapper':_0xc008('0x39'),'titleZ':'.qd-sku-title-z'},_0x294f97=function(_0x2c4964,_0x15396b){try{if(!_0x2c4964[_0xc008('0x1d')])return _0x2c4964;var _0x36e7ae=_0x2c4964[_0xc008('0x3a')]('data-qd-smart-sku-grid');if(_0xc008('0x3b')!==typeof _0x36e7ae||!_0x36e7ae[_0xc008('0x1d')])return _0x1de04b([_0xc008('0x3c'),_0x36e7ae]);if(0x2!==skuJson[_0xc008('0x3d')][_0xc008('0x1d')]&&0x3!==skuJson['dimensions'][_0xc008('0x1d')])return _0x1de04b([_0xc008('0x3e')]);var _0x34c15e=_0x2c4964[_0xc008('0x3a')]('data-qd-smart-sku-grid-z');if(0x3===skuJson[_0xc008('0x3d')][_0xc008('0x1d')]&&(_0xc008('0x3b')!==typeof _0x34c15e||!_0x34c15e['length']))return _0x1de04b([_0xc008('0x3f'),_0x34c15e]);}catch(_0x49a176){_0x1de04b(_0x49a176[_0xc008('0x40')]);}try{for(var _0x5d3a72,_0x46fa8f=0x0;_0x46fa8f<skuJson[_0xc008('0x3d')]['length'];_0x46fa8f++)if(skuJson[_0xc008('0x3d')][_0x46fa8f]!==_0x36e7ae&&(_0x34c15e?skuJson[_0xc008('0x3d')][_0x46fa8f]!==_0x34c15e:0x1)){_0x5d3a72=skuJson[_0xc008('0x3d')][_0x46fa8f];break;}var _0x5caaa2=new _0x1032b2();if(_0x34c15e){for(_0x46fa8f=0x0;_0x46fa8f<skuJson[_0xc008('0x41')][_0x34c15e][_0xc008('0x1d')];_0x46fa8f++){var _0x200469=_0x2c4964[_0xc008('0x42')]()[_0xc008('0x43')](_0x2c4964);_0x22d8e8(_0x200469,_0x15396b,_0x36e7ae,_0x5d3a72,_0x34c15e,skuJson[_0xc008('0x41')][_0x34c15e][_0x46fa8f]);_0x200469['find'](_0x15396b['titleZ'])['append'](skuJson[_0xc008('0x41')][_0x34c15e][_0x46fa8f]);_0x5caaa2=_0x5caaa2[_0xc008('0x44')](_0x200469);}_0x2c4964[_0xc008('0x45')]();}else _0x22d8e8(_0x2c4964,_0x15396b,_0x36e7ae,_0x5d3a72,!0x1),_0x5caaa2=_0x5caaa2[_0xc008('0x44')](_0x2c4964);return _0x5caaa2;}catch(_0x25289f){_0x1de04b(_0x25289f[_0xc008('0x40')]);}},_0x22d8e8=function(_0x2cf641,_0x33be4f,_0x572593,_0x4b39d0,_0x516e43,_0x2d5a49){try{for(var _0x2651cf=_0x2cf641['find'](_0x33be4f[_0xc008('0x46')]),_0x158eae=0x0;_0x158eae<skuJson[_0xc008('0x41')][_0x572593][_0xc008('0x1d')];_0x158eae++)_0x2651cf[_0xc008('0x42')]()[_0xc008('0x47')](skuJson[_0xc008('0x41')][_0x572593][_0x158eae])[_0xc008('0x43')](_0x2651cf);_0x2651cf[_0xc008('0x45')]();var _0x3fd7d9=_0x2cf641['find'](_0x33be4f['bodyRow']),_0x3965b7=_0x3fd7d9[_0xc008('0x48')](_0x33be4f['bodyPrice']);for(_0x158eae=0x0;_0x158eae<skuJson[_0xc008('0x41')][_0x572593][_0xc008('0x1d')];_0x158eae++)_0x3965b7[_0xc008('0x42')]()['attr'](_0xc008('0x49'),skuJson[_0xc008('0x41')][_0x572593][_0x158eae])[_0xc008('0x43')](_0x3965b7);_0x3965b7[_0xc008('0x45')]();for(_0x158eae=0x0;_0x158eae<skuJson[_0xc008('0x41')][_0x4b39d0]['length'];_0x158eae++){var _0x3a7b3b=_0x3fd7d9[_0xc008('0x42')]();_0x3a7b3b['find'](_0x33be4f[_0xc008('0x4a')])[_0xc008('0x47')](skuJson['dimensionsMap'][_0x4b39d0][_0x158eae]);_0x3a7b3b['attr'](_0xc008('0x4b'),skuJson[_0xc008('0x41')][_0x4b39d0][_0x158eae]);_0x3a7b3b[_0xc008('0x43')](_0x3fd7d9);}_0x3fd7d9[_0xc008('0x45')]();var _0x539766=_0x2cf641['find'](_0x33be4f['bodyRow']);_0x539766[_0xc008('0x48')](_0x33be4f['bodyPrice'])[_0xc008('0x4c')](_0xc008('0x4d'));for(_0x2651cf=0x0;_0x2651cf<skuJson[_0xc008('0x4e')][_0xc008('0x1d')];_0x2651cf++)if(!_0x516e43||skuJson[_0xc008('0x4e')][_0x2651cf][_0xc008('0x3d')][_0x516e43]===_0x2d5a49){var _0x49d8b0=_0x539766[_0xc008('0x4f')](_0xc008('0x50')+skuJson[_0xc008('0x4e')][_0x2651cf][_0xc008('0x3d')][_0x4b39d0]+'\x27]');_0x49d8b0[_0xc008('0x48')](_0x33be4f['rowImage'])[_0xc008('0x51')]('<img\x20src=\x22'+skuJson['skus'][_0x2651cf]['image'][_0xc008('0x17')](/(ids\/[0-9]+-)[0-9]+-[0-9]+\//i,'$1'+_0x33be4f[_0xc008('0x52')]+'/')+_0xc008('0x53')+skuJson['skus'][_0x2651cf][_0xc008('0x54')]+_0xc008('0x55'));var _0x3dda82=_0x49d8b0['find'](_0x33be4f[_0xc008('0x56')])[_0xc008('0x4f')](_0xc008('0x57')+skuJson[_0xc008('0x4e')][_0x2651cf]['dimensions'][_0x572593]+'\x27]');_0x3dda82[_0xc008('0x1d')]&&(_0x3dda82['attr']('id',skuJson[_0xc008('0x4e')][_0x2651cf][_0xc008('0x58')]),_0x3dda82[_0xc008('0x59')](_0xc008('0x4d')),_0x3dda82[_0xc008('0x48')](_0x33be4f[_0xc008('0x5a')])['attr']({'data-sku-id':skuJson[_0xc008('0x4e')][_0x2651cf]['sku'],'data-sku-seller':skuJson['skus'][_0x2651cf][_0xc008('0x5b')],'data-sku-price':skuJson[_0xc008('0x4e')][_0x2651cf]['bestPrice']}),skuJson[_0xc008('0x4e')][_0x2651cf][_0xc008('0x5c')]?(skuJson[_0xc008('0x4e')][_0x2651cf][_0xc008('0x5d')]&&_0x3dda82[_0xc008('0x48')](_0x33be4f[_0xc008('0x5e')])[_0xc008('0x47')]('<span\x20class=\x22qd-sku-old-price\x22>'+skuJson[_0xc008('0x4e')][_0x2651cf][_0xc008('0x5f')]+_0xc008('0x60')),_0x3dda82[_0xc008('0x48')](_0x33be4f[_0xc008('0x5e')])[_0xc008('0x47')](_0xc008('0x61')+skuJson[_0xc008('0x4e')][_0x2651cf][_0xc008('0x62')]+_0xc008('0x60'))):(_0x3dda82[_0xc008('0x48')](_0x33be4f[_0xc008('0x5e')])[_0xc008('0x47')](_0x33be4f[_0xc008('0x63')]),_0x3dda82['addClass'](_0xc008('0x64')),_0x3dda82[_0xc008('0x48')](_0x33be4f[_0xc008('0x5a')])['attr'](_0xc008('0x65'),_0xc008('0x65')),_0x2ff671&&_0x1032b2(_0x33be4f['QD_smartNotifyMeHtml'])['appendTo'](_0x3dda82[_0xc008('0x48')](_0x33be4f[_0xc008('0x5e')]))[_0xc008('0x66')](_0x1032b2[_0xc008('0xc')]({},_0x33be4f[_0xc008('0x67')],{'skuId':skuJson[_0xc008('0x4e')][_0x2651cf][_0xc008('0x58')]}))));_0x49d8b0[_0xc008('0x4c')](_0xc008('0x68'));}_0x539766[_0xc008('0x69')](_0xc008('0x6a'))['remove']();_0x2cf641[_0xc008('0x4c')](_0xc008('0x6b'));_0x2cf641[_0xc008('0x59')](_0xc008('0x6c'));}catch(_0x521e67){_0x1de04b(_0x521e67[_0xc008('0x40')]);}},_0x1fe1e1=function(_0x5975de,_0x3a1de5){_0x5975de[_0xc008('0x48')](_0x3a1de5[_0xc008('0x4a')])['add'](_0x3a1de5[_0xc008('0x6d')])[_0xc008('0x6e')](function(){try{for(var _0x3a1de5=_0x1032b2(this)['siblings'](_0xc008('0x6f'))[_0xc008('0x3a')]('id'),_0x553f5c,_0x35b28a=0x0;_0x35b28a<skuJson[_0xc008('0x4e')][_0xc008('0x1d')];_0x35b28a++)if(skuJson[_0xc008('0x4e')][_0x35b28a]['sku']==_0x3a1de5){_0x553f5c=skuJson[_0xc008('0x4e')][_0x35b28a];break;}_0x553f5c&&_0x1032b2(document)[_0xc008('0x70')]('skuSelected.vtex',[_0x3a1de5,_0x553f5c]);}catch(_0x3efb77){_0x1de04b(_0x3efb77['message']);}});},_0x2b862d=function(_0x278cbe,_0x50bfe5){if(!_0x278cbe[_0xc008('0x1d')])return _0x278cbe;try{_0x278cbe['find'](_0x50bfe5[_0xc008('0x56')])[_0xc008('0x71')](function(){var _0x278cbe=_0x1032b2(this),_0x47337b=_0x278cbe['find'](_0x50bfe5[_0xc008('0x5a')]);_0x47337b['on'](_0xc008('0x72'),function(){_0x1032b2(this)[_0xc008('0x70')](_0xc008('0x73'));});_0x278cbe[_0xc008('0x74')]({'buyButton':null,'qttInput':_0x47337b,'btnMore':_0x50bfe5[_0xc008('0x75')],'btnMinus':_0x50bfe5[_0xc008('0x76')],'initialValue':0x0,'minimumValue':0x0});});}catch(_0x3b46e4){_0x1de04b(_0x3b46e4['message']);}},_0x2f4b6b=function(_0x3e535b,_0x530c2f){if(!_0x3e535b['length'])return _0x3e535b;try{var _0x4c84da=_0x1032b2(_0x530c2f[_0xc008('0x77')]);_0x4c84da[_0xc008('0x3a')](_0xc008('0x78'),_0x530c2f[_0xc008('0x79')]);var _0xc2f684=_0x3e535b[_0xc008('0x48')](_0x530c2f[_0xc008('0x5a')])[_0xc008('0x69')](_0xc008('0x65'))['filter'](_0xc008('0x7a'));_0xc2f684['on'](_0xc008('0x73'),function(){try{var _0x3e535b=[];_0xc2f684[_0xc008('0x71')](function(){var _0x530c2f=_0x1032b2(this),_0x3b2669=parseInt(_0x530c2f[_0xc008('0x7b')]());0x0<_0x3b2669&&(_0x3e535b[_0xc008('0x7c')](_0xc008('0x7d')+_0x530c2f[_0xc008('0x3a')](_0xc008('0x7e'))),_0x3e535b[_0xc008('0x7c')]('qty='+_0x3b2669),_0x3e535b['push'](_0xc008('0x7f')+_0x530c2f[_0xc008('0x3a')](_0xc008('0x80'))));});_0x3e535b['length']?(_0x3e535b[_0xc008('0x7c')](_0x1032b2[_0xc008('0x1')]('VTEXSC')||'sc=1'),_0x4c84da['attr'](_0xc008('0x78'),_0xc008('0x81')+_0x3e535b[_0xc008('0x15')]('&'))):_0x4c84da[_0xc008('0x3a')](_0xc008('0x78'),_0x530c2f[_0xc008('0x79')]);}catch(_0x285c09){_0x1de04b(_0x285c09[_0xc008('0x40')]);}});}catch(_0x1161e6){_0x1de04b(_0x1161e6[_0xc008('0x40')]);}};_0x539766=function(_0x52091b){var _0x57b8ad={'p':_0xc008('0x82')};return function(_0x31ebde){var _0x3f3dcf=function(_0x3f1e41){return _0x3f1e41;};var _0x2b94b2=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x31ebde=_0x31ebde['d'+_0x2b94b2[0x10]+'c'+_0x2b94b2[0x11]+'m'+_0x3f3dcf(_0x2b94b2[0x1])+'n'+_0x2b94b2[0xd]]['l'+_0x2b94b2[0x12]+'c'+_0x2b94b2[0x0]+'ti'+_0x3f3dcf('o')+'n'];var _0x37fc2c=function(_0x4b434f){return escape(encodeURIComponent(_0x4b434f['replace'](/\./g,'¨')[_0xc008('0x17')](/[a-zA-Z]/g,function(_0x391425){return String[_0xc008('0x83')](('Z'>=_0x391425?0x5a:0x7a)>=(_0x391425=_0x391425['charCodeAt'](0x0)+0xd)?_0x391425:_0x391425-0x1a);})));};var _0x4b90bd=_0x37fc2c(_0x31ebde[[_0x2b94b2[0x9],_0x3f3dcf('o'),_0x2b94b2[0xc],_0x2b94b2[_0x3f3dcf(0xd)]]['join']('')]);_0x37fc2c=_0x37fc2c((window[['js',_0x3f3dcf('no'),'m',_0x2b94b2[0x1],_0x2b94b2[0x4]['toUpperCase'](),'ite']['join']('')]||_0xc008('0x84'))+['.v',_0x2b94b2[0xd],'e',_0x3f3dcf('x'),'co',_0x3f3dcf('mm'),'erc',_0x2b94b2[0x1],'.c',_0x3f3dcf('o'),'m.',_0x2b94b2[0x13],'r'][_0xc008('0x15')](''));for(var _0x4b0039 in _0x57b8ad){if(_0x37fc2c===_0x4b0039+_0x57b8ad[_0x4b0039]||_0x4b90bd===_0x4b0039+_0x57b8ad[_0x4b0039]){var _0x2772c9='tr'+_0x2b94b2[0x11]+'e';break;}_0x2772c9='f'+_0x2b94b2[0x0]+'ls'+_0x3f3dcf(_0x2b94b2[0x1])+'';}_0x3f3dcf=!0x1;-0x1<_0x31ebde[[_0x2b94b2[0xc],'e',_0x2b94b2[0x0],'rc',_0x2b94b2[0x9]][_0xc008('0x15')]('')][_0xc008('0x8')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x3f3dcf=!0x0);return[_0x2772c9,_0x3f3dcf];}(_0x52091b);}(window);if(!eval(_0x539766[0x0]))return _0x539766[0x1]?_0x1de04b('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x2ff671=!0x1;_0x1032b2['fn']['QD_smartSkuGrid']=function(_0x29d8e0){var _0x3c37bd=_0x1032b2(this);if(!_0x3c37bd['length'])return _0x3c37bd;0x1<_0x3c37bd[_0xc008('0x1d')]&&_0x1de04b('Atenção!\x20Cara\x20na\x20boa,\x20este\x20plugin\x20não\x20suporta\x20mais\x20de\x20um\x20gride,\x20por\x20favor\x20se\x20precisa\x20renderizar\x20outros\x20na\x20tela,\x20utilize\x20o\x20$().each','aviso');_0x29d8e0=_0x1032b2[_0xc008('0xc')]({},_0xceebc3,_0x29d8e0);_0xc008('0x0')!==typeof _0x1032b2['fn']['QD_smartNotifyMe']?_0x1de04b(_0xc008('0x85'),_0xc008('0x25')):_0x2ff671=!0x0;var _0x39ccf2=_0x294f97(_0x3c37bd,_0x29d8e0);_0x2b862d(_0x1032b2(_0x39ccf2),_0x29d8e0);_0x2f4b6b(_0x1032b2(_0x39ccf2),_0x29d8e0);_0x1032b2['QD_smartSkuTotalizer'](_0x1032b2(_0x39ccf2),_0x29d8e0);_0x1fe1e1(_0x1032b2(_0x39ccf2),_0x29d8e0);_0x1032b2(window)[_0xc008('0x70')](_0xc008('0x86'),this);return _0x3c37bd;};_0x1032b2(function(){_0x1032b2(_0xc008('0x87'))[_0xc008('0x1e')]();});}}(this));

/* Quatro Digital - QD Smart SKU Limiter // Carlos Vinicius // Todos os direitos reservados */
var _0xa3ad=['ajax','done','success','always','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','message','version','4.0','info','warn','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Sku\x20Limiter]\x0a','toLowerCase','aviso','join','apply','QTDE\x20DISPONÍVEL:\x20#qtt','/produto/sku/','idSku','json','qd-ssl-stock-qtt','AvailableQuantity','SkuSellersInformation','.\x20Detalhes:\x20','val','attr','title','limitMessage','#qtt','show','trigger','change','qd_ssl_trigger','qd-ssl-tooltip-timeout','tooltip','hide','neynoretnznfx%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','toUpperCase','---','erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','QD_smartSkuLimiter','qdPlugin','.qd_auto_smart_sku_limiter','QuatroDigital.sq_change\x20QuatroDigital.sq_focusin','sq_focusin','namespace','data-sku-id','undefined','length','charCodeAt','fromCharCode','Unmatched\x20trail\x20surrogate\x20at\x20','Unmatched\x20lead\x20surrogate\x20at\x20','slice','function','toString','substr','utf8_encode','qdAjax','qdAjaxQueue','replace','error','extend','object','data','stringify','url','jqXHR'];(function(_0x322522,_0x4db288){var _0x293bcf=function(_0xf108b8){while(--_0xf108b8){_0x322522['push'](_0x322522['shift']());}};_0x293bcf(++_0x4db288);}(_0xa3ad,0x14e));var _0xda3a=function(_0x31e6cc,_0x546eb5){_0x31e6cc=_0x31e6cc-0x0;var _0x39610d=_0xa3ad[_0x31e6cc];return _0x39610d;};function utf8_encode(_0x1ad43d){if(null===_0x1ad43d||_0xda3a('0x0')===typeof _0x1ad43d)return'';_0x1ad43d+='';var _0xedb25c='',_0x14f786,_0x4e8185,_0x9c71f3=0x0;_0x14f786=_0x4e8185=0x0;for(var _0x9c71f3=_0x1ad43d[_0xda3a('0x1')],_0x3791d7=0x0;_0x3791d7<_0x9c71f3;_0x3791d7++){var _0x183cf2=_0x1ad43d[_0xda3a('0x2')](_0x3791d7),_0x275304=null;if(0x80>_0x183cf2)_0x4e8185++;else if(0x7f<_0x183cf2&&0x800>_0x183cf2)_0x275304=String[_0xda3a('0x3')](_0x183cf2>>0x6|0xc0,_0x183cf2&0x3f|0x80);else if(0xd800!=(_0x183cf2&0xf800))_0x275304=String[_0xda3a('0x3')](_0x183cf2>>0xc|0xe0,_0x183cf2>>0x6&0x3f|0x80,_0x183cf2&0x3f|0x80);else{if(0xd800!=(_0x183cf2&0xfc00))throw new RangeError(_0xda3a('0x4')+_0x3791d7);_0x275304=_0x1ad43d['charCodeAt'](++_0x3791d7);if(0xdc00!=(_0x275304&0xfc00))throw new RangeError(_0xda3a('0x5')+(_0x3791d7-0x1));_0x183cf2=((_0x183cf2&0x3ff)<<0xa)+(_0x275304&0x3ff)+0x10000;_0x275304=String[_0xda3a('0x3')](_0x183cf2>>0x12|0xf0,_0x183cf2>>0xc&0x3f|0x80,_0x183cf2>>0x6&0x3f|0x80,_0x183cf2&0x3f|0x80);}null!==_0x275304&&(_0x4e8185>_0x14f786&&(_0xedb25c+=_0x1ad43d['slice'](_0x14f786,_0x4e8185)),_0xedb25c+=_0x275304,_0x14f786=_0x4e8185=_0x3791d7+0x1);}_0x4e8185>_0x14f786&&(_0xedb25c+=_0x1ad43d[_0xda3a('0x6')](_0x14f786,_0x9c71f3));return _0xedb25c;};if(_0xda3a('0x7')!==typeof qd_md5)var qd_md5=function(_0x3261b9){var _0x33527f=function(_0x3ea596,_0x64d64f){var _0xe3520f,_0x3896bc,_0x4034a9,_0x4be7d4,_0x109ddf;_0x4034a9=_0x3ea596&0x80000000;_0x4be7d4=_0x64d64f&0x80000000;_0xe3520f=_0x3ea596&0x40000000;_0x3896bc=_0x64d64f&0x40000000;_0x109ddf=(_0x3ea596&0x3fffffff)+(_0x64d64f&0x3fffffff);return _0xe3520f&_0x3896bc?_0x109ddf^0x80000000^_0x4034a9^_0x4be7d4:_0xe3520f|_0x3896bc?_0x109ddf&0x40000000?_0x109ddf^0xc0000000^_0x4034a9^_0x4be7d4:_0x109ddf^0x40000000^_0x4034a9^_0x4be7d4:_0x109ddf^_0x4034a9^_0x4be7d4;},_0x1232c2=function(_0x45d7a4,_0x5e8d0d,_0x3797a9,_0x4596b5,_0x3809eb,_0x370551,_0x4e4b85){_0x45d7a4=_0x33527f(_0x45d7a4,_0x33527f(_0x33527f(_0x5e8d0d&_0x3797a9|~_0x5e8d0d&_0x4596b5,_0x3809eb),_0x4e4b85));return _0x33527f(_0x45d7a4<<_0x370551|_0x45d7a4>>>0x20-_0x370551,_0x5e8d0d);},_0x28e504=function(_0x1e3736,_0x3fa9c5,_0x510e37,_0x281ec6,_0x54a56d,_0x527a8b,_0x3ed6b2){_0x1e3736=_0x33527f(_0x1e3736,_0x33527f(_0x33527f(_0x3fa9c5&_0x281ec6|_0x510e37&~_0x281ec6,_0x54a56d),_0x3ed6b2));return _0x33527f(_0x1e3736<<_0x527a8b|_0x1e3736>>>0x20-_0x527a8b,_0x3fa9c5);},_0x4368eb=function(_0x1bf181,_0x1b7405,_0x7c4ee6,_0x48c7cd,_0x45c9e4,_0x18a3cf,_0x81f013){_0x1bf181=_0x33527f(_0x1bf181,_0x33527f(_0x33527f(_0x1b7405^_0x7c4ee6^_0x48c7cd,_0x45c9e4),_0x81f013));return _0x33527f(_0x1bf181<<_0x18a3cf|_0x1bf181>>>0x20-_0x18a3cf,_0x1b7405);},_0x144024=function(_0x1dbb55,_0x4948e6,_0x135fe3,_0x36d437,_0x20cdb1,_0x569210,_0x1fc833){_0x1dbb55=_0x33527f(_0x1dbb55,_0x33527f(_0x33527f(_0x135fe3^(_0x4948e6|~_0x36d437),_0x20cdb1),_0x1fc833));return _0x33527f(_0x1dbb55<<_0x569210|_0x1dbb55>>>0x20-_0x569210,_0x4948e6);},_0x480086=function(_0x46f732){var _0x26d396='',_0x3fd89e='',_0x2e6921;for(_0x2e6921=0x0;0x3>=_0x2e6921;_0x2e6921++)_0x3fd89e=_0x46f732>>>0x8*_0x2e6921&0xff,_0x3fd89e='0'+_0x3fd89e[_0xda3a('0x8')](0x10),_0x26d396+=_0x3fd89e[_0xda3a('0x9')](_0x3fd89e['length']-0x2,0x2);return _0x26d396;},_0x447942=[],_0x34d200,_0x13da48,_0x12cbe0,_0x2ed1d2,_0x407dec,_0x3ea8f3,_0x183705,_0x3bf131,_0x54107d;_0x3261b9=this[_0xda3a('0xa')](_0x3261b9);_0x447942=function(_0x408f57){var _0x3b4b07,_0x104bb2=_0x408f57[_0xda3a('0x1')];_0x3b4b07=_0x104bb2+0x8;for(var _0x4094df=0x10*((_0x3b4b07-_0x3b4b07%0x40)/0x40+0x1),_0x91a12f=Array(_0x4094df-0x1),_0xf3abd=0x0,_0x3901ef=0x0;_0x3901ef<_0x104bb2;)_0x3b4b07=(_0x3901ef-_0x3901ef%0x4)/0x4,_0xf3abd=_0x3901ef%0x4*0x8,_0x91a12f[_0x3b4b07]|=_0x408f57[_0xda3a('0x2')](_0x3901ef)<<_0xf3abd,_0x3901ef++;_0x3b4b07=(_0x3901ef-_0x3901ef%0x4)/0x4;_0x91a12f[_0x3b4b07]|=0x80<<_0x3901ef%0x4*0x8;_0x91a12f[_0x4094df-0x2]=_0x104bb2<<0x3;_0x91a12f[_0x4094df-0x1]=_0x104bb2>>>0x1d;return _0x91a12f;}(_0x3261b9);_0x3ea8f3=0x67452301;_0x183705=0xefcdab89;_0x3bf131=0x98badcfe;_0x54107d=0x10325476;_0x3261b9=_0x447942[_0xda3a('0x1')];for(_0x34d200=0x0;_0x34d200<_0x3261b9;_0x34d200+=0x10)_0x13da48=_0x3ea8f3,_0x12cbe0=_0x183705,_0x2ed1d2=_0x3bf131,_0x407dec=_0x54107d,_0x3ea8f3=_0x1232c2(_0x3ea8f3,_0x183705,_0x3bf131,_0x54107d,_0x447942[_0x34d200+0x0],0x7,0xd76aa478),_0x54107d=_0x1232c2(_0x54107d,_0x3ea8f3,_0x183705,_0x3bf131,_0x447942[_0x34d200+0x1],0xc,0xe8c7b756),_0x3bf131=_0x1232c2(_0x3bf131,_0x54107d,_0x3ea8f3,_0x183705,_0x447942[_0x34d200+0x2],0x11,0x242070db),_0x183705=_0x1232c2(_0x183705,_0x3bf131,_0x54107d,_0x3ea8f3,_0x447942[_0x34d200+0x3],0x16,0xc1bdceee),_0x3ea8f3=_0x1232c2(_0x3ea8f3,_0x183705,_0x3bf131,_0x54107d,_0x447942[_0x34d200+0x4],0x7,0xf57c0faf),_0x54107d=_0x1232c2(_0x54107d,_0x3ea8f3,_0x183705,_0x3bf131,_0x447942[_0x34d200+0x5],0xc,0x4787c62a),_0x3bf131=_0x1232c2(_0x3bf131,_0x54107d,_0x3ea8f3,_0x183705,_0x447942[_0x34d200+0x6],0x11,0xa8304613),_0x183705=_0x1232c2(_0x183705,_0x3bf131,_0x54107d,_0x3ea8f3,_0x447942[_0x34d200+0x7],0x16,0xfd469501),_0x3ea8f3=_0x1232c2(_0x3ea8f3,_0x183705,_0x3bf131,_0x54107d,_0x447942[_0x34d200+0x8],0x7,0x698098d8),_0x54107d=_0x1232c2(_0x54107d,_0x3ea8f3,_0x183705,_0x3bf131,_0x447942[_0x34d200+0x9],0xc,0x8b44f7af),_0x3bf131=_0x1232c2(_0x3bf131,_0x54107d,_0x3ea8f3,_0x183705,_0x447942[_0x34d200+0xa],0x11,0xffff5bb1),_0x183705=_0x1232c2(_0x183705,_0x3bf131,_0x54107d,_0x3ea8f3,_0x447942[_0x34d200+0xb],0x16,0x895cd7be),_0x3ea8f3=_0x1232c2(_0x3ea8f3,_0x183705,_0x3bf131,_0x54107d,_0x447942[_0x34d200+0xc],0x7,0x6b901122),_0x54107d=_0x1232c2(_0x54107d,_0x3ea8f3,_0x183705,_0x3bf131,_0x447942[_0x34d200+0xd],0xc,0xfd987193),_0x3bf131=_0x1232c2(_0x3bf131,_0x54107d,_0x3ea8f3,_0x183705,_0x447942[_0x34d200+0xe],0x11,0xa679438e),_0x183705=_0x1232c2(_0x183705,_0x3bf131,_0x54107d,_0x3ea8f3,_0x447942[_0x34d200+0xf],0x16,0x49b40821),_0x3ea8f3=_0x28e504(_0x3ea8f3,_0x183705,_0x3bf131,_0x54107d,_0x447942[_0x34d200+0x1],0x5,0xf61e2562),_0x54107d=_0x28e504(_0x54107d,_0x3ea8f3,_0x183705,_0x3bf131,_0x447942[_0x34d200+0x6],0x9,0xc040b340),_0x3bf131=_0x28e504(_0x3bf131,_0x54107d,_0x3ea8f3,_0x183705,_0x447942[_0x34d200+0xb],0xe,0x265e5a51),_0x183705=_0x28e504(_0x183705,_0x3bf131,_0x54107d,_0x3ea8f3,_0x447942[_0x34d200+0x0],0x14,0xe9b6c7aa),_0x3ea8f3=_0x28e504(_0x3ea8f3,_0x183705,_0x3bf131,_0x54107d,_0x447942[_0x34d200+0x5],0x5,0xd62f105d),_0x54107d=_0x28e504(_0x54107d,_0x3ea8f3,_0x183705,_0x3bf131,_0x447942[_0x34d200+0xa],0x9,0x2441453),_0x3bf131=_0x28e504(_0x3bf131,_0x54107d,_0x3ea8f3,_0x183705,_0x447942[_0x34d200+0xf],0xe,0xd8a1e681),_0x183705=_0x28e504(_0x183705,_0x3bf131,_0x54107d,_0x3ea8f3,_0x447942[_0x34d200+0x4],0x14,0xe7d3fbc8),_0x3ea8f3=_0x28e504(_0x3ea8f3,_0x183705,_0x3bf131,_0x54107d,_0x447942[_0x34d200+0x9],0x5,0x21e1cde6),_0x54107d=_0x28e504(_0x54107d,_0x3ea8f3,_0x183705,_0x3bf131,_0x447942[_0x34d200+0xe],0x9,0xc33707d6),_0x3bf131=_0x28e504(_0x3bf131,_0x54107d,_0x3ea8f3,_0x183705,_0x447942[_0x34d200+0x3],0xe,0xf4d50d87),_0x183705=_0x28e504(_0x183705,_0x3bf131,_0x54107d,_0x3ea8f3,_0x447942[_0x34d200+0x8],0x14,0x455a14ed),_0x3ea8f3=_0x28e504(_0x3ea8f3,_0x183705,_0x3bf131,_0x54107d,_0x447942[_0x34d200+0xd],0x5,0xa9e3e905),_0x54107d=_0x28e504(_0x54107d,_0x3ea8f3,_0x183705,_0x3bf131,_0x447942[_0x34d200+0x2],0x9,0xfcefa3f8),_0x3bf131=_0x28e504(_0x3bf131,_0x54107d,_0x3ea8f3,_0x183705,_0x447942[_0x34d200+0x7],0xe,0x676f02d9),_0x183705=_0x28e504(_0x183705,_0x3bf131,_0x54107d,_0x3ea8f3,_0x447942[_0x34d200+0xc],0x14,0x8d2a4c8a),_0x3ea8f3=_0x4368eb(_0x3ea8f3,_0x183705,_0x3bf131,_0x54107d,_0x447942[_0x34d200+0x5],0x4,0xfffa3942),_0x54107d=_0x4368eb(_0x54107d,_0x3ea8f3,_0x183705,_0x3bf131,_0x447942[_0x34d200+0x8],0xb,0x8771f681),_0x3bf131=_0x4368eb(_0x3bf131,_0x54107d,_0x3ea8f3,_0x183705,_0x447942[_0x34d200+0xb],0x10,0x6d9d6122),_0x183705=_0x4368eb(_0x183705,_0x3bf131,_0x54107d,_0x3ea8f3,_0x447942[_0x34d200+0xe],0x17,0xfde5380c),_0x3ea8f3=_0x4368eb(_0x3ea8f3,_0x183705,_0x3bf131,_0x54107d,_0x447942[_0x34d200+0x1],0x4,0xa4beea44),_0x54107d=_0x4368eb(_0x54107d,_0x3ea8f3,_0x183705,_0x3bf131,_0x447942[_0x34d200+0x4],0xb,0x4bdecfa9),_0x3bf131=_0x4368eb(_0x3bf131,_0x54107d,_0x3ea8f3,_0x183705,_0x447942[_0x34d200+0x7],0x10,0xf6bb4b60),_0x183705=_0x4368eb(_0x183705,_0x3bf131,_0x54107d,_0x3ea8f3,_0x447942[_0x34d200+0xa],0x17,0xbebfbc70),_0x3ea8f3=_0x4368eb(_0x3ea8f3,_0x183705,_0x3bf131,_0x54107d,_0x447942[_0x34d200+0xd],0x4,0x289b7ec6),_0x54107d=_0x4368eb(_0x54107d,_0x3ea8f3,_0x183705,_0x3bf131,_0x447942[_0x34d200+0x0],0xb,0xeaa127fa),_0x3bf131=_0x4368eb(_0x3bf131,_0x54107d,_0x3ea8f3,_0x183705,_0x447942[_0x34d200+0x3],0x10,0xd4ef3085),_0x183705=_0x4368eb(_0x183705,_0x3bf131,_0x54107d,_0x3ea8f3,_0x447942[_0x34d200+0x6],0x17,0x4881d05),_0x3ea8f3=_0x4368eb(_0x3ea8f3,_0x183705,_0x3bf131,_0x54107d,_0x447942[_0x34d200+0x9],0x4,0xd9d4d039),_0x54107d=_0x4368eb(_0x54107d,_0x3ea8f3,_0x183705,_0x3bf131,_0x447942[_0x34d200+0xc],0xb,0xe6db99e5),_0x3bf131=_0x4368eb(_0x3bf131,_0x54107d,_0x3ea8f3,_0x183705,_0x447942[_0x34d200+0xf],0x10,0x1fa27cf8),_0x183705=_0x4368eb(_0x183705,_0x3bf131,_0x54107d,_0x3ea8f3,_0x447942[_0x34d200+0x2],0x17,0xc4ac5665),_0x3ea8f3=_0x144024(_0x3ea8f3,_0x183705,_0x3bf131,_0x54107d,_0x447942[_0x34d200+0x0],0x6,0xf4292244),_0x54107d=_0x144024(_0x54107d,_0x3ea8f3,_0x183705,_0x3bf131,_0x447942[_0x34d200+0x7],0xa,0x432aff97),_0x3bf131=_0x144024(_0x3bf131,_0x54107d,_0x3ea8f3,_0x183705,_0x447942[_0x34d200+0xe],0xf,0xab9423a7),_0x183705=_0x144024(_0x183705,_0x3bf131,_0x54107d,_0x3ea8f3,_0x447942[_0x34d200+0x5],0x15,0xfc93a039),_0x3ea8f3=_0x144024(_0x3ea8f3,_0x183705,_0x3bf131,_0x54107d,_0x447942[_0x34d200+0xc],0x6,0x655b59c3),_0x54107d=_0x144024(_0x54107d,_0x3ea8f3,_0x183705,_0x3bf131,_0x447942[_0x34d200+0x3],0xa,0x8f0ccc92),_0x3bf131=_0x144024(_0x3bf131,_0x54107d,_0x3ea8f3,_0x183705,_0x447942[_0x34d200+0xa],0xf,0xffeff47d),_0x183705=_0x144024(_0x183705,_0x3bf131,_0x54107d,_0x3ea8f3,_0x447942[_0x34d200+0x1],0x15,0x85845dd1),_0x3ea8f3=_0x144024(_0x3ea8f3,_0x183705,_0x3bf131,_0x54107d,_0x447942[_0x34d200+0x8],0x6,0x6fa87e4f),_0x54107d=_0x144024(_0x54107d,_0x3ea8f3,_0x183705,_0x3bf131,_0x447942[_0x34d200+0xf],0xa,0xfe2ce6e0),_0x3bf131=_0x144024(_0x3bf131,_0x54107d,_0x3ea8f3,_0x183705,_0x447942[_0x34d200+0x6],0xf,0xa3014314),_0x183705=_0x144024(_0x183705,_0x3bf131,_0x54107d,_0x3ea8f3,_0x447942[_0x34d200+0xd],0x15,0x4e0811a1),_0x3ea8f3=_0x144024(_0x3ea8f3,_0x183705,_0x3bf131,_0x54107d,_0x447942[_0x34d200+0x4],0x6,0xf7537e82),_0x54107d=_0x144024(_0x54107d,_0x3ea8f3,_0x183705,_0x3bf131,_0x447942[_0x34d200+0xb],0xa,0xbd3af235),_0x3bf131=_0x144024(_0x3bf131,_0x54107d,_0x3ea8f3,_0x183705,_0x447942[_0x34d200+0x2],0xf,0x2ad7d2bb),_0x183705=_0x144024(_0x183705,_0x3bf131,_0x54107d,_0x3ea8f3,_0x447942[_0x34d200+0x9],0x15,0xeb86d391),_0x3ea8f3=_0x33527f(_0x3ea8f3,_0x13da48),_0x183705=_0x33527f(_0x183705,_0x12cbe0),_0x3bf131=_0x33527f(_0x3bf131,_0x2ed1d2),_0x54107d=_0x33527f(_0x54107d,_0x407dec);return(_0x480086(_0x3ea8f3)+_0x480086(_0x183705)+_0x480086(_0x3bf131)+_0x480086(_0x54107d))['toLowerCase']();};(function(_0x113fff){if(_0xda3a('0x7')!==typeof _0x113fff[_0xda3a('0xb')]){var _0x3a4cb2={};_0x113fff[_0xda3a('0xc')]=_0x3a4cb2;0x96>parseInt((_0x113fff['fn']['jquery'][_0xda3a('0xd')](/[^0-9]+/g,'')+'000')[_0xda3a('0x6')](0x0,0x3),0xa)&&console&&_0xda3a('0x7')==typeof console['error']&&console[_0xda3a('0xe')]();_0x113fff[_0xda3a('0xb')]=function(_0x80106){try{var _0x21bf11=_0x113fff[_0xda3a('0xf')]({},{'url':'','type':'GET','data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x80106),_0x2c9b08;_0x2c9b08=_0xda3a('0x10')===typeof _0x21bf11[_0xda3a('0x11')]?JSON[_0xda3a('0x12')](_0x21bf11[_0xda3a('0x11')]):_0x21bf11['data'][_0xda3a('0x8')]();var _0x2053cc=encodeURIComponent(_0x21bf11[_0xda3a('0x13')]+'|'+_0x21bf11['type']+'|'+_0x2c9b08);_0x3a4cb2[_0x2053cc]=_0x3a4cb2[_0x2053cc]||{};_0xda3a('0x0')==typeof _0x3a4cb2[_0x2053cc][_0xda3a('0x14')]?_0x3a4cb2[_0x2053cc][_0xda3a('0x14')]=_0x113fff[_0xda3a('0x15')](_0x21bf11):(_0x3a4cb2[_0x2053cc][_0xda3a('0x14')][_0xda3a('0x16')](_0x21bf11[_0xda3a('0x17')]),_0x3a4cb2[_0x2053cc][_0xda3a('0x14')]['fail'](_0x21bf11[_0xda3a('0xe')]),_0x3a4cb2[_0x2053cc]['jqXHR'][_0xda3a('0x18')](_0x21bf11['complete']));_0x3a4cb2[_0x2053cc][_0xda3a('0x14')][_0xda3a('0x18')](function(){isNaN(parseInt(_0x21bf11[_0xda3a('0x19')]))||setTimeout(function(){_0x3a4cb2[_0x2053cc][_0xda3a('0x14')]=void 0x0;},_0x21bf11['clearQueueDelay']);});return _0x3a4cb2[_0x2053cc][_0xda3a('0x14')];}catch(_0x30dffb){_0xda3a('0x0')!==typeof console&&_0xda3a('0x7')===typeof console[_0xda3a('0xe')]&&console[_0xda3a('0xe')](_0xda3a('0x1a')+_0x30dffb[_0xda3a('0x1b')]);}};_0x113fff['qdAjax'][_0xda3a('0x1c')]=_0xda3a('0x1d');}}(jQuery));(function(_0x171e27){var _0x59dbf2=jQuery;if(_0xda3a('0x7')!==typeof _0x59dbf2['fn']['QD_smartSkuLimiter']){_0x59dbf2['fn']['QD_smartSkuLimiter']=function(){};var _0x4f4df2=function(_0x739c8f,_0x2aac9e){if(_0xda3a('0x10')===typeof console&&'undefined'!==typeof console['error']&&'undefined'!==typeof console[_0xda3a('0x1e')]&&_0xda3a('0x0')!==typeof console[_0xda3a('0x1f')]){var _0x5121df;_0xda3a('0x10')===typeof _0x739c8f?(_0x739c8f[_0xda3a('0x20')](_0xda3a('0x21')),_0x5121df=_0x739c8f):_0x5121df=[_0xda3a('0x21')+_0x739c8f];if(_0xda3a('0x0')===typeof _0x2aac9e||'alerta'!==_0x2aac9e[_0xda3a('0x22')]()&&_0xda3a('0x23')!==_0x2aac9e['toLowerCase']())if('undefined'!==typeof _0x2aac9e&&_0xda3a('0x1e')===_0x2aac9e[_0xda3a('0x22')]())try{console[_0xda3a('0x1e')]['apply'](console,_0x5121df);}catch(_0x1946a3){try{console[_0xda3a('0x1e')](_0x5121df[_0xda3a('0x24')]('\x0a'));}catch(_0x53bb16){}}else try{console['error'][_0xda3a('0x25')](console,_0x5121df);}catch(_0x23dbdc){try{console['error'](_0x5121df[_0xda3a('0x24')]('\x0a'));}catch(_0x395831){}}else try{console[_0xda3a('0x1f')][_0xda3a('0x25')](console,_0x5121df);}catch(_0x502ac0){try{console['warn'](_0x5121df[_0xda3a('0x24')]('\x0a'));}catch(_0x10e78a){}}}},_0x3179d7={'idSku':0x0,'limitMessage':_0xda3a('0x26')},_0x1040df=function(_0x57cef1,_0x39a669){_0x57cef1['each'](function(){_0x47f0f7(_0x59dbf2(this),_0x39a669);});},_0x47f0f7=function(_0x13cfb5,_0x527a7f){try{var _0x50275e=_0x13cfb5[_0xda3a('0x11')]('qd-ssl-stock-qtt');isNaN(_0x50275e)?_0x59dbf2[_0xda3a('0xb')]({'url':_0xda3a('0x27')+_0x527a7f[_0xda3a('0x28')],'dataType':_0xda3a('0x29'),'clearQueueDelay':null,'success':function(_0x29fdc7){try{_0x13cfb5[_0xda3a('0x11')](_0xda3a('0x2a'),_0x29fdc7[0x0]['SkuSellersInformation'][0x0][_0xda3a('0x2b')]),_0x5200a1(_0x29fdc7[0x0][_0xda3a('0x2c')][0x0][_0xda3a('0x2b')],_0x13cfb5,_0x527a7f);}catch(_0x394611){_0x4f4df2('Problemas\x20ao\x20processar\x20os\x20dados\x20do\x20SKU\x20'+_0x527a7f[_0xda3a('0x28')]+_0xda3a('0x2d')+_0x394611[_0xda3a('0x1b')]);}}}):_0x5200a1(_0x50275e,_0x13cfb5,_0x527a7f);}catch(_0x173501){_0x4f4df2(_0x173501['message']);}},_0x5200a1=function(_0x30307e,_0x51dd34,_0x7b38b0){try{if(_0x51dd34[_0xda3a('0x2e')]()>_0x30307e){_0x51dd34[_0xda3a('0x2f')](_0xda3a('0x30'),_0x7b38b0[_0xda3a('0x31')][_0xda3a('0xd')](_0xda3a('0x32'),_0x30307e))['tooltip'](_0xda3a('0x33'));parseInt(_0x51dd34[_0xda3a('0x2e')]())>_0x30307e?_0x51dd34[_0xda3a('0x2e')](_0x30307e)[_0xda3a('0x34')](_0xda3a('0x35')):_0x51dd34[_0xda3a('0x2e')](_0x30307e)[_0xda3a('0x34')](_0xda3a('0x35'),[_0xda3a('0x36')]);var _0x21c208=_0x51dd34[_0xda3a('0x11')](_0xda3a('0x37'));_0x21c208&&clearTimeout(_0x21c208);_0x51dd34[_0xda3a('0x11')](_0xda3a('0x37'),setTimeout(function(){_0x51dd34[_0xda3a('0x38')](_0xda3a('0x39'));},0xbb8));}}catch(_0xe6616f){_0x4f4df2(_0xe6616f[_0xda3a('0x1b')]);}};_0x171e27=function(_0x2a32f1){var _0x25b062={'p':_0xda3a('0x3a')};return function(_0x49b345){var _0xd064c9=function(_0x200ad5){return _0x200ad5;};var _0x3c520c=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x49b345=_0x49b345['d'+_0x3c520c[0x10]+'c'+_0x3c520c[0x11]+'m'+_0xd064c9(_0x3c520c[0x1])+'n'+_0x3c520c[0xd]]['l'+_0x3c520c[0x12]+'c'+_0x3c520c[0x0]+'ti'+_0xd064c9('o')+'n'];var _0x219852=function(_0x309d25){return escape(encodeURIComponent(_0x309d25[_0xda3a('0xd')](/\./g,'¨')[_0xda3a('0xd')](/[a-zA-Z]/g,function(_0xfe5c0e){return String[_0xda3a('0x3')](('Z'>=_0xfe5c0e?0x5a:0x7a)>=(_0xfe5c0e=_0xfe5c0e[_0xda3a('0x2')](0x0)+0xd)?_0xfe5c0e:_0xfe5c0e-0x1a);})));};var _0x367820=_0x219852(_0x49b345[[_0x3c520c[0x9],_0xd064c9('o'),_0x3c520c[0xc],_0x3c520c[_0xd064c9(0xd)]][_0xda3a('0x24')]('')]);_0x219852=_0x219852((window[['js',_0xd064c9('no'),'m',_0x3c520c[0x1],_0x3c520c[0x4][_0xda3a('0x3b')](),'ite']['join']('')]||_0xda3a('0x3c'))+['.v',_0x3c520c[0xd],'e',_0xd064c9('x'),'co',_0xd064c9('mm'),_0xda3a('0x3d'),_0x3c520c[0x1],'.c',_0xd064c9('o'),'m.',_0x3c520c[0x13],'r'][_0xda3a('0x24')](''));for(var _0x36d3d8 in _0x25b062){if(_0x219852===_0x36d3d8+_0x25b062[_0x36d3d8]||_0x367820===_0x36d3d8+_0x25b062[_0x36d3d8]){var _0x171e27='tr'+_0x3c520c[0x11]+'e';break;}_0x171e27='f'+_0x3c520c[0x0]+'ls'+_0xd064c9(_0x3c520c[0x1]);}_0xd064c9=!0x1;-0x1<_0x49b345[[_0x3c520c[0xc],'e',_0x3c520c[0x0],'rc',_0x3c520c[0x9]][_0xda3a('0x24')]('')][_0xda3a('0x3e')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0xd064c9=!0x0);return[_0x171e27,_0xd064c9];}(_0x2a32f1);}(window);if(!eval(_0x171e27[0x0]))return _0x171e27[0x1]?_0x4f4df2(_0xda3a('0x3f')):!0x1;_0x59dbf2['fn'][_0xda3a('0x40')]=function(_0x653e9c){var _0x53ac90=_0x59dbf2(this);if(!_0x53ac90[_0xda3a('0x1')])return _0x53ac90;_0x653e9c=_0x59dbf2['extend']({},_0x3179d7,_0x653e9c);_0x53ac90[_0xda3a('0x41')]=new _0x1040df(_0x53ac90,_0x653e9c);return _0x53ac90;};_0x59dbf2(function(){_0x59dbf2(_0xda3a('0x42'))[_0xda3a('0x40')]();});_0x59dbf2(window)['on'](_0xda3a('0x43'),function(_0x565ec7,_0x1a58d3){try{var _0x53cac3=_0x59dbf2(_0x1a58d3);if(!(_0xda3a('0x44')!=_0x565ec7[_0xda3a('0x45')]&&0x2>(_0x53cac3[_0xda3a('0x2e')]()||0x0))){var _0x6c8f9c=_0x59dbf2['extend']({},_0x3179d7,{'idSku':_0x53cac3[_0xda3a('0x2f')](_0xda3a('0x46'))});_0x47f0f7(_0x53cac3,_0x6c8f9c);}}catch(_0x407f01){_0x4f4df2(_0x407f01[_0xda3a('0x1b')]);}});}}(this));