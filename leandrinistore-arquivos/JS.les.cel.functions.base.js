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

			$('<div class="qd-sp-wrap"> <p class="qd_displayPrice shelf-qd-v1-sp-best-price">R$ </p> <span>com</span> <span class="qd-sp-display-discount shelf-qd-v1-sp-discount"> 0% de desconto</span> </div>').insertAfter(".shelf-price:not(.qd-on)");

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
			Home.applySliderFull();
			Home.brandCarousel();
			Home.shelfCarouselHome();
			Home.shelfCarouselCollection();
			Home.organizeSideMenuCollection();
			Home.mosaicSetCol();
			Home.instagramPhotoFeed();
			
			// Home.selectSmartResearch2();			
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		applySliderFull: function () {
			var wrapper = $('.slider-qd-v1-full');

			setTimeout(function () {
				wrapper.slick({
					autoplay: true,
					dots: false,
					fade: true,
					cssEase: 'linear',
					infinite: true,
					speed: 500,
					draggable: false
				});
			}, 500);

			/*wrapper.each(function () {
				$(this).find('.slick-arrow').wrapAll('<div class="slick-nav" />');
			});*/
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
			var wrapper = $('.shelf-qd-v1-carousel');

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
		shelfCarouselCollection: function () {
			var wrapper = $('.qd-category-collections');

			// Titulo
			wrapper.each(function () {
				var wrap = $(this);
				wrap.find("h2").hide();
			});

			wrapper.find('.prateleira').owlCarousel({
				items: 4,
				navigation: true,
				pagination: false
			});
		},
		organizeSideMenuCollection: function() {
			var wrapper = $('.qd-category-collections');

			if (wrapper.find('.box-banner').length < 1) {
				return
			}		
			
			wrapper.find('.prateleira').each(function () {
				var colCarousel = '<div class="col-xs-12 col-md-9 qd-category-collections-carousel"></div>';
				
				if ($(this).prev().length < 1)
					colCarousel = '<div class="col-xs-12 qd-category-collections-carousel"></div>';
				
				$(this).wrap(colCarousel);
			});

			wrapper.find('.box-banner').each(function(){
				$(this).wrap('<div class="col-xs-12 col-md-3 qd-category-collections-banner"></div>');
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
			Product.qdCallThumbVideo();	
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
		qdCallThumbVideo: function () {
			// $("#caracteristicas").append('<table cellspacing="0" class="group Especificacao"><tbody><tr class="even"><th class="name-field Fantasia-de">Fantasia de</th><td class="value-field Fantasia-de">Malévola</td></tr><tr><th class="name-field Codigo-do-Produto">Codigo do Produto</th><td class="value-field Codigo-do-Produto">43516</td></tr><tr class="even"><th class="name-field Itens-Inclusos">Itens Inclusos</th><td class="value-field Itens-Inclusos">Vestido , Bolsa , Polainas , Peruca Com Faixa</td></tr><tr><th class="name-field Genero">Genero</th><td class="value-field Genero">Feminino</td></tr><tr class="even"><th class="name-field Garantia">Garantia</th><td class="value-field Garantia">30 dias</td></tr><tr><th class="name-field Video">Video</th><td class="value-field Video">https://www.youtube.com/watch?v=gCmBqppAyiU</td></tr><tr class="even"><th class="name-field Linha">Linha</th><td class="value-field Linha">Luxo</td></tr></tbody></table>');
			var iframe = $("td.value-field.Video:first iframe");

			if (!iframe.length) {
				window.qdVideoInProduct = {
					videoFieldSelector: 'td.value-field.Video:first',
					urlProtocol: 'https'
				};
				return;
			}

			window.qdVideoInProduct = {
				videoFieldSelector: $('<span/>').addClass('video-product').text('https://www.youtube.com/watch?v=' + iframe.attr("src").split("?").shift().split("/").pop() + '&rel=0'),
				urlProtocol: 'https'
			};
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

				$(".product-qd-v1-smart-price").append('<div class="qd-sp-wrap"> <p class="qd_displayPrice shelf-qd-v1-sp-best-price">R$ </p> <span>com</span> <span class="qd-sp-display-discount shelf-qd-v1-sp-discount"> 0% no boleto</span> </div>');

				$(".product-qd-v1-buy-button > div").removeClass('col-lg-6').addClass('col-lg-12');

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

var _0x3f86=['html','installments','installmentValue','changeInstallments','.qd_sp_display_installments','.qd_sp_display_installmentValue','.qd_sp_installments','.qd_saveAmount','append','.qd_saveAmountPercent','changeNativeSaveAmount','em.economia-de','each','skuSelected.vtex','qd_sp_processedItem','flagElement','forcePromotion','string','startedByWrapper','not','.qd_sp_processedItem','style','display:none\x20!important;','boolean','body','prototype','trim','replace','abs','undefined','pow','toFixed','round','split','function','Smart\x20Price','object','error','warn','unshift','toLowerCase','aviso','info','apply','join','text','search','.flag','[class*=\x27desconto\x27]','auto','label.skuBestInstallmentNumber','strong.skuPrice','QD_SmartPrice','rnaqevavfgber%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','productPage','closest','wrapperElement','isProductPage','find','skuBestPrice','qd-active','.qd_sp_on,\x20.qd_sp_ignored','.qd_active','length','removeClass','oneFlagByItem','siblings','.qd_sp_on','qd_sp_ignored','addClass','qd_sp_on','isDiscountFlag','attr','skuCorrente','skus','sku','bestPrice','isSmartCheckout','available','getDiscountValue','O\x20valor\x20informado\x20p/\x20o\x20desconto\x20não\x20é\x20um\x20número.','alerta','Por\x20alguma\x20razão\x20não\x20consegui\x20obter\x20o\x20preço\x20deste\x20produto\x20:(','appliedDiscount','listPrice','.qd_productOldPrice','val','qd-sp-active','skuPrice','.qd-sp-display-discount'];(function(_0x1cc69a,_0x39103e){var _0x36a7da=function(_0x3bce32){while(--_0x3bce32){_0x1cc69a['push'](_0x1cc69a['shift']());}};_0x36a7da(++_0x39103e);}(_0x3f86,0x199));var _0x63f8=function(_0x5971f4,_0x56198f){_0x5971f4=_0x5971f4-0x0;var _0x4cf5d7=_0x3f86[_0x5971f4];return _0x4cf5d7;};'function'!==typeof String[_0x63f8('0x0')][_0x63f8('0x1')]&&(String[_0x63f8('0x0')][_0x63f8('0x1')]=function(){return this[_0x63f8('0x2')](/^\s+|\s+$/g,'');});function qd_number_format(_0x2aa4b6,_0x388d36,_0x222099,_0x497029){_0x2aa4b6=(_0x2aa4b6+'')[_0x63f8('0x2')](/[^0-9+\-Ee.]/g,'');_0x2aa4b6=isFinite(+_0x2aa4b6)?+_0x2aa4b6:0x0;_0x388d36=isFinite(+_0x388d36)?Math[_0x63f8('0x3')](_0x388d36):0x0;_0x497029=_0x63f8('0x4')===typeof _0x497029?',':_0x497029;_0x222099=_0x63f8('0x4')===typeof _0x222099?'.':_0x222099;var _0x1b4f2d='',_0x1b4f2d=function(_0x2ac327,_0x1df827){var _0x388d36=Math[_0x63f8('0x5')](0xa,_0x1df827);return''+(Math['round'](_0x2ac327*_0x388d36)/_0x388d36)[_0x63f8('0x6')](_0x1df827);},_0x1b4f2d=(_0x388d36?_0x1b4f2d(_0x2aa4b6,_0x388d36):''+Math[_0x63f8('0x7')](_0x2aa4b6))[_0x63f8('0x8')]('.');0x3<_0x1b4f2d[0x0]['length']&&(_0x1b4f2d[0x0]=_0x1b4f2d[0x0][_0x63f8('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x497029));(_0x1b4f2d[0x1]||'')['length']<_0x388d36&&(_0x1b4f2d[0x1]=_0x1b4f2d[0x1]||'',_0x1b4f2d[0x1]+=Array(_0x388d36-_0x1b4f2d[0x1]['length']+0x1)['join']('0'));return _0x1b4f2d['join'](_0x222099);};(function(_0x5cefaa){'use strict';var _0x29d1e8=jQuery;if(typeof _0x29d1e8['fn']['QD_SmartPrice']===_0x63f8('0x9'))return;var _0x51c345=_0x63f8('0xa');var _0x77f310=function(_0x3d34c6,_0x2d16d8){if(_0x63f8('0xb')===typeof console&&_0x63f8('0x9')===typeof console[_0x63f8('0xc')]&&_0x63f8('0x9')===typeof console['info']&&_0x63f8('0x9')===typeof console[_0x63f8('0xd')]){var _0x4d880e;_0x63f8('0xb')===typeof _0x3d34c6?(_0x3d34c6[_0x63f8('0xe')]('['+_0x51c345+']\x0a'),_0x4d880e=_0x3d34c6):_0x4d880e=['['+_0x51c345+']\x0a'+_0x3d34c6];if('undefined'===typeof _0x2d16d8||'alerta'!==_0x2d16d8[_0x63f8('0xf')]()&&_0x63f8('0x10')!==_0x2d16d8[_0x63f8('0xf')]())if(_0x63f8('0x4')!==typeof _0x2d16d8&&_0x63f8('0x11')===_0x2d16d8[_0x63f8('0xf')]())try{console[_0x63f8('0x11')]['apply'](console,_0x4d880e);}catch(_0x30f437){console['info'](_0x4d880e['join']('\x0a'));}else try{console[_0x63f8('0xc')][_0x63f8('0x12')](console,_0x4d880e);}catch(_0x5e0e2e){console['error'](_0x4d880e[_0x63f8('0x13')]('\x0a'));}else try{console[_0x63f8('0xd')]['apply'](console,_0x4d880e);}catch(_0xf0410b){console[_0x63f8('0xd')](_0x4d880e[_0x63f8('0x13')]('\x0a'));}}};var _0x4fea17=/[0-9]+\%/i;var _0x328eca=/[0-9\.]+(?=\%)/i;var _0x19cc3a={'isDiscountFlag':function(_0x5d5d6b){if(_0x5d5d6b[_0x63f8('0x14')]()[_0x63f8('0x15')](_0x4fea17)>-0x1)return!![];return![];},'getDiscountValue':function(_0x54abb3){return _0x54abb3[_0x63f8('0x14')]()['match'](_0x328eca);},'startedByWrapper':![],'flagElement':_0x63f8('0x16'),'wrapperElement':'li','filterFlagBy':_0x63f8('0x17'),'forcePromotion':null,'appliedDiscount':null,'oneFlagByItem':!![],'isSmartCheckout':!![],'changeInstallments':![],'productPage':{'changeNativeSaveAmount':!![],'changeNativePrice':!![],'changeInstallments':![],'isProductPage':_0x63f8('0x18'),'wrapperElement':'.productRightColumn','skuBestPrice':'strong.skuBestPrice','installments':_0x63f8('0x19'),'installmentValue':'label.skuBestInstallmentValue','skuPrice':_0x63f8('0x1a')}};_0x29d1e8['fn'][_0x63f8('0x1b')]=function(){};var _0x3b83ba=function(_0x30409f){var _0xd1e579={'y':_0x63f8('0x1c')};return function(_0x22745f){var _0x4b8362,_0x573df7,_0x2e174d,_0x19652e;_0x573df7=function(_0x564b1a){return _0x564b1a;};_0x2e174d=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x22745f=_0x22745f['d'+_0x2e174d[0x10]+'c'+_0x2e174d[0x11]+'m'+_0x573df7(_0x2e174d[0x1])+'n'+_0x2e174d[0xd]]['l'+_0x2e174d[0x12]+'c'+_0x2e174d[0x0]+'ti'+_0x573df7('o')+'n'];_0x4b8362=function(_0xe439eb){return escape(encodeURIComponent(_0xe439eb[_0x63f8('0x2')](/\./g,'¨')[_0x63f8('0x2')](/[a-zA-Z]/g,function(_0x3de82f){return String[_0x63f8('0x1d')](('Z'>=_0x3de82f?0x5a:0x7a)>=(_0x3de82f=_0x3de82f[_0x63f8('0x1e')](0x0)+0xd)?_0x3de82f:_0x3de82f-0x1a);})));};var _0x4a742a=_0x4b8362(_0x22745f[[_0x2e174d[0x9],_0x573df7('o'),_0x2e174d[0xc],_0x2e174d[_0x573df7(0xd)]][_0x63f8('0x13')]('')]);_0x4b8362=_0x4b8362((window[['js',_0x573df7('no'),'m',_0x2e174d[0x1],_0x2e174d[0x4][_0x63f8('0x1f')](),_0x63f8('0x20')][_0x63f8('0x13')]('')]||'---')+['.v',_0x2e174d[0xd],'e',_0x573df7('x'),'co',_0x573df7('mm'),'erc',_0x2e174d[0x1],'.c',_0x573df7('o'),'m.',_0x2e174d[0x13],'r'][_0x63f8('0x13')](''));for(var _0x2ad41f in _0xd1e579){if(_0x4b8362===_0x2ad41f+_0xd1e579[_0x2ad41f]||_0x4a742a===_0x2ad41f+_0xd1e579[_0x2ad41f]){_0x19652e='tr'+_0x2e174d[0x11]+'e';break;}_0x19652e='f'+_0x2e174d[0x0]+'ls'+_0x573df7(_0x2e174d[0x1])+'';}_0x573df7=!0x1;-0x1<_0x22745f[[_0x2e174d[0xc],'e',_0x2e174d[0x0],'rc',_0x2e174d[0x9]][_0x63f8('0x13')]('')][_0x63f8('0x21')](_0x63f8('0x22'))&&(_0x573df7=!0x0);return[_0x19652e,_0x573df7];}(_0x30409f);}(window);if(!eval(_0x3b83ba[0x0]))return _0x3b83ba[0x1]?_0x77f310('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x52c738=function(_0x3b25b6,_0x57baa9){'use strict';var _0x1bfe5a=function(_0x37a47a){'use strict';var _0x3412fc,_0x42d435,_0x2e7ffb,_0x3abb94,_0x49149d,_0x2bb3f1,_0xfd04d9,_0x8d7b26,_0x542e49,_0x3fafcb,_0x1cb2bc,_0xaa68d4,_0x3cfccf,_0x3497ef,_0x268669,_0x332da1,_0x59f4d9,_0x3b66de,_0x1a00d7;var _0x652774=_0x29d1e8(this);_0x37a47a=typeof _0x37a47a===_0x63f8('0x4')?![]:_0x37a47a;if(_0x57baa9[_0x63f8('0x23')]['isProductPage'])var _0x14bc2d=_0x652774[_0x63f8('0x24')](_0x57baa9[_0x63f8('0x23')][_0x63f8('0x25')]);else var _0x14bc2d=_0x652774['closest'](_0x57baa9[_0x63f8('0x25')]);if(!_0x37a47a&&!_0x652774['is'](_0x57baa9['filterFlagBy'])){if(_0x57baa9[_0x63f8('0x23')][_0x63f8('0x26')]&&_0x14bc2d['is'](_0x57baa9[_0x63f8('0x23')]['wrapperElement'])){_0x14bc2d[_0x63f8('0x27')](_0x57baa9[_0x63f8('0x23')][_0x63f8('0x28')])['addClass'](_0x63f8('0x29'));_0x14bc2d['addClass']('qd-sp-active');}return;}var _0x12bc37=_0x57baa9[_0x63f8('0x23')][_0x63f8('0x26')];if(_0x652774['is'](_0x63f8('0x2a'))&&!_0x12bc37)return;if(_0x12bc37){_0x8d7b26=_0x14bc2d[_0x63f8('0x27')](_0x57baa9[_0x63f8('0x23')][_0x63f8('0x28')]);if(_0x8d7b26[_0x63f8('0x27')](_0x63f8('0x2b'))[_0x63f8('0x2c')])return;_0x8d7b26[_0x63f8('0x2d')](_0x63f8('0x29'));_0x14bc2d['removeClass']('qd-sp-active');}if(_0x57baa9[_0x63f8('0x2e')]&&_0x652774[_0x63f8('0x2f')](_0x63f8('0x30'))[_0x63f8('0x2c')]){_0x652774['addClass'](_0x63f8('0x31'));return;}_0x652774[_0x63f8('0x32')](_0x63f8('0x33'));if(!_0x57baa9[_0x63f8('0x34')](_0x652774))return;if(_0x12bc37){_0x2e7ffb={};var _0x3fa54b=parseInt(_0x29d1e8('div[skuCorrente]:first')[_0x63f8('0x35')](_0x63f8('0x36')),0xa);if(_0x3fa54b){for(var _0xa8d00e=0x0;_0xa8d00e<skuJson[_0x63f8('0x37')]['length'];_0xa8d00e++){if(skuJson['skus'][_0xa8d00e][_0x63f8('0x38')]==_0x3fa54b){_0x2e7ffb=skuJson['skus'][_0xa8d00e];break;}}}else{var _0x58da78=0x5af3107a3fff;for(var _0x49c4cd in skuJson[_0x63f8('0x37')]){if(typeof skuJson['skus'][_0x49c4cd]==='function')continue;if(!skuJson[_0x63f8('0x37')][_0x49c4cd]['available'])continue;if(skuJson['skus'][_0x49c4cd][_0x63f8('0x39')]<_0x58da78){_0x58da78=skuJson[_0x63f8('0x37')][_0x49c4cd][_0x63f8('0x39')];_0x2e7ffb=skuJson['skus'][_0x49c4cd];}}}}_0x332da1=!![];_0x59f4d9=0x0;if(_0x57baa9[_0x63f8('0x3a')]&&_0x3b66de){_0x332da1=skuJson[_0x63f8('0x3b')];if(!_0x332da1)return _0x14bc2d[_0x63f8('0x32')]('qd-sp-product-unavailable');}_0x42d435=_0x57baa9[_0x63f8('0x3c')](_0x652774);_0x3412fc=parseFloat(_0x42d435,0xa);if(isNaN(_0x3412fc))return _0x77f310([_0x63f8('0x3d'),_0x652774],_0x63f8('0x3e'));var _0x7d1aaf=function(_0x134a6f){if(_0x12bc37)_0x3abb94=(_0x134a6f[_0x63f8('0x39')]||0x0)/0x64;else{_0x3cfccf=_0x14bc2d[_0x63f8('0x27')]('.qd_productPrice');_0x3abb94=parseFloat((_0x3cfccf['val']()||'')[_0x63f8('0x2')](/[^0-9\.\,]+/i,'')[_0x63f8('0x2')]('.','')[_0x63f8('0x2')](',','.'),0xa);}if(isNaN(_0x3abb94))return _0x77f310([_0x63f8('0x3f'),_0x652774,_0x14bc2d]);if(_0x57baa9[_0x63f8('0x40')]!==null){_0x3497ef=0x0;if(!isNaN(_0x57baa9[_0x63f8('0x40')]))_0x3497ef=_0x57baa9[_0x63f8('0x40')];else{_0x268669=_0x14bc2d[_0x63f8('0x27')](_0x57baa9[_0x63f8('0x40')]);if(_0x268669[_0x63f8('0x2c')])_0x3497ef=_0x57baa9[_0x63f8('0x3c')](_0x268669);}_0x3497ef=parseFloat(_0x3497ef,0xa);if(isNaN(_0x3497ef))_0x3497ef=0x0;if(_0x3497ef!==0x0)_0x3abb94=_0x3abb94*0x64/(0x64-_0x3497ef);}if(_0x12bc37)_0x49149d=(_0x134a6f[_0x63f8('0x41')]||0x0)/0x64;else _0x49149d=parseFloat((_0x14bc2d[_0x63f8('0x27')](_0x63f8('0x42'))[_0x63f8('0x43')]()||'')[_0x63f8('0x2')](/[^0-9\.\,]+/i,'')[_0x63f8('0x2')]('.','')['replace'](',','.'),0xa);if(isNaN(_0x49149d))_0x49149d=0.001;_0x2bb3f1=_0x3abb94*((0x64-_0x3412fc)/0x64);if(_0x12bc37&&_0x57baa9['productPage']['changeNativePrice']){_0x8d7b26['text'](_0x8d7b26[_0x63f8('0x14')]()['trim']()[_0x63f8('0x2')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x2bb3f1,0x2,',','.')))[_0x63f8('0x32')](_0x63f8('0x29'));_0x14bc2d['addClass'](_0x63f8('0x44'));}else{_0x1a00d7=_0x14bc2d[_0x63f8('0x27')]('.qd_displayPrice');_0x1a00d7[_0x63f8('0x14')](_0x1a00d7[_0x63f8('0x14')]()[_0x63f8('0x2')](/[0-9\.]+,[0-9]+/i,'')+qd_number_format(_0x2bb3f1,0x2,',','.'));}if(_0x12bc37){_0xfd04d9=_0x14bc2d[_0x63f8('0x27')](_0x57baa9[_0x63f8('0x23')][_0x63f8('0x45')]);if(_0xfd04d9[_0x63f8('0x2c')])_0xfd04d9[_0x63f8('0x14')](_0xfd04d9[_0x63f8('0x14')]()[_0x63f8('0x1')]()[_0x63f8('0x2')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x2bb3f1,0x2,',','.')));}var _0xa3926a=_0x14bc2d['find'](_0x63f8('0x46'));_0xa3926a['text'](_0xa3926a[_0x63f8('0x14')]()[_0x63f8('0x2')](/[0-9]+\%/i,_0x3412fc+'%'));var _0xfca01e=function(_0x50f020,_0x1c332c,_0x4a1f20){var _0x5bd967=_0x14bc2d['find'](_0x50f020);if(_0x5bd967[_0x63f8('0x2c')])_0x5bd967[_0x63f8('0x47')](_0x5bd967[_0x63f8('0x47')]()['trim']()[_0x63f8('0x2')](/[0-9]{1,2}/,_0x4a1f20?_0x4a1f20:_0x134a6f['installments']||0x0));var _0x395257=_0x14bc2d[_0x63f8('0x27')](_0x1c332c);if(_0x395257[_0x63f8('0x2c')])_0x395257['html'](_0x395257[_0x63f8('0x47')]()[_0x63f8('0x1')]()[_0x63f8('0x2')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x2bb3f1/(_0x4a1f20?_0x4a1f20:_0x134a6f[_0x63f8('0x48')]||0x1),0x2,',','.')));};if(_0x12bc37&&_0x57baa9[_0x63f8('0x23')]['changeInstallments'])_0xfca01e(_0x57baa9[_0x63f8('0x23')][_0x63f8('0x48')],_0x57baa9['productPage'][_0x63f8('0x49')]);else if(_0x57baa9[_0x63f8('0x4a')])_0xfca01e(_0x63f8('0x4b'),_0x63f8('0x4c'),parseInt(_0x14bc2d[_0x63f8('0x27')](_0x63f8('0x4d'))[_0x63f8('0x43')]()||0x1)||0x1);_0x14bc2d['find'](_0x63f8('0x4e'))[_0x63f8('0x4f')](qd_number_format(_0x49149d-_0x2bb3f1,0x2,',','.'));_0x14bc2d[_0x63f8('0x27')](_0x63f8('0x50'))['prepend'](qd_number_format((_0x49149d-_0x2bb3f1)*0x64/_0x49149d,0x2,',','.'));if(_0x12bc37&&_0x57baa9['productPage'][_0x63f8('0x51')]){_0x29d1e8(_0x63f8('0x52'))[_0x63f8('0x53')](function(){_0x1cb2bc=_0x29d1e8(this);_0x1cb2bc[_0x63f8('0x14')](_0x1cb2bc[_0x63f8('0x14')]()[_0x63f8('0x1')]()[_0x63f8('0x2')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x49149d-_0x2bb3f1,0x2,',','.')));_0x1cb2bc[_0x63f8('0x32')](_0x63f8('0x29'));});}};_0x7d1aaf(_0x2e7ffb);if(_0x12bc37)_0x29d1e8(window)['on'](_0x63f8('0x54'),function(_0x57255f,_0x26adfb,_0x39f2f0){_0x7d1aaf(_0x39f2f0);});_0x14bc2d[_0x63f8('0x32')]('qd_sp_processedItem');if(!_0x12bc37)_0x3cfccf[_0x63f8('0x32')](_0x63f8('0x55'));};(_0x57baa9['startedByWrapper']?_0x3b25b6[_0x63f8('0x27')](_0x57baa9[_0x63f8('0x56')]):_0x3b25b6)['each'](function(){_0x1bfe5a['call'](this,![]);});if(typeof _0x57baa9[_0x63f8('0x57')]==_0x63f8('0x58')){var _0x2e62d6=_0x57baa9[_0x63f8('0x59')]?_0x3b25b6:_0x3b25b6[_0x63f8('0x24')](_0x57baa9['wrapperElement']);if(_0x57baa9['productPage'][_0x63f8('0x26')])_0x2e62d6=_0x2e62d6['closest'](_0x57baa9[_0x63f8('0x23')][_0x63f8('0x25')])[_0x63f8('0x5a')](_0x63f8('0x5b'));else _0x2e62d6=_0x2e62d6[_0x63f8('0x27')]('.qd_productPrice:not(.qd_sp_processedItem)');_0x2e62d6[_0x63f8('0x53')](function(){var _0x1fda07=_0x29d1e8(_0x57baa9[_0x63f8('0x57')]);_0x1fda07[_0x63f8('0x35')](_0x63f8('0x5c'),_0x63f8('0x5d'));if(_0x57baa9[_0x63f8('0x23')]['isProductPage'])_0x29d1e8(this)[_0x63f8('0x4f')](_0x1fda07);else _0x29d1e8(this)['after'](_0x1fda07);_0x1bfe5a['call'](_0x1fda07,!![]);});}};_0x29d1e8['fn'][_0x63f8('0x1b')]=function(_0x4c04b2){var _0x4872aa=_0x29d1e8(this);if(!_0x4872aa[_0x63f8('0x2c')])return _0x4872aa;var _0x213ff9=_0x29d1e8['extend'](!![],{},_0x19cc3a,_0x4c04b2);if(typeof _0x213ff9['productPage'][_0x63f8('0x26')]!=_0x63f8('0x5e'))_0x213ff9[_0x63f8('0x23')][_0x63f8('0x26')]=_0x29d1e8(document[_0x63f8('0x5f')])['is']('.produto');_0x52c738(_0x4872aa,_0x213ff9);return _0x4872aa;};}(this));

// amazing menu
var _0x2dff=['alerta','toLowerCase','aviso','apply','error','join','qdAmAddNdx','each','addClass','qd-am-li-','first','qd-am-first','last','rnaqevavfgber%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','ite','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','find','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-collection-wrapper','html','img[alt=\x27','data-qdam-value','getParent','.box-banner','clone','insertBefore','hide','qd-am-content-loaded','text','trim','attr','[class*=\x27colunas\x27]','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','trigger','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','qd-am-elem-','replaceSpecialChars','>li','>ul','qd-am-dropdown-menu','qd-am-dropdown','children','qd-am-level-','add','callback','QuatroDigital.am.callback','extend','exec','.qd_amazing_menu_auto','closest','QD_amazingMenu','function','QD\x20Amazing\x20Menu','object','undefined','info','warn'];(function(_0x31d2f5,_0x4c5d6c){var _0x324673=function(_0x3c1291){while(--_0x3c1291){_0x31d2f5['push'](_0x31d2f5['shift']());}};_0x324673(++_0x4c5d6c);}(_0x2dff,0x114));var _0xf2df=function(_0x394bf6,_0x46a0e9){_0x394bf6=_0x394bf6-0x0;var _0x55ee3b=_0x2dff[_0x394bf6];return _0x55ee3b;};(function(_0x3e2fd4){_0x3e2fd4['fn']['getParent']=_0x3e2fd4['fn'][_0xf2df('0x0')];}(jQuery));(function(_0x5a9f55){'use strict';var _0x49c1cf,_0x2ada1c,_0x492343,_0x4eb089;_0x49c1cf=jQuery;if(typeof _0x49c1cf['fn'][_0xf2df('0x1')]===_0xf2df('0x2'))return;_0x2ada1c={'url':'/qd-amazing-menu','callback':function(){},'ajaxCallback':function(){}};var _0x36b87d=_0xf2df('0x3');var _0xa6afb2=function(_0xe35c80,_0x1897d8){if(_0xf2df('0x4')===typeof console&&'undefined'!==typeof console['error']&&_0xf2df('0x5')!==typeof console[_0xf2df('0x6')]&&_0xf2df('0x5')!==typeof console[_0xf2df('0x7')]){var _0x21d257;'object'===typeof _0xe35c80?(_0xe35c80['unshift']('['+_0x36b87d+']\x0a'),_0x21d257=_0xe35c80):_0x21d257=['['+_0x36b87d+']\x0a'+_0xe35c80];if(_0xf2df('0x5')===typeof _0x1897d8||_0xf2df('0x8')!==_0x1897d8[_0xf2df('0x9')]()&&_0xf2df('0xa')!==_0x1897d8['toLowerCase']())if('undefined'!==typeof _0x1897d8&&'info'===_0x1897d8[_0xf2df('0x9')]())try{console[_0xf2df('0x6')][_0xf2df('0xb')](console,_0x21d257);}catch(_0x4274ba){try{console[_0xf2df('0x6')](_0x21d257['join']('\x0a'));}catch(_0x398c9b){}}else try{console['error'][_0xf2df('0xb')](console,_0x21d257);}catch(_0x3516ea){try{console[_0xf2df('0xc')](_0x21d257['join']('\x0a'));}catch(_0x49fc02){}}else try{console[_0xf2df('0x7')][_0xf2df('0xb')](console,_0x21d257);}catch(_0x5bb2c2){try{console['warn'](_0x21d257[_0xf2df('0xd')]('\x0a'));}catch(_0x55b264){}}}};_0x49c1cf['fn'][_0xf2df('0xe')]=function(){var _0x32c526=_0x49c1cf(this);_0x32c526[_0xf2df('0xf')](function(_0x28f85b){_0x49c1cf(this)[_0xf2df('0x10')](_0xf2df('0x11')+_0x28f85b);});_0x32c526[_0xf2df('0x12')]()[_0xf2df('0x10')](_0xf2df('0x13'));_0x32c526[_0xf2df('0x14')]()[_0xf2df('0x10')]('qd-am-last');return _0x32c526;};_0x49c1cf['fn'][_0xf2df('0x1')]=function(){};var _0x25e247=function(_0x5455f7){var _0x2db353={'y':_0xf2df('0x15')};return function(_0x2e00b8){var _0x3b1b3a,_0x1e881e,_0x493e01,_0x50a6ea;_0x1e881e=function(_0x38c166){return _0x38c166;};_0x493e01=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2e00b8=_0x2e00b8['d'+_0x493e01[0x10]+'c'+_0x493e01[0x11]+'m'+_0x1e881e(_0x493e01[0x1])+'n'+_0x493e01[0xd]]['l'+_0x493e01[0x12]+'c'+_0x493e01[0x0]+'ti'+_0x1e881e('o')+'n'];_0x3b1b3a=function(_0x597a6){return escape(encodeURIComponent(_0x597a6[_0xf2df('0x16')](/\./g,'¨')[_0xf2df('0x16')](/[a-zA-Z]/g,function(_0x3b3e48){return String[_0xf2df('0x17')](('Z'>=_0x3b3e48?0x5a:0x7a)>=(_0x3b3e48=_0x3b3e48['charCodeAt'](0x0)+0xd)?_0x3b3e48:_0x3b3e48-0x1a);})));};var _0xdedfda=_0x3b1b3a(_0x2e00b8[[_0x493e01[0x9],_0x1e881e('o'),_0x493e01[0xc],_0x493e01[_0x1e881e(0xd)]]['join']('')]);_0x3b1b3a=_0x3b1b3a((window[['js',_0x1e881e('no'),'m',_0x493e01[0x1],_0x493e01[0x4]['toUpperCase'](),_0xf2df('0x18')][_0xf2df('0xd')]('')]||'---')+['.v',_0x493e01[0xd],'e',_0x1e881e('x'),'co',_0x1e881e('mm'),_0xf2df('0x19'),_0x493e01[0x1],'.c',_0x1e881e('o'),'m.',_0x493e01[0x13],'r'][_0xf2df('0xd')](''));for(var _0x3d7a5e in _0x2db353){if(_0x3b1b3a===_0x3d7a5e+_0x2db353[_0x3d7a5e]||_0xdedfda===_0x3d7a5e+_0x2db353[_0x3d7a5e]){_0x50a6ea='tr'+_0x493e01[0x11]+'e';break;}_0x50a6ea='f'+_0x493e01[0x0]+'ls'+_0x1e881e(_0x493e01[0x1])+'';}_0x1e881e=!0x1;-0x1<_0x2e00b8[[_0x493e01[0xc],'e',_0x493e01[0x0],'rc',_0x493e01[0x9]][_0xf2df('0xd')]('')][_0xf2df('0x1a')](_0xf2df('0x1b'))&&(_0x1e881e=!0x0);return[_0x50a6ea,_0x1e881e];}(_0x5455f7);}(window);if(!eval(_0x25e247[0x0]))return _0x25e247[0x1]?_0xa6afb2('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x4eb089=function(_0x44f075){var _0x59f077,_0x2c9915,_0x3524b9;_0x3524b9=_0x44f075[_0xf2df('0x1c')]('.qd_am_code');_0x59f077=_0x3524b9[_0xf2df('0x1d')](_0xf2df('0x1e'));_0x2c9915=_0x3524b9['filter'](_0xf2df('0x1f'));if(!(_0x59f077[_0xf2df('0x20')]||_0x2c9915['length']))return;_0x59f077['parent']()[_0xf2df('0x10')]('qd-am-banner-wrapper');_0x2c9915[_0xf2df('0x21')]()[_0xf2df('0x10')](_0xf2df('0x22'));_0x49c1cf['qdAjax']({'url':_0x492343['url'],'dataType':_0xf2df('0x23'),'success':function(_0x19c3b1){var _0xe11f3=_0x49c1cf(_0x19c3b1);_0x59f077[_0xf2df('0xf')](function(){var _0x49329a,_0x20abc8;_0x20abc8=_0x49c1cf(this);_0x49329a=_0xe11f3[_0xf2df('0x1c')](_0xf2df('0x24')+_0x20abc8['attr'](_0xf2df('0x25'))+'\x27]');if(!_0x49329a['length'])return;_0x49329a[_0xf2df('0xf')](function(){_0x49c1cf(this)[_0xf2df('0x26')](_0xf2df('0x27'))[_0xf2df('0x28')]()[_0xf2df('0x29')](_0x20abc8);});_0x20abc8[_0xf2df('0x2a')]();})[_0xf2df('0x10')](_0xf2df('0x2b'));_0x2c9915[_0xf2df('0xf')](function(){var _0xa52df5={},_0x121a72;_0x121a72=_0x49c1cf(this);_0xe11f3[_0xf2df('0x1c')]('h2')[_0xf2df('0xf')](function(){if(_0x49c1cf(this)[_0xf2df('0x2c')]()[_0xf2df('0x2d')]()['toLowerCase']()==_0x121a72[_0xf2df('0x2e')](_0xf2df('0x25'))[_0xf2df('0x2d')]()[_0xf2df('0x9')]()){_0xa52df5=_0x49c1cf(this);return![];}});if(!_0xa52df5[_0xf2df('0x20')])return;_0xa52df5['each'](function(){_0x49c1cf(this)[_0xf2df('0x26')](_0xf2df('0x2f'))['clone']()[_0xf2df('0x29')](_0x121a72);});_0x121a72[_0xf2df('0x2a')]();})[_0xf2df('0x10')](_0xf2df('0x2b'));},'error':function(){_0xa6afb2(_0xf2df('0x30')+_0x492343['url']+_0xf2df('0x31'));},'complete':function(){_0x492343[_0xf2df('0x32')][_0xf2df('0x33')](this);_0x49c1cf(window)[_0xf2df('0x34')]('QuatroDigital.am.ajaxCallback',_0x44f075);},'clearQueueDelay':0xbb8});};_0x49c1cf[_0xf2df('0x1')]=function(_0x12a3fb){var _0x1ad436=_0x12a3fb['find'](_0xf2df('0x35'))['each'](function(){var _0x1fb6e6,_0x54e7c7,_0x4d3ceb,_0x511197;_0x1fb6e6=_0x49c1cf(this);if(!_0x1fb6e6[_0xf2df('0x20')])return _0xa6afb2([_0xf2df('0x36'),_0x12a3fb],_0xf2df('0x8'));_0x1fb6e6[_0xf2df('0x1c')](_0xf2df('0x37'))[_0xf2df('0x21')]()[_0xf2df('0x10')](_0xf2df('0x38'));_0x1fb6e6[_0xf2df('0x1c')]('li')['each'](function(){var _0x4a1cd2=_0x49c1cf(this),_0x1deff4;_0x1deff4=_0x4a1cd2['children'](':not(ul)');if(!_0x1deff4[_0xf2df('0x20')])return;_0x4a1cd2[_0xf2df('0x10')](_0xf2df('0x39')+_0x1deff4['first']()['text']()[_0xf2df('0x2d')]()[_0xf2df('0x3a')]()[_0xf2df('0x16')](/\./g,'')[_0xf2df('0x16')](/\s/g,'-')['toLowerCase']());});_0x54e7c7=_0x1fb6e6[_0xf2df('0x1c')](_0xf2df('0x3b'))['qdAmAddNdx']();_0x1fb6e6[_0xf2df('0x10')]('qd-amazing-menu');_0x4d3ceb=_0x54e7c7[_0xf2df('0x1c')](_0xf2df('0x3c'));_0x4d3ceb[_0xf2df('0xf')](function(){var _0x413211=_0x49c1cf(this),_0x26e7dd;_0x26e7dd=_0x413211[_0xf2df('0x1c')](_0xf2df('0x3b'))[_0xf2df('0xe')]()[_0xf2df('0x10')]('qd-am-column');_0x413211[_0xf2df('0x10')](_0xf2df('0x3d'));_0x413211[_0xf2df('0x21')]()[_0xf2df('0x10')](_0xf2df('0x3e'));});_0x4d3ceb[_0xf2df('0x10')](_0xf2df('0x3e'));var _0x374c16=0x0;var _0x211c9e=function(_0x40c12e){_0x374c16=_0x374c16+0x1;var _0x12bdb3=_0x40c12e['children']('li');var _0x506a96=_0x12bdb3[_0xf2df('0x3f')]('*');if(!_0x506a96[_0xf2df('0x20')])return;_0x506a96[_0xf2df('0x10')](_0xf2df('0x40')+_0x374c16);_0x211c9e(_0x506a96);};_0x211c9e(_0x1fb6e6);_0x1fb6e6[_0xf2df('0x41')](_0x1fb6e6[_0xf2df('0x1c')]('ul'))[_0xf2df('0xf')](function(){var _0x5e2508=_0x49c1cf(this);_0x5e2508[_0xf2df('0x10')]('qd-am-'+_0x5e2508[_0xf2df('0x3f')]('li')[_0xf2df('0x20')]+'-li');});});_0x4eb089(_0x1ad436);_0x492343[_0xf2df('0x42')][_0xf2df('0x33')](this);_0x49c1cf(window)['trigger'](_0xf2df('0x43'),_0x12a3fb);};_0x49c1cf['fn'][_0xf2df('0x1')]=function(_0x506438){var _0x20d456=_0x49c1cf(this);if(!_0x20d456[_0xf2df('0x20')])return _0x20d456;_0x492343=_0x49c1cf[_0xf2df('0x44')]({},_0x2ada1c,_0x506438);_0x20d456[_0xf2df('0x45')]=new _0x49c1cf['QD_amazingMenu'](_0x49c1cf(this));return _0x20d456;};_0x49c1cf(function(){_0x49c1cf(_0xf2df('0x46'))[_0xf2df('0x1')]();});}(this));

// smart cart
var _0x8a4c=['appendTo','.qd-ddc-shipping\x20input','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','filter','[data-sku=\x27','outerHeight','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','callbackProductsList','forceImageHTTPS','string','http','https','qd-loaded','load','src','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku-index','changeQantity','data-sku','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','click.qd_ddc_more','.qd-ddc-quantityMinus','click.qd_ddc_minus','qd-loading','focusout.qd_ddc_change','keyup.qd_ddc_change','.qd-ddc-prodRow','click.qd_ddc_remove','removeProduct','stop','remove','formatCepField','$1-$2$3','data','qdDdcLastPostalCode','calculateShipping','BRA','.qd-ddc-cep-tooltip-text','.qd-dd-cep-slas','shippingData','logisticsInfo','slas','<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>','shippingEstimate','\x20dia\x20útil','\x20dias\x20útéis','<tr></tr>','<td>\x20R$\x20','price',',\x20entrega\x20em\x20','tbody','insertBefore','.qd-ddc-cep-close','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','done','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','boolean','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','height','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','message','avisso','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','buyButtonClicked','quickViewUpdate','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','.qd-bap-qtt','prepend','productId','prod_','prodId','Quatro\x20Digital\x20-\x20Plus\x20Smart\x20Cart','.qdDdcContainer','QD_smartCart','selector','dropDown','buyButton','QD_buyButton','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','smartCart','getParent','closest','replace','abs','undefined','round','toFixed','split','length','join','_QuatroDigital_CartData','callback','Callbacks','error','function','Oooops!\x20','Quatro\x20Digital\x20-\x20DropDown\x20Cart','info','warn','object','unshift','alerta','toLowerCase','aviso','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','rnaqevavfgber%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>','skuName','name','extend','smartCheckout','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22>','<div\x20class=\x22qd-ddc-wrapper2\x22>','<div\x20class=\x22qd_ddc_lightBoxClose\x22></div>','<div\x20class=\x22qd-ddc-wrapper3\x22>','<div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div>','<span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div>','<div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22>','<div\x20class=\x22qd-ddc-shipping\x22></div>','<div\x20class=\x22qd-ddc-infoTotal\x22></div>','<div\x20class=\x22qd-ddc-infoBts\x22>','<a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a>','</div></div></div></div></div>','texts','cartTotal','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','find','.qd-ddc-viewCart','html','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','emptyCart','append','add','click.qd_ddc_closeFn','removeClass','body','off','keyup.qd_ddc_closeFn','keyCode','qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20.qd-ddc-cep','val','keyup.qd_ddc_cep','.qd-ddc-shipping\x20.qd-ddc-cep-ok','click','.qd-ddc-cep-btn','toggle','preventDefault','hide','click._QD_DDC_closeShipping','target','.qd-ddc-cep-tooltip','.qd-ddc-cep-ok','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','getCartInfoByUrl','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','each','clone','call','.qd-ddc-infoTotalValue','total','qtt','shipping','.qd-ddc-infoAllTotal','allTotal','Atenção,\x20você\x20esta\x20utilizando\x20um\x20método\x20descontinuado','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','getOrderForm','_QuatroDigital_AmountProduct','exec','addClass','totalizers','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','qd-ddc-noItems','.qd-ddc-prodWrapper2','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22>','<div\x20class=\x22qd-ddc-prodImgWrapper\x22>','<img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/>','</div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22>','<div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a>','<input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a>','<span\x20class=\x22qd-ddc-prodRowLoading\x22></span>','empty','productCategoryIds','attr','qd-ddc-','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','.qd-ddc-quantity','quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-quantityMore,.qd-ddc-quantityMinus'];(function(_0xfd3e4e,_0x551728){var _0x177e5e=function(_0x207842){while(--_0x207842){_0xfd3e4e['push'](_0xfd3e4e['shift']());}};_0x177e5e(++_0x551728);}(_0x8a4c,0x17b));var _0xc8a4=function(_0x25a517,_0xf69448){_0x25a517=_0x25a517-0x0;var _0x4cba1c=_0x8a4c[_0x25a517];return _0x4cba1c;};(function(_0x43106c){_0x43106c['fn'][_0xc8a4('0x0')]=_0x43106c['fn'][_0xc8a4('0x1')];}(jQuery));function qd_number_format(_0x2383b1,_0x2b60a8,_0x50e1c3,_0x4b1474){_0x2383b1=(_0x2383b1+'')[_0xc8a4('0x2')](/[^0-9+\-Ee.]/g,'');_0x2383b1=isFinite(+_0x2383b1)?+_0x2383b1:0x0;_0x2b60a8=isFinite(+_0x2b60a8)?Math[_0xc8a4('0x3')](_0x2b60a8):0x0;_0x4b1474='undefined'===typeof _0x4b1474?',':_0x4b1474;_0x50e1c3=_0xc8a4('0x4')===typeof _0x50e1c3?'.':_0x50e1c3;var _0x2b42fb='',_0x2b42fb=function(_0x25d76b,_0x40a22f){var _0x2b60a8=Math['pow'](0xa,_0x40a22f);return''+(Math[_0xc8a4('0x5')](_0x25d76b*_0x2b60a8)/_0x2b60a8)[_0xc8a4('0x6')](_0x40a22f);},_0x2b42fb=(_0x2b60a8?_0x2b42fb(_0x2383b1,_0x2b60a8):''+Math['round'](_0x2383b1))[_0xc8a4('0x7')]('.');0x3<_0x2b42fb[0x0][_0xc8a4('0x8')]&&(_0x2b42fb[0x0]=_0x2b42fb[0x0][_0xc8a4('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x4b1474));(_0x2b42fb[0x1]||'')[_0xc8a4('0x8')]<_0x2b60a8&&(_0x2b42fb[0x1]=_0x2b42fb[0x1]||'',_0x2b42fb[0x1]+=Array(_0x2b60a8-_0x2b42fb[0x1]['length']+0x1)['join']('0'));return _0x2b42fb[_0xc8a4('0x9')](_0x50e1c3);};(function(){'use strict';try{window[_0xc8a4('0xa')]=window['_QuatroDigital_CartData']||{};window[_0xc8a4('0xa')][_0xc8a4('0xb')]=window['_QuatroDigital_CartData'][_0xc8a4('0xb')]||$[_0xc8a4('0xc')]();}catch(_0x2aead8){if(typeof console!==_0xc8a4('0x4')&&typeof console[_0xc8a4('0xd')]===_0xc8a4('0xe'))console[_0xc8a4('0xd')](_0xc8a4('0xf'),_0x2aead8['message']);}}());(function(_0x45d2f6){'use strict';try{var _0x3f622c=jQuery;var _0x54b5cc=_0xc8a4('0x10');var _0x3bcc69=function(_0x25557b,_0xc88533){if('object'===typeof console&&'undefined'!==typeof console[_0xc8a4('0xd')]&&_0xc8a4('0x4')!==typeof console[_0xc8a4('0x11')]&&_0xc8a4('0x4')!==typeof console[_0xc8a4('0x12')]){var _0x1a56bd;_0xc8a4('0x13')===typeof _0x25557b?(_0x25557b[_0xc8a4('0x14')]('['+_0x54b5cc+']\x0a'),_0x1a56bd=_0x25557b):_0x1a56bd=['['+_0x54b5cc+']\x0a'+_0x25557b];if('undefined'===typeof _0xc88533||_0xc8a4('0x15')!==_0xc88533[_0xc8a4('0x16')]()&&_0xc8a4('0x17')!==_0xc88533[_0xc8a4('0x16')]())if(_0xc8a4('0x4')!==typeof _0xc88533&&'info'===_0xc88533[_0xc8a4('0x16')]())try{console[_0xc8a4('0x11')][_0xc8a4('0x18')](console,_0x1a56bd);}catch(_0x50b9bf){try{console['info'](_0x1a56bd['join']('\x0a'));}catch(_0x195cc5){}}else try{console[_0xc8a4('0xd')][_0xc8a4('0x18')](console,_0x1a56bd);}catch(_0x411dab){try{console[_0xc8a4('0xd')](_0x1a56bd['join']('\x0a'));}catch(_0x2cff0b){}}else try{console[_0xc8a4('0x12')][_0xc8a4('0x18')](console,_0x1a56bd);}catch(_0x16c174){try{console[_0xc8a4('0x12')](_0x1a56bd[_0xc8a4('0x9')]('\x0a'));}catch(_0x1c8ee8){}}}};window[_0xc8a4('0x19')]=window[_0xc8a4('0x19')]||{};window[_0xc8a4('0x19')][_0xc8a4('0x1a')]=!![];_0x3f622c['QD_dropDownCart']=function(){};_0x3f622c['fn'][_0xc8a4('0x1b')]=function(){return{'fn':new _0x3f622c()};};var _0x45257e=function(_0x46e2be){var _0x2fcf87={'y':_0xc8a4('0x1c')};return function(_0x2c7d71){var _0x4965f6,_0x3f2100,_0x106bcb,_0x153422;_0x3f2100=function(_0x384a63){return _0x384a63;};_0x106bcb=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2c7d71=_0x2c7d71['d'+_0x106bcb[0x10]+'c'+_0x106bcb[0x11]+'m'+_0x3f2100(_0x106bcb[0x1])+'n'+_0x106bcb[0xd]]['l'+_0x106bcb[0x12]+'c'+_0x106bcb[0x0]+'ti'+_0x3f2100('o')+'n'];_0x4965f6=function(_0x4dfa53){return escape(encodeURIComponent(_0x4dfa53[_0xc8a4('0x2')](/\./g,'¨')[_0xc8a4('0x2')](/[a-zA-Z]/g,function(_0x572e96){return String[_0xc8a4('0x1d')](('Z'>=_0x572e96?0x5a:0x7a)>=(_0x572e96=_0x572e96[_0xc8a4('0x1e')](0x0)+0xd)?_0x572e96:_0x572e96-0x1a);})));};var _0x553232=_0x4965f6(_0x2c7d71[[_0x106bcb[0x9],_0x3f2100('o'),_0x106bcb[0xc],_0x106bcb[_0x3f2100(0xd)]][_0xc8a4('0x9')]('')]);_0x4965f6=_0x4965f6((window[['js',_0x3f2100('no'),'m',_0x106bcb[0x1],_0x106bcb[0x4][_0xc8a4('0x1f')](),_0xc8a4('0x20')][_0xc8a4('0x9')]('')]||_0xc8a4('0x21'))+['.v',_0x106bcb[0xd],'e',_0x3f2100('x'),'co',_0x3f2100('mm'),_0xc8a4('0x22'),_0x106bcb[0x1],'.c',_0x3f2100('o'),'m.',_0x106bcb[0x13],'r']['join'](''));for(var _0x4ba60e in _0x2fcf87){if(_0x4965f6===_0x4ba60e+_0x2fcf87[_0x4ba60e]||_0x553232===_0x4ba60e+_0x2fcf87[_0x4ba60e]){_0x153422='tr'+_0x106bcb[0x11]+'e';break;}_0x153422='f'+_0x106bcb[0x0]+'ls'+_0x3f2100(_0x106bcb[0x1])+'';}_0x3f2100=!0x1;-0x1<_0x2c7d71[[_0x106bcb[0xc],'e',_0x106bcb[0x0],'rc',_0x106bcb[0x9]][_0xc8a4('0x9')]('')][_0xc8a4('0x23')](_0xc8a4('0x24'))&&(_0x3f2100=!0x0);return[_0x153422,_0x3f2100];}(_0x46e2be);}(window);if(!eval(_0x45257e[0x0]))return _0x45257e[0x1]?_0x3bcc69(_0xc8a4('0x25')):!0x1;_0x3f622c[_0xc8a4('0x1b')]=function(_0x5052ae,_0x46ced8){var _0x514c52,_0x1c5994,_0x13f8e3,_0x42dd63,_0x47b81a,_0x3e8bc2,_0x34bad6,_0x1c20d5,_0x27d5c5,_0x457c64,_0x40b211,_0x277f84;_0x40b211=_0x3f622c(_0x5052ae);if(!_0x40b211[_0xc8a4('0x8')])return _0x40b211;_0x514c52={'updateOnlyHover':!![],'texts':{'linkCart':_0xc8a4('0x26'),'linkCheckout':'Finalizar\x20Compra','cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':_0xc8a4('0x27'),'continueShopping':_0xc8a4('0x28'),'shippingForm':_0xc8a4('0x29')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!![],'forceImageHTTPS':![],'skuName':function(_0x4467f0){return _0x4467f0[_0xc8a4('0x2a')]||_0x4467f0[_0xc8a4('0x2b')];},'callback':function(){},'callbackProductsList':function(){}};_0x1c5994=_0x3f622c[_0xc8a4('0x2c')](!![],{},_0x514c52,_0x46ced8);_0x13f8e3=_0x3f622c('');_0x457c64=this;if(_0x1c5994[_0xc8a4('0x2d')]){var _0x573f3f=![];if(typeof window[_0xc8a4('0x2e')]==='undefined'){_0x3bcc69(_0xc8a4('0x2f'));_0x3f622c[_0xc8a4('0x30')]({'url':_0xc8a4('0x31'),'async':![],'dataType':_0xc8a4('0x32'),'error':function(){_0x3bcc69('Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.');_0x573f3f=!![];}});}if(_0x573f3f)return _0x3bcc69('A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!');}var _0x5d318e;if(typeof window[_0xc8a4('0x2e')]===_0xc8a4('0x13')&&typeof window[_0xc8a4('0x2e')][_0xc8a4('0x33')]!==_0xc8a4('0x4'))_0x5d318e=window[_0xc8a4('0x2e')][_0xc8a4('0x33')];else if(typeof vtex==='object'&&typeof vtex[_0xc8a4('0x33')]===_0xc8a4('0x13')&&typeof vtex[_0xc8a4('0x33')][_0xc8a4('0x34')]!=='undefined')_0x5d318e=new vtex[(_0xc8a4('0x33'))]['SDK']();else return _0x3bcc69(_0xc8a4('0x35'));_0x457c64[_0xc8a4('0x36')]=_0xc8a4('0x37')+_0xc8a4('0x38')+_0xc8a4('0x39')+_0xc8a4('0x3a')+_0xc8a4('0x3b')+'<div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div>'+_0xc8a4('0x3c')+_0xc8a4('0x3d')+_0xc8a4('0x3e')+_0xc8a4('0x3f')+_0xc8a4('0x40')+_0xc8a4('0x41')+_0xc8a4('0x42');_0x3e8bc2=function(_0x4632c3){var _0x371c21=_0x3f622c(_0x4632c3);_0x1c5994[_0xc8a4('0x43')][_0xc8a4('0x44')]=_0x1c5994[_0xc8a4('0x43')][_0xc8a4('0x44')][_0xc8a4('0x2')]('#value',_0xc8a4('0x45'));_0x1c5994[_0xc8a4('0x43')]['cartTotal']=_0x1c5994[_0xc8a4('0x43')]['cartTotal']['replace'](_0xc8a4('0x46'),_0xc8a4('0x47'));_0x1c5994[_0xc8a4('0x43')]['cartTotal']=_0x1c5994[_0xc8a4('0x43')][_0xc8a4('0x44')][_0xc8a4('0x2')](_0xc8a4('0x48'),_0xc8a4('0x49'));_0x1c5994[_0xc8a4('0x43')][_0xc8a4('0x44')]=_0x1c5994['texts']['cartTotal'][_0xc8a4('0x2')](_0xc8a4('0x4a'),_0xc8a4('0x4b'));_0x371c21[_0xc8a4('0x4c')](_0xc8a4('0x4d'))[_0xc8a4('0x4e')](_0x1c5994[_0xc8a4('0x43')][_0xc8a4('0x4f')]);_0x371c21[_0xc8a4('0x4c')](_0xc8a4('0x50'))[_0xc8a4('0x4e')](_0x1c5994[_0xc8a4('0x43')][_0xc8a4('0x51')]);_0x371c21[_0xc8a4('0x4c')](_0xc8a4('0x52'))['html'](_0x1c5994['texts'][_0xc8a4('0x53')]);_0x371c21['find'](_0xc8a4('0x54'))['html'](_0x1c5994['texts']['cartTotal']);_0x371c21[_0xc8a4('0x4c')](_0xc8a4('0x55'))[_0xc8a4('0x4e')](_0x1c5994['texts']['shippingForm']);_0x371c21['find']('.qd-ddc-emptyCart\x20p')[_0xc8a4('0x4e')](_0x1c5994['texts'][_0xc8a4('0x56')]);return _0x371c21;};_0x47b81a=function(_0x3a19bb){_0x3f622c(this)[_0xc8a4('0x57')](_0x3a19bb);_0x3a19bb[_0xc8a4('0x4c')]('.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose')[_0xc8a4('0x58')](_0x3f622c('.qd_ddc_lightBoxOverlay'))['on'](_0xc8a4('0x59'),function(){_0x40b211[_0xc8a4('0x5a')]('qd-bb-lightBoxProdAdd');_0x3f622c(document[_0xc8a4('0x5b')])[_0xc8a4('0x5a')]('qd-bb-lightBoxBodyProdAdd');});_0x3f622c(document)[_0xc8a4('0x5c')](_0xc8a4('0x5d'))['on'](_0xc8a4('0x5d'),function(_0xb81034){if(_0xb81034[_0xc8a4('0x5e')]==0x1b){_0x40b211['removeClass'](_0xc8a4('0x5f'));_0x3f622c(document[_0xc8a4('0x5b')])['removeClass'](_0xc8a4('0x60'));}});var _0x667fc2=_0x3a19bb[_0xc8a4('0x4c')](_0xc8a4('0x61'));_0x3a19bb[_0xc8a4('0x4c')](_0xc8a4('0x62'))['on'](_0xc8a4('0x63'),function(){_0x457c64[_0xc8a4('0x64')]('-',undefined,undefined,_0x667fc2);return![];});_0x3a19bb[_0xc8a4('0x4c')](_0xc8a4('0x65'))['on'](_0xc8a4('0x66'),function(){_0x457c64['scrollCart'](undefined,undefined,undefined,_0x667fc2);return![];});var _0x179e8c=_0x3a19bb['find']('.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text');_0x3a19bb['find'](_0xc8a4('0x67'))[_0xc8a4('0x68')]('')['on'](_0xc8a4('0x69'),function(_0x102c39){_0x457c64['formatCepField'](_0x3f622c(this));if(_0x102c39['keyCode']==0xd)_0x3a19bb[_0xc8a4('0x4c')](_0xc8a4('0x6a'))[_0xc8a4('0x6b')]();});_0x3a19bb[_0xc8a4('0x4c')](_0xc8a4('0x6c'))['click'](function(_0xaa1376){_0xaa1376['preventDefault']();_0x179e8c[_0xc8a4('0x6d')]();});_0x3a19bb[_0xc8a4('0x4c')]('.qd-ddc-cep-close')[_0xc8a4('0x6b')](function(_0x3d3516){_0x3d3516[_0xc8a4('0x6e')]();_0x179e8c[_0xc8a4('0x6f')]();});_0x3f622c(document)[_0xc8a4('0x5c')](_0xc8a4('0x70'))['on'](_0xc8a4('0x70'),function(_0x551782){if(_0x3f622c(_0x551782[_0xc8a4('0x71')])[_0xc8a4('0x1')](_0x3a19bb[_0xc8a4('0x4c')](_0xc8a4('0x72')))[_0xc8a4('0x8')])return;_0x179e8c['hide']();});_0x3a19bb[_0xc8a4('0x4c')](_0xc8a4('0x73'))[_0xc8a4('0x6b')](function(_0x516e9e){_0x516e9e[_0xc8a4('0x6e')]();_0x457c64[_0xc8a4('0x74')](_0x3a19bb[_0xc8a4('0x4c')]('.qd-ddc-cep'));});if(_0x1c5994[_0xc8a4('0x75')]){var _0x399b03=0x0;_0x3f622c(this)['on'](_0xc8a4('0x76'),function(){var _0x56c4aa=function(){if(!window[_0xc8a4('0x19')]['allowUpdate'])return;_0x457c64[_0xc8a4('0x77')]();window['_QuatroDigital_DropDown']['allowUpdate']=![];_0x3f622c['fn'][_0xc8a4('0x78')](!![]);_0x457c64[_0xc8a4('0x79')]();};_0x399b03=setInterval(function(){_0x56c4aa();},0x258);_0x56c4aa();});_0x3f622c(this)['on'](_0xc8a4('0x7a'),function(){clearInterval(_0x399b03);});}};_0x34bad6=_0x3e8bc2(this[_0xc8a4('0x36')]);_0x1c20d5=0x0;_0x40b211[_0xc8a4('0x7b')](function(){if(_0x1c20d5>0x0)_0x47b81a['call'](this,_0x34bad6[_0xc8a4('0x7c')]());else _0x47b81a[_0xc8a4('0x7d')](this,_0x34bad6);_0x1c20d5++;});window[_0xc8a4('0xa')][_0xc8a4('0xb')][_0xc8a4('0x58')](function(){_0x3f622c(_0xc8a4('0x7e'))[_0xc8a4('0x4e')](window[_0xc8a4('0xa')][_0xc8a4('0x7f')]||'--');_0x3f622c('.qd-ddc-infoTotalItems')[_0xc8a4('0x4e')](window[_0xc8a4('0xa')][_0xc8a4('0x80')]||'0');_0x3f622c('.qd-ddc-infoTotalShipping')[_0xc8a4('0x4e')](window['_QuatroDigital_CartData'][_0xc8a4('0x81')]||'--');_0x3f622c(_0xc8a4('0x82'))[_0xc8a4('0x4e')](window[_0xc8a4('0xa')][_0xc8a4('0x83')]||'--');});_0x27d5c5=function(_0x20ad12){_0x3bcc69(_0xc8a4('0x84'));};_0x277f84=function(_0x18b9f5,_0x344eb8){if(typeof _0x18b9f5[_0xc8a4('0x85')]===_0xc8a4('0x4'))return _0x3bcc69(_0xc8a4('0x86'));_0x457c64[_0xc8a4('0x87')][_0xc8a4('0x7d')](this,_0x344eb8);};_0x457c64['getCartInfoByUrl']=function(_0x424382,_0x250d5f){var _0x33d3f5;if(typeof _0x250d5f!='undefined')window['_QuatroDigital_DropDown'][_0xc8a4('0x88')]=_0x250d5f;else if(window['_QuatroDigital_DropDown'][_0xc8a4('0x88')])_0x250d5f=window[_0xc8a4('0x19')][_0xc8a4('0x88')];setTimeout(function(){window['_QuatroDigital_DropDown'][_0xc8a4('0x88')]=undefined;},_0x1c5994[_0xc8a4('0x89')]);_0x3f622c(_0xc8a4('0x8a'))[_0xc8a4('0x5a')](_0xc8a4('0x8b'));if(_0x1c5994[_0xc8a4('0x2d')]){_0x33d3f5=function(_0x37031a){window[_0xc8a4('0x19')][_0xc8a4('0x8c')]=_0x37031a;_0x277f84(_0x37031a,_0x250d5f);if(typeof window['_QuatroDigital_AmountProduct']!==_0xc8a4('0x4')&&typeof window[_0xc8a4('0x8d')][_0xc8a4('0x8e')]==='function')window[_0xc8a4('0x8d')][_0xc8a4('0x8e')][_0xc8a4('0x7d')](this);_0x3f622c(_0xc8a4('0x8a'))[_0xc8a4('0x8f')]('qd-ddc-prodLoaded');};if(typeof window[_0xc8a4('0x19')]['getOrderForm']!==_0xc8a4('0x4')){_0x33d3f5(window[_0xc8a4('0x19')]['getOrderForm']);if(typeof _0x424382===_0xc8a4('0xe'))_0x424382(window[_0xc8a4('0x19')]['getOrderForm']);return;}_0x3f622c['QD_checkoutQueue']([_0xc8a4('0x85'),_0xc8a4('0x90'),'shippingData'],{'done':function(_0x20f6db){_0x33d3f5[_0xc8a4('0x7d')](this,_0x20f6db);if(typeof _0x424382===_0xc8a4('0xe'))_0x424382(_0x20f6db);},'fail':function(_0x18a85e){_0x3bcc69([_0xc8a4('0x91'),_0x18a85e]);}});}else{alert(_0xc8a4('0x92'));}};_0x457c64['cartIsEmpty']=function(){var _0x56d29d=_0x3f622c(_0xc8a4('0x8a'));if(_0x56d29d[_0xc8a4('0x4c')]('.qd-ddc-prodRow')[_0xc8a4('0x8')])_0x56d29d[_0xc8a4('0x5a')](_0xc8a4('0x93'));else _0x56d29d[_0xc8a4('0x8f')](_0xc8a4('0x93'));};_0x457c64[_0xc8a4('0x87')]=function(_0x1d956a){var _0x5512d5=_0x3f622c(_0xc8a4('0x94'));var _0x399012='<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22>'+_0xc8a4('0x95')+_0xc8a4('0x96')+_0xc8a4('0x97')+'<span\x20class=\x22qd-ddc-imgLoading\x22></span>'+_0xc8a4('0x98')+'</div>'+'<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div>'+_0xc8a4('0x99')+_0xc8a4('0x9a')+_0xc8a4('0x9b')+_0xc8a4('0x9c')+_0xc8a4('0x9d')+_0xc8a4('0x9e')+'<span\x20class=\x22qd-ddc-qttLoading\x22></span>'+'</div>'+_0xc8a4('0x98')+'<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22>'+'<div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22>'+_0xc8a4('0x9f')+_0xc8a4('0xa0')+'</div>'+'</div>'+'</div>';_0x5512d5[_0xc8a4('0xa1')]();_0x5512d5[_0xc8a4('0x7b')](function(){var _0x4a137a=_0x3f622c(this);var _0x4ff523,_0x5ea562,_0x125ffa,_0x5eff85;var _0x2879fc=_0x3f622c('');var _0x1a7754;for(var _0x23f215 in window[_0xc8a4('0x19')][_0xc8a4('0x8c')][_0xc8a4('0x85')]){if(typeof window[_0xc8a4('0x19')][_0xc8a4('0x8c')][_0xc8a4('0x85')][_0x23f215]!=='object')continue;_0x125ffa=window[_0xc8a4('0x19')][_0xc8a4('0x8c')][_0xc8a4('0x85')][_0x23f215];_0x1a7754=_0x125ffa[_0xc8a4('0xa2')][_0xc8a4('0x2')](/^\/|\/$/g,'')[_0xc8a4('0x7')]('/');_0x5ea562=_0x3f622c(_0x399012);_0x5ea562[_0xc8a4('0xa3')]({'data-sku':_0x125ffa['id'],'data-sku-index':_0x23f215,'data-qd-departament':_0x1a7754[0x0],'data-qd-category':_0x1a7754[_0x1a7754[_0xc8a4('0x8')]-0x1]});_0x5ea562[_0xc8a4('0x8f')](_0xc8a4('0xa4')+_0x125ffa['availability']);_0x5ea562[_0xc8a4('0x4c')](_0xc8a4('0xa5'))[_0xc8a4('0x57')](_0x1c5994[_0xc8a4('0x2a')](_0x125ffa));_0x5ea562[_0xc8a4('0x4c')](_0xc8a4('0xa6'))[_0xc8a4('0x57')](isNaN(_0x125ffa['sellingPrice'])?_0x125ffa['sellingPrice']:_0x125ffa[_0xc8a4('0xa7')]==0x0?'Grátis':(_0x3f622c('meta[name=currency]')[_0xc8a4('0xa3')]('content')||'R$')+'\x20'+qd_number_format(_0x125ffa[_0xc8a4('0xa7')]/0x64,0x2,',','.'));_0x5ea562[_0xc8a4('0x4c')](_0xc8a4('0xa8'))[_0xc8a4('0xa3')]({'data-sku':_0x125ffa['id'],'data-sku-index':_0x23f215})['val'](_0x125ffa[_0xc8a4('0xa9')]);_0x5ea562['find'](_0xc8a4('0xaa'))[_0xc8a4('0xa3')]({'data-sku':_0x125ffa['id'],'data-sku-index':_0x23f215});_0x457c64[_0xc8a4('0xab')](_0x125ffa['id'],_0x5ea562[_0xc8a4('0x4c')]('.qd-ddc-image'),_0x125ffa['imageUrl']);_0x5ea562[_0xc8a4('0x4c')](_0xc8a4('0xac'))['attr']({'data-sku':_0x125ffa['id'],'data-sku-index':_0x23f215});_0x5ea562[_0xc8a4('0xad')](_0x4a137a);_0x2879fc=_0x2879fc[_0xc8a4('0x58')](_0x5ea562);}try{var _0x4360a9=_0x4a137a['getParent']('.qd-ddc-wrapper')['find'](_0xc8a4('0xae'));if(_0x4360a9[_0xc8a4('0x8')]&&_0x4360a9[_0xc8a4('0x68')]()==''&&window[_0xc8a4('0x19')]['getOrderForm']['shippingData'][_0xc8a4('0xaf')])_0x4360a9[_0xc8a4('0x68')](window[_0xc8a4('0x19')][_0xc8a4('0x8c')]['shippingData'][_0xc8a4('0xaf')][_0xc8a4('0xb0')]);}catch(_0x3d6e10){_0x3bcc69(_0xc8a4('0xb1')+_0x3d6e10['message'],_0xc8a4('0x17'));}_0x457c64[_0xc8a4('0xb2')](_0x4a137a);_0x457c64[_0xc8a4('0x79')]();if(_0x1d956a&&_0x1d956a[_0xc8a4('0xb3')]){(function(){_0x5eff85=_0x2879fc[_0xc8a4('0xb4')](_0xc8a4('0xb5')+_0x1d956a['lastSku']+'\x27]');if(!_0x5eff85['length'])return;_0x4ff523=0x0;_0x2879fc[_0xc8a4('0x7b')](function(){var _0x1f9d06=_0x3f622c(this);if(_0x1f9d06['is'](_0x5eff85))return![];_0x4ff523+=_0x1f9d06[_0xc8a4('0xb6')]();});_0x457c64[_0xc8a4('0x64')](undefined,undefined,_0x4ff523,_0x4a137a['add'](_0x4a137a[_0xc8a4('0xb7')]()));_0x2879fc['removeClass'](_0xc8a4('0xb8'));(function(_0x5109ec){_0x5109ec[_0xc8a4('0x8f')]('qd-ddc-lastAdded');_0x5109ec[_0xc8a4('0x8f')](_0xc8a4('0xb8'));setTimeout(function(){_0x5109ec[_0xc8a4('0x5a')](_0xc8a4('0xb9'));},_0x1c5994[_0xc8a4('0x89')]);}(_0x5eff85));_0x3f622c(document['body'])[_0xc8a4('0x8f')]('qd-ddc-product-add-time-v2');setTimeout(function(){_0x3f622c(document[_0xc8a4('0x5b')])['removeClass'](_0xc8a4('0xba'));},_0x1c5994[_0xc8a4('0x89')]);}());}});(function(){if(_QuatroDigital_DropDown['getOrderForm'][_0xc8a4('0x85')]['length']){_0x3f622c(_0xc8a4('0x5b'))[_0xc8a4('0x5a')](_0xc8a4('0xbb'))[_0xc8a4('0x8f')](_0xc8a4('0xbc'));setTimeout(function(){_0x3f622c(_0xc8a4('0x5b'))[_0xc8a4('0x5a')](_0xc8a4('0xbd'));},_0x1c5994[_0xc8a4('0x89')]);}else _0x3f622c('body')[_0xc8a4('0x5a')]('qd-ddc-cart-rendered')[_0xc8a4('0x8f')](_0xc8a4('0xbb'));}());if(typeof _0x1c5994[_0xc8a4('0xbe')]===_0xc8a4('0xe'))_0x1c5994['callbackProductsList'][_0xc8a4('0x7d')](this);else _0x3bcc69('callbackProductsList\x20não\x20é\x20uma\x20função');};_0x457c64[_0xc8a4('0xab')]=function(_0x3339ee,_0x4ac095,_0x47c502){var _0x8b31f=!![];function _0x3d9507(){if(_0x1c5994[_0xc8a4('0xbf')]&&typeof _0x47c502==_0xc8a4('0xc0'))_0x47c502=_0x47c502[_0xc8a4('0x2')](_0xc8a4('0xc1'),_0xc8a4('0xc2'));_0x4ac095[_0xc8a4('0x5a')](_0xc8a4('0xc3'))[_0xc8a4('0xc4')](function(){_0x3f622c(this)[_0xc8a4('0x8f')](_0xc8a4('0xc3'));})[_0xc8a4('0xa3')](_0xc8a4('0xc5'),_0x47c502);};if(_0x47c502)_0x3d9507();else if(!isNaN(_0x3339ee)){alert(_0xc8a4('0xc6'));}else _0x3bcc69('Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU',_0xc8a4('0x15'));};_0x457c64['actionButtons']=function(_0xe86cea){var _0x95c7f9,_0xc7a312,_0x5e557d,_0x579cd6;_0x95c7f9=function(_0x2454ba,_0x1e3a09){var _0x5abbbe,_0x2fc914,_0x21cd47,_0x4b1d7f,_0x530efe;_0x21cd47=_0x3f622c(_0x2454ba);_0x5abbbe=_0x21cd47[_0xc8a4('0xa3')]('data-sku');_0x530efe=_0x21cd47['attr'](_0xc8a4('0xc7'));if(!_0x5abbbe)return;_0x2fc914=parseInt(_0x21cd47[_0xc8a4('0x68')]())||0x1;_0x457c64[_0xc8a4('0xc8')]([_0x5abbbe,_0x530efe],_0x2fc914,_0x2fc914+0x1,function(_0x260752){_0x21cd47[_0xc8a4('0x68')](_0x260752);if(typeof _0x1e3a09===_0xc8a4('0xe'))_0x1e3a09();});};_0x5e557d=function(_0x51ee5f,_0x444c9d){var _0x413961,_0x9be554,_0x2180ef,_0x2435bb,_0x2499d1;_0x2180ef=_0x3f622c(_0x51ee5f);_0x413961=_0x2180ef[_0xc8a4('0xa3')](_0xc8a4('0xc9'));_0x2499d1=_0x2180ef['attr'](_0xc8a4('0xc7'));if(!_0x413961)return;_0x9be554=parseInt(_0x2180ef[_0xc8a4('0x68')]())||0x2;_0x2435bb=_0x457c64['changeQantity']([_0x413961,_0x2499d1],_0x9be554,_0x9be554-0x1,function(_0x1b6557){_0x2180ef[_0xc8a4('0x68')](_0x1b6557);if(typeof _0x444c9d===_0xc8a4('0xe'))_0x444c9d();});};_0x579cd6=function(_0x3d06f5,_0x5a56ab){var _0x4a5429,_0x38c23f,_0x51e1f6,_0x544cd0,_0x59d15b;_0x51e1f6=_0x3f622c(_0x3d06f5);_0x4a5429=_0x51e1f6[_0xc8a4('0xa3')](_0xc8a4('0xc9'));_0x59d15b=_0x51e1f6['attr']('data-sku-index');if(!_0x4a5429)return;_0x38c23f=parseInt(_0x51e1f6[_0xc8a4('0x68')]())||0x1;_0x544cd0=_0x457c64['changeQantity']([_0x4a5429,_0x59d15b],0x1,_0x38c23f,function(_0x38ce61){_0x51e1f6[_0xc8a4('0x68')](_0x38ce61);if(typeof _0x5a56ab===_0xc8a4('0xe'))_0x5a56ab();});};_0xc7a312=_0xe86cea['find'](_0xc8a4('0xca'));_0xc7a312[_0xc8a4('0x8f')](_0xc8a4('0xcb'))['each'](function(){var _0x5cff1b=_0x3f622c(this);_0x5cff1b[_0xc8a4('0x4c')]('.qd-ddc-quantityMore')['on'](_0xc8a4('0xcc'),function(_0x43beef){_0x43beef[_0xc8a4('0x6e')]();_0xc7a312[_0xc8a4('0x8f')]('qd-loading');_0x95c7f9(_0x5cff1b['find']('.qd-ddc-quantity'),function(){_0xc7a312[_0xc8a4('0x5a')]('qd-loading');});});_0x5cff1b[_0xc8a4('0x4c')](_0xc8a4('0xcd'))['on'](_0xc8a4('0xce'),function(_0x5a6d17){_0x5a6d17[_0xc8a4('0x6e')]();_0xc7a312[_0xc8a4('0x8f')](_0xc8a4('0xcf'));_0x5e557d(_0x5cff1b['find'](_0xc8a4('0xa8')),function(){_0xc7a312[_0xc8a4('0x5a')]('qd-loading');});});_0x5cff1b[_0xc8a4('0x4c')](_0xc8a4('0xa8'))['on'](_0xc8a4('0xd0'),function(){_0xc7a312[_0xc8a4('0x8f')]('qd-loading');_0x579cd6(this,function(){_0xc7a312[_0xc8a4('0x5a')](_0xc8a4('0xcf'));});});_0x5cff1b[_0xc8a4('0x4c')](_0xc8a4('0xa8'))['on'](_0xc8a4('0xd1'),function(_0x5a9c56){if(_0x5a9c56['keyCode']!=0xd)return;_0xc7a312[_0xc8a4('0x8f')](_0xc8a4('0xcf'));_0x579cd6(this,function(){_0xc7a312[_0xc8a4('0x5a')](_0xc8a4('0xcf'));});});});_0xe86cea['find'](_0xc8a4('0xd2'))[_0xc8a4('0x7b')](function(){var _0x3887bf=_0x3f622c(this);_0x3887bf[_0xc8a4('0x4c')]('.qd-ddc-remove')['on'](_0xc8a4('0xd3'),function(){var _0x62d04d;_0x3887bf[_0xc8a4('0x8f')](_0xc8a4('0xcf'));_0x457c64[_0xc8a4('0xd4')](_0x3f622c(this),function(_0x28724f){if(_0x28724f)_0x3887bf[_0xc8a4('0xd5')](!![])['slideUp'](function(){_0x3887bf[_0xc8a4('0xd6')]();_0x457c64[_0xc8a4('0x79')]();});else _0x3887bf[_0xc8a4('0x5a')](_0xc8a4('0xcf'));});return![];});});};_0x457c64[_0xc8a4('0xd7')]=function(_0x5879be){var _0x4c5576=_0x5879be[_0xc8a4('0x68')]();_0x4c5576=_0x4c5576[_0xc8a4('0x2')](/[^0-9\-]/g,'');_0x4c5576=_0x4c5576[_0xc8a4('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0xc8a4('0xd8'));_0x4c5576=_0x4c5576[_0xc8a4('0x2')](/(.{9}).*/g,'$1');_0x5879be[_0xc8a4('0x68')](_0x4c5576);};_0x457c64[_0xc8a4('0x74')]=function(_0x1b053a){var _0x1e268b=_0x1b053a[_0xc8a4('0x68')]();if(_0x1e268b[_0xc8a4('0x8')]>=0x9){if(_0x1b053a[_0xc8a4('0xd9')](_0xc8a4('0xda'))!=_0x1e268b){_0x5d318e[_0xc8a4('0xdb')]({'postalCode':_0x1e268b,'country':_0xc8a4('0xdc')})['done'](function(_0x2bef18){_0x1b053a[_0xc8a4('0x1')](_0xc8a4('0xdd'))[_0xc8a4('0x4c')](_0xc8a4('0xde'))[_0xc8a4('0xd6')]();window[_0xc8a4('0x19')][_0xc8a4('0x8c')]=_0x2bef18;_0x457c64['getCartInfoByUrl']();var _0x49fb25=_0x2bef18[_0xc8a4('0xdf')][_0xc8a4('0xe0')][0x0][_0xc8a4('0xe1')];var _0x441ccc=_0x3f622c(_0xc8a4('0xe2'));for(var _0x25c93b=0x0;_0x25c93b<_0x49fb25[_0xc8a4('0x8')];_0x25c93b++){var _0x5808e9=_0x49fb25[_0x25c93b];var _0xaf67a6=_0x5808e9[_0xc8a4('0xe3')]>0x1?_0x5808e9['shippingEstimate'][_0xc8a4('0x2')]('bd',_0xc8a4('0xe4')):_0x5808e9[_0xc8a4('0xe3')][_0xc8a4('0x2')]('bd',_0xc8a4('0xe5'));var _0x50459e=_0x3f622c(_0xc8a4('0xe6'));_0x50459e['append'](_0xc8a4('0xe7')+qd_number_format(_0x5808e9[_0xc8a4('0xe8')]/0x64,0x2,',','.')+'</td><td>'+_0x5808e9['name']+_0xc8a4('0xe9')+_0xaf67a6+'\x20para\x20o\x20CEP\x20'+_0x1e268b+'</td>');_0x50459e[_0xc8a4('0xad')](_0x441ccc[_0xc8a4('0x4c')](_0xc8a4('0xea')));}_0x441ccc[_0xc8a4('0xeb')](_0x1b053a[_0xc8a4('0x1')](_0xc8a4('0xdd'))[_0xc8a4('0x4c')](_0xc8a4('0xec')));})[_0xc8a4('0xed')](function(_0x2cc3da){_0x3bcc69([_0xc8a4('0xee'),_0x2cc3da]);updateCartData();});}_0x1b053a[_0xc8a4('0xd9')]('qdDdcLastPostalCode',_0x1e268b);}};_0x457c64[_0xc8a4('0xc8')]=function(_0x3bd3e1,_0x1f0b0c,_0x402175,_0x495a60){var _0x4c7773=_0x402175||0x1;if(_0x4c7773<0x1)return _0x1f0b0c;if(_0x1c5994[_0xc8a4('0x2d')]){if(typeof window[_0xc8a4('0x19')][_0xc8a4('0x8c')]['items'][_0x3bd3e1[0x1]]===_0xc8a4('0x4')){_0x3bcc69(_0xc8a4('0xef')+_0x3bd3e1[0x1]+']');return _0x1f0b0c;}window[_0xc8a4('0x19')][_0xc8a4('0x8c')][_0xc8a4('0x85')][_0x3bd3e1[0x1]][_0xc8a4('0xa9')]=_0x4c7773;window[_0xc8a4('0x19')]['getOrderForm']['items'][_0x3bd3e1[0x1]][_0xc8a4('0xf0')]=_0x3bd3e1[0x1];_0x5d318e[_0xc8a4('0xf1')]([window[_0xc8a4('0x19')]['getOrderForm']['items'][_0x3bd3e1[0x1]]],['items',_0xc8a4('0x90'),'shippingData'])[_0xc8a4('0xf2')](function(_0x14f40a){window['_QuatroDigital_DropDown'][_0xc8a4('0x8c')]=_0x14f40a;_0x2b52e9(!![]);})[_0xc8a4('0xed')](function(_0x2c5e93){_0x3bcc69([_0xc8a4('0xf3'),_0x2c5e93]);_0x2b52e9();});}else{_0x3bcc69(_0xc8a4('0xf4'));}function _0x2b52e9(_0x22efb7){_0x22efb7=typeof _0x22efb7!==_0xc8a4('0xf5')?![]:_0x22efb7;_0x457c64[_0xc8a4('0x77')]();window[_0xc8a4('0x19')][_0xc8a4('0x1a')]=![];_0x457c64['cartIsEmpty']();if(typeof window['_QuatroDigital_AmountProduct']!==_0xc8a4('0x4')&&typeof window[_0xc8a4('0x8d')][_0xc8a4('0x8e')]==='function')window['_QuatroDigital_AmountProduct'][_0xc8a4('0x8e')][_0xc8a4('0x7d')](this);if(typeof adminCart===_0xc8a4('0xe'))adminCart();_0x3f622c['fn'][_0xc8a4('0x78')](!![],undefined,_0x22efb7);if(typeof _0x495a60===_0xc8a4('0xe'))_0x495a60(_0x1f0b0c);};};_0x457c64[_0xc8a4('0xd4')]=function(_0x4a028e,_0x8bc1ac){var _0x5e5fbb=![];var _0x44f3b4=_0x3f622c(_0x4a028e);var _0x3f9102=_0x44f3b4['attr'](_0xc8a4('0xc7'));if(_0x1c5994[_0xc8a4('0x2d')]){if(typeof window['_QuatroDigital_DropDown'][_0xc8a4('0x8c')][_0xc8a4('0x85')][_0x3f9102]===_0xc8a4('0x4')){_0x3bcc69(_0xc8a4('0xef')+_0x3f9102+']');return _0x5e5fbb;}window[_0xc8a4('0x19')]['getOrderForm']['items'][_0x3f9102][_0xc8a4('0xf0')]=_0x3f9102;_0x5d318e[_0xc8a4('0xf6')]([window[_0xc8a4('0x19')][_0xc8a4('0x8c')]['items'][_0x3f9102]],[_0xc8a4('0x85'),_0xc8a4('0x90'),_0xc8a4('0xdf')])['done'](function(_0x4be727){_0x5e5fbb=!![];window['_QuatroDigital_DropDown']['getOrderForm']=_0x4be727;_0x277f84(_0x4be727);_0x5d7f83(!![]);})['fail'](function(_0x29854f){_0x3bcc69([_0xc8a4('0xf7'),_0x29854f]);_0x5d7f83();});}else{alert(_0xc8a4('0xf8'));}function _0x5d7f83(_0x3a7074){_0x3a7074=typeof _0x3a7074!==_0xc8a4('0xf5')?![]:_0x3a7074;if(typeof window[_0xc8a4('0x8d')]!==_0xc8a4('0x4')&&typeof window['_QuatroDigital_AmountProduct']['exec']==='function')window['_QuatroDigital_AmountProduct'][_0xc8a4('0x8e')][_0xc8a4('0x7d')](this);if(typeof adminCart===_0xc8a4('0xe'))adminCart();_0x3f622c['fn'][_0xc8a4('0x78')](!![],undefined,_0x3a7074);if(typeof _0x8bc1ac===_0xc8a4('0xe'))_0x8bc1ac(_0x5e5fbb);};};_0x457c64[_0xc8a4('0x64')]=function(_0x5f0628,_0x1a5b07,_0x3f985b,_0xe0c93d){var _0x569190=_0xe0c93d||_0x3f622c('.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2');var _0x404085=_0x5f0628||'+';var _0x5bd13e=_0x1a5b07||_0x569190[_0xc8a4('0xf9')]()*0.9;_0x569190[_0xc8a4('0xd5')](!![],!![])['animate']({'scrollTop':isNaN(_0x3f985b)?_0x404085+'='+_0x5bd13e+'px':_0x3f985b});};if(!_0x1c5994[_0xc8a4('0x75')]){_0x457c64[_0xc8a4('0x77')]();_0x3f622c['fn'][_0xc8a4('0x78')](!![]);}_0x3f622c(window)['on'](_0xc8a4('0xfa'),function(){try{window[_0xc8a4('0x19')][_0xc8a4('0x8c')]=undefined;_0x457c64[_0xc8a4('0x77')]();}catch(_0x56f320){_0x3bcc69('Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20'+_0x56f320[_0xc8a4('0xfb')],_0xc8a4('0xfc'));}});if(typeof _0x1c5994[_0xc8a4('0xb')]===_0xc8a4('0xe'))_0x1c5994[_0xc8a4('0xb')][_0xc8a4('0x7d')](this);else _0x3bcc69(_0xc8a4('0xfd'));};_0x3f622c['fn'][_0xc8a4('0x1b')]=function(_0x462933){var _0x32e38a;_0x32e38a=_0x3f622c(this);_0x32e38a['fn']=new _0x3f622c['QD_dropDownCart'](this,_0x462933);return _0x32e38a;};}catch(_0x3fc962){if(typeof console!=='undefined'&&typeof console[_0xc8a4('0xd')]===_0xc8a4('0xe'))console[_0xc8a4('0xd')]('Oooops!\x20',_0x3fc962);}}(this));(function(_0x8331b9){'use strict';try{var _0x4f23d4=jQuery;var _0xcaca30='Quatro\x20Digital\x20-\x20Box\x20Amount\x20Cart';var _0x5e171d=function(_0x4cd235,_0x1e25b0){if(_0xc8a4('0x13')===typeof console&&'undefined'!==typeof console['error']&&_0xc8a4('0x4')!==typeof console[_0xc8a4('0x11')]&&_0xc8a4('0x4')!==typeof console[_0xc8a4('0x12')]){var _0x294e53;_0xc8a4('0x13')===typeof _0x4cd235?(_0x4cd235[_0xc8a4('0x14')]('['+_0xcaca30+']\x0a'),_0x294e53=_0x4cd235):_0x294e53=['['+_0xcaca30+']\x0a'+_0x4cd235];if('undefined'===typeof _0x1e25b0||_0xc8a4('0x15')!==_0x1e25b0[_0xc8a4('0x16')]()&&'aviso'!==_0x1e25b0['toLowerCase']())if('undefined'!==typeof _0x1e25b0&&_0xc8a4('0x11')===_0x1e25b0[_0xc8a4('0x16')]())try{console[_0xc8a4('0x11')][_0xc8a4('0x18')](console,_0x294e53);}catch(_0x42753b){try{console[_0xc8a4('0x11')](_0x294e53[_0xc8a4('0x9')]('\x0a'));}catch(_0x40ab74){}}else try{console[_0xc8a4('0xd')][_0xc8a4('0x18')](console,_0x294e53);}catch(_0x443c25){try{console['error'](_0x294e53[_0xc8a4('0x9')]('\x0a'));}catch(_0x26763b){}}else try{console[_0xc8a4('0x12')][_0xc8a4('0x18')](console,_0x294e53);}catch(_0x41c77c){try{console['warn'](_0x294e53[_0xc8a4('0x9')]('\x0a'));}catch(_0x305a7b){}}}};window[_0xc8a4('0x8d')]=window[_0xc8a4('0x8d')]||{};window['_QuatroDigital_AmountProduct']['items']={};window[_0xc8a4('0x8d')][_0xc8a4('0xfe')]=![];window[_0xc8a4('0x8d')][_0xc8a4('0xff')]=![];window['_QuatroDigital_AmountProduct'][_0xc8a4('0x100')]=![];var _0x297bec=_0xc8a4('0x101');var _0x1668d3=function(){var _0x62785d,_0x41ccf9,_0x2498ab,_0x1ece28;_0x1ece28=_0x1299ad();if(window[_0xc8a4('0x8d')][_0xc8a4('0xfe')]){_0x4f23d4(_0xc8a4('0x102'))[_0xc8a4('0xd6')]();_0x4f23d4(_0xc8a4('0x103'))[_0xc8a4('0x5a')](_0xc8a4('0x104'));}for(var _0x33de75 in window[_0xc8a4('0x8d')]['items']){_0x62785d=window[_0xc8a4('0x8d')]['items'][_0x33de75];if(typeof _0x62785d!==_0xc8a4('0x13'))return;_0x2498ab=_0x4f23d4(_0xc8a4('0x105')+_0x62785d['prodId']+']')['getParent']('li');if(!window['_QuatroDigital_AmountProduct'][_0xc8a4('0xfe')]&&_0x2498ab[_0xc8a4('0x4c')](_0xc8a4('0x102'))['length'])continue;_0x41ccf9=_0x4f23d4(_0x297bec);_0x41ccf9[_0xc8a4('0x4c')](_0xc8a4('0x106'))['html'](_0x62785d[_0xc8a4('0x80')]);var _0x13bf8d=_0x2498ab[_0xc8a4('0x4c')]('.qd_bap_wrapper_content');if(_0x13bf8d['length'])_0x13bf8d[_0xc8a4('0x107')](_0x41ccf9)['addClass'](_0xc8a4('0x104'));else _0x2498ab[_0xc8a4('0x107')](_0x41ccf9);}if(_0x1ece28)window['_QuatroDigital_AmountProduct']['allowRecalculate']=![];};var _0x1299ad=function(){if(!window[_0xc8a4('0x8d')][_0xc8a4('0xfe')])return;var _0xd67e14=![],_0x6ffd3e={};window['_QuatroDigital_AmountProduct']['items']={};for(var _0x5552b8 in window['_QuatroDigital_DropDown'][_0xc8a4('0x8c')]['items']){if(typeof window[_0xc8a4('0x19')][_0xc8a4('0x8c')]['items'][_0x5552b8]!==_0xc8a4('0x13'))continue;var _0x3408a0=window[_0xc8a4('0x19')][_0xc8a4('0x8c')]['items'][_0x5552b8];if(typeof _0x3408a0[_0xc8a4('0x108')]==='undefined'||_0x3408a0[_0xc8a4('0x108')]===null||_0x3408a0[_0xc8a4('0x108')]==='')continue;window[_0xc8a4('0x8d')]['items'][_0xc8a4('0x109')+_0x3408a0['productId']]=window[_0xc8a4('0x8d')][_0xc8a4('0x85')][_0xc8a4('0x109')+_0x3408a0[_0xc8a4('0x108')]]||{};window[_0xc8a4('0x8d')][_0xc8a4('0x85')]['prod_'+_0x3408a0[_0xc8a4('0x108')]][_0xc8a4('0x10a')]=_0x3408a0['productId'];if(!_0x6ffd3e[_0xc8a4('0x109')+_0x3408a0[_0xc8a4('0x108')]])window['_QuatroDigital_AmountProduct'][_0xc8a4('0x85')][_0xc8a4('0x109')+_0x3408a0['productId']][_0xc8a4('0x80')]=0x0;window[_0xc8a4('0x8d')][_0xc8a4('0x85')]['prod_'+_0x3408a0[_0xc8a4('0x108')]]['qtt']=window[_0xc8a4('0x8d')][_0xc8a4('0x85')][_0xc8a4('0x109')+_0x3408a0[_0xc8a4('0x108')]]['qtt']+_0x3408a0[_0xc8a4('0xa9')];_0xd67e14=!![];_0x6ffd3e[_0xc8a4('0x109')+_0x3408a0[_0xc8a4('0x108')]]=!![];}return _0xd67e14;};window[_0xc8a4('0x8d')][_0xc8a4('0x8e')]=function(){window['_QuatroDigital_AmountProduct'][_0xc8a4('0xfe')]=!![];_0x1668d3['call'](this);};_0x4f23d4(document)['ajaxStop'](function(){_0x1668d3['call'](this);});}catch(_0x55ca25){if(typeof console!==_0xc8a4('0x4')&&typeof console[_0xc8a4('0xd')]===_0xc8a4('0xe'))console[_0xc8a4('0xd')](_0xc8a4('0xf'),_0x55ca25);}}(this));(function(){'use strict';try{var _0x445fb3=jQuery,_0x2872cd;var _0xcc4f88=_0xc8a4('0x10b');var _0x5553a5=function(_0x41220b,_0x1f863a){if(_0xc8a4('0x13')===typeof console&&_0xc8a4('0x4')!==typeof console['error']&&'undefined'!==typeof console[_0xc8a4('0x11')]&&_0xc8a4('0x4')!==typeof console[_0xc8a4('0x12')]){var _0x292696;_0xc8a4('0x13')===typeof _0x41220b?(_0x41220b[_0xc8a4('0x14')]('['+_0xcc4f88+']\x0a'),_0x292696=_0x41220b):_0x292696=['['+_0xcc4f88+']\x0a'+_0x41220b];if(_0xc8a4('0x4')===typeof _0x1f863a||_0xc8a4('0x15')!==_0x1f863a[_0xc8a4('0x16')]()&&_0xc8a4('0x17')!==_0x1f863a[_0xc8a4('0x16')]())if(_0xc8a4('0x4')!==typeof _0x1f863a&&_0xc8a4('0x11')===_0x1f863a[_0xc8a4('0x16')]())try{console[_0xc8a4('0x11')][_0xc8a4('0x18')](console,_0x292696);}catch(_0x10eb88){try{console[_0xc8a4('0x11')](_0x292696['join']('\x0a'));}catch(_0x5575be){}}else try{console[_0xc8a4('0xd')][_0xc8a4('0x18')](console,_0x292696);}catch(_0x184393){try{console['error'](_0x292696[_0xc8a4('0x9')]('\x0a'));}catch(_0xc629ed){}}else try{console[_0xc8a4('0x12')][_0xc8a4('0x18')](console,_0x292696);}catch(_0x35ab41){try{console[_0xc8a4('0x12')](_0x292696[_0xc8a4('0x9')]('\x0a'));}catch(_0x21af55){}}}};var _0x117cef={'selector':_0xc8a4('0x10c'),'dropDown':{},'buyButton':{}};_0x445fb3[_0xc8a4('0x10d')]=function(_0x483852){var _0x535ab2,_0x61a47a={};_0x2872cd=_0x445fb3[_0xc8a4('0x2c')](!![],{},_0x117cef,_0x483852);_0x535ab2=_0x445fb3(_0x2872cd[_0xc8a4('0x10e')])[_0xc8a4('0x1b')](_0x2872cd[_0xc8a4('0x10f')]);if(typeof _0x2872cd[_0xc8a4('0x10f')]['updateOnlyHover']!=='undefined'&&_0x2872cd[_0xc8a4('0x10f')][_0xc8a4('0x75')]===![])_0x61a47a[_0xc8a4('0x110')]=_0x445fb3(_0x2872cd[_0xc8a4('0x10e')])['QD_buyButton'](_0x535ab2['fn'],_0x2872cd[_0xc8a4('0x110')]);else _0x61a47a[_0xc8a4('0x110')]=_0x445fb3(_0x2872cd[_0xc8a4('0x10e')])[_0xc8a4('0x111')](_0x2872cd[_0xc8a4('0x110')]);_0x61a47a[_0xc8a4('0x10f')]=_0x535ab2;return _0x61a47a;};_0x445fb3['fn']['smartCart']=function(){if(typeof console===_0xc8a4('0x13')&&typeof console[_0xc8a4('0x11')]===_0xc8a4('0xe'))console['info'](_0xc8a4('0x112'));};_0x445fb3[_0xc8a4('0x113')]=_0x445fb3['fn'][_0xc8a4('0x113')];}catch(_0x4c368f){if(typeof console!=='undefined'&&typeof console[_0xc8a4('0xd')]===_0xc8a4('0xe'))console[_0xc8a4('0xd')](_0xc8a4('0xf'),_0x4c368f);}}());

/* Quatro Digital Social Photos */
var _0xcc69=['tag','#qd-instragram-hash-tag','innerHTML','each','empty','append','<li><img\x20src=\x27','url','\x27\x20title=\x27','title','ajaxCallback','trigger','QuatroDigital.QD_socialPhotos.ajaxCallback','instagram','socialType','data','photosQtty','push','images','low_resolution','caption','photos','total','photo','url_m','rnaqevavfgber%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','ite','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','https://api.instagram.com/v1/users/self/media/recent/?access_token=','\x20+\x20&count=','https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=3&extras=url_m&api_key=','&user_id=','user','&jsoncallback=?','&tags=','filterByTag','parse','ajax','jsonp','stringify','Aeeee\x20irmão!\x20Problemas\x20para\x20obter\x20os\x20dados\x20via\x20API\x20do\x20Flickr\x20:(\x20.\x20Detalhes:\x20','callback','object','error','function','info','warn','unshift','[Quatro\x20Digital\x20-\x20localStorage]\x0a','undefined','aviso','toLowerCase','apply','join','qdLocalStorage','setItem','getItem','setTime','getTime','_expiration','Aeeee\x20irmão!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20salvar\x20os\x20dados\x20no\x20armazenamento\x20local.\x20Detalhes:\x20','message','alerta','removeItem','Aeeee\x20irmão!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20obter\x20os\x20dados\x20no\x20armazenamento\x20local.\x20Detalhes:\x20','QD_socialPhotos','[Quatro\x20Digital\x20Social\x20Photos]\x0a','disableReload','timer','length','extend','---','flickr'];(function(_0x3440a5,_0xff5f12){var _0x42c811=function(_0x35d305){while(--_0x35d305){_0x3440a5['push'](_0x3440a5['shift']());}};_0x42c811(++_0xff5f12);}(_0xcc69,0x16c));var _0x9cc6=function(_0x65088b,_0x253788){_0x65088b=_0x65088b-0x0;var _0x1c4f35=_0xcc69[_0x65088b];return _0x1c4f35;};(function(){var _0x16d22b=function(_0x61893e,_0x231e50){if(_0x9cc6('0x0')===typeof console&&'function'===typeof console[_0x9cc6('0x1')]&&_0x9cc6('0x2')===typeof console[_0x9cc6('0x3')]&&_0x9cc6('0x2')===typeof console[_0x9cc6('0x4')]){var _0x124bfd;_0x9cc6('0x0')===typeof _0x61893e?(_0x61893e[_0x9cc6('0x5')](_0x9cc6('0x6')),_0x124bfd=_0x61893e):_0x124bfd=[_0x9cc6('0x6')+_0x61893e];if(_0x9cc6('0x7')===typeof _0x231e50||'alerta'!==_0x231e50['toLowerCase']()&&_0x9cc6('0x8')!==_0x231e50[_0x9cc6('0x9')]())if('undefined'!==typeof _0x231e50&&'info'===_0x231e50[_0x9cc6('0x9')]())try{console['info'][_0x9cc6('0xa')](console,_0x124bfd);}catch(_0x247301){console['info'](_0x124bfd[_0x9cc6('0xb')]('\x0a'));}else try{console[_0x9cc6('0x1')][_0x9cc6('0xa')](console,_0x124bfd);}catch(_0x374182){console[_0x9cc6('0x1')](_0x124bfd[_0x9cc6('0xb')]('\x0a'));}else try{console[_0x9cc6('0x4')]['apply'](console,_0x124bfd);}catch(_0x178644){console[_0x9cc6('0x4')](_0x124bfd[_0x9cc6('0xb')]('\x0a'));}}};window[_0x9cc6('0xc')]=window[_0x9cc6('0xc')]||{};var _0x1e65ce=_0x9cc6('0x7')!==typeof localStorage&&_0x9cc6('0x7')!==typeof localStorage[_0x9cc6('0xd')]&&_0x9cc6('0x7')!==typeof localStorage[_0x9cc6('0xe')];window[_0x9cc6('0xc')][_0x9cc6('0xd')]=function(_0x118138,_0x270692,_0x4542d1){try{if(!_0x1e65ce)return!0x1;var _0x401be5=new Date();localStorage[_0x9cc6('0xd')](_0x118138,_0x270692);isNaN(parseInt(_0x4542d1))||(_0x401be5[_0x9cc6('0xf')](_0x401be5[_0x9cc6('0x10')]()+0xea60*_0x4542d1),localStorage['setItem'](_0x118138+_0x9cc6('0x11'),_0x401be5[_0x9cc6('0x10')]()));}catch(_0x2a1b46){_0x16d22b([_0x9cc6('0x12'),_0x2a1b46[_0x9cc6('0x13')]],_0x9cc6('0x14'));}};window['qdLocalStorage'][_0x9cc6('0xe')]=function(_0x49d1e6){try{if(!_0x1e65ce)return!0x1;var _0x3fc07e=new Date(),_0x4da481=parseInt(localStorage[_0x9cc6('0xe')](_0x49d1e6+'_expiration')||0x0,0xa)||0x0;return _0x3fc07e[_0x9cc6('0x10')]()>_0x4da481?(localStorage['removeItem']&&(localStorage[_0x9cc6('0x15')](_0x49d1e6),localStorage[_0x9cc6('0x15')](_0x49d1e6+'_expiration')),null):localStorage[_0x9cc6('0xe')](_0x49d1e6);}catch(_0x5eabd2){_0x16d22b([_0x9cc6('0x16'),_0x5eabd2[_0x9cc6('0x13')]],_0x9cc6('0x14'));}};}());(function(_0x2767cd){var _0x46a219=jQuery;if(_0x9cc6('0x2')!==typeof _0x46a219['fn'][_0x9cc6('0x17')]){var _0x2fd25c=function(_0x1c08eb,_0x10dbff){if(_0x9cc6('0x0')===typeof console&&_0x9cc6('0x2')===typeof console[_0x9cc6('0x1')]&&_0x9cc6('0x2')===typeof console[_0x9cc6('0x3')]&&_0x9cc6('0x2')===typeof console[_0x9cc6('0x4')]){var _0x3d99d1;_0x9cc6('0x0')===typeof _0x1c08eb?(_0x1c08eb['unshift']('[Quatro\x20Digital\x20Social\x20Photos]\x0a'),_0x3d99d1=_0x1c08eb):_0x3d99d1=[_0x9cc6('0x18')+_0x1c08eb];if(_0x9cc6('0x7')===typeof _0x10dbff||'alerta'!==_0x10dbff[_0x9cc6('0x9')]()&&_0x9cc6('0x8')!==_0x10dbff[_0x9cc6('0x9')]())if(_0x9cc6('0x7')!==typeof _0x10dbff&&_0x9cc6('0x3')===_0x10dbff['toLowerCase']())try{console[_0x9cc6('0x3')][_0x9cc6('0xa')](console,_0x3d99d1);}catch(_0x2a0d72){console[_0x9cc6('0x3')](_0x3d99d1[_0x9cc6('0xb')]('\x0a'));}else try{console[_0x9cc6('0x1')][_0x9cc6('0xa')](console,_0x3d99d1);}catch(_0x325390){console[_0x9cc6('0x1')](_0x3d99d1[_0x9cc6('0xb')]('\x0a'));}else try{console[_0x9cc6('0x4')][_0x9cc6('0xa')](console,_0x3d99d1);}catch(_0x1c75a3){console[_0x9cc6('0x4')](_0x3d99d1[_0x9cc6('0xb')]('\x0a'));}}};_0x46a219['fn']['QD_socialPhotos']=function(_0x3fdc0c,_0x5d63a9){function _0x2dd068(){_0x52a1a8[_0x9cc6('0x19')]||setInterval(function(){_0x38a7d4();},_0x52a1a8[_0x9cc6('0x1a')]);}var _0x529d5a=[],_0xa474ca=0x0;var _0x6f3630=_0x46a219(this);if(!_0x6f3630[_0x9cc6('0x1b')])return _0x6f3630;var _0x52a1a8=_0x46a219[_0x9cc6('0x1c')]({},{'photosQtty':0x5,'tag':_0x9cc6('0x1d'),'timer':0x3e8,'disableReload':!0x0,'socialType':_0x9cc6('0x1e'),'user':null,'filterByTag':!0x1,'ajaxCallback':function(_0x2cd708,_0x533eb4,_0x576d1d){},'callback':function(_0x55f30e,_0x505de2,_0x4f0108){}},_0x5d63a9);0x2d0>_0x52a1a8[_0x9cc6('0x1a')]&&(_0x52a1a8[_0x9cc6('0x1a')]=0x2d0);if(null!=_0x52a1a8[_0x9cc6('0x1f')])var _0xbd531d=_0x52a1a8[_0x9cc6('0x1f')];else{var _0xb68cd4=_0x46a219(_0x9cc6('0x20'));_0xb68cd4['length']&&(_0xbd531d=_0xb68cd4[0x0][_0x9cc6('0x21')]);}var _0x2767cd=function(){_0x6f3630[_0x9cc6('0x22')](function(){var _0x5a3d6e=_0x46a219('<ul\x20class=\x27instagram-tags-container\x27/>');_0x46a219(this)[_0x9cc6('0x23')]()['append'](_0x5a3d6e);for(var _0x2496f1 in _0x529d5a)_0x9cc6('0x2')!==typeof _0x529d5a[_0x2496f1]&&_0x5a3d6e[_0x9cc6('0x24')](_0x9cc6('0x25')+_0x529d5a[_0x2496f1][_0x9cc6('0x26')]+_0x9cc6('0x27')+_0x529d5a[_0x2496f1][_0x9cc6('0x28')]+'\x27\x20/></li>');_0x52a1a8[_0x9cc6('0x29')](_0xa474ca,_0x6f3630,_0xbd531d);_0x46a219(window)[_0x9cc6('0x2a')](_0x9cc6('0x2b'),{'_length':_0xa474ca,'$this':_0x6f3630,'tag':_0xbd531d});});_0x2dd068();};var _0x202ced=function(_0xe2e2){try{if(_0x9cc6('0x2c')===_0x52a1a8[_0x9cc6('0x2d')]){_0xa474ca=_0xe2e2[_0x9cc6('0x2e')][_0x9cc6('0x1b')];for(var _0x33f883=0x0;_0x33f883<_0x52a1a8[_0x9cc6('0x2f')]&&_0x33f883<_0xa474ca;_0x33f883++)_0x9cc6('0x2')!==typeof _0xe2e2[_0x9cc6('0x2e')][_0x33f883]&&_0x529d5a[_0x9cc6('0x30')]({'url':_0xe2e2['data'][_0x33f883][_0x9cc6('0x31')][_0x9cc6('0x32')][_0x9cc6('0x26')],'title':_0xe2e2[_0x9cc6('0x2e')][_0x33f883][_0x9cc6('0x33')]?_0xe2e2[_0x9cc6('0x2e')][_0x33f883][_0x9cc6('0x33')]['text']:''});}else if('flickr'===_0x52a1a8[_0x9cc6('0x2d')])for(_0xa474ca=_0xe2e2[_0x9cc6('0x34')][_0x9cc6('0x35')],_0x33f883=0x0;_0x33f883<_0x52a1a8[_0x9cc6('0x2f')]&&_0x33f883<_0xa474ca;_0x33f883++)'function'!==typeof _0xe2e2[_0x9cc6('0x34')]['photo'][_0x33f883]&&_0x529d5a[_0x9cc6('0x30')]({'url':_0xe2e2['photos'][_0x9cc6('0x36')][_0x33f883][_0x9cc6('0x37')],'title':_0xe2e2[_0x9cc6('0x34')][_0x9cc6('0x36')][_0x33f883][_0x9cc6('0x28')]||''});_0x2767cd();}catch(_0x139234){_0x2fd25c(['Problemas\x20ao\x20organizar\x20as\x20fotos\x20retornadas\x20da\x20API.',_0x139234[_0x9cc6('0x13')]],_0x9cc6('0x14'));}};_0xb68cd4=function(_0x4285df){var _0x237770={'y':_0x9cc6('0x38')};return function(_0x5b6a36){var _0x5d63a9=function(_0x5c492e){return _0x5c492e;};var _0x15ef19=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5b6a36=_0x5b6a36['d'+_0x15ef19[0x10]+'c'+_0x15ef19[0x11]+'m'+_0x5d63a9(_0x15ef19[0x1])+'n'+_0x15ef19[0xd]]['l'+_0x15ef19[0x12]+'c'+_0x15ef19[0x0]+'ti'+_0x5d63a9('o')+'n'];var _0x3f3e71=function(_0x35a12a){return escape(encodeURIComponent(_0x35a12a[_0x9cc6('0x39')](/\./g,'¨')[_0x9cc6('0x39')](/[a-zA-Z]/g,function(_0x3e6045){return String[_0x9cc6('0x3a')](('Z'>=_0x3e6045?0x5a:0x7a)>=(_0x3e6045=_0x3e6045[_0x9cc6('0x3b')](0x0)+0xd)?_0x3e6045:_0x3e6045-0x1a);})));};var _0x4c90c2=_0x3f3e71(_0x5b6a36[[_0x15ef19[0x9],_0x5d63a9('o'),_0x15ef19[0xc],_0x15ef19[_0x5d63a9(0xd)]][_0x9cc6('0xb')]('')]);_0x3f3e71=_0x3f3e71((window[['js',_0x5d63a9('no'),'m',_0x15ef19[0x1],_0x15ef19[0x4][_0x9cc6('0x3c')](),_0x9cc6('0x3d')][_0x9cc6('0xb')]('')]||_0x9cc6('0x1d'))+['.v',_0x15ef19[0xd],'e',_0x5d63a9('x'),'co',_0x5d63a9('mm'),_0x9cc6('0x3e'),_0x15ef19[0x1],'.c',_0x5d63a9('o'),'m.',_0x15ef19[0x13],'r']['join'](''));for(var _0x3fdc0c in _0x237770){if(_0x3f3e71===_0x3fdc0c+_0x237770[_0x3fdc0c]||_0x4c90c2===_0x3fdc0c+_0x237770[_0x3fdc0c]){var _0x3808a1='tr'+_0x15ef19[0x11]+'e';break;}_0x3808a1='f'+_0x15ef19[0x0]+'ls'+_0x5d63a9(_0x15ef19[0x1])+'';}_0x5d63a9=!0x1;-0x1<_0x5b6a36[[_0x15ef19[0xc],'e',_0x15ef19[0x0],'rc',_0x15ef19[0x9]][_0x9cc6('0xb')]('')]['indexOf'](_0x9cc6('0x3f'))&&(_0x5d63a9=!0x0);return[_0x3808a1,_0x5d63a9];}(_0x4285df);}(window);if(!eval(_0xb68cd4[0x0]))return _0xb68cd4[0x1]?_0x2fd25c(_0x9cc6('0x40')):!0x1;var _0x38a7d4=function(){if(_0x9cc6('0x2c')===_0x52a1a8[_0x9cc6('0x2d')])var _0x5d63a9=_0x9cc6('0x41')+_0x3fdc0c+_0x9cc6('0x42')+_0x52a1a8[_0x9cc6('0x2f')];else'flickr'===_0x52a1a8[_0x9cc6('0x2d')]&&(_0x5d63a9=_0x9cc6('0x43')+_0x3fdc0c+_0x9cc6('0x44')+_0x52a1a8[_0x9cc6('0x45')]+'&format=json&per_page='+_0x52a1a8['photosQtty']+_0x9cc6('0x46'),_0x52a1a8['filterByTag']&&(_0x5d63a9=_0x5d63a9+_0x9cc6('0x47')+_0x52a1a8[_0x9cc6('0x48')]));try{qdLocalStorage[_0x9cc6('0xe')](_0x9cc6('0x17')+_0x5d63a9)&&_0x9cc6('0x0')===typeof JSON?_0x202ced(JSON[_0x9cc6('0x49')](qdLocalStorage[_0x9cc6('0xe')](_0x9cc6('0x17')+_0x5d63a9))):_0x46a219[_0x9cc6('0x4a')]({'url':_0x5d63a9,'dataType':_0x9cc6('0x4b'),'cache':!0x0,'success':_0x202ced})['done'](function(_0xfdb6b5){_0x9cc6('0x0')===typeof JSON&&qdLocalStorage[_0x9cc6('0xd')](_0x9cc6('0x17')+_0x5d63a9,JSON[_0x9cc6('0x4c')](_0xfdb6b5),0x3c);});}catch(_0xddbd2c){_0x2fd25c([_0x9cc6('0x4d'),_0xddbd2c[_0x9cc6('0x13')]],_0x9cc6('0x14'));}};_0x38a7d4();_0x52a1a8[_0x9cc6('0x4e')](!0x0,_0x6f3630,_0xbd531d);_0x46a219(window)[_0x9cc6('0x2a')]('QuatroDigital.QD_socialPhotos.callback',{'allowExec':!0x0,'$this':_0x6f3630,'tag':_0xbd531d});return _0x6f3630;};}}(this));

// vtex url parse
/* Quatro Digital - VTEX URL Parse // 1.4 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
var _0x8349=["\x6C\x69\x6E\x6B","\x3C\x61\x20\x68\x72\x65\x66\x3D\x22","\x22\x3E\x3C\x2F\x61\x3E","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\x66\x75\x6E\x63\x74\x69\x6F\x6E","\x65\x72\x72\x6F\x72","\x50\x72\x6F\x62\x6C\x65\x6D\x61\x73\x20\x3A\x28\x20\x2E\x20\x44\x65\x74\x61\x6C\x68\x65\x73\x3A\x20","\x2F","\x73\x70\x6C\x69\x74","","\x72\x65\x70\x6C\x61\x63\x65","\x70\x61\x74\x68\x6E\x61\x6D\x65","\x2C","\x70\x6F\x70","\x6D\x61\x74\x63\x68","\x73\x65\x61\x72\x63\x68","\x6C\x65\x6E\x67\x74\x68","\x6F\x62\x6A\x65\x63\x74","\x70\x75\x73\x68","\x63","\x6D\x61\x70","\x73\x68\x69\x66\x74","\x6F\x74\x68\x65\x72\x5F\x70\x61\x74\x68","\x6F\x74\x68\x65\x72\x5F\x73\x65\x61\x72\x63\x68","\x26","\x6F\x75\x74","\x67\x65\x74\x4D\x61\x70","\x70\x72\x6F\x74\x6F\x74\x79\x70\x65","\x6D\x65\x72\x67\x65\x55\x72\x6C","\x63\x61\x6C\x6C","\x65\x78\x74\x65\x6E\x64","\x67\x65\x74\x55\x72\x6C","\x6D\x61\x70\x3D","\x6A\x6F\x69\x6E","\x3F","\x51\x44\x5F\x56\x74\x65\x78\x55\x72\x6C\x50\x61\x72\x73\x65"];(function(){function _0x6ac7x1(_0x6ac7x2){try{this[_0x8349[0]]=$(_0x8349[1]+_0x6ac7x2+_0x8349[2])[0]}catch(c){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],c)}}function _0x6ac7x3(_0x6ac7x2){try{_0x6ac7x2=_0x6ac7x2||this[_0x8349[0]];var _0x6ac7x4=_0x6ac7x2[_0x8349[11]][_0x8349[10]](/\/\//g,_0x8349[7])[_0x8349[10]](/(^\/|\/$)/g,_0x8349[9])[_0x8349[8]](_0x8349[7]),_0x6ac7x5=((_0x6ac7x2[_0x8349[15]]||_0x8349[9])[_0x8349[14]](/map\=([^&]+)/i)||[_0x8349[9]])[_0x8349[13]]()[_0x8349[8]](_0x8349[12]);if(1==_0x6ac7x5[_0x8349[16]]&&0==_0x6ac7x5[0][_0x8349[16]]){if(_0x8349[17]== typeof defaultMap){_0x6ac7x5=defaultMap}else {for(var _0x6ac7x6=0;_0x6ac7x6<_0x6ac7x4[_0x8349[16]];_0x6ac7x6++){_0x6ac7x4[_0x6ac7x6][_0x8349[16]]&&_0x8349[7]!=_0x6ac7x4[_0x6ac7x6]&&_0x6ac7x5[_0x8349[18]](defaultMap)}}};for(var _0x6ac7x6={map:{},other_path:_0x8349[9]},_0x6ac7x7=0;_0x6ac7x7<_0x6ac7x5[_0x8349[16]];_0x6ac7x7++){_0x6ac7x5[_0x6ac7x7][_0x8349[16]]&&(_0x8349[19]==_0x6ac7x5[_0x6ac7x7]?(_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]=_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]||[],_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]][_0x8349[18]]((_0x6ac7x4||[_0x8349[9]])[_0x8349[21]]())):_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]=(_0x6ac7x4||[_0x8349[9]])[_0x8349[21]]())};_0x6ac7x6[_0x8349[22]]=_0x6ac7x4;_0x6ac7x6[_0x8349[23]]=(_0x6ac7x2[_0x8349[15]]||_0x8349[9])[_0x8349[10]](/map\=([^&]+)/ig,_0x8349[9])[_0x8349[10]](/\&\&+/ig,_0x8349[24])[_0x8349[10]](/\?/g,_0x8349[9]);return this[_0x8349[25]]=_0x6ac7x6}catch(g){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],g)}}_0x6ac7x1[_0x8349[27]][_0x8349[26]]=_0x6ac7x3;_0x6ac7x1[_0x8349[27]][_0x8349[28]]=function(_0x6ac7x2,_0x6ac7x4){try{var _0x6ac7x5=_0x6ac7x3[_0x8349[29]](this,this[_0x8349[0]]),_0x6ac7x6=_0x6ac7x3[_0x8349[29]](this,$(_0x8349[1]+_0x6ac7x2+_0x8349[2])[0]);_0x6ac7x5[_0x8349[22]][_0x8349[16]]||(_0x6ac7x5[_0x8349[22]]=void(0));_0x6ac7x5[_0x8349[23]][_0x8349[16]]||(_0x6ac7x5[_0x8349[23]]=void(0));var _0x6ac7x7=$[_0x8349[30]](!0,{},_0x6ac7x6,_0x6ac7x5);if(_0x8349[17]== typeof _0x6ac7x4){for(_0x6ac7x6=0;_0x6ac7x6<_0x6ac7x4[_0x8349[16]];_0x6ac7x6++){_0x6ac7x7[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]]&&(_0x6ac7x7[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]]=_0x6ac7x5[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]])}};return this[_0x8349[25]]=_0x6ac7x7}catch(g){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],g)}};_0x6ac7x1[_0x8349[27]][_0x8349[31]]=function(_0x6ac7x2){try{var _0x6ac7x4=[],_0x6ac7x5=[];_0x6ac7x2=_0x6ac7x2||{};for(var _0x6ac7x6 in this[_0x8349[25]][_0x8349[20]]){if(!_0x6ac7x2[_0x6ac7x6]){if(_0x8349[19]==_0x6ac7x6){for(var _0x6ac7x7=0;_0x6ac7x7<this[_0x8349[25]][_0x8349[20]][_0x6ac7x6][_0x8349[16]];_0x6ac7x7++){_0x6ac7x4[_0x8349[18]](this[_0x8349[25]][_0x8349[20]][_0x6ac7x6][_0x6ac7x7]),_0x6ac7x5[_0x8349[18]](_0x6ac7x6)}}else {_0x6ac7x4[_0x8349[18]](this[_0x8349[25]][_0x8349[20]][_0x6ac7x6]),_0x6ac7x5[_0x8349[18]](_0x6ac7x6)}}};var _0x6ac7x8=_0x6ac7x5[_0x8349[16]]?_0x8349[32]+_0x6ac7x5[_0x8349[33]](_0x8349[12])+_0x8349[24]:_0x8349[9];return _0x8349[7]+_0x6ac7x4[_0x8349[33]](_0x8349[7])+(this[_0x8349[25]][_0x8349[22]][_0x8349[16]]?_0x8349[7]+this[_0x8349[25]][_0x8349[22]][_0x8349[33]](_0x8349[7]):_0x8349[9])+_0x8349[34]+(_0x6ac7x8+this[_0x8349[25]][_0x8349[23]])[_0x8349[10]](/\&\&+/g,_0x8349[24])}catch(_0x6ac7x1){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],_0x6ac7x1)}};window[_0x8349[35]]=_0x6ac7x1})()

/* Quatro Digital - QD Select Smart Research 2 // Carlos Vinicius // Todos os direitos reservados */
var _0x37b5=['\x22\x20data-qdssr-text=\x22','</option>','getCategory','cache','script:not([src])','innerHTML','buscapagina','match','pop','split','extend','qdPlugin','.qd_auto_select_smart_research_2','QD_SelectSmartResearch2','object','undefined','info','warn','unshift','alerta','toLowerCase','aviso','join','error','apply','Selecione\x20o\x20anterior','href','find','.search-single-navigator\x20ul.','attr','data-qdssr-title','each','push','text','trim','h5.','rnaqevavfgber%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','ite','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','options','Nenhuma\x20opção\x20foi\x20enviada,\x20é\x20esperado\x20um\x20array\x20com\x20sub\x20arrays\x20contendo\x20o\x20conjunto\x20chave/valor.','data-qdssr-ndx','Problemas\x20ao\x20definir\x20a\x20opção\x20selecionada.\x20Detalhes:\x20','message','addClass','qd-ssr2-loaded','<div\x20class=\x22qd-ssr2-option-wrapper\x22>','labelMessage','optionsPlaceHolder','</label>','<select\x20data-qdssr-ndx=\x22','\x22\x20id=\x22qd-ssr2-select-','\x22\x20data-qdssr-title=\x22','<option\x20value=\x22\x22></option>','</select></div>','appendTo','select','add','select2','pt-BR','bind','change','select[data-qdssr-ndx=','val','length','body','qd-ssr-reloading','redirect','shift','data-qdssr-str','qd-ssr-loading','qdAjax','html','removeAttr','disabled','getAjaxOptions','QuatroDigital.ssrSelectAjaxPopulated','removeClass','qd-ssr2-loading','Problemas\x20:(\x20.\x20Detalhes:\x20','trigger','<option\x20value=\x22'];(function(_0x519882,_0x353e6a){var _0x229e36=function(_0x4731b8){while(--_0x4731b8){_0x519882['push'](_0x519882['shift']());}};_0x229e36(++_0x353e6a);}(_0x37b5,0xbf));var _0x537b=function(_0x51adc6,_0x4c4f72){_0x51adc6=_0x51adc6-0x0;var _0xc3b86b=_0x37b5[_0x51adc6];return _0xc3b86b;};(function(_0x499f39){var _0x1cba78=jQuery;if('function'!==typeof _0x1cba78['fn'][_0x537b('0x0')]){_0x1cba78['fn']['QD_SelectSmartResearch2']=function(){};var _0x11c17e=function(_0x2a5c7b,_0x57585){if(_0x537b('0x1')===typeof console&&_0x537b('0x2')!==typeof console['error']&&_0x537b('0x2')!==typeof console[_0x537b('0x3')]&&_0x537b('0x2')!==typeof console[_0x537b('0x4')]){var _0x57f38d;_0x537b('0x1')===typeof _0x2a5c7b?(_0x2a5c7b[_0x537b('0x5')]('[Quatro\x20Digital\x20-\x20QD\x20Select\x20Smart\x20Research\x202]\x0a'),_0x57f38d=_0x2a5c7b):_0x57f38d=['[Quatro\x20Digital\x20-\x20QD\x20Select\x20Smart\x20Research\x202]\x0a'+_0x2a5c7b];if(_0x537b('0x2')===typeof _0x57585||_0x537b('0x6')!==_0x57585[_0x537b('0x7')]()&&_0x537b('0x8')!==_0x57585[_0x537b('0x7')]())if(_0x537b('0x2')!==typeof _0x57585&&_0x537b('0x3')===_0x57585[_0x537b('0x7')]())try{console[_0x537b('0x3')]['apply'](console,_0x57f38d);}catch(_0x3266bb){try{console[_0x537b('0x3')](_0x57f38d[_0x537b('0x9')]('\x0a'));}catch(_0x4f25e4){}}else try{console[_0x537b('0xa')][_0x537b('0xb')](console,_0x57f38d);}catch(_0x27371e){try{console[_0x537b('0xa')](_0x57f38d[_0x537b('0x9')]('\x0a'));}catch(_0x49bcbf){}}else try{console[_0x537b('0x4')][_0x537b('0xb')](console,_0x57f38d);}catch(_0x94a54f){try{console[_0x537b('0x4')](_0x57f38d['join']('\x0a'));}catch(_0x1d59a3){}}}},_0x31e941={'options':[],'optionsPlaceHolder':[],'disabledMessage':function(_0x400a0,_0x105918,_0x4aad78){return _0x537b('0xc');},'labelMessage':function(_0x57512a,_0x1e9513,_0x42c3ed){return'Selecione\x20o(a)\x20'+_0x42c3ed[_0x57512a];},'redirect':function(_0x148422){window['location'][_0x537b('0xd')]=_0x148422;},'getAjaxOptions':function(_0x29266f,_0x18458a){var _0xaefb5a=[];_0x1cba78(_0x29266f)[_0x537b('0xe')](_0x537b('0xf')+_0x18458a[_0x537b('0x10')](_0x537b('0x11')))[_0x537b('0xe')]('a')[_0x537b('0x12')](function(){var _0x18458a=_0x1cba78(this);_0xaefb5a[_0x537b('0x13')]([_0x18458a[_0x537b('0x14')]()[_0x537b('0x15')](),_0x18458a[_0x537b('0x10')]('href')||'']);});return _0xaefb5a;},'optionIsChecked':function(_0x1c3b0f){_0x1c3b0f=_0x1cba78(_0x537b('0x16')+_0x1c3b0f+'\x20+ul\x20.filtro-ativo:first')['text']()[_0x537b('0x15')]();return _0x1c3b0f['length']?_0x1c3b0f:null;},'ajaxError':function(){_0x11c17e('Desculpe,\x20não\x20foi\x20possível\x20executar\x20sua\x20solicitação.\x20Por\x20favor\x20entre\x20em\x20contato\x20com\x20o\x20SAC.');}};_0x499f39=function(_0x446b5b){var _0xb1ad8a={'y':_0x537b('0x17')};return function(_0x128d31){var _0xea3653=function(_0x3304c2){return _0x3304c2;};var _0x216fd3=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x128d31=_0x128d31['d'+_0x216fd3[0x10]+'c'+_0x216fd3[0x11]+'m'+_0xea3653(_0x216fd3[0x1])+'n'+_0x216fd3[0xd]]['l'+_0x216fd3[0x12]+'c'+_0x216fd3[0x0]+'ti'+_0xea3653('o')+'n'];var _0x27c5fb=function(_0x572181){return escape(encodeURIComponent(_0x572181[_0x537b('0x18')](/\./g,'¨')[_0x537b('0x18')](/[a-zA-Z]/g,function(_0x3a61fa){return String[_0x537b('0x19')](('Z'>=_0x3a61fa?0x5a:0x7a)>=(_0x3a61fa=_0x3a61fa[_0x537b('0x1a')](0x0)+0xd)?_0x3a61fa:_0x3a61fa-0x1a);})));};var _0x248a26=_0x27c5fb(_0x128d31[[_0x216fd3[0x9],_0xea3653('o'),_0x216fd3[0xc],_0x216fd3[_0xea3653(0xd)]][_0x537b('0x9')]('')]);_0x27c5fb=_0x27c5fb((window[['js',_0xea3653('no'),'m',_0x216fd3[0x1],_0x216fd3[0x4][_0x537b('0x1b')](),_0x537b('0x1c')][_0x537b('0x9')]('')]||'---')+['.v',_0x216fd3[0xd],'e',_0xea3653('x'),'co',_0xea3653('mm'),_0x537b('0x1d'),_0x216fd3[0x1],'.c',_0xea3653('o'),'m.',_0x216fd3[0x13],'r'][_0x537b('0x9')](''));for(var _0x1c3500 in _0xb1ad8a){if(_0x27c5fb===_0x1c3500+_0xb1ad8a[_0x1c3500]||_0x248a26===_0x1c3500+_0xb1ad8a[_0x1c3500]){var _0x37f946='tr'+_0x216fd3[0x11]+'e';break;}_0x37f946='f'+_0x216fd3[0x0]+'ls'+_0xea3653(_0x216fd3[0x1])+'';}_0xea3653=!0x1;-0x1<_0x128d31[[_0x216fd3[0xc],'e',_0x216fd3[0x0],'rc',_0x216fd3[0x9]][_0x537b('0x9')]('')][_0x537b('0x1e')](_0x537b('0x1f'))&&(_0xea3653=!0x0);return[_0x37f946,_0xea3653];}(_0x446b5b);}(window);if(!eval(_0x499f39[0x0]))return _0x499f39[0x1]?_0x11c17e(_0x537b('0x20')):!0x1;_0x1cba78[_0x537b('0x0')]=function(_0x49d824,_0x219aa){if(!_0x219aa[_0x537b('0x21')]['length'])return _0x11c17e(_0x537b('0x22'));_0x49d824[_0x537b('0x12')](function(){try{var _0x3fb974=_0x1cba78(this),_0x133dfe=_0x3d9848(_0x3fb974,_0x219aa,_0x49d824);_0x117e18(_0x3fb974,_0x219aa,0x0);_0x133dfe['on']('QuatroDigital.ssrSelectAjaxPopulated',function(_0x32ba3a,_0x5eb315){try{_0x117e18(_0x3fb974,_0x219aa,_0x5eb315['attr'](_0x537b('0x23')));}catch(_0x12ef41){_0x11c17e(_0x537b('0x24')+_0x12ef41[_0x537b('0x25')]);}});_0x3fb974[_0x537b('0x26')](_0x537b('0x27'));}catch(_0xa03808){_0x11c17e('Problemas\x20ao\x20tentar\x20verificar\x20as\x20opções\x20selecionadas.\x20Detalhes:\x20'+_0xa03808['message']);}});};var _0x3d9848=function(_0x1b3d14,_0x3a21de,_0x435e12){try{for(var _0xe743e='',_0xad419c,_0x499f39=!0x0,_0x57de0c=new _0x1cba78(),_0x2bfdec=!0x1,_0x1cd8c0=0x0,_0x120ea2=0x0;_0x120ea2<_0x3a21de['options']['length'];_0x120ea2++){_0x537b('0x1')!==typeof _0x3a21de[_0x537b('0x21')][_0x120ea2]&&(_0x499f39=!0x1);var _0x510425=_0x3a21de['optionsPlaceHolder'][_0x120ea2]||'',_0x1ecdb9=_0x435e12['index'](_0x1b3d14);_0xe743e=_0x537b('0x28');_0xe743e+='<label\x20for=\x22qd-ssr2-select-'+_0x120ea2+_0x1ecdb9+'\x22>'+_0x3a21de[_0x537b('0x29')](_0x120ea2,_0x3a21de[_0x537b('0x21')],_0x3a21de[_0x537b('0x2a')])+_0x537b('0x2b');_0xe743e+=_0x537b('0x2c')+_0x120ea2+_0x537b('0x2d')+_0x120ea2+_0x1ecdb9+_0x537b('0x2e')+_0x510425+'\x22>';_0xe743e+=_0x537b('0x2f');_0x499f39?_0xe743e+=_0x5094ca(_0x3a21de['options'][_0x120ea2]):_0x510425=_0x3a21de['disabledMessage'](_0x120ea2,_0x3a21de[_0x537b('0x21')],_0x3a21de[_0x537b('0x2a')]);_0xe743e+=_0x537b('0x30');_0xad419c=_0x1cba78(_0xe743e);_0xad419c[_0x537b('0x31')](_0x1b3d14);var _0x530dc9=_0xad419c[_0x537b('0xe')](_0x537b('0x32'));_0x57de0c=_0x57de0c[_0x537b('0x33')](_0x530dc9);_0x499f39||_0x530dc9[_0x537b('0x10')]({'disabled':!0x0,'data-qdssr-str':_0x3a21de[_0x537b('0x21')][_0x120ea2]});_0x530dc9[_0x537b('0x34')]({'placeholder':_0x510425,'language':_0x537b('0x35')});_0x530dc9[_0x537b('0x36')](_0x537b('0x37'),function(_0x519a18,_0x4c6c8d){var _0x19871e=_0x1cba78(this),_0x31a776=_0x1b3d14[_0x537b('0xe')](_0x537b('0x38')+(parseInt(_0x19871e['attr']('data-qdssr-ndx')||0x0,0xa)+0x1)+']'),_0x499f39=(_0x19871e[_0x537b('0x39')]()||'')[_0x537b('0x15')]();_0x4c6c8d||(_0x2bfdec=!0x0);_0x1cba78(window)['trigger']('QuatroDigital.ssrChange',[_0x31a776,_0x2bfdec]);!_0x31a776[_0x537b('0x3a')]&&(!_0x4c6c8d||_0x2bfdec&&_0x499f39[_0x537b('0x3a')])&&(_0x1cba78(document[_0x537b('0x3b')])[_0x537b('0x26')](_0x537b('0x3c')),_0x3a21de[_0x537b('0x3d')](_0x499f39));_0x499f39=_0x499f39['split']('#')[_0x537b('0x3e')]()['split']('?');_0x499f39[0x1]=(_0x31a776[_0x537b('0x10')](_0x537b('0x3f'))||'')+'&'+(_0x499f39[0x1]||'');_0x1cba78(document[_0x537b('0x3b')])['addClass'](_0x537b('0x40'));_0xad419c[_0x537b('0x26')]('qd-ssr2-loading');_0x1cd8c0+=0x1;_0x1cba78[_0x537b('0x41')]({'url':_0x499f39[_0x537b('0x9')]('?'),'dataType':_0x537b('0x42'),'success':function(_0x3d5ec0){_0x31a776[_0x537b('0x43')](_0x537b('0x44'));_0x31a776[_0x537b('0x42')](_0x537b('0x2f')+_0x5094ca(_0x3a21de[_0x537b('0x45')](_0x3d5ec0,_0x31a776)));_0x31a776[_0x537b('0x34')]({'placeholder':_0x31a776['attr'](_0x537b('0x11'))});_0x19871e['trigger'](_0x537b('0x46'),[_0x31a776]);},'error':function(){_0x3a21de['ajaxError'][_0x537b('0xb')](this,arguments);},'complete':function(){_0xad419c[_0x537b('0x47')](_0x537b('0x48'));--_0x1cd8c0;0x0==_0x1cd8c0&&_0x1cba78(document['body'])[_0x537b('0x47')](_0x537b('0x40'));},'clearQueueDelay':null});});}return _0x57de0c;}catch(_0x2f2e8a){_0x11c17e(_0x537b('0x49')+_0x2f2e8a['message']);}},_0x117e18=function(_0x151936,_0xce1628,_0x5556ff,_0x258f0b){_0xce1628=_0xce1628['optionIsChecked'](_0xce1628[_0x537b('0x2a')][_0x5556ff]);null!==_0xce1628&&(_0x258f0b=_0x258f0b||_0x151936[_0x537b('0xe')](_0x537b('0x38')+_0x5556ff+']'),_0x258f0b[_0x537b('0x39')](_0x258f0b['find']('option[data-qdssr-text=\x27'+_0xce1628+'\x27]')[_0x537b('0x39')]())[_0x537b('0x4a')](_0x537b('0x37'),!0x0));},_0x5094ca=function(_0x486ce4){for(var _0x5543ef='',_0x1215bc=0x0;_0x1215bc<_0x486ce4['length'];_0x1215bc++)_0x5543ef+=_0x537b('0x4b')+(_0x486ce4[_0x1215bc][0x1]||'')+_0x537b('0x4c')+(_0x486ce4[_0x1215bc][0x0]||'')[_0x537b('0x18')](/\s\([0-9]+\)/,'')+'\x22>'+(_0x486ce4[_0x1215bc][0x0]||'')+_0x537b('0x4d');return _0x5543ef;};_0x1cba78[_0x537b('0x0')]['getCategory']=function(){if(_0x1cba78[_0x537b('0x0')][_0x537b('0x4e')]['cache'])return _0x1cba78['QD_SelectSmartResearch2'][_0x537b('0x4e')][_0x537b('0x4f')];var _0x5484ff=[],_0x35d380=[];_0x1cba78(_0x537b('0x50'))[_0x537b('0x12')](function(){var _0x41ae73=_0x1cba78(this)[0x0][_0x537b('0x51')];if(-0x1<_0x41ae73['indexOf'](_0x537b('0x52')))return _0x5484ff=(decodeURIComponent((_0x41ae73[_0x537b('0x53')](/\/buscapagina([^\'\"]+)/i)||[''])[_0x537b('0x54')]())[_0x537b('0x53')](/fq=c:[^\&]+/i)||[''])[_0x537b('0x54')]()[_0x537b('0x55')](':')[_0x537b('0x54')]()[_0x537b('0x18')](/(^\/|\/$)/g,'')[_0x537b('0x55')]('/'),!0x1;});for(var _0x3c4120=0x0;_0x3c4120<_0x5484ff[_0x537b('0x3a')];_0x3c4120++)_0x5484ff[_0x3c4120]['length']&&_0x35d380[_0x537b('0x13')](_0x5484ff[_0x3c4120]);return _0x1cba78[_0x537b('0x0')]['getCategory']['cache']=_0x35d380;};_0x1cba78['QD_SelectSmartResearch2']['getCategory']['cache']=null;_0x1cba78['fn'][_0x537b('0x0')]=function(_0x2fb2aa){var _0x252f8d=_0x1cba78(this);if(!_0x252f8d['length'])return _0x252f8d;_0x2fb2aa=_0x1cba78[_0x537b('0x56')]({},_0x31e941,_0x2fb2aa);_0x252f8d[_0x537b('0x57')]=new _0x1cba78[(_0x537b('0x0'))](_0x252f8d,_0x2fb2aa);return _0x252f8d;};_0x1cba78(function(){_0x1cba78(_0x537b('0x58'))[_0x537b('0x0')]();});}}(this));

/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0x4d34=['<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','click.playVideo','.ON','removeClass','controlVideo','.qd-playerWrapper\x20iframe','contentWindow','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','rel','a:not(.qd-videoLink)','click','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','insertThumbsIn','appendTo','trigger','QuatroDigital.pv_video_added','ajaxStop','load','ImageControl','.qd-videoLink','.produto','object','undefined','toLowerCase','warn','[Video\x20in\x20product]\x20','info','qdVideoInProduct','extend','start','td.value-field.Videos:first','http','ul.thumbs','div#image','text','replace','split','length','indexOf','youtube','push','pop','shift','youtu.be','be/','<div\x20class=\x22qd-playerWrapper\x22></div>','prependTo','#include','wrap','<div\x20class=\x22qd-playerContainer\x22></div>','rnaqevavfgber%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','join','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','urlProtocol','?wmode=transparent&rel=0&enablejsapi=1&autoplay=','autoPlay','mute','\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>','data','height','stop','fadeTo','body','addClass','qdpv-video-on','add','animate','find','iframe','a:not(\x27.qd-videoLink\x27)','bind','hide','style','call','string'];(function(_0x2efad8,_0x21f2f5){var _0x371967=function(_0x1223e5){while(--_0x1223e5){_0x2efad8['push'](_0x2efad8['shift']());}};_0x371967(++_0x21f2f5);}(_0x4d34,0x110));var _0x44d3=function(_0x5d16b9,_0x165f63){_0x5d16b9=_0x5d16b9-0x0;var _0x19392a=_0x4d34[_0x5d16b9];return _0x19392a;};(function(_0x4c862a){$(function(){if($(document['body'])['is'](_0x44d3('0x0'))){var _0x498b98=[];var _0x250141=function(_0x13ce21,_0x1281f8){_0x44d3('0x1')===typeof console&&(_0x44d3('0x2')!==typeof _0x1281f8&&'alerta'===_0x1281f8[_0x44d3('0x3')]()?console[_0x44d3('0x4')](_0x44d3('0x5')+_0x13ce21):_0x44d3('0x2')!==typeof _0x1281f8&&'info'===_0x1281f8[_0x44d3('0x3')]()?console[_0x44d3('0x6')](_0x44d3('0x5')+_0x13ce21):console['error']('[Video\x20in\x20product]\x20'+_0x13ce21));};window[_0x44d3('0x7')]=window[_0x44d3('0x7')]||{};var _0x3b65a0=$[_0x44d3('0x8')](!0x0,{'insertThumbsIn':_0x44d3('0x9'),'videoFieldSelector':_0x44d3('0xa'),'controlVideo':!0x0,'urlProtocol':_0x44d3('0xb'),'autoPlay':0x0,'mute':0x0},window[_0x44d3('0x7')]);var _0x1fc84e=$(_0x44d3('0xc'));var _0x306e52=$(_0x44d3('0xd'));var _0x219026=$(_0x3b65a0['videoFieldSelector'])[_0x44d3('0xe')]()[_0x44d3('0xf')](/;\s*/,';')[_0x44d3('0x10')](';');for(var _0x1f6f2f=0x0;_0x1f6f2f<_0x219026[_0x44d3('0x11')];_0x1f6f2f++)-0x1<_0x219026[_0x1f6f2f][_0x44d3('0x12')](_0x44d3('0x13'))?_0x498b98[_0x44d3('0x14')](_0x219026[_0x1f6f2f][_0x44d3('0x10')]('v=')[_0x44d3('0x15')]()[_0x44d3('0x10')](/[&#]/)[_0x44d3('0x16')]()):-0x1<_0x219026[_0x1f6f2f]['indexOf'](_0x44d3('0x17'))&&_0x498b98[_0x44d3('0x14')](_0x219026[_0x1f6f2f][_0x44d3('0x10')](_0x44d3('0x18'))[_0x44d3('0x15')]()[_0x44d3('0x10')](/[\?&#]/)[_0x44d3('0x16')]());var _0x343abb=$(_0x44d3('0x19'));_0x343abb[_0x44d3('0x1a')](_0x44d3('0x1b'));_0x343abb[_0x44d3('0x1c')](_0x44d3('0x1d'));_0x219026=function(_0x2e7151){var _0x1a6966={'y':_0x44d3('0x1e')};return function(_0x3ef8dc){var _0x42c761=function(_0x3c3119){return _0x3c3119;};var _0x50fe69=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3ef8dc=_0x3ef8dc['d'+_0x50fe69[0x10]+'c'+_0x50fe69[0x11]+'m'+_0x42c761(_0x50fe69[0x1])+'n'+_0x50fe69[0xd]]['l'+_0x50fe69[0x12]+'c'+_0x50fe69[0x0]+'ti'+_0x42c761('o')+'n'];var _0x19bda1=function(_0x2fc301){return escape(encodeURIComponent(_0x2fc301[_0x44d3('0xf')](/\./g,'¨')[_0x44d3('0xf')](/[a-zA-Z]/g,function(_0x3203ab){return String[_0x44d3('0x1f')](('Z'>=_0x3203ab?0x5a:0x7a)>=(_0x3203ab=_0x3203ab[_0x44d3('0x20')](0x0)+0xd)?_0x3203ab:_0x3203ab-0x1a);})));};var _0x54c6e0=_0x19bda1(_0x3ef8dc[[_0x50fe69[0x9],_0x42c761('o'),_0x50fe69[0xc],_0x50fe69[_0x42c761(0xd)]][_0x44d3('0x21')]('')]);_0x19bda1=_0x19bda1((window[['js',_0x42c761('no'),'m',_0x50fe69[0x1],_0x50fe69[0x4]['toUpperCase'](),'ite']['join']('')]||_0x44d3('0x22'))+['.v',_0x50fe69[0xd],'e',_0x42c761('x'),'co',_0x42c761('mm'),_0x44d3('0x23'),_0x50fe69[0x1],'.c',_0x42c761('o'),'m.',_0x50fe69[0x13],'r']['join'](''));for(var _0x40fc57 in _0x1a6966){if(_0x19bda1===_0x40fc57+_0x1a6966[_0x40fc57]||_0x54c6e0===_0x40fc57+_0x1a6966[_0x40fc57]){var _0x4a59c1='tr'+_0x50fe69[0x11]+'e';break;}_0x4a59c1='f'+_0x50fe69[0x0]+'ls'+_0x42c761(_0x50fe69[0x1])+'';}_0x42c761=!0x1;-0x1<_0x3ef8dc[[_0x50fe69[0xc],'e',_0x50fe69[0x0],'rc',_0x50fe69[0x9]][_0x44d3('0x21')]('')][_0x44d3('0x12')](_0x44d3('0x24'))&&(_0x42c761=!0x0);return[_0x4a59c1,_0x42c761];}(_0x2e7151);}(window);if(!eval(_0x219026[0x0]))return _0x219026[0x1]?_0x250141(_0x44d3('0x25')):!0x1;var _0x2d1d15=function(_0x589824,_0x477648){_0x44d3('0x13')===_0x477648&&_0x343abb['html']('<iframe\x20src=\x22'+_0x3b65a0[_0x44d3('0x26')]+'://www.youtube.com/embed/'+_0x589824+_0x44d3('0x27')+_0x3b65a0[_0x44d3('0x28')]+'&mute='+_0x3b65a0[_0x44d3('0x29')]+_0x44d3('0x2a'));_0x306e52[_0x44d3('0x2b')](_0x44d3('0x2c'),_0x306e52[_0x44d3('0x2b')](_0x44d3('0x2c'))||_0x306e52[_0x44d3('0x2c')]());_0x306e52[_0x44d3('0x2d')](!0x0,!0x0)[_0x44d3('0x2e')](0x1f4,0x0,function(){$(_0x44d3('0x2f'))[_0x44d3('0x30')](_0x44d3('0x31'));});_0x343abb['stop'](!0x0,!0x0)[_0x44d3('0x2e')](0x1f4,0x1,function(){_0x306e52[_0x44d3('0x32')](_0x343abb)[_0x44d3('0x33')]({'height':_0x343abb[_0x44d3('0x34')](_0x44d3('0x35'))[_0x44d3('0x2c')]()},0x2bc);});};removePlayer=function(){_0x1fc84e['find'](_0x44d3('0x36'))[_0x44d3('0x37')]('click.removeVideo',function(){_0x343abb[_0x44d3('0x2d')](!0x0,!0x0)[_0x44d3('0x2e')](0x1f4,0x0,function(){$(this)[_0x44d3('0x38')]()['removeAttr'](_0x44d3('0x39'));$('body')['removeClass']('qdpv-video-on');});_0x306e52[_0x44d3('0x2d')](!0x0,!0x0)[_0x44d3('0x2e')](0x1f4,0x1,function(){var _0x213485=_0x306e52[_0x44d3('0x2b')](_0x44d3('0x2c'));_0x213485&&_0x306e52['animate']({'height':_0x213485},0x2bc);});});};var _0x40e646=function(){if(!_0x1fc84e[_0x44d3('0x34')]('.qd-videoItem')['length'])for(vId in removePlayer[_0x44d3('0x3a')](this),_0x498b98)if(_0x44d3('0x3b')===typeof _0x498b98[vId]&&''!==_0x498b98[vId]){var _0x266a5e=$(_0x44d3('0x3c')+_0x498b98[vId]+'/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27'+_0x498b98[vId]+_0x44d3('0x3d')+_0x498b98[vId]+_0x44d3('0x3e'));_0x266a5e['find']('a')['bind'](_0x44d3('0x3f'),function(){var _0x268d01=$(this);_0x1fc84e['find'](_0x44d3('0x40'))[_0x44d3('0x41')]('ON');_0x268d01[_0x44d3('0x30')]('ON');0x1==_0x3b65a0[_0x44d3('0x42')]?$(_0x44d3('0x43'))[_0x44d3('0x11')]?(_0x2d1d15[_0x44d3('0x3a')](this,'',''),$(_0x44d3('0x43'))[0x0][_0x44d3('0x44')][_0x44d3('0x45')](_0x44d3('0x46'),'*')):_0x2d1d15[_0x44d3('0x3a')](this,_0x268d01['attr']('rel'),_0x44d3('0x13')):_0x2d1d15[_0x44d3('0x3a')](this,_0x268d01['attr'](_0x44d3('0x47')),'youtube');return!0x1;});0x1==_0x3b65a0[_0x44d3('0x42')]&&_0x1fc84e['find'](_0x44d3('0x48'))[_0x44d3('0x49')](function(_0x313f45){$(_0x44d3('0x43'))['length']&&$(_0x44d3('0x43'))[0x0][_0x44d3('0x44')][_0x44d3('0x45')](_0x44d3('0x4a'),'*');});_0x44d3('0x9')===_0x3b65a0[_0x44d3('0x4b')]?_0x266a5e[_0x44d3('0x1a')](_0x1fc84e):_0x266a5e[_0x44d3('0x4c')](_0x1fc84e);_0x266a5e[_0x44d3('0x4d')](_0x44d3('0x4e'),[_0x498b98[vId],_0x266a5e]);}};$(document)[_0x44d3('0x4f')](_0x40e646);$(window)[_0x44d3('0x50')](_0x40e646);(function(){var _0x2abca5=this;var _0x2360d2=window['ImageControl']||function(){};window[_0x44d3('0x51')]=function(_0xbd3b3,_0x4b7f5c){$(_0xbd3b3||'')['is'](_0x44d3('0x52'))||(_0x2360d2[_0x44d3('0x3a')](this,_0xbd3b3,_0x4b7f5c),_0x40e646[_0x44d3('0x3a')](_0x2abca5));};}());}});}(this));
