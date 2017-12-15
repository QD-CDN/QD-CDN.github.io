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
			$(".footer-qd-v1-facebook-likebox").html('<div class="fb-page" data-href="https://www.facebook.com/leandrini.loja" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/">Leandrini</a></blockquote></div></div>');
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
var _0xb4f8=['img[alt=\x27','.box-banner','clone','insertBefore','hide','text','[class*=\x27colunas\x27]','qd-am-content-loaded','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','url','ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','QD_amazingMenu','UL\x20do\x20menu\x20não\x20encontrada','alerta','li\x20>ul',':not(ul)','first','replaceSpecialChars','>li','qdAmAddNdx','qd-amazing-menu','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','children','qd-am-level-','qd-am-','-li','callback','QuatroDigital.am.callback','extend','exec','getParent','closest','function','/qd-amazing-menu','QD\x20Amazing\x20Menu','object','error','undefined','warn','unshift','toLowerCase','aviso','info','apply','join','addClass','qd-am-li-','qd-am-last','replace','fromCharCode','charCodeAt','toUpperCase','---','erc','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','qd-am-banner-wrapper','parent','qd-am-collection-wrapper','each','find'];(function(_0x4046b9,_0x18be4e){var _0x2e6eec=function(_0x14d139){while(--_0x14d139){_0x4046b9['push'](_0x4046b9['shift']());}};_0x2e6eec(++_0x18be4e);}(_0xb4f8,0x6b));var _0x8b4f=function(_0x3a35f9,_0x2ed177){_0x3a35f9=_0x3a35f9-0x0;var _0x5d25ad=_0xb4f8[_0x3a35f9];return _0x5d25ad;};(function(_0x1ae14d){_0x1ae14d['fn'][_0x8b4f('0x0')]=_0x1ae14d['fn'][_0x8b4f('0x1')];}(jQuery));(function(_0x4ea954){'use strict';var _0x2b24fc,_0x50cb75,_0x4ac786,_0x28e838;_0x2b24fc=jQuery;if(typeof _0x2b24fc['fn']['QD_amazingMenu']===_0x8b4f('0x2'))return;_0x50cb75={'url':_0x8b4f('0x3'),'callback':function(){},'ajaxCallback':function(){}};var _0x5d7175=_0x8b4f('0x4');var _0x3a1e04=function(_0x56a4a5,_0x167c39){if(_0x8b4f('0x5')===typeof console&&'undefined'!==typeof console[_0x8b4f('0x6')]&&_0x8b4f('0x7')!==typeof console['info']&&_0x8b4f('0x7')!==typeof console[_0x8b4f('0x8')]){var _0x5c5648;'object'===typeof _0x56a4a5?(_0x56a4a5[_0x8b4f('0x9')]('['+_0x5d7175+']\x0a'),_0x5c5648=_0x56a4a5):_0x5c5648=['['+_0x5d7175+']\x0a'+_0x56a4a5];if('undefined'===typeof _0x167c39||'alerta'!==_0x167c39[_0x8b4f('0xa')]()&&_0x8b4f('0xb')!==_0x167c39[_0x8b4f('0xa')]())if(_0x8b4f('0x7')!==typeof _0x167c39&&_0x8b4f('0xc')===_0x167c39[_0x8b4f('0xa')]())try{console[_0x8b4f('0xc')][_0x8b4f('0xd')](console,_0x5c5648);}catch(_0x437529){try{console[_0x8b4f('0xc')](_0x5c5648[_0x8b4f('0xe')]('\x0a'));}catch(_0x29e85b){}}else try{console[_0x8b4f('0x6')][_0x8b4f('0xd')](console,_0x5c5648);}catch(_0x3591f7){try{console[_0x8b4f('0x6')](_0x5c5648[_0x8b4f('0xe')]('\x0a'));}catch(_0x1efe79){}}else try{console['warn'][_0x8b4f('0xd')](console,_0x5c5648);}catch(_0x3854e6){try{console[_0x8b4f('0x8')](_0x5c5648['join']('\x0a'));}catch(_0x283f26){}}}};_0x2b24fc['fn']['qdAmAddNdx']=function(){var _0x262d6c=_0x2b24fc(this);_0x262d6c['each'](function(_0x2f667d){_0x2b24fc(this)[_0x8b4f('0xf')](_0x8b4f('0x10')+_0x2f667d);});_0x262d6c['first']()['addClass']('qd-am-first');_0x262d6c['last']()[_0x8b4f('0xf')](_0x8b4f('0x11'));return _0x262d6c;};_0x2b24fc['fn']['QD_amazingMenu']=function(){};var _0x508d63=function(_0x3e8fcb){var _0x3c6f34={'y':'rnaqevavfgber%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x170fbb){var _0x158d17,_0x1fbe0e,_0xa707da,_0x5d3a05;_0x1fbe0e=function(_0x421c54){return _0x421c54;};_0xa707da=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x170fbb=_0x170fbb['d'+_0xa707da[0x10]+'c'+_0xa707da[0x11]+'m'+_0x1fbe0e(_0xa707da[0x1])+'n'+_0xa707da[0xd]]['l'+_0xa707da[0x12]+'c'+_0xa707da[0x0]+'ti'+_0x1fbe0e('o')+'n'];_0x158d17=function(_0x2d44ca){return escape(encodeURIComponent(_0x2d44ca[_0x8b4f('0x12')](/\./g,'¨')[_0x8b4f('0x12')](/[a-zA-Z]/g,function(_0x429376){return String[_0x8b4f('0x13')](('Z'>=_0x429376?0x5a:0x7a)>=(_0x429376=_0x429376[_0x8b4f('0x14')](0x0)+0xd)?_0x429376:_0x429376-0x1a);})));};var _0x3c093b=_0x158d17(_0x170fbb[[_0xa707da[0x9],_0x1fbe0e('o'),_0xa707da[0xc],_0xa707da[_0x1fbe0e(0xd)]][_0x8b4f('0xe')]('')]);_0x158d17=_0x158d17((window[['js',_0x1fbe0e('no'),'m',_0xa707da[0x1],_0xa707da[0x4][_0x8b4f('0x15')](),'ite'][_0x8b4f('0xe')]('')]||_0x8b4f('0x16'))+['.v',_0xa707da[0xd],'e',_0x1fbe0e('x'),'co',_0x1fbe0e('mm'),_0x8b4f('0x17'),_0xa707da[0x1],'.c',_0x1fbe0e('o'),'m.',_0xa707da[0x13],'r']['join'](''));for(var _0x1e364b in _0x3c6f34){if(_0x158d17===_0x1e364b+_0x3c6f34[_0x1e364b]||_0x3c093b===_0x1e364b+_0x3c6f34[_0x1e364b]){_0x5d3a05='tr'+_0xa707da[0x11]+'e';break;}_0x5d3a05='f'+_0xa707da[0x0]+'ls'+_0x1fbe0e(_0xa707da[0x1])+'';}_0x1fbe0e=!0x1;-0x1<_0x170fbb[[_0xa707da[0xc],'e',_0xa707da[0x0],'rc',_0xa707da[0x9]][_0x8b4f('0xe')]('')]['indexOf']('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x1fbe0e=!0x0);return[_0x5d3a05,_0x1fbe0e];}(_0x3e8fcb);}(window);if(!eval(_0x508d63[0x0]))return _0x508d63[0x1]?_0x3a1e04(_0x8b4f('0x18')):!0x1;_0x28e838=function(_0x41edaa){var _0x3efce1,_0xa17b93,_0x40c2b3;_0x40c2b3=_0x41edaa['find'](_0x8b4f('0x19'));_0x3efce1=_0x40c2b3[_0x8b4f('0x1a')](_0x8b4f('0x1b'));_0xa17b93=_0x40c2b3[_0x8b4f('0x1a')](_0x8b4f('0x1c'));if(!(_0x3efce1[_0x8b4f('0x1d')]||_0xa17b93[_0x8b4f('0x1d')]))return;_0x3efce1['parent']()[_0x8b4f('0xf')](_0x8b4f('0x1e'));_0xa17b93[_0x8b4f('0x1f')]()[_0x8b4f('0xf')](_0x8b4f('0x20'));_0x2b24fc['qdAjax']({'url':_0x4ac786['url'],'dataType':'html','success':function(_0x2dcc35){var _0x34c3f5=_0x2b24fc(_0x2dcc35);_0x3efce1[_0x8b4f('0x21')](function(){var _0x1157a6,_0x32902c;_0x32902c=_0x2b24fc(this);_0x1157a6=_0x34c3f5[_0x8b4f('0x22')](_0x8b4f('0x23')+_0x32902c['attr']('data-qdam-value')+'\x27]');if(!_0x1157a6[_0x8b4f('0x1d')])return;_0x1157a6[_0x8b4f('0x21')](function(){_0x2b24fc(this)[_0x8b4f('0x0')](_0x8b4f('0x24'))[_0x8b4f('0x25')]()[_0x8b4f('0x26')](_0x32902c);});_0x32902c[_0x8b4f('0x27')]();})[_0x8b4f('0xf')]('qd-am-content-loaded');_0xa17b93['each'](function(){var _0x2c1ed0={},_0x4d74e8;_0x4d74e8=_0x2b24fc(this);_0x34c3f5['find']('h2')[_0x8b4f('0x21')](function(){if(_0x2b24fc(this)[_0x8b4f('0x28')]()['trim']()['toLowerCase']()==_0x4d74e8['attr']('data-qdam-value')['trim']()['toLowerCase']()){_0x2c1ed0=_0x2b24fc(this);return![];}});if(!_0x2c1ed0[_0x8b4f('0x1d')])return;_0x2c1ed0[_0x8b4f('0x21')](function(){_0x2b24fc(this)['getParent'](_0x8b4f('0x29'))[_0x8b4f('0x25')]()['insertBefore'](_0x4d74e8);});_0x4d74e8[_0x8b4f('0x27')]();})[_0x8b4f('0xf')](_0x8b4f('0x2a'));},'error':function(){_0x3a1e04(_0x8b4f('0x2b')+_0x4ac786[_0x8b4f('0x2c')]+'\x27\x20falho.');},'complete':function(){_0x4ac786[_0x8b4f('0x2d')][_0x8b4f('0x2e')](this);_0x2b24fc(window)[_0x8b4f('0x2f')](_0x8b4f('0x30'),_0x41edaa);},'clearQueueDelay':0xbb8});};_0x2b24fc[_0x8b4f('0x31')]=function(_0x2911a2){var _0x2ea39a=_0x2911a2[_0x8b4f('0x22')]('ul[itemscope]')[_0x8b4f('0x21')](function(){var _0xd880f3,_0x4a06cb,_0x1c2e7e,_0x4caa46;_0xd880f3=_0x2b24fc(this);if(!_0xd880f3[_0x8b4f('0x1d')])return _0x3a1e04([_0x8b4f('0x32'),_0x2911a2],_0x8b4f('0x33'));_0xd880f3[_0x8b4f('0x22')](_0x8b4f('0x34'))[_0x8b4f('0x1f')]()[_0x8b4f('0xf')]('qd-am-has-ul');_0xd880f3[_0x8b4f('0x22')]('li')[_0x8b4f('0x21')](function(){var _0xf924d0=_0x2b24fc(this),_0xf5082d;_0xf5082d=_0xf924d0['children'](_0x8b4f('0x35'));if(!_0xf5082d[_0x8b4f('0x1d')])return;_0xf924d0[_0x8b4f('0xf')]('qd-am-elem-'+_0xf5082d[_0x8b4f('0x36')]()[_0x8b4f('0x28')]()['trim']()[_0x8b4f('0x37')]()['replace'](/\./g,'')[_0x8b4f('0x12')](/\s/g,'-')[_0x8b4f('0xa')]());});_0x4a06cb=_0xd880f3[_0x8b4f('0x22')](_0x8b4f('0x38'))[_0x8b4f('0x39')]();_0xd880f3[_0x8b4f('0xf')](_0x8b4f('0x3a'));_0x1c2e7e=_0x4a06cb[_0x8b4f('0x22')](_0x8b4f('0x3b'));_0x1c2e7e[_0x8b4f('0x21')](function(){var _0x1a2e44=_0x2b24fc(this),_0x2c6078;_0x2c6078=_0x1a2e44[_0x8b4f('0x22')](_0x8b4f('0x38'))[_0x8b4f('0x39')]()[_0x8b4f('0xf')](_0x8b4f('0x3c'));_0x1a2e44[_0x8b4f('0xf')](_0x8b4f('0x3d'));_0x1a2e44['parent']()['addClass'](_0x8b4f('0x3e'));});_0x1c2e7e[_0x8b4f('0xf')](_0x8b4f('0x3e'));var _0x54a330=0x0;var _0x202766=function(_0x552509){_0x54a330=_0x54a330+0x1;var _0x2fdea6=_0x552509[_0x8b4f('0x3f')]('li');var _0x23ad50=_0x2fdea6[_0x8b4f('0x3f')]('*');if(!_0x23ad50['length'])return;_0x23ad50[_0x8b4f('0xf')](_0x8b4f('0x40')+_0x54a330);_0x202766(_0x23ad50);};_0x202766(_0xd880f3);_0xd880f3['add'](_0xd880f3[_0x8b4f('0x22')]('ul'))['each'](function(){var _0x2909af=_0x2b24fc(this);_0x2909af[_0x8b4f('0xf')](_0x8b4f('0x41')+_0x2909af[_0x8b4f('0x3f')]('li')[_0x8b4f('0x1d')]+_0x8b4f('0x42'));});});_0x28e838(_0x2ea39a);_0x4ac786[_0x8b4f('0x43')][_0x8b4f('0x2e')](this);_0x2b24fc(window)[_0x8b4f('0x2f')](_0x8b4f('0x44'),_0x2911a2);};_0x2b24fc['fn'][_0x8b4f('0x31')]=function(_0x2c57d7){var _0x26e78d=_0x2b24fc(this);if(!_0x26e78d[_0x8b4f('0x1d')])return _0x26e78d;_0x4ac786=_0x2b24fc[_0x8b4f('0x45')]({},_0x50cb75,_0x2c57d7);_0x26e78d[_0x8b4f('0x46')]=new _0x2b24fc[(_0x8b4f('0x31'))](_0x2b24fc(this));return _0x26e78d;};_0x2b24fc(function(){_0x2b24fc('.qd_amazing_menu_auto')['QD_amazingMenu']();});}(this));

