/**
* Funções base
*/
"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});
"function"!==typeof String.prototype.replaceSpecialChars&&(String.prototype.replaceSpecialChars=function(){var b={"\u00e7":"c","\u00e6":"ae","\u0153":"oe","\u00e1":"a","\u00e9":"e","\u00ed":"i","\u00f3":"o","\u00fa":"u","\u00e0":"a","\u00e8":"e","\u00ec":"i","\u00f2":"o","\u00f9":"u","\u00e4":"a","\u00eb":"e","\u00ef":"i","\u00f6":"o","\u00fc":"u","\u00ff":"y","\u00e2":"a","\u00ea":"e","\u00ee":"i","\u00f4":"o","\u00fb":"u","\u00e5":"a","\u00e3":"a","\u00f8":"o","\u00f5":"o",u:"u","\u00c1":"A","\u00c9":"E", "\u00cd":"I","\u00d3":"O","\u00da":"U","\u00ca":"E","\u00d4":"O","\u00dc":"U","\u00c3":"A","\u00d5":"O","\u00c0":"A","\u00c7":"C"};return this.replace(/[\u00e0-\u00fa]/ig,function(a){return"undefined"!=typeof b[a]?b[a]:a})});
Array.prototype.indexOf||(Array.prototype.indexOf=function(d,e){var a;if(null==this)throw new TypeError('"this" is null or not defined');var c=Object(this),b=c.length>>>0;if(0===b)return-1;a=+e||0;Infinity===Math.abs(a)&&(a=0);if(a>=b)return-1;for(a=Math.max(0<=a?a:b-Math.abs(a),0);a<b;){if(a in c&&c[a]===d)return a;a++}return-1});

