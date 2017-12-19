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
			Product.seeDescription();
			Product.skuListSelection();
			Product.accessoriesFix();
			Product.accessoriesApplyCarousel();
			Product.qdNotifymeShow();
			Product.doublePrice();
			Product.setAvailableBodyClass();
			Common.smartQuantityShelf();
		},
		ajaxStop: function () {
			Product.addCloseBtnFreightTable();
		},
		windowOnload: function () {},
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
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-12 col-sm-4"},m=function(c,b){function a(f){var d,g=new e;f.length&&
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
var _0x6070=['qd-am-dropdown','qd-am-level-','add','qd-am-','callback','QuatroDigital.am.callback','QD_amazingMenu','extend','.qd_amazing_menu_auto','getParent','function','/qd-amazing-menu','error','info','undefined','warn','object','unshift','alerta','toLowerCase','aviso','join','apply','qdAmAddNdx','each','addClass','qd-am-li-','first','qd-am-first','neynoretnznfx%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','url','img[alt=\x27','data-qdam-value','.box-banner','clone','insertBefore','qd-am-content-loaded','text','trim','hide','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','call','trigger','QuatroDigital.am.ajaxCallback','UL\x20do\x20menu\x20não\x20encontrada','qd-am-has-ul','children','replaceSpecialChars','>li','qd-amazing-menu','>ul','qd-am-column','qd-am-dropdown-menu'];(function(_0x51d876,_0xf10b5e){var _0x331691=function(_0x25d4e2){while(--_0x25d4e2){_0x51d876['push'](_0x51d876['shift']());}};_0x331691(++_0xf10b5e);}(_0x6070,0xdb));var _0x0607=function(_0x558f5f,_0x11cc92){_0x558f5f=_0x558f5f-0x0;var _0x408ab3=_0x6070[_0x558f5f];return _0x408ab3;};(function(_0x23cf53){_0x23cf53['fn'][_0x0607('0x0')]=_0x23cf53['fn']['closest'];}(jQuery));(function(_0x39f8a4){'use strict';var _0x31d94e,_0x20dd78,_0x27b245,_0x3cdef8;_0x31d94e=jQuery;if(typeof _0x31d94e['fn']['QD_amazingMenu']===_0x0607('0x1'))return;_0x20dd78={'url':_0x0607('0x2'),'callback':function(){},'ajaxCallback':function(){}};var _0x53a053='QD\x20Amazing\x20Menu';var _0x2885cf=function(_0x251b82,_0x3f0482){if('object'===typeof console&&'undefined'!==typeof console[_0x0607('0x3')]&&'undefined'!==typeof console[_0x0607('0x4')]&&_0x0607('0x5')!==typeof console[_0x0607('0x6')]){var _0x3055de;_0x0607('0x7')===typeof _0x251b82?(_0x251b82[_0x0607('0x8')]('['+_0x53a053+']\x0a'),_0x3055de=_0x251b82):_0x3055de=['['+_0x53a053+']\x0a'+_0x251b82];if(_0x0607('0x5')===typeof _0x3f0482||_0x0607('0x9')!==_0x3f0482[_0x0607('0xa')]()&&_0x0607('0xb')!==_0x3f0482[_0x0607('0xa')]())if(_0x0607('0x5')!==typeof _0x3f0482&&_0x0607('0x4')===_0x3f0482[_0x0607('0xa')]())try{console[_0x0607('0x4')]['apply'](console,_0x3055de);}catch(_0x2a63f7){try{console[_0x0607('0x4')](_0x3055de[_0x0607('0xc')]('\x0a'));}catch(_0xe1bc59){}}else try{console['error']['apply'](console,_0x3055de);}catch(_0x6410cb){try{console[_0x0607('0x3')](_0x3055de['join']('\x0a'));}catch(_0x5afdd6){}}else try{console[_0x0607('0x6')][_0x0607('0xd')](console,_0x3055de);}catch(_0x521d9f){try{console[_0x0607('0x6')](_0x3055de['join']('\x0a'));}catch(_0x4a286a){}}}};_0x31d94e['fn'][_0x0607('0xe')]=function(){var _0x596ea2=_0x31d94e(this);_0x596ea2[_0x0607('0xf')](function(_0xdb1c02){_0x31d94e(this)[_0x0607('0x10')](_0x0607('0x11')+_0xdb1c02);});_0x596ea2[_0x0607('0x12')]()[_0x0607('0x10')](_0x0607('0x13'));_0x596ea2['last']()[_0x0607('0x10')]('qd-am-last');return _0x596ea2;};_0x31d94e['fn']['QD_amazingMenu']=function(){};var _0x44c272=function(_0x44f771){var _0x358c19={'p':_0x0607('0x14')};return function(_0x2e2981){var _0xfcdb27,_0x4f2df6,_0x14f30f,_0x134619;_0x4f2df6=function(_0x14a005){return _0x14a005;};_0x14f30f=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2e2981=_0x2e2981['d'+_0x14f30f[0x10]+'c'+_0x14f30f[0x11]+'m'+_0x4f2df6(_0x14f30f[0x1])+'n'+_0x14f30f[0xd]]['l'+_0x14f30f[0x12]+'c'+_0x14f30f[0x0]+'ti'+_0x4f2df6('o')+'n'];_0xfcdb27=function(_0x242976){return escape(encodeURIComponent(_0x242976[_0x0607('0x15')](/\./g,'¨')[_0x0607('0x15')](/[a-zA-Z]/g,function(_0x210dc5){return String[_0x0607('0x16')](('Z'>=_0x210dc5?0x5a:0x7a)>=(_0x210dc5=_0x210dc5[_0x0607('0x17')](0x0)+0xd)?_0x210dc5:_0x210dc5-0x1a);})));};var _0x50d37c=_0xfcdb27(_0x2e2981[[_0x14f30f[0x9],_0x4f2df6('o'),_0x14f30f[0xc],_0x14f30f[_0x4f2df6(0xd)]][_0x0607('0xc')]('')]);_0xfcdb27=_0xfcdb27((window[['js',_0x4f2df6('no'),'m',_0x14f30f[0x1],_0x14f30f[0x4][_0x0607('0x18')](),_0x0607('0x19')]['join']('')]||_0x0607('0x1a'))+['.v',_0x14f30f[0xd],'e',_0x4f2df6('x'),'co',_0x4f2df6('mm'),_0x0607('0x1b'),_0x14f30f[0x1],'.c',_0x4f2df6('o'),'m.',_0x14f30f[0x13],'r']['join'](''));for(var _0x5c7533 in _0x358c19){if(_0xfcdb27===_0x5c7533+_0x358c19[_0x5c7533]||_0x50d37c===_0x5c7533+_0x358c19[_0x5c7533]){_0x134619='tr'+_0x14f30f[0x11]+'e';break;}_0x134619='f'+_0x14f30f[0x0]+'ls'+_0x4f2df6(_0x14f30f[0x1])+'';}_0x4f2df6=!0x1;-0x1<_0x2e2981[[_0x14f30f[0xc],'e',_0x14f30f[0x0],'rc',_0x14f30f[0x9]][_0x0607('0xc')]('')][_0x0607('0x1c')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x4f2df6=!0x0);return[_0x134619,_0x4f2df6];}(_0x44f771);}(window);if(!eval(_0x44c272[0x0]))return _0x44c272[0x1]?_0x2885cf(_0x0607('0x1d')):!0x1;_0x3cdef8=function(_0x306a3a){var _0xc68d3c,_0x44b841,_0x9283be;_0x9283be=_0x306a3a[_0x0607('0x1e')](_0x0607('0x1f'));_0xc68d3c=_0x9283be[_0x0607('0x20')]('.qd-am-banner');_0x44b841=_0x9283be['filter']('.qd-am-collection');if(!(_0xc68d3c[_0x0607('0x21')]||_0x44b841[_0x0607('0x21')]))return;_0xc68d3c[_0x0607('0x22')]()['addClass'](_0x0607('0x23'));_0x44b841['parent']()[_0x0607('0x10')](_0x0607('0x24'));_0x31d94e['qdAjax']({'url':_0x27b245[_0x0607('0x25')],'dataType':'html','success':function(_0x417f72){var _0x58a4a2=_0x31d94e(_0x417f72);_0xc68d3c[_0x0607('0xf')](function(){var _0x3d9ffd,_0x3e2aa0;_0x3e2aa0=_0x31d94e(this);_0x3d9ffd=_0x58a4a2[_0x0607('0x1e')](_0x0607('0x26')+_0x3e2aa0['attr'](_0x0607('0x27'))+'\x27]');if(!_0x3d9ffd[_0x0607('0x21')])return;_0x3d9ffd[_0x0607('0xf')](function(){_0x31d94e(this)[_0x0607('0x0')](_0x0607('0x28'))[_0x0607('0x29')]()[_0x0607('0x2a')](_0x3e2aa0);});_0x3e2aa0['hide']();})[_0x0607('0x10')](_0x0607('0x2b'));_0x44b841[_0x0607('0xf')](function(){var _0x2ec272={},_0xad77ff;_0xad77ff=_0x31d94e(this);_0x58a4a2[_0x0607('0x1e')]('h2')[_0x0607('0xf')](function(){if(_0x31d94e(this)[_0x0607('0x2c')]()[_0x0607('0x2d')]()[_0x0607('0xa')]()==_0xad77ff['attr']('data-qdam-value')[_0x0607('0x2d')]()['toLowerCase']()){_0x2ec272=_0x31d94e(this);return![];}});if(!_0x2ec272[_0x0607('0x21')])return;_0x2ec272[_0x0607('0xf')](function(){_0x31d94e(this)[_0x0607('0x0')]('[class*=\x27colunas\x27]')[_0x0607('0x29')]()['insertBefore'](_0xad77ff);});_0xad77ff[_0x0607('0x2e')]();})[_0x0607('0x10')](_0x0607('0x2b'));},'error':function(){_0x2885cf(_0x0607('0x2f')+_0x27b245[_0x0607('0x25')]+_0x0607('0x30'));},'complete':function(){_0x27b245['ajaxCallback'][_0x0607('0x31')](this);_0x31d94e(window)[_0x0607('0x32')](_0x0607('0x33'),_0x306a3a);},'clearQueueDelay':0xbb8});};_0x31d94e['QD_amazingMenu']=function(_0x5bb273){var _0x2dadd5=_0x5bb273[_0x0607('0x1e')]('ul[itemscope]')[_0x0607('0xf')](function(){var _0x801e72,_0x5e012f,_0x441376,_0x2d96eb;_0x801e72=_0x31d94e(this);if(!_0x801e72[_0x0607('0x21')])return _0x2885cf([_0x0607('0x34'),_0x5bb273],'alerta');_0x801e72[_0x0607('0x1e')]('li\x20>ul')[_0x0607('0x22')]()[_0x0607('0x10')](_0x0607('0x35'));_0x801e72[_0x0607('0x1e')]('li')[_0x0607('0xf')](function(){var _0x3dcd37=_0x31d94e(this),_0x10a8e6;_0x10a8e6=_0x3dcd37[_0x0607('0x36')](':not(ul)');if(!_0x10a8e6[_0x0607('0x21')])return;_0x3dcd37['addClass']('qd-am-elem-'+_0x10a8e6[_0x0607('0x12')]()['text']()[_0x0607('0x2d')]()[_0x0607('0x37')]()[_0x0607('0x15')](/\./g,'')[_0x0607('0x15')](/\s/g,'-')[_0x0607('0xa')]());});_0x5e012f=_0x801e72[_0x0607('0x1e')](_0x0607('0x38'))['qdAmAddNdx']();_0x801e72[_0x0607('0x10')](_0x0607('0x39'));_0x441376=_0x5e012f[_0x0607('0x1e')](_0x0607('0x3a'));_0x441376[_0x0607('0xf')](function(){var _0xdc7e61=_0x31d94e(this),_0x2dce91;_0x2dce91=_0xdc7e61[_0x0607('0x1e')](_0x0607('0x38'))['qdAmAddNdx']()[_0x0607('0x10')](_0x0607('0x3b'));_0xdc7e61['addClass'](_0x0607('0x3c'));_0xdc7e61[_0x0607('0x22')]()[_0x0607('0x10')]('qd-am-dropdown');});_0x441376['addClass'](_0x0607('0x3d'));var _0x22c3bc=0x0;var _0xeeca01=function(_0x1f2fd4){_0x22c3bc=_0x22c3bc+0x1;var _0x3c166d=_0x1f2fd4[_0x0607('0x36')]('li');var _0x577510=_0x3c166d[_0x0607('0x36')]('*');if(!_0x577510['length'])return;_0x577510[_0x0607('0x10')](_0x0607('0x3e')+_0x22c3bc);_0xeeca01(_0x577510);};_0xeeca01(_0x801e72);_0x801e72[_0x0607('0x3f')](_0x801e72[_0x0607('0x1e')]('ul'))[_0x0607('0xf')](function(){var _0x5d91b9=_0x31d94e(this);_0x5d91b9['addClass'](_0x0607('0x40')+_0x5d91b9[_0x0607('0x36')]('li')[_0x0607('0x21')]+'-li');});});_0x3cdef8(_0x2dadd5);_0x27b245[_0x0607('0x41')][_0x0607('0x31')](this);_0x31d94e(window)['trigger'](_0x0607('0x42'),_0x5bb273);};_0x31d94e['fn'][_0x0607('0x43')]=function(_0x4cdbb3){var _0x140599=_0x31d94e(this);if(!_0x140599['length'])return _0x140599;_0x27b245=_0x31d94e[_0x0607('0x44')]({},_0x20dd78,_0x4cdbb3);_0x140599['exec']=new _0x31d94e[(_0x0607('0x43'))](_0x31d94e(this));return _0x140599;};_0x31d94e(function(){_0x31d94e(_0x0607('0x45'))[_0x0607('0x43')]();});}(this));

