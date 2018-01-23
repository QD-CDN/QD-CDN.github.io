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
		bannerSlider: function () {
			$('.slider-qd-v1-full').slick({
				prevArrow: '<button type="button" class="slick-prev" title="Anterior"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next" title="Próximo"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>',
				dots: true,
				adaptiveHeight: true,
				fade: true,
				speed: 400,
				cssEase: 'linear',
				autoplay: true,
				autoplaySpeed: 7000,
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

var _0x2fb3=['undefined','pow','round','toFixed','length','join','QD_SmartPrice','Smart\x20Price','object','error','info','warn','unshift','toLowerCase','aviso','apply','search','text','match','[class*=\x27desconto\x27]','auto','.productRightColumn','strong.skuBestPrice','label.skuBestInstallmentValue','strong.skuPrice','rnaqevavfgber%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','---','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','productPage','isProductPage','closest','wrapperElement','skuBestPrice','addClass','qd-sp-active','.qd_sp_on,\x20.qd_sp_ignored','find','qd-active','oneFlagByItem','siblings','qd_sp_ignored','qd_sp_on','isDiscountFlag','skuCorrente','skus','sku','available','isSmartCheckout','O\x20valor\x20informado\x20p/\x20o\x20desconto\x20não\x20é\x20um\x20número.','alerta','bestPrice','.qd_productPrice','val','Por\x20alguma\x20razão\x20não\x20consegui\x20obter\x20o\x20preço\x20deste\x20produto\x20:(','appliedDiscount','getDiscountValue','listPrice','.qd_productOldPrice','changeNativePrice','skuPrice','html','installments','changeInstallments','.qd_sp_display_installmentValue','append','.qd_saveAmountPercent','prepend','changeNativeSaveAmount','em.economia-de','each','skuSelected.vtex','qd_sp_processedItem','flagElement','forcePromotion','string','startedByWrapper','not','.qd_productPrice:not(.qd_sp_processedItem)','attr','display:none\x20!important;','boolean','body','function','prototype','trim','replace','abs'];(function(_0x5a0711,_0xb31b52){var _0x1a77d8=function(_0x405909){while(--_0x405909){_0x5a0711['push'](_0x5a0711['shift']());}};_0x1a77d8(++_0xb31b52);}(_0x2fb3,0xb1));var _0x32fb=function(_0x2ec217,_0x42393b){_0x2ec217=_0x2ec217-0x0;var _0x41b614=_0x2fb3[_0x2ec217];return _0x41b614;};_0x32fb('0x0')!==typeof String[_0x32fb('0x1')][_0x32fb('0x2')]&&(String['prototype']['trim']=function(){return this[_0x32fb('0x3')](/^\s+|\s+$/g,'');});function qd_number_format(_0x4fc27c,_0x5d83d2,_0x2850d8,_0x345da9){_0x4fc27c=(_0x4fc27c+'')[_0x32fb('0x3')](/[^0-9+\-Ee.]/g,'');_0x4fc27c=isFinite(+_0x4fc27c)?+_0x4fc27c:0x0;_0x5d83d2=isFinite(+_0x5d83d2)?Math[_0x32fb('0x4')](_0x5d83d2):0x0;_0x345da9=_0x32fb('0x5')===typeof _0x345da9?',':_0x345da9;_0x2850d8='undefined'===typeof _0x2850d8?'.':_0x2850d8;var _0x5436c6='',_0x5436c6=function(_0x5846da,_0x5ad244){var _0x5d83d2=Math[_0x32fb('0x6')](0xa,_0x5ad244);return''+(Math[_0x32fb('0x7')](_0x5846da*_0x5d83d2)/_0x5d83d2)[_0x32fb('0x8')](_0x5ad244);},_0x5436c6=(_0x5d83d2?_0x5436c6(_0x4fc27c,_0x5d83d2):''+Math['round'](_0x4fc27c))['split']('.');0x3<_0x5436c6[0x0][_0x32fb('0x9')]&&(_0x5436c6[0x0]=_0x5436c6[0x0][_0x32fb('0x3')](/\B(?=(?:\d{3})+(?!\d))/g,_0x345da9));(_0x5436c6[0x1]||'')['length']<_0x5d83d2&&(_0x5436c6[0x1]=_0x5436c6[0x1]||'',_0x5436c6[0x1]+=Array(_0x5d83d2-_0x5436c6[0x1][_0x32fb('0x9')]+0x1)[_0x32fb('0xa')]('0'));return _0x5436c6[_0x32fb('0xa')](_0x2850d8);};(function(_0x21a6e1){'use strict';var _0x12b19d=jQuery;if(typeof _0x12b19d['fn'][_0x32fb('0xb')]==='function')return;var _0x25587d=_0x32fb('0xc');var _0x1ea8f0=function(_0x571e98,_0x42d84d){if(_0x32fb('0xd')===typeof console&&_0x32fb('0x0')===typeof console[_0x32fb('0xe')]&&_0x32fb('0x0')===typeof console[_0x32fb('0xf')]&&'function'===typeof console[_0x32fb('0x10')]){var _0x3b6b4a;'object'===typeof _0x571e98?(_0x571e98[_0x32fb('0x11')]('['+_0x25587d+']\x0a'),_0x3b6b4a=_0x571e98):_0x3b6b4a=['['+_0x25587d+']\x0a'+_0x571e98];if(_0x32fb('0x5')===typeof _0x42d84d||'alerta'!==_0x42d84d[_0x32fb('0x12')]()&&_0x32fb('0x13')!==_0x42d84d[_0x32fb('0x12')]())if(_0x32fb('0x5')!==typeof _0x42d84d&&_0x32fb('0xf')===_0x42d84d[_0x32fb('0x12')]())try{console['info'][_0x32fb('0x14')](console,_0x3b6b4a);}catch(_0x550e66){console[_0x32fb('0xf')](_0x3b6b4a['join']('\x0a'));}else try{console[_0x32fb('0xe')]['apply'](console,_0x3b6b4a);}catch(_0x2bb2ee){console[_0x32fb('0xe')](_0x3b6b4a[_0x32fb('0xa')]('\x0a'));}else try{console['warn']['apply'](console,_0x3b6b4a);}catch(_0x422c63){console[_0x32fb('0x10')](_0x3b6b4a[_0x32fb('0xa')]('\x0a'));}}};var _0x501517=/[0-9]+\%/i;var _0x39028f=/[0-9\.]+(?=\%)/i;var _0x3970df={'isDiscountFlag':function(_0xe00fad){if(_0xe00fad['text']()[_0x32fb('0x15')](_0x501517)>-0x1)return!![];return![];},'getDiscountValue':function(_0x1923f7){return _0x1923f7[_0x32fb('0x16')]()[_0x32fb('0x17')](_0x39028f);},'startedByWrapper':![],'flagElement':'.flag','wrapperElement':'li','filterFlagBy':_0x32fb('0x18'),'forcePromotion':null,'appliedDiscount':null,'oneFlagByItem':!![],'isSmartCheckout':!![],'changeInstallments':![],'productPage':{'changeNativeSaveAmount':!![],'changeNativePrice':!![],'changeInstallments':![],'isProductPage':_0x32fb('0x19'),'wrapperElement':_0x32fb('0x1a'),'skuBestPrice':_0x32fb('0x1b'),'installments':'label.skuBestInstallmentNumber','installmentValue':_0x32fb('0x1c'),'skuPrice':_0x32fb('0x1d')}};_0x12b19d['fn'][_0x32fb('0xb')]=function(){};var _0x114628=function(_0x53f8f7){var _0x4fc79f={'y':_0x32fb('0x1e')};return function(_0x48f8be){var _0x44a926,_0x267efb,_0x124e6c,_0x7eb986;_0x267efb=function(_0xf1d28){return _0xf1d28;};_0x124e6c=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x48f8be=_0x48f8be['d'+_0x124e6c[0x10]+'c'+_0x124e6c[0x11]+'m'+_0x267efb(_0x124e6c[0x1])+'n'+_0x124e6c[0xd]]['l'+_0x124e6c[0x12]+'c'+_0x124e6c[0x0]+'ti'+_0x267efb('o')+'n'];_0x44a926=function(_0xda02a8){return escape(encodeURIComponent(_0xda02a8[_0x32fb('0x3')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x253c2a){return String[_0x32fb('0x1f')](('Z'>=_0x253c2a?0x5a:0x7a)>=(_0x253c2a=_0x253c2a[_0x32fb('0x20')](0x0)+0xd)?_0x253c2a:_0x253c2a-0x1a);})));};var _0x49c0b4=_0x44a926(_0x48f8be[[_0x124e6c[0x9],_0x267efb('o'),_0x124e6c[0xc],_0x124e6c[_0x267efb(0xd)]][_0x32fb('0xa')]('')]);_0x44a926=_0x44a926((window[['js',_0x267efb('no'),'m',_0x124e6c[0x1],_0x124e6c[0x4][_0x32fb('0x21')](),_0x32fb('0x22')]['join']('')]||_0x32fb('0x23'))+['.v',_0x124e6c[0xd],'e',_0x267efb('x'),'co',_0x267efb('mm'),'erc',_0x124e6c[0x1],'.c',_0x267efb('o'),'m.',_0x124e6c[0x13],'r']['join'](''));for(var _0x272c2b in _0x4fc79f){if(_0x44a926===_0x272c2b+_0x4fc79f[_0x272c2b]||_0x49c0b4===_0x272c2b+_0x4fc79f[_0x272c2b]){_0x7eb986='tr'+_0x124e6c[0x11]+'e';break;}_0x7eb986='f'+_0x124e6c[0x0]+'ls'+_0x267efb(_0x124e6c[0x1])+'';}_0x267efb=!0x1;-0x1<_0x48f8be[[_0x124e6c[0xc],'e',_0x124e6c[0x0],'rc',_0x124e6c[0x9]][_0x32fb('0xa')]('')]['indexOf'](_0x32fb('0x24'))&&(_0x267efb=!0x0);return[_0x7eb986,_0x267efb];}(_0x53f8f7);}(window);if(!eval(_0x114628[0x0]))return _0x114628[0x1]?_0x1ea8f0('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x44ffd0=function(_0x1d171c,_0x1ca6d9){'use strict';var _0x21f678=function(_0x28cdfb){'use strict';var _0x3febe1,_0x2f4816,_0x50fd51,_0x3b35ef,_0x420f44,_0x5b12e7,_0xe68965,_0x36b212,_0x54ae10,_0x2245bc,_0x35a9aa,_0x29b53c,_0x2a6bc3,_0x10c46f,_0x599ec6,_0x4aa813,_0x450809,_0x47ec09,_0xccea6d;var _0x441b7a=_0x12b19d(this);_0x28cdfb=typeof _0x28cdfb===_0x32fb('0x5')?![]:_0x28cdfb;if(_0x1ca6d9[_0x32fb('0x25')][_0x32fb('0x26')])var _0x3764f2=_0x441b7a[_0x32fb('0x27')](_0x1ca6d9['productPage'][_0x32fb('0x28')]);else var _0x3764f2=_0x441b7a[_0x32fb('0x27')](_0x1ca6d9[_0x32fb('0x28')]);if(!_0x28cdfb&&!_0x441b7a['is'](_0x1ca6d9['filterFlagBy'])){if(_0x1ca6d9[_0x32fb('0x25')][_0x32fb('0x26')]&&_0x3764f2['is'](_0x1ca6d9[_0x32fb('0x25')][_0x32fb('0x28')])){_0x3764f2['find'](_0x1ca6d9['productPage'][_0x32fb('0x29')])[_0x32fb('0x2a')]('qd-active');_0x3764f2['addClass'](_0x32fb('0x2b'));}return;}var _0x3740e7=_0x1ca6d9['productPage']['isProductPage'];if(_0x441b7a['is'](_0x32fb('0x2c'))&&!_0x3740e7)return;if(_0x3740e7){_0x36b212=_0x3764f2[_0x32fb('0x2d')](_0x1ca6d9['productPage'][_0x32fb('0x29')]);if(_0x36b212['find']('.qd_active')[_0x32fb('0x9')])return;_0x36b212['removeClass'](_0x32fb('0x2e'));_0x3764f2['removeClass']('qd-sp-active');}if(_0x1ca6d9[_0x32fb('0x2f')]&&_0x441b7a[_0x32fb('0x30')]('.qd_sp_on')['length']){_0x441b7a[_0x32fb('0x2a')](_0x32fb('0x31'));return;}_0x441b7a['addClass'](_0x32fb('0x32'));if(!_0x1ca6d9[_0x32fb('0x33')](_0x441b7a))return;if(_0x3740e7){_0x50fd51={};var _0x5a242d=parseInt(_0x12b19d('div[skuCorrente]:first')['attr'](_0x32fb('0x34')),0xa);if(_0x5a242d){for(var _0x35c6d1=0x0;_0x35c6d1<skuJson[_0x32fb('0x35')][_0x32fb('0x9')];_0x35c6d1++){if(skuJson[_0x32fb('0x35')][_0x35c6d1][_0x32fb('0x36')]==_0x5a242d){_0x50fd51=skuJson['skus'][_0x35c6d1];break;}}}else{var _0x8997e=0x5af3107a3fff;for(var _0x48c2f8 in skuJson[_0x32fb('0x35')]){if(typeof skuJson['skus'][_0x48c2f8]===_0x32fb('0x0'))continue;if(!skuJson[_0x32fb('0x35')][_0x48c2f8][_0x32fb('0x37')])continue;if(skuJson[_0x32fb('0x35')][_0x48c2f8]['bestPrice']<_0x8997e){_0x8997e=skuJson['skus'][_0x48c2f8]['bestPrice'];_0x50fd51=skuJson[_0x32fb('0x35')][_0x48c2f8];}}}}_0x4aa813=!![];_0x450809=0x0;if(_0x1ca6d9[_0x32fb('0x38')]&&_0x47ec09){_0x4aa813=skuJson[_0x32fb('0x37')];if(!_0x4aa813)return _0x3764f2['addClass']('qd-sp-product-unavailable');}_0x2f4816=_0x1ca6d9['getDiscountValue'](_0x441b7a);_0x3febe1=parseFloat(_0x2f4816,0xa);if(isNaN(_0x3febe1))return _0x1ea8f0([_0x32fb('0x39'),_0x441b7a],_0x32fb('0x3a'));var _0x2507af=function(_0x239182){if(_0x3740e7)_0x3b35ef=(_0x239182[_0x32fb('0x3b')]||0x0)/0x64;else{_0x2a6bc3=_0x3764f2[_0x32fb('0x2d')](_0x32fb('0x3c'));_0x3b35ef=parseFloat((_0x2a6bc3[_0x32fb('0x3d')]()||'')[_0x32fb('0x3')](/[^0-9\.\,]+/i,'')[_0x32fb('0x3')]('.','')['replace'](',','.'),0xa);}if(isNaN(_0x3b35ef))return _0x1ea8f0([_0x32fb('0x3e'),_0x441b7a,_0x3764f2]);if(_0x1ca6d9['appliedDiscount']!==null){_0x10c46f=0x0;if(!isNaN(_0x1ca6d9['appliedDiscount']))_0x10c46f=_0x1ca6d9[_0x32fb('0x3f')];else{_0x599ec6=_0x3764f2[_0x32fb('0x2d')](_0x1ca6d9[_0x32fb('0x3f')]);if(_0x599ec6[_0x32fb('0x9')])_0x10c46f=_0x1ca6d9[_0x32fb('0x40')](_0x599ec6);}_0x10c46f=parseFloat(_0x10c46f,0xa);if(isNaN(_0x10c46f))_0x10c46f=0x0;if(_0x10c46f!==0x0)_0x3b35ef=_0x3b35ef*0x64/(0x64-_0x10c46f);}if(_0x3740e7)_0x420f44=(_0x239182[_0x32fb('0x41')]||0x0)/0x64;else _0x420f44=parseFloat((_0x3764f2[_0x32fb('0x2d')](_0x32fb('0x42'))['val']()||'')['replace'](/[^0-9\.\,]+/i,'')[_0x32fb('0x3')]('.','')[_0x32fb('0x3')](',','.'),0xa);if(isNaN(_0x420f44))_0x420f44=0.001;_0x5b12e7=_0x3b35ef*((0x64-_0x3febe1)/0x64);if(_0x3740e7&&_0x1ca6d9[_0x32fb('0x25')][_0x32fb('0x43')]){_0x36b212[_0x32fb('0x16')](_0x36b212[_0x32fb('0x16')]()['trim']()['replace'](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x5b12e7,0x2,',','.')))[_0x32fb('0x2a')](_0x32fb('0x2e'));_0x3764f2[_0x32fb('0x2a')](_0x32fb('0x2b'));}else{_0xccea6d=_0x3764f2[_0x32fb('0x2d')]('.qd_displayPrice');_0xccea6d[_0x32fb('0x16')](_0xccea6d[_0x32fb('0x16')]()[_0x32fb('0x3')](/[0-9\.]+,[0-9]+/i,'')+qd_number_format(_0x5b12e7,0x2,',','.'));}if(_0x3740e7){_0xe68965=_0x3764f2[_0x32fb('0x2d')](_0x1ca6d9[_0x32fb('0x25')][_0x32fb('0x44')]);if(_0xe68965[_0x32fb('0x9')])_0xe68965[_0x32fb('0x16')](_0xe68965[_0x32fb('0x16')]()[_0x32fb('0x2')]()[_0x32fb('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x5b12e7,0x2,',','.')));}var _0xfdc44d=_0x3764f2[_0x32fb('0x2d')]('.qd-sp-display-discount');_0xfdc44d[_0x32fb('0x16')](_0xfdc44d['text']()[_0x32fb('0x3')](/[0-9]+\%/i,_0x3febe1+'%'));var _0x512a9f=function(_0x182fb8,_0x3cb503,_0x4eb319){var _0x20a0dd=_0x3764f2['find'](_0x182fb8);if(_0x20a0dd['length'])_0x20a0dd[_0x32fb('0x45')](_0x20a0dd[_0x32fb('0x45')]()[_0x32fb('0x2')]()[_0x32fb('0x3')](/[0-9]{1,2}/,_0x4eb319?_0x4eb319:_0x239182[_0x32fb('0x46')]||0x0));var _0x5cbb22=_0x3764f2[_0x32fb('0x2d')](_0x3cb503);if(_0x5cbb22['length'])_0x5cbb22[_0x32fb('0x45')](_0x5cbb22[_0x32fb('0x45')]()[_0x32fb('0x2')]()[_0x32fb('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x5b12e7/(_0x4eb319?_0x4eb319:_0x239182['installments']||0x1),0x2,',','.')));};if(_0x3740e7&&_0x1ca6d9['productPage'][_0x32fb('0x47')])_0x512a9f(_0x1ca6d9[_0x32fb('0x25')][_0x32fb('0x46')],_0x1ca6d9['productPage']['installmentValue']);else if(_0x1ca6d9['changeInstallments'])_0x512a9f('.qd_sp_display_installments',_0x32fb('0x48'),parseInt(_0x3764f2[_0x32fb('0x2d')]('.qd_sp_installments')[_0x32fb('0x3d')]()||0x1)||0x1);_0x3764f2[_0x32fb('0x2d')]('.qd_saveAmount')[_0x32fb('0x49')](qd_number_format(_0x420f44-_0x5b12e7,0x2,',','.'));_0x3764f2[_0x32fb('0x2d')](_0x32fb('0x4a'))[_0x32fb('0x4b')](qd_number_format((_0x420f44-_0x5b12e7)*0x64/_0x420f44,0x2,',','.'));if(_0x3740e7&&_0x1ca6d9['productPage'][_0x32fb('0x4c')]){_0x12b19d(_0x32fb('0x4d'))[_0x32fb('0x4e')](function(){_0x35a9aa=_0x12b19d(this);_0x35a9aa[_0x32fb('0x16')](_0x35a9aa['text']()['trim']()[_0x32fb('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x420f44-_0x5b12e7,0x2,',','.')));_0x35a9aa[_0x32fb('0x2a')]('qd-active');});}};_0x2507af(_0x50fd51);if(_0x3740e7)_0x12b19d(window)['on'](_0x32fb('0x4f'),function(_0x4adab7,_0x4cf13b,_0xc4ba0f){_0x2507af(_0xc4ba0f);});_0x3764f2[_0x32fb('0x2a')](_0x32fb('0x50'));if(!_0x3740e7)_0x2a6bc3[_0x32fb('0x2a')](_0x32fb('0x50'));};(_0x1ca6d9['startedByWrapper']?_0x1d171c[_0x32fb('0x2d')](_0x1ca6d9[_0x32fb('0x51')]):_0x1d171c)[_0x32fb('0x4e')](function(){_0x21f678['call'](this,![]);});if(typeof _0x1ca6d9[_0x32fb('0x52')]==_0x32fb('0x53')){var _0x2293ae=_0x1ca6d9[_0x32fb('0x54')]?_0x1d171c:_0x1d171c['closest'](_0x1ca6d9[_0x32fb('0x28')]);if(_0x1ca6d9[_0x32fb('0x25')]['isProductPage'])_0x2293ae=_0x2293ae[_0x32fb('0x27')](_0x1ca6d9['productPage'][_0x32fb('0x28')])[_0x32fb('0x55')]('.qd_sp_processedItem');else _0x2293ae=_0x2293ae[_0x32fb('0x2d')](_0x32fb('0x56'));_0x2293ae[_0x32fb('0x4e')](function(){var _0x20a4fe=_0x12b19d(_0x1ca6d9[_0x32fb('0x52')]);_0x20a4fe[_0x32fb('0x57')]('style',_0x32fb('0x58'));if(_0x1ca6d9[_0x32fb('0x25')][_0x32fb('0x26')])_0x12b19d(this)[_0x32fb('0x49')](_0x20a4fe);else _0x12b19d(this)['after'](_0x20a4fe);_0x21f678['call'](_0x20a4fe,!![]);});}};_0x12b19d['fn'][_0x32fb('0xb')]=function(_0x3c685a){var _0x202c46=_0x12b19d(this);if(!_0x202c46[_0x32fb('0x9')])return _0x202c46;var _0x58a236=_0x12b19d['extend'](!![],{},_0x3970df,_0x3c685a);if(typeof _0x58a236[_0x32fb('0x25')][_0x32fb('0x26')]!=_0x32fb('0x59'))_0x58a236[_0x32fb('0x25')]['isProductPage']=_0x12b19d(document[_0x32fb('0x5a')])['is']('.produto');_0x44ffd0(_0x202c46,_0x58a236);return _0x202c46;};}(this));

