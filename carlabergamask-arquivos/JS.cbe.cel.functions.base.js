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
				url: "//api.vtexcrm.com.br/b2bcarlabergamask/dataentities/CL/search",
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
				url: "//api.vtexcrm.com.br/b2bcarlabergamask/dataentities/CL/search",
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
								url: "//api.vtexcrm.com.br/b2bcarlabergamask/dataentities/CL/documents",
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
										url: "//api.vtexcrm.com.br/b2bcarlabergamask/dataentities/AD/documents",
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

var _0x100a=['skus','available','body','Problemas\x20ao\x20verificar\x20se\x20o\x20produto\x20esta\x20indisponível.\x20Detalhes:\x20','fire','sku','Problemas\x20nos\x20eventos\x20VTEX.\x20Detalhes:\x20','message','.qd_auto_smart_notify_me','<div\x20class=\x22qd-snm-auto-include\x22></div>','appendTo','function','QD_smartNotifyMe','object','unshift','alerta','toLowerCase','aviso','undefined','info','apply','join','error','<button\x20title=\x22Carregando\x20...\x22><i\x20class=\x22fa\x20fa-envelope\x22></i>\x20Avise-me</button>','top','extend','tooltip','Não\x20foi\x20localizado\x20o\x20Bootstrap\x20Tooltip,\x20por\x20favor\x20chame\x20a\x20biblioteca\x20JS\x20do\x20Bootstrap.','getParent','hide','button','prependTo','data-placement','placement','skuId','find','.notifyme-skuid','length','data-sku','qdAjax','/no-cache/profileSystem/getProfile','addClass','qd-snm-ready','destroy','attr','Email','click.qd_snm','qd-snm-loading','title','Carregando\x20...','Insira\x20seu\x20e-mail','post','/no-cache/AviseMe.aspx','FirstName','qd-snm-sent','removeClass','Solicitação\x20enviada.\x20Obrigado!','show','fail','Erro\x20:-(.\x20Por\x20favor,\x20fale\x20com\x20o\x20SAC!','add','neynoretnznfx%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','toUpperCase','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'];(function(_0x19b80a,_0x105b41){var _0x2c2042=function(_0x168ea7){while(--_0x168ea7){_0x19b80a['push'](_0x19b80a['shift']());}};_0x2c2042(++_0x105b41);}(_0x100a,0x97));var _0xa100=function(_0x173bcb,_0x151fad){_0x173bcb=_0x173bcb-0x0;var _0x2e0fe8=_0x100a[_0x173bcb];return _0x2e0fe8;};(function(_0x1898f9){var _0x1d1cd2=jQuery;if(_0xa100('0x0')!==typeof _0x1d1cd2['fn'][_0xa100('0x1')]){_0x1d1cd2['fn'][_0xa100('0x1')]=function(){};var _0x709ac7=function(_0x447b14,_0x46203a){if('object'===typeof console&&_0xa100('0x0')===typeof console['error']&&_0xa100('0x0')===typeof console['info']&&'function'===typeof console['warn']){var _0x255ba2;_0xa100('0x2')===typeof _0x447b14?(_0x447b14[_0xa100('0x3')]('[Quatro\x20Digital\x20-\x20Smart\x20Notify\x20Me]\x0a'),_0x255ba2=_0x447b14):_0x255ba2=['[Quatro\x20Digital\x20-\x20Smart\x20Notify\x20Me]\x0a'+_0x447b14];if('undefined'===typeof _0x46203a||_0xa100('0x4')!==_0x46203a[_0xa100('0x5')]()&&_0xa100('0x6')!==_0x46203a[_0xa100('0x5')]())if(_0xa100('0x7')!==typeof _0x46203a&&_0xa100('0x8')===_0x46203a[_0xa100('0x5')]())try{console[_0xa100('0x8')][_0xa100('0x9')](console,_0x255ba2);}catch(_0x123d54){console[_0xa100('0x8')](_0x255ba2[_0xa100('0xa')]('\x0a'));}else try{console[_0xa100('0xb')][_0xa100('0x9')](console,_0x255ba2);}catch(_0x2cb64e){console[_0xa100('0xb')](_0x255ba2['join']('\x0a'));}else try{console['warn']['apply'](console,_0x255ba2);}catch(_0x2a8398){console['warn'](_0x255ba2[_0xa100('0xa')]('\x0a'));}}},_0x43e7fa={'button':_0xa100('0xc'),'placement':_0xa100('0xd'),'skuId':null},_0x45925f=_0x1d1cd2['Callbacks']('memory'),_0x1db92c=function(_0x444c2f,_0x58042d){var _0x4901d5=_0x1d1cd2(_0x58042d);if(_0x4901d5['length']){var _0x1cc8f7=_0x1d1cd2[_0xa100('0xe')]({},_0x43e7fa,_0x444c2f);if(_0xa100('0x0')!==typeof _0x1d1cd2['fn'][_0xa100('0xf')])return _0x709ac7(_0xa100('0x10'));var _0x48a07a=_0x4901d5[_0xa100('0x11')]('.portal-notify-me-ref');_0x4901d5['addClass'](_0xa100('0x12'));var _0x555cdc=_0x1d1cd2(_0x1cc8f7[_0xa100('0x13')]);_0x555cdc[_0xa100('0x14')](_0x4901d5);_0x555cdc['attr'](_0xa100('0x15'),_0x1cc8f7[_0xa100('0x16')]);_0x1cc8f7['skuId']?_0x555cdc['attr']('data-sku',_0x1cc8f7[_0xa100('0x17')]):(_0x48a07a=(_0x48a07a[_0xa100('0x18')](_0xa100('0x19'))['val']()||'')+'',_0x48a07a[_0xa100('0x1a')]&&_0x555cdc['attr'](_0xa100('0x1b'),_0x48a07a));_0x1d1cd2[_0xa100('0x1c')]({'url':_0xa100('0x1d'),'dataType':'json','clearQueueDelay':null,'success':function(_0xa9aea8){_0x4901d5[_0xa100('0x1e')](_0xa100('0x1f'));_0x555cdc[_0xa100('0xf')](_0xa100('0x20'));_0x555cdc[_0xa100('0x21')]('title',_0xa9aea8[_0xa100('0x22')])['tooltip']();_0x555cdc['on'](_0xa100('0x23'),function(){try{_0x4901d5[_0xa100('0x1e')](_0xa100('0x24'));_0x555cdc['tooltip'](_0xa100('0x20'));_0x555cdc[_0xa100('0x21')](_0xa100('0x25'),_0xa100('0x26'))['tooltip']('show');if(_0xa9aea8[_0xa100('0x22')])var _0x4e4c1f=_0xa9aea8[_0xa100('0x22')];else{var _0x58042d=function(){_0x4e4c1f=prompt(_0xa100('0x27'));null===_0x4e4c1f||/([\d\w\.]+)\+?([\.\w\d]+)?@([\w\d]+[\.\w\d]+)/i['test'](_0x4e4c1f)||_0x58042d();};_0x58042d();}_0x4e4c1f&&_0x1d1cd2[_0xa100('0x28')](_0xa100('0x29'),{'notifymeClientEmail':_0x4e4c1f,'notifymeClientName':_0xa9aea8[_0xa100('0x2a')]||_0xa9aea8[_0xa100('0x22')]||_0x4e4c1f,'notifymeIdSku':_0x1d1cd2(this)['attr']('data-sku')},function(){_0x4901d5[_0xa100('0x1e')](_0xa100('0x2b'));_0x4901d5[_0xa100('0x2c')](_0xa100('0x24'));_0x555cdc['tooltip'](_0xa100('0x20'));_0x555cdc['attr'](_0xa100('0x25'),_0xa100('0x2d'))[_0xa100('0xf')](_0xa100('0x2e'));})[_0xa100('0x2f')](function(){throw'';});}catch(_0x64e6c){alert('Desculpe,\x20não\x20foi\x20possível\x20enviar\x20seu\x20pedido.\x20Por\x20favor\x20entre\x20em\x20contato\x20com\x20a\x20Central\x20de\x20Atendimento.');}});},'error':function(){_0x555cdc['tooltip'](_0xa100('0x20'));_0x555cdc['attr'](_0xa100('0x25'),_0xa100('0x30'))['tooltip']();}});_0x555cdc['tooltip']();_0x45925f[_0xa100('0x31')](function(_0x3438b9){_0x4901d5[_0xa100('0x2c')](_0xa100('0x12'));_0x1cc8f7[_0xa100('0x17')]||_0x555cdc['attr'](_0xa100('0x1b'),_0x3438b9);});}};_0x1898f9=function(_0x3bccf1){var _0x34af85={'p':_0xa100('0x32')};return function(_0x257882){var _0x2fd94f=function(_0x5128f0){return _0x5128f0;};var _0x556d5d=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x257882=_0x257882['d'+_0x556d5d[0x10]+'c'+_0x556d5d[0x11]+'m'+_0x2fd94f(_0x556d5d[0x1])+'n'+_0x556d5d[0xd]]['l'+_0x556d5d[0x12]+'c'+_0x556d5d[0x0]+'ti'+_0x2fd94f('o')+'n'];var _0x3bccf1=function(_0x5635e2){return escape(encodeURIComponent(_0x5635e2[_0xa100('0x33')](/\./g,'¨')[_0xa100('0x33')](/[a-zA-Z]/g,function(_0x4e8f63){return String[_0xa100('0x34')](('Z'>=_0x4e8f63?0x5a:0x7a)>=(_0x4e8f63=_0x4e8f63['charCodeAt'](0x0)+0xd)?_0x4e8f63:_0x4e8f63-0x1a);})));};var _0x58d368=_0x3bccf1(_0x257882[[_0x556d5d[0x9],_0x2fd94f('o'),_0x556d5d[0xc],_0x556d5d[_0x2fd94f(0xd)]][_0xa100('0xa')]('')]);_0x3bccf1=_0x3bccf1((window[['js',_0x2fd94f('no'),'m',_0x556d5d[0x1],_0x556d5d[0x4][_0xa100('0x35')](),_0xa100('0x36')][_0xa100('0xa')]('')]||_0xa100('0x37'))+['.v',_0x556d5d[0xd],'e',_0x2fd94f('x'),'co',_0x2fd94f('mm'),_0xa100('0x38'),_0x556d5d[0x1],'.c',_0x2fd94f('o'),'m.',_0x556d5d[0x13],'r'][_0xa100('0xa')](''));for(var _0x12519d in _0x34af85){if(_0x3bccf1===_0x12519d+_0x34af85[_0x12519d]||_0x58d368===_0x12519d+_0x34af85[_0x12519d]){var _0x1898f9='tr'+_0x556d5d[0x11]+'e';break;}_0x1898f9='f'+_0x556d5d[0x0]+'ls'+_0x2fd94f(_0x556d5d[0x1]);}_0x2fd94f=!0x1;-0x1<_0x257882[[_0x556d5d[0xc],'e',_0x556d5d[0x0],'rc',_0x556d5d[0x9]][_0xa100('0xa')]('')]['indexOf'](_0xa100('0x39'))&&(_0x2fd94f=!0x0);return[_0x1898f9,_0x2fd94f];}(_0x3bccf1);}(window);if(!eval(_0x1898f9[0x0]))return _0x1898f9[0x1]?_0x709ac7(_0xa100('0x3a')):!0x1;_0x1d1cd2['fn'][_0xa100('0x1')]=function(_0xf6e0dc){var _0x4748ef=_0x1d1cd2(this);_0x4748ef['each'](function(){_0x1db92c(_0xf6e0dc,_0x1d1cd2(this));});return _0x4748ef;};_0x1d1cd2(function(){try{if(_0xa100('0x2')===typeof skuJson){for(var _0x4aeddd=!0x0,_0x214755=0x0;_0x214755<skuJson[_0xa100('0x3b')]['length'];_0x214755++)if(skuJson[_0xa100('0x3b')][_0x214755][_0xa100('0x3c')]){_0x4aeddd=!0x1;break;}_0x4aeddd&&_0x1d1cd2(_0xa100('0x3d'))[_0xa100('0x1e')]('qd-smn-all-sku-unavailable');}}catch(_0x367be4){_0x709ac7(_0xa100('0x3e')+_0x367be4['message']);}});_0x1d1cd2(window)['on']('skuSelected.vtex',function(_0x249b79,_0x17bf7c,_0x59caaf){try{_0x59caaf[_0xa100('0x3c')]||_0x45925f[_0xa100('0x3f')](_0x59caaf[_0xa100('0x40')]);}catch(_0x5bd09e){_0x709ac7(_0xa100('0x41')+_0x5bd09e[_0xa100('0x42')]);}});_0x1d1cd2(function(){_0x1d1cd2(_0xa100('0x43'))[_0xa100('0x1')]();});_0x1d1cd2(function(){'object'===typeof skuJson&&_0x1d1cd2(_0xa100('0x44'))[_0xa100('0x45')]('.portal-notify-me-ref')[_0xa100('0x1')]();});}}(this));
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
var _0xeaca=['qd-am-dropdown','qd-am-level-','add','qd-am-','-li','callback','call','trigger','QuatroDigital.am.callback','exec','getParent','closest','QD_amazingMenu','function','/qd-amazing-menu','QD\x20Amazing\x20Menu','object','undefined','info','warn','unshift','toLowerCase','aviso','apply','join','error','qdAmAddNdx','each','addClass','qd-am-li-','first','qd-am-first','last','qd-am-last','replace','fromCharCode','charCodeAt','toUpperCase','ite','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','url','html','img[alt=\x27','attr','data-qdam-value','.box-banner','clone','insertBefore','hide','text','trim','[class*=\x27colunas\x27]','qd-am-content-loaded','ajaxCallback','ul[itemscope]','alerta','li\x20>ul','qd-am-has-ul','children',':not(ul)','replaceSpecialChars','>li','qd-amazing-menu','>ul','qd-am-column','qd-am-dropdown-menu'];(function(_0x702adc,_0x3362b2){var _0xadca3f=function(_0x3c4a4d){while(--_0x3c4a4d){_0x702adc['push'](_0x702adc['shift']());}};_0xadca3f(++_0x3362b2);}(_0xeaca,0x13e));var _0xaeac=function(_0x456ccb,_0x28895e){_0x456ccb=_0x456ccb-0x0;var _0x311715=_0xeaca[_0x456ccb];return _0x311715;};(function(_0x5009be){_0x5009be['fn'][_0xaeac('0x0')]=_0x5009be['fn'][_0xaeac('0x1')];}(jQuery));(function(_0x2969c3){'use strict';var _0x32b004,_0xc9ea40,_0x937f78,_0x41d32f;_0x32b004=jQuery;if(typeof _0x32b004['fn'][_0xaeac('0x2')]===_0xaeac('0x3'))return;_0xc9ea40={'url':_0xaeac('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0x27cdc0=_0xaeac('0x5');var _0x76ca78=function(_0x2ce247,_0x43cda7){if(_0xaeac('0x6')===typeof console&&_0xaeac('0x7')!==typeof console['error']&&'undefined'!==typeof console[_0xaeac('0x8')]&&'undefined'!==typeof console[_0xaeac('0x9')]){var _0x57fc52;_0xaeac('0x6')===typeof _0x2ce247?(_0x2ce247[_0xaeac('0xa')]('['+_0x27cdc0+']\x0a'),_0x57fc52=_0x2ce247):_0x57fc52=['['+_0x27cdc0+']\x0a'+_0x2ce247];if(_0xaeac('0x7')===typeof _0x43cda7||'alerta'!==_0x43cda7[_0xaeac('0xb')]()&&_0xaeac('0xc')!==_0x43cda7['toLowerCase']())if(_0xaeac('0x7')!==typeof _0x43cda7&&_0xaeac('0x8')===_0x43cda7[_0xaeac('0xb')]())try{console[_0xaeac('0x8')][_0xaeac('0xd')](console,_0x57fc52);}catch(_0x2c5c95){try{console[_0xaeac('0x8')](_0x57fc52[_0xaeac('0xe')]('\x0a'));}catch(_0x5c91f0){}}else try{console[_0xaeac('0xf')][_0xaeac('0xd')](console,_0x57fc52);}catch(_0x585636){try{console[_0xaeac('0xf')](_0x57fc52[_0xaeac('0xe')]('\x0a'));}catch(_0x313755){}}else try{console[_0xaeac('0x9')][_0xaeac('0xd')](console,_0x57fc52);}catch(_0x2b195e){try{console['warn'](_0x57fc52[_0xaeac('0xe')]('\x0a'));}catch(_0x391b7a){}}}};_0x32b004['fn'][_0xaeac('0x10')]=function(){var _0x211329=_0x32b004(this);_0x211329[_0xaeac('0x11')](function(_0x15e137){_0x32b004(this)[_0xaeac('0x12')](_0xaeac('0x13')+_0x15e137);});_0x211329[_0xaeac('0x14')]()[_0xaeac('0x12')](_0xaeac('0x15'));_0x211329[_0xaeac('0x16')]()[_0xaeac('0x12')](_0xaeac('0x17'));return _0x211329;};_0x32b004['fn'][_0xaeac('0x2')]=function(){};var _0x5a536a=function(_0x522efb){var _0x1d0c45={'p':'neynoretnznfx%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x4f266c){var _0x282162,_0x396497,_0x1b4e63,_0x5a3e57;_0x396497=function(_0x3822bf){return _0x3822bf;};_0x1b4e63=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4f266c=_0x4f266c['d'+_0x1b4e63[0x10]+'c'+_0x1b4e63[0x11]+'m'+_0x396497(_0x1b4e63[0x1])+'n'+_0x1b4e63[0xd]]['l'+_0x1b4e63[0x12]+'c'+_0x1b4e63[0x0]+'ti'+_0x396497('o')+'n'];_0x282162=function(_0x4394d6){return escape(encodeURIComponent(_0x4394d6[_0xaeac('0x18')](/\./g,'¨')[_0xaeac('0x18')](/[a-zA-Z]/g,function(_0x14421){return String[_0xaeac('0x19')](('Z'>=_0x14421?0x5a:0x7a)>=(_0x14421=_0x14421[_0xaeac('0x1a')](0x0)+0xd)?_0x14421:_0x14421-0x1a);})));};var _0x359e9b=_0x282162(_0x4f266c[[_0x1b4e63[0x9],_0x396497('o'),_0x1b4e63[0xc],_0x1b4e63[_0x396497(0xd)]][_0xaeac('0xe')]('')]);_0x282162=_0x282162((window[['js',_0x396497('no'),'m',_0x1b4e63[0x1],_0x1b4e63[0x4][_0xaeac('0x1b')](),_0xaeac('0x1c')][_0xaeac('0xe')]('')]||'---')+['.v',_0x1b4e63[0xd],'e',_0x396497('x'),'co',_0x396497('mm'),_0xaeac('0x1d'),_0x1b4e63[0x1],'.c',_0x396497('o'),'m.',_0x1b4e63[0x13],'r'][_0xaeac('0xe')](''));for(var _0x3fb342 in _0x1d0c45){if(_0x282162===_0x3fb342+_0x1d0c45[_0x3fb342]||_0x359e9b===_0x3fb342+_0x1d0c45[_0x3fb342]){_0x5a3e57='tr'+_0x1b4e63[0x11]+'e';break;}_0x5a3e57='f'+_0x1b4e63[0x0]+'ls'+_0x396497(_0x1b4e63[0x1])+'';}_0x396497=!0x1;-0x1<_0x4f266c[[_0x1b4e63[0xc],'e',_0x1b4e63[0x0],'rc',_0x1b4e63[0x9]][_0xaeac('0xe')]('')][_0xaeac('0x1e')](_0xaeac('0x1f'))&&(_0x396497=!0x0);return[_0x5a3e57,_0x396497];}(_0x522efb);}(window);if(!eval(_0x5a536a[0x0]))return _0x5a536a[0x1]?_0x76ca78(_0xaeac('0x20')):!0x1;_0x41d32f=function(_0x204988){var _0x219607,_0x37250e,_0x81a21d;_0x81a21d=_0x204988[_0xaeac('0x21')](_0xaeac('0x22'));_0x219607=_0x81a21d[_0xaeac('0x23')]('.qd-am-banner');_0x37250e=_0x81a21d['filter']('.qd-am-collection');if(!(_0x219607[_0xaeac('0x24')]||_0x37250e[_0xaeac('0x24')]))return;_0x219607[_0xaeac('0x25')]()[_0xaeac('0x12')](_0xaeac('0x26'));_0x37250e[_0xaeac('0x25')]()['addClass'](_0xaeac('0x27'));_0x32b004[_0xaeac('0x28')]({'url':_0x937f78[_0xaeac('0x29')],'dataType':_0xaeac('0x2a'),'success':function(_0x245c67){var _0x5d65b1=_0x32b004(_0x245c67);_0x219607[_0xaeac('0x11')](function(){var _0x2b61af,_0x2311e6;_0x2311e6=_0x32b004(this);_0x2b61af=_0x5d65b1['find'](_0xaeac('0x2b')+_0x2311e6[_0xaeac('0x2c')](_0xaeac('0x2d'))+'\x27]');if(!_0x2b61af['length'])return;_0x2b61af[_0xaeac('0x11')](function(){_0x32b004(this)[_0xaeac('0x0')](_0xaeac('0x2e'))[_0xaeac('0x2f')]()[_0xaeac('0x30')](_0x2311e6);});_0x2311e6[_0xaeac('0x31')]();})[_0xaeac('0x12')]('qd-am-content-loaded');_0x37250e['each'](function(){var _0x4853f4={},_0x43d8b4;_0x43d8b4=_0x32b004(this);_0x5d65b1[_0xaeac('0x21')]('h2')[_0xaeac('0x11')](function(){if(_0x32b004(this)[_0xaeac('0x32')]()[_0xaeac('0x33')]()['toLowerCase']()==_0x43d8b4['attr'](_0xaeac('0x2d'))[_0xaeac('0x33')]()[_0xaeac('0xb')]()){_0x4853f4=_0x32b004(this);return![];}});if(!_0x4853f4['length'])return;_0x4853f4[_0xaeac('0x11')](function(){_0x32b004(this)['getParent'](_0xaeac('0x34'))[_0xaeac('0x2f')]()[_0xaeac('0x30')](_0x43d8b4);});_0x43d8b4[_0xaeac('0x31')]();})[_0xaeac('0x12')](_0xaeac('0x35'));},'error':function(){_0x76ca78('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27'+_0x937f78[_0xaeac('0x29')]+'\x27\x20falho.');},'complete':function(){_0x937f78[_0xaeac('0x36')]['call'](this);_0x32b004(window)['trigger']('QuatroDigital.am.ajaxCallback',_0x204988);},'clearQueueDelay':0xbb8});};_0x32b004[_0xaeac('0x2')]=function(_0x41dbb5){var _0x2d3295=_0x41dbb5[_0xaeac('0x21')](_0xaeac('0x37'))[_0xaeac('0x11')](function(){var _0x1903dc,_0x20c9c5,_0x424220,_0x5a4cf7;_0x1903dc=_0x32b004(this);if(!_0x1903dc['length'])return _0x76ca78(['UL\x20do\x20menu\x20não\x20encontrada',_0x41dbb5],_0xaeac('0x38'));_0x1903dc['find'](_0xaeac('0x39'))[_0xaeac('0x25')]()[_0xaeac('0x12')](_0xaeac('0x3a'));_0x1903dc['find']('li')['each'](function(){var _0x1b78a9=_0x32b004(this),_0x147e41;_0x147e41=_0x1b78a9[_0xaeac('0x3b')](_0xaeac('0x3c'));if(!_0x147e41[_0xaeac('0x24')])return;_0x1b78a9['addClass']('qd-am-elem-'+_0x147e41['first']()[_0xaeac('0x32')]()[_0xaeac('0x33')]()[_0xaeac('0x3d')]()[_0xaeac('0x18')](/\./g,'')[_0xaeac('0x18')](/\s/g,'-')[_0xaeac('0xb')]());});_0x20c9c5=_0x1903dc[_0xaeac('0x21')](_0xaeac('0x3e'))[_0xaeac('0x10')]();_0x1903dc['addClass'](_0xaeac('0x3f'));_0x424220=_0x20c9c5['find'](_0xaeac('0x40'));_0x424220[_0xaeac('0x11')](function(){var _0x3ecc0c=_0x32b004(this),_0x57bf07;_0x57bf07=_0x3ecc0c[_0xaeac('0x21')](_0xaeac('0x3e'))[_0xaeac('0x10')]()[_0xaeac('0x12')](_0xaeac('0x41'));_0x3ecc0c[_0xaeac('0x12')](_0xaeac('0x42'));_0x3ecc0c[_0xaeac('0x25')]()['addClass'](_0xaeac('0x43'));});_0x424220[_0xaeac('0x12')](_0xaeac('0x43'));var _0x6bc485=0x0;var _0x5e20b5=function(_0x3e160d){_0x6bc485=_0x6bc485+0x1;var _0x73089c=_0x3e160d[_0xaeac('0x3b')]('li');var _0x74dc5=_0x73089c[_0xaeac('0x3b')]('*');if(!_0x74dc5[_0xaeac('0x24')])return;_0x74dc5[_0xaeac('0x12')](_0xaeac('0x44')+_0x6bc485);_0x5e20b5(_0x74dc5);};_0x5e20b5(_0x1903dc);_0x1903dc[_0xaeac('0x45')](_0x1903dc['find']('ul'))[_0xaeac('0x11')](function(){var _0x2500a4=_0x32b004(this);_0x2500a4['addClass'](_0xaeac('0x46')+_0x2500a4['children']('li')[_0xaeac('0x24')]+_0xaeac('0x47'));});});_0x41d32f(_0x2d3295);_0x937f78[_0xaeac('0x48')][_0xaeac('0x49')](this);_0x32b004(window)[_0xaeac('0x4a')](_0xaeac('0x4b'),_0x41dbb5);};_0x32b004['fn'][_0xaeac('0x2')]=function(_0x43da8e){var _0x396e13=_0x32b004(this);if(!_0x396e13[_0xaeac('0x24')])return _0x396e13;_0x937f78=_0x32b004['extend']({},_0xc9ea40,_0x43da8e);_0x396e13[_0xaeac('0x4c')]=new _0x32b004[(_0xaeac('0x2'))](_0x32b004(this));return _0x396e13;};_0x32b004(function(){_0x32b004('.qd_amazing_menu_auto')[_0xaeac('0x2')]();});}(this));

