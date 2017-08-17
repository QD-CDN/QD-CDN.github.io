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
			Common.smartCart();
			Common.cartAddProduct();
		},
		ajaxStop: function() {
		},
		windowOnload: function() {
			Common.facebookLikebox();
		},
		buyInShelf: function() {
			var fn = function(){
				$(".shelf-qd-v1-buy-button .btn-add-buy-button-asynchronous:not('.remove-href')").not('.qd-on-bb').addClass("show qd-on-bb").click(function(e) {
					e.preventDefault();
					var $t = $(this);

					Common.buyInShelfOpenModal($t.getParent(".wrapper-buy-button-asynchronous").find("input[class*='buy-button-asynchronous-product-url']" || "").attr("class").replace(/[^0-9]+/gi, ""), $t.getParent(".shelf-qd-v1-buy-button").find(".qd-sq-quantity").val() || 1);
				});
			};
			fn();

			// Ações
			$(".qd-v1-modal").on("hidden.bs.modal", function(){
				$(this).removeClass("shelf-qd-v1-buy-button-modal");
			});

			// No callback do infinity scroll
			$(window).on("QuatroDigital.is_Callback", function(){
				fn();
			});
		},
		floatBarMiniCart: function() {
			var miniCart = $(".show-minicart-on-hover");
			$(".floating-qd-v1-content .header-qd-v1-cart-link").mouseenter(function() {
				miniCart.not(this).mouseover();
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
		amazingMenu:function(){
			$('.header-qd-v1-main-amazing-menu').QD_amazingMenu();

			// Amazing Menu Responsivo
			$(".header-qd-v1-amazing-menu-toggle").click(function(){
				$("body").toggleClass('qd-am-on');
			});

			$(".qd-am-overlay").click(function(){
				$("body").removeClass('qd-am-on');
			});

			$(".floating-qd-v1-call-amazing-menu").click(function() {
				$("body").toggleClass('qd-am-toggle');
			});

			var wrapperMobile = $(".header-qd-v1-main-amazing-menu-mobile-wrapper");

			wrapperMobile.QD_amazingMenu();

			wrapperMobile.find('> ul > li.qd-am-has-ul a[href="#"]').click(function(evt) {
				evt.preventDefault();
				$(this).parent().toggleClass('qd-am-dropdown-active');
			});

			wrapperMobile.after('<span class="btn-close-mobile"><i class="fa fa-times-circle"></i></span>');

			$(".btn-close-mobile").click(function(){
				$("body").removeClass('qd-am-on');
			});
		},
		facebookLikebox: function() {
			$(".footer-qd-v1-facebook-likebox").html('<div class="fb-page" data-href="https://www.facebook.com/lojadoveiculo/" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/">Loja do Veículo</a></blockquote></div></div>');
		},
		bannerResponsive : function(){
			$(".banner-qd-v1-responsive .box-banner a, .qd-placeholder .box-banner a").each(function(){
				var $t = $(this);
				var cols = [];

				var href = $t.attr("href") || "";
				if(!href.length)
					return;

				$t.attr( "href", href.replace(/(col-)?(xs|sm|md|lg|hidden-xs|hidden-sm|hidden-md|hidden-lg)(-([0-9]{1,2}))?,?/ig, function(match){
					var str = match.replace(",", "").toLowerCase();
					cols.push( str.substr(0,4) === "col-" ? str : str );
					return "";
				}) );

				$t.parent().addClass( cols.length ? cols.join(" ") : "col-xs-12 col-sm-12" );
			});
		},
		callCartLinkShow: function() {
			if ($(window).width() < 750){
				$(".header-qd-v1-cart-link").click(function(evt) {
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
		smartyBuyButton: function() {
			$(".header-qd-v1-cart-link").QD_buyButton({
				buyButton: ".shelf-qd-v1-buy-button .btn-add-buy-button-asynchronous"
			});
		},
		bannersCount: function() {
			$(".box-banner").parent().each(function() {
				var $t = $(this);
				$t.addClass("qdBannerCount-" + $t.find(".box-banner").length);
			});
		},
		smartCart: function() {
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
				console.log("clique do smart cart");
				evt.preventDefault();
				$(document.body).toggleClass('qd-cart-show');

				wrapper.height($(window).height());
				wrapper.find(".qd-ddc-prodWrapper").css('max-height', $(window).height() - 193);
			});

			$(".components-qd-v1-overlay, .qd_ddc_lightBoxClose").click(function(evt){
				$(document.body).removeClass('qd-cart-show');
			});
		},
		cartAddProduct: function() {
			var modal = $('.qd-v1-modal').clone().appendTo(document.body).addClass('qd-v1-modal-add-product-cart').removeClass('qd-v1-modal');

			modal.find('.modal-body').append('<p><i class="fa fa-check-circle" aria-hidden="true"></i> Produto adicionado com sucesso!</p>');

			$(window).on("cartProductAdded.vtex", function() {
				modal.modal();

				setTimeout(function() {
					modal.modal('hide');
				}, 3000);
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
			Home.selectSmartResearch2();			
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		bannerSliderDesktop: function() {
			$('.slider-qd-v1-full').slick({
				prevArrow: '<button type="button" class="slick-prev" title="Anterior"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next" title="Próximo"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>',
				dots: true,
				adaptiveHeight: true,
				fade: true,
				speed: 400,
				cssEase: 'linear'
			});
		},		
		bannerSliderMobile: function() {
			$('.mobile-slider-qd-v1-wrapper').slick({
				adaptiveHeight: true,
				fade: true,
				speed: 400,
				cssEase: 'linear',
				arrows: false
			});
		},
		selectSmartResearch2: function() {
			try {
				var depart = [1];
				var url, map = {};
				$(document.body).addClass('qd-car-select-loading');

				$.ajax({
					url: "/busca?lid=32d505ca-d415-481c-8504-0afa6f368f3f&fq=C:/" + depart[0] + "/",
					dataType: "html",
					success: function(data) {
						// Pegando os anos
						var qttRegex = /\s+\([0-9]+\)$/;
						var values = [];
						$(data).find(".search-single-navigator ul.Ano").find("a").each(function() {
							var $t = $(this);
							values.push([$t.text().trim().replace(qttRegex, ""), $t.attr("href") || ""])
						});

						$(".qd-search-filters").QD_SelectSmartResearch2({
							options: [values, "lid=32d505ca-d415-481c-8504-0afa6f368f3f", "lid=32d505ca-d415-481c-8504-0afa6f368f3f"],
							optionsPlaceHolder: ["Ano", "Montadora", "Modelo"],
							disabledMessage: function(index, options, optionsPlaceHolder) {
								return "Selecione o(a) " + optionsPlaceHolder[index - 1];
							},
							labelMessage: function(index, options, optionsPlaceHolder) {
								return "Selecione " + optionsPlaceHolder[index]
							},
							redirect: function(newUrl) {
								var url = new QD_VtexUrlParse(newUrl);
								if(location.search.toLowerCase().indexOf("map=") > -1)
									url.mergeUrl(location.href);
								else
									url.getMap();
								window.location.href = url.getUrl({ft: true});
							},
							optionIsChecked: function(optionPlaceHolder) {
								if (typeof optionPlaceHolder === "undefined")
									return null;

								var value = $("h5." + optionPlaceHolder + " +ul .filtro-ativo:first").text().trim().replace(qttRegex, "");
								if (value.length)
									return value;

								if(!url && location.search.toLowerCase().indexOf("map=") > -1){
									url = new QD_VtexUrlParse(location.href);
									var urlMap = url.getMap();
									map = {
										"Montadora": decodeURIComponent(urlMap.map.specificationFilter_47 || ""),
										"Modelo": decodeURIComponent(urlMap.map.specificationFilter_48 || ""),
										"Ano": decodeURIComponent(urlMap.map.specificationFilter_46 || "")
									};
								}

								value = map[optionPlaceHolder] || "";
								return value.length ? value : null;
							},
							getAjaxOptions: function(requestData, $select) {
								var values = [];
								$(requestData).find(".search-single-navigator ul." + $select.attr("data-qdssr-title")).find("a").each(function() {
									var $t = $(this);
									values.push([$t.text().trim().replace(qttRegex, ""), $t.attr("href") || ""])
								});
								return values;
							}
						});
					},
					complete: function() {
						$(document.body).removeClass('qd-car-select-loading');
					},
					clearQueueDelay: null
				});
			}
			catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: " + e.message)); }
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
			Product.qdNotifymeShow();
		},
		ajaxStop: function () {
			Product.addCloseBtnFreightTable();
		},
		windowOnload: function () {},
		qdNotifymeShow: function() {
			var notifyWrapper = $(".portal-notify-me-ref");

			var checkVisibleNotify = function(data) {
				if (data.availability || data.available){
					notifyWrapper.parent().parent().removeClass('col-xs-12').attr('class', "col-xs-12 col-lg-6");
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

			wrapper.find(".qd-v1-buy-button-content").prepend('<div class="qd-v1-smart-qtt"> <input type="tel" class="qd-sq-quantity" /> <div class="btns-wrapper"> <span class="qd-sq-more"></span> <span class="qd-sq-minus"></span> </div> </div>');
		},
		smartQuantity: function() {
			$(".product-qd-v1-sku-selection-box").QD_smartQuantity();
		},
		smartyBuyButton: function() {
			$(".header-qd-v1-cart-link").QD_buyButton({
				buyButton: ".product-qd-v1-sku-selection-box .buy-button"
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
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

// amazing menu
var _0x6b78=['exec','.qd_amazing_menu_auto','getParent','closest','QD_amazingMenu','function','/qd-amazing-menu','QD\x20Amazing\x20Menu','object','undefined','info','warn','unshift','alerta','toLowerCase','aviso','apply','join','error','qdAmAddNdx','addClass','qd-am-first','qd-am-last','bwnqbirvphyb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','.qd-am-collection','length','qd-am-banner-wrapper','qd-am-collection-wrapper','url','html','img[alt=\x27','attr','each','.box-banner','insertBefore','hide','qd-am-content-loaded','text','trim','data-qdam-value','[class*=\x27colunas\x27]','clone','\x27\x20falho.','ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','children',':not(ul)','first','>li','qd-amazing-menu','>ul','qd-am-column','qd-am-dropdown-menu','parent','qd-am-dropdown','qd-am-level-','add','qd-am-','callback','QuatroDigital.am.callback'];(function(_0x75891,_0x185923){var _0x22f2d9=function(_0x5a62db){while(--_0x5a62db){_0x75891['push'](_0x75891['shift']());}};_0x22f2d9(++_0x185923);}(_0x6b78,0x188));var _0x86b7=function(_0x4f2b65,_0x4275d6){_0x4f2b65=_0x4f2b65-0x0;var _0x1de1da=_0x6b78[_0x4f2b65];return _0x1de1da;};(function(_0x50a2d2){_0x50a2d2['fn'][_0x86b7('0x0')]=_0x50a2d2['fn'][_0x86b7('0x1')];}(jQuery));(function(_0x3ddc1c){'use strict';var _0x133a40,_0xb5535d,_0x544a9b,_0x4e6b4c;_0x133a40=jQuery;if(typeof _0x133a40['fn'][_0x86b7('0x2')]===_0x86b7('0x3'))return;_0xb5535d={'url':_0x86b7('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0x1ac308=_0x86b7('0x5');var _0x4fe7fa=function(_0x372a8b,_0x36a6e9){if(_0x86b7('0x6')===typeof console&&_0x86b7('0x7')!==typeof console['error']&&_0x86b7('0x7')!==typeof console[_0x86b7('0x8')]&&_0x86b7('0x7')!==typeof console[_0x86b7('0x9')]){var _0x467eb4;_0x86b7('0x6')===typeof _0x372a8b?(_0x372a8b[_0x86b7('0xa')]('['+_0x1ac308+']\x0a'),_0x467eb4=_0x372a8b):_0x467eb4=['['+_0x1ac308+']\x0a'+_0x372a8b];if(_0x86b7('0x7')===typeof _0x36a6e9||_0x86b7('0xb')!==_0x36a6e9[_0x86b7('0xc')]()&&_0x86b7('0xd')!==_0x36a6e9[_0x86b7('0xc')]())if(_0x86b7('0x7')!==typeof _0x36a6e9&&_0x86b7('0x8')===_0x36a6e9[_0x86b7('0xc')]())try{console[_0x86b7('0x8')][_0x86b7('0xe')](console,_0x467eb4);}catch(_0x3cfd2f){try{console[_0x86b7('0x8')](_0x467eb4[_0x86b7('0xf')]('\x0a'));}catch(_0x305d09){}}else try{console[_0x86b7('0x10')]['apply'](console,_0x467eb4);}catch(_0x253ba1){try{console[_0x86b7('0x10')](_0x467eb4['join']('\x0a'));}catch(_0xdf82dd){}}else try{console[_0x86b7('0x9')][_0x86b7('0xe')](console,_0x467eb4);}catch(_0x5340cc){try{console['warn'](_0x467eb4[_0x86b7('0xf')]('\x0a'));}catch(_0x172784){}}}};_0x133a40['fn'][_0x86b7('0x11')]=function(){var _0x331d51=_0x133a40(this);_0x331d51['each'](function(_0x3d9347){_0x133a40(this)[_0x86b7('0x12')]('qd-am-li-'+_0x3d9347);});_0x331d51['first']()[_0x86b7('0x12')](_0x86b7('0x13'));_0x331d51['last']()['addClass'](_0x86b7('0x14'));return _0x331d51;};_0x133a40['fn']['QD_amazingMenu']=function(){};var _0x3195ed=function(_0x779982){var _0xc7b9d1={'y':_0x86b7('0x15')};return function(_0x3f5031){var _0x14c516,_0x4eb54a,_0x4d5b88,_0x5cd5c2;_0x4eb54a=function(_0x4e22b2){return _0x4e22b2;};_0x4d5b88=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3f5031=_0x3f5031['d'+_0x4d5b88[0x10]+'c'+_0x4d5b88[0x11]+'m'+_0x4eb54a(_0x4d5b88[0x1])+'n'+_0x4d5b88[0xd]]['l'+_0x4d5b88[0x12]+'c'+_0x4d5b88[0x0]+'ti'+_0x4eb54a('o')+'n'];_0x14c516=function(_0x1ad42f){return escape(encodeURIComponent(_0x1ad42f[_0x86b7('0x16')](/\./g,'¨')[_0x86b7('0x16')](/[a-zA-Z]/g,function(_0x4d9897){return String[_0x86b7('0x17')](('Z'>=_0x4d9897?0x5a:0x7a)>=(_0x4d9897=_0x4d9897[_0x86b7('0x18')](0x0)+0xd)?_0x4d9897:_0x4d9897-0x1a);})));};var _0x1eb3bf=_0x14c516(_0x3f5031[[_0x4d5b88[0x9],_0x4eb54a('o'),_0x4d5b88[0xc],_0x4d5b88[_0x4eb54a(0xd)]][_0x86b7('0xf')]('')]);_0x14c516=_0x14c516((window[['js',_0x4eb54a('no'),'m',_0x4d5b88[0x1],_0x4d5b88[0x4][_0x86b7('0x19')](),_0x86b7('0x1a')][_0x86b7('0xf')]('')]||_0x86b7('0x1b'))+['.v',_0x4d5b88[0xd],'e',_0x4eb54a('x'),'co',_0x4eb54a('mm'),_0x86b7('0x1c'),_0x4d5b88[0x1],'.c',_0x4eb54a('o'),'m.',_0x4d5b88[0x13],'r'][_0x86b7('0xf')](''));for(var _0x3ca7bf in _0xc7b9d1){if(_0x14c516===_0x3ca7bf+_0xc7b9d1[_0x3ca7bf]||_0x1eb3bf===_0x3ca7bf+_0xc7b9d1[_0x3ca7bf]){_0x5cd5c2='tr'+_0x4d5b88[0x11]+'e';break;}_0x5cd5c2='f'+_0x4d5b88[0x0]+'ls'+_0x4eb54a(_0x4d5b88[0x1])+'';}_0x4eb54a=!0x1;-0x1<_0x3f5031[[_0x4d5b88[0xc],'e',_0x4d5b88[0x0],'rc',_0x4d5b88[0x9]][_0x86b7('0xf')]('')][_0x86b7('0x1d')](_0x86b7('0x1e'))&&(_0x4eb54a=!0x0);return[_0x5cd5c2,_0x4eb54a];}(_0x779982);}(window);if(!eval(_0x3195ed[0x0]))return _0x3195ed[0x1]?_0x4fe7fa(_0x86b7('0x1f')):!0x1;_0x4e6b4c=function(_0x37843d){var _0x1560c2,_0x3793a0,_0x5d9050;_0x5d9050=_0x37843d[_0x86b7('0x20')](_0x86b7('0x21'));_0x1560c2=_0x5d9050[_0x86b7('0x22')]('.qd-am-banner');_0x3793a0=_0x5d9050['filter'](_0x86b7('0x23'));if(!(_0x1560c2[_0x86b7('0x24')]||_0x3793a0[_0x86b7('0x24')]))return;_0x1560c2['parent']()['addClass'](_0x86b7('0x25'));_0x3793a0['parent']()['addClass'](_0x86b7('0x26'));_0x133a40['qdAjax']({'url':_0x544a9b[_0x86b7('0x27')],'dataType':_0x86b7('0x28'),'success':function(_0x4e9372){var _0x45b22b=_0x133a40(_0x4e9372);_0x1560c2['each'](function(){var _0x49f7fb,_0x159e07;_0x159e07=_0x133a40(this);_0x49f7fb=_0x45b22b[_0x86b7('0x20')](_0x86b7('0x29')+_0x159e07[_0x86b7('0x2a')]('data-qdam-value')+'\x27]');if(!_0x49f7fb['length'])return;_0x49f7fb[_0x86b7('0x2b')](function(){_0x133a40(this)[_0x86b7('0x0')](_0x86b7('0x2c'))['clone']()[_0x86b7('0x2d')](_0x159e07);});_0x159e07[_0x86b7('0x2e')]();})['addClass'](_0x86b7('0x2f'));_0x3793a0['each'](function(){var _0x32c0a6={},_0x3ee710;_0x3ee710=_0x133a40(this);_0x45b22b[_0x86b7('0x20')]('h2')['each'](function(){if(_0x133a40(this)[_0x86b7('0x30')]()[_0x86b7('0x31')]()[_0x86b7('0xc')]()==_0x3ee710[_0x86b7('0x2a')](_0x86b7('0x32'))[_0x86b7('0x31')]()[_0x86b7('0xc')]()){_0x32c0a6=_0x133a40(this);return![];}});if(!_0x32c0a6[_0x86b7('0x24')])return;_0x32c0a6[_0x86b7('0x2b')](function(){_0x133a40(this)[_0x86b7('0x0')](_0x86b7('0x33'))[_0x86b7('0x34')]()['insertBefore'](_0x3ee710);});_0x3ee710[_0x86b7('0x2e')]();})[_0x86b7('0x12')](_0x86b7('0x2f'));},'error':function(){_0x4fe7fa('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27'+_0x544a9b[_0x86b7('0x27')]+_0x86b7('0x35'));},'complete':function(){_0x544a9b[_0x86b7('0x36')][_0x86b7('0x37')](this);_0x133a40(window)[_0x86b7('0x38')](_0x86b7('0x39'),_0x37843d);},'clearQueueDelay':0xbb8});};_0x133a40['QD_amazingMenu']=function(_0x2c3c8e){var _0x196d86=_0x2c3c8e[_0x86b7('0x20')](_0x86b7('0x3a'))[_0x86b7('0x2b')](function(){var _0x5af003,_0x370822,_0x5866ed,_0x10e73f;_0x5af003=_0x133a40(this);if(!_0x5af003[_0x86b7('0x24')])return _0x4fe7fa([_0x86b7('0x3b'),_0x2c3c8e],_0x86b7('0xb'));_0x5af003[_0x86b7('0x20')](_0x86b7('0x3c'))['parent']()['addClass']('qd-am-has-ul');_0x5af003['find']('li')[_0x86b7('0x2b')](function(){var _0x153424=_0x133a40(this),_0x4bd564;_0x4bd564=_0x153424[_0x86b7('0x3d')](_0x86b7('0x3e'));if(!_0x4bd564[_0x86b7('0x24')])return;_0x153424[_0x86b7('0x12')]('qd-am-elem-'+_0x4bd564[_0x86b7('0x3f')]()['text']()[_0x86b7('0x31')]()['replaceSpecialChars']()[_0x86b7('0x16')](/\./g,'')[_0x86b7('0x16')](/\s/g,'-')[_0x86b7('0xc')]());});_0x370822=_0x5af003[_0x86b7('0x20')](_0x86b7('0x40'))[_0x86b7('0x11')]();_0x5af003[_0x86b7('0x12')](_0x86b7('0x41'));_0x5866ed=_0x370822['find'](_0x86b7('0x42'));_0x5866ed[_0x86b7('0x2b')](function(){var _0x5aa903=_0x133a40(this),_0x12d5bf;_0x12d5bf=_0x5aa903[_0x86b7('0x20')](_0x86b7('0x40'))[_0x86b7('0x11')]()[_0x86b7('0x12')](_0x86b7('0x43'));_0x5aa903[_0x86b7('0x12')](_0x86b7('0x44'));_0x5aa903[_0x86b7('0x45')]()[_0x86b7('0x12')](_0x86b7('0x46'));});_0x5866ed[_0x86b7('0x12')]('qd-am-dropdown');var _0x5b82c3=0x0;var _0x509653=function(_0x426e29){_0x5b82c3=_0x5b82c3+0x1;var _0x39591b=_0x426e29['children']('li');var _0x46a77c=_0x39591b[_0x86b7('0x3d')]('*');if(!_0x46a77c[_0x86b7('0x24')])return;_0x46a77c[_0x86b7('0x12')](_0x86b7('0x47')+_0x5b82c3);_0x509653(_0x46a77c);};_0x509653(_0x5af003);_0x5af003[_0x86b7('0x48')](_0x5af003['find']('ul'))[_0x86b7('0x2b')](function(){var _0x4c43f0=_0x133a40(this);_0x4c43f0[_0x86b7('0x12')](_0x86b7('0x49')+_0x4c43f0['children']('li')[_0x86b7('0x24')]+'-li');});});_0x4e6b4c(_0x196d86);_0x544a9b[_0x86b7('0x4a')][_0x86b7('0x37')](this);_0x133a40(window)['trigger'](_0x86b7('0x4b'),_0x2c3c8e);};_0x133a40['fn'][_0x86b7('0x2')]=function(_0x59811f){var _0x18eb4c=_0x133a40(this);if(!_0x18eb4c[_0x86b7('0x24')])return _0x18eb4c;_0x544a9b=_0x133a40['extend']({},_0xb5535d,_0x59811f);_0x18eb4c[_0x86b7('0x4c')]=new _0x133a40[(_0x86b7('0x2'))](_0x133a40(this));return _0x18eb4c;};_0x133a40(function(){_0x133a40(_0x86b7('0x4d'))[_0x86b7('0x2')]();});}(this));

// smart cart
var _0x0644=['animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Callback\x20não\x20é\x20uma\x20função','Oooops!\x20','allowRecalculate','quickViewUpdate','.qd-bap-wrapper','.qd-bap-item-added','input.qd-productId[value=','prodId','.qd-bap-qtt','prepend','qd-bap-item-added','productId','prod_','ajaxStop','Quatro\x20Digital\x20-\x20Plus\x20Smart\x20Cart','.qdDdcContainer','dropDown','buyButton','QD_buyButton','selector','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','replace','abs','undefined','pow','round','toFixed','split','length','join','_QuatroDigital_CartData','callback','Callbacks','error','function','message','Quatro\x20Digital\x20-\x20DropDown\x20Cart','object','info','unshift','aviso','toLowerCase','apply','warn','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','bwnqbirvphyb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','ite','---','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Continuar\x20Comprando','skuName','name','extend','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','vtexjs','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22>','<div\x20class=\x22qd-ddc-wrapper2\x22>','<div\x20class=\x22qd_ddc_lightBoxClose\x22></div>','<div\x20class=\x22qd-ddc-wrapper3\x22>','<div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div>','<div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div>','<div\x20class=\x22qd-ddc-shipping\x22></div>','<div\x20class=\x22qd-ddc-infoBts\x22>','texts','cartTotal','#value','#items','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','html','linkCart','find','.qd_ddc_continueShopping','continueShopping','linkCheckout','.qd-ddc-shipping','shippingForm','emptyCart','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','removeClass','qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','keyCode','body','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','click.qd_ddc_scrollDown','scrollCart','keyup.qd_ddc_cep','shippingCalculate','updateOnlyHover','getCartInfoByUrl','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','each','call','clone','total','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','shipping','Atenção,\x20você\x20esta\x20utilizando\x20um\x20método\x20descontinuado','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','smartCheckout','getOrderForm','_QuatroDigital_AmountProduct','exec','items','totalizers','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','addClass','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22>','<div\x20class=\x22qd-ddc-prodImgWrapper\x22>','</div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22>','<div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22>','<input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a>','<span\x20class=\x22qd-ddc-qttLoading\x22></span>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a>','<span\x20class=\x22qd-ddc-prodRowLoading\x22></span>','empty','productCategoryIds','attr','qd-ddc-','.qd-ddc-prodName','append','sellingPrice','Grátis','meta[name=currency]','.qd-ddc-quantity','val','quantity','insertProdImg','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','.qd-ddc-shipping\x20input','address','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','filter','outerHeight','parent','qd-ddc-lastAdded','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','alerta','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','click.qd_ddc_minus','preventDefault','focusout.qd_ddc_change','.qd-ddc-remove','stop','slideUp','remove','$1-$2$3','qdDdcLastPostalCode','calculateShipping','BRA','done','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','boolean','removeProduct','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2'];(function(_0x20a584,_0xe384a5){var _0x4b41a8=function(_0x2127c6){while(--_0x2127c6){_0x20a584['push'](_0x20a584['shift']());}};_0x4b41a8(++_0xe384a5);}(_0x0644,0xf9));var _0x4064=function(_0x392b90,_0x5d0796){_0x392b90=_0x392b90-0x0;var _0x55b9ab=_0x0644[_0x392b90];return _0x55b9ab;};(function(_0x120a1f){_0x120a1f['fn'][_0x4064('0x0')]=_0x120a1f['fn']['closest'];}(jQuery));function qd_number_format(_0x497dd1,_0xa2beb0,_0x208665,_0x5f183d){_0x497dd1=(_0x497dd1+'')[_0x4064('0x1')](/[^0-9+\-Ee.]/g,'');_0x497dd1=isFinite(+_0x497dd1)?+_0x497dd1:0x0;_0xa2beb0=isFinite(+_0xa2beb0)?Math[_0x4064('0x2')](_0xa2beb0):0x0;_0x5f183d=_0x4064('0x3')===typeof _0x5f183d?',':_0x5f183d;_0x208665=_0x4064('0x3')===typeof _0x208665?'.':_0x208665;var _0x5db678='',_0x5db678=function(_0x48ea1c,_0x4adf4d){var _0xa2beb0=Math[_0x4064('0x4')](0xa,_0x4adf4d);return''+(Math[_0x4064('0x5')](_0x48ea1c*_0xa2beb0)/_0xa2beb0)[_0x4064('0x6')](_0x4adf4d);},_0x5db678=(_0xa2beb0?_0x5db678(_0x497dd1,_0xa2beb0):''+Math['round'](_0x497dd1))[_0x4064('0x7')]('.');0x3<_0x5db678[0x0][_0x4064('0x8')]&&(_0x5db678[0x0]=_0x5db678[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x5f183d));(_0x5db678[0x1]||'')[_0x4064('0x8')]<_0xa2beb0&&(_0x5db678[0x1]=_0x5db678[0x1]||'',_0x5db678[0x1]+=Array(_0xa2beb0-_0x5db678[0x1][_0x4064('0x8')]+0x1)[_0x4064('0x9')]('0'));return _0x5db678[_0x4064('0x9')](_0x208665);};(function(){'use strict';try{window[_0x4064('0xa')]=window[_0x4064('0xa')]||{};window[_0x4064('0xa')]['callback']=window[_0x4064('0xa')][_0x4064('0xb')]||$[_0x4064('0xc')]();}catch(_0x538151){if(typeof console!==_0x4064('0x3')&&typeof console[_0x4064('0xd')]===_0x4064('0xe'))console['error']('Oooops!\x20',_0x538151[_0x4064('0xf')]);}}());(function(_0x19f1b1){'use strict';try{var _0x5b59b6=jQuery;var _0x5b5b51=_0x4064('0x10');var _0x13a149=function(_0x2887be,_0x3e7873){if(_0x4064('0x11')===typeof console&&'undefined'!==typeof console[_0x4064('0xd')]&&_0x4064('0x3')!==typeof console[_0x4064('0x12')]&&_0x4064('0x3')!==typeof console['warn']){var _0x46f980;_0x4064('0x11')===typeof _0x2887be?(_0x2887be[_0x4064('0x13')]('['+_0x5b5b51+']\x0a'),_0x46f980=_0x2887be):_0x46f980=['['+_0x5b5b51+']\x0a'+_0x2887be];if(_0x4064('0x3')===typeof _0x3e7873||'alerta'!==_0x3e7873['toLowerCase']()&&_0x4064('0x14')!==_0x3e7873[_0x4064('0x15')]())if(_0x4064('0x3')!==typeof _0x3e7873&&_0x4064('0x12')===_0x3e7873[_0x4064('0x15')]())try{console[_0x4064('0x12')]['apply'](console,_0x46f980);}catch(_0x243f9f){try{console[_0x4064('0x12')](_0x46f980[_0x4064('0x9')]('\x0a'));}catch(_0x4f4805){}}else try{console[_0x4064('0xd')][_0x4064('0x16')](console,_0x46f980);}catch(_0x1b87e5){try{console['error'](_0x46f980[_0x4064('0x9')]('\x0a'));}catch(_0x477b30){}}else try{console[_0x4064('0x17')][_0x4064('0x16')](console,_0x46f980);}catch(_0x258e30){try{console['warn'](_0x46f980[_0x4064('0x9')]('\x0a'));}catch(_0x41bfe5){}}}};window[_0x4064('0x18')]=window['_QuatroDigital_DropDown']||{};window[_0x4064('0x18')][_0x4064('0x19')]=!![];_0x5b59b6[_0x4064('0x1a')]=function(){};_0x5b59b6['fn'][_0x4064('0x1a')]=function(){return{'fn':new _0x5b59b6()};};var _0x56153f=function(_0x315d88){var _0x75e31e={'y':_0x4064('0x1b')};return function(_0x5281e7){var _0x18d8bc,_0x1d6bb2,_0x41c7f3,_0x552653;_0x1d6bb2=function(_0x3aab02){return _0x3aab02;};_0x41c7f3=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5281e7=_0x5281e7['d'+_0x41c7f3[0x10]+'c'+_0x41c7f3[0x11]+'m'+_0x1d6bb2(_0x41c7f3[0x1])+'n'+_0x41c7f3[0xd]]['l'+_0x41c7f3[0x12]+'c'+_0x41c7f3[0x0]+'ti'+_0x1d6bb2('o')+'n'];_0x18d8bc=function(_0x152d85){return escape(encodeURIComponent(_0x152d85[_0x4064('0x1')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x14a854){return String[_0x4064('0x1c')](('Z'>=_0x14a854?0x5a:0x7a)>=(_0x14a854=_0x14a854[_0x4064('0x1d')](0x0)+0xd)?_0x14a854:_0x14a854-0x1a);})));};var _0x59e2ef=_0x18d8bc(_0x5281e7[[_0x41c7f3[0x9],_0x1d6bb2('o'),_0x41c7f3[0xc],_0x41c7f3[_0x1d6bb2(0xd)]][_0x4064('0x9')]('')]);_0x18d8bc=_0x18d8bc((window[['js',_0x1d6bb2('no'),'m',_0x41c7f3[0x1],_0x41c7f3[0x4]['toUpperCase'](),_0x4064('0x1e')][_0x4064('0x9')]('')]||_0x4064('0x1f'))+['.v',_0x41c7f3[0xd],'e',_0x1d6bb2('x'),'co',_0x1d6bb2('mm'),'erc',_0x41c7f3[0x1],'.c',_0x1d6bb2('o'),'m.',_0x41c7f3[0x13],'r'][_0x4064('0x9')](''));for(var _0x35fc13 in _0x75e31e){if(_0x18d8bc===_0x35fc13+_0x75e31e[_0x35fc13]||_0x59e2ef===_0x35fc13+_0x75e31e[_0x35fc13]){_0x552653='tr'+_0x41c7f3[0x11]+'e';break;}_0x552653='f'+_0x41c7f3[0x0]+'ls'+_0x1d6bb2(_0x41c7f3[0x1])+'';}_0x1d6bb2=!0x1;-0x1<_0x5281e7[[_0x41c7f3[0xc],'e',_0x41c7f3[0x0],'rc',_0x41c7f3[0x9]][_0x4064('0x9')]('')][_0x4064('0x20')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x1d6bb2=!0x0);return[_0x552653,_0x1d6bb2];}(_0x315d88);}(window);if(!eval(_0x56153f[0x0]))return _0x56153f[0x1]?_0x13a149(_0x4064('0x21')):!0x1;_0x5b59b6['QD_dropDownCart']=function(_0x18bc6f,_0x4dfebf){var _0x3327c4,_0x49ab42,_0x171740,_0x1d7049,_0x177bee,_0x256ffd,_0x5c4d47,_0x461d1d,_0x34de2f,_0x1eeb9e,_0x79ca62,_0x39c438;_0x79ca62=_0x5b59b6(_0x18bc6f);if(!_0x79ca62[_0x4064('0x8')])return _0x79ca62;_0x3327c4={'updateOnlyHover':!![],'texts':{'linkCart':_0x4064('0x22'),'linkCheckout':_0x4064('0x23'),'cartTotal':_0x4064('0x24'),'emptyCart':'Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','continueShopping':_0x4064('0x25'),'shippingForm':'<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!![],'skuName':function(_0x14d902){return _0x14d902[_0x4064('0x26')]||_0x14d902[_0x4064('0x27')];},'callback':function(){},'callbackProductsList':function(){}};_0x49ab42=_0x5b59b6[_0x4064('0x28')](!![],{},_0x3327c4,_0x4dfebf);_0x171740=_0x5b59b6('');_0x1eeb9e=this;if(_0x49ab42['smartCheckout']){var _0x128040=![];if(typeof window['vtexjs']==='undefined'){_0x13a149(_0x4064('0x29'));_0x5b59b6['ajax']({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':![],'dataType':'script','error':function(){_0x13a149(_0x4064('0x2a'));_0x128040=!![];}});}if(_0x128040)return _0x13a149(_0x4064('0x2b'));}var _0x2b98ca;if(typeof window[_0x4064('0x2c')]===_0x4064('0x11')&&typeof window[_0x4064('0x2c')][_0x4064('0x2d')]!==_0x4064('0x3'))_0x2b98ca=window[_0x4064('0x2c')][_0x4064('0x2d')];else if(typeof vtex===_0x4064('0x11')&&typeof vtex['checkout']==='object'&&typeof vtex[_0x4064('0x2d')][_0x4064('0x2e')]!=='undefined')_0x2b98ca=new vtex[(_0x4064('0x2d'))]['SDK']();else return _0x13a149(_0x4064('0x2f'));_0x1eeb9e[_0x4064('0x30')]=_0x4064('0x31')+_0x4064('0x32')+_0x4064('0x33')+_0x4064('0x34')+_0x4064('0x35')+_0x4064('0x36')+'<span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div>'+'<div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22>'+_0x4064('0x37')+'<div\x20class=\x22qd-ddc-infoTotal\x22></div>'+_0x4064('0x38')+'<a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a>'+'</div></div></div></div></div>';_0x256ffd=function(_0x3e5b6f){var _0x12523d=_0x5b59b6(_0x3e5b6f);_0x49ab42[_0x4064('0x39')][_0x4064('0x3a')]=_0x49ab42[_0x4064('0x39')][_0x4064('0x3a')][_0x4064('0x1')](_0x4064('0x3b'),'<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>');_0x49ab42['texts'][_0x4064('0x3a')]=_0x49ab42[_0x4064('0x39')][_0x4064('0x3a')]['replace'](_0x4064('0x3c'),'<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>');_0x49ab42[_0x4064('0x39')][_0x4064('0x3a')]=_0x49ab42[_0x4064('0x39')][_0x4064('0x3a')][_0x4064('0x1')](_0x4064('0x3d'),_0x4064('0x3e'));_0x49ab42[_0x4064('0x39')][_0x4064('0x3a')]=_0x49ab42['texts'][_0x4064('0x3a')][_0x4064('0x1')](_0x4064('0x3f'),_0x4064('0x40'));_0x12523d['find'](_0x4064('0x41'))[_0x4064('0x42')](_0x49ab42['texts'][_0x4064('0x43')]);_0x12523d[_0x4064('0x44')](_0x4064('0x45'))[_0x4064('0x42')](_0x49ab42[_0x4064('0x39')][_0x4064('0x46')]);_0x12523d[_0x4064('0x44')]('.qd-ddc-checkout')[_0x4064('0x42')](_0x49ab42['texts'][_0x4064('0x47')]);_0x12523d[_0x4064('0x44')]('.qd-ddc-infoTotal')[_0x4064('0x42')](_0x49ab42[_0x4064('0x39')]['cartTotal']);_0x12523d['find'](_0x4064('0x48'))[_0x4064('0x42')](_0x49ab42[_0x4064('0x39')][_0x4064('0x49')]);_0x12523d['find']('.qd-ddc-emptyCart\x20p')[_0x4064('0x42')](_0x49ab42[_0x4064('0x39')][_0x4064('0x4a')]);return _0x12523d;};_0x177bee=function(_0x4c4ef8){_0x5b59b6(this)['append'](_0x4c4ef8);_0x4c4ef8[_0x4064('0x44')](_0x4064('0x4b'))[_0x4064('0x4c')](_0x5b59b6(_0x4064('0x4d')))['on'](_0x4064('0x4e'),function(){_0x79ca62[_0x4064('0x4f')](_0x4064('0x50'));_0x5b59b6(document['body'])[_0x4064('0x4f')](_0x4064('0x51'));});_0x5b59b6(document)[_0x4064('0x52')](_0x4064('0x53'))['on'](_0x4064('0x53'),function(_0x3fd481){if(_0x3fd481[_0x4064('0x54')]==0x1b){_0x79ca62[_0x4064('0x4f')]('qd-bb-lightBoxProdAdd');_0x5b59b6(document[_0x4064('0x55')])['removeClass'](_0x4064('0x51'));}});var _0x2814d0=_0x4c4ef8['find']('.qd-ddc-prodWrapper');_0x4c4ef8[_0x4064('0x44')](_0x4064('0x56'))['on'](_0x4064('0x57'),function(){_0x1eeb9e['scrollCart']('-',undefined,undefined,_0x2814d0);return![];});_0x4c4ef8[_0x4064('0x44')]('.qd-ddc-scrollDown')['on'](_0x4064('0x58'),function(){_0x1eeb9e[_0x4064('0x59')](undefined,undefined,undefined,_0x2814d0);return![];});_0x4c4ef8[_0x4064('0x44')]('.qd-ddc-shipping\x20input')['val']('')['on'](_0x4064('0x5a'),function(){_0x1eeb9e[_0x4064('0x5b')](_0x5b59b6(this));});if(_0x49ab42[_0x4064('0x5c')]){var _0x4a4076=0x0;_0x5b59b6(this)['on']('mouseenter.qd_ddc_hover',function(){var _0x489091=function(){if(!window[_0x4064('0x18')][_0x4064('0x19')])return;_0x1eeb9e[_0x4064('0x5d')]();window['_QuatroDigital_DropDown'][_0x4064('0x19')]=![];_0x5b59b6['fn'][_0x4064('0x5e')](!![]);_0x1eeb9e[_0x4064('0x5f')]();};_0x4a4076=setInterval(function(){_0x489091();},0x258);_0x489091();});_0x5b59b6(this)['on'](_0x4064('0x60'),function(){clearInterval(_0x4a4076);});}};_0x5c4d47=_0x256ffd(this[_0x4064('0x30')]);_0x461d1d=0x0;_0x79ca62[_0x4064('0x61')](function(){if(_0x461d1d>0x0)_0x177bee[_0x4064('0x62')](this,_0x5c4d47[_0x4064('0x63')]());else _0x177bee['call'](this,_0x5c4d47);_0x461d1d++;});window[_0x4064('0xa')][_0x4064('0xb')][_0x4064('0x4c')](function(){_0x5b59b6('.qd-ddc-infoTotalValue')[_0x4064('0x42')](window[_0x4064('0xa')][_0x4064('0x64')]||'--');_0x5b59b6(_0x4064('0x65'))[_0x4064('0x42')](window[_0x4064('0xa')][_0x4064('0x66')]||'0');_0x5b59b6(_0x4064('0x67'))['html'](window[_0x4064('0xa')][_0x4064('0x68')]||'--');_0x5b59b6('.qd-ddc-infoAllTotal')[_0x4064('0x42')](window[_0x4064('0xa')]['allTotal']||'--');});_0x34de2f=function(_0x1973bb){_0x13a149(_0x4064('0x69'));};_0x39c438=function(_0x5c3551,_0x4e8c25){if(typeof _0x5c3551['items']==='undefined')return _0x13a149(_0x4064('0x6a'));_0x1eeb9e[_0x4064('0x6b')][_0x4064('0x62')](this,_0x4e8c25);};_0x1eeb9e[_0x4064('0x5d')]=function(_0x4ef540,_0x561df1){var _0x39527d;if(typeof _0x561df1!=_0x4064('0x3'))window[_0x4064('0x18')][_0x4064('0x6c')]=_0x561df1;else if(window['_QuatroDigital_DropDown'][_0x4064('0x6c')])_0x561df1=window[_0x4064('0x18')][_0x4064('0x6c')];setTimeout(function(){window[_0x4064('0x18')]['dataOptionsCache']=undefined;},_0x49ab42[_0x4064('0x6d')]);_0x5b59b6(_0x4064('0x6e'))[_0x4064('0x4f')](_0x4064('0x6f'));if(_0x49ab42[_0x4064('0x70')]){_0x39527d=function(_0x4050d2){window[_0x4064('0x18')][_0x4064('0x71')]=_0x4050d2;_0x39c438(_0x4050d2,_0x561df1);if(typeof window[_0x4064('0x72')]!==_0x4064('0x3')&&typeof window[_0x4064('0x72')][_0x4064('0x73')]==='function')window['_QuatroDigital_AmountProduct'][_0x4064('0x73')][_0x4064('0x62')](this);_0x5b59b6(_0x4064('0x6e'))['addClass']('qd-ddc-prodLoaded');};if(typeof window[_0x4064('0x18')][_0x4064('0x71')]!==_0x4064('0x3')){_0x39527d(window[_0x4064('0x18')][_0x4064('0x71')]);if(typeof _0x4ef540===_0x4064('0xe'))_0x4ef540(window['_QuatroDigital_DropDown'][_0x4064('0x71')]);return;}_0x5b59b6['QD_checkoutQueue']([_0x4064('0x74'),_0x4064('0x75'),_0x4064('0x76')],{'done':function(_0x70a5c7){_0x39527d['call'](this,_0x70a5c7);if(typeof _0x4ef540===_0x4064('0xe'))_0x4ef540(_0x70a5c7);},'fail':function(_0x339dab){_0x13a149([_0x4064('0x77'),_0x339dab]);}});}else{alert(_0x4064('0x78'));}};_0x1eeb9e[_0x4064('0x5f')]=function(){var _0x5e9628=_0x5b59b6(_0x4064('0x6e'));if(_0x5e9628[_0x4064('0x44')](_0x4064('0x79'))[_0x4064('0x8')])_0x5e9628[_0x4064('0x4f')](_0x4064('0x7a'));else _0x5e9628[_0x4064('0x7b')](_0x4064('0x7a'));};_0x1eeb9e[_0x4064('0x6b')]=function(_0x35d998){var _0x4fbf9f=_0x5b59b6('.qd-ddc-prodWrapper2');var _0x52e554=_0x4064('0x7c')+_0x4064('0x7d')+_0x4064('0x7e')+'<img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/>'+'<span\x20class=\x22qd-ddc-imgLoading\x22></span>'+_0x4064('0x7f')+_0x4064('0x7f')+_0x4064('0x80')+_0x4064('0x81')+_0x4064('0x82')+_0x4064('0x83')+'<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a>'+_0x4064('0x84')+_0x4064('0x85')+_0x4064('0x86')+_0x4064('0x7f')+_0x4064('0x7f')+'<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22>'+'<div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22>'+_0x4064('0x87')+_0x4064('0x88')+_0x4064('0x7f')+_0x4064('0x7f')+_0x4064('0x7f');_0x4fbf9f[_0x4064('0x89')]();_0x4fbf9f[_0x4064('0x61')](function(){var _0x12a49f=_0x5b59b6(this);var _0x279b3e,_0x3ebfd7,_0x8afd92,_0x1bb4fc;var _0x1ba0d2=_0x5b59b6('');var _0x179d66;for(var _0x66456c in window[_0x4064('0x18')][_0x4064('0x71')][_0x4064('0x74')]){if(typeof window[_0x4064('0x18')][_0x4064('0x71')][_0x4064('0x74')][_0x66456c]!==_0x4064('0x11'))continue;_0x8afd92=window[_0x4064('0x18')][_0x4064('0x71')][_0x4064('0x74')][_0x66456c];_0x179d66=_0x8afd92[_0x4064('0x8a')][_0x4064('0x1')](/^\/|\/$/g,'')[_0x4064('0x7')]('/');_0x3ebfd7=_0x5b59b6(_0x52e554);_0x3ebfd7[_0x4064('0x8b')]({'data-sku':_0x8afd92['id'],'data-sku-index':_0x66456c,'data-qd-departament':_0x179d66[0x0],'data-qd-category':_0x179d66[_0x179d66['length']-0x1]});_0x3ebfd7[_0x4064('0x7b')](_0x4064('0x8c')+_0x8afd92['availability']);_0x3ebfd7[_0x4064('0x44')](_0x4064('0x8d'))[_0x4064('0x8e')](_0x49ab42[_0x4064('0x26')](_0x8afd92));_0x3ebfd7['find']('.qd-ddc-prodPrice')['append'](isNaN(_0x8afd92[_0x4064('0x8f')])?_0x8afd92[_0x4064('0x8f')]:_0x8afd92[_0x4064('0x8f')]==0x0?_0x4064('0x90'):(_0x5b59b6(_0x4064('0x91'))[_0x4064('0x8b')]('content')||'R$')+'\x20'+qd_number_format(_0x8afd92[_0x4064('0x8f')]/0x64,0x2,',','.'));_0x3ebfd7[_0x4064('0x44')](_0x4064('0x92'))[_0x4064('0x8b')]({'data-sku':_0x8afd92['id'],'data-sku-index':_0x66456c})[_0x4064('0x93')](_0x8afd92[_0x4064('0x94')]);_0x3ebfd7[_0x4064('0x44')]('.qd-ddc-remove')[_0x4064('0x8b')]({'data-sku':_0x8afd92['id'],'data-sku-index':_0x66456c});_0x1eeb9e[_0x4064('0x95')](_0x8afd92['id'],_0x3ebfd7[_0x4064('0x44')]('.qd-ddc-image'),_0x8afd92[_0x4064('0x96')]);_0x3ebfd7[_0x4064('0x44')](_0x4064('0x97'))[_0x4064('0x8b')]({'data-sku':_0x8afd92['id'],'data-sku-index':_0x66456c});_0x3ebfd7[_0x4064('0x98')](_0x12a49f);_0x1ba0d2=_0x1ba0d2[_0x4064('0x4c')](_0x3ebfd7);}try{var _0x26f815=_0x12a49f[_0x4064('0x0')](_0x4064('0x6e'))[_0x4064('0x44')](_0x4064('0x99'));if(_0x26f815[_0x4064('0x8')]&&_0x26f815[_0x4064('0x93')]()==''&&window[_0x4064('0x18')][_0x4064('0x71')][_0x4064('0x76')][_0x4064('0x9a')])_0x26f815[_0x4064('0x93')](window[_0x4064('0x18')][_0x4064('0x71')][_0x4064('0x76')][_0x4064('0x9a')]['postalCode']);}catch(_0x5dbd03){_0x13a149(_0x4064('0x9b')+_0x5dbd03[_0x4064('0xf')],'aviso');}_0x1eeb9e[_0x4064('0x9c')](_0x12a49f);_0x1eeb9e[_0x4064('0x5f')]();if(_0x35d998&&_0x35d998[_0x4064('0x9d')]){(function(){_0x1bb4fc=_0x1ba0d2[_0x4064('0x9e')]('[data-sku=\x27'+_0x35d998[_0x4064('0x9d')]+'\x27]');if(!_0x1bb4fc[_0x4064('0x8')])return;_0x279b3e=0x0;_0x1ba0d2[_0x4064('0x61')](function(){var _0x466292=_0x5b59b6(this);if(_0x466292['is'](_0x1bb4fc))return![];_0x279b3e+=_0x466292[_0x4064('0x9f')]();});_0x1eeb9e[_0x4064('0x59')](undefined,undefined,_0x279b3e,_0x12a49f[_0x4064('0x4c')](_0x12a49f[_0x4064('0xa0')]()));_0x1ba0d2[_0x4064('0x4f')]('qd-ddc-lastAddedFixed');(function(_0xeccc30){_0xeccc30[_0x4064('0x7b')](_0x4064('0xa1'));_0xeccc30['addClass']('qd-ddc-lastAddedFixed');setTimeout(function(){_0xeccc30[_0x4064('0x4f')](_0x4064('0xa1'));},_0x49ab42[_0x4064('0x6d')]);}(_0x1bb4fc));}());}});(function(){if(_QuatroDigital_DropDown[_0x4064('0x71')][_0x4064('0x74')][_0x4064('0x8')]){_0x5b59b6(_0x4064('0x55'))[_0x4064('0x4f')](_0x4064('0xa2'))['addClass'](_0x4064('0xa3'));setTimeout(function(){_0x5b59b6(_0x4064('0x55'))[_0x4064('0x4f')](_0x4064('0xa4'));},_0x49ab42[_0x4064('0x6d')]);}else _0x5b59b6('body')[_0x4064('0x4f')](_0x4064('0xa5'))[_0x4064('0x7b')](_0x4064('0xa2'));}());if(typeof _0x49ab42[_0x4064('0xa6')]===_0x4064('0xe'))_0x49ab42[_0x4064('0xa6')][_0x4064('0x62')](this);else _0x13a149('callbackProductsList\x20não\x20é\x20uma\x20função');};_0x1eeb9e[_0x4064('0x95')]=function(_0x39ba44,_0x130663,_0x53e22b){var _0x46009c=!![];function _0x63e265(){_0x130663[_0x4064('0x4f')]('qd-loaded')['load'](function(){_0x5b59b6(this)[_0x4064('0x7b')]('qd-loaded');})['attr'](_0x4064('0xa7'),_0x53e22b);};if(_0x53e22b)_0x63e265();else if(!isNaN(_0x39ba44)){alert('Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.');}else _0x13a149(_0x4064('0xa8'),_0x4064('0xa9'));};_0x1eeb9e[_0x4064('0x9c')]=function(_0xda5a6a){var _0x55ab28,_0x2a6086,_0x420295,_0x4fbf94;_0x55ab28=function(_0x5a31ba,_0x3a9a4a){var _0x233c79,_0x512b4d,_0x479c0d,_0x3ee64e,_0x21f969;_0x479c0d=_0x5b59b6(_0x5a31ba);_0x233c79=_0x479c0d[_0x4064('0x8b')](_0x4064('0xaa'));_0x21f969=_0x479c0d[_0x4064('0x8b')](_0x4064('0xab'));if(!_0x233c79)return;_0x512b4d=parseInt(_0x479c0d[_0x4064('0x93')]())||0x1;_0x1eeb9e[_0x4064('0xac')]([_0x233c79,_0x21f969],_0x512b4d,_0x512b4d+0x1,function(_0x248424){_0x479c0d['val'](_0x248424);if(typeof _0x3a9a4a===_0x4064('0xe'))_0x3a9a4a();});};_0x420295=function(_0x57d9c0,_0x33029e){var _0x179a05,_0x4b65a1,_0x16de64,_0x4e5e32,_0x384bcc;_0x16de64=_0x5b59b6(_0x57d9c0);_0x179a05=_0x16de64['attr'](_0x4064('0xaa'));_0x384bcc=_0x16de64[_0x4064('0x8b')](_0x4064('0xab'));if(!_0x179a05)return;_0x4b65a1=parseInt(_0x16de64[_0x4064('0x93')]())||0x2;_0x4e5e32=_0x1eeb9e[_0x4064('0xac')]([_0x179a05,_0x384bcc],_0x4b65a1,_0x4b65a1-0x1,function(_0x2ead03){_0x16de64[_0x4064('0x93')](_0x2ead03);if(typeof _0x33029e===_0x4064('0xe'))_0x33029e();});};_0x4fbf94=function(_0x40f85c,_0x3d8840){var _0x21dddf,_0x4a4c4e,_0x22857d,_0x43e851,_0x53abb5;_0x22857d=_0x5b59b6(_0x40f85c);_0x21dddf=_0x22857d['attr'](_0x4064('0xaa'));_0x53abb5=_0x22857d[_0x4064('0x8b')](_0x4064('0xab'));if(!_0x21dddf)return;_0x4a4c4e=parseInt(_0x22857d[_0x4064('0x93')]())||0x1;_0x43e851=_0x1eeb9e[_0x4064('0xac')]([_0x21dddf,_0x53abb5],0x1,_0x4a4c4e,function(_0x56aa0a){_0x22857d[_0x4064('0x93')](_0x56aa0a);if(typeof _0x3d8840===_0x4064('0xe'))_0x3d8840();});};_0x2a6086=_0xda5a6a['find'](_0x4064('0xad'));_0x2a6086[_0x4064('0x7b')](_0x4064('0xae'))['each'](function(){var _0xce6696=_0x5b59b6(this);_0xce6696[_0x4064('0x44')](_0x4064('0xaf'))['on'](_0x4064('0xb0'),function(_0x1a44ac){_0x1a44ac['preventDefault']();_0x2a6086[_0x4064('0x7b')](_0x4064('0xb1'));_0x55ab28(_0xce6696[_0x4064('0x44')](_0x4064('0x92')),function(){_0x2a6086[_0x4064('0x4f')]('qd-loading');});});_0xce6696['find']('.qd-ddc-quantityMinus')['on'](_0x4064('0xb2'),function(_0x2b07dd){_0x2b07dd[_0x4064('0xb3')]();_0x2a6086[_0x4064('0x7b')](_0x4064('0xb1'));_0x420295(_0xce6696[_0x4064('0x44')](_0x4064('0x92')),function(){_0x2a6086[_0x4064('0x4f')](_0x4064('0xb1'));});});_0xce6696[_0x4064('0x44')](_0x4064('0x92'))['on'](_0x4064('0xb4'),function(){_0x2a6086[_0x4064('0x7b')](_0x4064('0xb1'));_0x4fbf94(this,function(){_0x2a6086[_0x4064('0x4f')]('qd-loading');});});_0xce6696['find']('.qd-ddc-quantity')['on']('keyup.qd_ddc_change',function(_0x583aef){if(_0x583aef[_0x4064('0x54')]!=0xd)return;_0x2a6086['addClass'](_0x4064('0xb1'));_0x4fbf94(this,function(){_0x2a6086[_0x4064('0x4f')](_0x4064('0xb1'));});});});_0xda5a6a['find']('.qd-ddc-prodRow')[_0x4064('0x61')](function(){var _0x5d424e=_0x5b59b6(this);_0x5d424e['find'](_0x4064('0xb5'))['on']('click.qd_ddc_remove',function(){var _0x2eba04;_0x5d424e[_0x4064('0x7b')]('qd-loading');_0x1eeb9e['removeProduct'](_0x5b59b6(this),function(_0xcb0ddc){if(_0xcb0ddc)_0x5d424e[_0x4064('0xb6')](!![])[_0x4064('0xb7')](function(){_0x5d424e[_0x4064('0xb8')]();_0x1eeb9e[_0x4064('0x5f')]();});else _0x5d424e[_0x4064('0x4f')](_0x4064('0xb1'));});return![];});});};_0x1eeb9e['shippingCalculate']=function(_0x2b4c0f){var _0x53af48=_0x2b4c0f['val']();_0x53af48=_0x53af48[_0x4064('0x1')](/[^0-9\-]/g,'');_0x53af48=_0x53af48['replace'](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x4064('0xb9'));_0x53af48=_0x53af48[_0x4064('0x1')](/(.{9}).*/g,'$1');_0x2b4c0f[_0x4064('0x93')](_0x53af48);if(_0x53af48[_0x4064('0x8')]>=0x9){if(_0x2b4c0f['data'](_0x4064('0xba'))!=_0x53af48){_0x2b98ca[_0x4064('0xbb')]({'postalCode':_0x53af48,'country':_0x4064('0xbc')})[_0x4064('0xbd')](function(_0x5a2f53){window[_0x4064('0x18')][_0x4064('0x71')]=_0x5a2f53;_0x1eeb9e['getCartInfoByUrl']();})[_0x4064('0xbe')](function(_0x1b7216){_0x13a149([_0x4064('0xbf'),_0x1b7216]);updateCartData();});}_0x2b4c0f['data']('qdDdcLastPostalCode',_0x53af48);}};_0x1eeb9e[_0x4064('0xac')]=function(_0x7b475a,_0x2ff84e,_0x782852,_0x593f6f){var _0x1de1fa=_0x782852||0x1;if(_0x1de1fa<0x1)return _0x2ff84e;if(_0x49ab42[_0x4064('0x70')]){if(typeof window[_0x4064('0x18')][_0x4064('0x71')][_0x4064('0x74')][_0x7b475a[0x1]]==='undefined'){_0x13a149(_0x4064('0xc0')+_0x7b475a[0x1]+']');return _0x2ff84e;}window[_0x4064('0x18')][_0x4064('0x71')][_0x4064('0x74')][_0x7b475a[0x1]]['quantity']=_0x1de1fa;window['_QuatroDigital_DropDown']['getOrderForm'][_0x4064('0x74')][_0x7b475a[0x1]][_0x4064('0xc1')]=_0x7b475a[0x1];_0x2b98ca['updateItems']([window['_QuatroDigital_DropDown']['getOrderForm']['items'][_0x7b475a[0x1]]],[_0x4064('0x74'),_0x4064('0x75'),_0x4064('0x76')])['done'](function(_0x793692){window[_0x4064('0x18')][_0x4064('0x71')]=_0x793692;_0x2dc4c8(!![]);})[_0x4064('0xbe')](function(_0x2f18e1){_0x13a149([_0x4064('0xc2'),_0x2f18e1]);_0x2dc4c8();});}else{_0x13a149('atenção\x20esta\x20método\x20esta\x20descontinuado');}function _0x2dc4c8(_0x22f71b){_0x22f71b=typeof _0x22f71b!==_0x4064('0xc3')?![]:_0x22f71b;_0x1eeb9e['getCartInfoByUrl']();window[_0x4064('0x18')][_0x4064('0x19')]=![];_0x1eeb9e['cartIsEmpty']();if(typeof window['_QuatroDigital_AmountProduct']!==_0x4064('0x3')&&typeof window[_0x4064('0x72')][_0x4064('0x73')]===_0x4064('0xe'))window['_QuatroDigital_AmountProduct']['exec']['call'](this);if(typeof adminCart==='function')adminCart();_0x5b59b6['fn']['simpleCart'](!![],undefined,_0x22f71b);if(typeof _0x593f6f===_0x4064('0xe'))_0x593f6f(_0x2ff84e);};};_0x1eeb9e[_0x4064('0xc4')]=function(_0x77a9f4,_0x137592){var _0x9436a6=![];var _0x2a6bbf=_0x5b59b6(_0x77a9f4);var _0x364cd4=_0x2a6bbf[_0x4064('0x8b')](_0x4064('0xab'));if(_0x49ab42['smartCheckout']){if(typeof window[_0x4064('0x18')][_0x4064('0x71')][_0x4064('0x74')][_0x364cd4]===_0x4064('0x3')){_0x13a149('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x364cd4+']');return _0x9436a6;}window[_0x4064('0x18')][_0x4064('0x71')][_0x4064('0x74')][_0x364cd4]['index']=_0x364cd4;_0x2b98ca[_0x4064('0xc5')]([window[_0x4064('0x18')]['getOrderForm'][_0x4064('0x74')][_0x364cd4]],['items','totalizers',_0x4064('0x76')])[_0x4064('0xbd')](function(_0x1ab6f6){_0x9436a6=!![];window[_0x4064('0x18')][_0x4064('0x71')]=_0x1ab6f6;_0x39c438(_0x1ab6f6);_0xf53470(!![]);})[_0x4064('0xbe')](function(_0x564871){_0x13a149([_0x4064('0xc6'),_0x564871]);_0xf53470();});}else{alert(_0x4064('0xc7'));}function _0xf53470(_0xf37835){_0xf37835=typeof _0xf37835!=='boolean'?![]:_0xf37835;if(typeof window['_QuatroDigital_AmountProduct']!=='undefined'&&typeof window[_0x4064('0x72')]['exec']===_0x4064('0xe'))window['_QuatroDigital_AmountProduct'][_0x4064('0x73')]['call'](this);if(typeof adminCart==='function')adminCart();_0x5b59b6['fn'][_0x4064('0x5e')](!![],undefined,_0xf37835);if(typeof _0x137592===_0x4064('0xe'))_0x137592(_0x9436a6);};};_0x1eeb9e['scrollCart']=function(_0x5a9f60,_0x5c73ab,_0x3cae10,_0x49510c){var _0x47af6=_0x49510c||_0x5b59b6(_0x4064('0xc8'));var _0x5c69b3=_0x5a9f60||'+';var _0x24609b=_0x5c73ab||_0x47af6['height']()*0.9;_0x47af6['stop'](!![],!![])[_0x4064('0xc9')]({'scrollTop':isNaN(_0x3cae10)?_0x5c69b3+'='+_0x24609b+'px':_0x3cae10});};if(!_0x49ab42[_0x4064('0x5c')]){_0x1eeb9e[_0x4064('0x5d')]();_0x5b59b6['fn']['simpleCart'](!![]);}_0x5b59b6(window)['on'](_0x4064('0xca'),function(){try{window[_0x4064('0x18')][_0x4064('0x71')]=undefined;_0x1eeb9e[_0x4064('0x5d')]();}catch(_0x2d12dc){_0x13a149('Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20'+_0x2d12dc[_0x4064('0xf')],'avisso');}});if(typeof _0x49ab42[_0x4064('0xb')]===_0x4064('0xe'))_0x49ab42[_0x4064('0xb')][_0x4064('0x62')](this);else _0x13a149(_0x4064('0xcb'));};_0x5b59b6['fn'][_0x4064('0x1a')]=function(_0x5cef60){var _0xd8e0ca;_0xd8e0ca=_0x5b59b6(this);_0xd8e0ca['fn']=new _0x5b59b6[(_0x4064('0x1a'))](this,_0x5cef60);return _0xd8e0ca;};}catch(_0x28ab7c){if(typeof console!==_0x4064('0x3')&&typeof console['error']===_0x4064('0xe'))console[_0x4064('0xd')](_0x4064('0xcc'),_0x28ab7c);}}(this));(function(_0x5cc64d){'use strict';try{var _0x5d6eab=jQuery;var _0x202f2='Quatro\x20Digital\x20-\x20Box\x20Amount\x20Cart';var _0x17d37a=function(_0x4d47e2,_0x5de8ed){if(_0x4064('0x11')===typeof console&&_0x4064('0x3')!==typeof console['error']&&_0x4064('0x3')!==typeof console[_0x4064('0x12')]&&_0x4064('0x3')!==typeof console[_0x4064('0x17')]){var _0x53b803;_0x4064('0x11')===typeof _0x4d47e2?(_0x4d47e2['unshift']('['+_0x202f2+']\x0a'),_0x53b803=_0x4d47e2):_0x53b803=['['+_0x202f2+']\x0a'+_0x4d47e2];if(_0x4064('0x3')===typeof _0x5de8ed||_0x4064('0xa9')!==_0x5de8ed[_0x4064('0x15')]()&&'aviso'!==_0x5de8ed[_0x4064('0x15')]())if(_0x4064('0x3')!==typeof _0x5de8ed&&_0x4064('0x12')===_0x5de8ed[_0x4064('0x15')]())try{console[_0x4064('0x12')][_0x4064('0x16')](console,_0x53b803);}catch(_0xa5ccb3){try{console['info'](_0x53b803['join']('\x0a'));}catch(_0x2ed683){}}else try{console[_0x4064('0xd')][_0x4064('0x16')](console,_0x53b803);}catch(_0xe0a793){try{console[_0x4064('0xd')](_0x53b803[_0x4064('0x9')]('\x0a'));}catch(_0x5b537f){}}else try{console['warn'][_0x4064('0x16')](console,_0x53b803);}catch(_0xec3b20){try{console[_0x4064('0x17')](_0x53b803['join']('\x0a'));}catch(_0x36f572){}}}};window[_0x4064('0x72')]=window[_0x4064('0x72')]||{};window[_0x4064('0x72')][_0x4064('0x74')]={};window[_0x4064('0x72')][_0x4064('0xcd')]=![];window[_0x4064('0x72')]['buyButtonClicked']=![];window['_QuatroDigital_AmountProduct'][_0x4064('0xce')]=![];var _0x52d8a9='<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>';var _0x513576=function(){var _0x42f6fc,_0x4186a1,_0x3c992f,_0x2aa6f2;_0x2aa6f2=_0x75fba8();if(window['_QuatroDigital_AmountProduct'][_0x4064('0xcd')]){_0x5d6eab(_0x4064('0xcf'))[_0x4064('0xb8')]();_0x5d6eab(_0x4064('0xd0'))[_0x4064('0x4f')]('qd-bap-item-added');}for(var _0x26ca38 in window[_0x4064('0x72')]['items']){_0x42f6fc=window['_QuatroDigital_AmountProduct'][_0x4064('0x74')][_0x26ca38];if(typeof _0x42f6fc!=='object')return;_0x3c992f=_0x5d6eab(_0x4064('0xd1')+_0x42f6fc[_0x4064('0xd2')]+']')[_0x4064('0x0')]('li');if(!window[_0x4064('0x72')][_0x4064('0xcd')]&&_0x3c992f[_0x4064('0x44')](_0x4064('0xcf'))[_0x4064('0x8')])continue;_0x4186a1=_0x5d6eab(_0x52d8a9);_0x4186a1['find'](_0x4064('0xd3'))[_0x4064('0x42')](_0x42f6fc[_0x4064('0x66')]);var _0x116309=_0x3c992f['find']('.qd_bap_wrapper_content');if(_0x116309[_0x4064('0x8')])_0x116309[_0x4064('0xd4')](_0x4186a1)[_0x4064('0x7b')](_0x4064('0xd5'));else _0x3c992f[_0x4064('0xd4')](_0x4186a1);}if(_0x2aa6f2)window[_0x4064('0x72')]['allowRecalculate']=![];};var _0x75fba8=function(){if(!window['_QuatroDigital_AmountProduct'][_0x4064('0xcd')])return;var _0x4e887c=![],_0x58993b={};window[_0x4064('0x72')]['items']={};for(var _0x2a8ecd in window[_0x4064('0x18')][_0x4064('0x71')][_0x4064('0x74')]){if(typeof window[_0x4064('0x18')]['getOrderForm'][_0x4064('0x74')][_0x2a8ecd]!==_0x4064('0x11'))continue;var _0x12fdcd=window[_0x4064('0x18')]['getOrderForm'][_0x4064('0x74')][_0x2a8ecd];if(typeof _0x12fdcd[_0x4064('0xd6')]==='undefined'||_0x12fdcd[_0x4064('0xd6')]===null||_0x12fdcd[_0x4064('0xd6')]==='')continue;window[_0x4064('0x72')][_0x4064('0x74')][_0x4064('0xd7')+_0x12fdcd[_0x4064('0xd6')]]=window[_0x4064('0x72')][_0x4064('0x74')][_0x4064('0xd7')+_0x12fdcd[_0x4064('0xd6')]]||{};window[_0x4064('0x72')][_0x4064('0x74')][_0x4064('0xd7')+_0x12fdcd[_0x4064('0xd6')]][_0x4064('0xd2')]=_0x12fdcd['productId'];if(!_0x58993b[_0x4064('0xd7')+_0x12fdcd[_0x4064('0xd6')]])window[_0x4064('0x72')][_0x4064('0x74')][_0x4064('0xd7')+_0x12fdcd[_0x4064('0xd6')]][_0x4064('0x66')]=0x0;window[_0x4064('0x72')][_0x4064('0x74')][_0x4064('0xd7')+_0x12fdcd[_0x4064('0xd6')]][_0x4064('0x66')]=window[_0x4064('0x72')][_0x4064('0x74')][_0x4064('0xd7')+_0x12fdcd[_0x4064('0xd6')]][_0x4064('0x66')]+_0x12fdcd[_0x4064('0x94')];_0x4e887c=!![];_0x58993b['prod_'+_0x12fdcd[_0x4064('0xd6')]]=!![];}return _0x4e887c;};window[_0x4064('0x72')][_0x4064('0x73')]=function(){window['_QuatroDigital_AmountProduct'][_0x4064('0xcd')]=!![];_0x513576['call'](this);};_0x5d6eab(document)[_0x4064('0xd8')](function(){_0x513576[_0x4064('0x62')](this);});}catch(_0x440c1c){if(typeof console!==_0x4064('0x3')&&typeof console['error']===_0x4064('0xe'))console[_0x4064('0xd')](_0x4064('0xcc'),_0x440c1c);}}(this));(function(){'use strict';try{var _0x2902fc=jQuery,_0x33be41;var _0x398eee=_0x4064('0xd9');var _0xe10bd6=function(_0x75bc3f,_0x5c6904){if(_0x4064('0x11')===typeof console&&_0x4064('0x3')!==typeof console[_0x4064('0xd')]&&'undefined'!==typeof console[_0x4064('0x12')]&&_0x4064('0x3')!==typeof console['warn']){var _0x26db14;_0x4064('0x11')===typeof _0x75bc3f?(_0x75bc3f[_0x4064('0x13')]('['+_0x398eee+']\x0a'),_0x26db14=_0x75bc3f):_0x26db14=['['+_0x398eee+']\x0a'+_0x75bc3f];if(_0x4064('0x3')===typeof _0x5c6904||_0x4064('0xa9')!==_0x5c6904[_0x4064('0x15')]()&&'aviso'!==_0x5c6904['toLowerCase']())if(_0x4064('0x3')!==typeof _0x5c6904&&'info'===_0x5c6904[_0x4064('0x15')]())try{console[_0x4064('0x12')][_0x4064('0x16')](console,_0x26db14);}catch(_0xbf9b33){try{console[_0x4064('0x12')](_0x26db14['join']('\x0a'));}catch(_0xe9e951){}}else try{console[_0x4064('0xd')]['apply'](console,_0x26db14);}catch(_0x54af03){try{console['error'](_0x26db14[_0x4064('0x9')]('\x0a'));}catch(_0x3fdef1){}}else try{console[_0x4064('0x17')]['apply'](console,_0x26db14);}catch(_0x46376){try{console[_0x4064('0x17')](_0x26db14['join']('\x0a'));}catch(_0x5737e7){}}}};var _0x11c39d={'selector':_0x4064('0xda'),'dropDown':{},'buyButton':{}};_0x2902fc['QD_smartCart']=function(_0x38be92){var _0x1d5dc7,_0x5cc8ef={};_0x33be41=_0x2902fc['extend'](!![],{},_0x11c39d,_0x38be92);_0x1d5dc7=_0x2902fc(_0x33be41['selector'])['QD_dropDownCart'](_0x33be41['dropDown']);if(typeof _0x33be41[_0x4064('0xdb')][_0x4064('0x5c')]!==_0x4064('0x3')&&_0x33be41[_0x4064('0xdb')]['updateOnlyHover']===![])_0x5cc8ef[_0x4064('0xdc')]=_0x2902fc(_0x33be41['selector'])[_0x4064('0xdd')](_0x1d5dc7['fn'],_0x33be41[_0x4064('0xdc')]);else _0x5cc8ef['buyButton']=_0x2902fc(_0x33be41[_0x4064('0xde')])['QD_buyButton'](_0x33be41[_0x4064('0xdc')]);_0x5cc8ef[_0x4064('0xdb')]=_0x1d5dc7;return _0x5cc8ef;};_0x2902fc['fn'][_0x4064('0xdf')]=function(){if(typeof console==='object'&&typeof console[_0x4064('0x12')]==='function')console[_0x4064('0x12')](_0x4064('0xe0'));};_0x2902fc[_0x4064('0xdf')]=_0x2902fc['fn'][_0x4064('0xdf')];}catch(_0x6b02a5){if(typeof console!=='undefined'&&typeof console[_0x4064('0xd')]===_0x4064('0xe'))console[_0x4064('0xd')](_0x4064('0xcc'),_0x6b02a5);}}());

// vtex url parse
/* Quatro Digital - VTEX URL Parse // 1.4 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
var _0x8349=["\x6C\x69\x6E\x6B","\x3C\x61\x20\x68\x72\x65\x66\x3D\x22","\x22\x3E\x3C\x2F\x61\x3E","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\x66\x75\x6E\x63\x74\x69\x6F\x6E","\x65\x72\x72\x6F\x72","\x50\x72\x6F\x62\x6C\x65\x6D\x61\x73\x20\x3A\x28\x20\x2E\x20\x44\x65\x74\x61\x6C\x68\x65\x73\x3A\x20","\x2F","\x73\x70\x6C\x69\x74","","\x72\x65\x70\x6C\x61\x63\x65","\x70\x61\x74\x68\x6E\x61\x6D\x65","\x2C","\x70\x6F\x70","\x6D\x61\x74\x63\x68","\x73\x65\x61\x72\x63\x68","\x6C\x65\x6E\x67\x74\x68","\x6F\x62\x6A\x65\x63\x74","\x70\x75\x73\x68","\x63","\x6D\x61\x70","\x73\x68\x69\x66\x74","\x6F\x74\x68\x65\x72\x5F\x70\x61\x74\x68","\x6F\x74\x68\x65\x72\x5F\x73\x65\x61\x72\x63\x68","\x26","\x6F\x75\x74","\x67\x65\x74\x4D\x61\x70","\x70\x72\x6F\x74\x6F\x74\x79\x70\x65","\x6D\x65\x72\x67\x65\x55\x72\x6C","\x63\x61\x6C\x6C","\x65\x78\x74\x65\x6E\x64","\x67\x65\x74\x55\x72\x6C","\x6D\x61\x70\x3D","\x6A\x6F\x69\x6E","\x3F","\x51\x44\x5F\x56\x74\x65\x78\x55\x72\x6C\x50\x61\x72\x73\x65"];(function(){function _0x6ac7x1(_0x6ac7x2){try{this[_0x8349[0]]=$(_0x8349[1]+_0x6ac7x2+_0x8349[2])[0]}catch(c){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],c)}}function _0x6ac7x3(_0x6ac7x2){try{_0x6ac7x2=_0x6ac7x2||this[_0x8349[0]];var _0x6ac7x4=_0x6ac7x2[_0x8349[11]][_0x8349[10]](/\/\//g,_0x8349[7])[_0x8349[10]](/(^\/|\/$)/g,_0x8349[9])[_0x8349[8]](_0x8349[7]),_0x6ac7x5=((_0x6ac7x2[_0x8349[15]]||_0x8349[9])[_0x8349[14]](/map\=([^&]+)/i)||[_0x8349[9]])[_0x8349[13]]()[_0x8349[8]](_0x8349[12]);if(1==_0x6ac7x5[_0x8349[16]]&&0==_0x6ac7x5[0][_0x8349[16]]){if(_0x8349[17]== typeof defaultMap){_0x6ac7x5=defaultMap}else {for(var _0x6ac7x6=0;_0x6ac7x6<_0x6ac7x4[_0x8349[16]];_0x6ac7x6++){_0x6ac7x4[_0x6ac7x6][_0x8349[16]]&&_0x8349[7]!=_0x6ac7x4[_0x6ac7x6]&&_0x6ac7x5[_0x8349[18]](defaultMap)}}};for(var _0x6ac7x6={map:{},other_path:_0x8349[9]},_0x6ac7x7=0;_0x6ac7x7<_0x6ac7x5[_0x8349[16]];_0x6ac7x7++){_0x6ac7x5[_0x6ac7x7][_0x8349[16]]&&(_0x8349[19]==_0x6ac7x5[_0x6ac7x7]?(_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]=_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]||[],_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]][_0x8349[18]]((_0x6ac7x4||[_0x8349[9]])[_0x8349[21]]())):_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]=(_0x6ac7x4||[_0x8349[9]])[_0x8349[21]]())};_0x6ac7x6[_0x8349[22]]=_0x6ac7x4;_0x6ac7x6[_0x8349[23]]=(_0x6ac7x2[_0x8349[15]]||_0x8349[9])[_0x8349[10]](/map\=([^&]+)/ig,_0x8349[9])[_0x8349[10]](/\&\&+/ig,_0x8349[24])[_0x8349[10]](/\?/g,_0x8349[9]);return this[_0x8349[25]]=_0x6ac7x6}catch(g){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],g)}}_0x6ac7x1[_0x8349[27]][_0x8349[26]]=_0x6ac7x3;_0x6ac7x1[_0x8349[27]][_0x8349[28]]=function(_0x6ac7x2,_0x6ac7x4){try{var _0x6ac7x5=_0x6ac7x3[_0x8349[29]](this,this[_0x8349[0]]),_0x6ac7x6=_0x6ac7x3[_0x8349[29]](this,$(_0x8349[1]+_0x6ac7x2+_0x8349[2])[0]);_0x6ac7x5[_0x8349[22]][_0x8349[16]]||(_0x6ac7x5[_0x8349[22]]=void(0));_0x6ac7x5[_0x8349[23]][_0x8349[16]]||(_0x6ac7x5[_0x8349[23]]=void(0));var _0x6ac7x7=$[_0x8349[30]](!0,{},_0x6ac7x6,_0x6ac7x5);if(_0x8349[17]== typeof _0x6ac7x4){for(_0x6ac7x6=0;_0x6ac7x6<_0x6ac7x4[_0x8349[16]];_0x6ac7x6++){_0x6ac7x7[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]]&&(_0x6ac7x7[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]]=_0x6ac7x5[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]])}};return this[_0x8349[25]]=_0x6ac7x7}catch(g){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],g)}};_0x6ac7x1[_0x8349[27]][_0x8349[31]]=function(_0x6ac7x2){try{var _0x6ac7x4=[],_0x6ac7x5=[];_0x6ac7x2=_0x6ac7x2||{};for(var _0x6ac7x6 in this[_0x8349[25]][_0x8349[20]]){if(!_0x6ac7x2[_0x6ac7x6]){if(_0x8349[19]==_0x6ac7x6){for(var _0x6ac7x7=0;_0x6ac7x7<this[_0x8349[25]][_0x8349[20]][_0x6ac7x6][_0x8349[16]];_0x6ac7x7++){_0x6ac7x4[_0x8349[18]](this[_0x8349[25]][_0x8349[20]][_0x6ac7x6][_0x6ac7x7]),_0x6ac7x5[_0x8349[18]](_0x6ac7x6)}}else {_0x6ac7x4[_0x8349[18]](this[_0x8349[25]][_0x8349[20]][_0x6ac7x6]),_0x6ac7x5[_0x8349[18]](_0x6ac7x6)}}};var _0x6ac7x8=_0x6ac7x5[_0x8349[16]]?_0x8349[32]+_0x6ac7x5[_0x8349[33]](_0x8349[12])+_0x8349[24]:_0x8349[9];return _0x8349[7]+_0x6ac7x4[_0x8349[33]](_0x8349[7])+(this[_0x8349[25]][_0x8349[22]][_0x8349[16]]?_0x8349[7]+this[_0x8349[25]][_0x8349[22]][_0x8349[33]](_0x8349[7]):_0x8349[9])+_0x8349[34]+(_0x6ac7x8+this[_0x8349[25]][_0x8349[23]])[_0x8349[10]](/\&\&+/g,_0x8349[24])}catch(_0x6ac7x1){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],_0x6ac7x1)}};window[_0x8349[35]]=_0x6ac7x1})()

/* Quatro Digital - QD Select Smart Research 2 // Carlos Vinicius // Todos os direitos reservados */
var _0x28cf=['\x20+ul\x20.filtro-ativo:first','length','Desculpe,\x20não\x20foi\x20possível\x20executar\x20sua\x20solicitação.\x20Por\x20favor\x20entre\x20em\x20contato\x20com\x20o\x20SAC.','bwnqbirvphyb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','---','erc','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','QuatroDigital.ssrSelectAjaxPopulated','data-qdssr-ndx','Problemas\x20ao\x20definir\x20a\x20opção\x20selecionada.\x20Detalhes:\x20','message','addClass','Problemas\x20ao\x20tentar\x20verificar\x20as\x20opções\x20selecionadas.\x20Detalhes:\x20','options','optionsPlaceHolder','index','<div\x20class=\x22qd-ssr2-option-wrapper\x22>','<label\x20for=\x22qd-ssr2-select-','labelMessage','<select\x20data-qdssr-ndx=\x22','\x22\x20id=\x22qd-ssr2-select-','\x22\x20data-qdssr-title=\x22','</select></div>','appendTo','select','add','select2','pt-BR','bind','change','select[data-qdssr-ndx=','trigger','QuatroDigital.ssrChange','body','qd-ssr-reloading','redirect','split','shift','data-qdssr-str','qd-ssr-loading','qd-ssr2-loading','qdAjax','html','removeAttr','disabled','<option\x20value=\x22\x22></option>','getAjaxOptions','ajaxError','removeClass','Problemas\x20:(\x20.\x20Detalhes:\x20','val','option[data-qdssr-text=\x27','<option\x20value=\x22','\x22\x20data-qdssr-text=\x22','getCategory','innerHTML','indexOf','buscapagina','match','pop','push','cache','extend','qdPlugin','.qd_auto_select_smart_research_2','function','QD_SelectSmartResearch2','object','undefined','info','warn','unshift','[Quatro\x20Digital\x20-\x20QD\x20Select\x20Smart\x20Research\x202]\x0a','alerta','toLowerCase','apply','join','error','Selecione\x20o\x20anterior','location','href','find','data-qdssr-title','each','text','trim','attr','h5.'];(function(_0x12bf78,_0x284b07){var _0x5a0b4e=function(_0x491997){while(--_0x491997){_0x12bf78['push'](_0x12bf78['shift']());}};_0x5a0b4e(++_0x284b07);}(_0x28cf,0x155));var _0xf28c=function(_0xb33815,_0x188f1c){_0xb33815=_0xb33815-0x0;var _0x553e0b=_0x28cf[_0xb33815];return _0x553e0b;};(function(_0x5bc416){var _0x29ef90=jQuery;if(_0xf28c('0x0')!==typeof _0x29ef90['fn'][_0xf28c('0x1')]){_0x29ef90['fn'][_0xf28c('0x1')]=function(){};var _0x53bf1d=function(_0x1001b8,_0x3874f7){if(_0xf28c('0x2')===typeof console&&_0xf28c('0x3')!==typeof console['error']&&_0xf28c('0x3')!==typeof console[_0xf28c('0x4')]&&'undefined'!==typeof console[_0xf28c('0x5')]){var _0x56b157;_0xf28c('0x2')===typeof _0x1001b8?(_0x1001b8[_0xf28c('0x6')](_0xf28c('0x7')),_0x56b157=_0x1001b8):_0x56b157=[_0xf28c('0x7')+_0x1001b8];if('undefined'===typeof _0x3874f7||_0xf28c('0x8')!==_0x3874f7[_0xf28c('0x9')]()&&'aviso'!==_0x3874f7[_0xf28c('0x9')]())if(_0xf28c('0x3')!==typeof _0x3874f7&&_0xf28c('0x4')===_0x3874f7[_0xf28c('0x9')]())try{console[_0xf28c('0x4')][_0xf28c('0xa')](console,_0x56b157);}catch(_0x459efa){try{console[_0xf28c('0x4')](_0x56b157[_0xf28c('0xb')]('\x0a'));}catch(_0x10d39d){}}else try{console[_0xf28c('0xc')][_0xf28c('0xa')](console,_0x56b157);}catch(_0x156b06){try{console[_0xf28c('0xc')](_0x56b157[_0xf28c('0xb')]('\x0a'));}catch(_0x520f5e){}}else try{console['warn'][_0xf28c('0xa')](console,_0x56b157);}catch(_0x3d5efe){try{console['warn'](_0x56b157['join']('\x0a'));}catch(_0x28e98b){}}}},_0x491c74={'options':[],'optionsPlaceHolder':[],'disabledMessage':function(_0x28f263,_0x551a9e,_0x1c0cf7){return _0xf28c('0xd');},'labelMessage':function(_0x48fbbb,_0x505f32,_0xb484cc){return'Selecione\x20o(a)\x20'+_0xb484cc[_0x48fbbb];},'redirect':function(_0x4ae159){window[_0xf28c('0xe')][_0xf28c('0xf')]=_0x4ae159;},'getAjaxOptions':function(_0x331b4a,_0x1e8814){var _0x4a0f45=[];_0x29ef90(_0x331b4a)[_0xf28c('0x10')]('.search-single-navigator\x20ul.'+_0x1e8814['attr'](_0xf28c('0x11')))[_0xf28c('0x10')]('a')[_0xf28c('0x12')](function(){var _0x1e8814=_0x29ef90(this);_0x4a0f45['push']([_0x1e8814[_0xf28c('0x13')]()[_0xf28c('0x14')](),_0x1e8814[_0xf28c('0x15')](_0xf28c('0xf'))||'']);});return _0x4a0f45;},'optionIsChecked':function(_0x5d86aa){_0x5d86aa=_0x29ef90(_0xf28c('0x16')+_0x5d86aa+_0xf28c('0x17'))[_0xf28c('0x13')]()[_0xf28c('0x14')]();return _0x5d86aa[_0xf28c('0x18')]?_0x5d86aa:null;},'ajaxError':function(){_0x53bf1d(_0xf28c('0x19'));}};_0x5bc416=function(_0x5f2154){var _0x81ee05={'y':_0xf28c('0x1a')};return function(_0xa9e2b4){var _0x2f0b67=function(_0x1215ae){return _0x1215ae;};var _0x97794e=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0xa9e2b4=_0xa9e2b4['d'+_0x97794e[0x10]+'c'+_0x97794e[0x11]+'m'+_0x2f0b67(_0x97794e[0x1])+'n'+_0x97794e[0xd]]['l'+_0x97794e[0x12]+'c'+_0x97794e[0x0]+'ti'+_0x2f0b67('o')+'n'];var _0x566ff1=function(_0xa5f432){return escape(encodeURIComponent(_0xa5f432[_0xf28c('0x1b')](/\./g,'¨')[_0xf28c('0x1b')](/[a-zA-Z]/g,function(_0x3f3ef6){return String[_0xf28c('0x1c')](('Z'>=_0x3f3ef6?0x5a:0x7a)>=(_0x3f3ef6=_0x3f3ef6[_0xf28c('0x1d')](0x0)+0xd)?_0x3f3ef6:_0x3f3ef6-0x1a);})));};var _0x513c8a=_0x566ff1(_0xa9e2b4[[_0x97794e[0x9],_0x2f0b67('o'),_0x97794e[0xc],_0x97794e[_0x2f0b67(0xd)]]['join']('')]);_0x566ff1=_0x566ff1((window[['js',_0x2f0b67('no'),'m',_0x97794e[0x1],_0x97794e[0x4]['toUpperCase'](),'ite'][_0xf28c('0xb')]('')]||_0xf28c('0x1e'))+['.v',_0x97794e[0xd],'e',_0x2f0b67('x'),'co',_0x2f0b67('mm'),_0xf28c('0x1f'),_0x97794e[0x1],'.c',_0x2f0b67('o'),'m.',_0x97794e[0x13],'r'][_0xf28c('0xb')](''));for(var _0x14b36c in _0x81ee05){if(_0x566ff1===_0x14b36c+_0x81ee05[_0x14b36c]||_0x513c8a===_0x14b36c+_0x81ee05[_0x14b36c]){var _0x308f3a='tr'+_0x97794e[0x11]+'e';break;}_0x308f3a='f'+_0x97794e[0x0]+'ls'+_0x2f0b67(_0x97794e[0x1])+'';}_0x2f0b67=!0x1;-0x1<_0xa9e2b4[[_0x97794e[0xc],'e',_0x97794e[0x0],'rc',_0x97794e[0x9]]['join']('')]['indexOf']('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x2f0b67=!0x0);return[_0x308f3a,_0x2f0b67];}(_0x5f2154);}(window);if(!eval(_0x5bc416[0x0]))return _0x5bc416[0x1]?_0x53bf1d(_0xf28c('0x20')):!0x1;_0x29ef90[_0xf28c('0x1')]=function(_0xc9ee70,_0x3bde39){if(!_0x3bde39['options'][_0xf28c('0x18')])return _0x53bf1d('Nenhuma\x20opção\x20foi\x20enviada,\x20é\x20esperado\x20um\x20array\x20com\x20sub\x20arrays\x20contendo\x20o\x20conjunto\x20chave/valor.');_0xc9ee70['each'](function(){try{var _0x488440=_0x29ef90(this),_0x33632d=_0x2cadfd(_0x488440,_0x3bde39,_0xc9ee70);_0x434d25(_0x488440,_0x3bde39,0x0);_0x33632d['on'](_0xf28c('0x21'),function(_0x3d7bb4,_0x30af5e){try{_0x434d25(_0x488440,_0x3bde39,_0x30af5e[_0xf28c('0x15')](_0xf28c('0x22')));}catch(_0x130f94){_0x53bf1d(_0xf28c('0x23')+_0x130f94[_0xf28c('0x24')]);}});_0x488440[_0xf28c('0x25')]('qd-ssr2-loaded');}catch(_0x18cc96){_0x53bf1d(_0xf28c('0x26')+_0x18cc96[_0xf28c('0x24')]);}});};var _0x2cadfd=function(_0x5412cc,_0x17f687,_0x22af0d){try{for(var _0x455b6f='',_0x3a8ee8,_0x5bc416=!0x0,_0x2a8e11=new _0x29ef90(),_0x28fce9=!0x1,_0x4b7c8d=0x0,_0x5a49de=0x0;_0x5a49de<_0x17f687[_0xf28c('0x27')][_0xf28c('0x18')];_0x5a49de++){_0xf28c('0x2')!==typeof _0x17f687[_0xf28c('0x27')][_0x5a49de]&&(_0x5bc416=!0x1);var _0x316905=_0x17f687[_0xf28c('0x28')][_0x5a49de]||'',_0x5b7ef9=_0x22af0d[_0xf28c('0x29')](_0x5412cc);_0x455b6f=_0xf28c('0x2a');_0x455b6f+=_0xf28c('0x2b')+_0x5a49de+_0x5b7ef9+'\x22>'+_0x17f687[_0xf28c('0x2c')](_0x5a49de,_0x17f687['options'],_0x17f687[_0xf28c('0x28')])+'</label>';_0x455b6f+=_0xf28c('0x2d')+_0x5a49de+_0xf28c('0x2e')+_0x5a49de+_0x5b7ef9+_0xf28c('0x2f')+_0x316905+'\x22>';_0x455b6f+='<option\x20value=\x22\x22></option>';_0x5bc416?_0x455b6f+=_0x2734ce(_0x17f687[_0xf28c('0x27')][_0x5a49de]):_0x316905=_0x17f687['disabledMessage'](_0x5a49de,_0x17f687[_0xf28c('0x27')],_0x17f687['optionsPlaceHolder']);_0x455b6f+=_0xf28c('0x30');_0x3a8ee8=_0x29ef90(_0x455b6f);_0x3a8ee8[_0xf28c('0x31')](_0x5412cc);var _0x4aec23=_0x3a8ee8[_0xf28c('0x10')](_0xf28c('0x32'));_0x2a8e11=_0x2a8e11[_0xf28c('0x33')](_0x4aec23);_0x5bc416||_0x4aec23['attr']({'disabled':!0x0,'data-qdssr-str':_0x17f687[_0xf28c('0x27')][_0x5a49de]});_0x4aec23[_0xf28c('0x34')]({'placeholder':_0x316905,'language':_0xf28c('0x35')});_0x4aec23[_0xf28c('0x36')](_0xf28c('0x37'),function(_0x1966a9,_0x10f0e3){var _0x45be55=_0x29ef90(this),_0x187856=_0x5412cc[_0xf28c('0x10')](_0xf28c('0x38')+(parseInt(_0x45be55['attr'](_0xf28c('0x22'))||0x0,0xa)+0x1)+']'),_0x5bc416=(_0x45be55['val']()||'')[_0xf28c('0x14')]();_0x10f0e3||(_0x28fce9=!0x0);_0x29ef90(window)[_0xf28c('0x39')](_0xf28c('0x3a'),[_0x187856,_0x28fce9]);!_0x187856[_0xf28c('0x18')]&&(!_0x10f0e3||_0x28fce9&&_0x5bc416[_0xf28c('0x18')])&&(_0x29ef90(document[_0xf28c('0x3b')])['addClass'](_0xf28c('0x3c')),_0x17f687[_0xf28c('0x3d')](_0x5bc416));_0x5bc416=_0x5bc416[_0xf28c('0x3e')]('#')[_0xf28c('0x3f')]()[_0xf28c('0x3e')]('?');_0x5bc416[0x1]=(_0x187856[_0xf28c('0x15')](_0xf28c('0x40'))||'')+'&'+(_0x5bc416[0x1]||'');_0x29ef90(document['body'])['addClass'](_0xf28c('0x41'));_0x3a8ee8[_0xf28c('0x25')](_0xf28c('0x42'));_0x4b7c8d+=0x1;_0x29ef90[_0xf28c('0x43')]({'url':_0x5bc416[_0xf28c('0xb')]('?'),'dataType':_0xf28c('0x44'),'success':function(_0xc2f9b8){_0x187856[_0xf28c('0x45')](_0xf28c('0x46'));_0x187856[_0xf28c('0x44')](_0xf28c('0x47')+_0x2734ce(_0x17f687[_0xf28c('0x48')](_0xc2f9b8,_0x187856)));_0x187856[_0xf28c('0x34')]({'placeholder':_0x187856[_0xf28c('0x15')](_0xf28c('0x11'))});_0x45be55[_0xf28c('0x39')](_0xf28c('0x21'),[_0x187856]);},'error':function(){_0x17f687[_0xf28c('0x49')][_0xf28c('0xa')](this,arguments);},'complete':function(){_0x3a8ee8[_0xf28c('0x4a')]('qd-ssr2-loading');--_0x4b7c8d;0x0==_0x4b7c8d&&_0x29ef90(document[_0xf28c('0x3b')])[_0xf28c('0x4a')](_0xf28c('0x41'));},'clearQueueDelay':null});});}return _0x2a8e11;}catch(_0x4db64c){_0x53bf1d(_0xf28c('0x4b')+_0x4db64c[_0xf28c('0x24')]);}},_0x434d25=function(_0x2d8e56,_0x46c91a,_0x4e85cd,_0x5e879f){_0x46c91a=_0x46c91a['optionIsChecked'](_0x46c91a['optionsPlaceHolder'][_0x4e85cd]);null!==_0x46c91a&&(_0x5e879f=_0x5e879f||_0x2d8e56[_0xf28c('0x10')]('select[data-qdssr-ndx='+_0x4e85cd+']'),_0x5e879f[_0xf28c('0x4c')](_0x5e879f[_0xf28c('0x10')](_0xf28c('0x4d')+_0x46c91a+'\x27]')[_0xf28c('0x4c')]())['trigger'](_0xf28c('0x37'),!0x0));},_0x2734ce=function(_0x47c589){for(var _0x5d6d1c='',_0x44f5d4=0x0;_0x44f5d4<_0x47c589[_0xf28c('0x18')];_0x44f5d4++)_0x5d6d1c+=_0xf28c('0x4e')+(_0x47c589[_0x44f5d4][0x1]||'')+_0xf28c('0x4f')+(_0x47c589[_0x44f5d4][0x0]||'')[_0xf28c('0x1b')](/\s\([0-9]+\)/,'')+'\x22>'+(_0x47c589[_0x44f5d4][0x0]||'')+'</option>';return _0x5d6d1c;};_0x29ef90['QD_SelectSmartResearch2'][_0xf28c('0x50')]=function(){if(_0x29ef90[_0xf28c('0x1')][_0xf28c('0x50')]['cache'])return _0x29ef90[_0xf28c('0x1')][_0xf28c('0x50')]['cache'];var _0x1e2a28=[],_0x3b3206=[];_0x29ef90('script:not([src])')['each'](function(){var _0x2096ac=_0x29ef90(this)[0x0][_0xf28c('0x51')];if(-0x1<_0x2096ac[_0xf28c('0x52')](_0xf28c('0x53')))return _0x1e2a28=(decodeURIComponent((_0x2096ac[_0xf28c('0x54')](/\/buscapagina([^\'\"]+)/i)||[''])['pop']())['match'](/fq=c:[^\&]+/i)||[''])[_0xf28c('0x55')]()['split'](':')[_0xf28c('0x55')]()[_0xf28c('0x1b')](/(^\/|\/$)/g,'')[_0xf28c('0x3e')]('/'),!0x1;});for(var _0x3b27da=0x0;_0x3b27da<_0x1e2a28['length'];_0x3b27da++)_0x1e2a28[_0x3b27da][_0xf28c('0x18')]&&_0x3b3206[_0xf28c('0x56')](_0x1e2a28[_0x3b27da]);return _0x29ef90[_0xf28c('0x1')][_0xf28c('0x50')][_0xf28c('0x57')]=_0x3b3206;};_0x29ef90[_0xf28c('0x1')][_0xf28c('0x50')][_0xf28c('0x57')]=null;_0x29ef90['fn']['QD_SelectSmartResearch2']=function(_0x1073e5){var _0x1ef3db=_0x29ef90(this);if(!_0x1ef3db[_0xf28c('0x18')])return _0x1ef3db;_0x1073e5=_0x29ef90[_0xf28c('0x58')]({},_0x491c74,_0x1073e5);_0x1ef3db[_0xf28c('0x59')]=new _0x29ef90[(_0xf28c('0x1'))](_0x1ef3db,_0x1073e5);return _0x1ef3db;};_0x29ef90(function(){_0x29ef90(_0xf28c('0x5a'))['QD_SelectSmartResearch2']();});}}(this));