// smart cart
var _0xad89=['<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','texts','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','find','.qd-ddc-viewCart','linkCart','.qd_ddc_continueShopping','html','.qd-ddc-checkout','.qd-ddc-infoTotal','.qd-ddc-shipping','.qd-ddc-emptyCart\x20p','append','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','removeClass','qd-bb-lightBoxProdAdd','keyup.qd_ddc_closeFn','keyCode','body','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text','.qd-ddc-shipping\x20.qd-ddc-cep','val','keyup.qd_ddc_cep','.qd-ddc-shipping\x20.qd-ddc-cep-ok','click','.qd-ddc-cep-btn','preventDefault','toggle','.qd-ddc-cep-close','hide','off','click._QD_DDC_closeShipping','target','.qd-ddc-cep-ok','shippingCalculate','.qd-ddc-cep','updateOnlyHover','getCartInfoByUrl','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','call','.qd-ddc-infoTotalValue','total','qtt','.qd-ddc-infoAllTotal','renderProductsList','dataOptionsCache','.qd-ddc-wrapper','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','function','addClass','getOrderForm','totalizers','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22>','<div\x20class=\x22qd-ddc-prodImgWrapper\x22>','<img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/>','<span\x20class=\x22qd-ddc-imgLoading\x22></span>','</div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22>','<div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22>','<div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a>','<span\x20class=\x22qd-ddc-prodRowLoading\x22></span>','empty','items','attr','qd-ddc-','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','quantity','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-shipping\x20input','address','actionButtons','filter','[data-sku=\x27','lastSku','outerHeight','parent','qd-ddc-lastAdded','timeRemoveNewItemClass','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','forceImageHTTPS','string','http','https','qd-loaded','src','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku-index','changeQantity','data-sku','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','each','.qd-ddc-quantityMore','click.qd_ddc_more','.qd-ddc-quantity','.qd-ddc-quantityMinus','click.qd_ddc_minus','qd-loading','focusout.qd_ddc_change','keyup.qd_ddc_change','.qd-ddc-remove','slideUp','remove','formatCepField','data','qdDdcLastPostalCode','calculateShipping','done','.qd-ddc-cep-tooltip-text','.qd-dd-cep-slas','logisticsInfo','slas','<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>','shippingEstimate','\x20dia\x20útil','\x20dias\x20útéis','<td>\x20R$\x20','price','\x20para\x20o\x20CEP\x20','</td>','tbody','insertBefore','Não\x20foi\x20possível\x20calcular\x20o\x20frete','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','fail','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','boolean','removeProduct','removeItems','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','stop','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','Callback\x20não\x20é\x20uma\x20função','unshift','allowRecalculate','buyButtonClicked','quickViewUpdate','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','.qd-bap-wrapper','.qd-bap-qtt','prepend','productId','prod_','ajaxStop','Quatro\x20Digital\x20-\x20Plus\x20Smart\x20Cart','.qdDdcContainer','QD_smartCart','extend','selector','dropDown','buyButton','QD_buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','closest','abs','undefined','pow','round','split','replace','length','join','_QuatroDigital_CartData','callback','Callbacks','error','Oooops!\x20','message','Quatro\x20Digital\x20-\x20DropDown\x20Cart','object','info','warn','alerta','toLowerCase','aviso','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>','skuName','smartCheckout','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22>','<div\x20class=\x22qd_ddc_lightBoxClose\x22></div>','<div\x20class=\x22qd-ddc-wrapper3\x22>','<div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div>','<div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div>','<span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div>','<div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22>','<div\x20class=\x22qd-ddc-infoTotal\x22></div>','<div\x20class=\x22qd-ddc-infoBts\x22>','</div></div></div></div></div>','cartTotal','#value'];(function(_0x1417e9,_0x54e920){var _0x36d507=function(_0x42902f){while(--_0x42902f){_0x1417e9['push'](_0x1417e9['shift']());}};_0x36d507(++_0x54e920);}(_0xad89,0x1d3));var _0x9ad8=function(_0x2535ae,_0x802941){_0x2535ae=_0x2535ae-0x0;var _0x28ccb9=_0xad89[_0x2535ae];return _0x28ccb9;};(function(_0x4f06fd){_0x4f06fd['fn'][_0x9ad8('0x0')]=_0x4f06fd['fn'][_0x9ad8('0x1')];}(jQuery));function qd_number_format(_0xcb67e0,_0x254ac8,_0x9d17b6,_0x120aa3){_0xcb67e0=(_0xcb67e0+'')['replace'](/[^0-9+\-Ee.]/g,'');_0xcb67e0=isFinite(+_0xcb67e0)?+_0xcb67e0:0x0;_0x254ac8=isFinite(+_0x254ac8)?Math[_0x9ad8('0x2')](_0x254ac8):0x0;_0x120aa3='undefined'===typeof _0x120aa3?',':_0x120aa3;_0x9d17b6=_0x9ad8('0x3')===typeof _0x9d17b6?'.':_0x9d17b6;var _0x5e4252='',_0x5e4252=function(_0x4cfa93,_0x103562){var _0x254ac8=Math[_0x9ad8('0x4')](0xa,_0x103562);return''+(Math[_0x9ad8('0x5')](_0x4cfa93*_0x254ac8)/_0x254ac8)['toFixed'](_0x103562);},_0x5e4252=(_0x254ac8?_0x5e4252(_0xcb67e0,_0x254ac8):''+Math[_0x9ad8('0x5')](_0xcb67e0))[_0x9ad8('0x6')]('.');0x3<_0x5e4252[0x0]['length']&&(_0x5e4252[0x0]=_0x5e4252[0x0][_0x9ad8('0x7')](/\B(?=(?:\d{3})+(?!\d))/g,_0x120aa3));(_0x5e4252[0x1]||'')[_0x9ad8('0x8')]<_0x254ac8&&(_0x5e4252[0x1]=_0x5e4252[0x1]||'',_0x5e4252[0x1]+=Array(_0x254ac8-_0x5e4252[0x1]['length']+0x1)[_0x9ad8('0x9')]('0'));return _0x5e4252[_0x9ad8('0x9')](_0x9d17b6);};(function(){'use strict';try{window[_0x9ad8('0xa')]=window['_QuatroDigital_CartData']||{};window[_0x9ad8('0xa')][_0x9ad8('0xb')]=window[_0x9ad8('0xa')][_0x9ad8('0xb')]||$[_0x9ad8('0xc')]();}catch(_0x4386f9){if(typeof console!=='undefined'&&typeof console[_0x9ad8('0xd')]==='function')console[_0x9ad8('0xd')](_0x9ad8('0xe'),_0x4386f9[_0x9ad8('0xf')]);}}());(function(_0x5349ac){'use strict';try{var _0x13677f=jQuery;var _0x2f879a=_0x9ad8('0x10');var _0x49b84f=function(_0x1d107f,_0x34f9b4){if(_0x9ad8('0x11')===typeof console&&_0x9ad8('0x3')!==typeof console[_0x9ad8('0xd')]&&_0x9ad8('0x3')!==typeof console[_0x9ad8('0x12')]&&'undefined'!==typeof console[_0x9ad8('0x13')]){var _0x3982a3;'object'===typeof _0x1d107f?(_0x1d107f['unshift']('['+_0x2f879a+']\x0a'),_0x3982a3=_0x1d107f):_0x3982a3=['['+_0x2f879a+']\x0a'+_0x1d107f];if('undefined'===typeof _0x34f9b4||_0x9ad8('0x14')!==_0x34f9b4[_0x9ad8('0x15')]()&&_0x9ad8('0x16')!==_0x34f9b4[_0x9ad8('0x15')]())if(_0x9ad8('0x3')!==typeof _0x34f9b4&&_0x9ad8('0x12')===_0x34f9b4[_0x9ad8('0x15')]())try{console[_0x9ad8('0x12')]['apply'](console,_0x3982a3);}catch(_0x146b32){try{console[_0x9ad8('0x12')](_0x3982a3[_0x9ad8('0x9')]('\x0a'));}catch(_0x211f6d){}}else try{console[_0x9ad8('0xd')][_0x9ad8('0x17')](console,_0x3982a3);}catch(_0x1d7c0f){try{console[_0x9ad8('0xd')](_0x3982a3['join']('\x0a'));}catch(_0x37628d){}}else try{console['warn'][_0x9ad8('0x17')](console,_0x3982a3);}catch(_0x8db76c){try{console[_0x9ad8('0x13')](_0x3982a3[_0x9ad8('0x9')]('\x0a'));}catch(_0x2c0542){}}}};window[_0x9ad8('0x18')]=window[_0x9ad8('0x18')]||{};window['_QuatroDigital_DropDown'][_0x9ad8('0x19')]=!![];_0x13677f[_0x9ad8('0x1a')]=function(){};_0x13677f['fn']['QD_dropDownCart']=function(){return{'fn':new _0x13677f()};};var _0x39572b=function(_0x5cd0e4){var _0x202143={'y':'rnaqevavfgber%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x514c19){var _0x2ab0cd,_0x4532ad,_0x349848,_0x4cdf71;_0x4532ad=function(_0x2a0ab4){return _0x2a0ab4;};_0x349848=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x514c19=_0x514c19['d'+_0x349848[0x10]+'c'+_0x349848[0x11]+'m'+_0x4532ad(_0x349848[0x1])+'n'+_0x349848[0xd]]['l'+_0x349848[0x12]+'c'+_0x349848[0x0]+'ti'+_0x4532ad('o')+'n'];_0x2ab0cd=function(_0x1eeb78){return escape(encodeURIComponent(_0x1eeb78[_0x9ad8('0x7')](/\./g,'¨')[_0x9ad8('0x7')](/[a-zA-Z]/g,function(_0x85b6){return String[_0x9ad8('0x1b')](('Z'>=_0x85b6?0x5a:0x7a)>=(_0x85b6=_0x85b6[_0x9ad8('0x1c')](0x0)+0xd)?_0x85b6:_0x85b6-0x1a);})));};var _0x39c700=_0x2ab0cd(_0x514c19[[_0x349848[0x9],_0x4532ad('o'),_0x349848[0xc],_0x349848[_0x4532ad(0xd)]][_0x9ad8('0x9')]('')]);_0x2ab0cd=_0x2ab0cd((window[['js',_0x4532ad('no'),'m',_0x349848[0x1],_0x349848[0x4][_0x9ad8('0x1d')](),_0x9ad8('0x1e')][_0x9ad8('0x9')]('')]||_0x9ad8('0x1f'))+['.v',_0x349848[0xd],'e',_0x4532ad('x'),'co',_0x4532ad('mm'),_0x9ad8('0x20'),_0x349848[0x1],'.c',_0x4532ad('o'),'m.',_0x349848[0x13],'r']['join'](''));for(var _0x154d3d in _0x202143){if(_0x2ab0cd===_0x154d3d+_0x202143[_0x154d3d]||_0x39c700===_0x154d3d+_0x202143[_0x154d3d]){_0x4cdf71='tr'+_0x349848[0x11]+'e';break;}_0x4cdf71='f'+_0x349848[0x0]+'ls'+_0x4532ad(_0x349848[0x1])+'';}_0x4532ad=!0x1;-0x1<_0x514c19[[_0x349848[0xc],'e',_0x349848[0x0],'rc',_0x349848[0x9]][_0x9ad8('0x9')]('')][_0x9ad8('0x21')](_0x9ad8('0x22'))&&(_0x4532ad=!0x0);return[_0x4cdf71,_0x4532ad];}(_0x5cd0e4);}(window);if(!eval(_0x39572b[0x0]))return _0x39572b[0x1]?_0x49b84f(_0x9ad8('0x23')):!0x1;_0x13677f[_0x9ad8('0x1a')]=function(_0x1344dd,_0x4ca9ac){var _0x149c53,_0x41053,_0x5065a0,_0x3b3f8a,_0x18691e,_0x30a2fc,_0x18020a,_0x1b87b8,_0x22f2c2,_0x2887b1,_0x4a2c5e,_0x465213;_0x4a2c5e=_0x13677f(_0x1344dd);if(!_0x4a2c5e[_0x9ad8('0x8')])return _0x4a2c5e;_0x149c53={'updateOnlyHover':!![],'texts':{'linkCart':_0x9ad8('0x24'),'linkCheckout':'Finalizar\x20Compra','cartTotal':_0x9ad8('0x25'),'emptyCart':_0x9ad8('0x26'),'continueShopping':'Continuar\x20Comprando','shippingForm':_0x9ad8('0x27')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!![],'forceImageHTTPS':![],'skuName':function(_0x380d01){return _0x380d01[_0x9ad8('0x28')]||_0x380d01['name'];},'callback':function(){},'callbackProductsList':function(){}};_0x41053=_0x13677f['extend'](!![],{},_0x149c53,_0x4ca9ac);_0x5065a0=_0x13677f('');_0x2887b1=this;if(_0x41053[_0x9ad8('0x29')]){var _0x5770b0=![];if(typeof window[_0x9ad8('0x2a')]==='undefined'){_0x49b84f(_0x9ad8('0x2b'));_0x13677f[_0x9ad8('0x2c')]({'url':_0x9ad8('0x2d'),'async':![],'dataType':'script','error':function(){_0x49b84f('Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.');_0x5770b0=!![];}});}if(_0x5770b0)return _0x49b84f(_0x9ad8('0x2e'));}var _0x1d8cd5;if(typeof window['vtexjs']==='object'&&typeof window[_0x9ad8('0x2a')]['checkout']!==_0x9ad8('0x3'))_0x1d8cd5=window[_0x9ad8('0x2a')][_0x9ad8('0x2f')];else if(typeof vtex===_0x9ad8('0x11')&&typeof vtex[_0x9ad8('0x2f')]===_0x9ad8('0x11')&&typeof vtex[_0x9ad8('0x2f')]['SDK']!=='undefined')_0x1d8cd5=new vtex[(_0x9ad8('0x2f'))][(_0x9ad8('0x30'))]();else return _0x49b84f(_0x9ad8('0x31'));_0x2887b1[_0x9ad8('0x32')]=_0x9ad8('0x33')+'<div\x20class=\x22qd-ddc-wrapper2\x22>'+_0x9ad8('0x34')+_0x9ad8('0x35')+_0x9ad8('0x36')+_0x9ad8('0x37')+_0x9ad8('0x38')+_0x9ad8('0x39')+'<div\x20class=\x22qd-ddc-shipping\x22></div>'+_0x9ad8('0x3a')+_0x9ad8('0x3b')+'<a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a>'+_0x9ad8('0x3c');_0x30a2fc=function(_0x10dd80){var _0x5d61e7=_0x13677f(_0x10dd80);_0x41053['texts'][_0x9ad8('0x3d')]=_0x41053['texts'][_0x9ad8('0x3d')][_0x9ad8('0x7')](_0x9ad8('0x3e'),_0x9ad8('0x3f'));_0x41053[_0x9ad8('0x40')][_0x9ad8('0x3d')]=_0x41053[_0x9ad8('0x40')][_0x9ad8('0x3d')][_0x9ad8('0x7')](_0x9ad8('0x41'),_0x9ad8('0x42'));_0x41053[_0x9ad8('0x40')][_0x9ad8('0x3d')]=_0x41053[_0x9ad8('0x40')]['cartTotal'][_0x9ad8('0x7')]('#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>');_0x41053[_0x9ad8('0x40')][_0x9ad8('0x3d')]=_0x41053[_0x9ad8('0x40')][_0x9ad8('0x3d')]['replace'](_0x9ad8('0x43'),_0x9ad8('0x44'));_0x5d61e7[_0x9ad8('0x45')](_0x9ad8('0x46'))['html'](_0x41053['texts'][_0x9ad8('0x47')]);_0x5d61e7[_0x9ad8('0x45')](_0x9ad8('0x48'))[_0x9ad8('0x49')](_0x41053[_0x9ad8('0x40')]['continueShopping']);_0x5d61e7[_0x9ad8('0x45')](_0x9ad8('0x4a'))[_0x9ad8('0x49')](_0x41053[_0x9ad8('0x40')]['linkCheckout']);_0x5d61e7[_0x9ad8('0x45')](_0x9ad8('0x4b'))['html'](_0x41053[_0x9ad8('0x40')]['cartTotal']);_0x5d61e7[_0x9ad8('0x45')](_0x9ad8('0x4c'))[_0x9ad8('0x49')](_0x41053[_0x9ad8('0x40')]['shippingForm']);_0x5d61e7[_0x9ad8('0x45')](_0x9ad8('0x4d'))['html'](_0x41053[_0x9ad8('0x40')]['emptyCart']);return _0x5d61e7;};_0x18691e=function(_0x2073e3){_0x13677f(this)[_0x9ad8('0x4e')](_0x2073e3);_0x2073e3[_0x9ad8('0x45')](_0x9ad8('0x4f'))[_0x9ad8('0x50')](_0x13677f(_0x9ad8('0x51')))['on'](_0x9ad8('0x52'),function(){_0x4a2c5e[_0x9ad8('0x53')](_0x9ad8('0x54'));_0x13677f(document['body'])['removeClass']('qd-bb-lightBoxBodyProdAdd');});_0x13677f(document)['off'](_0x9ad8('0x55'))['on'](_0x9ad8('0x55'),function(_0x38284){if(_0x38284[_0x9ad8('0x56')]==0x1b){_0x4a2c5e['removeClass'](_0x9ad8('0x54'));_0x13677f(document[_0x9ad8('0x57')])['removeClass']('qd-bb-lightBoxBodyProdAdd');}});var _0x15609d=_0x2073e3[_0x9ad8('0x45')](_0x9ad8('0x58'));_0x2073e3[_0x9ad8('0x45')](_0x9ad8('0x59'))['on'](_0x9ad8('0x5a'),function(){_0x2887b1[_0x9ad8('0x5b')]('-',undefined,undefined,_0x15609d);return![];});_0x2073e3[_0x9ad8('0x45')](_0x9ad8('0x5c'))['on'](_0x9ad8('0x5d'),function(){_0x2887b1[_0x9ad8('0x5b')](undefined,undefined,undefined,_0x15609d);return![];});var _0x2077e3=_0x2073e3[_0x9ad8('0x45')](_0x9ad8('0x5e'));_0x2073e3[_0x9ad8('0x45')](_0x9ad8('0x5f'))[_0x9ad8('0x60')]('')['on'](_0x9ad8('0x61'),function(_0x3b30c0){_0x2887b1['formatCepField'](_0x13677f(this));if(_0x3b30c0[_0x9ad8('0x56')]==0xd)_0x2073e3[_0x9ad8('0x45')](_0x9ad8('0x62'))[_0x9ad8('0x63')]();});_0x2073e3[_0x9ad8('0x45')](_0x9ad8('0x64'))['click'](function(_0x5e7073){_0x5e7073[_0x9ad8('0x65')]();_0x2077e3[_0x9ad8('0x66')]();});_0x2073e3['find'](_0x9ad8('0x67'))['click'](function(_0x34df51){_0x34df51['preventDefault']();_0x2077e3[_0x9ad8('0x68')]();});_0x13677f(document)[_0x9ad8('0x69')](_0x9ad8('0x6a'))['on'](_0x9ad8('0x6a'),function(_0x55a671){if(_0x13677f(_0x55a671[_0x9ad8('0x6b')])[_0x9ad8('0x1')](_0x2073e3['find']('.qd-ddc-cep-tooltip'))[_0x9ad8('0x8')])return;_0x2077e3[_0x9ad8('0x68')]();});_0x2073e3['find'](_0x9ad8('0x6c'))[_0x9ad8('0x63')](function(_0x44c864){_0x44c864[_0x9ad8('0x65')]();_0x2887b1[_0x9ad8('0x6d')](_0x2073e3[_0x9ad8('0x45')](_0x9ad8('0x6e')));});if(_0x41053[_0x9ad8('0x6f')]){var _0x2deff9=0x0;_0x13677f(this)['on']('mouseenter.qd_ddc_hover',function(){var _0x2887bd=function(){if(!window['_QuatroDigital_DropDown'][_0x9ad8('0x19')])return;_0x2887b1[_0x9ad8('0x70')]();window['_QuatroDigital_DropDown'][_0x9ad8('0x19')]=![];_0x13677f['fn'][_0x9ad8('0x71')](!![]);_0x2887b1[_0x9ad8('0x72')]();};_0x2deff9=setInterval(function(){_0x2887bd();},0x258);_0x2887bd();});_0x13677f(this)['on'](_0x9ad8('0x73'),function(){clearInterval(_0x2deff9);});}};_0x18020a=_0x30a2fc(this[_0x9ad8('0x32')]);_0x1b87b8=0x0;_0x4a2c5e['each'](function(){if(_0x1b87b8>0x0)_0x18691e['call'](this,_0x18020a['clone']());else _0x18691e[_0x9ad8('0x74')](this,_0x18020a);_0x1b87b8++;});window['_QuatroDigital_CartData'][_0x9ad8('0xb')][_0x9ad8('0x50')](function(){_0x13677f(_0x9ad8('0x75'))[_0x9ad8('0x49')](window['_QuatroDigital_CartData'][_0x9ad8('0x76')]||'--');_0x13677f('.qd-ddc-infoTotalItems')[_0x9ad8('0x49')](window[_0x9ad8('0xa')][_0x9ad8('0x77')]||'0');_0x13677f('.qd-ddc-infoTotalShipping')[_0x9ad8('0x49')](window[_0x9ad8('0xa')]['shipping']||'--');_0x13677f(_0x9ad8('0x78'))[_0x9ad8('0x49')](window['_QuatroDigital_CartData']['allTotal']||'--');});_0x22f2c2=function(_0x4d8ecc){_0x49b84f('Atenção,\x20você\x20esta\x20utilizando\x20um\x20método\x20descontinuado');};_0x465213=function(_0x2e572c,_0x24ca93){if(typeof _0x2e572c['items']===_0x9ad8('0x3'))return _0x49b84f('Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição');_0x2887b1[_0x9ad8('0x79')][_0x9ad8('0x74')](this,_0x24ca93);};_0x2887b1['getCartInfoByUrl']=function(_0x57187e,_0x303925){var _0x301a42;if(typeof _0x303925!=_0x9ad8('0x3'))window[_0x9ad8('0x18')][_0x9ad8('0x7a')]=_0x303925;else if(window[_0x9ad8('0x18')][_0x9ad8('0x7a')])_0x303925=window[_0x9ad8('0x18')]['dataOptionsCache'];setTimeout(function(){window[_0x9ad8('0x18')][_0x9ad8('0x7a')]=undefined;},_0x41053['timeRemoveNewItemClass']);_0x13677f(_0x9ad8('0x7b'))[_0x9ad8('0x53')](_0x9ad8('0x7c'));if(_0x41053[_0x9ad8('0x29')]){_0x301a42=function(_0x3a5320){window[_0x9ad8('0x18')]['getOrderForm']=_0x3a5320;_0x465213(_0x3a5320,_0x303925);if(typeof window[_0x9ad8('0x7d')]!==_0x9ad8('0x3')&&typeof window['_QuatroDigital_AmountProduct'][_0x9ad8('0x7e')]===_0x9ad8('0x7f'))window['_QuatroDigital_AmountProduct'][_0x9ad8('0x7e')][_0x9ad8('0x74')](this);_0x13677f(_0x9ad8('0x7b'))[_0x9ad8('0x80')](_0x9ad8('0x7c'));};if(typeof window['_QuatroDigital_DropDown']['getOrderForm']!==_0x9ad8('0x3')){_0x301a42(window[_0x9ad8('0x18')][_0x9ad8('0x81')]);if(typeof _0x57187e===_0x9ad8('0x7f'))_0x57187e(window[_0x9ad8('0x18')][_0x9ad8('0x81')]);return;}_0x13677f['QD_checkoutQueue'](['items',_0x9ad8('0x82'),_0x9ad8('0x83')],{'done':function(_0x4a0d72){_0x301a42[_0x9ad8('0x74')](this,_0x4a0d72);if(typeof _0x57187e===_0x9ad8('0x7f'))_0x57187e(_0x4a0d72);},'fail':function(_0x215669){_0x49b84f([_0x9ad8('0x84'),_0x215669]);}});}else{alert(_0x9ad8('0x85'));}};_0x2887b1[_0x9ad8('0x72')]=function(){var _0x587ce4=_0x13677f(_0x9ad8('0x7b'));if(_0x587ce4[_0x9ad8('0x45')](_0x9ad8('0x86'))[_0x9ad8('0x8')])_0x587ce4[_0x9ad8('0x53')]('qd-ddc-noItems');else _0x587ce4[_0x9ad8('0x80')](_0x9ad8('0x87'));};_0x2887b1[_0x9ad8('0x79')]=function(_0x2f8dc6){var _0x47dd47=_0x13677f(_0x9ad8('0x88'));var _0x52aa1d=_0x9ad8('0x89')+'<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22>'+_0x9ad8('0x8a')+_0x9ad8('0x8b')+_0x9ad8('0x8c')+_0x9ad8('0x8d')+_0x9ad8('0x8d')+_0x9ad8('0x8e')+_0x9ad8('0x8f')+_0x9ad8('0x90')+_0x9ad8('0x91')+_0x9ad8('0x92')+'<input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/>'+_0x9ad8('0x93')+'<span\x20class=\x22qd-ddc-qttLoading\x22></span>'+_0x9ad8('0x8d')+_0x9ad8('0x8d')+_0x9ad8('0x94')+_0x9ad8('0x95')+_0x9ad8('0x96')+_0x9ad8('0x97')+_0x9ad8('0x8d')+_0x9ad8('0x8d')+_0x9ad8('0x8d');_0x47dd47[_0x9ad8('0x98')]();_0x47dd47['each'](function(){var _0x46d44a=_0x13677f(this);var _0x4979f4,_0x1ae337,_0xa4c0fa,_0x2ff8e2;var _0x4fe8c3=_0x13677f('');var _0x38bb70;for(var _0x4c5625 in window[_0x9ad8('0x18')]['getOrderForm'][_0x9ad8('0x99')]){if(typeof window['_QuatroDigital_DropDown'][_0x9ad8('0x81')][_0x9ad8('0x99')][_0x4c5625]!==_0x9ad8('0x11'))continue;_0xa4c0fa=window[_0x9ad8('0x18')][_0x9ad8('0x81')]['items'][_0x4c5625];_0x38bb70=_0xa4c0fa['productCategoryIds']['replace'](/^\/|\/$/g,'')[_0x9ad8('0x6')]('/');_0x1ae337=_0x13677f(_0x52aa1d);_0x1ae337[_0x9ad8('0x9a')]({'data-sku':_0xa4c0fa['id'],'data-sku-index':_0x4c5625,'data-qd-departament':_0x38bb70[0x0],'data-qd-category':_0x38bb70[_0x38bb70[_0x9ad8('0x8')]-0x1]});_0x1ae337[_0x9ad8('0x80')](_0x9ad8('0x9b')+_0xa4c0fa[_0x9ad8('0x9c')]);_0x1ae337[_0x9ad8('0x45')](_0x9ad8('0x9d'))[_0x9ad8('0x4e')](_0x41053['skuName'](_0xa4c0fa));_0x1ae337[_0x9ad8('0x45')](_0x9ad8('0x9e'))['append'](isNaN(_0xa4c0fa[_0x9ad8('0x9f')])?_0xa4c0fa[_0x9ad8('0x9f')]:_0xa4c0fa[_0x9ad8('0x9f')]==0x0?_0x9ad8('0xa0'):(_0x13677f(_0x9ad8('0xa1'))['attr']('content')||'R$')+'\x20'+qd_number_format(_0xa4c0fa[_0x9ad8('0x9f')]/0x64,0x2,',','.'));_0x1ae337['find']('.qd-ddc-quantity')[_0x9ad8('0x9a')]({'data-sku':_0xa4c0fa['id'],'data-sku-index':_0x4c5625})[_0x9ad8('0x60')](_0xa4c0fa[_0x9ad8('0xa2')]);_0x1ae337[_0x9ad8('0x45')]('.qd-ddc-remove')[_0x9ad8('0x9a')]({'data-sku':_0xa4c0fa['id'],'data-sku-index':_0x4c5625});_0x2887b1[_0x9ad8('0xa3')](_0xa4c0fa['id'],_0x1ae337[_0x9ad8('0x45')](_0x9ad8('0xa4')),_0xa4c0fa[_0x9ad8('0xa5')]);_0x1ae337[_0x9ad8('0x45')]('.qd-ddc-quantityMore,.qd-ddc-quantityMinus')['attr']({'data-sku':_0xa4c0fa['id'],'data-sku-index':_0x4c5625});_0x1ae337['appendTo'](_0x46d44a);_0x4fe8c3=_0x4fe8c3[_0x9ad8('0x50')](_0x1ae337);}try{var _0x2c69d6=_0x46d44a[_0x9ad8('0x0')](_0x9ad8('0x7b'))[_0x9ad8('0x45')](_0x9ad8('0xa6'));if(_0x2c69d6['length']&&_0x2c69d6[_0x9ad8('0x60')]()==''&&window[_0x9ad8('0x18')]['getOrderForm'][_0x9ad8('0x83')][_0x9ad8('0xa7')])_0x2c69d6['val'](window['_QuatroDigital_DropDown'][_0x9ad8('0x81')][_0x9ad8('0x83')]['address']['postalCode']);}catch(_0xf01e0e){_0x49b84f('Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20'+_0xf01e0e[_0x9ad8('0xf')],'aviso');}_0x2887b1[_0x9ad8('0xa8')](_0x46d44a);_0x2887b1[_0x9ad8('0x72')]();if(_0x2f8dc6&&_0x2f8dc6['lastSku']){(function(){_0x2ff8e2=_0x4fe8c3[_0x9ad8('0xa9')](_0x9ad8('0xaa')+_0x2f8dc6[_0x9ad8('0xab')]+'\x27]');if(!_0x2ff8e2[_0x9ad8('0x8')])return;_0x4979f4=0x0;_0x4fe8c3['each'](function(){var _0x116e4d=_0x13677f(this);if(_0x116e4d['is'](_0x2ff8e2))return![];_0x4979f4+=_0x116e4d[_0x9ad8('0xac')]();});_0x2887b1[_0x9ad8('0x5b')](undefined,undefined,_0x4979f4,_0x46d44a[_0x9ad8('0x50')](_0x46d44a[_0x9ad8('0xad')]()));_0x4fe8c3[_0x9ad8('0x53')]('qd-ddc-lastAddedFixed');(function(_0x4e0e0a){_0x4e0e0a[_0x9ad8('0x80')](_0x9ad8('0xae'));_0x4e0e0a[_0x9ad8('0x80')]('qd-ddc-lastAddedFixed');setTimeout(function(){_0x4e0e0a[_0x9ad8('0x53')](_0x9ad8('0xae'));},_0x41053[_0x9ad8('0xaf')]);}(_0x2ff8e2));_0x13677f(document[_0x9ad8('0x57')])[_0x9ad8('0x80')](_0x9ad8('0xb0'));setTimeout(function(){_0x13677f(document['body'])[_0x9ad8('0x53')](_0x9ad8('0xb0'));},_0x41053['timeRemoveNewItemClass']);}());}});(function(){if(_QuatroDigital_DropDown[_0x9ad8('0x81')][_0x9ad8('0x99')][_0x9ad8('0x8')]){_0x13677f('body')[_0x9ad8('0x53')](_0x9ad8('0xb1'))['addClass'](_0x9ad8('0xb2'));setTimeout(function(){_0x13677f('body')[_0x9ad8('0x53')](_0x9ad8('0xb3'));},_0x41053[_0x9ad8('0xaf')]);}else _0x13677f(_0x9ad8('0x57'))[_0x9ad8('0x53')]('qd-ddc-cart-rendered')[_0x9ad8('0x80')]('qd-ddc-cart-empty');}());if(typeof _0x41053['callbackProductsList']==='function')_0x41053[_0x9ad8('0xb4')][_0x9ad8('0x74')](this);else _0x49b84f(_0x9ad8('0xb5'));};_0x2887b1[_0x9ad8('0xa3')]=function(_0x2fb59b,_0x14d2d5,_0x4893c9){var _0x2f1696=!![];function _0x1521ec(){if(_0x41053[_0x9ad8('0xb6')]&&typeof _0x4893c9==_0x9ad8('0xb7'))_0x4893c9=_0x4893c9['replace'](_0x9ad8('0xb8'),_0x9ad8('0xb9'));_0x14d2d5['removeClass']('qd-loaded')['load'](function(){_0x13677f(this)[_0x9ad8('0x80')](_0x9ad8('0xba'));})[_0x9ad8('0x9a')](_0x9ad8('0xbb'),_0x4893c9);};if(_0x4893c9)_0x1521ec();else if(!isNaN(_0x2fb59b)){alert(_0x9ad8('0xbc'));}else _0x49b84f('Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU',_0x9ad8('0x14'));};_0x2887b1['actionButtons']=function(_0x532514){var _0x18b03e,_0x93bfba,_0x434190,_0x48a2c7;_0x18b03e=function(_0x528592,_0x430866){var _0x13d418,_0x51570c,_0x540f51,_0x1fd83f,_0x28971c;_0x540f51=_0x13677f(_0x528592);_0x13d418=_0x540f51[_0x9ad8('0x9a')]('data-sku');_0x28971c=_0x540f51[_0x9ad8('0x9a')](_0x9ad8('0xbd'));if(!_0x13d418)return;_0x51570c=parseInt(_0x540f51[_0x9ad8('0x60')]())||0x1;_0x2887b1[_0x9ad8('0xbe')]([_0x13d418,_0x28971c],_0x51570c,_0x51570c+0x1,function(_0x335797){_0x540f51[_0x9ad8('0x60')](_0x335797);if(typeof _0x430866==='function')_0x430866();});};_0x434190=function(_0x5aedf,_0x4922b6){var _0x2b86a6,_0x4da506,_0xe9ec8d,_0x185df6,_0x5b10c4;_0xe9ec8d=_0x13677f(_0x5aedf);_0x2b86a6=_0xe9ec8d[_0x9ad8('0x9a')](_0x9ad8('0xbf'));_0x5b10c4=_0xe9ec8d[_0x9ad8('0x9a')](_0x9ad8('0xbd'));if(!_0x2b86a6)return;_0x4da506=parseInt(_0xe9ec8d[_0x9ad8('0x60')]())||0x2;_0x185df6=_0x2887b1[_0x9ad8('0xbe')]([_0x2b86a6,_0x5b10c4],_0x4da506,_0x4da506-0x1,function(_0x3ed4a2){_0xe9ec8d[_0x9ad8('0x60')](_0x3ed4a2);if(typeof _0x4922b6===_0x9ad8('0x7f'))_0x4922b6();});};_0x48a2c7=function(_0x45ff1a,_0x9b77bf){var _0x5284be,_0x32364a,_0x391022,_0x5b18a0,_0x5e64a7;_0x391022=_0x13677f(_0x45ff1a);_0x5284be=_0x391022[_0x9ad8('0x9a')](_0x9ad8('0xbf'));_0x5e64a7=_0x391022[_0x9ad8('0x9a')]('data-sku-index');if(!_0x5284be)return;_0x32364a=parseInt(_0x391022[_0x9ad8('0x60')]())||0x1;_0x5b18a0=_0x2887b1[_0x9ad8('0xbe')]([_0x5284be,_0x5e64a7],0x1,_0x32364a,function(_0x1cf39f){_0x391022[_0x9ad8('0x60')](_0x1cf39f);if(typeof _0x9b77bf===_0x9ad8('0x7f'))_0x9b77bf();});};_0x93bfba=_0x532514['find'](_0x9ad8('0xc0'));_0x93bfba[_0x9ad8('0x80')](_0x9ad8('0xc1'))[_0x9ad8('0xc2')](function(){var _0x484d7b=_0x13677f(this);_0x484d7b[_0x9ad8('0x45')](_0x9ad8('0xc3'))['on'](_0x9ad8('0xc4'),function(_0x1f3fe5){_0x1f3fe5[_0x9ad8('0x65')]();_0x93bfba[_0x9ad8('0x80')]('qd-loading');_0x18b03e(_0x484d7b[_0x9ad8('0x45')](_0x9ad8('0xc5')),function(){_0x93bfba['removeClass']('qd-loading');});});_0x484d7b[_0x9ad8('0x45')](_0x9ad8('0xc6'))['on'](_0x9ad8('0xc7'),function(_0x20b970){_0x20b970[_0x9ad8('0x65')]();_0x93bfba[_0x9ad8('0x80')](_0x9ad8('0xc8'));_0x434190(_0x484d7b[_0x9ad8('0x45')](_0x9ad8('0xc5')),function(){_0x93bfba[_0x9ad8('0x53')](_0x9ad8('0xc8'));});});_0x484d7b[_0x9ad8('0x45')]('.qd-ddc-quantity')['on'](_0x9ad8('0xc9'),function(){_0x93bfba[_0x9ad8('0x80')](_0x9ad8('0xc8'));_0x48a2c7(this,function(){_0x93bfba[_0x9ad8('0x53')]('qd-loading');});});_0x484d7b[_0x9ad8('0x45')](_0x9ad8('0xc5'))['on'](_0x9ad8('0xca'),function(_0x1f7825){if(_0x1f7825[_0x9ad8('0x56')]!=0xd)return;_0x93bfba[_0x9ad8('0x80')](_0x9ad8('0xc8'));_0x48a2c7(this,function(){_0x93bfba[_0x9ad8('0x53')]('qd-loading');});});});_0x532514[_0x9ad8('0x45')]('.qd-ddc-prodRow')['each'](function(){var _0x1928ac=_0x13677f(this);_0x1928ac[_0x9ad8('0x45')](_0x9ad8('0xcb'))['on']('click.qd_ddc_remove',function(){var _0x2c8eee;_0x1928ac[_0x9ad8('0x80')](_0x9ad8('0xc8'));_0x2887b1['removeProduct'](_0x13677f(this),function(_0xb9524f){if(_0xb9524f)_0x1928ac['stop'](!![])[_0x9ad8('0xcc')](function(){_0x1928ac[_0x9ad8('0xcd')]();_0x2887b1[_0x9ad8('0x72')]();});else _0x1928ac[_0x9ad8('0x53')](_0x9ad8('0xc8'));});return![];});});};_0x2887b1[_0x9ad8('0xce')]=function(_0x1d01bc){var _0x130131=_0x1d01bc[_0x9ad8('0x60')]();_0x130131=_0x130131[_0x9ad8('0x7')](/[^0-9\-]/g,'');_0x130131=_0x130131[_0x9ad8('0x7')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3');_0x130131=_0x130131['replace'](/(.{9}).*/g,'$1');_0x1d01bc[_0x9ad8('0x60')](_0x130131);};_0x2887b1[_0x9ad8('0x6d')]=function(_0x5ef9e2){var _0x25b46c=_0x5ef9e2[_0x9ad8('0x60')]();if(_0x25b46c['length']>=0x9){if(_0x5ef9e2[_0x9ad8('0xcf')](_0x9ad8('0xd0'))!=_0x25b46c){_0x1d8cd5[_0x9ad8('0xd1')]({'postalCode':_0x25b46c,'country':'BRA'})[_0x9ad8('0xd2')](function(_0x1eab09){_0x5ef9e2[_0x9ad8('0x1')](_0x9ad8('0xd3'))['find'](_0x9ad8('0xd4'))[_0x9ad8('0xcd')]();window[_0x9ad8('0x18')]['getOrderForm']=_0x1eab09;_0x2887b1['getCartInfoByUrl']();var _0x4cd376=_0x1eab09['shippingData'][_0x9ad8('0xd5')][0x0][_0x9ad8('0xd6')];var _0x59402b=_0x13677f(_0x9ad8('0xd7'));for(var _0x43cded=0x0;_0x43cded<_0x4cd376['length'];_0x43cded++){var _0x4ff18f=_0x4cd376[_0x43cded];var _0x195e0f=_0x4ff18f['shippingEstimate']>0x1?_0x4ff18f[_0x9ad8('0xd8')]['replace']('bd',_0x9ad8('0xd9')):_0x4ff18f['shippingEstimate'][_0x9ad8('0x7')]('bd',_0x9ad8('0xda'));var _0x4553d3=_0x13677f('<tr></tr>');_0x4553d3['append'](_0x9ad8('0xdb')+qd_number_format(_0x4ff18f[_0x9ad8('0xdc')]/0x64,0x2,',','.')+'</td><td>'+_0x4ff18f['name']+',\x20entrega\x20em\x20'+_0x195e0f+_0x9ad8('0xdd')+_0x25b46c+_0x9ad8('0xde'));_0x4553d3['appendTo'](_0x59402b[_0x9ad8('0x45')](_0x9ad8('0xdf')));}_0x59402b[_0x9ad8('0xe0')](_0x5ef9e2[_0x9ad8('0x1')](_0x9ad8('0xd3'))[_0x9ad8('0x45')]('.qd-ddc-cep-close'));})['fail'](function(_0x265c62){_0x49b84f([_0x9ad8('0xe1'),_0x265c62]);updateCartData();});}_0x5ef9e2[_0x9ad8('0xcf')](_0x9ad8('0xd0'),_0x25b46c);}};_0x2887b1['changeQantity']=function(_0x5c86f2,_0x247de3,_0xebbfb6,_0x3dc894){var _0x5e9210=_0xebbfb6||0x1;if(_0x5e9210<0x1)return _0x247de3;if(_0x41053[_0x9ad8('0x29')]){if(typeof window[_0x9ad8('0x18')]['getOrderForm'][_0x9ad8('0x99')][_0x5c86f2[0x1]]===_0x9ad8('0x3')){_0x49b84f(_0x9ad8('0xe2')+_0x5c86f2[0x1]+']');return _0x247de3;}window[_0x9ad8('0x18')][_0x9ad8('0x81')][_0x9ad8('0x99')][_0x5c86f2[0x1]][_0x9ad8('0xa2')]=_0x5e9210;window[_0x9ad8('0x18')]['getOrderForm']['items'][_0x5c86f2[0x1]][_0x9ad8('0xe3')]=_0x5c86f2[0x1];_0x1d8cd5['updateItems']([window[_0x9ad8('0x18')][_0x9ad8('0x81')][_0x9ad8('0x99')][_0x5c86f2[0x1]]],[_0x9ad8('0x99'),_0x9ad8('0x82'),_0x9ad8('0x83')])['done'](function(_0x1eee18){window[_0x9ad8('0x18')][_0x9ad8('0x81')]=_0x1eee18;_0x579188(!![]);})[_0x9ad8('0xe4')](function(_0x449567){_0x49b84f([_0x9ad8('0xe5'),_0x449567]);_0x579188();});}else{_0x49b84f(_0x9ad8('0xe6'));}function _0x579188(_0x5e2c0f){_0x5e2c0f=typeof _0x5e2c0f!==_0x9ad8('0xe7')?![]:_0x5e2c0f;_0x2887b1['getCartInfoByUrl']();window[_0x9ad8('0x18')][_0x9ad8('0x19')]=![];_0x2887b1['cartIsEmpty']();if(typeof window['_QuatroDigital_AmountProduct']!=='undefined'&&typeof window[_0x9ad8('0x7d')]['exec']===_0x9ad8('0x7f'))window[_0x9ad8('0x7d')][_0x9ad8('0x7e')][_0x9ad8('0x74')](this);if(typeof adminCart===_0x9ad8('0x7f'))adminCart();_0x13677f['fn']['simpleCart'](!![],undefined,_0x5e2c0f);if(typeof _0x3dc894===_0x9ad8('0x7f'))_0x3dc894(_0x247de3);};};_0x2887b1[_0x9ad8('0xe8')]=function(_0x3bea03,_0x32c06e){var _0x1e2f93=![];var _0x55d654=_0x13677f(_0x3bea03);var _0xaf026a=_0x55d654['attr'](_0x9ad8('0xbd'));if(_0x41053[_0x9ad8('0x29')]){if(typeof window[_0x9ad8('0x18')][_0x9ad8('0x81')][_0x9ad8('0x99')][_0xaf026a]===_0x9ad8('0x3')){_0x49b84f(_0x9ad8('0xe2')+_0xaf026a+']');return _0x1e2f93;}window[_0x9ad8('0x18')]['getOrderForm'][_0x9ad8('0x99')][_0xaf026a][_0x9ad8('0xe3')]=_0xaf026a;_0x1d8cd5[_0x9ad8('0xe9')]([window[_0x9ad8('0x18')][_0x9ad8('0x81')][_0x9ad8('0x99')][_0xaf026a]],[_0x9ad8('0x99'),_0x9ad8('0x82'),_0x9ad8('0x83')])[_0x9ad8('0xd2')](function(_0x27ddc1){_0x1e2f93=!![];window[_0x9ad8('0x18')][_0x9ad8('0x81')]=_0x27ddc1;_0x465213(_0x27ddc1);_0x5a933b(!![]);})[_0x9ad8('0xe4')](function(_0x346b20){_0x49b84f(['Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho',_0x346b20]);_0x5a933b();});}else{alert(_0x9ad8('0xea'));}function _0x5a933b(_0x52c040){_0x52c040=typeof _0x52c040!==_0x9ad8('0xe7')?![]:_0x52c040;if(typeof window[_0x9ad8('0x7d')]!=='undefined'&&typeof window[_0x9ad8('0x7d')]['exec']===_0x9ad8('0x7f'))window['_QuatroDigital_AmountProduct']['exec'][_0x9ad8('0x74')](this);if(typeof adminCart==='function')adminCart();_0x13677f['fn'][_0x9ad8('0x71')](!![],undefined,_0x52c040);if(typeof _0x32c06e==='function')_0x32c06e(_0x1e2f93);};};_0x2887b1[_0x9ad8('0x5b')]=function(_0x486160,_0x4a7720,_0x229f0d,_0x3a1213){var _0x3fa8cd=_0x3a1213||_0x13677f(_0x9ad8('0xeb'));var _0x18edce=_0x486160||'+';var _0x549582=_0x4a7720||_0x3fa8cd[_0x9ad8('0xec')]()*0.9;_0x3fa8cd[_0x9ad8('0xed')](!![],!![])[_0x9ad8('0xee')]({'scrollTop':isNaN(_0x229f0d)?_0x18edce+'='+_0x549582+'px':_0x229f0d});};if(!_0x41053[_0x9ad8('0x6f')]){_0x2887b1[_0x9ad8('0x70')]();_0x13677f['fn'][_0x9ad8('0x71')](!![]);}_0x13677f(window)['on'](_0x9ad8('0xef'),function(){try{window[_0x9ad8('0x18')][_0x9ad8('0x81')]=undefined;_0x2887b1['getCartInfoByUrl']();}catch(_0x55b01e){_0x49b84f(_0x9ad8('0xf0')+_0x55b01e[_0x9ad8('0xf')],'avisso');}});if(typeof _0x41053[_0x9ad8('0xb')]===_0x9ad8('0x7f'))_0x41053[_0x9ad8('0xb')][_0x9ad8('0x74')](this);else _0x49b84f(_0x9ad8('0xf1'));};_0x13677f['fn']['QD_dropDownCart']=function(_0x14cc43){var _0x14db00;_0x14db00=_0x13677f(this);_0x14db00['fn']=new _0x13677f['QD_dropDownCart'](this,_0x14cc43);return _0x14db00;};}catch(_0x5280bd){if(typeof console!=='undefined'&&typeof console[_0x9ad8('0xd')]==='function')console[_0x9ad8('0xd')]('Oooops!\x20',_0x5280bd);}}(this));(function(_0xe298e6){'use strict';try{var _0x3a3200=jQuery;var _0x829068='Quatro\x20Digital\x20-\x20Box\x20Amount\x20Cart';var _0x2d6205=function(_0x2f0958,_0x35b132){if(_0x9ad8('0x11')===typeof console&&'undefined'!==typeof console[_0x9ad8('0xd')]&&_0x9ad8('0x3')!==typeof console[_0x9ad8('0x12')]&&'undefined'!==typeof console['warn']){var _0x7e5706;_0x9ad8('0x11')===typeof _0x2f0958?(_0x2f0958[_0x9ad8('0xf2')]('['+_0x829068+']\x0a'),_0x7e5706=_0x2f0958):_0x7e5706=['['+_0x829068+']\x0a'+_0x2f0958];if(_0x9ad8('0x3')===typeof _0x35b132||'alerta'!==_0x35b132[_0x9ad8('0x15')]()&&_0x9ad8('0x16')!==_0x35b132[_0x9ad8('0x15')]())if(_0x9ad8('0x3')!==typeof _0x35b132&&'info'===_0x35b132['toLowerCase']())try{console[_0x9ad8('0x12')][_0x9ad8('0x17')](console,_0x7e5706);}catch(_0x30773a){try{console[_0x9ad8('0x12')](_0x7e5706[_0x9ad8('0x9')]('\x0a'));}catch(_0x47c938){}}else try{console[_0x9ad8('0xd')]['apply'](console,_0x7e5706);}catch(_0x495d36){try{console[_0x9ad8('0xd')](_0x7e5706['join']('\x0a'));}catch(_0x442847){}}else try{console['warn'][_0x9ad8('0x17')](console,_0x7e5706);}catch(_0x2c8868){try{console[_0x9ad8('0x13')](_0x7e5706['join']('\x0a'));}catch(_0x4a4406){}}}};window['_QuatroDigital_AmountProduct']=window[_0x9ad8('0x7d')]||{};window['_QuatroDigital_AmountProduct'][_0x9ad8('0x99')]={};window['_QuatroDigital_AmountProduct'][_0x9ad8('0xf3')]=![];window[_0x9ad8('0x7d')][_0x9ad8('0xf4')]=![];window[_0x9ad8('0x7d')][_0x9ad8('0xf5')]=![];var _0x364b31='<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>';var _0x5112c3=function(){var _0x57dc58,_0xc7b6d5,_0x51ff61,_0x9e3f79;_0x9e3f79=_0x2c9e5e();if(window[_0x9ad8('0x7d')][_0x9ad8('0xf3')]){_0x3a3200('.qd-bap-wrapper')[_0x9ad8('0xcd')]();_0x3a3200(_0x9ad8('0xf6'))['removeClass'](_0x9ad8('0xf7'));}for(var _0x1b0d5f in window[_0x9ad8('0x7d')][_0x9ad8('0x99')]){_0x57dc58=window[_0x9ad8('0x7d')][_0x9ad8('0x99')][_0x1b0d5f];if(typeof _0x57dc58!==_0x9ad8('0x11'))return;_0x51ff61=_0x3a3200(_0x9ad8('0xf8')+_0x57dc58['prodId']+']')[_0x9ad8('0x0')]('li');if(!window[_0x9ad8('0x7d')][_0x9ad8('0xf3')]&&_0x51ff61['find'](_0x9ad8('0xf9'))['length'])continue;_0xc7b6d5=_0x3a3200(_0x364b31);_0xc7b6d5[_0x9ad8('0x45')](_0x9ad8('0xfa'))['html'](_0x57dc58['qtt']);var _0x22f1e6=_0x51ff61[_0x9ad8('0x45')]('.qd_bap_wrapper_content');if(_0x22f1e6[_0x9ad8('0x8')])_0x22f1e6[_0x9ad8('0xfb')](_0xc7b6d5)[_0x9ad8('0x80')](_0x9ad8('0xf7'));else _0x51ff61['prepend'](_0xc7b6d5);}if(_0x9e3f79)window[_0x9ad8('0x7d')]['allowRecalculate']=![];};var _0x2c9e5e=function(){if(!window[_0x9ad8('0x7d')][_0x9ad8('0xf3')])return;var _0x3c5a46=![],_0x132e5b={};window[_0x9ad8('0x7d')][_0x9ad8('0x99')]={};for(var _0x453096 in window[_0x9ad8('0x18')]['getOrderForm'][_0x9ad8('0x99')]){if(typeof window[_0x9ad8('0x18')][_0x9ad8('0x81')][_0x9ad8('0x99')][_0x453096]!=='object')continue;var _0x63d34d=window[_0x9ad8('0x18')][_0x9ad8('0x81')]['items'][_0x453096];if(typeof _0x63d34d[_0x9ad8('0xfc')]==='undefined'||_0x63d34d['productId']===null||_0x63d34d[_0x9ad8('0xfc')]==='')continue;window[_0x9ad8('0x7d')][_0x9ad8('0x99')][_0x9ad8('0xfd')+_0x63d34d['productId']]=window[_0x9ad8('0x7d')][_0x9ad8('0x99')][_0x9ad8('0xfd')+_0x63d34d[_0x9ad8('0xfc')]]||{};window[_0x9ad8('0x7d')][_0x9ad8('0x99')][_0x9ad8('0xfd')+_0x63d34d[_0x9ad8('0xfc')]]['prodId']=_0x63d34d[_0x9ad8('0xfc')];if(!_0x132e5b[_0x9ad8('0xfd')+_0x63d34d[_0x9ad8('0xfc')]])window['_QuatroDigital_AmountProduct'][_0x9ad8('0x99')][_0x9ad8('0xfd')+_0x63d34d[_0x9ad8('0xfc')]][_0x9ad8('0x77')]=0x0;window[_0x9ad8('0x7d')]['items'][_0x9ad8('0xfd')+_0x63d34d[_0x9ad8('0xfc')]][_0x9ad8('0x77')]=window['_QuatroDigital_AmountProduct']['items'][_0x9ad8('0xfd')+_0x63d34d['productId']]['qtt']+_0x63d34d['quantity'];_0x3c5a46=!![];_0x132e5b[_0x9ad8('0xfd')+_0x63d34d[_0x9ad8('0xfc')]]=!![];}return _0x3c5a46;};window['_QuatroDigital_AmountProduct'][_0x9ad8('0x7e')]=function(){window[_0x9ad8('0x7d')]['allowRecalculate']=!![];_0x5112c3['call'](this);};_0x3a3200(document)[_0x9ad8('0xfe')](function(){_0x5112c3[_0x9ad8('0x74')](this);});}catch(_0x41931f){if(typeof console!==_0x9ad8('0x3')&&typeof console['error']===_0x9ad8('0x7f'))console[_0x9ad8('0xd')](_0x9ad8('0xe'),_0x41931f);}}(this));(function(){'use strict';try{var _0x2de9fd=jQuery,_0x2ed377;var _0x311ac9=_0x9ad8('0xff');var _0x755438=function(_0x1c43be,_0x57c151){if(_0x9ad8('0x11')===typeof console&&_0x9ad8('0x3')!==typeof console['error']&&'undefined'!==typeof console[_0x9ad8('0x12')]&&_0x9ad8('0x3')!==typeof console[_0x9ad8('0x13')]){var _0x783268;_0x9ad8('0x11')===typeof _0x1c43be?(_0x1c43be[_0x9ad8('0xf2')]('['+_0x311ac9+']\x0a'),_0x783268=_0x1c43be):_0x783268=['['+_0x311ac9+']\x0a'+_0x1c43be];if(_0x9ad8('0x3')===typeof _0x57c151||_0x9ad8('0x14')!==_0x57c151[_0x9ad8('0x15')]()&&_0x9ad8('0x16')!==_0x57c151['toLowerCase']())if(_0x9ad8('0x3')!==typeof _0x57c151&&'info'===_0x57c151[_0x9ad8('0x15')]())try{console[_0x9ad8('0x12')]['apply'](console,_0x783268);}catch(_0x57b6f3){try{console[_0x9ad8('0x12')](_0x783268[_0x9ad8('0x9')]('\x0a'));}catch(_0x2de687){}}else try{console[_0x9ad8('0xd')][_0x9ad8('0x17')](console,_0x783268);}catch(_0x20529e){try{console[_0x9ad8('0xd')](_0x783268[_0x9ad8('0x9')]('\x0a'));}catch(_0x281d49){}}else try{console['warn']['apply'](console,_0x783268);}catch(_0xe64ff2){try{console[_0x9ad8('0x13')](_0x783268[_0x9ad8('0x9')]('\x0a'));}catch(_0x29a2a2){}}}};var _0x201cc5={'selector':_0x9ad8('0x100'),'dropDown':{},'buyButton':{}};_0x2de9fd[_0x9ad8('0x101')]=function(_0x5da1bb){var _0x5b6cf8,_0x5a7edb={};_0x2ed377=_0x2de9fd[_0x9ad8('0x102')](!![],{},_0x201cc5,_0x5da1bb);_0x5b6cf8=_0x2de9fd(_0x2ed377[_0x9ad8('0x103')])[_0x9ad8('0x1a')](_0x2ed377['dropDown']);if(typeof _0x2ed377[_0x9ad8('0x104')]['updateOnlyHover']!=='undefined'&&_0x2ed377[_0x9ad8('0x104')]['updateOnlyHover']===![])_0x5a7edb[_0x9ad8('0x105')]=_0x2de9fd(_0x2ed377[_0x9ad8('0x103')])[_0x9ad8('0x106')](_0x5b6cf8['fn'],_0x2ed377[_0x9ad8('0x105')]);else _0x5a7edb[_0x9ad8('0x105')]=_0x2de9fd(_0x2ed377[_0x9ad8('0x103')])[_0x9ad8('0x106')](_0x2ed377[_0x9ad8('0x105')]);_0x5a7edb['dropDown']=_0x5b6cf8;return _0x5a7edb;};_0x2de9fd['fn'][_0x9ad8('0x107')]=function(){if(typeof console===_0x9ad8('0x11')&&typeof console['info']===_0x9ad8('0x7f'))console[_0x9ad8('0x12')](_0x9ad8('0x108'));};_0x2de9fd[_0x9ad8('0x107')]=_0x2de9fd['fn'][_0x9ad8('0x107')];}catch(_0x125cc7){if(typeof console!==_0x9ad8('0x3')&&typeof console[_0x9ad8('0xd')]===_0x9ad8('0x7f'))console[_0x9ad8('0xd')](_0x9ad8('0xe'),_0x125cc7);}}());

// vtex url parse
/* Quatro Digital - VTEX URL Parse // 1.4 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
var _0x8349=["\x6C\x69\x6E\x6B","\x3C\x61\x20\x68\x72\x65\x66\x3D\x22","\x22\x3E\x3C\x2F\x61\x3E","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\x66\x75\x6E\x63\x74\x69\x6F\x6E","\x65\x72\x72\x6F\x72","\x50\x72\x6F\x62\x6C\x65\x6D\x61\x73\x20\x3A\x28\x20\x2E\x20\x44\x65\x74\x61\x6C\x68\x65\x73\x3A\x20","\x2F","\x73\x70\x6C\x69\x74","","\x72\x65\x70\x6C\x61\x63\x65","\x70\x61\x74\x68\x6E\x61\x6D\x65","\x2C","\x70\x6F\x70","\x6D\x61\x74\x63\x68","\x73\x65\x61\x72\x63\x68","\x6C\x65\x6E\x67\x74\x68","\x6F\x62\x6A\x65\x63\x74","\x70\x75\x73\x68","\x63","\x6D\x61\x70","\x73\x68\x69\x66\x74","\x6F\x74\x68\x65\x72\x5F\x70\x61\x74\x68","\x6F\x74\x68\x65\x72\x5F\x73\x65\x61\x72\x63\x68","\x26","\x6F\x75\x74","\x67\x65\x74\x4D\x61\x70","\x70\x72\x6F\x74\x6F\x74\x79\x70\x65","\x6D\x65\x72\x67\x65\x55\x72\x6C","\x63\x61\x6C\x6C","\x65\x78\x74\x65\x6E\x64","\x67\x65\x74\x55\x72\x6C","\x6D\x61\x70\x3D","\x6A\x6F\x69\x6E","\x3F","\x51\x44\x5F\x56\x74\x65\x78\x55\x72\x6C\x50\x61\x72\x73\x65"];(function(){function _0x6ac7x1(_0x6ac7x2){try{this[_0x8349[0]]=$(_0x8349[1]+_0x6ac7x2+_0x8349[2])[0]}catch(c){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],c)}}function _0x6ac7x3(_0x6ac7x2){try{_0x6ac7x2=_0x6ac7x2||this[_0x8349[0]];var _0x6ac7x4=_0x6ac7x2[_0x8349[11]][_0x8349[10]](/\/\//g,_0x8349[7])[_0x8349[10]](/(^\/|\/$)/g,_0x8349[9])[_0x8349[8]](_0x8349[7]),_0x6ac7x5=((_0x6ac7x2[_0x8349[15]]||_0x8349[9])[_0x8349[14]](/map\=([^&]+)/i)||[_0x8349[9]])[_0x8349[13]]()[_0x8349[8]](_0x8349[12]);if(1==_0x6ac7x5[_0x8349[16]]&&0==_0x6ac7x5[0][_0x8349[16]]){if(_0x8349[17]== typeof defaultMap){_0x6ac7x5=defaultMap}else {for(var _0x6ac7x6=0;_0x6ac7x6<_0x6ac7x4[_0x8349[16]];_0x6ac7x6++){_0x6ac7x4[_0x6ac7x6][_0x8349[16]]&&_0x8349[7]!=_0x6ac7x4[_0x6ac7x6]&&_0x6ac7x5[_0x8349[18]](defaultMap)}}};for(var _0x6ac7x6={map:{},other_path:_0x8349[9]},_0x6ac7x7=0;_0x6ac7x7<_0x6ac7x5[_0x8349[16]];_0x6ac7x7++){_0x6ac7x5[_0x6ac7x7][_0x8349[16]]&&(_0x8349[19]==_0x6ac7x5[_0x6ac7x7]?(_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]=_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]||[],_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]][_0x8349[18]]((_0x6ac7x4||[_0x8349[9]])[_0x8349[21]]())):_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]=(_0x6ac7x4||[_0x8349[9]])[_0x8349[21]]())};_0x6ac7x6[_0x8349[22]]=_0x6ac7x4;_0x6ac7x6[_0x8349[23]]=(_0x6ac7x2[_0x8349[15]]||_0x8349[9])[_0x8349[10]](/map\=([^&]+)/ig,_0x8349[9])[_0x8349[10]](/\&\&+/ig,_0x8349[24])[_0x8349[10]](/\?/g,_0x8349[9]);return this[_0x8349[25]]=_0x6ac7x6}catch(g){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],g)}}_0x6ac7x1[_0x8349[27]][_0x8349[26]]=_0x6ac7x3;_0x6ac7x1[_0x8349[27]][_0x8349[28]]=function(_0x6ac7x2,_0x6ac7x4){try{var _0x6ac7x5=_0x6ac7x3[_0x8349[29]](this,this[_0x8349[0]]),_0x6ac7x6=_0x6ac7x3[_0x8349[29]](this,$(_0x8349[1]+_0x6ac7x2+_0x8349[2])[0]);_0x6ac7x5[_0x8349[22]][_0x8349[16]]||(_0x6ac7x5[_0x8349[22]]=void(0));_0x6ac7x5[_0x8349[23]][_0x8349[16]]||(_0x6ac7x5[_0x8349[23]]=void(0));var _0x6ac7x7=$[_0x8349[30]](!0,{},_0x6ac7x6,_0x6ac7x5);if(_0x8349[17]== typeof _0x6ac7x4){for(_0x6ac7x6=0;_0x6ac7x6<_0x6ac7x4[_0x8349[16]];_0x6ac7x6++){_0x6ac7x7[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]]&&(_0x6ac7x7[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]]=_0x6ac7x5[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]])}};return this[_0x8349[25]]=_0x6ac7x7}catch(g){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],g)}};_0x6ac7x1[_0x8349[27]][_0x8349[31]]=function(_0x6ac7x2){try{var _0x6ac7x4=[],_0x6ac7x5=[];_0x6ac7x2=_0x6ac7x2||{};for(var _0x6ac7x6 in this[_0x8349[25]][_0x8349[20]]){if(!_0x6ac7x2[_0x6ac7x6]){if(_0x8349[19]==_0x6ac7x6){for(var _0x6ac7x7=0;_0x6ac7x7<this[_0x8349[25]][_0x8349[20]][_0x6ac7x6][_0x8349[16]];_0x6ac7x7++){_0x6ac7x4[_0x8349[18]](this[_0x8349[25]][_0x8349[20]][_0x6ac7x6][_0x6ac7x7]),_0x6ac7x5[_0x8349[18]](_0x6ac7x6)}}else {_0x6ac7x4[_0x8349[18]](this[_0x8349[25]][_0x8349[20]][_0x6ac7x6]),_0x6ac7x5[_0x8349[18]](_0x6ac7x6)}}};var _0x6ac7x8=_0x6ac7x5[_0x8349[16]]?_0x8349[32]+_0x6ac7x5[_0x8349[33]](_0x8349[12])+_0x8349[24]:_0x8349[9];return _0x8349[7]+_0x6ac7x4[_0x8349[33]](_0x8349[7])+(this[_0x8349[25]][_0x8349[22]][_0x8349[16]]?_0x8349[7]+this[_0x8349[25]][_0x8349[22]][_0x8349[33]](_0x8349[7]):_0x8349[9])+_0x8349[34]+(_0x6ac7x8+this[_0x8349[25]][_0x8349[23]])[_0x8349[10]](/\&\&+/g,_0x8349[24])}catch(_0x6ac7x1){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],_0x6ac7x1)}};window[_0x8349[35]]=_0x6ac7x1})()

/* Quatro Digital - QD Select Smart Research 2 // Carlos Vinicius // Todos os direitos reservados */
var _0x8249=['qdPlugin','function','QD_SelectSmartResearch2','undefined','error','info','warn','object','unshift','[Quatro\x20Digital\x20-\x20QD\x20Select\x20Smart\x20Research\x202]\x0a','alerta','toLowerCase','aviso','join','apply','Selecione\x20o\x20anterior','Selecione\x20o(a)\x20','location','href','find','.search-single-navigator\x20ul.','attr','push','text','trim','h5.','Desculpe,\x20não\x20foi\x20possível\x20executar\x20sua\x20solicitação.\x20Por\x20favor\x20entre\x20em\x20contato\x20com\x20o\x20SAC.','rnaqevavfgber%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','ite','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','options','length','Nenhuma\x20opção\x20foi\x20enviada,\x20é\x20esperado\x20um\x20array\x20com\x20sub\x20arrays\x20contendo\x20o\x20conjunto\x20chave/valor.','each','data-qdssr-ndx','Problemas\x20ao\x20definir\x20a\x20opção\x20selecionada.\x20Detalhes:\x20','addClass','qd-ssr2-loaded','Problemas\x20ao\x20tentar\x20verificar\x20as\x20opções\x20selecionadas.\x20Detalhes:\x20','message','optionsPlaceHolder','index','<div\x20class=\x22qd-ssr2-option-wrapper\x22>','<label\x20for=\x22qd-ssr2-select-','</label>','<select\x20data-qdssr-ndx=\x22','\x22\x20id=\x22qd-ssr2-select-','disabledMessage','</select></div>','appendTo','select','pt-BR','change','select[data-qdssr-ndx=','val','trigger','body','redirect','shift','split','data-qdssr-str','qd-ssr-loading','qd-ssr2-loading','qdAjax','html','removeAttr','disabled','<option\x20value=\x22\x22></option>','getAjaxOptions','data-qdssr-title','QuatroDigital.ssrSelectAjaxPopulated','ajaxError','removeClass','Problemas\x20:(\x20.\x20Detalhes:\x20','optionIsChecked','option[data-qdssr-text=\x27','<option\x20value=\x22','\x22\x20data-qdssr-text=\x22','getCategory','cache','script:not([src])','buscapagina','match','pop','extend'];(function(_0x4c8cf9,_0x4da200){var _0x7429e=function(_0x3117cf){while(--_0x3117cf){_0x4c8cf9['push'](_0x4c8cf9['shift']());}};_0x7429e(++_0x4da200);}(_0x8249,0x16d));var _0x9824=function(_0x4f2bd9,_0x49a0a4){_0x4f2bd9=_0x4f2bd9-0x0;var _0x3fe995=_0x8249[_0x4f2bd9];return _0x3fe995;};(function(_0x14b011){var _0xf14b94=jQuery;if(_0x9824('0x0')!==typeof _0xf14b94['fn']['QD_SelectSmartResearch2']){_0xf14b94['fn'][_0x9824('0x1')]=function(){};var _0x5a8f47=function(_0x4805a9,_0x18cb6d){if('object'===typeof console&&_0x9824('0x2')!==typeof console[_0x9824('0x3')]&&_0x9824('0x2')!==typeof console[_0x9824('0x4')]&&_0x9824('0x2')!==typeof console[_0x9824('0x5')]){var _0x2184a7;_0x9824('0x6')===typeof _0x4805a9?(_0x4805a9[_0x9824('0x7')](_0x9824('0x8')),_0x2184a7=_0x4805a9):_0x2184a7=['[Quatro\x20Digital\x20-\x20QD\x20Select\x20Smart\x20Research\x202]\x0a'+_0x4805a9];if(_0x9824('0x2')===typeof _0x18cb6d||_0x9824('0x9')!==_0x18cb6d[_0x9824('0xa')]()&&_0x9824('0xb')!==_0x18cb6d[_0x9824('0xa')]())if(_0x9824('0x2')!==typeof _0x18cb6d&&_0x9824('0x4')===_0x18cb6d['toLowerCase']())try{console[_0x9824('0x4')]['apply'](console,_0x2184a7);}catch(_0x2c1035){try{console['info'](_0x2184a7[_0x9824('0xc')]('\x0a'));}catch(_0x1358e8){}}else try{console[_0x9824('0x3')][_0x9824('0xd')](console,_0x2184a7);}catch(_0x30cb87){try{console[_0x9824('0x3')](_0x2184a7[_0x9824('0xc')]('\x0a'));}catch(_0x2723f7){}}else try{console[_0x9824('0x5')][_0x9824('0xd')](console,_0x2184a7);}catch(_0x51fa57){try{console['warn'](_0x2184a7['join']('\x0a'));}catch(_0x155e71){}}}},_0x26c383={'options':[],'optionsPlaceHolder':[],'disabledMessage':function(_0x2a9bf9,_0x1e70db,_0x228706){return _0x9824('0xe');},'labelMessage':function(_0x22cd31,_0x43f4bd,_0x24938f){return _0x9824('0xf')+_0x24938f[_0x22cd31];},'redirect':function(_0x4f7976){window[_0x9824('0x10')][_0x9824('0x11')]=_0x4f7976;},'getAjaxOptions':function(_0x447ff6,_0x5d29b7){var _0x4696e7=[];_0xf14b94(_0x447ff6)[_0x9824('0x12')](_0x9824('0x13')+_0x5d29b7[_0x9824('0x14')]('data-qdssr-title'))[_0x9824('0x12')]('a')['each'](function(){var _0x5d29b7=_0xf14b94(this);_0x4696e7[_0x9824('0x15')]([_0x5d29b7[_0x9824('0x16')]()[_0x9824('0x17')](),_0x5d29b7[_0x9824('0x14')]('href')||'']);});return _0x4696e7;},'optionIsChecked':function(_0x5c720a){_0x5c720a=_0xf14b94(_0x9824('0x18')+_0x5c720a+'\x20+ul\x20.filtro-ativo:first')[_0x9824('0x16')]()[_0x9824('0x17')]();return _0x5c720a['length']?_0x5c720a:null;},'ajaxError':function(){_0x5a8f47(_0x9824('0x19'));}};_0x14b011=function(_0x300a12){var _0x2fdc65={'y':_0x9824('0x1a')};return function(_0x2e00f5){var _0x9251cf=function(_0x54e9e6){return _0x54e9e6;};var _0xe402c8=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2e00f5=_0x2e00f5['d'+_0xe402c8[0x10]+'c'+_0xe402c8[0x11]+'m'+_0x9251cf(_0xe402c8[0x1])+'n'+_0xe402c8[0xd]]['l'+_0xe402c8[0x12]+'c'+_0xe402c8[0x0]+'ti'+_0x9251cf('o')+'n'];var _0xfb6911=function(_0x56bcb6){return escape(encodeURIComponent(_0x56bcb6['replace'](/\./g,'¨')[_0x9824('0x1b')](/[a-zA-Z]/g,function(_0x33fa36){return String[_0x9824('0x1c')](('Z'>=_0x33fa36?0x5a:0x7a)>=(_0x33fa36=_0x33fa36[_0x9824('0x1d')](0x0)+0xd)?_0x33fa36:_0x33fa36-0x1a);})));};var _0x3348c8=_0xfb6911(_0x2e00f5[[_0xe402c8[0x9],_0x9251cf('o'),_0xe402c8[0xc],_0xe402c8[_0x9251cf(0xd)]]['join']('')]);_0xfb6911=_0xfb6911((window[['js',_0x9251cf('no'),'m',_0xe402c8[0x1],_0xe402c8[0x4]['toUpperCase'](),_0x9824('0x1e')][_0x9824('0xc')]('')]||'---')+['.v',_0xe402c8[0xd],'e',_0x9251cf('x'),'co',_0x9251cf('mm'),_0x9824('0x1f'),_0xe402c8[0x1],'.c',_0x9251cf('o'),'m.',_0xe402c8[0x13],'r'][_0x9824('0xc')](''));for(var _0x1b37d8 in _0x2fdc65){if(_0xfb6911===_0x1b37d8+_0x2fdc65[_0x1b37d8]||_0x3348c8===_0x1b37d8+_0x2fdc65[_0x1b37d8]){var _0x2b14a0='tr'+_0xe402c8[0x11]+'e';break;}_0x2b14a0='f'+_0xe402c8[0x0]+'ls'+_0x9251cf(_0xe402c8[0x1])+'';}_0x9251cf=!0x1;-0x1<_0x2e00f5[[_0xe402c8[0xc],'e',_0xe402c8[0x0],'rc',_0xe402c8[0x9]]['join']('')][_0x9824('0x20')](_0x9824('0x21'))&&(_0x9251cf=!0x0);return[_0x2b14a0,_0x9251cf];}(_0x300a12);}(window);if(!eval(_0x14b011[0x0]))return _0x14b011[0x1]?_0x5a8f47(_0x9824('0x22')):!0x1;_0xf14b94['QD_SelectSmartResearch2']=function(_0x5d39bd,_0x310580){if(!_0x310580[_0x9824('0x23')][_0x9824('0x24')])return _0x5a8f47(_0x9824('0x25'));_0x5d39bd[_0x9824('0x26')](function(){try{var _0x13c24e=_0xf14b94(this),_0x5536a7=_0x47ca5f(_0x13c24e,_0x310580,_0x5d39bd);_0x2f5c16(_0x13c24e,_0x310580,0x0);_0x5536a7['on']('QuatroDigital.ssrSelectAjaxPopulated',function(_0xa8a7e4,_0x1cd517){try{_0x2f5c16(_0x13c24e,_0x310580,_0x1cd517[_0x9824('0x14')](_0x9824('0x27')));}catch(_0xb5c843){_0x5a8f47(_0x9824('0x28')+_0xb5c843['message']);}});_0x13c24e[_0x9824('0x29')](_0x9824('0x2a'));}catch(_0x5c48cf){_0x5a8f47(_0x9824('0x2b')+_0x5c48cf[_0x9824('0x2c')]);}});};var _0x47ca5f=function(_0x37977c,_0x2ef0f4,_0x47b3cc){try{for(var _0x331b6b='',_0x8bb003,_0x14b011=!0x0,_0x3db07e=new _0xf14b94(),_0x148761=!0x1,_0x431609=0x0,_0x2615b9=0x0;_0x2615b9<_0x2ef0f4[_0x9824('0x23')][_0x9824('0x24')];_0x2615b9++){_0x9824('0x6')!==typeof _0x2ef0f4[_0x9824('0x23')][_0x2615b9]&&(_0x14b011=!0x1);var _0x190216=_0x2ef0f4[_0x9824('0x2d')][_0x2615b9]||'',_0x4f5f54=_0x47b3cc[_0x9824('0x2e')](_0x37977c);_0x331b6b=_0x9824('0x2f');_0x331b6b+=_0x9824('0x30')+_0x2615b9+_0x4f5f54+'\x22>'+_0x2ef0f4['labelMessage'](_0x2615b9,_0x2ef0f4[_0x9824('0x23')],_0x2ef0f4['optionsPlaceHolder'])+_0x9824('0x31');_0x331b6b+=_0x9824('0x32')+_0x2615b9+_0x9824('0x33')+_0x2615b9+_0x4f5f54+'\x22\x20data-qdssr-title=\x22'+_0x190216+'\x22>';_0x331b6b+='<option\x20value=\x22\x22></option>';_0x14b011?_0x331b6b+=_0x44c784(_0x2ef0f4[_0x9824('0x23')][_0x2615b9]):_0x190216=_0x2ef0f4[_0x9824('0x34')](_0x2615b9,_0x2ef0f4[_0x9824('0x23')],_0x2ef0f4[_0x9824('0x2d')]);_0x331b6b+=_0x9824('0x35');_0x8bb003=_0xf14b94(_0x331b6b);_0x8bb003[_0x9824('0x36')](_0x37977c);var _0x1aa0a0=_0x8bb003['find'](_0x9824('0x37'));_0x3db07e=_0x3db07e['add'](_0x1aa0a0);_0x14b011||_0x1aa0a0['attr']({'disabled':!0x0,'data-qdssr-str':_0x2ef0f4[_0x9824('0x23')][_0x2615b9]});_0x1aa0a0['select2']({'placeholder':_0x190216,'language':_0x9824('0x38')});_0x1aa0a0['bind'](_0x9824('0x39'),function(_0x88ec95,_0x66c952){var _0x3b5e97=_0xf14b94(this),_0x3a76f5=_0x37977c[_0x9824('0x12')](_0x9824('0x3a')+(parseInt(_0x3b5e97[_0x9824('0x14')](_0x9824('0x27'))||0x0,0xa)+0x1)+']'),_0x14b011=(_0x3b5e97[_0x9824('0x3b')]()||'')[_0x9824('0x17')]();_0x66c952||(_0x148761=!0x0);_0xf14b94(window)[_0x9824('0x3c')]('QuatroDigital.ssrChange',[_0x3a76f5,_0x148761]);!_0x3a76f5['length']&&(!_0x66c952||_0x148761&&_0x14b011['length'])&&(_0xf14b94(document[_0x9824('0x3d')])[_0x9824('0x29')]('qd-ssr-reloading'),_0x2ef0f4[_0x9824('0x3e')](_0x14b011));_0x14b011=_0x14b011['split']('#')[_0x9824('0x3f')]()[_0x9824('0x40')]('?');_0x14b011[0x1]=(_0x3a76f5[_0x9824('0x14')](_0x9824('0x41'))||'')+'&'+(_0x14b011[0x1]||'');_0xf14b94(document[_0x9824('0x3d')])['addClass'](_0x9824('0x42'));_0x8bb003[_0x9824('0x29')](_0x9824('0x43'));_0x431609+=0x1;_0xf14b94[_0x9824('0x44')]({'url':_0x14b011[_0x9824('0xc')]('?'),'dataType':_0x9824('0x45'),'success':function(_0x40e318){_0x3a76f5[_0x9824('0x46')](_0x9824('0x47'));_0x3a76f5[_0x9824('0x45')](_0x9824('0x48')+_0x44c784(_0x2ef0f4[_0x9824('0x49')](_0x40e318,_0x3a76f5)));_0x3a76f5['select2']({'placeholder':_0x3a76f5['attr'](_0x9824('0x4a'))});_0x3b5e97[_0x9824('0x3c')](_0x9824('0x4b'),[_0x3a76f5]);},'error':function(){_0x2ef0f4[_0x9824('0x4c')][_0x9824('0xd')](this,arguments);},'complete':function(){_0x8bb003[_0x9824('0x4d')](_0x9824('0x43'));--_0x431609;0x0==_0x431609&&_0xf14b94(document['body'])[_0x9824('0x4d')](_0x9824('0x42'));},'clearQueueDelay':null});});}return _0x3db07e;}catch(_0x44024d){_0x5a8f47(_0x9824('0x4e')+_0x44024d[_0x9824('0x2c')]);}},_0x2f5c16=function(_0x14f0c2,_0x1e0ef3,_0x357cad,_0x1099b5){_0x1e0ef3=_0x1e0ef3[_0x9824('0x4f')](_0x1e0ef3[_0x9824('0x2d')][_0x357cad]);null!==_0x1e0ef3&&(_0x1099b5=_0x1099b5||_0x14f0c2['find']('select[data-qdssr-ndx='+_0x357cad+']'),_0x1099b5[_0x9824('0x3b')](_0x1099b5[_0x9824('0x12')](_0x9824('0x50')+_0x1e0ef3+'\x27]')[_0x9824('0x3b')]())[_0x9824('0x3c')](_0x9824('0x39'),!0x0));},_0x44c784=function(_0x12165c){for(var _0x213e78='',_0x1ba246=0x0;_0x1ba246<_0x12165c[_0x9824('0x24')];_0x1ba246++)_0x213e78+=_0x9824('0x51')+(_0x12165c[_0x1ba246][0x1]||'')+_0x9824('0x52')+(_0x12165c[_0x1ba246][0x0]||'')[_0x9824('0x1b')](/\s\([0-9]+\)/,'')+'\x22>'+(_0x12165c[_0x1ba246][0x0]||'')+'</option>';return _0x213e78;};_0xf14b94['QD_SelectSmartResearch2'][_0x9824('0x53')]=function(){if(_0xf14b94[_0x9824('0x1')][_0x9824('0x53')][_0x9824('0x54')])return _0xf14b94[_0x9824('0x1')]['getCategory'][_0x9824('0x54')];var _0x5371cd=[],_0x432304=[];_0xf14b94(_0x9824('0x55'))[_0x9824('0x26')](function(){var _0x40b83b=_0xf14b94(this)[0x0]['innerHTML'];if(-0x1<_0x40b83b[_0x9824('0x20')](_0x9824('0x56')))return _0x5371cd=(decodeURIComponent((_0x40b83b[_0x9824('0x57')](/\/buscapagina([^\'\"]+)/i)||[''])['pop']())[_0x9824('0x57')](/fq=c:[^\&]+/i)||[''])['pop']()[_0x9824('0x40')](':')[_0x9824('0x58')]()[_0x9824('0x1b')](/(^\/|\/$)/g,'')[_0x9824('0x40')]('/'),!0x1;});for(var _0x5d60ad=0x0;_0x5d60ad<_0x5371cd[_0x9824('0x24')];_0x5d60ad++)_0x5371cd[_0x5d60ad][_0x9824('0x24')]&&_0x432304[_0x9824('0x15')](_0x5371cd[_0x5d60ad]);return _0xf14b94[_0x9824('0x1')][_0x9824('0x53')]['cache']=_0x432304;};_0xf14b94[_0x9824('0x1')][_0x9824('0x53')]['cache']=null;_0xf14b94['fn'][_0x9824('0x1')]=function(_0x5c9fbc){var _0x10e31a=_0xf14b94(this);if(!_0x10e31a[_0x9824('0x24')])return _0x10e31a;_0x5c9fbc=_0xf14b94[_0x9824('0x59')]({},_0x26c383,_0x5c9fbc);_0x10e31a[_0x9824('0x5a')]=new _0xf14b94[(_0x9824('0x1'))](_0x10e31a,_0x5c9fbc);return _0x10e31a;};_0xf14b94(function(){_0xf14b94('.qd_auto_select_smart_research_2')['QD_SelectSmartResearch2']();});}}(this));
