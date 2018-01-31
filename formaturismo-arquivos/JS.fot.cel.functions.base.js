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
var _0xa564=['.qd-am-collection','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','url','html','each','img[alt=\x27','attr','data-qdam-value','.box-banner','clone','insertBefore','hide','qd-am-content-loaded','trim','[class*=\x27colunas\x27]','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','trigger','QuatroDigital.am.ajaxCallback','UL\x20do\x20menu\x20não\x20encontrada','qd-am-has-ul','children',':not(ul)','text','>li','qd-amazing-menu','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','add','qd-am-','-li','extend','exec','getParent','closest','function','QD_amazingMenu','object','undefined','error','info','warn','[QD\x20Amazing\x20Menu]\x0a','alerta','aviso','toLowerCase','apply','join','qdAmAddNdx','addClass','first','qd-am-first','last','beznghevfzb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','toUpperCase','ite','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter'];(function(_0x11c371,_0x1a4888){var _0x24c620=function(_0x3a4e00){while(--_0x3a4e00){_0x11c371['push'](_0x11c371['shift']());}};_0x24c620(++_0x1a4888);}(_0xa564,0x104));var _0x557b=function(_0x2274f5,_0x40874e){_0x2274f5=_0x2274f5-0x0;var _0x3022cd=_0xa564[_0x2274f5];return _0x3022cd;};(function(_0x2d2c9c){_0x2d2c9c['fn'][_0x557b('0x0')]=_0x2d2c9c['fn'][_0x557b('0x1')];}(jQuery));(function(_0xa82956){var _0x3022f1;var _0x32b0e5=jQuery;if(_0x557b('0x2')!==typeof _0x32b0e5['fn'][_0x557b('0x3')]){var _0x1a70a6={'url':'/qd-amazing-menu','callback':function(){},'ajaxCallback':function(){}};var _0x3f46f7=function(_0x172ddb,_0xd97d9c){if(_0x557b('0x4')===typeof console&&_0x557b('0x5')!==typeof console[_0x557b('0x6')]&&_0x557b('0x5')!==typeof console[_0x557b('0x7')]&&_0x557b('0x5')!==typeof console[_0x557b('0x8')]){var _0x3acc36;'object'===typeof _0x172ddb?(_0x172ddb['unshift'](_0x557b('0x9')),_0x3acc36=_0x172ddb):_0x3acc36=['[QD\x20Amazing\x20Menu]\x0a'+_0x172ddb];if(_0x557b('0x5')===typeof _0xd97d9c||_0x557b('0xa')!==_0xd97d9c['toLowerCase']()&&_0x557b('0xb')!==_0xd97d9c[_0x557b('0xc')]())if(_0x557b('0x5')!==typeof _0xd97d9c&&'info'===_0xd97d9c['toLowerCase']())try{console[_0x557b('0x7')][_0x557b('0xd')](console,_0x3acc36);}catch(_0x165212){try{console[_0x557b('0x7')](_0x3acc36[_0x557b('0xe')]('\x0a'));}catch(_0x246a4b){}}else try{console[_0x557b('0x6')][_0x557b('0xd')](console,_0x3acc36);}catch(_0x3cbeec){try{console[_0x557b('0x6')](_0x3acc36[_0x557b('0xe')]('\x0a'));}catch(_0xdcf731){}}else try{console[_0x557b('0x8')][_0x557b('0xd')](console,_0x3acc36);}catch(_0xf5719d){try{console[_0x557b('0x8')](_0x3acc36[_0x557b('0xe')]('\x0a'));}catch(_0x25158e){}}}};_0x32b0e5['fn'][_0x557b('0xf')]=function(){var _0x144d2a=_0x32b0e5(this);_0x144d2a['each'](function(_0x22f614){_0x32b0e5(this)[_0x557b('0x10')]('qd-am-li-'+_0x22f614);});_0x144d2a[_0x557b('0x11')]()[_0x557b('0x10')](_0x557b('0x12'));_0x144d2a[_0x557b('0x13')]()[_0x557b('0x10')]('qd-am-last');return _0x144d2a;};_0x32b0e5['fn']['QD_amazingMenu']=function(){};_0xa82956=function(_0x24f5db){var _0x186dd8={'s':_0x557b('0x14')};return function(_0x5c7ac4){var _0x704349=function(_0x35d4e8){return _0x35d4e8;};var _0x11e3cc=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5c7ac4=_0x5c7ac4['d'+_0x11e3cc[0x10]+'c'+_0x11e3cc[0x11]+'m'+_0x704349(_0x11e3cc[0x1])+'n'+_0x11e3cc[0xd]]['l'+_0x11e3cc[0x12]+'c'+_0x11e3cc[0x0]+'ti'+_0x704349('o')+'n'];var _0x9e9973=function(_0x215ccf){return escape(encodeURIComponent(_0x215ccf['replace'](/\./g,'¨')[_0x557b('0x15')](/[a-zA-Z]/g,function(_0x496897){return String[_0x557b('0x16')](('Z'>=_0x496897?0x5a:0x7a)>=(_0x496897=_0x496897['charCodeAt'](0x0)+0xd)?_0x496897:_0x496897-0x1a);})));};var _0x2300d1=_0x9e9973(_0x5c7ac4[[_0x11e3cc[0x9],_0x704349('o'),_0x11e3cc[0xc],_0x11e3cc[_0x704349(0xd)]][_0x557b('0xe')]('')]);_0x9e9973=_0x9e9973((window[['js',_0x704349('no'),'m',_0x11e3cc[0x1],_0x11e3cc[0x4][_0x557b('0x17')](),_0x557b('0x18')]['join']('')]||'---')+['.v',_0x11e3cc[0xd],'e',_0x704349('x'),'co',_0x704349('mm'),_0x557b('0x19'),_0x11e3cc[0x1],'.c',_0x704349('o'),'m.',_0x11e3cc[0x13],'r'][_0x557b('0xe')](''));for(var _0x529208 in _0x186dd8){if(_0x9e9973===_0x529208+_0x186dd8[_0x529208]||_0x2300d1===_0x529208+_0x186dd8[_0x529208]){var _0x444593='tr'+_0x11e3cc[0x11]+'e';break;}_0x444593='f'+_0x11e3cc[0x0]+'ls'+_0x704349(_0x11e3cc[0x1])+'';}_0x704349=!0x1;-0x1<_0x5c7ac4[[_0x11e3cc[0xc],'e',_0x11e3cc[0x0],'rc',_0x11e3cc[0x9]][_0x557b('0xe')]('')][_0x557b('0x1a')](_0x557b('0x1b'))&&(_0x704349=!0x0);return[_0x444593,_0x704349];}(_0x24f5db);}(window);if(!eval(_0xa82956[0x0]))return _0xa82956[0x1]?_0x3f46f7(_0x557b('0x1c')):!0x1;var _0x5e8b65=function(_0x14514d){var _0x2dc9ed=_0x14514d[_0x557b('0x1d')](_0x557b('0x1e'));var _0x5e720d=_0x2dc9ed[_0x557b('0x1f')]('.qd-am-banner');var _0x2338ba=_0x2dc9ed[_0x557b('0x1f')](_0x557b('0x20'));if(_0x5e720d[_0x557b('0x21')]||_0x2338ba['length'])_0x5e720d[_0x557b('0x22')]()[_0x557b('0x10')](_0x557b('0x23')),_0x2338ba[_0x557b('0x22')]()[_0x557b('0x10')](_0x557b('0x24')),_0x32b0e5[_0x557b('0x25')]({'url':_0x3022f1[_0x557b('0x26')],'dataType':_0x557b('0x27'),'success':function(_0x3dfe2e){var _0x1374f5=_0x32b0e5(_0x3dfe2e);_0x5e720d[_0x557b('0x28')](function(){var _0x3dfe2e=_0x32b0e5(this);var _0x31a8e8=_0x1374f5['find'](_0x557b('0x29')+_0x3dfe2e[_0x557b('0x2a')](_0x557b('0x2b'))+'\x27]');_0x31a8e8[_0x557b('0x21')]&&(_0x31a8e8[_0x557b('0x28')](function(){_0x32b0e5(this)[_0x557b('0x0')](_0x557b('0x2c'))[_0x557b('0x2d')]()[_0x557b('0x2e')](_0x3dfe2e);}),_0x3dfe2e[_0x557b('0x2f')]());})[_0x557b('0x10')](_0x557b('0x30'));_0x2338ba[_0x557b('0x28')](function(){var _0x3dfe2e={};var _0x241da5=_0x32b0e5(this);_0x1374f5['find']('h2')['each'](function(){if(_0x32b0e5(this)['text']()[_0x557b('0x31')]()[_0x557b('0xc')]()==_0x241da5[_0x557b('0x2a')](_0x557b('0x2b'))['trim']()[_0x557b('0xc')]())return _0x3dfe2e=_0x32b0e5(this),!0x1;});_0x3dfe2e['length']&&(_0x3dfe2e[_0x557b('0x28')](function(){_0x32b0e5(this)[_0x557b('0x0')](_0x557b('0x32'))[_0x557b('0x2d')]()[_0x557b('0x2e')](_0x241da5);}),_0x241da5[_0x557b('0x2f')]());})[_0x557b('0x10')](_0x557b('0x30'));},'error':function(){_0x3f46f7(_0x557b('0x33')+_0x3022f1[_0x557b('0x26')]+_0x557b('0x34'));},'complete':function(){_0x3022f1[_0x557b('0x35')]['call'](this);_0x32b0e5(window)[_0x557b('0x36')](_0x557b('0x37'),_0x14514d);},'clearQueueDelay':0xbb8});};_0x32b0e5['QD_amazingMenu']=function(_0xd7048f){var _0x28483d=_0xd7048f[_0x557b('0x1d')]('ul[itemscope]')[_0x557b('0x28')](function(){var _0x56ebf3=_0x32b0e5(this);if(!_0x56ebf3['length'])return _0x3f46f7([_0x557b('0x38'),_0xd7048f],'alerta');_0x56ebf3['find']('li\x20>ul')[_0x557b('0x22')]()[_0x557b('0x10')](_0x557b('0x39'));_0x56ebf3[_0x557b('0x1d')]('li')[_0x557b('0x28')](function(){var _0x52e0d0=_0x32b0e5(this);var _0x32bdb2=_0x52e0d0[_0x557b('0x3a')](_0x557b('0x3b'));_0x32bdb2[_0x557b('0x21')]&&_0x52e0d0[_0x557b('0x10')]('qd-am-elem-'+_0x32bdb2[_0x557b('0x11')]()[_0x557b('0x3c')]()[_0x557b('0x31')]()['replaceSpecialChars']()[_0x557b('0x15')](/\./g,'')[_0x557b('0x15')](/\s/g,'-')[_0x557b('0xc')]());});var _0x2d96b3=_0x56ebf3[_0x557b('0x1d')](_0x557b('0x3d'))[_0x557b('0xf')]();_0x56ebf3['addClass'](_0x557b('0x3e'));_0x2d96b3=_0x2d96b3[_0x557b('0x1d')](_0x557b('0x3f'));_0x2d96b3['each'](function(){var _0xbf2a25=_0x32b0e5(this);_0xbf2a25['find']('>li')['qdAmAddNdx']()[_0x557b('0x10')](_0x557b('0x40'));_0xbf2a25[_0x557b('0x10')](_0x557b('0x41'));_0xbf2a25[_0x557b('0x22')]()[_0x557b('0x10')](_0x557b('0x42'));});_0x2d96b3[_0x557b('0x10')](_0x557b('0x42'));var _0x1b0c6a=0x0,_0xa82956=function(_0x34f3f6){_0x1b0c6a+=0x1;_0x34f3f6=_0x34f3f6[_0x557b('0x3a')]('li')[_0x557b('0x3a')]('*');_0x34f3f6[_0x557b('0x21')]&&(_0x34f3f6['addClass'](_0x557b('0x43')+_0x1b0c6a),_0xa82956(_0x34f3f6));};_0xa82956(_0x56ebf3);_0x56ebf3[_0x557b('0x44')](_0x56ebf3[_0x557b('0x1d')]('ul'))[_0x557b('0x28')](function(){var _0x4cdd59=_0x32b0e5(this);_0x4cdd59[_0x557b('0x10')](_0x557b('0x45')+_0x4cdd59[_0x557b('0x3a')]('li')[_0x557b('0x21')]+_0x557b('0x46'));});});_0x5e8b65(_0x28483d);_0x3022f1['callback']['call'](this);_0x32b0e5(window)[_0x557b('0x36')]('QuatroDigital.am.callback',_0xd7048f);};_0x32b0e5['fn'][_0x557b('0x3')]=function(_0x3be847){var _0x5eb6cd=_0x32b0e5(this);if(!_0x5eb6cd[_0x557b('0x21')])return _0x5eb6cd;_0x3022f1=_0x32b0e5[_0x557b('0x47')]({},_0x1a70a6,_0x3be847);_0x5eb6cd[_0x557b('0x48')]=new _0x32b0e5[(_0x557b('0x3'))](_0x32b0e5(this));return _0x5eb6cd;};_0x32b0e5(function(){_0x32b0e5('.qd_amazing_menu_auto')[_0x557b('0x3')]();});}}(this));
var _0x4986=['removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','Oooops!\x20','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','.qdDdcContainer','selector','dropDown','buyButton','QD_buyButton','smartCart','getParent','closest','replace','abs','undefined','round','toFixed','split','length','join','_QuatroDigital_CartData','callback','Callbacks','function','error','message','object','warn','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','toLowerCase','aviso','info','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>','skuName','name','smartCheckout','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','vtexjs','checkout','SDK','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','find','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','body','removeClass','keyup.qd_ddc_closeFn','qd-bb-lightBoxBodyProdAdd','.qd-ddc-prodWrapper','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text','val','keyCode','.qd-ddc-shipping\x20.qd-ddc-cep-ok','click','.qd-ddc-cep-btn','preventDefault','hide','click._QD_DDC_closeShipping','target','.qd-ddc-cep-tooltip','.qd-ddc-cep-ok','shippingCalculate','.qd-ddc-cep','updateOnlyHover','getCartInfoByUrl','simpleCart','mouseleave.qd_ddc_hover','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','texts','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','html','linkCart','.qd_ddc_continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','each','call','clone','.qd-ddc-infoTotalValue','qtt','.qd-ddc-infoTotalShipping','shipping','allTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','.qd-ddc-wrapper','qd-ddc-prodLoaded','exec','addClass','getOrderForm','items','totalizers','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','qd-ddc-noItems','.qd-ddc-prodWrapper2','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','attr','qd-ddc-','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','.qd-ddc-remove','insertProdImg','.qd-ddc-image','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','shippingData','address','postalCode','actionButtons','cartIsEmpty','lastSku','filter','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','timeRemoveNewItemClass','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','forceImageHTTPS','string','http','qd-loaded','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','alerta','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','changeQantity','data-sku-index','click.qd_ddc_more','qd-loading','.qd-ddc-quantity','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','.qd-ddc-prodRow','click.qd_ddc_remove','stop','slideUp','remove','$1-$2$3','data','qdDdcLastPostalCode','BRA','done','.qd-dd-cep-slas','logisticsInfo','<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>','shippingEstimate','\x20dia\x20útil','\x20dias\x20útéis','<tr></tr>','<td>\x20R$\x20','price',',\x20entrega\x20em\x20','\x20para\x20o\x20CEP\x20','</td>','tbody','insertBefore','.qd-ddc-cep-tooltip-text','.qd-ddc-cep-close','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','_QuatroDigital_AmountProduct','quantity','index','atenção\x20esta\x20método\x20esta\x20descontinuado','removeProduct','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['];(function(_0x507337,_0x552e51){var _0x36e0ce=function(_0x4e8cad){while(--_0x4e8cad){_0x507337['push'](_0x507337['shift']());}};_0x36e0ce(++_0x552e51);}(_0x4986,0x10f));var _0x99ba=function(_0x3e6eec,_0x5b72b9){_0x3e6eec=_0x3e6eec-0x0;var _0x34ef1f=_0x4986[_0x3e6eec];return _0x34ef1f;};(function(_0x26eeae){_0x26eeae['fn'][_0x99ba('0x0')]=_0x26eeae['fn'][_0x99ba('0x1')];}(jQuery));function qd_number_format(_0x9c89c7,_0x4c2f6e,_0x114059,_0x4457f5){_0x9c89c7=(_0x9c89c7+'')[_0x99ba('0x2')](/[^0-9+\-Ee.]/g,'');_0x9c89c7=isFinite(+_0x9c89c7)?+_0x9c89c7:0x0;_0x4c2f6e=isFinite(+_0x4c2f6e)?Math[_0x99ba('0x3')](_0x4c2f6e):0x0;_0x4457f5=_0x99ba('0x4')===typeof _0x4457f5?',':_0x4457f5;_0x114059=_0x99ba('0x4')===typeof _0x114059?'.':_0x114059;var _0x1e37d9='',_0x1e37d9=function(_0x568012,_0x2cdfb2){var _0x4c2f6e=Math['pow'](0xa,_0x2cdfb2);return''+(Math[_0x99ba('0x5')](_0x568012*_0x4c2f6e)/_0x4c2f6e)[_0x99ba('0x6')](_0x2cdfb2);},_0x1e37d9=(_0x4c2f6e?_0x1e37d9(_0x9c89c7,_0x4c2f6e):''+Math['round'](_0x9c89c7))[_0x99ba('0x7')]('.');0x3<_0x1e37d9[0x0][_0x99ba('0x8')]&&(_0x1e37d9[0x0]=_0x1e37d9[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x4457f5));(_0x1e37d9[0x1]||'')[_0x99ba('0x8')]<_0x4c2f6e&&(_0x1e37d9[0x1]=_0x1e37d9[0x1]||'',_0x1e37d9[0x1]+=Array(_0x4c2f6e-_0x1e37d9[0x1]['length']+0x1)[_0x99ba('0x9')]('0'));return _0x1e37d9[_0x99ba('0x9')](_0x114059);};(function(){try{window[_0x99ba('0xa')]=window[_0x99ba('0xa')]||{},window['_QuatroDigital_CartData']['callback']=window[_0x99ba('0xa')][_0x99ba('0xb')]||$[_0x99ba('0xc')]();}catch(_0x5e4ad1){_0x99ba('0x4')!==typeof console&&_0x99ba('0xd')===typeof console['error']&&console[_0x99ba('0xe')]('Oooops!\x20',_0x5e4ad1[_0x99ba('0xf')]);}}());(function(_0x50b5aa){try{var _0x2669ad=jQuery,_0x4dc476=function(_0x4629c0,_0x266dd1){if(_0x99ba('0x10')===typeof console&&'undefined'!==typeof console[_0x99ba('0xe')]&&_0x99ba('0x4')!==typeof console['info']&&_0x99ba('0x4')!==typeof console[_0x99ba('0x11')]){var _0x5fadd2;_0x99ba('0x10')===typeof _0x4629c0?(_0x4629c0[_0x99ba('0x12')](_0x99ba('0x13')),_0x5fadd2=_0x4629c0):_0x5fadd2=['[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'+_0x4629c0];if(_0x99ba('0x4')===typeof _0x266dd1||'alerta'!==_0x266dd1[_0x99ba('0x14')]()&&_0x99ba('0x15')!==_0x266dd1[_0x99ba('0x14')]())if('undefined'!==typeof _0x266dd1&&_0x99ba('0x16')===_0x266dd1['toLowerCase']())try{console[_0x99ba('0x16')][_0x99ba('0x17')](console,_0x5fadd2);}catch(_0x45209e){try{console[_0x99ba('0x16')](_0x5fadd2[_0x99ba('0x9')]('\x0a'));}catch(_0x2e50f1){}}else try{console['error']['apply'](console,_0x5fadd2);}catch(_0x5a52eb){try{console['error'](_0x5fadd2[_0x99ba('0x9')]('\x0a'));}catch(_0x3af2b3){}}else try{console[_0x99ba('0x11')][_0x99ba('0x17')](console,_0x5fadd2);}catch(_0x2cd8ed){try{console['warn'](_0x5fadd2[_0x99ba('0x9')]('\x0a'));}catch(_0x3d1458){}}}};window['_QuatroDigital_DropDown']=window[_0x99ba('0x18')]||{};window[_0x99ba('0x18')][_0x99ba('0x19')]=!0x0;_0x2669ad['QD_dropDownCart']=function(){};_0x2669ad['fn'][_0x99ba('0x1a')]=function(){return{'fn':new _0x2669ad()};};var _0x4d5481=function(_0x17bbec){var _0x8a7bd5={'s':'beznghevfzb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x1feefa){var _0x52ff08=function(_0x5e6e55){return _0x5e6e55;};var _0x30d035=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x1feefa=_0x1feefa['d'+_0x30d035[0x10]+'c'+_0x30d035[0x11]+'m'+_0x52ff08(_0x30d035[0x1])+'n'+_0x30d035[0xd]]['l'+_0x30d035[0x12]+'c'+_0x30d035[0x0]+'ti'+_0x52ff08('o')+'n'];var _0x8dc75a=function(_0x54f66d){return escape(encodeURIComponent(_0x54f66d[_0x99ba('0x2')](/\./g,'¨')[_0x99ba('0x2')](/[a-zA-Z]/g,function(_0x4a9f3c){return String[_0x99ba('0x1b')](('Z'>=_0x4a9f3c?0x5a:0x7a)>=(_0x4a9f3c=_0x4a9f3c[_0x99ba('0x1c')](0x0)+0xd)?_0x4a9f3c:_0x4a9f3c-0x1a);})));};var _0x6ac9f9=_0x8dc75a(_0x1feefa[[_0x30d035[0x9],_0x52ff08('o'),_0x30d035[0xc],_0x30d035[_0x52ff08(0xd)]][_0x99ba('0x9')]('')]);_0x8dc75a=_0x8dc75a((window[['js',_0x52ff08('no'),'m',_0x30d035[0x1],_0x30d035[0x4][_0x99ba('0x1d')](),_0x99ba('0x1e')][_0x99ba('0x9')]('')]||_0x99ba('0x1f'))+['.v',_0x30d035[0xd],'e',_0x52ff08('x'),'co',_0x52ff08('mm'),_0x99ba('0x20'),_0x30d035[0x1],'.c',_0x52ff08('o'),'m.',_0x30d035[0x13],'r']['join'](''));for(var _0x3b11c9 in _0x8a7bd5){if(_0x8dc75a===_0x3b11c9+_0x8a7bd5[_0x3b11c9]||_0x6ac9f9===_0x3b11c9+_0x8a7bd5[_0x3b11c9]){var _0x22476b='tr'+_0x30d035[0x11]+'e';break;}_0x22476b='f'+_0x30d035[0x0]+'ls'+_0x52ff08(_0x30d035[0x1])+'';}_0x52ff08=!0x1;-0x1<_0x1feefa[[_0x30d035[0xc],'e',_0x30d035[0x0],'rc',_0x30d035[0x9]][_0x99ba('0x9')]('')][_0x99ba('0x21')](_0x99ba('0x22'))&&(_0x52ff08=!0x0);return[_0x22476b,_0x52ff08];}(_0x17bbec);}(window);if(!eval(_0x4d5481[0x0]))return _0x4d5481[0x1]?_0x4dc476(_0x99ba('0x23')):!0x1;_0x2669ad[_0x99ba('0x1a')]=function(_0x2e8283,_0x18331b){var _0x12e092=_0x2669ad(_0x2e8283);if(!_0x12e092['length'])return _0x12e092;var _0x12cc7b=_0x2669ad[_0x99ba('0x24')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x99ba('0x25'),'linkCheckout':_0x99ba('0x26'),'cartTotal':_0x99ba('0x27'),'emptyCart':_0x99ba('0x28'),'continueShopping':'Continuar\x20Comprando','shippingForm':_0x99ba('0x29')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'forceImageHTTPS':!0x1,'skuName':function(_0x4b3c35){return _0x4b3c35[_0x99ba('0x2a')]||_0x4b3c35[_0x99ba('0x2b')];},'callback':function(){},'callbackProductsList':function(){}},_0x18331b);_0x2669ad('');var _0x1429ae=this;if(_0x12cc7b[_0x99ba('0x2c')]){var _0x463ce4=!0x1;'undefined'===typeof window['vtexjs']&&(_0x4dc476(_0x99ba('0x2d')),_0x2669ad[_0x99ba('0x2e')]({'url':_0x99ba('0x2f'),'async':!0x1,'dataType':_0x99ba('0x30'),'error':function(){_0x4dc476(_0x99ba('0x31'));_0x463ce4=!0x0;}}));if(_0x463ce4)return _0x4dc476('A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!');}if(_0x99ba('0x10')===typeof window[_0x99ba('0x32')]&&_0x99ba('0x4')!==typeof window[_0x99ba('0x32')]['checkout'])var _0x50b5aa=window[_0x99ba('0x32')][_0x99ba('0x33')];else if('object'===typeof vtex&&'object'===typeof vtex[_0x99ba('0x33')]&&_0x99ba('0x4')!==typeof vtex[_0x99ba('0x33')][_0x99ba('0x34')])_0x50b5aa=new vtex[(_0x99ba('0x33'))][(_0x99ba('0x34'))]();else return _0x4dc476('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x1429ae[_0x99ba('0x35')]=_0x99ba('0x36');var _0x58a038=function(_0x417898){_0x2669ad(this)[_0x99ba('0x37')](_0x417898);_0x417898[_0x99ba('0x38')](_0x99ba('0x39'))[_0x99ba('0x3a')](_0x2669ad(_0x99ba('0x3b')))['on'](_0x99ba('0x3c'),function(){_0x12e092['removeClass'](_0x99ba('0x3d'));_0x2669ad(document[_0x99ba('0x3e')])[_0x99ba('0x3f')]('qd-bb-lightBoxBodyProdAdd');});_0x2669ad(document)['off'](_0x99ba('0x40'))['on'](_0x99ba('0x40'),function(_0x18c92f){0x1b==_0x18c92f['keyCode']&&(_0x12e092['removeClass'](_0x99ba('0x3d')),_0x2669ad(document[_0x99ba('0x3e')])['removeClass'](_0x99ba('0x41')));});var _0x18a780=_0x417898[_0x99ba('0x38')](_0x99ba('0x42'));_0x417898[_0x99ba('0x38')]('.qd-ddc-scrollUp')['on'](_0x99ba('0x43'),function(){_0x1429ae['scrollCart']('-',void 0x0,void 0x0,_0x18a780);return!0x1;});_0x417898['find']('.qd-ddc-scrollDown')['on']('click.qd_ddc_scrollDown',function(){_0x1429ae[_0x99ba('0x44')](void 0x0,void 0x0,void 0x0,_0x18a780);return!0x1;});var _0x5301cf=_0x417898['find'](_0x99ba('0x45'));_0x417898[_0x99ba('0x38')]('.qd-ddc-shipping\x20.qd-ddc-cep')[_0x99ba('0x46')]('')['on']('keyup.qd_ddc_cep',function(_0x2a7c8d){_0x1429ae['formatCepField'](_0x2669ad(this));0xd==_0x2a7c8d[_0x99ba('0x47')]&&_0x417898[_0x99ba('0x38')](_0x99ba('0x48'))[_0x99ba('0x49')]();});_0x417898[_0x99ba('0x38')](_0x99ba('0x4a'))[_0x99ba('0x49')](function(_0x942ac0){_0x942ac0['preventDefault']();_0x5301cf['toggle']();});_0x417898[_0x99ba('0x38')]('.qd-ddc-cep-close')[_0x99ba('0x49')](function(_0x159cde){_0x159cde[_0x99ba('0x4b')]();_0x5301cf[_0x99ba('0x4c')]();});_0x2669ad(document)['off'](_0x99ba('0x4d'))['on']('click._QD_DDC_closeShipping',function(_0x3879bc){_0x2669ad(_0x3879bc[_0x99ba('0x4e')])['closest'](_0x417898[_0x99ba('0x38')](_0x99ba('0x4f')))[_0x99ba('0x8')]||_0x5301cf['hide']();});_0x417898[_0x99ba('0x38')](_0x99ba('0x50'))[_0x99ba('0x49')](function(_0x3ad2e6){_0x3ad2e6[_0x99ba('0x4b')]();_0x1429ae[_0x99ba('0x51')](_0x417898[_0x99ba('0x38')](_0x99ba('0x52')));});if(_0x12cc7b[_0x99ba('0x53')]){var _0x18331b=0x0;_0x2669ad(this)['on']('mouseenter.qd_ddc_hover',function(){var _0x417898=function(){window[_0x99ba('0x18')]['allowUpdate']&&(_0x1429ae[_0x99ba('0x54')](),window[_0x99ba('0x18')][_0x99ba('0x19')]=!0x1,_0x2669ad['fn'][_0x99ba('0x55')](!0x0),_0x1429ae['cartIsEmpty']());};_0x18331b=setInterval(function(){_0x417898();},0x258);_0x417898();});_0x2669ad(this)['on'](_0x99ba('0x56'),function(){clearInterval(_0x18331b);});}};var _0x3f3950=function(_0x3b90ca){_0x3b90ca=_0x2669ad(_0x3b90ca);_0x12cc7b['texts'][_0x99ba('0x57')]=_0x12cc7b['texts'][_0x99ba('0x57')][_0x99ba('0x2')](_0x99ba('0x58'),_0x99ba('0x59'));_0x12cc7b[_0x99ba('0x5a')][_0x99ba('0x57')]=_0x12cc7b[_0x99ba('0x5a')][_0x99ba('0x57')][_0x99ba('0x2')](_0x99ba('0x5b'),_0x99ba('0x5c'));_0x12cc7b['texts']['cartTotal']=_0x12cc7b[_0x99ba('0x5a')][_0x99ba('0x57')]['replace'](_0x99ba('0x5d'),_0x99ba('0x5e'));_0x12cc7b[_0x99ba('0x5a')][_0x99ba('0x57')]=_0x12cc7b[_0x99ba('0x5a')]['cartTotal']['replace'](_0x99ba('0x5f'),_0x99ba('0x60'));_0x3b90ca['find'](_0x99ba('0x61'))[_0x99ba('0x62')](_0x12cc7b['texts'][_0x99ba('0x63')]);_0x3b90ca[_0x99ba('0x38')](_0x99ba('0x64'))[_0x99ba('0x62')](_0x12cc7b[_0x99ba('0x5a')]['continueShopping']);_0x3b90ca[_0x99ba('0x38')](_0x99ba('0x65'))[_0x99ba('0x62')](_0x12cc7b[_0x99ba('0x5a')][_0x99ba('0x66')]);_0x3b90ca[_0x99ba('0x38')](_0x99ba('0x67'))[_0x99ba('0x62')](_0x12cc7b['texts'][_0x99ba('0x57')]);_0x3b90ca[_0x99ba('0x38')](_0x99ba('0x68'))[_0x99ba('0x62')](_0x12cc7b[_0x99ba('0x5a')][_0x99ba('0x69')]);_0x3b90ca[_0x99ba('0x38')](_0x99ba('0x6a'))[_0x99ba('0x62')](_0x12cc7b[_0x99ba('0x5a')]['emptyCart']);return _0x3b90ca;}(this[_0x99ba('0x35')]);var _0x28a562=0x0;_0x12e092[_0x99ba('0x6b')](function(){0x0<_0x28a562?_0x58a038[_0x99ba('0x6c')](this,_0x3f3950[_0x99ba('0x6d')]()):_0x58a038[_0x99ba('0x6c')](this,_0x3f3950);_0x28a562++;});window['_QuatroDigital_CartData'][_0x99ba('0xb')][_0x99ba('0x3a')](function(){_0x2669ad(_0x99ba('0x6e'))[_0x99ba('0x62')](window['_QuatroDigital_CartData']['total']||'--');_0x2669ad('.qd-ddc-infoTotalItems')['html'](window[_0x99ba('0xa')][_0x99ba('0x6f')]||'0');_0x2669ad(_0x99ba('0x70'))[_0x99ba('0x62')](window[_0x99ba('0xa')][_0x99ba('0x71')]||'--');_0x2669ad('.qd-ddc-infoAllTotal')[_0x99ba('0x62')](window[_0x99ba('0xa')][_0x99ba('0x72')]||'--');});var _0x5bc31a=function(_0xeef855,_0x1342fe){if(_0x99ba('0x4')===typeof _0xeef855['items'])return _0x4dc476(_0x99ba('0x73'));_0x1429ae[_0x99ba('0x74')][_0x99ba('0x6c')](this,_0x1342fe);};_0x1429ae[_0x99ba('0x54')]=function(_0x1b5c75,_0x379f3e){'undefined'!=typeof _0x379f3e?window[_0x99ba('0x18')][_0x99ba('0x75')]=_0x379f3e:window[_0x99ba('0x18')][_0x99ba('0x75')]&&(_0x379f3e=window['_QuatroDigital_DropDown'][_0x99ba('0x75')]);setTimeout(function(){window['_QuatroDigital_DropDown'][_0x99ba('0x75')]=void 0x0;},_0x12cc7b['timeRemoveNewItemClass']);_0x2669ad(_0x99ba('0x76'))['removeClass'](_0x99ba('0x77'));if(_0x12cc7b[_0x99ba('0x2c')]){var _0xdbcb4c=function(_0x30a493){window[_0x99ba('0x18')]['getOrderForm']=_0x30a493;_0x5bc31a(_0x30a493,_0x379f3e);_0x99ba('0x4')!==typeof window['_QuatroDigital_AmountProduct']&&_0x99ba('0xd')===typeof window['_QuatroDigital_AmountProduct'][_0x99ba('0x78')]&&window['_QuatroDigital_AmountProduct'][_0x99ba('0x78')]['call'](this);_0x2669ad(_0x99ba('0x76'))[_0x99ba('0x79')](_0x99ba('0x77'));};'undefined'!==typeof window[_0x99ba('0x18')][_0x99ba('0x7a')]?(_0xdbcb4c(window['_QuatroDigital_DropDown'][_0x99ba('0x7a')]),_0x99ba('0xd')===typeof _0x1b5c75&&_0x1b5c75(window['_QuatroDigital_DropDown']['getOrderForm'])):_0x2669ad['QD_checkoutQueue']([_0x99ba('0x7b'),_0x99ba('0x7c'),'shippingData'],{'done':function(_0x143b41){_0xdbcb4c['call'](this,_0x143b41);_0x99ba('0xd')===typeof _0x1b5c75&&_0x1b5c75(_0x143b41);},'fail':function(_0x36f896){_0x4dc476([_0x99ba('0x7d'),_0x36f896]);}});}else alert(_0x99ba('0x7e'));};_0x1429ae['cartIsEmpty']=function(){var _0x391397=_0x2669ad(_0x99ba('0x76'));_0x391397[_0x99ba('0x38')]('.qd-ddc-prodRow')['length']?_0x391397['removeClass'](_0x99ba('0x7f')):_0x391397[_0x99ba('0x79')](_0x99ba('0x7f'));};_0x1429ae[_0x99ba('0x74')]=function(_0xffc391){var _0x18331b=_0x2669ad(_0x99ba('0x80'));_0x18331b['empty']();_0x18331b[_0x99ba('0x6b')](function(){var _0x18331b=_0x2669ad(this),_0x30ec1f,_0x4d54c8,_0x5856e7=_0x2669ad(''),_0x4b3f4d;for(_0x4b3f4d in window[_0x99ba('0x18')]['getOrderForm']['items'])if('object'===typeof window[_0x99ba('0x18')][_0x99ba('0x7a')][_0x99ba('0x7b')][_0x4b3f4d]){var _0x577ab0=window[_0x99ba('0x18')][_0x99ba('0x7a')][_0x99ba('0x7b')][_0x4b3f4d];var _0x2e8283=_0x577ab0['productCategoryIds'][_0x99ba('0x2')](/^\/|\/$/g,'')['split']('/');var _0x5de417=_0x2669ad(_0x99ba('0x81'));_0x5de417[_0x99ba('0x82')]({'data-sku':_0x577ab0['id'],'data-sku-index':_0x4b3f4d,'data-qd-departament':_0x2e8283[0x0],'data-qd-category':_0x2e8283[_0x2e8283[_0x99ba('0x8')]-0x1]});_0x5de417['addClass'](_0x99ba('0x83')+_0x577ab0['availability']);_0x5de417['find'](_0x99ba('0x84'))[_0x99ba('0x37')](_0x12cc7b[_0x99ba('0x2a')](_0x577ab0));_0x5de417[_0x99ba('0x38')](_0x99ba('0x85'))[_0x99ba('0x37')](isNaN(_0x577ab0[_0x99ba('0x86')])?_0x577ab0['sellingPrice']:0x0==_0x577ab0['sellingPrice']?_0x99ba('0x87'):(_0x2669ad(_0x99ba('0x88'))[_0x99ba('0x82')]('content')||'R$')+'\x20'+qd_number_format(_0x577ab0[_0x99ba('0x86')]/0x64,0x2,',','.'));_0x5de417[_0x99ba('0x38')]('.qd-ddc-quantity')[_0x99ba('0x82')]({'data-sku':_0x577ab0['id'],'data-sku-index':_0x4b3f4d})[_0x99ba('0x46')](_0x577ab0['quantity']);_0x5de417[_0x99ba('0x38')](_0x99ba('0x89'))[_0x99ba('0x82')]({'data-sku':_0x577ab0['id'],'data-sku-index':_0x4b3f4d});_0x1429ae[_0x99ba('0x8a')](_0x577ab0['id'],_0x5de417[_0x99ba('0x38')](_0x99ba('0x8b')),_0x577ab0['imageUrl']);_0x5de417['find'](_0x99ba('0x8c'))[_0x99ba('0x82')]({'data-sku':_0x577ab0['id'],'data-sku-index':_0x4b3f4d});_0x5de417[_0x99ba('0x8d')](_0x18331b);_0x5856e7=_0x5856e7['add'](_0x5de417);}try{var _0x21fcac=_0x18331b['getParent'](_0x99ba('0x76'))[_0x99ba('0x38')]('.qd-ddc-shipping\x20input');_0x21fcac[_0x99ba('0x8')]&&''==_0x21fcac[_0x99ba('0x46')]()&&window[_0x99ba('0x18')]['getOrderForm'][_0x99ba('0x8e')][_0x99ba('0x8f')]&&_0x21fcac[_0x99ba('0x46')](window[_0x99ba('0x18')][_0x99ba('0x7a')]['shippingData'][_0x99ba('0x8f')][_0x99ba('0x90')]);}catch(_0x29767a){_0x4dc476('Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20'+_0x29767a[_0x99ba('0xf')],_0x99ba('0x15'));}_0x1429ae[_0x99ba('0x91')](_0x18331b);_0x1429ae[_0x99ba('0x92')]();_0xffc391&&_0xffc391[_0x99ba('0x93')]&&function(){_0x4d54c8=_0x5856e7[_0x99ba('0x94')]('[data-sku=\x27'+_0xffc391[_0x99ba('0x93')]+'\x27]');_0x4d54c8[_0x99ba('0x8')]&&(_0x30ec1f=0x0,_0x5856e7[_0x99ba('0x6b')](function(){var _0xffc391=_0x2669ad(this);if(_0xffc391['is'](_0x4d54c8))return!0x1;_0x30ec1f+=_0xffc391['outerHeight']();}),_0x1429ae[_0x99ba('0x44')](void 0x0,void 0x0,_0x30ec1f,_0x18331b[_0x99ba('0x3a')](_0x18331b[_0x99ba('0x95')]())),_0x5856e7[_0x99ba('0x3f')](_0x99ba('0x96')),function(_0x437fae){_0x437fae[_0x99ba('0x79')](_0x99ba('0x97'));_0x437fae[_0x99ba('0x79')](_0x99ba('0x96'));setTimeout(function(){_0x437fae[_0x99ba('0x3f')](_0x99ba('0x97'));},_0x12cc7b[_0x99ba('0x98')]);}(_0x4d54c8),_0x2669ad(document['body'])[_0x99ba('0x79')](_0x99ba('0x99')),setTimeout(function(){_0x2669ad(document[_0x99ba('0x3e')])['removeClass'](_0x99ba('0x99'));},_0x12cc7b['timeRemoveNewItemClass']));}();});(function(){_QuatroDigital_DropDown[_0x99ba('0x7a')]['items']['length']?(_0x2669ad(_0x99ba('0x3e'))[_0x99ba('0x3f')](_0x99ba('0x9a'))['addClass'](_0x99ba('0x9b')),setTimeout(function(){_0x2669ad(_0x99ba('0x3e'))[_0x99ba('0x3f')](_0x99ba('0x9c'));},_0x12cc7b[_0x99ba('0x98')])):_0x2669ad(_0x99ba('0x3e'))[_0x99ba('0x3f')](_0x99ba('0x9d'))['addClass'](_0x99ba('0x9a'));}());_0x99ba('0xd')===typeof _0x12cc7b[_0x99ba('0x9e')]?_0x12cc7b[_0x99ba('0x9e')]['call'](this):_0x4dc476(_0x99ba('0x9f'));};_0x1429ae['insertProdImg']=function(_0x58e906,_0x369a11,_0x5a5a27){function _0x2f6eb8(){_0x12cc7b[_0x99ba('0xa0')]&&_0x99ba('0xa1')==typeof _0x5a5a27&&(_0x5a5a27=_0x5a5a27[_0x99ba('0x2')](_0x99ba('0xa2'),'https'));_0x369a11[_0x99ba('0x3f')](_0x99ba('0xa3'))['load'](function(){_0x2669ad(this)[_0x99ba('0x79')](_0x99ba('0xa3'));})[_0x99ba('0x82')]('src',_0x5a5a27);}_0x5a5a27?_0x2f6eb8():isNaN(_0x58e906)?_0x4dc476(_0x99ba('0xa4'),_0x99ba('0xa5')):alert(_0x99ba('0xa6'));};_0x1429ae[_0x99ba('0x91')]=function(_0x3bd54f){var _0x18331b=function(_0x52ecfd,_0xf0a9e5){var _0x367e89=_0x2669ad(_0x52ecfd);var _0x44b448=_0x367e89['attr'](_0x99ba('0xa7'));var _0x2e8283=_0x367e89[_0x99ba('0x82')]('data-sku-index');if(_0x44b448){var _0x284413=parseInt(_0x367e89['val']())||0x1;_0x1429ae[_0x99ba('0xa8')]([_0x44b448,_0x2e8283],_0x284413,_0x284413+0x1,function(_0x9b7e74){_0x367e89['val'](_0x9b7e74);'function'===typeof _0xf0a9e5&&_0xf0a9e5();});}};var _0x5f1c5a=function(_0x415e58,_0x2558a4){var _0x18331b=_0x2669ad(_0x415e58);var _0x1eee62=_0x18331b[_0x99ba('0x82')](_0x99ba('0xa7'));var _0x124fb6=_0x18331b[_0x99ba('0x82')](_0x99ba('0xa9'));if(_0x1eee62){var _0x2e8283=parseInt(_0x18331b[_0x99ba('0x46')]())||0x2;_0x1429ae['changeQantity']([_0x1eee62,_0x124fb6],_0x2e8283,_0x2e8283-0x1,function(_0x5b19b9){_0x18331b[_0x99ba('0x46')](_0x5b19b9);_0x99ba('0xd')===typeof _0x2558a4&&_0x2558a4();});}};var _0x538999=function(_0x2c6f39,_0x3d505a){var _0x2319e7=_0x2669ad(_0x2c6f39);var _0x414625=_0x2319e7['attr'](_0x99ba('0xa7'));var _0x2e8283=_0x2319e7[_0x99ba('0x82')]('data-sku-index');if(_0x414625){var _0x4a49c0=parseInt(_0x2319e7[_0x99ba('0x46')]())||0x1;_0x1429ae['changeQantity']([_0x414625,_0x2e8283],0x1,_0x4a49c0,function(_0x18011f){_0x2319e7[_0x99ba('0x46')](_0x18011f);'function'===typeof _0x3d505a&&_0x3d505a();});}};var _0x2e8283=_0x3bd54f['find']('.qd-ddc-prodQttWrapper:not(.qd_on)');_0x2e8283[_0x99ba('0x79')]('qd_on')['each'](function(){var _0x3bd54f=_0x2669ad(this);_0x3bd54f['find']('.qd-ddc-quantityMore')['on'](_0x99ba('0xaa'),function(_0x9bc084){_0x9bc084[_0x99ba('0x4b')]();_0x2e8283['addClass'](_0x99ba('0xab'));_0x18331b(_0x3bd54f['find'](_0x99ba('0xac')),function(){_0x2e8283['removeClass']('qd-loading');});});_0x3bd54f[_0x99ba('0x38')](_0x99ba('0xad'))['on'](_0x99ba('0xae'),function(_0xf73bb6){_0xf73bb6[_0x99ba('0x4b')]();_0x2e8283[_0x99ba('0x79')]('qd-loading');_0x5f1c5a(_0x3bd54f['find'](_0x99ba('0xac')),function(){_0x2e8283['removeClass'](_0x99ba('0xab'));});});_0x3bd54f[_0x99ba('0x38')]('.qd-ddc-quantity')['on'](_0x99ba('0xaf'),function(){_0x2e8283[_0x99ba('0x79')](_0x99ba('0xab'));_0x538999(this,function(){_0x2e8283[_0x99ba('0x3f')]('qd-loading');});});_0x3bd54f[_0x99ba('0x38')](_0x99ba('0xac'))['on'](_0x99ba('0xb0'),function(_0x26ee77){0xd==_0x26ee77[_0x99ba('0x47')]&&(_0x2e8283['addClass'](_0x99ba('0xab')),_0x538999(this,function(){_0x2e8283[_0x99ba('0x3f')]('qd-loading');}));});});_0x3bd54f[_0x99ba('0x38')](_0x99ba('0xb1'))['each'](function(){var _0x3bd54f=_0x2669ad(this);_0x3bd54f[_0x99ba('0x38')](_0x99ba('0x89'))['on'](_0x99ba('0xb2'),function(){_0x3bd54f[_0x99ba('0x79')](_0x99ba('0xab'));_0x1429ae['removeProduct'](_0x2669ad(this),function(_0x1ebfd9){_0x1ebfd9?_0x3bd54f[_0x99ba('0xb3')](!0x0)[_0x99ba('0xb4')](function(){_0x3bd54f[_0x99ba('0xb5')]();_0x1429ae[_0x99ba('0x92')]();}):_0x3bd54f['removeClass']('qd-loading');});return!0x1;});});};_0x1429ae['formatCepField']=function(_0x50a9ba){var _0x1be4d0=_0x50a9ba['val']();_0x1be4d0=_0x1be4d0['replace'](/[^0-9\-]/g,'');_0x1be4d0=_0x1be4d0[_0x99ba('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x99ba('0xb6'));_0x1be4d0=_0x1be4d0[_0x99ba('0x2')](/(.{9}).*/g,'$1');_0x50a9ba[_0x99ba('0x46')](_0x1be4d0);};_0x1429ae['shippingCalculate']=function(_0x45e710){var _0x36312e=_0x45e710[_0x99ba('0x46')]();0x9<=_0x36312e[_0x99ba('0x8')]&&(_0x45e710[_0x99ba('0xb7')](_0x99ba('0xb8'))!=_0x36312e&&_0x50b5aa['calculateShipping']({'postalCode':_0x36312e,'country':_0x99ba('0xb9')})[_0x99ba('0xba')](function(_0x1fb922){_0x45e710[_0x99ba('0x1')]('.qd-ddc-cep-tooltip-text')['find'](_0x99ba('0xbb'))['remove']();window[_0x99ba('0x18')][_0x99ba('0x7a')]=_0x1fb922;_0x1429ae[_0x99ba('0x54')]();_0x1fb922=_0x1fb922[_0x99ba('0x8e')][_0x99ba('0xbc')][0x0]['slas'];for(var _0x2e8283=_0x2669ad(_0x99ba('0xbd')),_0x30d1b4=0x0;_0x30d1b4<_0x1fb922[_0x99ba('0x8')];_0x30d1b4++){var _0x2c52d5=_0x1fb922[_0x30d1b4],_0x3ff207=0x1<_0x2c52d5[_0x99ba('0xbe')]?_0x2c52d5[_0x99ba('0xbe')][_0x99ba('0x2')]('bd',_0x99ba('0xbf')):_0x2c52d5[_0x99ba('0xbe')][_0x99ba('0x2')]('bd',_0x99ba('0xc0')),_0x29d095=_0x2669ad(_0x99ba('0xc1'));_0x29d095[_0x99ba('0x37')](_0x99ba('0xc2')+qd_number_format(_0x2c52d5[_0x99ba('0xc3')]/0x64,0x2,',','.')+'</td><td>'+_0x2c52d5[_0x99ba('0x2b')]+_0x99ba('0xc4')+_0x3ff207+_0x99ba('0xc5')+_0x36312e+_0x99ba('0xc6'));_0x29d095[_0x99ba('0x8d')](_0x2e8283[_0x99ba('0x38')](_0x99ba('0xc7')));}_0x2e8283[_0x99ba('0xc8')](_0x45e710['closest'](_0x99ba('0xc9'))[_0x99ba('0x38')](_0x99ba('0xca')));})[_0x99ba('0xcb')](function(_0x145ae0){_0x4dc476([_0x99ba('0xcc'),_0x145ae0]);updateCartData();}),_0x45e710[_0x99ba('0xb7')](_0x99ba('0xb8'),_0x36312e));};_0x1429ae[_0x99ba('0xa8')]=function(_0x14ab32,_0x43b5fc,_0x5b57d9,_0x266fe4){function _0x5f0b36(_0x33d8c3){_0x33d8c3='boolean'!==typeof _0x33d8c3?!0x1:_0x33d8c3;_0x1429ae[_0x99ba('0x54')]();window[_0x99ba('0x18')][_0x99ba('0x19')]=!0x1;_0x1429ae[_0x99ba('0x92')]();_0x99ba('0x4')!==typeof window['_QuatroDigital_AmountProduct']&&_0x99ba('0xd')===typeof window['_QuatroDigital_AmountProduct']['exec']&&window[_0x99ba('0xcd')]['exec'][_0x99ba('0x6c')](this);'function'===typeof adminCart&&adminCart();_0x2669ad['fn'][_0x99ba('0x55')](!0x0,void 0x0,_0x33d8c3);_0x99ba('0xd')===typeof _0x266fe4&&_0x266fe4(_0x43b5fc);}_0x5b57d9=_0x5b57d9||0x1;if(0x1>_0x5b57d9)return _0x43b5fc;if(_0x12cc7b[_0x99ba('0x2c')]){if(_0x99ba('0x4')===typeof window[_0x99ba('0x18')][_0x99ba('0x7a')][_0x99ba('0x7b')][_0x14ab32[0x1]])return _0x4dc476('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x14ab32[0x1]+']'),_0x43b5fc;window[_0x99ba('0x18')][_0x99ba('0x7a')][_0x99ba('0x7b')][_0x14ab32[0x1]][_0x99ba('0xce')]=_0x5b57d9;window['_QuatroDigital_DropDown'][_0x99ba('0x7a')][_0x99ba('0x7b')][_0x14ab32[0x1]][_0x99ba('0xcf')]=_0x14ab32[0x1];_0x50b5aa['updateItems']([window[_0x99ba('0x18')]['getOrderForm'][_0x99ba('0x7b')][_0x14ab32[0x1]]],[_0x99ba('0x7b'),_0x99ba('0x7c'),'shippingData'])['done'](function(_0x29b6f8){window['_QuatroDigital_DropDown']['getOrderForm']=_0x29b6f8;_0x5f0b36(!0x0);})['fail'](function(_0x3af1c2){_0x4dc476(['Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho',_0x3af1c2]);_0x5f0b36();});}else _0x4dc476(_0x99ba('0xd0'));};_0x1429ae[_0x99ba('0xd1')]=function(_0x3407b6,_0x360d9c){function _0x547b3d(_0x5311d0){_0x5311d0='boolean'!==typeof _0x5311d0?!0x1:_0x5311d0;'undefined'!==typeof window[_0x99ba('0xcd')]&&_0x99ba('0xd')===typeof window['_QuatroDigital_AmountProduct'][_0x99ba('0x78')]&&window['_QuatroDigital_AmountProduct'][_0x99ba('0x78')][_0x99ba('0x6c')](this);_0x99ba('0xd')===typeof adminCart&&adminCart();_0x2669ad['fn'][_0x99ba('0x55')](!0x0,void 0x0,_0x5311d0);'function'===typeof _0x360d9c&&_0x360d9c(_0xe861e9);}var _0xe861e9=!0x1,_0x2e8283=_0x2669ad(_0x3407b6)['attr'](_0x99ba('0xa9'));if(_0x12cc7b[_0x99ba('0x2c')]){if(_0x99ba('0x4')===typeof window['_QuatroDigital_DropDown'][_0x99ba('0x7a')][_0x99ba('0x7b')][_0x2e8283])return _0x4dc476(_0x99ba('0xd2')+_0x2e8283+']'),_0xe861e9;window[_0x99ba('0x18')][_0x99ba('0x7a')][_0x99ba('0x7b')][_0x2e8283][_0x99ba('0xcf')]=_0x2e8283;_0x50b5aa[_0x99ba('0xd3')]([window[_0x99ba('0x18')]['getOrderForm'][_0x99ba('0x7b')][_0x2e8283]],[_0x99ba('0x7b'),_0x99ba('0x7c'),_0x99ba('0x8e')])[_0x99ba('0xba')](function(_0x1d4bee){_0xe861e9=!0x0;window[_0x99ba('0x18')][_0x99ba('0x7a')]=_0x1d4bee;_0x5bc31a(_0x1d4bee);_0x547b3d(!0x0);})['fail'](function(_0x586e48){_0x4dc476([_0x99ba('0xd4'),_0x586e48]);_0x547b3d();});}else alert(_0x99ba('0xd5'));};_0x1429ae['scrollCart']=function(_0x48df76,_0x3e54e9,_0x77444a,_0x1bc6b8){_0x1bc6b8=_0x1bc6b8||_0x2669ad(_0x99ba('0xd6'));_0x48df76=_0x48df76||'+';_0x3e54e9=_0x3e54e9||0.9*_0x1bc6b8['height']();_0x1bc6b8['stop'](!0x0,!0x0)[_0x99ba('0xd7')]({'scrollTop':isNaN(_0x77444a)?_0x48df76+'='+_0x3e54e9+'px':_0x77444a});};_0x12cc7b[_0x99ba('0x53')]||(_0x1429ae[_0x99ba('0x54')](),_0x2669ad['fn']['simpleCart'](!0x0));_0x2669ad(window)['on'](_0x99ba('0xd8'),function(){try{window[_0x99ba('0x18')]['getOrderForm']=void 0x0,_0x1429ae[_0x99ba('0x54')]();}catch(_0x353c8){_0x4dc476(_0x99ba('0xd9')+_0x353c8[_0x99ba('0xf')],_0x99ba('0xda'));}});_0x99ba('0xd')===typeof _0x12cc7b['callback']?_0x12cc7b[_0x99ba('0xb')][_0x99ba('0x6c')](this):_0x4dc476(_0x99ba('0xdb'));};_0x2669ad['fn'][_0x99ba('0x1a')]=function(_0x313f1f){var _0x5d8890=_0x2669ad(this);_0x5d8890['fn']=new _0x2669ad[(_0x99ba('0x1a'))](this,_0x313f1f);return _0x5d8890;};}catch(_0x4f7d97){_0x99ba('0x4')!==typeof console&&_0x99ba('0xd')===typeof console[_0x99ba('0xe')]&&console[_0x99ba('0xe')](_0x99ba('0xdc'),_0x4f7d97);}}(this));(function(_0x4a4288){try{var _0x1dfb5a=jQuery;window['_QuatroDigital_AmountProduct']=window[_0x99ba('0xcd')]||{};window[_0x99ba('0xcd')]['items']={};window[_0x99ba('0xcd')][_0x99ba('0xdd')]=!0x1;window[_0x99ba('0xcd')][_0x99ba('0xde')]=!0x1;window[_0x99ba('0xcd')][_0x99ba('0xdf')]=!0x1;var _0x222418=function(){if(window[_0x99ba('0xcd')][_0x99ba('0xdd')]){var _0x4ce66c=!0x1;var _0x172be9={};window[_0x99ba('0xcd')]['items']={};for(_0x2d705d in window[_0x99ba('0x18')][_0x99ba('0x7a')]['items'])if(_0x99ba('0x10')===typeof window['_QuatroDigital_DropDown'][_0x99ba('0x7a')]['items'][_0x2d705d]){var _0x558184=window[_0x99ba('0x18')]['getOrderForm']['items'][_0x2d705d];_0x99ba('0x4')!==typeof _0x558184['productId']&&null!==_0x558184['productId']&&''!==_0x558184[_0x99ba('0xe0')]&&(window['_QuatroDigital_AmountProduct'][_0x99ba('0x7b')][_0x99ba('0xe1')+_0x558184[_0x99ba('0xe0')]]=window['_QuatroDigital_AmountProduct'][_0x99ba('0x7b')][_0x99ba('0xe1')+_0x558184[_0x99ba('0xe0')]]||{},window[_0x99ba('0xcd')][_0x99ba('0x7b')][_0x99ba('0xe1')+_0x558184[_0x99ba('0xe0')]][_0x99ba('0xe2')]=_0x558184[_0x99ba('0xe0')],_0x172be9[_0x99ba('0xe1')+_0x558184[_0x99ba('0xe0')]]||(window[_0x99ba('0xcd')][_0x99ba('0x7b')][_0x99ba('0xe1')+_0x558184[_0x99ba('0xe0')]][_0x99ba('0x6f')]=0x0),window['_QuatroDigital_AmountProduct'][_0x99ba('0x7b')][_0x99ba('0xe1')+_0x558184[_0x99ba('0xe0')]][_0x99ba('0x6f')]+=_0x558184[_0x99ba('0xce')],_0x4ce66c=!0x0,_0x172be9[_0x99ba('0xe1')+_0x558184[_0x99ba('0xe0')]]=!0x0);}var _0x2d705d=_0x4ce66c;}else _0x2d705d=void 0x0;window['_QuatroDigital_AmountProduct']['allowRecalculate']&&(_0x1dfb5a(_0x99ba('0xe3'))['remove'](),_0x1dfb5a(_0x99ba('0xe4'))['removeClass'](_0x99ba('0xe5')));for(var _0x36096b in window[_0x99ba('0xcd')][_0x99ba('0x7b')]){_0x558184=window[_0x99ba('0xcd')][_0x99ba('0x7b')][_0x36096b];if(_0x99ba('0x10')!==typeof _0x558184)return;_0x172be9=_0x1dfb5a(_0x99ba('0xe6')+_0x558184[_0x99ba('0xe2')]+']')[_0x99ba('0x0')]('li');if(window[_0x99ba('0xcd')][_0x99ba('0xdd')]||!_0x172be9['find'](_0x99ba('0xe3'))[_0x99ba('0x8')])_0x4ce66c=_0x1dfb5a(_0x99ba('0xe7')),_0x4ce66c[_0x99ba('0x38')](_0x99ba('0xe8'))['html'](_0x558184[_0x99ba('0x6f')]),_0x558184=_0x172be9['find'](_0x99ba('0xe9')),_0x558184[_0x99ba('0x8')]?_0x558184['prepend'](_0x4ce66c)[_0x99ba('0x79')]('qd-bap-item-added'):_0x172be9[_0x99ba('0xea')](_0x4ce66c);}_0x2d705d&&(window['_QuatroDigital_AmountProduct'][_0x99ba('0xdd')]=!0x1);};window[_0x99ba('0xcd')][_0x99ba('0x78')]=function(){window[_0x99ba('0xcd')]['allowRecalculate']=!0x0;_0x222418[_0x99ba('0x6c')](this);};_0x1dfb5a(document)['ajaxStop'](function(){_0x222418[_0x99ba('0x6c')](this);});}catch(_0x582efb){'undefined'!==typeof console&&'function'===typeof console[_0x99ba('0xe')]&&console[_0x99ba('0xe')](_0x99ba('0xdc'),_0x582efb);}}(this));(function(){try{var _0x23fd9d=jQuery,_0x4706fc,_0x88eaf8={'selector':_0x99ba('0xeb'),'dropDown':{},'buyButton':{}};_0x23fd9d['QD_smartCart']=function(_0x54b4c7){var _0x527293={};_0x4706fc=_0x23fd9d[_0x99ba('0x24')](!0x0,{},_0x88eaf8,_0x54b4c7);_0x54b4c7=_0x23fd9d(_0x4706fc[_0x99ba('0xec')])['QD_dropDownCart'](_0x4706fc[_0x99ba('0xed')]);_0x527293[_0x99ba('0xee')]=_0x99ba('0x4')!==typeof _0x4706fc[_0x99ba('0xed')][_0x99ba('0x53')]&&!0x1===_0x4706fc[_0x99ba('0xed')][_0x99ba('0x53')]?_0x23fd9d(_0x4706fc['selector'])[_0x99ba('0xef')](_0x54b4c7['fn'],_0x4706fc[_0x99ba('0xee')]):_0x23fd9d(_0x4706fc[_0x99ba('0xec')])[_0x99ba('0xef')](_0x4706fc[_0x99ba('0xee')]);_0x527293[_0x99ba('0xed')]=_0x54b4c7;return _0x527293;};_0x23fd9d['fn'][_0x99ba('0xf0')]=function(){_0x99ba('0x10')===typeof console&&_0x99ba('0xd')===typeof console[_0x99ba('0x16')]&&console[_0x99ba('0x16')]('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x23fd9d['smartCart']=_0x23fd9d['fn']['smartCart'];}catch(_0x5bd17b){_0x99ba('0x4')!==typeof console&&_0x99ba('0xd')===typeof console[_0x99ba('0xe')]&&console[_0x99ba('0xe')](_0x99ba('0xdc'),_0x5bd17b);}}());
var _0x550c=['error','function','info','warn','unshift','[Quatro\x20Digital\x20-\x20localStorage]\x0a','alerta','toLowerCase','undefined','apply','join','qdLocalStorage','setItem','getItem','setTime','getTime','_expiration','Aeeee\x20irmão!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20salvar\x20os\x20dados\x20no\x20armazenamento\x20local.\x20Detalhes:\x20','message','removeItem','Aeeee\x20irmão!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20obter\x20os\x20dados\x20no\x20armazenamento\x20local.\x20Detalhes:\x20','QD_socialPhotos','[Quatro\x20Digital\x20Social\x20Photos]\x0a','aviso','timer','length','extend','---','tag','each','<ul\x20class=\x27instagram-tags-container\x27/>','append','<li><img\x20src=\x27','url','\x27\x20title=\x27','ajaxCallback','trigger','instagram','socialType','photosQtty','data','push','low_resolution','caption','text','flickr','photos','total','photo','url_m','title','Problemas\x20ao\x20organizar\x20as\x20fotos\x20retornadas\x20da\x20API.','beznghevfzb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','charCodeAt','toUpperCase','ite','erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','https://api.instagram.com/v1/users/self/media/recent/?access_token=','\x20+\x20&count=','https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=3&extras=url_m&api_key=','&user_id=','&jsoncallback=?','filterByTag','&tags=','parse','jsonp','done','Aeeee\x20irmão!\x20Problemas\x20para\x20obter\x20os\x20dados\x20via\x20API\x20do\x20Flickr\x20:(\x20.\x20Detalhes:\x20','QuatroDigital.QD_socialPhotos.callback','object'];(function(_0x5c1ec7,_0x52d038){var _0x46d62f=function(_0x50cac3){while(--_0x50cac3){_0x5c1ec7['push'](_0x5c1ec7['shift']());}};_0x46d62f(++_0x52d038);}(_0x550c,0x123));var _0x56ae=function(_0x26ae47,_0x9913d3){_0x26ae47=_0x26ae47-0x0;var _0x6ce9fa=_0x550c[_0x26ae47];return _0x6ce9fa;};(function(){var _0x4f680a=function(_0x5b4826,_0x4a3682){if(_0x56ae('0x0')===typeof console&&'function'===typeof console[_0x56ae('0x1')]&&_0x56ae('0x2')===typeof console[_0x56ae('0x3')]&&_0x56ae('0x2')===typeof console[_0x56ae('0x4')]){var _0x57b080;_0x56ae('0x0')===typeof _0x5b4826?(_0x5b4826[_0x56ae('0x5')](_0x56ae('0x6')),_0x57b080=_0x5b4826):_0x57b080=['[Quatro\x20Digital\x20-\x20localStorage]\x0a'+_0x5b4826];if('undefined'===typeof _0x4a3682||_0x56ae('0x7')!==_0x4a3682['toLowerCase']()&&'aviso'!==_0x4a3682[_0x56ae('0x8')]())if(_0x56ae('0x9')!==typeof _0x4a3682&&_0x56ae('0x3')===_0x4a3682[_0x56ae('0x8')]())try{console[_0x56ae('0x3')][_0x56ae('0xa')](console,_0x57b080);}catch(_0x4a4c56){console['info'](_0x57b080['join']('\x0a'));}else try{console['error'][_0x56ae('0xa')](console,_0x57b080);}catch(_0x36471c){console[_0x56ae('0x1')](_0x57b080[_0x56ae('0xb')]('\x0a'));}else try{console[_0x56ae('0x4')][_0x56ae('0xa')](console,_0x57b080);}catch(_0x5db4b0){console[_0x56ae('0x4')](_0x57b080[_0x56ae('0xb')]('\x0a'));}}};window[_0x56ae('0xc')]=window[_0x56ae('0xc')]||{};var _0x44dcfd=_0x56ae('0x9')!==typeof localStorage&&'undefined'!==typeof localStorage[_0x56ae('0xd')]&&'undefined'!==typeof localStorage[_0x56ae('0xe')];window['qdLocalStorage'][_0x56ae('0xd')]=function(_0x12066b,_0x48f32d,_0x225616){try{if(!_0x44dcfd)return!0x1;var _0x5a0a06=new Date();localStorage[_0x56ae('0xd')](_0x12066b,_0x48f32d);isNaN(parseInt(_0x225616))||(_0x5a0a06[_0x56ae('0xf')](_0x5a0a06[_0x56ae('0x10')]()+0xea60*_0x225616),localStorage[_0x56ae('0xd')](_0x12066b+_0x56ae('0x11'),_0x5a0a06[_0x56ae('0x10')]()));}catch(_0x530eb7){_0x4f680a([_0x56ae('0x12'),_0x530eb7[_0x56ae('0x13')]],_0x56ae('0x7'));}};window[_0x56ae('0xc')][_0x56ae('0xe')]=function(_0x4bb1e3){try{if(!_0x44dcfd)return!0x1;var _0x2c3407=new Date(),_0x155cce=parseInt(localStorage['getItem'](_0x4bb1e3+_0x56ae('0x11'))||0x0,0xa)||0x0;return _0x2c3407['getTime']()>_0x155cce?(localStorage['removeItem']&&(localStorage[_0x56ae('0x14')](_0x4bb1e3),localStorage[_0x56ae('0x14')](_0x4bb1e3+_0x56ae('0x11'))),null):localStorage[_0x56ae('0xe')](_0x4bb1e3);}catch(_0x4abc77){_0x4f680a([_0x56ae('0x15'),_0x4abc77[_0x56ae('0x13')]],_0x56ae('0x7'));}};}());(function(_0x4d00e6){var _0x370d86=jQuery;if(_0x56ae('0x2')!==typeof _0x370d86['fn'][_0x56ae('0x16')]){var _0x5ea472=function(_0x59181e,_0x197ec0){if(_0x56ae('0x0')===typeof console&&_0x56ae('0x2')===typeof console[_0x56ae('0x1')]&&'function'===typeof console[_0x56ae('0x3')]&&'function'===typeof console[_0x56ae('0x4')]){var _0x5bfb33;_0x56ae('0x0')===typeof _0x59181e?(_0x59181e[_0x56ae('0x5')](_0x56ae('0x17')),_0x5bfb33=_0x59181e):_0x5bfb33=[_0x56ae('0x17')+_0x59181e];if(_0x56ae('0x9')===typeof _0x197ec0||_0x56ae('0x7')!==_0x197ec0[_0x56ae('0x8')]()&&_0x56ae('0x18')!==_0x197ec0['toLowerCase']())if(_0x56ae('0x9')!==typeof _0x197ec0&&_0x56ae('0x3')===_0x197ec0[_0x56ae('0x8')]())try{console[_0x56ae('0x3')]['apply'](console,_0x5bfb33);}catch(_0x15b200){console[_0x56ae('0x3')](_0x5bfb33[_0x56ae('0xb')]('\x0a'));}else try{console[_0x56ae('0x1')][_0x56ae('0xa')](console,_0x5bfb33);}catch(_0x563b45){console[_0x56ae('0x1')](_0x5bfb33[_0x56ae('0xb')]('\x0a'));}else try{console[_0x56ae('0x4')]['apply'](console,_0x5bfb33);}catch(_0x426950){console['warn'](_0x5bfb33[_0x56ae('0xb')]('\x0a'));}}};_0x370d86['fn'][_0x56ae('0x16')]=function(_0x1122db,_0x33bdb7){function _0x25ce3a(){_0x409319['disableReload']||setInterval(function(){_0x1bde3c();},_0x409319[_0x56ae('0x19')]);}var _0x46f0a5=[],_0x40cb85=0x0;var _0x2da5c0=_0x370d86(this);if(!_0x2da5c0[_0x56ae('0x1a')])return _0x2da5c0;var _0x409319=_0x370d86[_0x56ae('0x1b')]({},{'photosQtty':0x5,'tag':_0x56ae('0x1c'),'timer':0x3e8,'disableReload':!0x0,'socialType':'flickr','user':null,'filterByTag':!0x1,'ajaxCallback':function(_0x44295a,_0x5e7238,_0x2cc7a0){},'callback':function(_0x14b13f,_0x2b7e7f,_0x3f3d41){}},_0x33bdb7);0x2d0>_0x409319['timer']&&(_0x409319[_0x56ae('0x19')]=0x2d0);if(null!=_0x409319[_0x56ae('0x1d')])var _0x1fa90d=_0x409319[_0x56ae('0x1d')];else{var _0x4853b1=_0x370d86('#qd-instragram-hash-tag');_0x4853b1[_0x56ae('0x1a')]&&(_0x1fa90d=_0x4853b1[0x0]['innerHTML']);}var _0x4d00e6=function(){_0x2da5c0[_0x56ae('0x1e')](function(){var _0x381c37=_0x370d86(_0x56ae('0x1f'));_0x370d86(this)['empty']()[_0x56ae('0x20')](_0x381c37);for(var _0x3bfce8 in _0x46f0a5)_0x56ae('0x2')!==typeof _0x46f0a5[_0x3bfce8]&&_0x381c37['append'](_0x56ae('0x21')+_0x46f0a5[_0x3bfce8][_0x56ae('0x22')]+_0x56ae('0x23')+_0x46f0a5[_0x3bfce8]['title']+'\x27\x20/></li>');_0x409319[_0x56ae('0x24')](_0x40cb85,_0x2da5c0,_0x1fa90d);_0x370d86(window)[_0x56ae('0x25')]('QuatroDigital.QD_socialPhotos.ajaxCallback',{'_length':_0x40cb85,'$this':_0x2da5c0,'tag':_0x1fa90d});});_0x25ce3a();};var _0x2b814e=function(_0x419125){try{if(_0x56ae('0x26')===_0x409319[_0x56ae('0x27')]){_0x40cb85=_0x419125['data']['length'];for(var _0x15e37d=0x0;_0x15e37d<_0x409319[_0x56ae('0x28')]&&_0x15e37d<_0x40cb85;_0x15e37d++)'function'!==typeof _0x419125[_0x56ae('0x29')][_0x15e37d]&&_0x46f0a5[_0x56ae('0x2a')]({'url':_0x419125[_0x56ae('0x29')][_0x15e37d]['images'][_0x56ae('0x2b')][_0x56ae('0x22')],'title':_0x419125[_0x56ae('0x29')][_0x15e37d][_0x56ae('0x2c')]?_0x419125[_0x56ae('0x29')][_0x15e37d][_0x56ae('0x2c')][_0x56ae('0x2d')]:''});}else if(_0x56ae('0x2e')===_0x409319[_0x56ae('0x27')])for(_0x40cb85=_0x419125[_0x56ae('0x2f')][_0x56ae('0x30')],_0x15e37d=0x0;_0x15e37d<_0x409319[_0x56ae('0x28')]&&_0x15e37d<_0x40cb85;_0x15e37d++)_0x56ae('0x2')!==typeof _0x419125[_0x56ae('0x2f')][_0x56ae('0x31')][_0x15e37d]&&_0x46f0a5['push']({'url':_0x419125['photos'][_0x56ae('0x31')][_0x15e37d][_0x56ae('0x32')],'title':_0x419125[_0x56ae('0x2f')][_0x56ae('0x31')][_0x15e37d][_0x56ae('0x33')]||''});_0x4d00e6();}catch(_0xc9a702){_0x5ea472([_0x56ae('0x34'),_0xc9a702[_0x56ae('0x13')]],_0x56ae('0x7'));}};_0x4853b1=function(_0x25c6e6){var _0x2c2cb0={'s':_0x56ae('0x35')};return function(_0x5026aa){var _0x33bdb7=function(_0x138b8b){return _0x138b8b;};var _0xdd268f=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5026aa=_0x5026aa['d'+_0xdd268f[0x10]+'c'+_0xdd268f[0x11]+'m'+_0x33bdb7(_0xdd268f[0x1])+'n'+_0xdd268f[0xd]]['l'+_0xdd268f[0x12]+'c'+_0xdd268f[0x0]+'ti'+_0x33bdb7('o')+'n'];var _0xfbd5ad=function(_0x2e8caf){return escape(encodeURIComponent(_0x2e8caf[_0x56ae('0x36')](/\./g,'¨')[_0x56ae('0x36')](/[a-zA-Z]/g,function(_0x44dd99){return String['fromCharCode'](('Z'>=_0x44dd99?0x5a:0x7a)>=(_0x44dd99=_0x44dd99[_0x56ae('0x37')](0x0)+0xd)?_0x44dd99:_0x44dd99-0x1a);})));};var _0x48fd45=_0xfbd5ad(_0x5026aa[[_0xdd268f[0x9],_0x33bdb7('o'),_0xdd268f[0xc],_0xdd268f[_0x33bdb7(0xd)]][_0x56ae('0xb')]('')]);_0xfbd5ad=_0xfbd5ad((window[['js',_0x33bdb7('no'),'m',_0xdd268f[0x1],_0xdd268f[0x4][_0x56ae('0x38')](),_0x56ae('0x39')]['join']('')]||_0x56ae('0x1c'))+['.v',_0xdd268f[0xd],'e',_0x33bdb7('x'),'co',_0x33bdb7('mm'),_0x56ae('0x3a'),_0xdd268f[0x1],'.c',_0x33bdb7('o'),'m.',_0xdd268f[0x13],'r'][_0x56ae('0xb')](''));for(var _0x1122db in _0x2c2cb0){if(_0xfbd5ad===_0x1122db+_0x2c2cb0[_0x1122db]||_0x48fd45===_0x1122db+_0x2c2cb0[_0x1122db]){var _0x45c845='tr'+_0xdd268f[0x11]+'e';break;}_0x45c845='f'+_0xdd268f[0x0]+'ls'+_0x33bdb7(_0xdd268f[0x1])+'';}_0x33bdb7=!0x1;-0x1<_0x5026aa[[_0xdd268f[0xc],'e',_0xdd268f[0x0],'rc',_0xdd268f[0x9]][_0x56ae('0xb')]('')][_0x56ae('0x3b')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x33bdb7=!0x0);return[_0x45c845,_0x33bdb7];}(_0x25c6e6);}(window);if(!eval(_0x4853b1[0x0]))return _0x4853b1[0x1]?_0x5ea472(_0x56ae('0x3c')):!0x1;var _0x1bde3c=function(){if(_0x56ae('0x26')===_0x409319[_0x56ae('0x27')])var _0x33bdb7=_0x56ae('0x3d')+_0x1122db+_0x56ae('0x3e')+_0x409319[_0x56ae('0x28')];else _0x56ae('0x2e')===_0x409319['socialType']&&(_0x33bdb7=_0x56ae('0x3f')+_0x1122db+_0x56ae('0x40')+_0x409319['user']+'&format=json&per_page='+_0x409319['photosQtty']+_0x56ae('0x41'),_0x409319[_0x56ae('0x42')]&&(_0x33bdb7=_0x33bdb7+_0x56ae('0x43')+_0x409319[_0x56ae('0x42')]));try{qdLocalStorage[_0x56ae('0xe')](_0x56ae('0x16')+_0x33bdb7)&&_0x56ae('0x0')===typeof JSON?_0x2b814e(JSON[_0x56ae('0x44')](qdLocalStorage['getItem']('QD_socialPhotos'+_0x33bdb7))):_0x370d86['ajax']({'url':_0x33bdb7,'dataType':_0x56ae('0x45'),'cache':!0x0,'success':_0x2b814e})[_0x56ae('0x46')](function(_0x14d602){'object'===typeof JSON&&qdLocalStorage[_0x56ae('0xd')](_0x56ae('0x16')+_0x33bdb7,JSON['stringify'](_0x14d602),0x3c);});}catch(_0x5a88da){_0x5ea472([_0x56ae('0x47'),_0x5a88da['message']],_0x56ae('0x7'));}};_0x1bde3c();_0x409319['callback'](!0x0,_0x2da5c0,_0x1fa90d);_0x370d86(window)[_0x56ae('0x25')](_0x56ae('0x48'),{'allowExec':!0x0,'$this':_0x2da5c0,'tag':_0x1fa90d});return _0x2da5c0;};}}(this));
var _0x3db4=['QuatroDigital.ssrChange','body','qd-ssr-reloading','redirect','split','shift','data-qdssr-str','qd-ssr-loading','qd-ssr2-loading','qdAjax','removeAttr','disabled','html','data-qdssr-title','QuatroDigital.ssrSelectAjaxPopulated','ajaxError','removeClass','optionIsChecked','option[data-qdssr-text=\x27','<option\x20value=\x22','getCategory','script:not([src])','buscapagina','match','pop','cache','qdPlugin','.qd_auto_select_smart_research_2','function','QD_SelectSmartResearch2','object','error','undefined','info','warn','[Quatro\x20Digital\x20-\x20QD\x20Select\x20Smart\x20Research\x202]\x0a','alerta','toLowerCase','apply','join','Selecione\x20o\x20anterior','Selecione\x20o(a)\x20','location','find','each','push','text','trim','href','h5.','\x20+ul\x20.filtro-ativo:first','length','Desculpe,\x20não\x20foi\x20possível\x20executar\x20sua\x20solicitação.\x20Por\x20favor\x20entre\x20em\x20contato\x20com\x20o\x20SAC.','beznghevfzb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','options','attr','data-qdssr-ndx','Problemas\x20ao\x20definir\x20a\x20opção\x20selecionada.\x20Detalhes:\x20','message','addClass','qd-ssr2-loaded','optionsPlaceHolder','index','labelMessage','</label>','<select\x20data-qdssr-ndx=\x22','\x22\x20id=\x22qd-ssr2-select-','\x22\x20data-qdssr-title=\x22','<option\x20value=\x22\x22></option>','</select></div>','appendTo','select','add','select2','pt-BR','bind','change','select[data-qdssr-ndx=','val','trigger'];(function(_0x3b8cfe,_0x55481c){var _0x25a9c6=function(_0x45c186){while(--_0x45c186){_0x3b8cfe['push'](_0x3b8cfe['shift']());}};_0x25a9c6(++_0x55481c);}(_0x3db4,0xc8));var _0x2f8f=function(_0x11d9a1,_0x14afbf){_0x11d9a1=_0x11d9a1-0x0;var _0x16e386=_0x3db4[_0x11d9a1];return _0x16e386;};(function(_0x36a7f8){var _0x5487bd=jQuery;if(_0x2f8f('0x0')!==typeof _0x5487bd['fn'][_0x2f8f('0x1')]){_0x5487bd['fn'][_0x2f8f('0x1')]=function(){};var _0x397bfb=function(_0x4b701e,_0x2146e8){if(_0x2f8f('0x2')===typeof console&&'undefined'!==typeof console[_0x2f8f('0x3')]&&_0x2f8f('0x4')!==typeof console[_0x2f8f('0x5')]&&_0x2f8f('0x4')!==typeof console[_0x2f8f('0x6')]){var _0x24edf4;_0x2f8f('0x2')===typeof _0x4b701e?(_0x4b701e['unshift'](_0x2f8f('0x7')),_0x24edf4=_0x4b701e):_0x24edf4=[_0x2f8f('0x7')+_0x4b701e];if(_0x2f8f('0x4')===typeof _0x2146e8||_0x2f8f('0x8')!==_0x2146e8['toLowerCase']()&&'aviso'!==_0x2146e8[_0x2f8f('0x9')]())if(_0x2f8f('0x4')!==typeof _0x2146e8&&_0x2f8f('0x5')===_0x2146e8[_0x2f8f('0x9')]())try{console[_0x2f8f('0x5')][_0x2f8f('0xa')](console,_0x24edf4);}catch(_0x5798db){try{console[_0x2f8f('0x5')](_0x24edf4['join']('\x0a'));}catch(_0x593ddb){}}else try{console[_0x2f8f('0x3')][_0x2f8f('0xa')](console,_0x24edf4);}catch(_0xaaa966){try{console[_0x2f8f('0x3')](_0x24edf4[_0x2f8f('0xb')]('\x0a'));}catch(_0x38ae94){}}else try{console['warn'][_0x2f8f('0xa')](console,_0x24edf4);}catch(_0x3c31a3){try{console['warn'](_0x24edf4['join']('\x0a'));}catch(_0x53d02c){}}}},_0x3869a6={'options':[],'optionsPlaceHolder':[],'disabledMessage':function(_0xa65781,_0x3b5d6c,_0x2d2d43){return _0x2f8f('0xc');},'labelMessage':function(_0x1eab98,_0x580909,_0x286908){return _0x2f8f('0xd')+_0x286908[_0x1eab98];},'redirect':function(_0x153e3b){window[_0x2f8f('0xe')]['href']=_0x153e3b;},'getAjaxOptions':function(_0x5d7f2d,_0x540eff){var _0x1de813=[];_0x5487bd(_0x5d7f2d)['find']('.search-single-navigator\x20ul.'+_0x540eff['attr']('data-qdssr-title'))[_0x2f8f('0xf')]('a')[_0x2f8f('0x10')](function(){var _0x540eff=_0x5487bd(this);_0x1de813[_0x2f8f('0x11')]([_0x540eff[_0x2f8f('0x12')]()[_0x2f8f('0x13')](),_0x540eff['attr'](_0x2f8f('0x14'))||'']);});return _0x1de813;},'optionIsChecked':function(_0x260f99){_0x260f99=_0x5487bd(_0x2f8f('0x15')+_0x260f99+_0x2f8f('0x16'))[_0x2f8f('0x12')]()[_0x2f8f('0x13')]();return _0x260f99[_0x2f8f('0x17')]?_0x260f99:null;},'ajaxError':function(){_0x397bfb(_0x2f8f('0x18'));}};_0x36a7f8=function(_0x24b8b9){var _0x1ac95b={'s':_0x2f8f('0x19')};return function(_0x213bad){var _0x38baf4=function(_0x3bbbf7){return _0x3bbbf7;};var _0x18c6f8=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x213bad=_0x213bad['d'+_0x18c6f8[0x10]+'c'+_0x18c6f8[0x11]+'m'+_0x38baf4(_0x18c6f8[0x1])+'n'+_0x18c6f8[0xd]]['l'+_0x18c6f8[0x12]+'c'+_0x18c6f8[0x0]+'ti'+_0x38baf4('o')+'n'];var _0x258bc4=function(_0x5bb651){return escape(encodeURIComponent(_0x5bb651[_0x2f8f('0x1a')](/\./g,'¨')[_0x2f8f('0x1a')](/[a-zA-Z]/g,function(_0x17271a){return String[_0x2f8f('0x1b')](('Z'>=_0x17271a?0x5a:0x7a)>=(_0x17271a=_0x17271a[_0x2f8f('0x1c')](0x0)+0xd)?_0x17271a:_0x17271a-0x1a);})));};var _0x1d35ef=_0x258bc4(_0x213bad[[_0x18c6f8[0x9],_0x38baf4('o'),_0x18c6f8[0xc],_0x18c6f8[_0x38baf4(0xd)]][_0x2f8f('0xb')]('')]);_0x258bc4=_0x258bc4((window[['js',_0x38baf4('no'),'m',_0x18c6f8[0x1],_0x18c6f8[0x4][_0x2f8f('0x1d')](),'ite']['join']('')]||'---')+['.v',_0x18c6f8[0xd],'e',_0x38baf4('x'),'co',_0x38baf4('mm'),'erc',_0x18c6f8[0x1],'.c',_0x38baf4('o'),'m.',_0x18c6f8[0x13],'r'][_0x2f8f('0xb')](''));for(var _0x2b1a09 in _0x1ac95b){if(_0x258bc4===_0x2b1a09+_0x1ac95b[_0x2b1a09]||_0x1d35ef===_0x2b1a09+_0x1ac95b[_0x2b1a09]){var _0x512bb8='tr'+_0x18c6f8[0x11]+'e';break;}_0x512bb8='f'+_0x18c6f8[0x0]+'ls'+_0x38baf4(_0x18c6f8[0x1])+'';}_0x38baf4=!0x1;-0x1<_0x213bad[[_0x18c6f8[0xc],'e',_0x18c6f8[0x0],'rc',_0x18c6f8[0x9]][_0x2f8f('0xb')]('')]['indexOf'](_0x2f8f('0x1e'))&&(_0x38baf4=!0x0);return[_0x512bb8,_0x38baf4];}(_0x24b8b9);}(window);if(!eval(_0x36a7f8[0x0]))return _0x36a7f8[0x1]?_0x397bfb(_0x2f8f('0x1f')):!0x1;_0x5487bd[_0x2f8f('0x1')]=function(_0x2967e9,_0x135941){if(!_0x135941[_0x2f8f('0x20')][_0x2f8f('0x17')])return _0x397bfb('Nenhuma\x20opção\x20foi\x20enviada,\x20é\x20esperado\x20um\x20array\x20com\x20sub\x20arrays\x20contendo\x20o\x20conjunto\x20chave/valor.');_0x2967e9['each'](function(){try{var _0xc49ac=_0x5487bd(this),_0x5e338d=_0x4047b4(_0xc49ac,_0x135941,_0x2967e9);_0x85b263(_0xc49ac,_0x135941,0x0);_0x5e338d['on']('QuatroDigital.ssrSelectAjaxPopulated',function(_0x54e4c9,_0x3e6c0d){try{_0x85b263(_0xc49ac,_0x135941,_0x3e6c0d[_0x2f8f('0x21')](_0x2f8f('0x22')));}catch(_0x1cbb20){_0x397bfb(_0x2f8f('0x23')+_0x1cbb20[_0x2f8f('0x24')]);}});_0xc49ac[_0x2f8f('0x25')](_0x2f8f('0x26'));}catch(_0x5bc812){_0x397bfb('Problemas\x20ao\x20tentar\x20verificar\x20as\x20opções\x20selecionadas.\x20Detalhes:\x20'+_0x5bc812[_0x2f8f('0x24')]);}});};var _0x4047b4=function(_0x21522b,_0x25b6f2,_0x5d0fed){try{for(var _0x1a6ee6='',_0x55673f,_0x36a7f8=!0x0,_0x45e097=new _0x5487bd(),_0x5e378c=!0x1,_0x31cad1=0x0,_0x17d012=0x0;_0x17d012<_0x25b6f2[_0x2f8f('0x20')]['length'];_0x17d012++){_0x2f8f('0x2')!==typeof _0x25b6f2['options'][_0x17d012]&&(_0x36a7f8=!0x1);var _0x4f57a9=_0x25b6f2[_0x2f8f('0x27')][_0x17d012]||'',_0xb71f23=_0x5d0fed[_0x2f8f('0x28')](_0x21522b);_0x1a6ee6='<div\x20class=\x22qd-ssr2-option-wrapper\x22>';_0x1a6ee6+='<label\x20for=\x22qd-ssr2-select-'+_0x17d012+_0xb71f23+'\x22>'+_0x25b6f2[_0x2f8f('0x29')](_0x17d012,_0x25b6f2[_0x2f8f('0x20')],_0x25b6f2[_0x2f8f('0x27')])+_0x2f8f('0x2a');_0x1a6ee6+=_0x2f8f('0x2b')+_0x17d012+_0x2f8f('0x2c')+_0x17d012+_0xb71f23+_0x2f8f('0x2d')+_0x4f57a9+'\x22>';_0x1a6ee6+=_0x2f8f('0x2e');_0x36a7f8?_0x1a6ee6+=_0x1b401f(_0x25b6f2[_0x2f8f('0x20')][_0x17d012]):_0x4f57a9=_0x25b6f2['disabledMessage'](_0x17d012,_0x25b6f2['options'],_0x25b6f2[_0x2f8f('0x27')]);_0x1a6ee6+=_0x2f8f('0x2f');_0x55673f=_0x5487bd(_0x1a6ee6);_0x55673f[_0x2f8f('0x30')](_0x21522b);var _0x2730a6=_0x55673f[_0x2f8f('0xf')](_0x2f8f('0x31'));_0x45e097=_0x45e097[_0x2f8f('0x32')](_0x2730a6);_0x36a7f8||_0x2730a6[_0x2f8f('0x21')]({'disabled':!0x0,'data-qdssr-str':_0x25b6f2[_0x2f8f('0x20')][_0x17d012]});_0x2730a6[_0x2f8f('0x33')]({'placeholder':_0x4f57a9,'language':_0x2f8f('0x34')});_0x2730a6[_0x2f8f('0x35')](_0x2f8f('0x36'),function(_0x3a1283,_0x5903da){var _0x294fcc=_0x5487bd(this),_0x3b0690=_0x21522b['find'](_0x2f8f('0x37')+(parseInt(_0x294fcc['attr'](_0x2f8f('0x22'))||0x0,0xa)+0x1)+']'),_0x36a7f8=(_0x294fcc[_0x2f8f('0x38')]()||'')['trim']();_0x5903da||(_0x5e378c=!0x0);_0x5487bd(window)[_0x2f8f('0x39')](_0x2f8f('0x3a'),[_0x3b0690,_0x5e378c]);!_0x3b0690[_0x2f8f('0x17')]&&(!_0x5903da||_0x5e378c&&_0x36a7f8[_0x2f8f('0x17')])&&(_0x5487bd(document[_0x2f8f('0x3b')])[_0x2f8f('0x25')](_0x2f8f('0x3c')),_0x25b6f2[_0x2f8f('0x3d')](_0x36a7f8));_0x36a7f8=_0x36a7f8[_0x2f8f('0x3e')]('#')[_0x2f8f('0x3f')]()[_0x2f8f('0x3e')]('?');_0x36a7f8[0x1]=(_0x3b0690[_0x2f8f('0x21')](_0x2f8f('0x40'))||'')+'&'+(_0x36a7f8[0x1]||'');_0x5487bd(document[_0x2f8f('0x3b')])[_0x2f8f('0x25')](_0x2f8f('0x41'));_0x55673f['addClass'](_0x2f8f('0x42'));_0x31cad1+=0x1;_0x5487bd[_0x2f8f('0x43')]({'url':_0x36a7f8['join']('?'),'dataType':'html','success':function(_0x197cbb){_0x3b0690[_0x2f8f('0x44')](_0x2f8f('0x45'));_0x3b0690[_0x2f8f('0x46')](_0x2f8f('0x2e')+_0x1b401f(_0x25b6f2['getAjaxOptions'](_0x197cbb,_0x3b0690)));_0x3b0690[_0x2f8f('0x33')]({'placeholder':_0x3b0690[_0x2f8f('0x21')](_0x2f8f('0x47'))});_0x294fcc[_0x2f8f('0x39')](_0x2f8f('0x48'),[_0x3b0690]);},'error':function(){_0x25b6f2[_0x2f8f('0x49')]['apply'](this,arguments);},'complete':function(){_0x55673f[_0x2f8f('0x4a')](_0x2f8f('0x42'));--_0x31cad1;0x0==_0x31cad1&&_0x5487bd(document[_0x2f8f('0x3b')])[_0x2f8f('0x4a')](_0x2f8f('0x41'));},'clearQueueDelay':null});});}return _0x45e097;}catch(_0x1f893a){_0x397bfb('Problemas\x20:(\x20.\x20Detalhes:\x20'+_0x1f893a[_0x2f8f('0x24')]);}},_0x85b263=function(_0x43eb10,_0x202f43,_0x4e2f5a,_0xf21549){_0x202f43=_0x202f43[_0x2f8f('0x4b')](_0x202f43[_0x2f8f('0x27')][_0x4e2f5a]);null!==_0x202f43&&(_0xf21549=_0xf21549||_0x43eb10[_0x2f8f('0xf')](_0x2f8f('0x37')+_0x4e2f5a+']'),_0xf21549[_0x2f8f('0x38')](_0xf21549[_0x2f8f('0xf')](_0x2f8f('0x4c')+_0x202f43+'\x27]')[_0x2f8f('0x38')]())[_0x2f8f('0x39')](_0x2f8f('0x36'),!0x0));},_0x1b401f=function(_0x53d0f8){for(var _0x9b9346='',_0x215528=0x0;_0x215528<_0x53d0f8[_0x2f8f('0x17')];_0x215528++)_0x9b9346+=_0x2f8f('0x4d')+(_0x53d0f8[_0x215528][0x1]||'')+'\x22\x20data-qdssr-text=\x22'+(_0x53d0f8[_0x215528][0x0]||'')['replace'](/\s\([0-9]+\)/,'')+'\x22>'+(_0x53d0f8[_0x215528][0x0]||'')+'</option>';return _0x9b9346;};_0x5487bd[_0x2f8f('0x1')][_0x2f8f('0x4e')]=function(){if(_0x5487bd['QD_SelectSmartResearch2']['getCategory']['cache'])return _0x5487bd[_0x2f8f('0x1')]['getCategory']['cache'];var _0x5537c5=[],_0x1c5ab3=[];_0x5487bd(_0x2f8f('0x4f'))[_0x2f8f('0x10')](function(){var _0x9e7f4b=_0x5487bd(this)[0x0]['innerHTML'];if(-0x1<_0x9e7f4b['indexOf'](_0x2f8f('0x50')))return _0x5537c5=(decodeURIComponent((_0x9e7f4b[_0x2f8f('0x51')](/\/buscapagina([^\'\"]+)/i)||[''])['pop']())['match'](/fq=c:[^\&]+/i)||[''])[_0x2f8f('0x52')]()['split'](':')[_0x2f8f('0x52')]()['replace'](/(^\/|\/$)/g,'')[_0x2f8f('0x3e')]('/'),!0x1;});for(var _0x2e1e41=0x0;_0x2e1e41<_0x5537c5[_0x2f8f('0x17')];_0x2e1e41++)_0x5537c5[_0x2e1e41][_0x2f8f('0x17')]&&_0x1c5ab3['push'](_0x5537c5[_0x2e1e41]);return _0x5487bd[_0x2f8f('0x1')]['getCategory'][_0x2f8f('0x53')]=_0x1c5ab3;};_0x5487bd[_0x2f8f('0x1')][_0x2f8f('0x4e')]['cache']=null;_0x5487bd['fn']['QD_SelectSmartResearch2']=function(_0x169e62){var _0x47ba01=_0x5487bd(this);if(!_0x47ba01[_0x2f8f('0x17')])return _0x47ba01;_0x169e62=_0x5487bd['extend']({},_0x3869a6,_0x169e62);_0x47ba01[_0x2f8f('0x54')]=new _0x5487bd[(_0x2f8f('0x1'))](_0x47ba01,_0x169e62);return _0x47ba01;};_0x5487bd(function(){_0x5487bd(_0x2f8f('0x55'))[_0x2f8f('0x1')]();});}}(this));
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