// smart cart
var _0x882f=['[data-sku=\x27','outerHeight','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','insertProdImg','forceImageHTTPS','string','http','https','qd-loaded','load','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','removeProduct','stop','slideUp','remove','$1-$2$3','data','qdDdcLastPostalCode','done','.qd-ddc-cep-tooltip-text','.qd-dd-cep-slas','logisticsInfo','slas','<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>','\x20dia\x20útil','\x20dias\x20útéis','<td>\x20R$\x20',',\x20entrega\x20em\x20','\x20para\x20o\x20CEP\x20','</td>','.qd-ddc-cep-close','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','index','totalizers','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','boolean','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','Quatro\x20Digital\x20-\x20Box\x20Amount\x20Cart','allowRecalculate','buyButtonClicked','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-wrapper','qd-bap-item-added','input.qd-productId[value=','prodId','.qd_bap_wrapper_content','prepend','productId','prod_','.qdDdcContainer','QD_smartCart','selector','dropDown','buyButton','QD_buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','closest','undefined','pow','round','toFixed','replace','length','join','_QuatroDigital_CartData','callback','Callbacks','function','error','Oooops!\x20','message','Quatro\x20Digital\x20-\x20DropDown\x20Cart','object','warn','unshift','alerta','toLowerCase','aviso','info','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','neynoretnznfx%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','ite','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>','skuName','name','extend','smartCheckout','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22>','<div\x20class=\x22qd-ddc-wrapper2\x22>','<div\x20class=\x22qd_ddc_lightBoxClose\x22></div>','<div\x20class=\x22qd-ddc-wrapper3\x22>','<div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div>','<span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div>','<div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22>','<div\x20class=\x22qd-ddc-infoTotal\x22></div>','<div\x20class=\x22qd-ddc-infoBts\x22>','<a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a>','</div></div></div></div></div>','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','find','.qd-ddc-viewCart','html','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-shipping','.qd-ddc-emptyCart\x20p','append','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','removeClass','qd-bb-lightBoxProdAdd','body','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text','.qd-ddc-shipping\x20.qd-ddc-cep','val','keyup.qd_ddc_cep','formatCepField','keyCode','.qd-ddc-shipping\x20.qd-ddc-cep-ok','click','.qd-ddc-cep-btn','toggle','preventDefault','hide','click._QD_DDC_closeShipping','target','.qd-ddc-cep-tooltip','.qd-ddc-cep-ok','shippingCalculate','.qd-ddc-cep','updateOnlyHover','getCartInfoByUrl','simpleCart','mouseleave.qd_ddc_hover','each','call','clone','.qd-ddc-infoTotalValue','total','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','.qd-ddc-infoAllTotal','allTotal','Atenção,\x20você\x20esta\x20utilizando\x20um\x20método\x20descontinuado','items','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','getOrderForm','_QuatroDigital_AmountProduct','exec','addClass','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','cartIsEmpty','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22>','<div\x20class=\x22qd-ddc-prodImgWrapper\x22>','</div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div>','<div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22>','<div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a>','split','attr','qd-ddc-','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','content','.qd-ddc-quantity','quantity','.qd-ddc-remove','.qd-ddc-image','appendTo','.qd-ddc-shipping\x20input','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','filter'];(function(_0xa8e183,_0x50629e){var _0x1a3fa8=function(_0x5b3fa9){while(--_0x5b3fa9){_0xa8e183['push'](_0xa8e183['shift']());}};_0x1a3fa8(++_0x50629e);}(_0x882f,0x160));var _0xf882=function(_0x4a010b,_0x3523b3){_0x4a010b=_0x4a010b-0x0;var _0xe0b19b=_0x882f[_0x4a010b];return _0xe0b19b;};(function(_0x2f9c44){_0x2f9c44['fn'][_0xf882('0x0')]=_0x2f9c44['fn'][_0xf882('0x1')];}(jQuery));function qd_number_format(_0x53a329,_0x370331,_0x24234f,_0x3be820){_0x53a329=(_0x53a329+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x53a329=isFinite(+_0x53a329)?+_0x53a329:0x0;_0x370331=isFinite(+_0x370331)?Math['abs'](_0x370331):0x0;_0x3be820=_0xf882('0x2')===typeof _0x3be820?',':_0x3be820;_0x24234f='undefined'===typeof _0x24234f?'.':_0x24234f;var _0x59317a='',_0x59317a=function(_0x2d5cbc,_0x3e678e){var _0x370331=Math[_0xf882('0x3')](0xa,_0x3e678e);return''+(Math[_0xf882('0x4')](_0x2d5cbc*_0x370331)/_0x370331)[_0xf882('0x5')](_0x3e678e);},_0x59317a=(_0x370331?_0x59317a(_0x53a329,_0x370331):''+Math['round'](_0x53a329))['split']('.');0x3<_0x59317a[0x0]['length']&&(_0x59317a[0x0]=_0x59317a[0x0][_0xf882('0x6')](/\B(?=(?:\d{3})+(?!\d))/g,_0x3be820));(_0x59317a[0x1]||'')[_0xf882('0x7')]<_0x370331&&(_0x59317a[0x1]=_0x59317a[0x1]||'',_0x59317a[0x1]+=Array(_0x370331-_0x59317a[0x1]['length']+0x1)[_0xf882('0x8')]('0'));return _0x59317a[_0xf882('0x8')](_0x24234f);};(function(){'use strict';try{window[_0xf882('0x9')]=window[_0xf882('0x9')]||{};window[_0xf882('0x9')]['callback']=window[_0xf882('0x9')][_0xf882('0xa')]||$[_0xf882('0xb')]();}catch(_0xecd98b){if(typeof console!==_0xf882('0x2')&&typeof console['error']===_0xf882('0xc'))console[_0xf882('0xd')](_0xf882('0xe'),_0xecd98b[_0xf882('0xf')]);}}());(function(_0x5ebdee){'use strict';try{var _0x2dd3ee=jQuery;var _0x405399=_0xf882('0x10');var _0x5d73b4=function(_0x96836f,_0x21640f){if(_0xf882('0x11')===typeof console&&'undefined'!==typeof console[_0xf882('0xd')]&&_0xf882('0x2')!==typeof console['info']&&_0xf882('0x2')!==typeof console[_0xf882('0x12')]){var _0x136b73;'object'===typeof _0x96836f?(_0x96836f[_0xf882('0x13')]('['+_0x405399+']\x0a'),_0x136b73=_0x96836f):_0x136b73=['['+_0x405399+']\x0a'+_0x96836f];if(_0xf882('0x2')===typeof _0x21640f||_0xf882('0x14')!==_0x21640f[_0xf882('0x15')]()&&_0xf882('0x16')!==_0x21640f[_0xf882('0x15')]())if('undefined'!==typeof _0x21640f&&_0xf882('0x17')===_0x21640f[_0xf882('0x15')]())try{console['info'][_0xf882('0x18')](console,_0x136b73);}catch(_0x3ec630){try{console[_0xf882('0x17')](_0x136b73[_0xf882('0x8')]('\x0a'));}catch(_0x1d9eeb){}}else try{console['error'][_0xf882('0x18')](console,_0x136b73);}catch(_0x9af613){try{console[_0xf882('0xd')](_0x136b73[_0xf882('0x8')]('\x0a'));}catch(_0xc003be){}}else try{console['warn'][_0xf882('0x18')](console,_0x136b73);}catch(_0x25bfc1){try{console['warn'](_0x136b73[_0xf882('0x8')]('\x0a'));}catch(_0x4e213c){}}}};window[_0xf882('0x19')]=window[_0xf882('0x19')]||{};window['_QuatroDigital_DropDown'][_0xf882('0x1a')]=!![];_0x2dd3ee[_0xf882('0x1b')]=function(){};_0x2dd3ee['fn']['QD_dropDownCart']=function(){return{'fn':new _0x2dd3ee()};};var _0x4f9c35=function(_0x59c069){var _0x4fb7d2={'p':_0xf882('0x1c')};return function(_0xb2233d){var _0x27611e,_0x4f542a,_0x2058cf,_0x4dde26;_0x4f542a=function(_0x54a81a){return _0x54a81a;};_0x2058cf=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0xb2233d=_0xb2233d['d'+_0x2058cf[0x10]+'c'+_0x2058cf[0x11]+'m'+_0x4f542a(_0x2058cf[0x1])+'n'+_0x2058cf[0xd]]['l'+_0x2058cf[0x12]+'c'+_0x2058cf[0x0]+'ti'+_0x4f542a('o')+'n'];_0x27611e=function(_0x10f7c3){return escape(encodeURIComponent(_0x10f7c3[_0xf882('0x6')](/\./g,'¨')[_0xf882('0x6')](/[a-zA-Z]/g,function(_0x375bad){return String['fromCharCode'](('Z'>=_0x375bad?0x5a:0x7a)>=(_0x375bad=_0x375bad[_0xf882('0x1d')](0x0)+0xd)?_0x375bad:_0x375bad-0x1a);})));};var _0x316e47=_0x27611e(_0xb2233d[[_0x2058cf[0x9],_0x4f542a('o'),_0x2058cf[0xc],_0x2058cf[_0x4f542a(0xd)]][_0xf882('0x8')]('')]);_0x27611e=_0x27611e((window[['js',_0x4f542a('no'),'m',_0x2058cf[0x1],_0x2058cf[0x4]['toUpperCase'](),_0xf882('0x1e')]['join']('')]||'---')+['.v',_0x2058cf[0xd],'e',_0x4f542a('x'),'co',_0x4f542a('mm'),'erc',_0x2058cf[0x1],'.c',_0x4f542a('o'),'m.',_0x2058cf[0x13],'r'][_0xf882('0x8')](''));for(var _0x4acd07 in _0x4fb7d2){if(_0x27611e===_0x4acd07+_0x4fb7d2[_0x4acd07]||_0x316e47===_0x4acd07+_0x4fb7d2[_0x4acd07]){_0x4dde26='tr'+_0x2058cf[0x11]+'e';break;}_0x4dde26='f'+_0x2058cf[0x0]+'ls'+_0x4f542a(_0x2058cf[0x1])+'';}_0x4f542a=!0x1;-0x1<_0xb2233d[[_0x2058cf[0xc],'e',_0x2058cf[0x0],'rc',_0x2058cf[0x9]][_0xf882('0x8')]('')][_0xf882('0x1f')](_0xf882('0x20'))&&(_0x4f542a=!0x0);return[_0x4dde26,_0x4f542a];}(_0x59c069);}(window);if(!eval(_0x4f9c35[0x0]))return _0x4f9c35[0x1]?_0x5d73b4(_0xf882('0x21')):!0x1;_0x2dd3ee[_0xf882('0x1b')]=function(_0x521d1c,_0x40df74){var _0x32e63c,_0xea13ec,_0x4508c3,_0x5c7936,_0x37a28c,_0x1ce393,_0x3ce715,_0x1fb9f0,_0x3a977e,_0x5512ea,_0x4a9a98,_0x2530cd;_0x4a9a98=_0x2dd3ee(_0x521d1c);if(!_0x4a9a98[_0xf882('0x7')])return _0x4a9a98;_0x32e63c={'updateOnlyHover':!![],'texts':{'linkCart':_0xf882('0x22'),'linkCheckout':_0xf882('0x23'),'cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':_0xf882('0x24'),'continueShopping':'Continuar\x20Comprando','shippingForm':_0xf882('0x25')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!![],'forceImageHTTPS':![],'skuName':function(_0x1d92a){return _0x1d92a[_0xf882('0x26')]||_0x1d92a[_0xf882('0x27')];},'callback':function(){},'callbackProductsList':function(){}};_0xea13ec=_0x2dd3ee[_0xf882('0x28')](!![],{},_0x32e63c,_0x40df74);_0x4508c3=_0x2dd3ee('');_0x5512ea=this;if(_0xea13ec[_0xf882('0x29')]){var _0x2f5f2b=![];if(typeof window[_0xf882('0x2a')]===_0xf882('0x2')){_0x5d73b4(_0xf882('0x2b'));_0x2dd3ee[_0xf882('0x2c')]({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':![],'dataType':_0xf882('0x2d'),'error':function(){_0x5d73b4(_0xf882('0x2e'));_0x2f5f2b=!![];}});}if(_0x2f5f2b)return _0x5d73b4(_0xf882('0x2f'));}var _0xb8fcb1;if(typeof window[_0xf882('0x2a')]===_0xf882('0x11')&&typeof window[_0xf882('0x2a')]['checkout']!==_0xf882('0x2'))_0xb8fcb1=window[_0xf882('0x2a')][_0xf882('0x30')];else if(typeof vtex===_0xf882('0x11')&&typeof vtex[_0xf882('0x30')]===_0xf882('0x11')&&typeof vtex[_0xf882('0x30')][_0xf882('0x31')]!==_0xf882('0x2'))_0xb8fcb1=new vtex['checkout'][(_0xf882('0x31'))]();else return _0x5d73b4(_0xf882('0x32'));_0x5512ea[_0xf882('0x33')]=_0xf882('0x34')+_0xf882('0x35')+_0xf882('0x36')+_0xf882('0x37')+_0xf882('0x38')+'<div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div>'+_0xf882('0x39')+_0xf882('0x3a')+'<div\x20class=\x22qd-ddc-shipping\x22></div>'+_0xf882('0x3b')+_0xf882('0x3c')+_0xf882('0x3d')+_0xf882('0x3e');_0x1ce393=function(_0x56b2f8){var _0x203ead=_0x2dd3ee(_0x56b2f8);_0xea13ec[_0xf882('0x3f')][_0xf882('0x40')]=_0xea13ec[_0xf882('0x3f')][_0xf882('0x40')]['replace'](_0xf882('0x41'),'<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>');_0xea13ec[_0xf882('0x3f')][_0xf882('0x40')]=_0xea13ec[_0xf882('0x3f')][_0xf882('0x40')][_0xf882('0x6')]('#items',_0xf882('0x42'));_0xea13ec[_0xf882('0x3f')][_0xf882('0x40')]=_0xea13ec[_0xf882('0x3f')][_0xf882('0x40')]['replace'](_0xf882('0x43'),_0xf882('0x44'));_0xea13ec[_0xf882('0x3f')][_0xf882('0x40')]=_0xea13ec[_0xf882('0x3f')][_0xf882('0x40')][_0xf882('0x6')]('#total',_0xf882('0x45'));_0x203ead[_0xf882('0x46')](_0xf882('0x47'))[_0xf882('0x48')](_0xea13ec[_0xf882('0x3f')][_0xf882('0x49')]);_0x203ead[_0xf882('0x46')](_0xf882('0x4a'))[_0xf882('0x48')](_0xea13ec[_0xf882('0x3f')][_0xf882('0x4b')]);_0x203ead[_0xf882('0x46')](_0xf882('0x4c'))['html'](_0xea13ec[_0xf882('0x3f')][_0xf882('0x4d')]);_0x203ead[_0xf882('0x46')]('.qd-ddc-infoTotal')['html'](_0xea13ec[_0xf882('0x3f')]['cartTotal']);_0x203ead[_0xf882('0x46')](_0xf882('0x4e'))[_0xf882('0x48')](_0xea13ec[_0xf882('0x3f')]['shippingForm']);_0x203ead[_0xf882('0x46')](_0xf882('0x4f'))['html'](_0xea13ec[_0xf882('0x3f')]['emptyCart']);return _0x203ead;};_0x37a28c=function(_0x1a5ba2){_0x2dd3ee(this)[_0xf882('0x50')](_0x1a5ba2);_0x1a5ba2[_0xf882('0x46')](_0xf882('0x51'))[_0xf882('0x52')](_0x2dd3ee(_0xf882('0x53')))['on'](_0xf882('0x54'),function(){_0x4a9a98[_0xf882('0x55')](_0xf882('0x56'));_0x2dd3ee(document[_0xf882('0x57')])[_0xf882('0x55')](_0xf882('0x58'));});_0x2dd3ee(document)[_0xf882('0x59')](_0xf882('0x5a'))['on'](_0xf882('0x5a'),function(_0x2a5cc5){if(_0x2a5cc5['keyCode']==0x1b){_0x4a9a98[_0xf882('0x55')](_0xf882('0x56'));_0x2dd3ee(document[_0xf882('0x57')])[_0xf882('0x55')]('qd-bb-lightBoxBodyProdAdd');}});var _0x3c81ca=_0x1a5ba2[_0xf882('0x46')](_0xf882('0x5b'));_0x1a5ba2[_0xf882('0x46')](_0xf882('0x5c'))['on'](_0xf882('0x5d'),function(){_0x5512ea[_0xf882('0x5e')]('-',undefined,undefined,_0x3c81ca);return![];});_0x1a5ba2[_0xf882('0x46')](_0xf882('0x5f'))['on'](_0xf882('0x60'),function(){_0x5512ea[_0xf882('0x5e')](undefined,undefined,undefined,_0x3c81ca);return![];});var _0x566e9b=_0x1a5ba2['find'](_0xf882('0x61'));_0x1a5ba2[_0xf882('0x46')](_0xf882('0x62'))[_0xf882('0x63')]('')['on'](_0xf882('0x64'),function(_0x29e8f6){_0x5512ea[_0xf882('0x65')](_0x2dd3ee(this));if(_0x29e8f6[_0xf882('0x66')]==0xd)_0x1a5ba2[_0xf882('0x46')](_0xf882('0x67'))[_0xf882('0x68')]();});_0x1a5ba2[_0xf882('0x46')](_0xf882('0x69'))[_0xf882('0x68')](function(_0x59e44e){_0x59e44e['preventDefault']();_0x566e9b[_0xf882('0x6a')]();});_0x1a5ba2[_0xf882('0x46')]('.qd-ddc-cep-close')[_0xf882('0x68')](function(_0x3abb98){_0x3abb98[_0xf882('0x6b')]();_0x566e9b[_0xf882('0x6c')]();});_0x2dd3ee(document)[_0xf882('0x59')](_0xf882('0x6d'))['on'](_0xf882('0x6d'),function(_0x2c159b){if(_0x2dd3ee(_0x2c159b[_0xf882('0x6e')])[_0xf882('0x1')](_0x1a5ba2['find'](_0xf882('0x6f')))[_0xf882('0x7')])return;_0x566e9b['hide']();});_0x1a5ba2[_0xf882('0x46')](_0xf882('0x70'))[_0xf882('0x68')](function(_0x81cb8d){_0x81cb8d[_0xf882('0x6b')]();_0x5512ea[_0xf882('0x71')](_0x1a5ba2[_0xf882('0x46')](_0xf882('0x72')));});if(_0xea13ec[_0xf882('0x73')]){var _0x19fc3a=0x0;_0x2dd3ee(this)['on']('mouseenter.qd_ddc_hover',function(){var _0x580878=function(){if(!window[_0xf882('0x19')][_0xf882('0x1a')])return;_0x5512ea[_0xf882('0x74')]();window[_0xf882('0x19')]['allowUpdate']=![];_0x2dd3ee['fn'][_0xf882('0x75')](!![]);_0x5512ea['cartIsEmpty']();};_0x19fc3a=setInterval(function(){_0x580878();},0x258);_0x580878();});_0x2dd3ee(this)['on'](_0xf882('0x76'),function(){clearInterval(_0x19fc3a);});}};_0x3ce715=_0x1ce393(this['cartContainer']);_0x1fb9f0=0x0;_0x4a9a98[_0xf882('0x77')](function(){if(_0x1fb9f0>0x0)_0x37a28c[_0xf882('0x78')](this,_0x3ce715[_0xf882('0x79')]());else _0x37a28c[_0xf882('0x78')](this,_0x3ce715);_0x1fb9f0++;});window[_0xf882('0x9')][_0xf882('0xa')][_0xf882('0x52')](function(){_0x2dd3ee(_0xf882('0x7a'))['html'](window['_QuatroDigital_CartData'][_0xf882('0x7b')]||'--');_0x2dd3ee(_0xf882('0x7c'))[_0xf882('0x48')](window[_0xf882('0x9')][_0xf882('0x7d')]||'0');_0x2dd3ee(_0xf882('0x7e'))[_0xf882('0x48')](window[_0xf882('0x9')]['shipping']||'--');_0x2dd3ee(_0xf882('0x7f'))[_0xf882('0x48')](window[_0xf882('0x9')][_0xf882('0x80')]||'--');});_0x3a977e=function(_0x36197f){_0x5d73b4(_0xf882('0x81'));};_0x2530cd=function(_0x541273,_0x478063){if(typeof _0x541273[_0xf882('0x82')]===_0xf882('0x2'))return _0x5d73b4('Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição');_0x5512ea[_0xf882('0x83')][_0xf882('0x78')](this,_0x478063);};_0x5512ea[_0xf882('0x74')]=function(_0x4538ac,_0x176a9d){var _0x19a053;if(typeof _0x176a9d!=_0xf882('0x2'))window[_0xf882('0x19')][_0xf882('0x84')]=_0x176a9d;else if(window[_0xf882('0x19')]['dataOptionsCache'])_0x176a9d=window['_QuatroDigital_DropDown'][_0xf882('0x84')];setTimeout(function(){window[_0xf882('0x19')][_0xf882('0x84')]=undefined;},_0xea13ec[_0xf882('0x85')]);_0x2dd3ee(_0xf882('0x86'))['removeClass'](_0xf882('0x87'));if(_0xea13ec[_0xf882('0x29')]){_0x19a053=function(_0xf420d4){window[_0xf882('0x19')][_0xf882('0x88')]=_0xf420d4;_0x2530cd(_0xf420d4,_0x176a9d);if(typeof window[_0xf882('0x89')]!==_0xf882('0x2')&&typeof window[_0xf882('0x89')][_0xf882('0x8a')]===_0xf882('0xc'))window[_0xf882('0x89')][_0xf882('0x8a')][_0xf882('0x78')](this);_0x2dd3ee(_0xf882('0x86'))[_0xf882('0x8b')]('qd-ddc-prodLoaded');};if(typeof window[_0xf882('0x19')]['getOrderForm']!==_0xf882('0x2')){_0x19a053(window['_QuatroDigital_DropDown']['getOrderForm']);if(typeof _0x4538ac===_0xf882('0xc'))_0x4538ac(window[_0xf882('0x19')][_0xf882('0x88')]);return;}_0x2dd3ee['QD_checkoutQueue']([_0xf882('0x82'),'totalizers',_0xf882('0x8c')],{'done':function(_0x5af353){_0x19a053[_0xf882('0x78')](this,_0x5af353);if(typeof _0x4538ac===_0xf882('0xc'))_0x4538ac(_0x5af353);},'fail':function(_0x1e6bb7){_0x5d73b4([_0xf882('0x8d'),_0x1e6bb7]);}});}else{alert(_0xf882('0x8e'));}};_0x5512ea[_0xf882('0x8f')]=function(){var _0x570f38=_0x2dd3ee(_0xf882('0x86'));if(_0x570f38['find'](_0xf882('0x90'))['length'])_0x570f38['removeClass'](_0xf882('0x91'));else _0x570f38[_0xf882('0x8b')](_0xf882('0x91'));};_0x5512ea['renderProductsList']=function(_0x2625d8){var _0x430497=_0x2dd3ee(_0xf882('0x92'));var _0x29b5d0=_0xf882('0x93')+_0xf882('0x94')+_0xf882('0x95')+'<img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/>'+'<span\x20class=\x22qd-ddc-imgLoading\x22></span>'+'</div>'+_0xf882('0x96')+_0xf882('0x97')+_0xf882('0x98')+'<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22>'+_0xf882('0x99')+_0xf882('0x9a')+'<input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/>'+'<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a>'+'<span\x20class=\x22qd-ddc-qttLoading\x22></span>'+_0xf882('0x96')+_0xf882('0x96')+_0xf882('0x9b')+_0xf882('0x9c')+_0xf882('0x9d')+'<span\x20class=\x22qd-ddc-prodRowLoading\x22></span>'+_0xf882('0x96')+_0xf882('0x96')+_0xf882('0x96');_0x430497['empty']();_0x430497['each'](function(){var _0x230851=_0x2dd3ee(this);var _0x2e6e7f,_0x55f7b0,_0x56f52e,_0x39823e;var _0x5b72a1=_0x2dd3ee('');var _0xe2411a;for(var _0x4ed735 in window[_0xf882('0x19')][_0xf882('0x88')][_0xf882('0x82')]){if(typeof window['_QuatroDigital_DropDown'][_0xf882('0x88')][_0xf882('0x82')][_0x4ed735]!==_0xf882('0x11'))continue;_0x56f52e=window[_0xf882('0x19')]['getOrderForm'][_0xf882('0x82')][_0x4ed735];_0xe2411a=_0x56f52e['productCategoryIds'][_0xf882('0x6')](/^\/|\/$/g,'')[_0xf882('0x9e')]('/');_0x55f7b0=_0x2dd3ee(_0x29b5d0);_0x55f7b0[_0xf882('0x9f')]({'data-sku':_0x56f52e['id'],'data-sku-index':_0x4ed735,'data-qd-departament':_0xe2411a[0x0],'data-qd-category':_0xe2411a[_0xe2411a['length']-0x1]});_0x55f7b0[_0xf882('0x8b')](_0xf882('0xa0')+_0x56f52e[_0xf882('0xa1')]);_0x55f7b0['find'](_0xf882('0xa2'))[_0xf882('0x50')](_0xea13ec[_0xf882('0x26')](_0x56f52e));_0x55f7b0[_0xf882('0x46')](_0xf882('0xa3'))[_0xf882('0x50')](isNaN(_0x56f52e[_0xf882('0xa4')])?_0x56f52e['sellingPrice']:_0x56f52e[_0xf882('0xa4')]==0x0?_0xf882('0xa5'):(_0x2dd3ee(_0xf882('0xa6'))[_0xf882('0x9f')](_0xf882('0xa7'))||'R$')+'\x20'+qd_number_format(_0x56f52e[_0xf882('0xa4')]/0x64,0x2,',','.'));_0x55f7b0[_0xf882('0x46')](_0xf882('0xa8'))[_0xf882('0x9f')]({'data-sku':_0x56f52e['id'],'data-sku-index':_0x4ed735})[_0xf882('0x63')](_0x56f52e[_0xf882('0xa9')]);_0x55f7b0[_0xf882('0x46')](_0xf882('0xaa'))[_0xf882('0x9f')]({'data-sku':_0x56f52e['id'],'data-sku-index':_0x4ed735});_0x5512ea['insertProdImg'](_0x56f52e['id'],_0x55f7b0[_0xf882('0x46')](_0xf882('0xab')),_0x56f52e['imageUrl']);_0x55f7b0[_0xf882('0x46')]('.qd-ddc-quantityMore,.qd-ddc-quantityMinus')[_0xf882('0x9f')]({'data-sku':_0x56f52e['id'],'data-sku-index':_0x4ed735});_0x55f7b0[_0xf882('0xac')](_0x230851);_0x5b72a1=_0x5b72a1[_0xf882('0x52')](_0x55f7b0);}try{var _0x1d6e97=_0x230851[_0xf882('0x0')](_0xf882('0x86'))[_0xf882('0x46')](_0xf882('0xad'));if(_0x1d6e97[_0xf882('0x7')]&&_0x1d6e97[_0xf882('0x63')]()==''&&window['_QuatroDigital_DropDown']['getOrderForm'][_0xf882('0x8c')][_0xf882('0xae')])_0x1d6e97[_0xf882('0x63')](window['_QuatroDigital_DropDown']['getOrderForm']['shippingData']['address'][_0xf882('0xaf')]);}catch(_0x33b8d7){_0x5d73b4(_0xf882('0xb0')+_0x33b8d7[_0xf882('0xf')],_0xf882('0x16'));}_0x5512ea[_0xf882('0xb1')](_0x230851);_0x5512ea[_0xf882('0x8f')]();if(_0x2625d8&&_0x2625d8[_0xf882('0xb2')]){(function(){_0x39823e=_0x5b72a1[_0xf882('0xb3')](_0xf882('0xb4')+_0x2625d8[_0xf882('0xb2')]+'\x27]');if(!_0x39823e['length'])return;_0x2e6e7f=0x0;_0x5b72a1['each'](function(){var _0x393ad1=_0x2dd3ee(this);if(_0x393ad1['is'](_0x39823e))return![];_0x2e6e7f+=_0x393ad1[_0xf882('0xb5')]();});_0x5512ea['scrollCart'](undefined,undefined,_0x2e6e7f,_0x230851[_0xf882('0x52')](_0x230851[_0xf882('0xb6')]()));_0x5b72a1['removeClass'](_0xf882('0xb7'));(function(_0x4f36a3){_0x4f36a3[_0xf882('0x8b')](_0xf882('0xb8'));_0x4f36a3[_0xf882('0x8b')](_0xf882('0xb7'));setTimeout(function(){_0x4f36a3['removeClass']('qd-ddc-lastAdded');},_0xea13ec[_0xf882('0x85')]);}(_0x39823e));_0x2dd3ee(document[_0xf882('0x57')])['addClass'](_0xf882('0xb9'));setTimeout(function(){_0x2dd3ee(document[_0xf882('0x57')])[_0xf882('0x55')]('qd-ddc-product-add-time-v2');},_0xea13ec['timeRemoveNewItemClass']);}());}});(function(){if(_QuatroDigital_DropDown['getOrderForm'][_0xf882('0x82')][_0xf882('0x7')]){_0x2dd3ee('body')[_0xf882('0x55')](_0xf882('0xba'))[_0xf882('0x8b')](_0xf882('0xbb'));setTimeout(function(){_0x2dd3ee(_0xf882('0x57'))['removeClass'](_0xf882('0xbc'));},_0xea13ec[_0xf882('0x85')]);}else _0x2dd3ee(_0xf882('0x57'))[_0xf882('0x55')](_0xf882('0xbd'))['addClass']('qd-ddc-cart-empty');}());if(typeof _0xea13ec['callbackProductsList']==='function')_0xea13ec[_0xf882('0xbe')][_0xf882('0x78')](this);else _0x5d73b4(_0xf882('0xbf'));};_0x5512ea[_0xf882('0xc0')]=function(_0x4cf781,_0x4afec7,_0x317963){var _0x5c4426=!![];function _0x537c71(){if(_0xea13ec[_0xf882('0xc1')]&&typeof _0x317963==_0xf882('0xc2'))_0x317963=_0x317963[_0xf882('0x6')](_0xf882('0xc3'),_0xf882('0xc4'));_0x4afec7[_0xf882('0x55')](_0xf882('0xc5'))[_0xf882('0xc6')](function(){_0x2dd3ee(this)['addClass'](_0xf882('0xc5'));})[_0xf882('0x9f')]('src',_0x317963);};if(_0x317963)_0x537c71();else if(!isNaN(_0x4cf781)){alert(_0xf882('0xc7'));}else _0x5d73b4(_0xf882('0xc8'),'alerta');};_0x5512ea[_0xf882('0xb1')]=function(_0x13011f){var _0x4b0008,_0xfce4df,_0x5e2abe,_0x568627;_0x4b0008=function(_0x226189,_0xbc588f){var _0x374944,_0x140929,_0x3172ee,_0x1557ec,_0x4e4916;_0x3172ee=_0x2dd3ee(_0x226189);_0x374944=_0x3172ee['attr'](_0xf882('0xc9'));_0x4e4916=_0x3172ee[_0xf882('0x9f')](_0xf882('0xca'));if(!_0x374944)return;_0x140929=parseInt(_0x3172ee[_0xf882('0x63')]())||0x1;_0x5512ea['changeQantity']([_0x374944,_0x4e4916],_0x140929,_0x140929+0x1,function(_0xe2cff9){_0x3172ee[_0xf882('0x63')](_0xe2cff9);if(typeof _0xbc588f===_0xf882('0xc'))_0xbc588f();});};_0x5e2abe=function(_0x505cc5,_0x5479e3){var _0x23f47b,_0x178e7b,_0x45708f,_0x5d3ae2,_0x166966;_0x45708f=_0x2dd3ee(_0x505cc5);_0x23f47b=_0x45708f[_0xf882('0x9f')]('data-sku');_0x166966=_0x45708f[_0xf882('0x9f')](_0xf882('0xca'));if(!_0x23f47b)return;_0x178e7b=parseInt(_0x45708f[_0xf882('0x63')]())||0x2;_0x5d3ae2=_0x5512ea[_0xf882('0xcb')]([_0x23f47b,_0x166966],_0x178e7b,_0x178e7b-0x1,function(_0x4a7fd8){_0x45708f[_0xf882('0x63')](_0x4a7fd8);if(typeof _0x5479e3===_0xf882('0xc'))_0x5479e3();});};_0x568627=function(_0x2e97fa,_0x233c8e){var _0x16a68f,_0xb8b837,_0x5ce8cd,_0xddae59,_0x5b663a;_0x5ce8cd=_0x2dd3ee(_0x2e97fa);_0x16a68f=_0x5ce8cd[_0xf882('0x9f')](_0xf882('0xc9'));_0x5b663a=_0x5ce8cd[_0xf882('0x9f')](_0xf882('0xca'));if(!_0x16a68f)return;_0xb8b837=parseInt(_0x5ce8cd[_0xf882('0x63')]())||0x1;_0xddae59=_0x5512ea['changeQantity']([_0x16a68f,_0x5b663a],0x1,_0xb8b837,function(_0x5a70a6){_0x5ce8cd[_0xf882('0x63')](_0x5a70a6);if(typeof _0x233c8e==='function')_0x233c8e();});};_0xfce4df=_0x13011f['find'](_0xf882('0xcc'));_0xfce4df[_0xf882('0x8b')]('qd_on')[_0xf882('0x77')](function(){var _0x4f82d9=_0x2dd3ee(this);_0x4f82d9[_0xf882('0x46')](_0xf882('0xcd'))['on'](_0xf882('0xce'),function(_0x2ccb4a){_0x2ccb4a[_0xf882('0x6b')]();_0xfce4df['addClass'](_0xf882('0xcf'));_0x4b0008(_0x4f82d9[_0xf882('0x46')](_0xf882('0xa8')),function(){_0xfce4df[_0xf882('0x55')](_0xf882('0xcf'));});});_0x4f82d9[_0xf882('0x46')]('.qd-ddc-quantityMinus')['on'](_0xf882('0xd0'),function(_0x280ea7){_0x280ea7[_0xf882('0x6b')]();_0xfce4df[_0xf882('0x8b')]('qd-loading');_0x5e2abe(_0x4f82d9[_0xf882('0x46')](_0xf882('0xa8')),function(){_0xfce4df['removeClass'](_0xf882('0xcf'));});});_0x4f82d9[_0xf882('0x46')](_0xf882('0xa8'))['on'](_0xf882('0xd1'),function(){_0xfce4df['addClass'](_0xf882('0xcf'));_0x568627(this,function(){_0xfce4df['removeClass'](_0xf882('0xcf'));});});_0x4f82d9[_0xf882('0x46')](_0xf882('0xa8'))['on'](_0xf882('0xd2'),function(_0x51c22b){if(_0x51c22b[_0xf882('0x66')]!=0xd)return;_0xfce4df['addClass'](_0xf882('0xcf'));_0x568627(this,function(){_0xfce4df[_0xf882('0x55')]('qd-loading');});});});_0x13011f[_0xf882('0x46')](_0xf882('0x90'))[_0xf882('0x77')](function(){var _0x5354bc=_0x2dd3ee(this);_0x5354bc[_0xf882('0x46')](_0xf882('0xaa'))['on']('click.qd_ddc_remove',function(){var _0x394146;_0x5354bc[_0xf882('0x8b')]('qd-loading');_0x5512ea[_0xf882('0xd3')](_0x2dd3ee(this),function(_0x5c1a93){if(_0x5c1a93)_0x5354bc[_0xf882('0xd4')](!![])[_0xf882('0xd5')](function(){_0x5354bc[_0xf882('0xd6')]();_0x5512ea[_0xf882('0x8f')]();});else _0x5354bc['removeClass'](_0xf882('0xcf'));});return![];});});};_0x5512ea[_0xf882('0x65')]=function(_0x3eeae1){var _0x598d89=_0x3eeae1[_0xf882('0x63')]();_0x598d89=_0x598d89[_0xf882('0x6')](/[^0-9\-]/g,'');_0x598d89=_0x598d89[_0xf882('0x6')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0xf882('0xd7'));_0x598d89=_0x598d89[_0xf882('0x6')](/(.{9}).*/g,'$1');_0x3eeae1[_0xf882('0x63')](_0x598d89);};_0x5512ea[_0xf882('0x71')]=function(_0x4df8f4){var _0x38788c=_0x4df8f4['val']();if(_0x38788c['length']>=0x9){if(_0x4df8f4[_0xf882('0xd8')](_0xf882('0xd9'))!=_0x38788c){_0xb8fcb1['calculateShipping']({'postalCode':_0x38788c,'country':'BRA'})[_0xf882('0xda')](function(_0x23ad7d){_0x4df8f4[_0xf882('0x1')](_0xf882('0xdb'))[_0xf882('0x46')](_0xf882('0xdc'))[_0xf882('0xd6')]();window[_0xf882('0x19')]['getOrderForm']=_0x23ad7d;_0x5512ea[_0xf882('0x74')]();var _0x250168=_0x23ad7d['shippingData'][_0xf882('0xdd')][0x0][_0xf882('0xde')];var _0x6420aa=_0x2dd3ee(_0xf882('0xdf'));for(var _0x5bedac=0x0;_0x5bedac<_0x250168['length'];_0x5bedac++){var _0xc584b5=_0x250168[_0x5bedac];var _0x31a1da=_0xc584b5['shippingEstimate']>0x1?_0xc584b5['shippingEstimate'][_0xf882('0x6')]('bd',_0xf882('0xe0')):_0xc584b5['shippingEstimate'][_0xf882('0x6')]('bd',_0xf882('0xe1'));var _0x48ff71=_0x2dd3ee('<tr></tr>');_0x48ff71[_0xf882('0x50')](_0xf882('0xe2')+qd_number_format(_0xc584b5['price']/0x64,0x2,',','.')+'</td><td>'+_0xc584b5[_0xf882('0x27')]+_0xf882('0xe3')+_0x31a1da+_0xf882('0xe4')+_0x38788c+_0xf882('0xe5'));_0x48ff71[_0xf882('0xac')](_0x6420aa[_0xf882('0x46')]('tbody'));}_0x6420aa['insertBefore'](_0x4df8f4[_0xf882('0x1')](_0xf882('0xdb'))[_0xf882('0x46')](_0xf882('0xe6')));})[_0xf882('0xe7')](function(_0x2c5923){_0x5d73b4([_0xf882('0xe8'),_0x2c5923]);updateCartData();});}_0x4df8f4[_0xf882('0xd8')](_0xf882('0xd9'),_0x38788c);}};_0x5512ea['changeQantity']=function(_0x462250,_0x4479ac,_0x24d0e8,_0x25a6a8){var _0x3a98b3=_0x24d0e8||0x1;if(_0x3a98b3<0x1)return _0x4479ac;if(_0xea13ec[_0xf882('0x29')]){if(typeof window[_0xf882('0x19')][_0xf882('0x88')][_0xf882('0x82')][_0x462250[0x1]]==='undefined'){_0x5d73b4('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x462250[0x1]+']');return _0x4479ac;}window[_0xf882('0x19')]['getOrderForm'][_0xf882('0x82')][_0x462250[0x1]]['quantity']=_0x3a98b3;window[_0xf882('0x19')]['getOrderForm'][_0xf882('0x82')][_0x462250[0x1]][_0xf882('0xe9')]=_0x462250[0x1];_0xb8fcb1['updateItems']([window[_0xf882('0x19')][_0xf882('0x88')][_0xf882('0x82')][_0x462250[0x1]]],['items',_0xf882('0xea'),'shippingData'])[_0xf882('0xda')](function(_0x57fc08){window[_0xf882('0x19')]['getOrderForm']=_0x57fc08;_0x1dced5(!![]);})['fail'](function(_0x3f14be){_0x5d73b4([_0xf882('0xeb'),_0x3f14be]);_0x1dced5();});}else{_0x5d73b4('atenção\x20esta\x20método\x20esta\x20descontinuado');}function _0x1dced5(_0x4301af){_0x4301af=typeof _0x4301af!=='boolean'?![]:_0x4301af;_0x5512ea[_0xf882('0x74')]();window[_0xf882('0x19')]['allowUpdate']=![];_0x5512ea[_0xf882('0x8f')]();if(typeof window['_QuatroDigital_AmountProduct']!==_0xf882('0x2')&&typeof window[_0xf882('0x89')][_0xf882('0x8a')]===_0xf882('0xc'))window[_0xf882('0x89')][_0xf882('0x8a')][_0xf882('0x78')](this);if(typeof adminCart===_0xf882('0xc'))adminCart();_0x2dd3ee['fn'][_0xf882('0x75')](!![],undefined,_0x4301af);if(typeof _0x25a6a8===_0xf882('0xc'))_0x25a6a8(_0x4479ac);};};_0x5512ea[_0xf882('0xd3')]=function(_0x2c64c6,_0x5da3f6){var _0x328600=![];var _0x2d6aaf=_0x2dd3ee(_0x2c64c6);var _0x3b79a0=_0x2d6aaf[_0xf882('0x9f')]('data-sku-index');if(_0xea13ec[_0xf882('0x29')]){if(typeof window[_0xf882('0x19')][_0xf882('0x88')][_0xf882('0x82')][_0x3b79a0]===_0xf882('0x2')){_0x5d73b4('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x3b79a0+']');return _0x328600;}window[_0xf882('0x19')][_0xf882('0x88')]['items'][_0x3b79a0][_0xf882('0xe9')]=_0x3b79a0;_0xb8fcb1[_0xf882('0xec')]([window[_0xf882('0x19')][_0xf882('0x88')][_0xf882('0x82')][_0x3b79a0]],[_0xf882('0x82'),_0xf882('0xea'),_0xf882('0x8c')])[_0xf882('0xda')](function(_0x307800){_0x328600=!![];window['_QuatroDigital_DropDown'][_0xf882('0x88')]=_0x307800;_0x2530cd(_0x307800);_0x22f433(!![]);})[_0xf882('0xe7')](function(_0x336573){_0x5d73b4([_0xf882('0xed'),_0x336573]);_0x22f433();});}else{alert(_0xf882('0xee'));}function _0x22f433(_0x5aee40){_0x5aee40=typeof _0x5aee40!==_0xf882('0xef')?![]:_0x5aee40;if(typeof window[_0xf882('0x89')]!==_0xf882('0x2')&&typeof window[_0xf882('0x89')][_0xf882('0x8a')]==='function')window[_0xf882('0x89')]['exec'][_0xf882('0x78')](this);if(typeof adminCart===_0xf882('0xc'))adminCart();_0x2dd3ee['fn']['simpleCart'](!![],undefined,_0x5aee40);if(typeof _0x5da3f6===_0xf882('0xc'))_0x5da3f6(_0x328600);};};_0x5512ea[_0xf882('0x5e')]=function(_0x187d56,_0x248df5,_0x34218f,_0x1ab0ef){var _0x3eb244=_0x1ab0ef||_0x2dd3ee(_0xf882('0xf0'));var _0x8f1b61=_0x187d56||'+';var _0xacd644=_0x248df5||_0x3eb244['height']()*0.9;_0x3eb244[_0xf882('0xd4')](!![],!![])[_0xf882('0xf1')]({'scrollTop':isNaN(_0x34218f)?_0x8f1b61+'='+_0xacd644+'px':_0x34218f});};if(!_0xea13ec[_0xf882('0x73')]){_0x5512ea['getCartInfoByUrl']();_0x2dd3ee['fn'][_0xf882('0x75')](!![]);}_0x2dd3ee(window)['on'](_0xf882('0xf2'),function(){try{window[_0xf882('0x19')][_0xf882('0x88')]=undefined;_0x5512ea['getCartInfoByUrl']();}catch(_0x131f1c){_0x5d73b4(_0xf882('0xf3')+_0x131f1c['message'],_0xf882('0xf4'));}});if(typeof _0xea13ec[_0xf882('0xa')]===_0xf882('0xc'))_0xea13ec[_0xf882('0xa')][_0xf882('0x78')](this);else _0x5d73b4(_0xf882('0xf5'));};_0x2dd3ee['fn'][_0xf882('0x1b')]=function(_0x3483ec){var _0x97c1d5;_0x97c1d5=_0x2dd3ee(this);_0x97c1d5['fn']=new _0x2dd3ee['QD_dropDownCart'](this,_0x3483ec);return _0x97c1d5;};}catch(_0x54e06f){if(typeof console!==_0xf882('0x2')&&typeof console[_0xf882('0xd')]===_0xf882('0xc'))console['error']('Oooops!\x20',_0x54e06f);}}(this));(function(_0x1be83a){'use strict';try{var _0x3221e1=jQuery;var _0x497b25=_0xf882('0xf6');var _0x359c3f=function(_0xe6d1b6,_0x1722b3){if(_0xf882('0x11')===typeof console&&'undefined'!==typeof console[_0xf882('0xd')]&&_0xf882('0x2')!==typeof console[_0xf882('0x17')]&&_0xf882('0x2')!==typeof console[_0xf882('0x12')]){var _0x577d32;'object'===typeof _0xe6d1b6?(_0xe6d1b6['unshift']('['+_0x497b25+']\x0a'),_0x577d32=_0xe6d1b6):_0x577d32=['['+_0x497b25+']\x0a'+_0xe6d1b6];if(_0xf882('0x2')===typeof _0x1722b3||_0xf882('0x14')!==_0x1722b3['toLowerCase']()&&_0xf882('0x16')!==_0x1722b3[_0xf882('0x15')]())if(_0xf882('0x2')!==typeof _0x1722b3&&'info'===_0x1722b3[_0xf882('0x15')]())try{console[_0xf882('0x17')][_0xf882('0x18')](console,_0x577d32);}catch(_0x494ceb){try{console[_0xf882('0x17')](_0x577d32[_0xf882('0x8')]('\x0a'));}catch(_0x3a39e0){}}else try{console['error'][_0xf882('0x18')](console,_0x577d32);}catch(_0x4dd7ef){try{console[_0xf882('0xd')](_0x577d32[_0xf882('0x8')]('\x0a'));}catch(_0x550955){}}else try{console['warn'][_0xf882('0x18')](console,_0x577d32);}catch(_0x2219a5){try{console['warn'](_0x577d32['join']('\x0a'));}catch(_0x4c83fa){}}}};window[_0xf882('0x89')]=window['_QuatroDigital_AmountProduct']||{};window[_0xf882('0x89')]['items']={};window[_0xf882('0x89')][_0xf882('0xf7')]=![];window[_0xf882('0x89')][_0xf882('0xf8')]=![];window[_0xf882('0x89')]['quickViewUpdate']=![];var _0x388dde=_0xf882('0xf9');var _0x8ea37b=function(){var _0x5da5a5,_0x3fb81e,_0x2c1e58,_0x455c9d;_0x455c9d=_0xb5da96();if(window[_0xf882('0x89')]['allowRecalculate']){_0x3221e1(_0xf882('0xfa'))[_0xf882('0xd6')]();_0x3221e1('.qd-bap-item-added')[_0xf882('0x55')](_0xf882('0xfb'));}for(var _0x1197e3 in window[_0xf882('0x89')][_0xf882('0x82')]){_0x5da5a5=window[_0xf882('0x89')][_0xf882('0x82')][_0x1197e3];if(typeof _0x5da5a5!==_0xf882('0x11'))return;_0x2c1e58=_0x3221e1(_0xf882('0xfc')+_0x5da5a5[_0xf882('0xfd')]+']')['getParent']('li');if(!window['_QuatroDigital_AmountProduct']['allowRecalculate']&&_0x2c1e58[_0xf882('0x46')](_0xf882('0xfa'))['length'])continue;_0x3fb81e=_0x3221e1(_0x388dde);_0x3fb81e[_0xf882('0x46')]('.qd-bap-qtt')[_0xf882('0x48')](_0x5da5a5[_0xf882('0x7d')]);var _0x3af38d=_0x2c1e58['find'](_0xf882('0xfe'));if(_0x3af38d[_0xf882('0x7')])_0x3af38d['prepend'](_0x3fb81e)[_0xf882('0x8b')](_0xf882('0xfb'));else _0x2c1e58[_0xf882('0xff')](_0x3fb81e);}if(_0x455c9d)window[_0xf882('0x89')][_0xf882('0xf7')]=![];};var _0xb5da96=function(){if(!window[_0xf882('0x89')][_0xf882('0xf7')])return;var _0x496f92=![],_0x19a672={};window[_0xf882('0x89')][_0xf882('0x82')]={};for(var _0x4c22a7 in window[_0xf882('0x19')][_0xf882('0x88')][_0xf882('0x82')]){if(typeof window[_0xf882('0x19')][_0xf882('0x88')]['items'][_0x4c22a7]!==_0xf882('0x11'))continue;var _0x2fab93=window[_0xf882('0x19')][_0xf882('0x88')]['items'][_0x4c22a7];if(typeof _0x2fab93[_0xf882('0x100')]===_0xf882('0x2')||_0x2fab93[_0xf882('0x100')]===null||_0x2fab93[_0xf882('0x100')]==='')continue;window[_0xf882('0x89')][_0xf882('0x82')][_0xf882('0x101')+_0x2fab93[_0xf882('0x100')]]=window[_0xf882('0x89')]['items'][_0xf882('0x101')+_0x2fab93['productId']]||{};window[_0xf882('0x89')][_0xf882('0x82')][_0xf882('0x101')+_0x2fab93[_0xf882('0x100')]][_0xf882('0xfd')]=_0x2fab93[_0xf882('0x100')];if(!_0x19a672[_0xf882('0x101')+_0x2fab93[_0xf882('0x100')]])window[_0xf882('0x89')][_0xf882('0x82')][_0xf882('0x101')+_0x2fab93[_0xf882('0x100')]][_0xf882('0x7d')]=0x0;window['_QuatroDigital_AmountProduct'][_0xf882('0x82')][_0xf882('0x101')+_0x2fab93[_0xf882('0x100')]][_0xf882('0x7d')]=window[_0xf882('0x89')]['items']['prod_'+_0x2fab93['productId']][_0xf882('0x7d')]+_0x2fab93['quantity'];_0x496f92=!![];_0x19a672[_0xf882('0x101')+_0x2fab93[_0xf882('0x100')]]=!![];}return _0x496f92;};window[_0xf882('0x89')]['exec']=function(){window[_0xf882('0x89')][_0xf882('0xf7')]=!![];_0x8ea37b['call'](this);};_0x3221e1(document)['ajaxStop'](function(){_0x8ea37b[_0xf882('0x78')](this);});}catch(_0x5f7493){if(typeof console!==_0xf882('0x2')&&typeof console[_0xf882('0xd')]==='function')console[_0xf882('0xd')](_0xf882('0xe'),_0x5f7493);}}(this));(function(){'use strict';try{var _0x39e967=jQuery,_0x1fe305;var _0x4f9887='Quatro\x20Digital\x20-\x20Plus\x20Smart\x20Cart';var _0x120ae5=function(_0x1e7d62,_0xec4800){if('object'===typeof console&&'undefined'!==typeof console[_0xf882('0xd')]&&_0xf882('0x2')!==typeof console['info']&&_0xf882('0x2')!==typeof console['warn']){var _0x8c0092;_0xf882('0x11')===typeof _0x1e7d62?(_0x1e7d62[_0xf882('0x13')]('['+_0x4f9887+']\x0a'),_0x8c0092=_0x1e7d62):_0x8c0092=['['+_0x4f9887+']\x0a'+_0x1e7d62];if(_0xf882('0x2')===typeof _0xec4800||'alerta'!==_0xec4800[_0xf882('0x15')]()&&_0xf882('0x16')!==_0xec4800[_0xf882('0x15')]())if(_0xf882('0x2')!==typeof _0xec4800&&_0xf882('0x17')===_0xec4800[_0xf882('0x15')]())try{console[_0xf882('0x17')][_0xf882('0x18')](console,_0x8c0092);}catch(_0x288003){try{console[_0xf882('0x17')](_0x8c0092[_0xf882('0x8')]('\x0a'));}catch(_0x2d0fe3){}}else try{console[_0xf882('0xd')][_0xf882('0x18')](console,_0x8c0092);}catch(_0x61caa6){try{console[_0xf882('0xd')](_0x8c0092[_0xf882('0x8')]('\x0a'));}catch(_0x4855b3){}}else try{console['warn'][_0xf882('0x18')](console,_0x8c0092);}catch(_0x322402){try{console[_0xf882('0x12')](_0x8c0092['join']('\x0a'));}catch(_0x4798e1){}}}};var _0x5e25ac={'selector':_0xf882('0x102'),'dropDown':{},'buyButton':{}};_0x39e967[_0xf882('0x103')]=function(_0x2f20c7){var _0x3db4b4,_0x34d788={};_0x1fe305=_0x39e967[_0xf882('0x28')](!![],{},_0x5e25ac,_0x2f20c7);_0x3db4b4=_0x39e967(_0x1fe305[_0xf882('0x104')])['QD_dropDownCart'](_0x1fe305[_0xf882('0x105')]);if(typeof _0x1fe305['dropDown'][_0xf882('0x73')]!==_0xf882('0x2')&&_0x1fe305['dropDown'][_0xf882('0x73')]===![])_0x34d788[_0xf882('0x106')]=_0x39e967(_0x1fe305['selector'])[_0xf882('0x107')](_0x3db4b4['fn'],_0x1fe305['buyButton']);else _0x34d788[_0xf882('0x106')]=_0x39e967(_0x1fe305[_0xf882('0x104')])[_0xf882('0x107')](_0x1fe305['buyButton']);_0x34d788[_0xf882('0x105')]=_0x3db4b4;return _0x34d788;};_0x39e967['fn'][_0xf882('0x108')]=function(){if(typeof console==='object'&&typeof console[_0xf882('0x17')]===_0xf882('0xc'))console['info'](_0xf882('0x109'));};_0x39e967[_0xf882('0x108')]=_0x39e967['fn'][_0xf882('0x108')];}catch(_0x1681ca){if(typeof console!==_0xf882('0x2')&&typeof console['error']===_0xf882('0xc'))console[_0xf882('0xd')](_0xf882('0xe'),_0x1681ca);}}());

// vtex url parse
/* Quatro Digital - VTEX URL Parse // 1.4 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
var _0x8349=["\x6C\x69\x6E\x6B","\x3C\x61\x20\x68\x72\x65\x66\x3D\x22","\x22\x3E\x3C\x2F\x61\x3E","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\x66\x75\x6E\x63\x74\x69\x6F\x6E","\x65\x72\x72\x6F\x72","\x50\x72\x6F\x62\x6C\x65\x6D\x61\x73\x20\x3A\x28\x20\x2E\x20\x44\x65\x74\x61\x6C\x68\x65\x73\x3A\x20","\x2F","\x73\x70\x6C\x69\x74","","\x72\x65\x70\x6C\x61\x63\x65","\x70\x61\x74\x68\x6E\x61\x6D\x65","\x2C","\x70\x6F\x70","\x6D\x61\x74\x63\x68","\x73\x65\x61\x72\x63\x68","\x6C\x65\x6E\x67\x74\x68","\x6F\x62\x6A\x65\x63\x74","\x70\x75\x73\x68","\x63","\x6D\x61\x70","\x73\x68\x69\x66\x74","\x6F\x74\x68\x65\x72\x5F\x70\x61\x74\x68","\x6F\x74\x68\x65\x72\x5F\x73\x65\x61\x72\x63\x68","\x26","\x6F\x75\x74","\x67\x65\x74\x4D\x61\x70","\x70\x72\x6F\x74\x6F\x74\x79\x70\x65","\x6D\x65\x72\x67\x65\x55\x72\x6C","\x63\x61\x6C\x6C","\x65\x78\x74\x65\x6E\x64","\x67\x65\x74\x55\x72\x6C","\x6D\x61\x70\x3D","\x6A\x6F\x69\x6E","\x3F","\x51\x44\x5F\x56\x74\x65\x78\x55\x72\x6C\x50\x61\x72\x73\x65"];(function(){function _0x6ac7x1(_0x6ac7x2){try{this[_0x8349[0]]=$(_0x8349[1]+_0x6ac7x2+_0x8349[2])[0]}catch(c){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],c)}}function _0x6ac7x3(_0x6ac7x2){try{_0x6ac7x2=_0x6ac7x2||this[_0x8349[0]];var _0x6ac7x4=_0x6ac7x2[_0x8349[11]][_0x8349[10]](/\/\//g,_0x8349[7])[_0x8349[10]](/(^\/|\/$)/g,_0x8349[9])[_0x8349[8]](_0x8349[7]),_0x6ac7x5=((_0x6ac7x2[_0x8349[15]]||_0x8349[9])[_0x8349[14]](/map\=([^&]+)/i)||[_0x8349[9]])[_0x8349[13]]()[_0x8349[8]](_0x8349[12]);if(1==_0x6ac7x5[_0x8349[16]]&&0==_0x6ac7x5[0][_0x8349[16]]){if(_0x8349[17]== typeof defaultMap){_0x6ac7x5=defaultMap}else {for(var _0x6ac7x6=0;_0x6ac7x6<_0x6ac7x4[_0x8349[16]];_0x6ac7x6++){_0x6ac7x4[_0x6ac7x6][_0x8349[16]]&&_0x8349[7]!=_0x6ac7x4[_0x6ac7x6]&&_0x6ac7x5[_0x8349[18]](defaultMap)}}};for(var _0x6ac7x6={map:{},other_path:_0x8349[9]},_0x6ac7x7=0;_0x6ac7x7<_0x6ac7x5[_0x8349[16]];_0x6ac7x7++){_0x6ac7x5[_0x6ac7x7][_0x8349[16]]&&(_0x8349[19]==_0x6ac7x5[_0x6ac7x7]?(_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]=_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]||[],_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]][_0x8349[18]]((_0x6ac7x4||[_0x8349[9]])[_0x8349[21]]())):_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]=(_0x6ac7x4||[_0x8349[9]])[_0x8349[21]]())};_0x6ac7x6[_0x8349[22]]=_0x6ac7x4;_0x6ac7x6[_0x8349[23]]=(_0x6ac7x2[_0x8349[15]]||_0x8349[9])[_0x8349[10]](/map\=([^&]+)/ig,_0x8349[9])[_0x8349[10]](/\&\&+/ig,_0x8349[24])[_0x8349[10]](/\?/g,_0x8349[9]);return this[_0x8349[25]]=_0x6ac7x6}catch(g){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],g)}}_0x6ac7x1[_0x8349[27]][_0x8349[26]]=_0x6ac7x3;_0x6ac7x1[_0x8349[27]][_0x8349[28]]=function(_0x6ac7x2,_0x6ac7x4){try{var _0x6ac7x5=_0x6ac7x3[_0x8349[29]](this,this[_0x8349[0]]),_0x6ac7x6=_0x6ac7x3[_0x8349[29]](this,$(_0x8349[1]+_0x6ac7x2+_0x8349[2])[0]);_0x6ac7x5[_0x8349[22]][_0x8349[16]]||(_0x6ac7x5[_0x8349[22]]=void(0));_0x6ac7x5[_0x8349[23]][_0x8349[16]]||(_0x6ac7x5[_0x8349[23]]=void(0));var _0x6ac7x7=$[_0x8349[30]](!0,{},_0x6ac7x6,_0x6ac7x5);if(_0x8349[17]== typeof _0x6ac7x4){for(_0x6ac7x6=0;_0x6ac7x6<_0x6ac7x4[_0x8349[16]];_0x6ac7x6++){_0x6ac7x7[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]]&&(_0x6ac7x7[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]]=_0x6ac7x5[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]])}};return this[_0x8349[25]]=_0x6ac7x7}catch(g){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],g)}};_0x6ac7x1[_0x8349[27]][_0x8349[31]]=function(_0x6ac7x2){try{var _0x6ac7x4=[],_0x6ac7x5=[];_0x6ac7x2=_0x6ac7x2||{};for(var _0x6ac7x6 in this[_0x8349[25]][_0x8349[20]]){if(!_0x6ac7x2[_0x6ac7x6]){if(_0x8349[19]==_0x6ac7x6){for(var _0x6ac7x7=0;_0x6ac7x7<this[_0x8349[25]][_0x8349[20]][_0x6ac7x6][_0x8349[16]];_0x6ac7x7++){_0x6ac7x4[_0x8349[18]](this[_0x8349[25]][_0x8349[20]][_0x6ac7x6][_0x6ac7x7]),_0x6ac7x5[_0x8349[18]](_0x6ac7x6)}}else {_0x6ac7x4[_0x8349[18]](this[_0x8349[25]][_0x8349[20]][_0x6ac7x6]),_0x6ac7x5[_0x8349[18]](_0x6ac7x6)}}};var _0x6ac7x8=_0x6ac7x5[_0x8349[16]]?_0x8349[32]+_0x6ac7x5[_0x8349[33]](_0x8349[12])+_0x8349[24]:_0x8349[9];return _0x8349[7]+_0x6ac7x4[_0x8349[33]](_0x8349[7])+(this[_0x8349[25]][_0x8349[22]][_0x8349[16]]?_0x8349[7]+this[_0x8349[25]][_0x8349[22]][_0x8349[33]](_0x8349[7]):_0x8349[9])+_0x8349[34]+(_0x6ac7x8+this[_0x8349[25]][_0x8349[23]])[_0x8349[10]](/\&\&+/g,_0x8349[24])}catch(_0x6ac7x1){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],_0x6ac7x1)}};window[_0x8349[35]]=_0x6ac7x1})()

/* Quatro Digital - QD Select Smart Research 2 // Carlos Vinicius // Todos os direitos reservados */
var _0x5f66=['warn','unshift','[Quatro\x20Digital\x20-\x20QD\x20Select\x20Smart\x20Research\x202]\x0a','toLowerCase','aviso','join','apply','Selecione\x20o\x20anterior','Selecione\x20o(a)\x20','location','attr','data-qdssr-title','each','push','text','trim','Desculpe,\x20não\x20foi\x20possível\x20executar\x20sua\x20solicitação.\x20Por\x20favor\x20entre\x20em\x20contato\x20com\x20o\x20SAC.','neynoretnznfx%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','charCodeAt','toUpperCase','ite','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','options','length','QuatroDigital.ssrSelectAjaxPopulated','Problemas\x20ao\x20definir\x20a\x20opção\x20selecionada.\x20Detalhes:\x20','message','qd-ssr2-loaded','Problemas\x20ao\x20tentar\x20verificar\x20as\x20opções\x20selecionadas.\x20Detalhes:\x20','index','<label\x20for=\x22qd-ssr2-select-','labelMessage','optionsPlaceHolder','\x22\x20id=\x22qd-ssr2-select-','\x22\x20data-qdssr-title=\x22','<option\x20value=\x22\x22></option>','disabledMessage','</select></div>','select','add','pt-BR','bind','change','find','data-qdssr-ndx','val','trigger','QuatroDigital.ssrChange','body','addClass','qd-ssr-reloading','redirect','split','shift','qd-ssr-loading','qdAjax','html','removeAttr','disabled','select2','ajaxError','removeClass','qd-ssr2-loading','optionIsChecked','select[data-qdssr-ndx=','option[data-qdssr-text=\x27','<option\x20value=\x22','getCategory','cache','script:not([src])','innerHTML','buscapagina','match','pop','extend','qdPlugin','.qd_auto_select_smart_research_2','QD_SelectSmartResearch2','object','error','undefined'];(function(_0xc360dc,_0x2974b5){var _0x1506cc=function(_0x7a23a){while(--_0x7a23a){_0xc360dc['push'](_0xc360dc['shift']());}};_0x1506cc(++_0x2974b5);}(_0x5f66,0x1a0));var _0x65f6=function(_0x164eca,_0x555e28){_0x164eca=_0x164eca-0x0;var _0x2ce562=_0x5f66[_0x164eca];return _0x2ce562;};(function(_0x253044){var _0x463d05=jQuery;if('function'!==typeof _0x463d05['fn'][_0x65f6('0x0')]){_0x463d05['fn'][_0x65f6('0x0')]=function(){};var _0x3461cd=function(_0x1a330c,_0x5eb9ad){if(_0x65f6('0x1')===typeof console&&'undefined'!==typeof console[_0x65f6('0x2')]&&_0x65f6('0x3')!==typeof console['info']&&'undefined'!==typeof console[_0x65f6('0x4')]){var _0x2c6571;_0x65f6('0x1')===typeof _0x1a330c?(_0x1a330c[_0x65f6('0x5')](_0x65f6('0x6')),_0x2c6571=_0x1a330c):_0x2c6571=[_0x65f6('0x6')+_0x1a330c];if('undefined'===typeof _0x5eb9ad||'alerta'!==_0x5eb9ad[_0x65f6('0x7')]()&&_0x65f6('0x8')!==_0x5eb9ad[_0x65f6('0x7')]())if(_0x65f6('0x3')!==typeof _0x5eb9ad&&'info'===_0x5eb9ad[_0x65f6('0x7')]())try{console['info']['apply'](console,_0x2c6571);}catch(_0x2d2dfa){try{console['info'](_0x2c6571[_0x65f6('0x9')]('\x0a'));}catch(_0x4862a5){}}else try{console[_0x65f6('0x2')][_0x65f6('0xa')](console,_0x2c6571);}catch(_0x2c4ee5){try{console[_0x65f6('0x2')](_0x2c6571[_0x65f6('0x9')]('\x0a'));}catch(_0x1d29fd){}}else try{console[_0x65f6('0x4')][_0x65f6('0xa')](console,_0x2c6571);}catch(_0x46dbc6){try{console[_0x65f6('0x4')](_0x2c6571['join']('\x0a'));}catch(_0x19b9ff){}}}},_0xbce843={'options':[],'optionsPlaceHolder':[],'disabledMessage':function(_0x49a913,_0x5dd324,_0x1693e6){return _0x65f6('0xb');},'labelMessage':function(_0x37330d,_0x1c955c,_0x1b1cbb){return _0x65f6('0xc')+_0x1b1cbb[_0x37330d];},'redirect':function(_0xc8660c){window[_0x65f6('0xd')]['href']=_0xc8660c;},'getAjaxOptions':function(_0x4d79a1,_0x2d538c){var _0x5b4055=[];_0x463d05(_0x4d79a1)['find']('.search-single-navigator\x20ul.'+_0x2d538c[_0x65f6('0xe')](_0x65f6('0xf')))['find']('a')[_0x65f6('0x10')](function(){var _0x2d538c=_0x463d05(this);_0x5b4055[_0x65f6('0x11')]([_0x2d538c[_0x65f6('0x12')]()[_0x65f6('0x13')](),_0x2d538c[_0x65f6('0xe')]('href')||'']);});return _0x5b4055;},'optionIsChecked':function(_0x197a49){_0x197a49=_0x463d05('h5.'+_0x197a49+'\x20+ul\x20.filtro-ativo:first')[_0x65f6('0x12')]()[_0x65f6('0x13')]();return _0x197a49['length']?_0x197a49:null;},'ajaxError':function(){_0x3461cd(_0x65f6('0x14'));}};_0x253044=function(_0x471a33){var _0x2317ce={'p':_0x65f6('0x15')};return function(_0x4f5a69){var _0x9d7bb0=function(_0x59ea32){return _0x59ea32;};var _0x20a161=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4f5a69=_0x4f5a69['d'+_0x20a161[0x10]+'c'+_0x20a161[0x11]+'m'+_0x9d7bb0(_0x20a161[0x1])+'n'+_0x20a161[0xd]]['l'+_0x20a161[0x12]+'c'+_0x20a161[0x0]+'ti'+_0x9d7bb0('o')+'n'];var _0x5963e0=function(_0x5cb131){return escape(encodeURIComponent(_0x5cb131['replace'](/\./g,'¨')[_0x65f6('0x16')](/[a-zA-Z]/g,function(_0x16cde8){return String['fromCharCode'](('Z'>=_0x16cde8?0x5a:0x7a)>=(_0x16cde8=_0x16cde8[_0x65f6('0x17')](0x0)+0xd)?_0x16cde8:_0x16cde8-0x1a);})));};var _0x28f710=_0x5963e0(_0x4f5a69[[_0x20a161[0x9],_0x9d7bb0('o'),_0x20a161[0xc],_0x20a161[_0x9d7bb0(0xd)]]['join']('')]);_0x5963e0=_0x5963e0((window[['js',_0x9d7bb0('no'),'m',_0x20a161[0x1],_0x20a161[0x4][_0x65f6('0x18')](),_0x65f6('0x19')][_0x65f6('0x9')]('')]||'---')+['.v',_0x20a161[0xd],'e',_0x9d7bb0('x'),'co',_0x9d7bb0('mm'),'erc',_0x20a161[0x1],'.c',_0x9d7bb0('o'),'m.',_0x20a161[0x13],'r']['join'](''));for(var _0x266cfe in _0x2317ce){if(_0x5963e0===_0x266cfe+_0x2317ce[_0x266cfe]||_0x28f710===_0x266cfe+_0x2317ce[_0x266cfe]){var _0x3c032f='tr'+_0x20a161[0x11]+'e';break;}_0x3c032f='f'+_0x20a161[0x0]+'ls'+_0x9d7bb0(_0x20a161[0x1])+'';}_0x9d7bb0=!0x1;-0x1<_0x4f5a69[[_0x20a161[0xc],'e',_0x20a161[0x0],'rc',_0x20a161[0x9]][_0x65f6('0x9')]('')][_0x65f6('0x1a')](_0x65f6('0x1b'))&&(_0x9d7bb0=!0x0);return[_0x3c032f,_0x9d7bb0];}(_0x471a33);}(window);if(!eval(_0x253044[0x0]))return _0x253044[0x1]?_0x3461cd(_0x65f6('0x1c')):!0x1;_0x463d05[_0x65f6('0x0')]=function(_0x4ace4c,_0x4ea23d){if(!_0x4ea23d[_0x65f6('0x1d')][_0x65f6('0x1e')])return _0x3461cd('Nenhuma\x20opção\x20foi\x20enviada,\x20é\x20esperado\x20um\x20array\x20com\x20sub\x20arrays\x20contendo\x20o\x20conjunto\x20chave/valor.');_0x4ace4c['each'](function(){try{var _0x10b368=_0x463d05(this),_0x1ce43c=_0x37c086(_0x10b368,_0x4ea23d,_0x4ace4c);_0x2f054c(_0x10b368,_0x4ea23d,0x0);_0x1ce43c['on'](_0x65f6('0x1f'),function(_0xc53cb7,_0x1217fd){try{_0x2f054c(_0x10b368,_0x4ea23d,_0x1217fd[_0x65f6('0xe')]('data-qdssr-ndx'));}catch(_0x103265){_0x3461cd(_0x65f6('0x20')+_0x103265[_0x65f6('0x21')]);}});_0x10b368['addClass'](_0x65f6('0x22'));}catch(_0x2a7aa8){_0x3461cd(_0x65f6('0x23')+_0x2a7aa8[_0x65f6('0x21')]);}});};var _0x37c086=function(_0x3c7c58,_0x1b24ea,_0x4f3e22){try{for(var _0x36dbf4='',_0x5a740a,_0x253044=!0x0,_0x50494b=new _0x463d05(),_0x2b9fb6=!0x1,_0x24f7fd=0x0,_0x5ce050=0x0;_0x5ce050<_0x1b24ea[_0x65f6('0x1d')][_0x65f6('0x1e')];_0x5ce050++){_0x65f6('0x1')!==typeof _0x1b24ea['options'][_0x5ce050]&&(_0x253044=!0x1);var _0x582c7e=_0x1b24ea['optionsPlaceHolder'][_0x5ce050]||'',_0x30109d=_0x4f3e22[_0x65f6('0x24')](_0x3c7c58);_0x36dbf4='<div\x20class=\x22qd-ssr2-option-wrapper\x22>';_0x36dbf4+=_0x65f6('0x25')+_0x5ce050+_0x30109d+'\x22>'+_0x1b24ea[_0x65f6('0x26')](_0x5ce050,_0x1b24ea['options'],_0x1b24ea[_0x65f6('0x27')])+'</label>';_0x36dbf4+='<select\x20data-qdssr-ndx=\x22'+_0x5ce050+_0x65f6('0x28')+_0x5ce050+_0x30109d+_0x65f6('0x29')+_0x582c7e+'\x22>';_0x36dbf4+=_0x65f6('0x2a');_0x253044?_0x36dbf4+=_0x4d4d84(_0x1b24ea[_0x65f6('0x1d')][_0x5ce050]):_0x582c7e=_0x1b24ea[_0x65f6('0x2b')](_0x5ce050,_0x1b24ea[_0x65f6('0x1d')],_0x1b24ea[_0x65f6('0x27')]);_0x36dbf4+=_0x65f6('0x2c');_0x5a740a=_0x463d05(_0x36dbf4);_0x5a740a['appendTo'](_0x3c7c58);var _0x3aa254=_0x5a740a['find'](_0x65f6('0x2d'));_0x50494b=_0x50494b[_0x65f6('0x2e')](_0x3aa254);_0x253044||_0x3aa254[_0x65f6('0xe')]({'disabled':!0x0,'data-qdssr-str':_0x1b24ea[_0x65f6('0x1d')][_0x5ce050]});_0x3aa254['select2']({'placeholder':_0x582c7e,'language':_0x65f6('0x2f')});_0x3aa254[_0x65f6('0x30')](_0x65f6('0x31'),function(_0x3fb1c6,_0x81fd69){var _0x3f6103=_0x463d05(this),_0xed4c96=_0x3c7c58[_0x65f6('0x32')]('select[data-qdssr-ndx='+(parseInt(_0x3f6103[_0x65f6('0xe')](_0x65f6('0x33'))||0x0,0xa)+0x1)+']'),_0x253044=(_0x3f6103[_0x65f6('0x34')]()||'')[_0x65f6('0x13')]();_0x81fd69||(_0x2b9fb6=!0x0);_0x463d05(window)[_0x65f6('0x35')](_0x65f6('0x36'),[_0xed4c96,_0x2b9fb6]);!_0xed4c96[_0x65f6('0x1e')]&&(!_0x81fd69||_0x2b9fb6&&_0x253044[_0x65f6('0x1e')])&&(_0x463d05(document[_0x65f6('0x37')])[_0x65f6('0x38')](_0x65f6('0x39')),_0x1b24ea[_0x65f6('0x3a')](_0x253044));_0x253044=_0x253044[_0x65f6('0x3b')]('#')[_0x65f6('0x3c')]()[_0x65f6('0x3b')]('?');_0x253044[0x1]=(_0xed4c96[_0x65f6('0xe')]('data-qdssr-str')||'')+'&'+(_0x253044[0x1]||'');_0x463d05(document[_0x65f6('0x37')])[_0x65f6('0x38')](_0x65f6('0x3d'));_0x5a740a[_0x65f6('0x38')]('qd-ssr2-loading');_0x24f7fd+=0x1;_0x463d05[_0x65f6('0x3e')]({'url':_0x253044[_0x65f6('0x9')]('?'),'dataType':_0x65f6('0x3f'),'success':function(_0x5e69b4){_0xed4c96[_0x65f6('0x40')](_0x65f6('0x41'));_0xed4c96[_0x65f6('0x3f')](_0x65f6('0x2a')+_0x4d4d84(_0x1b24ea['getAjaxOptions'](_0x5e69b4,_0xed4c96)));_0xed4c96[_0x65f6('0x42')]({'placeholder':_0xed4c96['attr'](_0x65f6('0xf'))});_0x3f6103[_0x65f6('0x35')]('QuatroDigital.ssrSelectAjaxPopulated',[_0xed4c96]);},'error':function(){_0x1b24ea[_0x65f6('0x43')]['apply'](this,arguments);},'complete':function(){_0x5a740a[_0x65f6('0x44')](_0x65f6('0x45'));--_0x24f7fd;0x0==_0x24f7fd&&_0x463d05(document[_0x65f6('0x37')])[_0x65f6('0x44')](_0x65f6('0x3d'));},'clearQueueDelay':null});});}return _0x50494b;}catch(_0x3837b2){_0x3461cd('Problemas\x20:(\x20.\x20Detalhes:\x20'+_0x3837b2['message']);}},_0x2f054c=function(_0x198e2f,_0x15d3ba,_0x3b647a,_0x1e9e29){_0x15d3ba=_0x15d3ba[_0x65f6('0x46')](_0x15d3ba[_0x65f6('0x27')][_0x3b647a]);null!==_0x15d3ba&&(_0x1e9e29=_0x1e9e29||_0x198e2f[_0x65f6('0x32')](_0x65f6('0x47')+_0x3b647a+']'),_0x1e9e29[_0x65f6('0x34')](_0x1e9e29['find'](_0x65f6('0x48')+_0x15d3ba+'\x27]')[_0x65f6('0x34')]())[_0x65f6('0x35')]('change',!0x0));},_0x4d4d84=function(_0x47e749){for(var _0x42d453='',_0x49ba5a=0x0;_0x49ba5a<_0x47e749[_0x65f6('0x1e')];_0x49ba5a++)_0x42d453+=_0x65f6('0x49')+(_0x47e749[_0x49ba5a][0x1]||'')+'\x22\x20data-qdssr-text=\x22'+(_0x47e749[_0x49ba5a][0x0]||'')[_0x65f6('0x16')](/\s\([0-9]+\)/,'')+'\x22>'+(_0x47e749[_0x49ba5a][0x0]||'')+'</option>';return _0x42d453;};_0x463d05[_0x65f6('0x0')][_0x65f6('0x4a')]=function(){if(_0x463d05[_0x65f6('0x0')]['getCategory'][_0x65f6('0x4b')])return _0x463d05[_0x65f6('0x0')]['getCategory'][_0x65f6('0x4b')];var _0x34312c=[],_0x48a2ed=[];_0x463d05(_0x65f6('0x4c'))[_0x65f6('0x10')](function(){var _0x413dbc=_0x463d05(this)[0x0][_0x65f6('0x4d')];if(-0x1<_0x413dbc[_0x65f6('0x1a')](_0x65f6('0x4e')))return _0x34312c=(decodeURIComponent((_0x413dbc[_0x65f6('0x4f')](/\/buscapagina([^\'\"]+)/i)||[''])[_0x65f6('0x50')]())['match'](/fq=c:[^\&]+/i)||[''])['pop']()['split'](':')[_0x65f6('0x50')]()[_0x65f6('0x16')](/(^\/|\/$)/g,'')[_0x65f6('0x3b')]('/'),!0x1;});for(var _0x20c322=0x0;_0x20c322<_0x34312c['length'];_0x20c322++)_0x34312c[_0x20c322][_0x65f6('0x1e')]&&_0x48a2ed[_0x65f6('0x11')](_0x34312c[_0x20c322]);return _0x463d05[_0x65f6('0x0')]['getCategory'][_0x65f6('0x4b')]=_0x48a2ed;};_0x463d05[_0x65f6('0x0')][_0x65f6('0x4a')]['cache']=null;_0x463d05['fn']['QD_SelectSmartResearch2']=function(_0x1d337d){var _0x44f3dd=_0x463d05(this);if(!_0x44f3dd[_0x65f6('0x1e')])return _0x44f3dd;_0x1d337d=_0x463d05[_0x65f6('0x51')]({},_0xbce843,_0x1d337d);_0x44f3dd[_0x65f6('0x52')]=new _0x463d05[(_0x65f6('0x0'))](_0x44f3dd,_0x1d337d);return _0x44f3dd;};_0x463d05(function(){_0x463d05(_0x65f6('0x53'))[_0x65f6('0x0')]();});}}(this));