try {
	var Common = {
		cities : {
			porto_seguro : {
				title: 'Porto Seguro',
				cat: 30
			},
			florianopolis : {
				title: 'Florianópolis',
				cat: 22
			},
		},
		run: function() {},
		init: function() {
			Common.applyAmazingMenu();
			Common.applyAmazingMenuMobile();
			Common.bannerResponsive();
			Common.bannersCount();
			Common.callCartLinkShow();
			Common.floatBarMiniCart();
			Common.applyCarouselShelf();
			Common.applySmartCart();
			//Common.smartQuantityShelf();

			Common.openModalVideoInstitutional();
			Common.applyTripClusters();
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
		applyAmazingMenu: function () {
			$('.header-qd-v1-amazing-menu, .footer-qd-v1-menu-list').QD_amazingMenu();
			
			$(".floating-qd-v1-call-amazing-menu").click(function () {
				$("body").toggleClass('qd-am-toggle');
			});
		},
		applyAmazingMenuMobile: function () {
			var wrapper = $('.header-qd-v1-amazing-menu-mobile');

			wrapper.find('> ul > li > ul').prepend(function () { return $(this).prev().clone().wrap('<li></li>').parent() });

			wrapper.QD_amazingMenu({
				callback: function () {
					$('<span class="qd-am-dropdown-trigger"><i class="fa fa-angle-down"></i></span>').appendTo(wrapper.find('.qd-am-has-ul')).click(function () {
						var $t = $(this);
						$.merge($t.parent(), $t.closest('ul')).toggleClass('qd-am-is-active');

						$t.filter(function () { return !$(this).closest('ul').is('.qd-amazing-menu'); }).siblings('ul').stop(true, true).slideToggle();
					});

					wrapper.find('> ul > li > .qd-am-dropdown-trigger').click(function () {
						var w = $('.header-qd-v1-amazing-menu-mobile-wrapper');
						w.addClass('qd-am-is-active');
						w.animate({ scrollTop: 0 }, 200);
					});

					wrapper.find('> ul > li > ul > li:first-child').click(function (e) {
						e.preventDefault();
						$(this).parents(".qd-am-is-active").removeClass('qd-am-is-active');
					});
				}
			});

			$('.header-qd-v1-amazing-menu-toggle').click(function (evt) {
				evt.preventDefault();
				$(document.body).toggleClass('qd-am-on');
			});

			$('.header-qd-v1-amazing-menu-mobile-wrapper .header-qd-v1-user-message').on('click', 'a#login', function () {
				$(document.body).removeClass('qd-am-on');
			});

			$('.header-qd-v1-amazing-menu-mobile-wrapper .header-qd-v1-user-message').append('<div class="header-qd-v1-close-amazing-menu-mobile"></div>');

			$('.header-qd-v1-close-amazing-menu-mobile').click(function (evt) {
				$(document.body).removeClass('qd-am-on');
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
			$(".footer-qd-v1-facebook-likebox").html('<div class="fb-page" data-href="https://www.facebook.com/FormaTurismo" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/">Forma Turismo</a></blockquote></div></div>');
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
		applySmartCart: function () {
			$('.header-qd-v1-cart-link').append('<div class="smart-cart-qd-v1-wrapper"><div class="qd-sc-wrapper"></div></div>');

			$(document.body).append('<div class="smart-cart-qd-v2-wrapper"><div class="qd-sc-wrapper"></div></div>');

			var wrapper = $(".qd-sc-wrapper");
			var wrapper = $(".qd-sc-wrapper");

			$.QD_smartCart({
				selector: wrapper,
				dropDown: {
					texts: {
						linkCart: "Finalizar Compra",
						cartTotal: '<span class="qd-infoTotalItems">Itens: #items</span><span class="qd-infoTotalValue">Total: #value</span>'
					},
					updateOnlyHover: false,
					smartCheckout: true,
					callback: function () {
						$(".qd-ddc-wrapper3").prepend('<div class="qd-cartTitle"><h3>Carrinho</h3></div>');
						wrapper.find('.qd_ddc_continueShopping').after(wrapper.find('.qd-ddc-viewCart'));
					},
					skuName: function (data) {
						return data.name + ' - ' + data.skuName.replace(data.name, '');
					},
					callbackProductsList: function () {
						wrapper.find(".qd-ddc-prodQtt").each(function () {
							var $t = $(this);
							$t.add($t.next('.qd-ddc-prodRemove')).wrapAll('<div class="qd-ddc-prodAction"></div>');
						});
					}
				}
			});

			// Callback do Quick View
			window._QuatroDigital_prodBuyCallback = function (jqXHR, textStatus, prodLink, skus) {
				$.fn.simpleCart(true);
				$(".shelf-qd-v1-buy-button-modal").modal("hide");
				$(window).trigger("QuatroDigital.qd_bb_prod_add", [new $, skus[0] || 0]);
			};

			$(".header-qd-v1-cart-link").click(function (evt) {
				console.log("clique do smart cart");
				evt.preventDefault();
				$(document.body).toggleClass('qd-cart-show');

				wrapper.height($(window).height());
				wrapper.find(".qd-ddc-prodWrapper").css('max-height', $(window).height() - 193);
			});

			$(".components-qd-v1-overlay, .qd_ddc_lightBoxClose").click(function (evt) {
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
		},
		applyTripClusters: function() {
			var queryParams = window.location.search;
			var email = queryParams.match(/ue=([^&]+)/);
			try {
				if(email)
					Common.getTripClusters(email[1]);
			}
			catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: ", e)); }
		},
		getTripClusters: function(email) {
			var url = 'https://api.vtex.com/formaturismo/dataentities/CL/search?_fields=tripCluster&email=' + email;
			$.qdAjax({
				url: url,
				success: function(data) {
					if(!data.length)
						return;

					try {
						var trips = data[0].tripCluster.split(',');
						for (var i = 0; i < trips.length; i++) {
							Common.getCustomElement(trips[i]);
						}
					}
					catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: ", e)); }
		
				}
			});
		},
		getCustomElement: function(trip) {
			var tripData = Common.cities[trip];
			var shelfUrl = window.location.protocol + '//' + window.location.host + '/buscapagina?';
			var params = 'PS=6&sl=95a85ba8-29f6-44d6-b571-21bf5b400bf7&cc=1&sm=0&fq=C:' + tripData.cat;
			$.qdAjax({
				url: shelfUrl + params,
				success: function(data) {
					if(!data.length)
						return;

					var shelfTitle =  '<h2 class="heading-1">' + tripData.title + '</h2>';
					var wrapper = $('<div class="container">' + shelfTitle + '<div class="shelf-qd-v1-carousel qd-shelf-xs-12 qd-shelf-sm-6 qd-shelf-md-3 clearfix"></div></div>');
					wrapper.find('.shelf-qd-v1-carousel').append($(data)[1]);
					$('.tip-bar-qd-v1-full').last().after(wrapper);

					wrapper.find('.prateleira').owlCarousel({
						items: 4,
						navigation: true,
						pagination: false
					});
					
				}
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
			//Home.instagramPhotoFeed();
			//Home.selectSmartResearch2();			
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		bannerSlider: function () {
			$('.slider-qd-v1-full').slick({
				prevArrow: '<button type="button" class="slick-prev" title="Anterior"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next" title="Próximo"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				autoplay: true,
				autoplaySpeed: 7000,
				dots: true,
				fade: true,
				draggable: false,
				cssEase: 'linear',
				responsive: [
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 1
						}
					}
				]
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
			$('.home-qd-v1-instagram-photos').QD_socialPhotos('???', {
				socialType: 'instagram',
				user: 'quatrodigital',
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
				items: 6,
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
			Product.setAvailableBodyClass();
			//Common.smartQuantityShelf();
		},
		ajaxStop: function () {
			Product.addCloseBtnFreightTable();
		},
		windowOnload: function () {},
		qdNotifymeShow: function() {
			var notifyWrapper = $(".portal-notify-me-ref");

			var checkVisibleNotify = function(data) {
				if (data.availability || data.available){
					notifyWrapper.parent().parent().attr('col-xs-12');
					$(document.body).removeClass('notify-active');
				}
				else {
					notifyWrapper.parent().parent().attr('col-xs-12');
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

/* Quatro Digital - jQuery Ajax Queue // 4.0 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT <http://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT> */
(function(d){if("function"!==typeof d.qdAjax){var a={};d.qdAjaxQueue=a;150>parseInt((d.fn.jquery.replace(/[^0-9]+/g,"")+"000").slice(0,3),10)&&console&&"function"==typeof console.error&&console.error();d.qdAjax=function(f){try{var b=d.extend({},{url:"",type:"GET",data:"",success:function(){},error:function(){},complete:function(){},clearQueueDelay:5},f),e;e="object"===typeof b.data?JSON.stringify(b.data):b.data.toString();var c=encodeURIComponent(b.url+"|"+b.type+"|"+e);a[c]=a[c]||{};"undefined"==
typeof a[c].jqXHR?a[c].jqXHR=d.ajax(b):(a[c].jqXHR.done(b.success),a[c].jqXHR.fail(b.error),a[c].jqXHR.always(b.complete));a[c].jqXHR.always(function(){isNaN(parseInt(b.clearQueueDelay))||setTimeout(function(){a[c].jqXHR=void 0},b.clearQueueDelay)});return a[c].jqXHR}catch(g){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Problemas no $.qdAjax :( . Detalhes: "+g.message)}};d.qdAjax.version="4.0"}})(jQuery);

/* * Javascript Cookie v1.5.1 * https://github.com/js-cookie/js-cookie * * Copyright 2006, 2014 Klaus Hartl * Released under the MIT license */
(function(e){var l;if("function"===typeof define&&define.amd)define(["jquery"],e);else if("object"===typeof exports){try{l=require("jquery")}catch(n){}module.exports=e(l)}else{var m=window.Cookies,h=window.Cookies=e(window.jQuery);h.noConflict=function(){window.Cookies=m;return h}}})(function(e){function l(a){a=c.json?JSON.stringify(a):String(a);return c.raw?a:encodeURIComponent(a)}function n(a,r){var b;if(c.raw)b=a;else a:{var d=a;0===d.indexOf('"')&&(d=d.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g, "\\"));try{d=decodeURIComponent(d.replace(p," "));b=c.json?JSON.parse(d):d;break a}catch(e){}b=void 0}return h(r)?r(b):b}function m(){for(var a,c,b=0,d={};b<arguments.length;b++)for(a in c=arguments[b],c)d[a]=c[a];return d}function h(a){return"[object Function]"===Object.prototype.toString.call(a)}var p=/\+/g,c=function(a,e,b){if(1<arguments.length&&!h(e)){b=m(c.defaults,b);if("number"===typeof b.expires){var d=b.expires,k=b.expires=new Date;k.setMilliseconds(k.getMilliseconds()+864E5*d)}return document.cookie= [c.raw?a:encodeURIComponent(a),"=",l(e),b.expires?"; expires="+b.expires.toUTCString():"",b.path?"; path="+b.path:"",b.domain?"; domain="+b.domain:"",b.secure?"; secure":""].join("")}for(var d=a?void 0:{},k=document.cookie?document.cookie.split("; "):[],q=0,p=k.length;q<p;q++){var f=k[q].split("="),g;g=f.shift();g=c.raw?g:decodeURIComponent(g);f=f.join("=");if(a===g){d=n(f,e);break}a||void 0===(f=n(f))||(d[g]=f)}return d};c.get=c.set=c;c.defaults={};c.remove=function(a,e){c(a,"",m(e,{expires:-1})); return!c(a)};e&&(e.cookie=c,e.removeCookie=c.remove);return c});
var $Cookies = Cookies.noConflict();
/*PHP JS - Number Format - http://phpjs.org/functions/number_format/*/
function qd_number_format(b,c,d,e){b=(b+"").replace(/[^0-9+\-Ee.]/g,"");b=isFinite(+b)?+b:0;c=isFinite(+c)?Math.abs(c):0;e="undefined"===typeof e?",":e;d="undefined"===typeof d?".":d;var a="",a=function(a,b){var c=Math.pow(10,b);return""+(Math.round(a*c)/c).toFixed(b)},a=(c?a(b,c):""+Math.round(b)).split(".");3<a[0].length&&(a[0]=a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,e));(a[1]||"").length<c&&(a[1]=a[1]||"",a[1]+=Array(c-a[1].length+1).join("0"));return a.join(d)};

/* $("a").getParent("ul"); // 3 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT */
(function(a){a.fn.getParent=a.fn.closest})(jQuery);

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

// Owl Carousel
"function"!==typeof Object.create&&(Object.create=function(f){function g(){}g.prototype=f;return new g}); (function(f,g,k){var l={init:function(a,b){this.$elem=f(b);this.options=f.extend({},f.fn.owlCarousel.options,this.$elem.data(),a);this.userOptions=a;this.loadContent()},loadContent:function(){function a(a){var d,e="";if("function"===typeof b.options.jsonSuccess)b.options.jsonSuccess.apply(this,[a]);else{for(d in a.owl)a.owl.hasOwnProperty(d)&&(e+=a.owl[d].item);b.$elem.html(e)}b.logIn()}var b=this,e;"function"===typeof b.options.beforeInit&&b.options.beforeInit.apply(this,[b.$elem]);"string"===typeof b.options.jsonPath? (e=b.options.jsonPath,f.getJSON(e,a)):b.logIn()},logIn:function(){this.$elem.data("owl-originalStyles",this.$elem.attr("style"));this.$elem.data("owl-originalClasses",this.$elem.attr("class"));this.$elem.css({opacity:0});this.orignalItems=this.options.items;this.checkBrowser();this.wrapperWidth=0;this.checkVisible=null;this.setVars()},setVars:function(){if(0===this.$elem.children().length)return!1;this.baseClass();this.eventTypes();this.$userItems=this.$elem.children();this.itemsAmount=this.$userItems.length; this.wrapItems();this.$owlItems=this.$elem.find(".owl-item");this.$owlWrapper=this.$elem.find(".owl-wrapper");this.playDirection="next";this.prevItem=0;this.prevArr=[0];this.currentItem=0;this.customEvents();this.onStartup()},onStartup:function(){this.updateItems();this.calculateAll();this.buildControls();this.updateControls();this.response();this.moveEvents();this.stopOnHover();this.owlStatus();!1!==this.options.transitionStyle&&this.transitionTypes(this.options.transitionStyle);!0===this.options.autoPlay&& (this.options.autoPlay=5E3);this.play();this.$elem.find(".owl-wrapper").css("display","block");this.$elem.is(":visible")?this.$elem.css("opacity",1):this.watchVisibility();this.onstartup=!1;this.eachMoveUpdate();"function"===typeof this.options.afterInit&&this.options.afterInit.apply(this,[this.$elem])},eachMoveUpdate:function(){!0===this.options.lazyLoad&&this.lazyLoad();!0===this.options.autoHeight&&this.autoHeight();this.onVisibleItems();"function"===typeof this.options.afterAction&&this.options.afterAction.apply(this, [this.$elem])},updateVars:function(){"function"===typeof this.options.beforeUpdate&&this.options.beforeUpdate.apply(this,[this.$elem]);this.watchVisibility();this.updateItems();this.calculateAll();this.updatePosition();this.updateControls();this.eachMoveUpdate();"function"===typeof this.options.afterUpdate&&this.options.afterUpdate.apply(this,[this.$elem])},reload:function(){var a=this;g.setTimeout(function(){a.updateVars()},0)},watchVisibility:function(){var a=this;if(!1===a.$elem.is(":visible"))a.$elem.css({opacity:0}), g.clearInterval(a.autoPlayInterval),g.clearInterval(a.checkVisible);else return!1;a.checkVisible=g.setInterval(function(){a.$elem.is(":visible")&&(a.reload(),a.$elem.animate({opacity:1},200),g.clearInterval(a.checkVisible))},500)},wrapItems:function(){this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>');this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">');this.wrapperOuter=this.$elem.find(".owl-wrapper-outer");this.$elem.css("display","block")}, baseClass:function(){var a=this.$elem.hasClass(this.options.baseClass),b=this.$elem.hasClass(this.options.theme);a||this.$elem.addClass(this.options.baseClass);b||this.$elem.addClass(this.options.theme)},updateItems:function(){var a,b;if(!1===this.options.responsive)return!1;if(!0===this.options.singleItem)return this.options.items=this.orignalItems=1,this.options.itemsCustom=!1,this.options.itemsDesktop=!1,this.options.itemsDesktopSmall=!1,this.options.itemsTablet=!1,this.options.itemsTabletSmall= !1,this.options.itemsMobile=!1;a=f(this.options.responsiveBaseWidth).width();a>(this.options.itemsDesktop[0]||this.orignalItems)&&(this.options.items=this.orignalItems);if(!1!==this.options.itemsCustom)for(this.options.itemsCustom.sort(function(a,b){return a[0]-b[0]}),b=0;b<this.options.itemsCustom.length;b+=1)this.options.itemsCustom[b][0]<=a&&(this.options.items=this.options.itemsCustom[b][1]);else a<=this.options.itemsDesktop[0]&&!1!==this.options.itemsDesktop&&(this.options.items=this.options.itemsDesktop[1]), a<=this.options.itemsDesktopSmall[0]&&!1!==this.options.itemsDesktopSmall&&(this.options.items=this.options.itemsDesktopSmall[1]),a<=this.options.itemsTablet[0]&&!1!==this.options.itemsTablet&&(this.options.items=this.options.itemsTablet[1]),a<=this.options.itemsTabletSmall[0]&&!1!==this.options.itemsTabletSmall&&(this.options.items=this.options.itemsTabletSmall[1]),a<=this.options.itemsMobile[0]&&!1!==this.options.itemsMobile&&(this.options.items=this.options.itemsMobile[1]);this.options.items>this.itemsAmount&& !0===this.options.itemsScaleUp&&(this.options.items=this.itemsAmount)},response:function(){var a=this,b,e;if(!0!==a.options.responsive)return!1;e=f(g).width();a.resizer=function(){f(g).width()!==e&&(!1!==a.options.autoPlay&&g.clearInterval(a.autoPlayInterval),g.clearTimeout(b),b=g.setTimeout(function(){e=f(g).width();a.updateVars()},a.options.responsiveRefreshRate))};f(g).resize(a.resizer)},updatePosition:function(){this.jumpTo(this.currentItem);!1!==this.options.autoPlay&&this.checkAp()},appendItemsSizes:function(){var a= this,b=0,e=a.itemsAmount-a.options.items;a.$owlItems.each(function(c){var d=f(this);d.css({width:a.itemWidth}).data("owl-item",Number(c));if(0===c%a.options.items||c===e)c>e||(b+=1);d.data("owl-roundPages",b)})},appendWrapperSizes:function(){this.$owlWrapper.css({width:this.$owlItems.length*this.itemWidth*2,left:0});this.appendItemsSizes()},calculateAll:function(){this.calculateWidth();this.appendWrapperSizes();this.loops();this.max()},calculateWidth:function(){this.itemWidth=Math.round(this.$elem.width()/ this.options.items)},max:function(){var a=-1*(this.itemsAmount*this.itemWidth-this.options.items*this.itemWidth);this.options.items>this.itemsAmount?this.maximumPixels=a=this.maximumItem=0:(this.maximumItem=this.itemsAmount-this.options.items,this.maximumPixels=a);return a},min:function(){return 0},loops:function(){var a=0,b=0,e,c;this.positionsInArray=[0];this.pagesInArray=[];for(e=0;e<this.itemsAmount;e+=1)b+=this.itemWidth,this.positionsInArray.push(-b),!0===this.options.scrollPerPage&&(c=f(this.$owlItems[e]), c=c.data("owl-roundPages"),c!==a&&(this.pagesInArray[a]=this.positionsInArray[e],a=c))},buildControls:function(){if(!0===this.options.navigation||!0===this.options.pagination)this.owlControls=f('<div class="owl-controls"/>').toggleClass("clickable",!this.browser.isTouch).appendTo(this.$elem);!0===this.options.pagination&&this.buildPagination();!0===this.options.navigation&&this.buildButtons()},buildButtons:function(){var a=this,b=f('<div class="owl-buttons"/>');a.owlControls.append(b);a.buttonPrev= f("<div/>",{"class":"owl-prev",html:a.options.navigationText[0]||""});a.buttonNext=f("<div/>",{"class":"owl-next",html:a.options.navigationText[1]||""});b.append(a.buttonPrev).append(a.buttonNext);b.on("touchstart.owlControls mousedown.owlControls",'div[class^="owl"]',function(a){a.preventDefault()});b.on("touchend.owlControls mouseup.owlControls",'div[class^="owl"]',function(b){b.preventDefault();f(this).hasClass("owl-next")?a.next():a.prev()})},buildPagination:function(){var a=this;a.paginationWrapper= f('<div class="owl-pagination"/>');a.owlControls.append(a.paginationWrapper);a.paginationWrapper.on("touchend.owlControls mouseup.owlControls",".owl-page",function(b){b.preventDefault();Number(f(this).data("owl-page"))!==a.currentItem&&a.goTo(Number(f(this).data("owl-page")),!0)})},updatePagination:function(){var a,b,e,c,d,g;if(!1===this.options.pagination)return!1;this.paginationWrapper.html("");a=0;b=this.itemsAmount-this.itemsAmount%this.options.items;for(c=0;c<this.itemsAmount;c+=1)0===c%this.options.items&& (a+=1,b===c&&(e=this.itemsAmount-this.options.items),d=f("<div/>",{"class":"owl-page"}),g=f("<span></span>",{text:!0===this.options.paginationNumbers?a:"","class":!0===this.options.paginationNumbers?"owl-numbers":""}),d.append(g),d.data("owl-page",b===c?e:c),d.data("owl-roundPages",a),this.paginationWrapper.append(d));this.checkPagination()},checkPagination:function(){var a=this;if(!1===a.options.pagination)return!1;a.paginationWrapper.find(".owl-page").each(function(){f(this).data("owl-roundPages")=== f(a.$owlItems[a.currentItem]).data("owl-roundPages")&&(a.paginationWrapper.find(".owl-page").removeClass("active"),f(this).addClass("active"))})},checkNavigation:function(){if(!1===this.options.navigation)return!1;!1===this.options.rewindNav&&(0===this.currentItem&&0===this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.addClass("disabled")):0===this.currentItem&&0!==this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.removeClass("disabled")):this.currentItem=== this.maximumItem?(this.buttonPrev.removeClass("disabled"),this.buttonNext.addClass("disabled")):0!==this.currentItem&&this.currentItem!==this.maximumItem&&(this.buttonPrev.removeClass("disabled"),this.buttonNext.removeClass("disabled")))},updateControls:function(){this.updatePagination();this.checkNavigation();this.owlControls&&(this.options.items>=this.itemsAmount?this.owlControls.hide():this.owlControls.show())},destroyControls:function(){this.owlControls&&this.owlControls.remove()},next:function(a){if(this.isTransition)return!1; this.currentItem+=!0===this.options.scrollPerPage?this.options.items:1;if(this.currentItem>this.maximumItem+(!0===this.options.scrollPerPage?this.options.items-1:0))if(!0===this.options.rewindNav)this.currentItem=0,a="rewind";else return this.currentItem=this.maximumItem,!1;this.goTo(this.currentItem,a)},prev:function(a){if(this.isTransition)return!1;this.currentItem=!0===this.options.scrollPerPage&&0<this.currentItem&&this.currentItem<this.options.items?0:this.currentItem-(!0===this.options.scrollPerPage? this.options.items:1);if(0>this.currentItem)if(!0===this.options.rewindNav)this.currentItem=this.maximumItem,a="rewind";else return this.currentItem=0,!1;this.goTo(this.currentItem,a)},goTo:function(a,b,e){var c=this;if(c.isTransition)return!1;"function"===typeof c.options.beforeMove&&c.options.beforeMove.apply(this,[c.$elem]);a>=c.maximumItem?a=c.maximumItem:0>=a&&(a=0);c.currentItem=c.owl.currentItem=a;if(!1!==c.options.transitionStyle&&"drag"!==e&&1===c.options.items&&!0===c.browser.support3d)return c.swapSpeed(0), !0===c.browser.support3d?c.transition3d(c.positionsInArray[a]):c.css2slide(c.positionsInArray[a],1),c.afterGo(),c.singleItemTransition(),!1;a=c.positionsInArray[a];!0===c.browser.support3d?(c.isCss3Finish=!1,!0===b?(c.swapSpeed("paginationSpeed"),g.setTimeout(function(){c.isCss3Finish=!0},c.options.paginationSpeed)):"rewind"===b?(c.swapSpeed(c.options.rewindSpeed),g.setTimeout(function(){c.isCss3Finish=!0},c.options.rewindSpeed)):(c.swapSpeed("slideSpeed"),g.setTimeout(function(){c.isCss3Finish=!0}, c.options.slideSpeed)),c.transition3d(a)):!0===b?c.css2slide(a,c.options.paginationSpeed):"rewind"===b?c.css2slide(a,c.options.rewindSpeed):c.css2slide(a,c.options.slideSpeed);c.afterGo()},jumpTo:function(a){"function"===typeof this.options.beforeMove&&this.options.beforeMove.apply(this,[this.$elem]);a>=this.maximumItem||-1===a?a=this.maximumItem:0>=a&&(a=0);this.swapSpeed(0);!0===this.browser.support3d?this.transition3d(this.positionsInArray[a]):this.css2slide(this.positionsInArray[a],1);this.currentItem= this.owl.currentItem=a;this.afterGo()},afterGo:function(){this.prevArr.push(this.currentItem);this.prevItem=this.owl.prevItem=this.prevArr[this.prevArr.length-2];this.prevArr.shift(0);this.prevItem!==this.currentItem&&(this.checkPagination(),this.checkNavigation(),this.eachMoveUpdate(),!1!==this.options.autoPlay&&this.checkAp());"function"===typeof this.options.afterMove&&this.prevItem!==this.currentItem&&this.options.afterMove.apply(this,[this.$elem])},stop:function(){this.apStatus="stop";g.clearInterval(this.autoPlayInterval)}, checkAp:function(){"stop"!==this.apStatus&&this.play()},play:function(){var a=this;a.apStatus="play";if(!1===a.options.autoPlay)return!1;g.clearInterval(a.autoPlayInterval);a.autoPlayInterval=g.setInterval(function(){a.next(!0)},a.options.autoPlay)},swapSpeed:function(a){"slideSpeed"===a?this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)):"paginationSpeed"===a?this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)):"string"!==typeof a&&this.$owlWrapper.css(this.addCssSpeed(a))}, addCssSpeed:function(a){return{"-webkit-transition":"all "+a+"ms ease","-moz-transition":"all "+a+"ms ease","-o-transition":"all "+a+"ms ease",transition:"all "+a+"ms ease"}},removeTransition:function(){return{"-webkit-transition":"","-moz-transition":"","-o-transition":"",transition:""}},doTranslate:function(a){return{"-webkit-transform":"translate3d("+a+"px, 0px, 0px)","-moz-transform":"translate3d("+a+"px, 0px, 0px)","-o-transform":"translate3d("+a+"px, 0px, 0px)","-ms-transform":"translate3d("+ a+"px, 0px, 0px)",transform:"translate3d("+a+"px, 0px,0px)"}},transition3d:function(a){this.$owlWrapper.css(this.doTranslate(a))},css2move:function(a){this.$owlWrapper.css({left:a})},css2slide:function(a,b){var e=this;e.isCssFinish=!1;e.$owlWrapper.stop(!0,!0).animate({left:a},{duration:b||e.options.slideSpeed,complete:function(){e.isCssFinish=!0}})},checkBrowser:function(){var a=k.createElement("div");a.style.cssText="  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)"; a=a.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g);this.browser={support3d:null!==a&&1===a.length,isTouch:"ontouchstart"in g||g.navigator.msMaxTouchPoints}},moveEvents:function(){if(!1!==this.options.mouseDrag||!1!==this.options.touchDrag)this.gestures(),this.disabledEvents()},eventTypes:function(){var a=["s","e","x"];this.ev_types={};!0===this.options.mouseDrag&&!0===this.options.touchDrag?a=["touchstart.owl mousedown.owl","touchmove.owl mousemove.owl","touchend.owl touchcancel.owl mouseup.owl"]: !1===this.options.mouseDrag&&!0===this.options.touchDrag?a=["touchstart.owl","touchmove.owl","touchend.owl touchcancel.owl"]:!0===this.options.mouseDrag&&!1===this.options.touchDrag&&(a=["mousedown.owl","mousemove.owl","mouseup.owl"]);this.ev_types.start=a[0];this.ev_types.move=a[1];this.ev_types.end=a[2]},disabledEvents:function(){this.$elem.on("dragstart.owl",function(a){a.preventDefault()});this.$elem.on("mousedown.disableTextSelect",function(a){return f(a.target).is("input, textarea, select, option")})}, gestures:function(){function a(a){if(void 0!==a.touches)return{x:a.touches[0].pageX,y:a.touches[0].pageY};if(void 0===a.touches){if(void 0!==a.pageX)return{x:a.pageX,y:a.pageY};if(void 0===a.pageX)return{x:a.clientX,y:a.clientY}}}function b(a){"on"===a?(f(k).on(d.ev_types.move,e),f(k).on(d.ev_types.end,c)):"off"===a&&(f(k).off(d.ev_types.move),f(k).off(d.ev_types.end))}function e(b){b=b.originalEvent||b||g.event;d.newPosX=a(b).x-h.offsetX;d.newPosY=a(b).y-h.offsetY;d.newRelativeX=d.newPosX-h.relativePos; "function"===typeof d.options.startDragging&&!0!==h.dragging&&0!==d.newRelativeX&&(h.dragging=!0,d.options.startDragging.apply(d,[d.$elem]));(8<d.newRelativeX||-8>d.newRelativeX)&&!0===d.browser.isTouch&&(void 0!==b.preventDefault?b.preventDefault():b.returnValue=!1,h.sliding=!0);(10<d.newPosY||-10>d.newPosY)&&!1===h.sliding&&f(k).off("touchmove.owl");d.newPosX=Math.max(Math.min(d.newPosX,d.newRelativeX/5),d.maximumPixels+d.newRelativeX/5);!0===d.browser.support3d?d.transition3d(d.newPosX):d.css2move(d.newPosX)} function c(a){a=a.originalEvent||a||g.event;var c;a.target=a.target||a.srcElement;h.dragging=!1;!0!==d.browser.isTouch&&d.$owlWrapper.removeClass("grabbing");d.dragDirection=0>d.newRelativeX?d.owl.dragDirection="left":d.owl.dragDirection="right";0!==d.newRelativeX&&(c=d.getNewPosition(),d.goTo(c,!1,"drag"),h.targetElement===a.target&&!0!==d.browser.isTouch&&(f(a.target).on("click.disable",function(a){a.stopImmediatePropagation();a.stopPropagation();a.preventDefault();f(a.target).off("click.disable")}), a=f._data(a.target,"events").click,c=a.pop(),a.splice(0,0,c)));b("off")}var d=this,h={offsetX:0,offsetY:0,baseElWidth:0,relativePos:0,position:null,minSwipe:null,maxSwipe:null,sliding:null,dargging:null,targetElement:null};d.isCssFinish=!0;d.$elem.on(d.ev_types.start,".owl-wrapper",function(c){c=c.originalEvent||c||g.event;var e;if(3===c.which)return!1;if(!(d.itemsAmount<=d.options.items)){if(!1===d.isCssFinish&&!d.options.dragBeforeAnimFinish||!1===d.isCss3Finish&&!d.options.dragBeforeAnimFinish)return!1; !1!==d.options.autoPlay&&g.clearInterval(d.autoPlayInterval);!0===d.browser.isTouch||d.$owlWrapper.hasClass("grabbing")||d.$owlWrapper.addClass("grabbing");d.newPosX=0;d.newRelativeX=0;f(this).css(d.removeTransition());e=f(this).position();h.relativePos=e.left;h.offsetX=a(c).x-e.left;h.offsetY=a(c).y-e.top;b("on");h.sliding=!1;h.targetElement=c.target||c.srcElement}})},getNewPosition:function(){var a=this.closestItem();a>this.maximumItem?a=this.currentItem=this.maximumItem:0<=this.newPosX&&(this.currentItem= a=0);return a},closestItem:function(){var a=this,b=!0===a.options.scrollPerPage?a.pagesInArray:a.positionsInArray,e=a.newPosX,c=null;f.each(b,function(d,g){e-a.itemWidth/20>b[d+1]&&e-a.itemWidth/20<g&&"left"===a.moveDirection()?(c=g,a.currentItem=!0===a.options.scrollPerPage?f.inArray(c,a.positionsInArray):d):e+a.itemWidth/20<g&&e+a.itemWidth/20>(b[d+1]||b[d]-a.itemWidth)&&"right"===a.moveDirection()&&(!0===a.options.scrollPerPage?(c=b[d+1]||b[b.length-1],a.currentItem=f.inArray(c,a.positionsInArray)): (c=b[d+1],a.currentItem=d+1))});return a.currentItem},moveDirection:function(){var a;0>this.newRelativeX?(a="right",this.playDirection="next"):(a="left",this.playDirection="prev");return a},customEvents:function(){var a=this;a.$elem.on("owl.next",function(){a.next()});a.$elem.on("owl.prev",function(){a.prev()});a.$elem.on("owl.play",function(b,e){a.options.autoPlay=e;a.play();a.hoverStatus="play"});a.$elem.on("owl.stop",function(){a.stop();a.hoverStatus="stop"});a.$elem.on("owl.goTo",function(b,e){a.goTo(e)}); a.$elem.on("owl.jumpTo",function(b,e){a.jumpTo(e)})},stopOnHover:function(){var a=this;!0===a.options.stopOnHover&&!0!==a.browser.isTouch&&!1!==a.options.autoPlay&&(a.$elem.on("mouseover",function(){a.stop()}),a.$elem.on("mouseout",function(){"stop"!==a.hoverStatus&&a.play()}))},lazyLoad:function(){var a,b,e,c,d;if(!1===this.options.lazyLoad)return!1;for(a=0;a<this.itemsAmount;a+=1)b=f(this.$owlItems[a]),"loaded"!==b.data("owl-loaded")&&(e=b.data("owl-item"),c=b.find(".lazyOwl"),"string"!==typeof c.data("src")? b.data("owl-loaded","loaded"):(void 0===b.data("owl-loaded")&&(c.hide(),b.addClass("loading").data("owl-loaded","checked")),(d=!0===this.options.lazyFollow?e>=this.currentItem:!0)&&e<this.currentItem+this.options.items&&c.length&&this.lazyPreload(b,c)))},lazyPreload:function(a,b){function e(){a.data("owl-loaded","loaded").removeClass("loading");b.removeAttr("data-src");"fade"===d.options.lazyEffect?b.fadeIn(400):b.show();"function"===typeof d.options.afterLazyLoad&&d.options.afterLazyLoad.apply(this, [d.$elem])}function c(){f+=1;d.completeImg(b.get(0))||!0===k?e():100>=f?g.setTimeout(c,100):e()}var d=this,f=0,k;"DIV"===b.prop("tagName")?(b.css("background-image","url("+b.data("src")+")"),k=!0):b[0].src=b.data("src");c()},autoHeight:function(){function a(){var a=f(e.$owlItems[e.currentItem]).height();e.wrapperOuter.css("height",a+"px");e.wrapperOuter.hasClass("autoHeight")||g.setTimeout(function(){e.wrapperOuter.addClass("autoHeight")},0)}function b(){d+=1;e.completeImg(c.get(0))?a():100>=d?g.setTimeout(b, 100):e.wrapperOuter.css("height","")}var e=this,c=f(e.$owlItems[e.currentItem]).find("img"),d;void 0!==c.get(0)?(d=0,b()):a()},completeImg:function(a){return!a.complete||"undefined"!==typeof a.naturalWidth&&0===a.naturalWidth?!1:!0},onVisibleItems:function(){var a;!0===this.options.addClassActive&&this.$owlItems.removeClass("active");this.visibleItems=[];for(a=this.currentItem;a<this.currentItem+this.options.items;a+=1)this.visibleItems.push(a),!0===this.options.addClassActive&&f(this.$owlItems[a]).addClass("active"); this.owl.visibleItems=this.visibleItems},transitionTypes:function(a){this.outClass="owl-"+a+"-out";this.inClass="owl-"+a+"-in"},singleItemTransition:function(){var a=this,b=a.outClass,e=a.inClass,c=a.$owlItems.eq(a.currentItem),d=a.$owlItems.eq(a.prevItem),f=Math.abs(a.positionsInArray[a.currentItem])+a.positionsInArray[a.prevItem],g=Math.abs(a.positionsInArray[a.currentItem])+a.itemWidth/2;a.isTransition=!0;a.$owlWrapper.addClass("owl-origin").css({"-webkit-transform-origin":g+"px","-moz-perspective-origin":g+ "px","perspective-origin":g+"px"});d.css({position:"relative",left:f+"px"}).addClass(b).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){a.endPrev=!0;d.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");a.clearTransStyle(d,b)});c.addClass(e).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){a.endCurrent=!0;c.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");a.clearTransStyle(c,e)})},clearTransStyle:function(a, b){a.css({position:"",left:""}).removeClass(b);this.endPrev&&this.endCurrent&&(this.$owlWrapper.removeClass("owl-origin"),this.isTransition=this.endCurrent=this.endPrev=!1)},owlStatus:function(){this.owl={userOptions:this.userOptions,baseElement:this.$elem,userItems:this.$userItems,owlItems:this.$owlItems,currentItem:this.currentItem,prevItem:this.prevItem,visibleItems:this.visibleItems,isTouch:this.browser.isTouch,browser:this.browser,dragDirection:this.dragDirection}},clearEvents:function(){this.$elem.off(".owl owl mousedown.disableTextSelect"); f(k).off(".owl owl");f(g).off("resize",this.resizer)},unWrap:function(){0!==this.$elem.children().length&&(this.$owlWrapper.unwrap(),this.$userItems.unwrap().unwrap(),this.owlControls&&this.owlControls.remove());this.clearEvents();this.$elem.attr("style",this.$elem.data("owl-originalStyles")||"").attr("class",this.$elem.data("owl-originalClasses"))},destroy:function(){this.stop();g.clearInterval(this.checkVisible);this.unWrap();this.$elem.removeData()},reinit:function(a){a=f.extend({},this.userOptions, a);this.unWrap();this.init(a,this.$elem)},addItem:function(a,b){var e;if(!a)return!1;if(0===this.$elem.children().length)return this.$elem.append(a),this.setVars(),!1;this.unWrap();e=void 0===b||-1===b?-1:b;e>=this.$userItems.length||-1===e?this.$userItems.eq(-1).after(a):this.$userItems.eq(e).before(a);this.setVars()},removeItem:function(a){if(0===this.$elem.children().length)return!1;a=void 0===a||-1===a?-1:a;this.unWrap();this.$userItems.eq(a).remove();this.setVars()}};f.fn.owlCarousel=function(a){return this.each(function(){if(!0=== f(this).data("owl-init"))return!1;f(this).data("owl-init",!0);var b=Object.create(l);b.init(a,this);f.data(this,"owlCarousel",b)})};f.fn.owlCarousel.options={items:5,itemsCustom:!1,itemsDesktop:[1199,4],itemsDesktopSmall:[979,3],itemsTablet:[768,2],itemsTabletSmall:!1,itemsMobile:[479,1],singleItem:!1,itemsScaleUp:!1,slideSpeed:200,paginationSpeed:800,rewindSpeed:1E3,autoPlay:!1,stopOnHover:!1,navigation:!1,navigationText:["prev","next"],rewindNav:!0,scrollPerPage:!1,pagination:!0,paginationNumbers:!1, responsive:!0,responsiveRefreshRate:200,responsiveBaseWidth:g,baseClass:"owl-carousel",theme:"owl-theme",lazyLoad:!1,lazyFollow:!0,lazyEffect:"fade",autoHeight:!1,jsonPath:!1,jsonSuccess:!1,dragBeforeAnimFinish:!0,mouseDrag:!0,touchDrag:!0,addClassActive:!1,transitionStyle:!1,beforeUpdate:!1,afterUpdate:!1,beforeInit:!1,afterInit:!1,beforeMove:!1,afterMove:!1,afterAction:!1,startDragging:!1,afterLazyLoad:!1}})(jQuery,window,document);


/* Quatro Digital - Smart Quantity // 1.12 // Carlos Vinicius // Todos os direitos reservados */
(function(v){var d=jQuery;if("function"!==typeof d.fn.QD_smartQuantity){var g=function(d,a){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var f;"object"===typeof d?(d.unshift("[Quatro Digital - Smart Quantity]\n"),f=d):f=["[Quatro Digital - Smart Quantity]\n"+d];if("undefined"===typeof a||"alerta"!==a.toLowerCase()&&"aviso"!==a.toLowerCase())if("undefined"!==typeof a&&"info"===a.toLowerCase())try{console.info.apply(console,
f)}catch(k){console.info(f.join("\n"))}else try{console.error.apply(console,f)}catch(k){console.error(f.join("\n"))}else try{console.warn.apply(console,f)}catch(k){console.warn(f.join("\n"))}}},m={buyButton:".buy-button",qttInput:".qd-sq-quantity",btnMore:".qd-sq-more",btnMinus:".qd-sq-minus",initialValue:1,minimumValue:1,setQuantityByUrl:!0},n=function(h,a){function f(c,e,b){a.setQuantityByUrl?c.val(((location.search||"").match(q)||[a.initialValue]).pop()):c.val(a.initialValue);c.change(function(c,
b){try{if("qd_ssl_trigger"!=b){var e=d(this),f=parseInt(e.val().replace(n,""));!isNaN(f)&&f>a.minimumValue?e.val(f):e.val(a.minimumValue);e.trigger("QuatroDigital.sq_change",this)}}catch(t){g(t.message)}});c.focusin(function(){d(this).trigger("QuatroDigital.sq_focusin",this)});e.click(function(b){b.preventDefault();c.val((parseInt(c.val())||a.minimumValue)+1).change()});b.click(function(b){b.preventDefault();c.val((parseInt(c.val())||a.minimumValue+1)-1).change()});c.change()}function k(c,e,b){c.on("QuatroDigital.sq_change",
function(){(d(this).val()||0)<=a.minimumValue?(b.addClass("qd-sq-inactive"),e.removeClass("qd-sq-inactive")):(e.addClass("qd-sq-inactive"),b.removeClass("qd-sq-inactive"))})}function m(c,e){c.on("QuatroDigital.sq_change",function(){try{if(!(e[0].hostname||"").length)return g("A quantidade n\u00e3o foi inserida no bt comprar pois o mesmo n\u00e3o possui uma URL","info");var b=e[0].search||"";-1<b.toLowerCase().indexOf("qty=")?e[0].search=b.replace(p,"qty="+(parseInt(c.val())||("number"==typeof a.minimumValue?
a.minimumValue:1))+"&"):e[0].search="qty="+(parseInt(c.val())||("number"==typeof a.minimumValue?a.minimumValue:1))+"&"+(e[0].search||"").replace(p,"");e.not(":first").each(function(){this.href=e[0].href});var d=((e.first().attr("href")||"").match(u)||[""]).pop()+"";c.attr("data-sku-id",d);if(d.length&&"object"===typeof skuJson&&!c.attr("data-sku-price"))for(b=0;b<skuJson.skus.length;b++)skuJson.skus[b].sku==d&&c.attr("data-sku-price",skuJson.skus[b].bestPrice)}catch(l){g(l.message)}})}var n=/[^0-9-]/gi,
q=/qty\=([0-9]+)/i,u=/sku\=([0-9]+)/i,p=/qty\=[0-9]+\&?/ig;h.each(function(){try{var c=d(this),e=c.find(a.buyButton),b=c.find(a.qttInput),h=c.find(a.btnMore),l=c.find(a.btnMinus);if(!e.length&&null!==a.buyButton||!b.length)return g("O plugin parou por aqui! N\u00e3o foram encontrados o bot\u00e3o comprar e o campo de quantidade","alerta");if(b.is(".qd-sq-on"))return g(["Execu\u00e7\u00e3o ignorada pois este input j\u00e1 possui o plugin aplicado. Input: ",b],"info");b.addClass("qd-sq-on");k(b,h,l);
null!==a.buyButton&&m(b,e);f(b,h,l);d(window).on("vtex.sku.selected",function(){b.change()})}catch(r){g(r.message)}})};d.fn.QD_smartQuantity=function(g){var a=d(this);a.qdPlugin=new n(a,d.extend({},m,g));d(window).trigger("QuatroDigital.sq_callback");return a};d(function(){d(".qd_auto_smart_quantity").QD_smartQuantity()})}})(this);    
/* Quatro Digital Amazing Menu */
var _0x5762=['replace','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','filter','.qd-am-banner','.qd-am-collection','length','qd-am-banner-wrapper','parent','qd-am-collection-wrapper','qdAjax','url','html','img[alt=\x27','attr','each','clone','hide','text','trim','data-qdam-value','[class*=\x27colunas\x27]','insertBefore','qd-am-content-loaded','\x27\x20falho.','ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','children',':not(ul)','replaceSpecialChars','>ul','>li','qd-am-column','qd-am-dropdown','qd-am-level-','add','qd-am-','-li','callback','QuatroDigital.am.callback','extend','getParent','closest','function','QD_amazingMenu','/qd-amazing-menu','object','undefined','error','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','aviso','toLowerCase','info','apply','join','qdAmAddNdx','addClass','qd-am-li-','first','qd-am-first','last','beznghevfzb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'];(function(_0x48dbad,_0x3a3ca6){var _0x468ede=function(_0x46d875){while(--_0x46d875){_0x48dbad['push'](_0x48dbad['shift']());}};_0x468ede(++_0x3a3ca6);}(_0x5762,0x110));var _0x3296=function(_0x3c6117,_0x2d329c){_0x3c6117=_0x3c6117-0x0;var _0x2b267c=_0x5762[_0x3c6117];return _0x2b267c;};(function(_0xcf35f){_0xcf35f['fn'][_0x3296('0x0')]=_0xcf35f['fn'][_0x3296('0x1')];}(jQuery));(function(_0x370967){var _0x53b5a1;var _0x31bd44=jQuery;if(_0x3296('0x2')!==typeof _0x31bd44['fn'][_0x3296('0x3')]){var _0x5c696a={'url':_0x3296('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0xe8f34a=function(_0x2a9011,_0x2dcedf){if(_0x3296('0x5')===typeof console&&_0x3296('0x6')!==typeof console[_0x3296('0x7')]&&'undefined'!==typeof console['info']&&_0x3296('0x6')!==typeof console[_0x3296('0x8')]){var _0x202c83;_0x3296('0x5')===typeof _0x2a9011?(_0x2a9011[_0x3296('0x9')](_0x3296('0xa')),_0x202c83=_0x2a9011):_0x202c83=[_0x3296('0xa')+_0x2a9011];if(_0x3296('0x6')===typeof _0x2dcedf||_0x3296('0xb')!==_0x2dcedf['toLowerCase']()&&_0x3296('0xc')!==_0x2dcedf[_0x3296('0xd')]())if(_0x3296('0x6')!==typeof _0x2dcedf&&_0x3296('0xe')===_0x2dcedf['toLowerCase']())try{console[_0x3296('0xe')][_0x3296('0xf')](console,_0x202c83);}catch(_0x3c4e6f){try{console[_0x3296('0xe')](_0x202c83[_0x3296('0x10')]('\x0a'));}catch(_0x29d035){}}else try{console[_0x3296('0x7')][_0x3296('0xf')](console,_0x202c83);}catch(_0xcc6bd0){try{console[_0x3296('0x7')](_0x202c83[_0x3296('0x10')]('\x0a'));}catch(_0x1dab7){}}else try{console[_0x3296('0x8')][_0x3296('0xf')](console,_0x202c83);}catch(_0x3e609b){try{console[_0x3296('0x8')](_0x202c83[_0x3296('0x10')]('\x0a'));}catch(_0x1b8ff3){}}}};_0x31bd44['fn'][_0x3296('0x11')]=function(){var _0x309860=_0x31bd44(this);_0x309860['each'](function(_0x25e2a5){_0x31bd44(this)[_0x3296('0x12')](_0x3296('0x13')+_0x25e2a5);});_0x309860[_0x3296('0x14')]()[_0x3296('0x12')](_0x3296('0x15'));_0x309860[_0x3296('0x16')]()[_0x3296('0x12')]('qd-am-last');return _0x309860;};_0x31bd44['fn'][_0x3296('0x3')]=function(){};_0x370967=function(_0x1ec2ff){var _0x38e5c5={'s':_0x3296('0x17')};return function(_0x41fb5a){var _0xf2d72=function(_0x3362a9){return _0x3362a9;};var _0x207fa3=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x41fb5a=_0x41fb5a['d'+_0x207fa3[0x10]+'c'+_0x207fa3[0x11]+'m'+_0xf2d72(_0x207fa3[0x1])+'n'+_0x207fa3[0xd]]['l'+_0x207fa3[0x12]+'c'+_0x207fa3[0x0]+'ti'+_0xf2d72('o')+'n'];var _0x5345b8=function(_0x375d5e){return escape(encodeURIComponent(_0x375d5e['replace'](/\./g,'¨')[_0x3296('0x18')](/[a-zA-Z]/g,function(_0x484025){return String[_0x3296('0x19')](('Z'>=_0x484025?0x5a:0x7a)>=(_0x484025=_0x484025[_0x3296('0x1a')](0x0)+0xd)?_0x484025:_0x484025-0x1a);})));};var _0x49e77c=_0x5345b8(_0x41fb5a[[_0x207fa3[0x9],_0xf2d72('o'),_0x207fa3[0xc],_0x207fa3[_0xf2d72(0xd)]][_0x3296('0x10')]('')]);_0x5345b8=_0x5345b8((window[['js',_0xf2d72('no'),'m',_0x207fa3[0x1],_0x207fa3[0x4][_0x3296('0x1b')](),_0x3296('0x1c')][_0x3296('0x10')]('')]||_0x3296('0x1d'))+['.v',_0x207fa3[0xd],'e',_0xf2d72('x'),'co',_0xf2d72('mm'),_0x3296('0x1e'),_0x207fa3[0x1],'.c',_0xf2d72('o'),'m.',_0x207fa3[0x13],'r'][_0x3296('0x10')](''));for(var _0x5c28a1 in _0x38e5c5){if(_0x5345b8===_0x5c28a1+_0x38e5c5[_0x5c28a1]||_0x49e77c===_0x5c28a1+_0x38e5c5[_0x5c28a1]){var _0x5aa9b5='tr'+_0x207fa3[0x11]+'e';break;}_0x5aa9b5='f'+_0x207fa3[0x0]+'ls'+_0xf2d72(_0x207fa3[0x1])+'';}_0xf2d72=!0x1;-0x1<_0x41fb5a[[_0x207fa3[0xc],'e',_0x207fa3[0x0],'rc',_0x207fa3[0x9]]['join']('')]['indexOf']('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0xf2d72=!0x0);return[_0x5aa9b5,_0xf2d72];}(_0x1ec2ff);}(window);if(!eval(_0x370967[0x0]))return _0x370967[0x1]?_0xe8f34a(_0x3296('0x1f')):!0x1;var _0x14626a=function(_0x1f92bc){var _0x461e0e=_0x1f92bc[_0x3296('0x20')]('.qd_am_code');var _0x56f42b=_0x461e0e[_0x3296('0x21')](_0x3296('0x22'));var _0x54f4c3=_0x461e0e[_0x3296('0x21')](_0x3296('0x23'));if(_0x56f42b['length']||_0x54f4c3[_0x3296('0x24')])_0x56f42b['parent']()[_0x3296('0x12')](_0x3296('0x25')),_0x54f4c3[_0x3296('0x26')]()[_0x3296('0x12')](_0x3296('0x27')),_0x31bd44[_0x3296('0x28')]({'url':_0x53b5a1[_0x3296('0x29')],'dataType':_0x3296('0x2a'),'success':function(_0x32c3b9){var _0x5068a7=_0x31bd44(_0x32c3b9);_0x56f42b['each'](function(){var _0x32c3b9=_0x31bd44(this);var _0xb55bb3=_0x5068a7[_0x3296('0x20')](_0x3296('0x2b')+_0x32c3b9[_0x3296('0x2c')]('data-qdam-value')+'\x27]');_0xb55bb3[_0x3296('0x24')]&&(_0xb55bb3[_0x3296('0x2d')](function(){_0x31bd44(this)[_0x3296('0x0')]('.box-banner')[_0x3296('0x2e')]()['insertBefore'](_0x32c3b9);}),_0x32c3b9[_0x3296('0x2f')]());})[_0x3296('0x12')]('qd-am-content-loaded');_0x54f4c3[_0x3296('0x2d')](function(){var _0x32c3b9={};var _0x244817=_0x31bd44(this);_0x5068a7['find']('h2')[_0x3296('0x2d')](function(){if(_0x31bd44(this)[_0x3296('0x30')]()[_0x3296('0x31')]()[_0x3296('0xd')]()==_0x244817[_0x3296('0x2c')](_0x3296('0x32'))['trim']()[_0x3296('0xd')]())return _0x32c3b9=_0x31bd44(this),!0x1;});_0x32c3b9[_0x3296('0x24')]&&(_0x32c3b9[_0x3296('0x2d')](function(){_0x31bd44(this)['getParent'](_0x3296('0x33'))[_0x3296('0x2e')]()[_0x3296('0x34')](_0x244817);}),_0x244817[_0x3296('0x2f')]());})['addClass'](_0x3296('0x35'));},'error':function(){_0xe8f34a('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27'+_0x53b5a1[_0x3296('0x29')]+_0x3296('0x36'));},'complete':function(){_0x53b5a1[_0x3296('0x37')][_0x3296('0x38')](this);_0x31bd44(window)[_0x3296('0x39')](_0x3296('0x3a'),_0x1f92bc);},'clearQueueDelay':0xbb8});};_0x31bd44[_0x3296('0x3')]=function(_0x237ed){var _0x259c6a=_0x237ed[_0x3296('0x20')](_0x3296('0x3b'))[_0x3296('0x2d')](function(){var _0x278a32=_0x31bd44(this);if(!_0x278a32[_0x3296('0x24')])return _0xe8f34a(['UL\x20do\x20menu\x20não\x20encontrada',_0x237ed],'alerta');_0x278a32['find']('li\x20>ul')['parent']()[_0x3296('0x12')]('qd-am-has-ul');_0x278a32[_0x3296('0x20')]('li')[_0x3296('0x2d')](function(){var _0x3c3d2e=_0x31bd44(this);var _0x4abf7c=_0x3c3d2e[_0x3296('0x3c')](_0x3296('0x3d'));_0x4abf7c[_0x3296('0x24')]&&_0x3c3d2e['addClass']('qd-am-elem-'+_0x4abf7c['first']()[_0x3296('0x30')]()[_0x3296('0x31')]()[_0x3296('0x3e')]()[_0x3296('0x18')](/\./g,'')['replace'](/\s/g,'-')[_0x3296('0xd')]());});var _0x22b33d=_0x278a32['find']('>li')[_0x3296('0x11')]();_0x278a32[_0x3296('0x12')]('qd-amazing-menu');_0x22b33d=_0x22b33d[_0x3296('0x20')](_0x3296('0x3f'));_0x22b33d[_0x3296('0x2d')](function(){var _0x4b0180=_0x31bd44(this);_0x4b0180[_0x3296('0x20')](_0x3296('0x40'))[_0x3296('0x11')]()['addClass'](_0x3296('0x41'));_0x4b0180[_0x3296('0x12')]('qd-am-dropdown-menu');_0x4b0180[_0x3296('0x26')]()[_0x3296('0x12')](_0x3296('0x42'));});_0x22b33d[_0x3296('0x12')](_0x3296('0x42'));var _0x553029=0x0,_0x370967=function(_0x45d780){_0x553029+=0x1;_0x45d780=_0x45d780[_0x3296('0x3c')]('li')['children']('*');_0x45d780[_0x3296('0x24')]&&(_0x45d780[_0x3296('0x12')](_0x3296('0x43')+_0x553029),_0x370967(_0x45d780));};_0x370967(_0x278a32);_0x278a32[_0x3296('0x44')](_0x278a32[_0x3296('0x20')]('ul'))[_0x3296('0x2d')](function(){var _0x59eff6=_0x31bd44(this);_0x59eff6[_0x3296('0x12')](_0x3296('0x45')+_0x59eff6[_0x3296('0x3c')]('li')['length']+_0x3296('0x46'));});});_0x14626a(_0x259c6a);_0x53b5a1[_0x3296('0x47')][_0x3296('0x38')](this);_0x31bd44(window)[_0x3296('0x39')](_0x3296('0x48'),_0x237ed);};_0x31bd44['fn']['QD_amazingMenu']=function(_0x49d3fb){var _0x319dc4=_0x31bd44(this);if(!_0x319dc4[_0x3296('0x24')])return _0x319dc4;_0x53b5a1=_0x31bd44[_0x3296('0x49')]({},_0x5c696a,_0x49d3fb);_0x319dc4['exec']=new _0x31bd44[(_0x3296('0x3'))](_0x31bd44(this));return _0x319dc4;};_0x31bd44(function(){_0x31bd44('.qd_amazing_menu_auto')['QD_amazingMenu']();});}}(this));
var _0x1dad=['dropDown','buyButton','QD_buyButton','smartCart','closest','replace','abs','undefined','pow','round','toFixed','length','join','_QuatroDigital_CartData','callback','Callbacks','function','error','Oooops!\x20','message','object','warn','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','toLowerCase','aviso','info','apply','_QuatroDigital_DropDown','QD_dropDownCart','fromCharCode','charCodeAt','toUpperCase','ite','erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>','skuName','name','smartCheckout','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','vtexjs','checkout','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','find','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','removeClass','qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','keyCode','.qd-ddc-prodWrapper','click.qd_ddc_scrollUp','scrollCart','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text','.qd-ddc-shipping\x20.qd-ddc-cep','keyup.qd_ddc_cep','formatCepField','.qd-ddc-shipping\x20.qd-ddc-cep-ok','.qd-ddc-cep-btn','click','toggle','.qd-ddc-cep-close','preventDefault','off','click._QD_DDC_closeShipping','.qd-ddc-cep-tooltip','hide','.qd-ddc-cep-ok','.qd-ddc-cep','updateOnlyHover','mouseenter.qd_ddc_hover','getCartInfoByUrl','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','html','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','emptyCart','each','call','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','shipping','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','getOrderForm','_QuatroDigital_AmountProduct','exec','addClass','QD_checkoutQueue','totalizers','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','qd-ddc-noItems','.qd-ddc-prodWrapper2','items','split','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','attr','availability','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','.qd-ddc-quantity','val','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','getParent','.qd-ddc-shipping\x20input','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','filter','lastSku','outerHeight','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','body','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','https','qd-loaded','load','src','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','.qd-ddc-prodRow','click.qd_ddc_remove','stop','slideUp','data','qdDdcLastPostalCode','calculateShipping','BRA','.qd-dd-cep-slas','remove','slas','<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>','shippingEstimate','\x20dia\x20útil','price',',\x20entrega\x20em\x20','\x20para\x20o\x20CEP\x20','</td>','tbody','.qd-ddc-cep-tooltip-text','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','quantity','index','updateItems','done','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','removeProduct','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','buyButtonClicked','productId','prod_','prodId','.qd-bap-item-added','.qd-bap-wrapper','.qd_bap_wrapper_content','prepend','.qdDdcContainer','QD_smartCart','extend','selector'];(function(_0x53cf91,_0x21026c){var _0x56cef2=function(_0x7dda3c){while(--_0x7dda3c){_0x53cf91['push'](_0x53cf91['shift']());}};_0x56cef2(++_0x21026c);}(_0x1dad,0xf0));var _0x17e1=function(_0x576f0e,_0x2e9201){_0x576f0e=_0x576f0e-0x0;var _0x400c86=_0x1dad[_0x576f0e];return _0x400c86;};(function(_0x198d3c){_0x198d3c['fn']['getParent']=_0x198d3c['fn'][_0x17e1('0x0')];}(jQuery));function qd_number_format(_0x538e65,_0x24b36d,_0x1365f1,_0x54b4e3){_0x538e65=(_0x538e65+'')[_0x17e1('0x1')](/[^0-9+\-Ee.]/g,'');_0x538e65=isFinite(+_0x538e65)?+_0x538e65:0x0;_0x24b36d=isFinite(+_0x24b36d)?Math[_0x17e1('0x2')](_0x24b36d):0x0;_0x54b4e3=_0x17e1('0x3')===typeof _0x54b4e3?',':_0x54b4e3;_0x1365f1='undefined'===typeof _0x1365f1?'.':_0x1365f1;var _0x12639d='',_0x12639d=function(_0x533cc7,_0x319294){var _0x24b36d=Math[_0x17e1('0x4')](0xa,_0x319294);return''+(Math[_0x17e1('0x5')](_0x533cc7*_0x24b36d)/_0x24b36d)[_0x17e1('0x6')](_0x319294);},_0x12639d=(_0x24b36d?_0x12639d(_0x538e65,_0x24b36d):''+Math[_0x17e1('0x5')](_0x538e65))['split']('.');0x3<_0x12639d[0x0][_0x17e1('0x7')]&&(_0x12639d[0x0]=_0x12639d[0x0][_0x17e1('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x54b4e3));(_0x12639d[0x1]||'')[_0x17e1('0x7')]<_0x24b36d&&(_0x12639d[0x1]=_0x12639d[0x1]||'',_0x12639d[0x1]+=Array(_0x24b36d-_0x12639d[0x1]['length']+0x1)['join']('0'));return _0x12639d[_0x17e1('0x8')](_0x1365f1);};(function(){try{window[_0x17e1('0x9')]=window[_0x17e1('0x9')]||{},window[_0x17e1('0x9')]['callback']=window[_0x17e1('0x9')][_0x17e1('0xa')]||$[_0x17e1('0xb')]();}catch(_0x360814){'undefined'!==typeof console&&_0x17e1('0xc')===typeof console[_0x17e1('0xd')]&&console[_0x17e1('0xd')](_0x17e1('0xe'),_0x360814[_0x17e1('0xf')]);}}());(function(_0x151667){try{var _0x29b0a1=jQuery,_0x33ce9a=function(_0x5f5a35,_0x407353){if(_0x17e1('0x10')===typeof console&&_0x17e1('0x3')!==typeof console[_0x17e1('0xd')]&&_0x17e1('0x3')!==typeof console['info']&&_0x17e1('0x3')!==typeof console[_0x17e1('0x11')]){var _0x1461c8;'object'===typeof _0x5f5a35?(_0x5f5a35[_0x17e1('0x12')](_0x17e1('0x13')),_0x1461c8=_0x5f5a35):_0x1461c8=[_0x17e1('0x13')+_0x5f5a35];if(_0x17e1('0x3')===typeof _0x407353||_0x17e1('0x14')!==_0x407353[_0x17e1('0x15')]()&&_0x17e1('0x16')!==_0x407353[_0x17e1('0x15')]())if(_0x17e1('0x3')!==typeof _0x407353&&_0x17e1('0x17')===_0x407353[_0x17e1('0x15')]())try{console[_0x17e1('0x17')][_0x17e1('0x18')](console,_0x1461c8);}catch(_0x33b887){try{console[_0x17e1('0x17')](_0x1461c8[_0x17e1('0x8')]('\x0a'));}catch(_0x24956f){}}else try{console[_0x17e1('0xd')][_0x17e1('0x18')](console,_0x1461c8);}catch(_0x24970b){try{console[_0x17e1('0xd')](_0x1461c8[_0x17e1('0x8')]('\x0a'));}catch(_0xda013){}}else try{console[_0x17e1('0x11')]['apply'](console,_0x1461c8);}catch(_0x570126){try{console[_0x17e1('0x11')](_0x1461c8[_0x17e1('0x8')]('\x0a'));}catch(_0x55e676){}}}};window[_0x17e1('0x19')]=window['_QuatroDigital_DropDown']||{};window['_QuatroDigital_DropDown']['allowUpdate']=!0x0;_0x29b0a1['QD_dropDownCart']=function(){};_0x29b0a1['fn'][_0x17e1('0x1a')]=function(){return{'fn':new _0x29b0a1()};};var _0x246c6e=function(_0x2864e6){var _0x140344={'s':'beznghevfzb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x2d794c){var _0x34b600=function(_0x5b0ffd){return _0x5b0ffd;};var _0x1a9a82=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2d794c=_0x2d794c['d'+_0x1a9a82[0x10]+'c'+_0x1a9a82[0x11]+'m'+_0x34b600(_0x1a9a82[0x1])+'n'+_0x1a9a82[0xd]]['l'+_0x1a9a82[0x12]+'c'+_0x1a9a82[0x0]+'ti'+_0x34b600('o')+'n'];var _0xea9fa4=function(_0x19f4f1){return escape(encodeURIComponent(_0x19f4f1[_0x17e1('0x1')](/\./g,'¨')[_0x17e1('0x1')](/[a-zA-Z]/g,function(_0x140dbd){return String[_0x17e1('0x1b')](('Z'>=_0x140dbd?0x5a:0x7a)>=(_0x140dbd=_0x140dbd[_0x17e1('0x1c')](0x0)+0xd)?_0x140dbd:_0x140dbd-0x1a);})));};var _0x13b8e1=_0xea9fa4(_0x2d794c[[_0x1a9a82[0x9],_0x34b600('o'),_0x1a9a82[0xc],_0x1a9a82[_0x34b600(0xd)]]['join']('')]);_0xea9fa4=_0xea9fa4((window[['js',_0x34b600('no'),'m',_0x1a9a82[0x1],_0x1a9a82[0x4][_0x17e1('0x1d')](),_0x17e1('0x1e')]['join']('')]||'---')+['.v',_0x1a9a82[0xd],'e',_0x34b600('x'),'co',_0x34b600('mm'),_0x17e1('0x1f'),_0x1a9a82[0x1],'.c',_0x34b600('o'),'m.',_0x1a9a82[0x13],'r'][_0x17e1('0x8')](''));for(var _0x5609b5 in _0x140344){if(_0xea9fa4===_0x5609b5+_0x140344[_0x5609b5]||_0x13b8e1===_0x5609b5+_0x140344[_0x5609b5]){var _0x21c159='tr'+_0x1a9a82[0x11]+'e';break;}_0x21c159='f'+_0x1a9a82[0x0]+'ls'+_0x34b600(_0x1a9a82[0x1])+'';}_0x34b600=!0x1;-0x1<_0x2d794c[[_0x1a9a82[0xc],'e',_0x1a9a82[0x0],'rc',_0x1a9a82[0x9]]['join']('')][_0x17e1('0x20')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x34b600=!0x0);return[_0x21c159,_0x34b600];}(_0x2864e6);}(window);if(!eval(_0x246c6e[0x0]))return _0x246c6e[0x1]?_0x33ce9a(_0x17e1('0x21')):!0x1;_0x29b0a1['QD_dropDownCart']=function(_0x42aec5,_0x4a7592){var _0x5cd4e1=_0x29b0a1(_0x42aec5);if(!_0x5cd4e1['length'])return _0x5cd4e1;var _0x2f5194=_0x29b0a1['extend'](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':_0x17e1('0x22'),'cartTotal':_0x17e1('0x23'),'emptyCart':_0x17e1('0x24'),'continueShopping':'Continuar\x20Comprando','shippingForm':_0x17e1('0x25')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'forceImageHTTPS':!0x1,'skuName':function(_0x2c4ea8){return _0x2c4ea8[_0x17e1('0x26')]||_0x2c4ea8[_0x17e1('0x27')];},'callback':function(){},'callbackProductsList':function(){}},_0x4a7592);_0x29b0a1('');var _0x291337=this;if(_0x2f5194[_0x17e1('0x28')]){var _0xb6662a=!0x1;_0x17e1('0x3')===typeof window['vtexjs']&&(_0x33ce9a(_0x17e1('0x29')),_0x29b0a1['ajax']({'url':_0x17e1('0x2a'),'async':!0x1,'dataType':_0x17e1('0x2b'),'error':function(){_0x33ce9a('Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.');_0xb6662a=!0x0;}}));if(_0xb6662a)return _0x33ce9a('A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!');}if('object'===typeof window[_0x17e1('0x2c')]&&_0x17e1('0x3')!==typeof window[_0x17e1('0x2c')][_0x17e1('0x2d')])var _0x151667=window[_0x17e1('0x2c')][_0x17e1('0x2d')];else if(_0x17e1('0x10')===typeof vtex&&_0x17e1('0x10')===typeof vtex['checkout']&&_0x17e1('0x3')!==typeof vtex[_0x17e1('0x2d')]['SDK'])_0x151667=new vtex['checkout']['SDK']();else return _0x33ce9a(_0x17e1('0x2e'));_0x291337[_0x17e1('0x2f')]=_0x17e1('0x30');var _0x584548=function(_0x8a15f2){_0x29b0a1(this)[_0x17e1('0x31')](_0x8a15f2);_0x8a15f2[_0x17e1('0x32')](_0x17e1('0x33'))[_0x17e1('0x34')](_0x29b0a1(_0x17e1('0x35')))['on'](_0x17e1('0x36'),function(){_0x5cd4e1[_0x17e1('0x37')](_0x17e1('0x38'));_0x29b0a1(document['body'])['removeClass'](_0x17e1('0x39'));});_0x29b0a1(document)['off']('keyup.qd_ddc_closeFn')['on']('keyup.qd_ddc_closeFn',function(_0x4c84b9){0x1b==_0x4c84b9[_0x17e1('0x3a')]&&(_0x5cd4e1[_0x17e1('0x37')]('qd-bb-lightBoxProdAdd'),_0x29b0a1(document['body'])['removeClass'](_0x17e1('0x39')));});var _0x15bbcb=_0x8a15f2[_0x17e1('0x32')](_0x17e1('0x3b'));_0x8a15f2[_0x17e1('0x32')]('.qd-ddc-scrollUp')['on'](_0x17e1('0x3c'),function(){_0x291337[_0x17e1('0x3d')]('-',void 0x0,void 0x0,_0x15bbcb);return!0x1;});_0x8a15f2[_0x17e1('0x32')]('.qd-ddc-scrollDown')['on'](_0x17e1('0x3e'),function(){_0x291337['scrollCart'](void 0x0,void 0x0,void 0x0,_0x15bbcb);return!0x1;});var _0x4426b1=_0x8a15f2[_0x17e1('0x32')](_0x17e1('0x3f'));_0x8a15f2[_0x17e1('0x32')](_0x17e1('0x40'))['val']('')['on'](_0x17e1('0x41'),function(_0xa44286){_0x291337[_0x17e1('0x42')](_0x29b0a1(this));0xd==_0xa44286[_0x17e1('0x3a')]&&_0x8a15f2[_0x17e1('0x32')](_0x17e1('0x43'))['click']();});_0x8a15f2['find'](_0x17e1('0x44'))[_0x17e1('0x45')](function(_0x58a94b){_0x58a94b['preventDefault']();_0x4426b1[_0x17e1('0x46')]();});_0x8a15f2['find'](_0x17e1('0x47'))[_0x17e1('0x45')](function(_0x26fac3){_0x26fac3[_0x17e1('0x48')]();_0x4426b1['hide']();});_0x29b0a1(document)[_0x17e1('0x49')](_0x17e1('0x4a'))['on'](_0x17e1('0x4a'),function(_0xd23c47){_0x29b0a1(_0xd23c47['target'])[_0x17e1('0x0')](_0x8a15f2[_0x17e1('0x32')](_0x17e1('0x4b')))[_0x17e1('0x7')]||_0x4426b1[_0x17e1('0x4c')]();});_0x8a15f2[_0x17e1('0x32')](_0x17e1('0x4d'))['click'](function(_0x2a289c){_0x2a289c[_0x17e1('0x48')]();_0x291337['shippingCalculate'](_0x8a15f2[_0x17e1('0x32')](_0x17e1('0x4e')));});if(_0x2f5194[_0x17e1('0x4f')]){var _0x4a7592=0x0;_0x29b0a1(this)['on'](_0x17e1('0x50'),function(){var _0x8a15f2=function(){window[_0x17e1('0x19')]['allowUpdate']&&(_0x291337[_0x17e1('0x51')](),window[_0x17e1('0x19')]['allowUpdate']=!0x1,_0x29b0a1['fn'][_0x17e1('0x52')](!0x0),_0x291337[_0x17e1('0x53')]());};_0x4a7592=setInterval(function(){_0x8a15f2();},0x258);_0x8a15f2();});_0x29b0a1(this)['on'](_0x17e1('0x54'),function(){clearInterval(_0x4a7592);});}};var _0x1fd862=function(_0x346bcf){_0x346bcf=_0x29b0a1(_0x346bcf);_0x2f5194[_0x17e1('0x55')]['cartTotal']=_0x2f5194[_0x17e1('0x55')][_0x17e1('0x56')][_0x17e1('0x1')](_0x17e1('0x57'),_0x17e1('0x58'));_0x2f5194[_0x17e1('0x55')][_0x17e1('0x56')]=_0x2f5194['texts'][_0x17e1('0x56')][_0x17e1('0x1')](_0x17e1('0x59'),'<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>');_0x2f5194[_0x17e1('0x55')][_0x17e1('0x56')]=_0x2f5194[_0x17e1('0x55')][_0x17e1('0x56')][_0x17e1('0x1')](_0x17e1('0x5a'),_0x17e1('0x5b'));_0x2f5194[_0x17e1('0x55')][_0x17e1('0x56')]=_0x2f5194[_0x17e1('0x55')][_0x17e1('0x56')][_0x17e1('0x1')](_0x17e1('0x5c'),_0x17e1('0x5d'));_0x346bcf[_0x17e1('0x32')]('.qd-ddc-viewCart')[_0x17e1('0x5e')](_0x2f5194[_0x17e1('0x55')][_0x17e1('0x5f')]);_0x346bcf['find'](_0x17e1('0x60'))[_0x17e1('0x5e')](_0x2f5194['texts'][_0x17e1('0x61')]);_0x346bcf[_0x17e1('0x32')](_0x17e1('0x62'))[_0x17e1('0x5e')](_0x2f5194['texts'][_0x17e1('0x63')]);_0x346bcf[_0x17e1('0x32')](_0x17e1('0x64'))[_0x17e1('0x5e')](_0x2f5194[_0x17e1('0x55')][_0x17e1('0x56')]);_0x346bcf['find'](_0x17e1('0x65'))[_0x17e1('0x5e')](_0x2f5194[_0x17e1('0x55')][_0x17e1('0x66')]);_0x346bcf[_0x17e1('0x32')](_0x17e1('0x67'))['html'](_0x2f5194[_0x17e1('0x55')][_0x17e1('0x68')]);return _0x346bcf;}(this[_0x17e1('0x2f')]);var _0x4a65a7=0x0;_0x5cd4e1[_0x17e1('0x69')](function(){0x0<_0x4a65a7?_0x584548[_0x17e1('0x6a')](this,_0x1fd862[_0x17e1('0x6b')]()):_0x584548[_0x17e1('0x6a')](this,_0x1fd862);_0x4a65a7++;});window[_0x17e1('0x9')][_0x17e1('0xa')][_0x17e1('0x34')](function(){_0x29b0a1(_0x17e1('0x6c'))['html'](window[_0x17e1('0x9')]['total']||'--');_0x29b0a1(_0x17e1('0x6d'))['html'](window[_0x17e1('0x9')][_0x17e1('0x6e')]||'0');_0x29b0a1(_0x17e1('0x6f'))['html'](window[_0x17e1('0x9')][_0x17e1('0x70')]||'--');_0x29b0a1('.qd-ddc-infoAllTotal')[_0x17e1('0x5e')](window['_QuatroDigital_CartData']['allTotal']||'--');});var _0x3d0126=function(_0x21a863,_0x1fac28){if(_0x17e1('0x3')===typeof _0x21a863['items'])return _0x33ce9a('Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição');_0x291337[_0x17e1('0x71')][_0x17e1('0x6a')](this,_0x1fac28);};_0x291337[_0x17e1('0x51')]=function(_0x2cccbb,_0x160eb2){_0x17e1('0x3')!=typeof _0x160eb2?window[_0x17e1('0x19')][_0x17e1('0x72')]=_0x160eb2:window[_0x17e1('0x19')][_0x17e1('0x72')]&&(_0x160eb2=window[_0x17e1('0x19')][_0x17e1('0x72')]);setTimeout(function(){window['_QuatroDigital_DropDown']['dataOptionsCache']=void 0x0;},_0x2f5194[_0x17e1('0x73')]);_0x29b0a1(_0x17e1('0x74'))[_0x17e1('0x37')](_0x17e1('0x75'));if(_0x2f5194[_0x17e1('0x28')]){var _0x1dacb5=function(_0x1365bb){window[_0x17e1('0x19')][_0x17e1('0x76')]=_0x1365bb;_0x3d0126(_0x1365bb,_0x160eb2);_0x17e1('0x3')!==typeof window[_0x17e1('0x77')]&&_0x17e1('0xc')===typeof window[_0x17e1('0x77')][_0x17e1('0x78')]&&window[_0x17e1('0x77')]['exec'][_0x17e1('0x6a')](this);_0x29b0a1(_0x17e1('0x74'))[_0x17e1('0x79')](_0x17e1('0x75'));};_0x17e1('0x3')!==typeof window[_0x17e1('0x19')]['getOrderForm']?(_0x1dacb5(window[_0x17e1('0x19')][_0x17e1('0x76')]),'function'===typeof _0x2cccbb&&_0x2cccbb(window['_QuatroDigital_DropDown']['getOrderForm'])):_0x29b0a1[_0x17e1('0x7a')](['items',_0x17e1('0x7b'),_0x17e1('0x7c')],{'done':function(_0x4ec3d5){_0x1dacb5[_0x17e1('0x6a')](this,_0x4ec3d5);_0x17e1('0xc')===typeof _0x2cccbb&&_0x2cccbb(_0x4ec3d5);},'fail':function(_0x12b3c3){_0x33ce9a([_0x17e1('0x7d'),_0x12b3c3]);}});}else alert(_0x17e1('0x7e'));};_0x291337[_0x17e1('0x53')]=function(){var _0x318c62=_0x29b0a1(_0x17e1('0x74'));_0x318c62[_0x17e1('0x32')]('.qd-ddc-prodRow')[_0x17e1('0x7')]?_0x318c62[_0x17e1('0x37')](_0x17e1('0x7f')):_0x318c62[_0x17e1('0x79')](_0x17e1('0x7f'));};_0x291337['renderProductsList']=function(_0x37e2d0){var _0x4a7592=_0x29b0a1(_0x17e1('0x80'));_0x4a7592['empty']();_0x4a7592[_0x17e1('0x69')](function(){var _0x4a7592=_0x29b0a1(this),_0x4adb09,_0x3e434e,_0x118a7b=_0x29b0a1(''),_0x4e571c;for(_0x4e571c in window[_0x17e1('0x19')]['getOrderForm'][_0x17e1('0x81')])if(_0x17e1('0x10')===typeof window[_0x17e1('0x19')][_0x17e1('0x76')][_0x17e1('0x81')][_0x4e571c]){var _0x7b73ad=window[_0x17e1('0x19')][_0x17e1('0x76')][_0x17e1('0x81')][_0x4e571c];var _0x42aec5=_0x7b73ad['productCategoryIds'][_0x17e1('0x1')](/^\/|\/$/g,'')[_0x17e1('0x82')]('/');var _0x3f3a59=_0x29b0a1(_0x17e1('0x83'));_0x3f3a59[_0x17e1('0x84')]({'data-sku':_0x7b73ad['id'],'data-sku-index':_0x4e571c,'data-qd-departament':_0x42aec5[0x0],'data-qd-category':_0x42aec5[_0x42aec5[_0x17e1('0x7')]-0x1]});_0x3f3a59['addClass']('qd-ddc-'+_0x7b73ad[_0x17e1('0x85')]);_0x3f3a59[_0x17e1('0x32')]('.qd-ddc-prodName')['append'](_0x2f5194[_0x17e1('0x26')](_0x7b73ad));_0x3f3a59['find'](_0x17e1('0x86'))[_0x17e1('0x31')](isNaN(_0x7b73ad[_0x17e1('0x87')])?_0x7b73ad[_0x17e1('0x87')]:0x0==_0x7b73ad['sellingPrice']?_0x17e1('0x88'):(_0x29b0a1(_0x17e1('0x89'))[_0x17e1('0x84')]('content')||'R$')+'\x20'+qd_number_format(_0x7b73ad[_0x17e1('0x87')]/0x64,0x2,',','.'));_0x3f3a59[_0x17e1('0x32')](_0x17e1('0x8a'))['attr']({'data-sku':_0x7b73ad['id'],'data-sku-index':_0x4e571c})[_0x17e1('0x8b')](_0x7b73ad['quantity']);_0x3f3a59[_0x17e1('0x32')](_0x17e1('0x8c'))[_0x17e1('0x84')]({'data-sku':_0x7b73ad['id'],'data-sku-index':_0x4e571c});_0x291337[_0x17e1('0x8d')](_0x7b73ad['id'],_0x3f3a59[_0x17e1('0x32')](_0x17e1('0x8e')),_0x7b73ad[_0x17e1('0x8f')]);_0x3f3a59['find'](_0x17e1('0x90'))[_0x17e1('0x84')]({'data-sku':_0x7b73ad['id'],'data-sku-index':_0x4e571c});_0x3f3a59[_0x17e1('0x91')](_0x4a7592);_0x118a7b=_0x118a7b[_0x17e1('0x34')](_0x3f3a59);}try{var _0x36020b=_0x4a7592[_0x17e1('0x92')](_0x17e1('0x74'))[_0x17e1('0x32')](_0x17e1('0x93'));_0x36020b[_0x17e1('0x7')]&&''==_0x36020b[_0x17e1('0x8b')]()&&window[_0x17e1('0x19')][_0x17e1('0x76')][_0x17e1('0x7c')]['address']&&_0x36020b[_0x17e1('0x8b')](window[_0x17e1('0x19')][_0x17e1('0x76')][_0x17e1('0x7c')]['address'][_0x17e1('0x94')]);}catch(_0xef0f30){_0x33ce9a(_0x17e1('0x95')+_0xef0f30[_0x17e1('0xf')],_0x17e1('0x16'));}_0x291337[_0x17e1('0x96')](_0x4a7592);_0x291337[_0x17e1('0x53')]();_0x37e2d0&&_0x37e2d0['lastSku']&&function(){_0x3e434e=_0x118a7b[_0x17e1('0x97')]('[data-sku=\x27'+_0x37e2d0[_0x17e1('0x98')]+'\x27]');_0x3e434e[_0x17e1('0x7')]&&(_0x4adb09=0x0,_0x118a7b['each'](function(){var _0x37e2d0=_0x29b0a1(this);if(_0x37e2d0['is'](_0x3e434e))return!0x1;_0x4adb09+=_0x37e2d0[_0x17e1('0x99')]();}),_0x291337[_0x17e1('0x3d')](void 0x0,void 0x0,_0x4adb09,_0x4a7592[_0x17e1('0x34')](_0x4a7592[_0x17e1('0x9a')]())),_0x118a7b[_0x17e1('0x37')](_0x17e1('0x9b')),function(_0x57bbdb){_0x57bbdb[_0x17e1('0x79')](_0x17e1('0x9c'));_0x57bbdb['addClass']('qd-ddc-lastAddedFixed');setTimeout(function(){_0x57bbdb['removeClass']('qd-ddc-lastAdded');},_0x2f5194['timeRemoveNewItemClass']);}(_0x3e434e),_0x29b0a1(document[_0x17e1('0x9d')])[_0x17e1('0x79')](_0x17e1('0x9e')),setTimeout(function(){_0x29b0a1(document[_0x17e1('0x9d')])[_0x17e1('0x37')](_0x17e1('0x9e'));},_0x2f5194[_0x17e1('0x73')]));}();});(function(){_QuatroDigital_DropDown[_0x17e1('0x76')][_0x17e1('0x81')][_0x17e1('0x7')]?(_0x29b0a1('body')[_0x17e1('0x37')](_0x17e1('0x9f'))[_0x17e1('0x79')](_0x17e1('0xa0')),setTimeout(function(){_0x29b0a1(_0x17e1('0x9d'))[_0x17e1('0x37')](_0x17e1('0xa1'));},_0x2f5194[_0x17e1('0x73')])):_0x29b0a1(_0x17e1('0x9d'))[_0x17e1('0x37')]('qd-ddc-cart-rendered')[_0x17e1('0x79')](_0x17e1('0x9f'));}());_0x17e1('0xc')===typeof _0x2f5194[_0x17e1('0xa2')]?_0x2f5194[_0x17e1('0xa2')][_0x17e1('0x6a')](this):_0x33ce9a(_0x17e1('0xa3'));};_0x291337[_0x17e1('0x8d')]=function(_0x2c3915,_0x62ec6,_0x5d6850){function _0x1fdd4f(){_0x2f5194['forceImageHTTPS']&&'string'==typeof _0x5d6850&&(_0x5d6850=_0x5d6850[_0x17e1('0x1')]('http',_0x17e1('0xa4')));_0x62ec6[_0x17e1('0x37')](_0x17e1('0xa5'))[_0x17e1('0xa6')](function(){_0x29b0a1(this)['addClass'](_0x17e1('0xa5'));})[_0x17e1('0x84')](_0x17e1('0xa7'),_0x5d6850);}_0x5d6850?_0x1fdd4f():isNaN(_0x2c3915)?_0x33ce9a('Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU',_0x17e1('0x14')):alert(_0x17e1('0xa8'));};_0x291337[_0x17e1('0x96')]=function(_0x24b4d2){var _0x4a7592=function(_0x47dcc4,_0x32f078){var _0x11a1f4=_0x29b0a1(_0x47dcc4);var _0x396475=_0x11a1f4[_0x17e1('0x84')](_0x17e1('0xa9'));var _0x42aec5=_0x11a1f4['attr'](_0x17e1('0xaa'));if(_0x396475){var _0x43019f=parseInt(_0x11a1f4[_0x17e1('0x8b')]())||0x1;_0x291337['changeQantity']([_0x396475,_0x42aec5],_0x43019f,_0x43019f+0x1,function(_0xac8b4c){_0x11a1f4[_0x17e1('0x8b')](_0xac8b4c);_0x17e1('0xc')===typeof _0x32f078&&_0x32f078();});}};var _0x591f83=function(_0x82174c,_0x23666f){var _0x4a7592=_0x29b0a1(_0x82174c);var _0x1b6988=_0x4a7592[_0x17e1('0x84')](_0x17e1('0xa9'));var _0x378651=_0x4a7592[_0x17e1('0x84')]('data-sku-index');if(_0x1b6988){var _0x42aec5=parseInt(_0x4a7592['val']())||0x2;_0x291337[_0x17e1('0xab')]([_0x1b6988,_0x378651],_0x42aec5,_0x42aec5-0x1,function(_0x9c93ef){_0x4a7592[_0x17e1('0x8b')](_0x9c93ef);_0x17e1('0xc')===typeof _0x23666f&&_0x23666f();});}};var _0x34991d=function(_0xe8d3bb,_0x3bec81){var _0x23b0c1=_0x29b0a1(_0xe8d3bb);var _0x17454d=_0x23b0c1[_0x17e1('0x84')]('data-sku');var _0x42aec5=_0x23b0c1[_0x17e1('0x84')](_0x17e1('0xaa'));if(_0x17454d){var _0x2cadf1=parseInt(_0x23b0c1[_0x17e1('0x8b')]())||0x1;_0x291337[_0x17e1('0xab')]([_0x17454d,_0x42aec5],0x1,_0x2cadf1,function(_0x33d003){_0x23b0c1[_0x17e1('0x8b')](_0x33d003);_0x17e1('0xc')===typeof _0x3bec81&&_0x3bec81();});}};var _0x42aec5=_0x24b4d2[_0x17e1('0x32')](_0x17e1('0xac'));_0x42aec5[_0x17e1('0x79')](_0x17e1('0xad'))[_0x17e1('0x69')](function(){var _0x24b4d2=_0x29b0a1(this);_0x24b4d2[_0x17e1('0x32')]('.qd-ddc-quantityMore')['on'](_0x17e1('0xae'),function(_0x499cd5){_0x499cd5[_0x17e1('0x48')]();_0x42aec5[_0x17e1('0x79')](_0x17e1('0xaf'));_0x4a7592(_0x24b4d2[_0x17e1('0x32')](_0x17e1('0x8a')),function(){_0x42aec5[_0x17e1('0x37')](_0x17e1('0xaf'));});});_0x24b4d2[_0x17e1('0x32')](_0x17e1('0xb0'))['on'](_0x17e1('0xb1'),function(_0x2fe688){_0x2fe688[_0x17e1('0x48')]();_0x42aec5[_0x17e1('0x79')](_0x17e1('0xaf'));_0x591f83(_0x24b4d2['find'](_0x17e1('0x8a')),function(){_0x42aec5[_0x17e1('0x37')](_0x17e1('0xaf'));});});_0x24b4d2[_0x17e1('0x32')](_0x17e1('0x8a'))['on'](_0x17e1('0xb2'),function(){_0x42aec5[_0x17e1('0x79')]('qd-loading');_0x34991d(this,function(){_0x42aec5['removeClass'](_0x17e1('0xaf'));});});_0x24b4d2[_0x17e1('0x32')](_0x17e1('0x8a'))['on'](_0x17e1('0xb3'),function(_0x41a2c3){0xd==_0x41a2c3['keyCode']&&(_0x42aec5['addClass'](_0x17e1('0xaf')),_0x34991d(this,function(){_0x42aec5[_0x17e1('0x37')](_0x17e1('0xaf'));}));});});_0x24b4d2[_0x17e1('0x32')](_0x17e1('0xb4'))['each'](function(){var _0x24b4d2=_0x29b0a1(this);_0x24b4d2[_0x17e1('0x32')](_0x17e1('0x8c'))['on'](_0x17e1('0xb5'),function(){_0x24b4d2[_0x17e1('0x79')](_0x17e1('0xaf'));_0x291337['removeProduct'](_0x29b0a1(this),function(_0x3d9c97){_0x3d9c97?_0x24b4d2[_0x17e1('0xb6')](!0x0)[_0x17e1('0xb7')](function(){_0x24b4d2['remove']();_0x291337[_0x17e1('0x53')]();}):_0x24b4d2[_0x17e1('0x37')]('qd-loading');});return!0x1;});});};_0x291337['formatCepField']=function(_0x2f9545){var _0x33db3e=_0x2f9545[_0x17e1('0x8b')]();_0x33db3e=_0x33db3e[_0x17e1('0x1')](/[^0-9\-]/g,'');_0x33db3e=_0x33db3e[_0x17e1('0x1')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3');_0x33db3e=_0x33db3e[_0x17e1('0x1')](/(.{9}).*/g,'$1');_0x2f9545[_0x17e1('0x8b')](_0x33db3e);};_0x291337['shippingCalculate']=function(_0x16147f){var _0xb8d0cb=_0x16147f[_0x17e1('0x8b')]();0x9<=_0xb8d0cb[_0x17e1('0x7')]&&(_0x16147f[_0x17e1('0xb8')](_0x17e1('0xb9'))!=_0xb8d0cb&&_0x151667[_0x17e1('0xba')]({'postalCode':_0xb8d0cb,'country':_0x17e1('0xbb')})['done'](function(_0x183027){_0x16147f['closest']('.qd-ddc-cep-tooltip-text')['find'](_0x17e1('0xbc'))[_0x17e1('0xbd')]();window['_QuatroDigital_DropDown'][_0x17e1('0x76')]=_0x183027;_0x291337[_0x17e1('0x51')]();_0x183027=_0x183027['shippingData']['logisticsInfo'][0x0][_0x17e1('0xbe')];for(var _0x42aec5=_0x29b0a1(_0x17e1('0xbf')),_0x377cf0=0x0;_0x377cf0<_0x183027['length'];_0x377cf0++){var _0x4fe76a=_0x183027[_0x377cf0],_0xc9ef5c=0x1<_0x4fe76a[_0x17e1('0xc0')]?_0x4fe76a[_0x17e1('0xc0')][_0x17e1('0x1')]('bd',_0x17e1('0xc1')):_0x4fe76a[_0x17e1('0xc0')][_0x17e1('0x1')]('bd','\x20dias\x20útéis'),_0x268e8a=_0x29b0a1('<tr></tr>');_0x268e8a[_0x17e1('0x31')]('<td>\x20R$\x20'+qd_number_format(_0x4fe76a[_0x17e1('0xc2')]/0x64,0x2,',','.')+'</td><td>'+_0x4fe76a['name']+_0x17e1('0xc3')+_0xc9ef5c+_0x17e1('0xc4')+_0xb8d0cb+_0x17e1('0xc5'));_0x268e8a[_0x17e1('0x91')](_0x42aec5[_0x17e1('0x32')](_0x17e1('0xc6')));}_0x42aec5['insertBefore'](_0x16147f[_0x17e1('0x0')](_0x17e1('0xc7'))['find'](_0x17e1('0x47')));})[_0x17e1('0xc8')](function(_0x201768){_0x33ce9a([_0x17e1('0xc9'),_0x201768]);updateCartData();}),_0x16147f[_0x17e1('0xb8')]('qdDdcLastPostalCode',_0xb8d0cb));};_0x291337[_0x17e1('0xab')]=function(_0x405905,_0x34367c,_0xb2f5ff,_0x1e0ad5){function _0x6596e7(_0x16d40a){_0x16d40a=_0x17e1('0xca')!==typeof _0x16d40a?!0x1:_0x16d40a;_0x291337[_0x17e1('0x51')]();window[_0x17e1('0x19')]['allowUpdate']=!0x1;_0x291337['cartIsEmpty']();'undefined'!==typeof window[_0x17e1('0x77')]&&_0x17e1('0xc')===typeof window[_0x17e1('0x77')]['exec']&&window[_0x17e1('0x77')][_0x17e1('0x78')]['call'](this);_0x17e1('0xc')===typeof adminCart&&adminCart();_0x29b0a1['fn']['simpleCart'](!0x0,void 0x0,_0x16d40a);_0x17e1('0xc')===typeof _0x1e0ad5&&_0x1e0ad5(_0x34367c);}_0xb2f5ff=_0xb2f5ff||0x1;if(0x1>_0xb2f5ff)return _0x34367c;if(_0x2f5194[_0x17e1('0x28')]){if('undefined'===typeof window[_0x17e1('0x19')][_0x17e1('0x76')]['items'][_0x405905[0x1]])return _0x33ce9a(_0x17e1('0xcb')+_0x405905[0x1]+']'),_0x34367c;window['_QuatroDigital_DropDown'][_0x17e1('0x76')][_0x17e1('0x81')][_0x405905[0x1]][_0x17e1('0xcc')]=_0xb2f5ff;window[_0x17e1('0x19')][_0x17e1('0x76')][_0x17e1('0x81')][_0x405905[0x1]][_0x17e1('0xcd')]=_0x405905[0x1];_0x151667[_0x17e1('0xce')]([window[_0x17e1('0x19')][_0x17e1('0x76')][_0x17e1('0x81')][_0x405905[0x1]]],[_0x17e1('0x81'),_0x17e1('0x7b'),_0x17e1('0x7c')])[_0x17e1('0xcf')](function(_0x34594e){window[_0x17e1('0x19')][_0x17e1('0x76')]=_0x34594e;_0x6596e7(!0x0);})[_0x17e1('0xc8')](function(_0xfd295c){_0x33ce9a([_0x17e1('0xd0'),_0xfd295c]);_0x6596e7();});}else _0x33ce9a(_0x17e1('0xd1'));};_0x291337[_0x17e1('0xd2')]=function(_0x5d6178,_0x5b3711){function _0x338080(_0xf3b957){_0xf3b957=_0x17e1('0xca')!==typeof _0xf3b957?!0x1:_0xf3b957;_0x17e1('0x3')!==typeof window[_0x17e1('0x77')]&&_0x17e1('0xc')===typeof window[_0x17e1('0x77')][_0x17e1('0x78')]&&window[_0x17e1('0x77')][_0x17e1('0x78')][_0x17e1('0x6a')](this);_0x17e1('0xc')===typeof adminCart&&adminCart();_0x29b0a1['fn'][_0x17e1('0x52')](!0x0,void 0x0,_0xf3b957);_0x17e1('0xc')===typeof _0x5b3711&&_0x5b3711(_0x5dea57);}var _0x5dea57=!0x1,_0x42aec5=_0x29b0a1(_0x5d6178)['attr']('data-sku-index');if(_0x2f5194['smartCheckout']){if(_0x17e1('0x3')===typeof window[_0x17e1('0x19')][_0x17e1('0x76')]['items'][_0x42aec5])return _0x33ce9a(_0x17e1('0xcb')+_0x42aec5+']'),_0x5dea57;window[_0x17e1('0x19')]['getOrderForm'][_0x17e1('0x81')][_0x42aec5][_0x17e1('0xcd')]=_0x42aec5;_0x151667[_0x17e1('0xd3')]([window[_0x17e1('0x19')][_0x17e1('0x76')][_0x17e1('0x81')][_0x42aec5]],[_0x17e1('0x81'),_0x17e1('0x7b'),_0x17e1('0x7c')])[_0x17e1('0xcf')](function(_0x2a6638){_0x5dea57=!0x0;window[_0x17e1('0x19')][_0x17e1('0x76')]=_0x2a6638;_0x3d0126(_0x2a6638);_0x338080(!0x0);})[_0x17e1('0xc8')](function(_0x470573){_0x33ce9a([_0x17e1('0xd4'),_0x470573]);_0x338080();});}else alert(_0x17e1('0xd5'));};_0x291337[_0x17e1('0x3d')]=function(_0x45220d,_0x2e0419,_0x167a83,_0x3731db){_0x3731db=_0x3731db||_0x29b0a1('.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2');_0x45220d=_0x45220d||'+';_0x2e0419=_0x2e0419||0.9*_0x3731db['height']();_0x3731db[_0x17e1('0xb6')](!0x0,!0x0)[_0x17e1('0xd6')]({'scrollTop':isNaN(_0x167a83)?_0x45220d+'='+_0x2e0419+'px':_0x167a83});};_0x2f5194[_0x17e1('0x4f')]||(_0x291337['getCartInfoByUrl'](),_0x29b0a1['fn'][_0x17e1('0x52')](!0x0));_0x29b0a1(window)['on'](_0x17e1('0xd7'),function(){try{window[_0x17e1('0x19')]['getOrderForm']=void 0x0,_0x291337[_0x17e1('0x51')]();}catch(_0x15a6e2){_0x33ce9a(_0x17e1('0xd8')+_0x15a6e2[_0x17e1('0xf')],_0x17e1('0xd9'));}});_0x17e1('0xc')===typeof _0x2f5194[_0x17e1('0xa')]?_0x2f5194['callback'][_0x17e1('0x6a')](this):_0x33ce9a(_0x17e1('0xda'));};_0x29b0a1['fn']['QD_dropDownCart']=function(_0xafc8d3){var _0x20d51b=_0x29b0a1(this);_0x20d51b['fn']=new _0x29b0a1['QD_dropDownCart'](this,_0xafc8d3);return _0x20d51b;};}catch(_0x55b1f9){_0x17e1('0x3')!==typeof console&&_0x17e1('0xc')===typeof console[_0x17e1('0xd')]&&console['error'](_0x17e1('0xe'),_0x55b1f9);}}(this));(function(_0xa7a6e4){try{var _0x18d4a3=jQuery;window[_0x17e1('0x77')]=window[_0x17e1('0x77')]||{};window[_0x17e1('0x77')][_0x17e1('0x81')]={};window['_QuatroDigital_AmountProduct'][_0x17e1('0xdb')]=!0x1;window[_0x17e1('0x77')][_0x17e1('0xdc')]=!0x1;window[_0x17e1('0x77')]['quickViewUpdate']=!0x1;var _0x50959d=function(){if(window[_0x17e1('0x77')][_0x17e1('0xdb')]){var _0x454df0=!0x1;var _0x470b1e={};window[_0x17e1('0x77')][_0x17e1('0x81')]={};for(_0xcc6174 in window[_0x17e1('0x19')][_0x17e1('0x76')]['items'])if(_0x17e1('0x10')===typeof window[_0x17e1('0x19')][_0x17e1('0x76')][_0x17e1('0x81')][_0xcc6174]){var _0x1c2223=window[_0x17e1('0x19')][_0x17e1('0x76')][_0x17e1('0x81')][_0xcc6174];_0x17e1('0x3')!==typeof _0x1c2223[_0x17e1('0xdd')]&&null!==_0x1c2223['productId']&&''!==_0x1c2223[_0x17e1('0xdd')]&&(window[_0x17e1('0x77')][_0x17e1('0x81')][_0x17e1('0xde')+_0x1c2223[_0x17e1('0xdd')]]=window[_0x17e1('0x77')][_0x17e1('0x81')][_0x17e1('0xde')+_0x1c2223[_0x17e1('0xdd')]]||{},window[_0x17e1('0x77')][_0x17e1('0x81')][_0x17e1('0xde')+_0x1c2223[_0x17e1('0xdd')]][_0x17e1('0xdf')]=_0x1c2223[_0x17e1('0xdd')],_0x470b1e[_0x17e1('0xde')+_0x1c2223['productId']]||(window[_0x17e1('0x77')][_0x17e1('0x81')]['prod_'+_0x1c2223[_0x17e1('0xdd')]][_0x17e1('0x6e')]=0x0),window[_0x17e1('0x77')][_0x17e1('0x81')][_0x17e1('0xde')+_0x1c2223[_0x17e1('0xdd')]][_0x17e1('0x6e')]+=_0x1c2223[_0x17e1('0xcc')],_0x454df0=!0x0,_0x470b1e[_0x17e1('0xde')+_0x1c2223[_0x17e1('0xdd')]]=!0x0);}var _0xcc6174=_0x454df0;}else _0xcc6174=void 0x0;window[_0x17e1('0x77')][_0x17e1('0xdb')]&&(_0x18d4a3('.qd-bap-wrapper')[_0x17e1('0xbd')](),_0x18d4a3(_0x17e1('0xe0'))[_0x17e1('0x37')]('qd-bap-item-added'));for(var _0x385b1c in window[_0x17e1('0x77')][_0x17e1('0x81')]){_0x1c2223=window['_QuatroDigital_AmountProduct']['items'][_0x385b1c];if('object'!==typeof _0x1c2223)return;_0x470b1e=_0x18d4a3('input.qd-productId[value='+_0x1c2223[_0x17e1('0xdf')]+']')[_0x17e1('0x92')]('li');if(window[_0x17e1('0x77')][_0x17e1('0xdb')]||!_0x470b1e['find'](_0x17e1('0xe1'))['length'])_0x454df0=_0x18d4a3('<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>'),_0x454df0[_0x17e1('0x32')]('.qd-bap-qtt')[_0x17e1('0x5e')](_0x1c2223[_0x17e1('0x6e')]),_0x1c2223=_0x470b1e[_0x17e1('0x32')](_0x17e1('0xe2')),_0x1c2223[_0x17e1('0x7')]?_0x1c2223[_0x17e1('0xe3')](_0x454df0)[_0x17e1('0x79')]('qd-bap-item-added'):_0x470b1e['prepend'](_0x454df0);}_0xcc6174&&(window[_0x17e1('0x77')][_0x17e1('0xdb')]=!0x1);};window[_0x17e1('0x77')][_0x17e1('0x78')]=function(){window[_0x17e1('0x77')][_0x17e1('0xdb')]=!0x0;_0x50959d[_0x17e1('0x6a')](this);};_0x18d4a3(document)['ajaxStop'](function(){_0x50959d[_0x17e1('0x6a')](this);});}catch(_0xa09792){_0x17e1('0x3')!==typeof console&&_0x17e1('0xc')===typeof console[_0x17e1('0xd')]&&console[_0x17e1('0xd')](_0x17e1('0xe'),_0xa09792);}}(this));(function(){try{var _0x523b5c=jQuery,_0x504bfe,_0x57a2bc={'selector':_0x17e1('0xe4'),'dropDown':{},'buyButton':{}};_0x523b5c[_0x17e1('0xe5')]=function(_0x50244a){var _0x4518c9={};_0x504bfe=_0x523b5c[_0x17e1('0xe6')](!0x0,{},_0x57a2bc,_0x50244a);_0x50244a=_0x523b5c(_0x504bfe[_0x17e1('0xe7')])['QD_dropDownCart'](_0x504bfe[_0x17e1('0xe8')]);_0x4518c9[_0x17e1('0xe9')]=_0x17e1('0x3')!==typeof _0x504bfe[_0x17e1('0xe8')][_0x17e1('0x4f')]&&!0x1===_0x504bfe['dropDown'][_0x17e1('0x4f')]?_0x523b5c(_0x504bfe['selector'])[_0x17e1('0xea')](_0x50244a['fn'],_0x504bfe[_0x17e1('0xe9')]):_0x523b5c(_0x504bfe[_0x17e1('0xe7')])[_0x17e1('0xea')](_0x504bfe[_0x17e1('0xe9')]);_0x4518c9[_0x17e1('0xe8')]=_0x50244a;return _0x4518c9;};_0x523b5c['fn']['smartCart']=function(){'object'===typeof console&&_0x17e1('0xc')===typeof console[_0x17e1('0x17')]&&console[_0x17e1('0x17')]('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x523b5c[_0x17e1('0xeb')]=_0x523b5c['fn']['smartCart'];}catch(_0x32b2ae){_0x17e1('0x3')!==typeof console&&'function'===typeof console[_0x17e1('0xd')]&&console[_0x17e1('0xd')](_0x17e1('0xe'),_0x32b2ae);}}());
var _0x1e35=['QuatroDigital.QD_socialPhotos.callback','object','function','error','warn','unshift','[Quatro\x20Digital\x20-\x20localStorage]\x0a','undefined','alerta','aviso','toLowerCase','info','apply','join','qdLocalStorage','setItem','getItem','setTime','getTime','message','_expiration','removeItem','Aeeee\x20irmão!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20obter\x20os\x20dados\x20no\x20armazenamento\x20local.\x20Detalhes:\x20','QD_socialPhotos','[Quatro\x20Digital\x20Social\x20Photos]\x0a','timer','extend','---','tag','length','innerHTML','each','<ul\x20class=\x27instagram-tags-container\x27/>','empty','append','url','\x27\x20title=\x27','title','\x27\x20/></li>','ajaxCallback','trigger','QuatroDigital.QD_socialPhotos.ajaxCallback','instagram','socialType','data','images','caption','text','photosQtty','photos','photo','url_m','beznghevfzb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','toUpperCase','ite','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','\x20+\x20&count=','flickr','https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=3&extras=url_m&api_key=','&user_id=','user','filterByTag','&tags=','parse','ajax','done','Aeeee\x20irmão!\x20Problemas\x20para\x20obter\x20os\x20dados\x20via\x20API\x20do\x20Flickr\x20:(\x20.\x20Detalhes:\x20','callback'];(function(_0x4f128f,_0x20a2e1){var _0x100e96=function(_0x463eeb){while(--_0x463eeb){_0x4f128f['push'](_0x4f128f['shift']());}};_0x100e96(++_0x20a2e1);}(_0x1e35,0x93));var _0x5a05=function(_0x476ee2,_0x427a40){_0x476ee2=_0x476ee2-0x0;var _0xf60f1b=_0x1e35[_0x476ee2];return _0xf60f1b;};(function(){var _0x263dd3=function(_0x4f7409,_0x40dbe7){if(_0x5a05('0x0')===typeof console&&_0x5a05('0x1')===typeof console[_0x5a05('0x2')]&&_0x5a05('0x1')===typeof console['info']&&_0x5a05('0x1')===typeof console[_0x5a05('0x3')]){var _0x137b6b;_0x5a05('0x0')===typeof _0x4f7409?(_0x4f7409[_0x5a05('0x4')](_0x5a05('0x5')),_0x137b6b=_0x4f7409):_0x137b6b=['[Quatro\x20Digital\x20-\x20localStorage]\x0a'+_0x4f7409];if(_0x5a05('0x6')===typeof _0x40dbe7||_0x5a05('0x7')!==_0x40dbe7['toLowerCase']()&&_0x5a05('0x8')!==_0x40dbe7[_0x5a05('0x9')]())if(_0x5a05('0x6')!==typeof _0x40dbe7&&_0x5a05('0xa')===_0x40dbe7[_0x5a05('0x9')]())try{console[_0x5a05('0xa')][_0x5a05('0xb')](console,_0x137b6b);}catch(_0x524f7b){console[_0x5a05('0xa')](_0x137b6b[_0x5a05('0xc')]('\x0a'));}else try{console['error'][_0x5a05('0xb')](console,_0x137b6b);}catch(_0x2cb37a){console[_0x5a05('0x2')](_0x137b6b[_0x5a05('0xc')]('\x0a'));}else try{console[_0x5a05('0x3')][_0x5a05('0xb')](console,_0x137b6b);}catch(_0x2bbe7a){console['warn'](_0x137b6b['join']('\x0a'));}}};window[_0x5a05('0xd')]=window[_0x5a05('0xd')]||{};var _0x24b5bb=_0x5a05('0x6')!==typeof localStorage&&_0x5a05('0x6')!==typeof localStorage[_0x5a05('0xe')]&&_0x5a05('0x6')!==typeof localStorage[_0x5a05('0xf')];window['qdLocalStorage'][_0x5a05('0xe')]=function(_0x565d97,_0x2f832e,_0x37f297){try{if(!_0x24b5bb)return!0x1;var _0x43d4b8=new Date();localStorage[_0x5a05('0xe')](_0x565d97,_0x2f832e);isNaN(parseInt(_0x37f297))||(_0x43d4b8[_0x5a05('0x10')](_0x43d4b8[_0x5a05('0x11')]()+0xea60*_0x37f297),localStorage['setItem'](_0x565d97+'_expiration',_0x43d4b8[_0x5a05('0x11')]()));}catch(_0x5e6f90){_0x263dd3(['Aeeee\x20irmão!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20salvar\x20os\x20dados\x20no\x20armazenamento\x20local.\x20Detalhes:\x20',_0x5e6f90[_0x5a05('0x12')]],_0x5a05('0x7'));}};window['qdLocalStorage'][_0x5a05('0xf')]=function(_0x51f276){try{if(!_0x24b5bb)return!0x1;var _0x4b1a8e=new Date(),_0x3e4c54=parseInt(localStorage[_0x5a05('0xf')](_0x51f276+_0x5a05('0x13'))||0x0,0xa)||0x0;return _0x4b1a8e[_0x5a05('0x11')]()>_0x3e4c54?(localStorage[_0x5a05('0x14')]&&(localStorage[_0x5a05('0x14')](_0x51f276),localStorage['removeItem'](_0x51f276+_0x5a05('0x13'))),null):localStorage[_0x5a05('0xf')](_0x51f276);}catch(_0x204507){_0x263dd3([_0x5a05('0x15'),_0x204507[_0x5a05('0x12')]],_0x5a05('0x7'));}};}());(function(_0x475351){var _0x472195=jQuery;if('function'!==typeof _0x472195['fn'][_0x5a05('0x16')]){var _0x34e70c=function(_0x401dc3,_0x268ce7){if(_0x5a05('0x0')===typeof console&&_0x5a05('0x1')===typeof console['error']&&_0x5a05('0x1')===typeof console['info']&&_0x5a05('0x1')===typeof console[_0x5a05('0x3')]){var _0xf16cc2;_0x5a05('0x0')===typeof _0x401dc3?(_0x401dc3[_0x5a05('0x4')]('[Quatro\x20Digital\x20Social\x20Photos]\x0a'),_0xf16cc2=_0x401dc3):_0xf16cc2=[_0x5a05('0x17')+_0x401dc3];if('undefined'===typeof _0x268ce7||_0x5a05('0x7')!==_0x268ce7[_0x5a05('0x9')]()&&_0x5a05('0x8')!==_0x268ce7['toLowerCase']())if('undefined'!==typeof _0x268ce7&&'info'===_0x268ce7[_0x5a05('0x9')]())try{console[_0x5a05('0xa')][_0x5a05('0xb')](console,_0xf16cc2);}catch(_0x2b874d){console[_0x5a05('0xa')](_0xf16cc2[_0x5a05('0xc')]('\x0a'));}else try{console['error']['apply'](console,_0xf16cc2);}catch(_0xfa8f15){console['error'](_0xf16cc2[_0x5a05('0xc')]('\x0a'));}else try{console[_0x5a05('0x3')][_0x5a05('0xb')](console,_0xf16cc2);}catch(_0x1e9fa4){console[_0x5a05('0x3')](_0xf16cc2['join']('\x0a'));}}};_0x472195['fn'][_0x5a05('0x16')]=function(_0x33e24e,_0x5dd802){function _0x48db25(){_0x37917b['disableReload']||setInterval(function(){_0x30e220();},_0x37917b[_0x5a05('0x18')]);}var _0x3acfc3=[],_0x4a176f=0x0;var _0x3e7020=_0x472195(this);if(!_0x3e7020['length'])return _0x3e7020;var _0x37917b=_0x472195[_0x5a05('0x19')]({},{'photosQtty':0x5,'tag':_0x5a05('0x1a'),'timer':0x3e8,'disableReload':!0x0,'socialType':'flickr','user':null,'filterByTag':!0x1,'ajaxCallback':function(_0x52d76d,_0x36d057,_0x5e67fe){},'callback':function(_0x5d2428,_0x3e99cd,_0xe328b1){}},_0x5dd802);0x2d0>_0x37917b['timer']&&(_0x37917b[_0x5a05('0x18')]=0x2d0);if(null!=_0x37917b[_0x5a05('0x1b')])var _0x2b772f=_0x37917b[_0x5a05('0x1b')];else{var _0x1e3dbf=_0x472195('#qd-instragram-hash-tag');_0x1e3dbf[_0x5a05('0x1c')]&&(_0x2b772f=_0x1e3dbf[0x0][_0x5a05('0x1d')]);}var _0x475351=function(){_0x3e7020[_0x5a05('0x1e')](function(){var _0x4b1541=_0x472195(_0x5a05('0x1f'));_0x472195(this)[_0x5a05('0x20')]()[_0x5a05('0x21')](_0x4b1541);for(var _0xe5ea43 in _0x3acfc3)_0x5a05('0x1')!==typeof _0x3acfc3[_0xe5ea43]&&_0x4b1541[_0x5a05('0x21')]('<li><img\x20src=\x27'+_0x3acfc3[_0xe5ea43][_0x5a05('0x22')]+_0x5a05('0x23')+_0x3acfc3[_0xe5ea43][_0x5a05('0x24')]+_0x5a05('0x25'));_0x37917b[_0x5a05('0x26')](_0x4a176f,_0x3e7020,_0x2b772f);_0x472195(window)[_0x5a05('0x27')](_0x5a05('0x28'),{'_length':_0x4a176f,'$this':_0x3e7020,'tag':_0x2b772f});});_0x48db25();};var _0x270c0e=function(_0x1234e1){try{if(_0x5a05('0x29')===_0x37917b[_0x5a05('0x2a')]){_0x4a176f=_0x1234e1[_0x5a05('0x2b')][_0x5a05('0x1c')];for(var _0x53cda2=0x0;_0x53cda2<_0x37917b['photosQtty']&&_0x53cda2<_0x4a176f;_0x53cda2++)_0x5a05('0x1')!==typeof _0x1234e1[_0x5a05('0x2b')][_0x53cda2]&&_0x3acfc3['push']({'url':_0x1234e1['data'][_0x53cda2][_0x5a05('0x2c')]['low_resolution']['url'],'title':_0x1234e1[_0x5a05('0x2b')][_0x53cda2][_0x5a05('0x2d')]?_0x1234e1[_0x5a05('0x2b')][_0x53cda2]['caption'][_0x5a05('0x2e')]:''});}else if('flickr'===_0x37917b[_0x5a05('0x2a')])for(_0x4a176f=_0x1234e1['photos']['total'],_0x53cda2=0x0;_0x53cda2<_0x37917b[_0x5a05('0x2f')]&&_0x53cda2<_0x4a176f;_0x53cda2++)_0x5a05('0x1')!==typeof _0x1234e1[_0x5a05('0x30')][_0x5a05('0x31')][_0x53cda2]&&_0x3acfc3['push']({'url':_0x1234e1[_0x5a05('0x30')][_0x5a05('0x31')][_0x53cda2][_0x5a05('0x32')],'title':_0x1234e1[_0x5a05('0x30')]['photo'][_0x53cda2]['title']||''});_0x475351();}catch(_0x1c37c6){_0x34e70c(['Problemas\x20ao\x20organizar\x20as\x20fotos\x20retornadas\x20da\x20API.',_0x1c37c6[_0x5a05('0x12')]],'alerta');}};_0x1e3dbf=function(_0x2f435e){var _0x4c1127={'s':_0x5a05('0x33')};return function(_0x1b0373){var _0x5dd802=function(_0x3e9e62){return _0x3e9e62;};var _0x336ff2=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x1b0373=_0x1b0373['d'+_0x336ff2[0x10]+'c'+_0x336ff2[0x11]+'m'+_0x5dd802(_0x336ff2[0x1])+'n'+_0x336ff2[0xd]]['l'+_0x336ff2[0x12]+'c'+_0x336ff2[0x0]+'ti'+_0x5dd802('o')+'n'];var _0x314145=function(_0xb70a51){return escape(encodeURIComponent(_0xb70a51['replace'](/\./g,'¨')[_0x5a05('0x34')](/[a-zA-Z]/g,function(_0x3e787d){return String[_0x5a05('0x35')](('Z'>=_0x3e787d?0x5a:0x7a)>=(_0x3e787d=_0x3e787d['charCodeAt'](0x0)+0xd)?_0x3e787d:_0x3e787d-0x1a);})));};var _0xe228a5=_0x314145(_0x1b0373[[_0x336ff2[0x9],_0x5dd802('o'),_0x336ff2[0xc],_0x336ff2[_0x5dd802(0xd)]][_0x5a05('0xc')]('')]);_0x314145=_0x314145((window[['js',_0x5dd802('no'),'m',_0x336ff2[0x1],_0x336ff2[0x4][_0x5a05('0x36')](),_0x5a05('0x37')][_0x5a05('0xc')]('')]||'---')+['.v',_0x336ff2[0xd],'e',_0x5dd802('x'),'co',_0x5dd802('mm'),_0x5a05('0x38'),_0x336ff2[0x1],'.c',_0x5dd802('o'),'m.',_0x336ff2[0x13],'r'][_0x5a05('0xc')](''));for(var _0x33e24e in _0x4c1127){if(_0x314145===_0x33e24e+_0x4c1127[_0x33e24e]||_0xe228a5===_0x33e24e+_0x4c1127[_0x33e24e]){var _0x3d1dbb='tr'+_0x336ff2[0x11]+'e';break;}_0x3d1dbb='f'+_0x336ff2[0x0]+'ls'+_0x5dd802(_0x336ff2[0x1])+'';}_0x5dd802=!0x1;-0x1<_0x1b0373[[_0x336ff2[0xc],'e',_0x336ff2[0x0],'rc',_0x336ff2[0x9]]['join']('')][_0x5a05('0x39')](_0x5a05('0x3a'))&&(_0x5dd802=!0x0);return[_0x3d1dbb,_0x5dd802];}(_0x2f435e);}(window);if(!eval(_0x1e3dbf[0x0]))return _0x1e3dbf[0x1]?_0x34e70c(_0x5a05('0x3b')):!0x1;var _0x30e220=function(){if(_0x5a05('0x29')===_0x37917b[_0x5a05('0x2a')])var _0x5dd802='https://api.instagram.com/v1/users/self/media/recent/?access_token='+_0x33e24e+_0x5a05('0x3c')+_0x37917b[_0x5a05('0x2f')];else _0x5a05('0x3d')===_0x37917b['socialType']&&(_0x5dd802=_0x5a05('0x3e')+_0x33e24e+_0x5a05('0x3f')+_0x37917b[_0x5a05('0x40')]+'&format=json&per_page='+_0x37917b['photosQtty']+'&jsoncallback=?',_0x37917b[_0x5a05('0x41')]&&(_0x5dd802=_0x5dd802+_0x5a05('0x42')+_0x37917b['filterByTag']));try{qdLocalStorage[_0x5a05('0xf')](_0x5a05('0x16')+_0x5dd802)&&_0x5a05('0x0')===typeof JSON?_0x270c0e(JSON[_0x5a05('0x43')](qdLocalStorage[_0x5a05('0xf')]('QD_socialPhotos'+_0x5dd802))):_0x472195[_0x5a05('0x44')]({'url':_0x5dd802,'dataType':'jsonp','cache':!0x0,'success':_0x270c0e})[_0x5a05('0x45')](function(_0x33c801){_0x5a05('0x0')===typeof JSON&&qdLocalStorage['setItem']('QD_socialPhotos'+_0x5dd802,JSON['stringify'](_0x33c801),0x3c);});}catch(_0x563f8e){_0x34e70c([_0x5a05('0x46'),_0x563f8e[_0x5a05('0x12')]],_0x5a05('0x7'));}};_0x30e220();_0x37917b[_0x5a05('0x47')](!0x0,_0x3e7020,_0x2b772f);_0x472195(window)[_0x5a05('0x27')](_0x5a05('0x48'),{'allowExec':!0x0,'$this':_0x3e7020,'tag':_0x2b772f});return _0x3e7020;};}}(this));
var _0x26f3=['data-qdssr-title','find','each','push','text','length','Desculpe,\x20não\x20foi\x20possível\x20executar\x20sua\x20solicitação.\x20Por\x20favor\x20entre\x20em\x20contato\x20com\x20o\x20SAC.','beznghevfzb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','toUpperCase','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','options','Nenhuma\x20opção\x20foi\x20enviada,\x20é\x20esperado\x20um\x20array\x20com\x20sub\x20arrays\x20contendo\x20o\x20conjunto\x20chave/valor.','data-qdssr-ndx','message','Problemas\x20ao\x20tentar\x20verificar\x20as\x20opções\x20selecionadas.\x20Detalhes:\x20','optionsPlaceHolder','<div\x20class=\x22qd-ssr2-option-wrapper\x22>','<label\x20for=\x22qd-ssr2-select-','labelMessage','<select\x20data-qdssr-ndx=\x22','\x22\x20data-qdssr-title=\x22','disabledMessage','</select></div>','appendTo','add','select2','bind','change','val','trim','trigger','body','qd-ssr-reloading','redirect','split','addClass','qd-ssr-loading','qd-ssr2-loading','qdAjax','html','removeAttr','<option\x20value=\x22\x22></option>','getAjaxOptions','ajaxError','removeClass','Problemas\x20:(\x20.\x20Detalhes:\x20','select[data-qdssr-ndx=','<option\x20value=\x22','\x22\x20data-qdssr-text=\x22','</option>','getCategory','cache','script:not([src])','innerHTML','indexOf','buscapagina','match','pop','extend','qdPlugin','.qd_auto_select_smart_research_2','function','QD_SelectSmartResearch2','undefined','error','info','warn','alerta','aviso','toLowerCase','apply','join','Selecione\x20o\x20anterior','Selecione\x20o(a)\x20','location','href','.search-single-navigator\x20ul.','attr'];(function(_0x376a99,_0x1bca1b){var _0x5cc8dc=function(_0x125c2b){while(--_0x125c2b){_0x376a99['push'](_0x376a99['shift']());}};_0x5cc8dc(++_0x1bca1b);}(_0x26f3,0x95));var _0x343d=function(_0x3c9197,_0x2f6e4a){_0x3c9197=_0x3c9197-0x0;var _0x482768=_0x26f3[_0x3c9197];return _0x482768;};(function(_0x78e05d){var _0x581f39=jQuery;if(_0x343d('0x0')!==typeof _0x581f39['fn'][_0x343d('0x1')]){_0x581f39['fn'][_0x343d('0x1')]=function(){};var _0x20f9e6=function(_0x724b6e,_0x7b972c){if('object'===typeof console&&_0x343d('0x2')!==typeof console[_0x343d('0x3')]&&_0x343d('0x2')!==typeof console[_0x343d('0x4')]&&_0x343d('0x2')!==typeof console[_0x343d('0x5')]){var _0xe16e92;'object'===typeof _0x724b6e?(_0x724b6e['unshift']('[Quatro\x20Digital\x20-\x20QD\x20Select\x20Smart\x20Research\x202]\x0a'),_0xe16e92=_0x724b6e):_0xe16e92=['[Quatro\x20Digital\x20-\x20QD\x20Select\x20Smart\x20Research\x202]\x0a'+_0x724b6e];if(_0x343d('0x2')===typeof _0x7b972c||_0x343d('0x6')!==_0x7b972c['toLowerCase']()&&_0x343d('0x7')!==_0x7b972c[_0x343d('0x8')]())if(_0x343d('0x2')!==typeof _0x7b972c&&_0x343d('0x4')===_0x7b972c[_0x343d('0x8')]())try{console['info'][_0x343d('0x9')](console,_0xe16e92);}catch(_0xca0ab6){try{console[_0x343d('0x4')](_0xe16e92[_0x343d('0xa')]('\x0a'));}catch(_0x2339a8){}}else try{console[_0x343d('0x3')][_0x343d('0x9')](console,_0xe16e92);}catch(_0x1c72d9){try{console['error'](_0xe16e92[_0x343d('0xa')]('\x0a'));}catch(_0x9cb493){}}else try{console[_0x343d('0x5')]['apply'](console,_0xe16e92);}catch(_0x313bfe){try{console[_0x343d('0x5')](_0xe16e92['join']('\x0a'));}catch(_0x4ec143){}}}},_0x206464={'options':[],'optionsPlaceHolder':[],'disabledMessage':function(_0x15b99c,_0x1b542d,_0x306b38){return _0x343d('0xb');},'labelMessage':function(_0xe455cc,_0x29d875,_0x41f2ea){return _0x343d('0xc')+_0x41f2ea[_0xe455cc];},'redirect':function(_0x2cd3b2){window[_0x343d('0xd')][_0x343d('0xe')]=_0x2cd3b2;},'getAjaxOptions':function(_0x5e29b6,_0x1b7109){var _0x5bcd08=[];_0x581f39(_0x5e29b6)['find'](_0x343d('0xf')+_0x1b7109[_0x343d('0x10')](_0x343d('0x11')))[_0x343d('0x12')]('a')[_0x343d('0x13')](function(){var _0x1b7109=_0x581f39(this);_0x5bcd08[_0x343d('0x14')]([_0x1b7109[_0x343d('0x15')]()['trim'](),_0x1b7109['attr'](_0x343d('0xe'))||'']);});return _0x5bcd08;},'optionIsChecked':function(_0x16b2c3){_0x16b2c3=_0x581f39('h5.'+_0x16b2c3+'\x20+ul\x20.filtro-ativo:first')[_0x343d('0x15')]()['trim']();return _0x16b2c3[_0x343d('0x16')]?_0x16b2c3:null;},'ajaxError':function(){_0x20f9e6(_0x343d('0x17'));}};_0x78e05d=function(_0x2d0327){var _0x3b752f={'s':_0x343d('0x18')};return function(_0x217b7e){var _0x219275=function(_0x21ebb5){return _0x21ebb5;};var _0x8ff613=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x217b7e=_0x217b7e['d'+_0x8ff613[0x10]+'c'+_0x8ff613[0x11]+'m'+_0x219275(_0x8ff613[0x1])+'n'+_0x8ff613[0xd]]['l'+_0x8ff613[0x12]+'c'+_0x8ff613[0x0]+'ti'+_0x219275('o')+'n'];var _0x5c1204=function(_0x390557){return escape(encodeURIComponent(_0x390557[_0x343d('0x19')](/\./g,'¨')[_0x343d('0x19')](/[a-zA-Z]/g,function(_0x377903){return String[_0x343d('0x1a')](('Z'>=_0x377903?0x5a:0x7a)>=(_0x377903=_0x377903['charCodeAt'](0x0)+0xd)?_0x377903:_0x377903-0x1a);})));};var _0x2f72e5=_0x5c1204(_0x217b7e[[_0x8ff613[0x9],_0x219275('o'),_0x8ff613[0xc],_0x8ff613[_0x219275(0xd)]]['join']('')]);_0x5c1204=_0x5c1204((window[['js',_0x219275('no'),'m',_0x8ff613[0x1],_0x8ff613[0x4][_0x343d('0x1b')](),_0x343d('0x1c')]['join']('')]||_0x343d('0x1d'))+['.v',_0x8ff613[0xd],'e',_0x219275('x'),'co',_0x219275('mm'),_0x343d('0x1e'),_0x8ff613[0x1],'.c',_0x219275('o'),'m.',_0x8ff613[0x13],'r'][_0x343d('0xa')](''));for(var _0x3f1ebf in _0x3b752f){if(_0x5c1204===_0x3f1ebf+_0x3b752f[_0x3f1ebf]||_0x2f72e5===_0x3f1ebf+_0x3b752f[_0x3f1ebf]){var _0x22c973='tr'+_0x8ff613[0x11]+'e';break;}_0x22c973='f'+_0x8ff613[0x0]+'ls'+_0x219275(_0x8ff613[0x1])+'';}_0x219275=!0x1;-0x1<_0x217b7e[[_0x8ff613[0xc],'e',_0x8ff613[0x0],'rc',_0x8ff613[0x9]][_0x343d('0xa')]('')]['indexOf'](_0x343d('0x1f'))&&(_0x219275=!0x0);return[_0x22c973,_0x219275];}(_0x2d0327);}(window);if(!eval(_0x78e05d[0x0]))return _0x78e05d[0x1]?_0x20f9e6('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x581f39[_0x343d('0x1')]=function(_0x153b30,_0x103509){if(!_0x103509[_0x343d('0x20')][_0x343d('0x16')])return _0x20f9e6(_0x343d('0x21'));_0x153b30[_0x343d('0x13')](function(){try{var _0x1f7bd6=_0x581f39(this),_0x230899=_0x6fbde6(_0x1f7bd6,_0x103509,_0x153b30);_0x2b7b20(_0x1f7bd6,_0x103509,0x0);_0x230899['on']('QuatroDigital.ssrSelectAjaxPopulated',function(_0x5de8a7,_0x491026){try{_0x2b7b20(_0x1f7bd6,_0x103509,_0x491026[_0x343d('0x10')](_0x343d('0x22')));}catch(_0x4b028a){_0x20f9e6('Problemas\x20ao\x20definir\x20a\x20opção\x20selecionada.\x20Detalhes:\x20'+_0x4b028a[_0x343d('0x23')]);}});_0x1f7bd6['addClass']('qd-ssr2-loaded');}catch(_0x10b362){_0x20f9e6(_0x343d('0x24')+_0x10b362['message']);}});};var _0x6fbde6=function(_0x4181d8,_0x4a244f,_0x3d5c89){try{for(var _0x1eda93='',_0x4e61d5,_0x78e05d=!0x0,_0x52b4ce=new _0x581f39(),_0x4da153=!0x1,_0x2c968a=0x0,_0x51348d=0x0;_0x51348d<_0x4a244f[_0x343d('0x20')]['length'];_0x51348d++){'object'!==typeof _0x4a244f['options'][_0x51348d]&&(_0x78e05d=!0x1);var _0x521a99=_0x4a244f[_0x343d('0x25')][_0x51348d]||'',_0x24caa4=_0x3d5c89['index'](_0x4181d8);_0x1eda93=_0x343d('0x26');_0x1eda93+=_0x343d('0x27')+_0x51348d+_0x24caa4+'\x22>'+_0x4a244f[_0x343d('0x28')](_0x51348d,_0x4a244f[_0x343d('0x20')],_0x4a244f[_0x343d('0x25')])+'</label>';_0x1eda93+=_0x343d('0x29')+_0x51348d+'\x22\x20id=\x22qd-ssr2-select-'+_0x51348d+_0x24caa4+_0x343d('0x2a')+_0x521a99+'\x22>';_0x1eda93+='<option\x20value=\x22\x22></option>';_0x78e05d?_0x1eda93+=_0x3f2138(_0x4a244f['options'][_0x51348d]):_0x521a99=_0x4a244f[_0x343d('0x2b')](_0x51348d,_0x4a244f[_0x343d('0x20')],_0x4a244f[_0x343d('0x25')]);_0x1eda93+=_0x343d('0x2c');_0x4e61d5=_0x581f39(_0x1eda93);_0x4e61d5[_0x343d('0x2d')](_0x4181d8);var _0x2316de=_0x4e61d5[_0x343d('0x12')]('select');_0x52b4ce=_0x52b4ce[_0x343d('0x2e')](_0x2316de);_0x78e05d||_0x2316de[_0x343d('0x10')]({'disabled':!0x0,'data-qdssr-str':_0x4a244f[_0x343d('0x20')][_0x51348d]});_0x2316de[_0x343d('0x2f')]({'placeholder':_0x521a99,'language':'pt-BR'});_0x2316de[_0x343d('0x30')](_0x343d('0x31'),function(_0x233836,_0x4a32a4){var _0x17e3b3=_0x581f39(this),_0x35f6c9=_0x4181d8['find']('select[data-qdssr-ndx='+(parseInt(_0x17e3b3['attr'](_0x343d('0x22'))||0x0,0xa)+0x1)+']'),_0x78e05d=(_0x17e3b3[_0x343d('0x32')]()||'')[_0x343d('0x33')]();_0x4a32a4||(_0x4da153=!0x0);_0x581f39(window)[_0x343d('0x34')]('QuatroDigital.ssrChange',[_0x35f6c9,_0x4da153]);!_0x35f6c9[_0x343d('0x16')]&&(!_0x4a32a4||_0x4da153&&_0x78e05d[_0x343d('0x16')])&&(_0x581f39(document[_0x343d('0x35')])['addClass'](_0x343d('0x36')),_0x4a244f[_0x343d('0x37')](_0x78e05d));_0x78e05d=_0x78e05d[_0x343d('0x38')]('#')['shift']()[_0x343d('0x38')]('?');_0x78e05d[0x1]=(_0x35f6c9[_0x343d('0x10')]('data-qdssr-str')||'')+'&'+(_0x78e05d[0x1]||'');_0x581f39(document[_0x343d('0x35')])[_0x343d('0x39')](_0x343d('0x3a'));_0x4e61d5[_0x343d('0x39')](_0x343d('0x3b'));_0x2c968a+=0x1;_0x581f39[_0x343d('0x3c')]({'url':_0x78e05d['join']('?'),'dataType':_0x343d('0x3d'),'success':function(_0x35a1bd){_0x35f6c9[_0x343d('0x3e')]('disabled');_0x35f6c9[_0x343d('0x3d')](_0x343d('0x3f')+_0x3f2138(_0x4a244f[_0x343d('0x40')](_0x35a1bd,_0x35f6c9)));_0x35f6c9[_0x343d('0x2f')]({'placeholder':_0x35f6c9[_0x343d('0x10')](_0x343d('0x11'))});_0x17e3b3['trigger']('QuatroDigital.ssrSelectAjaxPopulated',[_0x35f6c9]);},'error':function(){_0x4a244f[_0x343d('0x41')]['apply'](this,arguments);},'complete':function(){_0x4e61d5[_0x343d('0x42')]('qd-ssr2-loading');--_0x2c968a;0x0==_0x2c968a&&_0x581f39(document[_0x343d('0x35')])['removeClass']('qd-ssr-loading');},'clearQueueDelay':null});});}return _0x52b4ce;}catch(_0x28cecb){_0x20f9e6(_0x343d('0x43')+_0x28cecb[_0x343d('0x23')]);}},_0x2b7b20=function(_0x29e3f6,_0x4e77bc,_0x5cd569,_0x5c910b){_0x4e77bc=_0x4e77bc['optionIsChecked'](_0x4e77bc[_0x343d('0x25')][_0x5cd569]);null!==_0x4e77bc&&(_0x5c910b=_0x5c910b||_0x29e3f6[_0x343d('0x12')](_0x343d('0x44')+_0x5cd569+']'),_0x5c910b[_0x343d('0x32')](_0x5c910b[_0x343d('0x12')]('option[data-qdssr-text=\x27'+_0x4e77bc+'\x27]')[_0x343d('0x32')]())[_0x343d('0x34')]('change',!0x0));},_0x3f2138=function(_0x34d495){for(var _0x1c4ad9='',_0x479587=0x0;_0x479587<_0x34d495[_0x343d('0x16')];_0x479587++)_0x1c4ad9+=_0x343d('0x45')+(_0x34d495[_0x479587][0x1]||'')+_0x343d('0x46')+(_0x34d495[_0x479587][0x0]||'')['replace'](/\s\([0-9]+\)/,'')+'\x22>'+(_0x34d495[_0x479587][0x0]||'')+_0x343d('0x47');return _0x1c4ad9;};_0x581f39['QD_SelectSmartResearch2'][_0x343d('0x48')]=function(){if(_0x581f39[_0x343d('0x1')][_0x343d('0x48')][_0x343d('0x49')])return _0x581f39[_0x343d('0x1')]['getCategory'][_0x343d('0x49')];var _0x43a3c0=[],_0x49e372=[];_0x581f39(_0x343d('0x4a'))['each'](function(){var _0x52a455=_0x581f39(this)[0x0][_0x343d('0x4b')];if(-0x1<_0x52a455[_0x343d('0x4c')](_0x343d('0x4d')))return _0x43a3c0=(decodeURIComponent((_0x52a455['match'](/\/buscapagina([^\'\"]+)/i)||[''])['pop']())[_0x343d('0x4e')](/fq=c:[^\&]+/i)||[''])[_0x343d('0x4f')]()[_0x343d('0x38')](':')[_0x343d('0x4f')]()[_0x343d('0x19')](/(^\/|\/$)/g,'')[_0x343d('0x38')]('/'),!0x1;});for(var _0x536b79=0x0;_0x536b79<_0x43a3c0[_0x343d('0x16')];_0x536b79++)_0x43a3c0[_0x536b79]['length']&&_0x49e372[_0x343d('0x14')](_0x43a3c0[_0x536b79]);return _0x581f39['QD_SelectSmartResearch2'][_0x343d('0x48')]['cache']=_0x49e372;};_0x581f39[_0x343d('0x1')][_0x343d('0x48')]['cache']=null;_0x581f39['fn'][_0x343d('0x1')]=function(_0xf4cf6f){var _0x3ec7fc=_0x581f39(this);if(!_0x3ec7fc[_0x343d('0x16')])return _0x3ec7fc;_0xf4cf6f=_0x581f39[_0x343d('0x50')]({},_0x206464,_0xf4cf6f);_0x3ec7fc[_0x343d('0x51')]=new _0x581f39[(_0x343d('0x1'))](_0x3ec7fc,_0xf4cf6f);return _0x3ec7fc;};_0x581f39(function(){_0x581f39(_0x343d('0x52'))[_0x343d('0x1')]();});}}(this));
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);
/* Automatizador de comments box do Facebook // 1.6 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a=$(".fb-comments");a.length&&a.attr("data-href",document.location.href.split("#").shift().split("?").shift());$("#fb-root").length||$("body").append('<div id="fb-root"></div>');if(!$("script#facebook-jssdk").length){a=$("meta[property='fb:app_id']").attr("content")||!1;var b,c=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||(b=document.createElement("script"),b.id="facebook-jssdk",b.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+
(a?"&appId="+a:""),c.parentNode.insertBefore(b,c))}"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse()});
/* Quatro Digital - Scroll Toggle // 1.4 // Carlos Vinicius // Todos os direitos reservados */
(function(){var c=jQuery,e=function(a,d){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var b;"object"===typeof a?(a.unshift("[QD Scroll Toggle]\n"),b=a):b=["[QD Scroll Toggle]\n"+a];if("undefined"===typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===d.toLowerCase())try{console.info.apply(console,b)}catch(c){try{console.info(b.join("\n"))}catch(e){}}else try{console.error.apply(console,
b)}catch(h){try{console.error(b.join("\n"))}catch(k){}}else try{console.warn.apply(console,b)}catch(l){try{console.warn(b.join("\n"))}catch(m){}}}};"function"!==typeof c.QD_scrollToggle&&(c.QD_scrollToggle=function(a){var d=[];if("string"!==typeof a&&"number"!==typeof a||"auto"===a)if("auto"===a)d.push(c(window).height());else return e("N\u00e3o foi informado o limite de scroll necess\u00e1rio para adicionar o atributo.");else{var b=a.split(","),f;for(f in b)"function"!==typeof b[f]&&(a=parseInt(b[f].trim()),
isNaN(a)||d.push(a))}if(!d.length)return e("Aaeeeeeeee irm\u00e3o! N\u00e3o consegui encontrar nenhum valor para calcular o scroll");if(!document||!document.body||"undefined"===typeof document.body.setAttribute)return e('"document.body.setAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!document||!document.body||"undefined"===typeof document.body.removeAttribute)return e('"document.body.removeAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!document||!document.body||"undefined"===
typeof document.body.getAttribute)return e('"document.body.getAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!c(window).scrollTop||isNaN(parseInt(c(window).scrollTop())))return e('"$(window).scrollTop" n\u00e3o esta retornando um n\u00famero inteiro :(');try{document.body.setAttribute("data-qd-scroll",1),document.body.getAttribute("data-qd-scroll"),document.body.removeAttribute("data-qd-scroll"),document.body.getAttribute("data-qd-scroll")}catch(g){e("N\u00e3o foi poss\u00edvel fazer o passo a passo de consultar, adicionar e remover um atributo",
g.message)}c(window).scroll(function(){for(var a=0;a<d.length;a++)c(window).scrollTop()>d[a]?document.body.getAttribute("data-qd-scroll-"+a)||document.body.setAttribute("data-qd-scroll-"+a,1):document.body.getAttribute("data-qd-scroll-"+a)&&document.body.removeAttribute("data-qd-scroll-"+a)})},c(function(){var a=c("body[data-qd-scroll-limit]");a.length&&c.QD_scrollToggle(a.attr("data-qd-scroll-limit"))}))})();
"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});
(function(){var d=jQuery;if("function"!==typeof d.fn.QD_news){var w={defaultName:"Digite seu nome...",defaultEmail:"Digite seu e-mail...",nameField:".qd_news_name",checkNameFieldIsVisible:!0,emailField:".qd_news_email",btn:".qd_news_button",originField:".qd_news_origin",elementError:".nv2_messageError",elementSuccess:".nv2_messageSuccess",validationMethod:"popup",getAttr:"alt",setDefaultName:!0,checkNameExist:!0,validateName:!0,showInPopup:!0,animation:"blink",animateSpeed:100,animateDistance:15,
animateRepeat:3,animateFieldSuccess:".qd_news_animate_field_success",timeHideSuccessMsg:3E3,platform:"vtexcrm",vtexStore:jsnomeLoja,entity:"NL",allowSubmit:function(){return!0},successCallback:function(){},submitCallback:function(d,g){}};d.fn.QD_news=function(t){var g=function(a,d){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var e;"object"===typeof a?(a.unshift("[QD News]\n"),e=a):e=["[QD News]\n"+a];if("undefined"===
typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===d.toLowerCase())try{console.info.apply(console,e)}catch(c){console.info(e.join("\n"))}else try{console.error.apply(console,e)}catch(c){console.error(e.join("\n"))}else try{console.warn.apply(console,e)}catch(c){console.warn(e.join("\n"))}}},k=d(this);if(!k.length)return k;var a=d.extend({},w,t);a.showInPopup||(a.validationMethod="div");null!==a.animation?a.validationMethod="animateField":"animateField"==
a.validationMethod&&(a.animation="leftRight");if("popup"==a.validationMethod&&"function"!==typeof d.fn.vtexPopUp2)return g("O popUp2 n\u00e3o foi encontrado. Adicione o Plugin de PopUp2."),k;var v=function(d){var g=0;var e=function(){d.animate({left:"-="+a.animateDistance},a.animateSpeed,function(){d.animate({left:"+="+a.animateDistance},a.animateSpeed,function(){g<a.animateRepeat&&e();g++})})};var c=function(){d.fadeTo(a.animateSpeed,.2,function(){d.fadeTo(a.animateSpeed,1,function(){g<a.animateRepeat&&
c();g++})})};d.stop(!0,!0);"leftRight"==a.animation?e():"blink"==a.animation&&c()};k.each(function(){function k(b,q){l.attr("disabled","disabled");var f={postData:{newsletterClientEmail:b,newsletterClientName:a.defaultName==q?"-":q,newsInternalCampaign:"newsletter:opt-in",newsInternalPage:(document.location.pathname||"/").replace(/\//g,"_"),newsInternalPart:"newsletter"},button:l,wrapper:c};"linx"==a.platform&&(f.postData.nome=f.postData.newsletterClientName,f.postData.email=f.postData.newsletterClientEmail);
"vtexcrm"==a.platform?t(function(x){e(f,d.ajax({url:"//api.vtexcrm.com.br/"+a.vtexStore+"/dataentities/"+a.entity+"/documents",type:"PATCH",dataType:"json",headers:{Accept:"application/vnd.vtex.ds.v10+json","Content-Type":"application/json; charset=utf-8"},data:JSON.stringify({id:b.toLowerCase().replace(/[^a-z0-9]/ig,function(a){return"-"+a.charCodeAt(0)+"-"}),ip:x,origin:c.find(a.originField).val()||"---",qd_email:b,qd_name:q,URI:location.href})}))}):e(f,d.ajax({url:"linx"==a.platform?"/newsletter.aspx":
"/no-cache/Newsletter.aspx",type:"linx"==a.platform?"GET":"POST",data:f.postData}));a.submitCallback(b,q)}function t(a){d.ajax({url:"//api.ipify.org?format=jsonp",dataType:"jsonp",success:function(b){a(b.ip)},error:function(){d.ajax({url:"//freegeoip.net/json/",dataType:"json",success:function(b){a(b.ip)},error:function(b){a(null)}})}})}function e(b,e){e.fail(function(){alert("Desculpe. N\u00e3o foi poss\u00edvel cadastrar seu e-mail, por favor tente novamente.")});e.done(function(e){l.removeAttr("disabled");
if("linx"==a.platform&&!(-1<e.indexOf(" com sucesso.")||-1<e.indexOf(" cadastrado.")))return alert(e);"popup"==a.validationMethod?r.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterSuccess"}):"animateField"!=a.validationMethod&&r.slideDown().bind("click",function(){d(this).slideUp()});var f=c.find(a.emailField);a.setDefaultName&&c.find(a.nameField).is("input:text, textarea")&&c.find(a.nameField).val(a.defaultName);if("animateField"==a.validationMethod){f.val(c.find(a.animateFieldSuccess).val()||
"Obrigado!!!");f.addClass("vtexNewsSuccess");var g=setTimeout(function(){f.removeClass("vtexNewsSuccess");f.val(a.defaultEmail);f.unbind("focus.vtexNews")},a.timeHideSuccessMsg);f.bind("focus.vtexNews",function(){f.removeClass("vtexNewsSuccess");clearTimeout(g);d(this).val("");d(this).unbind("focus.vtexNews")})}else f.val(a.defaultEmail);a.successCallback(b);d(c).trigger("qdNewsSuccessCallback",b)})}var c=d(this),m=c.find(a.nameField),h=c.find(a.emailField),l=c.find(a.btn);if("animateField"!=a.validationMethod){var n=
c.find(a.elementError);var r=c.find(a.elementSuccess)}1>m.length&&a.checkNameExist&&g("Campo de nome, n\u00e3o encontrado ("+m.selector+"). Ser\u00e1 atribuido um valor padr\u00e3o.","info");if(1>h.length)return g("Campo de e-mail, n\u00e3o encontrado ("+h.selector+")"),c;if(1>l.length)return g("Bot\u00e3o de envio, n\u00e3o encontrado ("+l.selector+")"),c;if("animateField"!=a.validationMethod&&(1>r.length||1>n.length))return g("A(s) mensagem(ns) de erro e/ou sucesso esta(m) faltando \n ("+r.selector+
", "+n.selector+")"),c;a.setDefaultName&&m.is("input[type=text], textarea")&&m.val(a.defaultName);h.val(a.defaultEmail);(function(){if(a.checkNameExist){if(a.checkNameFieldIsVisible){var b=m.filter(":visible");if(!b.length)return}else b=m;var c=b.val();b.is("input:text, textarea")&&b.bind({focus:function(){b.val()!=c||0!==b.val().search(a.defaultName.substr(0,6))&&!a.setDefaultName||b.val("")},blur:function(){""===b.val()&&b.val(c)}})}})();(function(){var b=h.val();h.bind({focus:function(){h.val()==
b&&0===h.val().search(a.defaultEmail.substr(0,6))&&h.val("")},blur:function(){""===h.val()&&h.val(b)}})})();var u=function(){var b;var e=(b=c.find(a.nameField).filter("input[type=text],select,textarea").val())?b:c.find(a.nameField).filter("input[type=radio], input[type=checkbox]").length?c.find(a.nameField).filter("input[type=radio]:checked, input[type=checkbox]:checked").val()||"":(b=c.find(a.nameField).attr(a.getAttr))?b:(b=c.find(a.nameField).text())?b:(b=c.find(a.nameField).find(".box-banner img:first").attr("alt"))?
b:"Nome_Padrao";b=(c.find(a.emailField).val()||"").trim();var f=c.find(a.nameField).is(":visible");f=a.validateName?(1>e.length||0===e.search(a.defaultName.substr(0,6)))&&(a.checkNameExist||f?f:!0):!1;var h=0>b.search(/^[a-z0-9_\-\.\+]+@[a-z0-9_\-]+(\.[a-z0-9_\-]{2,})+$/i);f||h?"animateField"==a.validationMethod?(f&&v(c.find(a.nameField)),h&&v(c.find(a.emailField))):"popup"==a.validationMethod?n.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterError"}):(n.slideDown().bind("click",function(){d(this).slideUp()}),
setTimeout(function(){n.slideUp()},1800)):a.allowSubmit()?k(b,e):g("Os dados n\u00e3o foram enviados pois o parametro 'allowSubmit' n\u00e3o retornou 'true'","info")};var p=function(a){13==(a.keyCode?a.keyCode:a.which)&&(a.preventDefault(),u())};m.filter("input:text, textarea").bind("keydown",p);h.bind("keydown",p);p=l.getParent("form");p.length?p.submit(function(a){a.preventDefault();u()}):l.bind("click.qd_news",function(){u()})});return k};d(function(){d(".qd_news_auto").QD_news()})}})();
/* Quatro Digital - VTEX Checkout Queue // 1.1 //  Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
(function(){var l=function(a,c){if("object"===typeof console){var d="object"===typeof a;"undefined"!==typeof c&&"alerta"===c.toLowerCase()?d?console.warn("[QD VTEX Checkout Queue]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.warn("[QD VTEX Checkout Queue]\n"+a):"undefined"!==typeof c&&"info"===c.toLowerCase()?d?console.info("[QD VTEX Checkout Queue]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.info("[QD VTEX Checkout Queue]\n"+a):d?console.error("[QD VTEX Checkout Queue]\n",a[0],a[1],
a[2],a[3],a[4],a[5],a[6],a[7]):console.error("[QD VTEX Checkout Queue]\n"+a)}},f=null,g={},h={},e={};$.QD_checkoutQueue=function(a,c){if(null===f)if("object"===typeof window.vtexjs&&"undefined"!==typeof window.vtexjs.checkout)f=window.vtexjs.checkout;else return l("N\u00e3o foi encontrada a biblioteca VTEX.js. Este componente para por aqui, a for\u00e7a n\u00e3o esta mais contigo neste jornada! Para resolver isto inclua a biblioteca VTEX.js");var d=$.extend({done:function(){},fail:function(){}},c),
b=a.join(";"),k=function(){g[b].add(d.done);h[b].add(d.fail)};e[b]?k():(g[b]=$.Callbacks(),h[b]=$.Callbacks(),k(),e[b]=!0,f.getOrderForm(a).done(function(a){e[b]=!1;g[b].fire(a)}).fail(function(a){e[b]=!1;h[b].fire(a)}))}})();
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs();a.trigger("QuatroDigital.pt_callback",[a])}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return a.length?$.extend({},a,new b(a)):a},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();
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

// vtex url parse
/* Quatro Digital - VTEX URL Parse // 1.4 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
var _0x8349=["\x6C\x69\x6E\x6B","\x3C\x61\x20\x68\x72\x65\x66\x3D\x22","\x22\x3E\x3C\x2F\x61\x3E","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\x66\x75\x6E\x63\x74\x69\x6F\x6E","\x65\x72\x72\x6F\x72","\x50\x72\x6F\x62\x6C\x65\x6D\x61\x73\x20\x3A\x28\x20\x2E\x20\x44\x65\x74\x61\x6C\x68\x65\x73\x3A\x20","\x2F","\x73\x70\x6C\x69\x74","","\x72\x65\x70\x6C\x61\x63\x65","\x70\x61\x74\x68\x6E\x61\x6D\x65","\x2C","\x70\x6F\x70","\x6D\x61\x74\x63\x68","\x73\x65\x61\x72\x63\x68","\x6C\x65\x6E\x67\x74\x68","\x6F\x62\x6A\x65\x63\x74","\x70\x75\x73\x68","\x63","\x6D\x61\x70","\x73\x68\x69\x66\x74","\x6F\x74\x68\x65\x72\x5F\x70\x61\x74\x68","\x6F\x74\x68\x65\x72\x5F\x73\x65\x61\x72\x63\x68","\x26","\x6F\x75\x74","\x67\x65\x74\x4D\x61\x70","\x70\x72\x6F\x74\x6F\x74\x79\x70\x65","\x6D\x65\x72\x67\x65\x55\x72\x6C","\x63\x61\x6C\x6C","\x65\x78\x74\x65\x6E\x64","\x67\x65\x74\x55\x72\x6C","\x6D\x61\x70\x3D","\x6A\x6F\x69\x6E","\x3F","\x51\x44\x5F\x56\x74\x65\x78\x55\x72\x6C\x50\x61\x72\x73\x65"];(function(){function _0x6ac7x1(_0x6ac7x2){try{this[_0x8349[0]]=$(_0x8349[1]+_0x6ac7x2+_0x8349[2])[0]}catch(c){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],c)}}function _0x6ac7x3(_0x6ac7x2){try{_0x6ac7x2=_0x6ac7x2||this[_0x8349[0]];var _0x6ac7x4=_0x6ac7x2[_0x8349[11]][_0x8349[10]](/\/\//g,_0x8349[7])[_0x8349[10]](/(^\/|\/$)/g,_0x8349[9])[_0x8349[8]](_0x8349[7]),_0x6ac7x5=((_0x6ac7x2[_0x8349[15]]||_0x8349[9])[_0x8349[14]](/map\=([^&]+)/i)||[_0x8349[9]])[_0x8349[13]]()[_0x8349[8]](_0x8349[12]);if(1==_0x6ac7x5[_0x8349[16]]&&0==_0x6ac7x5[0][_0x8349[16]]){if(_0x8349[17]== typeof defaultMap){_0x6ac7x5=defaultMap}else {for(var _0x6ac7x6=0;_0x6ac7x6<_0x6ac7x4[_0x8349[16]];_0x6ac7x6++){_0x6ac7x4[_0x6ac7x6][_0x8349[16]]&&_0x8349[7]!=_0x6ac7x4[_0x6ac7x6]&&_0x6ac7x5[_0x8349[18]](defaultMap)}}};for(var _0x6ac7x6={map:{},other_path:_0x8349[9]},_0x6ac7x7=0;_0x6ac7x7<_0x6ac7x5[_0x8349[16]];_0x6ac7x7++){_0x6ac7x5[_0x6ac7x7][_0x8349[16]]&&(_0x8349[19]==_0x6ac7x5[_0x6ac7x7]?(_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]=_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]||[],_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]][_0x8349[18]]((_0x6ac7x4||[_0x8349[9]])[_0x8349[21]]())):_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]=(_0x6ac7x4||[_0x8349[9]])[_0x8349[21]]())};_0x6ac7x6[_0x8349[22]]=_0x6ac7x4;_0x6ac7x6[_0x8349[23]]=(_0x6ac7x2[_0x8349[15]]||_0x8349[9])[_0x8349[10]](/map\=([^&]+)/ig,_0x8349[9])[_0x8349[10]](/\&\&+/ig,_0x8349[24])[_0x8349[10]](/\?/g,_0x8349[9]);return this[_0x8349[25]]=_0x6ac7x6}catch(g){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],g)}}_0x6ac7x1[_0x8349[27]][_0x8349[26]]=_0x6ac7x3;_0x6ac7x1[_0x8349[27]][_0x8349[28]]=function(_0x6ac7x2,_0x6ac7x4){try{var _0x6ac7x5=_0x6ac7x3[_0x8349[29]](this,this[_0x8349[0]]),_0x6ac7x6=_0x6ac7x3[_0x8349[29]](this,$(_0x8349[1]+_0x6ac7x2+_0x8349[2])[0]);_0x6ac7x5[_0x8349[22]][_0x8349[16]]||(_0x6ac7x5[_0x8349[22]]=void(0));_0x6ac7x5[_0x8349[23]][_0x8349[16]]||(_0x6ac7x5[_0x8349[23]]=void(0));var _0x6ac7x7=$[_0x8349[30]](!0,{},_0x6ac7x6,_0x6ac7x5);if(_0x8349[17]== typeof _0x6ac7x4){for(_0x6ac7x6=0;_0x6ac7x6<_0x6ac7x4[_0x8349[16]];_0x6ac7x6++){_0x6ac7x7[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]]&&(_0x6ac7x7[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]]=_0x6ac7x5[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]])}};return this[_0x8349[25]]=_0x6ac7x7}catch(g){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],g)}};_0x6ac7x1[_0x8349[27]][_0x8349[31]]=function(_0x6ac7x2){try{var _0x6ac7x4=[],_0x6ac7x5=[];_0x6ac7x2=_0x6ac7x2||{};for(var _0x6ac7x6 in this[_0x8349[25]][_0x8349[20]]){if(!_0x6ac7x2[_0x6ac7x6]){if(_0x8349[19]==_0x6ac7x6){for(var _0x6ac7x7=0;_0x6ac7x7<this[_0x8349[25]][_0x8349[20]][_0x6ac7x6][_0x8349[16]];_0x6ac7x7++){_0x6ac7x4[_0x8349[18]](this[_0x8349[25]][_0x8349[20]][_0x6ac7x6][_0x6ac7x7]),_0x6ac7x5[_0x8349[18]](_0x6ac7x6)}}else {_0x6ac7x4[_0x8349[18]](this[_0x8349[25]][_0x8349[20]][_0x6ac7x6]),_0x6ac7x5[_0x8349[18]](_0x6ac7x6)}}};var _0x6ac7x8=_0x6ac7x5[_0x8349[16]]?_0x8349[32]+_0x6ac7x5[_0x8349[33]](_0x8349[12])+_0x8349[24]:_0x8349[9];return _0x8349[7]+_0x6ac7x4[_0x8349[33]](_0x8349[7])+(this[_0x8349[25]][_0x8349[22]][_0x8349[16]]?_0x8349[7]+this[_0x8349[25]][_0x8349[22]][_0x8349[33]](_0x8349[7]):_0x8349[9])+_0x8349[34]+(_0x6ac7x8+this[_0x8349[25]][_0x8349[23]])[_0x8349[10]](/\&\&+/g,_0x8349[24])}catch(_0x6ac7x1){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],_0x6ac7x1)}};window[_0x8349[35]]=_0x6ac7x1})()
