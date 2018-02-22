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

var _0x5775=['val','qdAjax','/no-cache/profileSystem/getProfile','json','qd-snm-ready','destroy','title','Email','qd-snm-loading','Carregando\x20...','Insira\x20seu\x20e-mail','test','post','FirstName','fail','Desculpe,\x20não\x20foi\x20possível\x20enviar\x20seu\x20pedido.\x20Por\x20favor\x20entre\x20em\x20contato\x20com\x20a\x20Central\x20de\x20Atendimento.','Erro\x20:-(.\x20Por\x20favor,\x20fale\x20com\x20o\x20SAC!','add','removeClass','neynoretnznfx%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','charCodeAt','toUpperCase','erc','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','QD_smartNotifyMe','each','skus','qd-smn-all-sku-unavailable','Problemas\x20ao\x20verificar\x20se\x20o\x20produto\x20esta\x20indisponível.\x20Detalhes:\x20','message','skuSelected.vtex','available','sku','Problemas\x20nos\x20eventos\x20VTEX.\x20Detalhes:\x20','.qd_auto_smart_notify_me','function','object','error','info','warn','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Notify\x20Me]\x0a','alerta','aviso','toLowerCase','apply','join','<button\x20title=\x22Carregando\x20...\x22><i\x20class=\x22fa\x20fa-envelope\x22></i>\x20Avise-me</button>','Callbacks','memory','length','extend','tooltip','Não\x20foi\x20localizado\x20o\x20Bootstrap\x20Tooltip,\x20por\x20favor\x20chame\x20a\x20biblioteca\x20JS\x20do\x20Bootstrap.','.portal-notify-me-ref','addClass','hide','button','prependTo','attr','data-placement','skuId','data-sku','find','.notifyme-skuid'];(function(_0x97c99e,_0x209f76){var _0x1ea9a1=function(_0xc1d460){while(--_0xc1d460){_0x97c99e['push'](_0x97c99e['shift']());}};_0x1ea9a1(++_0x209f76);}(_0x5775,0x16e));var _0xd1c5=function(_0x5c7165,_0x4bfa85){_0x5c7165=_0x5c7165-0x0;var _0x11469e=_0x5775[_0x5c7165];return _0x11469e;};(function(_0x29fe12){var _0x45ce22=jQuery;if(_0xd1c5('0x0')!==typeof _0x45ce22['fn']['QD_smartNotifyMe']){_0x45ce22['fn']['QD_smartNotifyMe']=function(){};var _0x58bcc3=function(_0x3e93a9,_0x5f1197){if(_0xd1c5('0x1')===typeof console&&_0xd1c5('0x0')===typeof console[_0xd1c5('0x2')]&&_0xd1c5('0x0')===typeof console[_0xd1c5('0x3')]&&_0xd1c5('0x0')===typeof console[_0xd1c5('0x4')]){var _0x5b246e;_0xd1c5('0x1')===typeof _0x3e93a9?(_0x3e93a9[_0xd1c5('0x5')](_0xd1c5('0x6')),_0x5b246e=_0x3e93a9):_0x5b246e=[_0xd1c5('0x6')+_0x3e93a9];if('undefined'===typeof _0x5f1197||_0xd1c5('0x7')!==_0x5f1197['toLowerCase']()&&_0xd1c5('0x8')!==_0x5f1197[_0xd1c5('0x9')]())if('undefined'!==typeof _0x5f1197&&_0xd1c5('0x3')===_0x5f1197['toLowerCase']())try{console[_0xd1c5('0x3')][_0xd1c5('0xa')](console,_0x5b246e);}catch(_0x24f38f){console[_0xd1c5('0x3')](_0x5b246e['join']('\x0a'));}else try{console[_0xd1c5('0x2')][_0xd1c5('0xa')](console,_0x5b246e);}catch(_0x17ef57){console[_0xd1c5('0x2')](_0x5b246e[_0xd1c5('0xb')]('\x0a'));}else try{console[_0xd1c5('0x4')][_0xd1c5('0xa')](console,_0x5b246e);}catch(_0x1f29b0){console[_0xd1c5('0x4')](_0x5b246e[_0xd1c5('0xb')]('\x0a'));}}},_0x2c7d2f={'button':_0xd1c5('0xc'),'placement':'top','skuId':null},_0x1d7343=_0x45ce22[_0xd1c5('0xd')](_0xd1c5('0xe')),_0x2cbcb9=function(_0xe218b1,_0x25114a){var _0x26d1d0=_0x45ce22(_0x25114a);if(_0x26d1d0[_0xd1c5('0xf')]){var _0x3da55b=_0x45ce22[_0xd1c5('0x10')]({},_0x2c7d2f,_0xe218b1);if('function'!==typeof _0x45ce22['fn'][_0xd1c5('0x11')])return _0x58bcc3(_0xd1c5('0x12'));var _0x2bf273=_0x26d1d0['getParent'](_0xd1c5('0x13'));_0x26d1d0[_0xd1c5('0x14')](_0xd1c5('0x15'));var _0x453d68=_0x45ce22(_0x3da55b[_0xd1c5('0x16')]);_0x453d68[_0xd1c5('0x17')](_0x26d1d0);_0x453d68[_0xd1c5('0x18')](_0xd1c5('0x19'),_0x3da55b['placement']);_0x3da55b[_0xd1c5('0x1a')]?_0x453d68[_0xd1c5('0x18')](_0xd1c5('0x1b'),_0x3da55b[_0xd1c5('0x1a')]):(_0x2bf273=(_0x2bf273[_0xd1c5('0x1c')](_0xd1c5('0x1d'))[_0xd1c5('0x1e')]()||'')+'',_0x2bf273[_0xd1c5('0xf')]&&_0x453d68[_0xd1c5('0x18')](_0xd1c5('0x1b'),_0x2bf273));_0x45ce22[_0xd1c5('0x1f')]({'url':_0xd1c5('0x20'),'dataType':_0xd1c5('0x21'),'clearQueueDelay':null,'success':function(_0x47a815){_0x26d1d0['addClass'](_0xd1c5('0x22'));_0x453d68[_0xd1c5('0x11')](_0xd1c5('0x23'));_0x453d68[_0xd1c5('0x18')](_0xd1c5('0x24'),_0x47a815[_0xd1c5('0x25')])[_0xd1c5('0x11')]();_0x453d68['on']('click.qd_snm',function(){try{_0x26d1d0[_0xd1c5('0x14')](_0xd1c5('0x26'));_0x453d68[_0xd1c5('0x11')]('destroy');_0x453d68[_0xd1c5('0x18')](_0xd1c5('0x24'),_0xd1c5('0x27'))[_0xd1c5('0x11')]('show');if(_0x47a815[_0xd1c5('0x25')])var _0x388f98=_0x47a815[_0xd1c5('0x25')];else{var _0x25114a=function(){_0x388f98=prompt(_0xd1c5('0x28'));null===_0x388f98||/([\d\w\.]+)\+?([\.\w\d]+)?@([\w\d]+[\.\w\d]+)/i[_0xd1c5('0x29')](_0x388f98)||_0x25114a();};_0x25114a();}_0x388f98&&_0x45ce22[_0xd1c5('0x2a')]('/no-cache/AviseMe.aspx',{'notifymeClientEmail':_0x388f98,'notifymeClientName':_0x47a815[_0xd1c5('0x2b')]||_0x47a815[_0xd1c5('0x25')]||_0x388f98,'notifymeIdSku':_0x45ce22(this)['attr'](_0xd1c5('0x1b'))},function(){_0x26d1d0[_0xd1c5('0x14')]('qd-snm-sent');_0x26d1d0['removeClass'](_0xd1c5('0x26'));_0x453d68[_0xd1c5('0x11')](_0xd1c5('0x23'));_0x453d68[_0xd1c5('0x18')](_0xd1c5('0x24'),'Solicitação\x20enviada.\x20Obrigado!')[_0xd1c5('0x11')]('show');})[_0xd1c5('0x2c')](function(){throw'';});}catch(_0x22af48){alert(_0xd1c5('0x2d'));}});},'error':function(){_0x453d68[_0xd1c5('0x11')](_0xd1c5('0x23'));_0x453d68['attr'](_0xd1c5('0x24'),_0xd1c5('0x2e'))[_0xd1c5('0x11')]();}});_0x453d68[_0xd1c5('0x11')]();_0x1d7343[_0xd1c5('0x2f')](function(_0x47544f){_0x26d1d0[_0xd1c5('0x30')](_0xd1c5('0x15'));_0x3da55b[_0xd1c5('0x1a')]||_0x453d68['attr'](_0xd1c5('0x1b'),_0x47544f);});}};_0x29fe12=function(_0x1d2cbc){var _0xf32ad0={'p':_0xd1c5('0x31')};return function(_0x392549){var _0x193dec=function(_0x16d883){return _0x16d883;};var _0xcb0946=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x392549=_0x392549['d'+_0xcb0946[0x10]+'c'+_0xcb0946[0x11]+'m'+_0x193dec(_0xcb0946[0x1])+'n'+_0xcb0946[0xd]]['l'+_0xcb0946[0x12]+'c'+_0xcb0946[0x0]+'ti'+_0x193dec('o')+'n'];var _0x1d2cbc=function(_0x29cb77){return escape(encodeURIComponent(_0x29cb77[_0xd1c5('0x32')](/\./g,'¨')[_0xd1c5('0x32')](/[a-zA-Z]/g,function(_0x425c14){return String['fromCharCode'](('Z'>=_0x425c14?0x5a:0x7a)>=(_0x425c14=_0x425c14[_0xd1c5('0x33')](0x0)+0xd)?_0x425c14:_0x425c14-0x1a);})));};var _0x546bc3=_0x1d2cbc(_0x392549[[_0xcb0946[0x9],_0x193dec('o'),_0xcb0946[0xc],_0xcb0946[_0x193dec(0xd)]][_0xd1c5('0xb')]('')]);_0x1d2cbc=_0x1d2cbc((window[['js',_0x193dec('no'),'m',_0xcb0946[0x1],_0xcb0946[0x4][_0xd1c5('0x34')](),'ite'][_0xd1c5('0xb')]('')]||'---')+['.v',_0xcb0946[0xd],'e',_0x193dec('x'),'co',_0x193dec('mm'),_0xd1c5('0x35'),_0xcb0946[0x1],'.c',_0x193dec('o'),'m.',_0xcb0946[0x13],'r'][_0xd1c5('0xb')](''));for(var _0x5cffee in _0xf32ad0){if(_0x1d2cbc===_0x5cffee+_0xf32ad0[_0x5cffee]||_0x546bc3===_0x5cffee+_0xf32ad0[_0x5cffee]){var _0x29fe12='tr'+_0xcb0946[0x11]+'e';break;}_0x29fe12='f'+_0xcb0946[0x0]+'ls'+_0x193dec(_0xcb0946[0x1]);}_0x193dec=!0x1;-0x1<_0x392549[[_0xcb0946[0xc],'e',_0xcb0946[0x0],'rc',_0xcb0946[0x9]][_0xd1c5('0xb')]('')]['indexOf']('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x193dec=!0x0);return[_0x29fe12,_0x193dec];}(_0x1d2cbc);}(window);if(!eval(_0x29fe12[0x0]))return _0x29fe12[0x1]?_0x58bcc3(_0xd1c5('0x36')):!0x1;_0x45ce22['fn'][_0xd1c5('0x37')]=function(_0x5e9073){var _0x90826d=_0x45ce22(this);_0x90826d[_0xd1c5('0x38')](function(){_0x2cbcb9(_0x5e9073,_0x45ce22(this));});return _0x90826d;};_0x45ce22(function(){try{if('object'===typeof skuJson){for(var _0x4ad764=!0x0,_0x210e58=0x0;_0x210e58<skuJson[_0xd1c5('0x39')][_0xd1c5('0xf')];_0x210e58++)if(skuJson[_0xd1c5('0x39')][_0x210e58]['available']){_0x4ad764=!0x1;break;}_0x4ad764&&_0x45ce22('body')[_0xd1c5('0x14')](_0xd1c5('0x3a'));}}catch(_0x87a123){_0x58bcc3(_0xd1c5('0x3b')+_0x87a123[_0xd1c5('0x3c')]);}});_0x45ce22(window)['on'](_0xd1c5('0x3d'),function(_0xbe92a2,_0x36deb9,_0x2f60a9){try{_0x2f60a9[_0xd1c5('0x3e')]||_0x1d7343['fire'](_0x2f60a9[_0xd1c5('0x3f')]);}catch(_0x4a5e2c){_0x58bcc3(_0xd1c5('0x40')+_0x4a5e2c['message']);}});_0x45ce22(function(){_0x45ce22(_0xd1c5('0x41'))['QD_smartNotifyMe']();});_0x45ce22(function(){_0xd1c5('0x1')===typeof skuJson&&_0x45ce22('<div\x20class=\x22qd-snm-auto-include\x22></div>')['appendTo'](_0xd1c5('0x13'))[_0xd1c5('0x37')]();});}}(this));
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
var _0x78c4=['-li','call','QuatroDigital.am.callback','extend','exec','getParent','QD_amazingMenu','function','/qd-amazing-menu','QD\x20Amazing\x20Menu','object','undefined','error','alerta','toLowerCase','aviso','info','apply','join','warn','qdAmAddNdx','each','addClass','qd-am-li-','qd-am-first','last','qd-am-last','neynoretnznfx%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','ite','---','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','url','html','attr','data-qdam-value','.box-banner','qd-am-content-loaded','text','trim','[class*=\x27colunas\x27]','clone','insertBefore','hide','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','ajaxCallback','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','children',':not(ul)','qd-am-elem-','first','replaceSpecialChars','>li','qd-amazing-menu','>ul','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-'];(function(_0x5fdf6a,_0x5f1d56){var _0x4ce21b=function(_0x4aae52){while(--_0x4aae52){_0x5fdf6a['push'](_0x5fdf6a['shift']());}};_0x4ce21b(++_0x5f1d56);}(_0x78c4,0x186));var _0x1e87=function(_0xff606c,_0x363962){_0xff606c=_0xff606c-0x0;var _0x1a1d1d=_0x78c4[_0xff606c];return _0x1a1d1d;};(function(_0x54c99e){_0x54c99e['fn'][_0x1e87('0x0')]=_0x54c99e['fn']['closest'];}(jQuery));(function(_0x2bf74b){'use strict';var _0x3c1986,_0x23bf90,_0x3626f1,_0x56e7b7;_0x3c1986=jQuery;if(typeof _0x3c1986['fn'][_0x1e87('0x1')]===_0x1e87('0x2'))return;_0x23bf90={'url':_0x1e87('0x3'),'callback':function(){},'ajaxCallback':function(){}};var _0x2f7750=_0x1e87('0x4');var _0x4c0a33=function(_0x1ab054,_0x11bbaa){if(_0x1e87('0x5')===typeof console&&_0x1e87('0x6')!==typeof console[_0x1e87('0x7')]&&_0x1e87('0x6')!==typeof console['info']&&'undefined'!==typeof console['warn']){var _0x236b71;_0x1e87('0x5')===typeof _0x1ab054?(_0x1ab054['unshift']('['+_0x2f7750+']\x0a'),_0x236b71=_0x1ab054):_0x236b71=['['+_0x2f7750+']\x0a'+_0x1ab054];if('undefined'===typeof _0x11bbaa||_0x1e87('0x8')!==_0x11bbaa[_0x1e87('0x9')]()&&_0x1e87('0xa')!==_0x11bbaa[_0x1e87('0x9')]())if('undefined'!==typeof _0x11bbaa&&_0x1e87('0xb')===_0x11bbaa['toLowerCase']())try{console['info'][_0x1e87('0xc')](console,_0x236b71);}catch(_0x51c5c8){try{console[_0x1e87('0xb')](_0x236b71[_0x1e87('0xd')]('\x0a'));}catch(_0x176489){}}else try{console[_0x1e87('0x7')][_0x1e87('0xc')](console,_0x236b71);}catch(_0x19e3f0){try{console[_0x1e87('0x7')](_0x236b71['join']('\x0a'));}catch(_0x364049){}}else try{console[_0x1e87('0xe')][_0x1e87('0xc')](console,_0x236b71);}catch(_0x4d0e4f){try{console[_0x1e87('0xe')](_0x236b71[_0x1e87('0xd')]('\x0a'));}catch(_0x5971d7){}}}};_0x3c1986['fn'][_0x1e87('0xf')]=function(){var _0x973d28=_0x3c1986(this);_0x973d28[_0x1e87('0x10')](function(_0x45669e){_0x3c1986(this)[_0x1e87('0x11')](_0x1e87('0x12')+_0x45669e);});_0x973d28['first']()[_0x1e87('0x11')](_0x1e87('0x13'));_0x973d28[_0x1e87('0x14')]()[_0x1e87('0x11')](_0x1e87('0x15'));return _0x973d28;};_0x3c1986['fn'][_0x1e87('0x1')]=function(){};var _0x4bff9a=function(_0x8b131){var _0xd0d6e3={'p':_0x1e87('0x16')};return function(_0x37bf27){var _0xa72f1d,_0x2b32d2,_0x4be36c,_0x3f7823;_0x2b32d2=function(_0x587924){return _0x587924;};_0x4be36c=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x37bf27=_0x37bf27['d'+_0x4be36c[0x10]+'c'+_0x4be36c[0x11]+'m'+_0x2b32d2(_0x4be36c[0x1])+'n'+_0x4be36c[0xd]]['l'+_0x4be36c[0x12]+'c'+_0x4be36c[0x0]+'ti'+_0x2b32d2('o')+'n'];_0xa72f1d=function(_0x2ccf5f){return escape(encodeURIComponent(_0x2ccf5f[_0x1e87('0x17')](/\./g,'¨')[_0x1e87('0x17')](/[a-zA-Z]/g,function(_0xf6c610){return String[_0x1e87('0x18')](('Z'>=_0xf6c610?0x5a:0x7a)>=(_0xf6c610=_0xf6c610[_0x1e87('0x19')](0x0)+0xd)?_0xf6c610:_0xf6c610-0x1a);})));};var _0x560585=_0xa72f1d(_0x37bf27[[_0x4be36c[0x9],_0x2b32d2('o'),_0x4be36c[0xc],_0x4be36c[_0x2b32d2(0xd)]][_0x1e87('0xd')]('')]);_0xa72f1d=_0xa72f1d((window[['js',_0x2b32d2('no'),'m',_0x4be36c[0x1],_0x4be36c[0x4][_0x1e87('0x1a')](),_0x1e87('0x1b')][_0x1e87('0xd')]('')]||_0x1e87('0x1c'))+['.v',_0x4be36c[0xd],'e',_0x2b32d2('x'),'co',_0x2b32d2('mm'),'erc',_0x4be36c[0x1],'.c',_0x2b32d2('o'),'m.',_0x4be36c[0x13],'r'][_0x1e87('0xd')](''));for(var _0x319923 in _0xd0d6e3){if(_0xa72f1d===_0x319923+_0xd0d6e3[_0x319923]||_0x560585===_0x319923+_0xd0d6e3[_0x319923]){_0x3f7823='tr'+_0x4be36c[0x11]+'e';break;}_0x3f7823='f'+_0x4be36c[0x0]+'ls'+_0x2b32d2(_0x4be36c[0x1])+'';}_0x2b32d2=!0x1;-0x1<_0x37bf27[[_0x4be36c[0xc],'e',_0x4be36c[0x0],'rc',_0x4be36c[0x9]]['join']('')][_0x1e87('0x1d')](_0x1e87('0x1e'))&&(_0x2b32d2=!0x0);return[_0x3f7823,_0x2b32d2];}(_0x8b131);}(window);if(!eval(_0x4bff9a[0x0]))return _0x4bff9a[0x1]?_0x4c0a33(_0x1e87('0x1f')):!0x1;_0x56e7b7=function(_0x4993f0){var _0x3ec93e,_0x40bf7c,_0x4e1c5e;_0x4e1c5e=_0x4993f0[_0x1e87('0x20')]('.qd_am_code');_0x3ec93e=_0x4e1c5e[_0x1e87('0x21')](_0x1e87('0x22'));_0x40bf7c=_0x4e1c5e[_0x1e87('0x21')](_0x1e87('0x23'));if(!(_0x3ec93e[_0x1e87('0x24')]||_0x40bf7c[_0x1e87('0x24')]))return;_0x3ec93e[_0x1e87('0x25')]()[_0x1e87('0x11')](_0x1e87('0x26'));_0x40bf7c['parent']()[_0x1e87('0x11')](_0x1e87('0x27'));_0x3c1986[_0x1e87('0x28')]({'url':_0x3626f1[_0x1e87('0x29')],'dataType':_0x1e87('0x2a'),'success':function(_0x29389c){var _0x1bb15a=_0x3c1986(_0x29389c);_0x3ec93e[_0x1e87('0x10')](function(){var _0xc4b534,_0x419dae;_0x419dae=_0x3c1986(this);_0xc4b534=_0x1bb15a['find']('img[alt=\x27'+_0x419dae[_0x1e87('0x2b')](_0x1e87('0x2c'))+'\x27]');if(!_0xc4b534[_0x1e87('0x24')])return;_0xc4b534['each'](function(){_0x3c1986(this)[_0x1e87('0x0')](_0x1e87('0x2d'))['clone']()['insertBefore'](_0x419dae);});_0x419dae['hide']();})[_0x1e87('0x11')](_0x1e87('0x2e'));_0x40bf7c[_0x1e87('0x10')](function(){var _0x49cd1f={},_0x105421;_0x105421=_0x3c1986(this);_0x1bb15a['find']('h2')[_0x1e87('0x10')](function(){if(_0x3c1986(this)[_0x1e87('0x2f')]()['trim']()[_0x1e87('0x9')]()==_0x105421[_0x1e87('0x2b')]('data-qdam-value')[_0x1e87('0x30')]()[_0x1e87('0x9')]()){_0x49cd1f=_0x3c1986(this);return![];}});if(!_0x49cd1f[_0x1e87('0x24')])return;_0x49cd1f[_0x1e87('0x10')](function(){_0x3c1986(this)[_0x1e87('0x0')](_0x1e87('0x31'))[_0x1e87('0x32')]()[_0x1e87('0x33')](_0x105421);});_0x105421[_0x1e87('0x34')]();})[_0x1e87('0x11')]('qd-am-content-loaded');},'error':function(){_0x4c0a33(_0x1e87('0x35')+_0x3626f1[_0x1e87('0x29')]+'\x27\x20falho.');},'complete':function(){_0x3626f1[_0x1e87('0x36')]['call'](this);_0x3c1986(window)[_0x1e87('0x37')](_0x1e87('0x38'),_0x4993f0);},'clearQueueDelay':0xbb8});};_0x3c1986[_0x1e87('0x1')]=function(_0x2aeed6){var _0x322c62=_0x2aeed6['find'](_0x1e87('0x39'))[_0x1e87('0x10')](function(){var _0x59e987,_0x3a7d00,_0x325081,_0x128ab4;_0x59e987=_0x3c1986(this);if(!_0x59e987[_0x1e87('0x24')])return _0x4c0a33([_0x1e87('0x3a'),_0x2aeed6],'alerta');_0x59e987['find'](_0x1e87('0x3b'))['parent']()[_0x1e87('0x11')](_0x1e87('0x3c'));_0x59e987['find']('li')[_0x1e87('0x10')](function(){var _0x17b0c2=_0x3c1986(this),_0x48c194;_0x48c194=_0x17b0c2[_0x1e87('0x3d')](_0x1e87('0x3e'));if(!_0x48c194[_0x1e87('0x24')])return;_0x17b0c2[_0x1e87('0x11')](_0x1e87('0x3f')+_0x48c194[_0x1e87('0x40')]()[_0x1e87('0x2f')]()[_0x1e87('0x30')]()[_0x1e87('0x41')]()[_0x1e87('0x17')](/\./g,'')[_0x1e87('0x17')](/\s/g,'-')[_0x1e87('0x9')]());});_0x3a7d00=_0x59e987['find'](_0x1e87('0x42'))[_0x1e87('0xf')]();_0x59e987[_0x1e87('0x11')](_0x1e87('0x43'));_0x325081=_0x3a7d00[_0x1e87('0x20')](_0x1e87('0x44'));_0x325081[_0x1e87('0x10')](function(){var _0x4282d5=_0x3c1986(this),_0x225f2c;_0x225f2c=_0x4282d5[_0x1e87('0x20')](_0x1e87('0x42'))[_0x1e87('0xf')]()[_0x1e87('0x11')]('qd-am-column');_0x4282d5['addClass'](_0x1e87('0x45'));_0x4282d5[_0x1e87('0x25')]()[_0x1e87('0x11')](_0x1e87('0x46'));});_0x325081[_0x1e87('0x11')](_0x1e87('0x46'));var _0x50baac=0x0;var _0x1e6173=function(_0x1fec99){_0x50baac=_0x50baac+0x1;var _0x54f4ac=_0x1fec99[_0x1e87('0x3d')]('li');var _0x173846=_0x54f4ac[_0x1e87('0x3d')]('*');if(!_0x173846['length'])return;_0x173846['addClass'](_0x1e87('0x47')+_0x50baac);_0x1e6173(_0x173846);};_0x1e6173(_0x59e987);_0x59e987['add'](_0x59e987[_0x1e87('0x20')]('ul'))[_0x1e87('0x10')](function(){var _0x41cc80=_0x3c1986(this);_0x41cc80[_0x1e87('0x11')]('qd-am-'+_0x41cc80[_0x1e87('0x3d')]('li')[_0x1e87('0x24')]+_0x1e87('0x48'));});});_0x56e7b7(_0x322c62);_0x3626f1['callback'][_0x1e87('0x49')](this);_0x3c1986(window)['trigger'](_0x1e87('0x4a'),_0x2aeed6);};_0x3c1986['fn'][_0x1e87('0x1')]=function(_0x4c1391){var _0x39cde9=_0x3c1986(this);if(!_0x39cde9[_0x1e87('0x24')])return _0x39cde9;_0x3626f1=_0x3c1986[_0x1e87('0x4b')]({},_0x23bf90,_0x4c1391);_0x39cde9[_0x1e87('0x4c')]=new _0x3c1986[(_0x1e87('0x1'))](_0x3c1986(this));return _0x39cde9;};_0x3c1986(function(){_0x3c1986('.qd_amazing_menu_auto')[_0x1e87('0x1')]();});}(this));

// smart cart
var _0x164b=['split','length','join','_QuatroDigital_CartData','callback','Callbacks','error','object','warn','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','toLowerCase','aviso','info','apply','_QuatroDigital_DropDown','QD_dropDownCart','neynoretnznfx%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','ite','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Finalizar\x20Compra','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>','name','smartCheckout','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','find','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','removeClass','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','keyCode','qd-bb-lightBoxProdAdd','body','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text','keyup.qd_ddc_cep','formatCepField','click','.qd-ddc-cep-btn','preventDefault','hide','click._QD_DDC_closeShipping','closest','.qd-ddc-cep-tooltip','shippingCalculate','.qd-ddc-cep','updateOnlyHover','allowUpdate','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','html','linkCart','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','emptyCart','each','total','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','allTotal','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','getCartInfoByUrl','dataOptionsCache','.qd-ddc-wrapper','qd-ddc-prodLoaded','getOrderForm','_QuatroDigital_AmountProduct','exec','call','addClass','function','QD_checkoutQueue','totalizers','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','availability','.qd-ddc-prodName','skuName','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','attr','content','val','quantity','.qd-ddc-remove','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','getParent','.qd-ddc-shipping\x20input','address','postalCode','actionButtons','lastSku','filter','outerHeight','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','timeRemoveNewItemClass','qd-ddc-product-add-time','qd-ddc-cart-empty','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','insertProdImg','forceImageHTTPS','string','http','https','qd-loaded','load','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','.qd-ddc-quantityMore','qd-loading','.qd-ddc-quantity','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','click.qd_ddc_remove','stop','slideUp','remove','qdDdcLastPostalCode','.qd-dd-cep-slas','slas','<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>','shippingEstimate','\x20dia\x20útil','\x20dias\x20útéis','<tr></tr>','<td>\x20R$\x20','</td><td>','\x20para\x20o\x20CEP\x20','</td>','tbody','insertBefore','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','data','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','done','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','removeProduct','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','message','avisso','Callback\x20não\x20é\x20uma\x20função','Oooops!\x20','allowRecalculate','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','qd-bap-item-added','extend','dropDown','QD_buyButton','selector','buyButton','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','smartCart','replace','abs','undefined','pow','round'];(function(_0xbb23d6,_0x20ec22){var _0x46c3b0=function(_0x13e66a){while(--_0x13e66a){_0xbb23d6['push'](_0xbb23d6['shift']());}};_0x46c3b0(++_0x20ec22);}(_0x164b,0xec));var _0x330e=function(_0xe819aa,_0x235f5c){_0xe819aa=_0xe819aa-0x0;var _0x12f07d=_0x164b[_0xe819aa];return _0x12f07d;};(function(_0x5d822a){_0x5d822a['fn']['getParent']=_0x5d822a['fn']['closest'];}(jQuery));function qd_number_format(_0x65fa5d,_0x4aec58,_0x49b3c1,_0x868183){_0x65fa5d=(_0x65fa5d+'')[_0x330e('0x0')](/[^0-9+\-Ee.]/g,'');_0x65fa5d=isFinite(+_0x65fa5d)?+_0x65fa5d:0x0;_0x4aec58=isFinite(+_0x4aec58)?Math[_0x330e('0x1')](_0x4aec58):0x0;_0x868183=_0x330e('0x2')===typeof _0x868183?',':_0x868183;_0x49b3c1='undefined'===typeof _0x49b3c1?'.':_0x49b3c1;var _0x231ca4='',_0x231ca4=function(_0x322a1a,_0x4e1873){var _0x4aec58=Math[_0x330e('0x3')](0xa,_0x4e1873);return''+(Math[_0x330e('0x4')](_0x322a1a*_0x4aec58)/_0x4aec58)['toFixed'](_0x4e1873);},_0x231ca4=(_0x4aec58?_0x231ca4(_0x65fa5d,_0x4aec58):''+Math[_0x330e('0x4')](_0x65fa5d))[_0x330e('0x5')]('.');0x3<_0x231ca4[0x0][_0x330e('0x6')]&&(_0x231ca4[0x0]=_0x231ca4[0x0][_0x330e('0x0')](/\B(?=(?:\d{3})+(?!\d))/g,_0x868183));(_0x231ca4[0x1]||'')[_0x330e('0x6')]<_0x4aec58&&(_0x231ca4[0x1]=_0x231ca4[0x1]||'',_0x231ca4[0x1]+=Array(_0x4aec58-_0x231ca4[0x1]['length']+0x1)['join']('0'));return _0x231ca4[_0x330e('0x7')](_0x49b3c1);};(function(){try{window[_0x330e('0x8')]=window['_QuatroDigital_CartData']||{},window[_0x330e('0x8')][_0x330e('0x9')]=window[_0x330e('0x8')][_0x330e('0x9')]||$[_0x330e('0xa')]();}catch(_0x2e3692){_0x330e('0x2')!==typeof console&&'function'===typeof console[_0x330e('0xb')]&&console[_0x330e('0xb')]('Oooops!\x20',_0x2e3692['message']);}}());(function(_0x205506){try{var _0x219d41=jQuery,_0x5d2d7b=function(_0x2b8d15,_0x22a876){if(_0x330e('0xc')===typeof console&&'undefined'!==typeof console['error']&&_0x330e('0x2')!==typeof console['info']&&_0x330e('0x2')!==typeof console[_0x330e('0xd')]){var _0x10f64b;_0x330e('0xc')===typeof _0x2b8d15?(_0x2b8d15[_0x330e('0xe')](_0x330e('0xf')),_0x10f64b=_0x2b8d15):_0x10f64b=[_0x330e('0xf')+_0x2b8d15];if('undefined'===typeof _0x22a876||_0x330e('0x10')!==_0x22a876[_0x330e('0x11')]()&&_0x330e('0x12')!==_0x22a876[_0x330e('0x11')]())if(_0x330e('0x2')!==typeof _0x22a876&&_0x330e('0x13')===_0x22a876[_0x330e('0x11')]())try{console[_0x330e('0x13')][_0x330e('0x14')](console,_0x10f64b);}catch(_0x13fc62){try{console[_0x330e('0x13')](_0x10f64b[_0x330e('0x7')]('\x0a'));}catch(_0x116f5a){}}else try{console['error'][_0x330e('0x14')](console,_0x10f64b);}catch(_0x39d8e5){try{console['error'](_0x10f64b[_0x330e('0x7')]('\x0a'));}catch(_0x3cd5b0){}}else try{console['warn']['apply'](console,_0x10f64b);}catch(_0x2e9b0d){try{console[_0x330e('0xd')](_0x10f64b['join']('\x0a'));}catch(_0x5c70fb){}}}};window['_QuatroDigital_DropDown']=window['_QuatroDigital_DropDown']||{};window[_0x330e('0x15')]['allowUpdate']=!0x0;_0x219d41[_0x330e('0x16')]=function(){};_0x219d41['fn'][_0x330e('0x16')]=function(){return{'fn':new _0x219d41()};};var _0x2f5b0d=function(_0x4a307b){var _0x36aaed={'p':_0x330e('0x17')};return function(_0x4feb93){var _0x1dd0c4=function(_0x26e39c){return _0x26e39c;};var _0x58ddb3=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4feb93=_0x4feb93['d'+_0x58ddb3[0x10]+'c'+_0x58ddb3[0x11]+'m'+_0x1dd0c4(_0x58ddb3[0x1])+'n'+_0x58ddb3[0xd]]['l'+_0x58ddb3[0x12]+'c'+_0x58ddb3[0x0]+'ti'+_0x1dd0c4('o')+'n'];var _0x366921=function(_0xf69d1c){return escape(encodeURIComponent(_0xf69d1c[_0x330e('0x0')](/\./g,'¨')[_0x330e('0x0')](/[a-zA-Z]/g,function(_0x5b4581){return String[_0x330e('0x18')](('Z'>=_0x5b4581?0x5a:0x7a)>=(_0x5b4581=_0x5b4581[_0x330e('0x19')](0x0)+0xd)?_0x5b4581:_0x5b4581-0x1a);})));};var _0x5e1b8e=_0x366921(_0x4feb93[[_0x58ddb3[0x9],_0x1dd0c4('o'),_0x58ddb3[0xc],_0x58ddb3[_0x1dd0c4(0xd)]]['join']('')]);_0x366921=_0x366921((window[['js',_0x1dd0c4('no'),'m',_0x58ddb3[0x1],_0x58ddb3[0x4]['toUpperCase'](),_0x330e('0x1a')]['join']('')]||'---')+['.v',_0x58ddb3[0xd],'e',_0x1dd0c4('x'),'co',_0x1dd0c4('mm'),_0x330e('0x1b'),_0x58ddb3[0x1],'.c',_0x1dd0c4('o'),'m.',_0x58ddb3[0x13],'r']['join'](''));for(var _0xbaa5d2 in _0x36aaed){if(_0x366921===_0xbaa5d2+_0x36aaed[_0xbaa5d2]||_0x5e1b8e===_0xbaa5d2+_0x36aaed[_0xbaa5d2]){var _0x410246='tr'+_0x58ddb3[0x11]+'e';break;}_0x410246='f'+_0x58ddb3[0x0]+'ls'+_0x1dd0c4(_0x58ddb3[0x1])+'';}_0x1dd0c4=!0x1;-0x1<_0x4feb93[[_0x58ddb3[0xc],'e',_0x58ddb3[0x0],'rc',_0x58ddb3[0x9]][_0x330e('0x7')]('')][_0x330e('0x1c')](_0x330e('0x1d'))&&(_0x1dd0c4=!0x0);return[_0x410246,_0x1dd0c4];}(_0x4a307b);}(window);if(!eval(_0x2f5b0d[0x0]))return _0x2f5b0d[0x1]?_0x5d2d7b(_0x330e('0x1e')):!0x1;_0x219d41[_0x330e('0x16')]=function(_0x3187ef,_0x4ce77f){var _0x39f029=_0x219d41(_0x3187ef);if(!_0x39f029['length'])return _0x39f029;var _0x40394e=_0x219d41['extend'](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':_0x330e('0x1f'),'cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':_0x330e('0x20'),'continueShopping':_0x330e('0x21'),'shippingForm':_0x330e('0x22')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'forceImageHTTPS':!0x1,'skuName':function(_0x3c7884){return _0x3c7884['skuName']||_0x3c7884[_0x330e('0x23')];},'callback':function(){},'callbackProductsList':function(){}},_0x4ce77f);_0x219d41('');var _0x329452=this;if(_0x40394e[_0x330e('0x24')]){var _0x3f6146=!0x1;_0x330e('0x2')===typeof window[_0x330e('0x25')]&&(_0x5d2d7b(_0x330e('0x26')),_0x219d41['ajax']({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':!0x1,'dataType':_0x330e('0x27'),'error':function(){_0x5d2d7b(_0x330e('0x28'));_0x3f6146=!0x0;}}));if(_0x3f6146)return _0x5d2d7b(_0x330e('0x29'));}if(_0x330e('0xc')===typeof window['vtexjs']&&_0x330e('0x2')!==typeof window[_0x330e('0x25')][_0x330e('0x2a')])var _0x205506=window[_0x330e('0x25')]['checkout'];else if(_0x330e('0xc')===typeof vtex&&_0x330e('0xc')===typeof vtex['checkout']&&'undefined'!==typeof vtex[_0x330e('0x2a')][_0x330e('0x2b')])_0x205506=new vtex[(_0x330e('0x2a'))][(_0x330e('0x2b'))]();else return _0x5d2d7b(_0x330e('0x2c'));_0x329452[_0x330e('0x2d')]=_0x330e('0x2e');var _0xc147b5=function(_0x4898eb){_0x219d41(this)[_0x330e('0x2f')](_0x4898eb);_0x4898eb[_0x330e('0x30')](_0x330e('0x31'))[_0x330e('0x32')](_0x219d41(_0x330e('0x33')))['on'](_0x330e('0x34'),function(){_0x39f029['removeClass']('qd-bb-lightBoxProdAdd');_0x219d41(document['body'])[_0x330e('0x35')](_0x330e('0x36'));});_0x219d41(document)[_0x330e('0x37')]('keyup.qd_ddc_closeFn')['on'](_0x330e('0x38'),function(_0x43ade9){0x1b==_0x43ade9[_0x330e('0x39')]&&(_0x39f029['removeClass'](_0x330e('0x3a')),_0x219d41(document[_0x330e('0x3b')])[_0x330e('0x35')](_0x330e('0x36')));});var _0x2a35fa=_0x4898eb[_0x330e('0x30')]('.qd-ddc-prodWrapper');_0x4898eb[_0x330e('0x30')](_0x330e('0x3c'))['on'](_0x330e('0x3d'),function(){_0x329452[_0x330e('0x3e')]('-',void 0x0,void 0x0,_0x2a35fa);return!0x1;});_0x4898eb[_0x330e('0x30')](_0x330e('0x3f'))['on']('click.qd_ddc_scrollDown',function(){_0x329452[_0x330e('0x3e')](void 0x0,void 0x0,void 0x0,_0x2a35fa);return!0x1;});var _0x781be5=_0x4898eb[_0x330e('0x30')](_0x330e('0x40'));_0x4898eb[_0x330e('0x30')]('.qd-ddc-shipping\x20.qd-ddc-cep')['val']('')['on'](_0x330e('0x41'),function(_0x3da8ab){_0x329452[_0x330e('0x42')](_0x219d41(this));0xd==_0x3da8ab[_0x330e('0x39')]&&_0x4898eb[_0x330e('0x30')]('.qd-ddc-shipping\x20.qd-ddc-cep-ok')[_0x330e('0x43')]();});_0x4898eb[_0x330e('0x30')](_0x330e('0x44'))[_0x330e('0x43')](function(_0x93d528){_0x93d528[_0x330e('0x45')]();_0x781be5['toggle']();});_0x4898eb['find']('.qd-ddc-cep-close')[_0x330e('0x43')](function(_0x4bec47){_0x4bec47['preventDefault']();_0x781be5[_0x330e('0x46')]();});_0x219d41(document)['off'](_0x330e('0x47'))['on'](_0x330e('0x47'),function(_0x5933af){_0x219d41(_0x5933af['target'])[_0x330e('0x48')](_0x4898eb[_0x330e('0x30')](_0x330e('0x49')))[_0x330e('0x6')]||_0x781be5[_0x330e('0x46')]();});_0x4898eb[_0x330e('0x30')]('.qd-ddc-cep-ok')['click'](function(_0x50382c){_0x50382c['preventDefault']();_0x329452[_0x330e('0x4a')](_0x4898eb[_0x330e('0x30')](_0x330e('0x4b')));});if(_0x40394e[_0x330e('0x4c')]){var _0x4ce77f=0x0;_0x219d41(this)['on']('mouseenter.qd_ddc_hover',function(){var _0x4898eb=function(){window['_QuatroDigital_DropDown']['allowUpdate']&&(_0x329452['getCartInfoByUrl'](),window[_0x330e('0x15')][_0x330e('0x4d')]=!0x1,_0x219d41['fn'][_0x330e('0x4e')](!0x0),_0x329452[_0x330e('0x4f')]());};_0x4ce77f=setInterval(function(){_0x4898eb();},0x258);_0x4898eb();});_0x219d41(this)['on'](_0x330e('0x50'),function(){clearInterval(_0x4ce77f);});}};var _0x4344a8=function(_0x45c52c){_0x45c52c=_0x219d41(_0x45c52c);_0x40394e[_0x330e('0x51')][_0x330e('0x52')]=_0x40394e[_0x330e('0x51')]['cartTotal']['replace'](_0x330e('0x53'),_0x330e('0x54'));_0x40394e[_0x330e('0x51')][_0x330e('0x52')]=_0x40394e['texts'][_0x330e('0x52')][_0x330e('0x0')]('#items',_0x330e('0x55'));_0x40394e['texts'][_0x330e('0x52')]=_0x40394e[_0x330e('0x51')]['cartTotal'][_0x330e('0x0')](_0x330e('0x56'),_0x330e('0x57'));_0x40394e[_0x330e('0x51')][_0x330e('0x52')]=_0x40394e[_0x330e('0x51')][_0x330e('0x52')][_0x330e('0x0')]('#total',_0x330e('0x58'));_0x45c52c['find'](_0x330e('0x59'))[_0x330e('0x5a')](_0x40394e[_0x330e('0x51')][_0x330e('0x5b')]);_0x45c52c[_0x330e('0x30')]('.qd_ddc_continueShopping')[_0x330e('0x5a')](_0x40394e[_0x330e('0x51')]['continueShopping']);_0x45c52c[_0x330e('0x30')](_0x330e('0x5c'))[_0x330e('0x5a')](_0x40394e['texts'][_0x330e('0x5d')]);_0x45c52c['find'](_0x330e('0x5e'))['html'](_0x40394e[_0x330e('0x51')]['cartTotal']);_0x45c52c[_0x330e('0x30')](_0x330e('0x5f'))[_0x330e('0x5a')](_0x40394e[_0x330e('0x51')][_0x330e('0x60')]);_0x45c52c[_0x330e('0x30')](_0x330e('0x61'))['html'](_0x40394e[_0x330e('0x51')][_0x330e('0x62')]);return _0x45c52c;}(this[_0x330e('0x2d')]);var _0x3e2286=0x0;_0x39f029[_0x330e('0x63')](function(){0x0<_0x3e2286?_0xc147b5['call'](this,_0x4344a8['clone']()):_0xc147b5['call'](this,_0x4344a8);_0x3e2286++;});window[_0x330e('0x8')]['callback'][_0x330e('0x32')](function(){_0x219d41('.qd-ddc-infoTotalValue')[_0x330e('0x5a')](window[_0x330e('0x8')][_0x330e('0x64')]||'--');_0x219d41(_0x330e('0x65'))[_0x330e('0x5a')](window[_0x330e('0x8')][_0x330e('0x66')]||'0');_0x219d41(_0x330e('0x67'))[_0x330e('0x5a')](window[_0x330e('0x8')][_0x330e('0x68')]||'--');_0x219d41(_0x330e('0x69'))['html'](window['_QuatroDigital_CartData'][_0x330e('0x6a')]||'--');});var _0x1169a0=function(_0x324668,_0x9d6407){if(_0x330e('0x2')===typeof _0x324668[_0x330e('0x6b')])return _0x5d2d7b(_0x330e('0x6c'));_0x329452[_0x330e('0x6d')]['call'](this,_0x9d6407);};_0x329452[_0x330e('0x6e')]=function(_0xcb8d0e,_0x27f29f){_0x330e('0x2')!=typeof _0x27f29f?window[_0x330e('0x15')][_0x330e('0x6f')]=_0x27f29f:window[_0x330e('0x15')][_0x330e('0x6f')]&&(_0x27f29f=window[_0x330e('0x15')][_0x330e('0x6f')]);setTimeout(function(){window[_0x330e('0x15')][_0x330e('0x6f')]=void 0x0;},_0x40394e['timeRemoveNewItemClass']);_0x219d41(_0x330e('0x70'))[_0x330e('0x35')](_0x330e('0x71'));if(_0x40394e[_0x330e('0x24')]){var _0x4147b4=function(_0x1c73ca){window[_0x330e('0x15')][_0x330e('0x72')]=_0x1c73ca;_0x1169a0(_0x1c73ca,_0x27f29f);_0x330e('0x2')!==typeof window[_0x330e('0x73')]&&'function'===typeof window[_0x330e('0x73')][_0x330e('0x74')]&&window[_0x330e('0x73')][_0x330e('0x74')][_0x330e('0x75')](this);_0x219d41(_0x330e('0x70'))[_0x330e('0x76')](_0x330e('0x71'));};'undefined'!==typeof window[_0x330e('0x15')][_0x330e('0x72')]?(_0x4147b4(window['_QuatroDigital_DropDown'][_0x330e('0x72')]),_0x330e('0x77')===typeof _0xcb8d0e&&_0xcb8d0e(window[_0x330e('0x15')][_0x330e('0x72')])):_0x219d41[_0x330e('0x78')](['items',_0x330e('0x79'),_0x330e('0x7a')],{'done':function(_0xccdeca){_0x4147b4[_0x330e('0x75')](this,_0xccdeca);_0x330e('0x77')===typeof _0xcb8d0e&&_0xcb8d0e(_0xccdeca);},'fail':function(_0x23b044){_0x5d2d7b([_0x330e('0x7b'),_0x23b044]);}});}else alert(_0x330e('0x7c'));};_0x329452[_0x330e('0x4f')]=function(){var _0x4407a3=_0x219d41(_0x330e('0x70'));_0x4407a3[_0x330e('0x30')](_0x330e('0x7d'))[_0x330e('0x6')]?_0x4407a3[_0x330e('0x35')](_0x330e('0x7e')):_0x4407a3[_0x330e('0x76')](_0x330e('0x7e'));};_0x329452[_0x330e('0x6d')]=function(_0x591ab4){var _0x4ce77f=_0x219d41(_0x330e('0x7f'));_0x4ce77f[_0x330e('0x80')]();_0x4ce77f[_0x330e('0x63')](function(){var _0x4ce77f=_0x219d41(this),_0xeaddf,_0x1b599b,_0x1578b9=_0x219d41(''),_0x495bc1;for(_0x495bc1 in window[_0x330e('0x15')]['getOrderForm'][_0x330e('0x6b')])if(_0x330e('0xc')===typeof window['_QuatroDigital_DropDown']['getOrderForm'][_0x330e('0x6b')][_0x495bc1]){var _0x5aa5eb=window['_QuatroDigital_DropDown'][_0x330e('0x72')][_0x330e('0x6b')][_0x495bc1];var _0x3187ef=_0x5aa5eb[_0x330e('0x81')][_0x330e('0x0')](/^\/|\/$/g,'')[_0x330e('0x5')]('/');var _0x32d56c=_0x219d41(_0x330e('0x82'));_0x32d56c['attr']({'data-sku':_0x5aa5eb['id'],'data-sku-index':_0x495bc1,'data-qd-departament':_0x3187ef[0x0],'data-qd-category':_0x3187ef[_0x3187ef[_0x330e('0x6')]-0x1]});_0x32d56c[_0x330e('0x76')]('qd-ddc-'+_0x5aa5eb[_0x330e('0x83')]);_0x32d56c[_0x330e('0x30')](_0x330e('0x84'))['append'](_0x40394e[_0x330e('0x85')](_0x5aa5eb));_0x32d56c['find'](_0x330e('0x86'))[_0x330e('0x2f')](isNaN(_0x5aa5eb[_0x330e('0x87')])?_0x5aa5eb[_0x330e('0x87')]:0x0==_0x5aa5eb['sellingPrice']?_0x330e('0x88'):(_0x219d41(_0x330e('0x89'))[_0x330e('0x8a')](_0x330e('0x8b'))||'R$')+'\x20'+qd_number_format(_0x5aa5eb[_0x330e('0x87')]/0x64,0x2,',','.'));_0x32d56c[_0x330e('0x30')]('.qd-ddc-quantity')[_0x330e('0x8a')]({'data-sku':_0x5aa5eb['id'],'data-sku-index':_0x495bc1})[_0x330e('0x8c')](_0x5aa5eb[_0x330e('0x8d')]);_0x32d56c[_0x330e('0x30')](_0x330e('0x8e'))[_0x330e('0x8a')]({'data-sku':_0x5aa5eb['id'],'data-sku-index':_0x495bc1});_0x329452['insertProdImg'](_0x5aa5eb['id'],_0x32d56c['find'](_0x330e('0x8f')),_0x5aa5eb[_0x330e('0x90')]);_0x32d56c['find'](_0x330e('0x91'))[_0x330e('0x8a')]({'data-sku':_0x5aa5eb['id'],'data-sku-index':_0x495bc1});_0x32d56c[_0x330e('0x92')](_0x4ce77f);_0x1578b9=_0x1578b9[_0x330e('0x32')](_0x32d56c);}try{var _0x4ebc93=_0x4ce77f[_0x330e('0x93')](_0x330e('0x70'))[_0x330e('0x30')](_0x330e('0x94'));_0x4ebc93['length']&&''==_0x4ebc93[_0x330e('0x8c')]()&&window[_0x330e('0x15')][_0x330e('0x72')]['shippingData'][_0x330e('0x95')]&&_0x4ebc93[_0x330e('0x8c')](window['_QuatroDigital_DropDown']['getOrderForm'][_0x330e('0x7a')][_0x330e('0x95')][_0x330e('0x96')]);}catch(_0x2966a1){_0x5d2d7b('Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20'+_0x2966a1['message'],_0x330e('0x12'));}_0x329452[_0x330e('0x97')](_0x4ce77f);_0x329452[_0x330e('0x4f')]();_0x591ab4&&_0x591ab4[_0x330e('0x98')]&&function(){_0x1b599b=_0x1578b9[_0x330e('0x99')]('[data-sku=\x27'+_0x591ab4['lastSku']+'\x27]');_0x1b599b[_0x330e('0x6')]&&(_0xeaddf=0x0,_0x1578b9[_0x330e('0x63')](function(){var _0x591ab4=_0x219d41(this);if(_0x591ab4['is'](_0x1b599b))return!0x1;_0xeaddf+=_0x591ab4[_0x330e('0x9a')]();}),_0x329452[_0x330e('0x3e')](void 0x0,void 0x0,_0xeaddf,_0x4ce77f[_0x330e('0x32')](_0x4ce77f[_0x330e('0x9b')]())),_0x1578b9[_0x330e('0x35')](_0x330e('0x9c')),function(_0x1d4288){_0x1d4288[_0x330e('0x76')](_0x330e('0x9d'));_0x1d4288[_0x330e('0x76')](_0x330e('0x9c'));setTimeout(function(){_0x1d4288['removeClass'](_0x330e('0x9d'));},_0x40394e[_0x330e('0x9e')]);}(_0x1b599b),_0x219d41(document[_0x330e('0x3b')])[_0x330e('0x76')]('qd-ddc-product-add-time-v2'),setTimeout(function(){_0x219d41(document['body'])[_0x330e('0x35')]('qd-ddc-product-add-time-v2');},_0x40394e[_0x330e('0x9e')]));}();});(function(){_QuatroDigital_DropDown[_0x330e('0x72')][_0x330e('0x6b')][_0x330e('0x6')]?(_0x219d41('body')['removeClass']('qd-ddc-cart-empty')['addClass']('qd-ddc-cart-rendered\x20qd-ddc-product-add-time'),setTimeout(function(){_0x219d41('body')[_0x330e('0x35')](_0x330e('0x9f'));},_0x40394e[_0x330e('0x9e')])):_0x219d41('body')[_0x330e('0x35')]('qd-ddc-cart-rendered')[_0x330e('0x76')](_0x330e('0xa0'));}());_0x330e('0x77')===typeof _0x40394e[_0x330e('0xa1')]?_0x40394e['callbackProductsList'][_0x330e('0x75')](this):_0x5d2d7b(_0x330e('0xa2'));};_0x329452[_0x330e('0xa3')]=function(_0x335a5f,_0xd97570,_0x441ee9){function _0x4af1fe(){_0x40394e[_0x330e('0xa4')]&&_0x330e('0xa5')==typeof _0x441ee9&&(_0x441ee9=_0x441ee9[_0x330e('0x0')](_0x330e('0xa6'),_0x330e('0xa7')));_0xd97570[_0x330e('0x35')](_0x330e('0xa8'))[_0x330e('0xa9')](function(){_0x219d41(this)['addClass'](_0x330e('0xa8'));})['attr'](_0x330e('0xaa'),_0x441ee9);}_0x441ee9?_0x4af1fe():isNaN(_0x335a5f)?_0x5d2d7b(_0x330e('0xab'),_0x330e('0x10')):alert('Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.');};_0x329452[_0x330e('0x97')]=function(_0x42ada2){var _0x4ce77f=function(_0x11cfc3,_0x598374){var _0x47a4ef=_0x219d41(_0x11cfc3);var _0x13ea7e=_0x47a4ef['attr'](_0x330e('0xac'));var _0x3187ef=_0x47a4ef[_0x330e('0x8a')]('data-sku-index');if(_0x13ea7e){var _0x42562c=parseInt(_0x47a4ef[_0x330e('0x8c')]())||0x1;_0x329452['changeQantity']([_0x13ea7e,_0x3187ef],_0x42562c,_0x42562c+0x1,function(_0x333844){_0x47a4ef['val'](_0x333844);'function'===typeof _0x598374&&_0x598374();});}};var _0x2404c7=function(_0x3efd46,_0x2438a0){var _0x4ce77f=_0x219d41(_0x3efd46);var _0x2fb169=_0x4ce77f['attr'](_0x330e('0xac'));var _0x91ded2=_0x4ce77f[_0x330e('0x8a')](_0x330e('0xad'));if(_0x2fb169){var _0x3187ef=parseInt(_0x4ce77f['val']())||0x2;_0x329452[_0x330e('0xae')]([_0x2fb169,_0x91ded2],_0x3187ef,_0x3187ef-0x1,function(_0xc1c0a1){_0x4ce77f[_0x330e('0x8c')](_0xc1c0a1);_0x330e('0x77')===typeof _0x2438a0&&_0x2438a0();});}};var _0x3f630a=function(_0x356084,_0x1cc5b1){var _0x4a04c8=_0x219d41(_0x356084);var _0xc9573f=_0x4a04c8[_0x330e('0x8a')](_0x330e('0xac'));var _0x3187ef=_0x4a04c8[_0x330e('0x8a')]('data-sku-index');if(_0xc9573f){var _0x44eed7=parseInt(_0x4a04c8[_0x330e('0x8c')]())||0x1;_0x329452[_0x330e('0xae')]([_0xc9573f,_0x3187ef],0x1,_0x44eed7,function(_0x2c7bdf){_0x4a04c8['val'](_0x2c7bdf);'function'===typeof _0x1cc5b1&&_0x1cc5b1();});}};var _0x3187ef=_0x42ada2['find'](_0x330e('0xaf'));_0x3187ef[_0x330e('0x76')]('qd_on')[_0x330e('0x63')](function(){var _0x42ada2=_0x219d41(this);_0x42ada2[_0x330e('0x30')](_0x330e('0xb0'))['on']('click.qd_ddc_more',function(_0x545f2f){_0x545f2f[_0x330e('0x45')]();_0x3187ef['addClass'](_0x330e('0xb1'));_0x4ce77f(_0x42ada2['find'](_0x330e('0xb2')),function(){_0x3187ef['removeClass'](_0x330e('0xb1'));});});_0x42ada2[_0x330e('0x30')](_0x330e('0xb3'))['on'](_0x330e('0xb4'),function(_0x4e85d9){_0x4e85d9[_0x330e('0x45')]();_0x3187ef[_0x330e('0x76')]('qd-loading');_0x2404c7(_0x42ada2[_0x330e('0x30')](_0x330e('0xb2')),function(){_0x3187ef['removeClass'](_0x330e('0xb1'));});});_0x42ada2[_0x330e('0x30')]('.qd-ddc-quantity')['on'](_0x330e('0xb5'),function(){_0x3187ef[_0x330e('0x76')](_0x330e('0xb1'));_0x3f630a(this,function(){_0x3187ef[_0x330e('0x35')](_0x330e('0xb1'));});});_0x42ada2[_0x330e('0x30')](_0x330e('0xb2'))['on'](_0x330e('0xb6'),function(_0x338292){0xd==_0x338292['keyCode']&&(_0x3187ef[_0x330e('0x76')](_0x330e('0xb1')),_0x3f630a(this,function(){_0x3187ef['removeClass']('qd-loading');}));});});_0x42ada2[_0x330e('0x30')](_0x330e('0x7d'))[_0x330e('0x63')](function(){var _0x42ada2=_0x219d41(this);_0x42ada2[_0x330e('0x30')]('.qd-ddc-remove')['on'](_0x330e('0xb7'),function(){_0x42ada2[_0x330e('0x76')](_0x330e('0xb1'));_0x329452['removeProduct'](_0x219d41(this),function(_0x58585a){_0x58585a?_0x42ada2[_0x330e('0xb8')](!0x0)[_0x330e('0xb9')](function(){_0x42ada2[_0x330e('0xba')]();_0x329452[_0x330e('0x4f')]();}):_0x42ada2[_0x330e('0x35')]('qd-loading');});return!0x1;});});};_0x329452[_0x330e('0x42')]=function(_0xd532df){var _0x8b5bd5=_0xd532df[_0x330e('0x8c')]();_0x8b5bd5=_0x8b5bd5[_0x330e('0x0')](/[^0-9\-]/g,'');_0x8b5bd5=_0x8b5bd5[_0x330e('0x0')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3');_0x8b5bd5=_0x8b5bd5[_0x330e('0x0')](/(.{9}).*/g,'$1');_0xd532df[_0x330e('0x8c')](_0x8b5bd5);};_0x329452[_0x330e('0x4a')]=function(_0x3f6f09){var _0x1b829e=_0x3f6f09[_0x330e('0x8c')]();0x9<=_0x1b829e[_0x330e('0x6')]&&(_0x3f6f09['data'](_0x330e('0xbb'))!=_0x1b829e&&_0x205506['calculateShipping']({'postalCode':_0x1b829e,'country':'BRA'})['done'](function(_0x52ff09){_0x3f6f09['closest']('.qd-ddc-cep-tooltip-text')[_0x330e('0x30')](_0x330e('0xbc'))['remove']();window[_0x330e('0x15')][_0x330e('0x72')]=_0x52ff09;_0x329452[_0x330e('0x6e')]();_0x52ff09=_0x52ff09[_0x330e('0x7a')]['logisticsInfo'][0x0][_0x330e('0xbd')];for(var _0x3187ef=_0x219d41(_0x330e('0xbe')),_0x6c47e7=0x0;_0x6c47e7<_0x52ff09[_0x330e('0x6')];_0x6c47e7++){var _0x239982=_0x52ff09[_0x6c47e7],_0x544d47=0x1<_0x239982[_0x330e('0xbf')]?_0x239982[_0x330e('0xbf')][_0x330e('0x0')]('bd',_0x330e('0xc0')):_0x239982[_0x330e('0xbf')]['replace']('bd',_0x330e('0xc1')),_0xbb5a57=_0x219d41(_0x330e('0xc2'));_0xbb5a57['append'](_0x330e('0xc3')+qd_number_format(_0x239982['price']/0x64,0x2,',','.')+_0x330e('0xc4')+_0x239982['name']+',\x20entrega\x20em\x20'+_0x544d47+_0x330e('0xc5')+_0x1b829e+_0x330e('0xc6'));_0xbb5a57[_0x330e('0x92')](_0x3187ef[_0x330e('0x30')](_0x330e('0xc7')));}_0x3187ef[_0x330e('0xc8')](_0x3f6f09[_0x330e('0x48')]('.qd-ddc-cep-tooltip-text')[_0x330e('0x30')]('.qd-ddc-cep-close'));})[_0x330e('0xc9')](function(_0x59e16f){_0x5d2d7b([_0x330e('0xca'),_0x59e16f]);updateCartData();}),_0x3f6f09[_0x330e('0xcb')](_0x330e('0xbb'),_0x1b829e));};_0x329452[_0x330e('0xae')]=function(_0xa8786c,_0x5028a5,_0x3743fa,_0x5d847d){function _0x160987(_0x48ff1c){_0x48ff1c=_0x330e('0xcc')!==typeof _0x48ff1c?!0x1:_0x48ff1c;_0x329452['getCartInfoByUrl']();window[_0x330e('0x15')]['allowUpdate']=!0x1;_0x329452[_0x330e('0x4f')]();'undefined'!==typeof window[_0x330e('0x73')]&&'function'===typeof window['_QuatroDigital_AmountProduct'][_0x330e('0x74')]&&window[_0x330e('0x73')]['exec'][_0x330e('0x75')](this);_0x330e('0x77')===typeof adminCart&&adminCart();_0x219d41['fn']['simpleCart'](!0x0,void 0x0,_0x48ff1c);'function'===typeof _0x5d847d&&_0x5d847d(_0x5028a5);}_0x3743fa=_0x3743fa||0x1;if(0x1>_0x3743fa)return _0x5028a5;if(_0x40394e[_0x330e('0x24')]){if('undefined'===typeof window['_QuatroDigital_DropDown'][_0x330e('0x72')]['items'][_0xa8786c[0x1]])return _0x5d2d7b(_0x330e('0xcd')+_0xa8786c[0x1]+']'),_0x5028a5;window[_0x330e('0x15')][_0x330e('0x72')]['items'][_0xa8786c[0x1]][_0x330e('0x8d')]=_0x3743fa;window[_0x330e('0x15')][_0x330e('0x72')][_0x330e('0x6b')][_0xa8786c[0x1]][_0x330e('0xce')]=_0xa8786c[0x1];_0x205506[_0x330e('0xcf')]([window[_0x330e('0x15')][_0x330e('0x72')][_0x330e('0x6b')][_0xa8786c[0x1]]],[_0x330e('0x6b'),'totalizers',_0x330e('0x7a')])[_0x330e('0xd0')](function(_0x2c9256){window['_QuatroDigital_DropDown'][_0x330e('0x72')]=_0x2c9256;_0x160987(!0x0);})['fail'](function(_0x447070){_0x5d2d7b([_0x330e('0xd1'),_0x447070]);_0x160987();});}else _0x5d2d7b(_0x330e('0xd2'));};_0x329452[_0x330e('0xd3')]=function(_0x50c566,_0x40416e){function _0x3c30a9(_0x2b1071){_0x2b1071=_0x330e('0xcc')!==typeof _0x2b1071?!0x1:_0x2b1071;'undefined'!==typeof window[_0x330e('0x73')]&&_0x330e('0x77')===typeof window[_0x330e('0x73')]['exec']&&window['_QuatroDigital_AmountProduct'][_0x330e('0x74')][_0x330e('0x75')](this);_0x330e('0x77')===typeof adminCart&&adminCart();_0x219d41['fn'][_0x330e('0x4e')](!0x0,void 0x0,_0x2b1071);_0x330e('0x77')===typeof _0x40416e&&_0x40416e(_0x45ad18);}var _0x45ad18=!0x1,_0x3187ef=_0x219d41(_0x50c566)[_0x330e('0x8a')](_0x330e('0xad'));if(_0x40394e[_0x330e('0x24')]){if(_0x330e('0x2')===typeof window[_0x330e('0x15')][_0x330e('0x72')][_0x330e('0x6b')][_0x3187ef])return _0x5d2d7b('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x3187ef+']'),_0x45ad18;window[_0x330e('0x15')][_0x330e('0x72')][_0x330e('0x6b')][_0x3187ef][_0x330e('0xce')]=_0x3187ef;_0x205506[_0x330e('0xd4')]([window['_QuatroDigital_DropDown'][_0x330e('0x72')][_0x330e('0x6b')][_0x3187ef]],[_0x330e('0x6b'),_0x330e('0x79'),_0x330e('0x7a')])[_0x330e('0xd0')](function(_0x4138e9){_0x45ad18=!0x0;window[_0x330e('0x15')][_0x330e('0x72')]=_0x4138e9;_0x1169a0(_0x4138e9);_0x3c30a9(!0x0);})[_0x330e('0xc9')](function(_0x3fab51){_0x5d2d7b([_0x330e('0xd5'),_0x3fab51]);_0x3c30a9();});}else alert(_0x330e('0xd6'));};_0x329452[_0x330e('0x3e')]=function(_0x44acb5,_0x551b72,_0x4a8690,_0x363262){_0x363262=_0x363262||_0x219d41(_0x330e('0xd7'));_0x44acb5=_0x44acb5||'+';_0x551b72=_0x551b72||0.9*_0x363262[_0x330e('0xd8')]();_0x363262['stop'](!0x0,!0x0)['animate']({'scrollTop':isNaN(_0x4a8690)?_0x44acb5+'='+_0x551b72+'px':_0x4a8690});};_0x40394e['updateOnlyHover']||(_0x329452[_0x330e('0x6e')](),_0x219d41['fn'][_0x330e('0x4e')](!0x0));_0x219d41(window)['on']('productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex',function(){try{window[_0x330e('0x15')][_0x330e('0x72')]=void 0x0,_0x329452[_0x330e('0x6e')]();}catch(_0x3959e0){_0x5d2d7b(_0x330e('0xd9')+_0x3959e0[_0x330e('0xda')],_0x330e('0xdb'));}});_0x330e('0x77')===typeof _0x40394e[_0x330e('0x9')]?_0x40394e[_0x330e('0x9')][_0x330e('0x75')](this):_0x5d2d7b(_0x330e('0xdc'));};_0x219d41['fn']['QD_dropDownCart']=function(_0x37c664){var _0x286d78=_0x219d41(this);_0x286d78['fn']=new _0x219d41[(_0x330e('0x16'))](this,_0x37c664);return _0x286d78;};}catch(_0x827eed){_0x330e('0x2')!==typeof console&&_0x330e('0x77')===typeof console[_0x330e('0xb')]&&console[_0x330e('0xb')](_0x330e('0xdd'),_0x827eed);}}(this));(function(_0x408604){try{var _0x56988d=jQuery;window[_0x330e('0x73')]=window['_QuatroDigital_AmountProduct']||{};window['_QuatroDigital_AmountProduct']['items']={};window[_0x330e('0x73')][_0x330e('0xde')]=!0x1;window[_0x330e('0x73')]['buyButtonClicked']=!0x1;window['_QuatroDigital_AmountProduct'][_0x330e('0xdf')]=!0x1;var _0x245a56=function(){if(window[_0x330e('0x73')]['allowRecalculate']){var _0x2aefbd=!0x1;var _0x26606e={};window[_0x330e('0x73')][_0x330e('0x6b')]={};for(_0x38707f in window[_0x330e('0x15')][_0x330e('0x72')][_0x330e('0x6b')])if('object'===typeof window['_QuatroDigital_DropDown'][_0x330e('0x72')][_0x330e('0x6b')][_0x38707f]){var _0x44b81a=window['_QuatroDigital_DropDown']['getOrderForm']['items'][_0x38707f];_0x330e('0x2')!==typeof _0x44b81a['productId']&&null!==_0x44b81a[_0x330e('0xe0')]&&''!==_0x44b81a[_0x330e('0xe0')]&&(window['_QuatroDigital_AmountProduct'][_0x330e('0x6b')][_0x330e('0xe1')+_0x44b81a[_0x330e('0xe0')]]=window[_0x330e('0x73')][_0x330e('0x6b')]['prod_'+_0x44b81a[_0x330e('0xe0')]]||{},window[_0x330e('0x73')][_0x330e('0x6b')][_0x330e('0xe1')+_0x44b81a['productId']][_0x330e('0xe2')]=_0x44b81a[_0x330e('0xe0')],_0x26606e[_0x330e('0xe1')+_0x44b81a[_0x330e('0xe0')]]||(window[_0x330e('0x73')][_0x330e('0x6b')]['prod_'+_0x44b81a[_0x330e('0xe0')]][_0x330e('0x66')]=0x0),window['_QuatroDigital_AmountProduct'][_0x330e('0x6b')]['prod_'+_0x44b81a[_0x330e('0xe0')]][_0x330e('0x66')]+=_0x44b81a[_0x330e('0x8d')],_0x2aefbd=!0x0,_0x26606e[_0x330e('0xe1')+_0x44b81a['productId']]=!0x0);}var _0x38707f=_0x2aefbd;}else _0x38707f=void 0x0;window[_0x330e('0x73')][_0x330e('0xde')]&&(_0x56988d(_0x330e('0xe3'))['remove'](),_0x56988d('.qd-bap-item-added')[_0x330e('0x35')]('qd-bap-item-added'));for(var _0x69ebb3 in window[_0x330e('0x73')][_0x330e('0x6b')]){_0x44b81a=window[_0x330e('0x73')][_0x330e('0x6b')][_0x69ebb3];if(_0x330e('0xc')!==typeof _0x44b81a)return;_0x26606e=_0x56988d(_0x330e('0xe4')+_0x44b81a['prodId']+']')[_0x330e('0x93')]('li');if(window[_0x330e('0x73')][_0x330e('0xde')]||!_0x26606e[_0x330e('0x30')]('.qd-bap-wrapper')[_0x330e('0x6')])_0x2aefbd=_0x56988d(_0x330e('0xe5')),_0x2aefbd[_0x330e('0x30')](_0x330e('0xe6'))[_0x330e('0x5a')](_0x44b81a[_0x330e('0x66')]),_0x44b81a=_0x26606e[_0x330e('0x30')](_0x330e('0xe7')),_0x44b81a['length']?_0x44b81a[_0x330e('0xe8')](_0x2aefbd)[_0x330e('0x76')](_0x330e('0xe9')):_0x26606e[_0x330e('0xe8')](_0x2aefbd);}_0x38707f&&(window[_0x330e('0x73')]['allowRecalculate']=!0x1);};window[_0x330e('0x73')][_0x330e('0x74')]=function(){window[_0x330e('0x73')]['allowRecalculate']=!0x0;_0x245a56['call'](this);};_0x56988d(document)['ajaxStop'](function(){_0x245a56[_0x330e('0x75')](this);});}catch(_0xbbd63){_0x330e('0x2')!==typeof console&&'function'===typeof console[_0x330e('0xb')]&&console['error'](_0x330e('0xdd'),_0xbbd63);}}(this));(function(){try{var _0x5d506d=jQuery,_0x5e092b,_0x5af28e={'selector':'.qdDdcContainer','dropDown':{},'buyButton':{}};_0x5d506d['QD_smartCart']=function(_0x18f0cc){var _0x3fc1b9={};_0x5e092b=_0x5d506d[_0x330e('0xea')](!0x0,{},_0x5af28e,_0x18f0cc);_0x18f0cc=_0x5d506d(_0x5e092b['selector'])[_0x330e('0x16')](_0x5e092b[_0x330e('0xeb')]);_0x3fc1b9['buyButton']=_0x330e('0x2')!==typeof _0x5e092b['dropDown'][_0x330e('0x4c')]&&!0x1===_0x5e092b['dropDown'][_0x330e('0x4c')]?_0x5d506d(_0x5e092b['selector'])[_0x330e('0xec')](_0x18f0cc['fn'],_0x5e092b['buyButton']):_0x5d506d(_0x5e092b[_0x330e('0xed')])[_0x330e('0xec')](_0x5e092b[_0x330e('0xee')]);_0x3fc1b9[_0x330e('0xeb')]=_0x18f0cc;return _0x3fc1b9;};_0x5d506d['fn']['smartCart']=function(){_0x330e('0xc')===typeof console&&_0x330e('0x77')===typeof console[_0x330e('0x13')]&&console[_0x330e('0x13')](_0x330e('0xef'));};_0x5d506d[_0x330e('0xf0')]=_0x5d506d['fn'][_0x330e('0xf0')];}catch(_0x4d367a){_0x330e('0x2')!==typeof console&&_0x330e('0x77')===typeof console['error']&&console[_0x330e('0xb')](_0x330e('0xdd'),_0x4d367a);}}());

// vtex url parse
/* Quatro Digital - VTEX URL Parse // 1.4 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
var _0x8349=["\x6C\x69\x6E\x6B","\x3C\x61\x20\x68\x72\x65\x66\x3D\x22","\x22\x3E\x3C\x2F\x61\x3E","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\x66\x75\x6E\x63\x74\x69\x6F\x6E","\x65\x72\x72\x6F\x72","\x50\x72\x6F\x62\x6C\x65\x6D\x61\x73\x20\x3A\x28\x20\x2E\x20\x44\x65\x74\x61\x6C\x68\x65\x73\x3A\x20","\x2F","\x73\x70\x6C\x69\x74","","\x72\x65\x70\x6C\x61\x63\x65","\x70\x61\x74\x68\x6E\x61\x6D\x65","\x2C","\x70\x6F\x70","\x6D\x61\x74\x63\x68","\x73\x65\x61\x72\x63\x68","\x6C\x65\x6E\x67\x74\x68","\x6F\x62\x6A\x65\x63\x74","\x70\x75\x73\x68","\x63","\x6D\x61\x70","\x73\x68\x69\x66\x74","\x6F\x74\x68\x65\x72\x5F\x70\x61\x74\x68","\x6F\x74\x68\x65\x72\x5F\x73\x65\x61\x72\x63\x68","\x26","\x6F\x75\x74","\x67\x65\x74\x4D\x61\x70","\x70\x72\x6F\x74\x6F\x74\x79\x70\x65","\x6D\x65\x72\x67\x65\x55\x72\x6C","\x63\x61\x6C\x6C","\x65\x78\x74\x65\x6E\x64","\x67\x65\x74\x55\x72\x6C","\x6D\x61\x70\x3D","\x6A\x6F\x69\x6E","\x3F","\x51\x44\x5F\x56\x74\x65\x78\x55\x72\x6C\x50\x61\x72\x73\x65"];(function(){function _0x6ac7x1(_0x6ac7x2){try{this[_0x8349[0]]=$(_0x8349[1]+_0x6ac7x2+_0x8349[2])[0]}catch(c){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],c)}}function _0x6ac7x3(_0x6ac7x2){try{_0x6ac7x2=_0x6ac7x2||this[_0x8349[0]];var _0x6ac7x4=_0x6ac7x2[_0x8349[11]][_0x8349[10]](/\/\//g,_0x8349[7])[_0x8349[10]](/(^\/|\/$)/g,_0x8349[9])[_0x8349[8]](_0x8349[7]),_0x6ac7x5=((_0x6ac7x2[_0x8349[15]]||_0x8349[9])[_0x8349[14]](/map\=([^&]+)/i)||[_0x8349[9]])[_0x8349[13]]()[_0x8349[8]](_0x8349[12]);if(1==_0x6ac7x5[_0x8349[16]]&&0==_0x6ac7x5[0][_0x8349[16]]){if(_0x8349[17]== typeof defaultMap){_0x6ac7x5=defaultMap}else {for(var _0x6ac7x6=0;_0x6ac7x6<_0x6ac7x4[_0x8349[16]];_0x6ac7x6++){_0x6ac7x4[_0x6ac7x6][_0x8349[16]]&&_0x8349[7]!=_0x6ac7x4[_0x6ac7x6]&&_0x6ac7x5[_0x8349[18]](defaultMap)}}};for(var _0x6ac7x6={map:{},other_path:_0x8349[9]},_0x6ac7x7=0;_0x6ac7x7<_0x6ac7x5[_0x8349[16]];_0x6ac7x7++){_0x6ac7x5[_0x6ac7x7][_0x8349[16]]&&(_0x8349[19]==_0x6ac7x5[_0x6ac7x7]?(_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]=_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]||[],_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]][_0x8349[18]]((_0x6ac7x4||[_0x8349[9]])[_0x8349[21]]())):_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]=(_0x6ac7x4||[_0x8349[9]])[_0x8349[21]]())};_0x6ac7x6[_0x8349[22]]=_0x6ac7x4;_0x6ac7x6[_0x8349[23]]=(_0x6ac7x2[_0x8349[15]]||_0x8349[9])[_0x8349[10]](/map\=([^&]+)/ig,_0x8349[9])[_0x8349[10]](/\&\&+/ig,_0x8349[24])[_0x8349[10]](/\?/g,_0x8349[9]);return this[_0x8349[25]]=_0x6ac7x6}catch(g){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],g)}}_0x6ac7x1[_0x8349[27]][_0x8349[26]]=_0x6ac7x3;_0x6ac7x1[_0x8349[27]][_0x8349[28]]=function(_0x6ac7x2,_0x6ac7x4){try{var _0x6ac7x5=_0x6ac7x3[_0x8349[29]](this,this[_0x8349[0]]),_0x6ac7x6=_0x6ac7x3[_0x8349[29]](this,$(_0x8349[1]+_0x6ac7x2+_0x8349[2])[0]);_0x6ac7x5[_0x8349[22]][_0x8349[16]]||(_0x6ac7x5[_0x8349[22]]=void(0));_0x6ac7x5[_0x8349[23]][_0x8349[16]]||(_0x6ac7x5[_0x8349[23]]=void(0));var _0x6ac7x7=$[_0x8349[30]](!0,{},_0x6ac7x6,_0x6ac7x5);if(_0x8349[17]== typeof _0x6ac7x4){for(_0x6ac7x6=0;_0x6ac7x6<_0x6ac7x4[_0x8349[16]];_0x6ac7x6++){_0x6ac7x7[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]]&&(_0x6ac7x7[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]]=_0x6ac7x5[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]])}};return this[_0x8349[25]]=_0x6ac7x7}catch(g){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],g)}};_0x6ac7x1[_0x8349[27]][_0x8349[31]]=function(_0x6ac7x2){try{var _0x6ac7x4=[],_0x6ac7x5=[];_0x6ac7x2=_0x6ac7x2||{};for(var _0x6ac7x6 in this[_0x8349[25]][_0x8349[20]]){if(!_0x6ac7x2[_0x6ac7x6]){if(_0x8349[19]==_0x6ac7x6){for(var _0x6ac7x7=0;_0x6ac7x7<this[_0x8349[25]][_0x8349[20]][_0x6ac7x6][_0x8349[16]];_0x6ac7x7++){_0x6ac7x4[_0x8349[18]](this[_0x8349[25]][_0x8349[20]][_0x6ac7x6][_0x6ac7x7]),_0x6ac7x5[_0x8349[18]](_0x6ac7x6)}}else {_0x6ac7x4[_0x8349[18]](this[_0x8349[25]][_0x8349[20]][_0x6ac7x6]),_0x6ac7x5[_0x8349[18]](_0x6ac7x6)}}};var _0x6ac7x8=_0x6ac7x5[_0x8349[16]]?_0x8349[32]+_0x6ac7x5[_0x8349[33]](_0x8349[12])+_0x8349[24]:_0x8349[9];return _0x8349[7]+_0x6ac7x4[_0x8349[33]](_0x8349[7])+(this[_0x8349[25]][_0x8349[22]][_0x8349[16]]?_0x8349[7]+this[_0x8349[25]][_0x8349[22]][_0x8349[33]](_0x8349[7]):_0x8349[9])+_0x8349[34]+(_0x6ac7x8+this[_0x8349[25]][_0x8349[23]])[_0x8349[10]](/\&\&+/g,_0x8349[24])}catch(_0x6ac7x1){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],_0x6ac7x1)}};window[_0x8349[35]]=_0x6ac7x1})()

/* Quatro Digital - QD Select Smart Research 2 // Carlos Vinicius // Todos os direitos reservados */
var _0x44ed=['removeClass','Problemas\x20:(\x20.\x20Detalhes:\x20','select[data-qdssr-ndx=','option[data-qdssr-text=\x27','<option\x20value=\x22','</option>','getCategory','cache','innerHTML','buscapagina','match','pop','push','qdPlugin','function','QD_SelectSmartResearch2','undefined','warn','object','[Quatro\x20Digital\x20-\x20QD\x20Select\x20Smart\x20Research\x202]\x0a','alerta','toLowerCase','aviso','info','apply','join','error','Selecione\x20o\x20anterior','Selecione\x20o(a)\x20','href','find','.search-single-navigator\x20ul.','data-qdssr-title','each','text','trim','h5.','\x20+ul\x20.filtro-ativo:first','Desculpe,\x20não\x20foi\x20possível\x20executar\x20sua\x20solicitação.\x20Por\x20favor\x20entre\x20em\x20contato\x20com\x20o\x20SAC.','replace','fromCharCode','charCodeAt','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','Nenhuma\x20opção\x20foi\x20enviada,\x20é\x20esperado\x20um\x20array\x20com\x20sub\x20arrays\x20contendo\x20o\x20conjunto\x20chave/valor.','message','addClass','qd-ssr2-loaded','Problemas\x20ao\x20tentar\x20verificar\x20as\x20opções\x20selecionadas.\x20Detalhes:\x20','options','optionsPlaceHolder','index','<label\x20for=\x22qd-ssr2-select-','labelMessage','</label>','<option\x20value=\x22\x22></option>','disabledMessage','</select></div>','appendTo','select','add','attr','select2','pt-BR','change','val','trigger','QuatroDigital.ssrChange','length','body','split','data-qdssr-str','qd-ssr-loading','qd-ssr2-loading','qdAjax','html','removeAttr','disabled','QuatroDigital.ssrSelectAjaxPopulated'];(function(_0x3b8cdc,_0x3c3878){var _0x235c2c=function(_0x3796b7){while(--_0x3796b7){_0x3b8cdc['push'](_0x3b8cdc['shift']());}};_0x235c2c(++_0x3c3878);}(_0x44ed,0xb2));var _0x4132=function(_0x1ba3ac,_0x206f9e){_0x1ba3ac=_0x1ba3ac-0x0;var _0x5f5696=_0x44ed[_0x1ba3ac];return _0x5f5696;};(function(_0x310d72){var _0x5102c3=jQuery;if(_0x4132('0x0')!==typeof _0x5102c3['fn'][_0x4132('0x1')]){_0x5102c3['fn']['QD_SelectSmartResearch2']=function(){};var _0x3d5629=function(_0x343372,_0x30e405){if('object'===typeof console&&_0x4132('0x2')!==typeof console['error']&&'undefined'!==typeof console['info']&&_0x4132('0x2')!==typeof console[_0x4132('0x3')]){var _0x5e31dd;_0x4132('0x4')===typeof _0x343372?(_0x343372['unshift']('[Quatro\x20Digital\x20-\x20QD\x20Select\x20Smart\x20Research\x202]\x0a'),_0x5e31dd=_0x343372):_0x5e31dd=[_0x4132('0x5')+_0x343372];if(_0x4132('0x2')===typeof _0x30e405||_0x4132('0x6')!==_0x30e405[_0x4132('0x7')]()&&_0x4132('0x8')!==_0x30e405[_0x4132('0x7')]())if(_0x4132('0x2')!==typeof _0x30e405&&'info'===_0x30e405[_0x4132('0x7')]())try{console[_0x4132('0x9')][_0x4132('0xa')](console,_0x5e31dd);}catch(_0x711793){try{console[_0x4132('0x9')](_0x5e31dd[_0x4132('0xb')]('\x0a'));}catch(_0x3c6c46){}}else try{console[_0x4132('0xc')]['apply'](console,_0x5e31dd);}catch(_0x362359){try{console[_0x4132('0xc')](_0x5e31dd[_0x4132('0xb')]('\x0a'));}catch(_0x2a2cbb){}}else try{console[_0x4132('0x3')]['apply'](console,_0x5e31dd);}catch(_0x549de3){try{console[_0x4132('0x3')](_0x5e31dd['join']('\x0a'));}catch(_0x5247fd){}}}},_0x59199c={'options':[],'optionsPlaceHolder':[],'disabledMessage':function(_0x423a81,_0xaf70a6,_0x2ce454){return _0x4132('0xd');},'labelMessage':function(_0x477b1d,_0x12b98e,_0x2763d6){return _0x4132('0xe')+_0x2763d6[_0x477b1d];},'redirect':function(_0x3aed38){window['location'][_0x4132('0xf')]=_0x3aed38;},'getAjaxOptions':function(_0xf160ba,_0x47cf3c){var _0x2b0360=[];_0x5102c3(_0xf160ba)[_0x4132('0x10')](_0x4132('0x11')+_0x47cf3c['attr'](_0x4132('0x12')))[_0x4132('0x10')]('a')[_0x4132('0x13')](function(){var _0x47cf3c=_0x5102c3(this);_0x2b0360['push']([_0x47cf3c[_0x4132('0x14')]()[_0x4132('0x15')](),_0x47cf3c['attr'](_0x4132('0xf'))||'']);});return _0x2b0360;},'optionIsChecked':function(_0xc4cd63){_0xc4cd63=_0x5102c3(_0x4132('0x16')+_0xc4cd63+_0x4132('0x17'))[_0x4132('0x14')]()['trim']();return _0xc4cd63['length']?_0xc4cd63:null;},'ajaxError':function(){_0x3d5629(_0x4132('0x18'));}};_0x310d72=function(_0x5686db){var _0x1ea9c8={'p':'neynoretnznfx%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x23cb77){var _0x378208=function(_0x36ad34){return _0x36ad34;};var _0x1dac65=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x23cb77=_0x23cb77['d'+_0x1dac65[0x10]+'c'+_0x1dac65[0x11]+'m'+_0x378208(_0x1dac65[0x1])+'n'+_0x1dac65[0xd]]['l'+_0x1dac65[0x12]+'c'+_0x1dac65[0x0]+'ti'+_0x378208('o')+'n'];var _0x21f296=function(_0x3ba0b7){return escape(encodeURIComponent(_0x3ba0b7[_0x4132('0x19')](/\./g,'¨')[_0x4132('0x19')](/[a-zA-Z]/g,function(_0x16631f){return String[_0x4132('0x1a')](('Z'>=_0x16631f?0x5a:0x7a)>=(_0x16631f=_0x16631f[_0x4132('0x1b')](0x0)+0xd)?_0x16631f:_0x16631f-0x1a);})));};var _0x11a4fa=_0x21f296(_0x23cb77[[_0x1dac65[0x9],_0x378208('o'),_0x1dac65[0xc],_0x1dac65[_0x378208(0xd)]][_0x4132('0xb')]('')]);_0x21f296=_0x21f296((window[['js',_0x378208('no'),'m',_0x1dac65[0x1],_0x1dac65[0x4]['toUpperCase'](),_0x4132('0x1c')]['join']('')]||_0x4132('0x1d'))+['.v',_0x1dac65[0xd],'e',_0x378208('x'),'co',_0x378208('mm'),_0x4132('0x1e'),_0x1dac65[0x1],'.c',_0x378208('o'),'m.',_0x1dac65[0x13],'r'][_0x4132('0xb')](''));for(var _0x4d6b57 in _0x1ea9c8){if(_0x21f296===_0x4d6b57+_0x1ea9c8[_0x4d6b57]||_0x11a4fa===_0x4d6b57+_0x1ea9c8[_0x4d6b57]){var _0x256650='tr'+_0x1dac65[0x11]+'e';break;}_0x256650='f'+_0x1dac65[0x0]+'ls'+_0x378208(_0x1dac65[0x1])+'';}_0x378208=!0x1;-0x1<_0x23cb77[[_0x1dac65[0xc],'e',_0x1dac65[0x0],'rc',_0x1dac65[0x9]][_0x4132('0xb')]('')][_0x4132('0x1f')](_0x4132('0x20'))&&(_0x378208=!0x0);return[_0x256650,_0x378208];}(_0x5686db);}(window);if(!eval(_0x310d72[0x0]))return _0x310d72[0x1]?_0x3d5629('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x5102c3['QD_SelectSmartResearch2']=function(_0x6f9a12,_0xfb5ddb){if(!_0xfb5ddb['options']['length'])return _0x3d5629(_0x4132('0x21'));_0x6f9a12[_0x4132('0x13')](function(){try{var _0x57bff6=_0x5102c3(this),_0x42f70c=_0x53c754(_0x57bff6,_0xfb5ddb,_0x6f9a12);_0x65542e(_0x57bff6,_0xfb5ddb,0x0);_0x42f70c['on']('QuatroDigital.ssrSelectAjaxPopulated',function(_0x122ed6,_0xd972c){try{_0x65542e(_0x57bff6,_0xfb5ddb,_0xd972c['attr']('data-qdssr-ndx'));}catch(_0x274e34){_0x3d5629('Problemas\x20ao\x20definir\x20a\x20opção\x20selecionada.\x20Detalhes:\x20'+_0x274e34[_0x4132('0x22')]);}});_0x57bff6[_0x4132('0x23')](_0x4132('0x24'));}catch(_0x52749b){_0x3d5629(_0x4132('0x25')+_0x52749b['message']);}});};var _0x53c754=function(_0x25cce0,_0x5ef577,_0x21ad34){try{for(var _0x3534cb='',_0x38c8d4,_0x310d72=!0x0,_0x36add5=new _0x5102c3(),_0xed6320=!0x1,_0xee582c=0x0,_0x452be5=0x0;_0x452be5<_0x5ef577[_0x4132('0x26')]['length'];_0x452be5++){_0x4132('0x4')!==typeof _0x5ef577[_0x4132('0x26')][_0x452be5]&&(_0x310d72=!0x1);var _0x511c06=_0x5ef577[_0x4132('0x27')][_0x452be5]||'',_0x2c50d6=_0x21ad34[_0x4132('0x28')](_0x25cce0);_0x3534cb='<div\x20class=\x22qd-ssr2-option-wrapper\x22>';_0x3534cb+=_0x4132('0x29')+_0x452be5+_0x2c50d6+'\x22>'+_0x5ef577[_0x4132('0x2a')](_0x452be5,_0x5ef577['options'],_0x5ef577[_0x4132('0x27')])+_0x4132('0x2b');_0x3534cb+='<select\x20data-qdssr-ndx=\x22'+_0x452be5+'\x22\x20id=\x22qd-ssr2-select-'+_0x452be5+_0x2c50d6+'\x22\x20data-qdssr-title=\x22'+_0x511c06+'\x22>';_0x3534cb+=_0x4132('0x2c');_0x310d72?_0x3534cb+=_0x5a8a7c(_0x5ef577['options'][_0x452be5]):_0x511c06=_0x5ef577[_0x4132('0x2d')](_0x452be5,_0x5ef577[_0x4132('0x26')],_0x5ef577[_0x4132('0x27')]);_0x3534cb+=_0x4132('0x2e');_0x38c8d4=_0x5102c3(_0x3534cb);_0x38c8d4[_0x4132('0x2f')](_0x25cce0);var _0xcb5243=_0x38c8d4[_0x4132('0x10')](_0x4132('0x30'));_0x36add5=_0x36add5[_0x4132('0x31')](_0xcb5243);_0x310d72||_0xcb5243[_0x4132('0x32')]({'disabled':!0x0,'data-qdssr-str':_0x5ef577[_0x4132('0x26')][_0x452be5]});_0xcb5243[_0x4132('0x33')]({'placeholder':_0x511c06,'language':_0x4132('0x34')});_0xcb5243['bind'](_0x4132('0x35'),function(_0x1c36fa,_0x331474){var _0x23bd8d=_0x5102c3(this),_0x586f4f=_0x25cce0['find']('select[data-qdssr-ndx='+(parseInt(_0x23bd8d['attr']('data-qdssr-ndx')||0x0,0xa)+0x1)+']'),_0x310d72=(_0x23bd8d[_0x4132('0x36')]()||'')['trim']();_0x331474||(_0xed6320=!0x0);_0x5102c3(window)[_0x4132('0x37')](_0x4132('0x38'),[_0x586f4f,_0xed6320]);!_0x586f4f[_0x4132('0x39')]&&(!_0x331474||_0xed6320&&_0x310d72['length'])&&(_0x5102c3(document[_0x4132('0x3a')])[_0x4132('0x23')]('qd-ssr-reloading'),_0x5ef577['redirect'](_0x310d72));_0x310d72=_0x310d72[_0x4132('0x3b')]('#')['shift']()[_0x4132('0x3b')]('?');_0x310d72[0x1]=(_0x586f4f[_0x4132('0x32')](_0x4132('0x3c'))||'')+'&'+(_0x310d72[0x1]||'');_0x5102c3(document[_0x4132('0x3a')])[_0x4132('0x23')](_0x4132('0x3d'));_0x38c8d4[_0x4132('0x23')](_0x4132('0x3e'));_0xee582c+=0x1;_0x5102c3[_0x4132('0x3f')]({'url':_0x310d72[_0x4132('0xb')]('?'),'dataType':_0x4132('0x40'),'success':function(_0x3c3ebf){_0x586f4f[_0x4132('0x41')](_0x4132('0x42'));_0x586f4f[_0x4132('0x40')](_0x4132('0x2c')+_0x5a8a7c(_0x5ef577['getAjaxOptions'](_0x3c3ebf,_0x586f4f)));_0x586f4f[_0x4132('0x33')]({'placeholder':_0x586f4f[_0x4132('0x32')]('data-qdssr-title')});_0x23bd8d['trigger'](_0x4132('0x43'),[_0x586f4f]);},'error':function(){_0x5ef577['ajaxError'][_0x4132('0xa')](this,arguments);},'complete':function(){_0x38c8d4[_0x4132('0x44')]('qd-ssr2-loading');--_0xee582c;0x0==_0xee582c&&_0x5102c3(document['body'])[_0x4132('0x44')]('qd-ssr-loading');},'clearQueueDelay':null});});}return _0x36add5;}catch(_0x2d147c){_0x3d5629(_0x4132('0x45')+_0x2d147c[_0x4132('0x22')]);}},_0x65542e=function(_0x3e12a7,_0x44fe8a,_0x26acd2,_0x238ebb){_0x44fe8a=_0x44fe8a['optionIsChecked'](_0x44fe8a['optionsPlaceHolder'][_0x26acd2]);null!==_0x44fe8a&&(_0x238ebb=_0x238ebb||_0x3e12a7[_0x4132('0x10')](_0x4132('0x46')+_0x26acd2+']'),_0x238ebb[_0x4132('0x36')](_0x238ebb[_0x4132('0x10')](_0x4132('0x47')+_0x44fe8a+'\x27]')[_0x4132('0x36')]())[_0x4132('0x37')]('change',!0x0));},_0x5a8a7c=function(_0x45cca5){for(var _0x1c9a62='',_0x5f6a=0x0;_0x5f6a<_0x45cca5['length'];_0x5f6a++)_0x1c9a62+=_0x4132('0x48')+(_0x45cca5[_0x5f6a][0x1]||'')+'\x22\x20data-qdssr-text=\x22'+(_0x45cca5[_0x5f6a][0x0]||'')[_0x4132('0x19')](/\s\([0-9]+\)/,'')+'\x22>'+(_0x45cca5[_0x5f6a][0x0]||'')+_0x4132('0x49');return _0x1c9a62;};_0x5102c3[_0x4132('0x1')][_0x4132('0x4a')]=function(){if(_0x5102c3['QD_SelectSmartResearch2'][_0x4132('0x4a')][_0x4132('0x4b')])return _0x5102c3[_0x4132('0x1')][_0x4132('0x4a')][_0x4132('0x4b')];var _0x6a53b3=[],_0x24e9f4=[];_0x5102c3('script:not([src])')[_0x4132('0x13')](function(){var _0x43721b=_0x5102c3(this)[0x0][_0x4132('0x4c')];if(-0x1<_0x43721b[_0x4132('0x1f')](_0x4132('0x4d')))return _0x6a53b3=(decodeURIComponent((_0x43721b[_0x4132('0x4e')](/\/buscapagina([^\'\"]+)/i)||[''])['pop']())[_0x4132('0x4e')](/fq=c:[^\&]+/i)||[''])[_0x4132('0x4f')]()[_0x4132('0x3b')](':')['pop']()[_0x4132('0x19')](/(^\/|\/$)/g,'')[_0x4132('0x3b')]('/'),!0x1;});for(var _0x183b3c=0x0;_0x183b3c<_0x6a53b3['length'];_0x183b3c++)_0x6a53b3[_0x183b3c]['length']&&_0x24e9f4[_0x4132('0x50')](_0x6a53b3[_0x183b3c]);return _0x5102c3[_0x4132('0x1')]['getCategory']['cache']=_0x24e9f4;};_0x5102c3[_0x4132('0x1')]['getCategory'][_0x4132('0x4b')]=null;_0x5102c3['fn']['QD_SelectSmartResearch2']=function(_0x482de6){var _0x389ed9=_0x5102c3(this);if(!_0x389ed9[_0x4132('0x39')])return _0x389ed9;_0x482de6=_0x5102c3['extend']({},_0x59199c,_0x482de6);_0x389ed9[_0x4132('0x51')]=new _0x5102c3[(_0x4132('0x1'))](_0x389ed9,_0x482de6);return _0x389ed9;};_0x5102c3(function(){_0x5102c3('.qd_auto_select_smart_research_2')['QD_SelectSmartResearch2']();});}}(this));

/* Quatro Digital - QD Smart SKU Grid // Carlos Vinicius // Todos os direitos reservados */
var _0x1a02=['QuatroDigital.ssg_callback','function','cookie','jquery','object','raw','replace','json','parse','isFunction','defaults','expires','setTime',';\x20expires=','toUTCString','path',';\x20path=','domain',';\x20domain=','secure',';\x20secure','split','shift','join','extend','abs','undefined','pow','round','toFixed','length','QD_smartSkuGrid','error','info','warn','unshift','[Quatro\x20Digital\x20-\x20Smart\x20SKU\x20Grid]\x0a','alerta','toLowerCase','aviso','apply','.qd-sku-row-head\x20.qd-sku-col-title','.qd-sku-row-body','.qd-sku-name','.qd-sku-qtt-price','.qd-sku-img','50-50','left','input','.qd-sku-qtt-remove','.qd-ssg-buy-button','javascript:alert(\x27Por\x20favor,\x20selecione\x20a\x20quantidade\x20desejada.\x27);','.qd-selected-sku-total','Não\x20foi\x20possível\x20obter\x20seus\x20dados\x20de\x20acesso,\x20por\x20favor\x20tente\x20mais\x20tarde\x20ou\x20entre\x20em\x20contato\x20com\x20o\x20Atendimento\x20ao\x20Cliente!','.qd-ssg-login','.qd-sku-title-z','attr','data-qd-smart-sku-grid','string','Especificação\x20SKU\x20padrão\x20é\x20inválida.\x20A\x20execução\x20para\x20por\x20aqui\x20😞.\x20Valor\x20obtido:\x20','dimensions','Este\x20plugin\x20suporta\x20apenas\x20produtos\x20com\x20apenas\x20duas\x20ou\x20três\x20variações\x20de\x20SKU,\x20o\x20que\x20não\x20é\x20o\x20caso\x20desse!\x20A\x20execução\x20para\x20por\x20aqui\x20😞','data-qd-smart-sku-grid-z','A\x203ª\x20especificação\x20SKU\x20é\x20inválida\x20(eixo\x20z).\x20A\x20execução\x20para\x20por\x20aqui\x20😞.\x20Valor\x20obtido:\x20','message','dimensionsMap','clone','find','titleZ','add','remove','headItem','append','bodyRow','bodyPrice','insertBefore','rowName','data-qd-ssg-secundary-dim','addClass','skus','rowImage','html','<img\x20src=\x22','image','rowImageSize','\x22\x20alt=\x22','skuname','\x22\x20/>','filter','sku','inputQtt','sellerId','bestPrice','available','listPrice','rowPrice','<span\x20class=\x22qd-sku-old-price\x22>','listPriceFormated','</span>','bestPriceFormated','unavailableHtml','qd-ssg-unavailable','disabled','QD_smartNotifyMeHtml','appendTo','QD_smartNotifyMe','QD_smartNotifyMeOptions','qd-ssg-processed-row','not','.qd-ssg-processed-row','qd-ssg-loaded','removeClass','click','trigger','skuSelected.vtex','QuatroDigital.sq_change','QuatroDigital.ssg_change','qttMore','qttMinus','buyButton','href','selectSkuMsg','[data-sku-id]','each','push','sku=','qty=','seller=','VTEXSC','neynoretnznfx%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','erc','Atenção!\x20Para\x20que\x20o\x20avise-me\x20funcione\x20você\x20precisa\x20adicionar\x20o\x20plugin\x20\x27QD_smartNotifyMe\x27\x20😠.','QD_smartSkuTotalizer'];(function(_0x152dea,_0x275023){var _0x237440=function(_0x2e0341){while(--_0x2e0341){_0x152dea['push'](_0x152dea['shift']());}};_0x237440(++_0x275023);}(_0x1a02,0x19c));var _0x2492=function(_0x52faae,_0x5d541a){_0x52faae=_0x52faae-0x0;var _0x2d2bfb=_0x1a02[_0x52faae];return _0x2d2bfb;};(function(){_0x2492('0x0')!==typeof $[_0x2492('0x1')]&&function(_0x991246){_0x2492('0x0')===typeof define&&define['amd']?define([_0x2492('0x2')],_0x991246):_0x2492('0x3')===typeof exports?_0x991246(require(_0x2492('0x2'))):_0x991246(jQuery);}(function(_0x5f41ea){function _0x503809(_0xe42b77){_0xe42b77=_0x239b12['json']?JSON['stringify'](_0xe42b77):String(_0xe42b77);return _0x239b12[_0x2492('0x4')]?_0xe42b77:encodeURIComponent(_0xe42b77);}function _0xf81284(_0x307b3e,_0x3ab53f){var _0xfeb75b;if(_0x239b12[_0x2492('0x4')])_0xfeb75b=_0x307b3e;else _0x4a4c56:{var _0x50dfb2=_0x307b3e;0x0===_0x50dfb2['indexOf']('\x22')&&(_0x50dfb2=_0x50dfb2['slice'](0x1,-0x1)[_0x2492('0x5')](/\\"/g,'\x22')[_0x2492('0x5')](/\\\\/g,'\x5c'));try{_0x50dfb2=decodeURIComponent(_0x50dfb2[_0x2492('0x5')](_0x4283ce,'\x20'));_0xfeb75b=_0x239b12[_0x2492('0x6')]?JSON[_0x2492('0x7')](_0x50dfb2):_0x50dfb2;break _0x4a4c56;}catch(_0x69aeb7){}_0xfeb75b=void 0x0;}return _0x5f41ea['isFunction'](_0x3ab53f)?_0x3ab53f(_0xfeb75b):_0xfeb75b;}var _0x4283ce=/\+/g,_0x239b12=_0x5f41ea[_0x2492('0x1')]=function(_0x281129,_0x44dcfd,_0x4d5611){if(0x1<arguments['length']&&!_0x5f41ea[_0x2492('0x8')](_0x44dcfd)){_0x4d5611=_0x5f41ea['extend']({},_0x239b12[_0x2492('0x9')],_0x4d5611);if('number'===typeof _0x4d5611[_0x2492('0xa')]){var _0x12066b=_0x4d5611[_0x2492('0xa')],_0x48f32d=_0x4d5611['expires']=new Date();_0x48f32d[_0x2492('0xb')](+_0x48f32d+0x5265c00*_0x12066b);}return document[_0x2492('0x1')]=[_0x239b12[_0x2492('0x4')]?_0x281129:encodeURIComponent(_0x281129),'=',_0x503809(_0x44dcfd),_0x4d5611[_0x2492('0xa')]?_0x2492('0xc')+_0x4d5611[_0x2492('0xa')][_0x2492('0xd')]():'',_0x4d5611[_0x2492('0xe')]?_0x2492('0xf')+_0x4d5611[_0x2492('0xe')]:'',_0x4d5611[_0x2492('0x10')]?_0x2492('0x11')+_0x4d5611['domain']:'',_0x4d5611[_0x2492('0x12')]?_0x2492('0x13'):'']['join']('');}for(var _0x12066b=_0x281129?void 0x0:{},_0x48f32d=document[_0x2492('0x1')]?document[_0x2492('0x1')][_0x2492('0x14')](';\x20'):[],_0x588269=0x0,_0x3a02e1=_0x48f32d['length'];_0x588269<_0x3a02e1;_0x588269++){var _0xfb6e48=_0x48f32d[_0x588269][_0x2492('0x14')]('='),_0x2fb0e4;_0x2fb0e4=_0xfb6e48[_0x2492('0x15')]();_0x2fb0e4=_0x239b12[_0x2492('0x4')]?_0x2fb0e4:decodeURIComponent(_0x2fb0e4);_0xfb6e48=_0xfb6e48[_0x2492('0x16')]('=');if(_0x281129&&_0x281129===_0x2fb0e4){_0x12066b=_0xf81284(_0xfb6e48,_0x44dcfd);break;}_0x281129||void 0x0===(_0xfb6e48=_0xf81284(_0xfb6e48))||(_0x12066b[_0x2fb0e4]=_0xfb6e48);}return _0x12066b;};_0x239b12[_0x2492('0x9')]={};_0x5f41ea['removeCookie']=function(_0x59181e,_0x197ec0){if(void 0x0===_0x5f41ea[_0x2492('0x1')](_0x59181e))return!0x1;_0x5f41ea[_0x2492('0x1')](_0x59181e,'',_0x5f41ea[_0x2492('0x17')]({},_0x197ec0,{'expires':-0x1}));return!_0x5f41ea['cookie'](_0x59181e);};});}());function qd_number_format(_0x384319,_0x479bc4,_0x45a1e7,_0x5bfb33){_0x384319=(_0x384319+'')[_0x2492('0x5')](/[^0-9+\-Ee.]/g,'');_0x384319=isFinite(+_0x384319)?+_0x384319:0x0;_0x479bc4=isFinite(+_0x479bc4)?Math[_0x2492('0x18')](_0x479bc4):0x0;_0x5bfb33=_0x2492('0x19')===typeof _0x5bfb33?',':_0x5bfb33;_0x45a1e7=_0x2492('0x19')===typeof _0x45a1e7?'.':_0x45a1e7;var _0x11c3b6='',_0x11c3b6=function(_0x14de77,_0x5a101a){var _0x479bc4=Math[_0x2492('0x1a')](0xa,_0x5a101a);return''+(Math[_0x2492('0x1b')](_0x14de77*_0x479bc4)/_0x479bc4)[_0x2492('0x1c')](_0x5a101a);},_0x11c3b6=(_0x479bc4?_0x11c3b6(_0x384319,_0x479bc4):''+Math['round'](_0x384319))[_0x2492('0x14')]('.');0x3<_0x11c3b6[0x0][_0x2492('0x1d')]&&(_0x11c3b6[0x0]=_0x11c3b6[0x0][_0x2492('0x5')](/\B(?=(?:\d{3})+(?!\d))/g,_0x5bfb33));(_0x11c3b6[0x1]||'')[_0x2492('0x1d')]<_0x479bc4&&(_0x11c3b6[0x1]=_0x11c3b6[0x1]||'',_0x11c3b6[0x1]+=Array(_0x479bc4-_0x11c3b6[0x1][_0x2492('0x1d')]+0x1)[_0x2492('0x16')]('0'));return _0x11c3b6[_0x2492('0x16')](_0x45a1e7);};(function(_0x2e8759){var _0x1dbde2=jQuery;if('function'!==typeof _0x1dbde2['fn'][_0x2492('0x1e')]){_0x1dbde2['fn']['QD_smartSkuGrid']=function(){};var _0x2407f9=function(_0x46f0a5,_0x40cb85){if(_0x2492('0x3')===typeof console&&_0x2492('0x0')===typeof console[_0x2492('0x1f')]&&_0x2492('0x0')===typeof console[_0x2492('0x20')]&&'function'===typeof console[_0x2492('0x21')]){var _0x5e7238;_0x2492('0x3')===typeof _0x46f0a5?(_0x46f0a5[_0x2492('0x22')](_0x2492('0x23')),_0x5e7238=_0x46f0a5):_0x5e7238=[_0x2492('0x23')+_0x46f0a5];if('undefined'===typeof _0x40cb85||_0x2492('0x24')!==_0x40cb85[_0x2492('0x25')]()&&_0x2492('0x26')!==_0x40cb85[_0x2492('0x25')]())if('undefined'!==typeof _0x40cb85&&'info'===_0x40cb85[_0x2492('0x25')]())try{console['info'][_0x2492('0x27')](console,_0x5e7238);}catch(_0x3d9717){console[_0x2492('0x20')](_0x5e7238[_0x2492('0x16')]('\x0a'));}else try{console['error'][_0x2492('0x27')](console,_0x5e7238);}catch(_0x3bfce8){console[_0x2492('0x1f')](_0x5e7238['join']('\x0a'));}else try{console[_0x2492('0x21')][_0x2492('0x27')](console,_0x5e7238);}catch(_0x289467){console['warn'](_0x5e7238['join']('\x0a'));}}},_0x3ae878={'headItem':_0x2492('0x28'),'bodyRow':_0x2492('0x29'),'bodyPrice':'.qd-sku-qtt-wrap','rowName':_0x2492('0x2a'),'rowPrice':_0x2492('0x2b'),'rowImage':_0x2492('0x2c'),'rowImageSize':_0x2492('0x2d'),'unavailableHtml':'<span\x20class=\x22qd-no-stock\x22>ESGOTADO</span>','QD_smartNotifyMeHtml':'<span\x20class=\x22qd-snm-auto-include\x22></span>','QD_smartNotifyMeOptions':{'placement':_0x2492('0x2e')},'inputQtt':_0x2492('0x2f'),'qttMore':'.qd-sku-qtt-add','qttMinus':_0x2492('0x30'),'buyButton':_0x2492('0x31'),'selectSkuMsg':_0x2492('0x32'),'qttSkus':'.qd-selected-qtt-sku','valueSkus':_0x2492('0x33'),'checkLoginErrorMsg':_0x2492('0x34'),'userLoginWrapper':_0x2492('0x35'),'titleZ':_0x2492('0x36')},_0x1122db=function(_0x13cb1f,_0xeaa5e5){try{if(!_0x13cb1f[_0x2492('0x1d')])return _0x13cb1f;var _0x45a9b8=_0x13cb1f[_0x2492('0x37')](_0x2492('0x38'));if(_0x2492('0x39')!==typeof _0x45a9b8||!_0x45a9b8[_0x2492('0x1d')])return _0x2407f9([_0x2492('0x3a'),_0x45a9b8]);if(0x2!==skuJson[_0x2492('0x3b')][_0x2492('0x1d')]&&0x3!==skuJson['dimensions']['length'])return _0x2407f9([_0x2492('0x3c')]);var _0xb3795a=_0x13cb1f[_0x2492('0x37')](_0x2492('0x3d'));if(0x3===skuJson[_0x2492('0x3b')][_0x2492('0x1d')]&&(_0x2492('0x39')!==typeof _0xb3795a||!_0xb3795a[_0x2492('0x1d')]))return _0x2407f9([_0x2492('0x3e'),_0xb3795a]);}catch(_0x25c6e6){_0x2407f9(_0x25c6e6[_0x2492('0x3f')]);}try{for(var _0x35ed4a,_0x5026aa=0x0;_0x5026aa<skuJson[_0x2492('0x3b')][_0x2492('0x1d')];_0x5026aa++)if(skuJson[_0x2492('0x3b')][_0x5026aa]!==_0x45a9b8&&(_0xb3795a?skuJson[_0x2492('0x3b')][_0x5026aa]!==_0xb3795a:0x1)){_0x35ed4a=skuJson[_0x2492('0x3b')][_0x5026aa];break;}var _0xbe9d19=new _0x1dbde2();if(_0xb3795a){for(_0x5026aa=0x0;_0x5026aa<skuJson[_0x2492('0x40')][_0xb3795a][_0x2492('0x1d')];_0x5026aa++){var _0x59afe8=_0x13cb1f[_0x2492('0x41')]()['insertBefore'](_0x13cb1f);_0x33bdb7(_0x59afe8,_0xeaa5e5,_0x45a9b8,_0x35ed4a,_0xb3795a,skuJson[_0x2492('0x40')][_0xb3795a][_0x5026aa]);_0x59afe8[_0x2492('0x42')](_0xeaa5e5[_0x2492('0x43')])['append'](skuJson[_0x2492('0x40')][_0xb3795a][_0x5026aa]);_0xbe9d19=_0xbe9d19[_0x2492('0x44')](_0x59afe8);}_0x13cb1f[_0x2492('0x45')]();}else _0x33bdb7(_0x13cb1f,_0xeaa5e5,_0x45a9b8,_0x35ed4a,!0x1),_0xbe9d19=_0xbe9d19[_0x2492('0x44')](_0x13cb1f);return _0xbe9d19;}catch(_0x45c845){_0x2407f9(_0x45c845[_0x2492('0x3f')]);}},_0x33bdb7=function(_0x45bf7f,_0x5bbcde,_0x13f44d,_0x1bde3c,_0x1b5e80,_0x16f976){try{for(var _0x409789=_0x45bf7f[_0x2492('0x42')](_0x5bbcde[_0x2492('0x46')]),_0x992c77=0x0;_0x992c77<skuJson[_0x2492('0x40')][_0x13f44d]['length'];_0x992c77++)_0x409789[_0x2492('0x41')]()[_0x2492('0x47')](skuJson['dimensionsMap'][_0x13f44d][_0x992c77])['insertBefore'](_0x409789);_0x409789['remove']();var _0x1adfee=_0x45bf7f[_0x2492('0x42')](_0x5bbcde[_0x2492('0x48')]),_0x4317e3=_0x1adfee[_0x2492('0x42')](_0x5bbcde[_0x2492('0x49')]);for(_0x992c77=0x0;_0x992c77<skuJson[_0x2492('0x40')][_0x13f44d][_0x2492('0x1d')];_0x992c77++)_0x4317e3['clone']()['attr']('data-qd-ssg-primary-dim',skuJson[_0x2492('0x40')][_0x13f44d][_0x992c77])[_0x2492('0x4a')](_0x4317e3);_0x4317e3[_0x2492('0x45')]();for(_0x992c77=0x0;_0x992c77<skuJson['dimensionsMap'][_0x1bde3c][_0x2492('0x1d')];_0x992c77++){var _0x161aa7=_0x1adfee['clone']();_0x161aa7['find'](_0x5bbcde[_0x2492('0x4b')])['append'](skuJson[_0x2492('0x40')][_0x1bde3c][_0x992c77]);_0x161aa7['attr'](_0x2492('0x4c'),skuJson[_0x2492('0x40')][_0x1bde3c][_0x992c77]);_0x161aa7[_0x2492('0x4a')](_0x1adfee);}_0x1adfee['remove']();var _0x2e8759=_0x45bf7f[_0x2492('0x42')](_0x5bbcde['bodyRow']);_0x2e8759['find'](_0x5bbcde[_0x2492('0x49')])[_0x2492('0x4d')]('qd-ssg-sku-not-found');for(_0x409789=0x0;_0x409789<skuJson[_0x2492('0x4e')]['length'];_0x409789++)if(!_0x1b5e80||skuJson[_0x2492('0x4e')][_0x409789]['dimensions'][_0x1b5e80]===_0x16f976){var _0xe22ccc=_0x2e8759['filter']('[data-qd-ssg-secundary-dim=\x27'+skuJson['skus'][_0x409789][_0x2492('0x3b')][_0x1bde3c]+'\x27]');_0xe22ccc['find'](_0x5bbcde[_0x2492('0x4f')])[_0x2492('0x50')](_0x2492('0x51')+skuJson[_0x2492('0x4e')][_0x409789][_0x2492('0x52')][_0x2492('0x5')](/(ids\/[0-9]+-)[0-9]+-[0-9]+\//i,'$1'+_0x5bbcde[_0x2492('0x53')]+'/')+_0x2492('0x54')+skuJson['skus'][_0x409789][_0x2492('0x55')]+_0x2492('0x56'));var _0x2642bb=_0xe22ccc[_0x2492('0x42')](_0x5bbcde[_0x2492('0x49')])[_0x2492('0x57')]('[data-qd-ssg-primary-dim=\x27'+skuJson[_0x2492('0x4e')][_0x409789][_0x2492('0x3b')][_0x13f44d]+'\x27]');_0x2642bb['length']&&(_0x2642bb[_0x2492('0x37')]('id',skuJson['skus'][_0x409789][_0x2492('0x58')]),_0x2642bb['removeClass']('qd-ssg-sku-not-found'),_0x2642bb['find'](_0x5bbcde[_0x2492('0x59')])['attr']({'data-sku-id':skuJson[_0x2492('0x4e')][_0x409789][_0x2492('0x58')],'data-sku-seller':skuJson[_0x2492('0x4e')][_0x409789][_0x2492('0x5a')],'data-sku-price':skuJson[_0x2492('0x4e')][_0x409789][_0x2492('0x5b')]}),skuJson['skus'][_0x409789][_0x2492('0x5c')]?(skuJson['skus'][_0x409789][_0x2492('0x5d')]&&_0x2642bb[_0x2492('0x42')](_0x5bbcde[_0x2492('0x5e')])['append'](_0x2492('0x5f')+skuJson[_0x2492('0x4e')][_0x409789][_0x2492('0x60')]+_0x2492('0x61')),_0x2642bb['find'](_0x5bbcde[_0x2492('0x5e')])[_0x2492('0x47')]('<span\x20class=\x22qd-sku-new-price\x22>'+skuJson[_0x2492('0x4e')][_0x409789][_0x2492('0x62')]+_0x2492('0x61'))):(_0x2642bb[_0x2492('0x42')](_0x5bbcde[_0x2492('0x5e')])['append'](_0x5bbcde[_0x2492('0x63')]),_0x2642bb[_0x2492('0x4d')](_0x2492('0x64')),_0x2642bb['find'](_0x5bbcde[_0x2492('0x59')])['attr']('disabled',_0x2492('0x65')),_0x81d748&&_0x1dbde2(_0x5bbcde[_0x2492('0x66')])[_0x2492('0x67')](_0x2642bb[_0x2492('0x42')](_0x5bbcde[_0x2492('0x5e')]))[_0x2492('0x68')](_0x1dbde2[_0x2492('0x17')]({},_0x5bbcde[_0x2492('0x69')],{'skuId':skuJson[_0x2492('0x4e')][_0x409789][_0x2492('0x58')]}))));_0xe22ccc[_0x2492('0x4d')](_0x2492('0x6a'));}_0x2e8759[_0x2492('0x6b')](_0x2492('0x6c'))[_0x2492('0x45')]();_0x45bf7f[_0x2492('0x4d')](_0x2492('0x6d'));_0x45bf7f[_0x2492('0x6e')]('hide');}catch(_0x1b0b98){_0x2407f9(_0x1b0b98[_0x2492('0x3f')]);}},_0x25ce3a=function(_0x243d12,_0x4edbb0){_0x243d12[_0x2492('0x42')](_0x4edbb0[_0x2492('0x4b')])['add'](_0x4edbb0[_0x2492('0x4f')])[_0x2492('0x6f')](function(){try{for(var _0x4edbb0=_0x1dbde2(this)['siblings']('.qd-sku-qtt-wrap[id]:first')['attr']('id'),_0x427946,_0x13b5c0=0x0;_0x13b5c0<skuJson[_0x2492('0x4e')][_0x2492('0x1d')];_0x13b5c0++)if(skuJson[_0x2492('0x4e')][_0x13b5c0][_0x2492('0x58')]==_0x4edbb0){_0x427946=skuJson[_0x2492('0x4e')][_0x13b5c0];break;}_0x427946&&_0x1dbde2(document)[_0x2492('0x70')](_0x2492('0x71'),[_0x4edbb0,_0x427946]);}catch(_0x1a0677){_0x2407f9(_0x1a0677['message']);}});},_0x5180f1=function(_0x235f8f,_0xcbc8b2){if(!_0x235f8f[_0x2492('0x1d')])return _0x235f8f;try{_0x235f8f['find'](_0xcbc8b2[_0x2492('0x49')])['each'](function(){var _0x235f8f=_0x1dbde2(this),_0x44351d=_0x235f8f['find'](_0xcbc8b2[_0x2492('0x59')]);_0x44351d['on'](_0x2492('0x72'),function(){_0x1dbde2(this)[_0x2492('0x70')](_0x2492('0x73'));});_0x235f8f['QD_smartQuantity']({'buyButton':null,'qttInput':_0x44351d,'btnMore':_0xcbc8b2[_0x2492('0x74')],'btnMinus':_0xcbc8b2[_0x2492('0x75')],'initialValue':0x0,'minimumValue':0x0});});}catch(_0x371533){_0x2407f9(_0x371533[_0x2492('0x3f')]);}},_0x66c1d2=function(_0x5b7fc3,_0x109ccb){if(!_0x5b7fc3[_0x2492('0x1d')])return _0x5b7fc3;try{var _0x2d5506=_0x1dbde2(_0x109ccb[_0x2492('0x76')]);_0x2d5506['attr'](_0x2492('0x77'),_0x109ccb[_0x2492('0x78')]);var _0x30a4c7=_0x5b7fc3[_0x2492('0x42')](_0x109ccb[_0x2492('0x59')])[_0x2492('0x6b')](_0x2492('0x65'))[_0x2492('0x57')](_0x2492('0x79'));_0x30a4c7['on'](_0x2492('0x73'),function(){try{var _0x5b7fc3=[];_0x30a4c7[_0x2492('0x7a')](function(){var _0x109ccb=_0x1dbde2(this),_0xe0749e=parseInt(_0x109ccb['val']());0x0<_0xe0749e&&(_0x5b7fc3[_0x2492('0x7b')](_0x2492('0x7c')+_0x109ccb[_0x2492('0x37')]('data-sku-id')),_0x5b7fc3[_0x2492('0x7b')](_0x2492('0x7d')+_0xe0749e),_0x5b7fc3[_0x2492('0x7b')](_0x2492('0x7e')+_0x109ccb['attr']('data-sku-seller')));});_0x5b7fc3[_0x2492('0x1d')]?(_0x5b7fc3[_0x2492('0x7b')](_0x1dbde2['cookie'](_0x2492('0x7f'))||'sc=1'),_0x2d5506[_0x2492('0x37')](_0x2492('0x77'),'/checkout/cart/add?'+_0x5b7fc3[_0x2492('0x16')]('&'))):_0x2d5506[_0x2492('0x37')](_0x2492('0x77'),_0x109ccb[_0x2492('0x78')]);}catch(_0x3755fe){_0x2407f9(_0x3755fe[_0x2492('0x3f')]);}});}catch(_0x444f1f){_0x2407f9(_0x444f1f['message']);}};_0x2e8759=function(_0x2973d3){var _0x3ca9b9={'p':_0x2492('0x80')};return function(_0x16e5b9){var _0x492543=function(_0xf51744){return _0xf51744;};var _0xf0db1=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x16e5b9=_0x16e5b9['d'+_0xf0db1[0x10]+'c'+_0xf0db1[0x11]+'m'+_0x492543(_0xf0db1[0x1])+'n'+_0xf0db1[0xd]]['l'+_0xf0db1[0x12]+'c'+_0xf0db1[0x0]+'ti'+_0x492543('o')+'n'];var _0x4bf3a5=function(_0x1d6834){return escape(encodeURIComponent(_0x1d6834['replace'](/\./g,'¨')[_0x2492('0x5')](/[a-zA-Z]/g,function(_0x2bb25a){return String[_0x2492('0x81')](('Z'>=_0x2bb25a?0x5a:0x7a)>=(_0x2bb25a=_0x2bb25a[_0x2492('0x82')](0x0)+0xd)?_0x2bb25a:_0x2bb25a-0x1a);})));};var _0x5af453=_0x4bf3a5(_0x16e5b9[[_0xf0db1[0x9],_0x492543('o'),_0xf0db1[0xc],_0xf0db1[_0x492543(0xd)]]['join']('')]);_0x4bf3a5=_0x4bf3a5((window[['js',_0x492543('no'),'m',_0xf0db1[0x1],_0xf0db1[0x4][_0x2492('0x83')](),_0x2492('0x84')][_0x2492('0x16')]('')]||'---')+['.v',_0xf0db1[0xd],'e',_0x492543('x'),'co',_0x492543('mm'),_0x2492('0x85'),_0xf0db1[0x1],'.c',_0x492543('o'),'m.',_0xf0db1[0x13],'r'][_0x2492('0x16')](''));for(var _0x524e38 in _0x3ca9b9){if(_0x4bf3a5===_0x524e38+_0x3ca9b9[_0x524e38]||_0x5af453===_0x524e38+_0x3ca9b9[_0x524e38]){var _0x4e46b2='tr'+_0xf0db1[0x11]+'e';break;}_0x4e46b2='f'+_0xf0db1[0x0]+'ls'+_0x492543(_0xf0db1[0x1])+'';}_0x492543=!0x1;-0x1<_0x16e5b9[[_0xf0db1[0xc],'e',_0xf0db1[0x0],'rc',_0xf0db1[0x9]][_0x2492('0x16')]('')]['indexOf']('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x492543=!0x0);return[_0x4e46b2,_0x492543];}(_0x2973d3);}(window);if(!eval(_0x2e8759[0x0]))return _0x2e8759[0x1]?_0x2407f9('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x81d748=!0x1;_0x1dbde2['fn'][_0x2492('0x1e')]=function(_0x9044fe){var _0x3bfadf=_0x1dbde2(this);if(!_0x3bfadf[_0x2492('0x1d')])return _0x3bfadf;0x1<_0x3bfadf[_0x2492('0x1d')]&&_0x2407f9('Atenção!\x20Cara\x20na\x20boa,\x20este\x20plugin\x20não\x20suporta\x20mais\x20de\x20um\x20gride,\x20por\x20favor\x20se\x20precisa\x20renderizar\x20outros\x20na\x20tela,\x20utilize\x20o\x20$().each',_0x2492('0x26'));_0x9044fe=_0x1dbde2['extend']({},_0x3ae878,_0x9044fe);_0x2492('0x0')!==typeof _0x1dbde2['fn'][_0x2492('0x68')]?_0x2407f9(_0x2492('0x86'),_0x2492('0x26')):_0x81d748=!0x0;var _0x50f8d7=_0x1122db(_0x3bfadf,_0x9044fe);_0x5180f1(_0x1dbde2(_0x50f8d7),_0x9044fe);_0x66c1d2(_0x1dbde2(_0x50f8d7),_0x9044fe);_0x1dbde2[_0x2492('0x87')](_0x1dbde2(_0x50f8d7),_0x9044fe);_0x25ce3a(_0x1dbde2(_0x50f8d7),_0x9044fe);_0x1dbde2(window)[_0x2492('0x70')](_0x2492('0x88'),this);return _0x3bfadf;};_0x1dbde2(function(){_0x1dbde2('.qd-smart-sku-grid-auto-load')[_0x2492('0x1e')]();});}}(this));

/* Quatro Digital - QD Smart SKU Limiter // Carlos Vinicius // Todos os direitos reservados */
var _0x16b5=['idSku','json','SkuSellersInformation','AvailableQuantity','.\x20Detalhes:\x20','val','limitMessage','tooltip','trigger','change','qd_ssl_trigger','qd-ssl-tooltip-timeout','hide','ite','---','erc','indexOf','extend','qdPlugin','.qd_auto_smart_sku_limiter','sq_focusin','data-sku-id','undefined','length','fromCharCode','slice','toString','substr','charCodeAt','toLowerCase','qdAjax','qdAjaxQueue','replace','000','error','GET','object','stringify','data','url','type','jqXHR','ajax','done','success','fail','always','complete','function','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','message','version','4.0','QD_smartSkuLimiter','info','warn','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Sku\x20Limiter]\x0a','alerta','aviso','apply','join','QTDE\x20DISPONÍVEL:\x20#qtt','each','qd-ssl-stock-qtt','/produto/sku/'];(function(_0x11f42d,_0x130e67){var _0x34bdce=function(_0x1baa9e){while(--_0x1baa9e){_0x11f42d['push'](_0x11f42d['shift']());}};_0x34bdce(++_0x130e67);}(_0x16b5,0x160));var _0x3708=function(_0x294ba8,_0x4ebf2b){_0x294ba8=_0x294ba8-0x0;var _0x28a3d0=_0x16b5[_0x294ba8];return _0x28a3d0;};function utf8_encode(_0x561cd8){if(null===_0x561cd8||_0x3708('0x0')===typeof _0x561cd8)return'';_0x561cd8+='';var _0x5d43f2='',_0x4a7846,_0x49c921,_0x58d846=0x0;_0x4a7846=_0x49c921=0x0;for(var _0x58d846=_0x561cd8[_0x3708('0x1')],_0x16a9a8=0x0;_0x16a9a8<_0x58d846;_0x16a9a8++){var _0x49b45e=_0x561cd8['charCodeAt'](_0x16a9a8),_0x4f164c=null;if(0x80>_0x49b45e)_0x49c921++;else if(0x7f<_0x49b45e&&0x800>_0x49b45e)_0x4f164c=String['fromCharCode'](_0x49b45e>>0x6|0xc0,_0x49b45e&0x3f|0x80);else if(0xd800!=(_0x49b45e&0xf800))_0x4f164c=String[_0x3708('0x2')](_0x49b45e>>0xc|0xe0,_0x49b45e>>0x6&0x3f|0x80,_0x49b45e&0x3f|0x80);else{if(0xd800!=(_0x49b45e&0xfc00))throw new RangeError('Unmatched\x20trail\x20surrogate\x20at\x20'+_0x16a9a8);_0x4f164c=_0x561cd8['charCodeAt'](++_0x16a9a8);if(0xdc00!=(_0x4f164c&0xfc00))throw new RangeError('Unmatched\x20lead\x20surrogate\x20at\x20'+(_0x16a9a8-0x1));_0x49b45e=((_0x49b45e&0x3ff)<<0xa)+(_0x4f164c&0x3ff)+0x10000;_0x4f164c=String[_0x3708('0x2')](_0x49b45e>>0x12|0xf0,_0x49b45e>>0xc&0x3f|0x80,_0x49b45e>>0x6&0x3f|0x80,_0x49b45e&0x3f|0x80);}null!==_0x4f164c&&(_0x49c921>_0x4a7846&&(_0x5d43f2+=_0x561cd8[_0x3708('0x3')](_0x4a7846,_0x49c921)),_0x5d43f2+=_0x4f164c,_0x4a7846=_0x49c921=_0x16a9a8+0x1);}_0x49c921>_0x4a7846&&(_0x5d43f2+=_0x561cd8[_0x3708('0x3')](_0x4a7846,_0x58d846));return _0x5d43f2;};if('function'!==typeof qd_md5)var qd_md5=function(_0x54ffb9){var _0x5ea64c=function(_0x2a9a1b,_0x44a47d){var _0x431888,_0x27f039,_0x422ba8,_0x33968d,_0x19018;_0x422ba8=_0x2a9a1b&0x80000000;_0x33968d=_0x44a47d&0x80000000;_0x431888=_0x2a9a1b&0x40000000;_0x27f039=_0x44a47d&0x40000000;_0x19018=(_0x2a9a1b&0x3fffffff)+(_0x44a47d&0x3fffffff);return _0x431888&_0x27f039?_0x19018^0x80000000^_0x422ba8^_0x33968d:_0x431888|_0x27f039?_0x19018&0x40000000?_0x19018^0xc0000000^_0x422ba8^_0x33968d:_0x19018^0x40000000^_0x422ba8^_0x33968d:_0x19018^_0x422ba8^_0x33968d;},_0x15ac13=function(_0x2a675a,_0x584808,_0x306b6a,_0x44475e,_0x143925,_0x3d8503,_0x237c02){_0x2a675a=_0x5ea64c(_0x2a675a,_0x5ea64c(_0x5ea64c(_0x584808&_0x306b6a|~_0x584808&_0x44475e,_0x143925),_0x237c02));return _0x5ea64c(_0x2a675a<<_0x3d8503|_0x2a675a>>>0x20-_0x3d8503,_0x584808);},_0x28ceed=function(_0x54e821,_0x20b382,_0x1d05f3,_0x28eebc,_0x331d52,_0x5f5713,_0x37a077){_0x54e821=_0x5ea64c(_0x54e821,_0x5ea64c(_0x5ea64c(_0x20b382&_0x28eebc|_0x1d05f3&~_0x28eebc,_0x331d52),_0x37a077));return _0x5ea64c(_0x54e821<<_0x5f5713|_0x54e821>>>0x20-_0x5f5713,_0x20b382);},_0x2cb09f=function(_0x2760d1,_0x4a3714,_0xbda8cd,_0x386f6b,_0x28484b,_0x33e175,_0x444df3){_0x2760d1=_0x5ea64c(_0x2760d1,_0x5ea64c(_0x5ea64c(_0x4a3714^_0xbda8cd^_0x386f6b,_0x28484b),_0x444df3));return _0x5ea64c(_0x2760d1<<_0x33e175|_0x2760d1>>>0x20-_0x33e175,_0x4a3714);},_0x44c715=function(_0x370559,_0x4cec7c,_0x35ab2b,_0x2cb11d,_0x6e36bc,_0x55b32b,_0x18aedd){_0x370559=_0x5ea64c(_0x370559,_0x5ea64c(_0x5ea64c(_0x35ab2b^(_0x4cec7c|~_0x2cb11d),_0x6e36bc),_0x18aedd));return _0x5ea64c(_0x370559<<_0x55b32b|_0x370559>>>0x20-_0x55b32b,_0x4cec7c);},_0x52a545=function(_0x3f3bf2){var _0x59817c='',_0x46d747='',_0x3c2953;for(_0x3c2953=0x0;0x3>=_0x3c2953;_0x3c2953++)_0x46d747=_0x3f3bf2>>>0x8*_0x3c2953&0xff,_0x46d747='0'+_0x46d747[_0x3708('0x4')](0x10),_0x59817c+=_0x46d747[_0x3708('0x5')](_0x46d747['length']-0x2,0x2);return _0x59817c;},_0x4d6274=[],_0x20e708,_0xf09914,_0x4f889c,_0x50e1c7,_0x361e9e,_0x3c9dca,_0x3e374c,_0x509d9f,_0x3a7950;_0x54ffb9=this['utf8_encode'](_0x54ffb9);_0x4d6274=function(_0x160870){var _0x388464,_0xbd6feb=_0x160870[_0x3708('0x1')];_0x388464=_0xbd6feb+0x8;for(var _0x272e79=0x10*((_0x388464-_0x388464%0x40)/0x40+0x1),_0x425aa7=Array(_0x272e79-0x1),_0x1ffc05=0x0,_0x49b21c=0x0;_0x49b21c<_0xbd6feb;)_0x388464=(_0x49b21c-_0x49b21c%0x4)/0x4,_0x1ffc05=_0x49b21c%0x4*0x8,_0x425aa7[_0x388464]|=_0x160870[_0x3708('0x6')](_0x49b21c)<<_0x1ffc05,_0x49b21c++;_0x388464=(_0x49b21c-_0x49b21c%0x4)/0x4;_0x425aa7[_0x388464]|=0x80<<_0x49b21c%0x4*0x8;_0x425aa7[_0x272e79-0x2]=_0xbd6feb<<0x3;_0x425aa7[_0x272e79-0x1]=_0xbd6feb>>>0x1d;return _0x425aa7;}(_0x54ffb9);_0x3c9dca=0x67452301;_0x3e374c=0xefcdab89;_0x509d9f=0x98badcfe;_0x3a7950=0x10325476;_0x54ffb9=_0x4d6274['length'];for(_0x20e708=0x0;_0x20e708<_0x54ffb9;_0x20e708+=0x10)_0xf09914=_0x3c9dca,_0x4f889c=_0x3e374c,_0x50e1c7=_0x509d9f,_0x361e9e=_0x3a7950,_0x3c9dca=_0x15ac13(_0x3c9dca,_0x3e374c,_0x509d9f,_0x3a7950,_0x4d6274[_0x20e708+0x0],0x7,0xd76aa478),_0x3a7950=_0x15ac13(_0x3a7950,_0x3c9dca,_0x3e374c,_0x509d9f,_0x4d6274[_0x20e708+0x1],0xc,0xe8c7b756),_0x509d9f=_0x15ac13(_0x509d9f,_0x3a7950,_0x3c9dca,_0x3e374c,_0x4d6274[_0x20e708+0x2],0x11,0x242070db),_0x3e374c=_0x15ac13(_0x3e374c,_0x509d9f,_0x3a7950,_0x3c9dca,_0x4d6274[_0x20e708+0x3],0x16,0xc1bdceee),_0x3c9dca=_0x15ac13(_0x3c9dca,_0x3e374c,_0x509d9f,_0x3a7950,_0x4d6274[_0x20e708+0x4],0x7,0xf57c0faf),_0x3a7950=_0x15ac13(_0x3a7950,_0x3c9dca,_0x3e374c,_0x509d9f,_0x4d6274[_0x20e708+0x5],0xc,0x4787c62a),_0x509d9f=_0x15ac13(_0x509d9f,_0x3a7950,_0x3c9dca,_0x3e374c,_0x4d6274[_0x20e708+0x6],0x11,0xa8304613),_0x3e374c=_0x15ac13(_0x3e374c,_0x509d9f,_0x3a7950,_0x3c9dca,_0x4d6274[_0x20e708+0x7],0x16,0xfd469501),_0x3c9dca=_0x15ac13(_0x3c9dca,_0x3e374c,_0x509d9f,_0x3a7950,_0x4d6274[_0x20e708+0x8],0x7,0x698098d8),_0x3a7950=_0x15ac13(_0x3a7950,_0x3c9dca,_0x3e374c,_0x509d9f,_0x4d6274[_0x20e708+0x9],0xc,0x8b44f7af),_0x509d9f=_0x15ac13(_0x509d9f,_0x3a7950,_0x3c9dca,_0x3e374c,_0x4d6274[_0x20e708+0xa],0x11,0xffff5bb1),_0x3e374c=_0x15ac13(_0x3e374c,_0x509d9f,_0x3a7950,_0x3c9dca,_0x4d6274[_0x20e708+0xb],0x16,0x895cd7be),_0x3c9dca=_0x15ac13(_0x3c9dca,_0x3e374c,_0x509d9f,_0x3a7950,_0x4d6274[_0x20e708+0xc],0x7,0x6b901122),_0x3a7950=_0x15ac13(_0x3a7950,_0x3c9dca,_0x3e374c,_0x509d9f,_0x4d6274[_0x20e708+0xd],0xc,0xfd987193),_0x509d9f=_0x15ac13(_0x509d9f,_0x3a7950,_0x3c9dca,_0x3e374c,_0x4d6274[_0x20e708+0xe],0x11,0xa679438e),_0x3e374c=_0x15ac13(_0x3e374c,_0x509d9f,_0x3a7950,_0x3c9dca,_0x4d6274[_0x20e708+0xf],0x16,0x49b40821),_0x3c9dca=_0x28ceed(_0x3c9dca,_0x3e374c,_0x509d9f,_0x3a7950,_0x4d6274[_0x20e708+0x1],0x5,0xf61e2562),_0x3a7950=_0x28ceed(_0x3a7950,_0x3c9dca,_0x3e374c,_0x509d9f,_0x4d6274[_0x20e708+0x6],0x9,0xc040b340),_0x509d9f=_0x28ceed(_0x509d9f,_0x3a7950,_0x3c9dca,_0x3e374c,_0x4d6274[_0x20e708+0xb],0xe,0x265e5a51),_0x3e374c=_0x28ceed(_0x3e374c,_0x509d9f,_0x3a7950,_0x3c9dca,_0x4d6274[_0x20e708+0x0],0x14,0xe9b6c7aa),_0x3c9dca=_0x28ceed(_0x3c9dca,_0x3e374c,_0x509d9f,_0x3a7950,_0x4d6274[_0x20e708+0x5],0x5,0xd62f105d),_0x3a7950=_0x28ceed(_0x3a7950,_0x3c9dca,_0x3e374c,_0x509d9f,_0x4d6274[_0x20e708+0xa],0x9,0x2441453),_0x509d9f=_0x28ceed(_0x509d9f,_0x3a7950,_0x3c9dca,_0x3e374c,_0x4d6274[_0x20e708+0xf],0xe,0xd8a1e681),_0x3e374c=_0x28ceed(_0x3e374c,_0x509d9f,_0x3a7950,_0x3c9dca,_0x4d6274[_0x20e708+0x4],0x14,0xe7d3fbc8),_0x3c9dca=_0x28ceed(_0x3c9dca,_0x3e374c,_0x509d9f,_0x3a7950,_0x4d6274[_0x20e708+0x9],0x5,0x21e1cde6),_0x3a7950=_0x28ceed(_0x3a7950,_0x3c9dca,_0x3e374c,_0x509d9f,_0x4d6274[_0x20e708+0xe],0x9,0xc33707d6),_0x509d9f=_0x28ceed(_0x509d9f,_0x3a7950,_0x3c9dca,_0x3e374c,_0x4d6274[_0x20e708+0x3],0xe,0xf4d50d87),_0x3e374c=_0x28ceed(_0x3e374c,_0x509d9f,_0x3a7950,_0x3c9dca,_0x4d6274[_0x20e708+0x8],0x14,0x455a14ed),_0x3c9dca=_0x28ceed(_0x3c9dca,_0x3e374c,_0x509d9f,_0x3a7950,_0x4d6274[_0x20e708+0xd],0x5,0xa9e3e905),_0x3a7950=_0x28ceed(_0x3a7950,_0x3c9dca,_0x3e374c,_0x509d9f,_0x4d6274[_0x20e708+0x2],0x9,0xfcefa3f8),_0x509d9f=_0x28ceed(_0x509d9f,_0x3a7950,_0x3c9dca,_0x3e374c,_0x4d6274[_0x20e708+0x7],0xe,0x676f02d9),_0x3e374c=_0x28ceed(_0x3e374c,_0x509d9f,_0x3a7950,_0x3c9dca,_0x4d6274[_0x20e708+0xc],0x14,0x8d2a4c8a),_0x3c9dca=_0x2cb09f(_0x3c9dca,_0x3e374c,_0x509d9f,_0x3a7950,_0x4d6274[_0x20e708+0x5],0x4,0xfffa3942),_0x3a7950=_0x2cb09f(_0x3a7950,_0x3c9dca,_0x3e374c,_0x509d9f,_0x4d6274[_0x20e708+0x8],0xb,0x8771f681),_0x509d9f=_0x2cb09f(_0x509d9f,_0x3a7950,_0x3c9dca,_0x3e374c,_0x4d6274[_0x20e708+0xb],0x10,0x6d9d6122),_0x3e374c=_0x2cb09f(_0x3e374c,_0x509d9f,_0x3a7950,_0x3c9dca,_0x4d6274[_0x20e708+0xe],0x17,0xfde5380c),_0x3c9dca=_0x2cb09f(_0x3c9dca,_0x3e374c,_0x509d9f,_0x3a7950,_0x4d6274[_0x20e708+0x1],0x4,0xa4beea44),_0x3a7950=_0x2cb09f(_0x3a7950,_0x3c9dca,_0x3e374c,_0x509d9f,_0x4d6274[_0x20e708+0x4],0xb,0x4bdecfa9),_0x509d9f=_0x2cb09f(_0x509d9f,_0x3a7950,_0x3c9dca,_0x3e374c,_0x4d6274[_0x20e708+0x7],0x10,0xf6bb4b60),_0x3e374c=_0x2cb09f(_0x3e374c,_0x509d9f,_0x3a7950,_0x3c9dca,_0x4d6274[_0x20e708+0xa],0x17,0xbebfbc70),_0x3c9dca=_0x2cb09f(_0x3c9dca,_0x3e374c,_0x509d9f,_0x3a7950,_0x4d6274[_0x20e708+0xd],0x4,0x289b7ec6),_0x3a7950=_0x2cb09f(_0x3a7950,_0x3c9dca,_0x3e374c,_0x509d9f,_0x4d6274[_0x20e708+0x0],0xb,0xeaa127fa),_0x509d9f=_0x2cb09f(_0x509d9f,_0x3a7950,_0x3c9dca,_0x3e374c,_0x4d6274[_0x20e708+0x3],0x10,0xd4ef3085),_0x3e374c=_0x2cb09f(_0x3e374c,_0x509d9f,_0x3a7950,_0x3c9dca,_0x4d6274[_0x20e708+0x6],0x17,0x4881d05),_0x3c9dca=_0x2cb09f(_0x3c9dca,_0x3e374c,_0x509d9f,_0x3a7950,_0x4d6274[_0x20e708+0x9],0x4,0xd9d4d039),_0x3a7950=_0x2cb09f(_0x3a7950,_0x3c9dca,_0x3e374c,_0x509d9f,_0x4d6274[_0x20e708+0xc],0xb,0xe6db99e5),_0x509d9f=_0x2cb09f(_0x509d9f,_0x3a7950,_0x3c9dca,_0x3e374c,_0x4d6274[_0x20e708+0xf],0x10,0x1fa27cf8),_0x3e374c=_0x2cb09f(_0x3e374c,_0x509d9f,_0x3a7950,_0x3c9dca,_0x4d6274[_0x20e708+0x2],0x17,0xc4ac5665),_0x3c9dca=_0x44c715(_0x3c9dca,_0x3e374c,_0x509d9f,_0x3a7950,_0x4d6274[_0x20e708+0x0],0x6,0xf4292244),_0x3a7950=_0x44c715(_0x3a7950,_0x3c9dca,_0x3e374c,_0x509d9f,_0x4d6274[_0x20e708+0x7],0xa,0x432aff97),_0x509d9f=_0x44c715(_0x509d9f,_0x3a7950,_0x3c9dca,_0x3e374c,_0x4d6274[_0x20e708+0xe],0xf,0xab9423a7),_0x3e374c=_0x44c715(_0x3e374c,_0x509d9f,_0x3a7950,_0x3c9dca,_0x4d6274[_0x20e708+0x5],0x15,0xfc93a039),_0x3c9dca=_0x44c715(_0x3c9dca,_0x3e374c,_0x509d9f,_0x3a7950,_0x4d6274[_0x20e708+0xc],0x6,0x655b59c3),_0x3a7950=_0x44c715(_0x3a7950,_0x3c9dca,_0x3e374c,_0x509d9f,_0x4d6274[_0x20e708+0x3],0xa,0x8f0ccc92),_0x509d9f=_0x44c715(_0x509d9f,_0x3a7950,_0x3c9dca,_0x3e374c,_0x4d6274[_0x20e708+0xa],0xf,0xffeff47d),_0x3e374c=_0x44c715(_0x3e374c,_0x509d9f,_0x3a7950,_0x3c9dca,_0x4d6274[_0x20e708+0x1],0x15,0x85845dd1),_0x3c9dca=_0x44c715(_0x3c9dca,_0x3e374c,_0x509d9f,_0x3a7950,_0x4d6274[_0x20e708+0x8],0x6,0x6fa87e4f),_0x3a7950=_0x44c715(_0x3a7950,_0x3c9dca,_0x3e374c,_0x509d9f,_0x4d6274[_0x20e708+0xf],0xa,0xfe2ce6e0),_0x509d9f=_0x44c715(_0x509d9f,_0x3a7950,_0x3c9dca,_0x3e374c,_0x4d6274[_0x20e708+0x6],0xf,0xa3014314),_0x3e374c=_0x44c715(_0x3e374c,_0x509d9f,_0x3a7950,_0x3c9dca,_0x4d6274[_0x20e708+0xd],0x15,0x4e0811a1),_0x3c9dca=_0x44c715(_0x3c9dca,_0x3e374c,_0x509d9f,_0x3a7950,_0x4d6274[_0x20e708+0x4],0x6,0xf7537e82),_0x3a7950=_0x44c715(_0x3a7950,_0x3c9dca,_0x3e374c,_0x509d9f,_0x4d6274[_0x20e708+0xb],0xa,0xbd3af235),_0x509d9f=_0x44c715(_0x509d9f,_0x3a7950,_0x3c9dca,_0x3e374c,_0x4d6274[_0x20e708+0x2],0xf,0x2ad7d2bb),_0x3e374c=_0x44c715(_0x3e374c,_0x509d9f,_0x3a7950,_0x3c9dca,_0x4d6274[_0x20e708+0x9],0x15,0xeb86d391),_0x3c9dca=_0x5ea64c(_0x3c9dca,_0xf09914),_0x3e374c=_0x5ea64c(_0x3e374c,_0x4f889c),_0x509d9f=_0x5ea64c(_0x509d9f,_0x50e1c7),_0x3a7950=_0x5ea64c(_0x3a7950,_0x361e9e);return(_0x52a545(_0x3c9dca)+_0x52a545(_0x3e374c)+_0x52a545(_0x509d9f)+_0x52a545(_0x3a7950))[_0x3708('0x7')]();};(function(_0x4cb14c){if('function'!==typeof _0x4cb14c[_0x3708('0x8')]){var _0x5b6017={};_0x4cb14c[_0x3708('0x9')]=_0x5b6017;0x96>parseInt((_0x4cb14c['fn']['jquery'][_0x3708('0xa')](/[^0-9]+/g,'')+_0x3708('0xb'))[_0x3708('0x3')](0x0,0x3),0xa)&&console&&'function'==typeof console[_0x3708('0xc')]&&console['error']();_0x4cb14c[_0x3708('0x8')]=function(_0x29731c){try{var _0x4c1469=_0x4cb14c['extend']({},{'url':'','type':_0x3708('0xd'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x29731c),_0x4927f6;_0x4927f6=_0x3708('0xe')===typeof _0x4c1469['data']?JSON[_0x3708('0xf')](_0x4c1469[_0x3708('0x10')]):_0x4c1469[_0x3708('0x10')][_0x3708('0x4')]();var _0x23ab97=encodeURIComponent(_0x4c1469[_0x3708('0x11')]+'|'+_0x4c1469[_0x3708('0x12')]+'|'+_0x4927f6);_0x5b6017[_0x23ab97]=_0x5b6017[_0x23ab97]||{};_0x3708('0x0')==typeof _0x5b6017[_0x23ab97][_0x3708('0x13')]?_0x5b6017[_0x23ab97][_0x3708('0x13')]=_0x4cb14c[_0x3708('0x14')](_0x4c1469):(_0x5b6017[_0x23ab97][_0x3708('0x13')][_0x3708('0x15')](_0x4c1469[_0x3708('0x16')]),_0x5b6017[_0x23ab97][_0x3708('0x13')][_0x3708('0x17')](_0x4c1469['error']),_0x5b6017[_0x23ab97][_0x3708('0x13')][_0x3708('0x18')](_0x4c1469[_0x3708('0x19')]));_0x5b6017[_0x23ab97][_0x3708('0x13')][_0x3708('0x18')](function(){isNaN(parseInt(_0x4c1469['clearQueueDelay']))||setTimeout(function(){_0x5b6017[_0x23ab97][_0x3708('0x13')]=void 0x0;},_0x4c1469['clearQueueDelay']);});return _0x5b6017[_0x23ab97]['jqXHR'];}catch(_0x221768){_0x3708('0x0')!==typeof console&&_0x3708('0x1a')===typeof console[_0x3708('0xc')]&&console[_0x3708('0xc')](_0x3708('0x1b')+_0x221768[_0x3708('0x1c')]);}};_0x4cb14c['qdAjax'][_0x3708('0x1d')]=_0x3708('0x1e');}}(jQuery));(function(_0x2dee92){var _0x3e7b26=jQuery;if(_0x3708('0x1a')!==typeof _0x3e7b26['fn'][_0x3708('0x1f')]){_0x3e7b26['fn'][_0x3708('0x1f')]=function(){};var _0x84ac89=function(_0x38fd65,_0x3b6d1b){if(_0x3708('0xe')===typeof console&&'undefined'!==typeof console[_0x3708('0xc')]&&'undefined'!==typeof console[_0x3708('0x20')]&&_0x3708('0x0')!==typeof console[_0x3708('0x21')]){var _0x48f1b4;'object'===typeof _0x38fd65?(_0x38fd65[_0x3708('0x22')](_0x3708('0x23')),_0x48f1b4=_0x38fd65):_0x48f1b4=['[Quatro\x20Digital\x20-\x20Smart\x20Sku\x20Limiter]\x0a'+_0x38fd65];if(_0x3708('0x0')===typeof _0x3b6d1b||_0x3708('0x24')!==_0x3b6d1b[_0x3708('0x7')]()&&_0x3708('0x25')!==_0x3b6d1b['toLowerCase']())if(_0x3708('0x0')!==typeof _0x3b6d1b&&_0x3708('0x20')===_0x3b6d1b[_0x3708('0x7')]())try{console[_0x3708('0x20')][_0x3708('0x26')](console,_0x48f1b4);}catch(_0x51b81b){try{console[_0x3708('0x20')](_0x48f1b4[_0x3708('0x27')]('\x0a'));}catch(_0x198636){}}else try{console[_0x3708('0xc')][_0x3708('0x26')](console,_0x48f1b4);}catch(_0x9eca22){try{console['error'](_0x48f1b4['join']('\x0a'));}catch(_0xfc3eca){}}else try{console[_0x3708('0x21')][_0x3708('0x26')](console,_0x48f1b4);}catch(_0xf12f9e){try{console[_0x3708('0x21')](_0x48f1b4['join']('\x0a'));}catch(_0x4c7fcc){}}}},_0x430484={'idSku':0x0,'limitMessage':_0x3708('0x28')},_0x1d6f32=function(_0x22d3c2,_0x376272){_0x22d3c2[_0x3708('0x29')](function(){_0x9449b5(_0x3e7b26(this),_0x376272);});},_0x9449b5=function(_0x3fea8f,_0x38b923){try{var _0xc93958=_0x3fea8f[_0x3708('0x10')](_0x3708('0x2a'));isNaN(_0xc93958)?_0x3e7b26[_0x3708('0x8')]({'url':_0x3708('0x2b')+_0x38b923[_0x3708('0x2c')],'dataType':_0x3708('0x2d'),'clearQueueDelay':null,'success':function(_0x2af663){try{_0x3fea8f[_0x3708('0x10')](_0x3708('0x2a'),_0x2af663[0x0][_0x3708('0x2e')][0x0][_0x3708('0x2f')]),_0x98f839(_0x2af663[0x0][_0x3708('0x2e')][0x0]['AvailableQuantity'],_0x3fea8f,_0x38b923);}catch(_0x44eceb){_0x84ac89('Problemas\x20ao\x20processar\x20os\x20dados\x20do\x20SKU\x20'+_0x38b923[_0x3708('0x2c')]+_0x3708('0x30')+_0x44eceb[_0x3708('0x1c')]);}}}):_0x98f839(_0xc93958,_0x3fea8f,_0x38b923);}catch(_0x2d2a61){_0x84ac89(_0x2d2a61[_0x3708('0x1c')]);}},_0x98f839=function(_0x234d23,_0x405bcb,_0x576277){try{if(_0x405bcb[_0x3708('0x31')]()>_0x234d23){_0x405bcb['attr']('title',_0x576277[_0x3708('0x32')][_0x3708('0xa')]('#qtt',_0x234d23))[_0x3708('0x33')]('show');parseInt(_0x405bcb[_0x3708('0x31')]())>_0x234d23?_0x405bcb[_0x3708('0x31')](_0x234d23)[_0x3708('0x34')](_0x3708('0x35')):_0x405bcb['val'](_0x234d23)[_0x3708('0x34')]('change',[_0x3708('0x36')]);var _0x17b8b9=_0x405bcb[_0x3708('0x10')](_0x3708('0x37'));_0x17b8b9&&clearTimeout(_0x17b8b9);_0x405bcb[_0x3708('0x10')](_0x3708('0x37'),setTimeout(function(){_0x405bcb['tooltip'](_0x3708('0x38'));},0xbb8));}}catch(_0x438f1d){_0x84ac89(_0x438f1d['message']);}};_0x2dee92=function(_0x3b0e8d){var _0x25cf73={'p':'neynoretnznfx%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x38d8ee){var _0x5ded4d=function(_0x4ebf7f){return _0x4ebf7f;};var _0x22be76=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x38d8ee=_0x38d8ee['d'+_0x22be76[0x10]+'c'+_0x22be76[0x11]+'m'+_0x5ded4d(_0x22be76[0x1])+'n'+_0x22be76[0xd]]['l'+_0x22be76[0x12]+'c'+_0x22be76[0x0]+'ti'+_0x5ded4d('o')+'n'];var _0x5e4994=function(_0x17bebe){return escape(encodeURIComponent(_0x17bebe['replace'](/\./g,'¨')[_0x3708('0xa')](/[a-zA-Z]/g,function(_0x42d0b6){return String[_0x3708('0x2')](('Z'>=_0x42d0b6?0x5a:0x7a)>=(_0x42d0b6=_0x42d0b6[_0x3708('0x6')](0x0)+0xd)?_0x42d0b6:_0x42d0b6-0x1a);})));};var _0x18e7eb=_0x5e4994(_0x38d8ee[[_0x22be76[0x9],_0x5ded4d('o'),_0x22be76[0xc],_0x22be76[_0x5ded4d(0xd)]][_0x3708('0x27')]('')]);_0x5e4994=_0x5e4994((window[['js',_0x5ded4d('no'),'m',_0x22be76[0x1],_0x22be76[0x4]['toUpperCase'](),_0x3708('0x39')][_0x3708('0x27')]('')]||_0x3708('0x3a'))+['.v',_0x22be76[0xd],'e',_0x5ded4d('x'),'co',_0x5ded4d('mm'),_0x3708('0x3b'),_0x22be76[0x1],'.c',_0x5ded4d('o'),'m.',_0x22be76[0x13],'r']['join'](''));for(var _0x28f089 in _0x25cf73){if(_0x5e4994===_0x28f089+_0x25cf73[_0x28f089]||_0x18e7eb===_0x28f089+_0x25cf73[_0x28f089]){var _0x2dee92='tr'+_0x22be76[0x11]+'e';break;}_0x2dee92='f'+_0x22be76[0x0]+'ls'+_0x5ded4d(_0x22be76[0x1]);}_0x5ded4d=!0x1;-0x1<_0x38d8ee[[_0x22be76[0xc],'e',_0x22be76[0x0],'rc',_0x22be76[0x9]]['join']('')][_0x3708('0x3c')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x5ded4d=!0x0);return[_0x2dee92,_0x5ded4d];}(_0x3b0e8d);}(window);if(!eval(_0x2dee92[0x0]))return _0x2dee92[0x1]?_0x84ac89('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x3e7b26['fn'][_0x3708('0x1f')]=function(_0x3ad20d){var _0x5a10b7=_0x3e7b26(this);if(!_0x5a10b7[_0x3708('0x1')])return _0x5a10b7;_0x3ad20d=_0x3e7b26[_0x3708('0x3d')]({},_0x430484,_0x3ad20d);_0x5a10b7[_0x3708('0x3e')]=new _0x1d6f32(_0x5a10b7,_0x3ad20d);return _0x5a10b7;};_0x3e7b26(function(){_0x3e7b26(_0x3708('0x3f'))[_0x3708('0x1f')]();});_0x3e7b26(window)['on']('QuatroDigital.sq_change\x20QuatroDigital.sq_focusin',function(_0x5a90e5,_0x4f9dc9){try{var _0x43141b=_0x3e7b26(_0x4f9dc9);if(!(_0x3708('0x40')!=_0x5a90e5['namespace']&&0x2>(_0x43141b[_0x3708('0x31')]()||0x0))){var _0x24ca63=_0x3e7b26[_0x3708('0x3d')]({},_0x430484,{'idSku':_0x43141b['attr'](_0x3708('0x41'))});_0x9449b5(_0x43141b,_0x24ca63);}}catch(_0x14e0ef){_0x84ac89(_0x14e0ef[_0x3708('0x1c')]);}});}}(this));