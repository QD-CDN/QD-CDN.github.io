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
var _0x60f3=['qd-am-last','neynoretnznfx%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','ite','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','.qd-am-collection','length','qd-am-banner-wrapper','parent','qd-am-collection-wrapper','qdAjax','url','html','img[alt=\x27','.box-banner','clone','insertBefore','hide','qd-am-content-loaded','text','trim','attr','data-qdam-value','[class*=\x27colunas\x27]','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','children',':not(ul)','qd-am-elem-','replaceSpecialChars','>li','>ul','qdAmAddNdx','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','add','qd-am-','-li','QuatroDigital.am.callback','extend','exec','.qd_amazing_menu_auto','getParent','closest','QD_amazingMenu','function','/qd-amazing-menu','QD\x20Amazing\x20Menu','undefined','error','info','alerta','toLowerCase','join','apply','warn','each','addClass','qd-am-li-','first','last'];(function(_0x462a24,_0x55b1be){var _0x57b0c9=function(_0x55c76d){while(--_0x55c76d){_0x462a24['push'](_0x462a24['shift']());}};_0x57b0c9(++_0x55b1be);}(_0x60f3,0xd4));var _0x360f=function(_0x3f9ea9,_0x19840d){_0x3f9ea9=_0x3f9ea9-0x0;var _0x291e7f=_0x60f3[_0x3f9ea9];return _0x291e7f;};(function(_0x1e8ce3){_0x1e8ce3['fn'][_0x360f('0x0')]=_0x1e8ce3['fn'][_0x360f('0x1')];}(jQuery));(function(_0x1a58b0){'use strict';var _0xb81f63,_0x5017c1,_0x10b2dd,_0x32d830;_0xb81f63=jQuery;if(typeof _0xb81f63['fn'][_0x360f('0x2')]===_0x360f('0x3'))return;_0x5017c1={'url':_0x360f('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0x22253b=_0x360f('0x5');var _0x371558=function(_0x49dcf0,_0x14204b){if('object'===typeof console&&_0x360f('0x6')!==typeof console[_0x360f('0x7')]&&'undefined'!==typeof console[_0x360f('0x8')]&&_0x360f('0x6')!==typeof console['warn']){var _0xeb890a;'object'===typeof _0x49dcf0?(_0x49dcf0['unshift']('['+_0x22253b+']\x0a'),_0xeb890a=_0x49dcf0):_0xeb890a=['['+_0x22253b+']\x0a'+_0x49dcf0];if(_0x360f('0x6')===typeof _0x14204b||_0x360f('0x9')!==_0x14204b['toLowerCase']()&&'aviso'!==_0x14204b[_0x360f('0xa')]())if(_0x360f('0x6')!==typeof _0x14204b&&'info'===_0x14204b['toLowerCase']())try{console[_0x360f('0x8')]['apply'](console,_0xeb890a);}catch(_0x4ab9e0){try{console[_0x360f('0x8')](_0xeb890a[_0x360f('0xb')]('\x0a'));}catch(_0x38f846){}}else try{console[_0x360f('0x7')][_0x360f('0xc')](console,_0xeb890a);}catch(_0x257015){try{console[_0x360f('0x7')](_0xeb890a[_0x360f('0xb')]('\x0a'));}catch(_0x3bfd73){}}else try{console[_0x360f('0xd')][_0x360f('0xc')](console,_0xeb890a);}catch(_0x567395){try{console['warn'](_0xeb890a[_0x360f('0xb')]('\x0a'));}catch(_0x2e3f8d){}}}};_0xb81f63['fn']['qdAmAddNdx']=function(){var _0x54aa0e=_0xb81f63(this);_0x54aa0e[_0x360f('0xe')](function(_0x5cbd19){_0xb81f63(this)[_0x360f('0xf')](_0x360f('0x10')+_0x5cbd19);});_0x54aa0e[_0x360f('0x11')]()[_0x360f('0xf')]('qd-am-first');_0x54aa0e[_0x360f('0x12')]()[_0x360f('0xf')](_0x360f('0x13'));return _0x54aa0e;};_0xb81f63['fn'][_0x360f('0x2')]=function(){};var _0x38810f=function(_0xdb7b13){var _0x967ba5={'p':_0x360f('0x14')};return function(_0x514fba){var _0x2565a9,_0x738ade,_0x12386d,_0x5d0f78;_0x738ade=function(_0x4ce419){return _0x4ce419;};_0x12386d=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x514fba=_0x514fba['d'+_0x12386d[0x10]+'c'+_0x12386d[0x11]+'m'+_0x738ade(_0x12386d[0x1])+'n'+_0x12386d[0xd]]['l'+_0x12386d[0x12]+'c'+_0x12386d[0x0]+'ti'+_0x738ade('o')+'n'];_0x2565a9=function(_0x5d41b7){return escape(encodeURIComponent(_0x5d41b7['replace'](/\./g,'¨')[_0x360f('0x15')](/[a-zA-Z]/g,function(_0x5cfc67){return String[_0x360f('0x16')](('Z'>=_0x5cfc67?0x5a:0x7a)>=(_0x5cfc67=_0x5cfc67[_0x360f('0x17')](0x0)+0xd)?_0x5cfc67:_0x5cfc67-0x1a);})));};var _0x2a617c=_0x2565a9(_0x514fba[[_0x12386d[0x9],_0x738ade('o'),_0x12386d[0xc],_0x12386d[_0x738ade(0xd)]]['join']('')]);_0x2565a9=_0x2565a9((window[['js',_0x738ade('no'),'m',_0x12386d[0x1],_0x12386d[0x4]['toUpperCase'](),_0x360f('0x18')]['join']('')]||'---')+['.v',_0x12386d[0xd],'e',_0x738ade('x'),'co',_0x738ade('mm'),'erc',_0x12386d[0x1],'.c',_0x738ade('o'),'m.',_0x12386d[0x13],'r'][_0x360f('0xb')](''));for(var _0x16a6d3 in _0x967ba5){if(_0x2565a9===_0x16a6d3+_0x967ba5[_0x16a6d3]||_0x2a617c===_0x16a6d3+_0x967ba5[_0x16a6d3]){_0x5d0f78='tr'+_0x12386d[0x11]+'e';break;}_0x5d0f78='f'+_0x12386d[0x0]+'ls'+_0x738ade(_0x12386d[0x1])+'';}_0x738ade=!0x1;-0x1<_0x514fba[[_0x12386d[0xc],'e',_0x12386d[0x0],'rc',_0x12386d[0x9]][_0x360f('0xb')]('')][_0x360f('0x19')](_0x360f('0x1a'))&&(_0x738ade=!0x0);return[_0x5d0f78,_0x738ade];}(_0xdb7b13);}(window);if(!eval(_0x38810f[0x0]))return _0x38810f[0x1]?_0x371558(_0x360f('0x1b')):!0x1;_0x32d830=function(_0x3e2729){var _0x515043,_0x65c00,_0x4bd764;_0x4bd764=_0x3e2729[_0x360f('0x1c')](_0x360f('0x1d'));_0x515043=_0x4bd764[_0x360f('0x1e')]('.qd-am-banner');_0x65c00=_0x4bd764['filter'](_0x360f('0x1f'));if(!(_0x515043[_0x360f('0x20')]||_0x65c00['length']))return;_0x515043['parent']()[_0x360f('0xf')](_0x360f('0x21'));_0x65c00[_0x360f('0x22')]()[_0x360f('0xf')](_0x360f('0x23'));_0xb81f63[_0x360f('0x24')]({'url':_0x10b2dd[_0x360f('0x25')],'dataType':_0x360f('0x26'),'success':function(_0x2d3317){var _0x2630a7=_0xb81f63(_0x2d3317);_0x515043[_0x360f('0xe')](function(){var _0xa92e77,_0x46247e;_0x46247e=_0xb81f63(this);_0xa92e77=_0x2630a7[_0x360f('0x1c')](_0x360f('0x27')+_0x46247e['attr']('data-qdam-value')+'\x27]');if(!_0xa92e77[_0x360f('0x20')])return;_0xa92e77[_0x360f('0xe')](function(){_0xb81f63(this)[_0x360f('0x0')](_0x360f('0x28'))[_0x360f('0x29')]()[_0x360f('0x2a')](_0x46247e);});_0x46247e[_0x360f('0x2b')]();})[_0x360f('0xf')](_0x360f('0x2c'));_0x65c00['each'](function(){var _0x1bcfaf={},_0x165187;_0x165187=_0xb81f63(this);_0x2630a7[_0x360f('0x1c')]('h2')[_0x360f('0xe')](function(){if(_0xb81f63(this)[_0x360f('0x2d')]()[_0x360f('0x2e')]()[_0x360f('0xa')]()==_0x165187[_0x360f('0x2f')](_0x360f('0x30'))['trim']()[_0x360f('0xa')]()){_0x1bcfaf=_0xb81f63(this);return![];}});if(!_0x1bcfaf[_0x360f('0x20')])return;_0x1bcfaf['each'](function(){_0xb81f63(this)[_0x360f('0x0')](_0x360f('0x31'))[_0x360f('0x29')]()['insertBefore'](_0x165187);});_0x165187['hide']();})[_0x360f('0xf')]('qd-am-content-loaded');},'error':function(){_0x371558(_0x360f('0x32')+_0x10b2dd[_0x360f('0x25')]+_0x360f('0x33'));},'complete':function(){_0x10b2dd[_0x360f('0x34')][_0x360f('0x35')](this);_0xb81f63(window)[_0x360f('0x36')](_0x360f('0x37'),_0x3e2729);},'clearQueueDelay':0xbb8});};_0xb81f63[_0x360f('0x2')]=function(_0x53e75c){var _0x18a038=_0x53e75c[_0x360f('0x1c')](_0x360f('0x38'))[_0x360f('0xe')](function(){var _0x1ea817,_0x2f5cf9,_0x2bcb3e,_0xd47038;_0x1ea817=_0xb81f63(this);if(!_0x1ea817[_0x360f('0x20')])return _0x371558([_0x360f('0x39'),_0x53e75c],'alerta');_0x1ea817['find'](_0x360f('0x3a'))['parent']()[_0x360f('0xf')](_0x360f('0x3b'));_0x1ea817[_0x360f('0x1c')]('li')[_0x360f('0xe')](function(){var _0x5581a0=_0xb81f63(this),_0x56accd;_0x56accd=_0x5581a0[_0x360f('0x3c')](_0x360f('0x3d'));if(!_0x56accd[_0x360f('0x20')])return;_0x5581a0[_0x360f('0xf')](_0x360f('0x3e')+_0x56accd[_0x360f('0x11')]()[_0x360f('0x2d')]()[_0x360f('0x2e')]()[_0x360f('0x3f')]()[_0x360f('0x15')](/\./g,'')['replace'](/\s/g,'-')['toLowerCase']());});_0x2f5cf9=_0x1ea817[_0x360f('0x1c')](_0x360f('0x40'))['qdAmAddNdx']();_0x1ea817[_0x360f('0xf')]('qd-amazing-menu');_0x2bcb3e=_0x2f5cf9[_0x360f('0x1c')](_0x360f('0x41'));_0x2bcb3e['each'](function(){var _0x24a111=_0xb81f63(this),_0x1b2cf1;_0x1b2cf1=_0x24a111[_0x360f('0x1c')](_0x360f('0x40'))[_0x360f('0x42')]()[_0x360f('0xf')]('qd-am-column');_0x24a111['addClass'](_0x360f('0x43'));_0x24a111[_0x360f('0x22')]()[_0x360f('0xf')](_0x360f('0x44'));});_0x2bcb3e[_0x360f('0xf')]('qd-am-dropdown');var _0x40c47a=0x0;var _0x26983b=function(_0x2d0208){_0x40c47a=_0x40c47a+0x1;var _0x55389c=_0x2d0208[_0x360f('0x3c')]('li');var _0x2d42fe=_0x55389c['children']('*');if(!_0x2d42fe['length'])return;_0x2d42fe[_0x360f('0xf')](_0x360f('0x45')+_0x40c47a);_0x26983b(_0x2d42fe);};_0x26983b(_0x1ea817);_0x1ea817[_0x360f('0x46')](_0x1ea817[_0x360f('0x1c')]('ul'))[_0x360f('0xe')](function(){var _0x11a702=_0xb81f63(this);_0x11a702['addClass'](_0x360f('0x47')+_0x11a702['children']('li')[_0x360f('0x20')]+_0x360f('0x48'));});});_0x32d830(_0x18a038);_0x10b2dd['callback'][_0x360f('0x35')](this);_0xb81f63(window)[_0x360f('0x36')](_0x360f('0x49'),_0x53e75c);};_0xb81f63['fn'][_0x360f('0x2')]=function(_0x4ecc9b){var _0x2a0afc=_0xb81f63(this);if(!_0x2a0afc[_0x360f('0x20')])return _0x2a0afc;_0x10b2dd=_0xb81f63[_0x360f('0x4a')]({},_0x5017c1,_0x4ecc9b);_0x2a0afc[_0x360f('0x4b')]=new _0xb81f63[(_0x360f('0x2'))](_0xb81f63(this));return _0x2a0afc;};_0xb81f63(function(){_0xb81f63(_0x360f('0x4c'))[_0x360f('0x2')]();});}(this));

// smart cart
var _0x5237=['.qd-ddc-cep','mouseenter.qd_ddc_hover','getCartInfoByUrl','cartIsEmpty','mouseleave.qd_ddc_hover','each','call','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','Atenção,\x20você\x20esta\x20utilizando\x20um\x20método\x20descontinuado','items','dataOptionsCache','timeRemoveNewItemClass','qd-ddc-prodLoaded','smartCheckout','_QuatroDigital_AmountProduct','exec','.qd-ddc-wrapper','addClass','getOrderForm','QD_checkoutQueue','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','.qd-ddc-prodRow','qd-ddc-noItems','renderProductsList','.qd-ddc-prodWrapper2','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22>','</div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22>','<div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a>','<input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a>','<span\x20class=\x22qd-ddc-qttLoading\x22></span>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a>','<span\x20class=\x22qd-ddc-prodRowLoading\x22></span>','empty','attr','qd-ddc-','availability','.qd-ddc-prodName','append','sellingPrice','Grátis','content','.qd-ddc-quantity','val','quantity','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','aviso','actionButtons','lastSku','filter','[data-sku=\x27','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-product-add-time','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','string','qd-loaded','load','src','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','keyup.qd_ddc_change','click.qd_ddc_remove','removeProduct','stop','slideUp','remove','$1-$2$3','shippingCalculate','qdDdcLastPostalCode','done','.qd-ddc-cep-tooltip-text','logisticsInfo','slas','<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>','shippingEstimate','\x20dia\x20útil','<tr></tr>','<td>\x20R$\x20',',\x20entrega\x20em\x20','tbody','insertBefore','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','boolean','simpleCart','removeItems','totalizers','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','avisso','buyButtonClicked','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','allowRecalculate','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','.qd-bap-wrapper','.qd-bap-qtt','qtt','.qd_bap_wrapper_content','prepend','productId','prod_','prodId','ajaxStop','Quatro\x20Digital\x20-\x20Plus\x20Smart\x20Cart','.qdDdcContainer','extend','selector','dropDown','updateOnlyHover','buyButton','QD_buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','closest','replace','abs','undefined','round','toFixed','split','length','join','_QuatroDigital_CartData','callback','error','function','Oooops!\x20','message','Quatro\x20Digital\x20-\x20DropDown\x20Cart','object','info','warn','unshift','alerta','toLowerCase','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','fromCharCode','charCodeAt','toUpperCase','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','name','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','checkout','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22>','<div\x20class=\x22qd-ddc-wrapper2\x22>','<div\x20class=\x22qd_ddc_lightBoxClose\x22></div>','<div\x20class=\x22qd-ddc-wrapper3\x22>','<div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div>','<div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div>','<span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div>','<div\x20class=\x22qd-ddc-infoBts\x22>','<a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a>','</div></div></div></div></div>','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','.qd-ddc-viewCart','html','.qd_ddc_continueShopping','continueShopping','find','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','emptyCart','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','removeClass','qd-bb-lightBoxProdAdd','body','off','keyup.qd_ddc_closeFn','keyCode','qd-bb-lightBoxBodyProdAdd','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','scrollCart','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text','.qd-ddc-shipping\x20.qd-ddc-cep','.qd-ddc-shipping\x20.qd-ddc-cep-ok','.qd-ddc-cep-btn','click','.qd-ddc-cep-close','preventDefault','hide','click._QD_DDC_closeShipping','target','.qd-ddc-cep-tooltip','.qd-ddc-cep-ok'];(function(_0x5964d0,_0x29908b){var _0x380c9b=function(_0x10c70b){while(--_0x10c70b){_0x5964d0['push'](_0x5964d0['shift']());}};_0x380c9b(++_0x29908b);}(_0x5237,0x19b));var _0x7523=function(_0x136dff,_0x13b18e){_0x136dff=_0x136dff-0x0;var _0xf05101=_0x5237[_0x136dff];return _0xf05101;};(function(_0x3275a3){_0x3275a3['fn'][_0x7523('0x0')]=_0x3275a3['fn'][_0x7523('0x1')];}(jQuery));function qd_number_format(_0x409f9c,_0x489615,_0x44055e,_0x24ecb7){_0x409f9c=(_0x409f9c+'')[_0x7523('0x2')](/[^0-9+\-Ee.]/g,'');_0x409f9c=isFinite(+_0x409f9c)?+_0x409f9c:0x0;_0x489615=isFinite(+_0x489615)?Math[_0x7523('0x3')](_0x489615):0x0;_0x24ecb7=_0x7523('0x4')===typeof _0x24ecb7?',':_0x24ecb7;_0x44055e=_0x7523('0x4')===typeof _0x44055e?'.':_0x44055e;var _0x151e7d='',_0x151e7d=function(_0xeb63ea,_0x2848cd){var _0x489615=Math['pow'](0xa,_0x2848cd);return''+(Math[_0x7523('0x5')](_0xeb63ea*_0x489615)/_0x489615)[_0x7523('0x6')](_0x2848cd);},_0x151e7d=(_0x489615?_0x151e7d(_0x409f9c,_0x489615):''+Math[_0x7523('0x5')](_0x409f9c))[_0x7523('0x7')]('.');0x3<_0x151e7d[0x0][_0x7523('0x8')]&&(_0x151e7d[0x0]=_0x151e7d[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x24ecb7));(_0x151e7d[0x1]||'')[_0x7523('0x8')]<_0x489615&&(_0x151e7d[0x1]=_0x151e7d[0x1]||'',_0x151e7d[0x1]+=Array(_0x489615-_0x151e7d[0x1][_0x7523('0x8')]+0x1)[_0x7523('0x9')]('0'));return _0x151e7d[_0x7523('0x9')](_0x44055e);};(function(){'use strict';try{window['_QuatroDigital_CartData']=window[_0x7523('0xa')]||{};window['_QuatroDigital_CartData'][_0x7523('0xb')]=window[_0x7523('0xa')][_0x7523('0xb')]||$['Callbacks']();}catch(_0x3ed24a){if(typeof console!==_0x7523('0x4')&&typeof console[_0x7523('0xc')]===_0x7523('0xd'))console[_0x7523('0xc')](_0x7523('0xe'),_0x3ed24a[_0x7523('0xf')]);}}());(function(_0x500b4a){'use strict';try{var _0x93dc5f=jQuery;var _0x280555=_0x7523('0x10');var _0x58e0ee=function(_0x41f3ac,_0x57a283){if(_0x7523('0x11')===typeof console&&_0x7523('0x4')!==typeof console[_0x7523('0xc')]&&_0x7523('0x4')!==typeof console[_0x7523('0x12')]&&_0x7523('0x4')!==typeof console[_0x7523('0x13')]){var _0x5b90ad;'object'===typeof _0x41f3ac?(_0x41f3ac[_0x7523('0x14')]('['+_0x280555+']\x0a'),_0x5b90ad=_0x41f3ac):_0x5b90ad=['['+_0x280555+']\x0a'+_0x41f3ac];if(_0x7523('0x4')===typeof _0x57a283||_0x7523('0x15')!==_0x57a283[_0x7523('0x16')]()&&'aviso'!==_0x57a283[_0x7523('0x16')]())if(_0x7523('0x4')!==typeof _0x57a283&&_0x7523('0x12')===_0x57a283[_0x7523('0x16')]())try{console[_0x7523('0x12')][_0x7523('0x17')](console,_0x5b90ad);}catch(_0x53d138){try{console[_0x7523('0x12')](_0x5b90ad[_0x7523('0x9')]('\x0a'));}catch(_0x83cac3){}}else try{console[_0x7523('0xc')][_0x7523('0x17')](console,_0x5b90ad);}catch(_0x3ec049){try{console[_0x7523('0xc')](_0x5b90ad[_0x7523('0x9')]('\x0a'));}catch(_0x223e48){}}else try{console[_0x7523('0x13')][_0x7523('0x17')](console,_0x5b90ad);}catch(_0x35fe6){try{console['warn'](_0x5b90ad[_0x7523('0x9')]('\x0a'));}catch(_0x2d626c){}}}};window['_QuatroDigital_DropDown']=window[_0x7523('0x18')]||{};window['_QuatroDigital_DropDown'][_0x7523('0x19')]=!![];_0x93dc5f[_0x7523('0x1a')]=function(){};_0x93dc5f['fn'][_0x7523('0x1a')]=function(){return{'fn':new _0x93dc5f()};};var _0x54fbc5=function(_0xea6d1d){var _0x3a7cc6={'p':'neynoretnznfx%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x3eea2d){var _0x109ea9,_0x553360,_0x4dba9a,_0x57982f;_0x553360=function(_0x41bee5){return _0x41bee5;};_0x4dba9a=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3eea2d=_0x3eea2d['d'+_0x4dba9a[0x10]+'c'+_0x4dba9a[0x11]+'m'+_0x553360(_0x4dba9a[0x1])+'n'+_0x4dba9a[0xd]]['l'+_0x4dba9a[0x12]+'c'+_0x4dba9a[0x0]+'ti'+_0x553360('o')+'n'];_0x109ea9=function(_0x603598){return escape(encodeURIComponent(_0x603598[_0x7523('0x2')](/\./g,'¨')[_0x7523('0x2')](/[a-zA-Z]/g,function(_0x34f229){return String[_0x7523('0x1b')](('Z'>=_0x34f229?0x5a:0x7a)>=(_0x34f229=_0x34f229[_0x7523('0x1c')](0x0)+0xd)?_0x34f229:_0x34f229-0x1a);})));};var _0xf23056=_0x109ea9(_0x3eea2d[[_0x4dba9a[0x9],_0x553360('o'),_0x4dba9a[0xc],_0x4dba9a[_0x553360(0xd)]]['join']('')]);_0x109ea9=_0x109ea9((window[['js',_0x553360('no'),'m',_0x4dba9a[0x1],_0x4dba9a[0x4][_0x7523('0x1d')](),'ite'][_0x7523('0x9')]('')]||_0x7523('0x1e'))+['.v',_0x4dba9a[0xd],'e',_0x553360('x'),'co',_0x553360('mm'),_0x7523('0x1f'),_0x4dba9a[0x1],'.c',_0x553360('o'),'m.',_0x4dba9a[0x13],'r']['join'](''));for(var _0x17803e in _0x3a7cc6){if(_0x109ea9===_0x17803e+_0x3a7cc6[_0x17803e]||_0xf23056===_0x17803e+_0x3a7cc6[_0x17803e]){_0x57982f='tr'+_0x4dba9a[0x11]+'e';break;}_0x57982f='f'+_0x4dba9a[0x0]+'ls'+_0x553360(_0x4dba9a[0x1])+'';}_0x553360=!0x1;-0x1<_0x3eea2d[[_0x4dba9a[0xc],'e',_0x4dba9a[0x0],'rc',_0x4dba9a[0x9]][_0x7523('0x9')]('')][_0x7523('0x20')](_0x7523('0x21'))&&(_0x553360=!0x0);return[_0x57982f,_0x553360];}(_0xea6d1d);}(window);if(!eval(_0x54fbc5[0x0]))return _0x54fbc5[0x1]?_0x58e0ee(_0x7523('0x22')):!0x1;_0x93dc5f['QD_dropDownCart']=function(_0x456a05,_0x1481d4){var _0x5c5360,_0x1344d3,_0x13a113,_0x4da67f,_0x286d30,_0x58e021,_0x1e08cf,_0xad809d,_0x257b61,_0x2c3438,_0x2d928b,_0x184f68;_0x2d928b=_0x93dc5f(_0x456a05);if(!_0x2d928b[_0x7523('0x8')])return _0x2d928b;_0x5c5360={'updateOnlyHover':!![],'texts':{'linkCart':_0x7523('0x23'),'linkCheckout':'Finalizar\x20Compra','cartTotal':_0x7523('0x24'),'emptyCart':_0x7523('0x25'),'continueShopping':_0x7523('0x26'),'shippingForm':'<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!![],'forceImageHTTPS':![],'skuName':function(_0xcec7eb){return _0xcec7eb['skuName']||_0xcec7eb[_0x7523('0x27')];},'callback':function(){},'callbackProductsList':function(){}};_0x1344d3=_0x93dc5f['extend'](!![],{},_0x5c5360,_0x1481d4);_0x13a113=_0x93dc5f('');_0x2c3438=this;if(_0x1344d3['smartCheckout']){var _0x1a6983=![];if(typeof window[_0x7523('0x28')]===_0x7523('0x4')){_0x58e0ee(_0x7523('0x29'));_0x93dc5f['ajax']({'url':_0x7523('0x2a'),'async':![],'dataType':'script','error':function(){_0x58e0ee(_0x7523('0x2b'));_0x1a6983=!![];}});}if(_0x1a6983)return _0x58e0ee('A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!');}var _0x4919a2;if(typeof window[_0x7523('0x28')]===_0x7523('0x11')&&typeof window['vtexjs'][_0x7523('0x2c')]!==_0x7523('0x4'))_0x4919a2=window[_0x7523('0x28')]['checkout'];else if(typeof vtex===_0x7523('0x11')&&typeof vtex[_0x7523('0x2c')]===_0x7523('0x11')&&typeof vtex[_0x7523('0x2c')]['SDK']!==_0x7523('0x4'))_0x4919a2=new vtex['checkout']['SDK']();else return _0x58e0ee(_0x7523('0x2d'));_0x2c3438[_0x7523('0x2e')]=_0x7523('0x2f')+_0x7523('0x30')+_0x7523('0x31')+_0x7523('0x32')+_0x7523('0x33')+_0x7523('0x34')+_0x7523('0x35')+'<div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22>'+'<div\x20class=\x22qd-ddc-shipping\x22></div>'+'<div\x20class=\x22qd-ddc-infoTotal\x22></div>'+_0x7523('0x36')+_0x7523('0x37')+_0x7523('0x38');_0x58e021=function(_0xf4668c){var _0x21673e=_0x93dc5f(_0xf4668c);_0x1344d3[_0x7523('0x39')][_0x7523('0x3a')]=_0x1344d3['texts']['cartTotal'][_0x7523('0x2')](_0x7523('0x3b'),_0x7523('0x3c'));_0x1344d3['texts'][_0x7523('0x3a')]=_0x1344d3[_0x7523('0x39')][_0x7523('0x3a')][_0x7523('0x2')](_0x7523('0x3d'),_0x7523('0x3e'));_0x1344d3[_0x7523('0x39')][_0x7523('0x3a')]=_0x1344d3[_0x7523('0x39')][_0x7523('0x3a')][_0x7523('0x2')](_0x7523('0x3f'),_0x7523('0x40'));_0x1344d3[_0x7523('0x39')]['cartTotal']=_0x1344d3['texts'][_0x7523('0x3a')][_0x7523('0x2')](_0x7523('0x41'),'<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0x21673e['find'](_0x7523('0x42'))[_0x7523('0x43')](_0x1344d3[_0x7523('0x39')]['linkCart']);_0x21673e['find'](_0x7523('0x44'))[_0x7523('0x43')](_0x1344d3[_0x7523('0x39')][_0x7523('0x45')]);_0x21673e[_0x7523('0x46')]('.qd-ddc-checkout')['html'](_0x1344d3[_0x7523('0x39')][_0x7523('0x47')]);_0x21673e[_0x7523('0x46')](_0x7523('0x48'))[_0x7523('0x43')](_0x1344d3['texts'][_0x7523('0x3a')]);_0x21673e[_0x7523('0x46')](_0x7523('0x49'))['html'](_0x1344d3['texts'][_0x7523('0x4a')]);_0x21673e[_0x7523('0x46')]('.qd-ddc-emptyCart\x20p')[_0x7523('0x43')](_0x1344d3[_0x7523('0x39')][_0x7523('0x4b')]);return _0x21673e;};_0x286d30=function(_0x3c2920){_0x93dc5f(this)['append'](_0x3c2920);_0x3c2920[_0x7523('0x46')](_0x7523('0x4c'))[_0x7523('0x4d')](_0x93dc5f(_0x7523('0x4e')))['on'](_0x7523('0x4f'),function(){_0x2d928b[_0x7523('0x50')](_0x7523('0x51'));_0x93dc5f(document[_0x7523('0x52')])[_0x7523('0x50')]('qd-bb-lightBoxBodyProdAdd');});_0x93dc5f(document)[_0x7523('0x53')](_0x7523('0x54'))['on'](_0x7523('0x54'),function(_0x5d9b11){if(_0x5d9b11[_0x7523('0x55')]==0x1b){_0x2d928b[_0x7523('0x50')]('qd-bb-lightBoxProdAdd');_0x93dc5f(document[_0x7523('0x52')])[_0x7523('0x50')](_0x7523('0x56'));}});var _0x403f27=_0x3c2920[_0x7523('0x46')](_0x7523('0x57'));_0x3c2920[_0x7523('0x46')](_0x7523('0x58'))['on']('click.qd_ddc_scrollUp',function(){_0x2c3438[_0x7523('0x59')]('-',undefined,undefined,_0x403f27);return![];});_0x3c2920['find']('.qd-ddc-scrollDown')['on'](_0x7523('0x5a'),function(){_0x2c3438['scrollCart'](undefined,undefined,undefined,_0x403f27);return![];});var _0xd8e5f6=_0x3c2920[_0x7523('0x46')](_0x7523('0x5b'));_0x3c2920[_0x7523('0x46')](_0x7523('0x5c'))['val']('')['on']('keyup.qd_ddc_cep',function(_0x5e0b39){_0x2c3438['formatCepField'](_0x93dc5f(this));if(_0x5e0b39[_0x7523('0x55')]==0xd)_0x3c2920[_0x7523('0x46')](_0x7523('0x5d'))['click']();});_0x3c2920['find'](_0x7523('0x5e'))[_0x7523('0x5f')](function(_0x24b1ed){_0x24b1ed['preventDefault']();_0xd8e5f6['toggle']();});_0x3c2920[_0x7523('0x46')](_0x7523('0x60'))['click'](function(_0x194a48){_0x194a48[_0x7523('0x61')]();_0xd8e5f6[_0x7523('0x62')]();});_0x93dc5f(document)[_0x7523('0x53')](_0x7523('0x63'))['on'](_0x7523('0x63'),function(_0x2cca91){if(_0x93dc5f(_0x2cca91[_0x7523('0x64')])[_0x7523('0x1')](_0x3c2920[_0x7523('0x46')](_0x7523('0x65')))['length'])return;_0xd8e5f6[_0x7523('0x62')]();});_0x3c2920[_0x7523('0x46')](_0x7523('0x66'))['click'](function(_0x3bc16c){_0x3bc16c[_0x7523('0x61')]();_0x2c3438['shippingCalculate'](_0x3c2920[_0x7523('0x46')](_0x7523('0x67')));});if(_0x1344d3['updateOnlyHover']){var _0x5d235e=0x0;_0x93dc5f(this)['on'](_0x7523('0x68'),function(){var _0x5a28e7=function(){if(!window['_QuatroDigital_DropDown'][_0x7523('0x19')])return;_0x2c3438[_0x7523('0x69')]();window[_0x7523('0x18')][_0x7523('0x19')]=![];_0x93dc5f['fn']['simpleCart'](!![]);_0x2c3438[_0x7523('0x6a')]();};_0x5d235e=setInterval(function(){_0x5a28e7();},0x258);_0x5a28e7();});_0x93dc5f(this)['on'](_0x7523('0x6b'),function(){clearInterval(_0x5d235e);});}};_0x1e08cf=_0x58e021(this[_0x7523('0x2e')]);_0xad809d=0x0;_0x2d928b[_0x7523('0x6c')](function(){if(_0xad809d>0x0)_0x286d30[_0x7523('0x6d')](this,_0x1e08cf[_0x7523('0x6e')]());else _0x286d30[_0x7523('0x6d')](this,_0x1e08cf);_0xad809d++;});window['_QuatroDigital_CartData'][_0x7523('0xb')][_0x7523('0x4d')](function(){_0x93dc5f(_0x7523('0x6f'))[_0x7523('0x43')](window[_0x7523('0xa')]['total']||'--');_0x93dc5f('.qd-ddc-infoTotalItems')[_0x7523('0x43')](window[_0x7523('0xa')]['qtt']||'0');_0x93dc5f(_0x7523('0x70'))[_0x7523('0x43')](window[_0x7523('0xa')][_0x7523('0x71')]||'--');_0x93dc5f(_0x7523('0x72'))['html'](window['_QuatroDigital_CartData']['allTotal']||'--');});_0x257b61=function(_0x2fb1b8){_0x58e0ee(_0x7523('0x73'));};_0x184f68=function(_0xde859f,_0x144f6b){if(typeof _0xde859f[_0x7523('0x74')]===_0x7523('0x4'))return _0x58e0ee('Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição');_0x2c3438['renderProductsList'][_0x7523('0x6d')](this,_0x144f6b);};_0x2c3438[_0x7523('0x69')]=function(_0x51bddd,_0x24975a){var _0x1176e9;if(typeof _0x24975a!=_0x7523('0x4'))window[_0x7523('0x18')][_0x7523('0x75')]=_0x24975a;else if(window[_0x7523('0x18')]['dataOptionsCache'])_0x24975a=window[_0x7523('0x18')][_0x7523('0x75')];setTimeout(function(){window[_0x7523('0x18')][_0x7523('0x75')]=undefined;},_0x1344d3[_0x7523('0x76')]);_0x93dc5f('.qd-ddc-wrapper')['removeClass'](_0x7523('0x77'));if(_0x1344d3[_0x7523('0x78')]){_0x1176e9=function(_0x4deb0a){window[_0x7523('0x18')]['getOrderForm']=_0x4deb0a;_0x184f68(_0x4deb0a,_0x24975a);if(typeof window['_QuatroDigital_AmountProduct']!==_0x7523('0x4')&&typeof window[_0x7523('0x79')][_0x7523('0x7a')]==='function')window['_QuatroDigital_AmountProduct'][_0x7523('0x7a')][_0x7523('0x6d')](this);_0x93dc5f(_0x7523('0x7b'))[_0x7523('0x7c')](_0x7523('0x77'));};if(typeof window['_QuatroDigital_DropDown']['getOrderForm']!==_0x7523('0x4')){_0x1176e9(window[_0x7523('0x18')][_0x7523('0x7d')]);if(typeof _0x51bddd===_0x7523('0xd'))_0x51bddd(window[_0x7523('0x18')]['getOrderForm']);return;}_0x93dc5f[_0x7523('0x7e')]([_0x7523('0x74'),'totalizers',_0x7523('0x7f')],{'done':function(_0x10e44d){_0x1176e9[_0x7523('0x6d')](this,_0x10e44d);if(typeof _0x51bddd==='function')_0x51bddd(_0x10e44d);},'fail':function(_0x5f1c59){_0x58e0ee([_0x7523('0x80'),_0x5f1c59]);}});}else{alert('Este\x20método\x20esta\x20descontinuado!');}};_0x2c3438[_0x7523('0x6a')]=function(){var _0x34e343=_0x93dc5f(_0x7523('0x7b'));if(_0x34e343[_0x7523('0x46')](_0x7523('0x81'))[_0x7523('0x8')])_0x34e343['removeClass'](_0x7523('0x82'));else _0x34e343[_0x7523('0x7c')](_0x7523('0x82'));};_0x2c3438[_0x7523('0x83')]=function(_0x3ab9b6){var _0x1149ac=_0x93dc5f(_0x7523('0x84'));var _0x4f93d1=_0x7523('0x85')+_0x7523('0x86')+'<div\x20class=\x22qd-ddc-prodImgWrapper\x22>'+'<img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/>'+'<span\x20class=\x22qd-ddc-imgLoading\x22></span>'+_0x7523('0x87')+_0x7523('0x87')+_0x7523('0x88')+_0x7523('0x89')+_0x7523('0x8a')+_0x7523('0x8b')+_0x7523('0x8c')+_0x7523('0x8d')+_0x7523('0x8e')+_0x7523('0x8f')+_0x7523('0x87')+'</div>'+_0x7523('0x90')+'<div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22>'+_0x7523('0x91')+_0x7523('0x92')+'</div>'+_0x7523('0x87')+_0x7523('0x87');_0x1149ac[_0x7523('0x93')]();_0x1149ac[_0x7523('0x6c')](function(){var _0x4525fc=_0x93dc5f(this);var _0x440492,_0x1d2d64,_0x21a8b7,_0x2773f2;var _0x3f85f1=_0x93dc5f('');var _0x5a4499;for(var _0x1c87a7 in window['_QuatroDigital_DropDown'][_0x7523('0x7d')][_0x7523('0x74')]){if(typeof window[_0x7523('0x18')][_0x7523('0x7d')]['items'][_0x1c87a7]!==_0x7523('0x11'))continue;_0x21a8b7=window[_0x7523('0x18')][_0x7523('0x7d')][_0x7523('0x74')][_0x1c87a7];_0x5a4499=_0x21a8b7['productCategoryIds']['replace'](/^\/|\/$/g,'')[_0x7523('0x7')]('/');_0x1d2d64=_0x93dc5f(_0x4f93d1);_0x1d2d64[_0x7523('0x94')]({'data-sku':_0x21a8b7['id'],'data-sku-index':_0x1c87a7,'data-qd-departament':_0x5a4499[0x0],'data-qd-category':_0x5a4499[_0x5a4499[_0x7523('0x8')]-0x1]});_0x1d2d64[_0x7523('0x7c')](_0x7523('0x95')+_0x21a8b7[_0x7523('0x96')]);_0x1d2d64[_0x7523('0x46')](_0x7523('0x97'))[_0x7523('0x98')](_0x1344d3['skuName'](_0x21a8b7));_0x1d2d64['find']('.qd-ddc-prodPrice')[_0x7523('0x98')](isNaN(_0x21a8b7[_0x7523('0x99')])?_0x21a8b7[_0x7523('0x99')]:_0x21a8b7[_0x7523('0x99')]==0x0?_0x7523('0x9a'):(_0x93dc5f('meta[name=currency]')[_0x7523('0x94')](_0x7523('0x9b'))||'R$')+'\x20'+qd_number_format(_0x21a8b7[_0x7523('0x99')]/0x64,0x2,',','.'));_0x1d2d64[_0x7523('0x46')](_0x7523('0x9c'))[_0x7523('0x94')]({'data-sku':_0x21a8b7['id'],'data-sku-index':_0x1c87a7})[_0x7523('0x9d')](_0x21a8b7[_0x7523('0x9e')]);_0x1d2d64[_0x7523('0x46')]('.qd-ddc-remove')[_0x7523('0x94')]({'data-sku':_0x21a8b7['id'],'data-sku-index':_0x1c87a7});_0x2c3438[_0x7523('0x9f')](_0x21a8b7['id'],_0x1d2d64[_0x7523('0x46')](_0x7523('0xa0')),_0x21a8b7[_0x7523('0xa1')]);_0x1d2d64[_0x7523('0x46')](_0x7523('0xa2'))[_0x7523('0x94')]({'data-sku':_0x21a8b7['id'],'data-sku-index':_0x1c87a7});_0x1d2d64[_0x7523('0xa3')](_0x4525fc);_0x3f85f1=_0x3f85f1[_0x7523('0x4d')](_0x1d2d64);}try{var _0x738c60=_0x4525fc['getParent']('.qd-ddc-wrapper')[_0x7523('0x46')]('.qd-ddc-shipping\x20input');if(_0x738c60[_0x7523('0x8')]&&_0x738c60['val']()==''&&window['_QuatroDigital_DropDown'][_0x7523('0x7d')]['shippingData'][_0x7523('0xa4')])_0x738c60['val'](window[_0x7523('0x18')][_0x7523('0x7d')][_0x7523('0x7f')][_0x7523('0xa4')][_0x7523('0xa5')]);}catch(_0x5c1975){_0x58e0ee(_0x7523('0xa6')+_0x5c1975[_0x7523('0xf')],_0x7523('0xa7'));}_0x2c3438[_0x7523('0xa8')](_0x4525fc);_0x2c3438['cartIsEmpty']();if(_0x3ab9b6&&_0x3ab9b6[_0x7523('0xa9')]){(function(){_0x2773f2=_0x3f85f1[_0x7523('0xaa')](_0x7523('0xab')+_0x3ab9b6[_0x7523('0xa9')]+'\x27]');if(!_0x2773f2[_0x7523('0x8')])return;_0x440492=0x0;_0x3f85f1['each'](function(){var _0x4acc8b=_0x93dc5f(this);if(_0x4acc8b['is'](_0x2773f2))return![];_0x440492+=_0x4acc8b['outerHeight']();});_0x2c3438['scrollCart'](undefined,undefined,_0x440492,_0x4525fc[_0x7523('0x4d')](_0x4525fc[_0x7523('0xac')]()));_0x3f85f1['removeClass'](_0x7523('0xad'));(function(_0x5e523e){_0x5e523e['addClass'](_0x7523('0xae'));_0x5e523e[_0x7523('0x7c')](_0x7523('0xad'));setTimeout(function(){_0x5e523e['removeClass'](_0x7523('0xae'));},_0x1344d3['timeRemoveNewItemClass']);}(_0x2773f2));_0x93dc5f(document[_0x7523('0x52')])[_0x7523('0x7c')]('qd-ddc-product-add-time-v2');setTimeout(function(){_0x93dc5f(document[_0x7523('0x52')])['removeClass'](_0x7523('0xaf'));},_0x1344d3[_0x7523('0x76')]);}());}});(function(){if(_QuatroDigital_DropDown[_0x7523('0x7d')]['items']['length']){_0x93dc5f('body')['removeClass'](_0x7523('0xb0'))[_0x7523('0x7c')]('qd-ddc-cart-rendered\x20qd-ddc-product-add-time');setTimeout(function(){_0x93dc5f(_0x7523('0x52'))['removeClass'](_0x7523('0xb1'));},_0x1344d3[_0x7523('0x76')]);}else _0x93dc5f(_0x7523('0x52'))[_0x7523('0x50')]('qd-ddc-cart-rendered')['addClass']('qd-ddc-cart-empty');}());if(typeof _0x1344d3[_0x7523('0xb2')]===_0x7523('0xd'))_0x1344d3['callbackProductsList']['call'](this);else _0x58e0ee(_0x7523('0xb3'));};_0x2c3438[_0x7523('0x9f')]=function(_0x1dd82c,_0x2f5cc8,_0x2c570d){var _0xda975f=!![];function _0x28e404(){if(_0x1344d3['forceImageHTTPS']&&typeof _0x2c570d==_0x7523('0xb4'))_0x2c570d=_0x2c570d[_0x7523('0x2')]('http','https');_0x2f5cc8[_0x7523('0x50')](_0x7523('0xb5'))[_0x7523('0xb6')](function(){_0x93dc5f(this)[_0x7523('0x7c')](_0x7523('0xb5'));})[_0x7523('0x94')](_0x7523('0xb7'),_0x2c570d);};if(_0x2c570d)_0x28e404();else if(!isNaN(_0x1dd82c)){alert(_0x7523('0xb8'));}else _0x58e0ee(_0x7523('0xb9'),'alerta');};_0x2c3438[_0x7523('0xa8')]=function(_0x3f2a6f){var _0x98a02d,_0x274bdc,_0x44aaa0,_0x4591d2;_0x98a02d=function(_0x4c620f,_0x51a55c){var _0xe24c2e,_0x410523,_0x3c0c1a,_0x1aee2b,_0x5388fb;_0x3c0c1a=_0x93dc5f(_0x4c620f);_0xe24c2e=_0x3c0c1a['attr'](_0x7523('0xba'));_0x5388fb=_0x3c0c1a['attr'](_0x7523('0xbb'));if(!_0xe24c2e)return;_0x410523=parseInt(_0x3c0c1a[_0x7523('0x9d')]())||0x1;_0x2c3438[_0x7523('0xbc')]([_0xe24c2e,_0x5388fb],_0x410523,_0x410523+0x1,function(_0x48583b){_0x3c0c1a['val'](_0x48583b);if(typeof _0x51a55c==='function')_0x51a55c();});};_0x44aaa0=function(_0x3a6e5e,_0x26bd8b){var _0x30facf,_0x16c319,_0x2334d2,_0x49404b,_0x4d8cde;_0x2334d2=_0x93dc5f(_0x3a6e5e);_0x30facf=_0x2334d2[_0x7523('0x94')](_0x7523('0xba'));_0x4d8cde=_0x2334d2[_0x7523('0x94')]('data-sku-index');if(!_0x30facf)return;_0x16c319=parseInt(_0x2334d2[_0x7523('0x9d')]())||0x2;_0x49404b=_0x2c3438[_0x7523('0xbc')]([_0x30facf,_0x4d8cde],_0x16c319,_0x16c319-0x1,function(_0xb8630e){_0x2334d2[_0x7523('0x9d')](_0xb8630e);if(typeof _0x26bd8b==='function')_0x26bd8b();});};_0x4591d2=function(_0x7b6aff,_0x55ef82){var _0x1cc7da,_0x5d3788,_0x4b8be5,_0x46c98e,_0x5df340;_0x4b8be5=_0x93dc5f(_0x7b6aff);_0x1cc7da=_0x4b8be5['attr']('data-sku');_0x5df340=_0x4b8be5['attr'](_0x7523('0xbb'));if(!_0x1cc7da)return;_0x5d3788=parseInt(_0x4b8be5[_0x7523('0x9d')]())||0x1;_0x46c98e=_0x2c3438[_0x7523('0xbc')]([_0x1cc7da,_0x5df340],0x1,_0x5d3788,function(_0x4ac986){_0x4b8be5[_0x7523('0x9d')](_0x4ac986);if(typeof _0x55ef82===_0x7523('0xd'))_0x55ef82();});};_0x274bdc=_0x3f2a6f[_0x7523('0x46')](_0x7523('0xbd'));_0x274bdc[_0x7523('0x7c')]('qd_on')[_0x7523('0x6c')](function(){var _0x1fb071=_0x93dc5f(this);_0x1fb071[_0x7523('0x46')](_0x7523('0xbe'))['on'](_0x7523('0xbf'),function(_0x5b19f7){_0x5b19f7[_0x7523('0x61')]();_0x274bdc['addClass'](_0x7523('0xc0'));_0x98a02d(_0x1fb071[_0x7523('0x46')](_0x7523('0x9c')),function(){_0x274bdc[_0x7523('0x50')](_0x7523('0xc0'));});});_0x1fb071[_0x7523('0x46')](_0x7523('0xc1'))['on'](_0x7523('0xc2'),function(_0xccc72d){_0xccc72d[_0x7523('0x61')]();_0x274bdc[_0x7523('0x7c')](_0x7523('0xc0'));_0x44aaa0(_0x1fb071[_0x7523('0x46')](_0x7523('0x9c')),function(){_0x274bdc[_0x7523('0x50')](_0x7523('0xc0'));});});_0x1fb071[_0x7523('0x46')]('.qd-ddc-quantity')['on']('focusout.qd_ddc_change',function(){_0x274bdc[_0x7523('0x7c')](_0x7523('0xc0'));_0x4591d2(this,function(){_0x274bdc['removeClass'](_0x7523('0xc0'));});});_0x1fb071['find'](_0x7523('0x9c'))['on'](_0x7523('0xc3'),function(_0xa93114){if(_0xa93114[_0x7523('0x55')]!=0xd)return;_0x274bdc['addClass'](_0x7523('0xc0'));_0x4591d2(this,function(){_0x274bdc[_0x7523('0x50')](_0x7523('0xc0'));});});});_0x3f2a6f[_0x7523('0x46')](_0x7523('0x81'))[_0x7523('0x6c')](function(){var _0x497018=_0x93dc5f(this);_0x497018[_0x7523('0x46')]('.qd-ddc-remove')['on'](_0x7523('0xc4'),function(){var _0x205625;_0x497018[_0x7523('0x7c')](_0x7523('0xc0'));_0x2c3438[_0x7523('0xc5')](_0x93dc5f(this),function(_0x684c3){if(_0x684c3)_0x497018[_0x7523('0xc6')](!![])[_0x7523('0xc7')](function(){_0x497018[_0x7523('0xc8')]();_0x2c3438[_0x7523('0x6a')]();});else _0x497018[_0x7523('0x50')](_0x7523('0xc0'));});return![];});});};_0x2c3438['formatCepField']=function(_0x311f0a){var _0x302856=_0x311f0a[_0x7523('0x9d')]();_0x302856=_0x302856[_0x7523('0x2')](/[^0-9\-]/g,'');_0x302856=_0x302856[_0x7523('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x7523('0xc9'));_0x302856=_0x302856[_0x7523('0x2')](/(.{9}).*/g,'$1');_0x311f0a[_0x7523('0x9d')](_0x302856);};_0x2c3438[_0x7523('0xca')]=function(_0x266930){var _0x3582ae=_0x266930[_0x7523('0x9d')]();if(_0x3582ae[_0x7523('0x8')]>=0x9){if(_0x266930['data'](_0x7523('0xcb'))!=_0x3582ae){_0x4919a2['calculateShipping']({'postalCode':_0x3582ae,'country':'BRA'})[_0x7523('0xcc')](function(_0x5fdfe6){_0x266930[_0x7523('0x1')](_0x7523('0xcd'))[_0x7523('0x46')]('.qd-dd-cep-slas')[_0x7523('0xc8')]();window[_0x7523('0x18')][_0x7523('0x7d')]=_0x5fdfe6;_0x2c3438[_0x7523('0x69')]();var _0x51095a=_0x5fdfe6[_0x7523('0x7f')][_0x7523('0xce')][0x0][_0x7523('0xcf')];var _0x45bd1c=_0x93dc5f(_0x7523('0xd0'));for(var _0x53c92=0x0;_0x53c92<_0x51095a[_0x7523('0x8')];_0x53c92++){var _0x2411c0=_0x51095a[_0x53c92];var _0xe659d=_0x2411c0[_0x7523('0xd1')]>0x1?_0x2411c0[_0x7523('0xd1')][_0x7523('0x2')]('bd',_0x7523('0xd2')):_0x2411c0[_0x7523('0xd1')][_0x7523('0x2')]('bd','\x20dias\x20útéis');var _0x1080ab=_0x93dc5f(_0x7523('0xd3'));_0x1080ab['append'](_0x7523('0xd4')+qd_number_format(_0x2411c0['price']/0x64,0x2,',','.')+'</td><td>'+_0x2411c0[_0x7523('0x27')]+_0x7523('0xd5')+_0xe659d+'\x20para\x20o\x20CEP\x20'+_0x3582ae+'</td>');_0x1080ab[_0x7523('0xa3')](_0x45bd1c[_0x7523('0x46')](_0x7523('0xd6')));}_0x45bd1c[_0x7523('0xd7')](_0x266930['closest']('.qd-ddc-cep-tooltip-text')[_0x7523('0x46')](_0x7523('0x60')));})[_0x7523('0xd8')](function(_0x14bc58){_0x58e0ee([_0x7523('0xd9'),_0x14bc58]);updateCartData();});}_0x266930['data'](_0x7523('0xcb'),_0x3582ae);}};_0x2c3438[_0x7523('0xbc')]=function(_0x3ddf5e,_0x140a98,_0x40e35d,_0x2bbf09){var _0x11ec6e=_0x40e35d||0x1;if(_0x11ec6e<0x1)return _0x140a98;if(_0x1344d3[_0x7523('0x78')]){if(typeof window[_0x7523('0x18')][_0x7523('0x7d')][_0x7523('0x74')][_0x3ddf5e[0x1]]==='undefined'){_0x58e0ee(_0x7523('0xda')+_0x3ddf5e[0x1]+']');return _0x140a98;}window[_0x7523('0x18')][_0x7523('0x7d')][_0x7523('0x74')][_0x3ddf5e[0x1]][_0x7523('0x9e')]=_0x11ec6e;window[_0x7523('0x18')][_0x7523('0x7d')][_0x7523('0x74')][_0x3ddf5e[0x1]]['index']=_0x3ddf5e[0x1];_0x4919a2[_0x7523('0xdb')]([window['_QuatroDigital_DropDown']['getOrderForm'][_0x7523('0x74')][_0x3ddf5e[0x1]]],[_0x7523('0x74'),'totalizers','shippingData'])[_0x7523('0xcc')](function(_0x45808e){window[_0x7523('0x18')][_0x7523('0x7d')]=_0x45808e;_0x5ec238(!![]);})[_0x7523('0xd8')](function(_0x557a48){_0x58e0ee([_0x7523('0xdc'),_0x557a48]);_0x5ec238();});}else{_0x58e0ee(_0x7523('0xdd'));}function _0x5ec238(_0xbc612d){_0xbc612d=typeof _0xbc612d!==_0x7523('0xde')?![]:_0xbc612d;_0x2c3438[_0x7523('0x69')]();window[_0x7523('0x18')]['allowUpdate']=![];_0x2c3438['cartIsEmpty']();if(typeof window[_0x7523('0x79')]!==_0x7523('0x4')&&typeof window[_0x7523('0x79')][_0x7523('0x7a')]===_0x7523('0xd'))window[_0x7523('0x79')][_0x7523('0x7a')][_0x7523('0x6d')](this);if(typeof adminCart==='function')adminCart();_0x93dc5f['fn'][_0x7523('0xdf')](!![],undefined,_0xbc612d);if(typeof _0x2bbf09==='function')_0x2bbf09(_0x140a98);};};_0x2c3438[_0x7523('0xc5')]=function(_0x156741,_0x332f0b){var _0x2ad190=![];var _0x1b989e=_0x93dc5f(_0x156741);var _0x509218=_0x1b989e[_0x7523('0x94')](_0x7523('0xbb'));if(_0x1344d3[_0x7523('0x78')]){if(typeof window[_0x7523('0x18')][_0x7523('0x7d')][_0x7523('0x74')][_0x509218]==='undefined'){_0x58e0ee(_0x7523('0xda')+_0x509218+']');return _0x2ad190;}window[_0x7523('0x18')]['getOrderForm'][_0x7523('0x74')][_0x509218]['index']=_0x509218;_0x4919a2[_0x7523('0xe0')]([window[_0x7523('0x18')][_0x7523('0x7d')][_0x7523('0x74')][_0x509218]],[_0x7523('0x74'),_0x7523('0xe1'),_0x7523('0x7f')])['done'](function(_0x4943be){_0x2ad190=!![];window[_0x7523('0x18')][_0x7523('0x7d')]=_0x4943be;_0x184f68(_0x4943be);_0x4c6825(!![]);})[_0x7523('0xd8')](function(_0x188d12){_0x58e0ee([_0x7523('0xe2'),_0x188d12]);_0x4c6825();});}else{alert(_0x7523('0xe3'));}function _0x4c6825(_0x3a0df9){_0x3a0df9=typeof _0x3a0df9!==_0x7523('0xde')?![]:_0x3a0df9;if(typeof window[_0x7523('0x79')]!=='undefined'&&typeof window[_0x7523('0x79')]['exec']===_0x7523('0xd'))window[_0x7523('0x79')][_0x7523('0x7a')]['call'](this);if(typeof adminCart==='function')adminCart();_0x93dc5f['fn'][_0x7523('0xdf')](!![],undefined,_0x3a0df9);if(typeof _0x332f0b===_0x7523('0xd'))_0x332f0b(_0x2ad190);};};_0x2c3438[_0x7523('0x59')]=function(_0x30e55c,_0x36a213,_0x154979,_0x3814a9){var _0xa6b1d9=_0x3814a9||_0x93dc5f(_0x7523('0xe4'));var _0x5db223=_0x30e55c||'+';var _0x2e3aba=_0x36a213||_0xa6b1d9['height']()*0.9;_0xa6b1d9[_0x7523('0xc6')](!![],!![])[_0x7523('0xe5')]({'scrollTop':isNaN(_0x154979)?_0x5db223+'='+_0x2e3aba+'px':_0x154979});};if(!_0x1344d3['updateOnlyHover']){_0x2c3438[_0x7523('0x69')]();_0x93dc5f['fn'][_0x7523('0xdf')](!![]);}_0x93dc5f(window)['on'](_0x7523('0xe6'),function(){try{window[_0x7523('0x18')][_0x7523('0x7d')]=undefined;_0x2c3438['getCartInfoByUrl']();}catch(_0x741e18){_0x58e0ee('Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20'+_0x741e18[_0x7523('0xf')],_0x7523('0xe7'));}});if(typeof _0x1344d3[_0x7523('0xb')]===_0x7523('0xd'))_0x1344d3[_0x7523('0xb')][_0x7523('0x6d')](this);else _0x58e0ee('Callback\x20não\x20é\x20uma\x20função');};_0x93dc5f['fn'][_0x7523('0x1a')]=function(_0x3d29af){var _0x567f87;_0x567f87=_0x93dc5f(this);_0x567f87['fn']=new _0x93dc5f['QD_dropDownCart'](this,_0x3d29af);return _0x567f87;};}catch(_0x95e7bd){if(typeof console!==_0x7523('0x4')&&typeof console[_0x7523('0xc')]===_0x7523('0xd'))console[_0x7523('0xc')](_0x7523('0xe'),_0x95e7bd);}}(this));(function(_0x20061c){'use strict';try{var _0x4178cf=jQuery;var _0x24f5dd='Quatro\x20Digital\x20-\x20Box\x20Amount\x20Cart';var _0x5f2103=function(_0x944593,_0x5b2e99){if(_0x7523('0x11')===typeof console&&_0x7523('0x4')!==typeof console[_0x7523('0xc')]&&_0x7523('0x4')!==typeof console['info']&&_0x7523('0x4')!==typeof console['warn']){var _0x2813d7;_0x7523('0x11')===typeof _0x944593?(_0x944593[_0x7523('0x14')]('['+_0x24f5dd+']\x0a'),_0x2813d7=_0x944593):_0x2813d7=['['+_0x24f5dd+']\x0a'+_0x944593];if('undefined'===typeof _0x5b2e99||_0x7523('0x15')!==_0x5b2e99[_0x7523('0x16')]()&&_0x7523('0xa7')!==_0x5b2e99[_0x7523('0x16')]())if(_0x7523('0x4')!==typeof _0x5b2e99&&_0x7523('0x12')===_0x5b2e99[_0x7523('0x16')]())try{console[_0x7523('0x12')]['apply'](console,_0x2813d7);}catch(_0x6ee7c5){try{console[_0x7523('0x12')](_0x2813d7['join']('\x0a'));}catch(_0xcafa18){}}else try{console[_0x7523('0xc')][_0x7523('0x17')](console,_0x2813d7);}catch(_0x5a33bb){try{console[_0x7523('0xc')](_0x2813d7[_0x7523('0x9')]('\x0a'));}catch(_0x3cbeea){}}else try{console[_0x7523('0x13')][_0x7523('0x17')](console,_0x2813d7);}catch(_0x1063e0){try{console[_0x7523('0x13')](_0x2813d7[_0x7523('0x9')]('\x0a'));}catch(_0x32731e){}}}};window[_0x7523('0x79')]=window[_0x7523('0x79')]||{};window[_0x7523('0x79')][_0x7523('0x74')]={};window[_0x7523('0x79')]['allowRecalculate']=![];window[_0x7523('0x79')][_0x7523('0xe8')]=![];window[_0x7523('0x79')]['quickViewUpdate']=![];var _0x15e729=_0x7523('0xe9');var _0x532aa5=function(){var _0x1d7f48,_0x4abdbd,_0x5dc143,_0xd6296c;_0xd6296c=_0x471640();if(window[_0x7523('0x79')][_0x7523('0xea')]){_0x4178cf('.qd-bap-wrapper')[_0x7523('0xc8')]();_0x4178cf(_0x7523('0xeb'))[_0x7523('0x50')](_0x7523('0xec'));}for(var _0x2da7de in window[_0x7523('0x79')]['items']){_0x1d7f48=window[_0x7523('0x79')][_0x7523('0x74')][_0x2da7de];if(typeof _0x1d7f48!==_0x7523('0x11'))return;_0x5dc143=_0x4178cf(_0x7523('0xed')+_0x1d7f48['prodId']+']')[_0x7523('0x0')]('li');if(!window[_0x7523('0x79')][_0x7523('0xea')]&&_0x5dc143[_0x7523('0x46')](_0x7523('0xee'))[_0x7523('0x8')])continue;_0x4abdbd=_0x4178cf(_0x15e729);_0x4abdbd[_0x7523('0x46')](_0x7523('0xef'))['html'](_0x1d7f48[_0x7523('0xf0')]);var _0x1d025c=_0x5dc143[_0x7523('0x46')](_0x7523('0xf1'));if(_0x1d025c[_0x7523('0x8')])_0x1d025c[_0x7523('0xf2')](_0x4abdbd)[_0x7523('0x7c')](_0x7523('0xec'));else _0x5dc143[_0x7523('0xf2')](_0x4abdbd);}if(_0xd6296c)window['_QuatroDigital_AmountProduct'][_0x7523('0xea')]=![];};var _0x471640=function(){if(!window['_QuatroDigital_AmountProduct'][_0x7523('0xea')])return;var _0x4c2eba=![],_0x526683={};window[_0x7523('0x79')][_0x7523('0x74')]={};for(var _0x169c45 in window[_0x7523('0x18')][_0x7523('0x7d')]['items']){if(typeof window[_0x7523('0x18')][_0x7523('0x7d')][_0x7523('0x74')][_0x169c45]!==_0x7523('0x11'))continue;var _0x42684f=window[_0x7523('0x18')][_0x7523('0x7d')][_0x7523('0x74')][_0x169c45];if(typeof _0x42684f['productId']===_0x7523('0x4')||_0x42684f['productId']===null||_0x42684f[_0x7523('0xf3')]==='')continue;window[_0x7523('0x79')]['items'][_0x7523('0xf4')+_0x42684f[_0x7523('0xf3')]]=window['_QuatroDigital_AmountProduct']['items'][_0x7523('0xf4')+_0x42684f[_0x7523('0xf3')]]||{};window[_0x7523('0x79')]['items'][_0x7523('0xf4')+_0x42684f[_0x7523('0xf3')]][_0x7523('0xf5')]=_0x42684f[_0x7523('0xf3')];if(!_0x526683['prod_'+_0x42684f[_0x7523('0xf3')]])window[_0x7523('0x79')]['items']['prod_'+_0x42684f[_0x7523('0xf3')]][_0x7523('0xf0')]=0x0;window[_0x7523('0x79')][_0x7523('0x74')][_0x7523('0xf4')+_0x42684f[_0x7523('0xf3')]][_0x7523('0xf0')]=window[_0x7523('0x79')][_0x7523('0x74')]['prod_'+_0x42684f[_0x7523('0xf3')]][_0x7523('0xf0')]+_0x42684f[_0x7523('0x9e')];_0x4c2eba=!![];_0x526683[_0x7523('0xf4')+_0x42684f[_0x7523('0xf3')]]=!![];}return _0x4c2eba;};window[_0x7523('0x79')][_0x7523('0x7a')]=function(){window[_0x7523('0x79')][_0x7523('0xea')]=!![];_0x532aa5[_0x7523('0x6d')](this);};_0x4178cf(document)[_0x7523('0xf6')](function(){_0x532aa5[_0x7523('0x6d')](this);});}catch(_0x3066eb){if(typeof console!==_0x7523('0x4')&&typeof console['error']==='function')console[_0x7523('0xc')](_0x7523('0xe'),_0x3066eb);}}(this));(function(){'use strict';try{var _0x51cd42=jQuery,_0x3fdd8c;var _0x2f11fa=_0x7523('0xf7');var _0x315a66=function(_0x6e368a,_0x48c09e){if('object'===typeof console&&_0x7523('0x4')!==typeof console[_0x7523('0xc')]&&_0x7523('0x4')!==typeof console[_0x7523('0x12')]&&'undefined'!==typeof console[_0x7523('0x13')]){var _0x258b86;_0x7523('0x11')===typeof _0x6e368a?(_0x6e368a[_0x7523('0x14')]('['+_0x2f11fa+']\x0a'),_0x258b86=_0x6e368a):_0x258b86=['['+_0x2f11fa+']\x0a'+_0x6e368a];if('undefined'===typeof _0x48c09e||_0x7523('0x15')!==_0x48c09e['toLowerCase']()&&_0x7523('0xa7')!==_0x48c09e[_0x7523('0x16')]())if(_0x7523('0x4')!==typeof _0x48c09e&&_0x7523('0x12')===_0x48c09e[_0x7523('0x16')]())try{console[_0x7523('0x12')][_0x7523('0x17')](console,_0x258b86);}catch(_0x1ccc60){try{console[_0x7523('0x12')](_0x258b86[_0x7523('0x9')]('\x0a'));}catch(_0x2a4e16){}}else try{console[_0x7523('0xc')][_0x7523('0x17')](console,_0x258b86);}catch(_0x4cd4d6){try{console['error'](_0x258b86[_0x7523('0x9')]('\x0a'));}catch(_0x25dac3){}}else try{console[_0x7523('0x13')][_0x7523('0x17')](console,_0x258b86);}catch(_0x3ff216){try{console[_0x7523('0x13')](_0x258b86[_0x7523('0x9')]('\x0a'));}catch(_0x5f0cbd){}}}};var _0x3593cb={'selector':_0x7523('0xf8'),'dropDown':{},'buyButton':{}};_0x51cd42['QD_smartCart']=function(_0x2eaf16){var _0x56e49b,_0x108ba5={};_0x3fdd8c=_0x51cd42[_0x7523('0xf9')](!![],{},_0x3593cb,_0x2eaf16);_0x56e49b=_0x51cd42(_0x3fdd8c[_0x7523('0xfa')])['QD_dropDownCart'](_0x3fdd8c[_0x7523('0xfb')]);if(typeof _0x3fdd8c[_0x7523('0xfb')][_0x7523('0xfc')]!==_0x7523('0x4')&&_0x3fdd8c[_0x7523('0xfb')][_0x7523('0xfc')]===![])_0x108ba5[_0x7523('0xfd')]=_0x51cd42(_0x3fdd8c['selector'])[_0x7523('0xfe')](_0x56e49b['fn'],_0x3fdd8c[_0x7523('0xfd')]);else _0x108ba5[_0x7523('0xfd')]=_0x51cd42(_0x3fdd8c['selector'])[_0x7523('0xfe')](_0x3fdd8c['buyButton']);_0x108ba5[_0x7523('0xfb')]=_0x56e49b;return _0x108ba5;};_0x51cd42['fn'][_0x7523('0xff')]=function(){if(typeof console==='object'&&typeof console[_0x7523('0x12')]==='function')console[_0x7523('0x12')](_0x7523('0x100'));};_0x51cd42[_0x7523('0xff')]=_0x51cd42['fn']['smartCart'];}catch(_0x11490b){if(typeof console!==_0x7523('0x4')&&typeof console['error']==='function')console[_0x7523('0xc')]('Oooops!\x20',_0x11490b);}}());

// vtex url parse
/* Quatro Digital - VTEX URL Parse // 1.4 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
var _0x8349=["\x6C\x69\x6E\x6B","\x3C\x61\x20\x68\x72\x65\x66\x3D\x22","\x22\x3E\x3C\x2F\x61\x3E","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\x66\x75\x6E\x63\x74\x69\x6F\x6E","\x65\x72\x72\x6F\x72","\x50\x72\x6F\x62\x6C\x65\x6D\x61\x73\x20\x3A\x28\x20\x2E\x20\x44\x65\x74\x61\x6C\x68\x65\x73\x3A\x20","\x2F","\x73\x70\x6C\x69\x74","","\x72\x65\x70\x6C\x61\x63\x65","\x70\x61\x74\x68\x6E\x61\x6D\x65","\x2C","\x70\x6F\x70","\x6D\x61\x74\x63\x68","\x73\x65\x61\x72\x63\x68","\x6C\x65\x6E\x67\x74\x68","\x6F\x62\x6A\x65\x63\x74","\x70\x75\x73\x68","\x63","\x6D\x61\x70","\x73\x68\x69\x66\x74","\x6F\x74\x68\x65\x72\x5F\x70\x61\x74\x68","\x6F\x74\x68\x65\x72\x5F\x73\x65\x61\x72\x63\x68","\x26","\x6F\x75\x74","\x67\x65\x74\x4D\x61\x70","\x70\x72\x6F\x74\x6F\x74\x79\x70\x65","\x6D\x65\x72\x67\x65\x55\x72\x6C","\x63\x61\x6C\x6C","\x65\x78\x74\x65\x6E\x64","\x67\x65\x74\x55\x72\x6C","\x6D\x61\x70\x3D","\x6A\x6F\x69\x6E","\x3F","\x51\x44\x5F\x56\x74\x65\x78\x55\x72\x6C\x50\x61\x72\x73\x65"];(function(){function _0x6ac7x1(_0x6ac7x2){try{this[_0x8349[0]]=$(_0x8349[1]+_0x6ac7x2+_0x8349[2])[0]}catch(c){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],c)}}function _0x6ac7x3(_0x6ac7x2){try{_0x6ac7x2=_0x6ac7x2||this[_0x8349[0]];var _0x6ac7x4=_0x6ac7x2[_0x8349[11]][_0x8349[10]](/\/\//g,_0x8349[7])[_0x8349[10]](/(^\/|\/$)/g,_0x8349[9])[_0x8349[8]](_0x8349[7]),_0x6ac7x5=((_0x6ac7x2[_0x8349[15]]||_0x8349[9])[_0x8349[14]](/map\=([^&]+)/i)||[_0x8349[9]])[_0x8349[13]]()[_0x8349[8]](_0x8349[12]);if(1==_0x6ac7x5[_0x8349[16]]&&0==_0x6ac7x5[0][_0x8349[16]]){if(_0x8349[17]== typeof defaultMap){_0x6ac7x5=defaultMap}else {for(var _0x6ac7x6=0;_0x6ac7x6<_0x6ac7x4[_0x8349[16]];_0x6ac7x6++){_0x6ac7x4[_0x6ac7x6][_0x8349[16]]&&_0x8349[7]!=_0x6ac7x4[_0x6ac7x6]&&_0x6ac7x5[_0x8349[18]](defaultMap)}}};for(var _0x6ac7x6={map:{},other_path:_0x8349[9]},_0x6ac7x7=0;_0x6ac7x7<_0x6ac7x5[_0x8349[16]];_0x6ac7x7++){_0x6ac7x5[_0x6ac7x7][_0x8349[16]]&&(_0x8349[19]==_0x6ac7x5[_0x6ac7x7]?(_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]=_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]||[],_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]][_0x8349[18]]((_0x6ac7x4||[_0x8349[9]])[_0x8349[21]]())):_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]=(_0x6ac7x4||[_0x8349[9]])[_0x8349[21]]())};_0x6ac7x6[_0x8349[22]]=_0x6ac7x4;_0x6ac7x6[_0x8349[23]]=(_0x6ac7x2[_0x8349[15]]||_0x8349[9])[_0x8349[10]](/map\=([^&]+)/ig,_0x8349[9])[_0x8349[10]](/\&\&+/ig,_0x8349[24])[_0x8349[10]](/\?/g,_0x8349[9]);return this[_0x8349[25]]=_0x6ac7x6}catch(g){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],g)}}_0x6ac7x1[_0x8349[27]][_0x8349[26]]=_0x6ac7x3;_0x6ac7x1[_0x8349[27]][_0x8349[28]]=function(_0x6ac7x2,_0x6ac7x4){try{var _0x6ac7x5=_0x6ac7x3[_0x8349[29]](this,this[_0x8349[0]]),_0x6ac7x6=_0x6ac7x3[_0x8349[29]](this,$(_0x8349[1]+_0x6ac7x2+_0x8349[2])[0]);_0x6ac7x5[_0x8349[22]][_0x8349[16]]||(_0x6ac7x5[_0x8349[22]]=void(0));_0x6ac7x5[_0x8349[23]][_0x8349[16]]||(_0x6ac7x5[_0x8349[23]]=void(0));var _0x6ac7x7=$[_0x8349[30]](!0,{},_0x6ac7x6,_0x6ac7x5);if(_0x8349[17]== typeof _0x6ac7x4){for(_0x6ac7x6=0;_0x6ac7x6<_0x6ac7x4[_0x8349[16]];_0x6ac7x6++){_0x6ac7x7[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]]&&(_0x6ac7x7[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]]=_0x6ac7x5[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]])}};return this[_0x8349[25]]=_0x6ac7x7}catch(g){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],g)}};_0x6ac7x1[_0x8349[27]][_0x8349[31]]=function(_0x6ac7x2){try{var _0x6ac7x4=[],_0x6ac7x5=[];_0x6ac7x2=_0x6ac7x2||{};for(var _0x6ac7x6 in this[_0x8349[25]][_0x8349[20]]){if(!_0x6ac7x2[_0x6ac7x6]){if(_0x8349[19]==_0x6ac7x6){for(var _0x6ac7x7=0;_0x6ac7x7<this[_0x8349[25]][_0x8349[20]][_0x6ac7x6][_0x8349[16]];_0x6ac7x7++){_0x6ac7x4[_0x8349[18]](this[_0x8349[25]][_0x8349[20]][_0x6ac7x6][_0x6ac7x7]),_0x6ac7x5[_0x8349[18]](_0x6ac7x6)}}else {_0x6ac7x4[_0x8349[18]](this[_0x8349[25]][_0x8349[20]][_0x6ac7x6]),_0x6ac7x5[_0x8349[18]](_0x6ac7x6)}}};var _0x6ac7x8=_0x6ac7x5[_0x8349[16]]?_0x8349[32]+_0x6ac7x5[_0x8349[33]](_0x8349[12])+_0x8349[24]:_0x8349[9];return _0x8349[7]+_0x6ac7x4[_0x8349[33]](_0x8349[7])+(this[_0x8349[25]][_0x8349[22]][_0x8349[16]]?_0x8349[7]+this[_0x8349[25]][_0x8349[22]][_0x8349[33]](_0x8349[7]):_0x8349[9])+_0x8349[34]+(_0x6ac7x8+this[_0x8349[25]][_0x8349[23]])[_0x8349[10]](/\&\&+/g,_0x8349[24])}catch(_0x6ac7x1){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],_0x6ac7x1)}};window[_0x8349[35]]=_0x6ac7x1})()

/* Quatro Digital - QD Select Smart Research 2 // Carlos Vinicius // Todos os direitos reservados */
var _0xadb5=['toLowerCase','aviso','join','apply','Selecione\x20o\x20anterior','href','.search-single-navigator\x20ul.','attr','data-qdssr-title','find','each','push','h5.','\x20+ul\x20.filtro-ativo:first','text','trim','Desculpe,\x20não\x20foi\x20possível\x20executar\x20sua\x20solicitação.\x20Por\x20favor\x20entre\x20em\x20contato\x20com\x20o\x20SAC.','neynoretnznfx%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','ite','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','options','length','Nenhuma\x20opção\x20foi\x20enviada,\x20é\x20esperado\x20um\x20array\x20com\x20sub\x20arrays\x20contendo\x20o\x20conjunto\x20chave/valor.','data-qdssr-ndx','Problemas\x20ao\x20definir\x20a\x20opção\x20selecionada.\x20Detalhes:\x20','message','addClass','Problemas\x20ao\x20tentar\x20verificar\x20as\x20opções\x20selecionadas.\x20Detalhes:\x20','optionsPlaceHolder','<div\x20class=\x22qd-ssr2-option-wrapper\x22>','labelMessage','</label>','\x22\x20id=\x22qd-ssr2-select-','\x22\x20data-qdssr-title=\x22','<option\x20value=\x22\x22></option>','disabledMessage','</select></div>','appendTo','select2','pt-BR','bind','change','select[data-qdssr-ndx=','val','QuatroDigital.ssrChange','body','redirect','split','shift','data-qdssr-str','qd-ssr2-loading','qdAjax','removeAttr','disabled','html','getAjaxOptions','QuatroDigital.ssrSelectAjaxPopulated','ajaxError','removeClass','qd-ssr-loading','Problemas\x20:(\x20.\x20Detalhes:\x20','optionIsChecked','option[data-qdssr-text=\x27','trigger','<option\x20value=\x22','\x22\x20data-qdssr-text=\x22','</option>','getCategory','cache','script:not([src])','innerHTML','buscapagina','match','pop','extend','qdPlugin','.qd_auto_select_smart_research_2','QD_SelectSmartResearch2','object','error','undefined','info','warn','unshift','[Quatro\x20Digital\x20-\x20QD\x20Select\x20Smart\x20Research\x202]\x0a','alerta'];(function(_0x3dd15e,_0x1f0015){var _0x231fd0=function(_0x4f680a){while(--_0x4f680a){_0x3dd15e['push'](_0x3dd15e['shift']());}};_0x231fd0(++_0x1f0015);}(_0xadb5,0xad));var _0x5adb=function(_0x3e5228,_0x2140a2){_0x3e5228=_0x3e5228-0x0;var _0x234e1c=_0xadb5[_0x3e5228];return _0x234e1c;};(function(_0x1f969c){var _0x14192d=jQuery;if('function'!==typeof _0x14192d['fn'][_0x5adb('0x0')]){_0x14192d['fn'][_0x5adb('0x0')]=function(){};var _0x3129c3=function(_0x248dc6,_0x31457){if(_0x5adb('0x1')===typeof console&&'undefined'!==typeof console[_0x5adb('0x2')]&&_0x5adb('0x3')!==typeof console[_0x5adb('0x4')]&&_0x5adb('0x3')!==typeof console[_0x5adb('0x5')]){var _0x353885;_0x5adb('0x1')===typeof _0x248dc6?(_0x248dc6[_0x5adb('0x6')](_0x5adb('0x7')),_0x353885=_0x248dc6):_0x353885=[_0x5adb('0x7')+_0x248dc6];if(_0x5adb('0x3')===typeof _0x31457||_0x5adb('0x8')!==_0x31457[_0x5adb('0x9')]()&&_0x5adb('0xa')!==_0x31457['toLowerCase']())if('undefined'!==typeof _0x31457&&_0x5adb('0x4')===_0x31457[_0x5adb('0x9')]())try{console[_0x5adb('0x4')]['apply'](console,_0x353885);}catch(_0x29f0d5){try{console['info'](_0x353885[_0x5adb('0xb')]('\x0a'));}catch(_0x5433bf){}}else try{console[_0x5adb('0x2')][_0x5adb('0xc')](console,_0x353885);}catch(_0x44abe3){try{console['error'](_0x353885[_0x5adb('0xb')]('\x0a'));}catch(_0x34af2c){}}else try{console[_0x5adb('0x5')]['apply'](console,_0x353885);}catch(_0x2312de){try{console['warn'](_0x353885[_0x5adb('0xb')]('\x0a'));}catch(_0x42a482){}}}},_0x4aecec={'options':[],'optionsPlaceHolder':[],'disabledMessage':function(_0x30614e,_0x304784,_0x1c0f97){return _0x5adb('0xd');},'labelMessage':function(_0xa29dc,_0x42f4c6,_0xb953a6){return'Selecione\x20o(a)\x20'+_0xb953a6[_0xa29dc];},'redirect':function(_0x3fff62){window['location'][_0x5adb('0xe')]=_0x3fff62;},'getAjaxOptions':function(_0x558f76,_0x3ef465){var _0x50e84f=[];_0x14192d(_0x558f76)['find'](_0x5adb('0xf')+_0x3ef465[_0x5adb('0x10')](_0x5adb('0x11')))[_0x5adb('0x12')]('a')[_0x5adb('0x13')](function(){var _0x3ef465=_0x14192d(this);_0x50e84f[_0x5adb('0x14')]([_0x3ef465['text']()['trim'](),_0x3ef465[_0x5adb('0x10')](_0x5adb('0xe'))||'']);});return _0x50e84f;},'optionIsChecked':function(_0x1a38d3){_0x1a38d3=_0x14192d(_0x5adb('0x15')+_0x1a38d3+_0x5adb('0x16'))[_0x5adb('0x17')]()[_0x5adb('0x18')]();return _0x1a38d3['length']?_0x1a38d3:null;},'ajaxError':function(){_0x3129c3(_0x5adb('0x19'));}};_0x1f969c=function(_0x373cc3){var _0x3220cd={'p':_0x5adb('0x1a')};return function(_0xeb556c){var _0x49f203=function(_0x2fee18){return _0x2fee18;};var _0x2e1e63=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0xeb556c=_0xeb556c['d'+_0x2e1e63[0x10]+'c'+_0x2e1e63[0x11]+'m'+_0x49f203(_0x2e1e63[0x1])+'n'+_0x2e1e63[0xd]]['l'+_0x2e1e63[0x12]+'c'+_0x2e1e63[0x0]+'ti'+_0x49f203('o')+'n'];var _0x5aed76=function(_0x1feecf){return escape(encodeURIComponent(_0x1feecf[_0x5adb('0x1b')](/\./g,'¨')[_0x5adb('0x1b')](/[a-zA-Z]/g,function(_0x55b40a){return String[_0x5adb('0x1c')](('Z'>=_0x55b40a?0x5a:0x7a)>=(_0x55b40a=_0x55b40a[_0x5adb('0x1d')](0x0)+0xd)?_0x55b40a:_0x55b40a-0x1a);})));};var _0x3a4fca=_0x5aed76(_0xeb556c[[_0x2e1e63[0x9],_0x49f203('o'),_0x2e1e63[0xc],_0x2e1e63[_0x49f203(0xd)]][_0x5adb('0xb')]('')]);_0x5aed76=_0x5aed76((window[['js',_0x49f203('no'),'m',_0x2e1e63[0x1],_0x2e1e63[0x4][_0x5adb('0x1e')](),_0x5adb('0x1f')]['join']('')]||'---')+['.v',_0x2e1e63[0xd],'e',_0x49f203('x'),'co',_0x49f203('mm'),'erc',_0x2e1e63[0x1],'.c',_0x49f203('o'),'m.',_0x2e1e63[0x13],'r'][_0x5adb('0xb')](''));for(var _0x1eac55 in _0x3220cd){if(_0x5aed76===_0x1eac55+_0x3220cd[_0x1eac55]||_0x3a4fca===_0x1eac55+_0x3220cd[_0x1eac55]){var _0x60a672='tr'+_0x2e1e63[0x11]+'e';break;}_0x60a672='f'+_0x2e1e63[0x0]+'ls'+_0x49f203(_0x2e1e63[0x1])+'';}_0x49f203=!0x1;-0x1<_0xeb556c[[_0x2e1e63[0xc],'e',_0x2e1e63[0x0],'rc',_0x2e1e63[0x9]][_0x5adb('0xb')]('')][_0x5adb('0x20')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x49f203=!0x0);return[_0x60a672,_0x49f203];}(_0x373cc3);}(window);if(!eval(_0x1f969c[0x0]))return _0x1f969c[0x1]?_0x3129c3(_0x5adb('0x21')):!0x1;_0x14192d[_0x5adb('0x0')]=function(_0x372da1,_0x3b1fed){if(!_0x3b1fed[_0x5adb('0x22')][_0x5adb('0x23')])return _0x3129c3(_0x5adb('0x24'));_0x372da1[_0x5adb('0x13')](function(){try{var _0x138bf6=_0x14192d(this),_0x260295=_0x5bb227(_0x138bf6,_0x3b1fed,_0x372da1);_0x1ed9ea(_0x138bf6,_0x3b1fed,0x0);_0x260295['on']('QuatroDigital.ssrSelectAjaxPopulated',function(_0x2e46ce,_0x4c8b2e){try{_0x1ed9ea(_0x138bf6,_0x3b1fed,_0x4c8b2e[_0x5adb('0x10')](_0x5adb('0x25')));}catch(_0x5d1441){_0x3129c3(_0x5adb('0x26')+_0x5d1441[_0x5adb('0x27')]);}});_0x138bf6[_0x5adb('0x28')]('qd-ssr2-loaded');}catch(_0x173789){_0x3129c3(_0x5adb('0x29')+_0x173789['message']);}});};var _0x5bb227=function(_0x663ea0,_0x222568,_0x3c2b07){try{for(var _0x2da912='',_0x9bdece,_0x1f969c=!0x0,_0x2f7abe=new _0x14192d(),_0x215b88=!0x1,_0x1c3a5c=0x0,_0x54851b=0x0;_0x54851b<_0x222568['options'][_0x5adb('0x23')];_0x54851b++){_0x5adb('0x1')!==typeof _0x222568['options'][_0x54851b]&&(_0x1f969c=!0x1);var _0x2355bc=_0x222568[_0x5adb('0x2a')][_0x54851b]||'',_0x4a4260=_0x3c2b07['index'](_0x663ea0);_0x2da912=_0x5adb('0x2b');_0x2da912+='<label\x20for=\x22qd-ssr2-select-'+_0x54851b+_0x4a4260+'\x22>'+_0x222568[_0x5adb('0x2c')](_0x54851b,_0x222568[_0x5adb('0x22')],_0x222568['optionsPlaceHolder'])+_0x5adb('0x2d');_0x2da912+='<select\x20data-qdssr-ndx=\x22'+_0x54851b+_0x5adb('0x2e')+_0x54851b+_0x4a4260+_0x5adb('0x2f')+_0x2355bc+'\x22>';_0x2da912+=_0x5adb('0x30');_0x1f969c?_0x2da912+=_0x49dd03(_0x222568['options'][_0x54851b]):_0x2355bc=_0x222568[_0x5adb('0x31')](_0x54851b,_0x222568[_0x5adb('0x22')],_0x222568[_0x5adb('0x2a')]);_0x2da912+=_0x5adb('0x32');_0x9bdece=_0x14192d(_0x2da912);_0x9bdece[_0x5adb('0x33')](_0x663ea0);var _0x52d74f=_0x9bdece['find']('select');_0x2f7abe=_0x2f7abe['add'](_0x52d74f);_0x1f969c||_0x52d74f[_0x5adb('0x10')]({'disabled':!0x0,'data-qdssr-str':_0x222568[_0x5adb('0x22')][_0x54851b]});_0x52d74f[_0x5adb('0x34')]({'placeholder':_0x2355bc,'language':_0x5adb('0x35')});_0x52d74f[_0x5adb('0x36')](_0x5adb('0x37'),function(_0x2c69a8,_0x3bf282){var _0x478a70=_0x14192d(this),_0x53f2c6=_0x663ea0['find'](_0x5adb('0x38')+(parseInt(_0x478a70[_0x5adb('0x10')](_0x5adb('0x25'))||0x0,0xa)+0x1)+']'),_0x1f969c=(_0x478a70[_0x5adb('0x39')]()||'')[_0x5adb('0x18')]();_0x3bf282||(_0x215b88=!0x0);_0x14192d(window)['trigger'](_0x5adb('0x3a'),[_0x53f2c6,_0x215b88]);!_0x53f2c6[_0x5adb('0x23')]&&(!_0x3bf282||_0x215b88&&_0x1f969c['length'])&&(_0x14192d(document[_0x5adb('0x3b')])[_0x5adb('0x28')]('qd-ssr-reloading'),_0x222568[_0x5adb('0x3c')](_0x1f969c));_0x1f969c=_0x1f969c[_0x5adb('0x3d')]('#')[_0x5adb('0x3e')]()[_0x5adb('0x3d')]('?');_0x1f969c[0x1]=(_0x53f2c6[_0x5adb('0x10')](_0x5adb('0x3f'))||'')+'&'+(_0x1f969c[0x1]||'');_0x14192d(document[_0x5adb('0x3b')])['addClass']('qd-ssr-loading');_0x9bdece[_0x5adb('0x28')](_0x5adb('0x40'));_0x1c3a5c+=0x1;_0x14192d[_0x5adb('0x41')]({'url':_0x1f969c[_0x5adb('0xb')]('?'),'dataType':'html','success':function(_0x507e48){_0x53f2c6[_0x5adb('0x42')](_0x5adb('0x43'));_0x53f2c6[_0x5adb('0x44')](_0x5adb('0x30')+_0x49dd03(_0x222568[_0x5adb('0x45')](_0x507e48,_0x53f2c6)));_0x53f2c6['select2']({'placeholder':_0x53f2c6[_0x5adb('0x10')](_0x5adb('0x11'))});_0x478a70['trigger'](_0x5adb('0x46'),[_0x53f2c6]);},'error':function(){_0x222568[_0x5adb('0x47')][_0x5adb('0xc')](this,arguments);},'complete':function(){_0x9bdece[_0x5adb('0x48')](_0x5adb('0x40'));--_0x1c3a5c;0x0==_0x1c3a5c&&_0x14192d(document[_0x5adb('0x3b')])[_0x5adb('0x48')](_0x5adb('0x49'));},'clearQueueDelay':null});});}return _0x2f7abe;}catch(_0x49e1a1){_0x3129c3(_0x5adb('0x4a')+_0x49e1a1['message']);}},_0x1ed9ea=function(_0x51bc49,_0x5015ee,_0x3cd211,_0x3fbac8){_0x5015ee=_0x5015ee[_0x5adb('0x4b')](_0x5015ee['optionsPlaceHolder'][_0x3cd211]);null!==_0x5015ee&&(_0x3fbac8=_0x3fbac8||_0x51bc49[_0x5adb('0x12')]('select[data-qdssr-ndx='+_0x3cd211+']'),_0x3fbac8[_0x5adb('0x39')](_0x3fbac8[_0x5adb('0x12')](_0x5adb('0x4c')+_0x5015ee+'\x27]')['val']())[_0x5adb('0x4d')]('change',!0x0));},_0x49dd03=function(_0x22fa54){for(var _0x6dc067='',_0x55c535=0x0;_0x55c535<_0x22fa54[_0x5adb('0x23')];_0x55c535++)_0x6dc067+=_0x5adb('0x4e')+(_0x22fa54[_0x55c535][0x1]||'')+_0x5adb('0x4f')+(_0x22fa54[_0x55c535][0x0]||'')[_0x5adb('0x1b')](/\s\([0-9]+\)/,'')+'\x22>'+(_0x22fa54[_0x55c535][0x0]||'')+_0x5adb('0x50');return _0x6dc067;};_0x14192d['QD_SelectSmartResearch2'][_0x5adb('0x51')]=function(){if(_0x14192d[_0x5adb('0x0')][_0x5adb('0x51')][_0x5adb('0x52')])return _0x14192d['QD_SelectSmartResearch2'][_0x5adb('0x51')][_0x5adb('0x52')];var _0x3b4794=[],_0x4d98d0=[];_0x14192d(_0x5adb('0x53'))[_0x5adb('0x13')](function(){var _0x444a6c=_0x14192d(this)[0x0][_0x5adb('0x54')];if(-0x1<_0x444a6c['indexOf'](_0x5adb('0x55')))return _0x3b4794=(decodeURIComponent((_0x444a6c[_0x5adb('0x56')](/\/buscapagina([^\'\"]+)/i)||[''])[_0x5adb('0x57')]())[_0x5adb('0x56')](/fq=c:[^\&]+/i)||[''])[_0x5adb('0x57')]()['split'](':')[_0x5adb('0x57')]()['replace'](/(^\/|\/$)/g,'')[_0x5adb('0x3d')]('/'),!0x1;});for(var _0x4f7227=0x0;_0x4f7227<_0x3b4794[_0x5adb('0x23')];_0x4f7227++)_0x3b4794[_0x4f7227][_0x5adb('0x23')]&&_0x4d98d0[_0x5adb('0x14')](_0x3b4794[_0x4f7227]);return _0x14192d[_0x5adb('0x0')]['getCategory'][_0x5adb('0x52')]=_0x4d98d0;};_0x14192d[_0x5adb('0x0')][_0x5adb('0x51')]['cache']=null;_0x14192d['fn']['QD_SelectSmartResearch2']=function(_0x4ddfdf){var _0x18ee9a=_0x14192d(this);if(!_0x18ee9a[_0x5adb('0x23')])return _0x18ee9a;_0x4ddfdf=_0x14192d[_0x5adb('0x58')]({},_0x4aecec,_0x4ddfdf);_0x18ee9a[_0x5adb('0x59')]=new _0x14192d[(_0x5adb('0x0'))](_0x18ee9a,_0x4ddfdf);return _0x18ee9a;};_0x14192d(function(){_0x14192d(_0x5adb('0x5a'))[_0x5adb('0x0')]();});}}(this));