// amazing menu
var _0xb31c=['insertBefore','qd-am-content-loaded','attr','trim','[class*=\x27colunas\x27]','hide','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','trigger','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','alerta','li\x20>ul',':not(ul)','text','>li','qd-amazing-menu','>ul','qd-am-dropdown-menu','qd-am-dropdown','children','qd-am-','-li','callback','QuatroDigital.am.callback','extend','exec','.qd_amazing_menu_auto','getParent','closest','QD_amazingMenu','/qd-amazing-menu','QD\x20Amazing\x20Menu','object','undefined','error','info','warn','unshift','toLowerCase','aviso','apply','join','qdAmAddNdx','each','addClass','qd-am-li-','first','qd-am-first','last','rnaqevavfgber%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','ite','erc','indexOf','find','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','url','html','img[alt=\x27','data-qdam-value','.box-banner','clone'];(function(_0x576946,_0x4df7b4){var _0x470757=function(_0x32e4e8){while(--_0x32e4e8){_0x576946['push'](_0x576946['shift']());}};_0x470757(++_0x4df7b4);}(_0xb31c,0xff));var _0xcb31=function(_0x23ee3b,_0x184dc9){_0x23ee3b=_0x23ee3b-0x0;var _0xe5417d=_0xb31c[_0x23ee3b];return _0xe5417d;};(function(_0x1a44f6){_0x1a44f6['fn'][_0xcb31('0x0')]=_0x1a44f6['fn'][_0xcb31('0x1')];}(jQuery));(function(_0x461259){'use strict';var _0x1b377d,_0x92b373,_0xdfe1cb,_0x59b68e;_0x1b377d=jQuery;if(typeof _0x1b377d['fn'][_0xcb31('0x2')]==='function')return;_0x92b373={'url':_0xcb31('0x3'),'callback':function(){},'ajaxCallback':function(){}};var _0x3d7525=_0xcb31('0x4');var _0x264c90=function(_0x54e49c,_0x3d21d9){if(_0xcb31('0x5')===typeof console&&_0xcb31('0x6')!==typeof console[_0xcb31('0x7')]&&'undefined'!==typeof console[_0xcb31('0x8')]&&'undefined'!==typeof console[_0xcb31('0x9')]){var _0x3b205;'object'===typeof _0x54e49c?(_0x54e49c[_0xcb31('0xa')]('['+_0x3d7525+']\x0a'),_0x3b205=_0x54e49c):_0x3b205=['['+_0x3d7525+']\x0a'+_0x54e49c];if('undefined'===typeof _0x3d21d9||'alerta'!==_0x3d21d9[_0xcb31('0xb')]()&&_0xcb31('0xc')!==_0x3d21d9[_0xcb31('0xb')]())if(_0xcb31('0x6')!==typeof _0x3d21d9&&_0xcb31('0x8')===_0x3d21d9[_0xcb31('0xb')]())try{console['info'][_0xcb31('0xd')](console,_0x3b205);}catch(_0x107c75){try{console['info'](_0x3b205[_0xcb31('0xe')]('\x0a'));}catch(_0x3f1680){}}else try{console['error'][_0xcb31('0xd')](console,_0x3b205);}catch(_0x293f1a){try{console[_0xcb31('0x7')](_0x3b205[_0xcb31('0xe')]('\x0a'));}catch(_0x8d8533){}}else try{console[_0xcb31('0x9')]['apply'](console,_0x3b205);}catch(_0x1ff4cd){try{console[_0xcb31('0x9')](_0x3b205[_0xcb31('0xe')]('\x0a'));}catch(_0x4bc12c){}}}};_0x1b377d['fn'][_0xcb31('0xf')]=function(){var _0x28c602=_0x1b377d(this);_0x28c602[_0xcb31('0x10')](function(_0x18af64){_0x1b377d(this)[_0xcb31('0x11')](_0xcb31('0x12')+_0x18af64);});_0x28c602[_0xcb31('0x13')]()[_0xcb31('0x11')](_0xcb31('0x14'));_0x28c602[_0xcb31('0x15')]()['addClass']('qd-am-last');return _0x28c602;};_0x1b377d['fn'][_0xcb31('0x2')]=function(){};var _0xd2835a=function(_0x47e646){var _0x383ffc={'y':_0xcb31('0x16')};return function(_0x31823d){var _0x3ca836,_0x29eeb3,_0x175422,_0x3a3a3a;_0x29eeb3=function(_0x468af0){return _0x468af0;};_0x175422=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x31823d=_0x31823d['d'+_0x175422[0x10]+'c'+_0x175422[0x11]+'m'+_0x29eeb3(_0x175422[0x1])+'n'+_0x175422[0xd]]['l'+_0x175422[0x12]+'c'+_0x175422[0x0]+'ti'+_0x29eeb3('o')+'n'];_0x3ca836=function(_0x590cb9){return escape(encodeURIComponent(_0x590cb9[_0xcb31('0x17')](/\./g,'¨')[_0xcb31('0x17')](/[a-zA-Z]/g,function(_0x3d3985){return String[_0xcb31('0x18')](('Z'>=_0x3d3985?0x5a:0x7a)>=(_0x3d3985=_0x3d3985[_0xcb31('0x19')](0x0)+0xd)?_0x3d3985:_0x3d3985-0x1a);})));};var _0x39516d=_0x3ca836(_0x31823d[[_0x175422[0x9],_0x29eeb3('o'),_0x175422[0xc],_0x175422[_0x29eeb3(0xd)]][_0xcb31('0xe')]('')]);_0x3ca836=_0x3ca836((window[['js',_0x29eeb3('no'),'m',_0x175422[0x1],_0x175422[0x4][_0xcb31('0x1a')](),_0xcb31('0x1b')][_0xcb31('0xe')]('')]||'---')+['.v',_0x175422[0xd],'e',_0x29eeb3('x'),'co',_0x29eeb3('mm'),_0xcb31('0x1c'),_0x175422[0x1],'.c',_0x29eeb3('o'),'m.',_0x175422[0x13],'r'][_0xcb31('0xe')](''));for(var _0x48a22b in _0x383ffc){if(_0x3ca836===_0x48a22b+_0x383ffc[_0x48a22b]||_0x39516d===_0x48a22b+_0x383ffc[_0x48a22b]){_0x3a3a3a='tr'+_0x175422[0x11]+'e';break;}_0x3a3a3a='f'+_0x175422[0x0]+'ls'+_0x29eeb3(_0x175422[0x1])+'';}_0x29eeb3=!0x1;-0x1<_0x31823d[[_0x175422[0xc],'e',_0x175422[0x0],'rc',_0x175422[0x9]][_0xcb31('0xe')]('')][_0xcb31('0x1d')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x29eeb3=!0x0);return[_0x3a3a3a,_0x29eeb3];}(_0x47e646);}(window);if(!eval(_0xd2835a[0x0]))return _0xd2835a[0x1]?_0x264c90('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x59b68e=function(_0x3430f6){var _0x2c6d54,_0x3aafd8,_0x41f89e;_0x41f89e=_0x3430f6[_0xcb31('0x1e')](_0xcb31('0x1f'));_0x2c6d54=_0x41f89e[_0xcb31('0x20')](_0xcb31('0x21'));_0x3aafd8=_0x41f89e[_0xcb31('0x20')](_0xcb31('0x22'));if(!(_0x2c6d54['length']||_0x3aafd8[_0xcb31('0x23')]))return;_0x2c6d54[_0xcb31('0x24')]()[_0xcb31('0x11')](_0xcb31('0x25'));_0x3aafd8[_0xcb31('0x24')]()[_0xcb31('0x11')](_0xcb31('0x26'));_0x1b377d['qdAjax']({'url':_0xdfe1cb[_0xcb31('0x27')],'dataType':_0xcb31('0x28'),'success':function(_0x31aa22){var _0x2db788=_0x1b377d(_0x31aa22);_0x2c6d54[_0xcb31('0x10')](function(){var _0x292ed2,_0x2d5e24;_0x2d5e24=_0x1b377d(this);_0x292ed2=_0x2db788['find'](_0xcb31('0x29')+_0x2d5e24['attr'](_0xcb31('0x2a'))+'\x27]');if(!_0x292ed2[_0xcb31('0x23')])return;_0x292ed2[_0xcb31('0x10')](function(){_0x1b377d(this)[_0xcb31('0x0')](_0xcb31('0x2b'))[_0xcb31('0x2c')]()[_0xcb31('0x2d')](_0x2d5e24);});_0x2d5e24['hide']();})[_0xcb31('0x11')](_0xcb31('0x2e'));_0x3aafd8['each'](function(){var _0x5d8633={},_0x484476;_0x484476=_0x1b377d(this);_0x2db788[_0xcb31('0x1e')]('h2')['each'](function(){if(_0x1b377d(this)['text']()['trim']()[_0xcb31('0xb')]()==_0x484476[_0xcb31('0x2f')]('data-qdam-value')[_0xcb31('0x30')]()[_0xcb31('0xb')]()){_0x5d8633=_0x1b377d(this);return![];}});if(!_0x5d8633[_0xcb31('0x23')])return;_0x5d8633[_0xcb31('0x10')](function(){_0x1b377d(this)[_0xcb31('0x0')](_0xcb31('0x31'))[_0xcb31('0x2c')]()[_0xcb31('0x2d')](_0x484476);});_0x484476[_0xcb31('0x32')]();})[_0xcb31('0x11')]('qd-am-content-loaded');},'error':function(){_0x264c90(_0xcb31('0x33')+_0xdfe1cb[_0xcb31('0x27')]+_0xcb31('0x34'));},'complete':function(){_0xdfe1cb[_0xcb31('0x35')][_0xcb31('0x36')](this);_0x1b377d(window)[_0xcb31('0x37')]('QuatroDigital.am.ajaxCallback',_0x3430f6);},'clearQueueDelay':0xbb8});};_0x1b377d['QD_amazingMenu']=function(_0x19ff34){var _0x35f8f4=_0x19ff34[_0xcb31('0x1e')](_0xcb31('0x38'))[_0xcb31('0x10')](function(){var _0x1e2ba9,_0x5b2ec1,_0x3b7951,_0x465cb9;_0x1e2ba9=_0x1b377d(this);if(!_0x1e2ba9[_0xcb31('0x23')])return _0x264c90([_0xcb31('0x39'),_0x19ff34],_0xcb31('0x3a'));_0x1e2ba9[_0xcb31('0x1e')](_0xcb31('0x3b'))['parent']()[_0xcb31('0x11')]('qd-am-has-ul');_0x1e2ba9[_0xcb31('0x1e')]('li')['each'](function(){var _0x53dea1=_0x1b377d(this),_0x4e51e4;_0x4e51e4=_0x53dea1['children'](_0xcb31('0x3c'));if(!_0x4e51e4[_0xcb31('0x23')])return;_0x53dea1[_0xcb31('0x11')]('qd-am-elem-'+_0x4e51e4[_0xcb31('0x13')]()[_0xcb31('0x3d')]()['trim']()['replaceSpecialChars']()[_0xcb31('0x17')](/\./g,'')['replace'](/\s/g,'-')[_0xcb31('0xb')]());});_0x5b2ec1=_0x1e2ba9[_0xcb31('0x1e')](_0xcb31('0x3e'))[_0xcb31('0xf')]();_0x1e2ba9[_0xcb31('0x11')](_0xcb31('0x3f'));_0x3b7951=_0x5b2ec1[_0xcb31('0x1e')](_0xcb31('0x40'));_0x3b7951[_0xcb31('0x10')](function(){var _0x51d48c=_0x1b377d(this),_0x1ff259;_0x1ff259=_0x51d48c[_0xcb31('0x1e')](_0xcb31('0x3e'))[_0xcb31('0xf')]()[_0xcb31('0x11')]('qd-am-column');_0x51d48c[_0xcb31('0x11')](_0xcb31('0x41'));_0x51d48c[_0xcb31('0x24')]()[_0xcb31('0x11')](_0xcb31('0x42'));});_0x3b7951[_0xcb31('0x11')](_0xcb31('0x42'));var _0x3c93f9=0x0;var _0x5b46ea=function(_0x497591){_0x3c93f9=_0x3c93f9+0x1;var _0x21d03e=_0x497591[_0xcb31('0x43')]('li');var _0xddc510=_0x21d03e['children']('*');if(!_0xddc510[_0xcb31('0x23')])return;_0xddc510[_0xcb31('0x11')]('qd-am-level-'+_0x3c93f9);_0x5b46ea(_0xddc510);};_0x5b46ea(_0x1e2ba9);_0x1e2ba9['add'](_0x1e2ba9[_0xcb31('0x1e')]('ul'))[_0xcb31('0x10')](function(){var _0x2c7d85=_0x1b377d(this);_0x2c7d85[_0xcb31('0x11')](_0xcb31('0x44')+_0x2c7d85[_0xcb31('0x43')]('li')[_0xcb31('0x23')]+_0xcb31('0x45'));});});_0x59b68e(_0x35f8f4);_0xdfe1cb[_0xcb31('0x46')][_0xcb31('0x36')](this);_0x1b377d(window)[_0xcb31('0x37')](_0xcb31('0x47'),_0x19ff34);};_0x1b377d['fn'][_0xcb31('0x2')]=function(_0x35d6c4){var _0x1dd541=_0x1b377d(this);if(!_0x1dd541[_0xcb31('0x23')])return _0x1dd541;_0xdfe1cb=_0x1b377d[_0xcb31('0x48')]({},_0x92b373,_0x35d6c4);_0x1dd541[_0xcb31('0x49')]=new _0x1b377d[(_0xcb31('0x2'))](_0x1b377d(this));return _0x1dd541;};_0x1b377d(function(){_0x1b377d(_0xcb31('0x4a'))[_0xcb31('0x2')]();});}(this));

// smart cart
var _0x3bb7=['QD_smartCart','dropDown','buyButton','selector','QD_buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','replace','abs','undefined','round','split','length','join','_QuatroDigital_CartData','callback','Callbacks','function','error','Oooops!\x20','Quatro\x20Digital\x20-\x20DropDown\x20Cart','object','info','warn','alerta','toLowerCase','aviso','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','rnaqevavfgber%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','toUpperCase','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','skuName','name','extend','smartCheckout','vtexjs','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22>','<div\x20class=\x22qd-ddc-wrapper2\x22>','<div\x20class=\x22qd-ddc-wrapper3\x22>','<div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div>','<div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div>','<span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div>','<div\x20class=\x22qd-ddc-infoBts\x22>','<a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a>','</div></div></div></div></div>','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','texts','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','html','find','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','shippingForm','emptyCart','append','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','body','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','removeClass','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','scrollCart','.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text','.qd-ddc-shipping\x20.qd-ddc-cep','formatCepField','keyCode','.qd-ddc-shipping\x20.qd-ddc-cep-ok','click','.qd-ddc-cep-btn','toggle','.qd-ddc-cep-close','preventDefault','hide','click._QD_DDC_closeShipping','target','closest','.qd-ddc-cep-tooltip','.qd-ddc-cep-ok','shippingCalculate','.qd-ddc-cep','updateOnlyHover','mouseenter.qd_ddc_hover','getCartInfoByUrl','mouseleave.qd_ddc_hover','cartContainer','each','call','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','shipping','allTotal','items','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','getOrderForm','_QuatroDigital_AmountProduct','exec','addClass','QD_checkoutQueue','totalizers','shippingData','Este\x20método\x20esta\x20descontinuado!','cartIsEmpty','qd-ddc-noItems','renderProductsList','.qd-ddc-prodWrapper2','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22>','<img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/>','<span\x20class=\x22qd-ddc-imgLoading\x22></span>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div>','<div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a>','<input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a>','</div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a>','<span\x20class=\x22qd-ddc-prodRowLoading\x22></span>','empty','attr','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','content','val','quantity','.qd-ddc-remove','insertProdImg','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','.qd-ddc-shipping\x20input','address','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','message','actionButtons','lastSku','filter','[data-sku=\x27','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-cart-rendered','qd-ddc-cart-empty','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','forceImageHTTPS','string','https','qd-loaded','load','src','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','.qd-ddc-quantity','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','click.qd_ddc_remove','removeProduct','stop','slideUp','remove','$1-$2$3','qdDdcLastPostalCode','done','.qd-ddc-cep-tooltip-text','.qd-dd-cep-slas','logisticsInfo','slas','<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>','shippingEstimate','\x20dia\x20útil','\x20dias\x20útéis','<tr></tr>','price','</td><td>','\x20para\x20o\x20CEP\x20','</td>','appendTo','tbody','insertBefore','fail','data','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','atenção\x20esta\x20método\x20esta\x20descontinuado','boolean','simpleCart','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','avisso','Callback\x20não\x20é\x20uma\x20função','unshift','allowRecalculate','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','prodId','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','productId','prod_','ajaxStop','Quatro\x20Digital\x20-\x20Plus\x20Smart\x20Cart','.qdDdcContainer'];(function(_0x378a21,_0x458e93){var _0x323c5e=function(_0x24355d){while(--_0x24355d){_0x378a21['push'](_0x378a21['shift']());}};_0x323c5e(++_0x458e93);}(_0x3bb7,0x111));var _0x73bb=function(_0x4f9c19,_0x45ed10){_0x4f9c19=_0x4f9c19-0x0;var _0x13189f=_0x3bb7[_0x4f9c19];return _0x13189f;};(function(_0x49d972){_0x49d972['fn'][_0x73bb('0x0')]=_0x49d972['fn']['closest'];}(jQuery));function qd_number_format(_0x4223e9,_0x5164df,_0x2eedb9,_0x41a21e){_0x4223e9=(_0x4223e9+'')[_0x73bb('0x1')](/[^0-9+\-Ee.]/g,'');_0x4223e9=isFinite(+_0x4223e9)?+_0x4223e9:0x0;_0x5164df=isFinite(+_0x5164df)?Math[_0x73bb('0x2')](_0x5164df):0x0;_0x41a21e=_0x73bb('0x3')===typeof _0x41a21e?',':_0x41a21e;_0x2eedb9=_0x73bb('0x3')===typeof _0x2eedb9?'.':_0x2eedb9;var _0xfa32fd='',_0xfa32fd=function(_0x5c63df,_0x4395d9){var _0x5164df=Math['pow'](0xa,_0x4395d9);return''+(Math[_0x73bb('0x4')](_0x5c63df*_0x5164df)/_0x5164df)['toFixed'](_0x4395d9);},_0xfa32fd=(_0x5164df?_0xfa32fd(_0x4223e9,_0x5164df):''+Math[_0x73bb('0x4')](_0x4223e9))[_0x73bb('0x5')]('.');0x3<_0xfa32fd[0x0]['length']&&(_0xfa32fd[0x0]=_0xfa32fd[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x41a21e));(_0xfa32fd[0x1]||'')[_0x73bb('0x6')]<_0x5164df&&(_0xfa32fd[0x1]=_0xfa32fd[0x1]||'',_0xfa32fd[0x1]+=Array(_0x5164df-_0xfa32fd[0x1][_0x73bb('0x6')]+0x1)[_0x73bb('0x7')]('0'));return _0xfa32fd[_0x73bb('0x7')](_0x2eedb9);};(function(){'use strict';try{window[_0x73bb('0x8')]=window['_QuatroDigital_CartData']||{};window[_0x73bb('0x8')]['callback']=window['_QuatroDigital_CartData'][_0x73bb('0x9')]||$[_0x73bb('0xa')]();}catch(_0x31db35){if(typeof console!=='undefined'&&typeof console['error']===_0x73bb('0xb'))console[_0x73bb('0xc')](_0x73bb('0xd'),_0x31db35['message']);}}());(function(_0x4b2b70){'use strict';try{var _0x362f6a=jQuery;var _0xf9fded=_0x73bb('0xe');var _0x53734d=function(_0x3c6cab,_0x517d2f){if(_0x73bb('0xf')===typeof console&&_0x73bb('0x3')!==typeof console[_0x73bb('0xc')]&&'undefined'!==typeof console[_0x73bb('0x10')]&&_0x73bb('0x3')!==typeof console[_0x73bb('0x11')]){var _0x100bd1;_0x73bb('0xf')===typeof _0x3c6cab?(_0x3c6cab['unshift']('['+_0xf9fded+']\x0a'),_0x100bd1=_0x3c6cab):_0x100bd1=['['+_0xf9fded+']\x0a'+_0x3c6cab];if(_0x73bb('0x3')===typeof _0x517d2f||_0x73bb('0x12')!==_0x517d2f[_0x73bb('0x13')]()&&_0x73bb('0x14')!==_0x517d2f[_0x73bb('0x13')]())if(_0x73bb('0x3')!==typeof _0x517d2f&&_0x73bb('0x10')===_0x517d2f[_0x73bb('0x13')]())try{console[_0x73bb('0x10')][_0x73bb('0x15')](console,_0x100bd1);}catch(_0x3df65f){try{console['info'](_0x100bd1['join']('\x0a'));}catch(_0x3452ee){}}else try{console[_0x73bb('0xc')][_0x73bb('0x15')](console,_0x100bd1);}catch(_0x5a5491){try{console[_0x73bb('0xc')](_0x100bd1[_0x73bb('0x7')]('\x0a'));}catch(_0x5ea1ce){}}else try{console['warn'][_0x73bb('0x15')](console,_0x100bd1);}catch(_0x163318){try{console[_0x73bb('0x11')](_0x100bd1[_0x73bb('0x7')]('\x0a'));}catch(_0x2a15be){}}}};window[_0x73bb('0x16')]=window[_0x73bb('0x16')]||{};window[_0x73bb('0x16')][_0x73bb('0x17')]=!![];_0x362f6a['QD_dropDownCart']=function(){};_0x362f6a['fn'][_0x73bb('0x18')]=function(){return{'fn':new _0x362f6a()};};var _0x27a020=function(_0x5e860c){var _0x1994fc={'y':_0x73bb('0x19')};return function(_0x6f5256){var _0x4031aa,_0x49b827,_0x4928b9,_0xd045a6;_0x49b827=function(_0x34cc98){return _0x34cc98;};_0x4928b9=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x6f5256=_0x6f5256['d'+_0x4928b9[0x10]+'c'+_0x4928b9[0x11]+'m'+_0x49b827(_0x4928b9[0x1])+'n'+_0x4928b9[0xd]]['l'+_0x4928b9[0x12]+'c'+_0x4928b9[0x0]+'ti'+_0x49b827('o')+'n'];_0x4031aa=function(_0x27729a){return escape(encodeURIComponent(_0x27729a[_0x73bb('0x1')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x4d96ed){return String[_0x73bb('0x1a')](('Z'>=_0x4d96ed?0x5a:0x7a)>=(_0x4d96ed=_0x4d96ed['charCodeAt'](0x0)+0xd)?_0x4d96ed:_0x4d96ed-0x1a);})));};var _0x5b129a=_0x4031aa(_0x6f5256[[_0x4928b9[0x9],_0x49b827('o'),_0x4928b9[0xc],_0x4928b9[_0x49b827(0xd)]][_0x73bb('0x7')]('')]);_0x4031aa=_0x4031aa((window[['js',_0x49b827('no'),'m',_0x4928b9[0x1],_0x4928b9[0x4][_0x73bb('0x1b')](),'ite']['join']('')]||_0x73bb('0x1c'))+['.v',_0x4928b9[0xd],'e',_0x49b827('x'),'co',_0x49b827('mm'),_0x73bb('0x1d'),_0x4928b9[0x1],'.c',_0x49b827('o'),'m.',_0x4928b9[0x13],'r'][_0x73bb('0x7')](''));for(var _0x502b92 in _0x1994fc){if(_0x4031aa===_0x502b92+_0x1994fc[_0x502b92]||_0x5b129a===_0x502b92+_0x1994fc[_0x502b92]){_0xd045a6='tr'+_0x4928b9[0x11]+'e';break;}_0xd045a6='f'+_0x4928b9[0x0]+'ls'+_0x49b827(_0x4928b9[0x1])+'';}_0x49b827=!0x1;-0x1<_0x6f5256[[_0x4928b9[0xc],'e',_0x4928b9[0x0],'rc',_0x4928b9[0x9]][_0x73bb('0x7')]('')][_0x73bb('0x1e')](_0x73bb('0x1f'))&&(_0x49b827=!0x0);return[_0xd045a6,_0x49b827];}(_0x5e860c);}(window);if(!eval(_0x27a020[0x0]))return _0x27a020[0x1]?_0x53734d(_0x73bb('0x20')):!0x1;_0x362f6a[_0x73bb('0x18')]=function(_0x23adc4,_0x2a98c3){var _0x52f72a,_0x1d384f,_0x43330c,_0x52eb5e,_0x15da19,_0x245c31,_0x4894c8,_0x3b5fbc,_0x1f6660,_0x5b110d,_0xeac8a9,_0x51f64d;_0xeac8a9=_0x362f6a(_0x23adc4);if(!_0xeac8a9[_0x73bb('0x6')])return _0xeac8a9;_0x52f72a={'updateOnlyHover':!![],'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':'Finalizar\x20Compra','cartTotal':_0x73bb('0x21'),'emptyCart':_0x73bb('0x22'),'continueShopping':_0x73bb('0x23'),'shippingForm':'<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!![],'forceImageHTTPS':![],'skuName':function(_0x5208ca){return _0x5208ca[_0x73bb('0x24')]||_0x5208ca[_0x73bb('0x25')];},'callback':function(){},'callbackProductsList':function(){}};_0x1d384f=_0x362f6a[_0x73bb('0x26')](!![],{},_0x52f72a,_0x2a98c3);_0x43330c=_0x362f6a('');_0x5b110d=this;if(_0x1d384f[_0x73bb('0x27')]){var _0x599807=![];if(typeof window[_0x73bb('0x28')]===_0x73bb('0x3')){_0x53734d('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN');_0x362f6a[_0x73bb('0x29')]({'url':_0x73bb('0x2a'),'async':![],'dataType':_0x73bb('0x2b'),'error':function(){_0x53734d(_0x73bb('0x2c'));_0x599807=!![];}});}if(_0x599807)return _0x53734d(_0x73bb('0x2d'));}var _0xa5eaf;if(typeof window[_0x73bb('0x28')]==='object'&&typeof window['vtexjs'][_0x73bb('0x2e')]!==_0x73bb('0x3'))_0xa5eaf=window[_0x73bb('0x28')][_0x73bb('0x2e')];else if(typeof vtex===_0x73bb('0xf')&&typeof vtex[_0x73bb('0x2e')]===_0x73bb('0xf')&&typeof vtex[_0x73bb('0x2e')]['SDK']!==_0x73bb('0x3'))_0xa5eaf=new vtex[(_0x73bb('0x2e'))]['SDK']();else return _0x53734d(_0x73bb('0x2f'));_0x5b110d['cartContainer']=_0x73bb('0x30')+_0x73bb('0x31')+'<div\x20class=\x22qd_ddc_lightBoxClose\x22></div>'+_0x73bb('0x32')+_0x73bb('0x33')+_0x73bb('0x34')+_0x73bb('0x35')+'<div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22>'+'<div\x20class=\x22qd-ddc-shipping\x22></div>'+'<div\x20class=\x22qd-ddc-infoTotal\x22></div>'+_0x73bb('0x36')+_0x73bb('0x37')+_0x73bb('0x38');_0x245c31=function(_0x1ec854){var _0xfd4b4d=_0x362f6a(_0x1ec854);_0x1d384f['texts'][_0x73bb('0x39')]=_0x1d384f['texts']['cartTotal'][_0x73bb('0x1')](_0x73bb('0x3a'),_0x73bb('0x3b'));_0x1d384f[_0x73bb('0x3c')][_0x73bb('0x39')]=_0x1d384f[_0x73bb('0x3c')][_0x73bb('0x39')]['replace']('#items',_0x73bb('0x3d'));_0x1d384f[_0x73bb('0x3c')][_0x73bb('0x39')]=_0x1d384f[_0x73bb('0x3c')][_0x73bb('0x39')][_0x73bb('0x1')](_0x73bb('0x3e'),_0x73bb('0x3f'));_0x1d384f[_0x73bb('0x3c')]['cartTotal']=_0x1d384f[_0x73bb('0x3c')][_0x73bb('0x39')][_0x73bb('0x1')]('#total',_0x73bb('0x40'));_0xfd4b4d['find'](_0x73bb('0x41'))[_0x73bb('0x42')](_0x1d384f[_0x73bb('0x3c')]['linkCart']);_0xfd4b4d[_0x73bb('0x43')](_0x73bb('0x44'))[_0x73bb('0x42')](_0x1d384f['texts'][_0x73bb('0x45')]);_0xfd4b4d[_0x73bb('0x43')](_0x73bb('0x46'))[_0x73bb('0x42')](_0x1d384f[_0x73bb('0x3c')][_0x73bb('0x47')]);_0xfd4b4d['find'](_0x73bb('0x48'))['html'](_0x1d384f[_0x73bb('0x3c')][_0x73bb('0x39')]);_0xfd4b4d[_0x73bb('0x43')]('.qd-ddc-shipping')[_0x73bb('0x42')](_0x1d384f[_0x73bb('0x3c')][_0x73bb('0x49')]);_0xfd4b4d[_0x73bb('0x43')]('.qd-ddc-emptyCart\x20p')[_0x73bb('0x42')](_0x1d384f['texts'][_0x73bb('0x4a')]);return _0xfd4b4d;};_0x15da19=function(_0x22520e){_0x362f6a(this)[_0x73bb('0x4b')](_0x22520e);_0x22520e[_0x73bb('0x43')](_0x73bb('0x4c'))[_0x73bb('0x4d')](_0x362f6a(_0x73bb('0x4e')))['on'](_0x73bb('0x4f'),function(){_0xeac8a9['removeClass'](_0x73bb('0x50'));_0x362f6a(document[_0x73bb('0x51')])['removeClass'](_0x73bb('0x52'));});_0x362f6a(document)[_0x73bb('0x53')](_0x73bb('0x54'))['on'](_0x73bb('0x54'),function(_0xeabcdb){if(_0xeabcdb['keyCode']==0x1b){_0xeac8a9[_0x73bb('0x55')]('qd-bb-lightBoxProdAdd');_0x362f6a(document[_0x73bb('0x51')])[_0x73bb('0x55')]('qd-bb-lightBoxBodyProdAdd');}});var _0x1cad73=_0x22520e[_0x73bb('0x43')](_0x73bb('0x56'));_0x22520e[_0x73bb('0x43')](_0x73bb('0x57'))['on'](_0x73bb('0x58'),function(){_0x5b110d['scrollCart']('-',undefined,undefined,_0x1cad73);return![];});_0x22520e[_0x73bb('0x43')](_0x73bb('0x59'))['on'](_0x73bb('0x5a'),function(){_0x5b110d[_0x73bb('0x5b')](undefined,undefined,undefined,_0x1cad73);return![];});var _0x49883a=_0x22520e[_0x73bb('0x43')](_0x73bb('0x5c'));_0x22520e[_0x73bb('0x43')](_0x73bb('0x5d'))['val']('')['on']('keyup.qd_ddc_cep',function(_0xf034c9){_0x5b110d[_0x73bb('0x5e')](_0x362f6a(this));if(_0xf034c9[_0x73bb('0x5f')]==0xd)_0x22520e[_0x73bb('0x43')](_0x73bb('0x60'))[_0x73bb('0x61')]();});_0x22520e[_0x73bb('0x43')](_0x73bb('0x62'))[_0x73bb('0x61')](function(_0x15d9d4){_0x15d9d4['preventDefault']();_0x49883a[_0x73bb('0x63')]();});_0x22520e[_0x73bb('0x43')](_0x73bb('0x64'))['click'](function(_0x3da0cc){_0x3da0cc[_0x73bb('0x65')]();_0x49883a[_0x73bb('0x66')]();});_0x362f6a(document)[_0x73bb('0x53')](_0x73bb('0x67'))['on']('click._QD_DDC_closeShipping',function(_0x449bd3){if(_0x362f6a(_0x449bd3[_0x73bb('0x68')])[_0x73bb('0x69')](_0x22520e[_0x73bb('0x43')](_0x73bb('0x6a')))['length'])return;_0x49883a[_0x73bb('0x66')]();});_0x22520e[_0x73bb('0x43')](_0x73bb('0x6b'))[_0x73bb('0x61')](function(_0x483122){_0x483122[_0x73bb('0x65')]();_0x5b110d[_0x73bb('0x6c')](_0x22520e[_0x73bb('0x43')](_0x73bb('0x6d')));});if(_0x1d384f[_0x73bb('0x6e')]){var _0x20ca82=0x0;_0x362f6a(this)['on'](_0x73bb('0x6f'),function(){var _0x569558=function(){if(!window['_QuatroDigital_DropDown'][_0x73bb('0x17')])return;_0x5b110d[_0x73bb('0x70')]();window[_0x73bb('0x16')][_0x73bb('0x17')]=![];_0x362f6a['fn']['simpleCart'](!![]);_0x5b110d['cartIsEmpty']();};_0x20ca82=setInterval(function(){_0x569558();},0x258);_0x569558();});_0x362f6a(this)['on'](_0x73bb('0x71'),function(){clearInterval(_0x20ca82);});}};_0x4894c8=_0x245c31(this[_0x73bb('0x72')]);_0x3b5fbc=0x0;_0xeac8a9[_0x73bb('0x73')](function(){if(_0x3b5fbc>0x0)_0x15da19[_0x73bb('0x74')](this,_0x4894c8[_0x73bb('0x75')]());else _0x15da19[_0x73bb('0x74')](this,_0x4894c8);_0x3b5fbc++;});window[_0x73bb('0x8')][_0x73bb('0x9')][_0x73bb('0x4d')](function(){_0x362f6a(_0x73bb('0x76'))[_0x73bb('0x42')](window[_0x73bb('0x8')]['total']||'--');_0x362f6a(_0x73bb('0x77'))[_0x73bb('0x42')](window[_0x73bb('0x8')][_0x73bb('0x78')]||'0');_0x362f6a(_0x73bb('0x79'))[_0x73bb('0x42')](window[_0x73bb('0x8')][_0x73bb('0x7a')]||'--');_0x362f6a('.qd-ddc-infoAllTotal')[_0x73bb('0x42')](window[_0x73bb('0x8')][_0x73bb('0x7b')]||'--');});_0x1f6660=function(_0x441f90){_0x53734d('Atenção,\x20você\x20esta\x20utilizando\x20um\x20método\x20descontinuado');};_0x51f64d=function(_0x2fa298,_0x5137ea){if(typeof _0x2fa298[_0x73bb('0x7c')]===_0x73bb('0x3'))return _0x53734d('Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição');_0x5b110d['renderProductsList'][_0x73bb('0x74')](this,_0x5137ea);};_0x5b110d[_0x73bb('0x70')]=function(_0x158e03,_0xfd9466){var _0x24fc4e;if(typeof _0xfd9466!='undefined')window['_QuatroDigital_DropDown'][_0x73bb('0x7d')]=_0xfd9466;else if(window['_QuatroDigital_DropDown'][_0x73bb('0x7d')])_0xfd9466=window['_QuatroDigital_DropDown'][_0x73bb('0x7d')];setTimeout(function(){window[_0x73bb('0x16')][_0x73bb('0x7d')]=undefined;},_0x1d384f[_0x73bb('0x7e')]);_0x362f6a(_0x73bb('0x7f'))[_0x73bb('0x55')](_0x73bb('0x80'));if(_0x1d384f[_0x73bb('0x27')]){_0x24fc4e=function(_0x3aeae2){window['_QuatroDigital_DropDown'][_0x73bb('0x81')]=_0x3aeae2;_0x51f64d(_0x3aeae2,_0xfd9466);if(typeof window[_0x73bb('0x82')]!==_0x73bb('0x3')&&typeof window[_0x73bb('0x82')]['exec']===_0x73bb('0xb'))window[_0x73bb('0x82')][_0x73bb('0x83')][_0x73bb('0x74')](this);_0x362f6a(_0x73bb('0x7f'))[_0x73bb('0x84')](_0x73bb('0x80'));};if(typeof window[_0x73bb('0x16')][_0x73bb('0x81')]!=='undefined'){_0x24fc4e(window[_0x73bb('0x16')][_0x73bb('0x81')]);if(typeof _0x158e03===_0x73bb('0xb'))_0x158e03(window[_0x73bb('0x16')]['getOrderForm']);return;}_0x362f6a[_0x73bb('0x85')](['items',_0x73bb('0x86'),_0x73bb('0x87')],{'done':function(_0xc79fb){_0x24fc4e[_0x73bb('0x74')](this,_0xc79fb);if(typeof _0x158e03==='function')_0x158e03(_0xc79fb);},'fail':function(_0x597034){_0x53734d(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0x597034]);}});}else{alert(_0x73bb('0x88'));}};_0x5b110d[_0x73bb('0x89')]=function(){var _0x10cd80=_0x362f6a(_0x73bb('0x7f'));if(_0x10cd80[_0x73bb('0x43')]('.qd-ddc-prodRow')[_0x73bb('0x6')])_0x10cd80[_0x73bb('0x55')]('qd-ddc-noItems');else _0x10cd80[_0x73bb('0x84')](_0x73bb('0x8a'));};_0x5b110d[_0x73bb('0x8b')]=function(_0x46e1e){var _0x13fbea=_0x362f6a(_0x73bb('0x8c'));var _0x1fcdb0=_0x73bb('0x8d')+_0x73bb('0x8e')+'<div\x20class=\x22qd-ddc-prodImgWrapper\x22>'+_0x73bb('0x8f')+_0x73bb('0x90')+'</div>'+'</div>'+'<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div>'+_0x73bb('0x91')+'<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22>'+_0x73bb('0x92')+_0x73bb('0x93')+_0x73bb('0x94')+_0x73bb('0x95')+'<span\x20class=\x22qd-ddc-qttLoading\x22></span>'+'</div>'+_0x73bb('0x96')+_0x73bb('0x97')+'<div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22>'+_0x73bb('0x98')+_0x73bb('0x99')+'</div>'+_0x73bb('0x96')+'</div>';_0x13fbea[_0x73bb('0x9a')]();_0x13fbea[_0x73bb('0x73')](function(){var _0x558ec1=_0x362f6a(this);var _0x33ea26,_0x41be37,_0x134a7a,_0x15ab0d;var _0x1a176d=_0x362f6a('');var _0xbb0bfe;for(var _0x5accdf in window[_0x73bb('0x16')]['getOrderForm'][_0x73bb('0x7c')]){if(typeof window[_0x73bb('0x16')][_0x73bb('0x81')][_0x73bb('0x7c')][_0x5accdf]!=='object')continue;_0x134a7a=window[_0x73bb('0x16')]['getOrderForm'][_0x73bb('0x7c')][_0x5accdf];_0xbb0bfe=_0x134a7a['productCategoryIds'][_0x73bb('0x1')](/^\/|\/$/g,'')[_0x73bb('0x5')]('/');_0x41be37=_0x362f6a(_0x1fcdb0);_0x41be37[_0x73bb('0x9b')]({'data-sku':_0x134a7a['id'],'data-sku-index':_0x5accdf,'data-qd-departament':_0xbb0bfe[0x0],'data-qd-category':_0xbb0bfe[_0xbb0bfe['length']-0x1]});_0x41be37[_0x73bb('0x84')]('qd-ddc-'+_0x134a7a['availability']);_0x41be37[_0x73bb('0x43')](_0x73bb('0x9c'))[_0x73bb('0x4b')](_0x1d384f[_0x73bb('0x24')](_0x134a7a));_0x41be37['find'](_0x73bb('0x9d'))['append'](isNaN(_0x134a7a[_0x73bb('0x9e')])?_0x134a7a[_0x73bb('0x9e')]:_0x134a7a['sellingPrice']==0x0?_0x73bb('0x9f'):(_0x362f6a('meta[name=currency]')[_0x73bb('0x9b')](_0x73bb('0xa0'))||'R$')+'\x20'+qd_number_format(_0x134a7a['sellingPrice']/0x64,0x2,',','.'));_0x41be37[_0x73bb('0x43')]('.qd-ddc-quantity')[_0x73bb('0x9b')]({'data-sku':_0x134a7a['id'],'data-sku-index':_0x5accdf})[_0x73bb('0xa1')](_0x134a7a[_0x73bb('0xa2')]);_0x41be37[_0x73bb('0x43')](_0x73bb('0xa3'))['attr']({'data-sku':_0x134a7a['id'],'data-sku-index':_0x5accdf});_0x5b110d[_0x73bb('0xa4')](_0x134a7a['id'],_0x41be37[_0x73bb('0x43')]('.qd-ddc-image'),_0x134a7a[_0x73bb('0xa5')]);_0x41be37[_0x73bb('0x43')](_0x73bb('0xa6'))[_0x73bb('0x9b')]({'data-sku':_0x134a7a['id'],'data-sku-index':_0x5accdf});_0x41be37['appendTo'](_0x558ec1);_0x1a176d=_0x1a176d[_0x73bb('0x4d')](_0x41be37);}try{var _0x59bf19=_0x558ec1[_0x73bb('0x0')]('.qd-ddc-wrapper')[_0x73bb('0x43')](_0x73bb('0xa7'));if(_0x59bf19['length']&&_0x59bf19[_0x73bb('0xa1')]()==''&&window[_0x73bb('0x16')]['getOrderForm'][_0x73bb('0x87')][_0x73bb('0xa8')])_0x59bf19['val'](window[_0x73bb('0x16')]['getOrderForm'][_0x73bb('0x87')][_0x73bb('0xa8')]['postalCode']);}catch(_0x2c320a){_0x53734d(_0x73bb('0xa9')+_0x2c320a[_0x73bb('0xaa')],_0x73bb('0x14'));}_0x5b110d[_0x73bb('0xab')](_0x558ec1);_0x5b110d['cartIsEmpty']();if(_0x46e1e&&_0x46e1e[_0x73bb('0xac')]){(function(){_0x15ab0d=_0x1a176d[_0x73bb('0xad')](_0x73bb('0xae')+_0x46e1e[_0x73bb('0xac')]+'\x27]');if(!_0x15ab0d[_0x73bb('0x6')])return;_0x33ea26=0x0;_0x1a176d['each'](function(){var _0x2c33f2=_0x362f6a(this);if(_0x2c33f2['is'](_0x15ab0d))return![];_0x33ea26+=_0x2c33f2['outerHeight']();});_0x5b110d[_0x73bb('0x5b')](undefined,undefined,_0x33ea26,_0x558ec1['add'](_0x558ec1[_0x73bb('0xaf')]()));_0x1a176d['removeClass'](_0x73bb('0xb0'));(function(_0x1af641){_0x1af641[_0x73bb('0x84')](_0x73bb('0xb1'));_0x1af641[_0x73bb('0x84')](_0x73bb('0xb0'));setTimeout(function(){_0x1af641[_0x73bb('0x55')](_0x73bb('0xb1'));},_0x1d384f[_0x73bb('0x7e')]);}(_0x15ab0d));_0x362f6a(document['body'])['addClass'](_0x73bb('0xb2'));setTimeout(function(){_0x362f6a(document[_0x73bb('0x51')])['removeClass'](_0x73bb('0xb2'));},_0x1d384f[_0x73bb('0x7e')]);}());}});(function(){if(_QuatroDigital_DropDown['getOrderForm'][_0x73bb('0x7c')]['length']){_0x362f6a(_0x73bb('0x51'))['removeClass']('qd-ddc-cart-empty')[_0x73bb('0x84')](_0x73bb('0xb3'));setTimeout(function(){_0x362f6a(_0x73bb('0x51'))['removeClass']('qd-ddc-product-add-time');},_0x1d384f['timeRemoveNewItemClass']);}else _0x362f6a(_0x73bb('0x51'))['removeClass'](_0x73bb('0xb4'))[_0x73bb('0x84')](_0x73bb('0xb5'));}());if(typeof _0x1d384f[_0x73bb('0xb6')]===_0x73bb('0xb'))_0x1d384f[_0x73bb('0xb6')][_0x73bb('0x74')](this);else _0x53734d(_0x73bb('0xb7'));};_0x5b110d[_0x73bb('0xa4')]=function(_0x574190,_0x28b918,_0x566935){var _0x337c48=!![];function _0x58f120(){if(_0x1d384f[_0x73bb('0xb8')]&&typeof _0x566935==_0x73bb('0xb9'))_0x566935=_0x566935['replace']('http',_0x73bb('0xba'));_0x28b918[_0x73bb('0x55')](_0x73bb('0xbb'))[_0x73bb('0xbc')](function(){_0x362f6a(this)[_0x73bb('0x84')](_0x73bb('0xbb'));})[_0x73bb('0x9b')](_0x73bb('0xbd'),_0x566935);};if(_0x566935)_0x58f120();else if(!isNaN(_0x574190)){alert(_0x73bb('0xbe'));}else _0x53734d(_0x73bb('0xbf'),_0x73bb('0x12'));};_0x5b110d['actionButtons']=function(_0x17dc5c){var _0x54a674,_0x4db559,_0x54fa09,_0x31edd5;_0x54a674=function(_0x4330e4,_0x27de19){var _0x17c900,_0x27dfbc,_0x2f91ec,_0x5d4740,_0xaf321a;_0x2f91ec=_0x362f6a(_0x4330e4);_0x17c900=_0x2f91ec[_0x73bb('0x9b')](_0x73bb('0xc0'));_0xaf321a=_0x2f91ec['attr'](_0x73bb('0xc1'));if(!_0x17c900)return;_0x27dfbc=parseInt(_0x2f91ec[_0x73bb('0xa1')]())||0x1;_0x5b110d[_0x73bb('0xc2')]([_0x17c900,_0xaf321a],_0x27dfbc,_0x27dfbc+0x1,function(_0x3131a3){_0x2f91ec['val'](_0x3131a3);if(typeof _0x27de19==='function')_0x27de19();});};_0x54fa09=function(_0xdfea2f,_0x54f311){var _0x4d94d0,_0x190a7f,_0x27ee58,_0x248606,_0x2bc1bc;_0x27ee58=_0x362f6a(_0xdfea2f);_0x4d94d0=_0x27ee58[_0x73bb('0x9b')](_0x73bb('0xc0'));_0x2bc1bc=_0x27ee58[_0x73bb('0x9b')](_0x73bb('0xc1'));if(!_0x4d94d0)return;_0x190a7f=parseInt(_0x27ee58[_0x73bb('0xa1')]())||0x2;_0x248606=_0x5b110d[_0x73bb('0xc2')]([_0x4d94d0,_0x2bc1bc],_0x190a7f,_0x190a7f-0x1,function(_0x3357c5){_0x27ee58[_0x73bb('0xa1')](_0x3357c5);if(typeof _0x54f311===_0x73bb('0xb'))_0x54f311();});};_0x31edd5=function(_0x6ae891,_0x362ada){var _0xb29f24,_0x11c726,_0x1e3091,_0x1f3f97,_0x397e54;_0x1e3091=_0x362f6a(_0x6ae891);_0xb29f24=_0x1e3091[_0x73bb('0x9b')]('data-sku');_0x397e54=_0x1e3091[_0x73bb('0x9b')](_0x73bb('0xc1'));if(!_0xb29f24)return;_0x11c726=parseInt(_0x1e3091[_0x73bb('0xa1')]())||0x1;_0x1f3f97=_0x5b110d[_0x73bb('0xc2')]([_0xb29f24,_0x397e54],0x1,_0x11c726,function(_0x3c55c0){_0x1e3091[_0x73bb('0xa1')](_0x3c55c0);if(typeof _0x362ada===_0x73bb('0xb'))_0x362ada();});};_0x4db559=_0x17dc5c['find'](_0x73bb('0xc3'));_0x4db559[_0x73bb('0x84')](_0x73bb('0xc4'))[_0x73bb('0x73')](function(){var _0x306437=_0x362f6a(this);_0x306437[_0x73bb('0x43')](_0x73bb('0xc5'))['on']('click.qd_ddc_more',function(_0x59ca25){_0x59ca25[_0x73bb('0x65')]();_0x4db559['addClass']('qd-loading');_0x54a674(_0x306437[_0x73bb('0x43')](_0x73bb('0xc6')),function(){_0x4db559[_0x73bb('0x55')](_0x73bb('0xc7'));});});_0x306437[_0x73bb('0x43')](_0x73bb('0xc8'))['on'](_0x73bb('0xc9'),function(_0x2efb15){_0x2efb15['preventDefault']();_0x4db559['addClass'](_0x73bb('0xc7'));_0x54fa09(_0x306437['find']('.qd-ddc-quantity'),function(){_0x4db559['removeClass'](_0x73bb('0xc7'));});});_0x306437[_0x73bb('0x43')](_0x73bb('0xc6'))['on'](_0x73bb('0xca'),function(){_0x4db559[_0x73bb('0x84')]('qd-loading');_0x31edd5(this,function(){_0x4db559[_0x73bb('0x55')](_0x73bb('0xc7'));});});_0x306437['find'](_0x73bb('0xc6'))['on'](_0x73bb('0xcb'),function(_0x2b42b3){if(_0x2b42b3[_0x73bb('0x5f')]!=0xd)return;_0x4db559[_0x73bb('0x84')]('qd-loading');_0x31edd5(this,function(){_0x4db559[_0x73bb('0x55')]('qd-loading');});});});_0x17dc5c[_0x73bb('0x43')]('.qd-ddc-prodRow')['each'](function(){var _0x365e20=_0x362f6a(this);_0x365e20[_0x73bb('0x43')]('.qd-ddc-remove')['on'](_0x73bb('0xcc'),function(){var _0x1c3370;_0x365e20[_0x73bb('0x84')](_0x73bb('0xc7'));_0x5b110d[_0x73bb('0xcd')](_0x362f6a(this),function(_0x33f727){if(_0x33f727)_0x365e20[_0x73bb('0xce')](!![])[_0x73bb('0xcf')](function(){_0x365e20[_0x73bb('0xd0')]();_0x5b110d[_0x73bb('0x89')]();});else _0x365e20[_0x73bb('0x55')]('qd-loading');});return![];});});};_0x5b110d['formatCepField']=function(_0x33aa4a){var _0x38946d=_0x33aa4a['val']();_0x38946d=_0x38946d[_0x73bb('0x1')](/[^0-9\-]/g,'');_0x38946d=_0x38946d[_0x73bb('0x1')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x73bb('0xd1'));_0x38946d=_0x38946d[_0x73bb('0x1')](/(.{9}).*/g,'$1');_0x33aa4a[_0x73bb('0xa1')](_0x38946d);};_0x5b110d[_0x73bb('0x6c')]=function(_0x28b694){var _0x466815=_0x28b694[_0x73bb('0xa1')]();if(_0x466815[_0x73bb('0x6')]>=0x9){if(_0x28b694['data'](_0x73bb('0xd2'))!=_0x466815){_0xa5eaf['calculateShipping']({'postalCode':_0x466815,'country':'BRA'})[_0x73bb('0xd3')](function(_0x2e2c14){_0x28b694[_0x73bb('0x69')](_0x73bb('0xd4'))[_0x73bb('0x43')](_0x73bb('0xd5'))['remove']();window['_QuatroDigital_DropDown'][_0x73bb('0x81')]=_0x2e2c14;_0x5b110d['getCartInfoByUrl']();var _0xe9aa3c=_0x2e2c14[_0x73bb('0x87')][_0x73bb('0xd6')][0x0][_0x73bb('0xd7')];var _0x7927a0=_0x362f6a(_0x73bb('0xd8'));for(var _0x37bb45=0x0;_0x37bb45<_0xe9aa3c[_0x73bb('0x6')];_0x37bb45++){var _0x427106=_0xe9aa3c[_0x37bb45];var _0x57eebd=_0x427106['shippingEstimate']>0x1?_0x427106[_0x73bb('0xd9')][_0x73bb('0x1')]('bd',_0x73bb('0xda')):_0x427106[_0x73bb('0xd9')][_0x73bb('0x1')]('bd',_0x73bb('0xdb'));var _0x2b1056=_0x362f6a(_0x73bb('0xdc'));_0x2b1056[_0x73bb('0x4b')]('<td>\x20R$\x20'+qd_number_format(_0x427106[_0x73bb('0xdd')]/0x64,0x2,',','.')+_0x73bb('0xde')+_0x427106[_0x73bb('0x25')]+',\x20entrega\x20em\x20'+_0x57eebd+_0x73bb('0xdf')+_0x466815+_0x73bb('0xe0'));_0x2b1056[_0x73bb('0xe1')](_0x7927a0[_0x73bb('0x43')](_0x73bb('0xe2')));}_0x7927a0[_0x73bb('0xe3')](_0x28b694['closest']('.qd-ddc-cep-tooltip-text')['find'](_0x73bb('0x64')));})[_0x73bb('0xe4')](function(_0x59739b){_0x53734d(['Não\x20foi\x20possível\x20calcular\x20o\x20frete',_0x59739b]);updateCartData();});}_0x28b694[_0x73bb('0xe5')](_0x73bb('0xd2'),_0x466815);}};_0x5b110d[_0x73bb('0xc2')]=function(_0x56663b,_0x347371,_0x51c354,_0xb8bc90){var _0x2f2640=_0x51c354||0x1;if(_0x2f2640<0x1)return _0x347371;if(_0x1d384f[_0x73bb('0x27')]){if(typeof window[_0x73bb('0x16')]['getOrderForm'][_0x73bb('0x7c')][_0x56663b[0x1]]===_0x73bb('0x3')){_0x53734d(_0x73bb('0xe6')+_0x56663b[0x1]+']');return _0x347371;}window[_0x73bb('0x16')][_0x73bb('0x81')][_0x73bb('0x7c')][_0x56663b[0x1]]['quantity']=_0x2f2640;window[_0x73bb('0x16')][_0x73bb('0x81')][_0x73bb('0x7c')][_0x56663b[0x1]][_0x73bb('0xe7')]=_0x56663b[0x1];_0xa5eaf[_0x73bb('0xe8')]([window['_QuatroDigital_DropDown']['getOrderForm']['items'][_0x56663b[0x1]]],['items','totalizers',_0x73bb('0x87')])[_0x73bb('0xd3')](function(_0x500fea){window[_0x73bb('0x16')][_0x73bb('0x81')]=_0x500fea;_0x1bdc27(!![]);})[_0x73bb('0xe4')](function(_0x52f285){_0x53734d(['Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho',_0x52f285]);_0x1bdc27();});}else{_0x53734d(_0x73bb('0xe9'));}function _0x1bdc27(_0x55da7d){_0x55da7d=typeof _0x55da7d!==_0x73bb('0xea')?![]:_0x55da7d;_0x5b110d[_0x73bb('0x70')]();window[_0x73bb('0x16')][_0x73bb('0x17')]=![];_0x5b110d['cartIsEmpty']();if(typeof window[_0x73bb('0x82')]!=='undefined'&&typeof window[_0x73bb('0x82')][_0x73bb('0x83')]===_0x73bb('0xb'))window[_0x73bb('0x82')]['exec'][_0x73bb('0x74')](this);if(typeof adminCart===_0x73bb('0xb'))adminCart();_0x362f6a['fn'][_0x73bb('0xeb')](!![],undefined,_0x55da7d);if(typeof _0xb8bc90==='function')_0xb8bc90(_0x347371);};};_0x5b110d[_0x73bb('0xcd')]=function(_0x351b2d,_0x195c98){var _0x2c604a=![];var _0x49a126=_0x362f6a(_0x351b2d);var _0x1e9285=_0x49a126[_0x73bb('0x9b')](_0x73bb('0xc1'));if(_0x1d384f[_0x73bb('0x27')]){if(typeof window[_0x73bb('0x16')][_0x73bb('0x81')]['items'][_0x1e9285]===_0x73bb('0x3')){_0x53734d('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x1e9285+']');return _0x2c604a;}window[_0x73bb('0x16')][_0x73bb('0x81')][_0x73bb('0x7c')][_0x1e9285][_0x73bb('0xe7')]=_0x1e9285;_0xa5eaf[_0x73bb('0xec')]([window[_0x73bb('0x16')]['getOrderForm']['items'][_0x1e9285]],['items',_0x73bb('0x86'),_0x73bb('0x87')])['done'](function(_0x1b01c3){_0x2c604a=!![];window['_QuatroDigital_DropDown']['getOrderForm']=_0x1b01c3;_0x51f64d(_0x1b01c3);_0x31b44(!![]);})[_0x73bb('0xe4')](function(_0x2f181b){_0x53734d([_0x73bb('0xed'),_0x2f181b]);_0x31b44();});}else{alert(_0x73bb('0xee'));}function _0x31b44(_0x57bb0a){_0x57bb0a=typeof _0x57bb0a!==_0x73bb('0xea')?![]:_0x57bb0a;if(typeof window['_QuatroDigital_AmountProduct']!=='undefined'&&typeof window[_0x73bb('0x82')]['exec']===_0x73bb('0xb'))window['_QuatroDigital_AmountProduct'][_0x73bb('0x83')][_0x73bb('0x74')](this);if(typeof adminCart===_0x73bb('0xb'))adminCart();_0x362f6a['fn']['simpleCart'](!![],undefined,_0x57bb0a);if(typeof _0x195c98===_0x73bb('0xb'))_0x195c98(_0x2c604a);};};_0x5b110d['scrollCart']=function(_0x436478,_0x266eeb,_0x53d49c,_0x34436f){var _0x5af65e=_0x34436f||_0x362f6a(_0x73bb('0xef'));var _0x4b6296=_0x436478||'+';var _0x2df05f=_0x266eeb||_0x5af65e['height']()*0.9;_0x5af65e[_0x73bb('0xce')](!![],!![])[_0x73bb('0xf0')]({'scrollTop':isNaN(_0x53d49c)?_0x4b6296+'='+_0x2df05f+'px':_0x53d49c});};if(!_0x1d384f[_0x73bb('0x6e')]){_0x5b110d[_0x73bb('0x70')]();_0x362f6a['fn'][_0x73bb('0xeb')](!![]);}_0x362f6a(window)['on'](_0x73bb('0xf1'),function(){try{window[_0x73bb('0x16')][_0x73bb('0x81')]=undefined;_0x5b110d[_0x73bb('0x70')]();}catch(_0x2777c6){_0x53734d('Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20'+_0x2777c6[_0x73bb('0xaa')],_0x73bb('0xf2'));}});if(typeof _0x1d384f[_0x73bb('0x9')]===_0x73bb('0xb'))_0x1d384f['callback']['call'](this);else _0x53734d(_0x73bb('0xf3'));};_0x362f6a['fn'][_0x73bb('0x18')]=function(_0x3d83e4){var _0x333d42;_0x333d42=_0x362f6a(this);_0x333d42['fn']=new _0x362f6a[(_0x73bb('0x18'))](this,_0x3d83e4);return _0x333d42;};}catch(_0x41d842){if(typeof console!=='undefined'&&typeof console['error']===_0x73bb('0xb'))console[_0x73bb('0xc')](_0x73bb('0xd'),_0x41d842);}}(this));(function(_0x42aede){'use strict';try{var _0x49622e=jQuery;var _0x3b3eb0='Quatro\x20Digital\x20-\x20Box\x20Amount\x20Cart';var _0x4e0189=function(_0x2d49c9,_0xb6bb59){if('object'===typeof console&&_0x73bb('0x3')!==typeof console[_0x73bb('0xc')]&&_0x73bb('0x3')!==typeof console['info']&&_0x73bb('0x3')!==typeof console[_0x73bb('0x11')]){var _0x50ab4e;_0x73bb('0xf')===typeof _0x2d49c9?(_0x2d49c9[_0x73bb('0xf4')]('['+_0x3b3eb0+']\x0a'),_0x50ab4e=_0x2d49c9):_0x50ab4e=['['+_0x3b3eb0+']\x0a'+_0x2d49c9];if(_0x73bb('0x3')===typeof _0xb6bb59||_0x73bb('0x12')!==_0xb6bb59[_0x73bb('0x13')]()&&_0x73bb('0x14')!==_0xb6bb59[_0x73bb('0x13')]())if('undefined'!==typeof _0xb6bb59&&'info'===_0xb6bb59['toLowerCase']())try{console[_0x73bb('0x10')][_0x73bb('0x15')](console,_0x50ab4e);}catch(_0x5cf4c5){try{console[_0x73bb('0x10')](_0x50ab4e[_0x73bb('0x7')]('\x0a'));}catch(_0x58c4cf){}}else try{console[_0x73bb('0xc')][_0x73bb('0x15')](console,_0x50ab4e);}catch(_0x42dc10){try{console[_0x73bb('0xc')](_0x50ab4e['join']('\x0a'));}catch(_0xaff66b){}}else try{console[_0x73bb('0x11')][_0x73bb('0x15')](console,_0x50ab4e);}catch(_0x499b28){try{console[_0x73bb('0x11')](_0x50ab4e['join']('\x0a'));}catch(_0x2a841f){}}}};window[_0x73bb('0x82')]=window[_0x73bb('0x82')]||{};window['_QuatroDigital_AmountProduct'][_0x73bb('0x7c')]={};window['_QuatroDigital_AmountProduct'][_0x73bb('0xf5')]=![];window[_0x73bb('0x82')]['buyButtonClicked']=![];window[_0x73bb('0x82')]['quickViewUpdate']=![];var _0x4eac9d=_0x73bb('0xf6');var _0x4630b3=function(){var _0x296219,_0x18f958,_0x3651c6,_0x45870e;_0x45870e=_0x16e19d();if(window[_0x73bb('0x82')][_0x73bb('0xf5')]){_0x49622e(_0x73bb('0xf7'))[_0x73bb('0xd0')]();_0x49622e(_0x73bb('0xf8'))[_0x73bb('0x55')](_0x73bb('0xf9'));}for(var _0x44c735 in window[_0x73bb('0x82')][_0x73bb('0x7c')]){_0x296219=window[_0x73bb('0x82')][_0x73bb('0x7c')][_0x44c735];if(typeof _0x296219!==_0x73bb('0xf'))return;_0x3651c6=_0x49622e('input.qd-productId[value='+_0x296219[_0x73bb('0xfa')]+']')['getParent']('li');if(!window['_QuatroDigital_AmountProduct'][_0x73bb('0xf5')]&&_0x3651c6['find'](_0x73bb('0xf7'))[_0x73bb('0x6')])continue;_0x18f958=_0x49622e(_0x4eac9d);_0x18f958[_0x73bb('0x43')](_0x73bb('0xfb'))['html'](_0x296219[_0x73bb('0x78')]);var _0x36f514=_0x3651c6[_0x73bb('0x43')](_0x73bb('0xfc'));if(_0x36f514[_0x73bb('0x6')])_0x36f514['prepend'](_0x18f958)[_0x73bb('0x84')](_0x73bb('0xf9'));else _0x3651c6[_0x73bb('0xfd')](_0x18f958);}if(_0x45870e)window['_QuatroDigital_AmountProduct'][_0x73bb('0xf5')]=![];};var _0x16e19d=function(){if(!window[_0x73bb('0x82')][_0x73bb('0xf5')])return;var _0x4e151e=![],_0x511701={};window[_0x73bb('0x82')][_0x73bb('0x7c')]={};for(var _0x271b52 in window[_0x73bb('0x16')][_0x73bb('0x81')]['items']){if(typeof window[_0x73bb('0x16')][_0x73bb('0x81')][_0x73bb('0x7c')][_0x271b52]!==_0x73bb('0xf'))continue;var _0x2d8bb0=window[_0x73bb('0x16')][_0x73bb('0x81')][_0x73bb('0x7c')][_0x271b52];if(typeof _0x2d8bb0[_0x73bb('0xfe')]==='undefined'||_0x2d8bb0[_0x73bb('0xfe')]===null||_0x2d8bb0[_0x73bb('0xfe')]==='')continue;window[_0x73bb('0x82')][_0x73bb('0x7c')]['prod_'+_0x2d8bb0[_0x73bb('0xfe')]]=window[_0x73bb('0x82')][_0x73bb('0x7c')][_0x73bb('0xff')+_0x2d8bb0[_0x73bb('0xfe')]]||{};window[_0x73bb('0x82')][_0x73bb('0x7c')]['prod_'+_0x2d8bb0[_0x73bb('0xfe')]][_0x73bb('0xfa')]=_0x2d8bb0['productId'];if(!_0x511701[_0x73bb('0xff')+_0x2d8bb0['productId']])window[_0x73bb('0x82')]['items'][_0x73bb('0xff')+_0x2d8bb0[_0x73bb('0xfe')]][_0x73bb('0x78')]=0x0;window[_0x73bb('0x82')][_0x73bb('0x7c')][_0x73bb('0xff')+_0x2d8bb0[_0x73bb('0xfe')]][_0x73bb('0x78')]=window[_0x73bb('0x82')][_0x73bb('0x7c')][_0x73bb('0xff')+_0x2d8bb0[_0x73bb('0xfe')]][_0x73bb('0x78')]+_0x2d8bb0[_0x73bb('0xa2')];_0x4e151e=!![];_0x511701['prod_'+_0x2d8bb0[_0x73bb('0xfe')]]=!![];}return _0x4e151e;};window[_0x73bb('0x82')][_0x73bb('0x83')]=function(){window[_0x73bb('0x82')][_0x73bb('0xf5')]=!![];_0x4630b3[_0x73bb('0x74')](this);};_0x49622e(document)[_0x73bb('0x100')](function(){_0x4630b3[_0x73bb('0x74')](this);});}catch(_0x4e6b93){if(typeof console!==_0x73bb('0x3')&&typeof console['error']===_0x73bb('0xb'))console[_0x73bb('0xc')]('Oooops!\x20',_0x4e6b93);}}(this));(function(){'use strict';try{var _0x2a1f78=jQuery,_0x3d20c6;var _0x536c7b=_0x73bb('0x101');var _0x31bd61=function(_0x495282,_0xa07997){if(_0x73bb('0xf')===typeof console&&'undefined'!==typeof console['error']&&_0x73bb('0x3')!==typeof console[_0x73bb('0x10')]&&_0x73bb('0x3')!==typeof console[_0x73bb('0x11')]){var _0x296f24;_0x73bb('0xf')===typeof _0x495282?(_0x495282[_0x73bb('0xf4')]('['+_0x536c7b+']\x0a'),_0x296f24=_0x495282):_0x296f24=['['+_0x536c7b+']\x0a'+_0x495282];if(_0x73bb('0x3')===typeof _0xa07997||'alerta'!==_0xa07997[_0x73bb('0x13')]()&&_0x73bb('0x14')!==_0xa07997['toLowerCase']())if(_0x73bb('0x3')!==typeof _0xa07997&&_0x73bb('0x10')===_0xa07997['toLowerCase']())try{console[_0x73bb('0x10')][_0x73bb('0x15')](console,_0x296f24);}catch(_0x4f9805){try{console[_0x73bb('0x10')](_0x296f24[_0x73bb('0x7')]('\x0a'));}catch(_0x2a1faf){}}else try{console[_0x73bb('0xc')][_0x73bb('0x15')](console,_0x296f24);}catch(_0x40f03f){try{console[_0x73bb('0xc')](_0x296f24[_0x73bb('0x7')]('\x0a'));}catch(_0x229134){}}else try{console[_0x73bb('0x11')]['apply'](console,_0x296f24);}catch(_0x313a4b){try{console[_0x73bb('0x11')](_0x296f24[_0x73bb('0x7')]('\x0a'));}catch(_0x1d68e7){}}}};var _0x4e5a40={'selector':_0x73bb('0x102'),'dropDown':{},'buyButton':{}};_0x2a1f78[_0x73bb('0x103')]=function(_0x34b97f){var _0x4dfe66,_0x3f3c96={};_0x3d20c6=_0x2a1f78[_0x73bb('0x26')](!![],{},_0x4e5a40,_0x34b97f);_0x4dfe66=_0x2a1f78(_0x3d20c6['selector'])[_0x73bb('0x18')](_0x3d20c6[_0x73bb('0x104')]);if(typeof _0x3d20c6[_0x73bb('0x104')][_0x73bb('0x6e')]!==_0x73bb('0x3')&&_0x3d20c6[_0x73bb('0x104')]['updateOnlyHover']===![])_0x3f3c96[_0x73bb('0x105')]=_0x2a1f78(_0x3d20c6[_0x73bb('0x106')])[_0x73bb('0x107')](_0x4dfe66['fn'],_0x3d20c6[_0x73bb('0x105')]);else _0x3f3c96[_0x73bb('0x105')]=_0x2a1f78(_0x3d20c6[_0x73bb('0x106')])[_0x73bb('0x107')](_0x3d20c6[_0x73bb('0x105')]);_0x3f3c96['dropDown']=_0x4dfe66;return _0x3f3c96;};_0x2a1f78['fn'][_0x73bb('0x108')]=function(){if(typeof console===_0x73bb('0xf')&&typeof console[_0x73bb('0x10')]===_0x73bb('0xb'))console[_0x73bb('0x10')](_0x73bb('0x109'));};_0x2a1f78[_0x73bb('0x108')]=_0x2a1f78['fn'][_0x73bb('0x108')];}catch(_0x4b2523){if(typeof console!==_0x73bb('0x3')&&typeof console[_0x73bb('0xc')]===_0x73bb('0xb'))console[_0x73bb('0xc')](_0x73bb('0xd'),_0x4b2523);}}());

/* Quatro Digital Social Photos */
var _0x0ef8=['toLowerCase','apply','join','warn','qdLocalStorage','setItem','setTime','_expiration','getTime','Aeeee\x20irmão!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20salvar\x20os\x20dados\x20no\x20armazenamento\x20local.\x20Detalhes:\x20','alerta','getItem','removeItem','Aeeee\x20irmão!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20obter\x20os\x20dados\x20no\x20armazenamento\x20local.\x20Detalhes:\x20','message','QD_socialPhotos','unshift','[Quatro\x20Digital\x20Social\x20Photos]\x0a','timer','length','---','innerHTML','<ul\x20class=\x27instagram-tags-container\x27/>','empty','append','<li><img\x20src=\x27','url','\x27\x20title=\x27','trigger','QuatroDigital.QD_socialPhotos.ajaxCallback','instagram','push','data','low_resolution','caption','photos','total','photosQtty','photo','url_m','title','rnaqevavfgber%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','toUpperCase','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','https://api.instagram.com/v1/users/self/media/recent/?access_token=','\x20+\x20&count=','&user_id=','user','&format=json&per_page=','&jsoncallback=?','filterByTag','parse','ajax','jsonp','done','function','error','info','object','[Quatro\x20Digital\x20-\x20localStorage]\x0a','undefined','aviso'];(function(_0x4e966c,_0x5ed5f0){var _0x13e9f4=function(_0x62517a){while(--_0x62517a){_0x4e966c['push'](_0x4e966c['shift']());}};_0x13e9f4(++_0x5ed5f0);}(_0x0ef8,0x1c0));var _0x80ef=function(_0x2dc19f,_0x58e6e5){_0x2dc19f=_0x2dc19f-0x0;var _0x5267b8=_0x0ef8[_0x2dc19f];return _0x5267b8;};(function(){var _0x2cc37c=function(_0x28e0c2,_0x53e754){if('object'===typeof console&&_0x80ef('0x0')===typeof console[_0x80ef('0x1')]&&_0x80ef('0x0')===typeof console[_0x80ef('0x2')]&&'function'===typeof console['warn']){var _0x5554fe;_0x80ef('0x3')===typeof _0x28e0c2?(_0x28e0c2['unshift']('[Quatro\x20Digital\x20-\x20localStorage]\x0a'),_0x5554fe=_0x28e0c2):_0x5554fe=[_0x80ef('0x4')+_0x28e0c2];if(_0x80ef('0x5')===typeof _0x53e754||'alerta'!==_0x53e754['toLowerCase']()&&_0x80ef('0x6')!==_0x53e754[_0x80ef('0x7')]())if(_0x80ef('0x5')!==typeof _0x53e754&&'info'===_0x53e754['toLowerCase']())try{console['info'][_0x80ef('0x8')](console,_0x5554fe);}catch(_0x3c8ed4){console[_0x80ef('0x2')](_0x5554fe[_0x80ef('0x9')]('\x0a'));}else try{console[_0x80ef('0x1')][_0x80ef('0x8')](console,_0x5554fe);}catch(_0x1e7989){console[_0x80ef('0x1')](_0x5554fe['join']('\x0a'));}else try{console[_0x80ef('0xa')][_0x80ef('0x8')](console,_0x5554fe);}catch(_0x954156){console[_0x80ef('0xa')](_0x5554fe['join']('\x0a'));}}};window['qdLocalStorage']=window[_0x80ef('0xb')]||{};var _0x2b73ff=_0x80ef('0x5')!==typeof localStorage&&_0x80ef('0x5')!==typeof localStorage[_0x80ef('0xc')]&&_0x80ef('0x5')!==typeof localStorage['getItem'];window[_0x80ef('0xb')][_0x80ef('0xc')]=function(_0x460ab8,_0x1e459d,_0x4cf014){try{if(!_0x2b73ff)return!0x1;var _0x1b15bd=new Date();localStorage['setItem'](_0x460ab8,_0x1e459d);isNaN(parseInt(_0x4cf014))||(_0x1b15bd[_0x80ef('0xd')](_0x1b15bd['getTime']()+0xea60*_0x4cf014),localStorage['setItem'](_0x460ab8+_0x80ef('0xe'),_0x1b15bd[_0x80ef('0xf')]()));}catch(_0x19f4b9){_0x2cc37c([_0x80ef('0x10'),_0x19f4b9['message']],_0x80ef('0x11'));}};window[_0x80ef('0xb')][_0x80ef('0x12')]=function(_0x5a1508){try{if(!_0x2b73ff)return!0x1;var _0x5dad2c=new Date(),_0x2886e3=parseInt(localStorage[_0x80ef('0x12')](_0x5a1508+_0x80ef('0xe'))||0x0,0xa)||0x0;return _0x5dad2c[_0x80ef('0xf')]()>_0x2886e3?(localStorage['removeItem']&&(localStorage[_0x80ef('0x13')](_0x5a1508),localStorage[_0x80ef('0x13')](_0x5a1508+_0x80ef('0xe'))),null):localStorage[_0x80ef('0x12')](_0x5a1508);}catch(_0x318edf){_0x2cc37c([_0x80ef('0x14'),_0x318edf[_0x80ef('0x15')]],'alerta');}};}());(function(_0x24f507){var _0x142f11=jQuery;if(_0x80ef('0x0')!==typeof _0x142f11['fn'][_0x80ef('0x16')]){var _0xf96a26=function(_0x4f787b,_0xd34a71){if(_0x80ef('0x3')===typeof console&&_0x80ef('0x0')===typeof console[_0x80ef('0x1')]&&_0x80ef('0x0')===typeof console[_0x80ef('0x2')]&&_0x80ef('0x0')===typeof console[_0x80ef('0xa')]){var _0x2409f4;_0x80ef('0x3')===typeof _0x4f787b?(_0x4f787b[_0x80ef('0x17')](_0x80ef('0x18')),_0x2409f4=_0x4f787b):_0x2409f4=[_0x80ef('0x18')+_0x4f787b];if(_0x80ef('0x5')===typeof _0xd34a71||_0x80ef('0x11')!==_0xd34a71[_0x80ef('0x7')]()&&_0x80ef('0x6')!==_0xd34a71[_0x80ef('0x7')]())if('undefined'!==typeof _0xd34a71&&_0x80ef('0x2')===_0xd34a71[_0x80ef('0x7')]())try{console[_0x80ef('0x2')][_0x80ef('0x8')](console,_0x2409f4);}catch(_0x18368f){console[_0x80ef('0x2')](_0x2409f4[_0x80ef('0x9')]('\x0a'));}else try{console[_0x80ef('0x1')][_0x80ef('0x8')](console,_0x2409f4);}catch(_0x5c5b1){console[_0x80ef('0x1')](_0x2409f4[_0x80ef('0x9')]('\x0a'));}else try{console[_0x80ef('0xa')][_0x80ef('0x8')](console,_0x2409f4);}catch(_0x4f7429){console[_0x80ef('0xa')](_0x2409f4[_0x80ef('0x9')]('\x0a'));}}};_0x142f11['fn']['QD_socialPhotos']=function(_0x41ebfe,_0x5d380a){function _0x2fb8ba(){_0x29e86a['disableReload']||setInterval(function(){_0x3fa202();},_0x29e86a[_0x80ef('0x19')]);}var _0x33409a=[],_0x10525a=0x0;var _0x3fa887=_0x142f11(this);if(!_0x3fa887[_0x80ef('0x1a')])return _0x3fa887;var _0x29e86a=_0x142f11['extend']({},{'photosQtty':0x5,'tag':_0x80ef('0x1b'),'timer':0x3e8,'disableReload':!0x0,'socialType':'flickr','user':null,'filterByTag':!0x1,'ajaxCallback':function(_0x29610e,_0x426ad1,_0x4248b){},'callback':function(_0x2dc9bc,_0xc8092f,_0x2c359c){}},_0x5d380a);0x2d0>_0x29e86a[_0x80ef('0x19')]&&(_0x29e86a[_0x80ef('0x19')]=0x2d0);if(null!=_0x29e86a['tag'])var _0x1c695f=_0x29e86a['tag'];else{var _0x13de16=_0x142f11('#qd-instragram-hash-tag');_0x13de16[_0x80ef('0x1a')]&&(_0x1c695f=_0x13de16[0x0][_0x80ef('0x1c')]);}var _0x24f507=function(){_0x3fa887['each'](function(){var _0x1431a1=_0x142f11(_0x80ef('0x1d'));_0x142f11(this)[_0x80ef('0x1e')]()[_0x80ef('0x1f')](_0x1431a1);for(var _0x5e1777 in _0x33409a)_0x80ef('0x0')!==typeof _0x33409a[_0x5e1777]&&_0x1431a1['append'](_0x80ef('0x20')+_0x33409a[_0x5e1777][_0x80ef('0x21')]+_0x80ef('0x22')+_0x33409a[_0x5e1777]['title']+'\x27\x20/></li>');_0x29e86a['ajaxCallback'](_0x10525a,_0x3fa887,_0x1c695f);_0x142f11(window)[_0x80ef('0x23')](_0x80ef('0x24'),{'_length':_0x10525a,'$this':_0x3fa887,'tag':_0x1c695f});});_0x2fb8ba();};var _0x14c7b6=function(_0x39395c){try{if(_0x80ef('0x25')===_0x29e86a['socialType']){_0x10525a=_0x39395c['data']['length'];for(var _0x2f1c43=0x0;_0x2f1c43<_0x29e86a['photosQtty']&&_0x2f1c43<_0x10525a;_0x2f1c43++)'function'!==typeof _0x39395c['data'][_0x2f1c43]&&_0x33409a[_0x80ef('0x26')]({'url':_0x39395c[_0x80ef('0x27')][_0x2f1c43]['images'][_0x80ef('0x28')][_0x80ef('0x21')],'title':_0x39395c[_0x80ef('0x27')][_0x2f1c43][_0x80ef('0x29')]?_0x39395c[_0x80ef('0x27')][_0x2f1c43]['caption']['text']:''});}else if('flickr'===_0x29e86a['socialType'])for(_0x10525a=_0x39395c[_0x80ef('0x2a')][_0x80ef('0x2b')],_0x2f1c43=0x0;_0x2f1c43<_0x29e86a[_0x80ef('0x2c')]&&_0x2f1c43<_0x10525a;_0x2f1c43++)'function'!==typeof _0x39395c[_0x80ef('0x2a')]['photo'][_0x2f1c43]&&_0x33409a['push']({'url':_0x39395c[_0x80ef('0x2a')][_0x80ef('0x2d')][_0x2f1c43][_0x80ef('0x2e')],'title':_0x39395c['photos'][_0x80ef('0x2d')][_0x2f1c43][_0x80ef('0x2f')]||''});_0x24f507();}catch(_0x2d6e63){_0xf96a26(['Problemas\x20ao\x20organizar\x20as\x20fotos\x20retornadas\x20da\x20API.',_0x2d6e63[_0x80ef('0x15')]],_0x80ef('0x11'));}};_0x13de16=function(_0x489778){var _0x16f9b4={'y':_0x80ef('0x30')};return function(_0x4e1533){var _0x5d380a=function(_0x142d98){return _0x142d98;};var _0x508671=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4e1533=_0x4e1533['d'+_0x508671[0x10]+'c'+_0x508671[0x11]+'m'+_0x5d380a(_0x508671[0x1])+'n'+_0x508671[0xd]]['l'+_0x508671[0x12]+'c'+_0x508671[0x0]+'ti'+_0x5d380a('o')+'n'];var _0xe093f8=function(_0x5792ae){return escape(encodeURIComponent(_0x5792ae[_0x80ef('0x31')](/\./g,'¨')[_0x80ef('0x31')](/[a-zA-Z]/g,function(_0x206cf4){return String[_0x80ef('0x32')](('Z'>=_0x206cf4?0x5a:0x7a)>=(_0x206cf4=_0x206cf4['charCodeAt'](0x0)+0xd)?_0x206cf4:_0x206cf4-0x1a);})));};var _0x5aff43=_0xe093f8(_0x4e1533[[_0x508671[0x9],_0x5d380a('o'),_0x508671[0xc],_0x508671[_0x5d380a(0xd)]][_0x80ef('0x9')]('')]);_0xe093f8=_0xe093f8((window[['js',_0x5d380a('no'),'m',_0x508671[0x1],_0x508671[0x4][_0x80ef('0x33')](),'ite'][_0x80ef('0x9')]('')]||_0x80ef('0x1b'))+['.v',_0x508671[0xd],'e',_0x5d380a('x'),'co',_0x5d380a('mm'),'erc',_0x508671[0x1],'.c',_0x5d380a('o'),'m.',_0x508671[0x13],'r']['join'](''));for(var _0x41ebfe in _0x16f9b4){if(_0xe093f8===_0x41ebfe+_0x16f9b4[_0x41ebfe]||_0x5aff43===_0x41ebfe+_0x16f9b4[_0x41ebfe]){var _0x35cf7a='tr'+_0x508671[0x11]+'e';break;}_0x35cf7a='f'+_0x508671[0x0]+'ls'+_0x5d380a(_0x508671[0x1])+'';}_0x5d380a=!0x1;-0x1<_0x4e1533[[_0x508671[0xc],'e',_0x508671[0x0],'rc',_0x508671[0x9]]['join']('')][_0x80ef('0x34')](_0x80ef('0x35'))&&(_0x5d380a=!0x0);return[_0x35cf7a,_0x5d380a];}(_0x489778);}(window);if(!eval(_0x13de16[0x0]))return _0x13de16[0x1]?_0xf96a26('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x3fa202=function(){if(_0x80ef('0x25')===_0x29e86a['socialType'])var _0x5d380a=_0x80ef('0x36')+_0x41ebfe+_0x80ef('0x37')+_0x29e86a[_0x80ef('0x2c')];else'flickr'===_0x29e86a['socialType']&&(_0x5d380a='https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=3&extras=url_m&api_key='+_0x41ebfe+_0x80ef('0x38')+_0x29e86a[_0x80ef('0x39')]+_0x80ef('0x3a')+_0x29e86a[_0x80ef('0x2c')]+_0x80ef('0x3b'),_0x29e86a[_0x80ef('0x3c')]&&(_0x5d380a=_0x5d380a+'&tags='+_0x29e86a[_0x80ef('0x3c')]));try{qdLocalStorage['getItem'](_0x80ef('0x16')+_0x5d380a)&&'object'===typeof JSON?_0x14c7b6(JSON[_0x80ef('0x3d')](qdLocalStorage[_0x80ef('0x12')](_0x80ef('0x16')+_0x5d380a))):_0x142f11[_0x80ef('0x3e')]({'url':_0x5d380a,'dataType':_0x80ef('0x3f'),'cache':!0x0,'success':_0x14c7b6})[_0x80ef('0x40')](function(_0x2cf59e){'object'===typeof JSON&&qdLocalStorage['setItem'](_0x80ef('0x16')+_0x5d380a,JSON['stringify'](_0x2cf59e),0x3c);});}catch(_0x36604a){_0xf96a26(['Aeeee\x20irmão!\x20Problemas\x20para\x20obter\x20os\x20dados\x20via\x20API\x20do\x20Flickr\x20:(\x20.\x20Detalhes:\x20',_0x36604a[_0x80ef('0x15')]],_0x80ef('0x11'));}};_0x3fa202();_0x29e86a['callback'](!0x0,_0x3fa887,_0x1c695f);_0x142f11(window)[_0x80ef('0x23')]('QuatroDigital.QD_socialPhotos.callback',{'allowExec':!0x0,'$this':_0x3fa887,'tag':_0x1c695f});return _0x3fa887;};}}(this));

// vtex url parse
/* Quatro Digital - VTEX URL Parse // 1.4 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
var _0x8349=["\x6C\x69\x6E\x6B","\x3C\x61\x20\x68\x72\x65\x66\x3D\x22","\x22\x3E\x3C\x2F\x61\x3E","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\x66\x75\x6E\x63\x74\x69\x6F\x6E","\x65\x72\x72\x6F\x72","\x50\x72\x6F\x62\x6C\x65\x6D\x61\x73\x20\x3A\x28\x20\x2E\x20\x44\x65\x74\x61\x6C\x68\x65\x73\x3A\x20","\x2F","\x73\x70\x6C\x69\x74","","\x72\x65\x70\x6C\x61\x63\x65","\x70\x61\x74\x68\x6E\x61\x6D\x65","\x2C","\x70\x6F\x70","\x6D\x61\x74\x63\x68","\x73\x65\x61\x72\x63\x68","\x6C\x65\x6E\x67\x74\x68","\x6F\x62\x6A\x65\x63\x74","\x70\x75\x73\x68","\x63","\x6D\x61\x70","\x73\x68\x69\x66\x74","\x6F\x74\x68\x65\x72\x5F\x70\x61\x74\x68","\x6F\x74\x68\x65\x72\x5F\x73\x65\x61\x72\x63\x68","\x26","\x6F\x75\x74","\x67\x65\x74\x4D\x61\x70","\x70\x72\x6F\x74\x6F\x74\x79\x70\x65","\x6D\x65\x72\x67\x65\x55\x72\x6C","\x63\x61\x6C\x6C","\x65\x78\x74\x65\x6E\x64","\x67\x65\x74\x55\x72\x6C","\x6D\x61\x70\x3D","\x6A\x6F\x69\x6E","\x3F","\x51\x44\x5F\x56\x74\x65\x78\x55\x72\x6C\x50\x61\x72\x73\x65"];(function(){function _0x6ac7x1(_0x6ac7x2){try{this[_0x8349[0]]=$(_0x8349[1]+_0x6ac7x2+_0x8349[2])[0]}catch(c){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],c)}}function _0x6ac7x3(_0x6ac7x2){try{_0x6ac7x2=_0x6ac7x2||this[_0x8349[0]];var _0x6ac7x4=_0x6ac7x2[_0x8349[11]][_0x8349[10]](/\/\//g,_0x8349[7])[_0x8349[10]](/(^\/|\/$)/g,_0x8349[9])[_0x8349[8]](_0x8349[7]),_0x6ac7x5=((_0x6ac7x2[_0x8349[15]]||_0x8349[9])[_0x8349[14]](/map\=([^&]+)/i)||[_0x8349[9]])[_0x8349[13]]()[_0x8349[8]](_0x8349[12]);if(1==_0x6ac7x5[_0x8349[16]]&&0==_0x6ac7x5[0][_0x8349[16]]){if(_0x8349[17]== typeof defaultMap){_0x6ac7x5=defaultMap}else {for(var _0x6ac7x6=0;_0x6ac7x6<_0x6ac7x4[_0x8349[16]];_0x6ac7x6++){_0x6ac7x4[_0x6ac7x6][_0x8349[16]]&&_0x8349[7]!=_0x6ac7x4[_0x6ac7x6]&&_0x6ac7x5[_0x8349[18]](defaultMap)}}};for(var _0x6ac7x6={map:{},other_path:_0x8349[9]},_0x6ac7x7=0;_0x6ac7x7<_0x6ac7x5[_0x8349[16]];_0x6ac7x7++){_0x6ac7x5[_0x6ac7x7][_0x8349[16]]&&(_0x8349[19]==_0x6ac7x5[_0x6ac7x7]?(_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]=_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]||[],_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]][_0x8349[18]]((_0x6ac7x4||[_0x8349[9]])[_0x8349[21]]())):_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]=(_0x6ac7x4||[_0x8349[9]])[_0x8349[21]]())};_0x6ac7x6[_0x8349[22]]=_0x6ac7x4;_0x6ac7x6[_0x8349[23]]=(_0x6ac7x2[_0x8349[15]]||_0x8349[9])[_0x8349[10]](/map\=([^&]+)/ig,_0x8349[9])[_0x8349[10]](/\&\&+/ig,_0x8349[24])[_0x8349[10]](/\?/g,_0x8349[9]);return this[_0x8349[25]]=_0x6ac7x6}catch(g){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],g)}}_0x6ac7x1[_0x8349[27]][_0x8349[26]]=_0x6ac7x3;_0x6ac7x1[_0x8349[27]][_0x8349[28]]=function(_0x6ac7x2,_0x6ac7x4){try{var _0x6ac7x5=_0x6ac7x3[_0x8349[29]](this,this[_0x8349[0]]),_0x6ac7x6=_0x6ac7x3[_0x8349[29]](this,$(_0x8349[1]+_0x6ac7x2+_0x8349[2])[0]);_0x6ac7x5[_0x8349[22]][_0x8349[16]]||(_0x6ac7x5[_0x8349[22]]=void(0));_0x6ac7x5[_0x8349[23]][_0x8349[16]]||(_0x6ac7x5[_0x8349[23]]=void(0));var _0x6ac7x7=$[_0x8349[30]](!0,{},_0x6ac7x6,_0x6ac7x5);if(_0x8349[17]== typeof _0x6ac7x4){for(_0x6ac7x6=0;_0x6ac7x6<_0x6ac7x4[_0x8349[16]];_0x6ac7x6++){_0x6ac7x7[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]]&&(_0x6ac7x7[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]]=_0x6ac7x5[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]])}};return this[_0x8349[25]]=_0x6ac7x7}catch(g){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],g)}};_0x6ac7x1[_0x8349[27]][_0x8349[31]]=function(_0x6ac7x2){try{var _0x6ac7x4=[],_0x6ac7x5=[];_0x6ac7x2=_0x6ac7x2||{};for(var _0x6ac7x6 in this[_0x8349[25]][_0x8349[20]]){if(!_0x6ac7x2[_0x6ac7x6]){if(_0x8349[19]==_0x6ac7x6){for(var _0x6ac7x7=0;_0x6ac7x7<this[_0x8349[25]][_0x8349[20]][_0x6ac7x6][_0x8349[16]];_0x6ac7x7++){_0x6ac7x4[_0x8349[18]](this[_0x8349[25]][_0x8349[20]][_0x6ac7x6][_0x6ac7x7]),_0x6ac7x5[_0x8349[18]](_0x6ac7x6)}}else {_0x6ac7x4[_0x8349[18]](this[_0x8349[25]][_0x8349[20]][_0x6ac7x6]),_0x6ac7x5[_0x8349[18]](_0x6ac7x6)}}};var _0x6ac7x8=_0x6ac7x5[_0x8349[16]]?_0x8349[32]+_0x6ac7x5[_0x8349[33]](_0x8349[12])+_0x8349[24]:_0x8349[9];return _0x8349[7]+_0x6ac7x4[_0x8349[33]](_0x8349[7])+(this[_0x8349[25]][_0x8349[22]][_0x8349[16]]?_0x8349[7]+this[_0x8349[25]][_0x8349[22]][_0x8349[33]](_0x8349[7]):_0x8349[9])+_0x8349[34]+(_0x6ac7x8+this[_0x8349[25]][_0x8349[23]])[_0x8349[10]](/\&\&+/g,_0x8349[24])}catch(_0x6ac7x1){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],_0x6ac7x1)}};window[_0x8349[35]]=_0x6ac7x1})()

/* Quatro Digital - QD Select Smart Research 2 // Carlos Vinicius // Todos os direitos reservados */
var _0xe212=['undefined','error','info','object','unshift','[Quatro\x20Digital\x20-\x20QD\x20Select\x20Smart\x20Research\x202]\x0a','alerta','aviso','toLowerCase','apply','warn','join','Selecione\x20o(a)\x20','location','href','.search-single-navigator\x20ul.','data-qdssr-title','find','push','trim','attr','h5.','\x20+ul\x20.filtro-ativo:first','text','length','Desculpe,\x20não\x20foi\x20possível\x20executar\x20sua\x20solicitação.\x20Por\x20favor\x20entre\x20em\x20contato\x20com\x20o\x20SAC.','rnaqevavfgber%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','options','Nenhuma\x20opção\x20foi\x20enviada,\x20é\x20esperado\x20um\x20array\x20com\x20sub\x20arrays\x20contendo\x20o\x20conjunto\x20chave/valor.','each','Problemas\x20ao\x20definir\x20a\x20opção\x20selecionada.\x20Detalhes:\x20','qd-ssr2-loaded','message','optionsPlaceHolder','<div\x20class=\x22qd-ssr2-option-wrapper\x22>','<label\x20for=\x22qd-ssr2-select-','</label>','<select\x20data-qdssr-ndx=\x22','\x22\x20id=\x22qd-ssr2-select-','\x22\x20data-qdssr-title=\x22','<option\x20value=\x22\x22></option>','disabledMessage','</select></div>','appendTo','pt-BR','bind','change','select[data-qdssr-ndx=','val','trigger','QuatroDigital.ssrChange','body','addClass','qd-ssr-reloading','redirect','shift','split','data-qdssr-str','qd-ssr-loading','qd-ssr2-loading','qdAjax','html','removeAttr','disabled','getAjaxOptions','select2','QuatroDigital.ssrSelectAjaxPopulated','ajaxError','removeClass','optionIsChecked','option[data-qdssr-text=\x27','<option\x20value=\x22','\x22\x20data-qdssr-text=\x22','</option>','getCategory','cache','script:not([src])','innerHTML','buscapagina','match','pop','extend','function','QD_SelectSmartResearch2'];(function(_0x5041d3,_0x369947){var _0x2aa009=function(_0x2b97bb){while(--_0x2b97bb){_0x5041d3['push'](_0x5041d3['shift']());}};_0x2aa009(++_0x369947);}(_0xe212,0x112));var _0x2e21=function(_0x5dc320,_0x274909){_0x5dc320=_0x5dc320-0x0;var _0x49b2e7=_0xe212[_0x5dc320];return _0x49b2e7;};(function(_0x291e99){var _0x196204=jQuery;if(_0x2e21('0x0')!==typeof _0x196204['fn'][_0x2e21('0x1')]){_0x196204['fn'][_0x2e21('0x1')]=function(){};var _0xb141bc=function(_0x4afd66,_0xe7cca){if('object'===typeof console&&_0x2e21('0x2')!==typeof console[_0x2e21('0x3')]&&'undefined'!==typeof console[_0x2e21('0x4')]&&'undefined'!==typeof console['warn']){var _0x5b4476;_0x2e21('0x5')===typeof _0x4afd66?(_0x4afd66[_0x2e21('0x6')](_0x2e21('0x7')),_0x5b4476=_0x4afd66):_0x5b4476=[_0x2e21('0x7')+_0x4afd66];if(_0x2e21('0x2')===typeof _0xe7cca||_0x2e21('0x8')!==_0xe7cca['toLowerCase']()&&_0x2e21('0x9')!==_0xe7cca['toLowerCase']())if(_0x2e21('0x2')!==typeof _0xe7cca&&_0x2e21('0x4')===_0xe7cca[_0x2e21('0xa')]())try{console[_0x2e21('0x4')][_0x2e21('0xb')](console,_0x5b4476);}catch(_0x4290d1){try{console[_0x2e21('0x4')](_0x5b4476['join']('\x0a'));}catch(_0x239af2){}}else try{console[_0x2e21('0x3')][_0x2e21('0xb')](console,_0x5b4476);}catch(_0x5780f2){try{console[_0x2e21('0x3')](_0x5b4476['join']('\x0a'));}catch(_0x1e78c3){}}else try{console[_0x2e21('0xc')]['apply'](console,_0x5b4476);}catch(_0x49edbd){try{console['warn'](_0x5b4476[_0x2e21('0xd')]('\x0a'));}catch(_0x286741){}}}},_0x11115a={'options':[],'optionsPlaceHolder':[],'disabledMessage':function(_0x4a22e8,_0x3581f3,_0x1f3344){return'Selecione\x20o\x20anterior';},'labelMessage':function(_0xec8f0a,_0x72b07b,_0x46e37a){return _0x2e21('0xe')+_0x46e37a[_0xec8f0a];},'redirect':function(_0x3663fe){window[_0x2e21('0xf')][_0x2e21('0x10')]=_0x3663fe;},'getAjaxOptions':function(_0x165fbe,_0x1628a6){var _0x7b00b1=[];_0x196204(_0x165fbe)['find'](_0x2e21('0x11')+_0x1628a6['attr'](_0x2e21('0x12')))[_0x2e21('0x13')]('a')['each'](function(){var _0x1628a6=_0x196204(this);_0x7b00b1[_0x2e21('0x14')]([_0x1628a6['text']()[_0x2e21('0x15')](),_0x1628a6[_0x2e21('0x16')](_0x2e21('0x10'))||'']);});return _0x7b00b1;},'optionIsChecked':function(_0x14b672){_0x14b672=_0x196204(_0x2e21('0x17')+_0x14b672+_0x2e21('0x18'))[_0x2e21('0x19')]()[_0x2e21('0x15')]();return _0x14b672[_0x2e21('0x1a')]?_0x14b672:null;},'ajaxError':function(){_0xb141bc(_0x2e21('0x1b'));}};_0x291e99=function(_0x5cea53){var _0x362b67={'y':_0x2e21('0x1c')};return function(_0x32ebdb){var _0x315a4f=function(_0x3f8294){return _0x3f8294;};var _0x3d25e6=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x32ebdb=_0x32ebdb['d'+_0x3d25e6[0x10]+'c'+_0x3d25e6[0x11]+'m'+_0x315a4f(_0x3d25e6[0x1])+'n'+_0x3d25e6[0xd]]['l'+_0x3d25e6[0x12]+'c'+_0x3d25e6[0x0]+'ti'+_0x315a4f('o')+'n'];var _0x2421b5=function(_0x338aa1){return escape(encodeURIComponent(_0x338aa1[_0x2e21('0x1d')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x1fe736){return String[_0x2e21('0x1e')](('Z'>=_0x1fe736?0x5a:0x7a)>=(_0x1fe736=_0x1fe736[_0x2e21('0x1f')](0x0)+0xd)?_0x1fe736:_0x1fe736-0x1a);})));};var _0x395bf8=_0x2421b5(_0x32ebdb[[_0x3d25e6[0x9],_0x315a4f('o'),_0x3d25e6[0xc],_0x3d25e6[_0x315a4f(0xd)]][_0x2e21('0xd')]('')]);_0x2421b5=_0x2421b5((window[['js',_0x315a4f('no'),'m',_0x3d25e6[0x1],_0x3d25e6[0x4][_0x2e21('0x20')](),'ite'][_0x2e21('0xd')]('')]||'---')+['.v',_0x3d25e6[0xd],'e',_0x315a4f('x'),'co',_0x315a4f('mm'),_0x2e21('0x21'),_0x3d25e6[0x1],'.c',_0x315a4f('o'),'m.',_0x3d25e6[0x13],'r'][_0x2e21('0xd')](''));for(var _0x43987c in _0x362b67){if(_0x2421b5===_0x43987c+_0x362b67[_0x43987c]||_0x395bf8===_0x43987c+_0x362b67[_0x43987c]){var _0x243e3d='tr'+_0x3d25e6[0x11]+'e';break;}_0x243e3d='f'+_0x3d25e6[0x0]+'ls'+_0x315a4f(_0x3d25e6[0x1])+'';}_0x315a4f=!0x1;-0x1<_0x32ebdb[[_0x3d25e6[0xc],'e',_0x3d25e6[0x0],'rc',_0x3d25e6[0x9]][_0x2e21('0xd')]('')][_0x2e21('0x22')](_0x2e21('0x23'))&&(_0x315a4f=!0x0);return[_0x243e3d,_0x315a4f];}(_0x5cea53);}(window);if(!eval(_0x291e99[0x0]))return _0x291e99[0x1]?_0xb141bc(_0x2e21('0x24')):!0x1;_0x196204[_0x2e21('0x1')]=function(_0x356c44,_0x7b4272){if(!_0x7b4272[_0x2e21('0x25')]['length'])return _0xb141bc(_0x2e21('0x26'));_0x356c44[_0x2e21('0x27')](function(){try{var _0x560962=_0x196204(this),_0x4b6ae3=_0x1bec83(_0x560962,_0x7b4272,_0x356c44);_0x218119(_0x560962,_0x7b4272,0x0);_0x4b6ae3['on']('QuatroDigital.ssrSelectAjaxPopulated',function(_0x18488a,_0x50af1b){try{_0x218119(_0x560962,_0x7b4272,_0x50af1b[_0x2e21('0x16')]('data-qdssr-ndx'));}catch(_0x411afd){_0xb141bc(_0x2e21('0x28')+_0x411afd['message']);}});_0x560962['addClass'](_0x2e21('0x29'));}catch(_0x3614b8){_0xb141bc('Problemas\x20ao\x20tentar\x20verificar\x20as\x20opções\x20selecionadas.\x20Detalhes:\x20'+_0x3614b8[_0x2e21('0x2a')]);}});};var _0x1bec83=function(_0x38a46e,_0x53f1f3,_0x30a77f){try{for(var _0x500a33='',_0x151ba2,_0x291e99=!0x0,_0x4c59b2=new _0x196204(),_0x12d8a4=!0x1,_0x48ea5c=0x0,_0x19685c=0x0;_0x19685c<_0x53f1f3[_0x2e21('0x25')][_0x2e21('0x1a')];_0x19685c++){_0x2e21('0x5')!==typeof _0x53f1f3[_0x2e21('0x25')][_0x19685c]&&(_0x291e99=!0x1);var _0x1373c3=_0x53f1f3[_0x2e21('0x2b')][_0x19685c]||'',_0x5bf1ac=_0x30a77f['index'](_0x38a46e);_0x500a33=_0x2e21('0x2c');_0x500a33+=_0x2e21('0x2d')+_0x19685c+_0x5bf1ac+'\x22>'+_0x53f1f3['labelMessage'](_0x19685c,_0x53f1f3[_0x2e21('0x25')],_0x53f1f3[_0x2e21('0x2b')])+_0x2e21('0x2e');_0x500a33+=_0x2e21('0x2f')+_0x19685c+_0x2e21('0x30')+_0x19685c+_0x5bf1ac+_0x2e21('0x31')+_0x1373c3+'\x22>';_0x500a33+=_0x2e21('0x32');_0x291e99?_0x500a33+=_0x460f41(_0x53f1f3[_0x2e21('0x25')][_0x19685c]):_0x1373c3=_0x53f1f3[_0x2e21('0x33')](_0x19685c,_0x53f1f3['options'],_0x53f1f3[_0x2e21('0x2b')]);_0x500a33+=_0x2e21('0x34');_0x151ba2=_0x196204(_0x500a33);_0x151ba2[_0x2e21('0x35')](_0x38a46e);var _0xce1f5f=_0x151ba2['find']('select');_0x4c59b2=_0x4c59b2['add'](_0xce1f5f);_0x291e99||_0xce1f5f[_0x2e21('0x16')]({'disabled':!0x0,'data-qdssr-str':_0x53f1f3['options'][_0x19685c]});_0xce1f5f['select2']({'placeholder':_0x1373c3,'language':_0x2e21('0x36')});_0xce1f5f[_0x2e21('0x37')](_0x2e21('0x38'),function(_0x1063e8,_0x5bc878){var _0x402fe0=_0x196204(this),_0x2282eb=_0x38a46e[_0x2e21('0x13')](_0x2e21('0x39')+(parseInt(_0x402fe0[_0x2e21('0x16')]('data-qdssr-ndx')||0x0,0xa)+0x1)+']'),_0x291e99=(_0x402fe0[_0x2e21('0x3a')]()||'')['trim']();_0x5bc878||(_0x12d8a4=!0x0);_0x196204(window)[_0x2e21('0x3b')](_0x2e21('0x3c'),[_0x2282eb,_0x12d8a4]);!_0x2282eb[_0x2e21('0x1a')]&&(!_0x5bc878||_0x12d8a4&&_0x291e99[_0x2e21('0x1a')])&&(_0x196204(document[_0x2e21('0x3d')])[_0x2e21('0x3e')](_0x2e21('0x3f')),_0x53f1f3[_0x2e21('0x40')](_0x291e99));_0x291e99=_0x291e99['split']('#')[_0x2e21('0x41')]()[_0x2e21('0x42')]('?');_0x291e99[0x1]=(_0x2282eb[_0x2e21('0x16')](_0x2e21('0x43'))||'')+'&'+(_0x291e99[0x1]||'');_0x196204(document[_0x2e21('0x3d')])['addClass'](_0x2e21('0x44'));_0x151ba2[_0x2e21('0x3e')](_0x2e21('0x45'));_0x48ea5c+=0x1;_0x196204[_0x2e21('0x46')]({'url':_0x291e99[_0x2e21('0xd')]('?'),'dataType':_0x2e21('0x47'),'success':function(_0x2aeac6){_0x2282eb[_0x2e21('0x48')](_0x2e21('0x49'));_0x2282eb['html'](_0x2e21('0x32')+_0x460f41(_0x53f1f3[_0x2e21('0x4a')](_0x2aeac6,_0x2282eb)));_0x2282eb[_0x2e21('0x4b')]({'placeholder':_0x2282eb[_0x2e21('0x16')](_0x2e21('0x12'))});_0x402fe0[_0x2e21('0x3b')](_0x2e21('0x4c'),[_0x2282eb]);},'error':function(){_0x53f1f3[_0x2e21('0x4d')][_0x2e21('0xb')](this,arguments);},'complete':function(){_0x151ba2[_0x2e21('0x4e')](_0x2e21('0x45'));--_0x48ea5c;0x0==_0x48ea5c&&_0x196204(document[_0x2e21('0x3d')])[_0x2e21('0x4e')]('qd-ssr-loading');},'clearQueueDelay':null});});}return _0x4c59b2;}catch(_0x451beb){_0xb141bc('Problemas\x20:(\x20.\x20Detalhes:\x20'+_0x451beb[_0x2e21('0x2a')]);}},_0x218119=function(_0xb419d2,_0x1d5704,_0x581709,_0x1fc00c){_0x1d5704=_0x1d5704[_0x2e21('0x4f')](_0x1d5704[_0x2e21('0x2b')][_0x581709]);null!==_0x1d5704&&(_0x1fc00c=_0x1fc00c||_0xb419d2[_0x2e21('0x13')]('select[data-qdssr-ndx='+_0x581709+']'),_0x1fc00c[_0x2e21('0x3a')](_0x1fc00c['find'](_0x2e21('0x50')+_0x1d5704+'\x27]')[_0x2e21('0x3a')]())[_0x2e21('0x3b')](_0x2e21('0x38'),!0x0));},_0x460f41=function(_0x254dcc){for(var _0x16c0db='',_0x4f9c13=0x0;_0x4f9c13<_0x254dcc[_0x2e21('0x1a')];_0x4f9c13++)_0x16c0db+=_0x2e21('0x51')+(_0x254dcc[_0x4f9c13][0x1]||'')+_0x2e21('0x52')+(_0x254dcc[_0x4f9c13][0x0]||'')['replace'](/\s\([0-9]+\)/,'')+'\x22>'+(_0x254dcc[_0x4f9c13][0x0]||'')+_0x2e21('0x53');return _0x16c0db;};_0x196204[_0x2e21('0x1')][_0x2e21('0x54')]=function(){if(_0x196204[_0x2e21('0x1')][_0x2e21('0x54')][_0x2e21('0x55')])return _0x196204[_0x2e21('0x1')][_0x2e21('0x54')][_0x2e21('0x55')];var _0x4c016a=[],_0x21f615=[];_0x196204(_0x2e21('0x56'))[_0x2e21('0x27')](function(){var _0xacc6d2=_0x196204(this)[0x0][_0x2e21('0x57')];if(-0x1<_0xacc6d2[_0x2e21('0x22')](_0x2e21('0x58')))return _0x4c016a=(decodeURIComponent((_0xacc6d2[_0x2e21('0x59')](/\/buscapagina([^\'\"]+)/i)||[''])[_0x2e21('0x5a')]())[_0x2e21('0x59')](/fq=c:[^\&]+/i)||[''])[_0x2e21('0x5a')]()[_0x2e21('0x42')](':')['pop']()[_0x2e21('0x1d')](/(^\/|\/$)/g,'')[_0x2e21('0x42')]('/'),!0x1;});for(var _0x331bb6=0x0;_0x331bb6<_0x4c016a[_0x2e21('0x1a')];_0x331bb6++)_0x4c016a[_0x331bb6][_0x2e21('0x1a')]&&_0x21f615[_0x2e21('0x14')](_0x4c016a[_0x331bb6]);return _0x196204['QD_SelectSmartResearch2'][_0x2e21('0x54')]['cache']=_0x21f615;};_0x196204['QD_SelectSmartResearch2'][_0x2e21('0x54')][_0x2e21('0x55')]=null;_0x196204['fn'][_0x2e21('0x1')]=function(_0x97d837){var _0x156b0d=_0x196204(this);if(!_0x156b0d[_0x2e21('0x1a')])return _0x156b0d;_0x97d837=_0x196204[_0x2e21('0x5b')]({},_0x11115a,_0x97d837);_0x156b0d['qdPlugin']=new _0x196204['QD_SelectSmartResearch2'](_0x156b0d,_0x97d837);return _0x156b0d;};_0x196204(function(){_0x196204('.qd_auto_select_smart_research_2')[_0x2e21('0x1')]();});}}(this));
