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
			$(".footer-qd-v1-facebook-likebox").html('<div class="fb-page" data-href="https://www.facebook.com/clubedeherois/" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/clubedeherois/">Clube de Heróis</a></blockquote></div></div>');
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
					forceImageHTTPS: true,
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
			Product.accessoriesFix();
			Product.accessoriesApplyCarousel();
			Product.shelfCarouselProduct();
			Product.openShipping();
			Product.seeDescription();
			Product.skuListSelection();
			Product.qdNotifymeShow();
			Product.hideUniqueSkuOption();
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
					notifyWrapper.parent().parent().attr('class', "").addClass('col-xs-12 col-lg-6');
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

			$(".accessories-qd-v1-wrapper").find('.prateleira').each(function () {
				var $this = $(this);

				$this.find("h2").addClass('heading-2').insertBefore($this);
			});

			$("accessories-qd-v1-carousel").owlCarousel({
				items: 4,
				navigation: true,
				pagination: false
			});
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
		hideUniqueSkuOption: function(){
			$(".product-qd-v1-sku-selection [class*='group_']").each(function(){
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
		},
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
// Owl Carousel
"function"!==typeof Object.create&&(Object.create=function(f){function g(){}g.prototype=f;return new g}); (function(f,g,k){var l={init:function(a,b){this.$elem=f(b);this.options=f.extend({},f.fn.owlCarousel.options,this.$elem.data(),a);this.userOptions=a;this.loadContent()},loadContent:function(){function a(a){var d,e="";if("function"===typeof b.options.jsonSuccess)b.options.jsonSuccess.apply(this,[a]);else{for(d in a.owl)a.owl.hasOwnProperty(d)&&(e+=a.owl[d].item);b.$elem.html(e)}b.logIn()}var b=this,e;"function"===typeof b.options.beforeInit&&b.options.beforeInit.apply(this,[b.$elem]);"string"===typeof b.options.jsonPath? (e=b.options.jsonPath,f.getJSON(e,a)):b.logIn()},logIn:function(){this.$elem.data("owl-originalStyles",this.$elem.attr("style"));this.$elem.data("owl-originalClasses",this.$elem.attr("class"));this.$elem.css({opacity:0});this.orignalItems=this.options.items;this.checkBrowser();this.wrapperWidth=0;this.checkVisible=null;this.setVars()},setVars:function(){if(0===this.$elem.children().length)return!1;this.baseClass();this.eventTypes();this.$userItems=this.$elem.children();this.itemsAmount=this.$userItems.length; this.wrapItems();this.$owlItems=this.$elem.find(".owl-item");this.$owlWrapper=this.$elem.find(".owl-wrapper");this.playDirection="next";this.prevItem=0;this.prevArr=[0];this.currentItem=0;this.customEvents();this.onStartup()},onStartup:function(){this.updateItems();this.calculateAll();this.buildControls();this.updateControls();this.response();this.moveEvents();this.stopOnHover();this.owlStatus();!1!==this.options.transitionStyle&&this.transitionTypes(this.options.transitionStyle);!0===this.options.autoPlay&& (this.options.autoPlay=5E3);this.play();this.$elem.find(".owl-wrapper").css("display","block");this.$elem.is(":visible")?this.$elem.css("opacity",1):this.watchVisibility();this.onstartup=!1;this.eachMoveUpdate();"function"===typeof this.options.afterInit&&this.options.afterInit.apply(this,[this.$elem])},eachMoveUpdate:function(){!0===this.options.lazyLoad&&this.lazyLoad();!0===this.options.autoHeight&&this.autoHeight();this.onVisibleItems();"function"===typeof this.options.afterAction&&this.options.afterAction.apply(this, [this.$elem])},updateVars:function(){"function"===typeof this.options.beforeUpdate&&this.options.beforeUpdate.apply(this,[this.$elem]);this.watchVisibility();this.updateItems();this.calculateAll();this.updatePosition();this.updateControls();this.eachMoveUpdate();"function"===typeof this.options.afterUpdate&&this.options.afterUpdate.apply(this,[this.$elem])},reload:function(){var a=this;g.setTimeout(function(){a.updateVars()},0)},watchVisibility:function(){var a=this;if(!1===a.$elem.is(":visible"))a.$elem.css({opacity:0}), g.clearInterval(a.autoPlayInterval),g.clearInterval(a.checkVisible);else return!1;a.checkVisible=g.setInterval(function(){a.$elem.is(":visible")&&(a.reload(),a.$elem.animate({opacity:1},200),g.clearInterval(a.checkVisible))},500)},wrapItems:function(){this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>');this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">');this.wrapperOuter=this.$elem.find(".owl-wrapper-outer");this.$elem.css("display","block")}, baseClass:function(){var a=this.$elem.hasClass(this.options.baseClass),b=this.$elem.hasClass(this.options.theme);a||this.$elem.addClass(this.options.baseClass);b||this.$elem.addClass(this.options.theme)},updateItems:function(){var a,b;if(!1===this.options.responsive)return!1;if(!0===this.options.singleItem)return this.options.items=this.orignalItems=1,this.options.itemsCustom=!1,this.options.itemsDesktop=!1,this.options.itemsDesktopSmall=!1,this.options.itemsTablet=!1,this.options.itemsTabletSmall= !1,this.options.itemsMobile=!1;a=f(this.options.responsiveBaseWidth).width();a>(this.options.itemsDesktop[0]||this.orignalItems)&&(this.options.items=this.orignalItems);if(!1!==this.options.itemsCustom)for(this.options.itemsCustom.sort(function(a,b){return a[0]-b[0]}),b=0;b<this.options.itemsCustom.length;b+=1)this.options.itemsCustom[b][0]<=a&&(this.options.items=this.options.itemsCustom[b][1]);else a<=this.options.itemsDesktop[0]&&!1!==this.options.itemsDesktop&&(this.options.items=this.options.itemsDesktop[1]), a<=this.options.itemsDesktopSmall[0]&&!1!==this.options.itemsDesktopSmall&&(this.options.items=this.options.itemsDesktopSmall[1]),a<=this.options.itemsTablet[0]&&!1!==this.options.itemsTablet&&(this.options.items=this.options.itemsTablet[1]),a<=this.options.itemsTabletSmall[0]&&!1!==this.options.itemsTabletSmall&&(this.options.items=this.options.itemsTabletSmall[1]),a<=this.options.itemsMobile[0]&&!1!==this.options.itemsMobile&&(this.options.items=this.options.itemsMobile[1]);this.options.items>this.itemsAmount&& !0===this.options.itemsScaleUp&&(this.options.items=this.itemsAmount)},response:function(){var a=this,b,e;if(!0!==a.options.responsive)return!1;e=f(g).width();a.resizer=function(){f(g).width()!==e&&(!1!==a.options.autoPlay&&g.clearInterval(a.autoPlayInterval),g.clearTimeout(b),b=g.setTimeout(function(){e=f(g).width();a.updateVars()},a.options.responsiveRefreshRate))};f(g).resize(a.resizer)},updatePosition:function(){this.jumpTo(this.currentItem);!1!==this.options.autoPlay&&this.checkAp()},appendItemsSizes:function(){var a= this,b=0,e=a.itemsAmount-a.options.items;a.$owlItems.each(function(c){var d=f(this);d.css({width:a.itemWidth}).data("owl-item",Number(c));if(0===c%a.options.items||c===e)c>e||(b+=1);d.data("owl-roundPages",b)})},appendWrapperSizes:function(){this.$owlWrapper.css({width:this.$owlItems.length*this.itemWidth*2,left:0});this.appendItemsSizes()},calculateAll:function(){this.calculateWidth();this.appendWrapperSizes();this.loops();this.max()},calculateWidth:function(){this.itemWidth=Math.round(this.$elem.width()/ this.options.items)},max:function(){var a=-1*(this.itemsAmount*this.itemWidth-this.options.items*this.itemWidth);this.options.items>this.itemsAmount?this.maximumPixels=a=this.maximumItem=0:(this.maximumItem=this.itemsAmount-this.options.items,this.maximumPixels=a);return a},min:function(){return 0},loops:function(){var a=0,b=0,e,c;this.positionsInArray=[0];this.pagesInArray=[];for(e=0;e<this.itemsAmount;e+=1)b+=this.itemWidth,this.positionsInArray.push(-b),!0===this.options.scrollPerPage&&(c=f(this.$owlItems[e]), c=c.data("owl-roundPages"),c!==a&&(this.pagesInArray[a]=this.positionsInArray[e],a=c))},buildControls:function(){if(!0===this.options.navigation||!0===this.options.pagination)this.owlControls=f('<div class="owl-controls"/>').toggleClass("clickable",!this.browser.isTouch).appendTo(this.$elem);!0===this.options.pagination&&this.buildPagination();!0===this.options.navigation&&this.buildButtons()},buildButtons:function(){var a=this,b=f('<div class="owl-buttons"/>');a.owlControls.append(b);a.buttonPrev= f("<div/>",{"class":"owl-prev",html:a.options.navigationText[0]||""});a.buttonNext=f("<div/>",{"class":"owl-next",html:a.options.navigationText[1]||""});b.append(a.buttonPrev).append(a.buttonNext);b.on("touchstart.owlControls mousedown.owlControls",'div[class^="owl"]',function(a){a.preventDefault()});b.on("touchend.owlControls mouseup.owlControls",'div[class^="owl"]',function(b){b.preventDefault();f(this).hasClass("owl-next")?a.next():a.prev()})},buildPagination:function(){var a=this;a.paginationWrapper= f('<div class="owl-pagination"/>');a.owlControls.append(a.paginationWrapper);a.paginationWrapper.on("touchend.owlControls mouseup.owlControls",".owl-page",function(b){b.preventDefault();Number(f(this).data("owl-page"))!==a.currentItem&&a.goTo(Number(f(this).data("owl-page")),!0)})},updatePagination:function(){var a,b,e,c,d,g;if(!1===this.options.pagination)return!1;this.paginationWrapper.html("");a=0;b=this.itemsAmount-this.itemsAmount%this.options.items;for(c=0;c<this.itemsAmount;c+=1)0===c%this.options.items&& (a+=1,b===c&&(e=this.itemsAmount-this.options.items),d=f("<div/>",{"class":"owl-page"}),g=f("<span></span>",{text:!0===this.options.paginationNumbers?a:"","class":!0===this.options.paginationNumbers?"owl-numbers":""}),d.append(g),d.data("owl-page",b===c?e:c),d.data("owl-roundPages",a),this.paginationWrapper.append(d));this.checkPagination()},checkPagination:function(){var a=this;if(!1===a.options.pagination)return!1;a.paginationWrapper.find(".owl-page").each(function(){f(this).data("owl-roundPages")=== f(a.$owlItems[a.currentItem]).data("owl-roundPages")&&(a.paginationWrapper.find(".owl-page").removeClass("active"),f(this).addClass("active"))})},checkNavigation:function(){if(!1===this.options.navigation)return!1;!1===this.options.rewindNav&&(0===this.currentItem&&0===this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.addClass("disabled")):0===this.currentItem&&0!==this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.removeClass("disabled")):this.currentItem=== this.maximumItem?(this.buttonPrev.removeClass("disabled"),this.buttonNext.addClass("disabled")):0!==this.currentItem&&this.currentItem!==this.maximumItem&&(this.buttonPrev.removeClass("disabled"),this.buttonNext.removeClass("disabled")))},updateControls:function(){this.updatePagination();this.checkNavigation();this.owlControls&&(this.options.items>=this.itemsAmount?this.owlControls.hide():this.owlControls.show())},destroyControls:function(){this.owlControls&&this.owlControls.remove()},next:function(a){if(this.isTransition)return!1; this.currentItem+=!0===this.options.scrollPerPage?this.options.items:1;if(this.currentItem>this.maximumItem+(!0===this.options.scrollPerPage?this.options.items-1:0))if(!0===this.options.rewindNav)this.currentItem=0,a="rewind";else return this.currentItem=this.maximumItem,!1;this.goTo(this.currentItem,a)},prev:function(a){if(this.isTransition)return!1;this.currentItem=!0===this.options.scrollPerPage&&0<this.currentItem&&this.currentItem<this.options.items?0:this.currentItem-(!0===this.options.scrollPerPage? this.options.items:1);if(0>this.currentItem)if(!0===this.options.rewindNav)this.currentItem=this.maximumItem,a="rewind";else return this.currentItem=0,!1;this.goTo(this.currentItem,a)},goTo:function(a,b,e){var c=this;if(c.isTransition)return!1;"function"===typeof c.options.beforeMove&&c.options.beforeMove.apply(this,[c.$elem]);a>=c.maximumItem?a=c.maximumItem:0>=a&&(a=0);c.currentItem=c.owl.currentItem=a;if(!1!==c.options.transitionStyle&&"drag"!==e&&1===c.options.items&&!0===c.browser.support3d)return c.swapSpeed(0), !0===c.browser.support3d?c.transition3d(c.positionsInArray[a]):c.css2slide(c.positionsInArray[a],1),c.afterGo(),c.singleItemTransition(),!1;a=c.positionsInArray[a];!0===c.browser.support3d?(c.isCss3Finish=!1,!0===b?(c.swapSpeed("paginationSpeed"),g.setTimeout(function(){c.isCss3Finish=!0},c.options.paginationSpeed)):"rewind"===b?(c.swapSpeed(c.options.rewindSpeed),g.setTimeout(function(){c.isCss3Finish=!0},c.options.rewindSpeed)):(c.swapSpeed("slideSpeed"),g.setTimeout(function(){c.isCss3Finish=!0}, c.options.slideSpeed)),c.transition3d(a)):!0===b?c.css2slide(a,c.options.paginationSpeed):"rewind"===b?c.css2slide(a,c.options.rewindSpeed):c.css2slide(a,c.options.slideSpeed);c.afterGo()},jumpTo:function(a){"function"===typeof this.options.beforeMove&&this.options.beforeMove.apply(this,[this.$elem]);a>=this.maximumItem||-1===a?a=this.maximumItem:0>=a&&(a=0);this.swapSpeed(0);!0===this.browser.support3d?this.transition3d(this.positionsInArray[a]):this.css2slide(this.positionsInArray[a],1);this.currentItem= this.owl.currentItem=a;this.afterGo()},afterGo:function(){this.prevArr.push(this.currentItem);this.prevItem=this.owl.prevItem=this.prevArr[this.prevArr.length-2];this.prevArr.shift(0);this.prevItem!==this.currentItem&&(this.checkPagination(),this.checkNavigation(),this.eachMoveUpdate(),!1!==this.options.autoPlay&&this.checkAp());"function"===typeof this.options.afterMove&&this.prevItem!==this.currentItem&&this.options.afterMove.apply(this,[this.$elem])},stop:function(){this.apStatus="stop";g.clearInterval(this.autoPlayInterval)}, checkAp:function(){"stop"!==this.apStatus&&this.play()},play:function(){var a=this;a.apStatus="play";if(!1===a.options.autoPlay)return!1;g.clearInterval(a.autoPlayInterval);a.autoPlayInterval=g.setInterval(function(){a.next(!0)},a.options.autoPlay)},swapSpeed:function(a){"slideSpeed"===a?this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)):"paginationSpeed"===a?this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)):"string"!==typeof a&&this.$owlWrapper.css(this.addCssSpeed(a))}, addCssSpeed:function(a){return{"-webkit-transition":"all "+a+"ms ease","-moz-transition":"all "+a+"ms ease","-o-transition":"all "+a+"ms ease",transition:"all "+a+"ms ease"}},removeTransition:function(){return{"-webkit-transition":"","-moz-transition":"","-o-transition":"",transition:""}},doTranslate:function(a){return{"-webkit-transform":"translate3d("+a+"px, 0px, 0px)","-moz-transform":"translate3d("+a+"px, 0px, 0px)","-o-transform":"translate3d("+a+"px, 0px, 0px)","-ms-transform":"translate3d("+ a+"px, 0px, 0px)",transform:"translate3d("+a+"px, 0px,0px)"}},transition3d:function(a){this.$owlWrapper.css(this.doTranslate(a))},css2move:function(a){this.$owlWrapper.css({left:a})},css2slide:function(a,b){var e=this;e.isCssFinish=!1;e.$owlWrapper.stop(!0,!0).animate({left:a},{duration:b||e.options.slideSpeed,complete:function(){e.isCssFinish=!0}})},checkBrowser:function(){var a=k.createElement("div");a.style.cssText="  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)"; a=a.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g);this.browser={support3d:null!==a&&1===a.length,isTouch:"ontouchstart"in g||g.navigator.msMaxTouchPoints}},moveEvents:function(){if(!1!==this.options.mouseDrag||!1!==this.options.touchDrag)this.gestures(),this.disabledEvents()},eventTypes:function(){var a=["s","e","x"];this.ev_types={};!0===this.options.mouseDrag&&!0===this.options.touchDrag?a=["touchstart.owl mousedown.owl","touchmove.owl mousemove.owl","touchend.owl touchcancel.owl mouseup.owl"]: !1===this.options.mouseDrag&&!0===this.options.touchDrag?a=["touchstart.owl","touchmove.owl","touchend.owl touchcancel.owl"]:!0===this.options.mouseDrag&&!1===this.options.touchDrag&&(a=["mousedown.owl","mousemove.owl","mouseup.owl"]);this.ev_types.start=a[0];this.ev_types.move=a[1];this.ev_types.end=a[2]},disabledEvents:function(){this.$elem.on("dragstart.owl",function(a){a.preventDefault()});this.$elem.on("mousedown.disableTextSelect",function(a){return f(a.target).is("input, textarea, select, option")})}, gestures:function(){function a(a){if(void 0!==a.touches)return{x:a.touches[0].pageX,y:a.touches[0].pageY};if(void 0===a.touches){if(void 0!==a.pageX)return{x:a.pageX,y:a.pageY};if(void 0===a.pageX)return{x:a.clientX,y:a.clientY}}}function b(a){"on"===a?(f(k).on(d.ev_types.move,e),f(k).on(d.ev_types.end,c)):"off"===a&&(f(k).off(d.ev_types.move),f(k).off(d.ev_types.end))}function e(b){b=b.originalEvent||b||g.event;d.newPosX=a(b).x-h.offsetX;d.newPosY=a(b).y-h.offsetY;d.newRelativeX=d.newPosX-h.relativePos; "function"===typeof d.options.startDragging&&!0!==h.dragging&&0!==d.newRelativeX&&(h.dragging=!0,d.options.startDragging.apply(d,[d.$elem]));(8<d.newRelativeX||-8>d.newRelativeX)&&!0===d.browser.isTouch&&(void 0!==b.preventDefault?b.preventDefault():b.returnValue=!1,h.sliding=!0);(10<d.newPosY||-10>d.newPosY)&&!1===h.sliding&&f(k).off("touchmove.owl");d.newPosX=Math.max(Math.min(d.newPosX,d.newRelativeX/5),d.maximumPixels+d.newRelativeX/5);!0===d.browser.support3d?d.transition3d(d.newPosX):d.css2move(d.newPosX)} function c(a){a=a.originalEvent||a||g.event;var c;a.target=a.target||a.srcElement;h.dragging=!1;!0!==d.browser.isTouch&&d.$owlWrapper.removeClass("grabbing");d.dragDirection=0>d.newRelativeX?d.owl.dragDirection="left":d.owl.dragDirection="right";0!==d.newRelativeX&&(c=d.getNewPosition(),d.goTo(c,!1,"drag"),h.targetElement===a.target&&!0!==d.browser.isTouch&&(f(a.target).on("click.disable",function(a){a.stopImmediatePropagation();a.stopPropagation();a.preventDefault();f(a.target).off("click.disable")}), a=f._data(a.target,"events").click,c=a.pop(),a.splice(0,0,c)));b("off")}var d=this,h={offsetX:0,offsetY:0,baseElWidth:0,relativePos:0,position:null,minSwipe:null,maxSwipe:null,sliding:null,dargging:null,targetElement:null};d.isCssFinish=!0;d.$elem.on(d.ev_types.start,".owl-wrapper",function(c){c=c.originalEvent||c||g.event;var e;if(3===c.which)return!1;if(!(d.itemsAmount<=d.options.items)){if(!1===d.isCssFinish&&!d.options.dragBeforeAnimFinish||!1===d.isCss3Finish&&!d.options.dragBeforeAnimFinish)return!1; !1!==d.options.autoPlay&&g.clearInterval(d.autoPlayInterval);!0===d.browser.isTouch||d.$owlWrapper.hasClass("grabbing")||d.$owlWrapper.addClass("grabbing");d.newPosX=0;d.newRelativeX=0;f(this).css(d.removeTransition());e=f(this).position();h.relativePos=e.left;h.offsetX=a(c).x-e.left;h.offsetY=a(c).y-e.top;b("on");h.sliding=!1;h.targetElement=c.target||c.srcElement}})},getNewPosition:function(){var a=this.closestItem();a>this.maximumItem?a=this.currentItem=this.maximumItem:0<=this.newPosX&&(this.currentItem= a=0);return a},closestItem:function(){var a=this,b=!0===a.options.scrollPerPage?a.pagesInArray:a.positionsInArray,e=a.newPosX,c=null;f.each(b,function(d,g){e-a.itemWidth/20>b[d+1]&&e-a.itemWidth/20<g&&"left"===a.moveDirection()?(c=g,a.currentItem=!0===a.options.scrollPerPage?f.inArray(c,a.positionsInArray):d):e+a.itemWidth/20<g&&e+a.itemWidth/20>(b[d+1]||b[d]-a.itemWidth)&&"right"===a.moveDirection()&&(!0===a.options.scrollPerPage?(c=b[d+1]||b[b.length-1],a.currentItem=f.inArray(c,a.positionsInArray)): (c=b[d+1],a.currentItem=d+1))});return a.currentItem},moveDirection:function(){var a;0>this.newRelativeX?(a="right",this.playDirection="next"):(a="left",this.playDirection="prev");return a},customEvents:function(){var a=this;a.$elem.on("owl.next",function(){a.next()});a.$elem.on("owl.prev",function(){a.prev()});a.$elem.on("owl.play",function(b,e){a.options.autoPlay=e;a.play();a.hoverStatus="play"});a.$elem.on("owl.stop",function(){a.stop();a.hoverStatus="stop"});a.$elem.on("owl.goTo",function(b,e){a.goTo(e)}); a.$elem.on("owl.jumpTo",function(b,e){a.jumpTo(e)})},stopOnHover:function(){var a=this;!0===a.options.stopOnHover&&!0!==a.browser.isTouch&&!1!==a.options.autoPlay&&(a.$elem.on("mouseover",function(){a.stop()}),a.$elem.on("mouseout",function(){"stop"!==a.hoverStatus&&a.play()}))},lazyLoad:function(){var a,b,e,c,d;if(!1===this.options.lazyLoad)return!1;for(a=0;a<this.itemsAmount;a+=1)b=f(this.$owlItems[a]),"loaded"!==b.data("owl-loaded")&&(e=b.data("owl-item"),c=b.find(".lazyOwl"),"string"!==typeof c.data("src")? b.data("owl-loaded","loaded"):(void 0===b.data("owl-loaded")&&(c.hide(),b.addClass("loading").data("owl-loaded","checked")),(d=!0===this.options.lazyFollow?e>=this.currentItem:!0)&&e<this.currentItem+this.options.items&&c.length&&this.lazyPreload(b,c)))},lazyPreload:function(a,b){function e(){a.data("owl-loaded","loaded").removeClass("loading");b.removeAttr("data-src");"fade"===d.options.lazyEffect?b.fadeIn(400):b.show();"function"===typeof d.options.afterLazyLoad&&d.options.afterLazyLoad.apply(this, [d.$elem])}function c(){f+=1;d.completeImg(b.get(0))||!0===k?e():100>=f?g.setTimeout(c,100):e()}var d=this,f=0,k;"DIV"===b.prop("tagName")?(b.css("background-image","url("+b.data("src")+")"),k=!0):b[0].src=b.data("src");c()},autoHeight:function(){function a(){var a=f(e.$owlItems[e.currentItem]).height();e.wrapperOuter.css("height",a+"px");e.wrapperOuter.hasClass("autoHeight")||g.setTimeout(function(){e.wrapperOuter.addClass("autoHeight")},0)}function b(){d+=1;e.completeImg(c.get(0))?a():100>=d?g.setTimeout(b, 100):e.wrapperOuter.css("height","")}var e=this,c=f(e.$owlItems[e.currentItem]).find("img"),d;void 0!==c.get(0)?(d=0,b()):a()},completeImg:function(a){return!a.complete||"undefined"!==typeof a.naturalWidth&&0===a.naturalWidth?!1:!0},onVisibleItems:function(){var a;!0===this.options.addClassActive&&this.$owlItems.removeClass("active");this.visibleItems=[];for(a=this.currentItem;a<this.currentItem+this.options.items;a+=1)this.visibleItems.push(a),!0===this.options.addClassActive&&f(this.$owlItems[a]).addClass("active"); this.owl.visibleItems=this.visibleItems},transitionTypes:function(a){this.outClass="owl-"+a+"-out";this.inClass="owl-"+a+"-in"},singleItemTransition:function(){var a=this,b=a.outClass,e=a.inClass,c=a.$owlItems.eq(a.currentItem),d=a.$owlItems.eq(a.prevItem),f=Math.abs(a.positionsInArray[a.currentItem])+a.positionsInArray[a.prevItem],g=Math.abs(a.positionsInArray[a.currentItem])+a.itemWidth/2;a.isTransition=!0;a.$owlWrapper.addClass("owl-origin").css({"-webkit-transform-origin":g+"px","-moz-perspective-origin":g+ "px","perspective-origin":g+"px"});d.css({position:"relative",left:f+"px"}).addClass(b).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){a.endPrev=!0;d.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");a.clearTransStyle(d,b)});c.addClass(e).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){a.endCurrent=!0;c.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");a.clearTransStyle(c,e)})},clearTransStyle:function(a, b){a.css({position:"",left:""}).removeClass(b);this.endPrev&&this.endCurrent&&(this.$owlWrapper.removeClass("owl-origin"),this.isTransition=this.endCurrent=this.endPrev=!1)},owlStatus:function(){this.owl={userOptions:this.userOptions,baseElement:this.$elem,userItems:this.$userItems,owlItems:this.$owlItems,currentItem:this.currentItem,prevItem:this.prevItem,visibleItems:this.visibleItems,isTouch:this.browser.isTouch,browser:this.browser,dragDirection:this.dragDirection}},clearEvents:function(){this.$elem.off(".owl owl mousedown.disableTextSelect"); f(k).off(".owl owl");f(g).off("resize",this.resizer)},unWrap:function(){0!==this.$elem.children().length&&(this.$owlWrapper.unwrap(),this.$userItems.unwrap().unwrap(),this.owlControls&&this.owlControls.remove());this.clearEvents();this.$elem.attr("style",this.$elem.data("owl-originalStyles")||"").attr("class",this.$elem.data("owl-originalClasses"))},destroy:function(){this.stop();g.clearInterval(this.checkVisible);this.unWrap();this.$elem.removeData()},reinit:function(a){a=f.extend({},this.userOptions, a);this.unWrap();this.init(a,this.$elem)},addItem:function(a,b){var e;if(!a)return!1;if(0===this.$elem.children().length)return this.$elem.append(a),this.setVars(),!1;this.unWrap();e=void 0===b||-1===b?-1:b;e>=this.$userItems.length||-1===e?this.$userItems.eq(-1).after(a):this.$userItems.eq(e).before(a);this.setVars()},removeItem:function(a){if(0===this.$elem.children().length)return!1;a=void 0===a||-1===a?-1:a;this.unWrap();this.$userItems.eq(a).remove();this.setVars()}};f.fn.owlCarousel=function(a){return this.each(function(){if(!0=== f(this).data("owl-init"))return!1;f(this).data("owl-init",!0);var b=Object.create(l);b.init(a,this);f.data(this,"owlCarousel",b)})};f.fn.owlCarousel.options={items:5,itemsCustom:!1,itemsDesktop:[1199,4],itemsDesktopSmall:[979,3],itemsTablet:[768,2],itemsTabletSmall:!1,itemsMobile:[479,1],singleItem:!1,itemsScaleUp:!1,slideSpeed:200,paginationSpeed:800,rewindSpeed:1E3,autoPlay:!1,stopOnHover:!1,navigation:!1,navigationText:["prev","next"],rewindNav:!0,scrollPerPage:!1,pagination:!0,paginationNumbers:!1, responsive:!0,responsiveRefreshRate:200,responsiveBaseWidth:g,baseClass:"owl-carousel",theme:"owl-theme",lazyLoad:!1,lazyFollow:!0,lazyEffect:"fade",autoHeight:!1,jsonPath:!1,jsonSuccess:!1,dragBeforeAnimFinish:!0,mouseDrag:!0,touchDrag:!0,addClassActive:!1,transitionStyle:!1,beforeUpdate:!1,afterUpdate:!1,beforeInit:!1,afterInit:!1,beforeMove:!1,afterMove:!1,afterAction:!1,startDragging:!1,afterLazyLoad:!1}})(jQuery,window,document);

