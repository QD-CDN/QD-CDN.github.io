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
			var wrapper = $("li[layout]");

	
			$('<div class="qd-sp-wrap"> <p class="qd_displayPrice shelf-qd-v1-sp-best-price">R$ </p> <span>com</span> <span class="qd-sp-display-discount shelf-qd-v1-sp-discount"> 0% no boleto</span> </div>').insertAfter(".shelf-price:not(.qd-on)");

			$(".shelf-price").addClass('qd-on');

			wrapper.find(".flag").QD_SmartPrice({
				filterFlagBy: "[class*='boleto']",
				wrapperElement: wrapper,
				productPage: {
					isProductPage: false
				}
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
				photosQtty: 8
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
			Product.applySmartPrice();
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
		applySmartPrice: function () {
			if ($('.product-stamps .flag[class*="boleto"]').length) {

				$(".productPrice").append('<div class="qd-sp-wrap"> <p class="qd_displayPrice shelf-qd-v1-sp-best-price">R$ </p> <span>com</span> <span class="qd-sp-display-discount shelf-qd-v1-sp-discount"> 0% no boleto</span> </div>');

				$(".product-stamps .flag").QD_SmartPrice({
					filterFlagBy: "[class*='boleto']",
					productPage: {
						wrapperElement: ".sku-selection-box",
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

var _0xe5c9=['.flag','auto','.productRightColumn','strong.skuBestPrice','label.skuBestInstallmentNumber','label.skuBestInstallmentValue','strong.skuPrice','rnaqevavfgber%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','ite','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','productPage','isProductPage','closest','wrapperElement','filterFlagBy','find','addClass','qd-active','qd-sp-active','.qd_sp_on,\x20.qd_sp_ignored','skuBestPrice','.qd_active','removeClass','siblings','qd_sp_on','isDiscountFlag','div[skuCorrente]:first','skuCorrente','skus','sku','isSmartCheckout','available','qd-sp-product-unavailable','getDiscountValue','O\x20valor\x20informado\x20p/\x20o\x20desconto\x20não\x20é\x20um\x20número.','alerta','bestPrice','.qd_productPrice','val','appliedDiscount','listPrice','.qd_displayPrice','skuPrice','.qd-sp-display-discount','html','installments','changeInstallments','installmentValue','.qd_sp_display_installments','.qd_sp_installments','.qd_saveAmount','append','prepend','em.economia-de','skuSelected.vtex','qd_sp_processedItem','startedByWrapper','each','call','forcePromotion','string','not','.qd_productPrice:not(.qd_sp_processedItem)','attr','display:none\x20!important;','after','extend','boolean','body','.produto','trim','prototype','replace','abs','undefined','round','toFixed','split','length','join','QD_SmartPrice','function','info','warn','object','unshift','toLowerCase','apply','error','search','text','match'];(function(_0x1e174b,_0x29fe46){var _0x8b7c1b=function(_0x3fabf7){while(--_0x3fabf7){_0x1e174b['push'](_0x1e174b['shift']());}};_0x8b7c1b(++_0x29fe46);}(_0xe5c9,0x1c5));var _0x9e5c=function(_0x5c76fa,_0x2a8d76){_0x5c76fa=_0x5c76fa-0x0;var _0x366f3c=_0xe5c9[_0x5c76fa];return _0x366f3c;};'function'!==typeof String['prototype'][_0x9e5c('0x0')]&&(String[_0x9e5c('0x1')][_0x9e5c('0x0')]=function(){return this[_0x9e5c('0x2')](/^\s+|\s+$/g,'');});function qd_number_format(_0x4d0804,_0x2768d8,_0xc97b96,_0x1019bd){_0x4d0804=(_0x4d0804+'')[_0x9e5c('0x2')](/[^0-9+\-Ee.]/g,'');_0x4d0804=isFinite(+_0x4d0804)?+_0x4d0804:0x0;_0x2768d8=isFinite(+_0x2768d8)?Math[_0x9e5c('0x3')](_0x2768d8):0x0;_0x1019bd=_0x9e5c('0x4')===typeof _0x1019bd?',':_0x1019bd;_0xc97b96=_0x9e5c('0x4')===typeof _0xc97b96?'.':_0xc97b96;var _0x413116='',_0x413116=function(_0x36e64a,_0x5d7b78){var _0x2768d8=Math['pow'](0xa,_0x5d7b78);return''+(Math[_0x9e5c('0x5')](_0x36e64a*_0x2768d8)/_0x2768d8)[_0x9e5c('0x6')](_0x5d7b78);},_0x413116=(_0x2768d8?_0x413116(_0x4d0804,_0x2768d8):''+Math[_0x9e5c('0x5')](_0x4d0804))[_0x9e5c('0x7')]('.');0x3<_0x413116[0x0][_0x9e5c('0x8')]&&(_0x413116[0x0]=_0x413116[0x0][_0x9e5c('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x1019bd));(_0x413116[0x1]||'')[_0x9e5c('0x8')]<_0x2768d8&&(_0x413116[0x1]=_0x413116[0x1]||'',_0x413116[0x1]+=Array(_0x2768d8-_0x413116[0x1][_0x9e5c('0x8')]+0x1)[_0x9e5c('0x9')]('0'));return _0x413116[_0x9e5c('0x9')](_0xc97b96);};(function(_0x5e0c08){'use strict';var _0x1a7e51=jQuery;if(typeof _0x1a7e51['fn'][_0x9e5c('0xa')]==='function')return;var _0x31c2ab='Smart\x20Price';var _0x232d18=function(_0x3913fb,_0x502c9b){if('object'===typeof console&&_0x9e5c('0xb')===typeof console['error']&&'function'===typeof console[_0x9e5c('0xc')]&&_0x9e5c('0xb')===typeof console[_0x9e5c('0xd')]){var _0x58f690;_0x9e5c('0xe')===typeof _0x3913fb?(_0x3913fb[_0x9e5c('0xf')]('['+_0x31c2ab+']\x0a'),_0x58f690=_0x3913fb):_0x58f690=['['+_0x31c2ab+']\x0a'+_0x3913fb];if(_0x9e5c('0x4')===typeof _0x502c9b||'alerta'!==_0x502c9b[_0x9e5c('0x10')]()&&'aviso'!==_0x502c9b['toLowerCase']())if(_0x9e5c('0x4')!==typeof _0x502c9b&&_0x9e5c('0xc')===_0x502c9b[_0x9e5c('0x10')]())try{console[_0x9e5c('0xc')][_0x9e5c('0x11')](console,_0x58f690);}catch(_0x458275){console['info'](_0x58f690[_0x9e5c('0x9')]('\x0a'));}else try{console[_0x9e5c('0x12')][_0x9e5c('0x11')](console,_0x58f690);}catch(_0x5a1b25){console[_0x9e5c('0x12')](_0x58f690[_0x9e5c('0x9')]('\x0a'));}else try{console[_0x9e5c('0xd')][_0x9e5c('0x11')](console,_0x58f690);}catch(_0x41648a){console['warn'](_0x58f690[_0x9e5c('0x9')]('\x0a'));}}};var _0x3309c9=/[0-9]+\%/i;var _0x93a001=/[0-9\.]+(?=\%)/i;var _0x46f3c2={'isDiscountFlag':function(_0x37f41f){if(_0x37f41f['text']()[_0x9e5c('0x13')](_0x3309c9)>-0x1)return!![];return![];},'getDiscountValue':function(_0x207761){return _0x207761[_0x9e5c('0x14')]()[_0x9e5c('0x15')](_0x93a001);},'startedByWrapper':![],'flagElement':_0x9e5c('0x16'),'wrapperElement':'li','filterFlagBy':'[class*=\x27desconto\x27]','forcePromotion':null,'appliedDiscount':null,'oneFlagByItem':!![],'isSmartCheckout':!![],'changeInstallments':![],'productPage':{'changeNativeSaveAmount':!![],'changeNativePrice':!![],'changeInstallments':![],'isProductPage':_0x9e5c('0x17'),'wrapperElement':_0x9e5c('0x18'),'skuBestPrice':_0x9e5c('0x19'),'installments':_0x9e5c('0x1a'),'installmentValue':_0x9e5c('0x1b'),'skuPrice':_0x9e5c('0x1c')}};_0x1a7e51['fn'][_0x9e5c('0xa')]=function(){};var _0x1e6448=function(_0x24d084){var _0x454ab8={'y':_0x9e5c('0x1d')};return function(_0x3ba87e){var _0x5b1ab8,_0x59bbde,_0x54f152,_0x32376c;_0x59bbde=function(_0x5935e4){return _0x5935e4;};_0x54f152=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3ba87e=_0x3ba87e['d'+_0x54f152[0x10]+'c'+_0x54f152[0x11]+'m'+_0x59bbde(_0x54f152[0x1])+'n'+_0x54f152[0xd]]['l'+_0x54f152[0x12]+'c'+_0x54f152[0x0]+'ti'+_0x59bbde('o')+'n'];_0x5b1ab8=function(_0x2d6759){return escape(encodeURIComponent(_0x2d6759['replace'](/\./g,'¨')[_0x9e5c('0x2')](/[a-zA-Z]/g,function(_0x2323b9){return String[_0x9e5c('0x1e')](('Z'>=_0x2323b9?0x5a:0x7a)>=(_0x2323b9=_0x2323b9['charCodeAt'](0x0)+0xd)?_0x2323b9:_0x2323b9-0x1a);})));};var _0x5585c3=_0x5b1ab8(_0x3ba87e[[_0x54f152[0x9],_0x59bbde('o'),_0x54f152[0xc],_0x54f152[_0x59bbde(0xd)]]['join']('')]);_0x5b1ab8=_0x5b1ab8((window[['js',_0x59bbde('no'),'m',_0x54f152[0x1],_0x54f152[0x4]['toUpperCase'](),_0x9e5c('0x1f')][_0x9e5c('0x9')]('')]||'---')+['.v',_0x54f152[0xd],'e',_0x59bbde('x'),'co',_0x59bbde('mm'),_0x9e5c('0x20'),_0x54f152[0x1],'.c',_0x59bbde('o'),'m.',_0x54f152[0x13],'r']['join'](''));for(var _0x1a8d20 in _0x454ab8){if(_0x5b1ab8===_0x1a8d20+_0x454ab8[_0x1a8d20]||_0x5585c3===_0x1a8d20+_0x454ab8[_0x1a8d20]){_0x32376c='tr'+_0x54f152[0x11]+'e';break;}_0x32376c='f'+_0x54f152[0x0]+'ls'+_0x59bbde(_0x54f152[0x1])+'';}_0x59bbde=!0x1;-0x1<_0x3ba87e[[_0x54f152[0xc],'e',_0x54f152[0x0],'rc',_0x54f152[0x9]]['join']('')][_0x9e5c('0x21')](_0x9e5c('0x22'))&&(_0x59bbde=!0x0);return[_0x32376c,_0x59bbde];}(_0x24d084);}(window);if(!eval(_0x1e6448[0x0]))return _0x1e6448[0x1]?_0x232d18('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x177f23=function(_0x3fc27d,_0x39f102){'use strict';var _0x5d3e10=function(_0x2159b1){'use strict';var _0x40da9d,_0x5bb3bc,_0x5e09ff,_0x2a47b1,_0x117150,_0x900da1,_0x4dfdc6,_0x2971e7,_0x498e48,_0x167509,_0x5c8b53,_0x234f11,_0x1fa52f,_0x181f6a,_0x232537,_0x5a671e,_0x3bd177,_0x464796,_0x30f33a;var _0x127b48=_0x1a7e51(this);_0x2159b1=typeof _0x2159b1===_0x9e5c('0x4')?![]:_0x2159b1;if(_0x39f102[_0x9e5c('0x23')][_0x9e5c('0x24')])var _0x401ec8=_0x127b48[_0x9e5c('0x25')](_0x39f102[_0x9e5c('0x23')]['wrapperElement']);else var _0x401ec8=_0x127b48['closest'](_0x39f102[_0x9e5c('0x26')]);if(!_0x2159b1&&!_0x127b48['is'](_0x39f102[_0x9e5c('0x27')])){if(_0x39f102[_0x9e5c('0x23')][_0x9e5c('0x24')]&&_0x401ec8['is'](_0x39f102[_0x9e5c('0x23')]['wrapperElement'])){_0x401ec8[_0x9e5c('0x28')](_0x39f102[_0x9e5c('0x23')]['skuBestPrice'])[_0x9e5c('0x29')](_0x9e5c('0x2a'));_0x401ec8['addClass'](_0x9e5c('0x2b'));}return;}var _0x634fb8=_0x39f102[_0x9e5c('0x23')]['isProductPage'];if(_0x127b48['is'](_0x9e5c('0x2c'))&&!_0x634fb8)return;if(_0x634fb8){_0x2971e7=_0x401ec8[_0x9e5c('0x28')](_0x39f102[_0x9e5c('0x23')][_0x9e5c('0x2d')]);if(_0x2971e7[_0x9e5c('0x28')](_0x9e5c('0x2e'))[_0x9e5c('0x8')])return;_0x2971e7[_0x9e5c('0x2f')]('qd-active');_0x401ec8['removeClass'](_0x9e5c('0x2b'));}if(_0x39f102['oneFlagByItem']&&_0x127b48[_0x9e5c('0x30')]('.qd_sp_on')[_0x9e5c('0x8')]){_0x127b48[_0x9e5c('0x29')]('qd_sp_ignored');return;}_0x127b48['addClass'](_0x9e5c('0x31'));if(!_0x39f102[_0x9e5c('0x32')](_0x127b48))return;if(_0x634fb8){_0x5e09ff={};var _0x516196=parseInt(_0x1a7e51(_0x9e5c('0x33'))['attr'](_0x9e5c('0x34')),0xa);if(_0x516196){for(var _0x516d76=0x0;_0x516d76<skuJson['skus'][_0x9e5c('0x8')];_0x516d76++){if(skuJson[_0x9e5c('0x35')][_0x516d76][_0x9e5c('0x36')]==_0x516196){_0x5e09ff=skuJson[_0x9e5c('0x35')][_0x516d76];break;}}}else{var _0x2194fd=0x5af3107a3fff;for(var _0x1fa2dc in skuJson[_0x9e5c('0x35')]){if(typeof skuJson[_0x9e5c('0x35')][_0x1fa2dc]==='function')continue;if(!skuJson[_0x9e5c('0x35')][_0x1fa2dc]['available'])continue;if(skuJson['skus'][_0x1fa2dc]['bestPrice']<_0x2194fd){_0x2194fd=skuJson['skus'][_0x1fa2dc]['bestPrice'];_0x5e09ff=skuJson[_0x9e5c('0x35')][_0x1fa2dc];}}}}_0x5a671e=!![];_0x3bd177=0x0;if(_0x39f102[_0x9e5c('0x37')]&&_0x464796){_0x5a671e=skuJson[_0x9e5c('0x38')];if(!_0x5a671e)return _0x401ec8[_0x9e5c('0x29')](_0x9e5c('0x39'));}_0x5bb3bc=_0x39f102[_0x9e5c('0x3a')](_0x127b48);_0x40da9d=parseFloat(_0x5bb3bc,0xa);if(isNaN(_0x40da9d))return _0x232d18([_0x9e5c('0x3b'),_0x127b48],_0x9e5c('0x3c'));var _0x5be8c4=function(_0x449cf4){if(_0x634fb8)_0x2a47b1=(_0x449cf4[_0x9e5c('0x3d')]||0x0)/0x64;else{_0x1fa52f=_0x401ec8[_0x9e5c('0x28')](_0x9e5c('0x3e'));_0x2a47b1=parseFloat((_0x1fa52f[_0x9e5c('0x3f')]()||'')['replace'](/[^0-9\.\,]+/i,'')[_0x9e5c('0x2')]('.','')[_0x9e5c('0x2')](',','.'),0xa);}if(isNaN(_0x2a47b1))return _0x232d18(['Por\x20alguma\x20razão\x20não\x20consegui\x20obter\x20o\x20preço\x20deste\x20produto\x20:(',_0x127b48,_0x401ec8]);if(_0x39f102['appliedDiscount']!==null){_0x181f6a=0x0;if(!isNaN(_0x39f102[_0x9e5c('0x40')]))_0x181f6a=_0x39f102[_0x9e5c('0x40')];else{_0x232537=_0x401ec8['find'](_0x39f102['appliedDiscount']);if(_0x232537['length'])_0x181f6a=_0x39f102['getDiscountValue'](_0x232537);}_0x181f6a=parseFloat(_0x181f6a,0xa);if(isNaN(_0x181f6a))_0x181f6a=0x0;if(_0x181f6a!==0x0)_0x2a47b1=_0x2a47b1*0x64/(0x64-_0x181f6a);}if(_0x634fb8)_0x117150=(_0x449cf4[_0x9e5c('0x41')]||0x0)/0x64;else _0x117150=parseFloat((_0x401ec8[_0x9e5c('0x28')]('.qd_productOldPrice')[_0x9e5c('0x3f')]()||'')['replace'](/[^0-9\.\,]+/i,'')[_0x9e5c('0x2')]('.','')[_0x9e5c('0x2')](',','.'),0xa);if(isNaN(_0x117150))_0x117150=0.001;_0x900da1=_0x2a47b1*((0x64-_0x40da9d)/0x64);if(_0x634fb8&&_0x39f102['productPage']['changeNativePrice']){_0x2971e7[_0x9e5c('0x14')](_0x2971e7[_0x9e5c('0x14')]()[_0x9e5c('0x0')]()[_0x9e5c('0x2')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x900da1,0x2,',','.')))['addClass'](_0x9e5c('0x2a'));_0x401ec8[_0x9e5c('0x29')](_0x9e5c('0x2b'));}else{_0x30f33a=_0x401ec8[_0x9e5c('0x28')](_0x9e5c('0x42'));_0x30f33a[_0x9e5c('0x14')](_0x30f33a['text']()[_0x9e5c('0x2')](/[0-9\.]+,[0-9]+/i,'')+qd_number_format(_0x900da1,0x2,',','.'));}if(_0x634fb8){_0x4dfdc6=_0x401ec8[_0x9e5c('0x28')](_0x39f102[_0x9e5c('0x23')][_0x9e5c('0x43')]);if(_0x4dfdc6[_0x9e5c('0x8')])_0x4dfdc6['text'](_0x4dfdc6[_0x9e5c('0x14')]()[_0x9e5c('0x0')]()[_0x9e5c('0x2')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x900da1,0x2,',','.')));}var _0x32f65c=_0x401ec8[_0x9e5c('0x28')](_0x9e5c('0x44'));_0x32f65c['text'](_0x32f65c['text']()[_0x9e5c('0x2')](/[0-9]+\%/i,_0x40da9d+'%'));var _0xef3f1f=function(_0x1197e8,_0x76ef48,_0x22d9bc){var _0x3be9bf=_0x401ec8[_0x9e5c('0x28')](_0x1197e8);if(_0x3be9bf[_0x9e5c('0x8')])_0x3be9bf['html'](_0x3be9bf[_0x9e5c('0x45')]()['trim']()['replace'](/[0-9]{1,2}/,_0x22d9bc?_0x22d9bc:_0x449cf4['installments']||0x0));var _0x322e0e=_0x401ec8['find'](_0x76ef48);if(_0x322e0e[_0x9e5c('0x8')])_0x322e0e[_0x9e5c('0x45')](_0x322e0e[_0x9e5c('0x45')]()[_0x9e5c('0x0')]()[_0x9e5c('0x2')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x900da1/(_0x22d9bc?_0x22d9bc:_0x449cf4[_0x9e5c('0x46')]||0x1),0x2,',','.')));};if(_0x634fb8&&_0x39f102[_0x9e5c('0x23')][_0x9e5c('0x47')])_0xef3f1f(_0x39f102['productPage'][_0x9e5c('0x46')],_0x39f102[_0x9e5c('0x23')][_0x9e5c('0x48')]);else if(_0x39f102[_0x9e5c('0x47')])_0xef3f1f(_0x9e5c('0x49'),'.qd_sp_display_installmentValue',parseInt(_0x401ec8[_0x9e5c('0x28')](_0x9e5c('0x4a'))[_0x9e5c('0x3f')]()||0x1)||0x1);_0x401ec8['find'](_0x9e5c('0x4b'))[_0x9e5c('0x4c')](qd_number_format(_0x117150-_0x900da1,0x2,',','.'));_0x401ec8[_0x9e5c('0x28')]('.qd_saveAmountPercent')[_0x9e5c('0x4d')](qd_number_format((_0x117150-_0x900da1)*0x64/_0x117150,0x2,',','.'));if(_0x634fb8&&_0x39f102['productPage']['changeNativeSaveAmount']){_0x1a7e51(_0x9e5c('0x4e'))['each'](function(){_0x5c8b53=_0x1a7e51(this);_0x5c8b53['text'](_0x5c8b53[_0x9e5c('0x14')]()['trim']()['replace'](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x117150-_0x900da1,0x2,',','.')));_0x5c8b53[_0x9e5c('0x29')](_0x9e5c('0x2a'));});}};_0x5be8c4(_0x5e09ff);if(_0x634fb8)_0x1a7e51(window)['on'](_0x9e5c('0x4f'),function(_0x2d1efa,_0x4d8709,_0x40019a){_0x5be8c4(_0x40019a);});_0x401ec8[_0x9e5c('0x29')](_0x9e5c('0x50'));if(!_0x634fb8)_0x1fa52f[_0x9e5c('0x29')](_0x9e5c('0x50'));};(_0x39f102[_0x9e5c('0x51')]?_0x3fc27d[_0x9e5c('0x28')](_0x39f102['flagElement']):_0x3fc27d)[_0x9e5c('0x52')](function(){_0x5d3e10[_0x9e5c('0x53')](this,![]);});if(typeof _0x39f102[_0x9e5c('0x54')]==_0x9e5c('0x55')){var _0x498416=_0x39f102[_0x9e5c('0x51')]?_0x3fc27d:_0x3fc27d['closest'](_0x39f102[_0x9e5c('0x26')]);if(_0x39f102[_0x9e5c('0x23')][_0x9e5c('0x24')])_0x498416=_0x498416[_0x9e5c('0x25')](_0x39f102[_0x9e5c('0x23')][_0x9e5c('0x26')])[_0x9e5c('0x56')]('.qd_sp_processedItem');else _0x498416=_0x498416['find'](_0x9e5c('0x57'));_0x498416[_0x9e5c('0x52')](function(){var _0x4a2737=_0x1a7e51(_0x39f102[_0x9e5c('0x54')]);_0x4a2737[_0x9e5c('0x58')]('style',_0x9e5c('0x59'));if(_0x39f102[_0x9e5c('0x23')][_0x9e5c('0x24')])_0x1a7e51(this)['append'](_0x4a2737);else _0x1a7e51(this)[_0x9e5c('0x5a')](_0x4a2737);_0x5d3e10['call'](_0x4a2737,!![]);});}};_0x1a7e51['fn'][_0x9e5c('0xa')]=function(_0x2ec11b){var _0x2aff81=_0x1a7e51(this);if(!_0x2aff81[_0x9e5c('0x8')])return _0x2aff81;var _0xc72512=_0x1a7e51[_0x9e5c('0x5b')](!![],{},_0x46f3c2,_0x2ec11b);if(typeof _0xc72512[_0x9e5c('0x23')][_0x9e5c('0x24')]!=_0x9e5c('0x5c'))_0xc72512[_0x9e5c('0x23')]['isProductPage']=_0x1a7e51(document[_0x9e5c('0x5d')])['is'](_0x9e5c('0x5e'));_0x177f23(_0x2aff81,_0xc72512);return _0x2aff81;};}(this));

// amazing menu
var _0xd7e3=['apply','join','qdAmAddNdx','each','qd-am-li-','first','qd-am-first','last','addClass','rnaqevavfgber%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','charCodeAt','toUpperCase','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','find','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','url','html','img[alt=\x27','attr','data-qdam-value','.box-banner','insertBefore','hide','qd-am-content-loaded','text','trim','[class*=\x27colunas\x27]','clone','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','alerta','li\x20>ul','qd-am-has-ul','children',':not(ul)','qd-am-elem-','replaceSpecialChars','>li','qd-amazing-menu','>ul','qd-am-column','qd-am-dropdown','qd-am-','-li','callback','QuatroDigital.am.callback','extend','exec','getParent','closest','QD_amazingMenu','function','QD\x20Amazing\x20Menu','undefined','error','info','warn','unshift','toLowerCase'];(function(_0x15fe2a,_0x3d6873){var _0x5edaae=function(_0x31b058){while(--_0x31b058){_0x15fe2a['push'](_0x15fe2a['shift']());}};_0x5edaae(++_0x3d6873);}(_0xd7e3,0xd9));var _0x3d7e=function(_0xeeee77,_0x3a2568){_0xeeee77=_0xeeee77-0x0;var _0x50e49b=_0xd7e3[_0xeeee77];return _0x50e49b;};(function(_0x2f6e43){_0x2f6e43['fn'][_0x3d7e('0x0')]=_0x2f6e43['fn'][_0x3d7e('0x1')];}(jQuery));(function(_0x3d1a29){'use strict';var _0x1fcf73,_0x20c9ed,_0xc61c1b,_0x13d488;_0x1fcf73=jQuery;if(typeof _0x1fcf73['fn'][_0x3d7e('0x2')]===_0x3d7e('0x3'))return;_0x20c9ed={'url':'/qd-amazing-menu','callback':function(){},'ajaxCallback':function(){}};var _0x54ef02=_0x3d7e('0x4');var _0xfcaf57=function(_0x238d60,_0x534b04){if('object'===typeof console&&_0x3d7e('0x5')!==typeof console[_0x3d7e('0x6')]&&_0x3d7e('0x5')!==typeof console[_0x3d7e('0x7')]&&'undefined'!==typeof console[_0x3d7e('0x8')]){var _0x5013da;'object'===typeof _0x238d60?(_0x238d60[_0x3d7e('0x9')]('['+_0x54ef02+']\x0a'),_0x5013da=_0x238d60):_0x5013da=['['+_0x54ef02+']\x0a'+_0x238d60];if(_0x3d7e('0x5')===typeof _0x534b04||'alerta'!==_0x534b04[_0x3d7e('0xa')]()&&'aviso'!==_0x534b04[_0x3d7e('0xa')]())if(_0x3d7e('0x5')!==typeof _0x534b04&&'info'===_0x534b04[_0x3d7e('0xa')]())try{console['info']['apply'](console,_0x5013da);}catch(_0x5a34d2){try{console[_0x3d7e('0x7')](_0x5013da['join']('\x0a'));}catch(_0x54dd85){}}else try{console['error'][_0x3d7e('0xb')](console,_0x5013da);}catch(_0x74d2eb){try{console['error'](_0x5013da['join']('\x0a'));}catch(_0x28ddd9){}}else try{console['warn'][_0x3d7e('0xb')](console,_0x5013da);}catch(_0x4a3fb6){try{console['warn'](_0x5013da[_0x3d7e('0xc')]('\x0a'));}catch(_0xbb1781){}}}};_0x1fcf73['fn'][_0x3d7e('0xd')]=function(){var _0x2add7e=_0x1fcf73(this);_0x2add7e[_0x3d7e('0xe')](function(_0x456511){_0x1fcf73(this)['addClass'](_0x3d7e('0xf')+_0x456511);});_0x2add7e[_0x3d7e('0x10')]()['addClass'](_0x3d7e('0x11'));_0x2add7e[_0x3d7e('0x12')]()[_0x3d7e('0x13')]('qd-am-last');return _0x2add7e;};_0x1fcf73['fn'][_0x3d7e('0x2')]=function(){};var _0x4c92dd=function(_0x442e6c){var _0x4da03b={'y':_0x3d7e('0x14')};return function(_0x4140b1){var _0x279932,_0x1351f1,_0x10bcfd,_0x4bc526;_0x1351f1=function(_0x455b7c){return _0x455b7c;};_0x10bcfd=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4140b1=_0x4140b1['d'+_0x10bcfd[0x10]+'c'+_0x10bcfd[0x11]+'m'+_0x1351f1(_0x10bcfd[0x1])+'n'+_0x10bcfd[0xd]]['l'+_0x10bcfd[0x12]+'c'+_0x10bcfd[0x0]+'ti'+_0x1351f1('o')+'n'];_0x279932=function(_0x52c1fd){return escape(encodeURIComponent(_0x52c1fd[_0x3d7e('0x15')](/\./g,'¨')[_0x3d7e('0x15')](/[a-zA-Z]/g,function(_0x26558e){return String['fromCharCode'](('Z'>=_0x26558e?0x5a:0x7a)>=(_0x26558e=_0x26558e[_0x3d7e('0x16')](0x0)+0xd)?_0x26558e:_0x26558e-0x1a);})));};var _0x3fb908=_0x279932(_0x4140b1[[_0x10bcfd[0x9],_0x1351f1('o'),_0x10bcfd[0xc],_0x10bcfd[_0x1351f1(0xd)]][_0x3d7e('0xc')]('')]);_0x279932=_0x279932((window[['js',_0x1351f1('no'),'m',_0x10bcfd[0x1],_0x10bcfd[0x4][_0x3d7e('0x17')](),'ite'][_0x3d7e('0xc')]('')]||'---')+['.v',_0x10bcfd[0xd],'e',_0x1351f1('x'),'co',_0x1351f1('mm'),_0x3d7e('0x18'),_0x10bcfd[0x1],'.c',_0x1351f1('o'),'m.',_0x10bcfd[0x13],'r']['join'](''));for(var _0x35a311 in _0x4da03b){if(_0x279932===_0x35a311+_0x4da03b[_0x35a311]||_0x3fb908===_0x35a311+_0x4da03b[_0x35a311]){_0x4bc526='tr'+_0x10bcfd[0x11]+'e';break;}_0x4bc526='f'+_0x10bcfd[0x0]+'ls'+_0x1351f1(_0x10bcfd[0x1])+'';}_0x1351f1=!0x1;-0x1<_0x4140b1[[_0x10bcfd[0xc],'e',_0x10bcfd[0x0],'rc',_0x10bcfd[0x9]][_0x3d7e('0xc')]('')][_0x3d7e('0x19')](_0x3d7e('0x1a'))&&(_0x1351f1=!0x0);return[_0x4bc526,_0x1351f1];}(_0x442e6c);}(window);if(!eval(_0x4c92dd[0x0]))return _0x4c92dd[0x1]?_0xfcaf57('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x13d488=function(_0x1d3f09){var _0x4e3c09,_0x5d5319,_0x33d3ee;_0x33d3ee=_0x1d3f09[_0x3d7e('0x1b')](_0x3d7e('0x1c'));_0x4e3c09=_0x33d3ee[_0x3d7e('0x1d')](_0x3d7e('0x1e'));_0x5d5319=_0x33d3ee['filter'](_0x3d7e('0x1f'));if(!(_0x4e3c09[_0x3d7e('0x20')]||_0x5d5319[_0x3d7e('0x20')]))return;_0x4e3c09[_0x3d7e('0x21')]()['addClass'](_0x3d7e('0x22'));_0x5d5319[_0x3d7e('0x21')]()[_0x3d7e('0x13')](_0x3d7e('0x23'));_0x1fcf73[_0x3d7e('0x24')]({'url':_0xc61c1b[_0x3d7e('0x25')],'dataType':_0x3d7e('0x26'),'success':function(_0x489305){var _0x5d8e4d=_0x1fcf73(_0x489305);_0x4e3c09['each'](function(){var _0x4bcc03,_0x8ebee5;_0x8ebee5=_0x1fcf73(this);_0x4bcc03=_0x5d8e4d[_0x3d7e('0x1b')](_0x3d7e('0x27')+_0x8ebee5[_0x3d7e('0x28')](_0x3d7e('0x29'))+'\x27]');if(!_0x4bcc03[_0x3d7e('0x20')])return;_0x4bcc03[_0x3d7e('0xe')](function(){_0x1fcf73(this)[_0x3d7e('0x0')](_0x3d7e('0x2a'))['clone']()[_0x3d7e('0x2b')](_0x8ebee5);});_0x8ebee5[_0x3d7e('0x2c')]();})[_0x3d7e('0x13')](_0x3d7e('0x2d'));_0x5d5319[_0x3d7e('0xe')](function(){var _0x21bc1b={},_0x4e102a;_0x4e102a=_0x1fcf73(this);_0x5d8e4d[_0x3d7e('0x1b')]('h2')[_0x3d7e('0xe')](function(){if(_0x1fcf73(this)[_0x3d7e('0x2e')]()[_0x3d7e('0x2f')]()[_0x3d7e('0xa')]()==_0x4e102a['attr'](_0x3d7e('0x29'))[_0x3d7e('0x2f')]()[_0x3d7e('0xa')]()){_0x21bc1b=_0x1fcf73(this);return![];}});if(!_0x21bc1b[_0x3d7e('0x20')])return;_0x21bc1b[_0x3d7e('0xe')](function(){_0x1fcf73(this)[_0x3d7e('0x0')](_0x3d7e('0x30'))[_0x3d7e('0x31')]()[_0x3d7e('0x2b')](_0x4e102a);});_0x4e102a['hide']();})['addClass'](_0x3d7e('0x2d'));},'error':function(){_0xfcaf57(_0x3d7e('0x32')+_0xc61c1b[_0x3d7e('0x25')]+_0x3d7e('0x33'));},'complete':function(){_0xc61c1b[_0x3d7e('0x34')][_0x3d7e('0x35')](this);_0x1fcf73(window)[_0x3d7e('0x36')](_0x3d7e('0x37'),_0x1d3f09);},'clearQueueDelay':0xbb8});};_0x1fcf73[_0x3d7e('0x2')]=function(_0x5b3d18){var _0x1958f1=_0x5b3d18['find'](_0x3d7e('0x38'))['each'](function(){var _0x16eca1,_0x74567d,_0x4a9372,_0x33858b;_0x16eca1=_0x1fcf73(this);if(!_0x16eca1[_0x3d7e('0x20')])return _0xfcaf57([_0x3d7e('0x39'),_0x5b3d18],_0x3d7e('0x3a'));_0x16eca1[_0x3d7e('0x1b')](_0x3d7e('0x3b'))[_0x3d7e('0x21')]()['addClass'](_0x3d7e('0x3c'));_0x16eca1[_0x3d7e('0x1b')]('li')['each'](function(){var _0x131b24=_0x1fcf73(this),_0xba2b18;_0xba2b18=_0x131b24[_0x3d7e('0x3d')](_0x3d7e('0x3e'));if(!_0xba2b18[_0x3d7e('0x20')])return;_0x131b24[_0x3d7e('0x13')](_0x3d7e('0x3f')+_0xba2b18[_0x3d7e('0x10')]()['text']()[_0x3d7e('0x2f')]()[_0x3d7e('0x40')]()['replace'](/\./g,'')[_0x3d7e('0x15')](/\s/g,'-')[_0x3d7e('0xa')]());});_0x74567d=_0x16eca1['find'](_0x3d7e('0x41'))[_0x3d7e('0xd')]();_0x16eca1['addClass'](_0x3d7e('0x42'));_0x4a9372=_0x74567d['find'](_0x3d7e('0x43'));_0x4a9372['each'](function(){var _0xfd2b2e=_0x1fcf73(this),_0x4a09c9;_0x4a09c9=_0xfd2b2e[_0x3d7e('0x1b')](_0x3d7e('0x41'))[_0x3d7e('0xd')]()[_0x3d7e('0x13')](_0x3d7e('0x44'));_0xfd2b2e[_0x3d7e('0x13')]('qd-am-dropdown-menu');_0xfd2b2e[_0x3d7e('0x21')]()[_0x3d7e('0x13')](_0x3d7e('0x45'));});_0x4a9372[_0x3d7e('0x13')](_0x3d7e('0x45'));var _0x229e09=0x0;var _0x4c4701=function(_0x5a0bfe){_0x229e09=_0x229e09+0x1;var _0x210840=_0x5a0bfe[_0x3d7e('0x3d')]('li');var _0x14c56a=_0x210840[_0x3d7e('0x3d')]('*');if(!_0x14c56a[_0x3d7e('0x20')])return;_0x14c56a[_0x3d7e('0x13')]('qd-am-level-'+_0x229e09);_0x4c4701(_0x14c56a);};_0x4c4701(_0x16eca1);_0x16eca1['add'](_0x16eca1[_0x3d7e('0x1b')]('ul'))[_0x3d7e('0xe')](function(){var _0x16fc9c=_0x1fcf73(this);_0x16fc9c[_0x3d7e('0x13')](_0x3d7e('0x46')+_0x16fc9c[_0x3d7e('0x3d')]('li')[_0x3d7e('0x20')]+_0x3d7e('0x47'));});});_0x13d488(_0x1958f1);_0xc61c1b[_0x3d7e('0x48')][_0x3d7e('0x35')](this);_0x1fcf73(window)[_0x3d7e('0x36')](_0x3d7e('0x49'),_0x5b3d18);};_0x1fcf73['fn'][_0x3d7e('0x2')]=function(_0x3d4a46){var _0x1f08e8=_0x1fcf73(this);if(!_0x1f08e8[_0x3d7e('0x20')])return _0x1f08e8;_0xc61c1b=_0x1fcf73[_0x3d7e('0x4a')]({},_0x20c9ed,_0x3d4a46);_0x1f08e8[_0x3d7e('0x4b')]=new _0x1fcf73[(_0x3d7e('0x2'))](_0x1fcf73(this));return _0x1f08e8;};_0x1fcf73(function(){_0x1fcf73('.qd_amazing_menu_auto')['QD_amazingMenu']();});}(this));

// smart cart
var _0x3d92=['texts','cartTotal','#value','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','find','.qd-ddc-viewCart','html','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','.qd-ddc-emptyCart\x20p','emptyCart','append','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','body','removeClass','qd-bb-lightBoxBodyProdAdd','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text','.qd-ddc-shipping\x20.qd-ddc-cep','val','keyup.qd_ddc_cep','formatCepField','click','.qd-ddc-cep-btn','preventDefault','.qd-ddc-cep-close','hide','off','click._QD_DDC_closeShipping','.qd-ddc-cep-tooltip','.qd-ddc-cep-ok','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','each','clone','call','.qd-ddc-infoTotalValue','total','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','allTotal','Atenção,\x20você\x20esta\x20utilizando\x20um\x20método\x20descontinuado','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','getCartInfoByUrl','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','getOrderForm','_QuatroDigital_AmountProduct','exec','totalizers','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','addClass','.qd-ddc-prodWrapper2','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22>','<div\x20class=\x22qd-ddc-prodImgWrapper\x22>','<img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/>','</div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22>','<input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a>','<span\x20class=\x22qd-ddc-prodRowLoading\x22></span>','productCategoryIds','attr','qd-ddc-','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','meta[name=currency]','content','.qd-ddc-quantity','quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','add','.qd-ddc-shipping\x20input','address','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','filter','[data-sku=\x27','lastSku','outerHeight','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','qd-ddc-cart-empty','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','forceImageHTTPS','string','qd-loaded','load','src','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','keyup.qd_ddc_change','click.qd_ddc_remove','stop','$1-$2$3','data','qdDdcLastPostalCode','calculateShipping','BRA','.qd-dd-cep-slas','remove','logisticsInfo','slas','<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>','shippingEstimate','\x20dia\x20útil','\x20dias\x20útéis','<td>\x20R$\x20','</td><td>','\x20para\x20o\x20CEP\x20','</td>','tbody','insertBefore','.qd-ddc-cep-tooltip-text','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','updateItems','done','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','boolean','removeProduct','index','removeItems','Atenção,\x20este\x20método\x20esta\x20descontinuado.','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','buyButtonClicked','quickViewUpdate','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-wrapper','.qd-bap-item-added','input.qd-productId[value=','prodId','.qd-bap-qtt','qtt','.qd_bap_wrapper_content','prepend','qd-bap-item-added','productId','prod_','ajaxStop','Quatro\x20Digital\x20-\x20Plus\x20Smart\x20Cart','.qdDdcContainer','QD_smartCart','dropDown','buyButton','selector','smartCart','getParent','closest','replace','abs','undefined','pow','round','split','length','join','_QuatroDigital_CartData','callback','Callbacks','error','function','Oooops!\x20','message','object','info','unshift','alerta','toLowerCase','aviso','apply','warn','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','rnaqevavfgber%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','ite','---','erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','skuName','name','extend','smartCheckout','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','cartContainer','<div\x20class=\x22qd-ddc-wrapper2\x22>','<div\x20class=\x22qd_ddc_lightBoxClose\x22></div>','<div\x20class=\x22qd-ddc-wrapper3\x22>','<div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div>','<span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div>','<div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22>','<div\x20class=\x22qd-ddc-infoTotal\x22></div>','<div\x20class=\x22qd-ddc-infoBts\x22>','<a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a>','</div></div></div></div></div>'];(function(_0xd242f4,_0xd23346){var _0x8b0e7c=function(_0x52eac4){while(--_0x52eac4){_0xd242f4['push'](_0xd242f4['shift']());}};_0x8b0e7c(++_0xd23346);}(_0x3d92,0x1e1));var _0x23d9=function(_0x4c46e7,_0x69c3b){_0x4c46e7=_0x4c46e7-0x0;var _0x3a4610=_0x3d92[_0x4c46e7];return _0x3a4610;};(function(_0x15d2e6){_0x15d2e6['fn'][_0x23d9('0x0')]=_0x15d2e6['fn'][_0x23d9('0x1')];}(jQuery));function qd_number_format(_0x350f96,_0x571059,_0x145beb,_0xcb0174){_0x350f96=(_0x350f96+'')[_0x23d9('0x2')](/[^0-9+\-Ee.]/g,'');_0x350f96=isFinite(+_0x350f96)?+_0x350f96:0x0;_0x571059=isFinite(+_0x571059)?Math[_0x23d9('0x3')](_0x571059):0x0;_0xcb0174=_0x23d9('0x4')===typeof _0xcb0174?',':_0xcb0174;_0x145beb=_0x23d9('0x4')===typeof _0x145beb?'.':_0x145beb;var _0x29b39d='',_0x29b39d=function(_0x14fcfc,_0xe8e003){var _0x571059=Math[_0x23d9('0x5')](0xa,_0xe8e003);return''+(Math[_0x23d9('0x6')](_0x14fcfc*_0x571059)/_0x571059)['toFixed'](_0xe8e003);},_0x29b39d=(_0x571059?_0x29b39d(_0x350f96,_0x571059):''+Math['round'](_0x350f96))[_0x23d9('0x7')]('.');0x3<_0x29b39d[0x0][_0x23d9('0x8')]&&(_0x29b39d[0x0]=_0x29b39d[0x0][_0x23d9('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0xcb0174));(_0x29b39d[0x1]||'')[_0x23d9('0x8')]<_0x571059&&(_0x29b39d[0x1]=_0x29b39d[0x1]||'',_0x29b39d[0x1]+=Array(_0x571059-_0x29b39d[0x1][_0x23d9('0x8')]+0x1)[_0x23d9('0x9')]('0'));return _0x29b39d[_0x23d9('0x9')](_0x145beb);};(function(){'use strict';try{window[_0x23d9('0xa')]=window[_0x23d9('0xa')]||{};window[_0x23d9('0xa')][_0x23d9('0xb')]=window[_0x23d9('0xa')][_0x23d9('0xb')]||$[_0x23d9('0xc')]();}catch(_0x31bc66){if(typeof console!==_0x23d9('0x4')&&typeof console[_0x23d9('0xd')]===_0x23d9('0xe'))console[_0x23d9('0xd')](_0x23d9('0xf'),_0x31bc66[_0x23d9('0x10')]);}}());(function(_0x245429){'use strict';try{var _0x400cf1=jQuery;var _0x1020ac='Quatro\x20Digital\x20-\x20DropDown\x20Cart';var _0x4b80d7=function(_0x95fe0c,_0x709938){if(_0x23d9('0x11')===typeof console&&_0x23d9('0x4')!==typeof console[_0x23d9('0xd')]&&_0x23d9('0x4')!==typeof console[_0x23d9('0x12')]&&_0x23d9('0x4')!==typeof console['warn']){var _0x4140ca;'object'===typeof _0x95fe0c?(_0x95fe0c[_0x23d9('0x13')]('['+_0x1020ac+']\x0a'),_0x4140ca=_0x95fe0c):_0x4140ca=['['+_0x1020ac+']\x0a'+_0x95fe0c];if(_0x23d9('0x4')===typeof _0x709938||_0x23d9('0x14')!==_0x709938[_0x23d9('0x15')]()&&_0x23d9('0x16')!==_0x709938[_0x23d9('0x15')]())if(_0x23d9('0x4')!==typeof _0x709938&&'info'===_0x709938['toLowerCase']())try{console[_0x23d9('0x12')][_0x23d9('0x17')](console,_0x4140ca);}catch(_0x243d28){try{console[_0x23d9('0x12')](_0x4140ca[_0x23d9('0x9')]('\x0a'));}catch(_0x1d1ab3){}}else try{console['error'][_0x23d9('0x17')](console,_0x4140ca);}catch(_0x13290a){try{console[_0x23d9('0xd')](_0x4140ca[_0x23d9('0x9')]('\x0a'));}catch(_0x1e1bf8){}}else try{console[_0x23d9('0x18')][_0x23d9('0x17')](console,_0x4140ca);}catch(_0x1b8f41){try{console[_0x23d9('0x18')](_0x4140ca[_0x23d9('0x9')]('\x0a'));}catch(_0x41358b){}}}};window['_QuatroDigital_DropDown']=window[_0x23d9('0x19')]||{};window['_QuatroDigital_DropDown'][_0x23d9('0x1a')]=!![];_0x400cf1[_0x23d9('0x1b')]=function(){};_0x400cf1['fn'][_0x23d9('0x1b')]=function(){return{'fn':new _0x400cf1()};};var _0x53a9e7=function(_0x7bf952){var _0x21baf3={'y':_0x23d9('0x1c')};return function(_0xedd557){var _0xda7bce,_0x34a685,_0x148d84,_0x332958;_0x34a685=function(_0x14bafb){return _0x14bafb;};_0x148d84=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0xedd557=_0xedd557['d'+_0x148d84[0x10]+'c'+_0x148d84[0x11]+'m'+_0x34a685(_0x148d84[0x1])+'n'+_0x148d84[0xd]]['l'+_0x148d84[0x12]+'c'+_0x148d84[0x0]+'ti'+_0x34a685('o')+'n'];_0xda7bce=function(_0x4a3ba5){return escape(encodeURIComponent(_0x4a3ba5[_0x23d9('0x2')](/\./g,'¨')[_0x23d9('0x2')](/[a-zA-Z]/g,function(_0x176051){return String[_0x23d9('0x1d')](('Z'>=_0x176051?0x5a:0x7a)>=(_0x176051=_0x176051['charCodeAt'](0x0)+0xd)?_0x176051:_0x176051-0x1a);})));};var _0x459e77=_0xda7bce(_0xedd557[[_0x148d84[0x9],_0x34a685('o'),_0x148d84[0xc],_0x148d84[_0x34a685(0xd)]][_0x23d9('0x9')]('')]);_0xda7bce=_0xda7bce((window[['js',_0x34a685('no'),'m',_0x148d84[0x1],_0x148d84[0x4]['toUpperCase'](),_0x23d9('0x1e')]['join']('')]||_0x23d9('0x1f'))+['.v',_0x148d84[0xd],'e',_0x34a685('x'),'co',_0x34a685('mm'),_0x23d9('0x20'),_0x148d84[0x1],'.c',_0x34a685('o'),'m.',_0x148d84[0x13],'r'][_0x23d9('0x9')](''));for(var _0xca6b8f in _0x21baf3){if(_0xda7bce===_0xca6b8f+_0x21baf3[_0xca6b8f]||_0x459e77===_0xca6b8f+_0x21baf3[_0xca6b8f]){_0x332958='tr'+_0x148d84[0x11]+'e';break;}_0x332958='f'+_0x148d84[0x0]+'ls'+_0x34a685(_0x148d84[0x1])+'';}_0x34a685=!0x1;-0x1<_0xedd557[[_0x148d84[0xc],'e',_0x148d84[0x0],'rc',_0x148d84[0x9]][_0x23d9('0x9')]('')][_0x23d9('0x21')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x34a685=!0x0);return[_0x332958,_0x34a685];}(_0x7bf952);}(window);if(!eval(_0x53a9e7[0x0]))return _0x53a9e7[0x1]?_0x4b80d7(_0x23d9('0x22')):!0x1;_0x400cf1[_0x23d9('0x1b')]=function(_0xe783aa,_0x2f065b){var _0xb2813c,_0x129ded,_0x126ef6,_0x1b9b10,_0x214303,_0x439759,_0x4c0582,_0x230399,_0x45c8db,_0x564cdc,_0x42eaa0,_0x459f4e;_0x42eaa0=_0x400cf1(_0xe783aa);if(!_0x42eaa0[_0x23d9('0x8')])return _0x42eaa0;_0xb2813c={'updateOnlyHover':!![],'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':_0x23d9('0x23'),'cartTotal':_0x23d9('0x24'),'emptyCart':_0x23d9('0x25'),'continueShopping':_0x23d9('0x26'),'shippingForm':'<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!![],'forceImageHTTPS':![],'skuName':function(_0xd053d2){return _0xd053d2[_0x23d9('0x27')]||_0xd053d2[_0x23d9('0x28')];},'callback':function(){},'callbackProductsList':function(){}};_0x129ded=_0x400cf1[_0x23d9('0x29')](!![],{},_0xb2813c,_0x2f065b);_0x126ef6=_0x400cf1('');_0x564cdc=this;if(_0x129ded[_0x23d9('0x2a')]){var _0x324c15=![];if(typeof window[_0x23d9('0x2b')]===_0x23d9('0x4')){_0x4b80d7(_0x23d9('0x2c'));_0x400cf1['ajax']({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':![],'dataType':_0x23d9('0x2d'),'error':function(){_0x4b80d7(_0x23d9('0x2e'));_0x324c15=!![];}});}if(_0x324c15)return _0x4b80d7(_0x23d9('0x2f'));}var _0x4b1f1c;if(typeof window['vtexjs']==='object'&&typeof window[_0x23d9('0x2b')]['checkout']!==_0x23d9('0x4'))_0x4b1f1c=window[_0x23d9('0x2b')][_0x23d9('0x30')];else if(typeof vtex===_0x23d9('0x11')&&typeof vtex[_0x23d9('0x30')]===_0x23d9('0x11')&&typeof vtex['checkout'][_0x23d9('0x31')]!==_0x23d9('0x4'))_0x4b1f1c=new vtex[(_0x23d9('0x30'))]['SDK']();else return _0x4b80d7('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x564cdc[_0x23d9('0x32')]='<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22>'+_0x23d9('0x33')+_0x23d9('0x34')+_0x23d9('0x35')+_0x23d9('0x36')+'<div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div>'+_0x23d9('0x37')+_0x23d9('0x38')+'<div\x20class=\x22qd-ddc-shipping\x22></div>'+_0x23d9('0x39')+_0x23d9('0x3a')+_0x23d9('0x3b')+_0x23d9('0x3c');_0x439759=function(_0x35ffc1){var _0x241dd8=_0x400cf1(_0x35ffc1);_0x129ded[_0x23d9('0x3d')]['cartTotal']=_0x129ded[_0x23d9('0x3d')][_0x23d9('0x3e')]['replace'](_0x23d9('0x3f'),'<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>');_0x129ded[_0x23d9('0x3d')][_0x23d9('0x3e')]=_0x129ded[_0x23d9('0x3d')][_0x23d9('0x3e')][_0x23d9('0x2')](_0x23d9('0x40'),_0x23d9('0x41'));_0x129ded['texts'][_0x23d9('0x3e')]=_0x129ded[_0x23d9('0x3d')][_0x23d9('0x3e')]['replace'](_0x23d9('0x42'),_0x23d9('0x43'));_0x129ded[_0x23d9('0x3d')]['cartTotal']=_0x129ded[_0x23d9('0x3d')]['cartTotal'][_0x23d9('0x2')](_0x23d9('0x44'),_0x23d9('0x45'));_0x241dd8[_0x23d9('0x46')](_0x23d9('0x47'))[_0x23d9('0x48')](_0x129ded['texts']['linkCart']);_0x241dd8[_0x23d9('0x46')](_0x23d9('0x49'))['html'](_0x129ded[_0x23d9('0x3d')][_0x23d9('0x4a')]);_0x241dd8[_0x23d9('0x46')](_0x23d9('0x4b'))[_0x23d9('0x48')](_0x129ded[_0x23d9('0x3d')][_0x23d9('0x4c')]);_0x241dd8['find'](_0x23d9('0x4d'))[_0x23d9('0x48')](_0x129ded[_0x23d9('0x3d')]['cartTotal']);_0x241dd8[_0x23d9('0x46')](_0x23d9('0x4e'))['html'](_0x129ded[_0x23d9('0x3d')]['shippingForm']);_0x241dd8[_0x23d9('0x46')](_0x23d9('0x4f'))[_0x23d9('0x48')](_0x129ded['texts'][_0x23d9('0x50')]);return _0x241dd8;};_0x214303=function(_0x1c98cc){_0x400cf1(this)[_0x23d9('0x51')](_0x1c98cc);_0x1c98cc[_0x23d9('0x46')](_0x23d9('0x52'))['add'](_0x400cf1(_0x23d9('0x53')))['on'](_0x23d9('0x54'),function(){_0x42eaa0['removeClass'](_0x23d9('0x55'));_0x400cf1(document[_0x23d9('0x56')])[_0x23d9('0x57')](_0x23d9('0x58'));});_0x400cf1(document)['off'](_0x23d9('0x59'))['on'](_0x23d9('0x59'),function(_0x71d1b6){if(_0x71d1b6[_0x23d9('0x5a')]==0x1b){_0x42eaa0[_0x23d9('0x57')]('qd-bb-lightBoxProdAdd');_0x400cf1(document[_0x23d9('0x56')])[_0x23d9('0x57')](_0x23d9('0x58'));}});var _0x21f6b0=_0x1c98cc[_0x23d9('0x46')](_0x23d9('0x5b'));_0x1c98cc['find'](_0x23d9('0x5c'))['on'](_0x23d9('0x5d'),function(){_0x564cdc[_0x23d9('0x5e')]('-',undefined,undefined,_0x21f6b0);return![];});_0x1c98cc[_0x23d9('0x46')](_0x23d9('0x5f'))['on']('click.qd_ddc_scrollDown',function(){_0x564cdc[_0x23d9('0x5e')](undefined,undefined,undefined,_0x21f6b0);return![];});var _0xdf9c68=_0x1c98cc[_0x23d9('0x46')](_0x23d9('0x60'));_0x1c98cc[_0x23d9('0x46')](_0x23d9('0x61'))[_0x23d9('0x62')]('')['on'](_0x23d9('0x63'),function(_0x5487e6){_0x564cdc[_0x23d9('0x64')](_0x400cf1(this));if(_0x5487e6['keyCode']==0xd)_0x1c98cc[_0x23d9('0x46')]('.qd-ddc-shipping\x20.qd-ddc-cep-ok')[_0x23d9('0x65')]();});_0x1c98cc['find'](_0x23d9('0x66'))['click'](function(_0x54fca1){_0x54fca1[_0x23d9('0x67')]();_0xdf9c68['toggle']();});_0x1c98cc['find'](_0x23d9('0x68'))[_0x23d9('0x65')](function(_0x239696){_0x239696[_0x23d9('0x67')]();_0xdf9c68[_0x23d9('0x69')]();});_0x400cf1(document)[_0x23d9('0x6a')](_0x23d9('0x6b'))['on'](_0x23d9('0x6b'),function(_0x23a685){if(_0x400cf1(_0x23a685['target'])[_0x23d9('0x1')](_0x1c98cc['find'](_0x23d9('0x6c')))[_0x23d9('0x8')])return;_0xdf9c68[_0x23d9('0x69')]();});_0x1c98cc[_0x23d9('0x46')](_0x23d9('0x6d'))[_0x23d9('0x65')](function(_0x275a4c){_0x275a4c[_0x23d9('0x67')]();_0x564cdc[_0x23d9('0x6e')](_0x1c98cc[_0x23d9('0x46')]('.qd-ddc-cep'));});if(_0x129ded[_0x23d9('0x6f')]){var _0x271e0e=0x0;_0x400cf1(this)['on'](_0x23d9('0x70'),function(){var _0x43d8f9=function(){if(!window[_0x23d9('0x19')][_0x23d9('0x1a')])return;_0x564cdc['getCartInfoByUrl']();window[_0x23d9('0x19')]['allowUpdate']=![];_0x400cf1['fn'][_0x23d9('0x71')](!![]);_0x564cdc[_0x23d9('0x72')]();};_0x271e0e=setInterval(function(){_0x43d8f9();},0x258);_0x43d8f9();});_0x400cf1(this)['on'](_0x23d9('0x73'),function(){clearInterval(_0x271e0e);});}};_0x4c0582=_0x439759(this[_0x23d9('0x32')]);_0x230399=0x0;_0x42eaa0[_0x23d9('0x74')](function(){if(_0x230399>0x0)_0x214303['call'](this,_0x4c0582[_0x23d9('0x75')]());else _0x214303[_0x23d9('0x76')](this,_0x4c0582);_0x230399++;});window[_0x23d9('0xa')][_0x23d9('0xb')]['add'](function(){_0x400cf1(_0x23d9('0x77'))['html'](window[_0x23d9('0xa')][_0x23d9('0x78')]||'--');_0x400cf1(_0x23d9('0x79'))[_0x23d9('0x48')](window[_0x23d9('0xa')]['qtt']||'0');_0x400cf1(_0x23d9('0x7a'))[_0x23d9('0x48')](window['_QuatroDigital_CartData'][_0x23d9('0x7b')]||'--');_0x400cf1(_0x23d9('0x7c'))[_0x23d9('0x48')](window[_0x23d9('0xa')][_0x23d9('0x7d')]||'--');});_0x45c8db=function(_0x181cb2){_0x4b80d7(_0x23d9('0x7e'));};_0x459f4e=function(_0xe75fac,_0x4dec17){if(typeof _0xe75fac[_0x23d9('0x7f')]===_0x23d9('0x4'))return _0x4b80d7(_0x23d9('0x80'));_0x564cdc[_0x23d9('0x81')][_0x23d9('0x76')](this,_0x4dec17);};_0x564cdc[_0x23d9('0x82')]=function(_0x2651ad,_0x73387f){var _0x324361;if(typeof _0x73387f!=_0x23d9('0x4'))window[_0x23d9('0x19')][_0x23d9('0x83')]=_0x73387f;else if(window[_0x23d9('0x19')]['dataOptionsCache'])_0x73387f=window[_0x23d9('0x19')]['dataOptionsCache'];setTimeout(function(){window[_0x23d9('0x19')][_0x23d9('0x83')]=undefined;},_0x129ded[_0x23d9('0x84')]);_0x400cf1(_0x23d9('0x85'))['removeClass'](_0x23d9('0x86'));if(_0x129ded[_0x23d9('0x2a')]){_0x324361=function(_0x5bb032){window['_QuatroDigital_DropDown'][_0x23d9('0x87')]=_0x5bb032;_0x459f4e(_0x5bb032,_0x73387f);if(typeof window[_0x23d9('0x88')]!==_0x23d9('0x4')&&typeof window['_QuatroDigital_AmountProduct'][_0x23d9('0x89')]===_0x23d9('0xe'))window[_0x23d9('0x88')][_0x23d9('0x89')][_0x23d9('0x76')](this);_0x400cf1(_0x23d9('0x85'))['addClass'](_0x23d9('0x86'));};if(typeof window['_QuatroDigital_DropDown']['getOrderForm']!==_0x23d9('0x4')){_0x324361(window[_0x23d9('0x19')][_0x23d9('0x87')]);if(typeof _0x2651ad===_0x23d9('0xe'))_0x2651ad(window[_0x23d9('0x19')][_0x23d9('0x87')]);return;}_0x400cf1['QD_checkoutQueue']([_0x23d9('0x7f'),_0x23d9('0x8a'),_0x23d9('0x8b')],{'done':function(_0x4b18e6){_0x324361[_0x23d9('0x76')](this,_0x4b18e6);if(typeof _0x2651ad==='function')_0x2651ad(_0x4b18e6);},'fail':function(_0x589403){_0x4b80d7([_0x23d9('0x8c'),_0x589403]);}});}else{alert(_0x23d9('0x8d'));}};_0x564cdc['cartIsEmpty']=function(){var _0x1ec48e=_0x400cf1(_0x23d9('0x85'));if(_0x1ec48e[_0x23d9('0x46')](_0x23d9('0x8e'))['length'])_0x1ec48e[_0x23d9('0x57')](_0x23d9('0x8f'));else _0x1ec48e[_0x23d9('0x90')]('qd-ddc-noItems');};_0x564cdc[_0x23d9('0x81')]=function(_0x17469b){var _0x19d4a6=_0x400cf1(_0x23d9('0x91'));var _0x1b9932='<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22>'+_0x23d9('0x92')+_0x23d9('0x93')+_0x23d9('0x94')+'<span\x20class=\x22qd-ddc-imgLoading\x22></span>'+_0x23d9('0x95')+_0x23d9('0x95')+_0x23d9('0x96')+'<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div>'+_0x23d9('0x97')+'<div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22>'+'<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a>'+_0x23d9('0x98')+_0x23d9('0x99')+'<span\x20class=\x22qd-ddc-qttLoading\x22></span>'+'</div>'+'</div>'+_0x23d9('0x9a')+'<div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22>'+_0x23d9('0x9b')+_0x23d9('0x9c')+'</div>'+_0x23d9('0x95')+_0x23d9('0x95');_0x19d4a6['empty']();_0x19d4a6['each'](function(){var _0x6a0514=_0x400cf1(this);var _0x4a7094,_0x185531,_0x1434a4,_0x4c254c;var _0x42b736=_0x400cf1('');var _0x35b8c8;for(var _0x31f3fd in window[_0x23d9('0x19')][_0x23d9('0x87')][_0x23d9('0x7f')]){if(typeof window[_0x23d9('0x19')][_0x23d9('0x87')]['items'][_0x31f3fd]!==_0x23d9('0x11'))continue;_0x1434a4=window[_0x23d9('0x19')][_0x23d9('0x87')][_0x23d9('0x7f')][_0x31f3fd];_0x35b8c8=_0x1434a4[_0x23d9('0x9d')][_0x23d9('0x2')](/^\/|\/$/g,'')[_0x23d9('0x7')]('/');_0x185531=_0x400cf1(_0x1b9932);_0x185531[_0x23d9('0x9e')]({'data-sku':_0x1434a4['id'],'data-sku-index':_0x31f3fd,'data-qd-departament':_0x35b8c8[0x0],'data-qd-category':_0x35b8c8[_0x35b8c8[_0x23d9('0x8')]-0x1]});_0x185531[_0x23d9('0x90')](_0x23d9('0x9f')+_0x1434a4['availability']);_0x185531[_0x23d9('0x46')](_0x23d9('0xa0'))['append'](_0x129ded['skuName'](_0x1434a4));_0x185531[_0x23d9('0x46')](_0x23d9('0xa1'))[_0x23d9('0x51')](isNaN(_0x1434a4[_0x23d9('0xa2')])?_0x1434a4[_0x23d9('0xa2')]:_0x1434a4[_0x23d9('0xa2')]==0x0?'Grátis':(_0x400cf1(_0x23d9('0xa3'))[_0x23d9('0x9e')](_0x23d9('0xa4'))||'R$')+'\x20'+qd_number_format(_0x1434a4[_0x23d9('0xa2')]/0x64,0x2,',','.'));_0x185531[_0x23d9('0x46')](_0x23d9('0xa5'))['attr']({'data-sku':_0x1434a4['id'],'data-sku-index':_0x31f3fd})['val'](_0x1434a4[_0x23d9('0xa6')]);_0x185531[_0x23d9('0x46')](_0x23d9('0xa7'))[_0x23d9('0x9e')]({'data-sku':_0x1434a4['id'],'data-sku-index':_0x31f3fd});_0x564cdc[_0x23d9('0xa8')](_0x1434a4['id'],_0x185531[_0x23d9('0x46')](_0x23d9('0xa9')),_0x1434a4[_0x23d9('0xaa')]);_0x185531[_0x23d9('0x46')](_0x23d9('0xab'))[_0x23d9('0x9e')]({'data-sku':_0x1434a4['id'],'data-sku-index':_0x31f3fd});_0x185531[_0x23d9('0xac')](_0x6a0514);_0x42b736=_0x42b736[_0x23d9('0xad')](_0x185531);}try{var _0x4b2a46=_0x6a0514['getParent'](_0x23d9('0x85'))[_0x23d9('0x46')](_0x23d9('0xae'));if(_0x4b2a46[_0x23d9('0x8')]&&_0x4b2a46[_0x23d9('0x62')]()==''&&window[_0x23d9('0x19')][_0x23d9('0x87')][_0x23d9('0x8b')]['address'])_0x4b2a46[_0x23d9('0x62')](window[_0x23d9('0x19')]['getOrderForm']['shippingData'][_0x23d9('0xaf')]['postalCode']);}catch(_0x2cc272){_0x4b80d7(_0x23d9('0xb0')+_0x2cc272[_0x23d9('0x10')],'aviso');}_0x564cdc[_0x23d9('0xb1')](_0x6a0514);_0x564cdc['cartIsEmpty']();if(_0x17469b&&_0x17469b['lastSku']){(function(){_0x4c254c=_0x42b736[_0x23d9('0xb2')](_0x23d9('0xb3')+_0x17469b[_0x23d9('0xb4')]+'\x27]');if(!_0x4c254c[_0x23d9('0x8')])return;_0x4a7094=0x0;_0x42b736['each'](function(){var _0x2774c5=_0x400cf1(this);if(_0x2774c5['is'](_0x4c254c))return![];_0x4a7094+=_0x2774c5[_0x23d9('0xb5')]();});_0x564cdc[_0x23d9('0x5e')](undefined,undefined,_0x4a7094,_0x6a0514['add'](_0x6a0514[_0x23d9('0xb6')]()));_0x42b736[_0x23d9('0x57')](_0x23d9('0xb7'));(function(_0x1fb9c6){_0x1fb9c6[_0x23d9('0x90')](_0x23d9('0xb8'));_0x1fb9c6['addClass'](_0x23d9('0xb7'));setTimeout(function(){_0x1fb9c6['removeClass'](_0x23d9('0xb8'));},_0x129ded['timeRemoveNewItemClass']);}(_0x4c254c));_0x400cf1(document[_0x23d9('0x56')])[_0x23d9('0x90')](_0x23d9('0xb9'));setTimeout(function(){_0x400cf1(document[_0x23d9('0x56')])[_0x23d9('0x57')]('qd-ddc-product-add-time-v2');},_0x129ded[_0x23d9('0x84')]);}());}});(function(){if(_QuatroDigital_DropDown['getOrderForm'][_0x23d9('0x7f')]['length']){_0x400cf1(_0x23d9('0x56'))[_0x23d9('0x57')]('qd-ddc-cart-empty')[_0x23d9('0x90')](_0x23d9('0xba'));setTimeout(function(){_0x400cf1('body')[_0x23d9('0x57')](_0x23d9('0xbb'));},_0x129ded[_0x23d9('0x84')]);}else _0x400cf1(_0x23d9('0x56'))[_0x23d9('0x57')](_0x23d9('0xbc'))[_0x23d9('0x90')](_0x23d9('0xbd'));}());if(typeof _0x129ded[_0x23d9('0xbe')]===_0x23d9('0xe'))_0x129ded[_0x23d9('0xbe')][_0x23d9('0x76')](this);else _0x4b80d7(_0x23d9('0xbf'));};_0x564cdc[_0x23d9('0xa8')]=function(_0x351f8d,_0x419f93,_0x2c36e5){var _0x5d9661=!![];function _0x1b7d7a(){if(_0x129ded[_0x23d9('0xc0')]&&typeof _0x2c36e5==_0x23d9('0xc1'))_0x2c36e5=_0x2c36e5['replace']('http','https');_0x419f93[_0x23d9('0x57')](_0x23d9('0xc2'))[_0x23d9('0xc3')](function(){_0x400cf1(this)[_0x23d9('0x90')](_0x23d9('0xc2'));})[_0x23d9('0x9e')](_0x23d9('0xc4'),_0x2c36e5);};if(_0x2c36e5)_0x1b7d7a();else if(!isNaN(_0x351f8d)){alert(_0x23d9('0xc5'));}else _0x4b80d7(_0x23d9('0xc6'),_0x23d9('0x14'));};_0x564cdc[_0x23d9('0xb1')]=function(_0x131fb1){var _0x322c3a,_0x511f53,_0x17132b,_0x128c9b;_0x322c3a=function(_0x4ed9c0,_0x5743b1){var _0x39c295,_0x40f4e3,_0x59d78a,_0x591e60,_0x5e190b;_0x59d78a=_0x400cf1(_0x4ed9c0);_0x39c295=_0x59d78a['attr'](_0x23d9('0xc7'));_0x5e190b=_0x59d78a[_0x23d9('0x9e')](_0x23d9('0xc8'));if(!_0x39c295)return;_0x40f4e3=parseInt(_0x59d78a[_0x23d9('0x62')]())||0x1;_0x564cdc['changeQantity']([_0x39c295,_0x5e190b],_0x40f4e3,_0x40f4e3+0x1,function(_0x4498f3){_0x59d78a[_0x23d9('0x62')](_0x4498f3);if(typeof _0x5743b1===_0x23d9('0xe'))_0x5743b1();});};_0x17132b=function(_0x20ba6c,_0x5eef74){var _0x5958ae,_0x22dec7,_0x1afc10,_0x540ab5,_0x31924a;_0x1afc10=_0x400cf1(_0x20ba6c);_0x5958ae=_0x1afc10[_0x23d9('0x9e')](_0x23d9('0xc7'));_0x31924a=_0x1afc10[_0x23d9('0x9e')](_0x23d9('0xc8'));if(!_0x5958ae)return;_0x22dec7=parseInt(_0x1afc10[_0x23d9('0x62')]())||0x2;_0x540ab5=_0x564cdc[_0x23d9('0xc9')]([_0x5958ae,_0x31924a],_0x22dec7,_0x22dec7-0x1,function(_0x41e9c4){_0x1afc10[_0x23d9('0x62')](_0x41e9c4);if(typeof _0x5eef74==='function')_0x5eef74();});};_0x128c9b=function(_0x39b7d6,_0x3851fb){var _0x3783e3,_0x33c614,_0x65eea9,_0x4390c9,_0x43366e;_0x65eea9=_0x400cf1(_0x39b7d6);_0x3783e3=_0x65eea9[_0x23d9('0x9e')](_0x23d9('0xc7'));_0x43366e=_0x65eea9['attr'](_0x23d9('0xc8'));if(!_0x3783e3)return;_0x33c614=parseInt(_0x65eea9[_0x23d9('0x62')]())||0x1;_0x4390c9=_0x564cdc[_0x23d9('0xc9')]([_0x3783e3,_0x43366e],0x1,_0x33c614,function(_0xb3dd3a){_0x65eea9['val'](_0xb3dd3a);if(typeof _0x3851fb===_0x23d9('0xe'))_0x3851fb();});};_0x511f53=_0x131fb1['find'](_0x23d9('0xca'));_0x511f53['addClass'](_0x23d9('0xcb'))[_0x23d9('0x74')](function(){var _0x117a13=_0x400cf1(this);_0x117a13[_0x23d9('0x46')](_0x23d9('0xcc'))['on'](_0x23d9('0xcd'),function(_0x26578c){_0x26578c[_0x23d9('0x67')]();_0x511f53['addClass'](_0x23d9('0xce'));_0x322c3a(_0x117a13[_0x23d9('0x46')](_0x23d9('0xa5')),function(){_0x511f53['removeClass'](_0x23d9('0xce'));});});_0x117a13[_0x23d9('0x46')](_0x23d9('0xcf'))['on']('click.qd_ddc_minus',function(_0x3235b5){_0x3235b5[_0x23d9('0x67')]();_0x511f53[_0x23d9('0x90')]('qd-loading');_0x17132b(_0x117a13['find'](_0x23d9('0xa5')),function(){_0x511f53[_0x23d9('0x57')]('qd-loading');});});_0x117a13[_0x23d9('0x46')](_0x23d9('0xa5'))['on']('focusout.qd_ddc_change',function(){_0x511f53[_0x23d9('0x90')]('qd-loading');_0x128c9b(this,function(){_0x511f53[_0x23d9('0x57')]('qd-loading');});});_0x117a13[_0x23d9('0x46')](_0x23d9('0xa5'))['on'](_0x23d9('0xd0'),function(_0x4e5bc0){if(_0x4e5bc0[_0x23d9('0x5a')]!=0xd)return;_0x511f53[_0x23d9('0x90')](_0x23d9('0xce'));_0x128c9b(this,function(){_0x511f53['removeClass'](_0x23d9('0xce'));});});});_0x131fb1[_0x23d9('0x46')](_0x23d9('0x8e'))[_0x23d9('0x74')](function(){var _0x2f6f55=_0x400cf1(this);_0x2f6f55[_0x23d9('0x46')](_0x23d9('0xa7'))['on'](_0x23d9('0xd1'),function(){var _0x50beef;_0x2f6f55[_0x23d9('0x90')](_0x23d9('0xce'));_0x564cdc['removeProduct'](_0x400cf1(this),function(_0x2e92fc){if(_0x2e92fc)_0x2f6f55[_0x23d9('0xd2')](!![])['slideUp'](function(){_0x2f6f55['remove']();_0x564cdc['cartIsEmpty']();});else _0x2f6f55[_0x23d9('0x57')](_0x23d9('0xce'));});return![];});});};_0x564cdc[_0x23d9('0x64')]=function(_0x45cfff){var _0x5826a9=_0x45cfff[_0x23d9('0x62')]();_0x5826a9=_0x5826a9[_0x23d9('0x2')](/[^0-9\-]/g,'');_0x5826a9=_0x5826a9['replace'](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x23d9('0xd3'));_0x5826a9=_0x5826a9[_0x23d9('0x2')](/(.{9}).*/g,'$1');_0x45cfff[_0x23d9('0x62')](_0x5826a9);};_0x564cdc[_0x23d9('0x6e')]=function(_0x1f0bae){var _0x146578=_0x1f0bae['val']();if(_0x146578[_0x23d9('0x8')]>=0x9){if(_0x1f0bae[_0x23d9('0xd4')](_0x23d9('0xd5'))!=_0x146578){_0x4b1f1c[_0x23d9('0xd6')]({'postalCode':_0x146578,'country':_0x23d9('0xd7')})['done'](function(_0x35a947){_0x1f0bae[_0x23d9('0x1')]('.qd-ddc-cep-tooltip-text')[_0x23d9('0x46')](_0x23d9('0xd8'))[_0x23d9('0xd9')]();window['_QuatroDigital_DropDown'][_0x23d9('0x87')]=_0x35a947;_0x564cdc[_0x23d9('0x82')]();var _0x592ce8=_0x35a947['shippingData'][_0x23d9('0xda')][0x0][_0x23d9('0xdb')];var _0x2ab276=_0x400cf1(_0x23d9('0xdc'));for(var _0x1439f5=0x0;_0x1439f5<_0x592ce8['length'];_0x1439f5++){var _0x492498=_0x592ce8[_0x1439f5];var _0xb8c418=_0x492498[_0x23d9('0xdd')]>0x1?_0x492498[_0x23d9('0xdd')]['replace']('bd',_0x23d9('0xde')):_0x492498[_0x23d9('0xdd')][_0x23d9('0x2')]('bd',_0x23d9('0xdf'));var _0x288032=_0x400cf1('<tr></tr>');_0x288032['append'](_0x23d9('0xe0')+qd_number_format(_0x492498['price']/0x64,0x2,',','.')+_0x23d9('0xe1')+_0x492498[_0x23d9('0x28')]+',\x20entrega\x20em\x20'+_0xb8c418+_0x23d9('0xe2')+_0x146578+_0x23d9('0xe3'));_0x288032['appendTo'](_0x2ab276['find'](_0x23d9('0xe4')));}_0x2ab276[_0x23d9('0xe5')](_0x1f0bae[_0x23d9('0x1')](_0x23d9('0xe6'))[_0x23d9('0x46')](_0x23d9('0x68')));})[_0x23d9('0xe7')](function(_0x4afbda){_0x4b80d7([_0x23d9('0xe8'),_0x4afbda]);updateCartData();});}_0x1f0bae['data'](_0x23d9('0xd5'),_0x146578);}};_0x564cdc[_0x23d9('0xc9')]=function(_0x1c3ba6,_0x42c71d,_0x37574f,_0x300d15){var _0x35fc9e=_0x37574f||0x1;if(_0x35fc9e<0x1)return _0x42c71d;if(_0x129ded[_0x23d9('0x2a')]){if(typeof window[_0x23d9('0x19')]['getOrderForm'][_0x23d9('0x7f')][_0x1c3ba6[0x1]]===_0x23d9('0x4')){_0x4b80d7(_0x23d9('0xe9')+_0x1c3ba6[0x1]+']');return _0x42c71d;}window[_0x23d9('0x19')][_0x23d9('0x87')][_0x23d9('0x7f')][_0x1c3ba6[0x1]][_0x23d9('0xa6')]=_0x35fc9e;window[_0x23d9('0x19')][_0x23d9('0x87')][_0x23d9('0x7f')][_0x1c3ba6[0x1]]['index']=_0x1c3ba6[0x1];_0x4b1f1c[_0x23d9('0xea')]([window[_0x23d9('0x19')][_0x23d9('0x87')]['items'][_0x1c3ba6[0x1]]],[_0x23d9('0x7f'),'totalizers',_0x23d9('0x8b')])[_0x23d9('0xeb')](function(_0x1f37b4){window[_0x23d9('0x19')][_0x23d9('0x87')]=_0x1f37b4;_0x3b0e83(!![]);})['fail'](function(_0x3348b9){_0x4b80d7([_0x23d9('0xec'),_0x3348b9]);_0x3b0e83();});}else{_0x4b80d7('atenção\x20esta\x20método\x20esta\x20descontinuado');}function _0x3b0e83(_0x205c92){_0x205c92=typeof _0x205c92!==_0x23d9('0xed')?![]:_0x205c92;_0x564cdc[_0x23d9('0x82')]();window[_0x23d9('0x19')]['allowUpdate']=![];_0x564cdc[_0x23d9('0x72')]();if(typeof window[_0x23d9('0x88')]!==_0x23d9('0x4')&&typeof window['_QuatroDigital_AmountProduct'][_0x23d9('0x89')]===_0x23d9('0xe'))window['_QuatroDigital_AmountProduct'][_0x23d9('0x89')][_0x23d9('0x76')](this);if(typeof adminCart===_0x23d9('0xe'))adminCart();_0x400cf1['fn'][_0x23d9('0x71')](!![],undefined,_0x205c92);if(typeof _0x300d15==='function')_0x300d15(_0x42c71d);};};_0x564cdc[_0x23d9('0xee')]=function(_0x3c2902,_0x433f5b){var _0x549460=![];var _0x4b930d=_0x400cf1(_0x3c2902);var _0x48f78d=_0x4b930d[_0x23d9('0x9e')]('data-sku-index');if(_0x129ded[_0x23d9('0x2a')]){if(typeof window[_0x23d9('0x19')][_0x23d9('0x87')][_0x23d9('0x7f')][_0x48f78d]===_0x23d9('0x4')){_0x4b80d7(_0x23d9('0xe9')+_0x48f78d+']');return _0x549460;}window[_0x23d9('0x19')][_0x23d9('0x87')][_0x23d9('0x7f')][_0x48f78d][_0x23d9('0xef')]=_0x48f78d;_0x4b1f1c[_0x23d9('0xf0')]([window[_0x23d9('0x19')][_0x23d9('0x87')][_0x23d9('0x7f')][_0x48f78d]],[_0x23d9('0x7f'),'totalizers','shippingData'])[_0x23d9('0xeb')](function(_0x699545){_0x549460=!![];window[_0x23d9('0x19')]['getOrderForm']=_0x699545;_0x459f4e(_0x699545);_0x85c3c5(!![]);})['fail'](function(_0xf07c81){_0x4b80d7(['Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho',_0xf07c81]);_0x85c3c5();});}else{alert(_0x23d9('0xf1'));}function _0x85c3c5(_0x1004b2){_0x1004b2=typeof _0x1004b2!==_0x23d9('0xed')?![]:_0x1004b2;if(typeof window['_QuatroDigital_AmountProduct']!==_0x23d9('0x4')&&typeof window[_0x23d9('0x88')]['exec']==='function')window[_0x23d9('0x88')]['exec'][_0x23d9('0x76')](this);if(typeof adminCart===_0x23d9('0xe'))adminCart();_0x400cf1['fn'][_0x23d9('0x71')](!![],undefined,_0x1004b2);if(typeof _0x433f5b===_0x23d9('0xe'))_0x433f5b(_0x549460);};};_0x564cdc[_0x23d9('0x5e')]=function(_0x50b078,_0xfa57fa,_0x5c5999,_0x206a43){var _0x159d40=_0x206a43||_0x400cf1('.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2');var _0x525fa6=_0x50b078||'+';var _0x11dfb3=_0xfa57fa||_0x159d40[_0x23d9('0xf2')]()*0.9;_0x159d40[_0x23d9('0xd2')](!![],!![])[_0x23d9('0xf3')]({'scrollTop':isNaN(_0x5c5999)?_0x525fa6+'='+_0x11dfb3+'px':_0x5c5999});};if(!_0x129ded[_0x23d9('0x6f')]){_0x564cdc[_0x23d9('0x82')]();_0x400cf1['fn'][_0x23d9('0x71')](!![]);}_0x400cf1(window)['on'](_0x23d9('0xf4'),function(){try{window[_0x23d9('0x19')][_0x23d9('0x87')]=undefined;_0x564cdc['getCartInfoByUrl']();}catch(_0x1956b8){_0x4b80d7(_0x23d9('0xf5')+_0x1956b8[_0x23d9('0x10')],_0x23d9('0xf6'));}});if(typeof _0x129ded['callback']===_0x23d9('0xe'))_0x129ded[_0x23d9('0xb')][_0x23d9('0x76')](this);else _0x4b80d7(_0x23d9('0xf7'));};_0x400cf1['fn'][_0x23d9('0x1b')]=function(_0x2caaad){var _0x528b67;_0x528b67=_0x400cf1(this);_0x528b67['fn']=new _0x400cf1[(_0x23d9('0x1b'))](this,_0x2caaad);return _0x528b67;};}catch(_0x5aa593){if(typeof console!==_0x23d9('0x4')&&typeof console[_0x23d9('0xd')]===_0x23d9('0xe'))console[_0x23d9('0xd')](_0x23d9('0xf'),_0x5aa593);}}(this));(function(_0x3e6ee6){'use strict';try{var _0x33f751=jQuery;var _0xa1f8b2='Quatro\x20Digital\x20-\x20Box\x20Amount\x20Cart';var _0x56a951=function(_0xb57847,_0x5a741c){if(_0x23d9('0x11')===typeof console&&_0x23d9('0x4')!==typeof console[_0x23d9('0xd')]&&_0x23d9('0x4')!==typeof console[_0x23d9('0x12')]&&_0x23d9('0x4')!==typeof console['warn']){var _0x39ba6d;'object'===typeof _0xb57847?(_0xb57847['unshift']('['+_0xa1f8b2+']\x0a'),_0x39ba6d=_0xb57847):_0x39ba6d=['['+_0xa1f8b2+']\x0a'+_0xb57847];if(_0x23d9('0x4')===typeof _0x5a741c||_0x23d9('0x14')!==_0x5a741c[_0x23d9('0x15')]()&&_0x23d9('0x16')!==_0x5a741c[_0x23d9('0x15')]())if(_0x23d9('0x4')!==typeof _0x5a741c&&_0x23d9('0x12')===_0x5a741c['toLowerCase']())try{console['info'][_0x23d9('0x17')](console,_0x39ba6d);}catch(_0x3f6900){try{console[_0x23d9('0x12')](_0x39ba6d[_0x23d9('0x9')]('\x0a'));}catch(_0x5701ee){}}else try{console[_0x23d9('0xd')]['apply'](console,_0x39ba6d);}catch(_0x468683){try{console[_0x23d9('0xd')](_0x39ba6d[_0x23d9('0x9')]('\x0a'));}catch(_0x212f3f){}}else try{console[_0x23d9('0x18')]['apply'](console,_0x39ba6d);}catch(_0x1d715f){try{console[_0x23d9('0x18')](_0x39ba6d[_0x23d9('0x9')]('\x0a'));}catch(_0x479c3c){}}}};window[_0x23d9('0x88')]=window['_QuatroDigital_AmountProduct']||{};window[_0x23d9('0x88')]['items']={};window[_0x23d9('0x88')][_0x23d9('0xf8')]=![];window[_0x23d9('0x88')][_0x23d9('0xf9')]=![];window[_0x23d9('0x88')][_0x23d9('0xfa')]=![];var _0x384e88=_0x23d9('0xfb');var _0x5c1774=function(){var _0x396ebe,_0x2e4426,_0x1fbc9b,_0x4c27dd;_0x4c27dd=_0x4817d9();if(window['_QuatroDigital_AmountProduct'][_0x23d9('0xf8')]){_0x33f751(_0x23d9('0xfc'))[_0x23d9('0xd9')]();_0x33f751(_0x23d9('0xfd'))[_0x23d9('0x57')]('qd-bap-item-added');}for(var _0x5bdfd3 in window['_QuatroDigital_AmountProduct']['items']){_0x396ebe=window[_0x23d9('0x88')][_0x23d9('0x7f')][_0x5bdfd3];if(typeof _0x396ebe!==_0x23d9('0x11'))return;_0x1fbc9b=_0x33f751(_0x23d9('0xfe')+_0x396ebe[_0x23d9('0xff')]+']')[_0x23d9('0x0')]('li');if(!window[_0x23d9('0x88')][_0x23d9('0xf8')]&&_0x1fbc9b[_0x23d9('0x46')]('.qd-bap-wrapper')['length'])continue;_0x2e4426=_0x33f751(_0x384e88);_0x2e4426[_0x23d9('0x46')](_0x23d9('0x100'))[_0x23d9('0x48')](_0x396ebe[_0x23d9('0x101')]);var _0x527414=_0x1fbc9b[_0x23d9('0x46')](_0x23d9('0x102'));if(_0x527414['length'])_0x527414[_0x23d9('0x103')](_0x2e4426)[_0x23d9('0x90')](_0x23d9('0x104'));else _0x1fbc9b[_0x23d9('0x103')](_0x2e4426);}if(_0x4c27dd)window[_0x23d9('0x88')][_0x23d9('0xf8')]=![];};var _0x4817d9=function(){if(!window[_0x23d9('0x88')][_0x23d9('0xf8')])return;var _0x1282c9=![],_0x1e0be5={};window[_0x23d9('0x88')]['items']={};for(var _0x542fcd in window['_QuatroDigital_DropDown'][_0x23d9('0x87')][_0x23d9('0x7f')]){if(typeof window[_0x23d9('0x19')]['getOrderForm']['items'][_0x542fcd]!=='object')continue;var _0x5c3da5=window[_0x23d9('0x19')]['getOrderForm'][_0x23d9('0x7f')][_0x542fcd];if(typeof _0x5c3da5[_0x23d9('0x105')]===_0x23d9('0x4')||_0x5c3da5['productId']===null||_0x5c3da5[_0x23d9('0x105')]==='')continue;window['_QuatroDigital_AmountProduct'][_0x23d9('0x7f')][_0x23d9('0x106')+_0x5c3da5[_0x23d9('0x105')]]=window[_0x23d9('0x88')][_0x23d9('0x7f')][_0x23d9('0x106')+_0x5c3da5['productId']]||{};window['_QuatroDigital_AmountProduct'][_0x23d9('0x7f')][_0x23d9('0x106')+_0x5c3da5[_0x23d9('0x105')]][_0x23d9('0xff')]=_0x5c3da5[_0x23d9('0x105')];if(!_0x1e0be5['prod_'+_0x5c3da5[_0x23d9('0x105')]])window[_0x23d9('0x88')][_0x23d9('0x7f')]['prod_'+_0x5c3da5[_0x23d9('0x105')]]['qtt']=0x0;window[_0x23d9('0x88')][_0x23d9('0x7f')][_0x23d9('0x106')+_0x5c3da5[_0x23d9('0x105')]]['qtt']=window[_0x23d9('0x88')][_0x23d9('0x7f')][_0x23d9('0x106')+_0x5c3da5[_0x23d9('0x105')]][_0x23d9('0x101')]+_0x5c3da5[_0x23d9('0xa6')];_0x1282c9=!![];_0x1e0be5[_0x23d9('0x106')+_0x5c3da5[_0x23d9('0x105')]]=!![];}return _0x1282c9;};window[_0x23d9('0x88')][_0x23d9('0x89')]=function(){window[_0x23d9('0x88')][_0x23d9('0xf8')]=!![];_0x5c1774[_0x23d9('0x76')](this);};_0x33f751(document)[_0x23d9('0x107')](function(){_0x5c1774[_0x23d9('0x76')](this);});}catch(_0x43d273){if(typeof console!==_0x23d9('0x4')&&typeof console[_0x23d9('0xd')]===_0x23d9('0xe'))console[_0x23d9('0xd')](_0x23d9('0xf'),_0x43d273);}}(this));(function(){'use strict';try{var _0x4d675d=jQuery,_0x4323c2;var _0x5d9e55=_0x23d9('0x108');var _0x4317ac=function(_0x126b1e,_0x7d3e1f){if('object'===typeof console&&_0x23d9('0x4')!==typeof console[_0x23d9('0xd')]&&_0x23d9('0x4')!==typeof console[_0x23d9('0x12')]&&'undefined'!==typeof console[_0x23d9('0x18')]){var _0xcdc074;'object'===typeof _0x126b1e?(_0x126b1e['unshift']('['+_0x5d9e55+']\x0a'),_0xcdc074=_0x126b1e):_0xcdc074=['['+_0x5d9e55+']\x0a'+_0x126b1e];if('undefined'===typeof _0x7d3e1f||_0x23d9('0x14')!==_0x7d3e1f[_0x23d9('0x15')]()&&'aviso'!==_0x7d3e1f[_0x23d9('0x15')]())if('undefined'!==typeof _0x7d3e1f&&_0x23d9('0x12')===_0x7d3e1f[_0x23d9('0x15')]())try{console[_0x23d9('0x12')]['apply'](console,_0xcdc074);}catch(_0x55ea5d){try{console['info'](_0xcdc074[_0x23d9('0x9')]('\x0a'));}catch(_0x312b74){}}else try{console['error'][_0x23d9('0x17')](console,_0xcdc074);}catch(_0x5689ae){try{console['error'](_0xcdc074[_0x23d9('0x9')]('\x0a'));}catch(_0x39ab07){}}else try{console[_0x23d9('0x18')][_0x23d9('0x17')](console,_0xcdc074);}catch(_0x1f5ca5){try{console[_0x23d9('0x18')](_0xcdc074['join']('\x0a'));}catch(_0x326f51){}}}};var _0x4f2644={'selector':_0x23d9('0x109'),'dropDown':{},'buyButton':{}};_0x4d675d[_0x23d9('0x10a')]=function(_0x311f77){var _0x22ad49,_0xe0c98c={};_0x4323c2=_0x4d675d['extend'](!![],{},_0x4f2644,_0x311f77);_0x22ad49=_0x4d675d(_0x4323c2['selector'])[_0x23d9('0x1b')](_0x4323c2[_0x23d9('0x10b')]);if(typeof _0x4323c2[_0x23d9('0x10b')]['updateOnlyHover']!=='undefined'&&_0x4323c2[_0x23d9('0x10b')][_0x23d9('0x6f')]===![])_0xe0c98c['buyButton']=_0x4d675d(_0x4323c2['selector'])['QD_buyButton'](_0x22ad49['fn'],_0x4323c2[_0x23d9('0x10c')]);else _0xe0c98c['buyButton']=_0x4d675d(_0x4323c2[_0x23d9('0x10d')])['QD_buyButton'](_0x4323c2['buyButton']);_0xe0c98c['dropDown']=_0x22ad49;return _0xe0c98c;};_0x4d675d['fn'][_0x23d9('0x10e')]=function(){if(typeof console===_0x23d9('0x11')&&typeof console[_0x23d9('0x12')]===_0x23d9('0xe'))console[_0x23d9('0x12')]('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x4d675d[_0x23d9('0x10e')]=_0x4d675d['fn']['smartCart'];}catch(_0x5102d7){if(typeof console!==_0x23d9('0x4')&&typeof console[_0x23d9('0xd')]===_0x23d9('0xe'))console[_0x23d9('0xd')](_0x23d9('0xf'),_0x5102d7);}}());

/* Quatro Digital Social Photos */
var _0x9d2e=['object','[Quatro\x20Digital\x20Social\x20Photos]\x0a','QD_socialPhotos','timer','extend','---','flickr','tag','#qd-instragram-hash-tag','length','each','url','\x27\x20title=\x27','title','\x27\x20/></li>','trigger','instagram','socialType','data','photosQtty','push','images','low_resolution','caption','text','photos','total','photo','url_m','Problemas\x20ao\x20organizar\x20as\x20fotos\x20retornadas\x20da\x20API.','rnaqevavfgber%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','ite','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','https://api.instagram.com/v1/users/self/media/recent/?access_token=','\x20+\x20&count=','https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=3&extras=url_m&api_key=','&user_id=','user','&jsoncallback=?','&tags=','filterByTag','ajax','done','stringify','Aeeee\x20irmão!\x20Problemas\x20para\x20obter\x20os\x20dados\x20via\x20API\x20do\x20Flickr\x20:(\x20.\x20Detalhes:\x20','callback','QuatroDigital.QD_socialPhotos.callback','function','error','info','unshift','[Quatro\x20Digital\x20-\x20localStorage]\x0a','undefined','alerta','toLowerCase','aviso','apply','join','warn','qdLocalStorage','getItem','setItem','setTime','getTime','_expiration','Aeeee\x20irmão!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20salvar\x20os\x20dados\x20no\x20armazenamento\x20local.\x20Detalhes:\x20','message','removeItem','Aeeee\x20irmão!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20obter\x20os\x20dados\x20no\x20armazenamento\x20local.\x20Detalhes:\x20'];(function(_0x986e8d,_0x30604e){var _0x4a0984=function(_0x55f3ec){while(--_0x55f3ec){_0x986e8d['push'](_0x986e8d['shift']());}};_0x4a0984(++_0x30604e);}(_0x9d2e,0x157));var _0xe9d2=function(_0x141bcf,_0x4d05f8){_0x141bcf=_0x141bcf-0x0;var _0x28cc3d=_0x9d2e[_0x141bcf];return _0x28cc3d;};(function(){var _0x1bf10c=function(_0x14673f,_0x18c064){if('object'===typeof console&&_0xe9d2('0x0')===typeof console[_0xe9d2('0x1')]&&'function'===typeof console[_0xe9d2('0x2')]&&_0xe9d2('0x0')===typeof console['warn']){var _0x5cbbba;'object'===typeof _0x14673f?(_0x14673f[_0xe9d2('0x3')](_0xe9d2('0x4')),_0x5cbbba=_0x14673f):_0x5cbbba=[_0xe9d2('0x4')+_0x14673f];if(_0xe9d2('0x5')===typeof _0x18c064||_0xe9d2('0x6')!==_0x18c064[_0xe9d2('0x7')]()&&_0xe9d2('0x8')!==_0x18c064[_0xe9d2('0x7')]())if(_0xe9d2('0x5')!==typeof _0x18c064&&_0xe9d2('0x2')===_0x18c064[_0xe9d2('0x7')]())try{console['info'][_0xe9d2('0x9')](console,_0x5cbbba);}catch(_0x36f045){console[_0xe9d2('0x2')](_0x5cbbba[_0xe9d2('0xa')]('\x0a'));}else try{console[_0xe9d2('0x1')][_0xe9d2('0x9')](console,_0x5cbbba);}catch(_0x25f555){console[_0xe9d2('0x1')](_0x5cbbba['join']('\x0a'));}else try{console[_0xe9d2('0xb')][_0xe9d2('0x9')](console,_0x5cbbba);}catch(_0x18e76a){console[_0xe9d2('0xb')](_0x5cbbba[_0xe9d2('0xa')]('\x0a'));}}};window['qdLocalStorage']=window[_0xe9d2('0xc')]||{};var _0x354153='undefined'!==typeof localStorage&&_0xe9d2('0x5')!==typeof localStorage['setItem']&&_0xe9d2('0x5')!==typeof localStorage[_0xe9d2('0xd')];window[_0xe9d2('0xc')][_0xe9d2('0xe')]=function(_0x59f188,_0x40ffe3,_0x69dfa6){try{if(!_0x354153)return!0x1;var _0x3f2b6b=new Date();localStorage['setItem'](_0x59f188,_0x40ffe3);isNaN(parseInt(_0x69dfa6))||(_0x3f2b6b[_0xe9d2('0xf')](_0x3f2b6b[_0xe9d2('0x10')]()+0xea60*_0x69dfa6),localStorage['setItem'](_0x59f188+_0xe9d2('0x11'),_0x3f2b6b[_0xe9d2('0x10')]()));}catch(_0x624d26){_0x1bf10c([_0xe9d2('0x12'),_0x624d26[_0xe9d2('0x13')]],_0xe9d2('0x6'));}};window[_0xe9d2('0xc')][_0xe9d2('0xd')]=function(_0x18c0c2){try{if(!_0x354153)return!0x1;var _0x3c9668=new Date(),_0x7229fe=parseInt(localStorage[_0xe9d2('0xd')](_0x18c0c2+_0xe9d2('0x11'))||0x0,0xa)||0x0;return _0x3c9668['getTime']()>_0x7229fe?(localStorage[_0xe9d2('0x14')]&&(localStorage[_0xe9d2('0x14')](_0x18c0c2),localStorage[_0xe9d2('0x14')](_0x18c0c2+'_expiration')),null):localStorage['getItem'](_0x18c0c2);}catch(_0x4826f5){_0x1bf10c([_0xe9d2('0x15'),_0x4826f5['message']],_0xe9d2('0x6'));}};}());(function(_0x4bd5e2){var _0x358714=jQuery;if(_0xe9d2('0x0')!==typeof _0x358714['fn']['QD_socialPhotos']){var _0x200df3=function(_0x27bf79,_0x177d82){if(_0xe9d2('0x16')===typeof console&&_0xe9d2('0x0')===typeof console[_0xe9d2('0x1')]&&_0xe9d2('0x0')===typeof console[_0xe9d2('0x2')]&&_0xe9d2('0x0')===typeof console[_0xe9d2('0xb')]){var _0xac3a0e;_0xe9d2('0x16')===typeof _0x27bf79?(_0x27bf79[_0xe9d2('0x3')](_0xe9d2('0x17')),_0xac3a0e=_0x27bf79):_0xac3a0e=['[Quatro\x20Digital\x20Social\x20Photos]\x0a'+_0x27bf79];if(_0xe9d2('0x5')===typeof _0x177d82||_0xe9d2('0x6')!==_0x177d82['toLowerCase']()&&'aviso'!==_0x177d82[_0xe9d2('0x7')]())if(_0xe9d2('0x5')!==typeof _0x177d82&&'info'===_0x177d82[_0xe9d2('0x7')]())try{console[_0xe9d2('0x2')]['apply'](console,_0xac3a0e);}catch(_0x1edd8a){console['info'](_0xac3a0e[_0xe9d2('0xa')]('\x0a'));}else try{console[_0xe9d2('0x1')]['apply'](console,_0xac3a0e);}catch(_0x1d19a9){console[_0xe9d2('0x1')](_0xac3a0e[_0xe9d2('0xa')]('\x0a'));}else try{console[_0xe9d2('0xb')][_0xe9d2('0x9')](console,_0xac3a0e);}catch(_0xab00b7){console[_0xe9d2('0xb')](_0xac3a0e[_0xe9d2('0xa')]('\x0a'));}}};_0x358714['fn'][_0xe9d2('0x18')]=function(_0x460478,_0x5e43ef){function _0x1aa7c0(){_0x1a2945['disableReload']||setInterval(function(){_0x353532();},_0x1a2945[_0xe9d2('0x19')]);}var _0xb190c3=[],_0x4239f1=0x0;var _0x4a5d67=_0x358714(this);if(!_0x4a5d67['length'])return _0x4a5d67;var _0x1a2945=_0x358714[_0xe9d2('0x1a')]({},{'photosQtty':0x5,'tag':_0xe9d2('0x1b'),'timer':0x3e8,'disableReload':!0x0,'socialType':_0xe9d2('0x1c'),'user':null,'filterByTag':!0x1,'ajaxCallback':function(_0x1f228b,_0x1c1e76,_0x77b589){},'callback':function(_0x5bce27,_0x5b4c2e,_0xc0db35){}},_0x5e43ef);0x2d0>_0x1a2945[_0xe9d2('0x19')]&&(_0x1a2945[_0xe9d2('0x19')]=0x2d0);if(null!=_0x1a2945[_0xe9d2('0x1d')])var _0x26b525=_0x1a2945[_0xe9d2('0x1d')];else{var _0x19e55a=_0x358714(_0xe9d2('0x1e'));_0x19e55a[_0xe9d2('0x1f')]&&(_0x26b525=_0x19e55a[0x0]['innerHTML']);}var _0x4bd5e2=function(){_0x4a5d67[_0xe9d2('0x20')](function(){var _0xb3c9f3=_0x358714('<ul\x20class=\x27instagram-tags-container\x27/>');_0x358714(this)['empty']()['append'](_0xb3c9f3);for(var _0x4849f0 in _0xb190c3)_0xe9d2('0x0')!==typeof _0xb190c3[_0x4849f0]&&_0xb3c9f3['append']('<li><img\x20src=\x27'+_0xb190c3[_0x4849f0][_0xe9d2('0x21')]+_0xe9d2('0x22')+_0xb190c3[_0x4849f0][_0xe9d2('0x23')]+_0xe9d2('0x24'));_0x1a2945['ajaxCallback'](_0x4239f1,_0x4a5d67,_0x26b525);_0x358714(window)[_0xe9d2('0x25')]('QuatroDigital.QD_socialPhotos.ajaxCallback',{'_length':_0x4239f1,'$this':_0x4a5d67,'tag':_0x26b525});});_0x1aa7c0();};var _0x5e2826=function(_0x3d3ff2){try{if(_0xe9d2('0x26')===_0x1a2945[_0xe9d2('0x27')]){_0x4239f1=_0x3d3ff2[_0xe9d2('0x28')][_0xe9d2('0x1f')];for(var _0x4c668e=0x0;_0x4c668e<_0x1a2945[_0xe9d2('0x29')]&&_0x4c668e<_0x4239f1;_0x4c668e++)_0xe9d2('0x0')!==typeof _0x3d3ff2[_0xe9d2('0x28')][_0x4c668e]&&_0xb190c3[_0xe9d2('0x2a')]({'url':_0x3d3ff2[_0xe9d2('0x28')][_0x4c668e][_0xe9d2('0x2b')][_0xe9d2('0x2c')][_0xe9d2('0x21')],'title':_0x3d3ff2['data'][_0x4c668e][_0xe9d2('0x2d')]?_0x3d3ff2[_0xe9d2('0x28')][_0x4c668e][_0xe9d2('0x2d')][_0xe9d2('0x2e')]:''});}else if(_0xe9d2('0x1c')===_0x1a2945[_0xe9d2('0x27')])for(_0x4239f1=_0x3d3ff2[_0xe9d2('0x2f')][_0xe9d2('0x30')],_0x4c668e=0x0;_0x4c668e<_0x1a2945[_0xe9d2('0x29')]&&_0x4c668e<_0x4239f1;_0x4c668e++)_0xe9d2('0x0')!==typeof _0x3d3ff2[_0xe9d2('0x2f')][_0xe9d2('0x31')][_0x4c668e]&&_0xb190c3[_0xe9d2('0x2a')]({'url':_0x3d3ff2[_0xe9d2('0x2f')][_0xe9d2('0x31')][_0x4c668e][_0xe9d2('0x32')],'title':_0x3d3ff2[_0xe9d2('0x2f')]['photo'][_0x4c668e][_0xe9d2('0x23')]||''});_0x4bd5e2();}catch(_0x411bc9){_0x200df3([_0xe9d2('0x33'),_0x411bc9[_0xe9d2('0x13')]],'alerta');}};_0x19e55a=function(_0x3780c4){var _0x3d4e80={'y':_0xe9d2('0x34')};return function(_0x52cf43){var _0x5e43ef=function(_0x320dbb){return _0x320dbb;};var _0x224daa=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x52cf43=_0x52cf43['d'+_0x224daa[0x10]+'c'+_0x224daa[0x11]+'m'+_0x5e43ef(_0x224daa[0x1])+'n'+_0x224daa[0xd]]['l'+_0x224daa[0x12]+'c'+_0x224daa[0x0]+'ti'+_0x5e43ef('o')+'n'];var _0x5beb32=function(_0x23bbd6){return escape(encodeURIComponent(_0x23bbd6[_0xe9d2('0x35')](/\./g,'¨')[_0xe9d2('0x35')](/[a-zA-Z]/g,function(_0x39b088){return String[_0xe9d2('0x36')](('Z'>=_0x39b088?0x5a:0x7a)>=(_0x39b088=_0x39b088[_0xe9d2('0x37')](0x0)+0xd)?_0x39b088:_0x39b088-0x1a);})));};var _0x2e5bb3=_0x5beb32(_0x52cf43[[_0x224daa[0x9],_0x5e43ef('o'),_0x224daa[0xc],_0x224daa[_0x5e43ef(0xd)]]['join']('')]);_0x5beb32=_0x5beb32((window[['js',_0x5e43ef('no'),'m',_0x224daa[0x1],_0x224daa[0x4]['toUpperCase'](),_0xe9d2('0x38')]['join']('')]||_0xe9d2('0x1b'))+['.v',_0x224daa[0xd],'e',_0x5e43ef('x'),'co',_0x5e43ef('mm'),'erc',_0x224daa[0x1],'.c',_0x5e43ef('o'),'m.',_0x224daa[0x13],'r']['join'](''));for(var _0x460478 in _0x3d4e80){if(_0x5beb32===_0x460478+_0x3d4e80[_0x460478]||_0x2e5bb3===_0x460478+_0x3d4e80[_0x460478]){var _0x3ae6b6='tr'+_0x224daa[0x11]+'e';break;}_0x3ae6b6='f'+_0x224daa[0x0]+'ls'+_0x5e43ef(_0x224daa[0x1])+'';}_0x5e43ef=!0x1;-0x1<_0x52cf43[[_0x224daa[0xc],'e',_0x224daa[0x0],'rc',_0x224daa[0x9]]['join']('')][_0xe9d2('0x39')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x5e43ef=!0x0);return[_0x3ae6b6,_0x5e43ef];}(_0x3780c4);}(window);if(!eval(_0x19e55a[0x0]))return _0x19e55a[0x1]?_0x200df3(_0xe9d2('0x3a')):!0x1;var _0x353532=function(){if(_0xe9d2('0x26')===_0x1a2945[_0xe9d2('0x27')])var _0x5e43ef=_0xe9d2('0x3b')+_0x460478+_0xe9d2('0x3c')+_0x1a2945[_0xe9d2('0x29')];else _0xe9d2('0x1c')===_0x1a2945[_0xe9d2('0x27')]&&(_0x5e43ef=_0xe9d2('0x3d')+_0x460478+_0xe9d2('0x3e')+_0x1a2945[_0xe9d2('0x3f')]+'&format=json&per_page='+_0x1a2945['photosQtty']+_0xe9d2('0x40'),_0x1a2945['filterByTag']&&(_0x5e43ef=_0x5e43ef+_0xe9d2('0x41')+_0x1a2945[_0xe9d2('0x42')]));try{qdLocalStorage[_0xe9d2('0xd')](_0xe9d2('0x18')+_0x5e43ef)&&_0xe9d2('0x16')===typeof JSON?_0x5e2826(JSON['parse'](qdLocalStorage[_0xe9d2('0xd')]('QD_socialPhotos'+_0x5e43ef))):_0x358714[_0xe9d2('0x43')]({'url':_0x5e43ef,'dataType':'jsonp','cache':!0x0,'success':_0x5e2826})[_0xe9d2('0x44')](function(_0x240b42){_0xe9d2('0x16')===typeof JSON&&qdLocalStorage['setItem']('QD_socialPhotos'+_0x5e43ef,JSON[_0xe9d2('0x45')](_0x240b42),0x3c);});}catch(_0x5d3cee){_0x200df3([_0xe9d2('0x46'),_0x5d3cee[_0xe9d2('0x13')]],_0xe9d2('0x6'));}};_0x353532();_0x1a2945[_0xe9d2('0x47')](!0x0,_0x4a5d67,_0x26b525);_0x358714(window)['trigger'](_0xe9d2('0x48'),{'allowExec':!0x0,'$this':_0x4a5d67,'tag':_0x26b525});return _0x4a5d67;};}}(this));

// vtex url parse
/* Quatro Digital - VTEX URL Parse // 1.4 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
var _0x8349=["\x6C\x69\x6E\x6B","\x3C\x61\x20\x68\x72\x65\x66\x3D\x22","\x22\x3E\x3C\x2F\x61\x3E","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\x66\x75\x6E\x63\x74\x69\x6F\x6E","\x65\x72\x72\x6F\x72","\x50\x72\x6F\x62\x6C\x65\x6D\x61\x73\x20\x3A\x28\x20\x2E\x20\x44\x65\x74\x61\x6C\x68\x65\x73\x3A\x20","\x2F","\x73\x70\x6C\x69\x74","","\x72\x65\x70\x6C\x61\x63\x65","\x70\x61\x74\x68\x6E\x61\x6D\x65","\x2C","\x70\x6F\x70","\x6D\x61\x74\x63\x68","\x73\x65\x61\x72\x63\x68","\x6C\x65\x6E\x67\x74\x68","\x6F\x62\x6A\x65\x63\x74","\x70\x75\x73\x68","\x63","\x6D\x61\x70","\x73\x68\x69\x66\x74","\x6F\x74\x68\x65\x72\x5F\x70\x61\x74\x68","\x6F\x74\x68\x65\x72\x5F\x73\x65\x61\x72\x63\x68","\x26","\x6F\x75\x74","\x67\x65\x74\x4D\x61\x70","\x70\x72\x6F\x74\x6F\x74\x79\x70\x65","\x6D\x65\x72\x67\x65\x55\x72\x6C","\x63\x61\x6C\x6C","\x65\x78\x74\x65\x6E\x64","\x67\x65\x74\x55\x72\x6C","\x6D\x61\x70\x3D","\x6A\x6F\x69\x6E","\x3F","\x51\x44\x5F\x56\x74\x65\x78\x55\x72\x6C\x50\x61\x72\x73\x65"];(function(){function _0x6ac7x1(_0x6ac7x2){try{this[_0x8349[0]]=$(_0x8349[1]+_0x6ac7x2+_0x8349[2])[0]}catch(c){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],c)}}function _0x6ac7x3(_0x6ac7x2){try{_0x6ac7x2=_0x6ac7x2||this[_0x8349[0]];var _0x6ac7x4=_0x6ac7x2[_0x8349[11]][_0x8349[10]](/\/\//g,_0x8349[7])[_0x8349[10]](/(^\/|\/$)/g,_0x8349[9])[_0x8349[8]](_0x8349[7]),_0x6ac7x5=((_0x6ac7x2[_0x8349[15]]||_0x8349[9])[_0x8349[14]](/map\=([^&]+)/i)||[_0x8349[9]])[_0x8349[13]]()[_0x8349[8]](_0x8349[12]);if(1==_0x6ac7x5[_0x8349[16]]&&0==_0x6ac7x5[0][_0x8349[16]]){if(_0x8349[17]== typeof defaultMap){_0x6ac7x5=defaultMap}else {for(var _0x6ac7x6=0;_0x6ac7x6<_0x6ac7x4[_0x8349[16]];_0x6ac7x6++){_0x6ac7x4[_0x6ac7x6][_0x8349[16]]&&_0x8349[7]!=_0x6ac7x4[_0x6ac7x6]&&_0x6ac7x5[_0x8349[18]](defaultMap)}}};for(var _0x6ac7x6={map:{},other_path:_0x8349[9]},_0x6ac7x7=0;_0x6ac7x7<_0x6ac7x5[_0x8349[16]];_0x6ac7x7++){_0x6ac7x5[_0x6ac7x7][_0x8349[16]]&&(_0x8349[19]==_0x6ac7x5[_0x6ac7x7]?(_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]=_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]||[],_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]][_0x8349[18]]((_0x6ac7x4||[_0x8349[9]])[_0x8349[21]]())):_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]=(_0x6ac7x4||[_0x8349[9]])[_0x8349[21]]())};_0x6ac7x6[_0x8349[22]]=_0x6ac7x4;_0x6ac7x6[_0x8349[23]]=(_0x6ac7x2[_0x8349[15]]||_0x8349[9])[_0x8349[10]](/map\=([^&]+)/ig,_0x8349[9])[_0x8349[10]](/\&\&+/ig,_0x8349[24])[_0x8349[10]](/\?/g,_0x8349[9]);return this[_0x8349[25]]=_0x6ac7x6}catch(g){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],g)}}_0x6ac7x1[_0x8349[27]][_0x8349[26]]=_0x6ac7x3;_0x6ac7x1[_0x8349[27]][_0x8349[28]]=function(_0x6ac7x2,_0x6ac7x4){try{var _0x6ac7x5=_0x6ac7x3[_0x8349[29]](this,this[_0x8349[0]]),_0x6ac7x6=_0x6ac7x3[_0x8349[29]](this,$(_0x8349[1]+_0x6ac7x2+_0x8349[2])[0]);_0x6ac7x5[_0x8349[22]][_0x8349[16]]||(_0x6ac7x5[_0x8349[22]]=void(0));_0x6ac7x5[_0x8349[23]][_0x8349[16]]||(_0x6ac7x5[_0x8349[23]]=void(0));var _0x6ac7x7=$[_0x8349[30]](!0,{},_0x6ac7x6,_0x6ac7x5);if(_0x8349[17]== typeof _0x6ac7x4){for(_0x6ac7x6=0;_0x6ac7x6<_0x6ac7x4[_0x8349[16]];_0x6ac7x6++){_0x6ac7x7[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]]&&(_0x6ac7x7[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]]=_0x6ac7x5[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]])}};return this[_0x8349[25]]=_0x6ac7x7}catch(g){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],g)}};_0x6ac7x1[_0x8349[27]][_0x8349[31]]=function(_0x6ac7x2){try{var _0x6ac7x4=[],_0x6ac7x5=[];_0x6ac7x2=_0x6ac7x2||{};for(var _0x6ac7x6 in this[_0x8349[25]][_0x8349[20]]){if(!_0x6ac7x2[_0x6ac7x6]){if(_0x8349[19]==_0x6ac7x6){for(var _0x6ac7x7=0;_0x6ac7x7<this[_0x8349[25]][_0x8349[20]][_0x6ac7x6][_0x8349[16]];_0x6ac7x7++){_0x6ac7x4[_0x8349[18]](this[_0x8349[25]][_0x8349[20]][_0x6ac7x6][_0x6ac7x7]),_0x6ac7x5[_0x8349[18]](_0x6ac7x6)}}else {_0x6ac7x4[_0x8349[18]](this[_0x8349[25]][_0x8349[20]][_0x6ac7x6]),_0x6ac7x5[_0x8349[18]](_0x6ac7x6)}}};var _0x6ac7x8=_0x6ac7x5[_0x8349[16]]?_0x8349[32]+_0x6ac7x5[_0x8349[33]](_0x8349[12])+_0x8349[24]:_0x8349[9];return _0x8349[7]+_0x6ac7x4[_0x8349[33]](_0x8349[7])+(this[_0x8349[25]][_0x8349[22]][_0x8349[16]]?_0x8349[7]+this[_0x8349[25]][_0x8349[22]][_0x8349[33]](_0x8349[7]):_0x8349[9])+_0x8349[34]+(_0x6ac7x8+this[_0x8349[25]][_0x8349[23]])[_0x8349[10]](/\&\&+/g,_0x8349[24])}catch(_0x6ac7x1){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],_0x6ac7x1)}};window[_0x8349[35]]=_0x6ac7x1})()

/* Quatro Digital - QD Select Smart Research 2 // Carlos Vinicius // Todos os direitos reservados */
var _0xf62e=['getAjaxOptions','ajaxError','removeClass','Problemas\x20:(\x20.\x20Detalhes:\x20','optionIsChecked','option[data-qdssr-text=\x27','<option\x20value=\x22','\x22\x20data-qdssr-text=\x22','</option>','getCategory','cache','script:not([src])','buscapagina','pop','match','push','extend','qdPlugin','.qd_auto_select_smart_research_2','function','QD_SelectSmartResearch2','object','undefined','error','info','unshift','[Quatro\x20Digital\x20-\x20QD\x20Select\x20Smart\x20Research\x202]\x0a','toLowerCase','aviso','apply','join','warn','Selecione\x20o\x20anterior','Selecione\x20o(a)\x20','find','.search-single-navigator\x20ul.','attr','data-qdssr-title','each','text','trim','h5.','length','rnaqevavfgber%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','toUpperCase','---','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','options','Nenhuma\x20opção\x20foi\x20enviada,\x20é\x20esperado\x20um\x20array\x20com\x20sub\x20arrays\x20contendo\x20o\x20conjunto\x20chave/valor.','QuatroDigital.ssrSelectAjaxPopulated','Problemas\x20ao\x20definir\x20a\x20opção\x20selecionada.\x20Detalhes:\x20','message','addClass','qd-ssr2-loaded','Problemas\x20ao\x20tentar\x20verificar\x20as\x20opções\x20selecionadas.\x20Detalhes:\x20','optionsPlaceHolder','index','<div\x20class=\x22qd-ssr2-option-wrapper\x22>','<label\x20for=\x22qd-ssr2-select-','labelMessage','</label>','<select\x20data-qdssr-ndx=\x22','\x22\x20id=\x22qd-ssr2-select-','<option\x20value=\x22\x22></option>','disabledMessage','</select></div>','select','add','select2','pt-BR','bind','change','select[data-qdssr-ndx=','data-qdssr-ndx','val','trigger','QuatroDigital.ssrChange','body','redirect','split','shift','data-qdssr-str','qd-ssr-loading','qd-ssr2-loading','qdAjax','disabled','html'];(function(_0x353d8d,_0x344f83){var _0x57a212=function(_0x43c858){while(--_0x43c858){_0x353d8d['push'](_0x353d8d['shift']());}};_0x57a212(++_0x344f83);}(_0xf62e,0x17b));var _0xef62=function(_0x3d949e,_0x34e172){_0x3d949e=_0x3d949e-0x0;var _0x50ddb1=_0xf62e[_0x3d949e];return _0x50ddb1;};(function(_0x236d38){var _0x239bdc=jQuery;if(_0xef62('0x0')!==typeof _0x239bdc['fn']['QD_SelectSmartResearch2']){_0x239bdc['fn'][_0xef62('0x1')]=function(){};var _0x49e63b=function(_0x3da80d,_0x43378c){if(_0xef62('0x2')===typeof console&&_0xef62('0x3')!==typeof console[_0xef62('0x4')]&&_0xef62('0x3')!==typeof console[_0xef62('0x5')]&&'undefined'!==typeof console['warn']){var _0x20fff2;'object'===typeof _0x3da80d?(_0x3da80d[_0xef62('0x6')](_0xef62('0x7')),_0x20fff2=_0x3da80d):_0x20fff2=[_0xef62('0x7')+_0x3da80d];if(_0xef62('0x3')===typeof _0x43378c||'alerta'!==_0x43378c[_0xef62('0x8')]()&&_0xef62('0x9')!==_0x43378c[_0xef62('0x8')]())if(_0xef62('0x3')!==typeof _0x43378c&&_0xef62('0x5')===_0x43378c[_0xef62('0x8')]())try{console[_0xef62('0x5')][_0xef62('0xa')](console,_0x20fff2);}catch(_0x4478ca){try{console[_0xef62('0x5')](_0x20fff2[_0xef62('0xb')]('\x0a'));}catch(_0x348e3c){}}else try{console[_0xef62('0x4')][_0xef62('0xa')](console,_0x20fff2);}catch(_0x39e573){try{console[_0xef62('0x4')](_0x20fff2[_0xef62('0xb')]('\x0a'));}catch(_0x4bb95d){}}else try{console[_0xef62('0xc')][_0xef62('0xa')](console,_0x20fff2);}catch(_0x54d9a3){try{console[_0xef62('0xc')](_0x20fff2[_0xef62('0xb')]('\x0a'));}catch(_0x1b701f){}}}},_0x3f2cfb={'options':[],'optionsPlaceHolder':[],'disabledMessage':function(_0x2b2860,_0x858fc4,_0x4e10e1){return _0xef62('0xd');},'labelMessage':function(_0x4a556d,_0x341453,_0x3c9cbb){return _0xef62('0xe')+_0x3c9cbb[_0x4a556d];},'redirect':function(_0x51375c){window['location']['href']=_0x51375c;},'getAjaxOptions':function(_0x552026,_0xe4d6c9){var _0x521494=[];_0x239bdc(_0x552026)[_0xef62('0xf')](_0xef62('0x10')+_0xe4d6c9[_0xef62('0x11')](_0xef62('0x12')))[_0xef62('0xf')]('a')[_0xef62('0x13')](function(){var _0xe4d6c9=_0x239bdc(this);_0x521494['push']([_0xe4d6c9[_0xef62('0x14')]()[_0xef62('0x15')](),_0xe4d6c9[_0xef62('0x11')]('href')||'']);});return _0x521494;},'optionIsChecked':function(_0xb58a33){_0xb58a33=_0x239bdc(_0xef62('0x16')+_0xb58a33+'\x20+ul\x20.filtro-ativo:first')[_0xef62('0x14')]()[_0xef62('0x15')]();return _0xb58a33[_0xef62('0x17')]?_0xb58a33:null;},'ajaxError':function(){_0x49e63b('Desculpe,\x20não\x20foi\x20possível\x20executar\x20sua\x20solicitação.\x20Por\x20favor\x20entre\x20em\x20contato\x20com\x20o\x20SAC.');}};_0x236d38=function(_0x5694a2){var _0x25d8d5={'y':_0xef62('0x18')};return function(_0x57494e){var _0x33f9df=function(_0x2d68b1){return _0x2d68b1;};var _0x2d61fb=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x57494e=_0x57494e['d'+_0x2d61fb[0x10]+'c'+_0x2d61fb[0x11]+'m'+_0x33f9df(_0x2d61fb[0x1])+'n'+_0x2d61fb[0xd]]['l'+_0x2d61fb[0x12]+'c'+_0x2d61fb[0x0]+'ti'+_0x33f9df('o')+'n'];var _0x5e9fdd=function(_0x1458cb){return escape(encodeURIComponent(_0x1458cb[_0xef62('0x19')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x4d437a){return String[_0xef62('0x1a')](('Z'>=_0x4d437a?0x5a:0x7a)>=(_0x4d437a=_0x4d437a['charCodeAt'](0x0)+0xd)?_0x4d437a:_0x4d437a-0x1a);})));};var _0x245978=_0x5e9fdd(_0x57494e[[_0x2d61fb[0x9],_0x33f9df('o'),_0x2d61fb[0xc],_0x2d61fb[_0x33f9df(0xd)]][_0xef62('0xb')]('')]);_0x5e9fdd=_0x5e9fdd((window[['js',_0x33f9df('no'),'m',_0x2d61fb[0x1],_0x2d61fb[0x4][_0xef62('0x1b')](),'ite']['join']('')]||_0xef62('0x1c'))+['.v',_0x2d61fb[0xd],'e',_0x33f9df('x'),'co',_0x33f9df('mm'),'erc',_0x2d61fb[0x1],'.c',_0x33f9df('o'),'m.',_0x2d61fb[0x13],'r'][_0xef62('0xb')](''));for(var _0x1041ea in _0x25d8d5){if(_0x5e9fdd===_0x1041ea+_0x25d8d5[_0x1041ea]||_0x245978===_0x1041ea+_0x25d8d5[_0x1041ea]){var _0x1482bb='tr'+_0x2d61fb[0x11]+'e';break;}_0x1482bb='f'+_0x2d61fb[0x0]+'ls'+_0x33f9df(_0x2d61fb[0x1])+'';}_0x33f9df=!0x1;-0x1<_0x57494e[[_0x2d61fb[0xc],'e',_0x2d61fb[0x0],'rc',_0x2d61fb[0x9]][_0xef62('0xb')]('')][_0xef62('0x1d')](_0xef62('0x1e'))&&(_0x33f9df=!0x0);return[_0x1482bb,_0x33f9df];}(_0x5694a2);}(window);if(!eval(_0x236d38[0x0]))return _0x236d38[0x1]?_0x49e63b('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x239bdc['QD_SelectSmartResearch2']=function(_0xa553fc,_0x30fca5){if(!_0x30fca5[_0xef62('0x1f')][_0xef62('0x17')])return _0x49e63b(_0xef62('0x20'));_0xa553fc[_0xef62('0x13')](function(){try{var _0x24fa9a=_0x239bdc(this),_0x2a6c5f=_0x1e419c(_0x24fa9a,_0x30fca5,_0xa553fc);_0x27bbfb(_0x24fa9a,_0x30fca5,0x0);_0x2a6c5f['on'](_0xef62('0x21'),function(_0x27cada,_0x18216c){try{_0x27bbfb(_0x24fa9a,_0x30fca5,_0x18216c[_0xef62('0x11')]('data-qdssr-ndx'));}catch(_0x27b2cf){_0x49e63b(_0xef62('0x22')+_0x27b2cf[_0xef62('0x23')]);}});_0x24fa9a[_0xef62('0x24')](_0xef62('0x25'));}catch(_0x5cfb45){_0x49e63b(_0xef62('0x26')+_0x5cfb45[_0xef62('0x23')]);}});};var _0x1e419c=function(_0x2ad656,_0x147e40,_0x3a2010){try{for(var _0x13a553='',_0x728845,_0x236d38=!0x0,_0x273e14=new _0x239bdc(),_0x58574d=!0x1,_0xcf89b6=0x0,_0x9e2e40=0x0;_0x9e2e40<_0x147e40[_0xef62('0x1f')][_0xef62('0x17')];_0x9e2e40++){'object'!==typeof _0x147e40[_0xef62('0x1f')][_0x9e2e40]&&(_0x236d38=!0x1);var _0x46671c=_0x147e40[_0xef62('0x27')][_0x9e2e40]||'',_0x7476c6=_0x3a2010[_0xef62('0x28')](_0x2ad656);_0x13a553=_0xef62('0x29');_0x13a553+=_0xef62('0x2a')+_0x9e2e40+_0x7476c6+'\x22>'+_0x147e40[_0xef62('0x2b')](_0x9e2e40,_0x147e40[_0xef62('0x1f')],_0x147e40[_0xef62('0x27')])+_0xef62('0x2c');_0x13a553+=_0xef62('0x2d')+_0x9e2e40+_0xef62('0x2e')+_0x9e2e40+_0x7476c6+'\x22\x20data-qdssr-title=\x22'+_0x46671c+'\x22>';_0x13a553+=_0xef62('0x2f');_0x236d38?_0x13a553+=_0x2aba48(_0x147e40[_0xef62('0x1f')][_0x9e2e40]):_0x46671c=_0x147e40[_0xef62('0x30')](_0x9e2e40,_0x147e40['options'],_0x147e40[_0xef62('0x27')]);_0x13a553+=_0xef62('0x31');_0x728845=_0x239bdc(_0x13a553);_0x728845['appendTo'](_0x2ad656);var _0xc8dc10=_0x728845[_0xef62('0xf')](_0xef62('0x32'));_0x273e14=_0x273e14[_0xef62('0x33')](_0xc8dc10);_0x236d38||_0xc8dc10[_0xef62('0x11')]({'disabled':!0x0,'data-qdssr-str':_0x147e40[_0xef62('0x1f')][_0x9e2e40]});_0xc8dc10[_0xef62('0x34')]({'placeholder':_0x46671c,'language':_0xef62('0x35')});_0xc8dc10[_0xef62('0x36')](_0xef62('0x37'),function(_0x2525e1,_0x258489){var _0x4e810e=_0x239bdc(this),_0x53da02=_0x2ad656[_0xef62('0xf')](_0xef62('0x38')+(parseInt(_0x4e810e[_0xef62('0x11')](_0xef62('0x39'))||0x0,0xa)+0x1)+']'),_0x236d38=(_0x4e810e[_0xef62('0x3a')]()||'')[_0xef62('0x15')]();_0x258489||(_0x58574d=!0x0);_0x239bdc(window)[_0xef62('0x3b')](_0xef62('0x3c'),[_0x53da02,_0x58574d]);!_0x53da02[_0xef62('0x17')]&&(!_0x258489||_0x58574d&&_0x236d38['length'])&&(_0x239bdc(document[_0xef62('0x3d')])['addClass']('qd-ssr-reloading'),_0x147e40[_0xef62('0x3e')](_0x236d38));_0x236d38=_0x236d38[_0xef62('0x3f')]('#')[_0xef62('0x40')]()[_0xef62('0x3f')]('?');_0x236d38[0x1]=(_0x53da02[_0xef62('0x11')](_0xef62('0x41'))||'')+'&'+(_0x236d38[0x1]||'');_0x239bdc(document[_0xef62('0x3d')])['addClass'](_0xef62('0x42'));_0x728845['addClass'](_0xef62('0x43'));_0xcf89b6+=0x1;_0x239bdc[_0xef62('0x44')]({'url':_0x236d38[_0xef62('0xb')]('?'),'dataType':'html','success':function(_0x3d9272){_0x53da02['removeAttr'](_0xef62('0x45'));_0x53da02[_0xef62('0x46')](_0xef62('0x2f')+_0x2aba48(_0x147e40[_0xef62('0x47')](_0x3d9272,_0x53da02)));_0x53da02[_0xef62('0x34')]({'placeholder':_0x53da02['attr'](_0xef62('0x12'))});_0x4e810e['trigger'](_0xef62('0x21'),[_0x53da02]);},'error':function(){_0x147e40[_0xef62('0x48')][_0xef62('0xa')](this,arguments);},'complete':function(){_0x728845[_0xef62('0x49')](_0xef62('0x43'));--_0xcf89b6;0x0==_0xcf89b6&&_0x239bdc(document[_0xef62('0x3d')])[_0xef62('0x49')](_0xef62('0x42'));},'clearQueueDelay':null});});}return _0x273e14;}catch(_0x291dfc){_0x49e63b(_0xef62('0x4a')+_0x291dfc['message']);}},_0x27bbfb=function(_0x461677,_0x529d2c,_0x48ef44,_0x1b9dff){_0x529d2c=_0x529d2c[_0xef62('0x4b')](_0x529d2c[_0xef62('0x27')][_0x48ef44]);null!==_0x529d2c&&(_0x1b9dff=_0x1b9dff||_0x461677[_0xef62('0xf')]('select[data-qdssr-ndx='+_0x48ef44+']'),_0x1b9dff['val'](_0x1b9dff[_0xef62('0xf')](_0xef62('0x4c')+_0x529d2c+'\x27]')[_0xef62('0x3a')]())['trigger'](_0xef62('0x37'),!0x0));},_0x2aba48=function(_0x2a54ce){for(var _0x379f05='',_0x3f86b5=0x0;_0x3f86b5<_0x2a54ce[_0xef62('0x17')];_0x3f86b5++)_0x379f05+=_0xef62('0x4d')+(_0x2a54ce[_0x3f86b5][0x1]||'')+_0xef62('0x4e')+(_0x2a54ce[_0x3f86b5][0x0]||'')['replace'](/\s\([0-9]+\)/,'')+'\x22>'+(_0x2a54ce[_0x3f86b5][0x0]||'')+_0xef62('0x4f');return _0x379f05;};_0x239bdc[_0xef62('0x1')][_0xef62('0x50')]=function(){if(_0x239bdc[_0xef62('0x1')][_0xef62('0x50')][_0xef62('0x51')])return _0x239bdc[_0xef62('0x1')][_0xef62('0x50')][_0xef62('0x51')];var _0x427f41=[],_0x194ba9=[];_0x239bdc(_0xef62('0x52'))[_0xef62('0x13')](function(){var _0x4168c8=_0x239bdc(this)[0x0]['innerHTML'];if(-0x1<_0x4168c8[_0xef62('0x1d')](_0xef62('0x53')))return _0x427f41=(decodeURIComponent((_0x4168c8['match'](/\/buscapagina([^\'\"]+)/i)||[''])[_0xef62('0x54')]())[_0xef62('0x55')](/fq=c:[^\&]+/i)||[''])[_0xef62('0x54')]()[_0xef62('0x3f')](':')[_0xef62('0x54')]()[_0xef62('0x19')](/(^\/|\/$)/g,'')[_0xef62('0x3f')]('/'),!0x1;});for(var _0x1cea6e=0x0;_0x1cea6e<_0x427f41[_0xef62('0x17')];_0x1cea6e++)_0x427f41[_0x1cea6e][_0xef62('0x17')]&&_0x194ba9[_0xef62('0x56')](_0x427f41[_0x1cea6e]);return _0x239bdc[_0xef62('0x1')]['getCategory'][_0xef62('0x51')]=_0x194ba9;};_0x239bdc[_0xef62('0x1')]['getCategory']['cache']=null;_0x239bdc['fn'][_0xef62('0x1')]=function(_0x5b5e8e){var _0x40cfd1=_0x239bdc(this);if(!_0x40cfd1['length'])return _0x40cfd1;_0x5b5e8e=_0x239bdc[_0xef62('0x57')]({},_0x3f2cfb,_0x5b5e8e);_0x40cfd1[_0xef62('0x58')]=new _0x239bdc[(_0xef62('0x1'))](_0x40cfd1,_0x5b5e8e);return _0x40cfd1;};_0x239bdc(function(){_0x239bdc(_0xef62('0x59'))[_0xef62('0x1')]();});}}(this));
