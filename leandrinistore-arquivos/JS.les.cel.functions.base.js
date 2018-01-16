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
			Common.applySmartPrice();
			Common.applySmartCart();
			Common.openModalVideoInstitutional();
			Common.smartQuantityShelf();
		},
		ajaxStop: function() {
			Common.applySmartPrice();
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
			$(".footer-qd-v1-facebook-likebox").html('<div class="fb-page" data-href="https://www.facebook.com/leandrinistore/" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/">Leandrini</a></blockquote></div></div>');
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
		applySmartPrice: function () {
			// ATENÇÃO CHAMAR ESSA FUNÇÃO TBM NO AJAX STOP
			var wrapper = $("li[layout]:not(.qd-smart-price-on)").addClass('qd-smart-price-on');
			
			if ($('.shelf-qd-v1-stamps .flag[class*="boleto"]').length) {

			$('<div class="qd-sp-wrap"> <p class="qd_displayPrice shelf-qd-v1-sp-best-price">R$ </p> <span>com</span> <span class="qd-sp-display-discount shelf-qd-v1-sp-discount"> 0% de desconto</span> </div>').insertAfter(".shelf-price:not(.qd-on)");

			$(".shelf-price").addClass('qd-on');

			$('.qd-sp-wrap').show();

			wrapper.find(".flag").QD_SmartPrice({
				filterFlagBy: "[class*='boleto']",
				wrapperElement: wrapper,
				productPage: {
					isProductPage: false
				}
			});
		  }
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
			Home.bannerSlider();
			Home.brandCarousel();
			Home.shelfCarouselHome();
			Home.organizeSideMenuCollection();
			Home.mosaicSetCol();
			Home.instagramPhotoFeed();
			
			// Home.selectSmartResearch2();			
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		bannerSlider: function() {
			$('.slider-qd-v1-full, .mobile-slider-qd-v1-wrapper').slick({
				prevArrow: '<button type="button" class="slick-prev" title="Anterior"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next" title="Próximo"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>',
				dots: true,
				adaptiveHeight: true,
				fade: true,
				speed: 400,
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
		instagramPhotoFeed: function () {
			$('.home-qd-v1-instagram-photos').QD_socialPhotos('184825737.1677ed0.fc07b2476e9c4450bb513d9f37763f18', {
				socialType: 'instagram',
				user: 'leandrinistore',
				photosQtty: 9
			});
		},
		brandCarousel:function(){
			var wrapper = $('.brand-carousel-qd-v1');

			// Titulo
			wrapper.each(function () {
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
			wrapper.each(function () {
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
			Product.applySmartPriceProduct();
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
		applySmartPriceProduct: function () {
			if ($('.product-qd-v1-stamps .flag[class*="boleto"]').length) {
			
				$(".productPrice").append('<div class="qd-sp-wrap"> <p class="qd_displayPrice shelf-qd-v1-sp-best-price">R$ </p> <span>com</span> <span class="qd-sp-display-discount shelf-qd-v1-sp-discount"> 0% no boleto</span> </div>');

				$('.qd-sp-wrap').show();

				$(".product-qd-v1-stamps .flag").QD_SmartPrice({
					filterFlagBy: "[class*='boleto']",					
					productPage: {
						wrapperElement: ".product-qd-v1-sku-selection-box",
						changeNativePrice: false,
						isProductPage: true
					}
				});
			}
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

var _0x1b76=['.qd-sp-display-discount','html','installments','changeInstallments','installmentValue','.qd_sp_display_installments','.qd_sp_display_installmentValue','.qd_saveAmount','append','each','qd_sp_processedItem','call','forcePromotion','startedByWrapper','wrapperElement','.qd_sp_processedItem','.qd_productPrice:not(.qd_sp_processedItem)','display:none\x20!important;','after','extend','boolean','.produto','function','prototype','trim','replace','abs','undefined','round','toFixed','split','length','join','QD_SmartPrice','error','info','warn','toLowerCase','aviso','apply','text','search','match','.flag','[class*=\x27desconto\x27]','auto','.productRightColumn','strong.skuBestPrice','label.skuBestInstallmentNumber','label.skuBestInstallmentValue','strong.skuPrice','rnaqevavfgber%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','---','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','productPage','closest','filterFlagBy','isProductPage','find','skuBestPrice','addClass','qd-active','qd-sp-active','.qd_active','removeClass','siblings','.qd_sp_on','qd_sp_ignored','isDiscountFlag','div[skuCorrente]:first','attr','skuCorrente','skus','sku','available','bestPrice','isSmartCheckout','qd-sp-product-unavailable','alerta','val','Por\x20alguma\x20razão\x20não\x20consegui\x20obter\x20o\x20preço\x20deste\x20produto\x20:(','appliedDiscount','getDiscountValue','listPrice','.qd_displayPrice','skuPrice'];(function(_0x4cbf83,_0x280c5b){var _0x13b2a6=function(_0x1a54a2){while(--_0x1a54a2){_0x4cbf83['push'](_0x4cbf83['shift']());}};_0x13b2a6(++_0x280c5b);}(_0x1b76,0xce));var _0x61b7=function(_0x2590bf,_0x39beec){_0x2590bf=_0x2590bf-0x0;var _0x1543e5=_0x1b76[_0x2590bf];return _0x1543e5;};_0x61b7('0x0')!==typeof String[_0x61b7('0x1')][_0x61b7('0x2')]&&(String[_0x61b7('0x1')][_0x61b7('0x2')]=function(){return this['replace'](/^\s+|\s+$/g,'');});function qd_number_format(_0xc5d5b6,_0x44cf09,_0x57bd67,_0x9436c3){_0xc5d5b6=(_0xc5d5b6+'')[_0x61b7('0x3')](/[^0-9+\-Ee.]/g,'');_0xc5d5b6=isFinite(+_0xc5d5b6)?+_0xc5d5b6:0x0;_0x44cf09=isFinite(+_0x44cf09)?Math[_0x61b7('0x4')](_0x44cf09):0x0;_0x9436c3=_0x61b7('0x5')===typeof _0x9436c3?',':_0x9436c3;_0x57bd67=_0x61b7('0x5')===typeof _0x57bd67?'.':_0x57bd67;var _0x21a65f='',_0x21a65f=function(_0x127d4e,_0x25ee43){var _0x44cf09=Math['pow'](0xa,_0x25ee43);return''+(Math[_0x61b7('0x6')](_0x127d4e*_0x44cf09)/_0x44cf09)[_0x61b7('0x7')](_0x25ee43);},_0x21a65f=(_0x44cf09?_0x21a65f(_0xc5d5b6,_0x44cf09):''+Math[_0x61b7('0x6')](_0xc5d5b6))[_0x61b7('0x8')]('.');0x3<_0x21a65f[0x0][_0x61b7('0x9')]&&(_0x21a65f[0x0]=_0x21a65f[0x0][_0x61b7('0x3')](/\B(?=(?:\d{3})+(?!\d))/g,_0x9436c3));(_0x21a65f[0x1]||'')[_0x61b7('0x9')]<_0x44cf09&&(_0x21a65f[0x1]=_0x21a65f[0x1]||'',_0x21a65f[0x1]+=Array(_0x44cf09-_0x21a65f[0x1]['length']+0x1)[_0x61b7('0xa')]('0'));return _0x21a65f[_0x61b7('0xa')](_0x57bd67);};(function(_0x213f90){'use strict';var _0x3fb453=jQuery;if(typeof _0x3fb453['fn'][_0x61b7('0xb')]===_0x61b7('0x0'))return;var _0xbf3921='Smart\x20Price';var _0x11bd25=function(_0x2773b4,_0x1d9447){if('object'===typeof console&&_0x61b7('0x0')===typeof console[_0x61b7('0xc')]&&_0x61b7('0x0')===typeof console[_0x61b7('0xd')]&&_0x61b7('0x0')===typeof console[_0x61b7('0xe')]){var _0x2739b2;'object'===typeof _0x2773b4?(_0x2773b4['unshift']('['+_0xbf3921+']\x0a'),_0x2739b2=_0x2773b4):_0x2739b2=['['+_0xbf3921+']\x0a'+_0x2773b4];if(_0x61b7('0x5')===typeof _0x1d9447||'alerta'!==_0x1d9447[_0x61b7('0xf')]()&&_0x61b7('0x10')!==_0x1d9447['toLowerCase']())if('undefined'!==typeof _0x1d9447&&_0x61b7('0xd')===_0x1d9447[_0x61b7('0xf')]())try{console[_0x61b7('0xd')][_0x61b7('0x11')](console,_0x2739b2);}catch(_0x5c7d10){console[_0x61b7('0xd')](_0x2739b2['join']('\x0a'));}else try{console[_0x61b7('0xc')][_0x61b7('0x11')](console,_0x2739b2);}catch(_0x160e9a){console[_0x61b7('0xc')](_0x2739b2[_0x61b7('0xa')]('\x0a'));}else try{console[_0x61b7('0xe')]['apply'](console,_0x2739b2);}catch(_0x5d3a08){console[_0x61b7('0xe')](_0x2739b2[_0x61b7('0xa')]('\x0a'));}}};var _0x3d2b35=/[0-9]+\%/i;var _0x379044=/[0-9\.]+(?=\%)/i;var _0xa2d80d={'isDiscountFlag':function(_0x20efab){if(_0x20efab[_0x61b7('0x12')]()[_0x61b7('0x13')](_0x3d2b35)>-0x1)return!![];return![];},'getDiscountValue':function(_0x4e9b1b){return _0x4e9b1b['text']()[_0x61b7('0x14')](_0x379044);},'startedByWrapper':![],'flagElement':_0x61b7('0x15'),'wrapperElement':'li','filterFlagBy':_0x61b7('0x16'),'forcePromotion':null,'appliedDiscount':null,'oneFlagByItem':!![],'isSmartCheckout':!![],'changeInstallments':![],'productPage':{'changeNativeSaveAmount':!![],'changeNativePrice':!![],'changeInstallments':![],'isProductPage':_0x61b7('0x17'),'wrapperElement':_0x61b7('0x18'),'skuBestPrice':_0x61b7('0x19'),'installments':_0x61b7('0x1a'),'installmentValue':_0x61b7('0x1b'),'skuPrice':_0x61b7('0x1c')}};_0x3fb453['fn']['QD_SmartPrice']=function(){};var _0xf6c836=function(_0x28e84a){var _0x23b6ae={'y':_0x61b7('0x1d')};return function(_0x2cf6d8){var _0x988e3,_0x4fef97,_0x44819b,_0x4d3080;_0x4fef97=function(_0x4c5394){return _0x4c5394;};_0x44819b=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2cf6d8=_0x2cf6d8['d'+_0x44819b[0x10]+'c'+_0x44819b[0x11]+'m'+_0x4fef97(_0x44819b[0x1])+'n'+_0x44819b[0xd]]['l'+_0x44819b[0x12]+'c'+_0x44819b[0x0]+'ti'+_0x4fef97('o')+'n'];_0x988e3=function(_0xe0299c){return escape(encodeURIComponent(_0xe0299c[_0x61b7('0x3')](/\./g,'¨')[_0x61b7('0x3')](/[a-zA-Z]/g,function(_0x3d468b){return String[_0x61b7('0x1e')](('Z'>=_0x3d468b?0x5a:0x7a)>=(_0x3d468b=_0x3d468b[_0x61b7('0x1f')](0x0)+0xd)?_0x3d468b:_0x3d468b-0x1a);})));};var _0x3a46f4=_0x988e3(_0x2cf6d8[[_0x44819b[0x9],_0x4fef97('o'),_0x44819b[0xc],_0x44819b[_0x4fef97(0xd)]][_0x61b7('0xa')]('')]);_0x988e3=_0x988e3((window[['js',_0x4fef97('no'),'m',_0x44819b[0x1],_0x44819b[0x4][_0x61b7('0x20')](),_0x61b7('0x21')][_0x61b7('0xa')]('')]||_0x61b7('0x22'))+['.v',_0x44819b[0xd],'e',_0x4fef97('x'),'co',_0x4fef97('mm'),'erc',_0x44819b[0x1],'.c',_0x4fef97('o'),'m.',_0x44819b[0x13],'r']['join'](''));for(var _0x1965c7 in _0x23b6ae){if(_0x988e3===_0x1965c7+_0x23b6ae[_0x1965c7]||_0x3a46f4===_0x1965c7+_0x23b6ae[_0x1965c7]){_0x4d3080='tr'+_0x44819b[0x11]+'e';break;}_0x4d3080='f'+_0x44819b[0x0]+'ls'+_0x4fef97(_0x44819b[0x1])+'';}_0x4fef97=!0x1;-0x1<_0x2cf6d8[[_0x44819b[0xc],'e',_0x44819b[0x0],'rc',_0x44819b[0x9]]['join']('')][_0x61b7('0x23')](_0x61b7('0x24'))&&(_0x4fef97=!0x0);return[_0x4d3080,_0x4fef97];}(_0x28e84a);}(window);if(!eval(_0xf6c836[0x0]))return _0xf6c836[0x1]?_0x11bd25(_0x61b7('0x25')):!0x1;var _0x49e070=function(_0x547f0b,_0x50284e){'use strict';var _0x7739f3=function(_0x12bbb1){'use strict';var _0x1cb741,_0x3180ec,_0x3761dd,_0xe7830a,_0x4c8187,_0x1256db,_0x473c55,_0x33d2cd,_0x3c6e09,_0x4a59ae,_0x177ccb,_0x425945,_0x37cbc3,_0x231d18,_0x1f2e39,_0x2771e7,_0x5b50b2,_0x3cc10c,_0x2c18e3;var _0x14eb94=_0x3fb453(this);_0x12bbb1=typeof _0x12bbb1===_0x61b7('0x5')?![]:_0x12bbb1;if(_0x50284e[_0x61b7('0x26')]['isProductPage'])var _0x15085a=_0x14eb94[_0x61b7('0x27')](_0x50284e[_0x61b7('0x26')]['wrapperElement']);else var _0x15085a=_0x14eb94[_0x61b7('0x27')](_0x50284e['wrapperElement']);if(!_0x12bbb1&&!_0x14eb94['is'](_0x50284e[_0x61b7('0x28')])){if(_0x50284e[_0x61b7('0x26')][_0x61b7('0x29')]&&_0x15085a['is'](_0x50284e[_0x61b7('0x26')]['wrapperElement'])){_0x15085a[_0x61b7('0x2a')](_0x50284e[_0x61b7('0x26')][_0x61b7('0x2b')])[_0x61b7('0x2c')](_0x61b7('0x2d'));_0x15085a['addClass'](_0x61b7('0x2e'));}return;}var _0x16ec02=_0x50284e['productPage']['isProductPage'];if(_0x14eb94['is']('.qd_sp_on,\x20.qd_sp_ignored')&&!_0x16ec02)return;if(_0x16ec02){_0x33d2cd=_0x15085a[_0x61b7('0x2a')](_0x50284e[_0x61b7('0x26')][_0x61b7('0x2b')]);if(_0x33d2cd[_0x61b7('0x2a')](_0x61b7('0x2f'))['length'])return;_0x33d2cd[_0x61b7('0x30')]('qd-active');_0x15085a['removeClass'](_0x61b7('0x2e'));}if(_0x50284e['oneFlagByItem']&&_0x14eb94[_0x61b7('0x31')](_0x61b7('0x32'))[_0x61b7('0x9')]){_0x14eb94[_0x61b7('0x2c')](_0x61b7('0x33'));return;}_0x14eb94['addClass']('qd_sp_on');if(!_0x50284e[_0x61b7('0x34')](_0x14eb94))return;if(_0x16ec02){_0x3761dd={};var _0x58ecc1=parseInt(_0x3fb453(_0x61b7('0x35'))[_0x61b7('0x36')](_0x61b7('0x37')),0xa);if(_0x58ecc1){for(var _0x25a343=0x0;_0x25a343<skuJson[_0x61b7('0x38')][_0x61b7('0x9')];_0x25a343++){if(skuJson[_0x61b7('0x38')][_0x25a343][_0x61b7('0x39')]==_0x58ecc1){_0x3761dd=skuJson[_0x61b7('0x38')][_0x25a343];break;}}}else{var _0x47712c=0x5af3107a3fff;for(var _0x381967 in skuJson[_0x61b7('0x38')]){if(typeof skuJson['skus'][_0x381967]===_0x61b7('0x0'))continue;if(!skuJson[_0x61b7('0x38')][_0x381967][_0x61b7('0x3a')])continue;if(skuJson[_0x61b7('0x38')][_0x381967][_0x61b7('0x3b')]<_0x47712c){_0x47712c=skuJson[_0x61b7('0x38')][_0x381967][_0x61b7('0x3b')];_0x3761dd=skuJson[_0x61b7('0x38')][_0x381967];}}}}_0x2771e7=!![];_0x5b50b2=0x0;if(_0x50284e[_0x61b7('0x3c')]&&_0x3cc10c){_0x2771e7=skuJson[_0x61b7('0x3a')];if(!_0x2771e7)return _0x15085a['addClass'](_0x61b7('0x3d'));}_0x3180ec=_0x50284e['getDiscountValue'](_0x14eb94);_0x1cb741=parseFloat(_0x3180ec,0xa);if(isNaN(_0x1cb741))return _0x11bd25(['O\x20valor\x20informado\x20p/\x20o\x20desconto\x20não\x20é\x20um\x20número.',_0x14eb94],_0x61b7('0x3e'));var _0x44c8df=function(_0x15a208){if(_0x16ec02)_0xe7830a=(_0x15a208[_0x61b7('0x3b')]||0x0)/0x64;else{_0x37cbc3=_0x15085a['find']('.qd_productPrice');_0xe7830a=parseFloat((_0x37cbc3[_0x61b7('0x3f')]()||'')['replace'](/[^0-9\.\,]+/i,'')['replace']('.','')[_0x61b7('0x3')](',','.'),0xa);}if(isNaN(_0xe7830a))return _0x11bd25([_0x61b7('0x40'),_0x14eb94,_0x15085a]);if(_0x50284e[_0x61b7('0x41')]!==null){_0x231d18=0x0;if(!isNaN(_0x50284e['appliedDiscount']))_0x231d18=_0x50284e['appliedDiscount'];else{_0x1f2e39=_0x15085a[_0x61b7('0x2a')](_0x50284e['appliedDiscount']);if(_0x1f2e39[_0x61b7('0x9')])_0x231d18=_0x50284e[_0x61b7('0x42')](_0x1f2e39);}_0x231d18=parseFloat(_0x231d18,0xa);if(isNaN(_0x231d18))_0x231d18=0x0;if(_0x231d18!==0x0)_0xe7830a=_0xe7830a*0x64/(0x64-_0x231d18);}if(_0x16ec02)_0x4c8187=(_0x15a208[_0x61b7('0x43')]||0x0)/0x64;else _0x4c8187=parseFloat((_0x15085a['find']('.qd_productOldPrice')[_0x61b7('0x3f')]()||'')[_0x61b7('0x3')](/[^0-9\.\,]+/i,'')['replace']('.','')['replace'](',','.'),0xa);if(isNaN(_0x4c8187))_0x4c8187=0.001;_0x1256db=_0xe7830a*((0x64-_0x1cb741)/0x64);if(_0x16ec02&&_0x50284e['productPage']['changeNativePrice']){_0x33d2cd['text'](_0x33d2cd[_0x61b7('0x12')]()[_0x61b7('0x2')]()[_0x61b7('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x1256db,0x2,',','.')))[_0x61b7('0x2c')](_0x61b7('0x2d'));_0x15085a[_0x61b7('0x2c')]('qd-sp-active');}else{_0x2c18e3=_0x15085a[_0x61b7('0x2a')](_0x61b7('0x44'));_0x2c18e3['text'](_0x2c18e3[_0x61b7('0x12')]()[_0x61b7('0x3')](/[0-9\.]+,[0-9]+/i,'')+qd_number_format(_0x1256db,0x2,',','.'));}if(_0x16ec02){_0x473c55=_0x15085a['find'](_0x50284e[_0x61b7('0x26')][_0x61b7('0x45')]);if(_0x473c55[_0x61b7('0x9')])_0x473c55[_0x61b7('0x12')](_0x473c55['text']()[_0x61b7('0x2')]()[_0x61b7('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x1256db,0x2,',','.')));}var _0x5cf285=_0x15085a[_0x61b7('0x2a')](_0x61b7('0x46'));_0x5cf285['text'](_0x5cf285[_0x61b7('0x12')]()[_0x61b7('0x3')](/[0-9]+\%/i,_0x1cb741+'%'));var _0x351a82=function(_0x13fd1b,_0x33067f,_0x438f0c){var _0x174150=_0x15085a[_0x61b7('0x2a')](_0x13fd1b);if(_0x174150[_0x61b7('0x9')])_0x174150[_0x61b7('0x47')](_0x174150[_0x61b7('0x47')]()[_0x61b7('0x2')]()[_0x61b7('0x3')](/[0-9]{1,2}/,_0x438f0c?_0x438f0c:_0x15a208[_0x61b7('0x48')]||0x0));var _0x209e12=_0x15085a[_0x61b7('0x2a')](_0x33067f);if(_0x209e12[_0x61b7('0x9')])_0x209e12[_0x61b7('0x47')](_0x209e12[_0x61b7('0x47')]()[_0x61b7('0x2')]()[_0x61b7('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x1256db/(_0x438f0c?_0x438f0c:_0x15a208[_0x61b7('0x48')]||0x1),0x2,',','.')));};if(_0x16ec02&&_0x50284e[_0x61b7('0x26')][_0x61b7('0x49')])_0x351a82(_0x50284e[_0x61b7('0x26')][_0x61b7('0x48')],_0x50284e['productPage'][_0x61b7('0x4a')]);else if(_0x50284e[_0x61b7('0x49')])_0x351a82(_0x61b7('0x4b'),_0x61b7('0x4c'),parseInt(_0x15085a[_0x61b7('0x2a')]('.qd_sp_installments')[_0x61b7('0x3f')]()||0x1)||0x1);_0x15085a[_0x61b7('0x2a')](_0x61b7('0x4d'))[_0x61b7('0x4e')](qd_number_format(_0x4c8187-_0x1256db,0x2,',','.'));_0x15085a[_0x61b7('0x2a')]('.qd_saveAmountPercent')['prepend'](qd_number_format((_0x4c8187-_0x1256db)*0x64/_0x4c8187,0x2,',','.'));if(_0x16ec02&&_0x50284e['productPage']['changeNativeSaveAmount']){_0x3fb453('em.economia-de')[_0x61b7('0x4f')](function(){_0x177ccb=_0x3fb453(this);_0x177ccb[_0x61b7('0x12')](_0x177ccb[_0x61b7('0x12')]()[_0x61b7('0x2')]()[_0x61b7('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x4c8187-_0x1256db,0x2,',','.')));_0x177ccb[_0x61b7('0x2c')](_0x61b7('0x2d'));});}};_0x44c8df(_0x3761dd);if(_0x16ec02)_0x3fb453(window)['on']('skuSelected.vtex',function(_0x44b62f,_0x4d39fb,_0x48d144){_0x44c8df(_0x48d144);});_0x15085a[_0x61b7('0x2c')](_0x61b7('0x50'));if(!_0x16ec02)_0x37cbc3['addClass']('qd_sp_processedItem');};(_0x50284e['startedByWrapper']?_0x547f0b['find'](_0x50284e['flagElement']):_0x547f0b)['each'](function(){_0x7739f3[_0x61b7('0x51')](this,![]);});if(typeof _0x50284e[_0x61b7('0x52')]=='string'){var _0x5210bb=_0x50284e[_0x61b7('0x53')]?_0x547f0b:_0x547f0b[_0x61b7('0x27')](_0x50284e[_0x61b7('0x54')]);if(_0x50284e[_0x61b7('0x26')]['isProductPage'])_0x5210bb=_0x5210bb[_0x61b7('0x27')](_0x50284e[_0x61b7('0x26')]['wrapperElement'])['not'](_0x61b7('0x55'));else _0x5210bb=_0x5210bb['find'](_0x61b7('0x56'));_0x5210bb['each'](function(){var _0x4c40eb=_0x3fb453(_0x50284e[_0x61b7('0x52')]);_0x4c40eb['attr']('style',_0x61b7('0x57'));if(_0x50284e['productPage']['isProductPage'])_0x3fb453(this)[_0x61b7('0x4e')](_0x4c40eb);else _0x3fb453(this)[_0x61b7('0x58')](_0x4c40eb);_0x7739f3['call'](_0x4c40eb,!![]);});}};_0x3fb453['fn'][_0x61b7('0xb')]=function(_0x31cb15){var _0x584b20=_0x3fb453(this);if(!_0x584b20[_0x61b7('0x9')])return _0x584b20;var _0xc9781b=_0x3fb453[_0x61b7('0x59')](!![],{},_0xa2d80d,_0x31cb15);if(typeof _0xc9781b['productPage'][_0x61b7('0x29')]!=_0x61b7('0x5a'))_0xc9781b[_0x61b7('0x26')]['isProductPage']=_0x3fb453(document['body'])['is'](_0x61b7('0x5b'));_0x49e070(_0x584b20,_0xc9781b);return _0x584b20;};}(this));

// amazing menu
var _0x0d78=['qd-am-banner-wrapper','qdAjax','url','html','img[alt=\x27','attr','data-qdam-value','.box-banner','clone','insertBefore','qd-am-content-loaded','text','trim','[class*=\x27colunas\x27]','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','alerta','li\x20>ul','qd-am-has-ul','children',':not(ul)','replaceSpecialChars','>li','qdAmAddNdx','>ul','qd-am-column','qd-am-dropdown','qd-am-level-','add','qd-am-','-li','QuatroDigital.am.callback','extend','.qd_amazing_menu_auto','getParent','closest','QD_amazingMenu','function','/qd-amazing-menu','QD\x20Amazing\x20Menu','object','undefined','error','info','warn','toLowerCase','aviso','apply','join','each','addClass','qd-am-li-','first','qd-am-first','last','rnaqevavfgber%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','ite','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','find','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','parent'];(function(_0x373b5d,_0x134edf){var _0x5bfd91=function(_0x35214a){while(--_0x35214a){_0x373b5d['push'](_0x373b5d['shift']());}};_0x5bfd91(++_0x134edf);}(_0x0d78,0xbf));var _0x80d7=function(_0x1d19f2,_0x611d53){_0x1d19f2=_0x1d19f2-0x0;var _0x50a62a=_0x0d78[_0x1d19f2];return _0x50a62a;};(function(_0x4b71cd){_0x4b71cd['fn'][_0x80d7('0x0')]=_0x4b71cd['fn'][_0x80d7('0x1')];}(jQuery));(function(_0xdce367){'use strict';var _0x27b4b7,_0x5b96f3,_0x27dd1c,_0x4b2a27;_0x27b4b7=jQuery;if(typeof _0x27b4b7['fn'][_0x80d7('0x2')]===_0x80d7('0x3'))return;_0x5b96f3={'url':_0x80d7('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0x10a0b4=_0x80d7('0x5');var _0x527b16=function(_0x579994,_0x2d92d4){if(_0x80d7('0x6')===typeof console&&_0x80d7('0x7')!==typeof console[_0x80d7('0x8')]&&_0x80d7('0x7')!==typeof console[_0x80d7('0x9')]&&_0x80d7('0x7')!==typeof console[_0x80d7('0xa')]){var _0x48bdfc;_0x80d7('0x6')===typeof _0x579994?(_0x579994['unshift']('['+_0x10a0b4+']\x0a'),_0x48bdfc=_0x579994):_0x48bdfc=['['+_0x10a0b4+']\x0a'+_0x579994];if('undefined'===typeof _0x2d92d4||'alerta'!==_0x2d92d4[_0x80d7('0xb')]()&&_0x80d7('0xc')!==_0x2d92d4[_0x80d7('0xb')]())if(_0x80d7('0x7')!==typeof _0x2d92d4&&'info'===_0x2d92d4['toLowerCase']())try{console['info'][_0x80d7('0xd')](console,_0x48bdfc);}catch(_0xaaa84f){try{console[_0x80d7('0x9')](_0x48bdfc[_0x80d7('0xe')]('\x0a'));}catch(_0x485f2b){}}else try{console[_0x80d7('0x8')]['apply'](console,_0x48bdfc);}catch(_0x3d27e5){try{console['error'](_0x48bdfc[_0x80d7('0xe')]('\x0a'));}catch(_0x37bc0c){}}else try{console[_0x80d7('0xa')]['apply'](console,_0x48bdfc);}catch(_0x5051ad){try{console[_0x80d7('0xa')](_0x48bdfc[_0x80d7('0xe')]('\x0a'));}catch(_0x46c695){}}}};_0x27b4b7['fn']['qdAmAddNdx']=function(){var _0x5697ed=_0x27b4b7(this);_0x5697ed[_0x80d7('0xf')](function(_0x3ff31f){_0x27b4b7(this)[_0x80d7('0x10')](_0x80d7('0x11')+_0x3ff31f);});_0x5697ed[_0x80d7('0x12')]()['addClass'](_0x80d7('0x13'));_0x5697ed[_0x80d7('0x14')]()[_0x80d7('0x10')]('qd-am-last');return _0x5697ed;};_0x27b4b7['fn'][_0x80d7('0x2')]=function(){};var _0x468df9=function(_0x4af4d1){var _0x1d67e2={'y':_0x80d7('0x15')};return function(_0x42c2d6){var _0x3f1ad8,_0x2b4105,_0x5eab2b,_0xb4489c;_0x2b4105=function(_0xaa5fd1){return _0xaa5fd1;};_0x5eab2b=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x42c2d6=_0x42c2d6['d'+_0x5eab2b[0x10]+'c'+_0x5eab2b[0x11]+'m'+_0x2b4105(_0x5eab2b[0x1])+'n'+_0x5eab2b[0xd]]['l'+_0x5eab2b[0x12]+'c'+_0x5eab2b[0x0]+'ti'+_0x2b4105('o')+'n'];_0x3f1ad8=function(_0x4342d8){return escape(encodeURIComponent(_0x4342d8[_0x80d7('0x16')](/\./g,'¨')[_0x80d7('0x16')](/[a-zA-Z]/g,function(_0xcd8ddb){return String[_0x80d7('0x17')](('Z'>=_0xcd8ddb?0x5a:0x7a)>=(_0xcd8ddb=_0xcd8ddb[_0x80d7('0x18')](0x0)+0xd)?_0xcd8ddb:_0xcd8ddb-0x1a);})));};var _0x532438=_0x3f1ad8(_0x42c2d6[[_0x5eab2b[0x9],_0x2b4105('o'),_0x5eab2b[0xc],_0x5eab2b[_0x2b4105(0xd)]]['join']('')]);_0x3f1ad8=_0x3f1ad8((window[['js',_0x2b4105('no'),'m',_0x5eab2b[0x1],_0x5eab2b[0x4][_0x80d7('0x19')](),_0x80d7('0x1a')][_0x80d7('0xe')]('')]||'---')+['.v',_0x5eab2b[0xd],'e',_0x2b4105('x'),'co',_0x2b4105('mm'),_0x80d7('0x1b'),_0x5eab2b[0x1],'.c',_0x2b4105('o'),'m.',_0x5eab2b[0x13],'r']['join'](''));for(var _0x370876 in _0x1d67e2){if(_0x3f1ad8===_0x370876+_0x1d67e2[_0x370876]||_0x532438===_0x370876+_0x1d67e2[_0x370876]){_0xb4489c='tr'+_0x5eab2b[0x11]+'e';break;}_0xb4489c='f'+_0x5eab2b[0x0]+'ls'+_0x2b4105(_0x5eab2b[0x1])+'';}_0x2b4105=!0x1;-0x1<_0x42c2d6[[_0x5eab2b[0xc],'e',_0x5eab2b[0x0],'rc',_0x5eab2b[0x9]][_0x80d7('0xe')]('')][_0x80d7('0x1c')](_0x80d7('0x1d'))&&(_0x2b4105=!0x0);return[_0xb4489c,_0x2b4105];}(_0x4af4d1);}(window);if(!eval(_0x468df9[0x0]))return _0x468df9[0x1]?_0x527b16('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x4b2a27=function(_0x178ee0){var _0x347ecd,_0x3aed24,_0x1782bb;_0x1782bb=_0x178ee0[_0x80d7('0x1e')](_0x80d7('0x1f'));_0x347ecd=_0x1782bb[_0x80d7('0x20')](_0x80d7('0x21'));_0x3aed24=_0x1782bb[_0x80d7('0x20')](_0x80d7('0x22'));if(!(_0x347ecd[_0x80d7('0x23')]||_0x3aed24[_0x80d7('0x23')]))return;_0x347ecd[_0x80d7('0x24')]()[_0x80d7('0x10')](_0x80d7('0x25'));_0x3aed24['parent']()[_0x80d7('0x10')]('qd-am-collection-wrapper');_0x27b4b7[_0x80d7('0x26')]({'url':_0x27dd1c[_0x80d7('0x27')],'dataType':_0x80d7('0x28'),'success':function(_0x517ffb){var _0x460f30=_0x27b4b7(_0x517ffb);_0x347ecd[_0x80d7('0xf')](function(){var _0x461895,_0x1e66eb;_0x1e66eb=_0x27b4b7(this);_0x461895=_0x460f30['find'](_0x80d7('0x29')+_0x1e66eb[_0x80d7('0x2a')](_0x80d7('0x2b'))+'\x27]');if(!_0x461895['length'])return;_0x461895[_0x80d7('0xf')](function(){_0x27b4b7(this)['getParent'](_0x80d7('0x2c'))[_0x80d7('0x2d')]()[_0x80d7('0x2e')](_0x1e66eb);});_0x1e66eb['hide']();})[_0x80d7('0x10')](_0x80d7('0x2f'));_0x3aed24[_0x80d7('0xf')](function(){var _0x5c97d6={},_0x476c67;_0x476c67=_0x27b4b7(this);_0x460f30[_0x80d7('0x1e')]('h2')[_0x80d7('0xf')](function(){if(_0x27b4b7(this)[_0x80d7('0x30')]()[_0x80d7('0x31')]()[_0x80d7('0xb')]()==_0x476c67[_0x80d7('0x2a')]('data-qdam-value')['trim']()[_0x80d7('0xb')]()){_0x5c97d6=_0x27b4b7(this);return![];}});if(!_0x5c97d6[_0x80d7('0x23')])return;_0x5c97d6[_0x80d7('0xf')](function(){_0x27b4b7(this)[_0x80d7('0x0')](_0x80d7('0x32'))[_0x80d7('0x2d')]()[_0x80d7('0x2e')](_0x476c67);});_0x476c67['hide']();})[_0x80d7('0x10')](_0x80d7('0x2f'));},'error':function(){_0x527b16(_0x80d7('0x33')+_0x27dd1c[_0x80d7('0x27')]+_0x80d7('0x34'));},'complete':function(){_0x27dd1c[_0x80d7('0x35')][_0x80d7('0x36')](this);_0x27b4b7(window)[_0x80d7('0x37')](_0x80d7('0x38'),_0x178ee0);},'clearQueueDelay':0xbb8});};_0x27b4b7[_0x80d7('0x2')]=function(_0x2deade){var _0x1bd11c=_0x2deade[_0x80d7('0x1e')](_0x80d7('0x39'))['each'](function(){var _0x4d03d7,_0x4837de,_0x456c76,_0x3374bf;_0x4d03d7=_0x27b4b7(this);if(!_0x4d03d7[_0x80d7('0x23')])return _0x527b16(['UL\x20do\x20menu\x20não\x20encontrada',_0x2deade],_0x80d7('0x3a'));_0x4d03d7['find'](_0x80d7('0x3b'))[_0x80d7('0x24')]()[_0x80d7('0x10')](_0x80d7('0x3c'));_0x4d03d7[_0x80d7('0x1e')]('li')[_0x80d7('0xf')](function(){var _0x344754=_0x27b4b7(this),_0x46f8e5;_0x46f8e5=_0x344754[_0x80d7('0x3d')](_0x80d7('0x3e'));if(!_0x46f8e5[_0x80d7('0x23')])return;_0x344754[_0x80d7('0x10')]('qd-am-elem-'+_0x46f8e5['first']()[_0x80d7('0x30')]()[_0x80d7('0x31')]()[_0x80d7('0x3f')]()[_0x80d7('0x16')](/\./g,'')[_0x80d7('0x16')](/\s/g,'-')[_0x80d7('0xb')]());});_0x4837de=_0x4d03d7[_0x80d7('0x1e')](_0x80d7('0x40'))[_0x80d7('0x41')]();_0x4d03d7[_0x80d7('0x10')]('qd-amazing-menu');_0x456c76=_0x4837de['find'](_0x80d7('0x42'));_0x456c76[_0x80d7('0xf')](function(){var _0x4ef7ad=_0x27b4b7(this),_0x38f0a2;_0x38f0a2=_0x4ef7ad[_0x80d7('0x1e')](_0x80d7('0x40'))[_0x80d7('0x41')]()[_0x80d7('0x10')](_0x80d7('0x43'));_0x4ef7ad[_0x80d7('0x10')]('qd-am-dropdown-menu');_0x4ef7ad[_0x80d7('0x24')]()['addClass']('qd-am-dropdown');});_0x456c76[_0x80d7('0x10')](_0x80d7('0x44'));var _0x71350f=0x0;var _0x2eb5bc=function(_0x3e44d9){_0x71350f=_0x71350f+0x1;var _0x1f9c4b=_0x3e44d9[_0x80d7('0x3d')]('li');var _0x1ffaf1=_0x1f9c4b[_0x80d7('0x3d')]('*');if(!_0x1ffaf1[_0x80d7('0x23')])return;_0x1ffaf1['addClass'](_0x80d7('0x45')+_0x71350f);_0x2eb5bc(_0x1ffaf1);};_0x2eb5bc(_0x4d03d7);_0x4d03d7[_0x80d7('0x46')](_0x4d03d7['find']('ul'))['each'](function(){var _0x333c1f=_0x27b4b7(this);_0x333c1f[_0x80d7('0x10')](_0x80d7('0x47')+_0x333c1f[_0x80d7('0x3d')]('li')[_0x80d7('0x23')]+_0x80d7('0x48'));});});_0x4b2a27(_0x1bd11c);_0x27dd1c['callback'][_0x80d7('0x36')](this);_0x27b4b7(window)[_0x80d7('0x37')](_0x80d7('0x49'),_0x2deade);};_0x27b4b7['fn'][_0x80d7('0x2')]=function(_0x39db79){var _0x368b25=_0x27b4b7(this);if(!_0x368b25[_0x80d7('0x23')])return _0x368b25;_0x27dd1c=_0x27b4b7[_0x80d7('0x4a')]({},_0x5b96f3,_0x39db79);_0x368b25['exec']=new _0x27b4b7[(_0x80d7('0x2'))](_0x27b4b7(this));return _0x368b25;};_0x27b4b7(function(){_0x27b4b7(_0x80d7('0x4b'))[_0x80d7('0x2')]();});}(this));

// smart cart
var _0x9960=['.qd-ddc-cep-ok','.qd-ddc-cep','updateOnlyHover','mouseenter.qd_ddc_hover','getCartInfoByUrl','simpleCart','cartIsEmpty','cartContainer','each','call','clone','callback','total','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','shipping','allTotal','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','.qd-ddc-wrapper','_QuatroDigital_AmountProduct','exec','addClass','getOrderForm','QD_checkoutQueue','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','<img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/>','<span\x20class=\x22qd-ddc-imgLoading\x22></span>','</div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22>','<div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a>','<input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a>','<span\x20class=\x22qd-ddc-qttLoading\x22></span>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22>','<div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a>','empty','availability','.qd-ddc-prodName','sellingPrice','meta[name=currency]','attr','content','.qd-ddc-quantity','val','quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','address','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','lastSku','[data-sku=\x27','outerHeight','parent','qd-ddc-lastAddedFixed','timeRemoveNewItemClass','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','string','http','https','qd-loaded','load','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','alerta','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','qd-loading','click.qd_ddc_minus','keyup.qd_ddc_change','removeProduct','stop','slideUp','remove','$1-$2$3','shippingCalculate','data','calculateShipping','BRA','done','.qd-ddc-cep-tooltip-text','.qd-dd-cep-slas','logisticsInfo','slas','<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>','shippingEstimate','\x20dia\x20útil','<tr></tr>','<td>\x20R$\x20','price',',\x20entrega\x20em\x20','\x20para\x20o\x20CEP\x20','</td>','insertBefore','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','qdDdcLastPostalCode','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','totalizers','atenção\x20esta\x20método\x20esta\x20descontinuado','boolean','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','avisso','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','buyButtonClicked','quickViewUpdate','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-wrapper','qd-bap-item-added','input.qd-productId[value=','prodId','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','productId','prod_','Quatro\x20Digital\x20-\x20Plus\x20Smart\x20Cart','.qdDdcContainer','QD_smartCart','dropDown','selector','QD_buyButton','buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','replace','abs','undefined','pow','round','toFixed','length','join','_QuatroDigital_CartData','Callbacks','error','function','Oooops!\x20','message','Quatro\x20Digital\x20-\x20DropDown\x20Cart','object','info','warn','unshift','toLowerCase','aviso','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','rnaqevavfgber%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','toUpperCase','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','skuName','extend','smartCheckout','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','vtexjs','checkout','SDK','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22>','<div\x20class=\x22qd-ddc-wrapper2\x22>','<div\x20class=\x22qd_ddc_lightBoxClose\x22></div>','<div\x20class=\x22qd-ddc-wrapper3\x22>','<div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div>','<div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div>','<span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div>','<div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22>','<div\x20class=\x22qd-ddc-shipping\x22></div>','<div\x20class=\x22qd-ddc-infoTotal\x22></div>','<div\x20class=\x22qd-ddc-infoBts\x22>','<a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a>','</div></div></div></div></div>','texts','cartTotal','#value','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','find','html','linkCart','.qd_ddc_continueShopping','linkCheckout','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','emptyCart','append','add','.qd_ddc_lightBoxOverlay','body','qd-bb-lightBoxBodyProdAdd','keyup.qd_ddc_closeFn','removeClass','.qd-ddc-prodWrapper','click.qd_ddc_scrollUp','scrollCart','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20.qd-ddc-cep','formatCepField','keyCode','.qd-ddc-shipping\x20.qd-ddc-cep-ok','click','preventDefault','toggle','.qd-ddc-cep-close','off','click._QD_DDC_closeShipping','closest','.qd-ddc-cep-tooltip','hide'];(function(_0x6ade9a,_0x34f277){var _0x3d71c1=function(_0x51f4ad){while(--_0x51f4ad){_0x6ade9a['push'](_0x6ade9a['shift']());}};_0x3d71c1(++_0x34f277);}(_0x9960,0x19b));var _0x0996=function(_0x7d3bac,_0x184961){_0x7d3bac=_0x7d3bac-0x0;var _0x552b3d=_0x9960[_0x7d3bac];return _0x552b3d;};(function(_0x8cc444){_0x8cc444['fn'][_0x0996('0x0')]=_0x8cc444['fn']['closest'];}(jQuery));function qd_number_format(_0x2a9b80,_0x316045,_0x20af84,_0x20fae6){_0x2a9b80=(_0x2a9b80+'')[_0x0996('0x1')](/[^0-9+\-Ee.]/g,'');_0x2a9b80=isFinite(+_0x2a9b80)?+_0x2a9b80:0x0;_0x316045=isFinite(+_0x316045)?Math[_0x0996('0x2')](_0x316045):0x0;_0x20fae6=_0x0996('0x3')===typeof _0x20fae6?',':_0x20fae6;_0x20af84='undefined'===typeof _0x20af84?'.':_0x20af84;var _0x56dd12='',_0x56dd12=function(_0x3f4c46,_0x85a456){var _0x316045=Math[_0x0996('0x4')](0xa,_0x85a456);return''+(Math[_0x0996('0x5')](_0x3f4c46*_0x316045)/_0x316045)[_0x0996('0x6')](_0x85a456);},_0x56dd12=(_0x316045?_0x56dd12(_0x2a9b80,_0x316045):''+Math['round'](_0x2a9b80))['split']('.');0x3<_0x56dd12[0x0]['length']&&(_0x56dd12[0x0]=_0x56dd12[0x0][_0x0996('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x20fae6));(_0x56dd12[0x1]||'')[_0x0996('0x7')]<_0x316045&&(_0x56dd12[0x1]=_0x56dd12[0x1]||'',_0x56dd12[0x1]+=Array(_0x316045-_0x56dd12[0x1][_0x0996('0x7')]+0x1)[_0x0996('0x8')]('0'));return _0x56dd12[_0x0996('0x8')](_0x20af84);};(function(){'use strict';try{window[_0x0996('0x9')]=window['_QuatroDigital_CartData']||{};window[_0x0996('0x9')]['callback']=window[_0x0996('0x9')]['callback']||$[_0x0996('0xa')]();}catch(_0x2b625c){if(typeof console!==_0x0996('0x3')&&typeof console[_0x0996('0xb')]===_0x0996('0xc'))console[_0x0996('0xb')](_0x0996('0xd'),_0x2b625c[_0x0996('0xe')]);}}());(function(_0x16e0fe){'use strict';try{var _0x33da5=jQuery;var _0x30e556=_0x0996('0xf');var _0x3a5edf=function(_0x1d3b6a,_0x3832e8){if(_0x0996('0x10')===typeof console&&_0x0996('0x3')!==typeof console['error']&&_0x0996('0x3')!==typeof console[_0x0996('0x11')]&&_0x0996('0x3')!==typeof console[_0x0996('0x12')]){var _0x2e5cbb;_0x0996('0x10')===typeof _0x1d3b6a?(_0x1d3b6a[_0x0996('0x13')]('['+_0x30e556+']\x0a'),_0x2e5cbb=_0x1d3b6a):_0x2e5cbb=['['+_0x30e556+']\x0a'+_0x1d3b6a];if('undefined'===typeof _0x3832e8||'alerta'!==_0x3832e8[_0x0996('0x14')]()&&_0x0996('0x15')!==_0x3832e8[_0x0996('0x14')]())if(_0x0996('0x3')!==typeof _0x3832e8&&_0x0996('0x11')===_0x3832e8['toLowerCase']())try{console[_0x0996('0x11')]['apply'](console,_0x2e5cbb);}catch(_0x5077fe){try{console['info'](_0x2e5cbb[_0x0996('0x8')]('\x0a'));}catch(_0x2a6cb3){}}else try{console[_0x0996('0xb')][_0x0996('0x16')](console,_0x2e5cbb);}catch(_0x38b79e){try{console[_0x0996('0xb')](_0x2e5cbb[_0x0996('0x8')]('\x0a'));}catch(_0x50e575){}}else try{console['warn'][_0x0996('0x16')](console,_0x2e5cbb);}catch(_0x44710a){try{console[_0x0996('0x12')](_0x2e5cbb[_0x0996('0x8')]('\x0a'));}catch(_0x7133f8){}}}};window[_0x0996('0x17')]=window[_0x0996('0x17')]||{};window[_0x0996('0x17')][_0x0996('0x18')]=!![];_0x33da5[_0x0996('0x19')]=function(){};_0x33da5['fn'][_0x0996('0x19')]=function(){return{'fn':new _0x33da5()};};var _0x5e7029=function(_0x5248f6){var _0x3d5a5e={'y':_0x0996('0x1a')};return function(_0x4ee675){var _0xe05de6,_0x2cdbd1,_0x1a400e,_0x42f515;_0x2cdbd1=function(_0x43ba27){return _0x43ba27;};_0x1a400e=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4ee675=_0x4ee675['d'+_0x1a400e[0x10]+'c'+_0x1a400e[0x11]+'m'+_0x2cdbd1(_0x1a400e[0x1])+'n'+_0x1a400e[0xd]]['l'+_0x1a400e[0x12]+'c'+_0x1a400e[0x0]+'ti'+_0x2cdbd1('o')+'n'];_0xe05de6=function(_0x1b3b05){return escape(encodeURIComponent(_0x1b3b05['replace'](/\./g,'¨')[_0x0996('0x1')](/[a-zA-Z]/g,function(_0x1a6d3e){return String['fromCharCode'](('Z'>=_0x1a6d3e?0x5a:0x7a)>=(_0x1a6d3e=_0x1a6d3e[_0x0996('0x1b')](0x0)+0xd)?_0x1a6d3e:_0x1a6d3e-0x1a);})));};var _0x486ded=_0xe05de6(_0x4ee675[[_0x1a400e[0x9],_0x2cdbd1('o'),_0x1a400e[0xc],_0x1a400e[_0x2cdbd1(0xd)]][_0x0996('0x8')]('')]);_0xe05de6=_0xe05de6((window[['js',_0x2cdbd1('no'),'m',_0x1a400e[0x1],_0x1a400e[0x4][_0x0996('0x1c')](),'ite'][_0x0996('0x8')]('')]||_0x0996('0x1d'))+['.v',_0x1a400e[0xd],'e',_0x2cdbd1('x'),'co',_0x2cdbd1('mm'),_0x0996('0x1e'),_0x1a400e[0x1],'.c',_0x2cdbd1('o'),'m.',_0x1a400e[0x13],'r'][_0x0996('0x8')](''));for(var _0x38856d in _0x3d5a5e){if(_0xe05de6===_0x38856d+_0x3d5a5e[_0x38856d]||_0x486ded===_0x38856d+_0x3d5a5e[_0x38856d]){_0x42f515='tr'+_0x1a400e[0x11]+'e';break;}_0x42f515='f'+_0x1a400e[0x0]+'ls'+_0x2cdbd1(_0x1a400e[0x1])+'';}_0x2cdbd1=!0x1;-0x1<_0x4ee675[[_0x1a400e[0xc],'e',_0x1a400e[0x0],'rc',_0x1a400e[0x9]][_0x0996('0x8')]('')][_0x0996('0x1f')](_0x0996('0x20'))&&(_0x2cdbd1=!0x0);return[_0x42f515,_0x2cdbd1];}(_0x5248f6);}(window);if(!eval(_0x5e7029[0x0]))return _0x5e7029[0x1]?_0x3a5edf('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x33da5['QD_dropDownCart']=function(_0x4f8be4,_0x52cf8f){var _0x10bd3e,_0x5ac46f,_0xb579c3,_0x56f722,_0xeb4ddb,_0x1aa3c9,_0x273b19,_0x2cf41b,_0x42776c,_0x3edaa3,_0x4def2e,_0x494a54;_0x4def2e=_0x33da5(_0x4f8be4);if(!_0x4def2e[_0x0996('0x7')])return _0x4def2e;_0x10bd3e={'updateOnlyHover':!![],'texts':{'linkCart':_0x0996('0x21'),'linkCheckout':_0x0996('0x22'),'cartTotal':_0x0996('0x23'),'emptyCart':_0x0996('0x24'),'continueShopping':'Continuar\x20Comprando','shippingForm':'<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!![],'forceImageHTTPS':![],'skuName':function(_0x53f30d){return _0x53f30d[_0x0996('0x25')]||_0x53f30d['name'];},'callback':function(){},'callbackProductsList':function(){}};_0x5ac46f=_0x33da5[_0x0996('0x26')](!![],{},_0x10bd3e,_0x52cf8f);_0xb579c3=_0x33da5('');_0x3edaa3=this;if(_0x5ac46f[_0x0996('0x27')]){var _0x55673e=![];if(typeof window['vtexjs']===_0x0996('0x3')){_0x3a5edf('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN');_0x33da5[_0x0996('0x28')]({'url':_0x0996('0x29'),'async':![],'dataType':_0x0996('0x2a'),'error':function(){_0x3a5edf(_0x0996('0x2b'));_0x55673e=!![];}});}if(_0x55673e)return _0x3a5edf(_0x0996('0x2c'));}var _0x1be8cf;if(typeof window[_0x0996('0x2d')]===_0x0996('0x10')&&typeof window['vtexjs']['checkout']!==_0x0996('0x3'))_0x1be8cf=window[_0x0996('0x2d')][_0x0996('0x2e')];else if(typeof vtex===_0x0996('0x10')&&typeof vtex[_0x0996('0x2e')]===_0x0996('0x10')&&typeof vtex['checkout'][_0x0996('0x2f')]!==_0x0996('0x3'))_0x1be8cf=new vtex[(_0x0996('0x2e'))][(_0x0996('0x2f'))]();else return _0x3a5edf('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x3edaa3['cartContainer']=_0x0996('0x30')+_0x0996('0x31')+_0x0996('0x32')+_0x0996('0x33')+_0x0996('0x34')+_0x0996('0x35')+_0x0996('0x36')+_0x0996('0x37')+_0x0996('0x38')+_0x0996('0x39')+_0x0996('0x3a')+_0x0996('0x3b')+_0x0996('0x3c');_0x1aa3c9=function(_0x5c875e){var _0x2ba9ea=_0x33da5(_0x5c875e);_0x5ac46f[_0x0996('0x3d')][_0x0996('0x3e')]=_0x5ac46f[_0x0996('0x3d')][_0x0996('0x3e')][_0x0996('0x1')](_0x0996('0x3f'),'<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>');_0x5ac46f[_0x0996('0x3d')][_0x0996('0x3e')]=_0x5ac46f[_0x0996('0x3d')][_0x0996('0x3e')][_0x0996('0x1')](_0x0996('0x40'),_0x0996('0x41'));_0x5ac46f[_0x0996('0x3d')][_0x0996('0x3e')]=_0x5ac46f[_0x0996('0x3d')][_0x0996('0x3e')]['replace'](_0x0996('0x42'),_0x0996('0x43'));_0x5ac46f[_0x0996('0x3d')][_0x0996('0x3e')]=_0x5ac46f['texts']['cartTotal'][_0x0996('0x1')](_0x0996('0x44'),_0x0996('0x45'));_0x2ba9ea[_0x0996('0x46')]('.qd-ddc-viewCart')[_0x0996('0x47')](_0x5ac46f[_0x0996('0x3d')][_0x0996('0x48')]);_0x2ba9ea[_0x0996('0x46')](_0x0996('0x49'))[_0x0996('0x47')](_0x5ac46f[_0x0996('0x3d')]['continueShopping']);_0x2ba9ea[_0x0996('0x46')]('.qd-ddc-checkout')['html'](_0x5ac46f['texts'][_0x0996('0x4a')]);_0x2ba9ea[_0x0996('0x46')]('.qd-ddc-infoTotal')[_0x0996('0x47')](_0x5ac46f[_0x0996('0x3d')][_0x0996('0x3e')]);_0x2ba9ea[_0x0996('0x46')](_0x0996('0x4b'))[_0x0996('0x47')](_0x5ac46f['texts'][_0x0996('0x4c')]);_0x2ba9ea[_0x0996('0x46')](_0x0996('0x4d'))[_0x0996('0x47')](_0x5ac46f[_0x0996('0x3d')][_0x0996('0x4e')]);return _0x2ba9ea;};_0xeb4ddb=function(_0x16b80f){_0x33da5(this)[_0x0996('0x4f')](_0x16b80f);_0x16b80f[_0x0996('0x46')]('.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose')[_0x0996('0x50')](_0x33da5(_0x0996('0x51')))['on']('click.qd_ddc_closeFn',function(){_0x4def2e['removeClass']('qd-bb-lightBoxProdAdd');_0x33da5(document[_0x0996('0x52')])['removeClass'](_0x0996('0x53'));});_0x33da5(document)['off'](_0x0996('0x54'))['on'](_0x0996('0x54'),function(_0x33b57a){if(_0x33b57a['keyCode']==0x1b){_0x4def2e['removeClass']('qd-bb-lightBoxProdAdd');_0x33da5(document[_0x0996('0x52')])[_0x0996('0x55')]('qd-bb-lightBoxBodyProdAdd');}});var _0x145b37=_0x16b80f[_0x0996('0x46')](_0x0996('0x56'));_0x16b80f[_0x0996('0x46')]('.qd-ddc-scrollUp')['on'](_0x0996('0x57'),function(){_0x3edaa3[_0x0996('0x58')]('-',undefined,undefined,_0x145b37);return![];});_0x16b80f[_0x0996('0x46')]('.qd-ddc-scrollDown')['on'](_0x0996('0x59'),function(){_0x3edaa3[_0x0996('0x58')](undefined,undefined,undefined,_0x145b37);return![];});var _0x32a5fb=_0x16b80f['find']('.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text');_0x16b80f[_0x0996('0x46')](_0x0996('0x5a'))['val']('')['on']('keyup.qd_ddc_cep',function(_0x5d304e){_0x3edaa3[_0x0996('0x5b')](_0x33da5(this));if(_0x5d304e[_0x0996('0x5c')]==0xd)_0x16b80f[_0x0996('0x46')](_0x0996('0x5d'))[_0x0996('0x5e')]();});_0x16b80f['find']('.qd-ddc-cep-btn')[_0x0996('0x5e')](function(_0x59792a){_0x59792a[_0x0996('0x5f')]();_0x32a5fb[_0x0996('0x60')]();});_0x16b80f[_0x0996('0x46')](_0x0996('0x61'))[_0x0996('0x5e')](function(_0x40a0fe){_0x40a0fe['preventDefault']();_0x32a5fb['hide']();});_0x33da5(document)[_0x0996('0x62')]('click._QD_DDC_closeShipping')['on'](_0x0996('0x63'),function(_0xe8ecf1){if(_0x33da5(_0xe8ecf1['target'])[_0x0996('0x64')](_0x16b80f['find'](_0x0996('0x65')))[_0x0996('0x7')])return;_0x32a5fb[_0x0996('0x66')]();});_0x16b80f['find'](_0x0996('0x67'))['click'](function(_0x3af339){_0x3af339[_0x0996('0x5f')]();_0x3edaa3['shippingCalculate'](_0x16b80f[_0x0996('0x46')](_0x0996('0x68')));});if(_0x5ac46f[_0x0996('0x69')]){var _0x40d330=0x0;_0x33da5(this)['on'](_0x0996('0x6a'),function(){var _0x152f2c=function(){if(!window[_0x0996('0x17')][_0x0996('0x18')])return;_0x3edaa3[_0x0996('0x6b')]();window['_QuatroDigital_DropDown']['allowUpdate']=![];_0x33da5['fn'][_0x0996('0x6c')](!![]);_0x3edaa3[_0x0996('0x6d')]();};_0x40d330=setInterval(function(){_0x152f2c();},0x258);_0x152f2c();});_0x33da5(this)['on']('mouseleave.qd_ddc_hover',function(){clearInterval(_0x40d330);});}};_0x273b19=_0x1aa3c9(this[_0x0996('0x6e')]);_0x2cf41b=0x0;_0x4def2e[_0x0996('0x6f')](function(){if(_0x2cf41b>0x0)_0xeb4ddb[_0x0996('0x70')](this,_0x273b19[_0x0996('0x71')]());else _0xeb4ddb[_0x0996('0x70')](this,_0x273b19);_0x2cf41b++;});window[_0x0996('0x9')][_0x0996('0x72')][_0x0996('0x50')](function(){_0x33da5('.qd-ddc-infoTotalValue')[_0x0996('0x47')](window[_0x0996('0x9')][_0x0996('0x73')]||'--');_0x33da5(_0x0996('0x74'))[_0x0996('0x47')](window[_0x0996('0x9')][_0x0996('0x75')]||'0');_0x33da5(_0x0996('0x76'))[_0x0996('0x47')](window[_0x0996('0x9')][_0x0996('0x77')]||'--');_0x33da5('.qd-ddc-infoAllTotal')[_0x0996('0x47')](window[_0x0996('0x9')][_0x0996('0x78')]||'--');});_0x42776c=function(_0x515de7){_0x3a5edf('Atenção,\x20você\x20esta\x20utilizando\x20um\x20método\x20descontinuado');};_0x494a54=function(_0x43d882,_0x11797b){if(typeof _0x43d882[_0x0996('0x79')]===_0x0996('0x3'))return _0x3a5edf(_0x0996('0x7a'));_0x3edaa3[_0x0996('0x7b')]['call'](this,_0x11797b);};_0x3edaa3[_0x0996('0x6b')]=function(_0x155569,_0x13f7b5){var _0x489bc4;if(typeof _0x13f7b5!=_0x0996('0x3'))window[_0x0996('0x17')][_0x0996('0x7c')]=_0x13f7b5;else if(window[_0x0996('0x17')][_0x0996('0x7c')])_0x13f7b5=window[_0x0996('0x17')][_0x0996('0x7c')];setTimeout(function(){window[_0x0996('0x17')]['dataOptionsCache']=undefined;},_0x5ac46f['timeRemoveNewItemClass']);_0x33da5(_0x0996('0x7d'))[_0x0996('0x55')]('qd-ddc-prodLoaded');if(_0x5ac46f[_0x0996('0x27')]){_0x489bc4=function(_0x530e74){window['_QuatroDigital_DropDown']['getOrderForm']=_0x530e74;_0x494a54(_0x530e74,_0x13f7b5);if(typeof window[_0x0996('0x7e')]!=='undefined'&&typeof window[_0x0996('0x7e')][_0x0996('0x7f')]===_0x0996('0xc'))window[_0x0996('0x7e')][_0x0996('0x7f')][_0x0996('0x70')](this);_0x33da5(_0x0996('0x7d'))[_0x0996('0x80')]('qd-ddc-prodLoaded');};if(typeof window[_0x0996('0x17')][_0x0996('0x81')]!=='undefined'){_0x489bc4(window[_0x0996('0x17')][_0x0996('0x81')]);if(typeof _0x155569===_0x0996('0xc'))_0x155569(window[_0x0996('0x17')]['getOrderForm']);return;}_0x33da5[_0x0996('0x82')]([_0x0996('0x79'),'totalizers',_0x0996('0x83')],{'done':function(_0x2daf5c){_0x489bc4[_0x0996('0x70')](this,_0x2daf5c);if(typeof _0x155569===_0x0996('0xc'))_0x155569(_0x2daf5c);},'fail':function(_0x51dad0){_0x3a5edf([_0x0996('0x84'),_0x51dad0]);}});}else{alert(_0x0996('0x85'));}};_0x3edaa3[_0x0996('0x6d')]=function(){var _0x258c58=_0x33da5(_0x0996('0x7d'));if(_0x258c58[_0x0996('0x46')](_0x0996('0x86'))[_0x0996('0x7')])_0x258c58[_0x0996('0x55')](_0x0996('0x87'));else _0x258c58[_0x0996('0x80')](_0x0996('0x87'));};_0x3edaa3[_0x0996('0x7b')]=function(_0x54fcb3){var _0x1317ad=_0x33da5(_0x0996('0x88'));var _0x3110ca='<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22>'+'<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22>'+'<div\x20class=\x22qd-ddc-prodImgWrapper\x22>'+_0x0996('0x89')+_0x0996('0x8a')+_0x0996('0x8b')+_0x0996('0x8b')+'<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div>'+'<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div>'+_0x0996('0x8c')+_0x0996('0x8d')+_0x0996('0x8e')+_0x0996('0x8f')+_0x0996('0x90')+_0x0996('0x91')+_0x0996('0x8b')+_0x0996('0x8b')+_0x0996('0x92')+_0x0996('0x93')+_0x0996('0x94')+'<span\x20class=\x22qd-ddc-prodRowLoading\x22></span>'+'</div>'+_0x0996('0x8b')+_0x0996('0x8b');_0x1317ad[_0x0996('0x95')]();_0x1317ad[_0x0996('0x6f')](function(){var _0x32e5b2=_0x33da5(this);var _0x242833,_0x501079,_0x5189b0,_0x87f230;var _0x41b14d=_0x33da5('');var _0x47935b;for(var _0x4e2e94 in window[_0x0996('0x17')][_0x0996('0x81')][_0x0996('0x79')]){if(typeof window[_0x0996('0x17')]['getOrderForm'][_0x0996('0x79')][_0x4e2e94]!==_0x0996('0x10'))continue;_0x5189b0=window['_QuatroDigital_DropDown'][_0x0996('0x81')]['items'][_0x4e2e94];_0x47935b=_0x5189b0['productCategoryIds'][_0x0996('0x1')](/^\/|\/$/g,'')['split']('/');_0x501079=_0x33da5(_0x3110ca);_0x501079['attr']({'data-sku':_0x5189b0['id'],'data-sku-index':_0x4e2e94,'data-qd-departament':_0x47935b[0x0],'data-qd-category':_0x47935b[_0x47935b[_0x0996('0x7')]-0x1]});_0x501079[_0x0996('0x80')]('qd-ddc-'+_0x5189b0[_0x0996('0x96')]);_0x501079[_0x0996('0x46')](_0x0996('0x97'))[_0x0996('0x4f')](_0x5ac46f[_0x0996('0x25')](_0x5189b0));_0x501079[_0x0996('0x46')]('.qd-ddc-prodPrice')[_0x0996('0x4f')](isNaN(_0x5189b0[_0x0996('0x98')])?_0x5189b0[_0x0996('0x98')]:_0x5189b0['sellingPrice']==0x0?'Grátis':(_0x33da5(_0x0996('0x99'))[_0x0996('0x9a')](_0x0996('0x9b'))||'R$')+'\x20'+qd_number_format(_0x5189b0[_0x0996('0x98')]/0x64,0x2,',','.'));_0x501079['find'](_0x0996('0x9c'))[_0x0996('0x9a')]({'data-sku':_0x5189b0['id'],'data-sku-index':_0x4e2e94})[_0x0996('0x9d')](_0x5189b0[_0x0996('0x9e')]);_0x501079[_0x0996('0x46')](_0x0996('0x9f'))[_0x0996('0x9a')]({'data-sku':_0x5189b0['id'],'data-sku-index':_0x4e2e94});_0x3edaa3[_0x0996('0xa0')](_0x5189b0['id'],_0x501079[_0x0996('0x46')](_0x0996('0xa1')),_0x5189b0[_0x0996('0xa2')]);_0x501079[_0x0996('0x46')](_0x0996('0xa3'))['attr']({'data-sku':_0x5189b0['id'],'data-sku-index':_0x4e2e94});_0x501079[_0x0996('0xa4')](_0x32e5b2);_0x41b14d=_0x41b14d[_0x0996('0x50')](_0x501079);}try{var _0x78b8b1=_0x32e5b2[_0x0996('0x0')](_0x0996('0x7d'))[_0x0996('0x46')]('.qd-ddc-shipping\x20input');if(_0x78b8b1[_0x0996('0x7')]&&_0x78b8b1[_0x0996('0x9d')]()==''&&window[_0x0996('0x17')][_0x0996('0x81')][_0x0996('0x83')][_0x0996('0xa5')])_0x78b8b1[_0x0996('0x9d')](window[_0x0996('0x17')][_0x0996('0x81')][_0x0996('0x83')]['address']['postalCode']);}catch(_0x5a7540){_0x3a5edf(_0x0996('0xa6')+_0x5a7540[_0x0996('0xe')],_0x0996('0x15'));}_0x3edaa3['actionButtons'](_0x32e5b2);_0x3edaa3[_0x0996('0x6d')]();if(_0x54fcb3&&_0x54fcb3[_0x0996('0xa7')]){(function(){_0x87f230=_0x41b14d['filter'](_0x0996('0xa8')+_0x54fcb3['lastSku']+'\x27]');if(!_0x87f230[_0x0996('0x7')])return;_0x242833=0x0;_0x41b14d['each'](function(){var _0x2df18a=_0x33da5(this);if(_0x2df18a['is'](_0x87f230))return![];_0x242833+=_0x2df18a[_0x0996('0xa9')]();});_0x3edaa3[_0x0996('0x58')](undefined,undefined,_0x242833,_0x32e5b2[_0x0996('0x50')](_0x32e5b2[_0x0996('0xaa')]()));_0x41b14d[_0x0996('0x55')](_0x0996('0xab'));(function(_0x57d9de){_0x57d9de['addClass']('qd-ddc-lastAdded');_0x57d9de['addClass'](_0x0996('0xab'));setTimeout(function(){_0x57d9de[_0x0996('0x55')]('qd-ddc-lastAdded');},_0x5ac46f[_0x0996('0xac')]);}(_0x87f230));_0x33da5(document[_0x0996('0x52')])[_0x0996('0x80')]('qd-ddc-product-add-time-v2');setTimeout(function(){_0x33da5(document[_0x0996('0x52')])[_0x0996('0x55')](_0x0996('0xad'));},_0x5ac46f['timeRemoveNewItemClass']);}());}});(function(){if(_QuatroDigital_DropDown['getOrderForm'][_0x0996('0x79')]['length']){_0x33da5('body')[_0x0996('0x55')](_0x0996('0xae'))[_0x0996('0x80')](_0x0996('0xaf'));setTimeout(function(){_0x33da5(_0x0996('0x52'))[_0x0996('0x55')]('qd-ddc-product-add-time');},_0x5ac46f['timeRemoveNewItemClass']);}else _0x33da5(_0x0996('0x52'))['removeClass'](_0x0996('0xb0'))[_0x0996('0x80')]('qd-ddc-cart-empty');}());if(typeof _0x5ac46f[_0x0996('0xb1')]===_0x0996('0xc'))_0x5ac46f[_0x0996('0xb1')][_0x0996('0x70')](this);else _0x3a5edf(_0x0996('0xb2'));};_0x3edaa3[_0x0996('0xa0')]=function(_0x1a8017,_0x3f07f9,_0x50f49e){var _0x799540=!![];function _0x1187ee(){if(_0x5ac46f['forceImageHTTPS']&&typeof _0x50f49e==_0x0996('0xb3'))_0x50f49e=_0x50f49e['replace'](_0x0996('0xb4'),_0x0996('0xb5'));_0x3f07f9[_0x0996('0x55')](_0x0996('0xb6'))[_0x0996('0xb7')](function(){_0x33da5(this)[_0x0996('0x80')](_0x0996('0xb6'));})[_0x0996('0x9a')]('src',_0x50f49e);};if(_0x50f49e)_0x1187ee();else if(!isNaN(_0x1a8017)){alert(_0x0996('0xb8'));}else _0x3a5edf(_0x0996('0xb9'),_0x0996('0xba'));};_0x3edaa3['actionButtons']=function(_0x2f3bd2){var _0x58c8e1,_0xfd3f18,_0x99e6d9,_0x3b6806;_0x58c8e1=function(_0x38f032,_0x32c396){var _0xeb0fc2,_0x51d918,_0x5b5614,_0x50f4b1,_0x5b5042;_0x5b5614=_0x33da5(_0x38f032);_0xeb0fc2=_0x5b5614['attr'](_0x0996('0xbb'));_0x5b5042=_0x5b5614[_0x0996('0x9a')](_0x0996('0xbc'));if(!_0xeb0fc2)return;_0x51d918=parseInt(_0x5b5614[_0x0996('0x9d')]())||0x1;_0x3edaa3[_0x0996('0xbd')]([_0xeb0fc2,_0x5b5042],_0x51d918,_0x51d918+0x1,function(_0x321a0a){_0x5b5614[_0x0996('0x9d')](_0x321a0a);if(typeof _0x32c396==='function')_0x32c396();});};_0x99e6d9=function(_0x549bb3,_0x48d2eb){var _0x45c802,_0x1d9351,_0x4ab3ff,_0x579334,_0x293ebf;_0x4ab3ff=_0x33da5(_0x549bb3);_0x45c802=_0x4ab3ff[_0x0996('0x9a')]('data-sku');_0x293ebf=_0x4ab3ff['attr']('data-sku-index');if(!_0x45c802)return;_0x1d9351=parseInt(_0x4ab3ff[_0x0996('0x9d')]())||0x2;_0x579334=_0x3edaa3[_0x0996('0xbd')]([_0x45c802,_0x293ebf],_0x1d9351,_0x1d9351-0x1,function(_0x5621d6){_0x4ab3ff[_0x0996('0x9d')](_0x5621d6);if(typeof _0x48d2eb===_0x0996('0xc'))_0x48d2eb();});};_0x3b6806=function(_0x2e7e3e,_0x2c6482){var _0x48d083,_0x199dd7,_0x466ec8,_0x30ed3e,_0x401aa3;_0x466ec8=_0x33da5(_0x2e7e3e);_0x48d083=_0x466ec8[_0x0996('0x9a')](_0x0996('0xbb'));_0x401aa3=_0x466ec8[_0x0996('0x9a')](_0x0996('0xbc'));if(!_0x48d083)return;_0x199dd7=parseInt(_0x466ec8[_0x0996('0x9d')]())||0x1;_0x30ed3e=_0x3edaa3['changeQantity']([_0x48d083,_0x401aa3],0x1,_0x199dd7,function(_0x4109d8){_0x466ec8[_0x0996('0x9d')](_0x4109d8);if(typeof _0x2c6482===_0x0996('0xc'))_0x2c6482();});};_0xfd3f18=_0x2f3bd2[_0x0996('0x46')](_0x0996('0xbe'));_0xfd3f18[_0x0996('0x80')](_0x0996('0xbf'))[_0x0996('0x6f')](function(){var _0x200adb=_0x33da5(this);_0x200adb[_0x0996('0x46')](_0x0996('0xc0'))['on']('click.qd_ddc_more',function(_0x32dd56){_0x32dd56[_0x0996('0x5f')]();_0xfd3f18[_0x0996('0x80')]('qd-loading');_0x58c8e1(_0x200adb[_0x0996('0x46')](_0x0996('0x9c')),function(){_0xfd3f18['removeClass'](_0x0996('0xc1'));});});_0x200adb[_0x0996('0x46')]('.qd-ddc-quantityMinus')['on'](_0x0996('0xc2'),function(_0x17e297){_0x17e297[_0x0996('0x5f')]();_0xfd3f18[_0x0996('0x80')](_0x0996('0xc1'));_0x99e6d9(_0x200adb[_0x0996('0x46')]('.qd-ddc-quantity'),function(){_0xfd3f18['removeClass'](_0x0996('0xc1'));});});_0x200adb[_0x0996('0x46')]('.qd-ddc-quantity')['on']('focusout.qd_ddc_change',function(){_0xfd3f18['addClass']('qd-loading');_0x3b6806(this,function(){_0xfd3f18[_0x0996('0x55')](_0x0996('0xc1'));});});_0x200adb[_0x0996('0x46')](_0x0996('0x9c'))['on'](_0x0996('0xc3'),function(_0x8042e5){if(_0x8042e5[_0x0996('0x5c')]!=0xd)return;_0xfd3f18[_0x0996('0x80')](_0x0996('0xc1'));_0x3b6806(this,function(){_0xfd3f18[_0x0996('0x55')](_0x0996('0xc1'));});});});_0x2f3bd2[_0x0996('0x46')]('.qd-ddc-prodRow')[_0x0996('0x6f')](function(){var _0xa450b6=_0x33da5(this);_0xa450b6[_0x0996('0x46')](_0x0996('0x9f'))['on']('click.qd_ddc_remove',function(){var _0x46658c;_0xa450b6[_0x0996('0x80')](_0x0996('0xc1'));_0x3edaa3[_0x0996('0xc4')](_0x33da5(this),function(_0x49aea6){if(_0x49aea6)_0xa450b6[_0x0996('0xc5')](!![])[_0x0996('0xc6')](function(){_0xa450b6[_0x0996('0xc7')]();_0x3edaa3[_0x0996('0x6d')]();});else _0xa450b6[_0x0996('0x55')]('qd-loading');});return![];});});};_0x3edaa3['formatCepField']=function(_0x37d7dd){var _0x1dd9a0=_0x37d7dd['val']();_0x1dd9a0=_0x1dd9a0['replace'](/[^0-9\-]/g,'');_0x1dd9a0=_0x1dd9a0[_0x0996('0x1')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x0996('0xc8'));_0x1dd9a0=_0x1dd9a0[_0x0996('0x1')](/(.{9}).*/g,'$1');_0x37d7dd[_0x0996('0x9d')](_0x1dd9a0);};_0x3edaa3[_0x0996('0xc9')]=function(_0x15d8fd){var _0x44893c=_0x15d8fd[_0x0996('0x9d')]();if(_0x44893c[_0x0996('0x7')]>=0x9){if(_0x15d8fd[_0x0996('0xca')]('qdDdcLastPostalCode')!=_0x44893c){_0x1be8cf[_0x0996('0xcb')]({'postalCode':_0x44893c,'country':_0x0996('0xcc')})[_0x0996('0xcd')](function(_0x355345){_0x15d8fd[_0x0996('0x64')](_0x0996('0xce'))[_0x0996('0x46')](_0x0996('0xcf'))[_0x0996('0xc7')]();window['_QuatroDigital_DropDown'][_0x0996('0x81')]=_0x355345;_0x3edaa3[_0x0996('0x6b')]();var _0x1704c5=_0x355345[_0x0996('0x83')][_0x0996('0xd0')][0x0][_0x0996('0xd1')];var _0xcdf01f=_0x33da5(_0x0996('0xd2'));for(var _0x46b543=0x0;_0x46b543<_0x1704c5[_0x0996('0x7')];_0x46b543++){var _0x513d77=_0x1704c5[_0x46b543];var _0x4e9429=_0x513d77[_0x0996('0xd3')]>0x1?_0x513d77['shippingEstimate']['replace']('bd',_0x0996('0xd4')):_0x513d77[_0x0996('0xd3')]['replace']('bd','\x20dias\x20útéis');var _0x1810c9=_0x33da5(_0x0996('0xd5'));_0x1810c9[_0x0996('0x4f')](_0x0996('0xd6')+qd_number_format(_0x513d77[_0x0996('0xd7')]/0x64,0x2,',','.')+'</td><td>'+_0x513d77['name']+_0x0996('0xd8')+_0x4e9429+_0x0996('0xd9')+_0x44893c+_0x0996('0xda'));_0x1810c9['appendTo'](_0xcdf01f[_0x0996('0x46')]('tbody'));}_0xcdf01f[_0x0996('0xdb')](_0x15d8fd[_0x0996('0x64')](_0x0996('0xce'))[_0x0996('0x46')](_0x0996('0x61')));})[_0x0996('0xdc')](function(_0x2d3e59){_0x3a5edf([_0x0996('0xdd'),_0x2d3e59]);updateCartData();});}_0x15d8fd[_0x0996('0xca')](_0x0996('0xde'),_0x44893c);}};_0x3edaa3[_0x0996('0xbd')]=function(_0x4d09e8,_0x3b132e,_0x2c83a6,_0x25e995){var _0x42a252=_0x2c83a6||0x1;if(_0x42a252<0x1)return _0x3b132e;if(_0x5ac46f['smartCheckout']){if(typeof window[_0x0996('0x17')][_0x0996('0x81')][_0x0996('0x79')][_0x4d09e8[0x1]]===_0x0996('0x3')){_0x3a5edf(_0x0996('0xdf')+_0x4d09e8[0x1]+']');return _0x3b132e;}window['_QuatroDigital_DropDown'][_0x0996('0x81')][_0x0996('0x79')][_0x4d09e8[0x1]]['quantity']=_0x42a252;window[_0x0996('0x17')][_0x0996('0x81')][_0x0996('0x79')][_0x4d09e8[0x1]][_0x0996('0xe0')]=_0x4d09e8[0x1];_0x1be8cf['updateItems']([window[_0x0996('0x17')]['getOrderForm'][_0x0996('0x79')][_0x4d09e8[0x1]]],[_0x0996('0x79'),_0x0996('0xe1'),_0x0996('0x83')])[_0x0996('0xcd')](function(_0x5db4ee){window['_QuatroDigital_DropDown']['getOrderForm']=_0x5db4ee;_0x3dbef8(!![]);})[_0x0996('0xdc')](function(_0x32490f){_0x3a5edf(['Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho',_0x32490f]);_0x3dbef8();});}else{_0x3a5edf(_0x0996('0xe2'));}function _0x3dbef8(_0x2d7c36){_0x2d7c36=typeof _0x2d7c36!==_0x0996('0xe3')?![]:_0x2d7c36;_0x3edaa3[_0x0996('0x6b')]();window[_0x0996('0x17')][_0x0996('0x18')]=![];_0x3edaa3[_0x0996('0x6d')]();if(typeof window[_0x0996('0x7e')]!==_0x0996('0x3')&&typeof window[_0x0996('0x7e')][_0x0996('0x7f')]==='function')window[_0x0996('0x7e')][_0x0996('0x7f')][_0x0996('0x70')](this);if(typeof adminCart===_0x0996('0xc'))adminCart();_0x33da5['fn'][_0x0996('0x6c')](!![],undefined,_0x2d7c36);if(typeof _0x25e995==='function')_0x25e995(_0x3b132e);};};_0x3edaa3[_0x0996('0xc4')]=function(_0x14aba7,_0x569239){var _0xe1aac3=![];var _0xfce5a5=_0x33da5(_0x14aba7);var _0x356641=_0xfce5a5[_0x0996('0x9a')](_0x0996('0xbc'));if(_0x5ac46f[_0x0996('0x27')]){if(typeof window[_0x0996('0x17')][_0x0996('0x81')][_0x0996('0x79')][_0x356641]==='undefined'){_0x3a5edf(_0x0996('0xdf')+_0x356641+']');return _0xe1aac3;}window[_0x0996('0x17')][_0x0996('0x81')][_0x0996('0x79')][_0x356641][_0x0996('0xe0')]=_0x356641;_0x1be8cf[_0x0996('0xe4')]([window['_QuatroDigital_DropDown']['getOrderForm'][_0x0996('0x79')][_0x356641]],['items',_0x0996('0xe1'),_0x0996('0x83')])[_0x0996('0xcd')](function(_0x140964){_0xe1aac3=!![];window[_0x0996('0x17')]['getOrderForm']=_0x140964;_0x494a54(_0x140964);_0x207cce(!![]);})[_0x0996('0xdc')](function(_0x48da4a){_0x3a5edf([_0x0996('0xe5'),_0x48da4a]);_0x207cce();});}else{alert('Atenção,\x20este\x20método\x20esta\x20descontinuado.');}function _0x207cce(_0x4986db){_0x4986db=typeof _0x4986db!=='boolean'?![]:_0x4986db;if(typeof window['_QuatroDigital_AmountProduct']!=='undefined'&&typeof window['_QuatroDigital_AmountProduct'][_0x0996('0x7f')]==='function')window['_QuatroDigital_AmountProduct'][_0x0996('0x7f')][_0x0996('0x70')](this);if(typeof adminCart===_0x0996('0xc'))adminCart();_0x33da5['fn'][_0x0996('0x6c')](!![],undefined,_0x4986db);if(typeof _0x569239===_0x0996('0xc'))_0x569239(_0xe1aac3);};};_0x3edaa3[_0x0996('0x58')]=function(_0x314830,_0x2dce3f,_0x3c5eda,_0x2a2288){var _0x20ed71=_0x2a2288||_0x33da5(_0x0996('0xe6'));var _0x53a09e=_0x314830||'+';var _0x3a6632=_0x2dce3f||_0x20ed71[_0x0996('0xe7')]()*0.9;_0x20ed71['stop'](!![],!![])[_0x0996('0xe8')]({'scrollTop':isNaN(_0x3c5eda)?_0x53a09e+'='+_0x3a6632+'px':_0x3c5eda});};if(!_0x5ac46f[_0x0996('0x69')]){_0x3edaa3['getCartInfoByUrl']();_0x33da5['fn'][_0x0996('0x6c')](!![]);}_0x33da5(window)['on']('productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex',function(){try{window[_0x0996('0x17')][_0x0996('0x81')]=undefined;_0x3edaa3[_0x0996('0x6b')]();}catch(_0x300072){_0x3a5edf('Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20'+_0x300072[_0x0996('0xe')],_0x0996('0xe9'));}});if(typeof _0x5ac46f[_0x0996('0x72')]===_0x0996('0xc'))_0x5ac46f['callback']['call'](this);else _0x3a5edf(_0x0996('0xea'));};_0x33da5['fn'][_0x0996('0x19')]=function(_0x6a125a){var _0x29c2df;_0x29c2df=_0x33da5(this);_0x29c2df['fn']=new _0x33da5[(_0x0996('0x19'))](this,_0x6a125a);return _0x29c2df;};}catch(_0x31faa8){if(typeof console!==_0x0996('0x3')&&typeof console[_0x0996('0xb')]===_0x0996('0xc'))console[_0x0996('0xb')](_0x0996('0xd'),_0x31faa8);}}(this));(function(_0x372bbf){'use strict';try{var _0x17e8e5=jQuery;var _0x2e1e78='Quatro\x20Digital\x20-\x20Box\x20Amount\x20Cart';var _0x26e086=function(_0xa88397,_0x1c9e8c){if(_0x0996('0x10')===typeof console&&'undefined'!==typeof console['error']&&_0x0996('0x3')!==typeof console[_0x0996('0x11')]&&_0x0996('0x3')!==typeof console[_0x0996('0x12')]){var _0x28aa8b;_0x0996('0x10')===typeof _0xa88397?(_0xa88397['unshift']('['+_0x2e1e78+']\x0a'),_0x28aa8b=_0xa88397):_0x28aa8b=['['+_0x2e1e78+']\x0a'+_0xa88397];if(_0x0996('0x3')===typeof _0x1c9e8c||'alerta'!==_0x1c9e8c[_0x0996('0x14')]()&&'aviso'!==_0x1c9e8c['toLowerCase']())if(_0x0996('0x3')!==typeof _0x1c9e8c&&_0x0996('0x11')===_0x1c9e8c[_0x0996('0x14')]())try{console[_0x0996('0x11')][_0x0996('0x16')](console,_0x28aa8b);}catch(_0x55d9cc){try{console[_0x0996('0x11')](_0x28aa8b[_0x0996('0x8')]('\x0a'));}catch(_0x4b092c){}}else try{console[_0x0996('0xb')][_0x0996('0x16')](console,_0x28aa8b);}catch(_0x5b47ca){try{console['error'](_0x28aa8b[_0x0996('0x8')]('\x0a'));}catch(_0x1197a5){}}else try{console[_0x0996('0x12')]['apply'](console,_0x28aa8b);}catch(_0x303802){try{console[_0x0996('0x12')](_0x28aa8b[_0x0996('0x8')]('\x0a'));}catch(_0xb6655d){}}}};window[_0x0996('0x7e')]=window[_0x0996('0x7e')]||{};window['_QuatroDigital_AmountProduct'][_0x0996('0x79')]={};window['_QuatroDigital_AmountProduct'][_0x0996('0xeb')]=![];window['_QuatroDigital_AmountProduct'][_0x0996('0xec')]=![];window['_QuatroDigital_AmountProduct'][_0x0996('0xed')]=![];var _0x3a8cca=_0x0996('0xee');var _0x776aaa=function(){var _0x1abe16,_0x1e003a,_0x111265,_0x308c80;_0x308c80=_0x286b96();if(window['_QuatroDigital_AmountProduct'][_0x0996('0xeb')]){_0x17e8e5(_0x0996('0xef'))['remove']();_0x17e8e5('.qd-bap-item-added')[_0x0996('0x55')](_0x0996('0xf0'));}for(var _0x4f84a2 in window[_0x0996('0x7e')][_0x0996('0x79')]){_0x1abe16=window[_0x0996('0x7e')]['items'][_0x4f84a2];if(typeof _0x1abe16!=='object')return;_0x111265=_0x17e8e5(_0x0996('0xf1')+_0x1abe16[_0x0996('0xf2')]+']')[_0x0996('0x0')]('li');if(!window[_0x0996('0x7e')][_0x0996('0xeb')]&&_0x111265[_0x0996('0x46')](_0x0996('0xef'))['length'])continue;_0x1e003a=_0x17e8e5(_0x3a8cca);_0x1e003a[_0x0996('0x46')](_0x0996('0xf3'))['html'](_0x1abe16[_0x0996('0x75')]);var _0x41dec2=_0x111265[_0x0996('0x46')](_0x0996('0xf4'));if(_0x41dec2[_0x0996('0x7')])_0x41dec2[_0x0996('0xf5')](_0x1e003a)[_0x0996('0x80')](_0x0996('0xf0'));else _0x111265[_0x0996('0xf5')](_0x1e003a);}if(_0x308c80)window[_0x0996('0x7e')][_0x0996('0xeb')]=![];};var _0x286b96=function(){if(!window['_QuatroDigital_AmountProduct'][_0x0996('0xeb')])return;var _0x5e69f7=![],_0x1dfc48={};window[_0x0996('0x7e')]['items']={};for(var _0x55e5b in window['_QuatroDigital_DropDown'][_0x0996('0x81')]['items']){if(typeof window[_0x0996('0x17')]['getOrderForm'][_0x0996('0x79')][_0x55e5b]!=='object')continue;var _0x7fd344=window[_0x0996('0x17')][_0x0996('0x81')][_0x0996('0x79')][_0x55e5b];if(typeof _0x7fd344[_0x0996('0xf6')]==='undefined'||_0x7fd344[_0x0996('0xf6')]===null||_0x7fd344[_0x0996('0xf6')]==='')continue;window[_0x0996('0x7e')]['items'][_0x0996('0xf7')+_0x7fd344[_0x0996('0xf6')]]=window[_0x0996('0x7e')][_0x0996('0x79')][_0x0996('0xf7')+_0x7fd344[_0x0996('0xf6')]]||{};window[_0x0996('0x7e')]['items'][_0x0996('0xf7')+_0x7fd344['productId']][_0x0996('0xf2')]=_0x7fd344[_0x0996('0xf6')];if(!_0x1dfc48[_0x0996('0xf7')+_0x7fd344['productId']])window['_QuatroDigital_AmountProduct']['items'][_0x0996('0xf7')+_0x7fd344[_0x0996('0xf6')]][_0x0996('0x75')]=0x0;window[_0x0996('0x7e')][_0x0996('0x79')][_0x0996('0xf7')+_0x7fd344[_0x0996('0xf6')]][_0x0996('0x75')]=window[_0x0996('0x7e')][_0x0996('0x79')]['prod_'+_0x7fd344[_0x0996('0xf6')]][_0x0996('0x75')]+_0x7fd344[_0x0996('0x9e')];_0x5e69f7=!![];_0x1dfc48[_0x0996('0xf7')+_0x7fd344[_0x0996('0xf6')]]=!![];}return _0x5e69f7;};window[_0x0996('0x7e')]['exec']=function(){window[_0x0996('0x7e')][_0x0996('0xeb')]=!![];_0x776aaa[_0x0996('0x70')](this);};_0x17e8e5(document)['ajaxStop'](function(){_0x776aaa[_0x0996('0x70')](this);});}catch(_0x303ac2){if(typeof console!==_0x0996('0x3')&&typeof console['error']===_0x0996('0xc'))console['error'](_0x0996('0xd'),_0x303ac2);}}(this));(function(){'use strict';try{var _0x4337c3=jQuery,_0x466646;var _0x3ba4e1=_0x0996('0xf8');var _0xf4f629=function(_0x427c5e,_0x509be4){if(_0x0996('0x10')===typeof console&&_0x0996('0x3')!==typeof console[_0x0996('0xb')]&&_0x0996('0x3')!==typeof console[_0x0996('0x11')]&&_0x0996('0x3')!==typeof console[_0x0996('0x12')]){var _0x2bcae6;_0x0996('0x10')===typeof _0x427c5e?(_0x427c5e[_0x0996('0x13')]('['+_0x3ba4e1+']\x0a'),_0x2bcae6=_0x427c5e):_0x2bcae6=['['+_0x3ba4e1+']\x0a'+_0x427c5e];if(_0x0996('0x3')===typeof _0x509be4||_0x0996('0xba')!==_0x509be4[_0x0996('0x14')]()&&_0x0996('0x15')!==_0x509be4[_0x0996('0x14')]())if(_0x0996('0x3')!==typeof _0x509be4&&'info'===_0x509be4['toLowerCase']())try{console['info'][_0x0996('0x16')](console,_0x2bcae6);}catch(_0x4232a1){try{console[_0x0996('0x11')](_0x2bcae6['join']('\x0a'));}catch(_0x4a46e6){}}else try{console[_0x0996('0xb')][_0x0996('0x16')](console,_0x2bcae6);}catch(_0x2d184){try{console[_0x0996('0xb')](_0x2bcae6[_0x0996('0x8')]('\x0a'));}catch(_0x523cee){}}else try{console['warn'][_0x0996('0x16')](console,_0x2bcae6);}catch(_0x3f1a37){try{console['warn'](_0x2bcae6[_0x0996('0x8')]('\x0a'));}catch(_0x3c66f0){}}}};var _0x3b8432={'selector':_0x0996('0xf9'),'dropDown':{},'buyButton':{}};_0x4337c3[_0x0996('0xfa')]=function(_0x920291){var _0x10418f,_0x507fcd={};_0x466646=_0x4337c3['extend'](!![],{},_0x3b8432,_0x920291);_0x10418f=_0x4337c3(_0x466646['selector'])[_0x0996('0x19')](_0x466646['dropDown']);if(typeof _0x466646[_0x0996('0xfb')][_0x0996('0x69')]!==_0x0996('0x3')&&_0x466646['dropDown']['updateOnlyHover']===![])_0x507fcd['buyButton']=_0x4337c3(_0x466646[_0x0996('0xfc')])[_0x0996('0xfd')](_0x10418f['fn'],_0x466646[_0x0996('0xfe')]);else _0x507fcd[_0x0996('0xfe')]=_0x4337c3(_0x466646[_0x0996('0xfc')])[_0x0996('0xfd')](_0x466646[_0x0996('0xfe')]);_0x507fcd['dropDown']=_0x10418f;return _0x507fcd;};_0x4337c3['fn'][_0x0996('0xff')]=function(){if(typeof console==='object'&&typeof console[_0x0996('0x11')]===_0x0996('0xc'))console[_0x0996('0x11')](_0x0996('0x100'));};_0x4337c3[_0x0996('0xff')]=_0x4337c3['fn'][_0x0996('0xff')];}catch(_0xc10027){if(typeof console!==_0x0996('0x3')&&typeof console[_0x0996('0xb')]===_0x0996('0xc'))console['error'](_0x0996('0xd'),_0xc10027);}}());

/* Quatro Digital Social Photos */
var _0x4d90=['push','images','low_resolution','caption','text','photos','total','photo','url_m','rnaqevavfgber%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','ite','erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','instagram','socialType','https://api.instagram.com/v1/users/self/media/recent/?access_token=','\x20+\x20&count=','&user_id=','user','&format=json&per_page=','filterByTag','&tags=','parse','ajax','jsonp','done','QD_socialPhotos','stringify','Aeeee\x20irmão!\x20Problemas\x20para\x20obter\x20os\x20dados\x20via\x20API\x20do\x20Flickr\x20:(\x20.\x20Detalhes:\x20','callback','QuatroDigital.QD_socialPhotos.callback','object','function','info','warn','unshift','undefined','toLowerCase','aviso','apply','join','error','qdLocalStorage','setItem','getItem','_expiration','getTime','Aeeee\x20irmão!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20salvar\x20os\x20dados\x20no\x20armazenamento\x20local.\x20Detalhes:\x20','message','removeItem','[Quatro\x20Digital\x20Social\x20Photos]\x0a','alerta','---','flickr','timer','tag','#qd-instragram-hash-tag','length','innerHTML','<ul\x20class=\x27instagram-tags-container\x27/>','empty','append','<li><img\x20src=\x27','url','\x27\x20title=\x27','title','\x27\x20/></li>','ajaxCallback','trigger','QuatroDigital.QD_socialPhotos.ajaxCallback','data','photosQtty'];(function(_0xcd962,_0x23a294){var _0x35b2d4=function(_0x39f572){while(--_0x39f572){_0xcd962['push'](_0xcd962['shift']());}};_0x35b2d4(++_0x23a294);}(_0x4d90,0x1eb));var _0x04d9=function(_0x958f5c,_0x596d90){_0x958f5c=_0x958f5c-0x0;var _0x3f2b0e=_0x4d90[_0x958f5c];return _0x3f2b0e;};(function(){var _0x1b9a9a=function(_0x234b5c,_0x190b15){if(_0x04d9('0x0')===typeof console&&_0x04d9('0x1')===typeof console['error']&&'function'===typeof console[_0x04d9('0x2')]&&_0x04d9('0x1')===typeof console[_0x04d9('0x3')]){var _0x3d4681;_0x04d9('0x0')===typeof _0x234b5c?(_0x234b5c[_0x04d9('0x4')]('[Quatro\x20Digital\x20-\x20localStorage]\x0a'),_0x3d4681=_0x234b5c):_0x3d4681=['[Quatro\x20Digital\x20-\x20localStorage]\x0a'+_0x234b5c];if(_0x04d9('0x5')===typeof _0x190b15||'alerta'!==_0x190b15[_0x04d9('0x6')]()&&_0x04d9('0x7')!==_0x190b15[_0x04d9('0x6')]())if(_0x04d9('0x5')!==typeof _0x190b15&&_0x04d9('0x2')===_0x190b15[_0x04d9('0x6')]())try{console[_0x04d9('0x2')][_0x04d9('0x8')](console,_0x3d4681);}catch(_0x26e6f0){console[_0x04d9('0x2')](_0x3d4681[_0x04d9('0x9')]('\x0a'));}else try{console[_0x04d9('0xa')][_0x04d9('0x8')](console,_0x3d4681);}catch(_0x211b0b){console[_0x04d9('0xa')](_0x3d4681[_0x04d9('0x9')]('\x0a'));}else try{console['warn'][_0x04d9('0x8')](console,_0x3d4681);}catch(_0x1eabf9){console[_0x04d9('0x3')](_0x3d4681['join']('\x0a'));}}};window['qdLocalStorage']=window[_0x04d9('0xb')]||{};var _0x50bc97=_0x04d9('0x5')!==typeof localStorage&&_0x04d9('0x5')!==typeof localStorage[_0x04d9('0xc')]&&_0x04d9('0x5')!==typeof localStorage[_0x04d9('0xd')];window[_0x04d9('0xb')][_0x04d9('0xc')]=function(_0xac3cc3,_0x408d14,_0x341e11){try{if(!_0x50bc97)return!0x1;var _0x11a588=new Date();localStorage[_0x04d9('0xc')](_0xac3cc3,_0x408d14);isNaN(parseInt(_0x341e11))||(_0x11a588['setTime'](_0x11a588['getTime']()+0xea60*_0x341e11),localStorage[_0x04d9('0xc')](_0xac3cc3+_0x04d9('0xe'),_0x11a588[_0x04d9('0xf')]()));}catch(_0x2e4c3c){_0x1b9a9a([_0x04d9('0x10'),_0x2e4c3c[_0x04d9('0x11')]],'alerta');}};window[_0x04d9('0xb')][_0x04d9('0xd')]=function(_0x391de1){try{if(!_0x50bc97)return!0x1;var _0x58597d=new Date(),_0x4773fb=parseInt(localStorage['getItem'](_0x391de1+_0x04d9('0xe'))||0x0,0xa)||0x0;return _0x58597d[_0x04d9('0xf')]()>_0x4773fb?(localStorage[_0x04d9('0x12')]&&(localStorage[_0x04d9('0x12')](_0x391de1),localStorage['removeItem'](_0x391de1+_0x04d9('0xe'))),null):localStorage['getItem'](_0x391de1);}catch(_0x1763f2){_0x1b9a9a(['Aeeee\x20irmão!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20obter\x20os\x20dados\x20no\x20armazenamento\x20local.\x20Detalhes:\x20',_0x1763f2['message']],'alerta');}};}());(function(_0x5d8dc1){var _0x38f8ec=jQuery;if(_0x04d9('0x1')!==typeof _0x38f8ec['fn']['QD_socialPhotos']){var _0x3e526e=function(_0x384c6e,_0x5e92b9){if('object'===typeof console&&_0x04d9('0x1')===typeof console[_0x04d9('0xa')]&&_0x04d9('0x1')===typeof console[_0x04d9('0x2')]&&_0x04d9('0x1')===typeof console[_0x04d9('0x3')]){var _0xfb416f;'object'===typeof _0x384c6e?(_0x384c6e[_0x04d9('0x4')](_0x04d9('0x13')),_0xfb416f=_0x384c6e):_0xfb416f=[_0x04d9('0x13')+_0x384c6e];if(_0x04d9('0x5')===typeof _0x5e92b9||_0x04d9('0x14')!==_0x5e92b9[_0x04d9('0x6')]()&&_0x04d9('0x7')!==_0x5e92b9[_0x04d9('0x6')]())if(_0x04d9('0x5')!==typeof _0x5e92b9&&_0x04d9('0x2')===_0x5e92b9[_0x04d9('0x6')]())try{console[_0x04d9('0x2')][_0x04d9('0x8')](console,_0xfb416f);}catch(_0x1815d2){console['info'](_0xfb416f[_0x04d9('0x9')]('\x0a'));}else try{console['error'][_0x04d9('0x8')](console,_0xfb416f);}catch(_0x376355){console[_0x04d9('0xa')](_0xfb416f['join']('\x0a'));}else try{console[_0x04d9('0x3')][_0x04d9('0x8')](console,_0xfb416f);}catch(_0x3c81e4){console[_0x04d9('0x3')](_0xfb416f[_0x04d9('0x9')]('\x0a'));}}};_0x38f8ec['fn']['QD_socialPhotos']=function(_0x477bf2,_0x891cd6){function _0x13410f(){_0x22c22f['disableReload']||setInterval(function(){_0x4f4e22();},_0x22c22f['timer']);}var _0x2a90ad=[],_0x5d5030=0x0;var _0x2cb972=_0x38f8ec(this);if(!_0x2cb972['length'])return _0x2cb972;var _0x22c22f=_0x38f8ec['extend']({},{'photosQtty':0x5,'tag':_0x04d9('0x15'),'timer':0x3e8,'disableReload':!0x0,'socialType':_0x04d9('0x16'),'user':null,'filterByTag':!0x1,'ajaxCallback':function(_0x5972dd,_0x120f81,_0x12f265){},'callback':function(_0x422236,_0x1af2aa,_0x225bb9){}},_0x891cd6);0x2d0>_0x22c22f['timer']&&(_0x22c22f[_0x04d9('0x17')]=0x2d0);if(null!=_0x22c22f['tag'])var _0x4c36eb=_0x22c22f[_0x04d9('0x18')];else{var _0x44298f=_0x38f8ec(_0x04d9('0x19'));_0x44298f[_0x04d9('0x1a')]&&(_0x4c36eb=_0x44298f[0x0][_0x04d9('0x1b')]);}var _0x5d8dc1=function(){_0x2cb972['each'](function(){var _0xe62b61=_0x38f8ec(_0x04d9('0x1c'));_0x38f8ec(this)[_0x04d9('0x1d')]()[_0x04d9('0x1e')](_0xe62b61);for(var _0x5b4830 in _0x2a90ad)_0x04d9('0x1')!==typeof _0x2a90ad[_0x5b4830]&&_0xe62b61['append'](_0x04d9('0x1f')+_0x2a90ad[_0x5b4830][_0x04d9('0x20')]+_0x04d9('0x21')+_0x2a90ad[_0x5b4830][_0x04d9('0x22')]+_0x04d9('0x23'));_0x22c22f[_0x04d9('0x24')](_0x5d5030,_0x2cb972,_0x4c36eb);_0x38f8ec(window)[_0x04d9('0x25')](_0x04d9('0x26'),{'_length':_0x5d5030,'$this':_0x2cb972,'tag':_0x4c36eb});});_0x13410f();};var _0x5c405a=function(_0x241b87){try{if('instagram'===_0x22c22f['socialType']){_0x5d5030=_0x241b87[_0x04d9('0x27')][_0x04d9('0x1a')];for(var _0x1450b1=0x0;_0x1450b1<_0x22c22f[_0x04d9('0x28')]&&_0x1450b1<_0x5d5030;_0x1450b1++)_0x04d9('0x1')!==typeof _0x241b87[_0x04d9('0x27')][_0x1450b1]&&_0x2a90ad[_0x04d9('0x29')]({'url':_0x241b87['data'][_0x1450b1][_0x04d9('0x2a')][_0x04d9('0x2b')][_0x04d9('0x20')],'title':_0x241b87['data'][_0x1450b1][_0x04d9('0x2c')]?_0x241b87[_0x04d9('0x27')][_0x1450b1]['caption'][_0x04d9('0x2d')]:''});}else if(_0x04d9('0x16')===_0x22c22f['socialType'])for(_0x5d5030=_0x241b87[_0x04d9('0x2e')][_0x04d9('0x2f')],_0x1450b1=0x0;_0x1450b1<_0x22c22f[_0x04d9('0x28')]&&_0x1450b1<_0x5d5030;_0x1450b1++)_0x04d9('0x1')!==typeof _0x241b87[_0x04d9('0x2e')][_0x04d9('0x30')][_0x1450b1]&&_0x2a90ad[_0x04d9('0x29')]({'url':_0x241b87['photos'][_0x04d9('0x30')][_0x1450b1][_0x04d9('0x31')],'title':_0x241b87[_0x04d9('0x2e')][_0x04d9('0x30')][_0x1450b1][_0x04d9('0x22')]||''});_0x5d8dc1();}catch(_0x201285){_0x3e526e(['Problemas\x20ao\x20organizar\x20as\x20fotos\x20retornadas\x20da\x20API.',_0x201285[_0x04d9('0x11')]],_0x04d9('0x14'));}};_0x44298f=function(_0x3ac028){var _0x273f78={'y':_0x04d9('0x32')};return function(_0x4416e5){var _0x891cd6=function(_0x2e7fb0){return _0x2e7fb0;};var _0x1d5465=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4416e5=_0x4416e5['d'+_0x1d5465[0x10]+'c'+_0x1d5465[0x11]+'m'+_0x891cd6(_0x1d5465[0x1])+'n'+_0x1d5465[0xd]]['l'+_0x1d5465[0x12]+'c'+_0x1d5465[0x0]+'ti'+_0x891cd6('o')+'n'];var _0x239c17=function(_0x2ef5c8){return escape(encodeURIComponent(_0x2ef5c8[_0x04d9('0x33')](/\./g,'¨')[_0x04d9('0x33')](/[a-zA-Z]/g,function(_0x48dd52){return String[_0x04d9('0x34')](('Z'>=_0x48dd52?0x5a:0x7a)>=(_0x48dd52=_0x48dd52[_0x04d9('0x35')](0x0)+0xd)?_0x48dd52:_0x48dd52-0x1a);})));};var _0x3946ea=_0x239c17(_0x4416e5[[_0x1d5465[0x9],_0x891cd6('o'),_0x1d5465[0xc],_0x1d5465[_0x891cd6(0xd)]]['join']('')]);_0x239c17=_0x239c17((window[['js',_0x891cd6('no'),'m',_0x1d5465[0x1],_0x1d5465[0x4]['toUpperCase'](),_0x04d9('0x36')][_0x04d9('0x9')]('')]||_0x04d9('0x15'))+['.v',_0x1d5465[0xd],'e',_0x891cd6('x'),'co',_0x891cd6('mm'),_0x04d9('0x37'),_0x1d5465[0x1],'.c',_0x891cd6('o'),'m.',_0x1d5465[0x13],'r'][_0x04d9('0x9')](''));for(var _0x477bf2 in _0x273f78){if(_0x239c17===_0x477bf2+_0x273f78[_0x477bf2]||_0x3946ea===_0x477bf2+_0x273f78[_0x477bf2]){var _0x27ac1f='tr'+_0x1d5465[0x11]+'e';break;}_0x27ac1f='f'+_0x1d5465[0x0]+'ls'+_0x891cd6(_0x1d5465[0x1])+'';}_0x891cd6=!0x1;-0x1<_0x4416e5[[_0x1d5465[0xc],'e',_0x1d5465[0x0],'rc',_0x1d5465[0x9]][_0x04d9('0x9')]('')][_0x04d9('0x38')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x891cd6=!0x0);return[_0x27ac1f,_0x891cd6];}(_0x3ac028);}(window);if(!eval(_0x44298f[0x0]))return _0x44298f[0x1]?_0x3e526e(_0x04d9('0x39')):!0x1;var _0x4f4e22=function(){if(_0x04d9('0x3a')===_0x22c22f[_0x04d9('0x3b')])var _0x891cd6=_0x04d9('0x3c')+_0x477bf2+_0x04d9('0x3d')+_0x22c22f['photosQtty'];else _0x04d9('0x16')===_0x22c22f['socialType']&&(_0x891cd6='https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=3&extras=url_m&api_key='+_0x477bf2+_0x04d9('0x3e')+_0x22c22f[_0x04d9('0x3f')]+_0x04d9('0x40')+_0x22c22f[_0x04d9('0x28')]+'&jsoncallback=?',_0x22c22f[_0x04d9('0x41')]&&(_0x891cd6=_0x891cd6+_0x04d9('0x42')+_0x22c22f[_0x04d9('0x41')]));try{qdLocalStorage[_0x04d9('0xd')]('QD_socialPhotos'+_0x891cd6)&&'object'===typeof JSON?_0x5c405a(JSON[_0x04d9('0x43')](qdLocalStorage['getItem']('QD_socialPhotos'+_0x891cd6))):_0x38f8ec[_0x04d9('0x44')]({'url':_0x891cd6,'dataType':_0x04d9('0x45'),'cache':!0x0,'success':_0x5c405a})[_0x04d9('0x46')](function(_0x1652ce){_0x04d9('0x0')===typeof JSON&&qdLocalStorage['setItem'](_0x04d9('0x47')+_0x891cd6,JSON[_0x04d9('0x48')](_0x1652ce),0x3c);});}catch(_0xdf65d3){_0x3e526e([_0x04d9('0x49'),_0xdf65d3[_0x04d9('0x11')]],_0x04d9('0x14'));}};_0x4f4e22();_0x22c22f[_0x04d9('0x4a')](!0x0,_0x2cb972,_0x4c36eb);_0x38f8ec(window)['trigger'](_0x04d9('0x4b'),{'allowExec':!0x0,'$this':_0x2cb972,'tag':_0x4c36eb});return _0x2cb972;};}}(this));

// vtex url parse
/* Quatro Digital - VTEX URL Parse // 1.4 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
var _0x8349=["\x6C\x69\x6E\x6B","\x3C\x61\x20\x68\x72\x65\x66\x3D\x22","\x22\x3E\x3C\x2F\x61\x3E","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\x66\x75\x6E\x63\x74\x69\x6F\x6E","\x65\x72\x72\x6F\x72","\x50\x72\x6F\x62\x6C\x65\x6D\x61\x73\x20\x3A\x28\x20\x2E\x20\x44\x65\x74\x61\x6C\x68\x65\x73\x3A\x20","\x2F","\x73\x70\x6C\x69\x74","","\x72\x65\x70\x6C\x61\x63\x65","\x70\x61\x74\x68\x6E\x61\x6D\x65","\x2C","\x70\x6F\x70","\x6D\x61\x74\x63\x68","\x73\x65\x61\x72\x63\x68","\x6C\x65\x6E\x67\x74\x68","\x6F\x62\x6A\x65\x63\x74","\x70\x75\x73\x68","\x63","\x6D\x61\x70","\x73\x68\x69\x66\x74","\x6F\x74\x68\x65\x72\x5F\x70\x61\x74\x68","\x6F\x74\x68\x65\x72\x5F\x73\x65\x61\x72\x63\x68","\x26","\x6F\x75\x74","\x67\x65\x74\x4D\x61\x70","\x70\x72\x6F\x74\x6F\x74\x79\x70\x65","\x6D\x65\x72\x67\x65\x55\x72\x6C","\x63\x61\x6C\x6C","\x65\x78\x74\x65\x6E\x64","\x67\x65\x74\x55\x72\x6C","\x6D\x61\x70\x3D","\x6A\x6F\x69\x6E","\x3F","\x51\x44\x5F\x56\x74\x65\x78\x55\x72\x6C\x50\x61\x72\x73\x65"];(function(){function _0x6ac7x1(_0x6ac7x2){try{this[_0x8349[0]]=$(_0x8349[1]+_0x6ac7x2+_0x8349[2])[0]}catch(c){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],c)}}function _0x6ac7x3(_0x6ac7x2){try{_0x6ac7x2=_0x6ac7x2||this[_0x8349[0]];var _0x6ac7x4=_0x6ac7x2[_0x8349[11]][_0x8349[10]](/\/\//g,_0x8349[7])[_0x8349[10]](/(^\/|\/$)/g,_0x8349[9])[_0x8349[8]](_0x8349[7]),_0x6ac7x5=((_0x6ac7x2[_0x8349[15]]||_0x8349[9])[_0x8349[14]](/map\=([^&]+)/i)||[_0x8349[9]])[_0x8349[13]]()[_0x8349[8]](_0x8349[12]);if(1==_0x6ac7x5[_0x8349[16]]&&0==_0x6ac7x5[0][_0x8349[16]]){if(_0x8349[17]== typeof defaultMap){_0x6ac7x5=defaultMap}else {for(var _0x6ac7x6=0;_0x6ac7x6<_0x6ac7x4[_0x8349[16]];_0x6ac7x6++){_0x6ac7x4[_0x6ac7x6][_0x8349[16]]&&_0x8349[7]!=_0x6ac7x4[_0x6ac7x6]&&_0x6ac7x5[_0x8349[18]](defaultMap)}}};for(var _0x6ac7x6={map:{},other_path:_0x8349[9]},_0x6ac7x7=0;_0x6ac7x7<_0x6ac7x5[_0x8349[16]];_0x6ac7x7++){_0x6ac7x5[_0x6ac7x7][_0x8349[16]]&&(_0x8349[19]==_0x6ac7x5[_0x6ac7x7]?(_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]=_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]||[],_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]][_0x8349[18]]((_0x6ac7x4||[_0x8349[9]])[_0x8349[21]]())):_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]=(_0x6ac7x4||[_0x8349[9]])[_0x8349[21]]())};_0x6ac7x6[_0x8349[22]]=_0x6ac7x4;_0x6ac7x6[_0x8349[23]]=(_0x6ac7x2[_0x8349[15]]||_0x8349[9])[_0x8349[10]](/map\=([^&]+)/ig,_0x8349[9])[_0x8349[10]](/\&\&+/ig,_0x8349[24])[_0x8349[10]](/\?/g,_0x8349[9]);return this[_0x8349[25]]=_0x6ac7x6}catch(g){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],g)}}_0x6ac7x1[_0x8349[27]][_0x8349[26]]=_0x6ac7x3;_0x6ac7x1[_0x8349[27]][_0x8349[28]]=function(_0x6ac7x2,_0x6ac7x4){try{var _0x6ac7x5=_0x6ac7x3[_0x8349[29]](this,this[_0x8349[0]]),_0x6ac7x6=_0x6ac7x3[_0x8349[29]](this,$(_0x8349[1]+_0x6ac7x2+_0x8349[2])[0]);_0x6ac7x5[_0x8349[22]][_0x8349[16]]||(_0x6ac7x5[_0x8349[22]]=void(0));_0x6ac7x5[_0x8349[23]][_0x8349[16]]||(_0x6ac7x5[_0x8349[23]]=void(0));var _0x6ac7x7=$[_0x8349[30]](!0,{},_0x6ac7x6,_0x6ac7x5);if(_0x8349[17]== typeof _0x6ac7x4){for(_0x6ac7x6=0;_0x6ac7x6<_0x6ac7x4[_0x8349[16]];_0x6ac7x6++){_0x6ac7x7[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]]&&(_0x6ac7x7[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]]=_0x6ac7x5[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]])}};return this[_0x8349[25]]=_0x6ac7x7}catch(g){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],g)}};_0x6ac7x1[_0x8349[27]][_0x8349[31]]=function(_0x6ac7x2){try{var _0x6ac7x4=[],_0x6ac7x5=[];_0x6ac7x2=_0x6ac7x2||{};for(var _0x6ac7x6 in this[_0x8349[25]][_0x8349[20]]){if(!_0x6ac7x2[_0x6ac7x6]){if(_0x8349[19]==_0x6ac7x6){for(var _0x6ac7x7=0;_0x6ac7x7<this[_0x8349[25]][_0x8349[20]][_0x6ac7x6][_0x8349[16]];_0x6ac7x7++){_0x6ac7x4[_0x8349[18]](this[_0x8349[25]][_0x8349[20]][_0x6ac7x6][_0x6ac7x7]),_0x6ac7x5[_0x8349[18]](_0x6ac7x6)}}else {_0x6ac7x4[_0x8349[18]](this[_0x8349[25]][_0x8349[20]][_0x6ac7x6]),_0x6ac7x5[_0x8349[18]](_0x6ac7x6)}}};var _0x6ac7x8=_0x6ac7x5[_0x8349[16]]?_0x8349[32]+_0x6ac7x5[_0x8349[33]](_0x8349[12])+_0x8349[24]:_0x8349[9];return _0x8349[7]+_0x6ac7x4[_0x8349[33]](_0x8349[7])+(this[_0x8349[25]][_0x8349[22]][_0x8349[16]]?_0x8349[7]+this[_0x8349[25]][_0x8349[22]][_0x8349[33]](_0x8349[7]):_0x8349[9])+_0x8349[34]+(_0x6ac7x8+this[_0x8349[25]][_0x8349[23]])[_0x8349[10]](/\&\&+/g,_0x8349[24])}catch(_0x6ac7x1){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],_0x6ac7x1)}};window[_0x8349[35]]=_0x6ac7x1})()

/* Quatro Digital - QD Select Smart Research 2 // Carlos Vinicius // Todos os direitos reservados */
var _0xbb3c=['removeAttr','disabled','<option\x20value=\x22\x22></option>','getAjaxOptions','trigger','QuatroDigital.ssrSelectAjaxPopulated','ajaxError','removeClass','option[data-qdssr-text=\x27','<option\x20value=\x22','\x22\x20data-qdssr-text=\x22','</option>','getCategory','cache','script:not([src])','innerHTML','indexOf','buscapagina','match','pop','.qd_auto_select_smart_research_2','function','QD_SelectSmartResearch2','error','undefined','info','warn','object','unshift','[Quatro\x20Digital\x20-\x20QD\x20Select\x20Smart\x20Research\x202]\x0a','alerta','toLowerCase','aviso','apply','join','Selecione\x20o(a)\x20','location','href','find','attr','data-qdssr-title','each','push','text','h5.','\x20+ul\x20.filtro-ativo:first','trim','length','Desculpe,\x20não\x20foi\x20possível\x20executar\x20sua\x20solicitação.\x20Por\x20favor\x20entre\x20em\x20contato\x20com\x20o\x20SAC.','rnaqevavfgber%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','toUpperCase','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','options','Nenhuma\x20opção\x20foi\x20enviada,\x20é\x20esperado\x20um\x20array\x20com\x20sub\x20arrays\x20contendo\x20o\x20conjunto\x20chave/valor.','data-qdssr-ndx','Problemas\x20ao\x20definir\x20a\x20opção\x20selecionada.\x20Detalhes:\x20','message','addClass','qd-ssr2-loaded','Problemas\x20ao\x20tentar\x20verificar\x20as\x20opções\x20selecionadas.\x20Detalhes:\x20','optionsPlaceHolder','index','<div\x20class=\x22qd-ssr2-option-wrapper\x22>','<label\x20for=\x22qd-ssr2-select-','labelMessage','</label>','<select\x20data-qdssr-ndx=\x22','\x22\x20id=\x22qd-ssr2-select-','\x22\x20data-qdssr-title=\x22','</select></div>','appendTo','select','add','select2','pt-BR','change','select[data-qdssr-ndx=','val','QuatroDigital.ssrChange','body','qd-ssr-reloading','redirect','split','shift','data-qdssr-str','qd-ssr-loading','qd-ssr2-loading','qdAjax'];(function(_0x303d2c,_0x370416){var _0x135b9e=function(_0x613bb){while(--_0x613bb){_0x303d2c['push'](_0x303d2c['shift']());}};_0x135b9e(++_0x370416);}(_0xbb3c,0x72));var _0xcbb3=function(_0x4eff9d,_0x2a5032){_0x4eff9d=_0x4eff9d-0x0;var _0x158a56=_0xbb3c[_0x4eff9d];return _0x158a56;};(function(_0x55d586){var _0x13d650=jQuery;if(_0xcbb3('0x0')!==typeof _0x13d650['fn'][_0xcbb3('0x1')]){_0x13d650['fn'][_0xcbb3('0x1')]=function(){};var _0x28d3da=function(_0x6eb2cf,_0x60ac70){if('object'===typeof console&&'undefined'!==typeof console[_0xcbb3('0x2')]&&_0xcbb3('0x3')!==typeof console[_0xcbb3('0x4')]&&_0xcbb3('0x3')!==typeof console[_0xcbb3('0x5')]){var _0x5c1966;_0xcbb3('0x6')===typeof _0x6eb2cf?(_0x6eb2cf[_0xcbb3('0x7')]('[Quatro\x20Digital\x20-\x20QD\x20Select\x20Smart\x20Research\x202]\x0a'),_0x5c1966=_0x6eb2cf):_0x5c1966=[_0xcbb3('0x8')+_0x6eb2cf];if(_0xcbb3('0x3')===typeof _0x60ac70||_0xcbb3('0x9')!==_0x60ac70[_0xcbb3('0xa')]()&&_0xcbb3('0xb')!==_0x60ac70[_0xcbb3('0xa')]())if(_0xcbb3('0x3')!==typeof _0x60ac70&&_0xcbb3('0x4')===_0x60ac70[_0xcbb3('0xa')]())try{console[_0xcbb3('0x4')][_0xcbb3('0xc')](console,_0x5c1966);}catch(_0x28954a){try{console[_0xcbb3('0x4')](_0x5c1966[_0xcbb3('0xd')]('\x0a'));}catch(_0x17bd3c){}}else try{console[_0xcbb3('0x2')][_0xcbb3('0xc')](console,_0x5c1966);}catch(_0x1f0a69){try{console[_0xcbb3('0x2')](_0x5c1966[_0xcbb3('0xd')]('\x0a'));}catch(_0x512484){}}else try{console['warn'][_0xcbb3('0xc')](console,_0x5c1966);}catch(_0x3c3a28){try{console['warn'](_0x5c1966[_0xcbb3('0xd')]('\x0a'));}catch(_0x396770){}}}},_0x19e74b={'options':[],'optionsPlaceHolder':[],'disabledMessage':function(_0x6f7e2e,_0x2047be,_0x29847b){return'Selecione\x20o\x20anterior';},'labelMessage':function(_0x11823c,_0x5bc1d0,_0x5cb9a0){return _0xcbb3('0xe')+_0x5cb9a0[_0x11823c];},'redirect':function(_0x20be5b){window[_0xcbb3('0xf')][_0xcbb3('0x10')]=_0x20be5b;},'getAjaxOptions':function(_0x44a4d2,_0x35b7a5){var _0x49203a=[];_0x13d650(_0x44a4d2)[_0xcbb3('0x11')]('.search-single-navigator\x20ul.'+_0x35b7a5[_0xcbb3('0x12')](_0xcbb3('0x13')))[_0xcbb3('0x11')]('a')[_0xcbb3('0x14')](function(){var _0x35b7a5=_0x13d650(this);_0x49203a[_0xcbb3('0x15')]([_0x35b7a5[_0xcbb3('0x16')]()['trim'](),_0x35b7a5['attr'](_0xcbb3('0x10'))||'']);});return _0x49203a;},'optionIsChecked':function(_0xc152d0){_0xc152d0=_0x13d650(_0xcbb3('0x17')+_0xc152d0+_0xcbb3('0x18'))[_0xcbb3('0x16')]()[_0xcbb3('0x19')]();return _0xc152d0[_0xcbb3('0x1a')]?_0xc152d0:null;},'ajaxError':function(){_0x28d3da(_0xcbb3('0x1b'));}};_0x55d586=function(_0x82d81e){var _0x2d4f94={'y':_0xcbb3('0x1c')};return function(_0x4e481d){var _0x5bbe44=function(_0x107f00){return _0x107f00;};var _0x3847fb=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4e481d=_0x4e481d['d'+_0x3847fb[0x10]+'c'+_0x3847fb[0x11]+'m'+_0x5bbe44(_0x3847fb[0x1])+'n'+_0x3847fb[0xd]]['l'+_0x3847fb[0x12]+'c'+_0x3847fb[0x0]+'ti'+_0x5bbe44('o')+'n'];var _0x3aed24=function(_0x37cc54){return escape(encodeURIComponent(_0x37cc54['replace'](/\./g,'¨')[_0xcbb3('0x1d')](/[a-zA-Z]/g,function(_0x430e8f){return String[_0xcbb3('0x1e')](('Z'>=_0x430e8f?0x5a:0x7a)>=(_0x430e8f=_0x430e8f['charCodeAt'](0x0)+0xd)?_0x430e8f:_0x430e8f-0x1a);})));};var _0x369dff=_0x3aed24(_0x4e481d[[_0x3847fb[0x9],_0x5bbe44('o'),_0x3847fb[0xc],_0x3847fb[_0x5bbe44(0xd)]][_0xcbb3('0xd')]('')]);_0x3aed24=_0x3aed24((window[['js',_0x5bbe44('no'),'m',_0x3847fb[0x1],_0x3847fb[0x4][_0xcbb3('0x1f')](),_0xcbb3('0x20')][_0xcbb3('0xd')]('')]||_0xcbb3('0x21'))+['.v',_0x3847fb[0xd],'e',_0x5bbe44('x'),'co',_0x5bbe44('mm'),_0xcbb3('0x22'),_0x3847fb[0x1],'.c',_0x5bbe44('o'),'m.',_0x3847fb[0x13],'r']['join'](''));for(var _0x56c21c in _0x2d4f94){if(_0x3aed24===_0x56c21c+_0x2d4f94[_0x56c21c]||_0x369dff===_0x56c21c+_0x2d4f94[_0x56c21c]){var _0x5439f0='tr'+_0x3847fb[0x11]+'e';break;}_0x5439f0='f'+_0x3847fb[0x0]+'ls'+_0x5bbe44(_0x3847fb[0x1])+'';}_0x5bbe44=!0x1;-0x1<_0x4e481d[[_0x3847fb[0xc],'e',_0x3847fb[0x0],'rc',_0x3847fb[0x9]][_0xcbb3('0xd')]('')]['indexOf'](_0xcbb3('0x23'))&&(_0x5bbe44=!0x0);return[_0x5439f0,_0x5bbe44];}(_0x82d81e);}(window);if(!eval(_0x55d586[0x0]))return _0x55d586[0x1]?_0x28d3da('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x13d650[_0xcbb3('0x1')]=function(_0x33a0e4,_0x5e4c68){if(!_0x5e4c68[_0xcbb3('0x24')][_0xcbb3('0x1a')])return _0x28d3da(_0xcbb3('0x25'));_0x33a0e4['each'](function(){try{var _0x382c46=_0x13d650(this),_0x503a60=_0x5094a3(_0x382c46,_0x5e4c68,_0x33a0e4);_0x21407d(_0x382c46,_0x5e4c68,0x0);_0x503a60['on']('QuatroDigital.ssrSelectAjaxPopulated',function(_0x10f375,_0x56ab5e){try{_0x21407d(_0x382c46,_0x5e4c68,_0x56ab5e[_0xcbb3('0x12')](_0xcbb3('0x26')));}catch(_0x23a400){_0x28d3da(_0xcbb3('0x27')+_0x23a400[_0xcbb3('0x28')]);}});_0x382c46[_0xcbb3('0x29')](_0xcbb3('0x2a'));}catch(_0xe58142){_0x28d3da(_0xcbb3('0x2b')+_0xe58142[_0xcbb3('0x28')]);}});};var _0x5094a3=function(_0x2b8f9d,_0x1657d4,_0x50f0e9){try{for(var _0x3ba675='',_0x14eea0,_0x55d586=!0x0,_0x1d1358=new _0x13d650(),_0x492063=!0x1,_0x35900a=0x0,_0x1c67dd=0x0;_0x1c67dd<_0x1657d4[_0xcbb3('0x24')][_0xcbb3('0x1a')];_0x1c67dd++){'object'!==typeof _0x1657d4['options'][_0x1c67dd]&&(_0x55d586=!0x1);var _0x449db6=_0x1657d4[_0xcbb3('0x2c')][_0x1c67dd]||'',_0x19070d=_0x50f0e9[_0xcbb3('0x2d')](_0x2b8f9d);_0x3ba675=_0xcbb3('0x2e');_0x3ba675+=_0xcbb3('0x2f')+_0x1c67dd+_0x19070d+'\x22>'+_0x1657d4[_0xcbb3('0x30')](_0x1c67dd,_0x1657d4['options'],_0x1657d4[_0xcbb3('0x2c')])+_0xcbb3('0x31');_0x3ba675+=_0xcbb3('0x32')+_0x1c67dd+_0xcbb3('0x33')+_0x1c67dd+_0x19070d+_0xcbb3('0x34')+_0x449db6+'\x22>';_0x3ba675+='<option\x20value=\x22\x22></option>';_0x55d586?_0x3ba675+=_0x51fcae(_0x1657d4['options'][_0x1c67dd]):_0x449db6=_0x1657d4['disabledMessage'](_0x1c67dd,_0x1657d4['options'],_0x1657d4['optionsPlaceHolder']);_0x3ba675+=_0xcbb3('0x35');_0x14eea0=_0x13d650(_0x3ba675);_0x14eea0[_0xcbb3('0x36')](_0x2b8f9d);var _0x525908=_0x14eea0['find'](_0xcbb3('0x37'));_0x1d1358=_0x1d1358[_0xcbb3('0x38')](_0x525908);_0x55d586||_0x525908[_0xcbb3('0x12')]({'disabled':!0x0,'data-qdssr-str':_0x1657d4['options'][_0x1c67dd]});_0x525908[_0xcbb3('0x39')]({'placeholder':_0x449db6,'language':_0xcbb3('0x3a')});_0x525908['bind'](_0xcbb3('0x3b'),function(_0x504912,_0x3f970a){var _0xc83ffc=_0x13d650(this),_0x1539f9=_0x2b8f9d[_0xcbb3('0x11')](_0xcbb3('0x3c')+(parseInt(_0xc83ffc[_0xcbb3('0x12')](_0xcbb3('0x26'))||0x0,0xa)+0x1)+']'),_0x55d586=(_0xc83ffc[_0xcbb3('0x3d')]()||'')[_0xcbb3('0x19')]();_0x3f970a||(_0x492063=!0x0);_0x13d650(window)['trigger'](_0xcbb3('0x3e'),[_0x1539f9,_0x492063]);!_0x1539f9[_0xcbb3('0x1a')]&&(!_0x3f970a||_0x492063&&_0x55d586[_0xcbb3('0x1a')])&&(_0x13d650(document[_0xcbb3('0x3f')])[_0xcbb3('0x29')](_0xcbb3('0x40')),_0x1657d4[_0xcbb3('0x41')](_0x55d586));_0x55d586=_0x55d586[_0xcbb3('0x42')]('#')[_0xcbb3('0x43')]()[_0xcbb3('0x42')]('?');_0x55d586[0x1]=(_0x1539f9[_0xcbb3('0x12')](_0xcbb3('0x44'))||'')+'&'+(_0x55d586[0x1]||'');_0x13d650(document[_0xcbb3('0x3f')])[_0xcbb3('0x29')](_0xcbb3('0x45'));_0x14eea0[_0xcbb3('0x29')](_0xcbb3('0x46'));_0x35900a+=0x1;_0x13d650[_0xcbb3('0x47')]({'url':_0x55d586['join']('?'),'dataType':'html','success':function(_0x5c0fce){_0x1539f9[_0xcbb3('0x48')](_0xcbb3('0x49'));_0x1539f9['html'](_0xcbb3('0x4a')+_0x51fcae(_0x1657d4[_0xcbb3('0x4b')](_0x5c0fce,_0x1539f9)));_0x1539f9['select2']({'placeholder':_0x1539f9[_0xcbb3('0x12')](_0xcbb3('0x13'))});_0xc83ffc[_0xcbb3('0x4c')](_0xcbb3('0x4d'),[_0x1539f9]);},'error':function(){_0x1657d4[_0xcbb3('0x4e')][_0xcbb3('0xc')](this,arguments);},'complete':function(){_0x14eea0[_0xcbb3('0x4f')](_0xcbb3('0x46'));--_0x35900a;0x0==_0x35900a&&_0x13d650(document[_0xcbb3('0x3f')])[_0xcbb3('0x4f')]('qd-ssr-loading');},'clearQueueDelay':null});});}return _0x1d1358;}catch(_0x28c34e){_0x28d3da('Problemas\x20:(\x20.\x20Detalhes:\x20'+_0x28c34e[_0xcbb3('0x28')]);}},_0x21407d=function(_0x27d7e9,_0x29a6d5,_0x5dbc78,_0x494981){_0x29a6d5=_0x29a6d5['optionIsChecked'](_0x29a6d5[_0xcbb3('0x2c')][_0x5dbc78]);null!==_0x29a6d5&&(_0x494981=_0x494981||_0x27d7e9[_0xcbb3('0x11')](_0xcbb3('0x3c')+_0x5dbc78+']'),_0x494981[_0xcbb3('0x3d')](_0x494981[_0xcbb3('0x11')](_0xcbb3('0x50')+_0x29a6d5+'\x27]')['val']())[_0xcbb3('0x4c')](_0xcbb3('0x3b'),!0x0));},_0x51fcae=function(_0x4bddde){for(var _0x558bd5='',_0x3459b7=0x0;_0x3459b7<_0x4bddde[_0xcbb3('0x1a')];_0x3459b7++)_0x558bd5+=_0xcbb3('0x51')+(_0x4bddde[_0x3459b7][0x1]||'')+_0xcbb3('0x52')+(_0x4bddde[_0x3459b7][0x0]||'')[_0xcbb3('0x1d')](/\s\([0-9]+\)/,'')+'\x22>'+(_0x4bddde[_0x3459b7][0x0]||'')+_0xcbb3('0x53');return _0x558bd5;};_0x13d650[_0xcbb3('0x1')][_0xcbb3('0x54')]=function(){if(_0x13d650[_0xcbb3('0x1')][_0xcbb3('0x54')][_0xcbb3('0x55')])return _0x13d650[_0xcbb3('0x1')][_0xcbb3('0x54')][_0xcbb3('0x55')];var _0x4db8e5=[],_0x5eee53=[];_0x13d650(_0xcbb3('0x56'))[_0xcbb3('0x14')](function(){var _0x2139c9=_0x13d650(this)[0x0][_0xcbb3('0x57')];if(-0x1<_0x2139c9[_0xcbb3('0x58')](_0xcbb3('0x59')))return _0x4db8e5=(decodeURIComponent((_0x2139c9[_0xcbb3('0x5a')](/\/buscapagina([^\'\"]+)/i)||[''])[_0xcbb3('0x5b')]())[_0xcbb3('0x5a')](/fq=c:[^\&]+/i)||[''])[_0xcbb3('0x5b')]()[_0xcbb3('0x42')](':')[_0xcbb3('0x5b')]()['replace'](/(^\/|\/$)/g,'')[_0xcbb3('0x42')]('/'),!0x1;});for(var _0x5879a8=0x0;_0x5879a8<_0x4db8e5[_0xcbb3('0x1a')];_0x5879a8++)_0x4db8e5[_0x5879a8]['length']&&_0x5eee53[_0xcbb3('0x15')](_0x4db8e5[_0x5879a8]);return _0x13d650['QD_SelectSmartResearch2'][_0xcbb3('0x54')][_0xcbb3('0x55')]=_0x5eee53;};_0x13d650['QD_SelectSmartResearch2']['getCategory']['cache']=null;_0x13d650['fn'][_0xcbb3('0x1')]=function(_0x422d90){var _0x5a1ea1=_0x13d650(this);if(!_0x5a1ea1[_0xcbb3('0x1a')])return _0x5a1ea1;_0x422d90=_0x13d650['extend']({},_0x19e74b,_0x422d90);_0x5a1ea1['qdPlugin']=new _0x13d650[(_0xcbb3('0x1'))](_0x5a1ea1,_0x422d90);return _0x5a1ea1;};_0x13d650(function(){_0x13d650(_0xcbb3('0x5c'))['QD_SelectSmartResearch2']();});}}(this));