// amazing menu
var _0x1e2a=['ite','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd-am-banner','filter','.qd-am-collection','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','url','html','img[alt=\x27','attr','.box-banner','clone','insertBefore','hide','qd-am-content-loaded','text','trim','[class*=\x27colunas\x27]','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','call','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','qd-am-has-ul','children',':not(ul)','first','replaceSpecialChars','>li','qd-amazing-menu','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','qd-am-','QuatroDigital.am.callback','extend','exec','.qd_amazing_menu_auto','getParent','closest','QD_amazingMenu','function','object','undefined','info','warn','unshift','alerta','toLowerCase','aviso','join','error','apply','qdAmAddNdx','each','addClass','qd-am-li-','qd-am-last','replace','fromCharCode','charCodeAt'];(function(_0x4244ce,_0x7e0272){var _0x1896fe=function(_0x66b4b9){while(--_0x66b4b9){_0x4244ce['push'](_0x4244ce['shift']());}};_0x1896fe(++_0x7e0272);}(_0x1e2a,0x101));var _0xa1e2=function(_0x9430b6,_0x4ff17c){_0x9430b6=_0x9430b6-0x0;var _0x261874=_0x1e2a[_0x9430b6];return _0x261874;};(function(_0x21bd07){_0x21bd07['fn'][_0xa1e2('0x0')]=_0x21bd07['fn'][_0xa1e2('0x1')];}(jQuery));(function(_0x286637){'use strict';var _0x582ae1,_0x3ad3e6,_0x407f05,_0x456d81;_0x582ae1=jQuery;if(typeof _0x582ae1['fn'][_0xa1e2('0x2')]===_0xa1e2('0x3'))return;_0x3ad3e6={'url':'/qd-amazing-menu','callback':function(){},'ajaxCallback':function(){}};var _0x4510b0='QD\x20Amazing\x20Menu';var _0x532799=function(_0x2621ff,_0x4043cd){if(_0xa1e2('0x4')===typeof console&&'undefined'!==typeof console['error']&&_0xa1e2('0x5')!==typeof console[_0xa1e2('0x6')]&&_0xa1e2('0x5')!==typeof console[_0xa1e2('0x7')]){var _0x2358a5;_0xa1e2('0x4')===typeof _0x2621ff?(_0x2621ff[_0xa1e2('0x8')]('['+_0x4510b0+']\x0a'),_0x2358a5=_0x2621ff):_0x2358a5=['['+_0x4510b0+']\x0a'+_0x2621ff];if(_0xa1e2('0x5')===typeof _0x4043cd||_0xa1e2('0x9')!==_0x4043cd[_0xa1e2('0xa')]()&&_0xa1e2('0xb')!==_0x4043cd[_0xa1e2('0xa')]())if(_0xa1e2('0x5')!==typeof _0x4043cd&&_0xa1e2('0x6')===_0x4043cd['toLowerCase']())try{console['info']['apply'](console,_0x2358a5);}catch(_0x5a722c){try{console['info'](_0x2358a5[_0xa1e2('0xc')]('\x0a'));}catch(_0x5ac561){}}else try{console['error']['apply'](console,_0x2358a5);}catch(_0x11a60f){try{console[_0xa1e2('0xd')](_0x2358a5[_0xa1e2('0xc')]('\x0a'));}catch(_0x75d844){}}else try{console['warn'][_0xa1e2('0xe')](console,_0x2358a5);}catch(_0x58c886){try{console[_0xa1e2('0x7')](_0x2358a5[_0xa1e2('0xc')]('\x0a'));}catch(_0x2509b4){}}}};_0x582ae1['fn'][_0xa1e2('0xf')]=function(){var _0x5d9072=_0x582ae1(this);_0x5d9072[_0xa1e2('0x10')](function(_0x6d9ecd){_0x582ae1(this)[_0xa1e2('0x11')](_0xa1e2('0x12')+_0x6d9ecd);});_0x5d9072['first']()[_0xa1e2('0x11')]('qd-am-first');_0x5d9072['last']()[_0xa1e2('0x11')](_0xa1e2('0x13'));return _0x5d9072;};_0x582ae1['fn']['QD_amazingMenu']=function(){};var _0x2cd454=function(_0x3c7c46){var _0x369a31={'n':'oenxnqnoen%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x251b15){var _0x349677,_0x2e7de8,_0x2e724f,_0x3060b7;_0x2e7de8=function(_0x4fc891){return _0x4fc891;};_0x2e724f=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x251b15=_0x251b15['d'+_0x2e724f[0x10]+'c'+_0x2e724f[0x11]+'m'+_0x2e7de8(_0x2e724f[0x1])+'n'+_0x2e724f[0xd]]['l'+_0x2e724f[0x12]+'c'+_0x2e724f[0x0]+'ti'+_0x2e7de8('o')+'n'];_0x349677=function(_0x3e6177){return escape(encodeURIComponent(_0x3e6177[_0xa1e2('0x14')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x24105b){return String[_0xa1e2('0x15')](('Z'>=_0x24105b?0x5a:0x7a)>=(_0x24105b=_0x24105b[_0xa1e2('0x16')](0x0)+0xd)?_0x24105b:_0x24105b-0x1a);})));};var _0x528452=_0x349677(_0x251b15[[_0x2e724f[0x9],_0x2e7de8('o'),_0x2e724f[0xc],_0x2e724f[_0x2e7de8(0xd)]][_0xa1e2('0xc')]('')]);_0x349677=_0x349677((window[['js',_0x2e7de8('no'),'m',_0x2e724f[0x1],_0x2e724f[0x4]['toUpperCase'](),_0xa1e2('0x17')]['join']('')]||'---')+['.v',_0x2e724f[0xd],'e',_0x2e7de8('x'),'co',_0x2e7de8('mm'),_0xa1e2('0x18'),_0x2e724f[0x1],'.c',_0x2e7de8('o'),'m.',_0x2e724f[0x13],'r'][_0xa1e2('0xc')](''));for(var _0x24e378 in _0x369a31){if(_0x349677===_0x24e378+_0x369a31[_0x24e378]||_0x528452===_0x24e378+_0x369a31[_0x24e378]){_0x3060b7='tr'+_0x2e724f[0x11]+'e';break;}_0x3060b7='f'+_0x2e724f[0x0]+'ls'+_0x2e7de8(_0x2e724f[0x1])+'';}_0x2e7de8=!0x1;-0x1<_0x251b15[[_0x2e724f[0xc],'e',_0x2e724f[0x0],'rc',_0x2e724f[0x9]][_0xa1e2('0xc')]('')][_0xa1e2('0x19')](_0xa1e2('0x1a'))&&(_0x2e7de8=!0x0);return[_0x3060b7,_0x2e7de8];}(_0x3c7c46);}(window);if(!eval(_0x2cd454[0x0]))return _0x2cd454[0x1]?_0x532799(_0xa1e2('0x1b')):!0x1;_0x456d81=function(_0x4a6db6){var _0x20e390,_0x105395,_0x365344;_0x365344=_0x4a6db6[_0xa1e2('0x1c')]('.qd_am_code');_0x20e390=_0x365344['filter'](_0xa1e2('0x1d'));_0x105395=_0x365344[_0xa1e2('0x1e')](_0xa1e2('0x1f'));if(!(_0x20e390[_0xa1e2('0x20')]||_0x105395[_0xa1e2('0x20')]))return;_0x20e390[_0xa1e2('0x21')]()['addClass'](_0xa1e2('0x22'));_0x105395[_0xa1e2('0x21')]()['addClass'](_0xa1e2('0x23'));_0x582ae1['qdAjax']({'url':_0x407f05[_0xa1e2('0x24')],'dataType':_0xa1e2('0x25'),'success':function(_0x564673){var _0x1495a5=_0x582ae1(_0x564673);_0x20e390[_0xa1e2('0x10')](function(){var _0x211639,_0x22b57e;_0x22b57e=_0x582ae1(this);_0x211639=_0x1495a5[_0xa1e2('0x1c')](_0xa1e2('0x26')+_0x22b57e[_0xa1e2('0x27')]('data-qdam-value')+'\x27]');if(!_0x211639[_0xa1e2('0x20')])return;_0x211639[_0xa1e2('0x10')](function(){_0x582ae1(this)[_0xa1e2('0x0')](_0xa1e2('0x28'))[_0xa1e2('0x29')]()[_0xa1e2('0x2a')](_0x22b57e);});_0x22b57e[_0xa1e2('0x2b')]();})['addClass'](_0xa1e2('0x2c'));_0x105395[_0xa1e2('0x10')](function(){var _0x353b6e={},_0x1eb324;_0x1eb324=_0x582ae1(this);_0x1495a5[_0xa1e2('0x1c')]('h2')[_0xa1e2('0x10')](function(){if(_0x582ae1(this)[_0xa1e2('0x2d')]()[_0xa1e2('0x2e')]()[_0xa1e2('0xa')]()==_0x1eb324['attr']('data-qdam-value')[_0xa1e2('0x2e')]()[_0xa1e2('0xa')]()){_0x353b6e=_0x582ae1(this);return![];}});if(!_0x353b6e[_0xa1e2('0x20')])return;_0x353b6e[_0xa1e2('0x10')](function(){_0x582ae1(this)[_0xa1e2('0x0')](_0xa1e2('0x2f'))['clone']()[_0xa1e2('0x2a')](_0x1eb324);});_0x1eb324[_0xa1e2('0x2b')]();})[_0xa1e2('0x11')](_0xa1e2('0x2c'));},'error':function(){_0x532799(_0xa1e2('0x30')+_0x407f05['url']+'\x27\x20falho.');},'complete':function(){_0x407f05['ajaxCallback'][_0xa1e2('0x31')](this);_0x582ae1(window)[_0xa1e2('0x32')](_0xa1e2('0x33'),_0x4a6db6);},'clearQueueDelay':0xbb8});};_0x582ae1['QD_amazingMenu']=function(_0x283f62){var _0x213739=_0x283f62[_0xa1e2('0x1c')](_0xa1e2('0x34'))[_0xa1e2('0x10')](function(){var _0x4fe957,_0x208206,_0xfc19f9,_0x183526;_0x4fe957=_0x582ae1(this);if(!_0x4fe957['length'])return _0x532799([_0xa1e2('0x35'),_0x283f62],_0xa1e2('0x9'));_0x4fe957[_0xa1e2('0x1c')]('li\x20>ul')[_0xa1e2('0x21')]()['addClass'](_0xa1e2('0x36'));_0x4fe957['find']('li')[_0xa1e2('0x10')](function(){var _0x3440ef=_0x582ae1(this),_0x4e855c;_0x4e855c=_0x3440ef[_0xa1e2('0x37')](_0xa1e2('0x38'));if(!_0x4e855c[_0xa1e2('0x20')])return;_0x3440ef[_0xa1e2('0x11')]('qd-am-elem-'+_0x4e855c[_0xa1e2('0x39')]()['text']()[_0xa1e2('0x2e')]()[_0xa1e2('0x3a')]()[_0xa1e2('0x14')](/\./g,'')[_0xa1e2('0x14')](/\s/g,'-')['toLowerCase']());});_0x208206=_0x4fe957[_0xa1e2('0x1c')](_0xa1e2('0x3b'))['qdAmAddNdx']();_0x4fe957[_0xa1e2('0x11')](_0xa1e2('0x3c'));_0xfc19f9=_0x208206[_0xa1e2('0x1c')](_0xa1e2('0x3d'));_0xfc19f9[_0xa1e2('0x10')](function(){var _0x51fcff=_0x582ae1(this),_0x39718a;_0x39718a=_0x51fcff[_0xa1e2('0x1c')](_0xa1e2('0x3b'))[_0xa1e2('0xf')]()['addClass'](_0xa1e2('0x3e'));_0x51fcff['addClass'](_0xa1e2('0x3f'));_0x51fcff[_0xa1e2('0x21')]()[_0xa1e2('0x11')]('qd-am-dropdown');});_0xfc19f9['addClass'](_0xa1e2('0x40'));var _0x1f4221=0x0;var _0x1862aa=function(_0x3da061){_0x1f4221=_0x1f4221+0x1;var _0x24a57e=_0x3da061['children']('li');var _0x1a5664=_0x24a57e[_0xa1e2('0x37')]('*');if(!_0x1a5664[_0xa1e2('0x20')])return;_0x1a5664['addClass']('qd-am-level-'+_0x1f4221);_0x1862aa(_0x1a5664);};_0x1862aa(_0x4fe957);_0x4fe957['add'](_0x4fe957[_0xa1e2('0x1c')]('ul'))[_0xa1e2('0x10')](function(){var _0x2502b1=_0x582ae1(this);_0x2502b1[_0xa1e2('0x11')](_0xa1e2('0x41')+_0x2502b1['children']('li')[_0xa1e2('0x20')]+'-li');});});_0x456d81(_0x213739);_0x407f05['callback']['call'](this);_0x582ae1(window)[_0xa1e2('0x32')](_0xa1e2('0x42'),_0x283f62);};_0x582ae1['fn'][_0xa1e2('0x2')]=function(_0x1ac7c0){var _0x5bd390=_0x582ae1(this);if(!_0x5bd390[_0xa1e2('0x20')])return _0x5bd390;_0x407f05=_0x582ae1[_0xa1e2('0x43')]({},_0x3ad3e6,_0x1ac7c0);_0x5bd390[_0xa1e2('0x44')]=new _0x582ae1[(_0xa1e2('0x2'))](_0x582ae1(this));return _0x5bd390;};_0x582ae1(function(){_0x582ae1(_0xa1e2('0x45'))[_0xa1e2('0x2')]();});}(this));

var _0x820e=['continueShopping','find','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','removeClass','qd-bb-lightBoxProdAdd','body','qd-bb-lightBoxBodyProdAdd','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-shipping\x20input','keyup.qd_ddc_cep','formatCepField','.qd-ddc-shipping\x20.qd-ddc-cep-btn','click','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','getCartInfoByUrl','simpleCart','cartIsEmpty','each','call','clone','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','shipping','Atenção,\x20você\x20esta\x20utilizando\x20um\x20método\x20descontinuado','items','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','getOrderForm','_QuatroDigital_AmountProduct','exec','addClass','QD_checkoutQueue','totalizers','shippingData','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22>','<div\x20class=\x22qd-ddc-prodImgWrapper\x22>','<img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/>','</div>','<div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a>','<input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a>','<span\x20class=\x22qd-ddc-qttLoading\x22></span>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22>','<div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22>','<span\x20class=\x22qd-ddc-prodRowLoading\x22></span>','empty','productCategoryIds','attr','qd-ddc-','skuName','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','.qd-ddc-quantity','val','quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','appendTo','getParent','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','[data-sku=\x27','outerHeight','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','callbackProductsList','forceImageHTTPS','string','http','https','qd-loaded','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','preventDefault','qd-loading','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','stop','remove','qdDdcLastPostalCode','calculateShipping','BRA','done','slas','shippingEstimate','\x20dia\x20útil','\x20dias\x20útéis','append','<li>','\x20-\x20R$\x20','price','fail','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','removeProduct','removeItems','Atenção,\x20este\x20método\x20esta\x20descontinuado.','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','avisso','Callback\x20não\x20é\x20uma\x20função','Quatro\x20Digital\x20-\x20Box\x20Amount\x20Cart','unshift','allowRecalculate','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-wrapper','qd-bap-item-added','prodId','prepend','productId','prod_','ajaxStop','Quatro\x20Digital\x20-\x20Plus\x20Smart\x20Cart','.qdDdcContainer','QD_smartCart','extend','selector','dropDown','buyButton','QD_buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','replace','undefined','round','split','length','join','_QuatroDigital_CartData','callback','error','function','Oooops!\x20','message','Quatro\x20Digital\x20-\x20DropDown\x20Cart','object','warn','alerta','aviso','info','toLowerCase','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','oenxnqnoen%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>\x20<button\x20class=\x22qd-ddc-cep-btn\x22>Calcular</button>','name','smartCheckout','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','<div\x20class=\x22qd-ddc-wrapper2\x22>','<div\x20class=\x22qd_ddc_lightBoxClose\x22></div>','<div\x20class=\x22qd-ddc-wrapper3\x22>','<div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div>','<span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div>','<div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22>','<div\x20class=\x22qd-ddc-shipping\x22></div>','<div\x20class=\x22qd-ddc-infoTotal\x22></div>','</div></div></div></div></div>','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','.qd-ddc-viewCart','html','linkCart'];(function(_0x1b15ff,_0x392170){var _0x55656b=function(_0x40ef8b){while(--_0x40ef8b){_0x1b15ff['push'](_0x1b15ff['shift']());}};_0x55656b(++_0x392170);}(_0x820e,0x18e));var _0xe820=function(_0xa719e7,_0x58a47a){_0xa719e7=_0xa719e7-0x0;var _0xf37829=_0x820e[_0xa719e7];return _0xf37829;};(function(_0x14ca36){_0x14ca36['fn']['getParent']=_0x14ca36['fn']['closest'];}(jQuery));function qd_number_format(_0x5ee235,_0x925588,_0x55721b,_0x1814bc){_0x5ee235=(_0x5ee235+'')[_0xe820('0x0')](/[^0-9+\-Ee.]/g,'');_0x5ee235=isFinite(+_0x5ee235)?+_0x5ee235:0x0;_0x925588=isFinite(+_0x925588)?Math['abs'](_0x925588):0x0;_0x1814bc='undefined'===typeof _0x1814bc?',':_0x1814bc;_0x55721b=_0xe820('0x1')===typeof _0x55721b?'.':_0x55721b;var _0x4093e1='',_0x4093e1=function(_0x182647,_0x5ddf90){var _0x925588=Math['pow'](0xa,_0x5ddf90);return''+(Math[_0xe820('0x2')](_0x182647*_0x925588)/_0x925588)['toFixed'](_0x5ddf90);},_0x4093e1=(_0x925588?_0x4093e1(_0x5ee235,_0x925588):''+Math[_0xe820('0x2')](_0x5ee235))[_0xe820('0x3')]('.');0x3<_0x4093e1[0x0][_0xe820('0x4')]&&(_0x4093e1[0x0]=_0x4093e1[0x0][_0xe820('0x0')](/\B(?=(?:\d{3})+(?!\d))/g,_0x1814bc));(_0x4093e1[0x1]||'')[_0xe820('0x4')]<_0x925588&&(_0x4093e1[0x1]=_0x4093e1[0x1]||'',_0x4093e1[0x1]+=Array(_0x925588-_0x4093e1[0x1][_0xe820('0x4')]+0x1)[_0xe820('0x5')]('0'));return _0x4093e1[_0xe820('0x5')](_0x55721b);};(function(){'use strict';try{window[_0xe820('0x6')]=window[_0xe820('0x6')]||{};window[_0xe820('0x6')][_0xe820('0x7')]=window['_QuatroDigital_CartData'][_0xe820('0x7')]||$['Callbacks']();}catch(_0x78d000){if(typeof console!=='undefined'&&typeof console[_0xe820('0x8')]===_0xe820('0x9'))console[_0xe820('0x8')](_0xe820('0xa'),_0x78d000[_0xe820('0xb')]);}}());(function(_0x470e82){'use strict';try{var _0x67f84=jQuery;var _0x430fb8=_0xe820('0xc');var _0x2a0ce9=function(_0x58e27b,_0x251d86){if(_0xe820('0xd')===typeof console&&_0xe820('0x1')!==typeof console[_0xe820('0x8')]&&_0xe820('0x1')!==typeof console['info']&&_0xe820('0x1')!==typeof console[_0xe820('0xe')]){var _0x4c84bc;_0xe820('0xd')===typeof _0x58e27b?(_0x58e27b['unshift']('['+_0x430fb8+']\x0a'),_0x4c84bc=_0x58e27b):_0x4c84bc=['['+_0x430fb8+']\x0a'+_0x58e27b];if('undefined'===typeof _0x251d86||_0xe820('0xf')!==_0x251d86['toLowerCase']()&&_0xe820('0x10')!==_0x251d86['toLowerCase']())if('undefined'!==typeof _0x251d86&&_0xe820('0x11')===_0x251d86[_0xe820('0x12')]())try{console[_0xe820('0x11')][_0xe820('0x13')](console,_0x4c84bc);}catch(_0x24ecf2){try{console[_0xe820('0x11')](_0x4c84bc[_0xe820('0x5')]('\x0a'));}catch(_0x1df5f1){}}else try{console[_0xe820('0x8')][_0xe820('0x13')](console,_0x4c84bc);}catch(_0x333a63){try{console[_0xe820('0x8')](_0x4c84bc[_0xe820('0x5')]('\x0a'));}catch(_0x178bf8){}}else try{console[_0xe820('0xe')][_0xe820('0x13')](console,_0x4c84bc);}catch(_0x5d7b50){try{console[_0xe820('0xe')](_0x4c84bc[_0xe820('0x5')]('\x0a'));}catch(_0x13592d){}}}};window[_0xe820('0x14')]=window['_QuatroDigital_DropDown']||{};window[_0xe820('0x14')][_0xe820('0x15')]=!![];_0x67f84[_0xe820('0x16')]=function(){};_0x67f84['fn'][_0xe820('0x16')]=function(){return{'fn':new _0x67f84()};};var _0xcfe695=function(_0x283814){var _0x4c51de={'n':_0xe820('0x17')};return function(_0x34daac){var _0x97e2d,_0x2b9fc7,_0x212c7e,_0x660b70;_0x2b9fc7=function(_0x394ce7){return _0x394ce7;};_0x212c7e=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x34daac=_0x34daac['d'+_0x212c7e[0x10]+'c'+_0x212c7e[0x11]+'m'+_0x2b9fc7(_0x212c7e[0x1])+'n'+_0x212c7e[0xd]]['l'+_0x212c7e[0x12]+'c'+_0x212c7e[0x0]+'ti'+_0x2b9fc7('o')+'n'];_0x97e2d=function(_0x51f15c){return escape(encodeURIComponent(_0x51f15c[_0xe820('0x0')](/\./g,'¨')[_0xe820('0x0')](/[a-zA-Z]/g,function(_0x688817){return String['fromCharCode'](('Z'>=_0x688817?0x5a:0x7a)>=(_0x688817=_0x688817[_0xe820('0x18')](0x0)+0xd)?_0x688817:_0x688817-0x1a);})));};var _0x3569fc=_0x97e2d(_0x34daac[[_0x212c7e[0x9],_0x2b9fc7('o'),_0x212c7e[0xc],_0x212c7e[_0x2b9fc7(0xd)]]['join']('')]);_0x97e2d=_0x97e2d((window[['js',_0x2b9fc7('no'),'m',_0x212c7e[0x1],_0x212c7e[0x4]['toUpperCase'](),_0xe820('0x19')][_0xe820('0x5')]('')]||_0xe820('0x1a'))+['.v',_0x212c7e[0xd],'e',_0x2b9fc7('x'),'co',_0x2b9fc7('mm'),_0xe820('0x1b'),_0x212c7e[0x1],'.c',_0x2b9fc7('o'),'m.',_0x212c7e[0x13],'r']['join'](''));for(var _0x31026f in _0x4c51de){if(_0x97e2d===_0x31026f+_0x4c51de[_0x31026f]||_0x3569fc===_0x31026f+_0x4c51de[_0x31026f]){_0x660b70='tr'+_0x212c7e[0x11]+'e';break;}_0x660b70='f'+_0x212c7e[0x0]+'ls'+_0x2b9fc7(_0x212c7e[0x1])+'';}_0x2b9fc7=!0x1;-0x1<_0x34daac[[_0x212c7e[0xc],'e',_0x212c7e[0x0],'rc',_0x212c7e[0x9]][_0xe820('0x5')]('')][_0xe820('0x1c')](_0xe820('0x1d'))&&(_0x2b9fc7=!0x0);return[_0x660b70,_0x2b9fc7];}(_0x283814);}(window);if(!eval(_0xcfe695[0x0]))return _0xcfe695[0x1]?_0x2a0ce9('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x67f84['QD_dropDownCart']=function(_0x288d77,_0x4ca22b){var _0x3210fa,_0x17d4c9,_0x4e82dc,_0x4fca63,_0x31c0d6,_0x5a8662,_0x19e7ae,_0x2c84e8,_0x48d034,_0x135230,_0x2df901,_0xaad511;_0x2df901=_0x67f84(_0x288d77);if(!_0x2df901[_0xe820('0x4')])return _0x2df901;_0x3210fa={'updateOnlyHover':!![],'texts':{'linkCart':_0xe820('0x1e'),'linkCheckout':_0xe820('0x1f'),'cartTotal':_0xe820('0x20'),'emptyCart':_0xe820('0x21'),'continueShopping':_0xe820('0x22'),'shippingForm':_0xe820('0x23')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!![],'forceImageHTTPS':![],'skuName':function(_0xe0c283){return _0xe0c283['skuName']||_0xe0c283[_0xe820('0x24')];},'callback':function(){},'callbackProductsList':function(){}};_0x17d4c9=_0x67f84['extend'](!![],{},_0x3210fa,_0x4ca22b);_0x4e82dc=_0x67f84('');_0x135230=this;if(_0x17d4c9[_0xe820('0x25')]){var _0x295f92=![];if(typeof window[_0xe820('0x26')]==='undefined'){_0x2a0ce9(_0xe820('0x27'));_0x67f84[_0xe820('0x28')]({'url':_0xe820('0x29'),'async':![],'dataType':_0xe820('0x2a'),'error':function(){_0x2a0ce9('Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.');_0x295f92=!![];}});}if(_0x295f92)return _0x2a0ce9(_0xe820('0x2b'));}var _0x53fd70;if(typeof window[_0xe820('0x26')]===_0xe820('0xd')&&typeof window['vtexjs']['checkout']!=='undefined')_0x53fd70=window[_0xe820('0x26')][_0xe820('0x2c')];else if(typeof vtex===_0xe820('0xd')&&typeof vtex[_0xe820('0x2c')]===_0xe820('0xd')&&typeof vtex[_0xe820('0x2c')][_0xe820('0x2d')]!==_0xe820('0x1'))_0x53fd70=new vtex['checkout']['SDK']();else return _0x2a0ce9(_0xe820('0x2e'));_0x135230[_0xe820('0x2f')]='<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22>'+_0xe820('0x30')+_0xe820('0x31')+_0xe820('0x32')+'<div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div>'+_0xe820('0x33')+_0xe820('0x34')+_0xe820('0x35')+_0xe820('0x36')+_0xe820('0x37')+'<div\x20class=\x22qd-ddc-infoBts\x22>'+'<a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a>'+_0xe820('0x38');_0x5a8662=function(_0x4b15e5){var _0x5d58c2=_0x67f84(_0x4b15e5);_0x17d4c9[_0xe820('0x39')][_0xe820('0x3a')]=_0x17d4c9[_0xe820('0x39')][_0xe820('0x3a')][_0xe820('0x0')](_0xe820('0x3b'),_0xe820('0x3c'));_0x17d4c9[_0xe820('0x39')][_0xe820('0x3a')]=_0x17d4c9[_0xe820('0x39')][_0xe820('0x3a')][_0xe820('0x0')]('#items',_0xe820('0x3d'));_0x17d4c9['texts'][_0xe820('0x3a')]=_0x17d4c9[_0xe820('0x39')][_0xe820('0x3a')][_0xe820('0x0')](_0xe820('0x3e'),_0xe820('0x3f'));_0x17d4c9[_0xe820('0x39')]['cartTotal']=_0x17d4c9[_0xe820('0x39')]['cartTotal'][_0xe820('0x0')](_0xe820('0x40'),'<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0x5d58c2['find'](_0xe820('0x41'))[_0xe820('0x42')](_0x17d4c9['texts'][_0xe820('0x43')]);_0x5d58c2['find']('.qd_ddc_continueShopping')['html'](_0x17d4c9[_0xe820('0x39')][_0xe820('0x44')]);_0x5d58c2[_0xe820('0x45')](_0xe820('0x46'))['html'](_0x17d4c9['texts'][_0xe820('0x47')]);_0x5d58c2['find'](_0xe820('0x48'))[_0xe820('0x42')](_0x17d4c9[_0xe820('0x39')][_0xe820('0x3a')]);_0x5d58c2[_0xe820('0x45')](_0xe820('0x49'))[_0xe820('0x42')](_0x17d4c9[_0xe820('0x39')][_0xe820('0x4a')]);_0x5d58c2[_0xe820('0x45')](_0xe820('0x4b'))[_0xe820('0x42')](_0x17d4c9[_0xe820('0x39')]['emptyCart']);return _0x5d58c2;};_0x31c0d6=function(_0x3ea5fe){_0x67f84(this)['append'](_0x3ea5fe);_0x3ea5fe[_0xe820('0x45')](_0xe820('0x4c'))[_0xe820('0x4d')](_0x67f84(_0xe820('0x4e')))['on'](_0xe820('0x4f'),function(){_0x2df901[_0xe820('0x50')](_0xe820('0x51'));_0x67f84(document[_0xe820('0x52')])[_0xe820('0x50')](_0xe820('0x53'));});_0x67f84(document)['off'](_0xe820('0x54'))['on'](_0xe820('0x54'),function(_0xa542d0){if(_0xa542d0[_0xe820('0x55')]==0x1b){_0x2df901[_0xe820('0x50')](_0xe820('0x51'));_0x67f84(document[_0xe820('0x52')])[_0xe820('0x50')](_0xe820('0x53'));}});var _0x21a6e4=_0x3ea5fe[_0xe820('0x45')](_0xe820('0x56'));_0x3ea5fe[_0xe820('0x45')](_0xe820('0x57'))['on'](_0xe820('0x58'),function(){_0x135230[_0xe820('0x59')]('-',undefined,undefined,_0x21a6e4);return![];});_0x3ea5fe[_0xe820('0x45')]('.qd-ddc-scrollDown')['on']('click.qd_ddc_scrollDown',function(){_0x135230[_0xe820('0x59')](undefined,undefined,undefined,_0x21a6e4);return![];});_0x3ea5fe[_0xe820('0x45')](_0xe820('0x5a'))['val']('')['on'](_0xe820('0x5b'),function(_0x56a273){_0x135230[_0xe820('0x5c')](_0x67f84(this));if(_0x56a273[_0xe820('0x55')]==0xd)_0x3ea5fe[_0xe820('0x45')](_0xe820('0x5d'))[_0xe820('0x5e')]();});_0x3ea5fe[_0xe820('0x45')]('.qd-ddc-shipping\x20.qd-ddc-cep-btn')['click'](function(){_0x135230[_0xe820('0x5f')](_0x3ea5fe[_0xe820('0x45')](_0xe820('0x5a')));});if(_0x17d4c9[_0xe820('0x60')]){var _0x5a90eb=0x0;_0x67f84(this)['on'](_0xe820('0x61'),function(){var _0x3f2223=function(){if(!window[_0xe820('0x14')][_0xe820('0x15')])return;_0x135230[_0xe820('0x62')]();window[_0xe820('0x14')][_0xe820('0x15')]=![];_0x67f84['fn'][_0xe820('0x63')](!![]);_0x135230[_0xe820('0x64')]();};_0x5a90eb=setInterval(function(){_0x3f2223();},0x258);_0x3f2223();});_0x67f84(this)['on']('mouseleave.qd_ddc_hover',function(){clearInterval(_0x5a90eb);});}};_0x19e7ae=_0x5a8662(this[_0xe820('0x2f')]);_0x2c84e8=0x0;_0x2df901[_0xe820('0x65')](function(){if(_0x2c84e8>0x0)_0x31c0d6[_0xe820('0x66')](this,_0x19e7ae[_0xe820('0x67')]());else _0x31c0d6[_0xe820('0x66')](this,_0x19e7ae);_0x2c84e8++;});window[_0xe820('0x6')][_0xe820('0x7')][_0xe820('0x4d')](function(){_0x67f84('.qd-ddc-infoTotalValue')['html'](window[_0xe820('0x6')]['total']||'--');_0x67f84(_0xe820('0x68'))['html'](window['_QuatroDigital_CartData'][_0xe820('0x69')]||'0');_0x67f84(_0xe820('0x6a'))['html'](window['_QuatroDigital_CartData'][_0xe820('0x6b')]||'--');_0x67f84('.qd-ddc-infoAllTotal')[_0xe820('0x42')](window[_0xe820('0x6')]['allTotal']||'--');});_0x48d034=function(_0x16ec99){_0x2a0ce9(_0xe820('0x6c'));};_0xaad511=function(_0x3586cb,_0x15791d){if(typeof _0x3586cb[_0xe820('0x6d')]==='undefined')return _0x2a0ce9('Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição');_0x135230['renderProductsList'][_0xe820('0x66')](this,_0x15791d);};_0x135230[_0xe820('0x62')]=function(_0x44682e,_0x42630f){var _0x55aa0d;if(typeof _0x42630f!=_0xe820('0x1'))window[_0xe820('0x14')]['dataOptionsCache']=_0x42630f;else if(window['_QuatroDigital_DropDown'][_0xe820('0x6e')])_0x42630f=window[_0xe820('0x14')][_0xe820('0x6e')];setTimeout(function(){window[_0xe820('0x14')][_0xe820('0x6e')]=undefined;},_0x17d4c9[_0xe820('0x6f')]);_0x67f84(_0xe820('0x70'))['removeClass'](_0xe820('0x71'));if(_0x17d4c9['smartCheckout']){_0x55aa0d=function(_0x144c6f){window[_0xe820('0x14')][_0xe820('0x72')]=_0x144c6f;_0xaad511(_0x144c6f,_0x42630f);if(typeof window[_0xe820('0x73')]!==_0xe820('0x1')&&typeof window[_0xe820('0x73')][_0xe820('0x74')]==='function')window[_0xe820('0x73')]['exec']['call'](this);_0x67f84('.qd-ddc-wrapper')[_0xe820('0x75')](_0xe820('0x71'));};if(typeof window[_0xe820('0x14')][_0xe820('0x72')]!=='undefined'){_0x55aa0d(window[_0xe820('0x14')][_0xe820('0x72')]);if(typeof _0x44682e===_0xe820('0x9'))_0x44682e(window['_QuatroDigital_DropDown'][_0xe820('0x72')]);return;}_0x67f84[_0xe820('0x76')]([_0xe820('0x6d'),_0xe820('0x77'),_0xe820('0x78')],{'done':function(_0x2ebf9d){_0x55aa0d['call'](this,_0x2ebf9d);if(typeof _0x44682e==='function')_0x44682e(_0x2ebf9d);},'fail':function(_0x57f2c2){_0x2a0ce9(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0x57f2c2]);}});}else{alert(_0xe820('0x79'));}};_0x135230['cartIsEmpty']=function(){var _0x5d0b34=_0x67f84(_0xe820('0x70'));if(_0x5d0b34[_0xe820('0x45')](_0xe820('0x7a'))['length'])_0x5d0b34['removeClass'](_0xe820('0x7b'));else _0x5d0b34[_0xe820('0x75')](_0xe820('0x7b'));};_0x135230['renderProductsList']=function(_0x2e6d6b){var _0x39e2e4=_0x67f84(_0xe820('0x7c'));var _0x18c7f6=_0xe820('0x7d')+_0xe820('0x7e')+_0xe820('0x7f')+_0xe820('0x80')+'<span\x20class=\x22qd-ddc-imgLoading\x22></span>'+_0xe820('0x81')+_0xe820('0x81')+'<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div>'+'<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div>'+'<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22>'+_0xe820('0x82')+_0xe820('0x83')+_0xe820('0x84')+_0xe820('0x85')+_0xe820('0x86')+_0xe820('0x81')+_0xe820('0x81')+_0xe820('0x87')+_0xe820('0x88')+'<a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a>'+_0xe820('0x89')+_0xe820('0x81')+_0xe820('0x81')+_0xe820('0x81');_0x39e2e4[_0xe820('0x8a')]();_0x39e2e4['each'](function(){var _0x94209f=_0x67f84(this);var _0x31308a,_0x1878f2,_0x5ddf39,_0x5004f4;var _0x48276c=_0x67f84('');var _0x35fc12;for(var _0x5900c3 in window['_QuatroDigital_DropDown']['getOrderForm']['items']){if(typeof window[_0xe820('0x14')][_0xe820('0x72')][_0xe820('0x6d')][_0x5900c3]!==_0xe820('0xd'))continue;_0x5ddf39=window[_0xe820('0x14')]['getOrderForm'][_0xe820('0x6d')][_0x5900c3];_0x35fc12=_0x5ddf39[_0xe820('0x8b')][_0xe820('0x0')](/^\/|\/$/g,'')[_0xe820('0x3')]('/');_0x1878f2=_0x67f84(_0x18c7f6);_0x1878f2[_0xe820('0x8c')]({'data-sku':_0x5ddf39['id'],'data-sku-index':_0x5900c3,'data-qd-departament':_0x35fc12[0x0],'data-qd-category':_0x35fc12[_0x35fc12[_0xe820('0x4')]-0x1]});_0x1878f2['addClass'](_0xe820('0x8d')+_0x5ddf39['availability']);_0x1878f2[_0xe820('0x45')]('.qd-ddc-prodName')['append'](_0x17d4c9[_0xe820('0x8e')](_0x5ddf39));_0x1878f2['find'](_0xe820('0x8f'))['append'](isNaN(_0x5ddf39[_0xe820('0x90')])?_0x5ddf39[_0xe820('0x90')]:_0x5ddf39[_0xe820('0x90')]==0x0?_0xe820('0x91'):(_0x67f84(_0xe820('0x92'))['attr']('content')||'R$')+'\x20'+qd_number_format(_0x5ddf39[_0xe820('0x90')]/0x64,0x2,',','.'));_0x1878f2[_0xe820('0x45')](_0xe820('0x93'))[_0xe820('0x8c')]({'data-sku':_0x5ddf39['id'],'data-sku-index':_0x5900c3})[_0xe820('0x94')](_0x5ddf39[_0xe820('0x95')]);_0x1878f2[_0xe820('0x45')](_0xe820('0x96'))['attr']({'data-sku':_0x5ddf39['id'],'data-sku-index':_0x5900c3});_0x135230[_0xe820('0x97')](_0x5ddf39['id'],_0x1878f2[_0xe820('0x45')](_0xe820('0x98')),_0x5ddf39[_0xe820('0x99')]);_0x1878f2[_0xe820('0x45')]('.qd-ddc-quantityMore,.qd-ddc-quantityMinus')[_0xe820('0x8c')]({'data-sku':_0x5ddf39['id'],'data-sku-index':_0x5900c3});_0x1878f2[_0xe820('0x9a')](_0x94209f);_0x48276c=_0x48276c[_0xe820('0x4d')](_0x1878f2);}try{var _0xa95ecf=_0x94209f[_0xe820('0x9b')](_0xe820('0x70'))[_0xe820('0x45')](_0xe820('0x5a'));if(_0xa95ecf[_0xe820('0x4')]&&_0xa95ecf[_0xe820('0x94')]()==''&&window[_0xe820('0x14')][_0xe820('0x72')]['shippingData']['address'])_0xa95ecf[_0xe820('0x94')](window[_0xe820('0x14')]['getOrderForm'][_0xe820('0x78')]['address']['postalCode']);}catch(_0x28e336){_0x2a0ce9(_0xe820('0x9c')+_0x28e336[_0xe820('0xb')],_0xe820('0x10'));}_0x135230[_0xe820('0x9d')](_0x94209f);_0x135230[_0xe820('0x64')]();if(_0x2e6d6b&&_0x2e6d6b[_0xe820('0x9e')]){(function(){_0x5004f4=_0x48276c['filter'](_0xe820('0x9f')+_0x2e6d6b[_0xe820('0x9e')]+'\x27]');if(!_0x5004f4[_0xe820('0x4')])return;_0x31308a=0x0;_0x48276c[_0xe820('0x65')](function(){var _0x55268d=_0x67f84(this);if(_0x55268d['is'](_0x5004f4))return![];_0x31308a+=_0x55268d[_0xe820('0xa0')]();});_0x135230[_0xe820('0x59')](undefined,undefined,_0x31308a,_0x94209f[_0xe820('0x4d')](_0x94209f['parent']()));_0x48276c[_0xe820('0x50')]('qd-ddc-lastAddedFixed');(function(_0x54447d){_0x54447d[_0xe820('0x75')]('qd-ddc-lastAdded');_0x54447d[_0xe820('0x75')]('qd-ddc-lastAddedFixed');setTimeout(function(){_0x54447d[_0xe820('0x50')](_0xe820('0xa1'));},_0x17d4c9[_0xe820('0x6f')]);}(_0x5004f4));_0x67f84(document[_0xe820('0x52')])[_0xe820('0x75')](_0xe820('0xa2'));setTimeout(function(){_0x67f84(document[_0xe820('0x52')])[_0xe820('0x50')]('qd-ddc-product-add-time-v2');},_0x17d4c9['timeRemoveNewItemClass']);}());}});(function(){if(_QuatroDigital_DropDown[_0xe820('0x72')][_0xe820('0x6d')][_0xe820('0x4')]){_0x67f84(_0xe820('0x52'))[_0xe820('0x50')](_0xe820('0xa3'))['addClass'](_0xe820('0xa4'));setTimeout(function(){_0x67f84(_0xe820('0x52'))[_0xe820('0x50')](_0xe820('0xa5'));},_0x17d4c9[_0xe820('0x6f')]);}else _0x67f84(_0xe820('0x52'))[_0xe820('0x50')]('qd-ddc-cart-rendered')[_0xe820('0x75')]('qd-ddc-cart-empty');}());if(typeof _0x17d4c9['callbackProductsList']===_0xe820('0x9'))_0x17d4c9[_0xe820('0xa6')]['call'](this);else _0x2a0ce9('callbackProductsList\x20não\x20é\x20uma\x20função');};_0x135230[_0xe820('0x97')]=function(_0x53879a,_0x38bd35,_0x13f670){var _0x1f9006=!![];function _0x3bc5b4(){if(_0x17d4c9[_0xe820('0xa7')]&&typeof _0x13f670==_0xe820('0xa8'))_0x13f670=_0x13f670[_0xe820('0x0')](_0xe820('0xa9'),_0xe820('0xaa'));_0x38bd35['removeClass'](_0xe820('0xab'))['load'](function(){_0x67f84(this)[_0xe820('0x75')]('qd-loaded');})[_0xe820('0x8c')]('src',_0x13f670);};if(_0x13f670)_0x3bc5b4();else if(!isNaN(_0x53879a)){alert(_0xe820('0xac'));}else _0x2a0ce9(_0xe820('0xad'),_0xe820('0xf'));};_0x135230[_0xe820('0x9d')]=function(_0x1e783e){var _0x173281,_0x5d71b5,_0x485d38,_0x40b2e9;_0x173281=function(_0x48077b,_0x365063){var _0x936960,_0x49930e,_0x29dc2c,_0x5949d7,_0x9083bb;_0x29dc2c=_0x67f84(_0x48077b);_0x936960=_0x29dc2c['attr'](_0xe820('0xae'));_0x9083bb=_0x29dc2c[_0xe820('0x8c')](_0xe820('0xaf'));if(!_0x936960)return;_0x49930e=parseInt(_0x29dc2c[_0xe820('0x94')]())||0x1;_0x135230['changeQantity']([_0x936960,_0x9083bb],_0x49930e,_0x49930e+0x1,function(_0x1be6b7){_0x29dc2c[_0xe820('0x94')](_0x1be6b7);if(typeof _0x365063==='function')_0x365063();});};_0x485d38=function(_0x3a63f9,_0x3657c7){var _0x50d998,_0x179d72,_0x30bb5a,_0x5647a3,_0x35d87b;_0x30bb5a=_0x67f84(_0x3a63f9);_0x50d998=_0x30bb5a[_0xe820('0x8c')](_0xe820('0xae'));_0x35d87b=_0x30bb5a[_0xe820('0x8c')]('data-sku-index');if(!_0x50d998)return;_0x179d72=parseInt(_0x30bb5a[_0xe820('0x94')]())||0x2;_0x5647a3=_0x135230[_0xe820('0xb0')]([_0x50d998,_0x35d87b],_0x179d72,_0x179d72-0x1,function(_0x260c42){_0x30bb5a[_0xe820('0x94')](_0x260c42);if(typeof _0x3657c7===_0xe820('0x9'))_0x3657c7();});};_0x40b2e9=function(_0x334a95,_0x619003){var _0x513315,_0x3354d9,_0x22a3b8,_0x5ce7e0,_0x262408;_0x22a3b8=_0x67f84(_0x334a95);_0x513315=_0x22a3b8[_0xe820('0x8c')]('data-sku');_0x262408=_0x22a3b8[_0xe820('0x8c')](_0xe820('0xaf'));if(!_0x513315)return;_0x3354d9=parseInt(_0x22a3b8[_0xe820('0x94')]())||0x1;_0x5ce7e0=_0x135230[_0xe820('0xb0')]([_0x513315,_0x262408],0x1,_0x3354d9,function(_0x4fd577){_0x22a3b8[_0xe820('0x94')](_0x4fd577);if(typeof _0x619003===_0xe820('0x9'))_0x619003();});};_0x5d71b5=_0x1e783e[_0xe820('0x45')](_0xe820('0xb1'));_0x5d71b5['addClass'](_0xe820('0xb2'))[_0xe820('0x65')](function(){var _0x555b3d=_0x67f84(this);_0x555b3d[_0xe820('0x45')](_0xe820('0xb3'))['on']('click.qd_ddc_more',function(_0x138ee7){_0x138ee7[_0xe820('0xb4')]();_0x5d71b5[_0xe820('0x75')](_0xe820('0xb5'));_0x173281(_0x555b3d[_0xe820('0x45')](_0xe820('0x93')),function(){_0x5d71b5[_0xe820('0x50')]('qd-loading');});});_0x555b3d[_0xe820('0x45')]('.qd-ddc-quantityMinus')['on'](_0xe820('0xb6'),function(_0x581c58){_0x581c58[_0xe820('0xb4')]();_0x5d71b5['addClass']('qd-loading');_0x485d38(_0x555b3d[_0xe820('0x45')](_0xe820('0x93')),function(){_0x5d71b5[_0xe820('0x50')](_0xe820('0xb5'));});});_0x555b3d[_0xe820('0x45')]('.qd-ddc-quantity')['on'](_0xe820('0xb7'),function(){_0x5d71b5[_0xe820('0x75')](_0xe820('0xb5'));_0x40b2e9(this,function(){_0x5d71b5['removeClass'](_0xe820('0xb5'));});});_0x555b3d['find'](_0xe820('0x93'))['on'](_0xe820('0xb8'),function(_0x547092){if(_0x547092[_0xe820('0x55')]!=0xd)return;_0x5d71b5[_0xe820('0x75')](_0xe820('0xb5'));_0x40b2e9(this,function(){_0x5d71b5[_0xe820('0x50')]('qd-loading');});});});_0x1e783e[_0xe820('0x45')](_0xe820('0x7a'))[_0xe820('0x65')](function(){var _0x3aa0b9=_0x67f84(this);_0x3aa0b9[_0xe820('0x45')](_0xe820('0x96'))['on']('click.qd_ddc_remove',function(){var _0x39da24;_0x3aa0b9[_0xe820('0x75')](_0xe820('0xb5'));_0x135230['removeProduct'](_0x67f84(this),function(_0x197f0e){if(_0x197f0e)_0x3aa0b9[_0xe820('0xb9')](!![])['slideUp'](function(){_0x3aa0b9[_0xe820('0xba')]();_0x135230[_0xe820('0x64')]();});else _0x3aa0b9[_0xe820('0x50')](_0xe820('0xb5'));});return![];});});};_0x135230[_0xe820('0x5c')]=function(_0x12379c){var _0x3079c9=_0x12379c['val']();_0x3079c9=_0x3079c9[_0xe820('0x0')](/[^0-9\-]/g,'');_0x3079c9=_0x3079c9[_0xe820('0x0')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3');_0x3079c9=_0x3079c9['replace'](/(.{9}).*/g,'$1');_0x12379c[_0xe820('0x94')](_0x3079c9);};_0x135230['shippingCalculate']=function(_0x51ca85){var _0x1b2335=_0x51ca85[_0xe820('0x94')]();if(_0x1b2335[_0xe820('0x4')]>=0x9){if(_0x51ca85['data'](_0xe820('0xbb'))!=_0x1b2335){_0x53fd70[_0xe820('0xbc')]({'postalCode':_0x1b2335,'country':_0xe820('0xbd')})[_0xe820('0xbe')](function(_0x725f06){window[_0xe820('0x14')][_0xe820('0x72')]=_0x725f06;_0x135230['getCartInfoByUrl']();var _0x335442=_0x725f06[_0xe820('0x78')]['logisticsInfo'][0x0][_0xe820('0xbf')];for(var _0x14d983=0x0;_0x14d983<_0x335442[_0xe820('0x4')];_0x14d983++){var _0x5bf82b=_0x335442[_0x14d983];var _0x3b28dd=_0x5bf82b[_0xe820('0xc0')]>0x1?_0x5bf82b[_0xe820('0xc0')]['replace']('bd',_0xe820('0xc1')):_0x5bf82b[_0xe820('0xc0')]['replace']('bd',_0xe820('0xc2'));var _0x40d414=_0x67f84('<ul\x20class=\x22qd-dd-cep-slas\x22></ul>');_0x40d414[_0xe820('0xc3')](_0xe820('0xc4')+_0x5bf82b['name']+_0xe820('0xc5')+qd_number_format(_0x5bf82b[_0xe820('0xc6')]/0x64,0x2,',','.')+'\x20-\x20Até\x20'+_0x3b28dd+'</li>');_0x51ca85['parent']()[_0xe820('0xc3')](_0x40d414);}})[_0xe820('0xc7')](function(_0x2225cb){_0x2a0ce9(['Não\x20foi\x20possível\x20calcular\x20o\x20frete',_0x2225cb]);updateCartData();});}_0x51ca85['data'](_0xe820('0xbb'),_0x1b2335);}};_0x135230['changeQantity']=function(_0x2684cb,_0x4e8282,_0x140ea7,_0x470fd3){var _0x164556=_0x140ea7||0x1;if(_0x164556<0x1)return _0x4e8282;if(_0x17d4c9['smartCheckout']){if(typeof window[_0xe820('0x14')]['getOrderForm'][_0xe820('0x6d')][_0x2684cb[0x1]]===_0xe820('0x1')){_0x2a0ce9(_0xe820('0xc8')+_0x2684cb[0x1]+']');return _0x4e8282;}window[_0xe820('0x14')][_0xe820('0x72')][_0xe820('0x6d')][_0x2684cb[0x1]][_0xe820('0x95')]=_0x164556;window[_0xe820('0x14')][_0xe820('0x72')][_0xe820('0x6d')][_0x2684cb[0x1]][_0xe820('0xc9')]=_0x2684cb[0x1];_0x53fd70['updateItems']([window[_0xe820('0x14')][_0xe820('0x72')][_0xe820('0x6d')][_0x2684cb[0x1]]],[_0xe820('0x6d'),_0xe820('0x77'),'shippingData'])[_0xe820('0xbe')](function(_0x1a5e46){window[_0xe820('0x14')]['getOrderForm']=_0x1a5e46;_0x1e49cb(!![]);})['fail'](function(_0x56f154){_0x2a0ce9([_0xe820('0xca'),_0x56f154]);_0x1e49cb();});}else{_0x2a0ce9(_0xe820('0xcb'));}function _0x1e49cb(_0x5dd6eb){_0x5dd6eb=typeof _0x5dd6eb!=='boolean'?![]:_0x5dd6eb;_0x135230[_0xe820('0x62')]();window[_0xe820('0x14')]['allowUpdate']=![];_0x135230[_0xe820('0x64')]();if(typeof window[_0xe820('0x73')]!==_0xe820('0x1')&&typeof window[_0xe820('0x73')][_0xe820('0x74')]===_0xe820('0x9'))window[_0xe820('0x73')][_0xe820('0x74')][_0xe820('0x66')](this);if(typeof adminCart===_0xe820('0x9'))adminCart();_0x67f84['fn'][_0xe820('0x63')](!![],undefined,_0x5dd6eb);if(typeof _0x470fd3===_0xe820('0x9'))_0x470fd3(_0x4e8282);};};_0x135230[_0xe820('0xcc')]=function(_0x66e61a,_0x28f92e){var _0x4bec94=![];var _0x238c34=_0x67f84(_0x66e61a);var _0x356e68=_0x238c34[_0xe820('0x8c')](_0xe820('0xaf'));if(_0x17d4c9[_0xe820('0x25')]){if(typeof window[_0xe820('0x14')][_0xe820('0x72')][_0xe820('0x6d')][_0x356e68]===_0xe820('0x1')){_0x2a0ce9(_0xe820('0xc8')+_0x356e68+']');return _0x4bec94;}window['_QuatroDigital_DropDown']['getOrderForm']['items'][_0x356e68][_0xe820('0xc9')]=_0x356e68;_0x53fd70[_0xe820('0xcd')]([window['_QuatroDigital_DropDown'][_0xe820('0x72')][_0xe820('0x6d')][_0x356e68]],[_0xe820('0x6d'),'totalizers',_0xe820('0x78')])[_0xe820('0xbe')](function(_0x1917b9){_0x4bec94=!![];window[_0xe820('0x14')]['getOrderForm']=_0x1917b9;_0xaad511(_0x1917b9);_0x59be83(!![]);})[_0xe820('0xc7')](function(_0x445217){_0x2a0ce9(['Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho',_0x445217]);_0x59be83();});}else{alert(_0xe820('0xce'));}function _0x59be83(_0x1e18f9){_0x1e18f9=typeof _0x1e18f9!=='boolean'?![]:_0x1e18f9;if(typeof window[_0xe820('0x73')]!=='undefined'&&typeof window[_0xe820('0x73')][_0xe820('0x74')]===_0xe820('0x9'))window[_0xe820('0x73')][_0xe820('0x74')]['call'](this);if(typeof adminCart===_0xe820('0x9'))adminCart();_0x67f84['fn'][_0xe820('0x63')](!![],undefined,_0x1e18f9);if(typeof _0x28f92e===_0xe820('0x9'))_0x28f92e(_0x4bec94);};};_0x135230['scrollCart']=function(_0x2edd7d,_0x1473a2,_0xf4d657,_0x545210){var _0x1cd493=_0x545210||_0x67f84('.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2');var _0xcfb2af=_0x2edd7d||'+';var _0x4c634f=_0x1473a2||_0x1cd493[_0xe820('0xcf')]()*0.9;_0x1cd493[_0xe820('0xb9')](!![],!![])[_0xe820('0xd0')]({'scrollTop':isNaN(_0xf4d657)?_0xcfb2af+'='+_0x4c634f+'px':_0xf4d657});};if(!_0x17d4c9[_0xe820('0x60')]){_0x135230[_0xe820('0x62')]();_0x67f84['fn'][_0xe820('0x63')](!![]);}_0x67f84(window)['on'](_0xe820('0xd1'),function(){try{window[_0xe820('0x14')][_0xe820('0x72')]=undefined;_0x135230[_0xe820('0x62')]();}catch(_0x1ac5b7){_0x2a0ce9('Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20'+_0x1ac5b7[_0xe820('0xb')],_0xe820('0xd2'));}});if(typeof _0x17d4c9[_0xe820('0x7')]===_0xe820('0x9'))_0x17d4c9[_0xe820('0x7')][_0xe820('0x66')](this);else _0x2a0ce9(_0xe820('0xd3'));};_0x67f84['fn'][_0xe820('0x16')]=function(_0x1e7f24){var _0x1fdc9c;_0x1fdc9c=_0x67f84(this);_0x1fdc9c['fn']=new _0x67f84['QD_dropDownCart'](this,_0x1e7f24);return _0x1fdc9c;};}catch(_0x1ef071){if(typeof console!==_0xe820('0x1')&&typeof console[_0xe820('0x8')]===_0xe820('0x9'))console[_0xe820('0x8')](_0xe820('0xa'),_0x1ef071);}}(this));(function(_0x1cadf2){'use strict';try{var _0x52ae92=jQuery;var _0x32e51e=_0xe820('0xd4');var _0x1acbaa=function(_0x28c8b4,_0x5c1472){if(_0xe820('0xd')===typeof console&&_0xe820('0x1')!==typeof console[_0xe820('0x8')]&&_0xe820('0x1')!==typeof console[_0xe820('0x11')]&&_0xe820('0x1')!==typeof console['warn']){var _0x938fb;_0xe820('0xd')===typeof _0x28c8b4?(_0x28c8b4[_0xe820('0xd5')]('['+_0x32e51e+']\x0a'),_0x938fb=_0x28c8b4):_0x938fb=['['+_0x32e51e+']\x0a'+_0x28c8b4];if(_0xe820('0x1')===typeof _0x5c1472||'alerta'!==_0x5c1472[_0xe820('0x12')]()&&_0xe820('0x10')!==_0x5c1472[_0xe820('0x12')]())if(_0xe820('0x1')!==typeof _0x5c1472&&'info'===_0x5c1472['toLowerCase']())try{console[_0xe820('0x11')][_0xe820('0x13')](console,_0x938fb);}catch(_0x116db2){try{console['info'](_0x938fb[_0xe820('0x5')]('\x0a'));}catch(_0x2168e9){}}else try{console['error'][_0xe820('0x13')](console,_0x938fb);}catch(_0x481043){try{console['error'](_0x938fb['join']('\x0a'));}catch(_0xccbc03){}}else try{console[_0xe820('0xe')][_0xe820('0x13')](console,_0x938fb);}catch(_0x1ae4d8){try{console[_0xe820('0xe')](_0x938fb[_0xe820('0x5')]('\x0a'));}catch(_0x4d178f){}}}};window['_QuatroDigital_AmountProduct']=window['_QuatroDigital_AmountProduct']||{};window[_0xe820('0x73')][_0xe820('0x6d')]={};window[_0xe820('0x73')][_0xe820('0xd6')]=![];window[_0xe820('0x73')]['buyButtonClicked']=![];window['_QuatroDigital_AmountProduct']['quickViewUpdate']=![];var _0x4e7aa5=_0xe820('0xd7');var _0x2e51ac=function(){var _0x167177,_0x924111,_0x50faf7,_0xcec584;_0xcec584=_0x2eb787();if(window[_0xe820('0x73')][_0xe820('0xd6')]){_0x52ae92(_0xe820('0xd8'))[_0xe820('0xba')]();_0x52ae92('.qd-bap-item-added')[_0xe820('0x50')](_0xe820('0xd9'));}for(var _0x21d3ec in window[_0xe820('0x73')][_0xe820('0x6d')]){_0x167177=window['_QuatroDigital_AmountProduct'][_0xe820('0x6d')][_0x21d3ec];if(typeof _0x167177!==_0xe820('0xd'))return;_0x50faf7=_0x52ae92('input.qd-productId[value='+_0x167177[_0xe820('0xda')]+']')[_0xe820('0x9b')]('li');if(!window[_0xe820('0x73')][_0xe820('0xd6')]&&_0x50faf7[_0xe820('0x45')](_0xe820('0xd8'))[_0xe820('0x4')])continue;_0x924111=_0x52ae92(_0x4e7aa5);_0x924111[_0xe820('0x45')]('.qd-bap-qtt')[_0xe820('0x42')](_0x167177['qtt']);var _0x167f96=_0x50faf7[_0xe820('0x45')]('.qd_bap_wrapper_content');if(_0x167f96[_0xe820('0x4')])_0x167f96[_0xe820('0xdb')](_0x924111)[_0xe820('0x75')](_0xe820('0xd9'));else _0x50faf7['prepend'](_0x924111);}if(_0xcec584)window['_QuatroDigital_AmountProduct'][_0xe820('0xd6')]=![];};var _0x2eb787=function(){if(!window[_0xe820('0x73')][_0xe820('0xd6')])return;var _0x3177d3=![],_0x23bf70={};window['_QuatroDigital_AmountProduct'][_0xe820('0x6d')]={};for(var _0x5d0e45 in window[_0xe820('0x14')][_0xe820('0x72')][_0xe820('0x6d')]){if(typeof window[_0xe820('0x14')][_0xe820('0x72')][_0xe820('0x6d')][_0x5d0e45]!==_0xe820('0xd'))continue;var _0x4ce529=window[_0xe820('0x14')][_0xe820('0x72')]['items'][_0x5d0e45];if(typeof _0x4ce529['productId']===_0xe820('0x1')||_0x4ce529[_0xe820('0xdc')]===null||_0x4ce529[_0xe820('0xdc')]==='')continue;window[_0xe820('0x73')][_0xe820('0x6d')][_0xe820('0xdd')+_0x4ce529['productId']]=window[_0xe820('0x73')][_0xe820('0x6d')][_0xe820('0xdd')+_0x4ce529['productId']]||{};window[_0xe820('0x73')]['items'][_0xe820('0xdd')+_0x4ce529[_0xe820('0xdc')]][_0xe820('0xda')]=_0x4ce529['productId'];if(!_0x23bf70[_0xe820('0xdd')+_0x4ce529['productId']])window[_0xe820('0x73')][_0xe820('0x6d')][_0xe820('0xdd')+_0x4ce529['productId']]['qtt']=0x0;window[_0xe820('0x73')]['items'][_0xe820('0xdd')+_0x4ce529[_0xe820('0xdc')]]['qtt']=window['_QuatroDigital_AmountProduct']['items'][_0xe820('0xdd')+_0x4ce529[_0xe820('0xdc')]][_0xe820('0x69')]+_0x4ce529[_0xe820('0x95')];_0x3177d3=!![];_0x23bf70[_0xe820('0xdd')+_0x4ce529[_0xe820('0xdc')]]=!![];}return _0x3177d3;};window[_0xe820('0x73')][_0xe820('0x74')]=function(){window[_0xe820('0x73')][_0xe820('0xd6')]=!![];_0x2e51ac[_0xe820('0x66')](this);};_0x52ae92(document)[_0xe820('0xde')](function(){_0x2e51ac[_0xe820('0x66')](this);});}catch(_0x4207ed){if(typeof console!==_0xe820('0x1')&&typeof console[_0xe820('0x8')]===_0xe820('0x9'))console[_0xe820('0x8')]('Oooops!\x20',_0x4207ed);}}(this));(function(){'use strict';try{var _0x4cd5ed=jQuery,_0x56106f;var _0xf31b3=_0xe820('0xdf');var _0x29e1ba=function(_0x2be270,_0x2eb21c){if(_0xe820('0xd')===typeof console&&_0xe820('0x1')!==typeof console[_0xe820('0x8')]&&_0xe820('0x1')!==typeof console['info']&&'undefined'!==typeof console[_0xe820('0xe')]){var _0xd87dec;_0xe820('0xd')===typeof _0x2be270?(_0x2be270['unshift']('['+_0xf31b3+']\x0a'),_0xd87dec=_0x2be270):_0xd87dec=['['+_0xf31b3+']\x0a'+_0x2be270];if(_0xe820('0x1')===typeof _0x2eb21c||_0xe820('0xf')!==_0x2eb21c['toLowerCase']()&&_0xe820('0x10')!==_0x2eb21c['toLowerCase']())if(_0xe820('0x1')!==typeof _0x2eb21c&&_0xe820('0x11')===_0x2eb21c[_0xe820('0x12')]())try{console[_0xe820('0x11')]['apply'](console,_0xd87dec);}catch(_0x4d0aee){try{console['info'](_0xd87dec[_0xe820('0x5')]('\x0a'));}catch(_0x4112ab){}}else try{console[_0xe820('0x8')][_0xe820('0x13')](console,_0xd87dec);}catch(_0x273e04){try{console[_0xe820('0x8')](_0xd87dec[_0xe820('0x5')]('\x0a'));}catch(_0x186ab8){}}else try{console[_0xe820('0xe')][_0xe820('0x13')](console,_0xd87dec);}catch(_0x44ecaf){try{console['warn'](_0xd87dec[_0xe820('0x5')]('\x0a'));}catch(_0x2967d9){}}}};var _0x5e9b63={'selector':_0xe820('0xe0'),'dropDown':{},'buyButton':{}};_0x4cd5ed[_0xe820('0xe1')]=function(_0x42c1a3){var _0x14da14,_0x3fb0ff={};_0x56106f=_0x4cd5ed[_0xe820('0xe2')](!![],{},_0x5e9b63,_0x42c1a3);_0x14da14=_0x4cd5ed(_0x56106f[_0xe820('0xe3')])[_0xe820('0x16')](_0x56106f[_0xe820('0xe4')]);if(typeof _0x56106f[_0xe820('0xe4')][_0xe820('0x60')]!==_0xe820('0x1')&&_0x56106f[_0xe820('0xe4')][_0xe820('0x60')]===![])_0x3fb0ff[_0xe820('0xe5')]=_0x4cd5ed(_0x56106f['selector'])[_0xe820('0xe6')](_0x14da14['fn'],_0x56106f['buyButton']);else _0x3fb0ff[_0xe820('0xe5')]=_0x4cd5ed(_0x56106f['selector'])[_0xe820('0xe6')](_0x56106f[_0xe820('0xe5')]);_0x3fb0ff[_0xe820('0xe4')]=_0x14da14;return _0x3fb0ff;};_0x4cd5ed['fn'][_0xe820('0xe7')]=function(){if(typeof console===_0xe820('0xd')&&typeof console['info']==='function')console['info'](_0xe820('0xe8'));};_0x4cd5ed[_0xe820('0xe7')]=_0x4cd5ed['fn']['smartCart'];}catch(_0x3135e0){if(typeof console!==_0xe820('0x1')&&typeof console['error']==='function')console[_0xe820('0x8')](_0xe820('0xa'),_0x3135e0);}}());

// vtex url parse
/* Quatro Digital - VTEX URL Parse // 1.4 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
var _0x8349=["\x6C\x69\x6E\x6B","\x3C\x61\x20\x68\x72\x65\x66\x3D\x22","\x22\x3E\x3C\x2F\x61\x3E","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\x66\x75\x6E\x63\x74\x69\x6F\x6E","\x65\x72\x72\x6F\x72","\x50\x72\x6F\x62\x6C\x65\x6D\x61\x73\x20\x3A\x28\x20\x2E\x20\x44\x65\x74\x61\x6C\x68\x65\x73\x3A\x20","\x2F","\x73\x70\x6C\x69\x74","","\x72\x65\x70\x6C\x61\x63\x65","\x70\x61\x74\x68\x6E\x61\x6D\x65","\x2C","\x70\x6F\x70","\x6D\x61\x74\x63\x68","\x73\x65\x61\x72\x63\x68","\x6C\x65\x6E\x67\x74\x68","\x6F\x62\x6A\x65\x63\x74","\x70\x75\x73\x68","\x63","\x6D\x61\x70","\x73\x68\x69\x66\x74","\x6F\x74\x68\x65\x72\x5F\x70\x61\x74\x68","\x6F\x74\x68\x65\x72\x5F\x73\x65\x61\x72\x63\x68","\x26","\x6F\x75\x74","\x67\x65\x74\x4D\x61\x70","\x70\x72\x6F\x74\x6F\x74\x79\x70\x65","\x6D\x65\x72\x67\x65\x55\x72\x6C","\x63\x61\x6C\x6C","\x65\x78\x74\x65\x6E\x64","\x67\x65\x74\x55\x72\x6C","\x6D\x61\x70\x3D","\x6A\x6F\x69\x6E","\x3F","\x51\x44\x5F\x56\x74\x65\x78\x55\x72\x6C\x50\x61\x72\x73\x65"];(function(){function _0x6ac7x1(_0x6ac7x2){try{this[_0x8349[0]]=$(_0x8349[1]+_0x6ac7x2+_0x8349[2])[0]}catch(c){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],c)}}function _0x6ac7x3(_0x6ac7x2){try{_0x6ac7x2=_0x6ac7x2||this[_0x8349[0]];var _0x6ac7x4=_0x6ac7x2[_0x8349[11]][_0x8349[10]](/\/\//g,_0x8349[7])[_0x8349[10]](/(^\/|\/$)/g,_0x8349[9])[_0x8349[8]](_0x8349[7]),_0x6ac7x5=((_0x6ac7x2[_0x8349[15]]||_0x8349[9])[_0x8349[14]](/map\=([^&]+)/i)||[_0x8349[9]])[_0x8349[13]]()[_0x8349[8]](_0x8349[12]);if(1==_0x6ac7x5[_0x8349[16]]&&0==_0x6ac7x5[0][_0x8349[16]]){if(_0x8349[17]== typeof defaultMap){_0x6ac7x5=defaultMap}else {for(var _0x6ac7x6=0;_0x6ac7x6<_0x6ac7x4[_0x8349[16]];_0x6ac7x6++){_0x6ac7x4[_0x6ac7x6][_0x8349[16]]&&_0x8349[7]!=_0x6ac7x4[_0x6ac7x6]&&_0x6ac7x5[_0x8349[18]](defaultMap)}}};for(var _0x6ac7x6={map:{},other_path:_0x8349[9]},_0x6ac7x7=0;_0x6ac7x7<_0x6ac7x5[_0x8349[16]];_0x6ac7x7++){_0x6ac7x5[_0x6ac7x7][_0x8349[16]]&&(_0x8349[19]==_0x6ac7x5[_0x6ac7x7]?(_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]=_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]||[],_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]][_0x8349[18]]((_0x6ac7x4||[_0x8349[9]])[_0x8349[21]]())):_0x6ac7x6[_0x8349[20]][_0x6ac7x5[_0x6ac7x7]]=(_0x6ac7x4||[_0x8349[9]])[_0x8349[21]]())};_0x6ac7x6[_0x8349[22]]=_0x6ac7x4;_0x6ac7x6[_0x8349[23]]=(_0x6ac7x2[_0x8349[15]]||_0x8349[9])[_0x8349[10]](/map\=([^&]+)/ig,_0x8349[9])[_0x8349[10]](/\&\&+/ig,_0x8349[24])[_0x8349[10]](/\?/g,_0x8349[9]);return this[_0x8349[25]]=_0x6ac7x6}catch(g){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],g)}}_0x6ac7x1[_0x8349[27]][_0x8349[26]]=_0x6ac7x3;_0x6ac7x1[_0x8349[27]][_0x8349[28]]=function(_0x6ac7x2,_0x6ac7x4){try{var _0x6ac7x5=_0x6ac7x3[_0x8349[29]](this,this[_0x8349[0]]),_0x6ac7x6=_0x6ac7x3[_0x8349[29]](this,$(_0x8349[1]+_0x6ac7x2+_0x8349[2])[0]);_0x6ac7x5[_0x8349[22]][_0x8349[16]]||(_0x6ac7x5[_0x8349[22]]=void(0));_0x6ac7x5[_0x8349[23]][_0x8349[16]]||(_0x6ac7x5[_0x8349[23]]=void(0));var _0x6ac7x7=$[_0x8349[30]](!0,{},_0x6ac7x6,_0x6ac7x5);if(_0x8349[17]== typeof _0x6ac7x4){for(_0x6ac7x6=0;_0x6ac7x6<_0x6ac7x4[_0x8349[16]];_0x6ac7x6++){_0x6ac7x7[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]]&&(_0x6ac7x7[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]]=_0x6ac7x5[_0x8349[20]][_0x6ac7x4[_0x6ac7x6]])}};return this[_0x8349[25]]=_0x6ac7x7}catch(g){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],g)}};_0x6ac7x1[_0x8349[27]][_0x8349[31]]=function(_0x6ac7x2){try{var _0x6ac7x4=[],_0x6ac7x5=[];_0x6ac7x2=_0x6ac7x2||{};for(var _0x6ac7x6 in this[_0x8349[25]][_0x8349[20]]){if(!_0x6ac7x2[_0x6ac7x6]){if(_0x8349[19]==_0x6ac7x6){for(var _0x6ac7x7=0;_0x6ac7x7<this[_0x8349[25]][_0x8349[20]][_0x6ac7x6][_0x8349[16]];_0x6ac7x7++){_0x6ac7x4[_0x8349[18]](this[_0x8349[25]][_0x8349[20]][_0x6ac7x6][_0x6ac7x7]),_0x6ac7x5[_0x8349[18]](_0x6ac7x6)}}else {_0x6ac7x4[_0x8349[18]](this[_0x8349[25]][_0x8349[20]][_0x6ac7x6]),_0x6ac7x5[_0x8349[18]](_0x6ac7x6)}}};var _0x6ac7x8=_0x6ac7x5[_0x8349[16]]?_0x8349[32]+_0x6ac7x5[_0x8349[33]](_0x8349[12])+_0x8349[24]:_0x8349[9];return _0x8349[7]+_0x6ac7x4[_0x8349[33]](_0x8349[7])+(this[_0x8349[25]][_0x8349[22]][_0x8349[16]]?_0x8349[7]+this[_0x8349[25]][_0x8349[22]][_0x8349[33]](_0x8349[7]):_0x8349[9])+_0x8349[34]+(_0x6ac7x8+this[_0x8349[25]][_0x8349[23]])[_0x8349[10]](/\&\&+/g,_0x8349[24])}catch(_0x6ac7x1){_0x8349[3]!== typeof console&&_0x8349[4]=== typeof console[_0x8349[5]]&&console[_0x8349[5]](_0x8349[6],_0x6ac7x1)}};window[_0x8349[35]]=_0x6ac7x1})()

