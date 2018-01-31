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
var _0x19af=['qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd-am-banner','filter','.qd-am-collection','length','parent','qdAjax','url','html','img[alt=\x27','attr','data-qdam-value','getParent','.box-banner','clone','insertBefore','hide','qd-am-content-loaded','text','trim','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','trigger','QuatroDigital.am.ajaxCallback','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','children','first','replaceSpecialChars','>li','qd-amazing-menu','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','add','-li','callback','QuatroDigital.am.callback','exec','closest','function','/qd-amazing-menu','undefined','error','info','warn','object','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','apply','join','qdAmAddNdx','each','addClass','qd-am-li-','last','qd-am-last','QD_amazingMenu','replace','fromCharCode','charCodeAt','toUpperCase','ite'];(function(_0x52522e,_0x86729e){var _0xd65786=function(_0x45a757){while(--_0x45a757){_0x52522e['push'](_0x52522e['shift']());}};_0xd65786(++_0x86729e);}(_0x19af,0xba));var _0x3ede=function(_0x2908ca,_0x59dfc1){_0x2908ca=_0x2908ca-0x0;var _0x37434a=_0x19af[_0x2908ca];return _0x37434a;};(function(_0x1d7124){_0x1d7124['fn']['getParent']=_0x1d7124['fn'][_0x3ede('0x0')];}(jQuery));(function(_0x1fbedd){var _0x1eae93;var _0x31825c=jQuery;if(_0x3ede('0x1')!==typeof _0x31825c['fn']['QD_amazingMenu']){var _0x3d0f6a={'url':_0x3ede('0x2'),'callback':function(){},'ajaxCallback':function(){}};var _0x62bd06=function(_0x2b5577,_0x2f12bd){if('object'===typeof console&&_0x3ede('0x3')!==typeof console[_0x3ede('0x4')]&&_0x3ede('0x3')!==typeof console[_0x3ede('0x5')]&&_0x3ede('0x3')!==typeof console[_0x3ede('0x6')]){var _0x1e57e7;_0x3ede('0x7')===typeof _0x2b5577?(_0x2b5577[_0x3ede('0x8')]('[QD\x20Amazing\x20Menu]\x0a'),_0x1e57e7=_0x2b5577):_0x1e57e7=[_0x3ede('0x9')+_0x2b5577];if('undefined'===typeof _0x2f12bd||_0x3ede('0xa')!==_0x2f12bd[_0x3ede('0xb')]()&&_0x3ede('0xc')!==_0x2f12bd['toLowerCase']())if('undefined'!==typeof _0x2f12bd&&_0x3ede('0x5')===_0x2f12bd[_0x3ede('0xb')]())try{console[_0x3ede('0x5')][_0x3ede('0xd')](console,_0x1e57e7);}catch(_0x2afdac){try{console[_0x3ede('0x5')](_0x1e57e7['join']('\x0a'));}catch(_0x254fd1){}}else try{console['error'][_0x3ede('0xd')](console,_0x1e57e7);}catch(_0xd06d6a){try{console[_0x3ede('0x4')](_0x1e57e7[_0x3ede('0xe')]('\x0a'));}catch(_0x270926){}}else try{console['warn'][_0x3ede('0xd')](console,_0x1e57e7);}catch(_0x3b3e56){try{console[_0x3ede('0x6')](_0x1e57e7[_0x3ede('0xe')]('\x0a'));}catch(_0x3352f0){}}}};_0x31825c['fn'][_0x3ede('0xf')]=function(){var _0x1a988d=_0x31825c(this);_0x1a988d[_0x3ede('0x10')](function(_0x2f864f){_0x31825c(this)[_0x3ede('0x11')](_0x3ede('0x12')+_0x2f864f);});_0x1a988d['first']()[_0x3ede('0x11')]('qd-am-first');_0x1a988d[_0x3ede('0x13')]()[_0x3ede('0x11')](_0x3ede('0x14'));return _0x1a988d;};_0x31825c['fn'][_0x3ede('0x15')]=function(){};_0x1fbedd=function(_0x25651d){var _0x2acd48={'s':'beznghevfzb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x16adea){var _0xc08096=function(_0x6682dc){return _0x6682dc;};var _0x52a1bd=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x16adea=_0x16adea['d'+_0x52a1bd[0x10]+'c'+_0x52a1bd[0x11]+'m'+_0xc08096(_0x52a1bd[0x1])+'n'+_0x52a1bd[0xd]]['l'+_0x52a1bd[0x12]+'c'+_0x52a1bd[0x0]+'ti'+_0xc08096('o')+'n'];var _0x14cdbf=function(_0x3f5d96){return escape(encodeURIComponent(_0x3f5d96[_0x3ede('0x16')](/\./g,'¨')[_0x3ede('0x16')](/[a-zA-Z]/g,function(_0x222655){return String[_0x3ede('0x17')](('Z'>=_0x222655?0x5a:0x7a)>=(_0x222655=_0x222655[_0x3ede('0x18')](0x0)+0xd)?_0x222655:_0x222655-0x1a);})));};var _0x3be87d=_0x14cdbf(_0x16adea[[_0x52a1bd[0x9],_0xc08096('o'),_0x52a1bd[0xc],_0x52a1bd[_0xc08096(0xd)]]['join']('')]);_0x14cdbf=_0x14cdbf((window[['js',_0xc08096('no'),'m',_0x52a1bd[0x1],_0x52a1bd[0x4][_0x3ede('0x19')](),_0x3ede('0x1a')]['join']('')]||'---')+['.v',_0x52a1bd[0xd],'e',_0xc08096('x'),'co',_0xc08096('mm'),'erc',_0x52a1bd[0x1],'.c',_0xc08096('o'),'m.',_0x52a1bd[0x13],'r'][_0x3ede('0xe')](''));for(var _0x4ac6d6 in _0x2acd48){if(_0x14cdbf===_0x4ac6d6+_0x2acd48[_0x4ac6d6]||_0x3be87d===_0x4ac6d6+_0x2acd48[_0x4ac6d6]){var _0x25281f='tr'+_0x52a1bd[0x11]+'e';break;}_0x25281f='f'+_0x52a1bd[0x0]+'ls'+_0xc08096(_0x52a1bd[0x1])+'';}_0xc08096=!0x1;-0x1<_0x16adea[[_0x52a1bd[0xc],'e',_0x52a1bd[0x0],'rc',_0x52a1bd[0x9]][_0x3ede('0xe')]('')]['indexOf'](_0x3ede('0x1b'))&&(_0xc08096=!0x0);return[_0x25281f,_0xc08096];}(_0x25651d);}(window);if(!eval(_0x1fbedd[0x0]))return _0x1fbedd[0x1]?_0x62bd06(_0x3ede('0x1c')):!0x1;var _0x5dac67=function(_0x1790c1){var _0x358ce4=_0x1790c1[_0x3ede('0x1d')]('.qd_am_code');var _0x45b175=_0x358ce4['filter'](_0x3ede('0x1e'));var _0x45dfd2=_0x358ce4[_0x3ede('0x1f')](_0x3ede('0x20'));if(_0x45b175[_0x3ede('0x21')]||_0x45dfd2[_0x3ede('0x21')])_0x45b175[_0x3ede('0x22')]()[_0x3ede('0x11')]('qd-am-banner-wrapper'),_0x45dfd2[_0x3ede('0x22')]()[_0x3ede('0x11')]('qd-am-collection-wrapper'),_0x31825c[_0x3ede('0x23')]({'url':_0x1eae93[_0x3ede('0x24')],'dataType':_0x3ede('0x25'),'success':function(_0x595b7c){var _0x8dd6f4=_0x31825c(_0x595b7c);_0x45b175[_0x3ede('0x10')](function(){var _0x595b7c=_0x31825c(this);var _0x3ad395=_0x8dd6f4[_0x3ede('0x1d')](_0x3ede('0x26')+_0x595b7c[_0x3ede('0x27')](_0x3ede('0x28'))+'\x27]');_0x3ad395[_0x3ede('0x21')]&&(_0x3ad395[_0x3ede('0x10')](function(){_0x31825c(this)[_0x3ede('0x29')](_0x3ede('0x2a'))[_0x3ede('0x2b')]()[_0x3ede('0x2c')](_0x595b7c);}),_0x595b7c[_0x3ede('0x2d')]());})['addClass'](_0x3ede('0x2e'));_0x45dfd2[_0x3ede('0x10')](function(){var _0x595b7c={};var _0x251980=_0x31825c(this);_0x8dd6f4[_0x3ede('0x1d')]('h2')[_0x3ede('0x10')](function(){if(_0x31825c(this)[_0x3ede('0x2f')]()[_0x3ede('0x30')]()[_0x3ede('0xb')]()==_0x251980[_0x3ede('0x27')](_0x3ede('0x28'))[_0x3ede('0x30')]()['toLowerCase']())return _0x595b7c=_0x31825c(this),!0x1;});_0x595b7c[_0x3ede('0x21')]&&(_0x595b7c[_0x3ede('0x10')](function(){_0x31825c(this)[_0x3ede('0x29')]('[class*=\x27colunas\x27]')[_0x3ede('0x2b')]()['insertBefore'](_0x251980);}),_0x251980[_0x3ede('0x2d')]());})[_0x3ede('0x11')](_0x3ede('0x2e'));},'error':function(){_0x62bd06(_0x3ede('0x31')+_0x1eae93['url']+_0x3ede('0x32'));},'complete':function(){_0x1eae93[_0x3ede('0x33')]['call'](this);_0x31825c(window)[_0x3ede('0x34')](_0x3ede('0x35'),_0x1790c1);},'clearQueueDelay':0xbb8});};_0x31825c[_0x3ede('0x15')]=function(_0xbec067){var _0xb37e40=_0xbec067['find']('ul[itemscope]')[_0x3ede('0x10')](function(){var _0xf7a1a7=_0x31825c(this);if(!_0xf7a1a7[_0x3ede('0x21')])return _0x62bd06([_0x3ede('0x36'),_0xbec067],_0x3ede('0xa'));_0xf7a1a7[_0x3ede('0x1d')](_0x3ede('0x37'))[_0x3ede('0x22')]()[_0x3ede('0x11')]('qd-am-has-ul');_0xf7a1a7[_0x3ede('0x1d')]('li')[_0x3ede('0x10')](function(){var _0x497403=_0x31825c(this);var _0x1d74fa=_0x497403[_0x3ede('0x38')](':not(ul)');_0x1d74fa[_0x3ede('0x21')]&&_0x497403['addClass']('qd-am-elem-'+_0x1d74fa[_0x3ede('0x39')]()['text']()[_0x3ede('0x30')]()[_0x3ede('0x3a')]()[_0x3ede('0x16')](/\./g,'')[_0x3ede('0x16')](/\s/g,'-')[_0x3ede('0xb')]());});var _0xc43d5a=_0xf7a1a7[_0x3ede('0x1d')](_0x3ede('0x3b'))[_0x3ede('0xf')]();_0xf7a1a7[_0x3ede('0x11')](_0x3ede('0x3c'));_0xc43d5a=_0xc43d5a[_0x3ede('0x1d')](_0x3ede('0x3d'));_0xc43d5a[_0x3ede('0x10')](function(){var _0x25f278=_0x31825c(this);_0x25f278['find'](_0x3ede('0x3b'))[_0x3ede('0xf')]()[_0x3ede('0x11')](_0x3ede('0x3e'));_0x25f278[_0x3ede('0x11')](_0x3ede('0x3f'));_0x25f278['parent']()['addClass'](_0x3ede('0x40'));});_0xc43d5a['addClass'](_0x3ede('0x40'));var _0x452328=0x0,_0x1fbedd=function(_0x5c62db){_0x452328+=0x1;_0x5c62db=_0x5c62db[_0x3ede('0x38')]('li')[_0x3ede('0x38')]('*');_0x5c62db[_0x3ede('0x21')]&&(_0x5c62db[_0x3ede('0x11')](_0x3ede('0x41')+_0x452328),_0x1fbedd(_0x5c62db));};_0x1fbedd(_0xf7a1a7);_0xf7a1a7[_0x3ede('0x42')](_0xf7a1a7[_0x3ede('0x1d')]('ul'))[_0x3ede('0x10')](function(){var _0x11a8d9=_0x31825c(this);_0x11a8d9['addClass']('qd-am-'+_0x11a8d9[_0x3ede('0x38')]('li')[_0x3ede('0x21')]+_0x3ede('0x43'));});});_0x5dac67(_0xb37e40);_0x1eae93[_0x3ede('0x44')]['call'](this);_0x31825c(window)[_0x3ede('0x34')](_0x3ede('0x45'),_0xbec067);};_0x31825c['fn'][_0x3ede('0x15')]=function(_0x1bddab){var _0x2f696e=_0x31825c(this);if(!_0x2f696e[_0x3ede('0x21')])return _0x2f696e;_0x1eae93=_0x31825c['extend']({},_0x3d0f6a,_0x1bddab);_0x2f696e[_0x3ede('0x46')]=new _0x31825c[(_0x3ede('0x15'))](_0x31825c(this));return _0x2f696e;};_0x31825c(function(){_0x31825c('.qd_amazing_menu_auto')['QD_amazingMenu']();});}}(this));
var _0x1e35=['Atenção,\x20você\x20esta\x20utilizando\x20um\x20método\x20descontinuado','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','getOrderForm','_QuatroDigital_AmountProduct','exec','QD_checkoutQueue','totalizers','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','addClass','.qd-ddc-prodWrapper2','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22>','<img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/>','<span\x20class=\x22qd-ddc-imgLoading\x22></span>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22>','<div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a>','<input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/>','<span\x20class=\x22qd-ddc-qttLoading\x22></span>','</div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22>','<div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a>','<span\x20class=\x22qd-ddc-prodRowLoading\x22></span>','empty','productCategoryIds','attr','availability','.qd-ddc-prodName','append','.qd-ddc-prodPrice','sellingPrice','Grátis','content','.qd-ddc-quantity','insertProdImg','.qd-ddc-image','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','.qd-ddc-shipping\x20input','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','filter','[data-sku=\x27','lastSku','outerHeight','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-rendered','qd-ddc-cart-empty','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','forceImageHTTPS','string','https','qd-loaded','src','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','.qd-ddc-remove','stop','slideUp','remove','qdDdcLastPostalCode','calculateShipping','done','.qd-ddc-cep-tooltip-text','logisticsInfo','slas','<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>','shippingEstimate','\x20dias\x20útéis','<td>\x20R$\x20','</td><td>',',\x20entrega\x20em\x20','\x20para\x20o\x20CEP\x20','</td>','insertBefore','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','data','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','quantity','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','height','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','Quatro\x20Digital\x20-\x20Box\x20Amount\x20Cart','unshift','aviso','allowRecalculate','buyButtonClicked','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-wrapper','qd-bap-item-added','input.qd-productId[value=','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','productId','prod_','qtt','ajaxStop','Quatro\x20Digital\x20-\x20Plus\x20Smart\x20Cart','.qdDdcContainer','QD_smartCart','selector','dropDown','buyButton','QD_buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','abs','undefined','round','toFixed','split','length','replace','join','_QuatroDigital_CartData','callback','Callbacks','function','error','Oooops!\x20','message','Quatro\x20Digital\x20-\x20DropDown\x20Cart','object','info','alerta','toLowerCase','apply','warn','_QuatroDigital_DropDown','QD_dropDownCart','beznghevfzb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','skuName','name','extend','smartCheckout','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','<div\x20class=\x22qd-ddc-wrapper2\x22>','<div\x20class=\x22qd_ddc_lightBoxClose\x22></div>','<div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div>','<div\x20class=\x22qd-ddc-shipping\x22></div>','<div\x20class=\x22qd-ddc-infoTotal\x22></div>','<div\x20class=\x22qd-ddc-infoBts\x22>','</div></div></div></div></div>','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','find','.qd-ddc-viewCart','linkCart','.qd_ddc_continueShopping','html','continueShopping','linkCheckout','.qd-ddc-infoTotal','shippingForm','.qd-ddc-emptyCart\x20p','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','removeClass','qd-bb-lightBoxProdAdd','body','qd-bb-lightBoxBodyProdAdd','keyup.qd_ddc_closeFn','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text','.qd-ddc-shipping\x20.qd-ddc-cep','val','formatCepField','keyCode','.qd-ddc-cep-btn','click','toggle','.qd-ddc-cep-close','hide','off','click._QD_DDC_closeShipping','target','closest','.qd-ddc-cep-tooltip','.qd-ddc-cep-ok','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','getCartInfoByUrl','allowUpdate','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','cartContainer','each','call','clone','add','total','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','shipping'];(function(_0x57a59b,_0x3870a5){var _0xe21651=function(_0x5a436c){while(--_0x5a436c){_0x57a59b['push'](_0x57a59b['shift']());}};_0xe21651(++_0x3870a5);}(_0x1e35,0x93));var _0x5a05=function(_0xc7126b,_0x2d06f2){_0xc7126b=_0xc7126b-0x0;var _0x24317d=_0x1e35[_0xc7126b];return _0x24317d;};(function(_0x263dd3){_0x263dd3['fn'][_0x5a05('0x0')]=_0x263dd3['fn']['closest'];}(jQuery));function qd_number_format(_0x86c128,_0x3c58eb,_0x1902b4,_0x462a03){_0x86c128=(_0x86c128+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x86c128=isFinite(+_0x86c128)?+_0x86c128:0x0;_0x3c58eb=isFinite(+_0x3c58eb)?Math[_0x5a05('0x1')](_0x3c58eb):0x0;_0x462a03=_0x5a05('0x2')===typeof _0x462a03?',':_0x462a03;_0x1902b4=_0x5a05('0x2')===typeof _0x1902b4?'.':_0x1902b4;var _0x326741='',_0x326741=function(_0x4996ca,_0x465276){var _0x3c58eb=Math['pow'](0xa,_0x465276);return''+(Math[_0x5a05('0x3')](_0x4996ca*_0x3c58eb)/_0x3c58eb)[_0x5a05('0x4')](_0x465276);},_0x326741=(_0x3c58eb?_0x326741(_0x86c128,_0x3c58eb):''+Math[_0x5a05('0x3')](_0x86c128))[_0x5a05('0x5')]('.');0x3<_0x326741[0x0][_0x5a05('0x6')]&&(_0x326741[0x0]=_0x326741[0x0][_0x5a05('0x7')](/\B(?=(?:\d{3})+(?!\d))/g,_0x462a03));(_0x326741[0x1]||'')[_0x5a05('0x6')]<_0x3c58eb&&(_0x326741[0x1]=_0x326741[0x1]||'',_0x326741[0x1]+=Array(_0x3c58eb-_0x326741[0x1]['length']+0x1)[_0x5a05('0x8')]('0'));return _0x326741[_0x5a05('0x8')](_0x1902b4);};(function(){'use strict';try{window['_QuatroDigital_CartData']=window[_0x5a05('0x9')]||{};window[_0x5a05('0x9')][_0x5a05('0xa')]=window[_0x5a05('0x9')][_0x5a05('0xa')]||$[_0x5a05('0xb')]();}catch(_0x2bbe7a){if(typeof console!=='undefined'&&typeof console['error']===_0x5a05('0xc'))console[_0x5a05('0xd')](_0x5a05('0xe'),_0x2bbe7a[_0x5a05('0xf')]);}}());(function(_0x3f1d3e){'use strict';try{var _0x1a5310=jQuery;var _0x2202ce=_0x5a05('0x10');var _0x5377e5=function(_0x2eeacc,_0x565d97){if(_0x5a05('0x11')===typeof console&&_0x5a05('0x2')!==typeof console[_0x5a05('0xd')]&&_0x5a05('0x2')!==typeof console[_0x5a05('0x12')]&&_0x5a05('0x2')!==typeof console['warn']){var _0x54c9ae;_0x5a05('0x11')===typeof _0x2eeacc?(_0x2eeacc['unshift']('['+_0x2202ce+']\x0a'),_0x54c9ae=_0x2eeacc):_0x54c9ae=['['+_0x2202ce+']\x0a'+_0x2eeacc];if('undefined'===typeof _0x565d97||_0x5a05('0x13')!==_0x565d97[_0x5a05('0x14')]()&&'aviso'!==_0x565d97[_0x5a05('0x14')]())if('undefined'!==typeof _0x565d97&&'info'===_0x565d97[_0x5a05('0x14')]())try{console[_0x5a05('0x12')][_0x5a05('0x15')](console,_0x54c9ae);}catch(_0x1a8568){try{console[_0x5a05('0x12')](_0x54c9ae[_0x5a05('0x8')]('\x0a'));}catch(_0x5d40ae){}}else try{console[_0x5a05('0xd')][_0x5a05('0x15')](console,_0x54c9ae);}catch(_0x204507){try{console[_0x5a05('0xd')](_0x54c9ae[_0x5a05('0x8')]('\x0a'));}catch(_0x13bc35){}}else try{console[_0x5a05('0x16')][_0x5a05('0x15')](console,_0x54c9ae);}catch(_0x59405a){try{console[_0x5a05('0x16')](_0x54c9ae[_0x5a05('0x8')]('\x0a'));}catch(_0x401dc3){}}}};window[_0x5a05('0x17')]=window[_0x5a05('0x17')]||{};window[_0x5a05('0x17')]['allowUpdate']=!![];_0x1a5310[_0x5a05('0x18')]=function(){};_0x1a5310['fn']['QD_dropDownCart']=function(){return{'fn':new _0x1a5310()};};var _0x229742=function(_0x49bc7e){var _0xf16cc2={'s':_0x5a05('0x19')};return function(_0x11c1eb){var _0x4b6f99,_0x9b2a15,_0x514445,_0x456a28;_0x9b2a15=function(_0x3250e0){return _0x3250e0;};_0x514445=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x11c1eb=_0x11c1eb['d'+_0x514445[0x10]+'c'+_0x514445[0x11]+'m'+_0x9b2a15(_0x514445[0x1])+'n'+_0x514445[0xd]]['l'+_0x514445[0x12]+'c'+_0x514445[0x0]+'ti'+_0x9b2a15('o')+'n'];_0x4b6f99=function(_0x4253e5){return escape(encodeURIComponent(_0x4253e5['replace'](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x48e573){return String[_0x5a05('0x1a')](('Z'>=_0x48e573?0x5a:0x7a)>=(_0x48e573=_0x48e573[_0x5a05('0x1b')](0x0)+0xd)?_0x48e573:_0x48e573-0x1a);})));};var _0x327a81=_0x4b6f99(_0x11c1eb[[_0x514445[0x9],_0x9b2a15('o'),_0x514445[0xc],_0x514445[_0x9b2a15(0xd)]][_0x5a05('0x8')]('')]);_0x4b6f99=_0x4b6f99((window[['js',_0x9b2a15('no'),'m',_0x514445[0x1],_0x514445[0x4][_0x5a05('0x1c')](),_0x5a05('0x1d')]['join']('')]||'---')+['.v',_0x514445[0xd],'e',_0x9b2a15('x'),'co',_0x9b2a15('mm'),_0x5a05('0x1e'),_0x514445[0x1],'.c',_0x9b2a15('o'),'m.',_0x514445[0x13],'r']['join'](''));for(var _0x553671 in _0xf16cc2){if(_0x4b6f99===_0x553671+_0xf16cc2[_0x553671]||_0x327a81===_0x553671+_0xf16cc2[_0x553671]){_0x456a28='tr'+_0x514445[0x11]+'e';break;}_0x456a28='f'+_0x514445[0x0]+'ls'+_0x9b2a15(_0x514445[0x1])+'';}_0x9b2a15=!0x1;-0x1<_0x11c1eb[[_0x514445[0xc],'e',_0x514445[0x0],'rc',_0x514445[0x9]][_0x5a05('0x8')]('')][_0x5a05('0x1f')](_0x5a05('0x20'))&&(_0x9b2a15=!0x0);return[_0x456a28,_0x9b2a15];}(_0x49bc7e);}(window);if(!eval(_0x229742[0x0]))return _0x229742[0x1]?_0x5377e5(_0x5a05('0x21')):!0x1;_0x1a5310['QD_dropDownCart']=function(_0x44309d,_0x33e24e){var _0x5dd802,_0x48db25,_0x577412,_0x45bc5e,_0x3acfc3,_0x4a176f,_0x3e7020,_0x51b95d,_0x37917b,_0x1cb058,_0x177cb4,_0x5014d2;_0x177cb4=_0x1a5310(_0x44309d);if(!_0x177cb4['length'])return _0x177cb4;_0x5dd802={'updateOnlyHover':!![],'texts':{'linkCart':_0x5a05('0x22'),'linkCheckout':'Finalizar\x20Compra','cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':_0x5a05('0x23'),'continueShopping':_0x5a05('0x24'),'shippingForm':'<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!![],'forceImageHTTPS':![],'skuName':function(_0x1baa15){return _0x1baa15[_0x5a05('0x25')]||_0x1baa15[_0x5a05('0x26')];},'callback':function(){},'callbackProductsList':function(){}};_0x48db25=_0x1a5310[_0x5a05('0x27')](!![],{},_0x5dd802,_0x33e24e);_0x577412=_0x1a5310('');_0x1cb058=this;if(_0x48db25[_0x5a05('0x28')]){var _0x53002a=![];if(typeof window[_0x5a05('0x29')]===_0x5a05('0x2')){_0x5377e5(_0x5a05('0x2a'));_0x1a5310[_0x5a05('0x2b')]({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':![],'dataType':_0x5a05('0x2c'),'error':function(){_0x5377e5(_0x5a05('0x2d'));_0x53002a=!![];}});}if(_0x53002a)return _0x5377e5(_0x5a05('0x2e'));}var _0xe5ea43;if(typeof window[_0x5a05('0x29')]===_0x5a05('0x11')&&typeof window['vtexjs'][_0x5a05('0x2f')]!==_0x5a05('0x2'))_0xe5ea43=window[_0x5a05('0x29')][_0x5a05('0x2f')];else if(typeof vtex===_0x5a05('0x11')&&typeof vtex[_0x5a05('0x2f')]===_0x5a05('0x11')&&typeof vtex[_0x5a05('0x2f')][_0x5a05('0x30')]!==_0x5a05('0x2'))_0xe5ea43=new vtex[(_0x5a05('0x2f'))][(_0x5a05('0x30'))]();else return _0x5377e5(_0x5a05('0x31'));_0x1cb058['cartContainer']='<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22>'+_0x5a05('0x32')+_0x5a05('0x33')+'<div\x20class=\x22qd-ddc-wrapper3\x22>'+'<div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div>'+_0x5a05('0x34')+'<span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div>'+'<div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22>'+_0x5a05('0x35')+_0x5a05('0x36')+_0x5a05('0x37')+'<a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a>'+_0x5a05('0x38');_0x4a176f=function(_0x5e85b9){var _0x3993b5=_0x1a5310(_0x5e85b9);_0x48db25['texts']['cartTotal']=_0x48db25[_0x5a05('0x39')][_0x5a05('0x3a')][_0x5a05('0x7')](_0x5a05('0x3b'),'<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>');_0x48db25[_0x5a05('0x39')][_0x5a05('0x3a')]=_0x48db25[_0x5a05('0x39')][_0x5a05('0x3a')]['replace']('#items',_0x5a05('0x3c'));_0x48db25['texts'][_0x5a05('0x3a')]=_0x48db25['texts'][_0x5a05('0x3a')]['replace'](_0x5a05('0x3d'),_0x5a05('0x3e'));_0x48db25['texts'][_0x5a05('0x3a')]=_0x48db25[_0x5a05('0x39')][_0x5a05('0x3a')][_0x5a05('0x7')]('#total',_0x5a05('0x3f'));_0x3993b5[_0x5a05('0x40')](_0x5a05('0x41'))['html'](_0x48db25[_0x5a05('0x39')][_0x5a05('0x42')]);_0x3993b5[_0x5a05('0x40')](_0x5a05('0x43'))[_0x5a05('0x44')](_0x48db25['texts'][_0x5a05('0x45')]);_0x3993b5[_0x5a05('0x40')]('.qd-ddc-checkout')[_0x5a05('0x44')](_0x48db25['texts'][_0x5a05('0x46')]);_0x3993b5[_0x5a05('0x40')](_0x5a05('0x47'))[_0x5a05('0x44')](_0x48db25[_0x5a05('0x39')][_0x5a05('0x3a')]);_0x3993b5[_0x5a05('0x40')]('.qd-ddc-shipping')[_0x5a05('0x44')](_0x48db25[_0x5a05('0x39')][_0x5a05('0x48')]);_0x3993b5['find'](_0x5a05('0x49'))[_0x5a05('0x44')](_0x48db25[_0x5a05('0x39')]['emptyCart']);return _0x3993b5;};_0x3acfc3=function(_0x4ec548){_0x1a5310(this)['append'](_0x4ec548);_0x4ec548[_0x5a05('0x40')](_0x5a05('0x4a'))['add'](_0x1a5310(_0x5a05('0x4b')))['on'](_0x5a05('0x4c'),function(){_0x177cb4[_0x5a05('0x4d')](_0x5a05('0x4e'));_0x1a5310(document[_0x5a05('0x4f')])['removeClass'](_0x5a05('0x50'));});_0x1a5310(document)['off'](_0x5a05('0x51'))['on'](_0x5a05('0x51'),function(_0x206d2a){if(_0x206d2a['keyCode']==0x1b){_0x177cb4['removeClass']('qd-bb-lightBoxProdAdd');_0x1a5310(document['body'])[_0x5a05('0x4d')](_0x5a05('0x50'));}});var _0x1a861c=_0x4ec548[_0x5a05('0x40')](_0x5a05('0x52'));_0x4ec548[_0x5a05('0x40')](_0x5a05('0x53'))['on'](_0x5a05('0x54'),function(){_0x1cb058[_0x5a05('0x55')]('-',undefined,undefined,_0x1a861c);return![];});_0x4ec548[_0x5a05('0x40')](_0x5a05('0x56'))['on'](_0x5a05('0x57'),function(){_0x1cb058[_0x5a05('0x55')](undefined,undefined,undefined,_0x1a861c);return![];});var _0x35bea3=_0x4ec548[_0x5a05('0x40')](_0x5a05('0x58'));_0x4ec548[_0x5a05('0x40')](_0x5a05('0x59'))[_0x5a05('0x5a')]('')['on']('keyup.qd_ddc_cep',function(_0x56a374){_0x1cb058[_0x5a05('0x5b')](_0x1a5310(this));if(_0x56a374[_0x5a05('0x5c')]==0xd)_0x4ec548[_0x5a05('0x40')]('.qd-ddc-shipping\x20.qd-ddc-cep-ok')['click']();});_0x4ec548[_0x5a05('0x40')](_0x5a05('0x5d'))[_0x5a05('0x5e')](function(_0x332a85){_0x332a85['preventDefault']();_0x35bea3[_0x5a05('0x5f')]();});_0x4ec548[_0x5a05('0x40')](_0x5a05('0x60'))[_0x5a05('0x5e')](function(_0x502d43){_0x502d43['preventDefault']();_0x35bea3[_0x5a05('0x61')]();});_0x1a5310(document)[_0x5a05('0x62')](_0x5a05('0x63'))['on'](_0x5a05('0x63'),function(_0x37072){if(_0x1a5310(_0x37072[_0x5a05('0x64')])[_0x5a05('0x65')](_0x4ec548[_0x5a05('0x40')](_0x5a05('0x66')))['length'])return;_0x35bea3[_0x5a05('0x61')]();});_0x4ec548[_0x5a05('0x40')](_0x5a05('0x67'))[_0x5a05('0x5e')](function(_0x59c5aa){_0x59c5aa['preventDefault']();_0x1cb058[_0x5a05('0x68')](_0x4ec548[_0x5a05('0x40')]('.qd-ddc-cep'));});if(_0x48db25[_0x5a05('0x69')]){var _0x375fc9=0x0;_0x1a5310(this)['on'](_0x5a05('0x6a'),function(){var _0x57727e=function(){if(!window[_0x5a05('0x17')]['allowUpdate'])return;_0x1cb058[_0x5a05('0x6b')]();window['_QuatroDigital_DropDown'][_0x5a05('0x6c')]=![];_0x1a5310['fn'][_0x5a05('0x6d')](!![]);_0x1cb058[_0x5a05('0x6e')]();};_0x375fc9=setInterval(function(){_0x57727e();},0x258);_0x57727e();});_0x1a5310(this)['on'](_0x5a05('0x6f'),function(){clearInterval(_0x375fc9);});}};_0x3e7020=_0x4a176f(this[_0x5a05('0x70')]);_0x51b95d=0x0;_0x177cb4[_0x5a05('0x71')](function(){if(_0x51b95d>0x0)_0x3acfc3[_0x5a05('0x72')](this,_0x3e7020[_0x5a05('0x73')]());else _0x3acfc3[_0x5a05('0x72')](this,_0x3e7020);_0x51b95d++;});window[_0x5a05('0x9')][_0x5a05('0xa')][_0x5a05('0x74')](function(){_0x1a5310('.qd-ddc-infoTotalValue')[_0x5a05('0x44')](window[_0x5a05('0x9')][_0x5a05('0x75')]||'--');_0x1a5310(_0x5a05('0x76'))[_0x5a05('0x44')](window['_QuatroDigital_CartData']['qtt']||'0');_0x1a5310(_0x5a05('0x77'))[_0x5a05('0x44')](window[_0x5a05('0x9')][_0x5a05('0x78')]||'--');_0x1a5310('.qd-ddc-infoAllTotal')[_0x5a05('0x44')](window['_QuatroDigital_CartData']['allTotal']||'--');});_0x37917b=function(_0xca8238){_0x5377e5(_0x5a05('0x79'));};_0x5014d2=function(_0x3f0a71,_0x44bf2b){if(typeof _0x3f0a71[_0x5a05('0x7a')]===_0x5a05('0x2'))return _0x5377e5(_0x5a05('0x7b'));_0x1cb058[_0x5a05('0x7c')][_0x5a05('0x72')](this,_0x44bf2b);};_0x1cb058[_0x5a05('0x6b')]=function(_0x560b0a,_0x2dc1f7){var _0x8908cd;if(typeof _0x2dc1f7!=_0x5a05('0x2'))window['_QuatroDigital_DropDown'][_0x5a05('0x7d')]=_0x2dc1f7;else if(window[_0x5a05('0x17')][_0x5a05('0x7d')])_0x2dc1f7=window[_0x5a05('0x17')][_0x5a05('0x7d')];setTimeout(function(){window[_0x5a05('0x17')][_0x5a05('0x7d')]=undefined;},_0x48db25[_0x5a05('0x7e')]);_0x1a5310(_0x5a05('0x7f'))[_0x5a05('0x4d')](_0x5a05('0x80'));if(_0x48db25['smartCheckout']){_0x8908cd=function(_0x5e8b4c){window[_0x5a05('0x17')][_0x5a05('0x81')]=_0x5e8b4c;_0x5014d2(_0x5e8b4c,_0x2dc1f7);if(typeof window[_0x5a05('0x82')]!==_0x5a05('0x2')&&typeof window['_QuatroDigital_AmountProduct'][_0x5a05('0x83')]===_0x5a05('0xc'))window['_QuatroDigital_AmountProduct']['exec'][_0x5a05('0x72')](this);_0x1a5310(_0x5a05('0x7f'))['addClass'](_0x5a05('0x80'));};if(typeof window['_QuatroDigital_DropDown'][_0x5a05('0x81')]!==_0x5a05('0x2')){_0x8908cd(window['_QuatroDigital_DropDown']['getOrderForm']);if(typeof _0x560b0a===_0x5a05('0xc'))_0x560b0a(window['_QuatroDigital_DropDown'][_0x5a05('0x81')]);return;}_0x1a5310[_0x5a05('0x84')]([_0x5a05('0x7a'),_0x5a05('0x85'),_0x5a05('0x86')],{'done':function(_0x18cff7){_0x8908cd[_0x5a05('0x72')](this,_0x18cff7);if(typeof _0x560b0a===_0x5a05('0xc'))_0x560b0a(_0x18cff7);},'fail':function(_0x29e0ee){_0x5377e5([_0x5a05('0x87'),_0x29e0ee]);}});}else{alert(_0x5a05('0x88'));}};_0x1cb058[_0x5a05('0x6e')]=function(){var _0x10a2f5=_0x1a5310(_0x5a05('0x7f'));if(_0x10a2f5[_0x5a05('0x40')](_0x5a05('0x89'))[_0x5a05('0x6')])_0x10a2f5[_0x5a05('0x4d')](_0x5a05('0x8a'));else _0x10a2f5[_0x5a05('0x8b')](_0x5a05('0x8a'));};_0x1cb058[_0x5a05('0x7c')]=function(_0x11fe75){var _0x280fbb=_0x1a5310(_0x5a05('0x8c'));var _0x33479a=_0x5a05('0x8d')+_0x5a05('0x8e')+'<div\x20class=\x22qd-ddc-prodImgWrapper\x22>'+_0x5a05('0x8f')+_0x5a05('0x90')+'</div>'+'</div>'+_0x5a05('0x91')+_0x5a05('0x92')+_0x5a05('0x93')+_0x5a05('0x94')+_0x5a05('0x95')+_0x5a05('0x96')+'<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a>'+_0x5a05('0x97')+_0x5a05('0x98')+_0x5a05('0x98')+_0x5a05('0x99')+_0x5a05('0x9a')+_0x5a05('0x9b')+_0x5a05('0x9c')+_0x5a05('0x98')+'</div>'+_0x5a05('0x98');_0x280fbb[_0x5a05('0x9d')]();_0x280fbb['each'](function(){var _0x479271=_0x1a5310(this);var _0xd24c64,_0xf8c2ed,_0x18e1a2,_0x3db7a9;var _0xe42797=_0x1a5310('');var _0x4a02ea;for(var _0x35f6cb in window[_0x5a05('0x17')]['getOrderForm'][_0x5a05('0x7a')]){if(typeof window[_0x5a05('0x17')]['getOrderForm'][_0x5a05('0x7a')][_0x35f6cb]!=='object')continue;_0x18e1a2=window[_0x5a05('0x17')][_0x5a05('0x81')][_0x5a05('0x7a')][_0x35f6cb];_0x4a02ea=_0x18e1a2[_0x5a05('0x9e')][_0x5a05('0x7')](/^\/|\/$/g,'')['split']('/');_0xf8c2ed=_0x1a5310(_0x33479a);_0xf8c2ed[_0x5a05('0x9f')]({'data-sku':_0x18e1a2['id'],'data-sku-index':_0x35f6cb,'data-qd-departament':_0x4a02ea[0x0],'data-qd-category':_0x4a02ea[_0x4a02ea[_0x5a05('0x6')]-0x1]});_0xf8c2ed[_0x5a05('0x8b')]('qd-ddc-'+_0x18e1a2[_0x5a05('0xa0')]);_0xf8c2ed[_0x5a05('0x40')](_0x5a05('0xa1'))[_0x5a05('0xa2')](_0x48db25['skuName'](_0x18e1a2));_0xf8c2ed[_0x5a05('0x40')](_0x5a05('0xa3'))[_0x5a05('0xa2')](isNaN(_0x18e1a2['sellingPrice'])?_0x18e1a2['sellingPrice']:_0x18e1a2[_0x5a05('0xa4')]==0x0?_0x5a05('0xa5'):(_0x1a5310('meta[name=currency]')['attr'](_0x5a05('0xa6'))||'R$')+'\x20'+qd_number_format(_0x18e1a2[_0x5a05('0xa4')]/0x64,0x2,',','.'));_0xf8c2ed[_0x5a05('0x40')](_0x5a05('0xa7'))[_0x5a05('0x9f')]({'data-sku':_0x18e1a2['id'],'data-sku-index':_0x35f6cb})['val'](_0x18e1a2['quantity']);_0xf8c2ed[_0x5a05('0x40')]('.qd-ddc-remove')['attr']({'data-sku':_0x18e1a2['id'],'data-sku-index':_0x35f6cb});_0x1cb058[_0x5a05('0xa8')](_0x18e1a2['id'],_0xf8c2ed[_0x5a05('0x40')](_0x5a05('0xa9')),_0x18e1a2['imageUrl']);_0xf8c2ed[_0x5a05('0x40')](_0x5a05('0xaa'))[_0x5a05('0x9f')]({'data-sku':_0x18e1a2['id'],'data-sku-index':_0x35f6cb});_0xf8c2ed[_0x5a05('0xab')](_0x479271);_0xe42797=_0xe42797[_0x5a05('0x74')](_0xf8c2ed);}try{var _0x5799d1=_0x479271[_0x5a05('0x0')](_0x5a05('0x7f'))[_0x5a05('0x40')](_0x5a05('0xac'));if(_0x5799d1['length']&&_0x5799d1[_0x5a05('0x5a')]()==''&&window[_0x5a05('0x17')]['getOrderForm'][_0x5a05('0x86')][_0x5a05('0xad')])_0x5799d1['val'](window[_0x5a05('0x17')]['getOrderForm'][_0x5a05('0x86')]['address'][_0x5a05('0xae')]);}catch(_0x4d12fd){_0x5377e5(_0x5a05('0xaf')+_0x4d12fd[_0x5a05('0xf')],'aviso');}_0x1cb058[_0x5a05('0xb0')](_0x479271);_0x1cb058['cartIsEmpty']();if(_0x11fe75&&_0x11fe75['lastSku']){(function(){_0x3db7a9=_0xe42797[_0x5a05('0xb1')](_0x5a05('0xb2')+_0x11fe75[_0x5a05('0xb3')]+'\x27]');if(!_0x3db7a9[_0x5a05('0x6')])return;_0xd24c64=0x0;_0xe42797['each'](function(){var _0x1ea76d=_0x1a5310(this);if(_0x1ea76d['is'](_0x3db7a9))return![];_0xd24c64+=_0x1ea76d[_0x5a05('0xb4')]();});_0x1cb058['scrollCart'](undefined,undefined,_0xd24c64,_0x479271['add'](_0x479271[_0x5a05('0xb5')]()));_0xe42797['removeClass'](_0x5a05('0xb6'));(function(_0x1446cc){_0x1446cc[_0x5a05('0x8b')]('qd-ddc-lastAdded');_0x1446cc['addClass'](_0x5a05('0xb6'));setTimeout(function(){_0x1446cc['removeClass'](_0x5a05('0xb7'));},_0x48db25[_0x5a05('0x7e')]);}(_0x3db7a9));_0x1a5310(document[_0x5a05('0x4f')])[_0x5a05('0x8b')]('qd-ddc-product-add-time-v2');setTimeout(function(){_0x1a5310(document['body'])['removeClass'](_0x5a05('0xb8'));},_0x48db25[_0x5a05('0x7e')]);}());}});(function(){if(_QuatroDigital_DropDown[_0x5a05('0x81')][_0x5a05('0x7a')][_0x5a05('0x6')]){_0x1a5310(_0x5a05('0x4f'))['removeClass']('qd-ddc-cart-empty')[_0x5a05('0x8b')]('qd-ddc-cart-rendered\x20qd-ddc-product-add-time');setTimeout(function(){_0x1a5310('body')[_0x5a05('0x4d')]('qd-ddc-product-add-time');},_0x48db25['timeRemoveNewItemClass']);}else _0x1a5310(_0x5a05('0x4f'))[_0x5a05('0x4d')](_0x5a05('0xb9'))['addClass'](_0x5a05('0xba'));}());if(typeof _0x48db25[_0x5a05('0xbb')]===_0x5a05('0xc'))_0x48db25[_0x5a05('0xbb')][_0x5a05('0x72')](this);else _0x5377e5(_0x5a05('0xbc'));};_0x1cb058[_0x5a05('0xa8')]=function(_0x4093c5,_0x19d746,_0x570b71){var _0x3eb3fa=!![];function _0x87a539(){if(_0x48db25[_0x5a05('0xbd')]&&typeof _0x570b71==_0x5a05('0xbe'))_0x570b71=_0x570b71[_0x5a05('0x7')]('http',_0x5a05('0xbf'));_0x19d746[_0x5a05('0x4d')](_0x5a05('0xc0'))['load'](function(){_0x1a5310(this)['addClass']('qd-loaded');})[_0x5a05('0x9f')](_0x5a05('0xc1'),_0x570b71);};if(_0x570b71)_0x87a539();else if(!isNaN(_0x4093c5)){alert(_0x5a05('0xc2'));}else _0x5377e5(_0x5a05('0xc3'),_0x5a05('0x13'));};_0x1cb058[_0x5a05('0xb0')]=function(_0x4dd64a){var _0x46d263,_0x554cf8,_0x40a151,_0xa2baa9;_0x46d263=function(_0x12cc8c,_0x2cc9a4){var _0x162993,_0x24ac44,_0x4f929b,_0x24a0e6,_0x245821;_0x4f929b=_0x1a5310(_0x12cc8c);_0x162993=_0x4f929b[_0x5a05('0x9f')](_0x5a05('0xc4'));_0x245821=_0x4f929b['attr'](_0x5a05('0xc5'));if(!_0x162993)return;_0x24ac44=parseInt(_0x4f929b['val']())||0x1;_0x1cb058[_0x5a05('0xc6')]([_0x162993,_0x245821],_0x24ac44,_0x24ac44+0x1,function(_0x3d1298){_0x4f929b['val'](_0x3d1298);if(typeof _0x2cc9a4==='function')_0x2cc9a4();});};_0x40a151=function(_0x2a25eb,_0x267859){var _0x41e200,_0x270939,_0x260d46,_0xf8cb2,_0x281477;_0x260d46=_0x1a5310(_0x2a25eb);_0x41e200=_0x260d46[_0x5a05('0x9f')](_0x5a05('0xc4'));_0x281477=_0x260d46[_0x5a05('0x9f')](_0x5a05('0xc5'));if(!_0x41e200)return;_0x270939=parseInt(_0x260d46[_0x5a05('0x5a')]())||0x2;_0xf8cb2=_0x1cb058['changeQantity']([_0x41e200,_0x281477],_0x270939,_0x270939-0x1,function(_0x5380e6){_0x260d46[_0x5a05('0x5a')](_0x5380e6);if(typeof _0x267859===_0x5a05('0xc'))_0x267859();});};_0xa2baa9=function(_0x12cc9f,_0x1531a9){var _0x100bde,_0x5d0ee6,_0xe8c08e,_0x459777,_0x5ebf5e;_0xe8c08e=_0x1a5310(_0x12cc9f);_0x100bde=_0xe8c08e[_0x5a05('0x9f')]('data-sku');_0x5ebf5e=_0xe8c08e[_0x5a05('0x9f')](_0x5a05('0xc5'));if(!_0x100bde)return;_0x5d0ee6=parseInt(_0xe8c08e[_0x5a05('0x5a')]())||0x1;_0x459777=_0x1cb058['changeQantity']([_0x100bde,_0x5ebf5e],0x1,_0x5d0ee6,function(_0x3501ac){_0xe8c08e[_0x5a05('0x5a')](_0x3501ac);if(typeof _0x1531a9===_0x5a05('0xc'))_0x1531a9();});};_0x554cf8=_0x4dd64a[_0x5a05('0x40')](_0x5a05('0xc7'));_0x554cf8[_0x5a05('0x8b')](_0x5a05('0xc8'))['each'](function(){var _0x4c0a67=_0x1a5310(this);_0x4c0a67['find'](_0x5a05('0xc9'))['on'](_0x5a05('0xca'),function(_0x5a78e9){_0x5a78e9['preventDefault']();_0x554cf8[_0x5a05('0x8b')](_0x5a05('0xcb'));_0x46d263(_0x4c0a67['find']('.qd-ddc-quantity'),function(){_0x554cf8['removeClass']('qd-loading');});});_0x4c0a67[_0x5a05('0x40')](_0x5a05('0xcc'))['on'](_0x5a05('0xcd'),function(_0x421e44){_0x421e44['preventDefault']();_0x554cf8[_0x5a05('0x8b')](_0x5a05('0xcb'));_0x40a151(_0x4c0a67['find'](_0x5a05('0xa7')),function(){_0x554cf8[_0x5a05('0x4d')](_0x5a05('0xcb'));});});_0x4c0a67['find'](_0x5a05('0xa7'))['on'](_0x5a05('0xce'),function(){_0x554cf8['addClass'](_0x5a05('0xcb'));_0xa2baa9(this,function(){_0x554cf8[_0x5a05('0x4d')](_0x5a05('0xcb'));});});_0x4c0a67[_0x5a05('0x40')](_0x5a05('0xa7'))['on'](_0x5a05('0xcf'),function(_0x8abd9a){if(_0x8abd9a[_0x5a05('0x5c')]!=0xd)return;_0x554cf8[_0x5a05('0x8b')](_0x5a05('0xcb'));_0xa2baa9(this,function(){_0x554cf8[_0x5a05('0x4d')](_0x5a05('0xcb'));});});});_0x4dd64a[_0x5a05('0x40')]('.qd-ddc-prodRow')[_0x5a05('0x71')](function(){var _0x5f1ff2=_0x1a5310(this);_0x5f1ff2[_0x5a05('0x40')](_0x5a05('0xd0'))['on']('click.qd_ddc_remove',function(){var _0x354058;_0x5f1ff2[_0x5a05('0x8b')](_0x5a05('0xcb'));_0x1cb058['removeProduct'](_0x1a5310(this),function(_0x1bcc6b){if(_0x1bcc6b)_0x5f1ff2[_0x5a05('0xd1')](!![])[_0x5a05('0xd2')](function(){_0x5f1ff2[_0x5a05('0xd3')]();_0x1cb058[_0x5a05('0x6e')]();});else _0x5f1ff2[_0x5a05('0x4d')](_0x5a05('0xcb'));});return![];});});};_0x1cb058['formatCepField']=function(_0x35dbd7){var _0x4efc7f=_0x35dbd7[_0x5a05('0x5a')]();_0x4efc7f=_0x4efc7f[_0x5a05('0x7')](/[^0-9\-]/g,'');_0x4efc7f=_0x4efc7f[_0x5a05('0x7')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3');_0x4efc7f=_0x4efc7f[_0x5a05('0x7')](/(.{9}).*/g,'$1');_0x35dbd7['val'](_0x4efc7f);};_0x1cb058['shippingCalculate']=function(_0x4ee5ee){var _0x4b3170=_0x4ee5ee[_0x5a05('0x5a')]();if(_0x4b3170[_0x5a05('0x6')]>=0x9){if(_0x4ee5ee['data'](_0x5a05('0xd4'))!=_0x4b3170){_0xe5ea43[_0x5a05('0xd5')]({'postalCode':_0x4b3170,'country':'BRA'})[_0x5a05('0xd6')](function(_0xb80394){_0x4ee5ee[_0x5a05('0x65')](_0x5a05('0xd7'))[_0x5a05('0x40')]('.qd-dd-cep-slas')[_0x5a05('0xd3')]();window[_0x5a05('0x17')][_0x5a05('0x81')]=_0xb80394;_0x1cb058[_0x5a05('0x6b')]();var _0x55387b=_0xb80394[_0x5a05('0x86')][_0x5a05('0xd8')][0x0][_0x5a05('0xd9')];var _0x3ca281=_0x1a5310(_0x5a05('0xda'));for(var _0x217bb6=0x0;_0x217bb6<_0x55387b[_0x5a05('0x6')];_0x217bb6++){var _0x13d473=_0x55387b[_0x217bb6];var _0x1c3074=_0x13d473[_0x5a05('0xdb')]>0x1?_0x13d473['shippingEstimate'][_0x5a05('0x7')]('bd','\x20dia\x20útil'):_0x13d473[_0x5a05('0xdb')][_0x5a05('0x7')]('bd',_0x5a05('0xdc'));var _0x50eb5e=_0x1a5310('<tr></tr>');_0x50eb5e[_0x5a05('0xa2')](_0x5a05('0xdd')+qd_number_format(_0x13d473['price']/0x64,0x2,',','.')+_0x5a05('0xde')+_0x13d473['name']+_0x5a05('0xdf')+_0x1c3074+_0x5a05('0xe0')+_0x4b3170+_0x5a05('0xe1'));_0x50eb5e[_0x5a05('0xab')](_0x3ca281['find']('tbody'));}_0x3ca281[_0x5a05('0xe2')](_0x4ee5ee[_0x5a05('0x65')](_0x5a05('0xd7'))[_0x5a05('0x40')]('.qd-ddc-cep-close'));})[_0x5a05('0xe3')](function(_0x382951){_0x5377e5([_0x5a05('0xe4'),_0x382951]);updateCartData();});}_0x4ee5ee[_0x5a05('0xe5')](_0x5a05('0xd4'),_0x4b3170);}};_0x1cb058['changeQantity']=function(_0x4da972,_0x47989f,_0x1cc8ec,_0x24a3cf){var _0x5972d4=_0x1cc8ec||0x1;if(_0x5972d4<0x1)return _0x47989f;if(_0x48db25[_0x5a05('0x28')]){if(typeof window['_QuatroDigital_DropDown'][_0x5a05('0x81')][_0x5a05('0x7a')][_0x4da972[0x1]]===_0x5a05('0x2')){_0x5377e5(_0x5a05('0xe6')+_0x4da972[0x1]+']');return _0x47989f;}window['_QuatroDigital_DropDown'][_0x5a05('0x81')][_0x5a05('0x7a')][_0x4da972[0x1]][_0x5a05('0xe7')]=_0x5972d4;window[_0x5a05('0x17')][_0x5a05('0x81')][_0x5a05('0x7a')][_0x4da972[0x1]][_0x5a05('0xe8')]=_0x4da972[0x1];_0xe5ea43[_0x5a05('0xe9')]([window[_0x5a05('0x17')][_0x5a05('0x81')][_0x5a05('0x7a')][_0x4da972[0x1]]],[_0x5a05('0x7a'),_0x5a05('0x85'),_0x5a05('0x86')])['done'](function(_0x764245){window['_QuatroDigital_DropDown'][_0x5a05('0x81')]=_0x764245;_0x17c3f9(!![]);})[_0x5a05('0xe3')](function(_0x5cf7b2){_0x5377e5([_0x5a05('0xea'),_0x5cf7b2]);_0x17c3f9();});}else{_0x5377e5('atenção\x20esta\x20método\x20esta\x20descontinuado');}function _0x17c3f9(_0x4387e2){_0x4387e2=typeof _0x4387e2!=='boolean'?![]:_0x4387e2;_0x1cb058['getCartInfoByUrl']();window['_QuatroDigital_DropDown'][_0x5a05('0x6c')]=![];_0x1cb058[_0x5a05('0x6e')]();if(typeof window[_0x5a05('0x82')]!==_0x5a05('0x2')&&typeof window['_QuatroDigital_AmountProduct'][_0x5a05('0x83')]===_0x5a05('0xc'))window[_0x5a05('0x82')][_0x5a05('0x83')][_0x5a05('0x72')](this);if(typeof adminCart===_0x5a05('0xc'))adminCart();_0x1a5310['fn'][_0x5a05('0x6d')](!![],undefined,_0x4387e2);if(typeof _0x24a3cf===_0x5a05('0xc'))_0x24a3cf(_0x47989f);};};_0x1cb058['removeProduct']=function(_0x2e93a9,_0x5e12c4){var _0x2cc43d=![];var _0x35f0f8=_0x1a5310(_0x2e93a9);var _0x51ee98=_0x35f0f8[_0x5a05('0x9f')](_0x5a05('0xc5'));if(_0x48db25[_0x5a05('0x28')]){if(typeof window[_0x5a05('0x17')][_0x5a05('0x81')][_0x5a05('0x7a')][_0x51ee98]==='undefined'){_0x5377e5(_0x5a05('0xe6')+_0x51ee98+']');return _0x2cc43d;}window[_0x5a05('0x17')][_0x5a05('0x81')][_0x5a05('0x7a')][_0x51ee98][_0x5a05('0xe8')]=_0x51ee98;_0xe5ea43[_0x5a05('0xeb')]([window[_0x5a05('0x17')][_0x5a05('0x81')][_0x5a05('0x7a')][_0x51ee98]],[_0x5a05('0x7a'),_0x5a05('0x85'),_0x5a05('0x86')])[_0x5a05('0xd6')](function(_0x789f7a){_0x2cc43d=!![];window[_0x5a05('0x17')][_0x5a05('0x81')]=_0x789f7a;_0x5014d2(_0x789f7a);_0x37e69d(!![]);})[_0x5a05('0xe3')](function(_0x1f254d){_0x5377e5([_0x5a05('0xec'),_0x1f254d]);_0x37e69d();});}else{alert(_0x5a05('0xed'));}function _0x37e69d(_0x51f854){_0x51f854=typeof _0x51f854!=='boolean'?![]:_0x51f854;if(typeof window[_0x5a05('0x82')]!==_0x5a05('0x2')&&typeof window['_QuatroDigital_AmountProduct'][_0x5a05('0x83')]==='function')window[_0x5a05('0x82')]['exec'][_0x5a05('0x72')](this);if(typeof adminCart===_0x5a05('0xc'))adminCart();_0x1a5310['fn'][_0x5a05('0x6d')](!![],undefined,_0x51f854);if(typeof _0x5e12c4===_0x5a05('0xc'))_0x5e12c4(_0x2cc43d);};};_0x1cb058[_0x5a05('0x55')]=function(_0x1df2a2,_0xd82313,_0x1fa59d,_0x10f635){var _0x456cc9=_0x10f635||_0x1a5310('.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2');var _0x3b9e74=_0x1df2a2||'+';var _0xb6f004=_0xd82313||_0x456cc9[_0x5a05('0xee')]()*0.9;_0x456cc9[_0x5a05('0xd1')](!![],!![])['animate']({'scrollTop':isNaN(_0x1fa59d)?_0x3b9e74+'='+_0xb6f004+'px':_0x1fa59d});};if(!_0x48db25[_0x5a05('0x69')]){_0x1cb058[_0x5a05('0x6b')]();_0x1a5310['fn'][_0x5a05('0x6d')](!![]);}_0x1a5310(window)['on'](_0x5a05('0xef'),function(){try{window['_QuatroDigital_DropDown'][_0x5a05('0x81')]=undefined;_0x1cb058[_0x5a05('0x6b')]();}catch(_0x31d0e9){_0x5377e5(_0x5a05('0xf0')+_0x31d0e9[_0x5a05('0xf')],_0x5a05('0xf1'));}});if(typeof _0x48db25[_0x5a05('0xa')]===_0x5a05('0xc'))_0x48db25[_0x5a05('0xa')]['call'](this);else _0x5377e5(_0x5a05('0xf2'));};_0x1a5310['fn']['QD_dropDownCart']=function(_0x363aad){var _0x243d34;_0x243d34=_0x1a5310(this);_0x243d34['fn']=new _0x1a5310[(_0x5a05('0x18'))](this,_0x363aad);return _0x243d34;};}catch(_0x19fa6d){if(typeof console!=='undefined'&&typeof console[_0x5a05('0xd')]===_0x5a05('0xc'))console[_0x5a05('0xd')](_0x5a05('0xe'),_0x19fa6d);}}(this));(function(_0x2c715){'use strict';try{var _0x1b808f=jQuery;var _0x3661ab=_0x5a05('0xf3');var _0x394a9f=function(_0xbfb30,_0x45f389){if(_0x5a05('0x11')===typeof console&&_0x5a05('0x2')!==typeof console[_0x5a05('0xd')]&&'undefined'!==typeof console['info']&&_0x5a05('0x2')!==typeof console[_0x5a05('0x16')]){var _0xceb704;'object'===typeof _0xbfb30?(_0xbfb30[_0x5a05('0xf4')]('['+_0x3661ab+']\x0a'),_0xceb704=_0xbfb30):_0xceb704=['['+_0x3661ab+']\x0a'+_0xbfb30];if(_0x5a05('0x2')===typeof _0x45f389||_0x5a05('0x13')!==_0x45f389['toLowerCase']()&&_0x5a05('0xf5')!==_0x45f389[_0x5a05('0x14')]())if(_0x5a05('0x2')!==typeof _0x45f389&&_0x5a05('0x12')===_0x45f389[_0x5a05('0x14')]())try{console[_0x5a05('0x12')][_0x5a05('0x15')](console,_0xceb704);}catch(_0x503d2b){try{console[_0x5a05('0x12')](_0xceb704[_0x5a05('0x8')]('\x0a'));}catch(_0xf0b7fa){}}else try{console['error']['apply'](console,_0xceb704);}catch(_0x23e2c8){try{console['error'](_0xceb704[_0x5a05('0x8')]('\x0a'));}catch(_0x30a577){}}else try{console[_0x5a05('0x16')][_0x5a05('0x15')](console,_0xceb704);}catch(_0x2959d3){try{console['warn'](_0xceb704['join']('\x0a'));}catch(_0x3b1e29){}}}};window[_0x5a05('0x82')]=window[_0x5a05('0x82')]||{};window[_0x5a05('0x82')][_0x5a05('0x7a')]={};window[_0x5a05('0x82')][_0x5a05('0xf6')]=![];window[_0x5a05('0x82')][_0x5a05('0xf7')]=![];window[_0x5a05('0x82')]['quickViewUpdate']=![];var _0x2ebf7c=_0x5a05('0xf8');var _0x38e67a=function(){var _0xc8259b,_0x511cf8,_0x4d6da0,_0x53e855;_0x53e855=_0x2995a3();if(window['_QuatroDigital_AmountProduct']['allowRecalculate']){_0x1b808f(_0x5a05('0xf9'))['remove']();_0x1b808f('.qd-bap-item-added')[_0x5a05('0x4d')](_0x5a05('0xfa'));}for(var _0x181ed6 in window['_QuatroDigital_AmountProduct'][_0x5a05('0x7a')]){_0xc8259b=window['_QuatroDigital_AmountProduct'][_0x5a05('0x7a')][_0x181ed6];if(typeof _0xc8259b!==_0x5a05('0x11'))return;_0x4d6da0=_0x1b808f(_0x5a05('0xfb')+_0xc8259b['prodId']+']')[_0x5a05('0x0')]('li');if(!window[_0x5a05('0x82')][_0x5a05('0xf6')]&&_0x4d6da0['find'](_0x5a05('0xf9'))[_0x5a05('0x6')])continue;_0x511cf8=_0x1b808f(_0x2ebf7c);_0x511cf8[_0x5a05('0x40')](_0x5a05('0xfc'))[_0x5a05('0x44')](_0xc8259b['qtt']);var _0x1761e1=_0x4d6da0[_0x5a05('0x40')](_0x5a05('0xfd'));if(_0x1761e1['length'])_0x1761e1[_0x5a05('0xfe')](_0x511cf8)[_0x5a05('0x8b')](_0x5a05('0xfa'));else _0x4d6da0[_0x5a05('0xfe')](_0x511cf8);}if(_0x53e855)window[_0x5a05('0x82')]['allowRecalculate']=![];};var _0x2995a3=function(){if(!window[_0x5a05('0x82')][_0x5a05('0xf6')])return;var _0x1512e5=![],_0x2bc786={};window[_0x5a05('0x82')][_0x5a05('0x7a')]={};for(var _0x5baca7 in window['_QuatroDigital_DropDown'][_0x5a05('0x81')][_0x5a05('0x7a')]){if(typeof window['_QuatroDigital_DropDown']['getOrderForm'][_0x5a05('0x7a')][_0x5baca7]!==_0x5a05('0x11'))continue;var _0xbf2fab=window[_0x5a05('0x17')][_0x5a05('0x81')][_0x5a05('0x7a')][_0x5baca7];if(typeof _0xbf2fab[_0x5a05('0xff')]==='undefined'||_0xbf2fab[_0x5a05('0xff')]===null||_0xbf2fab[_0x5a05('0xff')]==='')continue;window[_0x5a05('0x82')][_0x5a05('0x7a')][_0x5a05('0x100')+_0xbf2fab[_0x5a05('0xff')]]=window['_QuatroDigital_AmountProduct'][_0x5a05('0x7a')][_0x5a05('0x100')+_0xbf2fab[_0x5a05('0xff')]]||{};window[_0x5a05('0x82')][_0x5a05('0x7a')][_0x5a05('0x100')+_0xbf2fab[_0x5a05('0xff')]]['prodId']=_0xbf2fab[_0x5a05('0xff')];if(!_0x2bc786[_0x5a05('0x100')+_0xbf2fab[_0x5a05('0xff')]])window[_0x5a05('0x82')]['items'][_0x5a05('0x100')+_0xbf2fab['productId']][_0x5a05('0x101')]=0x0;window[_0x5a05('0x82')]['items']['prod_'+_0xbf2fab['productId']][_0x5a05('0x101')]=window[_0x5a05('0x82')][_0x5a05('0x7a')][_0x5a05('0x100')+_0xbf2fab[_0x5a05('0xff')]][_0x5a05('0x101')]+_0xbf2fab[_0x5a05('0xe7')];_0x1512e5=!![];_0x2bc786[_0x5a05('0x100')+_0xbf2fab[_0x5a05('0xff')]]=!![];}return _0x1512e5;};window[_0x5a05('0x82')][_0x5a05('0x83')]=function(){window[_0x5a05('0x82')]['allowRecalculate']=!![];_0x38e67a['call'](this);};_0x1b808f(document)[_0x5a05('0x102')](function(){_0x38e67a['call'](this);});}catch(_0x58a2e8){if(typeof console!==_0x5a05('0x2')&&typeof console[_0x5a05('0xd')]===_0x5a05('0xc'))console[_0x5a05('0xd')](_0x5a05('0xe'),_0x58a2e8);}}(this));(function(){'use strict';try{var _0x29b1cd=jQuery,_0xcb43bf;var _0x14e781=_0x5a05('0x103');var _0x42397=function(_0x53480e,_0x1152b0){if('object'===typeof console&&_0x5a05('0x2')!==typeof console[_0x5a05('0xd')]&&_0x5a05('0x2')!==typeof console[_0x5a05('0x12')]&&_0x5a05('0x2')!==typeof console[_0x5a05('0x16')]){var _0x360022;'object'===typeof _0x53480e?(_0x53480e[_0x5a05('0xf4')]('['+_0x14e781+']\x0a'),_0x360022=_0x53480e):_0x360022=['['+_0x14e781+']\x0a'+_0x53480e];if(_0x5a05('0x2')===typeof _0x1152b0||_0x5a05('0x13')!==_0x1152b0[_0x5a05('0x14')]()&&_0x5a05('0xf5')!==_0x1152b0['toLowerCase']())if(_0x5a05('0x2')!==typeof _0x1152b0&&'info'===_0x1152b0[_0x5a05('0x14')]())try{console[_0x5a05('0x12')][_0x5a05('0x15')](console,_0x360022);}catch(_0x5150aa){try{console[_0x5a05('0x12')](_0x360022[_0x5a05('0x8')]('\x0a'));}catch(_0x1d15bd){}}else try{console[_0x5a05('0xd')][_0x5a05('0x15')](console,_0x360022);}catch(_0x284a2d){try{console[_0x5a05('0xd')](_0x360022['join']('\x0a'));}catch(_0x55656a){}}else try{console[_0x5a05('0x16')][_0x5a05('0x15')](console,_0x360022);}catch(_0x31eaee){try{console[_0x5a05('0x16')](_0x360022[_0x5a05('0x8')]('\x0a'));}catch(_0x10dd0c){}}}};var _0x552f15={'selector':_0x5a05('0x104'),'dropDown':{},'buyButton':{}};_0x29b1cd[_0x5a05('0x105')]=function(_0xe9d1d8){var _0x2a0cd4,_0x5511e1={};_0xcb43bf=_0x29b1cd['extend'](!![],{},_0x552f15,_0xe9d1d8);_0x2a0cd4=_0x29b1cd(_0xcb43bf[_0x5a05('0x106')])[_0x5a05('0x18')](_0xcb43bf['dropDown']);if(typeof _0xcb43bf[_0x5a05('0x107')][_0x5a05('0x69')]!=='undefined'&&_0xcb43bf[_0x5a05('0x107')][_0x5a05('0x69')]===![])_0x5511e1[_0x5a05('0x108')]=_0x29b1cd(_0xcb43bf[_0x5a05('0x106')])[_0x5a05('0x109')](_0x2a0cd4['fn'],_0xcb43bf['buyButton']);else _0x5511e1['buyButton']=_0x29b1cd(_0xcb43bf[_0x5a05('0x106')])[_0x5a05('0x109')](_0xcb43bf[_0x5a05('0x108')]);_0x5511e1[_0x5a05('0x107')]=_0x2a0cd4;return _0x5511e1;};_0x29b1cd['fn'][_0x5a05('0x10a')]=function(){if(typeof console==='object'&&typeof console[_0x5a05('0x12')]===_0x5a05('0xc'))console[_0x5a05('0x12')](_0x5a05('0x10b'));};_0x29b1cd[_0x5a05('0x10a')]=_0x29b1cd['fn']['smartCart'];}catch(_0x5c3ae8){if(typeof console!=='undefined'&&typeof console['error']===_0x5a05('0xc'))console[_0x5a05('0xd')]('Oooops!\x20',_0x5c3ae8);}}());
var _0x1e35=['QuatroDigital.QD_socialPhotos.callback','object','function','error','warn','unshift','[Quatro\x20Digital\x20-\x20localStorage]\x0a','undefined','alerta','aviso','toLowerCase','info','apply','join','qdLocalStorage','setItem','getItem','setTime','getTime','message','_expiration','removeItem','Aeeee\x20irmão!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20obter\x20os\x20dados\x20no\x20armazenamento\x20local.\x20Detalhes:\x20','QD_socialPhotos','[Quatro\x20Digital\x20Social\x20Photos]\x0a','timer','extend','---','tag','length','innerHTML','each','<ul\x20class=\x27instagram-tags-container\x27/>','empty','append','url','\x27\x20title=\x27','title','\x27\x20/></li>','ajaxCallback','trigger','QuatroDigital.QD_socialPhotos.ajaxCallback','instagram','socialType','data','images','caption','text','photosQtty','photos','photo','url_m','beznghevfzb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','toUpperCase','ite','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','\x20+\x20&count=','flickr','https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=3&extras=url_m&api_key=','&user_id=','user','filterByTag','&tags=','parse','ajax','done','Aeeee\x20irmão!\x20Problemas\x20para\x20obter\x20os\x20dados\x20via\x20API\x20do\x20Flickr\x20:(\x20.\x20Detalhes:\x20','callback'];(function(_0x183992,_0x4f3ee5){var _0x527f02=function(_0x3c3016){while(--_0x3c3016){_0x183992['push'](_0x183992['shift']());}};_0x527f02(++_0x4f3ee5);}(_0x1e35,0x93));var _0x5a05=function(_0x53f9ca,_0x165cd4){_0x53f9ca=_0x53f9ca-0x0;var _0x1b4025=_0x1e35[_0x53f9ca];return _0x1b4025;};(function(){var _0x263dd3=function(_0x4f7409,_0x40dbe7){if(_0x5a05('0x0')===typeof console&&_0x5a05('0x1')===typeof console[_0x5a05('0x2')]&&_0x5a05('0x1')===typeof console['info']&&_0x5a05('0x1')===typeof console[_0x5a05('0x3')]){var _0x137b6b;_0x5a05('0x0')===typeof _0x4f7409?(_0x4f7409[_0x5a05('0x4')](_0x5a05('0x5')),_0x137b6b=_0x4f7409):_0x137b6b=['[Quatro\x20Digital\x20-\x20localStorage]\x0a'+_0x4f7409];if(_0x5a05('0x6')===typeof _0x40dbe7||_0x5a05('0x7')!==_0x40dbe7['toLowerCase']()&&_0x5a05('0x8')!==_0x40dbe7[_0x5a05('0x9')]())if(_0x5a05('0x6')!==typeof _0x40dbe7&&_0x5a05('0xa')===_0x40dbe7[_0x5a05('0x9')]())try{console[_0x5a05('0xa')][_0x5a05('0xb')](console,_0x137b6b);}catch(_0x524f7b){console[_0x5a05('0xa')](_0x137b6b[_0x5a05('0xc')]('\x0a'));}else try{console['error'][_0x5a05('0xb')](console,_0x137b6b);}catch(_0x2cb37a){console[_0x5a05('0x2')](_0x137b6b[_0x5a05('0xc')]('\x0a'));}else try{console[_0x5a05('0x3')][_0x5a05('0xb')](console,_0x137b6b);}catch(_0x2bbe7a){console['warn'](_0x137b6b['join']('\x0a'));}}};window[_0x5a05('0xd')]=window[_0x5a05('0xd')]||{};var _0x24b5bb=_0x5a05('0x6')!==typeof localStorage&&_0x5a05('0x6')!==typeof localStorage[_0x5a05('0xe')]&&_0x5a05('0x6')!==typeof localStorage[_0x5a05('0xf')];window['qdLocalStorage'][_0x5a05('0xe')]=function(_0x565d97,_0x2f832e,_0x37f297){try{if(!_0x24b5bb)return!0x1;var _0x43d4b8=new Date();localStorage[_0x5a05('0xe')](_0x565d97,_0x2f832e);isNaN(parseInt(_0x37f297))||(_0x43d4b8[_0x5a05('0x10')](_0x43d4b8[_0x5a05('0x11')]()+0xea60*_0x37f297),localStorage['setItem'](_0x565d97+'_expiration',_0x43d4b8[_0x5a05('0x11')]()));}catch(_0x5e6f90){_0x263dd3(['Aeeee\x20irmão!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20salvar\x20os\x20dados\x20no\x20armazenamento\x20local.\x20Detalhes:\x20',_0x5e6f90[_0x5a05('0x12')]],_0x5a05('0x7'));}};window['qdLocalStorage'][_0x5a05('0xf')]=function(_0x51f276){try{if(!_0x24b5bb)return!0x1;var _0x4b1a8e=new Date(),_0x3e4c54=parseInt(localStorage[_0x5a05('0xf')](_0x51f276+_0x5a05('0x13'))||0x0,0xa)||0x0;return _0x4b1a8e[_0x5a05('0x11')]()>_0x3e4c54?(localStorage[_0x5a05('0x14')]&&(localStorage[_0x5a05('0x14')](_0x51f276),localStorage['removeItem'](_0x51f276+_0x5a05('0x13'))),null):localStorage[_0x5a05('0xf')](_0x51f276);}catch(_0x204507){_0x263dd3([_0x5a05('0x15'),_0x204507[_0x5a05('0x12')]],_0x5a05('0x7'));}};}());(function(_0x475351){var _0x472195=jQuery;if('function'!==typeof _0x472195['fn'][_0x5a05('0x16')]){var _0x34e70c=function(_0x401dc3,_0x268ce7){if(_0x5a05('0x0')===typeof console&&_0x5a05('0x1')===typeof console['error']&&_0x5a05('0x1')===typeof console['info']&&_0x5a05('0x1')===typeof console[_0x5a05('0x3')]){var _0xf16cc2;_0x5a05('0x0')===typeof _0x401dc3?(_0x401dc3[_0x5a05('0x4')]('[Quatro\x20Digital\x20Social\x20Photos]\x0a'),_0xf16cc2=_0x401dc3):_0xf16cc2=[_0x5a05('0x17')+_0x401dc3];if('undefined'===typeof _0x268ce7||_0x5a05('0x7')!==_0x268ce7[_0x5a05('0x9')]()&&_0x5a05('0x8')!==_0x268ce7['toLowerCase']())if('undefined'!==typeof _0x268ce7&&'info'===_0x268ce7[_0x5a05('0x9')]())try{console[_0x5a05('0xa')][_0x5a05('0xb')](console,_0xf16cc2);}catch(_0x2b874d){console[_0x5a05('0xa')](_0xf16cc2[_0x5a05('0xc')]('\x0a'));}else try{console['error']['apply'](console,_0xf16cc2);}catch(_0xfa8f15){console['error'](_0xf16cc2[_0x5a05('0xc')]('\x0a'));}else try{console[_0x5a05('0x3')][_0x5a05('0xb')](console,_0xf16cc2);}catch(_0x1e9fa4){console[_0x5a05('0x3')](_0xf16cc2['join']('\x0a'));}}};_0x472195['fn'][_0x5a05('0x16')]=function(_0x33e24e,_0x5dd802){function _0x48db25(){_0x37917b['disableReload']||setInterval(function(){_0x30e220();},_0x37917b[_0x5a05('0x18')]);}var _0x3acfc3=[],_0x4a176f=0x0;var _0x3e7020=_0x472195(this);if(!_0x3e7020['length'])return _0x3e7020;var _0x37917b=_0x472195[_0x5a05('0x19')]({},{'photosQtty':0x5,'tag':_0x5a05('0x1a'),'timer':0x3e8,'disableReload':!0x0,'socialType':'flickr','user':null,'filterByTag':!0x1,'ajaxCallback':function(_0x52d76d,_0x36d057,_0x5e67fe){},'callback':function(_0x5d2428,_0x3e99cd,_0xe328b1){}},_0x5dd802);0x2d0>_0x37917b['timer']&&(_0x37917b[_0x5a05('0x18')]=0x2d0);if(null!=_0x37917b[_0x5a05('0x1b')])var _0x2b772f=_0x37917b[_0x5a05('0x1b')];else{var _0x1e3dbf=_0x472195('#qd-instragram-hash-tag');_0x1e3dbf[_0x5a05('0x1c')]&&(_0x2b772f=_0x1e3dbf[0x0][_0x5a05('0x1d')]);}var _0x475351=function(){_0x3e7020[_0x5a05('0x1e')](function(){var _0x4b1541=_0x472195(_0x5a05('0x1f'));_0x472195(this)[_0x5a05('0x20')]()[_0x5a05('0x21')](_0x4b1541);for(var _0xe5ea43 in _0x3acfc3)_0x5a05('0x1')!==typeof _0x3acfc3[_0xe5ea43]&&_0x4b1541[_0x5a05('0x21')]('<li><img\x20src=\x27'+_0x3acfc3[_0xe5ea43][_0x5a05('0x22')]+_0x5a05('0x23')+_0x3acfc3[_0xe5ea43][_0x5a05('0x24')]+_0x5a05('0x25'));_0x37917b[_0x5a05('0x26')](_0x4a176f,_0x3e7020,_0x2b772f);_0x472195(window)[_0x5a05('0x27')](_0x5a05('0x28'),{'_length':_0x4a176f,'$this':_0x3e7020,'tag':_0x2b772f});});_0x48db25();};var _0x270c0e=function(_0x1234e1){try{if(_0x5a05('0x29')===_0x37917b[_0x5a05('0x2a')]){_0x4a176f=_0x1234e1[_0x5a05('0x2b')][_0x5a05('0x1c')];for(var _0x53cda2=0x0;_0x53cda2<_0x37917b['photosQtty']&&_0x53cda2<_0x4a176f;_0x53cda2++)_0x5a05('0x1')!==typeof _0x1234e1[_0x5a05('0x2b')][_0x53cda2]&&_0x3acfc3['push']({'url':_0x1234e1['data'][_0x53cda2][_0x5a05('0x2c')]['low_resolution']['url'],'title':_0x1234e1[_0x5a05('0x2b')][_0x53cda2][_0x5a05('0x2d')]?_0x1234e1[_0x5a05('0x2b')][_0x53cda2]['caption'][_0x5a05('0x2e')]:''});}else if('flickr'===_0x37917b[_0x5a05('0x2a')])for(_0x4a176f=_0x1234e1['photos']['total'],_0x53cda2=0x0;_0x53cda2<_0x37917b[_0x5a05('0x2f')]&&_0x53cda2<_0x4a176f;_0x53cda2++)_0x5a05('0x1')!==typeof _0x1234e1[_0x5a05('0x30')][_0x5a05('0x31')][_0x53cda2]&&_0x3acfc3['push']({'url':_0x1234e1[_0x5a05('0x30')][_0x5a05('0x31')][_0x53cda2][_0x5a05('0x32')],'title':_0x1234e1[_0x5a05('0x30')]['photo'][_0x53cda2]['title']||''});_0x475351();}catch(_0x1c37c6){_0x34e70c(['Problemas\x20ao\x20organizar\x20as\x20fotos\x20retornadas\x20da\x20API.',_0x1c37c6[_0x5a05('0x12')]],'alerta');}};_0x1e3dbf=function(_0x2f435e){var _0x4c1127={'s':_0x5a05('0x33')};return function(_0x1b0373){var _0x5dd802=function(_0x3e9e62){return _0x3e9e62;};var _0x336ff2=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x1b0373=_0x1b0373['d'+_0x336ff2[0x10]+'c'+_0x336ff2[0x11]+'m'+_0x5dd802(_0x336ff2[0x1])+'n'+_0x336ff2[0xd]]['l'+_0x336ff2[0x12]+'c'+_0x336ff2[0x0]+'ti'+_0x5dd802('o')+'n'];var _0x314145=function(_0xb70a51){return escape(encodeURIComponent(_0xb70a51['replace'](/\./g,'¨')[_0x5a05('0x34')](/[a-zA-Z]/g,function(_0x3e787d){return String[_0x5a05('0x35')](('Z'>=_0x3e787d?0x5a:0x7a)>=(_0x3e787d=_0x3e787d['charCodeAt'](0x0)+0xd)?_0x3e787d:_0x3e787d-0x1a);})));};var _0xe228a5=_0x314145(_0x1b0373[[_0x336ff2[0x9],_0x5dd802('o'),_0x336ff2[0xc],_0x336ff2[_0x5dd802(0xd)]][_0x5a05('0xc')]('')]);_0x314145=_0x314145((window[['js',_0x5dd802('no'),'m',_0x336ff2[0x1],_0x336ff2[0x4][_0x5a05('0x36')](),_0x5a05('0x37')][_0x5a05('0xc')]('')]||'---')+['.v',_0x336ff2[0xd],'e',_0x5dd802('x'),'co',_0x5dd802('mm'),_0x5a05('0x38'),_0x336ff2[0x1],'.c',_0x5dd802('o'),'m.',_0x336ff2[0x13],'r'][_0x5a05('0xc')](''));for(var _0x33e24e in _0x4c1127){if(_0x314145===_0x33e24e+_0x4c1127[_0x33e24e]||_0xe228a5===_0x33e24e+_0x4c1127[_0x33e24e]){var _0x3d1dbb='tr'+_0x336ff2[0x11]+'e';break;}_0x3d1dbb='f'+_0x336ff2[0x0]+'ls'+_0x5dd802(_0x336ff2[0x1])+'';}_0x5dd802=!0x1;-0x1<_0x1b0373[[_0x336ff2[0xc],'e',_0x336ff2[0x0],'rc',_0x336ff2[0x9]]['join']('')][_0x5a05('0x39')](_0x5a05('0x3a'))&&(_0x5dd802=!0x0);return[_0x3d1dbb,_0x5dd802];}(_0x2f435e);}(window);if(!eval(_0x1e3dbf[0x0]))return _0x1e3dbf[0x1]?_0x34e70c(_0x5a05('0x3b')):!0x1;var _0x30e220=function(){if(_0x5a05('0x29')===_0x37917b[_0x5a05('0x2a')])var _0x5dd802='https://api.instagram.com/v1/users/self/media/recent/?access_token='+_0x33e24e+_0x5a05('0x3c')+_0x37917b[_0x5a05('0x2f')];else _0x5a05('0x3d')===_0x37917b['socialType']&&(_0x5dd802=_0x5a05('0x3e')+_0x33e24e+_0x5a05('0x3f')+_0x37917b[_0x5a05('0x40')]+'&format=json&per_page='+_0x37917b['photosQtty']+'&jsoncallback=?',_0x37917b[_0x5a05('0x41')]&&(_0x5dd802=_0x5dd802+_0x5a05('0x42')+_0x37917b['filterByTag']));try{qdLocalStorage[_0x5a05('0xf')](_0x5a05('0x16')+_0x5dd802)&&_0x5a05('0x0')===typeof JSON?_0x270c0e(JSON[_0x5a05('0x43')](qdLocalStorage[_0x5a05('0xf')]('QD_socialPhotos'+_0x5dd802))):_0x472195[_0x5a05('0x44')]({'url':_0x5dd802,'dataType':'jsonp','cache':!0x0,'success':_0x270c0e})[_0x5a05('0x45')](function(_0x33c801){_0x5a05('0x0')===typeof JSON&&qdLocalStorage['setItem']('QD_socialPhotos'+_0x5dd802,JSON['stringify'](_0x33c801),0x3c);});}catch(_0x563f8e){_0x34e70c([_0x5a05('0x46'),_0x563f8e[_0x5a05('0x12')]],_0x5a05('0x7'));}};_0x30e220();_0x37917b[_0x5a05('0x47')](!0x0,_0x3e7020,_0x2b772f);_0x472195(window)[_0x5a05('0x27')](_0x5a05('0x48'),{'allowExec':!0x0,'$this':_0x3e7020,'tag':_0x2b772f});return _0x3e7020;};}}(this));
var _0x1bf1=['labelMessage','</label>','<select\x20data-qdssr-ndx=\x22','\x22\x20data-qdssr-title=\x22','<option\x20value=\x22\x22></option>','disabledMessage','</select></div>','appendTo','select','add','select2','bind','change','val','trigger','QuatroDigital.ssrChange','body','qd-ssr-reloading','redirect','split','shift','qd-ssr-loading','qd-ssr2-loading','qdAjax','removeAttr','html','data-qdssr-title','ajaxError','removeClass','Problemas\x20:(\x20.\x20Detalhes:\x20','optionIsChecked','</option>','getCategory','cache','innerHTML','indexOf','buscapagina','match','pop','extend','.qd_auto_select_smart_research_2','QD_SelectSmartResearch2','object','undefined','info','warn','[Quatro\x20Digital\x20-\x20QD\x20Select\x20Smart\x20Research\x202]\x0a','alerta','toLowerCase','aviso','apply','join','error','Selecione\x20o\x20anterior','Selecione\x20o(a)\x20','href','.search-single-navigator\x20ul.','attr','find','each','push','text','trim','length','Desculpe,\x20não\x20foi\x20possível\x20executar\x20sua\x20solicitação.\x20Por\x20favor\x20entre\x20em\x20contato\x20com\x20o\x20SAC.','beznghevfzb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','options','QuatroDigital.ssrSelectAjaxPopulated','data-qdssr-ndx','Problemas\x20ao\x20definir\x20a\x20opção\x20selecionada.\x20Detalhes:\x20','message','addClass','Problemas\x20ao\x20tentar\x20verificar\x20as\x20opções\x20selecionadas.\x20Detalhes:\x20','optionsPlaceHolder','index'];(function(_0x1de886,_0x351318){var _0x528c13=function(_0x1bec33){while(--_0x1bec33){_0x1de886['push'](_0x1de886['shift']());}};_0x528c13(++_0x351318);}(_0x1bf1,0x1c3));var _0x17fa=function(_0x96923e,_0x462f7b){_0x96923e=_0x96923e-0x0;var _0x216374=_0x1bf1[_0x96923e];return _0x216374;};(function(_0x8ba812){var _0x1d8f96=jQuery;if('function'!==typeof _0x1d8f96['fn'][_0x17fa('0x0')]){_0x1d8f96['fn'][_0x17fa('0x0')]=function(){};var _0x1a8b64=function(_0x1aaf95,_0x57a635){if(_0x17fa('0x1')===typeof console&&'undefined'!==typeof console['error']&&_0x17fa('0x2')!==typeof console[_0x17fa('0x3')]&&_0x17fa('0x2')!==typeof console[_0x17fa('0x4')]){var _0x4e22c6;_0x17fa('0x1')===typeof _0x1aaf95?(_0x1aaf95['unshift'](_0x17fa('0x5')),_0x4e22c6=_0x1aaf95):_0x4e22c6=[_0x17fa('0x5')+_0x1aaf95];if(_0x17fa('0x2')===typeof _0x57a635||_0x17fa('0x6')!==_0x57a635[_0x17fa('0x7')]()&&_0x17fa('0x8')!==_0x57a635[_0x17fa('0x7')]())if(_0x17fa('0x2')!==typeof _0x57a635&&_0x17fa('0x3')===_0x57a635['toLowerCase']())try{console[_0x17fa('0x3')][_0x17fa('0x9')](console,_0x4e22c6);}catch(_0x36fe70){try{console['info'](_0x4e22c6[_0x17fa('0xa')]('\x0a'));}catch(_0x2d0a40){}}else try{console[_0x17fa('0xb')]['apply'](console,_0x4e22c6);}catch(_0x20f165){try{console[_0x17fa('0xb')](_0x4e22c6['join']('\x0a'));}catch(_0x41cfc0){}}else try{console[_0x17fa('0x4')][_0x17fa('0x9')](console,_0x4e22c6);}catch(_0x1a65d5){try{console[_0x17fa('0x4')](_0x4e22c6[_0x17fa('0xa')]('\x0a'));}catch(_0x523589){}}}},_0x267e1a={'options':[],'optionsPlaceHolder':[],'disabledMessage':function(_0x58fa6b,_0x39657f,_0x1c178b){return _0x17fa('0xc');},'labelMessage':function(_0x17ec29,_0x3ef473,_0x5311e8){return _0x17fa('0xd')+_0x5311e8[_0x17ec29];},'redirect':function(_0x43e113){window['location'][_0x17fa('0xe')]=_0x43e113;},'getAjaxOptions':function(_0x5ec614,_0x5469c6){var _0x538717=[];_0x1d8f96(_0x5ec614)['find'](_0x17fa('0xf')+_0x5469c6[_0x17fa('0x10')]('data-qdssr-title'))[_0x17fa('0x11')]('a')[_0x17fa('0x12')](function(){var _0x5469c6=_0x1d8f96(this);_0x538717[_0x17fa('0x13')]([_0x5469c6[_0x17fa('0x14')]()[_0x17fa('0x15')](),_0x5469c6[_0x17fa('0x10')](_0x17fa('0xe'))||'']);});return _0x538717;},'optionIsChecked':function(_0x46c101){_0x46c101=_0x1d8f96('h5.'+_0x46c101+'\x20+ul\x20.filtro-ativo:first')[_0x17fa('0x14')]()[_0x17fa('0x15')]();return _0x46c101[_0x17fa('0x16')]?_0x46c101:null;},'ajaxError':function(){_0x1a8b64(_0x17fa('0x17'));}};_0x8ba812=function(_0x5a3e5e){var _0x285d8a={'s':_0x17fa('0x18')};return function(_0xe03e65){var _0x4cab54=function(_0x5271ca){return _0x5271ca;};var _0x4715e4=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0xe03e65=_0xe03e65['d'+_0x4715e4[0x10]+'c'+_0x4715e4[0x11]+'m'+_0x4cab54(_0x4715e4[0x1])+'n'+_0x4715e4[0xd]]['l'+_0x4715e4[0x12]+'c'+_0x4715e4[0x0]+'ti'+_0x4cab54('o')+'n'];var _0x1edc89=function(_0x1cbbf1){return escape(encodeURIComponent(_0x1cbbf1[_0x17fa('0x19')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x21aa76){return String[_0x17fa('0x1a')](('Z'>=_0x21aa76?0x5a:0x7a)>=(_0x21aa76=_0x21aa76['charCodeAt'](0x0)+0xd)?_0x21aa76:_0x21aa76-0x1a);})));};var _0x2a7565=_0x1edc89(_0xe03e65[[_0x4715e4[0x9],_0x4cab54('o'),_0x4715e4[0xc],_0x4715e4[_0x4cab54(0xd)]][_0x17fa('0xa')]('')]);_0x1edc89=_0x1edc89((window[['js',_0x4cab54('no'),'m',_0x4715e4[0x1],_0x4715e4[0x4]['toUpperCase'](),_0x17fa('0x1b')][_0x17fa('0xa')]('')]||_0x17fa('0x1c'))+['.v',_0x4715e4[0xd],'e',_0x4cab54('x'),'co',_0x4cab54('mm'),_0x17fa('0x1d'),_0x4715e4[0x1],'.c',_0x4cab54('o'),'m.',_0x4715e4[0x13],'r'][_0x17fa('0xa')](''));for(var _0x363960 in _0x285d8a){if(_0x1edc89===_0x363960+_0x285d8a[_0x363960]||_0x2a7565===_0x363960+_0x285d8a[_0x363960]){var _0x2697e7='tr'+_0x4715e4[0x11]+'e';break;}_0x2697e7='f'+_0x4715e4[0x0]+'ls'+_0x4cab54(_0x4715e4[0x1])+'';}_0x4cab54=!0x1;-0x1<_0xe03e65[[_0x4715e4[0xc],'e',_0x4715e4[0x0],'rc',_0x4715e4[0x9]][_0x17fa('0xa')]('')]['indexOf'](_0x17fa('0x1e'))&&(_0x4cab54=!0x0);return[_0x2697e7,_0x4cab54];}(_0x5a3e5e);}(window);if(!eval(_0x8ba812[0x0]))return _0x8ba812[0x1]?_0x1a8b64(_0x17fa('0x1f')):!0x1;_0x1d8f96[_0x17fa('0x0')]=function(_0x2a85e4,_0x3f52d0){if(!_0x3f52d0[_0x17fa('0x20')]['length'])return _0x1a8b64('Nenhuma\x20opção\x20foi\x20enviada,\x20é\x20esperado\x20um\x20array\x20com\x20sub\x20arrays\x20contendo\x20o\x20conjunto\x20chave/valor.');_0x2a85e4[_0x17fa('0x12')](function(){try{var _0xef6057=_0x1d8f96(this),_0x5087b5=_0xfb03db(_0xef6057,_0x3f52d0,_0x2a85e4);_0x2bc5c8(_0xef6057,_0x3f52d0,0x0);_0x5087b5['on'](_0x17fa('0x21'),function(_0x13ec37,_0x5aa3b9){try{_0x2bc5c8(_0xef6057,_0x3f52d0,_0x5aa3b9[_0x17fa('0x10')](_0x17fa('0x22')));}catch(_0x285f99){_0x1a8b64(_0x17fa('0x23')+_0x285f99[_0x17fa('0x24')]);}});_0xef6057[_0x17fa('0x25')]('qd-ssr2-loaded');}catch(_0x31720c){_0x1a8b64(_0x17fa('0x26')+_0x31720c[_0x17fa('0x24')]);}});};var _0xfb03db=function(_0x400a38,_0x493751,_0x15e8d8){try{for(var _0x2076c6='',_0x193299,_0x8ba812=!0x0,_0x57c38b=new _0x1d8f96(),_0x308a23=!0x1,_0x4f1c9d=0x0,_0x406f4a=0x0;_0x406f4a<_0x493751[_0x17fa('0x20')]['length'];_0x406f4a++){_0x17fa('0x1')!==typeof _0x493751[_0x17fa('0x20')][_0x406f4a]&&(_0x8ba812=!0x1);var _0x28427d=_0x493751[_0x17fa('0x27')][_0x406f4a]||'',_0x564c1e=_0x15e8d8[_0x17fa('0x28')](_0x400a38);_0x2076c6='<div\x20class=\x22qd-ssr2-option-wrapper\x22>';_0x2076c6+='<label\x20for=\x22qd-ssr2-select-'+_0x406f4a+_0x564c1e+'\x22>'+_0x493751[_0x17fa('0x29')](_0x406f4a,_0x493751[_0x17fa('0x20')],_0x493751[_0x17fa('0x27')])+_0x17fa('0x2a');_0x2076c6+=_0x17fa('0x2b')+_0x406f4a+'\x22\x20id=\x22qd-ssr2-select-'+_0x406f4a+_0x564c1e+_0x17fa('0x2c')+_0x28427d+'\x22>';_0x2076c6+=_0x17fa('0x2d');_0x8ba812?_0x2076c6+=_0x1fa468(_0x493751[_0x17fa('0x20')][_0x406f4a]):_0x28427d=_0x493751[_0x17fa('0x2e')](_0x406f4a,_0x493751['options'],_0x493751['optionsPlaceHolder']);_0x2076c6+=_0x17fa('0x2f');_0x193299=_0x1d8f96(_0x2076c6);_0x193299[_0x17fa('0x30')](_0x400a38);var _0x30f85a=_0x193299['find'](_0x17fa('0x31'));_0x57c38b=_0x57c38b[_0x17fa('0x32')](_0x30f85a);_0x8ba812||_0x30f85a[_0x17fa('0x10')]({'disabled':!0x0,'data-qdssr-str':_0x493751[_0x17fa('0x20')][_0x406f4a]});_0x30f85a[_0x17fa('0x33')]({'placeholder':_0x28427d,'language':'pt-BR'});_0x30f85a[_0x17fa('0x34')](_0x17fa('0x35'),function(_0x347ed3,_0x447fc){var _0x309cde=_0x1d8f96(this),_0xacf1b1=_0x400a38['find']('select[data-qdssr-ndx='+(parseInt(_0x309cde[_0x17fa('0x10')](_0x17fa('0x22'))||0x0,0xa)+0x1)+']'),_0x8ba812=(_0x309cde[_0x17fa('0x36')]()||'')['trim']();_0x447fc||(_0x308a23=!0x0);_0x1d8f96(window)[_0x17fa('0x37')](_0x17fa('0x38'),[_0xacf1b1,_0x308a23]);!_0xacf1b1['length']&&(!_0x447fc||_0x308a23&&_0x8ba812[_0x17fa('0x16')])&&(_0x1d8f96(document[_0x17fa('0x39')])[_0x17fa('0x25')](_0x17fa('0x3a')),_0x493751[_0x17fa('0x3b')](_0x8ba812));_0x8ba812=_0x8ba812[_0x17fa('0x3c')]('#')[_0x17fa('0x3d')]()['split']('?');_0x8ba812[0x1]=(_0xacf1b1[_0x17fa('0x10')]('data-qdssr-str')||'')+'&'+(_0x8ba812[0x1]||'');_0x1d8f96(document[_0x17fa('0x39')])[_0x17fa('0x25')](_0x17fa('0x3e'));_0x193299[_0x17fa('0x25')](_0x17fa('0x3f'));_0x4f1c9d+=0x1;_0x1d8f96[_0x17fa('0x40')]({'url':_0x8ba812['join']('?'),'dataType':'html','success':function(_0x4954cb){_0xacf1b1[_0x17fa('0x41')]('disabled');_0xacf1b1[_0x17fa('0x42')](_0x17fa('0x2d')+_0x1fa468(_0x493751['getAjaxOptions'](_0x4954cb,_0xacf1b1)));_0xacf1b1['select2']({'placeholder':_0xacf1b1[_0x17fa('0x10')](_0x17fa('0x43'))});_0x309cde['trigger']('QuatroDigital.ssrSelectAjaxPopulated',[_0xacf1b1]);},'error':function(){_0x493751[_0x17fa('0x44')][_0x17fa('0x9')](this,arguments);},'complete':function(){_0x193299[_0x17fa('0x45')]('qd-ssr2-loading');--_0x4f1c9d;0x0==_0x4f1c9d&&_0x1d8f96(document[_0x17fa('0x39')])[_0x17fa('0x45')](_0x17fa('0x3e'));},'clearQueueDelay':null});});}return _0x57c38b;}catch(_0x312b33){_0x1a8b64(_0x17fa('0x46')+_0x312b33[_0x17fa('0x24')]);}},_0x2bc5c8=function(_0x236a28,_0x302d1d,_0xf85a2c,_0x9b329a){_0x302d1d=_0x302d1d[_0x17fa('0x47')](_0x302d1d[_0x17fa('0x27')][_0xf85a2c]);null!==_0x302d1d&&(_0x9b329a=_0x9b329a||_0x236a28[_0x17fa('0x11')]('select[data-qdssr-ndx='+_0xf85a2c+']'),_0x9b329a[_0x17fa('0x36')](_0x9b329a[_0x17fa('0x11')]('option[data-qdssr-text=\x27'+_0x302d1d+'\x27]')[_0x17fa('0x36')]())[_0x17fa('0x37')](_0x17fa('0x35'),!0x0));},_0x1fa468=function(_0x1605ae){for(var _0x30c9f1='',_0x10cc5b=0x0;_0x10cc5b<_0x1605ae['length'];_0x10cc5b++)_0x30c9f1+='<option\x20value=\x22'+(_0x1605ae[_0x10cc5b][0x1]||'')+'\x22\x20data-qdssr-text=\x22'+(_0x1605ae[_0x10cc5b][0x0]||'')['replace'](/\s\([0-9]+\)/,'')+'\x22>'+(_0x1605ae[_0x10cc5b][0x0]||'')+_0x17fa('0x48');return _0x30c9f1;};_0x1d8f96[_0x17fa('0x0')][_0x17fa('0x49')]=function(){if(_0x1d8f96['QD_SelectSmartResearch2'][_0x17fa('0x49')][_0x17fa('0x4a')])return _0x1d8f96[_0x17fa('0x0')][_0x17fa('0x49')][_0x17fa('0x4a')];var _0x56bdf2=[],_0x1f6c8c=[];_0x1d8f96('script:not([src])')[_0x17fa('0x12')](function(){var _0x6d6c34=_0x1d8f96(this)[0x0][_0x17fa('0x4b')];if(-0x1<_0x6d6c34[_0x17fa('0x4c')](_0x17fa('0x4d')))return _0x56bdf2=(decodeURIComponent((_0x6d6c34['match'](/\/buscapagina([^\'\"]+)/i)||[''])['pop']())[_0x17fa('0x4e')](/fq=c:[^\&]+/i)||[''])[_0x17fa('0x4f')]()[_0x17fa('0x3c')](':')[_0x17fa('0x4f')]()[_0x17fa('0x19')](/(^\/|\/$)/g,'')[_0x17fa('0x3c')]('/'),!0x1;});for(var _0x160aaa=0x0;_0x160aaa<_0x56bdf2['length'];_0x160aaa++)_0x56bdf2[_0x160aaa][_0x17fa('0x16')]&&_0x1f6c8c['push'](_0x56bdf2[_0x160aaa]);return _0x1d8f96[_0x17fa('0x0')][_0x17fa('0x49')][_0x17fa('0x4a')]=_0x1f6c8c;};_0x1d8f96[_0x17fa('0x0')][_0x17fa('0x49')][_0x17fa('0x4a')]=null;_0x1d8f96['fn']['QD_SelectSmartResearch2']=function(_0x223cee){var _0x2ff2d6=_0x1d8f96(this);if(!_0x2ff2d6['length'])return _0x2ff2d6;_0x223cee=_0x1d8f96[_0x17fa('0x50')]({},_0x267e1a,_0x223cee);_0x2ff2d6['qdPlugin']=new _0x1d8f96[(_0x17fa('0x0'))](_0x2ff2d6,_0x223cee);return _0x2ff2d6;};_0x1d8f96(function(){_0x1d8f96(_0x17fa('0x51'))['QD_SelectSmartResearch2']();});}}(this));
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