// smart cart
var _0x33c5=['error','Oooops!\x20','message','info','warn','object','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','toLowerCase','aviso','apply','_QuatroDigital_DropDown','QD_dropDownCart','neynoretnznfx%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>','skuName','vtexjs','ajax','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','find','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','body','removeClass','off','keyup.qd_ddc_closeFn','.qd-ddc-prodWrapper','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text','val','keyup.qd_ddc_cep','formatCepField','keyCode','.qd-ddc-shipping\x20.qd-ddc-cep-ok','click','.qd-ddc-cep-btn','preventDefault','.qd-ddc-cep-close','hide','click._QD_DDC_closeShipping','target','.qd-ddc-cep-tooltip','.qd-ddc-cep-ok','shippingCalculate','.qd-ddc-cep','updateOnlyHover','mouseenter.qd_ddc_hover','allowUpdate','getCartInfoByUrl','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','linkCart','.qd_ddc_continueShopping','html','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','.qd-ddc-emptyCart\x20p','emptyCart','each','call','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','allTotal','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','smartCheckout','getOrderForm','_QuatroDigital_AmountProduct','addClass','qd-ddc-prodLoaded','totalizers','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','renderProductsList','.qd-ddc-prodWrapper2','empty','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','attr','qd-ddc-','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','content','quantity','.qd-ddc-remove','.qd-ddc-image','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','.qd-ddc-shipping\x20input','address','postalCode','actionButtons','lastSku','outerHeight','scrollCart','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-cart-empty','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','insertProdImg','forceImageHTTPS','string','http','https','qd-loaded','load','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku-index','changeQantity','data-sku','.qd-ddc-prodQttWrapper:not(.qd_on)','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','.qd-ddc-quantity','keyup.qd_ddc_change','click.qd_ddc_remove','removeProduct','slideUp','remove','$1-$2$3','data','qdDdcLastPostalCode','calculateShipping','done','.qd-dd-cep-slas','logisticsInfo','slas','<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>','shippingEstimate','\x20dia\x20útil','\x20dias\x20útéis','<tr></tr>','<td>\x20R$\x20','price','</td><td>','\x20para\x20o\x20CEP\x20','</td>','insertBefore','.qd-ddc-cep-tooltip-text','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','exec','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','height','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','avisso','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','prodId','.qd-bap-qtt','prepend','ajaxStop','.qdDdcContainer','QD_smartCart','buyButton','dropDown','selector','QD_buyButton','smartCart','getParent','closest','replace','abs','undefined','pow','round','toFixed','split','length','join','_QuatroDigital_CartData','callback','Callbacks','function'];(function(_0x5d8dc6,_0x16f4f0){var _0x4e63f2=function(_0x5a0cd6){while(--_0x5a0cd6){_0x5d8dc6['push'](_0x5d8dc6['shift']());}};_0x4e63f2(++_0x16f4f0);}(_0x33c5,0xe6));var _0x533c=function(_0xf46bd9,_0x322826){_0xf46bd9=_0xf46bd9-0x0;var _0x2763c3=_0x33c5[_0xf46bd9];return _0x2763c3;};(function(_0x3e6081){_0x3e6081['fn'][_0x533c('0x0')]=_0x3e6081['fn'][_0x533c('0x1')];}(jQuery));function qd_number_format(_0x487b15,_0x9dafa,_0x26b916,_0x221e43){_0x487b15=(_0x487b15+'')[_0x533c('0x2')](/[^0-9+\-Ee.]/g,'');_0x487b15=isFinite(+_0x487b15)?+_0x487b15:0x0;_0x9dafa=isFinite(+_0x9dafa)?Math[_0x533c('0x3')](_0x9dafa):0x0;_0x221e43='undefined'===typeof _0x221e43?',':_0x221e43;_0x26b916=_0x533c('0x4')===typeof _0x26b916?'.':_0x26b916;var _0x151732='',_0x151732=function(_0x34ca89,_0x1699d5){var _0x9dafa=Math[_0x533c('0x5')](0xa,_0x1699d5);return''+(Math[_0x533c('0x6')](_0x34ca89*_0x9dafa)/_0x9dafa)[_0x533c('0x7')](_0x1699d5);},_0x151732=(_0x9dafa?_0x151732(_0x487b15,_0x9dafa):''+Math[_0x533c('0x6')](_0x487b15))[_0x533c('0x8')]('.');0x3<_0x151732[0x0][_0x533c('0x9')]&&(_0x151732[0x0]=_0x151732[0x0][_0x533c('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x221e43));(_0x151732[0x1]||'')[_0x533c('0x9')]<_0x9dafa&&(_0x151732[0x1]=_0x151732[0x1]||'',_0x151732[0x1]+=Array(_0x9dafa-_0x151732[0x1][_0x533c('0x9')]+0x1)['join']('0'));return _0x151732[_0x533c('0xa')](_0x26b916);};(function(){try{window[_0x533c('0xb')]=window[_0x533c('0xb')]||{},window[_0x533c('0xb')][_0x533c('0xc')]=window[_0x533c('0xb')]['callback']||$[_0x533c('0xd')]();}catch(_0xf93007){_0x533c('0x4')!==typeof console&&_0x533c('0xe')===typeof console[_0x533c('0xf')]&&console[_0x533c('0xf')](_0x533c('0x10'),_0xf93007[_0x533c('0x11')]);}}());(function(_0x59298d){try{var _0x335f73=jQuery,_0x7c1d33=function(_0x3f4a5c,_0x3e544f){if('object'===typeof console&&_0x533c('0x4')!==typeof console[_0x533c('0xf')]&&_0x533c('0x4')!==typeof console[_0x533c('0x12')]&&_0x533c('0x4')!==typeof console[_0x533c('0x13')]){var _0x1f0a72;_0x533c('0x14')===typeof _0x3f4a5c?(_0x3f4a5c[_0x533c('0x15')](_0x533c('0x16')),_0x1f0a72=_0x3f4a5c):_0x1f0a72=[_0x533c('0x16')+_0x3f4a5c];if(_0x533c('0x4')===typeof _0x3e544f||_0x533c('0x17')!==_0x3e544f[_0x533c('0x18')]()&&_0x533c('0x19')!==_0x3e544f[_0x533c('0x18')]())if(_0x533c('0x4')!==typeof _0x3e544f&&_0x533c('0x12')===_0x3e544f['toLowerCase']())try{console[_0x533c('0x12')]['apply'](console,_0x1f0a72);}catch(_0x57f5aa){try{console[_0x533c('0x12')](_0x1f0a72[_0x533c('0xa')]('\x0a'));}catch(_0x5f5090){}}else try{console[_0x533c('0xf')][_0x533c('0x1a')](console,_0x1f0a72);}catch(_0x3839fe){try{console[_0x533c('0xf')](_0x1f0a72['join']('\x0a'));}catch(_0x3762f7){}}else try{console[_0x533c('0x13')][_0x533c('0x1a')](console,_0x1f0a72);}catch(_0x107a97){try{console[_0x533c('0x13')](_0x1f0a72[_0x533c('0xa')]('\x0a'));}catch(_0xb51a5){}}}};window[_0x533c('0x1b')]=window[_0x533c('0x1b')]||{};window[_0x533c('0x1b')]['allowUpdate']=!0x0;_0x335f73[_0x533c('0x1c')]=function(){};_0x335f73['fn'][_0x533c('0x1c')]=function(){return{'fn':new _0x335f73()};};var _0x503c2e=function(_0x3caaa5){var _0x4f9f4a={'p':_0x533c('0x1d')};return function(_0x14d783){var _0x4a0e86=function(_0x8dd7f1){return _0x8dd7f1;};var _0x425f60=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x14d783=_0x14d783['d'+_0x425f60[0x10]+'c'+_0x425f60[0x11]+'m'+_0x4a0e86(_0x425f60[0x1])+'n'+_0x425f60[0xd]]['l'+_0x425f60[0x12]+'c'+_0x425f60[0x0]+'ti'+_0x4a0e86('o')+'n'];var _0x146a8e=function(_0x212d1b){return escape(encodeURIComponent(_0x212d1b[_0x533c('0x2')](/\./g,'¨')[_0x533c('0x2')](/[a-zA-Z]/g,function(_0x2fc7fa){return String[_0x533c('0x1e')](('Z'>=_0x2fc7fa?0x5a:0x7a)>=(_0x2fc7fa=_0x2fc7fa[_0x533c('0x1f')](0x0)+0xd)?_0x2fc7fa:_0x2fc7fa-0x1a);})));};var _0x58ae09=_0x146a8e(_0x14d783[[_0x425f60[0x9],_0x4a0e86('o'),_0x425f60[0xc],_0x425f60[_0x4a0e86(0xd)]][_0x533c('0xa')]('')]);_0x146a8e=_0x146a8e((window[['js',_0x4a0e86('no'),'m',_0x425f60[0x1],_0x425f60[0x4]['toUpperCase'](),_0x533c('0x20')][_0x533c('0xa')]('')]||_0x533c('0x21'))+['.v',_0x425f60[0xd],'e',_0x4a0e86('x'),'co',_0x4a0e86('mm'),_0x533c('0x22'),_0x425f60[0x1],'.c',_0x4a0e86('o'),'m.',_0x425f60[0x13],'r'][_0x533c('0xa')](''));for(var _0x397ad3 in _0x4f9f4a){if(_0x146a8e===_0x397ad3+_0x4f9f4a[_0x397ad3]||_0x58ae09===_0x397ad3+_0x4f9f4a[_0x397ad3]){var _0x41aba0='tr'+_0x425f60[0x11]+'e';break;}_0x41aba0='f'+_0x425f60[0x0]+'ls'+_0x4a0e86(_0x425f60[0x1])+'';}_0x4a0e86=!0x1;-0x1<_0x14d783[[_0x425f60[0xc],'e',_0x425f60[0x0],'rc',_0x425f60[0x9]][_0x533c('0xa')]('')][_0x533c('0x23')](_0x533c('0x24'))&&(_0x4a0e86=!0x0);return[_0x41aba0,_0x4a0e86];}(_0x3caaa5);}(window);if(!eval(_0x503c2e[0x0]))return _0x503c2e[0x1]?_0x7c1d33(_0x533c('0x25')):!0x1;_0x335f73[_0x533c('0x1c')]=function(_0x3f7ffc,_0x14dd9d){var _0x3803d0=_0x335f73(_0x3f7ffc);if(!_0x3803d0['length'])return _0x3803d0;var _0x2b801e=_0x335f73[_0x533c('0x26')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x533c('0x27'),'linkCheckout':_0x533c('0x28'),'cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':_0x533c('0x29'),'continueShopping':_0x533c('0x2a'),'shippingForm':_0x533c('0x2b')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'forceImageHTTPS':!0x1,'skuName':function(_0x40f077){return _0x40f077[_0x533c('0x2c')]||_0x40f077['name'];},'callback':function(){},'callbackProductsList':function(){}},_0x14dd9d);_0x335f73('');var _0x5a006c=this;if(_0x2b801e['smartCheckout']){var _0x56cdfd=!0x1;'undefined'===typeof window[_0x533c('0x2d')]&&(_0x7c1d33('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN'),_0x335f73[_0x533c('0x2e')]({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':!0x1,'dataType':_0x533c('0x2f'),'error':function(){_0x7c1d33(_0x533c('0x30'));_0x56cdfd=!0x0;}}));if(_0x56cdfd)return _0x7c1d33(_0x533c('0x31'));}if('object'===typeof window[_0x533c('0x2d')]&&_0x533c('0x4')!==typeof window[_0x533c('0x2d')]['checkout'])var _0x59298d=window[_0x533c('0x2d')][_0x533c('0x32')];else if('object'===typeof vtex&&_0x533c('0x14')===typeof vtex[_0x533c('0x32')]&&_0x533c('0x4')!==typeof vtex[_0x533c('0x32')][_0x533c('0x33')])_0x59298d=new vtex[(_0x533c('0x32'))][(_0x533c('0x33'))]();else return _0x7c1d33(_0x533c('0x34'));_0x5a006c[_0x533c('0x35')]=_0x533c('0x36');var _0x298cea=function(_0x55af6e){_0x335f73(this)[_0x533c('0x37')](_0x55af6e);_0x55af6e[_0x533c('0x38')](_0x533c('0x39'))[_0x533c('0x3a')](_0x335f73(_0x533c('0x3b')))['on'](_0x533c('0x3c'),function(){_0x3803d0['removeClass'](_0x533c('0x3d'));_0x335f73(document[_0x533c('0x3e')])[_0x533c('0x3f')]('qd-bb-lightBoxBodyProdAdd');});_0x335f73(document)[_0x533c('0x40')](_0x533c('0x41'))['on'](_0x533c('0x41'),function(_0x1abd47){0x1b==_0x1abd47['keyCode']&&(_0x3803d0[_0x533c('0x3f')]('qd-bb-lightBoxProdAdd'),_0x335f73(document[_0x533c('0x3e')])[_0x533c('0x3f')]('qd-bb-lightBoxBodyProdAdd'));});var _0x3f4015=_0x55af6e[_0x533c('0x38')](_0x533c('0x42'));_0x55af6e['find']('.qd-ddc-scrollUp')['on']('click.qd_ddc_scrollUp',function(){_0x5a006c['scrollCart']('-',void 0x0,void 0x0,_0x3f4015);return!0x1;});_0x55af6e[_0x533c('0x38')]('.qd-ddc-scrollDown')['on'](_0x533c('0x43'),function(){_0x5a006c['scrollCart'](void 0x0,void 0x0,void 0x0,_0x3f4015);return!0x1;});var _0x1590ec=_0x55af6e['find'](_0x533c('0x44'));_0x55af6e[_0x533c('0x38')]('.qd-ddc-shipping\x20.qd-ddc-cep')[_0x533c('0x45')]('')['on'](_0x533c('0x46'),function(_0x27ac8e){_0x5a006c[_0x533c('0x47')](_0x335f73(this));0xd==_0x27ac8e[_0x533c('0x48')]&&_0x55af6e['find'](_0x533c('0x49'))[_0x533c('0x4a')]();});_0x55af6e[_0x533c('0x38')](_0x533c('0x4b'))['click'](function(_0x40cbe0){_0x40cbe0[_0x533c('0x4c')]();_0x1590ec['toggle']();});_0x55af6e['find'](_0x533c('0x4d'))['click'](function(_0x2619b0){_0x2619b0[_0x533c('0x4c')]();_0x1590ec[_0x533c('0x4e')]();});_0x335f73(document)[_0x533c('0x40')](_0x533c('0x4f'))['on'](_0x533c('0x4f'),function(_0xa34f64){_0x335f73(_0xa34f64[_0x533c('0x50')])['closest'](_0x55af6e[_0x533c('0x38')](_0x533c('0x51')))[_0x533c('0x9')]||_0x1590ec['hide']();});_0x55af6e[_0x533c('0x38')](_0x533c('0x52'))['click'](function(_0x1d081c){_0x1d081c['preventDefault']();_0x5a006c[_0x533c('0x53')](_0x55af6e[_0x533c('0x38')](_0x533c('0x54')));});if(_0x2b801e[_0x533c('0x55')]){var _0x14dd9d=0x0;_0x335f73(this)['on'](_0x533c('0x56'),function(){var _0x55af6e=function(){window['_QuatroDigital_DropDown'][_0x533c('0x57')]&&(_0x5a006c[_0x533c('0x58')](),window[_0x533c('0x1b')][_0x533c('0x57')]=!0x1,_0x335f73['fn'][_0x533c('0x59')](!0x0),_0x5a006c[_0x533c('0x5a')]());};_0x14dd9d=setInterval(function(){_0x55af6e();},0x258);_0x55af6e();});_0x335f73(this)['on'](_0x533c('0x5b'),function(){clearInterval(_0x14dd9d);});}};var _0x50d5a2=function(_0x58d607){_0x58d607=_0x335f73(_0x58d607);_0x2b801e['texts']['cartTotal']=_0x2b801e[_0x533c('0x5c')][_0x533c('0x5d')]['replace'](_0x533c('0x5e'),_0x533c('0x5f'));_0x2b801e[_0x533c('0x5c')]['cartTotal']=_0x2b801e[_0x533c('0x5c')]['cartTotal']['replace'](_0x533c('0x60'),_0x533c('0x61'));_0x2b801e[_0x533c('0x5c')][_0x533c('0x5d')]=_0x2b801e[_0x533c('0x5c')][_0x533c('0x5d')][_0x533c('0x2')]('#shipping',_0x533c('0x62'));_0x2b801e['texts'][_0x533c('0x5d')]=_0x2b801e[_0x533c('0x5c')][_0x533c('0x5d')][_0x533c('0x2')](_0x533c('0x63'),_0x533c('0x64'));_0x58d607[_0x533c('0x38')](_0x533c('0x65'))['html'](_0x2b801e[_0x533c('0x5c')][_0x533c('0x66')]);_0x58d607[_0x533c('0x38')](_0x533c('0x67'))[_0x533c('0x68')](_0x2b801e[_0x533c('0x5c')]['continueShopping']);_0x58d607[_0x533c('0x38')]('.qd-ddc-checkout')[_0x533c('0x68')](_0x2b801e[_0x533c('0x5c')][_0x533c('0x69')]);_0x58d607[_0x533c('0x38')](_0x533c('0x6a'))[_0x533c('0x68')](_0x2b801e['texts']['cartTotal']);_0x58d607[_0x533c('0x38')](_0x533c('0x6b'))[_0x533c('0x68')](_0x2b801e[_0x533c('0x5c')]['shippingForm']);_0x58d607[_0x533c('0x38')](_0x533c('0x6c'))[_0x533c('0x68')](_0x2b801e[_0x533c('0x5c')][_0x533c('0x6d')]);return _0x58d607;}(this[_0x533c('0x35')]);var _0xe5a118=0x0;_0x3803d0[_0x533c('0x6e')](function(){0x0<_0xe5a118?_0x298cea[_0x533c('0x6f')](this,_0x50d5a2[_0x533c('0x70')]()):_0x298cea[_0x533c('0x6f')](this,_0x50d5a2);_0xe5a118++;});window[_0x533c('0xb')][_0x533c('0xc')][_0x533c('0x3a')](function(){_0x335f73(_0x533c('0x71'))[_0x533c('0x68')](window[_0x533c('0xb')]['total']||'--');_0x335f73(_0x533c('0x72'))['html'](window['_QuatroDigital_CartData'][_0x533c('0x73')]||'0');_0x335f73(_0x533c('0x74'))[_0x533c('0x68')](window[_0x533c('0xb')][_0x533c('0x75')]||'--');_0x335f73(_0x533c('0x76'))[_0x533c('0x68')](window['_QuatroDigital_CartData'][_0x533c('0x77')]||'--');});var _0x3c28b2=function(_0x54923c,_0x1fbad2){if(_0x533c('0x4')===typeof _0x54923c[_0x533c('0x78')])return _0x7c1d33(_0x533c('0x79'));_0x5a006c['renderProductsList'][_0x533c('0x6f')](this,_0x1fbad2);};_0x5a006c[_0x533c('0x58')]=function(_0x50223e,_0x1589b0){_0x533c('0x4')!=typeof _0x1589b0?window['_QuatroDigital_DropDown'][_0x533c('0x7a')]=_0x1589b0:window[_0x533c('0x1b')]['dataOptionsCache']&&(_0x1589b0=window[_0x533c('0x1b')]['dataOptionsCache']);setTimeout(function(){window['_QuatroDigital_DropDown'][_0x533c('0x7a')]=void 0x0;},_0x2b801e[_0x533c('0x7b')]);_0x335f73(_0x533c('0x7c'))[_0x533c('0x3f')]('qd-ddc-prodLoaded');if(_0x2b801e[_0x533c('0x7d')]){var _0x32fd4b=function(_0x47677d){window[_0x533c('0x1b')][_0x533c('0x7e')]=_0x47677d;_0x3c28b2(_0x47677d,_0x1589b0);'undefined'!==typeof window[_0x533c('0x7f')]&&'function'===typeof window[_0x533c('0x7f')]['exec']&&window[_0x533c('0x7f')]['exec']['call'](this);_0x335f73('.qd-ddc-wrapper')[_0x533c('0x80')](_0x533c('0x81'));};_0x533c('0x4')!==typeof window['_QuatroDigital_DropDown'][_0x533c('0x7e')]?(_0x32fd4b(window[_0x533c('0x1b')][_0x533c('0x7e')]),_0x533c('0xe')===typeof _0x50223e&&_0x50223e(window[_0x533c('0x1b')]['getOrderForm'])):_0x335f73['QD_checkoutQueue']([_0x533c('0x78'),_0x533c('0x82'),_0x533c('0x83')],{'done':function(_0x26e28c){_0x32fd4b[_0x533c('0x6f')](this,_0x26e28c);_0x533c('0xe')===typeof _0x50223e&&_0x50223e(_0x26e28c);},'fail':function(_0x377fac){_0x7c1d33([_0x533c('0x84'),_0x377fac]);}});}else alert(_0x533c('0x85'));};_0x5a006c['cartIsEmpty']=function(){var _0x179985=_0x335f73(_0x533c('0x7c'));_0x179985[_0x533c('0x38')](_0x533c('0x86'))[_0x533c('0x9')]?_0x179985[_0x533c('0x3f')](_0x533c('0x87')):_0x179985[_0x533c('0x80')](_0x533c('0x87'));};_0x5a006c[_0x533c('0x88')]=function(_0xfd598d){var _0x14dd9d=_0x335f73(_0x533c('0x89'));_0x14dd9d[_0x533c('0x8a')]();_0x14dd9d[_0x533c('0x6e')](function(){var _0x14dd9d=_0x335f73(this),_0x256bd0,_0x4b1b98,_0x367eb4=_0x335f73(''),_0x28592d;for(_0x28592d in window['_QuatroDigital_DropDown']['getOrderForm'][_0x533c('0x78')])if('object'===typeof window[_0x533c('0x1b')][_0x533c('0x7e')][_0x533c('0x78')][_0x28592d]){var _0x2e4907=window[_0x533c('0x1b')]['getOrderForm'][_0x533c('0x78')][_0x28592d];var _0x3f7ffc=_0x2e4907[_0x533c('0x8b')][_0x533c('0x2')](/^\/|\/$/g,'')[_0x533c('0x8')]('/');var _0x196d15=_0x335f73(_0x533c('0x8c'));_0x196d15[_0x533c('0x8d')]({'data-sku':_0x2e4907['id'],'data-sku-index':_0x28592d,'data-qd-departament':_0x3f7ffc[0x0],'data-qd-category':_0x3f7ffc[_0x3f7ffc[_0x533c('0x9')]-0x1]});_0x196d15[_0x533c('0x80')](_0x533c('0x8e')+_0x2e4907[_0x533c('0x8f')]);_0x196d15[_0x533c('0x38')](_0x533c('0x90'))[_0x533c('0x37')](_0x2b801e[_0x533c('0x2c')](_0x2e4907));_0x196d15[_0x533c('0x38')](_0x533c('0x91'))['append'](isNaN(_0x2e4907[_0x533c('0x92')])?_0x2e4907[_0x533c('0x92')]:0x0==_0x2e4907[_0x533c('0x92')]?_0x533c('0x93'):(_0x335f73('meta[name=currency]')[_0x533c('0x8d')](_0x533c('0x94'))||'R$')+'\x20'+qd_number_format(_0x2e4907['sellingPrice']/0x64,0x2,',','.'));_0x196d15[_0x533c('0x38')]('.qd-ddc-quantity')[_0x533c('0x8d')]({'data-sku':_0x2e4907['id'],'data-sku-index':_0x28592d})['val'](_0x2e4907[_0x533c('0x95')]);_0x196d15[_0x533c('0x38')](_0x533c('0x96'))['attr']({'data-sku':_0x2e4907['id'],'data-sku-index':_0x28592d});_0x5a006c['insertProdImg'](_0x2e4907['id'],_0x196d15['find'](_0x533c('0x97')),_0x2e4907['imageUrl']);_0x196d15[_0x533c('0x38')](_0x533c('0x98'))[_0x533c('0x8d')]({'data-sku':_0x2e4907['id'],'data-sku-index':_0x28592d});_0x196d15[_0x533c('0x99')](_0x14dd9d);_0x367eb4=_0x367eb4['add'](_0x196d15);}try{var _0x56f92d=_0x14dd9d[_0x533c('0x0')]('.qd-ddc-wrapper')[_0x533c('0x38')](_0x533c('0x9a'));_0x56f92d[_0x533c('0x9')]&&''==_0x56f92d['val']()&&window[_0x533c('0x1b')]['getOrderForm'][_0x533c('0x83')][_0x533c('0x9b')]&&_0x56f92d['val'](window[_0x533c('0x1b')][_0x533c('0x7e')][_0x533c('0x83')][_0x533c('0x9b')][_0x533c('0x9c')]);}catch(_0x4d74a6){_0x7c1d33('Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20'+_0x4d74a6[_0x533c('0x11')],_0x533c('0x19'));}_0x5a006c[_0x533c('0x9d')](_0x14dd9d);_0x5a006c['cartIsEmpty']();_0xfd598d&&_0xfd598d[_0x533c('0x9e')]&&function(){_0x4b1b98=_0x367eb4['filter']('[data-sku=\x27'+_0xfd598d[_0x533c('0x9e')]+'\x27]');_0x4b1b98[_0x533c('0x9')]&&(_0x256bd0=0x0,_0x367eb4['each'](function(){var _0xfd598d=_0x335f73(this);if(_0xfd598d['is'](_0x4b1b98))return!0x1;_0x256bd0+=_0xfd598d[_0x533c('0x9f')]();}),_0x5a006c[_0x533c('0xa0')](void 0x0,void 0x0,_0x256bd0,_0x14dd9d[_0x533c('0x3a')](_0x14dd9d[_0x533c('0xa1')]())),_0x367eb4[_0x533c('0x3f')](_0x533c('0xa2')),function(_0x24d827){_0x24d827[_0x533c('0x80')](_0x533c('0xa3'));_0x24d827[_0x533c('0x80')](_0x533c('0xa2'));setTimeout(function(){_0x24d827[_0x533c('0x3f')]('qd-ddc-lastAdded');},_0x2b801e[_0x533c('0x7b')]);}(_0x4b1b98),_0x335f73(document[_0x533c('0x3e')])[_0x533c('0x80')]('qd-ddc-product-add-time-v2'),setTimeout(function(){_0x335f73(document[_0x533c('0x3e')])['removeClass'](_0x533c('0xa4'));},_0x2b801e[_0x533c('0x7b')]));}();});(function(){_QuatroDigital_DropDown[_0x533c('0x7e')]['items'][_0x533c('0x9')]?(_0x335f73(_0x533c('0x3e'))[_0x533c('0x3f')]('qd-ddc-cart-empty')['addClass'](_0x533c('0xa5')),setTimeout(function(){_0x335f73('body')[_0x533c('0x3f')]('qd-ddc-product-add-time');},_0x2b801e[_0x533c('0x7b')])):_0x335f73(_0x533c('0x3e'))[_0x533c('0x3f')]('qd-ddc-cart-rendered')['addClass'](_0x533c('0xa6'));}());_0x533c('0xe')===typeof _0x2b801e[_0x533c('0xa7')]?_0x2b801e[_0x533c('0xa7')][_0x533c('0x6f')](this):_0x7c1d33(_0x533c('0xa8'));};_0x5a006c[_0x533c('0xa9')]=function(_0xe351a,_0x3e7afc,_0x5307b3){function _0x1322f3(){_0x2b801e[_0x533c('0xaa')]&&_0x533c('0xab')==typeof _0x5307b3&&(_0x5307b3=_0x5307b3['replace'](_0x533c('0xac'),_0x533c('0xad')));_0x3e7afc[_0x533c('0x3f')](_0x533c('0xae'))[_0x533c('0xaf')](function(){_0x335f73(this)[_0x533c('0x80')](_0x533c('0xae'));})[_0x533c('0x8d')](_0x533c('0xb0'),_0x5307b3);}_0x5307b3?_0x1322f3():isNaN(_0xe351a)?_0x7c1d33(_0x533c('0xb1'),_0x533c('0x17')):alert(_0x533c('0xb2'));};_0x5a006c['actionButtons']=function(_0x39ec33){var _0x14dd9d=function(_0x1ffb6e,_0xd72add){var _0x4c9b0d=_0x335f73(_0x1ffb6e);var _0x4f7d7e=_0x4c9b0d[_0x533c('0x8d')]('data-sku');var _0x3f7ffc=_0x4c9b0d['attr'](_0x533c('0xb3'));if(_0x4f7d7e){var _0x5b7280=parseInt(_0x4c9b0d[_0x533c('0x45')]())||0x1;_0x5a006c[_0x533c('0xb4')]([_0x4f7d7e,_0x3f7ffc],_0x5b7280,_0x5b7280+0x1,function(_0x2f7166){_0x4c9b0d[_0x533c('0x45')](_0x2f7166);_0x533c('0xe')===typeof _0xd72add&&_0xd72add();});}};var _0x39121b=function(_0x1e67de,_0xd1d719){var _0x14dd9d=_0x335f73(_0x1e67de);var _0x1e9a65=_0x14dd9d[_0x533c('0x8d')](_0x533c('0xb5'));var _0x4abaab=_0x14dd9d[_0x533c('0x8d')]('data-sku-index');if(_0x1e9a65){var _0x3f7ffc=parseInt(_0x14dd9d[_0x533c('0x45')]())||0x2;_0x5a006c[_0x533c('0xb4')]([_0x1e9a65,_0x4abaab],_0x3f7ffc,_0x3f7ffc-0x1,function(_0x19af4a){_0x14dd9d['val'](_0x19af4a);'function'===typeof _0xd1d719&&_0xd1d719();});}};var _0x22aa17=function(_0x443663,_0x24d092){var _0x3dbaae=_0x335f73(_0x443663);var _0x508586=_0x3dbaae[_0x533c('0x8d')](_0x533c('0xb5'));var _0x3f7ffc=_0x3dbaae[_0x533c('0x8d')]('data-sku-index');if(_0x508586){var _0x4c9b50=parseInt(_0x3dbaae['val']())||0x1;_0x5a006c[_0x533c('0xb4')]([_0x508586,_0x3f7ffc],0x1,_0x4c9b50,function(_0x31e1fa){_0x3dbaae['val'](_0x31e1fa);_0x533c('0xe')===typeof _0x24d092&&_0x24d092();});}};var _0x3f7ffc=_0x39ec33['find'](_0x533c('0xb6'));_0x3f7ffc[_0x533c('0x80')]('qd_on')['each'](function(){var _0x39ec33=_0x335f73(this);_0x39ec33['find']('.qd-ddc-quantityMore')['on'](_0x533c('0xb7'),function(_0x35ba43){_0x35ba43[_0x533c('0x4c')]();_0x3f7ffc[_0x533c('0x80')](_0x533c('0xb8'));_0x14dd9d(_0x39ec33[_0x533c('0x38')]('.qd-ddc-quantity'),function(){_0x3f7ffc['removeClass'](_0x533c('0xb8'));});});_0x39ec33[_0x533c('0x38')](_0x533c('0xb9'))['on'](_0x533c('0xba'),function(_0x359ff3){_0x359ff3[_0x533c('0x4c')]();_0x3f7ffc[_0x533c('0x80')](_0x533c('0xb8'));_0x39121b(_0x39ec33[_0x533c('0x38')]('.qd-ddc-quantity'),function(){_0x3f7ffc[_0x533c('0x3f')](_0x533c('0xb8'));});});_0x39ec33[_0x533c('0x38')]('.qd-ddc-quantity')['on'](_0x533c('0xbb'),function(){_0x3f7ffc[_0x533c('0x80')](_0x533c('0xb8'));_0x22aa17(this,function(){_0x3f7ffc[_0x533c('0x3f')](_0x533c('0xb8'));});});_0x39ec33['find'](_0x533c('0xbc'))['on'](_0x533c('0xbd'),function(_0x1bf0f3){0xd==_0x1bf0f3['keyCode']&&(_0x3f7ffc['addClass'](_0x533c('0xb8')),_0x22aa17(this,function(){_0x3f7ffc[_0x533c('0x3f')](_0x533c('0xb8'));}));});});_0x39ec33['find'](_0x533c('0x86'))[_0x533c('0x6e')](function(){var _0x39ec33=_0x335f73(this);_0x39ec33[_0x533c('0x38')](_0x533c('0x96'))['on'](_0x533c('0xbe'),function(){_0x39ec33[_0x533c('0x80')]('qd-loading');_0x5a006c[_0x533c('0xbf')](_0x335f73(this),function(_0x50afa9){_0x50afa9?_0x39ec33['stop'](!0x0)[_0x533c('0xc0')](function(){_0x39ec33[_0x533c('0xc1')]();_0x5a006c[_0x533c('0x5a')]();}):_0x39ec33['removeClass'](_0x533c('0xb8'));});return!0x1;});});};_0x5a006c['formatCepField']=function(_0x3109fa){var _0x4c8992=_0x3109fa[_0x533c('0x45')]();_0x4c8992=_0x4c8992['replace'](/[^0-9\-]/g,'');_0x4c8992=_0x4c8992[_0x533c('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x533c('0xc2'));_0x4c8992=_0x4c8992['replace'](/(.{9}).*/g,'$1');_0x3109fa[_0x533c('0x45')](_0x4c8992);};_0x5a006c[_0x533c('0x53')]=function(_0x44b87a){var _0xf1024c=_0x44b87a[_0x533c('0x45')]();0x9<=_0xf1024c['length']&&(_0x44b87a[_0x533c('0xc3')](_0x533c('0xc4'))!=_0xf1024c&&_0x59298d[_0x533c('0xc5')]({'postalCode':_0xf1024c,'country':'BRA'})[_0x533c('0xc6')](function(_0x3ea58d){_0x44b87a['closest']('.qd-ddc-cep-tooltip-text')[_0x533c('0x38')](_0x533c('0xc7'))[_0x533c('0xc1')]();window[_0x533c('0x1b')]['getOrderForm']=_0x3ea58d;_0x5a006c['getCartInfoByUrl']();_0x3ea58d=_0x3ea58d['shippingData'][_0x533c('0xc8')][0x0][_0x533c('0xc9')];for(var _0x3f7ffc=_0x335f73(_0x533c('0xca')),_0x4af774=0x0;_0x4af774<_0x3ea58d['length'];_0x4af774++){var _0x537f99=_0x3ea58d[_0x4af774],_0x1a42d2=0x1<_0x537f99['shippingEstimate']?_0x537f99[_0x533c('0xcb')][_0x533c('0x2')]('bd',_0x533c('0xcc')):_0x537f99[_0x533c('0xcb')][_0x533c('0x2')]('bd',_0x533c('0xcd')),_0x439288=_0x335f73(_0x533c('0xce'));_0x439288[_0x533c('0x37')](_0x533c('0xcf')+qd_number_format(_0x537f99[_0x533c('0xd0')]/0x64,0x2,',','.')+_0x533c('0xd1')+_0x537f99['name']+',\x20entrega\x20em\x20'+_0x1a42d2+_0x533c('0xd2')+_0xf1024c+_0x533c('0xd3'));_0x439288[_0x533c('0x99')](_0x3f7ffc[_0x533c('0x38')]('tbody'));}_0x3f7ffc[_0x533c('0xd4')](_0x44b87a[_0x533c('0x1')](_0x533c('0xd5'))[_0x533c('0x38')]('.qd-ddc-cep-close'));})[_0x533c('0xd6')](function(_0x2c9b13){_0x7c1d33([_0x533c('0xd7'),_0x2c9b13]);updateCartData();}),_0x44b87a[_0x533c('0xc3')]('qdDdcLastPostalCode',_0xf1024c));};_0x5a006c[_0x533c('0xb4')]=function(_0x1625c6,_0x1f2efe,_0x4873bc,_0x1b8504){function _0xe8cb7(_0x27b0f0){_0x27b0f0=_0x533c('0xd8')!==typeof _0x27b0f0?!0x1:_0x27b0f0;_0x5a006c[_0x533c('0x58')]();window[_0x533c('0x1b')]['allowUpdate']=!0x1;_0x5a006c[_0x533c('0x5a')]();_0x533c('0x4')!==typeof window[_0x533c('0x7f')]&&_0x533c('0xe')===typeof window[_0x533c('0x7f')][_0x533c('0xd9')]&&window[_0x533c('0x7f')][_0x533c('0xd9')][_0x533c('0x6f')](this);_0x533c('0xe')===typeof adminCart&&adminCart();_0x335f73['fn'][_0x533c('0x59')](!0x0,void 0x0,_0x27b0f0);'function'===typeof _0x1b8504&&_0x1b8504(_0x1f2efe);}_0x4873bc=_0x4873bc||0x1;if(0x1>_0x4873bc)return _0x1f2efe;if(_0x2b801e['smartCheckout']){if(_0x533c('0x4')===typeof window[_0x533c('0x1b')][_0x533c('0x7e')]['items'][_0x1625c6[0x1]])return _0x7c1d33(_0x533c('0xda')+_0x1625c6[0x1]+']'),_0x1f2efe;window[_0x533c('0x1b')]['getOrderForm'][_0x533c('0x78')][_0x1625c6[0x1]]['quantity']=_0x4873bc;window[_0x533c('0x1b')][_0x533c('0x7e')][_0x533c('0x78')][_0x1625c6[0x1]][_0x533c('0xdb')]=_0x1625c6[0x1];_0x59298d['updateItems']([window['_QuatroDigital_DropDown'][_0x533c('0x7e')]['items'][_0x1625c6[0x1]]],[_0x533c('0x78'),_0x533c('0x82'),_0x533c('0x83')])[_0x533c('0xc6')](function(_0x266c4a){window['_QuatroDigital_DropDown'][_0x533c('0x7e')]=_0x266c4a;_0xe8cb7(!0x0);})[_0x533c('0xd6')](function(_0x2769dc){_0x7c1d33([_0x533c('0xdc'),_0x2769dc]);_0xe8cb7();});}else _0x7c1d33(_0x533c('0xdd'));};_0x5a006c[_0x533c('0xbf')]=function(_0x1f20ae,_0xc41744){function _0x31a749(_0x24bb09){_0x24bb09='boolean'!==typeof _0x24bb09?!0x1:_0x24bb09;'undefined'!==typeof window[_0x533c('0x7f')]&&_0x533c('0xe')===typeof window['_QuatroDigital_AmountProduct'][_0x533c('0xd9')]&&window[_0x533c('0x7f')][_0x533c('0xd9')][_0x533c('0x6f')](this);_0x533c('0xe')===typeof adminCart&&adminCart();_0x335f73['fn'][_0x533c('0x59')](!0x0,void 0x0,_0x24bb09);_0x533c('0xe')===typeof _0xc41744&&_0xc41744(_0x3aa6f0);}var _0x3aa6f0=!0x1,_0x3f7ffc=_0x335f73(_0x1f20ae)[_0x533c('0x8d')](_0x533c('0xb3'));if(_0x2b801e[_0x533c('0x7d')]){if(_0x533c('0x4')===typeof window[_0x533c('0x1b')][_0x533c('0x7e')][_0x533c('0x78')][_0x3f7ffc])return _0x7c1d33('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x3f7ffc+']'),_0x3aa6f0;window['_QuatroDigital_DropDown'][_0x533c('0x7e')][_0x533c('0x78')][_0x3f7ffc][_0x533c('0xdb')]=_0x3f7ffc;_0x59298d['removeItems']([window['_QuatroDigital_DropDown'][_0x533c('0x7e')][_0x533c('0x78')][_0x3f7ffc]],['items',_0x533c('0x82'),_0x533c('0x83')])['done'](function(_0x134813){_0x3aa6f0=!0x0;window[_0x533c('0x1b')][_0x533c('0x7e')]=_0x134813;_0x3c28b2(_0x134813);_0x31a749(!0x0);})[_0x533c('0xd6')](function(_0x10b7a4){_0x7c1d33(['Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho',_0x10b7a4]);_0x31a749();});}else alert('Atenção,\x20este\x20método\x20esta\x20descontinuado.');};_0x5a006c[_0x533c('0xa0')]=function(_0x45f639,_0x5598e0,_0x706aa4,_0x2f70f7){_0x2f70f7=_0x2f70f7||_0x335f73('.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2');_0x45f639=_0x45f639||'+';_0x5598e0=_0x5598e0||0.9*_0x2f70f7[_0x533c('0xde')]();_0x2f70f7['stop'](!0x0,!0x0)['animate']({'scrollTop':isNaN(_0x706aa4)?_0x45f639+'='+_0x5598e0+'px':_0x706aa4});};_0x2b801e[_0x533c('0x55')]||(_0x5a006c[_0x533c('0x58')](),_0x335f73['fn'][_0x533c('0x59')](!0x0));_0x335f73(window)['on'](_0x533c('0xdf'),function(){try{window[_0x533c('0x1b')][_0x533c('0x7e')]=void 0x0,_0x5a006c[_0x533c('0x58')]();}catch(_0x583941){_0x7c1d33('Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20'+_0x583941['message'],_0x533c('0xe0'));}});_0x533c('0xe')===typeof _0x2b801e[_0x533c('0xc')]?_0x2b801e[_0x533c('0xc')][_0x533c('0x6f')](this):_0x7c1d33('Callback\x20não\x20é\x20uma\x20função');};_0x335f73['fn'][_0x533c('0x1c')]=function(_0x5540c1){var _0xeb07b0=_0x335f73(this);_0xeb07b0['fn']=new _0x335f73[(_0x533c('0x1c'))](this,_0x5540c1);return _0xeb07b0;};}catch(_0x2dda31){_0x533c('0x4')!==typeof console&&_0x533c('0xe')===typeof console[_0x533c('0xf')]&&console['error']('Oooops!\x20',_0x2dda31);}}(this));(function(_0x1700ad){try{var _0x555734=jQuery;window[_0x533c('0x7f')]=window['_QuatroDigital_AmountProduct']||{};window[_0x533c('0x7f')][_0x533c('0x78')]={};window[_0x533c('0x7f')][_0x533c('0xe1')]=!0x1;window[_0x533c('0x7f')][_0x533c('0xe2')]=!0x1;window[_0x533c('0x7f')][_0x533c('0xe3')]=!0x1;var _0x3602f2=function(){if(window[_0x533c('0x7f')]['allowRecalculate']){var _0x49ca9c=!0x1;var _0x499a37={};window[_0x533c('0x7f')][_0x533c('0x78')]={};for(_0x3a463f in window['_QuatroDigital_DropDown'][_0x533c('0x7e')]['items'])if(_0x533c('0x14')===typeof window['_QuatroDigital_DropDown']['getOrderForm'][_0x533c('0x78')][_0x3a463f]){var _0x24c18e=window[_0x533c('0x1b')]['getOrderForm']['items'][_0x3a463f];_0x533c('0x4')!==typeof _0x24c18e[_0x533c('0xe4')]&&null!==_0x24c18e[_0x533c('0xe4')]&&''!==_0x24c18e['productId']&&(window['_QuatroDigital_AmountProduct'][_0x533c('0x78')][_0x533c('0xe5')+_0x24c18e[_0x533c('0xe4')]]=window[_0x533c('0x7f')][_0x533c('0x78')][_0x533c('0xe5')+_0x24c18e[_0x533c('0xe4')]]||{},window[_0x533c('0x7f')][_0x533c('0x78')][_0x533c('0xe5')+_0x24c18e['productId']]['prodId']=_0x24c18e[_0x533c('0xe4')],_0x499a37[_0x533c('0xe5')+_0x24c18e['productId']]||(window[_0x533c('0x7f')]['items'][_0x533c('0xe5')+_0x24c18e['productId']][_0x533c('0x73')]=0x0),window['_QuatroDigital_AmountProduct'][_0x533c('0x78')][_0x533c('0xe5')+_0x24c18e['productId']]['qtt']+=_0x24c18e[_0x533c('0x95')],_0x49ca9c=!0x0,_0x499a37[_0x533c('0xe5')+_0x24c18e[_0x533c('0xe4')]]=!0x0);}var _0x3a463f=_0x49ca9c;}else _0x3a463f=void 0x0;window[_0x533c('0x7f')]['allowRecalculate']&&(_0x555734(_0x533c('0xe6'))[_0x533c('0xc1')](),_0x555734(_0x533c('0xe7'))[_0x533c('0x3f')](_0x533c('0xe8')));for(var _0x2550b4 in window[_0x533c('0x7f')][_0x533c('0x78')]){_0x24c18e=window['_QuatroDigital_AmountProduct'][_0x533c('0x78')][_0x2550b4];if(_0x533c('0x14')!==typeof _0x24c18e)return;_0x499a37=_0x555734(_0x533c('0xe9')+_0x24c18e[_0x533c('0xea')]+']')[_0x533c('0x0')]('li');if(window[_0x533c('0x7f')][_0x533c('0xe1')]||!_0x499a37[_0x533c('0x38')](_0x533c('0xe6'))['length'])_0x49ca9c=_0x555734('<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>'),_0x49ca9c[_0x533c('0x38')](_0x533c('0xeb'))[_0x533c('0x68')](_0x24c18e['qtt']),_0x24c18e=_0x499a37['find']('.qd_bap_wrapper_content'),_0x24c18e['length']?_0x24c18e[_0x533c('0xec')](_0x49ca9c)[_0x533c('0x80')]('qd-bap-item-added'):_0x499a37[_0x533c('0xec')](_0x49ca9c);}_0x3a463f&&(window[_0x533c('0x7f')][_0x533c('0xe1')]=!0x1);};window[_0x533c('0x7f')][_0x533c('0xd9')]=function(){window[_0x533c('0x7f')][_0x533c('0xe1')]=!0x0;_0x3602f2['call'](this);};_0x555734(document)[_0x533c('0xed')](function(){_0x3602f2[_0x533c('0x6f')](this);});}catch(_0x596536){_0x533c('0x4')!==typeof console&&_0x533c('0xe')===typeof console[_0x533c('0xf')]&&console[_0x533c('0xf')]('Oooops!\x20',_0x596536);}}(this));(function(){try{var _0x18540d=jQuery,_0x379a77,_0x1f4eef={'selector':_0x533c('0xee'),'dropDown':{},'buyButton':{}};_0x18540d[_0x533c('0xef')]=function(_0xc161b2){var _0x397ac0={};_0x379a77=_0x18540d[_0x533c('0x26')](!0x0,{},_0x1f4eef,_0xc161b2);_0xc161b2=_0x18540d(_0x379a77['selector'])[_0x533c('0x1c')](_0x379a77['dropDown']);_0x397ac0[_0x533c('0xf0')]='undefined'!==typeof _0x379a77[_0x533c('0xf1')][_0x533c('0x55')]&&!0x1===_0x379a77[_0x533c('0xf1')]['updateOnlyHover']?_0x18540d(_0x379a77[_0x533c('0xf2')])[_0x533c('0xf3')](_0xc161b2['fn'],_0x379a77[_0x533c('0xf0')]):_0x18540d(_0x379a77[_0x533c('0xf2')])[_0x533c('0xf3')](_0x379a77[_0x533c('0xf0')]);_0x397ac0[_0x533c('0xf1')]=_0xc161b2;return _0x397ac0;};_0x18540d['fn'][_0x533c('0xf4')]=function(){'object'===typeof console&&_0x533c('0xe')===typeof console[_0x533c('0x12')]&&console[_0x533c('0x12')]('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x18540d[_0x533c('0xf4')]=_0x18540d['fn'][_0x533c('0xf4')];}catch(_0x3b40b7){_0x533c('0x4')!==typeof console&&_0x533c('0xe')===typeof console[_0x533c('0xf')]&&console[_0x533c('0xf')](_0x533c('0x10'),_0x3b40b7);}}());

// vtex url parse
/* Quatro Digital - VTEX URL Parse // 1.4 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
var _0x8349=["\x6C\x69\x6E\x6B","\x3C\x61\x20\x68\x72\x65\x66\x3D\x22","\x22\x3E\x3C\x2F\x61\x3E","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\x66\x75\x6E\x63\x74\x69\x6F\x6E","\x65\x72\x72\x6F\x72","\x50\x72\x6F\x62\x6C\x65\x6D\x61\x73\x20\x3A\x28\x20\x2E\x20\x44\x65\x74\x61\x6C\x68\x65\x73\x3A\x20","\x2F","\x73\x70\x6C\x69\x74","","\x72\x65\x70\x6C\x61\x63\x65","\x70\x61\x74\x68\x6E\x61\x6D\x65","\x2C","\x70\x6F\x70","\x6D\x61\x74\x63\x68","\x73\x65\x61\x72\x63\x68","\x6C\x65\x6E\x67\x74\x68","\x6F\x62\x6A\x65\x63\x74","\x70\x75\x73\x68","\x63","\x6D\x61\x70","\x73\x68\x69\x66\x74","\x6F\x74\x68\x65\x72\x5F\x70\x61\x74\x68","\x6F\x74\x68\x65\x72\x5F\x73\x65\x61\x72\x63\x68","\x26","\x6F\x75\x74","\x67\x65\x74\x4D\x61\x70","\x70\x72\x6F\x74\x6F\x74\x79\x70\x65","\x6D\x65\x72\x67\x65\x55\x72\x6C","\x63\x61\x6C\x6C","\x65\x78\x74\x65\x6E\x64","\x67\x65\x74\x55\x72\x6C","\x6D\x61\x70\x3D","\x6A\x6F\x69\x6E","\x3F","\x51\x44\x5F\x56\x74\x65\x78\x55\x72\x6C\x50\x61\x72\x73\x65"];(function(){function _0x6ac7x1(_0x6ac7x2){try{this[_0x8349[0]]=$(_0x8349[1]+_0x6ac7x2+_0x8349[2])[0]}catch(c){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],c)}}function _0x6ac7x3(_0x6ac7x2){try{_0x6ac7x2=_0x6ac7x2||this[_0x8349[0]];var _0x6ac7x4=_0x6ac7x2[_0x8349[11]][_0x8349[10]](/\/\//g,_0x8349[7])[_0x8349[10]](/(^\/|\/$)/g,_0x8349[9])[_0x8349[8]](_0x8349[7]),_0x6ac7x5=((_0x6ac7x2[_0x8349[15]]||_0x8349[9])[_0x8349[14]](/map\=([^&]+)/i)||[_0x8349[9]])[_0x8349[13]]()[_0x8349[8]](_0x8349[12]);if(1==_0x6ac7x5[_0x8349[16]]&&0==_0x6ac7x5[0][_0x8349[16]]){if(_0x8349[17]== typeof defaultMap){_0x6ac7x5=defaultMap}else {for(var _0x6ac7x6=0;_0x6ac7x6<_0x6ac7x4[_0x8349[16]];_0x6ac7x6++){_0x6ac7x4[_0x6ac7x6][_0x8349[16]]&&_0x8349[7]!=_0x6ac7x4[_0x6ac7x6]&&_0x6ac7x5[_0x8349[18]](defaultMap)}}};for(var _0x6ac7x6={map:{},other_path:_0x8349[9]},_0x6ac7x7=0;_0x6ac7x7<_0x6ac7x5[_0x8349[16]];_0x6ac7x7++){_0x6ac7x5[_0x6ac7x7][_0x8349[16]]&&(_0x8349[19]==_0x6ac7x5[_0x6ac7x7]?(_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]=_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]||[],_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]][_0x8349[18]]((_0x6ac7x4||[_0x8349[9]])[_0x8349[21]]())):_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]=(_0x6ac7x4||[_0x8349[9]])[_0x8349[21]]())};_0x6ac7x6[_0x8349[22]]=_0x6ac7x4;_0x6ac7x6[_0x8349[23]]=(_0x6ac7x2[_0x8349[15]]||_0x8349[9])[_0x8349[10]](/map\=([^&]+)/ig,_0x8349[9])[_0x8349[10]](/\&\&+/ig,_0x8349[24])[_0x8349[10]](/\?/g,_0x8349[9]);return this[_0x8349[25]]=_0x6ac7x6}catch(g){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],g)}}_0x6ac7x1[_0x8349[27]][_0x8349[26]]=_0x6ac7x3;_0x6ac7x1[_0x8349[27]][_0x8349[28]]=function(_0x6ac7x2,_0x6ac7x4){try{var _0x6ac7x5=_0x6ac7x3[_0x8349[29]](this,this[_0x8349[0]]),_0x6ac7x6=_0x6ac7x3[_0x8349[29]](this,$(_0x8349[1]+_0x6ac7x2+_0x8349[2])[0]);_0x6ac7x5[_0x8349[22]][_0x8349[16]]||(_0x6ac7x5[_0x8349[22]]=void(0));_0x6ac7x5[_0x8349[23]][_0x8349[16]]||(_0x6ac7x5[_0x8349[23]]=void(0));var _0x6ac7x7=$[_0x8349[30]](!0,{},_0x6ac7x6,_0x6ac7x5);if(_0x8349[17]== typeof _0x6ac7x4){for(_0x6ac7x6=0;_0x6ac7x6<_0x6ac7x4[_0x8349[16]];_0x6ac7x6++){_0x6ac7x7[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]]&&(_0x6ac7x7[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]]=_0x6ac7x5[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]])}};return this[_0x8349[25]]=_0x6ac7x7}catch(g){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],g)}};_0x6ac7x1[_0x8349[27]][_0x8349[31]]=function(_0x6ac7x2){try{var _0x6ac7x4=[],_0x6ac7x5=[];_0x6ac7x2=_0x6ac7x2||{};for(var _0x6ac7x6 in this[_0x8349[25]][_0x8349[20]]){if(!_0x6ac7x2[_0x6ac7x6]){if(_0x8349[19]==_0x6ac7x6){for(var _0x6ac7x7=0;_0x6ac7x7<this[_0x8349[25]][_0x8349[20]][_0x6ac7x6][_0x8349[16]];_0x6ac7x7++){_0x6ac7x4[_0x8349[18]](this[_0x8349[25]][_0x8349[20]][_0x6ac7x6][_0x6ac7x7]),_0x6ac7x5[_0x8349[18]](_0x6ac7x6)}}else {_0x6ac7x4[_0x8349[18]](this[_0x8349[25]][_0x8349[20]][_0x6ac7x6]),_0x6ac7x5[_0x8349[18]](_0x6ac7x6)}}};var _0x6ac7x8=_0x6ac7x5[_0x8349[16]]?_0x8349[32]+_0x6ac7x5[_0x8349[33]](_0x8349[12])+_0x8349[24]:_0x8349[9];return _0x8349[7]+_0x6ac7x4[_0x8349[33]](_0x8349[7])+(this[_0x8349[25]][_0x8349[22]][_0x8349[16]]?_0x8349[7]+this[_0x8349[25]][_0x8349[22]][_0x8349[33]](_0x8349[7]):_0x8349[9])+_0x8349[34]+(_0x6ac7x8+this[_0x8349[25]][_0x8349[23]])[_0x8349[10]](/\&\&+/g,_0x8349[24])}catch(_0x6ac7x1){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],_0x6ac7x1)}};window[_0x8349[35]]=_0x6ac7x1})()

/* Quatro Digital - QD Select Smart Research 2 // Carlos Vinicius // Todos os direitos reservados */
var _0x5f66=['warn','unshift','[Quatro\x20Digital\x20-\x20QD\x20Select\x20Smart\x20Research\x202]\x0a','toLowerCase','aviso','join','apply','Selecione\x20o\x20anterior','Selecione\x20o(a)\x20','location','attr','data-qdssr-title','each','push','text','trim','Desculpe,\x20não\x20foi\x20possível\x20executar\x20sua\x20solicitação.\x20Por\x20favor\x20entre\x20em\x20contato\x20com\x20o\x20SAC.','neynoretnznfx%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','charCodeAt','toUpperCase','ite','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','options','length','QuatroDigital.ssrSelectAjaxPopulated','Problemas\x20ao\x20definir\x20a\x20opção\x20selecionada.\x20Detalhes:\x20','message','qd-ssr2-loaded','Problemas\x20ao\x20tentar\x20verificar\x20as\x20opções\x20selecionadas.\x20Detalhes:\x20','index','<label\x20for=\x22qd-ssr2-select-','labelMessage','optionsPlaceHolder','\x22\x20id=\x22qd-ssr2-select-','\x22\x20data-qdssr-title=\x22','<option\x20value=\x22\x22></option>','disabledMessage','</select></div>','select','add','pt-BR','bind','change','find','data-qdssr-ndx','val','trigger','QuatroDigital.ssrChange','body','addClass','qd-ssr-reloading','redirect','split','shift','qd-ssr-loading','qdAjax','html','removeAttr','disabled','select2','ajaxError','removeClass','qd-ssr2-loading','optionIsChecked','select[data-qdssr-ndx=','option[data-qdssr-text=\x27','<option\x20value=\x22','getCategory','cache','script:not([src])','innerHTML','buscapagina','match','pop','extend','qdPlugin','.qd_auto_select_smart_research_2','QD_SelectSmartResearch2','object','error','undefined'];(function(_0x31b3a3,_0x54d8d1){var _0x1ff1e4=function(_0x450d5b){while(--_0x450d5b){_0x31b3a3['push'](_0x31b3a3['shift']());}};_0x1ff1e4(++_0x54d8d1);}(_0x5f66,0x1a0));var _0x65f6=function(_0x2b4411,_0x2625ed){_0x2b4411=_0x2b4411-0x0;var _0x8e41ef=_0x5f66[_0x2b4411];return _0x8e41ef;};(function(_0x253044){var _0x463d05=jQuery;if('function'!==typeof _0x463d05['fn'][_0x65f6('0x0')]){_0x463d05['fn'][_0x65f6('0x0')]=function(){};var _0x3461cd=function(_0x1a330c,_0x5eb9ad){if(_0x65f6('0x1')===typeof console&&'undefined'!==typeof console[_0x65f6('0x2')]&&_0x65f6('0x3')!==typeof console['info']&&'undefined'!==typeof console[_0x65f6('0x4')]){var _0x2c6571;_0x65f6('0x1')===typeof _0x1a330c?(_0x1a330c[_0x65f6('0x5')](_0x65f6('0x6')),_0x2c6571=_0x1a330c):_0x2c6571=[_0x65f6('0x6')+_0x1a330c];if('undefined'===typeof _0x5eb9ad||'alerta'!==_0x5eb9ad[_0x65f6('0x7')]()&&_0x65f6('0x8')!==_0x5eb9ad[_0x65f6('0x7')]())if(_0x65f6('0x3')!==typeof _0x5eb9ad&&'info'===_0x5eb9ad[_0x65f6('0x7')]())try{console['info']['apply'](console,_0x2c6571);}catch(_0x2d2dfa){try{console['info'](_0x2c6571[_0x65f6('0x9')]('\x0a'));}catch(_0x4862a5){}}else try{console[_0x65f6('0x2')][_0x65f6('0xa')](console,_0x2c6571);}catch(_0x2c4ee5){try{console[_0x65f6('0x2')](_0x2c6571[_0x65f6('0x9')]('\x0a'));}catch(_0x1d29fd){}}else try{console[_0x65f6('0x4')][_0x65f6('0xa')](console,_0x2c6571);}catch(_0x46dbc6){try{console[_0x65f6('0x4')](_0x2c6571['join']('\x0a'));}catch(_0x19b9ff){}}}},_0xbce843={'options':[],'optionsPlaceHolder':[],'disabledMessage':function(_0x49a913,_0x5dd324,_0x1693e6){return _0x65f6('0xb');},'labelMessage':function(_0x37330d,_0x1c955c,_0x1b1cbb){return _0x65f6('0xc')+_0x1b1cbb[_0x37330d];},'redirect':function(_0xc8660c){window[_0x65f6('0xd')]['href']=_0xc8660c;},'getAjaxOptions':function(_0x4d79a1,_0x2d538c){var _0x5b4055=[];_0x463d05(_0x4d79a1)['find']('.search-single-navigator\x20ul.'+_0x2d538c[_0x65f6('0xe')](_0x65f6('0xf')))['find']('a')[_0x65f6('0x10')](function(){var _0x2d538c=_0x463d05(this);_0x5b4055[_0x65f6('0x11')]([_0x2d538c[_0x65f6('0x12')]()[_0x65f6('0x13')](),_0x2d538c[_0x65f6('0xe')]('href')||'']);});return _0x5b4055;},'optionIsChecked':function(_0x197a49){_0x197a49=_0x463d05('h5.'+_0x197a49+'\x20+ul\x20.filtro-ativo:first')[_0x65f6('0x12')]()[_0x65f6('0x13')]();return _0x197a49['length']?_0x197a49:null;},'ajaxError':function(){_0x3461cd(_0x65f6('0x14'));}};_0x253044=function(_0x471a33){var _0x2317ce={'p':_0x65f6('0x15')};return function(_0x4f5a69){var _0x9d7bb0=function(_0x59ea32){return _0x59ea32;};var _0x20a161=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4f5a69=_0x4f5a69['d'+_0x20a161[0x10]+'c'+_0x20a161[0x11]+'m'+_0x9d7bb0(_0x20a161[0x1])+'n'+_0x20a161[0xd]]['l'+_0x20a161[0x12]+'c'+_0x20a161[0x0]+'ti'+_0x9d7bb0('o')+'n'];var _0x5963e0=function(_0x5cb131){return escape(encodeURIComponent(_0x5cb131['replace'](/\./g,'¨')[_0x65f6('0x16')](/[a-zA-Z]/g,function(_0x16cde8){return String['fromCharCode'](('Z'>=_0x16cde8?0x5a:0x7a)>=(_0x16cde8=_0x16cde8[_0x65f6('0x17')](0x0)+0xd)?_0x16cde8:_0x16cde8-0x1a);})));};var _0x28f710=_0x5963e0(_0x4f5a69[[_0x20a161[0x9],_0x9d7bb0('o'),_0x20a161[0xc],_0x20a161[_0x9d7bb0(0xd)]]['join']('')]);_0x5963e0=_0x5963e0((window[['js',_0x9d7bb0('no'),'m',_0x20a161[0x1],_0x20a161[0x4][_0x65f6('0x18')](),_0x65f6('0x19')][_0x65f6('0x9')]('')]||'---')+['.v',_0x20a161[0xd],'e',_0x9d7bb0('x'),'co',_0x9d7bb0('mm'),'erc',_0x20a161[0x1],'.c',_0x9d7bb0('o'),'m.',_0x20a161[0x13],'r']['join'](''));for(var _0x266cfe in _0x2317ce){if(_0x5963e0===_0x266cfe+_0x2317ce[_0x266cfe]||_0x28f710===_0x266cfe+_0x2317ce[_0x266cfe]){var _0x3c032f='tr'+_0x20a161[0x11]+'e';break;}_0x3c032f='f'+_0x20a161[0x0]+'ls'+_0x9d7bb0(_0x20a161[0x1])+'';}_0x9d7bb0=!0x1;-0x1<_0x4f5a69[[_0x20a161[0xc],'e',_0x20a161[0x0],'rc',_0x20a161[0x9]][_0x65f6('0x9')]('')][_0x65f6('0x1a')](_0x65f6('0x1b'))&&(_0x9d7bb0=!0x0);return[_0x3c032f,_0x9d7bb0];}(_0x471a33);}(window);if(!eval(_0x253044[0x0]))return _0x253044[0x1]?_0x3461cd(_0x65f6('0x1c')):!0x1;_0x463d05[_0x65f6('0x0')]=function(_0x4ace4c,_0x4ea23d){if(!_0x4ea23d[_0x65f6('0x1d')][_0x65f6('0x1e')])return _0x3461cd('Nenhuma\x20opção\x20foi\x20enviada,\x20é\x20esperado\x20um\x20array\x20com\x20sub\x20arrays\x20contendo\x20o\x20conjunto\x20chave/valor.');_0x4ace4c['each'](function(){try{var _0x10b368=_0x463d05(this),_0x1ce43c=_0x37c086(_0x10b368,_0x4ea23d,_0x4ace4c);_0x2f054c(_0x10b368,_0x4ea23d,0x0);_0x1ce43c['on'](_0x65f6('0x1f'),function(_0xc53cb7,_0x1217fd){try{_0x2f054c(_0x10b368,_0x4ea23d,_0x1217fd[_0x65f6('0xe')]('data-qdssr-ndx'));}catch(_0x103265){_0x3461cd(_0x65f6('0x20')+_0x103265[_0x65f6('0x21')]);}});_0x10b368['addClass'](_0x65f6('0x22'));}catch(_0x2a7aa8){_0x3461cd(_0x65f6('0x23')+_0x2a7aa8[_0x65f6('0x21')]);}});};var _0x37c086=function(_0x3c7c58,_0x1b24ea,_0x4f3e22){try{for(var _0x36dbf4='',_0x5a740a,_0x253044=!0x0,_0x50494b=new _0x463d05(),_0x2b9fb6=!0x1,_0x24f7fd=0x0,_0x5ce050=0x0;_0x5ce050<_0x1b24ea[_0x65f6('0x1d')][_0x65f6('0x1e')];_0x5ce050++){_0x65f6('0x1')!==typeof _0x1b24ea['options'][_0x5ce050]&&(_0x253044=!0x1);var _0x582c7e=_0x1b24ea['optionsPlaceHolder'][_0x5ce050]||'',_0x30109d=_0x4f3e22[_0x65f6('0x24')](_0x3c7c58);_0x36dbf4='<div\x20class=\x22qd-ssr2-option-wrapper\x22>';_0x36dbf4+=_0x65f6('0x25')+_0x5ce050+_0x30109d+'\x22>'+_0x1b24ea[_0x65f6('0x26')](_0x5ce050,_0x1b24ea['options'],_0x1b24ea[_0x65f6('0x27')])+'</label>';_0x36dbf4+='<select\x20data-qdssr-ndx=\x22'+_0x5ce050+_0x65f6('0x28')+_0x5ce050+_0x30109d+_0x65f6('0x29')+_0x582c7e+'\x22>';_0x36dbf4+=_0x65f6('0x2a');_0x253044?_0x36dbf4+=_0x4d4d84(_0x1b24ea[_0x65f6('0x1d')][_0x5ce050]):_0x582c7e=_0x1b24ea[_0x65f6('0x2b')](_0x5ce050,_0x1b24ea[_0x65f6('0x1d')],_0x1b24ea[_0x65f6('0x27')]);_0x36dbf4+=_0x65f6('0x2c');_0x5a740a=_0x463d05(_0x36dbf4);_0x5a740a['appendTo'](_0x3c7c58);var _0x3aa254=_0x5a740a['find'](_0x65f6('0x2d'));_0x50494b=_0x50494b[_0x65f6('0x2e')](_0x3aa254);_0x253044||_0x3aa254[_0x65f6('0xe')]({'disabled':!0x0,'data-qdssr-str':_0x1b24ea[_0x65f6('0x1d')][_0x5ce050]});_0x3aa254['select2']({'placeholder':_0x582c7e,'language':_0x65f6('0x2f')});_0x3aa254[_0x65f6('0x30')](_0x65f6('0x31'),function(_0x3fb1c6,_0x81fd69){var _0x3f6103=_0x463d05(this),_0xed4c96=_0x3c7c58[_0x65f6('0x32')]('select[data-qdssr-ndx='+(parseInt(_0x3f6103[_0x65f6('0xe')](_0x65f6('0x33'))||0x0,0xa)+0x1)+']'),_0x253044=(_0x3f6103[_0x65f6('0x34')]()||'')[_0x65f6('0x13')]();_0x81fd69||(_0x2b9fb6=!0x0);_0x463d05(window)[_0x65f6('0x35')](_0x65f6('0x36'),[_0xed4c96,_0x2b9fb6]);!_0xed4c96[_0x65f6('0x1e')]&&(!_0x81fd69||_0x2b9fb6&&_0x253044[_0x65f6('0x1e')])&&(_0x463d05(document[_0x65f6('0x37')])[_0x65f6('0x38')](_0x65f6('0x39')),_0x1b24ea[_0x65f6('0x3a')](_0x253044));_0x253044=_0x253044[_0x65f6('0x3b')]('#')[_0x65f6('0x3c')]()[_0x65f6('0x3b')]('?');_0x253044[0x1]=(_0xed4c96[_0x65f6('0xe')]('data-qdssr-str')||'')+'&'+(_0x253044[0x1]||'');_0x463d05(document[_0x65f6('0x37')])[_0x65f6('0x38')](_0x65f6('0x3d'));_0x5a740a[_0x65f6('0x38')]('qd-ssr2-loading');_0x24f7fd+=0x1;_0x463d05[_0x65f6('0x3e')]({'url':_0x253044[_0x65f6('0x9')]('?'),'dataType':_0x65f6('0x3f'),'success':function(_0x5e69b4){_0xed4c96[_0x65f6('0x40')](_0x65f6('0x41'));_0xed4c96[_0x65f6('0x3f')](_0x65f6('0x2a')+_0x4d4d84(_0x1b24ea['getAjaxOptions'](_0x5e69b4,_0xed4c96)));_0xed4c96[_0x65f6('0x42')]({'placeholder':_0xed4c96['attr'](_0x65f6('0xf'))});_0x3f6103[_0x65f6('0x35')]('QuatroDigital.ssrSelectAjaxPopulated',[_0xed4c96]);},'error':function(){_0x1b24ea[_0x65f6('0x43')]['apply'](this,arguments);},'complete':function(){_0x5a740a[_0x65f6('0x44')](_0x65f6('0x45'));--_0x24f7fd;0x0==_0x24f7fd&&_0x463d05(document[_0x65f6('0x37')])[_0x65f6('0x44')](_0x65f6('0x3d'));},'clearQueueDelay':null});});}return _0x50494b;}catch(_0x3837b2){_0x3461cd('Problemas\x20:(\x20.\x20Detalhes:\x20'+_0x3837b2['message']);}},_0x2f054c=function(_0x198e2f,_0x15d3ba,_0x3b647a,_0x1e9e29){_0x15d3ba=_0x15d3ba[_0x65f6('0x46')](_0x15d3ba[_0x65f6('0x27')][_0x3b647a]);null!==_0x15d3ba&&(_0x1e9e29=_0x1e9e29||_0x198e2f[_0x65f6('0x32')](_0x65f6('0x47')+_0x3b647a+']'),_0x1e9e29[_0x65f6('0x34')](_0x1e9e29['find'](_0x65f6('0x48')+_0x15d3ba+'\x27]')[_0x65f6('0x34')]())[_0x65f6('0x35')]('change',!0x0));},_0x4d4d84=function(_0x47e749){for(var _0x42d453='',_0x49ba5a=0x0;_0x49ba5a<_0x47e749[_0x65f6('0x1e')];_0x49ba5a++)_0x42d453+=_0x65f6('0x49')+(_0x47e749[_0x49ba5a][0x1]||'')+'\x22\x20data-qdssr-text=\x22'+(_0x47e749[_0x49ba5a][0x0]||'')[_0x65f6('0x16')](/\s\([0-9]+\)/,'')+'\x22>'+(_0x47e749[_0x49ba5a][0x0]||'')+'</option>';return _0x42d453;};_0x463d05[_0x65f6('0x0')][_0x65f6('0x4a')]=function(){if(_0x463d05[_0x65f6('0x0')]['getCategory'][_0x65f6('0x4b')])return _0x463d05[_0x65f6('0x0')]['getCategory'][_0x65f6('0x4b')];var _0x34312c=[],_0x48a2ed=[];_0x463d05(_0x65f6('0x4c'))[_0x65f6('0x10')](function(){var _0x413dbc=_0x463d05(this)[0x0][_0x65f6('0x4d')];if(-0x1<_0x413dbc[_0x65f6('0x1a')](_0x65f6('0x4e')))return _0x34312c=(decodeURIComponent((_0x413dbc[_0x65f6('0x4f')](/\/buscapagina([^\'\"]+)/i)||[''])[_0x65f6('0x50')]())['match'](/fq=c:[^\&]+/i)||[''])['pop']()['split'](':')[_0x65f6('0x50')]()[_0x65f6('0x16')](/(^\/|\/$)/g,'')[_0x65f6('0x3b')]('/'),!0x1;});for(var _0x20c322=0x0;_0x20c322<_0x34312c['length'];_0x20c322++)_0x34312c[_0x20c322][_0x65f6('0x1e')]&&_0x48a2ed[_0x65f6('0x11')](_0x34312c[_0x20c322]);return _0x463d05[_0x65f6('0x0')]['getCategory'][_0x65f6('0x4b')]=_0x48a2ed;};_0x463d05[_0x65f6('0x0')][_0x65f6('0x4a')]['cache']=null;_0x463d05['fn']['QD_SelectSmartResearch2']=function(_0x1d337d){var _0x44f3dd=_0x463d05(this);if(!_0x44f3dd[_0x65f6('0x1e')])return _0x44f3dd;_0x1d337d=_0x463d05[_0x65f6('0x51')]({},_0xbce843,_0x1d337d);_0x44f3dd[_0x65f6('0x52')]=new _0x463d05[(_0x65f6('0x0'))](_0x44f3dd,_0x1d337d);return _0x44f3dd;};_0x463d05(function(){_0x463d05(_0x65f6('0x53'))[_0x65f6('0x0')]();});}}(this));

/* Quatro Digital - QD Smart SKU Grid // Carlos Vinicius // Todos os direitos reservados */
var _0xedd9=['toUTCString','path',';\x20path=','domain','secure','split','shift','join','removeCookie','extend','abs','undefined','round','toFixed','QD_smartSkuGrid','error','info','warn','unshift','[Quatro\x20Digital\x20-\x20Smart\x20SKU\x20Grid]\x0a','alerta','toLowerCase','apply','.qd-sku-row-head\x20.qd-sku-col-title','.qd-sku-qtt-wrap','.qd-sku-qtt-price','.qd-sku-img','50-50','<span\x20class=\x22qd-snm-auto-include\x22></span>','left','input','.qd-sku-qtt-remove','javascript:alert(\x27Por\x20favor,\x20selecione\x20a\x20quantidade\x20desejada.\x27);','.qd-selected-qtt-sku','Não\x20foi\x20possível\x20obter\x20seus\x20dados\x20de\x20acesso,\x20por\x20favor\x20tente\x20mais\x20tarde\x20ou\x20entre\x20em\x20contato\x20com\x20o\x20Atendimento\x20ao\x20Cliente!','.qd-ssg-login','.qd-sku-title-z','attr','data-qd-smart-sku-grid','dimensions','Este\x20plugin\x20suporta\x20apenas\x20produtos\x20com\x20apenas\x20duas\x20ou\x20três\x20variações\x20de\x20SKU,\x20o\x20que\x20não\x20é\x20o\x20caso\x20desse!\x20A\x20execução\x20para\x20por\x20aqui\x20😞','data-qd-smart-sku-grid-z','string','A\x203ª\x20especificação\x20SKU\x20é\x20inválida\x20(eixo\x20z).\x20A\x20execução\x20para\x20por\x20aqui\x20😞.\x20Valor\x20obtido:\x20','message','dimensionsMap','insertBefore','find','titleZ','append','add','headItem','clone','remove','bodyRow','data-qd-ssg-primary-dim','rowName','data-qd-ssg-secundary-dim','bodyPrice','skus','rowImage','html','<img\x20src=\x22','image','\x22\x20alt=\x22','skuname','\x22\x20/>','filter','sku','available','<span\x20class=\x22qd-sku-old-price\x22>','listPriceFormated','rowPrice','bestPriceFormated','</span>','addClass','qd-ssg-unavailable','disabled','appendTo','QD_smartNotifyMe','QD_smartNotifyMeOptions','qd-ssg-processed-row','not','removeClass','hide','siblings','.qd-sku-qtt-wrap[id]:first','trigger','skuSelected.vtex','each','QuatroDigital.sq_change','QD_smartQuantity','href','selectSkuMsg','[data-sku-id]','QuatroDigital.ssg_change','val','push','data-sku-id','qty=','seller=','VTEXSC','sc=1','/checkout/cart/add?','neynoretnznfx%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Atenção!\x20Cara\x20na\x20boa,\x20este\x20plugin\x20não\x20suporta\x20mais\x20de\x20um\x20gride,\x20por\x20favor\x20se\x20precisa\x20renderizar\x20outros\x20na\x20tela,\x20utilize\x20o\x20$().each','aviso','QD_smartSkuTotalizer','QuatroDigital.ssg_callback','cookie','function','amd','jquery','object','json','stringify','raw','slice','replace','parse','length','isFunction','defaults','number','expires','setTime',';\x20expires='];(function(_0x967959,_0x53c5c1){var _0x5c4489=function(_0x1ae5c6){while(--_0x1ae5c6){_0x967959['push'](_0x967959['shift']());}};_0x5c4489(++_0x53c5c1);}(_0xedd9,0xfc));var _0x9edd=function(_0x32fb19,_0x547cdb){_0x32fb19=_0x32fb19-0x0;var _0x46c96b=_0xedd9[_0x32fb19];return _0x46c96b;};(function(){'function'!==typeof $[_0x9edd('0x0')]&&function(_0x2d7989){_0x9edd('0x1')===typeof define&&define[_0x9edd('0x2')]?define([_0x9edd('0x3')],_0x2d7989):_0x9edd('0x4')===typeof exports?_0x2d7989(require(_0x9edd('0x3'))):_0x2d7989(jQuery);}(function(_0x36b53f){function _0x5943b3(_0x33679f){_0x33679f=_0x1b73d1[_0x9edd('0x5')]?JSON[_0x9edd('0x6')](_0x33679f):String(_0x33679f);return _0x1b73d1[_0x9edd('0x7')]?_0x33679f:encodeURIComponent(_0x33679f);}function _0x5319f7(_0xf0b2d8,_0x571af9){var _0x172522;if(_0x1b73d1[_0x9edd('0x7')])_0x172522=_0xf0b2d8;else _0x1355be:{var _0x3280fd=_0xf0b2d8;0x0===_0x3280fd['indexOf']('\x22')&&(_0x3280fd=_0x3280fd[_0x9edd('0x8')](0x1,-0x1)['replace'](/\\"/g,'\x22')[_0x9edd('0x9')](/\\\\/g,'\x5c'));try{_0x3280fd=decodeURIComponent(_0x3280fd[_0x9edd('0x9')](_0x30c0d7,'\x20'));_0x172522=_0x1b73d1['json']?JSON[_0x9edd('0xa')](_0x3280fd):_0x3280fd;break _0x1355be;}catch(_0x13dc4f){}_0x172522=void 0x0;}return _0x36b53f['isFunction'](_0x571af9)?_0x571af9(_0x172522):_0x172522;}var _0x30c0d7=/\+/g,_0x1b73d1=_0x36b53f[_0x9edd('0x0')]=function(_0xfd544a,_0x287ddd,_0x3a7b84){if(0x1<arguments[_0x9edd('0xb')]&&!_0x36b53f[_0x9edd('0xc')](_0x287ddd)){_0x3a7b84=_0x36b53f['extend']({},_0x1b73d1[_0x9edd('0xd')],_0x3a7b84);if(_0x9edd('0xe')===typeof _0x3a7b84[_0x9edd('0xf')]){var _0x4d9a7=_0x3a7b84[_0x9edd('0xf')],_0x13b6b6=_0x3a7b84[_0x9edd('0xf')]=new Date();_0x13b6b6[_0x9edd('0x10')](+_0x13b6b6+0x5265c00*_0x4d9a7);}return document['cookie']=[_0x1b73d1[_0x9edd('0x7')]?_0xfd544a:encodeURIComponent(_0xfd544a),'=',_0x5943b3(_0x287ddd),_0x3a7b84[_0x9edd('0xf')]?_0x9edd('0x11')+_0x3a7b84['expires'][_0x9edd('0x12')]():'',_0x3a7b84[_0x9edd('0x13')]?_0x9edd('0x14')+_0x3a7b84['path']:'',_0x3a7b84[_0x9edd('0x15')]?';\x20domain='+_0x3a7b84[_0x9edd('0x15')]:'',_0x3a7b84[_0x9edd('0x16')]?';\x20secure':'']['join']('');}for(var _0x4d9a7=_0xfd544a?void 0x0:{},_0x13b6b6=document['cookie']?document[_0x9edd('0x0')][_0x9edd('0x17')](';\x20'):[],_0x27a95a=0x0,_0x54a03f=_0x13b6b6['length'];_0x27a95a<_0x54a03f;_0x27a95a++){var _0x5823bc=_0x13b6b6[_0x27a95a][_0x9edd('0x17')]('='),_0x341d67;_0x341d67=_0x5823bc[_0x9edd('0x18')]();_0x341d67=_0x1b73d1['raw']?_0x341d67:decodeURIComponent(_0x341d67);_0x5823bc=_0x5823bc[_0x9edd('0x19')]('=');if(_0xfd544a&&_0xfd544a===_0x341d67){_0x4d9a7=_0x5319f7(_0x5823bc,_0x287ddd);break;}_0xfd544a||void 0x0===(_0x5823bc=_0x5319f7(_0x5823bc))||(_0x4d9a7[_0x341d67]=_0x5823bc);}return _0x4d9a7;};_0x1b73d1[_0x9edd('0xd')]={};_0x36b53f[_0x9edd('0x1a')]=function(_0x2ca65f,_0x339a0d){if(void 0x0===_0x36b53f['cookie'](_0x2ca65f))return!0x1;_0x36b53f[_0x9edd('0x0')](_0x2ca65f,'',_0x36b53f[_0x9edd('0x1b')]({},_0x339a0d,{'expires':-0x1}));return!_0x36b53f[_0x9edd('0x0')](_0x2ca65f);};});}());function qd_number_format(_0x2f9f86,_0x310a4d,_0x4d507f,_0x4b3d1b){_0x2f9f86=(_0x2f9f86+'')[_0x9edd('0x9')](/[^0-9+\-Ee.]/g,'');_0x2f9f86=isFinite(+_0x2f9f86)?+_0x2f9f86:0x0;_0x310a4d=isFinite(+_0x310a4d)?Math[_0x9edd('0x1c')](_0x310a4d):0x0;_0x4b3d1b=_0x9edd('0x1d')===typeof _0x4b3d1b?',':_0x4b3d1b;_0x4d507f=_0x9edd('0x1d')===typeof _0x4d507f?'.':_0x4d507f;var _0x57a2cc='',_0x57a2cc=function(_0x214d0a,_0x257a26){var _0x310a4d=Math['pow'](0xa,_0x257a26);return''+(Math[_0x9edd('0x1e')](_0x214d0a*_0x310a4d)/_0x310a4d)[_0x9edd('0x1f')](_0x257a26);},_0x57a2cc=(_0x310a4d?_0x57a2cc(_0x2f9f86,_0x310a4d):''+Math[_0x9edd('0x1e')](_0x2f9f86))[_0x9edd('0x17')]('.');0x3<_0x57a2cc[0x0]['length']&&(_0x57a2cc[0x0]=_0x57a2cc[0x0][_0x9edd('0x9')](/\B(?=(?:\d{3})+(?!\d))/g,_0x4b3d1b));(_0x57a2cc[0x1]||'')[_0x9edd('0xb')]<_0x310a4d&&(_0x57a2cc[0x1]=_0x57a2cc[0x1]||'',_0x57a2cc[0x1]+=Array(_0x310a4d-_0x57a2cc[0x1][_0x9edd('0xb')]+0x1)[_0x9edd('0x19')]('0'));return _0x57a2cc[_0x9edd('0x19')](_0x4d507f);};(function(_0x42e664){var _0x209aba=jQuery;if(_0x9edd('0x1')!==typeof _0x209aba['fn'][_0x9edd('0x20')]){_0x209aba['fn'][_0x9edd('0x20')]=function(){};var _0x4fd03f=function(_0x259259,_0x267c74){if('object'===typeof console&&_0x9edd('0x1')===typeof console[_0x9edd('0x21')]&&_0x9edd('0x1')===typeof console[_0x9edd('0x22')]&&_0x9edd('0x1')===typeof console[_0x9edd('0x23')]){var _0x473068;_0x9edd('0x4')===typeof _0x259259?(_0x259259[_0x9edd('0x24')](_0x9edd('0x25')),_0x473068=_0x259259):_0x473068=[_0x9edd('0x25')+_0x259259];if(_0x9edd('0x1d')===typeof _0x267c74||_0x9edd('0x26')!==_0x267c74[_0x9edd('0x27')]()&&'aviso'!==_0x267c74[_0x9edd('0x27')]())if('undefined'!==typeof _0x267c74&&_0x9edd('0x22')===_0x267c74[_0x9edd('0x27')]())try{console[_0x9edd('0x22')][_0x9edd('0x28')](console,_0x473068);}catch(_0x16770e){console['info'](_0x473068[_0x9edd('0x19')]('\x0a'));}else try{console[_0x9edd('0x21')][_0x9edd('0x28')](console,_0x473068);}catch(_0x38e9be){console[_0x9edd('0x21')](_0x473068[_0x9edd('0x19')]('\x0a'));}else try{console[_0x9edd('0x23')][_0x9edd('0x28')](console,_0x473068);}catch(_0x1ccee8){console[_0x9edd('0x23')](_0x473068['join']('\x0a'));}}},_0x138002={'headItem':_0x9edd('0x29'),'bodyRow':'.qd-sku-row-body','bodyPrice':_0x9edd('0x2a'),'rowName':'.qd-sku-name','rowPrice':_0x9edd('0x2b'),'rowImage':_0x9edd('0x2c'),'rowImageSize':_0x9edd('0x2d'),'unavailableHtml':'<span\x20class=\x22qd-no-stock\x22>ESGOTADO</span>','QD_smartNotifyMeHtml':_0x9edd('0x2e'),'QD_smartNotifyMeOptions':{'placement':_0x9edd('0x2f')},'inputQtt':_0x9edd('0x30'),'qttMore':'.qd-sku-qtt-add','qttMinus':_0x9edd('0x31'),'buyButton':'.qd-ssg-buy-button','selectSkuMsg':_0x9edd('0x32'),'qttSkus':_0x9edd('0x33'),'valueSkus':'.qd-selected-sku-total','checkLoginErrorMsg':_0x9edd('0x34'),'userLoginWrapper':_0x9edd('0x35'),'titleZ':_0x9edd('0x36')},_0x6907a5=function(_0x810331,_0x492900){try{if(!_0x810331[_0x9edd('0xb')])return _0x810331;var _0x5bbdf8=_0x810331[_0x9edd('0x37')](_0x9edd('0x38'));if('string'!==typeof _0x5bbdf8||!_0x5bbdf8[_0x9edd('0xb')])return _0x4fd03f(['Especificação\x20SKU\x20padrão\x20é\x20inválida.\x20A\x20execução\x20para\x20por\x20aqui\x20😞.\x20Valor\x20obtido:\x20',_0x5bbdf8]);if(0x2!==skuJson['dimensions'][_0x9edd('0xb')]&&0x3!==skuJson[_0x9edd('0x39')][_0x9edd('0xb')])return _0x4fd03f([_0x9edd('0x3a')]);var _0x25e6ec=_0x810331[_0x9edd('0x37')](_0x9edd('0x3b'));if(0x3===skuJson[_0x9edd('0x39')][_0x9edd('0xb')]&&(_0x9edd('0x3c')!==typeof _0x25e6ec||!_0x25e6ec[_0x9edd('0xb')]))return _0x4fd03f([_0x9edd('0x3d'),_0x25e6ec]);}catch(_0x3d5eba){_0x4fd03f(_0x3d5eba[_0x9edd('0x3e')]);}try{for(var _0x46e9f4,_0x5416f8=0x0;_0x5416f8<skuJson[_0x9edd('0x39')][_0x9edd('0xb')];_0x5416f8++)if(skuJson[_0x9edd('0x39')][_0x5416f8]!==_0x5bbdf8&&(_0x25e6ec?skuJson[_0x9edd('0x39')][_0x5416f8]!==_0x25e6ec:0x1)){_0x46e9f4=skuJson[_0x9edd('0x39')][_0x5416f8];break;}var _0x3ecdfd=new _0x209aba();if(_0x25e6ec){for(_0x5416f8=0x0;_0x5416f8<skuJson[_0x9edd('0x3f')][_0x25e6ec]['length'];_0x5416f8++){var _0x4a4656=_0x810331['clone']()[_0x9edd('0x40')](_0x810331);_0xa55906(_0x4a4656,_0x492900,_0x5bbdf8,_0x46e9f4,_0x25e6ec,skuJson['dimensionsMap'][_0x25e6ec][_0x5416f8]);_0x4a4656[_0x9edd('0x41')](_0x492900[_0x9edd('0x42')])[_0x9edd('0x43')](skuJson[_0x9edd('0x3f')][_0x25e6ec][_0x5416f8]);_0x3ecdfd=_0x3ecdfd[_0x9edd('0x44')](_0x4a4656);}_0x810331['remove']();}else _0xa55906(_0x810331,_0x492900,_0x5bbdf8,_0x46e9f4,!0x1),_0x3ecdfd=_0x3ecdfd[_0x9edd('0x44')](_0x810331);return _0x3ecdfd;}catch(_0x35e63c){_0x4fd03f(_0x35e63c[_0x9edd('0x3e')]);}},_0xa55906=function(_0x4a89ae,_0x3626bc,_0xfd7bd1,_0x2159aa,_0x293b03,_0x1d78c4){try{for(var _0x35bdec=_0x4a89ae[_0x9edd('0x41')](_0x3626bc[_0x9edd('0x45')]),_0x4d4f33=0x0;_0x4d4f33<skuJson['dimensionsMap'][_0xfd7bd1][_0x9edd('0xb')];_0x4d4f33++)_0x35bdec[_0x9edd('0x46')]()['append'](skuJson[_0x9edd('0x3f')][_0xfd7bd1][_0x4d4f33])[_0x9edd('0x40')](_0x35bdec);_0x35bdec[_0x9edd('0x47')]();var _0x5215b0=_0x4a89ae[_0x9edd('0x41')](_0x3626bc[_0x9edd('0x48')]),_0x22e7fe=_0x5215b0[_0x9edd('0x41')](_0x3626bc['bodyPrice']);for(_0x4d4f33=0x0;_0x4d4f33<skuJson[_0x9edd('0x3f')][_0xfd7bd1][_0x9edd('0xb')];_0x4d4f33++)_0x22e7fe[_0x9edd('0x46')]()['attr'](_0x9edd('0x49'),skuJson[_0x9edd('0x3f')][_0xfd7bd1][_0x4d4f33])['insertBefore'](_0x22e7fe);_0x22e7fe[_0x9edd('0x47')]();for(_0x4d4f33=0x0;_0x4d4f33<skuJson['dimensionsMap'][_0x2159aa][_0x9edd('0xb')];_0x4d4f33++){var _0xe6b20c=_0x5215b0[_0x9edd('0x46')]();_0xe6b20c[_0x9edd('0x41')](_0x3626bc[_0x9edd('0x4a')])[_0x9edd('0x43')](skuJson[_0x9edd('0x3f')][_0x2159aa][_0x4d4f33]);_0xe6b20c[_0x9edd('0x37')](_0x9edd('0x4b'),skuJson[_0x9edd('0x3f')][_0x2159aa][_0x4d4f33]);_0xe6b20c[_0x9edd('0x40')](_0x5215b0);}_0x5215b0['remove']();var _0x42e664=_0x4a89ae[_0x9edd('0x41')](_0x3626bc[_0x9edd('0x48')]);_0x42e664['find'](_0x3626bc[_0x9edd('0x4c')])['addClass']('qd-ssg-sku-not-found');for(_0x35bdec=0x0;_0x35bdec<skuJson['skus'][_0x9edd('0xb')];_0x35bdec++)if(!_0x293b03||skuJson[_0x9edd('0x4d')][_0x35bdec][_0x9edd('0x39')][_0x293b03]===_0x1d78c4){var _0x35ddb3=_0x42e664['filter']('[data-qd-ssg-secundary-dim=\x27'+skuJson['skus'][_0x35bdec][_0x9edd('0x39')][_0x2159aa]+'\x27]');_0x35ddb3[_0x9edd('0x41')](_0x3626bc[_0x9edd('0x4e')])[_0x9edd('0x4f')](_0x9edd('0x50')+skuJson[_0x9edd('0x4d')][_0x35bdec][_0x9edd('0x51')][_0x9edd('0x9')](/(ids\/[0-9]+-)[0-9]+-[0-9]+\//i,'$1'+_0x3626bc['rowImageSize']+'/')+_0x9edd('0x52')+skuJson['skus'][_0x35bdec][_0x9edd('0x53')]+_0x9edd('0x54'));var _0x4b7e68=_0x35ddb3[_0x9edd('0x41')](_0x3626bc[_0x9edd('0x4c')])[_0x9edd('0x55')]('[data-qd-ssg-primary-dim=\x27'+skuJson[_0x9edd('0x4d')][_0x35bdec][_0x9edd('0x39')][_0xfd7bd1]+'\x27]');_0x4b7e68[_0x9edd('0xb')]&&(_0x4b7e68[_0x9edd('0x37')]('id',skuJson[_0x9edd('0x4d')][_0x35bdec][_0x9edd('0x56')]),_0x4b7e68['removeClass']('qd-ssg-sku-not-found'),_0x4b7e68[_0x9edd('0x41')](_0x3626bc['inputQtt'])[_0x9edd('0x37')]({'data-sku-id':skuJson[_0x9edd('0x4d')][_0x35bdec][_0x9edd('0x56')],'data-sku-seller':skuJson[_0x9edd('0x4d')][_0x35bdec]['sellerId'],'data-sku-price':skuJson[_0x9edd('0x4d')][_0x35bdec]['bestPrice']}),skuJson[_0x9edd('0x4d')][_0x35bdec][_0x9edd('0x57')]?(skuJson[_0x9edd('0x4d')][_0x35bdec]['listPrice']&&_0x4b7e68[_0x9edd('0x41')](_0x3626bc['rowPrice'])[_0x9edd('0x43')](_0x9edd('0x58')+skuJson['skus'][_0x35bdec][_0x9edd('0x59')]+'</span>'),_0x4b7e68[_0x9edd('0x41')](_0x3626bc[_0x9edd('0x5a')])[_0x9edd('0x43')]('<span\x20class=\x22qd-sku-new-price\x22>'+skuJson[_0x9edd('0x4d')][_0x35bdec][_0x9edd('0x5b')]+_0x9edd('0x5c'))):(_0x4b7e68[_0x9edd('0x41')](_0x3626bc[_0x9edd('0x5a')])['append'](_0x3626bc['unavailableHtml']),_0x4b7e68[_0x9edd('0x5d')](_0x9edd('0x5e')),_0x4b7e68['find'](_0x3626bc['inputQtt'])['attr'](_0x9edd('0x5f'),'disabled'),_0x4a7889&&_0x209aba(_0x3626bc['QD_smartNotifyMeHtml'])[_0x9edd('0x60')](_0x4b7e68[_0x9edd('0x41')](_0x3626bc['rowPrice']))[_0x9edd('0x61')](_0x209aba[_0x9edd('0x1b')]({},_0x3626bc[_0x9edd('0x62')],{'skuId':skuJson['skus'][_0x35bdec][_0x9edd('0x56')]}))));_0x35ddb3['addClass'](_0x9edd('0x63'));}_0x42e664[_0x9edd('0x64')]('.qd-ssg-processed-row')[_0x9edd('0x47')]();_0x4a89ae[_0x9edd('0x5d')]('qd-ssg-loaded');_0x4a89ae[_0x9edd('0x65')](_0x9edd('0x66'));}catch(_0x460a92){_0x4fd03f(_0x460a92[_0x9edd('0x3e')]);}},_0x1a6c23=function(_0x5ce70b,_0x366b04){_0x5ce70b['find'](_0x366b04[_0x9edd('0x4a')])[_0x9edd('0x44')](_0x366b04[_0x9edd('0x4e')])['click'](function(){try{for(var _0x366b04=_0x209aba(this)[_0x9edd('0x67')](_0x9edd('0x68'))[_0x9edd('0x37')]('id'),_0x286593,_0x130dba=0x0;_0x130dba<skuJson[_0x9edd('0x4d')]['length'];_0x130dba++)if(skuJson['skus'][_0x130dba][_0x9edd('0x56')]==_0x366b04){_0x286593=skuJson[_0x9edd('0x4d')][_0x130dba];break;}_0x286593&&_0x209aba(document)[_0x9edd('0x69')](_0x9edd('0x6a'),[_0x366b04,_0x286593]);}catch(_0x1e2126){_0x4fd03f(_0x1e2126['message']);}});},_0x5af178=function(_0x2e40c8,_0x5d56a){if(!_0x2e40c8[_0x9edd('0xb')])return _0x2e40c8;try{_0x2e40c8['find'](_0x5d56a[_0x9edd('0x4c')])[_0x9edd('0x6b')](function(){var _0x2e40c8=_0x209aba(this),_0x3f3093=_0x2e40c8[_0x9edd('0x41')](_0x5d56a['inputQtt']);_0x3f3093['on'](_0x9edd('0x6c'),function(){_0x209aba(this)[_0x9edd('0x69')]('QuatroDigital.ssg_change');});_0x2e40c8[_0x9edd('0x6d')]({'buyButton':null,'qttInput':_0x3f3093,'btnMore':_0x5d56a['qttMore'],'btnMinus':_0x5d56a['qttMinus'],'initialValue':0x0,'minimumValue':0x0});});}catch(_0x45c9ef){_0x4fd03f(_0x45c9ef[_0x9edd('0x3e')]);}},_0x1453d2=function(_0x44b426,_0x5b56c7){if(!_0x44b426[_0x9edd('0xb')])return _0x44b426;try{var _0x286e47=_0x209aba(_0x5b56c7['buyButton']);_0x286e47[_0x9edd('0x37')](_0x9edd('0x6e'),_0x5b56c7[_0x9edd('0x6f')]);var _0x1ad198=_0x44b426['find'](_0x5b56c7['inputQtt'])[_0x9edd('0x64')]('disabled')[_0x9edd('0x55')](_0x9edd('0x70'));_0x1ad198['on'](_0x9edd('0x71'),function(){try{var _0x44b426=[];_0x1ad198[_0x9edd('0x6b')](function(){var _0x5b56c7=_0x209aba(this),_0x1eabcd=parseInt(_0x5b56c7[_0x9edd('0x72')]());0x0<_0x1eabcd&&(_0x44b426[_0x9edd('0x73')]('sku='+_0x5b56c7[_0x9edd('0x37')](_0x9edd('0x74'))),_0x44b426[_0x9edd('0x73')](_0x9edd('0x75')+_0x1eabcd),_0x44b426[_0x9edd('0x73')](_0x9edd('0x76')+_0x5b56c7[_0x9edd('0x37')]('data-sku-seller')));});_0x44b426[_0x9edd('0xb')]?(_0x44b426[_0x9edd('0x73')](_0x209aba['cookie'](_0x9edd('0x77'))||_0x9edd('0x78')),_0x286e47['attr'](_0x9edd('0x6e'),_0x9edd('0x79')+_0x44b426[_0x9edd('0x19')]('&'))):_0x286e47['attr'](_0x9edd('0x6e'),_0x5b56c7[_0x9edd('0x6f')]);}catch(_0x3f04d3){_0x4fd03f(_0x3f04d3['message']);}});}catch(_0x5d9cc5){_0x4fd03f(_0x5d9cc5['message']);}};_0x42e664=function(_0x56e981){var _0x3db9db={'p':_0x9edd('0x7a')};return function(_0x179b7f){var _0x521810=function(_0x53e141){return _0x53e141;};var _0x49dc1d=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x179b7f=_0x179b7f['d'+_0x49dc1d[0x10]+'c'+_0x49dc1d[0x11]+'m'+_0x521810(_0x49dc1d[0x1])+'n'+_0x49dc1d[0xd]]['l'+_0x49dc1d[0x12]+'c'+_0x49dc1d[0x0]+'ti'+_0x521810('o')+'n'];var _0x56d794=function(_0x388252){return escape(encodeURIComponent(_0x388252[_0x9edd('0x9')](/\./g,'¨')[_0x9edd('0x9')](/[a-zA-Z]/g,function(_0x4713ae){return String[_0x9edd('0x7b')](('Z'>=_0x4713ae?0x5a:0x7a)>=(_0x4713ae=_0x4713ae[_0x9edd('0x7c')](0x0)+0xd)?_0x4713ae:_0x4713ae-0x1a);})));};var _0x2f4e61=_0x56d794(_0x179b7f[[_0x49dc1d[0x9],_0x521810('o'),_0x49dc1d[0xc],_0x49dc1d[_0x521810(0xd)]][_0x9edd('0x19')]('')]);_0x56d794=_0x56d794((window[['js',_0x521810('no'),'m',_0x49dc1d[0x1],_0x49dc1d[0x4][_0x9edd('0x7d')](),_0x9edd('0x7e')][_0x9edd('0x19')]('')]||'---')+['.v',_0x49dc1d[0xd],'e',_0x521810('x'),'co',_0x521810('mm'),_0x9edd('0x7f'),_0x49dc1d[0x1],'.c',_0x521810('o'),'m.',_0x49dc1d[0x13],'r'][_0x9edd('0x19')](''));for(var _0x33b5dc in _0x3db9db){if(_0x56d794===_0x33b5dc+_0x3db9db[_0x33b5dc]||_0x2f4e61===_0x33b5dc+_0x3db9db[_0x33b5dc]){var _0x159314='tr'+_0x49dc1d[0x11]+'e';break;}_0x159314='f'+_0x49dc1d[0x0]+'ls'+_0x521810(_0x49dc1d[0x1])+'';}_0x521810=!0x1;-0x1<_0x179b7f[[_0x49dc1d[0xc],'e',_0x49dc1d[0x0],'rc',_0x49dc1d[0x9]][_0x9edd('0x19')]('')][_0x9edd('0x80')](_0x9edd('0x81'))&&(_0x521810=!0x0);return[_0x159314,_0x521810];}(_0x56e981);}(window);if(!eval(_0x42e664[0x0]))return _0x42e664[0x1]?_0x4fd03f(_0x9edd('0x82')):!0x1;var _0x4a7889=!0x1;_0x209aba['fn']['QD_smartSkuGrid']=function(_0xe02a6){var _0x4ec836=_0x209aba(this);if(!_0x4ec836[_0x9edd('0xb')])return _0x4ec836;0x1<_0x4ec836['length']&&_0x4fd03f(_0x9edd('0x83'),_0x9edd('0x84'));_0xe02a6=_0x209aba['extend']({},_0x138002,_0xe02a6);_0x9edd('0x1')!==typeof _0x209aba['fn'][_0x9edd('0x61')]?_0x4fd03f('Atenção!\x20Para\x20que\x20o\x20avise-me\x20funcione\x20você\x20precisa\x20adicionar\x20o\x20plugin\x20\x27QD_smartNotifyMe\x27\x20😠.',_0x9edd('0x84')):_0x4a7889=!0x0;var _0x3d1294=_0x6907a5(_0x4ec836,_0xe02a6);_0x5af178(_0x209aba(_0x3d1294),_0xe02a6);_0x1453d2(_0x209aba(_0x3d1294),_0xe02a6);_0x209aba[_0x9edd('0x85')](_0x209aba(_0x3d1294),_0xe02a6);_0x1a6c23(_0x209aba(_0x3d1294),_0xe02a6);_0x209aba(window)[_0x9edd('0x69')](_0x9edd('0x86'),this);return _0x4ec836;};_0x209aba(function(){_0x209aba('.qd-smart-sku-grid-auto-load')[_0x9edd('0x20')]();});}}(this));

/* Quatro Digital - QD Smart SKU Limiter // Carlos Vinicius // Todos os direitos reservados */
var _0x818c=['complete','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','version','QD_smartSkuLimiter','info','warn','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Sku\x20Limiter]\x0a','alerta','aviso','apply','join','QTDE\x20DISPONÍVEL:\x20#qtt','each','idSku','json','SkuSellersInformation','AvailableQuantity','Problemas\x20ao\x20processar\x20os\x20dados\x20do\x20SKU\x20','.\x20Detalhes:\x20','val','title','#qtt','tooltip','change','trigger','qd-ssl-tooltip-timeout','hide','message','neynoretnznfx%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','toUpperCase','erc','indexOf','qdPlugin','.qd_auto_smart_sku_limiter','QuatroDigital.sq_change\x20QuatroDigital.sq_focusin','sq_focusin','attr','data-sku-id','length','charCodeAt','fromCharCode','Unmatched\x20lead\x20surrogate\x20at\x20','slice','function','utf8_encode','toLowerCase','qdAjax','qdAjaxQueue','jquery','replace','000','error','extend','GET','object','data','toString','url','type','undefined','ajax','jqXHR','done','success','fail','always'];(function(_0x5788e9,_0x26c3b0){var _0x289724=function(_0x24b7bd){while(--_0x24b7bd){_0x5788e9['push'](_0x5788e9['shift']());}};_0x289724(++_0x26c3b0);}(_0x818c,0x1c0));var _0xc818=function(_0x3aaecc,_0x553de2){_0x3aaecc=_0x3aaecc-0x0;var _0x5728f8=_0x818c[_0x3aaecc];return _0x5728f8;};function utf8_encode(_0x3b9b8e){if(null===_0x3b9b8e||'undefined'===typeof _0x3b9b8e)return'';_0x3b9b8e+='';var _0x34f04e='',_0x3e86c1,_0x11450f,_0x301600=0x0;_0x3e86c1=_0x11450f=0x0;for(var _0x301600=_0x3b9b8e[_0xc818('0x0')],_0x12f9f3=0x0;_0x12f9f3<_0x301600;_0x12f9f3++){var _0x2366f6=_0x3b9b8e[_0xc818('0x1')](_0x12f9f3),_0x57305f=null;if(0x80>_0x2366f6)_0x11450f++;else if(0x7f<_0x2366f6&&0x800>_0x2366f6)_0x57305f=String[_0xc818('0x2')](_0x2366f6>>0x6|0xc0,_0x2366f6&0x3f|0x80);else if(0xd800!=(_0x2366f6&0xf800))_0x57305f=String[_0xc818('0x2')](_0x2366f6>>0xc|0xe0,_0x2366f6>>0x6&0x3f|0x80,_0x2366f6&0x3f|0x80);else{if(0xd800!=(_0x2366f6&0xfc00))throw new RangeError('Unmatched\x20trail\x20surrogate\x20at\x20'+_0x12f9f3);_0x57305f=_0x3b9b8e[_0xc818('0x1')](++_0x12f9f3);if(0xdc00!=(_0x57305f&0xfc00))throw new RangeError(_0xc818('0x3')+(_0x12f9f3-0x1));_0x2366f6=((_0x2366f6&0x3ff)<<0xa)+(_0x57305f&0x3ff)+0x10000;_0x57305f=String[_0xc818('0x2')](_0x2366f6>>0x12|0xf0,_0x2366f6>>0xc&0x3f|0x80,_0x2366f6>>0x6&0x3f|0x80,_0x2366f6&0x3f|0x80);}null!==_0x57305f&&(_0x11450f>_0x3e86c1&&(_0x34f04e+=_0x3b9b8e[_0xc818('0x4')](_0x3e86c1,_0x11450f)),_0x34f04e+=_0x57305f,_0x3e86c1=_0x11450f=_0x12f9f3+0x1);}_0x11450f>_0x3e86c1&&(_0x34f04e+=_0x3b9b8e['slice'](_0x3e86c1,_0x301600));return _0x34f04e;};if(_0xc818('0x5')!==typeof qd_md5)var qd_md5=function(_0x4b0e86){var _0x4f7587=function(_0x3e24b0,_0x2f0fe7){var _0x14312a,_0x2da48c,_0x223d7a,_0x1b0f38,_0x5635d1;_0x223d7a=_0x3e24b0&0x80000000;_0x1b0f38=_0x2f0fe7&0x80000000;_0x14312a=_0x3e24b0&0x40000000;_0x2da48c=_0x2f0fe7&0x40000000;_0x5635d1=(_0x3e24b0&0x3fffffff)+(_0x2f0fe7&0x3fffffff);return _0x14312a&_0x2da48c?_0x5635d1^0x80000000^_0x223d7a^_0x1b0f38:_0x14312a|_0x2da48c?_0x5635d1&0x40000000?_0x5635d1^0xc0000000^_0x223d7a^_0x1b0f38:_0x5635d1^0x40000000^_0x223d7a^_0x1b0f38:_0x5635d1^_0x223d7a^_0x1b0f38;},_0x3a1059=function(_0x2ef07b,_0x5e6a2d,_0x5d9745,_0x2aefd6,_0x38b47a,_0x50df4e,_0x4808db){_0x2ef07b=_0x4f7587(_0x2ef07b,_0x4f7587(_0x4f7587(_0x5e6a2d&_0x5d9745|~_0x5e6a2d&_0x2aefd6,_0x38b47a),_0x4808db));return _0x4f7587(_0x2ef07b<<_0x50df4e|_0x2ef07b>>>0x20-_0x50df4e,_0x5e6a2d);},_0x56d66b=function(_0xbaf22f,_0x4416c9,_0x47838b,_0x8b8134,_0x40c53a,_0x27516c,_0x19211c){_0xbaf22f=_0x4f7587(_0xbaf22f,_0x4f7587(_0x4f7587(_0x4416c9&_0x8b8134|_0x47838b&~_0x8b8134,_0x40c53a),_0x19211c));return _0x4f7587(_0xbaf22f<<_0x27516c|_0xbaf22f>>>0x20-_0x27516c,_0x4416c9);},_0x1145c4=function(_0x31161d,_0x43beb2,_0x3b8636,_0x573921,_0x2374e1,_0x54588a,_0xdfed09){_0x31161d=_0x4f7587(_0x31161d,_0x4f7587(_0x4f7587(_0x43beb2^_0x3b8636^_0x573921,_0x2374e1),_0xdfed09));return _0x4f7587(_0x31161d<<_0x54588a|_0x31161d>>>0x20-_0x54588a,_0x43beb2);},_0x248b9c=function(_0x57fb6a,_0x4b13ea,_0x35f18b,_0x461520,_0x38076d,_0xaa2452,_0x285e06){_0x57fb6a=_0x4f7587(_0x57fb6a,_0x4f7587(_0x4f7587(_0x35f18b^(_0x4b13ea|~_0x461520),_0x38076d),_0x285e06));return _0x4f7587(_0x57fb6a<<_0xaa2452|_0x57fb6a>>>0x20-_0xaa2452,_0x4b13ea);},_0x58d481=function(_0x20be11){var _0x524de0='',_0x9ea46f='',_0x1ef558;for(_0x1ef558=0x0;0x3>=_0x1ef558;_0x1ef558++)_0x9ea46f=_0x20be11>>>0x8*_0x1ef558&0xff,_0x9ea46f='0'+_0x9ea46f['toString'](0x10),_0x524de0+=_0x9ea46f['substr'](_0x9ea46f[_0xc818('0x0')]-0x2,0x2);return _0x524de0;},_0x4dee74=[],_0x54806b,_0x56a11c,_0xe1c3c8,_0x3914a,_0x5bafec,_0x419e54,_0x34ae7d,_0x4f10a0,_0x5d18af;_0x4b0e86=this[_0xc818('0x6')](_0x4b0e86);_0x4dee74=function(_0x4aa712){var _0x34a2d3,_0x10be78=_0x4aa712[_0xc818('0x0')];_0x34a2d3=_0x10be78+0x8;for(var _0x47a897=0x10*((_0x34a2d3-_0x34a2d3%0x40)/0x40+0x1),_0x2ba4b7=Array(_0x47a897-0x1),_0x4633c0=0x0,_0x5bdf8f=0x0;_0x5bdf8f<_0x10be78;)_0x34a2d3=(_0x5bdf8f-_0x5bdf8f%0x4)/0x4,_0x4633c0=_0x5bdf8f%0x4*0x8,_0x2ba4b7[_0x34a2d3]|=_0x4aa712['charCodeAt'](_0x5bdf8f)<<_0x4633c0,_0x5bdf8f++;_0x34a2d3=(_0x5bdf8f-_0x5bdf8f%0x4)/0x4;_0x2ba4b7[_0x34a2d3]|=0x80<<_0x5bdf8f%0x4*0x8;_0x2ba4b7[_0x47a897-0x2]=_0x10be78<<0x3;_0x2ba4b7[_0x47a897-0x1]=_0x10be78>>>0x1d;return _0x2ba4b7;}(_0x4b0e86);_0x419e54=0x67452301;_0x34ae7d=0xefcdab89;_0x4f10a0=0x98badcfe;_0x5d18af=0x10325476;_0x4b0e86=_0x4dee74['length'];for(_0x54806b=0x0;_0x54806b<_0x4b0e86;_0x54806b+=0x10)_0x56a11c=_0x419e54,_0xe1c3c8=_0x34ae7d,_0x3914a=_0x4f10a0,_0x5bafec=_0x5d18af,_0x419e54=_0x3a1059(_0x419e54,_0x34ae7d,_0x4f10a0,_0x5d18af,_0x4dee74[_0x54806b+0x0],0x7,0xd76aa478),_0x5d18af=_0x3a1059(_0x5d18af,_0x419e54,_0x34ae7d,_0x4f10a0,_0x4dee74[_0x54806b+0x1],0xc,0xe8c7b756),_0x4f10a0=_0x3a1059(_0x4f10a0,_0x5d18af,_0x419e54,_0x34ae7d,_0x4dee74[_0x54806b+0x2],0x11,0x242070db),_0x34ae7d=_0x3a1059(_0x34ae7d,_0x4f10a0,_0x5d18af,_0x419e54,_0x4dee74[_0x54806b+0x3],0x16,0xc1bdceee),_0x419e54=_0x3a1059(_0x419e54,_0x34ae7d,_0x4f10a0,_0x5d18af,_0x4dee74[_0x54806b+0x4],0x7,0xf57c0faf),_0x5d18af=_0x3a1059(_0x5d18af,_0x419e54,_0x34ae7d,_0x4f10a0,_0x4dee74[_0x54806b+0x5],0xc,0x4787c62a),_0x4f10a0=_0x3a1059(_0x4f10a0,_0x5d18af,_0x419e54,_0x34ae7d,_0x4dee74[_0x54806b+0x6],0x11,0xa8304613),_0x34ae7d=_0x3a1059(_0x34ae7d,_0x4f10a0,_0x5d18af,_0x419e54,_0x4dee74[_0x54806b+0x7],0x16,0xfd469501),_0x419e54=_0x3a1059(_0x419e54,_0x34ae7d,_0x4f10a0,_0x5d18af,_0x4dee74[_0x54806b+0x8],0x7,0x698098d8),_0x5d18af=_0x3a1059(_0x5d18af,_0x419e54,_0x34ae7d,_0x4f10a0,_0x4dee74[_0x54806b+0x9],0xc,0x8b44f7af),_0x4f10a0=_0x3a1059(_0x4f10a0,_0x5d18af,_0x419e54,_0x34ae7d,_0x4dee74[_0x54806b+0xa],0x11,0xffff5bb1),_0x34ae7d=_0x3a1059(_0x34ae7d,_0x4f10a0,_0x5d18af,_0x419e54,_0x4dee74[_0x54806b+0xb],0x16,0x895cd7be),_0x419e54=_0x3a1059(_0x419e54,_0x34ae7d,_0x4f10a0,_0x5d18af,_0x4dee74[_0x54806b+0xc],0x7,0x6b901122),_0x5d18af=_0x3a1059(_0x5d18af,_0x419e54,_0x34ae7d,_0x4f10a0,_0x4dee74[_0x54806b+0xd],0xc,0xfd987193),_0x4f10a0=_0x3a1059(_0x4f10a0,_0x5d18af,_0x419e54,_0x34ae7d,_0x4dee74[_0x54806b+0xe],0x11,0xa679438e),_0x34ae7d=_0x3a1059(_0x34ae7d,_0x4f10a0,_0x5d18af,_0x419e54,_0x4dee74[_0x54806b+0xf],0x16,0x49b40821),_0x419e54=_0x56d66b(_0x419e54,_0x34ae7d,_0x4f10a0,_0x5d18af,_0x4dee74[_0x54806b+0x1],0x5,0xf61e2562),_0x5d18af=_0x56d66b(_0x5d18af,_0x419e54,_0x34ae7d,_0x4f10a0,_0x4dee74[_0x54806b+0x6],0x9,0xc040b340),_0x4f10a0=_0x56d66b(_0x4f10a0,_0x5d18af,_0x419e54,_0x34ae7d,_0x4dee74[_0x54806b+0xb],0xe,0x265e5a51),_0x34ae7d=_0x56d66b(_0x34ae7d,_0x4f10a0,_0x5d18af,_0x419e54,_0x4dee74[_0x54806b+0x0],0x14,0xe9b6c7aa),_0x419e54=_0x56d66b(_0x419e54,_0x34ae7d,_0x4f10a0,_0x5d18af,_0x4dee74[_0x54806b+0x5],0x5,0xd62f105d),_0x5d18af=_0x56d66b(_0x5d18af,_0x419e54,_0x34ae7d,_0x4f10a0,_0x4dee74[_0x54806b+0xa],0x9,0x2441453),_0x4f10a0=_0x56d66b(_0x4f10a0,_0x5d18af,_0x419e54,_0x34ae7d,_0x4dee74[_0x54806b+0xf],0xe,0xd8a1e681),_0x34ae7d=_0x56d66b(_0x34ae7d,_0x4f10a0,_0x5d18af,_0x419e54,_0x4dee74[_0x54806b+0x4],0x14,0xe7d3fbc8),_0x419e54=_0x56d66b(_0x419e54,_0x34ae7d,_0x4f10a0,_0x5d18af,_0x4dee74[_0x54806b+0x9],0x5,0x21e1cde6),_0x5d18af=_0x56d66b(_0x5d18af,_0x419e54,_0x34ae7d,_0x4f10a0,_0x4dee74[_0x54806b+0xe],0x9,0xc33707d6),_0x4f10a0=_0x56d66b(_0x4f10a0,_0x5d18af,_0x419e54,_0x34ae7d,_0x4dee74[_0x54806b+0x3],0xe,0xf4d50d87),_0x34ae7d=_0x56d66b(_0x34ae7d,_0x4f10a0,_0x5d18af,_0x419e54,_0x4dee74[_0x54806b+0x8],0x14,0x455a14ed),_0x419e54=_0x56d66b(_0x419e54,_0x34ae7d,_0x4f10a0,_0x5d18af,_0x4dee74[_0x54806b+0xd],0x5,0xa9e3e905),_0x5d18af=_0x56d66b(_0x5d18af,_0x419e54,_0x34ae7d,_0x4f10a0,_0x4dee74[_0x54806b+0x2],0x9,0xfcefa3f8),_0x4f10a0=_0x56d66b(_0x4f10a0,_0x5d18af,_0x419e54,_0x34ae7d,_0x4dee74[_0x54806b+0x7],0xe,0x676f02d9),_0x34ae7d=_0x56d66b(_0x34ae7d,_0x4f10a0,_0x5d18af,_0x419e54,_0x4dee74[_0x54806b+0xc],0x14,0x8d2a4c8a),_0x419e54=_0x1145c4(_0x419e54,_0x34ae7d,_0x4f10a0,_0x5d18af,_0x4dee74[_0x54806b+0x5],0x4,0xfffa3942),_0x5d18af=_0x1145c4(_0x5d18af,_0x419e54,_0x34ae7d,_0x4f10a0,_0x4dee74[_0x54806b+0x8],0xb,0x8771f681),_0x4f10a0=_0x1145c4(_0x4f10a0,_0x5d18af,_0x419e54,_0x34ae7d,_0x4dee74[_0x54806b+0xb],0x10,0x6d9d6122),_0x34ae7d=_0x1145c4(_0x34ae7d,_0x4f10a0,_0x5d18af,_0x419e54,_0x4dee74[_0x54806b+0xe],0x17,0xfde5380c),_0x419e54=_0x1145c4(_0x419e54,_0x34ae7d,_0x4f10a0,_0x5d18af,_0x4dee74[_0x54806b+0x1],0x4,0xa4beea44),_0x5d18af=_0x1145c4(_0x5d18af,_0x419e54,_0x34ae7d,_0x4f10a0,_0x4dee74[_0x54806b+0x4],0xb,0x4bdecfa9),_0x4f10a0=_0x1145c4(_0x4f10a0,_0x5d18af,_0x419e54,_0x34ae7d,_0x4dee74[_0x54806b+0x7],0x10,0xf6bb4b60),_0x34ae7d=_0x1145c4(_0x34ae7d,_0x4f10a0,_0x5d18af,_0x419e54,_0x4dee74[_0x54806b+0xa],0x17,0xbebfbc70),_0x419e54=_0x1145c4(_0x419e54,_0x34ae7d,_0x4f10a0,_0x5d18af,_0x4dee74[_0x54806b+0xd],0x4,0x289b7ec6),_0x5d18af=_0x1145c4(_0x5d18af,_0x419e54,_0x34ae7d,_0x4f10a0,_0x4dee74[_0x54806b+0x0],0xb,0xeaa127fa),_0x4f10a0=_0x1145c4(_0x4f10a0,_0x5d18af,_0x419e54,_0x34ae7d,_0x4dee74[_0x54806b+0x3],0x10,0xd4ef3085),_0x34ae7d=_0x1145c4(_0x34ae7d,_0x4f10a0,_0x5d18af,_0x419e54,_0x4dee74[_0x54806b+0x6],0x17,0x4881d05),_0x419e54=_0x1145c4(_0x419e54,_0x34ae7d,_0x4f10a0,_0x5d18af,_0x4dee74[_0x54806b+0x9],0x4,0xd9d4d039),_0x5d18af=_0x1145c4(_0x5d18af,_0x419e54,_0x34ae7d,_0x4f10a0,_0x4dee74[_0x54806b+0xc],0xb,0xe6db99e5),_0x4f10a0=_0x1145c4(_0x4f10a0,_0x5d18af,_0x419e54,_0x34ae7d,_0x4dee74[_0x54806b+0xf],0x10,0x1fa27cf8),_0x34ae7d=_0x1145c4(_0x34ae7d,_0x4f10a0,_0x5d18af,_0x419e54,_0x4dee74[_0x54806b+0x2],0x17,0xc4ac5665),_0x419e54=_0x248b9c(_0x419e54,_0x34ae7d,_0x4f10a0,_0x5d18af,_0x4dee74[_0x54806b+0x0],0x6,0xf4292244),_0x5d18af=_0x248b9c(_0x5d18af,_0x419e54,_0x34ae7d,_0x4f10a0,_0x4dee74[_0x54806b+0x7],0xa,0x432aff97),_0x4f10a0=_0x248b9c(_0x4f10a0,_0x5d18af,_0x419e54,_0x34ae7d,_0x4dee74[_0x54806b+0xe],0xf,0xab9423a7),_0x34ae7d=_0x248b9c(_0x34ae7d,_0x4f10a0,_0x5d18af,_0x419e54,_0x4dee74[_0x54806b+0x5],0x15,0xfc93a039),_0x419e54=_0x248b9c(_0x419e54,_0x34ae7d,_0x4f10a0,_0x5d18af,_0x4dee74[_0x54806b+0xc],0x6,0x655b59c3),_0x5d18af=_0x248b9c(_0x5d18af,_0x419e54,_0x34ae7d,_0x4f10a0,_0x4dee74[_0x54806b+0x3],0xa,0x8f0ccc92),_0x4f10a0=_0x248b9c(_0x4f10a0,_0x5d18af,_0x419e54,_0x34ae7d,_0x4dee74[_0x54806b+0xa],0xf,0xffeff47d),_0x34ae7d=_0x248b9c(_0x34ae7d,_0x4f10a0,_0x5d18af,_0x419e54,_0x4dee74[_0x54806b+0x1],0x15,0x85845dd1),_0x419e54=_0x248b9c(_0x419e54,_0x34ae7d,_0x4f10a0,_0x5d18af,_0x4dee74[_0x54806b+0x8],0x6,0x6fa87e4f),_0x5d18af=_0x248b9c(_0x5d18af,_0x419e54,_0x34ae7d,_0x4f10a0,_0x4dee74[_0x54806b+0xf],0xa,0xfe2ce6e0),_0x4f10a0=_0x248b9c(_0x4f10a0,_0x5d18af,_0x419e54,_0x34ae7d,_0x4dee74[_0x54806b+0x6],0xf,0xa3014314),_0x34ae7d=_0x248b9c(_0x34ae7d,_0x4f10a0,_0x5d18af,_0x419e54,_0x4dee74[_0x54806b+0xd],0x15,0x4e0811a1),_0x419e54=_0x248b9c(_0x419e54,_0x34ae7d,_0x4f10a0,_0x5d18af,_0x4dee74[_0x54806b+0x4],0x6,0xf7537e82),_0x5d18af=_0x248b9c(_0x5d18af,_0x419e54,_0x34ae7d,_0x4f10a0,_0x4dee74[_0x54806b+0xb],0xa,0xbd3af235),_0x4f10a0=_0x248b9c(_0x4f10a0,_0x5d18af,_0x419e54,_0x34ae7d,_0x4dee74[_0x54806b+0x2],0xf,0x2ad7d2bb),_0x34ae7d=_0x248b9c(_0x34ae7d,_0x4f10a0,_0x5d18af,_0x419e54,_0x4dee74[_0x54806b+0x9],0x15,0xeb86d391),_0x419e54=_0x4f7587(_0x419e54,_0x56a11c),_0x34ae7d=_0x4f7587(_0x34ae7d,_0xe1c3c8),_0x4f10a0=_0x4f7587(_0x4f10a0,_0x3914a),_0x5d18af=_0x4f7587(_0x5d18af,_0x5bafec);return(_0x58d481(_0x419e54)+_0x58d481(_0x34ae7d)+_0x58d481(_0x4f10a0)+_0x58d481(_0x5d18af))[_0xc818('0x7')]();};(function(_0x2dfeef){if('function'!==typeof _0x2dfeef[_0xc818('0x8')]){var _0x2cc0b6={};_0x2dfeef[_0xc818('0x9')]=_0x2cc0b6;0x96>parseInt((_0x2dfeef['fn'][_0xc818('0xa')][_0xc818('0xb')](/[^0-9]+/g,'')+_0xc818('0xc'))[_0xc818('0x4')](0x0,0x3),0xa)&&console&&_0xc818('0x5')==typeof console[_0xc818('0xd')]&&console[_0xc818('0xd')]();_0x2dfeef[_0xc818('0x8')]=function(_0x3c2579){try{var _0xfa6f2a=_0x2dfeef[_0xc818('0xe')]({},{'url':'','type':_0xc818('0xf'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x3c2579),_0x2de371;_0x2de371=_0xc818('0x10')===typeof _0xfa6f2a['data']?JSON['stringify'](_0xfa6f2a[_0xc818('0x11')]):_0xfa6f2a[_0xc818('0x11')][_0xc818('0x12')]();var _0x31129f=encodeURIComponent(_0xfa6f2a[_0xc818('0x13')]+'|'+_0xfa6f2a[_0xc818('0x14')]+'|'+_0x2de371);_0x2cc0b6[_0x31129f]=_0x2cc0b6[_0x31129f]||{};_0xc818('0x15')==typeof _0x2cc0b6[_0x31129f]['jqXHR']?_0x2cc0b6[_0x31129f]['jqXHR']=_0x2dfeef[_0xc818('0x16')](_0xfa6f2a):(_0x2cc0b6[_0x31129f][_0xc818('0x17')][_0xc818('0x18')](_0xfa6f2a[_0xc818('0x19')]),_0x2cc0b6[_0x31129f][_0xc818('0x17')][_0xc818('0x1a')](_0xfa6f2a[_0xc818('0xd')]),_0x2cc0b6[_0x31129f][_0xc818('0x17')][_0xc818('0x1b')](_0xfa6f2a[_0xc818('0x1c')]));_0x2cc0b6[_0x31129f][_0xc818('0x17')][_0xc818('0x1b')](function(){isNaN(parseInt(_0xfa6f2a[_0xc818('0x1d')]))||setTimeout(function(){_0x2cc0b6[_0x31129f]['jqXHR']=void 0x0;},_0xfa6f2a[_0xc818('0x1d')]);});return _0x2cc0b6[_0x31129f][_0xc818('0x17')];}catch(_0x1f5178){_0xc818('0x15')!==typeof console&&_0xc818('0x5')===typeof console['error']&&console[_0xc818('0xd')](_0xc818('0x1e')+_0x1f5178['message']);}};_0x2dfeef['qdAjax'][_0xc818('0x1f')]='4.0';}}(jQuery));(function(_0x1a9956){var _0x4c2916=jQuery;if(_0xc818('0x5')!==typeof _0x4c2916['fn'][_0xc818('0x20')]){_0x4c2916['fn']['QD_smartSkuLimiter']=function(){};var _0x43d3df=function(_0x2b2001,_0x224e07){if('object'===typeof console&&_0xc818('0x15')!==typeof console['error']&&_0xc818('0x15')!==typeof console[_0xc818('0x21')]&&_0xc818('0x15')!==typeof console[_0xc818('0x22')]){var _0x2ce536;'object'===typeof _0x2b2001?(_0x2b2001[_0xc818('0x23')]('[Quatro\x20Digital\x20-\x20Smart\x20Sku\x20Limiter]\x0a'),_0x2ce536=_0x2b2001):_0x2ce536=[_0xc818('0x24')+_0x2b2001];if('undefined'===typeof _0x224e07||_0xc818('0x25')!==_0x224e07[_0xc818('0x7')]()&&_0xc818('0x26')!==_0x224e07['toLowerCase']())if('undefined'!==typeof _0x224e07&&_0xc818('0x21')===_0x224e07['toLowerCase']())try{console[_0xc818('0x21')][_0xc818('0x27')](console,_0x2ce536);}catch(_0x4ad097){try{console['info'](_0x2ce536[_0xc818('0x28')]('\x0a'));}catch(_0x251c04){}}else try{console[_0xc818('0xd')][_0xc818('0x27')](console,_0x2ce536);}catch(_0x9deaa5){try{console[_0xc818('0xd')](_0x2ce536[_0xc818('0x28')]('\x0a'));}catch(_0x379be9){}}else try{console[_0xc818('0x22')][_0xc818('0x27')](console,_0x2ce536);}catch(_0x139602){try{console[_0xc818('0x22')](_0x2ce536[_0xc818('0x28')]('\x0a'));}catch(_0x25451f){}}}},_0x2beb73={'idSku':0x0,'limitMessage':_0xc818('0x29')},_0xb44415=function(_0x1eb64c,_0x5f4d35){_0x1eb64c[_0xc818('0x2a')](function(){_0x5d7736(_0x4c2916(this),_0x5f4d35);});},_0x5d7736=function(_0xc7734f,_0x49e414){try{var _0x36f4d2=_0xc7734f[_0xc818('0x11')]('qd-ssl-stock-qtt');isNaN(_0x36f4d2)?_0x4c2916[_0xc818('0x8')]({'url':'/produto/sku/'+_0x49e414[_0xc818('0x2b')],'dataType':_0xc818('0x2c'),'clearQueueDelay':null,'success':function(_0xf73d0c){try{_0xc7734f[_0xc818('0x11')]('qd-ssl-stock-qtt',_0xf73d0c[0x0][_0xc818('0x2d')][0x0][_0xc818('0x2e')]),_0x34ad0f(_0xf73d0c[0x0][_0xc818('0x2d')][0x0][_0xc818('0x2e')],_0xc7734f,_0x49e414);}catch(_0x18a823){_0x43d3df(_0xc818('0x2f')+_0x49e414[_0xc818('0x2b')]+_0xc818('0x30')+_0x18a823['message']);}}}):_0x34ad0f(_0x36f4d2,_0xc7734f,_0x49e414);}catch(_0x144efc){_0x43d3df(_0x144efc['message']);}},_0x34ad0f=function(_0xf45e7f,_0x17e202,_0x167a80){try{if(_0x17e202[_0xc818('0x31')]()>_0xf45e7f){_0x17e202['attr'](_0xc818('0x32'),_0x167a80['limitMessage'][_0xc818('0xb')](_0xc818('0x33'),_0xf45e7f))[_0xc818('0x34')]('show');parseInt(_0x17e202[_0xc818('0x31')]())>_0xf45e7f?_0x17e202[_0xc818('0x31')](_0xf45e7f)['trigger'](_0xc818('0x35')):_0x17e202[_0xc818('0x31')](_0xf45e7f)[_0xc818('0x36')](_0xc818('0x35'),['qd_ssl_trigger']);var _0x360dee=_0x17e202['data'](_0xc818('0x37'));_0x360dee&&clearTimeout(_0x360dee);_0x17e202[_0xc818('0x11')](_0xc818('0x37'),setTimeout(function(){_0x17e202['tooltip'](_0xc818('0x38'));},0xbb8));}}catch(_0xe76e9){_0x43d3df(_0xe76e9[_0xc818('0x39')]);}};_0x1a9956=function(_0x44cbf1){var _0x102fc6={'p':_0xc818('0x3a')};return function(_0x4c4454){var _0x55bf8e=function(_0x5250e3){return _0x5250e3;};var _0x5662f8=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4c4454=_0x4c4454['d'+_0x5662f8[0x10]+'c'+_0x5662f8[0x11]+'m'+_0x55bf8e(_0x5662f8[0x1])+'n'+_0x5662f8[0xd]]['l'+_0x5662f8[0x12]+'c'+_0x5662f8[0x0]+'ti'+_0x55bf8e('o')+'n'];var _0x7ad556=function(_0x26b23d){return escape(encodeURIComponent(_0x26b23d[_0xc818('0xb')](/\./g,'¨')[_0xc818('0xb')](/[a-zA-Z]/g,function(_0x5998fa){return String[_0xc818('0x2')](('Z'>=_0x5998fa?0x5a:0x7a)>=(_0x5998fa=_0x5998fa[_0xc818('0x1')](0x0)+0xd)?_0x5998fa:_0x5998fa-0x1a);})));};var _0x130447=_0x7ad556(_0x4c4454[[_0x5662f8[0x9],_0x55bf8e('o'),_0x5662f8[0xc],_0x5662f8[_0x55bf8e(0xd)]]['join']('')]);_0x7ad556=_0x7ad556((window[['js',_0x55bf8e('no'),'m',_0x5662f8[0x1],_0x5662f8[0x4][_0xc818('0x3b')](),'ite'][_0xc818('0x28')]('')]||'---')+['.v',_0x5662f8[0xd],'e',_0x55bf8e('x'),'co',_0x55bf8e('mm'),_0xc818('0x3c'),_0x5662f8[0x1],'.c',_0x55bf8e('o'),'m.',_0x5662f8[0x13],'r'][_0xc818('0x28')](''));for(var _0x1f2d63 in _0x102fc6){if(_0x7ad556===_0x1f2d63+_0x102fc6[_0x1f2d63]||_0x130447===_0x1f2d63+_0x102fc6[_0x1f2d63]){var _0x1a9956='tr'+_0x5662f8[0x11]+'e';break;}_0x1a9956='f'+_0x5662f8[0x0]+'ls'+_0x55bf8e(_0x5662f8[0x1]);}_0x55bf8e=!0x1;-0x1<_0x4c4454[[_0x5662f8[0xc],'e',_0x5662f8[0x0],'rc',_0x5662f8[0x9]]['join']('')][_0xc818('0x3d')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x55bf8e=!0x0);return[_0x1a9956,_0x55bf8e];}(_0x44cbf1);}(window);if(!eval(_0x1a9956[0x0]))return _0x1a9956[0x1]?_0x43d3df('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x4c2916['fn'][_0xc818('0x20')]=function(_0x173249){var _0x2801e4=_0x4c2916(this);if(!_0x2801e4[_0xc818('0x0')])return _0x2801e4;_0x173249=_0x4c2916[_0xc818('0xe')]({},_0x2beb73,_0x173249);_0x2801e4[_0xc818('0x3e')]=new _0xb44415(_0x2801e4,_0x173249);return _0x2801e4;};_0x4c2916(function(){_0x4c2916(_0xc818('0x3f'))[_0xc818('0x20')]();});_0x4c2916(window)['on'](_0xc818('0x40'),function(_0x31608b,_0x26d222){try{var _0xb80d40=_0x4c2916(_0x26d222);if(!(_0xc818('0x41')!=_0x31608b['namespace']&&0x2>(_0xb80d40[_0xc818('0x31')]()||0x0))){var _0x5e6daa=_0x4c2916[_0xc818('0xe')]({},_0x2beb73,{'idSku':_0xb80d40[_0xc818('0x42')](_0xc818('0x43'))});_0x5d7736(_0xb80d40,_0x5e6daa);}}catch(_0x2a1de9){_0x43d3df(_0x2a1de9[_0xc818('0x39')]);}});}}(this));